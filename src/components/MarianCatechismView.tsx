import React, { useState } from 'react';

export const MarianCatechismView: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'dogmas' | 'medjugorje' | 'apparitions'>('medjugorje');

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 rounded-xl p-6 text-blue-50 shadow-md border border-blue-900/40">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-blue-300">
            Regina Caeli • Queen of Peace
          </span>
        </div>
        <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide">
          Catechism on Mary and Her Sacred Apparitions
        </h3>
        <p className="text-xs sm:text-sm text-stone-300 font-serif-sacred max-w-2xl mt-1">
          "What the Catholic faith believes about Mary is based on what it believes about Christ, and what it teaches about Mary illumines in turn its faith in Christ." (CCC 487)
        </p>

        {/* Tab switcher */}
        <div className="flex flex-wrap gap-2 mt-5">
          <button
            onClick={() => setSelectedTab('medjugorje')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-cinzel transition-all cursor-pointer ${
              selectedTab === 'medjugorje'
                ? 'bg-amber-400 text-amber-950 shadow-sm'
                : 'bg-stone-800 text-blue-200 hover:bg-stone-700'
            }`}
          >
            Medjugorje: Queen of Peace (Kraljica Mira)
          </button>

          <button
            onClick={() => setSelectedTab('dogmas')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-cinzel transition-all cursor-pointer ${
              selectedTab === 'dogmas'
                ? 'bg-amber-400 text-amber-950 shadow-sm'
                : 'bg-stone-800 text-blue-200 hover:bg-stone-700'
            }`}
          >
            The Four Marian Dogmas
          </button>

          <button
            onClick={() => setSelectedTab('apparitions')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-cinzel transition-all cursor-pointer ${
              selectedTab === 'apparitions'
                ? 'bg-amber-400 text-amber-950 shadow-sm'
                : 'bg-stone-800 text-blue-200 hover:bg-stone-700'
            }`}
          >
            Major Approved Marian Apparitions
          </button>
        </div>
      </div>

      {/* =========================================================================
          TAB 1: MEDJUGORJE — QUEEN OF PEACE
         ========================================================================= */}
      {selectedTab === 'medjugorje' && (
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-xs border border-stone-200 space-y-6">
          <div className="border-b border-stone-200 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900 font-cinzel">
                Bosnia and Herzegovina (1981 – Present)
              </span>
            </div>
            <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900 mt-1">
              Our Lady of Medjugorje — Queen of Peace (Kraljica Mira)
            </h4>
          </div>

          <div className="font-serif-sacred text-stone-800 text-base sm:text-lg leading-relaxed space-y-4">
            <p>
              On June 24, 1981, on Podbrdo (Apparition Hill) in the rugged village of Medjugorje, six young children—Ivan, Ivanka, Jakov, Mirjana, Marija, and Vicka—reported seeing a luminous woman holding a Child, gesturing for them to draw near without fear. She introduced herself as: <span className="font-bold text-blue-950">"I am the Blessed Virgin Mary, Queen of Peace."</span>
            </p>
            <p>
              Medjugorje has since become one of the most frequented pilgrimage destinations in the Christian world, transformed into a global "confessional of the world" where millions have returned to the sacraments, experienced spiritual conversions, and discovered priestly and religious vocations.
            </p>
          </div>

          {/* THE FIVE STONES OF MEDJUGORJE */}
          <div className="rounded-xl p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h5 className="font-cinzel text-base font-bold text-blue-950">
                  The Five Spiritual Stones (Gifts to Defeat Goliath)
                </h5>
              </div>
              <span className="text-xs font-serif-sacred italic text-blue-900">
                1 Samuel 17:40
              </span>
            </div>

            <p className="text-xs sm:text-sm text-stone-700 font-serif-sacred">
              Our Lady of Medjugorje emphasizes five specific daily and weekly spiritual weapons for peace in hearts and homes:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              <div className="p-3.5 bg-white rounded-xl border border-blue-200 space-y-1">
                <span className="text-xs font-bold font-cinzel text-blue-950 flex items-center gap-1.5">
                  1. Daily Rosary with the Heart
                </span>
                <p className="text-xs text-stone-600 font-serif-sacred">
                  Not merely reciting words with lips, but prayer from the depths of the heart, meditating on the mysteries of Christ.
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-blue-200 space-y-1">
                <span className="text-xs font-bold font-cinzel text-blue-950 flex items-center gap-1.5">
                  2. The Holy Eucharist
                </span>
                <p className="text-xs text-stone-600 font-serif-sacred">
                  Holy Mass as the greatest prayer on earth, along with regular quiet hours of Eucharistic Adoration.
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-blue-200 space-y-1">
                <span className="text-xs font-bold font-cinzel text-blue-950 flex items-center gap-1.5">
                  3. Daily Sacred Scripture
                </span>
                <p className="text-xs text-stone-600 font-serif-sacred">
                  Placing the Catholic Bible in a place of honor in the living room and reading a passage together each day.
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-blue-200 space-y-1">
                <span className="text-xs font-bold font-cinzel text-blue-950 flex items-center gap-1.5">
                  4. Fasting on Bread and Water
                </span>
                <p className="text-xs text-stone-600 font-serif-sacred">
                  Traditional fasting on Wednesdays and Fridays: "By prayer and fasting, even wars can be stopped."
                </p>
              </div>

              <div className="p-3.5 bg-white rounded-xl border border-blue-200 space-y-1 sm:col-span-2">
                <span className="text-xs font-bold font-cinzel text-blue-950 flex items-center gap-1.5">
                  5. Monthly Sacramental Confession
                </span>
                <p className="text-xs text-stone-600 font-serif-sacred">
                  Cleansing the soul thoroughly in the Sacrament of Penance, leaving no dark room for the adversary to sow discord.
                </p>
              </div>
            </div>
          </div>

          {/* Official Holy See / Vatican Position */}
          <div className="p-5 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
            <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-stone-900 flex items-center gap-1.5">
              The Holy See and Dicastery for the Doctrine of the Faith (DDF)
            </span>
            <p className="text-xs sm:text-sm font-serif-sacred text-stone-700 leading-relaxed">
              In 2019, Pope Francis officially authorized diocesan-led pilgrimages to Medjugorje. In September 2024, the Vatican Dicastery for the Doctrine of the Faith issued the landmark note granting <span className="font-bold text-stone-900">"Nihil Obstat"</span> to Medjugorje, affirming the immense spiritual good, conversions, healings, and reconciliation flowing from the devotion, while ensuring Christ and the sacraments remain at the absolute center of every pilgrim's devotion.
            </p>
          </div>

        </div>
      )}

      {/* =========================================================================
          TAB 2: THE FOUR MARIAN DOGMAS
         ========================================================================= */}
      {selectedTab === 'dogmas' && (
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-xs border border-stone-200 space-y-6">
          <div className="border-b border-stone-200 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900 font-cinzel">
              The Pillar of Truth • Catholic Doctrine
            </span>
            <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900 mt-1">
              The Four Defined Dogmas of the Blessed Virgin Mary
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* Dogma 1: Theotokos */}
            <div className="p-5 rounded-xl bg-[#FCFAF7] border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <h5 className="font-cinzel text-base font-bold text-stone-900">
                  1. Mother of God (Theotokos)
                </h5>
                <span className="text-[11px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full">
                  Ephesus, 431 AD
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 font-serif-sacred leading-relaxed">
                Because Jesus is true God and true Man united in one single divine Person, Mary truly conceived and bore in time the eternal Son of God.
              </p>
              <div className="text-[11px] text-stone-500 italic">
                Scripture: Luke 1:43 • CCC 495
              </div>
            </div>

            {/* Dogma 2: Perpetual Virginity */}
            <div className="p-5 rounded-xl bg-[#FCFAF7] border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <h5 className="font-cinzel text-base font-bold text-stone-900">
                  2. Perpetual Virginity (Aeiparthenos)
                </h5>
                <span className="text-[11px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full">
                  Lateran, 649 AD
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 font-serif-sacred leading-relaxed">
                Mary was a virgin before, during, and perpetually after the birth of Jesus Christ (*ante partum, in partu, post partum*), consecrated entirely to God.
              </p>
              <div className="text-[11px] text-stone-500 italic">
                Scripture: Isaiah 7:14; Luke 1:34 • CCC 499–501
              </div>
            </div>

            {/* Dogma 3: Immaculate Conception */}
            <div className="p-5 rounded-xl bg-[#FCFAF7] border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <h5 className="font-cinzel text-base font-bold text-stone-900">
                  3. The Immaculate Conception
                </h5>
                <span className="text-[11px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full">
                  Pius IX, 1854 AD
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 font-serif-sacred leading-relaxed">
                By a singular grace and privilege of Almighty God, in view of the merits of Jesus Christ Savior of mankind, Mary was preserved immune from all stain of original sin from the first instant of her conception.
              </p>
              <div className="text-[11px] text-stone-500 italic">
                Scripture: Genesis 3:15; Luke 1:28 (Kecharitomene) • CCC 490–493
              </div>
            </div>

            {/* Dogma 4: The Assumption */}
            <div className="p-5 rounded-xl bg-[#FCFAF7] border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <h5 className="font-cinzel text-base font-bold text-stone-900">
                  4. The Bodily Assumption
                </h5>
                <span className="text-[11px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full">
                  Pius XII, 1950 AD
                </span>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 font-serif-sacred leading-relaxed">
                Having completed the course of her earthly life, the Immaculate Mother of God was assumed body and soul into heavenly glory, prefiguring the resurrection of all believers.
              </p>
              <div className="text-[11px] text-stone-500 italic">
                Scripture: Revelation 12:1; Psalm 132:8 • CCC 966
              </div>
            </div>

          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: APPROVED MARIAN APPARITIONS
         ========================================================================= */}
      {selectedTab === 'apparitions' && (
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-xs border border-stone-200 space-y-6">
          <div className="border-b border-stone-200 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900 font-cinzel">
              Visitations of Our Heavenly Mother
            </span>
            <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900 mt-1">
              Major Approved Apparitions Throughout the Centuries
            </h4>
          </div>

          <div className="space-y-4">
            
            {/* Guadalupe */}
            <div className="p-5 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <h5 className="font-cinzel font-bold text-base text-stone-900">
                  Our Lady of Guadalupe (Mexico, 1531)
                </h5>
                <span className="text-xs text-amber-900 font-semibold">St. Juan Diego</span>
              </div>
              <p className="text-xs sm:text-sm font-serif-sacred text-stone-700 leading-relaxed">
                Appearing on Tepeyac Hill as a pregnant native maiden clothed with the sun, Mary left her miraculous, non-fading image upon Juan Diego's cactus-fiber tilma. Over the next nine years, nearly nine million indigenous Mexican people freely embraced Baptism in the greatest conversion event in Christian history.
              </p>
            </div>

            {/* Lourdes */}
            <div className="p-5 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <h5 className="font-cinzel font-bold text-base text-stone-900">
                  Our Lady of Lourdes (France, 1858)
                </h5>
                <span className="text-xs text-amber-900 font-semibold">St. Bernadette Soubirous</span>
              </div>
              <p className="text-xs sm:text-sm font-serif-sacred text-stone-700 leading-relaxed">
                Appearing 18 times at the Grotto of Massabielle, the Lady revealed her name in the local dialect: <span className="font-bold">"Que soy era Immaculada Concepciou"</span> (I am the Immaculate Conception), confirming the papal dogma defined four years earlier. Millions of pilgrims drink and bathe in the miraculous spring of healing.
              </p>
            </div>

            {/* Fatima */}
            <div className="p-5 rounded-xl bg-[#FAF8F5] border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <h5 className="font-cinzel font-bold text-base text-stone-900">
                  Our Lady of Fátima (Portugal, 1917)
                </h5>
                <span className="text-xs text-amber-900 font-semibold">Lucia, Francisco and Jacinta</span>
              </div>
              <p className="text-xs sm:text-sm font-serif-sacred text-stone-700 leading-relaxed">
                Appearing six consecutive months on the 13th day during World War I, Our Lady called for the daily Rosary for world peace, devotion to her Immaculate Heart, and reparation on First Saturdays. On October 13, 1917, 70,000 spectators witnessed the Miracle of the Sun.
              </p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
