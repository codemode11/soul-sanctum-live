import React, { useState, useEffect } from 'react';
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
  ChevronDown,
  ScrollText,
  PauseCircle
} from 'lucide-react';
import {
  getDivineOfficeHour,
  getIdealDivineOfficeHour,
  getDaytimeSubHourKey,
  getDaytimeSubHourLabel,
  CANONICAL_HOUR_SCHEDULE,
  GILH_QA_ITEMS,
  GilhQaGuideItem,
  OfficeHourKey,
  DaytimeSubHourKey,
  DaytimePsalmodyMode,
  DivineOfficeHourData
} from '../data/divineOffice';
import { SacredReader } from '../utils/speech';
import { toCurvedQuotes } from '../utils/typography';

const getLocalDateStr = (date: Date = new Date()): string => {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
};

interface DivineOfficeViewProps {
  currentDateStr?: string;
}

export const DivineOfficeView: React.FC<DivineOfficeViewProps> = ({ currentDateStr }) => {
  const [currentIdealHour, setCurrentIdealHour] = useState<OfficeHourKey>(() =>
    getIdealDivineOfficeHour(new Date())
  );
  const [selectedHourKey, setSelectedHourKey] = useState<OfficeHourKey>(() =>
    getIdealDivineOfficeHour(new Date())
  );
  const [hasManualHourSelection, setHasManualHourSelection] = useState<boolean>(false);
  const [selectedDateStr, setSelectedDateStr] = useState<string>(
    () => currentDateStr || getLocalDateStr(new Date())
  );
  const [daytimeSubHour, setDaytimeSubHour] = useState<DaytimeSubHourKey>(() =>
    getDaytimeSubHourKey(new Date())
  );
  const [hasManualDaytimeSubHour, setHasManualDaytimeSubHour] = useState<boolean>(false);
  const [daytimeSubHourLabel, setDaytimeSubHourLabel] = useState<string>(() =>
    getDaytimeSubHourLabel(new Date())
  );
  const [daytimePsalmodyMode, setDaytimePsalmodyMode] = useState<DaytimePsalmodyMode>('current');
  const [useComplineSundayPsalms, setUseComplineSundayPsalms] = useState<boolean>(false);
  const [useLongerReading, setUseLongerReading] = useState<boolean>(false);
  const [useAlternateSecondReading, setUseAlternateSecondReading] = useState<boolean>(false);
  const [showVigilExtension, setShowVigilExtension] = useState<boolean>(false);
  const [showTeDeumEnding, setShowTeDeumEnding] = useState<boolean>(true);
  const [useShorterVespersIntercessions, setUseShorterVespersIntercessions] = useState<boolean>(false);
  const [showConfiteorText, setShowConfiteorText] = useState<boolean>(false);
  const [gilhCategoryFilter, setGilhCategoryFilter] = useState<'All' | GilhQaGuideItem['category']>('All');

  const [viewMode, setViewMode] = useState<'native' | 'widget' | 'gilh'>('native');
  const [textSize, setTextSize] = useState<'normal' | 'medium' | 'large' | 'xlarge'>('medium');
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [copied, setCopied] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [isTopSettingsOpen, setIsTopSettingsOpen] = useState(false);
  const [hoveredHourKey, setHoveredHourKey] = useState<OfficeHourKey | null>(null);

  // Sync with parent date picker changes if provided
  useEffect(() => {
    if (currentDateStr && currentDateStr !== selectedDateStr) {
      setSelectedDateStr(currentDateStr);
      setUseAlternateSecondReading(false);
    }
  }, [currentDateStr, selectedDateStr]);

  useEffect(() => {
    const syncToCurrentTime = () => {
      const now = new Date();
      const nextDateStr = getLocalDateStr(now);
      const nextIdealHour = getIdealDivineOfficeHour(now);
      const nextDaytimeSubKey = getDaytimeSubHourKey(now);

      setCurrentIdealHour(nextIdealHour);
      setDaytimeSubHourLabel(getDaytimeSubHourLabel(now));

      if (!hasManualDaytimeSubHour) {
        setDaytimeSubHour(nextDaytimeSubKey);
      }

      if (!currentDateStr && nextDateStr !== selectedDateStr) {
        setSelectedDateStr(nextDateStr);
        setHasManualHourSelection(false);
        setSelectedHourKey(nextIdealHour);
      } else if (!hasManualHourSelection) {
        setSelectedHourKey(nextIdealHour);
      }
    };

    const interval = setInterval(syncToCurrentTime, 30000);
    window.addEventListener('focus', syncToCurrentTime);
    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', syncToCurrentTime);
    };
  }, [currentDateStr, selectedDateStr, hasManualHourSelection, hasManualDaytimeSubHour]);

  const hourData: DivineOfficeHourData = getDivineOfficeHour(selectedDateStr, selectedHourKey, {
    daytimeSubHour,
    daytimePsalmodyMode,
    useComplineSundayPsalms
  });

  const activeReadingCitation =
    useLongerReading && hourData.longerReadingOption
      ? hourData.longerReadingOption.citation
      : hourData.shortReadingCitation;
  const activeReadingText =
    useLongerReading && hourData.longerReadingOption
      ? hourData.longerReadingOption.text
      : hourData.shortReadingText;

  const activeIntercessions =
    hourData.intercessions && useShorterVespersIntercessions && hourData.intercessions.shorterForm
      ? {
          introduction: hourData.intercessions.introduction,
          response: hourData.intercessions.shorterForm.response,
          petitions: hourData.intercessions.shorterForm.petitions
        }
      : hourData.intercessions;

  const handleHourSelect = (key: OfficeHourKey) => {
    const idealNow = getIdealDivineOfficeHour(new Date());
    setSelectedHourKey(key);
    setHasManualHourSelection(key !== idealNow);
    setUseLongerReading(false);
    setUseAlternateSecondReading(false);
    setShowVigilExtension(false);
    setUseShorterVespersIntercessions(false);
    if (viewMode === 'gilh') {
      setViewMode('native');
    }
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

      if (hourData.examinationOfConscience) {
        script += `Examination of Conscience. ${hourData.examinationOfConscience.prompts.join(' ')} `;
        if (showConfiteorText) {
          script += `${hourData.examinationOfConscience.penitentialAct} `;
        }
        script += `${hourData.examinationOfConscience.absolutionPrayer} `;
      }

      script += `Hymn: ${hourData.hymnTitle}. `;

      hourData.psalms.forEach(p => {
        script += `Antiphon: ${p.antiphon}. ${p.citation}: ${p.title}. ${p.verses.join(' ')} `;
      });

      script += `${hourData.readingSectionLabel}: ${activeReadingCitation}. ${activeReadingText}. `;

      if (hourData.canticle) {
        script += `${hourData.canticle.title}. Antiphon: ${hourData.canticle.antiphon}. ${hourData.canticle.text}. `;
      }

      if (hourData.patristicReading) {
        const activePatristic =
          useAlternateSecondReading && hourData.patristicReading.alternateOption
            ? hourData.patristicReading.alternateOption
            : hourData.patristicReading;
        script += `Second Reading by ${activePatristic.author}: ${activePatristic.title}. ${activePatristic.text}. `;
      }

      if (hourData.vigilExtension && showVigilExtension) {
        script += `Vigil Canticles and Gospel: ${hourData.vigilExtension.gospelCitation}. ${hourData.vigilExtension.gospelText}. `;
      }

      if (hourData.teDeum) {
        script += `Te Deum. ${hourData.teDeum.mainText.join(' ')} `;
        if (showTeDeumEnding) {
          script += `${hourData.teDeum.optionalEndingLines.join(' ')} `;
        }
      }

      if (activeIntercessions) {
        script += `Intercessions: ${activeIntercessions.introduction}. Response: ${activeIntercessions.response}. `;
        script += activeIntercessions.petitions.join(' ') + ' ';
      }

      script += `Collect: ${hourData.collect}`;

      SacredReader.speak(script);
      setIsReadingAloud(true);
    }
  };

  const handleCopy = () => {
    let copyText = `${hourData.englishTitle.toUpperCase()}\n`;
    copyText += `Liturgy of the Hours • ${hourData.timeHint}\n\n`;
    copyText += `${hourData.introSectionLabel.toUpperCase()}:\nV. ${hourData.openingVerse}\nR. ${hourData.openingResponse}\n\n`;

    if (hourData.examinationOfConscience) {
      copyText += `EXAMINATION OF CONSCIENCE (BEFORE HYMN):\n${hourData.examinationOfConscience.prompts.map(p => `• ${p}`).join('\n')}\n`;
      if (showConfiteorText) {
        copyText += `\n${hourData.examinationOfConscience.penitentialAct}\n`;
      }
      copyText += `${hourData.examinationOfConscience.absolutionPrayer}\n\n`;
    }

    copyText += `HYMN: ${hourData.hymnTitle}\n${hourData.hymnStanzas.join('\n\n')}\n\n`;

    hourData.psalms.forEach(p => {
      copyText += `PSALMODY: ${p.citation} — ${p.title}\n`;
      if (p.subtitle) copyText += `(${p.subtitle})\n`;
      copyText += `Antiphon: "${p.antiphon}"\n${p.verses.join('\n')}\n\n`;
    });

    copyText += `${hourData.readingSectionLabel.toUpperCase()} (${activeReadingCitation}):\n"${activeReadingText}"\n\n`;

    if (hourData.canticle) {
      copyText += `CANTICLE: ${hourData.canticle.title} (${hourData.canticle.citation})\nAntiphon: "${hourData.canticle.antiphon}"\n${hourData.canticle.text}\n\n`;
    }

    if (hourData.patristicReading) {
      const activePatristic =
        useAlternateSecondReading && hourData.patristicReading.alternateOption
          ? hourData.patristicReading.alternateOption
          : hourData.patristicReading;
      copyText += `SECOND READING (${activePatristic.author}):\n"${activePatristic.title}"\n${activePatristic.text}\n\n`;
    }

    if (hourData.teDeum) {
      copyText += `TE DEUM:\n${hourData.teDeum.mainText.join('\n')}\n`;
      if (showTeDeumEnding) {
        copyText += `${hourData.teDeum.optionalEndingLines.join('\n')}\n`;
      }
      copyText += '\n';
    }

    if (activeIntercessions) {
      copyText += `INTERCESSIONS:\n${activeIntercessions.introduction}\nR. ${activeIntercessions.response}\n`;
      copyText += activeIntercessions.petitions.map(p => `• ${p}`).join('\n') + '\n\n';
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

  const dateObj = (() => {
    const parts = selectedDateStr.split('-');
    return new Date(Number(parts[0]) || 2026, (Number(parts[1]) || 11) - 1, Number(parts[2]) || 13);
  })();
  const isWeekdayMonToFri = dateObj.getDay() >= 1 && dateObj.getDay() <= 5;

  const filteredGilhItems =
    gilhCategoryFilter === 'All'
      ? GILH_QA_ITEMS
      : GILH_QA_ITEMS.filter(item => item.category === gilhCategoryFilter);

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
              {hourData.englishTitle}
              {selectedHourKey === 'daytime' && currentIdealHour === 'daytime'
                ? ` — ${daytimeSubHourLabel}`
                : ''}{' '}
              • {hourData.timeHint}
            </p>
          </div>

          {/* Lower Row: Mode Switcher & Settings Toggle Button */}
          <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-2.5 mt-auto pt-2 min-w-0 max-w-full">
            {/* View Mode Switcher */}
            <div className="inline-flex flex-wrap items-center rounded-md border border-[#8B5A2B]/60 bg-[#1C120C]/90 text-amber-100 p-0.5 shadow-xs max-w-full">
              <button
                type="button"
                onClick={() => setViewMode('native')}
                className={`h-7 px-2.5 sm:px-3 rounded-xs text-xs font-cinzel font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
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
                onClick={() => setViewMode('gilh')}
                className={`h-7 px-2.5 sm:px-3 rounded-xs text-xs font-cinzel font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  viewMode === 'gilh'
                    ? 'bg-amber-900 text-amber-50 shadow-xs font-bold'
                    : 'text-stone-300 hover:text-white hover:bg-white/10'
                }`}
                title="General Instruction of the Liturgy of the Hours (GILH) Rubrics & Q&A"
              >
                <ScrollText className="w-3.5 h-3.5 text-amber-300" />
                <span>GILH Rubrics</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('widget')}
                className={`h-7 px-2.5 sm:px-3 rounded-xs text-xs font-cinzel font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
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
                  {(['normal', 'medium', 'large', 'xlarge'] as const).map(size => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setTextSize(size)}
                      className={`px-2 py-0.5 rounded text-xs font-medium transition-colors cursor-pointer ${
                        textSize === size ? 'bg-amber-900 text-white font-bold' : 'text-stone-700 hover:text-amber-950'
                      }`}
                    >
                      {size === 'xlarge' ? 'X-Large' : size.charAt(0).toUpperCase() + size.slice(1)}
                    </button>
                  ))}
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
        <div className="flex flex-wrap items-center justify-between gap-2 pb-0.5">
          <span className="font-cinzel text-[11px] font-bold uppercase tracking-wider text-stone-700">
            Canonical Hours • Flexible Personal Rhythm
          </span>
          {selectedHourKey !== currentIdealHour ? (
            <button
              type="button"
              onClick={() => handleHourSelect(currentIdealHour)}
              className="px-2.5 py-0.5 rounded-md bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-400/70 text-[10.5px] font-cinzel font-bold transition-colors cursor-pointer"
              title="Jump back to the hour suggested for the current part of the day (no clock time is prescribed)"
            >
              Suggested Now: {CANONICAL_HOUR_SCHEDULE[currentIdealHour].label}
            </button>
          ) : (
            <span className="text-[10.5px] font-cinzel font-semibold text-amber-900">
              Suggested Now: {CANONICAL_HOUR_SCHEDULE[currentIdealHour].label} • No Clock Schedule Prescribed
            </span>
          )}
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
            const isIdealNow = currentIdealHour === key;
            const approxTime = CANONICAL_HOUR_SCHEDULE[key].approxTime;
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
                className={`relative w-full px-1.5 sm:px-3 py-2 sm:py-2.5 rounded-lg text-[10.5px] sm:text-xs font-bold transition-all cursor-pointer flex items-center justify-center text-center gap-1 sm:gap-2 border overflow-hidden bg-white shadow-xs ${
                  isSelected
                    ? 'ring-2 ring-[#8B5A2B] ring-offset-1 border-[#8B5A2B] shadow-md scale-[1.02]'
                    : 'hover:border-[#6B4423] hover:shadow-xs'
                }`}
              >
                {isIdealNow && (
                  <span
                    className="absolute top-1 right-1.5 w-1.5 h-1.5 rounded-full bg-amber-600"
                    title="Suggested for the current part of the day (no clock time is prescribed)"
                  />
                )}
                <Icon
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0"
                  style={{
                    color: isSelected ? '#B45309' : '#D4AF37',
                    strokeWidth: 2.4,
                    filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.15))',
                  }}
                />
                <span style={{ color: '#1C120C' }} className="font-bold tracking-normal leading-tight text-center flex flex-col items-center justify-center">
                  <span className="block whitespace-nowrap">{line1}</span>
                  {line2 && <span className="block whitespace-nowrap">{line2}</span>}
                  <span className="block text-[9px] sm:text-[9.5px] font-serif font-medium text-stone-500 mt-0.5 whitespace-nowrap">
                    {approxTime}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <p className="text-[11px] sm:text-xs font-serif text-stone-600 leading-snug pt-0.5">
          <span className="font-cinzel font-bold text-amber-900 uppercase tracking-wide mr-1">
            When to Say the Hours:
          </span>
          No specific clock times are prescribed. The General Instruction does not impose a rigid schedule—keeping a consistent daily time is entirely a personal choice, as there is no intrinsic significance to the clock.
        </p>

        {/* Hour-Specific GILH Controls (Daytime Sub-Hour & Psalmody, Compline Sunday Psalm option) */}
        {viewMode === 'native' && selectedHourKey === 'daytime' && (
          <div className="pt-2 border-t border-stone-300/70 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-cinzel text-[10.5px] font-bold uppercase text-stone-700">Hour:</span>
              {(
                [
                  { id: 'terce' as const, label: 'Terce (Mid-Morning)' },
                  { id: 'sext' as const, label: 'Sext (Midday)' },
                  { id: 'none' as const, label: 'None (Mid-Afternoon)' },
                ]
              ).map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setDaytimeSubHour(opt.id);
                    setHasManualDaytimeSubHour(true);
                  }}
                  className={`px-2.5 py-1 rounded-md font-cinzel text-[10.5px] font-bold border transition-colors cursor-pointer ${
                    daytimeSubHour === opt.id
                      ? 'bg-amber-900 text-amber-50 border-amber-800'
                      : 'bg-white text-stone-800 border-stone-300 hover:bg-amber-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              <span className="font-cinzel text-[10.5px] font-bold uppercase text-stone-700">Psalmody (GILH 81):</span>
              <button
                type="button"
                onClick={() => setDaytimePsalmodyMode('current')}
                className={`px-2.5 py-1 rounded-md font-cinzel text-[10.5px] font-bold border transition-colors cursor-pointer ${
                  daytimePsalmodyMode === 'current'
                    ? 'bg-amber-900 text-amber-50 border-amber-800'
                    : 'bg-white text-stone-800 border-stone-300 hover:bg-amber-50'
                }`}
              >
                Current
              </button>
              <button
                type="button"
                onClick={() => setDaytimePsalmodyMode('complementary')}
                className={`px-2.5 py-1 rounded-md font-cinzel text-[10.5px] font-bold border transition-colors cursor-pointer ${
                  daytimePsalmodyMode === 'complementary'
                    ? 'bg-amber-900 text-amber-50 border-amber-800'
                    : 'bg-white text-stone-800 border-stone-300 hover:bg-amber-50'
                }`}
                title="Gradual Psalms (Psalms 120–128) — used when praying more than one Daytime Hour, or on solemnities, Triduum & Easter Octave"
              >
                Complementary (Gradual)
              </button>
            </div>
          </div>
        )}

        {viewMode === 'native' && selectedHourKey === 'compline' && isWeekdayMonToFri && (
          <div className="pt-2 border-t border-stone-300/70 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-serif text-stone-700 text-xs">
              Night Prayer Psalms (GILH 88): Appointed weekday psalm of confidence or Sunday Psalm 91 from memory.
            </span>
            <button
              type="button"
              onClick={() => setUseComplineSundayPsalms(prev => !prev)}
              className={`px-3 py-1 rounded-md font-cinzel text-[10.5px] font-bold border transition-colors cursor-pointer ${
                useComplineSundayPsalms
                  ? 'bg-amber-900 text-amber-50 border-amber-800'
                  : 'bg-white text-stone-800 border-stone-300 hover:bg-amber-50'
              }`}
            >
              {useComplineSundayPsalms ? 'Using Sunday Psalm 91 (From Memory)' : 'Switch to Sunday Psalm 91 (Memory)'}
            </button>
          </div>
        )}
      </div>

      {/* VIEW MODE 1: NATIVE READER VIEW */}
      {viewMode === 'native' && (
        <article className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-stone-200/90 space-y-8">
          
          {/* Optional Saturday / Liturgical Context Rubric Banner */}
          {hourData.liturgicalContextNote && (
            <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-300/70 text-xs font-serif text-amber-950 leading-relaxed">
              <span className="font-cinzel font-bold text-amber-900 uppercase tracking-wide mr-1.5">
                Liturgical Note:
              </span>
              {toCurvedQuotes(hourData.liturgicalContextNote)}
            </div>
          )}

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
                {hourData.introSectionLabel}
              </div>
              <div className={`font-serif text-stone-900 space-y-1.5 ${getTextSizeClass()}`}>
                <p>
                  <span className="font-bold text-amber-900 font-cinzel">V.</span> {toCurvedQuotes(hourData.openingVerse)}
                </p>
                <p>
                  <span className="font-bold text-amber-900 font-cinzel">R.</span> {toCurvedQuotes(hourData.openingResponse)}
                </p>
              </div>
              <p className="text-xs font-serif text-stone-600 pt-1">
                {toCurvedQuotes(hourData.combiningHoursNote)}
              </p>
            </div>
          </div>

          {/* SEGMENT 1B: EXAMINATION OF CONSCIENCE (Night Prayer Only — Before Hymn per GILH 86) */}
          {hourData.examinationOfConscience && (
            <div className="space-y-3.5 border-b border-stone-200/80 pb-6 pt-1">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/80 pb-2">
                <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <PauseCircle className="w-3.5 h-3.5 text-amber-800" />
                  <span>Examination of Conscience (GILH 86)</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowConfiteorText(prev => !prev)}
                  className="px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 border border-stone-300 text-[11px] font-cinzel font-bold text-stone-800 cursor-pointer transition-colors"
                >
                  {showConfiteorText ? 'Silent Examination' : 'Include Penitential Rite (Confiteor)'}
                </button>
              </div>

              <p className="text-xs font-serif text-stone-600">
                {toCurvedQuotes(hourData.examinationOfConscience.rubricNote)}
              </p>

              <div className="p-4 sm:p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-2.5">
                <ul className={`space-y-1.5 font-serif text-stone-800 list-disc pl-5 ${getTextSizeClass()}`}>
                  {hourData.examinationOfConscience.prompts.map((prompt, idx) => (
                    <li key={idx}>{toCurvedQuotes(prompt)}</li>
                  ))}
                </ul>

                {showConfiteorText && (
                  <p className={`font-serif text-stone-900 pt-2 border-t border-stone-200 not-italic ${getTextSizeClass()}`}>
                    {toCurvedQuotes(hourData.examinationOfConscience.penitentialAct)}
                  </p>
                )}

                <p className="font-serif font-semibold text-amber-950 text-xs sm:text-sm pt-2 border-t border-stone-200">
                  {toCurvedQuotes(hourData.examinationOfConscience.absolutionPrayer)}
                </p>
              </div>
            </div>
          )}

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
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/80 pb-2">
              <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-800" />
                <span>Psalms &amp; Canticles</span>
              </div>
              <span className="text-[11px] font-serif text-stone-500">
                Captions in italics may serve as antiphons in recited Ordinary Time (GILH 111, 114)
              </span>
            </div>

            {hourData.psalmodyModeNote && (
              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 text-xs font-serif text-stone-700">
                {toCurvedQuotes(hourData.psalmodyModeNote)}
              </div>
            )}

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
                    {/* Psalm caption rendered in italics per GILH 111 */}
                    {psalm.subtitle && (
                      <p className="text-xs sm:text-sm text-amber-900 font-serif italic">
                        {toCurvedQuotes(psalm.subtitle)}
                      </p>
                    )}
                    {psalm.isSectioned && (
                      <p className="text-[11px] font-serif text-stone-500">
                        Sectioned Psalm (GILH 115, 124): Each section has its own antiphon, or the whole psalm may be prayed straight through with the first antiphon.
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

          {/* SEGMENT 4: SCRIPTURE READING (First Reading or Short/Longer Reading) */}
          <div className="space-y-3.5 border-b border-stone-200/80 pb-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/80 pb-2">
              <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-800" />
                <span>
                  {useLongerReading && hourData.longerReadingOption
                    ? `Longer Scripture Reading (${activeReadingCitation})`
                    : `${hourData.readingSectionLabel} (${activeReadingCitation})`}
                </span>
              </div>

              {hourData.longerReadingOption && (
                <div className="flex items-center gap-1 bg-stone-100 border border-stone-300 rounded-md p-0.5 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setUseLongerReading(false)}
                    className={`px-2 py-0.5 rounded font-cinzel font-bold cursor-pointer transition-colors ${
                      !useLongerReading ? 'bg-amber-900 text-amber-50' : 'text-stone-700 hover:text-amber-950'
                    }`}
                  >
                    Short Reading
                  </button>
                  <button
                    type="button"
                    onClick={() => setUseLongerReading(true)}
                    className={`px-2 py-0.5 rounded font-cinzel font-bold cursor-pointer transition-colors ${
                      useLongerReading ? 'bg-amber-900 text-amber-50' : 'text-stone-700 hover:text-amber-950'
                    }`}
                    title="Optional longer Scripture reading from the Lectionary (GILH 46, 248)"
                  >
                    Longer Reading (Mass)
                  </button>
                </div>
              )}
            </div>

            {(hourData.readingRubricNote || (useLongerReading && hourData.longerReadingOption)) && (
              <p className="text-xs font-serif text-stone-600">
                {toCurvedQuotes(
                  useLongerReading && hourData.longerReadingOption
                    ? hourData.longerReadingOption.rubricNote
                    : hourData.readingRubricNote || ''
                )}
              </p>
            )}

            {/* NO ITALICS on long scripture text */}
            <div className={`p-4 sm:p-5 rounded-xl bg-white border border-stone-200/90 font-serif text-stone-900 not-italic shadow-2xs ${getTextSizeClass()}`}>
              {toCurvedQuotes(activeReadingText)}
            </div>

            {hourData.silenceNote && (
              <p className="text-xs font-serif text-amber-900/90 flex items-center gap-1.5 px-1">
                <PauseCircle className="w-3.5 h-3.5 shrink-0 text-amber-800" />
                <span>{toCurvedQuotes(hourData.silenceNote)}</span>
              </p>
            )}

            {/* Responsory */}
            <div className="space-y-1 font-serif text-stone-850 text-xs sm:text-sm pt-2 bg-stone-50 p-3 rounded-lg border border-stone-200">
              <p><span className="font-bold text-amber-900 font-cinzel">V.</span> {toCurvedQuotes(hourData.responsory.verse)}</p>
              <p><span className="font-bold text-amber-900 font-cinzel">R.</span> {toCurvedQuotes(hourData.responsory.response)}</p>
              {hourData.responsory.omissionNote && (
                <p className="text-[11px] text-stone-600 pt-1 border-t border-stone-200/80">
                  {toCurvedQuotes(hourData.responsory.omissionNote)}
                </p>
              )}
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

          {/* SEGMENT 6: SECOND READING (Patristic / Saint Reading — Office of Readings) */}
          {hourData.patristicReading && (() => {
            const pat = hourData.patristicReading;
            const activeSecond =
              useAlternateSecondReading && pat.alternateOption ? pat.alternateOption : pat;
            return (
              <div className="space-y-4 border-b border-stone-200/80 pb-6">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/80 pb-2">
                  <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-amber-800" />
                    <span>{useAlternateSecondReading && pat.alternateOption ? pat.alternateOption.label : pat.sectionLabel}</span>
                  </div>
                  {pat.alternateOption && (
                    <button
                      type="button"
                      onClick={() => setUseAlternateSecondReading(prev => !prev)}
                      className="px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 border border-stone-300 text-[11px] font-cinzel font-bold text-stone-800 cursor-pointer transition-colors"
                    >
                      {useAlternateSecondReading ? 'Appointed Reading' : pat.alternateOption.label}
                    </button>
                  )}
                </div>

                {pat.rubricNote && (
                  <p className="text-xs font-serif text-stone-600">
                    {toCurvedQuotes(pat.rubricNote)}
                  </p>
                )}

                <div className="space-y-1">
                  <h4 className={`font-serif font-bold text-stone-900 ${getHeadingSizeClass()}`}>
                    {toCurvedQuotes(activeSecond.title)}
                  </h4>
                  <p className="text-xs font-cinzel text-amber-900 font-semibold">
                    From {toCurvedQuotes(activeSecond.work)}
                  </p>
                </div>

                {/* NO ITALICS on long patristic / hagiographical text */}
                <div className={`font-serif text-stone-850 leading-relaxed whitespace-pre-line bg-white p-4 sm:p-5 rounded-xl border border-stone-200/90 not-italic shadow-2xs ${getTextSizeClass()}`}>
                  {toCurvedQuotes(activeSecond.text)}
                </div>

                <div className="text-xs text-stone-800 font-serif bg-stone-100/80 p-3 rounded-lg border border-stone-200">
                  {toCurvedQuotes(pat.responsory)}
                </div>
              </div>
            );
          })()}

          {/* SEGMENT 6B: OPTIONAL VIGIL EXTENSION (Office of Readings — GILH 71, 73) */}
          {hourData.vigilExtension && (
            <div className="space-y-3 border-b border-stone-200/80 pb-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/80 pb-2">
                <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                  <span>Optional Vigil Extension (Sundays, Solemnities &amp; Feasts — GILH 71, 73)</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowVigilExtension(prev => !prev)}
                  className={`px-3 py-1 rounded-md border text-[11px] font-cinzel font-bold cursor-pointer transition-colors ${
                    showVigilExtension
                      ? 'bg-amber-900 text-amber-50 border-amber-800'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-300'
                  }`}
                >
                  {showVigilExtension ? 'Hide Vigil Canticles & Gospel' : 'Extend with Vigil'}
                </button>
              </div>
              <p className="text-xs font-serif text-stone-600">
                {toCurvedQuotes(hourData.vigilExtension.rubricNote)}
              </p>

              {showVigilExtension && (
                <div className="space-y-4 pt-1">
                  <div className="grid grid-cols-1 gap-3">
                    {hourData.vigilExtension.canticles.map((cant, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-[#FAF4EB] border border-[#E2D5C3] space-y-1.5">
                        <div className="font-cinzel text-xs font-bold text-amber-900">
                          {cant.title} ({cant.citation})
                        </div>
                        <p className={`font-serif text-stone-900 not-italic ${getTextSizeClass()}`}>
                          {toCurvedQuotes(cant.excerpt)}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 sm:p-5 rounded-xl bg-white border border-amber-300/80 space-y-2 shadow-2xs">
                    <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider">
                      Vigil Gospel ({hourData.vigilExtension.gospelCitation})
                    </div>
                    <p className={`font-serif text-stone-900 not-italic ${getTextSizeClass()}`}>
                      {toCurvedQuotes(hourData.vigilExtension.gospelText)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* SEGMENT 6C: TE DEUM (Office of Readings — GILH 68) */}
          {hourData.teDeum && (
            <div className="space-y-3.5 border-b border-stone-200/80 pb-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/80 pb-2">
                <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                  <span>Te Deum (Hymn of Praise — GILH 68)</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowTeDeumEnding(prev => !prev)}
                  className="px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 border border-stone-300 text-[11px] font-cinzel font-bold text-stone-800 cursor-pointer transition-colors"
                >
                  {showTeDeumEnding ? 'Omit "Save your people, Lord" Ending' : 'Include Final Petitions'}
                </button>
              </div>
              <p className="text-xs font-serif text-stone-600">
                {toCurvedQuotes(hourData.teDeum.rubricNote)}
              </p>
              <div className="p-4 sm:p-5 rounded-xl bg-[#FAF4EB] border border-[#E2D5C3] space-y-3">
                {hourData.teDeum.mainText.map((para, idx) => (
                  <p key={idx} className={`font-serif text-stone-900 not-italic ${getTextSizeClass()}`}>
                    {toCurvedQuotes(para)}
                  </p>
                ))}
                {showTeDeumEnding && (
                  <div className="pt-3 border-t border-amber-300/60 space-y-1.5">
                    <p className="text-xs font-serif text-stone-600">
                      {toCurvedQuotes(hourData.teDeum.optionalEndingNote)}
                    </p>
                    {hourData.teDeum.optionalEndingLines.map((line, idx) => (
                      <p key={idx} className={`font-serif text-stone-800 not-italic ${getTextSizeClass()}`}>
                        {toCurvedQuotes(line)}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SEGMENT 7: INTERCESSIONS & THE LORD'S PRAYER */}
          {activeIntercessions && hourData.intercessions && (
            <div className="space-y-4 border-b border-stone-200/80 pb-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/80 pb-2">
                <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                  <span>Intercessions</span>
                </div>
                {hourData.intercessions.shorterForm && (
                  <div className="flex items-center gap-1 bg-stone-100 border border-stone-300 rounded-md p-0.5 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setUseShorterVespersIntercessions(false)}
                      className={`px-2 py-0.5 rounded font-cinzel font-bold cursor-pointer transition-colors ${
                        !useShorterVespersIntercessions ? 'bg-amber-900 text-amber-50' : 'text-stone-700 hover:text-amber-950'
                      }`}
                    >
                      Standard
                    </button>
                    <button
                      type="button"
                      onClick={() => setUseShorterVespersIntercessions(true)}
                      className={`px-2 py-0.5 rounded font-cinzel font-bold cursor-pointer transition-colors ${
                        useShorterVespersIntercessions ? 'bg-amber-900 text-amber-50' : 'text-stone-700 hover:text-amber-950'
                      }`}
                      title="Shorter Evening Prayer intercession form from the appendix (GILH 188–193)"
                    >
                      Shorter Form (Appendix)
                    </button>
                  </div>
                )}
              </div>

              <p className="text-xs font-serif text-stone-600">
                {toCurvedQuotes(hourData.intercessions.methodNote)}
              </p>

              <p className={`font-serif text-stone-850 not-italic ${getTextSizeClass()}`}>
                {toCurvedQuotes(activeIntercessions.introduction)}
              </p>

              <div className="bg-amber-100/90 border-l-4 border-amber-800 p-3 rounded-r-lg font-cinzel font-bold text-amber-950 text-xs sm:text-sm shadow-2xs">
                R. {toCurvedQuotes(activeIntercessions.response)}
              </div>

              <div className="space-y-3 pt-1">
                {activeIntercessions.petitions.map((pet, idx) => (
                  <div key={idx} className={`font-serif text-stone-900 space-y-1 ${getTextSizeClass()}`}>
                    <p>• {toCurvedQuotes(pet)}</p>
                    <p className="font-cinzel font-bold text-amber-900 text-xs pl-4">
                      R. {toCurvedQuotes(activeIntercessions.response)}
                    </p>
                  </div>
                ))}
              </div>

              {/* The Lord's Prayer (Light Brown Background, NO ITALICS — GILH 194-196) */}
              <div className="pt-3 space-y-2 bg-[#FAF4EB] p-4 sm:p-5 rounded-xl border border-[#E2D5C3] shadow-2xs">
                <div className="font-cinzel font-bold text-xs text-amber-900 uppercase tracking-wide">
                  The Lord's Prayer (GILH 194–196)
                </div>
                <p className={`font-serif text-stone-900 not-italic leading-relaxed ${getTextSizeClass()}`}>
                  Our Father, who art in heaven, hallowed be thy name; thy kingdom come, thy will be done on earth as it is in heaven. Give us this day our daily bread, and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.
                </p>
              </div>
            </div>
          )}

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
            <div className="font-serif text-stone-850 text-xs sm:text-sm pt-1 space-y-1">
              <p className="font-cinzel font-bold text-amber-900">{hourData.conclusion}</p>
              {hourData.conclusionOmissionNote && (
                <p className="text-xs text-stone-600">{toCurvedQuotes(hourData.conclusionOmissionNote)}</p>
              )}
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

      {/* VIEW MODE 2: GENERAL INSTRUCTION OF THE LITURGY OF THE HOURS (GILH) RUBRICS & Q&A */}
      {viewMode === 'gilh' && (
        <section className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-stone-200/90 space-y-6">
          <div className="space-y-2 border-b border-stone-200 pb-4">
            <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
              <ScrollText className="w-4 h-4 text-amber-800" />
              <span>General Instruction of the Liturgy of the Hours (GILH)</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              Liturgical Norms, Options &amp; Rubrical Questions
            </h3>
            <p className="text-xs sm:text-sm font-serif text-stone-600">
              Essential guidelines on praying the Hours, combining with Mass, choosing readings, complementary psalmody, sacred silence, votive offices, and permitted omissions.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2">
              {(
                [
                  'All',
                  'Schedule & Hours',
                  'Readings & Vigils',
                  'Psalms & Singing',
                  'Intercessions, Silence & Structure',
                  'Adaptations, Votives & Omissions'
                ] as const
              ).map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setGilhCategoryFilter(cat)}
                  className={`px-3 py-1 rounded-md font-cinzel text-[11px] font-bold border transition-colors cursor-pointer ${
                    gilhCategoryFilter === cat
                      ? 'bg-amber-900 text-amber-50 border-amber-800'
                      : 'bg-stone-100 text-stone-800 border-stone-300 hover:bg-amber-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredGilhItems.map(item => (
              <div
                key={item.id}
                className="p-4 sm:p-5 rounded-xl bg-[#FAF4EB]/70 border border-[#E2D5C3] space-y-2 shadow-2xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-cinzel text-[10.5px] font-bold uppercase tracking-wider text-amber-900">
                    {item.category}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-amber-100 border border-amber-300/70 font-cinzel text-[10px] font-bold text-amber-950">
                    {item.gilhRef}
                  </span>
                </div>
                <h4 className="font-serif text-base sm:text-lg font-bold text-stone-900 leading-snug">
                  Q: {toCurvedQuotes(item.question)}
                </h4>
                <p className={`font-serif text-stone-800 leading-relaxed not-italic ${getTextSizeClass()}`}>
                  <span className="font-cinzel font-bold text-amber-900 mr-1.5">A:</span>
                  {toCurvedQuotes(item.answer)}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* VIEW MODE 3: DIVINE OFFICE OFFICIAL WIDGET EMBED */}
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
