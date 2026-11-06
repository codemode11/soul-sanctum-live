import React, { useState, useEffect, useMemo } from 'react';
import {
  BookOpen,
  Clock,
  Copy,
  Check,
  ExternalLink,
  Globe,
  RefreshCw,
  Volume2,
  VolumeX,
  X,
  Rss
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
  const [selectedSourceId, setSelectedSourceId] = useState<string>('all');
  const [articlesBySource, setArticlesBySource] = useState<Record<string, CatholicArticleItem[]>>(() => {
    const initial: Record<string, CatholicArticleItem[]> = {};
    for (const src of CATHOLIC_RSS_SOURCES) {
      initial[src.id] = CURATED_CATHOLIC_ARTICLES.filter(a => a.sourceId === src.id);
    }
    return initial;
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeArticle, setActiveArticle] = useState<CatholicArticleItem | null>(null);
  const [isReadingAloud, setIsReadingAloud] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const loadFeeds = async (targetSourceId?: string) => {
    setIsLoading(true);
    try {
      const sourcesToFetch = targetSourceId && targetSourceId !== 'all'
        ? CATHOLIC_RSS_SOURCES.filter(s => s.id === targetSourceId)
        : CATHOLIC_RSS_SOURCES;

      const results = await Promise.all(
        sourcesToFetch.map(async (src) => {
          const items = await fetchCatholicRssArticlesForSource(src.id);
          return { id: src.id, items };
        })
      );

      setArticlesBySource(prev => {
        const next = { ...prev };
        for (const r of results) {
          if (r.items && r.items.length > 0) {
            next[r.id] = r.items;
          }
        }
        return next;
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadFeeds();
  }, []);

  useEffect(() => {
    const unsub = SacredReader.addListener((speaking) => {
      setIsReadingAloud(speaking);
    });
    return () => {
      unsub();
      SacredReader.stop();
    };
  }, []);

  const displayedArticles = useMemo(() => {
    if (selectedSourceId === 'all') {
      // Interleave top articles from each of the 9 Catholic publications
      const combined: CatholicArticleItem[] = [];
      const maxLen = Math.max(
        ...CATHOLIC_RSS_SOURCES.map(s => (articlesBySource[s.id] || []).length),
        1
      );
      for (let i = 0; i < Math.min(maxLen, 4); i++) {
        for (const src of CATHOLIC_RSS_SOURCES) {
          const list = articlesBySource[src.id] || [];
          if (list[i]) {
            combined.push(list[i]);
          }
        }
      }
      return combined;
    }
    return articlesBySource[selectedSourceId] || [];
  }, [selectedSourceId, articlesBySource]);

  const activeSourceMeta = useMemo(
    () => CATHOLIC_RSS_SOURCES.find(s => s.id === selectedSourceId),
    [selectedSourceId]
  );

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
      {/* Top Banner */}
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
              Live RSS dispatches and essays from Aleteia, National Catholic Register, CBCP, Catholic Digest, Catholic Insight, Catholic Answers Magazine, Word on Fire, St. Paul Center, and Catholic Education Resource Center.
            </p>
          </div>

          <button
            onClick={() => loadFeeds(selectedSourceId)}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-stone-800/90 hover:bg-stone-700 border border-amber-500/40 text-amber-200 text-xs font-cinzel font-semibold transition-all cursor-pointer self-start shrink-0"
            title="Refresh live RSS feeds"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Refreshing...' : 'Refresh Feeds'}</span>
          </button>
        </div>

        {/* 9 Catholic Publications Filter Bar */}
        <div className="flex flex-wrap gap-2 mt-5">
          <button
            onClick={() => setSelectedSourceId('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium font-cinzel transition-all cursor-pointer ${
              selectedSourceId === 'all'
                ? 'bg-amber-400 text-amber-950 font-bold shadow-xs'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
          >
            All Publications (9)
          </button>
          {CATHOLIC_RSS_SOURCES.map(src => (
            <button
              key={src.id}
              onClick={() => setSelectedSourceId(src.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium font-cinzel transition-all cursor-pointer ${
                selectedSourceId === src.id
                  ? 'bg-amber-400 text-amber-950 font-bold shadow-xs'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              {src.shortName}
            </button>
          ))}
        </div>

        {/* Active Publication Info Strip */}
        {activeSourceMeta && (
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
              <span>Visit Official Website</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        )}
      </div>

      {/* Articles Feed List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200/80 pb-2">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-amber-900" />
            <h3 className="font-cinzel text-sm sm:text-base font-bold text-stone-900 uppercase tracking-wide">
              {activeSourceMeta ? `${activeSourceMeta.name} Articles` : 'Latest Articles Across All 9 Catholic Feeds'}
            </h3>
          </div>
          <span className="text-xs font-serif italic text-amber-950">
            {displayedArticles.length} articles available
          </span>
        </div>

        {displayedArticles.map((item) => (
          <article
            key={item.id}
            className="bg-white/55 backdrop-blur-xl backdrop-saturate-150 p-5 sm:p-6 rounded-2xl border border-white/70 ring-1 ring-inset ring-white/40 shadow-[0_8px_32px_0_rgba(120,90,50,0.12)] hover:bg-white/75 transition-all space-y-3 group flex flex-col gap-3 relative"
          >
            {/* Publication Badge & Metadata */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-md bg-amber-900 text-amber-50 font-bold font-cinzel text-[11px] shadow-2xs">
                {item.sourceName}
              </span>
              <div className="flex items-center gap-3 text-stone-500">
                <span className="font-serif italic">{item.publishedDate}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.readTime}
                </span>
              </div>
            </div>

            {/* Main Content & Optional Feed Image */}
            <div className="flex flex-col md:flex-row gap-4 items-start">
              {item.imageUrl && (
                <div className="w-full md:w-44 h-32 shrink-0 rounded-xl overflow-hidden bg-stone-200 border border-stone-300 relative group-hover:shadow-md transition-all">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const container = e.currentTarget.parentElement;
                      if (container) container.style.display = 'none';
                    }}
                  />
                </div>
              )}

              <div className="space-y-1.5 flex-1">
                <h4
                  onClick={() => setActiveArticle(item)}
                  className="font-cinzel text-lg sm:text-xl font-bold text-stone-900 group-hover:text-amber-900 transition-colors cursor-pointer"
                >
                  {toCurvedQuotes(item.title)}
                </h4>
                <p className="text-xs text-amber-900 font-serif-sacred italic">
                  By {item.author}
                </p>
                <p className="text-xs sm:text-sm text-stone-700 font-serif-sacred leading-relaxed pl-3 border-l-2 border-amber-800/60 line-clamp-3">
                  {toCurvedQuotes(item.summary)}
                </p>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="flex flex-wrap items-center justify-between pt-2 border-t border-stone-200/60 text-xs text-stone-500 gap-2">
              <div className="flex items-center gap-2">
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-xs font-medium text-amber-900 hover:text-amber-700 underline underline-offset-2"
                  >
                    <span>Original Article at {item.sourceName}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleReadAloud(item);
                  }}
                  className="px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                  title="Listen to article"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-800" />
                  <span>Listen</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopyArticle(item);
                  }}
                  className="px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                  title="Copy article text"
                >
                  {copiedId === item.id ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>Copy</span>
                </button>

                <button
                  onClick={() => setActiveArticle(item)}
                  className="px-3 py-1 rounded-md bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Read Full</span>
                  <BookOpen className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Full Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-2xl w-full space-y-5 shadow-2xl border border-stone-300 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-3">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-md bg-amber-900 text-amber-50 font-bold font-cinzel text-xs">
                  {activeArticle.sourceName}
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900 mt-2">
                  {toCurvedQuotes(activeArticle.title)}
                </h3>
                <p className="text-xs text-stone-500 font-serif-sacred pt-1">
                  {activeArticle.publishedDate} • By {activeArticle.author}
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => handleToggleReadAloud(activeArticle)}
                  className={`p-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isReadingAloud
                      ? 'bg-amber-600 text-white animate-pulse'
                      : 'bg-stone-100 hover:bg-stone-200 text-amber-900 border border-stone-300'
                  }`}
                  title={isReadingAloud ? 'Stop Audio' : 'Listen to Article'}
                >
                  {isReadingAloud ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => handleCopyArticle(activeArticle)}
                  className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 transition-colors cursor-pointer"
                  title="Copy article text"
                >
                  {copiedId === activeArticle.id ? (
                    <Check className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>

                <button
                  onClick={() => {
                    setActiveArticle(null);
                    if (isReadingAloud) SacredReader.stop();
                  }}
                  className="p-2 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
                  title="Close Article"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {activeArticle.imageUrl && (
              <div className="rounded-xl overflow-hidden border border-stone-300 bg-stone-100">
                <img
                  src={activeArticle.imageUrl}
                  alt={activeArticle.title}
                  className="w-full max-h-72 object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const container = e.currentTarget.parentElement;
                    if (container) container.style.display = 'none';
                  }}
                />
              </div>
            )}

            <div className="font-serif-sacred text-stone-900 text-base sm:text-lg leading-relaxed whitespace-pre-line space-y-4">
              {toCurvedQuotes(activeArticle.content || activeArticle.summary)}
            </div>

            <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2">
              {activeArticle.link && (
                <a
                  href={activeArticle.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-lg bg-amber-900 hover:bg-amber-800 text-amber-50 text-xs font-cinzel font-bold flex items-center gap-1.5 transition-colors"
                >
                  <span>Read Full Article on {activeArticle.sourceName}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              <button
                onClick={() => {
                  setActiveArticle(null);
                  if (isReadingAloud) SacredReader.stop();
                }}
                className="px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
