import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT =
  process.env.PORT && process.env.PORT !== '8080'
    ? Number(process.env.PORT)
    : Number(process.env.DEFAULT_APP_PORT || 3000);
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

function getGenAI(apiVersion?: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured in the environment.');
  }
  return new GoogleGenAI({
    apiKey,
    ...(apiVersion ? { apiVersion } : {}),
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

import OpenAI from 'openai';

import { searchCatholicInternet, WebResearchSource } from './src/utils/catholicInternetResearch.js';

app.get('/api/catholic-ai/health', (_req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
    hasOpenAIKey: !!process.env.OPENAI_API_KEY,
    supportedProviders: ['gemini', 'openai', 'magisterium', 'auto'],
    supportedAiTtsVoices: ['Puck', 'Charon', 'Kore', 'Fenrir', 'Zephyr'],
  });
});

function wrapPcm24kMonoToWav(pcmBuffer: Buffer, sampleRate: number = 24000): Buffer {
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataSize = pcmBuffer.length;
  const header = Buffer.alloc(44);

  header.write('RIFF', 0);
  header.writeUInt32LE(36 + dataSize, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16); // PCM chunk size
  header.writeUInt16LE(1, 20);  // Audio format 1 = PCM
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write('data', 36);
  header.writeUInt32LE(dataSize, 40);

  return Buffer.concat([header, pcmBuffer]);
}

const ttsMemoryCache = new Map<string, { audioUrl: string; provider: string; voiceName: string }>();

