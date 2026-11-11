/**
 * Real-Time Catholic Internet Research Engine
 * Searches online Catholic encyclopedic articles, Vatican updates, and reliable sources
 * to ground the Catholic Assistant in real-time facts and authoritative citations.
 */

export interface WebResearchSource {
  title: string;
  url: string;
  snippet: string;
  domain: string;
}

export async function searchCatholicInternet(query: string): Promise<WebResearchSource[]> {
  const sources: WebResearchSource[] = [];
  const cleanQuery = query.replace(/[?.,!#@$%^&*]/g, ' ').trim();
  if (!cleanQuery) return sources;

  try {
    // 1. Query online Catholic encyclopedic and historical knowledge
    const searchTerms = `${cleanQuery} Catholic Church`;
    const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(searchTerms)}&utf8=&format=json`;

    const wikiPromise = fetch(wikiUrl, {
      headers: {
        'User-Agent': 'SoulSanctumCatholicAssistant/1.0 (Catholic Research Tool)'
      },
      signal: AbortSignal.timeout(4000)
    }).then(async (res) => {
      if (!res.ok) return [];
      const data = await res.json();
      const items = data.query?.search?.slice(0, 3) || [];
      return items.map((item: any) => {
        const title = item.title;
        const rawSnippet = item.snippet || '';
        const snippet = rawSnippet
          .replace(/<[^>]+>/g, '')
          .replace(/&quot;/g, '"')
          .replace(/&amp;/g, '&')
          .replace(/&#039;|&apos;/g, "'")
          .trim();
        const slug = encodeURIComponent(title.replace(/\s+/g, '_'));
        return {
          title,
          url: `https://en.wikipedia.org/wiki/${slug}`,
          snippet,
          domain: 'en.wikipedia.org'
        };
      });
    }).catch(() => []);

    // 2. Scan Vatican News RSS for relevant recent articles
    const vaticanPromise = fetch('https://www.vaticannews.va/en.rss.xml', {
      headers: {
        'User-Agent': 'SoulSanctumCatholicAssistant/1.0'
      },
      signal: AbortSignal.timeout(3500)
    }).then(async (res) => {
      if (!res.ok) return [];
      const xml = await res.text();
      const items: WebResearchSource[] = [];
      const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
      let m: RegExpExecArray | null;

      const words = cleanQuery.toLowerCase().split(/\s+/).filter(w => w.length > 3);

      while ((m = itemRegex.exec(xml)) !== null && items.length < 2) {
        const block = m[1];
        const titleMatch = block.match(/<title>([\s\S]*?)<\/title>/i);
        const linkMatch = block.match(/<link>([\s\S]*?)<\/link>/i);
        const descMatch = block.match(/<description>([\s\S]*?)<\/description>/i);

        const title = (titleMatch?.[1] || '').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim();
        const link = (linkMatch?.[1] || '').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim();
        const desc = (descMatch?.[1] || '')
          .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
          .replace(/<[^>]+>/g, '')
          .trim();

        if (title && link) {
          const textToSearch = `${title} ${desc}`.toLowerCase();
          const matchesQuery = words.some(w => textToSearch.includes(w));
          if (matchesQuery) {
            items.push({
              title: `${title} (Vatican News)`,
              url: link,
              snippet: desc.slice(0, 240),
              domain: 'vaticannews.va'
            });
          }
        }
      }
      return items;
    }).catch(() => []);

    const [wikiResults, vaticanResults] = await Promise.all([wikiPromise, vaticanPromise]);

    for (const r of [...vaticanResults, ...wikiResults]) {
      if (!sources.some(s => s.url === r.url) && sources.length < 4) {
        sources.push(r);
      }
    }
  } catch (err) {
    console.warn('Web research query encountered transient issue:', err);
  }

  return sources;
}
