import { GoogleGenAI } from '@google/genai';
import OpenAI from 'openai';

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
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write('data', 36);
  header.writeUInt32LE(dataSize, 40);

  return Buffer.concat([header, pcmBuffer]);
}

function splitTextIntoSentences(text: string, maxChunkLen: number = 190): string[] {
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
  const lower = (chosenVoice || '').toLowerCase();
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

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const { text, voiceName = 'gemini-Kore', apiKey } = body;

    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ error: 'Text prompt is required for TTS.' });
    }

    const chosenVoice = voiceName || 'gemini-Kore';
    const cleanText = text.replace(/<[^>]*>/g, '').replace(/[*_#]/g, '').trim();
    const targetPrebuiltVoice = resolveGeminiPrebuiltVoice(chosenVoice);

    // 1. Primary: Gemini 3.8 Flash Lite TTS ('Kore', 'Charon', 'Puck', 'Fenrir', 'Zephyr')
    if (process.env.GEMINI_API_KEY && !apiKey) {
      const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        apiVersion: 'v1beta',
        httpOptions: {
          headers: { 'User-Agent': 'aistudio-build' },
        },
      });

      for (const modelName of ['gemini-3.8-flash-lite-tts', 'gemini-2.5-flash-preview-tts']) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: [{ role: 'user', parts: [{ text: cleanText.slice(0, 1800) }] }],
            config: {
              responseModalities: ['AUDIO'],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: { voiceName: targetPrebuiltVoice },
                },
              },
            },
          });

          const partData = response.candidates?.[0]?.content?.parts?.[0]?.inlineData;
          if (partData?.data) {
            const rawMime = (partData.mimeType || 'audio/wav').toLowerCase();
            const audioUrl =
              rawMime.includes('l16') || rawMime.includes('pcm')
                ? `data:audio/wav;base64,${wrapPcm24kMonoToWav(Buffer.from(partData.data, 'base64'), 24000).toString('base64')}`
                : `data:${partData.mimeType || 'audio/wav'};base64,${partData.data}`;

            return res.status(200).json({
              audioUrl,
              voiceName: `gemini-${targetPrebuiltVoice}`,
              provider: `gemini-tts-${targetPrebuiltVoice}`,
            });
          }
        } catch {
          // Try next model
        }
      }
    }

    // 2. Secondary: OpenAI Neural TTS
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
        const mp3Response = await openai.audio.speech.create({
          model: 'tts-1',
          voice: targetVoice,
          input: cleanText.slice(0, 2000),
          speed: targetVoice === 'onyx' ? 0.88 : 0.95,
        });
        const buffer = Buffer.from(await mp3Response.arrayBuffer());
        return res.status(200).json({
          audioUrl: `data:audio/mp3;base64,${buffer.toString('base64')}`,
          voiceName: chosenVoice,
          provider: 'openai-tts',
        });
      } catch {
        // Fall through
      }
    }

    // 3. Tertiary: Fast Parallel Multi-Regional Neural TTS
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
      return res.status(200).json({
        audioUrl: `data:audio/mp3;base64,${Buffer.concat(validBuffers).toString('base64')}`,
        voiceName: chosenVoice,
        provider: `google-translate-tts-${locale}`,
      });
    }

    return res.status(200).json({ fallbackWebSpeech: true, voiceName: chosenVoice });
  } catch {
    return res.status(200).json({ fallbackWebSpeech: true, voiceName: 'gemini-Kore' });
  }
}
