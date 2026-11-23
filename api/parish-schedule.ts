import { GoogleGenAI, ThinkingLevel } from '@google/genai';

interface GroundedSource {
  title: string;
  uri: string;
}

interface FallbackLinks {
  websiteUri?: string;
  masstimesUrl: string;
  googleSearchUrl: string;
}

interface ParishSchedulePayload {
  parishName: string;
  scheduleMarkdown: string;
  sources: GroundedSource[];
  checkedAt: string;
}

interface FetchedWebDoc {
  title: string;
  uri: string;
  text: string;
}

const CACHE_TTL_MS = 6 * 60 * 60 * 1000;
const scheduleCache = new Map<string, { expiresAt: number; payload: ParishSchedulePayload }>();

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function classifyGeminiError(err: any) {
  const status = Number(err?.status || err?.code || 0);
  const msg = String(err?.message || err || '');
  const isQuotaOrRateLimit =
    status === 429 || /RESOURCE_EXHAUSTED|exceeded your current quota|rate[- ]?limit|too many requests/i.test(msg);
  const isHardQuota = /exceeded your current quota|check your plan and billing|billing details/i.test(msg);
  const isAuthError =
    status === 403 ||
    status === 400 ||
    /PERMISSION_DENIED|API_KEY_INVALID|invalid api key|API key not valid/i.test(msg);
  const isNotFound = status === 404 || /NOT_FOUND/i.test(msg);
  return { status, msg, isQuotaOrRateLimit, isHardQuota, isAuthError, isNotFound };
}

function isSafePublicHttpUrl(rawUrl: string): string | null {
  const trimmed = (rawUrl || '').trim();
  if (!trimmed) return null;
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null;
    const host = parsed.hostname.toLowerCase();
    if (
      !host ||
      host === 'localhost' ||
      host === '0.0.0.0' ||
      host === '[::1]' ||
      host.endsWith('.local') ||
      host.endsWith('.internal') ||
      /^127\./.test(host) ||
      /^10\./.test(host) ||
      /^192\.168\./.test(host) ||
      /^169\.254\./.test(host) ||
      /^172\.(1[6-9]|2\d|3[0-1])\./.test(host)
    ) {
      return null;
    }
    return parsed.toString();
  } catch {
    return null;
  }
}

function htmlToReadableText(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(script|style|noscript|svg|iframe)[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<\/(p|div|li|tr|h1|h2|h3|h4|h5|h6|br|section|article)>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#039;|&apos;/gi, "'")
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function extractTitleFromHtml(html: string, fallback: string): string {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!match) return fallback;
  const cleaned = match[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  return cleaned ? cleaned.slice(0, 140) : fallback;
}

function extractScheduleLinks(html: string, baseUrl: string): string[] {
  const candidates: string[] = [];
  const seen = new Set<string>([baseUrl]);
  const baseOrigin = new URL(baseUrl).origin;
  const anchorRegex = /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match: RegExpExecArray | null;
  while ((match = anchorRegex.exec(html)) !== null) {
    const href = (match[1] || '').trim();
    const label = (match[2] || '').replace(/<[^>]+>/g, ' ').trim();
    if (!href || href.startsWith('#') || /^(mailto:|tel:|javascript:)/i.test(href)) continue;
    if (!/(mass|confession|reconcil|adoration|schedule|liturg|sacrament|worship|times)/i.test(`${href} ${label}`)) {
      continue;
    }
    try {
      const resolved = new URL(href, baseUrl);
      if (resolved.origin !== baseOrigin) continue;
      const safe = isSafePublicHttpUrl(resolved.toString());
      if (safe && !seen.has(safe)) {
        seen.add(safe);
        candidates.push(safe);
        if (candidates.length >= 2) break;
      }
    } catch {
      // Ignore malformed relative href
    }
  }
  return candidates;
}

async function fetchHtmlSnippet(url: string): Promise<{ title: string; uri: string; text: string; html: string } | null> {
  const safeUrl = isSafePublicHttpUrl(url);
  if (!safeUrl) return null;
  try {
    const response = await fetch(safeUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SoulSanctumParishFinder/1.0)',
        Accept: 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8',
      },
      signal: AbortSignal.timeout(3500),
    });
    if (!response.ok) return null;
    const contentType = (response.headers.get('content-type') || '').toLowerCase();
    if (contentType && !contentType.includes('text/html') && !contentType.includes('text/plain')) {
      return null;
    }
    const html = (await response.text()).slice(0, 180_000);
    const text = htmlToReadableText(html).slice(0, 6500);
    if (text.length < 40) return null;
    return {
      title: extractTitleFromHtml(html, new URL(safeUrl).hostname),
      uri: safeUrl,
      text,
      html,
    };
  } catch {
    return null;
  }
}

