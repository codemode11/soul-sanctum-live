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
  RotateCcw,
  Sparkles,
  Footprints,
  Layers,
  Loader2,
  Compass,
  BookOpen,
  Maximize2,
  X,
  Sun,
  Flame,
  Eye,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import station01Img from '../assets/images/watercolor_station_01_condemned_1795536338768.jpg';
import station02Img from '../assets/images/watercolor_station_02_carries_cross_1795536334425.jpg';
import station03Img from '../assets/images/watercolor_station_03_first_fall_1795536342941.jpg';
import station05Img from '../assets/images/watercolor_station_05_simon_cyrene_1795536337736.jpg';
import station07Img from '../assets/images/watercolor_station_07_second_fall_1795536338438.jpg';
import station08Img from '../assets/images/watercolor_station_08_women_jerusalem_1795536386590.jpg';
import station09Img from '../assets/images/watercolor_station_09_third_fall_1795536383077.jpg';
import station10Img from '../assets/images/watercolor_station_10_stripped_1795536386102.jpg';
import station13Img from '../assets/images/watercolor_station_13_pieta_deposition_1795536386065.jpg';
import divineMercyImg from '../assets/images/divine_mercy_user_exact.jpg';
import {
  STATIONS_AUTHOR_META,
  STATIONS_PREPARATORY_PRAYER,
  STATIONS_OF_THE_CROSS,
  STATIONS_CONCLUDING_PRAYER,
  StationOfTheCross,
} from '@/data/stationsOfTheCross';
import { SacredReader } from '@/utils/speech';
import { isMapsQuotaError, notifyMapsQuotaExceeded } from '@/hooks/usePlaceAutocomplete';
import {
  isGoogleMapsStopped,
  recordGoogleMapsUsage,
  useMapsQuotaGuard,
} from '@/utils/mapsQuotaGuard';

const station04Img = '/assets/aistudio/97cf27e01df68f49643e72ffe0df9e8f_e9c383cc.jpg';
const station06Img = '/assets/aistudio/39ba7c7ce6d03e39bba8d6c0803b2252_a0decbce.jpg';
const station11Img = '/assets/aistudio/49c85f20c4c91ef0ebd03cfe20e03c8d_84b3a315.jpg';
const station12Img = '/assets/aistudio/d90ad465d061346c629449904527c366_3a1ec3f0.jpg';
const station14Img = '/assets/aistudio/acff84785b9adf452c7b6eafe3a6b818_fa5e0823.jpg';

type GalleryLightingMode = 'spotlight' | 'candlelight' | 'shadow-study';

const GALLERY_LIGHTING_FILTER: Record<GalleryLightingMode, string> = {
  spotlight: 'contrast(1.03) saturate(1.04) brightness(1.0)',
  candlelight: 'contrast(1.05) saturate(1.08) sepia(0.16) brightness(0.99)',
  'shadow-study': 'contrast(1.16) saturate(0.92) brightness(1.02)',
};

interface StationArtworkEntry {
  stationNumber: number;
  roman: string;
  shortTitle: string;
  src: string;
  alt: string;
  plateTitle: string;
  caption: string;
  studyNote: string;
  paperBg: string;
  frameFit: 'cover' | 'contain' | 'clipped-contain';
  baseScale?: number;
  clipPath?: string;
}

const STATION_ARTWORK: Record<number, StationArtworkEntry> = {
  1: {
    stationNumber: 1,
    roman: 'I',
    shortTitle: 'Condemned to Death',
    src: station01Img,
    alt: 'Ink and watercolor illustration of Station I: Jesus stands crowned with thorns in quiet dignity before Pontius Pilate washing his hands beneath Jerusalem stone arches',
    plateTitle: 'Station I · Jesus Is Condemned to Death',
    caption: 'Plate I · Ink & Watercolor on Cotton Paper · Praetorium, Jerusalem',
    studyNote:
      'Delicate sepia linework and translucent sienna washes frame Christ’s luminous halo and bound wrists against the cool slate-grey arches of the Praetorium.',
    paperBg: '#F7F3EA',
    frameFit: 'cover',
  },
  2: {
    stationNumber: 2,
    roman: 'II',
    shortTitle: 'Carries His Cross',
    src: station02Img,
    alt: 'Ink and watercolor illustration of Station II: Jesus embraces the heavy wooden Cross upon His shoulder along a sun-washed Jerusalem courtyard',
    plateTitle: 'Station II · Jesus Carries His Cross',
    caption: 'Plate II · Ink & Watercolor on Cotton Paper · Chapel of the Condemnation',
    studyNote:
      'Expressive raw-umber brushstrokes define the rough timber beam while crisp ink contours trace Christ’s serene resolve in open cream paper space.',
    paperBg: '#F7F3EA',
    frameFit: 'cover',
  },
  3: {
    stationNumber: 3,
    roman: 'III',
    shortTitle: 'First Fall',
    src: station03Img,
    alt: 'Ink and watercolor illustration of Station III: Jesus kneels beneath the heavy timber Cross on worn Jerusalem flagstones as muted figures watch',
    plateTitle: 'Station III · Jesus Falls the First Time',
    caption: 'Plate III · Ink & Watercolor on Cotton Paper · El-Wad Road, Jerusalem',
    studyNote:
      'Layered burnt-sienna drapery folds and fluid downward pigment bleeds convey the sudden weight of the Cross over warm ochre cobblestones.',
    paperBg: '#F7F3EA',
    frameFit: 'cover',
  },
  4: {
    stationNumber: 4,
    roman: 'IV',
    shortTitle: 'Meets His Mother',
    src: station04Img,
    alt: 'Ink and watercolor illustration of Station IV: Jesus pauses beneath the Cross to clasp the hand of His Mother Mary along a sunlit Jerusalem archway',
    plateTitle: 'Station IV · Jesus Meets His Afflicted Mother',
    caption: 'Plate IV · Ink & Watercolor on Cotton Paper · Church of Our Lady of the Spasm',
    studyNote:
      'Angular ink-and-wash planes and interlocking circular halos draw the eye directly to the quiet, tender clasp of Mother and Son beneath Jerusalem domes.',
    paperBg: '#F5F3EE',
    frameFit: 'cover',
    baseScale: 1.19,
    clipPath: 'inset(16.4% 8.0% 16.4% 8.0%)',
  },
  5: {
    stationNumber: 5,
    roman: 'V',
    shortTitle: 'Simon of Cyrene',
    src: station05Img,
    alt: 'Ink and watercolor illustration of Station V: Simon of Cyrene steps forward to lift the wooden Cross alongside Jesus on the narrow Via Dolorosa',
    plateTitle: 'Station V · Simon of Cyrene Helps Jesus Carry His Cross',
    caption: 'Plate V · Ink & Watercolor on Cotton Paper · Chapel of Simon of Cyrene',
    studyNote:
      'Warm terracotta and slate-blue washes unite Simon’s sturdy shoulders with Christ’s bowed frame along the shared diagonal of the wooden beam.',
    paperBg: '#F7F3EA',
    frameFit: 'cover',
  },
  6: {
    stationNumber: 6,
    roman: 'VI',
    shortTitle: 'Veronica’s Veil',
    src: station06Img,
    alt: 'Ink and watercolor illustration of Station VI: Saint Veronica gently reaches out with a white linen cloth to wipe the brow of Jesus as He kneels beneath the Cross',
    plateTitle: 'Station VI · Veronica Wipes the Face of Jesus',
    caption: 'Plate VI · Ink & Watercolor on Cotton Paper · Church of Saint Veronica',
    studyNote:
      'A glowing burnt-ochre nimbus crowns Veronica’s compassionate silhouette while untouched cream cotton paper highlights the pure white linen veil.',
    paperBg: '#F4F3EE',
    frameFit: 'clipped-contain',
    baseScale: 1.18,
    clipPath: 'inset(8.0% 16.4% 8.0% 16.4%)',
  },
  7: {
    stationNumber: 7,
    roman: 'VII',
    shortTitle: 'Second Fall',
    src: station07Img,
    alt: 'Ink and watercolor illustration of Station VII: Exhausted beneath an ancient stone gate, Jesus falls a second time onto the cobblestones beneath the Cross',
    plateTitle: 'Station VII · Jesus Falls the Second Time',
    caption: 'Plate VII · Ink & Watercolor on Cotton Paper · Ancient Judgment Gate',
    studyNote:
      'Soft grey-brown architectural washes recede into luminous mist behind the Judgment Gate, centering Christ’s trembling hand upon the stone.',
    paperBg: '#F7F3EA',
    frameFit: 'cover',
  },
  8: {
    stationNumber: 8,
    roman: 'VIII',
    shortTitle: 'Women of Jerusalem',
    src: station08Img,
    alt: 'Ink and watercolor illustration of Station VIII: Jesus pauses beneath His Cross to console the veiled weeping women of Jerusalem gathered in prayer',
    plateTitle: 'Station VIII · Jesus Consoles the Women of Jerusalem',
    caption: 'Plate VIII · Ink & Watercolor on Cotton Paper · Monastery of St. Charalambos',
    studyNote:
      'Gentle amber and rose-ochre drapery flows across the clustered veiled women as Christ’s raised hand speaks quiet mercy through spare ink lines.',
    paperBg: '#F7F3EA',
    frameFit: 'cover',
  },
  9: {
    stationNumber: 9,
    roman: 'IX',
    shortTitle: 'Third Fall',
    src: station09Img,
    alt: 'Ink and watercolor illustration of Station IX: Prostrate upon the rocky ascent of Calvary, Jesus falls the third time beneath the timber Cross',
    plateTitle: 'Station IX · Jesus Falls the Third Time',
    caption: 'Plate IX · Ink & Watercolor on Cotton Paper · Threshold of Golgotha',
    studyNote:
      'Generous negative space across the upper rag paper strips away the crowd, isolating Christ’s total self-emptying upon the rocky slope of Calvary.',
    paperBg: '#F7F3EA',
    frameFit: 'cover',
  },
  10: {
    stationNumber: 10,
    roman: 'X',
    shortTitle: 'Stripped of Garments',
    src: station10Img,
    alt: 'Ink and watercolor illustration of Station X: Jesus stands in silent humility upon Calvary as His cloak is drawn away beneath soft misty skies',
    plateTitle: 'Station X · Jesus Is Stripped of His Garments',
    caption: 'Plate X · Ink & Watercolor on Cotton Paper · Chapel of the Franks, Calvary',
    studyNote:
      'Muted rust-ochre cloak folds part around Christ’s still, vertical posture while delicate wet-on-wet washes dissolve the hilltop horizon into silence.',
    paperBg: '#F7F3EA',
    frameFit: 'cover',
  },
  11: {
    stationNumber: 11,
    roman: 'XI',
    shortTitle: 'Nailed to the Cross',
    src: station11Img,
    alt: 'Ink and watercolor illustration of Station XI: Silhouetted against radiant clouds on Golgotha, Christ is raised upon the Cross surrounded by watching crowds and upright spears',
    plateTitle: 'Station XI · Jesus Is Nailed to the Cross',
    caption: 'Plate XI · Ink & Watercolor on Cotton Paper · Altar of the Nailing, Golgotha',
    studyNote:
      'Vertical ink lances and hooded washes anchor the rocky ridge of Golgotha as the Cross rises into a luminous golden-ochre halo of clouds.',
    paperBg: '#FAF7F2',
    frameFit: 'contain',
  },
  12: {
    stationNumber: 12,
    roman: 'XII',
    shortTitle: 'Dies on the Cross',
    src: station12Img,
    alt: 'Ink and watercolor illustration of Station XII: Jesus bows His head in death upon the Cross framed by a thin dark halo as Mary and the faithful kneel in deep sienna washes below',
    plateTitle: 'Station XII · Jesus Dies on the Cross',
    caption: 'Plate XII · Ink & Watercolor on Cotton Paper · Rock of Golgotha, Holy Sepulchre',
    studyNote:
      'A fine ink halo crowns Christ’s bowed head while rich burnt-sienna and umber washes cascade downward into the kneeling silhouettes of Mary and St. John.',
    paperBg: '#EFE9DE',
    frameFit: 'contain',
  },
  13: {
    stationNumber: 13,
    roman: 'XIII',
    shortTitle: 'Taken Down',
    src: station13Img,
    alt: 'Ink and watercolor illustration of Station XIII: Jesus is lowered from the Cross and cradled tenderly in the sorrowful arms of His Mother Mary',
    plateTitle: 'Station XIII · Jesus Is Taken Down from the Cross',
    caption: 'Plate XIII · Ink & Watercolor on Cotton Paper · Stone of Anointing, Holy Sepulchre',
    studyNote:
      'Soft ivory shroud folds and warm sepia shadows form a contemplative Pietà at the foot of the bare Cross, echoing stillness and maternal sorrow.',
    paperBg: '#F7F3EA',
    frameFit: 'cover',
  },
  14: {
    stationNumber: 14,
    roman: 'XIV',
    shortTitle: 'Laid in the Sepulchre',
    src: station14Img,
    alt: 'Ink and watercolor illustration of Station XIV: Wrapped in white linen, Jesus rests upon the burial stone surrounded by grieving disciples beneath luminous slate-and-gold washes',
    plateTitle: 'Station XIV · Jesus Is Placed in the Sepulchre',
    caption: 'Plate XIV · Ink & Watercolor on Cotton Paper · The Holy Sepulchre, Jerusalem',
    studyNote:
      'Ethereal slate-blue mist opens into a soft golden radiance above the linen-draped bier as silent mourners keep watch in expectant peace.',
    paperBg: '#FCFBF7',
    frameFit: 'contain',
  },
};

