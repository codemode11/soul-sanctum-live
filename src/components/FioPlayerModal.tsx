import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  Headphones, 
  Search, 
  ExternalLink, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  Clock, 
  Sparkles, 
  Radio, 
  BookOpen, 
  Check, 
  Share2 
} from 'lucide-react';
import { FIO_AUDIO_CATALOG, FIO_CATEGORIES, FioTrack } from '../data/fioAudio';

interface FioPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FioPlayerModal: React.FC<FioPlayerModalProps> = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTrack, setCurrentTrack] = useState<FioTrack>(FIO_AUDIO_CATALOG[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(FIO_AUDIO_CATALOG[0].durationSeconds);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.pause();
      audio.src = '';
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  // Handle track playback
  const handlePlayTrack = (track: FioTrack) => {
    if (!audioRef.current) return;

    if (currentTrack.id === track.id) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
      return;
    }

    // New track
    setCurrentTrack(track);
    setCurrentTime(0);
    setDuration(track.durationSeconds);
    audioRef.current.src = track.audioUrl;
    audioRef.current.playbackRate = playbackRate;
    audioRef.current.muted = isMuted;
    audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  };

  const handleSeek = (seconds: number) => {
    if (!audioRef.current) return;
    const clamped = Math.max(0, Math.min(duration, seconds));
    audioRef.current.currentTime = clamped;
    setCurrentTime(clamped);
  };

  const handleToggleMute = () => {
    if (!audioRef.current) return;
    const next = !isMuted;
    setIsMuted(next);
    audioRef.current.muted = next;
  };

  const handleChangeRate = (rate: number) => {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  const handleShare = (track: FioTrack, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `Listen to "${track.title}" from ${track.showTitle} by ${track.creator} on Fio (Fio.fm Catholic Streaming).`;
    navigator.clipboard.writeText(text);
    setCopiedId(track.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Close and pause when modal closes
  useEffect(() => {
    if (!isOpen && audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredTracks = FIO_AUDIO_CATALOG.filter(track => {
    if (selectedCategory !== 'all' && track.category !== selectedCategory) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        track.title.toLowerCase().includes(q) ||
        track.showTitle.toLowerCase().includes(q) ||
        track.creator.toLowerCase().includes(q) ||
        track.summary.toLowerCase().includes(q) ||
        track.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-stone-900 border border-amber-500/40 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-stone-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-stone-950 via-amber-950/80 to-stone-950 border-b border-amber-500/30 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-amber-500/25 text-amber-300 border border-amber-400/40 shadow-inner">
              <Headphones className="w-5 h-5 text-amber-300" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-cinzel text-base sm:text-lg font-bold text-white tracking-wide">
                  Fio Catholic Audio Player
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-cinzel font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  Fio.fm
                </span>
              </div>
              <p className="text-xs text-stone-300 font-serif">
                Select and stream faithful Catholic talks, Gregorian chant, and classic audiobooks
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://play.fio.fm"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/35 border border-amber-400/40 text-amber-200 hover:text-white font-cinzel text-xs font-bold transition-all"
              title="Launch official Fio web player app"
            >
              <span>play.fio.fm</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Close Fio Player"
              aria-label="Close Fio Player"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Active Track Playing Banner */}
        <div className="p-4 sm:p-5 bg-black/60 border-b border-amber-500/20 shrink-0 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 min-w-0">
              <img 
                src={currentTrack.coverUrl} 
                alt={currentTrack.title}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover border border-amber-500/40 shadow-md shrink-0"
              />
              <div className="min-w-0 space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-cinzel font-bold uppercase tracking-wider text-amber-400">
                    NOW PLAYING • {currentTrack.showTitle}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-200 border border-amber-400/30 font-cinzel">
                    {currentTrack.categoryLabel}
                  </span>
                </div>
                <h4 className="text-sm sm:text-base font-serif font-bold text-white truncate max-w-lg">
                  {currentTrack.title}
                </h4>
                <p className="text-xs text-stone-300 font-serif truncate">
                  {currentTrack.creator} • {currentTrack.durationFormatted}
                </p>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center gap-3 self-center sm:self-auto shrink-0">
              {/* 15s Rewind */}
              <button
                onClick={() => handleSeek(currentTime - 15)}
                className="p-2 rounded-lg text-stone-300 hover:text-amber-300 hover:bg-white/10 transition-colors cursor-pointer"
                title="Rewind 15 seconds"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Master Play/Pause */}
              <button
                onClick={() => handlePlayTrack(currentTrack)}
                className="w-11 h-11 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 flex items-center justify-center shadow-lg hover:scale-105 transition-all cursor-pointer"
                title={isPlaying ? 'Pause Track' : 'Play Track'}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </button>

              {/* 30s Forward */}
              <button
                onClick={() => handleSeek(currentTime + 30)}
                className="p-2 rounded-lg text-stone-300 hover:text-amber-300 hover:bg-white/10 transition-colors cursor-pointer"
                title="Fast forward 30 seconds"
              >
                <RotateCw className="w-4 h-4" />
              </button>

              {/* Rate */}
              <button
                onClick={() => handleChangeRate(playbackRate === 1.0 ? 1.25 : playbackRate === 1.25 ? 1.5 : 1.0)}
                className="px-2 py-1 rounded-lg text-xs font-mono font-medium text-stone-300 hover:text-amber-300 border border-stone-700 hover:border-amber-500/40 transition-colors cursor-pointer"
                title="Change speed"
              >
                {playbackRate}x
              </button>

              {/* Mute */}
              <button
                onClick={handleToggleMute}
                className="p-2 rounded-lg text-stone-400 hover:text-stone-200 transition-colors cursor-pointer"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Scrubber Bar */}
          <div className="flex items-center gap-3 text-[11px] font-mono text-stone-400">
            <span className="w-10 text-right">{formatTime(currentTime)}</span>
            <div 
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                handleSeek(pos * duration);
              }}
              className="flex-1 h-1.5 bg-stone-800 rounded-full cursor-pointer relative overflow-hidden group"
            >
              <div 
                className="absolute top-0 bottom-0 left-0 bg-amber-400 rounded-full group-hover:bg-amber-300 transition-all"
                style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
              />
            </div>
            <span className="w-10">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Catalog Browser Controls */}
        <div className="p-4 bg-stone-950/70 border-b border-stone-800 space-y-3 shrink-0">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search Fio podcasts, audiobooks, Gregorian chant, or speakers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs sm:text-sm pl-9 pr-8 py-2 rounded-xl bg-stone-900 border border-stone-700 focus:outline-none focus:border-amber-500 font-serif text-stone-200 placeholder-stone-500"
            />
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-stone-400 hover:text-stone-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {FIO_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-medium transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                    : 'bg-stone-800 hover:bg-stone-700 text-stone-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tracks List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3">
          <div className="text-xs text-stone-400 font-serif flex items-center justify-between pb-1">
            <span>Choose a podcast, chant, or audiobook to play:</span>
            <span>{filteredTracks.length} available</span>
          </div>

          {filteredTracks.map(track => {
            const isThisTrackPlaying = currentTrack.id === track.id && isPlaying;
            const isThisTrackSelected = currentTrack.id === track.id;

            return (
              <div
                key={track.id}
                onClick={() => handlePlayTrack(track)}
                className={`p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                  isThisTrackSelected
                    ? 'bg-amber-950/40 border-amber-500/60 shadow-md ring-1 ring-amber-500/30'
                    : 'bg-stone-800/60 hover:bg-stone-800 border-stone-700/80 hover:border-amber-500/40'
                }`}
              >
                <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                  {/* Thumbnail + Play Badge */}
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden shadow-xs shrink-0 border border-stone-700">
                    <img 
                      src={track.coverUrl} 
                      alt={track.title} 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 flex items-center justify-center transition-all ${
                      isThisTrackPlaying ? 'bg-amber-500/90 text-stone-950' : 'bg-black/40 text-white hover:bg-amber-500/80 hover:text-stone-950'
                    }`}>
                      {isThisTrackPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                    </div>
                  </div>

                  {/* Title & Metadata */}
                  <div className="space-y-0.5 min-w-0 text-left">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-cinzel font-bold text-amber-400 uppercase tracking-wider">
                        {track.showTitle}
                      </span>
                      <span className="text-stone-500 text-xs">•</span>
                      <span className="text-[11px] text-stone-400 font-serif">
                        {track.creator}
                      </span>
                    </div>

                    <h5 className="text-xs sm:text-sm font-serif font-bold text-white group-hover:text-amber-200 line-clamp-1">
                      {track.title}
                    </h5>

                    <p className="text-[11px] text-stone-400 font-serif line-clamp-1">
                      {track.summary}
                    </p>
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <span className="text-[11px] font-mono text-stone-400">
                    {track.durationFormatted}
                  </span>

                  <button
                    onClick={(e) => handleShare(track, e)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    title="Share track info"
                  >
                    {copiedId === track.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  </button>

                  <a
                    href={track.fioUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-500/15 hover:bg-amber-500/30 border border-amber-500/30 text-amber-300 font-cinzel text-[11px] font-semibold transition-colors"
                    title="Open on Fio.fm"
                  >
                    <span>Fio.fm</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer info bar */}
        <div className="p-3 bg-stone-950 border-t border-stone-800 text-center flex flex-wrap items-center justify-between px-4 text-xs text-stone-400 font-serif shrink-0">
          <span>Fio unites over 1,000 trusted Catholic creators, audiobooks, and sacred music.</span>
          <a
            href="https://fio.fm"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:underline inline-flex items-center gap-1"
          >
            Visit fio.fm <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
