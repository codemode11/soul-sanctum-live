import type { Request, Response } from 'express';

const RADIO_BROWSER_MIRRORS = [
  'https://de1.api.radio-browser.info',
  'https://nl1.api.radio-browser.info',
  'https://at1.api.radio-browser.info',
] as const;

interface RadioBrowserStationRaw {
  stationuuid?: string;
  name?: string;
  url?: string;
  url_resolved?: string;
  homepage?: string;
  tags?: string;
  country?: string;
  countrycode?: string;
  state?: string;
  language?: string;
  codec?: string;
  bitrate?: number;
  hls?: number;
  lastcheckok?: number;
  votes?: number;
  clickcount?: number;
}

export interface DirectoryRadioStation {
  id: string;
  name: string;
  network: string;
  region:
    | 'holy-see'
    | 'north-america'
    | 'europe'
    | 'asia-pacific'
    | 'latin-america'
    | 'africa'
    | 'sacred-music';
  country: string;
  countryCode: string;
  city?: string;
  language: string;
  format: string;
  description: string;
  streamUrl: string;
  isHls: boolean;
  codec?: string;
  bitrate?: number;
  homepageUrl?: string;
  source: 'directory';
}

interface CacheEntry {
  expiresAt: number;
  stations: DirectoryRadioStation[];
}

const directoryCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes
const MAX_CACHE_ENTRIES = 60;

function sanitizeQueryParam(value: unknown, maxLen: number): string {
  if (typeof value !== 'string') return '';
  return value.replace(/[\r\n\t\0<>]/g, '').trim().slice(0, maxLen);
}

function isPrivateOrLocalHostname(hostname: string): boolean {
  const lower = hostname.toLowerCase().replace(/^\[|\]$/g, '');
  if (
    lower === 'localhost' ||
    lower === '::1' ||
    lower === '0.0.0.0' ||
    lower === '::' ||
    lower.endsWith('.local') ||
    lower.endsWith('.internal')
  ) {
    return true;
  }
  if (
    /^127\./.test(lower) ||
    /^10\./.test(lower) ||
    /^192\.168\./.test(lower) ||
    /^169\.254\./.test(lower) ||
    /^fe80:/i.test(lower) ||
    /^f[cd][0-9a-f]{2}:/i.test(lower)
  ) {
    return true;
  }
  const match172 = lower.match(/^172\.(\d+)\./);
  if (match172) {
    const secondOctet = Number(match172[1]);
    if (secondOctet >= 16 && secondOctet <= 31) return true;
  }
  return false;
}

function validateSafePublicHttpsUrl(raw?: string): string | null {
  if (!raw || typeof raw !== 'string') return null;
  const trimmed = raw.trim();
  if (!trimmed.startsWith('https://')) return null;
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'https:') return null;
    if (!parsed.hostname || isPrivateOrLocalHostname(parsed.hostname)) return null;
    return parsed.toString();
  } catch {
    return null;
  }
}

function validateSafeHomepageUrl(raw?: string): string | undefined {
  if (!raw || typeof raw !== 'string') return undefined;
  const trimmed = raw.trim();
  if (!trimmed.startsWith('https://') && !trimmed.startsWith('http://')) return undefined;
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return undefined;
    if (!parsed.hostname || isPrivateOrLocalHostname(parsed.hostname)) return undefined;
    return parsed.toString();
  } catch {
    return undefined;
  }
}

const NORTH_AMERICA_CODES = new Set(['US', 'CA']);
const LATIN_AMERICA_CODES = new Set([
  'MX', 'BR', 'AR', 'CO', 'PE', 'CL', 'EC', 'VE', 'GT', 'CU', 'DO', 'HN',
  'SV', 'NI', 'CR', 'PA', 'PY', 'UY', 'BO', 'PR',
]);
const ASIA_PACIFIC_CODES = new Set([
  'PH', 'AU', 'NZ', 'IN', 'KR', 'JP', 'CN', 'TW', 'HK', 'SG', 'MY', 'ID',
  'VN', 'TH', 'LK', 'PK', 'TL', 'PG', 'LB', 'IL', 'PS', 'JO',
]);
const AFRICA_CODES = new Set([
  'ZA', 'NG', 'KE', 'UG', 'TZ', 'GH', 'CD', 'CG', 'CI', 'CM', 'MZ', 'AO',
  'ZM', 'ZW', 'MW', 'RW', 'BI', 'LS', 'CV', 'SN', 'BF', 'TG', 'BJ', 'MG',
  'EG', 'ET', 'GA', 'CF', 'SL', 'LR', 'ML', 'NE', 'TD', 'SS',
]);

