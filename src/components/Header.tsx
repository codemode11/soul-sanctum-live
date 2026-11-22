import React, { useState } from 'react';
import { ChevronDown, Calendar as CalendarIcon } from 'lucide-react';
import { LITURGICAL_COLORS_INFO } from '../data/liturgicalCalendar';
import { LiturgicalColor } from '../types';
import { 
  SacredEmblem, 
  IconStyleConfig, 
  DEFAULT_STYLE_CONFIG, 
  ICON_COLOR_THEMES, 
  ICON_FRAME_STYLES 
} from '../data/emblems';
import { LiturgicalCalendarPicker } from './LiturgicalCalendarPicker';
import { MaryAndBlessedSacramentIcon, GoldenMonstranceIcon } from './SanctumIcons';
import { NIEPOKALANOW_HIGH_RES_IMAGES, NiepokalanowHighResImage } from '../data/sacredArt';
import { ScheduledMastheadLayout } from '../data/mastheadSchedule';

interface HeaderProps {
  currentDateStr: string;
  liturgicalColor: LiturgicalColor;
  liturgicalTitle: string;
  onOpenAngelus?: () => void;
  onSelectDate: (dateStr: string) => void;
  activeEmblem: SacredEmblem;
  iconStyleConfig?: IconStyleConfig;
  onOpenArtViewer?: (artId: string) => void;
  onOpenAdoration?: () => void;
  onToggleMobileMenu?: () => void;
  onOpenCebuParishes?: () => void;
  activeEstablishingImageId?: string;
  onSelectEstablishingImage?: (img: NiepokalanowHighResImage) => void;
  scheduledMasthead?: ScheduledMastheadLayout;
}

