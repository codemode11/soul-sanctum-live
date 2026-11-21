import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Volume2,
  VolumeX,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Settings,
  X,
} from 'lucide-react';
import {
  ALL_CATHOLIC_PROPHECIES,
  JESUS_PROPHECIES,
  SCRIPTURE_END_TIMES_PROPHECIES,
  MARIAN_PROPHECIES,
  COMBINED_SAINTS_MYSTICS_PROPHECIES,
  CATHOLIC_DISCERNMENT_PRINCIPLES,
  VATICAN_2024_NORMS,
  ProphecyEntry,
  ProphecyCategory,
  EcclesiasticalStatus,
  VaticanNormDetermination,
} from '../data/catholicProphecies';
import { SacredReader } from '../utils/speech';

type ActiveSectionTab = 'all' | ProphecyCategory | 'vatican-2024-norms';

const CATEGORY_LABELS: Record<ProphecyCategory, string> = {
  jesus: 'Prophecies of Jesus Christ',
  scripture: 'Catholic Bible (End Times)',
  marian: 'Blessed Virgin Mary',
  saints: 'Saints, Popes & Mystics',
};

const STATUS_INK_CLASS: Record<EcclesiasticalStatus, string> = {
  'Public Revelation (Sacred Scripture)': 'text-[#1E3A8A]',
  'Church-Approved Private Revelation': 'text-[#14532D]',
  'Canonized Saint / Doctor / Papal Witness': 'text-[#78350F]',
  'Vatican Nihil Obstat (2024)': 'text-[#475569]',
  'Unapproved / Historical Discernment Note': 'text-[#9A3412]',
};

const DETERMINATION_TONE_INK: Record<VaticanNormDetermination['tone'], string> = {
  positive: 'text-[#14532D]',
  cautious: 'text-[#78350F]',
  corrective: 'text-[#1E3A8A]',
  restrictive: 'text-[#9A3412]',
};

const ALL_STATUSES: EcclesiasticalStatus[] = [
  'Public Revelation (Sacred Scripture)',
  'Church-Approved Private Revelation',
  'Canonized Saint / Doctor / Papal Witness',
  'Vatican Nihil Obstat (2024)',
  'Unapproved / Historical Discernment Note',
];

