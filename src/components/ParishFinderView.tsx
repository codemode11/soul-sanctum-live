import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  APIProvider,
  APILoadingStatus,
  AdvancedMarker,
  AdvancedMarkerProps,
  CollisionBehavior,
  InfoWindow,
  Map as GoogleMap,
  MapCameraChangedEvent,
  Pin,
  useAdvancedMarkerRef,
  useApiIsLoaded,
  useApiLoadingStatus,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import {
  AlertCircle,
  CalendarClock,
  Car,
  Church,
  Clock,
  Compass,
  ExternalLink,
  Footprints,
  Globe,
  Loader2,
  LocateFixed,
  MapPin,
  Navigation as NavigationIcon,
  Phone,
  RefreshCw,
  Search,
  Sparkles,
  Star,
  TrainFront,
  X,
} from 'lucide-react';
import {
  isMapsQuotaError,
  notifyMapsQuotaExceeded,
  usePlaceAutocomplete,
} from '../hooks/usePlaceAutocomplete';
import {
  isGoogleMapsStopped,
  recordGoogleMapsUsage,
  useMapsQuotaGuard,
} from '../utils/mapsQuotaGuard';
import { FallbackParishFinderWorkspace } from './FallbackParishFinderWorkspace';

const ATTRIBUTION_ID = 'gmp_mcp_codeassist_v1_aistudio';
const DEMO_MAP_ID = 'DEMO_MAP_ID';

type SacramentalFilterId = 'all' | 'mass' | 'confession' | 'adoration' | 'shrines';
type TravelModeOption = 'DRIVING' | 'WALKING' | 'TRANSIT';

interface SacramentalFilterConfig {
  id: SacramentalFilterId;
  label: string;
  shortLabel: string;
  query: string;
  description: string;
}

const SACRAMENTAL_FILTERS: SacramentalFilterConfig[] = [
  {
    id: 'all',
    label: 'All Catholic Parishes',
    shortLabel: 'All Parishes',
    query: 'Roman Catholic church',
    description: 'Nearby Roman Catholic churches and parish communities',
  },
  {
    id: 'mass',
    label: 'Holy Mass',
    shortLabel: 'Holy Mass',
    query: 'Catholic church Holy Mass',
    description: 'Parishes offering Sunday & Daily Holy Mass',
  },
  {
    id: 'confession',
    label: 'Confession',
    shortLabel: 'Confession',
    query: 'Catholic church confession reconciliation',
    description: 'Catholic churches offering the Sacrament of Reconciliation',
  },
  {
    id: 'adoration',
    label: 'Eucharistic Adoration',
    shortLabel: 'Adoration',
    query: 'Catholic Eucharistic adoration chapel',
    description: 'Adoration chapels and parishes with Exposition of the Blessed Sacrament',
  },
  {
    id: 'shrines',
    label: 'Cathedrals & Shrines',
    shortLabel: 'Shrines',
    query: 'Catholic cathedral basilica shrine',
    description: 'Diocesan cathedrals, minor basilicas, and pilgrimage shrines',
  },
];

const RADIUS_OPTIONS = [
  { label: '5 km', meters: 5000 },
  { label: '10 km', meters: 10000 },
  { label: '25 km', meters: 25000 },
  { label: '50 km', meters: 50000 },
];

// Geographic starting centers ONLY (never pre-filled place data; all parishes come live from Places API New)
const QUICK_DESTINATIONS: { label: string; center: google.maps.LatLngLiteral }[] = [
  { label: 'Cebu City', center: { lat: 10.3157, lng: 123.8854 } },
  { label: 'Manila', center: { lat: 14.5915, lng: 120.9735 } },
  { label: 'Vatican / Rome', center: { lat: 41.9022, lng: 12.4539 } },
  { label: 'New York', center: { lat: 40.7585, lng: -73.9760 } },
  { label: 'London', center: { lat: 51.4961, lng: -0.1398 } },
];

interface PhotoAttributionInfo {
  displayName: string;
  uri?: string | null;
}

interface PlaceAttributionInfo {
  provider: string;
  providerURI?: string | null;
}

interface ParishResult {
  id: string;
  displayName: string;
  formattedAddress: string;
  location: google.maps.LatLngLiteral;
  businessStatus?: string | null;
  rating?: number | null;
  userRatingCount?: number | null;
  googleMapsURI?: string | null;
  nationalPhoneNumber?: string | null;
  websiteURI?: string | null;
  weekdayDescriptions: string[];
  photoUri?: string | null;
  photoAttributions: PhotoAttributionInfo[];
  attributions: PlaceAttributionInfo[];
  distanceMeters: number | null;
}

