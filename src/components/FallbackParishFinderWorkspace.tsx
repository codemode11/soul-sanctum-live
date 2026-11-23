import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  AlertCircle,
  CalendarClock,
  Church,
  Clock,
  ExternalLink,
  Globe,
  Loader2,
  LocateFixed,
  MapPin,
  Navigation as NavigationIcon,
  Phone,
  RefreshCw,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import type {
  FallbackFilterId,
  FallbackParishItem,
  LocationSuggestionItem,
} from '../utils/parishSearchServer';

interface LatLngLiteral {
  lat: number;
  lng: number;
}

interface ParishScheduleResponse {
  parishName: string;
  scheduleMarkdown: string;
  sources: { title: string; uri: string }[];
  checkedAt: string;
}

interface ParishScheduleFallbackLinks {
  websiteUri?: string;
  masstimesUrl: string;
  googleSearchUrl: string;
}

interface ParishScheduleErrorState {
  message: string;
  isQuotaError?: boolean;
  fallbackLinks: ParishScheduleFallbackLinks;
}

const SACRAMENTAL_FILTERS: {
  id: FallbackFilterId;
  label: string;
  shortLabel: string;
}[] = [
  { id: 'all', label: 'All Catholic Parishes', shortLabel: 'All Parishes' },
  { id: 'mass', label: 'Holy Mass', shortLabel: 'Holy Mass' },
  { id: 'confession', label: 'Confession', shortLabel: 'Confession' },
  { id: 'adoration', label: 'Eucharistic Adoration', shortLabel: 'Adoration' },
  { id: 'shrines', label: 'Cathedrals & Shrines', shortLabel: 'Shrines' },
];

const RADIUS_OPTIONS = [
  { label: '5 km', meters: 5000 },
  { label: '10 km', meters: 10000 },
  { label: '25 km', meters: 25000 },
  { label: '50 km', meters: 50000 },
];

const QUICK_DESTINATIONS: { label: string; center: LatLngLiteral }[] = [
  { label: 'Vatican / Rome', center: { lat: 41.9022, lng: 12.4539 } },
  { label: 'Cebu City', center: { lat: 10.3157, lng: 123.8854 } },
  { label: 'Manila', center: { lat: 14.5915, lng: 120.9735 } },
  { label: 'New York', center: { lat: 40.7585, lng: -73.9760 } },
  { label: 'Los Angeles', center: { lat: 34.0581, lng: -118.2450 } },
  { label: 'London', center: { lat: 51.4961, lng: -0.1398 } },
];

function haversineDistanceMeters(a: LatLngLiteral, b: LatLngLiteral): number {
  const R = 6371000;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(a.lat)) *
      Math.cos(toRad(b.lat)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  return 2 * R * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

function formatDistance(meters: number | null): string {
  if (meters == null || !Number.isFinite(meters)) return '';
  const km = meters / 1000;
  const miles = meters / 1609.344;
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${km.toFixed(1)} km (${miles.toFixed(1)} mi)`;
}

function buildGoogleDirectionsUrl(
  parish: FallbackParishItem,
  origin: LatLngLiteral | null
): string {
  const params = new URLSearchParams({
    api: '1',
    destination: `${parish.location.lat},${parish.location.lng}`,
  });
  if (origin) {
    params.set('origin', `${origin.lat},${origin.lng}`);
  }
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

function buildGooglePlaceSearchUrl(parish: FallbackParishItem): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${parish.displayName} ${parish.formattedAddress}`
  )}`;
}

function escapeHtml(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const ScheduleMarkdownBlocks: React.FC<{ markdown: string }> = ({ markdown }) => {
  const lines = markdown.split(/\r?\n/);

  const renderInlineBold = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
        return (
          <strong key={i} className="font-semibold text-stone-900">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <React.Fragment key={i}>{part}</React.Fragment>;
    });
  };

  return (
    <div className="space-y-1.5 text-sm text-stone-800 leading-relaxed font-serif">
      {lines.map((rawLine, idx) => {
        const line = rawLine.trim();
        if (!line) return null;
        if (line.startsWith('### ')) {
          return (
            <h5
              key={idx}
              className="pt-2 first:pt-0 font-cinzel text-xs font-bold uppercase tracking-wider text-amber-900 border-b border-amber-200/80 pb-1"
            >
              {line.slice(4)}
            </h5>
          );
        }
        if (line.startsWith('## ')) {
          return (
            <h4 key={idx} className="pt-2 first:pt-0 font-cinzel text-sm font-bold text-stone-900">
              {line.slice(3)}
            </h4>
          );
        }
        if (line.startsWith('- ') || line.startsWith('* ')) {
          return (
            <div key={idx} className="flex items-start gap-2 pl-1">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />
              <span>{renderInlineBold(line.slice(2))}</span>
            </div>
          );
        }
        return <p key={idx}>{renderInlineBold(line)}</p>;
      })}
    </div>
  );
};

function createSanctuaryDivIcon(isSelected: boolean): L.DivIcon {
  const bg = isSelected ? '#B45309' : '#7C2D12';
  const ring = isSelected ? '#FEF3C7' : '#F59E0B';
  const size = isSelected ? 34 : 28;
  return L.divIcon({
    className: 'sanctum-osm-pin',
    html: `<div style="width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;border-radius:9999px;background:${bg};border:2.5px solid ${ring};box-shadow:0 3px 10px rgba(0,0,0,0.45);color:#FEF3C7;font-family:serif;font-weight:bold;font-size:${isSelected ? 16 : 13}px;line-height:1;">✝</div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2)],
  });
}

