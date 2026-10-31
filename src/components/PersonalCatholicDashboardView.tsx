import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Calendar as CalendarIcon,
  BookOpen,
  Check,
  Award,
  Flame,
  Timer,
  Play,
  Pause,
  RotateCcw,
  FileText,
  CloudSun,
  Globe,
  Newspaper,
  Bell,
  BookmarkCheck,
  Plus,
  Trash2,
  Volume2,
  VolumeX,
  Copy,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  RefreshCw,
  Pin
} from 'lucide-react';
import { DailyReading } from '../types';
import { getLiturgicalMonth, LITURGICAL_COLORS_INFO } from '../data/liturgicalCalendar';
import { SacredReader } from '../utils/speech';
import { bellSynth } from '../utils/audioSynth';

interface PersonalCatholicDashboardViewProps {
  currentDateStr: string;
  currentReading: DailyReading;
  onSelectDate: (dateStr: string) => void;
  onNavigateTab?: (tab: any) => void;
}

/* ============================================================================
   DATA: PROPHECIES FROM SAINTS, MYSTICS, AND SEERS
   ============================================================================ */
interface SacredProphecy {
  id: string;
  seerName: string;
  title: string;
  yearOrEra: string;
  ecclesialStatus: string;
  category: 'eucharist-marian' | 'mercy-end-times' | 'church-renewal';
  prophecyText: string;
  spiritualApplication: string;
  sourceReference: string;
}

const SACRED_PROPHECIES: SacredProphecy[] = [
  {
    id: 'bosco-two-columns',
    seerName: 'St. John Bosco',
    title: 'Prophetic Dream of the Two Pillars in the Storm',
    yearOrEra: 'May 30, 1862 • Turin, Italy',
    ecclesialStatus: 'Canonized Saint',
    category: 'eucharist-marian',
    prophecyText:
      '“There will be chaos in the Church. Tranquility will not return until the Pope succeeds in anchoring the boat of Peter between the Twin Pillars of Eucharistic Devotion and Devotion to Our Lady. Wait until the flagship of the Pope anchors itself firmly to those two columns: the first with the large Host inscribed ‘Salus Credentium’ (Salvation of Believers), and the second with the statue of the Immaculate Virgin inscribed ‘Auxilium Christianorum’ (Help of Christians).”',
    spiritualApplication:
      'Anchor your daily life in frequent Holy Communion, Eucharistic Adoration, and the daily praying of the Most Holy Rosary.',
    sourceReference: 'Biographical Memoirs of St. John Bosco, Vol. VII, Ch. 11'
  },
  {
    id: 'fatima-immaculate-heart',
    seerName: 'Our Lady of Fátima (Ven. Sr. Lúcia dos Santos)',
    title: 'The Triumph of the Immaculate Heart & Reparation',
    yearOrEra: 'July 13, 1917 • Cova da Iria, Portugal',
    ecclesialStatus: 'Worthy of Belief (Approved 1930)',
    category: 'eucharist-marian',
    prophecyText:
      '“You have seen hell where the souls of poor sinners go. To save them, God wishes to establish in the world devotion to My Immaculate Heart. If what I say to you is done, many souls will be saved and there will be peace... In the end, My Immaculate Heart will triumph. The Holy Father will consecrate Russia to Me, and she shall be converted, and a period of peace will be granted to the world.”',
    spiritualApplication:
      'Fulfill the Five First Saturdays of reparation, offer daily sacrifices for the conversion of sinners, and pray the Rosary for world peace.',
    sourceReference: 'Fatima in Lucia’s Own Words (Memoirs of Sister Lúcia)'
  },
  {
    id: 'faustina-divine-mercy',
    seerName: 'St. Maria Faustina Kowalska',
    title: 'The Spark That Will Prepare the World for His Final Coming',
    yearOrEra: '1938 • Kraków, Poland',
    ecclesialStatus: 'Canonized Saint & Mystic',
    category: 'mercy-end-times',
    prophecyText:
      '“As I was praying for Poland, I heard the words: ‘I bear a special love for Poland, and if she will be obedient to My will, I will exalt her in might and holiness. From her will come forth the spark that will prepare the world for My final coming.’ ... And the Lord said to me: ‘Speak to the world about My mercy; let all mankind recognize My unfathomable mercy. It is a sign for the end times; after it will come the day of justice.’”',
    spiritualApplication:
      'Pray the 3 O’Clock Prayer and the Chaplet of Divine Mercy daily, trusting completely in the Ocean of Christ’s Mercy.',
    sourceReference: 'Diary of St. Maria Faustina Kowalska, §§ 1732, 848'
  },
  {
    id: 'akita-message',
    seerName: 'Our Lady of Akita (Sr. Agnes Sasagawa)',
    title: 'Call to Prayer, Penance, and Fidelity in the Church',
    yearOrEra: 'October 13, 1973 • Akita, Japan',
    ecclesialStatus: 'Approved by Bishop John Shojiro Ito (1984)',
    category: 'church-renewal',
    prophecyText:
      '“As I told you, if men do not repent and better themselves, the Father will inflict a terrible punishment on all humanity... Prayer, penance and courageous sacrifices can soften the Father’s anger. Pray very much the prayers of the Rosary. I alone am able still to save you from the calamities which approach. Those who place their confidence in me will be saved. Pray very much for the Pope, the Bishops, and the Priests.”',
    spiritualApplication:
      'Intercede daily for the Holy Father, bishops, and priests, and offer courageous penance alongside the Holy Rosary.',
    sourceReference: 'Pastoral Letter of Bishop John Shojiro Ito of Niigata (April 22, 1984)'
  },
  {
    id: 'montfort-apostles-latter-times',
    seerName: 'St. Louis-Marie Grignion de Montfort',
    title: 'Prophecy of the Apostles of the Latter Times',
    yearOrEra: '1712 • France',
    ecclesialStatus: 'Canonized Saint & Missionary',
    category: 'church-renewal',
    prophecyText:
      '“God wishes to reveal and manifest Mary, the masterpiece of His hands, in these latter times... They shall be burning fires of divine love, ministers of the Lord who will enkindle the fire of divine charity everywhere. They shall have the two-edged sword of the Word of God in their mouths and the blood-stained standard of the Cross on their shoulders: the Crucifix in their right hand and the Rosary in their left.”',
    spiritualApplication:
      'Live Total Consecration to Jesus through Mary (Totus Tuus), uniting deep Scripture study with Marian devotion.',
    sourceReference: 'Treatise on True Devotion to the Blessed Virgin, §§ 50, 56–59'
  },
  {
    id: 'emmerich-communion-saints',
    seerName: 'Blessed Anne Catherine Emmerich',
    title: 'Vision of the Church Militant Supported by the Saints',
    yearOrEra: '1820 • Dülmen, Germany',
    ecclesialStatus: 'Beatified Mystic (2004)',
    category: 'church-renewal',
    prophecyText:
      '“Even if there remained on earth but one single Catholic, he would still hold the power of the Universal Church through the Communion of Saints. I saw St. Peter’s Church and an immense multitude of saints and angels laboring unseen to rebuild what human lukewarmness had allowed to decay, whenever the faithful returned to fervent Eucharistic adoration and contrition.”',
    spiritualApplication:
      'Never yield to discouragement; one soul united to the Holy Sacrifice of the Mass participates in the entire treasury of heaven.',
    sourceReference: 'The Life and Revelations of Anne Catherine Emmerich, Vol. II'
  }
];

/* ============================================================================
   DATA: MAGISTERIUM AI DOCTRINAL & ECCLESIAL NEWS DIGEST
   ============================================================================ */
interface MagisteriumNewsItem {
  id: string;
  topicTag: string;
  headline: string;
  dateLabel: string;
  summary: string;
  magisterialSources: string[];
  doctrinalSynthesis: string;
}

const MAGISTERIUM_AI_NEWS: MagisteriumNewsItem[] = [
  {
    id: 'mag-1',
    topicTag: 'Sacred Liturgy & Indulgences',
    headline: 'Apostolic Penitentiary Doctrinal Synthesis on Plenary Indulgences for the Holy Souls in Purgatory',
    dateLabel: 'Magisterium AI Synthesis • Current Liturgical Cycle',
    summary:
      'A magisterial analysis of how the Treasury of Merits of Christ and the Saints is applied to the Faithful Departed by way of suffrage (per modum suffragii) during the November Octave.',
    magisterialSources: [
      'Catechism of the Catholic Church §§ 1471–1479',
      'Enchiridion Indulgentiarum, Norm 29',
      'St. Paul VI, Indulgentiarum Doctrina (1967)'
    ],
    doctrinalSynthesis:
      'Because the faithful departed are members of the same Mystical Body of Christ, the pilgrim Church on earth can remit temporal punishment due to sin on their behalf through indulgenced works united to Sacramental Confession, Eucharistic Communion, and prayer for the Supreme Pontiff.'
  },
  {
    id: 'mag-2',
    topicTag: 'Sacred Scripture & Dei Verbum',
    headline: 'Reading Sacred Scripture for 30 Minutes: Magisterial Teaching on Lectio Divina & Plenary Indulgence',
    dateLabel: 'Magisterium AI Doctrinal Brief',
    summary:
      'Why the Church grants a Plenary Indulgence for reading Sacred Scripture for at least half an hour with the veneration due to the Word of God.',
    magisterialSources: [
      'Second Vatican Council, Dei Verbum § 25',
      'Enchiridion Indulgentiarum, Conc. 30',
      'Benedict XVI, Verbum Domini §§ 86–87'
    ],
    doctrinalSynthesis:
      'As St. Jerome taught, “Ignorance of the Scriptures is ignorance of Christ.” In Dei Verbum §25, the Council Fathers exhort all the Christian faithful to learn the surpassing knowledge of Jesus Christ by frequent reading of the divine Scriptures, accompanied by prayer so that dialogue takes place between God and man.'
  },
  {
    id: 'mag-3',
    topicTag: 'Christology & Sacred Heart',
    headline: 'Encyclical Dilexit Nos: The Human and Divine Love of the Heart of Jesus Christ',
    dateLabel: 'Magisterium AI Papal Document Analysis',
    summary:
      'Comprehensive synthesis of the perennial Catholic doctrine of devotion to the Most Sacred Heart of Jesus, from the Church Fathers to St. Margaret Mary Alacoque and St. Charles de Foucauld.',
    magisterialSources: [
      'Encyclical Letter Dilexit Nos (2024)',
      'Pius XII, Haurietis Aquas (1956)',
      'CCC § 478'
    ],
    doctrinalSynthesis:
      'Devotion to the Heart of Christ is not an optional private piety, but a synthesis of the entire Gospel: the pierced side of the Redeemer on Calvary from which blood and water flowed to give birth to the Sacraments of the Church.'
  },
  {
    id: 'mag-4',
    topicTag: 'Moral Theology & AI Ethics',
    headline: 'Antiqua et Nova: Vatican Note on the Relationship Between Artificial Intelligence and Human Intelligence',
    dateLabel: 'Magisterium AI Vatican Dicastery Update',
    summary:
      'Joint doctrinal note of the Dicastery for the Doctrine of the Faith and the Dicastery for Culture and Education distinguishing computational tools from the spiritual intellect and wisdom of the human person.',
    magisterialSources: [
      'DDF, Antiqua et Nova (2025)',
      'St. Thomas Aquinas, Summa Theologiae I, q. 79',
      'Gaudium et Spes § 15'
    ],
    doctrinalSynthesis:
      'True intelligence is not merely functional data processing; in classic Catholic anthropology (ratio and intellectus), human reason is ordered toward contemplating truth, exercising moral conscience, and loving God.'
  }
];

