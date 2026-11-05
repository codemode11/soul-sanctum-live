import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown,
  Settings,
  Calendar as CalendarIcon, 
  BookOpen, 
  Sparkles, 
  Maximize2,
  Mic,
  User
} from 'lucide-react';
import { MassReading, LiturgicalColor } from '../types';
import { LITURGICAL_COLORS_INFO } from '../data/liturgicalCalendar';
import { 
  SacredReader, 
  SpeechPart, 
  formatFirstReadingIntro, 
  formatGospelIntro,
  formatResponsorialPsalmForSpeech
} from '../utils/speech';
import { SACRED_MASTERPIECES } from '../data/sacredArt';
import { LiturgicalCalendarPicker } from './LiturgicalCalendarPicker';
import { LectorControlsBar } from './LectorControlsBar';
import { getDailySaintHomily } from '../data/dailyHomilies';

interface DailyMassReadingsViewProps {
  reading: MassReading;
  onSelectDate: (dateStr: string) => void;
  onOpenArtViewer?: (artId: string) => void;
  onSelectTab?: (tab: any) => void;
}

export const DailyMassReadingsView: React.FC<DailyMassReadingsViewProps> = ({
  reading,
  onSelectDate,
  onOpenArtViewer,
  onSelectTab
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sanctum_mass_font_size');
      if (saved === 'normal' || saved === 'large' || saved === 'xlarge') return saved;
    }
    return 'normal';
  });

  const fontSizes: Array<'normal' | 'large' | 'xlarge'> = ['normal', 'large', 'xlarge'];

  const handleSetFontSize = (size: 'normal' | 'large' | 'xlarge') => {
    setFontSize(size);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sanctum_mass_font_size', size);
    }
  };

  const increaseFontSize = () => {
    const currentIndex = fontSizes.indexOf(fontSize);
    if (currentIndex < fontSizes.length - 1) {
      handleSetFontSize(fontSizes[currentIndex + 1]);
    }
  };

  const decreaseFontSize = () => {
    const currentIndex = fontSizes.indexOf(fontSize);
    if (currentIndex > 0) {
      handleSetFontSize(fontSizes[currentIndex - 1]);
    }
  };

  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [playingPartId, setPlayingPartId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isCalendarPickerOpen, setIsCalendarPickerOpen] = useState(false);
  const [isTopSettingsOpen, setIsTopSettingsOpen] = useState(false);
  const [showInlineHomily, setShowInlineHomily] = useState(true);

  useEffect(() => {
    const unsub = SacredReader.addListener((speaking, partId) => {
      setIsReadingAloud(speaking);
      setPlayingPartId(speaking ? (partId || null) : null);
    });
    return () => {
      unsub();
      SacredReader.stop();
    };
  }, []);

  const colorMeta = LITURGICAL_COLORS_INFO[reading.liturgicalColor] || LITURGICAL_COLORS_INFO.white;

  // Fully functional dynamic font scaling styles across all readings and verses
  const scriptureStyle = {
    fontSize: fontSize === 'normal' ? '1.25rem' : fontSize === 'large' ? '1.55rem' : fontSize === 'xlarge' ? '1.95rem' : '2.35rem',
    lineHeight: fontSize === 'normal' ? '1.8' : fontSize === 'large' ? '1.85' : fontSize === 'xlarge' ? '1.95' : '2.05',
  };

  const antiphonStyle = {
    fontSize: fontSize === 'normal' ? '1.45rem' : fontSize === 'large' ? '1.8rem' : fontSize === 'xlarge' ? '2.25rem' : '2.65rem',
    lineHeight: '1.4'
  };

  const stanzaStyle = {
    fontSize: fontSize === 'normal' ? '1.25rem' : fontSize === 'large' ? '1.55rem' : fontSize === 'xlarge' ? '1.95rem' : '2.35rem',
    lineHeight: '1.8'
  };

  // Prominently enlarged italicized verse style scaling dynamically with font buttons
  const italicVerseStyle = {
    fontSize: fontSize === 'normal' ? '1.35rem' : fontSize === 'large' ? '1.65rem' : fontSize === 'xlarge' ? '2.0rem' : '2.45rem',
    lineHeight: '1.45'
  };

  const alleluiaStyle = {
    fontSize: fontSize === 'normal' ? '1.45rem' : fontSize === 'large' ? '1.8rem' : fontSize === 'xlarge' ? '2.2rem' : '2.65rem',
    lineHeight: '1.5'
  };

  // Converts straight double and single quotation marks into typographic curved quotation marks
  const toCurvedQuotes = (text: string): string => {
    if (!text) return '';
    return text
      .replace(/(^|[\s([—–-])"/g, '$1\u201C')
      .replace(/"/g, '\u201D')
      .replace(/([a-zA-Z0-9])'([a-zA-Z0-9])/g, '$1\u2019$2')
      .replace(/(^|[\s([\u201C—–-])'/g, '$1\u2018')
      .replace(/'/g, '\u2019');
  };

  // Formats quotations so they wrap into well-proportioned lines and never leave a single word on the second line
  const formatBalancedQuotation = (quote: string): string => {
    if (!quote) return '';
    const trimmed = toCurvedQuotes(quote.trim());
    const withBoundPhrases = trimmed.replace(
      /\b(in|to|of|for|with|on|by|from|into|unto|upon|as|a|an|the)\s+/gi,
      '$1\u00A0'
    );
    const tokens = withBoundPhrases.split(' ');
    if (tokens.length >= 3) {
      const head = tokens.slice(0, -2).join(' ');
      const tail = tokens.slice(-2).join('\u00A0');
      return `${head} ${tail}`;
    }
    return withBoundPhrases;
  };

  // Formats First Reading theme quotations into two balanced lines by default with curved quotation marks
  const formatTwoLineQuotation = (quote: string): [string, string] => {
    if (!quote) return ['', ''];
    const trimmed = toCurvedQuotes(quote.trim());
    const withPeriod = /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
    const words = withPeriod.split(/\s+/);
    if (words.length <= 4) {
      return [`\u201C${withPeriod}\u201D`, ''];
    }
    const targetHalf = withPeriod.length / 2;
    let bestSplitIndex = Math.floor(words.length / 2);
    let bestDiff = Infinity;
    let runningLen = 0;
    for (let i = 1; i < words.length; i++) {
      runningLen += words[i - 1].length + (i > 1 ? 1 : 0);
      const diff = Math.abs(runningLen - targetHalf);
      if (diff < bestDiff) {
        bestDiff = diff;
        bestSplitIndex = i;
      }
    }
    const line1 = `\u201C${words.slice(0, bestSplitIndex).join(' ')}`;
    const line2 = `${words.slice(bestSplitIndex).join(' ')}\u201D`;
    return [line1, line2];
  };

  const handlePrevDay = () => {
    const d = new Date(reading.date + 'T12:00:00Z');
    d.setDate(d.getDate() - 1);
    onSelectDate(d.toISOString().split('T')[0]);
  };

  const handleNextDay = () => {
    const d = new Date(reading.date + 'T12:00:00Z');
    d.setDate(d.getDate() + 1);
    onSelectDate(d.toISOString().split('T')[0]);
  };

  // Full sequence: First Reading by Woman, Psalm by Woman, Gospel by Man
  const handleToggleReadAloud = () => {
    if (isReadingAloud) {
      SacredReader.stop();
      setIsReadingAloud(false);
      setPlayingPartId(null);
    } else {
      const activeVoice = SacredReader.getRecitationVoice();
      const readingAndPsalmGender = activeVoice === 'david' ? 'male' : 'female';
      const parts: SpeechPart[] = [
        {
          id: 'first-reading',
          title: 'First Reading',
          gender: readingAndPsalmGender,
          text: `${formatFirstReadingIntro(reading.firstReading.citation)} ${reading.firstReading.text}. The Word of the Lord. Thanks be to God.`
        },
        {
          id: 'psalm',
          title: 'Responsorial Psalm',
          gender: readingAndPsalmGender,
          text: formatResponsorialPsalmForSpeech(reading.responsorialPsalm, reading.alleluia)
        },
        {
          id: 'gospel',
          title: 'The Holy Gospel',
          gender: 'male',
          text: `${formatGospelIntro(reading.gospel.citation)} Glory to You, O Lord. ${reading.gospel.text}. The Gospel of the Lord. Praise to You, Lord Jesus Christ.`
        }
      ];

      setIsReadingAloud(true);
      setPlayingPartId('first-reading');

      SacredReader.speakLiturgicalSequence(
        parts,
        () => {
          setIsReadingAloud(false);
          setPlayingPartId(null);
        },
        (part) => {
          setPlayingPartId(part.id || null);
        }
      );
    }
  };



  const handleCopyReadings = () => {
    const fullText = `DAILY MASS READINGS - ${reading.date}
${reading.liturgicalDay}
Liturgical Color: ${colorMeta.name}

FIRST READING (${reading.firstReading.citation})
${reading.firstReading.text}

RESPONSORIAL PSALM (${reading.responsorialPsalm.citation})
R. ${reading.responsorialPsalm.antiphon}
${reading.responsorialPsalm.verses.map(v => `${v}\n`).join('\n')}

ALLELUIA
"${reading.alleluia.verse}"

HOLY GOSPEL (${reading.gospel.citation})
${reading.gospel.text}`;

    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Featured Visio Divina Masterpieces companion for the daily Mass readings
  const featuredArtworks = [
    SACRED_MASTERPIECES.find(a => a.id === 'art-supper-at-emmaus') || SACRED_MASTERPIECES[0],
    SACRED_MASTERPIECES.find(a => a.id === 'art-raphael-disputation') || SACRED_MASTERPIECES[1],
    SACRED_MASTERPIECES.find(a => a.id === 'art-murillo-immaculate-conception') || SACRED_MASTERPIECES[2]
  ];
  const [selectedArtIndex, setSelectedArtIndex] = useState(0);
  const pairedArt = featuredArtworks[selectedArtIndex] || featuredArtworks[0];

  return (
    <div className="max-w-5xl mx-auto p-3 sm:p-6 md:p-8 rounded-xl bg-white/45 backdrop-blur-xl backdrop-saturate-150 border border-white/60 ring-1 ring-inset ring-white/40 shadow-[0_8px_32px_0_rgba(120,90,50,0.12)] space-y-6 mb-12">
      
      {/* Liturgical Day Banner and Date Bar */}
      <div className="bg-white/55 backdrop-blur-xl backdrop-saturate-150 rounded-xl shadow-xs border border-white/70 ring-1 ring-inset ring-white/40 relative z-20">
        <div className={`px-5 pt-4 pb-4 sm:px-6 min-h-[164px] bg-gradient-to-r from-stone-900 to-stone-800 text-stone-100 flex flex-col justify-between ${isTopSettingsOpen ? 'rounded-t-xl' : 'rounded-xl'}`}>
          <div className="space-y-1.5">
            {/* Line 1: Liturgical Color/Rank & Season (raised) */}
            <div className="flex items-center gap-2.5 flex-nowrap overflow-hidden">
              <span 
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs text-xs font-semibold uppercase tracking-wider whitespace-nowrap shrink-0"
                style={{ backgroundColor: colorMeta.hex, color: reading.liturgicalColor === 'white' ? '#451a03' : '#ffffff' }}
              >
                <span>{colorMeta.name}</span>
                <span className="inline-block w-px h-3 bg-current opacity-40 mx-0.5" aria-hidden="true" />
                <span>{reading.liturgicalRank}</span>
              </span>
              <span className="text-sm sm:text-base text-stone-300 font-serif whitespace-nowrap">
                {reading.liturgicalSeason}
              </span>
            </div>
            
            {/* Line 2: Complete Liturgical Day Title (raised, full width on one line) */}
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-normal text-amber-100 leading-tight whitespace-nowrap overflow-x-auto no-scrollbar">
              {reading.liturgicalDay.replace(/,\s*Bishop.*$/, '')}
            </h2>
          </div>

          {/* Line 3: Calendar and Settings lowered together at the right side */}
          <div className="flex items-center justify-end gap-2 sm:gap-2.5 mt-auto pt-4 shrink-0">
            {/* Unified Single Element: [ < | Calendar Date | > ] with Thin Separators */}
            <div className="relative shrink-0">
              <div
                className={`inline-flex items-center h-8 rounded-md transition-all border overflow-hidden ${
                  isCalendarPickerOpen
                    ? 'bg-[#25170F] text-[#F7EBE1] border-[#D4A373] ring-2 ring-[#8B5A2B]/40'
                    : 'bg-[#1C120C]/90 text-[#D4A373] border-[#8B5A2B]/50 hover:border-[#D4A373]/70'
                }`}
              >
                {/* Left Arrow: Previous Day */}
                <button
                  type="button"
                  onClick={handlePrevDay}
                  className="h-full px-2.5 flex items-center justify-center text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Previous Liturgical Day"
                  aria-label="Previous Liturgical Day"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                {/* Thin Separator 1 */}
                <span className="w-px h-3.5 bg-[#8B5A2B]/60 self-center shrink-0" aria-hidden="true" />

                {/* Center: Liturgical Calendar Toggle */}
                <button
                  type="button"
                  onClick={() => setIsCalendarPickerOpen(!isCalendarPickerOpen)}
                  className="h-full flex items-center gap-1.5 px-3 text-xs font-medium hover:text-[#F7EBE1] hover:bg-white/10 transition-colors cursor-pointer select-none"
                  title="Open Liturgical Calendar"
                  aria-label="Open Liturgical Calendar"
                >
                  <CalendarIcon className="w-3.5 h-3.5 text-[#D4A373] shrink-0" />
                  <span className="whitespace-nowrap leading-none">
                    {reading.date.split('-').length === 3
                      ? `${reading.date.split('-')[1]}-${reading.date.split('-')[2]}-${reading.date.split('-')[0]}`
                      : reading.date}
                  </span>
                </button>

                {/* Thin Separator 2 */}
                <span className="w-px h-3.5 bg-[#8B5A2B]/60 self-center shrink-0" aria-hidden="true" />

                {/* Right Arrow: Next Day */}
                <button
                  type="button"
                  onClick={handleNextDay}
                  className="h-full px-2.5 flex items-center justify-center text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Next Liturgical Day"
                  aria-label="Next Liturgical Day"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Theme-Matched Liturgical Calendar Picker Dropdown */}
              <LiturgicalCalendarPicker
                selectedDateStr={reading.date}
                onSelectDate={onSelectDate}
                isOpen={isCalendarPickerOpen}
                onClose={() => setIsCalendarPickerOpen(false)}
                align="right"
              />
            </div>

            <button
              onClick={() => setIsTopSettingsOpen(prev => !prev)}
              aria-expanded={isTopSettingsOpen}
              className={`h-8 flex items-center gap-1 px-2.5 rounded-md transition-all cursor-pointer shrink-0 border ${
                isTopSettingsOpen
                  ? 'bg-[#25170F] text-[#F7EBE1] border-[#D4A373] ring-2 ring-[#8B5A2B]/40'
                  : 'bg-[#1C120C]/90 hover:bg-[#25170F] text-[#D4A373] hover:text-[#F7EBE1] border-[#8B5A2B]/50 hover:border-[#D4A373]/70'
              }`}
              title={isTopSettingsOpen ? 'Hide Settings' : 'Show Settings'}
              aria-label={isTopSettingsOpen ? 'Hide Settings' : 'Show Settings'}
            >
              <Settings className="w-3.5 h-3.5 text-[#D4A373] shrink-0" />
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#D4A373] shrink-0 transition-transform duration-200 ${
                  isTopSettingsOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Lector Audio Controls + Secondary Controls: Font Size and Copy */}
        {isTopSettingsOpen && (
          <div className="px-5 py-4 sm:px-6 min-h-[164px] bg-white/55 backdrop-blur-md border-t border-white/60 flex flex-col justify-between gap-3 rounded-b-xl animate-fadeIn">
          <LectorControlsBar
            onPlay={handleToggleReadAloud}
            onStop={() => {
              SacredReader.stop();
              setIsReadingAloud(false);
              setPlayingPartId(null);
            }}
            isSpeaking={isReadingAloud}
            isPaused={SacredReader.isPaused()}
            currentPartId={playingPartId}
          />
          <div className="flex items-center justify-between text-xs text-stone-700 pt-1">
            <div className="flex items-center gap-3">
              <span className="font-medium text-stone-600 text-xs">Text Size:</span>
              <div className="flex items-center gap-1 bg-stone-200/90 p-1 rounded-md border border-stone-300 shadow-2xs">
                <button
                  onClick={decreaseFontSize}
                  disabled={fontSize === 'normal'}
                  className="w-7 h-7 flex items-center justify-center rounded-md text-xs font-bold text-stone-700 hover:text-stone-950 hover:bg-white/80 disabled:opacity-35 disabled:hover:bg-transparent cursor-pointer transition-all"
                  title="Decrease font size"
                  aria-label="Decrease font size"
                >
                  A-
                </button>
                <button
                  onClick={() => handleSetFontSize('normal')}
                  className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-all cursor-pointer ${
                    fontSize === 'normal' 
                      ? 'bg-[#6B4423] text-white shadow-xs font-bold ring-1 ring-[#8B5A2B]' 
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                  title="Default text size (100%)"
                >
                  A
                </button>
                <button
                  onClick={() => handleSetFontSize('large')}
                  className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-all cursor-pointer ${
                    fontSize === 'large' 
                      ? 'bg-[#6B4423] text-white shadow-xs font-bold ring-1 ring-[#8B5A2B]' 
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                  title="Large text size (125%)"
                >
                  A+
                </button>
                <button
                  onClick={() => handleSetFontSize('xlarge')}
                  className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-all cursor-pointer ${
                    fontSize === 'xlarge' 
                      ? 'bg-[#6B4423] text-white shadow-xs font-bold ring-1 ring-[#8B5A2B]' 
                      : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                  }`}
                  title="Extra large text size (155%)"
                >
                  A++
                </button>
                <button
                  onClick={increaseFontSize}
                  disabled={fontSize === 'xlarge'}
                  className="w-7 h-7 flex items-center justify-center rounded-md text-xs font-bold text-amber-800 hover:text-amber-950 hover:bg-white/80 disabled:opacity-35 disabled:hover:bg-transparent cursor-pointer transition-all"
                  title="Increase font size"
                  aria-label="Increase font size"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleCopyReadings}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-stone-200/80 hover:bg-stone-300 text-stone-800 font-medium transition-colors cursor-pointer"
              title="Copy readings to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-600" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>
        )}
      </div>

      {/* FIRST READING — Solid White Background for Lengthy Reading */}
      <article className={`rounded-xl p-6 sm:p-8 border space-y-4 transition-all duration-300 ${
        playingPartId === 'first-reading' 
          ? 'border-amber-500 ring-2 ring-amber-400/50 shadow-xl bg-amber-50/95' 
          : 'bg-white border-stone-200/90 shadow-sm'
      }`}>
        <div className="border-b border-stone-200 pb-3">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-950 tracking-normal leading-tight">
            First Reading
          </h3>
          <div className="flex flex-wrap items-baseline gap-x-6 sm:gap-x-8 gap-y-1 mt-0.5">
            <p className="font-serif text-base sm:text-lg font-semibold text-stone-700 shrink-0 leading-tight">
              {reading.firstReading.citation}
            </p>
            {reading.firstReading.theme && (
              <p 
                className="font-serif text-amber-900/95 font-normal tracking-normal whitespace-nowrap overflow-x-auto no-scrollbar leading-tight"
                style={{ fontSize: scriptureStyle.fontSize }}
              >
                {toCurvedQuotes(`\u201C${reading.firstReading.theme.trim().replace(/[.!?]?$/, '.')}\u201D`)}
              </p>
            )}
          </div>
        </div>

        <div className="font-serif-sacred text-stone-800 whitespace-pre-line" style={scriptureStyle}>
          {toCurvedQuotes(reading.firstReading.text)}
        </div>

        <div className="pt-2 text-xs font-serif text-stone-600 italic">
          The Word of the Lord. <span className="font-semibold text-stone-800 not-italic">R. Thanks be to God.</span>
        </div>
      </article>

      {/* RESPONSORIAL PSALM — Solid White Background for Lengthy Reading */}
      <article className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-stone-200/90 space-y-5">
        <div className="border-b border-stone-200 pb-3">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-950 tracking-normal">
            Responsorial Psalm
          </h3>
          <p className="font-serif text-base sm:text-lg font-semibold text-stone-700 mt-0.5">
            {reading.responsorialPsalm.citation}
          </p>
        </div>

        {/* Antiphon response: Increased font size so it is highly readable and dynamically scalable */}
        <div className="p-4 sm:p-5 rounded-md bg-amber-50/80 border border-amber-200/80 font-serif text-amber-950 font-bold italic flex items-start gap-3 shadow-2xs" style={antiphonStyle}>
          <span className="text-amber-800 font-serif font-black text-2xl sm:text-3xl leading-none not-italic">R.</span>
          <span className="leading-snug">{toCurvedQuotes(reading.responsorialPsalm.antiphon)}</span>
        </div>

        {/* Stanzas */}
        <div className="space-y-4 font-serif-sacred text-stone-800" style={stanzaStyle}>
          {reading.responsorialPsalm.verses.map((verse, idx) => (
            <div key={idx} className="space-y-1.5">
              <p className="whitespace-pre-line pl-3 border-l-2 border-amber-500/60">
                {toCurvedQuotes(verse)}
              </p>
              <p className="font-serif font-semibold text-amber-900 italic" style={{ fontSize: '1.05em' }}>
                R. {toCurvedQuotes(reading.responsorialPsalm.antiphon)}
              </p>
            </div>
          ))}
        </div>
      </article>

      {/* SECOND READING (Sundays, Solemnities & Major Feasts) */}
      {reading.secondReading && (
        <article className={`rounded-xl p-6 sm:p-8 border space-y-4 transition-all duration-300 ${
          playingPartId === 'second-reading'
            ? 'border-amber-500 ring-2 ring-amber-400/50 shadow-xl bg-amber-50/95'
            : 'bg-white border-stone-200/90 shadow-sm'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-stone-200 pb-3 gap-4">
            <div className="shrink-0">
              <div className="flex items-center gap-2.5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-950 tracking-normal">
                  Second Reading
                </h3>
              </div>
              <p className="font-serif text-base sm:text-lg font-semibold text-stone-700 mt-0.5">
                {reading.secondReading.citation}
              </p>
            </div>
          </div>

          <div className="font-serif-sacred text-stone-800 whitespace-pre-line" style={scriptureStyle}>
            {toCurvedQuotes(reading.secondReading.text)}
          </div>

          <div className="pt-2 text-xs font-serif text-stone-600 italic">
            The Word of the Lord. <span className="font-semibold text-stone-800 not-italic">R. Thanks be to God.</span>
          </div>
        </article>
      )}

      {/* ALLELUIA ACCLAMATION: Increased font size for readability */}
      <div className="bg-white border border-amber-200/90 shadow-sm rounded-xl p-6 sm:p-8 text-center space-y-3 font-serif">
        <h3 className="font-serif text-lg sm:text-xl font-bold text-amber-950 tracking-normal">
          Alleluia Acclamation
        </h3>
        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-950 italic font-serif">
          Alleluia, alleluia.
        </p>
        <p 
          className="text-amber-950 mx-auto font-serif italic font-semibold leading-relaxed transition-all duration-200 text-balance"
          style={{ ...alleluiaStyle, textWrap: 'balance', maxWidth: '25em' }}
        >
          &ldquo;{formatBalancedQuotation(reading.alleluia.verse)}&rdquo;
        </p>
        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-950 italic font-serif">
          Alleluia, alleluia.
        </p>
      </div>

      {/* HOLY GOSPEL — Solid White Background for Lengthy Reading */}
      <article className={`rounded-xl p-6 sm:p-8 border-2 space-y-5 relative overflow-hidden transition-all duration-300 ${
        playingPartId === 'gospel'
          ? 'border-red-700 ring-4 ring-red-500/30 shadow-xl bg-amber-50/95'
          : 'bg-white border-stone-200/90 shadow-sm'
      }`}>
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-600/5 rounded-bl-full pointer-events-none" />
        
        <div className="border-b border-stone-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-red-700 font-serif font-bold text-xl">✠</span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-red-950 tracking-normal">
                The Holy Gospel
              </h3>
            </div>
            <p className="font-serif text-base sm:text-lg font-semibold text-stone-800 mt-0.5">
              {reading.gospel.citation}
            </p>
          </div>
        </div>

        <div className="font-serif-sacred text-stone-900 whitespace-pre-line sacred-drop-cap" style={scriptureStyle}>
          {toCurvedQuotes(reading.gospel.text)}
        </div>

        <div className="pt-2 text-xs font-serif text-stone-600 italic">
          The Gospel of the Lord. <span className="font-semibold text-stone-800 not-italic">R. Praise to you, Lord Jesus Christ.</span>
        </div>
      </article>

      {/* Direct Callout Banner & Full Patristic Homily of the Day */}
      {(() => {
        const dailyHomily = getDailySaintHomily(reading);
        return (
          <article className="bg-[#F8F4ED] text-[#2C1C0E] rounded-xl p-6 sm:p-8 shadow-sm border border-[#DDD0BE] space-y-5">
            <div className="border-b border-[#E3D6C5] pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#8C6239] text-white text-[11px] font-bold uppercase tracking-wider font-serif">
                    Saints & Doctors of the Church
                  </span>
                  <span className="text-xs text-[#6B523B] font-serif font-semibold">
                    {reading.gospel.citation} • {dailyHomily.yearDelivered}
                  </span>
                </div>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#2A1B0E]">
                  Homily
                </h4>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => setShowInlineHomily(!showInlineHomily)}
                  className="px-3.5 py-2 rounded-xl bg-[#EDE4D6] hover:bg-[#E3D7C5] text-[#3B2818] text-xs font-serif font-bold border border-[#D5C6B1] transition-all cursor-pointer"
                >
                  {showInlineHomily ? 'Collapse Homily' : 'Expand Full Homily'}
                </button>
                {onSelectTab && (
                  <button
                    onClick={() => onSelectTab('bible-study')}
                    className="px-4 py-2 rounded-xl bg-[#8C6239] hover:bg-[#734F2D] text-white font-serif font-bold text-xs shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>View Bible Commentary</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {showInlineHomily && (
              <>
                <div className="pt-2 space-y-4">
                  <div>
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2A1B0E] leading-snug">
                      <span className="block">{dailyHomily.homilyTitle}</span>
                      <span className="block text-sm sm:text-base font-normal text-[#4A3520] mt-1">
                        {dailyHomily.homilyAttribution}
                      </span>
                    </h3>
                    <div className="h-px bg-[#DBCBB5] mt-3 mb-5" />
                  </div>
                  <div className="pt-2 space-y-4 font-serif-sacred text-[#2C1C0E] leading-relaxed" style={scriptureStyle}>
                    {dailyHomily.paragraphs.map((para, idx) => (
                      <p key={idx} className="whitespace-pre-line">
                        {toCurvedQuotes(para)}
                      </p>
                    ))}
                  </div>
                </div>

                {dailyHomily.spiritualApplication && (
                  <div className="p-3.5 rounded-xl bg-[#FAF4EA] border border-[#E5D7C3] text-[#4A3623] text-xs sm:text-sm font-serif italic">
                    <span className="font-bold not-italic text-[#8C6239] block mb-1">Spiritual Application:</span>
                    &ldquo;{toCurvedQuotes(dailyHomily.spiritualApplication)}&rdquo;
                  </div>
                )}
              </>
            )}
          </article>
        );
      })()}

    </div>
  );
};
