import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  APIProvider,
  Map as GoogleMap,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  MapPin,
  ExternalLink,
  Copy,
  Check,
  Flame,
  Stamp,
  Compass,
  BookOpen,
  Loader2,
  X,
  Trash2,
  RotateCcw,
} from 'lucide-react';
import {
  VIRTUAL_PILGRIMAGE_SITES,
  PILGRIMAGE_REGIONS,
  PilgrimageRegion,
  PilgrimageSite,
  PilgrimageStop,
} from '@/data/virtualPilgrimages';
import stPetersBannerImg from '@/assets/images/pilgrimage_st_peters_vatican_1795370664776.jpg';
import { SacredReader } from '@/utils/speech';
import { isMapsQuotaError, notifyMapsQuotaExceeded } from '@/hooks/usePlaceAutocomplete';
import {
  isGoogleMapsStopped,
  recordGoogleMapsUsage,
  useMapsQuotaGuard,
} from '@/utils/mapsQuotaGuard';

const PASSPORT_STORAGE_KEY = 'sanctum_pilgrimage_passport_v1';
const GMP_ATTRIBUTION_IDS = ['gmp_mcp_codeassist_v1_aistudio'];

// Neutral Mediterranean/Atlantic viewport ONLY used before live Places API (New) lookup resolves the shrine
const NEUTRAL_WORLD_VIEWPORT: google.maps.LatLngLiteral = {
  lat: 41.9,
  lng: 12.5,
};

interface LitVigilCandle {
  shrineId: string;
  shrineName: string;
  intention: string;
  litAt: string;
}

interface PilgrimPassportState {
  stampedShrines: Record<string, string>; // shrineId -> formatted date
  visitedStops: Record<string, string[]>; // shrineId -> array of stop ids
  candles: LitVigilCandle[];
}

interface ResolvedShrinePlace {
  shrineId: string;
  placeId: string;
  displayName: string;
  formattedAddress: string;
  location: google.maps.LatLngLiteral;
  googleMapsURI?: string;
  attributions: Array<{ provider: string; providerURI?: string }>;
}

function readPassportState(): PilgrimPassportState {
  if (typeof window === 'undefined') {
    return { stampedShrines: {}, visitedStops: {}, candles: [] };
  }
  try {
    const raw = window.localStorage.getItem(PASSPORT_STORAGE_KEY);
    if (!raw) return { stampedShrines: {}, visitedStops: {}, candles: [] };
    const parsed = JSON.parse(raw) as Partial<PilgrimPassportState>;
    return {
      stampedShrines:
        parsed.stampedShrines && typeof parsed.stampedShrines === 'object'
          ? parsed.stampedShrines
          : {},
      visitedStops:
        parsed.visitedStops && typeof parsed.visitedStops === 'object'
          ? parsed.visitedStops
          : {},
      candles: Array.isArray(parsed.candles) ? parsed.candles : [],
    };
  } catch {
    return { stampedShrines: {}, visitedStops: {}, candles: [] };
  }
}

function savePassportState(state: PilgrimPassportState): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(PASSPORT_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore private-mode storage errors
  }
}

