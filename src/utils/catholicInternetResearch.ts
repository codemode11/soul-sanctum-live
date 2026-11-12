/**
 * Real-Time Catholic Internet Research & Essay Synthesis Engine
 * Searches online Catholic encyclopedic articles, Vatican updates, and reliable sources
 * to ground the Catholic Assistant in real-time facts and authoritative citations.
 * Strictly filters results so only sources directly relevant to the user's topic are returned.
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
  // Essay / composition instruction words (excluded from search keywords so only the actual topic is searched)
  'write', 'writing', 'written', 'essay', 'essays', 'paper', 'article',
  'composition', 'paragraphs', 'paragraph', 'words', 'word', 'long', 'short',
  'detailed', 'comprehensive', 'include', 'including', 'source', 'sources',
  'citation', 'citations', 'reference', 'references', 'bibliography', 'cite',
  'citing', 'discuss', 'discussing', 'analyze', 'analysis', 'explore',
  'exploring', 'examine', 'reflection', 'reflect', 'topic', 'subject',
  'introduction', 'conclusion', 'thesis', 'argument', 'give', 'make', 'create',
  'compose', 'draft',
]);

export function cleanUserQuestion(rawQuery: string): string {
  return (rawQuery || '')
    .replace(/\[Persona Instruction:[\s\S]*$/i, '')
    .replace(/[?.,!#@$%^&*()[\]{}"']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Strips leading essay/question framing phrases to isolate the core subject for encyclopedia/web search.
 */
export function extractCoreTopicForSearch(rawQuery: string): string {
  const clean = cleanUserQuestion(rawQuery);
  return (
    clean
      .replace(
        /^(?:please\s+)?(?:can\s+you\s+|could\s+you\s+|would\s+you\s+)?(?:write|compose|draft|create|give\s+me|provide)\s+(?:a\s+|an\s+)?(?:comprehensive\s+|detailed\s+|short\s+|long\s+|scholarly\s+|theological\s+|well-researched\s+|persuasive\s+|analytical\s+|reflective\s+)*(?:essay|paper|article|reflection|treatise|response|analysis|overview)\s+(?:on|about|regarding|concerning|explaining|discussing|analyzing)\s+/i,
        ''
      )
      .replace(
        /^(?:who|what|when|where|why|how)\s+(?:is|was|are|were|did|does|do|can|could|should|would)\s+/i,
        ''
      )
      .replace(
        /^(?:tell\s+me\s+about|explain|describe|discuss|analyze|what\s+does\s+the\s+catholic\s+church\s+teach\s+about|what\s+is\s+the\s+catholic\s+view\s+on)\s+/i,
        ''
      )
      .replace(
        /\b(?:with\s+sources(?:\s+and\s+citations)?|with\s+citations|with\s+references|and\s+cite\s+sources|citing\s+sources|as\s+an\s+essay|in\s+essay\s+format)\b/gi,
        ''
      )
      .replace(/\s+/g, ' ')
      .trim() || clean
  );
}

export function isEssayRequest(rawQuery: string, personaOrDepth?: string): boolean {
  const q = (rawQuery || '').toLowerCase();
  const mode = (personaOrDepth || '').toLowerCase();
  if (mode.includes('essay')) return true;
  return /\b(essay|essays|write\s+a\s+paper|write\s+an\s+article|theological\s+paper|research\s+paper|treatise|multi-paragraph|introduction\s+and\s+conclusion|composition)\b/i.test(
    q
  );
}

export function extractSignificantKeywords(cleanQuery: string): string[] {
  const topicText = extractCoreTopicForSearch(cleanQuery);
  return topicText
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length >= 3 && !STOP_WORDS.has(w));
}