export const CatholicProphecyView: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<ActiveSectionTab>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'scripture-olivet-discourse': true,
    'marian-fatima': true,
  });
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isTopSettingsOpen, setIsTopSettingsOpen] = useState(false);

  useEffect(() => {
    return () => {
      SacredReader.stop();
    };
  }, []);

  const fontSizes: Array<'normal' | 'large' | 'xlarge'> = ['normal', 'large', 'xlarge'];
  const increaseFontSize = () => {
    const idx = fontSizes.indexOf(fontSize);
    if (idx < fontSizes.length - 1) setFontSize(fontSizes[idx + 1]);
  };
  const decreaseFontSize = () => {
    const idx = fontSizes.indexOf(fontSize);
    if (idx > 0) setFontSize(fontSizes[idx - 1]);
  };

  const bodyTextClass =
    fontSize === 'normal'
      ? 'text-[15px] sm:text-base leading-[1.78]'
      : fontSize === 'large'
      ? 'text-base sm:text-lg leading-[1.8]'
      : 'text-lg sm:text-xl leading-[1.82]';

  const quoteTextClass =
    fontSize === 'normal'
      ? 'text-base sm:text-lg leading-[1.7]'
      : fontSize === 'large'
      ? 'text-lg sm:text-xl leading-[1.72]'
      : 'text-xl sm:text-2xl leading-[1.75]';

  const filteredEntries = useMemo(() => {
    if (selectedTab === 'vatican-2024-norms') return [];
    const q = searchQuery.trim().toLowerCase();
    return ALL_CATHOLIC_PROPHECIES.filter((entry) => {
      const matchesCat = selectedTab === 'all' || entry.category === selectedTab;
      const matchesStatus = selectedStatus === 'all' || entry.status === selectedStatus;
      if (!matchesCat || !matchesStatus) return false;
      if (!q) return true;
      return (
        entry.title.toLowerCase().includes(q) ||
        entry.subtitle.toLowerCase().includes(q) ||
        entry.source.toLowerCase().includes(q) ||
        entry.locationOrBook.toLowerCase().includes(q) ||
        entry.eraOrYear.toLowerCase().includes(q) ||
        entry.summary.toLowerCase().includes(q) ||
        entry.historicalContext.toLowerCase().includes(q) ||
        entry.relevanceToOurAge.toLowerCase().includes(q) ||
        entry.churchDiscernmentNote.toLowerCase().includes(q) ||
        entry.keyPassage.toLowerCase().includes(q) ||
        entry.themes.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [selectedTab, selectedStatus, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAllVisible = () => {
    const next: Record<string, boolean> = { ...expandedIds };
    filteredEntries.forEach((e) => {
      next[e.id] = true;
    });
    setExpandedIds(next);
  };

  const collapseAllVisible = () => {
    const next: Record<string, boolean> = { ...expandedIds };
    filteredEntries.forEach((e) => {
      next[e.id] = false;
    });
    setExpandedIds(next);
  };

  const handleToggleSpeak = (entry: ProphecyEntry) => {
    if (playingId === entry.id) {
      SacredReader.stop();
      setPlayingId(null);
      return;
    }
    SacredReader.stop();
    setPlayingId(entry.id);
    const spokenText = `${entry.title}. ${entry.subtitle}. Source: ${entry.source}. Era: ${entry.eraOrYear}. Ecclesiastical Status: ${entry.status}. Key Prophetic Witness: ${entry.keyPassage}. Summary: ${entry.summary}. Relevance to This Day and Age: ${entry.relevanceToOurAge}. Church Discernment: ${entry.churchDiscernmentNote}`;
    SacredReader.speak(
      spokenText,
      () => {
        setPlayingId(null);
      }
    );
  };

  const handleToggleSpeakNorms = () => {
    const normsId = 'vatican-2024-norms-doc';
    if (playingId === normsId) {
      SacredReader.stop();
      setPlayingId(null);
      return;
    }
    SacredReader.stop();
    setPlayingId(normsId);
    const determinationsSummary = VATICAN_2024_NORMS.sixDeterminations
      .map((d) => `${d.index}, ${d.latinTitle}, meaning ${d.englishMeaning}: ${d.summary}`)
      .join(' ');
    const spokenText = `${VATICAN_2024_NORMS.officialTitle}. Issued by the ${VATICAN_2024_NORMS.issuingBody}, published ${VATICAN_2024_NORMS.publishedDate}, effective ${VATICAN_2024_NORMS.effectiveDate}. ${VATICAN_2024_NORMS.overview} ${VATICAN_2024_NORMS.structuralShift} The six official pastoral determinations are: ${determinationsSummary}`;
    SacredReader.speak(
      spokenText,
      () => {
        setPlayingId(null);
      }
    );
  };

  const handleCopyNorms = () => {
    const formatted = [
      VATICAN_2024_NORMS.officialTitle.toUpperCase(),
      `${VATICAN_2024_NORMS.issuingBody}`,
      `Approved: ${VATICAN_2024_NORMS.approvedDate} · Published: ${VATICAN_2024_NORMS.publishedDate} · Effective: ${VATICAN_2024_NORMS.effectiveDate}`,
      '',
      `OVERVIEW:\n${VATICAN_2024_NORMS.overview}`,
      '',
      `KEY STRUCTURAL SHIFT:\n${VATICAN_2024_NORMS.structuralShift}`,
      '',
      'SIX OFFICIAL PASTORAL DETERMINATIONS:',
      ...VATICAN_2024_NORMS.sixDeterminations.map(
        (d) => `${d.index}. ${d.latinTitle} (${d.englishMeaning}) — ${d.summary} ${d.pastoralEffect}`
      ),
      '',
      'POSITIVE CRITERIA (ARTICLE 14):',
      ...VATICAN_2024_NORMS.positiveCriteria.map((c) => `${c.index}. ${c.title}: ${c.detail}`),
      '',
      'NEGATIVE CRITERIA (ARTICLE 15):',
      ...VATICAN_2024_NORMS.negativeCriteria.map((c) => `${c.index}. ${c.title}: ${c.detail}`),
      '',
      'Soul Sanctum — Catholic Prophecy Archive',
    ].join('\n');
    navigator.clipboard.writeText(formatted);
    setCopiedId('vatican-2024-norms-doc');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleCopy = (entry: ProphecyEntry) => {
    const formatted = [
      `${entry.title.toUpperCase()}`,
      entry.subtitle,
      `Source: ${entry.source} · ${entry.eraOrYear} · ${entry.locationOrBook}`,
      `Ecclesiastical Status: ${entry.status} (${entry.statusDetail})`,
      '',
      `“${entry.keyPassage}” — ${entry.passageReference}`,
      '',
      `OVERVIEW:\n${entry.summary}`,
      '',
      `HISTORICAL CONTEXT:\n${entry.historicalContext}`,
      '',
      `BEARING ON THIS DAY AND AGE:\n${entry.relevanceToOurAge}`,
      '',
      `CHURCH DISCERNMENT:\n${entry.churchDiscernmentNote}`,
      `Catechism References: ${entry.catechismRefs.join(', ')}`,
      '',
      'Soul Sanctum — Catholic Prophecy Archive',
    ].join('\n');
    navigator.clipboard.writeText(formatted);
    setCopiedId(entry.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const isViewingNorms = selectedTab === 'vatican-2024-norms';
  const hasActiveSearchOrFilter =
    searchQuery.trim() !== '' || selectedStatus !== 'all';

  return (
    <div className="max-w-4xl mx-auto p-3 sm:p-6 md:p-8 rounded-xl bg-[#F6F2EA]/88 backdrop-blur-xl backdrop-saturate-150 border border-[#DFD6C7] ring-1 ring-inset ring-white/60 shadow-[0_8px_32px_0_rgba(51,65,85,0.12)] space-y-6 mb-12 animate-fadeIn text-stone-900">
      {/* Institutional Archival Banner & Attached Settings Drop-Down (Daily Mass Readings Pattern) */}
      <div className="bg-[#FBF9F5]/85 backdrop-blur-xl backdrop-saturate-150 rounded-xl shadow-md border border-[#D8CFC0] relative z-20">
        <header
          className={`sanctum-top-banner px-5 pt-4 pb-4 sm:px-7 min-h-[164px] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-[#F9F6F0] flex flex-col justify-between relative overflow-hidden ${
            isTopSettingsOpen ? 'rounded-t-xl' : 'rounded-xl'
          }`}
        >
          <div className="pointer-events-none absolute -right-14 -bottom-14 w-72 h-44 rounded-full bg-[#EAE2D3]/12 blur-3xl" />

          <div className="relative z-10 space-y-2">
            <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#DFD5C3]">
              Prophetia Catholica · Sacred Scripture, Marian Messages &amp; Saints
            </p>
            <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#FBF9F5] tracking-wide">
              Catholic Prophecy
            </h1>
            <p className="text-xs sm:text-sm text-[#EAE2D3] font-serif-sacred max-w-2xl leading-relaxed">
              “Do not quench the Spirit. Do not despise prophetic utterances. Test everything; retain what is good.” (1 Thess 5:19–21). A curated archive of the prophecies of Jesus Christ, Catholic Biblical End Times Scriptures, messages of the Blessed Virgin Mary, and witnesses of canonized Saints, Doctors, Popes, and mystics bearing upon this day and age—discerned faithfully under the Catechism and the May 2024 Vatican Norms.
            </p>
          </div>

          {/* Lower-Right Banner Controls: May 2024 Vatican Norms + Settings Drop-Down */}
          <div className="relative z-10 flex items-center justify-end gap-2 sm:gap-2.5 mt-auto pt-4 shrink-0">
            <button
              type="button"
              onClick={() =>
                setSelectedTab(isViewingNorms ? 'all' : 'vatican-2024-norms')
              }
              className={`h-8 inline-flex items-center gap-1.5 px-3 rounded-md border text-xs font-cinzel tracking-wide transition-colors cursor-pointer shrink-0 ${
                isViewingNorms
                  ? 'bg-[#F4EFE6] text-slate-900 border-[#DFD5C3] font-bold'
                  : 'border-slate-600/80 bg-slate-950/70 hover:bg-slate-950 text-[#EAE2D3] hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 shrink-0" />
              <span>
                {isViewingNorms ? 'Back to Archive' : 'May 2024 Vatican Norms'}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setIsTopSettingsOpen((prev) => !prev)}
              aria-expanded={isTopSettingsOpen}
              className={`h-8 flex items-center gap-1 px-2.5 rounded-md transition-all cursor-pointer shrink-0 border ${
                isTopSettingsOpen
                  ? 'bg-slate-950 text-[#FBF9F5] border-[#DFD5C3] ring-2 ring-[#DFD5C3]/35'
                  : 'bg-slate-950/75 hover:bg-slate-950 text-[#DFD5C3] hover:text-white border-slate-600/80 hover:border-[#DFD5C3]/80'
              }`}
              title={isTopSettingsOpen ? 'Hide Search & Settings' : 'Show Search & Settings'}
              aria-label={isTopSettingsOpen ? 'Hide Search & Settings' : 'Show Search & Settings'}
            >
              <Settings className="w-3.5 h-3.5 text-[#DFD5C3] shrink-0" />
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#DFD5C3] shrink-0 transition-transform duration-200 ${
                  isTopSettingsOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
        </header>

        {/* Banner Settings & Search Drop-Down Drawer */}
        {isTopSettingsOpen && (
          <div className="px-5 py-4 sm:px-6 bg-[#F4EFE6]/95 backdrop-blur-md border-t border-[#D8CFC0] flex flex-col gap-4 rounded-b-xl animate-fadeIn">
            {/* Section / Category Selector */}
            <div className="space-y-2">
              <span className="block font-sans uppercase tracking-[0.14em] text-[11px] font-semibold text-stone-600">
                Browse Section
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 bg-[#EAE2D3] p-1 rounded-xl border border-[#D4C9B6]">
                {(
                  [
                    { id: 'all', label: `All (${ALL_CATHOLIC_PROPHECIES.length})` },
                    { id: 'jesus', label: `Jesus (${JESUS_PROPHECIES.length})` },
                    { id: 'scripture', label: `Bible (${SCRIPTURE_END_TIMES_PROPHECIES.length})` },
                    { id: 'marian', label: `Virgin Mary (${MARIAN_PROPHECIES.length})` },
                    { id: 'saints', label: `Saints & Mystics (${COMBINED_SAINTS_MYSTICS_PROPHECIES.length})` },
                    { id: 'vatican-2024-norms', label: '2024 Vatican Norms' },
                  ] as const
                ).map((tab) => {
                  const active = selectedTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setSelectedTab(tab.id)}
                      className={`px-2 py-2 rounded-lg text-xs font-cinzel transition-colors cursor-pointer ${
                        active
                          ? 'bg-slate-900 text-[#FBF9F5] font-bold shadow-xs'
                          : 'text-stone-700 hover:text-stone-950 hover:bg-[#FBF9F5]/80 font-semibold'
                      }`}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search & Ecclesiastical Filter Row */}
            <div className="space-y-2 pt-3 border-t border-[#D8CFC0]">
              <div className="flex items-center justify-between">
                <span className="font-sans uppercase tracking-[0.14em] text-[11px] font-semibold text-stone-600">
                  Search &amp; Ecclesiastical Filter
                </span>
                {hasActiveSearchOrFilter && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedStatus('all');
                    }}
                    className="inline-flex items-center gap-1 text-xs font-serif text-[#9A3412] hover:text-stone-950 underline underline-offset-4 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                    <span>Clear filters</span>
                  </button>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1 min-w-0">
                  <Search className="w-4 h-4 text-stone-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search Jesus, Marie-Julie Jahenny, Fátima, Kindelmann, Esperanza, Marthe Robin, Revelation..."
                    value={searchQuery}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSearchQuery(val);
                      if (val.trim() !== '' && selectedTab === 'vatican-2024-norms') {
                        setSelectedTab('all');
                      }
                    }}
                    className="w-full pl-9 pr-8 py-2 rounded-lg bg-[#FBF9F5] border border-[#C8BBA6] text-stone-900 text-xs sm:text-sm font-serif placeholder:text-stone-500 focus:outline-hidden focus:border-slate-800"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear search"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <select
                  value={selectedStatus}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value);
                    if (e.target.value !== 'all' && selectedTab === 'vatican-2024-norms') {
                      setSelectedTab('all');
                    }
                  }}
                  aria-label="Filter by Ecclesiastical Status"
                  className="px-3 py-2 rounded-lg bg-[#FBF9F5] border border-[#C8BBA6] text-stone-900 text-xs font-serif focus:outline-hidden focus:border-slate-800 cursor-pointer"
                >
                  <option value="all">All Ecclesiastical Statuses</option>
                  {ALL_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Reading Settings Row: Results Count, Expand/Collapse, and Text Size Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#D8CFC0] text-xs text-stone-700">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                {!isViewingNorms ? (
                  <>
                    <span className="font-sans uppercase tracking-[0.14em] text-[11px] text-stone-600">
                      Showing {filteredEntries.length} of {ALL_CATHOLIC_PROPHECIES.length} entries
                    </span>
                    <span className="text-stone-400" aria-hidden="true">·</span>
                    <button
                      type="button"
                      onClick={expandAllVisible}
                      className="font-serif text-stone-700 hover:text-stone-950 underline underline-offset-4 cursor-pointer"
                    >
                      Expand all
                    </button>
                    <button
                      type="button"
                      onClick={collapseAllVisible}
                      className="font-serif text-stone-700 hover:text-stone-950 underline underline-offset-4 cursor-pointer"
                    >
                      Collapse all
                    </button>
                  </>
                ) : (
                  <span className="font-sans uppercase tracking-[0.14em] text-[11px] text-stone-600">
                    May 17, 2024 DDF Norms · Official Magisterial Reference
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2.5">
                <span className="font-serif font-medium text-xs text-stone-700">
                  Text Size:
                </span>
                <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-md border border-slate-800 shadow-2xs">
                  <button
                    type="button"
                    onClick={decreaseFontSize}
                    disabled={fontSize === 'normal'}
                    className="w-7 h-7 flex items-center justify-center rounded-md text-xs font-bold text-[#EAE2D3] hover:text-white bg-slate-800 hover:bg-slate-700 disabled:opacity-35 disabled:hover:bg-slate-800 cursor-pointer transition-all border border-slate-700"
                    title="Decrease font size"
                    aria-label="Decrease font size"
                  >
                    A-
                  </button>
                  <button
                    type="button"
                    onClick={() => setFontSize('normal')}
                    className={`px-2 py-1 text-xs rounded-md font-semibold transition-all cursor-pointer ${
                      fontSize === 'normal'
                        ? 'bg-[#F4EFE6] text-slate-950 font-bold border border-[#DFD5C3]'
                        : 'bg-slate-800 text-[#EAE2D3] hover:bg-slate-700 border border-slate-700'
                    }`}
                    title="Default text size"
                  >
                    A
                  </button>
                  <button
                    type="button"
                    onClick={() => setFontSize('large')}
                    className={`px-2 py-1 text-xs rounded-md font-semibold transition-all cursor-pointer ${
                      fontSize === 'large'
                        ? 'bg-[#F4EFE6] text-slate-950 font-bold border border-[#DFD5C3]'
                        : 'bg-slate-800 text-[#EAE2D3] hover:bg-slate-700 border border-slate-700'
                    }`}
                    title="Large text size"
                  >
                    A+
                  </button>
                  <button
                    type="button"
                    onClick={() => setFontSize('xlarge')}
                    className={`px-2 py-1 text-xs rounded-md font-semibold transition-all cursor-pointer ${
                      fontSize === 'xlarge'
                        ? 'bg-[#F4EFE6] text-slate-950 font-bold border border-[#DFD5C3]'
                        : 'bg-slate-800 text-[#EAE2D3] hover:bg-slate-700 border border-slate-700'
                    }`}
                    title="Extra large text size"
                  >
                    A++
                  </button>
                  <button
                    type="button"
                    onClick={increaseFontSize}
                    disabled={fontSize === 'xlarge'}
                    className="w-7 h-7 flex items-center justify-center rounded-md text-xs font-bold text-[#EAE2D3] hover:text-white bg-slate-800 hover:bg-slate-700 disabled:opacity-35 disabled:hover:bg-slate-800 cursor-pointer transition-all border border-slate-700"
                    title="Increase font size"
                    aria-label="Increase font size"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Subtle Unboxed Active Filter / Section Notice When Settings Drawer Is Closed */}
      {!isTopSettingsOpen && (selectedTab !== 'all' || hasActiveSearchOrFilter) && !isViewingNorms && (
        <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs font-serif text-stone-600">
          <span>
            {selectedTab !== 'all' ? `${CATEGORY_LABELS[selectedTab]} · ` : ''}
            Showing {filteredEntries.length} of {ALL_CATHOLIC_PROPHECIES.length} entries
            {searchQuery.trim() ? ` matching “${searchQuery.trim()}”` : ''}
            {selectedStatus !== 'all' ? ` · ${selectedStatus}` : ''}
          </span>
          <button
            type="button"
            onClick={() => {
              setSelectedTab('all');
              setSearchQuery('');
              setSelectedStatus('all');
            }}
            className="text-[#9A3412] hover:text-stone-950 underline underline-offset-4 cursor-pointer"
          >
            Show all ({ALL_CATHOLIC_PROPHECIES.length})
          </button>
        </div>
      )}

      {/* MAY 2024 VATICAN NORMS FULL ARCHIVAL REFERENCE */}
      {isViewingNorms ? (
        <section
          aria-label="May 2024 Vatican Norms for Discerning Alleged Supernatural Phenomena"
          className="space-y-6"
        >
          {/* Document Header & Overview Card */}
          <article className="rounded-xl bg-[#FBF9F5] border border-[#D8CFC0] px-5 py-6 sm:px-7 sm:py-7 shadow-2xs space-y-5">
            <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-[#E7DFD0]">
              <div className="space-y-1 min-w-0 flex-1">
                <p className="text-[11px] font-sans uppercase tracking-[0.16em] text-[#1E3A8A] font-semibold">
                  Dicastery for the Doctrine of the Faith · Published {VATICAN_2024_NORMS.publishedDate} · Effective {VATICAN_2024_NORMS.effectiveDate}
                </p>
                <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900 leading-snug pt-0.5">
                  {VATICAN_2024_NORMS.officialTitle}
                </h2>
                <p className="font-serif-sacred text-sm text-stone-600 italic">
                  {VATICAN_2024_NORMS.issuingBody}
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={handleToggleSpeakNorms}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-sans transition-colors cursor-pointer ${
                    playingId === 'vatican-2024-norms-doc'
                      ? 'bg-slate-900 text-[#FBF9F5] border-slate-900'
                      : 'bg-[#F4EFE6] text-stone-700 border-[#D4C9B6] hover:bg-[#EAE2D3] hover:text-stone-950'
                  }`}
                >
                  {playingId === 'vatican-2024-norms-doc' ? (
                    <VolumeX className="w-3.5 h-3.5" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5" />
                  )}
                  <span className="hidden sm:inline">
                    {playingId === 'vatican-2024-norms-doc' ? 'Stop' : 'Listen'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={handleCopyNorms}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border bg-[#F4EFE6] text-stone-700 border-[#D4C9B6] hover:bg-[#EAE2D3] hover:text-stone-950 text-xs font-sans transition-colors cursor-pointer"
                >
                  {copiedId === 'vatican-2024-norms-doc' ? (
                    <Check className="w-3.5 h-3.5 text-[#14532D]" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span className="hidden sm:inline">
                    {copiedId === 'vatican-2024-norms-doc' ? 'Copied' : 'Copy'}
                  </span>
                </button>
              </div>
            </div>

            {/* Accession Metadata */}
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 pb-4 border-b border-[#EAE2D3] text-xs font-serif">
              <div>
                <dt className="inline font-sans uppercase tracking-[0.14em] text-[10px] text-stone-500 mr-2">
                  Papal Approval
                </dt>
                <dd className="inline text-stone-800">{VATICAN_2024_NORMS.approvedDate}</dd>
              </div>
              <div>
                <dt className="inline font-sans uppercase tracking-[0.14em] text-[10px] text-stone-500 mr-2">
                  Supersedes
                </dt>
                <dd className="inline text-stone-800">{VATICAN_2024_NORMS.replaces}</dd>
              </div>
            </dl>

            {/* Overview & Structural Shift */}
            <div className="max-w-2xl space-y-4">
              <p className={`font-serif-sacred text-stone-800 ${bodyTextClass}`}>
                {VATICAN_2024_NORMS.overview}
              </p>
              <div className="py-4 border-y border-[#DFD6C5] space-y-1.5">
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#78350F]">
                  Key Structural Shift From the 1978 Norms
                </p>
                <p className={`font-serif-sacred text-stone-800 ${bodyTextClass}`}>
                  {VATICAN_2024_NORMS.structuralShift}
                </p>
              </div>
            </div>
          </article>

          {/* The Six Official Pastoral Determinations */}
          <article className="rounded-xl bg-[#FBF9F5] border border-[#D8CFC0] px-5 py-6 sm:px-7 sm:py-7 shadow-2xs space-y-5">
            <div className="pb-3 border-b border-[#E7DFD0]">
              <p className="text-[11px] font-sans uppercase tracking-[0.16em] text-stone-500">
                Part I · Articles 17–22 · Prudential Conclusions
              </p>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-stone-900 mt-1">
                The Six Official Pastoral Determinations
              </h3>
            </div>

            <div className="divide-y divide-[#EAE2D3]">
              {VATICAN_2024_NORMS.sixDeterminations.map((det) => (
                <div key={det.index} className="py-4 first:pt-1 last:pb-1 space-y-1.5">
                  <p className="text-[11px] font-sans uppercase tracking-[0.16em] text-stone-500 flex flex-wrap items-center gap-x-2">
                    <span className="font-semibold text-stone-700">{det.index}</span>
                    <span aria-hidden="true">/</span>
                    <span className={`font-semibold ${DETERMINATION_TONE_INK[det.tone]}`}>
                      {det.englishMeaning}
                    </span>
                  </p>
                  <h4 className="font-cinzel text-base sm:text-lg font-bold text-stone-900 italic">
                    {det.latinTitle}
                  </h4>
                  <p className={`font-serif-sacred text-stone-800 max-w-2xl ${bodyTextClass}`}>
                    {det.summary}
                  </p>
                  <p className="text-sm font-serif-sacred text-stone-600 max-w-2xl leading-relaxed">
                    <span className="font-sans text-[11px] uppercase tracking-[0.13em] text-stone-500 mr-1.5">
                      Pastoral Effect:
                    </span>
                    {det.pastoralEffect}
                  </p>
                </div>
              ))}
            </div>
          </article>

          {/* Positive (Art. 14) & Negative (Art. 15) Criteria Side-by-Side */}
          <article className="rounded-xl bg-[#FBF9F5] border border-[#D8CFC0] px-5 py-6 sm:px-7 sm:py-7 shadow-2xs space-y-5">
            <div className="pb-3 border-b border-[#E7DFD0]">
              <p className="text-[11px] font-sans uppercase tracking-[0.16em] text-stone-500">
                Cumulative Discernment Criteria · Articles 14 &amp; 15
              </p>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-stone-900 mt-1">
                Positive Indicators &amp; Negative Red Flags
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Positive Criteria */}
              <div className="space-y-4">
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#14532D] pb-2 border-b border-[#E2D9C8]">
                  Article 14 · Positive Criteria
                </p>
                <div className="space-y-4">
                  {VATICAN_2024_NORMS.positiveCriteria.map((item) => (
                    <div key={item.index} className="space-y-1">
                      <p className="font-cinzel text-sm font-bold text-stone-900">
                        <span className="font-sans text-[11px] text-[#14532D] mr-2">
                          {item.index}
                        </span>
                        {item.title}
                      </p>
                      <p className="text-sm font-serif-sacred text-stone-700 leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Negative Criteria */}
              <div className="space-y-4">
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9A3412] pb-2 border-b border-[#E2D9C8]">
                  Article 15 · Negative Criteria (Red Flags)
                </p>
                <div className="space-y-4">
                  {VATICAN_2024_NORMS.negativeCriteria.map((item) => (
                    <div key={item.index} className="space-y-1">
                      <p className="font-cinzel text-sm font-bold text-stone-900">
                        <span className="font-sans text-[11px] text-[#9A3412] mr-2">
                          {item.index}
                        </span>
                        {item.title}
                      </p>
                      <p className="text-sm font-serif-sacred text-stone-700 leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>

          {/* Procedural Safeguards & Catechism Foundations */}
          <article className="rounded-xl bg-[#FBF9F5] border border-[#D8CFC0] px-5 py-6 sm:px-7 sm:py-7 shadow-2xs space-y-6">
            <div className="space-y-3">
              <p className="text-[11px] font-sans uppercase tracking-[0.16em] text-stone-500">
                Procedural Governance &amp; Pastoral Safeguards
              </p>
              <ul className="space-y-2.5 max-w-2xl">
                {VATICAN_2024_NORMS.proceduralSafeguards.map((rule, i) => (
                  <li
                    key={i}
                    className={`font-serif-sacred text-stone-800 pb-2.5 border-b border-[#EDE6D8] last:border-b-0 ${bodyTextClass}`}
                  >
                    <span className="font-sans text-[11px] font-semibold text-[#78350F] mr-2">
                      {String(i + 1).padStart(2, '0')} /
                    </span>
                    {rule}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-4 border-t border-[#DFD6C5] space-y-4">
              <div>
                <p className="text-[11px] font-sans uppercase tracking-[0.16em] text-stone-500">
                  Foundational Magisterial Principles
                </p>
                <h3 className="font-cinzel text-base sm:text-lg font-bold text-stone-900 mt-0.5">
                  Sacred Scripture &amp; Catechism Foundations
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                {CATHOLIC_DISCERNMENT_PRINCIPLES.map((item) => (
                  <div key={item.id} className="space-y-1">
                    <p className="text-[11px] font-sans uppercase tracking-[0.16em] text-[#78350F]">
                      {item.index} / {item.citation}
                    </p>
                    <h4 className="font-cinzel text-sm font-bold text-stone-900">
                      {item.title}
                    </h4>
                    <p className="text-sm font-serif-sacred text-stone-700 leading-relaxed">
                      {item.summary}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </section>
      ) : filteredEntries.length === 0 ? (
        <div className="rounded-xl bg-[#FBF9F5] border border-[#D8CFC0] p-10 text-center space-y-2">
          <p className="font-cinzel text-base font-bold text-stone-800">
            No Matching Prophetic Entries Found
          </p>
          <p className="font-serif-sacred text-sm text-stone-600">
            Try clearing your search query or switching to “All Ecclesiastical Statuses.”
          </p>
        </div>
      ) : (
        /* Archival Catalogue Entries */
        <div className="space-y-5">
          {filteredEntries.map((entry, idx) => {
            const isExpanded = Boolean(expandedIds[entry.id]);
            const isPlaying = playingId === entry.id;
            const isCopied = copiedId === entry.id;
            const indexNum = String(idx + 1).padStart(2, '0');
            const statusColor = STATUS_INK_CLASS[entry.status] || 'text-stone-700';

            return (
              <article
                key={entry.id}
                className="rounded-xl bg-[#FBF9F5] border border-[#D8CFC0] px-5 py-6 sm:px-7 sm:py-7 shadow-2xs transition-colors"
              >
                {/* Unboxed Archival Kicker & Action Row */}
                <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-[#E7DFD0]">
                  <div className="space-y-1 min-w-0 flex-1">
                    <p className="text-[11px] font-sans uppercase tracking-[0.16em] text-stone-500 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <span className="font-semibold text-stone-700">{indexNum}</span>
                      <span aria-hidden="true">/</span>
                      <span>{CATEGORY_LABELS[entry.category]}</span>
                      <span aria-hidden="true">·</span>
                      <span>{entry.eraOrYear}</span>
                      <span aria-hidden="true">·</span>
                      <span className={`font-semibold ${statusColor}`}>{entry.status}</span>
                    </p>
                    <h2 className="font-cinzel text-lg sm:text-xl font-bold text-stone-900 leading-snug pt-0.5">
                      {entry.title}
                    </h2>
                    <p className="font-serif-sacred text-sm text-stone-600 italic">
                      {entry.subtitle}
                    </p>
                  </div>

                  {/* Audio (Kore) & Copy Controls */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleToggleSpeak(entry)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-sans transition-colors cursor-pointer ${
                        isPlaying
                          ? 'bg-slate-900 text-[#FBF9F5] border-slate-900'
                          : 'bg-[#F4EFE6] text-stone-700 border-[#D4C9B6] hover:bg-[#EAE2D3] hover:text-stone-950'
                      }`}
                      title={isPlaying ? 'Stop audio narration' : 'Listen with Kore voice'}
                    >
                      {isPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      <span className="hidden sm:inline">{isPlaying ? 'Stop' : 'Listen'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCopy(entry)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border bg-[#F4EFE6] text-stone-700 border-[#D4C9B6] hover:bg-[#EAE2D3] hover:text-stone-950 text-xs font-sans transition-colors cursor-pointer"
                      title="Copy archival summary"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-[#14532D]" /> : <Copy className="w-3.5 h-3.5" />}
                      <span className="hidden sm:inline">{isCopied ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {/* Unboxed Accession Metadata Line */}
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 py-3.5 border-b border-[#EAE2D3] text-xs font-serif">
                  <div>
                    <dt className="inline font-sans uppercase tracking-[0.14em] text-[10px] text-stone-500 mr-2">
                      Witness / Author
                    </dt>
                    <dd className="inline text-stone-800">{entry.source}</dd>
                  </div>
                  <div>
                    <dt className="inline font-sans uppercase tracking-[0.14em] text-[10px] text-stone-500 mr-2">
                      Source / Location
                    </dt>
                    <dd className="inline text-stone-800">{entry.locationOrBook}</dd>
                  </div>
                </dl>

                {/* Editorial Pull Quote (Hairline Top/Bottom Dividers, No Thick Left Accent Bar) */}
                <figure className="my-5 py-4 border-y border-[#DFD6C5] max-w-2xl">
                  <blockquote className={`font-serif-sacred italic text-stone-800 ${quoteTextClass}`}>
                    “{entry.keyPassage}”
                  </blockquote>
                  <figcaption className="mt-2 text-xs font-sans uppercase tracking-[0.12em] text-stone-500">
                    — {entry.passageReference}
                  </figcaption>
                </figure>

                {/* Core Summary */}
                <div className="max-w-2xl space-y-3">
                  <p className={`font-serif-sacred text-stone-800 ${bodyTextClass}`}>
                    {entry.summary}
                  </p>
                  <p className="text-[11px] font-sans uppercase tracking-[0.13em] text-stone-500 pt-1">
                    Themes: {entry.themes.join(' · ')}
                  </p>
                </div>

                {/* Expandable Full Archival Dossier */}
                {isExpanded && (
                  <div className="mt-6 pt-5 border-t border-[#DFD6C5] space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <h3 className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-500">
                          Historical &amp; Scriptural Context
                        </h3>
                        <p className={`font-serif-sacred text-stone-700 ${bodyTextClass}`}>
                          {entry.historicalContext}
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#78350F]">
                          Bearing on This Day &amp; Age
                        </h3>
                        <p className={`font-serif-sacred text-stone-800 ${bodyTextClass}`}>
                          {entry.relevanceToOurAge}
                        </p>
                      </div>
                    </div>

                    {/* Magisterial & Catechism Discernment Box (Hairline Border, Warm Paper Fill) */}
                    <div className="rounded-lg bg-[#F4EFE6]/85 border border-[#D8CFC0] p-4 sm:p-5 space-y-2">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-stone-700">
                          Church Discernment &amp; Doctrinal Standing
                        </h3>
                        <span className="text-[11px] font-sans uppercase tracking-[0.12em] text-stone-500">
                          {entry.catechismRefs.join(' · ')}
                        </span>
                      </div>
                      <p className="text-xs font-sans font-medium text-stone-700">
                        {entry.statusDetail}
                      </p>
                      <p className="text-sm font-serif-sacred text-stone-700 leading-relaxed">
                        {entry.churchDiscernmentNote}
                      </p>
                    </div>
                  </div>
                )}

                {/* Subtle Editorial Disclosure Toggle */}
                <div className="mt-5 pt-3 border-t border-[#EDE6D8] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => toggleExpand(entry.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-cinzel font-bold uppercase tracking-[0.12em] text-slate-800 hover:text-stone-950 cursor-pointer transition-colors"
                  >
                    <span>
                      {isExpanded ? 'Hide Historical Context & Discernment' : 'Read Context, Bearing on Our Age & Discernment'}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  <span className="text-[11px] font-sans text-stone-500 hidden sm:inline">
                    {entry.catechismRefs[0]}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Editorial Closing Colophon */}
      <footer className="rounded-xl bg-[#FBF9F5] border border-[#D8CFC0] px-5 py-4 text-center space-y-1">
        <p className="font-cinzel text-xs font-bold uppercase tracking-[0.16em] text-stone-700">
          Maranatha — Come, Lord Jesus (Revelation 22:20)
        </p>
        <p className="text-xs font-serif-sacred text-stone-600 max-w-2xl mx-auto leading-relaxed">
          In complete obedience to the Magisterium of the Catholic Church, all private revelations cited in this archive are presented purely as historical and devotional witnesses subject to final ecclesiastical judgment under the Catechism (§67) and the May 17, 2024 Dicastery for the Doctrine of the Faith Norms.
        </p>
      </footer>
    </div>
  );
};
