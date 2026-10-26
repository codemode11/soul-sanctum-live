import React, { useState } from 'react';
import { EUCHARISTIC_MIRACLES_DATA, EucharisticMiracle } from '../data/eucharisticMiracles';
import { Search, Sparkles, Filter, ShieldCheck, Microscope, Heart, Flame, Globe, X, BookOpen, Layers, ExternalLink } from 'lucide-react';

interface EucharisticCatechismViewProps {
  initialSection?: 'john6' | 'miracles' | 'transubstantiation';
}

export const EucharisticCatechismView: React.FC<EucharisticCatechismViewProps> = ({
  initialSection = 'transubstantiation'
}) => {
  const [activeSection, setActiveSection] = useState<'john6' | 'miracles' | 'transubstantiation'>(initialSection);
  
  // Eucharistic Miracles state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [inspectedMiracle, setInspectedMiracle] = useState<EucharisticMiracle | null>(null);

  // Extract unique countries
  const countries = ['All', ...Array.from(new Set(EUCHARISTIC_MIRACLES_DATA.map(m => m.country)))];
  const miracleTypes = [
    'All', 
    'Heart Muscle Transformation', 
    'Bleeding Host', 
    'Incorrupt Host', 
    'Levitation', 
    'Fire Resistance', 
    'Tsunami Arrest',
    'Animal Adoration',
    'Supernatural Light',
    'Apparition in Host'
  ];

  // Filter miracles and maintain chronological order
  const parseMiracleYear = (yearStr: string): number => {
    const match = yearStr.match(/\d{3,4}/);
    return match ? parseInt(match[0], 10) : 0;
  };

  const filteredMiracles = EUCHARISTIC_MIRACLES_DATA.filter(m => {
    const matchesSearch = 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.historicalContext.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.scientificOrChurchInvestigation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.sourceAttribution.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCountry = selectedCountry === 'All' || m.country === selectedCountry;
    const matchesType = selectedType === 'All' || m.miracleType === selectedType;

    return matchesSearch && matchesCountry && matchesType;
  }).sort((a, b) => parseMiracleYear(a.year) - parseMiracleYear(b.year));

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-900 via-stone-900 to-amber-950 rounded-xl p-6 text-amber-50 shadow-md border border-amber-900/40">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-amber-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Sacramentum Caritatis • Source and Summit of Catholic Faith
          </span>
        </div>
        <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide">
          Catechism on the Eucharist and Miracles Approved by the Vatican
        </h3>
        <p className="text-xs sm:text-sm text-stone-300 font-serif-sacred max-w-3xl mt-1 leading-relaxed">
          "The Eucharist is the heart and the summit of the Church's life, for in it Christ associates his Church and all her members with his sacrifice of praise and thanksgiving offered once for all on the cross to his Father." (CCC 1407)
        </p>

        {/* Sub-navigation tabs */}
        <div className="flex flex-wrap gap-2 mt-5">
          <button
            onClick={() => setActiveSection('miracles')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold font-cinzel transition-all cursor-pointer flex items-center gap-2 ${
              activeSection === 'miracles'
                ? 'bg-amber-400 text-amber-950 shadow-sm font-bold'
                : 'bg-stone-800 text-amber-200 hover:bg-stone-700'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-900" />
            <span>St. Carlo Acutis Vatican Exhibition Archive ({EUCHARISTIC_MIRACLES_DATA.length})</span>
          </button>

          <button
            onClick={() => setActiveSection('transubstantiation')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold font-cinzel transition-all cursor-pointer ${
              activeSection === 'transubstantiation'
                ? 'bg-amber-400 text-amber-950 shadow-sm font-bold'
                : 'bg-stone-800 text-amber-200 hover:bg-stone-700'
            }`}
          >
            The Dogma of Transubstantiation
          </button>

          <button
            onClick={() => setActiveSection('john6')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold font-cinzel transition-all cursor-pointer ${
              activeSection === 'john6'
                ? 'bg-amber-400 text-amber-950 shadow-sm font-bold'
                : 'bg-stone-800 text-amber-200 hover:bg-stone-700'
            }`}
          >
            Bread of Life Discourse (John 6)
          </button>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1: EXPLANATION OF TRANSUBSTANTIATION
         ========================================================================= */}
      {activeSection === 'transubstantiation' && (
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-xs border border-stone-200 space-y-6">
          <div className="border-b border-stone-200 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 font-cinzel">
              Dogmatic Formulation • Council of Trent (1551)
            </span>
            <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900 mt-1">
              What is Transubstantiation? (Substance vs. Accidents)
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* The Metaphysics */}
            <div className="p-5 rounded-xl bg-[#FAF8F5] border border-amber-900/15 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-cinzel font-bold text-sm">
                <span>1. Substance (What it Is)</span>
              </div>
              <p className="font-serif-sacred text-stone-800 text-sm sm:text-base leading-relaxed">
                In classical philosophy and Catholic theology (formulated by St. Thomas Aquinas), the <span className="font-bold text-amber-950">Substance</span> is the underlying essence or core identity of a thing—what it truly is in its deepest reality.
              </p>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs font-serif-sacred text-amber-950 font-medium">
                At the consecration, the entire substance of bread and wine ceases to exist and is replaced by the true Substance of Christ: His Body, Blood, Soul, and Divinity.
              </div>
            </div>

            {/* The Accidents */}
            <div className="p-5 rounded-xl bg-[#FAF8F5] border border-amber-900/15 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-cinzel font-bold text-sm">
                <span>2. The Accidents (How it Appears)</span>
              </div>
              <p className="font-serif-sacred text-stone-800 text-sm sm:text-base leading-relaxed">
                The <span className="font-bold text-amber-950">Accidents</span> (or species) are the perceptible physical properties: physical dimensions, chemical weight, color, taste, scent, texture, and nutritional breakdown.
              </p>
              <div className="p-3 bg-stone-100 rounded-xl border border-stone-200 text-xs font-serif-sacred text-stone-800 font-medium">
                By a unique miracle of divine omnipotence, the accidents of bread and wine remain intact without their natural subject, allowing us to receive the King of Heaven without natural horror.
              </div>
            </div>

          </div>

          {/* Totus Christus and In Persona Christi */}
          <div className="p-6 rounded-xl bg-amber-50/60 border border-amber-200 space-y-4">
            <h5 className="font-cinzel text-base font-bold text-amber-950">
              Crucial Doctrinal Pillars of the Real Presence:
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-serif-sacred text-stone-800">
              <div className="space-y-1 p-3 bg-white rounded-xl border border-amber-200">
                <span className="font-bold font-cinzel text-amber-900 block text-sm">Totus Christus</span>
                <p>
                  Christ is present whole and entire in both species, and in every single particle of the Host and drop of the Precious Blood.
                </p>
              </div>
              <div className="space-y-1 p-3 bg-white rounded-xl border border-amber-200">
                <span className="font-bold font-cinzel text-amber-900 block text-sm">In Persona Christi</span>
                <p>
                  The priest does not say "This is Christ's body," but speaks in Christ's own voice: "This is MY Body." It is Christ who performs the sacrifice.
                </p>
              </div>
              <div className="space-y-1 p-3 bg-white rounded-xl border border-amber-200">
                <span className="font-bold font-cinzel text-amber-900 block text-sm">Perpetual Presence</span>
                <p>
                  The Real Presence continues as long as the Eucharistic species subsist. Hence, the reserved Host in the Tabernacle receives adoration (*latria*).
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
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-xs border border-stone-200 space-y-6">
          <div className="border-b border-stone-200 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 font-cinzel">
              Biblical Foundation • The Gospel of Saint John
            </span>
            <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900 mt-1">
              The Bread of Life Discourse (John 6:22–69)
            </h4>
          </div>

          <div className="space-y-4 text-stone-800 font-serif-sacred text-base sm:text-lg leading-relaxed">
            <p>
              Following the miraculous multiplication of the loaves and fish, crowds followed Jesus to Capernaum expecting earthly bread. Jesus redirected their gaze to the food that endures to eternal life.
            </p>

            <div className="p-5 rounded-xl bg-stone-900 text-stone-100 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-cinzel">
                The Greek Linguistic Proof
              </span>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                In verses 26–53, Jesus uses the standard Greek verb for eating: <span className="text-amber-300 font-bold">φαγεῖν (phagein)</span>. When the listeners murmured, Jesus did NOT say: "You misunderstand me, I only speak metaphorically."
              </p>
              <p className="text-amber-200 text-sm sm:text-base font-semibold">
                Instead, in verse 54, Christ deliberately escalates His vocabulary to <span className="text-white underline decoration-amber-400 font-bold">τρώγειν (trōgein)</span>—meaning to physically chew, gnaw, or feed upon: <br />
                <span className="italic font-normal">"He who chews (trōgōn) my flesh and drinks my blood has eternal life, and I will raise him up on the last day." (Jn 6:54)</span>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
                <span className="font-cinzel font-bold text-amber-950 text-sm block">
                  The Mass Departure of Disciples
                </span>
                <p className="text-xs sm:text-sm text-stone-700">
                  "After this many of his disciples drew back and no longer went about with him." (Jn 6:66). This is the only recorded instance in the Gospels where disciples left Christ over a doctrinal teaching. Jesus let them walk away because He would not compromise the literal reality of the Holy Eucharist.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2">
                <span className="font-cinzel font-bold text-amber-950 text-sm block">
                  Peter's Supreme Act of Faith
                </span>
                <p className="text-xs sm:text-sm text-stone-700">
                  Jesus said to the Twelve: "Will you also go away?" Simon Peter answered Him: "Lord, to whom shall we go? You have the words of eternal life; and we have believed, and have come to know, that you are the Holy One of God." (Jn 6:67–69)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 3: ST. CARLO ACUTIS VATICAN EUCHARISTIC MIRACLES ARCHIVE
         ========================================================================= */}
      {activeSection === 'miracles' && (
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-xs border border-stone-200 space-y-6">
          
          {/* Header and Source Attribution Banner */}
          <div className="border-b border-stone-200 pb-4">
            <h4 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-bold text-stone-900">
              Eucharistic Miracles
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 font-serif-sacred mt-1 leading-relaxed">
              Curated from the Vatican International Exhibition <span className="font-bold text-amber-950">"The Eucharistic Miracles of the World"</span> created by <span className="font-bold text-amber-950">St. Carlo Acutis</span> (<span className="underline decoration-amber-500">miracolieucaristici.org</span>) and endorsed by the Vatican Congregation for the Doctrine of the Faith.
            </p>
          </div>

          {/* Search and Filter Controls */}
          <div className="space-y-3 bg-[#FAF8F5] p-4 rounded-xl border border-stone-200">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Eucharistic Miracles by country, year, scientist, or St. Carlo Acutis source..."
                className="w-full pl-10 pr-4 py-2.5 bg-white rounded-lg border border-stone-300 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-800/40 font-serif-sacred shadow-2xs"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="font-bold text-stone-700 font-cinzel mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5 text-amber-800" />
                Type:
              </span>
              {miracleTypes.map(t => (
                <button
                  key={t}
                  onClick={() => setSelectedType(t)}
                  className={`px-3 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                    selectedType === t
                      ? 'bg-amber-900 text-white font-semibold shadow-2xs'
                      : 'bg-stone-200/80 text-stone-700 hover:bg-stone-300'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Country Selector Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
              <span className="font-bold text-stone-700 font-cinzel mr-1 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-amber-800" />
                Country:
              </span>
              {countries.map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedCountry(c)}
                  className={`px-2.5 py-0.5 rounded-lg text-xs transition-all cursor-pointer ${
                    selectedCountry === c
                      ? 'bg-stone-900 text-amber-200 font-bold'
                      : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

          </div>

          {/* Grid of Miracles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredMiracles.map((m) => (
              <div
                key={m.id}
                onClick={() => setInspectedMiracle(m)}
                className="p-5 rounded-xl bg-[#FCFAF7] border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-amber-700/50 transition-all cursor-pointer flex flex-col justify-between space-y-4 group relative"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-600 shrink-0" />
                      <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-amber-900">
                        {m.location}, {m.country}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-amber-950 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-300/60 shrink-0">
                      {m.year}
                    </span>
                  </div>

                  <h5 className="font-cinzel font-bold text-base sm:text-lg text-stone-900 group-hover:text-amber-900 transition-colors leading-snug">
                    {m.title}
                  </h5>

                  <p className="font-serif-sacred text-stone-700 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {m.summary}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-stone-200/80">
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2 py-0.5 rounded-md bg-stone-200/80 text-stone-800 text-[11px] font-medium">
                        {m.miracleType}
                      </span>
                      {m.bloodType && (
                        <span className="px-2 py-0.5 rounded-md bg-red-100 text-red-900 text-[11px] font-bold border border-red-200">
                          Blood Type {m.bloodType}
                        </span>
                      )}
                    </div>

                    <span className="font-cinzel font-bold text-amber-900 group-hover:underline text-xs shrink-0 flex items-center gap-1">
                      Details and Source →
                    </span>
                  </div>

                  {/* Explicit Source Citation */}
                  <div className="text-[11px] font-serif-sacred text-stone-500 italic truncate pt-1 border-t border-stone-100">
                    Source: {m.sourceAttribution}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredMiracles.length === 0 && (
            <div className="text-center py-12 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
              <p className="font-serif-sacred text-stone-600 text-base">
                No Eucharistic Miracles match your search query or filter selection.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCountry('All');
                  setSelectedType('All');
                }}
                className="px-4 py-2 rounded-lg bg-amber-900 text-amber-50 text-xs font-cinzel font-bold hover:bg-amber-800 transition-colors cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          )}

        </div>
      )}

      {/* Detail Modal for Inspected Eucharistic Miracle */}
      {inspectedMiracle && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#FAF7F2] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-amber-800/60 shadow-2xl p-6 sm:p-7 space-y-5 text-stone-900 relative">
            
            <button
              onClick={() => setInspectedMiracle(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-stone-200 text-stone-700 hover:bg-stone-300 transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-1.5 border-b border-stone-300 pb-4 pr-8">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-md bg-amber-900 text-amber-50 text-xs font-cinzel font-bold">
                  {inspectedMiracle.country} • {inspectedMiracle.year}
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-red-100 text-red-950 border border-red-300 text-xs font-bold">
                  {inspectedMiracle.miracleType}
                </span>
                {inspectedMiracle.bloodType && (
                  <span className="px-2.5 py-0.5 rounded-md bg-red-800 text-white text-xs font-bold">
                    Blood Type {inspectedMiracle.bloodType}
                  </span>
                )}
              </div>

              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900 leading-snug pt-1">
                {inspectedMiracle.title}
              </h3>
            </div>

            {/* Historical Context */}
            <div className="space-y-2">
              <h4 className="font-cinzel font-bold text-sm text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-800" />
                Historical Event and Context
              </h4>
              <p className="font-serif-sacred text-stone-800 text-sm sm:text-base leading-relaxed bg-white p-4 rounded-xl border border-stone-200">
                {inspectedMiracle.historicalContext}
              </p>
            </div>

            {/* Scientific and Forensic Investigation */}
            <div className="space-y-2">
              <h4 className="font-cinzel font-bold text-sm text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                <Microscope className="w-4 h-4 text-amber-800" />
                Scientific and Laboratory Investigation
              </h4>
              <p className="font-serif-sacred text-stone-800 text-sm sm:text-base leading-relaxed bg-white p-4 rounded-xl border border-stone-200">
                {inspectedMiracle.scientificOrChurchInvestigation}
              </p>
            </div>

            {/* Scientific Findings List */}
            {inspectedMiracle.keyScientificFindings && inspectedMiracle.keyScientificFindings.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-cinzel font-bold text-sm text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-800" />
                  Key Laboratory Findings
                </h4>
                <div className="bg-amber-50/80 p-4 rounded-xl border border-amber-200/90 space-y-1.5 text-xs sm:text-sm font-serif-sacred text-stone-800">
                  {inspectedMiracle.keyScientificFindings.map((finding, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-amber-900 font-bold">•</span>
                      <span>{finding}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Source and Attribution Box */}
            <div className="space-y-2">
              <h4 className="font-cinzel font-bold text-sm text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-800" />
                Documented Source and Attribution
              </h4>
              <div className="bg-stone-900 text-amber-100 p-4 rounded-xl border border-stone-800 text-xs sm:text-sm font-serif-sacred space-y-1">
                <p className="font-bold text-amber-300 font-cinzel">
                  {inspectedMiracle.sourceAttribution}
                </p>
                <p className="text-stone-300 text-xs">
                  Vatican International Exhibition: <span className="italic">The Eucharistic Miracles of the World</span> (Compiled by St. Carlo Acutis and Real Presence Association).
                </p>
              </div>
            </div>

            {/* Papal / Ecclesial Approval and Current Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-serif-sacred pt-1">
              <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                <span className="font-cinzel font-bold text-amber-950 block">Ecclesial / Papal Recognition:</span>
                <p className="text-stone-700">{inspectedMiracle.papalOrEcclesialApproval}</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-stone-200 space-y-1">
                <span className="font-cinzel font-bold text-amber-950 block">Current Location of Relic:</span>
                <p className="text-stone-700">{inspectedMiracle.currentLocation}</p>
              </div>
            </div>

            {/* Close Button */}
            <div className="pt-3 border-t border-stone-300 flex justify-end">
              <button
                onClick={() => setInspectedMiracle(null)}
                className="px-5 py-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-amber-100 text-xs sm:text-sm font-cinzel font-bold cursor-pointer transition-colors"
              >
                Close Miracle Details
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
