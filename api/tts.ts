import { GoogleGenAI } from '@google/genai';
import OpenAI from 'openai';

const vercelTtsCache = new Map<string, { audioUrl: string; voiceName: string; provider: string }>();

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

type VerifiedGeminiPrebuiltVoice =
  | 'Kore'
  | 'Aoede'
  | 'Leda'
  | 'Vindemiatrix'
  | 'Despina'
  | 'Zephyr'
  | 'Orus'
  | 'Algenib'
  | 'Charon'
  | 'Fenrir'
  | 'Puck';

interface ResolvedVoiceSpec {
  prebuiltVoice: VerifiedGeminiPrebuiltVoice;
  style: string;
  gender: 'female' | 'male';
}

function resolveGeminiTtsVoiceSpec(chosenVoice: string): ResolvedVoiceSpec {
  const exactSpecs: Record<string, ResolvedVoiceSpec> = {
    // Verified Female Neural Voices
    'gemini-Kore': {
      prebuiltVoice: 'Kore',
      gender: 'female',
      style: 'Warm, serene, reverent female Catholic lector reading with clear, gentle cadence',
    },
    Kore: {
      prebuiltVoice: 'Kore',
      gender: 'female',
      style: 'Warm, serene, reverent female Catholic lector reading with clear, gentle cadence',
    },
    'persona-ava': {
      prebuiltVoice: 'Aoede',
      gender: 'female',
      style: 'Gentle, heartfelt, melodic female devotional voice praying softly and unhurriedly',
    },
    'gemini-Aoede': {
      prebuiltVoice: 'Aoede',
      gender: 'female',
      style: 'Gentle, heartfelt, melodic female devotional voice praying softly and unhurriedly',
    },
    'persona-sonia': {
      prebuiltVoice: 'Vindemiatrix',
      gender: 'female',
      style: 'Poised, gentle, mature cathedral sister reading Sacred Scripture with calm reverence',
    },
    'gemini-Vindemiatrix': {
      prebuiltVoice: 'Vindemiatrix',
      gender: 'female',
      style: 'Poised, gentle, mature cathedral sister reading Sacred Scripture with calm reverence',
    },
    'persona-clara': {
      prebuiltVoice: 'Leda',
      gender: 'female',
      style: 'Soft, delicate, meditative contemplative female voice suited for Eucharistic adoration',
    },
    'gemini-Leda': {
      prebuiltVoice: 'Leda',
      gender: 'female',
      style: 'Soft, delicate, meditative contemplative female voice suited for Eucharistic adoration',
    },
    'persona-grace': {
      prebuiltVoice: 'Despina',
      gender: 'female',
      style: 'Warm, smooth, compassionate Catholic narrator telling lives of the saints',
    },
    'gemini-Despina': {
      prebuiltVoice: 'Despina',
      gender: 'female',
      style: 'Warm, smooth, compassionate Catholic narrator telling lives of the saints',
    },
    'gemini-Zephyr': {
      prebuiltVoice: 'Zephyr',
      gender: 'female',
      style: 'Smooth, balanced, peaceful liturgical reader with gentle phrasing',
    },
    Zephyr: {
      prebuiltVoice: 'Zephyr',
      gender: 'female',
      style: 'Smooth, balanced, peaceful liturgical reader with gentle phrasing',
    },

    // Verified Male Neural Voices
    'liturgical-deacon': {
      prebuiltVoice: 'Orus',
      gender: 'male',
      style: 'Firm, solemn, authoritative Catholic cathedral deacon proclaiming the Holy Gospel',
    },
    'gemini-Orus': {
      prebuiltVoice: 'Orus',
      gender: 'male',
      style: 'Firm, solemn, authoritative Catholic cathedral deacon proclaiming the Holy Gospel',
    },
    'liturgical-monk': {
      prebuiltVoice: 'Algenib',
      gender: 'male',
      style: 'Deep, unhurried, resonant Benedictine abbot reading monastic lectio divina',
    },
    'gemini-Algenib': {
      prebuiltVoice: 'Algenib',
      gender: 'male',
      style: 'Deep, unhurried, resonant Benedictine abbot reading monastic lectio divina',
    },
    'liturgical-scholar': {
      prebuiltVoice: 'Fenrir',
      gender: 'male',
      style: 'Knowledgeable, crisp, lucid Catholic theologian explaining Scripture and doctrine',
    },
    'gemini-Charon': {
      prebuiltVoice: 'Charon',
      gender: 'male',
      style: 'Deep, solemn, contemplative monastic bass speaking with reverent authority',
    },
    Charon: {
      prebuiltVoice: 'Charon',
      gender: 'male',
      style: 'Deep, solemn, contemplative monastic bass speaking with reverent authority',
    },
    'gemini-Fenrir': {
      prebuiltVoice: 'Fenrir',
      gender: 'male',
      style: 'Warm, resonant Benedictine baritone reading Sacred Scripture steadily',
    },
    Fenrir: {
      prebuiltVoice: 'Fenrir',
      gender: 'male',
      style: 'Warm, resonant Benedictine baritone reading Sacred Scripture steadily',
    },
    'gemini-Puck': {
      prebuiltVoice: 'Puck',
      gender: 'male',
      style: 'Bright, articulate, lively tenor reader with clear theological diction',
    },
    Puck: {
      prebuiltVoice: 'Puck',
      gender: 'male',
      style: 'Bright, articulate, lively tenor reader with clear theological diction',
    },

    // Church Father & Saint Personas (all mapped to 100%-verified distinct Gemini 3.8 male voices + distinct style prompts)
    'saint-thomas-aquinas': {
      prebuiltVoice: 'Orus',
      gender: 'male',
      style: 'Deep, measured, contemplative medieval Dominican theologian speaking with calm clarity',
    },
    'saint-john-chrysostom': {
      prebuiltVoice: 'Puck',
      gender: 'male',
      style: 'Eloquent, vibrant golden-mouthed Church Father preaching with spiritual warmth and rhetorical cadence',
    },
    'saint-augustine': {
      prebuiltVoice: 'Algenib',
      gender: 'male',
      style: 'Soulful, gravelly, deeply reflective Latin Church Father speaking with humility and depth',
    },
    'saint-jerome': {
      prebuiltVoice: 'Charon',
      gender: 'male',
      style: 'Austere, firm, resonant monastic biblical scholar speaking with conviction',
    },
    'pope-saint-gregory': {
      prebuiltVoice: 'Fenrir',
      gender: 'male',
      style: 'Paternal, solemn, clear Supreme Pontiff speaking with gentle gravity',
    },
    'saint-ambrose': {
      prebuiltVoice: 'Orus',
      gender: 'male',
      style: 'Smooth, commanding Roman bishop speaking with clarity and apostolic firmness',
    },
    'saint-cyril': {
      prebuiltVoice: 'Charon',
      gender: 'male',
      style: 'Authoritative, resolute Eastern Patriarch explaining doctrine clearly',
    },
    'venerable-bede': {
      prebuiltVoice: 'Fenrir',
      gender: 'male',
      style: 'Even, serene monastic historian speaking with quiet scholarly devotion',
    },
    'saint-basil': {
      prebuiltVoice: 'Algenib',
      gender: 'male',
      style: 'Dignified, ascetic Eastern bishop speaking with lucid spiritual wisdom',
    },
    'cornelius-a-lapide': {
      prebuiltVoice: 'Orus',
      gender: 'male',
      style: 'Knowledgeable, illuminating Jesuit biblical exegete explaining Sacred Scripture',
    },
    'blessed-theophylact': {
      prebuiltVoice: 'Puck',
      gender: 'male',
      style: 'Warm, lyrical, reverent Byzantine archbishop offering Gospel commentary',
    },
    'saint-bonaventure': {
      prebuiltVoice: 'Fenrir',
      gender: 'male',
      style: 'Luminous, devotional Franciscan theologian speaking with seraphic warmth',
    },
    'saint-alphonsus': {
      prebuiltVoice: 'Algenib',
      gender: 'male',
      style: 'Earnest, paternal, pastoral Redemptorist doctor speaking tenderly to the heart',
    },
    'saint-bellarmine': {
      prebuiltVoice: 'Orus',
      gender: 'male',
      style: 'Authoritative, articulate cardinal apologist explaining Catholic teaching with precision',
    },
    'saint-albert': {
      prebuiltVoice: 'Charon',
      gender: 'male',
      style: 'Wise, deep-voiced German Dominican philosopher investigating creation with calm depth',
    },
    'general-lector': {
      prebuiltVoice: 'Orus',
      gender: 'male',
      style: 'Solemn, reverent Catholic patristic lector',
    },
    'vatican-magisterium': {
      prebuiltVoice: 'Fenrir',
      gender: 'male',
      style: 'Solemn, clear Magisterial reader proclaiming Church teaching',
    },
  };

  if (exactSpecs[chosenVoice]) return exactSpecs[chosenVoice];

  const lower = (chosenVoice || '').toLowerCase();
  if (lower.includes('augustine') || lower.includes('monk') || lower.includes('basil') || lower.includes('alphonsus') || lower.includes('algenib')) {
    return { prebuiltVoice: 'Algenib', gender: 'male', style: 'Soulful, deep Catholic patristic voice' };
  }
  if (lower.includes('jerome') || lower.includes('cyril') || lower.includes('albert') || lower.includes('charon')) {
    return { prebuiltVoice: 'Charon', gender: 'male', style: 'Deep, solemn Catholic male voice' };
  }
  if (lower.includes('thomas') || lower.includes('deacon') || lower.includes('ambrose') || lower.includes('bellarmine') || lower.includes('lapide') || lower.includes('orus') || lower.includes('david')) {
    return { prebuiltVoice: 'Orus', gender: 'male', style: 'Measured, firm solemn Gospel deacon voice' };
  }
  if (lower.includes('gregory') || lower.includes('bede') || lower.includes('bonaventure') || lower.includes('scholar') || lower.includes('fenrir')) {
    return { prebuiltVoice: 'Fenrir', gender: 'male', style: 'Warm Catholic male baritone voice' };
  }
  if (lower.includes('chrysostom') || lower.includes('theophylact') || lower.includes('puck')) {
    return { prebuiltVoice: 'Puck', gender: 'male', style: 'Crisp, articulate Catholic tenor voice' };
  }
  if (lower.includes('clara') || lower.includes('leda')) {
    return { prebuiltVoice: 'Leda', gender: 'female', style: 'Soft, serene, contemplative liturgical voice' };
  }
  if (lower.includes('sonia') || lower.includes('vindemiatrix')) {
    return { prebuiltVoice: 'Vindemiatrix', gender: 'female', style: 'Calm, mature cathedral contemplative voice' };
  }
  if (lower.includes('grace') || lower.includes('despina')) {
    return { prebuiltVoice: 'Despina', gender: 'female', style: 'Warm, compassionate Catholic narrator voice' };
  }
  if (lower.includes('ava') || lower.includes('aoede')) {
    return { prebuiltVoice: 'Aoede', gender: 'female', style: 'Gentle, heartfelt female devotional voice' };
  }
  if (lower.includes('zephyr')) {
    return { prebuiltVoice: 'Zephyr', gender: 'female', style: 'Smooth, balanced liturgical reader' };
  }

  return {
    prebuiltVoice: 'Kore',
    gender: 'female',
    style: 'Warm, serene, reverent female Catholic lector',
  };
}

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
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
    const spec = resolveGeminiTtsVoiceSpec(chosenVoice);
    const cacheKey = `tts:v6:${chosenVoice}:${cleanText.slice(0, 1800)}`;

    const cached = vercelTtsCache.get(cacheKey);
    if (cached) {
      return res.status(200).json(cached);
    }

    // 1. Primary: Gemini 3.8 Neural TTS (gemini-3.8-flash-lite-tts primary for fast high-throughput reliability,
    //    falling back to gemini-3.8-flash-tts on separate quota pool)
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey) {
      const textSnippet = cleanText.slice(0, 1800);
      const isCoreVoice = ['Kore', 'Puck', 'Charon', 'Fenrir', 'Zephyr'].includes(spec.prebuiltVoice);
      const safeCoreVoice: VerifiedGeminiPrebuiltVoice = spec.gender === 'female' ? 'Kore' : 'Charon';

      const attempts: Array<{ model: string; voice: VerifiedGeminiPrebuiltVoice; isSecondaryModel?: boolean }> = [
        { model: 'gemini-3.8-flash-lite-tts', voice: spec.prebuiltVoice },
        { model: 'gemini-3.8-flash-tts', voice: spec.prebuiltVoice, isSecondaryModel: true },
        ...(!isCoreVoice
          ? [{ model: 'gemini-3.8-flash-lite-tts', voice: safeCoreVoice }]
          : []),
      ];

      const ai = new GoogleGenAI({
        apiKey: geminiKey,
        apiVersion: 'v1alpha',
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
      });

      for (let i = 0; i < attempts.length; i++) {
        const cfg = attempts[i];
        try {
          const ttsResponse = await ai.models.generateContent({
            model: cfg.model,
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: textSnippet,
                    speechMetadata: {
                      style: spec.style,
                    },
                  } as any,
                ],
              },
            ],
            config: {
              responseModalities: ['AUDIO'],
              speechConfig: {
                voiceConfig: { prebuiltVoiceConfig: { voiceName: cfg.voice } },
              },
            },
          });

          const inlinePart = ttsResponse.candidates?.[0]?.content?.parts?.find((p: any) => p?.inlineData?.data);
          if (inlinePart?.inlineData?.data) {
            const rawBuffer = Buffer.from(inlinePart.inlineData.data, 'base64');
            const mimeType = inlinePart.inlineData.mimeType || '';
            const hasRiffHeader = rawBuffer.length >= 4 && rawBuffer.subarray(0, 4).toString('ascii') === 'RIFF';
            const isWav = mimeType.toLowerCase().includes('wav') || hasRiffHeader;
            const finalBuffer = isWav ? rawBuffer : wrapPcm24kMonoToWav(rawBuffer, 24000);
            const payload = {
              audioUrl: `data:audio/wav;base64,${finalBuffer.toString('base64')}`,
              voiceName: chosenVoice,
              provider: `gemini-tts-${cfg.voice.toLowerCase()}`,
            };
            if (vercelTtsCache.size > 120) {
              const oldestKey = vercelTtsCache.keys().next().value;
              if (oldestKey) vercelTtsCache.delete(oldestKey);
            }
            vercelTtsCache.set(cacheKey, payload);
            return res.status(200).json(payload);
          }
        } catch (err: any) {
          const msg = String(err?.message || err);
          const isQuota = msg.includes('429') || String(err?.status) === '429';
          if (isQuota && !cfg.isSecondaryModel) {
            await delay(400);
            continue;
          }
          if (isQuota && cfg.isSecondaryModel) {
            break;
          }
        }
      }
    }

    // 2. Secondary: Optional OpenAI Neural TTS if explicitly configured (preserving gender accuracy)
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
          'persona-clara': 'shimmer',
          'liturgical-deacon': 'onyx',
          'liturgical-monk': 'echo',
          'liturgical-scholar': 'alloy',
        };
        const targetVoice = voiceMap[chosenVoice] || (spec.gender === 'male' ? 'onyx' : 'shimmer');
        const mp3Response = await openai.audio.speech.create({
          model: 'tts-1',
          voice: targetVoice,
          input: cleanText.slice(0, 2000),
          speed: targetVoice === 'onyx' ? 0.88 : 0.95,
        });
        const buffer = Buffer.from(await mp3Response.arrayBuffer());
        const payload = {
          audioUrl: `data:audio/mp3;base64,${buffer.toString('base64')}`,
          voiceName: chosenVoice,
          provider: 'openai-tts',
        };
        return res.status(200).json(payload);
      } catch {
        // Fall through to client Web Speech fallback
      }
    }

    // 3. Last-resort fallback ONLY when no GEMINI_API_KEY is configured and voice is female;
    //    NEVER substitute a robotic female Google Translate voice for a male voice!
    if (!geminiKey && spec.gender === 'female') {
      try {
        const sentences = splitTextIntoSentences(cleanText, 190).slice(0, 15);
        const chunkBuffers = await Promise.all(
          sentences.map(async (chunkText) => {
            const gtUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(chunkText)}&tl=en-US&client=tw-ob`;
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
            provider: 'google-translate-tts-en-US',
          });
        }
      } catch {
        // Fall through
      }
    }

    return res.status(200).json({
      fallbackWebSpeech: true,
      voiceName: chosenVoice,
      gender: spec.gender,
    });
  } catch {
    return res.status(200).json({ fallbackWebSpeech: true, voiceName: 'gemini-Kore', gender: 'female' });
  }
}
