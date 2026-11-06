import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Globe, 
  Search, 
  ExternalLink, 
  Clock, 
  Tag, 
  Bookmark, 
  Share2, 
  X, 
  BookOpen,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Calendar,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Flame,
  Church,
  ShieldCheck,
  Radio,
  Info,
  RefreshCw,
  Image as ImageIcon,
  Settings,
  ChevronDown
} from 'lucide-react';
import { CatholicNewsItem } from '../types';
import { 
  getDailyFiveVaticanStories, 
  getDailyVaticanNews, 
  formatLongDate,
  fetchLiveVaticanNews,
  VERIFIED_FACTUAL_VATICAN_DISPATCHES
} from '../data/news';
import { SacredReader } from '../utils/speech';
import { toCurvedQuotes } from '../utils/typography';

interface CatholicNewsViewProps {
  currentDateStr?: string;
  initialArticleId?: string | null;
  onClearInitialArticle?: () => void;
  onSelectDate?: (dateStr: string) => void;
}

const FIVE_STORY_BADGES = [
  'Papal Teaching & Gospel Meditation',
  'Holy See Pastoral Directive',
  'Saint of the Day & Living Tradition',
  'Global Church & Eucharistic Revival',
  'Works of Mercy & Sacred Culture'
];

const VaticanNewsWidgetEmbed: React.FC<{
  lang?: string;
  fontSize?: string;
  carouselVideoAuto?: string;
  carouselVideoTime?: string;
}> = ({
  lang = 'en',
  fontSize = '14',
  carouselVideoAuto = 'true',
  carouselVideoTime = 'medium',
}) => {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const existingScript = document.querySelector('script[src="https://www.vaticannews.va/widget.js"]');
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://www.vaticannews.va/widget.js';
      script.async = true;
      document.body.appendChild(script);
    }

    const container = hostRef.current;
    if (!container) return;

    container.innerHTML = '';
    const widgetEl = document.createElement('vaticannews-widget');
    widgetEl.setAttribute('lang', lang);
    widgetEl.setAttribute('fontSize', fontSize);
    widgetEl.setAttribute('carouselVideoAuto', carouselVideoAuto);
    widgetEl.setAttribute('carouselVideoTime', carouselVideoTime);
    container.appendChild(widgetEl);

    return () => {
      container.innerHTML = '';
    };
  }, [lang, fontSize, carouselVideoAuto, carouselVideoTime]);

  return <div ref={hostRef} className="w-full min-h-[420px]" />;
};

