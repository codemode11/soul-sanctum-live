import React, { useEffect, useRef, useState, useCallback } from 'react';
import Hls from 'hls.js';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  PictureInPicture2,
  RectangleHorizontal,
  Loader2,
  AlertCircle,
  RefreshCw,
  MonitorPlay,
} from 'lucide-react';
import { CatholicCinemaTitle, formatVideoClock } from '../data/catholicCinema';

interface CatholicCinemaPlayerProps {
  film: CatholicCinemaTitle;
  resolvedVideoUrl?: string | null;
  isResolvingStream?: boolean;
  posterFallbackSrc: string;
  initialTimeSeconds?: number;
  autoPlayOnLoad?: boolean;
  isTheaterMode: boolean;
  onToggleTheaterMode: () => void;
  onPlaybackStart: () => void;
  onProgressUpdate: (filmId: string, currentTime: number, duration: number) => void;
}

const SPEED_OPTIONS = [0.75, 1, 1.25, 1.5, 2] as const;

export const CatholicCinemaPlayer: React.FC<CatholicCinemaPlayerProps> = ({
  film,
  resolvedVideoUrl,
  isResolvingStream = false,
  posterFallbackSrc,
  initialTimeSeconds = 0,
  autoPlayOnLoad = false,
  isTheaterMode,
  onToggleTheaterMode,
  onPlaybackStart,
  onProgressUpdate,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);
  const hideControlsTimerRef = useRef<number | null>(null);
  const lastSavedSecRef = useRef<number>(0);
  const appliedResumeRef = useRef<boolean>(false);

  const activeDirectUrl = resolvedVideoUrl || film.videoUrl || null;
  const hasEmbedFallback = Boolean(film.embedUrl);

  const [playerMode, setPlayerMode] = useState<'direct' | 'embed'>(() =>
    activeDirectUrl ? 'direct' : hasEmbedFallback ? 'embed' : 'direct'
  );
  const [posterSrc, setPosterSrc] = useState<string>(film.posterUrl || posterFallbackSrc);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [hasStartedOnce, setHasStartedOnce] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [bufferedEnd, setBufferedEnd] = useState(0);
  const [volume, setVolume] = useState(0.9);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [hoverTime, setHoverTime] = useState<{ ratio: number; seconds: number } | null>(null);
  const [reloadNonce, setReloadNonce] = useState(0);

  // Reset state whenever the selected film or resolved direct URL changes
  useEffect(() => {
    setPosterSrc(film.posterUrl || posterFallbackSrc);
    setVideoError(null);
    setIsPlaying(false);
    setIsBuffering(false);
    setHasStartedOnce(false);
    setCurrentTime(0);
    setDuration(0);
    setBufferedEnd(0);
    appliedResumeRef.current = false;
    lastSavedSecRef.current = 0;
    setControlsVisible(true);

    if (activeDirectUrl) {
      setPlayerMode('direct');
    } else if (hasEmbedFallback) {
      setPlayerMode('embed');
    }
  }, [film.id, film.posterUrl, posterFallbackSrc, activeDirectUrl, hasEmbedFallback]);

  // Attach direct MP4 or HLS stream to <video> element
  useEffect(() => {
    if (playerMode !== 'direct' || !activeDirectUrl) return;
    const videoEl = videoRef.current;
    if (!videoEl) return;

    setVideoError(null);

    if (hlsRef.current) {
      try {
        hlsRef.current.destroy();
      } catch {
        // ignore
      }
      hlsRef.current = null;
    }

    const isHls = /\.m3u8(\?|$)/i.test(activeDirectUrl);
    if (isHls && Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true });
      hlsRef.current = hls;
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          setVideoError('Unable to load the video stream directly.');
        }
      });
      hls.loadSource(activeDirectUrl);
      hls.attachMedia(videoEl);
    } else {
      videoEl.src = activeDirectUrl;
      videoEl.load();
    }

    videoEl.volume = isMuted ? 0 : volume;
    videoEl.playbackRate = playbackRate;

    if (autoPlayOnLoad) {
      onPlaybackStart();
      videoEl.play().catch(() => {
        // Autoplay may be blocked by browser policy; user can click play
      });
    }

    return () => {
      if (hlsRef.current) {
        try {
          hlsRef.current.destroy();
        } catch {
          // ignore
        }
        hlsRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerMode, activeDirectUrl, film.id, reloadNonce]);

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const scheduleHideControls = useCallback(() => {
    if (hideControlsTimerRef.current) {
      window.clearTimeout(hideControlsTimerRef.current);
    }
    setControlsVisible(true);
    if (isPlaying) {
      hideControlsTimerRef.current = window.setTimeout(() => {
        setControlsVisible(false);
      }, 2800);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying) {
      setControlsVisible(true);
      if (hideControlsTimerRef.current) {
        window.clearTimeout(hideControlsTimerRef.current);
      }
    } else {
      scheduleHideControls();
    }
    return () => {
      if (hideControlsTimerRef.current) {
        window.clearTimeout(hideControlsTimerRef.current);
      }
    };
  }, [isPlaying, scheduleHideControls]);

  const togglePlay = useCallback(() => {
    const videoEl = videoRef.current;
    if (!videoEl || playerMode !== 'direct') return;
    if (videoEl.paused || videoEl.ended) {
      onPlaybackStart();
      videoEl.play().catch(() => {
        setVideoError('Playback could not start. Try Retry or switch to the Archive Embed player.');
      });
    } else {
      videoEl.pause();
    }
  }, [onPlaybackStart, playerMode]);

  const seekBy = useCallback((deltaSeconds: number) => {
    const videoEl = videoRef.current;
    if (!videoEl || !Number.isFinite(videoEl.duration)) return;
    const next = Math.max(0, Math.min(videoEl.duration, videoEl.currentTime + deltaSeconds));
    videoEl.currentTime = next;
    setCurrentTime(next);
  }, []);

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const videoEl = videoRef.current;
    if (!videoEl || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const targetSec = ratio * duration;
    videoEl.currentTime = targetSec;
    setCurrentTime(targetSec);
  };

  const handleTimelineMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setHoverTime({ ratio, seconds: ratio * duration });
  };

  const handleVolumeSlider = (nextVol: number) => {
    const clamped = Math.max(0, Math.min(1, nextVol));
    setVolume(clamped);
    setIsMuted(clamped === 0);
    if (videoRef.current) {
      videoRef.current.volume = clamped;
      videoRef.current.muted = clamped === 0;
    }
  };

  const handleToggleMute = useCallback(() => {
    const videoEl = videoRef.current;
    setIsMuted(prev => {
      const next = !prev;
      if (videoEl) {
        videoEl.muted = next;
        if (!next && volume === 0) {
          setVolume(0.75);
          videoEl.volume = 0.75;
        }
      }
      return next;
    });
  }, [volume]);

  const cyclePlaybackRate = () => {
    const currentIdx = SPEED_OPTIONS.indexOf(playbackRate as (typeof SPEED_OPTIONS)[number]);
    const nextRate = SPEED_OPTIONS[(currentIdx + 1) % SPEED_OPTIONS.length];
    setPlaybackRate(nextRate);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextRate;
    }
  };

  const handleToggleFullscreen = useCallback(async () => {
    const el = containerRef.current;
    if (!el) return;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await el.requestFullscreen();
      }
    } catch {
      // Fullscreen may be restricted inside some iframes
    }
  }, []);

  const handleTogglePiP = async () => {
    const videoEl = videoRef.current as (HTMLVideoElement & {
      requestPictureInPicture?: () => Promise<unknown>;
    }) | null;
    if (!videoEl || !document.pictureInPictureEnabled) return;
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (videoEl.requestPictureInPicture) {
        await videoEl.requestPictureInPicture();
      }
    } catch {
      // ignore PiP restrictions
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (playerMode !== 'direct') return;
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

    switch (e.key.toLowerCase()) {
      case ' ':
      case 'k':
        e.preventDefault();
        togglePlay();
        break;
      case 'arrowleft':
      case 'j':
        e.preventDefault();
        seekBy(-15);
        break;
      case 'arrowright':
      case 'l':
        e.preventDefault();
        seekBy(15);
        break;
      case 'm':
        e.preventDefault();
        handleToggleMute();
        break;
      case 'f':
        e.preventDefault();
        handleToggleFullscreen();
        break;
      default:
        break;
    }
  };

  const playedPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;
  const bufferedPercent = duration > 0 ? Math.min(100, (bufferedEnd / duration) * 100) : 0;
  const canPiP = typeof document !== 'undefined' && Boolean(document.pictureInPictureEnabled);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseMove={scheduleHideControls}
      onMouseLeave={() => {
        if (isPlaying) setControlsVisible(false);
      }}
      className="relative w-full bg-black rounded-t-xl overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-amber-400 select-none group"
    >
      {/* 16:9 Cinema Stage */}
      <div className={`relative w-full bg-black ${isTheaterMode ? 'aspect-[21/10] max-h-[74vh]' : 'aspect-video'}`}>
        {isResolvingStream && !activeDirectUrl && !hasEmbedFallback ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#140D09] text-stone-200">
            <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
            <p className="text-xs font-cinzel tracking-wider uppercase text-amber-200/90">
              Preparing Archival Print...
            </p>
          </div>
        ) : playerMode === 'embed' && film.embedUrl ? (
          <iframe
            key={`${film.id}-embed`}
            src={film.embedUrl}
            title={film.title}
            className="w-full h-full border-0 bg-black"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={() => onPlaybackStart()}
          />
        ) : (
          <>
            <video
              ref={videoRef}
              playsInline
              preload="metadata"
              poster={posterSrc}
              onClick={togglePlay}
              onDoubleClick={handleToggleFullscreen}
              onLoadedMetadata={e => {
                const v = e.currentTarget;
                if (Number.isFinite(v.duration) && v.duration > 0) {
                  setDuration(v.duration);
                  if (
                    !appliedResumeRef.current &&
                    initialTimeSeconds > 15 &&
                    initialTimeSeconds < v.duration - 20
                  ) {
                    v.currentTime = initialTimeSeconds;
                    setCurrentTime(initialTimeSeconds);
                    appliedResumeRef.current = true;
                  }
                }
              }}
              onTimeUpdate={e => {
                const v = e.currentTarget;
                setCurrentTime(v.currentTime);
                if (v.buffered.length > 0) {
                  setBufferedEnd(v.buffered.end(v.buffered.length - 1));
                }
                if (
                  Number.isFinite(v.duration) &&
                  v.duration > 30 &&
                  Math.abs(v.currentTime - lastSavedSecRef.current) >= 5
                ) {
                  lastSavedSecRef.current = v.currentTime;
                  onProgressUpdate(film.id, v.currentTime, v.duration);
                }
              }}
              onPlay={() => {
                setIsPlaying(true);
                setHasStartedOnce(true);
                setIsBuffering(false);
                setVideoError(null);
                onPlaybackStart();
              }}
              onPause={() => {
                setIsPlaying(false);
                const v = videoRef.current;
                if (v && Number.isFinite(v.duration) && v.duration > 30) {
                  onProgressUpdate(film.id, v.currentTime, v.duration);
                }
              }}
              onWaiting={() => setIsBuffering(true)}
              onPlaying={() => setIsBuffering(false)}
              onCanPlay={() => setIsBuffering(false)}
              onEnded={() => {
                setIsPlaying(false);
                setControlsVisible(true);
                if (duration > 30) {
                  onProgressUpdate(film.id, duration, duration);
                }
              }}
              onError={() => {
                setIsBuffering(false);
                setIsPlaying(false);
                setVideoError(
                  'Direct MP4 stream could not load in this browser. You can retry or switch to the Archive Embed player.'
                );
              }}
              className="w-full h-full object-contain bg-black cursor-pointer"
            />

            {/* Hidden preloader to swap broken Archive.org poster to bespoke 35mm fallback still */}
            {posterSrc !== posterFallbackSrc && (
              <img
                src={posterSrc}
                alt=""
                aria-hidden="true"
                referrerPolicy="no-referrer"
                onError={() => setPosterSrc(posterFallbackSrc)}
                className="hidden"
              />
            )}

            {/* Idle Poster Overlay + Centered Play CTA before first playback */}
            {!hasStartedOnce && !isBuffering && !videoError && (
              <div
                onClick={togglePlay}
                className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/80 via-black/35 to-black/25 cursor-pointer transition-opacity"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-amber-500/95 hover:bg-amber-400 text-stone-950 flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.65)] transition-transform duration-200 hover:scale-105">
                  <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
                </div>
                <p className="mt-3 font-cinzel text-xs sm:text-sm font-bold tracking-wider text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                  {initialTimeSeconds > 15
                    ? `Resume Screening (${formatVideoClock(initialTimeSeconds)})`
                    : 'Begin Screening'}
                </p>
              </div>
            )}

            {/* Buffering Spinner */}
            {isBuffering && !videoError && (
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="w-12 h-12 rounded-full bg-black/75 border border-amber-400/40 flex items-center justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-amber-400" />
                </div>
              </div>
            )}

            {/* Error Overlay with One-Click Retry or Embed Fallback */}
            {videoError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#140D09]/92 px-6 text-center gap-3">
                <AlertCircle className="w-8 h-8 text-amber-400" />
                <p className="text-sm font-serif text-stone-200 max-w-md">{videoError}</p>
                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      setVideoError(null);
                      setReloadNonce(n => n + 1);
                    }}
                    className="h-9 px-4 rounded-md bg-amber-500 hover:bg-amber-400 text-stone-950 font-cinzel text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Retry Direct Stream</span>
                  </button>
                  {hasEmbedFallback && (
                    <button
                      type="button"
                      onClick={() => {
                        setVideoError(null);
                        setPlayerMode('embed');
                      }}
                      className="h-9 px-4 rounded-md bg-white/10 hover:bg-white/20 text-white border border-white/20 font-cinzel text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <MonitorPlay className="w-3.5 h-3.5" />
                      <span>Use Archive Player</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Custom Cinema Transport Bar */}
            {!videoError && (
              <div
                className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent pt-10 pb-3 px-3.5 sm:px-5 transition-opacity duration-200 ${
                  controlsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                {/* Scrub Timeline */}
                <div
                  role="slider"
                  aria-label="Video timeline"
                  aria-valuemin={0}
                  aria-valuemax={Math.round(duration || 0)}
                  aria-valuenow={Math.round(currentTime)}
                  onClick={handleTimelineClick}
                  onMouseMove={handleTimelineMove}
                  onMouseLeave={() => setHoverTime(null)}
                  className="relative h-5 flex items-center cursor-pointer group/bar"
                >
                  {hoverTime && (
                    <div
                      className="pointer-events-none absolute -top-6 -translate-x-1/2 px-1.5 py-0.5 rounded bg-stone-950/95 border border-amber-500/40 text-[10px] font-mono tabular-nums text-amber-200"
                      style={{ left: `${Math.min(95, Math.max(5, hoverTime.ratio * 100))}%` }}
                    >
                      {formatVideoClock(hoverTime.seconds)}
                    </div>
                  )}
                  <div className="w-full h-1.5 group-hover/bar:h-2 transition-all bg-white/20 rounded-full overflow-hidden relative">
                    <div
                      className="absolute inset-y-0 left-0 bg-white/35 rounded-full"
                      style={{ width: `${bufferedPercent}%` }}
                    />
                    <div
                      className="absolute inset-y-0 left-0 bg-amber-400 rounded-full"
                      style={{ width: `${playedPercent}%` }}
                    />
                  </div>
                  <div
                    className="pointer-events-none absolute w-3 h-3 rounded-full bg-amber-400 shadow border border-stone-950 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-opacity"
                    style={{ left: `${playedPercent}%` }}
                  />
                </div>

                {/* Controls Row */}
                <div className="mt-1 flex items-center justify-between gap-2 text-stone-100">
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="w-8 h-8 rounded-md hover:bg-white/15 flex items-center justify-center text-white cursor-pointer transition-colors"
                      aria-label={isPlaying ? 'Pause' : 'Play'}
                      title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 fill-current" />
                      ) : (
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => seekBy(-15)}
                      className="w-8 h-8 rounded-md hover:bg-white/15 flex items-center justify-center text-stone-200 hover:text-white cursor-pointer transition-colors"
                      aria-label="Rewind 15 seconds"
                      title="Back 15s (J)"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => seekBy(15)}
                      className="w-8 h-8 rounded-md hover:bg-white/15 flex items-center justify-center text-stone-200 hover:text-white cursor-pointer transition-colors"
                      aria-label="Forward 15 seconds"
                      title="Forward 15s (L)"
                    >
                      <RotateCw className="w-4 h-4" />
                    </button>

                    {/* Volume */}
                    <div className="hidden sm:flex items-center gap-1.5 ml-1">
                      <button
                        type="button"
                        onClick={handleToggleMute}
                        className="w-8 h-8 rounded-md hover:bg-white/15 flex items-center justify-center text-stone-200 hover:text-white cursor-pointer transition-colors"
                        aria-label={isMuted ? 'Unmute' : 'Mute'}
                        title="Mute (M)"
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
                        onChange={e => handleVolumeSlider(parseFloat(e.target.value))}
                        aria-label="Video volume"
                        className="w-16 md:w-20 accent-amber-400 cursor-pointer"
                      />
                    </div>

                    {/* Tabular Timecode */}
                    <span className="ml-1.5 text-[11px] sm:text-xs font-mono tabular-nums text-stone-300 whitespace-nowrap">
                      {formatVideoClock(currentTime)}
                      <span className="text-stone-500 mx-1">/</span>
                      {duration > 0
                        ? formatVideoClock(duration)
                        : film.durationMinutes
                          ? formatVideoClock(film.durationMinutes * 60)
                          : '--:--'}
                    </span>
                  </div>

                  {/* Right Controls */}
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <button
                      type="button"
                      onClick={cyclePlaybackRate}
                      className="h-7 px-2 rounded-md hover:bg-white/15 text-[11px] font-mono tabular-nums font-semibold text-stone-200 hover:text-amber-300 cursor-pointer transition-colors whitespace-nowrap"
                      title="Playback Speed"
                    >
                      {playbackRate}x
                    </button>

                    {canPiP && (
                      <button
                        type="button"
                        onClick={handleTogglePiP}
                        className="hidden sm:flex w-8 h-8 rounded-md hover:bg-white/15 items-center justify-center text-stone-200 hover:text-white cursor-pointer transition-colors"
                        aria-label="Picture in Picture"
                        title="Picture-in-Picture"
                      >
                        <PictureInPicture2 className="w-4 h-4" />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={onToggleTheaterMode}
                      className={`hidden md:flex w-8 h-8 rounded-md hover:bg-white/15 items-center justify-center cursor-pointer transition-colors ${
                        isTheaterMode ? 'text-amber-300' : 'text-stone-200 hover:text-white'
                      }`}
                      aria-label={isTheaterMode ? 'Exit theater mode' : 'Theater mode'}
                      title={isTheaterMode ? 'Standard View' : 'Theater Mode'}
                    >
                      <RectangleHorizontal className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={handleToggleFullscreen}
                      className="w-8 h-8 rounded-md hover:bg-white/15 flex items-center justify-center text-stone-200 hover:text-white cursor-pointer transition-colors"
                      aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                      title="Fullscreen (F)"
                    >
                      {isFullscreen ? (
                        <Minimize className="w-4 h-4" />
                      ) : (
                        <Maximize className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Subtle Player Mode Switcher Strip (only when both direct MP4 and Archive embed exist) */}
      {activeDirectUrl && hasEmbedFallback && (
        <div className="px-4 py-2 bg-[#140D09] border-t border-[#8B5A2B]/30 flex flex-wrap items-center justify-between gap-2 text-[11px] text-stone-400">
          <span className="font-serif">
            {playerMode === 'direct'
              ? 'Sanctum Cinema Player · Keyboard: Space, J/L (±15s), M, F'
              : 'Archive Embedded Player · Switch back anytime for custom speed & resume'}
          </span>
          <div className="inline-flex items-center gap-1 bg-black/40 p-0.5 rounded-md border border-white/10">
            <button
              type="button"
              onClick={() => {
                setVideoError(null);
                setPlayerMode('direct');
              }}
              className={`px-2.5 py-1 rounded text-[11px] font-cinzel font-semibold cursor-pointer transition-colors whitespace-nowrap ${
                playerMode === 'direct'
                  ? 'bg-amber-500 text-stone-950'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Cinema Player
            </button>
            <button
              type="button"
              onClick={() => {
                setIsPlaying(false);
                setPlayerMode('embed');
              }}
              className={`px-2.5 py-1 rounded text-[11px] font-cinzel font-semibold cursor-pointer transition-colors whitespace-nowrap ${
                playerMode === 'embed'
                  ? 'bg-amber-500 text-stone-950'
                  : 'text-stone-300 hover:text-white'
              }`}
            >
              Archive Embed
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
