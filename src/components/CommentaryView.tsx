import React, { useState, useRef, useEffect } from 'react';
import { 
  BookOpen, 
  Check, 
  Copy, 
  Volume2, 
  VolumeX, 
  Search, 
  Compass, 
  Headphones,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Settings,
  ChevronDown
} from 'lucide-react';
import { BibleCommentary, MassReading } from '../types';
import { getThreeMonthDailyCommentaries, getDailyGospelCommentaries } from '../data/commentary';
import { 
  SacredReader, 
  parseCommentaryBySaints, 
  CommentarySaintSection 
} from '../utils/speech';
import { StructuredCommentaryDisplay } from './StructuredCommentary';
import { toCurvedQuotes } from '../utils/typography';

export interface CommentaryViewProps {
  currentGospelCitation?: string;
  currentReading?: MassReading;
  onSelectDate?: (dateStr: string) => void;
}

export const CommentaryView: React.FC<CommentaryViewProps> = ({
  currentGospelCitation,
  currentReading,
  onSelectDate
}) => {
  const ninetyTwoCommentaries = React.useMemo(
    () => getThreeMonthDailyCommentaries(),
    []
  );

  const [selectedMonth, setSelectedMonth] = useState<string>('November');

  // Match initial commentary to currentReading date or default to Nov 4 (Luke 15:1-10)
  const initialCommentary = React.useMemo(() => {
    if (currentReading?.date) {
      const match = ninetyTwoCommentaries.find(c => c.dateKey === currentReading.date);
      if (match) return match;
    }
    const nov4 = ninetyTwoCommentaries.find(c => c.dateKey === '2026-11-04');
    return nov4 || ninetyTwoCommentaries[0];
  }, [currentReading?.date, ninetyTwoCommentaries]);

  const [selectedCommentary, setSelectedCommentary] = useState<BibleCommentary>(initialCommentary);
  const [copied, setCopied] = useState(false);
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeSpeakingSection, setActiveSpeakingSection] = useState<CommentarySaintSection | null>(null);
  const [speakingSectionIndex, setSpeakingSectionIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [recitationVoice, setRecitationVoice] = useState<'ava-grace' | 'david'>(() => SacredReader.getRecitationVoice());
  const [isTopSettingsOpen, setIsTopSettingsOpen] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const handleVoiceSelect = (v: 'ava-grace' | 'david') => {
    setRecitationVoice(v);
    SacredReader.setRecitationVoice(v);
    if (isReadingAloud) {
      SacredReader.stop();
      setIsReadingAloud(false);
      setActiveSpeakingSection(null);
      setIsPaused(false);
    }
  };

  React.useEffect(() => {
    if (currentReading?.date) {
      const match = ninetyTwoCommentaries.find(c => c.dateKey === currentReading.date);
      if (match) {
        setSelectedCommentary(match);
        if (match.monthName) {
          setSelectedMonth(match.monthName);
        }
        if (isReadingAloud) {
          SacredReader.stop();
          setIsReadingAloud(false);
          setActiveSpeakingSection(null);
        }
      }
    }
  }, [currentReading?.date, ninetyTwoCommentaries]);

  // Smoothly center selected pill when passage changes
  React.useEffect(() => {
    if (selectedCommentary && pillRefs.current[selectedCommentary.id]) {
      pillRefs.current[selectedCommentary.id]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [selectedCommentary.id]);

  // Clean up speech on unmount
  React.useEffect(() => {
    return () => {
      SacredReader.stop();
    };
  }, []);

  const parsedSections = React.useMemo(
    () => parseCommentaryBySaints(selectedCommentary),
    [selectedCommentary]
  );

  // Filter only actual saint sections for the commentary body display
  const saintExpositionSections = React.useMemo(
    () => parsedSections.filter(s => s.id !== 'intro' && s.id !== 'practical-application'),
    [parsedSections]
  );

  // Functional dynamic font size scaling
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sanctum_commentary_font_size');
      if (saved === 'normal' || saved === 'large' || saved === 'xlarge') return saved;
    }
    return 'normal';
  });
  const fontSizes: Array<'normal' | 'large' | 'xlarge'> = ['normal', 'large', 'xlarge'];

  const handleSetFontSize = (size: 'normal' | 'large' | 'xlarge') => {
    setFontSize(size);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sanctum_commentary_font_size', size);
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

  const scriptureStyle = {
    fontSize: fontSize === 'normal' ? '1.15rem' : fontSize === 'large' ? '1.4rem' : '1.7rem',
    lineHeight: '1.6'
  };

  const commentaryStyle = {
    fontSize: fontSize === 'normal' ? '1.1rem' : fontSize === 'large' ? '1.35rem' : '1.65rem',
    lineHeight: '1.7'
  };

  const applicationStyle = {
    fontSize: fontSize === 'normal' ? '1.05rem' : fontSize === 'large' ? '1.3rem' : '1.55rem',
    lineHeight: '1.65'
  };

  const handleCopy = () => {
    const text = `CATHOLIC BIBLE COMMENTARY
Passage: ${selectedCommentary.scriptureReference}
Source: ${selectedCommentary.sourceName} (${selectedCommentary.author}) — ${selectedCommentary.sourceEra}

SCRIPTURE:
${selectedCommentary.scriptureText}

COMMENTARY:
${selectedCommentary.commentaryText}

APPLICATION:
${selectedCommentary.practicalApplication}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Toggle complete commentary recitation with different male voices per Saint
  const handleToggleSpeak = () => {
    if (isReadingAloud) {
      SacredReader.stop();
      setIsReadingAloud(false);
      setActiveSpeakingSection(null);
      setIsPaused(false);
    } else {
      setIsReadingAloud(true);
      setIsPaused(false);
      SacredReader.speakCommentaryBySaints(
        selectedCommentary,
        (section, idx) => {
          setActiveSpeakingSection(section);
          setSpeakingSectionIndex(idx);
        },
        () => {
          setIsReadingAloud(false);
          setActiveSpeakingSection(null);
          setIsPaused(false);
        },
        recitationVoice
      );
    }
  };

  // Play a single saint's exposition in their specific voice
  const handleSpeakSingleSaint = (section: CommentarySaintSection) => {
    if (isReadingAloud && activeSpeakingSection?.id === section.id) {
      SacredReader.stop();
      setIsReadingAloud(false);
      setActiveSpeakingSection(null);
      setIsPaused(false);
    } else {
      setIsReadingAloud(true);
      setIsPaused(false);
      setActiveSpeakingSection(section);
      SacredReader.speakSingleSaintExposition(
        section.persona.id || section.saintName,
        section.text,
        () => {
          setIsReadingAloud(false);
          setActiveSpeakingSection(null);
          setIsPaused(false);
        }
      );
    }
  };

  const handleTogglePause = () => {
    if (isPaused) {
      SacredReader.resume();
      setIsPaused(false);
    } else {
      SacredReader.pause();
      setIsPaused(true);
    }
  };

  const monthFilteredList = React.useMemo(() => {
    return ninetyTwoCommentaries.filter(c => c.monthName === selectedMonth);
  }, [ninetyTwoCommentaries, selectedMonth]);

  const filteredCommentaries = React.useMemo(() => {
    if (!searchQuery.trim()) return monthFilteredList;
    const q = searchQuery.toLowerCase();
    return monthFilteredList.filter(c => 
      c.scriptureReference.toLowerCase().includes(q) ||
      (c.dateLabel && c.dateLabel.toLowerCase().includes(q)) ||
      (c.monthName && c.monthName.toLowerCase().includes(q)) ||
      (c.dateKey && c.dateKey.toLowerCase().includes(q)) ||
      c.sourceName.toLowerCase().includes(q) ||
      c.author.toLowerCase().includes(q) ||
      c.commentaryText.toLowerCase().includes(q)
    );
  }, [monthFilteredList, searchQuery]);

  const activeList = filteredCommentaries.length > 0 ? filteredCommentaries : monthFilteredList;
  const currentIndex = activeList.findIndex(c => c.id === selectedCommentary.id);

  const handleSelectMonth = (month: string) => {
    setSelectedMonth(month);
    const firstInMonth = ninetyTwoCommentaries.find(c => c.monthName === month);
    if (firstInMonth) {
      setSelectedCommentary(firstInMonth);
      if (firstInMonth.dateKey && onSelectDate) onSelectDate(firstInMonth.dateKey);
      if (isReadingAloud) SacredReader.stop();
    }
  };

  const handleSelectPassage = (comm: BibleCommentary) => {
    setSelectedCommentary(comm);
    if (comm.dateKey && onSelectDate) {
      onSelectDate(comm.dateKey);
    }
    if (isReadingAloud) {
      SacredReader.stop();
      setIsReadingAloud(false);
      setActiveSpeakingSection(null);
    }
  };

  const handlePrevPassage = () => {
    if (currentIndex > 0) {
      const prev = activeList[currentIndex - 1];
      setSelectedCommentary(prev);
      if (prev.dateKey && onSelectDate) onSelectDate(prev.dateKey);
      if (isReadingAloud) SacredReader.stop();
    }
  };

  const handleNextPassage = () => {
    if (currentIndex >= 0 && currentIndex < activeList.length - 1) {
      const next = activeList[currentIndex + 1];
      setSelectedCommentary(next);
      if (next.dateKey && onSelectDate) onSelectDate(next.dateKey);
      if (isReadingAloud) SacredReader.stop();
    }
  };

  const scrollPills = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-3 sm:p-6 md:p-8 rounded-xl bg-white/45 backdrop-blur-xl backdrop-saturate-150 border border-white/60 ring-1 ring-inset ring-white/40 shadow-[0_8px_32px_0_rgba(120,90,50,0.12)] space-y-4 mb-10">
      
      {/* Liturgical Day & Gospel Commentary Banner (Top Two Rectangles Patterned after Mass Readings) */}
      <div className="bg-white/55 backdrop-blur-xl backdrop-saturate-150 rounded-xl shadow-xs border border-white/70 ring-1 ring-inset ring-white/40 relative z-20">
        
        {/* RECTANGLE 1: Main Title Banner with Settings Toggle */}
        <div className={`px-5 pt-4 pb-4 sm:px-6 min-h-[164px] bg-gradient-to-r from-stone-900 to-stone-800 text-stone-100 flex flex-col justify-between ${isTopSettingsOpen ? 'rounded-t-xl' : 'rounded-xl'}`}>
          <div className="space-y-2 my-auto">
            {/* Main Title: Commentary on Luke 15:1-10 */}
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-normal text-amber-100 leading-tight">
              Commentary on {selectedCommentary.scriptureReference}
            </h2>
            <p className="text-xs sm:text-sm text-amber-300/80 font-cinzel uppercase tracking-wider">
              Catena Aurea • Cornelius à Lapide, S.J. • Magisterium
            </p>
          </div>

          {/* Lower Row: Settings Toggle Button */}
          <div className="flex items-center justify-end mt-auto pt-2 shrink-0">
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

        {/* RECTANGLE 2: Settings Panel (Hidden by default) */}
        {isTopSettingsOpen && (
          <div className="px-5 py-3.5 sm:px-6 bg-white/55 backdrop-blur-md border-t border-white/60 flex flex-col justify-center gap-2 animate-fadeIn">
            
            {/* Line 1: Listen to Commentary, Voice, Text Size, Copy */}
            <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-2.5 sm:gap-3 p-2.5 rounded-lg bg-stone-100/90 border border-stone-200 shadow-2xs text-xs text-stone-700">
              
              {/* 1. Listen to Commentary */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={handleToggleSpeak}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer shadow-xs ${
                    isReadingAloud
                      ? 'bg-[#6B4423] text-white animate-pulse'
                      : 'bg-[#5A381C] hover:bg-[#6B4423] text-amber-100 border border-[#8B5A2B]/70'
                  }`}
                  title={`Listen to Commentary in ${recitationVoice === 'ava-grace' ? 'Ava Grace' : 'Microsoft David'}`}
                  aria-label="Listen to Commentary"
                >
                  {isReadingAloud ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-300" />}
                  <span>{isReadingAloud ? 'Stop Audio' : 'Listen to Commentary'}</span>
                </button>

                {isReadingAloud && (
                  <button
                    onClick={handleTogglePause}
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold bg-stone-200 hover:bg-stone-300 text-stone-800 transition-colors cursor-pointer"
                    title={isPaused ? 'Resume Audio' : 'Pause Audio'}
                  >
                    {isPaused ? <Play className="w-3.5 h-3.5 text-amber-800" /> : <Pause className="w-3.5 h-3.5 text-amber-800" />}
                    <span>{isPaused ? 'Resume' : 'Pause'}</span>
                  </button>
                )}
              </div>

              {/* 2. Voice */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-xs font-medium text-stone-600">Voice:</span>
                <div className="flex items-center bg-stone-200/90 border border-stone-300 rounded-md p-0.5 text-xs">
                  <button
                    type="button"
                    onClick={() => handleVoiceSelect('ava-grace')}
                    className={`px-2.5 py-1 rounded-sm text-xs font-serif font-medium transition-all cursor-pointer ${
                      recitationVoice === 'ava-grace'
                        ? 'bg-[#6B4423] text-white font-bold shadow-xs'
                        : 'text-stone-700 hover:text-stone-950'
                    }`}
                    title="Ava Grace (Prioritized Devotional Voice)"
                  >
                    Ava Grace
                  </button>
                  <button
                    type="button"
                    onClick={() => handleVoiceSelect('david')}
                    className={`px-2.5 py-1 rounded-sm text-xs font-serif font-medium transition-all cursor-pointer ${
                      recitationVoice === 'david'
                        ? 'bg-[#6B4423] text-white font-bold shadow-xs'
                        : 'text-stone-700 hover:text-stone-950'
                    }`}
                    title="Microsoft David (Traditional Solemn Male Voice)"
                  >
                    David
                  </button>
                </div>
              </div>

              {/* 3. Text Size */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-medium text-stone-600 text-xs">Text Size:</span>
                <div className="flex items-center gap-1 bg-stone-200/90 p-0.5 rounded-md border border-stone-300 shadow-2xs">
                  <button
                    onClick={decreaseFontSize}
                    disabled={fontSize === 'normal'}
                    className="w-6 h-6 flex items-center justify-center rounded-sm text-xs font-bold text-stone-700 hover:text-stone-950 hover:bg-white/80 disabled:opacity-35 disabled:hover:bg-transparent cursor-pointer transition-all"
                    title="Decrease font size"
                    aria-label="Decrease font size"
                  >
                    A-
                  </button>
                  <button
                    onClick={() => handleSetFontSize('normal')}
                    className={`px-2 py-1 text-xs rounded-sm font-semibold transition-all cursor-pointer ${
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
                    className={`px-2 py-1 text-xs rounded-sm font-semibold transition-all cursor-pointer ${
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
                    className={`px-2 py-1 text-xs rounded-sm font-semibold transition-all cursor-pointer ${
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
                    className="w-6 h-6 flex items-center justify-center rounded-sm text-xs font-bold text-amber-800 hover:text-amber-950 hover:bg-white/80 disabled:opacity-35 disabled:hover:bg-transparent cursor-pointer transition-all"
                    title="Increase font size"
                    aria-label="Increase font size"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* 4. Copy */}
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-stone-200/80 hover:bg-stone-300 border border-stone-300 text-stone-800 font-medium text-xs transition-colors cursor-pointer shrink-0"
                title="Copy commentary to clipboard"
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

            {isReadingAloud && activeSpeakingSection && (
              <div className="text-xs font-serif italic text-amber-950 font-medium px-1">
                Section {speakingSectionIndex + 1}/{parsedSections.length}: {activeSpeakingSection.saintName}
              </div>
            )}
          </div>
        )}

        {/* RECTANGLE 3: Daily Commentary Passages (Hidden by default like Rectangle 2) */}
        {isTopSettingsOpen && (
          <div className="px-5 py-4 sm:px-6 min-h-[164px] bg-white/45 backdrop-blur-md border-t border-white/60 flex flex-col justify-between gap-3 rounded-b-xl animate-fadeIn">
            
            {/* Line 1: Daily Commentary Passages */}
            <div className="flex items-center">
              <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-stone-800">
                Daily Commentary Passages
              </span>
            </div>

            {/* Line 2: Passage Picker (Scrollable Passage Pills Row with Scroll Arrows) */}
            <div className="relative flex items-center gap-1.5">
              <button
                onClick={() => scrollPills('left')}
                className="p-1.5 rounded-xl bg-white/90 hover:bg-white text-stone-800 hover:text-amber-950 border border-stone-200 shadow-2xs shrink-0 cursor-pointer transition-colors"
                title="Scroll left"
                aria-label="Scroll passage list left"
              >
                <ChevronLeft className="w-4 h-4 text-amber-800" />
              </button>

              <div
                ref={scrollRef}
                className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 scroll-smooth w-full"
              >
                {activeList.map(comm => {
                  const isSelected = comm.id === selectedCommentary.id;
                  return (
                    <button
                      key={comm.id}
                      ref={el => { pillRefs.current[comm.id] = el; }}
                      onClick={() => handleSelectPassage(comm)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-amber-900 text-amber-50 shadow-md font-extrabold ring-2 ring-amber-400 border border-amber-300 scale-102'
                          : 'bg-[#7A502C] text-amber-50 hover:bg-[#8C5E35] border border-[#5C3A1E] shadow-2xs font-semibold'
                      }`}
                    >
                      {comm.dateLabel && (
                        <span className={`text-[10px] font-semibold uppercase ${isSelected ? 'text-amber-200' : 'text-amber-200/90 font-cinzel'}`}>
                          {comm.dateLabel}:
                        </span>
                      )}
                      <span>{comm.scriptureReference}</span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => scrollPills('right')}
                className="p-1.5 rounded-xl bg-amber-900 hover:bg-amber-800 text-amber-100 border border-amber-700 shadow-2xs shrink-0 cursor-pointer transition-colors"
                title="Scroll right"
                aria-label="Scroll passage list right"
              >
                <ChevronRight className="w-4 h-4 text-amber-200" />
              </button>
            </div>

            {/* Line 3: Commentaries by Month (November, December, January, February, March, April, May) */}
            <div>
              <div className="flex flex-wrap items-center gap-1.5 bg-[#4A2D15] p-1.5 rounded-lg border border-[#38210E] shadow-2xs">
                {[
                  { name: 'November', count: 30 },
                  { name: 'December', count: 31 },
                  { name: 'January', count: 31 },
                  { name: 'February', count: 28 },
                  { name: 'March', count: 31 },
                  { name: 'April', count: 30 },
                  { name: 'May', count: 31 }
                ].map(({ name, count }) => (
                  <button
                    key={name}
                    onClick={() => handleSelectMonth(name)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                      selectedMonth === name
                        ? 'bg-amber-900 text-amber-50 shadow-md font-bold ring-2 ring-amber-400 border border-amber-300'
                        : 'bg-[#7D522B] text-amber-50 hover:bg-[#8F5F34] border border-[#5C381A] shadow-2xs font-semibold'
                    }`}
                  >
                    {name} ({count})
                  </button>
                ))}
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Main Commentary Display Card */}
      <article className="bg-white rounded-xl p-5 sm:p-7 shadow-sm border border-stone-200/90 space-y-4">
        {/* The Scripture Text */}
        <div className="relative p-3.5 rounded-xl bg-[#FAF8F5] shadow-2xs overflow-hidden">
          <div className="pointer-events-none absolute inset-0 m-0" style={{ margin: 0 }}>
            <svg className="pointer-events-none absolute top-0 left-0 w-6 h-6 text-amber-800 m-0" style={{ margin: 0 }} viewBox="0 0 24 24" fill="none">
              <path d="M 20,1 H 12 A 11,11 0 0,0 1,12 V 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </svg>
            <svg className="pointer-events-none absolute top-0 right-0 w-6 h-6 text-amber-800 m-0" style={{ margin: 0 }} viewBox="0 0 24 24" fill="none">
              <path d="M 4,1 H 12 A 11,11 0 0,1 23,12 V 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </svg>
            <svg className="pointer-events-none absolute bottom-0 left-0 w-6 h-6 text-amber-800 m-0" style={{ margin: 0 }} viewBox="0 0 24 24" fill="none">
              <path d="M 20,23 H 12 A 11,11 0 0,1 1,12 V 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </svg>
            <svg className="pointer-events-none absolute bottom-0 right-0 w-6 h-6 text-amber-800 m-0" style={{ margin: 0 }} viewBox="0 0 24 24" fill="none">
              <path d="M 4,23 H 12 A 11,11 0 0,0 23,12 V 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </svg>
          </div>
          <div className="space-y-0.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 font-cinzel block">
              Sacred Scripture ({selectedCommentary.scriptureReference})
            </span>
            <p 
              className="font-serif-sacred text-stone-900 italic transition-all duration-200"
              style={scriptureStyle}
            >
              {toCurvedQuotes(selectedCommentary.scriptureText)}
            </p>
          </div>
        </div>

        {/* Patristic Commentary Sections (Catena Aurea, Cornelius à Lapide, Magisterium) */}
        <div className="pt-2">
          <StructuredCommentaryDisplay 
            commentaryText={selectedCommentary.commentaryText} 
            fontSizeStyle={commentaryStyle}
            hideHomily={true}
          />
        </div>

        {/* Practical Spiritual Application */}
        <div className="rounded-xl p-3.5 bg-amber-50/80 border border-amber-200/80 space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-amber-950 font-cinzel font-bold text-[11px] uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-amber-800" />
              <span>Spiritual Fruit and Practical Living</span>
            </div>
          </div>
          <p 
            className="font-serif-sacred text-stone-800 italic transition-all duration-200"
            style={applicationStyle}
          >
            &ldquo;{toCurvedQuotes(selectedCommentary.practicalApplication)}&rdquo;
          </p>
        </div>

        {/* Bottom Passage Navigation Arrows */}
        <div className="flex items-center justify-between pt-3 border-t border-stone-200 text-xs">
          <button
            onClick={handlePrevPassage}
            disabled={currentIndex <= 0}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-amber-100/70 border border-stone-300 text-stone-800 hover:text-amber-950 font-semibold disabled:opacity-40 disabled:hover:bg-stone-100 cursor-pointer transition-all shadow-2xs"
            title="Go to previous passage commentary"
            aria-label="Previous passage commentary"
          >
            <ChevronLeft className="w-4 h-4 text-amber-800" />
            <span className="truncate max-w-[140px] sm:max-w-none">
              {currentIndex > 0
                ? `${activeList[currentIndex - 1].dateLabel ? `${activeList[currentIndex - 1].dateLabel}: ` : ''}${activeList[currentIndex - 1].scriptureReference}`
                : 'Previous Passage'}
            </span>
          </button>

          <span className="font-cinzel text-stone-600 font-bold text-[11px] uppercase tracking-wider hidden xs:inline">
            Passage {currentIndex >= 0 ? currentIndex + 1 : 1} of {activeList.length}
          </span>

          <button
            onClick={handleNextPassage}
            disabled={currentIndex < 0 || currentIndex >= activeList.length - 1}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-amber-100/70 border border-stone-300 text-stone-800 hover:text-amber-950 font-semibold disabled:opacity-40 disabled:hover:bg-stone-100 cursor-pointer transition-all shadow-2xs"
            title="Go to next passage commentary"
            aria-label="Next passage commentary"
          >
            <span className="truncate max-w-[140px] sm:max-w-none">
              {currentIndex >= 0 && currentIndex < activeList.length - 1
                ? `${activeList[currentIndex + 1].dateLabel ? `${activeList[currentIndex + 1].dateLabel}: ` : ''}${activeList[currentIndex + 1].scriptureReference}`
                : 'Next Passage'}
            </span>
            <ChevronRight className="w-4 h-4 text-amber-800" />
          </button>
        </div>

      </article>

    </div>
  );
};
