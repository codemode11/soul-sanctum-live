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
    <div className="max-w-5xl mx-auto p-3 sm:p-6 md:p-8 rounded-xl bg-white/45 backdrop-blur-xl backdrop-saturate-150 border border-white/60 ring-1 ring-inset ring-white/40 shadow-[0_8px_32px_0_rgba(120,90,50,0.12)] space-y-6 mb-12 text-stone-900">
      {/* Light Parchment Header Card */}
      <div className="rounded-xl bg-[#FAF4EB] border border-[#E2D5C3] p-5 sm:p-7 shadow-xs space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/90 border border-amber-700/30 text-amber-900 text-xs font-cinzel font-bold tracking-wider uppercase">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-800" />
              <span>73-Book Canon of the Council of Trent</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 tracking-normal">
              Catholic Bibles
            </h1>
            <p className="text-stone-700 font-serif text-sm sm:text-base leading-relaxed">
              Read full in-app Public Domain Catholic Bibles (<span className="text-amber-900 font-semibold">Douay-Rheims</span>,{' '}
              <span className="text-amber-900 font-semibold">Catholic Public Domain Version</span>,{' '}
              <span className="text-amber-900 font-semibold">WEB Catholic Edition</span>, and{' '}
              <span className="text-amber-900 font-semibold">Clementine Latin Vulgate</span>) or launch direct chapter links in modern Catholic translations (<span className="text-amber-900 font-semibold">NABRE</span>,{' '}
              <span className="text-amber-900 font-semibold">ESV-CE</span>,{' '}
              <span className="text-amber-900 font-semibold">RSV-CE</span>,{' '}
              <span className="text-amber-900 font-semibold">The Jerusalem Bible</span>, and{' '}
              <span className="text-amber-900 font-semibold">RSV</span>).
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setActiveViewMode('reader')}
              className={`px-4 py-2.5 rounded-xl font-cinzel text-xs font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2 border ${
                activeViewMode === 'reader'
                  ? 'bg-amber-900 text-amber-50 border-amber-950 shadow-sm'
                  : 'bg-white text-stone-700 border-[#D8C7B2] hover:border-amber-800/50 hover:text-amber-950'
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
                  ? 'bg-amber-900 text-amber-50 border-amber-950 shadow-sm'
                  : 'bg-white text-stone-700 border-[#D8C7B2] hover:border-amber-800/50 hover:text-amber-950'
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
                  ? 'bg-amber-900 text-amber-50 border-amber-950 shadow-sm'
                  : 'bg-white text-stone-700 border-[#D8C7B2] hover:border-amber-800/50 hover:text-amber-950'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Saved ({bookmarks.length})</span>
            </button>
          </div>
        </div>

        {/* Always-Accessible Modern Catholic Bibles Direct Chapter Bar */}
        <div className="pt-4 border-t border-[#E2D5C3] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-stone-700 font-serif">
            <ExternalLink className="w-4 h-4 text-amber-800 shrink-0" />
            <span>
              Open <strong className="text-amber-950">{selectedBook.name} {selectedChapter}</strong> directly in Modern Catholic Translations:
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
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-amber-50 border border-[#D8C7B2] hover:border-amber-800 text-xs font-cinzel font-bold text-amber-900 transition-all shadow-2xs"
                  title={`Read ${selectedBook.name} ${selectedChapter} in ${edition.name} (${edition.providerLabel})`}
                >
                  <span>{edition.acronym}</span>
                  <ExternalLink className="w-3 h-3 text-amber-800" />
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* MODE 1: MODERN CATHOLIC BIBLES HUB (NABRE, ESV-CE, RSV-CE, JERUSALEM BIBLE, RSV, KNOX, NOVA VULGATA) */}
      {activeViewMode === 'modern-editions' && (
        <div className="space-y-6">
          <div className="rounded-xl bg-white/95 border border-[#E2D5C3] p-5 sm:p-6 space-y-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
              <div>
                <h2 className="font-cinzel text-lg sm:text-xl font-bold text-amber-950">
                  Modern Approved Catholic Bibles &amp; Liturgical Editions
                </h2>
                <p className="text-xs sm:text-sm text-stone-700 font-serif mt-1">
                  Select any book and chapter below to jump directly to that passage in{' '}
                  <strong className="text-stone-900">NABRE</strong>, <strong className="text-stone-900">ESV-CE</strong>,{' '}
                  <strong className="text-stone-900">RSV-CE</strong>, <strong className="text-stone-900">The Jerusalem Bible</strong>,{' '}
                  <strong className="text-stone-900">RSV</strong>, <strong className="text-stone-900">Knox Bible</strong>, or the Vatican’s{' '}
                  <strong className="text-stone-900">Nova Vulgata</strong>.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={selectedBookId}
                  onChange={(e) => handleSelectBook(CATHOLIC_BIBLE_BOOKS.find((b) => b.id === e.target.value) || selectedBook, 1)}
                  className="bg-[#FAF4EB] border border-[#D8C7B2] rounded-lg px-3 py-2 text-xs sm:text-sm text-stone-900 font-serif focus:outline-none focus:border-amber-800"
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
                  className="bg-[#FAF4EB] border border-[#D8C7B2] rounded-lg px-3 py-2 text-xs sm:text-sm text-stone-900 font-serif focus:outline-none focus:border-amber-800"
                >
                  {Array.from({ length: selectedBook.chapters }, (_, i) => i + 1).map((ch) => (
                    <option key={ch} value={ch}>
                      Ch. {ch}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
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
                    className="rounded-xl bg-[#FAF4EB] border border-[#E2D5C3] hover:border-amber-800/60 p-5 flex flex-col justify-between gap-4 transition-all shadow-2xs"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="inline-block px-2.5 py-0.5 rounded-md bg-amber-100 border border-amber-700/40 font-cinzel text-xs font-bold text-amber-950">
                            {edition.acronym}
                          </span>
                          <h3 className="font-serif text-lg font-bold text-stone-900 mt-1.5">
                            {edition.name}
                          </h3>
                        </div>
                        <span className="text-[11px] font-mono text-stone-600 bg-white px-2.5 py-1 rounded border border-[#E2D5C3] shrink-0">
                          {edition.year}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-stone-700 font-serif leading-relaxed">
                        {edition.description}
                      </p>

                      <div className="space-y-1 pt-2 text-xs text-stone-600 border-t border-[#E2D5C3]">
                        <div>
                          <span className="text-amber-950 font-semibold">Ecclesiastical Authority:</span>{' '}
                          {edition.authority}
                        </div>
                        <div>
                          <span className="text-amber-950 font-semibold">Liturgical &amp; Study Use:</span>{' '}
                          {edition.liturgicalUse}
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#E2D5C3] flex flex-wrap items-center gap-2">
                      <a
                        href={primaryChapterUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg bg-amber-900 hover:bg-amber-800 text-xs font-cinzel font-bold text-amber-50 transition-all shadow-2xs"
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
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white hover:bg-amber-50 border border-[#D8C7B2] text-xs font-serif text-stone-800 transition-all"
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
                        className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-white hover:bg-amber-50 border border-[#D8C7B2] text-xs font-serif text-stone-700 hover:text-amber-950 transition-all"
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
        <div className="rounded-xl bg-white/95 border border-[#E2D5C3] p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div>
              <h2 className="font-cinzel text-lg font-bold text-amber-950">
                Saved Catholic Scripture Bookmarks
              </h2>
              <p className="text-xs text-stone-600 font-serif">
                Click any verse below to open its full chapter in the 73-Book Catholic Bible Reader.
              </p>
            </div>
          </div>

          {bookmarks.length === 0 ? (
            <div className="py-12 text-center space-y-2 text-stone-600 font-serif">
              <Bookmark className="w-8 h-8 mx-auto text-amber-800/60" />
              <p>No verses bookmarked yet. Click the bookmark icon beside any verse while reading.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {bookmarks.map((bm) => (
                <div
                  key={bm.id}
                  className="p-4 rounded-xl bg-[#FAF4EB] border border-[#E2D5C3] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-cinzel text-xs font-bold text-amber-950">
                        {bm.bookName} {bm.chapter}:{bm.verse}
                      </span>
                      <span className="text-[11px] uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-700/30 font-semibold">
                        {bm.translation.toUpperCase()}
                      </span>
                      <span className="text-[11px] text-stone-500">{bm.savedAt}</span>
                    </div>
                    <p className="text-sm text-stone-800 font-serif italic">“{bm.text}”</p>
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
                      className="px-3 py-1.5 rounded-lg bg-amber-900 hover:bg-amber-800 text-xs font-cinzel font-bold text-amber-50 cursor-pointer"
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
                      className="px-2.5 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 border border-red-300 text-xs text-red-800 cursor-pointer"
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
          <div className="rounded-xl bg-white/95 border border-[#E2D5C3] p-4 space-y-2.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-cinzel font-bold uppercase tracking-wider text-amber-950 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-800" />
                <span>Key Catholic &amp; Deuterocanonical Chapters</span>
              </span>
              <span className="text-[11px] text-stone-600 font-serif">
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
                        ? 'bg-amber-900 border-amber-950 text-amber-50 font-bold shadow-2xs'
                        : 'bg-[#FAF4EB] border-[#E2D5C3] text-stone-800 hover:border-amber-800/50 hover:bg-amber-50/70'
                    }`}
                    title={fp.description}
                  >
                    <span>{fp.label}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded ${
                        isCurrent
                          ? 'bg-amber-800 text-amber-100'
                          : 'bg-amber-100/90 text-amber-900'
                      }`}
                    >
                      {fp.tag}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Translation Selector & Parallel Mode Controls */}
          <div className="rounded-xl bg-[#FAF4EB] border border-[#E2D5C3] p-5 space-y-4 shadow-2xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
              {/* Primary In-App Catholic Translation */}
              <div className="lg:col-span-5 space-y-1">
                <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-amber-950">
                  In-App Catholic Bible Translation
                </label>
                <select
                  value={primaryTranslation}
                  onChange={(e) => setPrimaryTranslation(e.target.value as CatholicBibleTranslationId)}
                  className="w-full bg-white border border-[#D8C7B2] rounded-xl px-3.5 py-2.5 text-sm text-stone-900 font-serif focus:outline-none focus:border-amber-800"
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
                <label className="block text-[11px] font-cinzel font-bold uppercase tracking-wider text-amber-950">
                  Parallel Comparison Edition
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsParallelMode((prev) => !prev)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-cinzel font-bold uppercase tracking-wider border transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                      isParallelMode
                        ? 'bg-amber-900 border-amber-950 text-amber-50'
                        : 'bg-white border-[#D8C7B2] text-stone-800 hover:border-amber-800/50'
                    }`}
                  >
                    <Columns className="w-3.5 h-3.5" />
                    <span>{isParallelMode ? 'Parallel On' : 'Side-by-Side'}</span>
                  </button>

                  {isParallelMode && (
                    <select
                      value={parallelTranslation}
                      onChange={(e) => setParallelTranslation(e.target.value as CatholicBibleTranslationId)}
                      className="flex-1 min-w-0 bg-white border border-[#D8C7B2] rounded-xl px-3 py-2.5 text-xs sm:text-sm text-stone-900 font-serif focus:outline-none focus:border-amber-800"
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
                  className={`px-3 py-2 rounded-xl text-xs font-serif font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                    showHaydockNotes
                      ? 'bg-amber-900 border-amber-950 text-amber-50'
                      : 'bg-white border-[#D8C7B2] text-stone-700 hover:text-stone-900'
                  }`}
                  title="Toggle Challoner & Haydock Catholic Commentary Footnotes"
                >
                  <ScrollText className="w-3.5 h-3.5" />
                  <span>Notes</span>
                </button>

                <button
                  type="button"
                  onClick={handleToggleAudioRead}
                  className={`px-3 py-2 rounded-xl text-xs font-serif font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSpeaking
                      ? 'bg-amber-900 border-amber-950 text-amber-50'
                      : 'bg-white border-[#D8C7B2] text-stone-700 hover:text-amber-950'
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
                  className="px-2.5 py-2 rounded-xl bg-white border border-[#D8C7B2] text-stone-800 hover:text-amber-950 text-xs font-serif font-semibold cursor-pointer flex items-center gap-1"
                  title="Cycle Scripture Font Size"
                >
                  <Type className="w-3.5 h-3.5" />
                  <span className="uppercase">{fontSizeLevel}</span>
                </button>
              </div>
            </div>

            {/* Translation Imprimatur / Provenance Banner */}
            <div className="pt-3 border-t border-[#E2D5C3] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-stone-700 font-serif">
              <div>
                <strong className="text-amber-950">{activePrimaryTranslationMeta.name}:</strong>{' '}
                {activePrimaryTranslationMeta.imprimaturNote}
              </div>
              <span className="px-2.5 py-0.5 rounded bg-emerald-50 border border-emerald-600/30 text-emerald-900 font-semibold text-[11px] shrink-0">
                {activePrimaryTranslationMeta.copyrightStatus}
              </span>
            </div>
          </div>

          {/* Main Reader Grid: Left 73-Book Canon Navigator + Right Chapter Scripture Reader */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Sidebar: 73 Catholic Books Navigator */}
            <div className="lg:col-span-4 rounded-xl bg-white/95 border border-[#E2D5C3] p-4 space-y-3.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <h2 className="font-cinzel text-sm font-bold text-amber-950 tracking-wider uppercase">
                  73 Books of the Bible
                </h2>
                <span className="text-[11px] text-stone-600 font-serif">
                  {filteredBooks.length} shown
                </span>
              </div>

              {/* Search Books */}
              <div className="relative">
                <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={bookSearchQuery}
                  onChange={(e) => setBookSearchQuery(e.target.value)}
                  placeholder="Search 73 books (e.g., Tobit, Sirach, John)..."
                  className="w-full bg-[#FAF4EB] border border-[#D8C7B2] rounded-xl pl-9 pr-3 py-2 text-xs text-stone-900 placeholder-stone-500 focus:outline-none focus:border-amber-800"
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
                        ? 'bg-amber-900 border-amber-950 text-amber-50'
                        : 'bg-[#FAF4EB] border-[#E2D5C3] text-stone-700 hover:text-amber-950'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Section Filter Dropdown */}
              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                <select
                  value={activeSectionFilter}
                  onChange={(e) => setActiveSectionFilter(e.target.value as any)}
                  className="w-full bg-[#FAF4EB] border border-[#D8C7B2] rounded-lg px-2.5 py-1.5 text-xs text-stone-800 font-serif focus:outline-none focus:border-amber-800"
                >
                  <option value="ALL">All Liturgical Sections</option>
                  <option value="Pentateuch">Pentateuch / Law (5)</option>
                  <option value="Historical">Historical Books (16)</option>
                  <option value="Wisdom">Wisdom &amp; Poetry (7)</option>
                  <option value="Prophets">Major &amp; Minor Prophets (18)</option>
                  <option value="Gospels & Acts">Holy Gospels &amp; Acts (5)</option>
                  <option value="Epistles & Apocalypse">Epistles &amp; Apocalypse (22)</option>
                </select>
              </div>

              {/* Scrollable Book List */}
              <div className="max-h-[460px] overflow-y-auto space-y-1.5 pr-1">
                {filteredBooks.map((book) => {
                  const isSelected = book.id === selectedBook.id;
                  return (
                    <button
                      key={book.id}
                      type="button"
                      onClick={() => handleSelectBook(book, 1)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-between gap-2 border ${
                        isSelected
                          ? 'bg-amber-900 border-amber-950 text-amber-50 shadow-xs'
                          : 'bg-[#FAF4EB]/80 hover:bg-[#FAF4EB] border-[#E2D5C3] hover:border-amber-800/50 text-stone-800'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-[11px] font-mono ${
                              isSelected ? 'text-amber-200' : 'text-amber-900 font-semibold'
                            }`}
                          >
                            {book.number}.
                          </span>
                          <span className="font-serif font-bold text-sm truncate">
                            {book.name}
                          </span>
                          {book.isDeuterocanonical && (
                            <span
                              className={`text-[9px] font-cinzel uppercase px-1.5 py-0.5 rounded border ${
                                isSelected
                                  ? 'bg-amber-800 text-amber-100 border-amber-600'
                                  : 'bg-amber-100 text-amber-950 border-amber-700/30'
                              }`}
                            >
                              Deutero
                            </span>
                          )}
                        </div>
                        <div
                          className={`text-[11px] font-serif truncate ${
                            isSelected ? 'text-amber-100/90' : 'text-stone-600'
                          }`}
                        >
                          {book.traditionalName !== book.name ? `${book.traditionalName} • ` : ''}
                          <span className="italic">{book.latinName}</span>
                        </div>
                      </div>
                      <span
                        className={`text-[11px] font-mono px-2 py-0.5 rounded shrink-0 ${
                          isSelected
                            ? 'bg-amber-950/60 text-amber-100'
                            : 'bg-white text-stone-700 border border-[#E2D5C3]'
                        }`}
                      >
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
              <div className="rounded-xl bg-[#FAF4EB] border border-[#E2D5C3] p-5 space-y-4 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#E2D5C3] pb-4">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded bg-amber-100 border border-amber-700/30 text-amber-950 text-[11px] font-cinzel font-bold uppercase">
                        {selectedBook.testament === 'OT' ? 'Old Testament' : 'New Testament'} • {selectedBook.section}
                      </span>
                      {selectedBook.isDeuterocanonical && (
                        <span className="px-2.5 py-0.5 rounded bg-amber-900 text-amber-50 text-[11px] font-cinzel uppercase font-bold">
                          Deuterocanonical Book
                        </span>
                      )}
                    </div>
                    <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 pt-1">
                      {selectedBook.traditionalName}{' '}
                      <span className="text-amber-900">— Chapter {selectedChapter}</span>
                    </h2>
                    <p className="text-xs text-stone-600 font-serif italic">
                      {selectedBook.latinName} • Theme: {selectedBook.keyTheme}
                    </p>
                  </div>

                  {/* Prev / Next Chapter Buttons */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handlePrevChapter}
                      className="p-2 rounded-xl bg-white hover:bg-amber-50 border border-[#D8C7B2] text-stone-800 hover:text-amber-950 cursor-pointer transition-colors"
                      title="Previous Chapter"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-xs font-cinzel font-bold text-amber-950 px-2">
                      Ch. {selectedChapter} / {selectedBook.chapters}
                    </span>
                    <button
                      type="button"
                      onClick={handleNextChapter}
                      className="p-2 rounded-xl bg-white hover:bg-amber-50 border border-[#D8C7B2] text-stone-800 hover:text-amber-950 cursor-pointer transition-colors"
                      title="Next Chapter"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Catholic Book Introduction */}
                <p className="text-xs sm:text-sm text-stone-800 font-serif leading-relaxed">
                  {selectedBook.summary}
                </p>

                {/* Chapter Number Pills */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-cinzel font-bold uppercase tracking-wider text-amber-950">
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
                            ? 'bg-amber-900 border-amber-950 text-amber-50 font-bold shadow-2xs'
                            : 'bg-white border-[#D8C7B2] text-stone-800 hover:border-amber-800 hover:bg-amber-50'
                        }`}
                      >
                        {chNum}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Scripture Verses Card (Clean Warm Ivory Reading Page) */}
              <div className="rounded-xl bg-white border border-[#E2D5C3] p-5 sm:p-7 space-y-5 shadow-xs">
                {/* Chapter Toolbar: Filter Verses & Copy Chapter */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
                  <div className="relative flex-1 max-w-xs">
                    <Search className="w-3.5 h-3.5 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={verseFilterQuery}
                      onChange={(e) => setVerseFilterQuery(e.target.value)}
                      placeholder="Filter verses in this chapter..."
                      className="w-full bg-[#FAF4EB] border border-[#D8C7B2] rounded-xl pl-8 pr-3 py-1.5 text-xs text-stone-900 placeholder-stone-500 focus:outline-none focus:border-amber-800"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-stone-600 font-serif hidden sm:inline">
                      Source: {sourceLabel}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyWholeChapter}
                      className="px-3 py-1.5 rounded-lg bg-[#FAF4EB] hover:bg-amber-100/70 border border-[#D8C7B2] text-xs font-serif font-semibold text-stone-800 hover:text-amber-950 flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedKey === 'whole-chapter' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-700" />
                          <span className="text-emerald-800">Chapter Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-amber-900" />
                          <span>Copy Chapter</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Verses Display (Single or Side-by-Side Parallel) */}
                {isLoadingChapter ? (
                  <div className="py-16 text-center space-y-3">
                    <div className="w-8 h-8 rounded-full border-2 border-amber-900 border-t-transparent animate-spin mx-auto" />
                    <p className="text-sm font-serif text-amber-950">
                      Loading {selectedBook.traditionalName} Chapter {selectedChapter}...
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {isParallelMode && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-2 border-b border-[#E2D5C3] text-xs font-cinzel font-bold uppercase tracking-wider text-amber-950">
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
                          className="group rounded-xl p-3 hover:bg-[#FAF4EB] border border-transparent hover:border-[#E2D5C3] transition-all"
                        >
                          <div
                            className={
                              isParallelMode
                                ? 'grid grid-cols-1 md:grid-cols-2 gap-4 items-start'
                                : 'flex items-start justify-between gap-3'
                            }
                          >
                            {/* Primary Translation Verse */}
                            <div className={`font-serif text-stone-900 ${fontSizeClass} flex-1`}>
                              <span className="inline-block font-cinzel font-bold text-xs text-amber-900 mr-2 select-none">
                                {vObj.verse}
                              </span>
                              <span>{vObj.text}</span>
                            </div>

                            {/* Parallel Second Translation Verse */}
                            {isParallelMode && (
                              <div
                                className={`font-serif text-stone-800 italic ${fontSizeClass} md:border-l md:border-[#E2D5C3] md:pl-4`}
                              >
                                <span className="inline-block font-cinzel font-bold text-xs text-amber-800 mr-2 select-none">
                                  {vObj.verse}
                                </span>
                                <span>
                                  {parallelVerse ? parallelVerse.text : '—'}
                                </span>
                              </div>
                            )}

                            {/* Verse Action Icons */}
                            <div className="flex items-center gap-1 opacity-75 group-hover:opacity-100 transition-opacity shrink-0">
                              <button
                                type="button"
                                onClick={() => toggleBookmark(vObj)}
                                className="p-1.5 rounded-lg hover:bg-amber-100/80 text-stone-500 hover:text-amber-950 cursor-pointer"
                                title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Verse'}
                              >
                                {isBookmarked ? (
                                  <BookmarkCheck className="w-4 h-4 text-amber-900" />
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
                                className="p-1.5 rounded-lg hover:bg-amber-100/80 text-stone-500 hover:text-amber-950 cursor-pointer"
                                title="Copy Verse"
                              >
                                {copiedKey === verseCopyKey ? (
                                  <Check className="w-4 h-4 text-emerald-700" />
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
                  <div className="mt-6 pt-5 border-t border-[#E2D5C3] space-y-3">
                    <div className="flex items-center gap-2 text-xs font-cinzel font-bold uppercase tracking-wider text-amber-950">
                      <ScrollText className="w-4 h-4 text-amber-800" />
                      <span>Bishop Challoner &amp; Haydock Catholic Bible Annotations</span>
                    </div>
                    <div className="space-y-2.5">
                      {currentHaydockNotes.map((hn) => (
                        <div
                          key={hn.verse}
                          className="p-3.5 rounded-xl bg-[#FAF4EB] border border-[#E2D5C3] text-xs sm:text-sm font-serif text-stone-800 leading-relaxed"
                        >
                          <span className="font-cinzel font-bold text-amber-950 mr-2">
                            Ver. {hn.verse}.
                          </span>
                          <span>{hn.note}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bottom Chapter Navigation Bar */}
                <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handlePrevChapter}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF4EB] hover:bg-amber-100/80 border border-[#D8C7B2] text-xs font-cinzel font-bold text-amber-950 cursor-pointer transition-all"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous Chapter</span>
                  </button>

                  <span className="text-xs font-serif font-semibold text-stone-700">
                    {selectedBook.traditionalName} {selectedChapter}
                  </span>

                  <button
                    type="button"
                    onClick={handleNextChapter}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FAF4EB] hover:bg-amber-100/80 border border-[#D8C7B2] text-xs font-cinzel font-bold text-amber-950 cursor-pointer transition-all"
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
