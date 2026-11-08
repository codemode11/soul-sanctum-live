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
          const embedUrl = `https://www.instagram.com/${rawUser}/embed/`;

          const response = await fetch(embedUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1',
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
              'Accept-Language': 'en-US,en;q=0.9'
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

              const mediaList = Array.isArray(ctx.graphql_media) ? ctx.graphql_media : [];
              for (const item of mediaList) {
                const sm = item?.shortcode_media;
                if (!sm || !sm.shortcode) continue;
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
            shortcodes = Array.from(new Set(matches)).slice(0, 6);
          }

          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.end(
            JSON.stringify({
              username: rawUser,
              fullName,
              profilePicUrl,
              followersCount,
              shortcodes,
              posts
            })
          );
        } catch (err: any) {
          res.statusCode = 502;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: err.message, shortcodes: [], posts: [] }));
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

