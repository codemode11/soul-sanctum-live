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
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

import {
  cleanUserQuestion,
  isEssayRequest,
  searchCatholicInternet,
  WebResearchSource,
} from './src/utils/catholicInternetResearch.js';
import { fetchLiveCatholicFacebookPosts } from './src/utils/catholicFacebookFeedServer.js';

app.get('/api/catholic-ai/health', (_req, res) => {
  res.json({
    status: 'ok',
    defaultProvider: 'openai',
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
    hasOpenAIKey: !!process.env.OPENAI_API_KEY,
    supportedProviders: ['openai', 'gemini', 'auto'],
    supportedAiTtsVoices: [
      'Puck',
      'Charon',
      'Kore',
      'Fenrir',
      'Zephyr',
      'persona-ava',
      'persona-sonia',
      'persona-clara',
      'persona-grace',
      'liturgical-deacon',
      'liturgical-monk',
      'liturgical-scholar',
    ],
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
const geminiModelCooldownUntil: Record<string, number> = {};

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

  if (exactSpecs[chosenVoice]) {
    return exactSpecs[chosenVoice];
  }

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
    } catch (err: any) {
      if (attempt === 0) {
        await new Promise(resolve => setTimeout(resolve, 250));
      } else {
        console.warn(`[TTS] Edge Neural TTS failed for ${voiceName}:`, err?.message || err);
      }
    } finally {
      try {
        tts.close();
      } catch {}
    }
  }
  return null;
}

// Dedicated Multi-Voice Text-to-Speech Endpoint (Gemini Kore primary + Unlimited Microsoft Edge Neural TTS -> OpenAI TTS -> Clean Gender-Matched Web Speech Fallback)
app.post('/api/tts', async (req, res) => {
  try {
    const { text, voiceName = 'persona-jenny', apiKey } = req.body || {};
    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ error: 'Text prompt is required for TTS.' });
    }

    const chosenVoice = voiceName || 'persona-jenny';
    const cleanText = text.replace(/<[^>]*>/g, '').replace(/[*_#]/g, '').trim();
    const spec = resolveUnifiedVoiceSpec(chosenVoice);
    const cacheLimit = spec.preferGeminiFirst ? 2200 : 1200;
    const cacheKey = `tts:v9:${chosenVoice}:${cleanText.slice(0, cacheLimit)}`;

    const cached = ttsMemoryCache.get(cacheKey);
    if (cached) {
      return res.json(cached);
    }

    const saveCache = (payload: { audioUrl: string; voiceName: string; provider: string }) => {
      if (ttsMemoryCache.size > 300) {
        const oldestKey = ttsMemoryCache.keys().next().value;
        if (oldestKey) ttsMemoryCache.delete(oldestKey);
      }
      ttsMemoryCache.set(cacheKey, payload);
      return payload;
    };

    // 1. For default Kore voice: render authentic Gemini Kore (pure prebuilt voice without style distortion).
    //    Uses separate short RPM cooldowns for flash-lite-tts and flash-tts so a burst on one pool seamlessly
    //    uses the second authentic Gemini Kore pool instead of switching voices.
    if (spec.preferGeminiFirst && process.env.GEMINI_API_KEY) {
      const aiClient = getGenAI('v1alpha');
      for (const model of ['gemini-3.8-flash-lite-tts', 'gemini-3.8-flash-tts']) {
        if (Date.now() < (geminiModelCooldownUntil[model] || 0)) {
          continue;
        }
        try {
          const ttsResponse = await aiClient.models.generateContent({
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
                voiceConfig: {
                  prebuiltVoiceConfig: {
                    voiceName: spec.geminiVoice || 'Kore',
                  },
                },
              },
            },
          });

          const inlinePart = ttsResponse.candidates?.[0]?.content?.parts?.find(
            (p: any) => p?.inlineData?.data
          );
          if (inlinePart?.inlineData?.data) {
            const rawBuffer = Buffer.from(inlinePart.inlineData.data, 'base64');
            const mimeType = inlinePart.inlineData.mimeType || '';
            const hasRiffHeader = rawBuffer.length >= 4 && rawBuffer.subarray(0, 4).toString('ascii') === 'RIFF';
            const isWav = mimeType.toLowerCase().includes('wav') || hasRiffHeader;
            const finalBuffer = isWav ? rawBuffer : wrapPcm24kMonoToWav(rawBuffer, 24000);
            return res.json(
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
            console.warn(`[TTS] ${model} RPM/quota pause (25s); trying next authentic Gemini Kore model.`);
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
      return res.json(
        saveCache({
          audioUrl: `data:audio/mp3;base64,${edgeBuffer.toString('base64')}`,
          voiceName: chosenVoice,
          provider: `edge-neural-${usedEdgeVoice.toLowerCase()}`,
        })
      );
    }

    // 3. Secondary: Optional OpenAI Neural TTS if explicitly supplied or configured (preserving gender)
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
        return res.json(
          saveCache({
            audioUrl: `data:audio/mp3;base64,${buffer.toString('base64')}`,
            voiceName: chosenVoice,
            provider: 'openai-tts',
          })
        );
      } catch (err: any) {
        console.warn('[TTS] OpenAI Neural TTS skipped:', err?.message || err);
      }
    }

    // 4. Clean gender-matched fallback to client Web Speech API
    return res.json({ fallbackWebSpeech: true, voiceName: chosenVoice, gender: spec.gender });
  } catch (err: any) {
    console.warn('[TTS] Server TTS fallback:', err?.message || err);
    return res.json({ fallbackWebSpeech: true, voiceName: req.body?.voiceName || 'persona-jenny', gender: 'female' });
  }
});

