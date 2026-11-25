import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  X,
  Radio,
  Clock,
  RefreshCw,
  ExternalLink,
  Loader2,
  Star,
} from 'lucide-react';
import { CatholicRadioStation, isSafeHttpUrl } from '../data/catholicRadio';

export type RadioPlaybackStatus = 'idle' | 'connecting' | 'playing' | 'paused' | 'error';

interface CatholicRadioPlayerBarProps {
  station: CatholicRadioStation | null;
  status: RadioPlaybackStatus;
  errorMessage?: string | null;
  volume: number;
  isMuted: boolean;
  isFavorite: boolean;
  onTogglePlay: () => void;
  onRetry: () => void;
  onVolumeChange: (nextVolume: number) => void;
  onToggleMute: () => void;
  onToggleFavorite: (station: CatholicRadioStation) => void;
  onOpenRadioView: () => void;
  onClose: () => void;
}

export const CatholicRadioPlayerBar: React.FC<CatholicRadioPlayerBarProps> = ({
  station,
  status,
  errorMessage,
  volume,
  isMuted,
  isFavorite,
  onTogglePlay,
  onRetry,
  onVolumeChange,
  onToggleMute,
  onToggleFavorite,
  onOpenRadioView,
  onClose,
}) => {
  const [showSleepMenu, setShowSleepMenu] = useState(false);
  const [sleepMinutes, setSleepMinutes] = useState<number | null>(null);
  const [sleepSecondsLeft, setSleepSecondsLeft] = useState<number | null>(null);

  useEffect(() => {
    if (!sleepMinutes) {
      setSleepSecondsLeft(null);
      return;
    }
    setSleepSecondsLeft(sleepMinutes * 60);
    const interval = window.setInterval(() => {
      setSleepSecondsLeft(prev => {
        if (prev === null || prev <= 1) {
          window.clearInterval(interval);
          if (status === 'playing' || status === 'connecting') {
            onTogglePlay();
          }
          setSleepMinutes(null);
          return null;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(interval);
  }, [sleepMinutes, status, onTogglePlay]);

  if (!station) return null;

  const isPlaying = status === 'playing';
  const isConnecting = status === 'connecting';
  const isError = status === 'error';
  const sleepOptions = [15, 30, 45, 60];

  return (
    <div className="fixed bottom-[calc(65px+env(safe-area-inset-bottom))] md:bottom-0 left-0 right-0 z-50 bg-[#140C07]/96 backdrop-blur-xl border-t border-amber-500/35 text-stone-100 shadow-[0_-10px_35px_rgba(0,0,0,0.82)] transition-all">
      {/* Subtle Live Signal Hairline */}
      <div className="h-0.5 w-full bg-stone-800 overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            isPlaying
              ? 'w-full bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600'
              : isConnecting
                ? 'w-1/2 bg-amber-400/75 animate-pulse'
                : isError
                  ? 'w-full bg-red-500/75'
                  : 'w-0'
          }`}
        />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-3 sm:gap-5">
        {/* Left: Station Identity */}
        <div className="flex items-center gap-3 min-w-0 flex-1 max-w-[54%] sm:max-w-md">
          <button
            type="button"
            onClick={onOpenRadioView}
            className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-[#24160E] border border-amber-500/40 flex items-center justify-center shrink-0 hover:border-amber-400 transition-colors cursor-pointer"
            title="Open Global Catholic Radio"
            aria-label="Open Global Catholic Radio"
          >
            {isConnecting ? (
              <Loader2 className="w-4.5 h-4.5 text-amber-300 animate-spin" />
            ) : (
              <Radio className="w-4.5 h-4.5 text-amber-300" />
            )}
          </button>

          <div className="min-w-0 text-left">
            <div className="flex items-center gap-2 text-[10.5px] font-cinzel font-semibold uppercase tracking-wider text-amber-300/95">
              {isPlaying && (
                <span className="inline-flex items-center gap-1.5 text-emerald-300 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Live</span>
                </span>
              )}
              {isConnecting && <span className="text-amber-300 shrink-0">Connecting</span>}
              {isError && <span className="text-red-300 shrink-0">Interrupted</span>}
              {status === 'paused' && <span className="text-stone-400 shrink-0">Paused</span>}
              <span className="text-stone-500" aria-hidden="true">·</span>
              <span className="truncate text-stone-300">{station.country}</span>
              {sleepSecondsLeft !== null && (
                <>
                  <span className="hidden md:inline text-stone-500" aria-hidden="true">·</span>
                  <span className="hidden md:inline text-amber-300 tabular-nums shrink-0">
                    {Math.ceil(sleepSecondsLeft / 60)}m sleep
                  </span>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={onOpenRadioView}
              className="block w-full text-left text-xs sm:text-sm font-serif font-semibold text-stone-100 hover:text-amber-200 truncate transition-colors cursor-pointer"
              title={station.name}
            >
              {station.name}
            </button>

            {isError && errorMessage && (
              <p className="text-[11px] text-red-200/90 truncate">{errorMessage}</p>
            )}
          </div>
        </div>

        {/* Center: Play / Pause & Retry */}
        <div className="flex items-center gap-2 shrink-0">
          {isError ? (
            <button
              type="button"
              onClick={onRetry}
              className="h-9 px-3.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-cinzel text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onTogglePlay}
              disabled={isConnecting}
              className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-400 disabled:opacity-70 text-stone-950 flex items-center justify-center shadow-md transition-colors cursor-pointer shrink-0"
              aria-label={isPlaying ? 'Pause live radio' : 'Play live radio'}
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isConnecting ? (
                <Loader2 className="w-4.5 h-4.5 animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-4.5 h-4.5 fill-current" />
              ) : (
                <Play className="w-4.5 h-4.5 fill-current ml-0.5" />
              )}
            </button>
          )}
        </div>

        {/* Right: Volume, Sleep Timer, Favorite, Official Site & Close */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <div className="hidden sm:flex items-center gap-2 mr-1">
            <button
              type="button"
              onClick={onToggleMute}
              className="p-1.5 rounded-md text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label={isMuted ? 'Unmute radio' : 'Mute radio'}
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-stone-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-amber-300" />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={isMuted ? 0 : volume}
              onChange={e => onVolumeChange(parseFloat(e.target.value))}
              aria-label="Radio volume"
              className="w-20 accent-amber-400 cursor-pointer"
            />
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowSleepMenu(prev => !prev)}
              className={`h-8 px-2 rounded-md text-xs font-cinzel font-semibold inline-flex items-center gap-1 border transition-colors cursor-pointer whitespace-nowrap ${
                sleepMinutes
                  ? 'bg-amber-900/60 text-amber-200 border-amber-500/50'
                  : 'bg-transparent text-stone-300 border-stone-700/80 hover:text-white hover:border-amber-500/40'
              }`}
              title="Sleep timer"
              aria-label="Sleep timer"
            >
              <Clock className="w-3.5 h-3.5" />
              <span className="hidden md:inline">
                {sleepMinutes ? `${sleepMinutes}m` : 'Sleep'}
              </span>
            </button>
            {showSleepMenu && (
              <div className="absolute bottom-full right-0 mb-2 w-36 rounded-lg bg-[#1E130C] border border-amber-500/35 shadow-xl py-1 z-50">
                <div className="px-3 py-1 text-[10px] font-cinzel uppercase tracking-wider text-stone-400 border-b border-stone-800">
                  Sleep Timer
                </div>
                {sleepOptions.map(mins => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => {
                      setSleepMinutes(mins);
                      setShowSleepMenu(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-white/10 transition-colors cursor-pointer ${
                      sleepMinutes === mins ? 'text-amber-300 font-semibold' : 'text-stone-200'
                    }`}
                  >
                    {mins} minutes
                  </button>
                ))}
                {sleepMinutes && (
                  <button
                    type="button"
                    onClick={() => {
                      setSleepMinutes(null);
                      setShowSleepMenu(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-red-300 hover:bg-white/10 border-t border-stone-800 cursor-pointer"
                  >
                    Turn Off
                  </button>
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => onToggleFavorite(station)}
            className="p-1.5 rounded-md text-stone-300 hover:text-amber-300 hover:bg-white/10 transition-colors cursor-pointer"
            aria-label={isFavorite ? 'Remove from favorites' : 'Save station to favorites'}
            title={isFavorite ? 'Saved to favorites' : 'Save to favorites'}
          >
            <Star
              className={`w-4 h-4 ${isFavorite ? 'fill-amber-400 text-amber-400' : ''}`}
            />
          </button>

          {isSafeHttpUrl(station.homepageUrl) && (
            <a
              href={station.homepageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex p-1.5 rounded-md text-stone-300 hover:text-amber-200 hover:bg-white/10 transition-colors"
              title="Open official station website"
              aria-label="Open official station website"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-md text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close radio player"
            title="Stop and close radio player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
