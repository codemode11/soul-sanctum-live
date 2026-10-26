import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  ArrowLeft, 
  Search, 
  Bookmark, 
  BookmarkCheck, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  RotateCcw, 
  Settings2, 
  ListOrdered, 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  Sparkles, 
  Share2, 
  Check, 
  Info, 
  Clock, 
  Compass,
  X
} from 'lucide-react';
import { 
  SPIRITUAL_BOOKS, 
  SpiritualBook, 
  SpiritualChapter, 
  BookCategory 
} from '../data/spiritualBooks';
import { SacredReader } from '../utils/speech';

type ReadingTheme = 'parchment' | 'sepia' | 'dark' | 'white';
type FontSize = 'sm' | 'md' | 'lg' | 'xl';
type FontFamily = 'serif' | 'roman' | 'sans';

interface BookmarkRecord {
  bookId: string;
  chapterIndex: number;
  timestamp: number;
}

export const SpiritualBooksReaderView: React.FC = () => {
  // Navigation and Active Book state
  const [activeBookId, setActiveBookId] = useState<string | null>(null);
  const [activeChapterIndex, setActiveChapterIndex] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<BookCategory>('all');
  const [librarySearch, setLibrarySearch] = useState<string>('');
  
  // Reader Settings state (persisted in localStorage)
  const [readingTheme, setReadingTheme] = useState<ReadingTheme>(() => {
    return (localStorage.getItem('ss_reader_theme') as ReadingTheme) || 'parchment';
  });
  const [fontSize, setFontSize] = useState<FontSize>(() => {
    return (localStorage.getItem('ss_reader_fontsize') as FontSize) || 'md';
  });
  const [fontFamily, setFontFamily] = useState<FontFamily>(() => {
    return (localStorage.getItem('ss_reader_fontfamily') as FontFamily) || 'serif';
  });

  // UI Panels state
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLectioGuideOpen, setIsLectioGuideOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [bookSearchQuery, setBookSearchQuery] = useState('');
  const [copiedQuote, setCopiedQuote] = useState(false);

  // Audio Speech state
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioGender, setAudioGender] = useState<'male' | 'female'>('female');
  const [activeParagraphIndex, setActiveParagraphIndex] = useState<number | null>(null);

  // Bookmarks state (stored in localStorage)
  const [bookmarks, setBookmarks] = useState<BookmarkRecord[]>(() => {
    try {
      const saved = localStorage.getItem('ss_spiritual_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const readerContainerRef = useRef<HTMLDivElement>(null);

  // Sync settings to localStorage
  useEffect(() => {
    localStorage.setItem('ss_reader_theme', readingTheme);
  }, [readingTheme]);

  useEffect(() => {
    localStorage.setItem('ss_reader_fontsize', fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('ss_reader_fontfamily', fontFamily);
  }, [fontFamily]);

  useEffect(() => {
    localStorage.setItem('ss_spiritual_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Clean up audio on unmount or chapter change
  useEffect(() => {
    return () => {
      SacredReader.stop();
    };
  }, [activeBookId, activeChapterIndex]);

  // Gently position reader container in view flush with top of Index Panel
  useEffect(() => {
    if (activeBookId) {
      const mainArea = document.getElementById('main-content-area');
      if (mainArea) {
        const elementRect = mainArea.getBoundingClientRect();
        const absoluteTop = elementRect.top + window.pageYOffset;
        window.scrollTo({ top: Math.max(0, absoluteTop - 80), behavior: 'smooth' });
      }
    }
  }, [activeBookId, activeChapterIndex]);

  const activeBook = SPIRITUAL_BOOKS.find(b => b.id === activeBookId) || null;
  const currentChapter: SpiritualChapter | null = activeBook 
    ? activeBook.chapters[activeChapterIndex] || activeBook.chapters[0] 
    : null;

  // Bookmarks helpers
  const isCurrentChapterBookmarked = activeBook && currentChapter 
    ? bookmarks.some(b => b.bookId === activeBook.id && b.chapterIndex === activeChapterIndex)
    : false;

  const toggleBookmark = () => {
    if (!activeBook || !currentChapter) return;
    if (isCurrentChapterBookmarked) {
      setBookmarks(prev => prev.filter(b => !(b.bookId === activeBook.id && b.chapterIndex === activeChapterIndex)));
    } else {
      setBookmarks(prev => [
        ...prev.filter(b => !(b.bookId === activeBook.id && b.chapterIndex === activeChapterIndex)),
        { bookId: activeBook.id, chapterIndex: activeChapterIndex, timestamp: Date.now() }
      ]);
    }
  };

  // Audio Read-Aloud handler
  const handleToggleAudio = () => {
    if (isAudioPlaying) {
      SacredReader.stop();
      setIsAudioPlaying(false);
      setActiveParagraphIndex(null);
    } else {
      if (!currentChapter) return;
      setIsAudioPlaying(true);
      
      const fullText = [
        `${currentChapter.title}.`,
        currentChapter.subtitle ? `${currentChapter.subtitle}.` : '',
        ...currentChapter.paragraphs,
        `Meditation quote: ${currentChapter.keyQuote}. ${currentChapter.quoteCitation}.`
      ].filter(Boolean).join(' ');

      SacredReader.speak(
        fullText, 
        () => {
          setIsAudioPlaying(false);
          setActiveParagraphIndex(null);
        }, 
        audioGender, 
        0.9
      );
    }
  };

  // Copy key quote to clipboard
  const handleCopyQuote = (quote: string, citation: string, bookTitle: string) => {
    const formatted = `"${quote}"\n— ${citation}, ${bookTitle}\n(Soul Sanctum Spiritual Reading)`;
    navigator.clipboard.writeText(formatted).then(() => {
      setCopiedQuote(true);
      setTimeout(() => setCopiedQuote(false), 2400);
    });
  };

  // Filtered books
  const filteredBooks = SPIRITUAL_BOOKS.filter(book => {
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    const query = librarySearch.toLowerCase().trim();
    const matchesSearch = !query || 
      book.title.toLowerCase().includes(query) ||
      book.latinTitle.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query) ||
      book.theologicalFocus.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  // Theme styling helpers
  const getThemeClasses = () => {
    switch (readingTheme) {
      case 'sepia':
        return {
          wrapper: 'bg-[#F4ECE1] text-[#332218] border-[#8B5A2B]/30',
          card: 'bg-[#EDE2D4] border-[#8B5A2B]/40 text-[#2B1B12]',
          header: 'bg-[#EDE2D4]/90 border-[#8B5A2B]/30 text-[#332218]',
          subtext: 'text-[#634835]',
          accent: 'text-[#8B5A2B]',
          activeButton: 'bg-[#8B5A2B] text-white',
          quoteBox: 'bg-[#E5D7C5] border-l-4 border-[#8B5A2B] text-[#2B1B12]'
        };
      case 'dark':
        return {
          wrapper: 'bg-[#120A05] text-[#F5EAE1] border-[#8B5A2B]/40',
          card: 'bg-[#1A0F08] border-[#8B5A2B]/50 text-[#F5EAE1]',
          header: 'bg-[#160D07]/95 border-[#8B5A2B]/40 text-[#F5EAE1]',
          subtext: 'text-[#D4A373]',
          accent: 'text-[#D4A373]',
          activeButton: 'bg-[#8B5A2B] text-white',
          quoteBox: 'bg-[#1D1109] border-l-4 border-[#D4A373] text-[#F5EAE1]'
        };
      case 'white':
        return {
          wrapper: 'bg-white text-stone-900 border-stone-200',
          card: 'bg-stone-50 border-stone-200 text-stone-900',
          header: 'bg-white/95 border-stone-200 text-stone-900',
          subtext: 'text-stone-500',
          accent: 'text-amber-800',
          activeButton: 'bg-amber-800 text-white',
          quoteBox: 'bg-stone-100 border-l-4 border-amber-800 text-stone-900'
        };
      case 'parchment':
      default:
        return {
          wrapper: 'bg-[#FAF6EE] text-[#2A1B12] border-[#8B5A2B]/30',
          card: 'bg-[#F2ECE0] border-[#8B5A2B]/30 text-[#2A1B12]',
          header: 'bg-[#F4EFE5]/95 border-[#8B5A2B]/30 text-[#2A1B12]',
          subtext: 'text-[#5C3D28]',
          accent: 'text-[#8B5A2B]',
          activeButton: 'bg-[#8B5A2B] text-white',
          quoteBox: 'bg-[#ECE3D2] border-l-4 border-[#8B5A2B] text-[#2A1B12]'
        };
    }
  };

  const getFontSizeClasses = () => {
    switch (fontSize) {
      case 'sm':
        return 'text-base sm:text-[17px] leading-relaxed';
      case 'lg':
        return 'text-lg sm:text-[21px] leading-[1.85]';
      case 'xl':
        return 'text-xl sm:text-[24px] leading-[1.95]';
      case 'md':
      default:
        return 'text-base sm:text-[19px] leading-[1.8]';
    }
  };

  const getFontFamilyStyle = () => {
    switch (fontFamily) {
      case 'roman':
        return { fontFamily: "'Cinzel', serif" };
      case 'sans':
        return { fontFamily: 'ui-sans-serif, system-ui, sans-serif' };
      case 'serif':
      default:
        return { fontFamily: "'Cinzel', 'Merriweather', 'Georgia', serif" };
    }
  };

  const themeStyles = getThemeClasses();

  // ==========================================
  // RENDER: IN-APP BOOK READER VIEW
  // ==========================================
  if (activeBook && currentChapter) {
    const totalChapters = activeBook.chapters.length;
    const hasPrev = activeChapterIndex > 0;
    const hasNext = activeChapterIndex < totalChapters - 1;

    return (
      <div 
        ref={readerContainerRef}
        className={`max-w-4xl mx-auto rounded-xl overflow-hidden border shadow-2xl transition-colors duration-300 ${themeStyles.wrapper}`}
        style={getFontFamilyStyle()}
      >
        {/* Sticky Top Reader Controls Header */}
        <header className={`sticky top-0 z-40 px-4 sm:px-6 py-3 border-b backdrop-blur-md flex items-center justify-between gap-3 ${themeStyles.header}`}>
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => {
                SacredReader.stop();
                setIsAudioPlaying(false);
                setActiveBookId(null);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl hover:bg-black/10 transition-colors text-xs font-cinzel font-bold shrink-0 cursor-pointer"
              title="Return to Spiritual Library"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Library</span>
            </button>

            <div className="h-5 w-px bg-stone-400/30 shrink-0" />

            <div className="min-w-0 text-left">
              <h3 className="font-cinzel text-xs sm:text-sm font-bold truncate max-w-[180px] sm:max-w-xs md:max-w-md">
                {activeBook.title}
              </h3>
              <p className={`text-[11px] truncate font-serif-sacred ${themeStyles.subtext}`}>
                Chapter {currentChapter.chapterNumber} of {totalChapters} • {currentChapter.title}
              </p>
            </div>
          </div>

          {/* Reader Action Icons */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            {/* Table of Contents Trigger */}
            <button
              onClick={() => setIsTocOpen(!isTocOpen)}
              className="p-2 rounded-xl hover:bg-black/10 transition-colors cursor-pointer relative"
              title="Table of Contents"
            >
              <ListOrdered className="w-4 h-4" />
            </button>

            {/* In-Book Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 rounded-xl hover:bg-black/10 transition-colors cursor-pointer"
              title="Search within chapter"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Audio Read-Aloud Button */}
            <button
              onClick={handleToggleAudio}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                isAudioPlaying 
                  ? 'bg-amber-700 text-white shadow-md animate-pulse' 
                  : 'hover:bg-black/10'
              }`}
              title={isAudioPlaying ? 'Pause Audio Proclamation' : 'Listen to Chapter (Lector voice)'}
            >
              {isAudioPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Pause</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Listen</span>
                </>
              )}
            </button>

            {/* Bookmark Trigger */}
            <button
              onClick={toggleBookmark}
              className={`p-2 rounded-xl transition-colors cursor-pointer ${
                isCurrentChapterBookmarked 
                  ? 'text-amber-600 bg-amber-500/15' 
                  : 'hover:bg-black/10'
              }`}
              title={isCurrentChapterBookmarked ? 'Remove Bookmark' : 'Bookmark this chapter'}
            >
              {isCurrentChapterBookmarked ? (
                <BookmarkCheck className="w-4 h-4 text-amber-600 fill-amber-600" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </button>

            {/* Reading Settings Trigger */}
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              className="p-2 rounded-xl hover:bg-black/10 transition-colors cursor-pointer"
              title="Typography and Reading Appearance"
            >
              <Settings2 className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* In-Book Quick Search Drawer */}
        {isSearchOpen && (
          <div className="px-6 py-3 border-b border-black/10 bg-black/5 flex items-center gap-3">
            <Search className="w-4 h-4 text-stone-400 shrink-0" />
            <input
              type="text"
              value={bookSearchQuery}
              onChange={(e) => setBookSearchQuery(e.target.value)}
              placeholder="Find in this chapter (e.g. grace, prayer, cross, humility)..."
              className="w-full bg-transparent border-none text-xs sm:text-sm focus:outline-none placeholder-stone-400"
              autoFocus
            />
            {bookSearchQuery && (
              <button 
                onClick={() => setBookSearchQuery('')}
                className="text-stone-400 hover:text-stone-600 cursor-pointer p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}

        {/* Table of Contents Dropdown / Modal */}
        {isTocOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className={`w-full max-w-lg rounded-xl p-6 shadow-2xl border max-h-[85vh] flex flex-col ${themeStyles.card}`}>
              <div className="flex items-center justify-between pb-4 border-b border-black/10">
                <div>
                  <h4 className="font-cinzel text-base font-bold">Table of Contents</h4>
                  <p className={`text-xs ${themeStyles.subtext}`}>{activeBook.title}</p>
                </div>
                <button
                  onClick={() => setIsTocOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-black/10 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto divide-y divide-black/10 py-2 pr-1 space-y-1">
                {activeBook.chapters.map((ch, idx) => {
                  const isCurrent = idx === activeChapterIndex;
                  const isBookmarked = bookmarks.some(b => b.bookId === activeBook.id && b.chapterIndex === idx);
                  return (
                    <button
                      key={ch.id}
                      onClick={() => {
                        SacredReader.stop();
                        setIsAudioPlaying(false);
                        setActiveChapterIndex(idx);
                        setIsTocOpen(false);
                      }}
                      className={`w-full text-left p-3 rounded-xl transition-all cursor-pointer flex items-start justify-between gap-3 ${
                        isCurrent 
                          ? `${themeStyles.activeButton} shadow-sm font-bold` 
                          : 'hover:bg-black/5'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="text-xs uppercase font-cinzel tracking-wider opacity-80">
                          Chapter {ch.chapterNumber}
                        </div>
                        <div className="text-sm font-serif-sacred">{ch.title}</div>
                        {ch.subtitle && (
                          <div className="text-[11px] opacity-75 line-clamp-1 italic">{ch.subtitle}</div>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0 pt-1">
                        {isBookmarked && (
                          <BookmarkCheck className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        )}
                        {isCurrent && (
                          <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-white/20">
                            Reading
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Reading Settings Drawer / Modal */}
        {isSettingsOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className={`w-full max-w-md rounded-xl p-6 shadow-2xl border space-y-6 ${themeStyles.card}`}>
              <div className="flex items-center justify-between pb-3 border-b border-black/10">
                <div className="flex items-center gap-2">
                  <Settings2 className="w-5 h-5 text-amber-700" />
                  <h4 className="font-cinzel text-base font-bold">Reader Appearance</h4>
                </div>
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-black/10 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Theme Selection */}
              <div className="space-y-2">
                <label className="text-xs uppercase font-cinzel font-bold tracking-wider opacity-75">
                  Atmosphere Theme
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'parchment', label: 'Parchment', bg: 'bg-[#FAF6EE]', border: 'border-[#8B5A2B]' },
                    { id: 'sepia', label: 'Sepia', bg: 'bg-[#F4ECE1]', border: 'border-[#634835]' },
                    { id: 'dark', label: 'Nocturne', bg: 'bg-[#120A05]', border: 'border-[#8B5A2B]' },
                    { id: 'white', label: 'White', bg: 'bg-white', border: 'border-stone-300' }
                  ].map(t => (
                    <button
                      key={t.id}
                      onClick={() => setReadingTheme(t.id as ReadingTheme)}
                      className={`p-3 rounded-lg border-2 flex flex-col items-center gap-1.5 transition-all cursor-pointer ${t.bg} ${
                        readingTheme === t.id 
                          ? 'ring-2 ring-amber-600 scale-105 shadow-md font-bold' 
                          : 'opacity-70 hover:opacity-100'
                      }`}
                    >
                      <span className="text-xs font-cinzel font-semibold text-stone-900">{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size */}
              <div className="space-y-2">
                <label className="text-xs uppercase font-cinzel font-bold tracking-wider opacity-75">
                  Text Scale
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'sm', label: 'Small', sample: '16px' },
                    { id: 'md', label: 'Normal', sample: '18px' },
                    { id: 'lg', label: 'Large', sample: '21px' },
                    { id: 'xl', label: 'Spacious', sample: '24px' }
                  ].map(s => (
                    <button
                      key={s.id}
                      onClick={() => setFontSize(s.id as FontSize)}
                      className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                        fontSize === s.id 
                          ? `${themeStyles.activeButton} shadow-sm font-bold` 
                          : 'bg-black/5 hover:bg-black/10'
                      }`}
                    >
                      <div className="text-xs font-semibold">{s.label}</div>
                      <div className="text-[10px] opacity-75">{s.sample}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Family */}
              <div className="space-y-2">
                <label className="text-xs uppercase font-cinzel font-bold tracking-wider opacity-75">
                  Sacred Typography
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'serif', label: 'Garamond Serif', style: "'Merriweather', serif" },
                    { id: 'roman', label: 'Cinzel Classical', style: "'Cinzel', serif" },
                    { id: 'sans', label: 'Modern Sans', style: 'sans-serif' }
                  ].map(f => (
                    <button
                      key={f.id}
                      onClick={() => setFontFamily(f.id as FontFamily)}
                      className={`p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                        fontFamily === f.id 
                          ? `${themeStyles.activeButton} shadow-sm font-bold` 
                          : 'bg-black/5 hover:bg-black/10'
                      }`}
                      style={{ fontFamily: f.style }}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Audio Voice Choice */}
              <div className="space-y-2 pt-2 border-t border-black/10">
                <label className="text-xs uppercase font-cinzel font-bold tracking-wider opacity-75">
                  Lectio Audio Voice
                </label>
                <div>
                  <button
                    onClick={() => {
                      setAudioGender('female');
                      if (isAudioPlaying) handleToggleAudio();
                    }}
                    className={`w-full p-2.5 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                      audioGender === 'female' 
                        ? `${themeStyles.activeButton} shadow-sm font-bold` 
                        : 'bg-black/5 hover:bg-black/10'
                    }`}
                  >
                    Serene Contemplative (Female Lector)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chapter Content Body */}
        <div className="px-6 sm:px-12 md:px-16 py-10 sm:py-14 space-y-8">
          
          {/* Chapter Opening Header */}
          <div className="text-center space-y-3 pb-8 border-b border-black/10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 text-xs uppercase font-cinzel tracking-[0.2em] font-semibold opacity-80">
              <span>Chapter {currentChapter.chapterNumber}</span>
              <span>•</span>
              <span>{activeBook.categoryLabel}</span>
            </div>

            <h1 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide leading-tight">
              {currentChapter.title}
            </h1>

            {currentChapter.latinTitle && (
              <p className={`font-serif-sacred text-sm sm:text-base italic ${themeStyles.subtext}`}>
                {currentChapter.latinTitle}
              </p>
            )}

            {currentChapter.subtitle && (
              <p className={`font-serif-sacred text-xs sm:text-sm font-medium tracking-wide max-w-xl mx-auto pt-1 opacity-85`}>
                {currentChapter.subtitle}
              </p>
            )}
          </div>

          {/* Authentic Paragraphs with Drop Cap on First Paragraph */}
          <div className={`space-y-6 ${getFontSizeClasses()}`}>
            {currentChapter.paragraphs.map((para, pIdx) => {
              // Highlight matched search term
              const isMatch = bookSearchQuery && para.toLowerCase().includes(bookSearchQuery.toLowerCase());
              const isFirst = pIdx === 0;

              return (
                <p 
                  key={pIdx} 
                  className={`text-justify tracking-normal font-serif-sacred transition-colors duration-200 ${
                    isMatch ? 'bg-amber-400/25 p-2 rounded-xl ring-1 ring-amber-500/40' : ''
                  }`}
                >
                  {isFirst ? (
                    <>
                      <span className="float-left text-4xl sm:text-5xl font-cinzel font-bold leading-none pr-3 pt-1 text-[#8B5A2B]">
                        {para.charAt(0)}
                      </span>
                      <span>{para.slice(1)}</span>
                    </>
                  ) : (
                    para
                  )}
                </p>
              );
            })}
          </div>

          {/* Spiritual Key Quote Callout Box */}
          <div className={`p-6 sm:p-8 rounded-xl space-y-3 relative overflow-hidden ${themeStyles.quoteBox}`}>
            <Quote className="w-10 h-10 opacity-20 absolute -right-2 -bottom-2 pointer-events-none" />
            
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] uppercase font-cinzel tracking-widest font-bold opacity-75">
                Golden Spiritual Sentence
              </span>
              <button
                onClick={() => handleCopyQuote(currentChapter.keyQuote, currentChapter.quoteCitation, activeBook.title)}
                className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg bg-black/10 hover:bg-black/15 transition-colors cursor-pointer"
                title="Copy quote with citation"
              >
                {copiedQuote ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <p className="font-serif-sacred text-base sm:text-lg italic font-medium leading-relaxed">
              "{currentChapter.keyQuote}"
            </p>

            <p className="text-xs font-cinzel tracking-wider text-right opacity-80">
              — {activeBook.author}, {currentChapter.quoteCitation}
            </p>
          </div>

          {/* Lectio Divina Contemplation Prompt */}
          <div className={`p-6 rounded-xl border border-dashed border-black/20 bg-black/5 space-y-2`}>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <h5 className="font-cinzel text-xs font-bold uppercase tracking-wider">
                Contemplative Fruit (Meditatio and Oratio)
              </h5>
            </div>
            <p className="font-serif-sacred text-sm sm:text-base leading-relaxed opacity-90">
              {currentChapter.reflectionPrompt}
            </p>
          </div>

          {/* Bottom Chapter Switcher Navigation Cards */}
          <div className="pt-6 border-t border-black/10 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {hasPrev ? (
              <button
                onClick={() => {
                  SacredReader.stop();
                  setIsAudioPlaying(false);
                  setActiveChapterIndex(activeChapterIndex - 1);
                }}
                className={`p-4 rounded-xl border text-left transition-all hover:scale-[1.01] cursor-pointer flex items-center gap-3 ${themeStyles.card}`}
              >
                <ChevronLeft className="w-5 h-5 text-amber-700 shrink-0" />
                <div className="min-w-0">
                  <div className="text-[10px] uppercase font-cinzel font-semibold opacity-70">
                    Previous Chapter
                  </div>
                  <div className="text-xs sm:text-sm font-bold truncate">
                    {activeBook.chapters[activeChapterIndex - 1].title}
                  </div>
                </div>
              </button>
            ) : (
              <div className="hidden sm:block" />
            )}

            {hasNext ? (
              <button
                onClick={() => {
                  SacredReader.stop();
                  setIsAudioPlaying(false);
                  setActiveChapterIndex(activeChapterIndex + 1);
                }}
                className={`p-4 rounded-xl border text-right transition-all hover:scale-[1.01] cursor-pointer flex items-center justify-end gap-3 ${themeStyles.card}`}
              >
                <div className="min-w-0">
                  <div className="text-[10px] uppercase font-cinzel font-semibold opacity-70">
                    Next Chapter
                  </div>
                  <div className="text-xs sm:text-sm font-bold truncate">
                    {activeBook.chapters[activeChapterIndex + 1].title}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-amber-700 shrink-0" />
              </button>
            ) : (
              <button
                onClick={() => {
                  SacredReader.stop();
                  setIsAudioPlaying(false);
                  setActiveBookId(null);
                }}
                className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${themeStyles.card} font-cinzel font-bold text-sm text-amber-700`}
              >
                Finished Book • Return to Library
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // RENDER: SPIRITUAL BOOKS LIBRARY CATALOG
  // ==========================================
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      
      {/* Sacred Masthead Banner */}
      <div className="p-6 sm:p-8 rounded-xl bg-gradient-to-br from-[#1C120C] via-[#25170F] to-[#120A05] border border-[#8B5A2B]/40 shadow-2xl text-stone-100 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase font-cinzel tracking-[0.25em] text-[#D4A373] font-bold">
                Sancta Lectio • In-App Spiritual Library
              </span>
            </div>
            <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider text-white">
              Spiritual Classics
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 font-serif-sacred max-w-2xl leading-relaxed">
              Immerse your soul in the timeless spiritual masterworks of the Doctors of the Church and canonized saints. Formatted for contemplative *Lectio Divina*, reverent audio proclamation, and interior peace.
            </p>
          </div>

          {/* Quick Lectio Divina Guide Button */}
          <button
            onClick={() => setIsLectioGuideOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#8B5A2B]/25 hover:bg-[#8B5A2B]/40 border border-[#8B5A2B]/50 text-amber-100 text-xs font-cinzel font-bold transition-all shadow-md shrink-0 cursor-pointer self-start sm:self-center"
          >
            <Compass className="w-4 h-4 text-[#D4A373]" />
            <span>How to Pray with Spiritual Reading</span>
          </button>
        </div>

        {/* Search Bar and Stats */}
        <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={librarySearch}
              onChange={(e) => setLibrarySearch(e.target.value)}
              placeholder="Search books, authors, or spiritual themes (e.g. Kempis, Teresa, Humility, Mary, Carmel)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-black/40 border border-[#8B5A2B]/40 text-xs sm:text-sm text-stone-200 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#D4A373]/50 transition-all"
            />
            {librarySearch && (
              <button 
                onClick={() => setLibrarySearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-200 p-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {bookmarks.length > 0 && (
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#24160E] border border-[#8B5A2B]/40 text-xs text-[#D4A373] font-cinzel shrink-0">
              <BookmarkCheck className="w-4 h-4 text-amber-400 fill-amber-400" />
              <span>{bookmarks.length} Active {bookmarks.length === 1 ? 'Bookmark' : 'Bookmarks'}</span>
            </div>
          )}
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {[
          { id: 'all', label: 'All Spiritual Classics' },
          { id: 'devotion', label: 'Devotio and Daily Life' },
          { id: 'mysticism', label: 'Carmelite Mysticism' },
          { id: 'marian', label: 'Marian Consecration' },
          { id: 'saints', label: 'Autobiographies of Saints' },
          { id: 'confessions', label: 'Patristic Confessions' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id as BookCategory)}
            className={`px-4 py-2 rounded-lg text-xs font-cinzel font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#8B5A2B] text-white shadow-md border border-[#D4A373]/50'
                : 'bg-stone-900/60 hover:bg-stone-800/80 text-stone-300 border border-stone-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Book Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBooks.map(book => {
          const bookmarkedChapter = bookmarks.find(b => b.bookId === book.id);

          return (
            <div
              key={book.id}
              className="rounded-xl overflow-hidden border border-[#C89F72]/60 bg-gradient-to-b from-[#7A5536] via-[#6B482B] to-[#593A22] text-stone-100 shadow-xl hover:border-[#E6C29F] transition-all duration-300 flex flex-col justify-between"
            >
              <div className="p-6 sm:p-7 space-y-4">
                
                {/* Book Header with Latin Subtitle and Era */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-cinzel tracking-widest text-[#F5D7B2] font-bold">
                    {book.era} • {book.categoryLabel}
                  </span>
                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wide">
                    {book.title}
                  </h3>
                  <p className="text-xs text-[#F3DEC4] font-serif-sacred italic">
                    {book.latinTitle}
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-2 text-xs text-stone-100 border-y border-[#9C7049]/50 py-2">
                  <span className="font-bold text-white font-cinzel">{book.author}</span>
                  <span className="text-[#E2C4A6]">•</span>
                  <span className="text-stone-200 font-serif-sacred italic line-clamp-1">
                    {book.authorTitle}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-stone-100 font-serif-sacred leading-relaxed line-clamp-3">
                  {book.description}
                </p>

                {/* Theological Focus Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {book.theologicalFocus.split(', ').map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-0.5 rounded-full bg-[#4A301B]/70 border border-[#C89F72]/50 text-[10px] text-[#F5D7B2] font-cinzel"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer with Chapter Counts and Action Buttons */}
              <div className="px-6 py-4 bg-[#3E2716]/75 border-t border-[#C89F72]/40 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-xs text-stone-200 font-serif-sacred">
                  <span className="flex flex-col items-center justify-center gap-1 text-center">
                    <BookOpen className="w-4 h-4 text-[#F5D7B2]" />
                    <span>{book.chapters.length} Chapters</span>
                  </span>
                  <span className="text-[#C89F72]">•</span>
                  <span className="flex flex-col items-center justify-center gap-1 text-center">
                    <Clock className="w-4 h-4 text-[#F5D7B2]" />
                    <span>~{book.estimatedMinutesPerChapter}m / ch</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {bookmarkedChapter && (
                    <button
                      onClick={() => {
                        setActiveBookId(book.id);
                        setActiveChapterIndex(bookmarkedChapter.chapterIndex);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#5C3A21] hover:bg-[#6B4423] text-[#F5D7B2] border border-[#C89F72]/50 text-xs font-cinzel font-bold transition-all cursor-pointer flex items-center gap-1"
                      title="Jump to saved bookmark"
                    >
                      <BookmarkCheck className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Ch. {bookmarkedChapter.chapterIndex + 1}</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setActiveBookId(book.id);
                      setActiveChapterIndex(0);
                    }}
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#9C6B3B] to-[#7A4E2D] hover:from-[#B07C49] hover:to-[#8B5A2B] border border-[#DFB991]/40 text-white text-xs font-cinzel font-bold tracking-wider transition-all shadow-md cursor-pointer flex items-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Open Reader</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lectio Divina Guide Modal */}
      {isLectioGuideOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl rounded-xl bg-gradient-to-b from-[#1C120C] to-[#120A05] border border-[#8B5A2B]/60 p-6 sm:p-8 text-stone-200 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#8B5A2B]/30">
              <div className="flex items-center gap-2.5">
                <Compass className="w-5 h-5 text-[#D4A373]" />
                <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white">
                  The Four Pillars of Lectio Divina
                </h3>
              </div>
              <button
                onClick={() => setIsLectioGuideOpen(false)}
                className="p-1.5 rounded-xl hover:bg-white/10 text-stone-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-stone-300 font-serif-sacred leading-relaxed">
              *Lectio Divina* is the ancient monastic art of reading Holy Scripture and spiritual writings not merely for intellectual study, but as an intimate conversation with the Living God. Use these four classical movements:
            </p>

            <div className="space-y-4">
              {[
                {
                  step: '1. Lectio (Reading)',
                  latin: 'Quod legitur, sapit',
                  desc: 'Read the spiritual chapter slowly, reverently, and without haste. Listen attentively to the words as if Christ or the Saint were speaking directly to your soul right now.'
                },
                {
                  step: '2. Meditatio (Meditation)',
                  latin: 'Masticatio verbi',
                  desc: 'Pause when a sentence strikes your heart. Ponder it. Turn it over in your mind like a sweet celestial food. Ask: "What is God saying to my life, my crosses, and my decisions through this word?"'
                },
                {
                  step: '3. Oratio (Prayer)',
                  latin: 'Colloquium cordis ad Cor',
                  desc: 'Speak from the heart to God. Respond with praise, sorrow for sin, thanksgiving, or asking for the grace to live the virtue described in the chapter.'
                },
                {
                  step: '4. Contemplatio (Contemplation)',
                  latin: 'Requies in Deo',
                  desc: 'Rest silently in God\'s presence beyond words. Allow the Holy Spirit to fill the soul with His peace, silence, and transformative love.'
                }
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className="p-4 rounded-xl bg-black/40 border border-[#8B5A2B]/40 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-cinzel text-sm font-bold text-amber-200">{item.step}</h4>
                    <span className="text-[11px] font-serif-sacred italic text-[#D4A373]">{item.latin}</span>
                  </div>
                  <p className="text-xs text-stone-300 font-serif-sacred leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center pt-2">
              <button
                onClick={() => setIsLectioGuideOpen(false)}
                className="px-6 py-2.5 rounded-xl bg-[#8B5A2B] hover:bg-[#A47148] text-white text-xs font-cinzel font-bold tracking-wider transition-all shadow-md cursor-pointer"
              >
                Enter the Library and Read
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