function getArtworkForStep(stepIndex: number): StationArtworkEntry {
  if (stepIndex === 0) {
    return {
      ...STATION_ARTWORK[2],
      plateTitle: 'Opening Plate · The Way of Sorrows',
      caption: 'Opening Plate · Ink & Watercolor · Beginning the Via Dolorosa, Jerusalem',
    };
  }
  if (stepIndex >= 1 && stepIndex <= 14) {
    return STATION_ARTWORK[stepIndex];
  }
  return {
    ...STATION_ARTWORK[12],
    plateTitle: 'Closing Plate · Prayer Before Jesus Crucified',
    caption: 'Closing Plate · Ink & Watercolor · Rock of Calvary, Church of the Holy Sepulchre',
  };
}

interface StationsOfTheCrossViewProps {
  renderSettingsToggleButton: (theme?: 'dark' | 'light') => React.ReactNode;
  renderSettingsDropdown: () => React.ReactNode;
  onSwitchToThreeOClock: () => void;
}

interface ResolvedJerusalemPlace {
  stepIndex: number;
  label: string;
  title: string;
  placeId: string;
  displayName: string;
  formattedAddress: string;
  location: google.maps.LatLngLiteral;
  googleMapsURI?: string;
  attributions: Array<{ provider: string; providerURI?: string }>;
}

// Neutral initial Jerusalem Old City viewport ONLY used to open the map before live Places API lookup
const JERUSALEM_OLD_CITY_VIEWPORT: google.maps.LatLngLiteral = {
  lat: 31.7785,
  lng: 35.2315,
};

const GMP_ATTRIBUTION_IDS = ['gmp_mcp_codeassist_v1_aistudio'];

const TOTAL_STEPS = STATIONS_OF_THE_CROSS.length + 2; // 0 = Prep, 1..14 = Stations I..XIV, 15 = Concluding

function buildSpeechForStep(stepIndex: number): string {
  if (stepIndex === 0) {
    return [
      'The Way of the Cross, by Saint Alphonsus Maria de Liguori.',
      'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.',
      'Preparatory Prayer.',
      STATIONS_PREPARATORY_PRAYER.prayerText,
      STATIONS_PREPARATORY_PRAYER.stabatMaterEnglish,
    ].join(' ... ');
  }

  if (stepIndex === TOTAL_STEPS - 1) {
    return [
      STATIONS_CONCLUDING_PRAYER.title + '.',
      STATIONS_CONCLUDING_PRAYER.prayerText,
      'For the intentions of the Sovereign Pontiff. Our Father, who art in heaven, hallowed be Thy name. Thy kingdom come, Thy will be done, on earth as it is in heaven. Give us this day our daily bread, and forgive us our trespasses, as we forgive those who trespass against us. And lead us not into temptation, but deliver us from evil. Amen.',
      'Hail Mary, full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
      'Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.',
      STATIONS_CONCLUDING_PRAYER.closingDoxology,
    ].join(' ... ');
  }

  const station = STATIONS_OF_THE_CROSS[stepIndex - 1];
  if (!station) return '';

  return [
    `Station ${station.number}. ${station.title}.`,
    `${STATIONS_AUTHOR_META.openingVersicle} ... ${STATIONS_AUTHOR_META.openingResponse}`,
    `From Sacred Scripture, ${station.scriptureRef}. ${station.scriptureText}`,
    `Meditation. ${station.meditation}`,
    `Prayer. ${station.prayer}`,
    STATIONS_AUTHOR_META.aspiration,
    'Our Father, who art in heaven, hallowed be Thy name. Thy kingdom come, Thy will be done, on earth as it is in heaven. Give us this day our daily bread, and forgive us our trespasses, as we forgive those who trespass against us. And lead us not into temptation, but deliver us from evil. Amen.',
    'Hail Mary, full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
    'Glory be to the Father, and to the Son, and to the Holy Spirit. As it was in the beginning, is now, and ever shall be, world without end. Amen.',
    station.stabatMaterEnglish,
  ].join(' ... ');
}

function buildCopyTextForStep(stepIndex: number): string {
  if (stepIndex === 0) {
    return `${STATIONS_PREPARATORY_PRAYER.title.toUpperCase()} — ${STATIONS_AUTHOR_META.author}\n\n${STATIONS_PREPARATORY_PRAYER.prayerText}\n\n${STATIONS_PREPARATORY_PRAYER.stabatMaterEnglish}`;
  }
  if (stepIndex === TOTAL_STEPS - 1) {
    return `${STATIONS_CONCLUDING_PRAYER.title.toUpperCase()}\n\n${STATIONS_CONCLUDING_PRAYER.prayerText}\n\n${STATIONS_CONCLUDING_PRAYER.pontiffNote}`;
  }
  const st = STATIONS_OF_THE_CROSS[stepIndex - 1];
  if (!st) return '';
  return `STATION ${st.roman}: ${st.title.toUpperCase()}\nJerusalem Site: ${st.jerusalemSiteName}\n\nV. ${STATIONS_AUTHOR_META.openingVersicle}\nR. ${STATIONS_AUTHOR_META.openingResponse}\n\nScripture (${st.scriptureRef}): "${st.scriptureText}"\n\nMeditation (${STATIONS_AUTHOR_META.author}):\n${st.meditation}\n\nPrayer:\n${st.prayer}\n\n${STATIONS_AUTHOR_META.aspiration}\n\nOur Father... Hail Mary... Glory Be...\n\nStabat Mater:\n${st.stabatMaterEnglish}`;
}

interface ViaDolorosaRouteLayerProps {
  origin: google.maps.LatLngLiteral | null;
  destination: google.maps.LatLngLiteral | null;
  enabled: boolean;
  onSummaryChange: (summary: { distanceText: string; durationText: string } | null) => void;
}

