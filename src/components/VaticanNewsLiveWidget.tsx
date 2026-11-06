import React, { useState } from 'react';
import { Radio, ShieldCheck, Globe2, ExternalLink, Calendar, RefreshCw, Volume2 } from 'lucide-react';

interface VaticanNewsLiveWidgetProps {
  onReloadStream?: () => void;
  isCurrentlySelected?: boolean;
  onSelectVaticanStream?: () => void;
}

export const VaticanNewsLiveWidget: React.FC<VaticanNewsLiveWidgetProps> = ({
  onReloadStream,
  isCurrentlySelected,
  onSelectVaticanStream
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<'EN' | 'IT' | 'LA' | 'ES' | 'FR'>('EN');

  const vaticanLanguages = [
    { code: 'EN', label: 'English', desc: 'Official Commentary' },
    { code: 'IT', label: 'Italiano', desc: 'Lingua Ufficiale' },
    { code: 'LA', label: 'Lingua Latina', desc: 'Liturgy Original' },
    { code: 'ES', label: 'Español', desc: 'Traducción en Vivo' },
    { code: 'FR', label: 'Français', desc: 'Direct Vatican' }
  ];

  return (
    <div className="rounded-xl overflow-hidden bg-gradient-to-b from-[#1C140E] via-[#241A13] to-[#160F0A] border border-amber-600/40 shadow-xl text-stone-100 p-4 sm:p-5 text-left relative">
      
      {/* Soft Refined Warm Bronze Header Strip */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-700 via-amber-400 to-amber-700 opacity-90" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left Section: Official Papal Seal & Title */}
        <div className="flex items-start gap-3.5 min-w-0">
          
          {/* Papal Emblem Badge */}
          <div className="w-11 h-11 rounded-xl bg-gradient-to-b from-[#6B4423] to-[#4A2E1B] border border-amber-500/50 shadow-md flex items-center justify-center shrink-0 text-amber-100 font-bold">
            <div className="flex flex-col items-center justify-center leading-none">
              <span className="text-lg">🔑</span>
              <span className="text-[9px] font-cinzel font-bold tracking-widest text-amber-200/90 uppercase mt-0.5">ROMA</span>
            </div>
          </div>

          <div className="space-y-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-900/80 border border-red-700/60 text-red-100 font-sans text-[10px] font-bold uppercase tracking-wider shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                OFFICIAL TRANSMISSION
              </span>

              <span className="inline-flex items-center gap-1 text-[11px] font-cinzel font-bold text-amber-300 uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                Dicasterium pro Communicatione
              </span>
            </div>

            <h3 className="font-cinzel text-base sm:text-lg font-bold text-white tracking-wide">
              Vatican News Official Live Widget
            </h3>

            <p className="text-xs text-stone-300 font-serif leading-relaxed line-clamp-2">
              Direct official feed from Saint Peter&apos;s Basilica, Papal Masses, Wednesday General Audiences, and Sunday Angelus address from the Apostolic Palace.
            </p>
          </div>
        </div>

        {/* Right Section: Action Controls */}
        <div className="flex flex-wrap items-center gap-2 shrink-0 self-start md:self-center">
          {!isCurrentlySelected && onSelectVaticanStream && (
            <button
              onClick={onSelectVaticanStream}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#6B4423] hover:bg-[#7D502A] border border-[#8B5A2B] text-amber-100 font-cinzel text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <Radio className="w-3.5 h-3.5 text-amber-300" />
              <span>Switch Player to Vatican Live</span>
            </button>
          )}

          {onReloadStream && (
            <button
              onClick={onReloadStream}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-800/90 hover:bg-stone-700 border border-stone-600 text-stone-200 text-xs font-sans font-medium transition-all cursor-pointer"
              title="Refresh Vatican Live Embed"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              <span>Refresh Feed</span>
            </button>
          )}

          <a
            href="https://www.vaticannews.va/en/epaper.html#live"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-red-950/80 hover:bg-red-900 border border-red-700/60 text-stone-100 text-xs font-sans font-semibold transition-all shadow-md"
          >
            <Globe2 className="w-3.5 h-3.5 text-amber-300" />
            <span>VaticanNews.va Portal</span>
            <ExternalLink className="w-3 h-3 text-stone-400" />
          </a>
        </div>
      </div>

      {/* Language Channels & Papal Schedule Bar */}
      <div className="mt-3.5 pt-3 border-t border-amber-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        
        {/* Multilingual Audio Selector Badges */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-cinzel font-bold text-amber-300 uppercase tracking-wider mr-1 flex items-center gap-1">
            <Volume2 className="w-3 h-3 text-amber-400" />
            <span>Papal Audio Feeds:</span>
          </span>
          {vaticanLanguages.map(lang => (
            <button
              key={lang.code}
              onClick={() => setSelectedLanguage(lang.code as any)}
              className={`px-2.5 py-0.5 rounded text-[10px] font-cinzel font-bold transition-all cursor-pointer ${
                selectedLanguage === lang.code
                  ? 'bg-[#6B4423] text-amber-100 border border-[#8B5A2B] shadow-xs'
                  : 'bg-stone-800/70 hover:bg-stone-700 text-stone-300 border border-stone-700/70'
              }`}
              title={lang.desc}
            >
              {lang.code} • {lang.label}
            </button>
          ))}
        </div>

        {/* Schedule Badge */}
        <div className="flex items-center gap-1.5 text-[11px] font-serif text-stone-300 shrink-0">
          <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Daily Latin Mass 7:00 AM CET • Wed Audience 9:00 AM • Sun Angelus 12:00 PM</span>
        </div>
      </div>

    </div>
  );
};
