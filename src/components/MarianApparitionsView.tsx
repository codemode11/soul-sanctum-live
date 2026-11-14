import React, { useState } from 'react';
import { 
  Search, 
  Copy, 
  Check, 
  Volume2, 
  VolumeX, 
  Star,
  MapPin
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
    <div className="max-w-4xl mx-auto p-3 sm:p-6 md:p-8 rounded-xl bg-[#F6F2EA]/85 backdrop-blur-xl backdrop-saturate-150 border border-[#DFD6C7] ring-1 ring-inset ring-white/60 shadow-[0_8px_32px_0_rgba(51,65,85,0.12)] space-y-6 mb-12 animate-fadeIn text-slate-900">
      
      {/* Marian Header Banner — Slate Gray & Bleached Sand (matching Eucharistic Miracles) */}
      <div className="sanctum-top-banner px-5 pt-4 pb-4 sm:px-6 min-h-[164px] rounded-xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-[#F9F6F0] border border-slate-700/80 shadow-md space-y-4 relative overflow-hidden">
        <div className="pointer-events-none absolute -right-12 -bottom-12 w-72 h-44 rounded-full bg-[#EAE2D3]/15 blur-3xl" />
        
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-slate-800/90 text-[#EAE2D3] border border-slate-600/70">
              <Star className="w-4 h-4" />
            </span>
            <span className="font-cinzel text-xs font-bold text-[#DFD5C3] tracking-wider uppercase">
              Sancta Maria, Regina Caeli • Major Marian Apparitions
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950/50 p-1 rounded-xl border border-slate-600/60">
            <button
              onClick={() => setActiveTab('apparitions')}
              className={`px-3 py-1.5 rounded-lg text-xs font-cinzel transition-all cursor-pointer ${
                activeTab === 'apparitions'
                  ? 'bg-[#F4EFE6] text-slate-900 shadow-sm font-bold border border-[#DFD5C3]'
                  : 'text-[#EAE2D3] hover:text-white hover:bg-slate-700/70 font-semibold'
              }`}
            >
              Major Apparitions ({MARIAN_APPARITIONS.length})
            </button>
            <button
              onClick={() => setActiveTab('medjugorje')}
              className={`px-3 py-1.5 rounded-lg text-xs font-cinzel transition-all cursor-pointer ${
                activeTab === 'medjugorje'
                  ? 'bg-[#F4EFE6] text-slate-900 shadow-sm font-bold border border-[#DFD5C3]'
                  : 'text-[#EAE2D3] hover:text-white hover:bg-slate-700/70 font-semibold'
              }`}
            >
              Medjugorje Messages
            </button>
          </div>
        </div>

        <h2 className="relative z-10 font-cinzel text-2xl sm:text-3xl font-bold text-[#FBF9F5] tracking-wide">
          Major Marian Apparitions and Messages
        </h2>
        
        <p className="relative z-10 text-xs sm:text-sm text-[#EAE2D3] font-serif-sacred max-w-2xl leading-relaxed">
          &ldquo;A great sign appeared in heaven: a woman clothed with the sun, with the moon under her feet.&rdquo; Explore Church-approved Marian apparitions across centuries and continents—from Guadalupe to Lourdes, Fátima, Akita, Kibeho, and beyond. Discover Our Lady&apos;s messages of prayer, peace, penance, and maternal protection.
        </p>

        {/* Quick Stats Bar */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-slate-600/60">
          <div className="p-2.5 rounded-xl bg-slate-950/35 border border-slate-600/50 text-center">
            <span className="block font-cinzel text-lg font-bold text-[#FBF9F5]">15</span>
            <span className="text-[10px] font-serif text-[#DFD5C3]">Major Apparitions</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/35 border border-slate-600/50 text-center">
            <span className="block font-cinzel text-lg font-bold text-[#FBF9F5]">10</span>
            <span className="text-[10px] font-serif text-[#DFD5C3]">Nations Represented</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/35 border border-slate-600/50 text-center">
            <span className="block font-cinzel text-lg font-bold text-[#FBF9F5]">40 A.D. – Present</span>
            <span className="text-[10px] font-serif text-[#DFD5C3]">Historical Span</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-950/35 border border-slate-600/50 text-center">
            <span className="block font-cinzel text-lg font-bold text-[#FBF9F5]">100% Approved</span>
            <span className="text-[10px] font-serif text-[#DFD5C3]">Vatican and Diocesan</span>
          </div>
        </div>
      </div>

      {/* RENDER ACTIVE TAB */}
      {activeTab === 'medjugorje' ? (
        <MedjugorjeMessagesView />
      ) : (
        <>
          {/* SEARCH and FILTERS WITH FONT SIZE STEPPER */}
          <div className="p-4 sm:p-5 rounded-xl bg-[#F4EFE6]/90 backdrop-blur-md border border-[#D8CFC0] shadow-2xs space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1 min-w-0">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search apparitions (e.g. Guadalupe, Lourdes, Rosary, Tilma, Akita)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#FBF9F5] border border-[#C8BBA6] text-slate-900 text-xs placeholder:text-slate-500 focus:outline-hidden focus:border-slate-700"
                />
              </div>

              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#FBF9F5] border border-[#C8BBA6] text-slate-900 text-xs font-serif focus:outline-hidden focus:border-slate-700 cursor-pointer"
              >
                <option value="all">All Countries</option>
                {countries.filter(c => c !== 'all').map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>

              <select
                value={selectedApproval}
                onChange={(e) => setSelectedApproval(e.target.value)}
                className="px-3 py-2 rounded-xl bg-[#FBF9F5] border border-[#C8BBA6] text-slate-900 text-xs font-serif focus:outline-hidden focus:border-slate-700 cursor-pointer"
              >
                <option value="all">All Approval Statuses</option>
                {approvalStatuses.filter(a => a !== 'all').map(a => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>

            {/* Text Size Stepper */}
            <div className="flex items-center justify-between border-t border-[#D8CFC0] pt-2.5 text-xs text-slate-700">
              <span className="font-cinzel font-bold uppercase tracking-wider text-[11px] text-slate-700">Text Size:</span>
              <div className="flex items-center gap-1 bg-[#EAE2D3] p-1 rounded-xl border border-[#C8BBA6]">
                <button
                  onClick={decreaseFontSize}
                  disabled={fontSize === 'normal'}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-[#FBF9F5] disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-all"
                  title="Decrease text size"
                >
                  A-
                </button>
                <button
                  onClick={() => setFontSize('normal')}
                  className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-all cursor-pointer ${
                    fontSize === 'normal' 
                      ? 'bg-slate-800 text-[#F9F6F0] shadow-xs font-bold' 
                      : 'text-slate-700 hover:text-slate-900 hover:bg-[#FBF9F5]'
                  }`}
                  title="Default text size (100%)"
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize('large')}
                  className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-all cursor-pointer ${
                    fontSize === 'large' 
                      ? 'bg-slate-800 text-[#F9F6F0] shadow-xs font-bold' 
                      : 'text-slate-700 hover:text-slate-900 hover:bg-[#FBF9F5]'
                  }`}
                  title="Large text size (125%)"
                >
                  A+
                </button>
                <button
                  onClick={() => setFontSize('xlarge')}
                  className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-all cursor-pointer ${
                    fontSize === 'xlarge' 
                      ? 'bg-slate-800 text-[#F9F6F0] shadow-xs font-bold' 
                      : 'text-slate-700 hover:text-slate-900 hover:bg-[#FBF9F5]'
                  }`}
                  title="Extra large text size (155%)"
                >
                  A++
                </button>
                <button
                  onClick={increaseFontSize}
                  disabled={fontSize === 'xlarge'}
                  className="w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold text-slate-800 hover:text-slate-950 hover:bg-[#FBF9F5] disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-all"
                  title="Increase text size"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* LIST OF MARIAN APPARITIONS */}
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 px-1">
              <span className="font-cinzel text-xs font-bold text-slate-800 uppercase tracking-wider">
                Church-Approved Apparitions ({filteredApparitions.length} Found)
              </span>
              <span className="text-[11px] font-serif text-slate-600">
                Sorted Chronologically and Worldwide
              </span>
            </div>

            {filteredApparitions.map((app) => {
              const isPlaying = playingId === app.id;
              const isCopied = copiedId === app.id;

              return (
                <article
                  key={app.id}
                  id={app.id}
                  className="rounded-xl p-6 sm:p-7 bg-gradient-to-br from-[#FBF9F5] via-[#F6F2EA] to-[#ECE5D5] border border-[#D8CFC0] hover:border-slate-500 transition-all shadow-[0_3px_14px_rgba(51,65,85,0.06)] hover:shadow-[0_8px_24px_rgba(51,65,85,0.12)] space-y-4 relative overflow-hidden"
                >
                  {/* Card Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#D8CFC0] pb-4">
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xl" title={app.country}>
                          {app.flagSymbol}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-[#F9F6F0] text-[10px] font-bold uppercase tracking-wider font-cinzel border border-slate-900 shadow-2xs">
                          {app.year}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#EAE2D3] text-slate-900 text-[10px] font-bold uppercase tracking-wider font-cinzel border border-[#C8BBA6] shadow-2xs">
                          {app.approvalStatus}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-[#F4EFE6] text-slate-700 text-[10px] font-bold uppercase tracking-wider font-cinzel border border-[#D8CFC0] shadow-2xs">
                          Feast: {app.feastDay}
                        </span>
                      </div>

                      <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-slate-900 pt-1">
                        {app.title}
                      </h3>
                      <p className="text-xs font-serif italic text-slate-600">
                        {app.latinTitle} • <MapPin className="w-3 h-3 inline-block -mt-0.5 text-slate-700" /> {app.location}, {app.country}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleToggleSpeak(app)}
                        className={`p-2.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                          isPlaying
                            ? 'bg-slate-800 text-[#F9F6F0] border border-slate-900 animate-pulse'
                            : 'bg-[#F4EFE6] hover:bg-[#EAE2D3] text-slate-800 border border-[#C8BBA6]'
                        }`}
                        title="Listen to summary with human lector voice"
                        aria-label="Listen with human voice"
                      >
                        {isPlaying ? (
                          <VolumeX className="w-4 h-4" />
                        ) : (
                          <Volume2 className="w-4 h-4 text-slate-700" />
                        )}
                      </button>

                      <button
                        onClick={() => handleCopy(app)}
                        className="p-2.5 rounded-lg bg-[#F4EFE6] hover:bg-[#EAE2D3] text-slate-800 border border-[#C8BBA6] transition-colors cursor-pointer"
                        title="Copy details to clipboard"
                        aria-label="Copy details"
                      >
                        {isCopied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Visionary Meta */}
                  <div className="p-3 rounded-xl bg-[#F4EFE6] border border-[#D8CFC0] flex flex-col sm:flex-row justify-between gap-2 text-xs font-serif text-slate-700">
                    <div>
                      <span className="text-slate-900 font-bold">Visionary:</span> {app.visionaries}
                    </div>
                    <div>
                      <span className="text-slate-900 font-bold">Church Approval:</span> {app.approvalDate}
                    </div>
                  </div>

                  {/* Summary Text */}
                  <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#D8CFC0] space-y-2">
                    <p className={`font-serif text-slate-800 transition-all duration-200 ${bodyTextClass}`}>
                      {app.summary}
                    </p>
                  </div>

                  {/* Key Quote / Direct Words of Our Lady */}
                  <div className="p-5 rounded-xl bg-[#EFE9DC]/90 border border-[#D8CFC0] relative">
                    <div className="pointer-events-none absolute inset-0 m-0" style={{ margin: 0 }}>
                      <span className="pointer-events-none absolute top-0 left-0 w-4 h-4 rounded-tl-xl border-t-[3px] border-l-[3px] border-slate-700 m-0" style={{ margin: 0 }} />
                      <span className="pointer-events-none absolute top-0 right-0 w-4 h-4 rounded-tr-xl border-t-[3px] border-r-[3px] border-slate-700 m-0" style={{ margin: 0 }} />
                      <span className="pointer-events-none absolute bottom-0 left-0 w-4 h-4 rounded-bl-xl border-b-[3px] border-l-[3px] border-slate-700 m-0" style={{ margin: 0 }} />
                      <span className="pointer-events-none absolute bottom-0 right-0 w-4 h-4 rounded-br-xl border-b-[3px] border-r-[3px] border-slate-700 m-0" style={{ margin: 0 }} />
                    </div>
                    <div className="space-y-2">
                      <span className="font-cinzel text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wider block">
                        Words of the Blessed Virgin Mary
                      </span>
                      <p className={`font-serif italic text-slate-900 font-medium transition-all duration-200 ${quoteTextClass}`}>
                        {app.keyMessage}
                      </p>
                    </div>
                  </div>

                  {/* Grid: Miraculous Signs and Devotional Practice */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                    <div className="p-4 sm:p-5 rounded-xl bg-[#FBF9F5] border border-[#D8CFC0] space-y-2">
                      <div className={`flex items-center text-slate-900 font-bold font-cinzel ${sectionHeadingClass}`}>
                        <span>Miraculous Signs and Wonders</span>
                      </div>
                      <p className={`font-serif text-slate-700 transition-all duration-200 ${bodyTextClass}`}>
                        {app.miraculousSigns}
                      </p>
                    </div>

                    <div className="p-4 sm:p-5 rounded-xl bg-[#FBF9F5] border border-[#D8CFC0] space-y-2">
                      <div className={`flex items-center text-slate-900 font-bold font-cinzel ${sectionHeadingClass}`}>
                        <span>Devotional Practice and Sacramentals</span>
                      </div>
                      <p className={`font-serif text-slate-700 transition-all duration-200 ${bodyTextClass}`}>
                        {app.devotionalPractice}
                      </p>
                    </div>
                  </div>

                  {/* Scripture Anchor and Tags */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-3 border-t border-[#D8CFC0]">
                    <div className={`flex items-start sm:items-center font-serif italic text-slate-700 transition-all duration-200 ${bodyTextClass}`}>
                      <span>{app.scriptureAnchor}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      {app.tags.map(tag => (
                        <span
                          key={tag}
                          onClick={() => setSearchQuery(tag)}
                          className="text-[10px] font-serif px-2 py-0.5 rounded-md bg-[#F4EFE6] text-slate-700 hover:bg-[#EAE2D3] border border-[#D8CFC0] cursor-pointer transition-colors"
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
