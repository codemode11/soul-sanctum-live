import React, { useState } from 'react';
import { 
  BookOpen, 
  Quote, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  ChevronLeft, 
  ChevronRight,
  Heart,
  Share2
} from 'lucide-react';
import { MassReading } from '../types';
import { LITURGICAL_COLORS_INFO } from '../data/liturgicalCalendar';
import { SacredReader } from '../utils/speech';
import { getDailyGospelCommentaries } from '../data/commentary';
import { StructuredCommentaryDisplay } from './StructuredCommentary';

interface ReflectionViewProps {
  reading: MassReading;
  onSelectDate: (dateStr: string) => void;
}

export const ReflectionView: React.FC<ReflectionViewProps> = ({
  reading,
  onSelectDate
}) => {
  const [copied, setCopied] = useState(false);
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const colorMeta = LITURGICAL_COLORS_INFO[reading.liturgicalColor] || LITURGICAL_COLORS_INFO.white;

  const handleCopy = () => {
    const text = `DAILY LITURGICAL REFLECTION — ${reading.date}
Liturgical Day: ${reading.liturgicalDay}
Title: ${reading.reflection.title}
Author/Source: ${reading.reflection.author}

${reading.reflection.content}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleSpeak = () => {
    if (isReadingAloud) {
      SacredReader.stop();
      setIsReadingAloud(false);
    } else {
      const speech = `Daily Liturgical Reflection for ${reading.liturgicalDay}. ${reading.reflection.title}, from ${reading.reflection.author}. ${reading.reflection.content}`;
      SacredReader.speak(speech, () => setIsReadingAloud(false));
      setIsReadingAloud(true);
    }
  };

  const handlePrevDay = () => {
    const d = new Date(reading.date + 'T12:00:00Z');
    d.setDate(d.getDate() - 1);
    onSelectDate(d.toISOString().split('T')[0]);
  };

  const handleNextDay = () => {
    const d = new Date(reading.date + 'T12:00:00Z');
    d.setDate(d.getDate() + 1);
    onSelectDate(d.toISOString().split('T')[0]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fadeIn">
      {/* Liturgical Day Banner */}
      <div className="bg-white/45 backdrop-blur-xl backdrop-saturate-150 rounded-xl shadow-[0_8px_32px_0_rgba(120,90,50,0.12)] border border-white/60 ring-1 ring-inset ring-white/40 overflow-hidden">
        <div className="p-4 sm:p-6 bg-gradient-to-r from-stone-900 to-stone-800 text-stone-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span 
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider"
                style={{ backgroundColor: colorMeta.hex, color: reading.liturgicalColor === 'white' ? '#451a03' : '#ffffff' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {colorMeta.name} • {reading.liturgicalRank}
              </span>
              <span className="text-xs text-stone-300 font-serif-sacred">
                {reading.liturgicalSeason}
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-normal text-amber-100">
              {reading.liturgicalDay.includes(' / ') ? (
                <>
                  <span className="block">{reading.liturgicalDay.split(' / ')[0]}</span>
                  <span className="block text-lg sm:text-xl font-medium text-amber-200/95 italic mt-1 font-serif">
                    {reading.liturgicalDay.split(' / ')[1]}
                  </span>
                </>
              ) : (
                reading.liturgicalDay
              )}
            </h2>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={handlePrevDay}
              className="p-2 rounded-lg bg-stone-700/80 hover:bg-stone-600 text-stone-200 transition-colors cursor-pointer"
              title="Previous Day"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="px-3 py-1.5 rounded-lg bg-stone-700/80 text-xs font-medium text-amber-200">
              {reading.date}
            </div>
            <button
              onClick={handleNextDay}
              className="p-2 rounded-lg bg-stone-700/80 hover:bg-stone-600 text-stone-200 transition-colors cursor-pointer"
              title="Next Day"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="px-4 py-2.5 bg-white/35 backdrop-blur-md border-t border-white/50 flex items-center justify-between text-xs text-stone-800">
          <span className="font-serif italic text-stone-500">
            Source: {reading.reflection.author}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleSpeak}
              className={`p-2 rounded-lg font-serif font-medium text-xs transition-colors cursor-pointer shadow-2xs ${
                isReadingAloud
                  ? 'bg-amber-700 text-white animate-pulse'
                  : 'bg-stone-200/90 hover:bg-stone-300 text-stone-800'
              }`}
              title="Listen to Reflection"
              aria-label="Listen to Reflection"
            >
              {isReadingAloud ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4 text-amber-800" />
              )}
            </button>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-stone-200/80 hover:bg-stone-300 text-stone-800 font-medium transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-600" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Reflection Card */}
      <article className="bg-white/45 backdrop-blur-xl backdrop-saturate-150 rounded-xl p-6 sm:p-10 shadow-[0_8px_32px_0_rgba(120,90,50,0.12)] border border-white/60 ring-1 ring-inset ring-white/40 space-y-6">
        <div className="border-b border-stone-300/60 pb-4">
          <div className="flex items-center text-amber-900 mb-1">
            <span className="text-xs font-cinzel font-bold text-amber-800 uppercase tracking-wider">
              Patristic and Liturgical Reflection
            </span>
          </div>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            {reading.reflection.title}
          </h3>
        </div>

        {/* Reflection Body */}
        <div className="font-serif-sacred text-stone-800 text-xl sm:text-2xl leading-relaxed whitespace-pre-line space-y-4">
          {reading.reflection.content}
        </div>

        {/* Liturgical Anchor and Scripture Hook */}
        <div className="p-4 rounded-xl bg-amber-50/45 backdrop-blur-md border border-white/60 flex items-start gap-3 text-xs sm:text-sm font-serif text-amber-950">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Gospel Tie-in:</span>
            <span>{reading.gospel.citation}</span>
          </div>
        </div>
      </article>

      {/* PATRISTIC EXPOSITION AND BIBLE COMMENTARY */}
      {(() => {
        const comms = getDailyGospelCommentaries(reading);
        const topComm = comms[0];
        if (!topComm) return null;
        return (
          <article className="bg-[#F8F4ED] text-[#2C1C0E] rounded-xl p-6 sm:p-10 shadow-sm border border-[#DDD0BE] space-y-6">
            <div className="border-b border-[#E3D6C5] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-[#8C6239] text-white text-xs font-bold uppercase tracking-widest font-serif mb-2">
                  Patristic Exposition
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A1B0E] tracking-normal">
                  Commentary and Notes from the Magisterium
                </h3>
                <p className="text-xs sm:text-sm text-[#6B523B] font-serif italic mt-1">
                  Gospel Passage: {topComm.scriptureReference} — {topComm.author}
                </p>
              </div>
            </div>

            {/* Structured Commentary Display */}
            <div className="pt-2">
              <StructuredCommentaryDisplay commentaryText={topComm.commentaryText} />
            </div>

            {/* Practical Application */}
            {topComm.practicalApplication && (
              <div className="p-4 rounded-xl bg-[#FAF4EA] border border-[#E5D7C3] text-[#4A3623] text-xs sm:text-sm font-serif italic">
                <span className="font-bold not-italic text-[#8C6239] block mb-1">Practical Spiritual Fruit:</span>
                "{topComm.practicalApplication}"
              </div>
            )}
          </article>
        );
      })()}
    </div>
  );
};
