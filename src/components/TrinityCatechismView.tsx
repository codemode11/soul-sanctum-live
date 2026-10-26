import React, { useState } from 'react';

export const TrinityCatechismView: React.FC = () => {
  const [selectedSubTab, setSelectedSubTab] = useState<'mystery' | 'athanasian' | 'heresies'>('mystery');

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-900 rounded-xl p-6 text-amber-50 shadow-md border border-amber-900/40">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-amber-300">
            Sanctissima Trinitas • Central Dogma of the Faith
          </span>
        </div>
        <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide">
          Catechism on the Most Holy Trinity
        </h3>
        <p className="text-xs sm:text-sm text-stone-300 font-serif-sacred max-w-2xl mt-1">
          "The mystery of the Most Holy Trinity is the central mystery of Christian faith and life. It is the mystery of God in himself. It is therefore the source of all the other mysteries of faith, the light that enlightens them." (CCC 234)
        </p>

        {/* Tab switcher */}
        <div className="flex flex-wrap gap-2 mt-5">
          <button
            onClick={() => setSelectedSubTab('mystery')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-cinzel transition-all cursor-pointer ${
              selectedSubTab === 'mystery'
                ? 'bg-amber-400 text-amber-950 shadow-sm'
                : 'bg-stone-800 text-amber-200 hover:bg-stone-700'
            }`}
          >
            One Substance, Three Persons
          </button>

          <button
            onClick={() => setSelectedSubTab('athanasian')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-cinzel transition-all cursor-pointer ${
              selectedSubTab === 'athanasian'
                ? 'bg-amber-400 text-amber-950 shadow-sm'
                : 'bg-stone-800 text-amber-200 hover:bg-stone-700'
            }`}
          >
            The Athanasian Creed (Quicumque Vult)
          </button>

          <button
            onClick={() => setSelectedSubTab('heresies')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-cinzel transition-all cursor-pointer ${
              selectedSubTab === 'heresies'
                ? 'bg-amber-400 text-amber-950 shadow-sm'
                : 'bg-stone-800 text-amber-200 hover:bg-stone-700'
            }`}
          >
            Heresies Refuted and Shields of Faith
          </button>
        </div>
      </div>

      {/* =========================================================================
          TAB 1: ONE SUBSTANCE, THREE PERSONS
         ========================================================================= */}
      {selectedSubTab === 'mystery' && (
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-xs border border-stone-200 space-y-6">
          <div className="border-b border-stone-200 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 font-cinzel">
              Dogmatic Formulation • Nicaea (325) and Constantinople (381)
            </span>
            <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900 mt-1">
              One Divine Nature, Three Really Distinct Persons
            </h4>
          </div>

          <div className="font-serif-sacred text-stone-800 text-base sm:text-lg leading-relaxed space-y-4">
            <p>
              The Church uses the term <span className="font-bold text-stone-900">Substance</span> (or nature / essence) to designate the divine being in its unity, the term <span className="font-bold text-stone-900">Person</span> (or hypostasis) to designate the Father, Son, and Holy Spirit in their real distinction, and the term <span className="font-bold text-stone-900">Relation</span> to designate the fact that their distinction lies entirely in the relationship of each to the others. (CCC 252)
            </p>
          </div>

          {/* Three Persons Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* The Father */}
            <div className="p-5 rounded-xl bg-[#FAF8F5] border border-amber-900/15 space-y-2">
              <span className="text-xs font-bold font-cinzel text-amber-950 uppercase tracking-wider block">
                God the Father (Pater)
              </span>
              <h5 className="font-cinzel text-lg font-bold text-stone-900">
                The Source and Origin
              </h5>
              <p className="text-xs sm:text-sm text-stone-700 font-serif-sacred leading-relaxed">
                The Father is <span className="font-semibold">Unbegotten</span> (Ingenitus). He is the principle without principle, the source and origin of the whole divinity. He generates the Son from all eternity.
              </p>
              <div className="text-[11px] text-amber-900 font-medium italic pt-1">
                "I and the Father are one." (John 10:30)
              </div>
            </div>

            {/* The Son */}
            <div className="p-5 rounded-xl bg-[#FAF8F5] border border-amber-900/15 space-y-2">
              <span className="text-xs font-bold font-cinzel text-amber-950 uppercase tracking-wider block">
                God the Son (Filius)
              </span>
              <h5 className="font-cinzel text-lg font-bold text-stone-900">
                Eternally Begotten (Logos)
              </h5>
              <p className="text-xs sm:text-sm text-stone-700 font-serif-sacred leading-relaxed">
                The Son is <span className="font-semibold">Begotten, not made</span> (Genitum, non factum), consubstantial (*Homoousios*) with the Father. He is the eternal Word, the perfect image of the Father.
              </p>
              <div className="text-[11px] text-amber-900 font-medium italic pt-1">
                "In the beginning was the Word, and the Word was with God, and the Word was God." (John 1:1)
              </div>
            </div>

            {/* The Holy Spirit */}
            <div className="p-5 rounded-xl bg-[#FAF8F5] border border-amber-900/15 space-y-2">
              <span className="text-xs font-bold font-cinzel text-amber-950 uppercase tracking-wider block">
                God the Holy Spirit (Spiritus Sanctus)
              </span>
              <h5 className="font-cinzel text-lg font-bold text-stone-900">
                Proceeding Love (*Filioque*)
              </h5>
              <p className="text-xs sm:text-sm text-stone-700 font-serif-sacred leading-relaxed">
                The Holy Spirit proceeds eternally from the Father and the Son as from a single principle, by spiration. He is the mutual Love and Gift of the Father and Son, adored and glorified together with them.
              </p>
              <div className="text-[11px] text-amber-900 font-medium italic pt-1">
                "The Spirit of truth who proceeds from the Father." (John 15:26)
              </div>
            </div>

          </div>

          {/* Perichoresis and Divine Indwelling */}
          <div className="p-6 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2">
            <h5 className="font-cinzel text-sm font-bold text-amber-950 uppercase tracking-wider">
              Circumincession / Perichoresis (Mutual Indwelling)
            </h5>
            <p className="text-xs sm:text-sm text-stone-800 font-serif-sacred leading-relaxed">
              Because of their one single divine nature, the Father is wholly in the Son and wholly in the Holy Spirit; the Son is wholly in the Father and wholly in the Holy Spirit; the Holy Spirit is wholly in the Father and wholly in the Son. By Holy Baptism, our souls become living temples of this Most Holy Trinity.
            </p>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: THE ATHANASIAN CREED (QUICUMQUE VULT)
         ========================================================================= */}
      {selectedSubTab === 'athanasian' && (
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-xs border border-stone-200 space-y-6">
          <div className="border-b border-stone-200 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 font-cinzel">
              Ancient Symbol of Faith • 5th Century
            </span>
            <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900 mt-1">
              The Athanasian Creed (Symbolum Quicumque)
            </h4>
          </div>

          <div className="p-6 rounded-xl bg-[#FCFAF7] border border-amber-900/15 font-serif-sacred text-stone-900 text-sm sm:text-base leading-relaxed space-y-4">
            <p className="font-bold font-cinzel text-amber-950">
              "Whosoever desires to be saved, must above all things hold the Catholic faith..."
            </p>

            <blockquote className="pl-4 border-l-2 border-amber-800 space-y-3 italic text-stone-800">
              <p>
                "And the Catholic faith is this: That we worship one God in Trinity, and Trinity in Unity; neither confounding the Persons, nor dividing the Substance."
              </p>
              <p>
                "For there is one Person of the Father; another of the Son; and another of the Holy Spirit. But the Godhead of the Father, of the Son, and of the Holy Spirit, is all one; the Glory equal, the Majesty coeternal."
              </p>
              <p>
                "Such as the Father is; such is the Son; and such is the Holy Spirit. The Father uncreated; the Son uncreated; and the Holy Spirit uncreated. The Father unlimited; the Son unlimited; and the Holy Spirit unlimited. The Father eternal; the Son eternal; and the Holy Spirit eternal. And yet they are not three eternals; but one eternal."
              </p>
              <p>
                "So the Father is God; the Son is God; and the Holy Spirit is God. And yet they are not three Gods; but one God."
              </p>
            </blockquote>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: HERESIES REFUTED
         ========================================================================= */}
      {selectedSubTab === 'heresies' && (
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-xs border border-stone-200 space-y-6">
          <div className="border-b border-stone-200 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 font-cinzel">
              Doctrinal Clarity • Council Defenses
            </span>
            <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900 mt-1">
              Trinitarian Heresies Refuted by the Church
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Modalism / Sabellianism */}
            <div className="p-4 bg-red-50/50 rounded-xl border border-red-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-cinzel font-bold text-red-950 text-sm">
                  Modalism (Sabellianism)
                </span>
                <span className="text-[10px] text-red-800 uppercase font-bold">Condemned</span>
              </div>
              <p className="text-xs text-stone-700 font-serif-sacred">
                <span className="font-semibold text-red-900">False claim:</span> God is only one person who puts on different "masks" or modes of operation (e.g. Creator in OT, Redeemer in NT, Sanctifier today).
              </p>
              <p className="text-xs text-stone-800 font-serif-sacred font-medium">
                <span className="font-semibold text-emerald-900">Catholic Truth:</span> The Father, Son, and Holy Spirit are three really distinct Divine Persons, coexisting from all eternity.
              </p>
            </div>

            {/* Arianism */}
            <div className="p-4 bg-red-50/50 rounded-xl border border-red-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-cinzel font-bold text-red-950 text-sm">
                  Arianism (Arius)
                </span>
                <span className="text-[10px] text-red-800 uppercase font-bold">Nicaea 325</span>
              </div>
              <p className="text-xs text-stone-700 font-serif-sacred">
                <span className="font-semibold text-red-900">False claim:</span> "There was a time when the Son was not." Claimed Christ was the highest created being, but not true God.
              </p>
              <p className="text-xs text-stone-800 font-serif-sacred font-medium">
                <span className="font-semibold text-emerald-900">Catholic Truth:</span> The Son is consubstantial (*Homoousios*) with the Father, God from God, Light from Light, True God from True God.
              </p>
            </div>

            {/* Tritheism */}
            <div className="p-4 bg-red-50/50 rounded-xl border border-red-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-cinzel font-bold text-red-950 text-sm">
                  Tritheism
                </span>
                <span className="text-[10px] text-red-800 uppercase font-bold">Condemned</span>
              </div>
              <p className="text-xs text-stone-700 font-serif-sacred">
                <span className="font-semibold text-red-900">False claim:</span> Believing there are three separate, independent gods who collaborate together.
              </p>
              <p className="text-xs text-stone-800 font-serif-sacred font-medium">
                <span className="font-semibold text-emerald-900">Catholic Truth:</span> There is strictly only ONE God in numerical unity of substance.
              </p>
            </div>

            {/* Macedonianism */}
            <div className="p-4 bg-red-50/50 rounded-xl border border-red-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-cinzel font-bold text-red-950 text-sm">
                  Macedonianism
                </span>
                <span className="text-[10px] text-red-800 uppercase font-bold">Const. 381</span>
              </div>
              <p className="text-xs text-stone-700 font-serif-sacred">
                <span className="font-semibold text-red-900">False claim:</span> Denied the divinity of the Holy Spirit, treating Him as a mere energy or creature.
              </p>
              <p className="text-xs text-stone-800 font-serif-sacred font-medium">
                <span className="font-semibold text-emerald-900">Catholic Truth:</span> The Holy Spirit is the Lord and Giver of Life, who with the Father and Son is adored and glorified.
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
