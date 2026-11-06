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

  // Font size mapper
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
      case 'normal': return 'text-base sm:text-lg font-bold';
      case 'large': return 'text-xl sm:text-2xl font-bold';
      case 'xlarge': return 'text-2xl sm:text-3xl font-bold';
      case 'medium':
      default: return 'text-lg sm:text-xl font-bold';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-2.5 sm:p-4 rounded-xl bg-white/45 backdrop-blur-xl backdrop-saturate-150 border border-white/60 ring-1 ring-inset ring-white/40 shadow-[0_6px_24px_0_rgba(120,90,50,0.1)] space-y-3 mb-8">
      
      {/* COMPACT TOP HEADER BANNER */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 rounded-lg p-3 sm:p-4 text-amber-50 shadow-xs border border-stone-800 space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          {/* Left Title & Kicker */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="p-1.5 rounded-md bg-amber-950/80 border border-amber-700/50 text-amber-400 shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-amber-100 tracking-normal leading-none">
                  Divine Office
                </h2>
                <span className="font-cinzel text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-amber-900/60 text-amber-200 border border-amber-700/50">
                  Liturgia Horarum
                </span>
              </div>
              <p className="text-xs text-stone-300 font-serif italic mt-0.5">
                Official Liturgy of the Hours • {hourData.englishTitle} ({hourData.latinTitle})
              </p>
            </div>
          </div>

          {/* Right Compact Action Toolbar */}
          <div className="flex items-center gap-2 shrink-0">
            {/* View Mode Switcher */}
            <div className="inline-flex items-center rounded-md border border-[#8B5A2B]/60 bg-[#1C120C]/90 text-amber-100 p-0.5">
              <button
                type="button"
                onClick={() => setViewMode('native')}
                className={`px-2.5 py-1 rounded text-xs font-cinzel font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  viewMode === 'native'
                    ? 'bg-amber-900 text-amber-50 shadow-xs font-bold'
                    : 'text-stone-300 hover:text-white'
                }`}
                title="Reader View (App Design & Typography)"
              >
                <Layers className="w-3.5 h-3.5 text-amber-300" />
                <span>Reader</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('widget')}
                className={`px-2.5 py-1 rounded text-xs font-cinzel font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                  viewMode === 'widget'
                    ? 'bg-amber-900 text-amber-50 shadow-xs font-bold'
                    : 'text-stone-300 hover:text-white'
                }`}
                title="DivineOffice.org Live Widget Embed"
              >
                <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
                <span>Widget</span>
              </button>
            </div>

            {/* Audio Narration Toggle */}
            {viewMode === 'native' && (
              <button
                onClick={handleToggleReadAloud}
                className={`p-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer shadow-xs flex items-center justify-center ${
                  isReadingAloud
                    ? 'bg-amber-600 text-white animate-pulse'
                    : 'bg-[#5A381C] hover:bg-[#6B4423] text-amber-100 border border-[#8B5A2B]/70'
                }`}
                title={isReadingAloud ? 'Stop Audio' : 'Listen to Divine Office recitation'}
                aria-label={isReadingAloud ? 'Stop Audio' : 'Listen to Divine Office'}
              >
                {isReadingAloud ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-300" />}
              </button>
            )}

            {/* Copy Button */}
            {viewMode === 'native' && (
              <button
                onClick={handleCopy}
                className="p-1.5 rounded-md bg-stone-800 hover:bg-stone-700 text-amber-200 border border-stone-700 text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center"
                title={copied ? 'Copied to clipboard' : 'Copy prayer text to clipboard'}
                aria-label="Copy prayer text"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            )}

            {/* External Website Button */}
            <a
              href="https://divineoffice.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-md bg-[#5A381C] hover:bg-[#6B4423] text-amber-100 border border-[#8B5A2B]/70 text-xs font-cinzel transition-all flex items-center gap-1 cursor-pointer"
              title="Open DivineOffice.org"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
            </a>
          </div>
        </div>

        {/* Font Size Selector Sub-Strip */}
        {viewMode === 'native' && (
          <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-amber-200/90 font-serif italic text-xs">
              <span className="font-cinzel not-italic font-bold text-amber-400 uppercase text-[11px]">
                {hourData.englishTitle}
              </span>
              <span className="text-stone-400">•</span>
              <span>{hourData.timeHint}</span>
            </div>

            {/* Font Size Selector (S / M / L / XL) */}
            <div className="flex items-center gap-1 bg-stone-900/90 px-1.5 py-0.5 rounded border border-stone-700">
              <Type className="w-3 h-3 text-amber-400 mr-0.5" />
              {(['normal', 'medium', 'large', 'xlarge'] as const).map((sz) => (
                <button
                  key={sz}
                  onClick={() => setTextSize(sz)}
                  className={`px-1.5 py-0.5 rounded text-[10px] font-semibold transition-colors cursor-pointer ${
                    textSize === sz ? 'bg-amber-800 text-white font-bold' : 'text-stone-400 hover:text-amber-200'
                  }`}
                  title={`${sz} text size`}
                >
                  {sz === 'normal' ? 'S' : sz === 'medium' ? 'M' : sz === 'large' ? 'L' : 'XL'}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* COMPACT HOURS NAVIGATION TABS */}
      <div className="bg-white/55 backdrop-blur-xl backdrop-saturate-150 rounded-lg p-1.5 sm:p-2 border border-white/70 shadow-xs">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {/* 1. Invitatory */}
          <button
            onClick={() => handleHourSelect('invitatory')}
            className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              selectedHourKey === 'invitatory'
                ? 'bg-amber-900 text-amber-50 shadow-xs font-bold'
                : 'text-stone-700 hover:text-amber-950 hover:bg-stone-200/60'
            }`}
          >
            <Sunrise className="w-3.5 h-3.5 text-amber-500" />
            <span>Invitatory</span>
          </button>

          {/* 2. Office of Readings */}
          <button
            onClick={() => handleHourSelect('readings')}
            className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              selectedHourKey === 'readings'
                ? 'bg-amber-900 text-amber-50 shadow-xs font-bold'
                : 'text-stone-700 hover:text-amber-950 hover:bg-stone-200/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-500" />
            <span>Readings</span>
          </button>

          {/* 3. Morning Prayer (Lauds) */}
          <button
            onClick={() => handleHourSelect('lauds')}
            className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              selectedHourKey === 'lauds'
                ? 'bg-amber-900 text-amber-50 shadow-xs font-bold'
                : 'text-stone-700 hover:text-amber-950 hover:bg-stone-200/60'
            }`}
          >
            <Sun className="w-3.5 h-3.5 text-amber-500" />
            <span>Lauds (Morning)</span>
          </button>

          {/* 4. Daytime Prayer */}
          <button
            onClick={() => handleHourSelect('daytime')}
            className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              selectedHourKey === 'daytime'
                ? 'bg-amber-900 text-amber-50 shadow-xs font-bold'
                : 'text-stone-700 hover:text-amber-950 hover:bg-stone-200/60'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>Daytime</span>
          </button>

          {/* 5. Evening Prayer (Vespers) */}
          <button
            onClick={() => handleHourSelect('vespers')}
            className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              selectedHourKey === 'vespers'
                ? 'bg-amber-900 text-amber-50 shadow-xs font-bold'
                : 'text-stone-700 hover:text-amber-950 hover:bg-stone-200/60'
            }`}
          >
            <Sunset className="w-3.5 h-3.5 text-amber-500" />
            <span>Vespers (Evening)</span>
          </button>

          {/* 6. Night Prayer (Compline) */}
          <button
            onClick={() => handleHourSelect('compline')}
            className={`px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              selectedHourKey === 'compline'
                ? 'bg-amber-900 text-amber-50 shadow-xs font-bold'
                : 'text-stone-700 hover:text-amber-950 hover:bg-stone-200/60'
            }`}
          >
            <Moon className="w-3.5 h-3.5 text-amber-500" />
            <span>Compline (Night)</span>
          </button>
        </div>
      </div>

      {/* VIEW MODE 1: NATIVE READER VIEW */}
      {viewMode === 'native' && (
        <article className="bg-white rounded-lg p-4 sm:p-6 shadow-xs border border-stone-200/90 space-y-5">
          
          {/* 1. VERSICLE & RESPONSE OPENING */}
          <div className="relative p-3 sm:p-3.5 rounded-lg bg-[#FAF8F5] border border-amber-200/60 shadow-2xs space-y-1.5 overflow-hidden">
            {/* Corner Accents that follow the rounding contour */}
            <svg className="pointer-events-none absolute top-0 left-0 w-5 h-5 text-amber-800" viewBox="0 0 24 24" fill="none">
              <path d="M 20,1 H 12 A 11,11 0 0,0 1,12 V 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </svg>
            <svg className="pointer-events-none absolute top-0 right-0 w-5 h-5 text-amber-800" viewBox="0 0 24 24" fill="none">
              <path d="M 4,1 H 12 A 11,11 0 0,1 23,12 V 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </svg>
            <svg className="pointer-events-none absolute bottom-0 left-0 w-5 h-5 text-amber-800" viewBox="0 0 24 24" fill="none">
              <path d="M 20,23 H 12 A 11,11 0 0,1 1,12 V 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </svg>
            <svg className="pointer-events-none absolute bottom-0 right-0 w-5 h-5 text-amber-800" viewBox="0 0 24 24" fill="none">
              <path d="M 4,23 H 12 A 11,11 0 0,0 23,12 V 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </svg>

            <div className="font-cinzel text-[11px] font-bold text-amber-800 uppercase tracking-wider">
              Invitatorium et Introductio
            </div>
            <div className={`font-serif text-stone-900 space-y-0.5 ${getTextSizeClass()}`}>
              <p>
                <span className="font-bold text-amber-900 font-cinzel">V.</span> {toCurvedQuotes(hourData.openingVerse)}
              </p>
              <p>
                <span className="font-bold text-amber-900 font-cinzel">R.</span> {toCurvedQuotes(hourData.openingResponse)}
              </p>
            </div>
          </div>

          {/* 2. HYMN SECTION */}
          <div className="space-y-2.5 border-b border-stone-200/90 pb-4">
            <div className="flex items-center justify-between border-b border-stone-200 pb-1.5">
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
            <div className="space-y-3 pt-0.5">
              {hourData.hymnStanzas.map((stanza, idx) => (
                <p key={idx} className={`font-serif-sacred text-stone-800 pl-3 border-l-2 border-amber-800/40 italic ${getTextSizeClass()}`}>
                  {toCurvedQuotes(stanza)}
                </p>
              ))}
            </div>
          </div>

          {/* 3. PSALMODY SECTION */}
          <div className="space-y-4 border-b border-stone-200/90 pb-4">
            <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-stone-200 pb-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-800" />
              <span>Psalmodia • Psalms &amp; Canticles</span>
            </div>

            {hourData.psalms.map((psalm, idx) => (
              <div key={idx} className="space-y-2.5 bg-[#FAF7F2] p-3.5 sm:p-4 rounded-lg border border-[#E8DEC8]">
                {/* Antiphon Callout Box */}
                <div className="bg-amber-100/80 border-l-3 border-amber-800 p-2 sm:p-2.5 rounded-r-md shadow-2xs font-serif italic text-amber-950 text-xs sm:text-sm">
                  <span className="font-cinzel font-bold text-amber-900 not-italic uppercase tracking-wide mr-1.5 text-[11px]">
                    Ant.
                  </span>
                  &ldquo;{toCurvedQuotes(psalm.antiphon)}&rdquo;
                </div>

                <div className="space-y-0.5 pt-0.5">
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
                <div className={`space-y-1.5 font-serif text-stone-850 pt-1 ${getTextSizeClass()}`}>
                  {psalm.verses.map((verse, vIdx) => (
                    <p key={vIdx} className="leading-relaxed pl-1.5">
                      {toCurvedQuotes(verse)}
                    </p>
                  ))}
                </div>

                {/* Repeat Antiphon */}
                <div className="text-xs text-amber-900 font-serif italic pt-1 border-t border-amber-200/60">
                  <span className="font-cinzel font-bold not-italic mr-1 text-[11px]">Ant.</span>
                  &ldquo;{toCurvedQuotes(psalm.antiphon)}&rdquo;
                </div>
              </div>
            ))}
          </div>

          {/* 4. SHORT SCRIPTURE READING */}
          <div className="space-y-2.5 border-b border-stone-200/90 pb-4">
            <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-stone-200 pb-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-800" />
              <span>Lectio Brevis • Short Reading ({hourData.shortReadingCitation})</span>
            </div>
            <div className={`p-3 rounded-lg bg-[#FAF8F5] border border-amber-200/60 font-serif text-stone-900 italic shadow-2xs ${getTextSizeClass()}`}>
              &ldquo;{toCurvedQuotes(hourData.shortReadingText)}&rdquo;
            </div>

            {/* Responsory */}
            <div className="space-y-0.5 font-serif text-stone-850 text-xs sm:text-sm pt-1 bg-stone-50 p-2.5 rounded-md border border-stone-200">
              <p><span className="font-bold text-amber-900 font-cinzel text-xs">V.</span> {toCurvedQuotes(hourData.responsory.verse)}</p>
              <p><span className="font-bold text-amber-900 font-cinzel text-xs">R.</span> {toCurvedQuotes(hourData.responsory.response)}</p>
            </div>
          </div>

          {/* 5. CANTICLE (BENEDICTUS / MAGNIFICAT / NUNC DIMITTIS) */}
          {hourData.canticle && (
            <div className="space-y-3 border-b border-stone-200/90 pb-4">
              <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-stone-200 pb-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                <span>Canticum Evangelicum • Gospel Canticle</span>
              </div>

              <div className="bg-amber-100/80 border-l-3 border-amber-800 p-2 sm:p-2.5 rounded-r-md shadow-2xs font-serif italic text-amber-950 text-xs sm:text-sm">
                <span className="font-cinzel font-bold text-amber-900 not-italic uppercase tracking-wide mr-1.5 text-[11px]">
                  Ant.
                </span>
                &ldquo;{toCurvedQuotes(hourData.canticle.antiphon)}&rdquo;
              </div>

              <h4 className={`font-serif font-bold text-stone-900 ${getHeadingSizeClass()}`}>
                {hourData.canticle.title} ({hourData.canticle.citation})
              </h4>

              <div className={`font-serif-sacred text-stone-900 whitespace-pre-line pl-3 border-l-2 border-amber-800/60 italic ${getTextSizeClass()}`}>
                {toCurvedQuotes(hourData.canticle.text)}
              </div>

              <div className="text-xs text-amber-900 font-serif italic pt-1 border-t border-amber-200/60">
                <span className="font-cinzel font-bold not-italic mr-1 text-[11px]">Ant.</span>
                &ldquo;{toCurvedQuotes(hourData.canticle.antiphon)}&rdquo;
              </div>
            </div>
          )}

          {/* 6. PATRISTIC READING (OFFICE OF READINGS) */}
          {hourData.patristicReading && (
            <div className="space-y-3 border-b border-stone-200/90 pb-4">
              <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-stone-200 pb-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-800" />
                <span>Lectio Altera • Patristic Reading ({hourData.patristicReading.author})</span>
              </div>

              <div className="space-y-0.5">
                <h4 className={`font-serif font-bold text-stone-900 ${getHeadingSizeClass()}`}>
                  {toCurvedQuotes(hourData.patristicReading.title)}
                </h4>
                <p className="text-xs font-cinzel text-amber-900 font-semibold">
                  From {toCurvedQuotes(hourData.patristicReading.work)}
                </p>
              </div>

              <div className={`font-serif text-stone-850 leading-relaxed bg-[#FAF8F5] p-3 rounded-lg border border-amber-200/60 ${getTextSizeClass()}`}>
                {toCurvedQuotes(hourData.patristicReading.text)}
              </div>

              <div className="text-xs text-stone-700 font-serif italic bg-amber-50 p-2.5 rounded-md border border-amber-200/80">
                {toCurvedQuotes(hourData.patristicReading.responsory)}
              </div>
            </div>
          )}

          {/* 7. INTERCESSIONS (PRECES) */}
          {hourData.intercessions && (() => {
            const preces = hourData.intercessions;
            return (
              <div className="space-y-3 border-b border-stone-200/90 pb-4">
                <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-stone-200 pb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                  <span>Preces • Intercessions</span>
                </div>

                <p className={`font-serif text-stone-850 italic ${getTextSizeClass()}`}>
                  {toCurvedQuotes(preces.introduction)}
                </p>

                <div className="bg-amber-100/80 border-l-3 border-amber-800 p-2 sm:p-2.5 rounded-r-md font-cinzel font-bold text-amber-950 text-xs sm:text-sm shadow-2xs">
                  R. {toCurvedQuotes(preces.response)}
                </div>

                <div className="space-y-2 pt-0.5">
                  {preces.petitions.map((pet, idx) => (
                    <div key={idx} className={`font-serif text-stone-900 space-y-0.5 ${getTextSizeClass()}`}>
                      <p>• {toCurvedQuotes(pet)}</p>
                      <p className="font-cinzel font-bold text-amber-900 text-xs pl-3">
                        R. {toCurvedQuotes(preces.response)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* The Lord's Prayer */}
                <div className="pt-2.5 space-y-1 bg-[#FAF7F2] p-3 rounded-lg border border-[#E8DEC8]">
                  <div className="font-cinzel font-bold text-[11px] text-amber-900 uppercase tracking-wide">
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
          <div className="space-y-2 pt-1">
            <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-stone-200 pb-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-800" />
              <span>Oratio Conclusiva • Concluding Collect</span>
            </div>
            <p className={`font-serif text-stone-900 font-semibold leading-relaxed bg-[#FAF8F5] p-3 rounded-lg border border-amber-200/60 shadow-2xs ${getTextSizeClass()}`}>
              {toCurvedQuotes(hourData.collect)}
            </p>
            <div className="font-serif text-stone-850 text-xs sm:text-sm pt-1">
              <p className="font-cinzel font-bold text-amber-900">{hourData.conclusion}</p>
            </div>
          </div>

          {/* 9. MARIAN ANTIPHON (NIGHT PRAYER) */}
          {hourData.marianAntiphon && (
            <div className="mt-5 pt-4 border-t-2 border-amber-200/80 space-y-2 bg-[#FAF7F2] p-4 rounded-lg border border-[#E8DEC8]">
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
              <p className={`font-serif text-stone-850 text-xs sm:text-sm pt-0.5 ${getTextSizeClass()}`}>
                {toCurvedQuotes(hourData.marianAntiphon.collect)}
              </p>
            </div>
          )}

        </article>
      )}

      {/* VIEW MODE 2: DIVINE OFFICE OFFICIAL WIDGET EMBED */}
      {viewMode === 'widget' && (
        <section className="bg-white rounded-lg border border-stone-200/90 shadow-xs overflow-hidden space-y-2.5 p-3">
          <div className="flex items-center justify-between pb-1.5 border-b border-stone-200">
            <span className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5 text-amber-800" />
              <span>DivineOffice.org Official Embed Widget</span>
            </span>
            <button
              onClick={() => setIframeKey(prev => prev + 1)}
              className="px-2 py-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-cinzel font-semibold transition-colors flex items-center gap-1 cursor-pointer"
              title="Reload live widget"
            >
              <RefreshCw className="w-3 h-3 text-amber-800" />
              <span>Refresh</span>
            </button>
          </div>

          <div className="w-full bg-[#FAF8F5] rounded border border-stone-200 overflow-hidden">
            <iframe
              key={iframeKey}
              src="https://divineoffice.org/widget"
              title="Divine Office — Liturgy of the Hours Widget"
              className="w-full border-0 h-[680px]"
              allow="autoplay; fullscreen"
              loading="lazy"
            />
          </div>
        </section>
      )}

    </div>
  );
};

