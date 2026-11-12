const SERVER_CATHOLIC_RSS_FEEDS: Record<string, string[]> = {
  'st-paul-center': [
    'https://catholicexchange.com/feed/',
    'https://www.catholicworldreport.com/feed/',
  ],
  'catholic-answers': [
    'https://www.catholic.com/feeds/magazine/rss',
    'https://catholicexchange.com/feed/',
  ],
  'word-on-fire': [
    'https://www.wordonfire.org/articles/feed/',
  ],
  'catholic-insight': [
    'https://www.catholicworldreport.com/feed/',
    'https://crisismagazine.com/feed/',
  ],
  aleteia: [
    'https://aleteia.org/feed/',
  ],
  'sign-org': [
    'https://spiritualdirection.com/feed',
    'https://catholicexchange.com/feed/',
  ],
  ncregister: [
    'https://www.ncregister.com/feeds/general-news.xml',
    'https://www.catholicnewsagency.com/rss/news.xml',
  ],
  'catholic-digest': [
    'https://www.catholicdigest.com/feed/',
    'https://aleteia.org/feed/',
  ],
  cerc: [
    'https://catholiceducation.org/feed/',
    'https://crisismagazine.com/feed/',
  ],
  cbcp: [
    'https://cbcpnews.net/cbcpnews/feed/',
    'https://www.vaticannews.va/en.rss.xml',
  ],
};

async function fetchUpstreamRssXml(url: string): Promise<string> {
  const noCacheHeaders: Record<string, string> = {
    Accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*',
    'Cache-Control': 'no-cache, no-store, max-age=0',
    Pragma: 'no-cache',
  };

  let needsUaFallback = false;
  try {
    const res1 = await fetch(url, {
      cache: 'no-store',
      headers: noCacheHeaders,
      signal: AbortSignal.timeout(5500),
    });
    if (res1.ok) {
      const txt1 = await res1.text();
      if (txt1 && (/<item[\s>]/i.test(txt1) || /<entry[\s>]/i.test(txt1))) {
        return txt1;
      }
      needsUaFallback = true;
    } else if (res1.status === 403 || res1.status === 406 || res1.status === 429) {
      needsUaFallback = true;
    } else {
      throw new Error(`HTTP ${res1.status}`);
    }
  } catch (err: any) {
    if (!needsUaFallback && err?.name !== 'TimeoutError' && err?.name !== 'AbortError') {
      needsUaFallback = true;
    }
    if (!needsUaFallback) {
      throw err;
    }
  }

  const res2 = await fetch(url, {
    cache: 'no-store',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      ...noCacheHeaders,
    },
    signal: AbortSignal.timeout(5500),
  });
  if (!res2.ok) {
    throw new Error(`HTTP ${res2.status}`);
  }
  const txt2 = await res2.text();
  if (!txt2 || (!/<item[\s>]/i.test(txt2) && !/<entry[\s>]/i.test(txt2))) {
    throw new Error('Invalid RSS XML');
  }
  return txt2;
}

function extractFeedItemTimestamp(itemXml: string, channelDateMs: number): number {
  const dateMatch =
    itemXml.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i) ||
    itemXml.match(/<dc:date[^>]*>([\s\S]*?)<\/dc:date>/i) ||
    itemXml.match(/<published[^>]*>([\s\S]*?)<\/published>/i) ||
    itemXml.match(/<updated[^>]*>([\s\S]*?)<\/updated>/i);
  if (dateMatch && dateMatch[1]) {
    const clean = dateMatch[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim();
    const parsed = Date.parse(clean);
    if (!Number.isNaN(parsed)) return parsed;
  }
  return channelDateMs;
}

function extractFeedItemTitleKey(itemXml: string): string {
  const m =
    itemXml.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/i) ||
    itemXml.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? m[1].trim().toLowerCase() : '';
}

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
    const sourceKey =
      typeof req.query?.source === 'string' && req.query.source
        ? req.query.source
        : 'st-paul-center';
    const candidateUrls =
      SERVER_CATHOLIC_RSS_FEEDS[sourceKey] || SERVER_CATHOLIC_RSS_FEEDS['st-paul-center'];

    const results = await Promise.allSettled(
      candidateUrls.map(async (targetUrl) => {
        const xml = await fetchUpstreamRssXml(targetUrl);
        const channelBuildMatch =
          xml.match(/<lastBuildDate[^>]*>([\s\S]*?)<\/lastBuildDate>/i) ||
          xml.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i);
        const channelDateMs =
          channelBuildMatch &&
          channelBuildMatch[1] &&
          !Number.isNaN(Date.parse(channelBuildMatch[1].trim()))
            ? Date.parse(channelBuildMatch[1].trim())
            : 0;

        const itemMatches = xml.match(/<(?:item|entry)[\s>][\s\S]*?<\/(?:item|entry)>/gi) || [];
        return itemMatches.map((itemXml, index) => {
          const ts = extractFeedItemTimestamp(itemXml, channelDateMs);
          const normalizedXml =
            ts > 0 &&
            !/<(?:pubDate|dc:date|published|updated)[\s>]/i.test(itemXml) &&
            /<\/(?:item|entry)>/i.test(itemXml)
              ? itemXml.replace(
                  /<\/(?:item|entry)>/i,
                  `<pubDate>${new Date(ts).toUTCString()}</pubDate></item>`
                )
              : itemXml;
          return {
            xml: normalizedXml,
            ts,
            index,
            titleKey: extractFeedItemTitleKey(itemXml),
          };
        });
      })
    );

    const collected: { xml: string; ts: number; index: number; titleKey: string }[] = [];
    const seenTitles = new Set<string>();
    let lastErr: any = null;

    for (const r of results) {
      if (r.status === 'fulfilled') {
        for (const entry of r.value) {
          if (entry.titleKey && seenTitles.has(entry.titleKey)) continue;
          if (entry.titleKey) seenTitles.add(entry.titleKey);
          collected.push(entry);
        }
      } else {
        lastErr = r.reason;
      }
    }

    if (collected.length === 0) {
      throw lastErr || new Error('No RSS items returned from upstream feed');
    }

    collected.sort((a, b) => {
      if (b.ts !== a.ts) return b.ts - a.ts;
      return a.index - b.index;
    });

    const combinedXml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/"><channel><title>${sourceKey}</title>${collected
      .slice(0, 30)
      .map((c) => c.xml)
      .join('\n')}</channel></rss>`;

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    return res.status(200).send(combinedXml);
  } catch (err: any) {
    return res.status(502).json({ error: err?.message || 'RSS fetch error' });
  }
}
