export type CatholicRadioRegion =
  | 'holy-see'
  | 'north-america'
  | 'europe'
  | 'asia-pacific'
  | 'latin-america'
  | 'africa'
  | 'sacred-music';

export interface CatholicRadioStation {
  id: string;
  name: string;
  network: string;
  region: CatholicRadioRegion;
  country: string;
  countryCode: string;
  city?: string;
  language: string;
  format: string;
  description: string;
  streamUrl: string;
  fallbackStreamUrl?: string;
  isHls?: boolean;
  codec?: string;
  bitrate?: number;
  homepageUrl?: string;
  featured?: boolean;
  source?: 'curated' | 'directory';
}

export interface CatholicRadioRegionTab {
  id: 'all' | 'favorites' | CatholicRadioRegion | 'global-directory';
  label: string;
}

export const CATHOLIC_RADIO_REGION_TABS: CatholicRadioRegionTab[] = [
  { id: 'all', label: 'All Flagship' },
  { id: 'favorites', label: 'Favorites' },
  { id: 'holy-see', label: 'Holy See' },
  { id: 'north-america', label: 'North America' },
  { id: 'europe', label: 'Europe' },
  { id: 'asia-pacific', label: 'Asia-Pacific' },
  { id: 'latin-america', label: 'Latin America' },
  { id: 'africa', label: 'Africa' },
  { id: 'sacred-music', label: 'Sacred Music' },
  { id: 'global-directory', label: 'Global Directory' },
];

export const REGION_LABELS: Record<CatholicRadioRegion, string> = {
  'holy-see': 'Holy See',
  'north-america': 'North America',
  europe: 'Europe',
  'asia-pacific': 'Asia-Pacific',
  'latin-america': 'Latin America',
  africa: 'Africa',
  'sacred-music': 'Sacred Music & Chant',
};

/**
 * Validates that a dynamic external URL uses strictly http: or https:
 */
