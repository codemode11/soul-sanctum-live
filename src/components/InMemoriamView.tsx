import React, { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Calendar,
  MapPin,
  HeartHandshake,
  Sparkles,
  Trash2
} from 'lucide-react';
import { HolyWaterIcon } from './SanctumIcons';
import { SacredReader } from '../utils/speech';

export type DeceasedCategory = 'priest' | 'seminarian' | 'laity';

export interface MemoriamEntry {
  id: string;
  name: string;
  category: DeceasedCategory;
  roleOrAffiliation: string;
  dioceseOrCommunity: string;
  dateOfPassing: string;
  yearsOfLife: string;
  shortEulogy: string;
  communityPrayerRequest: string;
  prayersOfferedCount: number;
  isCustom?: boolean;
}

const CATEGORY_LABELS: Record<DeceasedCategory, { singular: string; plural: string; badgeClass: string }> = {
  priest: {
    singular: 'Priest',
    plural: 'Priests & Clergy',
    badgeClass: 'bg-[#5C3A1E] text-amber-100 border-[#8B5A2B]'
  },
  seminarian: {
    singular: 'Former Seminarian',
    plural: 'Former Seminarians',
    badgeClass: 'bg-[#1E3A5F] text-sky-100 border-[#3B6998]'
  },
  laity: {
    singular: 'Member of the Laity',
    plural: 'Members of the Laity',
    badgeClass: 'bg-[#4A3B2C] text-stone-100 border-[#7A6248]'
  }
};