/* ============================================================================
   DATA: ARTICLES FROM WORD ON FIRE, ALETEIA, AND SIGN.ORG
   ============================================================================ */
interface CuratedCatholicArticle {
  id: string;
  publisher: 'Word on Fire' | 'Aleteia' | 'Sign.org';
  author: string;
  title: string;
  readTime: string;
  category: string;
  excerpt: string;
  fullDigest: string;
  externalUrl: string;
}

const CURATED_ARTICLES: CuratedCatholicArticle[] = [
  {
    id: 'wof-1',
    publisher: 'Word on Fire',
    author: 'Bishop Robert Barron',
    title: 'Why the Mass Is Not a Mere Symbol, But the Real Presence of Calvary and the Resurrection',
    readTime: '6 min read',
    category: 'Eucharistic Theology',
    excerpt:
      'If the Eucharist is merely a symbol, as Flannery O’Connor famously remarked, then “to hell with it.” Here is why the Catholic doctrine of transubstantiation is the beating heart of Christian civilization.',
    fullDigest:
      'In John Chapter 6, Jesus does not soften His teaching when the crowd murmurs; instead, He intensifies the verb from “eat” (phagein) to “gnaw/chew” (trogein). Bishop Barron traces how the early Church Fathers—St. Ignatius of Antioch, St. Justin Martyr, and St. Ambrose—unanimously confessed that the Eucharist is the true Flesh and Blood of our Savior Jesus Christ. To kneel before the Blessed Sacrament is to stand at the foot of the Cross and at the threshold of the New Jerusalem.',
    externalUrl: 'https://www.wordonfire.org/articles/'
  },
  {
    id: 'wof-2',
    publisher: 'Word on Fire',
    author: 'Word on Fire Institute',
    title: 'Leading with Beauty: How Sacred Architecture and Chant Awaken the Secular Soul',
    readTime: '5 min read',
    category: 'Evangelization & Culture',
    excerpt:
      'In an age skeptical of moralizing and abstract arguments, the Way of Beauty (Via Pulchritudinis) bypasses ideological defenses and pierces the heart directly.',
    fullDigest:
      'Of the three transcendentals—the True, the Good, and the Beautiful—beauty is the most winsome doorway for evangelization today. A Gothic cathedral window, a Caravaggio canvas, or the solemnchant of the Salve Regina points beyond this passing world toward the uncreated Beauty of God.',
    externalUrl: 'https://www.wordonfire.org/'
  },
  {
    id: 'aleteia-1',
    publisher: 'Aleteia',
    title: 'How Praying for the Holy Souls in Purgatory Gains You the Most Grateful Friends in Heaven',
    author: 'Aleteia Spirituality Desk',
    readTime: '4 min read',
    category: 'Communion of Saints',
    excerpt:
      'St. Alphonsus Liguori and St. Padre Pio taught that the souls in Purgatory cannot pray for themselves, yet once delivered into heaven, they never cease interceding for their benefactors.',
    fullDigest:
      'The Church’s tradition of offering Masses, Rosaries, and cemetery visits for the faithful departed is an extraordinary work of spiritual mercy. Archbishop Fulton Sheen often reminded the faithful that when we enter heaven, the greatest surprise will be the multitude of souls who greet us at the gates because our small daily sacrifices and indulgences shortened their purification.',
    externalUrl: 'https://aleteia.org/spirituality/'
  },
  {
    id: 'aleteia-2',
    publisher: 'Aleteia',
    title: 'The Ancient Monastic Rule of Sanctifying the Hours of the Day in a Busy Modern Home',
    author: 'Philip Kosloski • Aleteia',
    readTime: '5 min read',
    category: 'Daily Prayer Life',
    excerpt:
      'You do not need to live in a cloister to pray without ceasing. Simple anchor points at 6 AM, Noon, 3 PM, and 6 PM transform ordinary work into liturgy.',
    fullDigest:
      'For centuries, Christian towns paused at the ringing of the Angelus bell three times a day to recall the Incarnation of the Word. By setting intentional prayer alarms for the Morning Offering, the Noon Angelus, the 3 O’Clock Hour of Mercy, and the Nightly Examen, lay Catholics build an interior monastery in the midst of family and professional duties.',
    externalUrl: 'https://aleteia.org/'
  },
  {
    id: 'sign-1',
    publisher: 'Sign.org',
    title: 'Actual Graces and Signal Graces: Recognizing How God Speaks Through Daily Devotion',
    author: 'Sign of the Cross Media (Sign.org)',
    readTime: '5 min read',
    category: 'Grace & Sacramentals',
    excerpt:
      'According to Catholic teaching, God continually offers us actual graces and signal graces—especially through the Rosary, Holy Water, and the Brown Scapular—to guide our concrete decisions.',
    fullDigest:
      'The फर्स्ट Promise of Our Lady to St. Dominic and Blessed Alan de la Roche states: “Whoever shall faithfully serve me by the recitation of the Rosary, shall receive signal graces.” Signal graces are unmistakable inspirations, consolations, or providential signs granted through the Blessed Mother’s intercession to confirm a soul in virtue, repentance, and vocation.',
    externalUrl: 'https://www.sign.org/'
  },
  {
    id: 'sign-2',
    publisher: 'Sign.org',
    title: 'Why Keep Holy Water and Blessed Salt in Your Home? The Power of Catholic Sacramentals',
    author: 'Sign.org Editorial Apostolate',
    readTime: '4 min read',
    category: 'Sacramentals',
    excerpt:
      'St. Teresa of Ávila wrote from deep mystical experience that nothing puts evil spirits to flight more swiftly than Holy Water.',
    fullDigest:
      'Unlike the Seven Sacraments, which confer grace ex opere operato, sacramentals such as Holy Water, the St. Benedict Medal, and the Crucifix dispose the soul to receive grace and invoke the authoritative intercessory prayer of the Church to protect the domestic church from spiritual harm.',
    externalUrl: 'https://www.sign.org/'
  }
];

/* ============================================================================
   DATA: CATHOLIC EVENTS WITH INDULGENCES
   ============================================================================ */
interface IndulgenceEventItem {
  id: string;
  dateLabel: string;
  targetDateStr: string;
  title: string;
  indulgenceType: 'Plenary Indulgence' | 'Partial Indulgence';
  prescribedWork: string;
  authority: string;
}

const CATHOLIC_EVENTS_WITH_INDULGENCES: IndulgenceEventItem[] = [
  {
    id: 'ind-ev-1',
    dateLabel: 'Nov 1 – Nov 8 (Octave)',
    targetDateStr: '2026-11-01',
    title: 'Octave of All Saints & Cemetery Visit for the Holy Souls',
    indulgenceType: 'Plenary Indulgence',
    prescribedWork:
      'Devoutly visit a cemetery or columbarium on any day from Nov 1 to Nov 8 and pray, even mentally, for the faithful departed (Enchiridion Indulgentiarum, Norm 29 §1, 1°). Applicable only to the Souls in Purgatory.',
    authority: 'Apostolic Penitentiary • Holy See & Archdiocese of Cebu'
  },
  {
    id: 'ind-ev-2',
    dateLabel: 'Nov 2 (All Souls’ Day)',
    targetDateStr: '2026-11-02',
    title: 'Commemoration of All the Faithful Departed (Oratory / Church Visit)',
    indulgenceType: 'Plenary Indulgence',
    prescribedWork:
      'Piously visit any parish church or public oratory on All Souls’ Day and recite one Our Father and the Apostles’ Creed (Norm 29 §1, 2°), fulfilling the usual conditions.',
    authority: 'Apostolic Penitentiary • Universal Church'
  },
  {
    id: 'ind-ev-3',
    dateLabel: 'Nov 9 (Feast)',
    targetDateStr: '2026-11-09',
    title: 'Dedication of the Archbasilica of St. John Lateran',
    indulgenceType: 'Plenary Indulgence',
    prescribedWork:
      'Devout pilgrimage visit to a Cathedral, Minor Basilica (such as Basilica Minore del Santo Niño in Cebu), or Parish Church on its titular/dedication feast while reciting one Our Father and the Creed (Conc. 33).',
    authority: 'Holy See • Mother and Head of All Churches'
  },
  {
    id: 'ind-ev-4',
    dateLabel: 'Nov 22 (Solemnity)',
    targetDateStr: '2026-11-22',
    title: 'Solemnity of Our Lord Jesus Christ, King of the Universe',
    indulgenceType: 'Plenary Indulgence',
    prescribedWork:
      'Publicly recite the Act of Consecration of the Human Race to Jesus Christ the King (“Most Sweet Jesus, Redeemer of the human race...”) before the Blessed Sacrament on the Solemnity of Christ the King (Conc. 2).',
    authority: 'Apostolic Penitentiary • Universal Church'
  },
  {
    id: 'ind-ev-5',
    dateLabel: 'Daily Year-Round',
    targetDateStr: '2026-10-30',
    title: '30-Minute Reading of Sacred Scripture / Adoration / Family Rosary',
    indulgenceType: 'Plenary Indulgence',
    prescribedWork:
      'Read Sacred Scripture for at least 30 minutes with veneration (Conc. 30), adore the Blessed Sacrament for 30 minutes (Conc. 7), or pray the Holy Rosary in a church, oratory, or family (Conc. 17).',
    authority: 'Enchiridion Indulgentiarum • Fourth Edition'
  }
];

/* ============================================================================
   DATA: BIBLE FLASHCARDS FOR WIDGET
   ============================================================================ */
interface DashboardFlashcard {
  id: string;
  citation: string;
  category: string;
  verseText: string;
  doctrinalKey: string;
}

