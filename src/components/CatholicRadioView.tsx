import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Radio,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Search,
  Star,
  Globe,
  ExternalLink,
  RefreshCw,
  Loader2,
  AlertCircle,
  X,
} from 'lucide-react';
import {
  CURATED_CATHOLIC_RADIO_STATIONS,
  CATHOLIC_RADIO_REGION_TABS,
  CatholicRadioStation,
  CatholicRadioRegionTab,
  QUICK_TUNE_PRESET_IDS,
  REGION_LABELS,
  isSafeHttpUrl,
} from '../data/catholicRadio';
import { RadioPlaybackStatus } from './CatholicRadioPlayerBar';
import catholicRadioBannerImg from '../assets/images/catholic_radio_modern_banner_1795614660714.jpg';

interface CatholicRadioViewProps {
  currentStation: CatholicRadioStation | null;
  playbackStatus: RadioPlaybackStatus;
  playbackError: string | null;
  volume: number;
  isMuted: boolean;
  favoriteStationIds: string[];
  favoriteStationsMap: Record<string, CatholicRadioStation>;
  onSelectStation: (station: CatholicRadioStation) => void;
  onTogglePlay: () => void;
  onRetryStation: () => void;
  onVolumeChange: (nextVolume: number) => void;
  onToggleMute: () => void;
  onToggleFavorite: (station: CatholicRadioStation) => void;
}

const DIRECTORY_QUICK_COUNTRIES = [
  { label: 'All Countries', value: '' },
  { label: 'Vatican / Italy', value: 'Italy' },
  { label: 'United States', value: 'The United States Of America' },
  { label: 'Philippines', value: 'The Philippines' },
  { label: 'France', value: 'France' },
  { label: 'Spain', value: 'Spain' },
  { label: 'Poland', value: 'Poland' },
  { label: 'Brazil', value: 'Brazil' },
  { label: 'Mexico', value: 'Mexico' },
  { label: 'United Kingdom', value: 'The United Kingdom Of Great Britain And Northern Ireland' },
];

