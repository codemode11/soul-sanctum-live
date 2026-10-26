import React, { useState, useEffect } from 'react';
import { 
  Tv, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Globe, 
  Clock, 
  MapPin, 
  Flame, 
  Sparkles, 
  BookOpen, 
  ExternalLink, 
  RefreshCw, 
  Heart, 
  Compass, 
  Check, 
  Share2, 
  ChevronRight,
  Info
} from 'lucide-react';
import { HolyMassLiveStream, LiveStreamRegion, MassReading } from '../types';
import { HOLY_MASS_LIVESTREAMS, getStreamsByRegion } from '../data/holyMassLiveStreams';
import { SacredReader } from '../utils/speech';

interface HolyMassLivePlayerViewProps {
  currentReading?: MassReading;
  initialStreamId?: string;
}

export const HolyMassLivePlayerView: React.FC<HolyMassLivePlayerViewProps> = ({
  currentReading,
  initialStreamId
}) => {
  const [selectedStream, setSelectedStream] = useState<HolyMassLiveStream>(() => {
    if (initialStreamId) {
      const found = HOLY_MASS_LIVESTREAMS.find(s => s.id === initialStreamId);
      if (found) return found;
    }
    return HOLY_MASS_LIVESTREAMS[0]; // Vatican by default
  });

  const [selectedRegion, setSelectedRegion] = useState<LiveStreamRegion>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSideTab, setActiveSideTab] = useState<'communion' | 'readings' | 'candle'>('communion');
  const [isPrayingSpiritualCommunion, setIsPrayingSpiritualCommunion] = useState(false);
  const [isCandleLit, setIsCandleLit] = useState(false);
  const [candleIntention, setCandleIntention] = useState('');
  const [savedIntentions, setSavedIntentions] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [streamKey, setStreamKey] = useState(Date.now());

  // Filter streams
  const filteredStreams = HOLY_MASS_LIVESTREAMS.filter(stream => {
    const matchesRegion = 
      selectedRegion === 'all' 
        ? true 
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
    return matchesRegion && matchesSearch;
  });

  const spiritualCommunionPrayer = `My Jesus, 
I believe that You are present in the Most Holy Sacrament. 
I love You above all things, 
and I desire to receive You into my soul. 

Since I cannot at this moment receive You sacramentally, 
come at least spiritually into my heart. 

I embrace You as if You were already there 
and unite myself wholly to You. 
Never permit me to be separated from You. 

Amen.`;

  const handleToggleSpiritualCommunionAudio = () => {
    if (isPrayingSpiritualCommunion) {
      SacredReader.stop();
      setIsPrayingSpiritualCommunion(false);
    } else {
      const speech = `Act of Spiritual Communion, by Saint Alphonsus Liguori. ${spiritualCommunionPrayer}`;
      SacredReader.speak(speech, () => setIsPrayingSpiritualCommunion(false));
      setIsPrayingSpiritualCommunion(true);
    }
  };

  const handleLightCandle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candleIntention.trim()) return;
    setSavedIntentions(prev => [candleIntention.trim(), ...prev]);
    setIsCandleLit(true);
    setCandleIntention('');
  };

  const handleShareStream = () => {
    const text = `Join the livestream of Holy Mass at ${selectedStream.sanctuary} (${selectedStream.location}, ${selectedStream.country}):
${selectedStream.name}
Schedule: ${selectedStream.scheduleDescription}

Live on Soul Sanctum Catholic Sanctuary.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const regions: { id: LiveStreamRegion; label: string }[] = [
    { id: 'all', label: 'All Sanctuaries' },
    { id: 'anticipated', label: '✨ Anticipated Sunday Masses' },
    { id: 'vatican', label: 'Vatican and Rome' },
    { id: 'europe', label: 'Europe and Shrines' },
    { id: 'north-america', label: 'North America' },
    { id: 'holy-land', label: 'Holy Land (Jerusalem)' },
    { id: 'asia-latam', label: 'Asia and Philippines' }
  ];

  return (
    <div className={`space-y-8 pb-24 ${isTheaterMode ? 'max-w-7xl mx-auto' : 'max-w-5xl mx-auto'}`}>
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-stone-900 via-[#1C120C] to-stone-950 border border-amber-500/30 p-6 sm:p-8 text-stone-100 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/30 border border-red-500/50 text-red-200 text-xs font-cinzel font-bold tracking-wider">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
              <span>Worldwide Catholic Livestream Altar</span>
            </div>
            
            <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide">
              Holy Mass Livestreams
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 font-serif leading-relaxed">
              Unite in the Holy Sacrifice of the Mass celebrated in real-time from Saint Peter's Basilica in the Vatican, the Grotto of Lourdes, Fatima, the Holy Sepulchre in Jerusalem, St. Patrick's in New York, and sanctuaries worldwide.
            </p>
          </div>

          <div className="flex flex-wrap md:flex-col items-start md:items-end gap-2 shrink-0">
            <button
              onClick={() => setIsTheaterMode(!isTheaterMode)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#6B4423]/40 hover:bg-[#6B4423]/65 border border-[#8B5A2B]/70 text-[#F5D7B2] text-xs font-sans font-semibold transition-all cursor-pointer backdrop-blur-md"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>{isTheaterMode ? 'Standard View' : 'Theater Mode'}</span>
            </button>

            <button
              onClick={handleShareStream}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 border border-stone-600 text-stone-300 text-xs font-sans font-medium transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied' : 'Share Livestream'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Video Arena Layout: Video Player + Accompanying Devotions Dock */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left / Center: Video Player Frame (Takes 8 cols in standard mode, 12 in theater) */}
        <div className={`space-y-4 ${isTheaterMode ? 'lg:col-span-12' : 'lg:col-span-8'}`}>
          
          <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-stone-950 border border-amber-500/40 shadow-2xl group flex flex-col items-center justify-center">
            {/* Live Video Embed with strict-origin-when-cross-origin to eliminate YouTube Error 153 */}
            <iframe
              key={`${selectedStream.id}-${streamKey}`}
              src={selectedStream.videoEmbedUrl}
              title={selectedStream.name}
              className="w-full h-full object-cover border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />

            {/* Top Overlay Badge Bar */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-600/90 text-white font-sans text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  LIVE ALTAR
                </span>

                <span className="px-2.5 py-1 rounded-full bg-black/70 text-amber-200 text-[10px] font-serif border border-white/20 backdrop-blur-md">
                  {selectedStream.sanctuary}
                </span>
              </div>

              <div className="flex items-center gap-2 pointer-events-auto">
                {selectedStream.youtubeLiveUrl && (
                  <a
                    href={selectedStream.youtubeLiveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-600/80 hover:bg-red-600 text-white text-[10px] font-sans font-semibold backdrop-blur-md shadow-md transition-all"
                    title="Open on YouTube Live"
                  >
                    <span>Open YouTube Live</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                <button
                  onClick={() => setStreamKey(Date.now())}
                  className="p-1.5 rounded-full bg-black/70 text-stone-300 hover:text-white border border-white/20 hover:border-amber-400 transition-colors cursor-pointer"
                  title="Reload video stream"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Floating Embedded Playback Notice Overlay */}
            <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl bg-black/80 backdrop-blur-md border border-[#8B5A2B]/50 text-amber-100 text-[11px] font-serif flex items-center justify-between gap-2 shadow-lg">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-[#D4A373] shrink-0" />
                <span>If video says "Video unavailable", click official broadcast or YouTube button.</span>
              </div>
              {selectedStream.fallbackStreamUrl && (
                <a
                  href={selectedStream.fallbackStreamUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1 rounded-lg bg-[#6B4423] hover:bg-[#7A4E2D] border border-[#8B5A2B] text-white text-[10px] font-sans font-bold shrink-0 transition-all shadow-sm"
                >
                  Official Portal
                </a>
              )}
            </div>
          </div>

          {/* Direct Stream Quick-Action Buttons Bar (Guaranteed playback without Error 153) */}
          <div className="p-3.5 rounded-xl bg-gradient-to-r from-stone-900 via-[#1C120C] to-stone-900 border border-[#8B5A2B]/50 text-amber-100 flex flex-wrap items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-2 text-xs font-serif text-stone-300">
              <Tv className="w-4 h-4 text-[#D4A373] shrink-0" />
              <span>Direct Uninterrupted Streams:</span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {selectedStream.fallbackStreamUrl && (
                <a
                  href={selectedStream.fallbackStreamUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#6B4423]/40 hover:bg-[#6B4423]/65 border border-[#8B5A2B]/70 text-[#F5D7B2] text-xs font-sans font-semibold transition-all hover:scale-102"
                  title="Watch high-definition broadcast directly on the official sanctuary streaming portal"
                >
                  <span>Official Sanctuary HD Channel</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}

              {selectedStream.youtubeLiveUrl && (
                <a
                  href={selectedStream.youtubeLiveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/25 hover:bg-red-600/40 border border-red-500/40 text-red-200 text-xs font-sans font-semibold transition-all hover:scale-102"
                  title="Watch official livestream directly on YouTube"
                >
                  <span>YouTube Live Channel</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* Under-Video Sanctuary Info Bar */}
          <div className="p-4 sm:p-5 rounded-xl bg-white border border-stone-200 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5 text-left">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] sm:text-xs font-bold font-cinzel uppercase tracking-widest text-amber-800">
                    {selectedStream.location}, {selectedStream.country} • {selectedStream.language}
                  </span>
                  {selectedStream.isAnticipatedMass && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-[10px] font-bold font-cinzel">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      <span>Anticipated Sunday Mass (Fulfills Sunday Obligation)</span>
                    </span>
                  )}
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-serif font-bold text-stone-900 leading-snug">
                  {selectedStream.name}
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 font-serif leading-relaxed text-left">
              {selectedStream.description}
            </p>

            {/* Schedule Callout */}
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200/80 flex items-start gap-2.5 text-xs font-serif text-stone-700 text-left">
              <Clock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-stone-900">Liturgical Mass Schedule: </span>
                {selectedStream.scheduleDescription}
              </div>
            </div>
          </div>

        </div>

        {/* Right Dock: Devotions, Mass Readings, and Spiritual Communion (4 cols) */}
        <div className={`space-y-4 ${isTheaterMode ? 'lg:col-span-12' : 'lg:col-span-4'}`}>
          
          {/* Side Tabs */}
          <div className="flex rounded-xl bg-stone-200/80 p-1 text-xs font-cinzel font-semibold">
            <button
              onClick={() => setActiveSideTab('communion')}
              className={`flex-1 py-1.5 px-2 rounded-lg transition-all cursor-pointer ${
                activeSideTab === 'communion'
                  ? 'bg-white text-stone-900 shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Spiritual Communion
            </button>
            <button
              onClick={() => setActiveSideTab('readings')}
              className={`flex-1 py-1.5 px-2 rounded-lg transition-all cursor-pointer ${
                activeSideTab === 'readings'
                  ? 'bg-white text-stone-900 shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Mass Readings
            </button>
            <button
              onClick={() => setActiveSideTab('candle')}
              className={`flex-1 py-1.5 px-2 rounded-lg transition-all cursor-pointer ${
                activeSideTab === 'candle'
                  ? 'bg-white text-stone-900 shadow-xs font-bold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Votive Candle
            </button>
          </div>

          {/* Tab 1: Spiritual Communion Prayer */}
          {activeSideTab === 'communion' && (
            <div className="p-5 rounded-xl bg-gradient-to-b from-amber-50/80 to-white border border-amber-200 shadow-xs space-y-4 text-left">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold font-cinzel text-amber-900 tracking-wider uppercase">
                    SAINT ALPHONSUS LIGUORI
                  </span>
                  <h4 className="font-serif text-base font-bold text-stone-900">
                    Act of Spiritual Communion
                  </h4>
                </div>

                <button
                  onClick={handleToggleSpiritualCommunionAudio}
                  className={`p-2 rounded-full border transition-all cursor-pointer ${
                    isPrayingSpiritualCommunion
                      ? 'bg-[#6B4423] border-[#5A381C] text-white shadow-xs'
                      : 'bg-white border-stone-300 text-stone-600 hover:text-[#6B4423]'
                  }`}
                  title="Listen to prayer spoken aloud"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs sm:text-sm font-serif italic text-stone-800 leading-relaxed whitespace-pre-line pl-3 border-l-2 border-amber-600">
                {spiritualCommunionPrayer}
              </div>

              <p className="text-[11px] text-stone-500 font-serif leading-snug">
                The Church grants rich spiritual graces to faithful who, unable to receive sacramentally, recite this prayer with deep longing for Christ's Real Presence.
              </p>
            </div>
          )}

          {/* Tab 2: Mass Readings of the Day */}
          {activeSideTab === 'readings' && (
            <div className="p-5 rounded-xl bg-white border border-stone-200 shadow-xs space-y-4 text-left max-h-[480px] overflow-y-auto">
              <div className="space-y-0.5 border-b border-stone-100 pb-2">
                <span className="text-[10px] font-bold font-cinzel text-amber-800 uppercase tracking-wider">
                  TODAY'S LITURGY OF THE WORD
                </span>
                <h4 className="font-serif text-base font-bold text-stone-900">
                  {currentReading?.liturgicalDay || 'Liturgical Readings'}
                </h4>
              </div>

              {currentReading ? (
                <div className="space-y-4 text-xs font-serif text-stone-700 leading-relaxed">
                  {/* First Reading */}
                  <div className="space-y-1">
                    <span className="font-bold font-cinzel text-[11px] text-stone-900 block">
                      First Reading: {currentReading.firstReading.citation}
                    </span>
                    <p className="line-clamp-4 text-stone-600">
                      {currentReading.firstReading.text}
                    </p>
                  </div>

                  {/* Responsorial Psalm */}
                  <div className="space-y-1 bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/50">
                    <span className="font-bold text-amber-950 block">
                      Psalm: {currentReading.responsorialPsalm.citation}
                    </span>
                    <p className="italic text-amber-900">
                      R. {currentReading.responsorialPsalm.antiphon}
                    </p>
                  </div>

                  {/* Gospel */}
                  <div className="space-y-1">
                    <span className="font-bold font-cinzel text-[11px] text-amber-900 block">
                      Holy Gospel: {currentReading.gospel.citation}
                    </span>
                    <p className="line-clamp-5 text-stone-800 font-medium">
                      {currentReading.gospel.text}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-stone-500 font-serif">
                  Follow along with the sacred scriptures proclaimed during Holy Mass.
                </p>
              )}
            </div>
          )}

          {/* Tab 3: Light a Votive Candle */}
          {activeSideTab === 'candle' && (
            <div className="p-5 rounded-xl bg-stone-900 text-stone-100 border border-amber-500/40 shadow-xs space-y-4 text-left">
              <div className="flex items-center gap-2">
                <Flame className={`w-5 h-5 ${isCandleLit ? 'text-amber-400 animate-pulse' : 'text-stone-400'}`} />
                <h4 className="font-cinzel text-sm font-bold text-amber-300">
                  Light a Votive Candle at the Altar
                </h4>
              </div>

              <p className="text-xs text-stone-300 font-serif leading-relaxed">
                Place your prayer intention before Jesus in the Holy Eucharist during this Mass. Your candle burns with unceasing prayer.
              </p>

              <form onSubmit={handleLightCandle} className="space-y-2">
                <textarea
                  value={candleIntention}
                  onChange={(e) => setCandleIntention(e.target.value)}
                  placeholder="Type your prayer petition or Thanksgiving intention here..."
                  rows={2}
                  className="w-full text-xs p-2.5 rounded-xl bg-stone-800 border border-stone-700 text-stone-100 focus:outline-none focus:border-amber-400 font-serif"
                />
                <button
                  type="submit"
                  disabled={!candleIntention.trim()}
                  className="w-full py-2 rounded-xl bg-gradient-to-r from-[#6B4423] to-[#4A2E1B] hover:from-[#7A4E2D] hover:to-[#5A381C] border border-[#8B5A2B]/60 disabled:opacity-40 text-amber-50 font-cinzel text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
                >
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  <span>Light Candle and Offer Petitions</span>
                </button>
              </form>

              {savedIntentions.length > 0 && (
                <div className="pt-2 border-t border-stone-800 space-y-1.5">
                  <span className="text-[10px] font-cinzel uppercase text-amber-400 font-bold block">
                    Your Burning Votive Petitions:
                  </span>
                  {savedIntentions.map((intent, i) => (
                    <div key={i} className="text-xs text-stone-300 font-serif italic pl-2 border-l border-amber-500">
                      "{intent}"
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>

      </div>

      {/* Worldwide Sanctuaries Catalog Selector */}
      <div className="space-y-4 pt-4 border-t border-stone-200">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5 text-left">
            <h3 className="font-cinzel text-lg sm:text-xl font-bold text-stone-900 tracking-wide flex items-center gap-2">
              <Globe className="w-5 h-5 text-amber-700" />
              <span>Worldwide Catholic Sanctuary Channels</span>
            </h3>
            <p className="text-xs text-stone-500 font-serif">
              Select any holy basilica or Marian shrine to switch the live stream.
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Filter by country or shrine..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-8 pr-3 py-2 rounded-xl bg-white border border-stone-300 focus:outline-none focus:border-amber-700 font-serif"
            />
            <Compass className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* Region Filter Chips */}
        <div className="flex flex-wrap items-center gap-2">
          {regions.map(r => (
            <button
              key={r.id}
              onClick={() => setSelectedRegion(r.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-cinzel transition-all cursor-pointer ${
                selectedRegion === r.id
                  ? 'bg-stone-900 text-amber-300 font-bold shadow-xs border border-amber-500/40'
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
                    ? 'bg-amber-50/80 border-amber-600 ring-2 ring-amber-500/30 shadow-md'
                    : 'bg-white hover:bg-stone-50/90 border-stone-200 shadow-2xs hover:shadow-sm'
                }`}
              >
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
                    <div className="flex items-center gap-1.5 text-[10px] font-bold font-cinzel text-amber-800 uppercase tracking-wider">
                      <MapPin className="w-2.5 h-2.5" />
                      <span>{stream.country}</span>
                    </div>

                    <h4 className="font-serif text-sm font-bold text-stone-900 group-hover:text-amber-900 transition-colors line-clamp-1">
                      {stream.name}
                    </h4>

                    <p className="text-[11px] text-stone-500 font-serif line-clamp-1">
                      {stream.sanctuary}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                  <span className="font-medium text-stone-700">{stream.language}</span>
                  <span className="inline-flex items-center gap-1 text-amber-800 font-cinzel font-semibold group-hover:translate-x-0.5 transition-transform">
                    <span>Watch Altar</span>
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
