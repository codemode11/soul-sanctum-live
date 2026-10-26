import React, { useState } from 'react';
import { Sparkles, ChevronDown, Calendar as CalendarIcon, Compass, Volume2 } from 'lucide-react';
import { bellSynth } from '../utils/audioSynth';
import { SacredReader } from '../utils/speech';
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

interface HeaderProps {
  currentDateStr: string;
  liturgicalColor: LiturgicalColor;
  liturgicalTitle: string;
  onOpenAngelus?: () => void;
  onSelectDate: (dateStr: string) => void;
  activeEmblem: SacredEmblem;
  onOpenEmblemSelector: () => void;
  iconStyleConfig?: IconStyleConfig;
  onOpenArtViewer?: (artId: string) => void;
  onOpenAdoration?: () => void;
  onToggleMobileMenu?: () => void;
  onOpenCebuParishes?: () => void;
  activeEstablishingImageId?: string;
  onSelectEstablishingImage?: (img: NiepokalanowHighResImage) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentDateStr,
  liturgicalColor,
  liturgicalTitle,
  onOpenAngelus,
  onSelectDate,
  activeEmblem,
  onOpenEmblemSelector,
  iconStyleConfig = DEFAULT_STYLE_CONFIG,
  onOpenArtViewer,
  onOpenAdoration,
  onToggleMobileMenu,
  onOpenCebuParishes,
  activeEstablishingImageId = 'unsplash-eucharistic-adoration',
  onSelectEstablishingImage
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [voiceToast, setVoiceToast] = useState<string | null>(null);
  const colorMeta = LITURGICAL_COLORS_INFO[liturgicalColor] || LITURGICAL_COLORS_INFO.white;

  const activeColorTheme = ICON_COLOR_THEMES.find(t => t.id === iconStyleConfig.colorTheme) || ICON_COLOR_THEMES[0];
  const activeFrame = ICON_FRAME_STYLES.find(f => f.id === iconStyleConfig.frameStyle) || ICON_FRAME_STYLES[0];

  const handlePlayBell = () => {
    bellSynth.playNoonChimes();
  };

  const formattedDate = new Date(currentDateStr + 'T12:00:00Z').toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const hasMemorialSplit = liturgicalTitle.includes(' / ');
  const mainTitlePart = hasMemorialSplit ? liturgicalTitle.split(' / ')[0] : liturgicalTitle;
  const memorialPart = hasMemorialSplit ? liturgicalTitle.split(' / ')[1] : null;

  return (
    <header className="relative z-30 text-white bg-transparent">
      {/* Luminous Eucharistic aura connecting Masthead to Altar without black tint */}
      <div className="absolute inset-0 select-none pointer-events-none">
        {/* Soft golden Eucharistic halo centered behind Soul Sanctum and the Blessed Sacrament */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_35%_35%,rgba(251,191,36,0.22)_0%,rgba(217,119,6,0.06)_45%,transparent_75%)]" />
      </div>

