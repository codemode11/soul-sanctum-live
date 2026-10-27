/**
 * Web Speech API speech synthesis helper for prayer reading and Scripture audio prompts.
 * Supports distinct liturgical voice roles:
 * - Woman lector voice for First Reading and Psalm
 * - Man (priest/deacon) voice for the proclamation of the Holy Gospel
 */

import { BibleCommentary } from '../types';

export interface SpeechPart {
  id?: string;
  title?: string;
  text: string;
  gender: 'female' | 'male';
}

export function numberToWord(n: number): string {
  const words: Record<number, string> = {
    0: 'zero', 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five',
    6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten',
    11: 'eleven', 12: 'twelve', 13: 'thirteen', 14: 'fourteen', 15: 'fifteen',
    16: 'sixteen', 17: 'seventeen', 18: 'eighteen', 19: 'nineteen', 20: 'twenty',
    21: 'twenty-one', 22: 'twenty-two', 23: 'twenty-three', 24: 'twenty-four', 25: 'twenty-five',
    26: 'twenty-six', 27: 'twenty-seven', 28: 'twenty-eight', 29: 'twenty-nine', 30: 'thirty',
    31: 'thirty-one', 32: 'thirty-two', 33: 'thirty-three', 34: 'thirty-four', 35: 'thirty-five',
    36: 'thirty-six', 37: 'thirty-seven', 38: 'thirty-eight', 39: 'thirty-nine', 40: 'forty',
    41: 'forty-one', 42: 'forty-two', 43: 'forty-three', 44: 'forty-four', 45: 'forty-five',
    46: 'forty-six', 47: 'forty-seven', 48: 'forty-eight', 49: 'forty-nine', 50: 'fifty',
    51: 'fifty-one', 52: 'fifty-two', 53: 'fifty-three', 54: 'fifty-four', 55: 'fifty-five',
    56: 'fifty-six', 57: 'fifty-seven', 58: 'fifty-eight', 59: 'fifty-nine', 60: 'sixty',
    61: 'sixty-one', 62: 'sixty-two', 63: 'sixty-three', 64: 'sixty-four', 65: 'sixty-five',
    66: 'sixty-six', 67: 'sixty-seven', 68: 'sixty-eight', 69: 'sixty-nine', 70: 'seventy',
    71: 'seventy-one', 72: 'seventy-two', 73: 'seventy-three', 74: 'seventy-four', 75: 'seventy-five',
    76: 'seventy-six', 77: 'seventy-seven', 78: 'seventy-eight', 79: 'seventy-nine', 80: 'eighty',
    81: 'eighty-one', 82: 'eighty-two', 83: 'eighty-three', 84: 'eighty-four', 85: 'eighty-five',
    86: 'eighty-six', 87: 'eighty-seven', 88: 'eighty-eight', 89: 'eighty-nine', 90: 'ninety',
    91: 'ninety-one', 92: 'ninety-two', 93: 'ninety-three', 94: 'ninety-four', 95: 'ninety-five',
    96: 'ninety-six', 97: 'ninety-seven', 98: 'ninety-eight', 99: 'ninety-nine', 100: 'one hundred',
    150: 'one hundred fifty'
  };
  if (words[n]) return words[n];
  if (n > 100 && n < 200) {
    const remainder = n - 100;
    return `one hundred ${words[remainder] || remainder}`;
  }
  return String(n);
}

/**
 * Extracts the sacred book name from a scripture citation.
 * Removes chapter numbers, colons, verse ranges, and suffixes (e.g. "Ephesians 1:11-14" -> "Ephesians").
 * Naturally expands leading numerals ("2 Timothy 4:10-17b" -> "Second Timothy").
 */
export function extractBookFromCitation(citation: string): string {
  if (!citation) return '';
  let cleaned = citation.trim();

  // Strip chapter and verse suffixes like " 1:11-14", " 12:1-7", " 4:10-17b", " 11:25-30", " 7:22b-8:1"
  cleaned = cleaned.replace(/\s+\d+\s*:\s*[\d\w\s,-]+.*$/i, '').trim();

  // Strip trailing standalone verse ranges if any (e.g., single chapter books like "Philemon 9-10")
  cleaned = cleaned.replace(/\s+\d+[\d\w\s,-]*$/i, (match) => {
    // Keep books starting with a number like "1 John" or "2 Peter"
    return '';
  }).trim();

  // Naturally expand leading ordinal numbers for fluent human lector pronunciation
  if (/^1\s+/i.test(cleaned)) {
    cleaned = cleaned.replace(/^1\s+/i, 'First ');
  } else if (/^2\s+/i.test(cleaned)) {
    cleaned = cleaned.replace(/^2\s+/i, 'Second ');
  } else if (/^3\s+/i.test(cleaned)) {
    cleaned = cleaned.replace(/^3\s+/i, 'Third ');
  }

  // Handle traditional book titles
  if (/^Acts(\s+of\s+the\s+Apostles)?$/i.test(cleaned)) {
    cleaned = 'the Acts of the Apostles';
  } else if (/^Song\s+of\s+Songs$/i.test(cleaned) || /^Canticle\s+of\s+Canticles$/i.test(cleaned)) {
    cleaned = 'the Song of Songs';
  }

  return cleaned;
}

/**
 * Formats the sacred introduction for the First Reading according to Catholic liturgical practice:
 * "The reader says at the beginning: The first reading is taken from the book of Ephesians.
 * The reader does not read the chapter number and the verse numbers."
 */
export function formatFirstReadingIntro(citation: string): string {
  const book = extractBookFromCitation(citation);
  if (!book) return 'The first reading.';
  
  // If the book title already contains "the book of" or starts with "the"
  if (/^the\s+book\s+of\s+/i.test(book)) {
    return `The first reading is taken from ${book}.`;
  }
  if (/^the\s+/i.test(book)) {
    return `The first reading is taken from ${book}.`;
  }
  return `The first reading is taken from the book of ${book}.`;
}

/**
 * Formats the sacred introduction for the Holy Gospel according to Catholic liturgical practice:
 * "Similarly, the Gospel reader says: A reading from the Holy Gospel according to Matthew.
 * He doesn't read the chapter number and the verse numbers."
 */
export function formatGospelIntro(citation: string): string {
  let book = extractBookFromCitation(citation);
  if (!book) return 'A reading from the Holy Gospel.';
  
  // Strip any accidental redundant prefix (e.g. "Saint", "St.", "Gospel according to")
  book = book.replace(/^(the\s+holy\s+gospel\s+according\s+to|the\s+gospel\s+according\s+to|the\s+gospel\s+of|saint|st\.)\s+/i, '').trim();

  return `A reading from the Holy Gospel according to ${book}.`;
}

/**
 * Formats the sacred proclamation of the Responsorial Psalm according to liturgical practice:
 * "For the Responsorial Psalm, the reader says: Responsorial Psalm. Let our response be . . .
 * Then, after each verse, the Reader says: Response. And reads the response herself."
 */
export function formatResponsorialPsalmForSpeech(
  psalm: { antiphon: string; verses: string[] },
  alleluia?: { verse: string }
): string {
  const antiphon = psalm.antiphon.trim().replace(/\.+$/, '');
  
  // Announcement: "Responsorial Psalm. Let our response be, [Antiphon]."
  let text = `Responsorial Psalm. Let our response be, ${antiphon}.`;
  
  // Stanzas: each followed by "Response. [Antiphon]."
  for (const verse of psalm.verses) {
    const cleanVerse = verse.trim().replace(/\.+$/, '');
    text += ` ${cleanVerse}. Response. ${antiphon}.`;
  }
  
  // Gospel Acclamation if provided
  if (alleluia && alleluia.verse) {
    const cleanAlleluia = alleluia.verse.trim().replace(/\.+$/, '');
    text += ` Alleluia, alleluia. ${cleanAlleluia}. Alleluia.`;
  }
  
  return text;
}

