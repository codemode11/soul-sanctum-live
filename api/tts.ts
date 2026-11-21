import { GoogleGenAI } from '@google/genai';
import OpenAI from 'openai';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

const vercelTtsCache = new Map<string, { audioUrl: string; voiceName: string; provider: string }>();
const geminiModelCooldownUntil: Record<string, number> = {};

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

function escapeXmlForSsml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

interface UnifiedVoiceSpec {
  edgeVoice: string;
  edgeRate?: string;
  edgePitch?: string;
  geminiVoice?: 'Kore' | 'Aoede' | 'Leda' | 'Vindemiatrix' | 'Despina' | 'Zephyr' | 'Orus' | 'Algenib' | 'Charon' | 'Fenrir' | 'Puck';
  geminiStyle: string;
  preferGeminiFirst?: boolean;
  gender: 'female' | 'male';
}

function resolveUnifiedVoiceSpec(chosenVoice: string): UnifiedVoiceSpec {
  const exactSpecs: Record<string, UnifiedVoiceSpec> = {
    // Default Website Voice: Kore (tries Gemini Kore first when quota is available, seamless Edge MichelleNeural fallback)
    'gemini-Kore': {
      edgeVoice: 'en-US-MichelleNeural',
      edgeRate: '-4%',
      edgePitch: '+0Hz',
      geminiVoice: 'Kore',
      preferGeminiFirst: true,
      gender: 'female',
      geminiStyle: 'Warm, serene, reverent female Catholic lector reading with clear, gentle cadence',
    },
    Kore: {
      edgeVoice: 'en-US-MichelleNeural',
      edgeRate: '-4%',
      edgePitch: '+0Hz',
      geminiVoice: 'Kore',
      preferGeminiFirst: true,
      gender: 'female',
      geminiStyle: 'Warm, serene, reverent female Catholic lector reading with clear, gentle cadence',
    },

    // Female Studio Neural Voices (7 genuinely distinct speakers)
    'persona-ava': {
      edgeVoice: 'en-US-AvaNeural',
      edgeRate: '-5%',
      edgePitch: '+1Hz',
      geminiVoice: 'Aoede',
      gender: 'female',
      geminiStyle: 'Gentle, heartfelt, melodic female devotional voice',
    },
    'persona-emma': {
      edgeVoice: 'en-US-EmmaNeural',
      edgeRate: '-4%',
      edgePitch: '+0Hz',
      geminiVoice: 'Aoede',
      gender: 'female',
      geminiStyle: 'Clear, heartfelt warm American Catholic reader',
    },
    'persona-sonia': {
      edgeVoice: 'en-GB-SoniaNeural',
      edgeRate: '-5%',
      edgePitch: '+0Hz',
      geminiVoice: 'Vindemiatrix',
      gender: 'female',
      geminiStyle: 'Poised, gentle British cathedral sister reading Sacred Scripture',
    },
    'persona-clara': {
      edgeVoice: 'en-CA-ClaraNeural',
      edgeRate: '-6%',
      edgePitch: '+0Hz',
      geminiVoice: 'Leda',
      gender: 'female',
      geminiStyle: 'Soft, delicate, meditative contemplative female voice',
    },
    'persona-grace': {
      edgeVoice: 'en-IE-EmilyNeural',
      edgeRate: '-4%',
      edgePitch: '+0Hz',
      geminiVoice: 'Despina',
      gender: 'female',
      geminiStyle: 'Warm, lyrical Irish pastoral narrator',
    },
    'persona-jenny': {
      edgeVoice: 'en-US-JennyNeural',
      edgeRate: '-3%',
      edgePitch: '+0Hz',
      geminiVoice: 'Kore',
      gender: 'female',
      geminiStyle: 'Crisp, articulate liturgical narrator',
    },
    'gemini-Zephyr': {
      edgeVoice: 'en-US-AriaNeural',
      edgeRate: '-4%',
      edgePitch: '+0Hz',
      geminiVoice: 'Zephyr',
      gender: 'female',
      geminiStyle: 'Smooth, balanced, peaceful liturgical reader',
    },
    Zephyr: {
      edgeVoice: 'en-US-AriaNeural',
      edgeRate: '-4%',
      edgePitch: '+0Hz',
      geminiVoice: 'Zephyr',
      gender: 'female',
      geminiStyle: 'Smooth, balanced, peaceful liturgical reader',
    },

    // Male Studio Neural Voices (7 genuinely distinct speakers)
    'liturgical-deacon': {
      edgeVoice: 'en-US-ChristopherNeural',
      edgeRate: '-6%',
      edgePitch: '-2Hz',
      geminiVoice: 'Orus',
      gender: 'male',
      geminiStyle: 'Firm, solemn Catholic cathedral deacon proclaiming the Holy Gospel',
    },
    'liturgical-monk': {
      edgeVoice: 'en-US-AndrewNeural',
      edgeRate: '-6%',
      edgePitch: '-2Hz',
      geminiVoice: 'Algenib',
      gender: 'male',
      geminiStyle: 'Warm, contemplative Benedictine abbot reading monastic lectio divina',
    },
    'liturgical-scholar': {
      edgeVoice: 'en-US-BrianNeural',
      edgeRate: '-3%',
      edgePitch: '+0Hz',
      geminiVoice: 'Fenrir',
      gender: 'male',
      geminiStyle: 'Crisp, lucid Catholic theologian explaining Scripture and doctrine',
    },
    'gemini-Charon': {
      edgeVoice: 'en-GB-ThomasNeural',
      edgeRate: '-7%',
      edgePitch: '-3Hz',
      geminiVoice: 'Charon',
      gender: 'male',
      geminiStyle: 'Deep, solemn, contemplative British monastic bass',
    },
    Charon: {
      edgeVoice: 'en-GB-ThomasNeural',
      edgeRate: '-7%',
      edgePitch: '-3Hz',
      geminiVoice: 'Charon',
      gender: 'male',
      geminiStyle: 'Deep, solemn, contemplative British monastic bass',
    },
    'gemini-Fenrir': {
      edgeVoice: 'en-GB-RyanNeural',
      edgeRate: '-5%',
      edgePitch: '-2Hz',
      geminiVoice: 'Fenrir',
      gender: 'male',
      geminiStyle: 'Warm, resonant British cathedral baritone',
    },
    Fenrir: {
      edgeVoice: 'en-GB-RyanNeural',
      edgeRate: '-5%',
      edgePitch: '-2Hz',
      geminiVoice: 'Fenrir',
      gender: 'male',
      geminiStyle: 'Warm, resonant British cathedral baritone',
    },
    'gemini-Puck': {
      edgeVoice: 'en-US-GuyNeural',
      edgeRate: '-2%',
      edgePitch: '+1Hz',
      geminiVoice: 'Puck',
      gender: 'male',
      geminiStyle: 'Expressive, articulate American tenor reader',
    },
    Puck: {
      edgeVoice: 'en-US-GuyNeural',
      edgeRate: '-2%',
      edgePitch: '+1Hz',
      geminiVoice: 'Puck',
      gender: 'male',
      geminiStyle: 'Expressive, articulate American tenor reader',
    },
    'liturgical-connor': {
      edgeVoice: 'en-IE-ConnorNeural',
      edgeRate: '-5%',
      edgePitch: '-1Hz',
      geminiVoice: 'Algenib',
      gender: 'male',
      geminiStyle: 'Warm, pastoral Irish priest voice',
    },

    // Church Father & Saint Personas (21 distinct live-verified neural male voices — zero overlap across major Catena Aurea Fathers)
    'saint-thomas-aquinas': {
      edgeVoice: 'en-US-ChristopherNeural',
      edgeRate: '-7%',
      edgePitch: '-2Hz',
      geminiVoice: 'Orus',
      gender: 'male',
      geminiStyle: 'Deep, measured medieval Dominican theologian',
    },
    'saint-john-chrysostom': {
      edgeVoice: 'en-US-GuyNeural',
      edgeRate: '-2%',
      edgePitch: '+1Hz',
      geminiVoice: 'Puck',
      gender: 'male',
      geminiStyle: 'Eloquent golden-mouthed Church Father',
    },
    'saint-augustine': {
      edgeVoice: 'en-US-AndrewNeural',
      edgeRate: '-7%',
      edgePitch: '-2Hz',
      geminiVoice: 'Algenib',
      gender: 'male',
      geminiStyle: 'Soulful, deeply reflective Latin Church Father',
    },
    'saint-ambrose': {
      edgeVoice: 'en-US-EricNeural',
      edgeRate: '-4%',
      edgePitch: '-1Hz',
      geminiVoice: 'Orus',
      gender: 'male',
      geminiStyle: 'Commanding Roman bishop speaking with clarity',
    },
    'venerable-bede': {
      edgeVoice: 'en-GB-RyanNeural',
      edgeRate: '-5%',
      edgePitch: '-1Hz',
      geminiVoice: 'Fenrir',
      gender: 'male',
      geminiStyle: 'Warm, serene Anglo-Saxon monastic historian',
    },
    'pope-saint-gregory': {
      edgeVoice: 'en-US-RogerNeural',
      edgeRate: '-6%',
      edgePitch: '-2Hz',
      geminiVoice: 'Fenrir',
      gender: 'male',
      geminiStyle: 'Paternal, solemn Supreme Pontiff',
    },
    'saint-cyril': {
      edgeVoice: 'en-ZA-LukeNeural',
      edgeRate: '-5%',
      edgePitch: '-2Hz',
      geminiVoice: 'Charon',
      gender: 'male',
      geminiStyle: 'Authoritative Alexandrian Patriarch',
    },
    'blessed-theophylact': {
      edgeVoice: 'en-IE-ConnorNeural',
      edgeRate: '-4%',
      edgePitch: '+0Hz',
      geminiVoice: 'Puck',
      gender: 'male',
      geminiStyle: 'Warm, lyrical Byzantine archbishop',
    },
    'saint-jerome': {
      edgeVoice: 'en-GB-ThomasNeural',
      edgeRate: '-6%',
      edgePitch: '-3Hz',
      geminiVoice: 'Charon',
      gender: 'male',
      geminiStyle: 'Austere, firm monastic biblical scholar',
    },
    'saint-hilary': {
      edgeVoice: 'en-CA-LiamNeural',
      edgeRate: '-5%',
      edgePitch: '-1Hz',
      geminiVoice: 'Orus',
      gender: 'male',
      geminiStyle: 'Lucid, steadfast Gallic Doctor of the Church',
    },
    'father-titus-of-bostra': {
      edgeVoice: 'en-NZ-MitchellNeural',
      edgeRate: '-5%',
      edgePitch: '-1Hz',
      geminiVoice: 'Fenrir',
      gender: 'male',
      geminiStyle: 'Measured, earnest Eastern scriptural exegete',
    },
    'father-origen': {
      edgeVoice: 'en-US-SteffanNeural',
      edgeRate: '-4%',
      edgePitch: '+0Hz',
      geminiVoice: 'Puck',
      gender: 'male',
      geminiStyle: 'Analytical, articulate Alexandrian scholar',
    },
    'saint-basil': {
      edgeVoice: 'en-AU-WilliamNeural',
      edgeRate: '-6%',
      edgePitch: '-2Hz',
      geminiVoice: 'Algenib',
      gender: 'male',
      geminiStyle: 'Dignified Cappadocian Father and bishop',
    },
    'cornelius-a-lapide': {
      edgeVoice: 'en-US-BrianNeural',
      edgeRate: '-4%',
      edgePitch: '+0Hz',
      geminiVoice: 'Orus',
      gender: 'male',
      geminiStyle: 'Illuminating Jesuit biblical exegete',
    },
    'father-alcuin': {
      edgeVoice: 'en-HK-SamNeural',
      edgeRate: '-5%',
      edgePitch: '-1Hz',
      geminiVoice: 'Fenrir',
      gender: 'male',
      geminiStyle: 'Clear Carolingian monastic scholar of York',
    },
    'father-rabanus': {
      edgeVoice: 'en-SG-WayneNeural',
      edgeRate: '-5%',
      edgePitch: '-2Hz',
      geminiVoice: 'Algenib',
      gender: 'male',
      geminiStyle: 'Measured Benedictine abbot and exegete',
    },
    'pope-saint-leo': {
      edgeVoice: 'en-US-ChristopherNeural',
      edgeRate: '-5%',
      edgePitch: '-3Hz',
      geminiVoice: 'Orus',
      gender: 'male',
      geminiStyle: 'Majestic Roman Pontiff and Doctor of the Church',
    },
    'father-eusebius': {
      edgeVoice: 'en-IN-PrabhatNeural',
      edgeRate: '-5%',
      edgePitch: '-1Hz',
      geminiVoice: 'Algenib',
      gender: 'male',
      geminiStyle: 'Thoughtful patristic Church historian',
    },
    'saint-cyprian': {
      edgeVoice: 'en-KE-ChilembaNeural',
      edgeRate: '-5%',
      edgePitch: '-1Hz',
      geminiVoice: 'Charon',
      gender: 'male',
      geminiStyle: 'Deep, steadfast North African bishop and martyr',
    },
    'saint-athanasius': {
      edgeVoice: 'en-NG-AbeoNeural',
      edgeRate: '-5%',
      edgePitch: '-1Hz',
      geminiVoice: 'Orus',
      gender: 'male',
      geminiStyle: 'Resolute Alexandrian defender of Nicene orthodoxy',
    },
    'saint-gregory-nyssa': {
      edgeVoice: 'en-TZ-ElimuNeural',
      edgeRate: '-6%',
      edgePitch: '-1Hz',
      geminiVoice: 'Algenib',
      gender: 'male',
      geminiStyle: 'Mystical Cappadocian contemplative bishop',
    },
    'saint-bernard': {
      edgeVoice: 'en-PH-JamesNeural',
      edgeRate: '-5%',
      edgePitch: '-1Hz',
      geminiVoice: 'Fenrir',
      gender: 'male',
      geminiStyle: 'Warm, devotional Cistercian Mellifluous Doctor',
    },
    'saint-bonaventure': {
      edgeVoice: 'en-PH-JamesNeural',
      edgeRate: '-4%',
      edgePitch: '+0Hz',
      geminiVoice: 'Fenrir',
      gender: 'male',
      geminiStyle: 'Devotional Franciscan Seraphic Doctor',
    },
    'saint-alphonsus': {
      edgeVoice: 'en-HK-SamNeural',
      edgeRate: '-6%',
      edgePitch: '-1Hz',
      geminiVoice: 'Algenib',
      gender: 'male',
      geminiStyle: 'Pastoral Redemptorist doctor',
    },
    'saint-bellarmine': {
      edgeVoice: 'en-US-SteffanNeural',
      edgeRate: '-5%',
      edgePitch: '-2Hz',
      geminiVoice: 'Orus',
      gender: 'male',
      geminiStyle: 'Articulate cardinal apologist',
    },
    'saint-albert': {
      edgeVoice: 'en-AU-WilliamNeural',
      edgeRate: '-7%',
      edgePitch: '-3Hz',
      geminiVoice: 'Charon',
      gender: 'male',
      geminiStyle: 'Wise Dominican philosopher',
    },
    'general-lector': {
      edgeVoice: 'en-US-ChristopherNeural',
      edgeRate: '-5%',
      edgePitch: '-1Hz',
      geminiVoice: 'Orus',
      gender: 'male',
      geminiStyle: 'Solemn Catholic patristic lector',
    },
    'vatican-magisterium': {
      edgeVoice: 'en-GB-RyanNeural',
      edgeRate: '-5%',
      edgePitch: '-2Hz',
      geminiVoice: 'Fenrir',
      gender: 'male',
      geminiStyle: 'Clear Magisterial reader',
    },
  };

  if (exactSpecs[chosenVoice]) return exactSpecs[chosenVoice];

  const lower = (chosenVoice || '').toLowerCase();
  if (lower.includes('nyssa') || lower.includes('nazianzen')) return exactSpecs['saint-gregory-nyssa'];
  if (lower.includes('chrysostom')) return exactSpecs['saint-john-chrysostom'];
  if (lower.includes('augustine')) return exactSpecs['saint-augustine'];
  if (lower.includes('ambrose')) return exactSpecs['saint-ambrose'];
  if (lower.includes('bede')) return exactSpecs['venerable-bede'];
  if (lower.includes('leo')) return exactSpecs['pope-saint-leo'];
  if (lower.includes('gregory')) return exactSpecs['pope-saint-gregory'];
  if (lower.includes('cyril')) return exactSpecs['saint-cyril'];
  if (lower.includes('theophylact')) return exactSpecs['blessed-theophylact'];
  if (lower.includes('jerome')) return exactSpecs['saint-jerome'];
  if (lower.includes('hilary')) return exactSpecs['saint-hilary'];
  if (lower.includes('titus')) return exactSpecs['father-titus-of-bostra'];
  if (lower.includes('origen')) return exactSpecs['father-origen'];
  if (lower.includes('basil')) return exactSpecs['saint-basil'];
  if (lower.includes('lapide')) return exactSpecs['cornelius-a-lapide'];
  if (lower.includes('alcuin')) return exactSpecs['father-alcuin'];
  if (lower.includes('rabanus')) return exactSpecs['father-rabanus'];
  if (lower.includes('eusebius')) return exactSpecs['father-eusebius'];
  if (lower.includes('cyprian')) return exactSpecs['saint-cyprian'];
  if (lower.includes('athanasius')) return exactSpecs['saint-athanasius'];
  if (lower.includes('bernard')) return exactSpecs['saint-bernard'];
  if (lower.includes('aquinas') || lower.includes('thomas')) return exactSpecs['saint-thomas-aquinas'];
  if (lower.includes('bonaventure')) return exactSpecs['saint-bonaventure'];
  if (lower.includes('alphonsus')) return exactSpecs['saint-alphonsus'];
  if (lower.includes('bellarmine')) return exactSpecs['saint-bellarmine'];
  if (lower.includes('albert')) return exactSpecs['saint-albert'];
  if (lower.includes('magisterium') || lower.includes('catechism') || lower.includes('vatican')) return exactSpecs['vatican-magisterium'];
  if (lower.includes('david') || lower.includes('deacon')) {
    return exactSpecs['liturgical-deacon'];
  }
  if (lower.includes('monk') || lower.includes('andrew')) {
    return exactSpecs['liturgical-monk'];
  }
  if (lower.includes('scholar') || lower.includes('brian')) {
    return exactSpecs['liturgical-scholar'];
  }
  if (lower.includes('charon')) {
    return exactSpecs['gemini-Charon'];
  }
  if (lower.includes('fenrir') || lower.includes('ryan')) {
    return exactSpecs['gemini-Fenrir'];
  }
  if (lower.includes('puck') || lower.includes('guy')) {
    return exactSpecs['gemini-Puck'];
  }
  if (lower.includes('connor')) {
    return exactSpecs['liturgical-connor'];
  }
  if (lower.includes('sonia')) return exactSpecs['persona-sonia'];
  if (lower.includes('clara')) return exactSpecs['persona-clara'];
  if (lower.includes('grace') || lower.includes('emily')) return exactSpecs['persona-grace'];
  if (lower.includes('emma')) return exactSpecs['persona-emma'];
  if (lower.includes('jenny')) return exactSpecs['persona-jenny'];
  if (lower.includes('zephyr') || lower.includes('aria')) return exactSpecs['gemini-Zephyr'];
  if (lower.includes('ava')) return exactSpecs['persona-ava'];
  if (lower.includes('kore')) return exactSpecs['gemini-Kore'];

  return exactSpecs['persona-jenny'];
}

