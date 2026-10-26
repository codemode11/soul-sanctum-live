import React, { useState } from 'react';
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
  ChevronRight
} from 'lucide-react';
import { CEBU_CITY_PARISHES, ParishSchedule } from '../data/cebuParishes';

interface CebuParishesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CebuParishesModal: React.FC<CebuParishesModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedParish, setSelectedParish] = useState<ParishSchedule>(CEBU_CITY_PARISHES[0]);
  const [activeTabFilter, setActiveTabFilter] = useState<'all' | 'confession'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const filteredParishes = CEBU_CITY_PARISHES.filter(parish => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      parish.name.toLowerCase().includes(query) ||
      (parish.popularName && parish.popularName.toLowerCase().includes(query)) ||
      parish.address.toLowerCase().includes(query) ||
      parish.patronSaint.toLowerCase().includes(query);

    if (!matchesSearch) return false;

    if (activeTabFilter === 'confession') {
      return parish.confessionSchedule.length > 0;
    }
    return true;
  });

  const handleCopySchedule = (parish: ParishSchedule) => {
    const text = `HOLY MASS and CONFESSION SCHEDULE
${parish.name} (${parish.popularName || ''})
Address: ${parish.address}
Patron: ${parish.patronSaint} • Feast Day: ${parish.feastDay}

DAILY MASSES:
${parish.dailyMasses.map(m => `• ${m.time} - ${m.language}${m.notes ? ` (${m.notes})` : ''}`).join('\n')}

SUNDAY MASSES:
${parish.sundayMasses.map(m => `• ${m.time} - ${m.language}${m.notes ? ` (${m.notes})` : ''}`).join('\n')}

CONFESSION SCHEDULE:
${parish.confessionSchedule.join('\n')}

Adoration Chapel: ${parish.adorationChapelHours}
${parish.notes ? `\nNotes: ${parish.notes}` : ''}`;

    navigator.clipboard.writeText(text);
    setCopiedId(parish.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-xl bg-[#EDE4D8] border border-[#8B5A2B]/40 shadow-[0_24px_70px_rgba(0,0,0,0.6)] text-[#2B1B12] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Liturgical Border Accent */}
        <div className="h-1.5 w-full bg-gradient-to-r from-[#6B3E1E] via-[#A07040] to-[#6B3E1E]" />

        {/* Dignified Header */}
        <div className="p-5 sm:p-6 border-b border-[#8B5A2B]/25 bg-[#E4D7C8] flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-[#D6C5B2] text-[#5C3418] border border-[#8B5A2B]/30 shadow-xs">
              <Church className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-xs sm:text-sm font-bold text-[#6B3E1E] tracking-wider uppercase">
                  Archdiocese of Cebu • Philippines
                </span>
              </div>
              <h2 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-bold text-[#24140B] tracking-wide mt-0.5">
                Holy Mass and Confession Schedules
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#6B4B35] hover:text-[#24140B] hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="p-4 bg-[#DFD0C0] border-b border-[#8B5A2B]/20 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7C5A40]" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search parish name, Sto. Niño, Cathedral, street, or patron..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-[#EBE1D4] border border-[#8B5A2B]/35 text-base text-[#24140B] placeholder-[#8C6F58] focus:outline-none focus:border-[#6B3E1E] focus:ring-1 focus:ring-[#6B3E1E] shadow-2xs font-serif"
            />
          </div>

          {/* Clean Unified Filters */}
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTabFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-serif transition-colors cursor-pointer whitespace-nowrap shadow-xs ${
                activeTabFilter === 'all'
                  ? 'bg-[#3A2213] text-amber-50 font-semibold'
                  : 'bg-[#EAE0D3] text-[#4A2E1B] hover:bg-[#F2EAE0] border border-[#8B5A2B]/30'
              }`}
            >
              All Parishes ({CEBU_CITY_PARISHES.length})
            </button>
            <button
              onClick={() => setActiveTabFilter('confession')}
              className={`px-4 py-2 rounded-lg text-sm font-serif transition-colors cursor-pointer whitespace-nowrap shadow-xs ${
                activeTabFilter === 'confession'
                  ? 'bg-[#6B3E1E] text-amber-50 font-semibold border border-[#4A2810]'
                  : 'bg-[#EAE0D3] text-[#4A2E1B] hover:bg-[#F2EAE0] border border-[#8B5A2B]/30'
              }`}
            >
              Sacrament of Penance
            </button>
          </div>
        </div>

        {/* Main Body: Parish Selector (Left) + Detail View (Right) */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[#8B5A2B]/20">
          
          {/* List of Parishes */}
          <div className="md:col-span-5 p-3.5 space-y-2 max-h-[60vh] md:max-h-[68vh] overflow-y-auto bg-[#E5D8CA]/60">
            {filteredParishes.length === 0 ? (
              <div className="text-center py-8 text-[#7A5B42] font-serif text-base">
                No Cebu parishes found matching "{searchQuery}"
              </div>
            ) : (
              filteredParishes.map(parish => {
                const isSelected = selectedParish.id === parish.id;
                return (
                  <button
                    key={parish.id}
                    onClick={() => setSelectedParish(parish)}
                    className={`w-full text-left p-3.5 rounded-xl transition-all cursor-pointer group flex items-start justify-between gap-3 ${
                      isSelected
                        ? 'bg-[#3A2213] text-white border-2 border-amber-500/80 shadow-md'
                        : 'bg-[#ECE2D5] hover:bg-[#F3EBE1] text-[#3A2213] border border-[#8B5A2B]/20'
                    }`}
                  >
                    <div className="min-w-0">
                      <span className={`font-cinzel text-base font-bold block transition-colors truncate ${
                        isSelected ? 'text-white font-extrabold' : 'text-[#2D180B] group-hover:text-[#5C3214]'
                      }`}>
                        {parish.name}
                      </span>
                      {parish.popularName && (
                        <span className={`text-sm font-serif block truncate mt-0.5 ${
                          isSelected ? 'text-amber-200 font-semibold' : 'text-[#634835]'
                        }`}>
                          {parish.popularName}
                        </span>
                      )}
                      <div className={`flex items-center gap-1.5 text-xs mt-1.5 font-serif ${
                        isSelected ? 'text-amber-100' : 'text-[#7A5B42]'
                      }`}>
                        <MapPin className={`w-3.5 h-3.5 shrink-0 ${isSelected ? 'text-amber-300' : 'text-[#8C6D54]'}`} />
                        <span className="truncate">{parish.address}</span>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 mt-1 transition-transform ${
                      isSelected ? 'text-amber-300 translate-x-0.5' : 'text-[#8C6D54] group-hover:text-[#4A2D19]'
                    }`} />
                  </button>
                );
              })
            )}
          </div>

          {/* Selected Parish Full Schedule */}
          <div className="md:col-span-7 p-6 sm:p-7 space-y-5 max-h-[60vh] md:max-h-[68vh] overflow-y-auto bg-[#F4EDE3]">
            
            {/* Title Bar */}
            <div className="flex items-start justify-between gap-4 border-b border-[#8B5A2B]/25 pb-4">
              <div>
                <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#24140B]">
                  {selectedParish.name}
                </h3>
                {selectedParish.popularName && (
                  <p className="text-base font-serif font-semibold text-[#6B3E1E] mt-0.5">
                    {selectedParish.popularName}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-2 text-sm text-[#5C3D28] mt-1.5 font-serif">
                  <MapPin className="w-4 h-4 text-[#7A4B27] shrink-0" />
                  <span>{selectedParish.address}</span>
                  {selectedParish.contactNumber && (
                    <>
                      <span>•</span>
                      <Phone className="w-4 h-4 text-[#7A4B27] shrink-0" />
                      <span>{selectedParish.contactNumber}</span>
                    </>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleCopySchedule(selectedParish)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#3A2213] hover:bg-[#4E301C] text-amber-50 text-sm font-serif font-medium transition-all cursor-pointer shrink-0 shadow-xs"
                title="Copy schedule to clipboard"
              >
                {copiedId === selectedParish.id ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-amber-200" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Historical significance banner if present */}
            {selectedParish.historicalSignificance && (
              <div className="p-4 rounded-xl bg-[#E8DDD0] border border-[#8B5A2B]/25 text-sm sm:text-base font-serif text-[#3A2213] flex items-start gap-2.5 shadow-2xs">
                <Sparkles className="w-4 h-4 text-[#8B5A2B] shrink-0 mt-1" />
                <p className="leading-relaxed">{selectedParish.historicalSignificance}</p>
              </div>
            )}

            {/* Sacrament of Penance / Confession Schedule */}
            <div className="space-y-2.5 rounded-xl p-5 bg-[#ECE1D4] border border-[#8B5A2B]/35 shadow-2xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#6B3E1E]" />
                <h4 className="font-cinzel text-sm sm:text-base font-bold text-[#24140B] uppercase tracking-wider">
                  Sacrament of Reconciliation (Confession)
                </h4>
              </div>
              <ul className="space-y-1.5 font-serif text-base text-[#2E1B0F] font-normal pl-5 list-disc">
                {selectedParish.confessionSchedule.map((c, idx) => (
                  <li key={idx} className="leading-relaxed">{c}</li>
                ))}
              </ul>
            </div>

            {/* Sunday Masses */}
            <div className="space-y-2.5 rounded-xl p-5 bg-[#EAE0D3] border border-[#8B5A2B]/25 shadow-2xs">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#6B3E1E]" />
                <h4 className="font-cinzel text-sm sm:text-base font-bold text-[#24140B] uppercase tracking-wider">
                  Sunday Holy Masses
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-0.5">
                {selectedParish.sundayMasses.map((m, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-[#F6EFE7] border border-[#8B5A2B]/20 flex items-center justify-between text-base font-serif shadow-2xs">
                    <span className="font-bold text-[#24140B]">{m.time}</span>
                    <span className="text-[#6B3E1E] text-sm font-semibold">{m.language}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Masses */}
            <div className="space-y-2.5 rounded-xl p-5 bg-[#EAE0D3] border border-[#8B5A2B]/25 shadow-2xs">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#6B3E1E]" />
                <h4 className="font-cinzel text-sm sm:text-base font-bold text-[#24140B] uppercase tracking-wider">
                  Weekday Holy Masses (Monday – Saturday)
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-0.5">
                {selectedParish.dailyMasses.map((m, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-[#F6EFE7] border border-[#8B5A2B]/20 flex items-center justify-between text-base font-serif shadow-2xs">
                    <span className="font-bold text-[#24140B]">{m.time}</span>
                    <span className="text-[#5C3D28] text-sm font-medium">{m.language}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Adoration Chapel and Notes */}
            <div className="p-4 rounded-xl bg-[#E8DDD0] border border-[#8B5A2B]/25 text-sm sm:text-base font-serif text-[#3A2213] space-y-1.5 leading-relaxed">
              <p><strong className="font-semibold text-[#24140B]">Eucharistic Adoration Chapel:</strong> {selectedParish.adorationChapelHours}</p>
              {selectedParish.notes && (
                <p><strong className="font-semibold text-[#24140B]">Patron Feast and Notes:</strong> {selectedParish.notes}</p>
              )}
            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-[#DFD0C0] border-t border-[#8B5A2B]/25 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm font-serif text-[#4A2D19]">
          <p className="font-medium">Archdiocese of Cebu Mass Schedules • Always arrive 15 minutes before Holy Mass</p>
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-[#3A2213] hover:bg-[#4E301C] text-amber-50 font-serif font-semibold text-sm transition-colors shadow-xs cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
