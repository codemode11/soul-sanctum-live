import React, { useState } from 'react';
import { 
  Tv, 
  Globe, 
  Clock, 
  MapPin, 
  Flame, 
  Sparkles, 
  ExternalLink, 
  RefreshCw, 
  Heart, 
  Compass, 
  Check, 
  Share2, 
  ChevronRight,
  ChevronDown,
  Info,
  Settings
} from 'lucide-react';
import { HolyMassLiveStream, LiveStreamRegion, LiveStreamCategory, MassReading } from '../types';
import { HOLY_MASS_LIVESTREAMS } from '../data/holyMassLiveStreams';

interface HolyMassLivePlayerViewProps {
  currentReading?: MassReading;
  initialStreamId?: string;
}

export const HolyMassLivePlayerView: React.FC<HolyMassLivePlayerViewProps> = ({
  initialStreamId
}) => {
  const [selectedStream, setSelectedStream] = useState<HolyMassLiveStream>(() => {
    if (initialStreamId) {
      const found = HOLY_MASS_LIVESTREAMS.find(s => s.id === initialStreamId);
      if (found) return found;
    }
    return HOLY_MASS_LIVESTREAMS[0]; // Vatican by default
  });

  const [selectedCategory, setSelectedCategory] = useState<LiveStreamCategory | 'all'>('all');
  const [selectedRegion, setSelectedRegion] = useState<LiveStreamRegion>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [streamKey, setStreamKey] = useState(Date.now());
  const [isTopSettingsOpen, setIsTopSettingsOpen] = useState(false);

  // Filter streams
  const filteredStreams = HOLY_MASS_LIVESTREAMS.filter(stream => {
    const matchesCategory = selectedCategory === 'all' || stream.category === selectedCategory;
    const matchesRegion = 
      selectedRegion === 'all' 
        ? true 
        : selectedRegion === 'adoration'
          ? !!stream.hasAdoration
          : selectedRegion === 'anticipated'
            ? !!stream.isAnticipatedMass
            : stream.region === selectedRegion;
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      !searchQuery.trim() ||
      stream.name.toLowerCase().includes(q) ||
      stream.sanctuary.toLowerCase().includes(q) ||
      stream.location.toLowerCase().includes(q) ||
      stream.country.toLowerCase().includes(q);
    return matchesCategory && matchesRegion && matchesSearch;
  });

  const handleShareStream = () => {
    const text = `Join the livestream of Holy Mass at ${selectedStream.sanctuary} (${selectedStream.location}, ${selectedStream.country}):
${selectedStream.name}
Schedule: ${selectedStream.scheduleDescription}

Live on Soul Sanctum Catholic Sanctuary.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const categories: { id: LiveStreamCategory | 'all'; label: string; icon: React.ReactNode; count: number; desc: string }[] = [
    {
      id: 'all' as const,
      label: 'All Livestreams',
      icon: <Globe className="w-4 h-4 text-amber-700" />,
      count: HOLY_MASS_LIVESTREAMS.length,
      desc: 'All active Catholic Masses, Adoration & Shrines'
    },
    {
      id: 'mass' as const,
      label: 'Holy Mass',
      icon: <Sparkles className="w-4 h-4 text-amber-600" />,
      count: HOLY_MASS_LIVESTREAMS.filter(s => s.category === 'mass').length,
      desc: 'Papal, Cathedral & Daily TV Masses'
    },
    {
      id: 'adoration' as const,
      label: 'Eucharistic Adoration',
      icon: <Flame className="w-4 h-4 text-red-600" />,
      count: HOLY_MASS_LIVESTREAMS.filter(s => s.category === 'adoration').length,
      desc: '24/7 Perpetual Adoration Chapels'
    },
    {
      id: 'apparition' as const,
      label: 'Apparition Sites',
      icon: <Heart className="w-4 h-4 text-blue-600" />,
      count: HOLY_MASS_LIVESTREAMS.filter(s => s.category === 'apparition').length,
      desc: 'Lourdes, Fátima, Guadalupe, Knock & More'
    }
  ].filter(c => c.id === 'all' || c.count > 0);

  const regions: { id: LiveStreamRegion; label: string }[] = [
    { id: 'all', label: 'All Regions' },
    { id: 'vatican', label: '🇻🇦 Vatican & Papal' },
    { id: 'adoration', label: '✝️ Eucharistic Adoration' },
    { id: 'north-america', label: 'North America' },
    { id: 'europe', label: 'Europe & Shrines' },
    { id: 'asia-latam', label: 'Asia-Pacific & Australia' }
  ];

  return (
    <div className="max-w-5xl mx-auto pt-0 pb-20 space-y-6 transition-all duration-300">
      
      {/* 1. Top Masthead & Active Sanctuary Stage Card */}
      <div className="rounded-xl overflow-hidden bg-gradient-to-b from-stone-900 via-[#1A110B] to-stone-950 border border-amber-500/35 shadow-2xl text-stone-100">
        
        {/* Top Header Bar with Settings Drop-Down Icon */}
        <div className="bg-gradient-to-r from-stone-900 via-[#1C120C] to-stone-900 text-stone-100 border-b border-amber-500/25">
          <div className="px-4 py-3 sm:px-6 flex items-center justify-between gap-3">
            <div className="space-y-0.5 text-left min-w-0">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-red-600/30 border border-red-500/50 text-red-200 text-[10.5px] font-cinzel font-bold tracking-wider uppercase">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                <span className="truncate">Live: {selectedStream.sanctuary}</span>
              </div>

              <h2 className="font-cinzel text-lg sm:text-2xl font-bold text-white tracking-wide truncate">
                Holy Mass Live
              </h2>
            </div>

            {/* Quick Actions & Settings Drop-Down Button */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Quick Reload Stream */}
              <button
                type="button"
                onClick={() => setStreamKey(Date.now())}
                className="h-8 px-2.5 rounded-md bg-[#1C120C]/90 hover:bg-[#25170F] text-[#D4A373] hover:text-[#F7EBE1] border border-[#8B5A2B]/50 hover:border-[#D4A373]/70 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-sans"
                title="Reload video stream"
              >
                <RefreshCw className="w-3.5 h-3.5 text-[#D4A373]" />
                <span className="hidden sm:inline">Reload</span>
              </button>

              {/* Settings Drop-Down Icon Button */}
              <button
                type="button"
                onClick={() => setIsTopSettingsOpen(prev => !prev)}
                aria-expanded={isTopSettingsOpen}
                className={`h-8 flex items-center gap-1 px-2.5 rounded-md transition-all cursor-pointer shrink-0 border ${
                  isTopSettingsOpen
                    ? 'bg-[#25170F] text-[#F7EBE1] border-[#D4A373] ring-2 ring-[#8B5A2B]/40'
                    : 'bg-[#1C120C]/90 hover:bg-[#25170F] text-[#D4A373] hover:text-[#F7EBE1] border-[#8B5A2B]/50 hover:border-[#D4A373]/70'
                }`}
                title={isTopSettingsOpen ? 'Hide Stream Options & Details' : 'Show Stream Options & Details'}
                aria-label={isTopSettingsOpen ? 'Hide Stream Options & Details' : 'Show Stream Options & Details'}
              >
                <Settings className="w-3.5 h-3.5 text-[#D4A373] shrink-0" />
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#D4A373] shrink-0 transition-transform duration-200 ${
                    isTopSettingsOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Expandable Settings Drop-Down Panel */}
          {isTopSettingsOpen && (
            <div className="px-4 py-3 sm:px-6 bg-[#160D08]/95 border-t border-amber-500/20 text-stone-200 space-y-3 animate-in fade-in">
              <p className="text-xs sm:text-sm text-stone-300 font-serif leading-relaxed">
                Unite in the Holy Sacrifice of the Mass celebrated in real-time from Saint Peter&apos;s Basilica in the Vatican, <strong>EWTN Live Mass &amp; Devotions</strong>, the Grotto of Lourdes, Fátima, the Holy Sepulchre in Jerusalem, Basilica Minore del Santo Niño de Cebú, and perpetual adoration sanctuaries worldwide.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-amber-900/30">
                <button
                  type="button"
                  onClick={handleShareStream}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-900/70 hover:bg-amber-800 border border-amber-600/70 text-amber-100 text-xs font-sans font-medium transition-all cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Link Copied' : 'Share Stream Link'}</span>
                </button>

                {selectedStream.youtubeLiveUrl && (
                  <a
                    href={selectedStream.youtubeLiveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 border border-stone-600 text-stone-200 text-xs font-sans transition-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                    <span>Open External Broadcast</span>
                  </a>
                )}

                <div className="text-[11px] text-stone-400 font-serif ml-auto">
                  Quality: 1080p HD • Audio: Live Altar Choir &amp; Proclamation
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Full-Width Livestream Video Player */}
        <div className="relative w-full bg-black border-b border-amber-500/30 aspect-[16/9] min-h-[360px] sm:min-h-[480px] md:min-h-[580px]">
          <iframe
            key={`${selectedStream.id}-${streamKey}`}
            src={selectedStream.videoEmbedUrl}
            title={selectedStream.name}
            className="w-full h-full object-cover border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />

          {/* Top-Left Live Sanctuary Badge */}
          <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2 pointer-events-none z-10">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-600/90 text-white font-sans text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              LIVE
            </span>
            <span className="px-2.5 py-1 rounded-full bg-black/75 text-amber-200 text-[11px] font-serif border border-white/20 backdrop-blur-md">
              {selectedStream.sanctuary}
            </span>
          </div>
        </div>



        {/* Integrated Sanctuary Details, Schedule & Direct Broadcast Bar */}
        <div className="p-5 sm:p-6 bg-gradient-to-b from-[#1D120B] to-[#140C07] space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
            <div className="space-y-1.5 text-left flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold font-cinzel uppercase tracking-widest text-amber-400">
                  {selectedStream.location}, {selectedStream.country} • {selectedStream.language}
                </span>
                {selectedStream.isAnticipatedMass && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-200 text-[10px] font-bold font-cinzel">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>Anticipated Sunday Mass</span>
                  </span>
                )}
              </div>

              <h3 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-white leading-snug">
                {selectedStream.name}
              </h3>

              <p className="text-xs sm:text-sm text-stone-300 font-serif leading-relaxed">
                {selectedStream.description}
              </p>
            </div>

            {/* Direct Uninterrupted Broadcast Links */}
            <div className="flex flex-wrap items-center gap-2 shrink-0 self-start">
              {selectedStream.fallbackStreamUrl && (
                <a
                  href={selectedStream.fallbackStreamUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-900 hover:bg-amber-800 border border-amber-600 text-amber-50 text-xs font-sans font-semibold transition-all shadow-md"
                  title="Watch high-definition broadcast directly on the official sanctuary streaming portal"
                >
                  <Tv className="w-3.5 h-3.5 text-amber-200" />
                  <span>Official Sanctuary HD Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}

              {selectedStream.youtubeLiveUrl && (
                <a
                  href={selectedStream.youtubeLiveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-red-800/80 hover:bg-red-700 border border-red-500/50 text-white text-xs font-sans font-semibold transition-all shadow-md"
                  title="Watch official livestream directly on YouTube"
                >
                  <span>YouTube Live Channel</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* Schedule & Fallback Notice Strip */}
          <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-serif text-stone-300 text-left">
            <div className="flex items-start sm:items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
              <span>
                <strong className="text-amber-200">Liturgical Schedule: </strong>
                {selectedStream.scheduleDescription}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
              <Info className="w-3.5 h-3.5 text-amber-400/80 shrink-0" />
              <span>If embedded video is restricted by broadcaster, use the Official Portal or YouTube button above.</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Worldwide Sanctuaries & Category Selection */}
      <div className="rounded-xl bg-white/85 backdrop-blur-xl border border-stone-200/90 shadow-lg p-5 sm:p-6 space-y-6">
        
        {/* Top Header & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
          <div className="space-y-0.5 text-left">
            <h3 className="font-cinzel text-lg sm:text-xl font-bold text-stone-900 tracking-wide flex items-center gap-2">
              <Globe className="w-5 h-5 text-amber-800" />
              <span>Worldwide Livestreams ({filteredStreams.length})</span>
            </h3>
            <p className="text-xs text-stone-600 font-serif">
              Browse Holy Mass, 24/7 Eucharistic Adoration, and Marian Apparition Site streams.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Filter by country or shrine..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-2 rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-amber-700 font-serif text-stone-900"
            />
            <Compass className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* Primary Category Selector Cards (Holy Mass, Eucharistic Adoration, Apparition Sites) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {categories.map(cat => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  if (cat.id === 'adoration') {
                    const defaultAdoration =
                      HOLY_MASS_LIVESTREAMS.find(s => s.id === 'st-benedicts-perpetual-adoration-shrine') ||
                      HOLY_MASS_LIVESTREAMS.find(s => s.category === 'adoration');
                    if (defaultAdoration) {
                      setSelectedStream(defaultAdoration);
                      setStreamKey(Date.now());
                    }
                  }
                }}
                className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-2.5 group ${
                  isActive
                    ? 'bg-amber-900/95 text-amber-50 border-amber-700 ring-2 ring-amber-600/40 shadow-md'
                    : 'bg-stone-50/90 hover:bg-stone-100/90 border-stone-200 text-stone-800'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className={`p-2 rounded-lg ${isActive ? 'bg-amber-800/80 text-amber-200' : 'bg-white text-stone-700 shadow-2xs'}`}>
                    {cat.icon}
                  </div>
                  <span className={`text-xs font-bold font-cinzel px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-amber-800 text-amber-100' : 'bg-stone-200 text-stone-700'
                  }`}>
                    {cat.count}
                  </span>
                </div>

                <div>
                  <h4 className={`font-cinzel text-xs sm:text-sm font-bold leading-snug ${isActive ? 'text-white' : 'text-stone-900'}`}>
                    {cat.label}
                  </h4>
                  <p className={`text-[11px] font-serif leading-tight mt-0.5 ${isActive ? 'text-amber-200/90' : 'text-stone-500'}`}>
                    {cat.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Region Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-stone-100">
          <span className="text-[11px] font-cinzel font-bold text-stone-500 uppercase tracking-wider mr-1">
            Region:
          </span>
          {regions.map(r => (
            <button
              key={r.id}
              onClick={() => setSelectedRegion(r.id)}
              className={`px-3 py-1 rounded-lg text-xs font-cinzel transition-all cursor-pointer ${
                selectedRegion === r.id
                  ? 'bg-amber-900 text-amber-50 font-bold shadow-xs border border-amber-600'
                  : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Sanctuaries Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStreams.map(stream => {
            const isSelected = selectedStream.id === stream.id;
            return (
              <div
                key={stream.id}
                onClick={() => {
                  setSelectedStream(stream);
                  setStreamKey(Date.now());
                  const mainArea = document.getElementById('main-content-area');
                  if (mainArea) {
                    const rect = mainArea.getBoundingClientRect();
                    const absoluteTop = rect.top + window.pageYOffset;
                    window.scrollTo({ top: Math.max(0, absoluteTop - 80), behavior: 'smooth' });
                  }
                }}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-3 text-left group ${
                  isSelected
                    ? 'bg-amber-50/95 border-amber-600 ring-2 ring-amber-600/35 shadow-md'
                    : 'bg-white hover:bg-stone-50/90 border-stone-200 shadow-2xs hover:shadow-sm'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-[10px] font-bold font-cinzel text-amber-800 uppercase tracking-wider">
                    <MapPin className="w-2.5 h-2.5" />
                    <span>{stream.country}</span>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-stone-200 shadow-xs">
                      <img 
                        src={stream.thumbnailUrl} 
                        alt={stream.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                        <Tv className="w-4 h-4 text-white drop-shadow-md" />
                      </div>
                    </div>

                    <div className="min-w-0 space-y-0.5">
                      <h4 className="font-serif text-sm font-bold text-stone-900 group-hover:text-amber-900 transition-colors line-clamp-2 leading-snug">
                        {stream.name}
                      </h4>

                      <p className="text-[11px] text-stone-500 font-serif line-clamp-1">
                        {stream.sanctuary}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                  <span className="font-medium text-stone-700">{stream.language}</span>
                  <span className="inline-flex items-center gap-1 text-amber-800 font-cinzel font-bold group-hover:translate-x-0.5 transition-transform">
                    <span>{isSelected ? 'Playing Now' : 'Watch Stream'}</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {filteredStreams.length === 0 && (
          <div className="p-8 text-center text-stone-500 font-serif space-y-2">
            <p>No livestreams match your current search and filter criteria.</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSelectedRegion('all'); setSearchQuery(''); }}
              className="text-xs text-amber-800 font-cinzel font-bold underline cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

