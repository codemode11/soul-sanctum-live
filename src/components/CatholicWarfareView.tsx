import React, { useState, useEffect, useMemo } from 'react';
import {
  Shield,
  Sword,
  BookOpen,
  Flame,
  Scale,
  Check,
  Copy,
  Volume2,
  VolumeX,
  RotateCcw,
  AlertTriangle,
  ScrollText,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  Search,
  X,
  Users,
  Heart,
  BookMarked,
} from 'lucide-react';
import {
  ARMOR_OF_GOD_PIECES,
  WARFARE_PRAYERS,
  SEVEN_DEADLY_SINS_COMBAT,
} from '../data/catholicWarfare';
import {
  WARFARE_BIBLE_PASSAGES,
  FAUSTINA_SECRETS_INTRO,
  FAUSTINA_25_SECRETS,
  FAUSTINA_COPYRIGHT,
  SAINTS_WARFARE_QUOTES,
  PADRE_PIO_WARFARE_QUOTES,
  LAITY_DELIVERANCE_GUIDELINES,
  FR_RIPPERGER_QUOTE,
  COMPENDIUM_PRAYERS,
  ST_BENEDICT_MEDAL_SECTIONS,
  HOLY_WATER_DEVOTION_QUOTE,
  PATRON_SAINTS_INTRO,
  PATRON_LONG_INVOCATION,
  PATRON_SHORT_INVOCATION,
  PRIMARY_WARFARE_PATRONS,
  ADDITIONAL_WARFARE_PATRONS,
  SEVEN_PRINCIPLES_INTRO,
  SEVEN_PRINCIPLES_GORING,
  SEVEN_PRINCIPLES_RECAP,
  TWELVE_PRINCIPLES_INTRO,
  TWELVE_PRINCIPLES_WARFARE,
  WARFARE_ESSAYS,
  EXORCIST_DIARY_ENTRIES,
} from '../data/catholicWarfareCompendium';
import { SacredReader } from '../utils/speech';
import { toCurvedQuotes } from '../utils/typography';

const GLUED_FOOTNOTE_FIXES: [RegExp, string][] = [
  [/\bonesn\b/g, 'ones§n'],
  [/\bgospelo\b/g, 'gospel§o'],
  [/\bargumentsb\b/g, 'arguments§b'],
];

/**
 * Strips inline verse numbers, footnote letters, asterisks, trailing footnote digits,
 * and Roman section markers so the audio reader proclaims only uninterrupted Scripture.
 */