async function fetchDuckDuckGoSnippets(query: string): Promise<FetchedWebDoc[]> {
  try {
    const searchUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        Accept: 'text/html',
      },
      signal: AbortSignal.timeout(3500),
    });
    if (!response.ok) return [];
    const html = (await response.text()).slice(0, 180_000);
    const docs: FetchedWebDoc[] = [];
    const seen = new Set<string>();
    const resultBlockRegex = /<a[^>]*class=["'][^"']*result__a[^"']*["'][^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>[\s\S]{0,900}?class=["'][^"']*result__snippet[^"']*["'][^>]*>([\s\S]*?)<\/[^>]+>/gi;
    let m: RegExpExecArray | null;
    while ((m = resultBlockRegex.exec(html)) !== null && docs.length < 5) {
      let rawHref = (m[1] || '').trim();
      if (rawHref.startsWith('//')) rawHref = `https:${rawHref}`;
      if (rawHref.includes('uddg=')) {
        try {
          const parsed = new URL(rawHref, 'https://duckduckgo.com');
          const target = parsed.searchParams.get('uddg');
          if (target) rawHref = target;
        } catch {
          // keep original
        }
      }
      const safeUri = isSafePublicHttpUrl(rawHref);
      const title = htmlToReadableText(m[2] || '').slice(0, 140);
      const snippet = htmlToReadableText(m[3] || '').slice(0, 500);
      if (safeUri && title && snippet && !seen.has(safeUri)) {
        seen.add(safeUri);
        docs.push({ title, uri: safeUri, text: snippet });
      }
    }
    return docs;
  } catch {
    return [];
  }
}

async function fetchParishWebDocuments(
  parishName: string,
  address: string,
  websiteUri: string
): Promise<FetchedWebDoc[]> {
  const docs: FetchedWebDoc[] = [];
  const query = `${parishName} ${address} Catholic Mass Confession Adoration times`.trim();

  const [sitePage, ddgDocs] = await Promise.all([
    websiteUri ? fetchHtmlSnippet(websiteUri) : Promise.resolve(null),
    fetchDuckDuckGoSnippets(query),
  ]);

  if (sitePage) {
    docs.push({ title: sitePage.title, uri: sitePage.uri, text: sitePage.text });
    const subLinks = extractScheduleLinks(sitePage.html, sitePage.uri);
    if (subLinks.length > 0) {
      const subPages = await Promise.all(subLinks.map((link) => fetchHtmlSnippet(link)));
      for (const sub of subPages) {
        if (sub && !docs.some((d) => d.uri === sub.uri)) {
          docs.push({ title: sub.title, uri: sub.uri, text: sub.text });
        }
      }
    }
  }

  for (const d of ddgDocs) {
    if (!docs.some((existing) => existing.uri === d.uri)) {
      docs.push(d);
    }
  }

  return docs.slice(0, 6);
}

function buildFallbackLinks(parishName: string, address: string, websiteUri: string): FallbackLinks {
  const safeWebsite = isSafePublicHttpUrl(websiteUri);
  const query = `${parishName} ${address} Catholic Mass Confession Adoration times`.trim();
  return {
    ...(safeWebsite ? { websiteUri: safeWebsite } : {}),
    masstimesUrl: 'https://masstimes.org/',
    googleSearchUrl: `https://www.google.com/search?q=${encodeURIComponent(query)}`,
  };
}

