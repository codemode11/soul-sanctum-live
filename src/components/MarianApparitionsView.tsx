import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Copy, 
  Check, 
  Volume2, 
  VolumeX, 
  Globe, 
  Calendar, 
  BookOpen, 
  Heart, 
  ShieldCheck, 
  Star,
  Quote,
  Feather,
  MapPin,
  Flame,
  Award,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { MARIAN_APPARITIONS, MarianApparition } from '../data/marianApparitions';
import { SacredReader } from '../utils/speech';
import { MedjugorjeMessagesView } from './MedjugorjeMessagesView';

export const MarianApparitionsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'apparitions' | 'medjugorje'>('apparitions');
  const [selectedCountry, setSelectedCountry] = useState<string>('all');
  const [selectedApproval, setSelectedApproval] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);

  // Dynamic font size state and scaling
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const fontSizes: Array<'normal' | 'large' | 'xlarge'> = ['normal', 'large', 'xlarge'];

  const increaseFontSize = () => {
    const currentIndex = fontSizes.indexOf(fontSize);
    if (currentIndex < fontSizes.length - 1) {
      setFontSize(fontSizes[currentIndex + 1]);
    }
  };

  const decreaseFontSize = () => {
    const currentIndex = fontSizes.indexOf(fontSize);
    if (currentIndex > 0) {
      setFontSize(fontSizes[currentIndex - 1]);
    }
  };

  const bodyTextClass =
    fontSize === 'normal'
      ? 'text-base sm:text-lg leading-relaxed'
      : fontSize === 'large'
      ? 'text-lg sm:text-xl leading-relaxed'
      : 'text-xl sm:text-2xl leading-relaxed';

  const quoteTextClass =
    fontSize === 'normal'
      ? 'text-lg sm:text-xl leading-relaxed'
      : fontSize === 'large'
      ? 'text-xl sm:text-2xl leading-relaxed'
      : 'text-2xl sm:text-3xl leading-relaxed';

  const sectionHeadingClass =
    fontSize === 'normal'
      ? 'text-sm sm:text-base'
      : fontSize === 'large'
      ? 'text-base sm:text-lg'
      : 'text-lg sm:text-xl';

  // Distinct countries
  const countries = ['all', ...Array.from(new Set(MARIAN_APPARITIONS.map(a => a.country)))];

  // Distinct approval statuses
  const approvalStatuses = ['all', ...Array.from(new Set(MARIAN_APPARITIONS.map(a => a.approvalStatus)))];

  // Filter apparitions
  const filteredApparitions = MARIAN_APPARITIONS.filter(app => {
    const matchCountry = selectedCountry === 'all' || app.country === selectedCountry;
    const matchApproval = selectedApproval === 'all' || app.approvalStatus === selectedApproval;
    const matchSearch = searchQuery === '' ||
      app.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.latinTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.visionaries.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.keyMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.miraculousSigns.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchCountry && matchApproval && matchSearch;
  });

  const handleToggleSpeak = (app: MarianApparition) => {
    if (playingId === app.id) {
      SacredReader.stop();
      setPlayingId(null);
    } else {
      SacredReader.stop();
      setPlayingId(app.id);
      const textToSpeak = `${app.title}, ${app.latinTitle}. Year: ${app.year}. Location: ${app.location}, ${app.country}. Visionaries: ${app.visionaries}. Feast Day: ${app.feastDay}. Summary: ${app.summary}. Key Message of Our Lady: ${app.keyMessage}. Miraculous Signs: ${app.miraculousSigns}. Devotional Practice: ${app.devotionalPractice}. Scripture Anchor: ${app.scriptureAnchor}.`;
      SacredReader.speak(textToSpeak, () => {
        setPlayingId(null);
      }, 'female');
    }
  };

  const handleCopy = (app: MarianApparition) => {
    const text = `${app.title.toUpperCase()} (${app.latinTitle})\nYear: ${app.year} | Location: ${app.location}, ${app.country}\nVisionaries: ${app.visionaries}\nFeast Day: ${app.feastDay} | Status: ${app.approvalStatus}\n\nSUMMARY:\n${app.summary}\n\nMESSAGE OF OUR LADY:\n"${app.keyMessage}"\n\nMIRACULOUS SIGNS:\n${app.miraculousSigns}\n\nDEVOTIONAL PRACTICE:\n${app.devotionalPractice}\n\nSCRIPTURE ANCHOR:\n${app.scriptureAnchor}\n\nVia Soul Sanctum`;
    navigator.clipboard.writeText(text);
    setCopiedId(app.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16 animate-fadeIn text-stone-100">
      
      {/* Marian Header Banner */}
      <div className="rounded-xl p-6 sm:p-8 bg-gradient-to-br from-blue-950 via-[#11192b] to-stone-950 border border-blue-500/35 shadow-2xl space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-400/30">
              <Star className="w-4 h-4" />
            </span>
            <span className="font-cinzel text-xs font-bold text-amber-300 tracking-wider uppercase">
              Sancta Maria, Regina Caeli • Major Marian Apparitions
            </span>
          </div>

          <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-blue-500/30">
            <button
              onClick={() => setActiveTab('apparitions')}
              className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold transition-all cursor-pointer ${
                activeTab === 'apparitions'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Major Apparitions ({MARIAN_APPARITIONS.length})
            </button>
            <button
              onClick={() => setActiveTab('medjugorje')}
              className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold transition-all cursor-pointer ${
                activeTab === 'medjugorje'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Medjugorje Messages
            </button>
          </div>
        </div>

        <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide">
          Major Marian Apparitions and Messages
        </h2>
        
        <p className="text-xs sm:text-sm text-stone-300 font-serif-sacred max-w-2xl leading-relaxed">
          "A great sign appeared in heaven: a woman clothed with the sun, with the moon under her feet." Explore Church-approved Marian apparitions across centuries and continents—from Guadalupe to Lourdes, Fátima, Akita, Kibeho, and beyond. Discover Our Lady's messages of prayer, peace, penance, and maternal protection.
        </p>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-blue-500/20">
          <div className="p-2.5 rounded-xl bg-black/30 border border-white/10 text-center">
            <span className="block font-cinzel text-lg font-bold text-amber-400">15</span>
            <span className="text-[10px] font-serif text-stone-400">Major Apparitions</span>
          </div>
          <div className="p-2.5 rounded-xl bg-black/30 border border-white/10 text-center">
            <span className="block font-cinzel text-lg font-bold text-amber-400">10</span>
            <span className="text-[10px] font-serif text-stone-400">Nations Represented</span>
          </div>
          <div className="p-2.5 rounded-xl bg-black/30 border border-white/10 text-center">
            <span className="block font-cinzel text-lg font-bold text-amber-400">40 A.D. – Present</span>
            <span className="text-[10px] font-serif text-stone-400">Historical Span</span>
          </div>
          <div className="p-2.5 rounded-xl bg-black/30 border border-white/10 text-center">
            <span className="block font-cinzel text-lg font-bold text-amber-400">100% Approved</span>
            <span className="text-[10px] font-serif text-stone-400">Vatican and Diocesan</span>
          </div>
        </div>
      </div>

      {/* RENDER ACTIVE TAB */}
      {activeTab === 'medjugorje' ? (
        <MedjugorjeMessagesView />
      ) : (
        <>
          {/* SEARCH and FILTERS WITH FONT SIZE STEPPER */}
          <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search apparitions (e.g. Guadalupe, Lourdes, Rosary, Tilma, Akita)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/40 border border-white/15 text-stone-200 text-xs placeholder:text-stone-500 focus:outline-hidden focus:border-amber-400"
                />
              </div>

              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="px-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-stone-200 text-xs font-serif focus:outline-hidden"
              >
                <option value="all">All Countries</option>
                {countries.filter(c => c !== 'all').map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <select
                value={selectedApproval}
                onChange={(e) => setSelectedApproval(e.target.value)}
                className="px-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-stone-200 text-xs font-serif focus:outline-hidden"
              >
                <option value="all">All Approval Statuses</option>
                {approvalStatuses.filter(a => a !== 'all').map(a => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            {/* Text Size Stepper */}
            <div className="flex items-center justify-between border-t border-white/10 pt-2.5 text-xs text-stone-300">
              <span className="font-serif text-stone-400">Text Size:</span>
              <div className="flex items-center gap-1 bg-stone-800/90 p-1 rounded-xl border border-stone-700">
                <button
                  onClick={decreaseFontSize}
                  disabled={fontSize === 'normal'}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold text-stone-300 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-all"
                  title="Decrease text size"
                >
                  A-
                </button>
                <button
                  onClick={() => setFontSize('normal')}
                  className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-all cursor-pointer ${
                    fontSize === 'normal' 
                      ? 'bg-amber-600 text-white shadow-xs font-bold' 
                      : 'text-stone-300 hover:text-white hover:bg-stone-700'
                  }`}
                  title="Default text size (100%)"
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize('large')}
                  className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-all cursor-pointer ${
                    fontSize === 'large' 
                      ? 'bg-amber-600 text-white shadow-xs font-bold' 
                      : 'text-stone-300 hover:text-white hover:bg-stone-700'
                  }`}
                  title="Large text size (125%)"
                >
                  A+
                </button>
                <button
                  onClick={() => setFontSize('xlarge')}
                  className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-all cursor-pointer ${
                    fontSize === 'xlarge' 
                      ? 'bg-amber-600 text-white shadow-xs font-bold' 
                      : 'text-stone-300 hover:text-white hover:bg-stone-700'
                  }`}
                  title="Extra large text size (155%)"
                >
                  A++
                </button>
                <button
                  onClick={increaseFontSize}
                  disabled={fontSize === 'xlarge'}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold text-amber-300 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-all"
                  title="Increase text size"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* LIST OF MARIAN APPARITIONS */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-1">
              <span className="font-cinzel text-xs font-bold text-amber-200 uppercase tracking-wider">
                Church-Approved Apparitions ({filteredApparitions.length} Found)
              </span>
              <span className="text-[11px] font-serif text-stone-400">
                Sorted Chronologically and Worldwide
              </span>
            </div>

            {filteredApparitions.map((app) => {
              const isPlaying = playingId === app.id;
              const isCopied = copiedId === app.id;
              const isExpanded = expandedCardId === app.id;

              return (
                <article
                  key={app.id}
                  id={app.id}
                  className="rounded-xl p-6 sm:p-7 bg-stone-900/90 border border-stone-800 hover:border-amber-500/40 transition-all shadow-xl space-y-4 relative overflow-hidden"
                >
                  {/* Card Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 border-b border-white/10 pb-4">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xl" title={app.country}>
                          {app.flagSymbol}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-bold uppercase tracking-wider font-cinzel border border-blue-400/30">
                          {app.year}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider font-cinzel border border-amber-400/30">
                          {app.approvalStatus}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold uppercase tracking-wider font-cinzel border border-emerald-400/30">
                          Feast: {app.feastDay}
                        </span>
                      </div>

                      <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white pt-1">
                        {app.title}
                      </h3>
                      <p className="text-xs font-serif italic text-amber-200/90">
                        {app.latinTitle} • <MapPin className="w-3 h-3 inline-block -mt-0.5 text-amber-400" /> {app.location}, {app.country}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleToggleSpeak(app)}
                        className={`p-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          isPlaying
                            ? 'bg-amber-600 text-white animate-pulse'
                            : 'bg-amber-900/60 hover:bg-amber-800 text-amber-100 border border-amber-700/60'
                        }`}
                        title="Listen to summary with human lector voice"
                        aria-label="Listen with human voice"
                      >
                        {isPlaying ? (
                          <VolumeX className="w-4 h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4 text-amber-200" />
                        )}
                      </button>

                      <button
                        onClick={() => handleCopy(app)}
                        className="p-2.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-200 border border-amber-800/40 transition-colors cursor-pointer"
                        title="Copy details to clipboard"
                        aria-label="Copy details"
                      >
                        {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Visionary Meta */}
                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex flex-col sm:flex-row justify-between gap-2 text-xs font-serif text-stone-300">
                    <div>
                      <span className="text-amber-400 font-bold">Visionary:</span> {app.visionaries}
                    </div>
                    <div>
                      <span className="text-amber-400 font-bold">Church Approval:</span> {app.approvalDate}
                    </div>
                  </div>

                  {/* Summary Text */}
                  <div className="p-4 rounded-xl bg-black/30 border border-white/10 space-y-2">
                    <p className={`font-serif text-stone-200 transition-all duration-200 ${bodyTextClass}`}>
                      {app.summary}
                    </p>
                  </div>

                  {/* Key Quote / Direct Words of Our Lady */}
                  <div className="p-5 rounded-xl bg-gradient-to-r from-blue-950/80 via-stone-950 to-blue-950/80 border-l-4 border-amber-400 space-y-2 relative">
                    <Quote className="w-6 h-6 text-amber-400/40 absolute top-3 right-3" />
                    <span className="font-cinzel text-xs sm:text-sm font-bold text-amber-300 uppercase tracking-wider block">
                      Words of the Blessed Virgin Mary
                    </span>
                    <p className={`font-serif italic text-amber-100 font-medium transition-all duration-200 ${quoteTextClass}`}>
                      {app.keyMessage}
                    </p>
                  </div>

                  {/* Grid: Miraculous Signs and Devotional Practice */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                    <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                      <div className={`flex items-center gap-2 text-amber-300 font-bold font-cinzel ${sectionHeadingClass}`}>
                        <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0" />
                        <span>Miraculous Signs and Wonders</span>
                      </div>
                      <p className={`font-serif text-stone-200 transition-all duration-200 ${bodyTextClass}`}>
                        {app.miraculousSigns}
                      </p>
                    </div>

                    <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10 space-y-2">
                      <div className={`flex items-center gap-2 text-blue-300 font-bold font-cinzel ${sectionHeadingClass}`}>
                        <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 shrink-0" />
                        <span>Devotional Practice and Sacramentals</span>
                      </div>
                      <p className={`font-serif text-stone-200 transition-all duration-200 ${bodyTextClass}`}>
                        {app.devotionalPractice}
                      </p>
                    </div>
                  </div>

                  {/* Scripture Anchor and Tags */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-white/10">
                    <div className={`flex items-start sm:items-center gap-2 font-serif italic text-amber-200 transition-all duration-200 ${bodyTextClass}`}>
                      <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 shrink-0 mt-1 sm:mt-0" />
                      <span>{app.scriptureAnchor}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      {app.tags.map(tag => (
                        <span
                          key={tag}
                          onClick={() => setSearchQuery(tag)}
                          className="text-[10px] font-serif px-2 py-0.5 rounded-md bg-white/5 text-stone-300 hover:bg-white/10 border border-white/10 cursor-pointer transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </>
      )}

    </div>
  );
};
