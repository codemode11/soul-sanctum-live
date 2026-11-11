/**
 * Real-Time Catholic Internet Research Engine
 * Searches online Catholic encyclopedic articles, Vatican updates, and reliable sources
 * to ground the Catholic Assistant in real-time facts and authoritative citations.
 * Works seamlessly in both Node.js (server) and Browser (CORS client fallback).
 */

export interface WebResearchSource {
  title: string;
  url: string;
  snippet: string;
  extract?: string;
  domain: string;
}

export async function searchCatholicInternet(query: string): Promise<WebResearchSource[]> {
  const sources: WebResearchSource[] = [];
  const cleanQuery = query.replace(/[?.,!#@$%^&*()[\]{}]/g, ' ').trim();
  if (!cleanQuery) return sources;

  const isBrowser = typeof window !== 'undefined';
  const reqHeaders: Record<string, string> = isBrowser
    ? { Accept: 'application/json' }
    : {
        'User-Agent': 'SoulSanctumCatholicAssistant/1.0 (Catholic Research Tool)',
        Accept: 'application/json',
      };

  try {
    // Strip common conversational prefixes so the search targets the core theological/historical subject
    const coreSubject = cleanQuery
      .replace(/^(who|what|when|where|why|how)\s+(is|was|are|were|did|does|do|can|could|should|would)\s+/i, '')
      .replace(/^(tell me about|explain|describe|what does the catholic church teach about|what is the catholic view on)\s+/i, '')
      .trim() || cleanQuery;

    // 1. Query online Catholic encyclopedic and historical knowledge (CORS-enabled via origin=*)
    const searchTerms = /catholic|saint|st\.|pope|council|vatican|mass|eucharist|mary|rosary|bible|gospel|catechism|aquinas|augustine/i.test(coreSubject)
      ? coreSubject
      : `${coreSubject} Catholic`;

    const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
      searchTerms
    )}&utf8=&format=json&origin=*&srlimit=4`;

    const wikiPromise = fetch(wikiUrl, {
      headers: reqHeaders,
      signal: AbortSignal.timeout(4500),
    })
      .then(async (res) => {
        if (!res.ok) return [];
        const data = await res.json();
        const items = data.query?.search?.slice(0, 3) || [];

        const detailedItems = await Promise.all(
          items.map(async (item: any) => {
            const title = item.title;
            const rawSnippet = item.snippet || '';
            const basicSnippet = rawSnippet
              .replace(/<[^>]+>/g, '')
              .replace(/&quot;/g, '"')
              .replace(/&amp;/g, '&')
              .replace(/&#039;|&apos;/g, "'")
              .trim();
            const slug = encodeURIComponent(title.replace(/\s+/g, '_'));
            const articleUrl = `https://en.wikipedia.org/wiki/${slug}`;

            // Fetch full REST summary extract for richer factual accuracy
            try {
              const summaryRes = await fetch(
                `https://en.wikipedia.org/api/rest_v1/page/summary/${slug}`,
                {
                  headers: reqHeaders,
                  signal: AbortSignal.timeout(3000),
                }
              );
              if (summaryRes.ok) {
                const summaryData = await summaryRes.json();
                if (summaryData.extract && typeof summaryData.extract === 'string') {
                  return {
                    title: summaryData.title || title,
                    url: summaryData.content_urls?.desktop?.page || articleUrl,
                    snippet: summaryData.extract.slice(0, 360),
                    extract: summaryData.extract,
                    domain: 'en.wikipedia.org',
                  } as WebResearchSource;
                }
              }
            } catch {
              // Fallback to search snippet if summary call times out
            }

            return {
              title,
              url: articleUrl,
              snippet: basicSnippet,
              extract: basicSnippet,
              domain: 'en.wikipedia.org',
            } as WebResearchSource;
          })
        );

        return detailedItems;
      })
      .catch(() => []);

    // 2. Scan Vatican News RSS (server-side or via local /api/vatican-news in browser)
    const vaticanPromise = (async (): Promise<WebResearchSource[]> => {
      try {
        const vaticanUrl = isBrowser
          ? '/api/vatican-news'
          : 'https://www.vaticannews.va/en.rss.xml';
        const res = await fetch(vaticanUrl, {
          headers: isBrowser ? {} : { 'User-Agent': 'SoulSanctumCatholicAssistant/1.0' },
          signal: AbortSignal.timeout(3500),
        });
        if (!res.ok) return [];
        const xml = await res.text();
        if (!xml.includes('<item>')) return [];

        const items: WebResearchSource[] = [];
        const itemRegex = /<item>([\s\S]*?)<\/item>/gi;
        let m: RegExpExecArray | null;

        const words = coreSubject
          .toLowerCase()
          .split(/\s+/)
          .filter((w) => w.length > 3 && !['what', 'when', 'where', 'which', 'about', 'from', 'that', 'this', 'with'].includes(w));

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

          if (title && link && words.length > 0) {
            const textToSearch = `${title} ${desc}`.toLowerCase();
            const matchesQuery = words.some((w) => textToSearch.includes(w));
            if (matchesQuery) {
              items.push({
                title: `${title} (Vatican News)`,
                url: link,
                snippet: desc.slice(0, 280),
                extract: desc,
                domain: 'vaticannews.va',
              });
            }
          }
        }
        return items;
      } catch {
        return [];
      }
    })();

    const [wikiResults, vaticanResults] = await Promise.all([wikiPromise, vaticanPromise]);

    for (const r of [...vaticanResults, ...wikiResults]) {
      if (!sources.some((s) => s.url === r.url) && sources.length < 4) {
        sources.push(r);
      }
    }
  } catch (err) {
    console.warn('Web research query encountered transient issue:', err);
  }

  return sources;
}