export default async function handler(req: any, res: any) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};
    const parishName = String(body.parishName || '').trim().slice(0, 180);
    const address = String(body.address || '').trim().slice(0, 260);
    const websiteUri = String(body.websiteUri || '').trim().slice(0, 300);
    const forceRefresh = Boolean(body.forceRefresh);

    if (!parishName) {
      return res.status(400).json({ error: 'Parish name is required.' });
    }

    const cacheKey = `${parishName.toLowerCase()}|${address.toLowerCase()}|${websiteUri.toLowerCase()}`;
    const cached = scheduleCache.get(cacheKey);
    if (!forceRefresh && cached && cached.expiresAt > Date.now()) {
      return res.status(200).json(cached.payload);
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const openAiKey = (process.env.OPENAI_API_KEY || '').trim();
    const fallbackLinks = buildFallbackLinks(parishName, address, websiteUri);

    if (!apiKey && !openAiKey) {
      return res.status(503).json({
        error: 'Live parish schedule lookup is unavailable in this environment. Please check the parish website or links below directly.',
        code: 'SERVICE_UNCONFIGURED',
        fallbackLinks,
      });
    }

    const todayLabel = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const formatInstructions = [
      `- Present ONLY verifiable schedule details found in the sources. Never guess or invent times.`,
      `- If a particular schedule (for example Confession or Adoration) is not published online, explicitly state "Not listed online — please verify with the parish office."`,
      `- Format concisely with clear markdown headings:`,
      `  ### Sunday & Saturday Vigil Mass`,
      `  ### Weekday / Daily Mass`,
      `  ### Confession (Reconciliation)`,
      `  ### Eucharistic Adoration`,
      `  ### Helpful Notes`,
    ].join('\n');

    const searchPrompt = [
      `Find the current published Catholic Mass times, Confession (Reconciliation) schedule, and Eucharistic Adoration hours for:`,
      `Parish: ${parishName}`,
      address ? `Address: ${address}` : '',
      websiteUri ? `Official Website: ${websiteUri}` : '',
      `Today's date: ${todayLabel}`,
      ``,
      `Instructions:`,
      `- Search the parish's official website, diocesan directory, or MassTimes listings.`,
      formatInstructions,
    ]
      .filter(Boolean)
      .join('\n');

    const ai = apiKey
      ? new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        })
      : null;

    let lastClassified = {
      status: 0,
      msg: '',
      isQuotaOrRateLimit: false,
      isHardQuota: false,
      isAuthError: false,
      isNotFound: false,
    };

    const saveAndReturn = (payload: ParishSchedulePayload) => {
      if (scheduleCache.size >= 200) {
        const firstKey = scheduleCache.keys().next().value;
        if (firstKey) scheduleCache.delete(firstKey);
      }
      scheduleCache.set(cacheKey, {
        expiresAt: Date.now() + CACHE_TTL_MS,
        payload,
      });
      return res.status(200).json(payload);
    };

    // Tier 1: Gemini with Google Search Grounding (valid models per SDK matrix)
    if (ai) {
      const searchCandidates: Array<{ model: string; thinkingLow: boolean }> = [
        { model: 'gemini-4-hydrogen', thinkingLow: true },
        { model: 'gemini-3.1-flash-lite', thinkingLow: false },
      ];

      for (const candidate of searchCandidates) {
        for (let attempt = 0; attempt < 2; attempt++) {
          try {
            const response = await ai.models.generateContent({
              model: candidate.model,
              contents: searchPrompt,
              config: {
                tools: [{ googleSearch: {} }],
                ...(candidate.thinkingLow
                  ? { thinkingConfig: { thinkingLevel: ThinkingLevel.LOW } }
                  : {}),
              },
            });

            const scheduleMarkdown = (response.text || '').trim();
            const rawChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
            const seen = new Set<string>();
            const sources: GroundedSource[] = [];

            for (const chunk of rawChunks as any[]) {
              const uri = chunk?.web?.uri;
              const title = chunk?.web?.title;
              if (typeof uri === 'string' && /^https?:\/\//i.test(uri) && !seen.has(uri)) {
                seen.add(uri);
                sources.push({
                  uri,
                  title: typeof title === 'string' && title.trim() ? title.trim() : uri,
                });
              }
            }

            if (scheduleMarkdown) {
              return saveAndReturn({
                parishName,
                scheduleMarkdown,
                sources: sources.slice(0, 6),
                checkedAt: new Date().toISOString(),
              });
            }
            break;
          } catch (err: any) {
            lastClassified = classifyGeminiError(err);
            if (lastClassified.isQuotaOrRateLimit && !lastClassified.isHardQuota && attempt === 0) {
              await sleep(850);
              continue;
            }
            break;
          }
        }
      }
    }

    // Tier 2: Real live web fetch (parish website + DuckDuckGo results) + non-Search AI synthesis
    const webDocs = await fetchParishWebDocuments(parishName, address, websiteUri);
    if (webDocs.length > 0) {
      const contextBlock = webDocs
        .map((doc, idx) => `[Source ${idx + 1}: ${doc.title} (${doc.uri})]\n${doc.text.slice(0, 3200)}`)
        .join('\n\n---\n\n');

      const extractionPrompt = [
        `Extract the published Catholic Mass times, Confession (Reconciliation) schedule, and Eucharistic Adoration hours for "${parishName}"${address ? ` (${address})` : ''} strictly from the verified web sources provided below.`,
        `Today's date: ${todayLabel}`,
        ``,
        `Instructions:`,
        formatInstructions,
        ``,
        `VERIFIED WEB SOURCES:`,
        contextBlock,
      ].join('\n');

      const docSources: GroundedSource[] = webDocs.map((d) => ({ title: d.title, uri: d.uri }));

      if (ai) {
        for (const modelName of ['gemini-3.1-flash-lite', 'gemini-4-hydrogen']) {
          try {
            const response = await ai.models.generateContent({
              model: modelName,
              contents: extractionPrompt,
              ...(modelName === 'gemini-4-hydrogen'
                ? { config: { thinkingConfig: { thinkingLevel: ThinkingLevel.LOW } } }
                : {}),
            });
            const text = (response.text || '').trim();
            if (text) {
              return saveAndReturn({
                parishName,
                scheduleMarkdown: text,
                sources: docSources,
                checkedAt: new Date().toISOString(),
              });
            }
          } catch (err: any) {
            lastClassified = classifyGeminiError(err);
          }
        }
      }

      if (openAiKey) {
        try {
          const oaRes = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${openAiKey}`,
            },
            body: JSON.stringify({
              model: 'gpt-4o-mini',
              temperature: 0.1,
              max_tokens: 900,
              messages: [
                {
                  role: 'system',
                  content: 'You extract verifiable Catholic parish liturgical schedules strictly from provided web source text.',
                },
                { role: 'user', content: extractionPrompt },
              ],
            }),
            signal: AbortSignal.timeout(8000),
          });
          if (oaRes.ok) {
            const oaData = (await oaRes.json()) as any;
            const text = String(oaData?.choices?.[0]?.message?.content || '').trim();
            if (text) {
              return saveAndReturn({
                parishName,
                scheduleMarkdown: text,
                sources: docSources,
                checkedAt: new Date().toISOString(),
              });
            }
          }
        } catch {
          // Proceed to structured error handling
        }
      }
    }

    if (lastClassified.isQuotaOrRateLimit) {
      console.warn(`[/api/parish-schedule] Gemini API quota limit (429) for "${parishName}". Returning actionable links.`);
      return res.status(429).json({
        error:
          'Live AI schedule lookup has reached the current Gemini API quota limit. Upgrading or selecting a billing-enabled Gemini API key in Settings > Secrets expands your quota, or you can open the parish links below directly.',
        code: 'RESOURCE_EXHAUSTED',
        isQuotaError: true,
        fallbackLinks,
      });
    }

    if (lastClassified.isAuthError) {
      console.warn(`[/api/parish-schedule] Gemini API key/permission error (${lastClassified.status}).`);
      return res.status(lastClassified.status === 400 ? 400 : 403).json({
        error:
          'The configured Gemini API key could not be authorized for live parish lookup. Please verify your API key in Settings > Secrets, or use the parish links below.',
        code: 'PERMISSION_DENIED',
        fallbackLinks,
      });
    }

    return res.status(502).json({
      error: 'Unable to retrieve the published parish schedule right now. Please check the parish website or MassTimes.org below.',
      code: 'LOOKUP_UNAVAILABLE',
      fallbackLinks,
    });
  } catch (err: any) {
    console.warn('[/api/parish-schedule] request error:', err?.message || 'Unknown error');
    return res.status(502).json({
      error: 'Unable to look up live parish schedule right now. Please check the parish website or MassTimes.org directly.',
      code: 'INTERNAL_ERROR',
    });
  }
}