function createUserLocationIcon(): L.DivIcon {
  return L.divIcon({
    className: 'sanctum-osm-user-pin',
    html: `<div style="width:18px;height:18px;border-radius:9999px;background:#0284C7;border:3px solid #FFFFFF;box-shadow:0 0 0 5px rgba(14,165,233,0.28);"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

export interface FallbackParishFinderWorkspaceProps {
  noticeHeadline?: string;
  noticeDescription?: string;
}

export const FallbackParishFinderWorkspace: React.FC<FallbackParishFinderWorkspaceProps> = ({
  noticeHeadline,
  noticeDescription,
}) => {
  const [searchCenter, setSearchCenter] = useState<LatLngLiteral>(QUICK_DESTINATIONS[0].center);
  const [searchAreaLabel, setSearchAreaLabel] = useState<string>('Vatican / Rome');
  const [userLocation, setUserLocation] = useState<LatLngLiteral | null>(null);
  const [gpsLoading, setGpsLoading] = useState<boolean>(false);
  const [gpsError, setGpsError] = useState<string | null>(null);

  const [sacramentalFilter, setSacramentalFilter] = useState<FallbackFilterId>('all');
  const [radiusMeters, setRadiusMeters] = useState<number>(10000);

  const [locationInput, setLocationInput] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<LocationSuggestionItem[]>([]);
  const [suggestLoading, setSuggestLoading] = useState<boolean>(false);

  const [parishes, setParishes] = useState<FallbackParishItem[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [hasSearchedOnce, setHasSearchedOnce] = useState<boolean>(false);

  const [mapViewportCenter, setMapViewportCenter] = useState<LatLngLiteral>(
    QUICK_DESTINATIONS[0].center
  );
  const [mapPannedSinceSearch, setMapPannedSinceSearch] = useState<boolean>(false);

  const [selectedParishId, setSelectedParishId] = useState<string | null>(null);

  const [scheduleByParishId, setScheduleByParishId] = useState<
    Record<string, ParishScheduleResponse>
  >({});
  const [scheduleLoadingId, setScheduleLoadingId] = useState<string | null>(null);
  const [scheduleErrorByParishId, setScheduleErrorByParishId] = useState<
    Record<string, ParishScheduleErrorState>
  >({});

  const mapContainerRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const detailCardRef = useRef<HTMLDivElement>(null);
  const searchNonceRef = useRef<number>(0);
  const searchCenterRef = useRef<LatLngLiteral>(searchCenter);
  searchCenterRef.current = searchCenter;

  const activeFilterConfig = useMemo(
    () => SACRAMENTAL_FILTERS.find((f) => f.id === sacramentalFilter) || SACRAMENTAL_FILTERS[0],
    [sacramentalFilter]
  );

  const selectedParish = useMemo(
    () => parishes.find((p) => p.id === selectedParishId) || null,
    [parishes, selectedParishId]
  );

  // Initialize Leaflet interactive street map once
  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container || leafletMapRef.current) return;

    const map = L.map(container, {
      center: [QUICK_DESTINATIONS[0].center.lat, QUICK_DESTINATIONS[0].center.lng],
      zoom: 13,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    const layerGroup = L.layerGroup().addTo(map);
    leafletMapRef.current = map;
    markersLayerRef.current = layerGroup;

    map.on('moveend', () => {
      const c = map.getCenter();
      const next = { lat: c.lat, lng: c.lng };
      setMapViewportCenter(next);
      if (haversineDistanceMeters(searchCenterRef.current, next) > 1200) {
        setMapPannedSinceSearch(true);
      }
    });

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            map.invalidateSize({ animate: false });
          })
        : null;
    resizeObserver?.observe(container);

    return () => {
      resizeObserver?.disconnect();
      map.remove();
      leafletMapRef.current = null;
      markersLayerRef.current = null;
    };
  }, []);

  // Debounced Nominatim autocomplete suggestions via /api/parish-search
  useEffect(() => {
    const trimmed = locationInput.trim();
    if (trimmed.length < 2) {
      setSuggestions([]);
      setSuggestLoading(false);
      return;
    }

    let cancelled = false;
    const timer = window.setTimeout(async () => {
      setSuggestLoading(true);
      try {
        const bias = userLocation || searchCenterRef.current;
        const params = new URLSearchParams({
          mode: 'suggest',
          q: trimmed,
          lat: String(bias.lat),
          lng: String(bias.lng),
        });
        const res = await fetch(`/api/parish-search?${params.toString()}`);
        const data = res.ok ? await res.json() : { suggestions: [] };
        if (!cancelled) {
          setSuggestions(Array.isArray(data?.suggestions) ? data.suggestions : []);
        }
      } catch {
        if (!cancelled) setSuggestions([]);
      } finally {
        if (!cancelled) setSuggestLoading(false);
      }
    }, 260);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [locationInput, userLocation]);

  const executeParishSearch = useCallback(
    async (
      center: LatLngLiteral,
      filterId: FallbackFilterId,
      radius: number,
      areaLabel: string,
      freeQuery = ''
    ) => {
      const nonce = ++searchNonceRef.current;
      setIsSearching(true);
      setSearchError(null);
      setMapPannedSinceSearch(false);

      try {
        const params = new URLSearchParams({
          lat: String(center.lat),
          lng: String(center.lng),
          radius: String(radius),
          filter: filterId,
          areaLabel,
          ...(freeQuery ? { q: freeQuery } : {}),
        });
        const res = await fetch(`/api/parish-search?${params.toString()}`);
        const data = await res.json().catch(() => ({}));
        if (nonce !== searchNonceRef.current) return;

        if (!res.ok) {
          setSearchError(
            data?.error || 'Unable to load nearby Catholic parishes right now. Please try again.'
          );
          setParishes([]);
          setHasSearchedOnce(true);
          return;
        }

        const list: FallbackParishItem[] = Array.isArray(data?.parishes) ? data.parishes : [];
        const resolvedCenter: LatLngLiteral =
          data?.center && Number.isFinite(data.center.lat) && Number.isFinite(data.center.lng)
            ? data.center
            : center;

        if (freeQuery && data?.areaLabel) {
          setSearchAreaLabel(data.areaLabel);
          setSearchCenter(resolvedCenter);
        }

        setParishes(list);
        setHasSearchedOnce(true);

        if (list.length > 0) {
          setSelectedParishId((prev) =>
            prev && list.some((p) => p.id === prev) ? prev : list[0].id
          );
          const map = leafletMapRef.current;
          if (map) {
            const bounds = L.latLngBounds([[resolvedCenter.lat, resolvedCenter.lng]]);
            list.slice(0, 10).forEach((p) => bounds.extend([p.location.lat, p.location.lng]));
            map.fitBounds(bounds, { padding: [36, 36], maxZoom: 14 });
          }
        } else {
          setSelectedParishId(null);
          leafletMapRef.current?.setView([resolvedCenter.lat, resolvedCenter.lng], 13);
        }
      } catch {
        if (nonce !== searchNonceRef.current) return;
        setSearchError('Unable to reach the parish directory right now. Please try again.');
      } finally {
        if (nonce === searchNonceRef.current) {
          setIsSearching(false);
        }
      }
    },
    []
  );

  // Trigger initial search and re-run on coordinate/filter/radius change
  useEffect(() => {
    void executeParishSearch(searchCenter, sacramentalFilter, radiusMeters, searchAreaLabel);
  }, [searchCenter, sacramentalFilter, radiusMeters, searchAreaLabel, executeParishSearch]);

  // Sync Leaflet pins whenever parishes, selectedParishId, or userLocation changes
  useEffect(() => {
    const layer = markersLayerRef.current;
    const map = leafletMapRef.current;
    if (!layer || !map) return;

    layer.clearLayers();

    if (userLocation) {
      L.marker([userLocation.lat, userLocation.lng], {
        icon: createUserLocationIcon(),
        zIndexOffset: 1000,
      })
        .bindPopup('<strong>Your Current Location</strong>')
        .addTo(layer);
    }

    parishes.forEach((parish) => {
      const isSelected = parish.id === selectedParishId;
      const marker = L.marker([parish.location.lat, parish.location.lng], {
        icon: createSanctuaryDivIcon(isSelected),
        zIndexOffset: isSelected ? 800 : 100,
      });

      const dirUrl = buildGoogleDirectionsUrl(parish, userLocation);
      marker.bindPopup(
        `<div style="min-width:180px;max-width:230px;font-family:serif;">
          <div style="font-weight:700;font-size:13px;color:#1c1917;margin-bottom:3px;">${escapeHtml(parish.displayName)}</div>
          <div style="font-size:11px;color:#57534e;margin-bottom:6px;">${escapeHtml(parish.formattedAddress)}</div>
          <a href="${escapeHtml(dirUrl)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:3px 8px;border-radius:4px;background:#b45309;color:#fff;font-size:11px;font-weight:700;text-decoration:none;">Directions on Google Maps ↗</a>
        </div>`
      );

      marker.on('click', () => {
        setSelectedParishId(parish.id);
      });

      marker.addTo(layer);
      if (isSelected) {
        marker.openPopup();
      }
    });
  }, [parishes, selectedParishId, userLocation]);

  const handleUseMyLocation = useCallback(() => {
    setGpsError(null);
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setGpsError(
        'Geolocation is not supported by your browser. Search by city or address instead.'
      );
      return;
    }

    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(coords);
        setSearchCenter(coords);
        setSearchAreaLabel('Your Current Location');
        setLocationInput('');
        setShowSuggestions(false);
        setGpsLoading(false);
        leafletMapRef.current?.setView([coords.lat, coords.lng], 13);
      },
      (err) => {
        setGpsLoading(false);
        if (err.code === err.PERMISSION_DENIED) {
          setGpsError(
            'Location access was declined. You can search any city, ZIP code, or neighborhood below.'
          );
        } else {
          setGpsError(
            'Could not determine your GPS position right now. Try searching a city or address below.'
          );
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }, []);

  const handleSelectSuggestion = useCallback((sug: LocationSuggestionItem) => {
    const shortLabel = sug.label.split(',')[0]?.trim() || sug.label;
    setLocationInput(shortLabel);
    setShowSuggestions(false);
    setSearchAreaLabel(shortLabel);
    const next = { lat: sug.lat, lng: sug.lng };
    setSearchCenter(next);
    leafletMapRef.current?.setView([next.lat, next.lng], 13);
  }, []);

  const handleManualLocationSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = locationInput.trim();
      if (!trimmed) return;
      if (suggestions.length > 0) {
        handleSelectSuggestion(suggestions[0]);
        return;
      }
      setShowSuggestions(false);
      void executeParishSearch(searchCenter, sacramentalFilter, radiusMeters, trimmed, trimmed);
    },
    [
      locationInput,
      suggestions,
      handleSelectSuggestion,
      executeParishSearch,
      searchCenter,
      sacramentalFilter,
      radiusMeters,
    ]
  );

  const handleSearchThisArea = useCallback(() => {
    setSearchAreaLabel('Map Area');
    setSearchCenter(mapViewportCenter);
    setMapPannedSinceSearch(false);
  }, [mapViewportCenter]);

  const handleSelectParishFromList = useCallback((parish: FallbackParishItem) => {
    setSelectedParishId(parish.id);
    const map = leafletMapRef.current;
    if (map) {
      map.panTo([parish.location.lat, parish.location.lng]);
      if (map.getZoom() < 14) {
        map.setZoom(14);
      }
    }
    window.setTimeout(() => {
      detailCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 80);
  }, []);

  const handleLookupSchedule = useCallback(
    async (parish: FallbackParishItem) => {
      const isRefresh = Boolean(scheduleByParishId[parish.id]);
      setScheduleLoadingId(parish.id);
      setScheduleErrorByParishId((prev) => {
        const next = { ...prev };
        delete next[parish.id];
        return next;
      });

      const defaultFallbackLinks: ParishScheduleFallbackLinks = {
        ...(parish.websiteURI ? { websiteUri: parish.websiteURI } : {}),
        masstimesUrl: 'https://masstimes.org/',
        googleSearchUrl: `https://www.google.com/search?q=${encodeURIComponent(
          `${parish.displayName} ${parish.formattedAddress} Catholic Mass Confession Adoration times`
        )}`,
      };

      try {
        const res = await fetch('/api/parish-schedule', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            parishName: parish.displayName,
            address: parish.formattedAddress,
            websiteUri: parish.websiteURI || '',
            forceRefresh: isRefresh,
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setScheduleErrorByParishId((prev) => ({
            ...prev,
            [parish.id]: {
              message:
                data?.error ||
                'Unable to fetch published Mass and Confession times right now. Please use the direct links below.',
              isQuotaError: res.status === 429 || Boolean(data?.isQuotaError),
              fallbackLinks: data?.fallbackLinks || defaultFallbackLinks,
            },
          }));
          return;
        }
        setScheduleByParishId((prev) => ({
          ...prev,
          [parish.id]: data as ParishScheduleResponse,
        }));
      } catch (err: any) {
        setScheduleErrorByParishId((prev) => ({
          ...prev,
          [parish.id]: {
            message:
              err?.message ||
              'Unable to fetch published Mass and Confession times right now. Please check the parish website directly.',
            fallbackLinks: defaultFallbackLinks,
          },
        }));
      } finally {
        setScheduleLoadingId(null);
      }
    },
    [scheduleByParishId]
  );

  return (
    <div className="space-y-5">
      {/* Compact Non-Blocking Map Layer Notice (Quota Guard / Google Maps Key Status) */}
      {(noticeHeadline || noticeDescription) && (
        <div className="rounded-xl bg-amber-50/95 border border-amber-300/80 px-4 py-3 text-xs text-amber-950 flex items-start gap-2.5 shadow-2xs">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            {noticeHeadline && (
              <div className="font-cinzel font-bold text-amber-950">{noticeHeadline}</div>
            )}
            {noticeDescription && (
              <p className="font-serif text-stone-700 leading-relaxed">{noticeDescription}</p>
            )}
          </div>
        </div>
      )}

      {/* Search, GPS & Sacramental Filter Card */}
      <div className="rounded-xl bg-[#FAF6F0]/95 backdrop-blur-md border border-amber-300/60 shadow-xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-col sm:flex-row gap-2.5">
          <form onSubmit={handleManualLocationSubmit} className="relative flex-1">
            <Search className="w-4 h-4 text-amber-800/70 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={locationInput}
              onChange={(e) => {
                setLocationInput(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Search city, neighborhood, ZIP code, or parish..."
              aria-label="Search city, address, or parish"
              className="w-full h-11 pl-10 pr-20 rounded-lg bg-white border border-amber-900/20 focus:border-amber-700 focus:ring-2 focus:ring-amber-500/25 text-sm text-stone-900 placeholder:text-stone-500 outline-none transition-all"
            />
            {locationInput && (
              <button
                type="button"
                onClick={() => {
                  setLocationInput('');
                  setSuggestions([]);
                  setShowSuggestions(false);
                }}
                className="absolute right-16 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-stone-700 cursor-pointer"
                aria-label="Clear search text"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 h-8 px-3 rounded-md bg-amber-800 hover:bg-amber-900 text-amber-50 text-xs font-cinzel font-bold tracking-wider uppercase transition-colors cursor-pointer"
            >
              Go
            </button>

            {showSuggestions && (suggestions.length > 0 || suggestLoading) && (
              <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-30 rounded-lg bg-white border border-amber-300/80 shadow-2xl overflow-hidden">
                {suggestLoading && suggestions.length === 0 ? (
                  <div className="px-4 py-3 text-xs text-stone-500 flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-700" />
                    Searching locations...
                  </div>
                ) : (
                  <ul className="divide-y divide-stone-100 max-h-60 overflow-y-auto">
                    {suggestions.map((sug) => (
                      <li key={sug.id}>
                        <button
                          type="button"
                          onClick={() => handleSelectSuggestion(sug)}
                          className="w-full text-left px-3.5 py-2.5 hover:bg-amber-50/90 text-sm text-stone-800 flex items-center gap-2.5 transition-colors cursor-pointer"
                        >
                          <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
                          <span className="truncate">{sug.label}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </form>

          <button
            type="button"
            onClick={handleUseMyLocation}
            disabled={gpsLoading}
            className="h-11 px-4 rounded-lg bg-gradient-to-r from-[#2D1A0E] to-[#4A2B17] hover:from-[#3D2414] hover:to-[#5C361D] text-amber-100 border border-amber-500/50 text-xs font-cinzel font-bold tracking-wider uppercase flex items-center justify-center gap-2 shrink-0 shadow-md transition-all cursor-pointer disabled:opacity-60"
          >
            {gpsLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
            ) : (
              <LocateFixed className="w-4 h-4 text-amber-300" />
            )}
            <span>Use My Location</span>
          </button>
        </div>

        {userLocation && (
          <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/10 border border-emerald-700/25 text-xs text-emerald-950">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              Using your device GPS location for nearby parishes.
            </span>
            <button
              type="button"
              onClick={() => setUserLocation(null)}
              className="text-emerald-900 underline hover:text-emerald-700 font-semibold cursor-pointer"
            >
              Revoke GPS
            </button>
          </div>
        )}

        {gpsError && (
          <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-amber-100/80 border border-amber-300 text-xs text-amber-950">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>{gpsError}</span>
          </div>
        )}

        {/* Sacramental Focus Tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          {SACRAMENTAL_FILTERS.map((filter) => {
            const active = sacramentalFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setSacramentalFilter(filter.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold tracking-wide transition-all cursor-pointer border ${
                  active
                    ? 'bg-[#2C190E] text-amber-200 border-amber-500/70 shadow-sm'
                    : 'bg-white/90 text-stone-700 border-stone-300/80 hover:border-amber-600/50 hover:text-amber-900'
                }`}
              >
                {filter.shortLabel}
              </button>
            );
          })}
        </div>

        {/* Radius & Quick City Jump Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-amber-900/10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-cinzel font-bold uppercase tracking-wider text-stone-600">
              Radius:
            </span>
            <div className="inline-flex rounded-lg border border-stone-300/80 bg-white overflow-hidden">
              {RADIUS_OPTIONS.map((opt) => (
                <button
                  key={opt.meters}
                  type="button"
                  onClick={() => setRadiusMeters(opt.meters)}
                  className={`px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                    radiusMeters === opt.meters
                      ? 'bg-amber-800 text-amber-50'
                      : 'text-stone-700 hover:bg-amber-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-cinzel font-bold uppercase tracking-wider text-stone-500 mr-0.5">
              Jump to:
            </span>
            {QUICK_DESTINATIONS.map((dest) => (
              <button
                key={dest.label}
                type="button"
                onClick={() => {
                  setSearchAreaLabel(dest.label);
                  setSearchCenter(dest.center);
                  setLocationInput('');
                  setShowSuggestions(false);
                  leafletMapRef.current?.setView([dest.center.lat, dest.center.lng], 13);
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer border ${
                  searchAreaLabel === dest.label
                    ? 'bg-amber-100 border-amber-500 text-amber-950 font-semibold'
                    : 'bg-white/70 border-stone-200 text-stone-700 hover:bg-amber-50 hover:border-amber-300'
                }`}
              >
                {dest.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Map + Parish Results Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:items-stretch">
        <div className="lg:col-span-7 rounded-xl overflow-hidden border border-amber-500/40 bg-stone-900 shadow-2xl relative flex flex-col lg:h-[520px]">
          <div className="relative w-full h-[380px] sm:h-[460px] lg:h-full lg:flex-1">
            <div ref={mapContainerRef} className="w-full h-full z-0" />

            {mapPannedSinceSearch && !isSearching && (
              <button
                type="button"
                onClick={handleSearchThisArea}
                className="absolute top-3 left-1/2 -translate-x-1/2 z-10 px-3.5 py-2 rounded-full bg-[#26150B]/95 hover:bg-[#3A2112] text-amber-100 border border-amber-400/70 shadow-xl text-xs font-cinzel font-bold tracking-wider uppercase flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-amber-300" />
                Search This Map Area
              </button>
            )}

            {isSearching && (
              <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 px-3.5 py-1.5 rounded-full bg-stone-950/90 text-amber-200 border border-amber-500/50 shadow-lg text-xs flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                <span>Finding nearby parishes...</span>
              </div>
            )}
          </div>
        </div>

        {/* Scrollable Parish Directory Column */}
        <div className="lg:col-span-5 rounded-xl bg-[#FAF6F0]/95 backdrop-blur-md border border-amber-300/60 shadow-xl overflow-hidden flex flex-col max-h-[460px] sm:max-h-[520px] lg:h-[520px]">
          <div className="px-4 py-3 bg-[#26150B] text-amber-100 border-b border-amber-500/35 flex items-center justify-between gap-2 shrink-0">
            <div className="min-w-0">
              <h3 className="font-cinzel text-xs sm:text-sm font-bold tracking-wider uppercase text-amber-200 truncate">
                {activeFilterConfig.label}
              </h3>
              <p className="text-[11px] text-amber-100/75 truncate">
                {parishes.length} {parishes.length === 1 ? 'parish' : 'parishes'} near{' '}
                {searchAreaLabel}
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                void executeParishSearch(
                  searchCenter,
                  sacramentalFilter,
                  radiusMeters,
                  searchAreaLabel
                )
              }
              disabled={isSearching}
              className="p-1.5 rounded-md bg-amber-900/50 hover:bg-amber-800/70 text-amber-200 border border-amber-500/40 cursor-pointer disabled:opacity-50"
              title="Refresh nearby parishes"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSearching ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <div className="overflow-y-auto divide-y divide-amber-900/10 flex-1">
            {searchError && (
              <div className="p-5 text-center space-y-2">
                <AlertCircle className="w-6 h-6 text-amber-700 mx-auto" />
                <p className="text-xs text-stone-700 font-serif">{searchError}</p>
              </div>
            )}

            {!searchError && !isSearching && hasSearchedOnce && parishes.length === 0 && (
              <div className="p-6 text-center space-y-2">
                <Church className="w-7 h-7 text-amber-700/60 mx-auto" />
                <p className="text-sm font-cinzel font-bold text-stone-800">
                  No matching parishes found in this radius
                </p>
                <p className="text-xs text-stone-600 font-serif">
                  Try widening your search radius to 25 km or 50 km, or jump to another city above.
                </p>
              </div>
            )}

            {parishes.map((parish) => {
              const isSelected = parish.id === selectedParishId;
              return (
                <div
                  key={parish.id}
                  onClick={() => handleSelectParishFromList(parish)}
                  className={`p-3.5 transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-amber-100/85 border-l-4 border-l-amber-700'
                      : 'hover:bg-amber-50/70 border-l-4 border-l-transparent'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-cinzel text-sm font-bold text-stone-900 leading-snug">
                      {parish.displayName}
                    </h4>
                    <span className="shrink-0 text-[11px] font-semibold text-amber-900 bg-amber-200/70 px-2 py-0.5 rounded">
                      {formatDistance(parish.distanceMeters)}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 mt-1 line-clamp-2 font-serif">
                    {parish.formattedAddress}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-[11px] text-stone-600">
                      {parish.nationalPhoneNumber && (
                        <span className="truncate max-w-[140px]">{parish.nationalPhoneNumber}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <a
                        href={buildGoogleDirectionsUrl(parish, userLocation)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="px-2 py-1 rounded bg-white border border-amber-700/40 text-amber-900 hover:bg-amber-800 hover:text-amber-50 text-[10.5px] font-cinzel font-bold uppercase tracking-wider flex items-center gap-1 transition-colors"
                      >
                        <NavigationIcon className="w-3 h-3" />
                        <span>Directions</span>
                      </a>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedParishId(parish.id);
                          void handleLookupSchedule(parish);
                          window.setTimeout(() => {
                            detailCardRef.current?.scrollIntoView({
                              behavior: 'smooth',
                              block: 'nearest',
                            });
                          }, 80);
                        }}
                        className="px-2 py-1 rounded bg-[#2C190E] hover:bg-[#442716] text-amber-200 text-[10.5px] font-cinzel font-bold uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <CalendarClock className="w-3 h-3" />
                        <span>Times</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Parish Detail & Live Mass / Confession / Adoration Schedule Card */}
      {selectedParish && (
        <div
          ref={detailCardRef}
          className="rounded-xl bg-[#FDFBF7] border border-amber-400/60 shadow-2xl overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-5 bg-gradient-to-b from-[#26150B] to-[#1A0F08] text-amber-50 p-5 flex flex-col justify-between gap-4">
              <div className="space-y-3">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-cinzel font-bold uppercase tracking-widest text-amber-300 mb-1">
                    <Church className="w-3.5 h-3.5" />
                    Selected Sanctuary
                  </div>
                  <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white leading-snug">
                    {selectedParish.displayName}
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-100/80 font-serif mt-1">
                    {selectedParish.formattedAddress}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <a
                    href={buildGoogleDirectionsUrl(selectedParish, userLocation)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-cinzel font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  >
                    <NavigationIcon className="w-3.5 h-3.5" />
                    Directions on Google Maps
                  </a>

                  <a
                    href={buildGooglePlaceSearchUrl(selectedParish)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-amber-100 border border-amber-400/40 text-xs font-cinzel font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    View on Google Maps
                  </a>

                  {selectedParish.nationalPhoneNumber && (
                    <a
                      href={`tel:${selectedParish.nationalPhoneNumber.replace(/[^\d+]/g, '')}`}
                      className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-amber-100 border border-amber-400/30 text-xs font-medium flex items-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-300" />
                      <span>{selectedParish.nationalPhoneNumber}</span>
                    </a>
                  )}

                  {selectedParish.websiteURI && (
                    <a
                      href={selectedParish.websiteURI}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-amber-100 border border-amber-400/30 text-xs font-medium flex items-center gap-1.5 transition-colors"
                    >
                      <Globe className="w-3.5 h-3.5 text-amber-300" />
                      <span>Parish Website</span>
                      <ExternalLink className="w-3 h-3 opacity-75" />
                    </a>
                  )}
                </div>

                {selectedParish.weekdayDescriptions.length > 0 && (
                  <div className="pt-2 border-t border-amber-500/20 space-y-1">
                    <div className="text-[10.5px] font-cinzel font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      Listed Church Hours
                    </div>
                    <ul className="text-xs text-amber-100/80 space-y-0.5 font-serif">
                      {selectedParish.weekdayDescriptions.map((line, i) => (
                        <li key={i}>{line}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {selectedParish.osmUrl && (
                <div className="text-[10px] text-amber-200/70 border-t border-amber-500/20 pt-2">
                  Map &amp; parish directory data:{' '}
                  <a
                    href={selectedParish.osmUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-amber-100"
                  >
                    OpenStreetMap Contributors (ODbL)
                  </a>
                </div>
              )}
            </div>

            <div className="md:col-span-7 p-5 sm:p-6 flex flex-col justify-between gap-4">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-amber-200 pb-3">
                  <div>
                    <h4 className="font-cinzel text-sm sm:text-base font-bold text-stone-900 flex items-center gap-2">
                      <CalendarClock className="w-4 h-4 text-amber-800" />
                      Mass, Confession &amp; Adoration Times
                    </h4>
                    <p className="text-xs text-stone-600 font-serif mt-0.5">
                      Checks the parish&rsquo;s published website and diocesan directories via live web search.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => void handleLookupSchedule(selectedParish)}
                    disabled={scheduleLoadingId === selectedParish.id}
                    className="px-3.5 py-2 rounded-lg bg-[#2C190E] hover:bg-[#442716] text-amber-100 border border-amber-500/50 text-xs font-cinzel font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-60"
                  >
                    {scheduleLoadingId === selectedParish.id ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-300" />
                        <span>Checking Schedule...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>
                          {scheduleByParishId[selectedParish.id]
                            ? 'Refresh Times'
                            : 'Check Live Times'}
                        </span>
                      </>
                    )}
                  </button>
                </div>

                {scheduleErrorByParishId[selectedParish.id] && (
                  <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-300 text-xs text-amber-950 space-y-2.5">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">
                        {scheduleErrorByParishId[selectedParish.id].message}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 pl-6">
                      {scheduleErrorByParishId[selectedParish.id].fallbackLinks.websiteUri && (
                        <a
                          href={scheduleErrorByParishId[selectedParish.id].fallbackLinks.websiteUri}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white hover:bg-amber-100 border border-amber-300 font-semibold text-amber-950 transition-colors"
                        >
                          <Globe className="w-3 h-3 text-amber-800" />
                          <span>Parish Website</span>
                          <ExternalLink className="w-3 h-3 opacity-70" />
                        </a>
                      )}
                      <a
                        href={
                          scheduleErrorByParishId[selectedParish.id].fallbackLinks.googleSearchUrl
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white hover:bg-amber-100 border border-amber-300 font-semibold text-amber-950 transition-colors"
                      >
                        <Search className="w-3 h-3 text-amber-800" />
                        <span>Search Mass Times on Google</span>
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </a>
                      <a
                        href={scheduleErrorByParishId[selectedParish.id].fallbackLinks.masstimesUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-white hover:bg-amber-100 border border-amber-300 font-semibold text-amber-950 transition-colors"
                      >
                        <CalendarClock className="w-3 h-3 text-amber-800" />
                        <span>MassTimes.org</span>
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </a>
                    </div>
                  </div>
                )}

                {scheduleByParishId[selectedParish.id] ? (
                  <div className="space-y-4">
                    <ScheduleMarkdownBlocks
                      markdown={scheduleByParishId[selectedParish.id].scheduleMarkdown}
                    />
                    {scheduleByParishId[selectedParish.id].sources.length > 0 && (
                      <div className="pt-3 border-t border-amber-200/80 space-y-1.5">
                        <div className="text-[10.5px] font-cinzel font-bold uppercase tracking-wider text-stone-500">
                          Verified Web Sources
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {scheduleByParishId[selectedParish.id].sources.map((src, i) => (
                            <a
                              key={i}
                              href={src.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-50 hover:bg-amber-100 border border-amber-200 text-[11px] text-amber-950 transition-colors max-w-full"
                            >
                              <ExternalLink className="w-3 h-3 shrink-0 text-amber-700" />
                              <span className="truncate max-w-[220px]">{src.title}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="rounded-lg bg-amber-50/70 border border-amber-200/80 p-5 text-center space-y-2.5">
                    <CalendarClock className="w-7 h-7 text-amber-800/70 mx-auto" />
                    <p className="text-sm font-serif text-stone-700 max-w-md mx-auto">
                      Tap <strong>Check Live Times</strong> to search for{' '}
                      <strong>{selectedParish.displayName}</strong>&rsquo;s current Sunday Mass,
                      Daily Mass, Confession, and Eucharistic Adoration schedule.
                    </p>
                  </div>
                )}
              </div>

              <p className="text-[11px] text-stone-500 font-serif italic border-t border-stone-200 pt-2.5">
                Schedules can change on Holy Days of Obligation, feast days, and seasonal holidays. Always confirm with the parish website or office before traveling.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
