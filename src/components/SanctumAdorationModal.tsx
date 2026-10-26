import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Heart, 
  Volume2, 
  VolumeX, 
  Clock, 
  BookOpen, 
  Flame, 
  ShieldCheck, 
  Square,
  Check,
  Image as ImageIcon
} from 'lucide-react';
import { bellSynth } from '../utils/audioSynth';
import { NIEPOKALANOW_HIGH_RES_IMAGES, NiepokalanowHighResImage } from '../data/sacredArt';

interface SanctumAdorationModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeImageId?: string;
  onSelectImage?: (image: NiepokalanowHighResImage) => void;
}

export const SanctumAdorationModal: React.FC<SanctumAdorationModalProps> = ({
  isOpen,
  onClose,
  activeImageId = 'unsplash-eucharistic-adoration',
  onSelectImage
}) => {
  const [activeTab, setActiveTab] = useState<'contemplation' | 'prayers' | 'hymns' | 'history'>('contemplation');
  const [timerSeconds, setTimerSeconds] = useState<number | null>(null);
  const [timerInitial, setTimerInitial] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const selectedHighResImage = NIEPOKALANOW_HIGH_RES_IMAGES.find(img => img.id === activeImageId) || NIEPOKALANOW_HIGH_RES_IMAGES[0];

  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds !== null && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev !== null && prev > 1) {
            return prev - 1;
          } else {
            setIsTimerRunning(false);
            bellSynth.playAngelusToll();
            return 0;
          }
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  if (!isOpen) return null;

  const handleStartTimer = (minutes: number) => {
    const totalSecs = minutes * 60;
    setTimerInitial(totalSecs);
    setTimerSeconds(totalSecs);
    setIsTimerRunning(true);
    bellSynth.playBeadChime();
  };

  const handleStopTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(null);
    setTimerInitial(null);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handlePlaySanctumChime = () => {
    bellSynth.playChurchBell(523.25, 4.0);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn">
      {/* Sanctum Glow Backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.18)_0%,transparent_75%)] pointer-events-none" />

      <div className="relative w-full max-w-5xl rounded-xl overflow-hidden border border-amber-400/30 shadow-[0_25px_70px_rgba(0,0,0,0.85)] bg-gradient-to-b from-stone-950 via-[#141210] to-stone-950 text-stone-100 flex flex-col max-h-[92vh]">
        
        {/* Top Liturgical Gold Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-600 via-amber-300 to-amber-600 shadow-md" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-500/20 bg-stone-900/60 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center shadow-md text-stone-950">
              <Sparkles className="w-5 h-5 text-stone-950 fill-stone-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-xs uppercase tracking-widest text-amber-300 font-semibold">
                  Perpetual Adoration
                </span>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-500/20 text-amber-200 border border-amber-400/30">
                  Sacramentum Caritatis
                </span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide">
                Sanctum of the Blessed Sacrament
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePlaySanctumChime}
              className="p-2 rounded-lg text-amber-200 hover:text-white bg-black/40 hover:bg-black/60 border border-white/15 transition-all cursor-pointer"
              title="Toll Sanctum Adoration Bell"
            >
              <Volume2 className="w-4 h-4 text-amber-400" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close Adoration modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 px-6 py-2.5 bg-black/40 border-b border-white/10 overflow-x-auto no-scrollbar text-xs">
          {[
            { id: 'contemplation', label: 'Eucharistic Contemplation', icon: Sparkles },
            { id: 'prayers', label: 'Act of Spiritual Communion', icon: Heart },
            { id: 'hymns', label: 'Eucharistic Hymns', icon: Flame },
            { id: 'history', label: 'Eucharistic Adoration Story', icon: BookOpen }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg font-medium transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-500/25 text-amber-200 border border-amber-400/50 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-stone-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Main Visual Altar Card */}
          <div className="relative rounded-xl overflow-hidden border border-amber-500/30 shadow-2xl bg-black aspect-[16/9] max-h-[420px] w-full group">
            <img
              src={selectedHighResImage.imageUrl}
              alt={selectedHighResImage.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-[center_28%] transition-transform duration-1000 group-hover:scale-103"
            />
            {/* Luminous ambient radial overlays */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(251,191,36,0.22)_0%,transparent_65%)] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/30 pointer-events-none" />

            {/* Top Resolution Badge */}
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/75 border border-amber-400/50 text-amber-200 text-[11px] font-cinzel font-bold backdrop-blur-md">
              {selectedHighResImage.resolution} • Pure White Host
            </div>

            {/* Bottom Caption Pill */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 rounded-lg bg-stone-950/85 backdrop-blur-md border border-amber-500/30">
              <div className="space-y-0.5">
                <span className="font-cinzel text-xs font-bold text-amber-300 block tracking-wide">
                  {selectedHighResImage.title}
                </span>
                <p className="text-xs text-stone-300 font-serif line-clamp-1">
                  {selectedHighResImage.description}
                </p>
                {selectedHighResImage.attributionUrl ? (
                  <a
                    href={selectedHighResImage.attributionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-amber-300/95 hover:text-amber-200 underline decoration-amber-400/50 font-serif inline-block pt-0.5"
                  >
                    {selectedHighResImage.attributionText}
                  </a>
                ) : (
                  <span className="text-[11px] text-amber-300/90 font-serif block pt-0.5">
                    {selectedHighResImage.attributionText}
                  </span>
                )}
              </div>

              {/* Contemplation Timer Controls */}
              <div className="flex items-center gap-2 shrink-0">
                {isTimerRunning ? (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-950/70 border border-amber-500/50 text-amber-200">
                    <Clock className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                    <span className="font-mono text-sm font-bold">
                      {timerSeconds !== null ? formatTimer(timerSeconds) : '0:00'}
                    </span>
                    <button
                      onClick={handleStopTimer}
                      className="ml-1 text-xs text-stone-400 hover:text-white"
                      title="Stop timer"
                    >
                      <Square className="w-3 h-3 fill-current" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] text-stone-400 font-serif mr-1 hidden sm:inline">Adoration timer:</span>
                    {[5, 15, 30].map(mins => (
                      <button
                        key={mins}
                        onClick={() => handleStartTimer(mins)}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white/10 hover:bg-amber-500/30 hover:border-amber-400/50 border border-white/10 text-stone-200 hover:text-amber-200 transition-all cursor-pointer"
                      >
                        {mins}m
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* High-Resolution Sacred Art and Sanctuary Backdrop Selector */}
          <div className="p-4 sm:p-5 rounded-xl bg-stone-900/75 border border-amber-500/30 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-amber-400" />
                <span className="font-cinzel text-xs sm:text-sm font-bold text-amber-200 uppercase tracking-wider">
                  Select High-Resolution Masterpiece & Sanctuary Backdrop
                </span>
              </div>
              <span className="text-[11px] font-serif text-stone-400">
                Click any masterwork below to set it as the website's establishing altar backdrop
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {NIEPOKALANOW_HIGH_RES_IMAGES.map((img) => {
                const isSelected = img.id === selectedHighResImage.id;
                return (
                  <button
                    key={img.id}
                    onClick={() => onSelectImage && onSelectImage(img)}
                    className={`group relative rounded-lg overflow-hidden border text-left transition-all cursor-pointer flex flex-col ${
                      isSelected
                        ? 'border-amber-400 ring-2 ring-amber-400/50 bg-amber-950/40 shadow-lg'
                        : 'border-white/15 hover:border-amber-400/50 bg-black/40'
                    }`}
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                      <img
                        src={img.imageUrl}
                        alt={img.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-[center_30%] group-hover:scale-105 transition-transform duration-500"
                      />
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center shadow-md">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      )}
                      <div className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-amber-200 border border-amber-400/30">
                        {img.resolution}
                      </div>
                    </div>
                    <div className="p-2.5 space-y-0.5">
                      <div className="font-cinzel text-[11px] font-bold text-amber-200 line-clamp-1">
                        {img.shortLabel}
                      </div>
                      <p className="text-[10px] font-serif text-stone-400 line-clamp-2 leading-snug">
                        {img.attributionText}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* TAB 1: CONTEMPLATION */}
          {activeTab === 'contemplation' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-5 rounded-xl bg-stone-900/50 border border-amber-500/20 space-y-3 backdrop-blur-md">
                <div className="flex items-center gap-2 text-amber-300 font-serif font-bold text-lg">
                  <Flame className="w-4 h-4 text-amber-400" />
                  <span>Pope Saint John Paul II on Mary and the Eucharist</span>
                </div>
                <p className="text-sm text-stone-300 font-serif leading-relaxed italic">
                  "We should ask Mary to give us her Immaculate Heart to receive Jesus with great faith, devotion, and love every time we receive Holy Communion. The ‘Yes’ of Mary to the Archangel Gabriel resulted in Mary receiving Jesus into her mind, body, heart, and soul; our ‘Amen’ when we receive Holy Communion results in our receiving Jesus into the very depths of our heart, mind, and soul. Our ‘Amen’ is our ‘Yes’ to Jesus!"
                </p>
                <p className="text-xs text-amber-200 font-serif italic text-right">
                  — Pope Saint John Paul II
                </p>
              </div>

              <div className="p-5 rounded-xl bg-stone-900/50 border border-amber-500/20 space-y-3 backdrop-blur-md">
                <div className="flex items-center gap-2 text-amber-300 font-serif font-bold text-lg">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>The Sacred Art of Eucharistic Mystery</span>
                </div>
                <p className="text-sm text-stone-300 font-serif leading-relaxed">
                  "In Caravaggio's Supper at Emmaus, Raphael's Disputation of the Holy Sacrament, and Murillo's Immaculate Conception, the sacred arts lift the human spirit to the summit of the divine mysteries: the Real Presence of Christ in the breaking of the bread, the Communion of Saints around the altar, and Our Lady as the living Tabernacle."
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs text-stone-400 font-serif">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Via Pulchritudinis • The Way of Beauty in Catholic Tradition</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ACT OF SPIRITUAL COMMUNION */}
          {activeTab === 'prayers' && (
            <div className="space-y-5">
              <div className="p-6 rounded-xl bg-amber-950/25 border border-amber-500/30 space-y-4 backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                  <div className="flex items-center gap-2 text-amber-200 font-serif text-lg font-bold">
                    <Heart className="w-5 h-5 text-amber-400 fill-amber-400/20" />
                    <span>Act of Spiritual Communion</span>
                  </div>
                  <span className="text-xs text-amber-300 font-serif italic">St. Alphonsus Liguori</span>
                </div>

                <div className="text-base sm:text-lg font-serif text-stone-100 leading-relaxed italic bg-black/20 p-5 rounded-lg border border-white/5 space-y-3">
                  <p>
                    "My Jesus, I believe that Thou art present in the Most Holy Sacrament of the Altar.
                  </p>
                  <p>
                    I love Thee above all things, and I desire to receive Thee into my soul.
                  </p>
                  <p>
                    Since I cannot now receive Thee sacramentally, come at least spiritually into my heart.
                  </p>
                  <p>
                    I embrace Thee as if Thou wert already there, and unite myself wholly to Thee; never permit me to be separated from Thee.
                  </p>
                  <p className="font-bold text-amber-200 not-italic pt-1">
                    Amen."
                  </p>
                </div>
              </div>

              {/* Anima Christi */}
              <div className="p-6 rounded-xl bg-stone-900/50 border border-stone-800 space-y-4 backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-stone-700/60 pb-3">
                  <span className="font-serif text-lg font-bold text-amber-100">Anima Christi (Soul of Christ)</span>
                  <span className="text-xs text-stone-400 font-serif italic">14th Century / St. Ignatius of Loyola</span>
                </div>

                <div className="text-sm sm:text-base font-serif text-stone-300 leading-relaxed space-y-2">
                  <p>Soul of Christ, sanctify me. Body of Christ, save me.</p>
                  <p>Blood of Christ, inebriate me. Water from the side of Christ, wash me.</p>
                  <p>Passion of Christ, strengthen me. O good Jesus, hear me.</p>
                  <p>Within Thy wounds hide me. Suffer me not to be separated from Thee.</p>
                  <p>From the malicious enemy defend me. In the hour of my death call me.</p>
                  <p>And bid me come unto Thee, that with Thy saints I may praise Thee, forever and ever. Amen.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: EUCHARISTIC HYMNS */}
          {activeTab === 'hymns' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-5 rounded-xl bg-stone-900/50 border border-amber-500/20 space-y-3 backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
                  <span className="font-cinzel text-sm font-bold text-amber-300">TANTUM ERGO SACRAMENTUM</span>
                  <span className="text-[11px] text-stone-400 font-serif">St. Thomas Aquinas</span>
                </div>
                <div className="text-xs sm:text-sm font-serif text-stone-200 leading-relaxed space-y-2">
                  <p className="italic">
                    Tantum ergo Sacramentum<br/>
                    Veneremur cernui:<br/>
                    Et antiquum documentum<br/>
                    Novo cedat ritui:<br/>
                    Praestet fides supplementum<br/>
                    Sensuum defectui.
                  </p>
                  <p className="text-stone-400 text-xs pt-2">
                    Down in adoration falling, Lo! the sacred Host we hail; Over ancient forms departing, Newer rites of grace prevail; Faith for all defects supplying, Where the feeble senses fail.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-stone-900/50 border border-amber-500/20 space-y-3 backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
                  <span className="font-cinzel text-sm font-bold text-amber-300">O SALUTARIS HOSTIA</span>
                  <span className="text-[11px] text-stone-400 font-serif">Corpus Christi Liturgy</span>
                </div>
                <div className="text-xs sm:text-sm font-serif text-stone-200 leading-relaxed space-y-2">
                  <p className="italic">
                    O Salutaris Hostia,<br/>
                    Quae caeli pandis ostium:<br/>
                    Bella premunt hostilia,<br/>
                    Da robur, fer auxilium.
                  </p>
                  <p className="text-stone-400 text-xs pt-2">
                    O saving Victim, opening wide The gate of heaven to man below; Our foes press on from every side; Thine aid supply, thy strength bestow.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SACRED EUCHARISTIC ADORATION STORY */}
          {activeTab === 'history' && (
            <div className="p-6 rounded-xl bg-stone-900/50 border border-amber-500/20 space-y-4 backdrop-blur-md font-serif text-stone-300 text-sm leading-relaxed">
              <h3 className="font-cinzel text-base font-bold text-amber-300 tracking-wide">
                The Sacred Tradition of Perpetual Eucharistic Adoration
              </h3>
              <p>
                From the earliest centuries of the Church and culminating in the solemn feast of <strong>Corpus Christi</strong> composed by Saint Thomas Aquinas in 1264, the Catholic faithful have knelt in silent adoration before the Most Holy Eucharist, recognizing the Real, True, and Substantial Presence of Jesus Christ—Body, Blood, Soul, and Divinity.
              </p>
              <p>
                Saint Peter Julian Eymard, the "Apostle of the Eucharist," taught that Eucharistic adoration is the highest act of religion and the fountain of all holiness. In monasteries, parishes, and sanctuaries across every continent, perpetual adoration chains unite day and night in continuous intercession for peace, the conversion of souls, and thanksgiving to the King of Kings.
              </p>
              <p>
                As Saint John Paul II wrote in <em>Ecclesia de Eucharistia</em>: "The Church and the world have a great need for Eucharistic worship. Jesus awaits us in this sacrament of love. Let us not refuse the time to go to meet Him in adoration, in contemplation full of faith, and open to making amends for the serious offenses and crimes of the world."
              </p>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-stone-950 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400 font-serif">
          <div className="flex items-center gap-2 text-amber-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>"Be still, and know that I am God." — Psalm 46:10</span>
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 rounded-lg bg-amber-600/30 hover:bg-amber-600/50 text-amber-100 border border-amber-400/50 font-medium transition-all cursor-pointer"
          >
            Return to Sanctum
          </button>
        </div>

      </div>
    </div>
  );
};
