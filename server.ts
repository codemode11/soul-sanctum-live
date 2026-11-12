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
0. STRICT QUESTION RELEVANCE (MANDATORY): You MUST answer ONLY, DIRECTLY, and SPECIFICALLY the exact question asked by the user. NEVER provide an answer that is unrelated to the user's question, NEVER change the subject, and NEVER output generic filler. If any retrieved search snippet or background context does not directly address the user's specific question, ignore that snippet completely and answer the user's actual question directly.
1. Ground every answer firmly in the Deposit of Faith: Sacred Scripture, Sacred Tradition, and the living Magisterium of the Catholic Church.
2. Prominently cite the Catechism of the Catholic Church (CCC) with specific paragraph numbers relevant to the user's exact question.
3. Quote and reference Sacred Scripture (using accurate Catholic editions such as NABRE, Douay-Rheims, or RSV-CE) with explicit chapter and verse relevant to the user's question.
4. Reference the Church Fathers and Doctors of the Church where directly relevant to the user's topic.
5. Clearly distinguish the hierarchy of theological certainty (De Fide Dogma, Ordinary and Universal Magisterium, theological schools of thought, and approved private revelations).
6. Tone: Courteous, pastoral, humble, deeply reverent, charitable, lucid, and spiritually uplifting.
7. Formatting: Use structured headers, bulleted doctrinal points, and clear source attributions directly answering the user's question.`;

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

import {
  cleanUserQuestion,
  searchCatholicInternet,
  WebResearchSource,
} from './src/utils/catholicInternetResearch.js';