async function synthesizeWithEdgeNeuralTts(
  text: string,
  voiceName: string,
  rate?: string,
  pitch?: string
): Promise<Buffer | null> {
  const normalizedText = text
    .replace(/\bSts\.\s+(?=[A-Za-z])/gi, 'Saints ')
    .replace(/\bSS\.\s+(?=[A-Z])/g, 'Saints ')
    .replace(/\bSt\.\s+(?=[A-Za-z])/gi, 'Saint ')
    .replace(/\bBl\.\s+(?=[A-Za-z])/gi, 'Blessed ')
    .replace(/\b(?:Blessed|BLESSED)(?=\s+[A-Z])/g, 'Blessid')
    .replace(/\bblessed(?=\s+(?:are|is|be|art)\b)/gi, 'Blessid')
    .replace(
      /\b(the|a|an|our|my|thy|your|his|her|their|this|that|these|those|most|ever|all|thrice|o|oh)\s+blessed\b/gi,
      '$1 blessid'
    )
    .replace(
      /\bblessed(?=\s+(?:virgin|mother|lady|sacrament|trinity|hope|life|soul|souls|martyrs|apostles|saints|angels|fruit|womb|cross|passion|memory|peace|vision|repose|foundation|doorkeeper|theophylact|lord|god|name|queen|heart)\b)/gi,
      'blessid'
    );
  const safeText = escapeXmlForSsml(normalizedText.slice(0, 1200));
  if (!safeText.trim()) return null;

  for (let attempt = 0; attempt < 2; attempt++) {
    const tts = new MsEdgeTTS({ connectionTimeoutMs: 6000, synthesisTimeoutMs: 12000 });
    try {
      await tts.setMetadata(voiceName, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
      const { audioStream } = tts.toStream(safeText, {
        ...(rate ? { rate } : {}),
        ...(pitch ? { pitch } : {}),
      });
      const chunks: Buffer[] = [];
      await new Promise<void>((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('Edge TTS timeout')), 12000);
        audioStream.on('data', (chunk: Buffer) => chunks.push(chunk));
        audioStream.on('end', () => {
          clearTimeout(timer);
          resolve();
        });
        audioStream.on('error', (err: Error) => {
          clearTimeout(timer);
          reject(err);
        });
      });
      const fullBuf = Buffer.concat(chunks);
      if (fullBuf.length > 200) {
        return fullBuf;
      }
    } catch {
      if (attempt === 0) {
        await new Promise(resolve => setTimeout(resolve, 250));
      }
    } finally {
      try {
        tts.close();
      } catch {}
    }
  }
  return null;
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
    const { text, voiceName = 'persona-jenny', apiKey } = body;

    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ error: 'Text prompt is required for TTS.' });
    }

    const chosenVoice = voiceName || 'persona-jenny';
    const cleanText = text.replace(/<[^>]*>/g, '').replace(/[*_#]/g, '').trim();
    const spec = resolveUnifiedVoiceSpec(chosenVoice);
    const cacheLimit = spec.preferGeminiFirst ? 2200 : 1200;
    const cacheKey = `tts:v9:${chosenVoice}:${cleanText.slice(0, cacheLimit)}`;

    const cached = vercelTtsCache.get(cacheKey);
    if (cached) {
      return res.status(200).json(cached);
    }

    const saveCache = (payload: { audioUrl: string; voiceName: string; provider: string }) => {
      if (vercelTtsCache.size > 150) {
        const oldestKey = vercelTtsCache.keys().next().value;
        if (oldestKey) vercelTtsCache.delete(oldestKey);
      }
      vercelTtsCache.set(cacheKey, payload);
      return payload;
    };

    // 1. For default Kore voice: render authentic Gemini Kore (pure prebuilt voice without style distortion).
    //    Uses separate short RPM cooldowns for flash-lite-tts and flash-tts so a burst on one pool seamlessly
    //    uses the second authentic Gemini Kore pool instead of switching voices.
    const geminiKey = process.env.GEMINI_API_KEY;
    if (spec.preferGeminiFirst && geminiKey) {
      const ai = new GoogleGenAI({
        apiKey: geminiKey,
        apiVersion: 'v1alpha',
        httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
      });
      for (const model of ['gemini-3.8-flash-lite-tts', 'gemini-3.8-flash-tts']) {
        if (Date.now() < (geminiModelCooldownUntil[model] || 0)) {
          continue;
        }
        try {
          const ttsResponse = await ai.models.generateContent({
            model,
            contents: [
              {
                role: 'user',
                parts: [{ text: cleanText.slice(0, 2200) }],
              },
            ],
            config: {
              responseModalities: ['AUDIO'],
              speechConfig: {
                voiceConfig: { prebuiltVoiceConfig: { voiceName: spec.geminiVoice || 'Kore' } },
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
            return res.status(200).json(
              saveCache({
                audioUrl: `data:audio/wav;base64,${finalBuffer.toString('base64')}`,
                voiceName: chosenVoice,
                provider: `gemini-tts-${(spec.geminiVoice || 'kore').toLowerCase()}-${model.includes('lite') ? 'lite' : 'flash'}`,
              })
            );
          }
        } catch (err: any) {
          const msg = String(err?.message || err);
          if (msg.includes('429') || String(err?.status) === '429') {
            geminiModelCooldownUntil[model] = Date.now() + 25 * 1000;
          }
        }
      }
    }

    // 2. Primary Unlimited Multi-Voice Studio Engine: Microsoft Edge Neural TTS (distinct human neural voices, zero quota limits)
    let edgeBuffer = await synthesizeWithEdgeNeuralTts(
      cleanText,
      spec.edgeVoice,
      spec.edgeRate,
      spec.edgePitch
    );
    let usedEdgeVoice = spec.edgeVoice;
    if (!edgeBuffer) {
      const backupEdgeVoice = spec.gender === 'male' ? 'en-US-ChristopherNeural' : 'en-US-AriaNeural';
      if (backupEdgeVoice !== spec.edgeVoice) {
        edgeBuffer = await synthesizeWithEdgeNeuralTts(
          cleanText,
          backupEdgeVoice,
          spec.edgeRate,
          spec.edgePitch
        );
        usedEdgeVoice = backupEdgeVoice;
      }
    }
    if (edgeBuffer) {
      return res.status(200).json(
        saveCache({
          audioUrl: `data:audio/mp3;base64,${edgeBuffer.toString('base64')}`,
          voiceName: chosenVoice,
          provider: `edge-neural-${usedEdgeVoice.toLowerCase()}`,
        })
      );
    }

    // 3. Secondary Fallback: Optional OpenAI Neural TTS if configured
    const openAiKey = apiKey || process.env.OPENAI_API_KEY;
    if (openAiKey) {
      try {
        const openai = new OpenAI({ apiKey: openAiKey });
        const targetVoice = spec.gender === 'male' ? 'onyx' : 'shimmer';
        const mp3Response = await openai.audio.speech.create({
          model: 'tts-1',
          voice: targetVoice,
          input: cleanText.slice(0, 1500),
          speed: targetVoice === 'onyx' ? 0.88 : 0.95,
        });
        const buffer = Buffer.from(await mp3Response.arrayBuffer());
        return res.status(200).json(
          saveCache({
            audioUrl: `data:audio/mp3;base64,${buffer.toString('base64')}`,
            voiceName: chosenVoice,
            provider: 'openai-tts',
          })
        );
      } catch {
        // Fall through
      }
    }

    // 4. Clean gender-matched client Web Speech fallback
    return res.status(200).json({
      fallbackWebSpeech: true,
      voiceName: chosenVoice,
      gender: spec.gender,
    });
  } catch {
    return res.status(200).json({ fallbackWebSpeech: true, voiceName: 'persona-jenny', gender: 'female' });
  }
}
