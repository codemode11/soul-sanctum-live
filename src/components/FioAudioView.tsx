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
  Sparkles,
  Home
} from 'lucide-react';

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

interface FioFeaturedArtist {
  name: string;
  genre: string;
  url: string;
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

const FIO_FEATURED_ARTISTS: FioFeaturedArtist[] = [
  {
    name: 'Floriani',
    genre: 'Gregorian Chant & Polyphony',
    url: 'https://play.fio.fm/artist/Floriani',
  },
  {
    name: 'Benedictines of Mary',
    genre: 'Monastic Sacred Chant',
    url: 'https://play.fio.fm/artist/BenedictinesofMaryQueenofApostles',
  },
  {
    name: 'The Vigil Project',
    genre: 'Liturgical & Worship',
    url: 'https://play.fio.fm/artist/TheVigilProject',
  },
  {
    name: 'Fr. Maximilian M. Dean',
    genre: 'Sacred Devotional',
    url: 'https://play.fio.fm/artist/FrMaximilianMDean',
  },
  {
    name: 'Liturgy Resources',
    genre: 'Mass Settings & Psalms',
    url: 'https://play.fio.fm/artist/LiturgyResources',
  },
  {
    name: 'Connor Flanagan',
    genre: 'Catholic Contemporary',
    url: 'https://play.fio.fm/artist/ConnorFlanagan',
  },
  {
    name: 'Mike Mangione',
    genre: 'Catholic Folk & Acoustic',
    url: 'https://play.fio.fm/artist/MikeMangione',
  },
  {
    name: 'John Finch',
    genre: 'Catholic Worship',
    url: 'https://play.fio.fm/artist/JohnFinch',
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
      <div className="sanctum-top-banner px-5 pt-4 pb-5 sm:px-6 relative overflow-hidden rounded-xl bg-gradient-to-br from-stone-900 via-[#1C120C] to-stone-950 border border-amber-500/30 shadow-2xl text-stone-100 space-y-4">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.18)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-cinzel font-semibold tracking-wider">
            <Music className="w-3.5 h-3.5 text-amber-400" />
            <span>Fio.fm • Integrated Catholic Audio Streaming</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={activeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/35 border border-amber-400/40 text-amber-200 hover:text-white font-cinzel font-bold text-xs transition-all cursor-pointer"
            >
              <span>Open play.fio.fm</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="relative z-10 max-w-3xl space-y-1.5">
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide leading-tight">
            Fio Catholic Music, Podcasts and Audiobooks
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 font-serif leading-relaxed">
            Stream faithful Catholic music, Gregorian chant, over 1,000 Catholic podcasts, and spiritual audiobooks directly inside Soul Sanctum through the official Fio web player.
          </p>
        </div>

        {/* Section Switcher Buttons */}
        <div className="relative z-10 flex flex-wrap items-center gap-2 pt-1">
          {FIO_SECTIONS.map((section) => {
            const Icon = section.icon;
            const isActive = activeUrl === section.url;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => navigatePlayer(section.url, section.label)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-cinzel font-bold transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-amber-400 text-stone-950 border-amber-300 shadow-md'
                    : 'bg-stone-900/80 hover:bg-stone-800 text-amber-100 border-amber-500/30'
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

      {/* Featured Catholic Artists & Chant Quick-Jump Bar */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#F6F2EA]/95 border border-[#DFD6C7] shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-800" />
            <span className="font-cinzel text-xs sm:text-sm font-bold text-stone-900 uppercase tracking-wider">
              Quick Jump to Featured Catholic Artists on Fio
            </span>
          </div>
          <span className="text-xs font-serif text-stone-600">
            Loads directly inside the player below
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {FIO_FEATURED_ARTISTS.map((artist) => {
            const isSelected = activeUrl === artist.url;
            return (
              <button
                key={artist.name}
                type="button"
                onClick={() => navigatePlayer(artist.url, artist.name)}
                className={`px-3 py-1.5 rounded-lg text-xs font-serif transition-all cursor-pointer border flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-stone-900 text-amber-200 border-amber-500/60 font-bold shadow-xs'
                    : 'bg-[#FBF9F5] hover:bg-[#EFE9DC] text-stone-800 border-[#D8CFC0]'
                }`}
                title={`${artist.name} — ${artist.genre}`}
              >
                <span className="font-semibold">{artist.name}</span>
                <span className={`text-[10px] ${isSelected ? 'text-amber-300/80' : 'text-stone-500'}`}>
                  • {artist.genre}
                </span>
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
            <span className="font-cinzel font-bold text-amber-100 truncate">
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
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/20 hover:bg-amber-500/35 text-amber-200 hover:text-white border border-amber-400/40 text-[11px] font-cinzel font-semibold transition-colors cursor-pointer"
              title="Open current page directly on play.fio.fm"
            >
              <span>Pop Out</span>
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