export function isSafeHttpUrl(rawUrl?: string): boolean {
  if (!rawUrl) return false;
  try {
    const parsed = new URL(rawUrl);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

/**
 * Curated global Catholic radio directory — every stream URL is a verified HTTPS live broadcast.
 */
export const CURATED_CATHOLIC_RADIO_STATIONS: CatholicRadioStation[] = [
  // =========================================================================
  // HOLY SEE — VATICAN RADIO (CONTINUOUS 24/7 STREAMS)
  // =========================================================================
  {
    id: 'vatican-radio-it',
    name: 'Radio Vaticana — Italia',
    network: 'Vatican News / Radio Vaticana',
    region: 'holy-see',
    country: 'Vatican City',
    countryCode: 'VA',
    city: 'Vatican City',
    language: 'Italian',
    format: 'Papal Broadcasts, News & Liturgy',
    description:
      'Continuous 24/7 Italian-language broadcasts from Vatican City with daily Mass, Rosary, Angelus, and direct coverage of the Holy Father.',
    streamUrl: 'https://radio.vaticannews.va/stream-it',
    codec: 'MP3',
    bitrate: 128,
    homepageUrl: 'https://www.vaticannews.va/it/epg.html',
    featured: true,
    source: 'curated',
  },
  {
    id: 'vatican-radio-es',
    name: 'Radio Vaticana — Español',
    network: 'Vatican News / Radio Vaticana',
    region: 'holy-see',
    country: 'Vatican City',
    countryCode: 'VA',
    city: 'Vatican City',
    language: 'Spanish',
    format: 'Papal Broadcasts & Universal News',
    description:
      'Continuous Spanish-language service of the Holy See bringing papal homilies, Church news, and liturgical broadcasts to the Hispanic world.',
    streamUrl: 'https://radio.vaticannews.va/stream-es',
    codec: 'MP3',
    bitrate: 128,
    homepageUrl: 'https://www.vaticannews.va/es/epg.html',
    featured: true,
    source: 'curated',
  },
  {
    id: 'vatican-radio-pt',
    name: 'Rádio Vaticano — Português',
    network: 'Vatican News / Radio Vaticana',
    region: 'holy-see',
    country: 'Vatican City',
    countryCode: 'VA',
    city: 'Vatican City',
    language: 'Portuguese',
    format: 'Papal Broadcasts & Universal News',
    description:
      'Continuous Portuguese service of the Holy See serving Brazil, Portugal, Angola, Mozambique, and Lusophone faithful worldwide.',
    streamUrl: 'https://radio.vaticannews.va/stream-pt',
    codec: 'MP3',
    bitrate: 128,
    homepageUrl: 'https://www.vaticannews.va/pt/epg.html',
    source: 'curated',
  },

  // =========================================================================
  // NORTH AMERICA
  // =========================================================================
  {
    id: 'ewtn-radio-english',
    name: 'EWTN Global Catholic Radio',
    network: 'Eternal Word Television Network',
    region: 'north-america',
    country: 'United States',
    countryCode: 'US',
    city: 'Irondale, AL',
    language: 'English',
    format: 'Talk, Apologetics, Mass & Rosary',
    description:
      '24/7 global Catholic radio featuring Catholic Answers Live, Daily Mass from the Shrine of the Most Blessed Sacrament, Dr. Ray, and the Holy Rosary.',
    streamUrl: 'https://ewtn-ice.streamguys1.com/english-aac',
    codec: 'AAC',
    bitrate: 64,
    homepageUrl: 'https://www.ewtn.com/radio',
    featured: true,
    source: 'curated',
  },
  {
    id: 'relevant-radio',
    name: 'Relevant Radio',
    network: 'Relevant Radio Network',
    region: 'north-america',
    country: 'United States',
    countryCode: 'US',
    city: 'Green Bay, WI',
    language: 'English',
    format: 'Live Talk, Family Rosary & Divine Mercy',
    description:
      'Bringing Christ to the world through the media with The Patrick Madrid Show, Drew Mariani, Fr. Simon Says, Divine Mercy Chaplet, and Family Rosary Across America.',
    streamUrl: 'https://playerservices.streamtheworld.com/api/livestream-redirect/RR_MAIN.mp3',
    codec: 'MP3',
    bitrate: 128,
    homepageUrl: 'https://relevantradio.com/',
    featured: true,
    source: 'curated',
  },
  {
    id: 'ave-maria-radio',
    name: 'Ave Maria Radio',
    network: 'Ave Maria Communications',
    region: 'north-america',
    country: 'United States',
    countryCode: 'US',
    city: 'Ann Arbor, MI',
    language: 'English',
    format: 'Catholic Talk, Culture & Apologetics',
    description:
      'Listener-supported Catholic broadcasting featuring Catholic Connection with Teresa Tomeo, Kresta in the Afternoon, and faithful cultural commentary.',
    streamUrl: 'https://streaming.live365.com/a57262',
    codec: 'MP3',
    bitrate: 320,
    homepageUrl: 'https://avemariaradio.net/',
    source: 'curated',
  },
  {
    id: 'guadalupe-radio-network',
    name: 'Guadalupe Radio Network',
    network: 'Guadalupe Radio Network',
    region: 'north-america',
    country: 'United States',
    countryCode: 'US',
    city: 'Midland, TX / Southeast',
    language: 'English',
    format: 'Evangelization, Rosary & EWTN Affiliate',
    description:
      'Radio for Your Soul — Catholic talk, daily devotions, local apostolates, and EWTN programming across the United States.',
    streamUrl: 'https://ssl-2.stream.miriamtech.net/grn/secal.mp3',
    codec: 'MP3',
    bitrate: 64,
    homepageUrl: 'https://www.grnonline.com/',
    source: 'curated',
  },
  {
    id: 'ewtn-classics',
    name: 'EWTN Classics Radio',
    network: 'Eternal Word Television Network',
    region: 'north-america',
    country: 'United States',
    countryCode: 'US',
    city: 'Irondale, AL',
    language: 'English',
    format: 'Mother Angelica & Classic Catechesis',
    description:
      'Timeless archives of Mother Angelica Live, Archbishop Fulton J. Sheen, Fr. John Corapi, and classic EWTN catechetical series.',
    streamUrl: 'https://ewtn-ice.streamguys1.com/classics-aac',
    codec: 'AAC',
    bitrate: 64,
    homepageUrl: 'https://www.ewtn.com/radio',
    source: 'curated',
  },
  {
    id: 'ewtn-spanish',
    name: 'EWTN Radio Católica Mundial',
    network: 'Eternal Word Television Network',
    region: 'north-america',
    country: 'United States & Americas',
    countryCode: 'US',
    language: 'Spanish',
    format: 'Santa Misa, Apologética y Rosario',
    description:
      'Transmisión católica en español las 24 horas con la Santa Misa diaria, el Santo Rosario, catequesis y programas en vivo para las Américas y España.',
    streamUrl: 'https://ewtn-ice.streamguys1.com/spanish-aac',
    fallbackStreamUrl: 'https://ewtn-sgrewind.streamguys1.com/sgrewind/spanish/chunks.m3u8',
    codec: 'AAC',
    bitrate: 64,
    homepageUrl: 'https://www.ewtn.com/es/radio/en-vivo',
    source: 'curated',
  },
  {
    id: 'spirit-catholic-radio',
    name: 'Spirit Catholic Radio',
    network: 'Spirit Catholic Radio Network',
    region: 'north-america',
    country: 'United States',
    countryCode: 'US',
    city: 'Omaha, NE',
    language: 'English',
    format: 'Daily Mass, Catholic Talk & Prayer',
    description:
      'Continuous 24/7 Catholic broadcasting featuring Spirit Mornings, daily Holy Mass, Rosary, Scripture study, and national Catholic talk.',
    streamUrl: 'https://ice7.securenetsystems.net/KVSS',
    codec: 'AAC',
    bitrate: 64,
    homepageUrl: 'https://spiritcatholicradio.com/',
    source: 'curated',
  },
  {
    id: 'covenant-network-radio',
    name: 'Covenant Network Catholic Radio',
    network: 'Covenant Network',
    region: 'north-america',
    country: 'United States',
    countryCode: 'US',
    city: 'St. Louis, MO',
    language: 'English',
    format: 'Daily Mass, Rosary & Apologetics',
    description:
      '24/7 Catholic radio apostolate broadcasting Holy Mass, the Rosary, Divine Mercy Chaplet, and faithful Catholic catechesis across the Midwest.',
    streamUrl: 'https://ssl-2.stream.miriamtech.net/covenantnet/stream',
    codec: 'MP3',
    bitrate: 102,
    homepageUrl: 'https://ourcatholicradio.org/',
    source: 'curated',
  },

  // =========================================================================
  // SACRED MUSIC & GREGORIAN CHANT
  // =========================================================================
  {
    id: 'radio-esperance-gregorien',
    name: 'Radio Espérance — Chant Grégorien',
    network: 'Radio Espérance',
    region: 'sacred-music',
    country: 'France',
    countryCode: 'FR',
    city: 'Saint-Étienne',
    language: 'Latin',
    format: '24/7 Gregorian Chant',
    description:
      'Continuous contemplative Gregorian chant recorded by Benedictine and Cistercian monastic choirs for prayer, Lectio Divina, and study.',
    streamUrl: 'https://esperance.streamakaci.com/gregorien.mp3',
    codec: 'MP3',
    bitrate: 128,
    homepageUrl: 'https://radio-esperance.fr/',
    featured: true,
    source: 'curated',
  },
  {
    id: 'radio-notre-dame-musique-sacree',
    name: 'Radio Notre-Dame — Musique Sacrée',
    network: 'Radio Notre-Dame Paris',
    region: 'sacred-music',
    country: 'France',
    countryCode: 'FR',
    city: 'Paris',
    language: 'Latin & Sacred Instrumental',
    format: 'Sacred Polyphony & Classical',
    description:
      'High-fidelity sacred choral polyphony, Palestrina, Victoria, Mozart Requiem, Bach cantatas, and cathedral organ works from Paris.',
    streamUrl: 'https://windu.radionotredame.net/RadioNotreDame-MusiqueSacree.mp3',
    codec: 'MP3',
    bitrate: 192,
    homepageUrl: 'https://radionotredame.net/',
    featured: true,
    source: 'curated',
  },
  {
    id: 'radio-esperance-musique-sacree',
    name: 'Radio Espérance — Musique Sacrée',
    network: 'Radio Espérance',
    region: 'sacred-music',
    country: 'France',
    countryCode: 'FR',
    city: 'Saint-Étienne',
    language: 'Latin & French',
    format: 'Sacred Polyphony, Organ & Hymns',
    description:
      'Uninterrupted sacred music spanning Renaissance polyphony, baroque sacred masterpieces, and solemn liturgical organ.',
    streamUrl: 'https://esperance.streamakaci.com/musique.mp3',
    codec: 'MP3',
    bitrate: 192,
    homepageUrl: 'https://radio-esperance.fr/',
    source: 'curated',
  },
  {
    id: 'iowa-catholic-sacred-music',
    name: 'Iowa Catholic Radio — Sacred Music',
    network: 'Iowa Catholic Radio',
    region: 'sacred-music',
    country: 'United States',
    countryCode: 'US',
    city: 'Des Moines, IA',
    language: 'Latin & English',
    format: 'Sacred Choral, Chant & Hymns',
    description:
      'Continuous 24/7 sacred choral music, traditional Catholic hymns, and liturgical chant curated for prayer and peaceful reflection.',
    streamUrl: 'https://streaming.live365.com/a39922',
    codec: 'MP3',
    bitrate: 128,
    homepageUrl: 'https://iowacatholicradio.com/',
    source: 'curated',
  },

  // =========================================================================
  // EUROPE
  // =========================================================================
  {
    id: 'radio-maria-england',
    name: 'Radio Maria England',
    network: 'World Family of Radio Maria',
    region: 'europe',
    country: 'United Kingdom',
    countryCode: 'GB',
    city: 'Cambridge & London',
    language: 'English',
    format: 'Daily Mass, Liturgy of the Hours & Talk',
    description:
      'A Christian voice in your home across England and Wales, broadcasting Holy Mass, the Rosary, Divine Office, and Catholic catechesis.',
    streamUrl: 'https://dreamsiteradiocp5.com/proxy/rmengland?mp=/stream',
    codec: 'AAC+',
    bitrate: 128,
    homepageUrl: 'https://radiomariaengland.uk/',
    featured: true,
    source: 'curated',
  },
  {
    id: 'ewtn-gb-ireland',
    name: 'EWTN Great Britain & Ireland',
    network: 'Eternal Word Television Network',
    region: 'europe',
    country: 'United Kingdom & Ireland',
    countryCode: 'GB',
    language: 'English',
    format: 'Catholic Radio, Mass & Apologetics',
    description:
      'EWTN radio feed tailored to Great Britain and Ireland with daily liturgical devotion, homilies, and global Catholic programming.',
    streamUrl: 'https://ewtn-ice.streamguys1.com/sky-aac',
    codec: 'AAC',
    bitrate: 64,
    homepageUrl: 'https://www.ewtn.co.uk/',
    source: 'curated',
  },
  {
    id: 'radio-maria-italy',
    name: 'Radio Maria Italia',
    network: 'World Family of Radio Maria',
    region: 'europe',
    country: 'Italy',
    countryCode: 'IT',
    city: 'Erba, Como',
    language: 'Italian',
    format: 'Rosary, Holy Mass & Marian Catechesis',
    description:
      'The founding flagship station of the World Family of Radio Maria broadcasting prayer, Holy Mass, and Marian spirituality across Italy.',
    streamUrl: 'https://dreamsiteradiocp4.com/proxy/rmitaliamontecarlo?mp=/stream',
    codec: 'AAC+',
    bitrate: 64,
    homepageUrl: 'https://www.radiomaria.it/',
    source: 'curated',
  },
  {
    id: 'radio-notre-dame-fm',
    name: 'Radio Notre-Dame Paris',
    network: 'Archdiocese of Paris',
    region: 'europe',
    country: 'France',
    countryCode: 'FR',
    city: 'Paris',
    language: 'French',
    format: 'Catholic News, Culture & Liturgy',
    description:
      'The Catholic radio station of Paris offering daily broadcasts from Notre-Dame and Parisian parishes, theology, culture, and news.',
    streamUrl: 'https://windu.radionotredame.net/RadioNotreDame-Fm.mp3',
    codec: 'MP3',
    bitrate: 192,
    homepageUrl: 'https://radionotredame.net/',
    source: 'curated',
  },
  {
    id: 'rcf-france',
    name: 'RCF — Radios Chrétiennes Francophones',
    network: 'RCF France & Belgique',
    region: 'europe',
    country: 'France',
    countryCode: 'FR',
    city: 'Lyon',
    language: 'French',
    format: 'Catholic News, Prayer & Spirituality',
    description:
      'Major 24/7 French Catholic radio network broadcasting daily prayer, Vatican and Church news, Scripture meditation, and Christian culture.',
    streamUrl: 'https://rcf.streamakaci.com/rcfdigital.mp3',
    codec: 'MP3',
    bitrate: 128,
    homepageUrl: 'https://www.rcf.fr/',
    source: 'curated',
  },
  {
    id: 'radio-maria-spain',
    name: 'Radio María España',
    network: 'World Family of Radio Maria',
    region: 'europe',
    country: 'Spain',
    countryCode: 'ES',
    city: 'Madrid',
    language: 'Spanish',
    format: 'Oración, Santa Misa y Formación',
    description:
      'Una voz católica en tu casa — 24 horas de oración comunitaria, Liturgia de las Horas, Santo Rosario y evangelización desde España.',
    streamUrl: 'https://dreamsiteradiocp4.com/proxy/rmspain1?mp=/stream/1/',
    codec: 'MP3',
    bitrate: 128,
    homepageUrl: 'https://radiomaria.es/',
    source: 'curated',
  },
  {
    id: 'radio-horeb',
    name: 'Radio Horeb',
    network: 'World Family of Radio Maria',
    region: 'europe',
    country: 'Germany',
    countryCode: 'DE',
    city: 'Balderschwang',
    language: 'German',
    format: 'Liturgy, Catechesis & Lebenshilfe',
    description:
      'Germany’s nationwide Catholic radio broadcasting Holy Mass, Liturgy of the Hours, Christian spirituality, and theological teaching.',
    streamUrl: 'https://rs16.stream24.net/horeb.mp3',
    codec: 'MP3',
    bitrate: 128,
    homepageUrl: 'https://www.horeb.org/',
    source: 'curated',
  },
  {
    id: 'radio-maria-portugal',
    name: 'Rádio Maria Portugal',
    network: 'World Family of Radio Maria',
    region: 'europe',
    country: 'Portugal',
    countryCode: 'PT',
    city: 'Lisbon & Fátima',
    language: 'Portuguese',
    format: 'Prayer, Fátima Devotion & Catechesis',
    description:
      'Portuguese Catholic radio rooted in the message of Our Lady of Fátima with daily Mass, Rosary, and Christian formation.',
    streamUrl: 'https://dreamsiteradiocp5.com/proxy/rmportugal1?mp=/stream',
    codec: 'AAC+',
    bitrate: 64,
    homepageUrl: 'https://www.radiomaria.pt/',
    source: 'curated',
  },
  {
    id: 'radio-warszawa',
    name: 'Radio Warszawa 106.2 FM',
    network: 'Diocese of Warszawa-Praga',
    region: 'europe',
    country: 'Poland',
    countryCode: 'PL',
    city: 'Warsaw',
    language: 'Polish',
    format: 'Catholic News, Prayer & Culture',
    description:
      'Diocesan Catholic station from Warsaw featuring daily prayer, liturgical music, pastoral talks, and Church journalism.',
    streamUrl: 'https://stream2.technologicznie.net/radio_warszawa.mp3',
    codec: 'MP3',
    bitrate: 160,
    homepageUrl: 'https://www.radiowarszawa.com.pl/',
    source: 'curated',
  },
  {
    id: 'katolickie-radio-fiat',
    name: 'Katolickie Radio Fiat — Częstochowa',
    network: 'Archdiocese of Częstochowa',
    region: 'europe',
    country: 'Poland',
    countryCode: 'PL',
    city: 'Częstochowa',
    language: 'Polish',
    format: 'Jasna Góra Devotion, News & Prayer',
    description:
      '24/7 Polish archdiocesan Catholic radio from Częstochowa sharing daily prayer, Marian devotion, homilies, and Church news.',
    streamUrl: 'https://s3.slotex.pl/shoutcast/7284/stream',
    codec: 'MP3',
    bitrate: 128,
    homepageUrl: 'https://radiofiat.pl/',
    source: 'curated',
  },
  {
    id: 'radio-maria-nederland',
    name: 'Radio Maria Nederland',
    network: 'World Family of Radio Maria',
    region: 'europe',
    country: 'Netherlands',
    countryCode: 'NL',
    city: "’s-Hertogenbosch",
    language: 'Dutch',
    format: 'Liturgy, Rosary & Catechesis',
    description:
      'Dutch Catholic broadcast sharing Holy Mass, Angelus, Rosary, and faithful Catholic instruction across the Netherlands.',
    streamUrl: 'https://stream.radiomaria.nl/mp3',
    codec: 'MP3',
    bitrate: 160,
    homepageUrl: 'https://www.radiomaria.nl/',
    source: 'curated',
  },

  // =========================================================================
  // ASIA-PACIFIC & PHILIPPINES
  // =========================================================================
  {
    id: 'radio-maria-philippines',
    name: 'Radio Maria Philippines',
    network: 'World Family of Radio Maria',
    region: 'asia-pacific',
    country: 'Philippines',
    countryCode: 'PH',
    city: 'Tarlac / Luzon',
    language: 'Filipino & English',
    format: 'Holy Mass, Rosary & Evangelization',
    description:
      'Catholic evangelization across the Philippines featuring daily Holy Mass, the Holy Rosary, Divine Mercy Chaplet, and Filipino pastoral programs.',
    streamUrl: 'https://dreamsiteradiocp2.com/proxy/rmphilippine?mp=/stream',
    codec: 'AAC+',
    bitrate: 32,
    homepageUrl: 'https://www.radiomaria.ph/',
    featured: true,
    source: 'curated',
  },
  {
    id: 'ewtn-radio-philippines',
    name: 'EWTN Radio Philippines',
    network: 'Eternal Word Television Network',
    region: 'asia-pacific',
    country: 'Philippines',
    countryCode: 'PH',
    city: 'Manila / Asia-Pacific',
    language: 'English & Filipino',
    format: 'Global Catholic Talk & Liturgy',
    description:
      'EWTN Asia-Pacific radio stream aligned for Philippine and Asian listeners with Holy Mass, devotions, and Catholic apologetics.',
    streamUrl: 'https://ewtn-ice.streamguys1.com/philippines-aac',
    fallbackStreamUrl: 'https://ewtn-sgrewind.streamguys1.com/sgrewind/philippines/playlist.m3u8',
    codec: 'AAC',
    bitrate: 64,
    homepageUrl: 'https://www.ewtn.com/',
    source: 'curated',
  },
  {
    id: 'radio-maria-chinese',
    name: 'Radio Maria Chinese',
    network: 'World Family of Radio Maria',
    region: 'asia-pacific',
    country: 'Asia / Chinese Diaspora',
    countryCode: 'CN',
    language: 'Mandarin Chinese',
    format: 'Prayer, Scripture & Marian Devotion',
    description:
      'Chinese-language Catholic broadcast offering daily Scripture reflection, Holy Rosary, and catechism for Chinese Catholics worldwide.',
    streamUrl: 'https://onair7.xdevel.com/proxy/xautocloud_nwct_1310?mp=/;stream/',
    codec: 'MP3',
    bitrate: 128,
    homepageUrl: 'https://www.radiomaria.org/',
    source: 'curated',
  },

  // =========================================================================
  // LATIN AMERICA
  // =========================================================================
  {
    id: 'cancao-nova-brazil',
    name: 'Rádio Canção Nova',
    network: 'Comunidade Canção Nova',
    region: 'latin-america',
    country: 'Brazil',
    countryCode: 'BR',
    city: 'Cachoeira Paulista, SP',
    language: 'Portuguese',
    format: 'Santa Missa, Terço e Evangelização',
    description:
      'Brazil’s beloved Catholic evangelization network broadcasting Holy Mass, the Rosary of Divine Mercy, preaching, and sacred praise.',
    streamUrl: 'https://cloud1.cdnseguro.com:20038/stream',
    codec: 'MP3',
    bitrate: 96,
    homepageUrl: 'https://radio.cancaonova.com/',
    source: 'curated',
  },
  {
    id: 'eventos-catolicos-guatemala',
    name: 'Eventos Católicos Radio 940 AM',
    network: 'Eventos Católicos',
    region: 'latin-america',
    country: 'Guatemala',
    countryCode: 'GT',
    city: 'Guatemala City',
    language: 'Spanish',
    format: 'Eucaristía, Predicación y Música',
    description:
      'Central American Catholic station proclaiming the Gospel through daily Eucharist, Marian prayer, and faithful catechesis.',
    streamUrl: 'https://stream.zeno.fm/1g9cduy10bruv',
    codec: 'MP3',
    bitrate: 128,
    homepageUrl: 'https://eventoscatolicos.org/',
    source: 'curated',
  },
  {
    id: 'radio-maria-venezuela',
    name: 'Radio María Venezuela',
    network: 'World Family of Radio Maria',
    region: 'latin-america',
    country: 'Venezuela',
    countryCode: 'VE',
    city: 'Caracas',
    language: 'Spanish',
    format: 'Oración, Misa y Catequesis',
    description:
      '24-hour Catholic prayer and evangelization voice uniting families in Venezuela and Latin America through the Rosary and daily Mass.',
    streamUrl: 'https://dreamsiteradiocp2.com/proxy/rmvenezuela?mp=/stream',
    codec: 'MP3',
    bitrate: 24,
    homepageUrl: 'https://www.radiomaria.org.ve/',
    source: 'curated',
  },

  // =========================================================================
  // AFRICA
  // =========================================================================
  {
    id: 'radio-veritas-south-africa',
    name: 'Radio Veritas South Africa',
    network: 'Radio Veritas 576 AM',
    region: 'africa',
    country: 'South Africa',
    countryCode: 'ZA',
    city: 'Johannesburg',
    language: 'English & Multilingual',
    format: 'Catholic Talk, Daily Mass & Evangelization',
    description:
      'South Africa’s sole Catholic radio station broadcasting daily Mass, the Angelus, Bible study, and vibrant African Catholic conversation.',
    streamUrl: 'https://zas5.ndx.co.za:9618/stream',
    codec: 'AAC',
    bitrate: 48,
    homepageUrl: 'https://radioveritas.co.za/',
    featured: true,
    source: 'curated',
  },
  {
    id: 'radio-maria-ivory-coast',
    name: 'Radio Maria Côte d’Ivoire',
    network: 'World Family of Radio Maria',
    region: 'africa',
    country: 'Ivory Coast',
    countryCode: 'CI',
    city: 'Abidjan',
    language: 'French',
    format: 'Messe, Chapelet et Catéchèse',
    description:
      'West African Catholic broadcast sharing daily Eucharist, Marian prayer, and catechetical formation from Abidjan.',
    streamUrl: 'https://dreamsiteradiocp6.com/proxy/rmcosta?mp=/stream',
    codec: 'AAC+',
    bitrate: 128,
    homepageUrl: 'https://www.radiomaria.ci/',
    source: 'curated',
  },
  {
    id: 'radio-maria-drc',
    name: 'Radio Maria RD Congo',
    network: 'World Family of Radio Maria',
    region: 'africa',
    country: 'DR Congo',
    countryCode: 'CD',
    city: 'Kinshasa',
    language: 'French & Lingala',
    format: 'Prière, Messe et Évangélisation',
    description:
      'One of Africa’s most listened-to Catholic stations broadcasting vibrant liturgical prayer, Scripture, and Rosary across the Congo.',
    streamUrl: 'https://dreamsiteradiocp2.com/proxy/rmrepdemcongo?mp=/stream',
    codec: 'AAC+',
    bitrate: 64,
    homepageUrl: 'https://www.radiomaria.cd/',
    source: 'curated',
  },
  {
    id: 'radio-maria-cameroon',
    name: 'Radio Maria Cameroun',
    network: 'World Family of Radio Maria',
    region: 'africa',
    country: 'Cameroon',
    countryCode: 'CM',
    city: 'Yaoundé',
    language: 'French & English',
    format: 'Prayer, Liturgy & Formation',
    description:
      'Bilingual Catholic station serving Cameroon with daily prayer, Holy Mass, and Church teaching.',
    streamUrl: 'https://dreamsiteradiocp7.com/proxy/rmcameroon?mp=/stream',
    codec: 'MP3',
    bitrate: 80,
    homepageUrl: 'https://www.radiomaria.cm/',
    source: 'curated',
  },
  {
    id: 'radio-maria-mozambique',
    name: 'Rádio Maria Moçambique',
    network: 'World Family of Radio Maria',
    region: 'africa',
    country: 'Mozambique',
    countryCode: 'MZ',
    city: 'Maputo',
    language: 'Portuguese',
    format: 'Oração, Eucaristia e Catequese',
    description:
      'Southern African Lusophone Catholic station bringing daily Mass, Rosary, and Christian hope across Mozambique.',
    streamUrl: 'https://dreamsiteradiocp2.com/proxy/rmmozambique2?mp=/stream',
    codec: 'AAC+',
    bitrate: 64,
    homepageUrl: 'https://www.radiomaria.org.mz/',
    source: 'curated',
  },
];

export const QUICK_TUNE_PRESET_IDS: string[] = [
  'ewtn-radio-english',
  'relevant-radio',
  'radio-esperance-gregorien',
  'radio-maria-england',
  'radio-maria-philippines',
  'radio-veritas-south-africa',
];
