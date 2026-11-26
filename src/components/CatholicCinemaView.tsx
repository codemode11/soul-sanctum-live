import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  Play,
  Bookmark,
  BookmarkCheck,
  Search,
  ExternalLink,
  Film,
  Loader2,
  X,
  Link2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Trash2,
} from 'lucide-react';
import {
  CURATED_CATHOLIC_CINEMA,
  CATHOLIC_CINEMA_TABS,
  CINEMA_CATEGORY_LABELS,
  CatholicCinemaTitle,
  CatholicCinemaFilterTab,
  formatRuntime,
  formatVideoClock,
  isSafeExternalLink,
  parseCustomCatholicVideoUrl,
} from '../data/catholicCinema';
import { CatholicCinemaPlayer } from './CatholicCinemaPlayer';
import cinemaHeroBannerImg from '../assets/images/catholic_cinema_hero_banner_1795615928734.jpg';
import saintsFallbackStill from '../assets/images/cinema_saints_feature_still_1795615930394.jpg';
import vaticanFallbackStill from '../assets/images/cinema_vatican_doc_still_1795615930744.jpg';
import historyFallbackStill from '../assets/images/cinema_sacred_history_still_1795615932071.jpg';

interface WatchProgressRecord {
  currentTime: number;
  duration: number;
  updatedAt: number;
}

interface CatholicCinemaViewProps {
  onPlaybackStart: () => void;
}

const WATCHLIST_IDS_KEY = 'sanctum_cinema_watchlist_ids_v1';
const WATCHLIST_MAP_KEY = 'sanctum_cinema_watchlist_map_v1';
const PROGRESS_MAP_KEY = 'sanctum_cinema_progress_v1';

const ARCHIVE_QUICK_TOPICS = [
  { label: 'Featured Archive', value: '' },
  { label: 'Vatican & Popes', value: 'Vatican' },
  { label: 'Saints', value: 'Saint' },
  { label: 'Our Lady of Fatima', value: 'Fatima' },
  { label: 'Lourdes', value: 'Lourdes' },
  { label: 'Archbishop Fulton Sheen', value: 'Fulton Sheen' },
  { label: 'Cathedrals', value: 'Cathedral' },
  { label: 'Monasteries', value: 'Abbey' },
];

function getFallbackStill(category: CatholicCinemaTitle['fallbackPosterCategory']): string {
  switch (category) {
    case 'vatican':
      return vaticanFallbackStill;
    case 'saints':
      return saintsFallbackStill;
    default:
      return historyFallbackStill;
  }
}

const CinemaPosterImage: React.FC<{
  src?: string;
  fallbackSrc: string;
  alt: string;
}> = ({ src, fallbackSrc, alt }) => {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);

  useEffect(() => {
    setImgSrc(src || fallbackSrc);
  }, [src, fallbackSrc]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => {
        if (imgSrc !== fallbackSrc) setImgSrc(fallbackSrc);
      }}
      className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
    />
  );
};

