import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import path from 'path';
import { defineConfig } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

