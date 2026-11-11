import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(cors());
app.use(express.json({ limit: '5mb' }));

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

function getGenAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in the environment.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

import { searchCatholicInternet, WebResearchSource } from './src/utils/catholicInternetResearch.js';

app.get('/api/catholic-ai/health', (_req, res) => {
  res.json({ status: 'ok', hasKey: !!process.env.GEMINI_API_KEY });
});

// Dedicated Catholic Theological AI Research Endpoint
app.post('/api/catholic-ai', async (req, res) => {
  console.log('[API] Received /api/catholic-ai request');
  try {
    const { prompt, history = [], enableWebResearch = true } = req.body || {};

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return res.status(400).json({ error: 'A question or prompt is required.' });
    }

    const trimmedPrompt = prompt.trim();

    // 1. Live Internet and Catholic Web Research
    let webSources: WebResearchSource[] = [];
    if (enableWebResearch !== false) {
      try {
        webSources = await searchCatholicInternet(trimmedPrompt);
        console.log(`[Research] Found ${webSources.length} web sources for: "${trimmedPrompt.slice(0, 40)}"`);
      } catch (err) {
        console.warn('[Research] Web search encountered non-critical error:', err);
      }
    }

    const ai = getGenAI();

    // Map conversation history
    const contents: Array<{ role: 'user' | 'model'; parts: Array<{ text: string }> }> = [];

    if (Array.isArray(history)) {
      for (const item of history.slice(-6)) {
        if (item && item.content && typeof item.content === 'string') {
          contents.push({
            role: item.role === 'assistant' || item.role === 'model' ? 'model' : 'user',
            parts: [{ text: item.content }],
          });
        }
      }
    }

    // Augment user prompt with real-time web research findings if available
    let promptWithResearch = trimmedPrompt;
    if (webSources.length > 0) {
      const researchSnippets = webSources
        .map((s, idx) => `[Source ${idx + 1}: ${s.title} (${s.url})]\n${s.snippet}`)
        .join('\n\n');

      promptWithResearch = `${trimmedPrompt}\n\n--- REAL-TIME INTERNET RESEARCH FINDINGS ---\n${researchSnippets}\n------------------------------------------\n(Please synthesize the real-time research findings above with authentic Catholic doctrine, Sacred Scripture, CCC citations, and Church Fathers. Mention relevant source links where helpful.)`;
    }

    contents.push({
      role: 'user',
      parts: [{ text: promptWithResearch }],
    });

    // gemini-3.1-flash-lite provides fast reliable responses; gemini-3.8-flash as fallback
    const candidateModels = ['gemini-3.1-flash-lite', 'gemini-3.8-flash'];
    let reply = '';
    let lastError: any = null;

    for (const modelName of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents,
          config: {
            systemInstruction: CATHOLIC_AI_SYSTEM_INSTRUCTION,
          },
        });
        if (response && response.text) {
          reply = response.text;
          break;
        }
      } catch (err: any) {
        console.warn(`Model ${modelName} failed, trying next candidate:`, err?.message || err);
        lastError = err;
      }
    }

    if (!reply && lastError) {
      throw lastError;
    }

    return res.json({
      reply: reply || 'No response generated from the Catholic Assistant.',
      webSources
    });
  } catch (error: any) {
    console.error('Error in /api/catholic-ai:', error);
    const errorMessage = error?.message || 'An error occurred while consulting the Catholic Assistant.';
    return res.status(500).json({ error: errorMessage });
  }
});

async function startServer() {
  if (!isProd) {
    // In dev, mount Vite middlewares so SPA and all existing Vite plugins (Vatican News, RSS, etc.) run smoothly
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve static build output
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Soul Sanctum Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
