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
  ChevronDown,
  Settings,
  Share2,
  Compass,
  Award,
  Sun
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
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

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
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-stone-950/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-6xl h-[92vh] max-h-[94vh] flex flex-col rounded-2xl bg-[#EDE4D8] border-2 border-[#8B5A2B]/40 shadow-[0_25px_80px_rgba(0,0,0,0.7)] text-[#2B1B12] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Liturgical Gold Border Accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#6B3E1E] via-[#D4AF37] to-[#6B3E1E] shadow-xs shrink-0" />

        {/* Sleek Compact Header Bar with Settings Drop-Down Icon */}
        <div className="border-b border-[#8B5A2B]/30 bg-gradient-to-r from-[#2F1A0E] via-[#482813] to-[#2F1A0E] text-amber-50 shadow-sm shrink-0 relative z-30">
          <div className="px-3.5 py-2 sm:px-6 sm:py-2.5 flex items-center justify-between gap-3">
            
            {/* Left: Sanctuary Title & Info */}
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-1.5 rounded-lg bg-gradient-to-b from-[#A07040] to-[#5C3418] text-amber-100 border border-[#D4AF37]/50 shadow-xs shrink-0">
                <Church className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <h2 className="font-cinzel text-sm sm:text-base md:text-lg font-bold text-white tracking-wide truncate leading-tight">
                  Holy Mass &amp; Confession Schedules
                </h2>
                <div className="flex items-center gap-1.5 text-[10.5px] sm:text-xs text-amber-300 font-serif leading-none mt-0.5">
                  <span className="truncate">Archdiocese of Cebu</span>
                  <span className="text-amber-400/50">•</span>
                  <span className="truncate text-amber-100/90 font-semibold">{selectedParish.popularName || selectedParish.name}</span>
                </div>
              </div>
            </div>

            {/* Right Controls: Sanctuary Switcher, Settings Drop-Down Icon, Close */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              
              {/* Previous / Next Sanctuary switcher */}
              <div className="flex items-center bg-[#1F1108]/90 rounded-lg border border-[#8B5A2B]/40 p-0.5">
                <button
                  type="button"
                  onClick={handlePrevParish}
                  className="p-1 rounded text-amber-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Previous Sanctuary"
                  aria-label="Previous Sanctuary"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="px-1.5 text-[11px] font-cinzel font-bold text-amber-300 select-none">
                  {selectedParishIndex + 1}/{CEBU_CITY_PARISHES.length}
                </span>
                <button
                  type="button"
                  onClick={handleNextParish}
                  className="p-1 rounded text-amber-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Next Sanctuary"
                  aria-label="Next Sanctuary"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Settings Drop-Down Icon Button */}
              <button
                type="button"
                onClick={() => setIsSettingsOpen(prev => !prev)}
                aria-expanded={isSettingsOpen}
                className={`h-8 flex items-center gap-1 px-2 sm:px-2.5 rounded-lg transition-all cursor-pointer border ${
                  isSettingsOpen
                    ? 'bg-[#25170F] text-[#F7EBE1] border-[#D4AF37] ring-2 ring-[#8B5A2B]/40'
                    : 'bg-[#1C120C]/90 hover:bg-[#25170F] text-[#D4A373] hover:text-[#F7EBE1] border-[#8B5A2B]/50 hover:border-[#D4A373]/70'
                }`}
                title={isSettingsOpen ? 'Hide Search & Filters' : 'Open Search & Schedule Filters'}
                aria-label={isSettingsOpen ? 'Hide Search & Filters' : 'Open Search & Schedule Filters'}
              >
                <Settings className="w-3.5 h-3.5 text-[#D4A373] shrink-0" />
                <span className="text-xs font-serif hidden md:inline">Settings</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[#D4A373] shrink-0 transition-transform duration-200 ${
                    isSettingsOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-amber-200/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border border-amber-200/20"
                aria-label="Close Schedule Directory"
                title="Close"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Settings Drop-Down Drawer (Smoothly expands below the compact header) */}
          {isSettingsOpen && (
            <div className="px-4 py-3 sm:px-6 bg-[#24130A] border-t border-[#8B5A2B]/40 text-amber-50 space-y-3 animate-in fade-in">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                
                {/* Search Bar */}
                <div className="md:col-span-5 relative">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search parish, Sto. Niño, Cathedral, patron, or language..."
                    className="w-full pl-9 pr-7 py-1.5 rounded-lg bg-black/40 border border-[#8B5A2B]/40 text-xs sm:text-sm text-white placeholder-stone-400 focus:outline-none focus:border-[#D4AF37] font-serif"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white p-0.5 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Parish Filter Chips */}
                <div className="md:col-span-7 flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-cinzel text-amber-300 font-bold uppercase mr-1">
                    Sanctuary:
                  </span>
                  <button
                    onClick={() => setParishFilter('all')}
                    className={`px-2.5 py-1 rounded-md text-xs font-serif transition-all cursor-pointer ${
                      parishFilter === 'all'
                        ? 'bg-[#8B5A2B] text-white font-bold shadow-2xs'
                        : 'bg-white/10 hover:bg-white/20 text-amber-100 border border-white/10'
                    }`}
                  >
                    All ({CEBU_CITY_PARISHES.length})
                  </button>
                  <button
                    onClick={() => setParishFilter('confession')}
                    className={`px-2.5 py-1 rounded-md text-xs font-serif transition-all cursor-pointer flex items-center gap-1 ${
                      parishFilter === 'confession'
                        ? 'bg-purple-900 text-purple-100 font-bold border border-purple-500/50 shadow-2xs'
                        : 'bg-white/10 hover:bg-white/20 text-amber-100 border border-white/10'
                    }`}
                  >
                    <ShieldCheck className="w-3 h-3 text-purple-400" />
                    <span>Daily Confession</span>
                  </button>
                  <button
                    onClick={() => setParishFilter('adoration-247')}
                    className={`px-2.5 py-1 rounded-md text-xs font-serif transition-all cursor-pointer flex items-center gap-1 ${
                      parishFilter === 'adoration-247'
                        ? 'bg-amber-900 text-amber-100 font-bold border border-amber-500/50 shadow-2xs'
                        : 'bg-white/10 hover:bg-white/20 text-amber-100 border border-white/10'
                    }`}
                  >
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>24/7 Adoration</span>
                  </button>
                  <button
                    onClick={() => setParishFilter('shrines')}
                    className={`px-2.5 py-1 rounded-md text-xs font-serif transition-all cursor-pointer flex items-center gap-1 ${
                      parishFilter === 'shrines'
                        ? 'bg-amber-800 text-white font-bold shadow-2xs'
                        : 'bg-white/10 hover:bg-white/20 text-amber-100 border border-white/10'
                    }`}
                  >
                    <Award className="w-3 h-3 text-amber-400" />
                    <span>Major Shrines</span>
                  </button>
                </div>

              </div>

              {/* Schedule Type Filter Tabs in Settings */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-white/10 text-xs">
                <span className="text-[11px] font-cinzel text-amber-300 font-bold uppercase mr-1">
                  View Type:
                </span>
                {(['all', 'sunday', 'weekday', 'confession', 'adoration'] as ScheduleTab[]).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveScheduleTab(tab)}
                    className={`px-2.5 py-1 rounded-md capitalize font-serif transition-all cursor-pointer ${
                      activeScheduleTab === tab
                        ? 'bg-[#D4AF37] text-stone-950 font-bold shadow-xs'
                        : 'bg-white/10 hover:bg-white/20 text-amber-100'
                    }`}
                  >
                    {tab === 'all' ? 'All Schedules' : tab === 'sunday' ? 'Sunday Masses' : tab === 'weekday' ? 'Weekday Masses' : tab === 'confession' ? 'Confession' : 'Adoration'}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Body: Expanded Schedule Viewer Layout (Desktop 2-Column Directory + Large Viewer) */}
        <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[#8B5A2B]/20 overflow-hidden">
          
          {/* Left Column: Parish Directory Selection (Desktop) */}
          <div className="hidden md:block md:col-span-4 lg:col-span-3 p-3 space-y-1.5 overflow-y-auto bg-[#E8DDD0]/70 h-full">
            <div className="px-1 py-1 flex items-center justify-between text-xs font-cinzel font-bold text-[#6D482F] uppercase tracking-wider">
              <span>Sanctuaries ({filteredParishes.length})</span>
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

                return (
                  <button
                    key={parish.id}
                    onClick={() => setSelectedParishId(parish.id)}
                    className={`w-full text-left p-2.5 rounded-xl transition-all duration-150 cursor-pointer group flex items-start justify-between gap-2 ${
                      isSelected
                        ? 'bg-gradient-to-br from-[#381F10] to-[#24130A] text-white border-2 border-[#D4AF37] shadow-md ring-1 ring-[#D4AF37]/50'
                        : 'bg-white hover:bg-[#FAF6F0] text-[#341D10] border border-[#CBB5A0] shadow-2xs hover:border-[#8B5A2B]'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <span className={`font-cinzel text-xs sm:text-sm font-bold block transition-colors truncate ${
                        isSelected ? 'text-white font-extrabold' : 'text-[#2D180B] group-hover:text-[#5C3214]'
                      }`}>
                        {parish.name}
                      </span>

                      {parish.popularName && (
                        <span className={`text-[11px] font-serif block truncate mt-0.5 ${
                          isSelected ? 'text-amber-200 font-semibold' : 'text-[#634835]'
                        }`}>
                          {parish.popularName}
                        </span>
                      )}

                      <div className={`flex items-center gap-1.5 text-[10px] sm:text-[11px] mt-1 font-serif ${
                        isSelected ? 'text-amber-100/90' : 'text-[#7A5B42]'
                      }`}>
                        <MapPin className={`w-3 h-3 shrink-0 ${isSelected ? 'text-amber-300' : 'text-[#8C6D54]'}`} />
                        <span className="truncate">{parish.address}</span>
                      </div>

                      {/* Small tags */}
                      <div className="flex flex-wrap items-center gap-1 mt-1.5">
                        {hasDailyConfession && (
                          <span className={`text-[9px] px-1.5 py-0.2 rounded font-serif font-semibold leading-none ${
                            isSelected 
                              ? 'bg-purple-900/60 text-purple-200 border border-purple-400/40' 
                              : 'bg-purple-100 text-purple-900 border border-purple-200'
                          }`}>
                            Daily Confession
                          </span>
                        )}
                        {hasPerpetualAdoration && (
                          <span className={`text-[9px] px-1.5 py-0.2 rounded font-serif font-semibold leading-none ${
                            isSelected 
                              ? 'bg-amber-900/60 text-amber-200 border border-amber-400/40' 
                              : 'bg-amber-100 text-amber-900 border border-amber-200'
                          }`}>
                            24/7 Adoration
                          </span>
                        )}
                      </div>
                    </div>

                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 mt-1 transition-transform ${
                      isSelected ? 'text-[#D4AF37] translate-x-0.5' : 'text-[#8C6D54] group-hover:text-[#4A2D19]'
                    }`} />
                  </button>
                );
              })
            )}
          </div>

          {/* Right Column: High-Capacity Sacred Schedule Viewer (Enlarged and Spacious) */}
          <div className="md:col-span-8 lg:col-span-9 p-3.5 sm:p-5 lg:p-6 space-y-4 overflow-y-auto bg-[#FAF6F0] h-full">
            
            {/* Selected Parish Dignified Header Bar */}
            <div className="rounded-xl p-3 sm:p-4 bg-gradient-to-b from-[#EFE5D8] to-[#E5D7C7] border border-[#8B5A2B]/35 shadow-xs space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <div className="space-y-0.5 min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-cinzel text-[10.5px] font-bold text-[#8B5A2B] uppercase tracking-wider bg-white/70 px-1.5 py-0.5 rounded border border-[#8B5A2B]/20">
                      Sanctuary #{selectedParishIndex + 1}
                    </span>
                    <span className="text-[11px] font-serif text-[#5C3D28]">
                      Patron: <strong className="text-[#24140B] font-semibold">{selectedParish.patronSaint}</strong>
                    </span>
                    <span className="text-[11px] font-serif text-[#5C3D28] hidden sm:inline">
                      • Feast: <strong className="text-[#24140B] font-semibold">{selectedParish.feastDay}</strong>
                    </span>
                  </div>

                  <h3 className="font-cinzel text-lg sm:text-xl lg:text-2xl font-bold text-[#24140B] leading-tight truncate">
                    {selectedParish.name}
                  </h3>

                  {selectedParish.popularName && (
                    <p className="text-xs sm:text-sm font-serif font-semibold text-[#6B3E1E] truncate">
                      {selectedParish.popularName}
                    </p>
                  )}
                </div>

                {/* Quick Copy Full Schedule Button */}
                <button
                  onClick={() => handleCopySchedule(selectedParish)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#3A2213] hover:bg-[#4E301C] text-amber-50 text-xs font-serif font-semibold transition-all cursor-pointer shrink-0 shadow-2xs border border-[#8B5A2B]/40 self-start sm:self-center"
                  title="Copy complete parish schedule to clipboard"
                >
                  {copiedId === selectedParish.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied Schedule</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Copy Schedule</span>
                    </>
                  )}
                </button>
              </div>

              {/* Address and Contact info */}
              <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-xs text-[#5C3D28] pt-1 border-t border-[#8B5A2B]/20 font-serif">
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#7A4B27] shrink-0" />
                  <span className="truncate">{selectedParish.address}</span>
                </div>

                {selectedParish.contactNumber && (
                  <div className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-[#7A4B27] shrink-0" />
                    <a 
                      href={`tel:${selectedParish.contactNumber.replace(/[^0-9]/g, '')}`} 
                      className="text-[#6B3E1E] hover:underline font-semibold"
                    >
                      {selectedParish.contactNumber}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* 1. SUNDAY HOLY MASSES */}
            {(activeScheduleTab === 'all' || activeScheduleTab === 'sunday') && (
              <div className="space-y-2.5 rounded-xl p-3.5 sm:p-4 bg-white border border-[#D5C2B0] shadow-xs border-l-4 border-l-[#C49A45]">
                <div className="flex items-center justify-between border-b border-[#E8DDD0] pb-2">
                  <div className="flex items-center gap-1.5">
                    <div className="p-1 rounded-md bg-amber-100 text-amber-900">
                      <Sun className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-cinzel text-xs sm:text-sm font-bold text-[#24140B] uppercase tracking-wide">
                        Sunday Holy Masses
                      </h4>
                    </div>
                  </div>

                  <span className="text-[11px] font-cinzel font-bold bg-[#EFE6DC] text-[#341D10] px-2 py-0.5 rounded border border-[#D5C2B0]">
                    {selectedParish.sundayMasses.length} Masses
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-0.5">
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
                        className="p-2.5 rounded-lg bg-[#FAF8F5] hover:bg-[#F4ECE1] border border-[#E0D2C2] hover:border-[#8B5A2B] flex flex-col justify-between gap-1.5 text-left font-serif transition-all cursor-pointer shadow-2xs group"
                        title="Click to copy this Sunday Mass time"
                      >
                        <div className="flex items-center justify-between gap-1 w-full">
                          <span className="font-cinzel font-bold text-sm sm:text-base text-[#24140B] group-hover:text-[#6B3E1E] transition-colors">
                            {m.time}
                          </span>

                          <span className={`text-[10px] px-1.5 py-0.2 rounded font-serif font-semibold border ${
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
                          <div className="text-[10.5px] text-[#5C3D28] font-serif italic truncate">
                            {m.notes}
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
              <div className="space-y-2.5 rounded-xl p-3.5 sm:p-4 bg-white border border-[#D5C2B0] shadow-xs border-l-4 border-l-[#8B5A2B]">
                <div className="flex items-center justify-between border-b border-[#E8DDD0] pb-2">
                  <div className="flex items-center gap-1.5">
                    <div className="p-1 rounded-md bg-[#EFE6DC] text-[#5C3418]">
                      <Clock className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-cinzel text-xs sm:text-sm font-bold text-[#24140B] uppercase tracking-wide">
                        Weekday Holy Masses (Monday – Saturday)
                      </h4>
                    </div>
                  </div>

                  <span className="text-[11px] font-cinzel font-bold bg-[#EFE6DC] text-[#341D10] px-2 py-0.5 rounded border border-[#D5C2B0]">
                    {selectedParish.dailyMasses.length} Masses
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 pt-0.5">
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
                        className="p-2.5 rounded-lg bg-[#FAF8F5] hover:bg-[#F4ECE1] border border-[#E0D2C2] hover:border-[#8B5A2B] flex flex-col justify-between gap-1.5 text-left font-serif transition-all cursor-pointer shadow-2xs group"
                        title="Click to copy this Weekday Mass time"
                      >
                        <div className="flex items-center justify-between gap-1 w-full">
                          <span className="font-cinzel font-bold text-sm sm:text-base text-[#24140B] group-hover:text-[#6B3E1E] transition-colors">
                            {m.time}
                          </span>

                          <span className={`text-[10px] px-1.5 py-0.2 rounded font-serif font-semibold border ${
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
                          <div className="text-[10.5px] text-[#5C3D28] font-serif italic truncate">
                            {m.notes}
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
              <div className="space-y-3 rounded-xl p-3.5 sm:p-4 bg-gradient-to-br from-purple-50/90 via-white to-stone-50 border border-purple-200 shadow-xs border-l-4 border-l-purple-800">
                <div className="flex items-center justify-between border-b border-purple-200/80 pb-2">
                  <div className="flex items-center gap-1.5">
                    <div className="p-1 rounded-md bg-purple-100 text-purple-900">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-cinzel text-xs sm:text-sm font-bold text-purple-950 uppercase tracking-wide">
                        Sacrament of Reconciliation (Confession)
                      </h4>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowConfessionGuide(prev => !prev)}
                    className="text-xs font-serif font-bold text-purple-900 hover:text-purple-950 underline cursor-pointer"
                  >
                    {showConfessionGuide ? 'Hide Guide' : 'How to Confess'}
                  </button>
                </div>

                {/* 5 Steps to Confession Guide */}
                {showConfessionGuide && (
                  <div className="p-3 rounded-lg bg-purple-100/80 border border-purple-200 text-xs font-serif text-purple-950 space-y-1 animate-in fade-in">
                    <p className="font-bold font-cinzel text-[11px] text-purple-900">
                      Five Requirements for a Devout Sacramental Confession:
                    </p>
                    <ol className="list-decimal pl-4 space-y-0.5 text-purple-950 text-[11.5px]">
                      <li><strong>Examination of Conscience:</strong> Recall sins committed against God&apos;s commandments.</li>
                      <li><strong>Contrition:</strong> Sincere sorrow for having offended God Who is all good.</li>
                      <li><strong>Firm Purpose of Amendment:</strong> Resolute decision to avoid sin in the future.</li>
                      <li><strong>Confession:</strong> Clearly confess all mortal sins to the priest in the confessional.</li>
                      <li><strong>Satisfaction / Penance:</strong> Faithfully pray the penance assigned by the confessor.</li>
                    </ol>
                  </div>
                )}

                {/* Confession Slots */}
                <div className="space-y-1.5 pt-0.5">
                  {selectedParish.confessionSchedule.map((c, idx) => {
                    const slotKey = `${selectedParish.id}-confession-${idx}`;
                    const isSlotCopied = copiedSlotKey === slotKey;

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleCopySlot(slotKey, `${selectedParish.name} — Confession: ${c}`)}
                        className="w-full p-2.5 rounded-lg bg-white hover:bg-purple-50/60 border border-purple-200/90 hover:border-purple-400 flex items-center justify-between gap-2.5 text-left font-serif transition-all cursor-pointer shadow-2xs group"
                        title="Click to copy this Confession schedule"
                      >
                        <div className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-600 mt-1.5 shrink-0" />
                          <span className="font-semibold text-xs sm:text-sm text-purple-950 leading-snug">
                            {c}
                          </span>
                        </div>

                        <span className="text-[11px] font-cinzel font-bold text-purple-800 shrink-0">
                          {isSlotCopied ? (
                            <span className="flex items-center gap-1 text-emerald-700">
                              <Check className="w-3 h-3" />
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
              <div className="space-y-2 rounded-xl p-3.5 sm:p-4 bg-white border border-[#D5C2B0] shadow-xs border-l-4 border-l-amber-500">
                <div className="flex items-center justify-between border-b border-[#E8DDD0] pb-2">
                  <div className="flex items-center gap-1.5">
                    <div className="p-1 rounded-md bg-amber-100 text-amber-900">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-cinzel text-xs sm:text-sm font-bold text-[#24140B] uppercase tracking-wide">
                        Eucharistic Adoration Chapel
                      </h4>
                    </div>
                  </div>
                </div>

                <div className="pt-0.5">
                  <button
                    type="button"
                    onClick={() => handleCopySlot(`${selectedParish.id}-adoration`, `${selectedParish.name} — Eucharistic Adoration Chapel: ${selectedParish.adorationChapelHours}`)}
                    className="w-full p-2.5 rounded-lg bg-gradient-to-r from-amber-50/80 to-white hover:bg-amber-50 border border-amber-200/90 flex items-center justify-between gap-2.5 text-left font-serif transition-all cursor-pointer shadow-2xs group"
                    title="Click to copy Adoration Chapel hours"
                  >
                    <div className="space-y-0.5">
                      <span className="text-[10.5px] font-cinzel font-bold text-amber-900 block">
                        Exposition of the Blessed Sacrament
                      </span>
                      <span className="font-semibold text-xs sm:text-sm text-[#24140B] leading-snug">
                        {selectedParish.adorationChapelHours}
                      </span>
                    </div>

                    <span className="text-[11px] font-cinzel font-bold text-amber-800 shrink-0">
                      {copiedSlotKey === `${selectedParish.id}-adoration` ? (
                        <span className="flex items-center gap-1 text-emerald-700">
                          <Check className="w-3 h-3" />
                          <span>Copied</span>
                        </span>
                      ) : (
                        <span className="group-hover:underline">Copy</span>
                      )}
                    </span>
                  </button>
                </div>

                {selectedParish.notes && (
                  <p className="text-[11px] sm:text-xs font-serif text-[#5C3D28] pt-0.5 leading-relaxed bg-[#FAF8F5] p-2.5 rounded-lg border border-[#E0D2C2]">
                    <strong className="font-semibold text-[#24140B]">Devotions &amp; Notes:</strong> {selectedParish.notes}
                  </p>
                )}
              </div>
            )}

          </div>

        </div>

        {/* Dignified Compact Footer Bar */}
        <div className="px-4 py-2 sm:px-6 bg-[#DFD0C0] border-t border-[#8B5A2B]/25 flex items-center justify-between gap-3 text-xs font-serif text-[#4A2D19] shrink-0">
          <p className="truncate">Archdiocese of Cebu Mass Schedules • Always arrive 15 minutes before Holy Mass</p>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#3A2213] hover:bg-[#4E301C] text-amber-50 font-serif font-semibold text-xs transition-colors shadow-2xs cursor-pointer border border-[#8B5A2B]/40 shrink-0"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
