import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Sparkles, 
  Clock,
  Church,
  Award,
  Globe,
  MapPin
} from 'lucide-react';
import { LiturgicalDayInfo, LiturgicalColor } from '../types';
import { getLiturgicalMonth, LITURGICAL_COLORS_INFO } from '../data/liturgicalCalendar';

interface SpecialReligiousEvent {
  id: string;
  dateRange: string;
  targetDateStr: string;
  title: string;
  authority: 'both' | 'vatican' | 'cebu';
  authorityLabel: string;
  liturgicalRank: string;
  vaticanObservance: string;
  cebuObservance: string;
  indulgenceGrant?: {
    type: 'Plenary Indulgence' | 'Plenary & Partial Indulgence';
    summary: string;
    prescribedWork: string;
  };
}

const NOVEMBER_SPECIAL_EVENTS: SpecialReligiousEvent[] = [
  {
    id: 'nov-1-all-saints',
    dateRange: 'November 1',
    targetDateStr: '2026-11-01',
    title: 'Solemnity of All Saints & Opening of the All Souls Octave',
    authority: 'both',
    authorityLabel: 'Vatican & Archdiocese of Cebu',
    liturgicalRank: 'Solemnity • Holy Day of Obligation',
    vaticanObservance:
      'Papal Angelus in St. Peter’s Square and solemn liturgical commemoration of all the redeemed in heaven, canonized and unknown.',
    cebuObservance:
      'Solemn Pontifical Masses at the Cebu Metropolitan Cathedral and Basilica Minore del Santo Niño; traditional Kalag-Kalag vigil prayers and blessing of family tombs across Cebu cemeteries.',
    indulgenceGrant: {
      type: 'Plenary Indulgence',
      summary: 'Daily Plenary Indulgence for the Holy Souls in Purgatory (Nov 1 – Nov 8)',
      prescribedWork:
        'Devoutly visit a cemetery and pray (even mentally) for the faithful departed on any day from November 1 to November 8, under the usual conditions (Sacramental Confession, Eucharistic Communion, and prayer for the Holy Father’s intentions).'
    }
  },
  {
    id: 'nov-2-all-souls',
    dateRange: 'November 2',
    targetDateStr: '2026-11-02',
    title: 'The Commemoration of All the Faithful Departed (All Souls’ Day)',
    authority: 'both',
    authorityLabel: 'Vatican & Archdiocese of Cebu',
    liturgicalRank: 'Universal Commemoration • Three Requiem Masses',
    vaticanObservance:
      'The Supreme Pontiff celebrates the Afternoon Papal Requiem Mass at Rome’s monumental Verano Cemetery (4:00 PM) in suffrage for all the faithful departed.',
    cebuObservance:
      'Every priest in the Archdiocese of Cebu is privileged to offer three Requiem Masses (for a particular intention, for all the faithful departed, and for the intentions of the Pope) in all parishes, shrines, and public cemeteries.',
    indulgenceGrant: {
      type: 'Plenary Indulgence',
      summary: 'All Souls’ Day Pious Visit to a Church or Oratory',
      prescribedWork:
        'Devoutly visit any parish church or public oratory on November 2 and recite one Our Father (Pater Noster) and the Apostles’ Creed (Credo), applicable solely to the Holy Souls in Purgatory.'
    }
  },
  {
    id: 'nov-1-8-octave',
    dateRange: 'November 1 – 8',
    targetDateStr: '2026-11-03',
    title: 'Octave of Suffrages for the Holy Souls & Parish Necrology Masses',
    authority: 'both',
    authorityLabel: 'Apostolic Penitentiary & Archdiocese of Cebu',
    liturgicalRank: 'Octave of Prayer for the Church Suffering',
    vaticanObservance:
      'Under Norm 29 of the Enchiridion Indulgentiarum, the Apostolic Penitentiary grants daily plenary indulgences for cemetery visits and partial indulgences for reciting the Requiem Aeternam or Office of the Dead.',
    cebuObservance:
      'Cebu parishes offer the Nine-Day Novena of Masses (Misa Pro Defunctis) at the altar for deceased priests, former seminarians, parents, benefactors, and parishioners inscribed in the November remembrance envelopes.',
    indulgenceGrant: {
      type: 'Plenary & Partial Indulgence',
      summary: 'Daily Cemetery Visit (Plenary) & Eternal Rest Prayer (Partial)',
      prescribedWork:
        'Gain one Plenary Indulgence each day (Nov 1–8) by visiting a cemetery and praying for the dead; gain a Partial Indulgence throughout November whenever devoutly reciting "Eternal rest grant unto them, O Lord..."'
    }
  },
  {
    id: 'nov-5-deceased-bishops',
    dateRange: 'November 5',
    targetDateStr: '2026-11-05',
    title: 'Papal Chapel Mass for Deceased Cardinals, Archbishops, and Bishops',
    authority: 'vatican',
    authorityLabel: 'The Vatican • Papal Chapel',
    liturgicalRank: 'Solemn Papal Requiem Liturgy',
    vaticanObservance:
      'Celebrated at 9:00 AM at the Altar of the Cathedra in St. Peter’s Basilica by the Holy Father in suffrage for all Cardinals and Bishops of the Universal Church who have passed away during the past year.',
    cebuObservance:
      'Archdiocesan clergy, seminarians of San Carlos Seminary, and lay faithful unite in prayer for deceased Cebuano bishops, monsignori, and priests buried in the Cathedral crypt and Carreta Cemetery.'
  },
  {
    id: 'nov-9-lateran-basilica',
    dateRange: 'November 9',
    targetDateStr: '2026-11-09',
    title: 'Feast of the Dedication of the Lateran Basilica (Omnium Urbis et Orbis Ecclesiarum Mater et Caput)',
    authority: 'both',
    authorityLabel: 'Vatican & Archdiocese of Cebu',
    liturgicalRank: 'Feast of the Lord',
    vaticanObservance:
      'Celebrates the 324 AD dedication of the Archbasilica of St. John Lateran, the Pope’s Cathedral as Bishop of Rome and "Mother and Head of all Churches of the City and the World."',
    cebuObservance:
      'Special liturgical observance at the Cebu Metropolitan Cathedral and the Basilica Minore del Santo Niño (which enjoys a special bond of spiritual affinity with the Papal Basilicas of Rome).',
    indulgenceGrant: {
      type: 'Plenary Indulgence',
      summary: 'Pilgrim Visit to a Cathedral or Minor Basilica',
      prescribedWork:
        'Devoutly visit a Cathedral or Minor Basilica (such as the Basilica Minore del Santo Niño or Cebu Metropolitan Cathedral) on solemn liturgical occasions and recite one Our Father and the Creed.'
    }
  },
  {
    id: 'nov-15-world-day-poor',
    dateRange: 'November 15 (33rd Sunday)',
    targetDateStr: '2026-11-15',
    title: 'World Day of the Poor (33rd Sunday in Ordinary Time)',
    authority: 'both',
    authorityLabel: 'Vatican & Archdiocese of Cebu',
    liturgicalRank: 'Universal Pastoral Observance',
    vaticanObservance:
      'Papal Mass in St. Peter’s Basilica for the poor and marginalized, followed by the Holy Father’s fraternal luncheon with indigent guests in the Paul VI Audience Hall.',
    cebuObservance:
      'Caritas Cebu and the Archdiocesan Commission on Service lead parish-wide feeding programs, medical missions, and Corporal Works of Mercy for street families and urban poor communities across Metro Cebu.'
  },
  {
    id: 'nov-18-st-peters-400',
    dateRange: 'November 18',
    targetDateStr: '2026-11-18',
    title: '400th Anniversary of the Dedication of the Papal Basilica of St. Peter in the Vatican (1626–2026)',
    authority: 'vatican',
    authorityLabel: 'The Vatican • Quadricentennial Jubilee',
    liturgicalRank: 'Memorial & Historic 400th Centenary',
    vaticanObservance:
      'Solemn Papal Mass in St. Peter’s Basilica (5:00 PM) commemorating the fourth centenary of the consecration of St. Peter’s Basilica by Pope Urban VIII on November 18, 1626, alongside the Basilica of St. Paul Outside the Walls.',
    cebuObservance:
      'Parishes and shrines in Cebu pray for the Supreme Pontiff and the Universal Church, honoring the martyrdom and faith of Saints Peter and Paul.',
    indulgenceGrant: {
      type: 'Plenary Indulgence',
      summary: 'Dedication of the Basilicas of Sts. Peter and Paul',
      prescribedWork:
        'Granted to the faithful who devoutly visit a Minor Basilica or unite spiritually with the Papal Basilicas on their Feast of Dedication, reciting the Our Father and the Creed for the intentions of the Holy Father.'
    }
  },
  {
    id: 'nov-21-regla-cebu',
    dateRange: 'November 12 – 21',
    targetDateStr: '2026-11-21',
    title: 'Presentation of the Blessed Virgin Mary & Archdiocesan Fiesta of Our Lady of the Rule (Birhen sa Regla)',
    authority: 'cebu',
    authorityLabel: 'Archdiocese of Cebu • National Marian Shrine',
    liturgicalRank: 'Memorial & Archdiocesan Marian Pilgrimage',
    vaticanObservance:
      'Universal Memorial of the Presentation of the Blessed Virgin Mary in the Temple of Jerusalem, model of total consecration to God.',
    cebuObservance:
      'Thousands of Cebuano pilgrims cross to the National Shrine of Our Lady of the Rule (Birhen sa Regla) in Lapu-Lapu City (Archdiocese of Cebu) for the Novena, fluvial/foot processions, and Pontifical Fiesta Mass.',
    indulgenceGrant: {
      type: 'Plenary Indulgence',
      summary: 'National Shrine Titular Feast Pilgrimage Indulgence',
      prescribedWork:
        'Devoutly visit the National Shrine on its titular feast day, participate in the Sacred Liturgy, and recite the Our Father and the Creed under the usual four conditions.'
    }
  },
  {
    id: 'nov-22-christ-the-king',
    dateRange: 'November 22 (Last Sunday)',
    targetDateStr: '2026-11-22',
    title: 'Solemnity of Our Lord Jesus Christ, King of the Universe & Archdiocesan Youth Day',
    authority: 'both',
    authorityLabel: 'Vatican & Archdiocese of Cebu',
    liturgicalRank: 'Solemnity • Climax of the Liturgical Year',
    vaticanObservance:
      'Closing Sunday of the Liturgical Year in St. Peter’s Basilica and Diocesan celebration of World Youth Day across the globe.',
    cebuObservance:
      'Grand Archdiocesan Eucharistic Processions, Parish Holy Hours before the Exposed Blessed Sacrament, solemn Benediction, and Commission on Youth (COY) gatherings across all Cebu vicariates.',
    indulgenceGrant: {
      type: 'Plenary Indulgence',
      summary: 'Public Act of Consecration of the Human Race to Jesus Christ the King',
      prescribedWork:
        'Granted on the Solemnity of Christ the King to the faithful who publicly recite the Act of Consecration of the Human Race to Christ the King ("Most Sweet Jesus, Redeemer of the human race..."), under the usual conditions.'
    }
  },
  {
    id: 'nov-29-first-sunday-advent',
    dateRange: 'November 29',
    targetDateStr: '2026-11-29',
    title: 'First Sunday of Advent & Opening of the New Liturgical Year',
    authority: 'both',
    authorityLabel: 'Vatican & Archdiocese of Cebu',
    liturgicalRank: 'First Class Liturgical Sunday (Violet)',
    vaticanObservance:
      'Begins the new Liturgical Cycle of sacred preparation for the Nativity of Our Lord and His Second Coming in glory.',
    cebuObservance:
      'Blessing of the Advent Wreath and lighting of the first purple candle (Hope) in all Cebu parishes, inaugurating spiritual preparation for the December Misa de Gallo (Simbang Gabi).'
  }
];

