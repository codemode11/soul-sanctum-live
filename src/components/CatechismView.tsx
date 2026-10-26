import React, { useState, useEffect } from 'react';
import { CatechismReading } from '../types';
import { DAILY_CATECHISM_READINGS, CCC_CATEGORIES } from '../data/catechism';
import { SacredReader } from '../utils/speech';
import { EucharisticCatechismView } from './EucharisticCatechismView';
import { MarianCatechismView } from './MarianCatechismView';
import { TrinityCatechismView } from './TrinityCatechismView';
import { SacramentsCatechismView } from './SacramentsCatechismView';
import { RessourcementView } from './RessourcementView';

type CatechismSubView = 'daily' | 'eucharist' | 'marian' | 'trinity' | 'sacraments' | 'ressourcement';

export const CatechismView: React.FC = () => {
  const [activeSubView, setActiveSubView] = useState<CatechismSubView>('daily');
  const [selectedReadingIndex, setSelectedReadingIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [copied, setCopied] = useState(false);
  const [personalReflection, setPersonalReflection] = useState('');
  const [savedNote, setSavedNote] = useState(false);

  const reading = DAILY_CATECHISM_READINGS[selectedReadingIndex] || DAILY_CATECHISM_READINGS[0];

  useEffect(() => {
    const unsub = SacredReader.addListener((speaking) => {
      setIsReadingAloud(speaking);
    });
    return () => {
      unsub();
      SacredReader.stop();
    };
  }, []);

  const handleToggleReadAloud = () => {
    if (isReadingAloud) {
      SacredReader.stop();
    } else {
      const fullText = `Catechism of the Catholic Church. ${reading.title}. Paragraphs ${reading.paragraphs}.
${reading.text.join(' ')}
In Brief. ${reading.inBrief.join(' ')}`;
      SacredReader.speak(fullText);
    }
  };

  const handleCopy = () => {
    const copyText = `CATECHISM OF THE CATHOLIC CHURCH
${reading.paragraphs}: ${reading.title}
${reading.part} > ${reading.chapter}

${reading.text.join('\n\n')}

IN BRIEF:
${reading.inBrief.map(b => `• ${b}`).join('\n')}

MEDITATION:
${reading.meditationQuestion}`;

    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveReflection = () => {
    setSavedNote(true);
    setTimeout(() => setSavedNote(false), 2500);
  };

  const filteredReadings = DAILY_CATECHISM_READINGS.filter(r => 
    r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.paragraphs.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.part.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.text.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Sub-view Navigation Bar: Daily CCC Plan first, no icons */}
      <div className="bg-[#FAF7F2] p-2 rounded-xl border border-stone-200/90 shadow-2xs overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 min-w-max">
          {/* 1. Daily CCC Plan */}
          <button
            onClick={() => setActiveSubView('daily')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeSubView === 'daily'
                ? 'bg-amber-900 text-amber-50 shadow-xs'
                : 'text-stone-700 hover:text-amber-950 hover:bg-stone-200/60'
            }`}
          >
            <span>Daily CCC Plan</span>
          </button>

          {/* 2. Holy Trinity */}
          <button
            onClick={() => setActiveSubView('trinity')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeSubView === 'trinity'
                ? 'bg-amber-900 text-amber-50 shadow-xs'
                : 'text-stone-700 hover:text-amber-950 hover:bg-stone-200/60'
            }`}
          >
            <span>Holy Trinity</span>
          </button>

          {/* 3. Holy Eucharist */}
          <button
            onClick={() => setActiveSubView('eucharist')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeSubView === 'eucharist'
                ? 'bg-amber-900 text-amber-50 shadow-xs'
                : 'text-stone-700 hover:text-amber-950 hover:bg-stone-200/60'
            }`}
          >
            <span>Holy Eucharist</span>
          </button>

          {/* 4. Seven Sacraments */}
          <button
            onClick={() => setActiveSubView('sacraments')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeSubView === 'sacraments'
                ? 'bg-amber-900 text-amber-50 shadow-xs'
                : 'text-stone-700 hover:text-amber-950 hover:bg-stone-200/60'
            }`}
          >
            <span>Seven Sacraments</span>
          </button>

          {/* 5. Mary and Her Apparitions */}
          <button
            onClick={() => setActiveSubView('marian')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeSubView === 'marian'
                ? 'bg-amber-900 text-amber-50 shadow-xs'
                : 'text-stone-700 hover:text-amber-950 hover:bg-stone-200/60'
            }`}
          >
            <span>Mary and Her Apparitions</span>
          </button>

          {/* 6. Ressourcement */}
          <button
            onClick={() => setActiveSubView('ressourcement')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeSubView === 'ressourcement'
                ? 'bg-amber-900 text-amber-50 shadow-xs'
                : 'text-stone-700 hover:text-amber-950 hover:bg-stone-200/60'
            }`}
          >
            <span>Ressourcement</span>
          </button>
        </div>
      </div>

      {/* Render Selected View */}
      {activeSubView === 'eucharist' && <EucharisticCatechismView />}
      {activeSubView === 'marian' && <MarianCatechismView />}
      {activeSubView === 'trinity' && <TrinityCatechismView />}
      {activeSubView === 'sacraments' && <SacramentsCatechismView />}
      {activeSubView === 'ressourcement' && <RessourcementView />}

      {activeSubView === 'daily' && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-900 rounded-xl p-6 text-amber-50 shadow-md border border-amber-900/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-sm font-semibold tracking-wide text-amber-300 italic">
                    Catechismus Catholicae Ecclesiae
                  </span>
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-normal">
                  Daily Catechism Reading
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 font-serif-sacred max-w-xl">
                  Nourish your soul with the authentic deposit of Faith, dogmatic truth, moral teaching, and the treasures of Catholic prayer.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleToggleReadAloud}
                  className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    isReadingAloud
                      ? 'bg-amber-600 text-white animate-pulse'
                      : 'bg-amber-800/60 hover:bg-amber-700/80 text-amber-100 border border-amber-700/50'
                  }`}
                  title="Listen to Catechism"
                  aria-label="Listen to Catechism"
                >
                  {isReadingAloud ? 'Stop Audio' : 'Listen Aloud'}
                </button>

                <button
                  onClick={handleCopy}
                  className="px-3.5 py-2 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-amber-200 border border-amber-900/50 text-xs font-semibold transition-colors cursor-pointer"
                  title="Copy Catechism text"
                >
                  {copied ? 'Copied' : 'Copy Text'}
                </button>
              </div>
            </div>
          </div>

      {/* Reading Selector and Quick Browser */}
      <div className="bg-white rounded-xl p-4 shadow-xs border border-stone-200 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 font-cinzel">
            Daily Reading Plan and Topics
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Search paragraphs or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs px-3 py-1.5 rounded-lg bg-stone-100 border border-stone-300 focus:outline-none focus:border-amber-700 w-full sm:w-64"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {filteredReadings.map((r, idx) => {
            const isSelected = DAILY_CATECHISM_READINGS.indexOf(r) === selectedReadingIndex;
            return (
              <button
                key={r.id}
                onClick={() => setSelectedReadingIndex(DAILY_CATECHISM_READINGS.indexOf(r))}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-amber-900 text-amber-50 shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                <span className="font-bold mr-1">{r.paragraphs}:</span> {r.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main CCC Reading Display */}
      <article className="bg-white rounded-xl p-6 sm:p-8 shadow-xs border border-stone-200 space-y-6">
        
        {/* Breadcrumb Hierarchy */}
        <div className="space-y-1 border-b border-stone-200 pb-4">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-amber-900/80 font-medium font-cinzel">
            <span>{reading.part}</span>
            <span className="text-stone-400">•</span>
            <span>{reading.section}</span>
            <span className="text-stone-400">•</span>
            <span>{reading.chapter}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {reading.title}
            </h3>
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold font-serif border border-amber-300 shrink-0 self-start sm:self-auto">
              {reading.paragraphs}
            </span>
          </div>
        </div>

        {/* Text Paragraphs */}
        <div className="space-y-6 font-serif text-stone-900 text-lg sm:text-xl md:text-2xl leading-relaxed">
          {reading.text.map((para, i) => (
            <div key={i} className="pl-4 border-l-2 border-amber-700/40 hover:border-amber-700 transition-colors">
              <p>{para}</p>
            </div>
          ))}
        </div>

        {/* Scriptural Cross References */}
        {reading.crossReferences && (
          <div className="pt-2 text-xs text-stone-600 flex items-center gap-2 font-serif">
            <span className="font-semibold text-stone-800">Scripture References:</span>
            <span>{reading.crossReferences.join(' • ')}</span>
          </div>
        )}

        {/* "IN BRIEF" SUMMARY BOX */}
        <div className="rounded-xl p-5 bg-amber-50/80 border border-amber-200 space-y-3">
          <div className="flex items-center gap-2 text-amber-950 font-serif font-bold text-base sm:text-lg">
            <span>In Brief — Church Teaching Summary</span>
          </div>
          <ul className="space-y-2.5 text-base sm:text-lg text-stone-800 font-serif leading-relaxed">
            {reading.inBrief.map((brief, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-800 font-bold">•</span>
                <span>{brief}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* DAILY MEDITATION QUESTION and PERSONAL REFLECTION */}
        <div className="rounded-xl p-5 bg-stone-50 border border-stone-200 space-y-4">
          <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-base sm:text-lg">
            <span>Personal Meditation and Spiritual Application</span>
          </div>
          
          <p className="text-stone-900 font-serif-sacred text-lg sm:text-xl italic pl-2 border-l-2 border-amber-800 leading-relaxed">
            "{reading.meditationQuestion}"
          </p>

          <div className="space-y-2 pt-2">
            <textarea
              value={personalReflection}
              onChange={(e) => setPersonalReflection(e.target.value)}
              placeholder="Record your prayer response or reflection on today's Catechism teaching..."
              className="w-full h-24 p-3 rounded-lg bg-white border border-stone-300 text-xs sm:text-sm font-serif-sacred focus:outline-none focus:border-amber-800 resize-none"
            />
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-stone-500">
                Your private spiritual notes remain stored in your local session.
              </span>
              <button
                onClick={handleSaveReflection}
                className="px-3.5 py-1.5 rounded-lg bg-amber-900 hover:bg-amber-800 text-amber-100 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>{savedNote ? 'Saved to Soul' : 'Save Reflection'}</span>
              </button>
            </div>
          </div>
        </div>

      </article>
    </div>
  )}

</div>
);
};

