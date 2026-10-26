import React, { useState, useEffect } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
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

interface DailyMassReadingsViewProps {
  reading: MassReading;
  onSelectDate: (dateStr: string) => void;
  onOpenArtViewer?: (artId: string) => void;
}

export const DailyMassReadingsView: React.FC<DailyMassReadingsViewProps> = ({
  reading,
  onSelectDate,
  onOpenArtViewer
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

  const reflectionStyle = {
    fontSize: fontSize === 'normal' ? '1.25rem' : fontSize === 'large' ? '1.55rem' : fontSize === 'xlarge' ? '1.95rem' : '2.35rem',
    lineHeight: '1.8'
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
${reading.gospel.text}

REFLECTION
${reading.reflection.title} (${reading.reflection.author})
${reading.reflection.content}`;

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
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Liturgical Day Banner and Date Bar */}
      <div className="bg-white/92 backdrop-blur-md rounded-xl shadow-xl border border-stone-200/90 overflow-hidden">
        <div className="p-4 sm:p-6 bg-gradient-to-r from-stone-900 to-stone-800 text-stone-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span 
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider"
                style={{ backgroundColor: colorMeta.hex, color: reading.liturgicalColor === 'white' ? '#451a03' : '#ffffff' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current" />
                {colorMeta.name} • {reading.liturgicalRank}
              </span>
              <span className="text-xs text-stone-300 font-serif-sacred">
                {reading.liturgicalSeason}
              </span>
            </div>
            
            {/* Split title: Memorial on the next line with increased font size */}
            {/* Split title to two lines if it is too long to prevent overlap */}
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-normal text-amber-100 leading-tight">
              {reading.liturgicalDay.length > 35 ? (
                <>
                  <span className="block">{reading.liturgicalDay.split(' of ')[0]} of</span>
                  <span className="block text-xl sm:text-2xl md:text-3xl font-bold text-amber-200 mt-1 font-serif drop-shadow-md">
                    {reading.liturgicalDay.split(' of ').slice(1).join(' of ')}
                  </span>
                </>
              ) : reading.liturgicalDay.includes(' / ') ? (
                <>
                  <span className="block">{reading.liturgicalDay.split(' / ')[0]}</span>
                  <span className="block text-xl sm:text-2xl md:text-3xl font-bold text-amber-200 italic mt-1.5 font-serif drop-shadow-md">
                    {reading.liturgicalDay.split(' / ')[1]}
                  </span>
                </>
              ) : (
                reading.liturgicalDay
              )}
            </h2>
          </div>

          {/* Quick Date Switcher Controls */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={handlePrevDay}
              className="p-2 rounded-md bg-stone-700/80 hover:bg-stone-600 text-stone-200 transition-colors cursor-pointer"
              title="Previous Liturgical Day"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {/* Interactive Theme-Matched Liturgical Calendar Picker */}
            <div className="relative">
              <button 
                onClick={() => setIsCalendarPickerOpen(!isCalendarPickerOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer border ${
                  isCalendarPickerOpen 
                    ? 'bg-[#25170F] text-[#F7EBE1] border-[#D4A373] ring-2 ring-[#8B5A2B]/40' 
                    : 'bg-[#1C120C]/90 hover:bg-[#25170F] text-[#D4A373] hover:text-[#F7EBE1] border-[#8B5A2B]/50 hover:border-[#D4A373]/70'
                }`}
                title="Open Liturgical Calendar"
              >
                <CalendarIcon className="w-3.5 h-3.5 text-[#D4A373]" />
                <span>{reading.date}</span>
              </button>

              <LiturgicalCalendarPicker
                selectedDateStr={reading.date}
                onSelectDate={onSelectDate}
                isOpen={isCalendarPickerOpen}
                onClose={() => setIsCalendarPickerOpen(false)}
                align="left"
              />
            </div>
            <button
              onClick={handleNextDay}
              className="p-2 rounded-md bg-stone-700/80 hover:bg-stone-600 text-stone-200 transition-colors cursor-pointer"
              title="Next Liturgical Day"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Lector Audio Controls + Secondary Controls: Font Size and Copy */}
        <div className="p-4 bg-[#FAF7F2]/90 backdrop-blur-sm border-t border-stone-200/80 space-y-3">
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
      </div>

      {/* FIRST READING */}
      <article className={`bg-white/92 backdrop-blur-md rounded-xl p-6 sm:p-8 border space-y-4 transition-all duration-300 ${
        playingPartId === 'first-reading' 
          ? 'border-amber-500 ring-2 ring-amber-400/50 shadow-xl bg-amber-50/30' 
          : 'border-stone-200/90 shadow-lg'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-stone-200/90 pb-3 gap-2">
          <div>
            <div className="flex items-center gap-2.5">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-950 tracking-normal">
                First Reading
              </h3>
            </div>
            <p className="font-serif text-base sm:text-lg font-semibold text-stone-700 mt-0.5">
              {reading.firstReading.citation}
            </p>
          </div>

          {reading.firstReading.theme && (
            <div className="self-start sm:self-auto">
              <p 
                className="italic font-serif text-amber-900/95 font-semibold max-w-lg sm:text-right drop-shadow-2xs transition-all duration-200"
                style={italicVerseStyle}
              >
                "{reading.firstReading.theme}"
              </p>
            </div>
          )}
        </div>

        <div className="font-serif-sacred text-stone-800 whitespace-pre-line" style={scriptureStyle}>
          {reading.firstReading.text}
        </div>

        <div className="pt-2 text-xs font-serif text-stone-600 italic">
          The Word of the Lord. <span className="font-semibold text-stone-800 not-italic">R. Thanks be to God.</span>
        </div>
      </article>

      {/* RESPONSORIAL PSALM */}
      <article className="bg-[#FCFAF7] rounded-xl p-6 sm:p-8 shadow-xs border border-amber-900/10 space-y-5">
        <div className="border-b border-amber-900/15 pb-3">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-950 tracking-normal">
            Responsorial Psalm
          </h3>
          <p className="font-serif text-base sm:text-lg font-semibold text-stone-700 mt-0.5">
            {reading.responsorialPsalm.citation}
          </p>
        </div>

        {/* Antiphon response: Increased font size so it is highly readable and dynamically scalable */}
        <div className="p-4 sm:p-5 rounded-md bg-amber-50/90 border border-amber-200/90 font-serif text-amber-950 font-bold italic flex items-start gap-3 shadow-sm" style={antiphonStyle}>
          <span className="text-amber-800 font-serif font-black text-2xl sm:text-3xl leading-none not-italic">R.</span>
          <span className="leading-snug">{reading.responsorialPsalm.antiphon}</span>
        </div>

        {/* Stanzas */}
        <div className="space-y-4 font-serif-sacred text-stone-800" style={stanzaStyle}>
          {reading.responsorialPsalm.verses.map((verse, idx) => (
            <div key={idx} className="space-y-1.5">
              <p className="whitespace-pre-line pl-3 border-l-2 border-amber-400/50">
                {verse}
              </p>
              <p className="font-serif font-semibold text-amber-900 italic" style={{ fontSize: '1.05em' }}>
                R. {reading.responsorialPsalm.antiphon}
              </p>
            </div>
          ))}
        </div>
      </article>

      {/* ALLELUIA ACCLAMATION: Increased font size for readability */}
      <div className="bg-amber-100/70 border border-amber-300/80 rounded-xl p-6 sm:p-8 text-center space-y-3 font-serif">
        <h3 className="font-serif text-lg sm:text-xl font-bold text-amber-950 tracking-normal">
          Alleluia Acclamation
        </h3>
        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-950 italic font-serif">
          Alleluia, alleluia.
        </p>
        <p 
          className="text-amber-950 max-w-2xl mx-auto font-serif italic font-semibold leading-relaxed transition-all duration-200"
          style={alleluiaStyle}
        >
          "{reading.alleluia.verse}"
        </p>
        <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-950 italic font-serif">
          Alleluia, alleluia.
        </p>
      </div>

      {/* HOLY GOSPEL */}
      <article className={`bg-white rounded-xl p-6 sm:p-8 shadow-md border-2 space-y-5 relative overflow-hidden transition-all duration-300 ${
        playingPartId === 'gospel'
          ? 'border-red-700 ring-4 ring-red-500/30 shadow-xl bg-amber-50/20'
          : 'border-amber-800/30'
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

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs sm:text-sm font-serif italic text-stone-700 bg-stone-100 px-3 py-1.5 rounded-lg border border-stone-200 hidden sm:inline-block">
              The Gospel of the Lord
            </span>
          </div>
        </div>

        <div className="font-serif-sacred text-stone-900 whitespace-pre-line sacred-drop-cap" style={scriptureStyle}>
          {reading.gospel.text}
        </div>

        <div className="pt-3 text-sm sm:text-base text-stone-700 italic border-t border-stone-200">
          The Gospel of the Lord. <span className="font-semibold text-stone-900 not-italic">R. Praise to you, Lord Jesus Christ.</span>
        </div>
      </article>

      {/* Masterpiece Sacred Art Companion: Visio Divina */}
      {pairedArt && (
        <div className="bg-stone-900 rounded-xl text-stone-100 overflow-hidden shadow-lg border border-stone-800">
          <div className="p-4 sm:p-5 flex flex-col md:flex-row gap-5 items-center">
            <div className="w-full md:w-1/3 aspect-4/3 overflow-hidden rounded-xl bg-stone-950 shrink-0 border border-stone-700 relative group">
              <img 
                key={pairedArt.id}
                src={pairedArt.imageUrl} 
                alt={pairedArt.title}
                loading="eager"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (pairedArt.fallbackImageUrl && target.getAttribute('data-fallback') !== 'true') {
                    target.setAttribute('data-fallback', 'true');
                    target.src = pairedArt.fallbackImageUrl;
                  }
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                onClick={() => onOpenArtViewer && onOpenArtViewer(pairedArt.id)}
              />
              <div 
                onClick={() => onOpenArtViewer && onOpenArtViewer(pairedArt.id)}
                className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
              >
                <div className="px-3 py-1.5 rounded-full bg-stone-950/80 text-amber-200 border border-amber-400/40 text-xs font-serif flex items-center gap-1.5">
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Enlarge Masterpiece</span>
                </div>
              </div>
            </div>
            <div className="space-y-2.5 flex-1 w-full">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs font-bold font-serif text-amber-300 uppercase tracking-wider">
                    Visio Divina • Sacred Masterpiece
                  </span>
                </div>
                {/* Artwork Switcher Controls */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setSelectedArtIndex((prev) => (prev === 0 ? featuredArtworks.length - 1 : prev - 1))}
                    className="p-1 rounded hover:bg-stone-800 text-stone-400 hover:text-amber-200 transition-colors cursor-pointer"
                    title="Previous Masterpiece"
                    aria-label="Previous Masterpiece"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-[11px] font-mono text-stone-400 px-1">
                    {selectedArtIndex + 1} / {featuredArtworks.length}
                  </span>
                  <button
                    onClick={() => setSelectedArtIndex((prev) => (prev === featuredArtworks.length - 1 ? 0 : prev + 1))}
                    className="p-1 rounded hover:bg-stone-800 text-stone-400 hover:text-amber-200 transition-colors cursor-pointer"
                    title="Next Masterpiece"
                    aria-label="Next Masterpiece"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Masterpiece Quick Chips */}
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {featuredArtworks.map((art, idx) => {
                  const isCur = idx === selectedArtIndex;
                  return (
                    <button
                      key={art.id}
                      onClick={() => setSelectedArtIndex(idx)}
                      className={`text-[11px] px-2.5 py-1 rounded-md font-serif transition-all cursor-pointer ${
                        isCur
                          ? 'bg-amber-500/25 text-amber-200 border border-amber-400/50 font-bold'
                          : 'bg-stone-800/80 hover:bg-stone-800 text-stone-400 border border-stone-700/60'
                      }`}
                    >
                      {idx === 0 ? 'The Supper at Emmaus' : idx === 1 ? 'La Disputa' : 'Immaculate Conception'}
                    </button>
                  );
                })}
              </div>

              <div>
                <h4 className="font-serif text-lg sm:text-xl font-bold text-white">
                  {pairedArt.title}
                </h4>
                <p className="text-xs text-stone-400 font-serif italic">
                  {pairedArt.artist} ({pairedArt.year}) — {pairedArt.location}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-stone-300 font-serif leading-relaxed line-clamp-3">
                {pairedArt.theologicalReflection}
              </p>

              {onOpenArtViewer && (
                <button
                  onClick={() => onOpenArtViewer(pairedArt.id)}
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-serif font-medium pt-1 cursor-pointer"
                >
                  <Maximize2 className="w-3 h-3" />
                  <span>Contemplate High-Res Sacred Masterpiece</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* DAILY PATRISTIC and LITURGICAL REFLECTION */}
      <article className="bg-[#FAF8F5]/92 backdrop-blur-md rounded-xl p-6 sm:p-8 shadow-lg border border-amber-900/15 space-y-3">
        <div className="flex items-center gap-2 text-amber-900">
          <BookOpen className="w-4 h-4" />
          <h3 className="font-serif text-lg sm:text-xl font-bold text-amber-950 tracking-normal">
            Reflection
          </h3>
        </div>
        <h4 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
          {reading.reflection.title}
        </h4>
        <p className="text-xs sm:text-sm font-serif italic text-amber-900 font-medium">
          Source: {reading.reflection.author}
        </p>
        <p className="font-serif-sacred text-stone-800 whitespace-pre-line" style={reflectionStyle}>
          {reading.reflection.content}
        </p>
      </article>

    </div>
  );
};
