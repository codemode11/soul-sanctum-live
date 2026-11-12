import React, { useState } from 'react';
import {
  Clock,
  ExternalLink,
  RefreshCw,
  Volume2,
  VolumeX,
  Copy,
  Check,
  BookOpen,
  ShieldCheck,
  Layers,
  Sparkles,
  Sun,
  Moon,
  Sunset,
  Sunrise,
  Settings,
  ChevronDown
} from 'lucide-react';
import {
  getDivineOfficeHour,
  OfficeHourKey,
  DivineOfficeHourData
} from '../data/divineOffice';
import { SacredReader } from '../utils/speech';
import { toCurvedQuotes } from '../utils/typography';

export const DivineOfficeView: React.FC = () => {
  const [selectedHourKey, setSelectedHourKey] = useState<OfficeHourKey>(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 21 || currentHour < 5) return 'compline'; // 9 PM - 5 AM -> Night Prayer (Compline)
    if (currentHour >= 17) return 'vespers'; // 5 PM - 9 PM -> Evening Prayer (Vespers)
    if (currentHour >= 11) return 'daytime'; // 11 AM - 5 PM -> Daytime Prayer
    if (currentHour >= 6) return 'lauds'; // 6 AM - 11 AM -> Morning Prayer (Lauds)
    return 'readings';
  });
  const [selectedDateStr, setSelectedDateStr] = useState<string>(() => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  });
  const [viewMode, setViewMode] = useState<'native' | 'widget'>('native');
  const [textSize, setTextSize] = useState<'normal' | 'medium' | 'large' | 'xlarge'>('medium');
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [copied, setCopied] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [isTopSettingsOpen, setIsTopSettingsOpen] = useState(false);
  const [hoveredHourKey, setHoveredHourKey] = useState<OfficeHourKey | null>(null);

  const hourData: DivineOfficeHourData = getDivineOfficeHour(selectedDateStr, selectedHourKey);

  const handleHourSelect = (key: OfficeHourKey) => {
    setSelectedHourKey(key);
    if (isReadingAloud) {
      SacredReader.stop();
      setIsReadingAloud(false);
    }
  };

  const handleToggleReadAloud = () => {
    if (isReadingAloud) {
      SacredReader.stop();
      setIsReadingAloud(false);
    } else {
      let script = `${hourData.englishTitle}. ${hourData.timeHint}. `;
      script += `Verse: ${hourData.openingVerse}. Response: ${hourData.openingResponse}. `;
      script += `Hymn: ${hourData.hymnTitle}. `;
      
      hourData.psalms.forEach(p => {
        script += `Antiphon: ${p.antiphon}. ${p.citation}: ${p.title}. ${p.verses.join(' ')} `;
      });

      script += `Reading: ${hourData.shortReadingCitation}. ${hourData.shortReadingText}. `;

      if (hourData.canticle) {
        script += `${hourData.canticle.title}. Antiphon: ${hourData.canticle.antiphon}. ${hourData.canticle.text}. `;
      }

      if (hourData.patristicReading) {
        script += `Patristic Reading by ${hourData.patristicReading.author}: ${hourData.patristicReading.title}. ${hourData.patristicReading.text}. `;
      }

      if (hourData.intercessions) {
        script += `Intercessions: ${hourData.intercessions.introduction}. Response: ${hourData.intercessions.response}. `;
        script += hourData.intercessions.petitions.join(' ') + ' ';
      }

      script += `Collect: ${hourData.collect}`;

      SacredReader.speak(script);
      setIsReadingAloud(true);
    }
  };

  const handleCopy = () => {
    let copyText = `${hourData.englishTitle.toUpperCase()}\n`;
    copyText += `Liturgy of the Hours • ${hourData.timeHint}\n\n`;
    copyText += `VERSICLE & RESPONSE:\nV. ${hourData.openingVerse}\nR. ${hourData.openingResponse}\n\n`;
    copyText += `HYMN: ${hourData.hymnTitle}\n${hourData.hymnStanzas.join('\n\n')}\n\n`;
    
    hourData.psalms.forEach(p => {
      copyText += `PSALMODY: ${p.citation} — ${p.title}\nAntiphon: "${p.antiphon}"\n${p.verses.join('\n')}\n\n`;
    });

    copyText += `SHORT READING (${hourData.shortReadingCitation}):\n"${hourData.shortReadingText}"\n\n`;

    if (hourData.canticle) {
      copyText += `CANTICLE: ${hourData.canticle.title} (${hourData.canticle.citation})\nAntiphon: "${hourData.canticle.antiphon}"\n${hourData.canticle.text}\n\n`;
    }

    if (hourData.patristicReading) {
      copyText += `PATRISTIC READING (${hourData.patristicReading.author}):\n"${hourData.patristicReading.title}"\n${hourData.patristicReading.text}\n\n`;
    }

    if (hourData.intercessions) {
      copyText += `INTERCESSIONS:\n${hourData.intercessions.introduction}\nR. ${hourData.intercessions.response}\n`;
      copyText += hourData.intercessions.petitions.map(p => `• ${p}`).join('\n') + '\n\n';
    }

    copyText += `COLLECT:\n${hourData.collect}\n\n${hourData.conclusion}`;

    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Font size mapper matching Mass Readings & Bible Commentary scale
  const getTextSizeClass = () => {
    switch (textSize) {
      case 'normal': return 'text-base sm:text-lg leading-relaxed';
      case 'large': return 'text-xl sm:text-2xl leading-relaxed';
      case 'xlarge': return 'text-2xl sm:text-3xl leading-relaxed';
      case 'medium':
      default: return 'text-lg sm:text-xl leading-relaxed';
    }
  };

  const getHeadingSizeClass = () => {
    switch (textSize) {
      case 'normal': return 'text-lg sm:text-xl font-bold';
      case 'large': return 'text-2xl sm:text-3xl font-bold';
      case 'xlarge': return 'text-3xl sm:text-4xl font-bold';
      case 'medium':
      default: return 'text-xl sm:text-2xl font-bold';
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-3 sm:p-6 md:p-8 rounded-xl bg-white/45 backdrop-blur-xl backdrop-saturate-150 border border-white/60 ring-1 ring-inset ring-white/40 shadow-[0_8px_32px_0_rgba(120,90,50,0.12)] space-y-6 mb-12">
      
      {/* TOP CONTAINER: Double-Rectangle Banner */}
      <div className="bg-white/55 backdrop-blur-xl backdrop-saturate-150 rounded-xl shadow-xs border border-white/70 ring-1 ring-inset ring-white/40 relative z-20">
        
        {/* RECTANGLE 1: Main Title Banner */}
        <div className={`sanctum-top-banner px-5 pt-4 pb-4 sm:px-6 min-h-[164px] bg-gradient-to-r from-stone-900 to-stone-800 text-stone-100 flex flex-col justify-between ${isTopSettingsOpen ? 'rounded-t-xl' : 'rounded-xl'}`}>
          <div className="space-y-2 my-auto">
            {/* Line 1: Subtitle Kicker */}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-amber-200/90">
                Universal Prayer of the Catholic Church
              </span>
            </div>

            {/* Line 2: Main Title */}
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-normal text-amber-100 leading-tight">
              Divine Office
            </h2>

            {/* Line 3: Hour & Time Hint Kicker (Clean Upright Font) */}
            <p className="text-xs sm:text-sm text-stone-300 font-serif font-medium">
              {hourData.englishTitle} • {hourData.timeHint}
            </p>
          </div>

          {/* Lower Row: Mode Switcher & Settings Toggle Button */}
          <div className="flex items-center justify-end gap-2 sm:gap-2.5 mt-auto pt-2 shrink-0">
            {/* View Mode Switcher */}
            <div className="inline-flex items-center h-8 rounded-md border border-[#8B5A2B]/60 bg-[#1C120C]/90 text-amber-100 p-0.5 shadow-xs">
              <button
                type="button"
                onClick={() => setViewMode('native')}
                className={`h-full px-3 rounded-xs text-xs font-cinzel font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'native'
                    ? 'bg-amber-900 text-amber-50 shadow-xs font-bold'
                    : 'text-stone-300 hover:text-white hover:bg-white/10'
                }`}
                title="Reader View (App Design & Typography)"
              >
                <Layers className="w-3.5 h-3.5 text-amber-300" />
                <span>Reader</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('widget')}
                className={`h-full px-3 rounded-xs text-xs font-cinzel font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'widget'
                    ? 'bg-amber-900 text-amber-50 shadow-xs font-bold'
                    : 'text-stone-300 hover:text-white hover:bg-white/10'
                }`}
                title="DivineOffice.org Live Widget Embed"
              >
                <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
                <span>Widget</span>
              </button>
            </div>

            {/* Settings Dropdown Button */}
            <button
              onClick={() => setIsTopSettingsOpen(prev => !prev)}
              aria-expanded={isTopSettingsOpen}
              className={`h-8 flex items-center gap-1.5 px-3 rounded-md transition-all cursor-pointer shrink-0 border ${
                isTopSettingsOpen
                  ? 'bg-[#25170F] text-[#F7EBE1] border-[#D4A373] ring-2 ring-[#8B5A2B]/40'
                  : 'bg-[#1C120C]/90 hover:bg-[#25170F] text-[#D4A373] hover:text-[#F7EBE1] border-[#8B5A2B]/50 hover:border-[#D4A373]/70'
              }`}
              title={isTopSettingsOpen ? 'Hide Settings' : 'Show Settings'}
              aria-label={isTopSettingsOpen ? 'Hide Settings' : 'Show Settings'}
            >
              <Settings className="w-3.5 h-3.5 text-[#D4A373] shrink-0" />
              <span className="text-xs font-cinzel font-semibold hidden sm:inline">Settings</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#D4A373] shrink-0 transition-transform duration-200 ${
                  isTopSettingsOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* RECTANGLE 2: Settings Panel */}
        {isTopSettingsOpen && (
          <div className="px-5 py-3.5 sm:px-6 bg-white/55 backdrop-blur-md border-t border-white/60 flex flex-col justify-center gap-2 animate-fadeIn rounded-b-xl">
            <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-2.5 sm:gap-3 p-2.5 rounded-lg bg-stone-100/90 border border-stone-200 shadow-2xs text-xs text-stone-700">
              
              {/* 1. Listen to Divine Office Recitation */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={handleToggleReadAloud}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer shadow-xs ${
                    isReadingAloud
                      ? 'bg-[#6B4423] text-white animate-pulse'
                      : 'bg-[#5A381C] hover:bg-[#6B4423] text-amber-100 border border-[#8B5A2B]/70'
                  }`}
                  title={isReadingAloud ? 'Stop Audio' : 'Listen to Divine Office recitation'}
                  aria-label={isReadingAloud ? 'Stop Audio' : 'Listen to Divine Office'}
                >
                  {isReadingAloud ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-300" />}
                  <span>{isReadingAloud ? 'Stop Audio' : 'Listen to Divine Office'}</span>
                </button>
              </div>

              {/* 2. Text Size Selector */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-xs font-medium text-stone-600">Text Size:</span>
                <div className="flex items-center bg-stone-200/90 border border-stone-300 rounded-md p-0.5 text-xs">
                  <button
                    type="button"
                    onClick={() => setTextSize('normal')}
                    className={`px-2 py-0.5 rounded text-xs font-medium transition-colors cursor-pointer ${
                      textSize === 'normal' ? 'bg-amber-900 text-white font-bold' : 'text-stone-700 hover:text-amber-950'
                    }`}
                  >
                    Normal
                  </button>
                  <button
                    type="button"
                    onClick={() => setTextSize('medium')}
                    className={`px-2 py-0.5 rounded text-xs font-medium transition-colors cursor-pointer ${
                      textSize === 'medium' ? 'bg-amber-900 text-white font-bold' : 'text-stone-700 hover:text-amber-950'
                    }`}
                  >
                    Medium
                  </button>
                  <button
                    type="button"
                    onClick={() => setTextSize('large')}
                    className={`px-2 py-0.5 rounded text-xs font-medium transition-colors cursor-pointer ${
                      textSize === 'large' ? 'bg-amber-900 text-white font-bold' : 'text-stone-700 hover:text-amber-950'
                    }`}
                  >
                    Large
                  </button>
                  <button
                    type="button"
                    onClick={() => setTextSize('xlarge')}
                    className={`px-2 py-0.5 rounded text-xs font-medium transition-colors cursor-pointer ${
                      textSize === 'xlarge' ? 'bg-amber-900 text-white font-bold' : 'text-stone-700 hover:text-amber-950'
                    }`}
                  >
                    X-Large
                  </button>
                </div>
              </div>

              {/* 3. Copy & External Link */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopy}
                  className="px-3 py-1.5 rounded-md bg-stone-800 hover:bg-stone-700 text-amber-200 border border-stone-700 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                  title={copied ? 'Copied to clipboard' : 'Copy prayer text to clipboard'}
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy Text'}</span>
                </button>

                <a
                  href="https://divineoffice.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-md bg-[#5A381C] hover:bg-[#6B4423] text-amber-100 border border-[#8B5A2B]/70 text-xs font-cinzel font-semibold transition-all flex items-center gap-1 cursor-pointer"
                  title="Open DivineOffice.org in a new tab"
                >
                  <span>DivineOffice.org</span>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* RECTANGLE 3: HOURS NAVIGATION TAB BAR */}
      <div className="bg-white/55 backdrop-blur-xl backdrop-saturate-150 rounded-xl p-3 sm:p-4 border border-white/70 ring-1 ring-inset ring-white/40 shadow-[0_8px_32px_0_rgba(120,90,50,0.12)] space-y-2.5">
        <div className="flex items-center justify-center pb-0.5 text-center">
          <span className="font-cinzel text-[11px] font-bold uppercase tracking-wider text-stone-700">
            Canonical Hours
          </span>
        </div>

        <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 w-full items-stretch">
          {[
            { key: 'invitatory' as const, line1: 'Invitatory', line2: '', Icon: Sunrise },
            { key: 'readings' as const, line1: 'Office of', line2: 'Readings', Icon: BookOpen },
            { key: 'lauds' as const, line1: 'Morning', line2: 'Prayer', Icon: Sun },
            { key: 'daytime' as const, line1: 'Daytime', line2: 'Prayer', Icon: Clock },
            { key: 'vespers' as const, line1: 'Evening', line2: 'Prayer', Icon: Sunset },
            { key: 'compline' as const, line1: 'Night', line2: 'Prayer', Icon: Moon },
          ].map(({ key, line1, line2, Icon }) => {
            const isHovered = hoveredHourKey === key;
            const isSelected = selectedHourKey === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleHourSelect(key)}
                onMouseEnter={() => setHoveredHourKey(key)}
                onMouseLeave={() => setHoveredHourKey(null)}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: isSelected ? '#8B5A2B' : isHovered ? '#6B4423' : '#D1D5DB',
                }}
                className={`w-full px-1.5 sm:px-3.5 py-2 sm:py-2.5 rounded-lg text-[10.5px] sm:text-xs font-bold transition-all cursor-pointer flex items-center justify-center text-center gap-1 sm:gap-2 border overflow-hidden bg-white shadow-xs ${
                  isSelected
                    ? 'ring-2 ring-[#8B5A2B] ring-offset-1 border-[#8B5A2B] shadow-md scale-[1.02]'
                    : 'hover:border-[#6B4423] hover:shadow-xs'
                }`}
              >
                <Icon
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0"
                  style={{
                    color: isSelected ? '#B45309' : '#D4AF37',
                    strokeWidth: 2.4,
                    filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.15))',
                  }}
                />
                <span style={{ color: '#1C120C' }} className="w-[54px] sm:w-[64px] shrink-0 font-bold tracking-normal leading-tight text-center flex flex-col items-center justify-center">
                  <span className="block whitespace-nowrap">{line1}</span>
                  {line2 && <span className="block whitespace-nowrap">{line2}</span>}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* VIEW MODE 1: NATIVE READER VIEW */}
      {viewMode === 'native' && (
        <article className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-stone-200/90 space-y-8">
          
          {/* SEGMENT 1: VERSICLE & RESPONSE OPENING (Light Brown Background) */}
          <div className="relative p-4 sm:p-5 rounded-xl bg-[#FAF4EB] border border-[#E2D5C3] shadow-2xs overflow-hidden">
            {/* Corner Accents */}
            <div className="pointer-events-none absolute inset-0 m-0" style={{ margin: 0 }}>
              <svg className="pointer-events-none absolute top-0 left-0 w-6 h-6 text-amber-800/80 m-0" style={{ margin: 0 }} viewBox="0 0 24 24" fill="none">
                <path d="M 20,1 H 12 A 11,11 0 0,0 1,12 V 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </svg>
              <svg className="pointer-events-none absolute top-0 right-0 w-6 h-6 text-amber-800/80 m-0" style={{ margin: 0 }} viewBox="0 0 24 24" fill="none">
                <path d="M 4,1 H 12 A 11,11 0 0,1 23,12 V 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </svg>
              <svg className="pointer-events-none absolute bottom-0 left-0 w-6 h-6 text-amber-800/80 m-0" style={{ margin: 0 }} viewBox="0 0 24 24" fill="none">
                <path d="M 20,23 H 12 A 11,11 0 0,1 1,12 V 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </svg>
              <svg className="pointer-events-none absolute bottom-0 right-0 w-6 h-6 text-amber-800/80 m-0" style={{ margin: 0 }} viewBox="0 0 24 24" fill="none">
                <path d="M 4,23 H 12 A 11,11 0 0,0 23,12 V 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </svg>
            </div>

            <div className="space-y-2">
              <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider">
                Invitatory &amp; Introduction
              </div>
              <div className={`font-serif text-stone-900 space-y-1.5 ${getTextSizeClass()}`}>
                <p>
                  <span className="font-bold text-amber-900 font-cinzel">V.</span> {toCurvedQuotes(hourData.openingVerse)}
                </p>
                <p>
                  <span className="font-bold text-amber-900 font-cinzel">R.</span> {toCurvedQuotes(hourData.openingResponse)}
                </p>
              </div>
            </div>
          </div>

          {/* SEGMENT 2: HYMN SECTION (No Background) */}
          <div className="space-y-3.5 border-b border-stone-200/80 pb-6 pt-1">
            <div className="flex items-center justify-between border-b border-stone-200/80 pb-2">
              <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                <span>Hymn</span>
              </div>
              {hourData.hymnAuthor && (
                <span className="text-xs text-stone-600 font-serif">
                  {hourData.hymnAuthor}
                </span>
              )}
            </div>
            <h3 className={`font-serif font-bold text-stone-900 ${getHeadingSizeClass()}`}>
              {toCurvedQuotes(hourData.hymnTitle)}
            </h3>
            {/* NO ITALICS on long hymn stanzas */}
            <div className="space-y-4 pt-1">
              {hourData.hymnStanzas.map((stanza, idx) => (
                <p key={idx} className={`font-serif text-stone-850 pl-4 border-l-2 border-amber-800/50 not-italic ${getTextSizeClass()}`}>
                  {toCurvedQuotes(stanza)}
                </p>
              ))}
            </div>
          </div>

          {/* SEGMENT 3: PSALMODY SECTION (Alternating Light Brown / No Background) */}
          <div className="space-y-6 border-b border-stone-200/80 pb-6">
            <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-stone-200/80 pb-2">
              <BookOpen className="w-3.5 h-3.5 text-amber-800" />
              <span>Psalms &amp; Canticles</span>
            </div>

            {hourData.psalms.map((psalm, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`space-y-3.5 p-4 sm:p-5 rounded-xl border transition-colors ${
                    isEven
                      ? 'bg-[#FAF4EB] border-[#E2D5C3] shadow-2xs'
                      : 'bg-white border-stone-200/80 shadow-2xs'
                  }`}
                >
                  {/* Antiphon Callout Box (Short text retains italics) */}
                  <div className="bg-amber-100/90 border-l-4 border-amber-800 p-3 rounded-r-lg font-serif text-amber-950 text-xs sm:text-sm">
                    <span className="font-cinzel font-bold text-amber-900 not-italic uppercase tracking-wide mr-1.5">
                      Antiphon
                    </span>
                    <span className="italic">&ldquo;{toCurvedQuotes(psalm.antiphon)}&rdquo;</span>
                  </div>

                  <div className="space-y-1 pt-1">
                    <h4 className={`font-serif font-bold text-stone-900 ${getHeadingSizeClass()}`}>
                      {psalm.citation} — {toCurvedQuotes(psalm.title)}
                    </h4>
                    {psalm.subtitle && (
                      <p className="text-xs text-amber-900 font-serif font-medium">
                        {toCurvedQuotes(psalm.subtitle)}
                      </p>
                    )}
                  </div>

                  {/* Psalm Verses (NO ITALICS on long verses) */}
                  <div className={`space-y-2 font-serif text-stone-850 pt-1 not-italic ${getTextSizeClass()}`}>
                    {psalm.verses.map((verse, vIdx) => (
                      <p key={vIdx} className="leading-relaxed pl-2">
                        {toCurvedQuotes(verse)}
                      </p>
                    ))}
                  </div>

                  {/* Repeat Antiphon (Short text retains italics) */}
                  <div className="text-xs text-amber-900 font-serif pt-1 border-t border-amber-200/60">
                    <span className="font-cinzel font-bold mr-1.5">Antiphon</span>
                    <span className="italic">&ldquo;{toCurvedQuotes(psalm.antiphon)}&rdquo;</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* SEGMENT 4: SHORT SCRIPTURE READING (No Background / Clean Card) */}
          <div className="space-y-3.5 border-b border-stone-200/80 pb-6">
            <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-stone-200/80 pb-2">
              <BookOpen className="w-3.5 h-3.5 text-amber-800" />
              <span>Short Reading ({hourData.shortReadingCitation})</span>
            </div>
            {/* NO ITALICS on long scripture text */}
            <div className={`p-4 sm:p-5 rounded-xl bg-white border border-stone-200/90 font-serif text-stone-900 not-italic shadow-2xs ${getTextSizeClass()}`}>
              {toCurvedQuotes(hourData.shortReadingText)}
            </div>

            {/* Responsory */}
            <div className="space-y-1 font-serif text-stone-850 text-xs sm:text-sm pt-2 bg-stone-50 p-3 rounded-lg border border-stone-200">
              <p><span className="font-bold text-amber-900 font-cinzel">V.</span> {toCurvedQuotes(hourData.responsory.verse)}</p>
              <p><span className="font-bold text-amber-900 font-cinzel">R.</span> {toCurvedQuotes(hourData.responsory.response)}</p>
            </div>
          </div>

          {/* SEGMENT 5: GOSPEL CANTICLE (Light Brown Background) */}
          {hourData.canticle && (
            <div className="space-y-4 border-b border-stone-200/80 pb-6">
              <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-stone-200/80 pb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                <span>Gospel Canticle</span>
              </div>

              <div className="space-y-3.5 p-4 sm:p-5 rounded-xl bg-[#FAF4EB] border border-[#E2D5C3] shadow-2xs">
                <div className="bg-amber-100/90 border-l-4 border-amber-800 p-3 rounded-r-lg font-serif text-amber-950 text-xs sm:text-sm">
                  <span className="font-cinzel font-bold text-amber-900 not-italic uppercase tracking-wide mr-1.5">
                    Antiphon
                  </span>
                  <span className="italic">&ldquo;{toCurvedQuotes(hourData.canticle.antiphon)}&rdquo;</span>
                </div>

                <div className="space-y-1">
                  <h4 className={`font-serif font-bold text-stone-900 ${getHeadingSizeClass()}`}>
                    {hourData.canticle.title} ({hourData.canticle.citation})
                  </h4>
                </div>

                {/* NO ITALICS on canticle text */}
                <div className={`font-serif text-stone-900 whitespace-pre-line pl-3 border-l-2 border-amber-800/60 not-italic ${getTextSizeClass()}`}>
                  {toCurvedQuotes(hourData.canticle.text)}
                </div>

                <div className="text-xs text-amber-900 font-serif pt-1 border-t border-amber-200/60">
                  <span className="font-cinzel font-bold mr-1.5">Antiphon</span>
                  <span className="italic">&ldquo;{toCurvedQuotes(hourData.canticle.antiphon)}&rdquo;</span>
                </div>
              </div>
            </div>
          )}

          {/* SEGMENT 6: PATRISTIC READING (No Background) */}
          {hourData.patristicReading && (
            <div className="space-y-4 border-b border-stone-200/80 pb-6">
              <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-stone-200/80 pb-2">
                <BookOpen className="w-3.5 h-3.5 text-amber-800" />
                <span>Patristic Reading ({hourData.patristicReading.author})</span>
              </div>

              <div className="space-y-1">
                <h4 className={`font-serif font-bold text-stone-900 ${getHeadingSizeClass()}`}>
                  {toCurvedQuotes(hourData.patristicReading.title)}
                </h4>
                <p className="text-xs font-cinzel text-amber-900 font-semibold">
                  From {toCurvedQuotes(hourData.patristicReading.work)}
                </p>
              </div>

              {/* NO ITALICS on long patristic text */}
              <div className={`font-serif text-stone-850 leading-relaxed bg-white p-4 sm:p-5 rounded-xl border border-stone-200/90 not-italic shadow-2xs ${getTextSizeClass()}`}>
                {toCurvedQuotes(hourData.patristicReading.text)}
              </div>

              <div className="text-xs text-stone-800 font-serif bg-stone-100/80 p-3 rounded-lg border border-stone-200">
                {toCurvedQuotes(hourData.patristicReading.responsory)}
              </div>
            </div>
          )}

          {/* SEGMENT 7: INTERCESSIONS & THE LORD'S PRAYER */}
          {hourData.intercessions && (() => {
            const preces = hourData.intercessions;
            return (
              <div className="space-y-4 border-b border-stone-200/80 pb-6">
                <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-stone-200/80 pb-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                  <span>Intercessions</span>
                </div>

                <p className={`font-serif text-stone-850 not-italic ${getTextSizeClass()}`}>
                  {toCurvedQuotes(preces.introduction)}
                </p>

                <div className="bg-amber-100/90 border-l-4 border-amber-800 p-3 rounded-r-lg font-cinzel font-bold text-amber-950 text-xs sm:text-sm shadow-2xs">
                  R. {toCurvedQuotes(preces.response)}
                </div>

                <div className="space-y-3 pt-1">
                  {preces.petitions.map((pet, idx) => (
                    <div key={idx} className={`font-serif text-stone-900 space-y-1 ${getTextSizeClass()}`}>
                      <p>• {toCurvedQuotes(pet)}</p>
                      <p className="font-cinzel font-bold text-amber-900 text-xs pl-4">
                        R. {toCurvedQuotes(preces.response)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* The Lord's Prayer (Light Brown Background, NO ITALICS) */}
                <div className="pt-3 space-y-2 bg-[#FAF4EB] p-4 sm:p-5 rounded-xl border border-[#E2D5C3] shadow-2xs">
                  <div className="font-cinzel font-bold text-xs text-amber-900 uppercase tracking-wide">
                    The Lord's Prayer
                  </div>
                  <p className={`font-serif text-stone-900 not-italic leading-relaxed ${getTextSizeClass()}`}>
                    Our Father, who art in heaven, hallowed be thy name; thy kingdom come, thy will be done on earth as it is in heaven. Give us this day our daily bread, and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.
                  </p>
                </div>
              </div>
            );
          })()}

          {/* SEGMENT 8: CONCLUDING COLLECT & BENEDICTION (No Background) */}
          <div className="space-y-3 pt-2 border-b border-stone-200/80 pb-6">
            <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-stone-200/80 pb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-800" />
              <span>Concluding Collect</span>
            </div>
            {/* NO ITALICS on collect */}
            <p className={`font-serif text-stone-900 font-semibold leading-relaxed bg-white p-4 sm:p-5 rounded-xl border border-stone-200/90 not-italic shadow-2xs ${getTextSizeClass()}`}>
              {toCurvedQuotes(hourData.collect)}
            </p>
            <div className="font-serif text-stone-850 text-xs sm:text-sm pt-1">
              <p className="font-cinzel font-bold text-amber-900">{hourData.conclusion}</p>
            </div>
          </div>

          {/* SEGMENT 9: MARIAN ANTIPHON (Light Brown Background) */}
          {hourData.marianAntiphon && (
            <div className="mt-8 pt-2 space-y-3 bg-[#FAF4EB] p-5 rounded-xl border border-[#E2D5C3] shadow-2xs">
              <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                <span>Marian Antiphon • {hourData.marianAntiphon.title}</span>
              </div>
              {/* NO ITALICS on long Marian antiphon text */}
              <p className={`font-serif text-stone-900 not-italic leading-relaxed ${getTextSizeClass()}`}>
                &ldquo;{toCurvedQuotes(hourData.marianAntiphon.text)}&rdquo;
              </p>
              <p className="font-cinzel font-bold text-xs text-amber-900">
                {toCurvedQuotes(hourData.marianAntiphon.verseResponse)}
              </p>
              <p className={`font-serif text-stone-850 text-xs sm:text-sm pt-1 not-italic ${getTextSizeClass()}`}>
                {toCurvedQuotes(hourData.marianAntiphon.collect)}
              </p>
            </div>
          )}

        </article>
      )}

      {/* VIEW MODE 2: DIVINE OFFICE OFFICIAL WIDGET EMBED */}
      {viewMode === 'widget' && (
        <section className="bg-white rounded-xl border border-stone-200/90 shadow-sm overflow-hidden space-y-3 p-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <span className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5 text-amber-800" />
              <span>DivineOffice.org Official Embed Widget</span>
            </span>
            <button
              onClick={() => setIframeKey(prev => prev + 1)}
              className="px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-cinzel font-semibold transition-colors flex items-center gap-1 cursor-pointer"
              title="Reload live widget"
            >
              <RefreshCw className="w-3 h-3 text-amber-800" />
              <span>Refresh</span>
            </button>
          </div>

          <div className="w-full bg-[#FAF8F5] rounded-lg overflow-hidden border border-stone-200">
            <iframe
              key={iframeKey}
              src="https://divineoffice.org/widget"
              title="Divine Office — Liturgy of the Hours Widget"
              className="w-full border-0 h-[850px]"
              allow="autoplay; fullscreen"
              loading="lazy"
            />
          </div>
        </section>
      )}

    </div>
  );
};