export const CatholicCinemaView: React.FC<CatholicCinemaViewProps> = ({ onPlaybackStart }) => {
  const playerSectionRef = useRef<HTMLElement | null>(null);

  const [selectedFilm, setSelectedFilm] = useState<CatholicCinemaTitle>(CURATED_CATHOLIC_CINEMA[0]);
  const [autoPlayTrigger, setAutoPlayTrigger] = useState(false);
  const [isTheaterMode, setIsTheaterMode] = useState(false);

  const [activeTab, setActiveTab] = useState<CatholicCinemaFilterTab['id']>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Watchlist persisted locally
  const [watchlistIds, setWatchlistIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(WATCHLIST_IDS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) return parsed.filter((id): id is string => typeof id === 'string');
      }
    } catch {
      // ignore
    }
    return ['secret-access-the-vatican', 'the-song-of-bernadette-1943', 'the-flowers-of-st-francis-1950'];
  });

  const [watchlistMap, setWatchlistMap] = useState<Record<string, CatholicCinemaTitle>>(() => {
    try {
      const raw = localStorage.getItem(WATCHLIST_MAP_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') return parsed as Record<string, CatholicCinemaTitle>;
      }
    } catch {
      // ignore
    }
    return {};
  });

  const [progressMap, setProgressMap] = useState<Record<string, WatchProgressRecord>>(() => {
    try {
      const raw = localStorage.getItem(PROGRESS_MAP_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') return parsed as Record<string, WatchProgressRecord>;
      }
    } catch {
      // ignore
    }
    return {};
  });

  // Live Archive.org Search state
  const [archiveTopic, setArchiveTopic] = useState('');
  const [archiveItems, setArchiveItems] = useState<CatholicCinemaTitle[]>([]);
  const [isLoadingArchive, setIsLoadingArchive] = useState(false);
  const [archiveError, setArchiveError] = useState<string | null>(null);
  const [hasLoadedArchive, setHasLoadedArchive] = useState(false);

  // Resolved direct MP4 cache for live-archive titles
  const [resolvedMp4Map, setResolvedMp4Map] = useState<Record<string, string | null>>({});
  const [isResolvingSelected, setIsResolvingSelected] = useState(false);

  // Custom URL Screening drawer
  const [showCustomUrlPanel, setShowCustomUrlPanel] = useState(false);
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [customTitleInput, setCustomTitleInput] = useState('');
  const [customUrlError, setCustomUrlError] = useState<string | null>(null);

  const watchlistSet = useMemo(() => new Set(watchlistIds), [watchlistIds]);

  const handleToggleWatchlist = useCallback((film: CatholicCinemaTitle) => {
    setWatchlistIds(prev => {
      const exists = prev.includes(film.id);
      const next = exists ? prev.filter(id => id !== film.id) : [film.id, ...prev];
      try {
        localStorage.setItem(WATCHLIST_IDS_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
    setWatchlistMap(prev => {
      const next = { ...prev, [film.id]: film };
      try {
        localStorage.setItem(WATCHLIST_MAP_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const handleProgressUpdate = useCallback(
    (filmId: string, currentTime: number, duration: number) => {
      setProgressMap(prev => {
        const next: Record<string, WatchProgressRecord> = {
          ...prev,
          [filmId]: { currentTime, duration, updatedAt: Date.now() },
        };
        try {
          localStorage.setItem(PROGRESS_MAP_KEY, JSON.stringify(next));
        } catch {
          // ignore
        }
        return next;
      });
    },
    []
  );

  const handleClearProgress = useCallback((filmId: string) => {
    setProgressMap(prev => {
      const next = { ...prev };
      delete next[filmId];
      try {
        localStorage.setItem(PROGRESS_MAP_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  // Resolve direct MP4 URL whenever a live-archive item without a preset videoUrl is selected
  useEffect(() => {
    if (selectedFilm.videoUrl || !selectedFilm.archiveIdentifier) {
      setIsResolvingSelected(false);
      return;
    }
    const id = selectedFilm.archiveIdentifier;
    if (id in resolvedMp4Map) {
      setIsResolvingSelected(false);
      return;
    }

    let cancelled = false;
    setIsResolvingSelected(true);
    fetch(`/api/catholic-cinema/resolve/${encodeURIComponent(id)}`)
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (cancelled) return;
        const mp4 = typeof data?.mp4Url === 'string' ? data.mp4Url : null;
        setResolvedMp4Map(prev => ({ ...prev, [id]: mp4 }));
      })
      .catch(() => {
        if (!cancelled) {
          setResolvedMp4Map(prev => ({ ...prev, [id]: null }));
        }
      })
      .finally(() => {
        if (!cancelled) setIsResolvingSelected(false);
      });

    return () => {
      cancelled = true;
    };
  }, [selectedFilm, resolvedMp4Map]);

  const fetchLiveArchive = useCallback(async (q: string) => {
    setIsLoadingArchive(true);
    setArchiveError(null);
    try {
      const params = new URLSearchParams({ limit: '18' });
      if (q.trim()) params.set('q', q.trim());
      const res = await fetch(`/api/catholic-cinema/archive?${params.toString()}`);
      if (!res.ok) throw new Error('Archive unreachable');
      const data = await res.json();
      const rawItems = Array.isArray(data?.items) ? (data.items as CatholicCinemaTitle[]) : [];
      setArchiveItems(rawItems);
      setHasLoadedArchive(true);
    } catch {
      setArchiveError(
        'Could not reach the live public archive right now. All curated documentaries and classic movies remain ready to watch.'
      );
    } finally {
      setIsLoadingArchive(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab !== 'live-archive') return;
    const effectiveQuery = searchQuery.trim() || archiveTopic;
    const timer = window.setTimeout(() => {
      fetchLiveArchive(effectiveQuery);
    }, hasLoadedArchive ? 320 : 0);
    return () => window.clearTimeout(timer);
  }, [activeTab, searchQuery, archiveTopic, fetchLiveArchive, hasLoadedArchive]);

  const handleSelectFilm = useCallback((film: CatholicCinemaTitle, shouldAutoPlay: boolean = true) => {
    setSelectedFilm(film);
    setAutoPlayTrigger(shouldAutoPlay);
    if (playerSectionRef.current) {
      playerSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleLoadCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    setCustomUrlError(null);
    const parsed = parseCustomCatholicVideoUrl(customUrlInput, customTitleInput);
    if (!parsed) {
      setCustomUrlError(
        'Enter a valid HTTPS YouTube link, Internet Archive film URL, or direct .mp4 / .m3u8 stream link.'
      );
      return;
    }
    const customFilm: CatholicCinemaTitle = {
      id: `custom-${Date.now()}`,
      title: parsed.title,
      type: 'documentary',
      category: 'documentaries',
      year: 'Custom',
      directorOrProducer: 'External Catholic Screening',
      language: 'Original Audio',
      country: 'Online',
      synopsis: 'Custom Catholic documentary or film loaded into the Soul Sanctum Screening Room.',
      videoUrl: parsed.videoUrl,
      embedUrl: parsed.embedUrl,
      archiveIdentifier: parsed.archiveIdentifier,
      youtubeId: parsed.youtubeId,
      sourcePageUrl: parsed.sourcePageUrl,
      fallbackPosterCategory: 'vatican',
      source: 'custom',
    };
    setCustomUrlInput('');
    setCustomTitleInput('');
    setShowCustomUrlPanel(false);
    handleSelectFilm(customFilm, true);
  };

  const watchlistFilms = useMemo(() => {
    const byId = new Map(CURATED_CATHOLIC_CINEMA.map(f => [f.id, f]));
    return watchlistIds
      .map(id => byId.get(id) || watchlistMap[id])
      .filter((f): f is CatholicCinemaTitle => Boolean(f));
  }, [watchlistIds, watchlistMap]);

  const continueWatchingList = useMemo(() => {
    const byId = new Map<string, CatholicCinemaTitle>();
    CURATED_CATHOLIC_CINEMA.forEach(f => byId.set(f.id, f));
    Object.values(watchlistMap).forEach(f => byId.set(f.id, f));
    archiveItems.forEach(f => byId.set(f.id, f));

    return Object.entries(progressMap)
      .filter(([, rec]) => rec.duration > 60 && rec.currentTime > 15 && rec.currentTime / rec.duration < 0.96)
      .sort((a, b) => b[1].updatedAt - a[1].updatedAt)
      .slice(0, 4)
      .map(([id, rec]) => {
        const film = byId.get(id);
        return film ? { film, progress: rec } : null;
      })
      .filter((entry): entry is { film: CatholicCinemaTitle; progress: WatchProgressRecord } => Boolean(entry));
  }, [progressMap, watchlistMap, archiveItems]);

  const displayedCatalog = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (activeTab === 'live-archive') {
      return archiveItems;
    }
    const base =
      activeTab === 'watchlist'
        ? watchlistFilms
        : activeTab === 'all'
          ? CURATED_CATHOLIC_CINEMA
          : CURATED_CATHOLIC_CINEMA.filter(f => f.category === activeTab);

    if (!q) return base;
    return base.filter(f =>
      `${f.title} ${f.subtitle || ''} ${f.directorOrProducer} ${f.year} ${f.language} ${f.country} ${f.synopsis} ${(f.themes || []).join(' ')}`
        .toLowerCase()
        .includes(q)
    );
  }, [activeTab, searchQuery, archiveItems, watchlistFilms]);

  // Previous / Next screening controls within curated list
  const selectedCuratedIndex = CURATED_CATHOLIC_CINEMA.findIndex(f => f.id === selectedFilm.id);
  const handleStepFilm = (direction: -1 | 1) => {
    const baseIdx = selectedCuratedIndex >= 0 ? selectedCuratedIndex : 0;
    const nextIdx =
      (baseIdx + direction + CURATED_CATHOLIC_CINEMA.length) % CURATED_CATHOLIC_CINEMA.length;
    handleSelectFilm(CURATED_CATHOLIC_CINEMA[nextIdx], true);
  };

  const selectedResolvedMp4 = selectedFilm.archiveIdentifier
    ? resolvedMp4Map[selectedFilm.archiveIdentifier]
    : undefined;
  const selectedProgress = progressMap[selectedFilm.id];
  const documentaryCount = CURATED_CATHOLIC_CINEMA.filter(f => f.type === 'documentary').length;
  const movieCount = CURATED_CATHOLIC_CINEMA.filter(f => f.type === 'movie').length;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20">
      {/* Top Editorial Banner */}
      <div className="sanctum-top-banner relative isolate overflow-hidden px-5 pt-4 pb-4 sm:px-6 min-h-[196px] sm:h-[212px] bg-[#1C120C] rounded-xl text-stone-100 shadow-md border border-[#8B5A2B]/40 flex flex-col justify-between">
        {/* Right-Side Cinema Projector & Reels Artwork (40% width) */}
        <div
          className="pointer-events-none select-none absolute inset-y-0 right-0 w-[40%] overflow-hidden"
          aria-hidden="true"
        >
          <img
            src={cinemaHeroBannerImg}
            alt="Archival matte-black and bronze 35mm film projector with metallic reels on a walnut library desk"
            decoding="async"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center brightness-[1.03] contrast-[1.03]"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.58) 14%, black 32%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.58) 14%, black 32%)',
            }}
          />
        </div>

        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1C120C]/55 via-transparent to-[#1C120C]/15"
          aria-hidden="true"
        />

        <div className="relative z-10 space-y-1 my-auto max-w-[60%] pr-3 sm:pr-4">
          <p className="font-cinzel text-[10.5px] sm:text-[11px] font-bold uppercase tracking-widest text-amber-300/95 drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">
            Sacred Screening Room · Documentaries &amp; Classic Film
          </p>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wide leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            Catholic Cinema
          </h2>
          <p className="text-[11.5px] sm:text-xs text-stone-200 font-serif leading-snug drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">
            Watch full-length Catholic documentaries, lives of the Saints, Vatican chronicles, and timeless classics in an uninterrupted theater player.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3 mt-auto pt-1.5 max-w-[60%] pr-3 sm:pr-4">
          <button
            type="button"
            onClick={() => handleSelectFilm(selectedFilm, true)}
            className="h-8 inline-flex items-center gap-2 px-3.5 rounded-md bg-amber-500 hover:bg-amber-400 text-stone-950 font-cinzel text-xs font-bold tracking-wide shadow-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <Play className="w-3.5 h-3.5 fill-current shrink-0" />
            <span>Start Screening</span>
          </button>

          <span className="hidden sm:inline text-xs font-serif text-stone-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)] truncate">
            {documentaryCount} Documentaries · {movieCount} Classic Movies · Live Archive
          </span>
        </div>
      </div>

      {/* Active Screening Room + Curatorial Program Notes */}
      <section
        ref={playerSectionRef}
        className="rounded-xl bg-[#1C120C] text-stone-100 border border-[#8B5A2B]/40 shadow-md overflow-hidden"
      >
        <CatholicCinemaPlayer
          film={selectedFilm}
          resolvedVideoUrl={selectedResolvedMp4}
          isResolvingStream={isResolvingSelected}
          posterFallbackSrc={getFallbackStill(selectedFilm.fallbackPosterCategory)}
          initialTimeSeconds={selectedProgress?.currentTime || 0}
          autoPlayOnLoad={autoPlayTrigger}
          isTheaterMode={isTheaterMode}
          onToggleTheaterMode={() => setIsTheaterMode(prev => !prev)}
          onPlaybackStart={onPlaybackStart}
          onProgressUpdate={handleProgressUpdate}
        />

        {/* Curatorial Program Notes */}
        <div className="p-4 sm:p-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-1.5 min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs font-cinzel tracking-wider uppercase text-amber-300/90">
                <span>{selectedFilm.type === 'documentary' ? 'Documentary' : 'Feature Film'}</span>
                <span className="text-stone-500" aria-hidden="true">·</span>
                <span className="tabular-nums text-stone-300">{selectedFilm.year}</span>
                {selectedFilm.durationMinutes && (
                  <>
                    <span className="text-stone-500" aria-hidden="true">·</span>
                    <span className="tabular-nums text-stone-300">
                      {formatRuntime(selectedFilm.durationMinutes)}
                    </span>
                  </>
                )}
                <span className="text-stone-500" aria-hidden="true">·</span>
                <span className="text-stone-300">{selectedFilm.language}</span>
              </div>

              <h3 className="font-cinzel text-lg sm:text-2xl font-bold text-white leading-snug">
                {selectedFilm.title}
              </h3>

              <p className="text-xs sm:text-sm font-serif text-stone-400">
                {selectedFilm.directorOrProducer}
                {selectedFilm.country ? ` · ${selectedFilm.country}` : ''}
              </p>
            </div>

            {/* Film Actions */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <div className="inline-flex items-center rounded-lg border border-white/10 bg-white/5 overflow-hidden">
                <button
                  type="button"
                  onClick={() => handleStepFilm(-1)}
                  className="h-9 px-2.5 text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Previous screening"
                  title="Previous Film"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="w-px h-4 bg-white/10" aria-hidden="true" />
                <button
                  type="button"
                  onClick={() => handleStepFilm(1)}
                  className="h-9 px-2.5 text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Next screening"
                  title="Next Film"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => handleToggleWatchlist(selectedFilm)}
                className={`h-9 px-3.5 rounded-lg border text-xs font-cinzel font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                  watchlistSet.has(selectedFilm.id)
                    ? 'bg-amber-500/20 border-amber-400/60 text-amber-200'
                    : 'bg-white/5 hover:bg-white/10 border-white/10 text-stone-200'
                }`}
              >
                {watchlistSet.has(selectedFilm.id) ? (
                  <BookmarkCheck className="w-3.5 h-3.5 text-amber-300" />
                ) : (
                  <Bookmark className="w-3.5 h-3.5" />
                )}
                <span>{watchlistSet.has(selectedFilm.id) ? 'In Watchlist' : 'Watchlist'}</span>
              </button>

              {isSafeExternalLink(selectedFilm.sourcePageUrl) && (
                <a
                  href={selectedFilm.sourcePageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-cinzel font-semibold text-amber-200 inline-flex items-center gap-1.5 transition-colors whitespace-nowrap"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Archive Record</span>
                </a>
              )}
            </div>
          </div>

          <p className="text-sm font-serif text-stone-200/95 leading-relaxed max-w-3xl">
            {selectedFilm.synopsis}
          </p>

          {selectedFilm.reflectionNote && (
            <div className="py-3 border-y border-[#8B5A2B]/30">
              <p className="text-xs sm:text-sm font-serif italic text-amber-100/90 leading-relaxed max-w-3xl">
                {selectedFilm.reflectionNote}
              </p>
            </div>
          )}

          {selectedFilm.themes && selectedFilm.themes.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-serif text-stone-400">
              <span className="font-cinzel uppercase tracking-wider text-[10.5px] text-amber-300/80 mr-1">
                Themes:
              </span>
              {selectedFilm.themes.map((theme, idx) => (
                <React.Fragment key={theme}>
                  {idx > 0 && <span aria-hidden="true" className="text-stone-600">·</span>}
                  <span>{theme}</span>
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Continue Watching Strip */}
      {continueWatchingList.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-cinzel text-sm font-bold uppercase tracking-wider text-stone-800">
              Continue Watching
            </h3>
            <span className="text-xs font-serif text-stone-500">
              Saved automatically on this device
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {continueWatchingList.map(({ film, progress }) => {
              const pct = Math.min(98, Math.max(4, Math.round((progress.currentTime / progress.duration) * 100)));
              return (
                <div
                  key={film.id}
                  className="group rounded-xl bg-white/85 border border-stone-300/80 hover:border-amber-700/50 overflow-hidden shadow-sm transition-colors flex flex-col"
                >
                  <button
                    type="button"
                    onClick={() => handleSelectFilm(film, true)}
                    className="relative aspect-video w-full bg-stone-950 overflow-hidden text-left cursor-pointer"
                  >
                    <CinemaPosterImage
                      src={film.posterUrl}
                      fallbackSrc={getFallbackStill(film.fallbackPosterCategory)}
                      alt={film.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[11px] font-mono tabular-nums text-amber-200">
                      <span className="inline-flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatVideoClock(progress.currentTime)}
                      </span>
                      <span>{pct}%</span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20">
                      <div className="h-full bg-amber-400" style={{ width: `${pct}%` }} />
                    </div>
                  </button>
                  <div className="px-3 py-2.5 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => handleSelectFilm(film, true)}
                      className="font-cinzel text-xs font-bold text-stone-900 hover:text-amber-800 truncate text-left cursor-pointer"
                    >
                      {film.title}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleClearProgress(film.id)}
                      className="p-1 text-stone-400 hover:text-stone-700 cursor-pointer shrink-0"
                      aria-label={`Remove ${film.title} from continue watching`}
                      title="Clear progress"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Filter Bar, Search & Custom Video Link Drawer */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={
                activeTab === 'live-archive'
                  ? 'Search Internet Archive Catholic films (e.g., Lourdes, Sistine, Sheen)...'
                  : 'Filter by title, saint, director, or theme...'
              }
              className="w-full h-10 pl-9 pr-9 rounded-lg bg-white/85 border border-stone-300/90 text-sm text-stone-900 placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-700/40 focus:border-amber-700 transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700 cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <span className="text-xs font-serif text-stone-600 tabular-nums whitespace-nowrap">
              {displayedCatalog.length} {displayedCatalog.length === 1 ? 'title' : 'titles'}
            </span>
            <button
              type="button"
              onClick={() => {
                setShowCustomUrlPanel(prev => !prev);
                setCustomUrlError(null);
              }}
              className={`h-9 px-3.5 rounded-lg border text-xs font-cinzel font-semibold inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                showCustomUrlPanel
                  ? 'bg-[#1C120C] text-amber-200 border-[#8B5A2B]'
                  : 'bg-white/85 hover:bg-white text-stone-800 border-stone-300/90'
              }`}
            >
              <Link2 className="w-3.5 h-3.5" />
              <span>Watch Video URL</span>
            </button>
          </div>
        </div>

        {/* Optional Custom HTTPS Video URL Screening Form */}
        {showCustomUrlPanel && (
          <form
            onSubmit={handleLoadCustomUrl}
            className="rounded-xl bg-white/90 border border-stone-300 p-4 space-y-3 shadow-sm"
          >
            <div className="flex items-center justify-between gap-2">
              <p className="font-cinzel text-xs font-bold uppercase tracking-wider text-stone-800">
                Screen a Catholic Documentary or Film Link
              </p>
              <button
                type="button"
                onClick={() => setShowCustomUrlPanel(false)}
                className="text-stone-400 hover:text-stone-700 cursor-pointer"
                aria-label="Close custom link form"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs font-serif text-stone-600">
              Paste any HTTPS YouTube link, Internet Archive film URL, or direct .mp4 / .m3u8 stream to play inside Soul Sanctum’s screening room.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5">
              <input
                type="url"
                required
                value={customUrlInput}
                onChange={e => setCustomUrlInput(e.target.value)}
                placeholder="https://archive.org/details/... or https://youtube.com/watch?v=... or .mp4"
                className="md:col-span-7 h-10 px-3 rounded-lg bg-white border border-stone-300 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-700/40 focus:border-amber-700"
              />
              <input
                type="text"
                value={customTitleInput}
                onChange={e => setCustomTitleInput(e.target.value)}
                placeholder="Optional title (e.g. St. Francis Documentary)"
                maxLength={100}
                className="md:col-span-3 h-10 px-3 rounded-lg bg-white border border-stone-300 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-700/40 focus:border-amber-700"
              />
              <button
                type="submit"
                className="md:col-span-2 h-10 px-4 rounded-lg bg-[#1C120C] hover:bg-stone-800 text-amber-200 font-cinzel text-xs font-bold tracking-wide transition-colors cursor-pointer whitespace-nowrap"
              >
                Load Film
              </button>
            </div>
            {customUrlError && (
              <p className="text-xs font-serif text-red-700">{customUrlError}</p>
            )}
          </form>
        )}

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {CATHOLIC_CINEMA_TABS.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`h-9 px-3.5 rounded-lg text-xs font-cinzel font-semibold tracking-wide transition-colors cursor-pointer whitespace-nowrap shrink-0 border ${
                  isActive
                    ? 'bg-[#1C120C] text-amber-200 border-[#8B5A2B]'
                    : 'bg-white/75 text-stone-700 border-stone-300/80 hover:bg-white hover:text-stone-950'
                }`}
              >
                {tab.label}
                {tab.id === 'watchlist' && watchlistFilms.length > 0
                  ? ` (${watchlistFilms.length})`
                  : ''}
              </button>
            );
          })}
        </div>

        {/* Live Archive Topic Quick-Filters */}
        {activeTab === 'live-archive' && (
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-0.5">
            {ARCHIVE_QUICK_TOPICS.map(topic => {
              const isSelected = archiveTopic === topic.value && !searchQuery.trim();
              return (
                <button
                  key={topic.label}
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setArchiveTopic(topic.value);
                  }}
                  className={`h-7 px-3 rounded-md text-xs font-serif transition-colors cursor-pointer whitespace-nowrap shrink-0 border ${
                    isSelected
                      ? 'bg-amber-800 text-white border-amber-800 font-semibold'
                      : 'bg-stone-100 text-stone-700 border-stone-300/80 hover:bg-white'
                  }`}
                >
                  {topic.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Loading / Error / Empty States */}
      {activeTab === 'live-archive' && isLoadingArchive ? (
        <div className="rounded-xl bg-white/80 border border-stone-300/80 py-14 flex flex-col items-center justify-center gap-3 text-stone-600">
          <Loader2 className="w-6 h-6 animate-spin text-amber-800" />
          <p className="text-sm font-serif">Searching public Catholic film archive...</p>
        </div>
      ) : activeTab === 'live-archive' && archiveError ? (
        <div className="rounded-xl bg-white/85 border border-stone-300/80 p-8 text-center space-y-3">
          <p className="text-sm font-serif text-stone-700">{archiveError}</p>
          <button
            type="button"
            onClick={() => fetchLiveArchive(searchQuery.trim() || archiveTopic)}
            className="h-9 px-4 rounded-lg bg-[#1C120C] text-amber-200 font-cinzel text-xs font-bold cursor-pointer"
          >
            Retry Archive Search
          </button>
        </div>
      ) : displayedCatalog.length === 0 ? (
        <div className="rounded-xl bg-white/80 border border-stone-300/80 p-10 text-center space-y-2">
          <Film className="w-7 h-7 text-stone-400 mx-auto" />
          <p className="font-cinzel text-sm font-bold text-stone-800">
            {activeTab === 'watchlist' ? 'Your Watchlist is Empty' : 'No Matching Films Found'}
          </p>
          <p className="text-xs font-serif text-stone-600 max-w-md mx-auto">
            {activeTab === 'watchlist'
              ? 'Save any documentary or classic Catholic movie to build your personal screening queue.'
              : 'Try a different keyword, switch categories, or explore the Live Archive tab.'}
          </p>
        </div>
      ) : (
        /* Editorial Widescreen Film Catalog Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayedCatalog.map(film => {
            const isActiveFilm = selectedFilm.id === film.id;
            const isSaved = watchlistSet.has(film.id);
            const savedProg = progressMap[film.id];
            const progressPct =
              savedProg && savedProg.duration > 60 && savedProg.currentTime > 15
                ? Math.min(100, Math.round((savedProg.currentTime / savedProg.duration) * 100))
                : 0;

            return (
              <article
                key={film.id}
                className={`group rounded-xl bg-white/88 border transition-colors overflow-hidden flex flex-col shadow-sm ${
                  isActiveFilm
                    ? 'border-amber-700 ring-1 ring-amber-700/30'
                    : 'border-stone-300/85 hover:border-amber-700/50'
                }`}
              >
                {/* 16:9 Cinema Frame */}
                <button
                  type="button"
                  onClick={() => handleSelectFilm(film, true)}
                  className="relative aspect-video w-full bg-stone-950 overflow-hidden text-left cursor-pointer"
                >
                  <CinemaPosterImage
                    src={film.posterUrl}
                    fallbackSrc={getFallbackStill(film.fallbackPosterCategory)}
                    alt={film.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Play Affordance */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className={`w-11 h-11 rounded-full flex items-center justify-center transition-transform duration-200 shadow-lg ${
                        isActiveFilm
                          ? 'bg-amber-500 text-stone-950 scale-105'
                          : 'bg-black/65 text-white border border-white/25 group-hover:bg-amber-500 group-hover:text-stone-950 group-hover:scale-105'
                      }`}
                    >
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </span>
                  </div>

                  {/* Bottom Right Runtime Text */}
                  <div className="absolute bottom-2 right-2.5 text-[11px] font-mono tabular-nums text-stone-100 bg-black/75 px-1.5 py-0.5 rounded">
                    {isActiveFilm ? 'Now Screening' : formatRuntime(film.durationMinutes)}
                  </div>

                  {/* Watch Progress Line */}
                  {progressPct > 0 && (
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-white/25">
                      <div className="h-full bg-amber-400" style={{ width: `${progressPct}%` }} />
                    </div>
                  )}
                </button>

                {/* Card Editorial Body */}
                <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-x-1.5 text-[11px] font-cinzel uppercase tracking-wider text-amber-800">
                      <span>{film.type === 'documentary' ? 'Documentary' : 'Classic Movie'}</span>
                      <span className="text-stone-400" aria-hidden="true">·</span>
                      <span className="tabular-nums text-stone-600">{film.year}</span>
                      <span className="text-stone-400" aria-hidden="true">·</span>
                      <span className="text-stone-600 truncate max-w-[120px]">{film.language}</span>
                    </div>

                    <h4 className="font-cinzel text-base font-bold text-stone-900 leading-snug">
                      {film.title}
                    </h4>

                    <p className="text-xs font-serif text-stone-600 line-clamp-2 leading-relaxed">
                      {film.synopsis}
                    </p>
                  </div>

                  <div className="pt-2.5 border-t border-stone-200/90 flex items-center justify-between gap-2">
                    <span className="text-[11px] font-serif text-stone-500 truncate">
                      {CINEMA_CATEGORY_LABELS[film.category]}
                    </span>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleToggleWatchlist(film)}
                        className={`h-8 w-8 rounded-md border flex items-center justify-center transition-colors cursor-pointer ${
                          isSaved
                            ? 'bg-amber-50 border-amber-500/60 text-amber-800'
                            : 'bg-white border-stone-300/80 text-stone-500 hover:text-stone-900'
                        }`}
                        aria-label={isSaved ? 'Remove from watchlist' : 'Add to watchlist'}
                        title={isSaved ? 'In Watchlist' : 'Add to Watchlist'}
                      >
                        {isSaved ? (
                          <BookmarkCheck className="w-3.5 h-3.5" />
                        ) : (
                          <Bookmark className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSelectFilm(film, true)}
                        className={`h-8 px-3 rounded-md font-cinzel text-[11px] font-bold tracking-wide transition-colors cursor-pointer whitespace-nowrap ${
                          isActiveFilm
                            ? 'bg-amber-600 text-white'
                            : 'bg-[#1C120C] hover:bg-stone-800 text-amber-200'
                        }`}
                      >
                        {isActiveFilm ? 'Screening' : progressPct > 0 && progressPct < 96 ? 'Resume' : 'Watch'}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