const ViaDolorosaRouteLayer: React.FC<ViaDolorosaRouteLayerProps> = ({
  origin,
  destination,
  enabled,
  onSummaryChange,
}) => {
  const map = useMap();
  const routesLib = useMapsLibrary('routes');
  const polylinesRef = useRef<google.maps.Polyline[]>([]);

  useEffect(() => {
    const clearPolylines = () => {
      polylinesRef.current.forEach((line) => line.setMap(null));
      polylinesRef.current = [];
    };

    if (!enabled || !map || !routesLib || !origin || !destination || isGoogleMapsStopped()) {
      clearPolylines();
      onSummaryChange(null);
      return;
    }

    // Avoid computing a zero-length route when origin and destination are identical
    if (
      Math.abs(origin.lat - destination.lat) < 0.00005 &&
      Math.abs(origin.lng - destination.lng) < 0.00005
    ) {
      clearPolylines();
      onSummaryChange(null);
      return;
    }

    if (!recordGoogleMapsUsage('routes')) {
      clearPolylines();
      onSummaryChange(null);
      return;
    }

    let cancelled = false;

    const computeWalkingPath = async () => {
      try {
        const RouteClass = (routesLib as any).Route;
        if (!RouteClass?.computeRoutes) return;

        const { routes } = await RouteClass.computeRoutes({
          origin,
          destination,
          travelMode: 'WALKING',
          fields: ['path', 'distanceMeters', 'durationMillis', 'viewport'],
        });

        if (cancelled) return;
        clearPolylines();

        const route = routes?.[0];
        if (!route) {
          onSummaryChange(null);
          return;
        }

        if (typeof route.createPolylines === 'function') {
          const lines: google.maps.Polyline[] = route.createPolylines({
            polylineOptions: {
              strokeColor: '#991B1B',
              strokeOpacity: 0.9,
              strokeWeight: 4,
            },
          });
          lines.forEach((line) => line.setMap(map));
          polylinesRef.current = lines;
        }

        const meters = typeof route.distanceMeters === 'number' ? route.distanceMeters : 0;
        const durationMs = typeof route.durationMillis === 'number' ? route.durationMillis : 0;
        const distanceText =
          meters >= 1000 ? `${(meters / 1000).toFixed(2)} km` : `${Math.round(meters)} m`;
        const minutes = Math.max(1, Math.round(durationMs / 60000));
        onSummaryChange({
          distanceText,
          durationText: `${minutes} min walk`,
        });

        if (route.viewport) {
          map.fitBounds(route.viewport, 48);
        }
      } catch (err) {
        if (isMapsQuotaError(err)) {
          notifyMapsQuotaExceeded();
        }
        if (!cancelled) {
          onSummaryChange(null);
        }
      }
    };

    computeWalkingPath();

    return () => {
      cancelled = true;
      clearPolylines();
    };
  }, [map, routesLib, enabled, origin?.lat, origin?.lng, destination?.lat, destination?.lng, onSummaryChange]);

  return null;
};

interface StationJerusalemMapInnerProps {
  stepIndex: number;
  activeStation: StationOfTheCross | null;
  resolvedPlaces: Record<number, ResolvedJerusalemPlace>;
  onResolvePlace: (stepIndex: number, place: ResolvedJerusalemPlace) => void;
  onSelectStep: (stepIndex: number) => void;
  showWalkRoute: boolean;
  onToggleWalkRoute: () => void;
  mapTypeId: 'roadmap' | 'hybrid';
  onToggleMapType: () => void;
}

