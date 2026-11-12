import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import { GoogleGenAI } from '@google/genai';
import { searchCatholicInternet, WebResearchSource } from './src/utils/catholicInternetResearch.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CATHOLIC_RSS_FEEDS: Record<string, string> = {
  'aleteia': 'https://aleteia.org/feed/',
  'ncregister': 'https://www.ncregister.com/feeds/general-news.xml',
  'cbcp': 'https://cbcpnews.net/cbcpnews/feed/',
  'catholic-digest': 'https://www.catholicdigest.com/feed/',
  'catholic-insight': 'https://catholicinsight.com/feed/',
  'catholic-answers': 'https://www.catholic.com/feeds/magazine/rss',
  'word-on-fire': 'https://www.wordonfire.org/articles/feed/',
  'st-paul-center': 'https://feed.podbean.com/stpaulcenter/feed.xml',
  'cerc': 'https://catholiceducation.org/feed/',
  'sign-org': 'https://sign.org/feed/'
};

const CATHOLIC_AI_SYSTEM_INSTRUCTION = `You are the Soul Sanctum Catholic Assistant, an authoritative, reverent, scholarly, and pastoral Catholic theological research assistant.

CORE GUIDING PRINCIPLES:
1. Ground every answer firmly in the Deposit of Faith: Sacred Scripture, Sacred Tradition, and the living Magisterium of the Catholic Church.
2. Prominently cite the Catechism of the Catholic Church (CCC) with specific paragraph numbers (e.g., CCC 1324-1327 for the Holy Eucharist, CCC 963-975 for the Blessed Virgin Mary, CCC 1422-1498 for Penance and Reconciliation, CCC 1987-2029 for Grace and Justification).
3. Quote and reference Sacred Scripture (using accurate Catholic editions such as NABRE, Douay-Rheims, or RSV-CE) with explicit chapter and verse.
4. Reference the Church Fathers (such as St. Augustine, St. John Chrysostom, St. Irenaeus of Lyons, St. Ignatius of Antioch, St. Justin Martyr) and Doctors of the Church (especially St. Thomas Aquinas' Summa Theologiae, St. Alphonsus Liguori, St. Robert Bellarmine, St. Teresa of Ávila, St. John of the Cross, St. Francis de Sales).
5. Clearly distinguish the hierarchy of theological certainty:
   - De Fide Dogma (solemnly defined dogmas required for divine and Catholic faith, e.g. Trinity, Incarnation, Real Presence, Immaculate Conception, Assumption)
   - Doctrinal teachings of the Ordinary and Universal Magisterium (requiring religious submission of intellect and will)
   - Theological opinions and legitimate schools of thought within Catholic orthodoxy (e.g., Thomism vs. Scotism vs. Molinism)
   - Approved private revelations (e.g., Fátima, Lourdes, Divine Mercy) which are worthy of pious belief but not binding on Catholic faith.
6. Tone: Courteous, pastoral, humble, deeply reverent, charitable, lucid, and spiritually uplifting. Avoid secular polemics while remaining completely orthodox and unapologetically faithful to the Apostolic See and Catholic dogma.
7. Formatting: Use structured headers, bulleted doctrinal points, and clear source attributions (Scripture, CCC, Patristics, Councils) so the seeker can study and verify the Church's teachings.`;

