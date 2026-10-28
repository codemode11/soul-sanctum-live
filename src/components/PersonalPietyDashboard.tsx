import React, { useState, useEffect, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  Sparkles, 
  Plus, 
  Trash2, 
  RotateCcw, 
  MapPin, 
  Award,
  Check,
  ChevronLeft,
  ChevronRight,
  Target,
  Flame,
  BookOpen,
  ShieldCheck
} from 'lucide-react';
import { NotebookWithBallpenIcon } from './SanctumIcons';

export type ChecklistCategory =
  | 'daily-essential'
  | 'marian-mercy'
  | 'sacraments-precepts'
  | 'november-indulgences'
  | 'penance-charity'
  | 'custom';

interface ChecklistItem {
  id: string;
  category: ChecklistCategory;
  title: string;
  subtitle: string;
  recommendedTime?: string;
  indulgenceNote?: string;
  completed: boolean;
  isCustom?: boolean;
}

interface PrayerHabitPlan {
  id: string;
  prayerName: string;
  plannedStartDate: string; // YYYY-MM-DD
  preferredTime: string;
  intentionOrGoal: string;
  targetDays: number;
  createdAt: string;
}

interface PersonalPietyDashboardProps {
  currentDateStr: string;
  onOpenCebuParishes?: () => void;
  onOpenAngelus?: () => void;
  onOpenAdoration?: () => void;
}

const CATEGORY_META: Record<ChecklistCategory, { label: string; badge: string; description: string }> = {
  'daily-essential': {
    label: 'I. Daily Essential Prayers',
    badge: 'Morning • Noon • Night',
    description: 'Foundational daily prayers sanctifying the hours of the day from waking until rest.'
  },
  'marian-mercy': {
    label: 'II. Marian & Divine Mercy Devotions',
    badge: 'Rosary • 3 O’Clock • Chaplet',
    description: 'Devotions to the Blessed Virgin Mary and the Ocean of Divine Mercy.'
  },
  'sacraments-precepts': {
    label: 'III. Sacraments, Adoration & Precepts of the Church',
    badge: 'Mass • Adoration • Confession',
    description: 'Participation in the Eucharistic Sacrifice, Eucharistic Adoration, and the Precepts of the Church.'
  },
  'november-indulgences': {
    label: 'IV. Special Indulgences for November (Holy Souls in Purgatory)',
    badge: 'Month of the Holy Souls',
    description: 'Plenary and partial indulgences granted by the Apostolic Penitentiary applicable to the Faithful Departed.'
  },
  'penance-charity': {
    label: 'V. Penance, Works of Mercy & Suffrages',
    badge: 'Charity • Mortification',
    description: 'Corporal and spiritual works of mercy, Friday penance, and suffrages for souls.'
  },
  'custom': {
    label: 'VI. Personal & Custom Devotions',
    badge: 'Custom Rule of Life',
    description: 'Personal prayers, novenas, and spiritual exercises tailored to your state in life.'
  }
};

const PRESET_HABIT_PRAYERS = [
  'The Most Holy Rosary (5 Decades)',
  'Morning Offering to the Sacred Heart',
  'The Angelus (6 AM, 12 PM, 6 PM)',
  'Daily Mass Scripture Readings & Gospel Reflection',
  'The 3 O’Clock Prayer & Chaplet of Divine Mercy',
  'Mental Prayer / Lectio Divina (15 Minutes)',
  'Visit to the Blessed Sacrament (Adoration)',
  'Eternal Rest (Requiem Aeternam) for the Holy Souls',
  'Nightly Ignatian Examen & Act of Contrition'
];