export async function searchCatholicInternet(query: string): Promise<WebResearchSource[]> {
  const sources: WebResearchSource[] = [];
  const cleanQuery = cleanUserQuestion(query);
  if (!cleanQuery) return sources;

  const coreSubject = extractCoreTopicForSearch(cleanQuery);
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
    const searchTerms = /catholic|saint|st\.|pope|council|vatican|mass|eucharist|mary|rosary|bible|gospel|catechism|aquinas|augustine|sacrament|theology|christ|jesus|god|liturgy/i.test(
      coreSubject
    )
      ? coreSubject
      : `${coreSubject} Catholic`;

    const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
      searchTerms
    )}&utf8=&format=json&origin=*&srlimit=4`;

    const wikiPromise = fetch(wikiUrl, {
      headers: reqHeaders,
      signal: AbortSignal.timeout(2500),
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

            // Strict relevance check: title or snippet must match the user's significant topic keywords
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
                  signal: AbortSignal.timeout(1800),
                }
              );
              if (summaryRes.ok) {
                const summaryData = await summaryRes.json();
                if (summaryData.extract && typeof summaryData.extract === 'string') {
                  return {
                    title: summaryData.title || title,
                    url: summaryData.content_urls?.desktop?.page || articleUrl,
                    snippet: summaryData.extract.slice(0, 380),
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
          signal: AbortSignal.timeout(2200),
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
 * Offline emergency fallback that composes a full structured essay (with sources)
 * when the user requests an essay, or a direct answer otherwise.
 */
export function synthesizeResearchResponse(
  question: string,
  webSources: WebResearchSource[],
  specificDoctrinalMatch?: string
): string {
  const cleanQ = cleanUserQuestion(question);
  const coreTopic = extractCoreTopicForSearch(question);
  const wantsEssay = isEssayRequest(question);

  if (wantsEssay) {
    const primaryExtract =
      webSources[0]?.extract ||
      webSources[0]?.snippet ||
      `The question of ${coreTopic} occupies a central place within the theological, historical, and spiritual patrimony of the Catholic Church.`;
    const secondaryExtract =
      webSources[1]?.extract ||
      webSources[1]?.snippet ||
      `Throughout the centuries, Sacred Scripture, the writings of the Church Fathers, and the decrees of the Ecumenical Councils have illuminated the enduring significance of ${coreTopic} for the life of faith and reason.`;

    const sourceListLines =
      webSources.length > 0
        ? webSources.map(
            (s, i) => `${i + 1}. **${s.title}** — *${s.domain}* (${s.url})`
          )
        : [
            `1. **Catechism of the Catholic Church (CCC)** — Libreria Editrice Vaticana (https://www.vatican.va/archive/ENG0015/_INDEX.HTM)`,
            `2. **Sacred Scripture (RSV-CE / NABRE)** — Official Catholic Biblical Text (https://bible.usccb.org)`,
          ];

    return [
      `## Theological Essay: ${coreTopic}`,
      `### I. Introduction`,
      `Within the living tradition of the Catholic Church, the inquiry into **${coreTopic}** invites a rigorous synthesis of Sacred Scripture, Sacred Tradition, and Magisterial teaching. Far from being an isolated academic question, ${coreTopic} touches upon the very harmony between faith and reason (*fides et ratio*) and the mystery of salvation history. ${primaryExtract}`,
      `### II. Scriptural, Historical, and Doctrinal Foundations`,
      `To understand **${coreTopic}** in its proper theological depth, one must examine how the Church has received, safeguarded, and expounded this reality across the centuries. ${secondaryExtract}`,
      specificDoctrinalMatch
        ? `Furthermore, the definitive doctrinal teaching of the Church provides clear parameters for theological reflection:\n\n${specificDoctrinalMatch}`
        : `In the synthesis of the *Catechism of the Catholic Church* and the witness of the Church Fathers and Doctors, every authentic theological truth is ordered toward the revelation of God in Jesus Christ and the sanctification of the human person within the communion of the Church.`,
      `### III. Conclusion`,
      `In conclusion, a thorough examination of **${coreTopic}** demonstrates the internal coherence and spiritual richness of Catholic thought. Grounded in the Deposit of Faith and illuminated by historical and scriptural witness, this teaching continues to guide the faithful in both intellectual clarity and Christian charity.`,
      `### Sources & References`,
      ...sourceListLines,
    ].join('\n\n');
  }

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
      sections.push(`### Related Sources on "${coreTopic}"`);
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
