import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Clock,
  Copy,
  Check,
  RefreshCw,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  ListFilter,
  Sparkles
} from 'lucide-react';
import { CatholicArticlesRssIcon } from './SanctumIcons';
import {
  CATHOLIC_RSS_SOURCES,
  CURATED_CATHOLIC_ARTICLES,
  CatholicArticleItem,
  fetchCatholicRssArticlesForSource,
  fetchFullCatholicArticleContent,
  isLiveCatholicArticle
} from '../data/catholicRssArticles';
import { SacredReader } from '../utils/speech';
import { toCurvedQuotes } from '../utils/typography';

interface CatholicArticlesViewProps {
  initialSourceId?: string | null;
  initialArticleId?: string | null;
  onClearInitialArticle?: () => void;
}

export const CatholicArticlesView: React.FC<CatholicArticlesViewProps> = ({
  initialSourceId,
  initialArticleId,
  onClearInitialArticle
}) => {
  const [selectedSourceId, setSelectedSourceId] = useState<string>(
    initialSourceId || CATHOLIC_RSS_SOURCES[0].id
  );
  const [selectedArticleIndex, setSelectedArticleIndex] = useState<number>(0);
  const selectedIndexRef = useRef<number>(0);
  selectedIndexRef.current = selectedArticleIndex;

  const [lastRefreshedAt, setLastRefreshedAt] = useState<number>(Date.now());
  const [refreshStatusMessage, setRefreshStatusMessage] = useState<string | null>(null);
  const [isStatusFallback, setIsStatusFallback] = useState<boolean>(false);
  const getLocalDayKey = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };
  const [activeDayKey, setActiveDayKey] = useState<string>(getLocalDayKey);
  const [showAllFeedItems, setShowAllFeedItems] = useState<boolean>(false);

  const perSourceSeqRef = useRef<Record<string, number>>({});
  const requestedArticleIdRef = useRef<string | null>(initialArticleId || null);

  const [articlesBySource, setArticlesBySource] = useState<Record<string, CatholicArticleItem[]>>(() => {
    const todayFormatted = new Date().toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    const initial: Record<string, CatholicArticleItem[]> = {};
    for (const src of CATHOLIC_RSS_SOURCES) {
      const primary = CURATED_CATHOLIC_ARTICLES.filter(a => a.sourceId === src.id).map(a => ({
        ...a,
        publishedDate: todayFormatted
      }));
      const secondary = CURATED_CATHOLIC_ARTICLES.filter(a => a.sourceId !== src.id).map(a => ({
        ...a,
        id: `${src.id}-init-${a.id}`,
        publishedDate: todayFormatted
      }));
      initial[src.id] = [...primary, ...secondary];
    }
    return initial;
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshingAll, setIsRefreshingAll] = useState<boolean>(false);
  const [isFetchingFullText, setIsFetchingFullText] = useState<boolean>(false);
  const [isReadingAloud, setIsReadingAloud] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (initialSourceId) {
      setSelectedSourceId(initialSourceId);
      const list = articlesBySource[initialSourceId] || [];
      if (initialArticleId) {
        requestedArticleIdRef.current = initialArticleId;
        const idx = list.findIndex(
          a =>
            a.id === initialArticleId ||
            (initialArticleId === 'aleteia-peru-homecoming' &&
              (a.link?.includes('what-a-homecoming-popes-arrival-in-peru') ||
                a.title.toLowerCase().includes('what a homecoming')))
        );
        const targetIdx = idx >= 0 ? idx : 0;
        setSelectedArticleIndex(targetIdx);
        selectedIndexRef.current = targetIdx;
      } else {
        requestedArticleIdRef.current = null;
        setSelectedArticleIndex(0);
        selectedIndexRef.current = 0;
      }
      if (onClearInitialArticle) {
        onClearInitialArticle();
      }
    }
  }, [initialSourceId, initialArticleId]);

  const loadSourceFeed = async (sourceId: string, isManualRefresh: boolean = false) => {
    const seq = (perSourceSeqRef.current[sourceId] || 0) + 1;
    perSourceSeqRef.current[sourceId] = seq;

    setIsLoading(true);
    setIsStatusFallback(false);
    setRefreshStatusMessage('Refreshing live RSS feed…');
    try {
      const items = await fetchCatholicRssArticlesForSource(sourceId, isManualRefresh);
      if (perSourceSeqRef.current[sourceId] !== seq) return;

      if (items && items.length > 0) {
        setArticlesBySource(prev => ({
          ...prev,
          [sourceId]: items
        }));
        const now = Date.now();
        setLastRefreshedAt(now);

        const targetArticleId = requestedArticleIdRef.current;
        if (targetArticleId) {
          const matchedIdx = items.findIndex(
            a =>
              a.id === targetArticleId ||
              (targetArticleId.includes('what-a-homecoming') || targetArticleId === 'aleteia-peru-homecoming'
                ? a.link?.includes('what-a-homecoming-popes-arrival-in-peru') ||
                  a.title.toLowerCase().includes('what a homecoming')
                : false)
          );
          requestedArticleIdRef.current = null;
          const idxToUse = matchedIdx >= 0 ? matchedIdx : 0;
          selectedIndexRef.current = idxToUse;
          setSelectedArticleIndex(idxToUse);
        } else if (isManualRefresh) {
          if (isReadingAloud) SacredReader.stop();
          selectedIndexRef.current = 0;
          setSelectedArticleIndex(0);
        }

        const liveCount = items.filter(isLiveCatholicArticle).length;
        const timeStr = new Date(now).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const latestTitle = items[0]?.title || '';
        const previewTitle = latestTitle.length > 45 ? `${latestTitle.slice(0, 45)}…` : latestTitle;

        if (liveCount > 0) {
          setIsStatusFallback(false);
          setRefreshStatusMessage(
            `✓ Live feed refreshed at ${timeStr} (${liveCount} live / ${items.length} total) — Latest: "${previewTitle}"`
          );
        } else {
          setIsStatusFallback(true);
          setRefreshStatusMessage(
            `Live RSS unreachable at ${timeStr} — showing verified Catholic archive`
          );
        }
      }
    } catch {
      if (perSourceSeqRef.current[sourceId] === seq) {
        setIsStatusFallback(true);
        setRefreshStatusMessage('Live RSS temporarily unavailable — showing verified Catholic archive');
      }
    } finally {
      if (perSourceSeqRef.current[sourceId] === seq) {
        setIsLoading(false);
      }
    }
  };

  const handleRefreshAllFeeds = async () => {
    setIsRefreshingAll(true);
    setIsStatusFallback(false);
    setRefreshStatusMessage('Refreshing all 9 Catholic RSS feeds…');
    if (isReadingAloud) SacredReader.stop();

    const seqs: Record<string, number> = {};
    for (const src of CATHOLIC_RSS_SOURCES) {
      const next = (perSourceSeqRef.current[src.id] || 0) + 1;
      perSourceSeqRef.current[src.id] = next;
      seqs[src.id] = next;
    }

    try {
      const results = await Promise.all(
        CATHOLIC_RSS_SOURCES.map(async src => {
          const items = await fetchCatholicRssArticlesForSource(src.id, true);
          return { sourceId: src.id, items };
        })
      );

      let totalLiveSynced = 0;
      let totalSynced = 0;
      const updatedMap: Record<string, CatholicArticleItem[]> = {};
      for (const res of results) {
        if (perSourceSeqRef.current[res.sourceId] !== seqs[res.sourceId]) continue;
        if (res.items && res.items.length > 0) {
          updatedMap[res.sourceId] = res.items;
          totalSynced += res.items.length;
          totalLiveSynced += res.items.filter(isLiveCatholicArticle).length;
        }
      }

      setArticlesBySource(prev => ({
        ...prev,
        ...updatedMap
      }));

      requestedArticleIdRef.current = null;
      selectedIndexRef.current = 0;
      setSelectedArticleIndex(0);

      const now = Date.now();
      setLastRefreshedAt(now);
      const timeStr = new Date(now).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      const activeItems = updatedMap[selectedSourceId] || articlesBySource[selectedSourceId] || [];
      const latestTitle = activeItems[0]?.title || '';
      const previewTitle = latestTitle.length > 45 ? `${latestTitle.slice(0, 45)}…` : latestTitle;

      if (totalLiveSynced > 0) {
        setIsStatusFallback(false);
        setRefreshStatusMessage(
          `✓ All 9 feeds refreshed at ${timeStr} (${totalLiveSynced} live articles synced) — Latest: "${previewTitle}"`
        );
      } else {
        setIsStatusFallback(true);
        setRefreshStatusMessage(
          `Live RSS feeds unreachable at ${timeStr} — showing verified Catholic archive (${totalSynced} articles)`
        );
      }
    } finally {
      setIsRefreshingAll(false);
    }
  };

  // Load feed when switching publication source
  useEffect(() => {
    loadSourceFeed(selectedSourceId, true);
  }, [selectedSourceId]);

  // Pre-fetch remaining feeds sequentially in small batches after mount so active source isn't starved
  useEffect(() => {
    let mounted = true;
    const prefetchAll = async () => {
      const others = CATHOLIC_RSS_SOURCES.filter(src => src.id !== selectedSourceId);
      for (let i = 0; i < others.length; i += 2) {
        if (!mounted) break;
        const batch = others.slice(i, i + 2);
        await Promise.all(
          batch.map(async src => {
            const seq = (perSourceSeqRef.current[src.id] || 0) + 1;
            perSourceSeqRef.current[src.id] = seq;
            try {
              const items = await fetchCatholicRssArticlesForSource(src.id, false);
              if (mounted && perSourceSeqRef.current[src.id] === seq && items && items.length > 0) {
                setArticlesBySource(prev => ({
                  ...prev,
                  [src.id]: items
                }));
              }
            } catch {
              // Ignore prefetch errors silently
            }
          })
        );
      }
    };
    const timer = setTimeout(prefetchAll, 600);
    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, []);

  // Automatic daily feed refresh check (every 60s and when tab regains focus)
  useEffect(() => {
    const checkDailyRollover = () => {
      const todayKey = getLocalDayKey();
      if (todayKey !== activeDayKey) {
        setActiveDayKey(todayKey);
        handleRefreshAllFeeds();
      }
    };

    const interval = setInterval(checkDailyRollover, 60000);
    window.addEventListener('focus', checkDailyRollover);
    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', checkDailyRollover);
    };
  }, [activeDayKey, selectedSourceId]);

  useEffect(() => {
    const unsub = SacredReader.addListener((speaking) => {
      setIsReadingAloud(speaking);
    });
    return () => {
      unsub();
      SacredReader.stop();
    };
  }, []);

  const activeSourceMeta = useMemo(
    () => CATHOLIC_RSS_SOURCES.find(s => s.id === selectedSourceId) || CATHOLIC_RSS_SOURCES[0],
    [selectedSourceId]
  );

  const sourceArticles = useMemo(
    () => articlesBySource[selectedSourceId] || [],
    [articlesBySource, selectedSourceId]
  );

  const currentArticle: CatholicArticleItem | undefined =
    sourceArticles[selectedArticleIndex] || sourceArticles[0];

  // Automatically fetch the complete article text whenever the active RSS item only has a short feed excerpt
  useEffect(() => {
    if (!currentArticle || currentArticle.isFullContentLoaded || !currentArticle.link) {
      return;
    }

    let cancelled = false;
    setIsFetchingFullText(true);

    fetchFullCatholicArticleContent(currentArticle.link)
      .then(fullData => {
        if (cancelled) return;
        setArticlesBySource(prev => {
          const list = prev[selectedSourceId] || [];
          const updated = list.map(item => {
            if (item.id !== currentArticle.id) return item;
            if (fullData && fullData.content.length > item.content.length) {
              return {
                ...item,
                content: fullData.content,
                imageUrl: item.imageUrl || fullData.imageUrl,
                readTime: fullData.readTime || item.readTime,
                isFullContentLoaded: true
              };
            }
            return {
              ...item,
              isFullContentLoaded: true
            };
          });
          return {
            ...prev,
            [selectedSourceId]: updated
          };
        });
      })
      .finally(() => {
        if (!cancelled) {
          setIsFetchingFullText(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [currentArticle?.id, currentArticle?.isFullContentLoaded, currentArticle?.link, selectedSourceId]);

  const handleSelectSource = (sourceId: string) => {
    if (isReadingAloud) SacredReader.stop();
    setSelectedSourceId(sourceId);
    setSelectedArticleIndex(0);
    selectedIndexRef.current = 0;
    setRefreshStatusMessage(null);
  };

  const handlePrevArticle = () => {
    if (sourceArticles.length > 1) {
      if (isReadingAloud) SacredReader.stop();
      const prevIdx = (selectedArticleIndex - 1 + sourceArticles.length) % sourceArticles.length;
      selectedIndexRef.current = prevIdx;
      setSelectedArticleIndex(prevIdx);
    }
  };

  const handleNextArticle = () => {
    if (sourceArticles.length > 1) {
      if (isReadingAloud) SacredReader.stop();
      const nextIdx = (selectedArticleIndex + 1) % sourceArticles.length;
      selectedIndexRef.current = nextIdx;
      setSelectedArticleIndex(nextIdx);
    }
  };

  const handleToggleReadAloud = (article: CatholicArticleItem) => {
    if (isReadingAloud) {
      SacredReader.stop();
    } else {
      const text = `${article.sourceName}. ${article.title}. By ${article.author}. ${article.content || article.summary}`;
      SacredReader.speak(text);
    }
  };

  const handleCopyArticle = (article: CatholicArticleItem) => {
    const copyText = `${article.title}\nSource: ${article.sourceName} | By ${article.author} (${article.publishedDate})\n\n${article.content || article.summary}`;
    navigator.clipboard.writeText(copyText);
    setCopiedId(article.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formattedParagraphs = useMemo(() => {
    if (!currentArticle) return [];
    const rawText = currentArticle.content || currentArticle.summary || '';
    return rawText
      .split(/\n{2,}/)
      .map(p => p.trim())
      .filter(Boolean);
  }, [currentArticle]);

  const visibleFeedItems = useMemo(() => {
    if (showAllFeedItems) return sourceArticles;
    return sourceArticles.slice(0, 5);
  }, [sourceArticles, showAllFeedItems]);

  return (
    <div className="max-w-5xl mx-auto p-3 sm:p-6 md:p-8 rounded-xl bg-white/45 backdrop-blur-xl backdrop-saturate-150 border border-white/60 ring-1 ring-inset ring-white/40 shadow-[0_8px_32px_0_rgba(120,90,50,0.12)] space-y-6 mb-12">
      {/* Top Banner & Source Selector */}
      <div className="sanctum-top-banner px-5 pt-4 pb-4 sm:px-6 min-h-[164px] bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 rounded-xl text-amber-50 shadow-md border border-amber-900/40 flex flex-col justify-between">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 group">
              <CatholicArticlesRssIcon className="w-4 h-4 text-amber-400" />
              <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-amber-300">
                Catholic Press &amp; Theological Journals
              </span>
            </div>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide">
              Catholic Articles
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 font-serif-sacred max-w-2xl">
              Select a publication below or click Refresh Feed to fetch today&apos;s newest Catholic articles and step through live dispatches.
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => loadSourceFeed(selectedSourceId, true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 active:scale-[0.99] text-stone-950 text-xs font-cinzel font-bold transition-all cursor-pointer shadow-sm shrink-0"
                title="Refresh this publication's live RSS feed for the latest articles"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-stone-950 ${isLoading ? 'animate-spin' : ''}`} />
                <span>{isLoading ? 'Refreshing…' : 'Refresh Feed'}</span>
              </button>

              <button
                type="button"
                onClick={handleRefreshAllFeeds}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-800/90 hover:bg-stone-700 active:scale-[0.99] border border-amber-500/40 text-amber-200 text-xs font-cinzel font-semibold transition-all cursor-pointer shrink-0"
                title="Refresh all 9 Catholic RSS feeds simultaneously"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isRefreshingAll ? 'animate-spin' : ''}`} />
                <span>{isRefreshingAll ? 'Syncing All 9…' : 'Refresh All 9 Feeds'}</span>
              </button>
            </div>
            <span className="text-[11px] font-serif text-amber-200/80">
              Updated {new Date(lastRefreshedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })} • {sourceArticles.length} {sourceArticles.length === 1 ? 'article' : 'articles'} in feed
            </span>
          </div>
        </div>

        {/* Catholic Publications Filter Bar */}
        <div className="flex flex-wrap gap-2 mt-5">
          {CATHOLIC_RSS_SOURCES.map(src => {
            const isSelected = selectedSourceId === src.id;
            const count = (articlesBySource[src.id] || []).length;
            return (
              <button
                key={src.id}
                type="button"
                onClick={() => handleSelectSource(src.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium font-cinzel transition-all cursor-pointer inline-flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-amber-400 text-amber-950 font-bold shadow-xs'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                <span>{src.shortName}</span>
                {count > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-amber-950/20 text-amber-950' : 'bg-stone-700 text-amber-300/90'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Publication Info Strip & Refresh Confirmation */}
        <div className="mt-4 pt-3 border-t border-amber-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="text-amber-100/90 font-serif italic">
            <strong className="not-italic font-cinzel text-amber-300">{activeSourceMeta.name}: </strong>
            {activeSourceMeta.tagline}
          </div>
          {refreshStatusMessage && (
            <div
              className={`px-2.5 py-1 rounded-md font-cinzel text-[11px] font-semibold border ${
                isStatusFallback
                  ? 'bg-amber-950/80 border-amber-500/40 text-amber-200'
                  : 'bg-emerald-950/80 border-emerald-500/40 text-emerald-200'
              }`}
            >
              {refreshStatusMessage}
            </div>
          )}
        </div>
      </div>

      {/* Live Feed Dispatches List (Click any article in the feed to read immediately) */}
      {sourceArticles.length > 1 && (
        <div className="bg-white/80 backdrop-blur-md rounded-xl border border-stone-200/90 p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/80 pb-2.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <h3 className="font-cinzel text-xs sm:text-sm font-bold text-stone-900 uppercase tracking-wider">
                {activeSourceMeta.name} — Live Feed Dispatches ({sourceArticles.length} Articles)
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowAllFeedItems(prev => !prev)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 text-xs font-cinzel font-semibold cursor-pointer transition-colors"
              >
                <ListFilter className="w-3.5 h-3.5 text-amber-800" />
                <span>
                  {showAllFeedItems ? 'Show Top 5 Only' : `View All ${sourceArticles.length} Articles`}
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {visibleFeedItems.map((item) => {
              const actualIdx = sourceArticles.findIndex(a => a.id === item.id);
              const isCurrent = actualIdx === selectedArticleIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    if (isReadingAloud) SacredReader.stop();
                    selectedIndexRef.current = actualIdx >= 0 ? actualIdx : 0;
                    setSelectedArticleIndex(actualIdx >= 0 ? actualIdx : 0);
                  }}
                  className={`text-left p-3 rounded-lg border transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                    isCurrent
                      ? 'bg-amber-50/95 border-amber-600 ring-1 ring-amber-500/40 shadow-xs'
                      : 'bg-white/90 hover:bg-stone-50 border-stone-200/90'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-1.5 text-[10px] font-cinzel font-bold uppercase tracking-wider">
                      <span className={isCurrent ? 'text-amber-900' : 'text-stone-500'}>
                        Article #{actualIdx + 1}
                      </span>
                      {isCurrent && (
                        <span className="px-1.5 py-0.5 rounded bg-amber-800 text-amber-50 text-[9px]">
                          Reading Now
                        </span>
                      )}
                    </div>
                    <h4 className="font-cinzel text-xs sm:text-sm font-bold text-stone-900 line-clamp-2 leading-snug">
                      {toCurvedQuotes(item.title)}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-stone-500 font-serif pt-1 border-t border-stone-100">
                    <span className="truncate max-w-[140px]">{item.author}</span>
                    <span>{item.publishedDate}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Single Full-Article Reader Card */}
      {currentArticle && (
        <article className="bg-white/85 backdrop-blur-xl backdrop-saturate-150 p-6 sm:p-8 md:p-10 rounded-2xl border border-white/80 ring-1 ring-inset ring-white/50 shadow-[0_8px_32px_0_rgba(120,90,50,0.14)] space-y-6">
          {/* Top Navigation & Article Counter + Quick Selector Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-3.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-amber-900 text-amber-50 font-bold font-cinzel text-xs shadow-2xs">
                {currentArticle.sourceName}
              </span>
              {sourceArticles.length > 1 && (
                <span className="text-xs font-cinzel font-semibold text-stone-600">
                  • Article {selectedArticleIndex + 1} of {sourceArticles.length}
                </span>
              )}
              {isFetchingFullText && (
                <span className="text-xs font-serif italic text-amber-800 animate-pulse ml-1">
                  • Loading complete article text…
                </span>
              )}
            </div>

            {/* Article Dropdown Jump + Previous / Next Article Controls */}
            {sourceArticles.length > 1 && (
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={selectedArticleIndex}
                  onChange={(e) => {
                    if (isReadingAloud) SacredReader.stop();
                    const idx = Number(e.target.value);
                    selectedIndexRef.current = idx;
                    setSelectedArticleIndex(idx);
                  }}
                  aria-label="Select an article from this feed"
                  className="max-w-[230px] sm:max-w-[280px] px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 text-xs font-serif truncate cursor-pointer focus:outline-none focus:border-amber-700"
                >
                  {sourceArticles.map((art, idx) => (
                    <option key={art.id} value={idx}>
                      {idx + 1}. {art.title}
                    </option>
                  ))}
                </select>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={handlePrevArticle}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 text-xs font-cinzel font-bold transition-colors cursor-pointer"
                    title="Previous article from this source"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 text-amber-800" />
                    <span>Prev</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNextArticle}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 text-xs font-cinzel font-bold transition-colors cursor-pointer"
                    title="Next article from this source"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3.5 h-3.5 text-amber-800" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Article Title, Author & Date */}
          <div className="space-y-2.5">
            <h3 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-bold text-stone-900 leading-snug">
              {toCurvedQuotes(currentArticle.title)}
            </h3>

            <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-600 pt-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-serif-sacred italic text-amber-900 font-semibold">
                  By {currentArticle.author}
                </span>
                <span>•</span>
                <span className="font-serif italic">{currentArticle.publishedDate}</span>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-800" />
                  {currentArticle.readTime}
                </span>
              </div>

              {/* Listen & Copy Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleToggleReadAloud(currentArticle)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isReadingAloud
                      ? 'bg-amber-800 text-white animate-pulse'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300'
                  }`}
                  title={isReadingAloud ? 'Stop Audio' : 'Listen to this full article'}
                >
                  {isReadingAloud ? (
                    <VolumeX className="w-3.5 h-3.5" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 text-amber-800" />
                  )}
                  <span>{isReadingAloud ? 'Stop Audio' : 'Listen'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleCopyArticle(currentArticle)}
                  className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Copy full article text"
                >
                  {copiedId === currentArticle.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Optional Article Image */}
          {currentArticle.imageUrl && (
            <div className="space-y-1.5">
              <div className="rounded-xl overflow-hidden border border-stone-300 bg-stone-950/5 shadow-sm">
                <img
                  key={currentArticle.imageUrl}
                  src={currentArticle.imageUrl}
                  alt={currentArticle.title}
                  className="w-full h-auto max-h-[520px] object-contain mx-auto block"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const container = e.currentTarget.parentElement;
                    if (container) container.style.display = 'none';
                  }}
                />
              </div>
              {currentArticle.imageCredit && (
                <p className="text-[11px] font-cinzel tracking-wider uppercase text-stone-500 text-right">
                  Credit: {currentArticle.imageCredit}
                </p>
              )}
            </div>
          )}

          {/* Complete In-App Article Body */}
          <div className="font-serif-sacred text-stone-900 text-base sm:text-lg leading-relaxed space-y-5 pt-3 border-t border-stone-200/70">
            {formattedParagraphs.map((para, idx) => (
              <p
                key={idx}
                className={idx === 0 ? 'sacred-drop-cap' : ''}
              >
                {toCurvedQuotes(para)}
              </p>
            ))}
          </div>

          {/* Bottom Article Stepping Bar */}
          {sourceArticles.length > 1 && (
            <div className="pt-4 border-t border-stone-200 flex items-center justify-between gap-3">
              <span className="text-xs font-cinzel text-stone-500">
                {currentArticle.sourceName} • Article {selectedArticleIndex + 1} of {sourceArticles.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrevArticle}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 text-xs font-cinzel font-bold transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4 text-amber-800" />
                  <span>Previous Article</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextArticle}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 text-xs font-cinzel font-bold transition-colors cursor-pointer"
                >
                  <span>Next Article</span>
                  <ChevronRight className="w-4 h-4 text-amber-800" />
                </button>
              </div>
            </div>
          )}
        </article>
      )}
    </div>
  );
};
