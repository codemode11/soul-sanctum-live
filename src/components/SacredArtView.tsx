import React, { useState } from 'react';
import { 
  Sparkles, 
  Maximize2, 
  Eye, 
  X, 
  RefreshCw,
  Image as ImageIcon
} from 'lucide-react';
import { SacredMasterpiece } from '../types';
import { SACRED_MASTERPIECES } from '../data/sacredArt';

interface SacredArtViewProps {
  initialArtId?: string | null;
  initialSelectedArtId?: string | null;
}

export const SacredArtView: React.FC<SacredArtViewProps> = ({ initialArtId, initialSelectedArtId }) => {
  const targetId = initialArtId || initialSelectedArtId;
  const [selectedArt, setSelectedArt] = useState<SacredMasterpiece>(() => {
    if (targetId) {
      const match = SACRED_MASTERPIECES.find(a => a.id === targetId);
      if (match) return match;
    }
    return SACRED_MASTERPIECES[0];
  });

  const [isFullscreenModalOpen, setIsFullscreenModalOpen] = useState(false);
  const [filterArtist, setFilterArtist] = useState<string>('All');
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const [isLoadingMainImg, setIsLoadingMainImg] = useState(true);

  const artists = ['All', 'Raphael', 'Leonardo da Vinci', 'Murillo', 'Caravaggio', 'Fra Angelico', 'Georges de La Tour', 'Rembrandt', 'Millet'];

  const filteredArt = SACRED_MASTERPIECES.filter(art => {
    if (filterArtist === 'All') return true;
    return art.artist.toLowerCase().includes(filterArtist.toLowerCase());
  });

  const handleImageError = (artId: string, e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const art = SACRED_MASTERPIECES.find(a => a.id === artId);
    const target = e.currentTarget;
    if (art?.fallbackImageUrl && target.getAttribute('data-fallback') !== 'true') {
      target.setAttribute('data-fallback', 'true');
      target.src = art.fallbackImageUrl;
    } else {
      setImgErrors(prev => ({ ...prev, [artId]: true }));
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-stone-900 via-[#1f1915] to-stone-900 rounded-xl p-6 sm:p-8 text-amber-50 shadow-md border border-stone-800">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-amber-300">
              Via Pulchritudinis • The Way of Beauty
            </span>
          </div>
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide">
            Sacred Art of the Masters
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 font-serif-sacred max-w-2xl">
            Engage in Visio Divina (divine seeing). Sacred art in Catholic tradition does not merely illustrate, but opens a sacramental window onto the transcendent mysteries of Christ and the saints.
          </p>
        </div>

        {/* Filter Artist tabs */}
        <div className="flex flex-wrap gap-2 mt-5">
          {artists.map(a => (
            <button
              key={a}
              onClick={() => setFilterArtist(a)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium font-cinzel transition-all cursor-pointer ${
                filterArtist === a 
                  ? 'bg-[#6B4423] text-white font-bold shadow-xs border border-[#8B5A2B]' 
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Masterpiece Spotlight Display */}
      <div className="bg-stone-900 rounded-xl overflow-hidden shadow-xl border border-stone-800 text-stone-100 grid grid-cols-1 lg:grid-cols-12">
        
        {/* The Painting Image */}
        <div className="lg:col-span-7 bg-stone-900 flex items-center justify-center relative group min-h-[360px] sm:min-h-[460px] p-2 sm:p-4">
          {imgErrors[selectedArt.id] ? (
            <div className="flex flex-col items-center justify-center p-8 text-center text-stone-400 space-y-2">
              <ImageIcon className="w-12 h-12 text-amber-600/60" />
              <h4 className="font-cinzel text-base font-bold text-amber-200">{selectedArt.title}</h4>
              <p className="text-xs text-stone-400">{selectedArt.artist} ({selectedArt.year})</p>
              <p className="text-xs text-stone-500 italic max-w-md">{selectedArt.theologicalReflection}</p>
            </div>
          ) : (
            <img 
              key={selectedArt.id}
              src={selectedArt.imageUrl} 
              alt={selectedArt.title}
              loading="eager"
              referrerPolicy="no-referrer"
              onError={(e) => {
                handleImageError(selectedArt.id, e);
              }}
              className="w-full h-full max-h-[550px] object-contain transition-transform duration-500 group-hover:scale-102 opacity-100 block"
            />
          )}

          <button
            onClick={() => setIsFullscreenModalOpen(true)}
            className="absolute bottom-4 right-4 p-2.5 rounded-xl bg-stone-900/80 hover:bg-[#6B4423] text-white backdrop-blur-xs transition-colors cursor-pointer flex items-center justify-center border border-stone-700 shadow-md"
            title="Enlarge and Visio Divina"
            aria-label="Enlarge and Visio Divina"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Information and Theological Contemplation */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-4 bg-gradient-to-b from-stone-900 to-stone-950">
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-amber-400 font-cinzel bg-amber-950/60 px-2.5 py-1 rounded-md border border-amber-800/60 inline-block">
              {selectedArt.associatedMysteryOrSubject}
            </span>

            <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-white">
              {selectedArt.title}
            </h3>

            <p className="text-xs text-amber-200/80 font-serif-sacred italic">
              {selectedArt.artist} ({selectedArt.year}) <br />
              <span className="text-stone-400 not-italic">{selectedArt.location}</span>
            </p>

            {selectedArt.scriptureReference && (
              <div className="p-3.5 rounded-xl bg-stone-800/80 border border-stone-700 text-xs font-serif-sacred text-amber-200/90 italic">
                "{selectedArt.scriptureReference}"
              </div>
            )}

            <div className="space-y-1 pt-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 font-cinzel">
                Visio Divina • Theological Reflection
              </span>
              <p className="text-xs sm:text-sm text-stone-300 font-serif-sacred leading-relaxed">
                {selectedArt.theologicalReflection}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-800">
            <button
              onClick={() => setIsFullscreenModalOpen(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#6B4423] to-[#4A2E1B] hover:from-[#7A4E2D] hover:to-[#5A381C] border border-[#8B5A2B]/60 text-amber-50 text-xs font-semibold font-cinzel tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md"
            >
              <Eye className="w-4 h-4" />
              <span>Enter Visio Divina Prayer Mode</span>
            </button>
          </div>
        </div>

      </div>

      {/* Masterpieces Grid Selection */}
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredArt.map(art => {
            const isSelected = art.id === selectedArt.id;

            return (
              <div
                key={art.id}
                onClick={() => {
                  setSelectedArt(art);
                  setIsLoadingMainImg(true);
                  const mainArea = document.getElementById('main-content-area');
                  if (mainArea) {
                    const rect = mainArea.getBoundingClientRect();
                    const absoluteTop = rect.top + window.pageYOffset;
                    window.scrollTo({ top: Math.max(0, absoluteTop - 80), behavior: 'smooth' });
                  }
                }}
                className={`rounded-xl overflow-hidden border transition-all cursor-pointer flex flex-col justify-between bg-white ${
                  isSelected
                    ? 'border-amber-700 ring-2 ring-amber-600/50 shadow-md'
                    : 'border-stone-200 hover:border-amber-400 hover:shadow-xs'
                }`}
              >
                <div className="aspect-4/3 bg-stone-950 overflow-hidden relative">
                  <img
                    src={art.imageUrl}
                    alt={art.title}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={(e) => handleImageError(art.id, e)}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-3.5 space-y-1">
                  <h4 className="font-cinzel text-xs sm:text-sm font-bold text-stone-900 line-clamp-1">
                    {art.title}
                  </h4>
                  <p className="text-[11px] text-stone-500 font-serif-sacred">
                    {art.artist}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fullscreen Visio Divina Contemplation Modal */}
      {isFullscreenModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex flex-col p-4 sm:p-8 overflow-y-auto">
          <div className="flex items-center justify-between pb-4 border-b border-stone-800 text-white">
            <div>
              <h4 className="font-cinzel text-lg sm:text-xl font-bold text-amber-200">
                {selectedArt.title}
              </h4>
              <p className="text-xs text-stone-400">
                {selectedArt.artist} ({selectedArt.year}) — {selectedArt.location}
              </p>
            </div>
            <button
              onClick={() => setIsFullscreenModalOpen(false)}
              className="p-2 rounded-full bg-stone-800 text-stone-300 hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 py-6">
            <div className="w-full lg:w-2/3 max-h-[70vh] flex items-center justify-center">
              <img
                key={selectedArt.id}
                src={selectedArt.imageUrl}
                alt={selectedArt.title}
                referrerPolicy="no-referrer"
                onError={(e) => handleImageError(selectedArt.id, e)}
                className="max-h-[68vh] w-auto object-contain rounded-xl shadow-2xl border border-stone-800"
              />
            </div>

            <div className="w-full lg:w-1/3 bg-stone-900/80 p-6 rounded-xl border border-stone-800 space-y-4 text-stone-200 text-xs sm:text-sm font-serif-sacred leading-relaxed">
              <div className="font-cinzel font-bold text-amber-300 uppercase tracking-widest text-xs">
                How to Pray with Visio Divina
              </div>
              <ol className="space-y-2 list-decimal list-inside text-stone-300">
                <li><span className="font-semibold text-white">Gaze:</span> Look slowly at the colors, gestures, and play of light (chiaroscuro).</li>
                <li><span className="font-semibold text-white">Meditate:</span> Where does your eye naturally rest? What is Christ communicating to you?</li>
                <li><span className="font-semibold text-white">Pray:</span> Speak spontaneously to Jesus about your life in response to what you see.</li>
                <li><span className="font-semibold text-white">Rest:</span> Sit in quiet loving adoration in the presence of God.</li>
              </ol>

              <div className="p-3 bg-stone-950 rounded-xl border border-stone-800 text-amber-200/90 italic">
                "{selectedArt.theologicalReflection}"
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
