import {
  FallbackFilterId,
  handleParishSearch,
  handleParishSuggest,
} from '../src/utils/parishSearchServer.js';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    const queryObj = req.query || {};
    const mode = String(queryObj.mode || 'search').toLowerCase();

    if (mode === 'suggest') {
      const q = String(queryObj.q || '');
      const lat = queryObj.lat != null ? Number(queryObj.lat) : undefined;
      const lng = queryObj.lng != null ? Number(queryObj.lng) : undefined;
      const result = await handleParishSuggest(q, lat, lng);
      return res.status(200).json(result);
    }

    const lat = Number(queryObj.lat ?? 41.9022);
    const lng = Number(queryObj.lng ?? 12.4539);
    const radiusMeters = Number(queryObj.radius ?? 10000);
    const rawFilter = String(queryObj.filter || 'all') as FallbackFilterId;
    const filter: FallbackFilterId = ['all', 'mass', 'confession', 'adoration', 'shrines'].includes(rawFilter)
      ? rawFilter
      : 'all';
    const queryText = String(queryObj.q || '');
    const areaLabel = String(queryObj.areaLabel || '');

    const result = await handleParishSearch({
      lat: Number.isFinite(lat) ? lat : 41.9022,
      lng: Number.isFinite(lng) ? lng : 12.4539,
      radiusMeters: Number.isFinite(radiusMeters) ? radiusMeters : 10000,
      filter,
      queryText,
      areaLabel,
    });

    return res.status(200).json(result);
  } catch (err: any) {
    return res.status(502).json({
      error: err?.message || 'Unable to search nearby Catholic parishes.',
      parishes: [],
    });
  }
}