// Dedicated Magisterium AI Endpoint (Official Magisterium AI Chat Completions API: magisterium-1)
const MAGISTERIUM_API_URL = 'https://www.magisterium.com/api/v1/chat/completions';
const MAGISTERIAL_FALLBACK_INSTRUCTION = `You are a Catholic Magisterial research scholar operating inside Soul Sanctum's Magisterium AI module.
Ground every response faithfully in the authentic Magisterium of the Catholic Church:
- The Catechism of the Catholic Church (cite exact paragraph numbers, e.g. CCC 1374)
- The 1983 Code of Canon Law (cite exact canons, e.g. Can. 916)
- Ecumenical Councils (Nicaea, Chalcedon, Trent, Vatican I, Vatican II constitutions such as Lumen Gentium, Dei Verbum, Gaudium et Spes, Sacrosanctum Concilium)
- Papal Encyclicals, Apostolic Exhortations, and Vatican Dicastery documents
- Sacred Scripture (Catholic 73-book canon) and the Church Fathers & Doctors of the Church

Return ONLY valid JSON with this exact schema (no markdown code fences around the JSON):
{
  "reply": "Clear, reverent, well-structured Markdown answer with headings, paragraphs, and inline references (e.g. CCC 1374, Dei Verbum 9).",
  "citations": [
    {
      "documentTitle": "Official Church document title (e.g. Catechism of the Catholic Church)",
      "documentAuthor": "Author or promulgating authority (e.g. Pope St. John Paul II / Holy See)",
      "documentYear": "Year (e.g. 1992)",
      "documentReference": "Exact paragraph, canon, or section (e.g. CCC 1374)",
      "citedText": "Brief authentic summary or exact quotation from this Magisterial passage.",
      "sourceUrl": "Official Vatican URL if well-known (e.g. https://www.vatican.va/...), or empty string"
    }
  ],
  "relatedQuestions": [
    "Follow-up theological question 1?",
    "Follow-up theological question 2?",
    "Follow-up theological question 3?"
  ]
}
Include 3 to 5 accurate Magisterial citations and 3 thoughtful related follow-up questions.`;

function normalizeMagisteriumCitations(rawCitations: unknown) {
  if (!Array.isArray(rawCitations)) return [];
  const results: Array<{
    citedText: string;
    documentTitle: string;
    documentAuthor?: string;
    documentYear?: string;
    documentReference?: string;
    sourceUrl?: string;
  }> = [];

  for (const item of rawCitations) {
    if (!item || typeof item !== 'object') continue;
    const c = item as Record<string, any>;
    const documentTitle = String(c.document_title || c.documentTitle || c.title || c.source_title || '').trim();
    const citedText = String(c.cited_text || c.citedText || c.text || c.quote || c.excerpt || '').trim();
    const documentAuthor = String(c.document_author || c.documentAuthor || c.author || '').trim();
    const rawYear = c.document_year ?? c.documentYear ?? c.year;
    const documentYear = rawYear != null && String(rawYear).trim() ? String(rawYear).trim() : undefined;
    const documentReference = String(c.document_reference || c.documentReference || c.reference || c.section || '').trim();
    const sourceUrl = String(c.source_url || c.sourceUrl || c.url || c.link || '').trim();

    if (!documentTitle && !citedText) continue;
    results.push({
      documentTitle: documentTitle || 'Magisterial Document',
      citedText,
      documentAuthor: documentAuthor || undefined,
      documentYear,
      documentReference: documentReference || undefined,
      sourceUrl: /^https?:\/\//i.test(sourceUrl) ? sourceUrl : undefined,
    });
  }
  return results;
}

function normalizeMagisteriumRelated(rawQuestions: unknown): string[] {
  if (!Array.isArray(rawQuestions)) return [];
  return rawQuestions
    .map((q) => (typeof q === 'string' ? q.trim() : ''))
    .filter((q) => q.length > 0)
    .slice(0, 5);
}

function parseMagisterialJsonSafely(rawText: string) {
  const cleaned = rawText
    .trim()
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();

  try {
    const parsed = JSON.parse(cleaned);
    if (parsed && typeof parsed.reply === 'string' && parsed.reply.trim()) {
      return {
        reply: parsed.reply.trim(),
        citations: normalizeMagisteriumCitations(parsed.citations),
        relatedQuestions: normalizeMagisteriumRelated(parsed.relatedQuestions || parsed.related_questions),
      };
    }
  } catch {
    // Plain prose fallback
  }

  return {
    reply: rawText.trim(),
    citations: [],
    relatedQuestions: [],
  };
}

app.get('/api/catholic-facebook', async (req, res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  try {
    const rawSources = typeof req.query.sources === 'string' ? req.query.sources : '';
    const requestedIds = rawSources
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const payload = await fetchLiveCatholicFacebookPosts(requestedIds);
    return res.json(payload);
  } catch (err: any) {
    return res.status(500).json({
      error: err?.message || 'Unable to refresh Catholic Facebook feed.',
      posts: [],
      fetchedAt: Date.now(),
    });
  }
});