const DASHBOARD_FLASHCARDS: DashboardFlashcard[] = [
  {
    id: 'fc-john-6-53',
    citation: 'John 6:53–54',
    category: 'The Holy Eucharist',
    verseText:
      '“Amen, amen I say unto you: Except you eat the flesh of the Son of man, and drink his blood, you shall not have life in you. He that eateth my flesh, and drinketh my blood, hath everlasting life: and I will raise him up in the last day.”',
    doctrinalKey: 'Real Presence of Christ in the Most Blessed Sacrament'
  },
  {
    id: 'fc-matt-16-18',
    citation: 'Matthew 16:18–19',
    category: 'The Church & Papacy',
    verseText:
      '“And I say to thee: That thou art Peter; and upon this rock I will build my church, and the gates of hell shall not prevail against it. And I will give to thee the keys of the kingdom of heaven.”',
    doctrinalKey: 'Petrine Primacy and Indefectibility of the Catholic Church'
  },
  {
    id: 'fc-luke-1-28',
    citation: 'Luke 1:28, 48',
    category: 'Blessed Virgin Mary',
    verseText:
      '“Hail, full of grace, the Lord is with thee: blessed art thou among women... Behold from henceforth all generations shall call me blessed.”',
    doctrinalKey: 'The Immaculate Conception (Kecharitomene) and Marian Veneration'
  },
  {
    id: 'fc-john-20-23',
    citation: 'John 20:22–23',
    category: 'Sacrament of Confession',
    verseText:
      '“He breathed on them; and he said to them: Receive ye the Holy Ghost. Whose sins you shall forgive, they are forgiven them; and whose sins you shall retain, they are retained.”',
    doctrinalKey: 'Apostolic Power to Forgive Sins in Sacramental Confession'
  },
  {
    id: 'fc-2-macc-12-46',
    citation: '2 Maccabees 12:46',
    category: 'Purgatory & Suffrages',
    verseText:
      '“It is therefore a holy and wholesome thought to pray for the dead, that they may be loosed from sins.”',
    doctrinalKey: 'Biblical Foundation for Praying for the Holy Souls in Purgatory'
  },
  {
    id: 'fc-1-thess-5-17',
    citation: '1 Thessalonians 5:16–18',
    category: 'Unceasing Prayer',
    verseText:
      '“Always rejoice. Pray without ceasing. In all things give thanks; for this is the will of God in Christ Jesus concerning you all.”',
    doctrinalKey: 'Sanctification of Every Hour of the Christian Day'
  }
];

/* ============================================================================
   TYPES FOR PERSISTED WIDGET STATES
   ============================================================================ */
interface ScriptureReadingLog {
  id: string;
  dateStr: string;
  passageRead: string;
  durationSeconds: number;
  exceededThirtyMin: boolean;
  timestamp: string;
}

interface SpiritualNote {
  id: string;
  title: string;
  category: 'Scripture & Lectio' | 'Homily Notes' | 'Prayer Intentions' | 'Spiritual Direction';
  content: string;
  pinned: boolean;
  updatedAt: string;
}

interface PrayerHourAlarm {
  id: string;
  time24: string; // "HH:MM"
  prayerTitle: string;
  versicleOrNote: string;
  enabled: boolean;
}

interface WeatherCity {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
  patronSaint: string;
}

const WEATHER_CITIES: WeatherCity[] = [
  { id: 'cebu', name: 'Cebu City', country: 'Philippines', lat: 10.3157, lon: 123.8854, patronSaint: 'Señor Santo Niño & Our Lady of Guadalupe de Cebú' },
  { id: 'vatican', name: 'Vatican City (Rome)', country: 'Holy See', lat: 41.9029, lon: 12.4534, patronSaint: 'Sts. Peter and Paul, Apostles' },
  { id: 'manila', name: 'Manila', country: 'Philippines', lat: 14.5995, lon: 120.9842, patronSaint: 'Immaculate Conception' },
  { id: 'jerusalem', name: 'Jerusalem', country: 'Holy Land', lat: 31.7683, lon: 35.2137, patronSaint: 'Mother Church of Christendom' },
  { id: 'fatima', name: 'Fátima', country: 'Portugal', lat: 39.6172, lon: -8.6521, patronSaint: 'Our Lady of the Rosary of Fátima' },
  { id: 'lourdes', name: 'Lourdes', country: 'France', lat: 43.0915, lon: -0.0457, patronSaint: 'Our Lady of Lourdes & St. Bernadette' }
];

const DEFAULT_PRAYER_ALARMS: PrayerHourAlarm[] = [
  {
    id: 'alarm-0600',
    time24: '06:00',
    prayerTitle: 'Morning Offering & Morning Angelus',
    versicleOrNote: '“O Jesus, through the Immaculate Heart of Mary, I offer Thee my prayers, works, joys, and sufferings of this day.”',
    enabled: true
  },
  {
    id: 'alarm-0900',
    time24: '09:00',
    prayerTitle: 'Terce • Mid-Morning Invocation of the Holy Spirit',
    versicleOrNote: '“Come, Holy Spirit, fill the hearts of Thy faithful and enkindle in them the fire of Thy love.”',
    enabled: false
  },
  {
    id: 'alarm-1200',
    time24: '12:00',
    prayerTitle: 'The Noon Angelus',
    versicleOrNote: '“The Angel of the Lord declared unto Mary: And she conceived of the Holy Spirit.”',
    enabled: true
  },
  {
    id: 'alarm-1500',
    time24: '15:00',
    prayerTitle: '3 O’Clock Prayer & Chaplet of Divine Mercy',
    versicleOrNote: '“You expired, Jesus, but the source of life gushed forth for souls, and the ocean of mercy opened up for the whole world.”',
    enabled: true
  },
  {
    id: 'alarm-1800',
    time24: '18:00',
    prayerTitle: 'Evening Angelus & Vespers',
    versicleOrNote: '“Behold the handmaid of the Lord: Be it done unto me according to Thy word.”',
    enabled: true
  },
  {
    id: 'alarm-2000',
    time24: '20:00',
    prayerTitle: 'Most Holy Rosary & 30-Min Sacred Scripture Reading',
    versicleOrNote: 'Family Rosary and Lectio Divina (30+ minutes for Plenary Indulgence).',
    enabled: true
  },
  {
    id: 'alarm-2130',
    time24: '21:30',
    prayerTitle: 'Nightly Ignatian Examen & De Profundis for the Holy Souls',
    versicleOrNote: '“Into Thy hands, O Lord, I commend my spirit.” + Eternal Rest for the Faithful Departed.',
    enabled: true
  }
];

