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
  Star
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

export const RosaryAndChapletView: React.FC = () => {
  const [activeDevotion, setActiveDevotion] = useState<'divine-mercy' | 'faustina' | 'rosary' | 'marian-promises'>('divine-mercy');
  const [copiedPromiseNum, setCopiedPromiseNum] = useState<number | null>(null);
  const [copiedMarianNum, setCopiedMarianNum] = useState<number | null>(null);
  const [copiedExcerptId, setCopiedExcerptId] = useState<string | null>(null);
  const [readingExcerptId, setReadingExcerptId] = useState<string | null>(null);
  
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

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Devotion Switcher Tabs: Exact user-specified order:
          1. Chaplet
          2. The Diary and the 14 Promises
          3. The Holy Rosary
          4. Promises of Mary (The Secret of the Rosary, de Montfort) */}
      <div className="flex flex-wrap rounded-lg bg-stone-900/90 p-1.5 max-w-2xl mx-auto shadow-xl border border-amber-500/30 backdrop-blur-md gap-1.5">
        {/* 1. Chaplet */}
        <button
          onClick={() => {
            setActiveDevotion('divine-mercy');
            handleReset();
          }}
          className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-md text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center ${
            activeDevotion === 'divine-mercy'
              ? 'bg-gradient-to-r from-red-700 via-red-800 to-red-950 text-white shadow-lg border border-red-400/50 scale-[1.02]'
              : 'text-stone-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <span>Chaplet</span>
        </button>

        {/* 2. The Diary and the 14 Promises */}
        <button
          onClick={() => {
            setActiveDevotion('faustina');
            SacredReader.stop();
          }}
          className={`flex-1 min-w-[160px] py-2.5 px-3 rounded-md text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center ${
            activeDevotion === 'faustina'
              ? 'bg-gradient-to-r from-purple-800 via-purple-900 to-stone-950 text-amber-200 shadow-lg border border-purple-400/50 scale-[1.02]'
              : 'text-stone-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <span>The Diary and 14 Promises</span>
        </button>

        {/* 3. The Holy Rosary */}
        <button
          onClick={() => {
            setActiveDevotion('rosary');
            handleReset();
          }}
          className={`flex-1 min-w-[130px] py-2.5 px-3 rounded-md text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center ${
            activeDevotion === 'rosary'
              ? 'bg-gradient-to-r from-amber-700 via-amber-800 to-amber-950 text-amber-50 shadow-lg border border-amber-400/50 scale-[1.02]'
              : 'text-stone-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <span>The Holy Rosary</span>
        </button>

        {/* 4. Promises of Mary (The Secret of the Rosary, de Montfort) */}
        <button
          onClick={() => {
            setActiveDevotion('marian-promises');
            SacredReader.stop();
          }}
          className={`flex-1 min-w-[150px] py-2.5 px-3 rounded-md text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center ${
            activeDevotion === 'marian-promises'
              ? 'bg-gradient-to-r from-blue-800 via-indigo-900 to-stone-950 text-amber-200 shadow-lg border border-blue-400/50 scale-[1.02]'
              : 'text-stone-300 hover:text-white hover:bg-white/5'
          }`}
        >
          <span>Promises of Mary</span>
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
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-white font-cinzel font-bold text-xs sm:text-sm shadow-lg transition-all cursor-pointer border border-amber-400/60"
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
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-700 hover:bg-amber-800 text-white font-cinzel font-bold text-xs sm:text-sm shadow-lg transition-all cursor-pointer border border-amber-400/60 animate-pulse"
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
                  className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
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
                <div className="p-4 rounded-xl bg-[#FAF8F5] border-l-4 border-amber-700 space-y-2">
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
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
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
                    className="text-xs py-2 px-2.5 rounded-xl bg-stone-100 border border-stone-300 font-medium text-stone-700"
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
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium transition-colors cursor-pointer ${
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
                    className="p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
                    title="Restart Rosary from Beginning"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handlePrevBead}
                    disabled={rosaryStepIndex === 0}
                    className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 disabled:opacity-40 text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <button
                    onClick={handleNextBead}
                    className="flex items-center gap-1 px-6 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-800 text-amber-100 font-semibold text-xs shadow-md transition-all cursor-pointer"
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
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 animate-ping" />
              <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-red-300">
                {DIVINE_MERCY_OPENING_PRAYERS.hourOfMercyTitle}
              </span>
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
                      className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-red-700 via-red-800 to-red-900 hover:from-red-600 hover:to-red-800 text-white font-cinzel font-bold text-xs sm:text-sm shadow-lg transition-all cursor-pointer border border-red-400/60"
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
                      className="flex items-center gap-2 px-5 py-3 rounded-xl bg-red-800 hover:bg-red-900 text-white font-cinzel font-bold text-xs sm:text-sm shadow-lg transition-all cursor-pointer border border-red-400/60 animate-pulse"
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
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-cinzel font-bold text-xs sm:text-sm shadow-lg transition-all cursor-pointer border ${
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
                    className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
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
                    className="text-xs py-2 px-2.5 rounded-xl bg-stone-100 border border-stone-300 font-medium text-stone-700"
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
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-medium transition-colors cursor-pointer ${
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
                    className="p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-600 transition-colors cursor-pointer"
                    title="Restart Chaplet"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handlePrevBead}
                    disabled={mercyStepIndex === 0}
                    className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 disabled:opacity-40 text-xs font-semibold cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    onClick={handleNextBead}
                    className="flex items-center gap-1 px-6 py-2.5 rounded-xl bg-red-900 hover:bg-red-800 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
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
        <div className="space-y-6 animate-fadeIn">
          {/* Header Banner */}
          <div className="rounded-xl p-6 sm:p-8 bg-gradient-to-br from-purple-950 via-[#18111f] to-stone-950 border border-purple-500/35 shadow-2xl text-stone-100 space-y-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-purple-500/20 text-purple-300 border border-purple-400/30">
                <Star className="w-4 h-4" />
              </span>
              <span className="font-cinzel text-xs font-bold text-amber-300 tracking-wider uppercase">
                Saint Maria Faustina Kowalska • Vilnius and Kraków
              </span>
            </div>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide">
              The Diary and The 14 Promises of Jesus
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 font-serif-sacred max-w-2xl leading-relaxed">
              "My Heart overflows with great mercy for souls... The graces of My mercy are drawn by means of one vessel only, and that is—trust" (Diary 1731). Discover the 14 extraordinary promises given by Christ to souls who recite the Chaplet of Divine Mercy, along with cornerstone passages from the Diary.
            </p>
          </div>

          {/* 14 PROMISES OF JESUS */}
          <div className="rounded-xl p-6 sm:p-8 bg-stone-900/90 border border-amber-500/25 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-amber-500/20 pb-4 gap-3">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-6 h-6 text-amber-400 shrink-0" />
                <div>
                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-amber-200">
                    The 14 Promises of Jesus for Praying the Chaplet
                  </h3>
                  <span className="text-xs sm:text-sm font-serif text-stone-300">
                    Approved by the Holy See • From the Diary of St. Maria Faustina Kowalska
                  </span>
                </div>
              </div>

              {/* Font Size Stepper */}
              <div className="flex items-center gap-1 bg-black/60 px-3 py-1.5 rounded-xl border border-amber-500/30 self-start sm:self-auto shadow-sm">
                <span className="text-xs text-amber-300 font-cinzel mr-1">Text Size:</span>
                <button
                  onClick={decreasePromisesFontSize}
                  disabled={promisesFontSize === 'normal'}
                  className="px-2 py-0.5 rounded-lg text-xs font-bold text-amber-200 hover:text-white hover:bg-white/10 disabled:opacity-30 cursor-pointer transition-all"
                  title="Smaller text"
                >
                  A-
                </button>
                <button
                  onClick={() => setPromisesFontSize('normal')}
                  className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-all cursor-pointer ${
                    promisesFontSize === 'normal' ? 'bg-amber-600 text-white font-bold shadow-xs' : 'text-stone-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Normal
                </button>
                <button
                  onClick={() => setPromisesFontSize('large')}
                  className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-all cursor-pointer ${
                    promisesFontSize === 'large' ? 'bg-amber-600 text-white font-bold shadow-xs' : 'text-stone-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  Large
                </button>
                <button
                  onClick={() => setPromisesFontSize('xlarge')}
                  className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-all cursor-pointer ${
                    promisesFontSize === 'xlarge' ? 'bg-amber-600 text-white font-bold shadow-xs' : 'text-stone-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  X-Large
                </button>
                <button
                  onClick={increasePromisesFontSize}
                  disabled={promisesFontSize === 'xlarge'}
                  className="px-2 py-0.5 rounded-lg text-xs font-bold text-amber-300 hover:text-white hover:bg-white/10 disabled:opacity-30 cursor-pointer transition-all"
                  title="Larger text"
                >
                  A+
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {DIVINE_MERCY_PROMISES.map((item) => {
                const isCopied = copiedPromiseNum === item.number;
                return (
                  <div 
                    key={item.number} 
                    className="p-5 sm:p-6 rounded-xl bg-black/50 border border-amber-500/25 hover:border-amber-400/50 transition-all space-y-3.5 flex flex-col justify-between shadow-md"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-cinzel text-sm sm:text-base font-bold text-amber-300 tracking-wide">
                          Promise #{item.number}
                        </span>
                        <span className="text-xs sm:text-sm font-serif px-3 py-1 rounded-full bg-amber-500/20 text-amber-200 border border-amber-500/40 font-medium">
                          {item.diaryCitation}
                        </span>
                      </div>
                      <h4 className={`font-serif font-bold text-white tracking-wide ${
                        promisesFontSize === 'normal' ? 'text-base sm:text-lg' :
                        promisesFontSize === 'large' ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'
                      }`}>
                        {item.title}
                      </h4>
                      <p className={`font-serif italic text-amber-50 leading-relaxed bg-white/10 p-3.5 sm:p-4 rounded-xl border-l-4 border-amber-400 shadow-inner ${
                        promisesFontSize === 'normal' ? 'text-sm sm:text-base' :
                        promisesFontSize === 'large' ? 'text-base sm:text-lg md:text-xl' : 'text-lg sm:text-xl md:text-2xl'
                      }`}>
                        "{item.promise}"
                      </p>
                      <p className={`font-serif text-stone-200 leading-relaxed pt-1 ${
                        promisesFontSize === 'normal' ? 'text-xs sm:text-sm' :
                        promisesFontSize === 'large' ? 'text-sm sm:text-base' : 'text-base sm:text-lg'
                      }`}>
                        {item.theologicalContext}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-end gap-2.5">
                      <button
                        onClick={() => {
                          const text = `Promise of Jesus #${item.number}: ${item.title} (${item.diaryCitation})\n"${item.promise}"\nContext: ${item.theologicalContext}`;
                          navigator.clipboard.writeText(text);
                          setCopiedPromiseNum(item.number);
                          setTimeout(() => setCopiedPromiseNum(null), 2000);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white text-xs sm:text-sm font-serif flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Copy promise"
                      >
                        {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        <span>{isCopied ? 'Copied' : 'Copy'}</span>
                      </button>

                      <button
                        onClick={() => {
                          SacredReader.speak(`${item.title}. Jesus says: ${item.promise}`);
                        }}
                        className="p-2 rounded-xl bg-amber-500/25 hover:bg-amber-500/40 text-amber-200 transition-colors cursor-pointer"
                        title="Listen with human voice"
                        aria-label="Listen with human voice"
                      >
                        <Volume2 className="w-4 h-4 text-amber-300" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* KEY EXCERPTS FROM THE DIARY OF ST. FAUSTINA */}
          <div className="rounded-xl p-6 sm:p-8 bg-stone-900/90 border border-purple-500/25 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-purple-500/20 pb-4">
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-5 h-5 text-purple-300" />
                <h3 className="font-cinzel text-lg sm:text-xl font-bold text-purple-200">
                  Cornerstone Excerpts from The Diary of St. Faustina
                </h3>
              </div>
              <span className="text-[11px] font-serif text-stone-400">
                Divine Mercy in My Soul
              </span>
            </div>

            <div className="space-y-4">
              {FAUSTINA_DIARY_EXCERPTS.map((excerpt) => {
                const isCopied = copiedExcerptId === excerpt.id;
                const isReading = readingExcerptId === excerpt.id;

                return (
                  <article 
                    key={excerpt.id}
                    className="p-5 rounded-xl bg-black/40 border border-purple-500/20 hover:border-purple-400/35 transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-cinzel text-xs font-bold text-purple-300">
                          Diary #{excerpt.diaryNumber}
                        </span>
                        <span className="text-stone-400">•</span>
                        <h4 className="font-serif text-sm font-bold text-white">
                          {excerpt.title}
                        </h4>
                      </div>
                      <span className="text-[10px] font-serif px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-200 border border-purple-500/30 self-start sm:self-auto">
                        Spoken by {excerpt.spokenBy}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-serif italic text-purple-100/95 leading-relaxed bg-white/5 p-4 rounded-xl border-l-2 border-purple-400">
                      "{excerpt.quote}"
                    </p>

                    <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/20 text-xs font-serif text-stone-300">
                      <strong className="text-purple-300">Theological Meaning: </strong>
                      {excerpt.reflection}
                    </div>

                    <div className="pt-2 flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          const text = `Diary of St. Faustina (${excerpt.diaryNumber}): ${excerpt.title}\n"${excerpt.quote}"\n\nReflection: ${excerpt.reflection}`;
                          navigator.clipboard.writeText(text);
                          setCopiedExcerptId(excerpt.id);
                          setTimeout(() => setCopiedExcerptId(null), 2000);
                        }}
                        className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white text-xs font-serif flex items-center gap-1.5 transition-colors cursor-pointer"
                        title="Copy excerpt"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
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
                        className={`p-2 rounded-xl text-xs font-serif flex items-center transition-colors cursor-pointer ${
                          isReading
                            ? 'bg-purple-700 text-white animate-pulse'
                            : 'bg-purple-500/20 hover:bg-purple-500/35 text-purple-200 border border-purple-400/30'
                        }`}
                        title="Listen with human voice"
                        aria-label="Listen with human voice"
                      >
                        <Volume2 className="w-4 h-4 text-purple-300" />
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
          4. PROMISES OF MARY (THE SECRET OF THE ROSARY, ST. LOUIS DE MONTFORT)
         ========================================================================= */}
      {activeDevotion === 'marian-promises' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Header Banner */}
          <div className="rounded-xl p-6 sm:p-8 bg-gradient-to-r from-blue-950 via-indigo-950 to-stone-900 border border-blue-500/35 shadow-2xl space-y-3 text-white">
            <div className="flex items-center gap-2.5">
              <span className="p-2.5 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-400/30">
                <Star className="w-5 h-5 text-blue-300" />
              </span>
              <div>
                <span className="text-[11px] font-cinzel font-bold tracking-widest text-blue-300 uppercase block">
                  The Secret of the Rosary • Saint Louis-Marie de Montfort
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-amber-100">
                  The 15 Promises of Mary to Devotees of the Holy Rosary
                </h3>
              </div>
            </div>
            <p className="text-xs sm:text-sm font-serif text-stone-200 leading-relaxed max-w-3xl">
              As revealed to Saint Dominic and Blessed Alan de la Roche, and compiled by Saint Louis-Marie Grignion de Montfort in his immortal spiritual classic <span className="italic text-amber-200 font-medium">The Secret of the Rosary</span>.
            </p>
          </div>

          {/* 15 Promises Grid */}
          <div className="rounded-xl p-6 sm:p-8 bg-stone-900/90 border border-blue-500/25 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-blue-500/20 pb-4">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-blue-400" />
                <h4 className="font-cinzel text-base sm:text-lg font-bold text-blue-200">
                  Fifteen Assurances of the Mother of God
                </h4>
              </div>
              <span className="text-[11px] font-serif text-stone-400">
                Catholic Tradition and Magisterium
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {MARIAN_ROSARY_PROMISES.map((item) => {
                const isCopied = copiedMarianNum === item.number;
                return (
                  <div 
                    key={item.number} 
                    className="p-5 rounded-xl bg-black/45 border border-blue-500/20 hover:border-blue-400/40 transition-all space-y-3.5 flex flex-col justify-between shadow-md"
                  >
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="font-cinzel text-sm font-bold text-blue-300">
                          Promise #{item.number}
                        </span>
                        <span className="text-xs font-serif px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-200 border border-blue-500/30">
                          De Montfort
                        </span>
                      </div>
                      <h5 className="font-serif text-base sm:text-lg font-bold text-amber-100">
                        {item.title}
                      </h5>
                      <p className="text-sm sm:text-base font-serif italic text-white/95 leading-relaxed bg-white/5 p-3.5 rounded-xl border-l-2 border-blue-400">
                        "{item.promise}"
                      </p>
                      <p className="text-xs sm:text-sm font-serif text-stone-200 leading-normal pt-1.5">
                        {item.theologicalContext}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          const text = `The 15 Promises of Mary (Promise #${item.number}): ${item.title}\n"${item.promise}"\n— Saint Louis-Marie de Montfort, The Secret of the Rosary\nContext: ${item.theologicalContext}`;
                          navigator.clipboard.writeText(text);
                          setCopiedMarianNum(item.number);
                          setTimeout(() => setCopiedMarianNum(null), 2000);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 hover:text-white text-[11px] font-serif flex items-center gap-1 transition-colors cursor-pointer"
                        title="Copy promise"
                      >
                        {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{isCopied ? 'Copied' : 'Copy'}</span>
                      </button>

                      <button
                        onClick={() => {
                          SacredReader.speak(`The ${item.number} promise of Our Lady. ${item.title}. Our Lady promises: ${item.promise}. ${item.theologicalContext}`, undefined, 'female');
                        }}
                        className="p-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/35 text-blue-200 transition-colors cursor-pointer"
                        title="Listen with human voice"
                        aria-label="Listen with human voice"
                      >
                        <Volume2 className="w-3.5 h-3.5 text-blue-300" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

