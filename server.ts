import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

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

const CATHOLIC_AI_SYSTEM_INSTRUCTION = `You are the Soul Sanctum Catholic Assistant, an authoritative, reverent, scholarly, and pastoral Catholic theological research and essay-writing assistant.

CORE GUIDING PRINCIPLES:
0. STRICT QUESTION RELEVANCE (MANDATORY): You MUST answer ONLY, DIRECTLY, and SPECIFICALLY the exact question or essay prompt asked by the user. NEVER provide an answer that is unrelated to the user's question, NEVER change the subject, and NEVER output generic filler.
1. ESSAY WRITING & ACADEMIC COMPOSITIONS (MANDATORY WHEN REQUESTED): Whenever the user asks you to write an essay, paper, article, treatise, or composition (or when the user's preferred style is Essay Mode), you MUST write a complete, flowing, multi-paragraph scholarly essay rather than a short bulleted summary. Every essay MUST include:
   - A clear, compelling Essay Title (## Title).
   - An Introduction paragraph that introduces the topic and states a clear theological/historical thesis.
   - Well-developed Body Paragraphs written in eloquent, cohesive prose with smooth transitions, deep analysis, and inline citations.
   - A strong Conclusion paragraph synthesizing the argument.
   - A dedicated "### Sources & Works Cited" section at the end listing the exact Sacred Scripture passages, Catechism of the Catholic Church (CCC) paragraphs, Papal Encyclicals, Ecumenical Councils, Patristic works, and historical/web sources cited in the essay.
2. Ground every answer and essay firmly in the Deposit of Faith: Sacred Scripture, Sacred Tradition, and the living Magisterium of the Catholic Church.
3. Prominently cite the Catechism of the Catholic Church (CCC) with specific paragraph numbers relevant to the user's exact topic.
4. Quote and reference Sacred Scripture (using accurate Catholic editions such as NABRE, Douay-Rheims, or RSV-CE) with explicit chapter and verse relevant to the user's topic.
5. Reference the Church Fathers, Doctors of the Church, and Ecumenical Councils where directly relevant to the user's topic.
6. Tone: Courteous, scholarly, pastoral, deeply reverent, lucid, and spiritually uplifting.`;

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
  isEssayRequest,
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

