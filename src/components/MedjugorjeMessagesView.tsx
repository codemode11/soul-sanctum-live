import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Sparkles,
  Search,
  Copy,
  Check,
  Volume2,
  VolumeX,
  BookOpen,
  ShieldCheck,
  Star,
  Feather,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown
} from 'lucide-react';
import {
  MEDJUGORJE_MESSAGES,
  FIVE_STONES_OF_MEDJUGORJE,
  VATICAN_NIHIL_OBSTAT_NOTE,
  MedjugorjeMessage
} from '../data/medjugorjeMessages';
import { SacredReader } from '../utils/speech';
import { toCurvedQuotes } from '../utils/smartQuotes';

interface ArchiveMedjugorjeRecord {
  id: string;
  date: string;
  displayDate: string;
  seerName: string;
  seerTitle: string;
  seerType: MedjugorjeMessage['seerType'];
  title: string;
  messageText: string;
  originalCroatianExcerpt?: string;
  themes: string[];
  ecclesiasticalApproval?: boolean;
}

interface LiveMedjugorjeItem {
  id: string;
  date: string;
  type: string;
  messageText: string;
  originalCroatianExcerpt?: string;
  ecclesiasticalApproval?: boolean;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const PAGE_SIZE = 25;

const TYPE_PRIORITY: Record<MedjugorjeMessage['seerType'], number> = {
  'monthly-world': 0,
  'annual': 1,
  'second-of-month': 2,
  'weekly-parish': 3,
  'prayer-group': 4,
  'early-days': 5,
  'special-intention': 6,
};

const CATEGORY_OPTIONS: Array<{ value: string; label: string }> = [
  { value: 'all', label: 'All Message Categories' },
  { value: 'monthly-world', label: 'Monthly 25th Messages (1987–Present)' },
  { value: 'weekly-parish', label: 'Weekly Thursday Parish (1984–1987)' },
  { value: 'second-of-month', label: 'Mirjana 2nd of Month (2004–2020)' },
  { value: 'annual', label: 'Annual Apparitions (1982–Present)' },
  { value: 'prayer-group', label: 'Prayer Group — Jelena (1983–1985)' },
  { value: 'early-days', label: 'Early Apparitions (June 1981–1984)' },
];

const THEME_GUIDANCE: Record<
  string,
  { reflection: string; citation: string; scripture: string }
> = {
  Peace: {
    reflection:
      'True peace begins when the human heart is reconciled with God. Our Lady invites us to become patient peacemakers in our families and communities through daily prayer.',
    citation: 'John 14:27',
    scripture:
      '“Peace I leave with you; my peace I give to you. Not as the world gives do I give it to you.”',
  },
  Fasting: {
    reflection:
      'Fasting frees the soul from earthly attachments and unites our small sacrifices with Christ’s victory over evil, opening our hearts more deeply to grace.',
    citation: 'Joel 2:12',
    scripture:
      '“Even now, says the Lord, return to me with your whole heart, with fasting, weeping, and mourning.”',
  },
  'The Rosary': {
    reflection:
      'Prayed from the heart, the Rosary lets us contemplate the mysteries of Jesus through Mary’s eyes, transforming daily routine into living communion with God.',
    citation: 'Luke 2:19',
    scripture:
      '“And Mary kept all these things, reflecting on them in her heart.”',
  },
  'Holy Mass': {
    reflection:
      'The Holy Eucharist is the summit of Christian life. Approaching the altar with living faith renews the soul and strengthens the entire family.',
    citation: 'John 6:51',
    scripture:
      '“I am the living bread that came down from heaven; whoever eats this bread will live forever.”',
  },
  'Holy Scripture': {
    reflection:
      'Reading Sacred Scripture daily allows God’s living Word to illuminate our decisions and anchor our homes in eternal truth.',
    citation: 'Psalm 119:105',
    scripture: '“Your word is a lamp for my feet, a light for my path.”',
  },
  Confession: {
    reflection:
      'Regular Confession restores innocence and interior freedom, healing the wounds of sin through the tender mercy of Christ.',
    citation: '1 John 1:9',
    scripture:
      '“If we acknowledge our sins, he is faithful and just and will forgive our sins and cleanse us from every wrongdoing.”',
  },
  Conversion: {
    reflection:
      'Conversion is a joyful daily turning toward God—choosing prayer, humility, and obedience to the Gospel in every season of life.',
    citation: 'Romans 12:2',
    scripture:
      '“Do not conform yourselves to this age but be transformed by the renewal of your mind.”',
  },
  'Holy Spirit': {
    reflection:
      'Opening our hearts to the Holy Spirit brings light in confusion, strength in weakness, and ardent love for God and neighbor.',
    citation: 'Romans 8:26',
    scripture:
      '“The Spirit too comes to the aid of our weakness; for we do not know how to pray as we ought.”',
  },
  Holiness: {
    reflection:
      'Holiness is not reserved for a few; it is God’s loving invitation to every baptized soul to reflect His goodness in ordinary life.',
    citation: '1 Peter 1:15-16',
    scripture:
      '“As he who called you is holy, be holy yourselves in every aspect of your conduct.”',
  },
  Family: {
    reflection:
      'A family that prays together becomes a domestic church—a refuge of forgiveness, faithfulness, and joyful witness in the world.',
    citation: 'Joshua 24:15',
    scripture: '“As for me and my household, we will serve the Lord.”',
  },
  'Spiritual Warfare': {
    reflection:
      'In moments of trial and darkness, steadfast prayer and trust in Christ shield the heart from fear and deception.',
    citation: 'Ephesians 6:11',
    scripture:
      '“Put on the armor of God so that you may be able to stand firm against the tactics of the devil.”',
  },
  Priests: {
    reflection:
      'Our Lady tenderly asks the faithful to surround priests and shepherds with grateful prayer so they may lead Christ’s flock with courage and love.',
    citation: 'Jeremiah 3:15',
    scripture:
      '“I will appoint over you shepherds after my own heart, who will shepherd you wisely and prudently.”',
  },
  'Non-Believers': {
    reflection:
      'Our Lady calls us to be humble apostles of love—never judging those far from faith, but interceding for them with mercy and radiant witness.',
    citation: '1 Timothy 2:3-4',
    scripture:
      '“God our savior wills everyone to be saved and to come to knowledge of the truth.”',
  },
  Christmas: {
    reflection:
      'Mary carries the Newborn King to every open heart, reminding us that the Prince of Peace enters quietly wherever humility and love dwell.',
    citation: 'Isaiah 9:5',
    scripture:
      '“For a child is born to us, a son is given to us; they name him Wonder-Counselor, God-Hero, Father-Forever, Prince of Peace.”',
  },
  Hope: {
    reflection:
      'Christian hope rests securely in the Risen Christ, giving quiet courage even when the world feels uncertain.',
    citation: 'Romans 15:13',
    scripture:
      '“May the God of hope fill you with all joy and peace in believing, so that you may abound in hope by the power of the Holy Spirit.”',
  },
  Love: {
    reflection:
      'Love lived through small acts of mercy and patience reveals the living presence of Jesus more powerfully than words alone.',
    citation: '1 John 4:16',
    scripture:
      '“God is love, and whoever remains in love remains in God and God in him.”',
  },
  Joy: {
    reflection:
      'Deep spiritual joy flows from friendship with God and grateful surrender to His loving providence.',
    citation: 'Philippians 4:4',
    scripture: '“Rejoice in the Lord always. I shall say it again: rejoice!”',
  },
  'Early Apparitions': {
    reflection:
      'From the very first days on Podbrdo in June 1981, Our Lady gently introduced her maternal school of peace, faith, prayer, fasting, and reconciliation.',
    citation: 'Luke 1:46-48',
    scripture:
      '“My soul proclaims the greatness of the Lord; my spirit rejoices in God my savior.”',
  },
};

const DEFAULT_GUIDANCE = {
  reflection:
    'Our Lady gently invites us to respond with a living faith—praying from the heart, entrusting our families and the world to Jesus, and becoming humble witnesses of peace.',
  citation: '1 Thessalonians 5:16-18',
  scripture:
    '“Rejoice always. Pray without ceasing. In all circumstances give thanks, for this is the will of God for you in Christ Jesus.”',
};

function getGuidanceForThemes(themes: string[]): {
  spiritualReflection: string;
  scriptureAnchor: { citation: string; text: string };
} {
  for (const theme of themes) {
    const match = THEME_GUIDANCE[theme];
    if (match) {
      return {
        spiritualReflection: match.reflection,
        scriptureAnchor: { citation: match.citation, text: match.scripture },
      };
    }
  }
  return {
    spiritualReflection: DEFAULT_GUIDANCE.reflection,
    scriptureAnchor: {
      citation: DEFAULT_GUIDANCE.citation,
      text: DEFAULT_GUIDANCE.scripture,
    },
  };
}

function formatDisplayDate(isoDate: string): string {
  const parts = isoDate.split('-').map(Number);
  if (parts.length !== 3 || parts.some(Number.isNaN)) return isoDate;
  const [year, month, day] = parts;
  const monthName = MONTH_NAMES[month - 1];
  if (!monthName) return isoDate;
  return `${monthName} ${day}, ${year}`;
}

function inferSeerForLiveMessage(isoDate: string, type: string, messageText: string): {
  seerName: string;
  seerTitle: string;
  seerType: MedjugorjeMessage['seerType'];
} {
  const normalizedType = (type || 'monthly').toLowerCase();
  const [, monthStr, dayStr] = isoDate.split('-');
  const md = `${monthStr}-${dayStr}`;

  // St. James Parish API tags Marija's monthly Dec 25 message as 'annual' in some years
  if (normalizedType === 'monthly' || (dayStr === '25' && /^dear children/i.test(messageText.trim()))) {
    return {
      seerName: 'Marija Pavlović-Lunetti',
      seerTitle: 'Monthly Message to the Parish and the World',
      seerType: 'monthly-world',
    };
  }

  if (md === '12-25') {
    return {
      seerName: 'Jakov Čolo',
      seerTitle: 'Annual Christmas Apparition',
      seerType: 'annual',
    };
  }
  if (md === '03-18') {
    return {
      seerName: 'Mirjana Dragićević-Soldo',
      seerTitle: 'Annual Apparition (March 18)',
      seerType: 'annual',
    };
  }
  if (md === '06-25') {
    return {
      seerName: 'Ivanka Ivanković-Elez',
      seerTitle: 'Annual Apparition (Anniversary)',
      seerType: 'annual',
    };
  }

  return {
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Message from Medjugorje',
    seerType: 'monthly-world',
  };
}

function inferMetadataFromText(text: string, seerTitle: string): {
  title: string;
  themes: string[];
  spiritualReflection: string;
  scriptureAnchor: { citation: string; text: string };
} {
  const lower = text.toLowerCase();
  const themes: string[] = [];

  if (lower.includes('peace')) themes.push('Peace');
  if (lower.includes('pray') || lower.includes('prayer')) themes.push('Prayer');
  if (lower.includes('convert') || lower.includes('conversion')) themes.push('Conversion');
  if (lower.includes('fast')) themes.push('Fasting');
  if (lower.includes('rosary')) themes.push('The Rosary');
  if (lower.includes('holy spirit')) themes.push('Holy Spirit');
  if (lower.includes('holiness') || lower.includes('saint')) themes.push('Holiness');
  if (lower.includes('love')) themes.push('Love');
  if (lower.includes('hope')) themes.push('Hope');

  const uniqueThemes = Array.from(new Set(themes)).slice(0, 3);
  if (uniqueThemes.length === 0) {
    uniqueThemes.push('Prayer', 'Peace', 'Conversion');
  }

  let title = seerTitle;
  if (lower.includes('peace') && lower.includes('war')) {
    title = 'Pray for Peace in a Troubled World';
  } else if (lower.includes('peace') && lower.includes('love')) {
    title = 'Extended Hands of Peace and Love';
  } else if (lower.includes('convert') || lower.includes('conversion')) {
    title = 'A Call to Conversion and Prayer with the Heart';
  } else if (lower.includes('holy spirit')) {
    title = 'Open Your Hearts to the Holy Spirit';
  } else if (lower.includes('christmas') || lower.includes('newborn')) {
    title = 'Open Your Hearts to the Newborn Jesus';
  } else if (lower.includes('peace')) {
    title = 'Be Carriers of God’s Peace';
  } else if (lower.includes('hope')) {
    title = 'Be Witnesses of Hope and Prayer';
  } else if (lower.includes('pray')) {
    title = 'Return to Prayer with the Heart';
  }

  const guidance = getGuidanceForThemes(uniqueThemes);

  return {
    title,
    themes: uniqueThemes,
    spiritualReflection: guidance.spiritualReflection,
    scriptureAnchor: guidance.scriptureAnchor,
  };
}

function hydrateArchiveWithCurated(
  archiveRecords: ArchiveMedjugorjeRecord[],
  curatedMessages: MedjugorjeMessage[]
): MedjugorjeMessage[] {
  // Build lookup of curated messages by date + seerType and date + seerName
  const curatedByKey = new Map<string, MedjugorjeMessage>();
  const curatedUsed = new Set<string>();

  for (const c of curatedMessages) {
    curatedByKey.set(`${c.date}|${c.seerType}|${c.seerName}`, c);
    curatedByKey.set(`${c.date}|${c.seerType}`, c);
  }

  const hydrated: MedjugorjeMessage[] = archiveRecords.map((rec) => {
    const curated =
      curatedByKey.get(`${rec.date}|${rec.seerType}|${rec.seerName}`) ||
      (rec.seerType === 'monthly-world' ? curatedByKey.get(`${rec.date}|monthly-world`) : undefined);

    if (curated) {
      curatedUsed.add(curated.id);
      return {
        ...rec,
        title: curated.title,
        displayDate: curated.displayDate || rec.displayDate,
        originalCroatianExcerpt: rec.originalCroatianExcerpt || curated.originalCroatianExcerpt || '',
        themes: curated.themes.length > 0 ? curated.themes : rec.themes,
        spiritualReflection: curated.spiritualReflection,
        scriptureAnchor: curated.scriptureAnchor,
        ecclesiasticalApproval: rec.ecclesiasticalApproval ?? curated.ecclesiasticalApproval,
      };
    }

    const guidance = getGuidanceForThemes(rec.themes);
    return {
      ...rec,
      originalCroatianExcerpt: rec.originalCroatianExcerpt || '',
      spiritualReflection: guidance.spiritualReflection,
      scriptureAnchor: guidance.scriptureAnchor,
    };
  });

  // Ensure any curated historic milestone not matched by exact key is still preserved
  // (skip only if an archive entry on the exact same date & seer already covers it)
  const existingDateSeer = new Set(
    hydrated.map((m) => `${m.date}|${m.seerName}`)
  );
  for (const c of curatedMessages) {
    if (curatedUsed.has(c.id)) continue;
    // Skip curated 1981-06-25/26/1984-03-01 duplicates when archive already has verbatim entries for those dates
    if (
      c.date === '1981-06-25' ||
      c.date === '1981-06-26' ||
      c.date === '1984-03-01' ||
      existingDateSeer.has(`${c.date}|${c.seerName}`)
    ) {
      continue;
    }
    hydrated.push(c);
  }

  return hydrated.sort((a, b) => {
    const d = b.date.localeCompare(a.date);
    if (d !== 0) return d;
    return (TYPE_PRIORITY[a.seerType] ?? 9) - (TYPE_PRIORITY[b.seerType] ?? 9);
  });
}

function mergeLiveOfficialMessages(
  baseMessages: MedjugorjeMessage[],
  liveItems: LiveMedjugorjeItem[]
): MedjugorjeMessage[] {
  if (!Array.isArray(liveItems) || liveItems.length === 0) {
    return baseMessages;
  }

  const merged = baseMessages.map((msg) => ({ ...msg }));

  for (const live of liveItems) {
    if (!live?.date || !live?.messageText) continue;
    const seerInfo = inferSeerForLiveMessage(live.date, live.type, live.messageText);

    const existingIndex = merged.findIndex(
      (m) => m.date === live.date && m.seerType === seerInfo.seerType
    );

    if (existingIndex >= 0) {
      merged[existingIndex] = {
        ...merged[existingIndex],
        messageText: live.messageText,
        originalCroatianExcerpt:
          live.originalCroatianExcerpt || merged[existingIndex].originalCroatianExcerpt,
        ecclesiasticalApproval:
          typeof live.ecclesiasticalApproval === 'boolean'
            ? live.ecclesiasticalApproval
            : merged[existingIndex].ecclesiasticalApproval,
      };
    } else {
      const inferred = inferMetadataFromText(live.messageText, seerInfo.seerTitle);
      merged.push({
        id: live.id || `medj-${live.date}-${seerInfo.seerType}`,
        date: live.date,
        displayDate: formatDisplayDate(live.date),
        seerName: seerInfo.seerName,
        seerTitle: seerInfo.seerTitle,
        seerType: seerInfo.seerType,
        title: inferred.title,
        messageText: live.messageText,
        originalCroatianExcerpt: live.originalCroatianExcerpt || '',
        themes: inferred.themes,
        spiritualReflection: inferred.spiritualReflection,
        scriptureAnchor: inferred.scriptureAnchor,
        ecclesiasticalApproval: live.ecclesiasticalApproval,
      });
    }
  }

  return merged.sort((a, b) => {
    const d = b.date.localeCompare(a.date);
    if (d !== 0) return d;
    return (TYPE_PRIORITY[a.seerType] ?? 9) - (TYPE_PRIORITY[b.seerType] ?? 9);
  });
}

function formatCategoryBadge(seerType: MedjugorjeMessage['seerType']): string {
  switch (seerType) {
    case 'monthly-world':
      return 'Monthly 25th';
    case 'weekly-parish':
      return 'Weekly Thursday';
    case 'second-of-month':
      return '2nd of Month';
    case 'annual':
      return 'Annual Apparition';
    case 'prayer-group':
      return 'Prayer Group';
    case 'early-days':
      return 'Early Apparitions';
    default:
      return 'Special Message';
  }
}

/**
 * Normalizes a Medjugorje message so direct Marian speech always has exactly
 * one opening curved quote (“) and one closing curved quote (”), while
 * third-person narrative chronicles that already embed balanced “...” speech
 * render cleanly without adding redundant outer quotation marks.
 */
function formatMarianMessageDisplay(rawText: string): string {
  let text = toCurvedQuotes(String(rawText || '').replace(/\r\n/g, '\n')).trim();
  if (!text) return '';

  // Fix any stray SQL-escaped doubled apostrophes inside words
  text = text.replace(/([A-Za-z])[\u2018\u2019]{2,}([A-Za-z])/g, '$1\u2019$2');

  // Detect 3rd-person chronicle entries that already contain balanced embedded “...” quotes
  // (e.g. "The apparition, which lasted... “Dear children... peace.”" or "“Dear children!” Marija said...")
  const openCount = (text.match(/\u201C/g) || []).length;
  const closeCount = (text.match(/\u201D/g) || []).length;
  const startsWithOpen = text.startsWith('\u201C');
  const endsWithClose = text.endsWith('\u201D');

  if (openCount > 0 && openCount === closeCount) {
    // Narrative intro followed by quoted speech (doesn't start with “, ends with ”)
    if (!startsWithOpen && endsWithClose) {
      return text;
    }
    // Quoted speech followed by narrative commentary (starts with “, doesn't end with ”)
    if (startsWithOpen && !endsWithClose) {
      return text;
    }
    // Narrative with embedded quoted speech in the middle (e.g. Croatian + quoted English + parenthetical)
    if (!startsWithOpen && !endsWithClose && text.includes('\n\n\u201C')) {
      return text;
    }
  }

  // Strip any outer wrapping quotation marks before applying a single balanced pair
  let prev = '';
  while (text !== prev) {
    prev = text;
    text = text
      .replace(/^[\s\u00A0]*["'\u2018\u2019\u201C\u201D\u201E\u201F\u00AB\u00BB]+/, '')
      .replace(/["'\u201C\u201D\u201E\u201F\u00AB\u00BB]+[\s\u00A0]*$/, '')
      .trim();
  }

  return `\u201C${text}\u201D`;
}

export const MedjugorjeMessagesView: React.FC = () => {
  const [baseMessages, setBaseMessages] = useState<MedjugorjeMessage[]>(MEDJUGORJE_MESSAGES);
  const [liveItems, setLiveItems] = useState<LiveMedjugorjeItem[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSeer, setSelectedSeer] = useState<string>('all');
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);
  const [showFiveStones, setShowFiveStones] = useState(false);
  const [showVaticanNote, setShowVaticanNote] = useState(false);
  const lastSyncDateRef = useRef<string>('');
  const archiveTopRef = useRef<HTMLDivElement | null>(null);

  // Lazily load the complete 1981-2026 historical archive chunk
  useEffect(() => {
    let active = true;
    import('../data/medjugorjeFullArchive.json')
      .then((mod) => {
        if (!active) return;
        const records = (mod.default || mod) as ArchiveMedjugorjeRecord[];
        if (Array.isArray(records) && records.length > 0) {
          setBaseMessages(hydrateArchiveWithCurated(records, MEDJUGORJE_MESSAGES));
        }
      })
      .catch(() => {
        // Fallback silently to curated MEDJUGORJE_MESSAGES
      });
    return () => {
      active = false;
    };
  }, []);

  const syncLatestMessages = useCallback(async () => {
    setIsSyncing(true);
    try {
      const response = await fetch('/api/medjugorje-messages', { cache: 'no-store' });
      if (!response.ok) return;
      const data = await response.json();
      if (Array.isArray(data?.messages) && data.messages.length > 0) {
        setLiveItems(data.messages);
        lastSyncDateRef.current = new Date().toISOString().slice(0, 10);
      }
    } catch {
      // Keep local archive silently on network failure
    } finally {
      setIsSyncing(false);
    }
  }, []);

  useEffect(() => {
    syncLatestMessages();

    const handleVisibilityOrFocus = () => {
      const todayKey = new Date().toISOString().slice(0, 10);
      if (document.visibilityState === 'visible' && lastSyncDateRef.current !== todayKey) {
        syncLatestMessages();
      }
    };

    window.addEventListener('focus', handleVisibilityOrFocus);
    document.addEventListener('visibilitychange', handleVisibilityOrFocus);
    return () => {
      window.removeEventListener('focus', handleVisibilityOrFocus);
      document.removeEventListener('visibilitychange', handleVisibilityOrFocus);
      SacredReader.stop();
    };
  }, [syncLatestMessages]);

  const messages = useMemo(
    () => mergeLiveOfficialMessages(baseMessages, liveItems),
    [baseMessages, liveItems]
  );

  // Latest spotlight message is always the newest official message
  const latestMessage = messages[0];

  // Distinct visionaries present in the archive
  const seers = useMemo(() => {
    const order = [
      'Marija Pavlović-Lunetti',
      'Mirjana Dragićević-Soldo',
      'Ivanka Ivanković-Elez',
      'Jakov Čolo',
      'Vicka Ivanković-Mijatović',
      'Ivan Dragičević',
      'Jelena Vasilj',
      'All Six Visionaries',
    ];
    const present = new Set(messages.map((m) => m.seerName));
    const ordered = order.filter((s) => present.has(s));
    for (const s of present) {
      if (!ordered.includes(s)) ordered.push(s);
    }
    return ['all', ...ordered];
  }, [messages]);

  // Distinct years dynamically derived from messages (newest back to 1981)
  const availableYears = useMemo(() => {
    const years = Array.from(new Set(messages.map((m) => m.date.slice(0, 4)).filter(Boolean)))
      .sort((a, b) => b.localeCompare(a));
    return ['all', ...years];
  }, [messages]);

  const newestYear = availableYears[1] || '2026';
  const oldestYear = availableYears[availableYears.length - 1] || '1981';

  // Distinct themes sorted alphabetically
  const allThemes = useMemo(
    () => Array.from(new Set(messages.flatMap((m) => m.themes))).sort((a, b) => a.localeCompare(b)),
    [messages]
  );

  // Dynamic font size state and scaling
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const fontSizes: Array<'normal' | 'large' | 'xlarge'> = ['normal', 'large', 'xlarge'];

  const increaseFontSize = () => {
    const currentIndex = fontSizes.indexOf(fontSize);
    if (currentIndex < fontSizes.length - 1) {
      setFontSize(fontSizes[currentIndex + 1]);
    }
  };

  const decreaseFontSize = () => {
    const currentIndex = fontSizes.indexOf(fontSize);
    if (currentIndex > 0) {
      setFontSize(fontSizes[currentIndex - 1]);
    }
  };

  const messageStyle = {
    fontSize: fontSize === 'normal' ? '1.15rem' : fontSize === 'large' ? '1.4rem' : '1.75rem',
    lineHeight: '1.75'
  };

  const reflectionStyle = {
    fontSize: fontSize === 'normal' ? '0.95rem' : fontSize === 'large' ? '1.15rem' : '1.35rem',
    lineHeight: '1.65'
  };

  // Filter and sort messages
  const filteredMessages = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = messages.filter((msg) => {
      const matchCategory = selectedCategory === 'all' || msg.seerType === selectedCategory;
      const matchSeer = selectedSeer === 'all' || msg.seerName === selectedSeer;
      const matchTheme = selectedTheme === 'all' || msg.themes.includes(selectedTheme);
      const matchYear = selectedYear === 'all' || msg.date.startsWith(selectedYear);
      const matchSearch =
        q === '' ||
        msg.title.toLowerCase().includes(q) ||
        msg.messageText.toLowerCase().includes(q) ||
        msg.displayDate.toLowerCase().includes(q) ||
        msg.seerName.toLowerCase().includes(q) ||
        msg.spiritualReflection.toLowerCase().includes(q);
      return matchCategory && matchSeer && matchTheme && matchYear && matchSearch;
    });

    if (sortOrder === 'oldest') {
      return [...list].reverse();
    }
    return list;
  }, [messages, selectedCategory, selectedSeer, selectedTheme, selectedYear, searchQuery, sortOrder]);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedSeer, selectedTheme, selectedYear, searchQuery, sortOrder]);

