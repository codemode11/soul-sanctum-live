import { NotificationPreference } from '../types';

export const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreference[] = [
  {
    id: 'notif-mass-readings',
    title: 'Daily Mass Readings',
    description: 'First Reading, Responsorial Psalm, Alleluia, and Holy Gospel for the day\'s liturgy.',
    enabled: true,
    time: '07:00',
    category: 'liturgy'
  },
  {
    id: 'notif-saint-day',
    title: 'Saint of the Day',
    description: 'Biography, patronages, authentic quote, and collect prayer of today\'s commemorated saint.',
    enabled: true,
    time: '08:30',
    category: 'saints'
  },
  {
    id: 'notif-angelus-noon',
    title: 'The Angelus (Noon Chimes)',
    description: 'Traditional Angelus Domini bell toll remembering the Incarnation of our Savior.',
    enabled: true,
    time: '12:00',
    category: 'prayers'
  },
  {
    id: 'notif-divine-mercy-3pm',
    title: '3:00 PM Hour of Great Mercy',
    description: 'Prompt to immerse in Christ\'s Passion and pray the Divine Mercy Chaplet.',
    enabled: true,
    time: '15:00',
    category: 'devotion'
  },
  {
    id: 'notif-novena-reminder',
    title: 'Novena Tracker and Intentions',
    description: 'Reminder to pray today\'s day for your active novenas and upcoming feast novenas.',
    enabled: true,
    time: '19:30',
    category: 'devotion'
  },
  {
    id: 'notif-catechism-daily',
    title: 'Daily Catechism (CCC)',
    description: 'Daily paragraphs from the Catechism of the Catholic Church with evening reflection.',
    enabled: false,
    time: '21:00',
    category: 'study'
  },
  {
    id: 'notif-catholic-term',
    title: 'Catholic Term of the Day',
    description: 'Enrich your knowledge of theological Latin roots, dogma, and liturgical symbols.',
    enabled: false,
    time: '09:15',
    category: 'study'
  }
];

const STORAGE_KEY = 'sanctuarium_notification_preferences_v1';

export function loadNotificationPreferences(): NotificationPreference[] {
  if (typeof window === 'undefined') return DEFAULT_NOTIFICATION_PREFERENCES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_NOTIFICATION_PREFERENCES;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // Fallback
  }
  return DEFAULT_NOTIFICATION_PREFERENCES;
}

export function saveNotificationPreferences(prefs: NotificationPreference[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // LocalStorage quota or restricted
  }
}
