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
  Type,
  Layers,
  Sparkles,
  Sun,
  Moon,
  Sunset,
  Sunrise,
  Compass
} from 'lucide-react';
import {
  getDivineOfficeHour,
  OfficeHourKey,
  DivineOfficeHourData
} from '../data/divineOffice';
import { SacredReader } from '../utils/speech';
import { toCurvedQuotes } from '../utils/typography';

export const DivineOfficeView: React.FC = () => {
  const [selectedHourKey, setSelectedHourKey] = useState<OfficeHourKey>('lauds');
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
      let script = `${hourData.englishTitle}, ${hourData.latinTitle}. ${hourData.timeHint}. `;
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
    let copyText = `${hourData.englishTitle.toUpperCase()} (${hourData.latinTitle.toUpperCase()})\n`;
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

  // Font size class mapper with larger, highly legible prayer typography
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
    <div className="max-w-5xl mx-auto p-3 sm:p-5 md:p-6 rounded-xl bg-white/45 backdrop-blur-xl backdrop-saturate-150 border border-white/60 ring-1 ring-inset ring-white/40 shadow-[0_8px_32px_0_rgba(120,90,50,0.12)] space-y-4 sm:space-y-5 mb-12">
      
      {/* Main Top Banner: Divine Office Title & Liturgical Subtitle */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 rounded-xl p-5 sm:p-6 text-amber-50 shadow-md border border-stone-800 space-y-3 sm:space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-amber-200/90">
                Liturgia Horarum • Universal Prayer of the Catholic Church
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-amber-100 tracking-normal leading-tight">
              Divine Office
            </h2>
            <p className="font-serif-sacred text-stone-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              The official Liturgy of the Hours—consecrating the course of day and night through the Psalms, Canticles, Patristic Readings, Intercessions, and Collects.
            </p>
          </div>

          {/* Action Controls Top-Right */}
          <div className="flex flex-wrap items-center gap-2 shrink-0 self-start md:self-center">
            {/* View Mode Switcher */}
            <div className="inline-flex items-center rounded-lg border border-[#8B5A2B]/60 bg-[#1C120C]/90 text-amber-100 p-0.5 shadow-xs">
              <button
                type="button"
                onClick={() => setViewMode('native')}
                className={`px-3 py-1.5 rounded-md text-xs font-cinzel font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
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
                className={`px-3 py-1.5 rounded-md text-xs font-cinzel font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'widget'
                    ? 'bg-amber-900 text-amber-50 shadow-xs font-bold'
                    : 'text-stone-300 hover:text-white hover:bg-white/10'
                }`}
                title="DivineOffice.org Live Widget Embed"
              >
                <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
                <span>Live Widget</span>
              </button>
            </div>

            <a
              href="https://divineoffice.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-lg bg-[#5A381C] hover:bg-[#6B4423] text-amber-100 border border-[#8B5A2B]/70 text-xs font-cinzel font-semibold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
              title="Open DivineOffice.org in a new tab"
            >
              <span>DivineOffice.org</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
            </a>
          </div>
        </div>

        {/* Feature Strip */}
        <div className="pt-3 border-t border-stone-800/80 flex flex-wrap items-center justify-between gap-3 text-xs text-amber-200/90 font-cinzel">
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Breviarium Romanum • Order of Prayer</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Psalms, Canticles &amp; Patristic Readings</span>
            </span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-emerald-300 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Canonical Liturgy of the Hours</span>
          </span>
        </div>
      </div>

      {/* UNIFIED HOURS NAVIGATION TAB BAR */}
      <div className="bg-white/55 backdrop-blur-xl backdrop-saturate-150 rounded-xl p-3 sm:p-4 border border-white/70 ring-1 ring-inset ring-white/40 shadow-[0_8px_32px_0_rgba(120,90,50,0.12)] space-y-3">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
          <span className="font-cinzel text-[11px] font-bold uppercase tracking-wider text-stone-700 pl-1 shrink-0 hidden md:inline">
            Hours:
          </span>

          {/* 1. Invitatory */}
          <button
            onClick={() => handleHourSelect('invitatory')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              selectedHourKey === 'invitatory'
                ? 'bg-amber-900 text-amber-50 shadow-xs font-bold'
                : 'text-stone-700 hover:text-amber-950 hover:bg-stone-200/60'
            }`}
          >
            <Sunrise className="w-3.5 h-3.5 text-amber-400" />
            <span>Invitatory</span>
          </button>

          {/* 2. Office of Readings */}
          <button
            onClick={() => handleHourSelect('readings')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              selectedHourKey === 'readings'
                ? 'bg-amber-900 text-amber-50 shadow-xs font-bold'
                : 'text-stone-700 hover:text-amber-950 hover:bg-stone-200/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Office of Readings</span>
          </button>

          {/* 3. Morning Prayer (Lauds) */}
          <button
            onClick={() => handleHourSelect('lauds')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              selectedHourKey === 'lauds'
                ? 'bg-amber-900 text-amber-50 shadow-xs font-bold'
                : 'text-stone-700 hover:text-amber-950 hover:bg-stone-200/60'
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            <span>Morning Prayer (Lauds)</span>
          </button>

          {/* 4. Daytime Prayer */}
          <button
            onClick={() => handleHourSelect('daytime')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              selectedHourKey === 'daytime'
                ? 'bg-amber-900 text-amber-50 shadow-xs font-bold'
                : 'text-stone-700 hover:text-amber-950 hover:bg-stone-200/60'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Daytime Prayer</span>
          </button>

          {/* 5. Evening Prayer (Vespers) */}
          <button
            onClick={() => handleHourSelect('vespers')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              selectedHourKey === 'vespers'
                ? 'bg-amber-900 text-amber-50 shadow-xs font-bold'
                : 'text-stone-700 hover:text-amber-950 hover:bg-stone-200/60'
            }`}
          >
            <Sunset className="w-3.5 h-3.5 text-amber-400" />
            <span>Evening Prayer (Vespers)</span>
          </button>

          {/* 6. Night Prayer (Compline) */}
          <button
            onClick={() => handleHourSelect('compline')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              selectedHourKey === 'compline'
                ? 'bg-amber-900 text-amber-50 shadow-xs font-bold'
                : 'text-stone-700 hover:text-amber-950 hover:bg-stone-200/60'
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-amber-400" />
            <span>Night Prayer (Compline)</span>
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: NATIVE SACRED READER VIEW (Matches Application Design & Typography) */}
      {viewMode === 'native' && (
        <div className="space-y-5">
          {/* Controls Bar for Native View */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white/80 p-3 rounded-xl border border-stone-200/90 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-xs font-bold text-amber-950 uppercase tracking-wider">
                {hourData.englishTitle} ({hourData.latinTitle})
              </span>
              <span className="hidden sm:inline text-stone-400">•</span>
              <span className="hidden sm:inline text-xs text-stone-600 font-serif italic">
                {hourData.timeHint}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Font Size Selector */}
              <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg border border-stone-300">
                <Type className="w-3.5 h-3.5 text-amber-800 ml-1" />
                <button
                  onClick={() => setTextSize('normal')}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                    textSize === 'normal' ? 'bg-amber-900 text-white' : 'text-stone-700 hover:bg-stone-200'
                  }`}
                  title="Normal font size"
                >
                  S
                </button>
                <button
                  onClick={() => setTextSize('medium')}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                    textSize === 'medium' ? 'bg-amber-900 text-white' : 'text-stone-700 hover:bg-stone-200'
                  }`}
                  title="Medium font size"
                >
                  M
                </button>
                <button
                  onClick={() => setTextSize('large')}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                    textSize === 'large' ? 'bg-amber-900 text-white' : 'text-stone-700 hover:bg-stone-200'
                  }`}
                  title="Large font size"
                >
                  L
                </button>
                <button
                  onClick={() => setTextSize('xlarge')}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors cursor-pointer ${
                    textSize === 'xlarge' ? 'bg-amber-900 text-white' : 'text-stone-700 hover:bg-stone-200'
                  }`}
                  title="Extra Large font size"
                >
                  XL
                </button>
              </div>

              {/* Audio Narration */}
              <button
                onClick={handleToggleReadAloud}
                className={`p-2 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-xs flex items-center justify-center ${
                  isReadingAloud
                    ? 'bg-amber-600 text-white animate-pulse'
                    : 'bg-[#5A381C] hover:bg-[#6B4423] text-amber-100 border border-[#8B5A2B]/70'
                }`}
                title={isReadingAloud ? 'Stop Audio' : 'Listen to Divine Office recitation'}
                aria-label={isReadingAloud ? 'Stop Audio' : 'Listen to Divine Office'}
              >
                {isReadingAloud ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-300" />}
              </button>

              {/* Copy Prayer Text */}
              <button
                onClick={handleCopy}
                className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-200 border border-stone-700 text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center"
                title={copied ? 'Copied to clipboard' : 'Copy prayer text to clipboard'}
                aria-label="Copy prayer text"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* MAIN SACRED PRAYER CARD */}
          <article className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-stone-200/90 space-y-8">
            
            {/* 1. VERSICLE & RESPONSE OPENING */}
            <div className="relative p-4 rounded-xl bg-[#FAF8F5] border border-amber-200/60 shadow-2xs space-y-2 overflow-hidden">
              {/* Corner Accents that follow the 12px rounding contour */}
              <svg className="pointer-events-none absolute top-0 left-0 w-6 h-6 text-amber-800" viewBox="0 0 24 24" fill="none">
                <path d="M 20,1 H 12 A 11,11 0 0,0 1,12 V 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </svg>
              <svg className="pointer-events-none absolute top-0 right-0 w-6 h-6 text-amber-800" viewBox="0 0 24 24" fill="none">
                <path d="M 4,1 H 12 A 11,11 0 0,1 23,12 V 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </svg>
              <svg className="pointer-events-none absolute bottom-0 left-0 w-6 h-6 text-amber-800" viewBox="0 0 24 24" fill="none">
                <path d="M 20,23 H 12 A 11,11 0 0,1 1,12 V 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </svg>
              <svg className="pointer-events-none absolute bottom-0 right-0 w-6 h-6 text-amber-800" viewBox="0 0 24 24" fill="none">
                <path d="M 4,23 H 12 A 11,11 0 0,0 23,12 V 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              </svg>

              <div className="font-cinzel text-xs font-bold text-amber-800 uppercase tracking-wider">
                Invitatorium et Introductio
              </div>
              <div className={`font-serif text-stone-900 space-y-1 ${getTextSizeClass()}`}>
                <p>
                  <span className="font-bold text-amber-900 font-cinzel">V.</span> {toCurvedQuotes(hourData.openingVerse)}
                </p>
                <p>
                  <span className="font-bold text-amber-900 font-cinzel">R.</span> {toCurvedQuotes(hourData.openingResponse)}
                </p>
              </div>
            </div>

            {/* 2. HYMN SECTION */}
            <div className="space-y-3 border-b border-stone-200 pb-6">
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                  <span>Hymnus • Hymn</span>
                </div>
                {hourData.hymnAuthor && (
                  <span className="text-xs text-stone-500 font-serif italic">
                    {hourData.hymnAuthor}
                  </span>
                )}
              </div>
              <h3 className={`font-serif font-bold text-stone-900 ${getHeadingSizeClass()}`}>
                {toCurvedQuotes(hourData.hymnTitle)}
              </h3>
              <div className="space-y-4 pt-1">
                {hourData.hymnStanzas.map((stanza, idx) => (
                  <p key={idx} className={`font-serif-sacred text-stone-800 pl-4 border-l-2 border-amber-800/40 italic ${getTextSizeClass()}`}>
                    {toCurvedQuotes(stanza)}
                  </p>
                ))}
              </div>
            </div>

            {/* 3. PSALMODY SECTION */}
            <div className="space-y-6 border-b border-stone-200 pb-6">
              <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-stone-200 pb-2">
                <BookOpen className="w-3.5 h-3.5 text-amber-800" />
                <span>Psalmodia • Psalms &amp; Canticles</span>
              </div>

              {hourData.psalms.map((psalm, idx) => (
                <div key={idx} className="space-y-3.5 bg-[#FAF7F2] p-4 sm:p-5 rounded-xl border border-[#E8DEC8]">
                  {/* Antiphon Callout Box */}
                  <div className="bg-amber-100/80 border-l-4 border-amber-800 p-3 rounded-r-lg shadow-2xs font-serif italic text-amber-950 text-xs sm:text-sm">
                    <span className="font-cinzel font-bold text-amber-900 not-italic uppercase tracking-wide mr-1.5">
                      Ant.
                    </span>
                    &ldquo;{toCurvedQuotes(psalm.antiphon)}&rdquo;
                  </div>

                  <div className="space-y-1 pt-1">
                    <h4 className={`font-serif font-bold text-stone-900 ${getHeadingSizeClass()}`}>
                      {psalm.citation} — {toCurvedQuotes(psalm.title)}
                    </h4>
                    {psalm.subtitle && (
                      <p className="text-xs text-amber-900 font-serif italic">
                        {toCurvedQuotes(psalm.subtitle)}
                      </p>
                    )}
                  </div>

                  {/* Psalm Verses */}
                  <div className={`space-y-2 font-serif text-stone-850 pt-2 ${getTextSizeClass()}`}>
                    {psalm.verses.map((verse, vIdx) => (
                      <p key={vIdx} className="leading-relaxed pl-2">
                        {toCurvedQuotes(verse)}
                      </p>
                    ))}
                  </div>

                  {/* Repeat Antiphon */}
                  <div className="text-xs text-amber-900 font-serif italic pt-1 border-t border-amber-200/60">
                    <span className="font-cinzel font-bold not-italic mr-1">Ant.</span>
                    &ldquo;{toCurvedQuotes(psalm.antiphon)}&rdquo;
                  </div>
                </div>
              ))}
            </div>

            {/* 4. SHORT SCRIPTURE READING */}
            <div className="space-y-3 border-b border-stone-200 pb-6">
              <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-stone-200 pb-2">
                <BookOpen className="w-3.5 h-3.5 text-amber-800" />
                <span>Lectio Brevis • Short Reading ({hourData.shortReadingCitation})</span>
              </div>
              <div className={`p-4 rounded-xl bg-[#FAF8F5] border border-amber-200/60 font-serif text-stone-900 italic shadow-2xs ${getTextSizeClass()}`}>
                &ldquo;{toCurvedQuotes(hourData.shortReadingText)}&rdquo;
              </div>

              {/* Responsory */}
              <div className="space-y-1 font-serif text-stone-850 text-xs sm:text-sm pt-2 bg-stone-50 p-3 rounded-lg border border-stone-200">
                <p><span className="font-bold text-amber-900 font-cinzel">V.</span> {toCurvedQuotes(hourData.responsory.verse)}</p>
                <p><span className="font-bold text-amber-900 font-cinzel">R.</span> {toCurvedQuotes(hourData.responsory.response)}</p>
              </div>
            </div>

            {/* 5. CANTICLE (BENEDICTUS / MAGNIFICAT / NUNC DIMITTIS) */}
            {hourData.canticle && (
              <div className="space-y-4 border-b border-stone-200 pb-6">
                <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-stone-200 pb-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                  <span>Canticum Evangelicum • Gospel Canticle</span>
                </div>

                <div className="bg-amber-100/80 border-l-4 border-amber-800 p-3 rounded-r-lg shadow-2xs font-serif italic text-amber-950 text-xs sm:text-sm">
                  <span className="font-cinzel font-bold text-amber-900 not-italic uppercase tracking-wide mr-1.5">
                    Ant.
                  </span>
                  &ldquo;{toCurvedQuotes(hourData.canticle.antiphon)}&rdquo;
                </div>

                <div className="space-y-1">
                  <h4 className={`font-serif font-bold text-stone-900 ${getHeadingSizeClass()}`}>
                    {hourData.canticle.title} ({hourData.canticle.citation})
                  </h4>
                </div>

                <div className={`font-serif-sacred text-stone-900 whitespace-pre-line pl-3 border-l-2 border-amber-800/60 italic ${getTextSizeClass()}`}>
                  {toCurvedQuotes(hourData.canticle.text)}
                </div>

                <div className="text-xs text-amber-900 font-serif italic pt-1 border-t border-amber-200/60">
                  <span className="font-cinzel font-bold not-italic mr-1">Ant.</span>
                  &ldquo;{toCurvedQuotes(hourData.canticle.antiphon)}&rdquo;
                </div>
              </div>
            )}

            {/* 6. PATRISTIC READING (OFFICE OF READINGS) */}
            {hourData.patristicReading && (
              <div className="space-y-4 border-b border-stone-200 pb-6">
                <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-stone-200 pb-2">
                  <BookOpen className="w-3.5 h-3.5 text-amber-800" />
                  <span>Lectio Altera • Patristic Reading ({hourData.patristicReading.author})</span>
                </div>

                <div className="space-y-1">
                  <h4 className={`font-serif font-bold text-stone-900 ${getHeadingSizeClass()}`}>
                    {toCurvedQuotes(hourData.patristicReading.title)}
                  </h4>
                  <p className="text-xs font-cinzel text-amber-900 font-semibold">
                    From {toCurvedQuotes(hourData.patristicReading.work)}
                  </p>
                </div>

                <div className={`font-serif text-stone-850 leading-relaxed bg-[#FAF8F5] p-4 rounded-xl border border-amber-200/60 ${getTextSizeClass()}`}>
                  {toCurvedQuotes(hourData.patristicReading.text)}
                </div>

                <div className="text-xs text-stone-700 font-serif italic bg-amber-50 p-3 rounded-lg border border-amber-200/80">
                  {toCurvedQuotes(hourData.patristicReading.responsory)}
                </div>
              </div>
            )}

            {/* 7. INTERCESSIONS (PRECES) */}
            {hourData.intercessions && (() => {
              const preces = hourData.intercessions;
              return (
                <div className="space-y-4 border-b border-stone-200 pb-6">
                  <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-stone-200 pb-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                    <span>Preces • Intercessions</span>
                  </div>

                  <p className={`font-serif text-stone-850 italic ${getTextSizeClass()}`}>
                    {toCurvedQuotes(preces.introduction)}
                  </p>

                  <div className="bg-amber-100/80 border-l-4 border-amber-800 p-3 rounded-r-lg font-cinzel font-bold text-amber-950 text-xs sm:text-sm shadow-2xs">
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

                  {/* The Lord's Prayer */}
                  <div className="pt-3 space-y-1.5 bg-[#FAF7F2] p-4 rounded-xl border border-[#E8DEC8]">
                    <div className="font-cinzel font-bold text-xs text-amber-900 uppercase tracking-wide">
                      Pater Noster • The Lord's Prayer
                    </div>
                    <p className={`font-serif text-stone-900 italic ${getTextSizeClass()}`}>
                      Our Father, who art in heaven, hallowed be thy name; thy kingdom come, thy will be done on earth as it is in heaven. Give us this day our daily bread, and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.
                    </p>
                  </div>
                </div>
              );
            })()}

            {/* 8. CONCLUDING COLLECT & BENEDICTION */}
            <div className="space-y-3 pt-2">
              <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-stone-200 pb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-800" />
                <span>Oratio Conclusiva • Concluding Collect</span>
              </div>
              <p className={`font-serif text-stone-900 font-semibold leading-relaxed bg-[#FAF8F5] p-4 rounded-xl border border-amber-200/60 shadow-2xs ${getTextSizeClass()}`}>
                {toCurvedQuotes(hourData.collect)}
              </p>
              <div className="font-serif text-stone-850 text-xs sm:text-sm pt-2">
                <p className="font-cinzel font-bold text-amber-900">{hourData.conclusion}</p>
              </div>
            </div>

            {/* 9. MARIAN ANTIPHON (NIGHT PRAYER) */}
            {hourData.marianAntiphon && (
              <div className="mt-8 pt-6 border-t-2 border-amber-200/80 space-y-3 bg-[#FAF7F2] p-5 rounded-xl border border-[#E8DEC8]">
                <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                  <span>Antiphona Finalis B.M.V. • {hourData.marianAntiphon.title}</span>
                </div>
                <p className={`font-serif text-stone-900 italic leading-relaxed ${getTextSizeClass()}`}>
                  &ldquo;{toCurvedQuotes(hourData.marianAntiphon.text)}&rdquo;
                </p>
                <p className="font-cinzel font-bold text-xs text-amber-900">
                  {toCurvedQuotes(hourData.marianAntiphon.verseResponse)}
                </p>
                <p className={`font-serif text-stone-850 text-xs sm:text-sm pt-1 ${getTextSizeClass()}`}>
                  {toCurvedQuotes(hourData.marianAntiphon.collect)}
                </p>
              </div>
            )}

          </article>
        </div>
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