app.all('/api/magisterium', async (req, res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
  const magisteriumKey = (process.env.MAGISTERIUM_API_KEY || '').trim();

  if (req.method === 'GET') {
    return res.json({
      status: 'ok',
      configured: Boolean(magisteriumKey),
      model: 'magisterium-1',
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const body = req.body || {};
    const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';
    const rawHistory = Array.isArray(body.history) ? body.history : [];
    const rawMessages = Array.isArray(body.messages) ? body.messages : [];
    const returnRelatedQuestions = body.returnRelatedQuestions !== false;

    const conversationMessages: Array<{ role: 'user' | 'assistant'; content: string }> = [];
    if (rawMessages.length > 0) {
      for (const msg of rawMessages.slice(-10)) {
        if (msg && typeof msg.content === 'string' && msg.content.trim()) {
          conversationMessages.push({
            role: msg.role === 'assistant' || msg.role === 'model' ? 'assistant' : 'user',
            content: msg.content.trim(),
          });
        }
      }
    } else {
      for (const item of rawHistory.slice(-8)) {
        if (item && typeof item.content === 'string' && item.content.trim()) {
          conversationMessages.push({
            role: item.role === 'assistant' || item.role === 'model' ? 'assistant' : 'user',
            content: item.content.trim(),
          });
        }
      }
      if (prompt) {
        conversationMessages.push({ role: 'user', content: prompt });
      }
    }

    if (conversationMessages.length === 0) {
      return res.status(400).json({ error: 'A theological question or prompt is required.' });
    }

    // 1. Official Magisterium AI API (model: magisterium-1)
    if (magisteriumKey) {
      try {
        const apiResponse = await fetch(MAGISTERIUM_API_URL, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${magisteriumKey}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            model: 'magisterium-1',
            messages: conversationMessages,
            return_related_questions: returnRelatedQuestions,
          }),
          signal: AbortSignal.timeout(45000),
        });

        if (apiResponse.ok) {
          const data: any = await apiResponse.json();
          const content = data?.choices?.[0]?.message?.content;
          if (typeof content === 'string' && content.trim()) {
            return res.json({
              reply: content.trim(),
              citations: normalizeMagisteriumCitations(data.citations),
              relatedQuestions: normalizeMagisteriumRelated(data.related_questions),
              provider: 'magisterium',
              model: data.model || 'magisterium-1',
              source: 'magisterium-api',
              configured: true,
            });
          }
        } else {
          const errText = await apiResponse.text().catch(() => '');
          console.warn(`[Magisterium AI] HTTP ${apiResponse.status}: ${errText.slice(0, 240)}`);
        }
      } catch (err: any) {
        console.warn('[Magisterium AI] Live API call failed, trying Magisterial fallback:', err?.message || err);
      }
    }

    // 2. Fallback: Server-side Magisterial Document Research via Gemini
    const ai = getGenAI();
    const contents = conversationMessages.map((msg) => ({
      role: msg.role === 'assistant' ? ('model' as const) : ('user' as const),
      parts: [{ text: msg.content }],
    }));

    const candidateModels = ['gemini-3.8-flash', 'gemini-3.1-flash-lite', 'gemini-flash-latest'];
    for (const modelName of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents,
          config: {
            systemInstruction: MAGISTERIAL_FALLBACK_INSTRUCTION,
            responseMimeType: 'application/json',
            ...(modelName === 'gemini-3.8-flash'
              ? { thinkingConfig: { thinkingLevel: ThinkingLevel.LOW } }
              : {}),
          },
        });

        if (response?.text) {
          const parsed = parseMagisterialJsonSafely(response.text);
          return res.json({
            reply: parsed.reply,
            citations: parsed.citations,
            relatedQuestions: parsed.relatedQuestions,
            provider: 'magisterium',
            model: 'magisterium-1',
            source: 'sanctum-magisterial-fallback',
            configured: Boolean(magisteriumKey),
          });
        }
      } catch (err: any) {
        console.warn(`[Magisterium AI Fallback] ${modelName} failed:`, err?.message || err);
      }
    }

    return res.status(503).json({
      error: 'Magisterium AI service is temporarily unavailable. Please try again or consult magisterium.com directly.',
      configured: Boolean(magisteriumKey),
    });
  } catch (err: any) {
    console.error('[API] /api/magisterium error:', err);
    return res.status(500).json({ error: err?.message || 'Error consulting Magisterium AI.' });
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
  'catholic-exchange': [
    'https://catholicexchange.com/feed/'
  ],
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
    'https://sign.org/feed/',
    'https://spiritualdirection.com/feed'
  ],
  'ncregister': [
    'https://www.ncregister.com/feeds/general-news.xml',
    'https://www.catholicnewsagency.com/rss/news.xml'
  ],
  'catholic-digest': [
    'https://www.catholicdigest.com/wp-json/wp/v2/posts?per_page=12',
    'https://www.catholicdigest.com/feed/'
  ],
  'cerc': [
    'https://catholiceducation.org/feed/',
    'https://crisismagazine.com/feed/'
  ],
  'church-life-journal': [
    'https://churchlifejournal.nd.edu/articles.atom'
  ],
  'cbcp': [
    'https://cbcpnews.net/cbcpnews/feed/',
    'https://www.vaticannews.va/en.rss.xml'
  ]
};

function escapeXmlCdata(str: string): string {
  return String(str || '').replace(/\]\]>/g, ']]]]><![CDATA[>');
}

function wpPostsJsonToRssXml(jsonText: string, sourceTitle: string): string | null {
  try {
    const posts = JSON.parse(jsonText);
    if (!Array.isArray(posts) || posts.length === 0) return null;

    const itemsXml = posts
      .map((post: any) => {
        const title = post?.title?.rendered || '';
        const link = post?.link || '';
        if (!title || !link) return '';

        const dateVal = post?.date_gmt || post?.date || '';
        const parsedMs = dateVal ? Date.parse(dateVal.endsWith('Z') || /[+-]\d{2}:\d{2}$/.test(dateVal) ? dateVal : `${dateVal}Z`) : NaN;
        const pubDate = !Number.isNaN(parsedMs) ? new Date(parsedMs).toUTCString() : new Date().toUTCString();

        const authorName =
          post?._embedded?.author?.[0]?.name ||
          `${sourceTitle} Editorial`;

        const featuredMedia =
          post?._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

        const excerptHtml = post?.excerpt?.rendered || '';
        const contentHtml = post?.content?.rendered || excerptHtml;

        return `<item>
<title><![CDATA[${escapeXmlCdata(title)}]]></title>
<link>${link.replace(/&/g, '&amp;')}</link>
<dc:creator><![CDATA[${escapeXmlCdata(authorName)}]]></dc:creator>
<pubDate>${pubDate}</pubDate>
${featuredMedia ? `<media:content url="${featuredMedia.replace(/"/g, '&quot;')}" medium="image" />` : ''}
<description><![CDATA[${escapeXmlCdata(excerptHtml)}]]></description>
<content:encoded><![CDATA[${escapeXmlCdata(contentHtml)}]]></content:encoded>
</item>`;
      })
      .filter(Boolean);

    if (itemsXml.length === 0) return null;
    return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/"><channel><title>${sourceTitle}</title>${itemsXml.join('\n')}</channel></rss>`;
  } catch {
    return null;
  }
}