const DEFAULT_MEMORIAM_ENTRIES: MemoriamEntry[] = [
  // PRIESTS
  {
    id: 'mem-priest-1',
    name: 'Rev. Msgr. Cristobal Garcia',
    category: 'priest',
    roleOrAffiliation: 'Priest of the Archdiocese of Cebu • Liturgist & Devotee of the Santo Niño',
    dioceseOrCommunity: 'Archdiocese of Cebu',
    dateOfPassing: 'Recent Commemoration',
    yearsOfLife: '48 Years in the Sacred Priesthood',
    shortEulogy:
      'A devoted shepherd of souls and tireless promoter of sacred liturgy, Eucharistic reverence, and filial devotion to the Señor Santo Niño de Cebu. Throughout decades of priestly ministry, he nourished countless faithful through the beauty of the Church’s liturgical heritage, generous charity to the poor, and steadfast fidelity to the altar.',
    communityPrayerRequest:
      'We earnestly ask the Soul Sanctum community to offer a Hail Mary, the Requiem Aeternam, or your next Holy Communion for the eternal repose of his priestly soul, that Christ the High Priest may welcome him into the heavenly sanctuary.',
    prayersOfferedCount: 148
  },
  {
    id: 'mem-priest-2',
    name: 'Rev. Fr. Patricio "Ponce" Alcazaren',
    category: 'priest',
    roleOrAffiliation: 'Senior Diocesan Priest & Beloved Parish Pastor',
    dioceseOrCommunity: 'Archdiocese of Cebu',
    dateOfPassing: 'Recent Commemoration',
    yearsOfLife: 'Over 50 Years of Priestly Service',
    shortEulogy:
      'Remembered with deep affection for his gentle fatherly counsel in the confessional, his unfailing availability to the sick and dying, and his humble, joyful preaching of the Gospel. He poured out his life quietly at the service of parish families and young vocations.',
    communityPrayerRequest:
      'Brothers and sisters, please pray for the repose of Fr. Ponce’s soul: "O God, who didst raise Thy servant to the dignity of the priesthood, grant that he may be joined forever to the fellowship of Thine apostles in heaven."',
    prayersOfferedCount: 132
  },
  {
    id: 'mem-priest-3',
    name: 'Rev. Fr. Gustavo Gutiérrez, O.P.',
    category: 'priest',
    roleOrAffiliation: 'Dominican Priest & Theologian of Christian Charity for the Poor',
    dioceseOrCommunity: 'Order of Preachers (Dominicans)',
    dateOfPassing: 'October 2024',
    yearsOfLife: '1928 – 2024 (Aged 96)',
    shortEulogy:
      'A son of St. Dominic whose priestly heart remained anchored in prayer, contemplation, and Christ’s preferential love for the poorest and most forgotten. His life bore witness that true theology springs from union with God and compassionate service to suffering humanity.',
    communityPrayerRequest:
      'Please unite in prayer for the repose of his soul, asking the Lord of Mercy to grant him the reward promised to those who feed the hungry and console the afflicted.',
    prayersOfferedCount: 119
  },

  // FORMER SEMINARIANS
  {
    id: 'mem-sem-1',
    name: 'Bro. Jose Maria "Jomari" Villamor',
    category: 'seminarian',
    roleOrAffiliation: 'Former Seminarian • San Carlos Seminary College Alumni Fraternity',
    dioceseOrCommunity: 'Cebu / San Carlos Seminary Community',
    dateOfPassing: 'Recent Commemoration',
    yearsOfLife: 'Faithful Brother, Husband, Father & Lay Catechist',
    shortEulogy:
      'Formed in the seminary halls in the spirit of prayer, study, and brotherhood, Bro. Jomari carried his seminary formation into family life and parish apostolate. He remained a pillar of his batchmates, always ready to lead the Rosary at wakes, mentor altar servers, and support indigent seminarians.',
    communityPrayerRequest:
      'The fraternity of former seminarians and his bereaved family ask the community to pray for the eternal rest of Bro. Jomari’s soul and for the consolation of his wife and children.',
    prayersOfferedCount: 114
  },
  {
    id: 'mem-sem-2',
    name: 'Bro. Rafael Antonio "Raffy" Solon',
    category: 'seminarian',
    roleOrAffiliation: 'Former Philosophy & Theology Seminarian • Choir Director & Educator',
    dioceseOrCommunity: 'Seminary Alumni Association',
    dateOfPassing: 'Recent Commemoration',
    yearsOfLife: 'Devoted Teacher of Philosophy & Sacred Music',
    shortEulogy:
      'Though God called him from the seminary to the vocation of Christian education, Bro. Raffy never lost his love for the Liturgy of the Hours, Gregorian chant, and St. Thomas Aquinas. Generation after generation of students learned from him how to love truth and serve the Church with humility.',
    communityPrayerRequest:
      'Please offer the Eternal Rest prayer for Bro. Raffy, that he who taught so many to sing God’s praises on earth may now join the choirs of angels in heaven.',
    prayersOfferedCount: 98
  },

  // MEMBERS OF THE LAITY
  {
    id: 'mem-laity-1',
    name: 'Lourdes "Nanay Odeng" del Rosario',
    category: 'laity',
    roleOrAffiliation: '24-Hour Eucharistic Adorer & Legion of Mary Praesidium President',
    dioceseOrCommunity: 'Lay Faithful • Parish Adoration Apostolate',
    dateOfPassing: 'Recent Commemoration',
    yearsOfLife: '82 Years of Devoted Christian Life',
    shortEulogy:
      'For over four decades, Nanay Odeng kept faithful dawn vigil before the Most Blessed Sacrament and visited the homebound with her Rosary in hand. Her quiet smile,worn prayer book, and maternal kindness brought the warmth of Our Lady to everyone in the parish.',
    communityPrayerRequest:
      'We ask the community to pray one decade of the Holy Rosary or the Requiem prayer for Nanay Odeng’s soul, that the Blessed Virgin Mary whom she served so faithfully may present her to Jesus.',
    prayersOfferedCount: 164
  },
  {
    id: 'mem-laity-2',
    name: 'Engr. Eduardo "Tito Eddie" Montebon',
    category: 'laity',
    roleOrAffiliation: 'Knight of Columbus & Extraordinary Minister of Holy Communion',
    dioceseOrCommunity: 'Lay Faithful • Domestic Church & Parish Council',
    dateOfPassing: 'Recent Commemoration',
    yearsOfLife: '74 Years of Service to Family & Church',
    shortEulogy:
      'A man of integrity, quiet generosity, and deep Eucharistic faith. Every Sunday morning before dawn, Tito Eddie prepared the sanctuary and later brought Holy Communion to the sick and elderly who could no longer come to church, living out the Gospel through deeds of mercy.',
    communityPrayerRequest:
      'Please remember Tito Eddie in your daily prayers and Rosary intentions, asking Our Lord to grant him eternal light, peace, and the fullness of the Resurrection.',
    prayersOfferedCount: 127
  }
];