function cleanBiblePassageForSpeech(verses: string[], isSummary = false): string {
  return verses
    .map((raw) => {
      const trimmed = raw.trim();
      // Skip standalone Roman stanza labels like "I" or "II"
      if (!isSummary && /^(I|II|III|IV|V)$/.test(trimmed)) {
        return '';
      }
      let text = trimmed;
      if (isSummary) {
        return text.replace(/\s+/g, ' ').trim();
      }
      // Separate known glued NABRE footnote letters (e.g. onesn, gospelo, argumentsb)
      for (const [pattern, replacement] of GLUED_FOOTNOTE_FIXES) {
        text = text.replace(pattern, replacement);
      }
      text = text
        // Remove separated glued footnote markers
        .replace(/§[a-z]/g, '')
        // Ensure space where asterisk joined words (e.g. "Most High,*who")
        .replace(/,\*([A-Za-z])/g, ', $1')
        // Remove trailing footnote letter + trailing footnote number after punctuation (e.g. "power.n 1")
        .replace(/([.,;:!?]["”’]?)[a-z]\s+\d+(?=\s*$)/g, '$1')
        // Remove footnote letter immediately after punctuation (e.g. "devil.g", "trust.”a", "refuge;b")
        .replace(/([.,;:!?]["”’]?)[a-z](?=\s|$|\d)/g, '$1')
        // Remove trailing footnote digit immediately after punctuation (e.g. "ceases;2")
        .replace(/([.,;:!?]["”’]?)\d+(?=\s|$)/g, '$1')
        // Remove leading verse number + optional standalone footnote letter/asterisk (e.g. "28 l When", "11 * For", "2 Say")
        .replace(/^\d{1,3}\s+(?:[a-z]\s+|\*\s+)?/, '')
        // Remove inline mid-sentence verse numbers + optional standalone footnote letter/asterisk
        .replace(/(?<=\s)\d{1,3}\s+(?:(?:\*|[a-z])\s+)?(?=[A-Za-z“"‘'\[])/g, '')
        // Remove all asterisk footnote markers
        .replace(/\*/g, '')
        // Smooth bracketed textual insertions (e.g. "[the]" -> "the", "seventy[-two]" -> "seventy-two")
        .replace(/\[([^\]]+)\]/g, '$1')
        // Clean extra spaces before punctuation and collapse whitespace
        .replace(/\s+([.,;:!?])/g, '$1')
        .replace(/\s+/g, ' ')
        .trim();
      return text;
    })
    .filter(Boolean)
    .join(' ');
}

/**
 * Formats a Bible passage line visually so verse numbers and footnote letters
 * appear as clean, subtle study-Bible superscripts while fixing glued footnote markers.
 */
function renderFormattedBibleLine(line: string, isSummary = false): React.ReactNode {
  const curved = toCurvedQuotes(line);
  if (isSummary) {
    return curved;
  }

  let normalized = curved;
  for (const [pattern, replacement] of GLUED_FOOTNOTE_FIXES) {
    normalized = normalized.replace(pattern, replacement);
  }
  normalized = normalized.replace(/,\*([A-Za-z])/g, ',* $1');

  // Tokenize: glued footnote (§x), leading/inline verse numbers, post-punctuation footnote letter/digit, standalone footnote letter after verse number, or asterisk
  const tokenRegex =
    /(§[a-z])|(\*)|((?:^|(?<=\s))\d{1,3}(?=\s+(?:[a-z]\s+|\*\s+)?[A-Za-z“"‘'\[*]))|((?<=[.,;:!?][”’"]?)[a-z](?=\s|$|\d))|((?<=[.,;:!?][”’"]?)\d+(?=\s|$))|((?<=\d\s)[a-z](?=\s+[A-Z]))|((?<=\.[a-z]\s)\d+(?=\s*$))/g;

  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let keyIdx = 0;

  while ((match = tokenRegex.exec(normalized)) !== null) {
    if (match.index > lastIndex) {
      parts.push(normalized.slice(lastIndex, match.index));
    }

    const [full, gluedLetter, asterisk, verseNum, punctLetter, punctDigit, afterVerseLetter, trailingDigit] =
      match;

    if (gluedLetter) {
      parts.push(
        <sup
          key={`fn-${keyIdx++}`}
          aria-hidden="true"
          className="text-[12px] font-sans font-normal text-stone-400 ml-0.5 select-none"
        >
          {gluedLetter.slice(1)}
        </sup>
      );
    } else if (verseNum) {
      parts.push(
        <sup
          key={`vn-${keyIdx++}`}
          aria-hidden="true"
          className="text-[13px] font-sans font-bold text-[#8B261D]/85 mr-1 select-none"
        >
          {verseNum}
        </sup>
      );
    } else if (asterisk || punctLetter || punctDigit || afterVerseLetter || trailingDigit) {
      parts.push(
        <sup
          key={`mk-${keyIdx++}`}
          aria-hidden="true"
          className="text-[12px] font-sans font-normal text-stone-400 ml-0.5 select-none"
        >
          {full}
        </sup>
      );
    } else {
      parts.push(full);
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < normalized.length) {
    parts.push(normalized.slice(lastIndex));
  }

  return parts;
}

type WarfareTab =
  | 'scripture'
  | 'prayers'
  | 'faustina'
  | 'quotes'
  | 'principles'
  | 'diary';

const ARMOR_STORAGE_PREFIX = 'sanctum_catholic_warfare_armor_v1_';

function getTodayKey(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${ARMOR_STORAGE_PREFIX}${y}-${m}-${d}`;
}

export const CatholicWarfareView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<WarfareTab>('scripture');

  // Sub-views inside sections
  const [scriptureSubTab, setScriptureSubTab] = useState<'passages' | 'armor'>('passages');
  const [prayersSubTab, setPrayersSubTab] = useState<'deliverance' | 'benedict'>('deliverance');
  const [quotesSubTab, setQuotesSubTab] = useState<'saints' | 'padre-pio' | 'patrons'>('saints');
  const [principlesSubTab, setPrinciplesSubTab] = useState<
    'seven' | 'twelve' | 'essays' | 'vices'
  >('seven');

  // Interactive selections
  const [selectedArmorId, setSelectedArmorId] = useState<string>(ARMOR_OF_GOD_PIECES[0].id);
  const [selectedViceId, setSelectedViceId] = useState<string>(SEVEN_DEADLY_SINS_COMBAT[0].id);
  const [selectedEssayId, setSelectedEssayId] = useState<string>(WARFARE_ESSAYS[0].id);
  const [selectedDiaryId, setSelectedDiaryId] = useState<string>(EXORCIST_DIARY_ENTRIES[0].id);
  const [expandedNotes, setExpandedNotes] = useState<Record<string, boolean>>({});
  const [expandedHistory, setExpandedHistory] = useState<Record<string, boolean>>({
    'august-queen': true,
  });

  // Search, speech, clipboard
  const [searchQuery, setSearchQuery] = useState('');
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Daily Armor checklist
  const [equippedArmorIds, setEquippedArmorIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(getTodayKey());
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // Ignore storage errors
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(getTodayKey(), JSON.stringify(equippedArmorIds));
    } catch {
      // Ignore storage errors
    }
  }, [equippedArmorIds]);

  useEffect(() => {
    return () => {
      SacredReader.stop();
    };
  }, []);

  const toggleArmorEquipped = (id: string) => {
    setEquippedArmorIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleEquipAllArmor = () => {
    if (equippedArmorIds.length === ARMOR_OF_GOD_PIECES.length) {
      setEquippedArmorIds([]);
    } else {
      setEquippedArmorIds(ARMOR_OF_GOD_PIECES.map((p) => p.id));
    }
  };

  const handleSpeakText = (id: string, text: string) => {
    if (speakingId === id) {
      SacredReader.stop();
      setSpeakingId(null);
      return;
    }
    SacredReader.stop();
    setSpeakingId(id);
    SacredReader.speak(text, () => setSpeakingId(null));
  };

  const handleCopyText = (id: string, text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedId(id);
    setTimeout(() => setCopiedId((curr) => (curr === id ? null : curr)), 2200);
  };

  const q = searchQuery.trim().toLowerCase();

  // Filtered lists respecting search query
  const filteredPassages = useMemo(() => {
    if (!q) return WARFARE_BIBLE_PASSAGES;
    return WARFARE_BIBLE_PASSAGES.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.reference.toLowerCase().includes(q) ||
        p.verses.some((v) => v.toLowerCase().includes(q)) ||
        p.notes.some((n) => n.toLowerCase().includes(q))
    );
  }, [q]);

  const filteredFaustina = useMemo(() => {
    if (!q) return FAUSTINA_25_SECRETS;
    return FAUSTINA_25_SECRETS.filter(
      (s) =>
        s.jesusWords.toLowerCase().includes(q) ||
        s.commentary.toLowerCase().includes(q) ||
        String(s.number) === q
    );
  }, [q]);

  const filteredSaintsQuotes = useMemo(() => {
    if (!q) return SAINTS_WARFARE_QUOTES;
    return SAINTS_WARFARE_QUOTES.filter(
      (item) =>
        item.text.toLowerCase().includes(q) || item.author.toLowerCase().includes(q)
    );
  }, [q]);

  const filteredPadrePio = useMemo(() => {
    if (!q) return PADRE_PIO_WARFARE_QUOTES;
    return PADRE_PIO_WARFARE_QUOTES.filter((quote) => quote.toLowerCase().includes(q));
  }, [q]);

  const filteredDiaries = useMemo(() => {
    if (!q) return EXORCIST_DIARY_ENTRIES;
    return EXORCIST_DIARY_ENTRIES.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.number.toLowerCase().includes(q) ||
        d.paragraphs.some((p) => p.toLowerCase().includes(q))
    );
  }, [q]);

  // Combined Prayers: St. Michael + St. Benedict short prayer + all 8 Compendium prayers
  const stMichaelPrayer = WARFARE_PRAYERS.find((p) => p.id === 'st-michael-prayer');
  const stBenedictPrayer = WARFARE_PRAYERS.find((p) => p.id === 'st-benedict-medal');

  const allDeliverancePrayers = useMemo(() => {
    const list = [
      ...(stMichaelPrayer
        ? [
            {
              id: stMichaelPrayer.id,
              title: stMichaelPrayer.title,
              subtitle: stMichaelPrayer.origin,
              category: 'Archangel',
              body: stMichaelPrayer.englishText,
              latinText: stMichaelPrayer.latinText,
              notes: [stMichaelPrayer.magisterialNote],
            },
          ]
        : []),
      ...COMPENDIUM_PRAYERS,
      ...(stBenedictPrayer
        ? [
            {
              id: stBenedictPrayer.id,
              title: stBenedictPrayer.title,
              subtitle: stBenedictPrayer.origin,
              category: 'Benedictine',
              body: stBenedictPrayer.englishText,
              latinText: stBenedictPrayer.latinText,
              notes: [stBenedictPrayer.magisterialNote],
            },
          ]
        : []),
    ];
    if (!q) return list;
    return list.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q) ||
        p.body.toLowerCase().includes(q) ||
        (p.latinText && p.latinText.toLowerCase().includes(q))
    );
  }, [q, stMichaelPrayer, stBenedictPrayer]);

  const selectedArmor =
    ARMOR_OF_GOD_PIECES.find((p) => p.id === selectedArmorId) || ARMOR_OF_GOD_PIECES[0];
  const selectedVice =
    SEVEN_DEADLY_SINS_COMBAT.find((v) => v.id === selectedViceId) || SEVEN_DEADLY_SINS_COMBAT[0];
  const selectedEssay =
    WARFARE_ESSAYS.find((e) => e.id === selectedEssayId) || WARFARE_ESSAYS[0];
  const activeDiaryList = filteredDiaries.length > 0 ? filteredDiaries : EXORCIST_DIARY_ENTRIES;
  const selectedDiaryIndex = Math.max(
    0,
    activeDiaryList.findIndex((d) => d.id === selectedDiaryId)
  );
  const selectedDiary = activeDiaryList[selectedDiaryIndex] || activeDiaryList[0];

  const equippedCount = equippedArmorIds.length;
  const totalArmorCount = ARMOR_OF_GOD_PIECES.length;

  const sectionTabs: {
    id: WarfareTab;
    label: string;
  }[] = [
    { id: 'scripture', label: 'BIBLE PASSAGES' },
    { id: 'prayers', label: 'PRAYERS' },
    { id: 'faustina', label: '25 SECRETS' },
    { id: 'quotes', label: 'QUOTATIONS' },
    { id: 'principles', label: 'PRINCIPLES | ESSAYS' },
    { id: 'diary', label: 'EXORCIST’S DIARY' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12 animate-fadeIn text-stone-900">
      {/* =====================================================================
          1. TOP BANNER — Standardized 60/40 Split with St. Michael Artwork
         ===================================================================== */}
      <div className="bg-white/55 backdrop-blur-xl backdrop-saturate-150 rounded-xl shadow-md border border-white/70 ring-1 ring-inset ring-white/40 relative z-20">
        <header className="sanctum-top-banner relative overflow-hidden px-5 pt-4 pb-4 sm:px-6 min-h-[196px] sm:h-[212px] rounded-xl bg-[#1B1511] border border-amber-800/35 text-[#FBF7F0] flex flex-col justify-between">
          {/* Right 40%: Kneeling Christian Warrior at Sunrise */}
          <div
            className="pointer-events-none select-none absolute inset-y-0 right-0 w-[40%] overflow-hidden z-0 flex justify-end opacity-100"
            aria-hidden="true"
          >
            <img
              src="/assets/aistudio/image_068f5251.png"
              alt="Medieval Christian knight in engraved dark armor kneeling in prayer with bowed helmet against an upright greatsword at sunrise"
              decoding="async"
              referrerPolicy="no-referrer"
              className="h-full w-full sm:w-auto max-w-none object-cover sm:object-contain object-center brightness-[1.02] contrast-[1.03]"
              style={{
                maskImage:
                  'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.85) 8%, black 18%)',
                WebkitMaskImage:
                  'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.85) 8%, black 18%)',
              }}
            />
          </div>

          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1B1511]/30 via-transparent to-transparent z-0"
            aria-hidden="true"
          />

          {/* Left 60%: Title & Compendium Description */}
          <div className="relative z-10 space-y-1 w-[60%] pr-3 sm:pr-5">
            <p className="font-cinzel text-[11.5px] sm:text-xs font-bold uppercase tracking-[0.16em] text-amber-300/95 leading-snug drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">
              Militia Christi · Ephesians 6:10–20
            </p>
            <h1 className="font-serif text-[24px] sm:text-[28px] md:text-[31px] font-bold tracking-normal text-amber-50 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
              Spiritual Warfare
            </h1>
            <p className="text-xs sm:text-[13.5px] text-stone-200/95 font-serif leading-[1.38] drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">
              {toCurvedQuotes(
                'Sacred Scripture, 25 Secrets to St. Faustina, Saints & Padre Pio Quotes, Deliverance Prayers, St. Benedict Medal, Principles, Essays & Exorcist Diary.'
              )}
            </p>
          </div>

          {/* Lower-Left 60%: Quick-Access Actions */}
          <div className="relative z-10 flex flex-wrap items-center justify-start gap-2 mt-auto pt-2 shrink-0 w-[60%] pr-3 sm:pr-5">
            <button
              type="button"
              onClick={() => {
                setActiveSection('prayers');
                setPrayersSubTab('deliverance');
              }}
              className="h-8 px-3 rounded-md bg-[#7F1D1D] hover:bg-[#991B1B] border border-amber-400/45 text-amber-50 text-xs sm:text-[13px] font-cinzel font-bold tracking-wide shadow-xs transition-colors cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap"
            >
              <Flame className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>Deliverance Prayers</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveSection('scripture');
                setScriptureSubTab('armor');
              }}
              className="h-8 px-3 rounded-md bg-stone-900/85 hover:bg-stone-800 border border-stone-500/50 text-amber-100 text-xs sm:text-[13px] font-cinzel font-semibold tracking-wide transition-colors cursor-pointer inline-flex items-center gap-1.5 whitespace-nowrap"
            >
              <Shield className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>
                Armor: {equippedCount}/{totalArmorCount}
              </span>
            </button>
          </div>
        </header>
      </div>

      {/* =====================================================================
          2. MAIN EDITORIAL COMPENDIUM WORKSPACE
         ===================================================================== */}
      <div className="bg-[#FAF6EE]/90 backdrop-blur-xl backdrop-saturate-150 rounded-xl border border-[#DDD2C0] ring-1 ring-inset ring-white/60 shadow-[0_12px_36px_rgba(28,18,12,0.12)] overflow-hidden">
        {/* 6-Section Architectural Tab Bar */}
        <nav
          aria-label="Spiritual Warfare sections"
          className="grid grid-cols-3 sm:grid-cols-6 border-b border-[#DDD2C0] bg-[#F2EAE0]/90"
        >
          {sectionTabs.map((tab) => {
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveSection(tab.id)}
                className={`relative px-1.5 sm:px-2 py-3.5 text-[11px] sm:text-[11.5px] lg:text-[12.5px] font-cinzel font-bold uppercase tracking-wide text-center leading-tight transition-colors cursor-pointer flex items-center justify-center border-r border-b sm:border-b-0 last:border-r-0 border-[#DDD2C0]/70 ${
                  isActive
                    ? 'bg-[#FAF6EE] text-[#7F1D1D]'
                    : 'text-stone-700 hover:text-stone-950 hover:bg-white/55'
                }`}
              >
                <span>{tab.label}</span>
                {isActive && (
                  <span
                    className="absolute inset-x-0 bottom-0 h-[2.5px] bg-gradient-to-r from-[#7F1D1D] via-[#B45309] to-[#7F1D1D]"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Contextual Filter / Search Bar */}
        <div className="px-4 sm:px-6 py-3 bg-[#F6EFE2]/80 border-b border-[#E3D7C4] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter passages, secrets, quotes, prayers, or diary entries..."
              className="w-full pl-9 pr-8 py-2 rounded-lg bg-white/90 border border-[#D4C7B2] text-sm sm:text-[15px] font-serif text-stone-900 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-[#8B261D]/35 focus:border-[#8B261D]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-500 hover:text-stone-900 cursor-pointer"
                aria-label="Clear filter"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <p className="text-xs sm:text-[12.5px] font-cinzel uppercase tracking-wider text-stone-600">
            {activeSection === 'scripture' && `${filteredPassages.length} Bible Passages · 7 Armor Pieces`}
            {activeSection === 'prayers' && `${allDeliverancePrayers.length} Prayers · St. Benedict Medal Guide`}
            {activeSection === 'faustina' && `${filteredFaustina.length} of 25 Secrets · Diary 1760`}
            {activeSection === 'quotes' &&
              `${filteredSaintsQuotes.length} Saint Quotes · ${filteredPadrePio.length} Padre Pio · 28 Patrons`}
            {activeSection === 'principles' && `7 & 12 Principles · 7 Essays · 7 Vices vs. Virtues`}
            {activeSection === 'diary' && `${filteredDiaries.length} Exorcist Diary Entries · Msgr. Rossetti`}
          </p>
        </div>

        <div className="p-4 sm:p-6 md:p-7 space-y-6">
          {/* =================================================================
              TAB 1: BIBLE PASSAGES & ARMOR OF GOD
             ================================================================= */}
          {activeSection === 'scripture' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DDD2C0]">
                <div>
                  <p className="font-cinzel text-xs sm:text-[12.5px] font-bold uppercase tracking-[0.16em] text-[#8B261D]">
                    Sacred Scripture · Sword of the Spirit
                  </p>
                  <h2 className="font-serif text-2xl sm:text-[28px] font-bold text-stone-950">
                    {scriptureSubTab === 'passages'
                      ? 'Spiritual Warfare Bible Passages'
                      : 'The Full Armor of God (Eph 6:10–18)'}
                  </h2>
                </div>

                <div className="inline-flex rounded-lg border border-[#D4C7B2] bg-[#F2EAE0] p-0.5 self-start sm:self-auto shrink-0">
                  <button
                    type="button"
                    onClick={() => setScriptureSubTab('passages')}
                    className={`px-3.5 py-2 rounded-md text-xs sm:text-[13px] font-cinzel font-bold transition-colors cursor-pointer ${
                      scriptureSubTab === 'passages'
                        ? 'bg-[#7F1D1D] text-amber-50 shadow-2xs'
                        : 'text-stone-700 hover:text-stone-950'
                    }`}
                  >
                    Bible Passages ({filteredPassages.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setScriptureSubTab('armor')}
                    className={`px-3.5 py-2 rounded-md text-xs sm:text-[13px] font-cinzel font-bold transition-colors cursor-pointer ${
                      scriptureSubTab === 'armor'
                        ? 'bg-[#7F1D1D] text-amber-50 shadow-2xs'
                        : 'text-stone-700 hover:text-stone-950'
                    }`}
                  >
                    Armor Checklist ({equippedCount}/7)
                  </button>
                </div>
              </div>

              {scriptureSubTab === 'passages' ? (
                <div className="space-y-4">
                  {filteredPassages.length === 0 ? (
                    <p className="text-base font-serif text-stone-600 py-6 text-center">
                      No Bible passages matched “{searchQuery}”.
                    </p>
                  ) : (
                    filteredPassages.map((passage) => {
                      const hasNotes = passage.notes.length > 0;
                      const isNotesOpen = Boolean(expandedNotes[passage.id]);
                      const isSummary = passage.id === 'st-paul-warfare';
                      const cleanVersesForSpeech = cleanBiblePassageForSpeech(
                        passage.verses,
                        isSummary
                      );
                      const fullReadText = `${passage.title}. ${cleanVersesForSpeech}`;

                      return (
                        <article
                          key={passage.id}
                          className="rounded-xl bg-white border border-[#D8CCB8] shadow-xs overflow-hidden"
                        >
                          <div className="px-5 py-4 bg-[#F6EFE2] border-b border-[#E3D7C4] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <span className="font-cinzel text-xs sm:text-[12.5px] font-bold uppercase tracking-[0.14em] text-[#8B261D]">
                                {passage.reference}
                              </span>
                              <h3 className="font-serif text-xl sm:text-[22px] font-bold text-stone-950 leading-snug mt-0.5">
                                {toCurvedQuotes(passage.title)}
                              </h3>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                type="button"
                                onClick={() => handleSpeakText(`bible-${passage.id}`, fullReadText)}
                                className="h-8 px-3 rounded-md border border-[#D4C6B0] bg-white hover:bg-[#FAF6EE] text-stone-800 text-xs font-cinzel font-bold inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                              >
                                {speakingId === `bible-${passage.id}` ? (
                                  <>
                                    <VolumeX className="w-3.5 h-3.5 text-[#8B261D]" />
                                    <span>Stop</span>
                                  </>
                                ) : (
                                  <>
                                    <Volume2 className="w-3.5 h-3.5 text-[#8B261D]" />
                                    <span>Listen</span>
                                  </>
                                )}
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  handleCopyText(
                                    `bible-${passage.id}`,
                                    `${passage.title} (${passage.reference})\n\n${passage.verses.join('\n')}`
                                  )
                                }
                                className="h-8 px-3 rounded-md border border-[#D4C6B0] bg-white hover:bg-[#FAF6EE] text-stone-800 text-xs font-cinzel font-bold inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                              >
                                {copiedId === `bible-${passage.id}` ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                                    <span>Copied</span>
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

                          <div className="p-5 sm:p-6 space-y-2.5">
                            {passage.verses.map((line, idx) => (
                              <p
                                key={idx}
                                className="font-serif text-[19px] sm:text-[20.5px] leading-[1.82] text-stone-900"
                              >
                                {renderFormattedBibleLine(line, isSummary)}
                              </p>
                            ))}
                          </div>

                          {hasNotes && (
                            <div className="border-t border-[#ECE2D1] bg-[#FAF6EE]">
                              <button
                                type="button"
                                onClick={() =>
                                  setExpandedNotes((prev) => ({
                                    ...prev,
                                    [passage.id]: !prev[passage.id],
                                  }))
                                }
                                className="w-full px-5 py-3 flex items-center justify-between text-left text-xs sm:text-[13px] font-cinzel font-bold uppercase tracking-wider text-stone-600 hover:text-[#7F1D1D] cursor-pointer transition-colors"
                              >
                                <span>
                                  Study Notes &amp; Cross-References ({passage.notes.length})
                                </span>
                                <ChevronDown
                                  className={`w-4 h-4 transition-transform ${
                                    isNotesOpen ? 'rotate-180 text-[#8B261D]' : ''
                                  }`}
                                />
                              </button>
                              {isNotesOpen && (
                                <div className="px-5 pb-4 pt-2 space-y-2 text-[15px] sm:text-[16px] font-serif text-stone-700 leading-relaxed border-t border-[#ECE2D1]/70">
                                  {passage.notes.map((note, nIdx) => (
                                    <p key={nIdx}>{toCurvedQuotes(note)}</p>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                        </article>
                      );
                    })
                  )}
                </div>
              ) : (
                /* Interactive 7-Piece Armor of God Checklist & Dossier */
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-base font-serif text-stone-700">
                      Check off each piece of St. Paul’s spiritual armor daily (resets each calendar day).
                    </p>
                    <button
                      type="button"
                      onClick={handleEquipAllArmor}
                      className="h-9 px-3.5 rounded-lg bg-[#1B100C] hover:bg-[#2E1B14] text-amber-100 border border-amber-500/40 text-xs sm:text-[13px] font-cinzel font-bold tracking-wide transition-colors cursor-pointer inline-flex items-center gap-1.5"
                    >
                      {equippedCount === totalArmorCount ? (
                        <>
                          <RotateCcw className="w-3.5 h-3.5 text-amber-300" />
                          <span>Reset Today</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-3.5 h-3.5 text-amber-300" />
                          <span>Put On Full Armor</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                    <div className="lg:col-span-5 space-y-2.5">
                      {ARMOR_OF_GOD_PIECES.map((piece) => {
                        const isSelected = piece.id === selectedArmor.id;
                        const isEquipped = equippedArmorIds.includes(piece.id);
                        return (
                          <div
                            key={piece.id}
                            className={`rounded-lg border transition-all flex items-stretch overflow-hidden ${
                              isSelected
                                ? 'bg-white border-[#8B261D] shadow-sm ring-1 ring-[#8B261D]/20'
                                : 'bg-white/65 hover:bg-white border-[#DDD2C0]'
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => toggleArmorEquipped(piece.id)}
                              className={`w-11 shrink-0 flex items-center justify-center border-r transition-colors cursor-pointer ${
                                isEquipped
                                  ? 'bg-[#7F1D1D] text-amber-100 border-[#7F1D1D]'
                                  : 'bg-[#F5EFE5] hover:bg-[#ECE2D2] text-stone-400 border-[#DDD2C0]'
                              }`}
                              aria-label={isEquipped ? `Unmark ${piece.name}` : `Mark ${piece.name}`}
                            >
                              <div
                                className={`w-5 h-5 rounded-sm border flex items-center justify-center ${
                                  isEquipped
                                    ? 'border-amber-300 bg-amber-400/20 text-amber-200'
                                    : 'border-stone-400 bg-white'
                                }`}
                              >
                                {isEquipped && <Check className="w-3.5 h-3.5 stroke-[2.75]" />}
                              </div>
                            </button>

                            <button
                              type="button"
                              onClick={() => setSelectedArmorId(piece.id)}
                              className="flex-1 px-3.5 py-3 text-left flex items-center justify-between gap-2 cursor-pointer min-w-0"
                            >
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-cinzel text-xs font-bold text-[#8B261D]">
                                    0{piece.order}
                                  </span>
                                  <span className="font-serif font-bold text-base text-stone-900 truncate">
                                    {piece.name}
                                  </span>
                                </div>
                                <p className="text-[13px] font-serif italic text-stone-600 truncate mt-0.5">
                                  {piece.latinName} · {piece.scriptureRef}
                                </p>
                              </div>
                              <ChevronRight
                                className={`w-4 h-4 shrink-0 ${
                                  isSelected ? 'text-[#8B261D]' : 'text-stone-400'
                                }`}
                              />
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    <article className="lg:col-span-7 rounded-xl bg-white border border-[#D8CCB8] shadow-xs overflow-hidden">
                      <div className="px-5 py-4 bg-[#1B100C] text-amber-50 border-b border-amber-500/25 flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <span className="font-cinzel text-xs font-bold uppercase tracking-[0.16em] text-amber-300">
                            Piece {selectedArmor.order} of 7 · {selectedArmor.catechismRef}
                          </span>
                          <h3 className="font-serif text-2xl font-bold text-amber-50 mt-0.5">
                            {selectedArmor.name}
                          </h3>
                          <p className="text-sm font-serif italic text-amber-200/85 mt-0.5">
                            {selectedArmor.latinName}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => toggleArmorEquipped(selectedArmor.id)}
                          className={`h-8 px-3 rounded-md text-xs sm:text-[13px] font-cinzel font-bold border transition-colors cursor-pointer inline-flex items-center gap-1.5 ${
                            equippedArmorIds.includes(selectedArmor.id)
                              ? 'bg-emerald-900/90 border-emerald-400/50 text-emerald-100'
                              : 'bg-amber-900/50 hover:bg-amber-800/70 border-amber-400/45 text-amber-100'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>
                            {equippedArmorIds.includes(selectedArmor.id)
                              ? 'Equipped Today'
                              : 'Mark Equipped'}
                          </span>
                        </button>
                      </div>

                      <div className="px-5 py-4 bg-[#F6EFE2] border-b border-[#E4D8C5]">
                        <p className="font-serif italic text-[18.5px] sm:text-[19.5px] leading-relaxed text-stone-900">
                          {toCurvedQuotes(`"${selectedArmor.scriptureVerse}"`)}
                        </p>
                        <p className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#8B261D] mt-1.5">
                          — {selectedArmor.scriptureRef}
                        </p>
                      </div>

                      <div className="p-5 sm:p-6 space-y-5">
                        <div>
                          <h4 className="font-cinzel text-xs font-bold uppercase tracking-[0.14em] text-stone-500 mb-1.5">
                            Meaning
                          </h4>
                          <p className="font-serif text-[17px] sm:text-[18px] leading-[1.78] text-stone-800">
                            {toCurvedQuotes(selectedArmor.theologicalMeaning)}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-stone-200/80">
                          <h4 className="font-cinzel text-xs font-bold uppercase tracking-[0.14em] text-[#8B261D] mb-1.5">
                            Tactical Defense
                          </h4>
                          <p className="font-serif text-[17px] sm:text-[18px] leading-[1.78] text-stone-800">
                            {toCurvedQuotes(selectedArmor.tacticalDefense)}
                          </p>
                        </div>

                        <div className="rounded-lg bg-[#FAF6EE] border border-[#DFD3BF] p-4 sm:p-5 space-y-2.5">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-cinzel text-xs font-bold uppercase tracking-[0.14em] text-[#7F1D1D]">
                              Daily Prayer
                            </span>
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() =>
                                  handleSpeakText(
                                    `armor-${selectedArmor.id}`,
                                    `${selectedArmor.name}. ${selectedArmor.putOnPrayer}`
                                  )
                                }
                                className="h-8 px-3 rounded-md border border-[#D4C6B0] bg-white hover:bg-[#F3ECE0] text-stone-800 text-xs font-cinzel font-bold inline-flex items-center gap-1.5 cursor-pointer"
                              >
                                {speakingId === `armor-${selectedArmor.id}` ? (
                                  <VolumeX className="w-3.5 h-3.5 text-[#8B261D]" />
                                ) : (
                                  <Volume2 className="w-3.5 h-3.5 text-[#8B261D]" />
                                )}
                                <span>{speakingId === `armor-${selectedArmor.id}` ? 'Stop' : 'Listen'}</span>
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  handleCopyText(`armor-${selectedArmor.id}`, selectedArmor.putOnPrayer)
                                }
                                className="h-8 px-3 rounded-md border border-[#D4C6B0] bg-white hover:bg-[#F3ECE0] text-stone-800 text-xs font-cinzel font-bold inline-flex items-center gap-1.5 cursor-pointer"
                              >
                                {copiedId === `armor-${selectedArmor.id}` ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5 text-stone-600" />
                                )}
                                <span>{copiedId === `armor-${selectedArmor.id}` ? 'Copied' : 'Copy'}</span>
                              </button>
                            </div>
                          </div>
                          <p className="font-serif italic text-[17px] sm:text-[18px] leading-[1.78] text-stone-900">
                            {toCurvedQuotes(selectedArmor.putOnPrayer)}
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =================================================================
              TAB 2: DELIVERANCE PRAYERS & ST. BENEDICT MEDAL
             ================================================================= */}
          {activeSection === 'prayers' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DDD2C0]">
                <div>
                  <p className="font-cinzel text-xs sm:text-[12.5px] font-bold uppercase tracking-[0.16em] text-[#8B261D]">
                    Protection, Binding &amp; Sacramentals
                  </p>
                  <h2 className="font-serif text-2xl sm:text-[28px] font-bold text-stone-950">
                    {prayersSubTab === 'deliverance'
                      ? 'Deliverance & Protection Prayers for the Laity'
                      : 'The Medal of Saint Benedict & Holy Water'}
                  </h2>
                </div>

                <div className="inline-flex rounded-lg border border-[#D4C7B2] bg-[#F2EAE0] p-0.5 self-start sm:self-auto shrink-0">
                  <button
                    type="button"
                    onClick={() => setPrayersSubTab('deliverance')}
                    className={`px-3.5 py-2 rounded-md text-xs sm:text-[13px] font-cinzel font-bold transition-colors cursor-pointer ${
                      prayersSubTab === 'deliverance'
                        ? 'bg-[#7F1D1D] text-amber-50 shadow-2xs'
                        : 'text-stone-700 hover:text-stone-950'
                    }`}
                  >
                    Prayers ({allDeliverancePrayers.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setPrayersSubTab('benedict')}
                    className={`px-3.5 py-2 rounded-md text-xs sm:text-[13px] font-cinzel font-bold transition-colors cursor-pointer ${
                      prayersSubTab === 'benedict'
                        ? 'bg-[#7F1D1D] text-amber-50 shadow-2xs'
                        : 'text-stone-700 hover:text-stone-950'
                    }`}
                  >
                    St. Benedict Medal
                  </button>
                </div>
              </div>

              {prayersSubTab === 'deliverance' ? (
                <div className="space-y-5">
                  {/* BEFORE YOU SAY THESE PRAYERS: Guidelines for the Laity */}
                  <div className="rounded-xl bg-[#1B100C] text-stone-100 border border-amber-500/30 p-5 sm:p-6 space-y-3.5">
                    <div className="flex items-center gap-2 text-amber-300">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <h3 className="font-cinzel text-[13px] sm:text-sm font-bold uppercase tracking-[0.14em]">
                        Before You Say These Prayers — Guidelines for Deliverance Prayers for the Laity
                      </h3>
                    </div>
                    <ol className="space-y-2 text-[16px] sm:text-[17px] font-serif leading-[1.75] text-stone-200 list-decimal pl-5">
                      {LAITY_DELIVERANCE_GUIDELINES.map((rule, idx) => (
                        <li key={idx}>{toCurvedQuotes(rule)}</li>
                      ))}
                    </ol>
                    <p className="pt-3 border-t border-amber-500/20 text-[15.5px] sm:text-[16.5px] font-serif italic text-amber-200/95 leading-relaxed">
                      {toCurvedQuotes(FR_RIPPERGER_QUOTE)}
                    </p>
                  </div>

                  {/* All Prayers */}
                  <div className="space-y-4">
                    {allDeliverancePrayers.map((prayer) => {
                      const hasLatin = Boolean(prayer.latinText);
                      const hasLongNotes = prayer.notes.length > 1;
                      const showNotes = !hasLongNotes || Boolean(expandedHistory[prayer.id]);

                      return (
                        <article
                          key={prayer.id}
                          className="rounded-xl bg-white border border-[#D8CCB8] shadow-xs overflow-hidden"
                        >
                          <div className="px-5 py-4 bg-[#F6EFE2] border-b border-[#E3D7C4] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <span className="font-cinzel text-xs font-bold uppercase tracking-[0.14em] text-[#8B261D]">
                                {prayer.category}
                              </span>
                              <h3 className="font-serif text-xl sm:text-[22px] font-bold text-stone-950 mt-0.5">
                                {toCurvedQuotes(prayer.title)}
                              </h3>
                              <p className="text-sm font-serif text-stone-600 mt-0.5">
                                {toCurvedQuotes(prayer.subtitle)}
                              </p>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <button
                                type="button"
                                onClick={() =>
                                  handleSpeakText(
                                    `prayer-${prayer.id}`,
                                    `${prayer.title}. ${prayer.body}`
                                  )
                                }
                                className="h-8 px-3 rounded-md border border-[#D4C6B0] bg-white hover:bg-[#FAF6EE] text-stone-800 text-xs font-cinzel font-bold inline-flex items-center gap-1.5 cursor-pointer"
                              >
                                {speakingId === `prayer-${prayer.id}` ? (
                                  <>
                                    <VolumeX className="w-3.5 h-3.5 text-[#8B261D]" />
                                    <span>Stop</span>
                                  </>
                                ) : (
                                  <>
                                    <Volume2 className="w-3.5 h-3.5 text-[#8B261D]" />
                                    <span>Listen</span>
                                  </>
                                )}
                              </button>
                              <button
                                type="button"
                                onClick={() =>
                                  handleCopyText(
                                    `prayer-${prayer.id}`,
                                    `${prayer.title}\n\n${prayer.body}${
                                      prayer.latinText ? `\n\n— Latin —\n${prayer.latinText}` : ''
                                    }`
                                  )
                                }
                                className="h-8 px-3 rounded-md border border-[#D4C6B0] bg-white hover:bg-[#FAF6EE] text-stone-800 text-xs font-cinzel font-bold inline-flex items-center gap-1.5 cursor-pointer"
                              >
                                {copiedId === `prayer-${prayer.id}` ? (
                                  <>
                                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                                    <span>Copied</span>
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

                          <div
                            className={`p-5 sm:p-6 grid gap-5 ${
                              hasLatin ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
                            }`}
                          >
                            <div className="space-y-2">
                              {hasLatin && (
                                <span className="font-cinzel text-xs font-bold uppercase tracking-[0.14em] text-stone-500 block">
                                  English / Commentary
                                </span>
                              )}
                              <p className="font-serif text-[18px] sm:text-[19px] leading-[1.82] text-stone-900 whitespace-pre-line">
                                {toCurvedQuotes(prayer.body)}
                              </p>
                            </div>

                            {hasLatin && prayer.latinText && (
                              <div className="space-y-2 md:border-l md:border-[#E6DAC7] md:pl-5 pt-4 md:pt-0 border-t md:border-t-0 border-[#E6DAC7]">
                                <span className="font-cinzel text-xs font-bold uppercase tracking-[0.14em] text-[#8B261D] block">
                                  Latin
                                </span>
                                <p className="font-serif italic text-[17px] sm:text-[18px] leading-[1.82] text-stone-800 whitespace-pre-line">
                                  {toCurvedQuotes(prayer.latinText)}
                                </p>
                              </div>
                            )}
                          </div>

                          {prayer.notes.length > 0 && (
                            <div className="px-5 py-3.5 bg-[#FAF6EE] border-t border-[#ECE2D1] text-[15.5px] sm:text-[16px] font-serif text-stone-700 leading-relaxed space-y-2">
                              {hasLongNotes && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setExpandedHistory((prev) => ({
                                      ...prev,
                                      [prayer.id]: !prev[prayer.id],
                                    }))
                                  }
                                  className="font-cinzel text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#8B261D] inline-flex items-center gap-1 cursor-pointer"
                                >
                                  <span>Historical Origin &amp; Approval</span>
                                  <ChevronDown
                                    className={`w-4 h-4 transition-transform ${
                                      showNotes ? 'rotate-180' : ''
                                    }`}
                                  />
                                </button>
                              )}
                              {showNotes &&
                                prayer.notes.map((n, idx) => (
                                  <p key={idx}>{toCurvedQuotes(n)}</p>
                                ))}
                            </div>
                          )}
                        </article>
                      );
                    })}
                  </div>
                </div>
              ) : (
                /* Complete Guide to the Medal of Saint Benedict + Blessing */
                <div className="space-y-5">
                  {/* Latin Key Reference Banner */}
                  <div className="rounded-xl bg-[#1B100C] text-amber-50 border border-amber-500/30 p-5 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <span className="font-cinzel text-xs font-bold uppercase tracking-[0.15em] text-amber-300">
                        Arms of the Cross
                      </span>
                      <p className="font-cinzel text-base font-bold text-amber-100 mt-1">
                        C.S.S.M.L. — N.D.S.M.D.
                      </p>
                      <p className="text-sm sm:text-[15px] font-serif italic text-stone-300 mt-1">
                        Crux Sacra Sit Mihi Lux · Non Draco Sit Mihi Dux
                      </p>
                    </div>
                    <div>
                      <span className="font-cinzel text-xs font-bold uppercase tracking-[0.15em] text-amber-300">
                        Reverse Margin Exorcism
                      </span>
                      <p className="font-cinzel text-base font-bold text-amber-100 mt-1">
                        V.R.S.N.S.M.V. — S.M.Q.L.I.V.B.
                      </p>
                      <p className="text-sm sm:text-[15px] font-serif italic text-stone-300 mt-1">
                        Vade Retro Satana! Nunquam Suade Mihi Vana! Sunt Mala Quae Libas. Ipse Venena Bibas!
                      </p>
                    </div>
                    <div>
                      <span className="font-cinzel text-xs font-bold uppercase tracking-[0.15em] text-amber-300">
                        Four Angles &amp; Motto
                      </span>
                      <p className="font-cinzel text-base font-bold text-amber-100 mt-1">
                        C S P B · PAX
                      </p>
                      <p className="text-sm sm:text-[15px] font-serif italic text-stone-300 mt-1">
                        Crux Sancti Patris Benedicti — Peace
                      </p>
                    </div>
                  </div>

                  {ST_BENEDICT_MEDAL_SECTIONS.map((sec, idx) => (
                    <article
                      key={idx}
                      className="rounded-xl bg-white border border-[#D8CCB8] shadow-xs p-5 sm:p-6 space-y-3"
                    >
                      <h3 className="font-serif text-xl sm:text-[22px] font-bold text-[#7F1D1D] border-b border-[#ECE2D1] pb-2">
                        {toCurvedQuotes(sec.heading)}
                      </h3>
                      <div className="space-y-3">
                        {sec.paragraphs.map((p, pIdx) => (
                          <p
                            key={pIdx}
                            className="font-serif text-[17.5px] sm:text-[18.5px] leading-[1.8] text-stone-800"
                          >
                            {toCurvedQuotes(p)}
                          </p>
                        ))}
                      </div>
                    </article>
                  ))}

                  {/* Holy Water Quote */}
                  <blockquote className="rounded-xl bg-[#F6EFE2] border border-[#DFD3BF] p-5 sm:p-6 space-y-2">
                    <p className="font-serif italic text-[18px] sm:text-[19px] text-stone-900 leading-relaxed">
                      {toCurvedQuotes(`"${HOLY_WATER_DEVOTION_QUOTE.quote}"`)}
                    </p>
                    <footer className="text-sm font-cinzel font-bold text-[#8B261D]">
                      — {toCurvedQuotes(HOLY_WATER_DEVOTION_QUOTE.source)}
                    </footer>
                  </blockquote>
                </div>
              )}
            </div>
          )}

          {/* =================================================================
              TAB 3: JESUS TO ST. FAUSTINA — 25 SECRETS ON SPIRITUAL WARFARE
             ================================================================= */}
          {activeSection === 'faustina' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="pb-4 border-b border-[#DDD2C0] space-y-2">
                <p className="font-cinzel text-xs sm:text-[12.5px] font-bold uppercase tracking-[0.16em] text-[#8B261D]">
                  Diary of St. Faustina Kowalska (§1760) · Cracow-Pradnik, June 2, 1938
                </p>
                <h2 className="font-serif text-2xl sm:text-[28px] font-bold text-stone-950">
                  Jesus to St. Faustina on Spiritual Warfare: 25 Secrets
                </h2>
                <p className="text-[13px] font-cinzel uppercase tracking-wider text-stone-600">
                  Commentary by Kathleen Beckman
                </p>
                <div className="pt-2 space-y-2.5 text-[17.5px] sm:text-[18.5px] font-serif text-stone-800 leading-[1.78]">
                  {FAUSTINA_SECRETS_INTRO.map((p, idx) => (
                    <p key={idx}>{toCurvedQuotes(p)}</p>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {filteredFaustina.map((secret) => (
                  <article
                    key={secret.number}
                    className="rounded-xl bg-white border border-[#D8CCB8] shadow-xs p-5 sm:p-6 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className="w-9 h-9 rounded-lg bg-[#7F1D1D] text-amber-100 font-cinzel text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {secret.number}
                        </span>
                        <h3 className="font-serif text-[18.5px] sm:text-[20px] font-bold text-[#7F1D1D] leading-snug">
                          {toCurvedQuotes(`"${secret.jesusWords}"`)}
                        </h3>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() =>
                            handleSpeakText(
                              `faustina-${secret.number}`,
                              `Secret ${secret.number}. ${secret.jesusWords} ${secret.commentary}`
                            )
                          }
                          className="p-2 rounded-md border border-[#DFD3BF] hover:bg-[#FAF6EE] text-[#8B261D] cursor-pointer"
                          title="Listen"
                          aria-label={`Listen to Secret ${secret.number}`}
                        >
                          {speakingId === `faustina-${secret.number}` ? (
                            <VolumeX className="w-4 h-4" />
                          ) : (
                            <Volume2 className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            handleCopyText(
                              `faustina-${secret.number}`,
                              `${secret.number}. "${secret.jesusWords}" — Jesus to St. Faustina (Diary 1760)\n\n${secret.commentary}`
                            )
                          }
                          className="p-2 rounded-md border border-[#DFD3BF] hover:bg-[#FAF6EE] text-stone-600 cursor-pointer"
                          title="Copy"
                          aria-label={`Copy Secret ${secret.number}`}
                        >
                          {copiedId === `faustina-${secret.number}` ? (
                            <Check className="w-4 h-4 text-emerald-700" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    <p className="font-serif text-[17px] sm:text-[18px] leading-[1.78] text-stone-800 pl-12 whitespace-pre-line">
                      {toCurvedQuotes(secret.commentary)}
                    </p>
                  </article>
                ))}
              </div>

              {FAUSTINA_COPYRIGHT && (
                <p className="text-sm font-serif italic text-stone-600 pt-2 border-t border-[#E3D7C4]">
                  {toCurvedQuotes(FAUSTINA_COPYRIGHT)}
                </p>
              )}
            </div>
          )}

          {/* =================================================================
              TAB 4: SAINTS' QUOTATIONS, PADRE PIO & PATRON SAINTS
             ================================================================= */}
          {activeSection === 'quotes' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DDD2C0]">
                <div>
                  <p className="font-cinzel text-xs sm:text-[12.5px] font-bold uppercase tracking-[0.16em] text-[#8B261D]">
                    Cloud of Witnesses · Communion of Saints
                  </p>
                  <h2 className="font-serif text-2xl sm:text-[28px] font-bold text-stone-950">
                    {quotesSubTab === 'saints' && 'Quotations on Spiritual Warfare'}
                    {quotesSubTab === 'padre-pio' && 'St. Padre Pio on Spiritual Warfare'}
                    {quotesSubTab === 'patrons' && 'Patron Saints for the Oppressed'}
                  </h2>
                </div>

                <div className="inline-flex rounded-lg border border-[#D4C7B2] bg-[#F2EAE0] p-0.5 self-start sm:self-auto shrink-0">
                  <button
                    type="button"
                    onClick={() => setQuotesSubTab('saints')}
                    className={`px-3.5 py-2 rounded-md text-xs sm:text-[13px] font-cinzel font-bold transition-colors cursor-pointer ${
                      quotesSubTab === 'saints'
                        ? 'bg-[#7F1D1D] text-amber-50'
                        : 'text-stone-700 hover:text-stone-950'
                    }`}
                  >
                    Saints ({filteredSaintsQuotes.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuotesSubTab('padre-pio')}
                    className={`px-3.5 py-2 rounded-md text-xs sm:text-[13px] font-cinzel font-bold transition-colors cursor-pointer ${
                      quotesSubTab === 'padre-pio'
                        ? 'bg-[#7F1D1D] text-amber-50'
                        : 'text-stone-700 hover:text-stone-950'
                    }`}
                  >
                    Padre Pio ({filteredPadrePio.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuotesSubTab('patrons')}
                    className={`px-3.5 py-2 rounded-md text-xs sm:text-[13px] font-cinzel font-bold transition-colors cursor-pointer ${
                      quotesSubTab === 'patrons'
                        ? 'bg-[#7F1D1D] text-amber-50'
                        : 'text-stone-700 hover:text-stone-950'
                    }`}
                  >
                    Patrons (28)
                  </button>
                </div>
              </div>

              {quotesSubTab === 'saints' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredSaintsQuotes.map((item, idx) => (
                    <blockquote
                      key={idx}
                      className="rounded-xl bg-white border border-[#D8CCB8] shadow-xs p-5 sm:p-6 flex flex-col justify-between gap-3"
                    >
                      <p className="font-serif text-[17.5px] sm:text-[18.5px] leading-[1.76] text-stone-900">
                        {toCurvedQuotes(`"${item.text}"`)}
                      </p>
                      <div className="flex items-center justify-between gap-2 pt-3 border-t border-[#EFE5D5]">
                        <footer className="font-cinzel text-[13px] font-bold text-[#8B261D]">
                          — {toCurvedQuotes(item.author)}
                        </footer>
                        <button
                          type="button"
                          onClick={() =>
                            handleCopyText(`sq-${idx}`, `"${item.text}" — ${item.author}`)
                          }
                          className="p-1.5 rounded hover:bg-[#FAF6EE] text-stone-500 hover:text-stone-900 cursor-pointer"
                          title="Copy quote"
                        >
                          {copiedId === `sq-${idx}` ? (
                            <Check className="w-4 h-4 text-emerald-700" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </blockquote>
                  ))}
                </div>
              )}

              {quotesSubTab === 'padre-pio' && (
                <div className="space-y-4">
                  {filteredPadrePio.map((quote, idx) => (
                    <blockquote
                      key={idx}
                      className="rounded-xl bg-white border border-[#D8CCB8] shadow-xs p-5 sm:p-6 flex items-start justify-between gap-3"
                    >
                      <div className="space-y-2.5">
                        <p className="font-serif text-[18px] sm:text-[19px] leading-[1.8] text-stone-900">
                          {toCurvedQuotes(`"${quote}"`)}
                        </p>
                        <footer className="font-cinzel text-[13px] font-bold uppercase tracking-wider text-[#8B261D]">
                          — St. Padre Pio of Pietrelcina
                        </footer>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyText(`pio-${idx}`, `"${quote}" — St. Padre Pio`)
                        }
                        className="p-2 rounded-md border border-[#E3D7C4] hover:bg-[#FAF6EE] text-stone-500 cursor-pointer shrink-0"
                        title="Copy quote"
                      >
                        {copiedId === `pio-${idx}` ? (
                          <Check className="w-4 h-4 text-emerald-700" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </blockquote>
                  ))}
                </div>
              )}

              {quotesSubTab === 'patrons' && (
                <div className="space-y-5">
                  <div className="space-y-2.5 text-[17.5px] sm:text-[18.5px] font-serif text-stone-800 leading-[1.78]">
                    {PATRON_SAINTS_INTRO.map((p, idx) => (
                      <p key={idx}>{toCurvedQuotes(p)}</p>
                    ))}
                  </div>

                  {/* Long & Short Invocations */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-xl bg-[#1B100C] text-amber-50 border border-amber-500/30 p-5 sm:p-6 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-cinzel text-xs font-bold uppercase tracking-[0.15em] text-amber-300">
                          Full Intercession Invocation
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyText('patron-long', PATRON_LONG_INVOCATION)}
                          className="h-8 px-3 rounded-md bg-amber-900/50 hover:bg-amber-800/70 border border-amber-400/40 text-amber-100 text-xs font-cinzel font-bold inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          {copiedId === 'patron-long' ? (
                            <Check className="w-3.5 h-3.5 text-emerald-300" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          <span>{copiedId === 'patron-long' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <p className="font-serif italic text-[16.5px] sm:text-[17.5px] leading-[1.78] text-amber-50/95">
                        {toCurvedQuotes(PATRON_LONG_INVOCATION)}
                      </p>
                    </div>

                    <div className="rounded-xl bg-[#F6EFE2] border border-[#DFD3BF] p-5 sm:p-6 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-cinzel text-xs font-bold uppercase tracking-[0.15em] text-[#8B261D]">
                          Short Form Invocation
                        </span>
                        <button
                          type="button"
                          onClick={() => handleCopyText('patron-short', PATRON_SHORT_INVOCATION)}
                          className="h-8 px-3 rounded-md bg-white hover:bg-[#FAF6EE] border border-[#D4C6B0] text-stone-800 text-xs font-cinzel font-bold inline-flex items-center gap-1.5 cursor-pointer"
                        >
                          {copiedId === 'patron-short' ? (
                            <Check className="w-3.5 h-3.5 text-emerald-700" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          <span>{copiedId === 'patron-short' ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>
                      <p className="font-serif italic text-[16.5px] sm:text-[17.5px] leading-[1.78] text-stone-900">
                        {toCurvedQuotes(PATRON_SHORT_INVOCATION)}
                      </p>
                    </div>
                  </div>

                  {/* Primary Patrons Grid */}
                  <div className="space-y-3">
                    <h3 className="font-cinzel text-sm font-bold uppercase tracking-[0.15em] text-[#7F1D1D]">
                      The Primary Patrons ({PRIMARY_WARFARE_PATRONS.length})
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {PRIMARY_WARFARE_PATRONS.map((p, idx) => (
                        <div
                          key={idx}
                          className="rounded-lg bg-white border border-[#D8CCB8] px-4 py-3.5"
                        >
                          <div className="font-serif font-bold text-[16.5px] sm:text-[17px] text-stone-950">
                            {toCurvedQuotes(p.name)}
                          </div>
                          <div className="text-[14.5px] sm:text-[15px] font-serif text-stone-600 mt-1">
                            {toCurvedQuotes(p.role)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Additional Patrons Grid */}
                  <div className="space-y-3">
                    <h3 className="font-cinzel text-sm font-bold uppercase tracking-[0.15em] text-stone-600">
                      Additional Patrons ({ADDITIONAL_WARFARE_PATRONS.length})
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {ADDITIONAL_WARFARE_PATRONS.map((p, idx) => (
                        <div
                          key={idx}
                          className="rounded-lg bg-white/80 border border-[#DFD3BF] px-4 py-3.5"
                        >
                          <div className="font-serif font-bold text-[16.5px] sm:text-[17px] text-stone-900">
                            {toCurvedQuotes(p.name)}
                          </div>
                          <div className="text-[14.5px] sm:text-[15px] font-serif text-stone-600 mt-1">
                            {toCurvedQuotes(p.role)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =================================================================
              TAB 5: PRINCIPLES, THEOLOGICAL ESSAYS & 7 VICES VS VIRTUES
             ================================================================= */}
          {activeSection === 'principles' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#DDD2C0]">
                <div>
                  <p className="font-cinzel text-xs sm:text-[12.5px] font-bold uppercase tracking-[0.16em] text-[#8B261D]">
                    Catholic Doctrine, Strategy &amp; Asceticism
                  </p>
                  <h2 className="font-serif text-2xl sm:text-[28px] font-bold text-stone-950">
                    {principlesSubTab === 'seven' && '7 Principles of Spiritual Warfare (Fr. Mark Goring)'}
                    {principlesSubTab === 'twelve' && '12 Spiritual Warfare Principles'}
                    {principlesSubTab === 'essays' && 'Essays & Guides on Deliverance and Combat'}
                    {principlesSubTab === 'vices' && 'Seven Capital Vices vs. Remedial Virtues'}
                  </h2>
                </div>

                <div className="inline-flex flex-wrap rounded-lg border border-[#D4C7B2] bg-[#F2EAE0] p-0.5 self-start sm:self-auto shrink-0">
                  {(
                    [
                      { id: 'seven', label: '7 Principles' },
                      { id: 'twelve', label: '12 Principles' },
                      { id: 'essays', label: 'Essays (7)' },
                      { id: 'vices', label: 'Vices vs. Virtues' },
                    ] as const
                  ).map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => setPrinciplesSubTab(sub.id)}
                      className={`px-3 py-2 rounded-md text-xs sm:text-[13px] font-cinzel font-bold transition-colors cursor-pointer ${
                        principlesSubTab === sub.id
                          ? 'bg-[#7F1D1D] text-amber-50'
                          : 'text-stone-700 hover:text-stone-950'
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              </div>

              {principlesSubTab === 'seven' && (
                <div className="space-y-4">
                  <div className="rounded-xl bg-[#F6EFE2] border border-[#E3D7C4] p-5 sm:p-6 space-y-2.5 text-[17.5px] sm:text-[18.5px] font-serif text-stone-800 leading-[1.78]">
                    {SEVEN_PRINCIPLES_INTRO.map((p, i) => (
                      <p key={i}>{toCurvedQuotes(p)}</p>
                    ))}
                  </div>

                  {SEVEN_PRINCIPLES_GORING.map((item) => (
                    <article
                      key={item.number}
                      className="rounded-xl bg-white border border-[#D8CCB8] shadow-xs p-5 sm:p-6 space-y-3"
                    >
                      <div className="flex items-center gap-3 border-b border-[#EFE5D5] pb-2.5">
                        <span className="px-2.5 py-1 rounded bg-[#7F1D1D] text-amber-100 font-cinzel text-xs font-bold shrink-0">
                          Principle #{item.number}
                        </span>
                        <h3 className="font-serif text-xl sm:text-[22px] font-bold text-stone-950">
                          {toCurvedQuotes(item.title)}
                        </h3>
                      </div>
                      <div className="space-y-3">
                        {item.paragraphs.map((p, idx) => (
                          <p
                            key={idx}
                            className="font-serif text-[17.5px] sm:text-[18.5px] leading-[1.8] text-stone-800"
                          >
                            {toCurvedQuotes(p)}
                          </p>
                        ))}
                      </div>
                    </article>
                  ))}

                  <div className="rounded-xl bg-[#1B100C] text-amber-50 border border-amber-500/30 p-5 sm:p-6 space-y-2.5">
                    <h3 className="font-cinzel text-sm font-bold uppercase tracking-[0.15em] text-amber-300">
                      7 Principles Recap
                    </h3>
                    {SEVEN_PRINCIPLES_RECAP.map((p, i) => (
                      <p key={i} className="font-serif text-[16.5px] sm:text-[17.5px] leading-relaxed text-stone-200">
                        {toCurvedQuotes(p)}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {principlesSubTab === 'twelve' && (
                <div className="space-y-4">
                  <div className="rounded-xl bg-[#F6EFE2] border border-[#E3D7C4] p-5 sm:p-6 space-y-2.5 text-[17.5px] sm:text-[18.5px] font-serif text-stone-800 leading-[1.78]">
                    {TWELVE_PRINCIPLES_INTRO.map((p, i) => (
                      <p key={i}>{toCurvedQuotes(p)}</p>
                    ))}
                  </div>

                  {TWELVE_PRINCIPLES_WARFARE.map((item) => (
                    <article
                      key={item.number}
                      className="rounded-xl bg-white border border-[#D8CCB8] shadow-xs p-5 sm:p-6 space-y-3"
                    >
                      <div className="flex items-center gap-3 border-b border-[#EFE5D5] pb-2.5">
                        <span className="px-2.5 py-1 rounded bg-[#1B100C] text-amber-200 font-cinzel text-xs font-bold shrink-0">
                          #{item.number}
                        </span>
                        <h3 className="font-serif text-xl sm:text-[22px] font-bold text-stone-950">
                          {toCurvedQuotes(item.title)}
                        </h3>
                      </div>
                      <div className="space-y-3">
                        {item.paragraphs.map((p, idx) => (
                          <p
                            key={idx}
                            className="font-serif text-[17.5px] sm:text-[18.5px] leading-[1.8] text-stone-800"
                          >
                            {toCurvedQuotes(p)}
                          </p>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {principlesSubTab === 'essays' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                  {/* Essay Index Rail */}
                  <div className="lg:col-span-4 space-y-2.5">
                    {WARFARE_ESSAYS.map((essay) => {
                      const isActive = essay.id === selectedEssay.id;
                      return (
                        <button
                          key={essay.id}
                          type="button"
                          onClick={() => setSelectedEssayId(essay.id)}
                          className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                            isActive
                              ? 'bg-[#1B100C] text-amber-50 border-[#8B261D] shadow-sm'
                              : 'bg-white/80 hover:bg-white text-stone-900 border-[#D8CCB8]'
                          }`}
                        >
                          <div className="font-serif font-bold text-[15.5px] leading-snug">
                            {toCurvedQuotes(essay.title)}
                          </div>
                          <div
                            className={`text-[13px] font-serif mt-1 ${
                              isActive ? 'text-amber-300' : 'text-stone-600'
                            }`}
                          >
                            {toCurvedQuotes(essay.author)}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Essay Reader */}
                  <article className="lg:col-span-8 rounded-xl bg-white border border-[#D8CCB8] shadow-xs overflow-hidden">
                    <div className="px-5 py-4 bg-[#F6EFE2] border-b border-[#E3D7C4] flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <span className="font-cinzel text-xs font-bold uppercase tracking-[0.14em] text-[#8B261D]">
                          {toCurvedQuotes(selectedEssay.author)}
                        </span>
                        <h3 className="font-serif text-2xl sm:text-[26px] font-bold text-stone-950 mt-0.5 leading-snug">
                          {toCurvedQuotes(selectedEssay.title)}
                        </h3>
                        <p className="text-sm font-serif italic text-stone-600 mt-1">
                          {toCurvedQuotes(selectedEssay.meta)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          handleSpeakText(
                            `essay-${selectedEssay.id}`,
                            `${selectedEssay.title}. By ${selectedEssay.author}. ${selectedEssay.paragraphs.join(' ')}`
                          )
                        }
                        className="h-8 px-3 rounded-md border border-[#D4C6B0] bg-white hover:bg-[#FAF6EE] text-stone-800 text-xs font-cinzel font-bold inline-flex items-center gap-1.5 cursor-pointer shrink-0"
                      >
                        {speakingId === `essay-${selectedEssay.id}` ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-[#8B261D]" />
                            <span>Stop</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-[#8B261D]" />
                            <span>Listen</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="p-5 sm:p-6 space-y-4">
                      {selectedEssay.paragraphs.map((p, idx) => (
                        <p
                          key={idx}
                          className="font-serif text-[18px] sm:text-[19px] leading-[1.82] text-stone-800"
                        >
                          {toCurvedQuotes(p)}
                        </p>
                      ))}
                    </div>
                  </article>
                </div>
              )}

              {principlesSubTab === 'vices' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                    {SEVEN_DEADLY_SINS_COMBAT.map((item) => {
                      const isActive = item.id === selectedVice.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSelectedViceId(item.id)}
                          className={`px-3 py-3 rounded-lg border text-left transition-all cursor-pointer ${
                            isActive
                              ? 'bg-[#1B100C] text-amber-50 border-[#8B261D] shadow-sm'
                              : 'bg-white/80 hover:bg-white text-stone-800 border-[#D8CCB8]'
                          }`}
                        >
                          <div className="font-cinzel text-[13px] font-bold leading-tight truncate">
                            {item.vice.split(' ')[0]}
                          </div>
                          <div
                            className={`text-xs font-serif italic mt-0.5 truncate ${
                              isActive ? 'text-amber-300' : 'text-stone-500'
                            }`}
                          >
                            vs. {item.virtue.split(' ')[0]}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="rounded-xl bg-white border border-[#D8CCB8] shadow-xs overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#E3D7C4]">
                      <div className="p-5 sm:p-6 bg-[#FDF6F4] border-b md:border-b-0 md:border-r border-[#E8D5D0]">
                        <span className="font-cinzel text-xs font-bold uppercase tracking-[0.15em] text-[#991B1B]">
                          Capital Vice · {selectedVice.latinVice}
                        </span>
                        <h3 className="font-serif text-2xl sm:text-[26px] font-bold text-stone-950 mt-0.5">
                          {selectedVice.vice}
                        </h3>
                        <p className="font-serif text-[17.5px] sm:text-[18.5px] leading-[1.78] text-stone-800 mt-3">
                          {toCurvedQuotes(selectedVice.enemyTactic)}
                        </p>
                      </div>
                      <div className="p-5 sm:p-6 bg-[#F4F9F5]">
                        <span className="font-cinzel text-xs font-bold uppercase tracking-[0.15em] text-emerald-800">
                          Remedial Virtue · {selectedVice.latinVirtue}
                        </span>
                        <h3 className="font-serif text-2xl sm:text-[26px] font-bold text-stone-950 mt-0.5">
                          {selectedVice.virtue}
                        </h3>
                        <p className="font-serif text-[17.5px] sm:text-[18.5px] leading-[1.78] text-stone-800 mt-3">
                          {toCurvedQuotes(selectedVice.catholicRemedy)}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 space-y-3.5">
                      <div className="rounded-lg bg-[#1B100C] text-amber-50 p-4 sm:p-5 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="space-y-1.5">
                          <span className="font-cinzel text-xs font-bold uppercase tracking-[0.15em] text-amber-300 flex items-center gap-1.5">
                            <Sword className="w-4 h-4" />
                            <span>Scripture Sword-Verse · {selectedVice.scriptureSwordRef}</span>
                          </span>
                          <p className="font-serif italic text-[18px] sm:text-[19px] leading-relaxed text-amber-50">
                            {toCurvedQuotes(`"${selectedVice.scriptureSwordText}"`)}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            handleCopyText(
                              `sword-${selectedVice.id}`,
                              `"${selectedVice.scriptureSwordText}" — ${selectedVice.scriptureSwordRef}`
                            )
                          }
                          className="h-8 px-3 rounded-md bg-amber-900/50 hover:bg-amber-800/70 border border-amber-400/40 text-amber-100 text-xs font-cinzel font-bold inline-flex items-center gap-1.5 shrink-0 cursor-pointer"
                        >
                          {copiedId === `sword-${selectedVice.id}` ? (
                            <Check className="w-3.5 h-3.5 text-emerald-300" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          <span>{copiedId === `sword-${selectedVice.id}` ? 'Copied' : 'Copy'}</span>
                        </button>
                      </div>

                      <div className="flex items-start gap-2.5 text-[16px] sm:text-[17px] font-serif leading-relaxed text-stone-700 bg-[#FAF6EE] border border-[#E3D7C4] rounded-lg px-4 py-3.5">
                        <ScrollText className="w-4 h-4 text-[#8B261D] shrink-0 mt-1" />
                        <p>{toCurvedQuotes(selectedVice.saintWitness)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* =================================================================
              TAB 6: EXORCIST DIARY (MSGR. STEPHEN ROSSETTI — 15 ENTRIES)
             ================================================================= */}
          {activeSection === 'diary' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="pb-3 border-b border-[#DDD2C0] space-y-1">
                <p className="font-cinzel text-xs sm:text-[12.5px] font-bold uppercase tracking-[0.16em] text-[#8B261D]">
                  St. Michael Center for Spiritual Renewal · Msgr. Stephen Rossetti
                </p>
                <h2 className="font-serif text-2xl sm:text-[28px] font-bold text-stone-950">
                  Exorcist Diary Archive ({activeDiaryList.length} Entries)
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                {/* Left Index Rail (4 cols) */}
                <div className="lg:col-span-4 space-y-2 max-h-[640px] overflow-y-auto pr-1">
                  {activeDiaryList.map((entry) => {
                    const isActive = entry.id === selectedDiary.id;
                    return (
                      <button
                        key={entry.id}
                        type="button"
                        onClick={() => setSelectedDiaryId(entry.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg border transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#1B100C] text-amber-50 border-[#8B261D] shadow-sm'
                            : 'bg-white/80 hover:bg-white text-stone-900 border-[#D8CCB8]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span
                            className={`font-cinzel text-xs font-bold uppercase tracking-wider ${
                              isActive ? 'text-amber-300' : 'text-[#8B261D]'
                            }`}
                          >
                            {entry.number}
                          </span>
                          <span
                            className={`text-xs font-serif ${
                              isActive ? 'text-stone-300' : 'text-stone-500'
                            }`}
                          >
                            {entry.date}
                          </span>
                        </div>
                        <div className="font-serif font-bold text-[15.5px] leading-snug mt-1">
                          {toCurvedQuotes(entry.title)}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Right Manuscript Reader (8 cols) */}
                <article className="lg:col-span-8 rounded-xl bg-white border border-[#D8CCB8] shadow-xs overflow-hidden">
                  <div className="px-5 py-4 bg-[#F6EFE2] border-b border-[#E3D7C4] flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-cinzel font-bold uppercase tracking-wider text-[#8B261D]">
                        <span>{selectedDiary.number}</span>
                        <span>·</span>
                        <span>{selectedDiary.date}</span>
                      </div>
                      <h3 className="font-serif text-2xl sm:text-[26px] font-bold text-stone-950 mt-0.5 leading-snug">
                        {toCurvedQuotes(selectedDiary.title)}
                      </h3>
                      <p className="text-sm font-serif italic text-stone-600 mt-1">
                        by {selectedDiary.author}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() =>
                          handleSpeakText(
                            `diary-${selectedDiary.id}`,
                            `${selectedDiary.title}. By ${selectedDiary.author}. ${selectedDiary.paragraphs.join(' ')}`
                          )
                        }
                        className="h-8 px-3 rounded-md border border-[#D4C6B0] bg-white hover:bg-[#FAF6EE] text-stone-800 text-xs font-cinzel font-bold inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        {speakingId === `diary-${selectedDiary.id}` ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5 text-[#8B261D]" />
                            <span>Stop</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-[#8B261D]" />
                            <span>Listen</span>
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleCopyText(
                            `diary-${selectedDiary.id}`,
                            `${selectedDiary.number}: ${selectedDiary.title} (${selectedDiary.date}, ${selectedDiary.author})\n\n${selectedDiary.paragraphs.join('\n\n')}`
                          )
                        }
                        className="h-8 px-3 rounded-md border border-[#D4C6B0] bg-white hover:bg-[#FAF6EE] text-stone-800 text-xs font-cinzel font-bold inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        {copiedId === `diary-${selectedDiary.id}` ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-700" />
                            <span>Copied</span>
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

                  <div className="p-5 sm:p-6 space-y-4">
                    {selectedDiary.paragraphs.map((p, idx) => (
                      <p
                        key={idx}
                        className="font-serif text-[18px] sm:text-[19px] leading-[1.82] text-stone-800"
                      >
                        {toCurvedQuotes(p)}
                      </p>
                    ))}
                  </div>

                  {/* Previous / Next Diary Entry Footer */}
                  <div className="px-5 py-3.5 bg-[#FAF6EE] border-t border-[#ECE2D1] flex items-center justify-between gap-3">
                    <button
                      type="button"
                      disabled={selectedDiaryIndex <= 0}
                      onClick={() => {
                        if (selectedDiaryIndex > 0) {
                          setSelectedDiaryId(activeDiaryList[selectedDiaryIndex - 1].id);
                        }
                      }}
                      className="h-9 px-3.5 rounded-md border border-[#D4C6B0] bg-white hover:bg-[#F6EFE2] disabled:opacity-40 disabled:cursor-not-allowed text-[13px] font-cinzel font-bold text-stone-800 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Previous</span>
                    </button>
                    <span className="text-xs font-cinzel font-bold text-stone-500">
                      Entry {selectedDiaryIndex + 1} of {activeDiaryList.length}
                    </span>
                    <button
                      type="button"
                      disabled={selectedDiaryIndex >= activeDiaryList.length - 1}
                      onClick={() => {
                        if (selectedDiaryIndex < activeDiaryList.length - 1) {
                          setSelectedDiaryId(activeDiaryList[selectedDiaryIndex + 1].id);
                        }
                      }}
                      className="h-9 px-3.5 rounded-md border border-[#D4C6B0] bg-white hover:bg-[#F6EFE2] disabled:opacity-40 disabled:cursor-not-allowed text-[13px] font-cinzel font-bold text-stone-800 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </article>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