async function fetchUpstreamRssXml(url: string, bypassCache: boolean = true): Promise<string> {
  const isWpJson = url.includes('/wp-json/');
  const noCacheHeaders: Record<string, string> = {
    'Accept': isWpJson
      ? 'application/json, */*'
      : 'application/rss+xml, application/atom+xml, application/xml, text/xml, */*',
    ...(bypassCache
      ? {
          'Cache-Control': 'no-cache, no-store, max-age=0',
          'Pragma': 'no-cache',
        }
      : {}),
  };

  const parseFeedResponse = (rawText: string): string | null => {
    if (!rawText) return null;
    if (isWpJson && rawText.trim().startsWith('[')) {
      return wpPostsJsonToRssXml(rawText, 'Catholic Digest');
    }
    if (/<item[\s>]/i.test(rawText) || /<entry[\s>]/i.test(rawText)) {
      return rawText;
    }
    return null;
  };

  // Attempt 1: Standard fetch (avoids Cloudflare TLS/UA challenge on several Catholic sites)
  let needsUaFallback = false;
  try {
    const res1 = await fetch(url, {
      cache: 'no-store',
      headers: noCacheHeaders,
      signal: AbortSignal.timeout(5500),
    });
    if (res1.ok) {
      const txt1 = await res1.text();
      const parsed1 = parseFeedResponse(txt1);
      if (parsed1) return parsed1;
      needsUaFallback = true;
    } else if (res1.status === 403 || res1.status === 406 || res1.status === 429) {
      needsUaFallback = true;
    } else {
      throw new Error(`HTTP ${res1.status}`);
    }
  } catch (err: any) {
    // Only do UA fallback if blocked rather than doubling total timeout on dead/slow hosts
    if (!needsUaFallback && err?.name !== 'TimeoutError' && err?.name !== 'AbortError') {
      needsUaFallback = true;
    }
    if (!needsUaFallback) {
      throw err;
    }
  }

  const res2 = await fetch(url, {
    cache: 'no-store',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      ...noCacheHeaders,
    },
    signal: AbortSignal.timeout(5500),
  });
  if (!res2.ok) {
    throw new Error(`HTTP ${res2.status}`);
  }
  const txt2 = await res2.text();
  const parsed2 = parseFeedResponse(txt2);
  if (!parsed2) {
    throw new Error('Invalid RSS XML');
  }
  return parsed2;
}

function extractFeedItemTimestamp(itemXml: string, channelDateMs: number): number {
  const dateMatch =
    itemXml.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i) ||
    itemXml.match(/<dc:date[^>]*>([\s\S]*?)<\/dc:date>/i) ||
    itemXml.match(/<published[^>]*>([\s\S]*?)<\/published>/i) ||
    itemXml.match(/<updated[^>]*>([\s\S]*?)<\/updated>/i);
  if (dateMatch && dateMatch[1]) {
    const clean = dateMatch[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim();
    const parsed = Date.parse(clean);
    if (!Number.isNaN(parsed)) return parsed;
  }
  return channelDateMs;
}

function extractFeedItemTitleKey(itemXml: string): string {
  const m =
    itemXml.match(/<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/i) ||
    itemXml.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return m ? m[1].trim().toLowerCase() : '';
}

app.get('/api/catholic-rss', async (req, res) => {
  try {
    const sourceKey = typeof req.query.source === 'string' ? req.query.source : 'st-paul-center';
    const forceRefresh = req.query.refresh === '1' || req.query.refresh === 'true';
    const candidateUrls = SERVER_CATHOLIC_RSS_FEEDS[sourceKey] || SERVER_CATHOLIC_RSS_FEEDS['st-paul-center'];

    const collected: { xml: string; ts: number; index: number; titleKey: string }[] = [];
    const seenTitles = new Set<string>();
    let lastErr: any = null;

    // Fetch candidate URLs in strict priority order so fallback feeds only activate if the primary feed fails or returns 0 items
    for (const targetUrl of candidateUrls) {
      try {
        const xml = await fetchUpstreamRssXml(targetUrl, forceRefresh || true);
        const channelBuildMatch =
          xml.match(/<lastBuildDate[^>]*>([\s\S]*?)<\/lastBuildDate>/i) ||
          xml.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/i);
        const channelDateMs =
          channelBuildMatch && channelBuildMatch[1] && !Number.isNaN(Date.parse(channelBuildMatch[1].trim()))
            ? Date.parse(channelBuildMatch[1].trim())
            : 0;

        const itemMatches = xml.match(/<(?:item|entry)[\s>][\s\S]*?<\/(?:item|entry)>/gi) || [];
        for (let index = 0; index < itemMatches.length; index++) {
          const itemXml = itemMatches[index];
          const ts = extractFeedItemTimestamp(itemXml, channelDateMs);
          // Inject channel date if an RSS item omitted <pubDate> (e.g. Catholic Answers)
          const normalizedXml =
            ts > 0 &&
            !/<(?:pubDate|dc:date|published|updated)[\s>]/i.test(itemXml) &&
            /<\/(?:item|entry)>/i.test(itemXml)
              ? itemXml.replace(
                  /<\/(?:item|entry)>/i,
                  `<pubDate>${new Date(ts).toUTCString()}</pubDate></item>`
                )
              : itemXml;
          const titleKey = extractFeedItemTitleKey(itemXml);
          if (titleKey && seenTitles.has(titleKey)) continue;
          if (titleKey) seenTitles.add(titleKey);
          collected.push({
            xml: normalizedXml,
            ts,
            index,
            titleKey,
          });
        }

        if (collected.length > 0) {
          break;
        }
      } catch (err: any) {
        lastErr = err;
      }
    }

    if (collected.length === 0) {
      throw lastErr || new Error('No RSS items returned from upstream feed');
    }

    // Sort strictly newest-first so fresh dispatches always appear at the top
    collected.sort((a, b) => {
      if (b.ts !== a.ts) return b.ts - a.ts;
      return a.index - b.index;
    });

    const combinedXml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/"><channel><title>${sourceKey}</title>${collected
      .slice(0, 30)
      .map(c => c.xml)
      .join('\n')}</channel></rss>`;

    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    return res.send(combinedXml);
  } catch (err: any) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
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

app.get('/api/catholic-instagram', async (req, res) => {
  try {
    const rawUser = String(req.query.username || 'aleteia_en').replace(/[^a-zA-Z0-9._]/g, '');
    const embedUrl = `https://www.instagram.com/${rawUser}/embed/?_t=${Date.now()}`;

    const response = await fetch(embedUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache'
      },
      signal: AbortSignal.timeout(7500)
    });

    if (!response.ok) {
      throw new Error(`Instagram Embed HTTP ${response.status}`);
    }

    const html = await response.text();
    let shortcodes: string[] = [];
    const posts: any[] = [];

    const rawMatch = html.match(/"contextJSON":"((?:\\.|[^"\\])*)"/);
    if (rawMatch) {
      try {
        const unescaped = JSON.parse('"' + rawMatch[1] + '"');
        const parsed = JSON.parse(unescaped);
        const ctx = parsed?.context || {};
        const brokenShortcodes = new Set(['DfagCq8D3sp', 'DfYQhEYAB8J', 'DfWDi7HDNuW', 'DfPX9L3D8mF']);
        const mediaList = Array.isArray(ctx.graphql_media) ? ctx.graphql_media : [];
        for (const item of mediaList) {
          const sm = item?.shortcode_media;
          if (!sm || !sm.shortcode || brokenShortcodes.has(sm.shortcode)) continue;
          shortcodes.push(sm.shortcode);
        }
      } catch {
        // Fallback to regex extraction below
      }
    }

    if (shortcodes.length === 0) {
      const matches = Array.from(html.matchAll(/shortcode\\?":\\?"([A-Za-z0-9_-]{11})\\?"/g)).map(m => m[1]);
      shortcodes = Array.from(new Set(matches)).slice(0, 12);
    }

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    return res.json({
      username: rawUser,
      shortcodes,
      posts,
      fetchedAt: Date.now()
    });
  } catch (err: any) {
    return res.status(502).json({ error: err?.message || 'Instagram fetch error', shortcodes: [], posts: [] });
  }
});

