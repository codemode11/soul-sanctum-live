import { fetchLiveCatholicFacebookPosts } from '../src/utils/catholicFacebookFeedServer.js';

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    const rawSources = typeof req.query?.sources === 'string' ? req.query.sources : '';
    const requestedIds = rawSources
      .split(',')
      .map((s: string) => s.trim())
      .filter(Boolean);

    const payload = await fetchLiveCatholicFacebookPosts(requestedIds);
    return res.status(200).json(payload);
  } catch (err: any) {
    return res.status(500).json({
      error: err?.message || 'Unable to refresh Catholic Facebook feed.',
      posts: [],
      fetchedAt: Date.now(),
    });
  }
}
