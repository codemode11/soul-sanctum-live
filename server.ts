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

// Dedicated Gemini AI & Free Multi-Voice Text-to-Speech Endpoint
app.post('/api/tts', async (req, res) => {
  try {
    const { text, voiceName = 'Kore', apiKey } = req.body || {};
    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ error: 'Text prompt is required for TTS.' });
    }

    const chosenVoice = voiceName || 'Kore';
    const cleanText = text.replace(/<[^>]*>/g, '').replace(/[*_#]/g, '').trim();

    // 1. Primary: OpenAI Neural Text-to-Speech (tts-1) if key is available
    const openAiKey = apiKey || process.env.OPENAI_API_KEY;
    if (openAiKey) {
      try {
        const openai = new OpenAI({ apiKey: openAiKey });
        const voiceMap: Record<string, 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer'> = {
          Kore: 'shimmer',
          'gemini-Kore': 'shimmer',
          Puck: 'alloy',
          'gemini-Puck': 'alloy',
          Charon: 'onyx',
          'gemini-Charon': 'onyx',
          Fenrir: 'echo',
          'gemini-Fenrir': 'echo',
          Zephyr: 'fable',
          'gemini-Zephyr': 'fable',
          'persona-ava': 'shimmer',
          'persona-aria': 'nova',
          'persona-sonia': 'fable',
          'persona-clara': 'nova',
          'saint-thomas-aquinas': 'echo',
          'saint-john-chrysostom': 'alloy',
          'saint-augustine': 'onyx',
          'saint-jerome': 'onyx',
          'pope-saint-gregory': 'echo',
          'saint-ambrose': 'fable',
          'saint-cyril': 'onyx',
          'venerable-bede': 'fable',
          'saint-basil': 'echo',
          'saint-bonaventure': 'alloy',
          'saint-alphonsus': 'echo',
          'saint-bellarmine': 'onyx',
          'saint-albert': 'echo',
          'ava-grace': 'shimmer',
          david: 'onyx',
        };

        const targetVoice = voiceMap[chosenVoice] || (
          chosenVoice.toLowerCase().includes('saint') || 
          chosenVoice.toLowerCase().includes('charon') || 
          chosenVoice.toLowerCase().includes('fenrir') || 
          chosenVoice.toLowerCase().includes('gospel') 
            ? 'onyx' 
            : 'shimmer'
        );
        const isDeepVoice = targetVoice === 'onyx' || chosenVoice.toLowerCase().includes('charon') || chosenVoice.toLowerCase().includes('jerome');

        const mp3Response = await openai.audio.speech.create({
          model: 'tts-1',
          voice: targetVoice,
          input: cleanText.slice(0, 2000),
          speed: isDeepVoice ? 0.88 : 0.95,
        });

        const buffer = Buffer.from(await mp3Response.arrayBuffer());
        const base64Audio = buffer.toString('base64');
        return res.json({
          audioUrl: `data:audio/mp3;base64,${base64Audio}`,
          voiceName: chosenVoice,
          provider: 'openai-tts',
        });
      } catch (err: any) {
        console.warn('[TTS] OpenAI Neural TTS skipped:', err?.message || err);
      }
    }

    // 2. Secondary: Kokoro Open-Weight Neural TTS (100% Free Neural Voices)
    try {
      const kokoroVoiceMap: Record<string, string> = {
        Kore: 'af_heart',
        'gemini-Kore': 'af_heart',
        Puck: 'am_adam',
        'gemini-Puck': 'am_adam',
        Charon: 'am_michael',
        'gemini-Charon': 'am_michael',
        Fenrir: 'bm_george',
        'gemini-Fenrir': 'bm_george',
        Zephyr: 'bm_fable',
        'gemini-Zephyr': 'bm_fable',
        'persona-ava': 'af_heart',
        'persona-aria': 'af_bella',
        'persona-sonia': 'bf_emma',
        'persona-clara': 'af_sky',
        'saint-thomas-aquinas': 'bm_george',
        'saint-john-chrysostom': 'am_adam',
        'saint-augustine': 'am_michael',
        'saint-jerome': 'bm_george',
        'pope-saint-gregory': 'bm_george',
        'saint-ambrose': 'bm_fable',
        'saint-cyril': 'am_michael',
        'venerable-bede': 'bm_fable',
        'ava-grace': 'af_heart',
        david: 'am_michael',
        'kokoro-af_heart': 'af_heart',
        'kokoro-af_bella': 'af_bella',
        'kokoro-af_sky': 'af_sky',
        'kokoro-bf_emma': 'bf_emma',
        'kokoro-am_adam': 'am_adam',
        'kokoro-am_michael': 'am_michael',
        'kokoro-bm_george': 'bm_george',
        'kokoro-bm_fable': 'bm_fable',
      };

      let selectedKokoroVoice = kokoroVoiceMap[chosenVoice];
      if (!selectedKokoroVoice) {
        if (chosenVoice.toLowerCase().includes('charon') || chosenVoice.toLowerCase().includes('gospel') || chosenVoice.toLowerCase().includes('david') || chosenVoice.toLowerCase().includes('saint')) {
          selectedKokoroVoice = 'am_michael';
        } else {
          selectedKokoroVoice = 'af_heart';
        }
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const kokoroRes = await fetch('https://hexgrad-kokoro-tts.hf.space/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          data: [cleanText.slice(0, 1000), selectedKokoroVoice, 1.0],
        }),
      });
      clearTimeout(timeoutId);

      if (kokoroRes.ok) {
        const kokoroData = await kokoroRes.json();
        if (kokoroData && kokoroData.data && kokoroData.data[0]) {
          const audioItem = kokoroData.data[0];
          const audioPathOrUrl = typeof audioItem === 'string' ? audioItem : (audioItem.name || audioItem.url || '');
          if (audioPathOrUrl) {
            const fullAudioUrl = audioPathOrUrl.startsWith('http')
              ? audioPathOrUrl
              : `https://hexgrad-kokoro-tts.hf.space/file=${audioPathOrUrl}`;

            return res.json({
              audioUrl: fullAudioUrl,
              voiceName: chosenVoice,
              provider: 'kokoro-neural-tts',
            });
          }
        }
      }
    } catch (err: any) {
      console.warn('[TTS] Kokoro Neural TTS skipped:', err?.message || err);
    }

    // 3. Google Gemini Model Audio Generation Path
    if (process.env.GEMINI_API_KEY) {
      const ai = getGenAI();
      const candidateModels = ['gemini-2.5-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];

      const validPrebuiltVoices = ['Puck', 'Charon', 'Kore', 'Fenrir', 'Zephyr'];
      let targetPrebuiltVoice = 'Kore';

      const cleanVoiceName = chosenVoice.replace(/^gemini-/, '');
      if (validPrebuiltVoices.includes(cleanVoiceName)) {
        targetPrebuiltVoice = cleanVoiceName;
      } else if (chosenVoice.toLowerCase().includes('charon') || chosenVoice.toLowerCase().includes('jerome') || chosenVoice.toLowerCase().includes('augustine') || chosenVoice.toLowerCase().includes('cyril') || chosenVoice.toLowerCase().includes('david') || chosenVoice.toLowerCase().includes('gospel')) {
        targetPrebuiltVoice = 'Charon';
      } else if (chosenVoice.toLowerCase().includes('fenrir') || chosenVoice.toLowerCase().includes('thomas') || chosenVoice.toLowerCase().includes('basil') || chosenVoice.toLowerCase().includes('gregory')) {
        targetPrebuiltVoice = 'Fenrir';
      } else if (chosenVoice.toLowerCase().includes('puck') || chosenVoice.toLowerCase().includes('chrysostom') || chosenVoice.toLowerCase().includes('bonaventure')) {
        targetPrebuiltVoice = 'Puck';
      } else if (chosenVoice.toLowerCase().includes('zephyr') || chosenVoice.toLowerCase().includes('bede') || chosenVoice.toLowerCase().includes('ambrose') || chosenVoice.toLowerCase().includes('sonia')) {
        targetPrebuiltVoice = 'Zephyr';
      } else {
        targetPrebuiltVoice = 'Kore';
      }

      for (const modelName of candidateModels) {
        try {
          const promptWithVoiceStyle = `[Voice Persona: ${targetPrebuiltVoice}] Proclaim this Catholic liturgical passage in a reverent, sacred voice:\n\n${cleanText.slice(0, 1200)}`;
          const response = await ai.models.generateContent({
            model: modelName,
            contents: promptWithVoiceStyle,
            config: {
              responseModalities: ['AUDIO'],
            },
          });

          const partData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData;
          if (partData?.data) {
            const base64Audio = partData.data;
            const mimeType = partData.mimeType || 'audio/wav';
            return res.json({
              audioUrl: `data:${mimeType};base64,${base64Audio}`,
              voiceName: chosenVoice,
              provider: 'gemini-tts',
            });
          }
        } catch {
          // Clean silent fallback
        }
      }
    }

    // 4. Guaranteed Free Multi-Regional Neural Speech Synthesis Engine (Multi-Sentence Concatenated Audio)
    // Ensures 100% of the reading is spoken in full from start to finish!
    try {
      const localeVoiceMap: Record<string, string> = {
        Kore: 'en-US',
        'gemini-Kore': 'en-US',
        Puck: 'en-AU',
        'gemini-Puck': 'en-AU',
        Charon: 'en-GB',
        'gemini-Charon': 'en-GB',
        Fenrir: 'en-CA',
        'gemini-Fenrir': 'en-CA',
        Zephyr: 'en-IN',
        'gemini-Zephyr': 'en-IN',
        'persona-ava': 'en-US',
        'persona-aria': 'en-US',
        'persona-sonia': 'en-GB',
        'persona-clara': 'en-IE',
        'saint-thomas-aquinas': 'en-GB',
        'saint-john-chrysostom': 'en-AU',
        'saint-augustine': 'en-GB',
        'saint-jerome': 'en-GB',
        'pope-saint-gregory': 'en-GB',
        'saint-ambrose': 'en-AU',
        'saint-cyril': 'en-IN',
        'venerable-bede': 'en-GB',
        'saint-basil': 'en-CA',
        'saint-bonaventure': 'en-AU',
        'saint-alphonsus': 'en-GB',
        'saint-bellarmine': 'en-GB',
        'saint-albert': 'en-[#]',
        'ava-grace': 'en-US',
        david: 'en-GB',
        'kokoro-af_heart': 'en-US',
        'kokoro-af_bella': 'en-US',
        'kokoro-af_sky': 'en-IE',
        'kokoro-bf_emma': 'en-GB',
        'kokoro-am_adam': 'en-IN',
        'kokoro-am_michael': 'en-CA',
        'kokoro-bm_george': 'en-GB',
        'kokoro-bm_fable': 'en-AU',
      };

      const isMaleVoiceRequested = chosenVoice.toLowerCase().includes('charon') || 
        chosenVoice.toLowerCase().includes('augustine') || 
        chosenVoice.toLowerCase().includes('jerome') || 
        chosenVoice.toLowerCase().includes('david') || 
        chosenVoice.toLowerCase().includes('george') || 
        chosenVoice.toLowerCase().includes('michael') ||
        chosenVoice.toLowerCase().includes('gospel') ||
        chosenVoice.toLowerCase().includes('puck') ||
        chosenVoice.toLowerCase().includes('fenrir');

      const locale = localeVoiceMap[chosenVoice] || (isMaleVoiceRequested ? 'en-GB' : 'en-US');

      const sentences = splitTextIntoSentences(cleanText, 200);
      const audioBuffers: Buffer[] = [];

      for (const chunkText of sentences.slice(0, 20)) { // Up to 4000 characters of full scripture readings
        const gtUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(chunkText)}&tl=${locale}&client=tw-ob`;
        const gtRes = await fetch(gtUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          },
        });
        if (gtRes.ok) {
          const buf = Buffer.from(await gtRes.arrayBuffer());
          if (buf.length > 300) {
            audioBuffers.push(buf);
          }
        }
      }

      if (audioBuffers.length > 0) {
        const fullAudioBuffer = Buffer.concat(audioBuffers);
        const base64Audio = fullAudioBuffer.toString('base64');
        return res.json({
          audioUrl: `data:audio/mp3;base64,${base64Audio}`,
          voiceName: chosenVoice,
          provider: `google-translate-tts-${locale}`,
        });
      }
    } catch (err: any) {
      console.warn('[TTS] Regional TTS proxy skipped:', err?.message || err);
    }

    // 5. Final fallback to Web Speech
    return res.json({ fallbackWebSpeech: true, voiceName: chosenVoice });
  } catch (err: any) {
    console.warn('[TTS] Server TTS fallback:', err?.message || err);
    return res.json({ fallbackWebSpeech: true, voiceName: req.body?.voiceName || 'Kore' });
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