// Live Official Medjugorje Messages API Proxy (St. James Parish, Medjugorje)
function cleanMedjugorjeContent(raw: string): { text: string; ecclesiasticalApproval: boolean } {
  const normalized = String(raw || '').replace(/\r\n/g, '\n').trim();
  const hasApproval = /\(\s*with\s+ecclesiastical\s+approval\s*\)/i.test(normalized) ||
    /\(\s*s\s+crkvenim\s+odobrenjem\s*\)/i.test(normalized);
  let cleaned = normalized
    .replace(/\(\s*with\s+ecclesiastical\s+approval\s*\)/gi, '')
    .replace(/\(\s*s\s+crkvenim\s+odobrenjem\s*\)/gi, '')
    .replace(/\s+/g, ' ')
    .replace(/([A-Za-z])['‘’]{2,}([A-Za-z])/g, '$1\u2019$2')
    .replace(/\.Thank you/g, '. Thank you')
    .trim();

  let prev = '';
  while (cleaned !== prev) {
    prev = cleaned;
    cleaned = cleaned
      .replace(/^[\s\u00A0]*['"‘’“”„‟«»]+/, '')
      .replace(/['"‘’“”„‟«»]+[\s\u00A0]*$/, '')
      .trim();
  }

  return { text: cleaned, ecclesiasticalApproval: hasApproval };
}

app.get('/api/medjugorje-messages', async (_req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');

  try {
    const [enRes, hrRes] = await Promise.all([
      fetch('https://api.medjugorje.hr/api/our-lady-messages?locale=en&sort=date:desc&pagination[pageSize]=24', {
        cache: 'no-store',
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(8000),
      }),
      fetch('https://api.medjugorje.hr/api/our-lady-messages?locale=hr&sort=date:desc&pagination[pageSize]=24', {
        cache: 'no-store',
        headers: { Accept: 'application/json' },
        signal: AbortSignal.timeout(8000),
      }).catch(() => null),
    ]);

    if (!enRes.ok) {
      throw new Error(`Medjugorje API HTTP ${enRes.status}`);
    }

    const enJson: any = await enRes.json();
    const hrJson: any = hrRes && hrRes.ok ? await hrRes.json() : { data: [] };

    const hrMap = new Map<string, string>();
    for (const item of hrJson?.data || []) {
      const attrs = item?.attributes;
      if (!attrs?.date || !attrs?.content) continue;
      const key = `${attrs.date}:${attrs.type || 'monthly'}`;
      if (!hrMap.has(key)) {
        const cleanedHr = cleanMedjugorjeContent(attrs.content).text;
        hrMap.set(key, cleanedHr.length > 125 ? `${cleanedHr.slice(0, 122).trim()}...` : cleanedHr);
      }
    }

    const messages = (enJson?.data || [])
      .map((item: any) => {
        const attrs = item?.attributes;
        if (!attrs?.date || !attrs?.content) return null;
        const { text, ecclesiasticalApproval } = cleanMedjugorjeContent(attrs.content);
        if (!text) return null;
        const type = attrs.type || 'monthly';
        const hrExcerpt = hrMap.get(`${attrs.date}:${type}`) || '';
        return {
          id: `medj-live-${attrs.date}-${type}-${item.id}`,
          date: attrs.date,
          type,
          messageText: text,
          originalCroatianExcerpt: hrExcerpt,
          ecclesiasticalApproval,
        };
      })
      .filter(Boolean);

    return res.status(200).json({
      source: 'medjugorje.hr',
      updatedAt: Date.now(),
      messages,
    });
  } catch (err: any) {
    return res.status(502).json({
      error: err?.message || 'Unable to fetch Medjugorje messages',
      messages: [],
    });
  }
});

// Expose configured Google Maps Platform client key (never hardcoded in bundle)
app.get('/api/maps-config', (_req, res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  const paused =
    String(process.env.GOOGLE_MAPS_PAUSED || '').toLowerCase() === 'true' ||
    String(process.env.VITE_GOOGLE_MAPS_PAUSED || '').toLowerCase() === 'true';
  if (paused) {
    return res.status(200).json({
      apiKey: '',
      configured: false,
      paused: true,
    });
  }
  const apiKey =
    process.env.VITE_GOOGLE_MAPS_API_KEY ||
    process.env.GOOGLE_MAPS_API_KEY ||
    '';
  return res.status(200).json({
    apiKey,
    configured: Boolean(apiKey),
    paused: false,
  });
});

// On-demand web-grounded Catholic parish Mass, Confession & Adoration schedule lookup
interface ParishScheduleCachePayload {
  parishName: string;
  scheduleMarkdown: string;
  sources: { title: string; uri: string }[];
  checkedAt: string;
}

const PARISH_SCHEDULE_CACHE_TTL_MS = 6 * 60 * 60 * 1000;
const parishScheduleCache = new Map<string, { expiresAt: number; payload: ParishScheduleCachePayload }>();

function classifyParishScheduleError(err: any) {
  const status = Number(err?.status || err?.code || 0);
  const msg = String(err?.message || err || '');
  const isQuotaOrRateLimit =
    status === 429 || /RESOURCE_EXHAUSTED|exceeded your current quota|rate[- ]?limit|too many requests/i.test(msg);
  const isHardQuota = /exceeded your current quota|check your plan and billing|billing details/i.test(msg);
  const isAuthError =
    status === 403 ||
    status === 400 ||
    /PERMISSION_DENIED|API_KEY_INVALID|invalid api key|API key not valid/i.test(msg);
  return { status, msg, isQuotaOrRateLimit, isHardQuota, isAuthError };
}

function isSafeParishPublicUrl(rawUrl: string): string | null {
  const trimmed = (rawUrl || '').trim();
  if (!trimmed) return null;
  try {
    const parsed = new URL(trimmed);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') return null;
    const host = parsed.hostname.toLowerCase();
    if (
      !host ||
      host === 'localhost' ||
      host === '0.0.0.0' ||
      host === '[::1]' ||
      host.endsWith('.local') ||
      host.endsWith('.internal') ||
      /^127\./.test(host) ||
      /^10\./.test(host) ||
      /^192\.168\./.test(host) ||
      /^169\.254\./.test(host) ||
      /^172\.(1[6-9]|2\d|3[0-1])\./.test(host)
    ) {
      return null;
    }
    return parsed.toString();
  } catch {
    return null;
  }
}

function stripParishHtmlToText(html: string): string {
  return html
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(script|style|noscript|svg|iframe)[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<\/(p|div|li|tr|h1|h2|h3|h4|h5|h6|br|section|article)>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#039;|&apos;/gi, "'")
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

async function fetchParishPageSnippet(url: string) {
  const safeUrl = isSafeParishPublicUrl(url);
  if (!safeUrl) return null;
  try {
    const response = await fetch(safeUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SoulSanctumParishFinder/1.0)',
        Accept: 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.8',
      },
      signal: AbortSignal.timeout(3500),
    });
    if (!response.ok) return null;
    const contentType = (response.headers.get('content-type') || '').toLowerCase();
    if (contentType && !contentType.includes('text/html') && !contentType.includes('text/plain')) {
      return null;
    }
    const html = (await response.text()).slice(0, 180_000);
    const text = stripParishHtmlToText(html).slice(0, 6500);
    if (text.length < 40) return null;
    const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
    const rawTitle = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() : '';
    return {
      title: rawTitle ? rawTitle.slice(0, 140) : new URL(safeUrl).hostname,
      uri: safeUrl,
      text,
      html,
    };
  } catch {
    return null;
  }
}

async function fetchParishWebSources(parishName: string, address: string, websiteUri: string) {
  const docs: Array<{ title: string; uri: string; text: string }> = [];
  const query = `${parishName} ${address} Catholic Mass Confession Adoration times`.trim();

  const ddgPromise = (async () => {
    try {
      const response = await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          Accept: 'text/html',
        },
        signal: AbortSignal.timeout(3500),
      });
      if (!response.ok) return [];
      const html = (await response.text()).slice(0, 180_000);
      const found: Array<{ title: string; uri: string; text: string }> = [];
      const seen = new Set<string>();
      const regex = /<a[^>]*class=["'][^"']*result__a[^"']*["'][^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>[\s\S]{0,900}?class=["'][^"']*result__snippet[^"']*["'][^>]*>([\s\S]*?)<\/[^>]+>/gi;
      let m: RegExpExecArray | null;
      while ((m = regex.exec(html)) !== null && found.length < 5) {
        let rawHref = (m[1] || '').trim();
        if (rawHref.startsWith('//')) rawHref = `https:${rawHref}`;
        if (rawHref.includes('uddg=')) {
          try {
            const target = new URL(rawHref, 'https://duckduckgo.com').searchParams.get('uddg');
            if (target) rawHref = target;
          } catch {
            // Keep original
          }
        }
        const safeUri = isSafeParishPublicUrl(rawHref);
        const title = stripParishHtmlToText(m[2] || '').slice(0, 140);
        const snippet = stripParishHtmlToText(m[3] || '').slice(0, 500);
        if (safeUri && title && snippet && !seen.has(safeUri)) {
          seen.add(safeUri);
          found.push({ title, uri: safeUri, text: snippet });
        }
      }
      return found;
    } catch {
      return [];
    }
  })();

  const [sitePage, ddgDocs] = await Promise.all([
    websiteUri ? fetchParishPageSnippet(websiteUri) : Promise.resolve(null),
    ddgPromise,
  ]);

  if (sitePage) {
    docs.push({ title: sitePage.title, uri: sitePage.uri, text: sitePage.text });
    const baseOrigin = new URL(sitePage.uri).origin;
    const subLinks: string[] = [];
    const seenSub = new Set<string>([sitePage.uri]);
    const anchorRegex = /<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
    let m: RegExpExecArray | null;
    while ((m = anchorRegex.exec(sitePage.html)) !== null) {
      const href = (m[1] || '').trim();
      const label = (m[2] || '').replace(/<[^>]+>/g, ' ').trim();
      if (!href || href.startsWith('#') || /^(mailto:|tel:|javascript:)/i.test(href)) continue;
      if (!/(mass|confession|reconcil|adoration|schedule|liturg|sacrament|worship|times)/i.test(`${href} ${label}`)) {
        continue;
      }
      try {
        const resolved = new URL(href, sitePage.uri);
        if (resolved.origin !== baseOrigin) continue;
        const safe = isSafeParishPublicUrl(resolved.toString());
        if (safe && !seenSub.has(safe)) {
          seenSub.add(safe);
          subLinks.push(safe);
          if (subLinks.length >= 2) break;
        }
      } catch {
        // Ignore invalid href
      }
    }
    if (subLinks.length > 0) {
      const subPages = await Promise.all(subLinks.map((link) => fetchParishPageSnippet(link)));
      for (const sub of subPages) {
        if (sub && !docs.some((d) => d.uri === sub.uri)) {
          docs.push({ title: sub.title, uri: sub.uri, text: sub.text });
        }
      }
    }
  }

  for (const d of ddgDocs) {
    if (!docs.some((existing) => existing.uri === d.uri)) {
      docs.push(d);
    }
  }

  return docs.slice(0, 6);
}

app.post('/api/parish-schedule', async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  try {
    const parishName = String(req.body?.parishName || '').trim().slice(0, 180);
    const address = String(req.body?.address || '').trim().slice(0, 260);
    const websiteUri = String(req.body?.websiteUri || '').trim().slice(0, 300);
    const forceRefresh = Boolean(req.body?.forceRefresh);

    if (!parishName) {
      return res.status(400).json({ error: 'Parish name is required.' });
    }

    const cacheKey = `${parishName.toLowerCase()}|${address.toLowerCase()}|${websiteUri.toLowerCase()}`;
    const cached = parishScheduleCache.get(cacheKey);
    if (!forceRefresh && cached && cached.expiresAt > Date.now()) {
      return res.status(200).json(cached.payload);
    }

    const safeWebsite = isSafeParishPublicUrl(websiteUri);
    const fallbackLinks = {
      ...(safeWebsite ? { websiteUri: safeWebsite } : {}),
      masstimesUrl: 'https://masstimes.org/',
      googleSearchUrl: `https://www.google.com/search?q=${encodeURIComponent(`${parishName} ${address} Catholic Mass Confession Adoration times`.trim())}`,
    };

    const hasGeminiKey = Boolean(process.env.GEMINI_API_KEY);
    const openAiKey = (process.env.OPENAI_API_KEY || '').trim();

    if (!hasGeminiKey && !openAiKey) {
      return res.status(503).json({
        error: 'Live parish schedule lookup is unavailable in this environment. Please check the parish website or links below directly.',
        code: 'SERVICE_UNCONFIGURED',
        fallbackLinks,
      });
    }

    const ai = hasGeminiKey ? getGenAI() : null;
    const todayLabel = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const formatInstructions = [
      `- Present ONLY verifiable schedule details found in search results or provided sources. Never guess or invent times.`,
      `- If a particular schedule (for example Confession or Adoration) is not published online, explicitly state "Not listed online — please verify with the parish office."`,
      `- Format concisely with clear markdown headings:`,
      `  ### Sunday & Saturday Vigil Mass`,
      `  ### Weekday / Daily Mass`,
      `  ### Confession (Reconciliation)`,
      `  ### Eucharistic Adoration`,
      `  ### Helpful Notes`,
    ].join('\n');

    const prompt = [
      `Find the current published Catholic Mass times, Confession (Reconciliation) schedule, and Eucharistic Adoration hours for:`,
      `Parish: ${parishName}`,
      address ? `Address: ${address}` : '',
      websiteUri ? `Official Website: ${websiteUri}` : '',
      `Today's date: ${todayLabel}`,
      ``,
      `Instructions:`,
      `- Search the parish's official website, diocesan directory, or MassTimes listings.`,
      formatInstructions,
    ]
      .filter(Boolean)
      .join('\n');

    const saveAndReturn = (payload: ParishScheduleCachePayload) => {
      if (parishScheduleCache.size >= 200) {
        const firstKey = parishScheduleCache.keys().next().value;
        if (firstKey) parishScheduleCache.delete(firstKey);
      }
      parishScheduleCache.set(cacheKey, {
        expiresAt: Date.now() + PARISH_SCHEDULE_CACHE_TTL_MS,
        payload,
      });
      return res.status(200).json(payload);
    };

    let lastClassified = {
      status: 0,
      msg: '',
      isQuotaOrRateLimit: false,
      isHardQuota: false,
      isAuthError: false,
    };

    // Tier 1: Gemini with Google Search Grounding (valid models per SDK matrix)
    if (ai) {
      const searchCandidates: Array<{ model: string; thinkingLow: boolean }> = [
        { model: 'gemini-4-hydrogen', thinkingLow: true },
        { model: 'gemini-3.1-flash-lite', thinkingLow: false },
      ];

      for (const candidate of searchCandidates) {
        for (let attempt = 0; attempt < 2; attempt++) {
          try {
            const response = await ai.models.generateContent({
              model: candidate.model,
              contents: prompt,
              config: {
                tools: [{ googleSearch: {} }],
                ...(candidate.thinkingLow
                  ? { thinkingConfig: { thinkingLevel: ThinkingLevel.LOW } }
                  : {}),
              },
            });

            const scheduleMarkdown = (response.text || '').trim();
            const rawChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
            const seen = new Set<string>();
            const sources: { title: string; uri: string }[] = [];

            for (const chunk of rawChunks as any[]) {
              const uri = chunk?.web?.uri;
              const title = chunk?.web?.title;
              if (typeof uri === 'string' && /^https?:\/\//i.test(uri) && !seen.has(uri)) {
                seen.add(uri);
                sources.push({
                  uri,
                  title: typeof title === 'string' && title.trim() ? title.trim() : uri,
                });
              }
            }

            if (scheduleMarkdown) {
              return saveAndReturn({
                parishName,
                scheduleMarkdown,
                sources: sources.slice(0, 6),
                checkedAt: new Date().toISOString(),
              });
            }
            break;
          } catch (err: any) {
            lastClassified = classifyParishScheduleError(err);
            if (lastClassified.isQuotaOrRateLimit && !lastClassified.isHardQuota && attempt === 0) {
              await new Promise((r) => setTimeout(r, 850));
              continue;
            }
            break;
          }
        }
      }
    }

    // Tier 2: Real live web fetching + non-Search AI synthesis
    const webDocs = await fetchParishWebSources(parishName, address, websiteUri);
    if (webDocs.length > 0) {
      const contextBlock = webDocs
        .map((doc, idx) => `[Source ${idx + 1}: ${doc.title} (${doc.uri})]\n${doc.text.slice(0, 3200)}`)
        .join('\n\n---\n\n');

      const extractionPrompt = [
        `Extract the published Catholic Mass times, Confession (Reconciliation) schedule, and Eucharistic Adoration hours for "${parishName}"${address ? ` (${address})` : ''} strictly from the verified web sources provided below.`,
        `Today's date: ${todayLabel}`,
        ``,
        `Instructions:`,
        formatInstructions,
        ``,
        `VERIFIED WEB SOURCES:`,
        contextBlock,
      ].join('\n');

      const docSources = webDocs.map((d) => ({ title: d.title, uri: d.uri }));

      if (ai) {
        for (const modelName of ['gemini-3.1-flash-lite', 'gemini-4-hydrogen']) {
          try {
            const response = await ai.models.generateContent({
              model: modelName,
              contents: extractionPrompt,
              ...(modelName === 'gemini-4-hydrogen'
                ? { config: { thinkingConfig: { thinkingLevel: ThinkingLevel.LOW } } }
                : {}),
            });
            const text = (response.text || '').trim();
            if (text) {
              return saveAndReturn({
                parishName,
                scheduleMarkdown: text,
                sources: docSources,
                checkedAt: new Date().toISOString(),
              });
            }
          } catch (err: any) {
            lastClassified = classifyParishScheduleError(err);
          }
        }
      }

      if (openAiKey) {
        try {
          const oaRes = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${openAiKey}`,
            },
            body: JSON.stringify({
              model: 'gpt-4o-mini',
              temperature: 0.1,
              max_tokens: 900,
              messages: [
                {
                  role: 'system',
                  content: 'You extract verifiable Catholic parish liturgical schedules strictly from provided web source text.',
                },
                { role: 'user', content: extractionPrompt },
              ],
            }),
            signal: AbortSignal.timeout(8000),
          });
          if (oaRes.ok) {
            const oaData = (await oaRes.json()) as any;
            const text = String(oaData?.choices?.[0]?.message?.content || '').trim();
            if (text) {
              return saveAndReturn({
                parishName,
                scheduleMarkdown: text,
                sources: docSources,
                checkedAt: new Date().toISOString(),
              });
            }
          }
        } catch {
          // Proceed to structured error handling
        }
      }
    }

    if (lastClassified.isQuotaOrRateLimit) {
      console.warn(`[/api/parish-schedule] Gemini API quota limit (429) for "${parishName}". Returning actionable links.`);
      return res.status(429).json({
        error:
          'Live AI schedule lookup has reached the current Gemini API quota limit. Upgrading or selecting a billing-enabled Gemini API key in Settings > Secrets expands your quota, or you can open the parish links below directly.',
        code: 'RESOURCE_EXHAUSTED',
        isQuotaError: true,
        fallbackLinks,
      });
    }

    if (lastClassified.isAuthError) {
      console.warn(`[/api/parish-schedule] Gemini API key/permission error (${lastClassified.status}).`);
      return res.status(lastClassified.status === 400 ? 400 : 403).json({
        error:
          'The configured Gemini API key could not be authorized for live parish lookup. Please verify your API key in Settings > Secrets, or use the parish links below.',
        code: 'PERMISSION_DENIED',
        fallbackLinks,
      });
    }

    return res.status(502).json({
      error: 'Unable to retrieve the published parish schedule right now. Please check the parish website or MassTimes.org below.',
      code: 'LOOKUP_UNAVAILABLE',
      fallbackLinks,
    });
  } catch (err: any) {
    console.warn('[/api/parish-schedule] request error:', err?.message || 'Unknown error');
    return res.status(502).json({
      error: 'Unable to look up live parish schedule right now. Please check the parish website or MassTimes.org directly.',
      code: 'INTERNAL_ERROR',
    });
  }
});

async function startServer() {
  if (!isProd) {
    // Serve a zero-WebSocket /@vite/client shim in dev so CSS injection & HMR APIs work without
    // Vite 8 attempting a blocked HMR WebSocket connection (Error: WebSocket closed without opened.)
    const noWsViteClientJs = `
const sheetsMap = new Map();
let lastInsertedStyle;
export function updateStyle(id, content) {
  let style = sheetsMap.get(id);
  if (!style) {
    style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.setAttribute('data-vite-dev-id', id);
    style.textContent = content;
    if (!lastInsertedStyle) {
      document.head.appendChild(style);
      setTimeout(() => { lastInsertedStyle = undefined; }, 0);
    } else {
      lastInsertedStyle.insertAdjacentElement('afterend', style);
    }
    lastInsertedStyle = style;
  } else if (style.textContent !== content) {
    style.textContent = content;
  }
  sheetsMap.set(id, style);
}
export function removeStyle(id) {
  const style = sheetsMap.get(id);
  if (style) {
    if (style.parentNode) style.parentNode.removeChild(style);
    sheetsMap.delete(id);
  }
}
export function createHotContext() {
  return {
    data: {},
    accept() {},
    acceptExports() {},
    dispose() {},
    prune() {},
    decline() {},
    invalidate() {},
    on() {},
    off() {},
    send() {},
  };
}
export function injectQuery(url, queryToInject) {
  if (url[0] !== '.' && url[0] !== '/') return url;
  const pathname = url.replace(/[?#].*$/, '');
  const { search, hash } = new URL(url, 'http://vite.dev');
  return pathname + '?' + queryToInject + (search ? '&' + search.slice(1) : '') + (hash || '');
}
export class ErrorOverlay extends HTMLElement {}
`.trim();

    app.get('/@vite/client', (_req, res) => {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
      res.send(noWsViteClientJs);
    });

    // In dev, mount Vite middlewares so SPA and all existing Vite plugins (Vatican News, RSS, etc.) run smoothly
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, ws: false, hmr: false },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve static build output (Express 5 compatible fallback)
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath, {
      setHeaders: (res, filePath) => {
        const base = path.basename(filePath);
        if (base === 'index.html' || base === 'sw.js' || base === 'dev-sw.js') {
          res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
          res.setHeader('Pragma', 'no-cache');
          res.setHeader('Expires', '0');
        }
      }
    }));
    app.use((_req, res) => {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
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
