export type FallbackFilterId = 'all' | 'mass' | 'confession' | 'adoration' | 'shrines';

export interface FallbackParishItem {
  id: string;
  displayName: string;
  formattedAddress: string;
  location: { lat: number; lng: number };
  nationalPhoneNumber: string | null;
  websiteURI: string | null;
  weekdayDescriptions: string[];
  osmUrl: string | null;
  distanceMeters: number;
  isCatholicTagged: boolean;
  relevanceScore: number;
}

export interface LocationSuggestionItem {
  id: string;
  label: string;
  lat: number;
  lng: number;
}

const USER_AGENT = 'SoulSanctumCatholicCompanion/1.0 (https://soul-sanctum.vercel.app)';
const CACHE_TTL_MS = 5 * 60 * 1000;

const searchCache = new Map<string, { expiresAt: number; data: any }>();

function getCached<T>(key: string): T | null {
  const entry = searchCache.get(key);
  if (entry && entry.expiresAt > Date.now()) {
    return entry.data as T;
  }
  if (entry) searchCache.delete(key);
  return null;
}

function setCached(key: string, data: any) {
  if (searchCache.size >= 150) {
    const first = searchCache.keys().next().value;
    if (first) searchCache.delete(first);
  }
  searchCache.set(key, { expiresAt: Date.now() + CACHE_TTL_MS, data });
}

function haversineMeters(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000;
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

const NON_CATHOLIC_DENOM_RE =
  /\b(lutheran|anglican|episcopal|baptist|methodist|presbyterian|pentecostal|orthodox|evangelical|protestant|reformed|mormon|latter[- ]?day|jehovah|iglesia ni cristo|adventist|seventh[- ]?day|unitarian|quaker|mennonite|muslim|islamic|sunni|shia|jewish|buddhist|hindu|taoist|shinto|sikh|nondenominational|non-denominational|charismatic|foursquare|born again|nazarene|salvation army|christian science|united church)\b/i;

const NON_CATHOLIC_NAME_RE =
  /\b(mosque|masjid|synagogue|kingdom hall|iglesia ni cristo|latter[- ]?day saints|\blds\b|baptist|methodist|lutheran|presbyterian|pentecostal|episcopal|anglican|orthodox|seventh[- ]?day adventist|assembly of god|assemblies of god|united church of christ|gospel hall|taoist temple|buddhist temple|hindu temple|sikh gurdwara|christian fellowship|victory center|bible church|\bccf\b)\b/i;

const EXCLUDED_CATEGORY_RE =
  /\b(cemetery|graveyard|university|college|school|hospital|office|brownfield|apartments|hotel|restaurant|cafe|supermarket|mall|park|bus_stop|station)\b/i;

const CATHOLIC_INDICATOR_RE =
  /\b(catholic|roman_catholic|roman catholic|basilica|cathedral|cattedrale|chiesa|parish|parroquia|paroisse|parrocchia|shrine|santuario|sanctuary|our lady|notre[- ]?dame|santo ni[nñ]o|sacred heart|holy family|holy cross|immaculate|saint|st\.|san |santa |sao |madonna|corpus christi|adoration|chapel)\b/i;

function isAllowedWebsite(raw: string | undefined): string | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const parsed = new URL(candidate);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return parsed.toString();
    }
  } catch {
    return null;
  }
  return null;
}

function formatOsmAddress(item: any): string {
  const a = item?.address;
  if (a && typeof a === 'object') {
    const line1 = [a.house_number, a.road || a.pedestrian || a.footway].filter(Boolean).join(' ');
    const suburb = a.suburb || a.neighbourhood || a.quarter || a.village || '';
    const city = a.city || a.town || a.municipality || a.county || '';
    const state = a.state || a.region || '';
    const postcode = a.postcode || '';
    const country = a.country || '';
    const parts = [line1, suburb, city, [state, postcode].filter(Boolean).join(' '), country]
      .map((s) => String(s || '').trim())
      .filter(Boolean);
    const deduped: string[] = [];
    for (const part of parts) {
      if (!deduped.some((p) => p.toLowerCase() === part.toLowerCase())) {
        deduped.push(part);
      }
    }
    if (deduped.length > 0) return deduped.join(', ');
  }
  if (typeof item?.display_name === 'string' && item.display_name.trim()) {
    const segments = item.display_name.split(',').map((s: string) => s.trim());
    return segments.slice(1, 5).join(', ') || item.display_name;
  }
  return 'Address listed on OpenStreetMap';
}