export const Header: React.FC<HeaderProps> = ({
  currentDateStr,
  liturgicalColor,
  liturgicalTitle,
  onSelectDate,
  activeEmblem,
  iconStyleConfig = DEFAULT_STYLE_CONFIG,
  onOpenAdoration,
  onToggleMobileMenu,
  activeEstablishingImageId = 'faith-scholarship-science',
  scheduledMasthead,
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [voiceToast] = useState<string | null>(null);
  const _colorMeta = LITURGICAL_COLORS_INFO[liturgicalColor] || LITURGICAL_COLORS_INFO.white;

  const activeColorTheme = ICON_COLOR_THEMES.find(t => t.id === iconStyleConfig.colorTheme) || ICON_COLOR_THEMES[0];
  const activeFrame = ICON_FRAME_STYLES.find(f => f.id === iconStyleConfig.frameStyle) || ICON_FRAME_STYLES[0];

  const formattedDate = new Date(currentDateStr + 'T12:00:00Z').toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const formattedCompactDate = new Date(currentDateStr + 'T12:00:00Z').toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const cleanLiturgicalTitle = liturgicalTitle.replace(/\s*\(Blessed Virgin Mary on Saturday\)/gi, '').trim();
  const hasMemorialSplit = cleanLiturgicalTitle.includes(' / ');
  const isChristTheKingTitle = /^solemnity of our lord jesus christ,\s*king of the universe$/i.test(cleanLiturgicalTitle);
  const mainTitlePart = isChristTheKingTitle
    ? 'Solemnity of Our Lord Jesus Christ'
    : hasMemorialSplit
      ? cleanLiturgicalTitle.split(' / ')[0]
      : cleanLiturgicalTitle;
  const memorialPart = isChristTheKingTitle
    ? 'King of the Universe'
    : hasMemorialSplit
      ? cleanLiturgicalTitle.split(' / ')[1]
      : null;

  const activeImg =
    NIEPOKALANOW_HIGH_RES_IMAGES.find((img) => img.id === activeEstablishingImageId) ||
    NIEPOKALANOW_HIGH_RES_IMAGES[0];
  const creditLabel = activeImg.creditShort || 'Jacob Bentzinger; Unsplash.';

  const layoutVariant = scheduledMasthead?.layoutVariant || 'classic-split';
  const mottoText = scheduledMasthead?.mottoText || 'Pray without ceasing.';
  const mottoCitation = scheduledMasthead?.mottoCitation || '1 Thessalonians 5:17';
  const calloutLine1 = scheduledMasthead?.calloutLine1 || 'Source and summit';
  const calloutLine2 = scheduledMasthead?.calloutLine2 || 'of Christian life';

  const renderEmblemIcon = (sizeClass = 'w-8 h-8 sm:w-9 sm:h-9', textClass = 'text-2xl sm:text-3xl') => {
    if (activeEmblem.id === 'eucharist-monstrance') {
      return <GoldenMonstranceIcon className={`${sizeClass} drop-shadow-[0_2px_14px_rgba(251,191,36,0.85)] text-amber-200`} />;
    }
    if (activeEmblem.id === 'mary-blessed-sacrament') {
      return <MaryAndBlessedSacramentIcon className={`${sizeClass} drop-shadow-[0_2px_10px_rgba(251,191,36,0.6)] text-amber-200`} />;
    }
    return (
      <span className={`${textClass} select-none drop-shadow-md`}>
        {activeEmblem.symbol}
      </span>
    );
  };

  return (
    <header className={`relative z-30 text-white flex flex-col ${
      activeEstablishingImageId === 'christ-the-king-main-story'
        ? 'bg-[#23140B]/82 backdrop-blur-md lg:bg-transparent lg:backdrop-blur-none border-b border-amber-300/30 lg:border-b-0 flex-initial'
        : 'bg-transparent flex-1 sm:flex-initial'
    }`}>
      {/* Website Masthead */}
      <div className={`relative z-10 w-full mx-auto flex flex-col ${
        activeEstablishingImageId === 'christ-the-king-main-story'
          ? 'max-w-[1440px] py-2.5 sm:pt-5 sm:pb-3 lg:pt-7 lg:pb-5 xl:pt-8 px-3.5 sm:px-6 lg:px-10 xl:px-14 flex-initial'
          : 'max-w-7xl pt-6 pb-2.5 sm:pt-9 sm:pb-6 md:pt-10 md:pb-7 px-5 sm:px-10 md:px-12 lg:px-14 flex-1 sm:flex-initial'
      }`}>
        {layoutVariant === 'solemn-centered' ? (
          /* =====================================================================
             SOLEMNITY CENTERED MASTHEAD LAYOUT (FOR SPECIAL FEAST DAYS)
             ===================================================================== */
          <div className="flex-1 sm:flex-initial flex flex-col items-center text-center space-y-4">
            {/* Top Utility Row: Calendar Picker on Right */}
            <div className="w-full flex flex-wrap items-center justify-end gap-3">
              <div className="relative">
                <div
                  onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                  className="flex items-center gap-1.5 text-stone-100 hover:text-amber-200 cursor-pointer transition-colors group select-none py-1 px-2.5 rounded-lg bg-black/20 backdrop-blur-[2px] border border-white/15"
                  title="Open Catholic Liturgical Calendar (Feasts, Colors and Memorials)"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setIsCalendarOpen(!isCalendarOpen);
                    }
                  }}
                >
                  <CalendarIcon className="w-3.5 h-3.5 text-amber-400/90 group-hover:scale-110 transition-transform" />
                  <span className="font-serif font-medium text-sm sm:text-base text-amber-100/95 group-hover:text-amber-200 drop-shadow-sm">
                    {formattedDate}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-amber-400/80 transition-transform duration-200 ${isCalendarOpen ? 'rotate-180' : ''}`} />
                </div>

                <LiturgicalCalendarPicker
                  selectedDateStr={currentDateStr}
                  onSelectDate={onSelectDate}
                  isOpen={isCalendarOpen}
                  onClose={() => setIsCalendarOpen(false)}
                />
              </div>
            </div>

            {/* Centered Emblem + Regal Title Lockup */}
            <div className="flex flex-col items-center space-y-2.5 pt-1">
              <div
                className={`relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-[#120A05] ${activeColorTheme.bgGradient} ${activeFrame.previewClass} overflow-hidden text-amber-100 border border-[#8B5A2B]/80 shadow-[0_4px_24px_rgba(0,0,0,0.9)] select-none`}
                title={activeEmblem.name}
              >
                {renderEmblemIcon('w-9 h-9 sm:w-10 sm:h-10', 'text-3xl sm:text-4xl')}
              </div>

              <div className="relative inline-block isolate">
                <div
                  className="absolute -inset-x-5 -inset-y-2 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.45)_0%,rgba(245,158,11,0.22)_50%,transparent_78%)] blur-xl pointer-events-none z-0"
                  aria-hidden="true"
                />
                <h1
                  className="relative z-10 font-cinzel select-none font-extrabold text-2xl sm:text-4xl md:text-5xl tracking-[0.2em] sm:tracking-[0.26em] text-center"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontWeight: 800,
                    color: '#FFFDF7',
                    textShadow: '1px 2px 2px rgba(0, 0, 0, 0.95), 2px 4px 10px rgba(0, 0, 0, 0.85)',
                  }}
                >
                  SOUL SANCTUM
                </h1>
              </div>

              <div className="flex flex-col items-center max-w-2xl">
                <span className="text-base sm:text-lg md:text-xl font-serif text-white font-semibold tracking-wide drop-shadow-md">
                  {mottoText}
                </span>
                <span className="text-sm sm:text-base font-serif font-semibold text-[#D4AF37] tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)] mt-0.5">
                  {mottoCitation}
                </span>
              </div>

              <div className="inline-flex flex-col items-center px-4 py-2 rounded-xl bg-black/20 backdrop-blur-[2px] border border-amber-400/25 space-y-0.5">
                <span className="font-semibold text-white tracking-wide text-xs sm:text-sm drop-shadow-sm font-serif">
                  {mainTitlePart}
                </span>
                {memorialPart && (
                  <span className="text-xs sm:text-sm text-white font-semibold not-italic font-serif drop-shadow-sm">
                    {memorialPart}
                  </span>
                )}
              </div>
            </div>
          </div>
        ) : layoutVariant === 'horizon-banner' ? (
          /* =====================================================================
             PANORAMIC SANCTUARY HORIZON LAYOUT
             ===================================================================== */
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-black/25 backdrop-blur-[2px] border border-white/15 rounded-2xl px-4 py-3.5 sm:px-6 sm:py-4 shadow-2xl">
            <div className="flex items-center gap-3.5 sm:gap-4">
              <div
                className={`relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-[#120A05] ${activeColorTheme.bgGradient} ${activeFrame.previewClass} overflow-hidden text-amber-100 shrink-0 border border-[#8B5A2B]/70 shadow-lg select-none`}
                title={activeEmblem.name}
              >
                {renderEmblemIcon()}
              </div>
              <div>
                <h1
                  className="font-cinzel font-extrabold text-xl sm:text-2xl md:text-3xl tracking-[0.22em]"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontWeight: 800,
                    color: '#FFFDF7',
                    textShadow: '1px 2px 2px rgba(0, 0, 0, 0.95), 2px 4px 10px rgba(0, 0, 0, 0.85)',
                  }}
                >
                  SOUL SANCTUM
                </h1>
                <p className="text-xs sm:text-sm font-serif text-amber-100/95">
                  {mottoText} <span className="text-[#D4AF37] font-semibold">• {mottoCitation}</span>
                </p>
                <p className="text-xs sm:text-sm font-serif text-white font-semibold not-italic mt-0.5">
                  {liturgicalTitle}
                </p>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0">
              <div className="relative">
                <div
                  onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                  className="flex items-center gap-1.5 text-stone-100 hover:text-amber-200 cursor-pointer transition-colors group select-none"
                  role="button"
                  tabIndex={0}
                >
                  <CalendarIcon className="w-3.5 h-3.5 text-amber-400/90" />
                  <span className="font-serif font-medium text-sm sm:text-base text-amber-100/95">
                    {formattedDate}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-amber-400/80 transition-transform duration-200 ${isCalendarOpen ? 'rotate-180' : ''}`} />
                </div>
                <LiturgicalCalendarPicker
                  selectedDateStr={currentDateStr}
                  onSelectDate={onSelectDate}
                  isOpen={isCalendarOpen}
                  onClose={() => setIsCalendarOpen(false)}
                />
              </div>
              <span className="text-[11px] font-serif text-amber-300/90">
                Image credits: {creditLabel}
              </span>
            </div>
          </div>
        ) : (
          /* =====================================================================
             CLASSIC SANCTUM SPLIT LAYOUT (DEFAULT) — RESPONSIVE MOBILE & DESKTOP
             ===================================================================== */
          <div className={`flex-1 sm:flex-initial flex justify-between ${
            activeEstablishingImageId === 'christ-the-king-main-story'
              ? 'flex-row items-center sm:items-start gap-2 sm:gap-6'
              : 'flex-col sm:flex-row items-stretch sm:items-start gap-3 sm:gap-6'
          }`}>
            
            {/* Brand Lockup Row + Liturgical Day Title Aligned Under Text Column */}
            <div className="flex items-center sm:items-start justify-between gap-2 sm:gap-3 min-w-0">
              <div className={`flex ${
                activeEstablishingImageId === 'christ-the-king-main-story'
                  ? 'items-center gap-2.5 sm:gap-4'
                  : 'items-center sm:items-start gap-3 sm:gap-5'
              }`}>
                <div 
                  className={`relative flex items-center justify-center bg-[#120A05] ${activeColorTheme.bgGradient} ${activeFrame.previewClass} overflow-hidden text-amber-100 shrink-0 border border-[#8B5A2B]/70 shadow-[0_4px_20px_rgba(0,0,0,0.9)] select-none ${
                    activeEstablishingImageId === 'christ-the-king-main-story'
                      ? 'w-9 h-9 sm:w-12 sm:h-12 xl:w-[58px] xl:h-[58px] 2xl:w-[68px] 2xl:h-[68px]'
                      : 'w-11 h-11 sm:w-14 sm:h-14 mt-0.5 sm:mt-1'
                  }`}
                  title={activeEmblem.name}
                >
                  {renderEmblemIcon(
                    activeEstablishingImageId === 'christ-the-king-main-story'
                      ? 'w-5 h-5 sm:w-8 sm:h-8 xl:w-9 xl:h-9 2xl:w-10 2xl:h-10'
                      : 'w-7 h-7 sm:w-9 sm:h-9',
                    activeEstablishingImageId === 'christ-the-king-main-story'
                      ? 'text-base sm:text-2xl xl:text-3xl'
                      : 'text-xl sm:text-3xl'
                  )}
                </div>

                <div className={`${
                  activeEstablishingImageId === 'christ-the-king-main-story'
                    ? 'flex flex-col justify-center text-left'
                    : 'space-y-0.5 sm:space-y-1 text-left'
                }`}>
                  <div className="relative inline-flex items-center gap-2 sm:gap-3 isolate">
                    <div
                      className="absolute -inset-x-4 sm:-inset-x-5 -inset-y-1.5 sm:-inset-y-2 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.45)_0%,rgba(245,158,11,0.22)_50%,transparent_78%)] blur-xl pointer-events-none z-0"
                      aria-hidden="true"
                    />
                    <h1 
                      className="relative z-10 font-cinzel select-none transition-all duration-300 flex flex-col items-start justify-center text-left leading-[0.95]"
                      style={{ fontFamily: "'Cinzel', serif", fontWeight: 800 }}
                      title="Soul Sanctum — Catholic Sanctuary"
                    >
                      <span
                        className={`font-extrabold block text-left ${
                          activeEstablishingImageId === 'christ-the-king-main-story'
                            ? 'text-[17px] sm:text-2xl lg:text-2xl xl:text-3xl 2xl:text-4xl tracking-[0.16em] sm:tracking-[0.22em] xl:tracking-[0.24em]'
                            : 'text-xl sm:text-3xl md:text-4xl tracking-[0.2em] sm:tracking-[0.26em]'
                        }`}
                        style={{
                          fontFamily: "'Cinzel', serif",
                          fontWeight: 800,
                          color: '#FFFDF7',
                          textShadow: '1px 2px 2px rgba(0, 0, 0, 0.95), 2px 4px 10px rgba(0, 0, 0, 0.85)',
                        }}
                      >
                        SOUL
                      </span>
                      <span
                        className={`font-extrabold block text-left mt-0.5 ${
                          activeEstablishingImageId === 'christ-the-king-main-story'
                            ? 'text-[17px] sm:text-2xl lg:text-2xl xl:text-3xl 2xl:text-4xl tracking-[0.16em] sm:tracking-[0.22em] xl:tracking-[0.24em]'
                            : 'text-xl sm:text-3xl md:text-4xl tracking-[0.2em] sm:tracking-[0.26em]'
                        }`}
                        style={{
                          fontFamily: "'Cinzel', serif",
                          fontWeight: 800,
                          color: '#FFFDF7',
                          textShadow: '1px 2px 2px rgba(0, 0, 0, 0.95), 2px 4px 10px rgba(0, 0, 0, 0.85)',
                        }}
                      >
                        SANCTUM
                      </span>
                    </h1>
                  </div>

                  {activeEstablishingImageId !== 'christ-the-king-main-story' && (
                    <>
                      <div className="flex flex-col pt-0 -mt-0.5">
                        <span className="text-sm sm:text-lg md:text-xl font-serif not-italic text-white font-semibold tracking-wide drop-shadow-md">
                          {mottoText}
                        </span>
                        <span className="text-xs sm:text-base md:text-[17px] font-serif not-italic font-semibold text-[#D4AF37] tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)] mt-0.5">
                          {mottoCitation}
                        </span>
                      </div>

                      {/* Liturgical Day Title Aligned With Left Text Column */}
                      <div className="flex flex-col items-start gap-0.5 text-left pt-2">
                        <span className="font-serif font-bold text-xs sm:text-sm text-white leading-snug whitespace-normal sm:whitespace-nowrap [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.98))_drop-shadow(0_2px_8px_rgba(0,0,0,0.9))]">
                          {mainTitlePart}
                        </span>

                        {memorialPart && (
                          <span className="font-serif font-bold not-italic text-xs sm:text-sm text-white leading-snug whitespace-normal sm:whitespace-nowrap [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.98))_drop-shadow(0_2px_8px_rgba(0,0,0,0.9))]">
                            {memorialPart}
                          </span>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Date & Liturgical Feast Controls: White Text with Black Drop Shadows */}
            <div className={`relative z-20 flex flex-col gap-1 text-xs shrink-0 ${
              activeEstablishingImageId === 'christ-the-king-main-story'
                ? 'mt-0 items-end w-auto self-center sm:self-start'
                : 'mt-auto sm:mt-0 items-start sm:items-end w-full sm:w-auto self-stretch sm:self-start'
            }`}>
              
              <div className="w-full sm:w-auto flex flex-wrap items-center justify-end gap-2">
                <div className="relative w-auto">
                  <div 
                    onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                    className={`flex items-center justify-end gap-1.5 sm:gap-2 text-white hover:text-amber-200 cursor-pointer transition-colors group select-none ${
                      activeEstablishingImageId === 'christ-the-king-main-story'
                        ? 'py-1.5 px-2.5 lg:py-0.5 lg:px-0 rounded-lg lg:rounded-none bg-white/10 lg:bg-transparent border border-amber-400/30 lg:border-0'
                        : 'py-0.5'
                    }`}
                    title="Open Catholic Liturgical Calendar (Feasts, Colors and Memorials)"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        setIsCalendarOpen(!isCalendarOpen);
                      }
                    }}
                  >
                    <div className="flex items-center gap-1.5">
                      <CalendarIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 sm:text-white group-hover:text-amber-200 group-hover:scale-110 transition-transform shrink-0 [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.98))_drop-shadow(0_2px_8px_rgba(0,0,0,0.9))]" />
                      <span className="sm:hidden font-serif font-bold text-xs text-amber-50 whitespace-nowrap">
                        {formattedCompactDate}
                      </span>
                      <span className="hidden sm:inline font-serif font-bold text-sm sm:text-base text-white group-hover:text-amber-200 [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.98))_drop-shadow(0_2px_8px_rgba(0,0,0,0.9))]">
                        {formattedDate}
                      </span>
                    </div>
                    <ChevronDown className={`w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-200 sm:text-white group-hover:text-amber-200 transition-transform duration-200 [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.98))_drop-shadow(0_2px_8px_rgba(0,0,0,0.9))] ${isCalendarOpen ? 'rotate-180' : ''}`} />
                  </div>

                  <LiturgicalCalendarPicker
                    selectedDateStr={currentDateStr}
                    onSelectDate={onSelectDate}
                    isOpen={isCalendarOpen}
                    onClose={() => setIsCalendarOpen(false)}
                  />
                </div>
              </div>

              {voiceToast && (
                <div className="px-3 py-1 rounded-lg bg-amber-950/90 border border-amber-400/60 text-amber-100 text-[11px] font-serif shadow-lg animate-fadeIn">
                  Active Lector Voice: <span className="font-bold text-amber-300">{voiceToast}</span>
                </div>
              )}

              {onOpenAdoration && activeEstablishingImageId === 'our-lady-monstrance-connors' && (
                <div className="flex flex-col items-start sm:items-end mt-3 sm:mt-32 md:mt-40 lg:mt-44 w-full sm:max-w-[220px] md:max-w-[235px]">
                  <div
                    className="flex flex-col items-stretch justify-between text-left px-3.5 py-3.5 sm:px-4 sm:py-4 rounded-xl bg-black/50 text-stone-100 backdrop-blur-md shadow-2xl w-full border border-white/15"
                    title={activeImg.title}
                  >
                    <p className="text-[11px] sm:text-[11.5px] font-serif text-stone-100/95 leading-snug text-justify">
                      {activeImg.description}
                    </p>
                    <span
                      className="text-[10.5px] sm:text-[11px] font-serif text-amber-300/95 mt-2.5 text-left leading-snug"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Photo Credit:{' '}
                      <span className="text-amber-200 font-semibold">{creditLabel}</span>
                    </span>
                  </div>
                </div>
              )}

              {onOpenAdoration && activeEstablishingImageId !== 'faith-scholarship-science' && activeEstablishingImageId !== 'pope-leo-peru-homecoming' && activeEstablishingImageId !== 'our-lady-monstrance-connors' && activeEstablishingImageId !== 'christ-the-king-main-story' && (
                <div className="flex flex-col items-end mt-6 lg:mt-10 max-w-[195px] sm:max-w-[210px] md:max-w-[220px]">
                  <div
                    className="flex flex-col items-end text-right px-3.5 py-3 sm:px-4 sm:py-3.5 rounded-xl bg-black/65 text-amber-200 backdrop-blur-md shadow-2xl w-full border border-white/15"
                    title={activeImg.title}
                  >
                    <div className="text-amber-300 text-sm sm:text-base font-serif font-bold tracking-wide text-right leading-snug">
                      <span className="block whitespace-nowrap">{calloutLine1}</span>
                      <span className="block whitespace-nowrap">{calloutLine2}</span>
                    </div>
                    <span className="text-xs sm:text-sm font-serif text-stone-200/95 leading-relaxed mt-1.5 text-right line-clamp-3">
                      {activeImg.description}
                    </span>
                    <span
                      className="text-[11px] font-serif text-amber-300/90 mt-1.5 text-right leading-snug"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Image credits:{' '}
                      {activeImg.attributionUrl ? (
                        <a
                          href={activeImg.attributionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-amber-200 no-underline transition-colors"
                          title="View original sacred masterpiece"
                        >
                          {creditLabel}
                        </a>
                      ) : (
                        <span>{creditLabel}</span>
                      )}
                    </span>
                  </div>
                </div>
              )}

            </div>

          </div>
        )}
      </div>
    </header>
  );
};
