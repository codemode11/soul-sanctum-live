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
  GILH_QA_ITEMS,
  GilhQaGuideItem,
  OfficeHourKey,
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

const AUDIO_SPEEDS = [1.0, 1.25, 1.6, 2.0] as const;

const WIDGET_HOURS: { key: OfficeHourKey; label: string; Icon: React.FC<{ className?: string }> }[] = [
  { key: 'invitatory', label: 'Invitatory', Icon: Sunrise },
  { key: 'readings', label: 'Office of Readings', Icon: BookOpen },
  { key: 'lauds', label: 'Morning Prayer', Icon: Sun },
  { key: 'midmorning', label: 'Midmorning Prayer', Icon: Sun },
  { key: 'midday', label: 'Midday Prayer', Icon: Clock },
  { key: 'midafternoon', label: 'Midafternoon Prayer', Icon: Clock },
  { key: 'vespers', label: 'Evening Prayer', Icon: Sunset },
  { key: 'compline', label: 'Night Prayer', Icon: Moon },
];

const RUBRIC_CATEGORIES: { id: 'All' | GilhQaGuideItem['category']; label: string }[] = [
  { id: 'All', label: 'All' },
  { id: 'Schedule & Hours', label: 'Schedule' },
  { id: 'Readings & Vigils', label: 'Readings' },
  { id: 'Psalms & Singing', label: 'Psalms' },
  { id: 'Intercessions, Silence & Structure', label: 'Structure' },
  { id: 'Adaptations, Votives & Omissions', label: 'Adaptations' },
];

interface DivineOfficeViewProps {
  currentDateStr?: string;
}