export const PersonalPietyDashboard: React.FC<PersonalPietyDashboardProps> = ({
  currentDateStr,
  onOpenCebuParishes
}) => {
  const [activeSectionTab, setActiveSectionTab] = useState<'all' | ChecklistCategory>('all');
  const [customItemTitle, setCustomItemTitle] = useState('');
  const [customItemSubtitle, setCustomItemSubtitle] = useState('');
  const [customItemTime, setCustomItemTime] = useState('');
  const [isAddingCustom, setIsAddingCustom] = useState(false);

  // Storage key based on date so daily checklist persists per date
  const storageKey = `sanctum_piety_checklist_v2_${currentDateStr}`;

  const defaultItems: ChecklistItem[] = useMemo(() => [
    // I. Daily Essentials
    {
      id: 'morning-offering',
      category: 'daily-essential',
      title: 'Morning Offering to the Sacred Heart of Jesus',
      subtitle: 'Consecrate all prayers, works, joys, and sufferings of the day through the Immaculate Heart of Mary.',
      recommendedTime: 'Upon Waking',
      completed: false
    },
    {
      id: 'angelus-morning',
      category: 'daily-essential',
      title: 'The Angelus — Morning (6:00 AM)',
      subtitle: 'Venerate the Mystery of the Incarnation upon rising.',
      recommendedTime: '6:00 AM',
      indulgenceNote: 'Partial Indulgence',
      completed: false
    },
    {
      id: 'angelus-noon',
      category: 'daily-essential',
      title: 'The Angelus — Noon (12:00 PM)',
      subtitle: 'Pause at midday to commemorate the Word made Flesh.',
      recommendedTime: '12:00 PM',
      indulgenceNote: 'Partial Indulgence',
      completed: false
    },
    {
      id: 'angelus-evening',
      category: 'daily-essential',
      title: 'The Angelus — Evening (6:00 PM)',
      subtitle: 'Evening salutation to Our Lady at the close of day.',
      recommendedTime: '6:00 PM',
      indulgenceNote: 'Partial Indulgence',
      completed: false
    },
    {
      id: 'mass-readings',
      category: 'daily-essential',
      title: 'Daily Mass Scripture Readings & Gospel Reflection',
      subtitle: 'Read the First Reading, Responsorial Psalm, Gospel, and Patristic Commentary for at least 15–30 minutes.',
      recommendedTime: 'Morning / Anytime',
      indulgenceNote: 'Plenary Indulgence (30 mins Sacred Scripture)',
      completed: false
    },
    {
      id: 'mental-prayer',
      category: 'daily-essential',
      title: 'Mental Prayer / Lectio Divina (15–30 Minutes)',
      subtitle: 'Silent contemplative prayer and conversation with Our Lord.',
      recommendedTime: 'Quiet Hour',
      indulgenceNote: 'Partial Indulgence',
      completed: false
    },
    {
      id: 'daily-examen',
      category: 'daily-essential',
      title: 'Nightly Ignatian Examen & Act of Contrition',
      subtitle: 'Give thanks for God’s mercies, examine conscience, and pray a fervent Act of Contrition before sleep.',
      recommendedTime: 'Before Bedtime',
      indulgenceNote: 'Partial Indulgence',
      completed: false
    },

    // II. Marian & Divine Mercy
    {
      id: 'holy-rosary',
      category: 'marian-mercy',
      title: 'The Most Holy Rosary of the Blessed Virgin Mary (5 Decades)',
      subtitle: 'Recite five decades devoutly while meditating on the Sacred Mysteries.',
      recommendedTime: 'Daily',
      indulgenceNote: 'Plenary Indulgence (in Church, Oratory, or Family)',
      completed: false
    },
    {
      id: 'marian-consecration',
      category: 'marian-mercy',
      title: 'Daily Renewal of Total Consecration to Jesus through Mary',
      subtitle: '"Totus Tuus ego sum, et omnia mea Tua sunt..." (St. Louis-Marie de Montfort).',
      recommendedTime: 'Morning',
      completed: false
    },
    {
      id: 'three-oclock-prayer',
      category: 'marian-mercy',
      title: 'The Three O’Clock Prayer (Hour of Great Mercy)',
      subtitle: 'Honor the moment Christ expired on the Cross: "You died, Jesus, but the source of life flowed out for souls..."',
      recommendedTime: '3:00 PM',
      completed: false
    },
    {
      id: 'chaplet-divine-mercy',
      category: 'marian-mercy',
      title: 'The Chaplet of the Divine Mercy',
      subtitle: 'Offer the Body and Blood, Soul and Divinity of Jesus in atonement for our sins and those of the whole world.',
      recommendedTime: '3:00 PM / Daily',
      indulgenceNote: 'Plenary Indulgence (before the Blessed Sacrament)',
      completed: false
    },

    // III. Sacraments, Adoration & Precepts
    {
      id: 'holy-mass-communion',
      category: 'sacraments-precepts',
      title: 'Holy Sacrifice of the Mass (or Act of Spiritual Communion)',
      subtitle: 'Assist devoutly at Holy Mass and receive Holy Communion, or make a fervent Spiritual Communion.',
      recommendedTime: 'Daily / Sunday Obligation',
      completed: false
    },
    {
      id: 'eucharistic-adoration',
      category: 'sacraments-precepts',
      title: 'Visit to the Most Blessed Sacrament (30 Minutes Adoration)',
      subtitle: 'Adore Jesus truly present in the Tabernacle or Monstrance.',
      recommendedTime: '30 Minutes',
      indulgenceNote: 'Plenary Indulgence (30 mins Adoration)',
      completed: false
    },
    {
      id: 'precept-sunday-mass',
      category: 'sacraments-precepts',
      title: 'Precept: Sunday & Holy Day of Obligation Mass Attendance',
      subtitle: 'Sanctify the Lord’s Day and Holy Days by participating in the Eucharist and resting from servile work.',
      recommendedTime: 'Sundays & Solemnities',
      completed: false
    },
    {
      id: 'precept-confession',
      category: 'sacraments-precepts',
      title: 'Sacrament of Penance (Monthly / Regular Confession)',
      subtitle: 'Prepare an examination of conscience and receive sacramental absolution.',
      recommendedTime: 'Monthly / Within 20 Days',
      completed: false
    },
    {
      id: 'precept-friday-abstinence',
      category: 'sacraments-precepts',
      title: 'Friday Penance & Abstinence in Memory of the Passion',
      subtitle: 'Abstain from meat or offer a sacrificial work of piety and charity on Fridays.',
      recommendedTime: 'Fridays',
      completed: false
    },
    {
      id: 'pilgrim-relics-visit',
      category: 'sacraments-precepts',
      title: 'Veneration of Sacred Relics & Shrine Pilgrimage (e.g., Santo Niño & Cebu Shrines)',
      subtitle: 'Pray before the Miraculous Image of Santo Niño de Cebu, Relic of the True Cross, or First-Class Relics of the Saints.',
      recommendedTime: 'Pilgrimage / Feast Day',
      completed: false
    },

    // IV. Special Indulgences for November (Month of the Holy Souls)
    {
      id: 'nov-cemetery-visit',
      category: 'november-indulgences',
      title: 'November 1–8: Devout Visit to a Cemetery & Prayer for the Departed',
      subtitle: 'Visit a cemetery and pray (even mentally) for the faithful departed each day from Nov 1 to Nov 8 (Enchiridion Indulgentiarum, Norm 29).',
      recommendedTime: 'Nov 1 – Nov 8 (Daily)',
      indulgenceNote: 'Plenary Indulgence (Applicable only to Holy Souls)',
      completed: false
    },
    {
      id: 'nov-all-souls-church-visit',
      category: 'november-indulgences',
      title: 'All Souls’ Day (Nov 2): Pious Visit to a Church or Oratory',
      subtitle: 'Devoutly visit a church or oratory and recite one Our Father (Pater Noster) and the Apostles’ Creed (Credo).',
      recommendedTime: 'November 2 (or transferred Sunday)',
      indulgenceNote: 'Plenary Indulgence (Applicable only to Holy Souls)',
      completed: false
    },
    {
      id: 'nov-requiem-aeternam',
      category: 'november-indulgences',
      title: 'Prayer for the Faithful Departed (Requiem Aeternam / Eternal Rest)',
      subtitle: '"Eternal rest grant unto them, O Lord, and let perpetual light shine upon them. May they rest in peace. Amen."',
      recommendedTime: 'Morning, Noon & Night in November',
      indulgenceNote: 'Partial Indulgence (Applicable to Holy Souls)',
      completed: false
    },
    {
      id: 'nov-office-of-the-dead',
      category: 'november-indulgences',
      title: 'Recitation of Lauds or Vespers of the Office of the Dead',
      subtitle: 'Pray the liturgical Office of the Dead or Psalm 130 (De Profundis) for the relief of souls in Purgatory.',
      recommendedTime: 'Throughout November',
      indulgenceNote: 'Partial Indulgence (Applicable to Holy Souls)',
      completed: false
    },
    {
      id: 'nov-condition-confession',
      category: 'november-indulgences',
      title: 'Plenary Indulgence Condition 1: Sacramental Confession',
      subtitle: 'Receive the Sacrament of Penance within about 20 days before or after performing the indulgenced work.',
      recommendedTime: 'Condition for Plenary Indulgence',
      completed: false
    },
    {
      id: 'nov-condition-communion',
      category: 'november-indulgences',
      title: 'Plenary Indulgence Condition 2: Eucharistic Communion',
      subtitle: 'Receive Holy Communion devoutly (one Communion per plenary indulgence gained).',
      recommendedTime: 'Condition for Plenary Indulgence',
      completed: false
    },
    {
      id: 'nov-condition-pope-prayer',
      category: 'november-indulgences',
      title: 'Plenary Indulgence Condition 3: Prayers for the Holy Father’s Intentions',
      subtitle: 'Recite one Our Father and one Hail Mary for the intentions of the Roman Pontiff.',
      recommendedTime: 'Condition for Plenary Indulgence',
      completed: false
    },
    {
      id: 'nov-condition-detachment',
      category: 'november-indulgences',
      title: 'Plenary Indulgence Condition 4: Detachment from All Sin',
      subtitle: 'Make an act of complete interior detachment from all sin, even venial sin.',
      recommendedTime: 'Condition for Plenary Indulgence',
      completed: false
    },

    // V. Penance & Charity
    {
      id: 'suffrage-purgatory',
      category: 'penance-charity',
      title: 'Daily Suffrage & St. Gertrude Prayer for Souls in Purgatory',
      subtitle: '"Eternal Father, I offer Thee the Most Precious Blood of Thy Divine Son, Jesus, in union with the Masses said throughout the world today..."',
      recommendedTime: 'Daily',
      completed: false
    },
    {
      id: 'spiritual-corporal-mercy',
      category: 'penance-charity',
      title: 'Corporal or Spiritual Work of Mercy',
      subtitle: 'Console the sorrowful, forgive an offense, instruct the ignorant, pray for the living and the dead, or assist the poor.',
      recommendedTime: 'Daily Action',
      completed: false
    }
  ], []);

  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed: ChecklistItem[] = JSON.parse(saved);
        // Merge any new default items that might not exist in older saved state
        const existingIds = new Set(parsed.map(i => i.id));
        const missingDefaults = defaultItems.filter(d => !existingIds.has(d.id));
        return [...parsed, ...missingDefaults];
      }
    } catch {
      // fallback
    }
    return defaultItems;
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(checklist));
    } catch {
      // ignore storage errors
    }
  }, [checklist, storageKey]);

  const toggleItem = (id: string) => {
    setChecklist(prev => prev.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const resetAll = () => {
    setChecklist(prev => prev.map(item => ({ ...item, completed: false })));
  };

  const handleAddCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customItemTitle.trim()) return;

    const newItem: ChecklistItem = {
      id: `custom-${Date.now()}`,
      category: 'custom',
      title: customItemTitle.trim(),
      subtitle: customItemSubtitle.trim() || 'Custom personal prayer / devotional commitment',
      recommendedTime: customItemTime.trim() || 'Daily',
      completed: false,
      isCustom: true
    };

    setChecklist(prev => [...prev, newItem]);
    setCustomItemTitle('');
    setCustomItemSubtitle('');
    setCustomItemTime('');
    setIsAddingCustom(false);
  };

  const deleteCustomItem = (id: string) => {
    setChecklist(prev => prev.filter(item => item.id !== id));
  };

  // ============================================================================
  // PRAYER HABIT FORMER & MONTHLY DAILY TRACKER STATE
  // ============================================================================
  const HABITS_STORAGE_KEY = 'sanctum_prayer_habits_v1';
  const MONTHLY_TRACKER_STORAGE_KEY = 'sanctum_monthly_prayer_tracker_v1';

  const [habitPlans, setHabitPlans] = useState<PrayerHabitPlan[]>(() => {
    try {
      const saved = localStorage.getItem(HABITS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return [
      {
        id: 'habit-rosary',
        prayerName: 'The Most Holy Rosary (5 Decades)',
        plannedStartDate: currentDateStr,
        preferredTime: '07:00 PM',
        intentionOrGoal: 'Daily Marian devotion for peace & family conversion',
        targetDays: 30,
        createdAt: currentDateStr
      },
      {
        id: 'habit-angelus',
        prayerName: 'The Angelus (6 AM, 12 PM, 6 PM)',
        plannedStartDate: currentDateStr,
        preferredTime: '12:00 PM',
        intentionOrGoal: 'Sanctify midday in honor of the Incarnation',
        targetDays: 30,
        createdAt: currentDateStr
      },
      {
        id: 'habit-divine-mercy',
        prayerName: 'The 3 O’Clock Prayer & Chaplet of Divine Mercy',
        plannedStartDate: currentDateStr,
        preferredTime: '03:00 PM',
        intentionOrGoal: 'For sinners and the Holy Souls in Purgatory',
        targetDays: 30,
        createdAt: currentDateStr
      },
      {
        id: 'habit-readings',
        prayerName: 'Daily Mass Scripture Readings & Gospel Reflection',
        plannedStartDate: currentDateStr,
        preferredTime: '07:30 AM',
        intentionOrGoal: 'Daily nourishment from the Word of God',
        targetDays: 30,
        createdAt: currentDateStr
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(habitPlans));
    } catch {
      // ignore
    }
  }, [habitPlans]);

  // Form state for creating a new Prayer Habit
  const [selectedPresetPrayer, setSelectedPresetPrayer] = useState<string>(PRESET_HABIT_PRAYERS[0]);
  const [customHabitPrayerName, setCustomHabitPrayerName] = useState<string>('');
  const [plannedStartDate, setPlannedStartDate] = useState<string>(currentDateStr);
  const [preferredTime, setPreferredTime] = useState<string>('08:00 PM');
  const [habitIntention, setHabitIntention] = useState<string>('');
  const [habitTargetDays, setHabitTargetDays] = useState<number>(30);

  // Monthly Tracker Checkboxes: Record<`${habitId}_${YYYY-MM-DD}`, boolean>
  const [monthlyChecks, setMonthlyChecks] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(MONTHLY_TRACKER_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {};
  });

  useEffect(() => {
    try {
      localStorage.setItem(MONTHLY_TRACKER_STORAGE_KEY, JSON.stringify(monthlyChecks));
    } catch {
      // ignore
    }
  }, [monthlyChecks]);

  // Monthly Tracker viewed Year & Month (0-indexed month)
  const initialDateObj = useMemo(() => {
    const [y, m] = currentDateStr.split('-').map(Number);
    return {
      year: y || new Date().getFullYear(),
      month: (m ? m - 1 : new Date().getMonth())
    };
  }, [currentDateStr]);

  const [trackerYear, setTrackerYear] = useState<number>(initialDateObj.year);
  const [trackerMonth, setTrackerMonth] = useState<number>(initialDateObj.month);

  const daysInTrackerMonth = useMemo(() => {
    return new Date(trackerYear, trackerMonth + 1, 0).getDate();
  }, [trackerYear, trackerMonth]);

  const trackerMonthLabel = useMemo(() => {
    return new Date(trackerYear, trackerMonth, 1).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  }, [trackerYear, trackerMonth]);

  const handlePrevTrackerMonth = () => {
    if (trackerMonth === 0) {
      setTrackerMonth(11);
      setTrackerYear(y => y - 1);
    } else {
      setTrackerMonth(m => m - 1);
    }
  };

  const handleNextTrackerMonth = () => {
    if (trackerMonth === 11) {
      setTrackerMonth(0);
      setTrackerYear(y => y + 1);
    } else {
      setTrackerMonth(m => m + 1);
    }
  };

  const handleAddHabitPlan = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = selectedPresetPrayer === '__custom__'
      ? customHabitPrayerName.trim()
      : selectedPresetPrayer;

    if (!finalName) return;

    const newPlan: PrayerHabitPlan = {
      id: `habit-${Date.now()}`,
      prayerName: finalName,
      plannedStartDate: plannedStartDate || currentDateStr,
      preferredTime: preferredTime.trim() || 'Daily',
      intentionOrGoal: habitIntention.trim() || 'Daily fidelity to prayer',
      targetDays: habitTargetDays || 30,
      createdAt: currentDateStr
    };

    setHabitPlans(prev => [...prev, newPlan]);
    setCustomHabitPrayerName('');
    setHabitIntention('');

    // Jump monthly tracker to the planned start date's month so user sees it immediately
    const [sy, sm] = (plannedStartDate || currentDateStr).split('-').map(Number);
    if (sy && sm) {
      setTrackerYear(sy);
      setTrackerMonth(sm - 1);
    }
  };

  const handleUpdateHabitStartDate = (habitId: string, newStartDate: string) => {
    setHabitPlans(prev =>
      prev.map(h => (h.id === habitId ? { ...h, plannedStartDate: newStartDate } : h))
    );
  };

  const handleDeleteHabitPlan = (habitId: string) => {
    setHabitPlans(prev => prev.filter(h => h.id !== habitId));
  };

  const toggleMonthlyDayCheck = (habitId: string, dateStr: string) => {
    const key = `${habitId}_${dateStr}`;
    setMonthlyChecks(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const formatDateStr = (year: number, monthZeroIndexed: number, day: number) => {
    const m = String(monthZeroIndexed + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${year}-${m}-${d}`;
  };

  const setQuickStartDate = (offsetDays: number | 'nov1' | 'nextMonth1st') => {
    const base = new Date(currentDateStr + 'T12:00:00');
    if (offsetDays === 'nov1') {
      setPlannedStartDate(`${base.getFullYear()}-11-01`);
      return;
    }
    if (offsetDays === 'nextMonth1st') {
      const nextM = new Date(base.getFullYear(), base.getMonth() + 1, 1);
      const y = nextM.getFullYear();
      const m = String(nextM.getMonth() + 1).padStart(2, '0');
      setPlannedStartDate(`${y}-${m}-01`);
      return;
    }
    base.setDate(base.getDate() + offsetDays);
    const y = base.getFullYear();
    const m = String(base.getMonth() + 1).padStart(2, '0');
    const d = String(base.getDate()).padStart(2, '0');
    setPlannedStartDate(`${y}-${m}-${d}`);
  };

  // Overall Daily Checklist stats
  const completedCount = checklist.filter(i => i.completed).length;
  const totalCount = checklist.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const categoriesOrder: ChecklistCategory[] = [
    'daily-essential',
    'marian-mercy',
    'sacraments-precepts',
    'november-indulgences',
    'penance-charity',
    'custom'
  ];

  const visibleCategories = activeSectionTab === 'all'
    ? categoriesOrder
    : [activeSectionTab];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-14 animate-fadeIn text-stone-900">
      
      {/* =====================================================================
          1. MASTHEAD BANNER & OVERALL PROGRESS
         ===================================================================== */}
      <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-[#7A5230] via-[#6B4628] to-[#5C3B20] border border-[#9E7348]/80 shadow-[0_12px_32px_rgba(92,59,32,0.28)] space-y-5 text-amber-50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#9E7348]/45 pb-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#52341C] border border-[#A67B4E]/70 flex items-center justify-center text-amber-200 shadow-xs shrink-0">
              <NotebookWithBallpenIcon className="w-6 h-6 text-amber-200" />
            </div>
            <div>
              <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-amber-200/90 block">
                Rule of Life • Daily Devotional Order
              </span>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-amber-50">
                Spiritual Checklist &amp; Prayer Habit Tracker
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
            {onOpenCebuParishes && (
              <button
                onClick={onOpenCebuParishes}
                className="px-3.5 py-2 rounded-lg bg-white hover:bg-stone-50 text-[#24140B] border border-[#8B5A2B]/40 text-xs font-cinzel font-bold shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5 text-[#6B3E1E]" />
                <span>Mass &amp; Confession Schedules</span>
              </button>
            )}
            <button
              onClick={resetAll}
              className="px-3 py-2 rounded-lg bg-[#52341C]/90 hover:bg-[#462B16] border border-[#B08558]/70 text-amber-100 hover:text-white text-xs font-cinzel font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              title="Uncheck all items for today"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Today</span>
            </button>
          </div>
        </div>

        {/* Attribution to The Indulgence Collective */}
        <div className="p-3.5 rounded-xl bg-[#52341C]/65 border border-[#9E7348]/55 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-100/95 leading-relaxed font-serif">
            <strong className="text-amber-200 font-cinzel tracking-wide">Recommended Devotions &amp; Indulgences: </strong>
            Inspired by and attributed to <span className="font-bold text-white">The Indulgence Collective</span> and the <em>Enchiridion Indulgentiarum</em>, 
            providing verified prayers, November suffrages for the Holy Souls, and daily spiritual exercises.
          </div>
        </div>

        {/* Progress Bar & Summary */}
        <div className="bg-[#FDF9F1] p-4 sm:p-5 rounded-xl border border-[#D8C3A5] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-stone-900 shadow-inner">
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center justify-between sm:justify-start gap-3">
              <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-stone-700">
                Today’s Checklist Completion ({currentDateStr})
              </span>
              <span className="text-xs font-bold text-[#6B4628] font-cinzel bg-[#EFE5D4] px-2.5 py-0.5 rounded-md border border-[#D8C3A5]">
                {completedCount} of {totalCount} Checked
              </span>
            </div>
            <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#6B4628] to-[#D4AF37] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="text-right flex items-center justify-between sm:justify-end gap-3 shrink-0">
            <span className="text-xs text-stone-600 font-serif">
              Check off each prayer or activity as completed
            </span>
            <span className="text-2xl sm:text-3xl font-bold font-cinzel text-[#6B4628]">
              {progressPercent}%
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================================
          2. ORDERLY DAILY CHECKLIST (ALL PRAYERS & ACTIVITIES WITH CHECKBOXES)
         ===================================================================== */}
      <div className="rounded-2xl bg-[#F9F4EC] border border-[#D8C3A5] p-5 sm:p-7 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#DFCBB0] pb-4">
          <div>
            <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-[#7A5230] block">
              Part I • Daily Spiritual Order
            </span>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900">
              Daily Prayers, Precepts &amp; November Indulgences Checklist
            </h3>
            <p className="text-xs sm:text-sm font-serif text-stone-600 mt-0.5">
              Every prayer, sacramental precept, and November indulgence work below includes a checkbox for orderly daily tracking.
            </p>
          </div>

          <button
            onClick={() => setIsAddingCustom(!isAddingCustom)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white hover:bg-stone-50 border border-[#8B5A2B]/40 text-[#5C3B20] text-xs font-cinzel font-bold transition-all cursor-pointer self-start md:self-auto shadow-xs shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Custom Prayer / Activity</span>
          </button>
        </div>

        {/* Category Filter Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          <button
            onClick={() => setActiveSectionTab('all')}
            className={`px-3 py-2 rounded-lg text-xs font-cinzel font-bold transition-all cursor-pointer border text-center ${
              activeSectionTab === 'all'
                ? 'bg-[#6B4628] text-amber-50 border-[#52341C] shadow-xs'
                : 'bg-white hover:bg-stone-50 text-stone-800 border-[#D8C3A5]'
            }`}
          >
            All Categories ({checklist.length})
          </button>
          <button
            onClick={() => setActiveSectionTab('daily-essential')}
            className={`px-3 py-2 rounded-lg text-xs font-cinzel font-bold transition-all cursor-pointer border text-center ${
              activeSectionTab === 'daily-essential'
                ? 'bg-[#6B4628] text-amber-50 border-[#52341C] shadow-xs'
                : 'bg-white hover:bg-stone-50 text-stone-800 border-[#D8C3A5]'
            }`}
          >
            I. Daily Essentials
          </button>
          <button
            onClick={() => setActiveSectionTab('marian-mercy')}
            className={`px-3 py-2 rounded-lg text-xs font-cinzel font-bold transition-all cursor-pointer border text-center ${
              activeSectionTab === 'marian-mercy'
                ? 'bg-[#6B4628] text-amber-50 border-[#52341C] shadow-xs'
                : 'bg-white hover:bg-stone-50 text-stone-800 border-[#D8C3A5]'
            }`}
          >
            II. Rosary &amp; Mercy
          </button>
          <button
            onClick={() => setActiveSectionTab('sacraments-precepts')}
            className={`px-3 py-2 rounded-lg text-xs font-cinzel font-bold transition-all cursor-pointer border text-center ${
              activeSectionTab === 'sacraments-precepts'
                ? 'bg-[#6B4628] text-amber-50 border-[#52341C] shadow-xs'
                : 'bg-white hover:bg-stone-50 text-stone-800 border-[#D8C3A5]'
            }`}
          >
            III. Mass &amp; Precepts
          </button>
          <button
            onClick={() => setActiveSectionTab('november-indulgences')}
            className={`px-3 py-2 rounded-lg text-xs font-cinzel font-bold transition-all cursor-pointer border text-center ${
              activeSectionTab === 'november-indulgences'
                ? 'bg-[#6B4628] text-amber-50 border-[#52341C] shadow-xs'
                : 'bg-white hover:bg-stone-50 text-stone-800 border-[#D8C3A5]'
            }`}
          >
            IV. Nov. Indulgences
          </button>
          <button
            onClick={() => setActiveSectionTab('penance-charity')}
            className={`px-3 py-2 rounded-lg text-xs font-cinzel font-bold transition-all cursor-pointer border text-center ${
              activeSectionTab === 'penance-charity'
                ? 'bg-[#6B4628] text-amber-50 border-[#52341C] shadow-xs'
                : 'bg-white hover:bg-stone-50 text-stone-800 border-[#D8C3A5]'
            }`}
          >
            V. Mercy &amp; Souls
          </button>
        </div>

        {/* Add Custom Item Form */}
        {isAddingCustom && (
          <form onSubmit={handleAddCustomItem} className="p-4 sm:p-5 rounded-xl bg-white border border-[#C8AD8D] shadow-sm space-y-3 animate-fadeIn">
            <div className="font-cinzel text-xs font-bold text-[#6B4628] uppercase tracking-wider">
              Add Custom Prayer or Spiritual Activity with Checkbox
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                type="text"
                value={customItemTitle}
                onChange={(e) => setCustomItemTitle(e.target.value)}
                placeholder="Prayer / Activity (e.g., Litany of St. Joseph)..."
                className="px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:outline-hidden focus:ring-1 focus:ring-[#6B4628] font-serif"
                required
              />
              <input
                type="text"
                value={customItemSubtitle}
                onChange={(e) => setCustomItemSubtitle(e.target.value)}
                placeholder="Intention or notes (optional)..."
                className="px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:outline-hidden focus:ring-1 focus:ring-[#6B4628] font-serif"
              />
              <input
                type="text"
                value={customItemTime}
                onChange={(e) => setCustomItemTime(e.target.value)}
                placeholder="Time (e.g., 7:00 AM, Evening)..."
                className="px-3.5 py-2 text-xs sm:text-sm rounded-lg border border-stone-300 focus:outline-hidden focus:ring-1 focus:ring-[#6B4628] font-serif"
              />
            </div>
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAddingCustom(false)}
                className="px-3 py-1.5 text-xs text-stone-600 hover:text-stone-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-lg bg-[#6B4628] hover:bg-[#52341C] text-white text-xs font-cinzel font-bold shadow-xs cursor-pointer"
              >
                Add to Checklist
              </button>
            </div>
          </form>
        )}

        {/* Orderly Categorized Checklist Tables */}
        <div className="space-y-6">
          {visibleCategories.map((catKey) => {
            const catItems = checklist.filter(i => i.category === catKey);
            if (catItems.length === 0) return null;
            const meta = CATEGORY_META[catKey];
            const catDone = catItems.filter(i => i.completed).length;

            return (
              <div
                key={catKey}
                className="rounded-xl bg-white border border-[#DFCBB0] shadow-xs overflow-hidden"
              >
                {/* Category Header */}
                <div className="px-5 py-3.5 bg-gradient-to-r from-[#EFE5D6] via-[#E8D9C5] to-[#EFE5D6] border-b border-[#DFCBB0] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-cinzel text-sm sm:text-base font-bold text-[#2E1B0E]">
                        {meta.label}
                      </h4>
                      <span className="text-[11px] font-cinzel font-bold px-2.5 py-0.5 rounded-md bg-white text-[#6B4628] border border-[#C8AD8D]">
                        {catDone} / {catItems.length}
                      </span>
                    </div>
                    <p className="text-xs font-serif text-stone-700 mt-0.5">
                      {meta.description}
                    </p>
                  </div>
                  <span className="text-[11px] font-cinzel font-bold uppercase tracking-wider text-[#6B4628] self-start sm:self-center shrink-0">
                    {meta.badge}
                  </span>
                </div>

                {/* Items List with Explicit Checkboxes */}
                <div className="divide-y divide-[#EFE6D8]">
                  {catItems.map((item) => (
                    <label
                      key={item.id}
                      htmlFor={`chk-${item.id}`}
                      className={`p-4 sm:px-5 sm:py-4 flex items-start gap-3.5 cursor-pointer transition-colors select-none ${
                        item.completed
                          ? 'bg-[#FAF7F2] text-stone-500'
                          : 'bg-white hover:bg-[#FFFDF9] text-stone-900'
                      }`}
                    >
                      <div className="pt-0.5 shrink-0 flex items-center">
                        <input
                          id={`chk-${item.id}`}
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => toggleItem(item.id)}
                          className="w-5 h-5 rounded border-2 border-[#8B5A2B] text-[#6B4628] focus:ring-[#6B4628] accent-[#6B4628] cursor-pointer"
                        />
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                          <span className={`font-serif text-sm sm:text-base font-bold leading-snug ${
                            item.completed ? 'line-through text-stone-500' : 'text-[#24140B]'
                          }`}>
                            {item.title}
                          </span>

                          <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                            {item.recommendedTime && (
                              <span className="text-[11px] font-serif px-2.5 py-0.5 rounded-md bg-[#F4EDE2] text-[#5C3B20] border border-[#E2D3BE] font-semibold">
                                {item.recommendedTime}
                              </span>
                            )}
                            {item.indulgenceNote && (
                              <span className="text-[11px] font-serif font-bold px-2.5 py-0.5 rounded-md bg-[#FAF0D9] text-[#7A4E1D] border border-[#E5C98B] flex items-center gap-1">
                                <Award className="w-3 h-3 text-[#B8860B] shrink-0" />
                                <span>{item.indulgenceNote}</span>
                              </span>
                            )}
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm font-serif text-stone-600 leading-relaxed">
                          {item.subtitle}
                        </p>
                      </div>

                      {item.isCustom && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            deleteCustomItem(item.id);
                          }}
                          className="p-1.5 text-stone-400 hover:text-red-700 rounded-md transition-colors shrink-0"
                          title="Delete custom item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* =====================================================================
          3. PRAYER HABIT FORMER ("When do I plan to start?")
         ===================================================================== */}
      <div className="rounded-2xl bg-[#F9F4EC] border border-[#D8C3A5] p-5 sm:p-7 shadow-sm space-y-6">
        <div className="border-b border-[#DFCBB0] pb-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-[#6B4628]" />
              <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-[#7A5230]">
                Part II • Catholic Prayer Habit Former
              </span>
            </div>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
              Plan Your Daily Prayer Habit &amp; Start Date
            </h3>
            <p className="text-xs sm:text-sm font-serif text-stone-600 mt-0.5">
              For example, if you want to pray the Holy Rosary daily, choose the prayer below, set <strong>when you plan to start</strong>, and track your fidelity in the Monthly Tracker.
            </p>
          </div>
        </div>

        {/* Habit Builder Form */}
        <form onSubmit={handleAddHabitPlan} className="p-5 rounded-xl bg-white border border-[#DFCBB0] shadow-xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            
            {/* 1. Prayer to Pray Daily */}
            <div className="md:col-span-5 space-y-1.5">
              <label className="block font-cinzel text-xs font-bold text-[#3A2213] uppercase tracking-wider">
                1. Which prayer do you want to pray daily?
              </label>
              <select
                value={selectedPresetPrayer}
                onChange={(e) => setSelectedPresetPrayer(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#FDFBF7] border border-[#C8AD8D] text-sm font-serif text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-[#6B4628]"
              >
                {PRESET_HABIT_PRAYERS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
                <option value="__custom__">+ Enter a Custom Daily Prayer...</option>
              </select>

              {selectedPresetPrayer === '__custom__' && (
                <input
                  type="text"
                  value={customHabitPrayerName}
                  onChange={(e) => setCustomHabitPrayerName(e.target.value)}
                  placeholder="Enter custom prayer name (e.g., Litany of Loreto)..."
                  className="w-full mt-2 px-3.5 py-2 rounded-lg bg-white border border-[#C8AD8D] text-sm font-serif text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-[#6B4628]"
                  required
                />
              )}
            </div>

            {/* 2. When do I plan to start? */}
            <div className="md:col-span-4 space-y-1.5">
              <label className="block font-cinzel text-xs font-bold text-[#3A2213] uppercase tracking-wider">
                2. When do you plan to start?
              </label>
              <input
                type="date"
                value={plannedStartDate}
                onChange={(e) => setPlannedStartDate(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg bg-[#FDFBF7] border border-[#C8AD8D] text-sm font-serif text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-[#6B4628]"
                required
              />
              <div className="flex flex-wrap gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => setQuickStartDate(0)}
                  className="px-2 py-1 rounded bg-[#F3E9DA] hover:bg-[#E6D6BF] text-[#4A2E1B] text-[11px] font-serif font-semibold cursor-pointer transition-colors"
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={() => setQuickStartDate(1)}
                  className="px-2 py-1 rounded bg-[#F3E9DA] hover:bg-[#E6D6BF] text-[#4A2E1B] text-[11px] font-serif font-semibold cursor-pointer transition-colors"
                >
                  Tomorrow
                </button>
                <button
                  type="button"
                  onClick={() => setQuickStartDate('nov1')}
                  className="px-2 py-1 rounded bg-[#F3E9DA] hover:bg-[#E6D6BF] text-[#4A2E1B] text-[11px] font-serif font-semibold cursor-pointer transition-colors"
                >
                  Nov 1 (All Saints)
                </button>
                <button
                  type="button"
                  onClick={() => setQuickStartDate('nextMonth1st')}
                  className="px-2 py-1 rounded bg-[#F3E9DA] hover:bg-[#E6D6BF] text-[#4A2E1B] text-[11px] font-serif font-semibold cursor-pointer transition-colors"
                >
                  1st of Next Month
                </button>
              </div>
            </div>

            {/* 3. Preferred Hour & Goal */}
            <div className="md:col-span-3 space-y-1.5">
              <label className="block font-cinzel text-xs font-bold text-[#3A2213] uppercase tracking-wider">
                3. Daily Hour &amp; Goal
              </label>
              <input
                type="text"
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                placeholder="e.g., 7:00 PM or After Dinner"
                className="w-full px-3.5 py-2 rounded-lg bg-[#FDFBF7] border border-[#C8AD8D] text-sm font-serif text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-[#6B4628]"
              />
              <div className="flex items-center gap-1.5 pt-1">
                <span className="text-[11px] font-serif text-stone-600">Commitment:</span>
                {[14, 21, 30, 33].map(days => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => setHabitTargetDays(days)}
                    className={`px-2 py-0.5 rounded text-[11px] font-serif font-bold cursor-pointer border ${
                      habitTargetDays === days
                        ? 'bg-[#6B4628] text-white border-[#52341C]'
                        : 'bg-white text-stone-700 border-stone-300'
                    }`}
                  >
                    {days}d
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#EFE6D8]">
            <input
              type="text"
              value={habitIntention}
              onChange={(e) => setHabitIntention(e.target.value)}
              placeholder="Personal intention for this habit (e.g., For family peace, purity of heart, or the Holy Souls)..."
              className="flex-1 px-3.5 py-2 rounded-lg bg-[#FDFBF7] border border-[#C8AD8D] text-xs sm:text-sm font-serif text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-[#6B4628]"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-lg bg-[#6B4628] hover:bg-[#52341C] text-amber-50 font-cinzel text-xs font-bold shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add to Habit Former &amp; Monthly Tracker</span>
            </button>
          </div>
        </form>

        {/* Active Prayer Habit Commitments List */}
        <div className="space-y-2.5">
          <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider text-[#5C3B20]">
            My Planned Daily Prayer Habits ({habitPlans.length})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {habitPlans.map((habit) => {
              // Count total completed days for this habit in the currently viewed month
              let monthCompletedDays = 0;
              for (let d = 1; d <= daysInTrackerMonth; d++) {
                const dStr = formatDateStr(trackerYear, trackerMonth, d);
                if (monthlyChecks[`${habit.id}_${dStr}`]) {
                  monthCompletedDays++;
                }
              }

              const isStarted = currentDateStr >= habit.plannedStartDate;
              const todayChecked = Boolean(monthlyChecks[`${habit.id}_${currentDateStr}`]);

              return (
                <div
                  key={habit.id}
                  className="p-4 rounded-xl bg-white border border-[#DFCBB0] shadow-2xs flex flex-col justify-between gap-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <label className="flex items-start gap-3 cursor-pointer flex-1">
                      <input
                        type="checkbox"
                        checked={todayChecked}
                        onChange={() => toggleMonthlyDayCheck(habit.id, currentDateStr)}
                        className="mt-1 w-5 h-5 rounded border-2 border-[#8B5A2B] accent-[#6B4628] cursor-pointer shrink-0"
                        title="Check off for today"
                      />
                      <div>
                        <span className={`font-serif text-sm sm:text-base font-bold block ${
                          todayChecked ? 'line-through text-stone-500' : 'text-[#24140B]'
                        }`}>
                          {habit.prayerName}
                        </span>
                        <span className="text-xs font-serif text-stone-600 italic block mt-0.5">
                          {habit.intentionOrGoal}
                        </span>
                      </div>
                    </label>

                    <button
                      type="button"
                      onClick={() => handleDeleteHabitPlan(habit.id)}
                      className="p-1 text-stone-400 hover:text-red-700 rounded transition-colors cursor-pointer"
                      title="Remove prayer habit"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="pt-2.5 border-t border-[#F2E9DC] flex flex-wrap items-center justify-between gap-2 text-xs font-serif">
                    <div className="flex items-center gap-2">
                      <span className="text-stone-600 font-semibold">Planned Start:</span>
                      <input
                        type="date"
                        value={habit.plannedStartDate}
                        onChange={(e) => handleUpdateHabitStartDate(habit.id, e.target.value)}
                        className="px-2 py-0.5 rounded bg-[#F7F1E6] border border-[#D8C3A5] text-[#3A2213] font-bold text-xs cursor-pointer"
                        title="Change planned start date"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-[#F4EDE2] text-[#5C3B20] border border-[#E2D3BE] font-semibold">
                        {habit.preferredTime}
                      </span>
                      <span className={`px-2 py-0.5 rounded font-bold ${
                        isStarted
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : 'bg-amber-50 text-amber-900 border border-amber-200'
                      }`}>
                        {isStarted ? `${monthCompletedDays}/${daysInTrackerMonth} in ${trackerMonthLabel.split(' ')[0]}` : `Starts ${habit.plannedStartDate}`}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* =====================================================================
          4. MONTHLY DAILY PRAYER TRACKER (WITH CHECKBOXES FOR EVERY DAY)
         ===================================================================== */}
      <div className="rounded-2xl bg-[#F9F4EC] border border-[#D8C3A5] p-5 sm:p-7 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DFCBB0] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-[#6B4628]" />
              <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-[#7A5230]">
                Part III • Monthly Daily Prayer Tracker
              </span>
            </div>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
              Monthly Checkboxes for Prayers You Want to Pray Daily
            </h3>
            <p className="text-xs sm:text-sm font-serif text-stone-600 mt-0.5">
              Check the box for each day of the month as you complete your daily prayers. Days marked with a gold border indicate your planned start date.
            </p>
          </div>

          {/* Month & Quick November Selector */}
          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto shrink-0">
            <button
              type="button"
              onClick={() => {
                setTrackerYear(initialDateObj.year);
                setTrackerMonth(10); // November (0-indexed = 10)
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold border transition-all cursor-pointer ${
                trackerMonth === 10
                  ? 'bg-[#6B4628] text-amber-50 border-[#52341C]'
                  : 'bg-white hover:bg-stone-50 text-[#5C3B20] border-[#C8AD8D]'
              }`}
            >
              November
            </button>

            <div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-xl border border-[#C8AD8D] shadow-2xs">
              <button
                type="button"
                onClick={handlePrevTrackerMonth}
                className="p-1.5 rounded-lg hover:bg-stone-100 text-[#3A2213] cursor-pointer"
                title="Previous Month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="font-cinzel text-xs sm:text-sm font-bold text-[#24140B] min-w-[130px] text-center">
                {trackerMonthLabel}
              </span>
              <button
                type="button"
                onClick={handleNextTrackerMonth}
                className="p-1.5 rounded-lg hover:bg-stone-100 text-[#3A2213] cursor-pointer"
                title="Next Month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Monthly Grid Table with Checkboxes */}
        <div className="overflow-x-auto rounded-xl border border-[#DFCBB0] bg-white shadow-xs">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-[#EFE5D6] border-b border-[#DFCBB0] text-[#2E1B0E]">
                <th className="sticky left-0 z-10 bg-[#EFE5D6] px-4 py-3 font-cinzel text-xs font-bold uppercase tracking-wider min-w-[220px] max-w-[260px] border-r border-[#DFCBB0]">
                  Daily Prayer / Start Date
                </th>
                <th className="px-3 py-3 font-cinzel text-xs font-bold uppercase tracking-wider text-center border-r border-[#DFCBB0] min-w-[72px]">
                  Done
                </th>
                {Array.from({ length: daysInTrackerMonth }, (_, idx) => {
                  const dayNum = idx + 1;
                  const dStr = formatDateStr(trackerYear, trackerMonth, dayNum);
                  const isTodayCol = dStr === currentDateStr;
                  return (
                    <th
                      key={dayNum}
                      className={`px-1.5 py-2.5 text-center font-cinzel text-[11px] font-bold min-w-[34px] border-r border-[#EFE6D8] ${
                        isTodayCol ? 'bg-[#6B4628] text-amber-100' : 'text-[#4A2E1B]'
                      }`}
                      title={dStr}
                    >
                      {dayNum}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFE6D8]">
              {habitPlans.map((habit) => {
                let completedInMonth = 0;
                for (let d = 1; d <= daysInTrackerMonth; d++) {
                  const dStr = formatDateStr(trackerYear, trackerMonth, d);
                  if (monthlyChecks[`${habit.id}_${dStr}`]) completedInMonth++;
                }

                return (
                  <tr key={habit.id} className="hover:bg-[#FFFDF9] transition-colors">
                    {/* Sticky Prayer Name & Planned Start Date */}
                    <td className="sticky left-0 z-10 bg-white px-4 py-3 border-r border-[#DFCBB0] align-middle">
                      <div className="font-serif text-xs sm:text-sm font-bold text-[#24140B] leading-snug">
                        {habit.prayerName}
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-[11px] font-serif text-stone-600">
                        <span>Start: <strong className="text-[#6B4628]">{habit.plannedStartDate}</strong></span>
                        <span>•</span>
                        <span>{habit.preferredTime}</span>
                      </div>
                    </td>

                    {/* Monthly Counter */}
                    <td className="px-2.5 py-3 text-center font-cinzel text-xs font-bold text-[#6B4628] border-r border-[#DFCBB0] bg-[#FAF6EE]">
                      {completedInMonth}/{daysInTrackerMonth}
                    </td>

                    {/* Day 1..N Checkboxes */}
                    {Array.from({ length: daysInTrackerMonth }, (_, idx) => {
                      const dayNum = idx + 1;
                      const dStr = formatDateStr(trackerYear, trackerMonth, dayNum);
                      const checkKey = `${habit.id}_${dStr}`;
                      const isChecked = Boolean(monthlyChecks[checkKey]);
                      const isStartDate = dStr === habit.plannedStartDate;
                      const isBeforeStart = dStr < habit.plannedStartDate;
                      const isTodayCol = dStr === currentDateStr;

                      return (
                        <td
                          key={dayNum}
                          className={`p-1 text-center align-middle border-r border-[#F4EDE2] ${
                            isStartDate
                              ? 'bg-amber-100/75 ring-1 ring-inset ring-amber-500'
                              : isTodayCol
                                ? 'bg-[#FDF6E9]'
                                : isBeforeStart
                                  ? 'bg-stone-50/70'
                                  : ''
                          }`}
                          title={
                            isStartDate
                              ? `${habit.prayerName} — Planned Start Date (${dStr})`
                              : `${habit.prayerName} — ${dStr}`
                          }
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => toggleMonthlyDayCheck(habit.id, dStr)}
                            aria-label={`${habit.prayerName} on ${dStr}`}
                            className="w-4 h-4 rounded border border-[#8B5A2B] accent-[#6B4628] cursor-pointer"
                          />
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-serif text-stone-600 pt-1">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-amber-100 border border-amber-500 inline-block" />
              <span>Planned Start Date</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded bg-[#6B4628] inline-block" />
              <span>Today ({currentDateStr})</span>
            </span>
          </div>
          <span>All checkboxes are saved automatically on this device.</span>
        </div>
      </div>

    </div>
  );
};
