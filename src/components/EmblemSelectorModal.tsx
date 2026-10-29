import React, { useState } from 'react';
import { 
  X, 
  Check, 
  Sparkles, 
  Shield, 
  Palette, 
  Info,
  SunMedium,
  Calendar,
  Plus,
  Trash2,
  Eye
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
import { NIEPOKALANOW_HIGH_RES_IMAGES } from '../data/sacredArt';
import {
  ScheduledMastheadLayout,
  MastheadLayoutVariant,
  MASTHEAD_LAYOUT_VARIANTS
} from '../data/mastheadSchedule';

interface EmblemSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedEmblem: SacredEmblem;
  onSelectEmblem: (emblem: SacredEmblem) => void;
  iconStyleConfig: IconStyleConfig;
  onUpdateIconStyle: (config: IconStyleConfig) => void;
  scheduledMastheads?: ScheduledMastheadLayout[];
  onUpdateScheduledMastheads?: (schedules: ScheduledMastheadLayout[]) => void;
  onPreviewScheduledDate?: (dateStr: string) => void;
}

export const EmblemSelectorModal: React.FC<EmblemSelectorModalProps> = ({
  isOpen,
  onClose,
  selectedEmblem,
  onSelectEmblem,
  iconStyleConfig,
  onUpdateIconStyle,
  scheduledMastheads = [],
  onUpdateScheduledMastheads,
  onPreviewScheduledDate,
}) => {
  const [activeCategory, setActiveCategory] = useState<EmblemCategory>('all');
  const [activeTab, setActiveTab] = useState<'icons' | 'style' | 'schedule'>('schedule');

  // New schedule form state
  const [newDateStr, setNewDateStr] = useState('2026-11-09');
  const [newOccasionName, setNewOccasionName] = useState('Feast of the Dedication of the Lateran Basilica');
  const [newLayoutVariant, setNewLayoutVariant] = useState<MastheadLayoutVariant>('solemn-centered');
  const [newImageId, setNewImageId] = useState<string>('cathedral-sanctum-adoration');
  const [newEmblemId, setNewEmblemId] = useState<string>(selectedEmblem.id);
  const [newColorTheme, setNewColorTheme] = useState<IconColorTheme>(iconStyleConfig.colorTheme);
  const [newFrameStyle, setNewFrameStyle] = useState<IconFrameStyle>(iconStyleConfig.frameStyle);
  const [newMottoText, setNewMottoText] = useState('You are God’s building; God’s temple is holy.');
  const [newMottoCitation, setNewMottoCitation] = useState('1 Corinthians 3:9, 17');

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

  const handleAddOrReplaceSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onUpdateScheduledMastheads || !newDateStr || !newOccasionName.trim()) return;

    const entry: ScheduledMastheadLayout = {
      id: `sched-${newDateStr}-${Date.now()}`,
      dateStr: newDateStr,
      occasionName: newOccasionName.trim(),
      enabled: true,
      layoutVariant: newLayoutVariant,
      establishingImageId: newImageId,
      emblemId: newEmblemId,
      colorTheme: newColorTheme,
      frameStyle: newFrameStyle,
      mottoText: newMottoText.trim() || 'Pray without ceasing.',
      mottoCitation: newMottoCitation.trim() || '1 Thessalonians 5:17',
    };

    const withoutSameDate = scheduledMastheads.filter(s => s.dateStr !== newDateStr);
    const updated = [...withoutSameDate, entry].sort((a, b) => a.dateStr.localeCompare(b.dateStr));
    onUpdateScheduledMastheads(updated);
  };

  const handleToggleSchedule = (id: string) => {
    if (!onUpdateScheduledMastheads) return;
    const updated = scheduledMastheads.map(s => (s.id === id ? { ...s, enabled: !s.enabled } : s));
    onUpdateScheduledMastheads(updated);
  };

  const handleDeleteSchedule = (id: string) => {
    if (!onUpdateScheduledMastheads) return;
    const updated = scheduledMastheads.filter(s => s.id !== id);
    onUpdateScheduledMastheads(updated);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-[#FAF7F2] rounded-xl max-w-4xl w-full p-5 sm:p-7 shadow-2xl border border-amber-900/20 space-y-5 my-6 max-h-[92vh] flex flex-col animate-in fade-in zoom-in duration-200">
        
        {/* Header with Title and Close Button */}
        <div className="flex items-start justify-between pb-3.5 border-b border-amber-900/10 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-amber-900">
                Insignia Sacra • Masthead Customizer &amp; Special Day Scheduler
              </span>
            </div>
            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900">
              Customize &amp; Schedule Masthead Layouts
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 font-serif-sacred">
              Select your default emblem and framing, or schedule complete masthead layouts (layout style, sanctuary art, emblem, and scripture motto) to activate automatically on special feast days ahead.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-stone-200/70 hover:bg-stone-300 text-stone-600 hover:text-stone-900 transition-colors cursor-pointer shrink-0 ml-2"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Preview Masthead Banner + 3-Tab Switcher */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-amber-100 shadow-md border border-amber-600/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-4">
            {/* Live Rendered Emblem */}
            <div 
              className={`w-14 h-14 flex items-center justify-center text-3xl select-none transition-all duration-300 bg-[#120A05] ${activeColorTheme.bgGradient} ${activeFrame.previewClass} overflow-hidden border border-[#8B5A2B]/60 shrink-0`}
              style={{ color: '#FEF3C7' }}
            >
              {selectedEmblem.id === 'eucharist-monstrance' ? (
                <GoldenMonstranceIcon className="w-9 h-9 drop-shadow-md text-amber-200" />
              ) : selectedEmblem.id === 'mary-blessed-sacrament' ? (
                <MaryAndBlessedSacramentIcon className="w-9 h-9 drop-shadow-md text-amber-200" />
              ) : (
                <span className="drop-shadow-md">{selectedEmblem.symbol}</span>
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-cinzel tracking-widest px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Active Emblem
                </span>
                <span className="text-xs text-stone-300 italic font-serif-sacred">
                  {selectedEmblem.latinName}
                </span>
              </div>
              <h4 className="font-cinzel text-base sm:text-lg font-bold text-white tracking-wider mt-0.5">
                {selectedEmblem.name}
              </h4>
            </div>
          </div>

          {/* Quick tab switcher */}
          <div className="flex flex-wrap items-center bg-black/40 p-1 rounded-xl border border-white/10 shrink-0 gap-1">
            <button
              onClick={() => setActiveTab('schedule')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === 'schedule'
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Schedule Special Days ({scheduledMastheads.filter(s => s.enabled).length})</span>
            </button>
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

        {/* =====================================================================
            TAB 0: SCHEDULE MASTHEAD LAYOUTS FOR SPECIAL DAYS AHEAD
           ===================================================================== */}
        {activeTab === 'schedule' && (
          <div className="flex-1 overflow-y-auto space-y-5 pr-1">
            {/* Create / Schedule New Special Day Masthead Form */}
            <form
              onSubmit={handleAddOrReplaceSchedule}
              className="p-4 sm:p-5 rounded-xl bg-white border border-amber-900/20 shadow-xs space-y-3.5"
            >
              <div className="flex items-center justify-between gap-2 border-b border-stone-200 pb-2.5">
                <h4 className="font-cinzel text-sm sm:text-base font-bold text-stone-900 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-amber-800" />
                  <span>Schedule a Masthead Layout for an Upcoming Special Day</span>
                </h4>
                <span className="text-xs font-serif text-stone-500">
                  Automatically activates when the date arrives
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-cinzel text-xs font-bold text-stone-700 mb-1">
                    Target Date
                  </label>
                  <input
                    type="date"
                    value={newDateStr}
                    onChange={(e) => setNewDateStr(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-[#FAF7F2] text-sm font-serif text-stone-900"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block font-cinzel text-xs font-bold text-stone-700 mb-1">
                    Special Day / Feast Occasion Title
                  </label>
                  <input
                    type="text"
                    value={newOccasionName}
                    onChange={(e) => setNewOccasionName(e.target.value)}
                    placeholder="e.g., Solemnity of All Saints"
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-[#FAF7F2] text-sm font-serif text-stone-900"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-cinzel text-xs font-bold text-stone-700 mb-1">
                    Masthead Layout Variant
                  </label>
                  <select
                    value={newLayoutVariant}
                    onChange={(e) => setNewLayoutVariant(e.target.value as MastheadLayoutVariant)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-[#FAF7F2] text-sm font-serif text-stone-900"
                  >
                    {MASTHEAD_LAYOUT_VARIANTS.map(v => (
                      <option key={v.id} value={v.id}>{v.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-cinzel text-xs font-bold text-stone-700 mb-1">
                    Sanctuary Background Art
                  </label>
                  <select
                    value={newImageId}
                    onChange={(e) => setNewImageId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-[#FAF7F2] text-sm font-serif text-stone-900"
                  >
                    {NIEPOKALANOW_HIGH_RES_IMAGES.map(img => (
                      <option key={img.id} value={img.id}>{img.shortLabel}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-cinzel text-xs font-bold text-stone-700 mb-1">
                    Sacred Emblem for the Day
                  </label>
                  <select
                    value={newEmblemId}
                    onChange={(e) => setNewEmblemId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-[#FAF7F2] text-sm font-serif text-stone-900"
                  >
                    {SACRED_EMBLEMS.map(em => (
                      <option key={em.id} value={em.id}>{em.symbol} {em.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-cinzel text-xs font-bold text-stone-700 mb-1">
                    Masthead Scripture Motto
                  </label>
                  <input
                    type="text"
                    value={newMottoText}
                    onChange={(e) => setNewMottoText(e.target.value)}
                    placeholder="Pray without ceasing."
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-[#FAF7F2] text-sm font-serif text-stone-900"
                  />
                </div>
                <div>
                  <label className="block font-cinzel text-xs font-bold text-stone-700 mb-1">
                    Scripture Citation / Liturgical Source
                  </label>
                  <input
                    type="text"
                    value={newMottoCitation}
                    onChange={(e) => setNewMottoCitation(e.target.value)}
                    placeholder="1 Thessalonians 5:17"
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-[#FAF7F2] text-sm font-serif text-stone-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block font-cinzel text-xs font-bold text-stone-700 mb-1">
                    Emblem Color Atmosphere
                  </label>
                  <select
                    value={newColorTheme}
                    onChange={(e) => setNewColorTheme(e.target.value as IconColorTheme)}
                    className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-[#FAF7F2] text-sm font-serif text-stone-900"
                  >
                    {ICON_COLOR_THEMES.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end justify-between gap-2">
                  <div className="flex-1">
                    <label className="block font-cinzel text-xs font-bold text-stone-700 mb-1">
                      Frame Geometry
                    </label>
                    <select
                      value={newFrameStyle}
                      onChange={(e) => setNewFrameStyle(e.target.value as IconFrameStyle)}
                      className="w-full px-3 py-2 rounded-lg border border-stone-300 bg-[#FAF7F2] text-sm font-serif text-stone-900"
                    >
                      {ICON_FRAME_STYLES.map(f => (
                        <option key={f.id} value={f.id}>{f.name}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-amber-900 hover:bg-amber-950 text-amber-50 font-cinzel text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer shrink-0 shadow-xs"
                  >
                    Save Schedule
                  </button>
                </div>
              </div>
            </form>

            {/* Scheduled Special Days List */}
            <div className="space-y-2.5">
              <h4 className="font-cinzel text-xs sm:text-sm font-bold uppercase tracking-wider text-stone-800">
                Scheduled Special Day Mastheads ({scheduledMastheads.length})
              </h4>

              <div className="space-y-2.5">
                {scheduledMastheads.map(sched => {
                  const emb = SACRED_EMBLEMS.find(e => e.id === sched.emblemId) || SACRED_EMBLEMS[0];
                  const img = NIEPOKALANOW_HIGH_RES_IMAGES.find(i => i.id === sched.establishingImageId) || NIEPOKALANOW_HIGH_RES_IMAGES[0];
                  const variantObj = MASTHEAD_LAYOUT_VARIANTS.find(v => v.id === sched.layoutVariant) || MASTHEAD_LAYOUT_VARIANTS[0];

                  return (
                    <div
                      key={sched.id}
                      className={`p-3.5 sm:p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        sched.enabled
                          ? 'bg-white border-amber-800/30 shadow-xs'
                          : 'bg-stone-100/70 border-stone-300 opacity-75'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-md bg-stone-900 text-amber-100 font-cinzel text-xs font-bold">
                            {sched.dateStr}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-950 border border-amber-300 font-cinzel text-xs font-bold">
                            {variantObj.name}
                          </span>
                          <span className="text-xs font-serif text-stone-600">
                            • Art: <strong>{img.shortLabel}</strong> • Emblem: <strong>{emb.name}</strong>
                          </span>
                        </div>

                        <h5 className="font-cinzel text-base font-bold text-stone-900">
                          {sched.occasionName}
                        </h5>

                        <p className="text-xs sm:text-sm font-serif italic text-stone-700">
                          “{sched.mottoText}” — <span className="not-italic font-semibold text-amber-900">{sched.mottoCitation}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                        {onPreviewScheduledDate && (
                          <button
                            type="button"
                            onClick={() => {
                              onPreviewScheduledDate(sched.dateStr);
                              onClose();
                            }}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-950 border border-amber-300 font-cinzel text-xs font-bold transition-colors cursor-pointer"
                            title="Jump to this date now to preview its scheduled masthead"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Preview Date</span>
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => handleToggleSchedule(sched.id)}
                          className={`px-3 py-1.5 rounded-lg font-cinzel text-xs font-bold border transition-colors cursor-pointer ${
                            sched.enabled
                              ? 'bg-emerald-800 text-white border-emerald-900'
                              : 'bg-white text-stone-600 border-stone-300'
                          }`}
                        >
                          {sched.enabled ? 'Scheduled' : 'Paused'}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteSchedule(sched.id)}
                          className="p-1.5 rounded-lg bg-stone-100 hover:bg-red-100 text-stone-500 hover:text-red-700 border border-stone-200 transition-colors cursor-pointer"
                          title="Remove scheduled masthead"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Tab 1: 20 Sacred Icons Grid */}
        {activeTab === 'icons' && (
          <div className="flex-1 overflow-hidden flex flex-col space-y-3">
            {/* Category filter pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar shrink-0">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
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
            <span>Scheduled mastheads activate automatically on their target date and persist across visits.</span>
          </p>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 rounded-lg bg-amber-900 hover:bg-amber-950 text-amber-100 font-cinzel text-xs font-bold tracking-wider transition-colors cursor-pointer shadow-sm"
          >
            Apply and Close
          </button>
        </div>

      </div>
    </div>
  );
};
