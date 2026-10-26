import React, { useState } from 'react';
import { 
  Quote, 
  Search, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Sparkles, 
  Share2, 
  Filter, 
  Bookmark 
} from 'lucide-react';
import { CatholicWisdom, WisdomCategory } from '../types';
import { CATHOLIC_WISDOM_DATABASE, WISDOM_CATEGORIES } from '../data/wisdom';
import { SacredReader } from '../utils/speech';

export const WisdomTreasuryView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<WisdomCategory | 'All'>('All');
  const [selectedTheme, setSelectedTheme] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [spotlightQuote, setSpotlightQuote] = useState<CatholicWisdom>(CATHOLIC_WISDOM_DATABASE[0]);

  const themes = ['All', 'Eucharist', 'Prayer and Silence', 'The Cross and Suffering', 'Mary Mother of God', 'Love and Charity', 'Faith and Hope', 'Humility'];

  const handleCopy = (wisdom: CatholicWisdom) => {
    const text = `"${wisdom.quote}"
— ${wisdom.author} (${wisdom.authorTitle})
${wisdom.sourceWork ? `Source: ${wisdom.sourceWork}` : ''}`;

    navigator.clipboard.writeText(text);
    setCopiedId(wisdom.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleToggleSpeak = (wisdom: CatholicWisdom) => {
    if (speakingId === wisdom.id) {
      SacredReader.stop();
      setSpeakingId(null);
    } else {
      const speech = `${wisdom.author}, ${wisdom.authorTitle}. "${wisdom.quote}". Reflection: ${wisdom.reflection || ''}`;
      SacredReader.speak(speech, () => setSpeakingId(null));
      setSpeakingId(wisdom.id);
    }
  };

  const filteredQuotes = CATHOLIC_WISDOM_DATABASE.filter(w => {
    const matchesCat = selectedCategory === 'All' || w.category === selectedCategory;
    const matchesTheme = selectedTheme === 'All' || w.theme === selectedTheme;
    const matchesSearch = 
      w.quote.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.authorTitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesTheme && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      
      {/* Featured Spotlight Quote Card */}
      <div className="bg-gradient-to-br from-stone-900 via-amber-950 to-stone-900 rounded-xl p-6 sm:p-8 text-amber-50 shadow-md border border-amber-900/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="space-y-4 relative z-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-900/50 pb-4">
            <div className="flex items-center">
              <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide text-amber-100 drop-shadow-md">
                Wisdom of the Saints
              </h2>
            </div>
            <span className="self-start sm:self-auto px-3.5 py-1 rounded-full bg-amber-900/80 text-amber-200 text-xs sm:text-sm font-semibold border border-amber-700/60 uppercase tracking-wider font-cinzel">
              {spotlightQuote.category}
            </span>
          </div>

          <blockquote className="font-serif-sacred text-2xl sm:text-4xl text-white not-italic leading-relaxed">
            "{spotlightQuote.quote}"
          </blockquote>

          {spotlightQuote.reflection && (
            <p className="text-base sm:text-lg text-amber-100/90 font-serif-sacred italic border-l-2 border-amber-500/40 pl-3.5 leading-relaxed">
              {spotlightQuote.reflection}
            </p>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-stone-700/60">
            <div>
              <p className="font-serif font-bold text-amber-200 text-lg sm:text-xl">
                {spotlightQuote.author}
              </p>
              <p className="text-xs text-stone-400 font-serif">
                {spotlightQuote.authorTitle} • {spotlightQuote.authorLifespan}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleToggleSpeak(spotlightQuote)}
                className={`p-2 rounded-md border transition-colors cursor-pointer ${
                  speakingId === spotlightQuote.id ? 'bg-[#6B4423] text-white border-[#8B5A2B]' : 'bg-stone-800 text-amber-200 border-stone-700'
                }`}
                title="Listen to quote"
              >
                {speakingId === spotlightQuote.id ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <button
                onClick={() => handleCopy(spotlightQuote)}
                className="p-2 rounded-md bg-stone-800 text-amber-200 border border-stone-700 hover:bg-stone-700 transition-colors cursor-pointer"
                title="Copy quote"
              >
                {copiedId === spotlightQuote.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Category Controls */}
      <div className="bg-white rounded-xl p-4 sm:p-5 shadow-xs border border-stone-200 space-y-4">
        
        {/* Tradition Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {WISDOM_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-900 text-amber-50 shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {cat.label} ({cat.count})
            </button>
          ))}
        </div>

        {/* Search and Themes Bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between border-t border-stone-100 pt-3">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
            <span className="text-[11px] font-bold text-stone-500 uppercase font-cinzel mr-1">Theme:</span>
            {themes.map(t => (
              <button
                key={t}
                onClick={() => setSelectedTheme(t)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap cursor-pointer ${
                  selectedTheme === t
                    ? 'bg-amber-100 text-amber-900 font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search quotes or authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg bg-stone-100 border border-stone-300 focus:outline-none focus:border-amber-700"
            />
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

      </div>

      {/* Quotes Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredQuotes.map(wisdom => {
          const isCopied = copiedId === wisdom.id;
          const isSpeaking = speakingId === wisdom.id;

          return (
            <div
              key={wisdom.id}
              onClick={() => setSpotlightQuote(wisdom)}
              className="bg-white p-6 rounded-xl border border-stone-200 shadow-2xs hover:shadow-md transition-all space-y-4 flex flex-col justify-between cursor-pointer group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 font-cinzel bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                    {wisdom.category} • {wisdom.theme}
                  </span>
                  {wisdom.sourceWork && (
                    <span className="text-[11px] text-stone-400 font-serif-sacred line-clamp-1 italic max-w-[180px]">
                      {wisdom.sourceWork}
                    </span>
                  )}
                </div>

                <blockquote className="font-serif-sacred text-stone-900 text-lg sm:text-xl md:text-2xl not-italic leading-relaxed group-hover:text-amber-950 transition-colors">
                  "{wisdom.quote}"
                </blockquote>

                {wisdom.reflection && (
                  <p className="text-sm sm:text-base text-stone-700 font-serif-sacred italic border-l-2 border-stone-200 pl-3 leading-relaxed">
                    {wisdom.reflection}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-stone-900">
                    {wisdom.author}
                  </h4>
                  <p className="text-xs text-stone-500 font-serif">
                    {wisdom.authorTitle}
                  </p>
                </div>

                <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => handleToggleSpeak(wisdom)}
                    className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                      isSpeaking ? 'bg-[#6B4423] text-white border-[#5A381C]' : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100 border-stone-200'
                    }`}
                    title="Read aloud"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleCopy(wisdom)}
                    className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-100 border border-stone-200 transition-colors cursor-pointer"
                    title="Copy quote"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
