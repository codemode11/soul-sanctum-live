import { IMITATION_OF_CHRIST } from './spiritualBooks/imitationOfChrist';
import { DEVOUT_LIFE } from './spiritualBooks/devoutLife';
import { TRUE_DEVOTION } from './spiritualBooks/trueDevotion';
import { SECRET_OF_THE_ROSARY } from './spiritualBooks/secretOfTheRosary';
import { INTERIOR_CASTLE } from './spiritualBooks/interiorCastle';
import { DARK_NIGHT } from './spiritualBooks/darkNight';
import { STORY_OF_A_SOUL } from './spiritualBooks/storyOfASoul';
import { CONFESSIONS } from './spiritualBooks/confessions';
import { PRACTICE_OF_THE_PRESENCE } from './spiritualBooks/practiceOfThePresence';
import { UNIFORMITY_WITH_GODS_WILL } from './spiritualBooks/uniformityWithGodsWill';
import { SPIRITUAL_COMBAT } from './spiritualBooks/spiritualCombat';
import { DIALOGUE_OF_ST_CATHERINE } from './spiritualBooks/dialogueOfStCatherine';
import { ABANDONMENT_TO_DIVINE_PROVIDENCE } from './spiritualBooks/abandonmentToDivineProvidence';
import { VISITS_TO_BLESSED_SACRAMENT } from './spiritualBooks/visitsToBlessedSacrament';

export interface SpiritualChapter {
  id: string;
  chapterNumber: number;
  title: string;
  latinTitle?: string;
  subtitle?: string;
  paragraphs: string[];
  keyQuote: string;
  quoteCitation: string;
  reflectionPrompt: string;
}

export type BookCategory = 
  | 'all'
  | 'mysticism'
  | 'marian'
  | 'devotion'
  | 'doctors'
  | 'saints'
  | 'confessions'
  | 'prayer';

export interface SpiritualBook {
  id: string;
  title: string;
  latinTitle: string;
  author: string;
  authorTitle: string;
  era: string;
  category: BookCategory;
  categoryLabel: string;
  description: string;
  theologicalFocus: string;
  nihilObstat: string;
  imprimatur: string;
  coverGradient: string;
  accentColor: string;
  emblemSymbol: string;
  estimatedMinutesPerChapter: number;
  chapters: SpiritualChapter[];
}

export const SPIRITUAL_BOOKS: SpiritualBook[] = [
  IMITATION_OF_CHRIST,
  DEVOUT_LIFE,
  TRUE_DEVOTION,
  SECRET_OF_THE_ROSARY,
  INTERIOR_CASTLE,
  DARK_NIGHT,
  STORY_OF_A_SOUL,
  CONFESSIONS,
  PRACTICE_OF_THE_PRESENCE,
  UNIFORMITY_WITH_GODS_WILL,
  SPIRITUAL_COMBAT,
  DIALOGUE_OF_ST_CATHERINE,
  ABANDONMENT_TO_DIVINE_PROVIDENCE,
  VISITS_TO_BLESSED_SACRAMENT
];