/**
 * Synthesizes a rich, non-repetitive Catholic response from live Internet research sources
 * whenever the client is running in a static-only environment without the Node backend.
 */
export function synthesizeResearchResponse(
  question: string,
  webSources: WebResearchSource[],
  specificDoctrinalMatch?: string
): string {
  const sections: string[] = [];

  if (specificDoctrinalMatch) {
    sections.push(specificDoctrinalMatch);
  }

  if (webSources.length > 0) {
    const primary = webSources[0];
    const secondary = webSources.slice(1);

    if (!specificDoctrinalMatch) {
      sections.push(`### ${primary.title} — Catholic Historical & Theological Research`);
      sections.push(primary.extract || primary.snippet);
    } else {
      sections.push(`### Live Internet Research & Historical Context: ${primary.title}`);
      sections.push(primary.extract || primary.snippet);
    }

    if (secondary.length > 0) {
      sections.push(`### Additional Verified Research & Ecclesial Context`);
      for (const src of secondary) {
        sections.push(`* **${src.title}:** ${src.extract || src.snippet} ([Read Source](${src.url}))`);
      }
    }

    sections.push(`### Magisterial & Scriptural Synthesis`);
    sections.push(
      `* **Deposit of Faith (CCC 84–95):** The Catholic Church holds that Sacred Tradition, Sacred Scripture, and the living Magisterium are so connected and associated that one of them cannot stand without the others, working together under the action of the one Holy Spirit for the salvation of souls.\n` +
      `* **Universal Call to Holiness (Lumen Gentium, 40; CCC 2013):** All the faithful of Christ of whatever rank or status are called to the fullness of the Christian life and to the perfection of charity.\n` +
      `* **Primary Online Reference:** [${primary.title} (${primary.domain})](${primary.url})`
    );

    return sections.join('\n\n');
  }

  if (specificDoctrinalMatch) {
    return specificDoctrinalMatch;
  }

  return `### Inquiry: "${question}"\n\nNo external web articles matched that exact phrase, but according to the **Catechism of the Catholic Church (CCC 74–100)**, every theological inquiry is illuminated by the harmony of Sacred Scripture, Apostolic Tradition, and the living Magisterium. Try asking about a specific Catholic doctrine, saint, Pope, Ecumenical Council, Sacrament, or Scripture passage.`;
}
