import type { Request, Response } from 'express';

const ARCHIVE_ORIGIN = 'https://archive.org';
const SAFE_IDENTIFIER_RE = /^[a-zA-Z0-9._-]{2,120}$/;

export interface ArchiveCinemaItem {
  id: string;
  archiveIdentifier: string;
  title: string;
  type: 'documentary' | 'movie';
  category: 'documentaries' | 'saints-biographies' | 'classic-movies' | 'sacred-art-vatican';
  year: string;
  directorOrProducer: string;
  durationMinutes?: number;
  language: string;
  country: string;
  synopsis: string;
  posterUrl: string;
  embedUrl: string;
  sourcePageUrl: string;
  fallbackPosterCategory: 'saints' | 'vatican' | 'history';
  source: 'archive';
}

interface SearchCacheEntry {
  expiresAt: number;
  items: ArchiveCinemaItem[];
}

interface ResolveCacheEntry {
  expiresAt: number;
  mp4Url: string | null;
  durationMinutes?: number;
}

const searchCache = new Map<string, SearchCacheEntry>();
const resolveCache = new Map<string, ResolveCacheEntry>();
const CACHE_TTL_MS = 10 * 60 * 1000;
const MAX_CACHE_ENTRIES = 60;

// Blocklist to keep live Internet Archive searches faithful and free of conspiracy/adult/off-topic uploads
const BLOCKED_ARCHIVE_TERMS = [
  'conspiracy',
  'illuminati',
  'rothschild',
  'rosicrucian',
  'one world religion',
  'new world order',
  'freemason',
  'secret society',
  'banking cartel',
  'forbidden history',
  'occult',
  'vatican tapes',
  'nude',
  'sexy',
  'sucio',
  'dirty',
  'hentai',
  'porn',
  'sex',
  'hitler',
  'nazi',
  'satanic',
  'blood ritual',
  'cult',
  'quran',
  'muhammad',
  'islam',
  'zakir naik',
  'hitchens',
  "hell's angel",
  'bootleg',
  'saint seiya',
  'gendarme',
  'bank robbery',
  'police detectives',
];

const ISO_LANG_MAP: Record<string, string> = {
  eng: 'English',
  en: 'English',
  spa: 'Spanish',
  es: 'Spanish',
  fra: 'French',
  fre: 'French',
  fr: 'French',
  ita: 'Italian',
  it: 'Italian',
  pol: 'Polish',
  pl: 'Polish',
  por: 'Portuguese',
  pt: 'Portuguese',
  deu: 'German',
  ger: 'German',
  de: 'German',
  lat: 'Latin',
};

