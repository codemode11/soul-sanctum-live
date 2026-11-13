import React, { useState, useMemo } from 'react';
import { EUCHARISTIC_MIRACLES_DATA, EucharisticMiracle } from '../data/eucharisticMiracles';
import {
  Sparkles,
  Filter,
  ShieldCheck,
  Microscope,
  Heart,
  Globe,
  X,
  BookOpen,
  Calendar,
  MapPin,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Landmark,
  RotateCcw
} from 'lucide-react';

interface EucharisticCatechismViewProps {
  initialSection?: 'john6' | 'miracles' | 'transubstantiation';
}

type SortOption = 'chrono-asc' | 'chrono-desc' | 'country-az' | 'forensic-first';
type QuickCollection = 'all' | 'forensic' | 'Italy' | 'Spain' | 'France' | 'Germany' | 'americas' | 'other';
type EraFilter = 'all' | 'ancient' | 'medieval' | 'early-modern' | 'modern';

const AMERICAS_COUNTRIES = new Set(['Argentina', 'Mexico', 'Peru', 'Venezuela', 'Colombia', 'Martinique']);
const MAJOR_EUROPEAN_COUNTRIES = new Set(['Italy', 'Spain', 'France', 'Germany']);

export const EucharisticCatechismView: React.FC<EucharisticCatechismViewProps> = ({
  initialSection = 'miracles'
}) => {
  const [activeSection, setActiveSection] = useState<'john6' | 'miracles' | 'transubstantiation'>(initialSection);

  // Exhibition catalog filter & sort state
  const [quickCollection, setQuickCollection] = useState<QuickCollection>('all');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedEra, setSelectedEra] = useState<EraFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('chrono-asc');
  const [showAllCountries, setShowAllCountries] = useState<boolean>(false);
  const [inspectedMiracle, setInspectedMiracle] = useState<EucharisticMiracle | null>(null);

  // Parse miracle year into numeric value for chronological sorting & era filtering
  const parseMiracleYear = (yearStr: string): number => {
    const fourDigit = yearStr.match(/\b(1\d{3}|20\d{2})\b/);
    if (fourDigit) return parseInt(fourDigit[1], 10);
    const threeDigit = yearStr.match(/\b(\d{3})\b/);
    if (threeDigit) return parseInt(threeDigit[1], 10);
    const centuryMatch = yearStr.match(/(\d{1,2})(?:st|nd|rd|th)\s+Century/i);
    if (centuryMatch) return (parseInt(centuryMatch[1], 10) - 1) * 100 + 50;
    return 1000;
  };

  const hasForensicReport = (m: EucharisticMiracle): boolean => {
    return Boolean(m.bloodType || (m.keyScientificFindings && m.keyScientificFindings.length > 0));
  };

  // Extract unique countries sorted by miracle count descending, then alphabetically
  const countryStats = useMemo(() => {
    const counts = new Map<string, number>();
    for (const m of EUCHARISTIC_MIRACLES_DATA) {
      counts.set(m.country, (counts.get(m.country) || 0) + 1);
    }
    return Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([country, count]) => ({ country, count }));
  }, []);

  const miracleTypes = [
    'All',
    'Heart Muscle Transformation',
    'Bleeding Host',
    'Incorrupt Host',
    'Apparition in Host',
    'Fire Resistance',
    'Levitation',
    'Supernatural Light',
    'Halting a Tsunami',
    'Adoration by Animals'
  ];

  // Handle quick collection change
  const handleSelectQuickCollection = (collection: QuickCollection) => {
    setQuickCollection(collection);
    if (collection === 'Italy' || collection === 'Spain' || collection === 'France' || collection === 'Germany') {
      setSelectedCountry(collection);
    } else {
      setSelectedCountry('All');
    }
    if (collection === 'forensic') {
      setSortBy('forensic-first');
    }
  };

  // Handle individual country button click
  const handleSelectCountry = (country: string) => {
    setSelectedCountry(country);
    if (country === 'All') {
      if (quickCollection === 'Italy' || quickCollection === 'Spain' || quickCollection === 'France' || quickCollection === 'Germany') {
        setQuickCollection('all');
      }
    } else if (country === 'Italy' || country === 'Spain' || country === 'France' || country === 'Germany') {
      setQuickCollection(country);
    } else {
      setQuickCollection('all');
    }
  };

  const resetAllFilters = () => {
    setQuickCollection('all');
    setSelectedCountry('All');
    setSelectedType('All');
    setSelectedEra('all');
    setSortBy('chrono-asc');
  };

  const filteredMiracles = useMemo(() => {
    return EUCHARISTIC_MIRACLES_DATA.filter((m) => {
      // Quick Collection filter
      if (quickCollection === 'forensic' && !hasForensicReport(m)) return false;
      if (quickCollection === 'americas' && !AMERICAS_COUNTRIES.has(m.country)) return false;
      if (
        quickCollection === 'other' &&
        (MAJOR_EUROPEAN_COUNTRIES.has(m.country) || AMERICAS_COUNTRIES.has(m.country))
      ) {
        return false;
      }

      // Specific Country filter
      if (selectedCountry !== 'All' && m.country !== selectedCountry) return false;

      // Phenomenon filter
      if (selectedType !== 'All' && m.miracleType !== selectedType) return false;

      // Historical Era filter
      if (selectedEra !== 'all') {
        const yr = parseMiracleYear(m.year);
        if (selectedEra === 'ancient' && yr >= 1200) return false;
        if (selectedEra === 'medieval' && (yr < 1200 || yr >= 1500)) return false;
        if (selectedEra === 'early-modern' && (yr < 1500 || yr >= 1800)) return false;
        if (selectedEra === 'modern' && yr < 1800) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'chrono-asc') {
        return parseMiracleYear(a.year) - parseMiracleYear(b.year) || a.title.localeCompare(b.title);
      }
      if (sortBy === 'chrono-desc') {
        return parseMiracleYear(b.year) - parseMiracleYear(a.year) || a.title.localeCompare(b.title);
      }
      if (sortBy === 'country-az') {
        return (
          a.country.localeCompare(b.country) ||
          a.location.localeCompare(b.location) ||
          parseMiracleYear(a.year) - parseMiracleYear(b.year)
        );
      }
      if (sortBy === 'forensic-first') {
        const aForensic = hasForensicReport(a) ? 1 : 0;
        const bForensic = hasForensicReport(b) ? 1 : 0;
        if (bForensic !== aForensic) return bForensic - aForensic;
        const aBlood = a.bloodType ? 1 : 0;
        const bBlood = b.bloodType ? 1 : 0;
        if (bBlood !== aBlood) return bBlood - aBlood;
        return parseMiracleYear(b.year) - parseMiracleYear(a.year);
      }
      return 0;
    });
  }, [quickCollection, selectedCountry, selectedType, selectedEra, sortBy]);

  // Index of currently inspected miracle for modal Next/Prev navigation
  const inspectedIndex = useMemo(() => {
    if (!inspectedMiracle) return -1;
    return filteredMiracles.findIndex((m) => m.id === inspectedMiracle.id);
  }, [inspectedMiracle, filteredMiracles]);

  const hasActiveFilters =
    quickCollection !== 'all' || selectedCountry !== 'All' || selectedType !== 'All' || selectedEra !== 'all';

  return (
    <div className="max-w-6xl mx-auto p-3 sm:p-6 md:p-8 rounded-xl bg-[#F6F2EA]/85 backdrop-blur-xl backdrop-saturate-150 border border-[#DFD6C7] ring-1 ring-inset ring-white/60 shadow-[0_8px_32px_0_rgba(51,65,85,0.12)] space-y-6 mb-12">
      
      {/* Top Banner — Slate Gray & Bleached Sand */}
      <div className="sanctum-top-banner px-5 pt-4 pb-4 sm:px-6 min-h-[164px] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-xl text-[#F9F6F0] shadow-md border border-slate-700/80 relative overflow-hidden">
        <div className="pointer-events-none absolute -right-12 -bottom-12 w-72 h-44 rounded-full bg-[#EAE2D3]/15 blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-[#DFD5C3] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#EAE2D3]" />
              Sacramentum Caritatis • Source and Summit of Catholic Faith
            </span>
          </div>
          <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#FBF9F5] tracking-wide">
            Catechism on the Eucharist and Miracles Approved by the Vatican
          </h3>
          <p className="text-xs sm:text-sm text-[#EAE2D3] font-serif-sacred max-w-3xl mt-1 leading-relaxed">
            &ldquo;The Eucharist is the heart and the summit of the Church&apos;s life, for in it Christ associates his Church and all her members with his sacrifice of praise and thanksgiving offered once for all on the cross to his Father.&rdquo; (CCC 1407)
          </p>

          {/* Sub-navigation tabs */}
          <div className="flex flex-wrap gap-2 mt-5">
            <button
              onClick={() => setActiveSection('miracles')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold font-cinzel transition-all cursor-pointer flex items-center gap-2 ${
                activeSection === 'miracles'
                  ? 'bg-[#F4EFE6] text-slate-900 shadow-sm font-bold border border-[#DFD5C3]'
                  : 'bg-slate-800/90 text-[#EAE2D3] hover:bg-slate-700 border border-slate-600/70'
              }`}
            >
              <Sparkles className={`w-4 h-4 ${activeSection === 'miracles' ? 'text-slate-700' : 'text-[#DFD5C3]'}`} />
              <span>St. Carlo Acutis Complete Catalog ({EUCHARISTIC_MIRACLES_DATA.length})</span>
            </button>

            <button
              onClick={() => setActiveSection('transubstantiation')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold font-cinzel transition-all cursor-pointer ${
                activeSection === 'transubstantiation'
                  ? 'bg-[#F4EFE6] text-slate-900 shadow-sm font-bold border border-[#DFD5C3]'
                  : 'bg-slate-800/90 text-[#EAE2D3] hover:bg-slate-700 border border-slate-600/70'
              }`}
            >
              The Dogma of Transubstantiation
            </button>

            <button
              onClick={() => setActiveSection('john6')}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold font-cinzel transition-all cursor-pointer ${
                activeSection === 'john6'
                  ? 'bg-[#F4EFE6] text-slate-900 shadow-sm font-bold border border-[#DFD5C3]'
                  : 'bg-slate-800/90 text-[#EAE2D3] hover:bg-slate-700 border border-slate-600/70'
              }`}
            >
              Bread of Life Discourse (John 6)
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1: EXPLANATION OF TRANSUBSTANTIATION
         ========================================================================= */}
      {activeSection === 'transubstantiation' && (
        <div className="bg-[#FBF9F5]/95 backdrop-blur-xl rounded-xl p-6 sm:p-8 shadow-xs border border-[#DFD6C7] space-y-6">
          <div className="border-b border-[#D8CFC0] pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 font-cinzel">
              Dogmatic Formulation • Council of Trent (1551)
            </span>
            <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              What is Transubstantiation? (Substance vs. Accidents)
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Metaphysics */}
            <div className="p-5 rounded-xl bg-[#F4EFE6] border border-[#D8CFC0] space-y-3">
              <div className="flex items-center gap-2 text-slate-800 font-cinzel font-bold text-sm">
                <span>1. Substance (What it Is)</span>
              </div>
              <p className="font-serif-sacred text-slate-700 text-sm sm:text-base leading-relaxed">
                In classical philosophy and Catholic theology (formulated by St. Thomas Aquinas), the <span className="font-bold text-slate-900">Substance</span> is the underlying essence or core identity of a thing—what it truly is in its deepest reality.
              </p>
              <div className="p-3 bg-[#EAE2D3]/75 rounded-xl border border-[#C8BBA6] text-xs font-serif-sacred text-slate-800 font-medium">
                At the consecration, the entire substance of bread and wine ceases to exist and is replaced by the true Substance of Christ: His Body, Blood, Soul, and Divinity.
              </div>
            </div>

            {/* The Accidents */}
            <div className="p-5 rounded-xl bg-[#F4EFE6] border border-[#D8CFC0] space-y-3">
              <div className="flex items-center gap-2 text-slate-800 font-cinzel font-bold text-sm">
                <span>2. The Accidents (How it Appears)</span>
              </div>
              <p className="font-serif-sacred text-slate-700 text-sm sm:text-base leading-relaxed">
                The <span className="font-bold text-slate-900">Accidents</span> (or species) are the perceptible physical properties: physical dimensions, chemical weight, color, taste, scent, texture, and nutritional breakdown.
              </p>
              <div className="p-3 bg-[#EAE2D3]/75 rounded-xl border border-[#C8BBA6] text-xs font-serif-sacred text-slate-800 font-medium">
                By a unique miracle of divine omnipotence, the accidents of bread and wine remain intact without their natural subject, allowing us to receive the King of Heaven without natural horror.
              </div>
            </div>
          </div>

          {/* Totus Christus and In Persona Christi */}
          <div className="p-6 rounded-xl bg-[#EFE9DC] border border-[#D8CFC0] space-y-4">
            <h5 className="font-cinzel text-base font-bold text-slate-900">
              Crucial Doctrinal Pillars of the Real Presence:
            </h5>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm font-serif-sacred text-slate-700">
              <div className="bg-[#FBF9F5] p-4 rounded-lg border border-[#D8CFC0] space-y-1.5">
                <span className="font-bold font-cinzel text-slate-800 block text-xs">A. Totus Christus (Whole Christ)</span>
                <p>
                  Christ is present whole and entire in each of the species and whole and entire in each of their parts, in such a way that the breaking of the bread does not divide Christ. (CCC 1377)
                </p>
              </div>

              <div className="bg-[#FBF9F5] p-4 rounded-lg border border-[#D8CFC0] space-y-1.5">
                <span className="font-bold font-cinzel text-slate-800 block text-xs">B. Permanent Presence</span>
                <p>
                  The Eucharistic presence of Christ begins at the moment of consecration and endures as long as the consecrated species subsist. For this reason, the Blessed Sacrament is reserved in the tabernacle for adoration and Viaticum.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 2: BREAD OF LIFE DISCOURSE (JOHN 6)
         ========================================================================= */}
      {activeSection === 'john6' && (
        <div className="bg-[#FBF9F5]/95 backdrop-blur-xl rounded-xl p-6 sm:p-8 shadow-xs border border-[#DFD6C7] space-y-6">
          <div className="border-b border-[#D8CFC0] pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 font-cinzel">
              Biblical Foundation • Holy Gospel of Saint John
            </span>
            <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              The Bread of Life Discourse (John 6:51–69)
            </h4>
          </div>

          <div className="space-y-5 font-serif-sacred text-slate-700 text-sm sm:text-base leading-relaxed">
            <p>
              In Capernaum, following the miraculous multiplication of the loaves, Our Lord Jesus Christ proclaimed the Eucharistic mystery in explicit, literal terms. When the crowds murmured, Jesus did not water down His language or explain it as a mere metaphor.
            </p>

            <blockquote className="py-5 px-6 bg-[#EFE9DC]/85 border-y border-slate-400/60 italic space-y-3 text-slate-900">
              <p className="text-base sm:text-lg leading-relaxed">
                &ldquo;I am the living bread which came down from heaven; if any one eats of this bread, he will live for ever; and the bread which I shall give for the life of the world is my flesh.&rdquo; <span className="not-italic font-cinzel text-xs font-bold text-slate-600 ml-1">(John 6:51)</span>
              </p>
              <p className="text-base sm:text-lg leading-relaxed">
                &ldquo;Truly, truly, I say to you, unless you eat the flesh of the Son of man and drink his blood, you have no life in you; he who eats my flesh and drinks my blood has eternal life, and I will raise him up at the last day. For my flesh is food indeed, and my blood is drink indeed.&rdquo; <span className="not-italic font-cinzel text-xs font-bold text-slate-600 ml-1">(John 6:53–55)</span>
              </p>
            </blockquote>

            <div className="p-4 bg-[#F4EFE6] rounded-xl border border-[#D8CFC0] space-y-2 text-xs sm:text-sm">
              <span className="font-cinzel font-bold text-slate-900 block">The Greek Verbs: Phago vs. Trogo</span>
              <p>
                In classical Greek, the general word for eating is <span className="font-bold text-slate-900">phago</span>. But when the listeners balked (&ldquo;How can this man give us his flesh to eat?&rdquo;), Jesus intensified His verb to <span className="font-bold text-slate-900">trogo</span> (used four times in verses 54–58), which literally means &ldquo;to gnaw, crunch, or chew,&rdquo; decisively refuting any purely symbolic interpretation.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 3: ST. CARLO ACUTIS VATICAN EUCHARISTIC MIRACLES ARCHIVE
         ========================================================================= */}
      {activeSection === 'miracles' && (
        <div className="bg-[#FBF9F5]/95 backdrop-blur-xl rounded-xl p-5 sm:p-7 md:p-8 shadow-xs border border-[#DFD6C7] space-y-6">
          
          {/* Exhibition Masthead & Archival Summary Ribbon */}
          <div className="border-b border-[#D8CFC0] pb-6 space-y-4">
            <div className="space-y-1.5">
              <span className="font-cinzel text-[11px] font-bold uppercase tracking-[0.2em] text-slate-600 block">
                Vatican International Exhibition • Complete Archival Catalog
              </span>
              <h4 className="font-cinzel text-2xl sm:text-3xl font-bold text-slate-900 tracking-wide">
                Complete Catalog of Eucharistic Miracles by Saint Carlo Acutis
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 font-serif-sacred leading-relaxed max-w-4xl">
                <span className="font-bold text-slate-900">130 documented prodigies recognized by the Catholic Church worldwide</span>, curated from the official international exhibition <span className="italic font-semibold text-slate-900">&ldquo;The Eucharistic Miracles of the World&rdquo;</span> compiled by <span className="font-bold text-slate-900">Saint Carlo Acutis</span> (<span className="underline decoration-slate-500 font-semibold">miracolieucaristici.com</span>).
              </p>
            </div>

            {/* Museum Operational / Archival Summary Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
              <div className="bg-[#F4EFE6] border border-[#D8CFC0] rounded-lg px-3.5 py-2.5">
                <div className="font-cinzel text-lg sm:text-xl font-bold text-slate-900">130</div>
                <div className="text-[11px] font-cinzel uppercase tracking-wider text-slate-600">Documented Prodigies</div>
              </div>
              <div className="bg-[#F4EFE6] border border-[#D8CFC0] rounded-lg px-3.5 py-2.5">
                <div className="font-cinzel text-lg sm:text-xl font-bold text-slate-900">{countryStats.length} Nations</div>
                <div className="text-[11px] font-cinzel uppercase tracking-wider text-slate-600">Worldwide Sanctuary Sites</div>
              </div>
              <div className="bg-[#F4EFE6] border border-[#D8CFC0] rounded-lg px-3.5 py-2.5">
                <div className="font-cinzel text-lg sm:text-xl font-bold text-slate-900">3rd – 21st C.</div>
                <div className="text-[11px] font-cinzel uppercase tracking-wider text-slate-600">1,800 Years of Testimony</div>
              </div>
              <div className="bg-[#F4EFE6] border border-[#D8CFC0] rounded-lg px-3.5 py-2.5">
                <div className="font-cinzel text-lg sm:text-xl font-bold text-slate-900">Type AB</div>
                <div className="text-[11px] font-cinzel uppercase tracking-wider text-slate-600">Myocardium &amp; Shroud Match</div>
              </div>
            </div>
          </div>

          {/* Curatorial Navigation & Filter Console */}
          <div className="space-y-4 bg-[#F4EFE6]/90 backdrop-blur-md p-4 sm:p-5 rounded-xl border border-[#D8CFC0] shadow-2xs">
            
            {/* Row 1: Quick Exhibition Collections + Order By Dropdown */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3.5 border-b border-[#D8CFC0]">
              <div className="space-y-1.5">
                <span className="font-cinzel text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5 text-slate-600" />
                  Exhibition Collections:
                </span>
                <div className="flex flex-wrap items-center gap-1.5">
                  {(
                    [
                      { id: 'all', label: `All (${EUCHARISTIC_MIRACLES_DATA.length})` },
                      { id: 'forensic', label: 'With Forensic Report' },
                      { id: 'Italy', label: 'Italy' },
                      { id: 'Spain', label: 'Spain' },
                      { id: 'France', label: 'France' },
                      { id: 'Germany', label: 'Germany' },
                      { id: 'americas', label: 'The Americas' },
                      { id: 'other', label: 'Other Nations' }
                    ] as { id: QuickCollection; label: string }[]
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => handleSelectQuickCollection(tab.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-cinzel transition-all cursor-pointer ${
                        quickCollection === tab.id
                          ? 'bg-slate-800 text-[#F9F6F0] font-bold shadow-xs border border-slate-900'
                          : 'bg-[#FBF9F5] text-slate-700 border border-[#D8CFC0] hover:bg-[#EAE2D3] hover:border-slate-400'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Order By Control */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 shrink-0">
                <label className="font-cinzel text-[11px] font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1">
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-600" />
                  Order By:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-3 py-1.5 rounded-lg text-xs font-cinzel font-semibold bg-[#FBF9F5] text-slate-900 border border-[#C8BBA6] focus:outline-none focus:border-slate-700 cursor-pointer"
                >
                  <option value="chrono-asc">Chronological (Ancient → Modern)</option>
                  <option value="chrono-desc">Chronological (Modern → Ancient)</option>
                  <option value="country-az">Country &amp; City (A–Z)</option>
                  <option value="forensic-first">Scientific &amp; Forensic Reports First</option>
                </select>
              </div>
            </div>

            {/* Row 2: Historical Era Filter */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#D8CFC0]">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-cinzel text-[11px] font-bold uppercase tracking-wider text-slate-700 mr-1 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-600" />
                  Historical Era:
                </span>
                {(
                  [
                    { id: 'all', label: 'All Centuries' },
                    { id: 'ancient', label: 'Early & Romanesque (3rd–12th C.)' },
                    { id: 'medieval', label: 'High & Late Middle Ages (13th–15th C.)' },
                    { id: 'early-modern', label: 'Renaissance & Baroque (16th–18th C.)' },
                    { id: 'modern', label: 'Modern & Forensic Era (19th–21st C.)' }
                  ] as { id: EraFilter; label: string }[]
                ).map((era) => (
                  <button
                    key={era.id}
                    onClick={() => setSelectedEra(era.id)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-serif-sacred transition-all cursor-pointer ${
                      selectedEra === era.id
                        ? 'bg-slate-700 text-[#F9F6F0] font-bold border border-slate-800'
                        : 'bg-[#FBF9F5] text-slate-700 border border-[#D8CFC0] hover:bg-[#EAE2D3]'
                    }`}
                  >
                    {era.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Row 3: Filter by Miracle Phenomenon */}
            <div className="space-y-1.5 pb-3 border-b border-[#D8CFC0]">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 font-cinzel text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-slate-600" />
                  Filter by Phenomenon:
                </span>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-cinzel font-bold text-slate-800">
                    Showing {filteredMiracles.length} of {EUCHARISTIC_MIRACLES_DATA.length} Prodigies
                  </span>
                  {hasActiveFilters && (
                    <button
                      onClick={resetAllFilters}
                      className="text-[11px] font-cinzel font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 underline cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" />
                      Reset Filters
                    </button>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {miracleTypes.map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedType(t)}
                    className={`px-2.5 py-1 rounded-md text-xs font-cinzel transition-all cursor-pointer ${
                      selectedType === t
                        ? 'bg-slate-800 text-[#F9F6F0] font-bold shadow-xs border border-slate-900'
                        : 'bg-[#FBF9F5] text-slate-700 border border-[#D8CFC0] hover:bg-[#EAE2D3]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Row 4: Filter by Nation (with counts) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 font-cinzel text-[11px] uppercase tracking-wider flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-600" />
                  Filter by Nation ({countryStats.length} Countries):
                </span>
                <button
                  onClick={() => setShowAllCountries(!showAllCountries)}
                  className="text-[11px] font-cinzel font-semibold text-slate-600 hover:text-slate-900 underline cursor-pointer"
                >
                  {showAllCountries ? 'Compact Nation List' : `Show All ${countryStats.length} Nations`}
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  onClick={() => handleSelectCountry('All')}
                  className={`px-2.5 py-1 rounded-md text-xs font-serif-sacred transition-all cursor-pointer ${
                    selectedCountry === 'All'
                      ? 'bg-slate-800 text-[#F9F6F0] font-bold shadow-xs border border-slate-900'
                      : 'bg-[#FBF9F5] text-slate-700 border border-[#D8CFC0] hover:bg-[#EAE2D3]'
                  }`}
                >
                  All Nations ({EUCHARISTIC_MIRACLES_DATA.length})
                </button>
                {(showAllCountries ? countryStats : countryStats.slice(0, 10)).map(({ country, count }) => (
                  <button
                    key={country}
                    onClick={() => handleSelectCountry(country)}
                    className={`px-2.5 py-1 rounded-md text-xs font-serif-sacred transition-all cursor-pointer ${
                      selectedCountry === country
                        ? 'bg-slate-800 text-[#F9F6F0] font-bold shadow-xs border border-slate-900'
                        : 'bg-[#FBF9F5] text-slate-700 border border-[#D8CFC0] hover:bg-[#EAE2D3]'
                    }`}
                  >
                    {country} <span className="opacity-75 text-[11px]">({count})</span>
                  </button>
                ))}
                {!showAllCountries && countryStats.length > 10 && (
                  <button
                    onClick={() => setShowAllCountries(true)}
                    className="px-2.5 py-1 rounded-md text-xs font-cinzel font-semibold bg-[#EAE2D3] text-slate-800 border border-[#C8BBA6] hover:bg-[#DFD5C3] cursor-pointer"
                  >
                    +{countryStats.length - 10} More Nations…
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Exhibition Catalog Grid — Bleached Sand & Slate Gray Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredMiracles.map((m, idx) => {
              const isForensic = hasForensicReport(m);
              return (
                <article
                  key={m.id}
                  onClick={() => setInspectedMiracle(m)}
                  className="p-5 rounded-xl bg-gradient-to-br from-[#FBF9F5] via-[#F6F2EA] to-[#ECE5D5] border border-[#D8CFC0] hover:border-slate-500 shadow-[0_3px_14px_rgba(51,65,85,0.06)] hover:shadow-[0_8px_24px_rgba(51,65,85,0.14)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3.5 group"
                >
                  {/* Top Editorial Kicker & Accession Header */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2 text-[11px] font-cinzel tracking-wider uppercase text-slate-600 border-b border-[#D8CFC0] pb-2">
                      <span className="font-bold text-slate-700 truncate flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                        {m.location}, {m.country}
                      </span>
                      <span className="font-bold text-slate-900 shrink-0">
                        {m.year}
                      </span>
                    </div>

                    {/* Title */}
                    <h5 className="font-cinzel font-bold text-base sm:text-[17px] text-slate-900 group-hover:text-slate-600 transition-colors leading-snug pt-0.5">
                      {m.title}
                    </h5>

                    {/* Summary Prose */}
                    <p className="font-serif-sacred text-slate-700 text-xs sm:text-[13px] line-clamp-3 leading-relaxed">
                      {m.summary}
                    </p>
                  </div>

                  {/* Unboxed Archival Footer */}
                  <div className="pt-2.5 border-t border-[#D8CFC0] space-y-2">
                    <div className="flex items-center justify-between gap-2 text-[11px]">
                      <span className="font-cinzel font-semibold text-slate-700 truncate">
                        {m.miracleType}
                      </span>
                      {m.bloodType ? (
                        <span className="font-cinzel font-bold text-slate-800 shrink-0 flex items-center gap-1">
                          <Heart className="w-3 h-3 text-slate-700" />
                          Type {m.bloodType}
                        </span>
                      ) : isForensic ? (
                        <span className="font-cinzel font-semibold text-slate-700 shrink-0 flex items-center gap-1">
                          <Microscope className="w-3 h-3 text-slate-600" />
                          Forensic Dossier
                        </span>
                      ) : (
                        <span className="font-serif-sacred italic text-slate-500 shrink-0">
                          Cat. #{String(idx + 1).padStart(3, '0')}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[#D8CFC0]/70">
                      <span className="font-serif-sacred italic text-slate-600 truncate max-w-[65%]">
                        St. Carlo Acutis Archive
                      </span>
                      <span className="font-cinzel font-bold text-slate-800 group-hover:text-slate-950 transition-colors shrink-0">
                        Inspect Dossier →
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {filteredMiracles.length === 0 && (
            <div className="text-center py-12 bg-[#F4EFE6] rounded-xl border border-[#D8CFC0] space-y-3">
              <p className="font-serif-sacred text-slate-700 text-base">
                No Eucharistic Miracles match the selected filters.
              </p>
              <button
                onClick={resetAllFilters}
                className="px-4 py-2 rounded-lg bg-slate-800 text-[#F9F6F0] text-xs font-cinzel font-bold hover:bg-slate-900 transition-colors cursor-pointer"
              >
                Reset Exhibition Filters
              </button>
            </div>
          )}

        </div>
      )}

      {/* Museum Accession Dossier Modal for Inspected Eucharistic Miracle */}
      {inspectedMiracle && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in"
          onClick={() => setInspectedMiracle(null)}
        >
          <div
            className="bg-[#F9F6F0] rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border-2 border-slate-600/70 shadow-2xl p-5 sm:p-7 space-y-5 text-slate-900 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Navigation Bar inside Modal */}
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#D8CFC0]">
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-[11px] font-bold uppercase tracking-widest text-slate-600">
                  Exhibition Dossier {inspectedIndex >= 0 ? `${inspectedIndex + 1} of ${filteredMiracles.length}` : ''}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                {inspectedIndex > 0 && (
                  <button
                    onClick={() => setInspectedMiracle(filteredMiracles[inspectedIndex - 1])}
                    className="px-2.5 py-1 rounded-md bg-[#EAE2D3] hover:bg-[#DFD5C3] text-slate-800 border border-[#C8BBA6] text-xs font-cinzel font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                    title="Previous Miracle"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    Prev
                  </button>
                )}
                {inspectedIndex >= 0 && inspectedIndex < filteredMiracles.length - 1 && (
                  <button
                    onClick={() => setInspectedMiracle(filteredMiracles[inspectedIndex + 1])}
                    className="px-2.5 py-1 rounded-md bg-[#EAE2D3] hover:bg-[#DFD5C3] text-slate-800 border border-[#C8BBA6] text-xs font-cinzel font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                    title="Next Miracle"
                  >
                    Next
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  onClick={() => setInspectedMiracle(null)}
                  className="p-1.5 rounded-md bg-[#EAE2D3] hover:bg-[#DFD5C3] text-slate-800 border border-[#C8BBA6] transition-colors cursor-pointer ml-1"
                  title="Close"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Title & Accession Metadata Grid */}
            <div className="space-y-4">
              <div>
                <div className="text-xs font-cinzel font-bold uppercase tracking-widest text-slate-600">
                  {inspectedMiracle.location}, {inspectedMiracle.country} · {inspectedMiracle.year}
                </div>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-slate-900 leading-snug mt-1">
                  {inspectedMiracle.title}
                </h3>
              </div>

              {/* Museum Accession Definition List */}
              <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#EFE9DC] p-3.5 rounded-xl border border-[#D8CFC0] text-xs">
                <div className="space-y-0.5">
                  <dt className="font-cinzel text-[10px] uppercase tracking-wider text-slate-600">Sanctuary City</dt>
                  <dd className="font-serif-sacred font-bold text-slate-900">{inspectedMiracle.location}, {inspectedMiracle.country}</dd>
                </div>
                <div className="space-y-0.5">
                  <dt className="font-cinzel text-[10px] uppercase tracking-wider text-slate-600">Documented Date</dt>
                  <dd className="font-serif-sacred font-bold text-slate-900">{inspectedMiracle.year}</dd>
                </div>
                <div className="space-y-0.5">
                  <dt className="font-cinzel text-[10px] uppercase tracking-wider text-slate-600">Phenomenon</dt>
                  <dd className="font-serif-sacred font-bold text-slate-900">{inspectedMiracle.miracleType}</dd>
                </div>
                <div className="space-y-0.5">
                  <dt className="font-cinzel text-[10px] uppercase tracking-wider text-slate-600">Forensic Profile</dt>
                  <dd className="font-serif-sacred font-bold text-slate-900">
                    {inspectedMiracle.bloodType ? `Blood Type ${inspectedMiracle.bloodType}` : 'Canonical Testimony'}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Historical Context */}
            <div className="space-y-2">
              <h4 className="font-cinzel font-bold text-xs sm:text-sm text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-slate-600" />
                Historical Account &amp; Exhibition Narrative
              </h4>
              <div className="font-serif-sacred text-slate-800 text-sm sm:text-base leading-relaxed bg-[#FBF9F5] p-4 sm:p-5 rounded-xl border border-[#D8CFC0]">
                {inspectedMiracle.historicalContext}
              </div>
            </div>

            {/* Scientific and Canonical Investigation */}
            <div className="space-y-2">
              <h4 className="font-cinzel font-bold text-xs sm:text-sm text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Microscope className="w-4 h-4 text-slate-600" />
                Scientific, Canonical &amp; Reliquary Investigation
              </h4>
              <div className="font-serif-sacred text-slate-800 text-sm sm:text-base leading-relaxed bg-[#FBF9F5] p-4 sm:p-5 rounded-xl border border-[#D8CFC0]">
                {inspectedMiracle.scientificOrChurchInvestigation}
              </div>
            </div>

            {/* Scientific Findings List */}
            {inspectedMiracle.keyScientificFindings && inspectedMiracle.keyScientificFindings.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-cinzel font-bold text-xs sm:text-sm text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-slate-600" />
                  Key Laboratory &amp; Histopathological Findings
                </h4>
                <div className="bg-[#EFE9DC] p-4 rounded-xl border border-[#C8BBA6] space-y-1.5 text-xs sm:text-sm font-serif-sacred text-slate-800">
                  {inspectedMiracle.keyScientificFindings.map((finding, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-slate-700 font-bold">•</span>
                      <span>{finding}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Papal / Ecclesial Approval and Current Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-serif-sacred">
              <div className="p-3.5 bg-[#FBF9F5] rounded-xl border border-[#D8CFC0] space-y-1">
                <span className="font-cinzel font-bold text-slate-800 block uppercase tracking-wider text-[11px]">
                  Ecclesial &amp; Papal Recognition
                </span>
                <p className="text-slate-700 leading-relaxed">{inspectedMiracle.papalOrEcclesialApproval}</p>
              </div>

              <div className="p-3.5 bg-[#FBF9F5] rounded-xl border border-[#D8CFC0] space-y-1">
                <span className="font-cinzel font-bold text-slate-800 block uppercase tracking-wider text-[11px]">
                  Current Sanctuary &amp; Relic Preservation
                </span>
                <p className="text-slate-700 leading-relaxed">{inspectedMiracle.currentLocation}</p>
              </div>
            </div>

            {/* Source and Attribution Box */}
            <div className="bg-slate-800 text-[#F9F6F0] p-4 rounded-xl border border-slate-700 text-xs sm:text-sm font-serif-sacred space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#F4EFE6] font-cinzel text-xs uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-[#DFD5C3]" />
                {inspectedMiracle.sourceAttribution}
              </div>
              <p className="text-[#DFD5C3] text-xs">
                Complete Catalog of Eucharistic Miracles by Saint Carlo Acutis (<span className="italic">The Eucharistic Miracles of the World</span> · miracolieucaristici.com).
              </p>
            </div>

            {/* Modal Footer with Prev/Next and Close */}
            <div className="pt-3 border-t border-[#D8CFC0] flex items-center justify-between">
              <div className="flex items-center gap-2">
                {inspectedIndex > 0 && (
                  <button
                    onClick={() => setInspectedMiracle(filteredMiracles[inspectedIndex - 1])}
                    className="px-3.5 py-2 rounded-lg bg-[#EAE2D3] hover:bg-[#DFD5C3] text-slate-800 border border-[#C8BBA6] text-xs font-cinzel font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous Miracle
                  </button>
                )}
                {inspectedIndex >= 0 && inspectedIndex < filteredMiracles.length - 1 && (
                  <button
                    onClick={() => setInspectedMiracle(filteredMiracles[inspectedIndex + 1])}
                    className="px-3.5 py-2 rounded-lg bg-[#EAE2D3] hover:bg-[#DFD5C3] text-slate-800 border border-[#C8BBA6] text-xs font-cinzel font-bold flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    Next Miracle
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              <button
                onClick={() => setInspectedMiracle(null)}
                className="px-5 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-[#F9F6F0] text-xs sm:text-sm font-cinzel font-bold cursor-pointer transition-colors"
              >
                Close Dossier
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
