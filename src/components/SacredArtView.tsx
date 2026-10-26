import React, { useState, useRef, useEffect } from 'react';
import { 
  Maximize2, 
  Eye, 
  X, 
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Volume2,
  VolumeX,
  MapPin,
  BookOpen
} from 'lucide-react';
import { SacredMasterpiece } from '../types';
import { SACRED_MASTERPIECES } from '../data/sacredArt';
import { SacredReader } from '../utils/speech';

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
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const filmstripRef = useRef<HTMLDivElement>(null);

  const artists = [
    'All',
    'Caravaggio',
    'Raphael',
    'Leonardo da Vinci',
    'Murillo',
    'Fra Angelico',
    'Georges de La Tour',
    'Rembrandt',
    'Millet'
  ];

  const filteredArt = SACRED_MASTERPIECES.filter(art => {
    if (filterArtist === 'All') return true;
    return art.artist.toLowerCase().includes(filterArtist.toLowerCase());
  });

  // Ensure selectedArt stays within filteredArt when switching artist filter
  useEffect(() => {
    if (filteredArt.length > 0 && !filteredArt.some(a => a.id === selectedArt.id)) {
      setSelectedArt(filteredArt[0]);
      SacredReader.stop();
      setIsReadingAloud(false);
    }
  }, [filterArtist]);

  const currentIndex = Math.max(
    0,
    filteredArt.findIndex(a => a.id === selectedArt.id)
  );

  const handleSelectArt = (art: SacredMasterpiece) => {
    SacredReader.stop();
    setIsReadingAloud(false);
    setSelectedArt(art);
  };

  const handleStepMasterpiece = (delta: number) => {
    if (filteredArt.length === 0) return;
    const nextIndex = (currentIndex + delta + filteredArt.length) % filteredArt.length;
    handleSelectArt(filteredArt[nextIndex]);
  };

  const handleScrollFilmstrip = (direction: 'left' | 'right') => {
    if (!filmstripRef.current) return;
    const scrollAmount = direction === 'left' ? -520 : 520;
    filmstripRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const handleToggleAudio = () => {
    if (isReadingAloud) {
      SacredReader.stop();
      setIsReadingAloud(false);
      return;
    }
    const text = `${selectedArt.title}, by ${selectedArt.artist}, ${selectedArt.year}. Located at ${selectedArt.location}. Sacred Mystery: ${selectedArt.associatedMysteryOrSubject}. Scripture: ${selectedArt.scriptureReference}. Theological Reflection: ${selectedArt.theologicalReflection}`;
    setIsReadingAloud(true);
    SacredReader.speak(text, () => setIsReadingAloud(false));
  };

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

  // Keyboard left/right navigation for horizontal gallery browsing
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        handleStepMasterpiece(-1);
      } else if (e.key === 'ArrowRight') {
        handleStepMasterpiece(1);
      } else if (e.key === 'Escape' && isFullscreenModalOpen) {
        setIsFullscreenModalOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [currentIndex, filteredArt, isFullscreenModalOpen]);

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6 pb-16">
      <div className="bg-[#FAF8F5]/75 dark:bg-stone-950/75 backdrop-blur-md rounded-3xl border border-amber-200/70 dark:border-stone-800/80 shadow-2xl p-5 sm:p-8 space-y-6">
        
        {/* Horizontal Gallery Masthead & Artist Filter Bar */}
        <header className="flex flex-col xl:flex-row xl:items-end justify-between gap-4 border-b border-stone-300/70 dark:border-stone-800 pb-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-900 dark:text-amber-400 mb-1">
              <span>Via Pulchritudinis</span>
              <span aria-hidden="true">·</span>
              <span>The Way of Beauty</span>
              <span aria-hidden="true">·</span>
              <span>Masterpiece {currentIndex + 1} of {filteredArt.length}</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 tracking-tight">
              Sacred Art Gallery of the Masters
            </h1>
          </div>

          {/* Horizontal Artist Filter Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {artists.map(artist => {
              const isActive = filterArtist === artist;
              return (
                <button
                  key={artist}
                  onClick={() => setFilterArtist(artist)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-serif font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
                    isActive
                      ? 'bg-stone-900 dark:bg-amber-700 text-white border-stone-900 dark:border-amber-600 shadow-xs'
                      : 'bg-white/75 dark:bg-stone-900/75 text-stone-800 dark:text-stone-300 border-stone-300/80 dark:border-stone-800 hover:bg-white dark:hover:bg-stone-800'
                  }`}
                >
                  {artist}
                </button>
              );
            })}
          </div>
        </header>

        {/* Horizontal Panoramic Masterpiece Vantage Stage */}
        <section className="space-y-5">
          <div className="relative rounded-2xl overflow-hidden bg-[#0E0B09] border border-amber-800/40 shadow-2xl group">
            {/* Subtle warm museum spotlight vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.10)_0%,transparent_75%)] pointer-events-none" />

            {/* Main Wide Horizontal Canvas Viewport */}
            <div className="relative w-full h-[380px] sm:h-[500px] lg:h-[600px] flex items-center justify-center px-4 sm:px-14 py-4 sm:py-6">
              {imgErrors[selectedArt.id] ? (
                <div className="flex flex-col items-center justify-center p-8 text-center text-stone-300 space-y-2">
                  <ImageIcon className="w-12 h-12 text-amber-500/70" />
                  <h2 className="font-serif text-xl font-bold text-amber-100">{selectedArt.title}</h2>
                  <p className="text-sm text-stone-400">{selectedArt.artist} ({selectedArt.year})</p>
                </div>
              ) : (
                <img
                  key={selectedArt.id}
                  src={selectedArt.imageUrl}
                  alt={selectedArt.title}
                  loading="eager"
                  referrerPolicy="no-referrer"
                  onError={(e) => handleImageError(selectedArt.id, e)}
                  onClick={() => setIsFullscreenModalOpen(true)}
                  className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-[0_20px_60px_rgba(0,0,0,0.85)] ring-1 ring-amber-500/25 cursor-zoom-in transition-transform duration-500"
                />
              )}

              {/* Left Horizontal Gallery Arrow */}
              <button
                onClick={() => handleStepMasterpiece(-1)}
                className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-stone-950/75 hover:bg-amber-800 text-stone-100 border border-amber-500/30 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-lg"
                title="Previous Masterpiece (Left Arrow)"
                aria-label="Previous Masterpiece"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Right Horizontal Gallery Arrow */}
              <button
                onClick={() => handleStepMasterpiece(1)}
                className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-stone-950/75 hover:bg-amber-800 text-stone-100 border border-amber-500/30 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer shadow-lg"
                title="Next Masterpiece (Right Arrow)"
                aria-label="Next Masterpiece"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Top-Right Fullscreen & Audio Controls on Canvas */}
              <div className="absolute top-3.5 right-3.5 flex items-center gap-2">
                <button
                  onClick={handleToggleAudio}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-serif font-semibold backdrop-blur-md border transition-colors cursor-pointer shadow-md ${
                    isReadingAloud
                      ? 'bg-amber-700 text-white border-amber-400'
                      : 'bg-stone-950/75 hover:bg-stone-900 text-stone-100 border-stone-700/80'
                  }`}
                  title="Listen to Theological Commentary"
                >
                  {isReadingAloud ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
                  <span className="hidden sm:inline">{isReadingAloud ? 'Stop Audio' : 'Audio Guide'}</span>
                </button>

                <button
                  onClick={() => setIsFullscreenModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-950/75 hover:bg-amber-800 text-stone-100 text-xs font-serif font-semibold backdrop-blur-md border border-amber-500/30 transition-colors cursor-pointer shadow-md"
                  title="Full-Screen Visio Divina View"
                >
                  <Maximize2 className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">Full-Screen Vantage</span>
                </button>
              </div>
            </div>

            {/* Bottom Museum Frame Caption Bar */}
            <div className="bg-stone-950/90 border-t border-stone-800/90 px-5 sm:px-8 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-stone-200">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h2 className="font-serif text-lg sm:text-2xl font-bold text-white">
                  {selectedArt.title}
                </h2>
                <span className="text-amber-400 font-serif italic text-sm sm:text-base">
                  {selectedArt.artist} ({selectedArt.year})
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-stone-400 font-serif">
                <MapPin className="w-3.5 h-3.5 text-amber-500/80 shrink-0" />
                <span>{selectedArt.location}</span>
              </div>
            </div>
          </div>

          {/* Horizontal Museum Plaque: 3-Column Wide Panorama Details */}
          <div className="bg-white/65 dark:bg-stone-900/65 rounded-2xl border border-stone-300/80 dark:border-stone-800 p-5 sm:p-7 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              
              {/* Left Column (4 cols): Title, Mystery & Scripture */}
              <div className="lg:col-span-5 space-y-4 lg:border-r lg:border-stone-300/70 dark:lg:border-stone-800 lg:pr-7">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-amber-900 dark:text-amber-400 mb-1">
                    {selectedArt.associatedMysteryOrSubject}
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
                    {selectedArt.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 font-serif mt-0.5">
                    {selectedArt.artist} · {selectedArt.year} · {selectedArt.location}
                  </p>
                </div>

                {selectedArt.scriptureReference && (
                  <div className="pt-3 border-t border-stone-300/60 dark:border-stone-800">
                    <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1.5">
                      <BookOpen className="w-3.5 h-3.5 text-amber-800 dark:text-amber-400" />
                      <span>Sacred Scripture</span>
                    </div>
                    <p className="font-serif italic text-sm sm:text-base text-stone-900 dark:text-stone-200 leading-relaxed">
                      {selectedArt.scriptureReference}
                    </p>
                  </div>
                )}
              </div>

              {/* Right Column (7 cols): Visio Divina Theological Contemplation */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-stone-600 dark:text-stone-400 mb-2">
                    Visio Divina · Theological Reflection
                  </div>
                  <p className="font-serif text-base sm:text-lg text-stone-900 dark:text-stone-200 leading-relaxed">
                    {selectedArt.theologicalReflection}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-300/60 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs font-serif italic text-stone-600 dark:text-stone-400">
                    Tip: Use the Left and Right arrow keys on your keyboard to glide horizontally through the gallery.
                  </span>

                  <button
                    onClick={() => setIsFullscreenModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-amber-700 dark:hover:bg-amber-600 text-white text-xs font-serif font-semibold transition-colors cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Enter Full-Screen Contemplation</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Horizontal Gallery Promenade Filmstrip */}
        <section className="space-y-3 pt-2">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-stone-900 dark:text-stone-100">
                Gallery Promenade
              </h3>
              <p className="text-xs text-stone-600 dark:text-stone-400 font-serif">
                Scroll horizontally to select any masterpiece in the collection
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleScrollFilmstrip('left')}
                className="p-2 rounded-xl bg-white/80 dark:bg-stone-900/80 hover:bg-white dark:hover:bg-stone-800 border border-stone-300/80 dark:border-stone-700 text-stone-800 dark:text-stone-200 transition-colors cursor-pointer"
                title="Scroll Gallery Left"
                aria-label="Scroll Gallery Left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleScrollFilmstrip('right')}
                className="p-2 rounded-xl bg-white/80 dark:bg-stone-900/80 hover:bg-white dark:hover:bg-stone-800 border border-stone-300/80 dark:border-stone-700 text-stone-800 dark:text-stone-200 transition-colors cursor-pointer"
                title="Scroll Gallery Right"
                aria-label="Scroll Gallery Right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Horizontal Scrollable Ribbon of Masterpieces */}
          <div
            ref={filmstripRef}
            className="flex items-stretch gap-4 overflow-x-auto pb-3 pt-1 scroll-smooth"
          >
            {filteredArt.map((art, idx) => {
              const isSelected = art.id === selectedArt.id;

              return (
                <button
                  key={art.id}
                  onClick={() => handleSelectArt(art)}
                  className={`group text-left shrink-0 w-64 sm:w-72 rounded-2xl overflow-hidden border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-stone-900 text-white border-amber-600 ring-2 ring-amber-500/50 shadow-lg'
                      : 'bg-white/70 dark:bg-stone-900/70 hover:bg-white dark:hover:bg-stone-800/90 text-stone-900 dark:text-stone-100 border-stone-300/80 dark:border-stone-800'
                  }`}
                >
                  {/* Wide 16:10 Horizontal Thumbnail Frame */}
                  <div className="aspect-[16/10] w-full bg-stone-950 overflow-hidden relative">
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => handleImageError(art.id, e)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/65 backdrop-blur-xs text-[10px] font-serif font-semibold text-amber-300">
                      {idx + 1}
                    </div>
                  </div>

                  <div className="p-3.5 space-y-0.5">
                    <h4 className={`font-serif text-sm sm:text-base font-bold truncate ${
                      isSelected ? 'text-white' : 'text-stone-900 dark:text-stone-100'
                    }`}>
                      {art.title}
                    </h4>
                    <p className={`text-xs font-serif truncate ${
                      isSelected ? 'text-amber-300' : 'text-stone-600 dark:text-stone-400'
                    }`}>
                      {art.artist} · {art.year}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

      </div>

      {/* Fullscreen Horizontal Visio Divina Contemplation Modal */}
      {isFullscreenModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex flex-col p-4 sm:p-6 overflow-y-auto">
          <div className="flex items-center justify-between pb-4 border-b border-stone-800 text-white max-w-7xl w-full mx-auto">
            <div>
              <h4 className="font-serif text-lg sm:text-2xl font-bold text-amber-200">
                {selectedArt.title}
              </h4>
              <p className="text-xs sm:text-sm text-stone-400 font-serif">
                {selectedArt.artist} ({selectedArt.year}) — {selectedArt.location}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleStepMasterpiece(-1)}
                className="p-2 rounded-full bg-stone-800 text-stone-300 hover:text-white cursor-pointer"
                title="Previous Masterpiece"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleStepMasterpiece(1)}
                className="p-2 rounded-full bg-stone-800 text-stone-300 hover:text-white cursor-pointer"
                title="Next Masterpiece"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsFullscreenModalOpen(false)}
                className="p-2 rounded-full bg-stone-800 text-stone-300 hover:text-white cursor-pointer"
                title="Close Fullscreen"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 py-6">
            <div className="w-full lg:w-3/4 flex items-center justify-center">
              <img
                key={selectedArt.id}
                src={selectedArt.imageUrl}
                alt={selectedArt.title}
                referrerPolicy="no-referrer"
                onError={(e) => handleImageError(selectedArt.id, e)}
                className="max-h-[76vh] w-auto object-contain rounded-xl shadow-2xl border border-stone-800"
              />
            </div>

            <div className="w-full lg:w-1/4 bg-stone-900/80 p-6 rounded-2xl border border-stone-800 space-y-4 text-stone-200 text-xs sm:text-sm font-serif leading-relaxed">
              <div className="font-serif font-bold text-amber-300 uppercase tracking-widest text-xs">
                How to Pray with Visio Divina
              </div>
              <ol className="space-y-2 list-decimal list-inside text-stone-300">
                <li><span className="font-semibold text-white">Gaze:</span> Look slowly across the horizontal canvas, noticing light, gesture, and focal point.</li>
                <li><span className="font-semibold text-white">Meditate:</span> Where does your eye naturally rest? What is Christ communicating to you?</li>
                <li><span className="font-semibold text-white">Pray:</span> Speak spontaneously to Jesus about your life in response to what you see.</li>
                <li><span className="font-semibold text-white">Rest:</span> Sit in quiet loving adoration in the presence of God.</li>
              </ol>

              <div className="p-3.5 bg-stone-950 rounded-xl border border-stone-800 text-amber-200/90 italic">
                &ldquo;{selectedArt.theologicalReflection}&rdquo;
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
