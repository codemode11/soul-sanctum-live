import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Sparkles, 
  X, 
  Check, 
  Clock, 
  Sun
} from 'lucide-react';
import { getLiturgicalMonth, LITURGICAL_COLORS_INFO } from '../data/liturgicalCalendar';
import { LiturgicalDayInfo, LiturgicalColor } from '../types';

interface LiturgicalCalendarPickerProps {
  selectedDateStr: string; // YYYY-MM-DD
  onSelectDate: (dateStr: string) => void;
  isOpen: boolean;
  onClose: () => void;
  align?: 'left' | 'right';
}

export const LiturgicalCalendarPicker: React.FC<LiturgicalCalendarPickerProps> = ({
  selectedDateStr,
  onSelectDate,
  isOpen,
  onClose,
  align = 'right'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parse initial selected date
  const [selectedYear, selectedMonth] = selectedDateStr.split('-').map(Number);
  const [viewYear, setViewYear] = useState<number>(selectedYear || 2026);
  const [viewMonth, setViewMonth] = useState<number>((selectedMonth ? selectedMonth - 1 : 9)); // 0-indexed

  // Keep view aligned if selected date changes externally
  useEffect(() => {
    if (selectedDateStr) {
      const [y, m] = selectedDateStr.split('-').map(Number);
      if (y && m) {
        setViewYear(y);
        setViewMonth(m - 1);
      }
    }
  }, [selectedDateStr]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const liturgicalDays = getLiturgicalMonth(viewYear, viewMonth);

  // Days in month calculation
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(prev => prev - 1);
    } else {
      setViewMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(prev => prev + 1);
    } else {
      setViewMonth(prev => prev + 1);
    }
  };

  // Dynamic dates for Today and upcoming Sunday Mass
  const now = new Date();
  const todayYear = now.getFullYear();
  const todayMonth = now.getMonth();
  const todayDateStr = `${todayYear}-${String(todayMonth + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const todayLabel = `Today: ${now.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`;

  const dayOfWeek = now.getDay(); // 0 is Sunday
  const daysUntilSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
  const nextSunday = new Date(now);
  nextSunday.setDate(now.getDate() + daysUntilSunday);
  const sundayYear = nextSunday.getFullYear();
  const sundayMonth = nextSunday.getMonth();
  const nextSundayDateStr = `${sundayYear}-${String(sundayMonth + 1).padStart(2, '0')}-${String(nextSunday.getDate()).padStart(2, '0')}`;
  const nextSundayLabel = `Sunday Mass: ${nextSunday.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`;

  const handleJumpToToday = () => {
    onSelectDate(todayDateStr);
    setViewYear(todayYear);
    setViewMonth(todayMonth);
    onClose();
  };

  const handleJumpToSunday = () => {
    onSelectDate(nextSundayDateStr);
    setViewYear(sundayYear);
    setViewMonth(sundayMonth);
    onClose();
  };

  const monthName = new Date(viewYear, viewMonth, 1).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  const selectedDayInfo = liturgicalDays.find(d => d.date === selectedDateStr);

  return (
    <div 
      ref={containerRef}
      className={`absolute top-full mt-2 z-50 ${align === 'left' ? 'left-0 right-auto' : 'right-0 left-auto'} w-[285px] sm:w-[305px] max-w-[calc(100vw-1.5rem)] rounded-xl overflow-hidden border border-[#A78262] shadow-[0_18px_40px_rgba(40,22,12,0.35)] bg-gradient-to-b from-[#E4D5C6] via-[#DBC9B7] to-[#E4D5C6] backdrop-blur-2xl text-[#3A2213] animate-fadeIn`}
    >
      {/* Header: Month / Year Navigation */}
      <div className="px-3.5 py-2.5 border-b border-[#BFA287] bg-[#D2BEAA]/90 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <CalendarIcon className="w-4 h-4 text-[#5D371F]" />
          <h3 className="font-cinzel text-xs sm:text-sm font-bold text-[#341D10] tracking-wide">
            {monthName}
          </h3>
        </div>

        <div className="flex items-center gap-0.5">
          <button
            onClick={handlePrevMonth}
            className="p-1 rounded-md text-[#5D371F] hover:text-[#25130A] hover:bg-[#C4AC94]/70 transition-colors cursor-pointer"
            title="Previous Month"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-1 rounded-md text-[#5D371F] hover:text-[#25130A] hover:bg-[#C4AC94]/70 transition-colors cursor-pointer"
            title="Next Month"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onClose}
            className="ml-1 p-1 rounded-md text-[#6D452B] hover:text-[#25130A] hover:bg-[#C4AC94]/70 transition-colors cursor-pointer"
            title="Close Calendar"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Quick Jump Bar */}
      <div className="px-3 py-1.5 bg-[#CBB5A0]/85 border-b border-[#BFA287]/80 flex flex-wrap items-center justify-between gap-1 text-[11px]">
        <button
          onClick={handleJumpToToday}
          className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-serif font-bold bg-[#EFE4D7] text-[#341D10] hover:bg-[#FAF4ED] border border-[#A78262]/60 transition-all cursor-pointer shadow-2xs"
          title={`Select ${todayLabel}`}
        >
          <Clock className="w-2.5 h-2.5 text-[#5D371F]" />
          <span>{todayLabel}</span>
        </button>
        <button
          onClick={handleJumpToSunday}
          className="text-[10px] font-serif text-[#4D2C17] hover:text-[#25130A] underline cursor-pointer font-bold"
          title={`Select ${nextSundayLabel}`}
        >
          {nextSundayLabel}
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="p-2.5 sm:p-3 space-y-1.5 bg-[#DFCFBE]/50">
        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-1 text-center font-cinzel text-[10px] font-bold pb-0.5 text-[#6D482F]">
          <span className="text-[#7A3E1B]">Sun</span>
          <span>Mon</span>
          <span>Tue</span>
          <span>Wed</span>
          <span>Thu</span>
          <span>Fri</span>
          <span>Sat</span>
        </div>

        {/* Days Matrix */}
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells before month starts */}
          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
            <div key={`empty-${i}`} className="h-7 sm:h-8 rounded-lg opacity-0" />
          ))}

          {/* Actual Month Days */}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const dayNum = index + 1;
            const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
            const isSelected = dateStr === selectedDateStr;
            const isToday = dateStr === todayDateStr;
            const dayData = liturgicalDays[index];
            const colorMeta = dayData ? LITURGICAL_COLORS_INFO[dayData.color] : LITURGICAL_COLORS_INFO.white;
            const isSunday = (firstDayOfWeek + index) % 7 === 0;

            return (
              <button
                key={dateStr}
                onClick={() => {
                  onSelectDate(dateStr);
                  onClose();
                }}
                title={dayData ? `${dayData.title} (${colorMeta.name})` : dateStr}
                className={`relative flex flex-col items-center justify-center h-7 sm:h-8 rounded-lg transition-all duration-150 cursor-pointer group text-xs ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#5D371F] via-[#4A2A17] to-[#341D10] text-[#FFFDF8] font-bold shadow-sm border border-[#25130A] scale-105 z-10'
                    : isToday
                    ? 'bg-[#EBDDCF] text-[#341D10] font-bold border border-[#8B5A2B] hover:bg-[#F2E8DC]'
                    : 'bg-[#F6EFE7]/90 hover:bg-[#EAE0D3] text-[#3B2213] border border-[#D5C2B0]/80 hover:border-[#A78262]'
                }`}
              >
                <span className={`font-serif text-xs leading-none ${isSunday && !isSelected ? 'text-[#7A3E1B] font-bold' : ''}`}>
                  {dayNum}
                </span>

                {/* Liturgical Day Color Indicator Dot */}
                <div className="flex items-center gap-0.5 mt-0.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'ring-1 ring-white/60' : 'shadow-2xs'}`}
                    style={{ backgroundColor: colorMeta.hex }}
                    title={`Liturgical Color: ${colorMeta.name}`}
                  />
                  {dayData?.rank === 'Solemnity' && (
                    <span className="w-1 h-1 rounded-full bg-[#8B5A2B] animate-pulse" title="Solemnity" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Info Preview Banner */}
      {selectedDayInfo && (
        <div className="px-3.5 py-2 bg-[#D0BC9F]/90 border-t border-[#BFA287] text-xs space-y-0.5">
          <div className="flex items-center justify-between">
            <span className="font-serif text-[10px] text-[#4D2C17] font-bold flex items-center gap-1.5">
              <span 
                className="w-2 h-2 rounded-full inline-block shrink-0 shadow-2xs" 
                style={{ backgroundColor: LITURGICAL_COLORS_INFO[selectedDayInfo.color].hex }} 
              />
              {selectedDayInfo.rank} • {LITURGICAL_COLORS_INFO[selectedDayInfo.color].name}
            </span>
            <span className="text-[10px] text-[#5D371F] font-serif font-medium">
              {selectedDayInfo.date}
            </span>
          </div>
          <p className="font-serif text-[#2B170B] text-[11px] font-medium line-clamp-1">
            {selectedDayInfo.title}
          </p>
        </div>
      )}

      {/* Liturgical Color Key Footer */}
      <div className="px-3 py-1.5 bg-[#C5AE96] border-t border-[#B7997E] flex items-center justify-between text-[9px] text-[#4D2C17] font-serif font-medium">
        <span className="hidden sm:inline">Liturgical Colors:</span>
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#15803d]" />
            <span>Green</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#eab308]" />
            <span>White</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#b91c1c]" />
            <span>Red</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#6b21a8]" />
            <span>Violet</span>
          </div>
        </div>
      </div>

    </div>
  );
};

