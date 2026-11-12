/**
 * Real-Time Catholic Internet Research Engine
 * Searches online Catholic encyclopedic articles, Vatican updates, and reliable sources
 * to ground the Catholic Assistant in real-time facts and authoritative citations.
 * Strictly filters results so only sources directly relevant to the user's question are returned.
 */

export interface WebResearchSource {
  title: string;
  url: string;
  snippet: string;
  extract?: string;
  domain: string;
}

const STOP_WORDS = new Set([
  'who', 'what', 'when', 'where', 'why', 'how', 'is', 'was', 'are', 'were',
  'did', 'does', 'do', 'can', 'could', 'should', 'would', 'will', 'shall',
  'may', 'might', 'must', 'the', 'a', 'an', 'and', 'or', 'but', 'if', 'then',
  'else', 'for', 'of', 'in', 'on', 'at', 'to', 'from', 'by', 'with', 'about',
  'into', 'through', 'during', 'before', 'after', 'above', 'below', 'between',
  'under', 'again', 'further', 'once', 'here', 'there', 'all', 'any', 'both',
  'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not',
  'only', 'own', 'same', 'so', 'than', 'too', 'very', 'tell', 'me', 'explain',
  'describe', 'catholic', 'church', 'teach', 'teaching', 'view', 'according',
  'please', 'question', 'answer', 'mean', 'means',
]);

export function cleanUserQuestion(rawQuery: string): string {
  return (rawQuery || '')
    .replace(/\[Persona Instruction:[\s\S]*$/i, '')
    .replace(/[?.,!#@$%^&*()[\]{}"']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function extractSignificantKeywords(cleanQuery: string): string[] {
  return cleanQuery
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length >= 3 && !STOP_WORDS.has(w));
}

export async function searchCatholicInternet(query: string): Promise<WebResearchSource[]> {
  const sources: WebResearchSource[] = [];
  const cleanQuery = cleanUserQuestion(query);
  if (!cleanQuery) return sources;

  const significantKeywords = extractSignificantKeywords(cleanQuery);
  if (significantKeywords.length === 0) return sources;

  const isBrowser = typeof window !== 'undefined';
  const reqHeaders: Record<string, string> = isBrowser
    ? { Accept: 'application/json' }
    : {
        'User-Agent': 'SoulSanctumCatholicAssistant/1.0 (Catholic Research Tool)',
        Accept: 'application/json',
      };

  try {
    const coreSubject =
      cleanQuery
        .replace(/^(who|what|when|where|why|how)\s+(is|was|are|were|did|does|do|can|could|should|would)\s+/i, '')
        .replace(/^(tell me about|explain|describe|what does the catholic church teach about|what is the catholic view on)\s+/i, '')
        .trim() || cleanQuery;

    const searchTerms = /catholic|saint|st\.|pope|council|vatican|mass|eucharist|mary|rosary|bible|gospel|catechism|aquinas|augustine/i.test(
      coreSubject
    )
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
        const items = data.query?.search?.slice(0, 4) || [];

        const detailedItems = await Promise.all(
          items.map(async (item: any) => {
            const title = String(item.title || '');
            const rawSnippet = String(item.snippet || '');
            const basicSnippet = rawSnippet
              .replace(/<[^>]+>/g, '')
              .replace(/&quot;/g, '"')
              .replace(/&amp;/g, '&')
              .replace(/&#039;|&apos;/g, "'")
              .trim();

            // Strict relevance check: title or snippet must match the user's significant keywords
            const combinedLower = `${title} ${basicSnippet}`.toLowerCase();
            const matchedKeywords = significantKeywords.filter((kw) => combinedLower.includes(kw));
            const minRequiredMatches = significantKeywords.length >= 3 ? 2 : 1;
            if (matchedKeywords.length < minRequiredMatches) {
              return null;
            }

            const slug = encodeURIComponent(title.replace(/\s+/g, '_'));
            const articleUrl = `https://en.wikipedia.org/wiki/${slug}`;

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

        return detailedItems.filter((item): item is WebResearchSource => item !== null);
      })
      .catch(() => []);

    // 2. Scan Vatican News RSS only when strictly matching the user's keywords
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

          if (title && link && significantKeywords.length > 0) {
            const textToSearch = `${title} ${desc}`.toLowerCase();
            const matchCount = significantKeywords.filter((w) => textToSearch.includes(w)).length;
            const minRequired = significantKeywords.length >= 2 ? 2 : 1;
            if (matchCount >= minRequired) {
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
      if (!sources.some((s) => s.url === r.url) && sources.length < 3) {
        sources.push(r);
      }
    }
  } catch (err) {
    console.warn('Web research query encountered transient issue:', err);
  }

  return sources;
}

/**
 * Offline emergency fallback that only returns content directly matching the question.
 */
export function synthesizeResearchResponse(
  question: string,
  webSources: WebResearchSource[],
  specificDoctrinalMatch?: string
): string {
  const cleanQ = cleanUserQuestion(question);
  const sections: string[] = [];

  if (specificDoctrinalMatch) {
    sections.push(specificDoctrinalMatch);
  }

  if (webSources.length > 0) {
    const primary = webSources[0];
    const secondary = webSources.slice(1);

    sections.push(`### Direct Answer & Historical Context: ${primary.title}`);
    sections.push(primary.extract || primary.snippet);

    if (secondary.length > 0) {
      sections.push(`### Related Sources on "${cleanQ}"`);
      for (const src of secondary) {
        sections.push(`* **${src.title}:** ${src.extract || src.snippet} ([Source](${src.url}))`);
      }
    }

    return sections.join('\n\n');
  }

  if (specificDoctrinalMatch) {
    return specificDoctrinalMatch;
  }

  return `### Theological Inquiry: "${cleanQ}"\n\nThe AI research service is temporarily reconnecting. Please click **Ask** again to generate a direct, tailored answer to your question: *"${cleanQ}"*.`;
}
