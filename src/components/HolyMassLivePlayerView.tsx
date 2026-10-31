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
    <div className="max-w-5xl mx-auto pt-0 pb-20 space-y-6">
      
      {/* 1. Top Masthead & Active Sanctuary Stage Card */}
      <div className="rounded-xl overflow-hidden bg-gradient-to-b from-stone-900 via-[#1A110B] to-stone-950 border border-amber-500/35 shadow-2xl text-stone-100">
        
        {/* Top Header Bar */}
        <div className="p-5 sm:p-7 border-b border-amber-500/25 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/30 border border-red-500/50 text-red-200 text-[11px] font-cinzel font-bold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
              <span>Worldwide Catholic Livestream Altar</span>
            </div>

            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide">
              Holy Mass Live
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 font-serif leading-relaxed">
              Unite in the Holy Sacrifice of the Mass celebrated in real-time from Saint Peter&apos;s Basilica in the Vatican, <strong>EWTN Live Mass &amp; Devotions</strong>, the Grotto of Lourdes, Fátima, the Holy Sepulchre in Jerusalem, Basilica Minore del Santo Niño de Cebú, and sanctuaries worldwide.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-center shrink-0">
            <button
              onClick={() => setStreamKey(Date.now())}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-stone-800/90 hover:bg-stone-700 border border-stone-600 text-stone-200 text-xs font-sans font-medium transition-all cursor-pointer"
              title="Reload video stream"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              <span>Reload Stream</span>
            </button>

            <button
              onClick={handleShareStream}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#6B4423]/55 hover:bg-[#6B4423]/80 border border-[#8B5A2B]/80 text-[#F5D7B2] text-xs font-sans font-semibold transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied' : 'Share Altar'}</span>
            </button>
          </div>
        </div>

        {/* Quick-Select Featured Livestreams Strip (Vatican, EWTN Mass, Santo Niño Cebu, Lourdes, Fátima) */}
        <div className="px-5 py-3 bg-[#150D08] border-b border-amber-500/25 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-cinzel font-bold uppercase tracking-wider text-amber-300 mr-1">
            Featured Live Altars:
          </span>
          {[
            { id: 'vatican-st-peters-live', label: "St. Peter's Basilica (Vatican)" },
            { id: 'ewtn-our-lady-angels-chapel', label: 'EWTN Live Mass & Devotions' },
            { id: 'santo-nino-cebu-cathedral', label: 'Santo Niño de Cebú' },
            { id: 'lourdes-grotto-live', label: 'Lourdes Grotto' },
            { id: 'fatima-capelinha-live', label: 'Fátima Capelinha' },
            { id: 'national-shrine-dc-anticipated', label: 'National Shrine (D.C.)' }
          ].map((feat) => {
            const streamObj = HOLY_MASS_LIVESTREAMS.find((s) => s.id === feat.id);
            if (!streamObj) return null;
            const isActive = selectedStream.id === feat.id;
            return (
              <button
                key={feat.id}
                type="button"
                onClick={() => {
                  setSelectedStream(streamObj);
                  setStreamKey(Date.now());
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-[#6B4423] text-amber-50 border-amber-400/70 shadow-sm'
                    : 'bg-stone-900/90 hover:bg-stone-800 text-stone-200 border-stone-700'
                }`}
              >
                {feat.label}
              </button>
            );
          })}
        </div>

        {/* Full-Width 16:9 Livestream Video Player */}
        <div className="relative aspect-video w-full bg-black border-b border-amber-500/30">
          <iframe
            key={`${selectedStream.id}-${streamKey}`}
            src={selectedStream.videoEmbedUrl}
            title={selectedStream.name}
            className="w-full h-full object-cover border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />

          {/* Top-Left Live Sanctuary Badge */}
          <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2 pointer-events-none z-10">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-600/90 text-white font-sans text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              LIVE ALTAR
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
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#6B4423] hover:bg-[#7D502A] border border-[#9E6B3B] text-amber-50 text-xs font-sans font-semibold transition-all shadow-md"
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
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-red-700/80 hover:bg-red-600 border border-red-400/50 text-white text-xs font-sans font-semibold transition-all shadow-md"
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
                <strong className="text-amber-200">Liturgical Mass Schedule: </strong>
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

      {/* 2. Liturgical Companion & Altar Devotions Card (Full-Width Spacious Layout) */}
      <div className="rounded-xl bg-white/85 backdrop-blur-xl border border-stone-200/90 shadow-lg p-5 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3.5">
          <div className="text-left">
            <span className="text-[10px] font-cinzel font-bold uppercase tracking-widest text-amber-900 block">
              Accompanying Mass Devotions
            </span>
            <h3 className="font-cinzel text-lg sm:text-xl font-bold text-stone-900">
              Spiritual Communion, Today&apos;s Readings &amp; Votive Altar
            </h3>
          </div>

          {/* 3-Tab Switcher */}
          <div className="flex rounded-xl bg-stone-200/80 p-1 text-xs font-cinzel font-semibold shrink-0">
            <button
              onClick={() => setActiveSideTab('communion')}
              className={`py-2 px-3.5 rounded-lg transition-all cursor-pointer ${
                activeSideTab === 'communion'
                  ? 'bg-[#6B4423] text-amber-50 shadow-xs font-bold'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              Spiritual Communion
            </button>
            <button
              onClick={() => setActiveSideTab('readings')}
              className={`py-2 px-3.5 rounded-lg transition-all cursor-pointer ${
                activeSideTab === 'readings'
                  ? 'bg-[#6B4423] text-amber-50 shadow-xs font-bold'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              Today&apos;s Readings
            </button>
            <button
              onClick={() => setActiveSideTab('candle')}
              className={`py-2 px-3.5 rounded-lg transition-all cursor-pointer ${
                activeSideTab === 'candle'
                  ? 'bg-[#6B4423] text-amber-50 shadow-xs font-bold'
                  : 'text-stone-700 hover:text-stone-900'
              }`}
            >
              Votive Candle
            </button>
          </div>
        </div>

        {/* Tab 1: Spiritual Communion Prayer */}
        {activeSideTab === 'communion' && (
          <div className="p-5 sm:p-6 rounded-xl bg-gradient-to-br from-[#FAF6EE] to-white border border-amber-200/80 space-y-4 text-left">
            <div className="flex items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold font-cinzel text-amber-900 tracking-wider uppercase block">
                  Saint Alphonsus Liguori
                </span>
                <h4 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
                  Act of Spiritual Communion
                </h4>
              </div>

              <button
                onClick={handleToggleSpiritualCommunionAudio}
                className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
                  isPrayingSpiritualCommunion
                    ? 'bg-[#6B4423] border-[#5A381C] text-white shadow-xs'
                    : 'bg-white border-stone-300 text-stone-700 hover:text-[#6B4423]'
                }`}
                title="Listen to prayer spoken aloud"
              >
                <Volume2 className="w-4 h-4" />
                <span>{isPrayingSpiritualCommunion ? 'Stop Audio' : 'Listen to Prayer'}</span>
              </button>
            </div>

            <div className="text-base sm:text-lg font-serif italic text-stone-900 leading-relaxed whitespace-pre-line pl-4 border-l-3 border-amber-700">
              {spiritualCommunionPrayer}
            </div>

            <p className="text-xs sm:text-sm text-stone-600 font-serif leading-relaxed pt-2 border-t border-amber-200/60">
              The Church grants rich spiritual graces to the faithful who, unable to receive Our Lord sacramentally, recite this prayer with deep faith and longing for Christ&apos;s Real Presence in the Most Holy Eucharist.
            </p>
          </div>
        )}

        {/* Tab 2: Mass Readings of the Day */}
        {activeSideTab === 'readings' && (
          <div className="p-5 sm:p-6 rounded-xl bg-white border border-stone-200 space-y-4 text-left">
            <div className="border-b border-stone-100 pb-3">
              <span className="text-xs font-bold font-cinzel text-amber-800 uppercase tracking-wider block">
                Today&apos;s Liturgy of the Word
              </span>
              <h4 className="font-serif text-lg sm:text-xl font-bold text-stone-900">
                {currentReading?.liturgicalDay || 'Daily Mass Readings'}
              </h4>
            </div>

            {currentReading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-serif text-stone-800 leading-relaxed">
                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200/80 space-y-1.5">
                  <span className="font-bold font-cinzel text-xs text-stone-900 block uppercase">
                    First Reading • {currentReading.firstReading.citation}
                  </span>
                  <p className="line-clamp-6 text-stone-700 text-xs sm:text-sm">
                    {currentReading.firstReading.text}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/70 space-y-1.5">
                  <span className="font-bold font-cinzel text-xs text-amber-950 block uppercase">
                    Responsorial Psalm • {currentReading.responsorialPsalm.citation}
                  </span>
                  <p className="italic font-semibold text-amber-950 text-xs sm:text-sm">
                    R. {currentReading.responsorialPsalm.antiphon}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200/80 space-y-1.5">
                  <span className="font-bold font-cinzel text-xs text-amber-900 block uppercase">
                    Holy Gospel • {currentReading.gospel.citation}
                  </span>
                  <p className="line-clamp-6 text-stone-800 font-medium text-xs sm:text-sm">
                    {currentReading.gospel.text}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-stone-600 font-serif">
                Follow along with the sacred scriptures proclaimed during Holy Mass.
              </p>
            )}
          </div>
        )}

        {/* Tab 3: Light a Votive Candle */}
        {activeSideTab === 'candle' && (
          <div className="p-5 sm:p-6 rounded-xl bg-stone-900 text-stone-100 border border-amber-500/40 space-y-4 text-left">
            <div className="flex items-center gap-2.5">
              <Flame className={`w-5 h-5 ${isCandleLit ? 'text-amber-400 animate-pulse' : 'text-stone-400'}`} />
              <h4 className="font-cinzel text-base sm:text-lg font-bold text-amber-300">
                Light a Votive Candle at the Altar
              </h4>
            </div>

            <p className="text-xs sm:text-sm text-stone-300 font-serif leading-relaxed">
              Place your prayer intention before Jesus in the Holy Eucharist during this Mass. Your candle burns with unceasing prayer.
            </p>

            <form onSubmit={handleLightCandle} className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={candleIntention}
                onChange={(e) => setCandleIntention(e.target.value)}
                placeholder="Type your prayer petition or Thanksgiving intention here..."
                className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-stone-100 focus:outline-none focus:border-amber-400 font-serif"
              />
              <button
                type="submit"
                disabled={!candleIntention.trim()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#6B4423] to-[#4A2E1B] hover:from-[#7A4E2D] hover:to-[#5A381C] border border-[#8B5A2B]/70 disabled:opacity-40 text-amber-50 font-cinzel text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shrink-0"
              >
                <Flame className="w-4 h-4 fill-current" />
                <span>Light Candle &amp; Offer Petition</span>
              </button>
            </form>

            {savedIntentions.length > 0 && (
              <div className="pt-3 border-t border-stone-800 space-y-1.5">
                <span className="text-[11px] font-cinzel uppercase text-amber-400 font-bold block">
                  Your Burning Votive Petitions:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {savedIntentions.map((intent, i) => (
                    <div key={i} className="text-xs text-stone-200 font-serif italic pl-2.5 py-1 border-l-2 border-amber-500 bg-black/30 rounded-r-lg">
                      &ldquo;{intent}&rdquo;
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. Worldwide Sanctuaries Catalog Selector */}
      <div className="rounded-xl bg-white/85 backdrop-blur-xl border border-stone-200/90 shadow-lg p-5 sm:p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
          <div className="space-y-0.5 text-left">
            <h3 className="font-cinzel text-lg sm:text-xl font-bold text-stone-900 tracking-wide flex items-center gap-2">
              <Globe className="w-5 h-5 text-amber-800" />
              <span>Worldwide Catholic Sanctuary Channels ({filteredStreams.length})</span>
            </h3>
            <p className="text-xs text-stone-600 font-serif">
              Select any papal basilica, Marian shrine, or cathedral below to switch the live altar broadcast.
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

        {/* Region Filter Chips */}
        <div className="flex flex-wrap items-center gap-2">
          {regions.map(r => (
            <button
              key={r.id}
              onClick={() => setSelectedRegion(r.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-cinzel transition-all cursor-pointer ${
                selectedRegion === r.id
                  ? 'bg-[#6B4423] text-amber-50 font-bold shadow-xs border border-[#8B5A2B]'
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
                    ? 'bg-amber-50/95 border-[#8B5A2B] ring-2 ring-[#8B5A2B]/35 shadow-md'
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
                  <span className="inline-flex items-center gap-1 text-[#6B4423] font-cinzel font-bold group-hover:translate-x-0.5 transition-transform">
                    <span>{isSelected ? 'Playing Now' : 'Watch Altar'}</span>
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
