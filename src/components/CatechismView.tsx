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
  ShieldCheck,
  ScrollText,
  Church,
  Sparkles
} from 'lucide-react';
import { MassReading } from '../types';
import { 
  GospelCatechismTopic, 
  getGospelCatechismForReading, 
  getAllThreeMonthGospelCatechisms 
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
  const [selectedMonth, setSelectedMonth] = useState<'All' | 'November' | 'December' | 'January'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [copied, setCopied] = useState(false);
  const [personalReflection, setPersonalReflection] = useState('');
  const [savedNote, setSavedNote] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // All 92 daily Gospel Catechism topics for November, December, and January
  const allTopics = useMemo(() => getAllThreeMonthGospelCatechisms(), []);

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

  // Smooth scroll selected topic into view in carousel
  useEffect(() => {
    if (selectedTopic && pillRefs.current[selectedTopic.id]) {
      pillRefs.current[selectedTopic.id]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [selectedTopic.id]);

  // Month filtering
  const monthFilteredList = useMemo(() => {
    if (selectedMonth === 'All') return allTopics;
    return allTopics.filter(t => t.monthName === selectedMonth);
  }, [allTopics, selectedMonth]);

  // Search filtering
  const filteredTopics = useMemo(() => {
    if (!searchQuery.trim()) return monthFilteredList;
    const q = searchQuery.toLowerCase();
    return monthFilteredList.filter(t =>
      t.topicTitle.toLowerCase().includes(q) ||
      t.gospelCitation.toLowerCase().includes(q) ||
      t.dateLabel.toLowerCase().includes(q) ||
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

  const handleSelectMonth = (month: 'All' | 'November' | 'December' | 'January') => {
    setSelectedMonth(month);
    if (month !== 'All') {
      const firstInMonth = allTopics.find(t => t.monthName === month);
      if (firstInMonth) {
        setSelectedTopic(firstInMonth);
        if (firstInMonth.dateKey && onSelectDate) onSelectDate(firstInMonth.dateKey);
        if (isReadingAloud) SacredReader.stop();
      }
    }
  };

  const handlePrevTopic = () => {
    if (currentIndex > 0) {
      const prev = activeList[currentIndex - 1];
      setSelectedTopic(prev);
      if (prev.dateKey && onSelectDate) onSelectDate(prev.dateKey);
      if (isReadingAloud) SacredReader.stop();
    }
  };

  const handleNextTopic = () => {
    if (currentIndex >= 0 && currentIndex < activeList.length - 1) {
      const next = activeList[currentIndex + 1];
      setSelectedTopic(next);
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
Paragraphs: ${selectedTopic.paragraphsRange}
Pillar: ${selectedTopic.pillar}

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
      
      {/* Main Top Banner: Gospel Topic & Authentic Catechism Declaration (Raised to the Very Top) */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 rounded-xl p-5 sm:p-7 text-amber-50 shadow-md border border-stone-800">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-2">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-amber-100 tracking-normal leading-tight">
              Catechism
            </h2>

            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-600/50">
                Gospel Topic: {selectedTopic.gospelCitation}
              </span>
              <span className="text-xs text-stone-300 font-serif italic">
                {selectedTopic.liturgicalDay}
              </span>
            </div>

            <h3 className="font-serif text-lg sm:text-xl font-bold text-amber-100/90 leading-snug pt-0.5">
              {selectedTopic.topicTitle}
            </h3>

            <p className="text-xs sm:text-sm text-stone-300 font-serif-sacred max-w-2xl leading-relaxed">
              {selectedTopic.topicSubtitle}
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-amber-300/90 font-cinzel">
              <span>{selectedTopic.pillar}</span>
              <span className="text-stone-500">•</span>
              <span className="font-bold text-amber-200 bg-amber-950/90 px-2.5 py-0.5 rounded-md border border-amber-700/60">
                {selectedTopic.paragraphsRange}
              </span>
            </div>
          </div>

          {/* Action Buttons: Audio Narration & Copy Teaching */}
          <div className="flex items-center gap-2 shrink-0 self-start md:self-auto pt-2 md:pt-0">
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

      {/* Sub-view Navigation Bar: Daily Gospel Catechism first (default) */}
      <div className="bg-white/55 backdrop-blur-xl backdrop-saturate-150 p-2 rounded-xl border border-white/70 ring-1 ring-inset ring-white/40 shadow-xs overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 min-w-max">
          {/* 1. Daily Gospel Catechism (Default Page) */}
          <button
            onClick={() => setActiveSubView('daily')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
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
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
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
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
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
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
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
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
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
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeSubView === 'ressourcement'
                ? 'bg-amber-900 text-amber-50 shadow-xs font-bold'
                : 'text-stone-700 hover:text-amber-950 hover:bg-stone-200/60'
            }`}
          >
            <span>Ressourcement</span>
          </button>
        </div>
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

          {/* Daily Gospel Topic Selector Bar (92 Days for November, December, January) */}
          <div className="bg-white/55 backdrop-blur-xl backdrop-saturate-150 rounded-xl px-3.5 py-3 shadow-[0_8px_32px_0_rgba(120,90,50,0.12)] border border-white/60 ring-1 ring-inset ring-white/40 space-y-2.5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-cinzel text-[11px] font-bold uppercase tracking-wider text-stone-700">
                  Daily Gospel Topics ({activeList.length})
                </span>
                <span className="text-[11px] font-semibold text-amber-900 bg-amber-100/90 px-2.5 py-0.5 rounded-full font-cinzel border border-amber-200/80">
                  {selectedTopic.dateLabel} • {selectedTopic.gospelCitation} (Topic {currentIndex >= 0 ? currentIndex + 1 : 1} of {activeList.length})
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Month Selector Tabs */}
                <div className="flex items-center gap-1 bg-stone-100/90 p-0.5 rounded-lg border border-stone-200 shadow-2xs">
                  {(['All', 'November', 'December', 'January'] as const).map(month => {
                    const count = month === 'All' ? 92 : month === 'November' ? 30 : 31;
                    return (
                      <button
                        key={month}
                        onClick={() => handleSelectMonth(month)}
                        className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                          selectedMonth === month
                            ? 'bg-[#6B4423] text-white shadow-xs font-bold'
                            : 'text-stone-700 hover:text-stone-900 hover:bg-white/70'
                        }`}
                      >
                        {month === 'All' ? `All (${count})` : `${month} (${count})`}
                      </button>
                    );
                  })}
                </div>

                {/* Quick Prev / Next Topic Buttons */}
                <div className="flex items-center gap-1 bg-white/70 border border-stone-200/80 rounded-xl p-0.5 shadow-2xs">
                  <button
                    onClick={handlePrevTopic}
                    disabled={currentIndex <= 0}
                    className="p-1 rounded-lg text-stone-800 hover:text-amber-950 hover:bg-amber-100/80 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-all flex items-center gap-1 text-xs font-semibold px-2"
                    title="Previous Gospel Topic"
                    aria-label="Previous Gospel Topic"
                  >
                    <ChevronLeft className="w-4 h-4 text-amber-800" />
                    <span className="hidden sm:inline">Prev</span>
                  </button>
                  <span className="text-stone-300">|</span>
                  <button
                    onClick={handleNextTopic}
                    disabled={currentIndex < 0 || currentIndex >= activeList.length - 1}
                    className="p-1 rounded-lg text-stone-800 hover:text-amber-950 hover:bg-amber-100/80 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-all flex items-center gap-1 text-xs font-semibold px-2"
                    title="Next Gospel Topic"
                    aria-label="Next Gospel Topic"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-4 h-4 text-amber-800" />
                  </button>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search CCC, Gospel, Council..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="text-xs pl-7 pr-2.5 py-1 rounded-xl bg-white/60 backdrop-blur-sm border border-white/70 focus:outline-none focus:border-amber-700 w-full sm:w-48"
                  />
                  <Search className="w-3 h-3 text-stone-500 absolute left-2.5 top-2" />
                </div>
              </div>
            </div>

            {/* Carousel Pills Row with Scroll Arrows */}
            <div className="relative flex items-center gap-1.5">
              <button
                onClick={() => scrollPills('left')}
                className="p-1.5 rounded-xl bg-white/90 hover:bg-white text-stone-800 hover:text-amber-950 border border-stone-200 shadow-2xs shrink-0 cursor-pointer transition-colors"
                title="Scroll left"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4 text-amber-800" />
              </button>

              <div
                ref={scrollRef}
                className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 scroll-smooth w-full"
              >
                {activeList.map(topic => {
                  const isSelected = topic.id === selectedTopic.id;
                  return (
                    <button
                      key={topic.id}
                      ref={el => { pillRefs.current[topic.id] = el; }}
                      onClick={() => handleSelectTopic(topic)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-amber-900 text-amber-50 shadow-2xs font-bold ring-1 ring-amber-700'
                          : 'bg-white/65 hover:bg-white/90 text-stone-800 border border-stone-200/80 hover:border-amber-400'
                      }`}
                    >
                      <span className={`text-[10px] font-semibold uppercase ${isSelected ? 'text-amber-200' : 'text-amber-900/80 font-cinzel'}`}>
                        {topic.dateLabel}:
                      </span>
                      <span>{topic.gospelCitation}</span>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => scrollPills('right')}
                className="p-1.5 rounded-xl bg-white/90 hover:bg-white text-stone-800 hover:text-amber-950 border border-stone-200 shadow-2xs shrink-0 cursor-pointer transition-colors"
                title="Scroll right"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4 text-amber-800" />
              </button>
            </div>
          </div>

          {/* Main Article Display Card */}
          <article className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-stone-200/90 space-y-8">
            
            {/* Top Navigation between Topics */}
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-stone-50/90 border border-stone-200 text-xs">
              <button
                onClick={handlePrevTopic}
                disabled={currentIndex <= 0}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-amber-50 border border-stone-300 text-stone-800 hover:text-amber-950 font-semibold disabled:opacity-40 disabled:hover:bg-white cursor-pointer transition-all shadow-2xs"
                title="Previous Gospel Topic"
                aria-label="Previous Gospel Topic"
              >
                <ChevronLeft className="w-4 h-4 text-amber-800" />
                <span className="truncate max-w-[140px] sm:max-w-none">
                  {currentIndex > 0
                    ? `${activeList[currentIndex - 1].dateLabel}: ${activeList[currentIndex - 1].gospelCitation}`
                    : 'Previous Topic'}
                </span>
              </button>

              <span className="font-cinzel text-amber-950 font-bold text-[11px] uppercase tracking-wider bg-amber-100/70 px-2.5 py-1 rounded-full border border-amber-200/80">
                {selectedTopic.dateLabel} • {selectedTopic.gospelCitation}
              </span>

              <button
                onClick={handleNextTopic}
                disabled={currentIndex < 0 || currentIndex >= activeList.length - 1}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-amber-50 border border-stone-300 text-stone-800 hover:text-amber-950 font-semibold disabled:opacity-40 disabled:hover:bg-white cursor-pointer transition-all shadow-2xs"
                title="Next Gospel Topic"
                aria-label="Next Gospel Topic"
              >
                <span className="truncate max-w-[140px] sm:max-w-none">
                  {currentIndex >= 0 && currentIndex < activeList.length - 1
                    ? `${activeList[currentIndex + 1].dateLabel}: ${activeList[currentIndex + 1].gospelCitation}`
                    : 'Next Topic'}
                </span>
                <ChevronRight className="w-4 h-4 text-amber-800" />
              </button>
            </div>

            {/* SECTION 1: THE GOSPEL FOUNDATION */}
            <div className="relative p-4 rounded-xl bg-[#FAF8F5] border border-amber-200/60 shadow-2xs space-y-1.5">
              <span className="pointer-events-none absolute top-0 left-0 w-4 h-4 rounded-tl-xl border-t-[3px] border-l-[3px] border-amber-800" />
              <span className="pointer-events-none absolute top-0 right-0 w-4 h-4 rounded-tr-xl border-t-[3px] border-r-[3px] border-amber-800" />
              <span className="pointer-events-none absolute bottom-0 left-0 w-4 h-4 rounded-bl-xl border-b-[3px] border-l-[3px] border-amber-800" />
              <span className="pointer-events-none absolute bottom-0 right-0 w-4 h-4 rounded-br-xl border-b-[3px] border-r-[3px] border-amber-800" />
              
              <div className="flex items-center gap-1.5 text-amber-900 font-cinzel font-bold text-xs uppercase tracking-wider">
                <BookOpen className="w-3.5 h-3.5" />
                <span>The Gospel Foundation ({selectedTopic.gospelCitation})</span>
              </div>
              <p className="font-serif text-stone-800 italic text-sm sm:text-base leading-relaxed pl-1">
                &ldquo;{toCurvedQuotes(selectedTopic.gospelTextSnippet)}&rdquo;
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
            <div className="flex items-center justify-between pt-3 border-t border-stone-200 text-xs">
              <button
                onClick={handlePrevTopic}
                disabled={currentIndex <= 0}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-amber-100/70 border border-stone-300 text-stone-800 hover:text-amber-950 font-semibold disabled:opacity-40 disabled:hover:bg-stone-100 cursor-pointer transition-all shadow-2xs"
                title="Previous Gospel Topic"
                aria-label="Previous Gospel Topic"
              >
                <ChevronLeft className="w-4 h-4 text-amber-800" />
                <span className="truncate max-w-[140px] sm:max-w-none">
                  {currentIndex > 0
                    ? `${activeList[currentIndex - 1].dateLabel}: ${activeList[currentIndex - 1].gospelCitation}`
                    : 'Previous Topic'}
                </span>
              </button>

              <span className="font-cinzel text-stone-600 font-bold text-[11px] uppercase tracking-wider hidden xs:inline">
                Topic {currentIndex >= 0 ? currentIndex + 1 : 1} of {activeList.length}
              </span>

              <button
                onClick={handleNextTopic}
                disabled={currentIndex < 0 || currentIndex >= activeList.length - 1}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-amber-100/70 border border-stone-300 text-stone-800 hover:text-amber-950 font-semibold disabled:opacity-40 disabled:hover:bg-stone-100 cursor-pointer transition-all shadow-2xs"
                title="Next Gospel Topic"
                aria-label="Next Gospel Topic"
              >
                <span className="truncate max-w-[140px] sm:max-w-none">
                  {currentIndex >= 0 && currentIndex < activeList.length - 1
                    ? `${activeList[currentIndex + 1].dateLabel}: ${activeList[currentIndex + 1].gospelCitation}`
                    : 'Next Topic'}
                </span>
                <ChevronRight className="w-4 h-4 text-amber-800" />
              </button>
            </div>

          </article>
        </div>
      )}

    </div>
  );
};