export const InMemoriamView: React.FC = () => {
  const STORAGE_KEY = 'sanctum_in_memoriam_entries_v1';
  const PRAYED_IDS_KEY = 'sanctum_in_memoriam_prayed_ids_v1';

  const [entries, setEntries] = useState<MemoriamEntry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return DEFAULT_MEMORIAM_ENTRIES;
  });

  const [prayedIds, setPrayedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(PRAYED_IDS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  const [selectedFilter, setSelectedFilter] = useState<'all' | DeceasedCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [readingEntryId, setReadingEntryId] = useState<string | null>(null);
  const [copiedEntryId, setCopiedEntryId] = useState<string | null>(null);
  const [isAddingMemorial, setIsAddingMemorial] = useState(false);

  // New Memorial Form State
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<DeceasedCategory>('priest');
  const [newRole, setNewRole] = useState('');
  const [newCommunity, setNewCommunity] = useState('');
  const [newDateOfPassing, setNewDateOfPassing] = useState('');
  const [newYearsOfLife, setNewYearsOfLife] = useState('');
  const [newEulogy, setNewEulogy] = useState('');
  const [newPrayerRequest, setNewPrayerRequest] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    } catch {
      // ignore
    }
  }, [entries]);

  useEffect(() => {
    try {
      localStorage.setItem(PRAYED_IDS_KEY, JSON.stringify(prayedIds));
    } catch {
      // ignore
    }
  }, [prayedIds]);

  useEffect(() => {
    return () => {
      SacredReader.stop();
    };
  }, []);

  const handleOfferPrayerForSoul = (id: string) => {
    if (prayedIds.includes(id)) return;
    setPrayedIds(prev => [...prev, id]);
    setEntries(prev =>
      prev.map(entry =>
        entry.id === id
          ? { ...entry, prayersOfferedCount: entry.prayersOfferedCount + 1 }
          : entry
      )
    );
  };

  const handleListenMemorial = (entry: MemoriamEntry) => {
    if (readingEntryId === entry.id) {
      SacredReader.stop();
      setReadingEntryId(null);
      return;
    }
    const catLabel = CATEGORY_LABELS[entry.category].singular;
    const speechText = `In Memoriam. ${entry.name}, ${catLabel}. ${entry.roleOrAffiliation}. Eulogy: ${entry.shortEulogy} ... Prayer Request for the Community: ${entry.communityPrayerRequest} ... Eternal rest grant unto ${entry.name}, O Lord, and let perpetual light shine upon them. May their soul, and the souls of all the faithful departed, through the mercy of God, rest in peace. Amen.`;
    setReadingEntryId(entry.id);
    SacredReader.speak(speechText, () => setReadingEntryId(null), 'female', 0.85);
  };

  const handleCopyMemorial = (entry: MemoriamEntry) => {
    const text = `IN MEMORIAM — ${entry.name.toUpperCase()}
(${CATEGORY_LABELS[entry.category].singular} • ${entry.roleOrAffiliation})
${entry.dioceseOrCommunity} | ${entry.yearsOfLife}

SHORT EULOGY:
${entry.shortEulogy}

REQUEST FOR COMMUNITY PRAYER:
${entry.communityPrayerRequest}

Requiem aeternam dona eis, Domine, et lux perpetua luceat eis. Requiescant in pace. Amen.`;

    navigator.clipboard.writeText(text);
    setCopiedEntryId(entry.id);
    setTimeout(() => setCopiedEntryId(null), 2200);
  };

  const handleAddMemorial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEulogy.trim()) return;

    const entry: MemoriamEntry = {
      id: `mem-custom-${Date.now()}`,
      name: newName.trim(),
      category: newCategory,
      roleOrAffiliation:
        newRole.trim() ||
        (newCategory === 'priest'
          ? 'Catholic Priest'
          : newCategory === 'seminarian'
            ? 'Former Seminarian'
            : 'Member of the Lay Faithful'),
      dioceseOrCommunity: newCommunity.trim() || 'Parish & Sanctum Community',
      dateOfPassing: newDateOfPassing.trim() || 'Recently Deceased',
      yearsOfLife: newYearsOfLife.trim() || 'Faithful Servant of Christ',
      shortEulogy: newEulogy.trim(),
      communityPrayerRequest:
        newPrayerRequest.trim() ||
        `Please pray for the eternal repose of the soul of ${newName.trim()}, that the Lord may grant forgiveness of sins and everlasting peace in heaven.`,
      prayersOfferedCount: 1,
      isCustom: true
    };

    setEntries(prev => [entry, ...prev]);
    setNewName('');
    setNewRole('');
    setNewCommunity('');
    setNewDateOfPassing('');
    setNewYearsOfLife('');
    setNewEulogy('');
    setNewPrayerRequest('');
    setIsAddingMemorial(false);
  };

  const handleDeleteCustomEntry = (id: string) => {
    setEntries(prev => prev.filter(e => e.id !== id));
  };

  const filteredEntries = entries.filter(entry => {
    if (selectedFilter !== 'all' && entry.category !== selectedFilter) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      entry.name.toLowerCase().includes(q) ||
      entry.roleOrAffiliation.toLowerCase().includes(q) ||
      entry.dioceseOrCommunity.toLowerCase().includes(q) ||
      entry.shortEulogy.toLowerCase().includes(q)
    );
  });

  const priestCount = entries.filter(e => e.category === 'priest').length;
  const seminarianCount = entries.filter(e => e.category === 'seminarian').length;
  const laityCount = entries.filter(e => e.category === 'laity').length;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-14 animate-fadeIn text-stone-900">
      
      {/* =====================================================================
          1. SOLEMN HEADER BANNER WITH HOLY WATER ICON & REQUIEM PRAYER
         ===================================================================== */}
      <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-br from-[#3B2618] via-[#2E1C10] to-[#1F1209] border border-[#8B5A2B]/70 shadow-[0_14px_38px_rgba(0,0,0,0.45)] space-y-5 text-amber-50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-amber-500/25 pb-5">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-400/50 flex items-center justify-center text-amber-300 shadow-md shrink-0">
              <HolyWaterIcon className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <span className="font-cinzel text-xs font-bold uppercase tracking-[0.2em] text-amber-300 block">
                Requiem Aeternam • Commemoration of the Faithful Departed
              </span>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white mt-0.5">
                In Memoriam
              </h2>
              <p className="text-xs sm:text-sm font-serif text-stone-200 mt-1 max-w-2xl leading-relaxed">
                Sacred remembrance and eulogies for our beloved <strong>priests</strong>, <strong>former seminarians</strong>, and <strong>members of the laity</strong> who have passed away recently—inviting the entire community to pray for the eternal repose of their souls.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsAddingMemorial(!isAddingMemorial)}
            className="px-4 py-2.5 rounded-xl bg-[#A67C52] hover:bg-[#8E6740] text-white border border-amber-300/50 font-cinzel text-xs font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2 self-start md:self-auto shrink-0 shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add Deceased to In Memoriam</span>
          </button>
        </div>

        {/* Traditional Rite of Commendation & Requiem Prayer Banner */}
        <div className="p-4 sm:p-5 rounded-xl bg-black/35 border border-amber-400/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1 font-serif">
            <div className="text-xs font-cinzel font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
              <HolyWaterIcon className="w-4 h-4 text-amber-300" />
              <span>Prayer of the Community for the Faithful Departed</span>
            </div>
            <p className="text-sm sm:text-base italic text-amber-50/95 leading-relaxed">
              &ldquo;Eternal rest grant unto them, O Lord, and let perpetual light shine upon them. May their souls and the souls of all the faithful departed, through the mercy of God, rest in peace. Amen.&rdquo;
            </p>
          </div>
          <div className="text-xs font-cinzel text-amber-200/90 shrink-0 sm:text-right border-t sm:border-t-0 sm:border-l border-amber-500/25 pt-2 sm:pt-0 sm:pl-4">
            <span className="block font-bold text-amber-300">2 Maccabees 12:46</span>
            <span className="font-serif italic text-[11px] text-stone-300 block mt-0.5">
              &ldquo;It is a holy and wholesome thought to pray for the dead, that they may be loosed from sins.&rdquo;
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================================
          2. ADD NEW MEMORIAL FORM (PRIEST, FORMER SEMINARIAN, OR LAITY)
         ===================================================================== */}
      {isAddingMemorial && (
        <form
          onSubmit={handleAddMemorial}
          className="rounded-2xl p-6 bg-[#FAF5EC] border-2 border-[#8B5A2B]/50 shadow-md space-y-4 animate-fadeIn"
        >
          <div className="flex items-center justify-between border-b border-[#D8C3A5] pb-3">
            <div className="flex items-center gap-2">
              <HolyWaterIcon className="w-5 h-5 text-[#6B4628]" />
              <h3 className="font-cinzel text-base sm:text-lg font-bold text-[#24140B]">
                Inscribe a Deceased Priest, Former Seminarian, or Layperson
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setIsAddingMemorial(false)}
              className="text-xs font-serif text-stone-600 hover:text-stone-900 cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-cinzel text-xs font-bold text-[#3A2213] uppercase mb-1">
                Full Name of the Deceased *
              </label>
              <input
                type="text"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder="e.g., Rev. Fr. Juan dela Cruz / Bro. Marco..."
                className="w-full px-3.5 py-2 rounded-lg bg-white border border-[#C8AD8D] text-sm font-serif text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-[#6B4628]"
                required
              />
            </div>

            <div>
              <label className="block font-cinzel text-xs font-bold text-[#3A2213] uppercase mb-1">
                State in Life / Category *
              </label>
              <select
                value={newCategory}
                onChange={e => setNewCategory(e.target.value as DeceasedCategory)}
                className="w-full px-3.5 py-2 rounded-lg bg-white border border-[#C8AD8D] text-sm font-serif text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-[#6B4628]"
              >
                <option value="priest">Priest / Clergy</option>
                <option value="seminarian">Former Seminarian</option>
                <option value="laity">Member of the Laity</option>
              </select>
            </div>

            <div>
              <label className="block font-cinzel text-xs font-bold text-[#3A2213] uppercase mb-1">
                Date of Passing / Years of Service
              </label>
              <input
                type="text"
                value={newDateOfPassing}
                onChange={e => setNewDateOfPassing(e.target.value)}
                placeholder="e.g., October 2026 • Aged 78"
                className="w-full px-3.5 py-2 rounded-lg bg-white border border-[#C8AD8D] text-sm font-serif text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-[#6B4628]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-cinzel text-xs font-bold text-[#3A2213] uppercase mb-1">
                Ministry, Seminary Batch, or Lay Apostolate
              </label>
              <input
                type="text"
                value={newRole}
                onChange={e => setNewRole(e.target.value)}
                placeholder="e.g., Parish Priest / San Carlos Seminary Batch '88 / Catechist"
                className="w-full px-3.5 py-2 rounded-lg bg-white border border-[#C8AD8D] text-sm font-serif text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-[#6B4628]"
              />
            </div>

            <div>
              <label className="block font-cinzel text-xs font-bold text-[#3A2213] uppercase mb-1">
                Diocese, Seminary, or Parish Community
              </label>
              <input
                type="text"
                value={newCommunity}
                onChange={e => setNewCommunity(e.target.value)}
                placeholder="e.g., Archdiocese of Cebu"
                className="w-full px-3.5 py-2 rounded-lg bg-white border border-[#C8AD8D] text-sm font-serif text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-[#6B4628]"
              />
            </div>
          </div>

          <div>
            <label className="block font-cinzel text-xs font-bold text-[#3A2213] uppercase mb-1">
              Short Eulogy (Life, Ministry, Virtue &amp; Christian Witness) *
            </label>
            <textarea
              rows={3}
              value={newEulogy}
              onChange={e => setNewEulogy(e.target.value)}
              placeholder="Write a brief, reverent eulogy honoring their priestly ministry, seminary brotherhood, or lay Christian witness..."
              className="w-full px-3.5 py-2 rounded-lg bg-white border border-[#C8AD8D] text-sm font-serif text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-[#6B4628]"
              required
            />
          </div>

          <div>
            <label className="block font-cinzel text-xs font-bold text-[#3A2213] uppercase mb-1">
              Request for the Community to Pray for the Soul of the Deceased
            </label>
            <textarea
              rows={2}
              value={newPrayerRequest}
              onChange={e => setNewPrayerRequest(e.target.value)}
              placeholder="e.g., We ask the community to offer a Hail Mary and the Eternal Rest prayer for the repose of his/her soul..."
              className="w-full px-3.5 py-2 rounded-lg bg-white border border-[#C8AD8D] text-sm font-serif text-stone-900 focus:outline-hidden focus:ring-1 focus:ring-[#6B4628]"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsAddingMemorial(false)}
              className="px-4 py-2 rounded-lg text-xs font-serif text-stone-600 hover:bg-stone-200/60 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#5C3A1E] hover:bg-[#462B16] text-amber-50 font-cinzel text-xs font-bold shadow-xs cursor-pointer"
            >
              Publish to In Memoriam
            </button>
          </div>
        </form>
      )}

      {/* =====================================================================
          3. CATEGORY FILTER TABS & SEARCH BAR
         ===================================================================== */}
      <div className="rounded-xl p-4 bg-[#EFE5D6] border border-[#C8AD8D] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 shadow-xs">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedFilter('all')}
            className={`px-3.5 py-2 rounded-lg text-xs font-cinzel font-bold transition-all cursor-pointer border ${
              selectedFilter === 'all'
                ? 'bg-[#3B2618] text-amber-100 border-[#24140B] shadow-xs'
                : 'bg-white hover:bg-stone-50 text-[#3B2618] border-[#C8AD8D]'
            }`}
          >
            All Faithful Departed ({entries.length})
          </button>

          <button
            type="button"
            onClick={() => setSelectedFilter('priest')}
            className={`px-3.5 py-2 rounded-lg text-xs font-cinzel font-bold transition-all cursor-pointer border ${
              selectedFilter === 'priest'
                ? 'bg-[#5C3A1E] text-amber-100 border-[#3B2618] shadow-xs'
                : 'bg-white hover:bg-stone-50 text-[#3B2618] border-[#C8AD8D]'
            }`}
          >
            Priests ({priestCount})
          </button>

          <button
            type="button"
            onClick={() => setSelectedFilter('seminarian')}
            className={`px-3.5 py-2 rounded-lg text-xs font-cinzel font-bold transition-all cursor-pointer border ${
              selectedFilter === 'seminarian'
                ? 'bg-[#1E3A5F] text-sky-100 border-[#152943] shadow-xs'
                : 'bg-white hover:bg-stone-50 text-[#1E3A5F] border-[#C8AD8D]'
            }`}
          >
            Former Seminarians ({seminarianCount})
          </button>

          <button
            type="button"
            onClick={() => setSelectedFilter('laity')}
            className={`px-3.5 py-2 rounded-lg text-xs font-cinzel font-bold transition-all cursor-pointer border ${
              selectedFilter === 'laity'
                ? 'bg-[#4A3B2C] text-stone-100 border-[#2E241A] shadow-xs'
                : 'bg-white hover:bg-stone-50 text-[#4A3B2C] border-[#C8AD8D]'
            }`}
          >
            Members of the Laity ({laityCount})
          </button>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-[#7A5B42] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search name, parish, seminary..."
            className="w-full pl-9 pr-3.5 py-2 rounded-lg bg-white border border-[#C8AD8D] text-xs sm:text-sm font-serif text-stone-900 placeholder-[#8C6F58] focus:outline-hidden focus:border-[#5C3A1E]"
          />
        </div>
      </div>

      {/* =====================================================================
          4. MEMORIAL CARDS: SHORT EULOGY + REQUEST FOR COMMUNITY PRAYER
         ===================================================================== */}
      <div className="space-y-5">
        {filteredEntries.map(entry => {
          const catMeta = CATEGORY_LABELS[entry.category];
          const hasPrayed = prayedIds.includes(entry.id);
          const isReading = readingEntryId === entry.id;
          const isCopied = copiedEntryId === entry.id;

          return (
            <article
              key={entry.id}
              className="rounded-2xl bg-[#FAF5EC] border border-[#D5C2A5] shadow-sm overflow-hidden transition-all hover:shadow-md"
            >
              {/* Top Memorial Header Bar */}
              <div className="px-5 py-4 sm:px-7 sm:py-5 bg-gradient-to-r from-[#EFE4D4] via-[#E8D9C4] to-[#EFE4D4] border-b border-[#D5C2A5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-cinzel font-bold uppercase tracking-wider border ${catMeta.badgeClass}`}>
                      {catMeta.singular}
                    </span>
                    <span className="text-xs font-serif font-semibold text-[#5C3A1E] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#7A4E1D]" />
                      <span>{entry.dioceseOrCommunity}</span>
                    </span>
                    <span className="text-stone-400">•</span>
                    <span className="text-xs font-serif text-stone-700 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#7A4E1D]" />
                      <span>{entry.yearsOfLife}</span>
                    </span>
                  </div>

                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#24140B] flex items-center gap-2">
                    <span>† {entry.name}</span>
                  </h3>
                  <p className="text-xs sm:text-sm font-serif font-semibold text-[#6B4628]">
                    {entry.roleOrAffiliation}
                  </p>
                </div>

                {/* Listen & Copy Controls */}
                <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                  <button
                    type="button"
                    onClick={() => handleListenMemorial(entry)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
                      isReading
                        ? 'bg-[#5C3A1E] text-amber-100 border-amber-400 animate-pulse'
                        : 'bg-white hover:bg-stone-50 text-[#5C3A1E] border-[#C8AD8D]'
                    }`}
                    title={isReading ? 'Stop Audio' : 'Listen to Eulogy & Prayer'}
                    aria-label={isReading ? 'Stop Audio' : 'Listen to Eulogy & Prayer'}
                  >
                    {isReading ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopyMemorial(entry)}
                    className="p-2.5 rounded-xl bg-white hover:bg-stone-50 text-[#5C3A1E] border border-[#C8AD8D] transition-all cursor-pointer flex items-center justify-center"
                    title="Copy Eulogy and Prayer Request"
                    aria-label="Copy Eulogy and Prayer Request"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                  </button>

                  {entry.isCustom && (
                    <button
                      type="button"
                      onClick={() => handleDeleteCustomEntry(entry.id)}
                      className="p-2.5 rounded-xl bg-white hover:bg-red-50 text-stone-400 hover:text-red-700 border border-[#C8AD8D] transition-all cursor-pointer"
                      title="Remove custom memorial"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Body: Short Eulogy & Community Prayer Request */}
              <div className="p-5 sm:p-7 space-y-5 bg-white">
                {/* 1. Short Eulogy */}
                <div className="space-y-1.5">
                  <div className="font-cinzel text-xs font-bold uppercase tracking-widest text-[#7A5230]">
                    Short Eulogy &amp; Remembrance
                  </div>
                  <p className="font-serif text-sm sm:text-base md:text-[17px] text-stone-800 leading-relaxed">
                    {entry.shortEulogy}
                  </p>
                </div>

                {/* 2. Request for the Community to Pray for the Soul of the Deceased */}
                <div className="p-4 sm:p-5 rounded-xl bg-[#F7F0E4] border border-[#DFCBB0] space-y-3">
                  <div className="flex items-center gap-2 text-[#5C3A1E]">
                    <HolyWaterIcon className="w-4 h-4 text-[#6B4628] shrink-0" />
                    <span className="font-cinzel text-xs font-bold uppercase tracking-wider">
                      Request for the Community to Pray for This Soul
                    </span>
                  </div>

                  <p className="font-serif text-sm sm:text-base text-[#2E1B0E] italic leading-relaxed">
                    {entry.communityPrayerRequest}
                  </p>

                  {/* Interactive Community Prayer Action Bar */}
                  <div className="pt-2 border-t border-[#E5D5BE] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="text-xs font-serif text-[#5C3A1E]">
                      <strong className="font-cinzel text-sm text-[#3B2618]">{entry.prayersOfferedCount}</strong>{' '}
                      members of the community have offered a prayer for the soul of <strong>{entry.name}</strong>.
                    </div>

                    <button
                      type="button"
                      onClick={() => handleOfferPrayerForSoul(entry.id)}
                      disabled={hasPrayed}
                      className={`px-4 py-2 rounded-xl font-cinzel text-xs font-bold transition-all flex items-center justify-center gap-2 shrink-0 ${
                        hasPrayed
                          ? 'bg-emerald-800 text-emerald-50 border border-emerald-600 cursor-default'
                          : 'bg-[#5C3A1E] hover:bg-[#422813] text-amber-100 border border-[#8B5A2B] cursor-pointer shadow-xs'
                      }`}
                    >
                      <HolyWaterIcon className="w-4 h-4" />
                      <span>
                        {hasPrayed
                          ? 'Requiem Prayer Offered (Amen)'
                          : 'Pray for This Soul (Requiem Aeternam)'}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

    </div>
  );
};
