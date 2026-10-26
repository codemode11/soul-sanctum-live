import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  X, 
  Maximize2, 
  Clock, 
  Radio, 
  Sparkles, 
  ExternalLink, 
  Share2, 
  Check, 
  Bookmark,
  Volume1
} from 'lucide-react';
import { PodcastEpisode } from '../types';
import { SacredReader } from '../utils/speech';

interface PodcastPlayerBarProps {
  episode: PodcastEpisode | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onClose: () => void;
  onOpenDetails: (episode: PodcastEpisode) => void;
  onSeek: (seconds: number) => void;
  currentTime: number;
  duration: number;
  playbackRate: number;
  onChangePlaybackRate: (rate: number) => void;
  audioMode: 'stream' | 'narration';
  onToggleAudioMode: () => void;
}

export const PodcastPlayerBar: React.FC<PodcastPlayerBarProps> = ({
  episode,
  isPlaying,
  onTogglePlay,
  onClose,
  onOpenDetails,
  onSeek,
  currentTime,
  duration,
  playbackRate,
  onChangePlaybackRate,
  audioMode,
  onToggleAudioMode
}) => {
  const [volume, setVolume] = useState<number>(0.9);
  const [isMuted, setIsMuted] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showSleepMenu, setShowSleepMenu] = useState(false);
  const [sleepTimerMinutes, setSleepTimerMinutes] = useState<number | null>(null);
  const [sleepTimeRemaining, setSleepTimeRemaining] = useState<number | null>(null);

  // Sleep timer countdown effect
  useEffect(() => {
    if (!sleepTimerMinutes) {
      setSleepTimeRemaining(null);
      return;
    }

    setSleepTimeRemaining(sleepTimerMinutes * 60);
    const interval = setInterval(() => {
      setSleepTimeRemaining(prev => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          if (isPlaying) {
            onTogglePlay(); // pause
          }
          setSleepTimerMinutes(null);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [sleepTimerMinutes, isPlaying, onTogglePlay]);

  if (!episode) return null;

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const speedOptions = [0.75, 1.0, 1.25, 1.5, 1.75, 2.0];
  const sleepOptions = [15, 30, 45, 60];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    onSeek(val);
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#120A05]/95 backdrop-blur-xl border-t border-amber-500/30 text-stone-100 shadow-[0_-10px_35px_rgba(0,0,0,0.85)] transition-all">
      {/* Top Scrubber Progress Line */}
      <div className="relative w-full h-1.5 bg-stone-800 cursor-pointer group">
        <div 
          className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 transition-all duration-100"
          style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
        />
        <input 
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime || 0}
          onChange={handleSliderChange}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
          aria-label="Audio scrubber"
        />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* Left: Artwork and Episode Metadata */}
        <div className="flex items-center gap-3 min-w-0 max-w-[42%] sm:max-w-md">
          <div 
            onClick={() => onOpenDetails(episode)}
            className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-xl overflow-hidden shrink-0 border border-amber-500/40 cursor-pointer shadow-md group"
            title="Click to view full episode study notes and transcript"
          >
            <img 
              src={episode.podcastCoverUrl} 
              alt={episode.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors flex items-center justify-center">
              <Radio className="w-4 h-4 text-amber-300 drop-shadow-md" />
            </div>
          </div>

          <div className="min-w-0 text-left">
            <div className="flex items-center gap-2">
              <span className="text-[10px] sm:text-xs font-semibold text-amber-400 truncate uppercase tracking-wider font-cinzel">
                {episode.podcastTitle}
              </span>
              {sleepTimeRemaining !== null && (
                <span className="hidden md:inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <Clock className="w-2.5 h-2.5" />
                  {Math.ceil(sleepTimeRemaining / 60)}m
                </span>
              )}
            </div>
            <h4 
              onClick={() => onOpenDetails(episode)}
              className="text-xs sm:text-sm font-serif font-medium text-stone-100 truncate cursor-pointer hover:text-amber-200 transition-colors"
              title={episode.title}
            >
              {episode.title}
            </h4>
            <div className="text-[10px] text-stone-400 truncate">
              {episode.podcastHost} • {episode.durationFormatted}
            </div>
          </div>
        </div>

        {/* Center: Playback Controls and Scrubber Times */}
        <div className="flex flex-col items-center gap-1 flex-1 max-w-xl">
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Rewind 15s */}
            <button
              onClick={() => onSeek(Math.max(0, currentTime - 15))}
              className="p-1.5 sm:p-2 rounded-full text-stone-300 hover:text-amber-200 hover:bg-white/10 transition-colors cursor-pointer"
              title="Rewind 15 seconds"
              aria-label="Rewind 15 seconds"
            >
              <RotateCcw className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={onTogglePlay}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 flex items-center justify-center shadow-[0_0_18px_rgba(251,191,36,0.5)] hover:scale-105 transition-all cursor-pointer shrink-0"
              title={isPlaying ? 'Pause' : 'Play Catholic Podcast'}
              aria-label={isPlaying ? 'Pause' : 'Play Catholic Podcast'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>

            {/* Forward 30s */}
            <button
              onClick={() => onSeek(Math.min(duration, currentTime + 30))}
              className="p-1.5 sm:p-2 rounded-full text-stone-300 hover:text-amber-200 hover:bg-white/10 transition-colors cursor-pointer"
              title="Fast forward 30 seconds"
              aria-label="Fast forward 30 seconds"
            >
              <RotateCw className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>

            {/* Audio Mode Switcher (Stream vs Clear Reflection Lector) */}
            <button
              onClick={onToggleAudioMode}
              className={`hidden sm:inline-flex items-center gap-1.5 text-[11px] px-2.5 py-1 rounded-full border transition-all cursor-pointer font-serif ${
                audioMode === 'narration'
                  ? 'bg-amber-500/25 border-amber-400 text-amber-200 shadow-xs'
                  : 'bg-stone-900 border-stone-700 text-stone-400 hover:text-stone-200'
              }`}
              title="Toggle between Episode Broadcast stream and Sacred Reflection Audio"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>{audioMode === 'narration' ? 'Sacred Narration' : 'Show Audio'}</span>
            </button>

          </div>

          {/* Time Scrubber Display */}
          <div className="w-full hidden md:flex items-center justify-between text-[11px] text-stone-400 font-mono px-1">
            <span>{formatTime(currentTime)}</span>
            <div className="flex-1 mx-3 h-1 bg-stone-800 rounded-full relative overflow-hidden">
              <div 
                className="absolute top-0 bottom-0 left-0 bg-amber-400 rounded-full"
                style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
              />
            </div>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Right: Rate, Sleep, Fullscreen, and Dismiss */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          
          {/* Speed Selector */}
          <div className="relative">
            <button
              onClick={() => {
                setShowSpeedMenu(!showSpeedMenu);
                setShowSleepMenu(false);
              }}
              className="px-2 py-1 rounded-lg text-[11px] sm:text-xs font-mono font-medium text-stone-300 hover:text-amber-200 hover:bg-white/10 border border-stone-700 hover:border-amber-500/50 transition-all cursor-pointer"
              title="Playback speed"
            >
              {playbackRate}x
            </button>

            {showSpeedMenu && (
              <div className="absolute bottom-full right-0 mb-2 py-1.5 bg-stone-900 border border-amber-500/40 rounded-xl shadow-2xl z-50 flex flex-col min-w-[70px]">
                {speedOptions.map(rate => (
                  <button
                    key={rate}
                    onClick={() => {
                      onChangePlaybackRate(rate);
                      setShowSpeedMenu(false);
                    }}
                    className={`px-3 py-1.5 text-xs font-mono text-left hover:bg-amber-500/20 cursor-pointer ${
                      playbackRate === rate ? 'text-amber-300 font-bold bg-amber-500/10' : 'text-stone-300'
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sleep Timer */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => {
                setShowSleepMenu(!showSleepMenu);
                setShowSpeedMenu(false);
              }}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                sleepTimerMinutes
                  ? 'border-amber-400 text-amber-300 bg-amber-500/20'
                  : 'border-stone-700 text-stone-400 hover:text-stone-200 hover:bg-white/10'
              }`}
              title="Sleep timer"
              aria-label="Sleep timer"
            >
              <Clock className="w-4 h-4" />
            </button>

            {showSleepMenu && (
              <div className="absolute bottom-full right-0 mb-2 py-1.5 bg-stone-900 border border-amber-500/40 rounded-xl shadow-2xl z-50 flex flex-col min-w-[110px]">
                <div className="px-3 py-1 text-[10px] font-bold text-amber-400 font-cinzel uppercase border-b border-stone-800">
                  Sleep Timer
                </div>
                {sleepOptions.map(mins => (
                  <button
                    key={mins}
                    onClick={() => {
                      setSleepTimerMinutes(mins);
                      setShowSleepMenu(false);
                    }}
                    className={`px-3 py-1.5 text-xs text-left hover:bg-amber-500/20 cursor-pointer ${
                      sleepTimerMinutes === mins ? 'text-amber-300 font-bold bg-amber-500/10' : 'text-stone-300'
                    }`}
                  >
                    {mins} minutes
                  </button>
                ))}
                {sleepTimerMinutes !== null && (
                  <button
                    onClick={() => {
                      setSleepTimerMinutes(null);
                      setShowSleepMenu(false);
                    }}
                    className="px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10 text-left border-t border-stone-800 cursor-pointer"
                  >
                    Turn off timer
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Details / Fullscreen Modal */}
          <button
            onClick={() => onOpenDetails(episode)}
            className="p-1.5 sm:p-2 rounded-lg text-stone-300 hover:text-amber-200 hover:bg-white/10 transition-colors cursor-pointer"
            title="Expand episode notes and study guide"
            aria-label="Expand episode notes"
          >
            <Maximize2 className="w-4 h-4" />
          </button>

          {/* Close Player */}
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-lg text-stone-400 hover:text-stone-200 hover:bg-white/10 transition-colors cursor-pointer"
            title="Close audio player"
            aria-label="Close audio player"
          >
            <X className="w-4 h-4" />
          </button>

        </div>

      </div>
    </div>
  );
};
