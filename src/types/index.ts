export type LiturgicalColor = 'green' | 'white' | 'red' | 'violet' | 'rose' | 'black';

export type LiturgicalRank = 'Solemnity' | 'Feast' | 'Memorial' | 'Optional Memorial' | 'Weekday' | 'Sunday';

export interface MassReading {
  id: string;
  date: string; // YYYY-MM-DD
  liturgicalDay: string;
  liturgicalSeason: string;
  liturgicalColor: LiturgicalColor;
  liturgicalRank: LiturgicalRank;
  holyDayOfObligation?: boolean;
  firstReading: {
    citation: string;
    text: string;
    theme?: string;
  };
  responsorialPsalm: {
    citation: string;
    antiphon: string;
    verses: string[];
  };
  secondReading?: {
    citation: string;
    text: string;
  };
  alleluia: {
    verse: string;
  };
  gospel: {
    citation: string;
    text: string;
  };
  reflection: {
    author: string;
    title: string;
    content: string;
  };
}

export interface CatechismReading {
  id: string;
  dayNumber: number;
  dateKey?: string;
  paragraphs: string; // e.g. "CCC 1-10"
  part: string; // e.g. "Part One: The Profession of Faith"
  section: string; // e.g. "Section One: 'I Believe' - 'We Believe'"
  chapter: string; // e.g. "Chapter One: Man's Capacity for God"
  title: string;
  text: string[];
  inBrief: string[];
  meditationQuestion: string;
  crossReferences?: string[];
}

export interface Saint {
  id: string;
  name: string;
  title: string; // e.g., "Doctor of the Church and Virgin", "Apostle and Evangelist"
  feastDate: string; // e.g., "October 16"
  month: number; // 1-12
  day: number; // 1-31
  birthYear?: string;
  deathYear?: string;
  patronage: string[];
  symbols: string[];
  liturgicalColor: LiturgicalColor;
  biography: string;
  quote: {
    text: string;
    source?: string;
  };
  prayer: string; // Collect or Intercessory Prayer
  canonization?: string;
  imageUrl?: string;
}

export interface CatholicNewsItem {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  content: string;
  category: 'Vatican' | 'Global Church' | 'Saints and Faith' | 'Eucharist and Devotion' | 'Culture and Charity';
  author: string;
  date: string;
  readTime: string;
  source: string;
  tags: string[];
  imageUrl?: string;
  imageCaption?: string;
}

export interface NovenaDay {
  dayNumber: number;
  theme: string;
  scriptureVerse?: string;
  prayerText: string;
  intentionsFocus?: string;
}

export interface Novena {
  id: string;
  title: string;
  subtitle: string;
  patronOrSubject: string;
  associatedFeast: string;
  traditionalStartDate: string; // MM-DD
  traditionalFeastDate: string; // MM-DD
  description: string;
  intentionsSuggestion: string;
  closingPrayer: string;
  days: NovenaDay[];
  category: 'Mary' | 'Jesus' | 'Saints' | 'Holy Spirit' | 'Special Needs';
}

export interface UserNovenaProgress {
  novenaId: string;
  startDate: string; // YYYY-MM-DD
  currentDay: number; // 1-9
  completedDays: number[]; // e.g. [1, 2]
  personalIntention: string;
  isCompleted: boolean;
  notes?: string;
}

export interface LiturgicalDayInfo {
  date: string; // YYYY-MM-DD
  dayOfWeek: string;
  title: string;
  rank: LiturgicalRank;
  season: string;
  color: LiturgicalColor;
  isHolyDay: boolean;
  isFastingDay?: boolean;
  saintName?: string;
  readingsKey?: string;
  historicalEvent?: {
    year: string;
    title: string;
    description: string;
    significance?: string;
  };
}

export type WisdomCategory = 'Fathers' | 'Doctors' | 'Mystics' | 'Popes' | 'Saints';

export interface CatholicWisdom {
  id: string;
  quote: string;
  author: string;
  authorTitle: string;
  authorLifespan: string;
  category: WisdomCategory;
  sourceWork?: string;
  theme: 'Eucharist' | 'Prayer and Silence' | 'The Cross and Suffering' | 'Mary Mother of God' | 'Love and Charity' | 'Faith and Hope' | 'Humility' | 'Holy Spirit';
  reflection?: string;
}

export interface BibleCommentary {
  id: string;
  scriptureReference: string; // e.g. "Luke 12:1-7" or "John 6:51-58"
  scriptureText: string;
  sourceName: string; // e.g., "Catena Aurea (St. Thomas Aquinas)", "St. John Chrysostom", "Cornelius à Lapide", "Haydock Commentary"
  sourceEra: string; // e.g., "13th Century", "4th Century Patristic", "17th Century", "19th Century"
  author: string;
  commentaryText: string;
  practicalApplication: string;
}

export interface CatholicTerm {
  id: string;
  term: string;
  phonetic: string;
  languageOrigin: string; // e.g. "Latin: transubstantiatio"
  literalMeaning: string;
  shortDefinition: string;
  detailedExplanation: string;
  catechismRef?: string; // e.g. "CCC 1373-1377"
  scripturalBasis?: string;
  liturgicalContext?: string;
  category: 'Sacraments' | 'Theology and Dogma' | 'Liturgy and Worship' | 'Spiritual Life' | 'Church Hierarchy and Canon Law';
}

