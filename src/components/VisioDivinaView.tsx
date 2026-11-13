import React, { useState } from 'react';
import { 
  Sparkles, 
  Eye, 
  Maximize2, 
  Volume2,
  VolumeX,
  Settings,
  ChevronDown,
  Copy,
  Check
} from 'lucide-react';
import { SACRED_MASTERPIECES } from '../data/sacredArt';
import { SacredMasterpiece } from '../types';
import { SacredReader } from '../utils/speech';

interface VisioDivinaViewProps {
  onOpenArtViewer?: (artId: string) => void;
}

export const VisioDivinaView: React.FC<VisioDivinaViewProps> = ({
  onOpenArtViewer
}) => {
  const [selectedArt, setSelectedArt] = useState<SacredMasterpiece>(SACRED_MASTERPIECES[0]);
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [isTopSettingsOpen, setIsTopSettingsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sanctum_visio_font_size');
      if (saved === 'normal' || saved === 'large' || saved === 'xlarge') return saved;
    }
    return 'normal';
  });

  const fontSizes: Array<'normal' | 'large' | 'xlarge'> = ['normal', 'large', 'xlarge'];

  const handleSetFontSize = (size: 'normal' | 'large' | 'xlarge') => {
    setFontSize(size);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sanctum_visio_font_size', size);
    }
  };

  const increaseFontSize = () => {
    const idx = fontSizes.indexOf(fontSize);
    if (idx < fontSizes.length - 1) handleSetFontSize(fontSizes[idx + 1]);
  };

  const decreaseFontSize = () => {
    const idx = fontSizes.indexOf(fontSize);
    if (idx > 0) handleSetFontSize(fontSizes[idx - 1]);
  };

  const reflectionTextClass =
    fontSize === 'normal'
      ? 'text-base leading-relaxed'
      : fontSize === 'large'
      ? 'text-lg leading-relaxed'
      : 'text-xl leading-loose';

  const steps = [
    {
      step: 1,
      name: 'Visio',
      subtitle: 'Look with Wonder',
      description: 'Gaze prayerfully upon the sacred image. Notice the light, the shadows, the postures of the figures, and where your eyes are naturally drawn. Let the beauty speak to your heart before analyzing.'
    },
    {
      step: 2,
      name: 'Meditatio',
      subtitle: 'Meditate and Understand',
      description: 'Reflect upon the theological mystery depicted. What is God revealing about Himself, His mercy, and His holy presence in your life through this scene?'
    },
    {
      step: 3,
      name: 'Oratio',
      subtitle: 'Pray to the Lord',
      description: 'Pour out your spontaneous prayer to Christ. Confess your needs, offer thanksgiving, and dialogue intimately with the Savior who gazes back at you in love.'
    },
    {
      step: 4,
      name: 'Contemplatio',
      subtitle: 'Rest in Divine Love',
      description: 'Surrender all words and simply rest in the stillness of God’s presence. Allow His peace and grace to dwell deeply within your soul.'
    }
  ];

  const handleToggleSpeak = () => {
    if (isReadingAloud) {
      SacredReader.stop();
      setIsReadingAloud(false);
    } else {
      const speech = `Visio Divina on ${selectedArt.title} by ${selectedArt.artist}. Scripture: ${selectedArt.scriptureReference}. Theological Reflection: ${selectedArt.theologicalReflection}`;
      SacredReader.speak(speech, () => setIsReadingAloud(false));
      setIsReadingAloud(true);
    }
  };

  const handleCopyText = () => {
    const text = `Visio Divina — ${selectedArt.title} (${selectedArt.artist}, ${selectedArt.year})\n\nScripture: ${selectedArt.scriptureReference}\n\nTheological Reflection:\n${selectedArt.theologicalReflection}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto p-3 sm:p-6 md:p-8 rounded-xl bg-white/45 backdrop-blur-xl backdrop-saturate-150 border border-white/60 ring-1 ring-inset ring-white/40 shadow-[0_8px_32px_0_rgba(120,90,50,0.12)] space-y-6 mb-12 animate-fadeIn">
      
      {/* Visio Divina Banner (Patterned after Daily Mass Readings & Bible Commentary) */}
      <div className="bg-white/55 backdrop-blur-xl backdrop-saturate-150 rounded-xl shadow-xs border border-white/70 ring-1 ring-inset ring-white/40 relative z-20">
        
        {/* RECTANGLE 1: Main Title Banner with Settings Toggle */}
        <div className={`sanctum-top-banner px-5 pt-4 pb-4 sm:px-6 min-h-[164px] bg-gradient-to-r from-stone-900 to-stone-800 text-stone-100 flex flex-col justify-between ${isTopSettingsOpen ? 'rounded-t-xl' : 'rounded-xl'}`}>
          <div className="space-y-1.5 my-auto">
            {/* Line 1: Kicker Badge & Monastic Subtitle */}
            <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs text-xs font-semibold uppercase tracking-wider whitespace-nowrap shrink-0 bg-amber-400 text-amber-950">
                <Eye className="w-3.5 h-3.5" />
                <span>Sacred Art Contemplation</span>
              </span>
              <span className="text-xs sm:text-sm text-amber-300/80 font-cinzel uppercase tracking-wider">
                The Ancient Monastic Way of Divine Seeing
              </span>
            </div>

            {/* Line 2: Main Title */}
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold tracking-normal text-amber-100 leading-tight">
              Visio Divina
            </h2>

            {/* Line 3: Contemplative Subtitle */}
            <p className="text-xs sm:text-sm text-stone-300 font-serif">
              Contemplating God through the luminous beauty of Catholic sacred art
            </p>
          </div>

          {/* Lower Row: Settings Toggle Button */}
          <div className="flex items-center justify-end mt-auto pt-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsTopSettingsOpen(prev => !prev)}
              aria-expanded={isTopSettingsOpen}
              className={`h-8 flex items-center gap-1 px-2.5 rounded-md transition-all cursor-pointer shrink-0 border ${
                isTopSettingsOpen
                  ? 'bg-[#25170F] text-[#F7EBE1] border-[#D4A373] ring-2 ring-[#8B5A2B]/40'
                  : 'bg-[#1C120C]/90 hover:bg-[#25170F] text-[#D4A373] hover:text-[#F7EBE1] border-[#8B5A2B]/50 hover:border-[#D4A373]/70'
              }`}
              title={isTopSettingsOpen ? 'Hide Settings' : 'Show Settings'}
              aria-label={isTopSettingsOpen ? 'Hide Settings' : 'Show Settings'}
            >
              <Settings className="w-3.5 h-3.5 text-[#D4A373] shrink-0" />
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#D4A373] shrink-0 transition-transform duration-200 ${
                  isTopSettingsOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* RECTANGLE 2: Settings Panel (Hidden by default) */}
        {isTopSettingsOpen && (
          <div className="px-5 py-3.5 sm:px-6 bg-white/55 backdrop-blur-md border-t border-white/60 flex flex-col justify-center gap-2.5 rounded-b-xl animate-fadeIn">
            <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 p-2.5 rounded-lg bg-stone-100/90 border border-stone-200 shadow-2xs text-xs text-stone-700">
              {/* 1. Listen to Contemplation */}
              <button
                onClick={handleToggleSpeak}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer shadow-xs ${
                  isReadingAloud
                    ? 'bg-[#6B4423] text-white animate-pulse'
                    : 'bg-[#5A381C] hover:bg-[#6B4423] text-amber-100 border border-[#8B5A2B]/70'
                }`}
                title="Listen to Visio Divina Contemplation"
                aria-label="Listen to Visio Divina Contemplation"
              >
                {isReadingAloud ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-300" />}
                <span>{isReadingAloud ? 'Stop Audio' : 'Listen to Contemplation'}</span>
              </button>

              {/* 2. Text Size */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-medium text-stone-600 text-xs">Text Size:</span>
                <div className="flex items-center gap-1 bg-stone-200/90 p-0.5 rounded-md border border-stone-300 shadow-2xs">
                  <button
                    onClick={decreaseFontSize}
                    disabled={fontSize === 'normal'}
                    className="w-6 h-6 flex items-center justify-center rounded-sm text-xs font-bold text-stone-700 hover:text-stone-950 hover:bg-white/80 disabled:opacity-35 disabled:hover:bg-transparent cursor-pointer transition-all"
                    title="Decrease font size"
                    aria-label="Decrease font size"
                  >
                    A-
                  </button>
                  <button
                    onClick={() => handleSetFontSize('normal')}
                    className={`px-2 py-1 text-xs rounded-sm font-semibold transition-all cursor-pointer ${
                      fontSize === 'normal'
                        ? 'bg-[#6B4423] text-white shadow-xs font-bold ring-1 ring-[#8B5A2B]'
                        : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                    }`}
                  >
                    A
                  </button>
                  <button
                    onClick={() => handleSetFontSize('large')}
                    className={`px-2 py-1 text-xs rounded-sm font-semibold transition-all cursor-pointer ${
                      fontSize === 'large'
                        ? 'bg-[#6B4423] text-white shadow-xs font-bold ring-1 ring-[#8B5A2B]'
                        : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                    }`}
                  >
                    A+
                  </button>
                  <button
                    onClick={() => handleSetFontSize('xlarge')}
                    className={`px-2 py-1 text-xs rounded-sm font-semibold transition-all cursor-pointer ${
                      fontSize === 'xlarge'
                        ? 'bg-[#6B4423] text-white shadow-xs font-bold ring-1 ring-[#8B5A2B]'
                        : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                    }`}
                  >
                    A++
                  </button>
                  <button
                    onClick={increaseFontSize}
                    disabled={fontSize === 'xlarge'}
                    className="w-6 h-6 flex items-center justify-center rounded-sm text-xs font-bold text-stone-700 hover:text-stone-950 hover:bg-white/80 disabled:opacity-35 disabled:hover:bg-transparent cursor-pointer transition-all"
                    title="Increase font size"
                    aria-label="Increase font size"
                  >
                    A+
                  </button>
                </div>
              </div>

              {/* 3. Copy Reflection */}
              <button
                onClick={handleCopyText}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-white hover:bg-stone-50 text-stone-700 border border-stone-300 shadow-2xs transition-colors cursor-pointer shrink-0"
                title="Copy Reflection"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-stone-500" />}
                <span>{copied ? 'Copied' : 'Copy Text'}</span>
              </button>
            </div>

            <p className="text-xs font-serif text-stone-700 leading-relaxed px-1">
              Just as <span className="italic font-semibold">Lectio Divina</span> listens prayerfully to the Word of God, <span className="italic font-semibold">Visio Divina</span> beholds the presence of the Divine Mystery through sacred art.
            </p>
          </div>
        )}
      </div>

      {/* Artwork Selector Bar with lighter styling */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {SACRED_MASTERPIECES.map(art => (
          <button
            key={art.id}
            onClick={() => {
              setSelectedArt(art);
              setActiveStep(1);
            }}
            className={`px-3.5 py-2 rounded-lg text-xs font-serif transition-all cursor-pointer whitespace-nowrap shrink-0 border shadow-xs ${
              selectedArt.id === art.id
                ? 'bg-[#6B4423] text-white font-bold border-[#5A381C] shadow-md ring-2 ring-[#8B5A2B]/50'
                : 'bg-white/95 hover:bg-[#FAF4EE] text-stone-800 border-stone-300/90'
            }`}
          >
            {art.title.split('—')[0].replace(/"/g, '')}
          </button>
        ))}
      </div>

      {/* Main Sacred Artwork Presentation */}
      <div className="bg-white/92 backdrop-blur-md rounded-xl p-5 sm:p-7 shadow-2xl border border-stone-200/90 space-y-6">
        
        {/* Artwork Image Frame (Enlarged Viewer) */}
        <div className="relative rounded-xl overflow-hidden bg-[#0E0B09] border border-[#8B5A2B]/60 shadow-2xl group flex items-center justify-center p-3 sm:p-6 h-[380px] sm:h-[480px] md:h-[560px] max-h-[75vh] w-full">
          {/* Subtle warm museum spotlight vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.10)_0%,transparent_75%)] pointer-events-none" />

          <img
            key={selectedArt.id}
            src={selectedArt.imageUrl}
            alt={selectedArt.title}
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              if (selectedArt.fallbackImageUrl && target.getAttribute('data-fallback') !== 'true') {
                target.setAttribute('data-fallback', 'true');
                target.src = selectedArt.fallbackImageUrl;
              }
            }}
            className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-[0_16px_50px_rgba(0,0,0,0.85)] ring-1 ring-amber-500/30 z-10"
          />

          {onOpenArtViewer && (
            <button
              onClick={() => onOpenArtViewer(selectedArt.id)}
              className="absolute bottom-3 right-3 z-20 px-3 py-1.5 rounded-lg bg-[#3E2716]/90 hover:bg-[#4A2E1B] text-[#F5D7B2] border border-[#8B5A2B]/60 text-xs font-serif flex items-center gap-1.5 backdrop-blur-md cursor-pointer transition-all shadow-md"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#D4A373]" />
              <span>Full-Screen View</span>
            </button>
          )}
        </div>

        {/* Artwork Information */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-200/90 pb-4 gap-3">
          <div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              {selectedArt.title}
            </h3>
            <p className="font-serif text-sm text-stone-600 italic">
              {selectedArt.artist} ({selectedArt.year}) — {selectedArt.location}
            </p>
          </div>

          <button
            onClick={handleToggleSpeak}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-serif text-xs font-medium cursor-pointer transition-all self-start sm:self-auto border ${
              isReadingAloud 
                ? 'bg-[#6B4423] text-white border-[#5A381C] animate-pulse' 
                : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border-stone-300'
            }`}
            title="Audio Contemplation"
            aria-label="Audio Contemplation"
          >
            {isReadingAloud ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#6B4423]" />
            )}
          </button>
        </div>

        {/* 4 Steps of Visio Divina Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {steps.map(s => {
            const isCurrent = activeStep === s.step;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(s.step as any)}
                className={`p-3 rounded-lg text-left transition-all cursor-pointer border ${
                  isCurrent
                    ? 'bg-[#6B4423] text-white border-[#5A381C] shadow-xs'
                    : 'bg-stone-50 hover:bg-stone-100 border-stone-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-cinzel text-xs font-bold ${isCurrent ? 'text-white' : 'text-[#5A381C]'}`}>
                    {s.step}. {s.name}
                  </span>
                  {isCurrent && <Sparkles className="w-3 h-3 text-[#F5D7B2]" />}
                </div>
                <span className={`text-[11px] font-serif block mt-0.5 ${isCurrent ? 'text-stone-200' : 'text-stone-600'}`}>
                  {s.subtitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* Current Step Guidance */}
        <div className="p-5 rounded-xl bg-[#FAF8F5] border border-amber-900/15 space-y-3 font-serif">
          <div className="flex items-center gap-2 text-amber-900 font-bold">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span className="text-base font-cinzel">
              Step {activeStep}: {steps[activeStep - 1].name} — {steps[activeStep - 1].subtitle}
            </span>
          </div>
          <p className={`text-stone-700 ${reflectionTextClass}`}>
            {steps[activeStep - 1].description}
          </p>
        </div>

        {/* Scripture and Theological Meditation */}
        <div className="space-y-4 pt-2">
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 font-serif text-amber-950 space-y-1">
            <span className="font-bold text-xs uppercase tracking-wider text-amber-800 block">
              Associated Scripture:
            </span>
            <p className={`italic ${reflectionTextClass}`}>
              {selectedArt.scriptureReference}
            </p>
          </div>

          <div className={`space-y-2 font-serif text-stone-800 ${reflectionTextClass}`}>
            <h4 className="font-bold text-stone-900">Theological Reflection:</h4>
            <p className="whitespace-pre-line">
              {selectedArt.theologicalReflection}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};
