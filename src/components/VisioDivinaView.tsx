import React, { useState } from 'react';
import { 
  Sparkles, 
  Eye, 
  Heart, 
  MessageSquare, 
  Maximize2, 
  BookOpen, 
  ChevronRight,
  Flame,
  Volume2,
  VolumeX
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

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12 animate-fadeIn">
      
      {/* Visio Divina Banner: Lighter luminous sacred ivory background distinct from dark page */}
      <div className="bg-[#FAF7F2]/95 backdrop-blur-xl rounded-xl p-6 sm:p-8 border border-amber-300/80 text-stone-900 shadow-2xl relative overflow-hidden">
        {/* Subtle luminous gold Eucharistic ambient halo */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-200/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-amber-700" />
            <span className="font-cinzel text-xs uppercase tracking-widest text-amber-800 font-bold">
              The Ancient Monastic Way of Divine Seeing
            </span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-amber-950 tracking-wide drop-shadow-2xs">
            Visio Divina
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-stone-800 font-serif max-w-3xl leading-relaxed">
            Contemplating God through the luminous beauty of Catholic sacred art. Just as Lectio Divina listens to the Word of God, Visio Divina beholds the presence of the Divine Mystery through holy images.
          </p>
        </div>
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
      <div className="bg-white/92 backdrop-blur-md rounded-xl p-6 sm:p-8 shadow-2xl border border-stone-200/90 space-y-6">
        
        {/* Artwork Image Frame */}
        <div className="relative rounded-xl overflow-hidden bg-black aspect-[16/10] sm:aspect-[16/9] border border-[#8B5A2B]/40 shadow-xl group">
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
            className="w-full h-full object-cover sm:object-contain object-center transition-transform duration-700 group-hover:scale-102"
          />

          {onOpenArtViewer && (
            <button
              onClick={() => onOpenArtViewer(selectedArt.id)}
              className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-[#3E2716]/90 hover:bg-[#4A2E1B] text-[#F5D7B2] border border-[#8B5A2B]/60 text-xs font-serif flex items-center gap-1.5 backdrop-blur-md cursor-pointer transition-all shadow-md"
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
          <p className="text-stone-700 text-base leading-relaxed">
            {steps[activeStep - 1].description}
          </p>
        </div>

        {/* Scripture and Theological Meditation */}
        <div className="space-y-4 pt-2">
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 font-serif text-amber-950 space-y-1">
            <span className="font-bold text-xs uppercase tracking-wider text-amber-800 block">
              Associated Scripture:
            </span>
            <p className="text-sm italic leading-relaxed">
              {selectedArt.scriptureReference}
            </p>
          </div>

          <div className="space-y-2 font-serif text-stone-800 text-base leading-relaxed">
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
