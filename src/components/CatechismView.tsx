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
  Sparkles
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
    <div className="max-w-5xl mx-auto p-3 sm:p-5 md:p-6 rounded-xl bg-white/45 backdrop-blur-xl backdrop-saturate-150 border border-white/60 ring-1 ring-inset ring-white/40 shadow-[0_8px_32px_0_rgba(120,90,50,0.12)] space-y-4 sm:space-y-5 mb-12">
      
      {/* Main Top Banner: Gospel Topic & Authentic Catechism Declaration */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 rounded-xl p-5 sm:p-6 text-amber-50 shadow-md border border-stone-800 space-y-3 sm:space-y-4">
        {/* Large "Catechism" Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-amber-100 tracking-normal leading-tight">
          Catechism
        </h2>

        {/* Large Topic Title with Subtitle below it */}
        <div className="space-y-1.5">
          <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-[#D4A373] leading-tight">
            {toCurvedQuotes(selectedTopic.topicTitle)}
          </h3>

          <p className="text-sm sm:text-base text-stone-300 font-serif-sacred max-w-3xl leading-relaxed">
            {toCurvedQuotes(selectedTopic.topicSubtitle)}
          </p>
        </div>

        {/* Bottom Bar: Paragraphs Range at bottom-left, Settings/Actions at bottom-right */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-stone-800/80">
          <div className="text-xs sm:text-sm font-semibold text-amber-200/90 font-cinzel">
            {selectedTopic.paragraphsRange.startsWith('Catechism of the Catholic Church')
              ? selectedTopic.paragraphsRange
              : selectedTopic.paragraphsRange.replace(/^CCC\s*/i, 'Catechism of the Catholic Church ')}
          </div>

          {/* Settings at the bottom (right side) */}
          <div className="flex flex-wrap items-center gap-2 shrink-0 sm:self-auto">
            {/* Interactive Topic Picker with Arrows */}
            <div className="relative shrink-0" ref={topicDropdownRef}>
              <div className="inline-flex items-center h-8 rounded-md transition-all border border-[#8B5A2B]/60 bg-[#1C120C]/90 text-[#D4A373] hover:border-[#D4A373]/80 overflow-hidden shadow-xs">
                {/* Left Arrow: Previous Topic */}
                <button
                  type="button"
                  onClick={handlePrevTopic}
                  className="h-full px-2.5 flex items-center justify-center text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Previous Gospel Topic"
                  aria-label="Previous Gospel Topic"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                {/* Thin Separator 1 */}
                <span className="w-px h-3.5 bg-[#8B5A2B]/60 self-center shrink-0" aria-hidden="true" />

                {/* Center: Topic Picker Dropdown Toggle */}
                <button
                  type="button"
                  onClick={() => setIsTopicDropdownOpen(prev => !prev)}
                  className="h-full flex items-center gap-1.5 px-3 text-xs font-medium hover:text-[#F7EBE1] hover:bg-white/10 transition-colors cursor-pointer select-none"
                  title="Open Gospel Topics Directory"
                  aria-label="Open Gospel Topics Directory"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#D4A373] shrink-0" />
                  <span className="whitespace-nowrap leading-none font-cinzel text-amber-200">
                    {selectedTopic.dateLabel} • {selectedTopic.gospelCitation}
                  </span>
                  <ChevronDown className={`w-3 h-3 text-[#D4A373] shrink-0 transition-transform duration-150 ${isTopicDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Thin Separator 2 */}
                <span className="w-px h-3.5 bg-[#8B5A2B]/60 self-center shrink-0" aria-hidden="true" />

                {/* Right Arrow: Next Topic */}
                <button
                  type="button"
                  onClick={handleNextTopic}
                  className="h-full px-2.5 flex items-center justify-center text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Next Gospel Topic"
                  aria-label="Next Gospel Topic"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Topic Dropdown Popover */}
              {isTopicDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 max-h-96 bg-[#24150B] border border-[#A67B4E]/80 rounded-xl shadow-2xl p-3 z-50 overflow-hidden flex flex-col gap-2 animate-in fade-in duration-150">
                  <div className="flex items-center justify-between pb-2 border-b border-[#8B5A2B]/40">
                    <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-amber-200">
                      Pick Gospel Topic (Nov 2026 – Dec 2027)
                    </span>
                    <span className="text-[10px] text-amber-300/70 font-cinzel">
                      {selectedTopic.dateLabel}
                    </span>
                  </div>

                  {/* Quick Search */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search Gospel citation, date, theme..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full text-xs pl-7 pr-2.5 py-1.5 rounded-lg bg-stone-900/90 text-amber-100 placeholder-stone-400 border border-amber-700/50 focus:outline-none focus:border-amber-400"
                    />
                    <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2 top-2" />
                  </div>

                  {/* Scrollable list of topics */}
                  <div className="overflow-y-auto max-h-64 space-y-1 pr-1 custom-scrollbar">
                    {activeList.map(topic => {
                      const isSelected = topic.id === selectedTopic.id;
                      return (
                        <button
                          key={topic.id}
                          onClick={() => {
                            handleSelectTopic(topic);
                            setIsTopicDropdownOpen(false);
                          }}
                          className={`w-full text-left px-2.5 py-2 rounded-lg text-xs transition-colors flex items-start gap-2 cursor-pointer ${
                            isSelected
                              ? 'bg-amber-900/90 text-amber-100 font-bold border border-amber-600/60'
                              : 'text-stone-300 hover:text-amber-100 hover:bg-stone-800/80'
                          }`}
                        >
                          <span className="font-cinzel text-amber-300 font-bold shrink-0 text-[11px] pt-0.5">
                            {topic.dateLabel}:
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="font-semibold truncate">{topic.gospelCitation}</div>
                            <div className="text-[10px] text-stone-400 truncate font-serif">{topic.topicTitle}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Audio Narration */}
            <button
              onClick={handleToggleReadAloud}
              className={`p-2 rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-xs flex items-center justify-center ${
                isReadingAloud
                  ? 'bg-amber-600 text-white animate-pulse'
                  : 'bg-[#5A381C] hover:bg-[#6B4423] text-amber-100 border border-[#8B5A2B]/70'
              }`}
              title={isReadingAloud ? 'Stop Audio' : 'Listen to Catechism Teaching & Magisterium'}
              aria-label={isReadingAloud ? 'Stop Audio' : 'Listen to Catechism'}
            >
              {isReadingAloud ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-300" />}
            </button>

            {/* Copy Teaching */}
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg bg-stone-800/90 hover:bg-stone-700 text-amber-200 border border-stone-700 text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center"
              title={copied ? 'Copied to clipboard' : 'Copy Catechism and Magisterium text'}
              aria-label="Copy Catechism text"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* UNIFIED TOPICS RECTANGLE: Special Topics & Daily Gospel Topics in One Rectangle */}
      <div className="bg-white/55 backdrop-blur-xl backdrop-saturate-150 rounded-xl p-3 sm:p-4 border border-white/70 ring-1 ring-inset ring-white/40 shadow-[0_8px_32px_0_rgba(120,90,50,0.12)] space-y-3">
        {/* ROW 1: Special Topics Navigation Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
          <span className="font-cinzel text-[11px] font-bold uppercase tracking-wider text-stone-700 pl-1 shrink-0 hidden md:inline">
            Topics:
          </span>
          {/* 1. Daily Gospel Catechism (Default Page) */}
          <button
            onClick={() => setActiveSubView('daily')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeSubView === 'daily'
                ? 'bg-amber-900 text-amber-50 shadow-xs font-bold'
                : 'text-stone-700 hover:text-amber-950 hover:bg-stone-200/60'
            }`}
          >
            <span>Gospel Topic & CCC</span>
          </button>

          {/* 2. Holy Trinity */}
          <button
            onClick={() => setActiveSubView('trinity')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeSubView === 'trinity'
                ? 'bg-amber-900 text-amber-50 shadow-xs font-bold'
                : 'text-stone-700 hover:text-amber-950 hover:bg-stone-200/60'
            }`}
          >
            <span>Holy Trinity</span>
          </button>

          {/* 3. Holy Eucharist */}
          <button
            onClick={() => setActiveSubView('eucharist')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeSubView === 'eucharist'
                ? 'bg-amber-900 text-amber-50 shadow-xs font-bold'
                : 'text-stone-700 hover:text-amber-950 hover:bg-stone-200/60'
            }`}
          >
            <span>Holy Eucharist</span>
          </button>

          {/* 4. Seven Sacraments */}
          <button
            onClick={() => setActiveSubView('sacraments')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeSubView === 'sacraments'
                ? 'bg-amber-900 text-amber-50 shadow-xs font-bold'
                : 'text-stone-700 hover:text-amber-950 hover:bg-stone-200/60'
            }`}
          >
            <span>Seven Sacraments</span>
          </button>

          {/* 5. Mary and Her Apparitions */}
          <button
            onClick={() => setActiveSubView('marian')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeSubView === 'marian'
                ? 'bg-amber-900 text-amber-50 shadow-xs font-bold'
                : 'text-stone-700 hover:text-amber-950 hover:bg-stone-200/60'
            }`}
          >
            <span>Mary and Her Apparitions</span>
          </button>

          {/* 6. Ressourcement */}
          <button
            onClick={() => setActiveSubView('ressourcement')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeSubView === 'ressourcement'
                ? 'bg-amber-900 text-amber-50 shadow-xs font-bold'
                : 'text-stone-700 hover:text-amber-950 hover:bg-stone-200/60'
            }`}
          >
            <span>Ressourcement</span>
          </button>
        </div>

        {/* ROW 2: Daily Gospel Topics Controls & Carousel (within the same rectangle when in Daily Gospel mode) */}
        {activeSubView === 'daily' && (
          <div className="pt-2.5 border-t border-stone-200/70 space-y-2.5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-cinzel text-[11px] font-bold uppercase tracking-wider text-stone-700">
                  Daily Gospel Topics
                </span>
                <div className="inline-flex items-center rounded-lg border border-amber-200/80 bg-amber-100/90 text-amber-950 overflow-hidden shadow-2xs">
                  <button
                    type="button"
                    onClick={handlePrevTopic}
                    className="px-2 py-1 hover:bg-amber-200/70 text-amber-900 transition-colors cursor-pointer flex items-center justify-center"
                    title="Previous Gospel Topic"
                    aria-label="Previous Gospel Topic"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 font-cinzel border-x border-amber-200/80">
                    {selectedTopic.dateLabel} • {selectedTopic.gospelCitation}
                  </span>
                  <button
                    type="button"
                    onClick={handleNextTopic}
                    className="px-2 py-1 hover:bg-amber-200/70 text-amber-900 transition-colors cursor-pointer flex items-center justify-center"
                    title="Next Gospel Topic"
                    aria-label="Next Gospel Topic"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Month Selector: Nov 2026 – Dec 2027 */}
                <div className="flex items-center gap-1.5 bg-stone-100/95 p-1 rounded-xl border border-stone-200 shadow-2xs">
                  <span className="text-[11px] font-cinzel font-bold text-stone-700 pl-1.5 shrink-0 hidden sm:inline">
                    Month:
                  </span>
                  <select
                    value={selectedMonth}
                    onChange={(e) => handleSelectMonth(e.target.value)}
                    className="text-xs font-semibold py-1 px-2.5 rounded-lg bg-white text-stone-800 border border-stone-300 focus:outline-none focus:border-amber-700 cursor-pointer shadow-2xs font-cinzel"
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
                <div className="flex items-center gap-1 bg-white/80 border border-stone-200/90 rounded-xl p-0.5 shadow-2xs">
                  <button
                    onClick={handlePrevTopic}
                    className="p-1 rounded-lg text-stone-800 hover:text-amber-950 hover:bg-amber-100/80 cursor-pointer transition-all flex items-center gap-1 text-xs font-semibold px-2"
                    title="Previous Gospel Topic"
                    aria-label="Previous Gospel Topic"
                  >
                    <ChevronLeft className="w-4 h-4 text-amber-800" />
                    <span>Prev</span>
                  </button>
                  <span className="text-stone-300">|</span>
                  <button
                    onClick={handleNextTopic}
                    className="p-1 rounded-lg text-stone-800 hover:text-amber-950 hover:bg-amber-100/80 cursor-pointer transition-all flex items-center gap-1 text-xs font-semibold px-2"
                    title="Next Gospel Topic"
                    aria-label="Next Gospel Topic"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4 text-amber-800" />
                  </button>
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
          <article className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-stone-200/90 space-y-8">

            {/* SECTION 1: GOSPEL SUMMARY */}
            <div className="relative p-4 rounded-xl bg-[#FAF8F5] border border-amber-200/60 shadow-2xs space-y-1.5">
              <span className="pointer-events-none absolute top-0 left-0 w-4 h-4 rounded-tl-xl border-t-[3px] border-l-[3px] border-amber-800" />
              <span className="pointer-events-none absolute top-0 right-0 w-4 h-4 rounded-tr-xl border-t-[3px] border-r-[3px] border-amber-800" />
              <span className="pointer-events-none absolute bottom-0 left-0 w-4 h-4 rounded-bl-xl border-b-[3px] border-l-[3px] border-amber-800" />
              <span className="pointer-events-none absolute bottom-0 right-0 w-4 h-4 rounded-br-xl border-b-[3px] border-r-[3px] border-amber-800" />
              
              <div className="flex items-center gap-1.5 text-amber-900 font-cinzel font-bold text-xs uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Gospel Summary ({selectedTopic.gospelCitation})</span>
              </div>
              <p className="font-serif text-stone-800 italic text-sm sm:text-base leading-relaxed pl-1 whitespace-pre-line">
                {toCurvedQuotes(selectedTopic.gospelTextSnippet)}
              </p>
            </div>

            {/* SECTION 2: WHAT THE CATECHISM OF THE CATHOLIC CHURCH SAYS */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-stone-200 pb-2.5">
                <ShieldCheck className="w-5 h-5 text-amber-800" />
                <h3 className="font-cinzel text-base sm:text-lg font-bold text-stone-900 uppercase tracking-wide">
                  What the Catechism of the Catholic Church Says About This Topic
                </h3>
              </div>

              <div className="space-y-5">
                {selectedTopic.catechismArticles.map((art) => (
                  <div key={art.number} className="p-4 sm:p-5 rounded-xl bg-[#FAF7F2] border border-[#E8DEC8] space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#6B4423] text-white font-cinzel font-bold text-xs shadow-2xs">
                        CCC {art.number}
                      </span>
                      {art.title && (
                        <span className="font-cinzel text-xs font-semibold text-amber-950 uppercase tracking-wider">
                          {toCurvedQuotes(art.title)}
                        </span>
                      )}
                    </div>

                    <p className="font-serif text-stone-900 text-base sm:text-lg leading-relaxed pt-1 pl-3 border-l-2 border-amber-800">
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
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold font-cinzel text-amber-900 uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                        <span>{toCurvedQuotes(input.authority)}</span>
                      </div>
                      <p className="font-cinzel font-semibold text-xs text-stone-800">
                        {toCurvedQuotes(input.documentTitle)} ({toCurvedQuotes(input.citation)})
                      </p>
                      <p className="font-serif text-stone-800 text-sm sm:text-base italic leading-relaxed pt-1">
                        &ldquo;{toCurvedQuotes(input.insight)}&rdquo;
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 4: IN BRIEF — CORE DOCTRINE SUMMARY */}
            <div className="rounded-xl p-5 bg-amber-50/80 border border-amber-200/80 space-y-3">
              <div className="flex items-center gap-2 text-amber-950 font-serif font-bold text-base sm:text-lg">
                <ScrollText className="w-4 h-4 text-amber-800" />
                <span>In Brief — Authentic Magisterial Synthesis</span>
              </div>
              <ul className="space-y-2 text-base text-stone-800 font-serif leading-relaxed">
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
              <div className="flex items-center gap-2 text-stone-900 font-serif font-bold text-base sm:text-lg">
                <Compass className="w-4 h-4 text-amber-800" />
                <span>Spiritual Meditation & Practical Living in Grace</span>
              </div>
              
              <div className="space-y-2 pl-3 border-l-2 border-amber-800">
                <p className="text-stone-900 font-serif text-base sm:text-lg italic leading-relaxed">
                  &ldquo;{toCurvedQuotes(selectedTopic.meditationQuestion)}&rdquo;
                </p>
                <p className="text-amber-950 font-serif text-sm sm:text-base leading-relaxed">
                  <span className="font-semibold text-amber-900 font-cinzel text-xs uppercase tracking-wider block">Practical Application:</span>
                  {toCurvedQuotes(selectedTopic.practicalLiving)}
                </p>
              </div>

              {/* Cross-References */}
              {selectedTopic.crossReferences && (
                <div className="pt-2 text-xs text-stone-600 flex flex-wrap items-center gap-2 font-serif">
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
                <div className="flex items-center justify-between pt-3 border-t border-stone-200 text-xs">
                  <button
                    onClick={handlePrevTopic}
                    disabled={!hasPrev}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-amber-100/70 border border-stone-300 text-stone-800 hover:text-amber-950 font-semibold disabled:opacity-40 disabled:hover:bg-stone-100 cursor-pointer transition-all shadow-2xs"
                    title="Previous Gospel Topic"
                    aria-label="Previous Gospel Topic"
                  >
                    <ChevronLeft className="w-4 h-4 text-amber-800" />
                    <span className="truncate max-w-[140px] sm:max-w-none">
                      {hasPrev
                        ? `${allTopics[globalIdx - 1].dateLabel}: ${allTopics[globalIdx - 1].gospelCitation}`
                        : 'Previous Topic'}
                    </span>
                  </button>

                  <span className="font-cinzel text-stone-600 font-bold text-[11px] uppercase tracking-wider hidden xs:inline">
                    {selectedTopic.dateLabel}
                  </span>

                  <button
                    onClick={handleNextTopic}
                    disabled={!hasNext}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-amber-100/70 border border-stone-300 text-stone-800 hover:text-amber-950 font-semibold disabled:opacity-40 disabled:hover:bg-stone-100 cursor-pointer transition-all shadow-2xs"
                    title="Next Gospel Topic"
                    aria-label="Next Gospel Topic"
                  >
                    <span className="truncate max-w-[140px] sm:max-w-none">
                      {hasNext
                        ? `${allTopics[globalIdx + 1].dateLabel}: ${allTopics[globalIdx + 1].gospelCitation}`
                        : 'Next Topic'}
                    </span>
                    <ChevronRight className="w-4 h-4 text-amber-800" />
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
