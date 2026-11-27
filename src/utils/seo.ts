import { ActiveTab } from '../components/Navigation';

export const CANONICAL_SITE_URL = 'https://soul-sanctum.vercel.app';
export const DEFAULT_OG_IMAGE = `${CANONICAL_SITE_URL}/images/sacred-art/eucharistic_adoration_altar.jpg`;

interface TabSeoMetadata {
  title: string;
  description: string;
}

export const SEO_METADATA_BY_TAB: Record<ActiveTab, TabSeoMetadata> = {
  'divine-office': {
    title: 'Soul Sanctum – Daily Mass Readings, Prayers & Catechism',
    description:
      'Pray the Divine Office, Daily Mass Readings, Rosary, Treasury of Prayers, Saint of the Day, Catechism, and Church History on Soul Sanctum.',
  },
  readings: {
    title: 'Daily Catholic Mass Readings & Gospel | Soul Sanctum',
    description:
      'Read and listen to today’s Catholic Daily Mass Readings, Responsorial Psalm, Gospel proclamation, and patristic reflections on Soul Sanctum.',
  },
  saints: {
    title: 'Saint of the Day – Lives & Intercession | Soul Sanctum',
    description:
      'Discover today’s Catholic Saint of the Day, feast biography, patronage, historical witness, and daily prayer for intercession on Soul Sanctum.',
  },
  catechism: {
    title: 'Catechism of the Catholic Church Study | Soul Sanctum',
    description:
      'Explore the Catechism of the Catholic Church, official doctrinal teachings, Sacraments, Holy Trinity, and Marian dogma on Soul Sanctum.',
  },
  'magisterium-ai': {
    title: 'Magisterium AI – Catholic Church Teaching | Soul Sanctum',
    description:
      'Consult Magisterium AI on the Catechism, 1983 Code of Canon Law, 21 Ecumenical Councils, Papal Encyclicals, and Doctors of the Church.',
  },
  'catholic-ai': {
    title: 'Catholic AI Assistant – Scripture & Fathers | Soul Sanctum',
    description:
      'Research Sacred Scripture, the Catechism, Church Fathers, and Catholic theology with cited sources in Soul Sanctum’s Catholic AI Assistant.',
  },
  'catholic-bibles': {
    title: 'Catholic Bibles – 73-Book Sacred Scripture | Soul Sanctum',
    description:
      'Read the complete 73-book Catholic Bible including Deuterocanonical books and trusted Catholic translations on Soul Sanctum.',
  },
  'visio-divina': {
    title: 'Visio Divina – Sacred Art Meditation | Soul Sanctum',
    description:
      'Practice Visio Divina by praying with classic Catholic sacred masterpieces, Gospel meditations, and contemplative silence on Soul Sanctum.',
  },

  quotations: {
    title: 'Catholic Quotations of the Saints & Popes | Soul Sanctum',
    description:
      'Browse inspiring Catholic quotes from Saints, Church Fathers, Doctors of the Church, and Supreme Pontiffs on Soul Sanctum.',
  },
  'spiritual-books': {
    title: 'Catholic Spiritual Classics Book Reader | Soul Sanctum',
    description:
      'Read classic Catholic spiritual books by St. Teresa of Avila, St. Francis de Sales, Thomas à Kempis, and St. Augustine on Soul Sanctum.',
  },
  'catholic-podcasts': {
    title: 'Catholic Podcasts – Theology & Scripture | Soul Sanctum',
    description:
      'Listen to trusted Catholic podcasts on Scripture, theology, apologetics, Church history, and daily spiritual growth on Soul Sanctum.',
  },
  'catholic-radio': {
    title: 'Global Catholic Radio – Vatican, EWTN & Live Streams | Soul Sanctum',
    description:
      'Listen live 24/7 to Vatican Radio, EWTN Global Catholic Radio, Relevant Radio, Radio Maria World Family, Gregorian chant, and Catholic stations worldwide on Soul Sanctum.',
  },
  'catholic-cinema': {
    title: 'Catholic Cinema – Documentaries & Classic Movies | Soul Sanctum',
    description:
      'Watch curated Catholic documentaries, lives of the Saints, Vatican architecture films, and classic Catholic movies in Soul Sanctum’s custom theater player.',
  },
  'fio-audio': {
    title: 'Fio.fm Catholic Music, Chant & Audiobooks | Soul Sanctum',
    description:
      'Stream Catholic music, Gregorian chant, liturgical polyphony, podcasts, and audiobooks through the integrated Fio.fm player on Soul Sanctum.',
  },
  'live-mass': {
    title: 'Holy Mass Live – Vatican & Global Streams | Soul Sanctum',
    description:
      'Watch live Catholic Holy Mass and 24/7 Eucharistic Adoration from St. Peter’s Basilica, EWTN, Lourdes, Fátima, and shrines worldwide.',
  },
  'parish-finder': {
    title: 'Church Finder – Parishes, Mass & Confession | Soul Sanctum',
    description:
      'Find nearby Catholic churches, Holy Mass times, Confession schedules, Eucharistic Adoration chapels, and live directions anywhere in the world on Soul Sanctum.',
  },
  'virtual-pilgrimage': {
    title: 'Virtual Pilgrimages to Catholic Sacred Sites | Soul Sanctum',
    description:
      'Take guided virtual pilgrimages to Rome, Jerusalem, Bethlehem, Lourdes, Fátima, Guadalupe, Medjugorje, Kraków Divine Mercy, Chartres Cathedral, Mont-Saint-Michel, Assisi, Santiago, the Seven Churches of Revelation, and Zeitoun with audio guides, vigil candles, and a Pilgrim Passport.',
  },
  'vatican-news': {
    title: 'Vatican News – Latest Papal & Church News | Soul Sanctum',
    description:
      'Stay informed with daily Vatican News, papal addresses, Angelus messages, and universal Catholic Church headlines on Soul Sanctum.',
  },
  'catholic-articles': {
    title: 'Catholic Articles & Trusted News Feeds | Soul Sanctum',
    description:
      'Read daily Catholic journalism, theology essays, and commentary from trusted Catholic newsrooms and apostolates on Soul Sanctum.',
  },
  'catholic-social': {
    title: 'Catholic Social – EWTN & Church Updates | Soul Sanctum',
    description:
      'Follow Catholic social updates, apostolates, shrines, and faithful voices from across the universal Church on Soul Sanctum.',
  },
  'catholic-glossary': {
    title: 'Catholic Glossary – Theological Terms | Soul Sanctum',
    description:
      'Look up clear definitions of Catholic liturgical, theological, canonical, and sacramental terms in the Soul Sanctum Catholic Glossary.',
  },
  'treasury-prayers': {
    title: 'Treasury of Catholic Prayers & Indulgences | Soul Sanctum',
    description:
      'Pray nearly 100 bilingual English and Latin Catholic prayers by the Saints, with historical context, plenary and partial indulgences, and audio.',
  },
  rosary: {
    title: 'Holy Rosary, Divine Mercy Chaplet & Stations of the Cross | Soul Sanctum',
    description:
      'Pray the Holy Rosary, Divine Mercy Chaplet, 3 O’Clock Prayer, and Interactive Stations of the Cross by St. Alphonsus Liguori with Jerusalem maps and audio on Soul Sanctum.',
  },
  'eucharistic-miracles': {
    title: 'Eucharistic Miracles & Real Presence | Soul Sanctum',
    description:
      'Explore Church-approved Eucharistic miracles from Lanciano, Buenos Aires, Sokolka, and worldwide alongside Eucharistic Catechism teaching.',
  },
  medjugorje: {
    title: 'Marian Apparitions & Messages of Our Lady | Soul Sanctum',
    description:
      'Explore Lourdes, Fátima, Guadalupe, Knock, Akita, and Marian devotion with Church-approved history and prayers on Soul Sanctum.',
  },
  'catholic-prophecy': {
    title: 'Catholic Prophecy – Bible, Jesus, Mary & Saints | Soul Sanctum',
    description:
      'Explore Catholic Bible End Times prophecies, prophecies of Jesus Christ, messages of the Blessed Virgin Mary, and witnesses of Saints, Popes, and mystics discerned under the Catechism and May 2024 Vatican Norms.',
  },
  'catholic-warfare': {
    title: 'Spiritual Warfare – Armor of God, Deliverance & Exorcist Diary | Soul Sanctum',
    description:
      'Equip yourself for Catholic spiritual warfare with Bible passages, the Armor of God (Ephesians 6), 25 Secrets to St. Faustina, Saints & Padre Pio quotes, approved deliverance prayers, the Medal of St. Benedict, principles, essays, and Exorcist Diary.',
  },
  novenas: {
    title: 'Catholic Novena Tracker – 9-Day Prayers | Soul Sanctum',
    description:
      'Pray and track nine-day Catholic novenas with daily intentions, traditional prayers, and progress reminders on Soul Sanctum.',
  },
  calendar: {
    title: 'Catholic Liturgical Calendar & Feast Days | Soul Sanctum',
    description:
      'View the Roman Catholic Liturgical Calendar with solemnities, feast days, liturgical colors, and daily Mass readings on Soul Sanctum.',
  },
  'church-history': {
    title: '2,000-Year Catholic Church Timeline | Soul Sanctum',
    description:
      'Explore 2,000 years of Catholic Church history from Pentecost to today, all 21 Ecumenical Councils, and global Catholic demographics.',
  },
  councils: {
    title: 'The 21 Ecumenical Councils of the Church | Soul Sanctum',
    description:
      'Study all 21 Ecumenical Councils from Nicaea (325) to Vatican II (1965), their reigning Popes, dogmas, and decrees on Soul Sanctum.',
  },
  'bible-study': {
    title: 'Catholic Bible Commentary – Church Fathers | Soul Sanctum',
    description:
      'Read daily Catholic Gospel commentary drawing from the Catena Aurea, St. Thomas Aquinas, St. Augustine, and Church Fathers on Soul Sanctum.',
  },
  'bible-flashcards': {
    title: 'Catholic Bible Verse Memory Flashcards | Soul Sanctum',
    description:
      'Memorize key Catholic Scripture verses for faith, prayer, and apologetics with interactive Bible flashcards on Soul Sanctum.',
  },
  'sacred-art': {
    title: 'Sacred Art Gallery – Catholic Masterpieces | Soul Sanctum',
    description:
      'Contemplate timeless Catholic sacred art by Raphael, Caravaggio, Fra Angelico, Murillo, and Rembrandt with spiritual commentary.',
  },
  'prayer-requests': {
    title: 'Prayer Requests Wall | Soul Sanctum',
    description:
      'Share prayer intentions, light a virtual vigil candle, and intercede for brothers and sisters in Christ on Soul Sanctum’s Prayer Requests Wall.',
  },
  'in-memoriam': {
    title: 'In Memoriam – Pray for the Faithful Departed | Soul Sanctum',
    description:
      'Remember and pray for deceased priests, seminarians, and the faithful departed with traditional Catholic prayers for the Holy Souls.',
  },
  'catholic-links': {
    title: 'Trusted Catholic Websites & Resources | Soul Sanctum',
    description:
      'Access curated links to Vatican.va, USCCB, EWTN, New Advent, Word on Fire, Ascension, and faithful Catholic apostolates.',
  },
  'piety-dashboard': {
    title: 'Catholic Spiritual Checklist & Daily Piety | Soul Sanctum',
    description:
      'Build a daily Catholic rule of life with Mass, Rosary, Scripture reading, Confession prep, and Angelus reminders on Soul Sanctum.',
  },
};

