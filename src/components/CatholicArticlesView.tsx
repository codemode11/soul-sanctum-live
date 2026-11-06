import React, { useState, useEffect, useMemo } from 'react';
import {
  Clock,
  Copy,
  Check,
  ExternalLink,
  RefreshCw,
  Volume2,
  VolumeX,
  Rss,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import {
  CATHOLIC_RSS_SOURCES,
  CURATED_CATHOLIC_ARTICLES,
  CatholicArticleItem,
  fetchCatholicRssArticlesForSource
} from '../data/catholicRssArticles';
import { SacredReader } from '../utils/speech';
import { toCurvedQuotes } from '../utils/typography';

export const CatholicArticlesView: React.FC = () => {
  // Default to the first source (Aleteia) so the user reads one RSS source at a time
  const [selectedSourceId, setSelectedSourceId] = useState<string>(CATHOLIC_RSS_SOURCES[0].id);
  const [selectedArticleIndex, setSelectedArticleIndex] = useState<number>(0);

  const [articlesBySource, setArticlesBySource] = useState<Record<string, CatholicArticleItem[]>>(() => {
    const initial: Record<string, CatholicArticleItem[]> = {};
    for (const src of CATHOLIC_RSS_SOURCES) {
      initial[src.id] = CURATED_CATHOLIC_ARTICLES.filter(a => a.sourceId === src.id);
    }
    return initial;
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isReadingAloud, setIsReadingAloud] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadSourceFeed = async (sourceId: string) => {
    setIsLoading(true);
    try {
      const items = await fetchCatholicRssArticlesForSource(sourceId);
      if (items && items.length > 0) {
        setArticlesBySource(prev => ({
          ...prev,
          [sourceId]: items
        }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadSourceFeed(selectedSourceId);
  }, [selectedSourceId]);

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
    const copyText = `${article.title}\nSource: ${article.sourceName} | By ${article.author} (${article.publishedDate})\n\n${article.content || article.summary}\n\nLink: ${article.link}`;
    navigator.clipboard.writeText(copyText);
    setCopiedId(article.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Banner & Source Selector (One RSS Source at a Time) */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 rounded-xl p-6 sm:p-8 text-amber-50 shadow-md border border-amber-900/40">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Rss className="w-4 h-4 text-amber-400" />
              <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-amber-300">
                Catholic Press & Theological Journals
              </span>
            </div>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide">
              Catholic Articles
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 font-serif-sacred max-w-2xl">
              Select a publication below to read its latest RSS article one at a time.
            </p>
          </div>

          <button
            onClick={() => loadSourceFeed(selectedSourceId)}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-stone-800/90 hover:bg-stone-700 border border-amber-500/40 text-amber-200 text-xs font-cinzel font-semibold transition-all cursor-pointer self-start shrink-0"
            title="Refresh this RSS feed"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Refreshing...' : 'Refresh Feed'}</span>
          </button>
        </div>

        {/* 9 Catholic Publications Filter Bar (Individual Sources Only) */}
        <div className="flex flex-wrap gap-2 mt-5">
          {CATHOLIC_RSS_SOURCES.map(src => {
            const isSelected = selectedSourceId === src.id;
            return (
              <button
                key={src.id}
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

        {/* Active Publication Info Strip */}
        <div className="mt-4 pt-3 border-t border-amber-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="text-amber-100/90 font-serif italic">
            <strong className="not-italic font-cinzel text-amber-300">{activeSourceMeta.name}: </strong>
            {activeSourceMeta.tagline}
          </div>
          <a
            href={activeSourceMeta.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-amber-300 hover:text-amber-200 font-cinzel text-[11px] font-bold shrink-0"
          >
            <span>Visit {activeSourceMeta.shortName}</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Single Article Reader Card (One RSS Article at a Time) */}
      {currentArticle && (
        <article className="bg-white/85 backdrop-blur-xl backdrop-saturate-150 p-6 sm:p-8 rounded-2xl border border-white/80 ring-1 ring-inset ring-white/50 shadow-[0_8px_32px_0_rgba(120,90,50,0.14)] space-y-5">
          {/* Top Navigation & Article Counter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-md bg-amber-900 text-amber-50 font-bold font-cinzel text-xs shadow-2xs">
                {currentArticle.sourceName}
              </span>
              {sourceArticles.length > 1 && (
                <span className="text-xs font-cinzel font-semibold text-stone-500">
                  • Article {selectedArticleIndex + 1} of {sourceArticles.length}
                </span>
              )}
            </div>

            {/* Previous / Next Article Controls for Current Source */}
            {sourceArticles.length > 1 && (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrevArticle}
                  disabled={selectedArticleIndex === 0}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 disabled:opacity-40 text-stone-800 border border-stone-300 text-xs font-cinzel font-bold transition-colors cursor-pointer"
                  title="Previous article from this source"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-amber-800" />
                  <span>Prev</span>
                </button>
                <button
                  onClick={handleNextArticle}
                  disabled={selectedArticleIndex >= sourceArticles.length - 1}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 disabled:opacity-40 text-stone-800 border border-stone-300 text-xs font-cinzel font-bold transition-colors cursor-pointer"
                  title="Next article from this source"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5 text-amber-800" />
                </button>
              </div>
            )}
          </div>

          {/* Article Title, Author & Date */}
          <div className="space-y-2">
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
                  onClick={() => handleToggleReadAloud(currentArticle)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    isReadingAloud
                      ? 'bg-amber-800 text-white animate-pulse'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300'
                  }`}
                  title={isReadingAloud ? 'Stop Audio' : 'Listen to this article'}
                >
                  {isReadingAloud ? (
                    <VolumeX className="w-3.5 h-3.5" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 text-amber-800" />
                  )}
                  <span>{isReadingAloud ? 'Stop Audio' : 'Listen'}</span>
                </button>

                <button
                  onClick={() => handleCopyArticle(currentArticle)}
                  className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Copy article text"
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

          {/* Optional Article Image (Only shown if provided by the RSS item and loads cleanly) */}
          {currentArticle.imageUrl && (
            <div className="rounded-xl overflow-hidden border border-stone-300 bg-stone-100">
              <img
                key={currentArticle.imageUrl}
                src={currentArticle.imageUrl}
                alt={currentArticle.title}
                className="w-full max-h-80 object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const container = e.currentTarget.parentElement;
                  if (container) container.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Full Article Content */}
          <div className="font-serif-sacred text-stone-900 text-base sm:text-lg leading-relaxed whitespace-pre-line space-y-4 pt-1 border-t border-stone-200/70">
            {toCurvedQuotes(currentArticle.content || currentArticle.summary)}
          </div>

          {/* Bottom Bar: Original Source Link & Article Stepping */}
          <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
            {currentArticle.link && (
              <a
                href={currentArticle.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-amber-900 hover:bg-amber-800 text-amber-50 text-xs font-cinzel font-bold inline-flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <span>Read Original on {currentArticle.sourceName}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {sourceArticles.length > 1 && (
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={handlePrevArticle}
                  disabled={selectedArticleIndex === 0}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 disabled:opacity-40 text-stone-800 border border-stone-300 text-xs font-cinzel font-bold transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4 text-amber-800" />
                  <span>Previous Article</span>
                </button>
                <button
                  onClick={handleNextArticle}
                  disabled={selectedArticleIndex >= sourceArticles.length - 1}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 disabled:opacity-40 text-stone-800 border border-stone-300 text-xs font-cinzel font-bold transition-colors cursor-pointer"
                >
                  <span>Next Article</span>
                  <ChevronRight className="w-4 h-4 text-amber-800" />
                </button>
              </div>
            )}
          </div>
        </article>
      )}
    </div>
  );
};
