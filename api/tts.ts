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

type GeminiPrebuiltVoice =
  | 'Kore'
  | 'Puck'
  | 'Charon'
  | 'Fenrir'
  | 'Zephyr'
  | 'Aoede'
  | 'Leda'
  | 'Vindemiatrix'
  | 'Despina'
  | 'Orus'
  | 'Algenib'
  | 'Algieba'
  | 'Alnilam'
  | 'Enceladus'
  | 'Iapetus'
  | 'Rasalgethi'
  | 'Sadachbia'
  | 'Sadaltager'
  | 'Schedar'
  | 'Achird'
  | 'Umbriel'
  | 'Zubenelgenubi';

function resolveGeminiTtsVoiceSpec(chosenVoice: string): {
  prebuiltVoice: GeminiPrebuiltVoice;
  style: string;
} {
  const exactSpecs: Record<string, { prebuiltVoice: GeminiPrebuiltVoice; style: string }> = {
    'gemini-Kore': { prebuiltVoice: 'Kore', style: 'Warm, serene, reverent female Catholic lector reading with clear, gentle cadence' },
    Kore: { prebuiltVoice: 'Kore', style: 'Warm, serene, reverent female Catholic lector reading with clear, gentle cadence' },
    'gemini-Puck': { prebuiltVoice: 'Puck', style: 'Bright, articulate, lively tenor reader with clear theological diction' },
    Puck: { prebuiltVoice: 'Puck', style: 'Bright, articulate, lively tenor reader with clear theological diction' },
    'gemini-Charon': { prebuiltVoice: 'Charon', style: 'Deep, solemn, contemplative monastic bass speaking with reverent authority' },
    Charon: { prebuiltVoice: 'Charon', style: 'Deep, solemn, contemplative monastic bass speaking with reverent authority' },
    'gemini-Fenrir': { prebuiltVoice: 'Fenrir', style: 'Warm, resonant Benedictine baritone reading Sacred Scripture steadily' },
    Fenrir: { prebuiltVoice: 'Fenrir', style: 'Warm, resonant Benedictine baritone reading Sacred Scripture steadily' },
    'gemini-Zephyr': { prebuiltVoice: 'Zephyr', style: 'Smooth, balanced, peaceful liturgical reader with gentle phrasing' },
    Zephyr: { prebuiltVoice: 'Zephyr', style: 'Smooth, balanced, peaceful liturgical reader with gentle phrasing' },
    'persona-ava': { prebuiltVoice: 'Aoede', style: 'Gentle, heartfelt, melodic female devotional voice praying softly and unhurriedly' },
    'persona-sonia': { prebuiltVoice: 'Vindemiatrix', style: 'Poised, gentle, mature cathedral nun reading Sacred Scripture with calm reverence' },
    'persona-clara': { prebuiltVoice: 'Leda', style: 'Soft, delicate, meditative contemplative female voice suited for Eucharistic adoration' },
    'persona-grace': { prebuiltVoice: 'Despina', style: 'Warm, smooth, compassionate Catholic narrator telling lives of the saints' },
    'liturgical-deacon': { prebuiltVoice: 'Orus', style: 'Firm, solemn, authoritative Catholic cathedral deacon proclaiming the Holy Gospel' },
    'liturgical-monk': { prebuiltVoice: 'Algenib', style: 'Deep, unhurried, resonant Benedictine abbot reading monastic lectio divina' },
    'liturgical-scholar': { prebuiltVoice: 'Sadaltager', style: 'Knowledgeable, crisp, lucid Catholic theologian explaining Scripture and doctrine' },
    'saint-thomas-aquinas': { prebuiltVoice: 'Orus', style: 'Deep, measured, contemplative medieval Dominican theologian speaking with calm clarity' },
    'saint-john-chrysostom': { prebuiltVoice: 'Rasalgethi', style: 'Eloquent, vibrant golden-mouthed Church Father preaching with spiritual warmth' },
    'saint-augustine': { prebuiltVoice: 'Algenib', style: 'Soulful, gravelly, deeply reflective Latin Church Father speaking with humility and depth' },
    'saint-jerome': { prebuiltVoice: 'Umbriel', style: 'Austere, firm, resonant monastic biblical scholar speaking with conviction' },
    'pope-saint-gregory': { prebuiltVoice: 'Iapetus', style: 'Paternal, solemn, clear Supreme Pontiff speaking with gentle gravity' },
    'saint-ambrose': { prebuiltVoice: 'Algieba', style: 'Smooth, commanding Roman bishop speaking with clarity and apostolic firmness' },
    'saint-cyril': { prebuiltVoice: 'Alnilam', style: 'Authoritative, resolute Eastern Patriarch explaining doctrine clearly' },
    'venerable-bede': { prebuiltVoice: 'Schedar', style: 'Even, serene monastic historian speaking with quiet scholarly devotion' },
    'saint-basil': { prebuiltVoice: 'Enceladus', style: 'Dignified, ascetic Eastern bishop speaking with lucid spiritual wisdom' },
    'cornelius-a-lapide': { prebuiltVoice: 'Sadaltager', style: 'Knowledgeable, illuminating Jesuit biblical exegete explaining Sacred Scripture' },
    'blessed-theophylact': { prebuiltVoice: 'Achird', style: 'Warm, lyrical, reverent Byzantine archbishop offering Gospel commentary' },
    'saint-bonaventure': { prebuiltVoice: 'Sadachbia', style: 'Luminous, devotional Franciscan theologian speaking with seraphic warmth' },
    'saint-alphonsus': { prebuiltVoice: 'Zubenelgenubi', style: 'Earnest, paternal, pastoral Redemptorist doctor speaking tenderly to the heart' },
    'saint-bellarmine': { prebuiltVoice: 'Iapetus', style: 'Authoritative, articulate elderly Italian cardinal apologist explaining Catholic teaching with precision' },
    'saint-albert': { prebuiltVoice: 'Rasalgethi', style: 'Wise, deep-voiced German Dominican philosopher investigating creation with calm depth' },
    'general-lector': { prebuiltVoice: 'Schedar', style: 'Solemn, reverent Catholic patristic lector' },
    'vatican-magisterium': { prebuiltVoice: 'Sadaltager', style: 'Solemn, clear Magisterial reader proclaiming Church teaching' },
  };
  if (exactSpecs[chosenVoice]) return exactSpecs[chosenVoice];

  const lower = (chosenVoice || '').toLowerCase();
  if (lower.includes('augustine') || lower.includes('monk')) {
    return { prebuiltVoice: 'Algenib', style: 'Soulful, deep Catholic patristic voice' };
  }
  if (lower.includes('jerome')) {
    return { prebuiltVoice: 'Umbriel', style: 'Austere, resonant monastic scholar voice' };
  }
  if (lower.includes('cyril')) {
    return { prebuiltVoice: 'Alnilam', style: 'Firm, authoritative Patriarch voice' };
  }
  if (lower.includes('thomas') || lower.includes('deacon')) {
    return { prebuiltVoice: 'Orus', style: 'Measured, firm theological voice' };
  }
  if (lower.includes('gregory') || lower.includes('bellarmine')) {
    return { prebuiltVoice: 'Iapetus', style: 'Paternal, clear ecclesiastical voice' };
  }
  if (lower.includes('chrysostom') || lower.includes('albert')) {
    return { prebuiltVoice: 'Rasalgethi', style: 'Eloquent, scholarly Church Father voice' };
  }
  if (lower.includes('ambrose')) {
    return { prebuiltVoice: 'Algieba', style: 'Smooth, commanding bishop voice' };
  }
  if (lower.includes('basil')) {
    return { prebuiltVoice: 'Enceladus', style: 'Ascetic, contemplative bishop voice' };
  }
  if (lower.includes('bede')) {
    return { prebuiltVoice: 'Schedar', style: 'Even, serene monastic historian voice' };
  }
  if (lower.includes('lapide') || lower.includes('scholar')) {
    return { prebuiltVoice: 'Sadaltager', style: 'Crisp, knowledgeable exegete voice' };
  }
  if (lower.includes('theophylact')) {
    return { prebuiltVoice: 'Achird', style: 'Warm, lyrical Byzantine voice' };
  }
  if (lower.includes('bonaventure')) {
    return { prebuiltVoice: 'Sadachbia', style: 'Luminous, warm Franciscan voice' };
  }
  if (lower.includes('alphonsus')) {
    return { prebuiltVoice: 'Zubenelgenubi', style: 'Earnest, pastoral doctor voice' };
  }
  if (lower.includes('charon')) {
    return { prebuiltVoice: 'Charon', style: 'Deep, solemn Catholic male voice' };
  }
  if (lower.includes('fenrir')) {
    return { prebuiltVoice: 'Fenrir', style: 'Warm Catholic male baritone voice' };
  }
  if (lower.includes('puck')) {
    return { prebuiltVoice: 'Puck', style: 'Crisp, articulate Catholic tenor voice' };
  }
  if (lower.includes('clara')) {
    return { prebuiltVoice: 'Leda', style: 'Soft, serene, contemplative liturgical voice' };
  }
  if (lower.includes('sonia')) {
    return { prebuiltVoice: 'Vindemiatrix', style: 'Calm, mature cathedral contemplative voice' };
  }
  if (lower.includes('grace')) {
    return { prebuiltVoice: 'Despina', style: 'Warm, compassionate Catholic narrator voice' };
  }
  if (lower.includes('ava')) {
    return { prebuiltVoice: 'Aoede', style: 'Gentle, heartfelt female devotional voice' };
  }
  if (lower.includes('zephyr')) {
    return { prebuiltVoice: 'Zephyr', style: 'Smooth, balanced liturgical reader' };
  }
  return { prebuiltVoice: 'Kore', style: 'Warm, serene, reverent female Catholic lector' };
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
    const locale = resolveRegionalLocaleForVoice(chosenVoice);

    // 1. Optional: OpenAI Neural TTS if custom key is provided
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
          'persona-jenny': 'nova',
          'persona-aria': 'alloy',
          'persona-samantha': 'nova',
          'liturgical-deacon': 'onyx',
          'liturgical-monk': 'echo',
          'liturgical-scholar': 'alloy',
        };
        const targetVoice = voiceMap[chosenVoice] || 'shimmer';
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

    // 2. Primary: Gemini Neural TTS (v1alpha for speechMetadata & speechConfig)
    if (process.env.GEMINI_API_KEY) {
      const spec = resolveGeminiTtsVoiceSpec(chosenVoice);
      const textSnippet = cleanText.slice(0, 1800);
      const isCoreVoice = ['Kore', 'Puck', 'Charon', 'Fenrir', 'Zephyr'].includes(spec.prebuiltVoice);
      const isFemaleVoice = ['Aoede', 'Leda', 'Vindemiatrix', 'Despina', 'Kore', 'Zephyr'].includes(spec.prebuiltVoice);
      const safeCoreVoice = isFemaleVoice ? 'Kore' : 'Charon';

      const isSaintOrCustomPersona =
        chosenVoice.startsWith('saint-') ||
        chosenVoice.startsWith('pope-') ||
        chosenVoice.startsWith('venerable-') ||
        chosenVoice.startsWith('cornelius-') ||
        chosenVoice.startsWith('blessed-') ||
        chosenVoice.startsWith('persona-') ||
        chosenVoice.startsWith('liturgical-') ||
        chosenVoice === 'vatican-magisterium' ||
        chosenVoice === 'general-lector';

      const primaryModel = isSaintOrCustomPersona ? 'gemini-3.8-flash-tts' : 'gemini-3.8-flash-lite-tts';
      const secondaryModel = isSaintOrCustomPersona ? 'gemini-3.8-flash-lite-tts' : 'gemini-3.8-flash-tts';

      const attempts: Array<{ model: string; voice: string; isSecondaryModel?: boolean }> = [
        { model: primaryModel, voice: spec.prebuiltVoice },
        { model: secondaryModel, voice: spec.prebuiltVoice, isSecondaryModel: true },
        ...(!isCoreVoice ? [{ model: primaryModel, voice: safeCoreVoice }] : []),
      ];

      for (const cfg of attempts) {
        try {
          const ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY,
            apiVersion: 'v1alpha',
            httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
          });
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
            return res.status(200).json({
              audioUrl: `data:audio/wav;base64,${finalBuffer.toString('base64')}`,
              voiceName: chosenVoice,
              provider: `gemini-tts-${cfg.voice.toLowerCase()}`,
            });
          }
        } catch (err: any) {
          const isQuota = String(err?.message || err).includes('429') || String(err?.status) === '429';
          if (cfg.isSecondaryModel && isQuota) break;
          if (!cfg.isSecondaryModel && isQuota) continue;
        }
      }
    }

    // 3. Fallback: Multi-Regional Neural TTS
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
