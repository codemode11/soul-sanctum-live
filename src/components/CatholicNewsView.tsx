import React, { useState, useEffect, useMemo } from 'react';
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
  Church
} from 'lucide-react';
import { CatholicNewsItem } from '../types';
import { 
  getDailyFiveVaticanStories, 
  getDailyVaticanNews, 
  formatLongDate 
} from '../data/news';
import { SacredReader } from '../utils/speech';

interface CatholicNewsViewProps {
  currentDateStr?: string;
  initialArticleId?: string | null;
  onClearInitialArticle?: () => void;
  onSelectDate?: (dateStr: string) => void;
}

const FIVE_STORY_BADGES = [
  'Dispatch 1 of 5 • Papal Teaching & Gospel Meditation',
  'Dispatch 2 of 5 • Holy See Pastoral Directive',
  'Dispatch 3 of 5 • Saint of the Day & Living Tradition',
  'Dispatch 4 of 5 • Universal Church & Eucharistic Revival',
  'Dispatch 5 of 5 • Works of Mercy & Sacred Culture'
];

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

  // Sync when parent date changes
  useEffect(() => {
    if (currentDateStr) {
      setSelectedDate(currentDateStr);
    }
  }, [currentDateStr]);

  // Retrieve exactly 5 fresh daily Vatican stories for the selected date
  const fiveDailyStories = useMemo(
    () => getDailyFiveVaticanStories(selectedDate),
    [selectedDate]
  );

  // Full news list including the 5 daily stories and broader archive
  const allDailyNews = useMemo(
    () => getDailyVaticanNews(selectedDate),
    [selectedDate]
  );

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
      
      {/* News Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 rounded-xl p-6 sm:p-8 text-amber-50 shadow-md border border-amber-900/40">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-amber-400" />
            <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-amber-300">
              Acta Apostolicae Sedis & Vatican News
            </span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide">
            Vatican News and Universal Church Dispatches
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 font-serif-sacred max-w-xl">
            Updated daily with five comprehensive reports covering the Holy Father's homily, Dicastery directives, Saint of the Day, Eucharistic renewal, and works of mercy.
          </p>
        </div>

        {/* Date Selector Navigation Bar */}
        <div className="mt-5 pt-4 border-t border-amber-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-cinzel text-amber-300">
            <Calendar className="w-4 h-4 text-amber-400" />
            <span className="font-bold">Active Date: {dateFormatted}</span>
          </div>

          {/* Quick Date Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {quickDates.map(qd => (
              <button
                key={qd.date}
                onClick={() => handleSelectDate(qd.date)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedDate === qd.date
                    ? 'bg-amber-400 text-amber-950 font-bold shadow-xs'
                    : 'bg-stone-800/80 text-stone-300 hover:text-white hover:bg-stone-700'
                }`}
              >
                {qd.label}
              </button>
            ))}
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

      {/* Search Bar */}
      <div className="bg-white/45 backdrop-blur-xl backdrop-saturate-150 rounded-xl p-4 shadow-[0_8px_32px_0_rgba(120,90,50,0.12)] border border-white/60 ring-1 ring-inset ring-white/40 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 font-cinzel text-xs font-bold text-stone-700">
          <Sparkles className="w-4 h-4 text-amber-700" />
          <span>5 Daily Stories for {dateFormatted}</span>
        </div>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search stories, Pope, dicasteries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-8 pr-3 py-2 rounded-lg bg-stone-100 border border-stone-300 focus:outline-none focus:border-amber-700"
          />
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-3" />
        </div>
      </div>

      {/* SECTION 1: TODAY'S FIVE VATICAN STORIES */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-stone-200/80 pb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-pulse" />
            <h3 className="font-cinzel text-sm sm:text-base font-bold text-stone-900 uppercase tracking-wide">
              Today's 5 Vatican Dispatches ({dateFormatted})
            </h3>
          </div>
          <span className="text-xs font-serif italic text-amber-950">
            Updated Daily at the Vatican
          </span>
        </div>

        {filteredFiveStories.map((item, index) => (
          <article
            key={item.id}
            onClick={() => setActiveArticle(item)}
            className="bg-white/55 backdrop-blur-xl backdrop-saturate-150 p-5 sm:p-6 rounded-2xl border border-white/70 ring-1 ring-inset ring-white/40 shadow-[0_8px_32px_0_rgba(120,90,50,0.12)] hover:bg-white/75 transition-all cursor-pointer space-y-3 group flex flex-col gap-3 relative"
          >
            {/* Numbered Dispatch Badge */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-md bg-[#6B4423] text-white font-bold font-cinzel text-[11px] shadow-2xs">
                {FIVE_STORY_BADGES[index] || `Dispatch ${index + 1} of 5`}
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

            <div>
              <h4 className="font-cinzel text-lg sm:text-xl font-bold text-stone-900 group-hover:text-amber-900 transition-colors">
                {item.title}
              </h4>
              <p className="text-xs text-amber-900 font-serif-sacred italic mt-0.5">
                {item.subtitle}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-stone-700 font-serif-sacred leading-relaxed pl-3 border-l-2 border-amber-800/60 line-clamp-3">
              {item.summary}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-stone-200/60 text-xs text-stone-500">
              <span className="font-medium text-stone-600">Source: {item.source}</span>
              <span className="font-semibold text-amber-800 group-hover:underline flex items-center gap-1">
                <span>Read Full Dispatch</span>
                <BookOpen className="w-3.5 h-3.5" />
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* SECTION 2: VATICAN ARCHIVE & GLOBAL CHURCH REPORTS */}
      {archiveStories.length > 0 && (
        <div className="space-y-4 pt-6">
          <div className="flex items-center justify-between border-b border-stone-200/80 pb-2">
            <h3 className="font-cinzel text-sm sm:text-base font-bold text-stone-800 uppercase tracking-wide">
              Holy See Archive & Global Church Reports
            </h3>
            <span className="text-xs text-stone-500 font-serif">
              {archiveStories.length} archived articles
            </span>
          </div>

          <div className="space-y-3">
            {archiveStories.map(item => (
              <article
                key={item.id}
                onClick={() => setActiveArticle(item)}
                className="bg-white/40 backdrop-blur-md p-4 sm:p-5 rounded-xl border border-white/60 hover:bg-white/65 transition-all cursor-pointer space-y-2 group"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="px-2 py-0.5 rounded-full bg-stone-200 text-stone-800 font-semibold font-cinzel text-[10px]">
                    {item.category}
                  </span>
                  <span className="text-stone-500 text-xs">{item.date} • {item.readTime}</span>
                </div>

                <h4 className="font-cinzel text-base sm:text-lg font-bold text-stone-800 group-hover:text-amber-900 transition-colors">
                  {item.title}
                </h4>

                <p className="text-xs sm:text-sm text-stone-600 font-serif-sacred line-clamp-2">
                  {item.summary}
                </p>

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
        </div>
      )}

      {/* Full Article Reader Modal with Audio Narration and Copy */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-2xl w-full space-y-5 shadow-2xl border border-stone-300 max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-3">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold font-cinzel text-xs">
                  {activeArticle.category}
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900 mt-2">
                  {activeArticle.title}
                </h3>
                <p className="text-xs text-amber-950 font-serif italic mt-0.5">
                  {activeArticle.subtitle}
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

            {/* Summary Box */}
            <div className="p-4 rounded-xl bg-[#FAF8F5] border-l-4 border-amber-800 text-stone-800 font-serif-sacred text-base italic leading-relaxed">
              {activeArticle.summary}
            </div>

            {/* Full Body Text */}
            <div className="font-serif-sacred text-stone-900 text-base sm:text-lg leading-relaxed whitespace-pre-line space-y-4">
              {activeArticle.content}
            </div>

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

    </div>
  );
};
