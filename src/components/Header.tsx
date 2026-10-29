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
  activeEstablishingImageId = 'unsplash-eucharistic-adoration',
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

  const hasMemorialSplit = liturgicalTitle.includes(' / ');
  const mainTitlePart = hasMemorialSplit ? liturgicalTitle.split(' / ')[0] : liturgicalTitle;
  const memorialPart = hasMemorialSplit ? liturgicalTitle.split(' / ')[1] : null;

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
    <header className="relative z-30 text-white bg-transparent">
      {/* Luminous Eucharistic aura connecting Masthead to Altar without black tint */}
      <div className="absolute inset-0 select-none pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_35%_35%,rgba(251,191,36,0.22)_0%,rgba(217,119,6,0.06)_45%,transparent_75%)]" />
      </div>

      {/* Website Masthead */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-7 pb-5 sm:pt-9 sm:pb-6 md:pt-10 md:pb-7">
        {layoutVariant === 'solemn-centered' ? (
          /* =====================================================================
             SOLEMNITY CENTERED MASTHEAD LAYOUT (FOR SPECIAL FEAST DAYS)
             ===================================================================== */
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Top Utility Row: Calendar Picker on Right */}
            <div className="w-full flex flex-wrap items-center justify-end gap-3">
              <div className="relative">
                <div
                  onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                  className="flex items-center gap-1.5 text-stone-100 hover:text-amber-200 cursor-pointer transition-colors group select-none py-1 px-2.5 rounded-lg bg-black/45 backdrop-blur-md border border-white/10"
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

              <div className="relative">
                <div
                  className="absolute -inset-x-12 -inset-y-4 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.55)_0%,rgba(245,158,11,0.30)_40%,rgba(217,119,6,0.12)_65%,transparent_80%)] blur-lg pointer-events-none -z-10"
                  aria-hidden="true"
                />
                <h1
                  className="relative font-cinzel select-none font-black text-3xl sm:text-4xl md:text-5xl tracking-[0.26em] text-center"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    color: '#FFFDF7',
                    WebkitTextStroke: '1.2px #3E2415',
                    textShadow: '0 0 14px rgba(253, 224, 71, 0.95), 0 0 28px rgba(251, 191, 36, 0.85), 0 0 50px rgba(217, 119, 6, 0.65), 0 2px 8px rgba(0, 0, 0, 0.85)',
                    filter: 'drop-shadow(0 0 16px rgba(251, 191, 36, 0.75))',
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

              <div className="inline-flex flex-col items-center px-4 py-2 rounded-xl bg-black/55 backdrop-blur-md border border-amber-400/30 space-y-0.5">
                <span className="font-semibold text-white tracking-wide text-xs sm:text-sm drop-shadow-sm font-serif">
                  {mainTitlePart}
                </span>
                {memorialPart && (
                  <span className="text-sm sm:text-base md:text-lg text-amber-200 font-bold italic font-serif drop-shadow-md">
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
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-black/55 backdrop-blur-md border border-white/15 rounded-2xl px-4 py-3.5 sm:px-6 sm:py-4 shadow-2xl">
            <div className="flex items-center gap-3.5 sm:gap-4">
              <div
                className={`relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-[#120A05] ${activeColorTheme.bgGradient} ${activeFrame.previewClass} overflow-hidden text-amber-100 shrink-0 border border-[#8B5A2B]/70 shadow-lg select-none`}
                title={activeEmblem.name}
              >
                {renderEmblemIcon()}
              </div>
              <div>
                <h1
                  className="font-cinzel font-black text-xl sm:text-2xl md:text-3xl tracking-[0.22em]"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    color: '#FFFDF7',
                    textShadow: '0 0 12px rgba(253, 224, 71, 0.9), 0 0 24px rgba(251, 191, 36, 0.75)',
                  }}
                >
                  SOUL SANCTUM
                </h1>
                <p className="text-xs sm:text-sm font-serif text-amber-100/95">
                  {mottoText} <span className="text-[#D4AF37] font-semibold">• {mottoCitation}</span>
                </p>
                <p className="text-xs sm:text-sm font-serif text-amber-200 font-semibold italic mt-0.5">
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
             CLASSIC SANCTUM SPLIT LAYOUT (DEFAULT)
             ===================================================================== */
          <div className="flex flex-row items-start justify-between gap-4 sm:gap-6">
            
            {/* Brand Lockup: Emblem and Left-Aligned Stacked Soul Sanctum Title */}
            <div className="flex items-start gap-4 sm:gap-5">
              <div 
                className={`relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-[#120A05] ${activeColorTheme.bgGradient} ${activeFrame.previewClass} overflow-hidden text-amber-100 shrink-0 border border-[#8B5A2B]/70 shadow-[0_4px_20px_rgba(0,0,0,0.9)] mt-1 select-none`}
                title={activeEmblem.name}
              >
                {renderEmblemIcon()}
              </div>

              <div className="space-y-1 text-left">
                <div className="relative flex items-center gap-2.5 sm:gap-3">
                  <div 
                    className="absolute -inset-x-8 -inset-y-4 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.55)_0%,rgba(245,158,11,0.30)_40%,rgba(217,119,6,0.12)_65%,transparent_80%)] blur-lg pointer-events-none -z-10" 
                    aria-hidden="true"
                  />

                  <h1 
                    className="relative font-cinzel select-none transition-all duration-300 flex flex-col items-start text-left leading-[0.92]"
                    style={{ fontFamily: "'Cinzel', serif" }}
                    title="Soul Sanctum — Catholic Sanctuary"
                  >
                    <span
                      className="font-black text-2xl sm:text-3xl md:text-4xl tracking-[0.24em] sm:tracking-[0.26em] block text-left"
                      style={{
                        fontFamily: "'Cinzel', serif",
                        color: '#FFFDF7',
                        WebkitTextStroke: '1.2px #3E2415',
                        textShadow: '0 0 14px rgba(253, 224, 71, 0.95), 0 0 28px rgba(251, 191, 36, 0.85), 0 0 50px rgba(217, 119, 6, 0.65), 0 2px 8px rgba(0, 0, 0, 0.85)',
                        filter: 'drop-shadow(0 0 16px rgba(251, 191, 36, 0.75))',
                      }}
                    >
                      SOUL
                    </span>
                    <span
                      className="font-black text-2xl sm:text-3xl md:text-4xl tracking-[0.24em] sm:tracking-[0.26em] block text-left mt-0.5"
                      style={{
                        fontFamily: "'Cinzel', serif",
                        color: '#FFFDF7',
                        WebkitTextStroke: '1.2px #3E2415',
                        textShadow: '0 0 14px rgba(253, 224, 71, 0.95), 0 0 28px rgba(251, 191, 36, 0.85), 0 0 50px rgba(217, 119, 6, 0.65), 0 2px 8px rgba(0, 0, 0, 0.85)',
                        filter: 'drop-shadow(0 0 16px rgba(251, 191, 36, 0.75))',
                      }}
                    >
                      SANCTUM
                    </span>
                  </h1>
                </div>

                <div className="flex flex-col pt-0 -mt-0.5">
                  <span className="text-base sm:text-lg md:text-xl font-serif not-italic text-white font-semibold tracking-wide drop-shadow-md">
                    {mottoText}
                  </span>
                  <span className="text-sm sm:text-base md:text-[17px] font-serif not-italic font-semibold text-[#D4AF37] tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)] mt-0.5">
                    {mottoCitation}
                  </span>
                </div>

                <div className="flex flex-col gap-1 mt-3 sm:mt-4 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white tracking-wide text-xs sm:text-sm drop-shadow-sm font-serif">
                      {mainTitlePart}
                    </span>
                  </div>

                  {memorialPart && (
                    <div className="flex flex-wrap items-center gap-2 pt-0.5">
                      <span className="text-base sm:text-lg md:text-xl text-amber-200 font-bold italic font-serif drop-shadow-md">
                        {memorialPart}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Top-Right Controls */}
            <div className="flex flex-col items-end gap-2.5 text-xs self-end sm:self-start shrink-0">
              
              <div className="flex flex-wrap items-center justify-end gap-2">
                <div className="relative">
                  <div 
                    onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                    className="flex items-center gap-1.5 text-stone-100 hover:text-amber-200 cursor-pointer transition-colors group select-none py-1 px-0.5"
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

              {voiceToast && (
                <div className="px-3 py-1 rounded-lg bg-amber-950/90 border border-amber-400/60 text-amber-100 text-[11px] font-serif shadow-lg animate-fadeIn">
                  Active Lector Voice: <span className="font-bold text-amber-300">{voiceToast}</span>
                </div>
              )}

              {onOpenAdoration && (
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
