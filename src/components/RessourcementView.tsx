import React, { useState } from 'react';

export const RessourcementView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'movement' | 'theologians' | 'impact'>('movement');

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 rounded-xl p-6 text-amber-50 shadow-md border border-amber-900/40">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-amber-300">
            Ad Fontes • Return to the Apostolic Sources
          </span>
        </div>
        <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide">
          The Church's Direction Towards Ressourcement
        </h3>
        <p className="text-xs sm:text-sm text-stone-300 font-serif-sacred max-w-2xl mt-1">
          "True development consists not in cutting away the roots of Tradition, but in plunging ever more deeply into the pristine apostolic wellsprings of Sacred Scripture and the Church Fathers."
        </p>

        {/* Tab switcher */}
        <div className="flex flex-wrap gap-2 mt-5">
          <button
            onClick={() => setActiveTab('movement')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-cinzel transition-all cursor-pointer ${
              activeTab === 'movement'
                ? 'bg-amber-400 text-amber-950 shadow-sm'
                : 'bg-stone-800 text-amber-200 hover:bg-stone-700'
            }`}
          >
            What is Ressourcement?
          </button>

          <button
            onClick={() => setActiveTab('theologians')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-cinzel transition-all cursor-pointer ${
              activeTab === 'theologians'
                ? 'bg-amber-400 text-amber-950 shadow-sm'
                : 'bg-stone-800 text-amber-200 hover:bg-stone-700'
            }`}
          >
            The Great Ressourcement Luminaries
          </button>

          <button
            onClick={() => setActiveTab('impact')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-cinzel transition-all cursor-pointer ${
              activeTab === 'impact'
                ? 'bg-amber-400 text-amber-950 shadow-sm'
                : 'bg-stone-800 text-amber-200 hover:bg-stone-700'
            }`}
          >
            Vatican II and The Catechism
          </button>
        </div>
      </div>

      {/* =========================================================================
          TAB 1: WHAT IS RESSOURCEMENT?
         ========================================================================= */}
      {activeTab === 'movement' && (
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-xs border border-stone-200 space-y-6">
          <div className="border-b border-stone-200 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 font-cinzel">
              Theological Renewal • Return to the Living Springs
            </span>
            <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900 mt-1">
              "Ressourcement": Renewal Rooted in Apostolic Tradition
            </h4>
          </div>

          <div className="font-serif-sacred text-stone-800 text-base sm:text-lg leading-relaxed space-y-4">
            <p>
              Coined by French poet Charles Péguy and championed by Catholic theologians in the mid-20th century, <span className="font-bold text-amber-950">Ressourcement</span> denotes a deliberate, systematic "return to the sources" (<span className="italic">ad fontes</span>) of the Christian faith:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-amber-900/15 space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900 font-cinzel block">
                  1. Sacred Scripture
                </span>
                <p className="text-xs text-stone-700">
                  Encountering the Word of God not as dry proof-texts, but as the living soul of sacred theology, read in union with the liturgical life of the Church.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-amber-900/15 space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900 font-cinzel block">
                  2. The Church Fathers
                </span>
                <p className="text-xs text-stone-700">
                  Re-discovering the patristic masters (Irenaeus, Athanasius, Basil, Gregory of Nazianzus, Augustine, Chrysostom) whose theology was indivisible from prayer and sanctity.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#FAF8F5] border border-amber-900/15 space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900 font-cinzel block">
                  3. Ancient Liturgy
                </span>
                <p className="text-xs text-stone-700">
                  Recovering the theological depths of the ancient anaphoras, hymnody, and sacramental rites: <span className="italic">Lex orandi, lex credendi</span> (the law of prayer is the law of faith).
                </p>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-amber-50/80 border border-amber-200 space-y-2 mt-4">
              <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-amber-950 block">
                Ressourcement vs. Rupture: True Renewal
              </span>
              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed">
                Pope Benedict XVI famously distinguished between a <span className="font-semibold text-red-900">"hermeneutic of discontinuity and rupture"</span> (which falsely imagines the Church began afresh with modern times) and a <span className="font-semibold text-emerald-900">"hermeneutic of reform in continuity"</span>. Ressourcement proved that true reform is never about inventing novelties to chase secular culture, but about returning to the pristine apostolic flame to warm a cold modern world.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: THE GREAT RESSOURCEMENT THEOLOGIANS
         ========================================================================= */}
      {activeTab === 'theologians' && (
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-xs border border-stone-200 space-y-6">
          <div className="border-b border-stone-200 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 font-cinzel">
              Fathers of the Movement
            </span>
            <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900 mt-1">
              The Luminaries of Catholic Ressourcement
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Henri de Lubac */}
            <div className="p-5 rounded-xl bg-[#FCFAF7] border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <h5 className="font-cinzel text-base font-bold text-stone-900">
                  Henri Cardinal de Lubac, S.J. (1896–1991)
                </h5>
                <span className="text-[11px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full">
                  France
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 font-serif-sacred leading-relaxed">
                Co-founder of the monumental <span className="font-semibold">Sources Chrétiennes</span> series translating the Greek and Latin Fathers. His masterpiece <span className="italic">Catholicism</span> demonstrated that redemption is intrinsically social and ecclesial, while <span className="italic">Corpus Mysticum</span> restored the intimate organic bond between the Eucharist and the Church.
              </p>
            </div>

            {/* Joseph Ratzinger (Benedict XVI) */}
            <div className="p-5 rounded-xl bg-[#FCFAF7] border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <h5 className="font-cinzel text-base font-bold text-stone-900">
                  Joseph Ratzinger — Pope Benedict XVI (1927–2022)
                </h5>
                <span className="text-[11px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full">
                  Germany / Rome
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 font-serif-sacred leading-relaxed">
                Theologian at Vatican II, Prefect of the CDF, and Supreme Pontiff. Ratzinger grounded all his theological work in Augustine and Bonaventure, authoring <span className="italic">Introduction to Christianity</span> and <span className="italic">The Spirit of the Liturgy</span>, demonstrating that the liturgy is given by God, not manufactured by human committees.
              </p>
            </div>

            {/* Hans Urs von Balthasar */}
            <div className="p-5 rounded-xl bg-[#FCFAF7] border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <h5 className="font-cinzel text-base font-bold text-stone-900">
                  Hans Urs von Balthasar (1905–1988)
                </h5>
                <span className="text-[11px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full">
                  Switzerland
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 font-serif-sacred leading-relaxed">
                One of the most prolific theologians in Church history. Created a monumental trilogy: Theological Aesthetics (The Glory of the Lord / Beauty), Theo-Drama (Goodness), and Theo-Logic (Truth), demonstrating that divine revelation captivates through radiant divine beauty.
              </p>
            </div>

            {/* Jean Daniélou */}
            <div className="p-5 rounded-xl bg-[#FCFAF7] border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <h5 className="font-cinzel text-base font-bold text-stone-900">
                  Jean Cardinal Daniélou, S.J. (1905–1974)
                </h5>
                <span className="text-[11px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full">
                  France
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 font-serif-sacred leading-relaxed">
                Specialist in Jewish-Christian origins and biblical typology. Daniélou revived the patristic understanding of how the Old Testament types (the Flood, the Exodus, the Bronze Serpent, the Manna) find their fulfillment in the Sacraments of the Church.
              </p>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: VATICAN II and THE CATECHISM
         ========================================================================= */}
      {activeTab === 'impact' && (
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-xs border border-stone-200 space-y-6">
          <div className="border-b border-stone-200 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900 font-cinzel">
              Historical Fruits in the Modern Church
            </span>
            <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900 mt-1">
              How Ressourcement Shaped Vatican II and The Catechism
            </h4>
          </div>

          <div className="space-y-4 font-serif-sacred text-stone-800 text-base sm:text-lg leading-relaxed">
            <p>
              The Ressourcement movement provided the theological scaffolding for the principal constitutions of the Second Vatican Council and the 1992 Catechism of the Catholic Church:
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <span className="font-cinzel font-bold text-amber-900 text-sm block">
                  Dei Verbum (Dogmatic Constitution on Divine Revelation)
                </span>
                <p className="text-xs text-stone-700">
                  Affirmed that Sacred Tradition and Sacred Scripture form one single sacred deposit of the Word of God, committed to the Church.
                </p>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <span className="font-cinzel font-bold text-amber-900 text-sm block">
                  Lumen Gentium (Dogmatic Constitution on the Church)
                </span>
                <p className="text-xs text-stone-700">
                  Moved beyond purely juridical models of the Church to recover the patristic vision of the Church as the Mystical Body of Christ and Sacrament of Salvation.
                </p>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                <span className="font-cinzel font-bold text-amber-900 text-sm block">
                  The Catechism of the Catholic Church (1992)
                </span>
                <p className="text-xs text-stone-700">
                  Commissioned by Pope St. John Paul II and edited under Joseph Cardinal Ratzinger, the Catechism cites Scripture, the Church Fathers, and the liturgical prayers on nearly every page, becoming the supreme monument of authentic Ressourcement.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
