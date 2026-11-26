import React, { useState } from 'react';
import {
  Music,
  Headphones,
  BookOpen,
  Compass,
  ListMusic,
  LogIn,
  RefreshCw,
  ExternalLink,
  Maximize2,
  Minimize2,
  Home
} from 'lucide-react';
import fioBannerImg from '../assets/images/fio_listening_chair_inward_1795582194268.jpg';

interface FioAudioViewProps {
  onStopSanctumAudio?: () => void;
}

interface FioSectionOption {
  id: string;
  label: string;
  url: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const FIO_SECTIONS: FioSectionOption[] = [
  {
    id: 'home',
    label: 'Home & Featured',
    url: 'https://play.fio.fm',
    description: 'New Catholic music releases, featured albums, podcasts, and audiobooks',
    icon: Home,
  },
  {
    id: 'browse',
    label: 'Browse Catalog',
    url: 'https://play.fio.fm/browse',
    description: 'Explore Catholic genres, chant, worship, podcasts, and publishers',
    icon: Compass,
  },
  {
    id: 'playlists',
    label: 'Playlists',
    url: 'https://play.fio.fm/playlists',
    description: 'Curated Catholic playlists for prayer, Eucharistic Adoration, and daily life',
    icon: ListMusic,
  },
  {
    id: 'login',
    label: 'Fio Account',
    url: 'https://play.fio.fm/log-in',
    description: 'Sign in to your Fio account for your saved library and full streaming',
    icon: LogIn,
  },
];

export const FioAudioView: React.FC<FioAudioViewProps> = ({ onStopSanctumAudio }) => {
  const [activeUrl, setActiveUrl] = useState<string>('https://play.fio.fm');
  const [activeLabel, setActiveLabel] = useState<string>('Home & Featured');
  const [iframeKey, setIframeKey] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const navigatePlayer = (url: string, label: string) => {
    onStopSanctumAudio?.();
    if (url === activeUrl) {
      setIframeKey((prev) => prev + 1);
    } else {
      setActiveUrl(url);
      setActiveLabel(label);
    }
  };

  const handleReload = () => {
    setIframeKey((prev) => prev + 1);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20 animate-fadeIn">
      {/* Master Header Banner */}
      <div className="sanctum-top-banner px-5 pt-4 pb-4 sm:px-6 min-h-[196px] sm:h-[212px] relative isolate overflow-hidden rounded-xl bg-[#1C120C] border border-amber-500/30 shadow-2xl text-stone-100 flex flex-col justify-between gap-2">
        {/* Right-Side Cozy Catholic Listening Corner Artwork with Thin Tower Speakers */}
        <div
          className="pointer-events-none select-none absolute inset-y-0 right-0 w-full flex items-center justify-end overflow-hidden"
          aria-hidden="true"
        >
          <img
            src={fioBannerImg}
            alt="Cozy Catholic listening corner with an inward-facing cognac leather armchair, glowing floor lamp, wall crucifix, thin tower speakers on both sides, and walnut side table with studio headphones and audio player"
            decoding="async"
            referrerPolicy="no-referrer"
            className="h-full w-auto max-w-full object-contain object-right brightness-[0.99] contrast-[1.03]"
            style={{
              maskImage:
                'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.48) 14%, black 28%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.48) 14%, black 28%)',
            }}
          />
        </div>

        {/* Mobile left-side readability veil */}
        <div
          className="sm:hidden pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#1C120C_0%,#1C120C_34%,rgba(28,18,12,0.88)_56%,rgba(28,18,12,0.42)_78%,rgba(28,18,12,0.16)_100%)]"
          aria-hidden="true"
        />
        {/* Subtle top/bottom warm espresso feathering */}
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1C120C]/55 via-transparent to-[#1C120C]/20"
          aria-hidden="true"
        />

        <div className="relative z-10 flex items-center gap-3">
          <div className="leading-snug inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[11px] font-cinzel font-semibold tracking-wider backdrop-blur-xs">
            <Music className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="leading-snug">Fio.fm • Integrated Catholic Audio Streaming</span>
          </div>
        </div>

        <div className="relative z-10 max-w-[92%] sm:max-w-[56%] md:max-w-[55%] space-y-0.5">
          <h2 className="font-cinzel text-lg sm:text-[22px] font-bold text-white tracking-wide leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            Fio Catholic Music, Podcasts and Audiobooks
          </h2>
          <p className="text-[11px] sm:text-xs text-stone-200 font-serif leading-snug drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">
            Stream faithful Catholic music, Gregorian chant, over 1,000 Catholic podcasts, and spiritual audiobooks through the official Fio web player.
          </p>
        </div>

        {/* Section Switcher Buttons */}
        <div className="relative z-10 flex items-center gap-2 overflow-x-auto no-scrollbar pt-0.5">
          {FIO_SECTIONS.map((section) => {
            const Icon = section.icon;
            const isActive = activeUrl === section.url;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => navigatePlayer(section.url, section.label)}
                className={`h-8 inline-flex items-center gap-1.5 px-3 rounded-lg text-xs font-cinzel font-bold transition-all cursor-pointer border whitespace-nowrap shrink-0 backdrop-blur-xs ${
                  isActive
                    ? 'bg-amber-400 text-stone-950 border-amber-300 shadow-md'
                    : 'bg-[#1C120C]/85 hover:bg-[#2E1D12] text-amber-100 border-amber-500/40'
                }`}
                title={section.description}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{section.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Embedded Live Fio.fm Web Player */}
      <div className="rounded-xl overflow-hidden border border-[#D8CFC0] bg-stone-950 shadow-xl">
        {/* Player Chrome Bar */}
        <div className="px-4 py-2.5 bg-gradient-to-r from-stone-900 via-[#1E1612] to-stone-900 border-b border-amber-500/25 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <Headphones className="w-4 h-4 text-amber-400 shrink-0" />
 <span className="leading-snug font-cinzel font-bold text-amber-100">
              Fio Web Player — {activeLabel}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleReload}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-700 text-[11px] font-cinzel font-semibold transition-colors cursor-pointer"
              title="Reload Fio player"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reload</span>
            </button>

            <button
              type="button"
              onClick={() => setIsExpanded((prev) => !prev)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white border border-stone-700 text-[11px] font-cinzel font-semibold transition-colors cursor-pointer"
              title={isExpanded ? 'Standard player height' : 'Expand player height'}
            >
              {isExpanded ? (
                <>
                  <Minimize2 className="w-3 h-3" />
                  <span>Compact</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3 h-3" />
                  <span>Expand</span>
                </>
              )}
            </button>

            <a
              href={activeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/20 hover:bg-amber-500/35 text-amber-200 hover:text-white border border-amber-400/40 text-[11px] font-cinzel font-bold transition-colors cursor-pointer"
              title="Open current page directly on play.fio.fm"
            >
              <span>Open play.fio.fm</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Live Fio.fm Iframe */}
        <div
          className={`w-full bg-stone-950 transition-all duration-300 ${
            isExpanded ? 'h-[860px]' : 'h-[680px]'
          }`}
        >
          <iframe
            key={`${activeUrl}-${iframeKey}`}
            src={activeUrl}
            title={`Fio.fm Catholic Audio Player — ${activeLabel}`}
            className="w-full h-full border-0"
            allow="autoplay; encrypted-media; clipboard-write; fullscreen; picture-in-picture"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* Platform Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#DFD6C7] space-y-1.5">
          <div className="flex items-center gap-2 text-amber-900 font-cinzel text-xs font-bold uppercase tracking-wider">
            <Music className="w-4 h-4 text-amber-700" />
            <span>Vetted Catholic Music</span>
          </div>
          <p className="text-xs sm:text-sm font-serif text-stone-700 leading-relaxed">
            Thousands of human-created Catholic tracks spanning Gregorian chant, sacred polyphony, liturgical worship, folk, and contemporary artists.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#DFD6C7] space-y-1.5">
          <div className="flex items-center gap-2 text-amber-900 font-cinzel text-xs font-bold uppercase tracking-wider">
            <Headphones className="w-4 h-4 text-amber-700" />
            <span>1,000+ Catholic Podcasts</span>
          </div>
          <p className="text-xs sm:text-sm font-serif text-stone-700 leading-relaxed">
            Faithful theology, apologetics, Scripture, Church history, and daily spiritual reflections from trusted Catholic hosts and apostolates.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#DFD6C7] space-y-1.5">
          <div className="flex items-center gap-2 text-amber-900 font-cinzel text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-amber-700" />
            <span>Catholic Audiobooks</span>
          </div>
          <p className="text-xs sm:text-sm font-serif text-stone-700 leading-relaxed">
            Hundreds of Catholic audiobooks and classics from Sophia Institute Press, Word on Fire, TAN Books, and Pauline Books and Media.
          </p>
        </div>
      </div>
    </div>
  );
};
