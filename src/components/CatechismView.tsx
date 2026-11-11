import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Search, 
  BookOpen, 
  Compass, 
  ChevronLeft, 
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  ScrollText,
  Church,
  Sparkles,
  Settings,
  X
} from 'lucide-react';
import { MassReading } from '../types';
import { 
  GospelCatechismTopic, 
  getGospelCatechismForReading, 
  getAllGospelCatechisms,
  CATECHISM_YEAR_AND_MONTH_SPECS
} from '../data/gospelCatechism';
import { SacredReader } from '../utils/speech';
import { EucharisticCatechismView } from './EucharisticCatechismView';
import { MarianCatechismView } from './MarianCatechismView';
import { TrinityCatechismView } from './TrinityCatechismView';
import { SacramentsCatechismView } from './SacramentsCatechismView';
import { RessourcementView } from './RessourcementView';
import { toCurvedQuotes } from '../utils/typography';

type CatechismSubView = 'daily' | 'eucharist' | 'marian' | 'trinity' | 'sacraments' | 'ressourcement';

export interface CatechismViewProps {
  currentReading?: MassReading;
  currentDateStr?: string;
  onSelectDate?: (dateStr: string) => void;
}

export const CatechismView: React.FC<CatechismViewProps> = ({
  currentReading,
  currentDateStr,
  onSelectDate
}) => {
  const [activeSubView, setActiveSubView] = useState<CatechismSubView>('daily');
  const [selectedMonth, setSelectedMonth] = useState<string>(() => {
    if (currentDateStr && currentDateStr.length >= 7) {
      return currentDateStr.slice(0, 7);
    }
    return '2026-11';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [copied, setCopied] = useState(false);
  const [personalReflection, setPersonalReflection] = useState('');
  const [savedNote, setSavedNote] = useState(false);
  const [isTopicDropdownOpen, setIsTopicDropdownOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const topicDropdownRef = useRef<HTMLDivElement>(null);

  // Close topic picker dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (topicDropdownRef.current && !topicDropdownRef.current.contains(event.target as Node)) {
        setIsTopicDropdownOpen(false);
      }
    };
    if (isTopicDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isTopicDropdownOpen]);

  // All 426 daily Gospel Catechism topics for 1 year and 1 month: November 2026 through December 2027
  const allTopics = useMemo(() => getAllGospelCatechisms(), []);

  // Compute default topic matching active day's Gospel
  const defaultTopic = useMemo(() => {
    const targetDate = currentReading?.date || currentDateStr || '2026-11-04';
    const match = allTopics.find(t => t.dateKey === targetDate);
    if (match) return match;
    return getGospelCatechismForReading(currentReading, targetDate);
  }, [currentReading, currentDateStr, allTopics]);

  const [selectedTopic, setSelectedTopic] = useState<GospelCatechismTopic>(defaultTopic);

  // Sync when currentReading or currentDateStr updates
  useEffect(() => {
    const targetDate = currentReading?.date || currentDateStr || '2026-11-04';
    const match = allTopics.find(t => t.dateKey === targetDate);
    if (match) {
      setSelectedTopic(match);
    } else {
      setSelectedTopic(getGospelCatechismForReading(currentReading, targetDate));
    }
  }, [currentReading, currentDateStr, allTopics]);

  // Audio speech listener cleanup
  useEffect(() => {
    const unsub = SacredReader.addListener((speaking) => {
      setIsReadingAloud(speaking);
    });
    return () => {
      unsub();
      SacredReader.stop();
    };
  }, []);


  // Month filtering across 14 months (November 2026 to December 2027)
  const monthFilteredList = useMemo(() => {
    if (selectedMonth === 'All') return allTopics;
    return allTopics.filter(t => 
      t.monthYearKey === selectedMonth || 
      t.monthYearLabel === selectedMonth || 
      t.monthName === selectedMonth
    );
  }, [allTopics, selectedMonth]);

  // Search filtering
  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) return monthFilteredList;
    const q = searchQuery.toLowerCase();
    return monthFilteredList.filter(t =>
      t.topicTitle.toLowerCase().includes(q) ||
      t.gospelCitation.toLowerCase().includes(q) ||
      t.dateLabel.toLowerCase().includes(q) ||
      t.dateKey.toLowerCase().includes(q) ||
      t.paragraphsRange.toLowerCase().includes(q) ||
      t.catechismArticles.some(a => a.number.toString().includes(q) || a.text.toLowerCase().includes(q)) ||
      t.magisterialInputs.some(m => m.authority.toLowerCase().includes(q) || m.documentTitle.toLowerCase().includes(q) || m.insight.toLowerCase().includes(q))
    );
  }, [monthFilteredList, searchQuery]);

  const activeList = filteredTopics.length > 0 ? filteredTopics : monthFilteredList;
  const currentIndex = activeList.findIndex(t => t.id === selectedTopic.id);

  const handleSelectTopic = (topic: GospelCatechismTopic) => {
    setSelectedTopic(topic);
    if (topic.dateKey && onSelectDate) {
      onSelectDate(topic.dateKey);
    }
    if (isReadingAloud) SacredReader.stop();
  };

  const handleSelectMonth = (monthKey: string) => {
    setSelectedMonth(monthKey);
    if (monthKey !== 'All') {
      const firstInMonth = allTopics.find(t => 
        t.monthYearKey === monthKey || 
        t.monthYearLabel === monthKey || 
        t.monthName === monthKey
      );
      if (firstInMonth) {
        setSelectedTopic(firstInMonth);
        if (firstInMonth.dateKey && onSelectDate) onSelectDate(firstInMonth.dateKey);
        if (isReadingAloud) SacredReader.stop();
      }
    }
  };

  const handlePrevTopic = () => {
    if (allTopics.length === 0) return;
    const globalIdx = allTopics.findIndex(t => t.id === selectedTopic.id);
    const targetIdx = globalIdx > 0 ? globalIdx - 1 : allTopics.length - 1;
    const prev = allTopics[targetIdx];
    if (prev) {
      setSelectedTopic(prev);
      if (prev.monthYearKey && prev.monthYearKey !== selectedMonth) {
        setSelectedMonth(prev.monthYearKey);
      }
      if (prev.dateKey && onSelectDate) onSelectDate(prev.dateKey);
      if (isReadingAloud) SacredReader.stop();
    }
  };

  const handleNextTopic = () => {
    if (allTopics.length === 0) return;
    const globalIdx = allTopics.findIndex(t => t.id === selectedTopic.id);
    const targetIdx = (globalIdx >= 0 && globalIdx < allTopics.length - 1) ? globalIdx + 1 : 0;
    const next = allTopics[targetIdx];
    if (next) {
      setSelectedTopic(next);
      if (next.monthYearKey && next.monthYearKey !== selectedMonth) {
        setSelectedMonth(next.monthYearKey);
      }
      if (next.dateKey && onSelectDate) onSelectDate(next.dateKey);
      if (isReadingAloud) SacredReader.stop();
    }
  };

  const handleToggleReadAloud = () => {
    if (isReadingAloud) {
      SacredReader.stop();
    } else {
      const cccArticlesText = selectedTopic.catechismArticles
        .map(a => `Catechism paragraph ${a.number}. ${a.title || ''}. ${a.text}`)
        .join(' ');
      const magisterialText = selectedTopic.magisterialInputs
        .map(m => `${m.authority}, in ${m.documentTitle}: ${m.insight}`)
        .join(' ');
      const inBriefText = selectedTopic.inBrief.join(' ');

      const fullScript = `The Catechism on today's Holy Gospel: ${selectedTopic.topicTitle}. 
Gospel reference: ${selectedTopic.gospelCitation}. 
${selectedTopic.topicSubtitle}. 
What the Catechism of the Catholic Church teaches: 
${cccArticlesText} 
Authoritative Magisterial Inputs: 
${magisterialText} 
In Brief: 
${inBriefText} 
Meditation: 
${selectedTopic.meditationQuestion}`;

      SacredReader.speak(fullScript);
    }
  };

  const handleCopy = () => {
    const cccArticlesText = selectedTopic.catechismArticles
      .map(a => `[CCC ${a.number}] ${a.title ? `${a.title}\n` : ''}${a.text}`)
      .join('\n\n');

    const magisterialText = selectedTopic.magisterialInputs
      .map(m => `• ${m.authority} (${m.documentTitle} — ${m.citation}):\n  "${m.insight}"`)
      .join('\n\n');

    const copyText = `CATECHISM OF THE CATHOLIC CHURCH & MAGISTERIUM
Gospel Topic: ${selectedTopic.topicTitle}
Passage: ${selectedTopic.gospelCitation} (${selectedTopic.liturgicalDay})
Paragraphs: ${selectedTopic.paragraphsRange.startsWith('Catechism of the Catholic Church') ? selectedTopic.paragraphsRange : selectedTopic.paragraphsRange.replace(/^CCC\s*/i, 'Catechism of the Catholic Church ')}${selectedTopic.pillar ? `\nPillar: ${selectedTopic.pillar}` : ''}

WHAT THE CATECHISM SAYS ABOUT THIS TOPIC:
${cccArticlesText}

MAGISTERIAL AND INSIGHTFUL INPUTS:
${magisterialText}

IN BRIEF:
${selectedTopic.inBrief.map(b => `• ${b}`).join('\n')}

MEDITATION & PRACTICAL LIVING:
Question: "${selectedTopic.meditationQuestion}"
Living: "${selectedTopic.practicalLiving}"
Cross-references: ${selectedTopic.crossReferences.join(' • ')}`;

    navigator.clipboard.writeText(copyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveReflection = () => {
    setSavedNote(true);
    setTimeout(() => setSavedNote(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto p-3 sm:p-6 md:p-8 rounded-xl bg-white/45 backdrop-blur-xl backdrop-saturate-150 border border-white/60 ring-1 ring-inset ring-white/40 shadow-[0_8px_32px_0_rgba(120,90,50,0.12)] space-y-6 mb-12">
      
      {/* Main Top Banner: Gospel Topic & Authentic Catechism Declaration */}
      <div className="bg-white/55 backdrop-blur-xl backdrop-saturate-150 rounded-xl shadow-xs border border-white/70 ring-1 ring-inset ring-white/40 relative z-20">
        <div className={`sanctum-top-banner px-5 pt-4 pb-4 sm:px-6 min-h-[164px] bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-amber-50 shadow-md border border-stone-800 flex flex-col justify-between ${isSettingsOpen ? 'rounded-t-xl' : 'rounded-xl'}`}>
          <div className="space-y-1.5">
            {/* Line 1: Heading, Paragraphs Range & Subtitle */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs text-xs font-semibold uppercase tracking-wider whitespace-nowrap shrink-0 bg-amber-400 text-amber-950 font-cinzel">
                Catechism
              </span>
              <span className="text-xs sm:text-sm font-semibold text-amber-200/90 font-cinzel">
                {selectedTopic.paragraphsRange.startsWith('Catechism of the Catholic Church')
                  ? selectedTopic.paragraphsRange
                  : selectedTopic.paragraphsRange.replace(/^CCC\s*/i, 'Catechism of the Catholic Church ')}
              </span>
            </div>

            {/* Line 2: Topic Title */}
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-amber-100 leading-snug break-words">
              {toCurvedQuotes(selectedTopic.topicTitle)}
            </h2>

            {/* Subtitle / Theme description */}
            <p className="text-xs sm:text-sm text-stone-300 font-serif-sacred line-clamp-2 sm:line-clamp-1">
              {toCurvedQuotes(selectedTopic.topicSubtitle)}
            </p>
          </div>

          {/* Line 3: Bottom Bar with Topic Navigation & Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 mt-auto pt-3 border-t border-stone-800/80 w-full">
            {/* Left: Quick Date & Gospel Citation Navigation Bar */}
            <div className="inline-flex items-center h-8 rounded-md transition-all border border-[#8B5A2B]/60 bg-[#1C120C]/90 text-[#D4A373] hover:border-[#D4A373]/80 overflow-hidden shadow-xs max-w-full shrink-0">
              <button
                type="button"
                onClick={handlePrevTopic}
                className="h-full px-2.5 flex items-center justify-center text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                title="Previous Gospel Topic"
                aria-label="Previous Gospel Topic"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="w-px h-3.5 bg-[#8B5A2B]/60 self-center shrink-0" aria-hidden="true" />
              <button
                type="button"
                onClick={() => setIsSettingsOpen(prev => !prev)}
                className="h-full flex items-center gap-1.5 px-2 sm:px-2.5 text-xs font-medium hover:text-[#F7EBE1] hover:bg-white/10 transition-colors cursor-pointer select-none min-w-0"
                title="Open Settings to view Topics and Daily Gospel Topics"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#D4A373] shrink-0" />
                <span className="truncate leading-none font-cinzel text-amber-200 text-[11px] sm:text-xs max-w-[130px] sm:max-w-[210px] md:max-w-[280px]">
                  {selectedTopic.dateLabel} • {selectedTopic.gospelCitation}
                </span>
              </button>
              <span className="w-px h-3.5 bg-[#8B5A2B]/60 self-center shrink-0" aria-hidden="true" />
              <button
                type="button"
                onClick={handleNextTopic}
                className="h-full px-2.5 flex items-center justify-center text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
                title="Next Gospel Topic"
                aria-label="Next Gospel Topic"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Right: Settings, Audio, and Copy Action Buttons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsSettingsOpen(prev => !prev)}
                className={`h-8 px-2.5 sm:px-3 rounded-md text-xs font-cinzel font-semibold transition-all cursor-pointer flex items-center gap-1.5 shadow-xs border ${
                  isSettingsOpen
                    ? 'bg-amber-700 text-white border-amber-400 ring-1 ring-amber-400/50'
                    : 'bg-[#5A381C] hover:bg-[#6B4423] text-amber-100 border-[#8B5A2B]/70 hover:border-amber-400/60'
                }`}
                title={isSettingsOpen ? 'Close Settings' : 'Open Settings (Topics & Daily Gospel Topics)'}
                aria-label="Settings"
              >
                <Settings className={`w-3.5 h-3.5 text-amber-300 transition-transform duration-200 ${isSettingsOpen ? 'rotate-90 text-white' : ''}`} />
                <span>Settings</span>
                <ChevronDown className={`w-3 h-3 text-amber-300/80 transition-transform duration-150 ${isSettingsOpen ? 'rotate-180' : ''}`} />
              </button>

              <button
                onClick={handleToggleReadAloud}
                className={`h-8 p-2 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-xs flex items-center justify-center shrink-0 ${
                  isReadingAloud
                    ? 'bg-amber-600 text-white animate-pulse'
                    : 'bg-[#5A381C] hover:bg-[#6B4423] text-amber-100 border border-[#8B5A2B]/70'
                }`}
                title={isReadingAloud ? 'Stop Audio' : 'Listen to Catechism Teaching & Magisterium'}
                aria-label={isReadingAloud ? 'Stop Audio' : 'Listen to Catechism'}
              >
                {isReadingAloud ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-300" />}
              </button>

              <button
                onClick={handleCopy}
                className="h-8 p-2 rounded-lg bg-stone-800/90 hover:bg-stone-700 text-amber-200 border border-stone-700 text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center shrink-0"
                title={copied ? 'Copied to clipboard' : 'Copy Catechism and Magisterium text'}
                aria-label="Copy Catechism text"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* SETTINGS PANEL IN RECTANGLE 2 */}
        {isSettingsOpen && (
          <div className="px-5 py-3.5 sm:px-6 bg-[#140C08]/95 backdrop-blur-md border-t border-[#8B5A2B]/50 flex flex-col justify-center gap-3 animate-fadeIn rounded-b-xl border border-t-0 border-[#8B5A2B]/60 shadow-inner">
            {/* Settings Header */}
            <div className="flex items-center justify-between pb-2 border-b border-[#8B5A2B]/40">
              <div className="flex items-center gap-2 text-amber-300">
                <Settings className="w-4 h-4 text-amber-400" />
                <span className="font-cinzel text-xs sm:text-sm font-bold uppercase tracking-wider">
                  Settings: Topics & Daily Gospel Topics
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsSettingsOpen(false)}
                className="p-1 rounded-md text-stone-400 hover:text-amber-200 hover:bg-white/10 transition-colors cursor-pointer text-xs flex items-center gap-1"
                title="Close Settings"
                aria-label="Close Settings"
              >
                <X className="w-4 h-4 text-amber-400" />
                <span className="text-[11px] font-cinzel text-stone-300">Close</span>
              </button>
            </div>

            {/* 1. Topics */}
            <div className="space-y-1.5">
              <span className="font-cinzel text-[11px] font-bold uppercase tracking-wider text-amber-300/80 block">
                Topics
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
                {/* 1. Gospel Topic & CCC */}
                <button
                  onClick={() => setActiveSubView('daily')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    activeSubView === 'daily'
                      ? 'bg-amber-900 text-amber-50 shadow-xs font-bold border border-amber-500'
                      : 'bg-stone-850/90 text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-700/60'
                  }`}
                >
                  <span>Gospel Topic & CCC</span>
                </button>

                {/* 2. Holy Trinity */}
                <button
                  onClick={() => setActiveSubView('trinity')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    activeSubView === 'trinity'
                      ? 'bg-amber-900 text-amber-50 shadow-xs font-bold border border-amber-500'
                      : 'bg-stone-850/90 text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-700/60'
                  }`}
                >
                  <span>Holy Trinity</span>
                </button>

                {/* 3. Holy Eucharist */}
                <button
                  onClick={() => setActiveSubView('eucharist')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    activeSubView === 'eucharist'
                      ? 'bg-amber-900 text-amber-50 shadow-xs font-bold border border-amber-500'
                      : 'bg-stone-850/90 text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-700/60'
                  }`}
                >
                  <span>Holy Eucharist</span>
                </button>

                {/* 4. Seven Sacraments */}
                <button
                  onClick={() => setActiveSubView('sacraments')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    activeSubView === 'sacraments'
                      ? 'bg-amber-900 text-amber-50 shadow-xs font-bold border border-amber-500'
                      : 'bg-stone-850/90 text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-700/60'
                  }`}
                >
                  <span>Seven Sacraments</span>
                </button>

                {/* 5. Mary and Her Apparitions */}
                <button
                  onClick={() => setActiveSubView('marian')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    activeSubView === 'marian'
                      ? 'bg-amber-900 text-amber-50 shadow-xs font-bold border border-amber-500'
                      : 'bg-stone-850/90 text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-700/60'
                  }`}
                >
                  <span>Mary and Her Apparitions</span>
                </button>

                {/* 6. Ressourcement */}
                <button
                  onClick={() => setActiveSubView('ressourcement')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    activeSubView === 'ressourcement'
                      ? 'bg-amber-900 text-amber-50 shadow-xs font-bold border border-amber-500'
                      : 'bg-stone-850/90 text-stone-300 hover:text-white hover:bg-stone-800 border border-stone-700/60'
                  }`}
                >
                  <span>Ressourcement</span>
                </button>
              </div>
            </div>

            {/* 2. Daily Gospel Topics */}
            <div className="pt-2 border-t border-[#8B5A2B]/40 space-y-2">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5">
                <div className="flex flex-wrap items-center gap-2 max-w-full">
                  <span className="font-cinzel text-[11px] font-bold uppercase tracking-wider text-amber-300/80 shrink-0">
                    Daily Gospel Topics
                  </span>
                  <div className="inline-flex items-center rounded-lg border border-[#8B5A2B]/80 bg-[#251710] text-amber-200 overflow-hidden shadow-2xs max-w-full shrink-0">
                    <button
                      type="button"
                      onClick={handlePrevTopic}
                      className="px-2.5 py-1 hover:bg-white/10 text-amber-300 transition-colors cursor-pointer flex items-center justify-center shrink-0"
                      title="Previous Gospel Topic"
                      aria-label="Previous Gospel Topic"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] font-semibold px-2 sm:px-2.5 py-0.5 font-cinzel border-x border-[#8B5A2B]/60 text-amber-100 truncate max-w-[140px] sm:max-w-[200px]">
                      {selectedTopic.dateLabel} • {selectedTopic.gospelCitation}
                    </span>
                    <button
                      type="button"
                      onClick={handleNextTopic}
                      className="px-2.5 py-1 hover:bg-white/10 text-amber-300 transition-colors cursor-pointer flex items-center justify-center shrink-0"
                      title="Next Gospel Topic"
                      aria-label="Next Gospel Topic"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 max-w-full">
                  {/* Month Selector: Nov 2026 – Dec 2027 */}
                  <div className="flex items-center gap-1.5 bg-[#251710] p-1 rounded-lg border border-[#8B5A2B]/60 shadow-2xs shrink-0">
                    <span className="text-[11px] font-cinzel font-bold text-amber-300/80 pl-1 shrink-0 hidden sm:inline">
                      Month:
                    </span>
                    <select
                      value={selectedMonth}
                      onChange={(e) => handleSelectMonth(e.target.value)}
                      className="text-xs font-semibold py-1 px-2.5 rounded-md bg-stone-900 text-amber-100 border border-amber-800/60 focus:outline-none focus:border-amber-400 cursor-pointer shadow-2xs font-cinzel max-w-[160px] sm:max-w-none"
                      title="Jump to any month from November 2026 to December 2027"
                      aria-label="Select Liturgical Month"
                    >
                      {CATECHISM_YEAR_AND_MONTH_SPECS.map(spec => (
                        <option key={spec.key} value={spec.key}>
                          {spec.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Quick Prev / Next Topic Buttons with Arrows */}
                  <div className="flex items-center gap-1 bg-[#251710] border border-[#8B5A2B]/60 rounded-lg p-0.5 shadow-2xs shrink-0">
                    <button
                      onClick={handlePrevTopic}
                      className="p-1 rounded-md text-amber-200 hover:text-white hover:bg-white/10 cursor-pointer transition-all flex items-center gap-1 text-xs font-semibold px-2 font-cinzel shrink-0"
                      title="Previous Gospel Topic"
                      aria-label="Previous Gospel Topic"
                    >
                      <ChevronLeft className="w-3.5 h-3.5 text-amber-400" />
                      <span>Prev</span>
                    </button>
                    <span className="text-amber-700/60">|</span>
                    <button
                      onClick={handleNextTopic}
                      className="p-1 rounded-md text-amber-200 hover:text-white hover:bg-white/10 cursor-pointer transition-all flex items-center gap-1 text-xs font-semibold px-2 font-cinzel shrink-0"
                      title="Next Gospel Topic"
                      aria-label="Next Gospel Topic"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-3.5 h-3.5 text-amber-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Render Selected View */}
      {activeSubView === 'eucharist' && <EucharisticCatechismView />}
      {activeSubView === 'marian' && <MarianCatechismView />}
      {activeSubView === 'trinity' && <TrinityCatechismView />}
      {activeSubView === 'sacraments' && <SacramentsCatechismView />}
      {activeSubView === 'ressourcement' && <RessourcementView />}

      {/* DEFAULT PAGE: What the Catechism Says About Whatever is the Topic of the Gospel */}
      {activeSubView === 'daily' && (
        <div className="space-y-5">
          {/* Main Article Display Card */}
          <article className="bg-white rounded-xl p-4 sm:p-8 shadow-sm border border-stone-200/90 space-y-8 overflow-hidden">

            {/* SECTION 1: GOSPEL SUMMARY */}
            <div className="relative p-4 rounded-xl bg-[#FAF8F5] border border-amber-200/60 shadow-2xs overflow-hidden">
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
              
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-amber-900 font-cinzel font-bold text-sm sm:text-base uppercase tracking-wider">
                  <BookOpen className="w-4 h-4 shrink-0" />
                  <span>Gospel Summary ({selectedTopic.gospelCitation})</span>
                </div>
                <p className="font-serif-sacred text-stone-900 text-xl sm:text-[21px] leading-[1.8] pl-1 whitespace-pre-line">
                  {toCurvedQuotes(selectedTopic.gospelTextSnippet)}
                </p>
              </div>
            </div>

            {/* SECTION 2: WHAT THE CATECHISM OF THE CATHOLIC CHURCH TEACHES */}
            <div className="space-y-4">
              <div className="flex items-start gap-2 border-b border-stone-200 pb-2.5">
                <ShieldCheck className="w-5 h-5 text-amber-800 mt-0.5 shrink-0" />
                <h3 className="font-cinzel text-base sm:text-lg font-bold text-stone-900 uppercase tracking-wide leading-tight">
                  <span className="block">What the Catechism of the Catholic Church Teaches</span>
                  <span className="block">About This Topic</span>
                </h3>
              </div>

              <div className="space-y-5">
                {selectedTopic.catechismArticles.map((art) => (
                  <div key={art.number} className="p-4 sm:p-5 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8] space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#6B4423] text-white font-cinzel font-bold text-xs sm:text-sm shadow-2xs">
                        CCC {art.number}
                      </span>
                      {art.title && (
                        <span className="font-cinzel text-xs sm:text-sm font-semibold text-amber-950 uppercase tracking-wider">
                          {toCurvedQuotes(art.title)}
                        </span>
                      )}
                    </div>

                    <p className="font-serif-sacred text-stone-900 text-lg sm:text-xl leading-relaxed pt-1 pl-3 border-l-2 border-amber-800">
                      {toCurvedQuotes(art.text)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 3: MAGISTERIAL & INSIGHTFUL INPUTS */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2 border-b border-stone-200 pb-2.5">
                <Church className="w-5 h-5 text-amber-800" />
                <h3 className="font-cinzel text-base sm:text-lg font-bold text-stone-900 uppercase tracking-wide">
                  Magisterial and Insightful Inputs on the Topic
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedTopic.magisterialInputs.map((input, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-amber-50/50 border border-amber-200/70 shadow-2xs space-y-2 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold font-cinzel text-amber-900 uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                        <span>{toCurvedQuotes(input.authority)}</span>
                      </div>
                      <p className="font-cinzel font-semibold text-xs sm:text-sm text-stone-800">
                        {toCurvedQuotes(input.documentTitle)} ({toCurvedQuotes(input.citation)})
                      </p>
                      <p className="font-serif text-stone-900 text-lg sm:text-xl italic leading-relaxed pt-1">
                        &ldquo;{toCurvedQuotes(input.insight)}&rdquo;
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 4: IN BRIEF — CORE DOCTRINE SUMMARY */}
            <div className="rounded-xl p-5 bg-amber-50/80 border border-amber-200/80 space-y-3">
              <div className="flex items-center gap-2 text-amber-950 font-serif font-bold text-lg sm:text-xl">
                <ScrollText className="w-4 h-4 text-amber-800" />
                <span>In Brief — Authentic Magisterial Synthesis</span>
              </div>
              <ul className="space-y-2 text-lg sm:text-xl text-stone-900 font-serif leading-relaxed">
                {selectedTopic.inBrief.map((brief, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-800 font-bold">•</span>
                    <span>{toCurvedQuotes(brief)}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* SECTION 5: MEDITATION & PRACTICAL LIVING */}
            <div className="rounded-xl p-5 bg-[#FAF8F5] border border-stone-200/90 space-y-4">
              <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-lg sm:text-xl">
                <Compass className="w-4 h-4 text-amber-800" />
                <span>Spiritual Meditation & Practical Living in Grace</span>
              </div>
              
              <div className="space-y-2.5 pl-3 border-l-2 border-amber-800">
                <p className="text-stone-900 font-serif text-lg sm:text-xl italic leading-relaxed">
                  &ldquo;{toCurvedQuotes(selectedTopic.meditationQuestion)}&rdquo;
                </p>
                <p className="text-amber-950 font-serif text-lg sm:text-xl leading-relaxed">
                  <span className="font-semibold text-amber-900 font-cinzel text-xs sm:text-sm uppercase tracking-wider block">Practical Application:</span>
                  {toCurvedQuotes(selectedTopic.practicalLiving)}
                </p>
              </div>

              {/* Cross-References */}
              {selectedTopic.crossReferences && (
                <div className="pt-2 text-sm text-stone-700 flex flex-wrap items-center gap-2 font-serif">
                  <span className="font-semibold text-stone-800 font-cinzel">Scriptural & CCC Cross-References:</span>
                  <span>{selectedTopic.crossReferences.join(' • ')}</span>
                </div>
              )}

              {/* Personal Spiritual Notebook */}
              <div className="space-y-2 pt-3 border-t border-stone-200/80">
                <textarea
                  value={personalReflection}
                  onChange={(e) => setPersonalReflection(e.target.value)}
                  placeholder="Record your prayer response or reflection on today's Catechism teaching..."
                  className="w-full h-24 p-3 rounded-lg bg-white border border-stone-300 text-xs sm:text-sm font-serif-sacred focus:outline-none focus:border-amber-800 resize-none"
                />
                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-stone-500">
                    Your private spiritual notes remain stored in your local session.
                  </span>
                  <button
                    onClick={handleSaveReflection}
                    className="px-3.5 py-1.5 rounded-lg bg-amber-900 hover:bg-amber-800 text-amber-100 text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <span>{savedNote ? 'Saved to Soul' : 'Save Reflection'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Navigation between Topics */}
            {(() => {
              const globalIdx = allTopics.findIndex(t => t.id === selectedTopic.id);
              const hasPrev = globalIdx > 0;
              const hasNext = globalIdx >= 0 && globalIdx < allTopics.length - 1;
              return (
                <div className="flex items-center justify-between gap-2 pt-4 border-t border-stone-200 text-xs w-full overflow-hidden">
                  <button
                    onClick={handlePrevTopic}
                    disabled={!hasPrev}
                    className="flex-1 min-w-0 max-w-[48%] flex items-center justify-start gap-1 sm:gap-2 px-2.5 sm:px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-amber-100/70 border border-stone-300 text-stone-800 hover:text-amber-950 font-semibold disabled:opacity-35 disabled:hover:bg-stone-100 cursor-pointer transition-all shadow-2xs"
                    title="Previous Gospel Topic"
                    aria-label="Previous Gospel Topic"
                  >
                    <ChevronLeft className="w-4 h-4 text-amber-800 shrink-0" />
                    <span className="truncate min-w-0 text-left">
                      {hasPrev
                        ? `${allTopics[globalIdx - 1].dateLabel}: ${allTopics[globalIdx - 1].gospelCitation}`
                        : 'Previous Topic'}
                    </span>
                  </button>

                  <button
                    onClick={handleNextTopic}
                    disabled={!hasNext}
                    className="flex-1 min-w-0 max-w-[48%] flex items-center justify-end gap-1 sm:gap-2 px-2.5 sm:px-3.5 py-2 rounded-xl bg-stone-100 hover:bg-amber-100/70 border border-stone-300 text-stone-800 hover:text-amber-950 font-semibold disabled:opacity-35 disabled:hover:bg-stone-100 cursor-pointer transition-all shadow-2xs"
                    title="Next Gospel Topic"
                    aria-label="Next Gospel Topic"
                  >
                    <span className="truncate min-w-0 text-right">
                      {hasNext
                        ? `${allTopics[globalIdx + 1].dateLabel}: ${allTopics[globalIdx + 1].gospelCitation}`
                        : 'Next Topic'}
                    </span>
                    <ChevronRight className="w-4 h-4 text-amber-800 shrink-0" />
                  </button>
                </div>
              );
            })()}

          </article>
        </div>
      )}

    </div>
  );
};
