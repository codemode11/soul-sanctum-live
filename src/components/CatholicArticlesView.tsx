import React, { useState, useEffect, useMemo } from 'react';
import {
  Clock,
  Copy,
  Check,
  RefreshCw,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { CatholicArticlesRssIcon } from './SanctumIcons';
import {
  CATHOLIC_RSS_SOURCES,
  CURATED_CATHOLIC_ARTICLES,
  CatholicArticleItem,
  fetchCatholicRssArticlesForSource,
  fetchFullCatholicArticleContent
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
  // Default to initialSourceId if passed from Masthead, otherwise the first source (St. Paul Center)
  const [selectedSourceId, setSelectedSourceId] = useState<string>(
    initialSourceId || CATHOLIC_RSS_SOURCES[0].id
  );
  const [selectedArticleIndex, setSelectedArticleIndex] = useState<number>(0);
  const [lastRefreshedAt, setLastRefreshedAt] = useState<number>(Date.now());
  const [refreshStatusMessage, setRefreshStatusMessage] = useState<string | null>(null);
  const [activeDayKey, setActiveDayKey] = useState<string>(() => new Date().toISOString().slice(0, 10));

  const [articlesBySource, setArticlesBySource] = useState<Record<string, CatholicArticleItem[]>>(() => {
    const initial: Record<string, CatholicArticleItem[]> = {};
    for (const src of CATHOLIC_RSS_SOURCES) {
      initial[src.id] = CURATED_CATHOLIC_ARTICLES.filter(a => a.sourceId === src.id);
    }
    return initial;
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetchingFullText, setIsFetchingFullText] = useState<boolean>(false);
  const [isReadingAloud, setIsReadingAloud] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (initialSourceId) {
      setSelectedSourceId(initialSourceId);
      const list = articlesBySource[initialSourceId] || [];
      if (initialArticleId) {
        const idx = list.findIndex(a => a.id === initialArticleId);
        setSelectedArticleIndex(idx >= 0 ? idx : 0);
      } else {
        setSelectedArticleIndex(0);
      }
      if (onClearInitialArticle) {
        onClearInitialArticle();
      }
    }
  }, [initialSourceId, initialArticleId]);

  const loadSourceFeed = async (sourceId: string, isManualRefresh: boolean = false) => {
    setIsLoading(true);
    if (isManualRefresh) {
      setRefreshStatusMessage(null);
    }
    try {
      const items = await fetchCatholicRssArticlesForSource(sourceId, isManualRefresh);
      if (items && items.length > 0) {
        const previousList = articlesBySource[sourceId] || [];
        const currentDisplayedId = previousList[selectedArticleIndex]?.id;

        setArticlesBySource(prev => ({
          ...prev,
          [sourceId]: items
        }));
        setLastRefreshedAt(Date.now());

        if (isManualRefresh) {
          if (isReadingAloud) SacredReader.stop();
          // If the feed has multiple articles and the top article is identical to what was already on screen,
          // advance to the next fresh article in the live feed so the user immediately sees a new article!
          if (items.length > 1) {
            const nextIdx =
              items[0].id === currentDisplayedId
                ? (selectedArticleIndex + 1) % items.length
                : 0;
            setSelectedArticleIndex(nextIdx);
            setRefreshStatusMessage(
              `Feed refreshed (${items.length} articles available) — now showing Article ${nextIdx + 1} of ${items.length}`
            );
          } else {
            setSelectedArticleIndex(0);
            setRefreshStatusMessage(`Feed refreshed — ${items.length} article loaded`);
          }
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Load feed when switching publication source
  useEffect(() => {
    setRefreshStatusMessage(null);
    loadSourceFeed(selectedSourceId, false);
  }, [selectedSourceId]);

  // Automatic daily feed refresh check (every 60s and when tab regains focus)
  useEffect(() => {
    const checkDailyRollover = () => {
      const todayKey = new Date().toISOString().slice(0, 10);
      if (todayKey !== activeDayKey) {
        setActiveDayKey(todayKey);
        loadSourceFeed(selectedSourceId, true);
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
  };

  const handlePrevArticle = () => {
    if (selectedArticleIndex > 0) {
      if (isReadingAloud) SacredReader.stop();
      setSelectedArticleIndex(prev => prev - 1);
    }
  };

  const handleNextArticle = () => {
    if (selectedArticleIndex < sourceArticles.length - 1) {
      if (isReadingAloud) SacredReader.stop();
      setSelectedArticleIndex(prev => prev + 1);
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

  return (
    <div className="max-w-5xl mx-auto p-3 sm:p-6 md:p-8 rounded-xl bg-white/45 backdrop-blur-xl backdrop-saturate-150 border border-white/60 ring-1 ring-inset ring-white/40 shadow-[0_8px_32px_0_rgba(120,90,50,0.12)] space-y-6 mb-12">
      {/* Top Banner & Source Selector (One RSS Source at a Time) */}
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
              Select a publication below to read its complete articles in their entirety right within the website.
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => loadSourceFeed(selectedSourceId, true)}
              disabled={isLoading}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-stone-800/90 hover:bg-stone-700 active:scale-[0.99] border border-amber-500/40 text-amber-200 text-xs font-cinzel font-semibold transition-all cursor-pointer shrink-0"
              title="Fetch latest daily articles and cycle to the next fresh dispatch"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Refreshing Feed...' : 'Refresh Feed'}</span>
            </button>
            <span className="text-[11px] font-serif text-amber-200/80">
              Updated {new Date(lastRefreshedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {sourceArticles.length} {sourceArticles.length === 1 ? 'article' : 'articles'}
            </span>
          </div>
        </div>

        {/* Catholic Publications Filter Bar */}
        <div className="flex flex-wrap gap-2 mt-5">
          {CATHOLIC_RSS_SOURCES.map(src => {
            const isSelected = selectedSourceId === src.id;
            return (
              <button
                key={src.id}
                type="button"
                onClick={() => handleSelectSource(src.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium font-cinzel transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-400 text-amber-950 font-bold shadow-xs'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                {src.shortName}
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
            <div className="text-amber-300 font-cinzel text-[11px] font-semibold">
              {refreshStatusMessage}
            </div>
          )}
        </div>
      </div>

      {/* Single Full-Article Reader Card (One RSS Article at a Time) */}
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
                    setSelectedArticleIndex(Number(e.target.value));
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
                    disabled={selectedArticleIndex === 0}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 disabled:opacity-40 text-stone-800 border border-stone-300 text-xs font-cinzel font-bold transition-colors cursor-pointer"
                    title="Previous article from this source"
                  >
                    <ChevronLeft className="w-3.5 h-3.5 text-amber-800" />
                    <span>Prev</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNextArticle}
                    disabled={selectedArticleIndex >= sourceArticles.length - 1}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 disabled:opacity-40 text-stone-800 border border-stone-300 text-xs font-cinzel font-bold transition-colors cursor-pointer"
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

          {/* Optional Article Image (Only shown if provided by the article and loads cleanly) */}
          {currentArticle.imageUrl && (
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
                  disabled={selectedArticleIndex === 0}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 disabled:opacity-40 text-stone-800 border border-stone-300 text-xs font-cinzel font-bold transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4 text-amber-800" />
                  <span>Previous Article</span>
                </button>
                <button
                  type="button"
                  onClick={handleNextArticle}
                  disabled={selectedArticleIndex >= sourceArticles.length - 1}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 disabled:opacity-40 text-stone-800 border border-stone-300 text-xs font-cinzel font-bold transition-colors cursor-pointer"
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
