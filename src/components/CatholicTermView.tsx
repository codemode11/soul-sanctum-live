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
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 rounded-xl p-6 sm:p-8 text-amber-50 shadow-md border border-amber-900/40 relative overflow-hidden">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Catholic Term of the Day
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-800/80 text-amber-200 text-xs font-medium border border-amber-700/50">
              {selectedTerm.category}
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h2 className="font-cinzel text-2xl sm:text-4xl font-bold text-white tracking-wide">
                {selectedTerm.term}
              </h2>
              <button
                onClick={() => handlePronounce(selectedTerm)}
                className="p-2 rounded-full bg-stone-800 hover:bg-amber-800 text-amber-300 transition-colors cursor-pointer"
                title="Hear pronunciation"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-stone-300 font-serif-sacred italic">
              {selectedTerm.phonetic} • {selectedTerm.languageOrigin}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 text-amber-200 text-xs font-serif-sacred">
            <span className="font-bold font-cinzel mr-1 text-amber-300">Literal Root:</span>
            <span>"{selectedTerm.literalMeaning}"</span>
          </div>

          <p className="font-serif-sacred text-stone-100 text-base sm:text-lg leading-relaxed">
            {selectedTerm.shortDefinition}
          </p>

          <div className="flex items-center justify-between pt-2 border-t border-stone-800">
            {selectedTerm.catechismRef && (
              <span className="text-xs text-amber-300 font-cinzel font-semibold">
                Cross-Reference: {selectedTerm.catechismRef}
              </span>
            )}
            <button
              onClick={() => handleCopy(selectedTerm)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-200 text-xs font-medium transition-colors cursor-pointer"
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
                className={`p-4 rounded-xl text-left border transition-all cursor-pointer ${
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