const VALID_TABS = new Set<string>(Object.keys(SEO_METADATA_BY_TAB));

export function getInitialTabFromLocation(): ActiveTab {
  if (typeof window === 'undefined') return 'divine-office';
  const rawSegment = window.location.pathname.replace(/^\/+|\/+$/g, '').split('/')[0] || '';
  if (rawSegment === 'councils') {
    return 'church-history';
  }
  if (rawSegment && VALID_TABS.has(rawSegment)) {
    return rawSegment as ActiveTab;
  }
  return 'divine-office';
}

function upsertMetaTag(attribute: 'name' | 'property', key: string, content: string): void {
  if (typeof document === 'undefined') return;
  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement | null;
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function upsertCanonicalLink(href: string): void {
  if (typeof document === 'undefined') return;
  let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

export function applySeoMetadata(tab: ActiveTab, isStandaloneDashboard: boolean = false): void {
  if (typeof document === 'undefined' || typeof window === 'undefined') return;

  const meta = isStandaloneDashboard
    ? {
        title: 'Personal Catholic Dashboard | Soul Sanctum',
        description:
          'Your personal daily Catholic prayer schedule, Mass readings, liturgical feast tracker, and spiritual devotion dashboard on Soul Sanctum.',
      }
    : SEO_METADATA_BY_TAB[tab] || SEO_METADATA_BY_TAB['divine-office'];

  const origin =
    window.location.origin && window.location.origin.startsWith('http')
      ? window.location.origin
      : CANONICAL_SITE_URL;
  const pathname = isStandaloneDashboard
    ? '/dashboard'
    : tab === 'divine-office' && window.location.pathname === '/'
      ? '/'
      : `/${tab}`;
  const canonicalUrl = `${origin}${pathname}`;

  document.title = meta.title;
  upsertCanonicalLink(canonicalUrl);
  upsertMetaTag('name', 'description', meta.description);
  upsertMetaTag('property', 'og:title', meta.title);
  upsertMetaTag('property', 'og:description', meta.description);
  upsertMetaTag('property', 'og:url', canonicalUrl);
  upsertMetaTag('name', 'twitter:title', meta.title);
  upsertMetaTag('name', 'twitter:description', meta.description);
}
