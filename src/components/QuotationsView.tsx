import React, { useState, useRef, useEffect } from 'react';
import { Search, Volume2, VolumeX, Copy, Check, ChevronDown, Settings, X } from 'lucide-react';
import {
  QUOTATION_SECTIONS,
  SACRED_QUOTATIONS_DATABASE,
  QuotationSectionId,
  SacredQuotation
} from '../data/quotations';
import { SacredReader } from '../utils/speech';

export const QuotationsView: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<QuotationSectionId | 'all'>('all');
  const [isTopSettingsOpen, setIsTopSettingsOpen] = useState(false);
  const [isTopicDropdownOpen, setIsTopicDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsTopicDropdownOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsTopicDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleCopy = (item: SacredQuotation) => {
    const prefix = item.subHeading ? `${item.subHeading}\n` : '';
    const base = item.attribution
      ? `${prefix}${item.text}\n${item.attribution}`
      : `${prefix}${item.text}`;
    const formatted = item.postscript ? `${base}\n${item.postscript}` : base;
    navigator.clipboard.writeText(formatted);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleToggleSpeak = (item: SacredQuotation) => {
    if (speakingId === item.id) {
      SacredReader.stop();
      setSpeakingId(null);
    } else {
      const prefix = item.subHeading ? `${item.subHeading}. ` : '';
      const base = item.attribution
        ? `${prefix}${item.text}. ${item.attribution}.`
        : `${prefix}${item.text}`;
      const speech = item.postscript ? `${base} ${item.postscript}` : base;
      SacredReader.speak(speech, () => setSpeakingId(null));
      setSpeakingId(item.id);
    }
  };

  const visibleSections = QUOTATION_SECTIONS.filter(
    sec => selectedSection === 'all' || sec.id === selectedSection
  );

  const selectedSectionObj =
    selectedSection === 'all'
      ? null
      : QUOTATION_SECTIONS.find(sec => sec.id === selectedSection) || null;

  const selectedSectionCount =
    selectedSection === 'all'
      ? SACRED_QUOTATIONS_DATABASE.length
      : SACRED_QUOTATIONS_DATABASE.filter(q => q.sectionId === selectedSection).length;

  return (
    <div className="max-w-5xl mx-auto p-3 sm:p-6 md:p-8 rounded-xl bg-white/45 backdrop-blur-xl backdrop-saturate-150 border border-white/60 ring-1 ring-inset ring-white/40 shadow-[0_8px_32px_0_rgba(120,90,50,0.12)] space-y-6 mb-12 animate-fadeIn">
      {/* Header & Collapsible Settings Container (Dark Brown with Doctors of the Church Gradient) */}
      <div className="bg-white/55 backdrop-blur-xl backdrop-saturate-150 rounded-xl shadow-xs border border-white/70 ring-1 ring-inset ring-white/40 relative z-30">
        {/* Main Banner */}
        <div
          className={`sanctum-top-banner relative px-5 pt-4 pb-4 sm:px-6 min-h-[212px] sm:min-h-[248px] bg-[#1C120C] text-stone-100 flex flex-col justify-between ${
            isTopSettingsOpen ? 'rounded-t-xl' : 'rounded-xl'
          }`}
        >
          {/* Overflow-clipped Backdrop so Dropdown Can Extend Outside Banner */}
          <div
            className={`pointer-events-none select-none absolute inset-0 overflow-hidden ${
              isTopSettingsOpen ? 'rounded-t-xl' : 'rounded-xl'
            }`}
            aria-hidden="true"
          >
            {/* Right-Side Doctors of the Church Painting */}
            <div className="absolute inset-y-0 right-0 w-full sm:w-auto sm:aspect-[3/2] overflow-hidden">
              <img
                src="/assets/aistudio/image_20261124_141957_051994f8.jpg"
                alt="Doctors of the Church"
                decoding="async"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-[62%_22%] sm:object-center brightness-[1.03] contrast-[1.04]"
              />
              {/* Seamless Left-Edge Gradient Transition from Dark Brown (#1C120C) into Doctors of the Church */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-[30%] bg-gradient-to-r from-[#1C120C] via-[#1C120C]/75 to-transparent" />
              {/* Subtle Right, Top, and Bottom Dark Brown Feathering */}
              <div className="pointer-events-none absolute inset-y-0 right-0 w-[8%] bg-gradient-to-l from-[#1C120C]/65 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-5 bg-gradient-to-b from-[#1C120C]/60 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[#1C120C]/70 to-transparent" />
            </div>

            {/* Mobile Readability Gradient Behind Left Title & Controls */}
            <div className="sm:hidden pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#1C120C_0%,#1C120C_28%,rgba(28,18,12,0.88)_48%,rgba(28,18,12,0.36)_70%,rgba(28,18,12,0.12)_100%)]" />
          </div>

          <div className="relative z-10 flex flex-col justify-between flex-1 max-w-[82%] sm:max-w-[48%] gap-4">
            <div className="space-y-1.5 my-auto">
              <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-amber-300 block drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                Doctors &amp; Saints of the Church
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-normal text-amber-100 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                Quotations
              </h2>
              <p className="text-xs sm:text-sm text-stone-200 font-serif font-medium leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">
                Enduring spiritual wisdom from the Doctors of the Church, Saints, and Supreme Pontiffs.
              </p>
            </div>

            {/* Settings Toggle Kept on Left so Doctors of the Church Artwork Stays Unobstructed */}
            <div className="flex items-center justify-start pt-1 shrink-0">
              <button
                type="button"
                onClick={() => setIsTopSettingsOpen(prev => !prev)}
                aria-expanded={isTopSettingsOpen}
                className={`h-9 flex items-center gap-1.5 px-3 rounded-md transition-all cursor-pointer shrink-0 border whitespace-nowrap backdrop-blur-xs ${
                  isTopSettingsOpen
                    ? 'bg-[#25170F] text-[#F7EBE1] border-[#D4A373] ring-2 ring-[#8B5A2B]/40'
                    : 'bg-[#1C120C]/90 hover:bg-[#25170F] text-[#D4A373] hover:text-[#F7EBE1] border-[#8B5A2B]/50 hover:border-[#D4A373]/70'
                }`}
                title={isTopSettingsOpen ? 'Hide Settings' : 'Show Settings'}
                aria-label={isTopSettingsOpen ? 'Hide Settings' : 'Show Settings'}
              >
                <Settings className="w-3.5 h-3.5 text-[#D4A373] shrink-0" />
                <span className="text-xs font-cinzel font-semibold">Settings</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#D4A373] shrink-0 transition-transform duration-200 ${
                    isTopSettingsOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Settings Menu Containing Topic & Search Functions */}
        {isTopSettingsOpen && (
          <div className="px-5 py-4 sm:px-6 bg-[#24150B] border-t border-[#8B5A2B]/40 rounded-b-xl text-amber-50 animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              {/* Topic Drop-Down */}
              <div ref={dropdownRef} className="relative w-full sm:w-auto sm:min-w-[300px]">
                <button
                  type="button"
                  onClick={() => setIsTopicDropdownOpen(prev => !prev)}
                  aria-expanded={isTopicDropdownOpen}
                  className="w-full flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-lg bg-[#1C110A]/95 hover:bg-[#2E1C10] text-amber-50 border border-[#8B5A2B]/70 hover:border-amber-400/70 transition-all cursor-pointer shadow-xs"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[11px] font-cinzel font-bold uppercase tracking-wider text-amber-300/90 shrink-0">
                      Topic:
                    </span>
                    <span className="text-xs sm:text-sm font-cinzel font-bold text-white truncate">
                      {selectedSectionObj
                        ? `${selectedSectionObj.title} (${selectedSectionCount})`
                        : `All Topics (${SACRED_QUOTATIONS_DATABASE.length})`}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-amber-300 shrink-0 transition-transform duration-200 ${
                      isTopicDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Drop-Down Panel Containing All Topic Buttons */}
                {isTopicDropdownOpen && (
                  <div className="absolute left-0 right-0 sm:right-auto sm:w-[34rem] md:w-[40rem] mt-2 p-3 sm:p-4 rounded-xl bg-[#24150B] border border-[#A67B4E]/80 shadow-[0_20px_50px_rgba(0,0,0,0.85)] z-50">
                    <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#8B5A2B]/40">
                      <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-amber-200">
                        Select a Topic ({QUOTATION_SECTIONS.length} Topics)
                      </span>
                      {selectedSection !== 'all' && (
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedSection('all');
                            setIsTopicDropdownOpen(false);
                          }}
                          className="text-xs font-cinzel font-semibold text-amber-300 hover:text-white cursor-pointer"
                        >
                          Reset to All
                        </button>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedSection('all');
                          setIsTopicDropdownOpen(false);
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-cinzel transition-colors cursor-pointer ${
                          selectedSection === 'all'
                            ? 'bg-[#8B5A2B] text-white border border-amber-300/70 shadow-xs'
                            : 'bg-[#362012] text-amber-100/90 hover:bg-[#4A2E1B] hover:text-white border border-[#8B5A2B]/45'
                        }`}
                      >
                        All ({SACRED_QUOTATIONS_DATABASE.length})
                      </button>
                      {QUOTATION_SECTIONS.map(sec => {
                        const count = SACRED_QUOTATIONS_DATABASE.filter(
                          q => q.sectionId === sec.id
                        ).length;
                        return (
                          <button
                            key={sec.id}
                            type="button"
                            onClick={() => {
                              setSelectedSection(sec.id);
                              setIsTopicDropdownOpen(false);
                            }}
                            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold font-cinzel transition-colors cursor-pointer ${
                              selectedSection === sec.id
                                ? 'bg-[#8B5A2B] text-white border border-amber-300/70 shadow-xs'
                                : 'bg-[#362012] text-amber-100/90 hover:bg-[#4A2E1B] hover:text-white border border-[#8B5A2B]/45'
                            }`}
                          >
                            {sec.title} ({count})
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Search Input */}
              <div className="relative w-full sm:w-80 md:w-96">
                <input
                  type="text"
                  placeholder="Search quotations, saints, topics, or works..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full text-xs pl-8 pr-8 py-2.5 rounded-lg bg-[#1C110A]/95 text-amber-50 placeholder:text-stone-400 border border-[#8B5A2B]/70 focus:outline-none focus:border-amber-400"
                />
                <Search className="w-3.5 h-3.5 text-amber-300/80 absolute left-2.5 top-3" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Clear search"
                    className="absolute right-2.5 top-2.5 text-stone-400 hover:text-amber-200 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sections & Quotations */}
      <div className="space-y-8">
        {visibleSections.map(section => {
          const sectionQuotes = SACRED_QUOTATIONS_DATABASE.filter(q => {
            if (q.sectionId !== section.id) return false;
            if (!searchQuery.trim()) return true;
            const query = searchQuery.toLowerCase();
            return (
              q.text.toLowerCase().includes(query) ||
              q.sectionTitle.toLowerCase().includes(query) ||
              (q.attribution && q.attribution.toLowerCase().includes(query)) ||
              (q.subHeading && q.subHeading.toLowerCase().includes(query)) ||
              (q.postscript && q.postscript.toLowerCase().includes(query))
            );
          });

          if (sectionQuotes.length === 0) return null;

          return (
            <section
              key={section.id}
              className="bg-white/90 backdrop-blur-xl backdrop-saturate-150 rounded-xl p-5 sm:p-8 shadow-sm border border-white/95 ring-1 ring-inset ring-amber-900/10 space-y-5"
            >
              {/* Section Heading */}
              <div className="border-b border-amber-900/20 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-stone-950 tracking-wide">
                    {section.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-700 font-serif italic mt-0.5">
                    {section.subtitle}
                  </p>
                </div>
                <span className="text-xs font-cinzel font-bold uppercase tracking-wider text-amber-950 bg-amber-100/90 px-3 py-1 rounded-md border border-amber-300/80 self-start sm:self-auto">
                  {sectionQuotes.length} {sectionQuotes.length === 1 ? 'Quotation' : 'Quotations'}
                </span>
              </div>

              {/* Quotations List */}
              <div className="divide-y divide-stone-200/90">
                {sectionQuotes.map(item => {
                  const isCopied = copiedId === item.id;
                  const isSpeaking = speakingId === item.id;

                  return (
                    <div
                      key={item.id}
                      className="py-5 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-start justify-between gap-4 group"
                    >
                      <div className="space-y-1.5 flex-1">
                        {item.subHeading && (
                          <h4 className="font-serif-sacred text-lg sm:text-xl md:text-2xl font-bold text-amber-900 pt-1 pb-0.5">
                            {item.subHeading}
                          </h4>
                        )}
                        <p className="font-serif-sacred text-stone-950 text-lg sm:text-xl md:text-2xl leading-relaxed whitespace-pre-line">
                          {item.text}
                        </p>
                        {item.attribution && (
                          <p className="font-serif-sacred text-lg sm:text-xl md:text-2xl font-bold text-amber-950 pt-0.5">
                            {item.attribution}
                          </p>
                        )}
                        {item.postscript && (
                          <p className="font-serif-sacred text-stone-950 text-lg sm:text-xl md:text-2xl leading-relaxed whitespace-pre-wrap pt-2">
                            {item.postscript}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-start pt-1">
                        <button
                          onClick={() => handleToggleSpeak(item)}
                          className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                            isSpeaking
                              ? 'bg-[#6B4423] text-white border-[#5A381C]'
                              : 'bg-stone-100/90 text-stone-700 hover:text-stone-950 hover:bg-amber-100/60 border-stone-300/90'
                          }`}
                          title="Listen to quotation"
                        >
                          {isSpeaking ? (
                            <VolumeX className="w-4 h-4" />
                          ) : (
                            <Volume2 className="w-4 h-4" />
                          )}
                        </button>

                        <button
                          onClick={() => handleCopy(item)}
                          className="p-2 rounded-lg bg-stone-100/90 text-stone-700 hover:text-stone-950 hover:bg-amber-100/60 border border-stone-300/90 transition-colors cursor-pointer"
                          title="Copy quotation"
                        >
                          {isCopied ? (
                            <Check className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};
