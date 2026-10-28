import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Calendar as CalendarIcon, 
  Clock, 
  Heart, 
  Sparkles, 
  Flame, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  RotateCcw, 
  ExternalLink, 
  BookOpen, 
  Cross, 
  Bell, 
  MapPin, 
  Award,
  Layers,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { NotebookWithBallpenIcon } from './SanctumIcons';

interface ChecklistItem {
  id: string;
  category: 'daily-essential' | 'marian-rosary' | 'divine-mercy' | 'liturgy-sacraments' | 'penance-charity' | 'custom';
  title: string;
  subtitle: string;
  recommendedTime?: string;
  indulgenceNote?: string;
  completed: boolean;
  isCustom?: boolean;
}

interface PersonalPietyDashboardProps {
  currentDateStr: string;
  onOpenCebuParishes?: () => void;
  onOpenAngelus?: () => void;
  onOpenAdoration?: () => void;
}

export const PersonalPietyDashboard: React.FC<PersonalPietyDashboardProps> = ({
  currentDateStr,
  onOpenCebuParishes,
  onOpenAngelus,
  onOpenAdoration
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'daily-essential' | 'marian-rosary' | 'divine-mercy' | 'liturgy-sacraments' | 'penance-charity'>('all');
  const [timeConditionFilter, setTimeConditionFilter] = useState<'all' | 'gentle' | 'standard' | 'full'>('all');
  const [customItemTitle, setCustomItemTitle] = useState('');
  const [customItemSubtitle, setCustomItemSubtitle] = useState('');
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [showIndulgenceGuide, setShowIndulgenceGuide] = useState(false);

  // Storage key based on date so checklist resets daily or persists per date
  const storageKey = `sanctum_piety_checklist_${currentDateStr}`;

  const defaultItems: ChecklistItem[] = [
    // Daily Essentials
    {
      id: 'morning-offering',
      category: 'daily-essential',
      title: 'Morning Offering to the Sacred Heart of Jesus',
      subtitle: 'Consecrate all prayers, works, joys, and sufferings of the day for the intentions of the Sacred Heart and the Immaculate Heart of Mary.',
      recommendedTime: 'Upon Waking',
      completed: false
    },
    {
      id: 'angelus-noon',
      category: 'daily-essential',
      title: 'The Angelus (or Regina Caeli in Eastertide)',
      subtitle: 'Commemorate the mystery of the Incarnation of the Word at 6:00 AM, 12:00 Noon, and 6:00 PM.',
      recommendedTime: '6 AM / 12 PM / 6 PM',
      completed: false
    },
    {
      id: 'mass-readings',
      category: 'daily-essential',
      title: 'Daily Mass Scripture Readings & Gospel Reflection',
      subtitle: 'Feed upon the living Word of God from the day\'s Lectionary and patristic commentary.',
      recommendedTime: 'Morning / Afternoon',
      completed: false
    },
    {
      id: 'mental-prayer',
      category: 'daily-essential',
      title: 'Mental Prayer / Lectio Divina (15–30 Minutes)',
      subtitle: 'Silent contemplative communion with Christ: gazing upon His presence, resting in His love.',
      recommendedTime: 'Quiet time of day',
      completed: false
    },
    {
      id: 'daily-examen',
      category: 'daily-essential',
      title: 'Nightly Ignatian Examen & Act of Contrition',
      subtitle: 'Review the day with gratitude, recognize God’s graces, acknowledge faults, and ask for pardon before sleep.',
      recommendedTime: 'Before Bedtime',
      completed: false
    },

    // Marian & Rosary (Recommended by The Indulgence Collective)
    {
      id: 'holy-rosary',
      category: 'marian-rosary',
      title: 'The Most Holy Rosary of the Blessed Virgin Mary',
      subtitle: 'Recite at least 5 decades contemplating the Sacred Mysteries. Plenary indulgence when recited devoutly in a church, public oratory, or family/religious community.',
      recommendedTime: 'Anytime',
      indulgenceNote: 'Plenary Indulgence (under usual conditions)',
      completed: false
    },
    {
      id: 'marian-consecration',
      category: 'marian-rosary',
      title: 'Daily Renewal of Total Consecration (St. Louis de Montfort)',
      subtitle: '"I am all Thine, and all that I have is Thine, O most loving Jesus, through Mary Thy Holy Mother."',
      recommendedTime: 'Morning or Evening',
      completed: false
    },

    // Divine Mercy
    {
      id: 'three-oclock-prayer',
      category: 'divine-mercy',
      title: 'The Three O\'Clock Prayer (Hour of Great Mercy)',
      subtitle: 'Immerse yourself in Christ’s Passion: "You died, Jesus, but the source of life flowed out for souls..."',
      recommendedTime: '3:00 PM',
      completed: false
    },
    {
      id: 'chaplet-divine-mercy',
      category: 'divine-mercy',
      title: 'The Chaplet of the Divine Mercy',
      subtitle: 'Offer to the Eternal Father the Body and Blood, Soul and Divinity of His dearly beloved Son for our sins and those of the whole world.',
      recommendedTime: '3:00 PM or Evening',
      completed: false
    },

    // Liturgy & Sacraments
    {
      id: 'daily-mass',
      category: 'liturgy-sacraments',
      title: 'Holy Sacrifice of the Mass (Physical or Spiritual Communion)',
      subtitle: 'Participate in the Holy Mass or make a fervent Act of Spiritual Communion united with the altars of the world.',
      recommendedTime: 'Morning / Noon / Evening',
      completed: false
    },
    {
      id: 'eucharistic-visit',
      category: 'liturgy-sacraments',
      title: 'Visit to the Most Blessed Sacrament (Adoration)',
      subtitle: 'Spend at least 30 minutes in adoration for a Plenary Indulgence, or pay a devout brief visit to Jesus in the Tabernacle.',
      recommendedTime: 'During the day',
      indulgenceNote: 'Plenary Indulgence for 30 minutes of Adoration',
      completed: false
    },

    // Penance & Charity (For Souls on Earth and in Purgatory)
    {
      id: 'suffrage-purgatory',
      category: 'penance-charity',
      title: 'Suffrages for the Holy Souls in Purgatory (Requiem Aeternam)',
      subtitle: 'Offer prayers, indulgences, and small mortifications to release suffering souls into the beatific vision.',
      recommendedTime: 'Daily',
      completed: false
    },
    {
      id: 'spiritual-corporal-mercy',
      category: 'penance-charity',
      title: 'Act of Spiritual or Corporal Mercy',
      subtitle: 'Console the sorrowful, forgive an offense, bear wrongs patiently, or assist the poor and sick for love of Jesus.',
      recommendedTime: 'Throughout the day',
      completed: false
    }
  ];

  const [checklist, setChecklist] = useState<ChecklistItem[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        return JSON.parse(saved);
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
    if (window.confirm('Reset all checklist items for today?')) {
      setChecklist(defaultItems);
    }
  };

  const handleAddCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customItemTitle.trim()) return;

    const newItem: ChecklistItem = {
      id: `custom-${Date.now()}`,
      category: 'custom',
      title: customItemTitle.trim(),
      subtitle: customItemSubtitle.trim() || 'Custom personal prayer / devotional practice',
      completed: false,
      isCustom: true
    };

    setChecklist(prev => [newItem, ...prev]);
    setCustomItemTitle('');
    setCustomItemSubtitle('');
    setIsAddingCustom(false);
  };

  const deleteCustomItem = (id: string) => {
    setChecklist(prev => prev.filter(item => item.id !== id));
  };

  const completedCount = checklist.filter(i => i.completed).length;
  const totalCount = checklist.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const filteredItems = checklist.filter(item => {
    if (selectedFilter !== 'all' && item.category !== selectedFilter && !(item.category === 'custom' && selectedFilter === 'daily-essential')) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fadeIn text-stone-900">
      
      {/* Header Banner - Medium-Dark Brown (Darker brown, but not very dark brown) */}
      <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-[#7A5230] via-[#6B4628] to-[#5C3B20] border border-[#9E7348]/80 shadow-[0_12px_32px_rgba(92,59,32,0.28)] space-y-4 text-amber-50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#9E7348]/45 pb-4">
          <div className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-[#52341C] border border-[#A67B4E]/70 flex items-center justify-center text-amber-200 shadow-xs">
              <NotebookWithBallpenIcon className="w-6 h-6 text-amber-200" />
            </div>
            <div>
              <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-amber-200/90 block">
                Daily Devotional Practice
              </span>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-amber-50">
                Spiritual Checklist
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => setShowIndulgenceGuide(!showIndulgenceGuide)}
              className="px-3.5 py-1.5 rounded-lg bg-[#52341C]/90 hover:bg-[#462B16] border border-[#B08558]/70 text-amber-100 text-xs font-cinzel font-bold shadow-2xs transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Award className="w-4 h-4 text-amber-300" />
              <span>Indulgence Guide</span>
            </button>
            <button
              onClick={resetAll}
              className="p-1.5 rounded-lg bg-[#52341C]/90 hover:bg-[#462B16] border border-[#B08558]/70 text-amber-200 hover:text-white transition-colors cursor-pointer"
              title="Reset today's checklist"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Attribution to The Indulgence Collective (Included Once as Requested) */}
        <div className="p-3.5 rounded-xl bg-[#52341C]/65 border border-[#9E7348]/55 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-amber-100/95 leading-relaxed font-serif">
            <strong className="text-amber-200 font-cinzel tracking-wide">Recommended Devotions &amp; Indulgences: </strong>
            Inspired by and attributed to <span className="font-bold text-white">The Indulgence Collective</span>, 
            providing verified prayers, apostolic works, and spiritual treasures of the Church for the sanctification of souls in this world and the relief of the faithful departed in purgatory.
          </div>
        </div>

        {/* Progress Bar & Counter */}
        <div className="bg-[#FDF9F1] p-4 rounded-xl border border-[#D8C3A5] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-stone-900 shadow-inner">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-stone-700">
                Today’s Spiritual Checklist Progress
              </span>
              <span className="text-xs font-bold text-[#6B4628] font-cinzel">
                {completedCount} of {totalCount} Completed
              </span>
            </div>
            <div className="w-full sm:w-80 h-3 bg-stone-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#6B4628] to-[#D4AF37] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="text-right flex items-center justify-between sm:justify-end gap-3">
            <div className="text-xs text-stone-600 font-serif">
              Adjustable to your daily schedule &amp; health condition
            </div>
            <span className="text-2xl font-bold font-cinzel text-[#6B4628]">
              {progressPercent}%
            </span>
          </div>
        </div>
      </div>

      {/* Indulgence Conditions Guide Modal / Accordion */}
      {showIndulgenceGuide && (
        <div className="rounded-2xl p-6 bg-gradient-to-br from-[#FFFDF9] to-[#F7EFE2] border border-[#DFCEB7] shadow-sm space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-[#E5D7C2] pb-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#B8860B]" />
              <h3 className="font-cinzel text-lg font-bold text-stone-900">
                Four Standard Conditions for Gaining a Plenary Indulgence
              </h3>
            </div>
            <button 
              onClick={() => setShowIndulgenceGuide(false)}
              className="text-xs text-stone-500 hover:text-stone-900 cursor-pointer font-medium"
            >
              Close
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs font-serif text-stone-700">
            <div className="p-3 bg-white rounded-xl border border-[#E8DCC8] space-y-1">
              <strong className="text-[#8C6239] block font-cinzel">1. Sacramental Confession</strong>
              <span>Received within about 20 days before or after the prescribed work.</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#E8DCC8] space-y-1">
              <strong className="text-[#8C6239] block font-cinzel">2. Eucharistic Communion</strong>
              <span>Received devoutly, preferably on the day the work is performed.</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#E8DCC8] space-y-1">
              <strong className="text-[#8C6239] block font-cinzel">3. Prayers for the Pope</strong>
              <span>At least one Our Father and one Hail Mary for the Holy Father’s intentions.</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#E8DCC8] space-y-1">
              <strong className="text-[#8C6239] block font-cinzel">4. Detachment from Sin</strong>
              <span>Complete interior detachment from all sin, even venial sin.</span>
            </div>
          </div>
          <p className="text-[11px] text-stone-600 font-serif italic text-center">
            * All plenary indulgences can always be applied either to oneself or to the Holy Souls in Purgatory by way of suffrage.
          </p>
        </div>
      )}

      {/* Vital Precepts of the Church & Catholic Reminders Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. Sunday Mass Obligation */}
        <div className="p-4 rounded-xl bg-white border border-[#EADFCF] shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-[#8C6239]">
            <CalendarIcon className="w-4 h-4" />
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider">
              Sunday Mass Obligation
            </h4>
          </div>
          <p className="text-xs font-serif text-stone-700 leading-relaxed">
            Attend Holy Mass every Sunday and Holy Day of Obligation, resting from servile labor to honor God.
          </p>
        </div>

        {/* 2. Yearly Confession (Precept of the Church) */}
        <div className="p-4 rounded-xl bg-white border border-[#EADFCF] shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-[#8C6239]">
            <Cross className="w-4 h-4" />
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider">
              Yearly Confession
            </h4>
          </div>
          <p className="text-xs font-serif text-stone-700 leading-relaxed">
            Confess all grave sins at least once a year, and receive monthly Confession as commended by the saints.
          </p>
        </div>

        {/* 3. Friday Abstinence / Canonical Substitution */}
        <div className="p-4 rounded-xl bg-white border border-[#EADFCF] shadow-2xs space-y-2">
          <div className="flex items-center gap-2 text-[#8C6239]">
            <Flame className="w-4 h-4" />
            <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider">
              Friday Abstinence & Penance
            </h4>
          </div>
          <p className="text-xs font-serif text-stone-700 leading-relaxed">
            Abstain from meat every Friday in memory of the Passion, or substitute with another serious act of prayer or charity where permitted.
          </p>
        </div>
      </div>

      {/* Special Highlights: Relics in Cebu, Philippines & Ongoing Novenas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Great Saints Relics in Cebu, Philippines */}
        <div className="p-5 rounded-xl bg-gradient-to-br from-[#FAF5EE] to-[#F3E7D5] border border-[#DFCBB0] shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#7A4E1D]">
              <MapPin className="w-4 h-4 text-[#8C6239]" />
              <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider">
                Relics of Great Saints in Cebu, Philippines
              </h4>
            </div>
            {onOpenCebuParishes && (
              <button 
                onClick={onOpenCebuParishes}
                className="text-[11px] font-cinzel text-[#8C6239] hover:underline font-bold"
              >
                Parish Schedules →
              </button>
            )}
          </div>
          <p className="text-xs font-serif text-stone-700 leading-relaxed">
            Cebu—the Cradle of Christianity in the Philippines—regularly hosts and permanently enshrines precious sacred relics:
            <strong> The Miraculous Image of Santo Niño de Cebu</strong> (given in 1521), 
            the <strong>Relic of the True Cross</strong>, and visiting pilgrim relics of 
            <strong> St. Padre Pio of Pietrelcina</strong>, <strong>St. Thérèse of Lisieux</strong>, 
            <strong>St. John Paul II</strong>, and <strong>Blessed Carlo Acutis</strong>.
          </p>
        </div>

        {/* Vatican Recommendations & Ongoing Novenas */}
        <div className="p-5 rounded-xl bg-gradient-to-br from-[#FAF5EE] to-[#F3E7D5] border border-[#DFCBB0] shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#7A4E1D]">
              <Bell className="w-4 h-4 text-[#8C6239]" />
              <h4 className="font-cinzel text-xs font-bold uppercase tracking-wider">
                Vatican & Holy See Recommended Devotions
              </h4>
            </div>
            <span className="text-[10px] bg-white/70 px-2 py-0.5 rounded-full font-serif font-bold text-[#8C6239]">
              Holy Year & Jubilee
            </span>
          </div>
          <p className="text-xs font-serif text-stone-700 leading-relaxed">
            The Holy See calls all faithful to daily Eucharistic Adoration, 
            ardent recitation of the Holy Rosary for World Peace, and 
            the November Octave of All Souls (offering plenary indulgences applicable to the souls in purgatory visiting a cemetery).
          </p>
        </div>
      </div>

      {/* Checklist Filter Tabs & Add Custom Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
        <div className="flex flex-wrap gap-1.5 bg-stone-100 p-1.5 rounded-xl border border-stone-200">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold transition-all cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-[#8C6239] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200'
            }`}
          >
            All Devotions
          </button>
          <button
            onClick={() => setSelectedFilter('daily-essential')}
            className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold transition-all cursor-pointer ${
              selectedFilter === 'daily-essential'
                ? 'bg-[#8C6239] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200'
            }`}
          >
            Essentials
          </button>
          <button
            onClick={() => setSelectedFilter('marian-rosary')}
            className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold transition-all cursor-pointer ${
              selectedFilter === 'marian-rosary'
                ? 'bg-[#8C6239] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200'
            }`}
          >
            Rosary & Mary
          </button>
          <button
            onClick={() => setSelectedFilter('divine-mercy')}
            className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold transition-all cursor-pointer ${
              selectedFilter === 'divine-mercy'
                ? 'bg-[#8C6239] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200'
            }`}
          >
            Divine Mercy
          </button>
          <button
            onClick={() => setSelectedFilter('liturgy-sacraments')}
            className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold transition-all cursor-pointer ${
              selectedFilter === 'liturgy-sacraments'
                ? 'bg-[#8C6239] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200'
            }`}
          >
            Mass & Adoration
          </button>
          <button
            onClick={() => setSelectedFilter('penance-charity')}
            className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold transition-all cursor-pointer ${
              selectedFilter === 'penance-charity'
                ? 'bg-[#8C6239] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200'
            }`}
          >
            Holy Souls & Charity
          </button>
        </div>

        <button
          onClick={() => setIsAddingCustom(!isAddingCustom)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white hover:bg-stone-50 border border-[#D5C2A5] text-[#8C6239] text-xs font-cinzel font-bold transition-all cursor-pointer self-start sm:self-auto shadow-2xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Custom Prayer</span>
        </button>
      </div>

      {/* Add Custom Item Form */}
      {isAddingCustom && (
        <form onSubmit={handleAddCustomItem} className="p-4 rounded-xl bg-white border border-[#DFCBB0] shadow-sm space-y-3 animate-fadeIn">
          <div className="font-cinzel text-xs font-bold text-[#8C6239] uppercase">
            Add Custom Spiritual Activity (Tailored to your health & circumstances)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={customItemTitle}
              onChange={(e) => setCustomItemTitle(e.target.value)}
              placeholder="E.g., Litany of St. Joseph, 7 Penitential Psalms..."
              className="px-3.5 py-2 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:ring-1 focus:ring-[#8C6239] font-serif"
              required
            />
            <input
              type="text"
              value={customItemSubtitle}
              onChange={(e) => setCustomItemSubtitle(e.target.value)}
              placeholder="Description or intention (optional)..."
              className="px-3.5 py-2 text-xs rounded-lg border border-stone-300 focus:outline-hidden focus:ring-1 focus:ring-[#8C6239] font-serif"
            />
          </div>
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddingCustom(false)}
              className="px-3 py-1 text-xs text-stone-500 hover:text-stone-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-lg bg-[#8C6239] hover:bg-[#724e2c] text-white text-xs font-cinzel font-bold shadow-xs cursor-pointer"
            >
              Add to My Checklist
            </button>
          </div>
        </form>
      )}

      {/* Interactive Checklist Cards */}
      <div className="space-y-3">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={`p-4 sm:p-5 rounded-xl border transition-all cursor-pointer flex items-start gap-4 ${
              item.completed 
                ? 'bg-[#F9F7F4] border-stone-300 text-stone-500 opacity-80' 
                : 'bg-white hover:bg-[#FFFCF7] border-[#E8DCC8] shadow-2xs hover:shadow-xs'
            }`}
          >
            <button 
              type="button"
              className="mt-0.5 text-stone-400 hover:text-[#8C6239] transition-colors shrink-0"
              aria-label={item.completed ? 'Mark incomplete' : 'Mark complete'}
            >
              {item.completed ? (
                <CheckCircle2 className="w-6 h-6 text-[#8C6239]" />
              ) : (
                <Circle className="w-6 h-6 text-stone-300 hover:text-[#8C6239]" />
              )}
            </button>

            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h4 className={`font-serif text-base sm:text-lg font-bold leading-snug ${
                  item.completed ? 'line-through text-stone-500' : 'text-stone-900'
                }`}>
                  {item.title}
                </h4>

                <div className="flex items-center gap-2 shrink-0">
                  {item.recommendedTime && (
                    <span className="text-[11px] font-sans px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 font-medium">
                      {item.recommendedTime}
                    </span>
                  )}
                  {item.indulgenceNote && (
                    <span className="text-[10px] font-serif font-bold px-2 py-0.5 rounded-full bg-[#FAF0D9] text-[#8C6239] border border-[#E8D2A3]">
                      {item.indulgenceNote}
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
                  e.stopPropagation();
                  deleteCustomItem(item.id);
                }}
                className="p-1.5 text-stone-300 hover:text-red-600 rounded-md transition-colors"
                title="Remove custom item"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};
