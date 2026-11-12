export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    const response = await fetch('https://www.vaticannews.va/en.rss.xml', {
      cache: 'no-store',
      headers: {
        Accept: 'application/rss+xml, application/xml, text/xml, */*',
        'Cache-Control': 'no-cache, no-store, max-age=0',
      },
      signal: AbortSignal.timeout(7000),
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const xml = await response.text();
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    return res.status(200).send(xml);
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || 'Vatican RSS error' });
  }
}