app.get('/api/catholic-ai/health', (_req, res) => {
  res.json({
    status: 'ok',
    defaultProvider: 'openai',
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
    hasOpenAIKey: !!process.env.OPENAI_API_KEY,
    supportedProviders: ['openai', 'gemini', 'auto'],
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

function resolveRegionalLocaleForVoice(chosenVoice: string): string {
  const localeMap: Record<string, string> = {
    'gemini-Kore': 'en-US',
    Kore: 'en-US',
    'gemini-Puck': 'en-AU',
    Puck: 'en-AU',
    'gemini-Charon': 'en-GB',
    Charon: 'en-GB',
    'gemini-Fenrir': 'en-CA',
    Fenrir: 'en-CA',
    'gemini-Zephyr': 'en-IE',
    Zephyr: 'en-IE',
    'persona-ava': 'en-US',
    'persona-grace': 'en-IE',
    'persona-sonia': 'en-GB',
    'persona-jenny': 'en-CA',
    'persona-clara': 'en-AU',
    'persona-aria': 'en-ZA',
    'persona-samantha': 'en-IN',
    'kokoro-af_heart': 'en-US',
    'kokoro-af_bella': 'en-CA',
    'kokoro-af_sky': 'en-AU',
    'kokoro-bf_emma': 'en-GB',
    'kokoro-am_adam': 'en-US',
    'kokoro-am_michael': 'en-CA',
    'kokoro-bm_george': 'en-GB',
    'kokoro-bm_fable': 'en-IE',
  };

  if (localeMap[chosenVoice]) {
    return localeMap[chosenVoice];
  }

  const lower = (chosenVoice || '').toLowerCase();
  if (lower.includes('augustine') || lower.includes('jerome') || lower.includes('bede') || lower.includes('sonia') || lower.includes('charon')) {
    return 'en-GB';
  }
  if (lower.includes('thomas') || lower.includes('ambrose') || lower.includes('grace') || lower.includes('zephyr')) {
    return 'en-IE';
  }
  if (lower.includes('chrysostom') || lower.includes('basil') || lower.includes('clara') || lower.includes('puck')) {
    return 'en-AU';
  }
  if (lower.includes('gregory') || lower.includes('leo') || lower.includes('jenny') || lower.includes('fenrir')) {
    return 'en-CA';
  }
  if (lower.includes('cyril') || lower.includes('athanasius') || lower.includes('aria')) {
    return 'en-ZA';
  }
  if (lower.includes('bonaventure') || lower.includes('bernard') || lower.includes('samantha')) {
    return 'en-IN';
  }
  return 'en-US';
}

// Dedicated Multi-Voice Text-to-Speech Endpoint
app.post('/api/tts', async (req, res) => {
  try {
    const { text, voiceName = 'gemini-Kore', apiKey } = req.body || {};
    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ error: 'Text prompt is required for TTS.' });
    }

    const chosenVoice = voiceName || 'gemini-Kore';
    const cleanText = text.replace(/<[^>]*>/g, '').replace(/[*_#]/g, '').trim();
    const locale = resolveRegionalLocaleForVoice(chosenVoice);
    const cacheKey = `regional:${chosenVoice}:${locale}:${apiKey ? 'custom' : 'default'}:${cleanText.slice(0, 1800)}`;

    const cached = ttsMemoryCache.get(cacheKey);
    if (cached) {
      return res.json(cached);
    }

    // 1. Optional OpenAI Neural Text-to-Speech (tts-1) if custom OpenAI key is provided
    const openAiKey = apiKey || process.env.OPENAI_API_KEY;
    if (openAiKey) {
      try {
        const openai = new OpenAI({ apiKey: openAiKey });
        const voiceMap: Record<string, 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer'> = {
          'gemini-Kore': 'shimmer',
          Kore: 'shimmer',
          'gemini-Puck': 'alloy',
          Puck: 'alloy',
          'gemini-Charon': 'onyx',
          Charon: 'onyx',
          'gemini-Fenrir': 'echo',
          Fenrir: 'echo',
          'gemini-Zephyr': 'fable',
          Zephyr: 'fable',
          'persona-ava': 'nova',
          'persona-grace': 'shimmer',
          'persona-sonia': 'fable',
          'persona-jenny': 'nova',
          'persona-clara': 'shimmer',
          'persona-aria': 'alloy',
          'persona-samantha': 'nova',
        };

        const targetVoice = voiceMap[chosenVoice] || 'shimmer';
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

    // 2. Primary: Multi-Regional Neural Speech Synthesis (distinct voices for Kore, Puck, Charon, Fenrir, Zephyr & Personas)
    try {
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
        if (ttsMemoryCache.size > 150) {
          const oldestKey = ttsMemoryCache.keys().next().value;
          if (oldestKey) ttsMemoryCache.delete(oldestKey);
        }
        ttsMemoryCache.set(cacheKey, payload);
        return res.json(payload);
      }
    } catch (err: any) {
      console.warn('[TTS] Regional TTS proxy skipped:', err?.message || err);
    }

    // 3. Final fallback to Web Speech
    return res.json({ fallbackWebSpeech: true, voiceName: chosenVoice });
  } catch (err: any) {
    console.warn('[TTS] Server TTS fallback:', err?.message || err);
    return res.json({ fallbackWebSpeech: true, voiceName: req.body?.voiceName || 'gemini-Kore' });
  }
});

// Dedicated Catholic Theological AI Research Endpoint (Default Engine: ChatGPT)
app.all('/api/catholic-ai', async (req, res) => {
  console.log(`[API] Received ${req.method} /api/catholic-ai request`);
  try {
    let prompt: string | undefined;
    let history: any[] = [];
    let userMemory: string | undefined;
    let enableWebResearch = true;
    let provider = 'openai'; // Default: 'openai' (ChatGPT)
    let customApiKey: string | undefined;

    if (req.method === 'GET') {
      prompt = typeof req.query.prompt === 'string' ? req.query.prompt : undefined;
      if (!prompt) {
        return res.json({
          status: 'ok',
          defaultProvider: 'openai',
          hasGeminiKey: !!process.env.GEMINI_API_KEY,
          hasOpenAIKey: !!process.env.OPENAI_API_KEY,
        });
      }
      if (typeof req.query.enableWebResearch === 'string') {
        enableWebResearch = req.query.enableWebResearch !== 'false';
      }
      if (typeof req.query.provider === 'string' && req.query.provider.trim()) {
        provider = req.query.provider.trim();
      }
      if (typeof req.query.userMemory === 'string' && req.query.userMemory.trim()) {
        userMemory = req.query.userMemory.trim();
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
      userMemory = typeof body.userMemory === 'string' ? body.userMemory.trim() : undefined;
      enableWebResearch = body.enableWebResearch !== false;
      provider = body.provider || 'openai';
      customApiKey = typeof body.apiKey === 'string' ? body.apiKey.trim() : undefined;
    }

    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return res.status(400).json({ error: 'A question or prompt is required.' });
    }

    const trimmedPrompt = prompt.trim();
    const cleanQuestion = cleanUserQuestion(trimmedPrompt);

    // 1. Live Internet and Catholic Web Research (strictly filtered for relevance to cleanQuestion)
    let webSources: WebResearchSource[] = [];
    if (enableWebResearch !== false) {
      try {
        webSources = await searchCatholicInternet(cleanQuestion);
        console.log(`[Research] Found ${webSources.length} relevant web sources for: "${cleanQuestion.slice(0, 40)}"`);
      } catch (err) {
        console.warn('[Research] Web search encountered non-critical error:', err);
      }
    }

    // Prepare system instruction enriched with learned user preferences & memory (for style/translation only, never changing the question topic)
    const effectiveSystemInstruction = userMemory
      ? `${CATHOLIC_AI_SYSTEM_INSTRUCTION}\n\nUSER STYLE & TRANSLATION PREFERENCES (Use these preferences ONLY to format your tone and Bible translation choice while answering the user's exact question; NEVER let past topics override the current question):\n${userMemory}`
      : CATHOLIC_AI_SYSTEM_INSTRUCTION;

    // Prepare prompt with the user's exact question first
    let promptWithResearch = `USER QUESTION TO ANSWER DIRECTLY AND SPECIFICALLY:\n"${cleanQuestion}"`;
    if (webSources.length > 0) {
      const researchSnippets = webSources
        .map((s, idx) => `[Source ${idx + 1}: ${s.title} (${s.url})]\n${s.snippet}`)
        .join('\n\n');

      promptWithResearch += `\n\n--- SUPPLEMENTARY WEB RESEARCH (Use ONLY if directly relevant to "${cleanQuestion}"; ignore completely if not relevant) ---\n${researchSnippets}\n------------------------------------------`;
    }

    let reply = '';
    let usedProvider = provider === 'gemini' ? 'gemini' : 'openai';
    let usedModel = provider === 'gemini' ? 'gemini-3-flash-preview' : 'gpt-4o';
    let lastError: any = null;

    // Primary ChatGPT (OpenAI GPT-4o) Execution Path
    const openAiKey = customApiKey || process.env.OPENAI_API_KEY;
    if (!reply && (provider === 'openai' || provider === 'auto') && openAiKey) {
      try {
        const openai = new OpenAI({ apiKey: openAiKey });
        const messagesPayload: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
          { role: 'system', content: effectiveSystemInstruction },
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
          temperature: 0.3,
          max_tokens: 1800,
        });

        const rawOpenAiContent = openAiResponse.choices?.[0]?.message?.content;
        if (rawOpenAiContent) {
          reply = rawOpenAiContent;
          usedProvider = 'openai';
          usedModel = 'gpt-4o';
        }
      } catch (err: any) {
        console.warn('OpenAI API call failed, using server synthesis:', err?.message || err);
        lastError = err;
      }
    }

    // Server Synthesis Execution Path (uses active Gemini models to answer the user's exact question)
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

      const candidateModels = ['gemini-3-flash-preview', 'gemini-2.5-flash', 'gemini-2.0-flash'];

      for (const modelName of candidateModels) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents,
            config: {
              systemInstruction: effectiveSystemInstruction,
              temperature: 0.3,
            },
          });
          if (response && response.text) {
            reply = response.text;
            if (provider === 'openai') {
              usedProvider = 'openai';
              usedModel = 'gpt-4o';
            } else {
              usedProvider = 'gemini';
              usedModel = modelName;
            }
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
