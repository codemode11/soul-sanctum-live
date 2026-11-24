import React, { useState } from 'react';
import { 
  BookMarked, 
  Search, 
  Volume2, 
  Sparkles, 
  Bookmark, 
  ExternalLink, 
  Share2, 
  Copy, 
  Check, 
  Languages 
} from 'lucide-react';
import { CatholicTerm } from '../types';
import { CATHOLIC_TERMS_DATABASE, getTermOfTheDay } from '../data/terms';
import { SacredReader } from '../utils/speech';
import catholicGlossaryBookshelfImg from '../assets/images/catholic_glossary_bookshelf_1795505259667.jpg';

export const CatholicTermView: React.FC = () => {
  const [selectedTerm, setSelectedTerm] = useState<CatholicTerm>(getTermOfTheDay);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copied, setCopied] = useState(false);

  const categories = ['All', 'Sacraments', 'Theology and Dogma', 'Liturgy and Worship', 'Spiritual Life', 'Church Hierarchy and Canon Law'];

  const handlePronounce = (term: CatholicTerm) => {
    SacredReader.speak(term.term);
  };

  const handleCopy = (term: CatholicTerm) => {
    const text = `CATHOLIC TERM: ${term.term} (${term.phonetic})
Origin: ${term.languageOrigin}
Meaning: ${term.literalMeaning}

DEFINITION:
${term.shortDefinition}

THEOLOGICAL EXPLANATION:
${term.detailedExplanation}

Catechism: ${term.catechismRef || 'N/A'}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredTerms = CATHOLIC_TERMS_DATABASE.filter(t => {
    const matchesCat = selectedCategory === 'All' || t.category === selectedCategory;
    const matchesSearch = 
      t.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.shortDefinition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.languageOrigin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.detailedExplanation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Featured: Catholic Term of the Day */}
      <div className="sanctum-top-banner px-5 pt-4 pb-4 sm:px-6 min-h-[196px] bg-[#1C120C] rounded-xl text-amber-50 shadow-md border border-[#8B5A2B]/40 relative overflow-hidden">
        {/* Right-Side Shelf of Catholic Dictionaries and Encyclopedia with Seamless Brown Gradient Blend */}
        <div
          className="pointer-events-none select-none absolute inset-y-0 right-0 w-full sm:w-[70%] md:w-[66%] overflow-hidden"
          aria-hidden="true"
        >
          <img
            src={catholicGlossaryBookshelfImg}
            alt="Shelf of Catholic dictionaries and encyclopedias"
            decoding="async"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-[74%_44%] brightness-[0.98] contrast-[1.04]"
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#1C120C]/60 to-transparent" />
        </div>

        {/* Smooth Multi-Stop Horizontal Gradient from Brown Background (#1C120C) into the Bookshelf */}
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#1C120C_0%,#1C120C_28%,rgba(28,18,12,0.92)_46%,rgba(28,18,12,0.58)_64%,rgba(28,18,12,0.22)_84%,rgba(28,18,12,0.24)_100%)] sm:bg-[linear-gradient(90deg,#1C120C_0%,#1C120C_38%,rgba(28,18,12,0.92)_52%,rgba(28,18,12,0.52)_68%,rgba(28,18,12,0.14)_86%,rgba(28,18,12,0.20)_100%)]"
          aria-hidden="true"
        />
        {/* Subtle Top/Bottom Dark Brown Feathering so Text & Controls Stay Crisp */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1C120C]/70 via-transparent to-[#1C120C]/30"
          aria-hidden="true"
        />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between gap-2">
            <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-amber-300 flex items-center gap-1.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Catholic Term of the Day
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#1C120C]/85 text-amber-200 text-xs font-medium border border-[#8B5A2B]/55 backdrop-blur-xs">
              {selectedTerm.category}
            </span>
          </div>

          <div className="space-y-1 max-w-full sm:max-w-[66%]">
            <div className="flex items-center gap-3">
              <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-white tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                {selectedTerm.term}
              </h2>
              <button
                onClick={() => handlePronounce(selectedTerm)}
                className="p-2 rounded-lg bg-[#2A1B12]/90 hover:bg-amber-800 text-amber-300 border border-[#8B5A2B]/40 transition-colors cursor-pointer"
                title="Hear pronunciation"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-stone-200 font-serif-sacred italic drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">
              {selectedTerm.phonetic} • {selectedTerm.languageOrigin}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#1C120C]/82 border border-[#8B5A2B]/35 text-amber-200 text-xs font-serif-sacred backdrop-blur-xs max-w-full sm:max-w-[66%]">
            <span className="font-bold font-cinzel mr-1 text-amber-300">Literal Root:</span>
            <span>"{selectedTerm.literalMeaning}"</span>
          </div>

          <p className="font-serif-sacred text-stone-100 text-base sm:text-lg leading-relaxed max-w-full sm:max-w-[66%] drop-shadow-[0_1px_4px_rgba(0,0,0,0.88)]">
            {selectedTerm.shortDefinition}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-[#8B5A2B]/35">
            {selectedTerm.catechismRef && (
              <span className="text-xs text-amber-300 font-cinzel font-semibold drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">
                Cross-Reference: {selectedTerm.catechismRef}
              </span>
            )}
            <button
              onClick={() => handleCopy(selectedTerm)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1C120C]/90 hover:bg-[#2A1B12] text-amber-200 text-xs font-medium border border-[#8B5A2B]/50 transition-colors cursor-pointer backdrop-blur-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Definition'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Detailed Theological Exposition of Selected Term */}
      <article className="bg-white rounded-xl p-6 sm:p-8 shadow-xs border border-stone-200 space-y-6">
        <div className="border-b border-stone-200 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-900 font-cinzel">
            Theological Depth and Ecclesial Context
          </span>
          <h3 className="font-cinzel text-xl font-bold text-stone-900 mt-0.5">
            Understanding {selectedTerm.term}
          </h3>
        </div>

        <div className="font-serif-sacred text-stone-800 text-base sm:text-lg leading-relaxed whitespace-pre-line">
          {selectedTerm.detailedExplanation}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          {selectedTerm.scripturalBasis && (
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-amber-900/15 space-y-1">
              <span className="text-xs font-bold font-cinzel text-amber-950 uppercase">
                Scriptural Foundation
              </span>
              <p className="text-xs sm:text-sm text-stone-700 font-serif-sacred">
                {selectedTerm.scripturalBasis}
              </p>
            </div>
          )}

          {selectedTerm.liturgicalContext && (
            <div className="p-4 rounded-xl bg-[#FAF8F5] border border-amber-900/15 space-y-1">
              <span className="text-xs font-bold font-cinzel text-amber-950 uppercase">
                Liturgical Occurrence
              </span>
              <p className="text-xs sm:text-sm text-stone-700 font-serif-sacred">
                {selectedTerm.liturgicalContext}
              </p>
            </div>
          )}
        </div>
      </article>

      {/* Searchable Catholic Glossary / Lexicon */}
      <div className="bg-white rounded-xl p-6 shadow-xs border border-stone-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-cinzel text-lg font-bold text-stone-900">
              Catholic Glossary and Lexicon
            </h3>
            <p className="text-xs text-stone-500 font-serif-sacred">
              Master the vocabulary of sacred liturgy, dogmatic theology, and Church history.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search terms or roots..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-2 rounded-lg bg-stone-100 border border-stone-300 focus:outline-none focus:border-amber-700"
            />
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-3" />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === c
                  ? 'bg-amber-900 text-amber-50 shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Terms list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          {filteredTerms.map(term => {
            const isSelected = term.id === selectedTerm.id;
            return (
              <button
                key={term.id}
                onClick={() => {
                  setSelectedTerm(term);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`p-4 rounded-lg text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-amber-50/80 border-amber-600 ring-1 ring-amber-600 shadow-xs'
                    : 'bg-stone-50 hover:bg-stone-100 border-stone-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-cinzel text-sm font-bold text-stone-900">
                    {term.term}
                  </h4>
                  <span className="text-[10px] text-amber-800 font-cinzel font-semibold">
                    {term.category}
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 font-serif-sacred italic mt-0.5">
                  {term.languageOrigin}
                </p>
                <p className="text-xs text-stone-700 font-serif-sacred line-clamp-2 mt-1">
                  {term.shortDefinition}
                </p>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
