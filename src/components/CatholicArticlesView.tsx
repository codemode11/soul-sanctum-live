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
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Settings,
  ChevronDown
} from 'lucide-react';
import { CatholicArticlesRssIcon } from './SanctumIcons';
import {
  CATHOLIC_RSS_SOURCES,
  CURATED_CATHOLIC_ARTICLES,
  HERO_RIGHT_ARTICLES,
  CatholicArticleItem,
  createHeroRightArticleStub,
  fetchCatholicRssFeedWithStatus,
  fetchFullCatholicArticleContent,
  isLiveCatholicArticle,
  matchesRequestedCatholicArticle
} from '../data/catholicRssArticles';
import { SacredReader } from '../utils/speech';
import { toCurvedQuotes } from '../utils/typography';

interface CatholicArticlesViewProps {
  initialSourceId?: string | null;
  initialArticleId?: string | null;
  onClearInitialArticle?: () => void;
}

interface SourceFeedStatus {
  isLive: boolean;
  liveCount: number;
  syncedAt?: number;
  error?: string;
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
  const getLocalDayKey = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };
  const [activeDayKey, setActiveDayKey] = useState<string>(getLocalDayKey);
  const [showAllFeedItems, setShowAllFeedItems] = useState<boolean>(false);

  const perSourceSeqRef = useRef<Record<string, number>>({});
  const requestedArticleIdRef = useRef<string | null>(initialArticleId || null);
  const requestedSourceIdRef = useRef<string | null>(initialSourceId || null);

  const [articlesBySource, setArticlesBySource] = useState<Record<string, CatholicArticleItem[]>>(() => {
    const initial: Record<string, CatholicArticleItem[]> = {};
    for (const src of CATHOLIC_RSS_SOURCES) {
      initial[src.id] = CURATED_CATHOLIC_ARTICLES.filter(a => a.sourceId === src.id);
    }
    return initial;
  });

  const [feedStatusBySource, setFeedStatusBySource] = useState<Record<string, SourceFeedStatus>>({});
  const [refreshAllProgress, setRefreshAllProgress] = useState<{
    completed: number;
    liveCount: number;
    total: number;
  } | null>(null);
  const [refreshAllSummary, setRefreshAllSummary] = useState<{
    liveSources: number;
    total: number;
    syncedAt: number;
  } | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshingAll, setIsRefreshingAll] = useState<boolean>(false);
  const [isFetchingFullText, setIsFetchingFullText] = useState<boolean>(false);
  const [isReadingAloud, setIsReadingAloud] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (initialSourceId) {
      setSelectedSourceId(initialSourceId);
      const list = articlesBySource[initialSourceId] || [];
      if (initialArticleId) {
        requestedArticleIdRef.current = initialArticleId;
        requestedSourceIdRef.current = initialSourceId;
        const idx = list.findIndex(a => matchesRequestedCatholicArticle(a, initialArticleId));
        if (idx >= 0) {
          setSelectedArticleIndex(idx);
          selectedIndexRef.current = idx;
        } else {
          const heroConfig = HERO_RIGHT_ARTICLES.find(
            h => h.id === initialArticleId && h.sourceId === initialSourceId
          );
          if (heroConfig) {
            const stub = createHeroRightArticleStub(heroConfig);
            setArticlesBySource(prev => {
              const existing = prev[initialSourceId] || [];
              if (existing.some(a => matchesRequestedCatholicArticle(a, initialArticleId))) {
                return prev;
              }
              return {
                ...prev,
                [initialSourceId]: [stub, ...existing]
              };
            });
          }
          setSelectedArticleIndex(0);
          selectedIndexRef.current = 0;
        }
      } else {
        requestedArticleIdRef.current = null;
        requestedSourceIdRef.current = null;
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
    setRefreshAllSummary(null);
    try {
      const result = await fetchCatholicRssFeedWithStatus(sourceId, isManualRefresh);
      if (perSourceSeqRef.current[sourceId] !== seq) return;

      const now = Date.now();
      setFeedStatusBySource(prev => ({
        ...prev,
        [sourceId]: {
          isLive: result.isLive,
          liveCount: result.liveCount,
          syncedAt: now,
          error: result.error
        }
      }));
      setLastRefreshedAt(now);

      if (result.articles && result.articles.length > 0) {
        const targetArticleId =
          requestedSourceIdRef.current === sourceId ? requestedArticleIdRef.current : null;

        let nextArticles = result.articles;
        let idxToUse: number | null = null;

        if (targetArticleId) {
          const matchedIdx = nextArticles.findIndex(a =>
            matchesRequestedCatholicArticle(a, targetArticleId)
          );
          if (matchedIdx >= 0) {
            idxToUse = matchedIdx;
          } else {
            const heroConfig = HERO_RIGHT_ARTICLES.find(
              h => h.id === targetArticleId && h.sourceId === sourceId
            );
            if (heroConfig) {
              nextArticles = [createHeroRightArticleStub(heroConfig), ...nextArticles];
              idxToUse = 0;
            } else {
              idxToUse = 0;
            }
          }
          requestedArticleIdRef.current = null;
          requestedSourceIdRef.current = null;
        }

        setArticlesBySource(prev => ({
          ...prev,
          [sourceId]: nextArticles
        }));

        if (idxToUse !== null) {
          selectedIndexRef.current = idxToUse;
          setSelectedArticleIndex(idxToUse);
        } else if (isManualRefresh) {
          if (isReadingAloud) SacredReader.stop();
          selectedIndexRef.current = 0;
          setSelectedArticleIndex(0);
        }
      }
    } finally {
      if (perSourceSeqRef.current[sourceId] === seq) {
        setIsLoading(false);
      }
    }
  };

  const handleRefreshAllFeeds = async () => {
    setIsRefreshingAll(true);
    setIsLoading(true);
    if (isReadingAloud) SacredReader.stop();

    const total = CATHOLIC_RSS_SOURCES.length;
    setRefreshAllSummary(null);
    setRefreshAllProgress({ completed: 0, liveCount: 0, total });

    const seqs: Record<string, number> = {};
    for (const src of CATHOLIC_RSS_SOURCES) {
      const next = (perSourceSeqRef.current[src.id] || 0) + 1;
      perSourceSeqRef.current[src.id] = next;
      seqs[src.id] = next;
    }

    let completed = 0;
    let liveSources = 0;

    try {
      await Promise.allSettled(
        CATHOLIC_RSS_SOURCES.map(async src => {
          const result = await fetchCatholicRssFeedWithStatus(src.id, true);
          completed += 1;
          if (result.isLive) liveSources += 1;

          setRefreshAllProgress({ completed, liveCount: liveSources, total });

          if (perSourceSeqRef.current[src.id] !== seqs[src.id]) return;

          const now = Date.now();
          setFeedStatusBySource(prev => ({
            ...prev,
            [src.id]: {
              isLive: result.isLive,
              liveCount: result.liveCount,
              syncedAt: now,
              error: result.error
            }
          }));

          if (result.articles && result.articles.length > 0) {
            setArticlesBySource(prev => ({
              ...prev,
              [src.id]: result.articles
            }));
          }
          setLastRefreshedAt(now);
        })
      );

      requestedArticleIdRef.current = null;
      selectedIndexRef.current = 0;
      setSelectedArticleIndex(0);
      const finishedAt = Date.now();
      setLastRefreshedAt(finishedAt);
      setRefreshAllSummary({
        liveSources,
        total,
        syncedAt: finishedAt
      });
    } finally {
      setRefreshAllProgress(null);
      setIsRefreshingAll(false);
      setIsLoading(false);
    }
  };

  const handleRefreshAllRef = useRef(handleRefreshAllFeeds);
  handleRefreshAllRef.current = handleRefreshAllFeeds;

  // Load feed when switching publication source
  useEffect(() => {
    loadSourceFeed(selectedSourceId, true);
  }, [selectedSourceId]);

  // Pre-fetch remaining feeds sequentially in small batches after mount without clobbering active/manual refreshes
  useEffect(() => {
    let mounted = true;
    const prefetchAll = async () => {
      const others = CATHOLIC_RSS_SOURCES.filter(src => src.id !== selectedSourceId);
      for (let i = 0; i < others.length; i += 2) {
        if (!mounted) break;
        const batch = others.slice(i, i + 2);
        await Promise.all(
          batch.map(async src => {
            if ((perSourceSeqRef.current[src.id] || 0) > 0) return;
            const seq = 1;
            perSourceSeqRef.current[src.id] = seq;
            try {
              const result = await fetchCatholicRssFeedWithStatus(src.id, false);
              if (!mounted || perSourceSeqRef.current[src.id] !== seq) return;
              const now = Date.now();
              setFeedStatusBySource(prev => ({
                ...prev,
                [src.id]: {
                  isLive: result.isLive,
                  liveCount: result.liveCount,
                  syncedAt: now,
                  error: result.error
                }
              }));
              if (result.articles && result.articles.length > 0) {
                setArticlesBySource(prev => ({
                  ...prev,
                  [src.id]: result.articles
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
        handleRefreshAllRef.current();
      }
    };

    const interval = setInterval(checkDailyRollover, 60000);
    window.addEventListener('focus', checkDailyRollover);
    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', checkDailyRollover);
    };
  }, [activeDayKey]);

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

  const activeSourceStatus = feedStatusBySource[selectedSourceId];

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

  const formatTime = (ms: number) =>
    new Date(ms).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Standardized Top Banner with Collapsible Settings Drop-Down for Publications */}
      <div className="rounded-xl overflow-hidden bg-[#1C120C] text-amber-50 shadow-md border border-amber-900/40">
        <div className={`sanctum-top-banner relative overflow-hidden px-5 pt-4 pb-3.5 sm:px-6 min-h-[196px] sm:h-[212px] bg-[#1C120C] flex flex-col justify-between ${isSettingsOpen ? 'rounded-t-xl' : 'rounded-xl'}`}>
          <div className="relative w-full my-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            {/* Left Column: Unobstructed Title, Description & Feed Controls */}
            <div className="relative z-20 flex-1 min-w-0 space-y-2">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 flex-wrap group">
                  <CatholicArticlesRssIcon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="font-cinzel text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-amber-300 leading-tight">
                    Catholic Press · {activeSourceMeta.shortName}
                  </span>
                </div>
                <h2 className="font-cinzel text-lg sm:text-[22px] font-bold text-white tracking-wide leading-tight">
                  Catholic Articles
                </h2>
                <p className="text-[11px] sm:text-xs text-stone-200 font-serif leading-[1.2] max-w-xl pt-0.5">
                  Open Settings to choose a publication or click Refresh Feed to fetch today&apos;s newest Catholic articles and step through live dispatches.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <button
                  type="button"
                  disabled={isLoading && !isRefreshingAll}
                  onClick={() => loadSourceFeed(selectedSourceId, true)}
                  className="h-7 sm:h-8 whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 px-2.5 sm:px-3 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-75 active:scale-[0.99] text-stone-950 text-[11px] sm:text-xs font-cinzel font-bold transition-all cursor-pointer shadow-sm"
                  title="Refresh this publication's live RSS feed for the latest articles"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-stone-950 ${isLoading && !isRefreshingAll ? 'animate-spin' : ''}`} />
                  <span>{isLoading && !isRefreshingAll ? 'Refreshing' : 'Refresh Feed'}</span>
                </button>

                <button
                  type="button"
                  disabled={isRefreshingAll}
                  onClick={handleRefreshAllFeeds}
                  className="h-7 sm:h-8 whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 px-2.5 sm:px-3 rounded-lg bg-stone-800/90 hover:bg-stone-700 disabled:opacity-75 active:scale-[0.99] border border-amber-500/40 text-amber-200 text-[11px] sm:text-xs font-cinzel font-semibold transition-all cursor-pointer"
                  title={`Refresh all ${CATHOLIC_RSS_SOURCES.length} Catholic RSS feeds simultaneously`}
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isRefreshingAll ? 'animate-spin' : ''}`} />
                  <span>
                    {isRefreshingAll && refreshAllProgress
                      ? `Syncing ${refreshAllProgress.completed}/${refreshAllProgress.total}`
                      : `Refresh All ${CATHOLIC_RSS_SOURCES.length}`}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsSettingsOpen(prev => !prev)}
                  aria-expanded={isSettingsOpen}
                  className={`h-7 sm:h-8 whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 px-2.5 sm:px-3 rounded-lg border text-[11px] sm:text-xs font-cinzel font-semibold transition-all cursor-pointer ${
                    isSettingsOpen
                      ? 'bg-[#3A2213] text-[#FDF8F0] border-[#D4A373] ring-2 ring-[#8B5A2B]/40'
                      : 'bg-[#1A0F08]/92 hover:bg-[#3A2213] text-[#D4A373] hover:text-[#F7EBE1] border-[#8B5A2B]/65 hover:border-[#D4A373]/70'
                  }`}
                  title={isSettingsOpen ? 'Hide Publications & Settings' : 'Select Catholic Publication'}
                >
                  <Settings className="w-3.5 h-3.5 text-[#D4A373] shrink-0" />
                  <span>Settings</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#D4A373] shrink-0 transition-transform duration-200 ${
                      isSettingsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isRefreshingAll && refreshAllProgress ? (
                  <span className="text-[10.5px] font-serif text-amber-300 inline-flex items-center gap-1 whitespace-nowrap">
                    <RefreshCw className="w-3 h-3 animate-spin shrink-0" />
                    <span>Syncing ({refreshAllProgress.completed}/{refreshAllProgress.total})</span>
                  </span>
                ) : refreshAllSummary ? (
                  <span className="hidden lg:inline-flex text-[10.5px] font-serif text-emerald-300 items-center gap-1 whitespace-nowrap">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{refreshAllSummary.liveSources}/{refreshAllSummary.total} live · {formatTime(refreshAllSummary.syncedAt)}</span>
                  </span>
                ) : activeSourceStatus?.isLive ? (
                  <span className="hidden lg:inline-flex text-[10.5px] font-serif text-emerald-300/95 items-center gap-1 whitespace-nowrap">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Synced {formatTime(activeSourceStatus.syncedAt || lastRefreshedAt)}</span>
                  </span>
                ) : null}
              </div>
            </div>

            {/* Right Column (Desktop / Tablet): Orderly Horizontal Overlapping Magazine Covers */}
            <div
              className="hidden sm:block relative z-10 shrink-0 pointer-events-none select-none w-[240px] md:w-[300px] lg:w-[360px] h-[152px] md:h-[168px]"
              aria-hidden="true"
            >
              {/* Layer 6 (Backmost / Leftmost): U.S. Catholic */}
              <div className="absolute right-[160px] md:right-[210px] lg:right-[290px] top-1/2 -translate-y-1/2 w-[90px] md:w-[110px] lg:w-[138px] aspect-[3/4] overflow-hidden border border-amber-200/25 shadow-[-8px_6px_16px_rgba(0,0,0,0.68)] z-10 brightness-[0.86]">
                <img
                  src="/assets/aistudio/image_b7c5319b.png"
                  alt=""
                  decoding="async"
                  className="h-full w-full object-cover object-top"
                />
              </div>

              {/* Layer 5: Catholic Digest */}
              <div className="absolute right-[128px] md:right-[168px] lg:right-[232px] top-1/2 -translate-y-1/2 w-[90px] md:w-[110px] lg:w-[138px] aspect-[3/4] overflow-hidden border border-amber-200/30 shadow-[-10px_6px_18px_rgba(0,0,0,0.74)] z-20 brightness-[0.90]">
                <img
                  src="/assets/aistudio/image_a4bdeb02.png"
                  alt=""
                  decoding="async"
                  className="h-full w-full object-cover object-top"
                />
              </div>

              {/* Layer 4: Catholic Answers Magazine */}
              <div className="absolute right-[96px] md:right-[126px] lg:right-[174px] top-1/2 -translate-y-1/2 w-[90px] md:w-[110px] lg:w-[138px] aspect-[3/4] overflow-hidden border border-amber-200/35 shadow-[-10px_6px_20px_rgba(0,0,0,0.78)] z-30 brightness-[0.94]">
                <img
                  src="/assets/aistudio/image_9aad468b.png"
                  alt=""
                  decoding="async"
                  className="h-full w-full object-cover object-top"
                />
              </div>

              {/* Layer 3: Signs & Wonders for Our Times */}
              <div className="absolute right-[64px] md:right-[84px] lg:right-[116px] top-1/2 -translate-y-1/2 w-[90px] md:w-[110px] lg:w-[138px] aspect-[3/4] overflow-hidden border border-amber-200/45 shadow-[-12px_6px_22px_rgba(0,0,0,0.82)] z-40">
                <img
                  src="/assets/aistudio/image_6b7ae47f.png"
                  alt=""
                  decoding="async"
                  className="h-full w-full object-cover object-top"
                />
              </div>

              {/* Layer 2: National Catholic Register */}
              <div className="absolute right-[32px] md:right-[42px] lg:right-[58px] top-1/2 -translate-y-1/2 w-[90px] md:w-[110px] lg:w-[138px] aspect-[3/4] overflow-hidden border border-amber-200/55 shadow-[-12px_6px_24px_rgba(0,0,0,0.86)] z-50">
                <img
                  src="/assets/aistudio/image_332d1a4e.png"
                  alt=""
                  decoding="async"
                  className="h-full w-full object-cover object-top"
                />
              </div>

              {/* Layer 1 (Top / Frontmost): Catholic Answers */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[90px] md:w-[110px] lg:w-[138px] aspect-[3/4] overflow-hidden border border-amber-300/75 shadow-[-14px_6px_26px_rgba(0,0,0,0.92)] z-[60] bg-[#06090E] pt-2.5 px-2 pb-2.5 md:pt-3 md:px-2.5 md:pb-3 lg:pt-3.5 lg:px-3 lg:pb-3.5">
                <div className="relative w-full h-full overflow-hidden bg-[#06090E]">
                  <img
                    src="/assets/aistudio/image_12421551.png"
                    alt=""
                    decoding="async"
                    className="w-full h-auto -mt-[10%] block"
                  />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-2 bg-gradient-to-b from-[#06090E] to-transparent" />
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-[#06090E] to-transparent" />
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-2 bg-gradient-to-l from-[#06090E] to-transparent" />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2 bg-gradient-to-t from-[#06090E] to-transparent" />
                </div>
              </div>
            </div>

            {/* Mobile Orderly Horizontal Overlapping Covers Row */}
            <div className="sm:hidden relative h-[112px] flex items-center justify-center pointer-events-none select-none" aria-hidden="true">
              <div className="relative w-[298px] h-[104px]">
                <div className="absolute right-[220px] top-1/2 -translate-y-1/2 w-[78px] aspect-[3/4] overflow-hidden border border-amber-200/25 shadow-[-6px_4px_12px_rgba(0,0,0,0.7)] z-10 brightness-[0.86]">
                  <img src="/assets/aistudio/image_b7c5319b.png" alt="" decoding="async" className="h-full w-full object-cover object-top" />
                </div>
                <div className="absolute right-[176px] top-1/2 -translate-y-1/2 w-[78px] aspect-[3/4] overflow-hidden border border-amber-200/30 shadow-[-6px_4px_12px_rgba(0,0,0,0.75)] z-20 brightness-[0.90]">
                  <img src="/assets/aistudio/image_a4bdeb02.png" alt="" decoding="async" className="h-full w-full object-cover object-top" />
                </div>
                <div className="absolute right-[132px] top-1/2 -translate-y-1/2 w-[78px] aspect-[3/4] overflow-hidden border border-amber-200/35 shadow-[-8px_4px_14px_rgba(0,0,0,0.8)] z-30 brightness-[0.94]">
                  <img src="/assets/aistudio/image_9aad468b.png" alt="" decoding="async" className="h-full w-full object-cover object-top" />
                </div>
                <div className="absolute right-[88px] top-1/2 -translate-y-1/2 w-[78px] aspect-[3/4] overflow-hidden border border-amber-200/45 shadow-[-8px_4px_16px_rgba(0,0,0,0.85)] z-40">
                  <img src="/assets/aistudio/image_6b7ae47f.png" alt="" decoding="async" className="h-full w-full object-cover object-top" />
                </div>
                <div className="absolute right-[44px] top-1/2 -translate-y-1/2 w-[78px] aspect-[3/4] overflow-hidden border border-amber-200/55 shadow-[-10px_4px_18px_rgba(0,0,0,0.88)] z-50">
                  <img src="/assets/aistudio/image_332d1a4e.png" alt="" decoding="async" className="h-full w-full object-cover object-top" />
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[78px] aspect-[3/4] overflow-hidden border border-amber-300/75 shadow-[-10px_4px_20px_rgba(0,0,0,0.92)] z-[60] bg-[#06090E] pt-2 px-1.5 pb-2">
                  <div className="relative w-full h-full overflow-hidden bg-[#06090E]">
                    <img src="/assets/aistudio/image_12421551.png" alt="" decoding="async" className="w-full h-auto -mt-[10%] block" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5 bg-gradient-to-b from-[#06090E] to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1.5 bg-gradient-to-r from-[#06090E] to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-1.5 bg-gradient-to-l from-[#06090E] to-transparent" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-t from-[#06090E] to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Collapsible Settings Drop-Down: Catholic Publications Selector & Active Publication Info */}
        {isSettingsOpen && (
          <div className="px-5 py-3.5 sm:px-6 bg-gradient-to-r from-[#24160D] via-[#2C1A10] to-[#24160D] border-t border-amber-800/40 space-y-3 animate-fadeIn">
            <div className="flex items-center justify-between gap-2">
              <span className="font-cinzel text-[11px] font-bold uppercase tracking-widest text-amber-300">
                Catholic Publications ({CATHOLIC_RSS_SOURCES.length})
              </span>
              <span className="text-[11px] font-serif text-amber-100/80">
                Active: <strong className="text-amber-200">{activeSourceMeta.name}</strong>
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {CATHOLIC_RSS_SOURCES.map(src => {
                const isSelected = selectedSourceId === src.id;
                const count = (articlesBySource[src.id] || []).length;
                const srcStatus = feedStatusBySource[src.id];
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
                    {srcStatus?.syncedAt && (
                      <span
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          srcStatus.isLive
                            ? isSelected
                              ? 'bg-emerald-800'
                              : 'bg-emerald-400'
                            : isSelected
                              ? 'bg-amber-900'
                              : 'bg-amber-500/70'
                        }`}
                        title={srcStatus.isLive ? 'Live RSS connected' : 'Using archive fallback'}
                      />
                    )}
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

            <div className="pt-2.5 border-t border-amber-800/35 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="text-amber-100/90 font-serif italic">
                <strong className="not-italic font-cinzel text-amber-300">{activeSourceMeta.name}: </strong>
                {activeSourceMeta.tagline}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-3 sm:p-6 md:p-8 rounded-xl bg-white/45 backdrop-blur-xl backdrop-saturate-150 border border-white/60 ring-1 ring-inset ring-white/40 shadow-[0_8px_32px_0_rgba(120,90,50,0.12)] space-y-6">
      {/* Live Feed Dispatches List (Click any article in the feed to read immediately) */}
      {sourceArticles.length > 1 && (
        <div className="bg-white/80 backdrop-blur-md rounded-xl border border-stone-200/90 p-4 sm:p-5 shadow-xs space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/80 pb-2.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <h3 className="font-cinzel text-xs sm:text-sm font-bold text-stone-900 uppercase tracking-wider">
                {activeSourceMeta.name} — {activeSourceStatus?.isLive ? 'Live Feed Dispatches' : 'Curated Archive'} ({sourceArticles.length} Articles)
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
              const isLiveItem = isLiveCatholicArticle(item);
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
                      <div className="flex items-center gap-1">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[9px] ${
                            isLiveItem
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              : 'bg-stone-100 text-stone-600 border border-stone-200'
                          }`}
                        >
                          {isLiveItem ? 'Live RSS' : 'Archive'}
                        </span>
                        {isCurrent && (
                          <span className="px-1.5 py-0.5 rounded bg-amber-800 text-amber-50 text-[9px]">
                            Reading Now
                          </span>
                        )}
                      </div>
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
            <div className="flex flex-wrap items-center gap-2 min-w-0 max-w-full">
              <span className="px-3 py-1 rounded-md bg-amber-900 text-amber-50 font-bold font-cinzel text-xs shadow-2xs max-w-full truncate">
                {currentArticle.sourceName}
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-cinzel font-bold uppercase tracking-wider ${
                  isLiveCatholicArticle(currentArticle)
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    : 'bg-stone-100 text-stone-600 border border-stone-200'
                }`}
              >
                {isLiveCatholicArticle(currentArticle) ? 'Live RSS' : 'Archive'}
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
              <div className="flex flex-wrap items-center gap-2 min-w-0 max-w-full">
                <select
                  value={selectedArticleIndex}
                  onChange={(e) => {
                    if (isReadingAloud) SacredReader.stop();
                    const idx = Number(e.target.value);
                    selectedIndexRef.current = idx;
                    setSelectedArticleIndex(idx);
                  }}
                  aria-label="Select an article from this feed"
                  className="min-w-0 max-w-full sm:max-w-[260px] px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 text-xs font-serif truncate cursor-pointer focus:outline-none focus:border-amber-700"
                >
                  {sourceArticles.map((art, idx) => (
                    <option key={art.id} value={idx}>
                      {idx + 1}. {art.title}
                    </option>
                  ))}
                </select>

                <div className="flex items-center gap-1.5 shrink-0">
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
            <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2.5">
              <span className="text-xs font-cinzel text-stone-500 min-w-0 truncate flex-1 basis-full sm:basis-auto">
                {currentArticle.sourceName} • Article {selectedArticleIndex + 1} of {sourceArticles.length}
              </span>
              <div className="flex items-center gap-2 shrink-0 ml-auto">
                <button
                  type="button"
                  onClick={handlePrevArticle}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 text-xs font-cinzel font-bold transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4 text-amber-800 shrink-0" />
                  <span>Previous Article</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextArticle}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 text-xs font-cinzel font-bold transition-colors cursor-pointer"
                >
                  <span>Next Article</span>
                  <ChevronRight className="w-4 h-4 text-amber-800 shrink-0" />
                </button>
              </div>
            </div>
          )}
        </article>
      )}
      </div>
    </div>
  );
};
