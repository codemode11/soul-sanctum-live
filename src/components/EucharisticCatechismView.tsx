import React, { useState } from 'react';
import { EUCHARISTIC_MIRACLES_DATA, EucharisticMiracle } from '../data/eucharisticMiracles';
import { Sparkles, Filter, ShieldCheck, Microscope, Heart, Globe, X, BookOpen, Calendar, MapPin } from 'lucide-react';

interface EucharisticCatechismViewProps {
  initialSection?: 'john6' | 'miracles' | 'transubstantiation';
}

export const EucharisticCatechismView: React.FC<EucharisticCatechismViewProps> = ({
  initialSection = 'transubstantiation'
}) => {
  const [activeSection, setActiveSection] = useState<'john6' | 'miracles' | 'transubstantiation'>(initialSection);
  
  // Eucharistic Miracles filter state (Search function removed per request)
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
    'Halting a Tsunami',
    'Adoration by Animals',
    'Supernatural Light',
    'Apparition in Host'
  ];

  // Filter miracles and maintain chronological order
  const parseMiracleYear = (yearStr: string): number => {
    const match = yearStr.match(/\d{3,4}/);
    return match ? parseInt(match[0], 10) : 0;
  };

  const filteredMiracles = EUCHARISTIC_MIRACLES_DATA.filter(m => {
    const matchesCountry = selectedCountry === 'All' || m.country === selectedCountry;
    const matchesType = selectedType === 'All' || m.miracleType === selectedType;
    return matchesCountry && matchesType;
  }).sort((a, b) => parseMiracleYear(a.year) - parseMiracleYear(b.year));

  return (
    <div className="max-w-5xl mx-auto p-3 sm:p-6 md:p-8 rounded-xl bg-white/45 backdrop-blur-xl backdrop-saturate-150 border border-white/60 ring-1 ring-inset ring-white/40 shadow-[0_8px_32px_0_rgba(120,90,50,0.12)] space-y-6 mb-12">
      
      {/* Top Banner */}
      <div className="sanctum-top-banner px-5 pt-4 pb-4 sm:px-6 min-h-[164px] bg-gradient-to-r from-[#3A2112] via-[#2A180D] to-[#4A2B18] rounded-xl text-[#FAF5EE] shadow-md border border-[#6E472B]/60">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-[#DFC8AE] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D2B494]" />
            Sacramentum Caritatis • Source and Summit of Catholic Faith
          </span>
        </div>
        <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#FDFBF7] tracking-wide">
          Catechism on the Eucharist and Miracles Approved by the Vatican
        </h3>
        <p className="text-xs sm:text-sm text-[#E8D8C6] font-serif-sacred max-w-3xl mt-1 leading-relaxed">
          &ldquo;The Eucharist is the heart and the summit of the Church&apos;s life, for in it Christ associates his Church and all her members with his sacrifice of praise and thanksgiving offered once for all on the cross to his Father.&rdquo; (CCC 1407)
        </p>

        {/* Sub-navigation tabs */}
        <div className="flex flex-wrap gap-2 mt-5">
          <button
            onClick={() => setActiveSection('miracles')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold font-cinzel transition-all cursor-pointer flex items-center gap-2 ${
              activeSection === 'miracles'
                ? 'bg-[#EFE5D8] text-[#2A180D] shadow-sm font-bold border border-[#D6C2AC]'
                : 'bg-[#4A2C19]/80 text-[#E8D8C6] hover:bg-[#5C3A21] border border-[#70482B]/50'
            }`}
          >
            <Sparkles className={`w-4 h-4 ${activeSection === 'miracles' ? 'text-[#5C3A21]' : 'text-[#D2B494]'}`} />
            <span>St. Carlo Acutis Vatican Exhibition Archive ({EUCHARISTIC_MIRACLES_DATA.length})</span>
          </button>

          <button
            onClick={() => setActiveSection('transubstantiation')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold font-cinzel transition-all cursor-pointer ${
              activeSection === 'transubstantiation'
                ? 'bg-[#EFE5D8] text-[#2A180D] shadow-sm font-bold border border-[#D6C2AC]'
                : 'bg-[#4A2C19]/80 text-[#E8D8C6] hover:bg-[#5C3A21] border border-[#70482B]/50'
            }`}
          >
            The Dogma of Transubstantiation
          </button>

          <button
            onClick={() => setActiveSection('john6')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold font-cinzel transition-all cursor-pointer ${
              activeSection === 'john6'
                ? 'bg-[#EFE5D8] text-[#2A180D] shadow-sm font-bold border border-[#D6C2AC]'
                : 'bg-[#4A2C19]/80 text-[#E8D8C6] hover:bg-[#5C3A21] border border-[#70482B]/50'
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
        <div className="bg-white/55 backdrop-blur-xl backdrop-saturate-150 rounded-xl p-6 sm:p-8 shadow-xs border border-white/70 ring-1 ring-inset ring-white/40 space-y-6">
          <div className="border-b border-[#D6C2AC] pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#70482B] font-cinzel">
              Dogmatic Formulation • Council of Trent (1551)
            </span>
            <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-[#2A180D] mt-1">
              What is Transubstantiation? (Substance vs. Accidents)
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* The Metaphysics */}
            <div className="p-5 rounded-xl bg-[#F5EDE2] border border-[#D6C2AC] space-y-3">
              <div className="flex items-center gap-2 text-[#4E2F1A] font-cinzel font-bold text-sm">
                <span>1. Substance (What it Is)</span>
              </div>
              <p className="font-serif-sacred text-[#4E2F1A] text-sm sm:text-base leading-relaxed">
                In classical philosophy and Catholic theology (formulated by St. Thomas Aquinas), the <span className="font-bold text-[#2A180D]">Substance</span> is the underlying essence or core identity of a thing—what it truly is in its deepest reality.
              </p>
              <div className="p-3 bg-[#EFE5D8] rounded-xl border border-[#C8B094] text-xs font-serif-sacred text-[#3B2314] font-medium">
                At the consecration, the entire substance of bread and wine ceases to exist and is replaced by the true Substance of Christ: His Body, Blood, Soul, and Divinity.
              </div>
            </div>

            {/* The Accidents */}
            <div className="p-5 rounded-xl bg-[#F5EDE2] border border-[#D6C2AC] space-y-3">
              <div className="flex items-center gap-2 text-[#4E2F1A] font-cinzel font-bold text-sm">
                <span>2. The Accidents (How it Appears)</span>
              </div>
              <p className="font-serif-sacred text-[#4E2F1A] text-sm sm:text-base leading-relaxed">
                The <span className="font-bold text-[#2A180D]">Accidents</span> (or species) are the perceptible physical properties: physical dimensions, chemical weight, color, taste, scent, texture, and nutritional breakdown.
              </p>
              <div className="p-3 bg-[#EFE5D8] rounded-xl border border-[#C8B094] text-xs font-serif-sacred text-[#3B2314] font-medium">
                By a unique miracle of divine omnipotence, the accidents of bread and wine remain intact without their natural subject, allowing us to receive the King of Heaven without natural horror.
              </div>
            </div>

          </div>

          {/* Totus Christus and In Persona Christi */}
          <div className="p-6 rounded-xl bg-[#EFE5D8]/85 border border-[#C8B094] space-y-4">
            <h5 className="font-cinzel text-base font-bold text-[#2A180D]">
              Crucial Doctrinal Pillars of the Real Presence:
            </h5>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm font-serif-sacred text-[#4E2F1A]">
              <div className="bg-[#FAF5EE] p-4 rounded-lg border border-[#D6C2AC] space-y-1.5">
                <span className="font-bold font-cinzel text-[#5C3A21] block text-xs">A. Totus Christus (Whole Christ)</span>
                <p>
                  Christ is present whole and entire in each of the species and whole and entire in each of their parts, in such a way that the breaking of the bread does not divide Christ. (CCC 1377)
                </p>
              </div>

              <div className="bg-[#FAF5EE] p-4 rounded-lg border border-[#D6C2AC] space-y-1.5">
                <span className="font-bold font-cinzel text-[#5C3A21] block text-xs">B. Permanent Presence</span>
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
        <div className="bg-white/55 backdrop-blur-xl backdrop-saturate-150 rounded-xl p-6 sm:p-8 shadow-xs border border-white/70 ring-1 ring-inset ring-white/40 space-y-6">
          <div className="border-b border-[#D6C2AC] pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-[#70482B] font-cinzel">
              Biblical Foundation • Holy Gospel of Saint John
            </span>
            <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-[#2A180D] mt-1">
              The Bread of Life Discourse (John 6:51–69)
            </h4>
          </div>

          <div className="space-y-4 font-serif-sacred text-[#4E2F1A] text-sm sm:text-base leading-relaxed">
            <p>
              In Capernaum, following the miraculous multiplication of the loaves, Our Lord Jesus Christ proclaimed the Eucharistic mystery in explicit, literal terms. When the crowds murmured, Jesus did not water down His language or explain it as a mere metaphor.
            </p>

            <blockquote className="p-4 bg-[#EFE5D8] border-l-4 border-[#5C3A21] rounded-r-xl italic space-y-2 text-[#2A180D]">
              <p>
                &ldquo;I am the living bread which came down from heaven; if any one eats of this bread, he will live for ever; and the bread which I shall give for the life of the world is my flesh.&rdquo; (John 6:51)
              </p>
              <p>
                &ldquo;Truly, truly, I say to you, unless you eat the flesh of the Son of man and drink his blood, you have no life in you; he who eats my flesh and drinks my blood has eternal life, and I will raise him up at the last day. For my flesh is food indeed, and my blood is drink indeed.&rdquo; (John 6:53–55)
              </p>
            </blockquote>

            <div className="p-4 bg-[#F5EDE2] rounded-xl border border-[#D6C2AC] space-y-2 text-xs sm:text-sm">
              <span className="font-cinzel font-bold text-[#2A180D] block">The Greek Verbs: Phago vs. Trogo</span>
              <p>
                In classical Greek, the general word for eating is <span className="font-bold text-[#5C3A21]">phago</span>. But when the listeners balked (&ldquo;How can this man give us his flesh to eat?&rdquo;), Jesus intensified His verb to <span className="font-bold text-[#5C3A21]">trogo</span> (used four times in verses 54–58), which literally means &ldquo;to gnaw, crunch, or chew,&rdquo; decisively refuting any purely symbolic interpretation.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 3: ST. CARLO ACUTIS VATICAN EUCHARISTIC MIRACLES ARCHIVE
         ========================================================================= */}
      {activeSection === 'miracles' && (
        <div className="bg-white/55 backdrop-blur-xl backdrop-saturate-150 rounded-xl p-5 sm:p-7 md:p-8 shadow-xs border border-white/70 ring-1 ring-inset ring-white/40 space-y-6">
          
          {/* Header and Vatican Source Attribution Banner */}
          <div className="border-b border-[#D6C2AC] pb-5 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#70482B]" />
              <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-[#5C3A21]">
                Vatican International Exhibition Archive
              </span>
            </div>
            <h4 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#2A180D] tracking-wide">
              Eucharistic Miracles Approved by the Catholic Church
            </h4>
            <p className="text-xs sm:text-sm text-[#4E2F1A] font-serif-sacred leading-relaxed max-w-4xl">
              Curated from the official Vatican International Exhibition <span className="font-bold text-[#2A180D]">&ldquo;The Eucharistic Miracles of the World&rdquo;</span> compiled by <span className="font-bold text-[#2A180D]">Saint Carlo Acutis</span> (<span className="underline decoration-[#8B5A2B] font-semibold">miracolieucaristici.org</span>) and endorsed by the Vatican Dicastery for the Doctrine of the Faith.
            </p>
          </div>

          {/* Filter Controls */}
          <div className="space-y-3.5 bg-white/50 backdrop-blur-md p-4 sm:p-5 rounded-xl border border-white/70 ring-1 ring-inset ring-white/40 shadow-2xs">
            
            {/* Filter by Miracle Type */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#3B2314] font-cinzel text-xs flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-[#70482B]" />
                  Filter by Phenomenon:
                </span>
                <span className="text-[11px] font-serif text-[#70482B]">
                  {filteredMiracles.length} miracles displayed
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {miracleTypes.map(t => (
                  <button
                    key={t}
                    onClick={() => setSelectedType(t)}
                    className={`px-3 py-1 rounded-lg text-xs font-cinzel transition-all cursor-pointer ${
                      selectedType === t
                        ? 'bg-[#4E2F1A] text-[#FAF5EE] font-bold shadow-xs border border-[#3B2314]'
                        : 'bg-[#FAF5EE] text-[#4E2F1A] border border-[#D6C2AC] hover:bg-[#E6D7C3] hover:border-[#A67C52]'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter by Country */}
            <div className="space-y-1.5 pt-2 border-t border-[#D6C2AC]">
              <span className="font-bold text-[#3B2314] font-cinzel text-xs flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#70482B]" />
                Filter by Nation:
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {countries.map(c => (
                  <button
                    key={c}
                    onClick={() => setSelectedCountry(c)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-serif transition-all cursor-pointer ${
                      selectedCountry === c
                        ? 'bg-[#3B2314] text-[#FAF5EE] font-bold shadow-xs border border-[#2A180D]'
                        : 'bg-[#FAF5EE] text-[#4E2F1A] border border-[#D6C2AC] hover:bg-[#E6D7C3]'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Reliquary Grid of Miracles (White & Brown Gradients) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {filteredMiracles.map((m) => (
              <div
                key={m.id}
                onClick={() => setInspectedMiracle(m)}
                className="p-5 sm:p-6 rounded-xl bg-gradient-to-br from-white via-[#FAF5EE] to-[#EFE5D8] border border-[#D6C2AC] hover:border-[#8B5A2B] shadow-[0_4px_20px_rgba(78,47,26,0.08)] hover:shadow-[0_8px_28px_rgba(78,47,26,0.16)] hover:-translate-y-0.5 transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-4 group relative"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#70482B] shrink-0" />
                      <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#5C3A21] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#70482B]" />
                        {m.location}, {m.country}
                      </span>
                    </div>
                    <span className="text-xs font-bold font-cinzel text-[#3B2314] bg-white/85 px-2.5 py-0.5 rounded-md border border-[#D6C2AC] shadow-2xs shrink-0 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#70482B]" />
                      {m.year}
                    </span>
                  </div>

                  <h5 className="font-cinzel font-bold text-base sm:text-lg text-[#2A180D] group-hover:text-[#70482B] transition-colors leading-snug">
                    {m.title}
                  </h5>

                  <p className="font-serif-sacred text-[#4E2F1A] text-xs sm:text-sm line-clamp-3 leading-relaxed">
                    {m.summary}
                  </p>
                </div>

                <div className="space-y-2.5 pt-3 border-t border-[#D6C2AC]/80">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2.5 py-1 rounded-md bg-white/85 text-[#3B2314] text-[11px] font-semibold border border-[#D6C2AC] flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#70482B]" />
                        {m.miracleType}
                      </span>
                      {m.bloodType && (
                        <span className="px-2.5 py-1 rounded-md bg-[#E6D7C3]/85 text-[#3B2314] text-[11px] font-bold border border-[#C8B094] flex items-center gap-1">
                          <Heart className="w-3 h-3 text-[#70482B]" />
                          Blood Type {m.bloodType} (Matches Shroud of Turin)
                        </span>
                      )}
                    </div>

                    <span className="font-cinzel font-bold text-[#5C3A21] group-hover:text-[#2A180D] text-xs shrink-0 flex items-center gap-1 ml-auto">
                      <Microscope className="w-3.5 h-3.5 text-[#70482B]" />
                      Forensic Findings →
                    </span>
                  </div>

                  {/* Explicit Source Citation */}
                  <div className="text-[11px] font-serif-sacred text-[#6E472B] italic truncate pt-1 border-t border-[#D6C2AC]/70 flex items-center justify-between gap-2">
                    <span className="truncate">Source: {m.sourceAttribution}</span>
                    <span className="text-[#5C3A21] font-semibold text-[10.5px] shrink-0 font-cinzel">St. Carlo Acutis Archive</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredMiracles.length === 0 && (
            <div className="text-center py-12 bg-[#EFE5D8] rounded-xl border border-[#D6C2AC] space-y-3">
              <p className="font-serif-sacred text-[#4E2F1A] text-base">
                No Eucharistic Miracles match the selected filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCountry('All');
                  setSelectedType('All');
                }}
                className="px-4 py-2 rounded-lg bg-[#4E2F1A] text-[#FAF5EE] text-xs font-cinzel font-bold hover:bg-[#3B2314] transition-colors cursor-pointer"
              >
                Reset Phenomenon and Nation Filters
              </button>
            </div>
          )}

        </div>
      )}

      {/* Detail Modal for Inspected Eucharistic Miracle */}
      {inspectedMiracle && (
        <div className="fixed inset-0 z-50 bg-[#1E1109]/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-[#FAF5EE] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border-2 border-[#70482B]/70 shadow-2xl p-6 sm:p-7 space-y-5 text-[#2A180D] relative">
            
            <button
              onClick={() => setInspectedMiracle(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-[#EFE5D8] hover:bg-[#E6D7C3] text-[#4E2F1A] border border-[#D6C2AC] transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-1.5 border-b border-[#D6C2AC] pb-4 pr-8">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-md bg-[#4E2F1A] text-[#FAF5EE] text-xs font-cinzel font-bold">
                  {inspectedMiracle.country} • {inspectedMiracle.year}
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-[#EFE5D8] text-[#3B2314] border border-[#C8B094] text-xs font-bold">
                  {inspectedMiracle.miracleType}
                </span>
                {inspectedMiracle.bloodType && (
                  <span className="px-2.5 py-0.5 rounded-md bg-[#70482B] text-[#FAF5EE] text-xs font-bold">
                    Blood Type {inspectedMiracle.bloodType} (Same as Shroud of Turin)
                  </span>
                )}
              </div>

              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#2A180D] leading-snug pt-1">
                {inspectedMiracle.title}
              </h3>
            </div>

            {/* Historical Context */}
            <div className="space-y-2">
              <h4 className="font-cinzel font-bold text-sm text-[#3B2314] uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#70482B]" />
                Historical Event and Context
              </h4>
              <p className="font-serif-sacred text-[#3B2314] text-sm sm:text-base leading-relaxed bg-[#FDFBF7] p-4 rounded-xl border border-[#D6C2AC]">
                {inspectedMiracle.historicalContext}
              </p>
            </div>

            {/* Scientific and Forensic Investigation */}
            <div className="space-y-2">
              <h4 className="font-cinzel font-bold text-sm text-[#3B2314] uppercase tracking-wider flex items-center gap-1.5">
                <Microscope className="w-4 h-4 text-[#70482B]" />
                Scientific and Laboratory Forensic Investigation
              </h4>
              <p className="font-serif-sacred text-[#3B2314] text-sm sm:text-base leading-relaxed bg-[#FDFBF7] p-4 rounded-xl border border-[#D6C2AC]">
                {inspectedMiracle.scientificOrChurchInvestigation}
              </p>
            </div>

            {/* Scientific Findings List */}
            {inspectedMiracle.keyScientificFindings && inspectedMiracle.keyScientificFindings.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-cinzel font-bold text-sm text-[#3B2314] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#70482B]" />
                  Key Laboratory Findings
                </h4>
                <div className="bg-[#EFE5D8] p-4 rounded-xl border border-[#C8B094] space-y-1.5 text-xs sm:text-sm font-serif-sacred text-[#3B2314]">
                  {inspectedMiracle.keyScientificFindings.map((finding, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-[#5C3A21] font-bold">•</span>
                      <span>{finding}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Source and Attribution Box */}
            <div className="space-y-2">
              <h4 className="font-cinzel font-bold text-sm text-[#3B2314] uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#70482B]" />
                Documented Source and Attribution
              </h4>
              <div className="bg-[#3B2314] text-[#FAF5EE] p-4 rounded-xl border border-[#5C3A21] text-xs sm:text-sm font-serif-sacred space-y-1">
                <p className="font-bold text-[#EFE5D8] font-cinzel">
                  {inspectedMiracle.sourceAttribution}
                </p>
                <p className="text-[#D6C2AC] text-xs">
                  Vatican International Exhibition: <span className="italic">The Eucharistic Miracles of the World</span> (Compiled by St. Carlo Acutis and Real Presence Association).
                </p>
              </div>
            </div>

            {/* Papal / Ecclesial Approval and Current Location */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-serif-sacred pt-1">
              <div className="p-3 bg-[#FDFBF7] rounded-xl border border-[#D6C2AC] space-y-1">
                <span className="font-cinzel font-bold text-[#3B2314] block">Ecclesial / Papal Recognition:</span>
                <p className="text-[#5C3A21]">{inspectedMiracle.papalOrEcclesialApproval}</p>
              </div>

              <div className="p-3 bg-[#FDFBF7] rounded-xl border border-[#D6C2AC] space-y-1">
                <span className="font-cinzel font-bold text-[#3B2314] block">Current Location of Relic:</span>
                <p className="text-[#5C3A21]">{inspectedMiracle.currentLocation}</p>
              </div>
            </div>

            {/* Close Button */}
            <div className="pt-3 border-t border-[#D6C2AC] flex justify-end">
              <button
                onClick={() => setInspectedMiracle(null)}
                className="px-5 py-2.5 rounded-lg bg-[#4E2F1A] hover:bg-[#3B2314] text-[#FAF5EE] text-xs sm:text-sm font-cinzel font-bold cursor-pointer transition-colors"
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

