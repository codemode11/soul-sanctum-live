import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Sparkles, 
  Shield, 
  Palette, 
  Layers, 
  Info,
  BookOpen,
  SunMedium
} from 'lucide-react';
import { 
  SACRED_EMBLEMS, 
  SacredEmblem, 
  EmblemCategory, 
  IconFrameStyle, 
  IconColorTheme, 
  IconStyleConfig,
  ICON_FRAME_STYLES,
  ICON_COLOR_THEMES
} from '../data/emblems';
import { GoldenMonstranceIcon, MaryAndBlessedSacramentIcon } from './SanctumIcons';

interface EmblemSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedEmblem: SacredEmblem;
  onSelectEmblem: (emblem: SacredEmblem) => void;
  iconStyleConfig: IconStyleConfig;
  onUpdateIconStyle: (config: IconStyleConfig) => void;
}

export const EmblemSelectorModal: React.FC<EmblemSelectorModalProps> = ({
  isOpen,
  onClose,
  selectedEmblem,
  onSelectEmblem,
  iconStyleConfig,
  onUpdateIconStyle
}) => {
  const [activeCategory, setActiveCategory] = useState<EmblemCategory>('all');
  const [activeTab, setActiveTab] = useState<'icons' | 'style'>('icons');

  if (!isOpen) return null;

  const categories: { id: EmblemCategory; label: string; count: number }[] = [
    { id: 'all', label: 'All Emblems', count: SACRED_EMBLEMS.length },
    { id: 'cross', label: 'Cross and Calvary', count: SACRED_EMBLEMS.filter(e => e.category === 'cross').length },
    { id: 'christ', label: 'Christ the Lord', count: SACRED_EMBLEMS.filter(e => e.category === 'christ').length },
    { id: 'eucharist', label: 'Eucharistic', count: SACRED_EMBLEMS.filter(e => e.category === 'eucharist').length },
    { id: 'marian', label: 'Our Lady', count: SACRED_EMBLEMS.filter(e => e.category === 'marian').length },
    { id: 'saints', label: 'Saints and Heritage', count: SACRED_EMBLEMS.filter(e => e.category === 'saints').length }
  ];

  const filteredEmblems = activeCategory === 'all' 
    ? SACRED_EMBLEMS 
    : SACRED_EMBLEMS.filter(e => e.category === activeCategory);

  const activeColorTheme = ICON_COLOR_THEMES.find(t => t.id === iconStyleConfig.colorTheme) || ICON_COLOR_THEMES[0];
  const activeFrame = ICON_FRAME_STYLES.find(f => f.id === iconStyleConfig.frameStyle) || ICON_FRAME_STYLES[0];

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#FAF7F2] rounded-xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-amber-900/20 space-y-6 my-6 max-h-[92vh] flex flex-col animate-in fade-in zoom-in duration-200">
        
        {/* Header with Title and Close Button */}
        <div className="flex items-start justify-between pb-4 border-b border-amber-900/10 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-amber-900">
                Insignia Sacra • Sacred Emblem and Icon Treasury
              </span>
            </div>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900">
              Customize Main Icon and Emblem
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 font-serif-sacred">
              Select from 20 revered Catholic emblems and customize the framing and color atmosphere for Soul Sanctum.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-stone-200/70 hover:bg-stone-300 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer shrink-0 ml-2"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Preview Masthead Banner */}
        <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-amber-100 shadow-md border border-amber-600/30 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-4">
            {/* Live Rendered Emblem */}
            <div 
              className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center text-3xl sm:text-4xl select-none transition-all duration-300 bg-[#120A05] ${activeColorTheme.bgGradient} ${activeFrame.previewClass} overflow-hidden border border-[#8B5A2B]/60`}
              style={{ color: '#FEF3C7' }}
            >
              {selectedEmblem.id === 'eucharist-monstrance' ? (
                <GoldenMonstranceIcon className="w-9 h-9 sm:w-10 sm:h-10 drop-shadow-md text-amber-200" />
              ) : selectedEmblem.id === 'mary-blessed-sacrament' ? (
                <MaryAndBlessedSacramentIcon className="w-9 h-9 sm:w-10 sm:h-10 drop-shadow-md text-amber-200" />
              ) : (
                <span className="drop-shadow-md">{selectedEmblem.symbol}</span>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-cinzel tracking-widest px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Current Selection
                </span>
                <span className="text-xs text-stone-300 italic font-serif-sacred">
                  {selectedEmblem.latinName}
                </span>
              </div>
              <h4 className="font-cinzel text-lg sm:text-xl font-bold text-white tracking-wider mt-0.5">
                {selectedEmblem.name}
              </h4>
              <p className="text-xs text-stone-300 font-serif-sacred line-clamp-1 max-w-md">
                {selectedEmblem.theologicalMeaning}
              </p>
            </div>
          </div>

          {/* Quick tab switcher between Emblem Choices and Frame Styling */}
          <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/10 shrink-0">
            <button
              onClick={() => setActiveTab('icons')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === 'icons'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <SunMedium className="w-3.5 h-3.5" />
              <span>Sacred Emblems</span>
            </button>
            <button
              onClick={() => setActiveTab('style')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === 'style'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Frame and Color</span>
            </button>
          </div>
        </div>

        {/* Tab 1: 20 Sacred Icons Grid */}
        {activeTab === 'icons' && (
          <div className="flex-1 overflow-hidden flex flex-col space-y-3">
            {/* Category filter pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar shrink-0">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                    activeCategory === cat.id
                      ? 'bg-amber-900 text-amber-50 font-semibold shadow-xs'
                      : 'bg-stone-200/80 hover:bg-stone-300 text-stone-700'
                  }`}
                >
                  {cat.label} ({cat.count})
                </button>
              ))}
            </div>

            {/* Scrollable grid of emblems */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto pr-1 flex-1">
              {filteredEmblems.map(emblem => {
                const isSelected = emblem.id === selectedEmblem.id;

                return (
                  <div
                    key={emblem.id}
                    onClick={() => onSelectEmblem(emblem)}
                    className={`p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 relative text-left ${
                      isSelected
                        ? 'border-amber-700 ring-2 ring-amber-600/40 bg-amber-50/80 shadow-md'
                        : 'border-stone-200/80 hover:border-amber-400 hover:bg-white bg-[#FAF7F2]/60'
                    }`}
                  >
                    {/* Badge Icon Preview */}
                    <div 
                      className={`w-12 h-12 flex items-center justify-center text-2xl select-none shrink-0 transition-transform bg-[#120A05] ${activeColorTheme.bgGradient} ${activeFrame.previewClass} overflow-hidden border border-[#8B5A2B]/40 ${
                        isSelected ? 'scale-105' : ''
                      }`}
                      style={{ color: '#FEF3C7' }}
                    >
                      {emblem.id === 'eucharist-monstrance' ? (
                        <GoldenMonstranceIcon className="w-7 h-7 drop-shadow-sm text-amber-200" />
                      ) : emblem.id === 'mary-blessed-sacrament' ? (
                        <MaryAndBlessedSacramentIcon className="w-7 h-7 drop-shadow-sm text-amber-200" />
                      ) : (
                        <span className="drop-shadow-sm">{emblem.symbol}</span>
                      )}
                    </div>

                    {/* Details */}
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="font-cinzel text-sm font-bold text-stone-900 truncate">
                          {emblem.name}
                        </h4>
                        {isSelected && (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded-full shrink-0">
                            <Check className="w-3 h-3 stroke-[3]" /> Active
                          </span>
                        )}
                      </div>

                      <p className="text-[11px] text-amber-900/80 font-serif-sacred italic">
                        {emblem.latinName}
                      </p>

                      <p className="text-xs text-stone-600 font-serif-sacred line-clamp-2 leading-relaxed">
                        {emblem.description}
                      </p>

                      {emblem.scriptureCitation && (
                        <p className="text-[10px] text-stone-500 font-serif-sacred italic line-clamp-1 border-t border-stone-200/60 pt-1 mt-1">
                          {emblem.scriptureCitation}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Frame and Color Styling Customizer */}
        {activeTab === 'style' && (
          <div className="flex-1 overflow-y-auto space-y-6 pr-1">
            {/* Frame Styles */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-800" />
                <h4 className="font-cinzel text-sm font-bold uppercase tracking-wider text-stone-900">
                  Icon Frame Geometry
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {ICON_FRAME_STYLES.map(frame => {
                  const isSelected = iconStyleConfig.frameStyle === frame.id;
                  return (
                    <div
                      key={frame.id}
                      onClick={() => onUpdateIconStyle({ ...iconStyleConfig, frameStyle: frame.id })}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col items-center text-center gap-2 ${
                        isSelected
                          ? 'border-amber-700 ring-2 ring-amber-600/40 bg-amber-50/90 shadow-md'
                          : 'border-stone-200 hover:border-amber-400 bg-white'
                      }`}
                    >
                      <div 
                        className={`w-12 h-12 flex items-center justify-center text-2xl text-amber-100 bg-[#120A05] ${activeColorTheme.bgGradient} ${frame.previewClass} overflow-hidden`}
                      >
                        {selectedEmblem.symbol}
                      </div>
                      <div>
                        <h5 className="font-cinzel text-xs font-bold text-stone-900">{frame.name}</h5>
                        <p className="text-[11px] text-stone-500 font-serif-sacred mt-0.5 leading-snug">
                          {frame.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Color Atmosphere Themes */}
            <div className="space-y-3 pt-2 border-t border-stone-200">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-amber-800" />
                <h4 className="font-cinzel text-sm font-bold uppercase tracking-wider text-stone-900">
                  Emblem Color Atmosphere
                </h4>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {ICON_COLOR_THEMES.map(theme => {
                  const isSelected = iconStyleConfig.colorTheme === theme.id;
                  return (
                    <div
                      key={theme.id}
                      onClick={() => onUpdateIconStyle({ ...iconStyleConfig, colorTheme: theme.id })}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                        isSelected
                          ? 'border-amber-700 ring-2 ring-amber-600/40 bg-amber-50/90 shadow-sm'
                          : 'border-stone-200 hover:border-amber-400 bg-white'
                      }`}
                    >
                      <span 
                        className="w-7 h-7 rounded-full shadow-inner border border-white/60 shrink-0" 
                        style={{ backgroundColor: theme.hex }}
                      />
                      <div className="min-w-0">
                        <h5 className="font-cinzel text-xs font-bold text-stone-900 truncate">
                          {theme.name}
                        </h5>
                        <p className="text-[10px] text-stone-500 font-serif-sacred truncate">
                          {theme.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Footer info and close */}
        <div className="pt-3 border-t border-amber-900/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <p className="text-xs text-stone-500 font-serif-sacred flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span>Changes persist automatically across visits to Soul Sanctum.</span>
          </p>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 rounded-xl bg-amber-900 hover:bg-amber-950 text-amber-100 font-cinzel text-xs font-bold tracking-wider transition-colors cursor-pointer shadow-sm"
          >
            Apply and Close
          </button>
        </div>

      </div>
    </div>
  );
};