// Dedicated Multi-Voice Text-to-Speech Endpoint (Supports Kore, OpenAI TTS, and Multi-Regional Neural TTS)
app.post('/api/tts', async (req, res) => {
  try {
    const { text, voiceName = 'gemini-Kore', apiKey } = req.body || {};
    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ error: 'Text prompt is required for TTS.' });
    }

    const chosenVoice = voiceName || 'gemini-Kore';
    const cleanText = text.replace(/<[^>]*>/g, '').replace(/[*_#]/g, '').trim();
    const locale = resolveRegionalLocaleForVoice(chosenVoice);
    const cacheKey = `tts:v4:${chosenVoice}:${locale}:${apiKey ? 'custom' : 'default'}:${cleanText.slice(0, 1800)}`;

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
    const wantsEssay = isEssayRequest(trimmedPrompt, userMemory);

    // Kick off live web source lookup in parallel so it never slows down essay generation
    const webSourcesPromise: Promise<WebResearchSource[]> =
      enableWebResearch !== false
        ? searchCatholicInternet(cleanQuestion).catch(() => [])
        : Promise.resolve([]);

    // Prepare system instruction enriched with learned user preferences & memory
    const effectiveSystemInstruction = userMemory
      ? `${CATHOLIC_AI_SYSTEM_INSTRUCTION}\n\nUSER STYLE & TRANSLATION PREFERENCES (Use these preferences ONLY to format your tone, essay structure, and Bible translation choice while answering the user's exact topic; NEVER let past topics override the current question):\n${userMemory}`
      : CATHOLIC_AI_SYSTEM_INSTRUCTION;

    const promptForModel = wantsEssay
      ? `USER ESSAY REQUEST (Write a complete, well-structured, multi-paragraph scholarly essay directly on this exact topic, complete with Title, Introduction & Thesis, cohesive Body Paragraphs in flowing prose, Conclusion, and a formal "### Sources & Works Cited" section at the end):\n"${trimmedPrompt}"`
      : `USER QUESTION TO ANSWER DIRECTLY AND SPECIFICALLY (Include a "### Sources & References" section at the end citing the specific Scripture, Catechism, and historical sources used):\n"${trimmedPrompt}"`;

    let reply = '';
    let groundingSources: WebResearchSource[] = [];
    let usedProvider = provider === 'gemini' ? 'gemini' : 'openai';
    let usedModel = provider === 'gemini' ? 'gemini-3.8-flash' : 'gpt-4o';
    let lastError: any = null;

    // 1. Primary ChatGPT (OpenAI GPT-4o) Execution Path (if custom or env OPENAI_API_KEY is configured)
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

        messagesPayload.push({ role: 'user', content: promptForModel });

        const openAiResponse = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: messagesPayload,
          temperature: 0.3,
          max_tokens: 3500,
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

    // 2. Fast Server AI Synthesis Execution Path (uses active @google/genai models without prohibited temperature param)
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
        parts: [{ text: promptForModel }],
      });

      const candidateModels = ['gemini-3.8-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];

      for (const modelName of candidateModels) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents,
            config: {
              systemInstruction: effectiveSystemInstruction,
              ...(modelName === 'gemini-3.8-flash'
                ? { thinkingConfig: { thinkingLevel: ThinkingLevel.LOW } }
                : {}),
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

    const fetchedWebSources = await webSourcesPromise;
    const mergedWebSources: WebResearchSource[] = [...groundingSources];
    for (const src of fetchedWebSources) {
      if (!mergedWebSources.some((s) => s.url === src.url) && mergedWebSources.length < 6) {
        mergedWebSources.push(src);
      }
    }

    if (!reply && lastError) {
      throw lastError;
    }

    return res.json({
      reply: reply || 'No response generated from the Catholic Assistant.',
      webSources: mergedWebSources,
      provider: usedProvider,
      model: usedModel,
    });
  } catch (error: any) {
    console.error('Error in /api/catholic-ai:', error);
    const errorMessage = error?.message || 'An error occurred while consulting the Catholic Assistant.';
    return res.status(500).json({ error: errorMessage });
  }
});

const SERVER_CATHOLIC_RSS_FEEDS: Record<string, string[]> = {
  'st-paul-center': [
    'https://catholicexchange.com/feed/',
    'https://www.catholicworldreport.com/feed/'
  ],
  'catholic-answers': [
    'https://www.catholic.com/feeds/magazine/rss',
    'https://catholicexchange.com/feed/'
  ],
  'word-on-fire': [
    'https://www.wordonfire.org/articles/feed/'
  ],
  'catholic-insight': [
    'https://www.catholicworldreport.com/feed/',
    'https://crisismagazine.com/feed/'
  ],
  'aleteia': [
    'https://aleteia.org/feed/'
  ],
  'sign-org': [
    'https://spiritualdirection.com/feed',
    'https://catholicexchange.com/feed/'
  ],
  'ncregister': [
    'https://www.ncregister.com/feeds/general-news.xml',
    'https://www.catholicnewsagency.com/rss/news.xml'
  ],
  'catholic-digest': [
    'https://www.catholicdigest.com/feed/',
    'https://aleteia.org/feed/'
  ],
  'cerc': [
    'https://catholiceducation.org/feed/',
    'https://crisismagazine.com/feed/'
  ],
  'cbcp': [
    'https://cbcpnews.net/cbcpnews/feed/',
    'https://www.vaticannews.va/en.rss.xml'
  ]
};