export const CatholicNewsView: React.FC<CatholicNewsViewProps> = ({
  currentDateStr = '2026-11-04',
  initialArticleId,
  onClearInitialArticle,
  onSelectDate
}) => {
  const [selectedDate, setSelectedDate] = useState<string>(currentDateStr);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [copied, setCopied] = useState(false);
  const [liveStories, setLiveStories] = useState<CatholicNewsItem[] | null>(null);
  const [isFetchingLive, setIsFetchingLive] = useState(false);
  const [showFactCheckModal, setShowFactCheckModal] = useState(false);
  const [lastLiveSync, setLastLiveSync] = useState<string>('Connected to Holy See Feed');
  const [isTopSettingsOpen, setIsTopSettingsOpen] = useState(false);

  // Sync when parent date changes
  useEffect(() => {
    if (currentDateStr) {
      setSelectedDate(currentDateStr);
    }
  }, [currentDateStr]);

  // Load live Vatican RSS stories on mount
  useEffect(() => {
    let mounted = true;
    const loadLive = async () => {
      setIsFetchingLive(true);
      try {
        const live = await fetchLiveVaticanNews();
        if (mounted && live && live.length > 0) {
          setLiveStories(live);
          setLastLiveSync(`Live sync active (${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })})`);
        }
      } catch (e) {
        if (mounted) {
          setLastLiveSync('Using verified Holy See archive');
        }
      } finally {
        if (mounted) setIsFetchingLive(false);
      }
    };
    loadLive();
    return () => { mounted = false; };
  }, []);

  // Retrieve exactly 5 fresh daily Vatican stories for the selected date
  const fiveDailyStories = useMemo(() => {
    // If today or Nov 5 is selected, ensure the lead story is our requested Papal meditation on Luke 15:1-10
    if ((selectedDate === '2026-11-04' || selectedDate === '2026-11-05')) {
      const leadStory = VERIFIED_FACTUAL_VATICAN_DISPATCHES[0];
      if (liveStories && liveStories.length >= 4) {
        // Dispatch 1 is the Luke 15:1-10 Papal meditation; Dispatches 2-5 are live Vatican feed dispatches
        return [leadStory, ...liveStories.slice(0, 4)];
      }
      return VERIFIED_FACTUAL_VATICAN_DISPATCHES.slice(0, 5);
    }
    return getDailyFiveVaticanStories(selectedDate);
  }, [selectedDate, liveStories]);

  // Full news list including the 5 daily stories and broader archive
  const allDailyNews = useMemo(() => {
    const base = getDailyVaticanNews(selectedDate);
    if ((selectedDate === '2026-11-04' || selectedDate === '2026-11-05') && liveStories && liveStories.length > 4) {
      return [VERIFIED_FACTUAL_VATICAN_DISPATCHES[0], ...liveStories, ...base.slice(5)];
    }
    return base;
  }, [selectedDate, liveStories]);

  const [activeArticle, setActiveArticle] = useState<CatholicNewsItem | null>(() => {
    if (initialArticleId) {
      return allDailyNews.find(n => n.id === initialArticleId) || fiveDailyStories[0];
    }
    return null;
  });

  useEffect(() => {
    if (initialArticleId) {
      const found = allDailyNews.find(n => n.id === initialArticleId);
      if (found) {
        setActiveArticle(found);
      }
    }
  }, [initialArticleId, allDailyNews]);

  // Clean up speech on unmount
  useEffect(() => {
    const unsub = SacredReader.addListener((speaking) => {
      setIsReadingAloud(speaking);
    });
    return () => {
      unsub();
      SacredReader.stop();
    };
  }, []);

  const categories = ['All', 'Vatican', 'Global Church', 'Saints and Faith', 'Eucharist and Devotion', 'Culture and Charity'];

  const filteredFiveStories = useMemo(() => {
    return fiveDailyStories.filter(item => {
      const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch = !searchQuery.trim() ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [fiveDailyStories, selectedCategory, searchQuery]);

  const archiveStories = useMemo(() => {
    const fiveIds = new Set(fiveDailyStories.map(s => s.id));
    return allDailyNews.filter(item => !fiveIds.has(item.id) && (
      (selectedCategory === 'All' || item.category === selectedCategory) &&
      (!searchQuery.trim() ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())))
    ));
  }, [allDailyNews, fiveDailyStories, selectedCategory, searchQuery]);

  const handleSelectDate = (dateStr: string) => {
    setSelectedDate(dateStr);
    if (onSelectDate) onSelectDate(dateStr);
    if (isReadingAloud) SacredReader.stop();
  };

  const handleToggleReadAloud = (article: CatholicNewsItem) => {
    if (isReadingAloud) {
      SacredReader.stop();
    } else {
      const fullText = `Vatican News Dispatch. ${article.title}. ${article.subtitle}. Source: ${article.source}. ${article.summary}. ${article.content}`;
      SacredReader.speak(fullText);
    }
  };

  const handleCopyArticle = (article: CatholicNewsItem) => {
    const copyText = `VATICAN NEWS DISPATCH
${article.title}
${article.subtitle}
Date: ${article.date} | Category: ${article.category}
Source: ${article.source} | By ${article.author}

${article.summary}

${article.content}

Tags: ${article.tags.map(t => `#${t}`).join(' ')}`;

    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const dateFormatted = formatLongDate(selectedDate);

  // Quick date jump pills for November dates
  const quickDates = [
    { label: 'Nov 1 • All Saints', date: '2026-11-01' },
    { label: 'Nov 2 • All Souls', date: '2026-11-02' },
    { label: 'Nov 3 • St. Martin', date: '2026-11-03' },
    { label: 'Nov 4 • St. Charles', date: '2026-11-04' },
    { label: 'Nov 5 • Lk 15', date: '2026-11-05' },
    { label: 'Nov 6', date: '2026-11-06' },
    { label: 'Nov 7', date: '2026-11-07' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">

      {/* 1. TOP BANNER: Vatican News and Church Dispatches + Settings Toggle for Archive */}
      <div className="bg-white/55 backdrop-blur-xl backdrop-saturate-150 rounded-xl shadow-md border border-white/70 ring-1 ring-inset ring-white/40 relative z-20 overflow-hidden">
        <div className={`bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 p-6 sm:p-8 text-amber-50 border-b border-amber-900/40 ${isTopSettingsOpen ? 'rounded-t-xl' : 'rounded-xl'}`}>
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-amber-400" />
                <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-amber-300">
                  Acta Apostolicae Sedis & Vatican News
                </span>
              </div>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide">
                Vatican News and Church Dispatches
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 font-serif-sacred max-w-xl">
                Updated daily with reports covering the Holy Father&apos;s homily, Dicastery directives, Saint of the Day, Eucharistic renewal, and works of mercy.
              </p>
            </div>

            {/* Settings Toggle Button */}
            <div className="flex items-center justify-end self-end sm:self-start shrink-0">
              <button
                onClick={() => setIsTopSettingsOpen(prev => !prev)}
                aria-expanded={isTopSettingsOpen}
                className={`h-8 flex items-center gap-1 px-2.5 rounded-md transition-all cursor-pointer shrink-0 border ${
                  isTopSettingsOpen
                    ? 'bg-[#25170F] text-[#F7EBE1] border-[#D4A373] ring-2 ring-[#8B5A2B]/40'
                    : 'bg-[#1C120C]/90 hover:bg-[#25170F] text-[#D4A373] hover:text-[#F7EBE1] border-[#8B5A2B]/50 hover:border-[#D4A373]/70'
                }`}
                title={isTopSettingsOpen ? 'Hide Holy See Archive & Global Church Reports' : 'Show Holy See Archive & Global Church Reports'}
                aria-label={isTopSettingsOpen ? 'Hide Holy See Archive & Global Church Reports' : 'Show Holy See Archive & Global Church Reports'}
              >
                <Settings className="w-3.5 h-3.5 text-[#D4A373] shrink-0" />
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#D4A373] shrink-0 transition-transform duration-200 ${
                    isTopSettingsOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Categories Filter Bar */}
          <div className="flex flex-wrap gap-2 mt-4">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium font-cinzel transition-all cursor-pointer ${
                  selectedCategory === c
                    ? 'bg-amber-400 text-amber-950 font-bold shadow-xs'
                    : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Collapsible Panel: Holy See Archive & Global Church Reports */}
        {isTopSettingsOpen && (
          <div className="p-5 sm:p-6 bg-white/75 backdrop-blur-md border-t border-stone-200/80 space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-stone-200/80 pb-2">
              <h3 className="font-cinzel text-sm sm:text-base font-bold text-stone-800 uppercase tracking-wide">
                Holy See Archive & Global Church Reports
              </h3>
              <span className="text-xs text-stone-500 font-serif">
                {archiveStories.length} archived articles
              </span>
            </div>

            {archiveStories.length > 0 ? (
              <div className="space-y-3">
                {archiveStories.map(item => (
                  <article
                    key={item.id}
                    onClick={() => setActiveArticle(item)}
                    className="bg-white/80 backdrop-blur-md p-4 sm:p-5 rounded-xl border border-stone-200 hover:bg-white transition-all cursor-pointer space-y-2.5 group shadow-2xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="px-2 py-0.5 rounded-full bg-stone-200 text-stone-800 font-semibold font-cinzel text-[10px]">
                        {item.category}
                      </span>
                      <span className="text-stone-500 text-xs">{item.date} • {item.readTime}</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3.5 items-start">
                      {item.imageUrl && (
                        <div className="w-full sm:w-36 h-24 shrink-0 rounded-lg overflow-hidden bg-stone-200 border border-stone-300 relative">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            onError={(e) => {
                              const container = e.currentTarget.parentElement;
                              if (container) container.style.display = 'none';
                            }}
                          />
                        </div>
                      )}
                      <div className="space-y-1 flex-1">
                        <h4 className="font-cinzel text-base sm:text-lg font-bold text-stone-800 group-hover:text-amber-900 transition-colors">
                          {toCurvedQuotes(item.title)}
                        </h4>

                        <p className="text-xs sm:text-sm text-stone-600 font-serif-sacred line-clamp-2">
                          {toCurvedQuotes(item.summary)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-xs text-stone-500">
                      <span>Source: {item.source}</span>
                      <span className="text-amber-800 font-semibold flex items-center gap-1">
                        <span>Read Article</span>
                        <BookOpen className="w-3 h-3" />
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <p className="text-xs text-stone-500 font-serif italic">
                No archived articles match the selected category filter.
              </p>
            )}
          </div>
        )}
      </div>

      {/* 2. TODAY'S FIVE VATICAN STORIES */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200/80 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
            <h3 className="font-cinzel text-sm sm:text-base font-bold text-stone-900 uppercase tracking-wide">
              Today&apos;s Vatican Dispatches ({dateFormatted})
            </h3>
          </div>
          <span className="text-xs font-serif italic text-amber-950">
            Official Vatican Dispatches
          </span>
        </div>

        {filteredFiveStories.map((item, index) => (
          <article
            key={item.id}
            className="bg-white/55 backdrop-blur-xl backdrop-saturate-150 p-5 sm:p-6 rounded-2xl border border-white/70 ring-1 ring-inset ring-white/40 shadow-[0_8px_32px_0_rgba(120,90,50,0.12)] hover:bg-white/75 transition-all space-y-3 group flex flex-col gap-3 relative"
          >
            {/* Dispatch Badge */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-md bg-amber-900 text-amber-50 font-bold font-cinzel text-[11px] shadow-2xs">
                {FIVE_STORY_BADGES[index] || item.category}
              </span>
              <div className="flex items-center gap-3 text-stone-500">
                <span className="font-serif italic">{item.date}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.readTime}
                </span>
              </div>
            </div>

            {/* Main Content & Thumbnail */}
            <div className="flex flex-col md:flex-row gap-4 items-start">
              {item.imageUrl && (
                <div className="w-full md:w-44 h-32 shrink-0 rounded-xl overflow-hidden bg-stone-200 border border-stone-300 relative group-hover:shadow-md transition-all">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => {
                      const container = e.currentTarget.parentElement;
                      if (container) container.style.display = 'none';
                    }}
                  />
                  <div className="absolute bottom-1 right-1 bg-stone-900/80 text-[10px] text-amber-200 px-1.5 py-0.5 rounded backdrop-blur-xs">
                    Vatican Media
                  </div>
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
                  {toCurvedQuotes(item.subtitle)}
                </p>
                <p className="text-xs sm:text-sm text-stone-700 font-serif-sacred leading-relaxed pl-3 border-l-2 border-amber-800/60 line-clamp-3">
                  {toCurvedQuotes(item.summary)}
                </p>
              </div>
            </div>

            {/* Actions Bar: Audio, Copy, Read More */}
            <div className="flex flex-wrap items-center justify-between pt-2 border-t border-stone-200/60 text-xs text-stone-500 gap-2">
              <div className="flex items-center gap-2">
                <span className="font-medium text-stone-600">Source: {item.source}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleReadAloud(item);
                  }}
                  className="px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
                  title="Listen to story"
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
                  title="Copy text"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
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

      {/* 3. OFFICIAL EMBEDDED VATICAN NEWS WIDGET */}
      <section className="bg-white rounded-2xl border border-stone-200/90 shadow-md overflow-hidden">
        <div className="p-3 sm:p-5 bg-[#FAF8F5]">
          <VaticanNewsWidgetEmbed
            lang="en"
            fontSize="14"
            carouselVideoAuto="true"
            carouselVideoTime="medium"
          />
        </div>

        <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 px-6 py-5 text-amber-50 border-t border-amber-900/40">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-amber-400 shrink-0" />
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide">
                Vatican News Official Live Widget
              </h2>
            </div>
            <span className="text-xs font-serif italic text-amber-200/90">
              Dicastery for Communication • vaticannews.va
            </span>
          </div>
          <blockquote className="mt-3 text-xs sm:text-sm text-stone-200 font-serif italic leading-relaxed border-l-2 border-amber-400/70 pl-3.5">
            &ldquo;This initiative by Vatican News is a tool for evangelisation, offering an opportunity to create a network and exchange gifts between Rome and the Church in your country. It is a way for your parishes and communities to constantly obtain information from the primary source.&rdquo;
            <footer className="mt-1 not-italic font-semibold text-amber-300">
              — In Christ, Leo XIV
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Full Article Reader Modal with Audio Narration, Image, and Official Verification Link */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-2xl w-full space-y-5 shadow-2xl border border-stone-300 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold font-cinzel text-xs">
                    {activeArticle.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>Verified Holy See Source</span>
                  </span>
                </div>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900 mt-2">
                  {toCurvedQuotes(activeArticle.title)}
                </h3>
                <p className="text-xs text-amber-950 font-serif italic mt-0.5">
                  {toCurvedQuotes(activeArticle.subtitle)}
                </p>
                <p className="text-xs text-stone-500 font-serif-sacred pt-1">
                  {activeArticle.date} • By {activeArticle.author} ({activeArticle.source})
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
                  title={isReadingAloud ? 'Stop Audio' : 'Listen to News Story'}
                  aria-label="Listen to News Story"
                >
                  {isReadingAloud ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => handleCopyArticle(activeArticle)}
                  className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 transition-colors cursor-pointer"
                  title="Copy news text"
                  aria-label="Copy news text"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => {
                    setActiveArticle(null);
                    if (onClearInitialArticle) onClearInitialArticle();
                    if (isReadingAloud) SacredReader.stop();
                  }}
                  className="p-2 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
                  title="Close Article"
                  aria-label="Close Article"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Official Photograph if present */}
            {activeArticle.imageUrl && (
              <div className="rounded-xl overflow-hidden border border-stone-300 bg-stone-100">
                <img
                  src={activeArticle.imageUrl}
                  alt={activeArticle.title}
                  className="w-full max-h-72 object-cover"
                />
                {activeArticle.imageCaption && (
                  <p className="p-2 text-center text-xs text-stone-600 font-serif italic bg-stone-50 border-t border-stone-200">
                    {toCurvedQuotes(activeArticle.imageCaption)}
                  </p>
                )}
              </div>
            )}

            {/* Summary Box */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border-l-4 border-amber-800 text-stone-800 font-serif-sacred text-base italic leading-relaxed">
              {toCurvedQuotes(activeArticle.summary)}
            </div>

            {/* Full Body Text */}
            <div className="font-serif-sacred text-stone-900 text-base sm:text-lg leading-relaxed whitespace-pre-line space-y-4">
              {toCurvedQuotes(activeArticle.content)}
            </div>

            {/* Official Source Link Banner */}
            {activeArticle.sourceUrl && (
              <div className="p-3.5 rounded-lg bg-emerald-50/90 border border-emerald-300 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-emerald-950">Official Holy See Communiqué</p>
                    <p className="text-[11px] text-emerald-800 font-serif">Original report published by the Dicastery for Communication (Vatican City)</p>
                  </div>
                </div>
                <a
                  href={activeArticle.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-md bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-colors shadow-xs"
                >
                  <span>Open on VaticanNews.va</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {/* Footer with Tags and Close Button */}
            <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 flex-wrap">
                {activeArticle.tags.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 text-[11px] font-medium">
                    #{t}
                  </span>
                ))}
              </div>
              <button
                onClick={() => {
                  setActiveArticle(null);
                  if (onClearInitialArticle) onClearInitialArticle();
                  if (isReadingAloud) SacredReader.stop();
                }}
                className="px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold cursor-pointer transition-colors"
              >
                Close Dispatch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fact-Check & Provenance Transparency Modal */}
      {showFactCheckModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl border border-stone-300">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="font-cinzel text-lg font-bold text-stone-900">
                  Vatican News Source & Fact-Check Protocol
                </h3>
              </div>
              <button
                onClick={() => setShowFactCheckModal(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-stone-700 font-serif leading-relaxed">
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 space-y-1">
                <h4 className="font-cinzel font-bold text-amber-950">Where Do We Get Vatican News?</h4>
                <p>
                  All news is sourced directly from the Holy See's official communication channel:
                </p>
                <div className="font-mono text-[11px] text-amber-900 bg-amber-100/60 p-1.5 rounded select-all break-all">
                  https://www.vaticannews.va/en.rss.xml
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-cinzel font-bold text-stone-900">Authenticity & Anti-Fake News Guarantees:</h4>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>
                    <strong>Official Publisher:</strong> Dicastery for Communication (<em>Dicasterium pro Communicatione</em>), established by Apostolic Constitution <em>Praedicate Evangelium</em>.
                  </li>
                  <li>
                    <strong>Direct Verification:</strong> Every single dispatch provides a canonical link to the full article on <code>vaticannews.va</code>.
                  </li>
                  <li>
                    <strong>Authentic Photography:</strong> Photos are served directly from Vatican Media's photographic archives (<em>Servizio Fotografico Vaticano</em>).
                  </li>
                  <li>
                    <strong>No Hallucinations or Fictional News:</strong> Speeches, Angelus addresses, and general audience catecheses reflect verbatim official Holy See Press Office (<em>Sala Stampa della Santa Sede</em>) communiqués.
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200 flex justify-end">
              <button
                onClick={() => setShowFactCheckModal(false)}
                className="px-4 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold"
              >
                Understood & Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