  const totalPages = Math.max(1, Math.ceil(filteredMessages.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const pageStart = (safePage - 1) * PAGE_SIZE;
  const paginatedMessages = useMemo(
    () => filteredMessages.slice(pageStart, pageStart + PAGE_SIZE),
    [filteredMessages, pageStart]
  );

  const goToPage = (page: number) => {
    const clamped = Math.max(1, Math.min(totalPages, page));
    setCurrentPage(clamped);
    archiveTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedSeer !== 'all' ||
    selectedTheme !== 'all' ||
    selectedYear !== 'all' ||
    searchQuery.trim() !== '';

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedSeer('all');
    setSelectedTheme('all');
    setSelectedYear('all');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleToggleSpeak = (msg: MedjugorjeMessage) => {
    if (playingMessageId === msg.id) {
      SacredReader.stop();
      setPlayingMessageId(null);
    } else {
      SacredReader.stop();
      setPlayingMessageId(msg.id);
      const textToSpeak = `Message of Our Lady, Queen of Peace, given through ${msg.seerName} on ${msg.displayDate}. ${msg.messageText}. Spiritual reflection: ${msg.spiritualReflection}`;
      SacredReader.speak(textToSpeak, () => {
        setPlayingMessageId(null);
      }, 'female');
    }
  };

  const handleCopy = (msg: MedjugorjeMessage) => {
    const approvalSuffix = msg.ecclesiasticalApproval ? '\n(With Ecclesiastical approval)' : '';
    const formattedMsg = formatMarianMessageDisplay(msg.messageText);
    const text = `MESSAGE OF OUR LADY, QUEEN OF PEACE (MEDJUGORJE)\nDate: ${msg.displayDate}\nVisionary: ${msg.seerName} (${msg.seerTitle})\n\n${formattedMsg}${approvalSuffix}\n\nReflection: ${msg.spiritualReflection}\nScripture Anchor: ${msg.scriptureAnchor.citation} - ${msg.scriptureAnchor.text}\n\nVia Soul Sanctum`;
    navigator.clipboard.writeText(text);
    setCopiedId(msg.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-6 pb-8 animate-fadeIn text-slate-900">

      {/* Marian Header Banner — Slate Gray & Bleached Sand */}
      <div className="sanctum-top-banner px-5 pt-4 pb-4 sm:px-6 min-h-[156px] sm:h-[164px] rounded-xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 shadow-md flex flex-col justify-between gap-2 relative overflow-hidden text-[#F9F6F0]">
        <div className="pointer-events-none absolute -right-12 -bottom-12 w-60 h-44 bg-[#EAE2D3]/15 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-slate-800/90 text-[#EAE2D3] border border-slate-600/70">
              <Star className="w-3.5 h-3.5" />
            </span>
            <span className="font-cinzel text-[11px] font-bold text-[#DFD5C3] tracking-wider uppercase">
              Queen of Peace • Kraljica Mira • Medjugorje ({oldestYear} – {newestYear})
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={syncLatestMessages}
              disabled={isSyncing}
              className="h-7 inline-flex items-center gap-1.5 px-2.5 rounded-lg text-[11px] font-cinzel font-bold transition-colors cursor-pointer border bg-slate-800/90 hover:bg-slate-700 border-slate-600/70 text-[#EAE2D3] disabled:opacity-60"
              title="Check for latest official messages from Medjugorje"
            >
              <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={() => setShowFiveStones(!showFiveStones)}
              className={`h-7 px-2.5 rounded-lg text-[11px] font-cinzel font-bold transition-colors cursor-pointer border ${
                showFiveStones
                  ? 'bg-[#F4EFE6] text-slate-900 border-[#DFD5C3]'
                  : 'bg-slate-800/90 hover:bg-slate-700 border-slate-600/70 text-[#EAE2D3]'
              }`}
            >
              5 Spiritual Stones
            </button>
            <button
              onClick={() => setShowVaticanNote(!showVaticanNote)}
              className={`h-7 px-2.5 rounded-lg text-[11px] font-cinzel font-bold transition-colors cursor-pointer border ${
                showVaticanNote
                  ? 'bg-[#F4EFE6] text-slate-900 border-[#DFD5C3]'
                  : 'bg-slate-800/90 hover:bg-slate-700 border-slate-600/70 text-[#EAE2D3]'
              }`}
            >
              Vatican Nihil Obstat
            </button>
          </div>
        </div>

        <div className="relative z-10 space-y-1">
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#FBF9F5] tracking-wide leading-tight">
            Messages of Our Lady to the Seers of Medjugorje
          </h2>

          <p className="text-xs sm:text-sm text-[#EAE2D3] font-serif-sacred max-w-3xl leading-snug line-clamp-2">
            &ldquo;Peace, peace, peace and only peace! Peace must reign between God and man and between men!&rdquo; Complete archive from June 24, 1981 through the latest monthly and annual messages.
          </p>
        </div>
      </div>

      {/* VATICAN DECREE COLLAPSIBLE CARD */}
      {showVaticanNote && (
        <div className="p-5 sm:p-6 rounded-xl bg-[#FBF9F5]/95 border border-[#DFD6C7] shadow-xs space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-[#D8CFC0] pb-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-slate-700" />
              <h3 className="font-cinzel text-sm sm:text-base font-bold text-slate-900">
                {VATICAN_NIHIL_OBSTAT_NOTE.title}
              </h3>
            </div>
            <span className="text-[11px] font-cinzel font-semibold text-slate-600">
              Sept 19, 2024
            </span>
          </div>
          <p className="text-xs sm:text-sm font-serif text-slate-700 leading-relaxed">
            {VATICAN_NIHIL_OBSTAT_NOTE.summary}
          </p>
          <div className="relative p-4 rounded-xl bg-[#EFE9DC]/90 border border-[#D8CFC0] text-xs sm:text-sm font-serif italic text-slate-900">
            <div className="pointer-events-none absolute inset-0 m-0" style={{ margin: 0 }}>
              <span className="pointer-events-none absolute top-0 left-0 w-4 h-4 rounded-tl-xl border-t-[3px] border-l-[3px] border-slate-700 m-0" style={{ margin: 0 }} />
              <span className="pointer-events-none absolute top-0 right-0 w-4 h-4 rounded-tr-xl border-t-[3px] border-r-[3px] border-slate-700 m-0" style={{ margin: 0 }} />
              <span className="pointer-events-none absolute bottom-0 left-0 w-4 h-4 rounded-bl-xl border-b-[3px] border-l-[3px] border-slate-700 m-0" style={{ margin: 0 }} />
              <span className="pointer-events-none absolute bottom-0 right-0 w-4 h-4 rounded-br-xl border-b-[3px] border-r-[3px] border-slate-700 m-0" style={{ margin: 0 }} />
            </div>
            {VATICAN_NIHIL_OBSTAT_NOTE.keyQuote}
          </div>
        </div>
      )}

      {/* FIVE STONES OF MEDJUGORJE COLLAPSIBLE */}
      {showFiveStones && (
        <div className="p-5 sm:p-6 rounded-xl bg-[#FBF9F5]/95 border border-[#DFD6C7] shadow-xs space-y-4 animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D8CFC0] pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-slate-700" />
              <h3 className="font-cinzel text-sm sm:text-base font-bold text-slate-900">
                The Five Stones of Medjugorje (Spiritual Weapons Against Evil)
              </h3>
            </div>
            <span className="text-xs font-serif italic text-slate-600">Like David&apos;s Five Stones</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {FIVE_STONES_OF_MEDJUGORJE.map(stone => (
              <div key={stone.number} className="p-3.5 rounded-xl bg-[#F4EFE6] border border-[#D8CFC0] space-y-1.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-cinzel text-[11px] font-bold text-slate-700">
                      Stone #{stone.number}
                    </span>
                  </div>
                  <h4 className="font-serif text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                    {stone.name}
                  </h4>
                  <p className="text-[11px] font-serif text-slate-700 mt-1 leading-normal">
                    {stone.description}
                  </p>
                </div>
                <div className="relative p-2.5 rounded-xl bg-[#EFE9DC] border border-[#C8BBA6] mt-2 text-[10.5px] font-serif not-italic font-normal text-slate-800">
                  <div className="pointer-events-none absolute inset-0 m-0" style={{ margin: 0 }}>
                    <span className="pointer-events-none absolute top-0 left-0 w-3.5 h-3.5 rounded-tl-xl border-t-[2.5px] border-l-[2.5px] border-slate-700 m-0" style={{ margin: 0 }} />
                    <span className="pointer-events-none absolute top-0 right-0 w-3.5 h-3.5 rounded-tr-xl border-t-[2.5px] border-r-[2.5px] border-slate-700 m-0" style={{ margin: 0 }} />
                    <span className="pointer-events-none absolute bottom-0 left-0 w-3.5 h-3.5 rounded-bl-xl border-b-[2.5px] border-l-[2.5px] border-slate-700 m-0" style={{ margin: 0 }} />
                    <span className="pointer-events-none absolute bottom-0 right-0 w-3.5 h-3.5 rounded-br-xl border-b-[2.5px] border-r-[2.5px] border-slate-700 m-0" style={{ margin: 0 }} />
                  </div>
                  {stone.gospaQuote}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LATEST SPOTLIGHT MESSAGE CARD */}
      {latestMessage && (
        <div className="rounded-xl p-6 sm:p-8 bg-gradient-to-br from-[#FBF9F5] via-[#F6F2EA] to-[#ECE5D5] border border-[#D8CFC0] shadow-[0_3px_14px_rgba(51,65,85,0.06)] space-y-4 relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D8CFC0] pb-4">
            <div className="space-y-0.5 min-w-0 flex-1">
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-800 text-[#F9F6F0] text-[10px] font-bold uppercase tracking-wider font-cinzel border border-slate-900">
                LATEST MESSAGE • {latestMessage.displayDate}
              </span>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-slate-900 pt-1">
                {latestMessage.title}
              </h3>
              <p className="text-xs font-serif text-slate-600">
                Visionary: {latestMessage.seerName} • {latestMessage.seerTitle}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleToggleSpeak(latestMessage)}
                className={`p-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  playingMessageId === latestMessage.id
                    ? 'bg-slate-800 text-[#F9F6F0] border border-slate-900 animate-pulse'
                    : 'bg-[#F4EFE6] hover:bg-[#EAE2D3] text-slate-800 border border-[#C8BBA6]'
                }`}
                title="Listen to latest Marian message with human voice"
                aria-label="Listen to message"
              >
                {playingMessageId === latestMessage.id ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4 text-slate-700" />
                )}
              </button>

              <button
                onClick={() => handleCopy(latestMessage)}
                className="p-2 rounded-lg bg-[#F4EFE6] hover:bg-[#EAE2D3] text-slate-800 border border-[#C8BBA6] transition-colors cursor-pointer"
                title="Copy message to clipboard"
                aria-label="Copy message"
              >
                {copiedId === latestMessage.id ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Message Text Quote */}
          <div className="relative p-5 sm:p-6 rounded-xl bg-[#EFE9DC]/90 border border-[#D8CFC0]">
            <div className="pointer-events-none absolute inset-0 m-0" style={{ margin: 0 }}>
              <span className="pointer-events-none absolute top-0 left-0 w-4 h-4 rounded-tl-xl border-t-[3px] border-l-[3px] border-slate-700 m-0" style={{ margin: 0 }} />
              <span className="pointer-events-none absolute top-0 right-0 w-4 h-4 rounded-tr-xl border-t-[3px] border-r-[3px] border-slate-700 m-0" style={{ margin: 0 }} />
              <span className="pointer-events-none absolute bottom-0 left-0 w-4 h-4 rounded-bl-xl border-b-[3px] border-l-[3px] border-slate-700 m-0" style={{ margin: 0 }} />
              <span className="pointer-events-none absolute bottom-0 right-0 w-4 h-4 rounded-br-xl border-b-[3px] border-r-[3px] border-slate-700 m-0" style={{ margin: 0 }} />
            </div>
            <div className="space-y-2">
              <p className="font-serif not-italic font-normal text-slate-900 whitespace-pre-line transition-all duration-200" style={messageStyle}>
                {formatMarianMessageDisplay(latestMessage.messageText)}
              </p>
              {latestMessage.ecclesiasticalApproval && (
                <p className="text-xs font-serif text-slate-600">
                  (With Ecclesiastical approval)
                </p>
              )}
              {latestMessage.originalCroatianExcerpt && (
                <p className="text-xs font-serif text-slate-600 pt-1">
                  Original Croatian: <span className="italic">{latestMessage.originalCroatianExcerpt}</span>
                </p>
              )}
            </div>
          </div>

          {/* Spiritual Reflection and Scripture */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-[#FBF9F5] border border-[#D8CFC0] space-y-1">
              <div className="flex items-center gap-1.5 text-slate-800 text-xs font-bold font-cinzel">
                <Feather className="w-3.5 h-3.5 text-slate-700" />
                <span>Spiritual Reflection</span>
              </div>
              <p className="font-serif text-slate-700 transition-all duration-200" style={reflectionStyle}>
                {latestMessage.spiritualReflection}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#FBF9F5] border border-[#D8CFC0] space-y-1">
              <div className="flex items-center gap-1.5 text-slate-800 text-xs font-bold font-cinzel">
                <BookOpen className="w-3.5 h-3.5 text-slate-700" />
                <span>Biblical Anchor • {latestMessage.scriptureAnchor.citation}</span>
              </div>
              <p className="text-xs font-serif italic text-slate-700 leading-relaxed">
                {latestMessage.scriptureAnchor.text}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* FILTER and SEARCH BAR WITH DYNAMIC FONT CONTROLS */}
      <div
        ref={archiveTopRef}
        className="p-4 sm:p-5 rounded-xl bg-[#F4EFE6]/90 border border-[#D8CFC0] shadow-2xs space-y-3"
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 min-w-0">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search all Medjugorje messages since 1981 (e.g. peace, fasting, rosary, 1981)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#FBF9F5] border border-[#C8BBA6] text-slate-900 text-xs placeholder:text-slate-500 focus:outline-hidden focus:border-slate-700"
            />
          </div>

          <button
            onClick={() => setSortOrder((prev) => (prev === 'newest' ? 'oldest' : 'newest'))}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-[#FBF9F5] hover:bg-[#EAE2D3] border border-[#C8BBA6] text-slate-800 text-xs font-serif font-semibold transition-colors cursor-pointer shrink-0"
            title="Toggle chronological order"
          >
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-600" />
            <span>{sortOrder === 'newest' ? 'Newest First' : 'Oldest First (1981)'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#FBF9F5] border border-[#C8BBA6] text-slate-900 text-xs font-serif focus:outline-hidden focus:border-slate-700 cursor-pointer"
          >
            {CATEGORY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#FBF9F5] border border-[#C8BBA6] text-slate-900 text-xs font-serif focus:outline-hidden focus:border-slate-700 cursor-pointer"
          >
            <option value="all">All Years ({oldestYear} – {newestYear})</option>
            {availableYears.filter(y => y !== 'all').map(y => (
              <option key={y} value={y}>Year {y}</option>
            ))}
          </select>

          <select
            value={selectedSeer}
            onChange={(e) => setSelectedSeer(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#FBF9F5] border border-[#C8BBA6] text-slate-900 text-xs font-serif focus:outline-hidden focus:border-slate-700 cursor-pointer"
          >
            <option value="all">All Visionaries</option>
            {seers.filter(s => s !== 'all').map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#FBF9F5] border border-[#C8BBA6] text-slate-900 text-xs font-serif focus:outline-hidden focus:border-slate-700 cursor-pointer"
          >
            <option value="all">All Spiritual Themes</option>
            {allThemes.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Text Size Stepper + Clear Filters */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#D8CFC0] pt-2.5 text-xs text-slate-700">
          <div className="flex items-center gap-3">
            <span className="font-cinzel font-bold uppercase tracking-wider text-[11px] text-slate-700">Message Text Size:</span>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-[11px] font-serif underline text-slate-700 hover:text-slate-950 cursor-pointer"
              >
                Clear Filters
              </button>
            )}
          </div>
          <div className="flex items-center gap-1 bg-[#EAE2D3] p-1 rounded-xl border border-[#C8BBA6]">
            <button
              onClick={decreaseFontSize}
              disabled={fontSize === 'normal'}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-[#FBF9F5] disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-all"
              title="Decrease text size"
            >
              A-
            </button>
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-all cursor-pointer ${
                fontSize === 'normal'
                  ? 'bg-slate-800 text-[#F9F6F0] shadow-xs font-bold'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-[#FBF9F5]'
              }`}
              title="Default text size (100%)"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-all cursor-pointer ${
                fontSize === 'large'
                  ? 'bg-slate-800 text-[#F9F6F0] shadow-xs font-bold'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-[#FBF9F5]'
              }`}
              title="Large text size (125%)"
            >
              A+
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-all cursor-pointer ${
                fontSize === 'xlarge'
                  ? 'bg-slate-800 text-[#F9F6F0] shadow-xs font-bold'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-[#FBF9F5]'
              }`}
              title="Extra large text size (155%)"
            >
              A++
            </button>
            <button
              onClick={increaseFontSize}
              disabled={fontSize === 'xlarge'}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold text-slate-800 hover:text-slate-950 hover:bg-[#FBF9F5] disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-all"
              title="Increase text size"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* ALL FILTERED MESSAGES ARCHIVE */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 px-1">
          <span className="font-cinzel text-xs font-bold text-slate-800 uppercase tracking-wider">
            Marian Message Archive ({filteredMessages.length.toLocaleString()} Messages)
          </span>
          <span className="text-[11px] font-serif text-slate-600">
            {filteredMessages.length > 0
              ? `Showing ${pageStart + 1}–${Math.min(pageStart + PAGE_SIZE, filteredMessages.length)} of ${filteredMessages.length.toLocaleString()} • Page ${safePage} of ${totalPages}`
              : 'No matching messages'}
          </span>
        </div>

        {paginatedMessages.length === 0 && (
          <div className="p-8 rounded-xl bg-[#FBF9F5] border border-[#D8CFC0] text-center space-y-2">
            <p className="font-serif text-sm text-slate-700">
              No Medjugorje messages match your current filters.
            </p>
            <button
              onClick={resetFilters}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 text-[#F9F6F0] text-xs font-cinzel font-bold hover:bg-slate-700 cursor-pointer"
            >
              Show All Messages
            </button>
          </div>
        )}

        {paginatedMessages.map((msg) => {
          const isPlaying = playingMessageId === msg.id;
          const isCopied = copiedId === msg.id;

          return (
            <article
              key={msg.id}
              className="p-5 sm:p-6 rounded-xl bg-gradient-to-br from-[#FBF9F5] via-[#F6F2EA] to-[#ECE5D5] border border-[#D8CFC0] hover:border-slate-500 transition-all shadow-[0_3px_14px_rgba(51,65,85,0.06)] space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D8CFC0] pb-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold font-cinzel text-slate-800">
                      {msg.displayDate}
                    </span>
                    <span className="text-[10px] font-serif px-2 py-0.5 rounded-full bg-[#EAE2D3] text-slate-800 border border-[#C8BBA6]">
                      {msg.seerName}
                    </span>
                    <span className="text-[10px] font-cinzel font-semibold px-2 py-0.5 rounded-md bg-[#F4EFE6] text-slate-700 border border-[#D8CFC0]">
                      {formatCategoryBadge(msg.seerType)}
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-slate-900 mt-1">
                    {msg.title}
                  </h4>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleToggleSpeak(msg)}
                    className={`p-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isPlaying
                        ? 'bg-slate-800 text-[#F9F6F0] border border-slate-900 animate-pulse'
                        : 'bg-[#F4EFE6] hover:bg-[#EAE2D3] text-slate-800 border border-[#C8BBA6]'
                    }`}
                    title="Listen with human voice"
                    aria-label="Listen with human voice"
                  >
                    {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-slate-700" />}
                  </button>

                  <button
                    onClick={() => handleCopy(msg)}
                    className="p-2 rounded-lg bg-[#F4EFE6] hover:bg-[#EAE2D3] text-slate-800 border border-[#C8BBA6] transition-colors cursor-pointer"
                    title="Copy message"
                    aria-label="Copy message"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Message text */}
              <div className="relative bg-[#EFE9DC]/85 border border-[#D8CFC0] p-3.5 rounded-xl space-y-1.5">
                <div className="pointer-events-none absolute inset-0 m-0" style={{ margin: 0 }}>
                  <span className="pointer-events-none absolute top-0 left-0 w-4 h-4 rounded-tl-xl border-t-[3px] border-l-[3px] border-slate-700/80 m-0" style={{ margin: 0 }} />
                  <span className="pointer-events-none absolute top-0 right-0 w-4 h-4 rounded-tr-xl border-t-[3px] border-r-[3px] border-slate-700/80 m-0" style={{ margin: 0 }} />
                  <span className="pointer-events-none absolute bottom-0 left-0 w-4 h-4 rounded-bl-xl border-b-[3px] border-l-[3px] border-slate-700/80 m-0" style={{ margin: 0 }} />
                  <span className="pointer-events-none absolute bottom-0 right-0 w-4 h-4 rounded-br-xl border-b-[3px] border-r-[3px] border-slate-700/80 m-0" style={{ margin: 0 }} />
                </div>
                <p
                  className="font-serif not-italic font-normal text-slate-900 leading-relaxed whitespace-pre-line transition-all duration-200"
                  style={messageStyle}
                >
                  {formatMarianMessageDisplay(msg.messageText)}
                </p>
                {msg.ecclesiasticalApproval && (
                  <p className="text-[11px] font-serif text-slate-600">
                    (With Ecclesiastical approval)
                  </p>
                )}
                {msg.originalCroatianExcerpt && (
                  <p className="text-[11px] font-serif text-slate-600">
                    Original Croatian: <span className="italic">{msg.originalCroatianExcerpt}</span>
                  </p>
                )}
              </div>

              {/* Themes */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {msg.themes.map(t => (
                  <span
                    key={t}
                    onClick={() => setSelectedTheme(t)}
                    className="text-[10px] font-serif px-2 py-0.5 rounded-md bg-[#F4EFE6] text-slate-700 border border-[#D8CFC0] cursor-pointer hover:bg-[#EAE2D3] transition-colors"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              {/* Reflection snippet */}
              <div className="pt-2 font-serif text-slate-700 border-t border-[#D8CFC0] flex flex-col sm:flex-row justify-between gap-2">
                <p className="italic text-slate-700 transition-all duration-200" style={reflectionStyle}>
                  Reflection: {msg.spiritualReflection}
                </p>
                <span className="text-[11px] font-cinzel font-semibold text-slate-700 shrink-0">
                  {msg.scriptureAnchor.citation}
                </span>
              </div>
            </article>
          );
        })}

        {/* PAGINATION CONTROLS */}
        {totalPages > 1 && (
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-[#F4EFE6]/90 border border-[#D8CFC0]">
            <div className="flex items-center gap-2">
              <button
                onClick={() => goToPage(1)}
                disabled={safePage === 1}
                className="px-2.5 py-1.5 rounded-lg bg-[#FBF9F5] hover:bg-[#EAE2D3] border border-[#C8BBA6] text-xs font-cinzel font-bold text-slate-800 disabled:opacity-40 cursor-pointer"
              >
                First
              </button>
              <button
                onClick={() => goToPage(safePage - 1)}
                disabled={safePage === 1}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FBF9F5] hover:bg-[#EAE2D3] border border-[#C8BBA6] text-xs font-cinzel font-bold text-slate-800 disabled:opacity-40 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>
            </div>

            <span className="text-xs font-cinzel font-bold text-slate-800">
              Page {safePage} of {totalPages}
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => goToPage(safePage + 1)}
                disabled={safePage === totalPages}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FBF9F5] hover:bg-[#EAE2D3] border border-[#C8BBA6] text-xs font-cinzel font-bold text-slate-800 disabled:opacity-40 cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => goToPage(totalPages)}
                disabled={safePage === totalPages}
                className="px-2.5 py-1.5 rounded-lg bg-[#FBF9F5] hover:bg-[#EAE2D3] border border-[#C8BBA6] text-xs font-cinzel font-bold text-slate-800 disabled:opacity-40 cursor-pointer"
              >
                Last
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
