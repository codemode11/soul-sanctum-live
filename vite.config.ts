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
  'cerc': 'https://catholiceducation.org/feed/'
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