function sanitizeSearchTerm(value: unknown, maxLen: number): string {
  if (typeof value !== 'string') return '';
  return value.replace(/[\r\n\t\0<>"{}()[\]\\^*~]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, maxLen);
}

function stripHtmlTags(raw: unknown): string {
  if (Array.isArray(raw)) {
    return stripHtmlTags(raw.join(' '));
  }
  if (typeof raw !== 'string') return '';
  return raw
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function inferCategoryAndType(
  title: string,
  description: string
): {
  type: 'documentary' | 'movie';
  category: ArchiveCinemaItem['category'];
  fallbackPosterCategory: 'saints' | 'vatican' | 'history';
} {
  const hay = `${title} ${description}`.toLowerCase();
  if (
    hay.includes('vatican') ||
    hay.includes('sistine') ||
    hay.includes('cathedral') ||
    hay.includes('basilica') ||
    hay.includes('pope') ||
    hay.includes('papal') ||
    hay.includes('chartres')
  ) {
    return {
      type: 'documentary',
      category: 'sacred-art-vatican',
      fallbackPosterCategory: 'vatican',
    };
  }
  if (
    hay.includes('saint') ||
    hay.includes('st.') ||
    hay.includes('padre pio') ||
    hay.includes('bernadette') ||
    hay.includes('fatima') ||
    hay.includes('joan of arc') ||
    hay.includes('francis') ||
    hay.includes('kolbe') ||
    hay.includes('mother teresa') ||
    hay.includes('therese')
  ) {
    const isDoc = hay.includes('documentary') || hay.includes('biography') || hay.includes('life of');
    return {
      type: isDoc ? 'documentary' : 'movie',
      category: 'saints-biographies',
      fallbackPosterCategory: 'saints',
    };
  }
  if (
    hay.includes('documentary') ||
    hay.includes('abbey') ||
    hay.includes('monastery') ||
    hay.includes('eucharist') ||
    hay.includes('fulton sheen') ||
    hay.includes('rosary') ||
    hay.includes('lourdes') ||
    hay.includes('shroud')
  ) {
    return {
      type: 'documentary',
      category: 'documentaries',
      fallbackPosterCategory: 'history',
    };
  }
  return {
    type: 'movie',
    category: 'classic-movies',
    fallbackPosterCategory: 'history',
  };
}

function isFaithfulCatholicItem(title: string, description: string): boolean {
  const hay = `${title} ${description}`.toLowerCase();
  for (const blocked of BLOCKED_ARCHIVE_TERMS) {
    if (hay.includes(blocked)) return false;
  }
  return (
    hay.includes('catholic') ||
    hay.includes('vatican') ||
    hay.includes('pope') ||
    hay.includes('saint') ||
    hay.includes('padre pio') ||
    hay.includes('fatima') ||
    hay.includes('lourdes') ||
    hay.includes('bernadette') ||
    hay.includes('fulton sheen') ||
    hay.includes('eucharist') ||
    hay.includes('rosary') ||
    hay.includes('abbey') ||
    hay.includes('monastery') ||
    hay.includes('cathedral') ||
    hay.includes('sistine') ||
    hay.includes('gospel') ||
    hay.includes('christ') ||
    hay.includes('francis of assisi') ||
    hay.includes('joan of arc') ||
    hay.includes('kolbe')
  );
}

export async function handleCatholicCinemaArchiveSearch(req: Request, res: Response): Promise<void> {
  try {
    const q = sanitizeSearchTerm(req.query.q, 80);
    const rawLimit = Number(req.query.limit);
    const limit = Number.isFinite(rawLimit)
      ? Math.max(6, Math.min(30, Math.floor(rawLimit)))
      : 18;

    const cacheKey = `${q.toLowerCase()}|${limit}`;
    const cached = searchCache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
      res.setHeader('Cache-Control', 'public, max-age=300');
      res.json({ items: cached.items, cached: true });
      return;
    }

    const baseQuery = q
      ? `mediatype:movies AND (${q}) AND (catholic OR vatican OR saint OR fatima OR lourdes OR pope OR abbey OR cathedral OR eucharist OR "fulton sheen" OR rosary)`
      : 'mediatype:movies AND (subject:catholic OR title:"Vatican" OR title:"Fatima" OR title:"Lourdes" OR title:"Padre Pio" OR title:"Fulton Sheen" OR title:"Chartres Cathedral" OR title:"Sistine Chapel" OR title:"Abbey")';

    const params = new URLSearchParams({
      q: baseQuery,
      output: 'json',
      rows: String(Math.min(50, limit * 2)),
    });
    params.append('fl[]', 'identifier');
    params.append('fl[]', 'title');
    params.append('fl[]', 'year');
    params.append('fl[]', 'creator');
    params.append('fl[]', 'description');
    params.append('fl[]', 'language');
    params.append('sort[]', 'downloads desc');

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7500);
    const response = await fetch(`${ARCHIVE_ORIGIN}/advancedsearch.php?${params.toString()}`, {
      headers: {
        'User-Agent': 'SoulSanctumCatholicCinema/1.0',
        Accept: 'application/json',
      },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) {
      res.status(502).json({
        items: [],
        error: 'The public Catholic film archive is temporarily unavailable.',
      });
      return;
    }

    const payload = (await response.json()) as {
      response?: {
        docs?: Array<{
          identifier?: string;
          title?: string;
          year?: string | number;
          creator?: string | string[];
          description?: string | string[];
          language?: string | string[];
        }>;
      };
    };

    const docs = Array.isArray(payload?.response?.docs) ? payload.response.docs : [];
    const items: ArchiveCinemaItem[] = [];
    const seenIds = new Set<string>();

    for (const doc of docs) {
      if (items.length >= limit) break;
      const identifier = typeof doc.identifier === 'string' ? doc.identifier.trim() : '';
      if (!SAFE_IDENTIFIER_RE.test(identifier) || seenIds.has(identifier)) continue;

      const title = stripHtmlTags(doc.title || '').slice(0, 120);
      if (!title || title.length < 3) continue;

      const description = stripHtmlTags(doc.description || '');
      if (!isFaithfulCatholicItem(title, description)) continue;

      seenIds.add(identifier);
      const { type, category, fallbackPosterCategory } = inferCategoryAndType(title, description);
      const creatorRaw = Array.isArray(doc.creator) ? doc.creator.join(', ') : doc.creator || '';
      const directorOrProducer = stripHtmlTags(creatorRaw).slice(0, 70) || 'Public Archive Collection';
      const langRaw = Array.isArray(doc.language) ? doc.language[0] : doc.language || '';
      const cleanedLang = stripHtmlTags(langRaw).slice(0, 30);
      const language =
        ISO_LANG_MAP[cleanedLang.toLowerCase()] ||
        (cleanedLang ? cleanedLang.charAt(0).toUpperCase() + cleanedLang.slice(1) : 'English');
      const year = doc.year ? String(doc.year).slice(0, 4) : 'Archive';

      const synopsis =
        description.length > 220
          ? `${description.slice(0, 217).trimEnd()}…`
          : description || `Archival Catholic ${type} preserved in the Internet Archive Moving Image collection.`;

      items.push({
        id: `ia-${identifier}`,
        archiveIdentifier: identifier,
        title,
        type,
        category,
        year,
        directorOrProducer,
        language: language.charAt(0).toUpperCase() + language.slice(1),
        country: 'International Archive',
        synopsis,
        posterUrl: `${ARCHIVE_ORIGIN}/services/img/${encodeURIComponent(identifier)}`,
        embedUrl: `${ARCHIVE_ORIGIN}/embed/${encodeURIComponent(identifier)}`,
        sourcePageUrl: `${ARCHIVE_ORIGIN}/details/${encodeURIComponent(identifier)}`,
        fallbackPosterCategory,
        source: 'archive',
      });
    }

    if (searchCache.size >= MAX_CACHE_ENTRIES) {
      const oldest = searchCache.keys().next().value;
      if (oldest) searchCache.delete(oldest);
    }
    searchCache.set(cacheKey, { expiresAt: Date.now() + CACHE_TTL_MS, items });

    res.setHeader('Cache-Control', 'public, max-age=300');
    res.json({ items, cached: false });
  } catch (err) {
    console.warn(
      '[/api/catholic-cinema/archive] error:',
      err instanceof Error ? err.message : 'Unknown'
    );
    res.status(502).json({
      items: [],
      error: 'Could not reach the Catholic film archive right now.',
    });
  }
}

export async function handleCatholicCinemaResolve(req: Request, res: Response): Promise<void> {
  try {
    const rawId = typeof req.params.identifier === 'string' ? req.params.identifier.trim() : '';
    if (!SAFE_IDENTIFIER_RE.test(rawId)) {
      res.status(400).json({ error: 'Invalid archive identifier.' });
      return;
    }

    const cached = resolveCache.get(rawId);
    if (cached && cached.expiresAt > Date.now()) {
      res.setHeader('Cache-Control', 'public, max-age=600');
      res.json({
        identifier: rawId,
        mp4Url: cached.mp4Url,
        durationMinutes: cached.durationMinutes,
        embedUrl: `${ARCHIVE_ORIGIN}/embed/${encodeURIComponent(rawId)}`,
      });
      return;
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000);
    const response = await fetch(`${ARCHIVE_ORIGIN}/metadata/${encodeURIComponent(rawId)}`, {
      headers: {
        'User-Agent': 'SoulSanctumCatholicCinema/1.0',
        Accept: 'application/json',
      },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) {
      res.status(502).json({ error: 'Unable to load archive metadata.' });
      return;
    }

    const meta = (await response.json()) as {
      files?: Array<{
        name?: string;
        format?: string;
        length?: string | number;
      }>;
    };

    const files = Array.isArray(meta?.files) ? meta.files : [];
    const mp4Candidates = files.filter(
      f => typeof f.name === 'string' && /\.mp4$/i.test(f.name) && !f.name.includes('..')
    );

    const bestMp4 =
      mp4Candidates.find(f => /h\.264/i.test(f.format || '')) ||
      mp4Candidates.find(f => /mpeg4/i.test(f.format || '')) ||
      mp4Candidates[0];

    let mp4Url: string | null = null;
    let durationMinutes: number | undefined;

    if (bestMp4?.name) {
      const encodedPath = bestMp4.name
        .split('/')
        .map(seg => encodeURIComponent(seg))
        .join('/');
      mp4Url = `${ARCHIVE_ORIGIN}/download/${encodeURIComponent(rawId)}/${encodedPath}`;
      const lenSec = Number(bestMp4.length);
      if (Number.isFinite(lenSec) && lenSec > 30) {
        durationMinutes = Math.max(1, Math.round(lenSec / 60));
      }
    }

    if (resolveCache.size >= MAX_CACHE_ENTRIES) {
      const oldest = resolveCache.keys().next().value;
      if (oldest) resolveCache.delete(oldest);
    }
    resolveCache.set(rawId, {
      expiresAt: Date.now() + CACHE_TTL_MS,
      mp4Url,
      durationMinutes,
    });

    res.setHeader('Cache-Control', 'public, max-age=600');
    res.json({
      identifier: rawId,
      mp4Url,
      durationMinutes,
      embedUrl: `${ARCHIVE_ORIGIN}/embed/${encodeURIComponent(rawId)}`,
    });
  } catch (err) {
    console.warn(
      '[/api/catholic-cinema/resolve] error:',
      err instanceof Error ? err.message : 'Unknown'
    );
    res.status(502).json({ error: 'Unable to resolve archive video stream.' });
  }
}
