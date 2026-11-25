export type CatholicCinemaCategory =
  | 'documentaries'
  | 'saints-biographies'
  | 'classic-movies'
  | 'sacred-art-vatican';

export interface CatholicCinemaTitle {
  id: string;
  title: string;
  subtitle?: string;
  type: 'documentary' | 'movie';
  category: CatholicCinemaCategory;
  year: string;
  directorOrProducer: string;
  durationMinutes?: number;
  language: string;
  country: string;
  synopsis: string;
  reflectionNote?: string;
  themes?: string[];
  videoUrl?: string;
  embedUrl?: string;
  archiveIdentifier?: string;
  youtubeId?: string;
  posterUrl?: string;
  sourcePageUrl?: string;
  fallbackPosterCategory: 'saints' | 'vatican' | 'history';
  featured?: boolean;
  source: 'curated' | 'archive' | 'custom';
}

export interface CatholicCinemaFilterTab {
  id: 'all' | CatholicCinemaCategory | 'watchlist' | 'live-archive';
  label: string;
}

export const CATHOLIC_CINEMA_TABS: CatholicCinemaFilterTab[] = [
  { id: 'all', label: 'All Titles' },
  { id: 'documentaries', label: 'Documentaries' },
  { id: 'saints-biographies', label: 'Saints & Martyrs' },
  { id: 'classic-movies', label: 'Classic Movies' },
  { id: 'sacred-art-vatican', label: 'Vatican & Cathedrals' },
  { id: 'watchlist', label: 'Watchlist' },
  { id: 'live-archive', label: 'Live Archive' },
];

export const CINEMA_CATEGORY_LABELS: Record<CatholicCinemaCategory, string> = {
  documentaries: 'Catholic Documentary',
  'saints-biographies': 'Lives of the Saints',
  'classic-movies': 'Classic Catholic Cinema',
  'sacred-art-vatican': 'Vatican & Sacred Architecture',
};

const YOUTUBE_ID_RE = /^[a-zA-Z0-9_-]{11}$/;
const ARCHIVE_ID_RE = /^[a-zA-Z0-9._-]{2,120}$/;

function isBlockedHostname(hostname: string): boolean {
  const lower = hostname.toLowerCase().replace(/^\[|\]$/g, '');
  if (
    lower === 'localhost' ||
    lower === '::1' ||
    lower === '0.0.0.0' ||
    lower === '::' ||
    lower.endsWith('.local') ||
    lower.endsWith('.internal')
  ) {
    return true;
  }
  if (
    /^127\./.test(lower) ||
    /^10\./.test(lower) ||
    /^192\.168\./.test(lower) ||
    /^169\.254\./.test(lower) ||
    /^fe80:/i.test(lower) ||
    /^f[cd][0-9a-f]{2}:/i.test(lower)
  ) {
    return true;
  }
  const m172 = lower.match(/^172\.(\d+)\./);
  if (m172) {
    const second = Number(m172[1]);
    if (second >= 16 && second <= 31) return true;
  }
  return false;
}

export function isSafeExternalLink(rawUrl?: string): boolean {
  if (!rawUrl) return false;
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return false;
    if (!parsed.hostname || isBlockedHostname(parsed.hostname)) return false;
    return true;
  } catch {
    return false;
  }
}

export interface ParsedCustomVideo {
  title: string;
  videoUrl?: string;
  embedUrl?: string;
  youtubeId?: string;
  archiveIdentifier?: string;
  sourcePageUrl: string;
}

/**
 * Safely parses a user-supplied Catholic video link (YouTube, Internet Archive, or direct HTTPS MP4/WebM/HLS).
 * Rejects non-HTTP(S) schemes and local/private hosts.
 */
