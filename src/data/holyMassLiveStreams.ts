import { HolyMassLiveStream, LiveStreamRegion, LiveStreamCategory } from '../types';

export const HOLY_MASS_LIVESTREAMS: HolyMassLiveStream[] = [
  {
    id: 'ewtn-eucharistic-adoration-24-7',
    name: "Live Eucharistic Adoration 24/7 | EWTN",
    sanctuary: "Our Lady of the Angels Chapel • EWTN Global Catholic Network",
    location: "Irondale, Alabama",
    country: "United States",
    region: "north-america",
    category: "adoration",
    videoEmbedUrl: "https://www.youtube.com/embed/GBns1m4S1Xk",
    youtubeLiveUrl: "https://www.youtube.com/watch?v=GBns1m4S1Xk",
    fallbackStreamUrl: "https://www.ewtn.com/tv/watch-live",
    thumbnailUrl: "https://i.ytimg.com/vi/GBns1m4S1Xk/hqdefault.jpg",
    description: "Official EWTN 24/7 Perpetual Eucharistic Adoration livestream before the Most Blessed Sacrament exposed in the monstrance at EWTN.",
    scheduleDescription: "Continuous 24/7 Perpetual Eucharistic Adoration of the Most Blessed Sacrament.",
    nextMassTimeLocal: "24/7 Perpetual Eucharistic Adoration (ET / CT)",
    timeZone: "America/Chicago (UTC-6)",
    language: "English / Silent Adoration",
    is24x7Live: true,
    isVatican: false,
    patronSaintOrTitle: "Our Lady of the Angels & The Most Blessed Sacrament",
    hasAdoration: true,
    notes: "Live 24/7 Eucharistic Adoration broadcast by EWTN Live Mass & Devotions."
  },
  {
    id: 'divine-mercy-vilnius-adoration-live',
    name: "Adoracija TIESIOGIAI 24/7 · Adoration LIVE · Adoración en Vivo · Dievo Gailestingumo Šventovė",
    sanctuary: "Dievo Gailestingumo Šventovė (Shrine of Divine Mercy)",
    location: "Vilnius",
    country: "Lithuania",
    region: "europe",
    category: "adoration",
    videoEmbedUrl: "https://www.youtube.com/embed/Upqned9fiMg",
    youtubeLiveUrl: "https://www.youtube.com/watch?v=Upqned9fiMg",
    fallbackStreamUrl: "https://www.gailestingumas.lt/en/live-stream",
    thumbnailUrl: "https://i.ytimg.com/vi/Upqned9fiMg/hqdefault.jpg",
    description: "Continuous 24/7 Perpetual Eucharistic Adoration broadcast live before the original 1934 Image of Divine Mercy at the Shrine of Divine Mercy in Vilnius, Lithuania.",
    scheduleDescription: "24/7 Perpetual Eucharistic Adoration of the Most Blessed Sacrament before the Original Divine Mercy Image; daily 3:00 PM Chaplet of Divine Mercy.",
    nextMassTimeLocal: "24/7 Perpetual Adoration & Daily 3:00 PM Chaplet of Divine Mercy (EET)",
    timeZone: "Europe/Vilnius (UTC+2)",
    language: "Lithuanian / Multilingual / Silent Adoration",
    is24x7Live: true,
    isVatican: false,
    patronSaintOrTitle: "The Divine Mercy, Saint Faustina Kowalska & Blessed Michał Sopoćko",
    hasAdoration: true,
    notes: "Featuring the venerated original Image of Divine Mercy painted under Saint Faustina's direct spiritual guidance."
  },
  {
    id: 'st-benedict-eucharistic-adoration-live',
    name: "Perpetual Adoration Live from St. Benedict's, Melbourne",
    sanctuary: "St. Benedict's Parish Perpetual Adoration Chapel",
    location: "Burwood, Melbourne",
    country: "Australia",
    region: "asia-latam",
    category: "adoration",
    videoEmbedUrl: "https://www.youtube.com/embed/qz8YE61BoXM",
    youtubeLiveUrl: "https://www.youtube.com/watch?v=qz8YE61BoXM",
    fallbackStreamUrl: "https://www.youtube.com/watch?v=qz8YE61BoXM",
    thumbnailUrl: "https://i.ytimg.com/vi/qz8YE61BoXM/hqdefault.jpg",
    description: "Continuous 24/7 Perpetual Eucharistic Adoration livestream before the Most Blessed Sacrament exposed in the golden Monstrance at St. Benedict's Parish.",
    scheduleDescription: "24/7 Perpetual Eucharistic Adoration of the Most Blessed Sacrament, interrupted only during the celebration of Holy Mass.",
    nextMassTimeLocal: "Continuous 24/7 Perpetual Adoration (AEST)",
    timeZone: "Australia/Melbourne (UTC+10)",
    language: "English / Silent Adoration",
    is24x7Live: true,
    isVatican: false,
    patronSaintOrTitle: "Saint Benedict of Nursia and the Most Blessed Sacrament",
    hasAdoration: true,
    notes: "Unite in silent adoration and make a devout Spiritual Communion before Our Eucharistic Lord."
  },
  {
    id: 'lourdes-grotto-live',
    name: "Grotto of Our Lady of Lourdes",
    sanctuary: "Sanctuary of Our Lady of Lourdes",
    location: "Lourdes, Hautes-Pyrénées",
    country: "France",
    region: "europe",
    category: "apparition",
    videoEmbedUrl: "https://www.youtube.com/embed/ESNa1vdHcYY",
    youtubeLiveUrl: "https://www.youtube.com/watch?v=ESNa1vdHcYY",
    fallbackStreamUrl: "https://www.lourdes-france.org/en/tv-lourdes/",
    thumbnailUrl: "https://i.ytimg.com/vi/ESNa1vdHcYY/hqdefault.jpg",
    description: "Continuous 24/7 direct livestream from the miraculous Grotto of Massabielle, where the Immaculate Conception appeared to Saint Bernadette Soubirous in 1858.",
    scheduleDescription: "Daily International Mass at 10:00 AM CET; French Mass at 8:30 AM; English Mass at 3:00 PM; Solemn Torchlight Marian Rosary Procession at 9:00 PM CET.",
    nextMassTimeLocal: "10:00 AM CET (International Mass)",
    timeZone: "Europe/Paris (UTC+1)",
    language: "Multilingual (French, English, Spanish, Italian, Latin)",
    is24x7Live: true,
    isVatican: false,
    patronSaintOrTitle: "Our Lady of Lourdes and St. Bernadette",
    hasAdoration: true,
    notes: "Watch pilgrims touch the miraculous rock and pray the silent decades of the Holy Rosary in the Grotto."
  },
  {
    id: 'fatima-capelinha-live',
    name: "Chapel of Apparitions (Capelinha das Aparições)",
    sanctuary: "Sanctuary of Our Lady of the Rosary of Fátima",
    location: "Cova da Iria, Fátima",
    country: "Portugal",
    region: "europe",
    category: "apparition",
    videoEmbedUrl: "https://www.youtube.com/embed/8Rzq8IlqaGE",
    youtubeLiveUrl: "https://www.youtube.com/watch?v=8Rzq8IlqaGE",
    fallbackStreamUrl: "https://www.fatima.pt/en/pages/online-transmissions",
    thumbnailUrl: "https://i.ytimg.com/vi/8Rzq8IlqaGE/hqdefault.jpg",
    description: "24-hour livestream from the very holm oak site where Our Lady revealed her Immaculate Heart and the Secret of Peace to the three shepherd children in 1917.",
    scheduleDescription: "Daily Holy Mass at 7:30 AM, 11:00 AM, 4:30 PM and 6:30 PM Lisbon Time; International Rosary recitation daily at 10:00 PM.",
    nextMassTimeLocal: "11:00 AM WET / Lisbon Time",
    timeZone: "Europe/Lisbon (UTC+0)",
    language: "Portuguese, English and Multilingual",
    is24x7Live: true,
    isVatican: false,
    patronSaintOrTitle: "Our Lady of Fatima, Saints Francisco and Jacinta Marto",
    hasAdoration: true,
    notes: "The golden crown above Our Lady contains the bullet that struck Saint John Paul II on May 13, 1981."
  }
];

export function getStreamsByCategory(category: LiveStreamCategory | 'all'): HolyMassLiveStream[] {
  if (category === 'all') return HOLY_MASS_LIVESTREAMS;
  return HOLY_MASS_LIVESTREAMS.filter(s => s.category === category);
}

export function getStreamsByRegion(region: LiveStreamRegion): HolyMassLiveStream[] {
  if (region === 'all') return HOLY_MASS_LIVESTREAMS;
  if (region === 'adoration') return HOLY_MASS_LIVESTREAMS.filter(s => s.hasAdoration);
  if (region === 'anticipated') return HOLY_MASS_LIVESTREAMS.filter(s => s.isAnticipatedMass);
  return HOLY_MASS_LIVESTREAMS.filter(s => s.region === region);
}

export function getVaticanLiveStreams(): HolyMassLiveStream[] {
  return HOLY_MASS_LIVESTREAMS.filter(s => s.isVatican);
}
