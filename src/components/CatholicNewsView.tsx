import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Search, 
  ExternalLink, 
  Clock, 
  Tag, 
  Bookmark, 
  Share2, 
  X, 
  BookOpen 
} from 'lucide-react';
import { CatholicNewsItem } from '../types';
import { getDailyVaticanNews } from '../data/news';

interface CatholicNewsViewProps {
  currentDateStr?: string;
  initialArticleId?: string | null;
  onClearInitialArticle?: () => void;
}

export const CatholicNewsView: React.FC<CatholicNewsViewProps> = ({
  currentDateStr = '2026-10-21',
  initialArticleId,
  onClearInitialArticle
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const dailyNewsList = getDailyVaticanNews(currentDateStr);
  const [activeArticle, setActiveArticle] = useState<CatholicNewsItem | null>(() => {
    if (initialArticleId) {
      return dailyNewsList.find(n => n.id === initialArticleId) || dailyNewsList[0];
    }
    return null;
  });

  useEffect(() => {
    if (initialArticleId) {
      const found = dailyNewsList.find(n => n.id === initialArticleId);
      if (found) {
        setActiveArticle(found);
      }
    }
  }, [initialArticleId, dailyNewsList]);

  const categories = ['All', 'Vatican', 'Global Church', 'Saints and Faith', 'Culture and Charity'];

  const filteredNews = dailyNewsList.filter(item => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* News Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 rounded-xl p-6 sm:p-8 text-amber-50 shadow-md border border-amber-900/40">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-amber-400" />
            <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-amber-300">
              Acta Apostolicae Sedis and Ecclesia Universalis
            </span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide">
            Catholic News and Universal Church Dispatches
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 font-serif-sacred max-w-xl">
            Faithful coverage of the Holy See, diocesan initiatives, Eucharistic renewals, canonizations, and works of mercy across the globe.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-2 mt-5">
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
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-stone-200 flex items-center justify-between gap-3">
        <span className="font-cinzel text-xs font-bold text-stone-600 hidden sm:inline">
          Latest Reports ({filteredNews.length})
        </span>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search Catholic news or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-8 pr-3 py-2 rounded-lg bg-stone-100 border border-stone-300 focus:outline-none focus:border-amber-700"
          />
          <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-3" />
        </div>
      </div>

      {/* News Articles List */}
      <div className="space-y-4">
        {filteredNews.map(item => (
          <article
            key={item.id}
            onClick={() => setActiveArticle(item)}
            className="bg-white p-5 sm:p-6 rounded-2xl border border-stone-200 shadow-2xs hover:shadow-md transition-all cursor-pointer space-y-3 group flex flex-col sm:flex-row gap-5 items-start"
          >
            {item.imageUrl && (
              <div className="relative aspect-video sm:aspect-square w-full sm:w-44 rounded-xl overflow-hidden shrink-0 shadow-xs border border-stone-200">
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}
            
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold font-cinzel text-[10px]">
                  {item.category}
                </span>
                <div className="flex items-center gap-3 text-stone-500">
                  <span>{item.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.readTime}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-cinzel text-lg sm:text-xl font-bold text-stone-900 group-hover:text-amber-900 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-amber-900 font-serif-sacred italic mt-0.5">
                  {item.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-stone-700 font-serif-sacred leading-relaxed line-clamp-2">
                {item.summary}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-stone-100 text-xs text-stone-500">
                <span className="font-medium text-stone-600">Source: {item.source}</span>
                <span className="font-semibold text-amber-800 group-hover:underline flex items-center gap-1">
                  <span>Read Full Article</span>
                  <BookOpen className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Full Article Modal */}
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
                <p className="text-xs text-stone-500 font-serif-sacred">
                  {activeArticle.date} • By {activeArticle.author} ({activeArticle.source})
                </p>
              </div>

              <button
                onClick={() => setActiveArticle(null)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {activeArticle.imageUrl && (
              <div className="space-y-1.5">
                <div className="aspect-video w-full rounded-xl overflow-hidden shadow-md border border-stone-200">
                  <img 
                    src={activeArticle.imageUrl} 
                    alt={activeArticle.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                {activeArticle.imageCaption && (
                  <p className="text-[11px] text-stone-500 font-serif-sacred italic text-center">
                    {activeArticle.imageCaption}
                  </p>
                )}
              </div>
            )}

            <div className="p-4 rounded-xl bg-[#FAF8F5] border-l-4 border-amber-800 text-stone-800 font-serif-sacred text-base italic">
              {activeArticle.summary}
            </div>

            <div className="font-serif-sacred text-stone-800 text-base sm:text-lg leading-relaxed whitespace-pre-line space-y-4">
              {activeArticle.content}
            </div>

            <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5 flex-wrap">
                {activeArticle.tags.map(t => (
                  <span key={t} className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 text-[11px]">
                    #{t}
                  </span>
                ))}
              </div>
              <button
                onClick={() => {
                  setActiveArticle(null);
                  if (onClearInitialArticle) onClearInitialArticle();
                }}
                className="px-4 py-2 rounded-xl bg-stone-900 text-white text-xs font-semibold cursor-pointer"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
