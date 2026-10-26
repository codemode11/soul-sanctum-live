import React, { useState, useEffect } from 'react';
import { 
  BookMarked, 
  Calendar, 
  Check, 
  CheckCircle2, 
  Clock, 
  Flame, 
  Plus, 
  Sparkles, 
  Trash2, 
  X,
  RotateCcw,
  Award,
  ArrowRight
} from 'lucide-react';
import { Novena, UserNovenaProgress } from '../types';
import { 
  NOVENAS_DATABASE, 
  getDailyDefaultUserNovenas, 
  getNovenaScheduleInfo 
} from '../data/novenas';
import { bellSynth } from '../utils/audioSynth';

interface NovenaTrackerViewProps {
  currentDateStr?: string;
}

const getTodayIso = () => {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

export const NovenaTrackerView: React.FC<NovenaTrackerViewProps> = ({
  currentDateStr
}) => {
  const effectiveDateStr = currentDateStr || getTodayIso();

  // Initialize active novenas dynamically from the current date
  const [userNovenas, setUserNovenas] = useState<UserNovenaProgress[]>(() =>
    getDailyDefaultUserNovenas(effectiveDateStr)
  );

  const [selectedNovenaForModal, setSelectedNovenaForModal] = useState<Novena | null>(null);
  const [intentionInput, setIntentionInput] = useState('');
  const [viewingNovenaId, setViewingNovenaId] = useState<string>(() => {
    const defaults = getDailyDefaultUserNovenas(effectiveDateStr);
    const firstOngoing = defaults.find(u => !u.isCompleted);
    return firstOngoing ? firstOngoing.novenaId : defaults[0]?.novenaId || NOVENAS_DATABASE[0].id;
  });
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customPatron, setCustomPatron] = useState('');
  const [customPrayer, setCustomPrayer] = useState('');
  const [feastMonthFilter, setFeastMonthFilter] = useState<'All' | 'October' | 'November' | 'December' | 'Anytime'>('All');
  const [showCompletedDayReview, setShowCompletedDayReview] = useState(false);
  const [reviewDayNumber, setReviewDayNumber] = useState<number>(9);

  // Sync active liturgical novenas when the calendar date changes
  useEffect(() => {
    const dailyDefaults = getDailyDefaultUserNovenas(effectiveDateStr);
    setUserNovenas(prev => {
      // Update any liturgical novenas that are in progress and preserve user's custom or completed ones
      const updated = prev.map(existing => {
        const matchingDefault = dailyDefaults.find(d => d.novenaId === existing.novenaId);
        if (matchingDefault && !existing.isCompleted) {
          return {
            ...existing,
            currentDay: matchingDefault.currentDay,
            completedDays: matchingDefault.completedDays
          };
        }
        return existing;
      });

      // Add any newly started liturgical novena for today that wasn't tracked yet
      dailyDefaults.forEach(def => {
        if (!updated.some(u => u.novenaId === def.novenaId)) {
          updated.unshift(def);
        }
      });

      return updated;
    });
  }, [effectiveDateStr]);

  // Handle checking off a day
  const handleCheckDay = (novenaId: string, dayNumber: number) => {
    setUserNovenas(prev => prev.map(item => {
      if (item.novenaId !== novenaId) return item;

      const alreadyDone = item.completedDays.includes(dayNumber);
      let newDone: number[];

      if (alreadyDone) {
        newDone = item.completedDays.filter(d => d !== dayNumber);
      } else {
        newDone = [...item.completedDays, dayNumber].sort((a, b) => a - b);
        bellSynth.playChurchBell(587, 2.5); // Joyful D chime
      }

      const nextDay = Math.min(9, Math.max(...newDone, 0) + 1);
      const isComplete = newDone.length === 9;

      return {
        ...item,
        completedDays: newDone,
        currentDay: isComplete ? 9 : nextDay,
        isCompleted: isComplete
      };
    }));
  };

  // Restart a completed novena from Day 1
  const handleRestartNovena = (novenaId: string) => {
    setUserNovenas(prev => prev.map(item => {
      if (item.novenaId !== novenaId) return item;
      return {
        ...item,
        startDate: effectiveDateStr,
        currentDay: 1,
        completedDays: [],
        isCompleted: false
      };
    }));
    setViewingNovenaId(novenaId);
    setShowCompletedDayReview(false);
    bellSynth.playBeadChime();
  };

  // Replace a completed novena with the next upcoming liturgical feast novena
  const handleReplaceCompletedWithUpcoming = (completedNovenaId: string, specificNextNovena?: Novena) => {
    const activeIds = new Set(userNovenas.map(u => u.novenaId));
    const nextCandidate =
      specificNextNovena ||
      NOVENAS_DATABASE.find(n => {
        if (activeIds.has(n.id)) return false;
        const info = getNovenaScheduleInfo(n, effectiveDateStr);
        return info.status === 'in-progress' || info.status === 'starting-soon';
      }) ||
      NOVENAS_DATABASE.find(n => !activeIds.has(n.id)) ||
      NOVENAS_DATABASE[0];

    const info = getNovenaScheduleInfo(nextCandidate, effectiveDateStr);
    const initialDay = info.status === 'in-progress' && info.activeDay ? info.activeDay : 1;
    const initialCompleted =
      info.status === 'in-progress' && info.activeDay
        ? Array.from({ length: Math.max(0, info.activeDay - 1) }, (_, idx) => idx + 1)
        : [];

    const replacementProgress: UserNovenaProgress = {
      novenaId: nextCandidate.id,
      startDate: effectiveDateStr,
      currentDay: initialDay,
      completedDays: initialCompleted,
      personalIntention: nextCandidate.intentionsSuggestion,
      isCompleted: false
    };

    setUserNovenas(prev =>
      prev.map(item => (item.novenaId === completedNovenaId ? replacementProgress : item))
    );
    setViewingNovenaId(nextCandidate.id);
    setShowCompletedDayReview(false);
    bellSynth.playBeadChime();
  };

  // Start novena from library
  const handleStartNovena = (novena: Novena) => {
    const existing = userNovenas.find(u => u.novenaId === novena.id);
    if (existing) {
      setViewingNovenaId(novena.id);
      setSelectedNovenaForModal(null);
      return;
    }

    const info = getNovenaScheduleInfo(novena, effectiveDateStr);
    const initialDay = info.status === 'in-progress' && info.activeDay ? info.activeDay : 1;
    const initialCompleted =
      info.status === 'in-progress' && info.activeDay
        ? Array.from({ length: Math.max(0, info.activeDay - 1) }, (_, idx) => idx + 1)
        : [];

    const newProgress: UserNovenaProgress = {
      novenaId: novena.id,
      startDate: effectiveDateStr,
      currentDay: initialDay,
      completedDays: initialCompleted,
      personalIntention: intentionInput.trim() || novena.intentionsSuggestion,
      isCompleted: false
    };

    setUserNovenas([newProgress, ...userNovenas]);
    setViewingNovenaId(novena.id);
    setSelectedNovenaForModal(null);
    setIntentionInput('');
    bellSynth.playBeadChime();
  };

  // Remove novena
  const handleRemoveNovena = (novenaId: string) => {
    const remaining = userNovenas.filter(n => n.novenaId !== novenaId);
    setUserNovenas(remaining);
    if (viewingNovenaId === novenaId) {
      setViewingNovenaId(remaining[0]?.novenaId || NOVENAS_DATABASE[0].id);
    }
  };

  // Find active novena object
  const currentNovenaData = NOVENAS_DATABASE.find(n => n.id === viewingNovenaId) || NOVENAS_DATABASE[0];
  const currentUserProgress = userNovenas.find(u => u.novenaId === currentNovenaData.id);
  const isCurrentNovenaCompleted = Boolean(
    currentUserProgress && (currentUserProgress.isCompleted || currentUserProgress.completedDays.length === 9)
  );
  const activeDayNumber = isCurrentNovenaCompleted
    ? reviewDayNumber
    : currentUserProgress?.currentDay || 1;
  const currentDayInfo =
    currentNovenaData.days.find(d => d.dayNumber === activeDayNumber) || currentNovenaData.days[0];

  // Upcoming November and December novenas for quick replacement suggestions
  const upcomingFeastSuggestions = NOVENAS_DATABASE.filter(n => {
    const info = getNovenaScheduleInfo(n, effectiveDateStr);
    return (
      !userNovenas.some(u => u.novenaId === n.id) &&
      (info.feastMonth === 'November' || info.feastMonth === 'December')
    );
  }).slice(0, 3);

  // Filtered library novenas
  const filteredLibraryNovenas = NOVENAS_DATABASE.filter(novena => {
    if (feastMonthFilter === 'All') return true;
    const info = getNovenaScheduleInfo(novena, effectiveDateStr);
    return info.feastMonth === feastMonthFilter;
  });

  const ongoingCount = userNovenas.filter(u => !u.isCompleted && u.completedDays.length < 9).length;
  const completedCount = userNovenas.filter(u => u.isCompleted || u.completedDays.length === 9).length;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      
      {/* Novena Tracker Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 rounded-xl p-6 sm:p-8 text-amber-50 shadow-md border border-amber-900/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <Flame className="w-5 h-5 text-amber-400" />
            <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-amber-300">
              Sacred Nine-Day Devotions • Updated Daily ({effectiveDateStr})
            </span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide">
            Catholic Novena Tracker
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 font-serif-sacred max-w-xl">
            In imitation of the Apostles and the Blessed Virgin Mary who persevered for nine days in the Upper Room awaiting the Holy Spirit, track your ongoing nine-day devotions and prepare for upcoming feasts in October, November, and December.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setCustomModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-800/80 hover:bg-amber-700 text-amber-100 font-semibold text-xs border border-amber-600 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Custom Novena</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          SECTION 1: ONGOING and COMPLETED NOVENAS (MY TRACKED PRAYERS)
         ========================================================================= */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-cinzel text-lg sm:text-xl font-bold text-stone-900 flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-amber-800" />
            <span>
              My Tracked Novenas ({ongoingCount} Active{completedCount > 0 ? ` • ${completedCount} Completed` : ''})
            </span>
          </h3>
          <span className="text-xs text-stone-500 font-medium">
            Click any day bead to record prayer • Completed novenas switch to Thanksgiving template
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {userNovenas.map(progress => {
            const novena = NOVENAS_DATABASE.find(n => n.id === progress.novenaId);
            if (!novena) return null;
            const isViewing = viewingNovenaId === novena.id;
            const isCompleted = progress.isCompleted || progress.completedDays.length === 9;
            const progressPercent = Math.round((progress.completedDays.length / 9) * 100);
            const scheduleInfo = getNovenaScheduleInfo(novena, effectiveDateStr);

            // ===================================================================
            // COMPLETED NOVENA CARD TEMPLATE ("Deo Gratias • Completed")
            // ===================================================================
            if (isCompleted) {
              return (
                <div
                  key={progress.novenaId}
                  onClick={() => setViewingNovenaId(novena.id)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                    isViewing
                      ? 'bg-gradient-to-br from-emerald-950 via-stone-900 to-amber-950 text-amber-50 border-amber-400 shadow-lg ring-2 ring-amber-500/40'
                      : 'bg-gradient-to-br from-stone-900 via-emerald-950/90 to-stone-900 text-amber-50 border-emerald-700/50 hover:border-amber-400/60 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-bold uppercase tracking-wider font-cinzel flex items-center gap-1">
                          <Award className="w-3 h-3 text-amber-300" />
                          Deo Gratias • Novena Completed
                        </span>
                        <span className="text-[10px] text-amber-300/80 font-cinzel">
                          9/9 Days Fulfilled
                        </span>
                      </div>
                      <h4 className="font-cinzel text-base sm:text-lg font-bold text-white pt-0.5">
                        {novena.title}
                      </h4>
                      <p className="text-xs text-stone-300 font-serif-sacred italic line-clamp-1">
                        Fulfilled Intention: "{progress.personalIntention}"
                      </p>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveNovena(novena.id);
                      }}
                      className="p-1.5 rounded-md text-stone-400 hover:text-red-300 hover:bg-white/10 transition-colors cursor-pointer"
                      title="Remove completed novena"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* All 9 Golden Completed Beads */}
                  <div className="mt-4 pt-3 border-t border-white/10 space-y-3">
                    <div className="grid grid-cols-9 gap-1.5">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(d => (
                        <button
                          key={d}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCheckDay(novena.id, d);
                          }}
                          className="h-7 rounded-lg flex items-center justify-center text-xs font-bold font-cinzel bg-emerald-600/90 hover:bg-emerald-500 text-white border border-amber-300/40 shadow-2xs transition-all cursor-pointer"
                          title={`Day ${d} Completed (Click to toggle)`}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </button>
                      ))}
                    </div>

                    {/* Completed Template Action Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReplaceCompletedWithUpcoming(novena.id);
                        }}
                        className="flex-1 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-cinzel font-bold text-[11px] flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Replace with Next Feast Novena</span>
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRestartNovena(novena.id);
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-amber-200 border border-white/15 font-cinzel font-semibold text-[11px] flex items-center gap-1 transition-colors cursor-pointer"
                        title="Pray this 9-day novena again from Day 1"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Pray Again</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            // ===================================================================
            // ACTIVE / IN-PROGRESS NOVENA CARD TEMPLATE
            // ===================================================================
            return (
              <div 
                key={progress.novenaId}
                onClick={() => setViewingNovenaId(novena.id)}
                className={`p-5 rounded-xl border transition-all cursor-pointer relative ${
                  isViewing 
                    ? 'bg-white border-amber-800/50 shadow-md ring-2 ring-amber-700/20' 
                    : 'bg-stone-50/80 hover:bg-white border-stone-200'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 font-cinzel">
                        {novena.patronOrSubject}
                      </span>
                      {scheduleInfo.status === 'in-progress' && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-bold font-cinzel">
                          Liturgical Feast Active
                        </span>
                      )}
                    </div>
                    <h4 className="font-cinzel text-base font-bold text-stone-900">
                      {novena.title}
                    </h4>
                    <p className="text-xs text-stone-600 font-serif-sacred italic line-clamp-1">
                      Intention: "{progress.personalIntention}"
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveNovena(novena.id);
                    }}
                    className="p-1 rounded-md text-stone-400 hover:text-red-700 hover:bg-stone-100 transition-colors cursor-pointer"
                    title="Remove from active tracker"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* 9-Day Bead Bar */}
                <div className="mt-4 pt-3 border-t border-stone-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-amber-950 font-cinzel">
                      Day {progress.currentDay} of 9 • {novena.associatedFeast}
                    </span>
                    <span className="text-[11px] text-stone-500 font-medium">
                      {progress.completedDays.length}/9 completed ({progressPercent}%)
                    </span>
                  </div>

                  <div className="grid grid-cols-9 gap-1.5">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(d => {
                      const isDone = progress.completedDays.includes(d);
                      const isCurrent = progress.currentDay === d && !isDone;

                      return (
                        <button
                          key={d}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCheckDay(novena.id, d);
                          }}
                          className={`h-8 rounded-lg flex items-center justify-center text-xs font-bold font-cinzel transition-all cursor-pointer ${
                            isDone 
                              ? 'bg-amber-800 text-amber-100 shadow-xs' 
                              : isCurrent 
                                ? 'bg-amber-200 text-amber-950 ring-2 ring-amber-600 scale-105' 
                                : 'bg-stone-200 text-stone-600 hover:bg-stone-300'
                          }`}
                          title={`Day ${d}: Click to mark as prayed`}
                        >
                          {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : d}
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* =========================================================================
          SECTION 2: PRAYER READER DECK (SWITCHES TEMPLATE WHEN NOVENA IS COMPLETED)
         ========================================================================= */}
      {isCurrentNovenaCompleted ? (
        <div className="bg-gradient-to-br from-[#13221B] via-stone-900 to-[#24170B] text-amber-50 rounded-xl p-6 sm:p-8 shadow-xl border border-amber-500/40 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/15 pb-5">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider font-cinzel flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-300" />
                  Deo Gratias • Nine-Day Novena Completed
                </span>
                <span className="text-xs text-amber-200/80 font-serif-sacred">
                  Started {currentUserProgress?.startDate} • All 9 Days Prayed
                </span>
              </div>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-white">
                {currentNovenaData.title} — Act of Thanksgiving
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 font-serif-sacred italic">
                {currentNovenaData.associatedFeast} • {currentNovenaData.patronOrSubject}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => handleRestartNovena(currentNovenaData.id)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 border border-white/20 text-xs font-cinzel font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Pray Novena Again (Day 1)</span>
              </button>
              <button
                onClick={() => setShowCompletedDayReview(prev => !prev)}
                className="px-4 py-2 rounded-xl bg-amber-900/60 hover:bg-amber-800 text-amber-100 border border-amber-500/40 text-xs font-cinzel font-bold transition-colors cursor-pointer"
              >
                {showCompletedDayReview ? 'Hide Daily Prayers' : 'Review 9-Day Prayers'}
              </button>
            </div>
          </div>

          {/* Thanksgiving Prayer Box */}
          <div className="p-6 rounded-xl bg-black/35 border-l-4 border-amber-400 space-y-3">
            <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-amber-300 block">
              Prayer of Thanksgiving Upon Completing a Novena
            </span>
            <p className="font-serif-sacred text-lg sm:text-xl md:text-2xl text-amber-50 leading-relaxed italic">
              "Almighty and Merciful God, I give You humble thanks for the grace of persevering through these nine days of prayer in honor of {currentNovenaData.patronOrSubject}. With filial confidence I place my petition—'{currentUserProgress?.personalIntention}'—into Your pierced hands. Grant what is most pleasing to Your divine majesty and most salutary for my immortal soul. Glory be to the Father, and to the Son, and to the Holy Spirit. Amen."
            </p>
          </div>

          {/* Optional Review of the 9 Days */}
          {showCompletedDayReview && (
            <div className="p-5 rounded-xl bg-black/40 border border-white/15 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-amber-300">
                  Review Completed Day Meditations:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(d => (
                    <button
                      key={d}
                      onClick={() => setReviewDayNumber(d)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-cinzel font-bold cursor-pointer transition-all ${
                        reviewDayNumber === d
                          ? 'bg-amber-500 text-stone-950'
                          : 'bg-white/10 text-stone-300 hover:bg-white/20'
                      }`}
                    >
                      Day {d}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2 border-t border-white/10 pt-3">
                <h4 className="font-cinzel text-base font-bold text-amber-200">
                  Day {currentDayInfo.dayNumber}: {currentDayInfo.theme}
                </h4>
                {currentDayInfo.scriptureVerse && (
                  <p className="text-sm font-serif-sacred italic text-amber-100/90">
                    "{currentDayInfo.scriptureVerse}"
                  </p>
                )}
                <p className="text-base sm:text-lg font-serif-sacred text-stone-200 leading-relaxed">
                  {currentDayInfo.prayerText}
                </p>
              </div>
            </div>
          )}

          {/* Next Upcoming Feasts in November and December to Transition Into */}
          {upcomingFeastSuggestions.length > 0 && (
            <div className="space-y-3 pt-2 border-t border-white/15">
              <div className="flex items-center justify-between">
                <span className="font-cinzel text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Continue Your Prayer Journey: Replace with an Upcoming Feast Novena</span>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {upcomingFeastSuggestions.map(nextNov => {
                  const nextInfo = getNovenaScheduleInfo(nextNov, effectiveDateStr);
                  return (
                    <div
                      key={nextNov.id}
                      className="p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 flex flex-col justify-between gap-3 transition-all"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] font-cinzel font-bold uppercase tracking-wider text-amber-300 block">
                          {nextNov.associatedFeast}
                        </span>
                        <h5 className="font-cinzel text-sm font-bold text-white">
                          {nextNov.title}
                        </h5>
                        <p className="text-xs text-stone-300 font-serif-sacred">
                          Starts: {nextInfo.startDateFormatted}
                        </p>
                      </div>

                      <button
                        onClick={() => handleReplaceCompletedWithUpcoming(currentNovenaData.id, nextNov)}
                        className="w-full py-2 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-cinzel font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>Begin This Novena</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm border border-stone-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 font-cinzel">
                Today's Prayer Focus • Day {currentDayInfo.dayNumber} of 9
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900">
                {currentNovenaData.title}
              </h3>
              <p className="text-xs sm:text-sm text-amber-800 font-serif-sacred italic">
                Theme: {currentDayInfo.theme} • {currentNovenaData.associatedFeast}
              </p>
            </div>

            <button
              onClick={() => handleCheckDay(currentNovenaData.id, currentDayInfo.dayNumber)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                currentUserProgress?.completedDays.includes(currentDayInfo.dayNumber)
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-amber-900 text-amber-100 hover:bg-amber-800 shadow-md'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>
                {currentUserProgress?.completedDays.includes(currentDayInfo.dayNumber)
                  ? `Day ${currentDayInfo.dayNumber} Prayed ✓`
                  : `Mark Day ${currentDayInfo.dayNumber} as Prayed`}
              </span>
            </button>
          </div>

          {/* Scripture Quote */}
          {currentDayInfo.scriptureVerse && (
            <div className="p-4 rounded-xl bg-[#FAF8F5] border-l-4 border-amber-800 text-stone-900 font-serif-sacred text-lg sm:text-xl md:text-2xl italic leading-relaxed">
              "{currentDayInfo.scriptureVerse}"
            </div>
          )}

          {/* Prayer Text */}
          <div className="font-serif-sacred text-stone-900 text-xl sm:text-2xl md:text-3xl leading-relaxed whitespace-pre-line py-3">
            {currentDayInfo.prayerText}
          </div>

          {/* Closing Prayer */}
          <div className="p-6 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-2.5">
            <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-amber-950">
              Conclusive Novena Prayer
            </span>
            <p className="font-serif-sacred text-stone-900 text-lg sm:text-xl leading-relaxed whitespace-pre-line">
              {currentNovenaData.closingPrayer}
            </p>
          </div>

          {/* User's Intention Banner */}
          {currentUserProgress && (
            <div className="p-4 rounded-xl bg-stone-100 text-xs sm:text-sm text-stone-700 font-serif-sacred flex items-center justify-between">
              <div>
                <span className="font-bold font-cinzel text-stone-900 mr-1">Your Stated Intention:</span>
                <span>"{currentUserProgress.personalIntention}"</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* =========================================================================
          SECTION 3: UPCOMING FEASTS IN NOVEMBER and DECEMBER and NOVENA TREASURY
         ========================================================================= */}
      <div className="bg-[#FAF7F2] rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-xs space-y-6">
        <div className="space-y-5 border-b border-stone-200/80 pb-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-800" />
              <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-amber-900">
                Liturgical Novena Calendar • October, November and December Feasts
              </span>
            </div>
            <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Upcoming Feasts and Novenas
            </h3>
            <p className="text-sm sm:text-base text-stone-600 font-serif-sacred leading-relaxed">
              Prepare for the great Solemnities and Feasts of the liturgical season—including All Saints and All Souls, St. Martin de Porres, Mother Cabrini, Christ the King, St. Cecilia, the Miraculous Medal, St. Andrew, St. Francis Xavier, the Immaculate Conception, Our Lady of Guadalupe, St. Lucy, Simbang Gabi (Christmas), and the Holy Family.
            </p>
          </div>

          {/* Month Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {(['All', 'October', 'November', 'December', 'Anytime'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFeastMonthFilter(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-cinzel font-bold tracking-wide transition-all cursor-pointer ${
                  feastMonthFilter === tab
                    ? 'bg-amber-900 text-amber-50 shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200/90 hover:border-amber-800/40 hover:bg-amber-50/40'
                }`}
              >
                {tab === 'All'
                  ? 'All Novenas'
                  : tab === 'Anytime'
                  ? 'Year-Round'
                  : `${tab} Feasts`}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredLibraryNovenas.map(novena => {
            const userEntry = userNovenas.find(u => u.novenaId === novena.id);
            const isUserActive = Boolean(userEntry && !userEntry.isCompleted && userEntry.completedDays.length < 9);
            const isUserCompleted = Boolean(userEntry && (userEntry.isCompleted || userEntry.completedDays.length === 9));
            const scheduleInfo = getNovenaScheduleInfo(novena, effectiveDateStr);

            return (
              <div 
                key={novena.id} 
                className="bg-white p-6 rounded-xl border border-stone-200/90 shadow-2xs flex flex-col justify-between gap-4 hover:border-amber-800/40 hover:shadow-md transition-all"
              >
                <div className="space-y-3">
                  {/* Top Meta Bar: Feast Date and Schedule Status */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-stone-100">
                    <span className="px-2.5 py-1 rounded-md bg-amber-50 text-amber-950 text-[11px] font-bold uppercase tracking-wider font-cinzel border border-amber-200/80">
                      {novena.associatedFeast}
                    </span>

                    {scheduleInfo.status === 'in-progress' ? (
                      <span className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-300 text-[11px] font-bold font-cinzel">
                        Active Now • Day {scheduleInfo.activeDay} of 9
                      </span>
                    ) : scheduleInfo.status === 'starting-soon' ? (
                      <span className="text-[11px] font-bold text-amber-800 font-cinzel flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        Starts {scheduleInfo.startDateFormatted} ({scheduleInfo.daysUntilStart === 1 ? 'Tomorrow' : `in ${scheduleInfo.daysUntilStart} days`})
                      </span>
                    ) : scheduleInfo.status === 'anytime' ? (
                      <span className="text-[11px] font-semibold text-stone-500 font-cinzel">
                        Year-Round Devotion
                      </span>
                    ) : (
                      <span className="text-[11px] font-semibold text-stone-600 font-cinzel">
                        Starts {scheduleInfo.startDateFormatted}
                      </span>
                    )}
                  </div>

                  {/* Title and Patron Subtitle */}
                  <div className="space-y-1">
                    <h4 className="font-cinzel text-lg sm:text-xl font-bold text-stone-900 leading-snug">
                      {novena.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-amber-900/90 font-serif-sacred italic">
                      {novena.patronOrSubject}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-stone-600 font-serif-sacred leading-relaxed">
                    {novena.description}
                  </p>
                </div>

                {/* Card Action Footer */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
                  <span className="text-[11px] font-cinzel font-semibold uppercase tracking-wider text-stone-400">
                    9-Day Sacred Novena
                  </span>

                  {isUserActive ? (
                    <button
                      onClick={() => setViewingNovenaId(novena.id)}
                      className="px-4 py-2 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-950 text-xs font-cinzel font-bold cursor-pointer transition-colors shrink-0"
                    >
                      Praying Now (View)
                    </button>
                  ) : isUserCompleted ? (
                    <button
                      onClick={() => handleRestartNovena(novena.id)}
                      className="px-4 py-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-cinzel font-bold cursor-pointer transition-colors shrink-0"
                    >
                      Completed ✓ (Pray Again)
                    </button>
                  ) : (
                    <button
                      onClick={() => setSelectedNovenaForModal(novena)}
                      className="px-4 py-2 rounded-lg bg-amber-900 hover:bg-amber-800 text-amber-50 text-xs font-cinzel font-bold transition-colors cursor-pointer shrink-0 shadow-2xs"
                    >
                      Start This Novena
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal: Start Novena with Personal Intention */}
      {selectedNovenaForModal && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl border border-amber-900/20">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900 font-cinzel">
                  Begin Sacred Novena • {selectedNovenaForModal.associatedFeast}
                </span>
                <h3 className="font-cinzel text-xl font-bold text-stone-900 mt-0.5">
                  {selectedNovenaForModal.title}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedNovenaForModal(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 font-serif-sacred leading-relaxed">
              {selectedNovenaForModal.description}
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-800 font-cinzel">
                Your Personal Intention:
              </label>
              <textarea
                value={intentionInput}
                onChange={(e) => setIntentionInput(e.target.value)}
                placeholder={selectedNovenaForModal.intentionsSuggestion}
                className="w-full h-24 p-3 rounded-xl bg-stone-50 border border-stone-300 text-xs sm:text-sm font-serif-sacred focus:outline-none focus:border-amber-800 resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedNovenaForModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-stone-600 hover:bg-stone-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleStartNovena(selectedNovenaForModal)}
                className="px-5 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-800 text-amber-100 font-semibold text-xs transition-colors cursor-pointer"
              >
                Start 9-Day Journey
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Custom Novena */}
      {customModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl border border-stone-300">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900 font-cinzel">
                  Custom Devotion
                </span>
                <h3 className="font-cinzel text-xl font-bold text-stone-900">
                  Create Custom Novena
                </h3>
              </div>
              <button 
                onClick={() => setCustomModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-stone-800 font-cinzel">Novena Title</label>
                <input
                  type="text"
                  placeholder="e.g. Novena to St. Michael for Spiritual Protection"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-stone-50 border border-stone-300 text-xs focus:outline-none focus:border-amber-800 mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-800 font-cinzel">Patron Saint / Mystery</label>
                <input
                  type="text"
                  placeholder="e.g. Saint Michael the Archangel"
                  value={customPatron}
                  onChange={(e) => setCustomPatron(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-stone-50 border border-stone-300 text-xs focus:outline-none focus:border-amber-800 mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-800 font-cinzel">Daily Prayer Text</label>
                <textarea
                  placeholder="Paste or write the prayer to be recited each day for 9 days..."
                  value={customPrayer}
                  onChange={(e) => setCustomPrayer(e.target.value)}
                  className="w-full h-24 p-3 rounded-lg bg-stone-50 border border-stone-300 text-xs font-serif-sacred focus:outline-none focus:border-amber-800 resize-none mt-1"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setCustomModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-stone-600 hover:bg-stone-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!customTitle.trim()) return;
                  const customId = `custom-${Date.now()}`;
                  const newCustomNovena: Novena = {
                    id: customId,
                    title: customTitle,
                    subtitle: 'Custom Devotion',
                    patronOrSubject: customPatron || 'Heavenly Patron',
                    associatedFeast: 'Personal Intention',
                    traditionalStartDate: 'Anytime',
                    traditionalFeastDate: 'Anytime',
                    category: 'Special Needs',
                    description: 'Personal custom 9-day novena prayer.',
                    intentionsSuggestion: 'My personal petition',
                    closingPrayer: 'Our Father... Hail Mary... Glory Be...',
                    days: Array.from({ length: 9 }).map((_, i) => ({
                      dayNumber: i + 1,
                      theme: `Day ${i + 1} Supplication`,
                      prayerText: customPrayer || 'Lord hear my prayer.'
                    }))
                  };
                  NOVENAS_DATABASE.push(newCustomNovena);
                  handleStartNovena(newCustomNovena);
                  setCustomModalOpen(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-800 text-amber-100 font-semibold text-xs cursor-pointer"
              >
                Save and Track
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