      {/* Main Masthead Container: Ample vertical negative space so Mary's head and halo are fully seen */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-7 pb-5 sm:pt-9 sm:pb-6 md:pt-10 md:pb-7">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6">
          
          {/* Brand Lockup: Emblem and Left-Aligned Stacked Soul Sanctum Title */}
          <div className="flex items-start gap-4 sm:gap-5">
            <button 
              onClick={() => {
                handlePlayBell();
                onOpenEmblemSelector();
              }}
              className={`group relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-[#120A05] ${activeColorTheme.bgGradient} ${activeFrame.previewClass} overflow-hidden text-amber-100 transition-all duration-300 hover:scale-105 cursor-pointer shrink-0 border border-[#8B5A2B]/70 shadow-[0_4px_20px_rgba(0,0,0,0.9)] mt-1`}
              title={`${activeEmblem.name} — Click to customize emblem or toll sanctuary bell`}
            >
              {activeEmblem.id === 'eucharist-monstrance' ? (
                <GoldenMonstranceIcon className="w-8 h-8 sm:w-9 sm:h-9 group-hover:scale-110 transition-transform drop-shadow-[0_2px_14px_rgba(251,191,36,0.85)] text-amber-200" />
              ) : activeEmblem.id === 'mary-blessed-sacrament' ? (
                <MaryAndBlessedSacramentIcon className="w-8 h-8 sm:w-9 sm:h-9 group-hover:scale-110 transition-transform drop-shadow-[0_2px_10px_rgba(251,191,36,0.6)] text-amber-200" />
              ) : (
                <span className="text-2xl sm:text-3xl group-hover:scale-115 transition-transform select-none drop-shadow-md">
                  {activeEmblem.symbol}
                </span>
              )}
            </button>

            <div className="space-y-1 text-left">
              <div className="relative flex items-center gap-2.5 sm:gap-3">
                {/* Radiant golden glow halo positioned directly behind "Soul" and "Sanctum" */}
                <div 
                  className="absolute -inset-x-8 -inset-y-4 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.55)_0%,rgba(245,158,11,0.30)_40%,rgba(217,119,6,0.12)_65%,transparent_80%)] blur-lg pointer-events-none -z-10" 
                  aria-hidden="true"
                />

                {/* "Sanctum" placed beneath "Soul," left-aligned in Cinzel font with dark brown outline, golden glow, and brilliant luminous non-drab color */}
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

              {/* Sanctum Tagline: Not italicized, font color white per user instruction, positioned close to "Sanctum" */}
              <div className="flex flex-col pt-0 -mt-0.5">
                <span className="text-base sm:text-lg md:text-xl font-serif not-italic text-white font-semibold tracking-wide drop-shadow-md">
                  Pray without ceasing.
                </span>
                <span className="text-sm sm:text-base md:text-[17px] font-serif not-italic font-semibold text-[#D4AF37] tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)] mt-0.5">
                  1 Thessalonians 5:17
                </span>
              </div>

              {/* Liturgical Day: Generous line spacing from tagline, no preceding gold dot, enlarged memorial font size */}
              <div className="flex flex-col gap-1 mt-3 sm:mt-4 text-left">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white tracking-wide text-xs sm:text-sm drop-shadow-sm font-serif">
                    {mainTitlePart}
                  </span>
                </div>

                {memorialPart && (
                  <div className="flex flex-wrap items-center gap-2 pt-0.5">
                    {/* Increased font size for Memorial of St. Margaret Mary Alacoque */}
                    <span className="text-base sm:text-lg md:text-xl text-amber-200 font-bold italic font-serif drop-shadow-md">
                      {memorialPart}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Top-Right Controls: Positioned on the right corner so Mary's image in the center is NOT covered by the date */}
          <div className="flex flex-col items-end gap-2.5 text-xs self-end sm:self-start shrink-0">
            
            <div className="flex flex-wrap items-center justify-end gap-2">
              {/* Sacred Liturgical Pop-up Calendar Selector (Plain text link without button box container) */}
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

                {/* Theme-Matched Pop-up Calendar */}
                <LiturgicalCalendarPicker
                  selectedDateStr={currentDateStr}
                  onSelectDate={onSelectDate}
                  isOpen={isCalendarOpen}
                  onClose={() => setIsCalendarOpen(false)}
                />
              </div>

              {/* Mobile Navigation Toggle */}
              {onToggleMobileMenu && (
                <button
                  onClick={onToggleMobileMenu}
                  className="lg:hidden flex items-center p-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/35 border border-amber-400/40 text-amber-200 transition-all cursor-pointer backdrop-blur-md"
                  title="Navigation"
                  aria-label="Navigation"
                >
                  <Compass className="w-4 h-4 text-amber-300" />
                </button>
              )}
            </div>

            {voiceToast && (
              <div className="px-3 py-1 rounded-lg bg-amber-950/90 border border-amber-400/60 text-amber-100 text-[11px] font-serif shadow-lg animate-fadeIn">
                Active Lector Voice: <span className="font-bold text-amber-300">{voiceToast}</span>
              </div>
            )}

            {/* Semi-transparent Rectangle describing the active sacred masterpiece / sanctuary backdrop + Credit */}
            {onOpenAdoration && (() => {
              const activeImg =
                NIEPOKALANOW_HIGH_RES_IMAGES.find((img) => img.id === activeEstablishingImageId) ||
                NIEPOKALANOW_HIGH_RES_IMAGES[0];
              const creditLabel = activeImg.creditShort || 'Jacob Bentzinger; Unsplash';
              return (
                <div className="flex flex-col items-end mt-16 sm:mt-20 md:mt-24 lg:mt-28 max-w-[195px] sm:max-w-[210px] md:max-w-[220px]">
                  <div
                    className="flex flex-col items-end text-right px-3.5 py-3 sm:px-4 sm:py-3.5 rounded-xl bg-black/65 text-amber-200 backdrop-blur-md shadow-2xl w-full border border-white/15"
                    title={activeImg.title}
                  >
                    <div className="text-amber-300 text-sm sm:text-base font-serif font-bold tracking-wide text-right leading-snug">
                      <span className="block whitespace-nowrap">Source and summit</span>
                      <span className="block whitespace-nowrap">of Christian life</span>
                    </div>
                    <span className="text-xs sm:text-sm font-serif text-stone-200/95 leading-relaxed mt-1.5 text-right line-clamp-3">
                      {activeImg.description}
                    </span>
                    <span
                      className="text-[11px] font-serif text-amber-300/90 mt-1.5 text-right leading-snug"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Sacred Work:{' '}
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
              );
            })()}

          </div>

        </div>
      </div>
    </header>
  );
};
