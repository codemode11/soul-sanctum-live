import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  BookOpen,
  Search,
  Columns,
  Bookmark,
  BookmarkCheck,
  Volume2,
  VolumeX,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
  ScrollText,
  Globe,
  ShieldCheck,
  Filter,
  Type
} from 'lucide-react';
import {
  CATHOLIC_BIBLE_BOOKS,
  CATHOLIC_BIBLE_TRANSLATIONS,
  CURATED_BIBLE_CHAPTERS,
  HAYDOCK_CHAPTER_NOTES,
  FEATURED_CATHOLIC_PASSAGES,
  MODERN_CATHOLIC_BIBLE_EDITIONS,
  getModernBibleChapterUrl,
  CatholicBibleBook,
  CatholicBibleTranslationId,
  BiblicalSection,
  BibleVerse
} from '../data/catholicBibles';
import { SacredReader } from '../utils/speech';

interface SavedBibleBookmark {
  id: string;
  bookId: string;
  bookName: string;
  chapter: number;
  verse: number;
  text: string;
  translation: CatholicBibleTranslationId;
  savedAt: string;
}

const BOOKMARKS_STORAGE_KEY = 'sanctum_catholic_bible_bookmarks_v1';

export const CatholicBiblesView: React.FC = () => {
  const [selectedBookId, setSelectedBookId] = useState<string>('JHN');
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [primaryTranslation, setPrimaryTranslation] = useState<CatholicBibleTranslationId>('drc');
  const [parallelTranslation, setParallelTranslation] = useState<CatholicBibleTranslationId>('vulgate');
  const [isParallelMode, setIsParallelMode] = useState<boolean>(false);
  const [showHaydockNotes, setShowHaydockNotes] = useState<boolean>(true);
  const [activeTestamentFilter, setActiveTestamentFilter] = useState<'ALL' | 'OT' | 'NT' | 'DEUTERO'>('ALL');
  const [activeSectionFilter, setActiveSectionFilter] = useState<BiblicalSection | 'ALL'>('ALL');
  const [bookSearchQuery, setBookSearchQuery] = useState<string>('');
  const [verseFilterQuery, setVerseFilterQuery] = useState<string>('');
  const [fontSizeLevel, setFontSizeLevel] = useState<'sm' | 'md' | 'lg'>('md');

  const [primaryVerses, setPrimaryVerses] = useState<BibleVerse[]>([]);
  const [secondaryVerses, setSecondaryVerses] = useState<BibleVerse[]>([]);
  const [sourceLabel, setSourceLabel] = useState<string>('Douay-Rheims Catholic Bible');
  const [isLoadingChapter, setIsLoadingChapter] = useState<boolean>(false);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [activeViewMode, setActiveViewMode] = useState<'reader' | 'modern-editions' | 'bookmarks'>('reader');

  const [bookmarks, setBookmarks] = useState<SavedBibleBookmark[]>(() => {
    try {
      const raw = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const selectedBook: CatholicBibleBook = useMemo(() => {
    return CATHOLIC_BIBLE_BOOKS.find((b) => b.id === selectedBookId) || CATHOLIC_BIBLE_BOOKS[49]; // Default John
  }, [selectedBookId]);

  const filteredBooks = useMemo(() => {
    return CATHOLIC_BIBLE_BOOKS.filter((book) => {
      if (activeTestamentFilter === 'OT' && book.testament !== 'OT') return false;
      if (activeTestamentFilter === 'NT' && book.testament !== 'NT') return false;
      if (activeTestamentFilter === 'DEUTERO' && !book.isDeuterocanonical) return false;
      if (activeSectionFilter !== 'ALL' && book.section !== activeSectionFilter) return false;
      if (bookSearchQuery.trim()) {
        const q = bookSearchQuery.toLowerCase().trim();
        return (
          book.name.toLowerCase().includes(q) ||
          book.traditionalName.toLowerCase().includes(q) ||
          book.latinName.toLowerCase().includes(q) ||
          book.abbrev.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeTestamentFilter, activeSectionFilter, bookSearchQuery]);

  const fetchTranslationChapter = useCallback(
    async (
      book: CatholicBibleBook,
      chapterNum: number,
      translation: CatholicBibleTranslationId
    ): Promise<{ verses: BibleVerse[]; sourceLabel: string }> => {
      const cacheKey = `${book.id}:${chapterNum}`;
      const curated = CURATED_BIBLE_CHAPTERS[cacheKey]?.[translation];

      try {
        const params = new URLSearchParams({
          bookId: book.id,
          bookName: book.name,
          drboCode: book.drboCode,
          chapter: String(chapterNum),
          translation
        });
        const resp = await fetch(`/api/catholic-bible?${params.toString()}`);
        if (resp.ok) {
          const data = await resp.json();
          if (Array.isArray(data?.verses) && data.verses.length > 0) {
            return {
              verses: data.verses,
              sourceLabel: data.sourceLabel || '73-Book Catholic Scripture Archive'
            };
          }
        }
      } catch {
        // Fallback to local curated treasury
      }

      if (curated && curated.length > 0) {
        return {
          verses: curated,
          sourceLabel: 'Soul Sanctum Offline Catholic Scripture Treasury'
        };
      }

      // Fallback to DRC curated if available
      const fallbackDrc = CURATED_BIBLE_CHAPTERS[cacheKey]?.drc;
      if (fallbackDrc && fallbackDrc.length > 0) {
        return {
          verses: fallbackDrc,
          sourceLabel: 'Douay-Rheims Offline Treasury'
        };
      }

      return {
        verses: [
          {
            verse: 1,
            text: `${book.traditionalName} — Chapter ${chapterNum}. (${book.summary})`
          }
        ],
        sourceLabel: 'Catholic Canon Summary'
      };
    },
    []
  );

  useEffect(() => {
    let isCancelled = false;
    SacredReader.stop();
    setIsSpeaking(false);

    const loadChapter = async () => {
      setIsLoadingChapter(true);
      const primaryResult = await fetchTranslationChapter(
        selectedBook,
        selectedChapter,
        primaryTranslation
      );

      let secondaryResult: { verses: BibleVerse[]; sourceLabel: string } | null = null;
      if (isParallelMode) {
        secondaryResult = await fetchTranslationChapter(
          selectedBook,
          selectedChapter,
          parallelTranslation
        );
      }

      if (!isCancelled) {
        setPrimaryVerses(primaryResult.verses);
        setSourceLabel(primaryResult.sourceLabel);
        setSecondaryVerses(secondaryResult ? secondaryResult.verses : []);
        setIsLoadingChapter(false);
      }
    };

    loadChapter();
    return () => {
      isCancelled = true;
    };
  }, [selectedBook, selectedChapter, primaryTranslation, parallelTranslation, isParallelMode, fetchTranslationChapter]);

  useEffect(() => {
    return () => {
      SacredReader.stop();
    };
  }, []);

  const handleSelectBook = (book: CatholicBibleBook, chapterNum = 1) => {
    setSelectedBookId(book.id);
    setSelectedChapter(Math.min(Math.max(1, chapterNum), book.chapters));
    setVerseFilterQuery('');
  };

  const handlePrevChapter = () => {
    if (selectedChapter > 1) {
      setSelectedChapter((c) => c - 1);
    } else {
      const idx = CATHOLIC_BIBLE_BOOKS.findIndex((b) => b.id === selectedBook.id);
      if (idx > 0) {
        const prevBook = CATHOLIC_BIBLE_BOOKS[idx - 1];
        setSelectedBookId(prevBook.id);
        setSelectedChapter(prevBook.chapters);
      }
    }
  };

  const handleNextChapter = () => {
    if (selectedChapter < selectedBook.chapters) {
      setSelectedChapter((c) => c + 1);
    } else {
      const idx = CATHOLIC_BIBLE_BOOKS.findIndex((b) => b.id === selectedBook.id);
      if (idx >= 0 && idx < CATHOLIC_BIBLE_BOOKS.length - 1) {
        const nextBook = CATHOLIC_BIBLE_BOOKS[idx + 1];
        setSelectedBookId(nextBook.id);
        setSelectedChapter(1);
      }
    }
  };

  const toggleBookmark = (verseObj: BibleVerse) => {
    const bookmarkId = `${selectedBook.id}:${selectedChapter}:${verseObj.verse}:${primaryTranslation}`;
    const exists = bookmarks.some((b) => b.id === bookmarkId);
    const updated = exists
      ? bookmarks.filter((b) => b.id !== bookmarkId)
      : [
          {
            id: bookmarkId,
            bookId: selectedBook.id,
            bookName: selectedBook.name,
            chapter: selectedChapter,
            verse: verseObj.verse,
            text: verseObj.text,
            translation: primaryTranslation,
            savedAt: new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })
          },
          ...bookmarks
        ];
    setBookmarks(updated);
    try {
      localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore storage errors
    }
  };

  const handleCopyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleCopyWholeChapter = () => {
    const transMeta = CATHOLIC_BIBLE_TRANSLATIONS.find((t) => t.id === primaryTranslation);
    const header = `${selectedBook.traditionalName} — Chapter ${selectedChapter} (${transMeta?.shortName || 'Catholic Bible'})\n\n`;
    const body = primaryVerses.map((v) => `${v.verse}. ${v.text}`).join('\n');
    handleCopyText(header + body, 'whole-chapter');
  };

  const handleToggleAudioRead = () => {
    if (isSpeaking) {
      SacredReader.stop();
      setIsSpeaking(false);
      return;
    }
    const textToRead =
      `${selectedBook.traditionalName}, Chapter ${selectedChapter}. ` +
      primaryVerses.map((v) => `Verse ${v.verse}. ${v.text}`).join(' ');
    setIsSpeaking(true);
    SacredReader.speak(textToRead, () => {
      setIsSpeaking(false);
    });
  };

  const displayedPrimaryVerses = useMemo(() => {
    if (!verseFilterQuery.trim()) return primaryVerses;
    const q = verseFilterQuery.toLowerCase().trim();
    return primaryVerses.filter(
      (v) => v.text.toLowerCase().includes(q) || String(v.verse) === q
    );
  }, [primaryVerses, verseFilterQuery]);

  const currentHaydockNotes = useMemo(() => {
    return HAYDOCK_CHAPTER_NOTES[`${selectedBook.id}:${selectedChapter}`] || [];
  }, [selectedBook.id, selectedChapter]);

  const activePrimaryTranslationMeta =
    CATHOLIC_BIBLE_TRANSLATIONS.find((t) => t.id === primaryTranslation) ||
    CATHOLIC_BIBLE_TRANSLATIONS[0];

  const activeParallelTranslationMeta =
    CATHOLIC_BIBLE_TRANSLATIONS.find((t) => t.id === parallelTranslation) ||
    CATHOLIC_BIBLE_TRANSLATIONS[3];

  const fontSizeClass =
    fontSizeLevel === 'sm'
      ? 'text-sm sm:text-base leading-relaxed'
      : fontSizeLevel === 'lg'
      ? 'text-lg sm:text-xl leading-loose'
      : 'text-base sm:text-lg leading-relaxed';

  return (
    <div className="space-y-6 pb-12">
      {/* Sacred Masthead Banner */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-stone-950 via-[#19130e] to-stone-950 border border-[#D4AF37]/40 p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.14),transparent_65%)] pointer-events-none" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-[#D4AF37]/40 text-[#FFD700] text-xs font-cinzel tracking-widest uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-[#FFD700]" />
              <span>73-Book Canon of the Council of Trent</span>
            </div>
            <h1 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide">
              CATHOLIC BIBLES
            </h1>
            <p className="text-stone-300 font-serif text-sm sm:text-base leading-relaxed">
              Read full in-app Public Domain Catholic Bibles (<span className="text-amber-200 font-semibold">Douay-Rheims</span>,{' '}
              <span className="text-amber-200 font-semibold">Catholic Public Domain Version</span>,{' '}
              <span className="text-amber-200 font-semibold">WEB Catholic Edition</span>, and{' '}
              <span className="text-amber-200 font-semibold">Clementine Latin Vulgate</span>) or launch direct chapter links in modern Catholic translations (<span className="text-amber-200 font-semibold">NABRE</span>,{' '}
              <span className="text-amber-200 font-semibold">ESV-CE</span>,{' '}
              <span className="text-amber-200 font-semibold">RSV-CE</span>,{' '}
              <span className="text-amber-200 font-semibold">The Jerusalem Bible</span>, and{' '}
              <span className="text-amber-200 font-semibold">RSV</span>).
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setActiveViewMode('reader')}
              className={`px-4 py-2.5 rounded-xl font-cinzel text-xs font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2 border ${
                activeViewMode === 'reader'
                  ? 'bg-[#D4AF37]/25 text-[#FFD700] border-[#FFD700]/70 shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                  : 'bg-stone-900/80 text-stone-300 border-white/15 hover:border-[#D4AF37]/50 hover:text-amber-200'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>73-Book Reader</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveViewMode('modern-editions')}
              className={`px-4 py-2.5 rounded-xl font-cinzel text-xs font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2 border ${
                activeViewMode === 'modern-editions'
                  ? 'bg-[#D4AF37]/25 text-[#FFD700] border-[#FFD700]/70 shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                  : 'bg-stone-900/80 text-stone-300 border-white/15 hover:border-[#D4AF37]/50 hover:text-amber-200'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Modern Bibles (NABRE • ESV-CE • RSV-CE • JB)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveViewMode('bookmarks')}
              className={`px-3.5 py-2.5 rounded-xl font-cinzel text-xs font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-1.5 border ${
                activeViewMode === 'bookmarks'
                  ? 'bg-[#D4AF37]/25 text-[#FFD700] border-[#FFD700]/70 shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                  : 'bg-stone-900/80 text-stone-300 border-white/15 hover:border-[#D4AF37]/50 hover:text-amber-200'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Saved ({bookmarks.length})</span>
            </button>
          </div>
        </div>

        {/* Always-Accessible Modern Catholic Bibles Direct Chapter Bar */}
        <div className="relative z-10 mt-6 pt-5 border-t border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-amber-200/90 font-serif">
            <ExternalLink className="w-4 h-4 text-[#FFD700] shrink-0" />
            <span>
              Open <strong className="text-white">{selectedBook.name} {selectedChapter}</strong> directly in Modern Catholic Translations:
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {MODERN_CATHOLIC_BIBLE_EDITIONS.map((edition) => {
              const directUrl = getModernBibleChapterUrl(edition.id, selectedBook, selectedChapter);
              return (
                <a
                  key={edition.id}
                  href={directUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900/90 hover:bg-[#D4AF37]/25 border border-[#D4AF37]/40 hover:border-[#FFD700] text-xs font-cinzel font-bold text-[#FFD700] transition-all shadow-sm"
                  title={`Read ${selectedBook.name} ${selectedChapter} in ${edition.name} (${edition.providerLabel})`}
                >
                  <span>{edition.acronym}</span>
                  <ExternalLink className="w-3 h-3 opacity-80" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* MODE 1: MODERN CATHOLIC BIBLES HUB (NABRE, ESV-CE, RSV-CE, JERUSALEM BIBLE, RSV, KNOX, NOVA VULGATA) */}
      {activeViewMode === 'modern-editions' && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-stone-950/85 border border-amber-500/30 p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <h2 className="font-cinzel text-lg sm:text-xl font-bold text-[#FFD700]">
                  Modern Approved Catholic Bibles & Liturgical Editions
                </h2>
                <p className="text-xs sm:text-sm text-stone-300 font-serif mt-1">
                  Select any book and chapter below to jump directly to that passage in{' '}
                  <strong className="text-white">NABRE</strong>, <strong className="text-white">ESV-CE</strong>,{' '}
                  <strong className="text-white">RSV-CE</strong>, <strong className="text-white">The Jerusalem Bible</strong>,{' '}
                  <strong className="text-white">RSV</strong>, <strong className="text-white">Knox Bible</strong>, or the Vatican’s{' '}
                  <strong className="text-white">Nova Vulgata</strong>.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={selectedBookId}
                  onChange={(e) => handleSelectBook(CATHOLIC_BIBLE_BOOKS.find((b) => b.id === e.target.value) || selectedBook, 1)}
                  className="bg-stone-900 border border-[#D4AF37]/40 rounded-lg px-3 py-2 text-xs sm:text-sm text-stone-100 font-serif focus:outline-none focus:border-[#FFD700]"
                >
                  {CATHOLIC_BIBLE_BOOKS.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.number}. {b.name} {b.isDeuterocanonical ? '(Deuterocanon)' : ''}
                    </option>
                  ))}
                </select>
                <select
                  value={selectedChapter}
                  onChange={(e) => setSelectedChapter(Number(e.target.value))}
                  className="bg-stone-900 border border-[#D4AF37]/40 rounded-lg px-3 py-2 text-xs sm:text-sm text-stone-100 font-serif focus:outline-none focus:border-[#FFD700]"
                >
                  {Array.from({ length: selectedBook.chapters }, (_, i) => i + 1).map((ch) => (
                    <option key={ch} value={ch}>
                      Ch. {ch}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {MODERN_CATHOLIC_BIBLE_EDITIONS.map((edition) => {
                const primaryChapterUrl = getModernBibleChapterUrl(
                  edition.id,
                  selectedBook,
                  selectedChapter,
                  'primary'
                );
                const secondaryChapterUrl =
                  edition.id === 'nabre'
                    ? getModernBibleChapterUrl(edition.id, selectedBook, selectedChapter, 'biblegateway')
                    : null;

                return (
                  <div
                    key={edition.id}
                    className="rounded-xl bg-stone-900/75 border border-amber-500/25 hover:border-[#D4AF37]/60 p-5 flex flex-col justify-between gap-4 transition-all shadow-lg"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#D4AF37]/20 border border-[#D4AF37]/50 font-cinzel text-xs font-bold text-[#FFD700]">
                            {edition.acronym}
                          </span>
                          <h3 className="font-serif text-lg font-bold text-white mt-1.5">
                            {edition.name}
                          </h3>
                        </div>
                        <span className="text-[11px] font-mono text-stone-400 bg-black/40 px-2.5 py-1 rounded border border-white/10 shrink-0">
                          {edition.year}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-stone-300 font-serif leading-relaxed">
                        {edition.description}
                      </p>

                      <div className="space-y-1 pt-1 text-xs text-stone-400 border-t border-white/10">
                        <div>
                          <span className="text-amber-300/90 font-semibold">Ecclesiastical Authority:</span>{' '}
                          {edition.authority}
                        </div>
                        <div>
                          <span className="text-amber-300/90 font-semibold">Liturgical & Study Use:</span>{' '}
                          {edition.liturgicalUse}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-2">
                      <a
                        href={primaryChapterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-[#D4AF37]/25 hover:bg-[#D4AF37]/35 border border-[#FFD700]/60 text-xs font-cinzel font-bold text-[#FFD700] transition-all"
                      >
                        <span>
                          Read {selectedBook.name} {selectedChapter} ({edition.acronym})
                        </span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>

                      {secondaryChapterUrl && (
                        <a
                          href={secondaryChapterUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 border border-white/15 text-xs font-serif text-stone-200 transition-all"
                          title="Open NABRE on BibleGateway"
                        >
                          <span>BibleGateway</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}

                      <a
                        href={edition.homeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-black/40 hover:bg-white/10 border border-white/15 text-xs font-serif text-stone-300 hover:text-white transition-all"
                      >
                        <span>Index</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: SAVED BOOKMARKS */}
      {activeViewMode === 'bookmarks' && (
        <div className="rounded-2xl bg-stone-950/85 border border-amber-500/30 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h2 className="font-cinzel text-lg font-bold text-[#FFD700]">
                Saved Catholic Scripture Bookmarks
              </h2>
              <p className="text-xs text-stone-400 font-serif">
                Click any verse below to open its full chapter in the 73-Book Catholic Bible Reader.
              </p>
            </div>
          </div>

          {bookmarks.length === 0 ? (
            <div className="py-12 text-center space-y-2 text-stone-400 font-serif">
              <Bookmark className="w-8 h-8 mx-auto text-amber-400/50" />
              <p>No verses bookmarked yet. Click the bookmark icon beside any verse while reading.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {bookmarks.map((bm) => (
                <div
                  key={bm.id}
                  className="p-4 rounded-xl bg-stone-900/80 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-cinzel text-xs font-bold text-[#FFD700]">
                        {bm.bookName} {bm.chapter}:{bm.verse}
                      </span>
                      <span className="text-[11px] uppercase px-2 py-0.5 rounded bg-amber-500/15 text-amber-200 border border-amber-500/30">
                        {bm.translation.toUpperCase()}
                      </span>
                      <span className="text-[11px] text-stone-500">{bm.savedAt}</span>
                    </div>
                    <p className="text-sm text-stone-200 font-serif italic">“{bm.text}”</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        const targetBook = CATHOLIC_BIBLE_BOOKS.find((b) => b.id === bm.bookId);
                        if (targetBook) {
                          setSelectedBookId(targetBook.id);
                          setSelectedChapter(bm.chapter);
                          setPrimaryTranslation(bm.translation);
                          setActiveViewMode('reader');
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 border border-[#D4AF37]/50 text-xs font-cinzel text-[#FFD700] cursor-pointer"
                    >
                      Open Chapter
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const updated = bookmarks.filter((x) => x.id !== bm.id);
                        setBookmarks(updated);
                        localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(updated));
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/50 border border-red-500/30 text-xs text-red-200 cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* MODE 3: FULL IN-APP 73-BOOK CATHOLIC BIBLE READER */}
      {activeViewMode === 'reader' && (
        <div className="space-y-6">
          {/* Featured Key Catholic & Deuterocanonical Passages Strip */}
          <div className="rounded-xl bg-stone-950/80 border border-amber-500/25 p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-cinzel uppercase tracking-wider text-[#FFD700] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Key Catholic & Deuterocanonical Chapters</span>
              </span>
              <span className="text-[11px] text-stone-400 font-serif">
                Instant Multi-Version Access (DRC • CPDV • WEB-CE • Latin Vulgate)
              </span>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              {FEATURED_CATHOLIC_PASSAGES.map((fp) => {
                const isCurrent = selectedBook.id === fp.bookId && selectedChapter === fp.chapter;
                return (
                  <button
                    key={`${fp.bookId}-${fp.chapter}`}
                    type="button"
                    onClick={() => {
                      const b = CATHOLIC_BIBLE_BOOKS.find((x) => x.id === fp.bookId);
                      if (b) handleSelectBook(b, fp.chapter);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-serif whitespace-nowrap transition-all cursor-pointer border flex items-center gap-1.5 shrink-0 ${
                      isCurrent
                        ? 'bg-[#D4AF37]/30 border-[#FFD700] text-[#FFD700] font-bold shadow-sm'
                        : 'bg-stone-900/90 border-white/10 text-stone-300 hover:border-[#D4AF37]/50 hover:text-amber-200'
                    }`}
                    title={fp.description}
                  >
                    <span>{fp.label}</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/50 text-amber-300/90">
                      {fp.tag}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Translation Selector & Parallel Mode Controls */}
          <div className="rounded-2xl bg-stone-950/85 border border-amber-500/30 p-5 space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
              {/* Primary In-App Catholic Translation */}
              <div className="lg:col-span-5 space-y-1">
                <label className="block text-[11px] font-cinzel uppercase tracking-wider text-amber-300/90">
                  In-App Catholic Bible Translation
                </label>
                <select
                  value={primaryTranslation}
                  onChange={(e) => setPrimaryTranslation(e.target.value as CatholicBibleTranslationId)}
                  className="w-full bg-stone-900 border border-[#D4AF37]/45 rounded-xl px-3.5 py-2.5 text-sm text-white font-serif focus:outline-none focus:border-[#FFD700]"
                >
                  {CATHOLIC_BIBLE_TRANSLATIONS.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.year})
                    </option>
                  ))}
                </select>
              </div>

              {/* Parallel Side-by-Side Toggle + Second Translation */}
              <div className="lg:col-span-4 space-y-1">
                <label className="block text-[11px] font-cinzel uppercase tracking-wider text-amber-300/90">
                  Parallel Comparison Edition
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsParallelMode((prev) => !prev)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-cinzel font-bold uppercase tracking-wider border transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                      isParallelMode
                        ? 'bg-[#D4AF37]/25 border-[#FFD700] text-[#FFD700]'
                        : 'bg-stone-900 border-white/15 text-stone-300 hover:border-[#D4AF37]/40'
                    }`}
                  >
                    <Columns className="w-3.5 h-3.5" />
                    <span>{isParallelMode ? 'Parallel On' : 'Side-by-Side'}</span>
                  </button>

                  {isParallelMode && (
                    <select
                      value={parallelTranslation}
                      onChange={(e) => setParallelTranslation(e.target.value as CatholicBibleTranslationId)}
                      className="flex-1 min-w-0 bg-stone-900 border border-[#D4AF37]/45 rounded-xl px-3 py-2.5 text-xs sm:text-sm text-white font-serif focus:outline-none focus:border-[#FFD700]"
                    >
                      {CATHOLIC_BIBLE_TRANSLATIONS.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.shortName}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>

              {/* Reader Utility Buttons (Haydock Commentary, Audio Narration, Font Size) */}
              <div className="lg:col-span-3 flex flex-wrap items-center justify-end gap-2 pt-2 lg:pt-5">
                <button
                  type="button"
                  onClick={() => setShowHaydockNotes((p) => !p)}
                  className={`px-3 py-2 rounded-xl text-xs font-serif border transition-all cursor-pointer flex items-center gap-1.5 ${
                    showHaydockNotes
                      ? 'bg-amber-500/20 border-amber-400/60 text-amber-200'
                      : 'bg-stone-900 border-white/10 text-stone-400 hover:text-stone-200'
                  }`}
                  title="Toggle Challoner & Haydock Catholic Commentary Footnotes"
                >
                  <ScrollText className="w-3.5 h-3.5" />
                  <span>Notes</span>
                </button>

                <button
                  type="button"
                  onClick={handleToggleAudioRead}
                  className={`px-3 py-2 rounded-xl text-xs font-serif border transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSpeaking
                      ? 'bg-amber-500/30 border-[#FFD700] text-[#FFD700]'
                      : 'bg-stone-900 border-white/10 text-stone-300 hover:text-amber-200'
                  }`}
                  title="Listen to this chapter read aloud"
                >
                  {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span>{isSpeaking ? 'Stop' : 'Listen'}</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setFontSizeLevel((prev) => (prev === 'sm' ? 'md' : prev === 'md' ? 'lg' : 'sm'))
                  }
                  className="px-2.5 py-2 rounded-xl bg-stone-900 border border-white/10 text-stone-300 hover:text-amber-200 text-xs font-serif cursor-pointer flex items-center gap-1"
                  title="Cycle Scripture Font Size"
                >
                  <Type className="w-3.5 h-3.5" />
                  <span className="uppercase">{fontSizeLevel}</span>
                </button>
              </div>
            </div>

            {/* Translation Imprimatur / Provenance Banner */}
            <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-stone-400 font-serif">
              <div>
                <strong className="text-amber-200">{activePrimaryTranslationMeta.name}:</strong>{' '}
                {activePrimaryTranslationMeta.imprimaturNote}
              </div>
              <span className="px-2.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-[11px] shrink-0">
                {activePrimaryTranslationMeta.copyrightStatus}
              </span>
            </div>
          </div>

          {/* Main Reader Grid: Left 73-Book Canon Navigator + Right Chapter Scripture Reader */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Sidebar: 73 Catholic Books Navigator */}
            <div className="lg:col-span-4 rounded-2xl bg-stone-950/85 border border-amber-500/25 p-4 space-y-3.5">
              <div className="flex items-center justify-between">
                <h2 className="font-cinzel text-sm font-bold text-[#FFD700] tracking-wider uppercase">
                  73 Books of the Bible
                </h2>
                <span className="text-[11px] text-stone-400 font-serif">
                  {filteredBooks.length} shown
                </span>
              </div>

              {/* Search Books */}
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={bookSearchQuery}
                  onChange={(e) => setBookSearchQuery(e.target.value)}
                  placeholder="Search 73 books (e.g., Tobit, Sirach, John)..."
                  className="w-full bg-stone-900/90 border border-white/15 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              {/* Testament & Deuterocanon Filter Tabs */}
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { id: 'ALL', label: 'All (73)' },
                  { id: 'OT', label: 'OT (46)' },
                  { id: 'NT', label: 'NT (27)' },
                  { id: 'DEUTERO', label: 'Deutero (7)' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTestamentFilter(tab.id as any)}
                    className={`py-1.5 px-2 rounded-lg text-[11px] font-cinzel font-bold transition-all cursor-pointer border ${
                      activeTestamentFilter === tab.id
                        ? 'bg-[#D4AF37]/25 border-[#FFD700] text-[#FFD700]'
                        : 'bg-stone-900/70 border-white/10 text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Section Filter Dropdown */}
              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <select
                  value={activeSectionFilter}
                  onChange={(e) => setActiveSectionFilter(e.target.value as any)}
                  className="w-full bg-stone-900 border border-white/15 rounded-lg px-2.5 py-1.5 text-xs text-stone-200 font-serif focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value="ALL">All Liturgical Sections</option>
                  <option value="Pentateuch">Pentateuch / Law (5)</option>
                  <option value="Historical">Historical Books (16)</option>
                  <option value="Wisdom">Wisdom & Poetry (7)</option>
                  <option value="Prophets">Major & Minor Prophets (18)</option>
                  <option value="Gospels & Acts">Holy Gospels & Acts (5)</option>
                  <option value="Epistles & Apocalypse">Epistles & Apocalypse (22)</option>
                </select>
              </div>

              {/* Scrollable Book List */}
              <div className="max-h-[460px] overflow-y-auto space-y-1 pr-1">
                {filteredBooks.map((book) => {
                  const isSelected = book.id === selectedBook.id;
                  return (
                    <button
                      key={book.id}
                      type="button"
                      onClick={() => handleSelectBook(book, 1)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-2 border ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#C89F72]/35 to-[#B88B5E]/25 border-[#FFD700]/65 text-white shadow-md'
                          : 'bg-stone-900/50 hover:bg-stone-900 border-transparent hover:border-amber-500/30 text-stone-300'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[11px] font-mono text-amber-400/80">
                            {book.number}.
                          </span>
                          <span className="font-serif font-semibold text-sm truncate">
                            {book.name}
                          </span>
                          {book.isDeuterocanonical && (
                            <span className="text-[9px] font-cinzel uppercase px-1.5 py-0.5 rounded bg-amber-500/20 text-[#FFD700] border border-amber-400/40">
                              Deutero
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-stone-400 font-serif truncate">
                          {book.traditionalName !== book.name ? `${book.traditionalName} • ` : ''}
                          <span className="italic">{book.latinName}</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-mono text-stone-400 bg-black/40 px-2 py-0.5 rounded shrink-0">
                        {book.chapters} ch
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Area: Chapter Selector & Full Scripture Text */}
            <div className="lg:col-span-8 space-y-4">
              {/* Book Introduction & Chapter Grid Card */}
              <div className="rounded-2xl bg-stone-950/85 border border-amber-500/30 p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-white/10 pb-4">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded bg-amber-500/15 border border-amber-500/40 text-amber-200 text-[11px] font-cinzel uppercase">
                        {selectedBook.testament === 'OT' ? 'Old Testament' : 'New Testament'} • {selectedBook.section}
                      </span>
                      {selectedBook.isDeuterocanonical && (
                        <span className="px-2.5 py-0.5 rounded bg-[#D4AF37]/25 border border-[#FFD700]/60 text-[#FFD700] text-[11px] font-cinzel uppercase font-bold">
                          Deuterocanonical Book
                        </span>
                      )}
                    </div>
                    <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white pt-1">
                      {selectedBook.traditionalName}{' '}
                      <span className="text-[#FFD700]">— Chapter {selectedChapter}</span>
                    </h2>
                    <p className="text-xs text-stone-400 font-serif italic">
                      {selectedBook.latinName} • Theme: {selectedBook.keyTheme}
                    </p>
                  </div>

                  {/* Prev / Next Chapter Buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handlePrevChapter}
                      className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-white/15 text-stone-200 hover:text-[#FFD700] cursor-pointer transition-colors"
                      title="Previous Chapter"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-cinzel font-bold text-amber-200 px-2">
                      Ch. {selectedChapter} / {selectedBook.chapters}
                    </span>
                    <button
                      type="button"
                      onClick={handleNextChapter}
                      className="p-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-white/15 text-stone-200 hover:text-[#FFD700] cursor-pointer transition-colors"
                      title="Next Chapter"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Catholic Book Introduction */}
                <p className="text-xs sm:text-sm text-stone-300 font-serif leading-relaxed">
                  {selectedBook.summary}
                </p>

                {/* Chapter Number Pills */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-cinzel uppercase tracking-wider text-stone-400">
                    Select Chapter ({selectedBook.chapters} Chapters):
                  </span>
                  <div className="flex flex-wrap gap-1.5 max-h-28 overflow-y-auto pr-1">
                    {Array.from({ length: selectedBook.chapters }, (_, i) => i + 1).map((chNum) => (
                      <button
                        key={chNum}
                        type="button"
                        onClick={() => setSelectedChapter(chNum)}
                        className={`w-8 h-8 rounded-lg text-xs font-mono transition-all cursor-pointer border flex items-center justify-center ${
                          chNum === selectedChapter
                            ? 'bg-[#D4AF37]/30 border-[#FFD700] text-[#FFD700] font-bold shadow-sm'
                            : 'bg-stone-900/80 border-white/10 text-stone-300 hover:border-amber-500/40 hover:text-amber-200'
                        }`}
                      >
                        {chNum}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Scripture Verses Card */}
              <div className="rounded-2xl bg-stone-950/90 border border-amber-500/30 p-5 sm:p-7 space-y-5 shadow-2xl">
                {/* Chapter Toolbar: Filter Verses & Copy Chapter */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div className="relative flex-1 max-w-xs">
                    <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={verseFilterQuery}
                      onChange={(e) => setVerseFilterQuery(e.target.value)}
                      placeholder="Filter verses in this chapter..."
                      className="w-full bg-stone-900 border border-white/15 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-stone-400 font-serif hidden sm:inline">
                      Source: {sourceLabel}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyWholeChapter}
                      className="px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 border border-white/15 text-xs font-serif text-stone-200 hover:text-[#FFD700] flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedKey === 'whole-chapter' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-300">Chapter Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Chapter</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Verses Display (Single or Side-by-Side Parallel) */}
                {isLoadingChapter ? (
                  <div className="py-16 text-center space-y-3">
                    <div className="w-8 h-8 rounded-full border-2 border-[#FFD700] border-t-transparent animate-spin mx-auto" />
                    <p className="text-sm font-serif text-amber-200">
                      Loading {selectedBook.traditionalName} Chapter {selectedChapter}...
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {isParallelMode && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-2 border-b border-amber-500/20 text-xs font-cinzel uppercase tracking-wider text-[#FFD700]">
                        <div>{activePrimaryTranslationMeta.name}</div>
                        <div>{activeParallelTranslationMeta.name}</div>
                      </div>
                    )}

                    {displayedPrimaryVerses.map((vObj) => {
                      const bookmarkId = `${selectedBook.id}:${selectedChapter}:${vObj.verse}:${primaryTranslation}`;
                      const isBookmarked = bookmarks.some((b) => b.id === bookmarkId);
                      const parallelVerse = secondaryVerses.find((sv) => sv.verse === vObj.verse);
                      const verseCopyKey = `v-${vObj.verse}`;

                      return (
                        <div
                          key={vObj.verse}
                          className="group rounded-xl p-3 hover:bg-white/[0.03] border border-transparent hover:border-amber-500/20 transition-all"
                        >
                          <div
                            className={
                              isParallelMode
                                ? 'grid grid-cols-1 md:grid-cols-2 gap-4 items-start'
                                : 'flex items-start justify-between gap-3'
                            }
                          >
                            {/* Primary Translation Verse */}
                            <div className={`font-serif text-stone-100 ${fontSizeClass} flex-1`}>
                              <span className="inline-block font-cinzel font-bold text-xs text-[#FFD700] mr-2 select-none">
                                {vObj.verse}
                              </span>
                              <span>{vObj.text}</span>
                            </div>

                            {/* Parallel Second Translation Verse */}
                            {isParallelMode && (
                              <div
                                className={`font-serif text-amber-100/90 italic ${fontSizeClass} md:border-l md:border-white/10 md:pl-4`}
                              >
                                <span className="inline-block font-cinzel font-bold text-xs text-amber-400 mr-2 select-none">
                                  {vObj.verse}
                                </span>
                                <span>
                                  {parallelVerse ? parallelVerse.text : '—'}
                                </span>
                              </div>
                            )}

                            {/* Verse Action Icons */}
                            <div className="flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-opacity shrink-0">
                              <button
                                type="button"
                                onClick={() => toggleBookmark(vObj)}
                                className="p-1.5 rounded-lg hover:bg-white/10 text-stone-400 hover:text-[#FFD700] cursor-pointer"
                                title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Verse'}
                              >
                                {isBookmarked ? (
                                  <BookmarkCheck className="w-4 h-4 text-[#FFD700]" />
                                ) : (
                                  <Bookmark className="w-4 h-4" />
                                )}
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  handleCopyText(
                                    `${selectedBook.name} ${selectedChapter}:${vObj.verse} (${activePrimaryTranslationMeta.shortName}) — "${vObj.text}"`,
                                    verseCopyKey
                                  )
                                }
                                className="p-1.5 rounded-lg hover:bg-white/10 text-stone-400 hover:text-[#FFD700] cursor-pointer"
                                title="Copy Verse"
                              >
                                {copiedKey === verseCopyKey ? (
                                  <Check className="w-4 h-4 text-emerald-400" />
                                ) : (
                                  <Copy className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Haydock & Challoner Catholic Commentary Notes */}
                {showHaydockNotes && currentHaydockNotes.length > 0 && (
                  <div className="mt-6 pt-5 border-t border-amber-500/30 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-cinzel font-bold uppercase tracking-wider text-[#FFD700]">
                      <ScrollText className="w-4 h-4" />
                      <span>Bishop Challoner & Haydock Catholic Bible Annotations</span>
                    </div>
                    <div className="space-y-2.5">
                      {currentHaydockNotes.map((hn) => (
                        <div
                          key={hn.verse}
                          className="p-3.5 rounded-xl bg-amber-950/25 border border-amber-500/30 text-xs sm:text-sm font-serif text-stone-200 leading-relaxed"
                        >
                          <span className="font-cinzel font-bold text-[#FFD700] mr-2">
                            Ver. {hn.verse}.
                          </span>
                          <span>{hn.note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bottom Chapter Navigation Bar */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handlePrevChapter}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-white/15 text-xs font-cinzel font-bold text-stone-200 hover:text-[#FFD700] cursor-pointer transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous Chapter</span>
                  </button>

                  <span className="text-xs font-serif text-stone-400">
                    {selectedBook.traditionalName} {selectedChapter}
                  </span>

                  <button
                    type="button"
                    onClick={handleNextChapter}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 border border-white/15 text-xs font-cinzel font-bold text-stone-200 hover:text-[#FFD700] cursor-pointer transition-all"
                  >
                    <span>Next Chapter</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