function scoreFilterMatch(
  name: string,
  extraText: string,
  filter: FallbackFilterId,
  isCatholicTagged: boolean
): number {
  const combined = `${name} ${extraText}`.toLowerCase();
  let score = isCatholicTagged ? 100 : 10;

  if (filter === 'shrines') {
    if (/\b(cathedral|cattedrale|basilica|shrine|santuario|sanctuary|duomo)\b/i.test(combined)) {
      score += 180;
    }
  } else if (filter === 'adoration') {
    if (/\b(adoration|blessed sacrament|eucharist|perpetual|chapel|cappella|capilla|oratory)\b/i.test(combined)) {
      score += 180;
    }
  } else if (filter === 'confession') {
    if (/\b(cathedral|basilica|shrine|parish|parroquia|paroisse|chiesa|church)\b/i.test(combined)) {
      score += 40;
    }
  } else if (filter === 'mass') {
    if (/\b(parish|cathedral|basilica|church|chiesa|parroquia|paroisse)\b/i.test(combined)) {
      score += 40;
    }
  }

  return score;
}

export async function handleParishSuggest(
  query: string,
  biasLat?: number,
  biasLng?: number
): Promise<{ suggestions: LocationSuggestionItem[] }> {
  const trimmed = query.trim();
  if (trimmed.length < 2) {
    return { suggestions: [] };
  }

  const cacheKey = `suggest:${trimmed.toLowerCase()}:${biasLat?.toFixed(2) ?? ''}:${biasLng?.toFixed(2) ?? ''}`;
  const cached = getCached<{ suggestions: LocationSuggestionItem[] }>(cacheKey);
  if (cached) return cached;

  const params = new URLSearchParams({
    format: 'jsonv2',
    addressdetails: '1',
    limit: '6',
    q: trimmed,
  });

  if (
    typeof biasLat === 'number' &&
    typeof biasLng === 'number' &&
    Number.isFinite(biasLat) &&
    Number.isFinite(biasLng)
  ) {
    const vb = `${(biasLng - 0.6).toFixed(3)},${(biasLat + 0.6).toFixed(3)},${(biasLng + 0.6).toFixed(3)},${(biasLat - 0.6).toFixed(3)}`;
    params.set('viewbox', vb);
  }

  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`, {
      headers: {
        'User-Agent': USER_AGENT,
        Accept: 'application/json',
        'Accept-Language': 'en',
      },
      signal: AbortSignal.timeout(4500),
    });

    if (!res.ok) {
      return { suggestions: [] };
    }

    const raw = (await res.json()) as any[];
    const seen = new Set<string>();
    const suggestions: LocationSuggestionItem[] = [];

    for (const item of Array.isArray(raw) ? raw : []) {
      const lat = Number(item?.lat);
      const lng = Number(item?.lon);
      const label = String(item?.display_name || item?.name || '').trim();
      if (!Number.isFinite(lat) || !Number.isFinite(lng) || !label) continue;
      const key = label.toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      suggestions.push({
        id: `${item.osm_type || 'osm'}-${item.osm_id || suggestions.length}`,
        label,
        lat,
        lng,
      });
    }

    const payload = { suggestions };
    setCached(cacheKey, payload);
    return payload;
  } catch {
    return { suggestions: [] };
  }
}

export async function handleParishSearch(options: {
  lat: number;
  lng: number;
  radiusMeters: number;
  filter: FallbackFilterId;
  queryText?: string;
  areaLabel?: string;
}): Promise<{
  parishes: FallbackParishItem[];
  center: { lat: number; lng: number };
  areaLabel: string;
}> {
  let centerLat = options.lat;
  let centerLng = options.lng;
  let areaLabel = options.areaLabel?.trim() || 'Selected Area';
  const radius = Math.min(Math.max(Number(options.radiusMeters) || 10000, 1000), 50000);
  const filter: FallbackFilterId = options.filter || 'all';
  const queryText = (options.queryText || '').trim();

  // If user submitted free-text search, geocode it first unless already matched
  let matchedDirectPlace: any = null;
  if (queryText) {
    try {
      const geoUrl = `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&extratags=1&limit=3&q=${encodeURIComponent(queryText)}`;
      const geoRes = await fetch(geoUrl, {
        headers: {
          'User-Agent': USER_AGENT,
          Accept: 'application/json',
          'Accept-Language': 'en',
        },
        signal: AbortSignal.timeout(4500),
      });
      if (geoRes.ok) {
        const geoArr = (await geoRes.json()) as any[];
        if (Array.isArray(geoArr) && geoArr.length > 0) {
          const first = geoArr[0];
          const gLat = Number(first.lat);
          const gLng = Number(first.lon);
          if (Number.isFinite(gLat) && Number.isFinite(gLng)) {
            centerLat = gLat;
            centerLng = gLng;
            areaLabel = String(first.name || queryText).trim();
            if (first.category === 'amenity' && first.type === 'place_of_worship') {
              matchedDirectPlace = first;
            }
          }
        }
      }
    } catch {
      // Keep provided coordinates if geocoding fails
    }
  }

  const cacheKey = `search:${centerLat.toFixed(3)}:${centerLng.toFixed(3)}:${radius}:${filter}:${queryText.toLowerCase()}`;
  const cached = getCached<{
    parishes: FallbackParishItem[];
    center: { lat: number; lng: number };
    areaLabel: string;
  }>(cacheKey);
  if (cached) return cached;

  // Approximate viewbox in degrees around center
  const latDeg = Math.max(0.035, Math.min(0.45, radius / 111320));
  const cosLat = Math.max(0.2, Math.cos((centerLat * Math.PI) / 180));
  const lngDeg = Math.max(0.035, Math.min(0.65, radius / (111320 * cosLat)));
  const vbTight = `${(centerLng - lngDeg).toFixed(4)},${(centerLat + latDeg).toFixed(4)},${(centerLng + lngDeg).toFixed(4)},${(centerLat - latDeg).toFixed(4)}`;

  const filterQueryWord =
    filter === 'shrines'
      ? 'cathedral basilica shrine'
      : filter === 'adoration'
        ? 'chapel adoration church'
        : 'catholic church';

  const nomWorshipUrl = `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&extratags=1&limit=40&q=${encodeURIComponent('[amenity=place_of_worship]')}&viewbox=${vbTight}&bounded=1`;
  const nomCatholicUrl = `https://nominatim.openstreetmap.org/search?format=jsonv2&addressdetails=1&extratags=1&limit=25&q=${encodeURIComponent(filterQueryWord)}&viewbox=${vbTight}&bounded=1`;
  const photonUrl = `https://photon.komoot.io/api/?q=${encodeURIComponent(
    filter === 'shrines' ? 'cathedral' : filter === 'adoration' ? 'chapel' : 'catholic church'
  )}&lat=${centerLat.toFixed(5)}&lon=${centerLng.toFixed(5)}&limit=18&osm_tag=amenity:place_of_worship`;

  const [worshipList, catholicList, photonPayload] = await Promise.all([
    fetch(nomWorshipUrl, {
      headers: { 'User-Agent': USER_AGENT, Accept: 'application/json', 'Accept-Language': 'en' },
      signal: AbortSignal.timeout(5500),
    })
      .then((r) => (r.ok ? r.json() : []))
      .catch(() => []),
    fetch(nomCatholicUrl, {
      headers: { 'User-Agent': USER_AGENT, Accept: 'application/json', 'Accept-Language': 'en' },
      signal: AbortSignal.timeout(5500),
    })
      .then((r) => (r.ok ? r.json() : []))
      .catch(() => []),
    fetch(photonUrl, {
      headers: { 'User-Agent': USER_AGENT, Accept: 'application/json' },
      signal: AbortSignal.timeout(5000),
    })
      .then((r) => (r.ok ? r.json() : { features: [] }))
      .catch(() => ({ features: [] })),
  ]);

  const rawNominatim: any[] = [
    ...(matchedDirectPlace ? [matchedDirectPlace] : []),
    ...(Array.isArray(catholicList) ? catholicList : []),
    ...(Array.isArray(worshipList) ? worshipList : []),
  ];

  // Normalize Photon GeoJSON features into Nominatim-like shape so one pipeline filters & formats all results
  const photonFeatures: any[] = Array.isArray(photonPayload?.features)
    ? photonPayload.features.map((f: any) => {
        const coords = f?.geometry?.coordinates || [];
        const props = f?.properties || {};
        return {
          osm_type:
            props.osm_type === 'N' ? 'node' : props.osm_type === 'W' ? 'way' : 'relation',
          osm_id: props.osm_id,
          lat: coords[1],
          lon: coords[0],
          category: props.osm_key || 'amenity',
          type: props.osm_value || 'place_of_worship',
          name: props.name || '',
          extratags: {},
          address: {
            house_number: props.housenumber,
            road: props.street,
            suburb: props.district,
            city: props.city,
            state: props.state,
            postcode: props.postcode,
            country: props.country,
          },
          display_name: [props.name, props.street, props.district, props.city, props.country]
            .filter(Boolean)
            .join(', '),
        };
      })
    : [];

  const combined = [...rawNominatim, ...photonFeatures];
  const candidates: FallbackParishItem[] = [];

  for (const item of combined) {
    const lat = Number(item?.lat);
    const lng = Number(item?.lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue;

    const category = String(item?.category || '').toLowerCase();
    const type = String(item?.type || '').toLowerCase();
    if (EXCLUDED_CATEGORY_RE.test(category) || EXCLUDED_CATEGORY_RE.test(type)) continue;
    if (category && category !== 'amenity' && category !== 'historic' && category !== 'building') {
      continue;
    }

    const name = String(item?.name || '').trim();
    if (!name || name.length < 3) continue;

    const denom = String(item?.extratags?.denomination || '').toLowerCase();
    const religion = String(item?.extratags?.religion || '').toLowerCase();
    const building = String(item?.extratags?.building || '').toLowerCase();

    if (religion && religion !== 'christian') continue;
    if (denom && NON_CATHOLIC_DENOM_RE.test(denom)) continue;
    if (denom && !denom.includes('catholic') && !CATHOLIC_INDICATOR_RE.test(name)) continue;
    if (NON_CATHOLIC_NAME_RE.test(name)) continue;

    const isCatholicTagged =
      denom.includes('catholic') ||
      /\bcatholic\b/i.test(name) ||
      /\b(basilica|cathedral|cattedrale|santuario|archdiocesan shrine|our lady|parroquia|paroisse)\b/i.test(
        name
      ) ||
      building === 'cathedral' ||
      building === 'basilica';

    // Strict filter: avoid generic untagged secular/Protestant halls outside Latin/Catholic naming
    if (!isCatholicTagged && category !== 'amenity') continue;
    if (!isCatholicTagged && !CATHOLIC_INDICATOR_RE.test(name)) continue;

    const distanceMeters = haversineMeters(centerLat, centerLng, lat, lng);
    if (distanceMeters > radius * 1.15) continue;

    const openingHoursRaw = String(item?.extratags?.opening_hours || '').trim();
    const weekdayDescriptions = openingHoursRaw
      ? openingHoursRaw
          .split(';')
          .map((s) => s.trim())
          .filter(Boolean)
          .slice(0, 7)
      : [];

    const osmType = String(item?.osm_type || 'node').toLowerCase();
    const osmId = item?.osm_id ? String(item.osm_id) : `${lat.toFixed(5)}-${lng.toFixed(5)}`;
    const osmUrl =
      item?.osm_id && (osmType === 'node' || osmType === 'way' || osmType === 'relation')
        ? `https://www.openstreetmap.org/${osmType}/${item.osm_id}`
        : null;

    const websiteURI = isAllowedWebsite(
      item?.extratags?.website || item?.extratags?.['contact:website'] || item?.extratags?.url
    );
    const nationalPhoneNumber =
      String(
        item?.extratags?.phone ||
          item?.extratags?.['contact:phone'] ||
          item?.extratags?.['contact:mobile'] ||
          ''
      ).trim() || null;

    const normalizedNameKey = name.toLowerCase().replace(/[^a-z0-9]/g, '');
    const duplicateIdx = candidates.findIndex((existing) => {
      const existingKey = existing.displayName.toLowerCase().replace(/[^a-z0-9]/g, '');
      const nearSame =
        haversineMeters(
          existing.location.lat,
          existing.location.lng,
          lat,
          lng
        ) < 90;
      return existingKey === normalizedNameKey || (nearSame && existingKey.slice(0, 12) === normalizedNameKey.slice(0, 12));
    });

    const candidate: FallbackParishItem = {
      id: `osm-${osmType}-${osmId}`,
      displayName: name,
      formattedAddress: formatOsmAddress(item),
      location: { lat, lng },
      nationalPhoneNumber,
      websiteURI,
      weekdayDescriptions,
      osmUrl,
      distanceMeters,
      isCatholicTagged,
      relevanceScore: scoreFilterMatch(name, `${denom} ${building}`, filter, isCatholicTagged),
    };

    if (duplicateIdx >= 0) {
      const existing = candidates[duplicateIdx];
      // Merge richer fields into existing record
      candidates[duplicateIdx] = {
        ...existing,
        websiteURI: existing.websiteURI || candidate.websiteURI,
        nationalPhoneNumber: existing.nationalPhoneNumber || candidate.nationalPhoneNumber,
        weekdayDescriptions:
          existing.weekdayDescriptions.length > 0
            ? existing.weekdayDescriptions
            : candidate.weekdayDescriptions,
        isCatholicTagged: existing.isCatholicTagged || candidate.isCatholicTagged,
        relevanceScore: Math.max(existing.relevanceScore, candidate.relevanceScore),
      };
    } else {
      candidates.push(candidate);
    }
  }

  candidates.sort((a, b) => {
    if (filter === 'shrines' || filter === 'adoration') {
      const aHigh = a.relevanceScore >= 200 ? 1 : 0;
      const bHigh = b.relevanceScore >= 200 ? 1 : 0;
      if (aHigh !== bHigh) return bHigh - aHigh;
    }
    if (a.isCatholicTagged !== b.isCatholicTagged) {
      return a.isCatholicTagged ? -1 : 1;
    }
    return a.distanceMeters - b.distanceMeters;
  });

  const payload = {
    parishes: candidates.slice(0, 18),
    center: { lat: centerLat, lng: centerLng },
    areaLabel,
  };
  setCached(cacheKey, payload);
  return payload;
}
