import React, { useState, useEffect } from 'react';
import { 
  Music, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  BookOpen, 
  Copy, 
  Check, 
  Languages, 
  Layers 
} from 'lucide-react';
import { CatholicHymn } from '../types';
import { CATHOLIC_HYMNS_DATABASE } from '../data/hymns';
import { bellSynth } from '../utils/audioSynth';
import { SacredReader } from '../utils/speech';

export const SacredMusicView: React.FC = () => {
  const [selectedHymn, setSelectedHymn] = useState<CatholicHymn>(CATHOLIC_HYMNS_DATABASE[0]);
  const [isReadingLatin, setIsReadingLatin] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    return () => {
      bellSynth.stopAmbientChant();
      SacredReader.stop();
    };
  }, []);

  const handleSpeakLatin = (hymn: CatholicHymn) => {
    if (isReadingLatin) {
      SacredReader.stop();
      setIsReadingLatin(false);
    } else {
      SacredReader.speak(hymn.latinLyrics, () => setIsReadingLatin(false), 0.85);
      setIsReadingLatin(true);
    }
  };

  const handleCopy = (hymn: CatholicHymn) => {
    const text = `${hymn.title.toUpperCase()} (${hymn.latinTitle})
${hymn.composerOrEra} • Usage: ${hymn.liturgicalSeasonOrUse}

LATIN TEXT:
${hymn.latinLyrics}

ENGLISH TRANSLATION:
${hymn.englishTranslation}

CONTEXT:
${hymn.theologicalContext}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Sacred Music Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 rounded-xl p-6 sm:p-8 text-amber-50 shadow-md border border-amber-900/40 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Music className="w-5 h-5 text-amber-400" />
            <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-amber-300">
              Musica Sacra • Gregorian Chant and Sacred Polyphony
            </span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide">
            Catholic Sacred Music Treasury
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 font-serif-sacred max-w-xl">
            "He who sings prays twice" (St. Augustine). Immerse in the timeless modal chants of the Church, with Latin lyrics, English translations, and sacred spiritual reflection.
          </p>
        </div>
      </div>

      {/* Hymn Selection Bar */}
      <div className="bg-white rounded-xl p-4 shadow-xs border border-stone-200 space-y-2">
        <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-stone-500 block">
          Select Sacred Hymn or Chant:
        </span>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {CATHOLIC_HYMNS_DATABASE.map(hymn => {
            const isSelected = hymn.id === selectedHymn.id;
            return (
              <button
                key={hymn.id}
                onClick={() => setSelectedHymn(hymn)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-amber-900 text-amber-50 shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {hymn.latinTitle}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Selected Hymn Display Card */}
      <article className="bg-white rounded-xl p-6 sm:p-8 shadow-xs border border-stone-200 space-y-6">
        
        {/* Header of Hymn */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-wider font-cinzel">
                {selectedHymn.liturgicalSeasonOrUse}
              </span>
            </div>
            <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-stone-900">
              {selectedHymn.title}
            </h3>
            <p className="text-xs text-amber-900 font-serif-sacred italic">
              {selectedHymn.composerOrEra}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSpeakLatin(selectedHymn)}
              className={`p-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                isReadingLatin
                  ? 'bg-amber-700 text-white'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300'
              }`}
              title="Hear Ecclesiastical Latin recitation"
              aria-label="Hear Ecclesiastical Latin recitation"
            >
              {isReadingLatin ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-800" />}
            </button>

            <button
              onClick={() => handleCopy(selectedHymn)}
              className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 transition-colors cursor-pointer"
              title="Copy Latin and English text"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Side-by-Side Lyrics: Latin and English */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Latin (Original Sacred Tongue) */}
          <div className="p-5 rounded-xl bg-[#FCFAF7] border border-amber-900/15 space-y-3">
            <div className="flex items-center justify-between border-b border-amber-900/10 pb-2">
              <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-amber-950">
                Textus Latinus (Ecclesiastical Latin)
              </span>
              <span className="text-[10px] text-stone-500 font-serif-sacred italic">Lingua Sacra</span>
            </div>
            <div className="font-serif-sacred text-stone-900 text-base sm:text-lg leading-relaxed whitespace-pre-line">
              {selectedHymn.latinLyrics}
            </div>
          </div>

          {/* English Poetic Translation */}
          <div className="p-5 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-3">
            <div className="flex items-center justify-between border-b border-stone-200 pb-2">
              <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-stone-800">
                English Translation
              </span>
              <span className="text-[10px] text-stone-500 font-serif-sacred italic">Poetic Metrical</span>
            </div>
            <div className="font-serif-sacred text-stone-800 text-base sm:text-lg leading-relaxed whitespace-pre-line">
              {selectedHymn.englishTranslation}
            </div>
          </div>

        </div>

        {/* Theological and Historical Context Box */}
        <div className="p-5 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-2">
          <div className="flex items-center gap-2 text-amber-950 font-cinzel font-bold text-xs uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-amber-800" />
            <span>Spiritual Origin and Liturgical Setting</span>
          </div>
          <p className="font-serif-sacred text-stone-800 text-sm sm:text-base leading-relaxed">
            {selectedHymn.theologicalContext}
          </p>
        </div>

      </article>

    </div>
  );
};
