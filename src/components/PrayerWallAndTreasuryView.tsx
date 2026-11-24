import React, { useState, useRef } from 'react';
import { 
  Flame, 
  Plus, 
  Search, 
  Heart, 
  Share2, 
  Sparkles, 
  Check, 
  BookOpen, 
  Volume2, 
  VolumeX, 
  Copy, 
  X,
  Cross,
  ChevronLeft,
  ChevronRight,
  Award,
  ScrollText,
  UserCheck,
  Settings,
  ChevronDown
} from 'lucide-react';
import { CatholicPrayer, PrayerRequest, PrayerCategory } from '../types';
import { CATHOLIC_PRAYERS_DATABASE } from '../data/prayers';
import { INITIAL_PRAYER_REQUESTS } from '../data/prayerRequests';
import { bellSynth } from '../utils/audioSynth';
import { SacredReader, CURATED_SANCTUM_VOICES } from '../utils/speech';
import treasuryWoodenKneelerImg from '../assets/images/treasury_kneeler_rotated_to_crucifix_1795508842899.jpg';

interface PrayerWallAndTreasuryViewProps {
  initialSection?: 'wall' | 'treasury';
}

export const PrayerWallAndTreasuryView: React.FC<PrayerWallAndTreasuryViewProps> = ({
  initialSection = 'wall'
}) => {
  const activeSection = initialSection;
  
  // Prayer Requests Wall state
  const [requests, setRequests] = useState<PrayerRequest[]>(INITIAL_PRAYER_REQUESTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [newRequestModalOpen, setNewRequestModalOpen] = useState(false);
  
  // New request form state
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<PrayerCategory>('Healing');

  // Prayers Treasury state — uses unified verified voice catalog (Jenny default)
  const TREASURY_LEADER_OPTIONS = CURATED_SANCTUM_VOICES;

  const [selectedPrayer, setSelectedPrayer] = useState<CatholicPrayer>(CATHOLIC_PRAYERS_DATABASE[1]); // Our Father
  const [prayerSearch, setPrayerSearch] = useState('');
  const [selectedPrayerCategory, setSelectedPrayerCategory] = useState<string>('All');
  const [showIndulgenceGuide, setShowIndulgenceGuide] = useState(false);
  const [isTreasurySettingsOpen, setIsTreasurySettingsOpen] = useState(false);
  const [copiedPrayerId, setCopiedPrayerId] = useState<string | null>(null);
  const [speakingPrayerId, setSpeakingPrayerId] = useState<string | null>(null);
  const [treasuryLeaderVoice, setTreasuryLeaderVoice] = useState<string>(() => {
    if (typeof localStorage !== 'undefined') {
      const migrated = localStorage.getItem('soul_sanctum_treasury_jenny_v2');
      if (!migrated) {
        localStorage.setItem('soul_sanctum_treasury_jenny_v2', '1');
        localStorage.setItem('soul_sanctum_treasury_prayer_leader', 'persona-jenny');
        return 'persona-jenny';
      }
      const saved = localStorage.getItem('soul_sanctum_treasury_prayer_leader');
      if (saved && TREASURY_LEADER_OPTIONS.some(v => v.id === saved)) {
        return saved;
      }
    }
    return 'persona-jenny';
  });
  const treasuryStripRef = useRef<HTMLDivElement>(null);

  const activeLeader =
    TREASURY_LEADER_OPTIONS.find(v => v.id === treasuryLeaderVoice) || TREASURY_LEADER_OPTIONS[0];

  React.useEffect(() => {
    return () => {
      SacredReader.stop();
    };
  }, []);

  React.useEffect(() => {
    if (activeSection !== 'treasury' && speakingPrayerId) {
      SacredReader.stop();
      setSpeakingPrayerId(null);
    }
  }, [activeSection, speakingPrayerId]);

  React.useEffect(() => {
    if (speakingPrayerId && speakingPrayerId !== selectedPrayer.id) {
      SacredReader.stop();
      setSpeakingPrayerId(null);
    }
  }, [selectedPrayer.id, speakingPrayerId]);

  const prayerCategories = [
    'All',
    'Indulgenced Prayers',
    'Plenary Indulgence',
    'Partial Indulgence',
    'Prayers of the Saints',
    'Daily and Traditional',
    'Marian',
    'Eucharistic and Adoration',
    'Saints and Intercession',
    'Prayers for Priests',
    'Litanies',
    'Acts of the Theological Virtues',
    'Prayers for the Faithful Departed'
  ];

  const matchesPrayerCategory = (p: CatholicPrayer, cat: string): boolean => {
    if (cat === 'All') return true;
    if (cat === 'Indulgenced Prayers') return Boolean(p.indulgence);
    if (cat === 'Plenary Indulgence') {
      return p.indulgence?.type === 'Plenary' || p.indulgence?.type === 'Plenary or Partial';
    }
    if (cat === 'Partial Indulgence') {
      return p.indulgence?.type === 'Partial' || p.indulgence?.type === 'Plenary or Partial';
    }
    if (cat === 'Prayers of the Saints') {
      return p.category === 'Prayers of the Saints' || Boolean(p.author);
    }
    return p.category === cat;
  };

  const handleScrollTreasuryStrip = (direction: 'left' | 'right') => {
    if (!treasuryStripRef.current) return;
    const scrollAmount = direction === 'left' ? -300 : 300;
    treasuryStripRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const categories: (PrayerCategory | 'All')[] = [
    'All',
    'Healing',
    'Holy Souls in Purgatory',
    'Family and Marriage',
    'Vocations and Priesthood',
    'Spiritual Conversion',
    'Peace and Protection',
    'Thanksgiving'
  ];

  // Increment prayer counter
  const handlePrayForRequest = (reqId: string) => {
    setRequests(prev => prev.map(req => {
      if (req.id !== reqId) return req;
      const alreadyPrayed = req.hasPrayed;
      bellSynth.playBeadChime();
      return {
        ...req,
        hasPrayed: !alreadyPrayed,
        prayerCount: alreadyPrayed ? req.prayerCount - 1 : req.prayerCount + 1
      };
    }));
  };

  // Toggle candle
  const handleToggleCandle = (reqId: string) => {
    setRequests(prev => prev.map(req => {
      if (req.id !== reqId) return req;
      bellSynth.playChurchBell(659, 2.0); // E5 soft candle chime
      return {
        ...req,
        candleLit: !req.candleLit
      };
    }));
  };

  // Submit new request
  const handleSubmitNewRequest = () => {
    if (!newTitle.trim() || !newDescription.trim()) return;

    const newReq: PrayerRequest = {
      id: `req-${Date.now()}`,
      title: newTitle.trim(),
      description: newDescription.trim(),
      nameOrInitials: newName.trim() || 'A Faithful Pilgrim',
      category: newCategory,
      dateSubmitted: 'Today',
      prayerCount: 1,
      hasPrayed: true,
      candleLit: true
    };

    setRequests([newReq, ...requests]);
    setNewTitle('');
    setNewDescription('');
    setNewName('');
    setNewRequestModalOpen(false);
    bellSynth.playChurchBell(440, 3.0);
  };

  const handleCopyPrayer = (prayer: CatholicPrayer) => {
    const text = `${prayer.title.toUpperCase()}
${prayer.englishText}

${prayer.latinText ? `LATIN:\n${prayer.latinText}` : ''}`;

    navigator.clipboard.writeText(text);
    setCopiedPrayerId(prayer.id);
    setTimeout(() => setCopiedPrayerId(null), 2000);
  };

  const handleTreasuryLeaderChange = (voiceId: string) => {
    setTreasuryLeaderVoice(voiceId);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('soul_sanctum_treasury_prayer_leader', voiceId);
    }
    if (speakingPrayerId) {
      SacredReader.unlockSharedAudio();
      SacredReader.speak(
        selectedPrayer.englishText,
        () => setSpeakingPrayerId(null),
        undefined,
        undefined,
        voiceId
      );
      setSpeakingPrayerId(selectedPrayer.id);
    }
  };

  const handleToggleSpeakPrayer = (prayer: CatholicPrayer) => {
    if (speakingPrayerId === prayer.id) {
      SacredReader.stop();
      setSpeakingPrayerId(null);
    } else {
      SacredReader.unlockSharedAudio();
      SacredReader.speak(
        prayer.englishText,
        () => setSpeakingPrayerId(null),
        undefined,
        undefined,
        treasuryLeaderVoice
      );
      setSpeakingPrayerId(prayer.id);
    }
  };

  const filteredRequests = requests.filter(req => {
    const matchesCat = selectedCategory === 'All' || req.category === selectedCategory;
    const matchesSearch = 
      req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.nameOrInitials.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const filteredTreasuryPrayers = CATHOLIC_PRAYERS_DATABASE.filter(p => {
    const matchesCategory = matchesPrayerCategory(p, selectedPrayerCategory);
    const q = prayerSearch.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.title.toLowerCase().includes(q) ||
      (p.latinTitle && p.latinTitle.toLowerCase().includes(q)) ||
      (p.author && p.author.toLowerCase().includes(q)) ||
      (p.historicalContext && p.historicalContext.toLowerCase().includes(q)) ||
      (p.scripturalOrTraditionOrigin && p.scripturalOrTraditionOrigin.toLowerCase().includes(q)) ||
      (p.indulgence && (
        p.indulgence.type.toLowerCase().includes(q) ||
        p.indulgence.summary.toLowerCase().includes(q) ||
        p.indulgence.grantReference.toLowerCase().includes(q)
      )) ||
      p.englishText.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const handleStepPrayer = (delta: number) => {
    if (filteredTreasuryPrayers.length === 0) return;
    const currentIdx = Math.max(
      0,
      filteredTreasuryPrayers.findIndex(p => p.id === selectedPrayer.id)
    );
    const nextIdx = (currentIdx + delta + filteredTreasuryPrayers.length) % filteredTreasuryPrayers.length;
    const nextPrayer = filteredTreasuryPrayers[nextIdx];
    setSelectedPrayer(nextPrayer);
    if (treasuryStripRef.current) {
      const btn = treasuryStripRef.current.querySelector(`[data-prayer-id="${nextPrayer.id}"]`) as HTMLElement | null;
      if (btn) {
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      
      {/* Top Banner — Context-aware for Treasury of Prayers vs. Community Prayer Wall */}
      {activeSection === 'treasury' ? (
        <div className="rounded-xl shadow-lg border border-[#A67B4E]/60 relative z-20 bg-[#24150B]">
          <div className={`sanctum-top-banner px-5 pt-4 pb-4 sm:px-6 min-h-[196px] sm:h-[212px] bg-[#24150B] text-amber-50 relative overflow-hidden flex flex-col justify-between gap-2 ${isTreasurySettingsOpen ? 'rounded-t-xl' : 'rounded-xl'}`}>
            {/* Right-Side Wooden Kneeler Facing Wall Crucifix Photography (16:9 preserved on sm+ so crucifix, armrest, prayer book, and cushion stay uncropped) */}
            <div
              className="pointer-events-none select-none absolute inset-y-0 right-0 w-full sm:w-auto sm:aspect-[16/9] overflow-hidden"
              aria-hidden="true"
            >
              <img
                src={treasuryWoodenKneelerImg}
                alt="Wooden kneeler facing the crucifix on the chapel wall, with forearm rest and prayer book tucked under the wooden case"
                decoding="async"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover object-[64%_50%] sm:object-right brightness-[1.03] contrast-[1.04]"
              />
              {/* Smooth Horizontal Gradient Transition from Dark Brown (#24150B) into the Kneeler & Crucifix */}
              <div className="hidden sm:block pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#24150B_0%,#24150B_14%,rgba(36,21,11,0.92)_26%,rgba(36,21,11,0.58)_38%,rgba(36,21,11,0.20)_50%,transparent_64%)]" />
              {/* Subtle Right, Top, and Bottom Dark Brown Feathering */}
              <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#24150B]/55 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-5 bg-gradient-to-b from-[#24150B]/45 to-transparent" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[#24150B]/60 to-transparent" />
            </div>

            {/* Mobile Readability Gradient Behind Left Title & Controls */}
            <div
              className="sm:hidden pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#24150B_0%,#24150B_28%,rgba(36,21,11,0.88)_52%,rgba(36,21,11,0.45)_76%,rgba(36,21,11,0.22)_100%)]"
              aria-hidden="true"
            />

            <div className="relative z-10 flex flex-col justify-between flex-1 max-w-full sm:max-w-[58%] gap-2">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-1.5 text-[10px] sm:text-[10.5px] font-cinzel font-bold uppercase tracking-[0.12em] text-[#DFB991] drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] leading-snug">
                  <BookOpen className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span>Thesaurus Precum Catholicarum · {CATHOLIC_PRAYERS_DATABASE.length} Bilingual Prayers</span>
                </div>
                <h2 className="font-cinzel text-lg sm:text-2xl font-bold text-[#FDF8F0] tracking-wide leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                  Treasury of Prayers
                </h2>
                <p className="text-[11px] sm:text-xs text-[#EAD7C0]/95 font-serif-sacred leading-snug drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">
                  &ldquo;Ask, and it shall be given you; seek, and you shall find.&rdquo; (Mt 7:7) — Classic English &amp; Latin devotions.
                </p>
              </div>

              {/* Compact Bottom-Left Row: Listen + Settings Drop-Down Toggle (Kneeler & Crucifix Stay Unobstructed) */}
              <div className="flex items-center gap-2 pt-1 shrink-0">
                <button
                  type="button"
                  onClick={() => handleToggleSpeakPrayer(selectedPrayer)}
                  className={`h-8 px-3 rounded-md text-xs font-semibold font-cinzel tracking-wider transition-all cursor-pointer shadow-sm flex items-center gap-1.5 shrink-0 whitespace-nowrap backdrop-blur-xs ${
                    speakingPrayerId === selectedPrayer.id
                      ? 'bg-amber-600 hover:bg-amber-500 text-white border border-amber-300/60'
                      : 'bg-[#1D1109]/92 hover:bg-[#4E2F1B] text-amber-100 border border-[#C89F72]/60'
                  }`}
                >
                  {speakingPrayerId === selectedPrayer.id ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-white" />
                      <span>Stop {activeLeader.shortName}</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                      <span>Listen ({activeLeader.shortName})</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setIsTreasurySettingsOpen(prev => !prev)}
                  aria-expanded={isTreasurySettingsOpen}
                  className={`h-8 flex items-center gap-1.5 px-3 rounded-md transition-all cursor-pointer shrink-0 border whitespace-nowrap backdrop-blur-xs ${
                    isTreasurySettingsOpen
                      ? 'bg-[#3A2213] text-[#FDF8F0] border-[#D4A373] ring-2 ring-[#8B5A2B]/40'
                      : 'bg-[#1A0F08]/92 hover:bg-[#3A2213] text-[#D4A373] hover:text-[#F7EBE1] border-[#8B5A2B]/65 hover:border-[#D4A373]/70'
                  }`}
                  title={isTreasurySettingsOpen ? 'Hide Settings & Search' : 'Show Settings & Search'}
                  aria-label={isTreasurySettingsOpen ? 'Hide Settings & Search' : 'Show Settings & Search'}
                >
                  <Settings className="w-3.5 h-3.5 text-[#D4A373] shrink-0" />
                  <span className="text-xs font-cinzel font-semibold">Settings</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#D4A373] shrink-0 transition-transform duration-200 ${
                      isTreasurySettingsOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Collapsible Treasury Settings Drop-Down Drawer */}
          {isTreasurySettingsOpen && (
            <div className="px-5 py-3.5 sm:px-6 bg-[#1C1008] border-t border-[#8B5A2B]/45 rounded-b-xl space-y-2.5 animate-fadeIn">
              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center gap-1.5 h-8 px-2.5 rounded-md bg-[#2A180D] border border-[#8B5A2B]/65 text-xs">
                  <span className="font-cinzel font-semibold text-[#DFB991] whitespace-nowrap">
                    Leader:
                  </span>
                  <select
                    value={treasuryLeaderVoice}
                    onChange={(e) => handleTreasuryLeaderChange(e.target.value)}
                    aria-label="Select Treasury Prayer Leader voice"
                    className="bg-transparent text-amber-100 font-cinzel font-semibold text-xs focus:outline-none cursor-pointer pr-0.5"
                  >
                    {TREASURY_LEADER_OPTIONS.map(opt => (
                      <option key={opt.id} value={opt.id} className="bg-[#1C1008] text-amber-50">
                        {opt.id === 'persona-jenny' ? 'Jenny (Default)' : opt.shortName}
                      </option>
                    ))}
                  </select>
                </div>

                <select
                  value={selectedPrayerCategory}
                  onChange={(e) => {
                    const nextCat = e.target.value;
                    setSelectedPrayerCategory(nextCat);
                    const q = prayerSearch.toLowerCase().trim();
                    const firstMatch = CATHOLIC_PRAYERS_DATABASE.find(
                      p => matchesPrayerCategory(p, nextCat) &&
                        (!q ||
                          p.title.toLowerCase().includes(q) ||
                          (p.latinTitle && p.latinTitle.toLowerCase().includes(q)) ||
                          (p.author && p.author.toLowerCase().includes(q)) ||
                          p.englishText.toLowerCase().includes(q))
                    );
                    if (firstMatch) setSelectedPrayer(firstMatch);
                  }}
                  aria-label="Filter prayers by category"
                  className="h-8 px-2.5 rounded-md bg-[#2A180D] border border-[#8B5A2B]/65 text-xs font-cinzel font-semibold text-amber-100 focus:outline-none focus:border-amber-400 cursor-pointer shrink-0"
                >
                  {prayerCategories.map(cat => (
                    <option key={cat} value={cat} className="bg-[#1C1008] text-amber-50">
                      {cat === 'All'
                        ? `All Categories (${CATHOLIC_PRAYERS_DATABASE.length})`
                        : `${cat} (${CATHOLIC_PRAYERS_DATABASE.filter(p => matchesPrayerCategory(p, cat)).length})`}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => setShowIndulgenceGuide(prev => !prev)}
                  className={`h-8 px-2.5 rounded-md text-xs font-cinzel font-semibold transition-colors cursor-pointer border flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                    showIndulgenceGuide
                      ? 'bg-amber-400 text-stone-950 border-amber-200'
                      : 'bg-[#2A180D] hover:bg-[#3A2213] text-amber-200 border-[#8B5A2B]/65'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Indulgences Guide</span>
                </button>

                <div className="relative flex-1 min-w-[200px]">
                  <Search className="w-3.5 h-3.5 text-[#C89F72] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={prayerSearch}
                    onChange={(e) => setPrayerSearch(e.target.value)}
                    placeholder="Search saint, title, Latin, indulgence..."
                    className="w-full h-8 pl-8 pr-7 rounded-md bg-[#2A180D] border border-[#8B5A2B]/65 text-xs text-amber-50 placeholder-[#C89F72]/70 focus:outline-none focus:border-amber-400"
                  />
                  {prayerSearch && (
                    <button
                      type="button"
                      onClick={() => setPrayerSearch('')}
                      aria-label="Clear prayer search"
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-[#C89F72] hover:text-white cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="sanctum-top-banner px-5 pt-4 pb-4 sm:px-6 min-h-[196px] sm:h-[212px] bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 rounded-xl text-amber-50 shadow-md border border-amber-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 overflow-hidden">
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-cinzel text-[10.5px] sm:text-[11px] font-bold uppercase tracking-widest text-amber-300 leading-snug">
                Communion of Saints • Fraternal Intercession
              </span>
            </div>
            <h2 className="font-cinzel text-lg sm:text-2xl font-bold text-white tracking-wide leading-snug">
              Community Prayer Requests Wall
            </h2>
            <p className="text-[11px] sm:text-[12.5px] text-stone-300 font-serif-sacred max-w-xl leading-snug">
              &ldquo;Bear one another&apos;s burdens, and so fulfill the law of Christ&rdquo; (Galatians 6:2). Post your intentions, pray a decade for a brother or sister in Christ, and light a vigil candle.
            </p>
          </div>

          <button
            onClick={() => setNewRequestModalOpen(true)}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-600 hover:to-amber-800 text-amber-50 text-xs font-semibold font-cinzel tracking-wider transition-all cursor-pointer shadow-md flex items-center gap-2 shrink-0 self-start sm:self-center"
          >
            <Plus className="w-4 h-4" />
            <span>Submit Intention</span>
          </button>
        </div>
      )}

      <div className="p-3 sm:p-6 md:p-8 rounded-xl bg-white/45 backdrop-blur-xl backdrop-saturate-150 border border-white/60 ring-1 ring-inset ring-white/40 shadow-[0_8px_32px_0_rgba(120,90,50,0.12)] space-y-6">
      {/* =========================================================================
          SECTION 1: COMMUNITY PRAYER REQUESTS WALL
         ========================================================================= */}
      {activeSection === 'wall' && (
        <div className="space-y-6">
          
          {/* Category Filter Pills */}
          <div className="bg-white/45 backdrop-blur-xl backdrop-saturate-150 rounded-xl p-4 shadow-[0_8px_32px_0_rgba(120,90,50,0.12)] border border-white/60 ring-1 ring-inset ring-white/40">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-amber-900 text-amber-50 shadow-xs'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Prayer Request Cards Grid */}
          <div className="space-y-4">
            {filteredRequests.map(req => (
              <div
                key={req.id}
                className="bg-white/45 backdrop-blur-xl backdrop-saturate-150 p-6 rounded-xl border border-white/60 ring-1 ring-inset ring-white/40 shadow-[0_8px_32px_0_rgba(120,90,50,0.12)] hover:bg-white/55 transition-all space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-wider font-cinzel">
                        {req.category}
                      </span>
                      <span className="text-[11px] text-stone-400 font-serif-sacred">
                        {req.dateSubmitted} • By {req.nameOrInitials}
                      </span>
                    </div>

                    <h3 className="font-cinzel text-base sm:text-lg font-bold text-stone-900">
                      {req.title}
                    </h3>
                  </div>

                  {/* Candle Button */}
                  <button
                    onClick={() => handleToggleCandle(req.id)}
                    className={`p-2 rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-medium ${
                      req.candleLit 
                        ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-xs' 
                        : 'bg-stone-50 border-stone-200 text-stone-500 hover:bg-stone-100'
                    }`}
                    title={req.candleLit ? 'Vigil candle lit for this intention' : 'Click to light a virtual vigil candle'}
                  >
                    <Flame className={`w-4 h-4 ${req.candleLit ? 'text-amber-500 fill-amber-500 animate-pulse' : 'text-stone-400'}`} />
                    <span className="hidden sm:inline">{req.candleLit ? 'Candle Lit' : 'Light Candle'}</span>
                  </button>
                </div>

                <p className="font-serif-sacred text-stone-800 text-sm sm:text-base leading-relaxed pl-3 border-l-2 border-amber-800/30">
                  "{req.description}"
                </p>

                {/* Bottom Bar: Pray for intention CTA */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-stone-600 font-serif-sacred">
                    <span className="font-bold font-cinzel text-amber-950 text-sm">
                      {req.prayerCount}
                    </span>
                    <span>faithful praying for this intention</span>
                  </div>

                  <button
                    onClick={() => handlePrayForRequest(req.id)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      req.hasPrayed
                        ? 'bg-sky-700 hover:bg-sky-600 text-white shadow-xs'
                        : 'bg-stone-100 hover:bg-amber-100 text-stone-800 hover:text-amber-950 border border-stone-300'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${req.hasPrayed ? 'fill-white' : 'text-amber-800'}`} />
                    <span>{req.hasPrayed ? 'You Prayed ✓' : 'I Prayed a Prayer'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* =========================================================================
          SECTION 2: CATHOLIC PRAYERS TREASURY
         ========================================================================= */}
      {activeSection === 'treasury' && (
        <div className="space-y-6">

          {/* Expandable Enchiridion Indulgentiarum Quick Guide */}
          {showIndulgenceGuide && (
            <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-amber-300/80 space-y-4">
              <div className="flex items-start justify-between gap-3 border-b border-amber-200/80 pb-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2 text-xs font-cinzel font-bold uppercase tracking-wider text-amber-900">
                    <Award className="w-4 h-4 text-amber-700" />
                    <span>Enchiridion Indulgentiarum (Manual of Indulgences, 4th Edition)</span>
                  </div>
                  <h3 className="font-cinzel text-lg sm:text-xl font-bold text-stone-900">
                    Understanding Plenary &amp; Partial Indulgences
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowIndulgenceGuide(false)}
                  className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-500 hover:text-stone-900 cursor-pointer"
                  aria-label="Close Indulgences Guide"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="font-serif-sacred text-sm sm:text-base text-stone-800 leading-relaxed">
                “An indulgence is a remission before God of the temporal punishment due to sins whose guilt has already been forgiven, which the faithful Christian who is duly disposed gains under certain prescribed conditions through the action of the Church” (<em>Catechism of the Catholic Church</em>, §1471). Indulgences may be applied to oneself or by way of suffrage to the Holy Souls in Purgatory.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-amber-50/75 border border-amber-200 space-y-2">
                  <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-amber-950">
                    Four Usual Conditions for a Plenary Indulgence (Norm 20)
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm font-serif-sacred text-stone-800 list-disc pl-4">
                    <li><strong>Sacramental Confession</strong> (within about 20 days before or after; one confession suffices for several plenary indulgences).</li>
                    <li><strong>Eucharistic Communion</strong> (ideally on the same day the indulgenced work is performed).</li>
                    <li><strong>Prayer for the Pope’s Intentions</strong> (for example, one Our Father and one Hail Mary).</li>
                    <li><strong>Complete Detachment from All Sin</strong>, even venial sin (if attachment remains or a condition is lacking, the indulgence becomes Partial).</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-2">
                  <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-stone-900">
                    Four Everyday Plenary Indulgence Works (Any Day of the Year)
                  </h4>
                  <ul className="space-y-1.5 text-xs sm:text-sm font-serif-sacred text-stone-800 list-disc pl-4">
                    <li><strong>Eucharistic Adoration</strong> before the Blessed Sacrament for at least 30 minutes (<em>Grant #7 §1</em>).</li>
                    <li><strong>Sacred Scripture Reading</strong> (or listening with veneration) for at least 30 minutes (<em>Grant #30</em>).</li>
                    <li><strong>The Holy Rosary</strong> (5 continuous decades) in a church, public oratory, family, religious community, or pious association (<em>Grant #17 §1</em>).</li>
                    <li><strong>Stations of the Cross</strong> performed devoutly before legitimately erected stations (<em>Grant #13</em>).</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {/* Prayers Selector List */}
          <div className="bg-white/45 backdrop-blur-xl backdrop-saturate-150 rounded-xl p-4 shadow-[0_8px_32px_0_rgba(120,90,50,0.12)] border border-white/60 ring-1 ring-inset ring-white/40 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-cinzel text-base sm:text-lg md:text-xl font-bold uppercase tracking-wider text-stone-900">
                Treasury of Catholic Prayers
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {(['All', 'Prayers of the Saints', 'Plenary Indulgence', 'Partial Indulgence'] as const).map(quickCat => (
                  <button
                    key={quickCat}
                    type="button"
                    onClick={() => {
                      setSelectedPrayerCategory(quickCat);
                      const firstMatch = CATHOLIC_PRAYERS_DATABASE.find(p => matchesPrayerCategory(p, quickCat));
                      if (firstMatch) setSelectedPrayer(firstMatch);
                    }}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-cinzel font-bold transition-colors cursor-pointer border ${
                      selectedPrayerCategory === quickCat
                        ? 'bg-amber-900 text-amber-50 border-amber-900'
                        : 'bg-white/80 hover:bg-amber-50 text-stone-700 border-stone-300'
                    }`}
                  >
                    {quickCat === 'All' ? 'All' : quickCat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleScrollTreasuryStrip('left')}
                className="p-2 rounded-lg bg-white/90 hover:bg-amber-900 text-stone-800 hover:text-amber-50 border border-stone-300 hover:border-amber-800 shadow-xs transition-all cursor-pointer shrink-0 flex items-center justify-center"
                title="Scroll prayers left"
                aria-label="Scroll prayers left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div
                ref={treasuryStripRef}
                className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 scroll-smooth flex-1 min-w-0"
              >
                {filteredTreasuryPrayers.length === 0 ? (
                  <div className="flex items-center gap-3 text-xs font-serif-sacred text-stone-700 px-2 py-1">
                    <span>No prayers match your search.</span>
                    <button
                      type="button"
                      onClick={() => {
                        setPrayerSearch('');
                        setSelectedPrayerCategory('All');
                      }}
                      className="px-2.5 py-1 rounded bg-amber-900 text-amber-50 font-cinzel font-semibold cursor-pointer"
                    >
                      Reset
                    </button>
                  </div>
                ) : (
                  filteredTreasuryPrayers.map(p => {
                    const isSelected = p.id === selectedPrayer.id;
                    const isPlenary = p.indulgence?.type === 'Plenary' || p.indulgence?.type === 'Plenary or Partial';
                    return (
                      <button
                        key={p.id}
                        data-prayer-id={p.id}
                        onClick={() => setSelectedPrayer(p)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer inline-flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-amber-900 text-amber-50 shadow-xs'
                            : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                        }`}
                      >
                        <span>{p.title}</span>
                        {p.indulgence && (
                          <span
                            className={`text-[10px] font-cinzel font-bold px-1.5 py-0.5 rounded ${
                              isSelected
                                ? 'bg-amber-400/25 text-amber-200'
                                : isPlenary
                                  ? 'bg-amber-200/80 text-amber-950'
                                  : 'bg-stone-200/90 text-stone-700'
                            }`}
                            title={`${p.indulgence.type} Indulgence`}
                          >
                            {isPlenary ? 'Plenary' : 'Partial'}
                          </span>
                        )}
                      </button>
                    );
                  })
                )}
              </div>

              <button
                type="button"
                onClick={() => handleScrollTreasuryStrip('right')}
                className="p-2 rounded-lg bg-white/90 hover:bg-amber-900 text-stone-800 hover:text-amber-50 border border-stone-300 hover:border-amber-800 shadow-xs transition-all cursor-pointer shrink-0 flex items-center justify-center"
                title="Scroll prayers right to see more prayers"
                aria-label="Scroll prayers right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main Selected Prayer Display Card — Solid White Background for Prayer Text */}
          <article className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-stone-200/90 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-xs font-cinzel font-bold uppercase tracking-wider text-amber-800">
                  <span>{selectedPrayer.category}</span>
                  {selectedPrayer.latinTitle && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="font-serif-sacred italic normal-case tracking-normal text-amber-900">
                        {selectedPrayer.latinTitle}
                      </span>
                    </>
                  )}
                  {selectedPrayer.indulgence && (
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-cinzel font-bold uppercase tracking-wider border ${
                        selectedPrayer.indulgence.type === 'Plenary' || selectedPrayer.indulgence.type === 'Plenary or Partial'
                          ? 'bg-amber-100 text-amber-950 border-amber-400'
                          : 'bg-emerald-50 text-emerald-900 border-emerald-300'
                      }`}
                    >
                      <Award className="w-3 h-3" />
                      <span>{selectedPrayer.indulgence.type} Indulgence</span>
                    </span>
                  )}
                </div>
                <h3 className="font-cinzel text-2xl font-bold text-stone-900">
                  {selectedPrayer.title}
                </h3>
                {selectedPrayer.author && (
                  <div className="flex items-center gap-1.5 text-sm font-serif-sacred text-stone-700">
                    <UserCheck className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                    <span>{selectedPrayer.author}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleStepPrayer(-1)}
                  className="p-2 rounded-lg bg-stone-100 hover:bg-amber-900 text-stone-700 hover:text-amber-50 border border-stone-300 hover:border-amber-800 transition-colors cursor-pointer"
                  title="Previous Prayer"
                  aria-label="Previous Prayer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => handleStepPrayer(1)}
                  className="p-2 rounded-lg bg-stone-100 hover:bg-amber-900 text-stone-700 hover:text-amber-50 border border-stone-300 hover:border-amber-800 transition-colors cursor-pointer"
                  title="Next Prayer"
                  aria-label="Next Prayer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleToggleSpeakPrayer(selectedPrayer)}
                  className={`p-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    speakingPrayerId === selectedPrayer.id
                      ? 'bg-amber-600 text-white'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300'
                  }`}
                  title={speakingPrayerId === selectedPrayer.id ? `Stop ${activeLeader.shortName}` : `Read Aloud with ${activeLeader.shortName}`}
                  aria-label={speakingPrayerId === selectedPrayer.id ? `Stop ${activeLeader.shortName}` : `Read Aloud with ${activeLeader.shortName}`}
                >
                  {speakingPrayerId === selectedPrayer.id ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-800" />}
                </button>

                <button
                  onClick={() => handleCopyPrayer(selectedPrayer)}
                  className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 transition-colors cursor-pointer"
                  title="Copy prayer"
                >
                  {copiedPrayerId === selectedPrayer.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Prayer Content: English and Latin Side by Side if available */}
            <div className={`grid ${selectedPrayer.latinText ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6`}>
              
              {/* English */}
              <div className="p-6 rounded-xl bg-[#FAF8F5] border border-stone-200/80 space-y-3">
                <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-amber-950 block">
                  English Translation
                </span>
                <div className="font-serif-sacred text-stone-900 text-xl sm:text-2xl md:text-3xl leading-relaxed whitespace-pre-line">
                  {selectedPrayer.englishText}
                </div>
              </div>

              {/* Latin */}
              {selectedPrayer.latinText && (
                <div className="p-6 rounded-xl bg-[#FAF8F5] border border-stone-200/80 space-y-3">
                  <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-stone-800 block">
                    Textus Latinus (Lingua Sacra)
                  </span>
                  <div className="font-serif-sacred text-stone-800 text-xl sm:text-2xl md:text-3xl leading-relaxed whitespace-pre-line italic">
                    {selectedPrayer.latinText}
                  </div>
                </div>
              )}

            </div>

            {/* Indulgence Grant Panel (Enchiridion Indulgentiarum) */}
            {selectedPrayer.indulgence && (
              <div className="p-5 rounded-xl bg-gradient-to-br from-amber-50 via-[#FFFBF0] to-amber-50/70 border border-amber-300/90 text-sm sm:text-base font-serif-sacred text-stone-800 space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 font-cinzel font-bold text-amber-950 uppercase text-xs tracking-wider">
                    <Award className="w-4 h-4 text-amber-700" />
                    <span>{selectedPrayer.indulgence.type} Indulgence</span>
                  </span>
                  <span className="text-xs font-cinzel font-semibold text-amber-900">
                    {selectedPrayer.indulgence.grantReference}
                  </span>
                </div>
                <p className="leading-relaxed">{selectedPrayer.indulgence.summary}</p>
                {selectedPrayer.indulgence.conditions && (
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed border-t border-amber-200/80 pt-2">
                    <strong className="font-cinzel text-amber-950">Conditions: </strong>
                    {selectedPrayer.indulgence.conditions}
                  </p>
                )}
                {selectedPrayer.indulgence.applicableToSouls && (
                  <p className="text-xs font-serif-sacred italic text-amber-950">
                    Applicable by way of suffrage specifically to the Holy Souls in Purgatory.
                  </p>
                )}
              </div>
            )}

            {/* Historical Origin and Spiritual Context */}
            {(selectedPrayer.historicalContext || selectedPrayer.scripturalOrTraditionOrigin) && (
              <div className="p-5 rounded-xl bg-amber-50/60 border border-amber-200 text-sm sm:text-base font-serif-sacred text-stone-800 space-y-2.5">
                <div className="flex items-center gap-1.5 font-cinzel font-bold text-amber-950 uppercase text-xs tracking-wider">
                  <ScrollText className="w-4 h-4 text-amber-800" />
                  <span>Historical &amp; Spiritual Context</span>
                </div>
                {selectedPrayer.historicalContext && (
                  <p className="leading-relaxed text-stone-900">{selectedPrayer.historicalContext}</p>
                )}
                {selectedPrayer.scripturalOrTraditionOrigin && (
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                    <strong className="font-cinzel text-amber-950">Source &amp; Origin: </strong>
                    {selectedPrayer.scripturalOrTraditionOrigin}
                  </p>
                )}
                {selectedPrayer.usageTime && (
                  <p className="italic text-amber-900 text-xs sm:text-sm">
                    Recommended time: {selectedPrayer.usageTime}
                  </p>
                )}
              </div>
            )}

          </article>

        </div>
      )}
      </div>

      {/* Modal: Submit Prayer Request */}
      {newRequestModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl border border-stone-300">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900 font-cinzel">
                  Prayer Request
                </span>
                <h3 className="font-cinzel text-xl font-bold text-stone-900">
                  Place an Intention on the Wall
                </h3>
              </div>
              <button 
                onClick={() => setNewRequestModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-stone-800 font-cinzel">Intention Title</label>
                <input
                  type="text"
                  placeholder="e.g. For healing of my sister Maria"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-stone-50 border border-stone-300 text-xs focus:outline-none focus:border-amber-800 mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-800 font-cinzel">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as PrayerCategory)}
                  className="w-full p-2.5 rounded-lg bg-stone-50 border border-stone-300 text-xs focus:outline-none focus:border-amber-800 mt-1"
                >
                  {categories.filter(c => c !== 'All').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-800 font-cinzel">Intention Details / Prayer</label>
                <textarea
                  placeholder="Share details of your petition so fellow Catholic pilgrims can pray specifically for your intention..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full h-24 p-3 rounded-lg bg-stone-50 border border-stone-300 text-xs font-serif-sacred focus:outline-none focus:border-amber-800 resize-none mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-800 font-cinzel">Name or Initials (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Maria G. or A Loving Father"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-stone-50 border border-stone-300 text-xs focus:outline-none focus:border-amber-800 mt-1"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setNewRequestModalOpen(false)}
                className="px-4 py-2 rounded-lg text-xs font-medium text-stone-600 hover:bg-stone-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitNewRequest}
                className="px-5 py-2.5 rounded-lg bg-amber-900 hover:bg-amber-800 text-amber-100 font-semibold text-xs transition-colors cursor-pointer"
              >
                Post Intention to Wall
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
