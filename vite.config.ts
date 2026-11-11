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

      server.middlewares.use('/api/catholic-bible', async (req: any, res: any) => {
        try {
          const urlObj = new URL(req.url || '', 'http://localhost');
          const bookId = (urlObj.searchParams.get('bookId') || 'GEN').toUpperCase();
          const bookName = urlObj.searchParams.get('bookName') || 'Genesis';
          const drboCode = urlObj.searchParams.get('drboCode') || '01';
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

          // 1. Try bible-api.com first for DRC ('dra'), WEB-CE ('webbe'), or Latin Vulgate ('clementine')
          const bibleApiTranslationMap: Record<string, string> = {
            drc: 'dra',
            cpdv: 'dra',
            webbe: 'webbe',
            vulgate: 'clementine'
          };
          const apiTrans = bibleApiTranslationMap[translation] || 'dra';

          if (translation !== 'cpdv') {
            try {
              const queryRef = encodeURIComponent(`${bookName} ${chapter}`);
              const apiUrl = `https://bible-api.com/${queryRef}?translation=${apiTrans}`;
              const resp = await fetch(apiUrl, {
                headers: { 'User-Agent': 'SoulSanctumCatholicBible/1.0' },
                signal: AbortSignal.timeout(5500)
              });
              if (resp.ok) {
                const data: any = await resp.json();
                if (Array.isArray(data?.verses) && data.verses.length > 0) {
                  verses = data.verses.map((v: any, i: number) => ({
                    verse: Number(v.verse) || i + 1,
                    text: String(v.text || '').replace(/\s+/g, ' ').trim()
                  }));
                  sourceLabel = data.translation_name || 'Public Domain Catholic Scripture';
                }
              }
            } catch {
              // Fall through to secondary Catholic scripture mirrors
            }
          }

          // 2. If CPDV or Deuterocanonical book not returned by bible-api, fetch from DRBO.org (Douay-Rheims / Vulgate 73-book mirror)
          if (verses.length === 0 && drboCode) {
            try {
              const chapterPadded = String(chapter).padStart(3, '0');
              const drboUrl =
                translation === 'vulgate'
                  ? `https://www.drbo.org/lvb/chapter/${drboCode}${chapterPadded}.htm`
                  : `https://www.drbo.org/chapter/${drboCode}${chapterPadded}.htm`;
              const drboResp = await fetch(drboUrl, {
                headers: {
                  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) SoulSanctumCatholicBible/1.0'
                },
                signal: AbortSignal.timeout(6500)
              });
              if (drboResp.ok) {
                const html = await drboResp.text();
                const parsedVerses: { verse: number; text: string }[] = [];
                const regex = /<a[^>]*name=["']?v?(\d+)["']?[^>]*>[\s\S]*?<\/a>\s*([\s\S]*?)(?=(?:<a[^>]*name=["']?v?\d+|<\/p>|<hr|<div))/gi;
                let match: RegExpExecArray | null;
                while ((match = regex.exec(html)) !== null) {
                  const vNum = parseInt(match[1], 10);
                  const vText = decodeHtml(match[2].replace(/^\[?\d+\]?\s*/, ''));
                  if (vNum > 0 && vText.length > 1) {
                    parsedVerses.push({ verse: vNum, text: vText });
                  }
                }
                if (parsedVerses.length > 0) {
                  verses = parsedVerses;
                  sourceLabel =
                    translation === 'vulgate'
                      ? 'Vulgata Clementina (73-Book Catholic Archive)'
                      : 'Douay-Rheims 73-Book Catholic Archive';
                }
              }
            } catch {
              // Fall through to bible-api fallback
            }
          }

          // 3. Final fallback to bible-api 'dra' or 'webbe' if still empty
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
              verses
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