export function parseCustomCatholicVideoUrl(
  rawUrl: string,
  customTitle?: string
): ParsedCustomVideo | null {
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return null;
  }

  if (parsed.protocol !== 'https:') return null;
  if (!parsed.hostname || isBlockedHostname(parsed.hostname)) return null;

  const host = parsed.hostname.toLowerCase();
  const cleanTitle = (customTitle || '').trim().slice(0, 100);

  // 1. YouTube watch / share / embed links -> privacy-enhanced embed
  if (
    host === 'youtube.com' ||
    host === 'www.youtube.com' ||
    host === 'm.youtube.com' ||
    host === 'youtu.be' ||
    host === 'www.youtube-nocookie.com'
  ) {
    let vid = '';
    if (host === 'youtu.be') {
      vid = parsed.pathname.replace(/^\/+/, '').split('/')[0] || '';
    } else if (parsed.pathname.startsWith('/watch')) {
      vid = parsed.searchParams.get('v') || '';
    } else if (parsed.pathname.startsWith('/embed/') || parsed.pathname.startsWith('/shorts/')) {
      vid = parsed.pathname.split('/')[2] || '';
    }
    if (!YOUTUBE_ID_RE.test(vid)) return null;
    return {
      title: cleanTitle || 'Custom Catholic Film (YouTube)',
      youtubeId: vid,
      embedUrl: `https://www.youtube-nocookie.com/embed/${vid}?rel=0&modestbranding=1`,
      sourcePageUrl: `https://www.youtube.com/watch?v=${vid}`,
    };
  }

  // 2. Internet Archive details / embed links
  if (host === 'archive.org' || host === 'www.archive.org') {
    const parts = parsed.pathname.split('/').filter(Boolean);
    if ((parts[0] === 'details' || parts[0] === 'embed') && parts[1] && ARCHIVE_ID_RE.test(parts[1])) {
      const id = parts[1];
      return {
        title: cleanTitle || `Archive Screening (${id})`,
        archiveIdentifier: id,
        embedUrl: `https://archive.org/embed/${encodeURIComponent(id)}`,
        sourcePageUrl: `https://archive.org/details/${encodeURIComponent(id)}`,
      };
    }
    if (parts[0] === 'download' && /\.(mp4|webm|m3u8)(\?|$)/i.test(parsed.pathname)) {
      return {
        title: cleanTitle || 'Archive Direct Screening',
        videoUrl: parsed.toString(),
        sourcePageUrl: parsed.toString(),
      };
    }
    return null;
  }

  // 3. Direct HTTPS MP4, WebM, or HLS (.m3u8) video stream
  if (/\.(mp4|webm|m3u8)(\?|$)/i.test(parsed.pathname)) {
    return {
      title: cleanTitle || 'Custom Catholic Video Stream',
      videoUrl: parsed.toString(),
      sourcePageUrl: parsed.toString(),
    };
  }

  return null;
}