export const CatholicRadioView: React.FC<CatholicRadioViewProps> = ({
  currentStation,
  playbackStatus,
  playbackError,
  volume,
  isMuted,
  favoriteStationIds,
  favoriteStationsMap,
  onSelectStation,
  onTogglePlay,
  onRetryStation,
  onVolumeChange,
  onToggleMute,
  onToggleFavorite,
}) => {
  const [activeTab, setActiveTab] = useState<CatholicRadioRegionTab['id']>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [directoryCountry, setDirectoryCountry] = useState('');
  const [directoryStations, setDirectoryStations] = useState<CatholicRadioStation[]>([]);
  const [isLoadingDirectory, setIsLoadingDirectory] = useState(false);
  const [directoryError, setDirectoryError] = useState<string | null>(null);
  const [hasLoadedDirectory, setHasLoadedDirectory] = useState(false);

  const favoriteSet = useMemo(() => new Set(favoriteStationIds), [favoriteStationIds]);

  const quickPresets = useMemo(
    () =>
      QUICK_TUNE_PRESET_IDS.map(id =>
        CURATED_CATHOLIC_RADIO_STATIONS.find(s => s.id === id)
      ).filter((s): s is CatholicRadioStation => Boolean(s)),
    []
  );

  const fetchGlobalDirectory = useCallback(async (q: string, country: string) => {
    setIsLoadingDirectory(true);
    setDirectoryError(null);
    try {
      const params = new URLSearchParams({ limit: '60' });
      if (q.trim()) params.set('q', q.trim());
      if (country.trim()) params.set('country', country.trim());
      const response = await fetch(`/api/catholic-radio/directory?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Directory temporarily unavailable');
      }
      const data = await response.json();
      const list = Array.isArray(data?.stations) ? (data.stations as CatholicRadioStation[]) : [];
      setDirectoryStations(list);
      setHasLoadedDirectory(true);
    } catch {
      setDirectoryError(
        'Could not reach the worldwide live radio directory right now. All flagship stations remain available to play.'
      );
    } finally {
      setIsLoadingDirectory(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab !== 'global-directory') return;
    const timer = window.setTimeout(() => {
      fetchGlobalDirectory(searchQuery, directoryCountry);
    }, hasLoadedDirectory ? 320 : 0);
    return () => window.clearTimeout(timer);
  }, [activeTab, searchQuery, directoryCountry, fetchGlobalDirectory, hasLoadedDirectory]);

  const favoriteStationsList = useMemo(() => {
    const curatedById = new Map(CURATED_CATHOLIC_RADIO_STATIONS.map(s => [s.id, s]));
    return favoriteStationIds
      .map(id => curatedById.get(id) || favoriteStationsMap[id])
      .filter((s): s is CatholicRadioStation => Boolean(s));
  }, [favoriteStationIds, favoriteStationsMap]);

  const displayedStations = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    if (activeTab === 'global-directory') {
      return directoryStations;
    }

    const baseList =
      activeTab === 'favorites'
        ? favoriteStationsList
        : activeTab === 'all'
          ? CURATED_CATHOLIC_RADIO_STATIONS
          : CURATED_CATHOLIC_RADIO_STATIONS.filter(s => s.region === activeTab);

    if (!q) return baseList;
    return baseList.filter(station =>
      `${station.name} ${station.network} ${station.country} ${station.city || ''} ${station.language} ${station.format} ${station.description}`
        .toLowerCase()
        .includes(q)
    );
  }, [activeTab, searchQuery, directoryStations, favoriteStationsList]);

  const isPlayingCurrent = playbackStatus === 'playing' && Boolean(currentStation);
  const isConnectingCurrent = playbackStatus === 'connecting' && Boolean(currentStation);

  const handlePrimaryBannerAction = () => {
    if (currentStation) {
      onTogglePlay();
    } else {
      const defaultStation =
        CURATED_CATHOLIC_RADIO_STATIONS.find(s => s.id === 'ewtn-radio-english') ||
        CURATED_CATHOLIC_RADIO_STATIONS[0];
      onSelectStation(defaultStation);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-24">
      {/* Top Hero Banner */}
      <div className="sanctum-top-banner relative isolate overflow-hidden px-5 pt-4 pb-4 sm:px-6 min-h-[196px] sm:h-[212px] bg-[#1C120C] rounded-xl text-stone-100 shadow-md border border-[#8B5A2B]/40 flex flex-col justify-between">
        {/* Right-Side Editorial Tabletop Radio & Antique Globe Artwork */}
        <div
          className="pointer-events-none select-none absolute inset-y-0 right-0 h-full aspect-video overflow-hidden"
          aria-hidden="true"
        >
          <img
            src={catholicRadioBannerImg}
            alt="Modern matte-charcoal digital tabletop radio receiver beside an antique globe on a dark wood desk"
            decoding="async"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center brightness-[1.03] contrast-[1.03]"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 22%, black 42%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.6) 22%, black 42%)',
            }}
          />
        </div>

        {/* Mobile Left-Side Readability Scrim */}
        <div
          className="sm:hidden pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#1C120C_0%,#1C120C_38%,rgba(28,18,12,0.88)_60%,rgba(28,18,12,0.42)_82%,rgba(28,18,12,0.20)_100%)]"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1C120C]/55 via-transparent to-[#1C120C]/20"
          aria-hidden="true"
        />

        <div className="relative z-10 space-y-1 my-auto max-w-[92%] sm:max-w-[56%]">
          <p className="font-cinzel text-[10.5px] sm:text-[11px] font-bold uppercase tracking-widest text-amber-300/95 drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">
            Universal Church Broadcasts · Live 24/7
          </p>
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wide leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
            Global Catholic Radio
          </h2>
          <p className="text-[11.5px] sm:text-xs text-stone-200 font-serif leading-snug drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)]">
            Listen live to Vatican Radio, EWTN, Relevant Radio, Radio Maria World Family, Gregorian chant, and Catholic stations across six continents.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3 mt-auto pt-1.5 sm:max-w-[56%]">
          <button
            type="button"
            onClick={handlePrimaryBannerAction}
            className="h-8 inline-flex items-center gap-2 px-3.5 rounded-md bg-amber-500 hover:bg-amber-400 text-stone-950 font-cinzel text-xs font-bold tracking-wide shadow-sm transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            {isConnectingCurrent ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin shrink-0" />
            ) : isPlayingCurrent ? (
              <Pause className="w-3.5 h-3.5 fill-current shrink-0" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-current shrink-0" />
            )}
            <span>
              {currentStation
                ? isPlayingCurrent
                  ? 'Pause Broadcast'
                  : 'Resume Broadcast'
                : 'Tune EWTN Radio'}
            </span>
          </button>

          <span className="hidden sm:inline text-xs font-serif text-stone-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.85)] truncate">
            {CURATED_CATHOLIC_RADIO_STATIONS.length} Flagship Streams · Live Global Directory
          </span>
        </div>
      </div>

      {/* Active Receiver Console + Quick Presets */}
      <section className="rounded-xl bg-[#1C120C] text-stone-100 border border-[#8B5A2B]/40 shadow-md overflow-hidden">
        <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Tuned Station Info */}
          <div className="flex items-start sm:items-center gap-3.5 min-w-0">
            <button
              type="button"
              onClick={handlePrimaryBannerAction}
              className="w-12 h-12 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 flex items-center justify-center shrink-0 shadow-sm transition-colors cursor-pointer"
              aria-label={isPlayingCurrent ? 'Pause live broadcast' : 'Play live broadcast'}
            >
              {isConnectingCurrent ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : isPlayingCurrent ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </button>

            <div className="min-w-0 space-y-0.5">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] font-cinzel uppercase tracking-wider text-amber-300/90">
                {currentStation ? (
                  <>
                    {isPlayingCurrent ? (
                      <span className="inline-flex items-center gap-1.5 text-emerald-300 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>On Air</span>
                      </span>
                    ) : isConnectingCurrent ? (
                      <span className="text-amber-300 font-bold">Connecting Stream</span>
                    ) : playbackStatus === 'error' ? (
                      <span className="text-red-300 font-bold">Stream Interrupted</span>
                    ) : (
                      <span className="text-stone-400 font-semibold">Standby</span>
                    )}
                    <span className="text-stone-500" aria-hidden="true">·</span>
                    <span className="text-stone-300">{currentStation.country}</span>
                    <span className="text-stone-500" aria-hidden="true">·</span>
                    <span className="text-stone-300">{currentStation.language}</span>
                    {currentStation.bitrate && (
                      <>
                        <span className="text-stone-500" aria-hidden="true">·</span>
                        <span className="text-stone-400 tabular-nums">
                          {currentStation.codec ? `${currentStation.codec} ` : ''}
                          {currentStation.bitrate} kbps
                        </span>
                      </>
                    )}
                  </>
                ) : (
                  <span>Ready to Tune · Select Any Station Below</span>
                )}
              </div>

              <h3 className="font-serif text-base sm:text-lg font-bold text-amber-50 truncate">
                {currentStation ? currentStation.name : 'Vatican Radio, EWTN & Worldwide Networks'}
              </h3>

              <p className="text-xs text-stone-300 font-serif line-clamp-1">
                {playbackStatus === 'error' && playbackError
                  ? playbackError
                  : currentStation
                    ? currentStation.description
                    : 'Audio continues playing seamlessly in the bottom player bar as you pray or read across Soul Sanctum.'}
              </p>
            </div>
          </div>

          {/* Right Receiver Controls */}
          <div className="flex items-center gap-2.5 shrink-0 self-end md:self-center">
            {playbackStatus === 'error' && currentStation && (
              <button
                type="button"
                onClick={onRetryStation}
                className="h-8 px-3 rounded-md bg-amber-600 hover:bg-amber-500 text-stone-950 font-cinzel text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry</span>
              </button>
            )}

            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-2.5 h-9">
              <button
                type="button"
                onClick={onToggleMute}
                className="text-stone-300 hover:text-white transition-colors cursor-pointer"
                aria-label={isMuted ? 'Unmute radio' : 'Mute radio'}
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
                className="w-20 sm:w-24 accent-amber-400 cursor-pointer"
              />
            </div>

            {currentStation && (
              <button
                type="button"
                onClick={() => onToggleFavorite(currentStation)}
                className="h-9 w-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-stone-300 hover:text-amber-300 transition-colors cursor-pointer"
                aria-label={
                  favoriteSet.has(currentStation.id)
                    ? 'Remove current station from favorites'
                    : 'Save current station to favorites'
                }
                title={
                  favoriteSet.has(currentStation.id) ? 'Saved in Favorites' : 'Add to Favorites'
                }
              >
                <Star
                  className={`w-4 h-4 ${
                    favoriteSet.has(currentStation.id) ? 'fill-amber-400 text-amber-400' : ''
                  }`}
                />
              </button>
            )}

            {currentStation && isSafeHttpUrl(currentStation.homepageUrl) && (
              <a
                href={currentStation.homepageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="h-9 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-cinzel font-semibold text-amber-200 inline-flex items-center gap-1.5 transition-colors whitespace-nowrap"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Station Site</span>
              </a>
            )}
          </div>
        </div>

        {/* Quick-Tune Presets Bar */}
        <div className="px-4 sm:px-5 py-2.5 bg-black/25 border-t border-[#8B5A2B]/30 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-cinzel uppercase tracking-wider text-stone-400 shrink-0 mr-1">
            Quick Tune:
          </span>
          {quickPresets.map(preset => {
            const isSelected = currentStation?.id === preset.id;
            const isActivePlaying = isSelected && playbackStatus === 'playing';
            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => onSelectStation(preset)}
                className={`h-7 px-3 rounded-md text-xs font-serif transition-colors cursor-pointer whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-amber-500/20 text-amber-200 border-amber-400/60 font-semibold'
                    : 'bg-white/5 text-stone-300 border-white/10 hover:bg-white/10 hover:text-white'
                }`}
              >
                {isActivePlaying && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                )}
                <span>
                  {preset.name
                    .replace('EWTN Global Catholic Radio', 'EWTN Global')
                    .replace(' — Chant Grégorien', ' Gregorian')}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Filter Tabs & Search Bar */}
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
                activeTab === 'global-directory'
                  ? 'Search worldwide Catholic stations (e.g., Radio Maria, Rosary, Latin)...'
                  : 'Filter by station, country, or language...'
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

          <div className="text-xs font-serif text-stone-600 tabular-nums shrink-0">
            {activeTab === 'global-directory'
              ? isLoadingDirectory
                ? 'Searching worldwide directory...'
                : `${displayedStations.length} live worldwide streams found`
              : `${displayedStations.length} station${displayedStations.length === 1 ? '' : 's'}`}
          </div>
        </div>

        {/* Region Segmented Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
          {CATHOLIC_RADIO_REGION_TABS.map(tab => {
            const isActive = activeTab === tab.id;
            const label =
              tab.id === 'favorites'
                ? `${tab.label} (${favoriteStationsList.length})`
                : tab.label;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`h-8 px-3 rounded-lg text-xs font-cinzel font-semibold tracking-wide transition-colors cursor-pointer whitespace-nowrap shrink-0 border inline-flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#2C1B10] text-amber-100 border-[#8B5A2B] shadow-xs'
                    : 'bg-white/75 text-stone-700 border-stone-300/80 hover:bg-white hover:text-stone-950 hover:border-stone-400'
                }`}
              >
                {tab.id === 'favorites' && (
                  <Star
                    className={`w-3.5 h-3.5 ${isActive ? 'fill-amber-400 text-amber-400' : 'text-amber-700'}`}
                  />
                )}
                {tab.id === 'global-directory' && (
                  <Globe className={`w-3.5 h-3.5 ${isActive ? 'text-amber-300' : 'text-amber-800'}`} />
                )}
                <span>{label}</span>
              </button>
            );
          })}
        </div>

        {/* Country Sub-Filter when browsing Live Global Directory */}
        {activeTab === 'global-directory' && (
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-stone-300/60">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {DIRECTORY_QUICK_COUNTRIES.map(item => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setDirectoryCountry(item.value)}
                  className={`h-7 px-2.5 rounded-md text-xs font-serif transition-colors cursor-pointer whitespace-nowrap shrink-0 border ${
                    directoryCountry === item.value
                      ? 'bg-amber-900 text-amber-50 border-amber-800 font-semibold'
                      : 'bg-white/70 text-stone-700 border-stone-300/70 hover:bg-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => fetchGlobalDirectory(searchQuery, directoryCountry)}
              disabled={isLoadingDirectory}
              className="h-7 px-2.5 rounded-md text-xs font-cinzel font-semibold text-stone-700 hover:text-stone-950 bg-white/80 border border-stone-300/80 inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 disabled:opacity-60"
            >
              <RefreshCw className={`w-3 h-3 ${isLoadingDirectory ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        )}
      </div>

      {/* Directory Error / Loading / Empty States */}
      {activeTab === 'global-directory' && directoryError && (
        <div className="p-4 rounded-xl bg-amber-50/90 border border-amber-300/80 text-stone-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-sm font-serif">
            <AlertCircle className="w-4 h-4 text-amber-800 shrink-0" />
            <span>{directoryError}</span>
          </div>
          <button
            type="button"
            onClick={() => fetchGlobalDirectory(searchQuery, directoryCountry)}
            className="h-8 px-3 rounded-md bg-amber-900 text-amber-50 text-xs font-cinzel font-semibold cursor-pointer whitespace-nowrap shrink-0"
          >
            Try Again
          </button>
        </div>
      )}

      {activeTab === 'global-directory' && isLoadingDirectory && directoryStations.length === 0 ? (
        <div className="py-16 flex flex-col items-center justify-center text-stone-600 gap-3 bg-white/60 rounded-xl border border-stone-200">
          <Loader2 className="w-6 h-6 text-amber-800 animate-spin" />
          <p className="text-sm font-serif">Connecting to the worldwide Catholic radio directory...</p>
        </div>
      ) : displayedStations.length === 0 ? (
        <div className="py-14 px-6 text-center bg-white/65 rounded-xl border border-stone-200/90 space-y-2.5">
          <Radio className="w-7 h-7 text-stone-400 mx-auto" />
          <p className="text-base font-serif font-semibold text-stone-800">
            {activeTab === 'favorites'
              ? 'No favorite stations saved yet'
              : 'No matching Catholic radio stations found'}
          </p>
          <p className="text-sm font-serif text-stone-600 max-w-md mx-auto">
            {activeTab === 'favorites'
              ? 'Tap the star icon on any station card to pin your preferred Vatican, EWTN, Radio Maria, or chant streams here.'
              : 'Try clearing your search filter or switch to the Global Directory tab to search live stations worldwide.'}
          </p>
          {activeTab !== 'global-directory' && searchQuery && (
            <button
              type="button"
              onClick={() => setActiveTab('global-directory')}
              className="mt-2 h-9 px-4 rounded-lg bg-[#2C1B10] hover:bg-[#3F2819] text-amber-100 text-xs font-cinzel font-semibold cursor-pointer"
            >
              Search “{searchQuery}” in Global Directory
            </button>
          )}
        </div>
      ) : (
        /* Station Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {displayedStations.map(station => {
            const isSelected = currentStation?.id === station.id;
            const isStationPlaying = isSelected && playbackStatus === 'playing';
            const isStationConnecting = isSelected && playbackStatus === 'connecting';
            const isFav = favoriteSet.has(station.id);

            return (
              <article
                key={station.id}
                className={`p-4 rounded-xl border transition-all flex flex-col justify-between gap-3 ${
                  isSelected
                    ? 'bg-[#FDF9F2] border-amber-700/70 shadow-sm'
                    : 'bg-white/80 border-stone-200/90 hover:border-amber-700/40 hover:bg-white/95'
                }`}
              >
                <div className="space-y-1.5 min-w-0">
                  {/* Quiet Unboxed Kicker Line (Zero-Pill Discipline) */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-[11px] font-sans font-medium text-stone-500 min-w-0 truncate">
                      <span className="text-amber-900 font-semibold shrink-0">
                        {REGION_LABELS[station.region]}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{station.country}</span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{station.language}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onToggleFavorite(station)}
                      className="p-1.5 -mr-1 rounded-md text-stone-400 hover:text-amber-700 hover:bg-amber-900/5 transition-colors cursor-pointer shrink-0"
                      aria-label={isFav ? `Remove ${station.name} from favorites` : `Save ${station.name} to favorites`}
                      title={isFav ? 'Remove from favorites' : 'Save to favorites'}
                    >
                      <Star
                        className={`w-4 h-4 ${isFav ? 'fill-amber-500 text-amber-600' : ''}`}
                      />
                    </button>
                  </div>

                  {/* Station Title */}
                  <h3 className="font-serif text-base font-bold text-stone-900 leading-snug">
                    {station.name}
                  </h3>

                  {/* Editorial Description */}
                  <p className="text-xs sm:text-[13px] text-stone-600 font-serif leading-relaxed line-clamp-2">
                    {station.description}
                  </p>
                </div>

                {/* Card Footer: Metadata + Play Action */}
                <div className="pt-2.5 border-t border-stone-200/80 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-stone-500 font-sans min-w-0 truncate">
                    <span className="truncate">{station.format}</span>
                    {station.bitrate && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums shrink-0">
                          {station.codec ? `${station.codec} ` : ''}
                          {station.bitrate}k
                        </span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {isSafeHttpUrl(station.homepageUrl) && (
                      <a
                        href={station.homepageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-8 w-8 rounded-lg border border-stone-200 hover:border-stone-300 bg-stone-50 hover:bg-stone-100 text-stone-600 hover:text-stone-900 flex items-center justify-center transition-colors"
                        title={`Visit ${station.name} website`}
                        aria-label={`Visit ${station.name} website`}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => onSelectStation(station)}
                      className={`h-8 px-3.5 rounded-lg text-xs font-cinzel font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                        isStationPlaying
                          ? 'bg-amber-800 hover:bg-amber-900 text-amber-50'
                          : isStationConnecting
                            ? 'bg-amber-700 text-amber-50'
                            : 'bg-[#2C1B10] hover:bg-[#3F2819] text-amber-100'
                      }`}
                    >
                      {isStationConnecting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Connecting</span>
                        </>
                      ) : isStationPlaying ? (
                        <>
                          <Pause className="w-3.5 h-3.5 fill-current" />
                          <span>Playing</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Listen Live</span>
                        </>
                      )}
                    </button>
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