export type RosaryMysteryGroup = 'Joyful' | 'Luminous' | 'Sorrowful' | 'Glorious';

export interface RosaryMystery {
  number: number;
  name: string;
  scriptureCitation: string;
  scriptureText: string;
  meditation: string;
  fruitOfTheMystery: string;
}

export interface RosaryMysterySet {
  type: RosaryMysteryGroup;
  title: string;
  traditionalDays: string; // e.g., "Mondays and Saturdays"
  description: string;
  mysteries: RosaryMystery[];
}

export interface RosaryBeadStep {
  stepIndex: number;
  decadeIndex?: number; // 0 for intro, 1-5 for decades, 6 for conclusion
  beadInDecade?: number; // 1-10
  prayerName: string;
  latinName?: string;
  prayerText: string;
  instruction: string;
  mysteryName?: string;
  fruit?: string;
}

export type PrayerCategory = 'Healing' | 'Holy Souls in Purgatory' | 'Family and Marriage' | 'Vocations and Priesthood' | 'Spiritual Conversion' | 'Peace and Protection' | 'Thanksgiving';

export interface PrayerRequest {
  id: string;
  title: string;
  description: string;
  nameOrInitials: string;
  category: PrayerCategory;
  dateSubmitted: string;
  prayerCount: number;
  hasPrayed?: boolean;
  candleLit?: boolean;
}

export interface CatholicPrayer {
  id: string;
  title: string;
  latinTitle?: string;
  category: 'Daily and Traditional' | 'Marian' | 'Eucharistic and Adoration' | 'Saints and Intercession' | 'Litanies' | 'Acts of the Theological Virtues' | 'Prayers for the Faithful Departed';
  englishText: string;
  latinText?: string;
  scripturalOrTraditionOrigin?: string;
  usageTime?: string; // e.g. "Morning", "Evening", "Before Mass", "After Communion", "At 12 PM and 6 PM"
}

export interface NotificationPreference {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  time: string; // HH:MM
  category: 'liturgy' | 'prayers' | 'devotion' | 'saints' | 'study';
}

export interface SacredMasterpiece {
  id: string;
  title: string;
  artist: string;
  year: string;
  location: string;
  imageUrl: string;
  fallbackImageUrl?: string;
  scriptureReference?: string;
  theologicalReflection: string;
  associatedMysteryOrSubject: string;
}

export interface CatholicHymn {
  id: string;
  title: string;
  latinTitle: string;
  composerOrEra: string;
  liturgicalSeasonOrUse: string;
  latinLyrics: string;
  englishTranslation: string;
  theologicalContext: string;
  audioFrequencyBase?: number; // for Web Audio meditative chant synthesis
  tags: string[];
}

export type CatholicPodcastCategory = 
  | 'all'
  | 'scripture-catechism'
  | 'theology-apologetics'
  | 'spiritual-prayer'
  | 'culture-interviews';

export interface PodcastEpisode {
  id: string;
  podcastId: string;
  podcastTitle: string;
  podcastHost: string;
  podcastCoverUrl: string;
  category: CatholicPodcastCategory;
  title: string;
  episodeNumber?: number | string;
  releaseDate: string;
  durationSeconds: number;
  durationFormatted: string;
  audioUrl: string;
  summary: string;
  description: string;
  scriptureReferences?: string[];
  catechismReferences?: string[];
  keyQuote: string;
  keyTakeaways: string[];
  reflectionPrompt: string;
  tags: string[];
  externalLinks?: {
    apple?: string;
    spotify?: string;
    youtube?: string;
    website?: string;
  };
}

export interface CatholicPodcastShow {
  id: string;
  title: string;
  host: string;
  organization: string;
  category: CatholicPodcastCategory;
  categoryLabel: string;
  coverUrl: string;
  description: string;
  frequency: string;
  rating: number;
  episodesCount: number;
  badgeTag?: string;
  externalLinks?: {
    apple?: string;
    spotify?: string;
    youtube?: string;
    website?: string;
  };
  episodes: PodcastEpisode[];
}

export type LiveStreamRegion = 
  | 'vatican' 
  | 'europe' 
  | 'north-america' 
  | 'holy-land' 
  | 'asia-latam' 
  | 'anticipated'
  | 'all';

export interface HolyMassLiveStream {
  id: string;
  name: string;
  sanctuary: string;
  location: string;
  country: string;
  region: LiveStreamRegion;
  videoEmbedUrl: string;
  youtubeLiveUrl?: string;
  fallbackStreamUrl?: string;
  thumbnailUrl: string;
  description: string;
  scheduleDescription: string;
  nextMassTimeLocal: string;
  timeZone: string;
  language: string;
  is24x7Live: boolean;
  isVatican: boolean;
  isAnticipatedMass?: boolean;
  patronSaintOrTitle: string;
  hasAdoration: boolean;
  notes?: string;
}