export function formatRuntime(minutes?: number): string {
  if (!minutes || !Number.isFinite(minutes) || minutes <= 0) return 'Feature';
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export function formatVideoClock(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const total = Math.floor(seconds);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (h > 0) {
    return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }
  return `${m}:${String(s).padStart(2, '0')}`;
}

/**
 * Curated Catholic Documentaries & Classic Movies — every title has a verified direct HTTPS MP4 stream
 * and an Internet Archive embedded player fallback.
 */
export const CURATED_CATHOLIC_CINEMA: CatholicCinemaTitle[] = [
  // =========================================================================
  // VATICAN & SACRED ARCHITECTURE DOCUMENTARIES
  // =========================================================================
  {
    id: 'secret-access-the-vatican',
    title: 'Inside the Vatican',
    subtitle: 'Secret Access: The Vatican',
    type: 'documentary',
    category: 'sacred-art-vatican',
    year: '2011',
    directorOrProducer: 'History & Vatican Media Archive',
    durationMinutes: 85,
    language: 'English',
    country: 'Vatican City & United States',
    synopsis:
      'An extraordinary behind-the-scenes documentary inside Vatican City exploring the Swiss Guard, the Apostolic Archives, St. Peter’s Basilica, the Sistine Chapel, and the daily governance of the universal Church.',
    reflectionNote:
      'Observe how two millennia of living faith, sacred art, and apostolic continuity converge within the smallest sovereign state on earth.',
    themes: ['Papacy', 'St. Peter’s Basilica', 'Swiss Guard', 'Church Governance'],
    archiveIdentifier: 'SecretAccessTheVatican',
    videoUrl:
      'https://archive.org/download/SecretAccessTheVatican/Secret%20Access%20%E2%97%8F%20The%20Vatican.mp4',
    embedUrl: 'https://archive.org/embed/SecretAccessTheVatican',
    posterUrl: 'https://archive.org/services/img/SecretAccessTheVatican',
    sourcePageUrl: 'https://archive.org/details/SecretAccessTheVatican',
    fallbackPosterCategory: 'vatican',
    featured: true,
    source: 'curated',
  },
  {
    id: 'the-song-of-bernadette-1943',
    title: 'The Song of Bernadette',
    subtitle: 'Our Lady of Lourdes & St. Bernadette Soubirous',
    type: 'movie',
    category: 'saints-biographies',
    year: '1943',
    directorOrProducer: 'Henry King · Starring Jennifer Jones',
    durationMinutes: 150,
    language: 'English',
    country: 'United States',
    synopsis:
      'Winner of four Academy Awards, this luminous classic recounts the 1858 apparitions of the Immaculate Conception to fourteen-year-old Bernadette Soubirous at the Grotto of Massabielle in Lourdes, France.',
    reflectionNote:
      '“For those who believe in God, no explanation is necessary. For those who do not believe in God, no explanation is possible.”',
    themes: ['Our Lady of Lourdes', 'St. Bernadette', 'Humility', 'Miraculous Healing'],
    archiveIdentifier: 'TheSongOfBernadette1943',
    videoUrl: 'https://archive.org/download/TheSongOfBernadette1943/SongOfBernadette.mp4',
    embedUrl: 'https://archive.org/embed/TheSongOfBernadette1943',
    posterUrl: 'https://archive.org/services/img/TheSongOfBernadette1943',
    sourcePageUrl: 'https://archive.org/details/TheSongOfBernadette1943',
    fallbackPosterCategory: 'saints',
    featured: true,
    source: 'curated',
  },
  {
    id: 'padre-pio-documentary',
    title: 'Padre Pio of Pietrelcina',
    subtitle: 'Full Biographical Documentary',
    type: 'documentary',
    category: 'saints-biographies',
    year: '2000',
    directorOrProducer: 'San Giovanni Rotondo Archive',
    durationMinutes: 93,
    language: 'English',
    country: 'Italy',
    synopsis:
      'A comprehensive documentary tracing the life, spiritual trials, stigmata, confessional ministry, and enduring miracles of St. Pio of Pietrelcina, featuring rare archival footage from San Giovanni Rotondo.',
    reflectionNote:
      'St. Padre Pio’s motto—“Pray, hope, and don’t worry”—illuminates his fifty years of bearing the wounds of Christ for the salvation of souls.',
    themes: ['St. Padre Pio', 'Confession', 'Redemptive Suffering', 'Capuchin Spirituality'],
    archiveIdentifier: 'PadrePioDocumentary1',
    videoUrl: 'https://archive.org/download/PadrePioDocumentary1/PadrePioDocumentary1.mp4',
    embedUrl: 'https://archive.org/embed/PadrePioDocumentary1',
    posterUrl: 'https://archive.org/services/img/PadrePioDocumentary1',
    sourcePageUrl: 'https://archive.org/details/PadrePioDocumentary1',
    fallbackPosterCategory: 'saints',
    featured: true,
    source: 'curated',
  },
  {
    id: 'miracle-of-our-lady-of-fatima-1952',
    title: 'The Miracle of Our Lady of Fatima',
    subtitle: 'Cova da Iria, Portugal (1917)',
    type: 'movie',
    category: 'saints-biographies',
    year: '1952',
    directorOrProducer: 'John Brahm · Starring Gilbert Roland',
    durationMinutes: 102,
    language: 'English',
    country: 'United States',
    synopsis:
      'A faithful dramatization of the 1917 apparitions of the Blessed Virgin Mary to three shepherd children—Lúcia, Francisco, and Jacinta—culminating in the Miracle of the Sun witnessed by seventy thousand people.',
    reflectionNote:
      'Our Lady’s call at Fátima remains urgent in every generation: daily Rosary, penance, reparation, and consecration to the Immaculate Heart.',
    themes: ['Our Lady of Fátima', 'Holy Rosary', 'Courage Under Persecution', 'Miracle of the Sun'],
    archiveIdentifier: 'the-miracle-of-our-lady-of-fatima-1952',
    videoUrl:
      'https://archive.org/download/the-miracle-of-our-lady-of-fatima-1952/The%20Miracle%20of%20Our%20Lady%20of%20Fatima%20(1952).mp4',
    embedUrl: 'https://archive.org/embed/the-miracle-of-our-lady-of-fatima-1952',
    posterUrl: 'https://archive.org/services/img/the-miracle-of-our-lady-of-fatima-1952',
    sourcePageUrl: 'https://archive.org/details/the-miracle-of-our-lady-of-fatima-1952',
    fallbackPosterCategory: 'saints',
    featured: true,
    source: 'curated',
  },
  {
    id: 'the-flowers-of-st-francis-1950',
    title: 'The Flowers of St. Francis',
    subtitle: 'Francesco, giullare di Dio · Vatican Film List',
    type: 'movie',
    category: 'saints-biographies',
    year: '1950',
    directorOrProducer: 'Roberto Rossellini · Co-written with Federico Fellini',
    durationMinutes: 87,
    language: 'Italian (English Subtitles)',
    country: 'Italy',
    synopsis:
      'Selected for the Vatican’s official list of 45 greatest films in history, Rossellini’s neorealist masterpiece stars real Franciscan friars portraying vignettes of joyful poverty, simplicity, and charity from the Fioretti of St. Francis of Assisi.',
    reflectionNote:
      'Cast entirely with living Franciscan brothers rather than professional actors, the film radiates evangelical joy and radical detachment.',
    themes: ['St. Francis of Assisi', 'Vatican Film List', 'Evangelical Poverty', 'Franciscan Joy'],
    archiveIdentifier: 'the-flowers-of-st-francis',
    videoUrl:
      'https://archive.org/download/the-flowers-of-st-francis/The%20Flowers%20of%20St.%20Francis%20(1950)%201080p%20HBO%20Max%20WEB-DL.mp4',
    embedUrl: 'https://archive.org/embed/the-flowers-of-st-francis',
    posterUrl: 'https://archive.org/services/img/the-flowers-of-st-francis',
    sourcePageUrl: 'https://archive.org/details/the-flowers-of-st-francis',
    fallbackPosterCategory: 'saints',
    source: 'curated',
  },
  {
    id: 'chartres-cathedral-documentary',
    title: 'Chartres Cathedral',
    subtitle: 'Theology in Stone & Stained Glass',
    type: 'documentary',
    category: 'sacred-art-vatican',
    year: '1962',
    directorOrProducer: 'Encyclopædia Britannica Sacred Art Series',
    durationMinutes: 31,
    language: 'English',
    country: 'France & United States',
    synopsis:
      'An acclaimed architectural documentary unpacking the medieval theology, Gothic engineering, labyrinth symbolism, and incandescent twelfth-century stained glass of Notre-Dame de Chartres.',
    reflectionNote:
      'Every flying buttress, rose window, and carved portal of Chartres was raised as a visual Summa Theologiae dedicated to Our Lady.',
    themes: ['Gothic Cathedrals', 'Sacred Architecture', 'Stained Glass', 'Medieval Christendom'],
    archiveIdentifier: 'ChartresCathedral_201503',
    videoUrl: 'https://archive.org/download/ChartresCathedral_201503/ChartresCathedral.mp4',
    embedUrl: 'https://archive.org/embed/ChartresCathedral_201503',
    posterUrl: 'https://archive.org/services/img/ChartresCathedral_201503',
    sourcePageUrl: 'https://archive.org/details/ChartresCathedral_201503',
    fallbackPosterCategory: 'history',
    source: 'curated',
  },
  {
    id: 'abbey-of-the-genesee-2005',
    title: 'The Abbey of the Genesee',
    subtitle: 'Inside a Trappist Cistercian Monastery',
    type: 'documentary',
    category: 'documentaries',
    year: '2005',
    directorOrProducer: 'Abbey of the Genesee Monastic Archive',
    durationMinutes: 13,
    language: 'English',
    country: 'United States',
    synopsis:
      'A serene short documentary opening the cloister doors of the Trappist-Cistercian monks of Piffard, New York—capturing their rhythm of Ora et Labora, chanting the Divine Office, and baking Monk’s Bread in silence.',
    reflectionNote:
      'A contemplative visual retreat into the Rule of St. Benedict: sacred silence, manual labor, and unceasing praise.',
    themes: ['Monasticism', 'Ora et Labora', 'Divine Office', 'Contemplative Life'],
    archiveIdentifier: 'AbbeyGenesee_USA_2005',
    videoUrl: 'https://archive.org/download/AbbeyGenesee_USA_2005/AbbeyGenesee_USA_2005.mp4',
    embedUrl: 'https://archive.org/embed/AbbeyGenesee_USA_2005',
    posterUrl: 'https://archive.org/services/img/AbbeyGenesee_USA_2005',
    sourcePageUrl: 'https://archive.org/details/AbbeyGenesee_USA_2005',
    fallbackPosterCategory: 'saints',
    source: 'curated',
  },
  {
    id: 'fulton-sheen-angels',
    title: 'Life Is Worth Living: Angels',
    subtitle: 'Venerable Archbishop Fulton J. Sheen',
    type: 'documentary',
    category: 'documentaries',
    year: '1953',
    directorOrProducer: 'Archbishop Fulton J. Sheen · DuMont Broadcast Archive',
    durationMinutes: 23,
    language: 'English',
    country: 'United States',
    synopsis:
      'In this Emmy-winning classic television broadcast, Venerable Archbishop Fulton J. Sheen illuminates Thomistic angelology, the reality of Guardian Angels, and the invisible spiritual world with unmatched clarity and wit.',
    reflectionNote:
      'With nothing more than a chalkboard and a luminous intellect, Archbishop Sheen brought Catholic theology to millions of living rooms.',
    themes: ['Venerable Fulton Sheen', 'Angels', 'Catholic Apologetics', 'Thomistic Theology'],
    archiveIdentifier: 'LifeIsWorthLiving-Angels',
    videoUrl: 'https://archive.org/download/LifeIsWorthLiving-Angels/LifeisWorthLiving_512kb.mp4',
    embedUrl: 'https://archive.org/embed/LifeIsWorthLiving-Angels',
    posterUrl: 'https://archive.org/services/img/LifeIsWorthLiving-Angels',
    sourcePageUrl: 'https://archive.org/details/LifeIsWorthLiving-Angels',
    fallbackPosterCategory: 'history',
    source: 'curated',
  },
  {
    id: 'visit-of-pope-john-paul-ii',
    title: 'The Visit of Pope St. John Paul II',
    subtitle: 'Historic Apostolic Pilgrimage Chronicle',
    type: 'documentary',
    category: 'sacred-art-vatican',
    year: '1979',
    directorOrProducer: 'Archival Papal Broadcast Collection',
    durationMinutes: 121,
    language: 'English',
    country: 'Vatican City & International',
    synopsis:
      'Full-length archival chronicle documenting the apostolic journey, papal Masses, youth encounters, and prophetic homilies of Pope St. John Paul II during his historic pastoral pilgrimage.',
    reflectionNote:
      '“Be not afraid! Open wide the doors for Christ!” — Witness the pastoral fire that defined St. John Paul II’s global pontificate.',
    themes: ['Pope St. John Paul II', 'Papal Pilgrimage', 'Apostolic History', 'New Evangelization'],
    archiveIdentifier: 'TheVisitOfPopeJohnPaulII',
    videoUrl:
      'https://archive.org/download/TheVisitOfPopeJohnPaulII/The%20Visit%20of%20Pope%20John%20Paul%20II.mp4',
    embedUrl: 'https://archive.org/embed/TheVisitOfPopeJohnPaulII',
    posterUrl: 'https://archive.org/services/img/TheVisitOfPopeJohnPaulII',
    sourcePageUrl: 'https://archive.org/details/TheVisitOfPopeJohnPaulII',
    fallbackPosterCategory: 'vatican',
    source: 'curated',
  },
  {
    id: 'eucharistic-congress-budapest-1938',
    title: '34th International Eucharistic Congress',
    subtitle: 'Budapest Historic Documentary (1938)',
    type: 'documentary',
    category: 'documentaries',
    year: '1938',
    directorOrProducer: 'Historical Newsreel & Church Archive',
    durationMinutes: 15,
    language: 'Archival / International',
    country: 'Hungary',
    synopsis:
      'Rare 1938 archival documentary capturing half a million Catholic pilgrims, Cardinal Eugenio Pacelli (the future Pope Pius XII), and the luminous Danube Eucharistic procession in Budapest on the eve of World War II.',
    reflectionNote:
      'A moving historical witness to public Eucharistic adoration and Christian unity gathered around the Real Presence of Christ.',
    themes: ['Holy Eucharist', 'Eucharistic Congress', 'Pope Pius XII', 'Church History'],
    archiveIdentifier: 'EucharisticCongressBudapest1938',
    videoUrl:
      'https://archive.org/download/EucharisticCongressBudapest1938/Eucharistic_Congress_Budapest_1938.mp4',
    embedUrl: 'https://archive.org/embed/EucharisticCongressBudapest1938',
    posterUrl: 'https://archive.org/services/img/EucharisticCongressBudapest1938',
    sourcePageUrl: 'https://archive.org/details/EucharisticCongressBudapest1938',
    fallbackPosterCategory: 'history',
    source: 'curated',
  },
  {
    id: 'diary-of-a-country-priest-1951',
    title: 'Diary of a Country Priest',
    subtitle: 'Journal d’un curé de campagne · Robert Bresson',
    type: 'movie',
    category: 'classic-movies',
    year: '1951',
    directorOrProducer: 'Robert Bresson · Adapted from Georges Bernanos',
    durationMinutes: 116,
    language: 'French (Subtitled)',
    country: 'France',
    synopsis:
      'Adapted from Georges Bernanos’s landmark Catholic novel, Bresson’s transcendent masterpiece follows a frail young parish priest in rural Ambricourt whose hidden suffering and fidelity culminate in the immortal words: “All is grace.”',
    reflectionNote:
      'Widely revered by Catholic film critics as one of the purest depictions of the priesthood, spiritual aridity, and redemptive grace ever filmed.',
    themes: ['Priesthood', 'Grace', 'Georges Bernanos', 'Transcendental Cinema'],
    archiveIdentifier: 'diary-of-a-country-priest-bresson',
    videoUrl:
      'https://archive.org/download/diary-of-a-country-priest-bresson/Diary%20of%20a%20Country%20Priest%20(1951)%20JPN%20Kadokawa%20Bluray.mp4',
    embedUrl: 'https://archive.org/embed/diary-of-a-country-priest-bresson',
    posterUrl: 'https://archive.org/services/img/diary-of-a-country-priest-bresson',
    sourcePageUrl: 'https://archive.org/details/diary-of-a-country-priest-bresson',
    fallbackPosterCategory: 'saints',
    source: 'curated',
  },
  {
    id: 'the-keys-of-the-kingdom-1944',
    title: 'The Keys of the Kingdom',
    subtitle: 'Starring Gregory Peck · Adapted from A. J. Cronin',
    type: 'movie',
    category: 'classic-movies',
    year: '1944',
    directorOrProducer: 'John M. Stahl · Starring Gregory Peck',
    durationMinutes: 137,
    language: 'English',
    country: 'United States',
    synopsis:
      'Gregory Peck earned his first Academy Award nomination as Father Francis Chisholm, an unassuming Scottish Catholic priest who spends decades serving the poor through famine, plague, and civil war as a missionary in China.',
    reflectionNote:
      'A deeply humane portrait of quiet missionary perseverance, charity without boundary, and fidelity across a lifetime of service.',
    themes: ['Catholic Missions', 'Priesthood', 'Charity', 'Classic Hollywood'],
    archiveIdentifier: 'the-keys-of-the-kingdom-1944',
    videoUrl:
      'https://archive.org/download/the-keys-of-the-kingdom-1944/The%20Keys%20of%20the%20Kingdom%20(1944).mp4',
    embedUrl: 'https://archive.org/embed/the-keys-of-the-kingdom-1944',
    posterUrl: 'https://archive.org/services/img/the-keys-of-the-kingdom-1944',
    sourcePageUrl: 'https://archive.org/details/the-keys-of-the-kingdom-1944',
    fallbackPosterCategory: 'history',
    source: 'curated',
  },
  {
    id: 'marcelino-pan-y-vino-1955',
    title: 'Marcelino, Pan y Vino',
    subtitle: 'The Miracle of Marcelino · Cannes Award Winner',
    type: 'movie',
    category: 'classic-movies',
    year: '1955',
    directorOrProducer: 'Ladislao Vajda · Starring Pablito Calvo',
    durationMinutes: 86,
    language: 'Spanish',
    country: 'Spain',
    synopsis:
      'Raised by twelve gentle Franciscan friars in nineteenth-century Spain, an orphaned boy named Marcelino discovers a wooden Crucifix in the monastery attic and offers bread and wine to the hungry Christ.',
    reflectionNote:
      'One of the most cherished Catholic family classics ever made—an unforgettable meditation on childlike trust in the Crucified Lord.',
    themes: ['Childlike Faith', 'Franciscan Friars', 'The Crucifix', 'Hispanic Catholic Cinema'],
    archiveIdentifier: 'MarcelinoPanYVino',
    videoUrl:
      'https://archive.org/download/MarcelinoPanYVino/Marcelino%2C%20pan%20y%20vino.mp4',
    embedUrl: 'https://archive.org/embed/MarcelinoPanYVino',
    posterUrl: 'https://archive.org/services/img/MarcelinoPanYVino',
    sourcePageUrl: 'https://archive.org/details/MarcelinoPanYVino',
    fallbackPosterCategory: 'saints',
    source: 'curated',
  },
  {
    id: 'the-king-of-kings-1927',
    title: 'The King of Kings',
    subtitle: 'Cecil B. DeMille’s Gospel Epic',
    type: 'movie',
    category: 'classic-movies',
    year: '1927',
    directorOrProducer: 'Cecil B. DeMille · Starring H. B. Warner',
    durationMinutes: 157,
    language: 'Silent (English Intertitles & Score)',
    country: 'United States',
    synopsis:
      'Cecil B. DeMille’s monumental silent epic depicting the public ministry, miracles, Passion, Crucifixion, and Resurrection of Jesus Christ—filmed with reverent tableaux inspired by Renaissance sacred masters and early Technicolor sequences.',
    reflectionNote:
      'Seen by hundreds of millions of viewers worldwide, DeMille’s Gospel epic remains a landmark of reverent biblical cinematography.',
    themes: ['Life of Christ', 'Passion & Resurrection', 'Sacred Cinema History', 'Gospel Epic'],
    archiveIdentifier: 'TheKingOfKings1927ByCecilB.DeMille',
    videoUrl:
      'https://archive.org/download/TheKingOfKings1927ByCecilB.DeMille/The%20King%20of%20Kings%201927%20by%20Cecil%20B.%20DeMille.mp4',
    embedUrl: 'https://archive.org/embed/TheKingOfKings1927ByCecilB.DeMille',
    posterUrl: 'https://archive.org/services/img/TheKingOfKings1927ByCecilB.DeMille',
    sourcePageUrl: 'https://archive.org/details/TheKingOfKings1927ByCecilB.DeMille',
    fallbackPosterCategory: 'history',
    source: 'curated',
  },
];
