import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Pause, Play, Square, Settings2, Mic, User, Gauge } from 'lucide-react';
import { SacredReader } from '../utils/speech';

interface LectorControlsBarProps {
  onPlay?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  onStop?: () => void;
  isSpeaking?: boolean;
  isPaused?: boolean;
  currentPartId?: string | null;
  className?: string;
  title?: string;
}

export const LectorControlsBar: React.FC<LectorControlsBarProps> = ({
  onPlay,
  onPause,
  onResume,
  onStop,
  isSpeaking = false,
  isPaused = false,
  currentPartId,
  className = '',
  title = 'Sacred Lector Audio Proclamation'
}) => {
  const [femaleVoices, setFemaleVoices] = useState<{ id: string; name: string; lang: string; isSelected: boolean }[]>([]);
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>('persona-ava');
  const [selectedVoiceLabel, setSelectedVoiceLabel] = useState<string>('Ava Grace');
  const [recitationVoice, setRecitationVoice] = useState<'ava-grace' | 'david'>(() => SacredReader.getRecitationVoice());
  const [currentRate, setCurrentRate] = useState<number>(() => SacredReader.getPlaybackRate());
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    const updateVoices = () => {
      const voices = SacredReader.getAvailableFemaleVoices();
      setFemaleVoices(voices);
      const activeRecitation = SacredReader.getRecitationVoice();
      setRecitationVoice(activeRecitation);

      const active = voices.find(v => v.isSelected);
      if (active) {
        setSelectedVoiceId(active.id);
        setSelectedVoiceLabel(active.name);
      } else if (voices.length > 0) {
        setSelectedVoiceId(voices[0].id);
        setSelectedVoiceLabel(voices[0].name);
      }
    };

    updateVoices();
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  const handleVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setSelectedVoiceId(id);
    const found = femaleVoices.find(v => v.id === id);
    if (found) {
      setSelectedVoiceLabel(found.name);
    }
    SacredReader.setSelectedFemaleVoiceName(id);
  };

  const handleRateChange = (rate: number) => {
    setCurrentRate(rate);
    SacredReader.setPlaybackRate(rate);
  };

  return (
    <div className={`bg-[#1C120C]/95 border border-[#8B5A2B]/60 rounded-xl p-4 sm:p-5 text-[#F7EBE1] shadow-xl backdrop-blur-xl space-y-3.5 ${className}`}>
      
      {/* Current Part / Status Badge when Speaking */}
      {isSpeaking && (
        <div className="flex items-center justify-end pb-2 border-b border-[#8B5A2B]/30">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-serif font-semibold animate-pulse">
            <Mic className="w-3.5 h-3.5 text-amber-300" />
            <span>
              {currentPartId === 'first-reading' && 'Lector — First Reading'}
              {currentPartId === 'psalm' && 'Lector — Responsorial Psalm'}
              {currentPartId === 'gospel' && 'Lector — Holy Gospel'}
              {!currentPartId && (isPaused ? 'Lector Paused' : 'Lector Proclaiming')}
            </span>
          </div>
        </div>
      )}

      {/* Main Controls Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        
        {/* Playback Buttons */}
        <div className="flex items-center gap-2">
          {!isSpeaking ? (
            <button
              onClick={onPlay}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#6B4423] to-[#4A2E1B] hover:from-[#7A4E2D] hover:to-[#5A381C] border border-[#8B5A2B]/60 text-white font-serif font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer hover:scale-102 active:scale-98"
              title="Start Lector Reading"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Listen to Readings</span>
            </button>
          ) : isPaused ? (
            <button
              onClick={onResume || SacredReader.resume}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-serif font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              title="Resume Reading"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Resume Lector</span>
            </button>
          ) : (
            <button
              onClick={onPause || SacredReader.pause}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#5A381C] hover:bg-[#6B4423] text-amber-100 font-serif font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer border border-[#8B5A2B]/50"
              title="Pause Reading"
            >
              <Pause className="w-4 h-4" />
              <span>Pause</span>
            </button>
          )}

          {isSpeaking && (
            <button
              onClick={onStop || SacredReader.stop}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 font-serif font-medium text-xs transition-all cursor-pointer border border-stone-600"
              title="Stop Lector"
            >
              <Square className="w-3.5 h-3.5" />
              <span>Stop</span>
            </button>
          )}

          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`flex items-center gap-1.5 px-3 py-2.5 rounded-lg font-serif text-xs transition-all cursor-pointer border ${
              showSettings
                ? 'bg-amber-500/30 text-amber-200 border-amber-400'
                : 'bg-stone-900/80 hover:bg-stone-800 text-stone-300 border-stone-700'
            }`}
            title="Lector Voice Settings"
          >
            <Settings2 className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Lector Settings</span>
          </button>
        </div>

        {/* Recitation Voice Option: Ava Grace (Prioritized) vs Microsoft David */}
        <div className="flex items-center gap-1.5 bg-[#120A05] p-1 rounded-lg border border-[#8B5A2B]/80 text-xs font-serif">
          <User className="w-3.5 h-3.5 text-amber-300 shrink-0 ml-1" />
          <span className="text-stone-400 hidden lg:inline">Voice:</span>
          <button
            type="button"
            onClick={() => {
              setRecitationVoice('ava-grace');
              SacredReader.setRecitationVoice('ava-grace');
              SacredReader.setSelectedFemaleVoiceName('persona-ava');
              setSelectedVoiceId('persona-ava');
              setSelectedVoiceLabel('Ava Grace');
            }}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              recitationVoice === 'ava-grace'
                ? 'bg-[#6B4423] text-white font-bold shadow-xs border border-[#8B5A2B]/60'
                : 'text-stone-300 hover:text-amber-100 hover:bg-white/5'
            }`}
            title="Ava Grace (Prioritized Devotional Voice)"
          >
            Ava Grace
          </button>
          <button
            type="button"
            onClick={() => {
              setRecitationVoice('david');
              SacredReader.setRecitationVoice('david');
              setSelectedVoiceId('david');
              setSelectedVoiceLabel('Microsoft David');
            }}
            className={`px-3 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
              recitationVoice === 'david'
                ? 'bg-[#6B4423] text-white font-bold shadow-xs border border-[#8B5A2B]/60'
                : 'text-stone-300 hover:text-amber-100 hover:bg-white/5'
            }`}
            title="Microsoft David (Traditional Solemn Male Voice)"
          >
            David
          </button>
        </div>

      </div>

      {/* Expanded Lector Settings (Rate / Pacing and Voice Customization) */}
      {showSettings && (
        <div className="pt-3 border-t border-[#8B5A2B]/30 flex flex-wrap items-center justify-between gap-3 text-xs font-serif animate-fadeIn">
          
          <div className="flex items-center gap-2">
            <Gauge className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span className="text-stone-300 font-medium">Reading Pacing:</span>
            <div className="flex items-center gap-1 bg-[#120A05] p-1 rounded-lg border border-[#8B5A2B]/50">
              {[
                { label: 'Solemn (0.8x)', rate: 0.8 },
                { label: 'Calm (0.9x)', rate: 0.9 },
                { label: 'Standard (1.0x)', rate: 1.0 },
                { label: 'Brisk (1.1x)', rate: 1.1 }
              ].map((item) => (
                <button
                  key={item.rate}
                  onClick={() => handleRateChange(item.rate)}
                  className={`px-2.5 py-1 rounded-md text-[11px] transition-all cursor-pointer ${
                    currentRate === item.rate
                      ? 'bg-[#6B4423] text-white font-bold shadow-xs border border-[#8B5A2B]/60'
                      : 'text-stone-400 hover:text-amber-200 hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-amber-200/80 italic">
            Active Female Voice: <strong className="text-amber-100">{selectedVoiceLabel || 'Sister Sonia'}</strong>
          </p>

        </div>
      )}

    </div>
  );
};