interface RouteSummary {
  distanceMeters: number;
  durationMillis: number;
  travelMode: TravelModeOption;
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

function haversineDistanceMeters(
  a: google.maps.LatLngLiteral,
  b: google.maps.LatLngLiteral
): number {
  const R = 6371000;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return 2 * R * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

function formatDistance(meters: number | null): string {
  if (meters == null || !Number.isFinite(meters)) return '';
  const km = meters / 1000;
  const miles = meters / 1609.344;
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${km.toFixed(1)} km (${miles.toFixed(1)} mi)`;
}

function formatDuration(durationMillis: number): string {
  const totalMins = Math.max(1, Math.round(durationMillis / 60000));
  if (totalMins < 60) return `${totalMins} min`;
  const hrs = Math.floor(totalMins / 60);
  const mins = totalMins % 60;
  return mins > 0 ? `${hrs} hr ${mins} min` : `${hrs} hr`;
}

function buildExternalDirectionsUrl(
  parish: ParishResult,
  origin: google.maps.LatLngLiteral | null,
  travelMode: TravelModeOption
): string {
  const modeMap: Record<TravelModeOption, string> = {
    DRIVING: 'driving',
    WALKING: 'walking',
    TRANSIT: 'transit',
  };
  const params = new URLSearchParams({
    api: '1',
    destination: `${parish.location.lat},${parish.location.lng}`,
    destination_place_id: parish.id,
    travelmode: modeMap[travelMode],
  });
  if (origin) {
    params.set('origin', `${origin.lat},${origin.lng}`);
  }
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

interface AdvancedMarkerWithRefProps extends AdvancedMarkerProps {
  onMarkerClick: (marker: google.maps.marker.AdvancedMarkerElement) => void;
}

const AdvancedMarkerWithRef: React.FC<AdvancedMarkerWithRefProps> = ({
  children,
  onMarkerClick,
  ...advancedMarkerProps
}) => {
  const [markerRef, marker] = useAdvancedMarkerRef();

  return (
    <AdvancedMarker
      ref={markerRef}
      onClick={() => {
        if (marker) {
          onMarkerClick(marker);
        }
      }}
      {...advancedMarkerProps}
    >
      {children}
    </AdvancedMarker>
  );
};

interface RouteLayerProps {
  origin: google.maps.LatLngLiteral | null;
  destination: google.maps.LatLngLiteral | null;
  travelMode: TravelModeOption;
  onRouteSummary: (summary: RouteSummary | null) => void;
  onRouteStatus: (status: { loading: boolean; error: string | null }) => void;
}

/**
 * Modern Routes API renderer via useMapsLibrary('routes') and Route.computeRoutes().
 * Replaces legacy DirectionsService / DirectionsRenderer.
 * Docs: https://developers.google.com/maps/documentation/javascript/routes?utm_campaign=gmp_mcp_codeassist_v1_aistudio
 */
const RouteLayer: React.FC<RouteLayerProps> = ({
  origin,
  destination,
  travelMode,
  onRouteSummary,
  onRouteStatus,
}) => {
  const map = useMap();
  const routesLib = useMapsLibrary('routes');
  const polylinesRef = useRef<google.maps.Polyline[]>([]);

  useEffect(() => {
    const clearPolylines = () => {
      polylinesRef.current.forEach((p) => p.setMap(null));
      polylinesRef.current = [];
    };

    clearPolylines();

    if (!routesLib || !map || !origin || !destination || isGoogleMapsStopped()) {
      onRouteSummary(null);
      onRouteStatus({ loading: false, error: null });
      return;
    }

    if (!recordGoogleMapsUsage('routes')) {
      onRouteSummary(null);
      onRouteStatus({ loading: false, error: null });
      return;
    }

    let cancelled = false;
    onRouteStatus({ loading: true, error: null });

    const request = {
      origin: { lat: origin.lat, lng: origin.lng },
      destination: { lat: destination.lat, lng: destination.lng },
      travelMode,
      fields: ['path', 'distanceMeters', 'durationMillis', 'viewport', 'legs'],
    };

    (routesLib.Route as any)
      .computeRoutes(request)
      .then((res: { routes?: any[] }) => {
        if (cancelled) return;
        const primaryRoute = res?.routes?.[0];
        if (!primaryRoute) {
          onRouteSummary(null);
          onRouteStatus({
            loading: false,
            error: 'No direct route available for this travel mode. Try switching travel mode or opening Google Maps.',
          });
          return;
        }

        const newPolylines: google.maps.Polyline[] =
          typeof primaryRoute.createPolylines === 'function'
            ? primaryRoute.createPolylines()
            : [];

        newPolylines.forEach((polyline) => {
          polyline.setOptions({
            strokeColor: '#D97706',
            strokeOpacity: 0.92,
            strokeWeight: 5,
          });
          polyline.setMap(map);
        });
        polylinesRef.current = newPolylines;

        if (primaryRoute.viewport) {
          map.fitBounds(primaryRoute.viewport, 48);
        }

        onRouteSummary({
          distanceMeters: Number(primaryRoute.distanceMeters ?? 0),
          durationMillis: Number(primaryRoute.durationMillis ?? 0),
          travelMode,
        });
        onRouteStatus({ loading: false, error: null });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        if (isMapsQuotaError(err)) {
          notifyMapsQuotaExceeded();
        }
        onRouteSummary(null);
        onRouteStatus({
          loading: false,
          error: 'Unable to calculate an in-map route for this mode. You can still launch turn-by-turn navigation in Google Maps.',
        });
      });

    return () => {
      cancelled = true;
      clearPolylines();
    };
  }, [routesLib, map, origin?.lat, origin?.lng, destination?.lat, destination?.lng, travelMode, onRouteSummary, onRouteStatus]);

  return null;
};

/**
 * Safely renders structured Markdown headings & bullet items from /api/parish-schedule
 * using pure React elements (no raw HTML injection).
 */
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

interface ParishFinderWorkspaceProps {
  defaultCenter: google.maps.LatLngLiteral;
}

const ParishFinderWorkspace: React.FC<ParishFinderWorkspaceProps> = ({ defaultCenter }) => {
  const map = useMap();
  const placesLib = useMapsLibrary('places');
  const coreLib = useMapsLibrary('core');
  const isApiLoaded = useApiIsLoaded();
  const loadingStatus = useApiLoadingStatus();

  const [searchCenter, setSearchCenter] = useState<google.maps.LatLngLiteral>(defaultCenter);
  const [searchAreaLabel, setSearchAreaLabel] = useState<string>(QUICK_DESTINATIONS[0].label);
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsError, setGpsError] = useState<string | null>(null);

  const [sacramentalFilter, setSacramentalFilter] = useState<SacramentalFilterId>('all');
  const [radiusMeters, setRadiusMeters] = useState<number>(10000);
  const [openNowOnly, setOpenNowOnly] = useState<boolean>(false);

  const [locationInput, setLocationInput] = useState<string>('');
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const { suggestions, isLoading: autocompleteLoading, resetSession } = usePlaceAutocomplete(
    locationInput,
    userLocation || searchCenter
  );

  const [parishes, setParishes] = useState<ParishResult[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [hasSearchedOnce, setHasSearchedOnce] = useState<boolean>(false);

  const [mapViewportCenter, setMapViewportCenter] = useState<google.maps.LatLngLiteral>(defaultCenter);
  const [mapPannedSinceSearch, setMapPannedSinceSearch] = useState<boolean>(false);

  const [selectedParishId, setSelectedParishId] = useState<string | null>(null);
  const [hoveredParishId, setHoveredParishId] = useState<string | null>(null);
  const [infoWindowMarker, setInfoWindowMarker] =
    useState<google.maps.marker.AdvancedMarkerElement | null>(null);
  const [showInfoWindow, setShowInfoWindow] = useState<boolean>(false);

  // Live in-map routing state
  const [routingTargetId, setRoutingTargetId] = useState<string | null>(null);
  const [travelMode, setTravelMode] = useState<TravelModeOption>('DRIVING');
  const [routeSummary, setRouteSummary] = useState<RouteSummary | null>(null);
  const [routeStatus, setRouteStatus] = useState<{ loading: boolean; error: string | null }>({
    loading: false,
    error: null,
  });

  // On-demand web-grounded schedule state (keyed by parish Place ID using plain Record to avoid Map shadowing)
  const [scheduleByParishId, setScheduleByParishId] = useState<Record<string, ParishScheduleResponse>>({});
  const [scheduleLoadingId, setScheduleLoadingId] = useState<string | null>(null);
  const [scheduleErrorByParishId, setScheduleErrorByParishId] = useState<Record<string, ParishScheduleErrorState>>({});

  const detailCardRef = useRef<HTMLDivElement>(null);
  const searchNonceRef = useRef<number>(0);

  const activeFilterConfig = useMemo(
    () => SACRAMENTAL_FILTERS.find((f) => f.id === sacramentalFilter) || SACRAMENTAL_FILTERS[0],
    [sacramentalFilter]
  );

  const selectedParish = useMemo(
    () => parishes.find((p) => p.id === selectedParishId) || null,
    [parishes, selectedParishId]
  );

  const routingParish = useMemo(
    () => parishes.find((p) => p.id === routingTargetId) || null,
    [parishes, routingTargetId]
  );

  const executeParishSearch = useCallback(
    async (
      center: google.maps.LatLngLiteral,
      filterId: SacramentalFilterId,
      radius: number,
      isOpenNow: boolean,
      areaName?: string
    ) => {
      if (!placesLib || isGoogleMapsStopped()) return;
      if (!recordGoogleMapsUsage('places')) return;

      const nonce = ++searchNonceRef.current;
      setIsSearching(true);
      setSearchError(null);
      setMapPannedSinceSearch(false);

      const filterCfg = SACRAMENTAL_FILTERS.find((f) => f.id === filterId) || SACRAMENTAL_FILTERS[0];
      const clampedRadius = Math.min(Math.max(radius, 1000), 50000);

      try {
        const request: any = {
          textQuery: areaName ? `${filterCfg.query} near ${areaName}` : filterCfg.query,
          fields: [
            'id',
            'displayName',
            'formattedAddress',
            'location',
            'businessStatus',
            'rating',
            'userRatingCount',
            'regularOpeningHours',
            'googleMapsURI',
            'nationalPhoneNumber',
            'websiteURI',
            'photos',
            'attributions',
          ],
          locationBias: {
            center,
            radius: clampedRadius,
          },
          maxResultCount: 16,
          language: 'en-US',
          internalUsageAttributionIds: [ATTRIBUTION_ID],
          ...(isOpenNow ? { isOpenNow: true } : {}),
        };

        const { places } = await placesLib.Place.searchByText(request);
        if (nonce !== searchNonceRef.current) return;

        const refPoint = userLocation || center;
        const normalized: ParishResult[] = (places || [])
          .filter((p) => Boolean(p?.id && p?.location))
          .map((p) => {
            const locObj = p.location!;
            const lat = typeof locObj.lat === 'function' ? locObj.lat() : Number((locObj as any).lat);
            const lng = typeof locObj.lng === 'function' ? locObj.lng() : Number((locObj as any).lng);
            const coords = { lat, lng };
            const firstPhoto = p.photos?.[0];
            let photoUri: string | null = null;
            const photoAttributions: PhotoAttributionInfo[] = [];

            if (firstPhoto && typeof firstPhoto.getURI === 'function') {
              try {
                photoUri = firstPhoto.getURI({ maxWidth: 800, maxHeight: 800 });
              } catch {
                photoUri = null;
              }
              if (Array.isArray(firstPhoto.authorAttributions)) {
                firstPhoto.authorAttributions.forEach((attr) => {
                  if (attr?.displayName) {
                    photoAttributions.push({
                      displayName: attr.displayName,
                      uri: attr.uri,
                    });
                  }
                });
              }
            }

            const attributions: PlaceAttributionInfo[] = Array.isArray(p.attributions)
              ? p.attributions
                  .filter((a) => Boolean(a?.provider))
                  .map((a) => ({
                    provider: a.provider!,
                    providerURI: a.providerURI,
                  }))
              : [];

            return {
              id: p.id,
              displayName: p.displayName || 'Catholic Parish',
              formattedAddress: p.formattedAddress || 'Address available on Google Maps',
              location: coords,
              businessStatus: p.businessStatus ?? null,
              rating: p.rating ?? null,
              userRatingCount: p.userRatingCount ?? null,
              googleMapsURI: p.googleMapsURI ?? null,
              nationalPhoneNumber: p.nationalPhoneNumber ?? null,
              websiteURI: p.websiteURI ?? null,
              weekdayDescriptions: p.regularOpeningHours?.weekdayDescriptions ?? [],
              photoUri,
              photoAttributions,
              attributions,
              distanceMeters: haversineDistanceMeters(refPoint, coords),
            };
          })
          .sort((a, b) => (a.distanceMeters ?? Infinity) - (b.distanceMeters ?? Infinity));

        setParishes(normalized);
        setHasSearchedOnce(true);

        if (normalized.length > 0) {
          setSelectedParishId((prev) =>
            prev && normalized.some((item) => item.id === prev) ? prev : normalized[0].id
          );
          if (map && coreLib) {
            const bounds = new coreLib.LatLngBounds();
            bounds.extend(center);
            normalized.slice(0, 10).forEach((item) => bounds.extend(item.location));
            map.fitBounds(bounds, 56);
          }
        } else {
          setSelectedParishId(null);
          setShowInfoWindow(false);
        }
      } catch (err) {
        if (nonce !== searchNonceRef.current) return;
        console.error('[ParishFinder] Place.searchByText error:', err);
        if (isMapsQuotaError(err)) {
          notifyMapsQuotaExceeded();
          setSearchError('Google Maps search quota has been reached for today.');
        } else {
          setSearchError('Unable to load nearby Catholic parishes right now. Please try searching again.');
        }
      } finally {
        if (nonce === searchNonceRef.current) {
          setIsSearching(false);
        }
      }
    },
    [placesLib, coreLib, map, userLocation]
  );

  // Trigger initial search and re-run whenever searchCenter, filter, radius, or openNowOnly changes
  useEffect(() => {
    if (!isApiLoaded || !placesLib) return;
    setRoutingTargetId(null);
    setRouteSummary(null);
    void executeParishSearch(searchCenter, sacramentalFilter, radiusMeters, openNowOnly, searchAreaLabel);
  }, [isApiLoaded, placesLib, searchCenter, sacramentalFilter, radiusMeters, openNowOnly, searchAreaLabel, executeParishSearch]);

  // Explicit user-initiated GPS location consent
  const handleUseMyLocation = useCallback(() => {
    setGpsError(null);
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setGpsError('Geolocation is not supported by your browser. Search by city or address instead.');
      return;
    }

    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: google.maps.LatLngLiteral = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(coords);
        setSearchCenter(coords);
        setSearchAreaLabel('Your Current Location');
        setLocationInput('');
        setShowSuggestions(false);
        setGpsLoading(false);
        if (map) {
          map.panTo(coords);
          map.setZoom(13);
        }
      },
      (err) => {
        setGpsLoading(false);
        if (err.code === err.PERMISSION_DENIED) {
          setGpsError('Location access was declined. You can search any city, ZIP code, or neighborhood below.');
        } else {
          setGpsError('Could not determine your GPS position right now. Try searching a city or address below.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  }, [map]);

  const handleClearUserLocation = useCallback(() => {
    setUserLocation(null);
    setRoutingTargetId(null);
    setRouteSummary(null);
  }, []);

  const handleSelectAutocompleteSuggestion = useCallback(
    async (suggestion: google.maps.places.AutocompleteSuggestion) => {
      if (!placesLib || !suggestion.placePrediction) return;
      try {
        const place = suggestion.placePrediction.toPlace();
        await place.fetchFields({
          fields: ['displayName', 'formattedAddress', 'location', 'viewport'],
        });

        const label =
          place.displayName ||
          place.formattedAddress ||
          suggestion.placePrediction.text?.text ||
          'Selected Area';

        setLocationInput(label);
        setShowSuggestions(false);
        resetSession();

        if (place.location) {
          const lat =
            typeof place.location.lat === 'function'
              ? place.location.lat()
              : Number((place.location as any).lat);
          const lng =
            typeof place.location.lng === 'function'
              ? place.location.lng()
              : Number((place.location as any).lng);
          const nextCenter = { lat, lng };
          setSearchAreaLabel(label);
          setSearchCenter(nextCenter);
          if (map) {
            if (place.viewport) {
              map.fitBounds(place.viewport);
            } else {
              map.panTo(nextCenter);
              map.setZoom(13);
            }
          }
        }
      } catch (err) {
        if (isMapsQuotaError(err)) {
          notifyMapsQuotaExceeded();
        }
        setSearchError('Unable to look up that location. Please choose another suggestion.');
      }
    },
    [placesLib, map, resetSession]
  );

  const handleManualLocationSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const trimmed = locationInput.trim();
      if (!trimmed) return;
      if (suggestions.length > 0) {
        await handleSelectAutocompleteSuggestion(suggestions[0]);
        return;
      }
      // Fallback: run Place.searchByText directly with the user's text query
      setShowSuggestions(false);
      setSearchAreaLabel(trimmed);
      void executeParishSearch(searchCenter, sacramentalFilter, radiusMeters, openNowOnly, trimmed);
    },
    [
      locationInput,
      suggestions,
      handleSelectAutocompleteSuggestion,
      executeParishSearch,
      searchCenter,
      sacramentalFilter,
      radiusMeters,
      openNowOnly,
    ]
  );

  const handleCameraChanged = useCallback(
    (ev: MapCameraChangedEvent) => {
      const nextCenter = ev.detail.center;
      if (!nextCenter) return;
      setMapViewportCenter(nextCenter);
      const movedMeters = haversineDistanceMeters(searchCenter, nextCenter);
      if (movedMeters > 1200) {
        setMapPannedSinceSearch(true);
      }
    },
    [searchCenter]
  );

  const handleSearchThisArea = useCallback(() => {
    setSearchAreaLabel('Map Area');
    setSearchCenter(mapViewportCenter);
    setMapPannedSinceSearch(false);
  }, [mapViewportCenter]);

  const handleSelectParishFromList = useCallback(
    (parish: ParishResult) => {
      setSelectedParishId(parish.id);
      setShowInfoWindow(false);
      if (map) {
        map.panTo(parish.location);
        if ((map.getZoom() ?? 12) < 14) {
          map.setZoom(14);
        }
      }
      window.setTimeout(() => {
        detailCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 80);
    },
    [map]
  );

  const handleLookupSchedule = useCallback(async (parish: ParishResult) => {
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
      googleSearchUrl: `https://www.google.com/search?q=${encodeURIComponent(`${parish.displayName} ${parish.formattedAddress} Catholic Mass Confession Adoration times`)}`,
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
            'Unable to fetch published Mass and Confession times right now. Please check the parish website or phone number.',
          fallbackLinks: defaultFallbackLinks,
        },
      }));
    } finally {
      setScheduleLoadingId(null);
    }
  }, [scheduleByParishId]);

  // Sort markers by descending latitude so southern pins render cleanly above northern ones
  const sortedMarkers = useMemo(
    () =>
      [...parishes]
        .sort((a, b) => b.location.lat - a.location.lat)
        .map((parish, idx) => ({ parish, baseZ: idx + 1 })),
    [parishes]
  );

  const routeOrigin = userLocation || searchCenter;

  if (loadingStatus === APILoadingStatus.FAILED || loadingStatus === APILoadingStatus.AUTH_FAILURE) {
    return (
      <div className="rounded-xl bg-[#FDFBF7] border border-amber-300/70 p-6 text-center space-y-3 shadow-lg">
        <AlertCircle className="w-8 h-8 text-amber-700 mx-auto" />
        <h3 className="font-cinzel text-lg font-bold text-stone-900">
          Unable to Load Interactive Parish Map
        </h3>
        <p className="text-sm text-stone-700 max-w-lg mx-auto font-serif">
          Google Maps Platform could not be initialized right now. Please check your network connection or API configuration and try again.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Search, GPS & Sacramental Filter Card */}
      <div className="rounded-xl bg-[#FAF6F0]/95 backdrop-blur-md border border-amber-300/60 shadow-xl p-4 sm:p-5 space-y-4">
        {/* Location Search Bar + GPS Button */}
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
                  resetSession();
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

            {/* Places API (New) Autocomplete Dropdown */}
            {showSuggestions && (suggestions.length > 0 || autocompleteLoading) && (
              <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-30 rounded-lg bg-white border border-amber-300/80 shadow-2xl overflow-hidden">
                {autocompleteLoading && suggestions.length === 0 ? (
                  <div className="px-4 py-3 text-xs text-stone-500 flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-700" />
                    Searching locations...
                  </div>
                ) : (
                  <ul className="divide-y divide-stone-100 max-h-60 overflow-y-auto">
                    {suggestions.map((suggestion, index) => {
                      const label = suggestion.placePrediction?.text?.text || '';
                      if (!label) return null;
                      return (
                        <li key={suggestion.placePrediction?.placeId || index}>
                          <button
                            type="button"
                            onClick={() => void handleSelectAutocompleteSuggestion(suggestion)}
                            className="w-full text-left px-3.5 py-2.5 hover:bg-amber-50/90 text-sm text-stone-800 flex items-center gap-2.5 transition-colors cursor-pointer"
                          >
                            <MapPin className="w-4 h-4 text-amber-700 shrink-0" />
                            <span className="truncate">{label}</span>
                          </button>
                        </li>
                      );
                    })}
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

        {/* GPS Status or Error Feedback */}
        {userLocation && (
          <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 rounded-lg bg-emerald-950/10 border border-emerald-700/25 text-xs text-emerald-950">
            <span className="flex items-center gap-1.5 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              Using your device GPS location for nearby parishes &amp; live routes.
            </span>
            <button
              type="button"
              onClick={handleClearUserLocation}
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

        {/* Radius, Open Now & Quick Pilgrimage/City Jump Row */}
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

            <label className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white border border-stone-300/80 text-xs text-stone-800 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={openNowOnly}
                onChange={(e) => setOpenNowOnly(e.target.checked)}
                className="accent-amber-800 rounded"
              />
              <span>Open Now</span>
            </label>
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
                  if (map) {
                    map.panTo(dest.center);
                    map.setZoom(13);
                  }
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Interactive Google Map Column */}
        <div className="lg:col-span-7 rounded-xl overflow-hidden border border-amber-500/40 bg-stone-900 shadow-2xl relative">
          {/* Explicit height required (CF2) so Google Map never collapses */}
          <div className="relative w-full h-[380px] sm:h-[460px]">
            <GoogleMap
              mapId={DEMO_MAP_ID}
              defaultCenter={defaultCenter}
              defaultZoom={13}
              gestureHandling="greedy"
              streetViewControl={false}
              mapTypeControl={false}
              fullscreenControl={true}
              onCameraChanged={handleCameraChanged}
              onClick={() => setShowInfoWindow(false)}
              internalUsageAttributionIds={[ATTRIBUTION_ID]}
              style={{ width: '100%', height: '100%' }}
            >
              {/* User GPS Location Beacon */}
              {userLocation && (
                <AdvancedMarker
                  position={userLocation}
                  title="Your Current Location"
                  zIndex={1200}
                >
                  <div className="relative flex items-center justify-center">
                    <span className="absolute w-7 h-7 rounded-full bg-sky-500/35 animate-ping" />
                    <span className="w-4 h-4 rounded-full bg-sky-600 border-2 border-white shadow-md" />
                  </div>
                </AdvancedMarker>
              )}

              {/* Live Catholic Parish Pins from Places API (New) */}
              {sortedMarkers.map(({ parish, baseZ }) => {
                const isSelected = parish.id === selectedParishId;
                const isHovered = parish.id === hoveredParishId;
                const zIndex = isSelected ? 1000 : isHovered ? 950 : baseZ;

                return (
                  <AdvancedMarkerWithRef
                    key={parish.id}
                    position={parish.location}
                    title={parish.displayName}
                    zIndex={zIndex}
                    collisionBehavior={
                      isSelected
                        ? CollisionBehavior.REQUIRED
                        : CollisionBehavior.OPTIONAL_AND_HIDES_LOWER_PRIORITY
                    }
                    onMouseEnter={() => setHoveredParishId(parish.id)}
                    onMouseLeave={() => setHoveredParishId(null)}
                    onMarkerClick={(marker) => {
                      setSelectedParishId(parish.id);
                      setInfoWindowMarker(marker);
                      setShowInfoWindow(true);
                    }}
                  >
                    <Pin
                      background={isSelected ? '#B45309' : '#7C2D12'}
                      borderColor={isSelected ? '#FEF3C7' : '#F59E0B'}
                      glyphColor="#FEF3C7"
                      scale={isSelected ? 1.25 : 1.0}
                    />
                  </AdvancedMarkerWithRef>
                );
              })}

              {/* Anchored InfoWindow for Clicked Pin */}
              {showInfoWindow && infoWindowMarker && selectedParish && (
                <InfoWindow
                  anchor={infoWindowMarker}
                  onCloseClick={() => setShowInfoWindow(false)}
                >
                  <div className="max-w-[230px] p-0.5 text-stone-900 space-y-1.5">
                    <h4 className="font-cinzel text-xs font-bold text-stone-950 leading-snug">
                      {selectedParish.displayName}
                    </h4>
                    <p className="text-[11px] text-stone-600 leading-snug">
                      {selectedParish.formattedAddress}
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => {
                          setRoutingTargetId(selectedParish.id);
                          setShowInfoWindow(false);
                        }}
                        className="px-2 py-1 rounded bg-amber-800 hover:bg-amber-900 text-amber-50 text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                      >
                        Route Here
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowInfoWindow(false);
                          detailCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        }}
                        className="px-2 py-1 rounded bg-stone-100 hover:bg-stone-200 text-stone-800 text-[10px] font-bold uppercase tracking-wider cursor-pointer"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </InfoWindow>
              )}

              {/* Modern Routes API Polyline Layer */}
              {routingParish && (
                <RouteLayer
                  origin={routeOrigin}
                  destination={routingParish.location}
                  travelMode={travelMode}
                  onRouteSummary={setRouteSummary}
                  onRouteStatus={setRouteStatus}
                />
              )}
            </GoogleMap>

            {/* Floating "Search This Area" Button after Panning */}
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

            {/* Loading Overlay Pill */}
            {isSearching && (
              <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 px-3.5 py-1.5 rounded-full bg-stone-950/90 text-amber-200 border border-amber-500/50 shadow-lg text-xs flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                <span>Finding nearby parishes...</span>
              </div>
            )}
          </div>

          {/* Active Route Bar under Map */}
          {routingParish && (
            <div className="bg-[#1C110A] border-t border-amber-500/30 px-4 py-3 text-amber-100 flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-0.5 min-w-0">
                <div className="text-[10px] font-cinzel uppercase tracking-widest text-amber-400">
                  Route to {routingParish.displayName}
                </div>
                {routeStatus.loading ? (
                  <div className="text-xs text-stone-300 flex items-center gap-1.5">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-300" />
                    Calculating route...
                  </div>
                ) : routeStatus.error ? (
                  <div className="text-xs text-amber-200/90">{routeStatus.error}</div>
                ) : routeSummary ? (
                  <div className="text-sm font-semibold text-white flex items-center gap-2">
                    <span>{formatDuration(routeSummary.durationMillis)}</span>
                    <span className="text-amber-400/70">•</span>
                    <span className="text-amber-200">{formatDistance(routeSummary.distanceMeters)}</span>
                  </div>
                ) : null}
              </div>

              <div className="flex items-center gap-1.5 flex-wrap">
                {(
                  [
                    { id: 'DRIVING', label: 'Drive', Icon: Car },
                    { id: 'WALKING', label: 'Walk', Icon: Footprints },
                    { id: 'TRANSIT', label: 'Transit', Icon: TrainFront },
                  ] as const
                ).map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setTravelMode(id)}
                    className={`px-2.5 py-1.5 rounded-md text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer border ${
                      travelMode === id
                        ? 'bg-amber-700 text-white border-amber-400'
                        : 'bg-stone-900/80 text-stone-300 border-stone-700 hover:border-amber-500/60'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{label}</span>
                  </button>
                ))}

                <a
                  href={buildExternalDirectionsUrl(routingParish, userLocation, travelMode)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 rounded-md bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <NavigationIcon className="w-3.5 h-3.5" />
                  <span>Open Maps</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setRoutingTargetId(null);
                    setRouteSummary(null);
                  }}
                  className="p-1.5 rounded-md text-stone-400 hover:text-white hover:bg-stone-800 cursor-pointer"
                  aria-label="Clear route"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Scrollable Parish Directory Column */}
        <div className="lg:col-span-5 rounded-xl bg-[#FAF6F0]/95 backdrop-blur-md border border-amber-300/60 shadow-xl overflow-hidden flex flex-col max-h-[460px] sm:max-h-[520px]">
          <div className="px-4 py-3 bg-[#26150B] text-amber-100 border-b border-amber-500/35 flex items-center justify-between gap-2 shrink-0">
            <div className="min-w-0">
              <h3 className="font-cinzel text-xs sm:text-sm font-bold tracking-wider uppercase text-amber-200 truncate">
                {activeFilterConfig.label}
              </h3>
              <p className="text-[11px] text-amber-100/75 truncate">
                {parishes.length} {parishes.length === 1 ? 'parish' : 'parishes'} near {searchAreaLabel}
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                void executeParishSearch(
                  searchCenter,
                  sacramentalFilter,
                  radiusMeters,
                  openNowOnly,
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
                  Try widening your search radius to 25 km or 50 km, turning off &ldquo;Open Now,&rdquo; or switching to &ldquo;All Parishes.&rdquo;
                </p>
              </div>
            )}

            {parishes.map((parish) => {
              const isSelected = parish.id === selectedParishId;
              const isRouting = parish.id === routingTargetId;

              return (
                <div
                  key={parish.id}
                  onClick={() => handleSelectParishFromList(parish)}
                  onMouseEnter={() => setHoveredParishId(parish.id)}
                  onMouseLeave={() => setHoveredParishId(null)}
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
                    {parish.distanceMeters != null && (
                      <span className="shrink-0 text-[11px] font-semibold text-amber-900 bg-amber-200/70 px-2 py-0.5 rounded">
                        {formatDistance(parish.distanceMeters)}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-stone-600 mt-1 line-clamp-2 font-serif">
                    {parish.formattedAddress}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-[11px] text-stone-600">
                      {parish.rating != null && (
                        <span className="inline-flex items-center gap-1 font-medium text-amber-900">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          {parish.rating.toFixed(1)}
                          {parish.userRatingCount ? ` (${parish.userRatingCount})` : ''}
                        </span>
                      )}
                      {parish.nationalPhoneNumber && (
                        <span className="truncate max-w-[130px]">{parish.nationalPhoneNumber}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedParishId(parish.id);
                          setRoutingTargetId(parish.id);
                        }}
                        className={`px-2 py-1 rounded text-[10.5px] font-cinzel font-bold uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer ${
                          isRouting
                            ? 'bg-amber-800 text-amber-50'
                            : 'bg-white border border-amber-700/40 text-amber-900 hover:bg-amber-800 hover:text-amber-50'
                        }`}
                      >
                        <Compass className="w-3 h-3" />
                        <span>Route</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedParishId(parish.id);
                          void handleLookupSchedule(parish);
                          window.setTimeout(() => {
                            detailCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
            {/* Parish Overview + Photo */}
            <div className="md:col-span-5 bg-gradient-to-b from-[#26150B] to-[#1A0F08] text-amber-50 p-5 flex flex-col justify-between gap-4">
              <div className="space-y-3">
                {selectedParish.photoUri && (
                  <div className="space-y-1">
                    <div className="relative w-full rounded-lg overflow-hidden border border-amber-500/30 bg-[#120A05] flex items-center justify-center">
                      <img
                        src={selectedParish.photoUri}
                        alt={selectedParish.displayName}
                        className="w-full h-auto max-h-[340px] object-contain"
                        loading="lazy"
                      />
                    </div>
                    {selectedParish.photoAttributions.length > 0 && (
                      <div className="text-[10px] text-amber-200/70">
                        Photo:{' '}
                        {selectedParish.photoAttributions.map((attr, idx) => (
                          <React.Fragment key={idx}>
                            {idx > 0 && ', '}
                            {attr.uri ? (
                              <a
                                href={attr.uri}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:text-amber-100"
                              >
                                {attr.displayName}
                              </a>
                            ) : (
                              attr.displayName
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    )}
                  </div>
                )}

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

                {/* Contact & Quick Action Buttons */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setRoutingTargetId(selectedParish.id)}
                    className="px-3 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-cinzel font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    Show Route on Map
                  </button>

                  <a
                    href={
                      selectedParish.googleMapsURI ||
                      buildExternalDirectionsUrl(selectedParish, userLocation, travelMode)
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-amber-100 border border-amber-400/40 text-xs font-cinzel font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                  >
                    <NavigationIcon className="w-3.5 h-3.5" />
                    Google Maps
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

                {/* Published Church Opening Hours from Google Maps */}
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

              {/* Required Place Attributions when returned by Google Places API */}
              {selectedParish.attributions.length > 0 && (
                <div className="text-[10px] text-amber-200/70 border-t border-amber-500/20 pt-2">
                  Place data attributions:{' '}
                  {selectedParish.attributions.map((attr, idx) => (
                    <React.Fragment key={idx}>
                      {idx > 0 && ' · '}
                      {attr.providerURI ? (
                        <a
                          href={attr.providerURI}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline hover:text-amber-100"
                        >
                          {attr.provider}
                        </a>
                      ) : (
                        attr.provider
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>

            {/* Live Mass, Confession & Adoration Schedule Panel */}
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
                        href={scheduleErrorByParishId[selectedParish.id].fallbackLinks.googleSearchUrl}
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
                      <strong>{selectedParish.displayName}</strong>&rsquo;s current Sunday Mass, Daily Mass, Confession, and Eucharistic Adoration schedule.
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

      {/* Discreet Google Maps End-User Terms & Privacy Notice */}
      <div className="text-center text-[11px] text-amber-100/75 px-3">
        Interactive parish maps, place details, and routes are powered by Google Maps Platform. Use is subject to the{' '}
        <a
          href="https://maps.google.com/help/terms_maps/?utm_campaign=gmp_mcp_codeassist_v1_aistudio"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-amber-200"
        >
          Google Maps Additional Terms of Service
        </a>{' '}
        and{' '}
        <a
          href="https://policies.google.com/privacy?utm_campaign=gmp_mcp_codeassist_v1_aistudio"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-amber-200"
        >
          Google Privacy Policy
        </a>
        . Device GPS location is only accessed when you tap &ldquo;Use My Location.&rdquo;
      </div>
    </div>
  );
};

export const ParishFinderView: React.FC = () => {
  const [mapsApiKey, setMapsApiKey] = useState<string>(
    () => (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined)?.trim() || ''
  );
  const [serverPaused, setServerPaused] = useState<boolean>(false);
  const [configChecked, setConfigChecked] = useState<boolean>(false);
  const mapLoadRecordedRef = useRef<boolean>(false);

  const quotaGuard = useMapsQuotaGuard(serverPaused);

  useEffect(() => {
    let cancelled = false;
    fetch('/api/maps-config', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled) return;
        if (data?.paused) {
          setServerPaused(true);
          setMapsApiKey('');
        } else if (data?.apiKey) {
          setMapsApiKey((prev) => prev || String(data.apiKey).trim());
        }
      })
      .catch(() => {
        // Fallback to client env key if already present
      })
      .finally(() => {
        if (!cancelled) setConfigChecked(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Count one map load per active session mount when Maps is allowed
  useEffect(() => {
    if (!configChecked || !mapsApiKey || quotaGuard.isStopped) {
      mapLoadRecordedRef.current = false;
      return;
    }
    if (!mapLoadRecordedRef.current) {
      mapLoadRecordedRef.current = true;
      recordGoogleMapsUsage('mapLoads');
    }
  }, [configChecked, mapsApiKey, quotaGuard.isStopped]);

  const showFallbackFinder = quotaGuard.isStopped || !mapsApiKey;

  const stopHeadline = !quotaGuard.isStopped
    ? undefined
    : quotaGuard.stopReason === 'near_limit'
      ? 'Google Maps Paused at Quota Safety Limit — Interactive OpenStreetMap Directory Active'
      : quotaGuard.stopReason === 'api_quota_exceeded'
        ? 'Google Maps Quota Reached — Interactive OpenStreetMap Directory Active'
        : quotaGuard.stopReason === 'server_paused'
          ? 'Google Maps Paused — Interactive OpenStreetMap Directory Active'
          : 'Google Maps Paused by Safety Switch — Interactive OpenStreetMap Directory Active';

  const stopDescription = !quotaGuard.isStopped
    ? undefined
    : quotaGuard.stopReason === 'near_limit'
      ? `Google Maps paused automatically at ${quotaGuard.maxPercentUsed}% of the safe monthly cap to prevent billing charges. You can continue finding nearby parishes and Mass times using the interactive directory below.`
      : quotaGuard.stopReason === 'api_quota_exceeded'
        ? 'Google Maps reported a quota limit, so Church Finder switched seamlessly to the free interactive OpenStreetMap parish directory below.'
        : 'Google Maps requests are currently paused. Use Resume Maps above anytime, or continue using the full interactive parish finder below.';

  return (
    <div className="max-w-5xl mx-auto pt-0 pb-20 space-y-5">
      {/* Compact Soul Sanctum Banner */}
      <div className="sanctum-top-banner px-5 pt-4 pb-4 sm:px-6 min-h-[196px] sm:h-[212px] rounded-xl overflow-hidden bg-gradient-to-r from-stone-900 via-[#22140C] to-stone-900 border border-amber-500/35 shadow-2xl text-stone-100 flex flex-col justify-center">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1 min-w-0">
            <div className="inline-flex items-center gap-1.5 text-[10.5px] font-cinzel font-bold uppercase tracking-[0.2em] text-amber-300">
              <MapPin className="w-3.5 h-3.5" />
              Global Catholic Parish Locator
            </div>
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-white tracking-wide leading-tight">
              Church Finder
            </h2>
            <p className="text-xs sm:text-sm text-amber-100/80 font-serif max-w-2xl leading-snug line-clamp-2">
              Locate Catholic parishes, Eucharistic Adoration chapels, and shrines nearby or anywhere you travel, with live directions and published sacramental schedules.
            </p>
          </div>

          {configChecked && mapsApiKey && !serverPaused && (
            <button
              type="button"
              onClick={() => (quotaGuard.isStopped ? quotaGuard.resumeMaps() : quotaGuard.pauseMaps())}
              className={`self-start sm:self-center shrink-0 h-8 px-3 rounded-lg text-[11px] font-cinzel font-bold uppercase tracking-wider border transition-colors cursor-pointer ${
                quotaGuard.isStopped
                  ? 'bg-emerald-800/80 hover:bg-emerald-700 text-emerald-50 border-emerald-400/50'
                  : 'bg-white/10 hover:bg-white/20 text-amber-200 border-amber-400/40'
              }`}
              title={
                quotaGuard.isStopped
                  ? 'Resume live Google Maps features'
                  : 'Pause Google Maps features to preserve quota'
              }
            >
              {quotaGuard.isStopped ? 'Resume Maps' : 'Pause Maps'}
            </button>
          )}
        </div>
      </div>

      {/* Gentle Warning Banner when approaching 80% auto-stop limit */}
      {!showFallbackFinder && quotaGuard.isApproaching && (
        <div className="rounded-xl bg-amber-50 border border-amber-300 px-4 py-3 text-xs sm:text-sm text-amber-950 flex flex-wrap items-center justify-between gap-2 shadow-xs">
          <span className="flex items-center gap-2 font-serif">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>Quota Guard Notice:</strong> Google Maps usage is at{' '}
              <strong>{quotaGuard.maxPercentUsed}%</strong> of the safe monthly cap and will automatically pause at 80% to avoid any billing charges.
            </span>
          </span>
          <button
            type="button"
            onClick={quotaGuard.pauseMaps}
            className="px-2.5 py-1 rounded-md bg-amber-800 hover:bg-amber-900 text-amber-50 text-xs font-semibold cursor-pointer"
          >
            Pause Now
          </button>
        </div>
      )}

      {!configChecked ? (
        <div className="rounded-xl bg-[#FAF6F0]/95 border border-amber-300/60 p-10 text-center space-y-3 shadow-lg">
          <Loader2 className="w-7 h-7 animate-spin text-amber-800 mx-auto" />
          <p className="text-sm font-cinzel text-stone-700">Preparing Interactive Parish Map...</p>
        </div>
      ) : showFallbackFinder ? (
        <FallbackParishFinderWorkspace
          noticeHeadline={stopHeadline}
          noticeDescription={stopDescription}
        />
      ) : (
        <APIProvider
          apiKey={mapsApiKey}
          libraries={['places', 'marker', 'routes', 'geometry']}
          language="en"
        >
          <ParishFinderWorkspace defaultCenter={QUICK_DESTINATIONS[0].center} />
        </APIProvider>
      )}
    </div>
  );
};