interface ChurchCalendarViewProps {
  onSelectDate: (dateStr: string) => void;
  selectedDateStr: string;
  onOpenCebuParishes?: () => void;
}

export const ChurchCalendarView: React.FC<ChurchCalendarViewProps> = ({
  onSelectDate,
  selectedDateStr,
  onOpenCebuParishes
}) => {
  const now = new Date();
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(now.getMonth()); // 0-indexed
  const [inspectedDay, setInspectedDay] = useState<LiturgicalDayInfo | null>(null);
  const [eventsFilter, setEventsFilter] = useState<'all' | 'vatican' | 'cebu' | 'indulgences'>('all');

  const days = getLiturgicalMonth(currentYear, currentMonth);
  const monthName = new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long' });

  // Next month calculation for completion squares
  const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  const nextYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  const nextMonthDays = getLiturgicalMonth(nextYear, nextMonth);
  const nextMonthShortName = new Date(nextYear, nextMonth, 1).toLocaleDateString('en-US', { month: 'short' });

  // Exactly 8 rows of 4 squares = 32 squares total
  const remainingSlots = Math.max(0, 32 - days.length);
  const completionDays = nextMonthDays.slice(0, remainingSlots);

  // First day of week padding
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  // Dynamic Today and upcoming Sunday calculation (matching dropdown calendar)
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

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handleJumpToToday = () => {
    onSelectDate(todayDateStr);
    setCurrentYear(todayYear);
    setCurrentMonth(todayMonth);
    const day = days.find(d => d.date === todayDateStr);
    if (day) setInspectedDay(day);
  };

  const handleJumpToSunday = () => {
    onSelectDate(nextSundayDateStr);
    setCurrentYear(sundayYear);
    setCurrentMonth(sundayMonth);
    const day = days.find(d => d.date === nextSundayDateStr);
    if (day) setInspectedDay(day);
  };

  return (
    <div className="max-w-5xl mx-auto p-3 sm:p-6 md:p-8 rounded-xl bg-[#F6F2EA]/85 backdrop-blur-xl backdrop-saturate-150 border border-[#DFD6C7] ring-1 ring-inset ring-white/60 shadow-[0_8px_32px_0_rgba(51,65,85,0.12)] space-y-5 mb-12">
      
      {/* Calendar Header Banner — Slate Gray & Bleached Sand */}
      <div className="sanctum-top-banner px-5 pt-4 pb-4 sm:px-6 min-h-[164px] rounded-xl border border-slate-700/80 shadow-md bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-[#F9F6F0] flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="pointer-events-none absolute -right-12 -bottom-12 w-72 h-44 rounded-full bg-[#EAE2D3]/15 blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-[#EAE2D3]" />
            <span className="font-cinzel text-xs sm:text-sm font-bold uppercase tracking-wider text-[#DFD5C3] leading-none">
              Calendarium Romanum Generale
            </span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#FBF9F5] mt-1 tracking-wide leading-tight">
            Liturgical Calendar and Feasts
          </h2>
          <p className="text-sm sm:text-base text-[#EAE2D3] font-serif mt-1 leading-snug">
            Liturgical seasons, colors, Solemnities, Feasts, Memorials, and Holy Days of Obligation.
          </p>
        </div>

        {/* Month & Year (2026–2030) Selector Buttons */}
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-800/90 p-1.5 rounded-xl border border-slate-600/70 shadow-2xs">
            {[2026, 2027, 2028, 2029, 2030].map((yr) => (
              <button
                key={yr}
                onClick={() => setCurrentYear(yr)}
                className={`px-2.5 py-1 rounded-lg font-cinzel text-xs font-bold transition-colors cursor-pointer ${
                  currentYear === yr
                    ? 'bg-[#F4EFE6] text-slate-900 shadow-sm border border-[#DFD5C3]'
                    : 'bg-slate-900/70 hover:bg-slate-700 text-[#EAE2D3] border border-slate-600/60'
                }`}
                title={`View ${yr} Liturgical Calendar`}
              >
                {yr}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 bg-slate-800/90 p-1.5 rounded-xl border border-slate-600/70 shadow-2xs">
            <button
              onClick={handlePrevMonth}
              className="p-2 rounded-lg bg-slate-900/70 hover:bg-slate-700 text-[#EAE2D3] border border-slate-600/70 transition-colors cursor-pointer shadow-2xs"
              title="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <span className="font-cinzel text-base sm:text-lg font-bold text-[#FBF9F5] min-w-36 text-center tracking-wide leading-tight">
              {monthName} {currentYear}
            </span>

            <button
              onClick={handleNextMonth}
              className="p-2 rounded-lg bg-slate-900/70 hover:bg-slate-700 text-[#EAE2D3] border border-slate-600/70 transition-colors cursor-pointer shadow-2xs"
              title="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Jump Bar & Liturgical Colors Legend */}
      <div className="px-4 py-2.5 bg-[#F4EFE6]/90 backdrop-blur-md border border-[#D8CFC0] rounded-xl flex flex-wrap items-center justify-between gap-2.5 text-xs sm:text-sm shadow-2xs">
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleJumpToToday}
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs sm:text-sm font-serif font-bold bg-[#FBF9F5] text-slate-900 hover:bg-[#EAE2D3] border border-[#C8BBA6] transition-all cursor-pointer shadow-2xs leading-none"
            title={`Select ${todayLabel}`}
          >
            <Clock className="w-3.5 h-3.5 text-slate-600" />
            <span>{todayLabel}</span>
          </button>

          <button
            onClick={handleJumpToSunday}
            className="px-2.5 py-1 text-xs sm:text-sm font-serif text-slate-700 hover:text-slate-950 font-bold underline cursor-pointer leading-none"
            title={`Select ${nextSundayLabel}`}
          >
            {nextSundayLabel}
          </button>
        </div>

        {/* Liturgical Colors Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-cinzel leading-none">
          {(['green', 'white', 'red', 'violet', 'rose'] as LiturgicalColor[]).map(color => {
            const meta = LITURGICAL_COLORS_INFO[color];
            return (
              <div key={color} className="flex items-center gap-1.5" title={meta.meaning}>
                <span className="w-2.5 h-2.5 rounded-full ring-1 ring-slate-900/25" style={{ backgroundColor: meta.hex }} />
                <span className="text-slate-700 font-semibold">{meta.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Monthly Grid: Eight Rows with Four Squares Each (32 Squares Total) */}
      <div className="rounded-xl p-3 sm:p-5 border border-[#DFD6C7] shadow-xs bg-[#FBF9F5]/95 backdrop-blur-xl">
        
        {/* 8 Rows × 4 Squares Grid */}
        <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
          {/* Current Month Days */}
          {days.map((dayInfo, idx) => {
            const dayNum = idx + 1;
            const dateObj = new Date(currentYear, currentMonth, dayNum);
            const weekdayShort = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
            const isSunday = dateObj.getDay() === 0;
            const isToday = dayInfo.date === todayDateStr;
            const isSelected = selectedDateStr === dayInfo.date;
            const colorMeta = LITURGICAL_COLORS_INFO[dayInfo.color];

            // Check if day celebrates a specific saint or feast
            const hasCelebratedSaintOrFeast = Boolean(
              dayInfo.saintName || 
              dayInfo.rank === 'Solemnity' || 
              dayInfo.rank === 'Feast' || 
              dayInfo.rank === 'Memorial'
            );

            // Display title: Saint name if present, or feast title, or regular day title
            const displayTitle = dayInfo.saintName 
              ? dayInfo.saintName 
              : dayInfo.rank === 'Sunday' 
                ? (dayInfo.title.includes('(') ? dayInfo.title.split('(')[0].trim() : dayInfo.title)
                : dayInfo.title.replace('in Ordinary Time', '').trim();

            return (
              <div
                key={dayInfo.date}
                onClick={() => {
                  setInspectedDay(dayInfo);
                  onSelectDate(dayInfo.date);
                }}
                className={`min-h-[105px] sm:min-h-[118px] p-2 sm:p-2.5 rounded-xl transition-all duration-150 cursor-pointer flex flex-col justify-between relative group bg-gradient-to-br from-[#FBF9F5] via-[#F6F2EA] to-[#ECE5D5] hover:from-white hover:to-[#F4EFE6] text-slate-900 ${
                  isSelected
                    ? 'border-2 border-slate-800 ring-2 ring-slate-500/35 shadow-[0_8px_24px_rgba(51,65,85,0.16)] scale-[1.01] z-10'
                    : isToday
                      ? 'border-2 border-slate-600 shadow-xs'
                      : 'border border-[#D8CFC0] hover:border-slate-500 shadow-[0_3px_14px_rgba(51,65,85,0.06)]'
                }`}
              >
                {/* Date number, day of week, and color indicator */}
                <div className="flex items-center justify-between leading-none">
                  <div className="flex items-center gap-1.5">
                    <span className={`font-bold font-cinzel leading-none ${
                      isSelected 
                        ? 'w-6 h-6 rounded-full bg-slate-900 text-[#FBF9F5] flex items-center justify-center text-xs sm:text-sm font-bold shadow-2xs' 
                        : isToday 
                          ? 'w-6 h-6 rounded-full bg-slate-700 text-[#FBF9F5] flex items-center justify-center text-xs sm:text-sm font-bold shadow-2xs' 
                          : isSunday 
                            ? 'text-slate-800 text-sm sm:text-base' 
                            : 'text-slate-900 text-sm sm:text-base'
                    }`}>
                      {dayNum}
                    </span>
                    <span className={`text-[11px] sm:text-xs font-cinzel font-bold tracking-wider uppercase ${isSunday ? 'text-slate-800' : 'text-slate-600'}`}>
                      {weekdayShort}
                    </span>
                  </div>

                  <span 
                    className="w-2.5 h-2.5 rounded-full ring-1 ring-slate-900/25 shadow-2xs shrink-0" 
                    style={{ backgroundColor: colorMeta.hex }} 
                    title={`Color: ${colorMeta.name}`}
                  />
                </div>

                {/* Feast title snippet with comfortable, clear font size and narrowed line spacing */}
                <div className="mt-1 flex-1">
                  <p 
                    className={`text-[12.5px] sm:text-[13.5px] font-serif line-clamp-2 leading-[1.18] tracking-tight ${
                      hasCelebratedSaintOrFeast 
                        ? 'font-bold text-slate-900' 
                        : 'font-normal text-slate-700'
                    }`}
                  >
                    {displayTitle}
                  </p>
                </div>

                {/* Badges: History, Solemnity (Obligation), Fasting (Penance) */}
                <div className="flex flex-wrap items-center gap-1 mt-1">
                  {dayInfo.historicalEvent && (
                    <span 
                      className="text-[9.5px] sm:text-[10px] px-1.5 py-0.5 rounded-xs font-medium leading-none bg-[#EAE2D3] text-slate-800 border border-[#C8BBA6]" 
                      title={dayInfo.historicalEvent.title}
                    >
                      {dayInfo.historicalEvent.year}
                    </span>
                  )}
                  {dayInfo.isHolyDay && (
                    <span 
                      className="text-[9.5px] sm:text-[10px] px-1.5 py-0.5 rounded-xs font-bold leading-none bg-slate-800 text-[#F9F6F0] border border-slate-900" 
                      title="Holy Day of Obligation"
                    >
                      Obligation
                    </span>
                  )}
                  {dayInfo.isFastingDay && (
                    <span 
                      className="text-[9.5px] sm:text-[10px] px-1.5 py-0.5 rounded-xs leading-none bg-[#DFD5C3] text-slate-800 border border-[#C8BBA6]" 
                      title="Day of Penance / Abstinence"
                    >
                      Penance
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {/* Completion Days to guarantee exactly 8 rows with 4 squares each (32 squares total) */}
          {completionDays.map((nextDayInfo, cIdx) => {
            const nextDayNum = cIdx + 1;
            const nextDateObj = new Date(nextYear, nextMonth, nextDayNum);
            const nextWeekdayShort = nextDateObj.toLocaleDateString('en-US', { weekday: 'short' });
            const isNextSunday = nextDateObj.getDay() === 0;
            const nextColorMeta = LITURGICAL_COLORS_INFO[nextDayInfo.color];
            const nextDisplayTitle = nextDayInfo.saintName
              ? nextDayInfo.saintName
              : nextDayInfo.rank === 'Sunday'
                ? (nextDayInfo.title.includes('(') ? nextDayInfo.title.split('(')[0].trim() : nextDayInfo.title)
                : nextDayInfo.title.replace('in Ordinary Time', '').trim();

            return (
              <div
                key={`next-${nextDayInfo.date}`}
                onClick={() => {
                  setCurrentMonth(nextMonth);
                  setCurrentYear(nextYear);
                  setInspectedDay(nextDayInfo);
                  onSelectDate(nextDayInfo.date);
                }}
                className="min-h-[105px] sm:min-h-[118px] p-2 sm:p-2.5 rounded-xl transition-all duration-150 cursor-pointer flex flex-col justify-between relative group bg-[#F4EFE6]/70 hover:bg-[#FBF9F5] text-slate-700 border border-dashed border-[#C8BBA6] shadow-2xs hover:border-slate-500"
                title={`Next Month: Click to view ${nextMonthShortName} ${nextDayNum}`}
              >
                {/* Date number, day of week, and color indicator */}
                <div className="flex items-center justify-between leading-none">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs sm:text-sm font-bold font-cinzel text-slate-700">
                      {nextMonthShortName} {nextDayNum}
                    </span>
                    <span className={`text-[10.5px] sm:text-xs font-cinzel font-semibold uppercase ${isNextSunday ? 'text-slate-700' : 'text-slate-500'}`}>
                      {nextWeekdayShort}
                    </span>
                  </div>
                  <span 
                    className="w-2.5 h-2.5 rounded-full ring-1 ring-slate-900/25 shadow-2xs shrink-0" 
                    style={{ backgroundColor: nextColorMeta.hex }} 
                    title={`Color: ${nextColorMeta.name}`}
                  />
                </div>

                {/* Feast title */}
                <div className="mt-1 flex-1">
                  <p className="text-[12px] sm:text-[13px] font-serif line-clamp-2 leading-[1.18] tracking-tight text-slate-600">
                    {nextDisplayTitle}
                  </p>
                </div>

                {/* Next month indicator badge */}
                <div className="flex items-center justify-between text-[9.5px] sm:text-[10px] font-cinzel text-slate-600 pt-0.5">
                  <span className="bg-[#EAE2D3] px-1.5 py-0.5 rounded text-slate-700 font-semibold border border-[#D8CFC0]">
                    Next Month
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Day Details Drawer / Inspector in Slate Gray & Bleached Sand */}
      {inspectedDay && (
        <div className="bg-[#F9F6F0] rounded-xl p-6 sm:p-7 shadow-md border-2 border-slate-600/70 text-slate-900 space-y-4 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#D8CFC0] pb-3.5">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span 
                  className="px-2.5 py-0.5 rounded-full text-xs sm:text-sm font-semibold uppercase font-cinzel shadow-2xs leading-none ring-1 ring-slate-900/15"
                  style={{ 
                    backgroundColor: LITURGICAL_COLORS_INFO[inspectedDay.color].hex, 
                    color: inspectedDay.color === 'white' ? '#0f172a' : '#ffffff' 
                  }}
                >
                  {LITURGICAL_COLORS_INFO[inspectedDay.color].name} • {inspectedDay.rank}
                </span>
                <span className="text-xs sm:text-sm text-slate-600 font-serif font-bold leading-none">{inspectedDay.date}</span>
              </div>
              <h3 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-bold text-slate-900 leading-tight mt-0.5">
                {inspectedDay.title}
              </h3>
            </div>

            <button
              onClick={() => onSelectDate(inspectedDay.date)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-900 text-[#F9F6F0] border border-slate-900 text-xs sm:text-sm font-cinzel font-bold shadow-xs transition-all cursor-pointer shrink-0 leading-none"
            >
              <BookOpen className="w-4 h-4" />
              <span>Read Day's Mass Readings</span>
            </button>
          </div>

          {/* HISTORICAL CATHOLIC EVENT ON THIS DAY */}
          {inspectedDay.historicalEvent ? (
            <div className="p-4 sm:p-5 rounded-xl bg-[#EFE9DC] border border-[#C8BBA6] shadow-2xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 font-cinzel flex items-center gap-1.5 leading-none">
                  <Sparkles className="w-4 h-4 text-slate-600" />
                  This Day in Catholic History ({inspectedDay.historicalEvent.year})
                </span>
                <span className="text-xs sm:text-sm font-bold font-cinzel text-slate-900 bg-[#DFD5C3] px-2 py-0.5 rounded-md border border-[#C8BBA6] leading-none">
                  {inspectedDay.historicalEvent.year}
                </span>
              </div>
              <h4 className="font-cinzel font-bold text-base sm:text-lg md:text-xl text-slate-900 leading-snug">
                {inspectedDay.historicalEvent.title}
              </h4>
              <p className="font-serif text-slate-800 text-sm sm:text-base md:text-[17px] leading-snug">
                {inspectedDay.historicalEvent.description}
              </p>
              {inspectedDay.historicalEvent.significance && (
                <p className="text-xs sm:text-sm font-serif italic text-slate-700 pt-1 border-t border-[#D8CFC0] leading-snug">
                  Ecclesial Significance: {inspectedDay.historicalEvent.significance}
                </p>
              )}
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-[#FBF9F5] border border-[#D8CFC0] text-sm sm:text-base text-slate-700 font-serif leading-snug">
              <span className="font-cinzel font-bold text-slate-900 block mb-1 leading-tight">Liturgical Commemoration</span>
              Each day in the Roman rite is consecrated to Christ through the Holy Sacrifice of the Mass and the Liturgy of the Hours celebrated worldwide.
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm font-serif leading-snug">
            <div className="p-3 bg-[#FBF9F5] rounded-xl border border-[#D8CFC0]">
              <span className="font-bold text-slate-900 font-cinzel block text-xs sm:text-sm leading-tight">Liturgical Season:</span>
              <p className="text-slate-700 mt-1 leading-snug">{inspectedDay.season}</p>
            </div>

            <div className="p-3 bg-[#FBF9F5] rounded-xl border border-[#D8CFC0]">
              <span className="font-bold text-slate-900 font-cinzel block text-xs sm:text-sm leading-tight">Precept and Obligation:</span>
              <p className="text-slate-700 mt-1 leading-snug">
                {inspectedDay.isHolyDay ? 'Holy Day of Obligation (Mass Attendance Required)' : 'Standard Liturgical Day'}
              </p>
            </div>

            <div className="p-3 bg-[#FBF9F5] rounded-xl border border-[#D8CFC0]">
              <span className="font-bold text-slate-900 font-cinzel block text-xs sm:text-sm leading-tight">Fast and Abstinence:</span>
              <p className="text-slate-700 mt-1 leading-snug">
                {inspectedDay.isFastingDay ? 'Traditional Friday Abstinence from Meat' : 'No specific fasting prescribed'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          UPCOMING SPECIAL RELIGIOUS EVENTS
          (TAKING CUE FROM THE VATICAN & THE ARCHDIOCESE OF CEBU)
         ===================================================================== */}
      <div className="rounded-xl p-4 sm:p-6 border border-[#DFD6C7] shadow-xs bg-[#FBF9F5]/95 backdrop-blur-xl text-slate-900 space-y-4">
        
        {/* Section Header */}
        <div className="border-b border-[#D8CFC0] pb-3.5 space-y-2.5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Award className="w-5 h-5 text-slate-600" />
                <span className="font-cinzel text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-600">
                  The Vatican (Holy See) &amp; Archdiocese of Cebu
                </span>
              </div>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mt-0.5">
                Upcoming Special Religious Events
              </h3>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 shrink-0">
              <button
                type="button"
                onClick={() => setEventsFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-cinzel font-bold transition-all cursor-pointer border ${
                  eventsFilter === 'all'
                    ? 'bg-slate-800 text-[#F9F6F0] border-slate-900 shadow-2xs'
                    : 'bg-[#F4EFE6] hover:bg-[#EAE2D3] text-slate-700 border-[#D8CFC0]'
                }`}
              >
                All Events ({NOVEMBER_SPECIAL_EVENTS.length})
              </button>
              <button
                type="button"
                onClick={() => setEventsFilter('vatican')}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-cinzel font-bold transition-all cursor-pointer border ${
                  eventsFilter === 'vatican'
                    ? 'bg-slate-800 text-[#F9F6F0] border-slate-900 shadow-2xs'
                    : 'bg-[#F4EFE6] hover:bg-[#EAE2D3] text-slate-700 border-[#D8CFC0]'
                }`}
              >
                Vatican
              </button>
              <button
                type="button"
                onClick={() => setEventsFilter('cebu')}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-cinzel font-bold transition-all cursor-pointer border ${
                  eventsFilter === 'cebu'
                    ? 'bg-slate-800 text-[#F9F6F0] border-slate-900 shadow-2xs'
                    : 'bg-[#F4EFE6] hover:bg-[#EAE2D3] text-slate-700 border-[#D8CFC0]'
                }`}
              >
                Archdiocese of Cebu
              </button>
              <button
                type="button"
                onClick={() => setEventsFilter('indulgences')}
                className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-cinzel font-bold transition-all cursor-pointer border ${
                  eventsFilter === 'indulgences'
                    ? 'bg-slate-800 text-[#F9F6F0] border-slate-900 shadow-2xs'
                    : 'bg-[#F4EFE6] hover:bg-[#EAE2D3] text-slate-700 border-[#D8CFC0]'
                }`}
              >
                Special Indulgences
              </button>
            </div>
          </div>

          <p className="text-sm sm:text-base font-serif text-slate-700 leading-snug">
            Major November liturgical celebrations, Papal Masses in Rome, Archdiocesan feasts and cemetery vigils in Cebu, and the granting of special Plenary and Partial Indulgences by the Apostolic Penitentiary.
          </p>
        </div>

        {/* Summary Banner: Apostolic Penitentiary Norms for November Indulgences */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-[#F4EFE6] border border-[#D8CFC0] shadow-2xs space-y-1.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-slate-700">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-slate-600" />
              <h4 className="font-cinzel text-sm sm:text-base font-bold uppercase tracking-wider text-slate-900">
                Granting of Special November Indulgences • Apostolic Penitentiary Norms
              </h4>
            </div>
            <span className="text-xs font-cinzel font-bold px-2.5 py-0.5 rounded-md bg-[#EAE2D3] text-slate-800 border border-[#C8BBA6]">
              Enchiridion Indulgentiarum, Norm 29
            </span>
          </div>
          <p className="text-sm sm:text-base font-serif text-slate-700 leading-snug">
            To gain any <strong>Plenary Indulgence</strong> in November (such as the <strong>Nov 1–8 Cemetery Visit</strong> for the Holy Souls, the <strong>Nov 2 All Souls’ Day Church Visit</strong>, the <strong>Cathedral/Basilica Pilgrimage</strong>, or the <strong>Christ the King Public Consecration</strong>), the faithful must be in the state of grace with complete detachment from all sin, and fulfill the three usual conditions: <strong>(1) Sacramental Confession</strong> (within about 20 days), <strong>(2) Eucharistic Communion</strong>, and <strong>(3) Prayer for the Holy Father’s Intentions</strong> (one <em>Our Father</em> and one <em>Hail Mary</em>).
          </p>
        </div>

        {/* Events List */}
        <div className="space-y-3">
          {NOVEMBER_SPECIAL_EVENTS.filter(ev => {
            if (eventsFilter === 'all') return true;
            if (eventsFilter === 'vatican') return ev.authority === 'vatican' || ev.authority === 'both';
            if (eventsFilter === 'cebu') return ev.authority === 'cebu' || ev.authority === 'both';
            if (eventsFilter === 'indulgences') return Boolean(ev.indulgenceGrant);
            return true;
          }).map(ev => (
            <div
              key={ev.id}
              className="rounded-xl bg-[#FBF9F5] border border-[#D8CFC0] shadow-xs overflow-hidden transition-all hover:border-slate-500"
            >
              {/* Event Top Bar */}
              <div className="px-4 py-2.5 bg-[#F4EFE6] border-b border-[#D8CFC0] flex flex-col md:flex-row md:items-center justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-800 text-[#F9F6F0] font-cinzel text-xs sm:text-sm font-bold">
                      {ev.dateRange}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-[#EAE2D3] text-slate-800 border border-[#C8BBA6] font-cinzel text-xs sm:text-sm font-bold">
                      {ev.authorityLabel}
                    </span>
                    <span className="text-xs sm:text-sm font-serif italic text-slate-600 font-semibold">
                      • {ev.liturgicalRank}
                    </span>
                  </div>
                  <h4 className="font-cinzel text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                    {ev.title}
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const [yStr, mStr] = ev.targetDateStr.split('-');
                    const y = parseInt(yStr, 10);
                    const m = parseInt(mStr, 10) - 1;
                    setCurrentYear(y);
                    setCurrentMonth(m);
                    onSelectDate(ev.targetDateStr);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-[#FBF9F5] hover:bg-[#EAE2D3] text-slate-800 border border-[#C8BBA6] font-cinzel text-xs sm:text-sm font-bold transition-all cursor-pointer self-start md:self-center shrink-0 shadow-2xs"
                  title={`Open Mass Readings for ${ev.targetDateStr}`}
                >
                  Open Date &amp; Readings →
                </button>
              </div>

              {/* Event Body: Vatican & Archdiocese of Cebu Columns + Special Indulgence Box */}
              <div className="divide-y divide-[#D8CFC0]">
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#D8CFC0]">
                  {/* Vatican Cue */}
                  <div className="p-3.5 sm:p-4 bg-[#FBF9F5] space-y-1">
                    <div className="flex items-center gap-1.5 font-cinzel text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700">
                      <Globe className="w-4 h-4 text-slate-600 shrink-0" />
                      <span>From the Vatican (Holy See)</span>
                    </div>
                    <p className="text-sm sm:text-base font-serif text-slate-700 leading-snug">
                      {ev.vaticanObservance}
                    </p>
                  </div>

                  {/* Archdiocese of Cebu Cue */}
                  <div className="p-3.5 sm:p-4 bg-[#FBF9F5] space-y-1">
                    <div className="flex items-center gap-1.5 font-cinzel text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700">
                      <MapPin className="w-4 h-4 text-slate-600 shrink-0" />
                      <span>Archdiocese of Cebu</span>
                    </div>
                    <p className="text-sm sm:text-base font-serif text-slate-700 leading-snug">
                      {ev.cebuObservance}
                    </p>
                  </div>
                </div>

                {/* Special Indulgence Grant Box */}
                {ev.indulgenceGrant && (
                  <div className="p-3.5 sm:p-4 bg-[#EFE9DC] space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 font-cinzel text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-800">
                        <Award className="w-4 h-4 text-slate-700 shrink-0" />
                        <span>Special Indulgence Granted: {ev.indulgenceGrant.summary}</span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-md bg-[#FBF9F5] text-slate-800 border border-[#C8BBA6] font-cinzel text-xs font-bold uppercase">
                        {ev.indulgenceGrant.type}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base font-serif text-slate-800 leading-snug">
                      {ev.indulgenceGrant.prescribedWork}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Parish Schedules Card */}
      {onOpenCebuParishes && (
        <div className="bg-slate-800 rounded-xl p-5 sm:p-6 border border-slate-700 text-[#F9F6F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
          <div className="flex items-center gap-3.5">
            <span className="p-3 rounded-xl bg-slate-700/80 text-[#EAE2D3] border border-slate-600 shrink-0 shadow-xs">
              <Church className="w-5 h-5 sm:w-6 sm:h-6" />
            </span>
            <div>
              <h4 className="font-cinzel text-base sm:text-lg font-bold text-[#FBF9F5] leading-snug">
                Archdiocese of Cebu • Holy Mass and Confession Schedules
              </h4>
              <p className="text-xs sm:text-sm font-serif text-[#DFD5C3] font-normal mt-0.5 leading-snug">
                Basilica Minore del Santo Niño, Cebu Metropolitan Cathedral, Redemptorist Church, Carmelite Monastery, Shrine of San Roque and Guadalupe
              </p>
            </div>
          </div>
          <button
            onClick={onOpenCebuParishes}
            className="px-4 py-2.5 rounded-lg bg-[#F4EFE6] hover:bg-[#EAE2D3] text-slate-900 border border-[#DFD5C3] text-xs sm:text-sm font-cinzel font-bold cursor-pointer whitespace-nowrap self-start sm:self-auto transition-all shadow-xs leading-none"
          >
            Holy Mass &amp; Confession Schedules
          </button>
        </div>
      )}

    </div>
  );
};
