import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  BookOpen, 
  RotateCw, 
  ChevronLeft, 
  ChevronRight, 
  Shuffle, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  Flame, 
  GraduationCap, 
  Eye, 
  EyeOff, 
  Layers, 
  RotateCcw, 
  Award,
  HelpCircle,
  BookmarkCheck,
  Bookmark
} from 'lucide-react';
import { BIBLE_MEMORY_VERSES, BibleFlashcard } from '../data/bibleMemoryVerses';
import { SacredReader } from '../utils/speech';

type StudyMode = 'flip' | 'cloze' | 'first-letter' | 'scramble';
type MasteryStatus = 'unlearned' | 'learning' | 'mastered';

export const BibleFlashcardsView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studyMode, setStudyMode] = useState<StudyMode>('flip');
  const [clozeLevel, setClozeLevel] = useState<20 | 40 | 70>(40);
  const [revealedClozeIndices, setRevealedClozeIndices] = useState<Set<number>>(new Set());
  const [showFullFirstLetter, setShowFullFirstLetter] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [recitationVoice, setRecitationVoice] = useState<'ava-grace' | 'david'>(() => SacredReader.getRecitationVoice());

  const handleVoiceSelect = (v: 'ava-grace' | 'david') => {
    setRecitationVoice(v);
    SacredReader.setRecitationVoice(v);
    if (isSpeaking) {
      SacredReader.stop();
      setIsSpeaking(false);
    }
  };

  // Word Scramble State
  const [scrambleSelectedWords, setScrambleSelectedWords] = useState<string[]>([]);
  const [scrambleBank, setScrambleBank] = useState<{ id: number; word: string; used: boolean }[]>([]);
  const [scrambleIsCorrect, setScrambleIsCorrect] = useState(false);

  // Mastery state stored in localStorage
  const [masteryMap, setMasteryMap] = useState<Record<string, MasteryStatus>>(() => {
    try {
      const saved = localStorage.getItem('soul_sanctum_verse_mastery');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const saveMastery = (verseId: string, status: MasteryStatus) => {
    const updated = { ...masteryMap, [verseId]: status };
    setMasteryMap(updated);
    try {
      localStorage.setItem('soul_sanctum_verse_mastery', JSON.stringify(updated));
    } catch {
      // ignore storage errors
    }
  };

  const categories = useMemo(() => [
    'All',
    'Kingdom and Eternity',
    'Wisdom and Word',
    'Protection and Trust',
    'Humility and Service',
    'Faith and Salvation',
    'Prayer and Praise',
    'Vigilance and Perseverance'
  ], []);

  // Filtered Cards
  const filteredVerses = useMemo(() => {
    return BIBLE_MEMORY_VERSES.filter(v => {
      const matchesCategory = activeCategory === 'All' || v.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        v.title.toLowerCase().includes(q) ||
        v.reference.toLowerCase().includes(q) ||
        v.text.toLowerCase().includes(q) ||
        (v.translation && v.translation.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Ensure current index is valid
  useEffect(() => {
    if (currentIndex >= filteredVerses.length) {
      setCurrentIndex(0);
    }
    setIsFlipped(false);
    setRevealedClozeIndices(new Set());
    setShowFullFirstLetter(false);
    if (isSpeaking) {
      SacredReader.stop();
      setIsSpeaking(false);
    }
  }, [filteredVerses.length, activeCategory, searchQuery]);

  const currentVerse: BibleFlashcard | undefined = filteredVerses[currentIndex] || BIBLE_MEMORY_VERSES[0];

  // Initialize Word Scramble for the current verse
  const initScramble = useCallback((verse: BibleFlashcard) => {
    // Take the first clean sentence or up to 20 words for interactive scramble
    const firstSentence = verse.text.split(/[.?!]\s/)[0] || verse.text;
    const cleanTokens = firstSentence
      .replace(/[“”—"()]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 0)
      .slice(0, 16);

    const bankItems = cleanTokens.map((w, idx) => ({ id: idx, word: w, used: false }));
    // Shuffle the bank
    const shuffled = [...bankItems].sort(() => Math.random() - 0.5);
    setScrambleBank(shuffled);
    setScrambleSelectedWords([]);
    setScrambleIsCorrect(false);
  }, []);

  useEffect(() => {
    if (currentVerse && studyMode === 'scramble') {
      initScramble(currentVerse);
    }
  }, [currentVerse, studyMode, initScramble]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      SacredReader.stop();
    };
  }, []);

  const handleNext = () => {
    if (filteredVerses.length === 0) return;
    setIsFlipped(false);
    setRevealedClozeIndices(new Set());
    setShowFullFirstLetter(false);
    if (isSpeaking) {
      SacredReader.stop();
      setIsSpeaking(false);
    }
    setCurrentIndex((prev) => (prev + 1) % filteredVerses.length);
  };

  const handlePrev = () => {
    if (filteredVerses.length === 0) return;
    setIsFlipped(false);
    setRevealedClozeIndices(new Set());
    setShowFullFirstLetter(false);
    if (isSpeaking) {
      SacredReader.stop();
      setIsSpeaking(false);
    }
    setCurrentIndex((prev) => (prev - 1 + filteredVerses.length) % filteredVerses.length);
  };

  const handleShuffle = () => {
    if (filteredVerses.length <= 1) return;
    setIsFlipped(false);
    setRevealedClozeIndices(new Set());
    setShowFullFirstLetter(false);
    let nextIdx = Math.floor(Math.random() * filteredVerses.length);
    if (nextIdx === currentIndex) {
      nextIdx = (currentIndex + 1) % filteredVerses.length;
    }
    setCurrentIndex(nextIdx);
  };

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setIsFlipped(prev => !prev);
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredVerses.length]);

  const handleToggleSpeak = () => {
    if (!currentVerse) return;
    if (isSpeaking) {
      SacredReader.stop();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const textToRead = `${currentVerse.title}. ${currentVerse.reference}. ${currentVerse.text}`;
      SacredReader.speak(textToRead, () => setIsSpeaking(false), recitationVoice);
    }
  };

  const handleCopy = () => {
    if (!currentVerse) return;
    const text = `SACRED SCRIPTURE MEMORY VERSE
${currentVerse.title}
${currentVerse.reference} (${currentVerse.translation || 'Sacred Scripture'})

"${currentVerse.text}"
${currentVerse.notes ? `\nNote: ${currentVerse.notes}` : ''}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate Cloze (Fill-in-the-Blanks) Tokens
  const clozeTokens = useMemo(() => {
    if (!currentVerse) return [];
    const words = currentVerse.text.split(/(\s+)/);
    // Deterministic blanking based on word length and level
    return words.map((token, idx) => {
      const isWord = /[a-zA-Z0-9]/.test(token);
      if (!isWord) return { text: token, isBlank: false, originalIndex: idx };
      
      // Seed pseudo-randomness with index and verse length
      const hash = (idx * 31 + token.length * 17) % 100;
      const isBlank = hash < clozeLevel;
      return { text: token, isBlank, originalIndex: idx };
    });
  }, [currentVerse, clozeLevel]);

  // First-Letter generator: replaces every alphanumeric word with its first letter
  const firstLetterText = useMemo(() => {
    if (!currentVerse) return '';
    return currentVerse.text.replace(/\b([a-zA-Z])/g, '$1. ');
  }, [currentVerse]);

  // Scramble word click handlers
  const handleBankWordClick = (bankItem: { id: number; word: string; used: boolean }) => {
    if (bankItem.used) return;
    const newSelected = [...scrambleSelectedWords, bankItem.word];
    setScrambleSelectedWords(newSelected);
    setScrambleBank(prev => prev.map(item => item.id === bankItem.id ? { ...item, used: true } : item));

    // Check if finished
    const targetWords = currentVerse ? currentVerse.text.split(/[.?!]\s/)[0].replace(/[“”—"()]/g, '').split(/\s+/).slice(0, 16) : [];
    if (newSelected.length === targetWords.length) {
      const isMatch = newSelected.join(' ').toLowerCase() === targetWords.join(' ').toLowerCase();
      setScrambleIsCorrect(isMatch);
    }
  };

  const handleRemoveSelectedWord = (index: number) => {
    const wordToRemove = scrambleSelectedWords[index];
    const newSelected = scrambleSelectedWords.filter((_, i) => i !== index);
    setScrambleSelectedWords(newSelected);
    setScrambleIsCorrect(false);

    // Return word to bank
    setScrambleBank(prev => {
      const targetItem = prev.find(item => item.word === wordToRemove && item.used);
      if (targetItem) {
        return prev.map(item => item.id === targetItem.id ? { ...item, used: false } : item);
      }
      return prev;
    });
  };

  // Mastery Statistics
  const stats = useMemo(() => {
    const total = BIBLE_MEMORY_VERSES.length;
    let mastered = 0;
    let learning = 0;
    Object.values(masteryMap).forEach(st => {
      if (st === 'mastered') mastered++;
      if (st === 'learning') learning++;
    });
    const unlearned = total - mastered - learning;
    return { total, mastered, learning, unlearned };
  }, [masteryMap]);

  const currentMastery = currentVerse ? (masteryMap[currentVerse.id] || 'unlearned') : 'unlearned';

  const fontClasses = {
    normal: 'text-base sm:text-lg leading-relaxed',
    large: 'text-lg sm:text-xl leading-relaxed',
    xlarge: 'text-xl sm:text-2xl leading-relaxed'
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16 animate-fadeIn">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 rounded-2xl p-6 sm:p-8 text-amber-50 shadow-xl border border-amber-800/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-radial-gradient from-amber-500/10 to-transparent pointer-events-none rounded-full blur-2xl" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <BookOpen className="w-4 h-4" />
              </span>
              <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-amber-300">
                Catholic Scripture Memorization Treasury
              </span>
            </div>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide">
              Bible Flashcards and Memorization Tool
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 font-serif leading-relaxed">
              Inscribe the living word of God upon your heart. Practice active recall, test your memory with cloze blanks, acrostic first-letter recall, and audio recitation.
            </p>
          </div>

          {/* Quick Mastery Progress Pill */}
          <div className="bg-black/50 backdrop-blur-md rounded-xl p-4 border border-amber-500/20 flex flex-col gap-2.5 min-w-[240px]">
            <div className="flex items-center justify-between text-xs font-cinzel text-amber-200">
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Memory Progress</span>
              </span>
              <span className="font-bold text-amber-400">
                {stats.mastered} / {stats.total} Mastered
              </span>
            </div>
            
            {/* Multi-segmented Progress Bar */}
            <div className="w-full bg-stone-800 h-2.5 rounded-full overflow-hidden flex">
              <div 
                className="bg-emerald-500 h-full transition-all duration-500" 
                style={{ width: `${(stats.mastered / stats.total) * 100}%` }}
                title={`${stats.mastered} Mastered`}
              />
              <div 
                className="bg-amber-500 h-full transition-all duration-500" 
                style={{ width: `${(stats.learning / stats.total) * 100}%` }}
                title={`${stats.learning} In Progress`}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-stone-400 font-sans">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                {stats.mastered} Mastered
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                {stats.learning} Learning
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-stone-600 inline-block" />
                {stats.unlearned} To Memorize
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Bar: Mode Switcher, Categories, Search */}
      <div className="bg-white rounded-2xl p-5 shadow-xs border border-stone-200 space-y-4">
        
        {/* Row 1: Study Mode Switcher and Tools */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
          
          {/* Study Mode Tabs */}
          <div className="flex items-center bg-stone-100 p-1 rounded-xl gap-1">
            <button
              onClick={() => setStudyMode('flip')}
              className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                studyMode === 'flip'
                  ? 'bg-amber-900 text-white shadow-xs font-cinzel font-bold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
              }`}
              title="Classic 3D Flashcard Flip"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Flip Card</span>
            </button>

            <button
              onClick={() => setStudyMode('cloze')}
              className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                studyMode === 'cloze'
                  ? 'bg-amber-900 text-white shadow-xs font-cinzel font-bold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
              }`}
              title="Fill-in-the-Blanks active recall test"
            >
              <EyeOff className="w-3.5 h-3.5" />
              <span>Fill-in-Blanks</span>
            </button>

            <button
              onClick={() => setStudyMode('first-letter')}
              className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                studyMode === 'first-letter'
                  ? 'bg-amber-900 text-white shadow-xs font-cinzel font-bold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
              }`}
              title="Acrostic first-letter recall prompt"
            >
              <Flame className="w-3.5 h-3.5" />
              <span>First Letter</span>
            </button>

            <button
              onClick={() => setStudyMode('scramble')}
              className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                studyMode === 'scramble'
                  ? 'bg-amber-900 text-white shadow-xs font-cinzel font-bold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
              }`}
              title="Word-by-word sentence builder"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Word Builder</span>
            </button>
          </div>

          {/* Right Tools: Font size and Shuffle */}
          <div className="flex items-center justify-between sm:justify-end gap-2">
            
            {/* Font Stepper */}
            <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2.5 py-1 text-xs rounded-lg font-bold cursor-pointer transition-all ${
                  fontSize === 'normal' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
                }`}
                title="Default text size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2.5 py-1 text-xs rounded-lg font-bold cursor-pointer transition-all ${
                  fontSize === 'large' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
                }`}
                title="Large text size"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2.5 py-1 text-xs rounded-lg font-bold cursor-pointer transition-all ${
                  fontSize === 'xlarge' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500 hover:text-stone-900'
                }`}
                title="Extra large text size"
              >
                A++
              </button>
            </div>

            {/* Shuffle Button */}
            <button
              onClick={handleShuffle}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors cursor-pointer border border-stone-200"
              title="Randomize flashcard deck"
            >
              <Shuffle className="w-3.5 h-3.5 text-stone-500" />
              <span className="hidden sm:inline">Shuffle</span>
            </button>
          </div>
        </div>

        {/* Row 2: Category Pills and Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs whitespace-nowrap transition-all cursor-pointer font-medium ${
                  activeCategory === cat
                    ? 'bg-amber-900 text-white font-bold shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative shrink-0">
            <input
              type="text"
              placeholder="Filter by citation or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs pl-8 pr-3 py-1.5 rounded-xl bg-stone-50 border border-stone-200 focus:outline-hidden focus:border-amber-700 w-full sm:w-64"
            />
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
          </div>
        </div>
      </div>

      {/* Main Flashcard Arena */}
      {currentVerse ? (
        <div className="space-y-4">
          
          {/* Card Top Nav and Mastery Selector */}
          <div className="flex items-center justify-between px-1 text-xs">
            
            {/* Card Counter */}
            <div className="flex items-center gap-2">
              <span className="font-cinzel font-bold text-stone-900 text-sm">
                Card {currentIndex + 1} of {filteredVerses.length}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-semibold">
                {currentVerse.category}
              </span>
            </div>

            {/* Mastery Action Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => saveMastery(currentVerse.id, 'unlearned')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1 ${
                  currentMastery === 'unlearned'
                    ? 'bg-stone-800 text-white font-bold shadow-xs'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-600'
                }`}
                title="Mark as needing practice"
              >
                <span>To Learn</span>
              </button>

              <button
                onClick={() => saveMastery(currentVerse.id, 'learning')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1 ${
                  currentMastery === 'learning'
                    ? 'bg-[#6B4423] text-white font-bold shadow-xs'
                    : 'bg-[#FAF4EE] hover:bg-[#F3E7DB] text-[#5A381C] border border-[#D4A373]/50'
                }`}
                title="Mark as currently learning"
              >
                <Bookmark className="w-3 h-3" />
                <span>Learning</span>
              </button>

              <button
                onClick={() => saveMastery(currentVerse.id, 'mastered')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all cursor-pointer flex items-center gap-1 ${
                  currentMastery === 'mastered'
                    ? 'bg-emerald-600 text-white font-bold shadow-xs'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200'
                }`}
                title="Mark as memorized and mastered"
              >
                <CheckCircle2 className="w-3 h-3" />
                <span>Mastered</span>
              </button>
            </div>
          </div>

          {/* Flashcard Presentation Card */}
          <div className="bg-white rounded-3xl shadow-lg border border-stone-200/90 overflow-hidden relative min-h-[380px] flex flex-col justify-between transition-all">
            
            {/* Card Content Area */}
            <div className="p-6 sm:p-10 flex-1 flex flex-col justify-center">
              
              {/* MODE 1: CLASSIC FLIP CARD */}
              {studyMode === 'flip' && (
                <div 
                  onClick={() => setIsFlipped(prev => !prev)}
                  className="cursor-pointer select-none space-y-6 text-center py-4"
                  title="Click or press Space to flip"
                >
                  {!isFlipped ? (
                    /* FRONT OF CARD: Title and Reference Prompt */
                    <div className="space-y-4 py-8 animate-fadeIn">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-200 text-xs font-cinzel font-semibold">
                        <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                        <span>Prompt and Scripture Citation</span>
                      </div>
                      
                      <h3 className="font-serif-heading text-2xl sm:text-3xl md:text-4xl text-stone-900 max-w-2xl mx-auto leading-tight">
                        {currentVerse.title}
                      </h3>

                      <p className="font-cinzel text-lg sm:text-xl font-bold text-amber-900">
                        {currentVerse.reference}
                      </p>

                      {currentVerse.translation && (
                        <p className="text-xs text-stone-400 font-serif italic">
                          {currentVerse.translation}
                        </p>
                      )}

                      <div className="pt-6">
                        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-100 hover:bg-amber-100 text-stone-600 hover:text-amber-900 text-xs font-semibold transition-colors">
                          <RotateCw className="w-3.5 h-3.5 text-amber-600" />
                          <span>Tap card to reveal full Scripture passage</span>
                        </span>
                      </div>
                    </div>
                  ) : (
                    /* BACK OF CARD: Full Scripture Passage */
                    <div className="space-y-5 py-4 text-left animate-fadeIn">
                      <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                        <div>
                          <span className="font-cinzel font-bold text-amber-900 text-base">
                            {currentVerse.reference}
                          </span>
                          <span className="text-xs text-stone-500 font-serif ml-2">
                            — {currentVerse.title}
                          </span>
                        </div>
                        <span className="text-xs text-stone-400 font-serif italic">
                          {currentVerse.translation}
                        </span>
                      </div>

                      {/* Sacred Verse Text */}
                      <p className={`font-serif-sacred text-stone-900 whitespace-pre-line ${fontClasses[fontSize]}`}>
                        “{currentVerse.text}”
                      </p>

                      {/* Explanatory Footnotes / Study Notes if present */}
                      {currentVerse.notes && (
                        <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-stone-700 font-serif space-y-1">
                          <span className="font-bold text-amber-950 font-cinzel text-[11px] block uppercase tracking-wider">
                            Liturgical Study Note:
                          </span>
                          <p className="italic leading-relaxed">{currentVerse.notes}</p>
                        </div>
                      )}

                      <div className="text-center pt-2">
                        <span className="text-[11px] text-stone-400 font-sans">
                          (Click card to flip back to front)
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* MODE 2: FILL-IN-THE-BLANKS (CLOZE PRACTICE) */}
              {studyMode === 'cloze' && (
                <div className="space-y-6 text-left py-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-3">
                    <div>
                      <h3 className="font-cinzel font-bold text-stone-900 text-lg">
                        {currentVerse.reference}
                      </h3>
                      <p className="text-xs text-stone-500 font-serif">
                        {currentVerse.title} • Tap any blank box to reveal that word
                      </p>
                    </div>

                    {/* Difficulty selector for blanks */}
                    <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
                      <span className="text-[11px] text-stone-500 font-serif px-2">Blanks:</span>
                      {[
                        { label: '20% Easy', val: 20 },
                        { label: '40% Med', val: 40 },
                        { label: '70% Hard', val: 70 }
                      ].map(lvl => (
                        <button
                          key={lvl.val}
                          onClick={() => {
                            setClozeLevel(lvl.val as 20 | 40 | 70);
                            setRevealedClozeIndices(new Set());
                          }}
                          className={`px-2 py-0.5 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                            clozeLevel === lvl.val
                              ? 'bg-amber-900 text-white font-bold shadow-xs'
                              : 'text-stone-600 hover:text-stone-900'
                          }`}
                        >
                          {lvl.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Cloze Text Presentation */}
                  <div className={`font-serif-sacred text-stone-900 leading-relaxed ${fontClasses[fontSize]}`}>
                    {clozeTokens.map((token, i) => {
                      if (!token.isBlank) {
                        return <span key={i}>{token.text}</span>;
                      }

                      const isRevealed = revealedClozeIndices.has(token.originalIndex);
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            setRevealedClozeIndices(prev => {
                              const next = new Set(prev);
                              if (next.has(token.originalIndex)) next.delete(token.originalIndex);
                              else next.add(token.originalIndex);
                              return next;
                            });
                          }}
                          className={`inline-block mx-1 px-2.5 py-0.5 rounded-md border font-bold transition-all cursor-pointer text-sm sm:text-base ${
                            isRevealed
                              ? 'bg-amber-100 text-amber-900 border-amber-400 animate-fadeIn'
                              : 'bg-stone-200 hover:bg-amber-200/80 text-transparent border-stone-300 select-none'
                          }`}
                          title={isRevealed ? 'Tap to hide' : 'Tap to reveal word'}
                        >
                          {isRevealed ? token.text : '••••••'}
                        </button>
                      );
                    })}
                  </div>

                  {/* Cloze Action Helpers */}
                  <div className="flex items-center justify-between pt-3 text-xs">
                    <button
                      onClick={() => {
                        const allIndices = new Set(clozeTokens.filter(t => t.isBlank).map(t => t.originalIndex));
                        setRevealedClozeIndices(allIndices);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium transition-colors cursor-pointer"
                    >
                      Reveal All Blanks
                    </button>

                    <button
                      onClick={() => setRevealedClozeIndices(new Set())}
                      className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium transition-colors cursor-pointer"
                    >
                      Hide All Blanks
                    </button>
                  </div>
                </div>
              )}

              {/* MODE 3: FIRST-LETTER RECALL PROMPT */}
              {studyMode === 'first-letter' && (
                <div className="space-y-6 text-left py-2">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                    <div>
                      <h3 className="font-cinzel font-bold text-stone-900 text-lg">
                        {currentVerse.reference}
                      </h3>
                      <p className="text-xs text-stone-500 font-serif">
                        {currentVerse.title} • Recite aloud using the initial letters as memory cues
                      </p>
                    </div>

                    <button
                      onClick={() => setShowFullFirstLetter(prev => !prev)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold text-xs transition-colors cursor-pointer"
                    >
                      {showFullFirstLetter ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{showFullFirstLetter ? 'Show First Letters' : 'Peek Full Text'}</span>
                    </button>
                  </div>

                  <div className={`font-serif-sacred text-stone-900 ${fontClasses[fontSize]}`}>
                    {showFullFirstLetter ? (
                      <p className="animate-fadeIn">“{currentVerse.text}”</p>
                    ) : (
                      <div className="p-5 rounded-2xl bg-[#FAF8F5] border-l-4 border-amber-800 space-y-2 animate-fadeIn">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-900 font-cinzel block">
                          Acrostic Memory Matrix
                        </span>
                        <p className="font-mono tracking-widest text-amber-950 font-bold text-lg sm:text-xl leading-relaxed">
                          {firstLetterText}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* MODE 4: WORD BUILDER / SCRAMBLE */}
              {studyMode === 'scramble' && (
                <div className="space-y-5 text-left py-2">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                    <div>
                      <h3 className="font-cinzel font-bold text-stone-900 text-lg">
                        {currentVerse.reference}
                      </h3>
                      <p className="text-xs text-stone-500 font-serif">
                        Reconstruct the verse in order by tapping the words below
                      </p>
                    </div>

                    <button
                      onClick={() => initScramble(currentVerse)}
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold transition-colors cursor-pointer"
                      title="Reset scramble"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset</span>
                    </button>
                  </div>

                  {/* Reconstructed Sentence Box */}
                  <div className="min-h-[90px] p-4 rounded-2xl bg-amber-50/50 border-2 border-dashed border-amber-300 flex flex-wrap gap-2 items-center">
                    {scrambleSelectedWords.length === 0 ? (
                      <span className="text-stone-400 font-serif italic text-sm">
                        Tap words from the bank below in their sacred sequence...
                      </span>
                    ) : (
                      scrambleSelectedWords.map((word, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleRemoveSelectedWord(idx)}
                          className="px-3 py-1.5 rounded-lg bg-amber-900 text-amber-50 font-serif text-sm font-semibold shadow-xs hover:bg-red-800 transition-colors cursor-pointer"
                          title="Tap to remove"
                        >
                          {word}
                        </button>
                      ))
                    )}
                  </div>

                  {/* Success celebration if completed correctly */}
                  {scrambleIsCorrect && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center justify-between animate-fadeIn">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Splendid! You have reconstructed this sacred passage correctly!
                      </span>
                      <button
                        onClick={() => saveMastery(currentVerse.id, 'mastered')}
                        className="px-3 py-1 rounded-md bg-emerald-600 text-white font-cinzel font-bold text-xs cursor-pointer hover:bg-emerald-700"
                      >
                        Mark Mastered
                      </button>
                    </div>
                  )}

                  {/* Word Bank */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[11px] font-cinzel font-bold uppercase tracking-wider text-stone-500 block">
                      Word Bank:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {scrambleBank.map((item) => (
                        <button
                          key={item.id}
                          disabled={item.used}
                          onClick={() => handleBankWordClick(item)}
                          className={`px-3 py-1.5 rounded-lg text-sm font-serif font-medium transition-all cursor-pointer border ${
                            item.used
                              ? 'opacity-20 bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed'
                              : 'bg-white hover:bg-amber-100 text-stone-800 border-stone-300 shadow-xs hover:scale-105 active:scale-95'
                          }`}
                        >
                          {item.word}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Card Footer: Actions (Listen, Copy, Navigation) */}
            <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200/80 flex flex-wrap items-center justify-between gap-3">
              
              {/* Left Actions: Audio and Voice Option Selector */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleToggleSpeak}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-xs ${
                    isSpeaking
                      ? 'bg-[#6B4423] text-white animate-pulse'
                      : 'bg-white hover:bg-[#FAF4EE] text-[#5A381C] border border-stone-200'
                  }`}
                  title={`Listen to this verse in ${recitationVoice === 'ava-grace' ? 'Ava Grace' : 'Microsoft David'}`}
                >
                  {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#6B4423]" />}
                  <span>{isSpeaking ? 'Stop Audio' : 'Listen Aloud'}</span>
                </button>

                {/* Recitation Voice Option: Ava Grace (Prioritized) and David */}
                <div className="inline-flex items-center bg-white border border-stone-200 rounded-xl p-0.5 shadow-xs text-xs">
                  <button
                    type="button"
                    onClick={() => handleVoiceSelect('ava-grace')}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1 ${
                      recitationVoice === 'ava-grace'
                        ? 'bg-amber-900 text-white font-bold shadow-xs'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                    }`}
                    title="Ava Grace (Prioritized Serene Devotional Voice)"
                  >
                    <span>Ava Grace</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleVoiceSelect('david')}
                    className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-1 ${
                      recitationVoice === 'david'
                        ? 'bg-amber-900 text-white font-bold shadow-xs'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                    }`}
                    title="Microsoft David (Traditional Solemn Male Voice)"
                  >
                    <span>David</span>
                  </button>
                </div>

                <button
                  onClick={handleCopy}
                  className="p-2 rounded-xl bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 transition-colors cursor-pointer"
                  title="Copy verse and citation"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Center Flip Trigger (when in flip mode) */}
              {studyMode === 'flip' && (
                <button
                  onClick={() => setIsFlipped(prev => !prev)}
                  className="px-4 py-2 rounded-xl bg-amber-100/80 hover:bg-amber-200 text-amber-900 text-xs font-semibold font-cinzel transition-colors cursor-pointer border border-amber-300/60 flex items-center gap-1.5"
                >
                  <RotateCw className="w-3.5 h-3.5 text-amber-800" />
                  <span>{isFlipped ? 'Show Front' : 'Show Verse'}</span>
                </button>
              )}

              {/* Right: Prev / Next Navigation Stepper */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrev}
                  className="p-2 rounded-xl bg-white hover:bg-stone-100 text-stone-700 border border-stone-200 transition-colors cursor-pointer"
                  title="Previous verse (Left Arrow)"
                  aria-label="Previous verse"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={handleNext}
                  className="px-4 py-2 rounded-xl bg-amber-900 hover:bg-amber-800 text-amber-50 text-xs font-cinzel font-bold flex items-center gap-1 transition-all cursor-pointer shadow-xs hover:scale-102"
                  title="Next verse (Right Arrow)"
                  aria-label="Next verse"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

          {/* Quick Deck Browser: Thumbnails of all verses */}
          <div className="bg-white rounded-2xl p-5 shadow-xs border border-stone-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-stone-600">
                Deck Browser ({filteredVerses.length} Verses Available)
              </span>
              <span className="text-xs text-stone-400 font-serif italic">
                Tap any card to jump immediately
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto no-scrollbar pr-1">
              {filteredVerses.map((v, idx) => {
                const isSelected = idx === currentIndex;
                const status = masteryMap[v.id] || 'unlearned';

                return (
                  <button
                    key={v.id}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setIsFlipped(false);
                      setRevealedClozeIndices(new Set());
                      setShowFullFirstLetter(false);
                      if (isSpeaking) {
                        SacredReader.stop();
                        setIsSpeaking(false);
                      }
                    }}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-1.5 ${
                      isSelected
                        ? 'bg-amber-50 border-amber-600 ring-2 ring-amber-400/50 shadow-xs'
                        : 'bg-stone-50/70 hover:bg-stone-100 border-stone-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-cinzel font-bold text-xs text-amber-950 truncate">
                        {v.reference}
                      </span>
                      {status === 'mastered' && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      )}
                      {status === 'learning' && (
                        <Bookmark className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-stone-600 font-serif line-clamp-1 italic">
                      {v.title}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      ) : (
        /* Empty Filter State */
        <div className="bg-white rounded-2xl p-12 text-center space-y-4 border border-stone-200">
          <BookOpen className="w-12 h-12 text-amber-700/60 mx-auto" />
          <h3 className="font-cinzel text-xl font-bold text-stone-800">No Passages Found</h3>
          <p className="text-sm text-stone-500 font-serif max-w-md mx-auto">
            No memory verses matched your search query. Try clearing your search or selecting a different category.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('All');
            }}
            className="px-4 py-2 rounded-xl bg-amber-900 text-white text-xs font-cinzel font-bold cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
};