function inferRegion(
  countryCode: string,
  name: string,
  tags: string
): DirectoryRadioStation['region'] {
  const cc = countryCode.toUpperCase();
  const text = `${name} ${tags}`.toLowerCase();
  if (cc === 'VA' || text.includes('vatican')) return 'holy-see';
  if (
    text.includes('gregorian') ||
    text.includes('chant') ||
    text.includes('musique sacree') ||
    text.includes('sacred music') ||
    text.includes('polyphony')
  ) {
    return 'sacred-music';
  }
  if (NORTH_AMERICA_CODES.has(cc)) return 'north-america';
  if (LATIN_AMERICA_CODES.has(cc)) return 'latin-america';
  if (ASIA_PACIFIC_CODES.has(cc)) return 'asia-pacific';
  if (AFRICA_CODES.has(cc)) return 'africa';
  return 'europe';
}

function toTitleCase(input: string): string {
  return input
    .split(/[\s,]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(', ');
}

function cleanCountryName(country?: string, cc?: string): string {
  const raw = (country || '').trim();
  if (!raw) return cc && cc.toUpperCase() !== 'GL' ? cc.toUpperCase() : 'International';
  if (/united states of america/i.test(raw)) return 'United States';
  if (/united kingdom of great britain/i.test(raw)) return 'United Kingdom';
  if (/the holy see/i.test(raw)) return 'Vatican City';
  if (/the philippines/i.test(raw)) return 'Philippines';
  if (/democratic republic of the congo/i.test(raw)) return 'DR Congo';
  if (/russian federation/i.test(raw)) return 'Russia';
  return raw;
}

async function fetchFromMirrors(endpointPath: string): Promise<RadioBrowserStationRaw[]> {
  for (const origin of RADIO_BROWSER_MIRRORS) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6500);
    try {
      const response = await fetch(`${origin}${endpointPath}`, {
        headers: {
          'User-Agent': 'SoulSanctumCatholicRadio/1.0',
          Accept: 'application/json',
        },
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (!response.ok) continue;
      const data = await response.json();
      if (Array.isArray(data)) {
        return data as RadioBrowserStationRaw[];
      }
    } catch {
      clearTimeout(timeout);
    }
  }
  return [];
}

function mapAndFilterStations(rawList: RadioBrowserStationRaw[], limit: number): DirectoryRadioStation[] {
  const seenUrls = new Set<string>();
  const seenNames = new Set<string>();
  const mapped: DirectoryRadioStation[] = [];

  for (const raw of rawList) {
    if (mapped.length >= limit) break;
    if (raw.lastcheckok !== 1) continue;

    const streamUrl =
      validateSafePublicHttpsUrl(raw.url_resolved) || validateSafePublicHttpsUrl(raw.url);
    if (!streamUrl) continue;

    // Exclude video-only high-bitrate TV feeds (e.g. > 512 kbps HLS TV channels)
    const codecUpper = (raw.codec || '').toUpperCase();
    if (codecUpper.includes('H.264') || codecUpper.includes('H264') || (raw.bitrate && raw.bitrate > 512)) {
      continue;
    }

    const name = (raw.name || '').replace(/\s+/g, ' ').trim();
    if (!name || name.length < 2) continue;

    const nameKey = name.toLowerCase();
    if (seenUrls.has(streamUrl) || seenNames.has(nameKey)) continue;
    seenUrls.add(streamUrl);
    seenNames.add(nameKey);

    const countryCode = (raw.countrycode || '').toUpperCase().slice(0, 2) || 'GL';
    const country = cleanCountryName(raw.country, countryCode);
    const tags = (raw.tags || '').trim();
    const language = toTitleCase(raw.language || '') || 'Multilingual';
    const region = inferRegion(countryCode, name, tags);
    const cleanTags = tags
      .split(',')
      .map(t => t.trim())
      .filter(t => t && !/^catholic$/i.test(t) && t.length <= 22)
      .slice(0, 3)
      .map(t => t.charAt(0).toUpperCase() + t.slice(1));

    const format =
      cleanTags.length > 0 ? cleanTags.join(' · ') : 'Catholic Radio Broadcast';
    const city = (raw.state || '').trim() || undefined;
    const homepageUrl = validateSafeHomepageUrl(raw.homepage);

    mapped.push({
      id: `rb-${raw.stationuuid || mapped.length}`,
      name,
      network: country !== 'International' ? `${country} Catholic Radio` : 'Global Catholic Broadcast',
      region,
      country,
      countryCode,
      city,
      language,
      format,
      description:
        country === 'International'
          ? `International live Catholic radio broadcast${language ? ` (${language})` : ''}.`
          : `Live Catholic radio broadcast from ${city ? `${city}, ` : ''}${country}${language ? ` (${language})` : ''}.`,
      streamUrl,
      isHls: raw.hls === 1 || streamUrl.toLowerCase().includes('.m3u8'),
      codec: raw.codec && raw.codec !== 'UNKNOWN' ? raw.codec : undefined,
      bitrate: raw.bitrate && raw.bitrate > 0 ? raw.bitrate : undefined,
      homepageUrl,
      source: 'directory',
    });
  }

  return mapped;
}

export async function handleCatholicRadioDirectory(req: Request, res: Response): Promise<void> {
  try {
    const q = sanitizeQueryParam(req.query.q, 80);
    const country = sanitizeQueryParam(req.query.country, 60);
    const rawLimit = Number(req.query.limit);
    const limit = Number.isFinite(rawLimit)
      ? Math.max(12, Math.min(100, Math.floor(rawLimit)))
      : 60;

    const cacheKey = `${q.toLowerCase()}|${country.toLowerCase()}|${limit}`;
    const cached = directoryCache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
      res.setHeader('Cache-Control', 'public, max-age=300');
      res.json({ stations: cached.stations, cached: true });
      return;
    }

    const params = new URLSearchParams({
      tag: 'catholic',
      hidebroken: 'true',
      order: 'votes',
      reverse: 'true',
      limit: String(Math.min(250, limit * 3)),
    });
    if (q) params.set('name', q);
    if (country) params.set('country', country);

    let rawStations = await fetchFromMirrors(`/json/stations/search?${params.toString()}`);

    // If a specific search query matched few/zero under the exact 'catholic' tag, also search Catholic keywords by name/country
    if (rawStations.length < 6 && q) {
      const fallbackParams = new URLSearchParams({
        name: q,
        hidebroken: 'true',
        order: 'votes',
        reverse: 'true',
        limit: '80',
      });
      if (country) fallbackParams.set('country', country);
      const broader = await fetchFromMirrors(`/json/stations/search?${fallbackParams.toString()}`);
      const catholicFiltered = broader.filter(s => {
        const hay = `${s.name || ''} ${s.tags || ''} ${s.homepage || ''}`.toLowerCase();
        return (
          hay.includes('catholic') ||
          hay.includes('catolic') ||
          hay.includes('católic') ||
          hay.includes('vatican') ||
          hay.includes('ewtn') ||
          hay.includes('radio maria') ||
          hay.includes('rádio maria') ||
          hay.includes('radio maría') ||
          hay.includes('gregorian') ||
          hay.includes('veritas') ||
          hay.includes('rosary') ||
          hay.includes('ave maria') ||
          hay.includes('notre dame') ||
          hay.includes('notre-dame') ||
          hay.includes('relevant radio') ||
          hay.includes('guadalupe') ||
          hay.includes('canção nova') ||
          hay.includes('cancao nova') ||
          hay.includes('horeb')
        );
      });
      rawStations = [...rawStations, ...catholicFiltered];
    }

    const stations = mapAndFilterStations(rawStations, limit);

    if (directoryCache.size >= MAX_CACHE_ENTRIES) {
      const oldestKey = directoryCache.keys().next().value;
      if (oldestKey) directoryCache.delete(oldestKey);
    }
    directoryCache.set(cacheKey, {
      expiresAt: Date.now() + CACHE_TTL_MS,
      stations,
    });

    res.setHeader('Cache-Control', 'public, max-age=300');
    res.json({ stations, cached: false });
  } catch (err) {
    console.warn('[/api/catholic-radio/directory] error:', err instanceof Error ? err.message : 'Unknown');
    res.status(502).json({
      stations: [],
      error: 'The live global Catholic radio directory is temporarily unreachable.',
    });
  }
}