function formatTodayLabel(): string {
  return new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function buildFreeGoogleMapsUrl(site: PilgrimageSite): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.placesQuery)}`;
}

function buildStopSpeech(site: PilgrimageSite, stop: PilgrimageStop): string {
  return [
    `${site.name}. Stop ${Number(stop.stepNumber)}. ${stop.title}.`,
    stop.subtitle + '.',
    `From Sacred Scripture, ${stop.scriptureRef}. ${stop.scriptureText}`,
    stop.narrative,
    `Spiritual reflection. ${stop.spiritualReflection}`,
    `Let us pray. ${stop.prayer}`,
  ].join(' ... ');
}

function buildCopyText(site: PilgrimageSite, stop: PilgrimageStop): string {
  return [
    `${site.name.toUpperCase()} — ${site.location}`,
    `Stop ${stop.stepNumber}: ${stop.title}`,
    `${stop.subtitle}`,
    '',
    `Scripture (${stop.scriptureRef}):`,
    `"${stop.scriptureText}"`,
    '',
    stop.narrative,
    '',
    `Spiritual Reflection:`,
    stop.spiritualReflection,
    '',
    `Pilgrim Prayer:`,
    stop.prayer,
  ].join('\n');
}

interface ShrineLiveMapInnerProps {
  site: PilgrimageSite;
  resolvedPlaces: Record<string, ResolvedShrinePlace>;
  onResolvePlace: (shrineId: string, place: ResolvedShrinePlace) => void;
  mapTypeId: 'roadmap' | 'hybrid';
  onToggleMapType: () => void;
}

const ShrineLiveMapInner: React.FC<ShrineLiveMapInnerProps> = ({
  site,
  resolvedPlaces,
  onResolvePlace,
  mapTypeId,
  onToggleMapType,
}) => {
  const map = useMap();
  const placesLib = useMapsLibrary('places');
  const [isLocating, setIsLocating] = useState(false);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [infoOpen, setInfoOpen] = useState(true);
  const inFlightRef = useRef<Record<string, boolean>>({});

  const activePlace = resolvedPlaces[site.id] || null;

  const resolveShrineLocation = useCallback(
    async (targetSite: PilgrimageSite) => {
      if (
        !placesLib ||
        resolvedPlaces[targetSite.id] ||
        inFlightRef.current[targetSite.id] ||
        isGoogleMapsStopped()
      ) {
        return;
      }

      if (!recordGoogleMapsUsage('places')) {
        return;
      }

      inFlightRef.current[targetSite.id] = true;
      setIsLocating(true);
      setLookupError(null);

      try {
        const searchPlace = async (textQuery: string) => {
          const request: any = {
            textQuery,
            fields: [
              'id',
              'displayName',
              'formattedAddress',
              'location',
              'googleMapsURI',
              'attributions',
            ],
            maxResultCount: 1,
            internalUsageAttributionIds: GMP_ATTRIBUTION_IDS,
          };
          const response = await placesLib.Place.searchByText(request);
          return response?.places?.[0] ?? null;
        };

        let found = await searchPlace(targetSite.placesQuery);
        if (!found || !found.location) {
          found = await searchPlace(targetSite.placesFallbackQuery);
        }

        if (found && found.location) {
          const loc = {
            lat:
              typeof found.location.lat === 'function'
                ? found.location.lat()
                : Number((found.location as any).lat),
            lng:
              typeof found.location.lng === 'function'
                ? found.location.lng()
                : Number((found.location as any).lng),
          };

          const rawAttributions = Array.isArray((found as any).attributions)
            ? (found as any).attributions
            : [];
          const attributions = rawAttributions
            .filter((a: any) => a && a.provider)
            .map((a: any) => ({
              provider: String(a.provider),
              providerURI: a.providerURI ? String(a.providerURI) : undefined,
            }));

          onResolvePlace(targetSite.id, {
            shrineId: targetSite.id,
            placeId: found.id || targetSite.id,
            displayName:
              typeof found.displayName === 'string'
                ? found.displayName
                : targetSite.name,
            formattedAddress: found.formattedAddress || targetSite.location,
            location: loc,
            googleMapsURI: found.googleMapsURI || undefined,
            attributions,
          });
        } else {
          setLookupError('Live shrine location could not be verified at this moment.');
        }
      } catch (err) {
        if (isMapsQuotaError(err)) {
          notifyMapsQuotaExceeded();
          setLookupError('Google Maps quota limit reached. Use the direct Google Maps link below.');
        } else {
          setLookupError('Unable to locate this shrine on the interactive map right now.');
        }
      } finally {
        inFlightRef.current[targetSite.id] = false;
        setIsLocating(false);
      }
    },
    [placesLib, resolvedPlaces, onResolvePlace]
  );

  useEffect(() => {
    resolveShrineLocation(site);
  }, [site, resolveShrineLocation]);

  useEffect(() => {
    if (!map || !activePlace) return;
    map.panTo(activePlace.location);
    map.setZoom(17);
    setInfoOpen(true);
  }, [map, activePlace]);

  return (
    <div className="space-y-3">
      <div className="relative h-64 w-full overflow-hidden rounded-lg border border-stone-300 bg-stone-200">
        <GoogleMap
          mapId="DEMO_MAP_ID"
          defaultCenter={NEUTRAL_WORLD_VIEWPORT}
          defaultZoom={4}
          mapTypeId={mapTypeId}
          gestureHandling="cooperative"
          streetViewControl={true}
          mapTypeControl={false}
          fullscreenControl={true}
          internalUsageAttributionIds={GMP_ATTRIBUTION_IDS}
          className="h-full w-full"
        >
          {activePlace && (
            <>
              <AdvancedMarker
                position={activePlace.location}
                title={activePlace.displayName}
                onClick={() => setInfoOpen((prev) => !prev)}
              >
                <Pin
                  background="#7F1D1D"
                  borderColor="#FBF9F5"
                  glyphColor="#FDE68A"
                />
              </AdvancedMarker>
              {infoOpen && (
                <InfoWindow
                  position={activePlace.location}
                  onCloseClick={() => setInfoOpen(false)}
                >
                  <div className="max-w-[210px] p-0.5 text-stone-900">
                    <p className="font-serif text-xs font-bold text-stone-900 leading-snug">
                      {activePlace.displayName}
                    </p>
                    <p className="mt-0.5 text-[11px] text-stone-600 leading-snug">
                      {activePlace.formattedAddress}
                    </p>
                    {activePlace.googleMapsURI && (
                      <a
                        href={activePlace.googleMapsURI}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-[#7F1D1D] underline"
                      >
                        <span>Directions &amp; Street View</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </InfoWindow>
              )}
            </>
          )}
        </GoogleMap>

        <div className="absolute top-2.5 left-2.5 z-10 flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleMapType}
            className="rounded border border-stone-300 bg-[#FBF9F5]/95 px-2.5 py-1 text-[11px] font-medium text-stone-800 shadow-xs transition-colors hover:bg-white cursor-pointer"
          >
            {mapTypeId === 'hybrid' ? 'Map View' : 'Satellite View'}
          </button>
          {isLocating && (
            <span className="inline-flex items-center gap-1.5 rounded border border-stone-300 bg-[#FBF9F5]/95 px-2.5 py-1 text-[11px] text-stone-700">
              <Loader2 className="h-3 w-3 animate-spin text-[#7F1D1D]" />
              <span>Locating shrine...</span>
            </span>
          )}
        </div>
      </div>

      {activePlace && (
        <p className="text-xs text-stone-700 leading-relaxed">
          <span className="font-semibold text-stone-900">{activePlace.displayName}</span>
          {' — '}
          {activePlace.formattedAddress}
        </p>
      )}

      {lookupError && (
        <p className="text-xs text-[#7F1D1D]">{lookupError}</p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-stone-200 pt-2 text-[10px] text-stone-500">
        {activePlace && activePlace.attributions.length > 0 && (
          <span>
            Data:{' '}
            {activePlace.attributions.map((attr, idx) => (
              <React.Fragment key={`${attr.provider}-${idx}`}>
                {idx > 0 && ', '}
                {attr.providerURI ? (
                  <a
                    href={attr.providerURI}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-stone-700"
                  >
                    {attr.provider}
                  </a>
                ) : (
                  attr.provider
                )}
              </React.Fragment>
            ))}
          </span>
        )}
        <span>
          Map data © Google ·{' '}
          <a
            href="https://maps.google.com/help/terms_maps/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-stone-700"
          >
            Terms
          </a>{' '}
          &amp;{' '}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-stone-700"
          >
            Privacy
          </a>
        </span>
      </div>
    </div>
  );
};

export const VirtualPilgrimageView: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<PilgrimageRegion>('All Shrines');
  const [activeSiteId, setActiveSiteId] = useState<string>(VIRTUAL_PILGRIMAGE_SITES[0].id);
  const [activeStopIndex, setActiveStopIndex] = useState<number>(0);

  // Pilgrim Passport & Vigil Candles persisted locally
  const [passport, setPassport] = useState<PilgrimPassportState>(() => readPassportState());
  const [showPassportPanel, setShowPassportPanel] = useState<boolean>(false);
  const [showCandleComposer, setShowCandleComposer] = useState<boolean>(false);
  const [candleIntentionInput, setCandleIntentionInput] = useState<string>('');
  const [copiedStop, setCopiedStop] = useState<boolean>(false);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Audio Guide state (SacredReader)
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [isSpeakingSingle, setIsSpeakingSingle] = useState<boolean>(false);
  const [voiceRate, setVoiceRate] = useState<number>(0.88);

  // Opt-In Interactive Map state (0 Maps API calls until pilgrim clicks Load Map)
  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);
  const [mapTypeId, setMapTypeId] = useState<'roadmap' | 'hybrid'>('hybrid');
  const [mapsApiKey, setMapsApiKey] = useState<string>(
    () => (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined)?.trim() || ''
  );
  const [serverPaused, setServerPaused] = useState<boolean>(false);
  const [mapsConfigLoaded, setMapsConfigLoaded] = useState<boolean>(false);
  const [resolvedPlaces, setResolvedPlaces] = useState<Record<string, ResolvedShrinePlace>>({});
  const mapLoadRecordedRef = useRef<boolean>(false);
  const shrineStageRef = useRef<HTMLElement | null>(null);

  const quotaGuard = useMapsQuotaGuard(serverPaused);

  const filteredSites =
    selectedRegion === 'All Shrines'
      ? VIRTUAL_PILGRIMAGE_SITES
      : VIRTUAL_PILGRIMAGE_SITES.filter((site) => site.region === selectedRegion);

  const activeSite =
    VIRTUAL_PILGRIMAGE_SITES.find((s) => s.id === activeSiteId) || VIRTUAL_PILGRIMAGE_SITES[0];
  const activeStop = activeSite.stops[activeStopIndex] || activeSite.stops[0];

  const stampedCount = Object.keys(passport.stampedShrines).length;
  const isCurrentSiteStamped = Boolean(passport.stampedShrines[activeSite.id]);
  const currentSiteCandles = passport.candles.filter((c) => c.shrineId === activeSite.id);
  const visitedForCurrentSite = passport.visitedStops[activeSite.id] || [];

  // Load Google Maps availability once (metadata check only — zero billable Maps API call)
  useEffect(() => {
    let mounted = true;
    fetch('/api/maps-config', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!mounted) return;
        if (data?.paused) {
          setServerPaused(true);
          setMapsApiKey('');
        } else if (data?.apiKey) {
          setMapsApiKey((prev) => prev || String(data.apiKey).trim());
        }
        setMapsConfigLoaded(true);
      })
      .catch(() => {
        if (mounted) setMapsConfigLoaded(true);
      });
    return () => {
      mounted = false;
    };
  }, []);

  // Record a single map load only if and when the pilgrim explicitly opens the interactive map
  useEffect(() => {
    if (!isMapOpen || !mapsConfigLoaded || !mapsApiKey || quotaGuard.isStopped) {
      mapLoadRecordedRef.current = false;
      return;
    }
    if (!mapLoadRecordedRef.current) {
      mapLoadRecordedRef.current = true;
      recordGoogleMapsUsage('mapLoads');
    }
  }, [isMapOpen, mapsConfigLoaded, mapsApiKey, quotaGuard.isStopped]);

  // Persist visited stop automatically as pilgrim walks through stops
  useEffect(() => {
    setPassport((prev) => {
      const existing = prev.visitedStops[activeSite.id] || [];
      if (existing.includes(activeStop.id)) return prev;
      const next: PilgrimPassportState = {
        ...prev,
        visitedStops: {
          ...prev.visitedStops,
          [activeSite.id]: [...existing, activeStop.id],
        },
      };
      savePassportState(next);
      return next;
    });
  }, [activeSite.id, activeStop.id]);

  // Stop audio on unmount
  useEffect(() => {
    return () => {
      SacredReader.stop();
    };
  }, []);

  // Continuous 4-Stop Audio Guide Autoplay
  useEffect(() => {
    if (!isAutoPlaying) return;

    let cancelled = false;
    let pauseTimer: ReturnType<typeof setTimeout> | null = null;

    const speechText = buildStopSpeech(activeSite, activeStop);
    setIsSpeakingSingle(false);

    SacredReader.speak(
      speechText,
      () => {
        if (cancelled) return;
        pauseTimer = setTimeout(() => {
          if (cancelled) return;
          setActiveStopIndex((prev) => {
            if (prev < activeSite.stops.length - 1) {
              return prev + 1;
            }
            setIsAutoPlaying(false);
            return prev;
          });
        }, 2000);
      },
      'female',
      voiceRate,
      'persona-jenny'
    );

    return () => {
      cancelled = true;
      if (pauseTimer) clearTimeout(pauseTimer);
      SacredReader.stop();
    };
  }, [isAutoPlaying, activeSite, activeStop, voiceRate]);

  const stopAllAudio = useCallback(() => {
    setIsAutoPlaying(false);
    setIsSpeakingSingle(false);
    SacredReader.stop();
  }, []);

  const handleSelectSite = (siteId: string, scrollToStage = false) => {
    stopAllAudio();
    setActiveSiteId(siteId);
    setActiveStopIndex(0);
    setShowCandleComposer(false);
    setCopiedStop(false);
    if (scrollToStage && shrineStageRef.current) {
      shrineStageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectStop = (idx: number) => {
    setIsSpeakingSingle(false);
    if (!isAutoPlaying) {
      SacredReader.stop();
    }
    setActiveStopIndex(idx);
    setCopiedStop(false);
  };

  const handleListenSingleStop = () => {
    if (isSpeakingSingle) {
      stopAllAudio();
      return;
    }
    setIsAutoPlaying(false);
    SacredReader.stop();
    setIsSpeakingSingle(true);
    SacredReader.speak(
      buildStopSpeech(activeSite, activeStop),
      () => setIsSpeakingSingle(false),
      'female',
      voiceRate,
      'persona-jenny'
    );
  };

  const handleToggleAutoPlay = () => {
    if (isAutoPlaying) {
      stopAllAudio();
    } else {
      setIsSpeakingSingle(false);
      SacredReader.stop();
      setIsAutoPlaying(true);
    }
  };

  const handleToggleStampShrine = (siteId: string) => {
    setPassport((prev) => {
      const nextStamped = { ...prev.stampedShrines };
      if (nextStamped[siteId]) {
        delete nextStamped[siteId];
      } else {
        nextStamped[siteId] = formatTodayLabel();
      }
      const next: PilgrimPassportState = {
        ...prev,
        stampedShrines: nextStamped,
      };
      savePassportState(next);
      return next;
    });
  };

  const handleLightCandle = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = candleIntentionInput.trim();
    if (!cleaned) return;
    setPassport((prev) => {
      const newCandle: LitVigilCandle = {
        shrineId: activeSite.id,
        shrineName: activeSite.shortName,
        intention: cleaned,
        litAt: formatTodayLabel(),
      };
      const next: PilgrimPassportState = {
        ...prev,
        candles: [newCandle, ...prev.candles].slice(0, 24),
      };
      savePassportState(next);
      return next;
    });
    setCandleIntentionInput('');
    setShowCandleComposer(false);
  };

  const handleRemoveCandle = (idxToRemove: number) => {
    setPassport((prev) => {
      const next: PilgrimPassportState = {
        ...prev,
        candles: prev.candles.filter((_, i) => i !== idxToRemove),
      };
      savePassportState(next);
      return next;
    });
  };

  const handleCopyCurrentStop = async () => {
    try {
      await navigator.clipboard.writeText(buildCopyText(activeSite, activeStop));
      setCopiedStop(true);
      setTimeout(() => setCopiedStop(false), 2200);
    } catch {
      // Clipboard API unavailable
    }
  };

  const handleResolvePlace = useCallback((shrineId: string, place: ResolvedShrinePlace) => {
    setResolvedPlaces((prev) => ({ ...prev, [shrineId]: place }));
  }, []);

  const canRenderLiveMap = Boolean(mapsConfigLoaded && mapsApiKey && !quotaGuard.isStopped);

  return (
    <div className="space-y-8 pb-12 text-stone-900">
      {/* 1. Archival Editorial Masthead */}
      <section className="rounded-xl border border-[#D8C7B2] bg-[#F5EDE1] shadow-sm overflow-hidden">
        {/* Top Banner: Seamless Gradient from Light Brown Background into St. Peter's Basilica */}
        <div className="relative overflow-hidden bg-[#EFE2D0] px-6 py-6 sm:px-8 sm:py-7 border-b border-[#D8C7B2] min-h-[212px] sm:min-h-[236px] flex flex-col justify-between">
          {/* Right-Side St. Peter's Basilica Photography */}
          <div
            className="pointer-events-none select-none absolute inset-y-0 right-0 w-full flex items-center justify-end overflow-hidden"
            aria-hidden="true"
          >
            <img
              src={stPetersBannerImg}
              alt=""
              decoding="async"
              referrerPolicy="no-referrer"
              className="h-full w-auto max-w-full object-contain object-right brightness-[1.01] contrast-[1.03]"
              style={{
                maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.58) 12%, black 24%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.58) 12%, black 24%)',
              }}
            />
          </div>

          {/* Smooth Multi-Stop Horizontal Gradient from Light Brown (#EFE2D0) into St. Peter's Basilica */}
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#EFE2D0_0%,#EFE2D0_28%,rgba(239,226,208,0.92)_46%,rgba(239,226,208,0.62)_66%,rgba(239,226,208,0.28)_86%,rgba(239,226,208,0.22)_100%)] sm:bg-[linear-gradient(90deg,#EFE2D0_0%,#EFE2D0_33%,rgba(239,226,208,0.94)_47%,rgba(239,226,208,0.50)_63%,rgba(239,226,208,0.10)_80%,rgba(239,226,208,0.14)_100%)]"
            aria-hidden="true"
          />
          {/* Subtle Top, Bottom, and Right Edge Light-Brown Feathering */}
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#EFE2D0]/55 via-transparent to-[#EFE2D0]/25"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-[#EFE2D0]/65 to-transparent"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between my-auto">
            <div className="space-y-2.5 max-w-2xl sm:max-w-[58%]">
              <h1 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#1F140D] [text-wrap:balance] drop-shadow-[0_1px_2px_rgba(255,250,242,0.7)]">
                Virtual Pilgrimages to Catholic Sacred Sites
              </h1>
              <p className="font-serif text-sm sm:text-base text-[#362417] leading-relaxed drop-shadow-[0_1px_2px_rgba(255,250,242,0.6)]">
                Walk in spirit through the Church’s sacred sanctuaries—from Jerusalem, Bethlehem, and Rome to Lourdes, Fátima, Guadalupe, Medjugorje, Kraków, Chartres, Mont-Saint-Michel, Assisi, Santiago, the Seven Churches of Revelation, and Zeitoun—with guided reflections, audio narration, vigil candles, and your personal Pilgrim Passport.
              </p>
              <p className="pt-1 text-xs font-medium tracking-wide text-[#5E432E]">
                {VIRTUAL_PILGRIMAGE_SITES.length} Sacred Shrines ·{' '}
                {VIRTUAL_PILGRIMAGE_SITES.reduce((sum, s) => sum + s.stops.length, 0)} Guided Prayer Stops ·{' '}
                {stampedCount} of {VIRTUAL_PILGRIMAGE_SITES.length} Stamped in Credencial
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setShowPassportPanel((prev) => !prev)}
                className={`inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer shadow-xs backdrop-blur-xs ${
                  showPassportPanel
                    ? 'border-[#7F1D1D] bg-[#7F1D1D] text-[#FBF9F5]'
                    : 'border-[#C8B294] bg-[#F8F2E8]/92 text-[#24160D] hover:border-[#8B5A2B] hover:bg-[#FBF7F0]'
                }`}
              >
                <Stamp className="h-4 w-4" />
                <span>
                  Pilgrim Passport ({stampedCount}/{VIRTUAL_PILGRIMAGE_SITES.length})
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Lower Strip: Region Filter Tabs & Collapsible Credencial */}
        <div className="px-6 py-4 sm:px-8 sm:py-5 bg-[#F5EDE1]">
          {/* Region Filter Tabs (Clean Segmented Controls, Zero Decorative Pills) */}
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter shrines by region">
            {PILGRIMAGE_REGIONS.map((region) => {
              const isSelected = selectedRegion === region;
              const count =
                region === 'All Shrines'
                  ? VIRTUAL_PILGRIMAGE_SITES.length
                  : VIRTUAL_PILGRIMAGE_SITES.filter((s) => s.region === region).length;
              return (
                <button
                  key={region}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => {
                    setSelectedRegion(region);
                    const matching =
                      region === 'All Shrines'
                        ? VIRTUAL_PILGRIMAGE_SITES
                        : VIRTUAL_PILGRIMAGE_SITES.filter((s) => s.region === region);
                    if (matching.length > 0 && !matching.some((s) => s.id === activeSiteId)) {
                      handleSelectSite(matching[0].id);
                    }
                  }}
                  className={`rounded-md border px-3.5 py-2 text-xs font-medium transition-colors cursor-pointer ${
                    isSelected
                      ? 'border-[#1C1917] bg-[#1C1917] text-[#FBF9F5]'
                      : 'border-[#DDD0BE] bg-[#FBF8F2] text-stone-700 hover:border-[#8B5A2B] hover:text-stone-950'
                  }`}
                >
                  {region} <span className="opacity-65">({count})</span>
                </button>
              );
            })}
          </div>

        {/* Collapsible Pilgrim Passport (Credencial) & Lit Vigil Candles Ledger */}
        {showPassportPanel && (
          <div className="mt-6 rounded-lg border border-stone-300 bg-[#F4EFE6] p-5 sm:p-6 space-y-6">
            <div className="flex items-start justify-between gap-4 border-b border-stone-300/80 pb-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8B5A2B]">
                  Credencial del Peregrino
                </p>
                <h2 className="mt-1 font-cinzel text-lg sm:text-xl font-bold text-[#1C1917]">
                  Personal Pilgrim Passport &amp; Vigil Candles
                </h2>
                <p className="mt-1 font-serif text-xs sm:text-sm text-stone-700">
                  Collect spiritual stamps as you pray through each shrine and keep your vigil candle intentions gathered in one place. Stored privately on this device.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowPassportPanel(false)}
                className="rounded-md border border-stone-300 bg-[#FBF9F5] p-1.5 text-stone-600 hover:text-stone-950 cursor-pointer"
                aria-label="Close Pilgrim Passport"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Shrine Stamp Seals */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {VIRTUAL_PILGRIMAGE_SITES.map((site) => {
                const stampedDate = passport.stampedShrines[site.id];
                const visitedCount = (passport.visitedStops[site.id] || []).length;
                return (
                  <button
                    key={site.id}
                    type="button"
                    onClick={() => {
                      handleSelectSite(site.id, true);
                      setShowPassportPanel(false);
                    }}
                    className={`flex flex-col justify-between rounded-lg border p-3.5 text-left transition-colors cursor-pointer ${
                      stampedDate
                        ? 'border-[#8B5A2B]/60 bg-[#FBF9F5]'
                        : 'border-stone-300/70 bg-white/70 hover:bg-[#FBF9F5]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-mono text-[11px] text-stone-500">
                        {site.indexLabel}
                      </span>
                      {stampedDate ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#7F1D1D]">
                          <Check className="h-3.5 w-3.5" />
                          Stamped
                        </span>
                      ) : (
                        <span className="text-[11px] text-stone-500">
                          {visitedCount}/{site.stops.length} stops
                        </span>
                      )}
                    </div>
                    <p className="mt-2 font-cinzel text-xs font-bold text-[#1C1917] leading-snug">
                      {site.shortName}
                    </p>
                    <p className="mt-1 text-[11px] text-stone-600">
                      {stampedDate ? `Completed ${stampedDate}` : site.country}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Lit Vigil Candles List */}
            <div className="border-t border-stone-300/80 pt-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-cinzel text-sm font-bold text-[#1C1917] flex items-center gap-2">
                  <Flame className="h-4 w-4 text-[#B45309]" />
                  <span>Vigil Candles Lit ({passport.candles.length})</span>
                </h3>
              </div>
              {passport.candles.length === 0 ? (
                <p className="mt-2 font-serif text-xs sm:text-sm italic text-stone-600">
                  No vigil candles lit yet. Choose any shrine below and select “Light Vigil Candle” to place a personal prayer intention before the altar.
                </p>
              ) : (
                <ul className="mt-3 divide-y divide-stone-300/70 border-t border-b border-stone-300/70">
                  {passport.candles.map((candle, idx) => (
                    <li
                      key={`${candle.shrineId}-${idx}`}
                      className="flex items-start justify-between gap-3 py-3"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-[#8B5A2B]">
                          {candle.shrineName} · {candle.litAt}
                        </p>
                        <p className="mt-0.5 font-serif text-sm text-stone-800 leading-relaxed">
                          “{candle.intention}”
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveCandle(idx)}
                        className="shrink-0 rounded p-1.5 text-stone-500 hover:bg-stone-200 hover:text-stone-900 cursor-pointer"
                        title="Remove candle intention"
                        aria-label="Remove candle intention"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
        </div>
      </section>

      {/* 2. Museum Shrine Catalog Grid */}
      <section aria-label="Pilgrimage Shrines Directory" className="space-y-3">
        <div className="flex items-baseline justify-between px-1">
          <h2 className="font-cinzel text-sm font-bold uppercase tracking-[0.18em] text-[#F5EFE6]">
            Select a Sacred Destination
          </h2>
          <span className="text-xs text-stone-300">
            Showing {filteredSites.length} of {VIRTUAL_PILGRIMAGE_SITES.length}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredSites.map((site) => {
            const isSelected = site.id === activeSite.id;
            const isStamped = Boolean(passport.stampedShrines[site.id]);
            const siteCandleCount = passport.candles.filter((c) => c.shrineId === site.id).length;

            return (
              <button
                key={site.id}
                type="button"
                onClick={() => handleSelectSite(site.id, true)}
                className={`group flex flex-col overflow-hidden rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#D4AF37] bg-[#FBF9F5] ring-2 ring-[#D4AF37]/40 shadow-md'
                    : 'border-stone-200 bg-[#FBF9F5]/95 hover:border-[#8B5A2B] hover:bg-[#FBF9F5] shadow-xs'
                }`}
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-800">
                  {!failedImages[site.id] ? (
                    <img
                      src={site.imageSrc}
                      alt={site.name}
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((prev) => ({ ...prev, [site.id]: true }))
                      }
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-stone-800 px-3 text-center font-cinzel text-xs text-amber-100">
                      {site.shortName}
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2.5 font-mono text-[11px] font-semibold tracking-wider text-stone-100">
                    {site.indexLabel}
                  </span>
                  {isStamped && (
                    <span className="absolute top-2 right-2 inline-flex items-center gap-1 rounded bg-[#1C1917]/85 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-200">
                      <Check className="h-3 w-3" />
                      Stamped
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-between p-3.5">
                  <div>
                    <h3 className="font-cinzel text-sm font-bold text-[#1C1917] leading-snug group-hover:text-[#7F1D1D] transition-colors">
                      {site.shortName}
                    </h3>
                    <p className="mt-1 text-[11px] text-stone-600 leading-snug">
                      {site.country} · {site.region}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-stone-200 pt-2 text-[11px] text-stone-500">
                    <span>{site.stops.length} Guided Stops</span>
                    {siteCandleCount > 0 ? (
                      <span className="inline-flex items-center gap-1 font-medium text-[#B45309]">
                        <Flame className="h-3 w-3" />
                        {siteCandleCount}
                      </span>
                    ) : (
                      <span className="font-medium text-[#8B5A2B]">Enter →</span>
                    )}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Active Shrine Archival Exhibition & Guided Pilgrimage */}
      <article
        ref={shrineStageRef}
        className="overflow-hidden rounded-xl border border-stone-200 bg-[#FBF9F5] shadow-md"
      >
        {/* Full-Bleed Architectural Hero Photograph */}
        <figure className="border-b border-stone-200">
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-900">
            {!failedImages[activeSite.id] ? (
              <img
                src={activeSite.imageSrc}
                alt={activeSite.name}
                decoding="async"
                referrerPolicy="no-referrer"
                onError={() =>
                  setFailedImages((prev) => ({ ...prev, [activeSite.id]: true }))
                }
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-stone-900 p-8 text-center font-cinzel text-xl text-amber-100">
                {activeSite.name}
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/25 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 text-stone-50">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-200/95">
                Pilgrimage {activeSite.indexLabel} · {activeSite.region} · {activeSite.location}
              </p>
              <h2 className="mt-1.5 font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight [text-wrap:balance]">
                {activeSite.name}
              </h2>
              <p className="mt-2 max-w-2xl font-serif text-sm sm:text-base text-stone-100/95 leading-relaxed">
                {activeSite.summary}
              </p>
            </div>
          </div>
          <figcaption className="bg-[#F4EFE6] px-5 py-2.5 text-xs font-serif italic text-stone-600 sm:px-8">
            {activeSite.imageCaption}
          </figcaption>
        </figure>

        {/* Primary Pilgrimage Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 bg-[#FBF9F5] px-5 py-4 sm:px-8">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Continuous 4-Stop Guided Audio Pilgrimage */}
            <button
              type="button"
              onClick={handleToggleAutoPlay}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                isAutoPlaying
                  ? 'bg-[#7F1D1D] text-white hover:bg-[#6B1717]'
                  : 'bg-[#1C1917] text-[#FBF9F5] hover:bg-stone-800'
              }`}
            >
              {isAutoPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              <span>{isAutoPlaying ? 'Pause Audio Tour' : 'Guided Audio Tour'}</span>
            </button>

            {/* Single Stop Listen */}
            <button
              type="button"
              onClick={handleListenSingleStop}
              className="inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-white px-3.5 py-2 text-xs font-semibold text-stone-800 transition-colors hover:border-stone-500 cursor-pointer"
            >
              {isSpeakingSingle ? (
                <VolumeX className="h-3.5 w-3.5 text-[#7F1D1D]" />
              ) : (
                <Volume2 className="h-3.5 w-3.5 text-[#8B5A2B]" />
              )}
              <span>{isSpeakingSingle ? 'Stop Reading' : 'Read This Stop'}</span>
            </button>

            {/* Voice Pace Selector */}
            <div className="inline-flex items-center rounded-lg border border-stone-200 bg-[#F4EFE6] p-0.5 text-[11px]">
              {[
                { label: 'Slow', rate: 0.78 },
                { label: 'Calm', rate: 0.88 },
                { label: 'Normal', rate: 0.98 },
              ].map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => setVoiceRate(opt.rate)}
                  className={`rounded-md px-2.5 py-1 font-medium transition-colors cursor-pointer ${
                    voiceRate === opt.rate
                      ? 'bg-white text-stone-950 shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Light Vigil Candle */}
            <button
              type="button"
              onClick={() => setShowCandleComposer((prev) => !prev)}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                showCandleComposer
                  ? 'border-[#B45309] bg-amber-50 text-[#92400E]'
                  : 'border-stone-300 bg-white text-stone-800 hover:border-[#B45309] hover:text-[#92400E]'
              }`}
            >
              <Flame className="h-3.5 w-3.5 text-[#B45309]" />
              <span>
                Light Vigil Candle{currentSiteCandles.length > 0 ? ` (${currentSiteCandles.length})` : ''}
              </span>
            </button>

            {/* Stamp Pilgrim Passport */}
            <button
              type="button"
              onClick={() => handleToggleStampShrine(activeSite.id)}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                isCurrentSiteStamped
                  ? 'border-[#7F1D1D] bg-[#7F1D1D]/10 text-[#7F1D1D]'
                  : 'border-stone-300 bg-white text-stone-800 hover:border-[#7F1D1D] hover:text-[#7F1D1D]'
              }`}
            >
              <Stamp className="h-3.5 w-3.5" />
              <span>{isCurrentSiteStamped ? 'Stamped in Passport' : 'Stamp Passport'}</span>
            </button>
          </div>
        </div>

        {/* Inline Vigil Candle Prayer Intention Composer */}
        {showCandleComposer && (
          <div className="border-b border-stone-200 bg-[#F4EFE6] px-5 py-5 sm:px-8">
            <form onSubmit={handleLightCandle} className="max-w-2xl space-y-3">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="pilgrimage-candle-intention"
                  className="font-cinzel text-sm font-bold text-[#1C1917] flex items-center gap-2"
                >
                  <Flame className="h-4 w-4 text-[#B45309]" />
                  <span>Light a Vigil Candle at {activeSite.shortName}</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowCandleComposer(false)}
                  className="text-xs text-stone-500 hover:text-stone-900 cursor-pointer"
                >
                  Close
                </button>
              </div>
              <p className="font-serif text-xs sm:text-sm text-stone-700">
                Write a prayer intention for yourself, your family, the sick, or the faithful departed. Your vigil candle will remain recorded in your Pilgrim Passport.
              </p>
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  id="pilgrimage-candle-intention"
                  type="text"
                  maxLength={220}
                  value={candleIntentionInput}
                  onChange={(e) => setCandleIntentionInput(e.target.value)}
                  placeholder={`For peace, healing, and grace at ${activeSite.shortName}...`}
                  className="flex-1 rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-[#8B5A2B] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!candleIntentionInput.trim()}
                  className="rounded-lg bg-[#7F1D1D] px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#6B1717] disabled:opacity-45 cursor-pointer"
                >
                  Offer Candle
                </button>
              </div>
            </form>

            {currentSiteCandles.length > 0 && (
              <div className="mt-4 border-t border-stone-300/70 pt-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#8B5A2B]">
                  Your Candles Burning at {activeSite.shortName}
                </p>
                <ul className="mt-2 space-y-1.5">
                  {currentSiteCandles.map((c, idx) => (
                    <li
                      key={`${c.litAt}-${idx}`}
                      className="flex items-baseline gap-2 font-serif text-xs sm:text-sm text-stone-800"
                    >
                      <Flame className="h-3.5 w-3.5 shrink-0 text-[#B45309] translate-y-0.5" />
                      <span>
                        “{c.intention}”{' '}
                        <span className="text-[11px] text-stone-500">— {c.litAt}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Two-Column Editorial Workspace: Guided Itinerary (Left) + Archival Dossier & Map (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Main Guided 4-Stop Pilgrimage Column */}
          <div className="lg:col-span-7 xl:col-span-8 p-5 sm:p-8 lg:border-r lg:border-stone-200 space-y-7">
            {/* Horizontal 4-Stop Itinerary Switcher + Progress Rule */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-500">
                <span className="font-semibold uppercase tracking-[0.18em] text-[#8B5A2B]">
                  Guided Pilgrimage Walk
                </span>
                <span>
                  Stop {activeStopIndex + 1} of {activeSite.stops.length} ·{' '}
                  {visitedForCurrentSite.length}/{activeSite.stops.length} Visited
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {activeSite.stops.map((stop, idx) => {
                  const isCurrent = idx === activeStopIndex;
                  const isVisited = visitedForCurrentSite.includes(stop.id);
                  return (
                    <button
                      key={stop.id}
                      type="button"
                      onClick={() => handleSelectStop(idx)}
                      className={`rounded-lg border p-2.5 text-left transition-colors cursor-pointer ${
                        isCurrent
                          ? 'border-[#7F1D1D] bg-[#7F1D1D] text-white'
                          : 'border-stone-200 bg-[#F4EFE6]/70 text-stone-800 hover:border-[#8B5A2B] hover:bg-[#F4EFE6]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-mono font-semibold">{stop.stepNumber}</span>
                        {isVisited && !isCurrent && (
                          <Check className="h-3 w-3 text-[#8B5A2B]" />
                        )}
                      </div>
                      <p className="mt-1 line-clamp-2 font-serif text-xs font-semibold leading-snug">
                        {stop.title}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Hairline progress bar */}
              <div className="h-1 w-full overflow-hidden rounded-full bg-stone-200">
                <div
                  className="h-full bg-[#7F1D1D] transition-all duration-300"
                  style={{
                    width: `${((activeStopIndex + 1) / activeSite.stops.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Active Stop Editorial Reading Area */}
            <div className="space-y-6">
              <header className="space-y-1.5 border-b border-stone-200 pb-4">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#8B5A2B]">
                  Stop {activeStop.stepNumber} of 0{activeSite.stops.length}
                </p>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#1C1917] leading-snug [text-wrap:balance]">
                  {activeStop.title}
                </h3>
                <p className="font-serif text-sm sm:text-base italic text-stone-600">
                  {activeStop.subtitle}
                </p>
              </header>

              {/* Sacred Scripture Passage (Hairline Framed Archival Callout — No border-l-4) */}
              <blockquote className="rounded-lg border border-stone-200 bg-[#F4EFE6] p-4 sm:p-5 space-y-2">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8B5A2B]">
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>Sacred Scripture · {activeStop.scriptureRef}</span>
                </div>
                <p className="font-serif text-base sm:text-lg italic text-[#1C1917] leading-relaxed">
                  “{activeStop.scriptureText}”
                </p>
              </blockquote>

              {/* Architectural & Historical Narrative with Editorial Drop Cap */}
              <div className="max-w-prose space-y-4">
                <p className="font-serif text-base sm:text-[17px] text-stone-800 leading-[1.8] first-letter:float-left first-letter:mr-2.5 first-letter:mt-1 first-letter:font-cinzel first-letter:text-5xl first-letter:font-bold first-letter:leading-[0.82] first-letter:text-[#7F1D1D]">
                  {activeStop.narrative}
                </p>
              </div>

              {/* Spiritual Reflection */}
              <div className="border-t border-stone-200 pt-5 space-y-2 max-w-prose">
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8B5A2B]">
                  Spiritual Reflection
                </h4>
                <p className="font-serif text-sm sm:text-base text-stone-700 leading-relaxed">
                  {activeStop.spiritualReflection}
                </p>
              </div>

              {/* Stop Prayer */}
              <div className="rounded-lg border border-stone-300/90 bg-white p-5 space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-cinzel text-xs font-bold uppercase tracking-[0.18em] text-[#7F1D1D]">
                    Prayer at Stop {activeStop.stepNumber}
                  </h4>
                  <button
                    type="button"
                    onClick={handleCopyCurrentStop}
                    className="inline-flex items-center gap-1.5 rounded border border-stone-200 px-2.5 py-1 text-[11px] font-medium text-stone-600 hover:border-stone-400 hover:text-stone-900 cursor-pointer"
                  >
                    {copiedStop ? (
                      <>
                        <Check className="h-3 w-3 text-emerald-700" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3 w-3" />
                        <span>Copy Stop</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="font-serif text-sm sm:text-base text-[#1C1917] leading-relaxed">
                  {activeStop.prayer}
                </p>
              </div>

              {/* Previous / Next Stop Navigation */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stone-200 pt-5">
                <button
                  type="button"
                  disabled={activeStopIndex === 0}
                  onClick={() => handleSelectStop(Math.max(0, activeStopIndex - 1))}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-4 py-2 text-xs font-semibold text-stone-800 transition-colors hover:border-stone-500 disabled:opacity-40 cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span>Previous Stop</span>
                </button>

                {activeStopIndex < activeSite.stops.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => handleSelectStop(activeStopIndex + 1)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#1C1917] px-5 py-2 text-xs font-semibold text-[#FBF9F5] transition-colors hover:bg-stone-800 cursor-pointer"
                  >
                    <span>
                      Next Stop: {activeSite.stops[activeStopIndex + 1].stepNumber}
                    </span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                ) : (
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleSelectStop(0)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-stone-300 bg-white px-3.5 py-2 text-xs font-semibold text-stone-700 hover:border-stone-500 cursor-pointer"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>Restart Walk</span>
                    </button>
                    {!isCurrentSiteStamped && (
                      <button
                        type="button"
                        onClick={() => handleToggleStampShrine(activeSite.id)}
                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#7F1D1D] px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#6B1717] cursor-pointer"
                      >
                        <Stamp className="h-3.5 w-3.5" />
                        <span>Complete &amp; Stamp Passport</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Archival Accession Dossier, Shrine Prayer & Opt-In Interactive Map */}
          <aside className="lg:col-span-5 xl:col-span-4 bg-[#F4EFE6]/55 p-5 sm:p-7 space-y-6">
            {/* Shrine Historical Dossier */}
            <div className="space-y-3">
              <h3 className="font-cinzel text-xs font-bold uppercase tracking-[0.2em] text-[#8B5A2B]">
                Shrine Dossier
              </h3>
              <p className="font-serif text-xs sm:text-sm text-stone-700 leading-relaxed">
                {activeSite.historicalOverview}
              </p>

              <dl className="divide-y divide-stone-200 border-t border-b border-stone-200 text-xs">
                <div className="py-2.5">
                  <dt className="font-semibold uppercase tracking-wider text-[10px] text-stone-500">
                    Patron / Mystery
                  </dt>
                  <dd className="mt-0.5 font-serif text-sm text-stone-900">
                    {activeSite.patronOrMystery}
                  </dd>
                </div>
                <div className="py-2.5">
                  <dt className="font-semibold uppercase tracking-wider text-[10px] text-stone-500">
                    Location
                  </dt>
                  <dd className="mt-0.5 font-serif text-sm text-stone-900">
                    {activeSite.location}
                  </dd>
                </div>
                <div className="py-2.5">
                  <dt className="font-semibold uppercase tracking-wider text-[10px] text-stone-500">
                    Founded
                  </dt>
                  <dd className="mt-0.5 font-serif text-sm text-stone-900">
                    {activeSite.founded}
                  </dd>
                </div>
                <div className="py-2.5">
                  <dt className="font-semibold uppercase tracking-wider text-[10px] text-stone-500">
                    Principal Feast
                  </dt>
                  <dd className="mt-0.5 font-serif text-sm text-stone-900">
                    {activeSite.feastDay}
                  </dd>
                </div>
                <div className="py-2.5">
                  <dt className="font-semibold uppercase tracking-wider text-[10px] text-stone-500">
                    Pilgrim Tradition
                  </dt>
                  <dd className="mt-0.5 font-serif text-xs sm:text-sm text-stone-700 leading-relaxed">
                    {activeSite.pilgrimTradition}
                  </dd>
                </div>
                <div className="py-2.5">
                  <dt className="font-semibold uppercase tracking-wider text-[10px] text-stone-500">
                    Spiritual Note
                  </dt>
                  <dd className="mt-0.5 font-serif text-xs sm:text-sm italic text-stone-700 leading-relaxed">
                    {activeSite.spiritualGraceNote}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Concluding Shrine Prayer */}
            <div className="rounded-lg border border-stone-200 bg-[#FBF9F5] p-4 space-y-2">
              <h4 className="font-cinzel text-xs font-bold uppercase tracking-[0.16em] text-[#7F1D1D]">
                {activeSite.shrinePrayerTitle}
              </h4>
              <p className="font-serif text-xs sm:text-sm text-stone-800 leading-relaxed">
                {activeSite.shrinePrayer}
              </p>
            </div>

            {/* Official Virtual Tours & Live Shrine Portals */}
            <div className="space-y-2.5">
              <h4 className="font-cinzel text-xs font-bold uppercase tracking-[0.18em] text-[#8B5A2B]">
                Official Shrine Portals
              </h4>
              <div className="flex flex-col gap-2">
                <a
                  href={activeSite.officialTourUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between gap-2 rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-xs font-semibold text-stone-900 transition-colors hover:border-[#8B5A2B] hover:text-[#7F1D1D]"
                >
                  <span>{activeSite.officialTourLabel}</span>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[#8B5A2B]" />
                </a>
                {activeSite.secondaryPortalUrl && activeSite.secondaryPortalLabel && (
                  <a
                    href={activeSite.secondaryPortalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-between gap-2 rounded-lg border border-stone-300 bg-white px-3.5 py-2.5 text-xs font-semibold text-stone-900 transition-colors hover:border-[#8B5A2B] hover:text-[#7F1D1D]"
                  >
                    <span>{activeSite.secondaryPortalLabel}</span>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[#8B5A2B]" />
                  </a>
                )}
              </div>
            </div>

            {/* Sacred Geography & Opt-In Quota-Guarded Map */}
            <div className="space-y-3 border-t border-stone-200 pt-5">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-cinzel text-xs font-bold uppercase tracking-[0.18em] text-[#8B5A2B] flex items-center gap-1.5">
                  <Compass className="h-3.5 w-3.5" />
                  <span>Shrine Geography</span>
                </h4>
                {isMapOpen && (
                  <button
                    type="button"
                    onClick={() => setIsMapOpen(false)}
                    className="text-[11px] font-medium text-stone-500 hover:text-stone-900 cursor-pointer"
                  >
                    Hide Map
                  </button>
                )}
              </div>

              {isMapOpen && canRenderLiveMap ? (
                <APIProvider apiKey={mapsApiKey}>
                  <ShrineLiveMapInner
                    site={activeSite}
                    resolvedPlaces={resolvedPlaces}
                    onResolvePlace={handleResolvePlace}
                    mapTypeId={mapTypeId}
                    onToggleMapType={() =>
                      setMapTypeId((prev) => (prev === 'hybrid' ? 'roadmap' : 'hybrid'))
                    }
                  />
                </APIProvider>
              ) : (
                <div className="rounded-lg border border-stone-200 bg-[#FBF9F5] p-4 space-y-3">
                  <p className="font-serif text-xs text-stone-700 leading-relaxed">
                    Explore the surroundings, sanctuary plaza, and Street View of{' '}
                    <span className="font-semibold text-stone-900">{activeSite.shortName}</span> in{' '}
                    {activeSite.location}.
                  </p>
                  <div className="flex flex-col gap-2">
                    {canRenderLiveMap && (
                      <button
                        type="button"
                        onClick={() => setIsMapOpen(true)}
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1C1917] px-3.5 py-2 text-xs font-semibold text-[#FBF9F5] transition-colors hover:bg-stone-800 cursor-pointer"
                      >
                        <MapPin className="h-3.5 w-3.5 text-amber-300" />
                        <span>Open Interactive Satellite Map</span>
                      </button>
                    )}
                    <a
                      href={buildFreeGoogleMapsUrl(activeSite)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-3.5 py-2 text-xs font-semibold text-stone-800 transition-colors hover:border-[#8B5A2B] hover:text-[#7F1D1D]"
                    >
                      <MapPin className="h-3.5 w-3.5 text-[#7F1D1D]" />
                      <span>Open Shrine in Google Maps</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
};
