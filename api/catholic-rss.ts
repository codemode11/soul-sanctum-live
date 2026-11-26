const SERVER_CATHOLIC_RSS_FEEDS: Record<string, string[]> = {
  'st-paul-center': [
    'stpaulcenter://live',
    'https://www.catholicworldreport.com/feed/',
  ],
  'catholic-answers': [
    'https://www.catholic.com/feeds/magazine/rss',
    'https://catholicexchange.com/feed/',
  ],
  'word-on-fire': [
    'https://www.wordonfire.org/articles/feed/',
  ],
  'ewtn-news': [
    'https://www.ewtnnews.com/rss',
    'https://www.catholicnewsagency.com/rss/news.xml',
  ],
  'catholic-insight': [
    'https://www.catholicworldreport.com/feed/',
    'https://crisismagazine.com/feed/',
  ],
  aleteia: [
    'https://aleteia.org/feed/',
  ],
  'spirit-daily': [
    'https://spiritdailyblog.com/feed',
    'https://spiritdaily.org/blog/feed',
  ],
  'sign-org': [
    'https://sign.org/feed/',
    'https://spiritualdirection.com/feed',
  ],
  ncregister: [
    'https://www.ncregister.com/feeds/general-news.xml',
    'https://www.catholicnewsagency.com/rss/news.xml',
  ],
  'us-catholic': [
    'https://uscatholic.org/topics/religion/feed/',
    'https://uscatholic.org/feed/',
  ],
  'catholic-register': [
    'https://www.catholicregister.org/rss',
  ],
  'catholic-digest': [
    'https://www.catholicdigest.com/wp-json/wp/v2/posts?per_page=12',
    'https://www.catholicdigest.com/feed/',
  ],
  cerc: [
    'https://catholiceducation.org/feed/',
    'https://crisismagazine.com/feed/',
  ],
  'church-life-journal': [
    'https://churchlifejournal.nd.edu/articles.atom',
  ],
  'catholic-exchange': [
    'https://catholicexchange.com/feed/',
  ],
  cbcp: [
    'https://cbcpnews.net/cbcpnews/feed/',
    'https://www.vaticannews.va/en.rss.xml',
  ],
};

const SERVER_RSS_SOURCE_NAMES: Record<string, string> = {
  'st-paul-center': 'St. Paul Center',
  'catholic-answers': 'Catholic Answers Magazine',
  'word-on-fire': 'Word on Fire',
  'ewtn-news': 'EWTN News',
  'catholic-insight': 'Catholic Insight',
  aleteia: 'Aleteia',
  'spirit-daily': 'Spirit Daily',
  'sign-org': 'Signs & Wonders for Our Times',
  ncregister: 'National Catholic Register',
  'us-catholic': 'U.S. Catholic',
  'catholic-register': 'Catholic Register',
  'catholic-digest': 'Catholic Digest',
  cerc: 'Catholic Education Resource Center',
  'church-life-journal': 'Church Life Journal',
  'catholic-exchange': 'Catholic Exchange',
  cbcp: 'CBCP News',
};

function escapeXmlCdata(str: string): string {
  return String(str || '').replace(/\]\]>/g, ']]]]><![CDATA[>');
}

