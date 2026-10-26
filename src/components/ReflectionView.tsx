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
      <div className="bg-white/92 backdrop-blur-md rounded-xl shadow-xl border border-stone-200/90 overflow-hidden">
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
        <div className="px-4 py-2.5 bg-[#FAF7F2]/90 backdrop-blur-sm border-t border-stone-200/80 flex items-center justify-between text-xs text-stone-700">
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
      <article className="bg-[#FAF8F5]/92 backdrop-blur-md rounded-xl p-6 sm:p-10 shadow-xl border border-amber-900/15 space-y-6">
        <div className="border-b border-stone-200/90 pb-4">
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
        <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 flex items-start gap-3 text-xs sm:text-sm font-serif text-amber-950">
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block">Gospel Tie-in:</span>
            <span>{reading.gospel.citation} — "You are worth more than many sparrows."</span>
          </div>
        </div>
      </article>
    </div>
  );
};