export const DivineOfficeView: React.FC<DivineOfficeViewProps> = ({ currentDateStr }) => {
  const [selectedHourKey, setSelectedHourKey] = useState<OfficeHourKey>(() =>
    getIdealDivineOfficeHour(new Date())
  );
  const [hasManualHourSelection, setHasManualHourSelection] = useState<boolean>(false);
  const [selectedDateStr, setSelectedDateStr] = useState<string>(
    () => currentDateStr || getLocalDateStr(new Date())
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
  const [audioSpeedIdx, setAudioSpeedIdx] = useState<number>(0);
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [copied, setCopied] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);
  const [isTopSettingsOpen, setIsTopSettingsOpen] = useState(false);

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
  }, [currentDateStr, selectedDateStr, hasManualHourSelection]);

  const hourData: DivineOfficeHourData = getDivineOfficeHour(selectedDateStr, selectedHourKey, {
    daytimePsalmodyMode,
    useComplineSundayPsalms
  });

  const isDaytimeHour =
    selectedHourKey === 'midmorning' ||
    selectedHourKey === 'midday' ||
    selectedHourKey === 'midafternoon';

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
    if (viewMode !== 'native') {
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
      return;
    }

    let script = `${hourData.englishTitle}. ${hourData.liturgicalDay}. `;
    script += `${hourData.openingVerse}. ${hourData.openingResponse}. `;

    if (hourData.examinationOfConscience) {
      script += `Examination of Conscience. ${hourData.examinationOfConscience.prompts.join(' ')} `;
      if (showConfiteorText) {
        script += `${hourData.examinationOfConscience.penitentialAct} `;
      }
      script += `${hourData.examinationOfConscience.absolutionPrayer} `;
    }

    if (hourData.hymnTitle) {
      script += `Hymn: ${hourData.hymnTitle}. `;
    }

    hourData.psalms.forEach(p => {
      script += `Antiphon: ${p.antiphon}. ${p.citation}: ${p.title}. ${p.verses.join(' ')} `;
      if (p.psalmPrayer) {
        script += `${p.psalmPrayer} `;
      }
    });

    if (hourData.psalmodyTransitionVerse) {
      script += `${hourData.psalmodyTransitionVerse.verse} ${hourData.psalmodyTransitionVerse.response} `;
    }

    if (hourData.readingSectionLabel && activeReadingText) {
      script += `${hourData.readingSectionLabel}: ${activeReadingCitation || ''}. ${activeReadingText}. `;
    }

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
      script += `Vigil Gospel: ${hourData.vigilExtension.gospelCitation}. ${hourData.vigilExtension.gospelText}. `;
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

    if (hourData.collect) {
      script += `Concluding Prayer: ${hourData.collect}`;
    }

    const playbackRate = AUDIO_SPEEDS[audioSpeedIdx] || 1.0;
    SacredReader.speak(script, () => setIsReadingAloud(false), playbackRate);
    setIsReadingAloud(true);
  };

  const handleCycleSpeed = () => {
    setAudioSpeedIdx(prev => (prev + 1) % AUDIO_SPEEDS.length);
  };

  const handleCopy = () => {
    let copyText = `${hourData.englishTitle.toUpperCase()}\n`;
    copyText += `${hourData.liturgicalDay} • ${hourData.formattedDate}\n\n`;
    copyText += `V. ${hourData.openingVerse}\nR. ${hourData.openingResponse}\n\n`;

    if (hourData.examinationOfConscience) {
      copyText += `EXAMINATION OF CONSCIENCE:\n${hourData.examinationOfConscience.prompts.map(p => `• ${p}`).join('\n')}\n`;
      if (showConfiteorText) {
        copyText += `\n${hourData.examinationOfConscience.penitentialAct}\n`;
      }
      copyText += `${hourData.examinationOfConscience.absolutionPrayer}\n\n`;
    }

    if (hourData.hymnTitle && hourData.hymnStanzas) {
      copyText += `HYMN: ${hourData.hymnTitle}\n${hourData.hymnStanzas.join('\n\n')}\n\n`;
    }

    hourData.psalms.forEach(p => {
      copyText += `PSALMODY: ${p.citation} — ${p.title}\n`;
      if (p.subtitle) copyText += `${p.subtitle}\n`;
      copyText += `Antiphon: "${p.antiphon}"\n${p.verses.join('\n')}\n`;
      if (p.psalmPrayer) copyText += `Psalm-prayer: ${p.psalmPrayer}\n`;
      copyText += '\n';
    });

    if (hourData.psalmodyTransitionVerse) {
      copyText += `V. ${hourData.psalmodyTransitionVerse.verse}\nR. ${hourData.psalmodyTransitionVerse.response}\n\n`;
    }

    if (hourData.readingSectionLabel && activeReadingText) {
      copyText += `${hourData.readingSectionLabel.toUpperCase()} (${activeReadingCitation || ''}):\n${activeReadingText}\n\n`;
    }

    if (hourData.canticle) {
      copyText += `CANTICLE: ${hourData.canticle.title} (${hourData.canticle.citation})\nAntiphon: "${hourData.canticle.antiphon}"\n${hourData.canticle.text}\n\n`;
    }

    if (hourData.patristicReading) {
      const activePatristic =
        useAlternateSecondReading && hourData.patristicReading.alternateOption
          ? hourData.patristicReading.alternateOption
          : hourData.patristicReading;
      copyText += `SECOND READING (${activePatristic.author}):\n${activePatristic.title}\n${activePatristic.text}\n\n`;
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

    if (hourData.collect) {
      copyText += `CONCLUDING PRAYER:\n${hourData.collect}\n\n`;
    }
    if (hourData.conclusion) {
      copyText += `${hourData.conclusion}`;
    }

    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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

      {/* TOP CONTAINER: Banner + Settings */}
      <div className="bg-white/55 backdrop-blur-xl backdrop-saturate-150 rounded-xl shadow-xs border border-white/70 ring-1 ring-inset ring-white/40 relative z-20">

        {/* RECTANGLE 1: Main Title Banner */}
        <div className={`sanctum-top-banner px-5 pt-4 pb-4 sm:px-6 min-h-[156px] bg-gradient-to-r from-stone-900 to-stone-800 text-stone-100 flex flex-col justify-between ${isTopSettingsOpen ? 'rounded-t-xl' : 'rounded-xl'}`}>
          <div className="space-y-1.5 my-auto">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-amber-200/90">
                Liturgy of the Hours
              </span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-normal text-amber-100 leading-tight">
              Divine Office
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 font-serif font-medium">
              {toCurvedQuotes(hourData.liturgicalDay)} · {hourData.formattedDate}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-2.5 mt-auto pt-2 min-w-0 max-w-full">
            <div className="inline-flex items-center rounded-md border border-[#8B5A2B]/60 bg-[#1C120C]/90 text-amber-100 p-0.5 shadow-xs">
              <button
                type="button"
                onClick={() => setViewMode('native')}
                className={`h-8 px-3 rounded-xs text-xs font-cinzel font-semibold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  viewMode === 'native'
                    ? 'bg-amber-900 text-amber-50 shadow-xs font-bold'
                    : 'text-stone-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Layers className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span>Reader</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('gilh')}
                className={`h-8 px-3 rounded-xs text-xs font-cinzel font-semibold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  viewMode === 'gilh'
                    ? 'bg-amber-900 text-amber-50 shadow-xs font-bold'
                    : 'text-stone-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <ScrollText className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span>Rubrics</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('widget')}
                className={`h-8 px-3 rounded-xs text-xs font-cinzel font-semibold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  viewMode === 'widget'
                    ? 'bg-amber-900 text-amber-50 shadow-xs font-bold'
                    : 'text-stone-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <ExternalLink className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span>Widget</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsTopSettingsOpen(prev => !prev)}
              aria-expanded={isTopSettingsOpen}
              className={`h-9 flex items-center gap-1.5 px-3 rounded-md transition-all cursor-pointer shrink-0 border whitespace-nowrap ${
                isTopSettingsOpen
                  ? 'bg-[#25170F] text-[#F7EBE1] border-[#D4A373] ring-2 ring-[#8B5A2B]/40'
                  : 'bg-[#1C120C]/90 hover:bg-[#25170F] text-[#D4A373] hover:text-[#F7EBE1] border-[#8B5A2B]/50 hover:border-[#D4A373]/70'
              }`}
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

        {/* RECTANGLE 2: Clean Settings Panel */}
        {isTopSettingsOpen && (
          <div className="px-5 py-3 sm:px-6 bg-white/55 backdrop-blur-md border-t border-white/60 rounded-b-xl">
            <div className="flex flex-wrap items-center justify-between gap-2.5 p-2 rounded-lg bg-stone-100/90 border border-stone-200 shadow-2xs text-xs text-stone-700">
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={handleToggleReadAloud}
                  className={`h-8 flex items-center gap-1.5 px-3 rounded-md text-xs font-semibold transition-all cursor-pointer shadow-xs whitespace-nowrap ${
                    isReadingAloud
                      ? 'bg-[#6B4423] text-white'
                      : 'bg-[#5A381C] hover:bg-[#6B4423] text-amber-100 border border-[#8B5A2B]/70'
                  }`}
                >
                  {isReadingAloud ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-300" />}
                  <span>{isReadingAloud ? 'Stop' : 'Listen'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleCycleSpeed}
                  className="h-8 px-2.5 rounded-md bg-white hover:bg-stone-50 border border-stone-300 text-xs font-semibold text-stone-800 tabular-nums cursor-pointer transition-colors whitespace-nowrap"
                  title="Playback speed"
                >
                  {AUDIO_SPEEDS[audioSpeedIdx]}×
                </button>
              </div>

              <div className="flex items-center bg-stone-200/90 border border-stone-300 rounded-md p-0.5 text-xs shrink-0">
                {(
                  [
                    { id: 'normal' as const, label: 'S' },
                    { id: 'medium' as const, label: 'M' },
                    { id: 'large' as const, label: 'L' },
                    { id: 'xlarge' as const, label: 'XL' },
                  ]
                ).map(size => (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => setTextSize(size.id)}
                    className={`h-7 px-2.5 rounded text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                      textSize === size.id ? 'bg-amber-900 text-white' : 'text-stone-700 hover:text-amber-950'
                    }`}
                  >
                    {size.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleCopy}
                  className="h-8 px-3 rounded-md bg-stone-800 hover:bg-stone-700 text-amber-200 border border-stone-700 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>

                <a
                  href="https://divineoffice.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 px-3 rounded-md bg-[#5A381C] hover:bg-[#6B4423] text-amber-100 border border-[#8B5A2B]/70 text-xs font-cinzel font-semibold transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <span>DivineOffice.org</span>
                  <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* RECTANGLE 3: CLEAN HOURS GRID */}
      <div className="bg-white/55 backdrop-blur-xl backdrop-saturate-150 rounded-xl p-3 sm:p-4 border border-white/70 ring-1 ring-inset ring-white/40 shadow-[0_8px_32px_0_rgba(120,90,50,0.12)]">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full">
          {WIDGET_HOURS.map(({ key, label, Icon }) => {
            const isSelected = selectedHourKey === key && viewMode !== 'gilh';
            return (
              <button
                key={key}
                type="button"
                onClick={() => handleHourSelect(key)}
                className={`min-h-[42px] px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 border bg-white whitespace-nowrap ${
                  isSelected
                    ? 'border-[#8B5A2B] ring-2 ring-[#8B5A2B]/70 text-[#1C120C] shadow-sm'
                    : 'border-stone-300 text-stone-800 hover:border-[#6B4423] hover:bg-stone-50/80'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isSelected ? 'text-[#B45309]' : 'text-[#B8860B]'
                  }`}
                />
                <span className="truncate">{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* VIEW MODE 1: NATIVE READER VIEW */}
      {viewMode === 'native' && (
        <article className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-stone-200/90 space-y-8">
          {/* Hour Heading & Quick Audio Control */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {hourData.englishTitle}
            </h3>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleToggleReadAloud}
                className={`h-9 px-3.5 rounded-md text-xs font-cinzel font-bold transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  isReadingAloud
                    ? 'bg-amber-900 text-white'
                    : 'bg-[#FAF4EB] hover:bg-amber-100 text-amber-950 border border-[#E2D5C3]'
                }`}
              >
                {isReadingAloud ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-800" />}
                <span>{isReadingAloud ? 'Stop' : 'Listen'}</span>
              </button>
              <button
                type="button"
                onClick={handleCycleSpeed}
                className="h-9 px-2.5 rounded-md bg-stone-100 hover:bg-stone-200 border border-stone-200 text-xs font-semibold text-stone-700 tabular-nums cursor-pointer transition-colors whitespace-nowrap"
                title="Playback speed"
              >
                {AUDIO_SPEEDS[audioSpeedIdx]}×
              </button>
            </div>
          </div>

          {/* INTRODUCTION */}
          <div className="relative p-4 sm:p-5 rounded-xl bg-[#FAF4EB] border border-[#E2D5C3] shadow-2xs overflow-hidden">
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
            </div>
          </div>

          {/* EXAMINATION OF CONSCIENCE (Night Prayer) */}
          {hourData.examinationOfConscience && (
            <div className="space-y-3.5 border-b border-stone-200/80 pb-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/80 pb-2">
                <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <PauseCircle className="w-3.5 h-3.5 text-amber-800" />
                  <span>Examination of Conscience</span>
                </div>
                <div className="inline-flex items-center rounded-md bg-stone-100 border border-stone-200 p-0.5 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setShowConfiteorText(false)}
                    className={`px-2.5 py-1 rounded font-cinzel font-bold cursor-pointer transition-colors whitespace-nowrap ${
                      !showConfiteorText ? 'bg-amber-900 text-amber-50' : 'text-stone-700 hover:text-amber-950'
                    }`}
                  >
                    Silent
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowConfiteorText(true)}
                    className={`px-2.5 py-1 rounded font-cinzel font-bold cursor-pointer transition-colors whitespace-nowrap ${
                      showConfiteorText ? 'bg-amber-900 text-amber-50' : 'text-stone-700 hover:text-amber-950'
                    }`}
                  >
                    Confiteor
                  </button>
                </div>
              </div>

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

          {/* HYMN */}
          {hourData.hymnTitle && hourData.hymnStanzas && (
            <div className="space-y-3.5 border-b border-stone-200/80 pb-6">
              <div className="flex items-center justify-between border-b border-stone-200/80 pb-2">
                <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                  <span>Hymn</span>
                </div>
                {hourData.hymnAuthor && (
                  <span className="text-xs text-stone-500 font-serif">
                    {hourData.hymnAuthor}
                  </span>
                )}
              </div>
              <h4 className={`font-serif font-bold text-stone-900 ${getHeadingSizeClass()}`}>
                {toCurvedQuotes(hourData.hymnTitle)}
              </h4>
              <div className="space-y-4 pt-1">
                {hourData.hymnStanzas.map((stanza, idx) => (
                  <p key={idx} className={`font-serif text-stone-850 pl-4 border-l border-amber-800/40 not-italic ${getTextSizeClass()}`}>
                    {toCurvedQuotes(stanza)}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* PSALMODY */}
          <div className="space-y-6 border-b border-stone-200/80 pb-6">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/80 pb-2">
              <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-amber-800" />
                <span>Psalmody</span>
              </div>

              {isDaytimeHour && (
                <div className="inline-flex items-center rounded-md bg-stone-100 border border-stone-200 p-0.5 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setDaytimePsalmodyMode('current')}
                    className={`px-2.5 py-1 rounded font-cinzel font-bold cursor-pointer transition-colors whitespace-nowrap ${
                      daytimePsalmodyMode === 'current' ? 'bg-amber-900 text-amber-50' : 'text-stone-700 hover:text-amber-950'
                    }`}
                  >
                    Current
                  </button>
                  <button
                    type="button"
                    onClick={() => setDaytimePsalmodyMode('complementary')}
                    className={`px-2.5 py-1 rounded font-cinzel font-bold cursor-pointer transition-colors whitespace-nowrap ${
                      daytimePsalmodyMode === 'complementary' ? 'bg-amber-900 text-amber-50' : 'text-stone-700 hover:text-amber-950'
                    }`}
                  >
                    Complementary
                  </button>
                </div>
              )}

              {selectedHourKey === 'compline' && isWeekdayMonToFri && (
                <div className="inline-flex items-center rounded-md bg-stone-100 border border-stone-200 p-0.5 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setUseComplineSundayPsalms(false)}
                    className={`px-2.5 py-1 rounded font-cinzel font-bold cursor-pointer transition-colors whitespace-nowrap ${
                      !useComplineSundayPsalms ? 'bg-amber-900 text-amber-50' : 'text-stone-700 hover:text-amber-950'
                    }`}
                  >
                    Weekday
                  </button>
                  <button
                    type="button"
                    onClick={() => setUseComplineSundayPsalms(true)}
                    className={`px-2.5 py-1 rounded font-cinzel font-bold cursor-pointer transition-colors whitespace-nowrap ${
                      useComplineSundayPsalms ? 'bg-amber-900 text-amber-50' : 'text-stone-700 hover:text-amber-950'
                    }`}
                  >
                    Sunday Ps 91
                  </button>
                </div>
              )}
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
                  <div className="bg-amber-100/80 border border-amber-300/70 p-3 rounded-lg font-serif text-amber-950 text-xs sm:text-sm">
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
                      <p className="text-xs sm:text-sm text-amber-900 font-serif italic">
                        {toCurvedQuotes(psalm.subtitle)}
                      </p>
                    )}
                  </div>

                  <div className={`space-y-2 font-serif text-stone-850 pt-1 not-italic ${getTextSizeClass()}`}>
                    {psalm.verses.map((verse, vIdx) => (
                      <p key={vIdx} className="leading-relaxed pl-2">
                        {toCurvedQuotes(verse)}
                      </p>
                    ))}
                  </div>

                  {psalm.psalmPrayer && (
                    <div className="pt-2 border-t border-amber-200/60 font-serif text-stone-700 text-xs sm:text-sm">
                      <span className="font-cinzel font-bold text-amber-900 uppercase tracking-wide mr-1.5">
                        Psalm-prayer
                      </span>
                      <span>{toCurvedQuotes(psalm.psalmPrayer)}</span>
                    </div>
                  )}

                  <div className="text-xs text-amber-900 font-serif pt-1 border-t border-amber-200/60">
                    <span className="font-cinzel font-bold mr-1.5">Antiphon</span>
                    <span className="italic">&ldquo;{toCurvedQuotes(psalm.antiphon)}&rdquo;</span>
                  </div>
                </div>
              );
            })}

            {hourData.psalmodyTransitionVerse && (
              <div className="p-3.5 rounded-lg bg-stone-50 border border-stone-200 font-serif text-stone-900 text-xs sm:text-sm space-y-1">
                <p><span className="font-bold text-amber-900 font-cinzel">V.</span> {toCurvedQuotes(hourData.psalmodyTransitionVerse.verse)}</p>
                <p><span className="font-bold text-amber-900 font-cinzel">R.</span> {toCurvedQuotes(hourData.psalmodyTransitionVerse.response)}</p>
              </div>
            )}
          </div>

          {/* SCRIPTURE READING */}
          {hourData.readingSectionLabel && activeReadingText && (
            <div className="space-y-3.5 border-b border-stone-200/80 pb-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/80 pb-2">
                <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-amber-800" />
                  <span>{hourData.readingSectionLabel} · {activeReadingCitation}</span>
                </div>

                {hourData.longerReadingOption && (
                  <div className="inline-flex items-center rounded-md bg-stone-100 border border-stone-200 p-0.5 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setUseLongerReading(false)}
                      className={`px-2.5 py-1 rounded font-cinzel font-bold cursor-pointer transition-colors whitespace-nowrap ${
                        !useLongerReading ? 'bg-amber-900 text-amber-50' : 'text-stone-700 hover:text-amber-950'
                      }`}
                    >
                      Short
                    </button>
                    <button
                      type="button"
                      onClick={() => setUseLongerReading(true)}
                      className={`px-2.5 py-1 rounded font-cinzel font-bold cursor-pointer transition-colors whitespace-nowrap ${
                        useLongerReading ? 'bg-amber-900 text-amber-50' : 'text-stone-700 hover:text-amber-950'
                      }`}
                    >
                      Longer
                    </button>
                  </div>
                )}
              </div>

              <div className={`p-4 sm:p-5 rounded-xl bg-white border border-stone-200/90 font-serif text-stone-900 not-italic shadow-2xs ${getTextSizeClass()}`}>
                {toCurvedQuotes(activeReadingText)}
              </div>

              {hourData.silenceNote && (
                <p className="text-xs font-cinzel font-semibold text-amber-900/80 tracking-wide uppercase px-1">
                  {hourData.silenceNote}
                </p>
              )}

              {hourData.responsory && (
                <div className="space-y-1 font-serif text-stone-850 text-xs sm:text-sm pt-2 bg-stone-50 p-3.5 rounded-lg border border-stone-200">
                  <p><span className="font-bold text-amber-900 font-cinzel">V.</span> {toCurvedQuotes(hourData.responsory.verse)}</p>
                  <p><span className="font-bold text-amber-900 font-cinzel">R.</span> {toCurvedQuotes(hourData.responsory.response)}</p>
                </div>
              )}
            </div>
          )}

          {/* GOSPEL CANTICLE */}
          {hourData.canticle && (
            <div className="space-y-4 border-b border-stone-200/80 pb-6">
              <div className="flex items-center justify-between border-b border-stone-200/80 pb-2">
                <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                  <span>Gospel Canticle</span>
                </div>
              </div>

              <div className="space-y-3.5 p-4 sm:p-5 rounded-xl bg-[#FAF4EB] border border-[#E2D5C3] shadow-2xs">
                <div className="bg-amber-100/80 border border-amber-300/70 p-3 rounded-lg font-serif text-amber-950 text-xs sm:text-sm">
                  <span className="font-cinzel font-bold text-amber-900 not-italic uppercase tracking-wide mr-1.5">
                    Antiphon
                  </span>
                  <span className="italic">&ldquo;{toCurvedQuotes(hourData.canticle.antiphon)}&rdquo;</span>
                </div>

                <h4 className={`font-serif font-bold text-stone-900 ${getHeadingSizeClass()}`}>
                  {hourData.canticle.title} ({hourData.canticle.citation})
                </h4>

                <div className={`font-serif text-stone-900 whitespace-pre-line pl-3 border-l border-amber-800/40 not-italic ${getTextSizeClass()}`}>
                  {toCurvedQuotes(hourData.canticle.text)}
                </div>

                <div className="text-xs text-amber-900 font-serif pt-1 border-t border-amber-200/60">
                  <span className="font-cinzel font-bold mr-1.5">Antiphon</span>
                  <span className="italic">&ldquo;{toCurvedQuotes(hourData.canticle.antiphon)}&rdquo;</span>
                </div>
              </div>
            </div>
          )}

          {/* SECOND READING (Office of Readings) */}
          {hourData.patristicReading && (() => {
            const pat = hourData.patristicReading;
            const activeSecond =
              useAlternateSecondReading && pat.alternateOption ? pat.alternateOption : pat;
            return (
              <div className="space-y-4 border-b border-stone-200/80 pb-6">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/80 pb-2">
                  <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-amber-800" />
                    <span>{pat.sectionLabel}</span>
                  </div>
                  {pat.alternateOption && (
                    <div className="inline-flex items-center rounded-md bg-stone-100 border border-stone-200 p-0.5 text-[11px]">
                      <button
                        type="button"
                        onClick={() => setUseAlternateSecondReading(false)}
                        className={`px-2.5 py-1 rounded font-cinzel font-bold cursor-pointer transition-colors whitespace-nowrap ${
                          !useAlternateSecondReading ? 'bg-amber-900 text-amber-50' : 'text-stone-700 hover:text-amber-950'
                        }`}
                      >
                        Appointed
                      </button>
                      <button
                        type="button"
                        onClick={() => setUseAlternateSecondReading(true)}
                        className={`px-2.5 py-1 rounded font-cinzel font-bold cursor-pointer transition-colors whitespace-nowrap ${
                          useAlternateSecondReading ? 'bg-amber-900 text-amber-50' : 'text-stone-700 hover:text-amber-950'
                        }`}
                      >
                        {pat.alternateOption.label}
                      </button>
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <h4 className={`font-serif font-bold text-stone-900 ${getHeadingSizeClass()}`}>
                    {toCurvedQuotes(activeSecond.title)}
                  </h4>
                  <p className="text-xs font-cinzel text-amber-900 font-semibold">
                    {toCurvedQuotes(activeSecond.work)}
                  </p>
                </div>

                <div className={`font-serif text-stone-850 leading-relaxed whitespace-pre-line bg-white p-4 sm:p-5 rounded-xl border border-stone-200/90 not-italic shadow-2xs ${getTextSizeClass()}`}>
                  {toCurvedQuotes(activeSecond.text)}
                </div>

                <div className="text-xs text-stone-800 font-serif bg-stone-100/80 p-3 rounded-lg border border-stone-200">
                  {toCurvedQuotes(pat.responsory)}
                </div>
              </div>
            );
          })()}

          {/* VIGIL (Office of Readings on eligible days) */}
          {hourData.vigilExtension && (
            <div className="space-y-3 border-b border-stone-200/80 pb-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/80 pb-2">
                <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                  <span>Vigil</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowVigilExtension(prev => !prev)}
                  className={`px-3 py-1 rounded-md border text-[11px] font-cinzel font-bold cursor-pointer transition-colors whitespace-nowrap ${
                    showVigilExtension
                      ? 'bg-amber-900 text-amber-50 border-amber-800'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-300'
                  }`}
                >
                  {showVigilExtension ? 'Hide' : 'Extend'}
                </button>
              </div>

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
                      Gospel · {hourData.vigilExtension.gospelCitation}
                    </div>
                    <p className={`font-serif text-stone-900 not-italic ${getTextSizeClass()}`}>
                      {toCurvedQuotes(hourData.vigilExtension.gospelText)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TE DEUM (Office of Readings when eligible) */}
          {hourData.teDeum && (
            <div className="space-y-3.5 border-b border-stone-200/80 pb-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/80 pb-2">
                <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                  <span>Te Deum</span>
                </div>
                <div className="inline-flex items-center rounded-md bg-stone-100 border border-stone-200 p-0.5 text-[11px]">
                  <button
                    type="button"
                    onClick={() => setShowTeDeumEnding(true)}
                    className={`px-2.5 py-1 rounded font-cinzel font-bold cursor-pointer transition-colors whitespace-nowrap ${
                      showTeDeumEnding ? 'bg-amber-900 text-amber-50' : 'text-stone-700 hover:text-amber-950'
                    }`}
                  >
                    Full
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowTeDeumEnding(false)}
                    className={`px-2.5 py-1 rounded font-cinzel font-bold cursor-pointer transition-colors whitespace-nowrap ${
                      !showTeDeumEnding ? 'bg-amber-900 text-amber-50' : 'text-stone-700 hover:text-amber-950'
                    }`}
                  >
                    Short
                  </button>
                </div>
              </div>
              <div className="p-4 sm:p-5 rounded-xl bg-[#FAF4EB] border border-[#E2D5C3] space-y-3">
                {hourData.teDeum.mainText.map((para, idx) => (
                  <p key={idx} className={`font-serif text-stone-900 not-italic ${getTextSizeClass()}`}>
                    {toCurvedQuotes(para)}
                  </p>
                ))}
                {showTeDeumEnding && (
                  <div className="pt-3 border-t border-amber-300/60 space-y-1.5">
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

          {/* INTERCESSIONS & THE LORD'S PRAYER */}
          {activeIntercessions && hourData.intercessions && (
            <div className="space-y-4 border-b border-stone-200/80 pb-6">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200/80 pb-2">
                <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                  <span>{hourData.intercessionsSectionLabel || 'Intercessions'}</span>
                </div>
                {hourData.intercessions.shorterForm && (
                  <div className="inline-flex items-center rounded-md bg-stone-100 border border-stone-200 p-0.5 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setUseShorterVespersIntercessions(false)}
                      className={`px-2.5 py-1 rounded font-cinzel font-bold cursor-pointer transition-colors whitespace-nowrap ${
                        !useShorterVespersIntercessions ? 'bg-amber-900 text-amber-50' : 'text-stone-700 hover:text-amber-950'
                      }`}
                    >
                      Standard
                    </button>
                    <button
                      type="button"
                      onClick={() => setUseShorterVespersIntercessions(true)}
                      className={`px-2.5 py-1 rounded font-cinzel font-bold cursor-pointer transition-colors whitespace-nowrap ${
                        useShorterVespersIntercessions ? 'bg-amber-900 text-amber-50' : 'text-stone-700 hover:text-amber-950'
                      }`}
                    >
                      Shorter
                    </button>
                  </div>
                )}
              </div>

              <p className={`font-serif text-stone-850 not-italic ${getTextSizeClass()}`}>
                {toCurvedQuotes(activeIntercessions.introduction)}
              </p>

              <div className="bg-amber-100/80 border border-amber-300/70 p-3 rounded-lg font-cinzel font-bold text-amber-950 text-xs sm:text-sm shadow-2xs">
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

              <div className="pt-3 space-y-2 bg-[#FAF4EB] p-4 sm:p-5 rounded-xl border border-[#E2D5C3] shadow-2xs">
                <div className="font-cinzel font-bold text-xs text-amber-900 uppercase tracking-wide">
                  The Lord's Prayer
                </div>
                <p className={`font-serif text-stone-900 not-italic leading-relaxed ${getTextSizeClass()}`}>
                  Our Father, who art in heaven, hallowed be thy name; thy kingdom come, thy will be done on earth as it is in heaven. Give us this day our daily bread, and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.
                </p>
              </div>
            </div>
          )}

          {/* CONCLUDING PRAYER & DISMISSAL */}
          {(hourData.collect || hourData.conclusion) && (
            <div className="space-y-3 pt-2 border-b border-stone-200/80 pb-6">
              <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5 border-b border-stone-200/80 pb-2">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-800" />
                <span>Concluding Prayer</span>
              </div>
              {hourData.collect && (
                <p className={`font-serif text-stone-900 font-semibold leading-relaxed bg-white p-4 sm:p-5 rounded-xl border border-stone-200/90 not-italic shadow-2xs ${getTextSizeClass()}`}>
                  {toCurvedQuotes(hourData.collect)}
                </p>
              )}
              {hourData.conclusion && (
                <p className="font-cinzel font-bold text-amber-900 text-xs sm:text-sm pt-1">
                  {hourData.conclusion}
                </p>
              )}
            </div>
          )}

          {/* MARIAN ANTIPHON */}
          {hourData.marianAntiphon && (
            <div className="mt-8 pt-2 space-y-3 bg-[#FAF4EB] p-5 rounded-xl border border-[#E2D5C3] shadow-2xs">
              <div className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                <span>Marian Antiphon · {hourData.marianAntiphon.title}</span>
              </div>
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

      {/* VIEW MODE 2: GILH RUBRICS */}
      {viewMode === 'gilh' && (
        <section className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-stone-200/90 space-y-6">
          <div className="space-y-3 border-b border-stone-200 pb-4">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
              General Instruction of the Liturgy of the Hours
            </h3>

            <div className="flex flex-wrap items-center gap-1.5">
              {RUBRIC_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setGilhCategoryFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-md font-cinzel text-[11px] font-bold border transition-colors cursor-pointer whitespace-nowrap ${
                    gilhCategoryFilter === cat.id
                      ? 'bg-amber-900 text-amber-50 border-amber-800'
                      : 'bg-stone-100 text-stone-800 border-stone-300 hover:bg-amber-50'
                  }`}
                >
                  {cat.label}
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
                <div className="flex items-center justify-between gap-2 text-xs text-amber-900 font-cinzel font-bold">
                  <span>{item.category}</span>
                  <span>{item.gilhRef}</span>
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

      {/* VIEW MODE 3: WIDGET */}
      {viewMode === 'widget' && (
        <section className="bg-white rounded-xl border border-stone-200/90 shadow-sm overflow-hidden space-y-3 p-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <span className="font-cinzel text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5 text-amber-800" />
              <span>DivineOffice.org</span>
            </span>
            <button
              type="button"
              onClick={() => setIframeKey(prev => prev + 1)}
              className="px-3 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-cinzel font-semibold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
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