export const PersonalCatholicDashboardView: React.FC<PersonalCatholicDashboardViewProps> = ({
  currentDateStr,
  currentReading,
  onSelectDate,
  onNavigateTab
}) => {
  /* --------------------------------------------------------------------------
     DASHBOARD SECTION FILTER
     -------------------------------------------------------------------------- */
  const [dashboardFilter, setDashboardFilter] = useState<
    'all' | 'liturgy' | 'scripture-prayer' | 'prophecy-indulgences' | 'news-articles' | 'utilities'
  >('all');

  /* --------------------------------------------------------------------------
     1. CATHOLIC CALENDAR MINI-GRID STATE
     -------------------------------------------------------------------------- */
  const [calYear, setCalYear] = useState(() => parseInt(currentDateStr.split('-')[0], 10));
  const [calMonth, setCalMonth] = useState(() => parseInt(currentDateStr.split('-')[1], 10) - 1);

  useEffect(() => {
    const parts = currentDateStr.split('-');
    if (parts.length === 3) {
      setCalYear(parseInt(parts[0], 10));
      setCalMonth(parseInt(parts[1], 10) - 1);
    }
  }, [currentDateStr]);

  const calendarCells = useMemo(() => {
    const firstDayOfWeek = new Date(calYear, calMonth, 1).getDay();
    const monthData = getLiturgicalMonth(calYear, calMonth);
    const cells: { day: number | null; dateStr: string; color?: string; title?: string }[] = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      cells.push({ day: null, dateStr: '' });
    }
    for (const dayInfo of monthData.days) {
      cells.push({
        day: dayInfo.dayOfMonth,
        dateStr: dayInfo.date,
        color: dayInfo.color,
        title: dayInfo.saintName || dayInfo.title
      });
    }
    return cells;
  }, [calYear, calMonth]);

  /* --------------------------------------------------------------------------
     2. MASS READINGS & HOMILY STATE
     -------------------------------------------------------------------------- */
  const [activeReadingPart, setActiveReadingPart] = useState<'gospel' | 'first' | 'psalm' | 'homily'>('homily');
  const [isSpeakingHomily, setIsSpeakingHomily] = useState(false);
  const [copiedHomily, setCopiedHomily] = useState(false);

  const generatedHomily = useMemo(() => {
    const gospelCite = currentReading.gospel.citation;
    const liturgicalTitle = currentReading.liturgicalDay;
    const reflectionBody =
      currentReading.reflection ||
      'In today’s Holy Gospel, Christ invites us to move beyond mere external observance into a living, Eucharistic union of charity and interior conversion.';

    return {
      title: `Daily Catholic Homily • ${liturgicalTitle}`,
      scriptureFocus: `${currentReading.firstReading.citation} • ${gospelCite}`,
      exordium: `My dear brothers and sisters in Christ, as we gather at the altar on this ${liturgicalTitle}, the Church places before our eyes the living Word of God in ${gospelCite}.`,
      body: reflectionBody,
      patristicApplication: `St. Augustine and St. John Chrysostom remind us that the Word proclaimed at the ambo becomes Flesh upon the altar. When we hear Christ speak in ${gospelCite}, He is not addressing a distant crowd in first-century Galilee alone—He is speaking directly to your soul today. Let us bring this Gospel to our daily examination of conscience, our family duties, and our charity toward the poor and the Holy Souls in Purgatory.`,
      peroration: `May the Most Blessed Virgin Mary, Mother of the Eucharist, obtain for us the grace to ponder these words in our hearts and put them into practice. Amen.`
    };
  }, [currentReading]);

  const handleToggleHomilySpeech = () => {
    if (isSpeakingHomily) {
      SacredReader.stop();
      setIsSpeakingHomily(false);
    } else {
      const text = `${generatedHomily.title}. ${generatedHomily.exordium} ${generatedHomily.body} ${generatedHomily.patristicApplication} ${generatedHomily.peroration}`;
      setIsSpeakingHomily(true);
      SacredReader.speak(text, () => setIsSpeakingHomily(false));
    }
  };

  const handleCopyHomily = () => {
    const text = `${generatedHomily.title}\n(${generatedHomily.scriptureFocus})\n\n${generatedHomily.exordium}\n\n${generatedHomily.body}\n\n${generatedHomily.patristicApplication}\n\n${generatedHomily.peroration}`;
    navigator.clipboard.writeText(text);
    setCopiedHomily(true);
    setTimeout(() => setCopiedHomily(false), 2000);
  };

  /* --------------------------------------------------------------------------
     3. CUSTOMIZABLE PRAYER CHECKLIST WIDGET STATE
     -------------------------------------------------------------------------- */
  const checklistStorageKey = `sanctum_piety_checklist_v2_${currentDateStr}`;
  const [quickChecklist, setQuickChecklist] = useState<
    { id: string; title: string; subtitle: string; completed: boolean }[]
  >([]);
  const [newQuickPrayer, setNewQuickPrayer] = useState('');

  useEffect(() => {
    try {
      const stored = localStorage.getItem(checklistStorageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setQuickChecklist(parsed);
          return;
        }
      }
    } catch {
      // ignore
    }
    setQuickChecklist([
      { id: 'morning-offering', title: 'Morning Offering to the Sacred Heart', subtitle: '06:00 AM • Consecration of the Day', completed: false },
      { id: 'angelus-noon', title: 'The Angelus (6 AM, 12 PM, 6 PM)', subtitle: 'Incarnation of the Word', completed: false },
      { id: 'three-oclock-prayer', title: '3 O’Clock Prayer & Chaplet of Divine Mercy', subtitle: '03:00 PM • Hour of Great Mercy', completed: false },
      { id: 'holy-rosary', title: 'The Most Holy Rosary (5 Decades)', subtitle: 'Meditation on the Mysteries with Our Lady', completed: false },
      { id: 'daily-mass', title: 'Holy Sacrifice of the Mass & Holy Communion', subtitle: 'Source and Summit of Christian Life', completed: false },
      { id: 'scripture-30m', title: 'Sacred Scripture Reading (30+ Minutes)', subtitle: 'Plenary Indulgence Condition (Conc. 30)', completed: false },
      { id: 'holy-souls-requiem', title: 'Suffrages & Eternal Rest for the Holy Souls', subtitle: 'November Indulgence Prayer for the Departed', completed: false },
      { id: 'nightly-examen', title: 'Nightly Ignatian Examen & Act of Contrition', subtitle: '09:30 PM • Review of Conscience', completed: false }
    ]);
  }, [checklistStorageKey]);

  const toggleQuickChecklistItem = (id: string) => {
    setQuickChecklist((prev) => {
      const next = prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item));
      try {
        localStorage.setItem(checklistStorageKey, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleAddQuickPrayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuickPrayer.trim()) return;
    const item = {
      id: `custom-${Date.now()}`,
      title: newQuickPrayer.trim(),
      subtitle: 'Custom Daily Devotion',
      completed: false
    };
    setQuickChecklist((prev) => {
      const next = [...prev, item];
      try {
        localStorage.setItem(checklistStorageKey, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
    setNewQuickPrayer('');
  };

  const handleDeleteQuickPrayer = (id: string) => {
    setQuickChecklist((prev) => {
      const next = prev.filter((i) => i.id !== id);
      try {
        localStorage.setItem(checklistStorageKey, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  /* --------------------------------------------------------------------------
     4. BUILT-IN 30+ MINUTE SCRIPTURE READING STOPWATCH STATE
     -------------------------------------------------------------------------- */
  const THIRTY_MINUTES_SECONDS = 1800; // 30 * 60
  const [stopwatchSeconds, setStopwatchSeconds] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(`sanctum_scripture_stopwatch_${currentDateStr}`);
      return saved ? parseInt(saved, 10) || 0 : 0;
    } catch {
      return 0;
    }
  });
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  const [scripturePassageInput, setScripturePassageInput] = useState(() => currentReading.gospel.citation);
  const [readingLogs, setReadingLogs] = useState<ScriptureReadingLog[]>(() => {
    try {
      const raw = localStorage.getItem('sanctum_scripture_reading_logs_v1');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const chimedThirtyMinRef = useRef(false);

  useEffect(() => {
    if (!isStopwatchRunning) return;
    const timer = setInterval(() => {
      setStopwatchSeconds((prev) => {
        const next = prev + 1;
        try {
          localStorage.setItem(`sanctum_scripture_stopwatch_${currentDateStr}`, String(next));
        } catch {
          // ignore
        }
        if (next === THIRTY_MINUTES_SECONDS + 1 && !chimedThirtyMinRef.current) {
          chimedThirtyMinRef.current = true;
          bellSynth.playNoonChimes();
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isStopwatchRunning, currentDateStr]);

  const formatStopwatch = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    if (hrs > 0) {
      return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const hasExceededThirtyMinutes = stopwatchSeconds > THIRTY_MINUTES_SECONDS;
  const stopwatchProgressPct = Math.min(100, Math.round((stopwatchSeconds / THIRTY_MINUTES_SECONDS) * 100));

  const handleLogScriptureSession = () => {
    if (stopwatchSeconds < 5) return;
    const newLog: ScriptureReadingLog = {
      id: `log-${Date.now()}`,
      dateStr: currentDateStr,
      passageRead: scripturePassageInput.trim() || 'Sacred Scripture Reading',
      durationSeconds: stopwatchSeconds,
      exceededThirtyMin: stopwatchSeconds > THIRTY_MINUTES_SECONDS,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    const updated = [newLog, ...readingLogs].slice(0, 20);
    setReadingLogs(updated);
    try {
      localStorage.setItem('sanctum_scripture_reading_logs_v1', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  /* --------------------------------------------------------------------------
     5. PROPHECIES WIDGET STATE
     -------------------------------------------------------------------------- */
  const [selectedProphecyCategory, setSelectedProphecyCategory] = useState<'all' | SacredProphecy['category']>('all');
  const [activeProphecyId, setActiveProphecyId] = useState<string>(SACRED_PROPHECIES[0].id);

  const filteredProphecies = useMemo(() => {
    if (selectedProphecyCategory === 'all') return SACRED_PROPHECIES;
    return SACRED_PROPHECIES.filter((p) => p.category === selectedProphecyCategory);
  }, [selectedProphecyCategory]);

  const currentProphecy =
    filteredProphecies.find((p) => p.id === activeProphecyId) || filteredProphecies[0] || SACRED_PROPHECIES[0];

  /* --------------------------------------------------------------------------
     6. NOTES WIDGET STATE
     -------------------------------------------------------------------------- */
  const [notes, setNotes] = useState<SpiritualNote[]>(() => {
    try {
      const raw = localStorage.getItem('sanctum_dashboard_notes_v1');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return [
      {
        id: 'note-default-1',
        title: 'Resolution from Today’s Gospel & Homily',
        category: 'Homily Notes',
        content:
          'Keep custody of the heart throughout the day; pray one decade of the Rosary at noon for the Holy Souls in Purgatory and read the Gospel slowly for at least 30 minutes.',
        pinned: true,
        updatedAt: currentDateStr
      }
    ];
  });
  const [noteTitle, setNoteTitle] = useState('');
  const [noteCategory, setNoteCategory] = useState<SpiritualNote['category']>('Scripture & Lectio');
  const [noteContent, setNoteContent] = useState('');

  const saveNotesToStorage = (updated: SpiritualNote[]) => {
    setNotes(updated);
    try {
      localStorage.setItem('sanctum_dashboard_notes_v1', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle.trim() && !noteContent.trim()) return;
    const newNote: SpiritualNote = {
      id: `note-${Date.now()}`,
      title: noteTitle.trim() || 'Spiritual Reflection Note',
      category: noteCategory,
      content: noteContent.trim(),
      pinned: false,
      updatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    saveNotesToStorage([newNote, ...notes]);
    setNoteTitle('');
    setNoteContent('');
  };

  const handleTogglePinNote = (id: string) => {
    const updated = notes
      .map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n))
      .sort((a, b) => Number(b.pinned) - Number(a.pinned));
    saveNotesToStorage(updated);
  };

  const handleDeleteNote = (id: string) => {
    saveNotesToStorage(notes.filter((n) => n.id !== id));
  };

  /* --------------------------------------------------------------------------
     7. WEATHER WIDGET STATE (LIVE OPEN-METEO API)
     -------------------------------------------------------------------------- */
  const [selectedCityId, setSelectedCityId] = useState<string>('cebu');
  const [useFahrenheit, setUseFahrenheit] = useState(false);
  const [weatherData, setWeatherData] = useState<{
    tempC: number;
    windKmh: number;
    weatherCode: number;
    humidity: number;
    highC: number;
    lowC: number;
    loading: boolean;
  }>({
    tempC: 29,
    windKmh: 14,
    weatherCode: 1,
    humidity: 74,
    highC: 31,
    lowC: 25,
    loading: false
  });

  const selectedCity = WEATHER_CITIES.find((c) => c.id === selectedCityId) || WEATHER_CITIES[0];

  const fetchCityWeather = async (city: WeatherCity) => {
    setWeatherData((prev) => ({ ...prev, loading: true }));
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('Weather fetch failed');
      const data = await res.json();
      setWeatherData({
        tempC: Math.round(data.current?.temperature_2m ?? 28),
        windKmh: Math.round(data.current?.wind_speed_10m ?? 12),
        weatherCode: data.current?.weather_code ?? 1,
        humidity: Math.round(data.current?.relative_humidity_2m ?? 72),
        highC: Math.round(data.daily?.temperature_2m_max?.[0] ?? 31),
        lowC: Math.round(data.daily?.temperature_2m_min?.[0] ?? 24),
        loading: false
      });
    } catch {
      setWeatherData((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    fetchCityWeather(selectedCity);
  }, [selectedCityId]);

  const formatTemp = (c: number) => (useFahrenheit ? `${Math.round((c * 9) / 5 + 32)}°F` : `${c}°C`);

  const getWeatherLabel = (code: number) => {
    if (code === 0) return 'Clear Sky';
    if (code <= 3) return 'Partly Cloudy';
    if (code <= 48) return 'Gentle Mist';
    if (code <= 67) return 'Rain Showers';
    if (code <= 82) return 'Tropical Showers';
    return 'Thunderstorm';
  };

  /* --------------------------------------------------------------------------
     8. MAGISTERIUM AI NEWS & CATHOLIC ARTICLES WIDGET STATES
     -------------------------------------------------------------------------- */
  const [selectedMagisteriumId, setSelectedMagisteriumId] = useState<string>(MAGISTERIUM_AI_NEWS[0].id);
  const [articlePublisherFilter, setArticlePublisherFilter] = useState<
    'All' | 'Word on Fire' | 'Aleteia' | 'Sign.org'
  >('All');
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(CURATED_ARTICLES[0].id);

  const filteredArticles = useMemo(() => {
    if (articlePublisherFilter === 'All') return CURATED_ARTICLES;
    return CURATED_ARTICLES.filter((a) => a.publisher === articlePublisherFilter);
  }, [articlePublisherFilter]);

  /* --------------------------------------------------------------------------
     9. ALARM WIDGET FOR SPECIFIC PRAYERS AT CERTAIN HOURS
     -------------------------------------------------------------------------- */
  const [prayerAlarms, setPrayerAlarms] = useState<PrayerHourAlarm[]>(() => {
    try {
      const raw = localStorage.getItem('sanctum_prayer_hour_alarms_v1');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return DEFAULT_PRAYER_ALARMS;
  });
  const [currentClockStr, setCurrentClockStr] = useState('');
  const [newAlarmTime, setNewAlarmTime] = useState('15:00');
  const [newAlarmTitle, setNewAlarmTitle] = useState('');
  const [newAlarmNote, setNewAlarmNote] = useState('');
  const [triggeredAlarmBanner, setTriggeredAlarmBanner] = useState<PrayerHourAlarm | null>(null);
  const lastTriggeredMinuteRef = useRef<string>('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      setCurrentClockStr(`${hh}:${mm}:${ss}`);

      const hhmm = `${hh}:${mm}`;
      if (ss === '00' && lastTriggeredMinuteRef.current !== hhmm) {
        const matched = prayerAlarms.find((a) => a.enabled && a.time24 === hhmm);
        if (matched) {
          lastTriggeredMinuteRef.current = hhmm;
          setTriggeredAlarmBanner(matched);
          bellSynth.playNoonChimes();
        }
      }
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [prayerAlarms]);

  const handleToggleAlarm = (id: string) => {
    const updated = prayerAlarms.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a));
    setPrayerAlarms(updated);
    try {
      localStorage.setItem('sanctum_prayer_hour_alarms_v1', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleAddAlarm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlarmTime || !newAlarmTitle.trim()) return;
    const entry: PrayerHourAlarm = {
      id: `alarm-${Date.now()}`,
      time24: newAlarmTime,
      prayerTitle: newAlarmTitle.trim(),
      versicleOrNote: newAlarmNote.trim() || 'Sanctification of the Canonical Hour.',
      enabled: true
    };
    const updated = [...prayerAlarms, entry].sort((a, b) => a.time24.localeCompare(b.time24));
    setPrayerAlarms(updated);
    try {
      localStorage.setItem('sanctum_prayer_hour_alarms_v1', JSON.stringify(updated));
    } catch {
      // ignore
    }
    setNewAlarmTitle('');
    setNewAlarmNote('');
  };

  const handleDeleteAlarm = (id: string) => {
    const updated = prayerAlarms.filter((a) => a.id !== id);
    setPrayerAlarms(updated);
    try {
      localStorage.setItem('sanctum_prayer_hour_alarms_v1', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  /* --------------------------------------------------------------------------
     10. BIBLE FLASHCARDS WIDGET STATE
     -------------------------------------------------------------------------- */
  const [flashcardIndex, setFlashcardIndex] = useState(0);
  const [isFlashcardFlipped, setIsFlashcardFlipped] = useState(false);
  const [masteredCardIds, setMasteredCardIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem('sanctum_dashboard_mastered_flashcards');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const currentFlashcard = DASHBOARD_FLASHCARDS[flashcardIndex] || DASHBOARD_FLASHCARDS[0];

  const handleToggleMasteredCard = (id: string) => {
    setMasteredCardIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('sanctum_dashboard_mastered_flashcards', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const completedChecklistCount = quickChecklist.filter((i) => i.completed).length;
  const checklistPct =
    quickChecklist.length > 0 ? Math.round((completedChecklistCount / quickChecklist.length) * 100) : 0;

  const showSection = (section: typeof dashboardFilter) =>
    dashboardFilter === 'all' || dashboardFilter === section;

  return (
    <div className="space-y-6 pb-12">
      {/* =====================================================================
          TOP DASHBOARD HEADER & KPI SUMMARY BAR
         ===================================================================== */}
      <div className="rounded-xl p-5 sm:p-6 bg-gradient-to-b from-[#EFE4D7] via-[#E8D9C8] to-[#EFE4D7] border border-[#A78262] shadow-[0_14px_35px_rgba(40,22,12,0.22)] text-[#24140B] space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#BFA287] pb-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-cinzel font-bold text-[#6B3E1E]">
              <span>Horarium &amp; Rule of Life</span>
              <span aria-hidden="true">·</span>
              <span>{currentReading.liturgicalDay}</span>
            </div>
            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[#24140B] leading-tight">
              Personal Catholic Daily Dashboard
            </h2>
            <p className="text-sm sm:text-base font-serif text-[#4A2B17] leading-snug">
              Integrated daily sanctuary with Liturgical Calendar, Mass Readings &amp; Homily, 30+ Min Scripture Stopwatch, Prayer Checklist, Prophecies, Indulgences, Prayer Alarms, Magisterium AI News, Catholic Articles, Weather, Notes, and Bible Flashcards.
            </p>
          </div>

          {/* Live Canonical Clock & Quick Stats */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <div className="px-4 py-2.5 rounded-xl bg-[#24140B] text-[#FAF4ED] border border-[#8B5A2B] text-right">
              <div className="text-[11px] font-cinzel text-amber-300 uppercase tracking-wider">
                Canonical Clock
              </div>
              <div className="font-mono tabular-nums text-lg sm:text-xl font-bold text-white">
                {currentClockStr || '12:00:00'}
              </div>
            </div>
            <div className="px-4 py-2.5 rounded-xl bg-white border border-[#C8AD8D] text-right">
              <div className="text-[11px] font-cinzel text-[#6B3E1E] uppercase tracking-wider">
                Daily Rule Progress
              </div>
              <div className="font-mono tabular-nums text-lg sm:text-xl font-bold text-[#24140B]">
                {completedChecklistCount}/{quickChecklist.length} ({checklistPct}%)
              </div>
            </div>
          </div>
        </div>

        {/* Active Prayer Alarm Notification Banner */}
        {triggeredAlarmBanner && (
          <div className="p-4 rounded-xl bg-[#341D10] text-amber-50 border border-amber-400/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="text-xs font-cinzel font-bold text-amber-300">
                Canonical Prayer Hour Reached • {triggeredAlarmBanner.time24}
              </div>
              <div className="text-base sm:text-lg font-cinzel font-bold text-white">
                {triggeredAlarmBanner.prayerTitle}
              </div>
              <p className="text-sm font-serif italic text-amber-100">
                {triggeredAlarmBanner.versicleOrNote}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setTriggeredAlarmBanner(null)}
              className="px-4 py-2 rounded-lg bg-amber-400 text-stone-950 font-cinzel text-xs font-bold cursor-pointer self-start sm:self-center"
            >
              Amen • Dismiss
            </button>
          </div>
        )}

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: 'All 11 Dashboard Modules' },
            { id: 'liturgy', label: 'Calendar, Mass & Homily' },
            { id: 'scripture-prayer', label: '30m Scripture Stopwatch, Checklist & Alarms' },
            { id: 'prophecy-indulgences', label: 'Prophecies & Indulgence Events' },
            { id: 'news-articles', label: 'Magisterium AI & Catholic Articles' },
            { id: 'utilities', label: 'Flashcards, Notes & Weather' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setDashboardFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-cinzel font-bold transition-colors cursor-pointer border ${
                dashboardFilter === tab.id
                  ? 'bg-[#341D10] text-[#FAF4ED] border-[#24140B]'
                  : 'bg-white hover:bg-[#FAF4ED] text-[#341D10] border-[#BFA287]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* =====================================================================
          ROW 1: 30+ MINUTE SCRIPTURE READING STOPWATCH + PRAYER ALARMS WIDGET
         ===================================================================== */}
      {showSection('scripture-prayer') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* WIDGET 1: BUILT-IN STOPWATCH FOR TIMING DAILY SCRIPTURE READING (> 30 MINUTES) */}
          <div className="lg:col-span-7 rounded-xl p-5 bg-[#EFE4D7] border border-[#A78262] shadow-md text-[#24140B] flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#BFA287] pb-3">
                <div className="flex items-center gap-2">
                  <Timer className="w-5 h-5 text-[#6B3E1E]" />
                  <div>
                    <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#24140B]">
                      Daily Sacred Scripture Reading Stopwatch
                    </h3>
                    <p className="text-xs sm:text-sm font-serif text-[#5D371F]">
                      Goal: Exceed 30 minutes (30:00+) for Plenary Indulgence (<em>Enchiridion Indulgentiarum</em>, Conc. 30)
                    </p>
                  </div>
                </div>
                <span className="text-xs sm:text-sm font-cinzel font-bold text-[#6B3E1E]">
                  {hasExceededThirtyMinutes
                    ? '✦ 30-Minute Threshold Exceeded!'
                    : `Target: > 30:00 (${stopwatchProgressPct}%)`}
                </span>
              </div>

              {/* Large Tabular Stopwatch Readout */}
              <div
                className={`p-4 sm:p-5 rounded-xl border text-center space-y-2 transition-colors ${
                  hasExceededThirtyMinutes
                    ? 'bg-[#1D3524] text-emerald-50 border-emerald-500/60'
                    : 'bg-[#24140B] text-[#FAF4ED] border-[#8B5A2B]'
                }`}
              >
                <div className="text-xs font-cinzel tracking-wider uppercase text-amber-300">
                  {hasExceededThirtyMinutes
                    ? 'Plenary Indulgence Time Requirement Fulfilled (> 30 Minutes)'
                    : 'Elapsed Scripture Reading Time'}
                </div>
                <div className="font-mono tabular-nums text-4xl sm:text-5xl font-bold tracking-wider text-white">
                  {formatStopwatch(stopwatchSeconds)}
                </div>

                {/* Progress Bar toward 30:00 */}
                <div className="w-full h-2.5 bg-white/15 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      hasExceededThirtyMinutes ? 'bg-emerald-400' : 'bg-amber-400'
                    }`}
                    style={{ width: `${stopwatchProgressPct}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs font-serif text-amber-200/90 pt-0.5">
                  <span>00:00 Start</span>
                  <span>15:00 Lectio</span>
                  <span>30:00 Plenary Indulgence Goal</span>
                </div>
              </div>

              {/* Controls & Passage Input */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsStopwatchRunning((r) => !r)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-cinzel text-xs sm:text-sm font-bold cursor-pointer transition-colors ${
                    isStopwatchRunning
                      ? 'bg-amber-800 hover:bg-amber-900 text-white'
                      : 'bg-[#341D10] hover:bg-[#24140B] text-[#FAF4ED]'
                  }`}
                >
                  {isStopwatchRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isStopwatchRunning ? 'Pause Timer' : stopwatchSeconds > 0 ? 'Resume Timer' : 'Start Reading Timer'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsStopwatchRunning(false);
                    setStopwatchSeconds(0);
                    chimedThirtyMinRef.current = false;
                    try {
                      localStorage.setItem(`sanctum_scripture_stopwatch_${currentDateStr}`, '0');
                    } catch {
                      // ignore
                    }
                  }}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg bg-white hover:bg-stone-100 text-[#341D10] border border-[#BFA287] font-cinzel text-xs sm:text-sm font-bold cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>

                <button
                  type="button"
                  onClick={handleLogScriptureSession}
                  className="px-3.5 py-2 rounded-lg bg-[#6B3E1E] hover:bg-[#522E14] text-amber-50 font-cinzel text-xs sm:text-sm font-bold cursor-pointer ml-auto"
                >
                  Log Reading Session
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <label className="text-xs sm:text-sm font-cinzel font-bold text-[#341D10] shrink-0">
                  Scripture Passage:
                </label>
                <input
                  type="text"
                  value={scripturePassageInput}
                  onChange={(e) => setScripturePassageInput(e.target.value)}
                  placeholder="e.g., Gospel of John Ch. 14–17"
                  className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-[#BFA287] text-sm font-serif text-[#24140B]"
                />
              </div>
            </div>

            {/* Logged Sessions */}
            {readingLogs.length > 0 && (
              <div className="pt-3 border-t border-[#C8AD8D] space-y-1.5">
                <div className="text-xs font-cinzel font-bold uppercase text-[#5D371F]">
                  Recent Scripture Reading Sessions
                </div>
                <div className="space-y-1 max-h-28 overflow-y-auto pr-1">
                  {readingLogs.slice(0, 4).map((log) => (
                    <div
                      key={log.id}
                      className="flex items-center justify-between text-xs sm:text-sm font-serif bg-white px-3 py-1.5 rounded-lg border border-[#D8C3AC]"
                    >
                      <span className="font-semibold text-[#24140B] truncate">
                        {log.passageRead} <span className="text-stone-500 font-normal">({log.dateStr})</span>
                      </span>
                      <span className="font-mono tabular-nums font-bold text-[#6B3E1E] shrink-0 ml-2">
                        {formatStopwatch(log.durationSeconds)} {log.exceededThirtyMin ? '✦ >30m' : ''}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* WIDGET 2: ALARM WIDGET FOR SPECIFIC PRAYERS AT CERTAIN HOURS */}
          <div className="lg:col-span-5 rounded-xl p-5 bg-[#EFE4D7] border border-[#A78262] shadow-md text-[#24140B] flex flex-col justify-between space-y-3.5">
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2 border-b border-[#BFA287] pb-3">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-[#6B3E1E]" />
                  <div>
                    <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#24140B]">
                      Canonical Prayer Hour Alarms
                    </h3>
                    <p className="text-xs sm:text-sm font-serif text-[#5D371F]">
                      Scheduled bells for prayers at specific hours
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => bellSynth.playNoonChimes()}
                  className="px-2.5 py-1 rounded-lg bg-white hover:bg-[#FAF4ED] text-[#341D10] border border-[#BFA287] font-cinzel text-xs font-bold cursor-pointer"
                  title="Test Sanctuary Bell Chime"
                >
                  Test Chime
                </button>
              </div>

              {/* Alarm List */}
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {prayerAlarms.map((alarm) => (
                  <div
                    key={alarm.id}
                    className={`p-2.5 rounded-lg border flex items-start justify-between gap-2.5 transition-colors ${
                      alarm.enabled
                        ? 'bg-white border-[#C8AD8D]'
                        : 'bg-stone-100/70 border-stone-300 opacity-70'
                    }`}
                  >
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono tabular-nums text-xs sm:text-sm font-bold px-2 py-0.5 rounded bg-[#341D10] text-[#FAF4ED]">
                          {alarm.time24}
                        </span>
                        <span className="font-cinzel text-sm font-bold text-[#24140B] truncate">
                          {alarm.prayerTitle}
                        </span>
                      </div>
                      <p className="text-xs font-serif text-[#5D371F] line-clamp-1">
                        {alarm.versicleOrNote}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleToggleAlarm(alarm.id)}
                        className={`px-2.5 py-1 rounded text-xs font-cinzel font-bold cursor-pointer border ${
                          alarm.enabled
                            ? 'bg-[#341D10] text-amber-100 border-[#24140B]'
                            : 'bg-white text-stone-600 border-stone-300'
                        }`}
                      >
                        {alarm.enabled ? 'On' : 'Off'}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteAlarm(alarm.id)}
                        className="p-1 text-stone-400 hover:text-red-700 cursor-pointer"
                        title="Remove alarm"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Custom Prayer Alarm Form */}
            <form onSubmit={handleAddAlarm} className="pt-2.5 border-t border-[#C8AD8D] space-y-2">
              <div className="text-xs font-cinzel font-bold text-[#5D371F]">
                Add Prayer Alarm for Specific Hour
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <input
                  type="time"
                  value={newAlarmTime}
                  onChange={(e) => setNewAlarmTime(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg bg-white border border-[#BFA287] font-mono text-xs sm:text-sm text-[#24140B]"
                  required
                />
                <input
                  type="text"
                  value={newAlarmTitle}
                  onChange={(e) => setNewAlarmTitle(e.target.value)}
                  placeholder="Prayer name (e.g., Regina Caeli)"
                  className="flex-1 min-w-[140px] px-3 py-1.5 rounded-lg bg-white border border-[#BFA287] text-xs sm:text-sm font-serif text-[#24140B]"
                  required
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-[#341D10] hover:bg-[#24140B] text-[#FAF4ED] font-cinzel text-xs font-bold cursor-pointer"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================================
          ROW 2: CATHOLIC CALENDAR + MASS READINGS AND HOMILY WIDGET
         ===================================================================== */}
      {showSection('liturgy') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* WIDGET 3: CATHOLIC CALENDAR WIDGET */}
          <div className="lg:col-span-5 rounded-xl p-5 bg-[#EFE4D7] border border-[#A78262] shadow-md text-[#24140B] space-y-3.5">
            <div className="flex items-center justify-between border-b border-[#BFA287] pb-3">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-[#6B3E1E]" />
                <div>
                  <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#24140B]">
                    Catholic Liturgical Calendar
                  </h3>
                  <p className="text-xs sm:text-sm font-serif text-[#5D371F]">
                    Click any date to load its Mass Readings &amp; Homily
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    if (calMonth === 0) {
                      setCalMonth(11);
                      setCalYear((y) => y - 1);
                    } else {
                      setCalMonth((m) => m - 1);
                    }
                  }}
                  className="p-1.5 rounded-lg bg-white hover:bg-[#FAF4ED] border border-[#BFA287] cursor-pointer"
                  aria-label="Previous month"
                >
                  <ChevronLeft className="w-4 h-4 text-[#341D10]" />
                </button>
                <span className="font-cinzel text-xs sm:text-sm font-bold px-2">
                  {new Date(calYear, calMonth, 1).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (calMonth === 11) {
                      setCalMonth(0);
                      setCalYear((y) => y + 1);
                    } else {
                      setCalMonth((m) => m + 1);
                    }
                  }}
                  className="p-1.5 rounded-lg bg-white hover:bg-[#FAF4ED] border border-[#BFA287] cursor-pointer"
                  aria-label="Next month"
                >
                  <ChevronRight className="w-4 h-4 text-[#341D10]" />
                </button>
              </div>
            </div>

            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1 text-center font-cinzel text-xs font-bold text-[#6B3E1E]">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
                <div key={d} className="py-1">{d}</div>
              ))}
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 gap-1">
              {calendarCells.map((cell, idx) => {
                if (!cell.day) {
                  return <div key={`empty-${idx}`} className="h-9" />;
                }
                const isSelected = cell.dateStr === currentDateStr;
                const dotColor =
                  cell.color === 'red'
                    ? 'bg-red-700'
                    : cell.color === 'violet'
                    ? 'bg-purple-800'
                    : cell.color === 'green'
                    ? 'bg-emerald-700'
                    : 'bg-amber-500';

                return (
                  <button
                    key={cell.dateStr}
                    type="button"
                    onClick={() => onSelectDate(cell.dateStr)}
                    title={cell.title}
                    className={`h-10 rounded-lg border flex flex-col items-center justify-center transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#341D10] text-[#FAF4ED] border-[#24140B] font-bold'
                        : 'bg-white hover:bg-[#FAF4ED] text-[#24140B] border-[#D5C2B0]'
                    }`}
                  >
                    <span className="font-mono tabular-nums text-xs sm:text-sm leading-none">
                      {cell.day}
                    </span>
                    <span className={`w-1.5 h-1.5 rounded-full mt-1 ${dotColor}`} />
                  </button>
                );
              })}
            </div>

            <div className="p-3 rounded-lg bg-white border border-[#C8AD8D] space-y-1">
              <div className="text-xs font-cinzel font-bold text-[#6B3E1E]">
                Selected Liturgical Day ({currentDateStr})
              </div>
              <div className="text-sm sm:text-base font-serif font-bold text-[#24140B]">
                {currentReading.liturgicalDay}
              </div>
              <div className="text-xs font-serif text-[#5D371F]">
                Liturgical Color: <strong>{LITURGICAL_COLORS_INFO[currentReading.liturgicalColor]?.name || 'White / Gold'}</strong>
              </div>
            </div>
          </div>

          {/* WIDGET 4: MASS READINGS AND HOMILY WIDGET */}
          <div className="lg:col-span-7 rounded-xl p-5 bg-[#EFE4D7] border border-[#A78262] shadow-md text-[#24140B] flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#BFA287] pb-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[#6B3E1E]" />
                  <div>
                    <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#24140B]">
                      Daily Mass Readings &amp; Catholic Homily
                    </h3>
                    <p className="text-xs sm:text-sm font-serif text-[#5D371F]">
                      {currentReading.firstReading.citation} · {currentReading.psalm.citation} · {currentReading.gospel.citation}
                    </p>
                  </div>
                </div>

                {/* Part Switcher */}
                <div className="flex flex-wrap items-center gap-1">
                  {[
                    { id: 'homily', label: 'Daily Homily' },
                    { id: 'gospel', label: 'Gospel' },
                    { id: 'first', label: '1st Reading' },
                    { id: 'psalm', label: 'Psalm' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveReadingPart(tab.id as any)}
                      className={`px-3 py-1 rounded-lg font-cinzel text-xs font-bold cursor-pointer border ${
                        activeReadingPart === tab.id
                          ? 'bg-[#341D10] text-[#FAF4ED] border-[#24140B]'
                          : 'bg-white text-[#341D10] border-[#BFA287]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reading or Homily Content Box */}
              <div className="p-4 rounded-xl bg-white border border-[#C8AD8D] space-y-3 max-h-80 overflow-y-auto">
                {activeReadingPart === 'homily' && (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2 border-b border-stone-200 pb-2">
                      <div>
                        <h4 className="font-cinzel text-base sm:text-lg font-bold text-[#24140B]">
                          {generatedHomily.title}
                        </h4>
                        <p className="text-xs font-serif text-[#6B3E1E] font-semibold">
                          Lectionary Texts: {generatedHomily.scriptureFocus}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={handleToggleHomilySpeech}
                          className="p-2 rounded-lg bg-[#FAF4ED] hover:bg-[#EFE4D7] text-[#341D10] border border-[#C8AD8D] cursor-pointer"
                          title={isSpeakingHomily ? 'Stop reading homily' : 'Listen to homily'}
                        >
                          {isSpeakingHomily ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </button>
                        <button
                          type="button"
                          onClick={handleCopyHomily}
                          className="p-2 rounded-lg bg-[#FAF4ED] hover:bg-[#EFE4D7] text-[#341D10] border border-[#C8AD8D] cursor-pointer"
                          title="Copy homily text"
                        >
                          {copiedHomily ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base font-serif text-[#2B180D] leading-relaxed">
                      {generatedHomily.exordium}
                    </p>
                    <p className="text-sm sm:text-base font-serif text-[#2B180D] leading-relaxed">
                      {generatedHomily.body}
                    </p>
                    <p className="text-sm sm:text-base font-serif text-[#2B180D] leading-relaxed">
                      {generatedHomily.patristicApplication}
                    </p>
                    <p className="text-sm sm:text-base font-serif italic font-semibold text-[#5D371F]">
                      {generatedHomily.peroration}
                    </p>
                  </div>
                )}

                {activeReadingPart === 'gospel' && (
                  <div className="space-y-2">
                    <div className="font-cinzel text-sm sm:text-base font-bold text-[#24140B]">
                      Holy Gospel • {currentReading.gospel.citation} ({currentReading.gospel.title})
                    </div>
                    <p className="text-sm sm:text-base font-serif text-[#2B180D] leading-relaxed whitespace-pre-line">
                      {currentReading.gospel.text}
                    </p>
                  </div>
                )}

                {activeReadingPart === 'first' && (
                  <div className="space-y-2">
                    <div className="font-cinzel text-sm sm:text-base font-bold text-[#24140B]">
                      First Reading • {currentReading.firstReading.citation} ({currentReading.firstReading.title})
                    </div>
                    <p className="text-sm sm:text-base font-serif text-[#2B180D] leading-relaxed whitespace-pre-line">
                      {currentReading.firstReading.text}
                    </p>
                  </div>
                )}

                {activeReadingPart === 'psalm' && (
                  <div className="space-y-2">
                    <div className="font-cinzel text-sm sm:text-base font-bold text-[#24140B]">
                      Responsorial Psalm • {currentReading.psalm.citation}
                    </div>
                    <p className="text-sm sm:text-base font-serif font-bold italic text-[#6B3E1E]">
                      R. {currentReading.psalm.response}
                    </p>
                    <p className="text-sm sm:text-base font-serif text-[#2B180D] leading-relaxed whitespace-pre-line">
                      {currentReading.psalm.text}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {onNavigateTab && (
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => onNavigateTab('readings')}
                  className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-[#FAF4ED] text-[#341D10] border border-[#A78262] font-cinzel text-xs sm:text-sm font-bold cursor-pointer"
                >
                  Open Full Lectionary View →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          ROW 3: CUSTOMIZABLE PRAYER CHECKLIST + CATHOLIC EVENTS WITH INDULGENCES
         ===================================================================== */}
      {(showSection('scripture-prayer') || showSection('prophecy-indulgences')) && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* WIDGET 5: CUSTOMIZABLE PRAYER CHECKLIST */}
          <div className="lg:col-span-6 rounded-xl p-5 bg-[#EFE4D7] border border-[#A78262] shadow-md text-[#24140B] flex flex-col justify-between space-y-3.5">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#BFA287] pb-3">
                <div>
                  <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#24140B]">
                    Customizable Daily Prayer Checklist
                  </h3>
                  <p className="text-xs sm:text-sm font-serif text-[#5D371F]">
                    Check off your daily prayers or add custom devotions
                  </p>
                </div>
                <span className="font-mono tabular-nums text-sm font-bold text-[#6B3E1E]">
                  {completedChecklistCount}/{quickChecklist.length} Done
                </span>
              </div>

              <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                {quickChecklist.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => toggleQuickChecklistItem(item.id)}
                    className={`p-3 rounded-lg border flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                      item.completed
                        ? 'bg-[#FAF0D9] border-[#C89F5D]'
                        : 'bg-white hover:bg-[#FAF7F2] border-[#C8AD8D]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => {}}
                        className="w-4 h-4 accent-[#341D10] rounded cursor-pointer shrink-0"
                      />
                      <div className="min-w-0">
                        <div
                          className={`font-cinzel text-sm sm:text-base font-bold truncate ${
                            item.completed ? 'line-through text-stone-500' : 'text-[#24140B]'
                          }`}
                        >
                          {item.title}
                        </div>
                        <div className="text-xs font-serif text-[#5D371F] truncate">
                          {item.subtitle}
                        </div>
                      </div>
                    </div>
                    {item.id.startsWith('custom-') && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteQuickPrayer(item.id);
                        }}
                        className="p-1 text-stone-400 hover:text-red-700 cursor-pointer shrink-0"
                        title="Delete custom prayer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleAddQuickPrayer} className="pt-2.5 border-t border-[#C8AD8D] flex items-center gap-2">
              <input
                type="text"
                value={newQuickPrayer}
                onChange={(e) => setNewQuickPrayer(e.target.value)}
                placeholder="Add custom daily prayer or novena..."
                className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-[#BFA287] text-sm font-serif text-[#24140B]"
              />
              <button
                type="submit"
                className="px-3.5 py-1.5 rounded-lg bg-[#341D10] hover:bg-[#24140B] text-[#FAF4ED] font-cinzel text-xs sm:text-sm font-bold cursor-pointer"
              >
                + Add Prayer
              </button>
            </form>
          </div>

          {/* WIDGET 6: CATHOLIC EVENTS WITH INDULGENCES */}
          <div className="lg:col-span-6 rounded-xl p-5 bg-[#EFE4D7] border border-[#A78262] shadow-md text-[#24140B] flex flex-col justify-between space-y-3.5">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#BFA287] pb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#6B3E1E]" />
                  <div>
                    <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#24140B]">
                      Catholic Events with Special Indulgences
                    </h3>
                    <p className="text-xs sm:text-sm font-serif text-[#5D371F]">
                      Vatican Apostolic Penitentiary &amp; Archdiocesan Indulgence Grants
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                {CATHOLIC_EVENTS_WITH_INDULGENCES.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-3.5 rounded-xl bg-white border border-[#C8AD8D] space-y-1.5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-cinzel font-bold">
                      <span className="text-[#6B3E1E]">
                        {ev.dateLabel} · {ev.authority}
                      </span>
                      <span className="text-amber-900 underline decoration-amber-600/50">
                        {ev.indulgenceType}
                      </span>
                    </div>
                    <h4 className="font-cinzel text-base font-bold text-[#24140B]">
                      {ev.title}
                    </h4>
                    <p className="text-sm font-serif text-[#2B180D] leading-snug">
                      {ev.prescribedWork}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-xs font-serif text-[#4A2B17] pt-2 border-t border-[#C8AD8D]">
              <strong>3 Usual Conditions for Plenary Indulgence:</strong> Sacramental Confession, Eucharistic Communion, and Prayer for the Holy Father’s Intentions with detachment from all sin.
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          ROW 4: PROPHECIES FROM SAINTS, MYSTICS, AND SEERS WIDGET
         ===================================================================== */}
      {showSection('prophecy-indulgences') && (
        <div className="rounded-xl p-5 bg-[#EFE4D7] border border-[#A78262] shadow-md text-[#24140B] space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#BFA287] pb-3">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#6B3E1E]" />
              <div>
                <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#24140B]">
                  Prophecies from Saints, Mystics, and Church-Approved Seers
                </h3>
                <p className="text-xs sm:text-sm font-serif text-[#5D371F]">
                  Tested prophetic warnings, promises, and spiritual counsels in harmony with Sacred Tradition
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'all', label: 'All Prophecies' },
                { id: 'eucharist-marian', label: 'Eucharist & Our Lady' },
                { id: 'mercy-end-times', label: 'Divine Mercy' },
                { id: 'church-renewal', label: 'Church & Renewal' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedProphecyCategory(cat.id as any);
                  }}
                  className={`px-3 py-1 rounded-lg font-cinzel text-xs font-bold cursor-pointer border ${
                    selectedProphecyCategory === cat.id
                      ? 'bg-[#341D10] text-[#FAF4ED] border-[#24140B]'
                      : 'bg-white text-[#341D10] border-[#BFA287]'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Seer Selector List */}
            <div className="lg:col-span-4 space-y-2">
              {filteredProphecies.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActiveProphecyId(p.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-colors cursor-pointer ${
                    currentProphecy.id === p.id
                      ? 'bg-[#341D10] text-[#FAF4ED] border-[#24140B]'
                      : 'bg-white hover:bg-[#FAF4ED] text-[#24140B] border-[#C8AD8D]'
                  }`}
                >
                  <div className="font-cinzel text-sm font-bold">{p.seerName}</div>
                  <div
                    className={`text-xs font-serif line-clamp-1 ${
                      currentProphecy.id === p.id ? 'text-amber-200' : 'text-[#5D371F]'
                    }`}
                  >
                    {p.title}
                  </div>
                </button>
              ))}
            </div>

            {/* Active Prophecy Detail */}
            <div className="lg:col-span-8 p-4 sm:p-5 rounded-xl bg-white border border-[#C8AD8D] space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-cinzel font-bold text-[#6B3E1E]">
                <span>{currentProphecy.seerName} · {currentProphecy.yearOrEra}</span>
                <span>{currentProphecy.ecclesialStatus}</span>
              </div>
              <h4 className="font-cinzel text-lg sm:text-xl font-bold text-[#24140B]">
                {currentProphecy.title}
              </h4>
              <p className="text-sm sm:text-base font-serif italic text-[#2B180D] leading-relaxed bg-[#FAF7F2] p-3.5 rounded-lg border border-[#E5D5C4]">
                {currentProphecy.prophecyText}
              </p>
              <div className="space-y-1 text-sm font-serif text-[#3B2213]">
                <div>
                  <strong>Spiritual Application:</strong> {currentProphecy.spiritualApplication}
                </div>
                <div className="text-xs text-[#6B3E1E]">
                  <strong>Source:</strong> {currentProphecy.sourceReference}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          ROW 5: MAGISTERIUM AI NEWS WIDGET + ARTICLES WIDGET (WORD ON FIRE, ALETEIA, SIGN.ORG)
         ===================================================================== */}
      {showSection('news-articles') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* WIDGET 7: NEWS WIDGET WITH NEWS FROM MAGISTERIUM AI */}
          <div className="lg:col-span-6 rounded-xl p-5 bg-[#EFE4D7] border border-[#A78262] shadow-md text-[#24140B] flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#BFA287] pb-3">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#6B3E1E]" />
                  <div>
                    <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#24140B]">
                      Magisterium AI • Doctrinal &amp; Church News
                    </h3>
                    <p className="text-xs sm:text-sm font-serif text-[#5D371F]">
                      Magisterial briefings grounded in Official Church Teaching
                    </p>
                  </div>
                </div>
                <a
                  href="https://www.magisterium.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white hover:bg-[#FAF4ED] text-[#341D10] border border-[#BFA287] font-cinzel text-xs font-bold no-underline"
                >
                  <span>Magisterium AI</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                {MAGISTERIUM_AI_NEWS.map((item) => {
                  const isOpen = selectedMagisteriumId === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedMagisteriumId(item.id)}
                      className="p-3.5 rounded-xl bg-white border border-[#C8AD8D] space-y-2 cursor-pointer transition-colors hover:border-[#8B5A2B]"
                    >
                      <div className="text-xs font-cinzel font-bold text-[#6B3E1E]">
                        {item.topicTag} · {item.dateLabel}
                      </div>
                      <h4 className="font-cinzel text-base font-bold text-[#24140B] leading-snug">
                        {item.headline}
                      </h4>
                      <p className="text-sm font-serif text-[#2B180D] leading-snug">
                        {item.summary}
                      </p>
                      {isOpen && (
                        <div className="pt-2 border-t border-stone-200 space-y-1.5 text-sm font-serif text-[#3B2213]">
                          <p>
                            <strong>Magisterial Synthesis:</strong> {item.doctrinalSynthesis}
                          </p>
                          <div className="text-xs text-[#6B3E1E]">
                            <strong>Cited Sources:</strong> {item.magisterialSources.join(' · ')}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* WIDGET 8: ARTICLE WIDGET (WORD ON FIRE, ALETEIA, SIGN.ORG) */}
          <div className="lg:col-span-6 rounded-xl p-5 bg-[#EFE4D7] border border-[#A78262] shadow-md text-[#24140B] flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#BFA287] pb-3">
                <div className="flex items-center gap-2">
                  <Newspaper className="w-5 h-5 text-[#6B3E1E]" />
                  <div>
                    <h3 className="font-cinzel text-lg sm:text-xl font-bold text-[#24140B]">
                      Catholic Articles • Word on Fire, Aleteia &amp; Sign.org
                    </h3>
                    <p className="text-xs sm:text-sm font-serif text-[#5D371F]">
                      Curated essays on theology, spirituality, and sacramentals
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-1">
                  {(['All', 'Word on Fire', 'Aleteia', 'Sign.org'] as const).map((pub) => (
                    <button
                      key={pub}
                      type="button"
                      onClick={() => setArticlePublisherFilter(pub)}
                      className={`px-2.5 py-1 rounded-lg font-cinzel text-xs font-bold cursor-pointer border ${
                        articlePublisherFilter === pub
                          ? 'bg-[#341D10] text-[#FAF4ED] border-[#24140B]'
                          : 'bg-white text-[#341D10] border-[#BFA287]'
                      }`}
                    >
                      {pub}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                {filteredArticles.map((art) => {
                  const isExpanded = expandedArticleId === art.id;
                  return (
                    <div
                      key={art.id}
                      onClick={() => setExpandedArticleId(isExpanded ? null : art.id)}
                      className="p-3.5 rounded-xl bg-white border border-[#C8AD8D] space-y-1.5 cursor-pointer hover:border-[#8B5A2B]"
                    >
                      <div className="flex items-center justify-between gap-2 text-xs font-cinzel font-bold text-[#6B3E1E]">
                        <span>
                          {art.publisher} · {art.author} · {art.readTime}
                        </span>
                        <a
                          href={art.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 text-[#341D10] hover:underline"
                        >
                          <span>Source</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <h4 className="font-cinzel text-base font-bold text-[#24140B] leading-snug">
                        {art.title}
                      </h4>
                      <p className="text-sm font-serif text-[#2B180D] leading-snug">
                        {art.excerpt}
                      </p>
                      {isExpanded && (
                        <div className="pt-2 border-t border-stone-200 text-sm font-serif text-[#3B2213] leading-relaxed">
                          {art.fullDigest}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          ROW 6: BIBLE FLASHCARDS WIDGET + WEATHER WIDGET + NOTES WIDGET
         ===================================================================== */}
      {showSection('utilities') && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* WIDGET 9: BIBLE FLASHCARDS WIDGET */}
          <div className="lg:col-span-4 rounded-xl p-5 bg-[#EFE4D7] border border-[#A78262] shadow-md text-[#24140B] flex flex-col justify-between space-y-3.5">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#BFA287] pb-3">
                <div className="flex items-center gap-2">
                  <BookmarkCheck className="w-5 h-5 text-[#6B3E1E]" />
                  <div>
                    <h3 className="font-cinzel text-lg font-bold text-[#24140B]">
                      Bible Flashcards
                    </h3>
                    <p className="text-xs font-serif text-[#5D371F]">
                      Click card to flip ({masteredCardIds.length}/{DASHBOARD_FLASHCARDS.length} Mastered)
                    </p>
                  </div>
                </div>
                <span className="font-mono tabular-nums text-xs font-bold text-[#6B3E1E]">
                  {flashcardIndex + 1}/{DASHBOARD_FLASHCARDS.length}
                </span>
              </div>

              {/* Interactive Flip Card */}
              <div
                onClick={() => setIsFlashcardFlipped((f) => !f)}
                className="p-4 rounded-xl bg-[#24140B] text-[#FAF4ED] border border-[#8B5A2B] min-h-[190px] flex flex-col justify-between cursor-pointer select-none shadow-inner"
              >
                <div className="flex items-center justify-between text-xs font-cinzel text-amber-300">
                  <span>{currentFlashcard.category}</span>
                  <span>{isFlashcardFlipped ? 'Verse & Doctrine' : 'Tap to Reveal Verse'}</span>
                </div>

                {!isFlashcardFlipped ? (
                  <div className="my-auto text-center space-y-2 py-4">
                    <div className="font-cinzel text-2xl font-bold text-white">
                      {currentFlashcard.citation}
                    </div>
                    <div className="text-xs font-serif text-amber-200/90">
                      {currentFlashcard.doctrinalKey}
                    </div>
                  </div>
                ) : (
                  <div className="my-auto space-y-2 py-2">
                    <p className="text-sm font-serif italic text-white leading-relaxed">
                      {currentFlashcard.verseText}
                    </p>
                    <div className="text-xs font-cinzel text-amber-300 text-right">
                      — {currentFlashcard.citation}
                    </div>
                  </div>
                )}

                <div className="text-[11px] font-serif text-stone-300 text-center">
                  Click anywhere on card to flip
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setIsFlashcardFlipped(false);
                  setFlashcardIndex((i) => (i === 0 ? DASHBOARD_FLASHCARDS.length - 1 : i - 1));
                }}
                className="px-3 py-1.5 rounded-lg bg-white border border-[#BFA287] font-cinzel text-xs font-bold cursor-pointer"
              >
                ← Prev
              </button>
              <button
                type="button"
                onClick={() => handleToggleMasteredCard(currentFlashcard.id)}
                className={`px-3 py-1.5 rounded-lg font-cinzel text-xs font-bold cursor-pointer border ${
                  masteredCardIds.includes(currentFlashcard.id)
                    ? 'bg-emerald-800 text-white border-emerald-900'
                    : 'bg-white text-[#341D10] border-[#BFA287]'
                }`}
              >
                {masteredCardIds.includes(currentFlashcard.id) ? '✓ Mastered' : 'Mark Mastered'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsFlashcardFlipped(false);
                  setFlashcardIndex((i) => (i + 1) % DASHBOARD_FLASHCARDS.length);
                }}
                className="px-3 py-1.5 rounded-lg bg-white border border-[#BFA287] font-cinzel text-xs font-bold cursor-pointer"
              >
                Next →
              </button>
            </div>
          </div>

          {/* WIDGET 10: WEATHER WIDGET */}
          <div className="lg:col-span-4 rounded-xl p-5 bg-[#EFE4D7] border border-[#A78262] shadow-md text-[#24140B] flex flex-col justify-between space-y-3.5">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#BFA287] pb-3">
                <div className="flex items-center gap-2">
                  <CloudSun className="w-5 h-5 text-[#6B3E1E]" />
                  <div>
                    <h3 className="font-cinzel text-lg font-bold text-[#24140B]">
                      Sanctuary Weather
                    </h3>
                    <p className="text-xs font-serif text-[#5D371F]">
                      Live conditions for pilgrimage &amp; parish travel
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => setUseFahrenheit((f) => !f)}
                    className="px-2 py-1 rounded bg-white border border-[#BFA287] font-mono text-xs font-bold cursor-pointer"
                  >
                    {useFahrenheit ? '°F' : '°C'}
                  </button>
                  <button
                    type="button"
                    onClick={() => fetchCityWeather(selectedCity)}
                    className="p-1.5 rounded bg-white border border-[#BFA287] cursor-pointer"
                    title="Refresh live weather"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${weatherData.loading ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>

              <select
                value={selectedCityId}
                onChange={(e) => setSelectedCityId(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg bg-white border border-[#BFA287] text-sm font-serif text-[#24140B]"
              >
                {WEATHER_CITIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}, {c.country}
                  </option>
                ))}
              </select>

              <div className="p-4 rounded-xl bg-white border border-[#C8AD8D] space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-cinzel text-sm font-bold text-[#24140B]">
                      {selectedCity.name}
                    </div>
                    <div className="text-xs font-serif text-[#6B3E1E]">
                      {getWeatherLabel(weatherData.weatherCode)}
                    </div>
                  </div>
                  <div className="font-mono tabular-nums text-3xl font-bold text-[#24140B]">
                    {formatTemp(weatherData.tempC)}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-stone-200 text-xs font-serif text-[#4A2B17]">
                  <div>
                    High/Low: <strong className="font-mono">{formatTemp(weatherData.highC)}/{formatTemp(weatherData.lowC)}</strong>
                  </div>
                  <div>
                    Humidity: <strong className="font-mono">{weatherData.humidity}%</strong>
                  </div>
                  <div>
                    Wind: <strong className="font-mono">{weatherData.windKmh} km/h</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-xs font-serif italic text-[#4A2B17] pt-2 border-t border-[#C8AD8D]">
              Patronage: <strong>{selectedCity.patronSaint}</strong> · “All ye works of the Lord, bless the Lord” (Daniel 3:57).
            </div>
          </div>

          {/* WIDGET 11: NOTES WIDGET (SPIRITUAL JOURNAL) */}
          <div className="lg:col-span-4 rounded-xl p-5 bg-[#EFE4D7] border border-[#A78262] shadow-md text-[#24140B] flex flex-col justify-between space-y-3.5">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#BFA287] pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#6B3E1E]" />
                  <div>
                    <h3 className="font-cinzel text-lg font-bold text-[#24140B]">
                      Spiritual Notes Widget
                    </h3>
                    <p className="text-xs font-serif text-[#5D371F]">
                      Lectio Divina &amp; homily resolutions
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-[#6B3E1E]">
                  {notes.length} Saved
                </span>
              </div>

              <form onSubmit={handleAddNote} className="space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                    placeholder="Note title..."
                    className="flex-1 px-2.5 py-1.5 rounded-lg bg-white border border-[#BFA287] text-xs sm:text-sm font-serif text-[#24140B]"
                  />
                  <select
                    value={noteCategory}
                    onChange={(e) => setNoteCategory(e.target.value as any)}
                    className="px-2 py-1.5 rounded-lg bg-white border border-[#BFA287] text-xs font-serif text-[#24140B]"
                  >
                    <option value="Scripture & Lectio">Scripture</option>
                    <option value="Homily Notes">Homily</option>
                    <option value="Prayer Intentions">Intentions</option>
                    <option value="Spiritual Direction">Direction</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    placeholder="Write reflection or resolution..."
                    className="flex-1 px-2.5 py-1.5 rounded-lg bg-white border border-[#BFA287] text-xs sm:text-sm font-serif text-[#24140B]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-lg bg-[#341D10] text-[#FAF4ED] font-cinzel text-xs font-bold cursor-pointer shrink-0"
                  >
                    Save
                  </button>
                </div>
              </form>

              <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                {notes.map((n) => (
                  <div
                    key={n.id}
                    className="p-2.5 rounded-lg bg-white border border-[#C8AD8D] space-y-1"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-cinzel text-xs sm:text-sm font-bold text-[#24140B] truncate">
                        {n.title}
                      </span>
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => handleTogglePinNote(n.id)}
                          className={`p-1 cursor-pointer ${
                            n.pinned ? 'text-amber-700' : 'text-stone-400 hover:text-stone-700'
                          }`}
                          title="Pin note"
                        >
                          <Pin className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteNote(n.id)}
                          className="p-1 text-stone-400 hover:text-red-700 cursor-pointer"
                          title="Delete note"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm font-serif text-[#3B2213] leading-snug">
                      {n.content}
                    </p>
                    <div className="text-[11px] font-serif text-[#6B3E1E]">
                      {n.category} · {n.updatedAt}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