function vaticanNewsPlugin() {
  return {
    name: 'vatican-news-plugin',
    configureServer(server: any) {
      server.middlewares.use('/api/catholic-ai', async (req: any, res: any) => {
        // Handle CORS preflight
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.end();
          return;
        }

        const processRequest = async (body: any) => {
          try {
            const prompt = body?.prompt;
            const history = body?.history || [];
            const userMemory = typeof body?.userMemory === 'string' ? body.userMemory.trim() : '';
            const enableWebResearch = body?.enableWebResearch !== false;

            if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json; charset=utf-8');
              res.end(JSON.stringify({ error: 'A question or prompt is required.' }));
              return;
            }

            const trimmedPrompt = prompt.trim();

            // Perform real-time Catholic web research
            let webSources: WebResearchSource[] = [];
            if (enableWebResearch) {
              try {
                webSources = await searchCatholicInternet(trimmedPrompt);
              } catch (err) {
                console.warn('Web research query error in vite:', err);
              }
            }

            const apiKey = process.env.GEMINI_API_KEY;
            if (!apiKey) {
              throw new Error('GEMINI_API_KEY is not configured in the environment.');
            }

            const ai = new GoogleGenAI({
              apiKey,
              httpOptions: {
                headers: {
                  'User-Agent': 'aistudio-build',
                },
              },
            });

            const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];
            if (Array.isArray(history)) {
              for (const item of history.slice(-10)) {
                if (item && item.content && typeof item.content === 'string') {
                  contents.push({
                    role: item.role === 'assistant' || item.role === 'model' ? 'model' : 'user',
                    parts: [{ text: item.content }],
                  });
                }
              }
            }

            const effectiveSystemInstruction = userMemory
              ? `${CATHOLIC_AI_SYSTEM_INSTRUCTION}\n\nUSER MEMORY & LEARNED PREFERENCES PROFILE:\n${userMemory}\nAdapt your tone, Scripture translation choice, theological depth, and patristic/saint references naturally to honor these learned user preferences.`
              : CATHOLIC_AI_SYSTEM_INSTRUCTION;

            let promptWithResearch = trimmedPrompt;
            if (webSources.length > 0) {
              const researchSnippets = webSources
                .map((s, idx) => `[Source ${idx + 1}: ${s.title} (${s.url})]\n${s.snippet}`)
                .join('\n\n');

              promptWithResearch = `${trimmedPrompt}\n\n--- REAL-TIME INTERNET RESEARCH FINDINGS ---\n${researchSnippets}\n------------------------------------------\n(Synthesize these real-time web research findings together with authentic Catholic doctrine, Sacred Scripture, CCC citations, and Church Fathers. Cite source links where appropriate.)`;
            }

            contents.push({
              role: 'user',
              parts: [{ text: promptWithResearch }],
            });

            const candidateModels = ['gemini-3.8-flash', 'gemini-3.1-flash-lite'];
            let reply = '';
            let lastError: any = null;

            for (const modelName of candidateModels) {
              try {
                const response = await ai.models.generateContent({
                  model: modelName,
                  contents,
                  config: {
                    systemInstruction: effectiveSystemInstruction,
                  },
                });
                if (response && response.text) {
                  reply = response.text;
                  break;
                }
              } catch (err: any) {
                lastError = err;
              }
            }

            if (!reply && lastError) {
              throw lastError;
            }

            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify({
              reply: reply || 'No response generated from the Catholic Assistant.',
              webSources
            }));
          } catch (err: any) {
            console.error('Catholic AI endpoint error in vite.config.ts:', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify({ error: err?.message || 'Error consulting the Catholic Assistant.' }));
          }
        };

        if (req.method === 'GET') {
          const urlObj = new URL(req.url || '', 'http://localhost');
          const promptParam = urlObj.searchParams.get('prompt');
          if (!promptParam) {
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify({ status: 'ok', hasKey: !!process.env.GEMINI_API_KEY }));
            return;
          }
          const enableWebResearchParam = urlObj.searchParams.get('enableWebResearch');
          const userMemoryParam = urlObj.searchParams.get('userMemory') || '';
          const historyParam = urlObj.searchParams.get('history');
          let parsedHistory: any[] = [];
          if (historyParam) {
            try {
              parsedHistory = JSON.parse(historyParam);
            } catch {
              parsedHistory = [];
            }
          }
          processRequest({
            prompt: promptParam,
            userMemory: userMemoryParam,
            enableWebResearch: enableWebResearchParam !== 'false',
            history: parsedHistory,
          });
          return;
        }

        if (req.body && typeof req.body === 'object' && Object.keys(req.body).length > 0) {
          processRequest(req.body);
          return;
        }

        let bodyBuffer = '';
        req.on('data', (chunk: any) => {
          bodyBuffer += chunk;
        });

        req.on('end', () => {
          try {
            const body = JSON.parse(bodyBuffer || '{}');
            processRequest(body);
          } catch (e: any) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json; charset=utf-8');
            res.end(JSON.stringify({ error: 'Malformed JSON payload.' }));
          }
        });
      });

      server.middlewares.use('/api/vatican-news', async (_req: any, res: any) => {
        try {
          const response = await fetch('https://www.vaticannews.va/en.rss.xml', {
            headers: {
              'User-Agent': 'SanctumCatholicDashboard/1.0 (Catholic News Reader)'
            }
          });
          const xml = await response.text();
          res.setHeader('Content-Type', 'application/xml; charset=utf-8');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(xml);
        } catch (err: any) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: err.message }));
        }
      });

      server.middlewares.use('/api/catholic-rss', async (req: any, res: any) => {
        try {
          const urlObj = new URL(req.url || '', 'http://localhost');
          const sourceKey = urlObj.searchParams.get('source') || 'aleteia';
          const targetUrl = CATHOLIC_RSS_FEEDS[sourceKey];
          if (!targetUrl) {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Unknown RSS source' }));
            return;
          }
          const response = await fetch(targetUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) SanctumCatholicReader/1.0',
              'Accept': 'application/rss+xml, application/xml, text/xml, */*'
            },
            signal: AbortSignal.timeout(7000)
          });
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }
          const xml = await response.text();
          res.setHeader('Content-Type', 'application/xml; charset=utf-8');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(xml);
        } catch (err: any) {
          res.statusCode = 502;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err.message }));
        }
      });

      server.middlewares.use('/api/catholic-article-full', async (req: any, res: any) => {
        try {
          const urlObj = new URL(req.url || '', 'http://localhost');
          const articleUrl = urlObj.searchParams.get('url') || '';
          if (!articleUrl || !/^https?:\/\//i.test(articleUrl)) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Invalid article URL' }));
            return;
          }

          const response = await fetch(articleUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
              'Accept-Language': 'en-US,en;q=0.9'
            },
            signal: AbortSignal.timeout(8500)
          });

          if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
          }

          const html = await response.text();

          const decodeEntities = (str: string): string =>
            str
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

          // 1. Extract og:image if available
          const ogImageMatch =
            html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
            html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
          const ogImage = ogImageMatch ? decodeEntities(ogImageMatch[1].trim()) : undefined;

          // 2. Check JSON-LD for articleBody first
          let extractedText = '';
          const ldJsonMatches = Array.from(
            html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)
          );
          for (const match of ldJsonMatches) {
            try {
              const parsed = JSON.parse(match[1].trim());
              const candidates = Array.isArray(parsed)
                ? parsed
                : parsed['@graph'] && Array.isArray(parsed['@graph'])
                  ? parsed['@graph']
                  : [parsed];
              for (const item of candidates) {
                if (item && typeof item.articleBody === 'string' && item.articleBody.trim().length > 400) {
                  extractedText = decodeEntities(item.articleBody.trim())
                    .replace(/\r\n/g, '\n')
                    .replace(/\n{3,}/g, '\n\n');
                  break;
                }
              }
              if (extractedText.length > 400) break;
            } catch {
              // ignore malformed JSON-LD
            }
          }

          // 3. Extract paragraphs & headings from <article> or main content container
          const cleanHtml = html
            .replace(/<script[\s\S]*?<\/script>/gi, '')
            .replace(/<style[\s\S]*?<\/style>/gi, '')
            .replace(/<noscript[\s\S]*?<\/noscript>/gi, '')
            .replace(/<svg[\s\S]*?<\/svg>/gi, '')
            .replace(/<nav[\s\S]*?<\/nav>/gi, '')
            .replace(/<footer[\s\S]*?<\/footer>/gi, '')
            .replace(/<aside[\s\S]*?<\/aside>/gi, '')
            .replace(/<form[\s\S]*?<\/form>/gi, '');

          const articleMatch =
            cleanHtml.match(/<div[^>]+class=["'][^"']*(?:entry-content|post-content|article-content|article-body|td-post-content|single-content|c-article-content)[^"']*["'][^>]*>([\s\S]*?)<\/div>\s*(?:<footer|<div[^>]+class=["'][^"']*(?:post-footer|sharedaddy|related|tags|author-box))/i) ||
            cleanHtml.match(/<article[^>]*>([\s\S]*?)<\/article>/i) ||
            cleanHtml.match(/<main[^>]*>([\s\S]*?)<\/main>/i);

          const scopeHtml = articleMatch ? articleMatch[1] : cleanHtml;

          const blocks: string[] = [];
          const blockRegex = /<(p|h2|h3|blockquote)\b[^>]*>([\s\S]*?)<\/\1>/gi;
          let m: RegExpExecArray | null;
          const boilerplatePatterns = /^(?:read more|related:|also read:|subscribe to|sign up for|follow us on|share this|click here|advertisement|copyright ©|all rights reserved|support .* journalism|donate today|already a subscriber)/i;

          while ((m = blockRegex.exec(scopeHtml)) !== null) {
            const tag = m[1].toLowerCase();
            const text = decodeEntities(
              m[2]
                .replace(/<br\s*\/?>/gi, '\n')
                .replace(/<[^>]+>/g, '')
                .replace(/\s+/g, ' ')
                .trim()
            );
            if (!text) continue;
            if (boilerplatePatterns.test(text)) continue;
            // Filter out tiny nav/caption fragments unless it's a subheading
            if (tag === 'p' && text.length < 35 && !/[.!?"]$/.test(text)) continue;
            if (blocks.includes(text)) continue;

            if (tag === 'h2' || tag === 'h3') {
              blocks.push(`\n${text}`);
            } else if (tag === 'blockquote') {
              blocks.push(`“${text.replace(/^["“]|["”]$/g, '')}”`);
            } else {
              blocks.push(text);
            }
          }

          const htmlParagraphsText = blocks.join('\n\n').replace(/\n{3,}/g, '\n\n').trim();

          // Choose whichever extraction has richer paragraph structure and length
          const finalContent =
            htmlParagraphsText.length > extractedText.length * 0.75 && htmlParagraphsText.length > 350
              ? htmlParagraphsText
              : extractedText || htmlParagraphsText;

          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(
            JSON.stringify({
              content: finalContent,
              imageUrl: ogImage
            })
          );
        } catch (err: any) {
          res.statusCode = 502;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err.message }));
        }
      });

      server.middlewares.use('/api/catholic-pinterest', async (req: any, res: any) => {
        try {
          const urlObj = new URL(req.url || '', 'http://localhost');
          const rawUser = (urlObj.searchParams.get('username') || 'catholicanswers').replace(/[^a-zA-Z0-9_-]/g, '');
          const rawBoard = (urlObj.searchParams.get('board') || '').replace(/[^a-zA-Z0-9_-]/g, '');
          const feedUrl = rawBoard
            ? `https://www.pinterest.com/${rawUser}/${rawBoard}.rss`
            : `https://www.pinterest.com/${rawUser}/feed.rss`;

          const response = await fetch(feedUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
              'Accept': 'application/rss+xml, application/xml, text/xml, */*'
            },
            signal: AbortSignal.timeout(7000)
          });

          if (!response.ok) {
            throw new Error(`Pinterest RSS HTTP ${response.status}`);
          }

          const xml = await response.text();
          const decodeHtml = (s: string) =>
            s
              .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
              .replace(/&quot;/g, '"')
              .replace(/&apos;|&#039;|&#8217;/g, "'")
              .replace(/&amp;/g, '&')
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')
              .replace(/&nbsp;/g, ' ');

          const itemBlocks = Array.from(xml.matchAll(/<item>([\s\S]*?)<\/item>/gi));
          const items = itemBlocks.map((match, idx) => {
            const block = match[1];
            const rawTitle = (block.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || '';
            const link = ((block.match(/<link>([\s\S]*?)<\/link>/i) || [])[1] || '').trim();
            const pubDate = ((block.match(/<pubDate>([\s\S]*?)<\/pubDate>/i) || [])[1] || '').trim();
            const rawDesc = decodeHtml((block.match(/<description>([\s\S]*?)<\/description>/i) || [])[1] || '');
            const imgMatch = rawDesc.match(/<img[^>]+src=["']([^"']+)["']/i);
            const thumbUrl = imgMatch ? imgMatch[1].trim() : '';
            const highResUrl = thumbUrl ? thumbUrl.replace('/236x/', '/736x/') : '';
            const cleanText = rawDesc
              .replace(/<[^>]+>/g, ' ')
              .replace(/\s+/g, ' ')
              .trim();
            const cleanTitle = decodeHtml(rawTitle).replace(/\s+/g, ' ').trim();

            return {
              id: link || `${rawUser}-pin-${idx}`,
              username: rawUser,
              title: cleanTitle || cleanText.slice(0, 90) || `Sacred Pin from @${rawUser}`,
              description: cleanText || cleanTitle,
              link: link || `https://www.pinterest.com/${rawUser}/`,
              pubDate,
              imageUrl: highResUrl || thumbUrl,
              thumbnailUrl: thumbUrl
            };
          }).filter(item => !!item.imageUrl);

          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(JSON.stringify({ username: rawUser, items }));
        } catch (err: any) {
          res.statusCode = 502;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err.message, items: [] }));
        }
      });

      server.middlewares.use('/api/catholic-social-image', async (req: any, res: any) => {
        try {
          const urlObj = new URL(req.url || '', 'http://localhost');
          const imageUrl = urlObj.searchParams.get('url') || '';
          if (!imageUrl || !/^https?:\/\//i.test(imageUrl)) {
            res.statusCode = 400;
            res.end('Invalid image URL');
            return;
          }

          const response = await fetch(imageUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
              'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
              'Referer': 'https://www.instagram.com/'
            },
            signal: AbortSignal.timeout(8000)
          });

          if (!response.ok) {
            res.statusCode = response.status;
            res.end('Failed to load image');
            return;
          }

          const contentType = response.headers.get('content-type') || 'image/jpeg';
          const buffer = Buffer.from(await response.arrayBuffer());
          res.setHeader('Content-Type', contentType);
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
          res.setHeader('Cache-Control', 'public, max-age=3600');
          res.end(buffer);
        } catch (err: any) {
          res.statusCode = 502;
          res.end('Image proxy error');
        }
      });

      server.middlewares.use('/api/catholic-instagram', async (req: any, res: any) => {
        try {
          const urlObj = new URL(req.url || '', 'http://localhost');
          const rawUser = (urlObj.searchParams.get('username') || 'vaticannews').replace(/[^a-zA-Z0-9._]/g, '');
          const embedUrl = `https://www.instagram.com/${rawUser}/embed/?_t=${Date.now()}`;

          const response = await fetch(embedUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1',
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
              'Accept-Language': 'en-US,en;q=0.9',
              'Cache-Control': 'no-cache, no-store, must-revalidate',
              'Pragma': 'no-cache'
            },
            signal: AbortSignal.timeout(7500)
          });

          if (!response.ok) {
            throw new Error(`Instagram Embed HTTP ${response.status}`);
          }

          const html = await response.text();
          let shortcodes: string[] = [];
          let profilePicUrl: string | undefined;
          let followersCount: number | undefined;
          let fullName: string | undefined;
          const posts: any[] = [];

          const rawMatch = html.match(/"contextJSON":"((?:\\.|[^"\\])*)"/);
          if (rawMatch) {
            try {
              const unescaped = JSON.parse('"' + rawMatch[1] + '"');
              const parsed = JSON.parse(unescaped);
              const ctx = parsed?.context || {};
              if (ctx.profile_pic_url) {
                profilePicUrl = `/api/catholic-social-image?url=${encodeURIComponent(ctx.profile_pic_url)}`;
              }
              if (typeof ctx.followers_count === 'number') {
                followersCount = ctx.followers_count;
              }
              if (typeof ctx.full_name === 'string') {
                fullName = ctx.full_name;
              }

              const brokenShortcodes = new Set(['DfagCq8D3sp', 'DfYQhEYAB8J', 'DfWDi7HDNuW', 'DfPX9L3D8mF']);
              const mediaList = Array.isArray(ctx.graphql_media) ? ctx.graphql_media : [];
              for (const item of mediaList) {
                const sm = item?.shortcode_media;
                if (!sm || !sm.shortcode || brokenShortcodes.has(sm.shortcode)) continue;
                shortcodes.push(sm.shortcode);

                const caption =
                  sm.edge_media_to_caption?.edges?.[0]?.node?.text ||
                  '';
                const rawDisplayUrl = sm.display_url || '';
                const proxiedImageUrl = rawDisplayUrl
                  ? `/api/catholic-social-image?url=${encodeURIComponent(rawDisplayUrl)}`
                  : '';

                const sidecarEdges = sm.edge_sidecar_to_children?.edges || [];
                const carouselImages = sidecarEdges
                  .map((e: any) => e?.node?.display_url)
                  .filter(Boolean)
                  .map((u: string) => `/api/catholic-social-image?url=${encodeURIComponent(u)}`);

                posts.push({
                  id: sm.id || sm.shortcode,
                  shortcode: sm.shortcode,
                  typename: sm.__typename || 'GraphImage',
                  isVideo: !!sm.is_video,
                  imageUrl: proxiedImageUrl,
                  carouselImages: carouselImages.length > 0 ? carouselImages : [proxiedImageUrl].filter(Boolean),
                  caption,
                  timestamp: sm.taken_at_timestamp ? sm.taken_at_timestamp * 1000 : Date.now(),
                  likesCount: sm.edge_liked_by?.count || sm.edge_media_preview_like?.count || 0,
                  commentsCount: sm.commenter_count || sm.edge_media_to_comment?.count || 0
                });
              }
            } catch {
              // Fall back to regex extraction if contextJSON parsing fails
            }
          }

          if (shortcodes.length === 0) {
            const matches = Array.from(html.matchAll(/shortcode\\?":\\?"([A-Za-z0-9_-]{11})\\?"/g)).map(m => m[1]);
            shortcodes = Array.from(new Set(matches)).slice(0, 12);
          }

          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
          res.end(
            JSON.stringify({
              username: rawUser,
              fullName,
              profilePicUrl,
              followersCount,
              shortcodes,
              posts,
              fetchedAt: Date.now()
            })
          );
        } catch (err: any) {
          res.statusCode = 502;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err.message, shortcodes: [], posts: [] }));
        }
      });

      server.middlewares.use('/api/ewtn-epg', async (_req: any, res: any) => {
        try {
          const response = await fetch('https://www.ewtn.com/api/content/live/epg/d/en', {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
              'Accept': 'application/json'
            },
            signal: AbortSignal.timeout(7500)
          });

          if (!response.ok) {
            throw new Error(`EWTN EPG HTTP ${response.status}`);
          }

          const rawTabs = await response.json();
          const nowUnix = Math.floor(Date.now() / 1000);
          const channelsById: Record<string, {
            channelId: string;
            name: string;
            mediaUrl: string;
            nowPlaying?: {
              title: string;
              subtitle?: string;
              description?: string;
              startIso?: string;
              endIso?: string;
            };
            upNext?: {
              title: string;
              subtitle?: string;
              startIso?: string;
            };
          }> = {};

          if (Array.isArray(rawTabs)) {
            for (const tab of rawTabs) {
              for (const ch of tab.channels || []) {
                const progs = Array.isArray(ch.programs) ? ch.programs : [];
                let currentIdx = progs.findIndex(
                  (p: any) => p?.startDate?.unix <= nowUnix && p?.endDate?.unix >= nowUnix
                );
                if (currentIdx === -1 && progs.length > 0) {
                  currentIdx = 0;
                }
                const currentProg = currentIdx >= 0 ? progs[currentIdx] : undefined;
                const nextProg = currentIdx >= 0 && currentIdx + 1 < progs.length ? progs[currentIdx + 1] : undefined;

                channelsById[ch.channelId] = {
                  channelId: ch.channelId,
                  name: ch.name,
                  mediaUrl: ch.mediaUrl,
                  nowPlaying: currentProg
                    ? {
                        title: currentProg.title,
                        subtitle: currentProg.subtitle,
                        description: currentProg.description,
                        startIso: currentProg.startDate?.iso,
                        endIso: currentProg.endDate?.iso
                      }
                    : undefined,
                  upNext: nextProg
                    ? {
                        title: nextProg.title,
                        subtitle: nextProg.subtitle,
                        startIso: nextProg.startDate?.iso
                      }
                    : undefined
                };
              }
            }
          }

          // Check if EWTN Irondale Adoration HLS encoder (9:30 AM - 6:00 PM ET) has live segments right now
          let irondaleAdorationLive = false;
          const adorationPlaylistUrl =
            channelsById['adoration']?.mediaUrl ||
            'https://cdn3.wowza.com/1/Y09GU2RCUG9EbVRr/WlpHUVVx/hls/live/playlist.m3u8';
          try {
            const plRes = await fetch(adorationPlaylistUrl, { signal: AbortSignal.timeout(2500) });
            if (plRes.ok) {
              const plText = await plRes.text();
              const subMatch = plText.match(/(\.\.\/[^\s]+chunklist\.m3u8)/);
              if (subMatch) {
                const chunkUrl = new URL(subMatch[1], adorationPlaylistUrl).toString();
                const chRes = await fetch(chunkUrl, { signal: AbortSignal.timeout(2500) });
                if (chRes.ok) {
                  const chText = await chRes.text();
                  const tsMatch = chText.match(/([^\s]+\.ts)/);
                  if (tsMatch) {
                    const tsUrl = new URL(tsMatch[1], chunkUrl).toString();
                    const tsRes = await fetch(tsUrl, {
                      method: 'GET',
                      headers: { Range: 'bytes=0-64' },
                      signal: AbortSignal.timeout(2500)
                    });
                    if (tsRes.ok || tsRes.status === 206) {
                      irondaleAdorationLive = true;
                    }
                  }
                }
              }
            }
          } catch {
            irondaleAdorationLive = false;
          }

          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(
            JSON.stringify({
              updatedAt: Date.now(),
              irondaleAdorationLive,
              channels: channelsById
            })
          );
        } catch (err: any) {
          res.statusCode = 502;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err.message, irondaleAdorationLive: false, channels: {} }));
        }
      });

      server.middlewares.use('/api/ewtn-radio', async (req: any, res: any) => {
        try {
          const urlObj = new URL(req.url || '', 'http://localhost');
          const allowedStreams: Record<string, string> = {
            'english-aac': 'https://ewtn-ice.streamguys1.com/english-aac',
            'classics-aac': 'https://ewtn-ice.streamguys1.com/classics-aac',
            'sky-aac': 'https://ewtn-ice.streamguys1.com/sky-aac',
            'philippines-aac': 'https://ewtn-ice.streamguys1.com/philippines-aac',
            'spanish-aac': 'https://ewtn-ice.streamguys1.com/spanish-aac'
          };
          const streamKey = urlObj.searchParams.get('stream') || 'english-aac';
          const targetUrl = allowedStreams[streamKey] || allowedStreams['english-aac'];

          const upstream = await fetch(targetUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
              'Accept': '*/*'
            }
          });

          if (!upstream.ok || !upstream.body) {
            res.statusCode = 502;
            res.end('Upstream radio error');
            return;
          }

          res.setHeader('Content-Type', upstream.headers.get('content-type') || 'audio/aacp');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Cache-Control', 'no-cache, no-store');

          const reader = upstream.body.getReader();
          req.on('close', () => {
            reader.cancel().catch(() => {});
          });

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            if (!res.writableEnded) {
              res.write(Buffer.from(value));
            } else {
              break;
            }
          }
          if (!res.writableEnded) res.end();
        } catch {
          if (!res.writableEnded) {
            res.statusCode = 502;
            res.end();
          }
        }
      });

      server.middlewares.use('/api/christendom-videos', async (_req: any, res: any) => {
        try {
          const channelConfigs = [
            {
              id: 'ch-christendom',
              ytChannelId: 'UC_xCst3mv8PQslyRtfOkMGQ',
              name: 'Christendom College & Media',
              avatarUrl: 'https://yt3.googleusercontent.com/ytc/AIdro_lse_d8k2NYELKQE-5cu2m5vRt5ikYvw1Q_74LaZkg=s176-c-k-c0x00ffffff-no-rj',
              defaultCategory: 'Apologetics & Culture',
              fallbackImageUrl: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200&q=80'
            },
            {
              id: 'ch-wordonfire',
              ytChannelId: 'UCcMjLgeWNwqL2LBGS-iPb1A',
              name: 'Word on Fire (Bishop Barron)',
              avatarUrl: 'https://yt3.googleusercontent.com/yjqfvu6ZX2QWSqczNIi3sbN6224_O62eAFob7uLgomGEVG6es2Tc3i_RNjAa4TbJfrceWuHw8Q=s176-c-k-c0x00ffffff-no-rj',
              defaultCategory: 'Theology & Homilies',
              fallbackImageUrl: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=1200&q=80'
            },
            {
              id: 'ch-ascension',
              ytChannelId: 'UCVdGX3N-WIJ5nUvklBTNhAw',
              name: 'Ascension Presents',
              avatarUrl: 'https://yt3.googleusercontent.com/2mhKBivLUIgeKbZ70A7z-rv3DX-KSZsxL5UPSF8CvkKQ_TAITqgarHM2eCXbtgza1vYy_VAI=s176-c-k-c0x00ffffff-no-rj',
              defaultCategory: 'Theology & Homilies',
              fallbackImageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80'
            },
            {
              id: 'ch-stpaulcenter',
              ytChannelId: 'UCBr-aH7rulKvlRdSM2Zz_mQ',
              name: 'St. Paul Center (Dr. Scott Hahn)',
              avatarUrl: 'https://yt3.googleusercontent.com/eYpoPbiU611IXhHWGo5-5kUboJkA1CPWRNSMDbcxLfKLU4YAEHRdPHpdORnlfLsRc227-3PPBZc=s176-c-k-c0x00ffffff-no-rj',
              defaultCategory: 'Sacred Scripture',
              fallbackImageUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1200&q=80'
            },
            {
              id: 'ch-catholicanswers',
              ytChannelId: 'UCvwbLBTkuIwqNm9kHUqWRnw',
              name: 'Catholic Answers Live',
              avatarUrl: 'https://yt3.googleusercontent.com/ytc/AIdro_mVshmYIBh_5n_6zbctv3onmWbDUQo6polUcPZjL1Y=s176-c-k-c0x00ffffff-no-rj',
              defaultCategory: 'Apologetics & Culture',
              fallbackImageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80'
            },
            {
              id: 'ch-augustine',
              ytChannelId: 'UCViR8Uk46_06QjqkTNlVu2Q',
              name: 'Augustine Institute & FORMED',
              avatarUrl: 'https://yt3.googleusercontent.com/c8SAvU-uBojeQEEDkeOs1qbntDhnJ6tY_brmG-8USjn6LNdlKza3OKLSZS2OqT5ciM_cczmj59I=s176-c-k-c0x00ffffff-no-rj',
              defaultCategory: 'Sacred Scripture',
              fallbackImageUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1200&q=80'
            },
            {
              id: 'ch-icc',
              ytChannelId: 'UCrkyDHc586jpfgPPQCZidwA',
              name: 'Institute of Catholic Culture',
              avatarUrl: 'https://yt3.googleusercontent.com/ytc/AIdro_kLo4Wzqbjkld4929HovTthbN0CUMEwQXH2ODvq1ZBmKg=s176-c-k-c0x00ffffff-no-rj',
              defaultCategory: 'Church History',
              fallbackImageUrl: 'https://images.unsplash.com/photo-1548625361-1959779df3a8?auto=format&fit=crop&w=1200&q=80'
            },
            {
              id: 'ch-ewtn',
              ytChannelId: 'UCijDos-LUTh9RQvSCMQqN6Q',
              name: 'EWTN Global Catholic Network',
              avatarUrl: 'https://yt3.googleusercontent.com/aXMeNbOffojVIm0uqTNEUMzmHtA5YxiLzzuj7gAwbuVdsIcv1jx5tkUfMWEEMte4eKT1hasUbJY=s176-c-k-c0x00ffffff-no-rj',
              defaultCategory: 'Sacred Liturgy & Chant',
              fallbackImageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80'
            }
          ];

          const decodeXml = (str: string) =>
            str
              .replace(/&amp;/g, '&')
              .replace(/&quot;/g, '"')
              .replace(/&#39;|&apos;/g, "'")
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>');

          const inferCategory = (title: string, desc: string, fallback: string) => {
            const combined = `${title} ${desc}`.toLowerCase();
            if (/mass|liturgy|chant|adoration|rosary|chaplet|vespers|benediction|eucharist/.test(combined)) {
              return 'Sacred Liturgy & Chant';
            }
            if (/bible|scripture|gospel|psalm|genesis|exodus|revelation|paul|testament|covenant/.test(combined)) {
              return 'Sacred Scripture';
            }
            if (/history|council|fathers|century|medieval|crusade|reformation|martyr|empire|tradition/.test(combined)) {
              return 'Church History';
            }
            if (/documentary|film|episode|journey|story of|biography/.test(combined)) {
              return 'Documentaries';
            }
            if (/apologetics|atheis|protestant|culture|debate|question|why do catholics|defend/.test(combined)) {
              return 'Apologetics & Culture';
            }
            if (/homily|sermon|theology|aquinas|grace|prayer|virtue|sin|holiness|spiritual/.test(combined)) {
              return 'Theology & Homilies';
            }
            return fallback;
          };

          const formatCount = (n: number) => {
            if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
            if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
            return String(n);
          };

          const results = await Promise.all(
            channelConfigs.map(async ch => {
              try {
                const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${ch.ytChannelId}&_t=${Date.now()}`;
                const resp = await fetch(feedUrl, {
                  headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
                    'Cache-Control': 'no-cache, no-store, must-revalidate'
                  },
                  signal: AbortSignal.timeout(6500)
                });
                if (!resp.ok) return [];
                const xml = await resp.text();
                const entries = Array.from(xml.matchAll(/<entry>([\s\S]*?)<\/entry>/gi)).slice(0, 6);
                return entries.map((match, idx) => {
                  const block = match[1];
                  const videoId = ((block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/i) || [])[1] || '').trim();
                  const rawTitle = ((block.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] || '').trim();
                  const publishedRaw = ((block.match(/<published>([^<]+)<\/published>/i) || [])[1] || '').trim();
                  const rawDesc = ((block.match(/<media:description>([\s\S]*?)<\/media:description>/i) || [])[1] || '').trim();
                  const viewsAttr = ((block.match(/<media:statistics[^>]+views=["'](\d+)["']/i) || [])[1] || '0');
                  const starCountAttr = ((block.match(/<media:starRating[^>]+count=["'](\d+)["']/i) || [])[1] || '0');

                  const title = decodeXml(rawTitle);
                  const cleanDesc = decodeXml(rawDesc)
                    .replace(/https?:\/\/\S+/g, '')
                    .replace(/\s+/g, ' ')
                    .trim()
                    .slice(0, 320);

                  const viewsNum = parseInt(viewsAttr, 10) || 1200;
                  const likesNum = parseInt(starCountAttr, 10) || Math.max(45, Math.round(viewsNum * 0.06));
                  const pubDate = publishedRaw ? new Date(publishedRaw) : new Date();
                  const pubLabel = !isNaN(pubDate.getTime())
                    ? pubDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                    : ch.name;

                  return {
                    id: `yt-${ch.id}-${videoId || idx}`,
                    title,
                    channelId: ch.id,
                    channelName: ch.name,
                    channelAvatar: ch.avatarUrl,
                    youtubeId: videoId,
                    duration: 'Live Feed',
                    views: `${formatCount(viewsNum)} views`,
                    publishedAt: pubLabel,
                    publishedTimestamp: !isNaN(pubDate.getTime()) ? pubDate.getTime() : 0,
                    category: inferCategory(title, cleanDesc, ch.defaultCategory),
                    description: cleanDesc || `${title} — Presented by ${ch.name}.`,
                    thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
                    fallbackImageUrl: ch.fallbackImageUrl,
                    verified: true,
                    likes: formatCount(likesNum),
                    christendomUrl: `https://www.youtube.com/watch?v=${videoId}`
                  };
                }).filter(v => !!v.youtubeId);
              } catch {
                return [];
              }
            })
          );

          const flatVideos = results.flat();
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
          res.end(
            JSON.stringify({
              fetchedAt: Date.now(),
              videos: flatVideos
            })
          );
        } catch (err: any) {
          res.statusCode = 502;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err.message, videos: [] }));
        }
      });

      const sacredBibleBookCache = new Map<string, string>();

      const SACRED_BIBLE_EN_FILES: Record<string, string> = {
        GEN: 'OT-01_Genesis.htm', EXO: 'OT-02_Exodus.htm', LEV: 'OT-03_Leviticus.htm', NUM: 'OT-04_Numbers.htm', DEU: 'OT-05_Deuteronomy.htm',
        JOS: 'OT-06_Joshua.htm', JDG: 'OT-07_Judges.htm', RUT: 'OT-08_Ruth.htm', '1SA': 'OT-09_1-Samuel.htm', '2SA': 'OT-10_2-Samuel.htm',
        '1KI': 'OT-11_1-Kings.htm', '2KI': 'OT-12_2-Kings.htm', '1CH': 'OT-13_1-Chronicles.htm', '2CH': 'OT-14_2-Chronicles.htm',
        EZR: 'OT-15_Ezra.htm', NEH: 'OT-16_Nehemiah.htm', TOB: 'OT-17_Tobit.htm', JDT: 'OT-18_Judith.htm', EST: 'OT-19_Esther.htm',
        JOB: 'OT-20_Job.htm', PSA: 'OT-21_Psalms.htm', PRO: 'OT-22_Proverbs.htm', ECC: 'OT-23_Ecclesiastes.htm', SNG: 'OT-24_Song.htm',
        WIS: 'OT-25_Wisdom.htm', SIR: 'OT-26_Sirach.htm', ISA: 'OT-27_Isaiah.htm', JER: 'OT-28_Jeremiah.htm', LAM: 'OT-29_Lamentations.htm',
        BAR: 'OT-30_Baruch.htm', EZK: 'OT-31_Ezekiel.htm', DAN: 'OT-32_Daniel.htm', HOS: 'OT-33_Hosea.htm', JOL: 'OT-34_Joel.htm',
        AMO: 'OT-35_Amos.htm', OBA: 'OT-36_Obadiah.htm', JON: 'OT-37_Jonah.htm', MIC: 'OT-38_Micah.htm', NAH: 'OT-39_Nahum.htm',
        HAB: 'OT-40_Habakkuk.htm', ZEP: 'OT-41_Zephaniah.htm', HAG: 'OT-42_Haggai.htm', ZEC: 'OT-43_Zechariah.htm', MAL: 'OT-44_Malachi.htm',
        '1MA': 'OT-45_1-Maccabees.htm', '2MA': 'OT-46_2-Maccabees.htm',
        MAT: 'NT-01_Matthew.htm', MRK: 'NT-02_Mark.htm', LUK: 'NT-03_Luke.htm', JHN: 'NT-04_John.htm', ACT: 'NT-05_Acts.htm',
        ROM: 'NT-06_Romans.htm', '1CO': 'NT-07_1-Corinthians.htm', '2CO': 'NT-08_2-Corinthians.htm', GAL: 'NT-09_Galatians.htm',
        EPH: 'NT-10_Ephesians.htm', PHP: 'NT-11_Philippians.htm', COL: 'NT-12_Colossians.htm', '1TH': 'NT-13_1-Thessalonians.htm',
        '2TH': 'NT-14_2-Thessalonians.htm', '1TI': 'NT-15_1-Timothy.htm', '2TI': 'NT-16_2-Timothy.htm', TIT: 'NT-17_Titus.htm',
        PHM: 'NT-18_Philemon.htm', HEB: 'NT-19_Hebrews.htm', JAS: 'NT-20_James.htm', '1PE': 'NT-21_1-Peter.htm', '2PE': 'NT-22_2-Peter.htm',
        '1JN': 'NT-23_1-John.htm', '2JN': 'NT-24_2-John.htm', '3JN': 'NT-25_3-John.htm', JUD: 'NT-26_Jude.htm', REV: 'NT-27_Revelation.htm'
      };

      const SACRED_BIBLE_LA_FILES: Record<string, string> = {
        GEN: 'VT-01_Genesis.htm', EXO: 'VT-02_Exodus.htm', LEV: 'VT-03_Leviticus.htm', NUM: 'VT-04_Numeri.htm', DEU: 'VT-05_Deuteronomium.htm',
        JOS: 'VT-06_Josue.htm', JDG: 'VT-07_Judices.htm', RUT: 'VT-08_Ruth.htm', '1SA': 'VT-09_1-Samuel.htm', '2SA': 'VT-10_2-Samuel.htm',
        '1KI': 'VT-11_1-Reges.htm', '2KI': 'VT-12_2-Reges.htm', '1CH': 'VT-13_1-Paralipomenon.htm', '2CH': 'VT-14_2-Paralipomenon.htm',
        EZR: 'VT-15_Esdras.htm', NEH: 'VT-16_Nehemias.htm', TOB: 'VT-17_Tobias.htm', JDT: 'VT-18_Judith.htm', EST: 'VT-19_Esther.htm',
        JOB: 'VT-20_Job.htm', PSA: 'VT-21_Psalmi.htm', PRO: 'VT-22_Proverbia.htm', ECC: 'VT-23_Ecclesiastes.htm', SNG: 'VT-24_Canticum.htm',
        WIS: 'VT-25_Sapientia.htm', SIR: 'VT-26_Ecclesiasticus.htm', ISA: 'VT-27_Isaias.htm', JER: 'VT-28_Jeremias.htm', LAM: 'VT-29_Lamentationes.htm',
        BAR: 'VT-30_Baruch.htm', EZK: 'VT-31_Ezechiel.htm', DAN: 'VT-32_Daniel.htm', HOS: 'VT-33_Osee.htm', JOL: 'VT-34_Joel.htm',
        AMO: 'VT-35_Amos.htm', OBA: 'VT-36_Abdias.htm', JON: 'VT-37_Jonas.htm', MIC: 'VT-38_Michaeas.htm', NAH: 'VT-39_Nahum.htm',
        HAB: 'VT-40_Habacuc.htm', ZEP: 'VT-41_Sophonias.htm', HAG: 'VT-42_Aggaeus.htm', ZEC: 'VT-43_Zacharias.htm', MAL: 'VT-44_Malachias.htm',
        '1MA': 'VT-45_1-Machabaeus.htm', '2MA': 'VT-46_2-Machabaeus.htm',
        MAT: 'NT-01_Matthaeus.htm', MRK: 'NT-02_Marcus.htm', LUK: 'NT-03_Lucas.htm', JHN: 'NT-04_Joannes.htm', ACT: 'NT-05_Actus.htm',
        ROM: 'NT-06_Romani.htm', '1CO': 'NT-07_1-Corinthii.htm', '2CO': 'NT-08_2-Corinthii.htm', GAL: 'NT-09_Galatae.htm',
        EPH: 'NT-10_Ephesii.htm', PHP: 'NT-11_Philippenses.htm', COL: 'NT-12_Colossenses.htm', '1TH': 'NT-13_1-Thessalonicenses.htm',
        '2TH': 'NT-14_2-Thessalonicenses.htm', '1TI': 'NT-15_1-Timotheus.htm', '2TI': 'NT-16_2-Timotheus.htm', TIT: 'NT-17_Titus.htm',
        PHM: 'NT-18_Philemon.htm', HEB: 'NT-19_Hebraei.htm', JAS: 'NT-20_Jacobus.htm', '1PE': 'NT-21_1-Petrus.htm', '2PE': 'NT-22_2-Petrus.htm',
        '1JN': 'NT-23_1-Joannes.htm', '2JN': 'NT-24_2-Joannes.htm', '3JN': 'NT-25_3-Joannes.htm', JUD: 'NT-26_Judas.htm', REV: 'NT-27_Apocalypsis.htm'
      };

      const WLDEH_BOOK_SLUGS: Record<string, string> = {
        GEN: 'genesis', EXO: 'exodus', LEV: 'leviticus', NUM: 'numbers', DEU: 'deuteronomy',
        JOS: 'joshua', JDG: 'judges', RUT: 'ruth', '1SA': '1samuel', '2SA': '2samuel',
        '1KI': '1kings', '2KI': '2kings', '1CH': '1chronicles', '2CH': '2chronicles',
        EZR: 'ezra', NEH: 'nehemiah', TOB: 'tobit', JDT: 'judith', EST: 'esther',
        JOB: 'job', PSA: 'psalms', PRO: 'proverbs', ECC: 'ecclesiastes', SNG: 'songofsolomon',
        WIS: 'wisdom', SIR: 'sirach', ISA: 'isaiah', JER: 'jeremiah', LAM: 'lamentations',
        BAR: 'baruch', EZK: 'ezekiel', DAN: 'daniel', HOS: 'hosea', JOL: 'joel',
        AMO: 'amos', OBA: 'obadiah', JON: 'jonah', MIC: 'micah', NAH: 'nahum',
        HAB: 'habakkuk', ZEP: 'zephaniah', HAG: 'haggai', ZEC: 'zechariah', MAL: 'malachi',
        '1MA': '1maccabees', '2MA': '2maccabees',
        MAT: 'matthew', MRK: 'mark', LUK: 'luke', JHN: 'john', ACT: 'acts',
        ROM: 'romans', '1CO': '1corinthians', '2CO': '2corinthians', GAL: 'galatians',
        EPH: 'ephesians', PHP: 'philippians', COL: 'colossians', '1TH': '1thessalonians',
        '2TH': '2thessalonians', '1TI': '1timothy', '2TI': '2timothy', TIT: 'titus',
        PHM: 'philemon', HEB: 'hebrews', JAS: 'james', '1PE': '1peter', '2PE': '2peter',
        '1JN': '1john', '2JN': '2john', '3JN': '3john', JUD: 'jude', REV: 'revelation'
      };

      server.middlewares.use('/api/catholic-bible', async (req: any, res: any) => {
        try {
          const urlObj = new URL(req.url || '', 'http://localhost');
          const bookId = (urlObj.searchParams.get('bookId') || 'GEN').toUpperCase();
          const bookName = urlObj.searchParams.get('bookName') || 'Genesis';
          const chapter = Math.max(1, parseInt(urlObj.searchParams.get('chapter') || '1', 10));
          const translation = (urlObj.searchParams.get('translation') || 'drc').toLowerCase();

          const decodeHtml = (raw: string) =>
            raw
              .replace(/<[^>]+>/g, ' ')
              .replace(/&nbsp;|&#160;/g, ' ')
              .replace(/&quot;|&#34;/g, '"')
              .replace(/&apos;|&#39;/g, "'")
              .replace(/&amp;/g, '&')
              .replace(/&lt;/g, '<')
              .replace(/&gt;/g, '>')
              .replace(/\s+/g, ' ')
              .trim();

          let verses: { verse: number; text: string }[] = [];
          let sourceLabel = 'Catholic Public Domain Scripture Repository';

          const parseSacredBibleChapter = async (
            editionDir: 'challoner' | 'catholic' | 'vulgate2009',
            fileKey: string,
            targetChapter: number
          ): Promise<{ verse: number; text: string }[]> => {
            const cacheKey = `${editionDir}:${fileKey}`;
            let html = sacredBibleBookCache.get(cacheKey);
            if (!html) {
              const targetUrl = `https://sacredbible.org/${editionDir}/${fileKey}`;
              const resp = await fetch(targetUrl, {
                headers: {
                  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) SoulSanctumCatholicBible/1.0'
                },
                signal: AbortSignal.timeout(8000)
              });
              if (resp.ok) {
                const buf = await resp.arrayBuffer();
                html = new TextDecoder('windows-1252').decode(buf);
                sacredBibleBookCache.set(cacheKey, html);
              }
            }
            if (!html) return [];

            const parsed: { verse: number; text: string }[] = [];
            const pattern = new RegExp(`\\{${targetChapter}:(\\d+)\\}\\s*([\\s\\S]*?)(?=<BR>|\\{\\d+:\\d+\\}|</FONT>|</BODY>)`, 'gi');
            let m: RegExpExecArray | null;
            while ((m = pattern.exec(html)) !== null) {
              const vNum = parseInt(m[1], 10);
              const vText = decodeHtml(m[2]);
              if (vNum > 0 && vText) {
                parsed.push({ verse: vNum, text: vText });
              }
            }
            return parsed;
          };

          let explanatoryNotes: { verse: number; note: string }[] = [];
          try {
            const notesJsonPath = path.join(__dirname, 'public', 'bibles', 'notes', `${bookId}.json`);
            if (fs.existsSync(notesJsonPath)) {
              const rawNotes = fs.readFileSync(notesJsonPath, 'utf-8');
              const bookNotes = JSON.parse(rawNotes);
              if (Array.isArray(bookNotes[String(chapter)])) {
                explanatoryNotes = bookNotes[String(chapter)];
              }
            }
          } catch {
            // Ignore notes read error
          }

          // 0. Instant local 73-book archive lookup for all 4 translations ('drc', 'cpdv', 'webbe', 'vulgate')
          if (
            translation === 'drc' ||
            translation === 'cpdv' ||
            translation === 'webbe' ||
            translation === 'vulgate'
          ) {
            try {
              const localJsonPath = path.join(__dirname, 'public', 'bibles', translation, `${bookId}.json`);
              if (fs.existsSync(localJsonPath)) {
                const rawJson = fs.readFileSync(localJsonPath, 'utf-8');
                const bookChapters = JSON.parse(rawJson);
                const chVerses = bookChapters[String(chapter)];
                if (Array.isArray(chVerses) && chVerses.length > 0) {
                  verses = chVerses;
                  sourceLabel =
                    translation === 'cpdv'
                      ? 'Catholic Public Domain Version (CPDV)'
                      : translation === 'vulgate'
                      ? 'Vulgata Clementina (Clementine Latin Vulgate)'
                      : translation === 'webbe'
                      ? 'World English Bible — Catholic Edition (WEB-CE)'
                      : 'Douay-Rheims Catholic Bible (Challoner Revision)';
                }
              }
            } catch {
              // Fall through to remote SacredBible archive
            }
          }

          // 1. Remote fallback for DRC ('drc'), CPDV ('cpdv'), and Clementine Vulgate ('vulgate') from SacredBible.org
          if (verses.length === 0 && (translation === 'drc' || translation === 'cpdv' || translation === 'vulgate')) {
            try {
              const editionDir =
                translation === 'cpdv'
                  ? 'catholic'
                  : translation === 'vulgate'
                  ? 'vulgate2009'
                  : 'challoner';
              const fileName =
                translation === 'vulgate'
                  ? SACRED_BIBLE_LA_FILES[bookId]
                  : SACRED_BIBLE_EN_FILES[bookId];

              if (fileName) {
                verses = await parseSacredBibleChapter(editionDir, fileName, chapter);
                if (verses.length > 0) {
                  sourceLabel =
                    translation === 'cpdv'
                      ? 'Catholic Public Domain Version (CPDV)'
                      : translation === 'vulgate'
                      ? 'Vulgata Clementina (Clementine Latin Vulgate)'
                      : 'Douay-Rheims Catholic Bible (Challoner Revision)';
                }
              }
            } catch {
              // Fall through
            }
          }

          // 2. For WEB-CE ('webbe') or DRC ('drc') fallback, use jsDelivr CDN (wldeh/bible-api)
          if (verses.length === 0 && (translation === 'webbe' || translation === 'drc')) {
            const wldehSlug = WLDEH_BOOK_SLUGS[bookId];
            const wldehVersion = translation === 'webbe' ? 'en-webbe' : 'en-dra';
            if (wldehSlug) {
              try {
                const cdnUrl = `https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/${wldehVersion}/books/${wldehSlug}/chapters/${chapter}.json`;
                const cdnResp = await fetch(cdnUrl, { signal: AbortSignal.timeout(6500) });
                if (cdnResp.ok) {
                  const cdnData: any = await cdnResp.json();
                  if (Array.isArray(cdnData?.data) && cdnData.data.length > 0) {
                    const seenVerses = new Map<number, string>();
                    for (const item of cdnData.data) {
                      const vNum = parseInt(String(item.verse), 10);
                      const vText = String(item.text || '').replace(/\s+/g, ' ').trim();
                      if (vNum > 0 && vText && !seenVerses.has(vNum)) {
                        seenVerses.set(vNum, vText);
                      }
                    }
                    verses = Array.from(seenVerses.entries())
                      .sort((a, b) => a[0] - b[0])
                      .map(([verse, text]) => ({ verse, text }));
                    sourceLabel =
                      wldehVersion === 'en-webbe'
                        ? 'World English Bible — Catholic Edition (WEB-CE)'
                        : 'Douay-Rheims Catholic Bible';
                  }
                }
              } catch {
                // Fall through
              }
            }
          }

          // 3. If WEB-CE was requested on a book where wldeh slug differed, fallback to SacredBible CPDV
          if (verses.length === 0 && SACRED_BIBLE_EN_FILES[bookId]) {
            try {
              verses = await parseSacredBibleChapter('catholic', SACRED_BIBLE_EN_FILES[bookId], chapter);
              sourceLabel = 'Catholic Public Domain Version (CPDV)';
            } catch {
              // Fall through
            }
          }

          // 4. Final fallback to bible-api.com
          if (verses.length === 0) {
            try {
              const queryRef = encodeURIComponent(`${bookName} ${chapter}`);
              const fallbackUrl = `https://bible-api.com/${queryRef}?translation=dra`;
              const resp = await fetch(fallbackUrl, { signal: AbortSignal.timeout(5000) });
              if (resp.ok) {
                const data: any = await resp.json();
                if (Array.isArray(data?.verses) && data.verses.length > 0) {
                  verses = data.verses.map((v: any, i: number) => ({
                    verse: Number(v.verse) || i + 1,
                    text: String(v.text || '').replace(/\s+/g, ' ').trim()
                  }));
                  sourceLabel = 'Douay-Rheims Catholic Bible (Challoner)';
                }
              }
            } catch {
              // Ignore
            }
          }

          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(
            JSON.stringify({
              bookId,
              chapter,
              translation,
              sourceLabel,
              verses,
              explanatoryNotes
            })
          );
        } catch (err: any) {
          res.statusCode = 502;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err.message, verses: [] }));
        }
      });
    }
  };
}

export default defineConfig(() => {
  return {
    base: '/',
    plugins: [
      react(),
      tailwindcss(),
      vaticanNewsPlugin()
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    },
  };
});

