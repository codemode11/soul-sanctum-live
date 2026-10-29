import { IconColorTheme, IconFrameStyle } from './emblems';

export type MastheadLayoutVariant = 'classic-split' | 'solemn-centered' | 'horizon-banner';

export interface ScheduledMastheadLayout {
  id: string;
  dateStr: string; // YYYY-MM-DD
  occasionName: string;
  enabled: boolean;
  layoutVariant: MastheadLayoutVariant;
  establishingImageId: string;
  emblemId: string;
  colorTheme: IconColorTheme;
  frameStyle: IconFrameStyle;
  mottoText: string;
  mottoCitation: string;
  calloutLine1?: string;
  calloutLine2?: string;
}

export const MASTHEAD_LAYOUT_VARIANTS: {
  id: MastheadLayoutVariant;
  name: string;
  description: string;
}[] = [
  {
    id: 'classic-split',
    name: 'Classic Sanctum Split',
    description: 'Left-aligned stacked SOUL SANCTUM lockup with top-right liturgical calendar & caption card.'
  },
  {
    id: 'solemn-centered',
    name: 'Solemnity Centered',
    description: 'Centered regal cathedral crest, wide solemnity title lockup, and symmetrical liturgical framing.'
  },
  {
    id: 'horizon-banner',
    name: 'Panoramic Sanctuary',
    description: 'Streamlined horizontal header bar that maximizes the unobstructed view of the sanctuary altar.'
  }
];

export const DEFAULT_SCHEDULED_MASTHEADS: ScheduledMastheadLayout[] = [
  {
    id: 'sched-all-saints-2026',
    dateStr: '2026-11-01',
    occasionName: 'Solemnity of All Saints',
    enabled: true,
    layoutVariant: 'solemn-centered',
    establishingImageId: 'raphael-disputation',
    emblemId: 'eucharist-monstrance',
    colorTheme: 'cathedral-gold',
    frameStyle: 'medallion',
    mottoText: 'Rejoice and be glad, for your reward is great in heaven.',
    mottoCitation: 'Matthew 5:12',
    calloutLine1: 'Communion of Saints',
    calloutLine2: 'Church Triumphant'
  },
  {
    id: 'sched-all-souls-2026',
    dateStr: '2026-11-02',
    occasionName: 'Commemoration of All the Faithful Departed (All Souls’ Day)',
    enabled: true,
    layoutVariant: 'classic-split',
    establishingImageId: 'unsplash-eucharistic-adoration',
    emblemId: 'latin-cross',
    colorTheme: 'byzantine-purple',
    frameStyle: 'stone',
    mottoText: 'Eternal rest grant unto them, O Lord, and let perpetual light shine upon them.',
    mottoCitation: 'Order of Christian Funerals',
    calloutLine1: 'Holy Sacrifice of the Mass',
    calloutLine2: 'For the Holy Souls'
  },
  {
    id: 'sched-christ-the-king-2026',
    dateStr: '2026-11-22',
    occasionName: 'Solemnity of Our Lord Jesus Christ, King of the Universe',
    enabled: true,
    layoutVariant: 'solemn-centered',
    establishingImageId: 'star-of-the-immaculate',
    emblemId: 'chi-rho',
    colorTheme: 'cathedral-gold',
    frameStyle: 'monstrance',
    mottoText: 'His dominion is an everlasting dominion that shall not be taken away.',
    mottoCitation: 'Daniel 7:14',
    calloutLine1: 'Christus Vincit',
    calloutLine2: 'Christus Regnat'
  },
  {
    id: 'sched-immaculate-conception-2026',
    dateStr: '2026-12-08',
    occasionName: 'Solemnity of the Immaculate Conception of the Blessed Virgin Mary',
    enabled: true,
    layoutVariant: 'solemn-centered',
    establishingImageId: 'murillo-immaculate-conception',
    emblemId: 'mary-blessed-sacrament',
    colorTheme: 'marian-ultramarine',
    frameStyle: 'medallion',
    mottoText: 'Hail, full of grace, the Lord is with you.',
    mottoCitation: 'Luke 1:28',
    calloutLine1: 'Tota Pulchra Es, Maria',
    calloutLine2: 'Patroness of the Philippines'
  }
];

const STORAGE_KEY = 'sanctum_scheduled_masthead_layouts_v1';

export function getScheduledMastheadLayouts(): ScheduledMastheadLayout[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SCHEDULED_MASTHEADS));
      return DEFAULT_SCHEDULED_MASTHEADS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch {
    // ignore storage errors
  }
  return DEFAULT_SCHEDULED_MASTHEADS;
}

export function saveScheduledMastheadLayouts(schedules: ScheduledMastheadLayout[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(schedules));
  } catch {
    // ignore storage errors
  }
}

export function getActiveScheduledMastheadForDate(
  dateStr: string,
  schedules: ScheduledMastheadLayout[]
): ScheduledMastheadLayout | undefined {
  return schedules.find((s) => s.enabled && s.dateStr === dateStr);
}