// Dedicated Gemini AI Text-to-Speech Endpoint with robust model handling and Web Speech fallback
function splitTextIntoSentences(text: string, maxChunkLen: number = 200): string[] {
  const clean = text.replace(/<[^>]*>/g, '').replace(/[*_#]/g, '').trim();
  if (clean.length <= maxChunkLen) return [clean];

  const rawSegments = clean.split(/(?<=[.!?])\s+/);
  const chunks: string[] = [];
  let currentChunk = '';

  for (const seg of rawSegments) {
    if ((currentChunk + ' ' + seg).trim().length <= maxChunkLen) {
      currentChunk = (currentChunk + ' ' + seg).trim();
    } else {
      if (currentChunk) chunks.push(currentChunk);
      if (seg.length > maxChunkLen) {
        const clauses = seg.split(/(?<=[,;:—–])\s+/);
        let clauseChunk = '';
        for (const c of clauses) {
          if ((clauseChunk + ' ' + c).trim().length <= maxChunkLen) {
            clauseChunk = (clauseChunk + ' ' + c).trim();
          } else {
            if (clauseChunk) chunks.push(clauseChunk);
            clauseChunk = c.slice(0, maxChunkLen);
          }
        }
        if (clauseChunk) chunks.push(clauseChunk);
        currentChunk = '';
      } else {
        currentChunk = seg;
      }
    }
  }
  if (currentChunk) chunks.push(currentChunk);
  return chunks.filter(c => c.length > 0);
}

function resolveGeminiPrebuiltVoice(chosenVoice: string): 'Kore' | 'Puck' | 'Charon' | 'Fenrir' | 'Zephyr' {
  const validPrebuiltVoices = ['Puck', 'Charon', 'Kore', 'Fenrir', 'Zephyr'] as const;
  const cleanVoiceName = (chosenVoice || 'Kore').replace(/^gemini-/, '');
  if ((validPrebuiltVoices as readonly string[]).includes(cleanVoiceName)) {
    return cleanVoiceName as 'Kore' | 'Puck' | 'Charon' | 'Fenrir' | 'Zephyr';
  }
  const lower = chosenVoice.toLowerCase();
  if (
    lower.includes('charon') ||
    lower.includes('jerome') ||
    lower.includes('augustine') ||
    lower.includes('cyril') ||
    lower.includes('bellarmine') ||
    lower.includes('david') ||
    lower.includes('gospel') ||
    lower === 'male'
  ) {
    return 'Charon';
  }
  if (
    lower.includes('fenrir') ||
    lower.includes('thomas') ||
    lower.includes('basil') ||
    lower.includes('gregory') ||
    lower.includes('alphonsus') ||
    lower.includes('albert')
  ) {
    return 'Fenrir';
  }
  if (
    lower.includes('puck') ||
    lower.includes('chrysostom') ||
    lower.includes('bonaventure') ||
    lower.includes('lapide')
  ) {
    return 'Puck';
  }
  if (
    lower.includes('zephyr') ||
    lower.includes('bede') ||
    lower.includes('ambrose') ||
    lower.includes('theophylact') ||
    lower.includes('sonia')
  ) {
    return 'Zephyr';
  }
  return 'Kore';
}

// Dedicated Gemini 3.8 AI & Multi-Voice Text-to-Speech Endpoint
app.post('/api/tts', async (req, res) => {
  try {
    const { text, voiceName = 'gemini-Kore', apiKey } = req.body || {};
    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ error: 'Text prompt is required for TTS.' });
    }

    const chosenVoice = voiceName || 'gemini-Kore';
    const cleanText = text.replace(/<[^>]*>/g, '').replace(/[*_#]/g, '').trim();
    const targetPrebuiltVoice = resolveGeminiPrebuiltVoice(chosenVoice);
    const cacheKey = `${targetPrebuiltVoice}:${apiKey ? 'custom' : 'default'}:${cleanText.slice(0, 1800)}`;

    const cached = ttsMemoryCache.get(cacheKey);
    if (cached) {
      return res.json(cached);
    }

    // 1. Primary: Official Gemini 3.8 TTS ('gemini-3.8-flash-lite-tts' with 'Kore', 'Charon', 'Puck', 'Fenrir', 'Zephyr')
    if (process.env.GEMINI_API_KEY && !apiKey) {
      const ai = getGenAI('v1beta');
      const ttsModels = ['gemini-3.8-flash-lite-tts', 'gemini-2.5-flash-preview-tts'];

      for (const modelName of ttsModels) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: cleanText.slice(0, 1800),
                  },
                ],
              },
            ],
            config: {
              responseModalities: ['AUDIO'],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: {
                    voiceName: targetPrebuiltVoice,
                  },
                },
              },
            },
          });

          const partData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData;
          if (partData?.data) {
            const rawMime = (partData.mimeType || 'audio/wav').toLowerCase();
            let audioUrl = '';

            if (rawMime.includes('l16') || rawMime.includes('pcm')) {
              const pcmBuffer = Buffer.from(partData.data, 'base64');
              const wavBuffer = wrapPcm24kMonoToWav(pcmBuffer, 24000);
              audioUrl = `data:audio/wav;base64,${wavBuffer.toString('base64')}`;
            } else {
              audioUrl = `data:${partData.mimeType || 'audio/wav'};base64,${partData.data}`;
            }

            const payload = {
              audioUrl,
              voiceName: `gemini-${targetPrebuiltVoice}`,
              provider: `gemini-tts-${targetPrebuiltVoice}`,
            };

            if (ttsMemoryCache.size > 150) {
              const oldestKey = ttsMemoryCache.keys().next().value;
              if (oldestKey) ttsMemoryCache.delete(oldestKey);
            }
            ttsMemoryCache.set(cacheKey, payload);

            return res.json(payload);
          }
        } catch (err: any) {
          console.warn(`[TTS] ${modelName} (${targetPrebuiltVoice}) skipped:`, err?.message || err);
        }
      }
    }

    // 2. Secondary: OpenAI Neural Text-to-Speech (tts-1) if key is available
    const openAiKey = apiKey || process.env.OPENAI_API_KEY;
    if (openAiKey) {
      try {
        const openai = new OpenAI({ apiKey: openAiKey });
        const voiceMap: Record<string, 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer'> = {
          Kore: 'shimmer',
          Puck: 'alloy',
          Charon: 'onyx',
          Fenrir: 'echo',
          Zephyr: 'fable',
        };

        const targetVoice = voiceMap[targetPrebuiltVoice] || 'shimmer';
        const isDeepVoice = targetVoice === 'onyx';

        const mp3Response = await openai.audio.speech.create({
          model: 'tts-1',
          voice: targetVoice,
          input: cleanText.slice(0, 2000),
          speed: isDeepVoice ? 0.88 : 0.95,
        });

        const buffer = Buffer.from(await mp3Response.arrayBuffer());
        const base64Audio = buffer.toString('base64');
        const payload = {
          audioUrl: `data:audio/mp3;base64,${base64Audio}`,
          voiceName: chosenVoice,
          provider: 'openai-tts',
        };
        ttsMemoryCache.set(cacheKey, payload);
        return res.json(payload);
      } catch (err: any) {
        console.warn('[TTS] OpenAI Neural TTS skipped:', err?.message || err);
      }
    }

    // 3. Tertiary: Fast Parallel Multi-Regional Neural Speech Synthesis
    try {
      const localeByVoice: Record<string, string> = {
        Kore: 'en-US',
        Puck: 'en-AU',
        Charon: 'en-GB',
        Fenrir: 'en-CA',
        Zephyr: 'en-IE',
      };
      const locale = localeByVoice[targetPrebuiltVoice] || 'en-US';
      const sentences = splitTextIntoSentences(cleanText, 190).slice(0, 20);

      const chunkBuffers = await Promise.all(
        sentences.map(async (chunkText) => {
          const gtUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(chunkText)}&tl=${locale}&client=tw-ob`;
          const gtRes = await fetch(gtUrl, {
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
            },
          });
          if (gtRes.ok) {
            const buf = Buffer.from(await gtRes.arrayBuffer());
            if (buf.length > 300) return buf;
          }
          return null;
        })
      );

      const validBuffers: Uint8Array[] = [];
      for (const b of chunkBuffers) {
        if (b) validBuffers.push(b);
      }
      if (validBuffers.length > 0) {
        const fullAudioBuffer = Buffer.concat(validBuffers);
        const base64Audio = fullAudioBuffer.toString('base64');
        const payload = {
          audioUrl: `data:audio/mp3;base64,${base64Audio}`,
          voiceName: chosenVoice,
          provider: `google-translate-tts-${locale}`,
        };
        ttsMemoryCache.set(cacheKey, payload);
        return res.json(payload);
      }
    } catch (err: any) {
      console.warn('[TTS] Regional TTS proxy skipped:', err?.message || err);
    }

    // 4. Final fallback to Web Speech
    return res.json({ fallbackWebSpeech: true, voiceName: chosenVoice });
  } catch (err: any) {
    console.warn('[TTS] Server TTS fallback:', err?.message || err);
    return res.json({ fallbackWebSpeech: true, voiceName: req.body?.voiceName || 'gemini-Kore' });
  }
});

// Dedicated Catholic Theological AI Research Endpoint (supports both GET query params and POST JSON body)
app.all('/api/catholic-ai', async (req, res) => {
  console.log(`[API] Received ${req.method} /api/catholic-ai request`);
  try {
    let prompt: string | undefined;
    let history: any[] = [];
    let enableWebResearch = true;
    let provider = 'auto'; // 'gemini' | 'openai' | 'magisterium' | 'auto'
    let customApiKey: string | undefined;

    if (req.method === 'GET') {
      prompt = typeof req.query.prompt === 'string' ? req.query.prompt : undefined;
      if (!prompt) {
        return res.json({
          status: 'ok',
          hasGeminiKey: !!process.env.GEMINI_API_KEY,
          hasOpenAIKey: !!process.env.OPENAI_API_KEY,
        });
      }
      if (typeof req.query.enableWebResearch === 'string') {
        enableWebResearch = req.query.enableWebResearch !== 'false';
      }
      if (typeof req.query.provider === 'string') {
        provider = req.query.provider;
      }
      if (typeof req.query.apiKey === 'string' && req.query.apiKey.trim()) {
        customApiKey = req.query.apiKey.trim();
      }
      if (typeof req.query.history === 'string' && req.query.history.trim()) {
        try {
          history = JSON.parse(req.query.history);
        } catch {
          history = [];
        }
      }
    } else {
      const body = req.body || {};
      prompt = body.prompt;
      history = Array.isArray(body.history) ? body.history : [];
      enableWebResearch = body.enableWebResearch !== false;
      provider = body.provider || 'auto';
      customApiKey = typeof body.apiKey === 'string' ? body.apiKey.trim() : undefined;
    }

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

    // Prepare prompt with real-time web research findings
    let promptWithResearch = trimmedPrompt;
    if (webSources.length > 0) {
      const researchSnippets = webSources
        .map((s, idx) => `[Source ${idx + 1}: ${s.title} (${s.url})]\n${s.snippet}`)
        .join('\n\n');

      promptWithResearch = `${trimmedPrompt}\n\n--- REAL-TIME INTERNET RESEARCH FINDINGS ---\n${researchSnippets}\n------------------------------------------\n(Please synthesize the real-time research findings above with authentic Catholic doctrine, Sacred Scripture, CCC citations, and Church Fathers. Mention relevant source links where helpful.)`;
    }

    let reply = '';
    let usedProvider = 'gemini';
    let usedModel = 'gemini-3.1-flash-lite';
    let lastError: any = null;

    // 2. OpenAI (ChatGPT) Execution Path
    const openAiKey = customApiKey || process.env.OPENAI_API_KEY;
    if ((provider === 'openai' || (provider === 'auto' && openAiKey)) && openAiKey) {
      try {
        const openai = new OpenAI({ apiKey: openAiKey });
        const messagesPayload: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
          { role: 'system', content: CATHOLIC_AI_SYSTEM_INSTRUCTION },
        ];

        if (Array.isArray(history)) {
          for (const item of history.slice(-6)) {
            if (item && item.content && typeof item.content === 'string') {
              messagesPayload.push({
                role: item.role === 'assistant' || item.role === 'model' ? 'assistant' : 'user',
                content: item.content,
              });
            }
          }
        }

        messagesPayload.push({ role: 'user', content: promptWithResearch });

        const openAiResponse = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: messagesPayload,
          temperature: 0.4,
          max_tokens: 1800,
        });

        if (openAiResponse.choices?.[0]?.message?.content) {
          reply = openAiResponse.choices[0].message.content;
          usedProvider = 'openai';
          usedModel = 'gpt-4o-mini';
        }
      } catch (err: any) {
        console.warn('OpenAI API call failed, falling back to Gemini:', err?.message || err);
        lastError = err;
      }
    }

    // 3. Google Gemini Execution Path (Default / Fallback)
    if (!reply) {
      const ai = getGenAI();
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

      contents.push({
        role: 'user',
        parts: [{ text: promptWithResearch }],
      });

      const candidateModels = ['gemini-3.1-flash-lite', 'gemini-3.8-flash'];

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
            usedProvider = 'gemini';
            usedModel = modelName;
            break;
          }
        } catch (err: any) {
          console.warn(`Model ${modelName} failed, trying next candidate:`, err?.message || err);
          lastError = err;
        }
      }
    }

    if (!reply && lastError) {
      throw lastError;
    }

    return res.json({
      reply: reply || 'No response generated from the Catholic Assistant.',
      webSources,
      provider: usedProvider,
      model: usedModel,
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
    // In production, serve static build output (Express 5 compatible fallback)
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.use((_req, res) => {
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