const StationJerusalemMapInner: React.FC<StationJerusalemMapInnerProps> = ({
  stepIndex,
  activeStation,
  resolvedPlaces,
  onResolvePlace,
  onSelectStep,
  showWalkRoute,
  onToggleWalkRoute,
  mapTypeId,
  onToggleMapType,
}) => {
  const map = useMap();
  const placesLib = useMapsLibrary('places');
  const [isLocating, setIsLocating] = useState(false);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [selectedInfoStep, setSelectedInfoStep] = useState<number | null>(null);
  const [walkSummary, setWalkSummary] = useState<{ distanceText: string; durationText: string } | null>(null);
  const inFlightRef = useRef<Record<number, boolean>>({});

  const resolveStepLocation = useCallback(
    async (targetStep: number) => {
      if (
        !placesLib ||
        resolvedPlaces[targetStep] ||
        inFlightRef.current[targetStep] ||
        isGoogleMapsStopped()
      ) {
        return;
      }

      if (!recordGoogleMapsUsage('places')) {
        return;
      }

      const queryInfo =
        targetStep === 0
          ? {
              label: 'Start',
              title: STATIONS_PREPARATORY_PRAYER.title,
              primary: STATIONS_PREPARATORY_PRAYER.jerusalemPlaceQuery,
              fallback: 'Antonia Fortress Via Dolorosa Jerusalem',
            }
          : targetStep === TOTAL_STEPS - 1
            ? {
                label: 'End',
                title: STATIONS_CONCLUDING_PRAYER.title,
                primary: STATIONS_CONCLUDING_PRAYER.jerusalemPlaceQuery,
                fallback: 'Church of the Holy Sepulchre Old City Jerusalem',
              }
            : (() => {
                const st = STATIONS_OF_THE_CROSS[targetStep - 1];
                return {
                  label: st.roman,
                  title: `Station ${st.roman}: ${st.title}`,
                  primary: st.jerusalemPlaceQuery,
                  fallback: st.jerusalemFallbackQuery,
                };
              })();

      inFlightRef.current[targetStep] = true;
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
            locationBias: {
              center: JERUSALEM_OLD_CITY_VIEWPORT,
              radius: 2500,
            },
            maxResultCount: 1,
            internalUsageAttributionIds: GMP_ATTRIBUTION_IDS,
          };
          const response = await placesLib.Place.searchByText(request);
          return response?.places?.[0] ?? null;
        };

        let found = await searchPlace(queryInfo.primary);
        if (!found || !found.location) {
          found = await searchPlace(queryInfo.fallback);
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

          onResolvePlace(targetStep, {
            stepIndex: targetStep,
            label: queryInfo.label,
            title: queryInfo.title,
            placeId: found.id || `station-${targetStep}`,
            displayName:
              typeof found.displayName === 'string'
                ? found.displayName
                : queryInfo.title,
            formattedAddress: found.formattedAddress || 'Old City, Jerusalem, Israel',
            location: loc,
            googleMapsURI: found.googleMapsURI || undefined,
            attributions,
          });
        } else {
          setLookupError('Live Jerusalem site pin could not be loaded for this station.');
        }
      } catch (err) {
        if (isMapsQuotaError(err)) {
          notifyMapsQuotaExceeded();
          setLookupError('Google Maps daily demo quota reached.');
        } else {
          setLookupError('Unable to locate this Jerusalem site right now.');
        }
      } finally {
        inFlightRef.current[targetStep] = false;
        setIsLocating(false);
      }
    },
    [placesLib, resolvedPlaces, onResolvePlace]
  );

  // Resolve active station live on Google Maps Places API (New)
  useEffect(() => {
    resolveStepLocation(stepIndex);
  }, [stepIndex, resolveStepLocation]);

  // When walking route is toggled on, also ensure Station I (start) and Station XIV (or active) are resolved
  useEffect(() => {
    if (!showWalkRoute) return;
    if (!resolvedPlaces[1]) {
      resolveStepLocation(1);
    }
    if (stepIndex === 0 && !resolvedPlaces[14]) {
      resolveStepLocation(14);
    }
  }, [showWalkRoute, stepIndex, resolvedPlaces, resolveStepLocation]);

  // Smoothly pan & zoom map to the resolved station location
  const activePlace = resolvedPlaces[stepIndex] || null;
  useEffect(() => {
    if (!map || !activePlace || showWalkRoute) return;
    map.panTo(activePlace.location);
    map.setZoom(stepIndex === 0 ? 16 : 18);
  }, [map, activePlace, stepIndex, showWalkRoute]);

  const routeOrigin = resolvedPlaces[1]?.location ?? null;
  const routeDestination =
    stepIndex === 0
      ? resolvedPlaces[14]?.location ?? null
      : activePlace?.location ?? null;

  const markerList = Object.values(resolvedPlaces).sort((a, b) => a.stepIndex - b.stepIndex);
  const infoPlace = selectedInfoStep !== null ? resolvedPlaces[selectedInfoStep] : null;

  const siteName = activeStation
    ? activeStation.jerusalemSiteName
    : stepIndex === 0
      ? STATIONS_PREPARATORY_PRAYER.jerusalemSiteName
      : STATIONS_CONCLUDING_PRAYER.jerusalemSiteName;

  const historicalNote = activeStation
    ? activeStation.jerusalemHistoricalNote
    : stepIndex === 0
      ? STATIONS_PREPARATORY_PRAYER.jerusalemHistoricalNote
      : STATIONS_CONCLUDING_PRAYER.jerusalemHistoricalNote;

  return (
    <div className="rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-sm">
      {/* Jerusalem Map Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-[#2D0E0E] via-[#451313] to-[#29130D] text-amber-50 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 border-b border-amber-400/30">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-[10px] font-cinzel font-bold uppercase tracking-widest text-amber-300">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>
              {activeStation
                ? `Station ${activeStation.roman} in Jerusalem, Israel`
                : 'Via Dolorosa • Jerusalem, Israel'}
            </span>
          </div>
          <h4 className="font-serif text-sm sm:text-base font-bold text-white truncate">
            {siteName}
          </h4>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={onToggleMapType}
            className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-amber-100 border border-amber-300/35 text-[11px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Switch between Street Map and Satellite view of Jerusalem"
          >
            <Layers className="w-3.5 h-3.5 text-amber-300" />
            <span>{mapTypeId === 'hybrid' ? 'Street Map' : 'Satellite'}</span>
          </button>

          <button
            type="button"
            onClick={onToggleWalkRoute}
            className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
              showWalkRoute
                ? 'bg-amber-400 text-stone-950 border-amber-200 shadow-xs'
                : 'bg-white/10 hover:bg-white/20 text-amber-100 border-amber-300/35'
            }`}
            title="Trace the Via Dolorosa walking path from Station I in Jerusalem"
          >
            <Footprints className="w-3.5 h-3.5" />
            <span>{showWalkRoute ? 'Hide Walk Path' : 'Via Dolorosa Walk'}</span>
          </button>
        </div>
      </div>

      {/* Live Interactive Google Map */}
      <div className="relative w-full h-[270px] sm:h-[330px] bg-stone-100">
        <GoogleMap
          defaultCenter={JERUSALEM_OLD_CITY_VIEWPORT}
          defaultZoom={16}
          mapId="DEMO_MAP_ID"
          mapTypeId={mapTypeId}
          gestureHandling="greedy"
          streetViewControl={false}
          fullscreenControl={true}
          mapTypeControl={false}
          internalUsageAttributionIds={GMP_ATTRIBUTION_IDS}
          className="w-full h-full"
        >
          {markerList.map((place) => {
            const isActive = place.stepIndex === stepIndex;
            return (
              <AdvancedMarker
                key={place.stepIndex}
                position={place.location}
                title={place.title}
                zIndex={isActive ? 50 : 10 + place.stepIndex}
                onClick={() => {
                  setSelectedInfoStep(place.stepIndex);
                  if (place.stepIndex !== stepIndex) {
                    onSelectStep(place.stepIndex);
                  }
                }}
              >
                <Pin
                  background={isActive ? '#991B1B' : '#44403C'}
                  borderColor={isActive ? '#FCD34D' : '#D6D3D1'}
                  glyphColor={isActive ? '#FEF3C7' : '#FFFFFF'}
                  glyph={place.label}
                  scale={isActive ? 1.2 : 0.92}
                />
              </AdvancedMarker>
            );
          })}

          {infoPlace && (
            <InfoWindow
              position={infoPlace.location}
              onCloseClick={() => setSelectedInfoStep(null)}
            >
              <div className="max-w-[240px] space-y-1.5 text-stone-900 p-0.5">
                <p className="font-cinzel text-xs font-bold text-red-900 leading-snug">
                  {infoPlace.title}
                </p>
                <p className="text-xs font-medium text-stone-800">{infoPlace.displayName}</p>
                <p className="text-[11px] text-stone-600">{infoPlace.formattedAddress}</p>
                {infoPlace.googleMapsURI && (
                  <a
                    href={infoPlace.googleMapsURI}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-800 hover:text-red-950 underline pt-0.5"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </InfoWindow>
          )}

          <ViaDolorosaRouteLayer
            origin={routeOrigin}
            destination={routeDestination}
            enabled={showWalkRoute}
            onSummaryChange={setWalkSummary}
          />
        </GoogleMap>

        {isLocating && (
          <div className="absolute top-3 left-3 z-10 px-3 py-1.5 rounded-lg bg-stone-950/85 text-amber-100 text-xs font-medium flex items-center gap-2 shadow-md backdrop-blur-sm border border-amber-400/30">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-300" />
            <span>Locating site in Jerusalem...</span>
          </div>
        )}

        {walkSummary && showWalkRoute && (
          <div className="absolute bottom-3 left-3 z-10 px-3 py-1.5 rounded-lg bg-stone-950/90 text-amber-100 text-xs font-medium flex items-center gap-2 shadow-md border border-amber-400/40">
            <Footprints className="w-3.5 h-3.5 text-amber-300" />
            <span>
              Via Dolorosa Walk: <strong>{walkSummary.distanceText}</strong> ({walkSummary.durationText})
            </span>
          </div>
        )}
      </div>

      {/* Jerusalem Historical Context & Google Maps Link Footer */}
      <div className="p-4 bg-[#FAF6F0] border-t border-stone-200 space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
          <div className="space-y-1">
            {activePlace && (
              <p className="text-xs font-semibold text-red-900 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5 shrink-0 text-amber-700" />
                <span>
                  {activePlace.displayName} — {activePlace.formattedAddress}
                </span>
              </p>
            )}
            <p className="text-xs sm:text-sm text-stone-700 font-serif leading-relaxed">
              {historicalNote}
            </p>
            {lookupError && (
              <p className="text-xs text-red-700 font-medium">{lookupError}</p>
            )}
          </div>

          {activePlace?.googleMapsURI && (
            <a
              href={activePlace.googleMapsURI}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 self-start px-3 py-1.5 rounded-lg bg-white hover:bg-amber-50 border border-stone-300 text-red-900 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* Required Place Attributions & End-User Terms Notice */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-200/80 text-[10px] text-stone-500">
          <div className="flex flex-wrap items-center gap-2">
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
          </div>
          <span>
            Map data © Google • Subject to{' '}
            <a
              href="https://maps.google.com/help/terms_maps/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-stone-700"
            >
              Google Maps Terms
            </a>{' '}
            &amp;{' '}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-stone-700"
            >
              Privacy Policy
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export const StationsOfTheCrossView: React.FC<StationsOfTheCrossViewProps> = ({
  renderSettingsToggleButton,
  renderSettingsDropdown,
  onSwitchToThreeOClock,
}) => {
  const [stepIndex, setStepIndex] = useState<number>(1); // Open directly on Station I so user sees map + station immediately
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [isSpeakingSingle, setIsSpeakingSingle] = useState<boolean>(false);
  const [voiceRate, setVoiceRate] = useState<number>(0.85);
  const [showLatin, setShowLatin] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [mapsApiKey, setMapsApiKey] = useState<string>(
    () => (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined)?.trim() || ''
  );
  const [serverPaused, setServerPaused] = useState<boolean>(false);
  const [mapsKeyLoaded, setMapsKeyLoaded] = useState<boolean>(false);
  const [resolvedPlaces, setResolvedPlaces] = useState<Record<number, ResolvedJerusalemPlace>>({});
  const [showWalkRoute, setShowWalkRoute] = useState<boolean>(false);
  const [mapTypeId, setMapTypeId] = useState<'roadmap' | 'hybrid'>('hybrid');
  const [lightboxStation, setLightboxStation] = useState<number | null>(null);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});
  const [lightingMode, setLightingMode] = useState<GalleryLightingMode>('spotlight');
  const [lightboxZoom, setLightboxZoom] = useState<number>(1);
  const [lightboxPan, setLightboxPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDraggingPan, setIsDraggingPan] = useState<boolean>(false);
  const panOriginRef = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);
  const mapLoadRecordedRef = useRef<boolean>(false);

  // Reset zoom & pan whenever Lightbox plate changes or closes
  useEffect(() => {
    setLightboxZoom(1);
    setLightboxPan({ x: 0, y: 0 });
    setIsDraggingPan(false);
    panOriginRef.current = null;
  }, [lightboxStation]);

  // Keyboard navigation inside the Watercolor Gallery Lightbox
  useEffect(() => {
    if (lightboxStation === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxStation(null);
      } else if (e.key === 'ArrowLeft') {
        setLightboxStation((prev) => (prev !== null && prev > 1 ? prev - 1 : prev));
      } else if (e.key === 'ArrowRight') {
        setLightboxStation((prev) =>
          prev !== null && prev < STATIONS_OF_THE_CROSS.length ? prev + 1 : prev
        );
      } else if (e.key === '+' || e.key === '=') {
        setLightboxZoom((z) => (z < 1.75 ? 1.75 : 2.5));
      } else if (e.key === '-') {
        setLightboxZoom((z) => {
          const next = z > 1.75 ? 1.75 : 1;
          if (next === 1) setLightboxPan({ x: 0, y: 0 });
          return next;
        });
      } else if (e.key === '0') {
        setLightboxZoom(1);
        setLightboxPan({ x: 0, y: 0 });
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxStation]);

  const quotaGuard = useMapsQuotaGuard(serverPaused);

  // Load Google Maps API key and global server pause switch
  useEffect(() => {
    let active = true;
    fetch('/api/maps-config', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!active) return;
        if (data?.paused) {
          setServerPaused(true);
          setMapsApiKey('');
        } else if (data?.apiKey) {
          setMapsApiKey((prev) => prev || String(data.apiKey).trim());
        }
        setMapsKeyLoaded(true);
      })
      .catch(() => {
        if (active) setMapsKeyLoaded(true);
      });
    return () => {
      active = false;
    };
  }, []);

  // Record one map load per active session when the interactive map mounts
  useEffect(() => {
    if (!mapsKeyLoaded || !mapsApiKey || quotaGuard.isStopped) {
      mapLoadRecordedRef.current = false;
      return;
    }
    if (!mapLoadRecordedRef.current) {
      mapLoadRecordedRef.current = true;
      recordGoogleMapsUsage('mapLoads');
    }
  }, [mapsKeyLoaded, mapsApiKey, quotaGuard.isStopped]);

  // Stop Jenny audio when unmounting view
  useEffect(() => {
    return () => {
      SacredReader.stop();
    };
  }, []);

  // Continuous Jenny Autoplay across Preparatory -> Stations I..XIV -> Concluding
  useEffect(() => {
    if (!isAutoPlaying) return;

    let cancelled = false;
    let pauseTimer: ReturnType<typeof setTimeout> | null = null;

    const textToSpeak = buildSpeechForStep(stepIndex);
    if (!textToSpeak) {
      setIsAutoPlaying(false);
      return;
    }

    setIsSpeakingSingle(false);
    // Explicitly invoke Microsoft Jenny ('persona-jenny') as narrator for Stations of the Cross
    SacredReader.speak(
      textToSpeak,
      () => {
        if (cancelled) return;
        pauseTimer = setTimeout(() => {
          if (cancelled) return;
          setStepIndex((prev) => {
            if (prev < TOTAL_STEPS - 1) {
              return prev + 1;
            }
            setIsAutoPlaying(false);
            return prev;
          });
        }, 2500);
      },
      'female',
      voiceRate,
      'persona-jenny'
    );

    return () => {
      cancelled = true;
      if (pauseTimer) clearTimeout(pauseTimer);
    };
  }, [isAutoPlaying, stepIndex, voiceRate]);

  const handleToggleSingleListen = () => {
    if (isAutoPlaying) {
      setIsAutoPlaying(false);
      SacredReader.stop();
      return;
    }
    if (isSpeakingSingle) {
      SacredReader.stop();
      setIsSpeakingSingle(false);
      return;
    }
    const text = buildSpeechForStep(stepIndex);
    if (!text) return;
    setIsSpeakingSingle(true);
    SacredReader.speak(
      text,
      () => setIsSpeakingSingle(false),
      'female',
      voiceRate,
      'persona-jenny'
    );
  };

  const handleSelectStep = useCallback((nextIdx: number) => {
    const clamped = Math.max(0, Math.min(TOTAL_STEPS - 1, nextIdx));
    SacredReader.stop();
    setIsSpeakingSingle(false);
    setStepIndex(clamped);
  }, []);

  const handleResolvePlace = useCallback((idx: number, place: ResolvedJerusalemPlace) => {
    setResolvedPlaces((prev) => ({
      ...prev,
      [idx]: place,
    }));
  }, []);

  const handleCopyCurrent = () => {
    const text = buildCopyTextForStep(stepIndex);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeStation: StationOfTheCross | null =
    stepIndex >= 1 && stepIndex <= STATIONS_OF_THE_CROSS.length
      ? STATIONS_OF_THE_CROSS[stepIndex - 1]
      : null;

  const activeArtwork = getArtworkForStep(stepIndex);
  const progressPercent = Math.round(((stepIndex + 1) / TOTAL_STEPS) * 100);

  // Keyboard navigation for the Stations Lightbox Modal
  useEffect(() => {
    if (lightboxStation === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxStation(null);
      } else if (e.key === 'ArrowLeft') {
        setLightboxStation((prev) => (prev !== null && prev > 1 ? prev - 1 : prev));
      } else if (e.key === 'ArrowRight') {
        setLightboxStation((prev) =>
          prev !== null && prev < STATIONS_OF_THE_CROSS.length ? prev + 1 : prev
        );
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxStation]);

  const markImageBroken = useCallback((key: string) => {
    setBrokenImages((prev) => (prev[key] ? prev : { ...prev, [key]: true }));
  }, []);

  const lightboxEntry = lightboxStation ? STATION_ARTWORK[lightboxStation] : null;
  const lightboxStationData = lightboxStation ? STATIONS_OF_THE_CROSS[lightboxStation - 1] : null;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Passion & 3:00 PM Hour of Mercy Banner */}
      <div className="sanctum-top-banner relative isolate min-h-[196px] sm:min-h-[212px] w-full px-5 py-3.5 sm:px-6 bg-gradient-to-r from-[#450A0A] via-[#240B0C] to-[#121619] rounded-xl text-white shadow-md border border-amber-400/35 flex flex-col justify-between gap-2 overflow-hidden">
        <div
          className="pointer-events-none select-none absolute inset-y-0 right-0 w-[144px] sm:w-[176px] overflow-hidden z-0"
          aria-hidden="true"
        >
          <img
            src={divineMercyImg}
            alt="The Divine Mercy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="h-full w-full object-contain object-right"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.85) 16%, black 32%, black 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.85) 16%, black 32%, black 100%)',
            }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#121619]/35 via-transparent to-[#121619]/20" />
        </div>

        <div className="relative z-10 space-y-1 pr-[132px] sm:pr-[168px]">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-cinzel text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-amber-300 leading-tight">
              THE WAY OF THE CROSS • ST. ALPHONSUS LIGUORI • 3:00 PM DEVOTION
            </span>
          </div>
          <h3 className="font-cinzel text-lg sm:text-2xl font-bold text-amber-50 leading-tight">
            Interactive Stations of the Cross
          </h3>
          <p className="text-[11px] sm:text-xs text-stone-200 font-serif italic leading-[1.24]">
            Pray all 14 Stations with Jenny and follow each sacred site in Jerusalem, Israel.
          </p>
        </div>

        <div className="relative z-10 h-8 flex items-center justify-between gap-2 mt-auto shrink-0 pr-[132px] sm:pr-[168px]">
          <div className="flex items-center gap-2 min-w-0 overflow-x-auto no-scrollbar">
            {!isAutoPlaying ? (
              <button
                type="button"
                onClick={() => {
                  SacredReader.stop();
                  setIsSpeakingSingle(false);
                  setIsAutoPlaying(true);
                }}
                className="h-8 flex items-center gap-1.5 px-3 rounded-md bg-gradient-to-r from-red-700 via-red-800 to-red-900 hover:from-red-600 hover:to-red-800 text-amber-50 font-cinzel font-bold text-[10px] sm:text-[11px] shadow-xs transition-all cursor-pointer border border-amber-300/70 shrink-0"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>AUTOPLAY (JENNY)</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsAutoPlaying(false);
                  SacredReader.stop();
                }}
                className="h-8 flex items-center gap-1.5 px-3 rounded-md bg-red-800 hover:bg-red-900 text-amber-50 font-cinzel font-bold text-[10px] sm:text-[11px] shadow-xs transition-all cursor-pointer border border-amber-300 animate-pulse shrink-0"
              >
                <Pause className="w-3 h-3 fill-current" />
                <span>PAUSE JENNY</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setIsAutoPlaying(false);
                SacredReader.stop();
                onSwitchToThreeOClock();
              }}
              className="hidden sm:flex h-8 items-center gap-1.5 px-2.5 rounded-md bg-amber-500/20 hover:bg-amber-500/35 border border-amber-400/40 text-amber-200 text-[10px] sm:text-[11px] font-cinzel font-bold tracking-wider transition-all cursor-pointer shrink-0"
            >
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>3 O&apos;Clock Prayer</span>
            </button>
          </div>

          {renderSettingsToggleButton('dark')}
        </div>
      </div>

      {renderSettingsDropdown()}

      {/* St. Faustina 3:00 PM Hour of Mercy Callout */}
      <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-br from-[#FBF4E9] via-[#F6EBDC] to-[#EFE0CA] border border-[#D4B48C] shadow-xs space-y-1.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-cinzel text-[11px] font-bold uppercase tracking-widest text-[#7A1C1C]">
            Jesus to St. Faustina • The 3:00 PM Hour of Great Mercy
          </span>
          <span className="text-[11px] font-serif italic text-[#6B4423]">
            {STATIONS_AUTHOR_META.faustinaCitation}
          </span>
        </div>
        <p className="text-xs sm:text-sm text-[#3A2010] font-serif italic leading-relaxed">
          &ldquo;{STATIONS_AUTHOR_META.faustinaQuote}&rdquo;
        </p>
      </div>

      {/* Interactive 14-Station Progress & Selector Rail */}
      <div className="bg-white rounded-xl border border-stone-200 shadow-xs p-3.5 sm:p-4 space-y-3">
        <div className="flex items-center justify-between gap-2 text-xs">
          <span className="font-cinzel font-bold uppercase tracking-wider text-red-900">
            {stepIndex === 0
              ? 'Preparatory Prayer'
              : stepIndex === TOTAL_STEPS - 1
                ? 'Concluding Prayer'
                : `Station ${activeStation?.roman} of XIV`}
          </span>
          <span className="text-stone-500 font-medium">
            {progressPercent}% Complete • {STATIONS_AUTHOR_META.author}
          </span>
        </div>

        <div className="w-full h-1.5 bg-stone-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-800 via-red-700 to-amber-500 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-16 gap-1.5">
          {Array.from({ length: TOTAL_STEPS }, (_, idx) => {
            const label =
              idx === 0
                ? 'Prep'
                : idx === TOTAL_STEPS - 1
                  ? 'End'
                  : STATIONS_OF_THE_CROSS[idx - 1].roman;
            const isCurrent = idx === stepIndex;
            const isPassed = idx < stepIndex;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectStep(idx)}
                className={`py-1.5 px-1 rounded-lg font-cinzel text-[10px] sm:text-[11px] font-bold transition-all cursor-pointer border text-center ${
                  isCurrent
                    ? 'bg-gradient-to-b from-[#8B1A1A] to-[#5B0E0E] text-amber-100 border-amber-400 ring-2 ring-amber-400/50 shadow-sm'
                    : isPassed
                      ? 'bg-red-50 text-red-900 border-red-200 hover:bg-red-100'
                      : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-amber-50 hover:text-red-900'
                }`}
                title={
                  idx === 0
                    ? STATIONS_PREPARATORY_PRAYER.title
                    : idx === TOTAL_STEPS - 1
                      ? STATIONS_CONCLUDING_PRAYER.title
                      : `Station ${STATIONS_OF_THE_CROSS[idx - 1].roman}: ${STATIONS_OF_THE_CROSS[idx - 1].title}`
                }
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Jenny Voice Reader & Controls Bar */}
      <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-[#22110C] via-[#341610] to-[#22110C] text-amber-50 border border-amber-400/30 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleToggleSingleListen}
            className={`px-3.5 py-2 rounded-lg text-xs font-cinzel font-bold flex items-center gap-2 transition-all cursor-pointer border ${
              isSpeakingSingle || isAutoPlaying
                ? 'bg-amber-400 text-stone-950 border-amber-200 shadow-sm'
                : 'bg-red-800 hover:bg-red-700 text-amber-50 border-amber-300/60'
            }`}
          >
            {isSpeakingSingle || isAutoPlaying ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span>Stop Jenny</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-amber-200" />
                <span>Listen (Jenny)</span>
              </>
            )}
          </button>

          <span className="text-[11px] font-serif text-amber-200/90 px-2 py-1 rounded-md bg-white/10 border border-white/15">
            Voice: <strong className="text-amber-300">Jenny</strong> (Microsoft Neural)
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Pace Selector */}
          <div className="flex items-center rounded-lg bg-black/30 border border-amber-300/25 p-0.5 text-[11px]">
            {[
              { label: 'Slow', rate: 0.75 },
              { label: 'Calm', rate: 0.85 },
              { label: 'Normal', rate: 0.95 },
            ].map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => setVoiceRate(opt.rate)}
                className={`px-2 py-1 rounded-md font-semibold transition-colors cursor-pointer ${
                  voiceRate === opt.rate
                    ? 'bg-amber-400 text-stone-950'
                    : 'text-amber-100/80 hover:text-white'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setShowLatin((prev) => !prev)}
            className={`px-2.5 py-1.5 rounded-lg text-[11px] font-semibold border transition-colors cursor-pointer ${
              showLatin
                ? 'bg-amber-400 text-stone-950 border-amber-200'
                : 'bg-white/10 hover:bg-white/20 text-amber-100 border-amber-300/30'
            }`}
          >
            {showLatin ? 'Latin: On' : 'Stabat Mater Latin'}
          </button>

          <button
            type="button"
            onClick={handleCopyCurrent}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-amber-100 border border-amber-300/30 transition-colors cursor-pointer"
            title="Copy this Station's prayers"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Live Interactive Jerusalem Map for Every Station (auto-pauses near quota limit or when key unavailable) */}
      {!mapsKeyLoaded ? (
        <div className="p-5 rounded-xl bg-stone-100 border border-stone-200 text-center text-sm text-stone-600">
          Loading Jerusalem Via Dolorosa map...
        </div>
      ) : quotaGuard.isStopped || !mapsApiKey ? (
        <div className="rounded-2xl overflow-hidden bg-[#FAF6F0] border border-amber-300/80 shadow-sm">
          <div className="px-4 py-3 bg-gradient-to-r from-[#2D0E0E] via-[#451313] to-[#29130D] text-amber-50 flex flex-wrap items-center justify-between gap-2 border-b border-amber-400/30">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-[10px] font-cinzel font-bold uppercase tracking-widest text-amber-300">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>
                  {activeStation
                    ? `Station ${activeStation.roman} in Jerusalem, Israel`
                    : 'Via Dolorosa • Jerusalem, Israel'}
                </span>
              </div>
              <h4 className="font-serif text-sm sm:text-base font-bold text-white">
                {activeStation
                  ? activeStation.jerusalemSiteName
                  : stepIndex === 0
                    ? STATIONS_PREPARATORY_PRAYER.jerusalemSiteName
                    : STATIONS_CONCLUDING_PRAYER.jerusalemSiteName}
              </h4>
            </div>
            {quotaGuard.isStopped && (
              <span className="px-2.5 py-1 rounded-md bg-amber-400/20 border border-amber-300/40 text-amber-200 text-[10px] font-cinzel font-bold uppercase tracking-wider">
                Map Paused • Quota Protected
              </span>
            )}
          </div>

          <div className="p-4 sm:p-5 space-y-3">
            <p className="text-xs sm:text-sm text-stone-700 font-serif leading-relaxed">
              {activeStation
                ? activeStation.jerusalemHistoricalNote
                : stepIndex === 0
                  ? STATIONS_PREPARATORY_PRAYER.jerusalemHistoricalNote
                  : STATIONS_CONCLUDING_PRAYER.jerusalemHistoricalNote}
            </p>
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-200/80">
              <p className="text-xs text-stone-600 font-serif italic">
                {quotaGuard.isStopped
                  ? 'The embedded Jerusalem map is paused to stay safely within free Google Maps quota. All 14 Stations and Jenny’s narration remain fully available.'
                  : 'Open this station’s exact location along the Via Dolorosa in Jerusalem on Google Maps.'}
              </p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  activeStation
                    ? activeStation.jerusalemPlaceQuery
                    : stepIndex === 0
                      ? STATIONS_PREPARATORY_PRAYER.jerusalemPlaceQuery
                      : STATIONS_CONCLUDING_PRAYER.jerusalemPlaceQuery
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-3 py-1.5 rounded-lg bg-white hover:bg-amber-50 border border-stone-300 text-red-900 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
              >
                <span>View Site on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      ) : (
        <APIProvider
          apiKey={mapsApiKey}
          libraries={['places', 'marker', 'routes']}
          language="en"
        >
          <StationJerusalemMapInner
            stepIndex={stepIndex}
            activeStation={activeStation}
            resolvedPlaces={resolvedPlaces}
            onResolvePlace={handleResolvePlace}
            onSelectStep={handleSelectStep}
            showWalkRoute={showWalkRoute}
            onToggleWalkRoute={() => setShowWalkRoute((prev) => !prev)}
            mapTypeId={mapTypeId}
            onToggleMapType={() =>
              setMapTypeId((prev) => (prev === 'hybrid' ? 'roadmap' : 'hybrid'))
            }
          />
        </APIProvider>
      )}

      {/* Main Sacred Devotion Text Card */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-md overflow-hidden">
        {/* Card Header */}
        <div className="px-5 py-4 sm:px-7 sm:py-5 bg-gradient-to-r from-[#F9F2E8] via-[#F4E8D7] to-[#EFE0C9] border-b border-[#D8C2A6] space-y-1.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-[#7D1A1A]">
              {activeStation
                ? `Station ${activeStation.roman} • ${activeStation.jerusalemQuarter}`
                : stepIndex === 0
                  ? STATIONS_PREPARATORY_PRAYER.subtitle
                  : STATIONS_CONCLUDING_PRAYER.subtitle}
            </span>
            <span className="text-xs font-serif italic text-[#6B4423]">
              {activeStation
                ? activeStation.postureCue
                : stepIndex === 0
                  ? STATIONS_PREPARATORY_PRAYER.postureCue
                  : STATIONS_CONCLUDING_PRAYER.postureCue}
            </span>
          </div>

          <h4 className="font-cinzel text-xl sm:text-2xl font-bold text-[#2D140C]">
            {activeStation
              ? `${activeStation.roman}. ${activeStation.title}`
              : stepIndex === 0
                ? STATIONS_PREPARATORY_PRAYER.title
                : STATIONS_CONCLUDING_PRAYER.title}
          </h4>
        </div>

        {/* Card Body: Museum-Editorial Two-Column Split (Sacred Artwork + Prayers) */}
        <div className="p-5 sm:p-7">
          <div className="lg:grid lg:grid-cols-12 lg:gap-7 items-start space-y-6 lg:space-y-0">
            {/* Left Column: Gallery-Framed Ink & Watercolor Station Plate */}
            <figure className="lg:col-span-5 lg:sticky lg:top-6 space-y-3">
              {/* Museum Gallery Lighting Switcher */}
              <div
                className="flex flex-wrap items-center justify-between gap-2"
                role="group"
                aria-label="Gallery lighting mode"
              >
                <span className="font-cinzel text-[10px] font-bold uppercase tracking-widest text-[#7D1A1A]">
                  Gallery Lighting
                </span>
                <div className="inline-flex rounded-lg border border-[#D8C2A6] bg-[#FAF6F0] p-0.5">
                  <button
                    type="button"
                    onClick={() => setLightingMode('spotlight')}
                    aria-pressed={lightingMode === 'spotlight'}
                    className={`whitespace-nowrap shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded-md font-cinzel text-[10px] font-bold transition-colors cursor-pointer ${
                      lightingMode === 'spotlight'
                        ? 'bg-[#2B140C] text-amber-100 shadow-2xs'
                        : 'text-[#6B4423] hover:text-[#2D140C]'
                    }`}
                  >
                    <Sun className="w-3 h-3" />
                    <span>Daylight</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightingMode('candlelight')}
                    aria-pressed={lightingMode === 'candlelight'}
                    className={`whitespace-nowrap shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded-md font-cinzel text-[10px] font-bold transition-colors cursor-pointer ${
                      lightingMode === 'candlelight'
                        ? 'bg-[#7D1A1A] text-amber-50 shadow-2xs'
                        : 'text-[#6B4423] hover:text-[#2D140C]'
                    }`}
                  >
                    <Flame className="w-3 h-3" />
                    <span>Candlelight</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightingMode('shadow-study')}
                    aria-pressed={lightingMode === 'shadow-study'}
                    className={`whitespace-nowrap shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded-md font-cinzel text-[10px] font-bold transition-colors cursor-pointer ${
                      lightingMode === 'shadow-study'
                        ? 'bg-[#4E3524] text-amber-50 shadow-2xs'
                        : 'text-[#6B4423] hover:text-[#2D140C]'
                    }`}
                    title="Deepen sepia ink contours and watercolor washes for closer study"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Ink Study</span>
                  </button>
                </div>
              </div>

              {/* Layered Ebony & Antique-Gold Fillet Museum Frame around archival cotton watercolor paper */}
              <div className="bg-gradient-to-b from-[#1E120C] via-[#130A07] to-[#0B0604] p-2.5 sm:p-3 border border-[#8E6A3A]/60 shadow-[0_14px_32px_rgba(20,10,5,0.28)]">
                <div className="p-[2px] bg-gradient-to-br from-[#C8A15A]/75 via-[#6E4F26]/55 to-[#B68D45]/75">
                  <button
                    type="button"
                    onClick={() => setLightboxStation(activeArtwork.stationNumber)}
                    style={{ backgroundColor: activeArtwork.paperBg }}
                    className="group relative flex items-center justify-center w-full aspect-[4/3] overflow-hidden cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                    aria-label={`Inspect watercolor plate in high-resolution museum viewer: ${activeArtwork.plateTitle}`}
                  >
                    {!brokenImages[`main-${activeArtwork.stationNumber}`] ? (
                      <>
                        <img
                          key={`main-plate-${activeArtwork.stationNumber}`}
                          src={activeArtwork.src}
                          alt={activeArtwork.alt}
                          referrerPolicy="no-referrer"
                          onError={() => markImageBroken(`main-${activeArtwork.stationNumber}`)}
                          style={{
                            filter: GALLERY_LIGHTING_FILTER[lightingMode],
                            clipPath:
                              activeArtwork.frameFit === 'clipped-contain'
                                ? activeArtwork.clipPath
                                : undefined,
                            transform:
                              activeArtwork.baseScale
                                ? `scale(${activeArtwork.baseScale})`
                                : undefined,
                          }}
                          className={
                            activeArtwork.frameFit === 'clipped-contain'
                              ? 'h-full w-auto max-w-none block transition-all duration-500'
                              : activeArtwork.frameFit === 'contain'
                                ? 'w-full h-full object-contain transition-all duration-500 group-hover:scale-[1.025]'
                                : 'w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.03]'
                          }
                        />
                        {/* Museum Picture-Lamp Daylight or Chapel Candlelight Sheen */}
                        {lightingMode === 'spotlight' && (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 caravaggio-gallery-spotlight"
                          />
                        )}
                        {lightingMode === 'candlelight' && (
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 caravaggio-candle-sheen"
                          />
                        )}
                        {/* Soft recessed archival matte vignette */}
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 shadow-[inset_0_0_18px_rgba(72,46,24,0.18)]"
                        />
                      </>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#2A0E0A] to-[#140705] text-amber-100">
                        <svg
                          viewBox="0 0 48 48"
                          className="w-10 h-10 text-amber-300/80 mb-2"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          aria-hidden="true"
                        >
                          <path d="M24 6v36M14 16h20" />
                        </svg>
                        <span className="font-cinzel text-xs font-bold tracking-widest uppercase text-amber-200">
                          Station {activeArtwork.roman}
                        </span>
                      </div>
                    )}
                  </button>
                </div>
              </div>

              <figcaption className="space-y-2 pt-0.5">
                <div className="flex items-start justify-between gap-3">
                  <span className="font-serif italic text-xs sm:text-[13px] text-[#5C3A21] leading-snug">
                    {activeArtwork.caption}
                  </span>
                  <button
                    type="button"
                    onClick={() => setLightboxStation(activeArtwork.stationNumber)}
                    className="whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#D8C2A6] bg-[#FAF6F0] hover:bg-[#F3E7D6] text-[#7D1A1A] text-[11px] font-cinzel font-bold transition-colors cursor-pointer"
                  >
                    <Maximize2 className="w-3 h-3" />
                    <span>Inspect Plate</span>
                  </button>
                </div>
                <p className="font-serif text-xs sm:text-[13px] leading-relaxed text-stone-600 border-t border-stone-200/80 pt-2">
                  <span className="font-cinzel text-[10px] font-bold uppercase tracking-wider text-[#7D1A1A] mr-1.5">
                    Watercolor Study:
                  </span>
                  {activeArtwork.studyNote}
                </p>
              </figcaption>
            </figure>

            {/* Right Column: Scripture, Meditation, Prayer & Stabat Mater */}
            <div className="lg:col-span-7 space-y-5 font-serif text-stone-900">
              {stepIndex === 0 && (
                <>
                  <div className="p-4 sm:p-5 rounded-xl bg-[#FCF9F4] border border-[#E4D4BE] text-base sm:text-lg leading-relaxed text-[#2D180E]">
                    {STATIONS_PREPARATORY_PRAYER.prayerText}
                  </div>

                  <div className="p-4 rounded-xl bg-red-950/5 border border-red-900/15 space-y-1.5">
                    <span className="font-cinzel text-[11px] font-bold uppercase tracking-wider text-red-900 block">
                      Stabat Mater (Opening Verse)
                    </span>
                    <p className="italic text-stone-800 text-sm sm:text-base">
                      {STATIONS_PREPARATORY_PRAYER.stabatMaterEnglish}
                    </p>
                    {showLatin && (
                      <p className="italic text-stone-600 text-xs sm:text-sm pt-1 border-t border-red-900/10">
                        {STATIONS_PREPARATORY_PRAYER.stabatMaterLatin}
                      </p>
                    )}
                  </div>
                </>
              )}

              {activeStation && (
                <>
                  {/* Opening Adoration Versicle & Response */}
                  <div className="p-4 rounded-xl bg-gradient-to-r from-[#5A1111] to-[#3B0A0A] text-amber-50 space-y-1 shadow-xs">
                    <p className="text-sm sm:text-base">
                      <span className="font-cinzel font-bold text-amber-300 mr-1.5">V.</span>
                      {STATIONS_AUTHOR_META.openingVersicle}
                    </p>
                    <p className="text-sm sm:text-base font-semibold">
                      <span className="font-cinzel font-bold text-amber-300 mr-1.5">R.</span>
                      {STATIONS_AUTHOR_META.openingResponse}
                    </p>
                  </div>

                  {/* Sacred Scripture */}
                  <div className="p-4 sm:p-5 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1.5">
                    <div className="flex items-center gap-1.5 font-cinzel text-xs font-bold uppercase tracking-wider text-amber-900">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Sacred Scripture — {activeStation.scriptureRef}</span>
                    </div>
                    <p className="text-sm sm:text-base italic text-stone-800 leading-relaxed">
                      &ldquo;{activeStation.scriptureText}&rdquo;
                    </p>
                  </div>

                  {/* Meditation by St. Alphonsus Liguori */}
                  <div className="space-y-1.5">
                    <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-red-900 block">
                      Meditation ({STATIONS_AUTHOR_META.author})
                    </span>
                    <p className="text-base sm:text-lg leading-relaxed text-stone-800">
                      {activeStation.meditation}
                    </p>
                  </div>

                  {/* Prayer by St. Alphonsus Liguori */}
                  <div className="p-4 sm:p-5 rounded-xl bg-[#FCF9F4] border border-[#E4D4BE] space-y-3">
                    <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-[#7D1A1A] block">
                      Prayer
                    </span>
                    <p className="text-base sm:text-lg leading-relaxed text-[#2D180E]">
                      {activeStation.prayer}
                    </p>
                    <p className="text-sm sm:text-base italic text-[#5C2B1A] pt-3 border-t border-[#E4D4BE]">
                      {STATIONS_AUTHOR_META.aspiration}
                    </p>
                    <p className="text-xs sm:text-sm font-cinzel font-bold tracking-wide text-red-900 pt-2 border-t border-[#E4D4BE]">
                      Our Father… • Hail Mary… • Glory Be…
                    </p>
                  </div>

                  {/* Stabat Mater Verse */}
                  <div className="p-4 rounded-xl bg-red-950/5 border border-red-900/15 space-y-1.5">
                    <span className="font-cinzel text-[11px] font-bold uppercase tracking-wider text-red-900 block">
                      Stabat Mater (Verse {activeStation.roman})
                    </span>
                    <p className="italic text-stone-800 text-sm sm:text-base">
                      {activeStation.stabatMaterEnglish}
                    </p>
                    {showLatin && (
                      <p className="italic text-stone-600 text-xs sm:text-sm pt-1 border-t border-red-900/10">
                        {activeStation.stabatMaterLatin}
                      </p>
                    )}
                  </div>
                </>
              )}

              {stepIndex === TOTAL_STEPS - 1 && (
                <>
                  <div className="p-4 sm:p-5 rounded-xl bg-[#FCF9F4] border border-[#E4D4BE] text-base sm:text-lg leading-relaxed text-[#2D180E]">
                    {STATIONS_CONCLUDING_PRAYER.prayerText}
                  </div>

                  <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 space-y-2 text-sm sm:text-base text-stone-800">
                    <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-amber-900 block">
                      For the Intentions of the Sovereign Pontiff &amp; Plenary Indulgence
                    </span>
                    <p>{STATIONS_CONCLUDING_PRAYER.pontiffNote}</p>
                    <p className="font-bold text-red-900 pt-1">
                      {STATIONS_CONCLUDING_PRAYER.closingDoxology}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Station Navigation Bar */}
        <div className="px-5 py-3.5 sm:px-7 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3">
          <button
            type="button"
            disabled={stepIndex === 0}
            onClick={() => handleSelectStep(stepIndex - 1)}
            className="whitespace-nowrap shrink-0 px-3.5 py-2 rounded-lg border border-stone-300 bg-white hover:bg-stone-100 disabled:opacity-40 disabled:cursor-not-allowed text-stone-800 text-xs sm:text-sm font-cinzel font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setIsAutoPlaying(false);
              handleSelectStep(0);
            }}
            className="whitespace-nowrap shrink-0 px-3 py-2 rounded-lg text-stone-600 hover:text-red-900 hover:bg-stone-200/60 text-xs font-cinzel font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Return to Preparatory Prayer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Restart</span>
          </button>

          <button
            type="button"
            disabled={stepIndex === TOTAL_STEPS - 1}
            onClick={() => handleSelectStep(stepIndex + 1)}
            className="whitespace-nowrap shrink-0 px-4 py-2 rounded-lg bg-gradient-to-r from-[#7F1D1D] to-[#560F0F] hover:from-[#991B1B] hover:to-[#6E1414] disabled:opacity-40 disabled:cursor-not-allowed text-amber-50 text-xs sm:text-sm font-cinzel font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
          >
            <span>
              {stepIndex === 0
                ? 'Begin Station I'
                : stepIndex === STATIONS_OF_THE_CROSS.length
                  ? 'Concluding Prayer'
                  : 'Next Station'}
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* All XIV Illustrated Stations Gallery */}
      <section
        aria-labelledby="stations-gallery-heading"
        className="bg-white rounded-2xl border border-stone-200 shadow-sm p-4 sm:p-6 space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-3 border-b border-stone-200/80">
          <div>
            <span className="font-cinzel text-[11px] font-bold uppercase tracking-widest text-[#7D1A1A] block">
              XIV Sacred Ink &amp; Watercolor Plates • Cotton Rag Series
            </span>
            <h4
              id="stations-gallery-heading"
              className="font-cinzel text-lg sm:text-xl font-bold text-[#2D140C]"
            >
              The Fourteen Stations of the Cross
            </h4>
          </div>
          <p className="text-xs font-serif italic text-[#6B4423]">
            Select any watercolor plate to pray that Station, meditate on the artwork, and view its site in Jerusalem
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
          {STATIONS_OF_THE_CROSS.map((st) => {
            const art = STATION_ARTWORK[st.number];
            const isSelected = stepIndex === st.number;
            return (
              <button
                key={st.number}
                type="button"
                onClick={() => handleSelectStep(st.number)}
                className={`group text-left rounded-lg p-1.5 border transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7D1A1A] ${
                  isSelected
                    ? 'bg-[#FAF3EA] border-[#7D1A1A] ring-2 ring-[#7D1A1A]/35 shadow-xs'
                    : 'bg-[#FCF9F4] border-stone-200 hover:border-[#B68D45] hover:bg-[#FAF6F0]'
                }`}
                aria-current={isSelected ? 'step' : undefined}
              >
                {/* Miniature ebony & gold-fillet museum frame */}
                <div className="w-full p-[3px] bg-[#140B07] border border-[#8E6A3A]/55 shadow-xs">
                  <div
                    style={{ backgroundColor: art.paperBg }}
                    className="relative flex items-center justify-center w-full aspect-[4/3] overflow-hidden"
                  >
                    {!brokenImages[`thumb-${st.number}`] ? (
                      <>
                        <img
                          src={art.src}
                          alt={art.alt}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={() => markImageBroken(`thumb-${st.number}`)}
                          style={{
                            filter: GALLERY_LIGHTING_FILTER[lightingMode],
                            clipPath:
                              art.frameFit === 'clipped-contain' ? art.clipPath : undefined,
                            transform: art.baseScale ? `scale(${art.baseScale})` : undefined,
                          }}
                          className={
                            art.frameFit === 'clipped-contain'
                              ? 'h-full w-auto max-w-none block transition-transform duration-300'
                              : art.frameFit === 'contain'
                                ? 'w-full h-full object-contain transition-transform duration-300 group-hover:scale-[1.04]'
                                : 'w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.05]'
                          }
                        />
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 shadow-[inset_0_0_8px_rgba(72,46,24,0.16)]"
                        />
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#230E0A] text-amber-200 font-cinzel text-xs font-bold">
                        {st.roman}
                      </div>
                    )}
                  </div>
                </div>
                <div className="pt-1.5 px-0.5 space-y-0.5">
                  <span
                    className={`block font-cinzel text-[10px] font-bold tracking-wider uppercase ${
                      isSelected ? 'text-[#7D1A1A]' : 'text-[#8A5A32]'
                    }`}
                  >
                    Station {st.roman}
                  </span>
                  <span className="block font-serif text-[11px] leading-tight text-stone-800 line-clamp-2">
                    {art.shortTitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Full-Screen Museum Lightbox Inspector for High-Resolution Watercolor Plates */}
      {lightboxEntry && lightboxStationData && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="station-lightbox-title"
          className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-5"
          onClick={() => setLightboxStation(null)}
        >
          <div
            className="w-full max-w-5xl max-h-[94vh] bg-[#140A07] border border-[#C8A15A]/45 rounded-xl overflow-hidden shadow-2xl text-amber-50 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header + Museum Lighting & Zoom Controls */}
            <div className="px-4 py-3 sm:px-6 bg-[#1F0F0B] border-b border-amber-300/20 flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-0">
                <span className="font-cinzel text-[10px] font-bold uppercase tracking-widest text-amber-300 block">
                  Plate {lightboxEntry.roman} of XIV • {lightboxStationData.scriptureRef}
                </span>
                <h5
                  id="station-lightbox-title"
                  className="font-cinzel text-sm sm:text-lg font-bold text-amber-50 truncate"
                >
                  {lightboxStationData.title}
                </h5>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                {/* Gallery Lighting Switcher */}
                <div
                  className="inline-flex rounded-md border border-amber-300/25 bg-black/40 p-0.5"
                  role="group"
                  aria-label="Lightbox lighting mode"
                >
                  <button
                    type="button"
                    onClick={() => setLightingMode('spotlight')}
                    aria-pressed={lightingMode === 'spotlight'}
                    className={`whitespace-nowrap shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-cinzel font-bold transition-colors cursor-pointer ${
                      lightingMode === 'spotlight'
                        ? 'bg-amber-400 text-stone-950'
                        : 'text-amber-100/80 hover:text-amber-50'
                    }`}
                  >
                    <Sun className="w-3 h-3" />
                    <span className="hidden sm:inline">Daylight</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightingMode('candlelight')}
                    aria-pressed={lightingMode === 'candlelight'}
                    className={`whitespace-nowrap shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-cinzel font-bold transition-colors cursor-pointer ${
                      lightingMode === 'candlelight'
                        ? 'bg-amber-400 text-stone-950'
                        : 'text-amber-100/80 hover:text-amber-50'
                    }`}
                  >
                    <Flame className="w-3 h-3" />
                    <span className="hidden sm:inline">Candlelight</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setLightingMode('shadow-study')}
                    aria-pressed={lightingMode === 'shadow-study'}
                    className={`whitespace-nowrap shrink-0 inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-cinzel font-bold transition-colors cursor-pointer ${
                      lightingMode === 'shadow-study'
                        ? 'bg-amber-400 text-stone-950'
                        : 'text-amber-100/80 hover:text-amber-50'
                    }`}
                  >
                    <Eye className="w-3 h-3" />
                    <span className="hidden sm:inline">Ink Study</span>
                  </button>
                </div>

                {/* Watercolor Detail Zoom Controls */}
                <div className="inline-flex items-center rounded-md border border-amber-300/25 bg-black/40 p-0.5">
                  <button
                    type="button"
                    disabled={lightboxZoom <= 1}
                    onClick={() => {
                      const next = lightboxZoom > 1.75 ? 1.75 : 1;
                      setLightboxZoom(next);
                      if (next === 1) setLightboxPan({ x: 0, y: 0 });
                    }}
                    className="whitespace-nowrap shrink-0 p-1.5 rounded text-amber-100 hover:bg-white/10 disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer"
                    aria-label="Zoom out"
                    title="Zoom out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLightboxZoom(1);
                      setLightboxPan({ x: 0, y: 0 });
                    }}
                    className="whitespace-nowrap shrink-0 px-1.5 font-cinzel text-[10px] font-bold text-amber-200 hover:text-amber-50 cursor-pointer"
                    title="Reset zoom"
                  >
                    {Math.round(lightboxZoom * 100)}%
                  </button>
                  <button
                    type="button"
                    disabled={lightboxZoom >= 2.5}
                    onClick={() => setLightboxZoom((z) => (z < 1.75 ? 1.75 : 2.5))}
                    className="whitespace-nowrap shrink-0 p-1.5 rounded text-amber-100 hover:bg-white/10 disabled:opacity-35 disabled:cursor-not-allowed cursor-pointer"
                    aria-label="Zoom in to inspect brushwork"
                    title="Zoom in to inspect brushwork"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setLightboxStation(null)}
                  className="whitespace-nowrap shrink-0 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-amber-100 border border-amber-300/30 transition-colors cursor-pointer"
                  aria-label="Close museum viewer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Interactive Zoomable & Pannable Framed Canvas */}
            <div
              className={`relative bg-[#0A0504] flex items-center justify-center p-3 sm:p-5 overflow-hidden select-none ${
                lightboxZoom > 1
                  ? isDraggingPan
                    ? 'cursor-grabbing'
                    : 'cursor-grab'
                  : 'cursor-zoom-in'
              }`}
              onPointerDown={(e) => {
                if (lightboxZoom <= 1) return;
                (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
                setIsDraggingPan(true);
                panOriginRef.current = {
                  x: e.clientX,
                  y: e.clientY,
                  panX: lightboxPan.x,
                  panY: lightboxPan.y,
                };
              }}
              onPointerMove={(e) => {
                if (!isDraggingPan || !panOriginRef.current) return;
                const maxOffset = lightboxZoom >= 2.5 ? 280 : 170;
                const nextX = Math.max(
                  -maxOffset,
                  Math.min(maxOffset, panOriginRef.current.panX + (e.clientX - panOriginRef.current.x))
                );
                const nextY = Math.max(
                  -maxOffset,
                  Math.min(maxOffset, panOriginRef.current.panY + (e.clientY - panOriginRef.current.y))
                );
                setLightboxPan({ x: nextX, y: nextY });
              }}
              onPointerUp={() => {
                setIsDraggingPan(false);
                panOriginRef.current = null;
              }}
              onPointerCancel={() => {
                setIsDraggingPan(false);
                panOriginRef.current = null;
              }}
              onClick={() => {
                if (lightboxZoom === 1) {
                  setLightboxZoom(1.75);
                }
              }}
            >
              {!brokenImages[`lightbox-${lightboxEntry.stationNumber}`] ? (
                <div className="p-2 bg-gradient-to-b from-[#1E120C] to-[#0D0705] border border-[#C8A15A]/55 shadow-2xl overflow-hidden">
                  <div
                    style={{ backgroundColor: lightboxEntry.paperBg }}
                    className="relative overflow-hidden"
                  >
                    <img
                      src={lightboxEntry.src}
                      alt={lightboxEntry.alt}
                      draggable={false}
                      referrerPolicy="no-referrer"
                      onError={() => markImageBroken(`lightbox-${lightboxEntry.stationNumber}`)}
                      style={{
                        filter: GALLERY_LIGHTING_FILTER[lightingMode],
                        clipPath: lightboxEntry.clipPath,
                        transform: `translate3d(${lightboxPan.x}px, ${lightboxPan.y}px, 0) scale(${
                          lightboxZoom *
                          (lightboxEntry.clipPath ? (lightboxEntry.baseScale ?? 1.18) : 1)
                        })`,
                      }}
                      className={`max-h-[62vh] w-auto max-w-full object-contain block ${
                        isDraggingPan ? '' : 'transition-transform duration-300 ease-out'
                      }`}
                    />
                    {lightingMode === 'spotlight' && (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 caravaggio-gallery-spotlight"
                      />
                    )}
                    {lightingMode === 'candlelight' && (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 caravaggio-candle-sheen"
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div className="h-64 w-full flex flex-col items-center justify-center text-amber-200 font-cinzel text-sm">
                  Station {lightboxEntry.roman}: {lightboxStationData.title}
                </div>
              )}
            </div>

            {/* Modal Footer: Watercolor Study & Plate Navigation */}
            <div className="px-4 py-3 sm:px-6 bg-[#1F0F0B] border-t border-amber-300/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1 min-w-0">
                <p className="font-serif italic text-xs sm:text-sm text-amber-100/90">
                  {lightboxEntry.caption} — {lightboxStationData.jerusalemQuarter}
                </p>
                <p className="font-serif text-xs text-amber-200/75 leading-relaxed">
                  {lightboxEntry.studyNote}
                  {lightboxZoom > 1 ? ' Drag plate to pan details.' : ' Click plate or zoom to inspect ink and watercolor brushwork.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  disabled={lightboxEntry.stationNumber <= 1}
                  onClick={() =>
                    setLightboxStation((prev) => (prev !== null && prev > 1 ? prev - 1 : prev))
                  }
                  className="whitespace-nowrap shrink-0 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-35 disabled:cursor-not-allowed text-amber-100 border border-amber-300/30 text-xs font-cinzel font-bold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleSelectStep(lightboxEntry.stationNumber);
                    setLightboxStation(null);
                  }}
                  className="whitespace-nowrap shrink-0 px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-stone-950 text-xs font-cinzel font-bold transition-colors cursor-pointer"
                >
                  Pray Station {lightboxEntry.roman}
                </button>
                <button
                  type="button"
                  disabled={lightboxEntry.stationNumber >= STATIONS_OF_THE_CROSS.length}
                  onClick={() =>
                    setLightboxStation((prev) =>
                      prev !== null && prev < STATIONS_OF_THE_CROSS.length ? prev + 1 : prev
                    )
                  }
                  className="whitespace-nowrap shrink-0 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-35 disabled:cursor-not-allowed text-amber-100 border border-amber-300/30 text-xs font-cinzel font-bold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
