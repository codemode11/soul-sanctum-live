import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';
import { defineConfig } from 'vite';

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

function vaticanNewsPlugin() {
  return {
    name: 'vatican-news-plugin',
    configureServer(server: any) {
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

