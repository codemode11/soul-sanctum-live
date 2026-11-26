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
import catholicGlossaryBookshelfImg from '../assets/images/catholic_glossary_single_angle_filled_1795611036551.jpg';

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
  }).sort((a, b) => a.term.localeCompare(b.term));

  const termOfTheDay = getTermOfTheDay();
  const isTermOfTheDay = selectedTerm.id === termOfTheDay.id;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      
      {/* Standardized Catholic Glossary Top Banner */}
      <div className="sanctum-top-banner relative overflow-hidden px-5 pt-4 pb-4 sm:px-6 min-h-[196px] sm:h-[212px] bg-[#1C120C] rounded-xl text-amber-50 shadow-md border border-[#8B5A2B]/40 flex flex-col justify-between">
        {/* Right-Side Single-Angle Walnut Library Bookcase with Modern Catholic Dictionaries & Encyclopedias (40% width) */}
        <div
          className="pointer-events-none select-none absolute inset-y-0 right-0 w-[40%] overflow-hidden"
          aria-hidden="true"
        >
          <img
            src={catholicGlossaryBookshelfImg}
            alt="Single continuous dark walnut library bookcase wall in straight three-quarter perspective holding modern Catholic dictionaries, theological lexicons, and encyclopedias"
            decoding="async"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center brightness-[1.03] contrast-[1.04]"
            style={{
              maskImage:
                'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.58) 14%, black 32%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.58) 14%, black 32%)',
            }}
          />
        </div>

        {/* Subtle Top/Bottom Dark Espresso Feathering so Text & Controls Stay Crisp */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1C120C]/55 via-transparent to-[#1C120C]/15"
          aria-hidden="true"
        />

        <div className="relative z-10 space-y-1 my-auto max-w-[60%] pr-3 sm:pr-4">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10.5px] sm:text-xs font-serif">
            <span className="font-cinzel text-[10.5px] sm:text-[11px] font-bold uppercase tracking-widest text-amber-300 inline-flex items-center gap-1.5 drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">
              <BookMarked className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              Sacred Lexicon &amp; Theological Dictionary
            </span>
          </div>

          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wide leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            Catholic Glossary
          </h2>

          <p className="text-[11px] sm:text-xs text-stone-200 font-serif font-medium max-w-xl leading-snug drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">
            Master the authentic vocabulary of sacred liturgy, dogmatic theology, canon law, and Church history, featuring a daily Catholic Term of the Day.
          </p>
        </div>

        {/* Bottom Controls Row (left-aligned to keep the right-side shelves unobstructed) */}
        <div className="relative z-10 flex flex-wrap items-center justify-start gap-2.5 mt-auto pt-1.5 max-w-[60%] pr-3 sm:pr-4">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-cinzel font-semibold text-amber-200 drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>
              {isTermOfTheDay ? 'Term of the Day:' : 'Selected Term:'}{' '}
              <strong className="text-white">{selectedTerm.term}</strong>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handlePronounce(selectedTerm)}
              className="h-8 inline-flex items-center gap-1.5 px-3 rounded-md bg-[#1C120C]/90 hover:bg-[#2A1B12] text-[#D4A373] hover:text-[#F7EBE1] text-xs font-cinzel font-semibold border border-[#8B5A2B]/55 hover:border-[#D4A373]/70 transition-colors cursor-pointer backdrop-blur-xs whitespace-nowrap"
              title="Hear pronunciation"
            >
              <Volume2 className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>Pronounce</span>
            </button>
            <button
              type="button"
              onClick={() => handleCopy(selectedTerm)}
              className="h-8 inline-flex items-center gap-1.5 px-3 rounded-md bg-[#1C120C]/90 hover:bg-[#2A1B12] text-[#D4A373] hover:text-[#F7EBE1] text-xs font-cinzel font-semibold border border-[#8B5A2B]/55 hover:border-[#D4A373]/70 transition-colors cursor-pointer backdrop-blur-xs whitespace-nowrap"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> : <Copy className="w-3.5 h-3.5 text-amber-300 shrink-0" />}
              <span>{copied ? 'Copied' : 'Copy Definition'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Featured / Selected Term & Detailed Theological Exposition */}
      <article className="bg-white rounded-xl p-6 sm:p-8 shadow-xs border border-stone-200 space-y-6">
        <div className="space-y-4 border-b border-stone-200 pb-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-amber-900 inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              {isTermOfTheDay ? 'Catholic Term of the Day' : 'Selected Glossary Entry'}
            </span>
            <span className="px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-900 text-xs font-medium border border-amber-200">
              {selectedTerm.category}
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-3 flex-wrap">
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-stone-900 tracking-wide">
                {selectedTerm.term}
              </h3>
              <button
                type="button"
                onClick={() => handlePronounce(selectedTerm)}
                className="p-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 transition-colors cursor-pointer"
                title="Hear pronunciation"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-stone-600 font-serif-sacred italic">
              {selectedTerm.phonetic} • {selectedTerm.languageOrigin}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#FAF8F5] border border-amber-900/15 text-stone-800 text-xs sm:text-sm font-serif-sacred">
            <span className="font-bold font-cinzel mr-1 text-amber-950">Literal Root:</span>
            <span>&ldquo;{selectedTerm.literalMeaning}&rdquo;</span>
          </div>

          <p className="font-serif-sacred text-stone-900 text-base sm:text-lg leading-relaxed font-medium">
            {selectedTerm.shortDefinition}
          </p>

          {selectedTerm.catechismRef && (
            <div className="text-xs text-amber-900 font-cinzel font-semibold">
              Cross-Reference: {selectedTerm.catechismRef}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 font-cinzel">
              Theological Depth and Ecclesial Context
            </span>
            <h4 className="font-cinzel text-lg font-bold text-stone-900 mt-0.5">
              Understanding {selectedTerm.term}
            </h4>
          </div>

          <div className="font-serif-sacred text-stone-800 text-base sm:text-lg leading-relaxed whitespace-pre-line">
            {selectedTerm.detailedExplanation}
          </div>
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
              Catholic Glossary and Lexicon{' '}
              <span className="text-xs font-semibold text-amber-800">({filteredTerms.length} terms)</span>
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
