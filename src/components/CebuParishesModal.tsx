import React, { useState, useMemo } from 'react';
import { 
  X, 
  Church, 
  Clock, 
  MapPin, 
  Search, 
  Sparkles, 
  Calendar, 
  Phone, 
  Check, 
  Copy, 
  ShieldCheck, 
  ChevronRight, 
  ChevronLeft,
  BookOpen, 
  Heart, 
  Flame, 
  Filter,
  Share2,
  Compass,
  Award,
  Sun,
  Moon
} from 'lucide-react';
import { CEBU_CITY_PARISHES, ParishSchedule } from '../data/cebuParishes';

interface CebuParishesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ScheduleTab = 'all' | 'sunday' | 'weekday' | 'confession' | 'adoration';
type ParishFilter = 'all' | 'confession' | 'adoration-247' | 'shrines';

export const CebuParishesModal: React.FC<CebuParishesModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParishId, setSelectedParishId] = useState<string>(CEBU_CITY_PARISHES[0].id);
  const [activeScheduleTab, setActiveScheduleTab] = useState<ScheduleTab>('all');
  const [parishFilter, setParishFilter] = useState<ParishFilter>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [copiedSlotKey, setCopiedSlotKey] = useState<string | null>(null);
  const [showConfessionGuide, setShowConfessionGuide] = useState(false);

  // Determine current day of week (0 = Sunday, 1..6 = Mon..Sat)
  const todayDayOfWeek = useMemo(() => new Date().getDay(), []);
  const isSundayToday = todayDayOfWeek === 0;

  const selectedParish = useMemo(() => {
    return CEBU_CITY_PARISHES.find(p => p.id === selectedParishId) || CEBU_CITY_PARISHES[0];
  }, [selectedParishId]);

  const selectedParishIndex = useMemo(() => {
    return CEBU_CITY_PARISHES.findIndex(p => p.id === selectedParish.id);
  }, [selectedParish.id]);

  const filteredParishes = useMemo(() => {
    return CEBU_CITY_PARISHES.filter(parish => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        parish.name.toLowerCase().includes(q) ||
        (parish.popularName && parish.popularName.toLowerCase().includes(q)) ||
        parish.address.toLowerCase().includes(q) ||
        parish.patronSaint.toLowerCase().includes(q) ||
        parish.sundayMasses.some(m => m.language.toLowerCase().includes(q) || (m.notes && m.notes.toLowerCase().includes(q))) ||
        parish.dailyMasses.some(m => m.language.toLowerCase().includes(q) || (m.notes && m.notes.toLowerCase().includes(q))) ||
        parish.confessionSchedule.some(c => c.toLowerCase().includes(q));

      if (!matchesSearch) return false;

      if (parishFilter === 'confession') {
        return parish.confessionSchedule.some(c => 
          c.toLowerCase().includes('daily') || 
          c.toLowerCase().includes('monday to saturday') ||
          c.toLowerCase().includes('saturdays')
        );
      }
      if (parishFilter === 'adoration-247') {
        return parish.adorationChapelHours.toLowerCase().includes('24');
      }
      if (parishFilter === 'shrines') {
        return (
          parish.name.toLowerCase().includes('basilica') || 
          parish.name.toLowerCase().includes('shrine') || 
          parish.popularName?.toLowerCase().includes('shrine') ||
          parish.name.toLowerCase().includes('cathedral')
        );
      }
      return true;
    });
  }, [searchQuery, parishFilter]);

  if (!isOpen) return null;

  const handleCopySlot = (slotKey: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSlotKey(slotKey);
    setTimeout(() => setCopiedSlotKey(null), 2000);
  };

  const handleCopySchedule = (parish: ParishSchedule) => {
    const text = `HOLY MASS & CONFESSION SCHEDULE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sanctuary: ${parish.name}
${parish.popularName ? `Title: ${parish.popularName}\n` : ''}Address: ${parish.address}
Patron Saint: ${parish.patronSaint}
Feast Day: ${parish.feastDay}
${parish.contactNumber ? `Contact Office: ${parish.contactNumber}\n` : ''}
✦ SUNDAY HOLY MASSES:
${parish.sundayMasses.map(m => `  • ${m.time} — ${m.language}${m.notes ? ` (${m.notes})` : ''}`).join('\n')}

✦ WEEKDAY HOLY MASSES (Monday–Saturday):
${parish.dailyMasses.map(m => `  • ${m.time} — ${m.language}${m.notes ? ` (${m.notes})` : ''}`).join('\n')}

✦ SACRAMENT OF RECONCILIATION (CONFESSION):
${parish.confessionSchedule.map(c => `  • ${c}`).join('\n')}

✦ EUCHARISTIC ADORATION CHAPEL:
  • ${parish.adorationChapelHours}
${parish.notes ? `\n✦ PATRON FEAST & NOTES:\n  ${parish.notes}\n` : ''}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Archdiocese of Cebu • Catholic Ecclesiastical Directory`;

    navigator.clipboard.writeText(text);
    setCopiedId(parish.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handlePrevParish = () => {
    const nextIdx = (selectedParishIndex - 1 + CEBU_CITY_PARISHES.length) % CEBU_CITY_PARISHES.length;
    setSelectedParishId(CEBU_CITY_PARISHES[nextIdx].id);
  };

  const handleNextParish = () => {
    const nextIdx = (selectedParishIndex + 1) % CEBU_CITY_PARISHES.length;
    setSelectedParishId(CEBU_CITY_PARISHES[nextIdx].id);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-stone-950/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-6xl max-h-[94vh] flex flex-col rounded-2xl bg-[#EDE4D8] border-2 border-[#8B5A2B]/40 shadow-[0_25px_80px_rgba(0,0,0,0.7)] text-[#2B1B12] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Liturgical Gold Border Accent */}
        <div className="h-2 w-full bg-gradient-to-r from-[#6B3E1E] via-[#D4AF37] to-[#6B3E1E] shadow-xs" />

        {/* Dignified Altar Directory Header */}
        <div className="p-4 sm:p-5 md:px-7 md:py-5 border-b border-[#8B5A2B]/25 bg-gradient-to-r from-[#2F1A0E] via-[#482813] to-[#2F1A0E] text-amber-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 sm:p-3 rounded-xl bg-gradient-to-b from-[#A07040] to-[#5C3418] text-amber-100 border border-[#D4AF37]/50 shadow-md shrink-0">
              <Church className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-cinzel text-[11px] sm:text-xs font-bold text-amber-300 tracking-wider uppercase bg-[#381F10]/90 px-2 py-0.5 rounded border border-[#D4AF37]/40 shadow-2xs">
                  Archdiocese of Cebu • Philippines
                </span>
                <span className="text-amber-200/60 text-xs hidden sm:inline">•</span>
                <span className="text-amber-100/90 text-xs font-serif hidden sm:inline">
                  Ecclesiastical Directory of Sanctuaries
                </span>
              </div>
              <h2 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-wide mt-0.5 flex items-center gap-2">
                <span>Holy Mass &amp; Confession Schedules</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Quick Today's Liturgy Badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3A2213] border border-[#8B5A2B]/50 text-xs font-serif text-amber-200">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Today: {isSundayToday ? 'Sunday Liturgy' : 'Weekday Liturgy'}</span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-amber-200/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border border-amber-200/20"
              aria-label="Close"
              title="Close Schedule Directory"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>

        {/* Search & Characteristic Filters Strip */}
        <div className="p-3.5 sm:p-4 bg-[#E3D6C6] border-b border-[#8B5A2B]/20 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7C5A40]" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search parish, Sto. Niño, Cathedral, Redemptorist, street, or patron..."
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-white border border-[#8B5A2B]/40 text-sm sm:text-base text-[#24140B] placeholder-[#8C6F58] focus:outline-none focus:border-[#6B3E1E] focus:ring-1 focus:ring-[#6B3E1E] shadow-2xs font-serif"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 p-0.5 cursor-pointer"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Category Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 pb-1 md:pb-0">
            <button
              onClick={() => setParishFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-serif transition-all cursor-pointer whitespace-nowrap shadow-2xs ${
                parishFilter === 'all'
                  ? 'bg-[#3A2213] text-amber-50 font-bold border border-[#24140B]'
                  : 'bg-white text-[#4A2E1B] hover:bg-stone-50 border border-[#8B5A2B]/30'
              }`}
            >
              All Parishes ({CEBU_CITY_PARISHES.length})
            </button>

            <button
              onClick={() => setParishFilter('confession')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-serif transition-all cursor-pointer whitespace-nowrap shadow-2xs flex items-center gap-1.5 ${
                parishFilter === 'confession'
                  ? 'bg-purple-900 text-purple-100 font-bold border border-purple-950'
                  : 'bg-white text-purple-950 hover:bg-purple-50/50 border border-purple-300/60'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
              <span>Daily Confession</span>
            </button>

            <button
              onClick={() => setParishFilter('adoration-247')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-serif transition-all cursor-pointer whitespace-nowrap shadow-2xs flex items-center gap-1.5 ${
                parishFilter === 'adoration-247'
                  ? 'bg-amber-900 text-amber-100 font-bold border border-amber-950'
                  : 'bg-white text-amber-950 hover:bg-amber-50/50 border border-amber-300/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>24/7 Adoration</span>
            </button>

            <button
              onClick={() => setParishFilter('shrines')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-serif transition-all cursor-pointer whitespace-nowrap shadow-2xs flex items-center gap-1.5 ${
                parishFilter === 'shrines'
                  ? 'bg-[#6B3E1E] text-amber-100 font-bold border border-[#4A2810]'
                  : 'bg-white text-[#4A2E1B] hover:bg-stone-50 border border-[#8B5A2B]/30'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-[#8B5A2B]" />
              <span>Major Shrines</span>
            </button>
          </div>

        </div>

        {/* Mobile Compact Parish Selector Bar */}
        <div className="md:hidden px-3.5 py-2.5 bg-[#DDCBB8] border-b border-[#8B5A2B]/20 flex items-center justify-between gap-2">
          <button
            onClick={handlePrevParish}
            className="p-1.5 rounded-lg bg-white text-[#341D10] border border-[#8B5A2B]/30 hover:bg-stone-50 shadow-2xs cursor-pointer shrink-0"
            title="Previous Parish"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex-1 text-center min-w-0 px-1">
            <span className="text-[11px] font-cinzel text-[#7C5A40] uppercase font-bold block leading-none">
              Viewing Sanctuary ({selectedParishIndex + 1} of {CEBU_CITY_PARISHES.length})
            </span>
            <span className="font-cinzel text-xs sm:text-sm font-bold text-[#24140B] truncate block mt-0.5">
              {selectedParish.popularName || selectedParish.name}
            </span>
          </div>

          <button
            onClick={handleNextParish}
            className="p-1.5 rounded-lg bg-white text-[#341D10] border border-[#8B5A2B]/30 hover:bg-stone-50 shadow-2xs cursor-pointer shrink-0"
            title="Next Parish"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Main Body: Desktop Split View (Left: Parishes Directory, Right: Sacred Schedule) */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[#8B5A2B]/20">
          
          {/* Left Column: Parish Selection Directory (Desktop) */}
          <div className="hidden md:block md:col-span-4 p-3.5 space-y-2 max-h-[64vh] lg:max-h-[70vh] overflow-y-auto bg-[#E8DDD0]/70">
            <div className="px-1 py-1 flex items-center justify-between text-xs font-cinzel font-bold text-[#6D482F] uppercase tracking-wider">
              <span>Sanctuaries of Cebu ({filteredParishes.length})</span>
              <Compass className="w-3.5 h-3.5 text-[#8B5A2B]" />
            </div>

            {filteredParishes.length === 0 ? (
              <div className="text-center py-10 px-4 text-[#7A5B42] font-serif text-sm">
                No parishes found matching &quot;{searchQuery}&quot;.
              </div>
            ) : (
              filteredParishes.map(parish => {
                const isSelected = selectedParish.id === parish.id;
                const hasDailyConfession = parish.confessionSchedule.some(c => 
                  c.toLowerCase().includes('daily') || c.toLowerCase().includes('monday to saturday')
                );
                const hasPerpetualAdoration = parish.adorationChapelHours.toLowerCase().includes('24');
                const isShrineOrBasilica = parish.name.includes('Basilica') || parish.name.includes('Shrine') || parish.name.includes('Cathedral');

                return (
                  <button
                    key={parish.id}
                    onClick={() => setSelectedParishId(parish.id)}
                    className={`w-full text-left p-3 rounded-xl transition-all duration-150 cursor-pointer group flex items-start justify-between gap-2.5 ${
                      isSelected
                        ? 'bg-gradient-to-br from-[#381F10] to-[#24130A] text-white border-2 border-[#D4AF37] shadow-md ring-1 ring-[#D4AF37]/50'
                        : 'bg-white hover:bg-[#FAF6F0] text-[#341D10] border border-[#CBB5A0] shadow-2xs hover:border-[#8B5A2B]'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className={`font-cinzel text-sm font-bold block transition-colors truncate ${
                          isSelected ? 'text-white font-extrabold' : 'text-[#2D180B] group-hover:text-[#5C3214]'
                        }`}>
                          {parish.name}
                        </span>
                      </div>

                      {parish.popularName && (
                        <span className={`text-xs font-serif block truncate mt-0.5 ${
                          isSelected ? 'text-amber-200 font-semibold' : 'text-[#634835]'
                        }`}>
                          {parish.popularName}
                        </span>
                      )}

                      <div className={`flex items-center gap-1.5 text-[11px] mt-1.5 font-serif ${
                        isSelected ? 'text-amber-100/90' : 'text-[#7A5B42]'
                      }`}>
                        <MapPin className={`w-3 h-3 shrink-0 ${isSelected ? 'text-amber-300' : 'text-[#8C6D54]'}`} />
                        <span className="truncate">{parish.address}</span>
                      </div>

                      {/* Attribute Pills */}
                      <div className="flex flex-wrap items-center gap-1 mt-2">
                        {isShrineOrBasilica && (
                          <span className={`text-[9.5px] px-1.5 py-0.5 rounded font-cinzel font-semibold leading-none ${
                            isSelected 
                              ? 'bg-amber-400/20 text-amber-200 border border-amber-400/40' 
                              : 'bg-[#EAE0D3] text-[#5C3418] border border-[#D5C2B0]'
                          }`}>
                            Shrine
                          </span>
                        )}
                        {hasDailyConfession && (
                          <span className={`text-[9.5px] px-1.5 py-0.5 rounded font-serif font-semibold leading-none ${
                            isSelected 
                              ? 'bg-purple-900/60 text-purple-200 border border-purple-400/40' 
                              : 'bg-purple-100 text-purple-900 border border-purple-200'
                          }`}>
                            Daily Confession
                          </span>
                        )}
                        {hasPerpetualAdoration && (
                          <span className={`text-[9.5px] px-1.5 py-0.5 rounded font-serif font-semibold leading-none ${
                            isSelected 
                              ? 'bg-amber-900/60 text-amber-200 border border-amber-400/40' 
                              : 'bg-amber-100 text-amber-900 border border-amber-200'
                          }`}>
                            24/7 Adoration
                          </span>
                        )}
                      </div>
                    </div>

                    <ChevronRight className={`w-4 h-4 shrink-0 mt-1 transition-transform ${
                      isSelected ? 'text-[#D4AF37] translate-x-0.5' : 'text-[#8C6D54] group-hover:text-[#4A2D19]'
                    }`} />
                  </button>
                );
              })
            )}
          </div>

          {/* Right Column: Detailed Sacred Schedule View */}
          <div className="md:col-span-8 p-4 sm:p-6 lg:p-7 space-y-5 max-h-[66vh] lg:max-h-[70vh] overflow-y-auto bg-[#FAF6F0]">
            
            {/* Selected Parish Dignified Altar Title Card */}
            <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-b from-[#EFE5D8] to-[#E5D7C7] border border-[#8B5A2B]/35 shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-cinzel text-xs font-bold text-[#8B5A2B] uppercase tracking-wider bg-white/70 px-2 py-0.5 rounded border border-[#8B5A2B]/20">
                      Parish #{selectedParishIndex + 1}
                    </span>
                    <span className="text-xs font-serif text-[#5C3D28]">
                      Patron: <strong className="text-[#24140B] font-semibold">{selectedParish.patronSaint}</strong>
                    </span>
                  </div>

                  <h3 className="font-cinzel text-xl sm:text-2xl lg:text-3xl font-bold text-[#24140B] leading-tight">
                    {selectedParish.name}
                  </h3>

                  {selectedParish.popularName && (
                    <p className="text-sm sm:text-base font-serif font-semibold text-[#6B3E1E]">
                      {selectedParish.popularName}
                    </p>
                  )}
                </div>

                {/* Quick Share / Copy Entire Schedule Button */}
                <button
                  onClick={() => handleCopySchedule(selectedParish)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#3A2213] to-[#24140B] hover:from-[#4E301C] hover:to-[#381F10] text-amber-50 text-xs sm:text-sm font-serif font-semibold transition-all cursor-pointer shrink-0 shadow-xs border border-[#8B5A2B]/40"
                  title="Copy complete parish schedule to clipboard"
                >
                  {copiedId === selectedParish.id ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Copied Full Schedule</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#D4AF37]" />
                      <span>Copy Full Schedule</span>
                    </>
                  )}
                </button>
              </div>

              {/* Address, Phone, Feast Day Strip */}
              <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs sm:text-sm text-[#5C3D28] pt-1 border-t border-[#8B5A2B]/20 font-serif">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#7A4B27] shrink-0" />
                  <span>{selectedParish.address}</span>
                </div>

                {selectedParish.contactNumber && (
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#7A4B27] shrink-0" />
                    <a 
                      href={`tel:${selectedParish.contactNumber.replace(/[^0-9]/g, '')}`} 
                      className="text-[#6B3E1E] hover:underline font-semibold"
                    >
                      {selectedParish.contactNumber}
                    </a>
                  </div>
                )}

                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#7A4B27] shrink-0" />
                  <span>Feast: <strong className="text-[#24140B] font-semibold">{selectedParish.feastDay}</strong></span>
                </div>
              </div>
            </div>

            {/* Historical Significance Banner if available */}
            {selectedParish.historicalSignificance && (
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#F4EFE6] border border-[#8B5A2B]/25 text-xs sm:text-sm font-serif text-[#3A2213] flex items-start gap-2.5 shadow-2xs">
                <Sparkles className="w-4 h-4 text-[#8B5A2B] shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong className="font-semibold text-[#24140B]">Heritage &amp; Sacred History:</strong> {selectedParish.historicalSignificance}
                </p>
              </div>
            )}

            {/* Filter Tabs for Schedule Sections */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar border-b border-[#8B5A2B]/20 pb-2">
              <button
                onClick={() => setActiveScheduleTab('all')}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-cinzel font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeScheduleTab === 'all'
                    ? 'bg-[#3A2213] text-amber-50 shadow-xs'
                    : 'bg-white hover:bg-stone-50 text-[#5C3D28] border border-[#8B5A2B]/30'
                }`}
              >
                All Schedules
              </button>

              <button
                onClick={() => setActiveScheduleTab('sunday')}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-cinzel font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeScheduleTab === 'sunday'
                    ? 'bg-[#8B5A2B] text-white shadow-xs'
                    : 'bg-white hover:bg-stone-50 text-[#5C3D28] border border-[#8B5A2B]/30'
                }`}
              >
                <Sun className="w-3.5 h-3.5 text-amber-600" />
                <span>Sunday Masses ({selectedParish.sundayMasses.length})</span>
              </button>

              <button
                onClick={() => setActiveScheduleTab('weekday')}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-cinzel font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeScheduleTab === 'weekday'
                    ? 'bg-[#5C3418] text-white shadow-xs'
                    : 'bg-white hover:bg-stone-50 text-[#5C3D28] border border-[#8B5A2B]/30'
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-[#8B5A2B]" />
                <span>Weekday Masses ({selectedParish.dailyMasses.length})</span>
              </button>

              <button
                onClick={() => setActiveScheduleTab('confession')}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-cinzel font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeScheduleTab === 'confession'
                    ? 'bg-purple-900 text-purple-100 shadow-xs'
                    : 'bg-white hover:bg-purple-50/40 text-purple-900 border border-purple-300/60'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-purple-700" />
                <span>Confession Times</span>
              </button>

              <button
                onClick={() => setActiveScheduleTab('adoration')}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-cinzel font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                  activeScheduleTab === 'adoration'
                    ? 'bg-amber-800 text-amber-100 shadow-xs'
                    : 'bg-white hover:bg-amber-50/40 text-amber-950 border border-amber-300/60'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Adoration Chapel</span>
              </button>
            </div>

            {/* 1. SUNDAY HOLY MASSES */}
            {(activeScheduleTab === 'all' || activeScheduleTab === 'sunday') && (
              <div className="space-y-3 rounded-2xl p-4 sm:p-5 bg-white border border-[#D5C2B0] shadow-xs border-l-4 border-l-[#C49A45]">
                <div className="flex items-center justify-between border-b border-[#E8DDD0] pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-amber-100 text-amber-900">
                      <Sun className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-cinzel text-sm sm:text-base font-bold text-[#24140B] uppercase tracking-wide">
                        Sunday Holy Masses
                      </h4>
                      <p className="text-[11px] sm:text-xs font-serif text-[#6D482F]">
                        Fulfill the Sunday Obligation • Arrive 15 minutes prior for quiet prayer
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-cinzel font-bold bg-[#EFE6DC] text-[#341D10] px-2.5 py-1 rounded-md border border-[#D5C2B0]">
                    {selectedParish.sundayMasses.length} Masses
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
                  {selectedParish.sundayMasses.map((m, idx) => {
                    const slotKey = `${selectedParish.id}-sunday-${idx}`;
                    const isSlotCopied = copiedSlotKey === slotKey;
                    const isEnglish = m.language.toLowerCase().includes('english');
                    const isCebuano = m.language.toLowerCase().includes('cebuano');

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleCopySlot(slotKey, `${selectedParish.name} — Sunday Mass: ${m.time} (${m.language}${m.notes ? `, ${m.notes}` : ''})`)}
                        className="p-3 rounded-xl bg-[#FAF8F5] hover:bg-[#F4ECE1] border border-[#E0D2C2] hover:border-[#8B5A2B] flex flex-col justify-between gap-2 text-left font-serif transition-all cursor-pointer shadow-2xs group"
                        title="Click to copy this Sunday Mass time"
                      >
                        <div className="flex items-center justify-between gap-1 w-full">
                          <span className="font-cinzel font-bold text-base sm:text-lg text-[#24140B] group-hover:text-[#6B3E1E] transition-colors">
                            {m.time}
                          </span>

                          <span className={`text-[11px] px-2 py-0.5 rounded font-serif font-semibold border ${
                            isEnglish 
                              ? 'bg-blue-50 text-blue-900 border-blue-200' 
                              : isCebuano 
                                ? 'bg-amber-100/80 text-amber-950 border-amber-300/80' 
                                : 'bg-stone-100 text-stone-800 border-stone-200'
                          }`}>
                            {isSlotCopied ? 'Copied!' : m.language}
                          </span>
                        </div>

                        {m.notes && (
                          <div className="text-[11px] sm:text-xs text-[#5C3D28] font-serif italic flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#8B5A2B]/60" />
                            <span className="truncate">{m.notes}</span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 2. WEEKDAY HOLY MASSES */}
            {(activeScheduleTab === 'all' || activeScheduleTab === 'weekday') && (
              <div className="space-y-3 rounded-2xl p-4 sm:p-5 bg-white border border-[#D5C2B0] shadow-xs border-l-4 border-l-[#8B5A2B]">
                <div className="flex items-center justify-between border-b border-[#E8DDD0] pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-[#EFE6DC] text-[#5C3418]">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-cinzel text-sm sm:text-base font-bold text-[#24140B] uppercase tracking-wide">
                        Weekday Holy Masses (Monday – Saturday)
                      </h4>
                      <p className="text-[11px] sm:text-xs font-serif text-[#6D482F]">
                        Daily Eucharist, Anticipated Masses &amp; Weekly Novenas
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-cinzel font-bold bg-[#EFE6DC] text-[#341D10] px-2.5 py-1 rounded-md border border-[#D5C2B0]">
                    {selectedParish.dailyMasses.length} Masses
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
                  {selectedParish.dailyMasses.map((m, idx) => {
                    const slotKey = `${selectedParish.id}-daily-${idx}`;
                    const isSlotCopied = copiedSlotKey === slotKey;
                    const isEnglish = m.language.toLowerCase().includes('english');
                    const isCebuano = m.language.toLowerCase().includes('cebuano');

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleCopySlot(slotKey, `${selectedParish.name} — Weekday Mass: ${m.time} (${m.language}${m.notes ? `, ${m.notes}` : ''})`)}
                        className="p-3 rounded-xl bg-[#FAF8F5] hover:bg-[#F4ECE1] border border-[#E0D2C2] hover:border-[#8B5A2B] flex flex-col justify-between gap-2 text-left font-serif transition-all cursor-pointer shadow-2xs group"
                        title="Click to copy this Weekday Mass time"
                      >
                        <div className="flex items-center justify-between gap-1 w-full">
                          <span className="font-cinzel font-bold text-base sm:text-lg text-[#24140B] group-hover:text-[#6B3E1E] transition-colors">
                            {m.time}
                          </span>

                          <span className={`text-[11px] px-2 py-0.5 rounded font-serif font-semibold border ${
                            isEnglish 
                              ? 'bg-blue-50 text-blue-900 border-blue-200' 
                              : isCebuano 
                                ? 'bg-amber-100/80 text-amber-950 border-amber-300/80' 
                                : 'bg-stone-100 text-stone-800 border-stone-200'
                          }`}>
                            {isSlotCopied ? 'Copied!' : m.language}
                          </span>
                        </div>

                        {m.notes && (
                          <div className="text-[11px] sm:text-xs text-[#5C3D28] font-serif italic flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#8B5A2B]/60" />
                            <span className="truncate">{m.notes}</span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. SACRAMENT OF RECONCILIATION (CONFESSION) */}
            {(activeScheduleTab === 'all' || activeScheduleTab === 'confession') && (
              <div className="space-y-3.5 rounded-2xl p-4 sm:p-5 bg-gradient-to-br from-purple-50/90 via-white to-stone-50 border border-purple-200 shadow-xs border-l-4 border-l-purple-800">
                <div className="flex items-center justify-between border-b border-purple-200/80 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-purple-100 text-purple-900">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-cinzel text-sm sm:text-base font-bold text-purple-950 uppercase tracking-wide">
                        Sacrament of Reconciliation (Confession)
                      </h4>
                      <p className="text-[11px] sm:text-xs font-serif text-purple-900/80">
                        Sacramental absolution, forgiveness of sins, and restoration of sanctifying grace
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowConfessionGuide(prev => !prev)}
                    className="text-xs font-serif font-bold text-purple-900 hover:text-purple-950 underline cursor-pointer"
                  >
                    {showConfessionGuide ? 'Hide Guide' : 'How to Confess'}
                  </button>
                </div>

                {/* Optional 5 Steps to Confession Guide */}
                {showConfessionGuide && (
                  <div className="p-3.5 rounded-xl bg-purple-100/70 border border-purple-200 text-xs sm:text-sm font-serif text-purple-950 space-y-1.5 animate-in fade-in">
                    <p className="font-bold font-cinzel text-xs text-purple-900">
                      Five Requirements for a Devout Sacramental Confession:
                    </p>
                    <ol className="list-decimal pl-5 space-y-1 text-purple-950">
                      <li><strong>Examination of Conscience:</strong> Recall all sins committed against the Ten Commandments since your last good confession.</li>
                      <li><strong>Contrition:</strong> Sincere sorrow for having offended God Who is all good and deserving of all your love.</li>
                      <li><strong>Firm Purpose of Amendment:</strong> Resolute decision to avoid these sins and proximate occasions in the future.</li>
                      <li><strong>Confession:</strong> Clearly confess all mortal sins (number and kind) to the priest in the confessional.</li>
                      <li><strong>Satisfaction / Penance:</strong> Faithfully pray the penance assigned by the confessor and make restitution if required.</li>
                    </ol>
                  </div>
                )}

                {/* Confession Slots */}
                <div className="space-y-2 pt-1">
                  {selectedParish.confessionSchedule.map((c, idx) => {
                    const slotKey = `${selectedParish.id}-confession-${idx}`;
                    const isSlotCopied = copiedSlotKey === slotKey;

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleCopySlot(slotKey, `${selectedParish.name} — Confession: ${c}`)}
                        className="w-full p-3 rounded-xl bg-white hover:bg-purple-50/60 border border-purple-200/90 hover:border-purple-400 flex items-center justify-between gap-3 text-left font-serif transition-all cursor-pointer shadow-2xs group"
                        title="Click to copy this Confession schedule"
                      >
                        <div className="flex items-start gap-2.5">
                          <span className="w-2 h-2 rounded-full bg-purple-600 mt-1.5 shrink-0" />
                          <span className="font-semibold text-xs sm:text-sm text-purple-950 leading-snug">
                            {c}
                          </span>
                        </div>

                        <span className="text-xs font-cinzel font-bold text-purple-800 shrink-0">
                          {isSlotCopied ? (
                            <span className="flex items-center gap-1 text-emerald-700">
                              <Check className="w-3.5 h-3.5" />
                              <span>Copied</span>
                            </span>
                          ) : (
                            <span className="group-hover:underline">Copy</span>
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 4. EUCHARISTIC ADORATION CHAPEL */}
            {(activeScheduleTab === 'all' || activeScheduleTab === 'adoration') && (
              <div className="space-y-3 rounded-2xl p-4 sm:p-5 bg-white border border-[#D5C2B0] shadow-xs border-l-4 border-l-amber-500">
                <div className="flex items-center justify-between border-b border-[#E8DDD0] pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-amber-100 text-amber-900">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-cinzel text-sm sm:text-base font-bold text-[#24140B] uppercase tracking-wide">
                        Eucharistic Adoration Chapel
                      </h4>
                      <p className="text-[11px] sm:text-xs font-serif text-[#6D482F]">
                        Adore Our Eucharistic Lord exposed in the sacred monstrance
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-1">
                  <button
                    type="button"
                    onClick={() => handleCopySlot(`${selectedParish.id}-adoration`, `${selectedParish.name} — Eucharistic Adoration Chapel: ${selectedParish.adorationChapelHours}`)}
                    className="w-full p-3.5 rounded-xl bg-gradient-to-r from-amber-50/80 to-white hover:bg-amber-50 border border-amber-200/90 flex items-center justify-between gap-3 text-left font-serif transition-all cursor-pointer shadow-2xs group"
                    title="Click to copy Adoration Chapel hours"
                  >
                    <div className="space-y-0.5">
                      <span className="text-xs font-cinzel font-bold text-amber-900 block">
                        Exposition of the Most Blessed Sacrament
                      </span>
                      <span className="font-semibold text-sm sm:text-base text-[#24140B] leading-snug">
                        {selectedParish.adorationChapelHours}
                      </span>
                    </div>

                    <span className="text-xs font-cinzel font-bold text-amber-800 shrink-0">
                      {copiedSlotKey === `${selectedParish.id}-adoration` ? (
                        <span className="flex items-center gap-1 text-emerald-700">
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied</span>
                        </span>
                      ) : (
                        <span className="group-hover:underline">Copy</span>
                      )}
                    </span>
                  </button>
                </div>

                {selectedParish.notes && (
                  <p className="text-xs sm:text-sm font-serif text-[#5C3D28] pt-1 leading-relaxed bg-[#FAF8F5] p-3 rounded-xl border border-[#E0D2C2]">
                    <strong className="font-semibold text-[#24140B]">Sanctuary Notes &amp; Devotions:</strong> {selectedParish.notes}
                  </p>
                )}
              </div>
            )}

          </div>

        </div>

        {/* Dignified Footer Strip */}
        <div className="px-5 py-3.5 bg-[#DFD0C0] border-t border-[#8B5A2B]/25 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm font-serif text-[#4A2D19]">
          <div className="flex items-center gap-2">
            <Church className="w-4 h-4 text-[#7A4B27] shrink-0" />
            <p className="font-medium text-center sm:text-left">
              Archdiocese of Cebu Mass Schedules • Always arrive 15 minutes before Holy Mass
            </p>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-[#3A2213] hover:bg-[#4E301C] text-amber-50 font-serif font-semibold text-xs sm:text-sm transition-colors shadow-xs cursor-pointer border border-[#8B5A2B]/40"
          >
            Close Directory
          </button>
        </div>

      </div>
    </div>
  );
};
