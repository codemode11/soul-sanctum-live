import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft, 
  Volume2, 
  VolumeX, 
  Timer, 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  Layers, 
  Copy,
  Check,
  ShieldCheck,
  Star,
  Bell
} from 'lucide-react';
import { RosaryMysteryGroup } from '@/types';
import { 
  ROSARY_MYSTERY_SETS, 
  getTodaysMysteryGroup, 
  generateRosaryBeadsSequence,
  MARIAN_ROSARY_PROMISES,
  MarianRosaryPromise
} from '@/data/rosary';
import { 
  generateDivineMercySequence, 
  DIVINE_MERCY_OPENING_PRAYERS 
} from '@/data/divineMercy';
import { 
  DIVINE_MERCY_PROMISES, 
  FAUSTINA_DIARY_EXCERPTS,
  DivineMercyPromise,
  FaustinaDiaryExcerpt
} from '@/data/faustinaDivineMercy';
import { SacredReader } from '@/utils/speech';
import { bellSynth } from '@/utils/audioSynth';

export const RosaryAndChapletView: React.FC = () => {
  const [activeDevotion, setActiveDevotion] = useState<'divine-mercy' | 'faustina' | 'three-oclock' | 'rosary' | 'marian-promises' | 'angelus'>('divine-mercy');
  const [copiedPromiseNum, setCopiedPromiseNum] = useState<number | null>(null);
  const [copiedMarianNum, setCopiedMarianNum] = useState<number | null>(null);
  const [copiedExcerptId, setCopiedExcerptId] = useState<string | null>(null);
  const [readingExcerptId, setReadingExcerptId] = useState<string | null>(null);
  const [isReadingThreeOClock, setIsReadingThreeOClock] = useState(false);
  const [copiedThreeOClock, setCopiedThreeOClock] = useState(false);
  const [angelusBellStatus, setAngelusBellStatus] = useState<string>('');
  const [isReadingAngelus, setIsReadingAngelus] = useState(false);
  const [copiedAngelus, setCopiedAngelus] = useState(false);
  const [angelusShowLatin, setAngelusShowLatin] = useState(false);
  
  // Rosary State
  const [selectedMysteryGroup, setSelectedMysteryGroup] = useState<RosaryMysteryGroup>(getTodaysMysteryGroup);
  const [rosaryStepIndex, setRosaryStepIndex] = useState(0);
  const [hasStartedRosary, setHasStartedRosary] = useState(false);
  
  // Divine Mercy State
  const [mercyStepIndex, setMercyStepIndex] = useState(0);
  const [hasStartedMercy, setHasStartedMercy] = useState(false);
  const [isPlayingTrishShortSong, setIsPlayingTrishShortSong] = useState(false);
  const [trishShortEdition, setTrishShortEdition] = useState<'complete' | 'official'>('complete');

  // Auto-advance and Audio controls (Natural human voice praying, mechanical chimes removed)
  const [isAutoAdvancing, setIsAutoAdvancing] = useState(false);
  const [autoAdvanceSeconds, setAutoAdvanceSeconds] = useState(20);
  const [countdown, setCountdown] = useState(20);
  const [spokenAudioEnabled, setSpokenAudioEnabled] = useState(true);
  const [prayerVoiceRate, setPrayerVoiceRate] = useState<number>(0.75);
  const [showLatin, setShowLatin] = useState(false);
  const [promisesFontSize, setPromisesFontSize] = useState<'normal' | 'large' | 'xlarge'>('large');

  const increasePromisesFontSize = () => {
    if (promisesFontSize === 'normal') setPromisesFontSize('large');
    else if (promisesFontSize === 'large') setPromisesFontSize('xlarge');
  };

  const decreasePromisesFontSize = () => {
    if (promisesFontSize === 'xlarge') setPromisesFontSize('large');
    else if (promisesFontSize === 'large') setPromisesFontSize('normal');
  };

  const rosarySteps = React.useMemo(() => generateRosaryBeadsSequence(selectedMysteryGroup), [selectedMysteryGroup]);
  const mercySteps = React.useMemo(() => generateDivineMercySequence(), []);

  const currentRosaryStep = rosarySteps[rosaryStepIndex] || rosarySteps[0];
  const currentMercyStep = mercySteps[mercyStepIndex] || mercySteps[0];

  // Format devotional prayer text with natural, unhurried contemplative pauses between petitions and repetitions
  const formatDevotionalPrayerForSpeech = React.useCallback((text: string): string => {
    return text
      // Add gentle pauses at line breaks (e.g., triple "O Blood and Water", "Holy God", "Jesus, I trust in You")
      .replace(/\n+/g, '. ... ')
      // Add a natural breathing pause at semicolons (e.g., in the Our Father and Apostles' Creed)
      .replace(/;\s*/g, '. ... ')
      // Add a liturgical pause before the second part of the Hail Mary
      .replace(/Jesus\.\s+Holy Mary,/g, 'Jesus. ... Holy Mary,')
      // Add a liturgical pause before the second part of the Our Father
      .replace(/as it is in heaven\.\s+Give us/g, 'as it is in heaven. ... Give us')
      // Add a gentle pause in the Sorrowful Passion bead prayer
      .replace(/sorrowful Passion,\s+have mercy/g, 'sorrowful Passion, ... have mercy')
      // Add a gentle pause in the Eternal Father prayer
      .replace(/Our Lord, Jesus Christ,\s+in atonement/g, 'Our Lord, Jesus Christ, ... in atonement');
  }, []);

  // Speak a single prayer step when manually navigating (when Autoplay is not driving the sequence)
  const triggerAudioForStep = React.useCallback((text: string) => {
    if (spokenAudioEnabled) {
      SacredReader.speak(formatDevotionalPrayerForSpeech(text), undefined, 'female', prayerVoiceRate);
    }
  }, [spokenAudioEnabled, formatDevotionalPrayerForSpeech, prayerVoiceRate]);

  // Sequential Voice-Driven Autoplay Effect:
  // Speaks each bead at a calm, unhurried pace and advances strictly to the next bead (prev + 1) upon completion.
  useEffect(() => {
    if (!isAutoAdvancing || !spokenAudioEnabled) return;
    if (activeDevotion !== 'divine-mercy' && activeDevotion !== 'rosary') return;

    let isCancelled = false;
    let pauseTimer: ReturnType<typeof setTimeout> | null = null;

    const currentText =
      activeDevotion === 'rosary'
        ? (rosarySteps[rosaryStepIndex] || rosarySteps[0])?.prayerText
        : (mercySteps[mercyStepIndex] || mercySteps[0])?.prayerText;

    if (!currentText) return;

    SacredReader.speak(
      formatDevotionalPrayerForSpeech(currentText),
      () => {
        if (isCancelled) return;
        // Reverent 2.4-second contemplative pause between beads before advancing
        pauseTimer = setTimeout(() => {
          if (isCancelled) return;
          if (activeDevotion === 'rosary') {
            setRosaryStepIndex((prev) => {
              if (prev < rosarySteps.length - 1) {
                return prev + 1;
              } else {
                setIsAutoAdvancing(false);
                return prev;
              }
            });
          } else {
            setMercyStepIndex((prev) => {
              if (prev < mercySteps.length - 1) {
                return prev + 1;
              } else {
                setIsAutoAdvancing(false);
                return prev;
              }
            });
          }
        }, 2400);
      },
      'female',
      prayerVoiceRate
    );

    return () => {
      isCancelled = true;
      if (pauseTimer) clearTimeout(pauseTimer);
    };
  }, [
    isAutoAdvancing,
    spokenAudioEnabled,
    activeDevotion,
    mercyStepIndex,
    rosaryStepIndex,
    prayerVoiceRate,
    mercySteps,
    rosarySteps,
    formatDevotionalPrayerForSpeech
  ]);

  // Silent Timed Pacer Effect (ONLY runs when voice is muted so it never races or interrupts spoken prayers)
  useEffect(() => {
    if (!isAutoAdvancing || spokenAudioEnabled) return;
    if (activeDevotion !== 'divine-mercy' && activeDevotion !== 'rosary') return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          if (activeDevotion === 'rosary') {
            setRosaryStepIndex((curr) => {
              if (curr < rosarySteps.length - 1) return curr + 1;
              setIsAutoAdvancing(false);
              return curr;
            });
          } else {
            setMercyStepIndex((curr) => {
              if (curr < mercySteps.length - 1) return curr + 1;
              setIsAutoAdvancing(false);
              return curr;
            });
          }
          return autoAdvanceSeconds;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isAutoAdvancing, spokenAudioEnabled, autoAdvanceSeconds, activeDevotion, rosarySteps.length, mercySteps.length]);

  const handleNextBead = () => {
    if (activeDevotion === 'rosary') {
      setHasStartedRosary(true);
      if (rosaryStepIndex < rosarySteps.length - 1) {
        const next = rosaryStepIndex + 1;
        setRosaryStepIndex(next);
        setCountdown(autoAdvanceSeconds);
        if (!isAutoAdvancing && spokenAudioEnabled) {
          triggerAudioForStep(rosarySteps[next].prayerText);
        }
      } else {
        setIsAutoAdvancing(false);
        SacredReader.stop();
      }
    } else {
      setHasStartedMercy(true);
      if (mercyStepIndex < mercySteps.length - 1) {
        const next = mercyStepIndex + 1;
        setMercyStepIndex(next);
        setCountdown(autoAdvanceSeconds);
        if (!isAutoAdvancing && spokenAudioEnabled) {
          triggerAudioForStep(mercySteps[next].prayerText);
        }
      } else {
        setIsAutoAdvancing(false);
        SacredReader.stop();
      }
    }
  };

  const handlePrevBead = () => {
    if (activeDevotion === 'rosary') {
      setHasStartedRosary(true);
      if (rosaryStepIndex > 0) {
        const prev = rosaryStepIndex - 1;
        setRosaryStepIndex(prev);
        setCountdown(autoAdvanceSeconds);
        if (!isAutoAdvancing && spokenAudioEnabled) {
          triggerAudioForStep(rosarySteps[prev].prayerText);
        }
      }
    } else {
      setHasStartedMercy(true);
      if (mercyStepIndex > 0) {
        const prev = mercyStepIndex - 1;
        setMercyStepIndex(prev);
        setCountdown(autoAdvanceSeconds);
        if (!isAutoAdvancing && spokenAudioEnabled) {
          triggerAudioForStep(mercySteps[prev].prayerText);
        }
      }
    }
  };

  const selectRosaryStep = (idx: number) => {
    setHasStartedRosary(true);
    setRosaryStepIndex(idx);
    setCountdown(autoAdvanceSeconds);
    const step = rosarySteps[idx];
    if (step && !isAutoAdvancing && spokenAudioEnabled) {
      triggerAudioForStep(step.prayerText);
    }
  };

  const selectMercyStep = (idx: number) => {
    setHasStartedMercy(true);
    setMercyStepIndex(idx);
    setCountdown(autoAdvanceSeconds);
    const step = mercySteps[idx];
    if (step && !isAutoAdvancing && spokenAudioEnabled) {
      triggerAudioForStep(step.prayerText);
    }
  };

  const handleReset = () => {
    setIsAutoAdvancing(false);
    SacredReader.stop();
    if (activeDevotion === 'rosary') {
      setRosaryStepIndex(0);
      setHasStartedRosary(false);
    } else {
      setMercyStepIndex(0);
      setHasStartedMercy(false);
    }
  };

  const activeStepsList = activeDevotion === 'rosary' ? rosarySteps : mercySteps;
  const currentStepNum = activeDevotion === 'rosary' ? rosaryStepIndex : mercyStepIndex;
  const progressPercent = Math.round(((currentStepNum + 1) / activeStepsList.length) * 100);
  const mercyProgressPercent = Math.round(((mercyStepIndex + 1) / mercySteps.length) * 100);

  const renderThreeOClockCard = (highlighted = false) => (
    <div className={`relative isolate overflow-hidden rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-[#EFE3D3]/85 via-[#E4D1B9]/80 to-[#D6BC9E]/85 backdrop-blur-2xl backdrop-saturate-150 border border-[#C8AD8D]/85 ${highlighted ? 'ring-2 ring-[#9C6D3E]/70 shadow-[0_12px_40px_rgba(92,58,30,0.18),inset_0_1px_2px_rgba(255,255,255,0.85)]' : 'ring-1 ring-[#C8AD8D]/80 shadow-[0_10px_32px_rgba(92,58,30,0.12),inset_0_1px_2px_rgba(255,255,255,0.85)]'} space-y-5 text-stone-900`}>
      {/* Ambient Warm Brown & Golden Rays behind Frosted Glass */}
      <div className="pointer-events-none absolute -top-14 -left-14 w-72 h-72 rounded-full bg-[#B6895B]/35 blur-3xl z-0" />
      <div className="pointer-events-none absolute -bottom-14 -right-14 w-72 h-72 rounded-full bg-[#8C5E35]/30 blur-3xl z-0" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-44 rounded-full bg-[#D4A373]/30 blur-3xl z-0" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#C8AD8D]/60 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6B4423] to-[#4A2E16] border border-[#8B5A2B] ring-1 ring-[#D4A373]/50 flex items-center justify-center shrink-0 shadow-sm">
            <Sparkles className="w-5 h-5 text-amber-200" />
          </div>
          <div>
            <span className="text-[11px] font-cinzel font-bold tracking-widest text-[#5C3A1E] uppercase block">
              Hour of Great Mercy • 3:00 PM Devotion
            </span>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#2E1B0E]">
              The Three O'Clock Prayer
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <button
            onClick={() => {
              if (isReadingThreeOClock) {
                SacredReader.stop();
                setIsReadingThreeOClock(false);
              } else {
                setIsReadingThreeOClock(true);
                const fullText = `The Three O'Clock Prayer. You died, Jesus, but the source of life flowed out for souls, and the ocean of mercy opened up for the whole world. O Fountain of Life, immeasurable Divine Mercy, cover the whole world and empty yourself out upon us. ... O Blood and Water, which flowed out from the Heart of Jesus as a fountain of Mercy for us, we trust in you! ... Holy God, Holy Mighty One, Holy Immortal One, have mercy on us and on the whole world. Holy God, Holy Mighty One, Holy Immortal One, have mercy on us and on the whole world. Holy God, Holy Mighty One, Holy Immortal One, have mercy on us and on the whole world. ... Jesus, King of Mercy, We trust in you!`;
                SacredReader.speak(fullText, () => setIsReadingThreeOClock(false), 'female', 0.85);
              }
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-xs ${
              isReadingThreeOClock
                ? 'bg-gradient-to-r from-[#5C3A1E] to-[#3E2412] text-amber-50 animate-pulse'
                : 'bg-gradient-to-b from-[#FAF3E8] to-[#EFE2CE] hover:from-white hover:to-[#F5E9D6] text-[#5C3A1E] border border-[#C8AD8D] ring-1 ring-[#DFD2C0]'
            }`}
          >
            {isReadingThreeOClock ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#6B4423]" />}
            <span>{isReadingThreeOClock ? 'Stop Audio' : 'Listen to Prayer'}</span>
          </button>

          <button
            onClick={() => {
              const text = `THE THREE O'CLOCK PRAYER\n\nYou died, Jesus, but the source of life flowed out for souls, and the ocean of mercy opened up for the whole world. O Fountain of Life, immeasurable Divine Mercy, cover the whole world and empty yourself out upon us.\n\nO Blood and Water, which flowed out from the Heart of Jesus as a fountain of Mercy for us, we trust in you!\n\nHoly God, Holy Mighty One, Holy Immortal One, have mercy on us and on the whole world. (three times)\n\nJesus, King of Mercy, We trust in you!`;
              navigator.clipboard.writeText(text);
              setCopiedThreeOClock(true);
              setTimeout(() => setCopiedThreeOClock(false), 2000);
            }}
            className="p-2.5 rounded-xl bg-gradient-to-b from-[#FAF3E8] to-[#EFE2CE] hover:from-white hover:to-[#F5E9D6] text-[#5C3A1E] hover:text-[#2E1B0E] border border-[#C8AD8D] ring-1 ring-[#DFD2C0] transition-colors cursor-pointer"
            title="Copy The Three O'Clock Prayer"
          >
            {copiedThreeOClock ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="relative z-10 space-y-4 bg-gradient-to-br from-[#FAF5EC]/85 via-[#F4E9D8]/80 to-[#EAD9C0]/85 backdrop-blur-xl backdrop-saturate-150 p-6 sm:p-8 rounded-xl border border-[#D5BE9F] ring-1 ring-[#E6DFD3]/80 shadow-[0_6px_24px_rgba(92,58,30,0.08),inset_0_1px_2px_rgba(255,255,255,0.9)] text-stone-900 font-serif text-base sm:text-lg md:text-xl leading-relaxed">
        <p className="text-[#2E1B0E]">
          You died, Jesus, but the source of life flowed out for souls, and the ocean of mercy opened up for the whole world. O Fountain of Life, immeasurable Divine Mercy, cover the whole world and empty yourself out upon us.
        </p>

        <p className="text-[#2E1B0E] pt-3.5 border-t border-[#D5BE9F]/60">
          O Blood and Water, which flowed out from the Heart of Jesus as a fountain of Mercy for us, we trust in you!
        </p>

        <p className="text-[#2E1B0E] pt-3.5 border-t border-[#D5BE9F]/60">
          Holy God, Holy Mighty One, Holy Immortal One, have mercy on us and on the whole world. <span className="italic text-[#6B4423] text-sm sm:text-base">(three times)</span>
        </p>

        <p className="font-bold text-[#5C3A1E] pt-3.5 border-t border-[#D5BE9F]/60">
          Jesus, King of Mercy, We trust in you!
        </p>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Devotion Switcher Tabs: 3 Divine Mercy (Red) + 3 Marian (Blue) adjusted to fit all 6 buttons on a single line aligned with rectangle below */}
      <div className="grid grid-cols-3 sm:flex sm:flex-nowrap items-stretch rounded-xl bg-[#F4ECE1]/90 p-1 sm:p-1.5 w-full shadow-lg border border-[#D5C3AE] backdrop-blur-md gap-1 sm:gap-1.5">
        {/* 1. Chaplet (Dark Red) */}
        <button
          onClick={() => {
            bellSynth.stopBells();
            setAngelusBellStatus('');
            setActiveDevotion('divine-mercy');
            handleReset();
          }}
          className={`sm:flex-1 min-w-0 py-2 px-1.5 sm:px-2 rounded-lg text-[11px] sm:text-xs font-semibold tracking-tight whitespace-nowrap transition-all cursor-pointer flex items-center justify-center bg-[#6E1414] bg-gradient-to-b from-[#7F1D1D] via-[#651313] to-[#4A0B0B] text-amber-50 border ${
            activeDevotion === 'divine-mercy'
              ? 'border-amber-300 ring-2 ring-amber-400/90 shadow-lg scale-[1.01]'
              : 'border-[#8B2323] hover:border-amber-300/70 hover:scale-[1.01]'
          }`}
        >
          <span className="truncate">Chaplet</span>
        </button>

        {/* 2. The Diary and the 14 Promises (Dark Red) */}
        <button
          onClick={() => {
            bellSynth.stopBells();
            setAngelusBellStatus('');
            setActiveDevotion('faustina');
            SacredReader.stop();
          }}
          className={`sm:flex-1 min-w-0 py-2 px-1.5 sm:px-2 rounded-lg text-[11px] sm:text-xs font-semibold tracking-tight whitespace-nowrap transition-all cursor-pointer flex items-center justify-center bg-[#6E1414] bg-gradient-to-b from-[#7F1D1D] via-[#651313] to-[#4A0B0B] text-amber-50 border ${
            activeDevotion === 'faustina'
              ? 'border-amber-300 ring-2 ring-amber-400/90 shadow-lg scale-[1.01]'
              : 'border-[#8B2323] hover:border-amber-300/70 hover:scale-[1.01]'
          }`}
        >
          <span className="truncate">Diary &amp; 14 Promises</span>
        </button>

        {/* 3. Three O'Clock Prayer (Dark Red) */}
        <button
          onClick={() => {
            bellSynth.stopBells();
            setAngelusBellStatus('');
            setActiveDevotion('three-oclock');
            SacredReader.stop();
          }}
          className={`sm:flex-1 min-w-0 py-2 px-1.5 sm:px-2 rounded-lg text-[11px] sm:text-xs font-semibold tracking-tight whitespace-nowrap transition-all cursor-pointer flex items-center justify-center bg-[#6E1414] bg-gradient-to-b from-[#7F1D1D] via-[#651313] to-[#4A0B0B] text-amber-50 border ${
            activeDevotion === 'three-oclock'
              ? 'border-amber-300 ring-2 ring-amber-400/90 shadow-lg scale-[1.01]'
              : 'border-[#8B2323] hover:border-amber-300/70 hover:scale-[1.01]'
          }`}
        >
          <span className="truncate">3 O&apos;Clock Prayer</span>
        </button>

        {/* 4. The Holy Rosary (Dark Blue - 1st Marian Button) */}
        <button
          onClick={() => {
            bellSynth.stopBells();
            setAngelusBellStatus('');
            setActiveDevotion('rosary');
            handleReset();
          }}
          className={`sm:flex-1 min-w-0 py-2 px-1.5 sm:px-2 rounded-lg text-[11px] sm:text-xs font-semibold tracking-tight whitespace-nowrap transition-all cursor-pointer flex items-center justify-center bg-[#172B69] bg-gradient-to-b from-[#1E3A8A] via-[#172B69] to-[#0F1E4D] text-amber-100 border ${
            activeDevotion === 'rosary'
              ? 'border-amber-300 ring-2 ring-amber-400/90 shadow-lg scale-[1.01]'
              : 'border-[#2B4C9E] hover:border-amber-300/70 hover:scale-[1.01]'
          }`}
        >
          <span className="truncate">The Holy Rosary</span>
        </button>

        {/* 5. Promises of Mary (Dark Blue - 2nd Marian Button) */}
        <button
          onClick={() => {
            bellSynth.stopBells();
            setAngelusBellStatus('');
            setActiveDevotion('marian-promises');
            SacredReader.stop();
          }}
          className={`sm:flex-1 min-w-0 py-2 px-1.5 sm:px-2 rounded-lg text-[11px] sm:text-xs font-semibold tracking-tight whitespace-nowrap transition-all cursor-pointer flex items-center justify-center bg-[#172B69] bg-gradient-to-b from-[#1E3A8A] via-[#172B69] to-[#0F1E4D] text-amber-100 border ${
            activeDevotion === 'marian-promises'
              ? 'border-amber-300 ring-2 ring-amber-400/90 shadow-lg scale-[1.01]'
              : 'border-[#2B4C9E] hover:border-amber-300/70 hover:scale-[1.01]'
          }`}
        >
          <span className="truncate">Promises of Mary</span>
        </button>

        {/* 6. The Angelus (Dark Blue - 3rd Marian Button, with approved bell tolling) */}
        <button
          onClick={() => {
            setActiveDevotion('angelus');
            SacredReader.stop();
            bellSynth.playAngelusToll((status) => setAngelusBellStatus(status));
          }}
          className={`sm:flex-1 min-w-0 py-2 px-1.5 sm:px-2 rounded-lg text-[11px] sm:text-xs font-semibold tracking-tight whitespace-nowrap transition-all cursor-pointer flex items-center justify-center gap-1 bg-[#172B69] bg-gradient-to-b from-[#1E3A8A] via-[#172B69] to-[#0F1E4D] text-amber-100 border ${
            activeDevotion === 'angelus'
              ? 'border-amber-300 ring-2 ring-amber-400/90 shadow-lg scale-[1.01]'
              : 'border-[#2B4C9E] hover:border-amber-300/70 hover:scale-[1.01]'
          }`}
          title="The Angelus — Click to open and toll the Angelus Bell"
        >
          <Bell className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300 shrink-0" />
          <span className="truncate">The Angelus</span>
        </button>
      </div>

      {/* =========================================================================
          HOLY ROSARY VIEW
         ========================================================================= */}
      {activeDevotion === 'rosary' && (
        <div className="space-y-6">
          
          {/* Continuous Leader Prayer Mode (Auto-Play) Banner */}
          <div className="p-4 sm:p-6 rounded-xl bg-gradient-to-r from-amber-950 via-stone-900 to-amber-900 border border-amber-500/50 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <span className="font-cinzel text-xs font-bold text-amber-300 uppercase tracking-widest">
                  AUTOPLAY PRAYER MODE
                </span>
                <button
                  onClick={() => setActiveDevotion('three-oclock')}
                  className="px-2.5 py-0.5 rounded-full bg-amber-500/20 hover:bg-amber-500/35 border border-amber-400/40 text-amber-200 text-[10px] font-cinzel font-bold tracking-wider transition-all cursor-pointer"
                >
                  3 O'Clock Prayer
                </button>
              </div>
              <p className="text-xs sm:text-sm text-stone-200 font-serif-sacred">
                The leader continuously prays all prayers and mysteries sequentially without requiring manual bead presses.
              </p>
            </div>
            <div className="flex items-center gap-2.5 shrink-0">
              {!isAutoAdvancing ? (
                <button
                  onClick={() => {
                    setHasStartedRosary(true);
                    setSpokenAudioEnabled(true);
                    setIsAutoAdvancing(true);
                  }}
                  className="flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-white font-cinzel font-bold text-xs sm:text-sm shadow-lg transition-all cursor-pointer border border-amber-400/60"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>START AUTOPLAY</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsAutoAdvancing(false);
                    SacredReader.stop();
                  }}
                  className="flex items-center gap-2 px-5 py-3 rounded-lg bg-amber-700 hover:bg-amber-800 text-white font-cinzel font-bold text-xs sm:text-sm shadow-lg transition-all cursor-pointer border border-amber-400/60 animate-pulse"
                >
                  <Pause className="w-4 h-4 fill-current" />
                  <span>Pause Continuous Prayer</span>
                </button>
              )}
            </div>
          </div>

          {/* Mystery Group Selector Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {(['Joyful', 'Luminous', 'Sorrowful', 'Glorious'] as RosaryMysteryGroup[]).map((group) => {
              const meta = ROSARY_MYSTERY_SETS[group];
              const isSelected = selectedMysteryGroup === group;
              const isToday = getTodaysMysteryGroup() === group;

              return (
                <button
                  key={group}
                  onClick={() => {
                    setSelectedMysteryGroup(group);
                    setRosaryStepIndex(0);
                    setHasStartedRosary(false);
                    setCountdown(autoAdvanceSeconds);
                    SacredReader.stop();
                  }}
                  className={`p-3 rounded-lg text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-900 text-amber-50 border-amber-800 shadow-md ring-2 ring-amber-700/50'
                      : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-cinzel text-xs font-bold uppercase tracking-wider">
                      {group}
                    </span>
                    {isToday && (
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                        isSelected ? 'bg-amber-400 text-amber-950' : 'bg-amber-100 text-amber-900'
                      }`}>
                        Today
                      </span>
                    )}
                  </div>
                  <p className={`text-[11px] mt-1 line-clamp-1 font-serif-sacred ${
                    isSelected ? 'text-amber-200' : 'text-stone-500'
                  }`}>
                    {meta.traditionalDays.split('(')[0]}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Interactive Prayer and Bead Deck */}
          <div className="bg-white rounded-xl shadow-md border border-stone-200 overflow-hidden">
            
            {/* Top Deck Info Bar */}
            <div className="p-4 sm:p-6 bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 text-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-amber-950 text-[11px] font-bold uppercase tracking-wider">
                    {ROSARY_MYSTERY_SETS[selectedMysteryGroup].title}
                  </span>
                  <span className="text-xs text-stone-300">
                    Step {rosaryStepIndex + 1} of {rosarySteps.length}
                  </span>
                </div>
                
                <h3 className="font-cinzel text-lg sm:text-2xl font-bold text-amber-100">
                  {currentRosaryStep.mysteryName || currentRosaryStep.prayerName}
                </h3>

                {currentRosaryStep.fruit && (
                  <p className="text-xs text-amber-300 font-serif-sacred italic">
                    Spiritual Fruit: <span className="font-semibold">{currentRosaryStep.fruit}</span>
                  </p>
                )}
              </div>

              {/* Progress Counter Circle */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-stone-400 font-medium">Progress</div>
                  <div className="text-xl font-bold font-cinzel text-amber-300">{progressPercent}%</div>
                </div>
                <div className="w-12 h-12 rounded-full border-4 border-stone-700 flex items-center justify-center text-xs font-bold text-amber-200 relative">
                  <div 
                    className="absolute inset-0 rounded-full border-4 border-amber-400 transition-all duration-300"
                    style={{ clipPath: `polygon(50% 50%, -50% -50%, ${progressPercent}% -50%, ${progressPercent}% ${progressPercent}%)` }}
                  />
                  <span>{rosaryStepIndex + 1}</span>
                </div>
              </div>
            </div>

            {/* Visual Bead Chain Preview (5 decades indicator) */}
            <div className="px-4 py-2.5 bg-stone-100 border-b border-stone-200 overflow-x-auto no-scrollbar">
              <div className="flex items-center justify-between min-w-[500px] gap-1">
                {/* Intro beads */}
                <div className="flex items-center gap-1 pr-3 border-r border-stone-300">
                  <span className="text-[10px] text-stone-500 font-cinzel font-bold mr-1">Intro</span>
                  {[0, 1, 2, 3, 4, 5, 6].map(idx => (
                    <button
                      key={idx}
                      onClick={() => selectRosaryStep(idx)}
                      className={`w-3.5 h-3.5 rounded-full transition-all cursor-pointer ${
                        rosaryStepIndex === idx 
                          ? 'bg-amber-600 scale-125 ring-2 ring-amber-400' 
                          : rosaryStepIndex > idx ? 'bg-amber-800' : 'bg-stone-300'
                      }`}
                      title={rosarySteps[idx]?.prayerName}
                    />
                  ))}
                </div>

                {/* 5 Decades */}
                {[1, 2, 3, 4, 5].map(dec => {
                  const isCurrentDecade = currentRosaryStep.decadeIndex === dec;
                  const targetOurFather = rosarySteps.find((s: any) => s.decadeIndex === dec && s.beadInDecade === undefined);
                  const ourFatherIdx = targetOurFather ? rosarySteps.indexOf(targetOurFather) : -1;
                  const isLargeCurrent = rosaryStepIndex === ourFatherIdx;
                  const isLargeDone = rosaryStepIndex > ourFatherIdx;

                  return (
                    <div 
                      key={dec} 
                      className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-colors ${
                        isCurrentDecade ? 'bg-amber-200/60 ring-1 ring-amber-400' : ''
                      }`}
                    >
                      <span className="text-[10px] font-bold text-stone-600 font-cinzel">D{dec}</span>
                      
                      {/* Large Bead: Our Father */}
                      <button
                        onClick={() => ourFatherIdx !== -1 && selectRosaryStep(ourFatherIdx)}
                        className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                          isLargeCurrent
                            ? 'bg-amber-500 scale-135 ring-2 ring-amber-300 shadow-xs'
                            : isLargeDone ? 'bg-amber-800' : 'bg-amber-700/70 hover:bg-amber-700'
                        }`}
                        title={`Decade ${dec}: Our Father (Large Bead)`}
                      />

                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 10 }).map((_, h) => {
                          const targetStep = rosarySteps.find((s: any) => s.decadeIndex === dec && s.beadInDecade === h + 1);
                          const stepIdx = targetStep ? rosarySteps.indexOf(targetStep) : -1;
                          const isCurrent = rosaryStepIndex === stepIdx;
                          const isDone = rosaryStepIndex > stepIdx;

                          return (
                            <button
                              key={h}
                              onClick={() => stepIdx !== -1 && selectRosaryStep(stepIdx)}
                              className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                                isCurrent 
                                  ? 'bg-amber-500 scale-150 ring-2 ring-amber-300' 
                                  : isDone ? 'bg-amber-800' : 'bg-stone-300'
                              }`}
                              title={`Decade ${dec}, Bead ${h + 1}`}
                            />
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Main Bead Text Presentation */}
            <div className="p-6 sm:p-10 space-y-6">
              
              {/* Instruction Prompt */}
              <div className="flex items-center justify-between text-xs text-amber-900 font-medium bg-amber-50/80 px-4 py-2.5 rounded-xl border border-amber-200/80">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span className="font-semibold">{currentRosaryStep.instruction}</span>
                </div>
                {currentRosaryStep.beadInDecade && (
                  <span className="font-cinzel font-bold text-amber-950">
                    Bead {currentRosaryStep.beadInDecade} of 10
                  </span>
                )}
              </div>

              {/* Prayer Name and Latin Toggle */}
              <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                <h4 className="font-cinzel text-xl font-bold text-stone-900">
                  {currentRosaryStep.prayerName}
                </h4>
                {currentRosaryStep.latinName && (
                  <button
                    onClick={() => setShowLatin(!showLatin)}
                    className="text-xs font-semibold text-amber-800 hover:text-amber-950 px-2.5 py-1 rounded-md bg-stone-100 hover:bg-stone-200 transition-colors cursor-pointer"
                  >
                    {showLatin ? 'View English' : 'View Latin'}
                  </button>
                )}
              </div>

              {/* Scripture and Meditation (if decade start) */}
              {currentRosaryStep.mysteryName && (
                <div className="relative p-4 rounded-xl bg-[#FAF8F5] shadow-2xs space-y-2">
                  <span className="pointer-events-none absolute top-0 left-0 w-4 h-4 rounded-tl-xl border-t-[3px] border-l-[3px] border-amber-700" />
                  <span className="pointer-events-none absolute top-0 right-0 w-4 h-4 rounded-tr-xl border-t-[3px] border-r-[3px] border-amber-700" />
                  <span className="pointer-events-none absolute bottom-0 left-0 w-4 h-4 rounded-bl-xl border-b-[3px] border-l-[3px] border-amber-700" />
                  <span className="pointer-events-none absolute bottom-0 right-0 w-4 h-4 rounded-br-xl border-b-[3px] border-r-[3px] border-amber-700" />
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-900 font-cinzel">
                    Scripture Contemplation
                  </div>
                  <p className="text-sm sm:text-base font-serif-sacred text-stone-800 italic">
                    "{ROSARY_MYSTERY_SETS[selectedMysteryGroup].mysteries.find((m: any) => m.name === currentRosaryStep.mysteryName)?.scriptureText}"
                  </p>
                  <p className="text-xs text-stone-600 font-serif-sacred">
                    — {ROSARY_MYSTERY_SETS[selectedMysteryGroup].mysteries.find((m: any) => m.name === currentRosaryStep.mysteryName)?.meditation}
                  </p>
                </div>
              )}

              {/* Prayer Text */}
              <div className="font-serif-sacred text-stone-900 text-lg sm:text-2xl leading-relaxed whitespace-pre-line text-center py-2">
                {currentRosaryStep.prayerText}
              </div>

              {/* Step Navigation and Timed Auto-Advance Controls */}
              <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                {/* Auto Advance and Prompts Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setHasStartedRosary(true);
                      const next = !isAutoAdvancing;
                      setIsAutoAdvancing(next);
                      if (!next) SacredReader.stop();
                    }}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isAutoAdvancing
                        ? 'bg-amber-600 text-white animate-pulse'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300'
                    }`}
                  >
                    {isAutoAdvancing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-amber-800" />}
                    <span>{isAutoAdvancing ? (spokenAudioEnabled ? 'Praying...' : `Auto: ${countdown}s`) : 'Autoplay'}</span>
                  </button>

                  <select
                    value={prayerVoiceRate}
                    onChange={(e) => setPrayerVoiceRate(Number(e.target.value))}
                    className="text-xs py-2 px-2.5 rounded-lg bg-stone-100 border border-stone-300 font-medium text-stone-700"
                    title="Prayer voice speed"
                  >
                    <option value={0.68}>Slow and Solemn</option>
                    <option value={0.75}>Contemplative</option>
                    <option value={0.83}>Gentle Standard</option>
                  </select>

                  <button
                    onClick={() => {
                      const next = !spokenAudioEnabled;
                      setSpokenAudioEnabled(next);
                      if (!next) SacredReader.stop();
                      else if (hasStartedRosary && !isAutoAdvancing) triggerAudioForStep(currentRosaryStep.prayerText);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                      spokenAudioEnabled ? 'bg-amber-700 text-white border-amber-800 shadow-xs' : 'bg-stone-100 text-stone-600 border-stone-300'
                    }`}
                    title={spokenAudioEnabled ? 'Human voice praying aloud (Click to mute)' : 'Voice muted (Click to enable human voice)'}
                  >
                    {spokenAudioEnabled ? <Volume2 className="w-4 h-4 text-amber-200" /> : <VolumeX className="w-4 h-4" />}
                    <span>{spokenAudioEnabled ? 'Human Voice' : 'Muted'}</span>
                  </button>
                </div>

                {/* Back / Next Bead / Start Rosary buttons */}
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button
                    onClick={handleReset}
                    className="p-2.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
                    title="Restart Rosary from Beginning"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handlePrevBead}
                    disabled={rosaryStepIndex === 0}
                    className="flex items-center gap-1 px-4 py-2.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 disabled:opacity-40 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <button
                    onClick={handleNextBead}
                    className="flex items-center gap-1 px-6 py-2.5 rounded-lg bg-amber-900 hover:bg-amber-800 text-amber-100 font-semibold text-xs shadow-md transition-all cursor-pointer"
                  >
                    <span>Next Bead</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* =========================================================================
          CHAPLET OF THE DIVINE MERCY VIEW
         ========================================================================= */}
      {activeDevotion === 'divine-mercy' && (
        <div className="space-y-6">
          
          {/* 3:00 PM Hour of Great Mercy Banner */}
          <div className="bg-gradient-to-r from-red-950 via-stone-900 to-red-900 rounded-xl p-6 sm:p-8 text-white shadow-md border border-red-900/40 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
                <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-red-300">
                  {DIVINE_MERCY_OPENING_PRAYERS.hourOfMercyTitle}
                </span>
              </div>
              <button
                onClick={() => setActiveDevotion('three-oclock')}
                className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/35 border border-amber-400/40 text-amber-200 text-xs font-cinzel font-bold tracking-wider transition-all cursor-pointer self-start sm:self-auto flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Pray The 3 O'Clock Prayer</span>
              </button>
            </div>
            <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-amber-100">
              The Chaplet of the Divine Mercy
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 font-serif-sacred italic leading-relaxed">
              "{DIVINE_MERCY_OPENING_PRAYERS.hourOfMercyIntro}"
            </p>
          </div>

          {/* Interactive Divine Mercy Bead Deck */}
          <div className="bg-white rounded-xl shadow-md border border-stone-200 overflow-hidden">
            
            {/* Continuous Leader Prayer Mode (Auto-Play) and Trish Short Divine Mercy in Song Options */}
            <div className="p-4 sm:p-6 bg-gradient-to-r from-red-950 via-stone-900 to-red-900 border-b border-red-500/40 space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="font-cinzel text-xs font-bold text-red-300 uppercase tracking-widest">
                      AUTOPLAY PRAYER MODE
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-200 font-serif-sacred">
                    Choose spoken continuous prayer or pray along with <strong className="text-amber-200">The Chaplet of Divine Mercy in Song by Trish Short</strong>.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2.5 shrink-0">
                  {!isAutoAdvancing ? (
                    <button
                      onClick={() => {
                        setIsPlayingTrishShortSong(false);
                        setHasStartedMercy(true);
                        setSpokenAudioEnabled(true);
                        setIsAutoAdvancing(true);
                      }}
                      className="flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-red-700 via-red-800 to-red-900 hover:from-red-600 hover:to-red-800 text-white font-cinzel font-bold text-xs sm:text-sm shadow-lg transition-all cursor-pointer border border-red-400/60"
                    >
                      <Play className="w-4 h-4 fill-current" />
                      <span>START AUTOPLAY</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setIsAutoAdvancing(false);
                        SacredReader.stop();
                      }}
                      className="flex items-center gap-2 px-5 py-3 rounded-lg bg-red-800 hover:bg-red-900 text-white font-cinzel font-bold text-xs sm:text-sm shadow-lg transition-all cursor-pointer border border-red-400/60 animate-pulse"
                    >
                      <Pause className="w-4 h-4 fill-current" />
                      <span>Pause Continuous Prayer</span>
                    </button>
                  )}

                  {/* Option 2: The Chaplet of Divine Mercy in Song by Trish Short */}
                  <button
                    onClick={() => {
                      const nextState = !isPlayingTrishShortSong;
                      setIsPlayingTrishShortSong(nextState);
                      if (nextState) {
                        setIsAutoAdvancing(false);
                        SacredReader.stop();
                      }
                    }}
                    className={`flex items-center gap-2 px-5 py-3 rounded-lg font-cinzel font-bold text-xs sm:text-sm shadow-lg transition-all cursor-pointer border ${
                      isPlayingTrishShortSong
                        ? 'bg-amber-400 text-stone-950 border-amber-200 ring-2 ring-amber-300/60'
                        : 'bg-stone-900/90 hover:bg-stone-800 text-amber-200 border-amber-400/50'
                    }`}
                    title="Play The Chaplet of Divine Mercy in Song by Trish Short"
                  >
                    {isPlayingTrishShortSong ? (
                      <>
                        <Pause className="w-4 h-4 fill-current" />
                        <span>CLOSE DIVINE MERCY IN SONG</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 fill-current text-amber-300" />
                        <span>DIVINE MERCY IN SONG • TRISH SHORT</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Embedded Player for The Chaplet of Divine Mercy in Song by Trish Short */}
              {isPlayingTrishShortSong && (
                <div className="pt-3 border-t border-red-500/30 space-y-3 animate-fadeIn">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-black/45 px-4 py-3 rounded-xl border border-amber-400/30">
                    <div>
                      <span className="font-cinzel text-[11px] font-bold uppercase tracking-widest text-amber-300 block">
                        Sung Chaplet • Official Devotional Recording
                      </span>
                      <h5 className="font-serif text-sm sm:text-base font-bold text-white">
                        The Chaplet of Divine Mercy in Song — Trish Short (Complete)
                      </h5>
                    </div>

                    <div className="flex items-center gap-1.5 self-start sm:self-auto">
                      <button
                        onClick={() => setTrishShortEdition('complete')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-serif font-semibold transition-all cursor-pointer ${
                          trishShortEdition === 'complete'
                            ? 'bg-amber-400 text-stone-950 shadow-xs'
                            : 'bg-white/10 text-stone-300 hover:bg-white/20'
                        }`}
                      >
                        Original Complete (33M+ Views)
                      </button>
                      <button
                        onClick={() => setTrishShortEdition('official')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-serif font-semibold transition-all cursor-pointer ${
                          trishShortEdition === 'official'
                            ? 'bg-amber-400 text-stone-950 shadow-xs'
                            : 'bg-white/10 text-stone-300 hover:bg-white/20'
                        }`}
                      >
                        Trish Short Channel Edition
                      </button>
                    </div>
                  </div>

                  <div className="relative w-full aspect-video max-h-[420px] rounded-xl overflow-hidden border border-amber-400/40 shadow-2xl bg-black">
                    <iframe
                      key={trishShortEdition}
                      src={
                        trishShortEdition === 'complete'
                          ? 'https://www.youtube.com/embed/p5TGfisOKMM?autoplay=1&rel=0'
                          : 'https://www.youtube.com/embed/HKlOLyYs3Os?autoplay=1&rel=0'
                      }
                      title="The Chaplet of Divine Mercy in Song by Trish Short"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>

                  <p className="text-xs text-amber-200/90 font-serif-sacred italic text-center">
                    You can follow and click along on the interactive Chaplet beads below while praying in song with Trish Short.
                  </p>
                </div>
              )}
            </div>
            
            {/* Top Deck Info */}
            <div className="p-4 sm:p-6 bg-stone-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-red-900 text-red-100 text-[11px] font-bold uppercase tracking-wider">
                  {currentMercyStep.decadeIndex === 0 
                    ? 'Opening Prayers' 
                    : currentMercyStep.decadeIndex === 6 
                      ? 'Concluding Doxology' 
                      : `Decade ${currentMercyStep.decadeIndex}`}
                </span>
                <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-amber-100 mt-1">
                  {currentMercyStep.prayerName}
                </h4>
              </div>

              {/* Progress Counter Circle */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-stone-400 font-medium">Progress</div>
                  <div className="text-xl font-bold font-cinzel text-red-300">{mercyProgressPercent}%</div>
                </div>
                <div className="w-12 h-12 rounded-full border-4 border-stone-700 flex items-center justify-center text-xs font-bold text-red-200 relative">
                  <div 
                    className="absolute inset-0 rounded-full border-4 border-red-500 transition-all duration-300"
                    style={{ clipPath: `polygon(50% 50%, -50% -50%, ${mercyProgressPercent}% -50%, ${mercyProgressPercent}% ${mercyProgressPercent}%)` }}
                  />
                  <span>{mercyStepIndex + 1}</span>
                </div>
              </div>
            </div>

            {/* Visual Bead Chain Preview for Chaplet (Opening Prayers + 5 Decades + Conclusion) */}
            <div className="px-4 py-2.5 bg-stone-100 border-b border-stone-200 overflow-x-auto no-scrollbar">
              <div className="flex items-center justify-between min-w-[560px] gap-1">
                {/* Intro Beads */}
                <div className="flex items-center gap-1 pr-3 border-r border-stone-300 shrink-0">
                  <span className="text-[10px] text-stone-500 font-cinzel font-bold mr-1">Intro</span>
                  {[0, 1, 2, 3, 4, 5].map((idx) => {
                    const isCurrent = mercyStepIndex === idx;
                    const isDone = mercyStepIndex > idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => selectMercyStep(idx)}
                        className={`w-3.5 h-3.5 rounded-full transition-all cursor-pointer ${
                          isCurrent 
                            ? 'bg-red-600 scale-125 ring-2 ring-red-400 shadow-sm' 
                            : isDone ? 'bg-red-800' : 'bg-stone-300 hover:bg-stone-400'
                        }`}
                        title={mercySteps[idx]?.prayerName}
                      />
                    );
                  })}
                </div>

                {/* 5 Decades of the Divine Mercy Chaplet */}
                {[1, 2, 3, 4, 5].map((dec) => {
                  const isCurrentDecade = currentMercyStep.decadeIndex === dec;
                  const largeBeadIdx = 6 + (dec - 1) * 11;
                  const isLargeCurrent = mercyStepIndex === largeBeadIdx;
                  const isLargeDone = mercyStepIndex > largeBeadIdx;

                  return (
                    <div
                      key={dec}
                      className={`flex items-center gap-1 px-2 py-1 rounded-lg transition-colors shrink-0 ${
                        isCurrentDecade ? 'bg-red-100 ring-1 ring-red-400' : ''
                      }`}
                    >
                      <span className="text-[10px] font-bold text-stone-600 font-cinzel">D{dec}</span>
                      
                      {/* Large Bead: Eternal Father */}
                      <button
                        onClick={() => selectMercyStep(largeBeadIdx)}
                        className={`w-3.5 h-3.5 rounded-full transition-all cursor-pointer ${
                          isLargeCurrent
                            ? 'bg-red-600 scale-135 ring-2 ring-red-400 shadow-sm'
                            : isLargeDone ? 'bg-red-900' : 'bg-red-300 hover:bg-red-400'
                        }`}
                        title={`Decade ${dec}: Eternal Father (Large Bead)`}
                      />

                      {/* 10 Small Beads: Sorrowful Passion */}
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 10 }).map((_, h) => {
                          const stepIdx = largeBeadIdx + 1 + h;
                          const isCurrent = mercyStepIndex === stepIdx;
                          const isDone = mercyStepIndex > stepIdx;

                          return (
                            <button
                              key={h}
                              onClick={() => selectMercyStep(stepIdx)}
                              className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                                isCurrent
                                  ? 'bg-red-500 scale-150 ring-2 ring-red-300'
                                  : isDone ? 'bg-red-800' : 'bg-stone-300 hover:bg-stone-400'
                              }`}
                              title={`Decade ${dec}, Bead ${h + 1} of 10: Sorrowful Passion`}
                            />
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                {/* Concluding Doxology Beads */}
                <div className="flex items-center gap-1 pl-3 border-l border-stone-300 shrink-0">
                  <span className="text-[10px] text-stone-500 font-cinzel font-bold mr-1">Amen</span>
                  {[61, 62].map((idx) => {
                    const isCurrent = mercyStepIndex === idx;
                    const isDone = mercyStepIndex > idx;
                    return (
                      <button
                        key={idx}
                        onClick={() => selectMercyStep(idx)}
                        className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                          isCurrent 
                            ? 'bg-red-600 scale-125 ring-2 ring-red-400 shadow-sm' 
                            : isDone ? 'bg-red-800' : 'bg-stone-300 hover:bg-stone-400'
                        }`}
                        title={mercySteps[idx]?.prayerName}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Main Prayer Step Card */}
            <div className="p-6 sm:p-10 space-y-6">
              
              <div className="text-xs text-red-900 font-medium bg-red-50 px-4 py-2.5 rounded-xl border border-red-200 flex items-center justify-between">
                <span>{currentMercyStep.instruction}</span>
                {currentMercyStep.countLabel && (
                  <span className="font-bold font-cinzel">{currentMercyStep.countLabel}</span>
                )}
              </div>

              <div className="font-serif-sacred text-stone-900 text-xl sm:text-3xl leading-relaxed whitespace-pre-line text-center py-6">
                {currentMercyStep.prayerText}
              </div>

              {/* Controls */}
              <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      setHasStartedMercy(true);
                      const next = !isAutoAdvancing;
                      setIsAutoAdvancing(next);
                      if (!next) SacredReader.stop();
                    }}
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isAutoAdvancing
                        ? 'bg-red-700 text-white animate-pulse'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300'
                    }`}
                  >
                    {isAutoAdvancing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-red-800" />}
                    <span>{isAutoAdvancing ? (spokenAudioEnabled ? 'Praying...' : `Auto: ${countdown}s`) : 'Autoplay'}</span>
                  </button>

                  <select
                    value={prayerVoiceRate}
                    onChange={(e) => setPrayerVoiceRate(Number(e.target.value))}
                    className="text-xs py-2 px-2.5 rounded-lg bg-stone-100 border border-stone-300 font-medium text-stone-700"
                    title="Prayer voice speed"
                  >
                    <option value={0.68}>Slow and Solemn</option>
                    <option value={0.75}>Contemplative</option>
                    <option value={0.83}>Gentle Standard</option>
                  </select>

                  <button
                    onClick={() => {
                      const next = !spokenAudioEnabled;
                      setSpokenAudioEnabled(next);
                      if (!next) SacredReader.stop();
                      else if (hasStartedMercy && !isAutoAdvancing) triggerAudioForStep(currentMercyStep.prayerText);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium transition-colors cursor-pointer ${
                      spokenAudioEnabled ? 'bg-red-800 text-white border-red-900 shadow-xs' : 'bg-stone-100 text-stone-600 border-stone-300'
                    }`}
                    title={spokenAudioEnabled ? 'Human voice praying aloud (Click to mute)' : 'Voice muted (Click to enable human voice)'}
                  >
                    {spokenAudioEnabled ? <Volume2 className="w-4 h-4 text-red-200" /> : <VolumeX className="w-4 h-4" />}
                    <span>{spokenAudioEnabled ? 'Human Voice' : 'Muted'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleReset}
                    className="p-2.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
                    title="Restart Chaplet"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handlePrevBead}
                    disabled={mercyStepIndex === 0}
                    className="flex items-center gap-1 px-4 py-2.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 disabled:opacity-40 text-xs font-semibold cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    onClick={handleNextBead}
                    className="flex items-center gap-1 px-6 py-2.5 rounded-lg bg-red-900 hover:bg-red-800 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
                  >
                    <span>Next Bead</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* =========================================================================
          ST. FAUSTINA DIARY and THE 14 PROMISES OF JESUS VIEW
         ========================================================================= */}
      {activeDevotion === 'faustina' && (
        <div className="relative isolate space-y-6 animate-fadeIn">
          {/* Header Banner - Frosted Glass (Pink and wine colors removed) */}
          <div className="relative isolate overflow-hidden rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-[#F7EFE4]/80 via-[#EFE3D2]/75 to-[#E8D7C1]/80 backdrop-blur-2xl backdrop-saturate-150 border border-white/85 ring-1 ring-[#D5C3AE]/75 shadow-[0_12px_36px_rgba(139,90,43,0.11),inset_0_1px_2px_rgba(255,255,255,0.95)] text-stone-900 space-y-3">
            <div className="pointer-events-none absolute -top-12 -left-12 w-64 h-64 rounded-full bg-amber-200/35 blur-3xl z-0" />
            <div className="pointer-events-none absolute -bottom-12 -right-12 w-64 h-64 rounded-full bg-amber-300/35 blur-3xl z-0" />
            <div className="relative z-10 flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-white/70 backdrop-blur-md text-[#8B5A2B] border border-white/85 ring-1 ring-amber-300/70">
                <Star className="w-4 h-4" />
              </span>
              <span className="font-cinzel text-xs font-bold text-[#8B5A2B] tracking-wider uppercase">
                Saint Maria Faustina Kowalska • Vilnius and Kraków
              </span>
            </div>
            <h2 className="relative z-10 font-cinzel text-2xl sm:text-3xl font-bold text-stone-900 tracking-wide">
              The Diary and The 14 Promises of Jesus
            </h2>
            <p className="relative z-10 text-xs sm:text-sm text-stone-700 font-serif-sacred max-w-2xl leading-relaxed">
              "My Heart overflows with great mercy for souls... The graces of My mercy are drawn by means of one vessel only, and that is—trust" (Diary 1731). Discover the 14 extraordinary promises given by Christ to souls who recite the Chaplet of Divine Mercy, along with cornerstone passages from the Diary.
            </p>
          </div>

          {/* 14 PROMISES OF JESUS - Frosted Glass Container (Pink and wine colors removed) */}
          <div className="relative isolate overflow-hidden rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-[#F6EDE0]/80 via-[#EDE0CE]/75 to-[#E6D5BF]/80 backdrop-blur-2xl backdrop-saturate-150 border border-white/85 ring-1 ring-[#D5C3AE]/75 shadow-[0_12px_40px_rgba(139,90,43,0.12),inset_0_1px_2px_rgba(255,255,255,0.95)] space-y-6">
            {/* Ambient Warm Golden & Parchment Rays behind the Frosted Glass */}
            <div className="pointer-events-none absolute -top-16 -left-16 w-80 h-80 rounded-full bg-amber-200/35 blur-3xl z-0" />
            <div className="pointer-events-none absolute top-1/3 -right-16 w-96 h-96 rounded-full bg-stone-200/45 blur-3xl z-0" />
            <div className="pointer-events-none absolute -bottom-16 left-1/4 w-96 h-96 rounded-full bg-amber-300/35 blur-3xl z-0" />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/75 pb-4 gap-3">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-6 h-6 text-[#8B5A2B] shrink-0" />
                <div>
                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900">
                    The 14 Promises of Jesus for Praying the Chaplet
                  </h3>
                  <span className="text-xs sm:text-sm font-serif text-stone-700">
                    Approved by the Holy See • From the Diary of St. Maria Faustina Kowalska
                  </span>
                </div>
              </div>

              {/* Standardized Font Size Stepper */}
              <div className="flex items-center gap-2.5 self-start sm:self-auto">
                <span className="font-medium text-stone-700 text-xs">Text Size:</span>
                <div className="flex items-center gap-1 bg-white/60 backdrop-blur-md p-1 rounded-md border border-white/85 ring-1 ring-[#D5CEBF]/70 shadow-2xs">
                  <button
                    onClick={decreasePromisesFontSize}
                    disabled={promisesFontSize === 'normal'}
                    className="w-7 h-7 flex items-center justify-center rounded-md text-xs font-bold text-stone-700 hover:text-stone-900 hover:bg-white/70 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-all"
                    title="Decrease font size"
                    aria-label="Decrease font size"
                  >
                    A-
                  </button>
                  <button
                    onClick={() => setPromisesFontSize('normal')}
                    className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-all cursor-pointer ${
                      promisesFontSize === 'normal'
                        ? 'bg-[#6B4423] text-white shadow-xs font-bold ring-1 ring-[#8B5A2B]'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                    }`}
                    title="Default text size (100%)"
                  >
                    A
                  </button>
                  <button
                    onClick={() => setPromisesFontSize('large')}
                    className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-all cursor-pointer ${
                      promisesFontSize === 'large'
                        ? 'bg-[#6B4423] text-white shadow-xs font-bold ring-1 ring-[#8B5A2B]'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                    }`}
                    title="Large text size (125%)"
                  >
                    A+
                  </button>
                  <button
                    onClick={() => setPromisesFontSize('xlarge')}
                    className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-all cursor-pointer ${
                      promisesFontSize === 'xlarge'
                        ? 'bg-[#6B4423] text-white shadow-xs font-bold ring-1 ring-[#8B5A2B]'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                    }`}
                    title="Extra large text size (155%)"
                  >
                    A++
                  </button>
                  <button
                    onClick={increasePromisesFontSize}
                    disabled={promisesFontSize === 'xlarge'}
                    className="w-7 h-7 flex items-center justify-center rounded-md text-xs font-bold text-[#6B4423] hover:text-stone-900 hover:bg-white/70 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-all"
                    title="Increase font size"
                    aria-label="Increase font size"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5">
              {DIVINE_MERCY_PROMISES.map((item) => {
                const isCopied = copiedPromiseNum === item.number;
                return (
                  <div 
                    key={item.number} 
                    className="p-5 sm:p-6 rounded-xl bg-white/55 hover:bg-white/75 backdrop-blur-xl backdrop-saturate-150 border border-white/85 hover:border-white ring-1 ring-[#DFD3C3]/80 transition-all space-y-3.5 flex flex-col justify-between shadow-[0_8px_28px_rgba(139,90,43,0.08),inset_0_1px_2px_rgba(255,255,255,0.92)] hover:shadow-[0_12px_32px_rgba(139,90,43,0.14)]"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-cinzel text-sm sm:text-base font-bold text-[#8B5A2B] tracking-wide">
                          Promise #{item.number}
                        </span>
                        <span className="text-xs sm:text-sm font-serif px-3 py-1 rounded-full bg-white/65 backdrop-blur-sm text-[#6B4423] border border-white/85 ring-1 ring-[#DFD2C0] font-medium">
                          {item.diaryCitation}
                        </span>
                      </div>
                      <h4 className={`font-serif font-bold text-stone-900 tracking-wide ${
                        promisesFontSize === 'normal' ? 'text-base sm:text-lg' :
                        promisesFontSize === 'large' ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'
                      }`}>
                        {item.title}
                      </h4>
                      <div className={`relative font-serif italic text-stone-800 leading-relaxed bg-white/55 backdrop-blur-md p-3.5 sm:p-4 rounded-xl border border-white/80 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9)] ${
                        promisesFontSize === 'normal' ? 'text-sm sm:text-base' :
                        promisesFontSize === 'large' ? 'text-base sm:text-lg md:text-xl' : 'text-lg sm:text-xl md:text-2xl'
                      }`}>
                        <span className="pointer-events-none absolute top-0 left-0 w-4 h-4 rounded-tl-xl border-t-[3px] border-l-[3px] border-[#B48342]" />
                        <span className="pointer-events-none absolute top-0 right-0 w-4 h-4 rounded-tr-xl border-t-[3px] border-r-[3px] border-[#B48342]" />
                        <span className="pointer-events-none absolute bottom-0 left-0 w-4 h-4 rounded-bl-xl border-b-[3px] border-l-[3px] border-[#B48342]" />
                        <span className="pointer-events-none absolute bottom-0 right-0 w-4 h-4 rounded-br-xl border-b-[3px] border-r-[3px] border-[#B48342]" />
                        "{item.promise}"
                      </div>
                      <p className={`font-serif text-stone-700 leading-relaxed pt-1 ${
                        promisesFontSize === 'normal' ? 'text-xs sm:text-sm' :
                        promisesFontSize === 'large' ? 'text-sm sm:text-base' : 'text-base sm:text-lg'
                      }`}>
                        {item.theologicalContext}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/70 flex items-center justify-end gap-2.5">
                      <button
                        onClick={() => {
                          const text = `Promise of Jesus #${item.number}: ${item.title} (${item.diaryCitation})\n"${item.promise}"\nContext: ${item.theologicalContext}`;
                          navigator.clipboard.writeText(text);
                          setCopiedPromiseNum(item.number);
                          setTimeout(() => setCopiedPromiseNum(null), 2000);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white/65 hover:bg-white/90 backdrop-blur-sm text-stone-700 hover:text-stone-900 border border-white/85 ring-1 ring-stone-200/80 text-xs sm:text-sm font-serif flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Copy promise"
                      >
                        {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        <span>{isCopied ? 'Copied' : 'Copy'}</span>
                      </button>

                      <button
                        onClick={() => {
                          SacredReader.speak(`${item.title}. Jesus says: ${item.promise}`);
                        }}
                        className="p-2 rounded-lg bg-white/65 hover:bg-white/90 backdrop-blur-sm text-[#6B4423] border border-white/85 ring-1 ring-[#DFD2C0] transition-colors cursor-pointer"
                        title="Listen with human voice"
                        aria-label="Listen with human voice"
                      >
                        <Volume2 className="w-4 h-4 text-[#8B5A2B]" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* THE 3 O'CLOCK PRAYER OF DIVINE MERCY (PLACED AFTER THE PROMISES OF JESUS) */}
          {renderThreeOClockCard(true)}

          {/* KEY EXCERPTS FROM THE DIARY OF ST. FAUSTINA - Frosted Glass Container (Pink and wine colors removed) */}
          <div className="relative isolate overflow-hidden rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-[#F6EDE0]/80 via-[#EDE0CE]/75 to-[#E8D7C1]/80 backdrop-blur-2xl backdrop-saturate-150 border border-white/85 ring-1 ring-[#D5C3AE]/75 shadow-[0_12px_40px_rgba(139,90,43,0.12),inset_0_1px_2px_rgba(255,255,255,0.95)] space-y-6">
            <div className="pointer-events-none absolute -top-16 -right-16 w-80 h-80 rounded-full bg-amber-300/35 blur-3xl z-0" />
            <div className="pointer-events-none absolute -bottom-16 -left-16 w-80 h-80 rounded-full bg-amber-200/35 blur-3xl z-0" />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/75 pb-4 gap-3">
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-6 h-6 text-[#8B5A2B] shrink-0" />
                <div>
                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900">
                    Cornerstone Excerpts from The Diary of St. Faustina
                  </h3>
                  <span className="text-xs sm:text-sm font-serif text-stone-700">
                    Divine Mercy in My Soul
                  </span>
                </div>
              </div>

              {/* Standardized Font Size Stepper */}
              <div className="flex items-center gap-2.5 self-start sm:self-auto">
                <span className="font-medium text-stone-700 text-xs">Text Size:</span>
                <div className="flex items-center gap-1 bg-white/60 backdrop-blur-md p-1 rounded-md border border-white/85 ring-1 ring-[#D5CEBF]/70 shadow-2xs">
                  <button
                    onClick={decreasePromisesFontSize}
                    disabled={promisesFontSize === 'normal'}
                    className="w-7 h-7 flex items-center justify-center rounded-md text-xs font-bold text-stone-700 hover:text-stone-900 hover:bg-white/70 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-all"
                    title="Decrease font size"
                    aria-label="Decrease font size"
                  >
                    A-
                  </button>
                  <button
                    onClick={() => setPromisesFontSize('normal')}
                    className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-all cursor-pointer ${
                      promisesFontSize === 'normal'
                        ? 'bg-[#6B4423] text-white shadow-xs font-bold ring-1 ring-[#8B5A2B]'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                    }`}
                    title="Default text size (100%)"
                  >
                    A
                  </button>
                  <button
                    onClick={() => setPromisesFontSize('large')}
                    className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-all cursor-pointer ${
                      promisesFontSize === 'large'
                        ? 'bg-[#6B4423] text-white shadow-xs font-bold ring-1 ring-[#8B5A2B]'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                    }`}
                    title="Large text size (125%)"
                  >
                    A+
                  </button>
                  <button
                    onClick={() => setPromisesFontSize('xlarge')}
                    className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-all cursor-pointer ${
                      promisesFontSize === 'xlarge'
                        ? 'bg-[#6B4423] text-white shadow-xs font-bold ring-1 ring-[#8B5A2B]'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                    }`}
                    title="Extra large text size (155%)"
                  >
                    A++
                  </button>
                  <button
                    onClick={increasePromisesFontSize}
                    disabled={promisesFontSize === 'xlarge'}
                    className="w-7 h-7 flex items-center justify-center rounded-md text-xs font-bold text-[#6B4423] hover:text-stone-900 hover:bg-white/70 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-all"
                    title="Increase font size"
                    aria-label="Increase font size"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="relative z-10 space-y-5">
              {FAUSTINA_DIARY_EXCERPTS.map((excerpt) => {
                const isCopied = copiedExcerptId === excerpt.id;
                const isReading = readingExcerptId === excerpt.id;

                return (
                  <article 
                    key={excerpt.id}
                    className="p-5 sm:p-6 rounded-xl bg-white/55 hover:bg-white/75 backdrop-blur-xl backdrop-saturate-150 border border-white/85 hover:border-white ring-1 ring-[#DFD3C3]/80 transition-all space-y-4 shadow-[0_8px_28px_rgba(139,90,43,0.08),inset_0_1px_2px_rgba(255,255,255,0.92)] hover:shadow-[0_12px_32px_rgba(139,90,43,0.14)]"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-cinzel text-base sm:text-lg font-bold text-[#8B5A2B] tracking-wide">
                          Diary #{excerpt.diaryNumber}
                        </span>
                        <span className="text-stone-400">•</span>
                        <h4 className={`font-serif font-bold text-stone-900 ${
                          promisesFontSize === 'normal' ? 'text-xl sm:text-2xl' :
                          promisesFontSize === 'large' ? 'text-2xl sm:text-3xl' : 'text-3xl sm:text-4xl'
                        }`}>
                          {excerpt.title}
                        </h4>
                      </div>
                      <span className="text-xs sm:text-sm font-serif px-3 py-1 rounded-full bg-white/65 backdrop-blur-sm text-[#6B4423] border border-white/85 ring-1 ring-[#DFD2C0] self-start sm:self-auto font-medium">
                        Spoken by {excerpt.spokenBy}
                      </span>
                    </div>

                    <div className={`relative font-serif italic text-stone-900 leading-relaxed bg-white/55 backdrop-blur-md p-5 sm:p-6 rounded-xl border border-white/80 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9)] ${
                      promisesFontSize === 'normal' ? 'text-lg sm:text-xl md:text-2xl' :
                      promisesFontSize === 'large' ? 'text-xl sm:text-2xl md:text-3xl' : 'text-2xl sm:text-3xl md:text-4xl'
                    }`}>
                      <span className="pointer-events-none absolute top-0 left-0 w-4 h-4 rounded-tl-xl border-t-[3px] border-l-[3px] border-[#B48342]" />
                      <span className="pointer-events-none absolute top-0 right-0 w-4 h-4 rounded-tr-xl border-t-[3px] border-r-[3px] border-[#B48342]" />
                      <span className="pointer-events-none absolute bottom-0 left-0 w-4 h-4 rounded-bl-xl border-b-[3px] border-l-[3px] border-[#B48342]" />
                      <span className="pointer-events-none absolute bottom-0 right-0 w-4 h-4 rounded-br-xl border-b-[3px] border-r-[3px] border-[#B48342]" />
                      "{excerpt.quote}"
                    </div>

                    <div className={`p-4 sm:p-5 rounded-xl bg-white/45 backdrop-blur-sm border border-white/80 ring-1 ring-[#E6DFD3]/60 font-serif text-stone-800 leading-relaxed ${
                      promisesFontSize === 'normal' ? 'text-base sm:text-lg md:text-xl' :
                      promisesFontSize === 'large' ? 'text-lg sm:text-xl md:text-2xl' : 'text-xl sm:text-2xl md:text-3xl'
                    }`}>
                      <strong className="text-[#6B4423]">Theological Meaning: </strong>
                      {excerpt.reflection}
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-2.5">
                      <button
                        onClick={() => {
                          const text = `Diary of St. Faustina (${excerpt.diaryNumber}): ${excerpt.title}\n"${excerpt.quote}"\n\nReflection: ${excerpt.reflection}`;
                          navigator.clipboard.writeText(text);
                          setCopiedExcerptId(excerpt.id);
                          setTimeout(() => setCopiedExcerptId(null), 2000);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white/65 hover:bg-white/90 backdrop-blur-sm text-stone-700 hover:text-stone-900 border border-white/85 ring-1 ring-stone-200/80 text-xs sm:text-sm font-serif flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Copy excerpt"
                      >
                        {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        <span>{isCopied ? 'Copied' : 'Copy'}</span>
                      </button>

                      <button
                        onClick={() => {
                          if (isReading) {
                            SacredReader.stop();
                            setReadingExcerptId(null);
                          } else {
                            setReadingExcerptId(excerpt.id);
                            SacredReader.speak(
                              `${excerpt.title}. From Diary number ${excerpt.diaryNumber}: ${excerpt.quote}`,
                              () => setReadingExcerptId(null)
                            );
                          }
                        }}
                        className={`p-2 rounded-lg text-xs sm:text-sm font-serif flex items-center transition-colors cursor-pointer ${
                          isReading
                            ? 'bg-[#6B4423] text-white animate-pulse'
                            : 'bg-white/65 hover:bg-white/90 backdrop-blur-sm text-[#6B4423] border border-white/85 ring-1 ring-[#DFD2C0]'
                        }`}
                        title="Listen with human voice"
                        aria-label="Listen with human voice"
                      >
                        <Volume2 className={`w-4 h-4 ${isReading ? 'text-white' : 'text-[#8B5A2B]'}`} />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* =========================================================================
          3. THREE O'CLOCK PRAYER VIEW
         ========================================================================= */}
      {activeDevotion === 'three-oclock' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {renderThreeOClockCard(true)}
        </div>
      )}

      {/* =========================================================================
          4. PROMISES OF MARY (THE SECRET OF THE ROSARY, ST. LOUIS DE MONTFORT)
         ========================================================================= */}
      {activeDevotion === 'marian-promises' && (
        <div className="relative isolate space-y-6 animate-in fade-in duration-300">
          
          {/* Header Banner - Frosted Glass */}
          <div className="relative isolate overflow-hidden rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-[#EAF3FC]/75 via-[#E2EEFA]/65 to-[#F5EFE5]/75 backdrop-blur-2xl backdrop-saturate-150 border border-white/85 ring-1 ring-[#BFD4EA]/80 shadow-[0_12px_36px_rgba(30,64,120,0.10),inset_0_1px_2px_rgba(255,255,255,0.95)] space-y-3 text-stone-900">
            <div className="pointer-events-none absolute -top-12 -left-12 w-64 h-64 rounded-full bg-sky-300/40 blur-3xl z-0" />
            <div className="pointer-events-none absolute -bottom-12 -right-12 w-64 h-64 rounded-full bg-amber-200/40 blur-3xl z-0" />

            <div className="relative z-10 flex items-center gap-2.5">
              <span className="p-2.5 rounded-xl bg-white/70 backdrop-blur-md text-blue-800 border border-white/85 ring-1 ring-blue-300/70 shadow-2xs">
                <Star className="w-5 h-5 text-blue-700" />
              </span>
              <div>
                <span className="text-[11px] font-cinzel font-bold tracking-widest text-blue-900 uppercase block">
                  The Secret of the Rosary • Saint Louis-Marie de Montfort
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900">
                  The 15 Promises of Mary to Devotees of the Holy Rosary
                </h3>
              </div>
            </div>
            <p className="relative z-10 text-xs sm:text-sm font-serif text-stone-700 leading-relaxed max-w-3xl">
              As revealed to Saint Dominic and Blessed Alan de la Roche, and compiled by Saint Louis-Marie Grignion de Montfort in his immortal spiritual classic <span className="italic text-blue-900 font-semibold">The Secret of the Rosary</span>.
            </p>
          </div>

          {/* 15 Promises Grid - Frosted Glass Container */}
          <div className="relative isolate overflow-hidden rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-[#ECF4FC]/75 via-[#E4EFFA]/65 to-[#F6EFE5]/75 backdrop-blur-2xl backdrop-saturate-150 border border-white/85 ring-1 ring-[#C5D8EC]/80 shadow-[0_12px_40px_rgba(30,64,120,0.11),inset_0_1px_2px_rgba(255,255,255,0.95)] space-y-6">
            {/* Ambient Marian Celestial Orbs behind Frosted Glass */}
            <div className="pointer-events-none absolute -top-16 -left-16 w-80 h-80 rounded-full bg-sky-300/40 blur-3xl z-0" />
            <div className="pointer-events-none absolute top-1/3 -right-16 w-96 h-96 rounded-full bg-blue-300/35 blur-3xl z-0" />
            <div className="pointer-events-none absolute -bottom-16 left-1/4 w-96 h-96 rounded-full bg-amber-200/35 blur-3xl z-0" />

            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/75 pb-4 gap-3">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-6 h-6 text-blue-800 shrink-0" />
                <div>
                  <h4 className="font-cinzel text-lg sm:text-xl font-bold text-stone-900">
                    Fifteen Assurances of the Mother of God
                  </h4>
                  <span className="text-xs sm:text-sm font-serif text-stone-700">
                    Catholic Tradition and Magisterium • The Secret of the Rosary
                  </span>
                </div>
              </div>

              {/* Standardized Font Size Stepper */}
              <div className="flex items-center gap-2.5 self-start sm:self-auto">
                <span className="font-medium text-stone-700 text-xs">Text Size:</span>
                <div className="flex items-center gap-1 bg-white/60 backdrop-blur-md p-1 rounded-md border border-white/85 ring-1 ring-[#C5D8EC]/70 shadow-2xs">
                  <button
                    onClick={decreasePromisesFontSize}
                    disabled={promisesFontSize === 'normal'}
                    className="w-7 h-7 flex items-center justify-center rounded-md text-xs font-bold text-stone-700 hover:text-stone-900 hover:bg-white/70 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-all"
                    title="Decrease font size"
                    aria-label="Decrease font size"
                  >
                    A-
                  </button>
                  <button
                    onClick={() => setPromisesFontSize('normal')}
                    className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-all cursor-pointer ${
                      promisesFontSize === 'normal'
                        ? 'bg-[#1B3564] text-white shadow-xs font-bold ring-1 ring-blue-400'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                    }`}
                    title="Default text size (100%)"
                  >
                    A
                  </button>
                  <button
                    onClick={() => setPromisesFontSize('large')}
                    className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-all cursor-pointer ${
                      promisesFontSize === 'large'
                        ? 'bg-[#1B3564] text-white shadow-xs font-bold ring-1 ring-blue-400'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                    }`}
                    title="Large text size (125%)"
                  >
                    A+
                  </button>
                  <button
                    onClick={() => setPromisesFontSize('xlarge')}
                    className={`px-2.5 py-1 text-xs rounded-md font-semibold transition-all cursor-pointer ${
                      promisesFontSize === 'xlarge'
                        ? 'bg-[#1B3564] text-white shadow-xs font-bold ring-1 ring-blue-400'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
                    }`}
                    title="Extra large text size (155%)"
                  >
                    A++
                  </button>
                  <button
                    onClick={increasePromisesFontSize}
                    disabled={promisesFontSize === 'xlarge'}
                    className="w-7 h-7 flex items-center justify-center rounded-md text-xs font-bold text-[#1B3564] hover:text-stone-900 hover:bg-white/70 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-all"
                    title="Increase font size"
                    aria-label="Increase font size"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5">
              {MARIAN_ROSARY_PROMISES.map((item) => {
                const isCopied = copiedMarianNum === item.number;
                return (
                  <div 
                    key={item.number} 
                    className="p-5 sm:p-6 rounded-xl bg-white/55 hover:bg-white/75 backdrop-blur-xl backdrop-saturate-150 border border-white/85 hover:border-white ring-1 ring-[#CFE0F2]/80 transition-all space-y-3.5 flex flex-col justify-between shadow-[0_8px_28px_rgba(30,64,120,0.08),inset_0_1px_2px_rgba(255,255,255,0.92)] hover:shadow-[0_12px_32px_rgba(30,64,120,0.14)]"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-cinzel text-sm sm:text-base font-bold text-blue-900 tracking-wide">
                          Promise #{item.number}
                        </span>
                        <span className="text-xs font-serif px-2.5 py-0.5 rounded-full bg-white/70 backdrop-blur-sm text-blue-900 border border-white/85 ring-1 ring-blue-200 font-medium">
                          De Montfort
                        </span>
                      </div>
                      <h5 className={`font-serif font-bold text-stone-900 ${
                        promisesFontSize === 'normal' ? 'text-base sm:text-lg' :
                        promisesFontSize === 'large' ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'
                      }`}>
                        {item.title}
                      </h5>
                      <div className={`relative font-serif italic text-stone-800 leading-relaxed bg-white/55 backdrop-blur-md p-3.5 sm:p-4 rounded-xl border border-white/80 shadow-[inset_0_1px_2px_rgba(255,255,255,0.9)] ${
                        promisesFontSize === 'normal' ? 'text-sm sm:text-base' :
                        promisesFontSize === 'large' ? 'text-base sm:text-lg md:text-xl' : 'text-lg sm:text-xl md:text-2xl'
                      }`}>
                        <span className="pointer-events-none absolute top-0 left-0 w-4 h-4 rounded-tl-xl border-t-[3px] border-l-[3px] border-blue-500" />
                        <span className="pointer-events-none absolute top-0 right-0 w-4 h-4 rounded-tr-xl border-t-[3px] border-r-[3px] border-blue-500" />
                        <span className="pointer-events-none absolute bottom-0 left-0 w-4 h-4 rounded-bl-xl border-b-[3px] border-l-[3px] border-blue-500" />
                        <span className="pointer-events-none absolute bottom-0 right-0 w-4 h-4 rounded-br-xl border-b-[3px] border-r-[3px] border-blue-500" />
                        "{item.promise}"
                      </div>
                      <p className={`font-serif text-stone-700 leading-relaxed pt-1 ${
                        promisesFontSize === 'normal' ? 'text-xs sm:text-sm' :
                        promisesFontSize === 'large' ? 'text-sm sm:text-base' : 'text-base sm:text-lg'
                      }`}>
                        {item.theologicalContext}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/75 flex items-center justify-end gap-2.5">
                      <button
                        onClick={() => {
                          const text = `The 15 Promises of Mary (Promise #${item.number}): ${item.title}\n"${item.promise}"\n— Saint Louis-Marie de Montfort, The Secret of the Rosary\nContext: ${item.theologicalContext}`;
                          navigator.clipboard.writeText(text);
                          setCopiedMarianNum(item.number);
                          setTimeout(() => setCopiedMarianNum(null), 2000);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-white/65 hover:bg-white/90 backdrop-blur-sm text-stone-700 hover:text-stone-900 border border-white/85 ring-1 ring-stone-200/80 text-xs sm:text-sm font-serif flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Copy promise"
                      >
                        {isCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        <span>{isCopied ? 'Copied' : 'Copy'}</span>
                      </button>

                      <button
                        onClick={() => {
                          SacredReader.speak(`The ${item.number} promise of Our Lady. ${item.title}. Our Lady promises: ${item.promise}. ${item.theologicalContext}`, undefined, 'female');
                        }}
                        className="p-2 rounded-lg bg-white/65 hover:bg-white/90 backdrop-blur-sm text-blue-800 border border-white/85 ring-1 ring-blue-200 transition-colors cursor-pointer"
                        title="Listen with human voice"
                        aria-label="Listen with human voice"
                      >
                        <Volume2 className="w-4 h-4 text-blue-700" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* =========================================================================
          5. THE ANGELUS (ANGELUS DOMINI) — MARIAN DEVOTION WITH APPROVED BELL TOLLING
         ========================================================================= */}
      {activeDevotion === 'angelus' && (
        <div className="relative isolate space-y-6 animate-in fade-in duration-300">
          
          {/* Header & Approved Bell Tolling Console - Marian Blue Frosted Glass */}
          <div className="relative isolate overflow-hidden rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-[#EAF3FC]/85 via-[#E2EEFA]/75 to-[#F5EFE5]/85 backdrop-blur-2xl backdrop-saturate-150 border border-white/85 ring-1 ring-[#BFD4EA]/85 shadow-[0_12px_36px_rgba(30,64,120,0.12),inset_0_1px_2px_rgba(255,255,255,0.95)] space-y-5 text-stone-900">
            <div className="pointer-events-none absolute -top-14 -left-14 w-72 h-72 rounded-full bg-sky-300/40 blur-3xl z-0" />
            <div className="pointer-events-none absolute -bottom-14 -right-14 w-72 h-72 rounded-full bg-amber-200/40 blur-3xl z-0" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-blue-200/70 pb-5">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-b from-[#1E3A8A] via-[#172B69] to-[#0F1E4D] border border-amber-300/70 flex items-center justify-center shrink-0 shadow-md">
                  <Bell className={`w-5 h-5 text-amber-300 ${angelusBellStatus ? 'animate-bounce' : ''}`} />
                </div>
                <div>
                  <span className="text-[11px] font-cinzel font-bold tracking-widest text-blue-900 uppercase block">
                    Traditional 6:00 AM, 12:00 Noon &amp; 6:00 PM Marian Devotion
                  </span>
                  <h3 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-bold text-stone-900">
                    The Angelus (Angelus Domini)
                  </h3>
                </div>
              </div>

              {/* Approved Bell Tolling & Prayer Controls */}
              <div className="flex flex-wrap items-center gap-2 self-start md:self-auto shrink-0">
                <button
                  onClick={() => {
                    bellSynth.playAngelusToll((status) => setAngelusBellStatus(status));
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#172B69] bg-gradient-to-b from-[#1E3A8A] via-[#172B69] to-[#0F1E4D] hover:from-[#2547A8] hover:to-[#15296B] text-amber-100 border border-amber-300/80 text-xs sm:text-sm font-cinzel font-bold flex items-center gap-2 shadow-md transition-all cursor-pointer"
                  title="Toll the traditional 3×3 Angelus strokes and 12-stroke Sanctus Peal"
                >
                  <Bell className="w-4 h-4 text-amber-300" />
                  <span>Toll Angelus Bell (3×3 + Peal)</span>
                </button>

                <button
                  onClick={() => {
                    bellSynth.playNoonChimes();
                    setAngelusBellStatus('Ringing Westminster Noon Sanctuary Chimes...');
                    setTimeout(() => setAngelusBellStatus(''), 5500);
                  }}
                  className="px-3.5 py-2.5 rounded-xl bg-white/80 hover:bg-white text-[#172B69] border border-blue-300/80 text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                  title="Play the approved Westminster Noon Sanctuary Chimes"
                >
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Noon Chimes</span>
                </button>

                <button
                  onClick={() => {
                    if (isReadingAngelus) {
                      SacredReader.stop();
                      setIsReadingAngelus(false);
                    } else {
                      setIsReadingAngelus(true);
                      const fullSpeech = `The Angelus. ... The Angel of the Lord declared unto Mary. And she conceived of the Holy Spirit. ... Hail Mary, full of grace, the Lord is with thee. Blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen. ... Behold the handmaid of the Lord. Be it done unto me according to thy word. ... Hail Mary, full of grace, the Lord is with thee. Blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen. ... And the Word was made flesh. And dwelt among us. ... Hail Mary, full of grace, the Lord is with thee. Blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen. ... Pray for us, O holy Mother of God. That we may be made worthy of the promises of Christ. ... Let us pray: Pour forth, we beseech Thee, O Lord, Thy grace into our hearts; that we, to whom the Incarnation of Christ, Thy Son, was made known by the message of an Angel, may by His Passion and Cross be brought to the glory of His Resurrection. Through the same Christ our Lord. Amen.`;
                      SacredReader.speak(fullSpeech, () => setIsReadingAngelus(false), 'female', 0.84);
                    }
                  }}
                  className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs ${
                    isReadingAngelus
                      ? 'bg-[#172B69] text-amber-100 border border-amber-300 animate-pulse'
                      : 'bg-white/80 hover:bg-white text-[#172B69] border border-blue-300/80'
                  }`}
                >
                  {isReadingAngelus ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-blue-800" />}
                  <span>{isReadingAngelus ? 'Stop Audio' : 'Listen to Prayer'}</span>
                </button>

                <button
                  onClick={() => setAngelusShowLatin(!angelusShowLatin)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-cinzel font-bold border transition-all cursor-pointer ${
                    angelusShowLatin
                      ? 'bg-[#172B69] text-amber-200 border-amber-300'
                      : 'bg-white/80 hover:bg-white text-blue-950 border-blue-300/80'
                  }`}
                >
                  {angelusShowLatin ? 'English Only' : 'Latin / English'}
                </button>

                <button
                  onClick={() => {
                    const text = `THE ANGELUS (ANGELUS DOMINI)\n\nV. The Angel of the Lord declared unto Mary.\nR. And she conceived of the Holy Spirit.\n(Hail Mary...)\n\nV. Behold the handmaid of the Lord.\nR. Be it done unto me according to thy word.\n(Hail Mary...)\n\nV. And the Word was made flesh.\nR. And dwelt among us.\n(Hail Mary...)\n\nV. Pray for us, O holy Mother of God.\nR. That we may be made worthy of the promises of Christ.\n\nLet us pray:\nPour forth, we beseech Thee, O Lord, Thy grace into our hearts; that we, to whom the Incarnation of Christ, Thy Son, was made known by the message of an Angel, may by His Passion and Cross be brought to the glory of His Resurrection. Through the same Christ our Lord. Amen.`;
                    navigator.clipboard.writeText(text);
                    setCopiedAngelus(true);
                    setTimeout(() => setCopiedAngelus(false), 2000);
                  }}
                  className="p-2.5 rounded-xl bg-white/80 hover:bg-white text-blue-900 border border-blue-300/80 transition-colors cursor-pointer"
                  title="Copy The Angelus Prayer"
                >
                  {copiedAngelus ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Active Bell Tolling Status Banner */}
            {angelusBellStatus && (
              <div className="relative z-10 px-4 py-3 rounded-xl bg-gradient-to-r from-[#172B69] via-[#1E3A8A] to-[#172B69] text-amber-100 border border-amber-300/80 shadow-md flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Bell className="w-4 h-4 text-amber-300 animate-bounce shrink-0" />
                  <span className="font-cinzel text-xs sm:text-sm font-bold tracking-wide text-amber-200">
                    {angelusBellStatus}
                  </span>
                </div>
                <span className="text-[11px] font-serif italic text-blue-200 hidden sm:inline">
                  Cathedral Bronze E4 &amp; Bourdon A3
                </span>
              </div>
            )}

            <p className="relative z-10 text-xs sm:text-sm font-serif text-stone-700 leading-relaxed">
              For centuries, at the sound of the church bell at dawn (6:00 AM), noon (12:00 PM), and dusk (6:00 PM), the faithful pause their labor to venerate the Mystery of the Incarnation—the moment the Eternal Word took flesh in the womb of the Blessed Virgin Mary. The traditional Angelus bell rings <strong>three strokes</strong> before each of the three Hail Marys, followed by a <strong>twelve-stroke swinging peal</strong> during the concluding Collect.
            </p>

            {/* Three Versicles & Hail Marys + Concluding Collect */}
            <div className="relative z-10 space-y-4">
              
              {/* First Mystery: The Annunciation (3 Bell Strokes) */}
              <div className="p-5 sm:p-6 rounded-xl bg-white/75 backdrop-blur-md border border-white/90 ring-1 ring-blue-200/80 shadow-xs space-y-3">
                <div className="flex items-center justify-between gap-2 border-b border-blue-100 pb-2.5">
                  <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#172B69]">
                    I. The Angelic Salutation • First 3 Bell Strokes
                  </span>
                  <button
                    onClick={() => {
                      bellSynth.playChurchBell(329.63, 4.0, 0.6);
                      setTimeout(() => bellSynth.playChurchBell(329.63, 4.0, 0.6), 1100);
                      setTimeout(() => bellSynth.playChurchBell(329.63, 4.0, 0.6), 2200);
                      setAngelusBellStatus("1st Ave: 'The Angel of the Lord declared' (3 Strokes)");
                      setTimeout(() => setAngelusBellStatus(''), 4500);
                    }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#172B69] border border-blue-200 text-xs font-cinzel font-bold cursor-pointer transition-colors"
                  >
                    <Bell className="w-3 h-3 text-blue-800" />
                    <span>Toll 3 Strokes</span>
                  </button>
                </div>

                <div className="space-y-1.5 font-serif text-base sm:text-lg md:text-xl text-stone-900">
                  <p><span className="font-cinzel font-bold text-[#172B69] mr-1.5">V.</span> The Angel of the Lord declared unto Mary.</p>
                  <p className="font-semibold"><span className="font-cinzel font-bold text-[#172B69] mr-1.5">R.</span> And she conceived of the Holy Spirit.</p>
                  {angelusShowLatin && (
                    <div className="pt-1 text-sm sm:text-base italic text-blue-950/85 space-y-0.5">
                      <p><span className="font-cinzel font-bold not-italic">V.</span> Angelus Domini nuntiavit Mariae.</p>
                      <p><span className="font-cinzel font-bold not-italic">R.</span> Et concepit de Spiritu Sancto.</p>
                    </div>
                  )}
                </div>

                <div className="p-3.5 rounded-lg bg-[#F5F9FD] border border-blue-200/60 font-serif text-sm sm:text-base text-stone-800 leading-relaxed">
                  <strong className="font-cinzel text-xs uppercase tracking-wider text-blue-900 block mb-1">Hail Mary (Ave Maria):</strong>
                  Hail Mary, full of grace, the Lord is with thee. Blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.
                </div>
              </div>

              {/* Second Mystery: Mary's Fiat (3 Bell Strokes) */}
              <div className="p-5 sm:p-6 rounded-xl bg-white/75 backdrop-blur-md border border-white/90 ring-1 ring-blue-200/80 shadow-xs space-y-3">
                <div className="flex items-center justify-between gap-2 border-b border-blue-100 pb-2.5">
                  <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#172B69]">
                    II. The Fiat of Our Lady • Second 3 Bell Strokes
                  </span>
                  <button
                    onClick={() => {
                      bellSynth.playChurchBell(329.63, 4.0, 0.6);
                      setTimeout(() => bellSynth.playChurchBell(329.63, 4.0, 0.6), 1100);
                      setTimeout(() => bellSynth.playChurchBell(329.63, 4.0, 0.6), 2200);
                      setAngelusBellStatus("2nd Ave: 'Behold the handmaid of the Lord' (3 Strokes)");
                      setTimeout(() => setAngelusBellStatus(''), 4500);
                    }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#172B69] border border-blue-200 text-xs font-cinzel font-bold cursor-pointer transition-colors"
                  >
                    <Bell className="w-3 h-3 text-blue-800" />
                    <span>Toll 3 Strokes</span>
                  </button>
                </div>

                <div className="space-y-1.5 font-serif text-base sm:text-lg md:text-xl text-stone-900">
                  <p><span className="font-cinzel font-bold text-[#172B69] mr-1.5">V.</span> Behold the handmaid of the Lord.</p>
                  <p className="font-semibold"><span className="font-cinzel font-bold text-[#172B69] mr-1.5">R.</span> Be it done unto me according to thy word.</p>
                  {angelusShowLatin && (
                    <div className="pt-1 text-sm sm:text-base italic text-blue-950/85 space-y-0.5">
                      <p><span className="font-cinzel font-bold not-italic">V.</span> Ecce ancilla Domini.</p>
                      <p><span className="font-cinzel font-bold not-italic">R.</span> Fiat mihi secundum verbum tuum.</p>
                    </div>
                  )}
                </div>

                <div className="p-3.5 rounded-lg bg-[#F5F9FD] border border-blue-200/60 font-serif text-sm sm:text-base text-stone-800 leading-relaxed">
                  <strong className="font-cinzel text-xs uppercase tracking-wider text-blue-900 block mb-1">Hail Mary (Ave Maria):</strong>
                  Hail Mary, full of grace, the Lord is with thee. Blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.
                </div>
              </div>

              {/* Third Mystery: The Word Made Flesh (3 Bell Strokes) */}
              <div className="p-5 sm:p-6 rounded-xl bg-white/75 backdrop-blur-md border border-white/90 ring-1 ring-blue-200/80 shadow-xs space-y-3">
                <div className="flex items-center justify-between gap-2 border-b border-blue-100 pb-2.5">
                  <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#172B69]">
                    III. The Incarnation of the Word • Third 3 Bell Strokes
                  </span>
                  <button
                    onClick={() => {
                      bellSynth.playChurchBell(329.63, 4.0, 0.6);
                      setTimeout(() => bellSynth.playChurchBell(329.63, 4.0, 0.6), 1100);
                      setTimeout(() => bellSynth.playChurchBell(329.63, 4.0, 0.6), 2200);
                      setAngelusBellStatus("3rd Ave: 'And the Word was made flesh' (3 Strokes)");
                      setTimeout(() => setAngelusBellStatus(''), 4500);
                    }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#172B69] border border-blue-200 text-xs font-cinzel font-bold cursor-pointer transition-colors"
                  >
                    <Bell className="w-3 h-3 text-blue-800" />
                    <span>Toll 3 Strokes</span>
                  </button>
                </div>

                <div className="space-y-1.5 font-serif text-base sm:text-lg md:text-xl text-stone-900">
                  <p>
                    <span className="font-cinzel font-bold text-[#172B69] mr-1.5">V.</span> And the Word was made flesh.{' '}
                    <span className="text-xs sm:text-sm italic text-blue-800 font-medium">(Here devoutly genuflect or bow)</span>
                  </p>
                  <p className="font-semibold"><span className="font-cinzel font-bold text-[#172B69] mr-1.5">R.</span> And dwelt among us.</p>
                  {angelusShowLatin && (
                    <div className="pt-1 text-sm sm:text-base italic text-blue-950/85 space-y-0.5">
                      <p><span className="font-cinzel font-bold not-italic">V.</span> Et Verbum caro factum est.</p>
                      <p><span className="font-cinzel font-bold not-italic">R.</span> Et habitavit in nobis.</p>
                    </div>
                  )}
                </div>

                <div className="p-3.5 rounded-lg bg-[#F5F9FD] border border-blue-200/60 font-serif text-sm sm:text-base text-stone-800 leading-relaxed">
                  <strong className="font-cinzel text-xs uppercase tracking-wider text-blue-900 block mb-1">Hail Mary (Ave Maria):</strong>
                  Hail Mary, full of grace, the Lord is with thee. Blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.
                </div>
              </div>

              {/* Concluding Versicle & Collect Prayer (12-Stroke Angelus Peal) */}
              <div className="p-5 sm:p-6 rounded-xl bg-gradient-to-br from-[#172B69] via-[#1B337A] to-[#0F1E4D] text-amber-50 border border-amber-300/70 shadow-lg space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-400/30 pb-3">
                  <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-amber-300">
                    Concluding Versicle &amp; Collect • 12-Stroke Sanctus Peal
                  </span>
                  <button
                    onClick={() => {
                      bellSynth.playGrandCathedralPeal((status) => setAngelusBellStatus(status));
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-200 border border-amber-300/50 text-xs font-cinzel font-bold cursor-pointer transition-colors self-start sm:self-auto"
                  >
                    <Bell className="w-3.5 h-3.5 text-amber-300" />
                    <span>Ring Concluding Cathedral Peal</span>
                  </button>
                </div>

                <div className="space-y-1.5 font-serif text-base sm:text-lg md:text-xl text-white">
                  <p><span className="font-cinzel font-bold text-amber-300 mr-1.5">V.</span> Pray for us, O holy Mother of God.</p>
                  <p className="font-semibold"><span className="font-cinzel font-bold text-amber-300 mr-1.5">R.</span> That we may be made worthy of the promises of Christ.</p>
                  {angelusShowLatin && (
                    <div className="pt-1 text-sm sm:text-base italic text-blue-200 space-y-0.5">
                      <p><span className="font-cinzel font-bold not-italic text-amber-300">V.</span> Ora pro nobis, sancta Dei Genetrix.</p>
                      <p><span className="font-cinzel font-bold not-italic text-amber-300">R.</span> Ut digni efficiamur promissionibus Christi.</p>
                    </div>
                  )}
                </div>

                <div className="p-4 sm:p-5 rounded-xl bg-black/25 border border-amber-300/35 space-y-2 font-serif text-base sm:text-lg md:text-xl leading-relaxed text-amber-50">
                  <span className="font-cinzel text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-300 block">
                    Let us pray (Oremus):
                  </span>
                  <p>
                    Pour forth, we beseech Thee, O Lord, Thy grace into our hearts; that we, to whom the Incarnation of Christ, Thy Son, was made known by the message of an Angel, may by His Passion and Cross be brought to the glory of His Resurrection. Through the same Christ our Lord. <strong className="text-amber-300">Amen.</strong>
                  </p>
                  {angelusShowLatin && (
                    <p className="pt-2 border-t border-white/15 text-sm sm:text-base italic text-blue-200">
                      Gratiam tuam, quaesumus, Domine, mentibus nostris infunde; ut qui, Angelo nuntiante, Christi Filii tui Incarnationem cognovimus, per Passionem eius et Crucem, ad Resurrectionis gloriam perducamur. Per eundem Christum Dominum nostrum. Amen.
                    </p>
                  )}
                </div>

                <div className="text-xs sm:text-sm font-serif text-blue-100/90 pt-1">
                  <strong className="text-amber-300 font-cinzel">Concluding Doxology: </strong>
                  Recite <em>Glory Be to the Father, and to the Son, and to the Holy Spirit...</em> three times in thanksgiving for the Most Holy Trinity.
                </div>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
};