/**
 * Prepares liturgical text for natural, reverent speech synthesis.
 * Strips HTML, markdown, and any chapter or verse numbers so engines never speak
 * chapter numbers, verse numbers, or the word "colon", while turning prose colons
 * into full-stop pauses.
 */
export function prepareLiturgicalTextForSpeech(text: string): string {
  let cleaned = text
    .replace(/<[^>]*>/g, '')
    .replace(/[*_#]/g, '');

  // Ensure any liturgical introductory phrases never have trailing chapter or verse numbers
  cleaned = cleaned.replace(
    /(The first reading is taken from (?:the book of )?[A-Za-z0-9 ]+?)\s+\d+(?::\d+[-–\w,]*)?/gi,
    '$1'
  );
  cleaned = cleaned.replace(
    /(A reading from the Holy Gospel according to [A-Za-z0-9 ]+?)\s+\d+(?::\d+[-–\w,]*)?/gi,
    '$1'
  );
  cleaned = cleaned.replace(
    /(A reading from [A-Za-z0-9 ]+?)\s+\d+(?::\d+[-–\w,]*)?/gi,
    '$1'
  );

  // Strip any remaining chapter:verse patterns like "1:11-14" or "12:1-7" so no numbers/colons are read aloud
  cleaned = cleaned.replace(/\b\d+:\d+(?:[-–]\d+[a-z]*)?\b/g, '');

  // Convert em-dashes and en-dashes into natural breathing pauses (commas)
  cleaned = cleaned.replace(/[—–]/g, ', ');

  // Convert prose colons (e.g., "Brothers and sisters:") into a brief momentary pause (comma)
  cleaned = cleaned.replace(/\s*:\s*/g, ', ');

  // Standardize multiple dots/ellipses into gentle pauses
  cleaned = cleaned.replace(/\.{2,}/g, '. ');

  // Standardize whitespace
  return cleaned.replace(/\s+/g, ' ').trim();
}

/**
 * Splits liturgical text at prose colons (such as "Brothers and sisters: ...")
 * so that the speech engine concludes the phrase before the colon with a natural downward
 * cadence and pauses momentarily before continuing to the next word.
 */
export function splitLiturgicalTextByColons(text: string): string[] {
  let cleaned = text
    .replace(/<[^>]*>/g, '')
    .replace(/[*_#]/g, '');

  cleaned = cleaned.replace(
    /(The first reading is taken from (?:the book of )?[A-Za-z0-9 ]+?)\s+\d+(?::\d+[-–\w,]*)?/gi,
    '$1'
  );
  cleaned = cleaned.replace(
    /(A reading from the Holy Gospel according to [A-Za-z0-9 ]+?)\s+\d+(?::\d+[-–\w,]*)?/gi,
    '$1'
  );
  cleaned = cleaned.replace(
    /(A reading from [A-Za-z0-9 ]+?)\s+\d+(?::\d+[-–\w,]*)?/gi,
    '$1'
  );

  // Strip chapter:verse patterns first so scripture numbers are not treated as prose colons
  cleaned = cleaned.replace(/\b\d+:\d+(?:[-–]\d+[a-z]*)?\b/g, '');

  // Convert em-dashes and en-dashes into commas
  cleaned = cleaned.replace(/[—–]/g, ', ');

  // Split on remaining prose colons
  const rawSegments = cleaned.split(':');
  const segments: string[] = [];

  for (let i = 0; i < rawSegments.length; i++) {
    let seg = rawSegments[i]
      .replace(/\.{2,}/g, '. ')
      .replace(/\s+/g, ' ')
      .trim();
    if (!seg) continue;

    // Ensure every segment preceding a colon ends with a full stop for proper lector inflection
    if (i < rawSegments.length - 1 && !/[.!?]["'”’)]*$/.test(seg)) {
      seg += '.';
    }
    segments.push(seg);
  }

  return segments;
}

export interface FemaleVoiceProfile {
  id: string;
  name: string;
  description: string;
  pitch: number;
  rate: number;
  voiceKeyword?: string;
}

export type RecitationVoiceId = 'ava-grace' | 'david';

export interface RecitationVoiceOption {
  id: RecitationVoiceId;
  name: string;
  shortLabel: string;
  role: string;
  gender: 'female' | 'male';
  isPrioritized: boolean;
}

export const RECITATION_VOICES: RecitationVoiceOption[] = [
  {
    id: 'ava-grace',
    name: 'Ava Grace',
    shortLabel: 'Ava Grace',
    role: 'Serene Devotional Voice (Prioritized)',
    gender: 'female',
    isPrioritized: true
  },
  {
    id: 'david',
    name: 'Microsoft David',
    shortLabel: 'David',
    role: 'Traditional Solemn Lector',
    gender: 'male',
    isPrioritized: false
  }
];

export const SACRED_FEMALE_PERSONAS: FemaleVoiceProfile[] = [
  { id: 'persona-ava', name: 'Ava Grace (Devotional and Serene • Prioritized Voice)', description: 'Luminous, clear, serene devotional cadence', pitch: 1.04, rate: 0.92, voiceKeyword: 'ava' },
  { id: 'persona-aria', name: 'Aria Devotional (Serene Natural Melodic Contemplation)', description: 'Natural neural melodic cadence for prayer', pitch: 1.02, rate: 0.90, voiceKeyword: 'aria' },
  { id: 'persona-sonia', name: 'Sister Sonia (British Cathedral Cadence • High Soprano)', description: 'Solemn, serene UK soprano cadence', pitch: 1.15, rate: 0.88, voiceKeyword: 'sonia' },
  { id: 'persona-clara', name: 'Clara Sanctuary (Lectio Divina • Soft Balanced Tone)', description: 'Soft, natural, peaceful acoustic balance', pitch: 1.05, rate: 0.90, voiceKeyword: 'clara' }
];

export interface SaintReaderPersona {
  id: string;
  saintName: string;
  title: string;
  timbreDescription: string;
  era: string;
  pitch: number;
  rate: number;
  voiceKeywords: string[];
  sampleQuote: string;
}

export const SACRED_MALE_SAINT_PERSONAS: SaintReaderPersona[] = [
  {
    id: 'saint-thomas-aquinas',
    saintName: 'St. Thomas Aquinas',
    title: 'Doctor Angelicus (Angelic Doctor)',
    timbreDescription: 'Deep Scholastic Baritone • Measured and Contemplative',
    era: '1225–1274 • Medieval Scholastic',
    pitch: 0.86,
    rate: 0.86,
    voiceKeywords: ['david', 'george', 'charles', 'alex'],
    sampleQuote: 'Grant me, O Lord my God, a mind to know you, a heart to seek you, and wisdom to find you.'
  },
  {
    id: 'saint-john-chrysostom',
    saintName: 'St. John Chrysostom',
    title: 'Doctor of the Eucharist (Golden-Mouthed)',
    timbreDescription: 'Oratorical Tenor • Resonant and Dynamic',
    era: '347–407 • Eastern Church Father',
    pitch: 1.25,
    rate: 0.94,
    voiceKeywords: ['ryan', 'aaron', 'tom'],
    sampleQuote: 'Prayer is the light of the soul, giving us true knowledge of God.'
  },
  {
    id: 'saint-augustine',
    saintName: 'St. Augustine of Hippo',
    title: 'Doctor of Grace (Doctor Gratiae)',
    timbreDescription: 'Deep Contemplative Baritone • Soulful and Meditative (0.88x)',
    era: '354–430 • Latin Church Father',
    pitch: 0.82,
    rate: 0.88,
    voiceKeywords: ['david', 'guy', 'james', 'charles', 'connor', 'en-us'],
    sampleQuote: 'You have made us for yourself, O Lord, and our heart is restless until it rests in you.'
  },
  {
    id: 'saint-jerome',
    saintName: 'St. Jerome',
    title: 'Doctor of Sacred Scripture',
    timbreDescription: 'Austere Monastic Bass • Firm and Resonant (0.80x)',
    era: '347–420 • Biblical Translator and Hermit',
    pitch: 0.65,
    rate: 0.80,
    voiceKeywords: ['fred', 'richard', 'william', 'mark'],
    sampleQuote: 'Ignorance of the Scriptures is ignorance of Christ.'
  },
  {
    id: 'pope-saint-gregory',
    saintName: 'Pope St. Gregory the Great',
    title: 'Doctor of the Church (Consul Dei)',
    timbreDescription: 'Pontifical Baritone • Paternal and Solemn (0.82x)',
    era: '540–604 • Supreme Pontiff',
    pitch: 0.74,
    rate: 0.82,
    voiceKeywords: ['thomas', 'charles', 'brian'],
    sampleQuote: 'The proof of love is in the works. Where love exists, it works great things.'
  },
  {
    id: 'saint-ambrose',
    saintName: 'St. Ambrose of Milan',
    title: 'Doctor of the Church',
    timbreDescription: 'Vigorous Roman Tenor • Brisk and Commanding (1.10x)',
    era: '340–397 • Bishop of Milan',
    pitch: 1.18,
    rate: 1.10,
    voiceKeywords: ['ryan', 'daniel', 'aaron', 'tom', 'alex', 'en-au'],
    sampleQuote: 'When we speak of wisdom, we are speaking of Christ.'
  },
  {
    id: 'saint-cyril',
    saintName: 'St. Cyril of Alexandria',
    title: 'Doctor of the Incarnation',
    timbreDescription: 'Authoritative Theological Bass • Resolute and Doctrinal (1.05x)',
    era: '376–444 • Patriarch of Alexandria',
    pitch: 0.60,
    rate: 1.05,
    voiceKeywords: ['mark', 'richard', 'fred', 'eric', 'alex', 'steffen', 'mitchell'],
    sampleQuote: 'Christ is the true bread from heaven, giving life unto all the world.'
  },
  {
    id: 'venerable-bede',
    saintName: 'The Venerable Bede',
    title: 'Doctor of the Church and Monastic Historian',
    timbreDescription: 'High Gentle Monastic • Serene Anglo-Saxon Cadence (0.74x)',
    era: '672–735 • Monastic Priest of Jarrow',
    pitch: 1.28,
    rate: 0.74,
    voiceKeywords: ['google uk english male', 'george', 'oliver', 'arthur', 'ryan', 'daniel', 'en-gb', 'uk', 'british'],
    sampleQuote: 'I have always taken delight in learning, or teaching, or writing for Christ.'
  },
  {
    id: 'saint-basil',
    saintName: 'St. Basil the Great',
    title: 'Father of Eastern Monasticism',
    timbreDescription: 'Dignified Baritone • Ascetic and Clear',
    era: '330–379 • Bishop of Caesarea',
    pitch: 0.94,
    rate: 0.90,
    voiceKeywords: ['daniel', 'thomas', 'ryan'],
    sampleQuote: 'A tree is known by its fruit; a man by his deeds. A good deed is never lost.'
  },
  {
    id: 'cornelius-a-lapide',
    saintName: 'Cornelius à Lapide, S.J.',
    title: 'Master Biblical Exegete',
    timbreDescription: 'Expository Tenor • Clear and Illuminating',
    era: '1567–1637 • Jesuit Scriptural Master',
    pitch: 1.05,
    rate: 0.93,
    voiceKeywords: ['james', 'aaron', 'ryan'],
    sampleQuote: 'Sacred Scripture is the holy river whose streams make glad the city of God.'
  },
  {
    id: 'blessed-theophylact',
    saintName: 'Blessed Theophylact',
    title: 'Byzantine Scriptural Exegete',
    timbreDescription: 'Lyrical Tenor • Reverent and Clear',
    era: '1055–1107 • Archbishop of Ohrid',
    pitch: 1.12,
    rate: 0.88,
    voiceKeywords: ['oliver', 'ryan', 'daniel'],
    sampleQuote: 'Watch at every hour of life, that Christ finding you vigilant may receive you into His joy.'
  },
  {
    id: 'saint-bonaventure',
    saintName: 'St. Bonaventure',
    title: 'Doctor Seraphicus (Seraphic Doctor)',
    timbreDescription: 'Seraphic Tenor • Warm, Devotional and Luminous',
    era: '1221–1274 • Franciscan Doctor',
    pitch: 1.18,
    rate: 0.91,
    voiceKeywords: ['ryan', 'aaron', 'george'],
    sampleQuote: 'Theology is the science that teaches how to love God above all things.'
  },
  {
    id: 'saint-alphonsus',
    saintName: 'St. Alphonsus Liguori',
    title: 'Doctor Zelantissimus (Zealous Doctor)',
    timbreDescription: 'Pastoral Baritone • Earnest, Paternal and Soulful',
    era: '1696–1787 • Founder of Redemptorists',
    pitch: 0.84,
    rate: 0.92,
    voiceKeywords: ['thomas', 'charles', 'david'],
    sampleQuote: 'He who loves God easily prays always, and in prayer finds all graces.'
  },
  {
    id: 'saint-bellarmine',
    saintName: 'St. Robert Bellarmine',
    title: 'Doctor of the Church and Apologist',
    timbreDescription: 'Scholastic Bass-Baritone • Authoritative and Clear',
    era: '1542–1621 • Cardinal and Theologian',
    pitch: 0.76,
    rate: 0.94,
    voiceKeywords: ['mark', 'fred', 'james'],
    sampleQuote: 'Study without prayer is barren; prayer without study is blind.'
  },
  {
    id: 'saint-albert',
    saintName: 'St. Albert the Great',
    title: 'Doctor Universalis (Universal Doctor)',
    timbreDescription: 'Intellectual Baritone • Deep, Wise and Analytical',
    era: '1200–1280 • Dominican Doctor',
    pitch: 0.80,
    rate: 0.85,
    voiceKeywords: ['david', 'george', 'brian'],
    sampleQuote: 'The aim of natural science is not simply to accept the statements of others, but to investigate the causes that are at work in nature.'
  },
  {
    id: 'general-lector',
    saintName: 'Patristic Lector',
    title: 'Reverent Catholic Lector',
    timbreDescription: 'Solemn Liturgical Baritone',
    era: 'Sacred Tradition',
    pitch: 0.92,
    rate: 0.89,
    voiceKeywords: ['david', 'daniel'],
    sampleQuote: 'Let us attend to the sacred words of the holy Fathers of the Church.'
  }
];

export function getSaintReaderPersona(nameOrExcerpt: string): SaintReaderPersona {
  const norm = (nameOrExcerpt || '').toLowerCase();
  if (norm.includes('chrysostom')) return SACRED_MALE_SAINT_PERSONAS.find(p => p.id === 'saint-john-chrysostom')!;
  if (norm.includes('augustine')) return SACRED_MALE_SAINT_PERSONAS.find(p => p.id === 'saint-augustine')!;
  if (norm.includes('jerome')) return SACRED_MALE_SAINT_PERSONAS.find(p => p.id === 'saint-jerome')!;
  if (norm.includes('gregory')) return SACRED_MALE_SAINT_PERSONAS.find(p => p.id === 'pope-saint-gregory')!;
  if (norm.includes('ambrose')) return SACRED_MALE_SAINT_PERSONAS.find(p => p.id === 'saint-ambrose')!;
  if (norm.includes('cyril')) return SACRED_MALE_SAINT_PERSONAS.find(p => p.id === 'saint-cyril')!;
  if (norm.includes('bede')) return SACRED_MALE_SAINT_PERSONAS.find(p => p.id === 'venerable-bede')!;
  if (norm.includes('basil')) return SACRED_MALE_SAINT_PERSONAS.find(p => p.id === 'saint-basil')!;
  if (norm.includes('lapide')) return SACRED_MALE_SAINT_PERSONAS.find(p => p.id === 'cornelius-a-lapide')!;
  if (norm.includes('theophylact')) return SACRED_MALE_SAINT_PERSONAS.find(p => p.id === 'blessed-theophylact')!;
  if (norm.includes('bonaventure')) return SACRED_MALE_SAINT_PERSONAS.find(p => p.id === 'saint-bonaventure')!;
  if (norm.includes('alphonsus') || norm.includes('liguori')) return SACRED_MALE_SAINT_PERSONAS.find(p => p.id === 'saint-alphonsus')!;
  if (norm.includes('bellarmine') || norm.includes('robert')) return SACRED_MALE_SAINT_PERSONAS.find(p => p.id === 'saint-bellarmine')!;
  if (norm.includes('albert')) return SACRED_MALE_SAINT_PERSONAS.find(p => p.id === 'saint-albert')!;
  if (norm.includes('thomas') || norm.includes('aquinas') || norm.includes('catena')) return SACRED_MALE_SAINT_PERSONAS.find(p => p.id === 'saint-thomas-aquinas')!;
  if (norm.includes('vatican') || norm.includes('catechism') || norm.includes('ccc') || norm.includes('magisterium') || norm.includes('benedict') || norm.includes('francis') || norm.includes('john paul')) {
    return {
      id: 'vatican-magisterium',
      saintName: 'Vatican Magisterial Teaching',
      title: 'Vatican II & Sacred Magisterium',
      timbreDescription: 'Solemn Magisterial Baritone',
      era: 'Magisterium of the Catholic Church',
      pitch: 0.95,
      rate: 0.90,
      voiceKeywords: ['david', 'daniel', 'en-us'],
      sampleQuote: 'The Sacred Liturgy is the summit toward which the activity of the Church is directed.'
    };
  }
  return SACRED_MALE_SAINT_PERSONAS.find(p => p.id === 'general-lector')!;
}

export const SAINT_PROFILE_MAP: Record<string, {
  slot: number;
  pitch: number;
  rate: number;
  preferredKeywords: string[];
}> = {
  'saint-thomas-aquinas': {
    slot: 0,
    pitch: 0.88,
    rate: 0.88,
    preferredKeywords: ['david', 'george', 'charles', 'alex', 'en-us']
  },
  'saint-john-chrysostom': {
    slot: 1,
    pitch: 1.25,
    rate: 0.96,
    preferredKeywords: ['ryan', 'aaron', 'tom', 'alex', 'google us english']
  },
  'saint-augustine': {
    slot: 2,
    pitch: 0.80,
    rate: 0.84,
    preferredKeywords: ['guy', 'james', 'charles', 'connor', 'david', 'en-us']
  },
  'saint-jerome': {
    slot: 3,
    pitch: 0.65,
    rate: 0.80,
    preferredKeywords: ['fred', 'richard', 'william', 'brian', 'mark']
  },
  'pope-saint-gregory': {
    slot: 4,
    pitch: 0.74,
    rate: 0.82,
    preferredKeywords: ['thomas', 'charles', 'brian', 'david', 'george']
  },
  'saint-ambrose': {
    slot: 5,
    pitch: 1.15,
    rate: 1.05,
    preferredKeywords: ['daniel', 'tom', 'alex', 'ryan', 'aaron', 'en-au']
  },
  'saint-cyril': {
    slot: 6,
    pitch: 0.68,
    rate: 0.98,
    preferredKeywords: ['mark', 'richard', 'fred', 'eric', 'alex', 'steffen', 'mitchell']
  },
  'venerable-bede': {
    slot: 7,
    pitch: 1.10,
    rate: 0.76,
    preferredKeywords: ['google uk english male', 'george', 'oliver', 'arthur', 'en-gb', 'uk', 'british', 'daniel']
  },
  'saint-basil': {
    slot: 8,
    pitch: 0.92,
    rate: 0.90,
    preferredKeywords: ['daniel', 'thomas', 'david', 'mark', 'ryan']
  },
  'cornelius-a-lapide': {
    slot: 9,
    pitch: 1.05,
    rate: 0.93,
    preferredKeywords: ['james', 'aaron', 'ryan', 'alex']
  },
  'blessed-theophylact': {
    slot: 10,
    pitch: 1.12,
    rate: 0.88,
    preferredKeywords: ['oliver', 'daniel', 'alex', 'ryan']
  },
  'saint-bonaventure': {
    slot: 11,
    pitch: 1.18,
    rate: 0.91,
    preferredKeywords: ['aaron', 'george', 'ryan', 'daniel']
  },
  'saint-alphonsus': {
    slot: 12,
    pitch: 0.85,
    rate: 0.92,
    preferredKeywords: ['thomas', 'charles', 'david', 'mark']
  },
  'saint-bellarmine': {
    slot: 13,
    pitch: 0.76,
    rate: 0.94,
    preferredKeywords: ['mark', 'fred', 'james', 'richard']
  },
  'saint-albert': {
    slot: 14,
    pitch: 0.80,
    rate: 0.86,
    preferredKeywords: ['david', 'george', 'brian', 'alex']
  },
  'general-lector': {
    slot: 15,
    pitch: 0.95,
    rate: 0.90,
    preferredKeywords: ['david', 'daniel', 'en-us']
  }
};

export interface CommentarySaintSection {
  id: string;
  saintName: string;
  saintTitle?: string;
  persona: SaintReaderPersona;
  text: string;
  bodyOnly: string;
}

export function parseCommentaryBySaints(commentary: BibleCommentary): CommentarySaintSection[] {
  const sections: CommentarySaintSection[] = [];
  
  // 1. Introduction section
  const introPersona = getSaintReaderPersona('Thomas Aquinas');
  sections.push({
    id: 'intro',
    saintName: 'Commentary Introduction',
    saintTitle: 'Exposition of Sacred Scripture',
    persona: introPersona,
    text: `Commentary on ${commentary.scriptureReference} from ${commentary.sourceName}.`,
    bodyOnly: `Commentary on ${commentary.scriptureReference} from ${commentary.sourceName}.`
  });

  // 2. Parse commentaryText by Saint headings
  const rawText = commentary.commentaryText.trim();
  const saintPattern = /(?:^|\n\n)([A-Z\s.,'ÀÈÉ]+?):\s*([\s\S]*?)(?=(?:\n\n[A-Z\s.,'ÀÈÉ]+?:)|$)/g;
  
  let match: RegExpExecArray | null;
  let matchesFound = 0;
  
  while ((match = saintPattern.exec(rawText)) !== null) {
    const rawSaintName = match[1].trim();
    const body = match[2].trim();
    
    const upper = rawSaintName.toUpperCase();
    if (
      rawSaintName.length > 2 && 
      (upper.includes('ST.') || upper.includes('BEDE') || upper.includes('POPE') || 
       upper.includes('AMBROSE') || upper.includes('AUGUSTINE') || upper.includes('CYRIL') ||
       upper.includes('JEROME') || upper.includes('THEOPHYLACT') || upper.includes('LAPIDE') || 
       upper.includes('CHRYSOSTOM') || upper.includes('BASIL') || upper.includes('THOMAS') ||
       upper.includes('BONAVENTURE') || upper.includes('ALPHONSUS') || upper.includes('BELLARMINE') || upper.includes('ALBERT') ||
       upper.includes('VATICAN') || upper.includes('CATECHISM') || upper.includes('CCC') || upper.includes('MAGISTERIUM') || upper.includes('BENEDICT') || upper.includes('FRANCIS') || upper.includes('PAUL') || upper.includes('LEO') ||
       upper.includes('BLESSED'))
    ) {
      matchesFound++;
      const persona = getSaintReaderPersona(rawSaintName);
      
      const formattedName = rawSaintName
        .toLowerCase()
        .replace(/\b(st\.|pope|the|of|in|and)\b/g, (w) => w.charAt(0).toUpperCase() + w.slice(1))
        .replace(/\b\w/g, (c) => c.toUpperCase())
        .replace(/St\./g, 'Saint');

      const titleAnnouncement = persona.title && !persona.title.includes('General') && !persona.title.includes('Catholic Lector') 
        ? `, ${persona.title},` 
        : '';

      sections.push({
        id: `saint-${matchesFound}`,
        saintName: formattedName,
        saintTitle: persona.title,
        persona,
        text: `${formattedName}${titleAnnouncement} writes: ${body}`,
        bodyOnly: body
      });
    }
  }

  // If no structured multi-saint headings were found, treat the whole body as one section
  if (matchesFound === 0) {
    const persona = getSaintReaderPersona(commentary.author || commentary.sourceName);
    sections.push({
      id: 'body-single',
      saintName: commentary.author || 'Church Father',
      saintTitle: persona.title,
      persona,
      text: rawText,
      bodyOnly: rawText
    });
  }

  // 3. Practical Application section
  if (commentary.practicalApplication) {
    const appPersona = getSaintReaderPersona('St. Augustine');
    sections.push({
      id: 'practical-application',
      saintName: 'Spiritual Application',
      saintTitle: 'Spiritual Fruit and Living the Gospel',
      persona: appPersona,
      text: `Spiritual fruit and practical living: ${commentary.practicalApplication}`,
      bodyOnly: commentary.practicalApplication
    });
  }

  return sections;
}

export function isFemaleVoiceName(vName: string): boolean {
  const lower = vName.toLowerCase();

  // Explicit male names must never match as female
  const explicitMale = [
    'david', 'mark', 'george', 'james', 'richard', 'daniel', 'ryan', 'guy',
    'christopher', 'eric', 'steffan', 'andrew', 'brian', 'william', 'fred',
    'alex', 'thomas', 'charles', 'connor', 'oliver', 'arthur', 'aaron', 'tom',
    'google uk english male'
  ];
  if (explicitMale.some(m => lower.includes(m))) return false;

  // Explicit female names or indicators - Google US English is strictly female in Chrome!
  const femaleKeywords = [
    'female', 'woman', 'girl', 'ava', 'grace', 'serena', 'victoria', 
    'samantha', 'karen', 'moira', 'fiona', 'tessa', 'veena', 
    'susan', 'hazel', 'heera', 'catherine', 'linda', 
    'clara', 'sonia', 'anna', 'helena', 'ioana', 'laura', 'maria', 
    'monica', 'paulina', 'steffi', 'yelda', 'yuna', 'ayanda',
    'google us english', 'google uk english female', 'siri', 'cortana',
    'jenny', 'aria', 'guyana', 'libby', 'natasha', 'stephanie',
    'cindy', 'olivia', 'emma', 'chloe', 'zoe', 'alice',
    'kate', 'mary', 'sally', 'alva', 'kendra', 'kimberly', 'joanna', 'salli', 'zira'
  ];
  return femaleKeywords.some(f => lower.includes(f));
}

export function isMaleVoiceName(vName: string): boolean {
  const lower = vName.toLowerCase();
  const explicitMale = [
    'david', 'mark', 'george', 'james', 'richard', 'daniel', 'ryan', 'guy',
    'christopher', 'eric', 'steffan', 'andrew', 'brian', 'william', 'fred',
    'alex', 'thomas', 'charles', 'connor', 'oliver', 'arthur', 'aaron', 'tom',
    'google uk english male', 'male', 'man'
  ];
  if (explicitMale.some(m => lower.includes(m))) return true;
  return !isFemaleVoiceName(vName);
}

export class SacredReader {
  private static synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private static cachedVoices: SpeechSynthesisVoice[] = [];
  private static isSpeakingState = false;
  private static currentPartIndexState = -1;
  private static sequenceQueue: SpeechPart[] = [];
  private static listeners: ((speaking: boolean, currentPartId?: string) => void)[] = [];
  private static isSequenceActive = false;
  private static pauseTimer: ReturnType<typeof setTimeout> | null = null;
  private static COLON_PAUSE_MS = 480;
  private static activeUtterance: SpeechSynthesisUtterance | null = null;
  private static keepAliveTimer: ReturnType<typeof setInterval> | null = null;

  private static startKeepAlive(): void {
    if (this.keepAliveTimer) clearInterval(this.keepAliveTimer);
    this.keepAliveTimer = setInterval(() => {
      if (this.synth && this.synth.speaking && !this.synth.paused) {
        this.synth.pause();
        this.synth.resume();
      }
    }, 8000);
  }

  private static stopKeepAlive(): void {
    if (this.keepAliveTimer) {
      clearInterval(this.keepAliveTimer);
      this.keepAliveTimer = null;
    }
    this.activeUtterance = null;
  }

  static {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const loadVoices = () => {
        SacredReader.cachedVoices = window.speechSynthesis.getVoices();
      };
      loadVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }
  }

  public static addListener(listener: (speaking: boolean, currentPartId?: string) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private static notify(speaking: boolean, currentPartId?: string) {
    this.isSpeakingState = speaking;
    this.listeners.forEach(l => l(speaking, currentPartId));
  }

  public static pause(): void {
    if (this.synth && this.synth.speaking) {
      this.synth.pause();
      this.notify(true, undefined);
    }
  }

  public static resume(): void {
    if (this.synth && this.synth.paused) {
      this.synth.resume();
      this.notify(true, undefined);
    }
  }

  public static isPaused(): boolean {
    return this.synth ? this.synth.paused : false;
  }

  private static currentRate: number = typeof localStorage !== 'undefined' ? parseFloat(localStorage.getItem('soul_sanctum_speech_rate') || '0.93') : 0.93;

  public static setPlaybackRate(rate: number): void {
    this.currentRate = rate;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('soul_sanctum_speech_rate', rate.toString());
    }
  }

  public static getPlaybackRate(): number {
    return this.currentRate;
  }

  public static isSpeaking(): boolean {
    return this.synth ? this.synth.speaking || this.isSpeakingState : false;
  }

  public static stop(): void {
    this.isSequenceActive = false;
    this.sequenceQueue = [];
    this.currentPartIndexState = -1;
    if (this.pauseTimer) {
      clearTimeout(this.pauseTimer);
      this.pauseTimer = null;
    }
    this.stopKeepAlive();
    if (this.synth) {
      this.synth.cancel();
      this.notify(false);
    }
  }

  private static selectedFemaleVoiceName: string | null = typeof localStorage !== 'undefined' ? (localStorage.getItem('soul_sanctum_female_voice') || 'persona-ava') : 'persona-ava';
  private static selectedRecitationVoiceId: RecitationVoiceId = typeof localStorage !== 'undefined' 
    ? ((localStorage.getItem('soul_sanctum_recitation_voice') as RecitationVoiceId) || 'ava-grace') 
    : 'ava-grace';

  public static getRecitationVoice(): RecitationVoiceId {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('soul_sanctum_recitation_voice') as RecitationVoiceId | null;
      if (saved === 'ava-grace' || saved === 'david') {
        this.selectedRecitationVoiceId = saved;
        return saved;
      }
    }
    // Default and Prioritized: Ava Grace
    return 'ava-grace';
  }

  public static setRecitationVoice(voice: RecitationVoiceId): void {
    this.selectedRecitationVoiceId = voice;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('soul_sanctum_recitation_voice', voice);
    }
  }

  /**
   * High-fidelity voice matching for Ava Grace.
   * Prioritizes:
   * 1. Voice containing 'ava' (Apple Ava Premium, Microsoft Ava Online, etc.)
   * 2. Voice containing 'grace'
   * 3. Serene, natural female voices (Jenny, Aria, Sonia, Samantha, Victoria, Google US English)
   */
  public static getVoiceForAvaGrace(): { voice: SpeechSynthesisVoice | null; pitch: number; rate: number } {
    if (!this.synth && typeof window !== 'undefined') {
      this.synth = window.speechSynthesis;
    }
    if (!this.synth) {
      return { voice: null, pitch: 1.18, rate: 0.90 };
    }

    const liveVoices = this.synth.getVoices();
    if (liveVoices && liveVoices.length > 0) {
      this.cachedVoices = liveVoices;
    }
    const all = this.cachedVoices.length > 0 ? this.cachedVoices : [];

    // Strictly exclude ALL male voices (Microsoft David, Mark, etc.) and robotic dispatchers
    const femaleVoices = all.filter(v => {
      const n = v.name.toLowerCase();
      if (isMaleVoiceName(n)) return false;
      return !['espeak', 'robot', 'mechanical', 'klatt', 'synth', 'speech-dispatcher', 'mbrola', 'bad', 'whisper'].some(r => n.includes(r));
    });

    const nonZiraFemale = femaleVoices.filter(v => !v.name.toLowerCase().includes('zira'));

    // 1. Highest Priority: exact or partial match for "Ava" (Apple Ava, Edge Ava Online, en-US-AvaMultilingualNeural)
    let matched = nonZiraFemale.find(v => v.name.toLowerCase().includes('ava'));

    // 2. Second Priority: match for "Grace" (Apple Grace, Edge Grace Online, en-US-GraceNeural)
    if (!matched) {
      matched = nonZiraFemale.find(v => v.name.toLowerCase().includes('grace'));
    }

    // 3. Third Priority: Natural/neural serene female voices (Google US English, Jenny, Aria, Sonia, etc.)
    if (!matched) {
      const sereneKeywords = [
        'google us english', 
        'google uk english female', 
        'jenny', 
        'aria', 
        'sonia', 
        'clara', 
        'samantha', 
        'serena', 
        'victoria', 
        'karen', 
        'allison', 
        'susan', 
        'nora', 
        'fiona', 
        'moira',
        'natural',
        'neural',
        'online'
      ];
      for (const kw of sereneKeywords) {
        matched = nonZiraFemale.find(v => {
          const n = v.name.toLowerCase();
          return n.includes(kw) && v.lang.toLowerCase().startsWith('en');
        });
        if (matched) break;
      }
    }

    // 4. Any English non-Zira female voice
    if (!matched) {
      matched = nonZiraFemale.find(v => v.lang.toLowerCase().startsWith('en'));
    }

    // 5. Any non-Zira female voice
    if (!matched && nonZiraFemale.length > 0) {
      matched = nonZiraFemale[0];
    }

    // 6. If the system only has one installed female voice (never fall back to David/male!),
    // use that female voice with Ava Grace's lifted serene soprano pitch (1.22) and devotional rate (0.89)
    if (!matched && femaleVoices.length > 0) {
      matched = femaleVoices.find(v => v.lang.toLowerCase().startsWith('en')) || femaleVoices[0];
      return {
        voice: matched,
        pitch: 1.22,
        rate: 0.89
      };
    }

    return {
      voice: matched || null,
      pitch: 1.08,
      rate: 0.91
    };
  }

  /**
   * High-fidelity voice matching for Microsoft David.
   */
  public static getVoiceForDavid(): { voice: SpeechSynthesisVoice | null; pitch: number; rate: number } {
    if (!this.synth && typeof window !== 'undefined') {
      this.synth = window.speechSynthesis;
    }
    if (!this.synth) {
      return { voice: null, pitch: 1.0, rate: 0.92 };
    }

    const liveVoices = this.synth.getVoices();
    if (liveVoices && liveVoices.length > 0) {
      this.cachedVoices = liveVoices;
    }
    const all = this.cachedVoices.length > 0 ? this.cachedVoices : [];

    const davidVoice = all.find(v => {
      const name = v.name.toLowerCase();
      return name.includes('microsoft david') || (name.includes('david') && !isFemaleVoiceName(name));
    });

    const roboticKeywords = ['espeak', 'robot', 'mechanical', 'klatt', 'synth', 'speech-dispatcher', 'mbrola', 'bad', 'whisper'];
    const nonRobotic = all.filter(v => !roboticKeywords.some(r => v.name.toLowerCase().includes(r)));
    const englishMale = nonRobotic.filter(v => v.lang.toLowerCase().startsWith('en') && isMaleVoiceName(v.name));
    const anyMale = nonRobotic.filter(v => isMaleVoiceName(v.name));

    return {
      voice: davidVoice || englishMale[0] || anyMale[0] || (all.length > 0 ? all[0] : null),
      pitch: 1.0,
      rate: 0.92
    };
  }

  /**
   * Get voice matching current active recitation preference (defaults to Ava Grace).
   */
  public static getVoiceForCurrentRecitation(overrideVoice?: RecitationVoiceId): { voice: SpeechSynthesisVoice | null; pitch: number; rate: number } {
    const selected = overrideVoice || this.getRecitationVoice();
    if (selected === 'david') {
      return this.getVoiceForDavid();
    }
    return this.getVoiceForAvaGrace();
  }

  /**
   * Find natural human voice matching the requested gender ('female' or 'male').
   * Supports both explicit system TTS voices and Sacred Acoustic Personas.
   */
  public static getAvailableFemaleVoices(): { id: string; name: string; lang: string; isSelected: boolean }[] {
    if (!this.synth && typeof window !== 'undefined') {
      this.synth = window.speechSynthesis;
    }
    
    if (this.synth) {
      this.cachedVoices = this.synth.getVoices();
    }

    const currentSelection = this.selectedFemaleVoiceName || 'persona-ava';

    // 1. Include the Sacred Female Voice Personas (Ava Grace first)
    const personaItems = SACRED_FEMALE_PERSONAS.map(p => ({
      id: p.id,
      name: `${p.name}`,
      lang: 'en-US/UK',
      isSelected: currentSelection === p.id
    }));

    // 2. Also append physical system TTS voices if available (excluding Zira, Serena, Victoria)
    const roboticKeywords = ['espeak', 'robot', 'mechanical', 'klatt', 'synth', 'speech-dispatcher', 'mbrola', 'bad', 'whisper', 'zira', 'serena', 'victoria'];

    const physicalVoices = (this.cachedVoices || []).filter(v => {
      const name = v.name.toLowerCase();
      return !roboticKeywords.some(r => name.includes(r)) && !isMaleVoiceName(name);
    }).map(v => ({
      id: v.name,
      name: `Installed: ${v.name}`,
      lang: v.lang,
      isSelected: currentSelection === v.name
    }));

    // Deduplicate and combine
    return [...personaItems, ...physicalVoices];
  }

  /**
   * Returns list of physical voices available in the user's browser/system for Patristic readers.
   * Labels voices with their gender and accent/locale for clear user selection.
   */
  public static getAvailableMaleVoices(): { id: string; name: string; lang: string }[] {
    if (!this.synth && typeof window !== 'undefined') {
      this.synth = window.speechSynthesis;
    }
    if (this.synth) {
      this.cachedVoices = this.synth.getVoices();
    }
    const allVoices = this.cachedVoices.length > 0 ? this.cachedVoices : [];
    const nonRobotic = allVoices.filter(v => !['espeak', 'robot', 'mechanical', 'klatt', 'synth', 'speech-dispatcher', 'mbrola', 'bad', 'whisper'].some(r => v.name.toLowerCase().includes(r)));
    const englishVoices = nonRobotic.filter(v => v.lang.toLowerCase().startsWith('en'));
    const candidateVoices = englishVoices.length > 0 ? englishVoices : (nonRobotic.length > 0 ? nonRobotic : allVoices);

    // Prioritize male voices first, followed by other natural regional voices
    const maleVoices = candidateVoices.filter(v => isMaleVoiceName(v.name));
    const otherVoices = candidateVoices.filter(v => !isMaleVoiceName(v.name));
    const orderedPool = [...maleVoices, ...otherVoices];

    return orderedPool.map(v => {
      const isMale = isMaleVoiceName(v.name);
      const isUK = v.lang.toLowerCase().includes('gb') || v.name.toLowerCase().includes('uk') || v.name.toLowerCase().includes('british');
      const isUS = v.lang.toLowerCase().includes('us') || v.name.toLowerCase().includes('united states');
      const isAU = v.lang.toLowerCase().includes('au') || v.name.toLowerCase().includes('australia');
      const isIE = v.lang.toLowerCase().includes('ie') || v.name.toLowerCase().includes('ireland');
      
      const localeTag = isUK ? 'British UK' : isAU ? 'Australian' : isIE ? 'Irish' : isUS ? 'US' : v.lang;
      const roleTag = isMale ? 'Male' : 'Lector';

      return {
        id: v.name,
        name: `${v.name} (${localeTag} • ${roleTag})`,
        lang: v.lang
      };
    });
  }

  /**
   * Automatically distributes all available installed voices across the 16 Church Father personas
   * so that each Saint has a genuinely different voice profile.
   */
  public static autoAssignDistinctSaintVoices(): void {
    if (typeof localStorage === 'undefined') return;
    const voices = this.getAvailableMaleVoices();
    if (voices.length === 0) return;

    const assignedVoiceIds = new Set<string>();

    SACRED_MALE_SAINT_PERSONAS.forEach((persona, idx) => {
      const profile = SAINT_PROFILE_MAP[persona.id];
      let assignedVoiceId: string | null = null;

      if (profile && profile.preferredKeywords) {
        for (const kw of profile.preferredKeywords) {
          const match = voices.find(v => v.id.toLowerCase().includes(kw) && !assignedVoiceIds.has(v.id));
          if (match) {
            assignedVoiceId = match.id;
            break;
          }
        }
      }

      if (!assignedVoiceId) {
        const unused = voices.find(v => !assignedVoiceIds.has(v.id));
        assignedVoiceId = unused ? unused.id : voices[idx % voices.length].id;
      }

      if (assignedVoiceId) {
        assignedVoiceIds.add(assignedVoiceId);
        localStorage.setItem(`soul_sanctum_saint_voice_${persona.id}`, assignedVoiceId);
      }
    });
  }

  public static getCustomSaintVoice(saintId: string): string | null {
    if (typeof localStorage === 'undefined') return null;
    return localStorage.getItem(`soul_sanctum_saint_voice_${saintId}`);
  }

  public static setCustomSaintVoice(saintId: string, voiceName: string): void {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem(`soul_sanctum_saint_voice_${saintId}`, voiceName);
  }

  public static resetAllSaintVoices(): void {
    if (typeof localStorage === 'undefined') return;
    SACRED_MALE_SAINT_PERSONAS.forEach(p => {
      localStorage.removeItem(`soul_sanctum_saint_voice_${p.id}`);
    });
  }

  public static setSelectedFemaleVoiceName(voiceNameOrId: string) {
    this.selectedFemaleVoiceName = voiceNameOrId;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('soul_sanctum_female_voice', voiceNameOrId);
    }
  }

  public static previewFemaleVoice(voiceIdOrName?: string): void {
    if (voiceIdOrName) {
      this.setSelectedFemaleVoiceName(voiceIdOrName);
    }
    const voiceInfo = this.getAvailableFemaleVoices().find(v => v.id === (voiceIdOrName || this.selectedFemaleVoiceName) || v.isSelected);
    const rawName = voiceInfo ? voiceInfo.name.replace(/\(.*?\)/g, '').replace(/Installed:/g, '').trim() : 'Sister Sonia';
    const text = `Peace be with you. This is ${rawName} proclaiming God's word.`;
    this.speak(text, undefined, 'female');
  }

  public static cycleNextFemaleVoice(): string {
    const voices = this.getAvailableFemaleVoices();
    if (voices.length === 0) return 'Sister Sonia';
    
    const currentIndex = voices.findIndex(v => v.isSelected);
    const nextIndex = (currentIndex + 1) % voices.length;
    const nextVoice = voices[nextIndex];
    
    this.setSelectedFemaleVoiceName(nextVoice.id);
    this.previewFemaleVoice(nextVoice.id);
    return nextVoice.name;
  }

  /**
   * Find natural human voice matching the requested gender ('female' or 'male').
   * Prioritizes Ava Grace for female and Microsoft David for male.
   */
  public static getVoiceForGender(gender: 'female' | 'male'): { voice: SpeechSynthesisVoice | null; pitch: number; rate: number } {
    if (gender === 'female') {
      return this.getVoiceForAvaGrace();
    } else {
      return this.getVoiceForDavid();
    }
  }

  /**
   * Speak a single passage with requested voice or rate.
   * Prioritizes Ava Grace by default unless specified otherwise.
   */
  public static speak(
    text: string, 
    onEnd?: () => void, 
    voiceOrGenderOrRate?: 'ava-grace' | 'david' | 'female' | 'male' | number,
    customRate?: number
  ): void {
    if (!this.synth) return;

    this.stop();

    const cleanText = prepareLiturgicalTextForSpeech(text);
    if (!cleanText) return;

    let voiceConfig: { voice: SpeechSynthesisVoice | null; pitch: number; rate: number };

    if (voiceOrGenderOrRate === 'david' || voiceOrGenderOrRate === 'male') {
      voiceConfig = this.getVoiceForDavid();
    } else if (voiceOrGenderOrRate === 'ava-grace' || voiceOrGenderOrRate === 'female') {
      voiceConfig = this.getVoiceForAvaGrace();
    } else {
      // Prioritize active recitation voice (Ava Grace by default)
      voiceConfig = this.getVoiceForCurrentRecitation();
    }

    const rateOverride = typeof voiceOrGenderOrRate === 'number' ? voiceOrGenderOrRate : customRate;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    if (voiceConfig.voice) utterance.voice = voiceConfig.voice;
    utterance.pitch = voiceConfig.pitch;
    utterance.rate = rateOverride || voiceConfig.rate;

    this.activeUtterance = utterance;

    utterance.onstart = () => {
      this.startKeepAlive();
      this.notify(true);
    };

    utterance.onend = () => {
      this.stopKeepAlive();
      this.notify(false);
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.stopKeepAlive();
      this.notify(false);
      if (onEnd) onEnd();
    };

    this.synth.speak(utterance);
  }

  /**
   * Speak multiple parts in sequence, alternating voices per part:
   * First Reading by a woman, Responsorial Psalm by a woman, Gospel by a man.
   */
  public static speakLiturgicalSequence(
    parts: SpeechPart[],
    onEnd?: () => void,
    onPartStart?: (part: SpeechPart, index: number) => void,
    overrideVoice?: RecitationVoiceId
  ): void {
    if (!this.synth || parts.length === 0) return;

    this.stop();
    this.isSequenceActive = true;
    this.sequenceQueue = [...parts];

    const activeRecitationVoice = overrideVoice || this.getRecitationVoice();

    const playNext = (index: number) => {
      if (!this.isSequenceActive || index >= this.sequenceQueue.length) {
        this.stop();
        if (onEnd) onEnd();
        return;
      }

      const currentPart = this.sequenceQueue[index];
      this.currentPartIndexState = index;
      
      const cleanText = prepareLiturgicalTextForSpeech(currentPart.text);

      if (!cleanText) {
        playNext(index + 1);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(cleanText);
      
      // Each liturgical part specifies its gender:
      // Default: First Reading and Responsorial Psalm ('female' -> Ava Grace), Gospel ('male' -> David).
      // If overrideVoice === 'david' is explicitly passed, use David.
      let voiceConfig: { voice: SpeechSynthesisVoice | null; pitch: number; rate: number };
      if (overrideVoice === 'david') {
        voiceConfig = this.getVoiceForDavid();
      } else {
        voiceConfig = this.getVoiceForGender(currentPart.gender);
      }

      if (voiceConfig.voice) utterance.voice = voiceConfig.voice;
      utterance.pitch = voiceConfig.pitch;
      utterance.rate = voiceConfig.rate;

      this.activeUtterance = utterance;

      utterance.onstart = () => {
        if (!this.isSequenceActive) return;
        this.startKeepAlive();
        this.notify(true, currentPart.id);
        if (onPartStart) onPartStart(currentPart, index);
      };

      utterance.onend = () => {
        this.stopKeepAlive();
        if (!this.isSequenceActive) return;
        this.pauseTimer = setTimeout(() => {
          if (this.isSequenceActive) {
            playNext(index + 1);
          }
        }, 400);
      };

      utterance.onerror = () => {
        this.stopKeepAlive();
        if (!this.isSequenceActive) return;
        playNext(index + 1);
      };

      if (this.synth) {
        this.synth.speak(utterance);
      }
    };

    playNext(0);
  }

  /**
   * Returns all available Sacred Male Saint reader personas with their acoustic profiles.
   */
  public static getAvailableSaintPersonas(): SaintReaderPersona[] {
    return SACRED_MALE_SAINT_PERSONAS;
  }

  /**
   * Returns the descriptive name of the voice currently assigned to a Saint or persona.
   * Strictly uses Microsoft David.
   */
  public static getSaintAssignedVoiceName(saintId?: string): string {
    const { voice } = this.getVoiceForSaint(saintId);
    if (voice) {
      return voice.name;
    }
    return 'Microsoft David (English US)';
  }

  /**
   * Dedicated voice for Catholic Bible Commentary expositions:
   * Prioritizes Ava Grace (or Microsoft David if selected).
   */
  public static getVoiceForSaint(saintOrAuthor?: string, overrideVoice?: RecitationVoiceId): { 
    voice: SpeechSynthesisVoice | null; 
    pitch: number; 
    rate: number; 
    persona: SaintReaderPersona; 
  } {
    const persona = getSaintReaderPersona(saintOrAuthor || '');
    const voiceConfig = this.getVoiceForCurrentRecitation(overrideVoice);
    return {
      voice: voiceConfig.voice,
      pitch: voiceConfig.pitch,
      rate: voiceConfig.rate,
      persona
    };
  }

  /**
   * Preview a Saint's quotation using Microsoft David.
   */
  public static previewSaintVoice(personaId: string, customQuote?: string, onEnd?: () => void): void {
    const persona = SACRED_MALE_SAINT_PERSONAS.find(p => p.id === personaId) || SACRED_MALE_SAINT_PERSONAS[0];
    const text = customQuote || `${persona.saintName}: "${persona.sampleQuote}"`;

    if (!this.synth) return;
    this.stop();

    const utterance = new SpeechSynthesisUtterance(prepareLiturgicalTextForSpeech(text));
    const { voice, pitch, rate } = this.getVoiceForSaint(persona.id);
    if (voice) utterance.voice = voice;
    utterance.pitch = pitch;
    utterance.rate = rate;

    this.activeUtterance = utterance;

    utterance.onstart = () => {
      this.startKeepAlive();
      this.notify(true, persona.id);
    };

    utterance.onend = () => {
      this.stopKeepAlive();
      this.notify(false);
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.stopKeepAlive();
      this.notify(false);
      if (onEnd) onEnd();
    };

    this.synth.speak(utterance);
  }

  /**
   * Speaks a single saint's commentary excerpt using Microsoft David.
   */
  public static speakSingleSaintExposition(
    saintName: string, 
    text: string, 
    onEnd?: () => void
  ): void {
    if (!this.synth) return;
    this.stop();

    const cleanText = prepareLiturgicalTextForSpeech(text);
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const { voice, pitch, rate, persona } = this.getVoiceForSaint(saintName);

    if (voice) utterance.voice = voice;
    utterance.pitch = pitch;
    utterance.rate = rate;

    this.activeUtterance = utterance;

    utterance.onstart = () => {
      this.startKeepAlive();
      this.notify(true, persona.id);
    };

    utterance.onend = () => {
      this.stopKeepAlive();
      this.notify(false);
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      this.stopKeepAlive();
      this.notify(false);
      if (onEnd) onEnd();
    };

    this.synth.speak(utterance);
  }

  /**
   * Proclaims the complete Catholic Bible Commentary using prioritized voice (Ava Grace or Microsoft David).
   */
  public static speakCommentaryBySaints(
    commentary: BibleCommentary,
    onSectionStart?: (section: CommentarySaintSection, index: number, total: number) => void,
    onEnd?: () => void,
    preferredVoice?: RecitationVoiceId
  ): void {
    if (!this.synth) return;

    this.stop();
    const sections = parseCommentaryBySaints(commentary);
    if (sections.length === 0) return;

    this.isSequenceActive = true;

    // Use preferred recitation voice (Ava Grace by default or Microsoft David)
    const voiceConfig = this.getVoiceForCurrentRecitation(preferredVoice);

    const playSection = (idx: number) => {
      if (!this.isSequenceActive || idx >= sections.length) {
        this.stop();
        if (onEnd) onEnd();
        return;
      }

      const sec = sections[idx];
      const cleanText = prepareLiturgicalTextForSpeech(sec.text);
      if (!cleanText) {
        playSection(idx + 1);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(cleanText);

      if (voiceConfig.voice) utterance.voice = voiceConfig.voice;
      utterance.pitch = voiceConfig.pitch; // 1.0
      utterance.rate = voiceConfig.rate;   // 0.92

      this.activeUtterance = utterance;

      utterance.onstart = () => {
        if (!this.isSequenceActive) return;
        this.startKeepAlive();
        this.notify(true, sec.id);
        if (onSectionStart) onSectionStart(sec, idx, sections.length);
      };

      utterance.onend = () => {
        this.stopKeepAlive();
        if (!this.isSequenceActive) return;
        this.pauseTimer = setTimeout(() => {
          if (this.isSequenceActive) {
            playSection(idx + 1);
          }
        }, 550); // Natural pause between sections
      };

      utterance.onerror = () => {
        this.stopKeepAlive();
        if (!this.isSequenceActive) return;
        playSection(idx + 1);
      };

      if (this.synth) {
        this.synth.speak(utterance);
      }
    };

    playSection(0);
  }
}