function decodeHtmlEntities(str: string): string {
  return String(str || '')
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&#8217;|&#039;|&apos;|&rsquo;/g, "'")
    .replace(/&#8216;|&lsquo;/g, "'")
    .replace(/&#8220;|&quot;|&ldquo;/g, '"')
    .replace(/&#8221;|&rdquo;/g, '"')
    .replace(/&#8211;|&ndash;/g, '–')
    .replace(/&#8212;|&mdash;/g, '—')
    .replace(/&#8230;|&hellip;/g, '…')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;|&#160;/g, ' ')
    .replace(/&#x([0-9a-fA-F]+);/g, (_m, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_m, dec) => String.fromCharCode(parseInt(dec, 10)));
}

function extractMetaContent(html: string, key: string): string {
  const re1 = new RegExp(`<meta[^>]+(?:property|name)=["']${key}["'][^>]+content=["']([^"']+)["']`, 'i');
  const re2 = new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']${key}["']`, 'i');
  const m = html.match(re1) || html.match(re2);
  return m ? decodeHtmlEntities(m[1].trim()) : '';
}

function extractSimpleArticleBodyHtml(html: string): string {
  const clean = html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
    .replace(/<svg[\s\S]*?<\/svg>/gi, '')
    .replace(/<header[\s\S]*?<\/header>/gi, '')
    .replace(/<nav[\s\S]*?<\/nav>/gi, '')
    .replace(/<footer[\s\S]*?<\/footer>/gi, '')
    .replace(/<aside[\s\S]*?<\/aside>/gi, '')
    .replace(/<form[\s\S]*?<\/form>/gi, '');

  const mainMatch = clean.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i) || clean.match(/<article\b[^>]*>([\s\S]*?)<\/article>/i);
  const scope = mainMatch ? mainMatch[1] : clean;
  const paragraphs: string[] = [];
  const pRe = /<(p|h2|h3|blockquote)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let m: RegExpExecArray | null;
  const boilerplate = /^(?:read more|related:|subscribe|sign up|follow us|copyright|all rights reserved|donate|support|view >|share)/i;
  while ((m = pRe.exec(scope)) !== null) {
    const text = decodeHtmlEntities(m[2].replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
    if (!text || text.length < 30 || boilerplate.test(text)) continue;
    if (paragraphs.includes(text)) continue;
    paragraphs.push(`<p>${text}</p>`);
  }
  return paragraphs.join('\n');
}

async function fetchStPaulCenterLiveRssXml(): Promise<string> {
  const uaHeaders = {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    Accept: 'text/html,application/xml,text/xml,*/*;q=0.8',
    'Cache-Control': 'no-cache, no-store, max-age=0',
  };

  const [mediaRes, sitemapRes] = await Promise.allSettled([
    fetch('https://stpaulcenter.com/media', { headers: uaHeaders, signal: AbortSignal.timeout(6500) }),
    fetch('https://stpaulcenter.com/sitemap_sections_4_0.xml', { headers: uaHeaders, signal: AbortSignal.timeout(6500) }),
  ]);

  const candidates: { url: string; ts: number; cardImage?: string }[] = [];
  const seenUrls = new Set<string>();

  if (mediaRes.status === 'fulfilled' && mediaRes.value.ok) {
    const mediaHtml = await mediaRes.value.text();
    const cardRe = /<a[^>]+href=["'](https:\/\/stpaulcenter\.com\/posts\/[^"'#?]+)["'][^>]*>([\s\S]*?)<\/a>/gi;
    let cm: RegExpExecArray | null;
    while ((cm = cardRe.exec(mediaHtml)) !== null) {
      const url = cm[1].trim();
      if (seenUrls.has(url)) continue;
      seenUrls.add(url);
      const bgMatch = cm[2].match(/background-image:\s*url\(([^)]+)\)/i);
      const cardImage = bgMatch ? bgMatch[1].replace(/^["']|["']$/g, '').trim() : undefined;
      candidates.push({ url, ts: Date.now(), cardImage });
    }
  }

  if (sitemapRes.status === 'fulfilled' && sitemapRes.value.ok) {
    const smXml = await sitemapRes.value.text();
    const urlEntries = Array.from(
      smXml.matchAll(/<url>[\s\S]*?<loc>([^<]*\/posts\/[^<]+)<\/loc>(?:[\s\S]*?<lastmod>([^<]+)<\/lastmod>)?[\s\S]*?<\/url>/gi)
    )
      .map((m) => ({ url: m[1].trim(), ts: Date.parse(m[2] || '') || 0 }))
      .sort((a, b) => b.ts - a.ts);

    for (const entry of urlEntries) {
      if (candidates.length >= 12) break;
      const existing = candidates.find((c) => c.url === entry.url);
      if (existing) {
        if (entry.ts > 0) existing.ts = entry.ts;
        continue;
      }
      if (seenUrls.has(entry.url)) continue;
      seenUrls.add(entry.url);
      candidates.push(entry);
    }
  }

  if (candidates.length === 0) {
    throw new Error('No St. Paul Center posts discovered');
  }

  const fetchedPosts = await Promise.allSettled(
    candidates.slice(0, 9).map(async (cand) => {
      const r = await fetch(cand.url, { headers: uaHeaders, signal: AbortSignal.timeout(5500) });
      if (!r.ok) return null;
      const html = await r.text();
      const rawTitle =
        extractMetaContent(html, 'og:title') ||
        decodeHtmlEntities((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '').trim();
      const cleanTitle = rawTitle.replace(/\s*[-|–—]\s*St\.?\s*Paul\s*Center.*$/i, '').trim();
      if (!cleanTitle) return null;

      const bodyHtml = extractSimpleArticleBodyHtml(html);
      const metaDesc = extractMetaContent(html, 'og:description') || extractMetaContent(html, 'description');
      const finalBody = bodyHtml.length >= 120 ? bodyHtml : metaDesc ? `<p>${metaDesc}</p>` : '';
      if (!finalBody || finalBody.length < 60) return null;

      let author = extractMetaContent(html, 'author') || 'St. Paul Center';
      const authorInTitle = cleanTitle.match(/(?:\||-|–)\s*((?:Dr\.|Fr\.|Sr\.)?\s*[A-Z][a-z]+(?:\s+[A-Z]\.?)?\s+[A-Z][a-z]+)\s*$/);
      if (author === 'St. Paul Center' && /scott hahn/i.test(cleanTitle)) {
        author = 'Dr. Scott Hahn';
      } else if (author === 'St. Paul Center' && authorInTitle) {
        author = authorInTitle[1].trim();
      }

      const imageUrl = extractMetaContent(html, 'og:image') || cand.cardImage || '';
      const pubTimeMeta = extractMetaContent(html, 'article:published_time') || extractMetaContent(html, 'article:modified_time');
      const ts = (pubTimeMeta && !Number.isNaN(Date.parse(pubTimeMeta)) ? Date.parse(pubTimeMeta) : cand.ts) || Date.now();
      const pubDate = new Date(ts).toUTCString();
      const summary = metaDesc || decodeHtmlEntities(finalBody.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()).slice(0, 320);

      return `<item>
<title><![CDATA[${escapeXmlCdata(cleanTitle)}]]></title>
<link>${cand.url.replace(/&/g, '&amp;')}</link>
<dc:creator><![CDATA[${escapeXmlCdata(author)}]]></dc:creator>
<pubDate>${pubDate}</pubDate>
${imageUrl ? `<media:content url="${imageUrl.replace(/"/g, '&quot;')}" medium="image" />` : ''}
<description><![CDATA[${escapeXmlCdata(summary)}]]></description>
<content:encoded><![CDATA[${escapeXmlCdata(finalBody)}]]></content:encoded>
</item>`;
    })
  );

  const itemsXml = fetchedPosts
    .map((r) => (r.status === 'fulfilled' ? r.value : null))
    .filter((v): v is string => Boolean(v));

  if (itemsXml.length === 0) {
    throw new Error('No readable St. Paul Center posts extracted');
  }

  return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/"><channel><title>St. Paul Center</title>${itemsXml.join('\n')}</channel></rss>`;
}

function wpPostsJsonToRssXml(jsonText: string, sourceTitle: string): string | null {
  try {
    const posts = JSON.parse(jsonText);
    if (!Array.isArray(posts) || posts.length === 0) return null;

    const itemsXml = posts
      .map((post: any) => {
        const title = post?.title?.rendered || '';
        const link = post?.link || '';
        if (!title || !link) return '';

        const dateVal = post?.date_gmt || post?.date || '';
        const parsedMs = dateVal
          ? Date.parse(dateVal.endsWith('Z') || /[+-]\d{2}:\d{2}$/.test(dateVal) ? dateVal : `${dateVal}Z`)
          : NaN;
        const pubDate = !Number.isNaN(parsedMs) ? new Date(parsedMs).toUTCString() : new Date().toUTCString();

        const authorName = post?._embedded?.author?.[0]?.name || `${sourceTitle} Editorial`;
        const featuredMedia = post?._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
        const excerptHtml = post?.excerpt?.rendered || '';
        const contentHtml = post?.content?.rendered || excerptHtml;

        return `<item>
<title><![CDATA[${escapeXmlCdata(title)}]]></title>
<link>${link.replace(/&/g, '&amp;')}</link>
<dc:creator><![CDATA[${escapeXmlCdata(authorName)}]]></dc:creator>
<pubDate>${pubDate}</pubDate>
${featuredMedia ? `<media:content url="${featuredMedia.replace(/"/g, '&quot;')}" medium="image" />` : ''}
<description><![CDATA[${escapeXmlCdata(excerptHtml)}]]></description>
<content:encoded><![CDATA[${escapeXmlCdata(contentHtml)}]]></content:encoded>
</item>`;
      })
      .filter(Boolean);

    if (itemsXml.length === 0) return null;
    return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/"><channel><title>${sourceTitle}</title>${itemsXml.join('\n')}</channel></rss>`;
  } catch {
    return null;
  }
}

async function fetchUpstreamRssXml(url: string, sourceTitle: string = 'Catholic Press'): Promise<string> {
  if (url === 'stpaulcenter://live') {
    return fetchStPaulCenterLiveRssXml();
  }

  const isWpJson = url.includes('/wp-json/');
  const noCacheHeaders: Record<string, string> = {
    Accept: isWpJson
      ? 'application/json, */*'
      : 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*',
    'Cache-Control': 'no-cache, no-store, max-age=0',
    Pragma: 'no-cache',
  };

  const parseFeedResponse = (rawText: string): string | null => {
    if (!rawText) return null;
    if (isWpJson && rawText.trim().startsWith('[')) {
      return wpPostsJsonToRssXml(rawText, sourceTitle);
    }
    if (/<item[\s>]/i.test(rawText) || /<entry[\s>]/i.test(rawText)) {
      return rawText;
    }
    return null;
  };

  let needsUaFallback = false;
  try {
    const res1 = await fetch(url, {
      cache: 'no-store',
      headers: noCacheHeaders,
      signal: AbortSignal.timeout(10000),
    });
    if (res1.ok) {
      const txt1 = await res1.text();
      const parsed1 = parseFeedResponse(txt1);
      if (parsed1) return parsed1;
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
    signal: AbortSignal.timeout(10000),
  });
  if (!res2.ok) {
    throw new Error(`HTTP ${res2.status}`);
  }
  const txt2 = await res2.text();
  const parsed2 = parseFeedResponse(txt2);
  if (!parsed2) {
    throw new Error('Invalid RSS XML');
  }
  return parsed2;
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
      typeof req.query?.source === 'string' && req.query.source.trim()
        ? req.query.source.trim()
        : 'st-paul-center';
    const candidateUrls = SERVER_CATHOLIC_RSS_FEEDS[sourceKey];
    if (!candidateUrls || candidateUrls.length === 0) {
      return res.status(404).json({ error: `Unknown RSS publication source: ${sourceKey}` });
    }
    const sourceTitle = SERVER_RSS_SOURCE_NAMES[sourceKey] || sourceKey;

    const collected: { xml: string; ts: number; index: number; titleKey: string }[] = [];
    const seenTitles = new Set<string>();
    let lastErr: any = null;

    // Fetch candidate URLs in strict priority order so fallback feeds only activate if the primary feed fails or returns 0 items
    for (const targetUrl of candidateUrls) {
      try {
        const xml = await fetchUpstreamRssXml(targetUrl, sourceTitle);
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
        for (let index = 0; index < itemMatches.length; index++) {
          const itemXml = itemMatches[index];
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
          const titleKey = extractFeedItemTitleKey(itemXml);
          if (titleKey && seenTitles.has(titleKey)) continue;
          if (titleKey) seenTitles.add(titleKey);
          collected.push({ xml: normalizedXml, ts, index, titleKey });
        }

        if (collected.length > 0) {
          break;
        }
      } catch (err) {
        lastErr = err;
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