async function fetchUpstreamRssXml(url: string): Promise<string> {
  // First attempt with standard fetch (avoids Cloudflare 403 on sites like Catholic World Report & CERC)
  try {
    const res1 = await fetch(url, {
      headers: {
        'Accept': 'application/rss+xml, application/xml, text/xml, */*'
      },
      signal: AbortSignal.timeout(4500)
    });
    if (res1.ok) {
      const txt1 = await res1.text();
      if (txt1 && (/<item[\s>]/i.test(txt1) || /<entry[\s>]/i.test(txt1))) {
        return txt1;
      }
    }
  } catch {
    // Fallback to browser UA below
  }

  const res2 = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      'Accept': 'application/rss+xml, application/xml, text/xml, */*'
    },
    signal: AbortSignal.timeout(4500)
  });
  if (!res2.ok) {
    throw new Error(`HTTP ${res2.status}`);
  }
  const txt2 = await res2.text();
  if (!txt2 || (!/<item[\s>]/i.test(txt2) && !/<entry[\s>]/i.test(txt2))) {
    throw new Error('Invalid RSS XML');
  }
  return txt2;
}

app.get('/api/catholic-rss', async (req, res) => {
  try {
    const sourceKey = typeof req.query.source === 'string' ? req.query.source : 'st-paul-center';
    const candidateUrls = SERVER_CATHOLIC_RSS_FEEDS[sourceKey] || SERVER_CATHOLIC_RSS_FEEDS['st-paul-center'];

    const collectedItems: string[] = [];
    let lastErr: any = null;

    for (const targetUrl of candidateUrls) {
      try {
        const xml = await fetchUpstreamRssXml(targetUrl);
        const itemMatches = xml.match(/<item[\s>][\s\S]*?<\/item>/gi) || [];
        for (const itemXml of itemMatches) {
          collectedItems.push(itemXml);
        }
        if (collectedItems.length >= 15) {
          break;
        }
      } catch (err: any) {
        lastErr = err;
      }
    }

    if (collectedItems.length === 0) {
      throw lastErr || new Error('No RSS items returned from upstream feed');
    }

    const combinedXml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/"><channel><title>${sourceKey}</title>${collectedItems.slice(0, 30).join('\n')}</channel></rss>`;

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    return res.send(combinedXml);
  } catch (err: any) {
    return res.status(502).json({ error: err?.message || 'RSS fetch error' });
  }
});

app.get('/api/vatican-news', async (_req, res) => {
  try {
    const xml = await fetchUpstreamRssXml('https://www.vaticannews.va/en.rss.xml');
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    return res.send(xml);
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || 'Vatican RSS error' });
  }
});

app.get('/api/catholic-article-full', async (req, res) => {
  try {
    const articleUrl = typeof req.query.url === 'string' ? req.query.url : '';
    if (!articleUrl || !/^https?:\/\//i.test(articleUrl)) {
      return res.status(400).json({ error: 'Invalid article URL' });
    }

    let html = '';
    try {
      const r1 = await fetch(articleUrl, {
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9'
        },
        signal: AbortSignal.timeout(7000)
      });
      if (r1.ok) {
        html = await r1.text();
      }
    } catch {
      // Try browser UA next
    }

    if (!html) {
      const r2 = await fetch(articleUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.9'
        },
        signal: AbortSignal.timeout(7000)
      });
      if (!r2.ok) {
        throw new Error(`HTTP ${r2.status}`);
      }
      html = await r2.text();
    }

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

    const ogImageMatch =
      html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
    const ogImage = ogImageMatch ? decodeEntities(ogImageMatch[1].trim()) : undefined;

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
    const finalContent =
      htmlParagraphsText.length > extractedText.length * 0.75 && htmlParagraphsText.length > 350
        ? htmlParagraphsText
        : extractedText || htmlParagraphsText;

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.json({
      content: finalContent,
      imageUrl: ogImage
    });
  } catch (err: any) {
    return res.status(502).json({ error: err?.message || 'Article fetch error' });
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
