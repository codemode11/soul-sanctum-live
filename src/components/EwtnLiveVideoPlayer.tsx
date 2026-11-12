import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { Play, Pause, Volume2, VolumeX, Maximize2, RefreshCw, ExternalLink, Tv } from 'lucide-react';

interface EwtnLiveVideoPlayerProps {
  streamUrl?: string;
  fallbackStreamUrl?: string;
  embedUrl?: string;
  title: string;
  subtitle?: string;
  portalUrl?: string;
  autoPlay?: boolean;
}

export const EwtnLiveVideoPlayer: React.FC<EwtnLiveVideoPlayerProps> = ({
  streamUrl,
  fallbackStreamUrl,
  embedUrl,
  title,
  subtitle,
  portalUrl = 'https://www.ewtn.com/live/tv',
  autoPlay = true
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  const [activeHlsUrl, setActiveHlsUrl] = useState<string | undefined>(streamUrl);
  const [triedFallback, setTriedFallback] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [reloadNonce, setReloadNonce] = useState(0);

  // Sync active stream URL when channel changes
  useEffect(() => {
    setActiveHlsUrl(streamUrl);
    setTriedFallback(false);
    setHasError(false);
    setIsLoading(true);
  }, [streamUrl, fallbackStreamUrl, embedUrl]);

  useEffect(() => {
    if (!activeHlsUrl) {
      setIsLoading(false);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    setIsLoading(true);
    setHasError(false);

    // Cleanup previous HLS instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    const attemptPlay = () => {
      if (!autoPlay) {
        setIsLoading(false);
        return;
      }
      video
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
        })
        .catch(() => {
          // Browsers may block unmuted autoplay; retry muted so the live video starts immediately
          video.muted = true;
          setIsMuted(true);
          video
            .play()
            .then(() => {
              setIsPlaying(true);
              setIsLoading(false);
            })
            .catch(() => {
              setIsPlaying(false);
              setIsLoading(false);
            });
        });
    };

    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 60
      });
      hlsRef.current = hls;

      hls.loadSource(activeHlsUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoading(false);
        attemptPlay();
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              if (fallbackStreamUrl && !triedFallback && activeHlsUrl !== fallbackStreamUrl) {
                setTriedFallback(true);
                setActiveHlsUrl(fallbackStreamUrl);
              } else {
                hls.startLoad();
              }
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              if (fallbackStreamUrl && !triedFallback && activeHlsUrl !== fallbackStreamUrl) {
                setTriedFallback(true);
                setActiveHlsUrl(fallbackStreamUrl);
              } else {
                setHasError(true);
                setIsLoading(false);
                hls.destroy();
              }
              break;
          }
        }
      });

      return () => {
        hls.destroy();
        hlsRef.current = null;
      };
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native HLS support (Safari / iOS)
      video.src = activeHlsUrl;
      const handleLoadedMetadata = () => {
        setIsLoading(false);
        attemptPlay();
      };
      const handleError = () => {
        if (fallbackStreamUrl && !triedFallback && activeHlsUrl !== fallbackStreamUrl) {
          setTriedFallback(true);
          setActiveHlsUrl(fallbackStreamUrl);
        } else {
          setHasError(true);
          setIsLoading(false);
        }
      };
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('error', handleError);
      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('error', handleError);
      };
    } else {
      setHasError(true);
      setIsLoading(false);
    }
  }, [activeHlsUrl, fallbackStreamUrl, triedFallback, autoPlay, reloadNonce]);

  const handleTogglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleToggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.requestFullscreen) {
      video.requestFullscreen().catch(() => {});
    }
  };

  // If no HLS stream is active (or HLS failed and embedUrl fallback is available), render the live iframe player
  if ((!activeHlsUrl || hasError) && embedUrl) {
    return (
      <div className="relative aspect-video w-full bg-black overflow-hidden">
        <iframe
          key={`${embedUrl}-${reloadNonce}`}
          src={embedUrl}
          title={title}
          className="w-full h-full border-0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full bg-black group select-none overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full object-contain bg-black cursor-pointer"
        playsInline
        onClick={handleTogglePlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onVolumeChange={() => {
          if (videoRef.current) {
            setIsMuted(videoRef.current.muted);
          }
        }}
      />

      {/* Top-Left Live Broadcast Badge */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-2 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-red-700/90 text-white text-[11px] font-cinzel font-bold uppercase tracking-wider shadow-md border border-red-400/50">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          <span>LIVE 24/7 HD</span>
        </span>
        {subtitle && (
          <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-md bg-black/75 text-amber-200 text-[11px] font-serif border border-amber-500/30 backdrop-blur-xs">
            {subtitle}
          </span>
        )}
      </div>

      {/* Muted Autoplay Unmute Prompt */}
      {isPlaying && isMuted && !hasError && (
        <button
          type="button"
          onClick={handleToggleMute}
          className="absolute top-3 right-3 z-20 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 font-cinzel text-xs font-bold flex items-center gap-1.5 shadow-lg cursor-pointer transition-all"
        >
          <VolumeX className="w-3.5 h-3.5" />
          <span>Click to Unmute Audio</span>
        </button>
      )}

      {/* Loading Spinner */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/70 text-amber-200 gap-2 pointer-events-none">
          <RefreshCw className="w-7 h-7 animate-spin text-amber-400" />
          <span className="text-xs font-cinzel tracking-wider uppercase text-amber-200">
            Connecting to EWTN Live Broadcast…
          </span>
        </div>
      )}

      {/* Paused Center Play Button */}
      {!isLoading && !isPlaying && !hasError && (
        <button
          type="button"
          onClick={handleTogglePlay}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/45 hover:bg-black/35 transition-colors cursor-pointer gap-2"
          aria-label={`Play ${title}`}
        >
          <div className="w-16 h-16 rounded-full bg-amber-500/90 hover:bg-amber-400 text-stone-950 flex items-center justify-center shadow-xl transition-transform hover:scale-105">
            <Play className="w-7 h-7 fill-current ml-0.5" />
          </div>
          <span className="px-3 py-1 rounded-md bg-black/80 text-amber-100 text-xs font-cinzel font-bold tracking-wider uppercase border border-amber-500/40">
            Click to Watch Live Stream
          </span>
        </button>
      )}

      {/* Error State Fallback */}
      {hasError && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-stone-950/95 p-6 text-center gap-3">
          <Tv className="w-8 h-8 text-amber-400" />
          <div className="space-y-1 max-w-md">
            <h4 className="font-cinzel text-sm sm:text-base font-bold text-white">
              {title}
            </h4>
            <p className="text-xs font-serif text-stone-300">
              The live HLS feed encountered a connection interruption. You can retry the stream or open the official EWTN Live Portal directly.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
            <button
              type="button"
              onClick={() => {
                setTriedFallback(false);
                setActiveHlsUrl(streamUrl);
                setReloadNonce(n => n + 1);
              }}
              className="px-3.5 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-100 border border-stone-600 text-xs font-cinzel font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              <span>Retry Live Stream</span>
            </button>
            <a
              href={portalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-cinzel font-bold flex items-center gap-1.5"
            >
              <span>Watch on EWTN.com</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}

      {/* Bottom Control Bar */}
      {!hasError && (
        <div className="absolute bottom-0 inset-x-0 z-20 px-3.5 py-2.5 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex items-center justify-between gap-3 opacity-95 group-hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleTogglePlay}
              className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
              aria-label={isPlaying ? 'Pause live stream' : 'Play live stream'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={handleToggleMute}
              className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
              aria-label={isMuted ? 'Unmute live stream' : 'Mute live stream'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-amber-400" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <span className="text-xs font-cinzel font-bold text-stone-200 truncate max-w-[200px] sm:max-w-xs md:max-w-md">
              {title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setReloadNonce(n => n + 1)}
              className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white cursor-pointer transition-colors"
              title="Resync to Live Edge"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleFullscreen}
              className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white cursor-pointer transition-colors"
              title="Fullscreen"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
