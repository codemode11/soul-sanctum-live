import React, { useState, useEffect, useMemo } from 'react';
import {
  CheckCircle2,
  Circle,
  Clock,
  Heart,
  ShieldCheck,
  Flame,
  Calendar as CalendarIcon,
  MapPin,
  Globe,
  Sparkles,
  Plus,
  Trash2,
  Sliders,
  BookOpen,
  Cross,
  Award,
  AlertCircle,
  Check,
  RefreshCw,
  Bell,
  Users,
  ScrollText
} from 'lucide-react';

export interface PersonalPietyDashboardProps {
  currentDateStr: string;
  onOpenCebuParishes?: () => void;
  onOpenAngelus?: () => void;
  onOpenAdoration?: () => void;
}

type RegimenProfileId = 'standard' | 'busy' | 'contemplative' | 'infirm';
type PietyCategory =
  | 'Morning & Liturgical Hours'
  | 'Sacramental & Eucharistic'
  | 'Marian & Devotional'
  | 'Scripture & Spiritual Reading'
  | 'Night Examination'
  | 'Corporal & Spiritual Works of Mercy';

interface PietyChecklistItem {
  id: string;
  title: string;
  category: PietyCategory;
  durationMinutes: number;
  physicalNote: string;
  infirmAdaptation: string;
  indulgenceType: 'Plenary Indulgence' | 'Partial Indulgence' | 'Sanctifying Merit';
  indulgenceGrantRef?: string;
  description: string;
  profiles: RegimenProfileId[];
  isCustom?: boolean;
}

interface IndulgenceCalendarEntry {
  id: string;
  dateLabel: string;
  feastOrOccasion: string;
  prescribedWork: string;
  grantReference: string;
  suffrageNote: string;
  isUpcomingSoon?: boolean;
}

interface CebuRelicVisit {
  id: string;
  saintName: string;
  relicClass: string;
  shrineOrParish: string;
  locationDistrict: string;
  dateRange: string;
  venerationSchedule: string;
  spiritualFruits: string;
  status: 'Enshrined / Ongoing Veneration' | 'Upcoming Archdiocesan Visit' | 'Pilgrimage Jubilee Site';
}

interface VaticanEventItem {
  id: string;
  title: string;
  dateLabel: string;
  dicasteryOrSource: string;
  summary: string;
  indulgenceOrGrace: string;
  recommendedAction: string;
}

interface NovenaReminderItem {
  id: string;
  title: string;
  feastDateLabel: string;
  startMonthDay: string; // MM-DD
  endMonthDay: string;   // MM-DD
  patronage: string;
  dailyPrayerSnippet: string;
}

const DEFAULT_PIETY_ITEMS: PietyChecklistItem[] = [
  // Morning & Liturgical Hours
  {
    id: 'morning-offering',
    title: 'Morning Offering (Prayers, Works, Joys & Sufferings)',
    category: 'Morning & Liturgical Hours',
    durationMinutes: 2,
    physicalNote: 'Standing or kneeling upon waking',
    infirmAdaptation: 'Prayed quietly from bed upon waking, uniting bodily weakness with the Cross',
    indulgenceType: 'Partial Indulgence',
    indulgenceGrantRef: 'Enchiridion Indulgentiarum, Conc. 3',
    description: 'Consecrate every thought, word, action, and trial of the day to the Sacred Heart of Jesus for the salvation of souls.',
    profiles: ['standard', 'busy', 'contemplative', 'infirm']
  },
  {
    id: 'lauds-morning-prayer',
    title: 'Liturgy of the Hours: Lauds (Morning Prayer)',
    category: 'Morning & Liturgical Hours',
    durationMinutes: 15,
    physicalNote: 'Recited standing or seated',
    infirmAdaptation: 'Listen to audio Lauds or pray the Benedictus antiphon and Gospel Canticle',
    indulgenceType: 'Partial Indulgence',
    indulgenceGrantRef: 'Enchiridion Indulgentiarum, Conc. 18',
    description: 'Unite your voice with the universal Church sanctifying the dawn with Psalms, Old Testament Canticles, and the Benedictus.',
    profiles: ['contemplative']
  },
  {
    id: 'angelus-noon',
    title: 'The Angelus (or Regina Caeli in Eastertide) — 6 AM · 12 NN · 6 PM',
    category: 'Morning & Liturgical Hours',
    durationMinutes: 3,
    physicalNote: 'Kneeling or standing at the Angelus bell',
    infirmAdaptation: 'Recited seated or reclining with a bow of the head at "And the Word was made flesh"',
    indulgenceType: 'Partial Indulgence',
    indulgenceGrantRef: 'Enchiridion Indulgentiarum, Conc. 17 §2',
    description: 'Honors the Mystery of the Incarnation and Our Lady’s fiat at dawn, noon, and eventide.',
    profiles: ['standard', 'busy', 'contemplative', 'infirm']
  },
  {
    id: 'three-oclock-mercy',
    title: 'The Three O’Clock Prayer & Chaplet of Divine Mercy',
    category: 'Morning & Liturgical Hours',
    durationMinutes: 8,
    physicalNote: 'Prayed at 3:00 PM, the Hour of Great Mercy',
    infirmAdaptation: 'Short invocation "Jesus, I trust in You" and uniting present pain with Calvary at 3:00 PM',
    indulgenceType: 'Partial Indulgence',
    indulgenceGrantRef: 'Apostolic Penitentiary Decree (2002)',
    description: 'Implores the unfathomable mercy of God for sinners and the dying at the hour Christ expired on the Cross.',
    profiles: ['standard', 'busy', 'contemplative', 'infirm']
  },
  {
    id: 'vespers-evening-prayer',
    title: 'Liturgy of the Hours: Vespers (Evening Prayer)',
    category: 'Morning & Liturgical Hours',
    durationMinutes: 15,
    physicalNote: 'Recited at sunset',
    infirmAdaptation: 'Pray the Magnificat ("My soul proclaims the greatness of the Lord") in thanksgiving',
    indulgenceType: 'Partial Indulgence',
    indulgenceGrantRef: 'Enchiridion Indulgentiarum, Conc. 18',
    description: 'The evening sacrifice of praise featuring the Magnificat of the Blessed Virgin Mary.',
    profiles: ['contemplative']
  },

  // Sacramental & Eucharistic
  {
    id: 'daily-holy-mass',
    title: 'Assistance at Daily Holy Mass & Eucharistic Communion',
    category: 'Sacramental & Eucharistic',
    durationMinutes: 40,
    physicalNote: 'In-person parish attendance',
    infirmAdaptation: 'Devoutly follow Holy Mass via livestream and make a fervent Act of Spiritual Communion',
    indulgenceType: 'Sanctifying Merit',
    indulgenceGrantRef: 'Source & Summit of Christian Life (CCC 1324)',
    description: 'Participate in the unbloody Sacrifice of Calvary and receive the Body, Blood, Soul, and Divinity of Christ.',
    profiles: ['standard', 'contemplative']
  },
  {
    id: 'eucharistic-adoration-30m',
    title: 'Eucharistic Adoration before the Blessed Sacrament (30 Mins)',
    category: 'Sacramental & Eucharistic',
    durationMinutes: 30,
    physicalNote: 'In a church or adoration chapel',
    infirmAdaptation: '10–15 minutes of quiet heart-to-heart adoration before the Sanctuary Altar view (Norm 24 for the sick)',
    indulgenceType: 'Plenary Indulgence',
    indulgenceGrantRef: 'Enchiridion Indulgentiarum, Conc. 7 §1, 1°',
    description: 'One of the 4 Ordinary Daily Plenary Indulgences: visit the Blessed Sacrament for at least half an hour of adoration.',
    profiles: ['contemplative']
  },
  {
    id: 'spiritual-communion',
    title: 'Act of Spiritual Communion (St. Alphonsus Liguori)',
    category: 'Sacramental & Eucharistic',
    durationMinutes: 2,
    physicalNote: 'Can be prayed anywhere throughout the day',
    infirmAdaptation: 'Especially efficacious when physical reception of Holy Communion is impossible',
    indulgenceType: 'Partial Indulgence',
    indulgenceGrantRef: 'Enchiridion Indulgentiarum, Conc. 8 §2',
    description: '"My Jesus, I believe that Thou art present in the Most Holy Sacrament. I love Thee above all things, and I desire to receive Thee into my soul..."',
    profiles: ['standard', 'busy', 'contemplative', 'infirm']
  },
  {
    id: 'visit-blessed-sacrament',
    title: 'Brief Visit to the Most Blessed Sacrament',
    category: 'Sacramental & Eucharistic',
    durationMinutes: 10,
    physicalNote: 'Stop by a parish church or adoration chapel',
    infirmAdaptation: 'Turn visually toward the nearest Catholic church tabernacle and adore Christ truly present',
    indulgenceType: 'Partial Indulgence',
    indulgenceGrantRef: 'Enchiridion Indulgentiarum, Conc. 7 §2',
    description: 'Pay homage to Our Eucharistic Lord reserved in the Tabernacle with faith, thanksgiving, and reparation.',
    profiles: ['standard']
  },

  // Marian & Devotional
  {
    id: 'most-holy-rosary',
    title: 'The Most Holy Rosary (5 Decades with Meditation on Mysteries)',
    category: 'Marian & Devotional',
    durationMinutes: 20,
    physicalNote: 'Kneeling, seated, or walking',
    infirmAdaptation: 'Pray 1 decade slowly with deep meditation, or hold the Rosary uniting sufferings with Our Lady (Norm 24)',
    indulgenceType: 'Plenary Indulgence',
    indulgenceGrantRef: 'Enchiridion Indulgentiarum, Conc. 17 §1',
    description: 'One of the 4 Ordinary Daily Plenary Indulgences when recited in a church, public oratory, or within the family/community.',
    profiles: ['standard', 'contemplative', 'infirm']
  },
  {
    id: 'mental-prayer-15m',
    title: 'Silent Mental Prayer & Interior Conversation with God',
    category: 'Marian & Devotional',
    durationMinutes: 15,
    physicalNote: 'Seated in quiet recollection',
    infirmAdaptation: 'Rest peacefully in God’s presence, repeating a short jaculatory prayer ("Jesus, Mary, I love You")',
    indulgenceType: 'Partial Indulgence',
    indulgenceGrantRef: 'Enchiridion Indulgentiarum, Conc. 5',
    description: 'St. Teresa of Ávila defines mental prayer as "nothing else than an intimate sharing between friends; taking time frequently to be alone with Him who we know loves us."',
    profiles: ['standard', 'contemplative', 'infirm']
  },
  {
    id: 'way-of-the-cross',
    title: 'Pious Exercise of the Way of the Cross (Via Crucis)',
    category: 'Marian & Devotional',
    durationMinutes: 25,
    physicalNote: 'Moving from Station to Station before canonically erected crosses',
    infirmAdaptation: 'Hold a blessed crucifix and meditate for a short time on the Passion and Death of Our Lord (Norm 13, 2°)',
    indulgenceType: 'Plenary Indulgence',
    indulgenceGrantRef: 'Enchiridion Indulgentiarum, Conc. 13',
    description: 'One of the 4 Ordinary Daily Plenary Indulgences: meditate devoutly on the Passion of Christ across the 14 Stations.',
    profiles: ['contemplative']
  },
  {
    id: 'eternal-rest-holy-souls',
    title: 'Requiem Aeternam (Prayer for the Holy Souls in Purgatory)',
    category: 'Marian & Devotional',
    durationMinutes: 3,
    physicalNote: 'Prayed at any time, especially after meals or at night',
    infirmAdaptation: 'Offer every bodily ache or sleepless hour as suffrage for the Poor Souls in Purgatory',
    indulgenceType: 'Partial Indulgence',
    indulgenceGrantRef: 'Enchiridion Indulgentiarum, Conc. 29 §2',
    description: '"Eternal rest grant unto them, O Lord, and let perpetual light shine upon them. May the souls of the faithful departed, through the mercy of God, rest in peace."',
    profiles: ['standard', 'busy', 'contemplative', 'infirm']
  },

  // Scripture & Spiritual Reading
  {
    id: 'daily-mass-readings-lectio',
    title: 'Daily Mass Readings & Gospel Commentary (Lectio Divina)',
    category: 'Scripture & Spiritual Reading',
    durationMinutes: 12,
    physicalNote: 'Read or listen with audio lector',
    infirmAdaptation: 'Use the Soul Sanctum audio lector button to listen to the daily Gospel and Patristic commentary',
    indulgenceType: 'Partial Indulgence',
    indulgenceGrantRef: 'Enchiridion Indulgentiarum, Conc. 30 §1',
    description: 'Meditate on today’s Lectionary readings and Patristic commentary; extends to a Plenary Indulgence when read for 30 minutes.',
    profiles: ['standard', 'busy', 'contemplative', 'infirm']
  },
  {
    id: 'sacred-scripture-30m',
    title: 'Reading of Sacred Scripture for 30 Minutes',
    category: 'Scripture & Spiritual Reading',
    durationMinutes: 30,
    physicalNote: 'Seated reading with veneration due to the Divine Word',
    infirmAdaptation: 'Listen to an audio recording of Sacred Scripture for 30 minutes with interior reverence',
    indulgenceType: 'Plenary Indulgence',
    indulgenceGrantRef: 'Enchiridion Indulgentiarum, Conc. 30 §1',
    description: 'One of the 4 Ordinary Daily Plenary Indulgences: read Sacred Scripture as spiritual reading from an approved text for at least half an hour.',
    profiles: ['contemplative']
  },
  {
    id: 'spiritual-classics-reading',
    title: 'Spiritual Reading & Life of the Saint of the Day',
    category: 'Scripture & Spiritual Reading',
    durationMinutes: 10,
    physicalNote: 'Read a chapter from Spiritual Classics or Saint of the Day',
    infirmAdaptation: 'Read one short paragraph from Imitation of Christ or St. Faustina’s Diary',
    indulgenceType: 'Sanctifying Merit',
    description: 'St. Josemaría Escrivá: "Don’t neglect your spiritual reading. Reading has made many saints."',
    profiles: ['standard', 'contemplative']
  },

  // Night Examination
  {
    id: 'examen-act-of-contrition',
    title: 'Nightly Examination of Conscience, Act of Contrition & Compline',
    category: 'Night Examination',
    durationMinutes: 6,
    physicalNote: 'Kneeling by bedside or seated before sleep',
    infirmAdaptation: 'Brief 5-step Ignatian Examen and Act of Contrition while resting in bed',
    indulgenceType: 'Partial Indulgence',
    indulgenceGrantRef: 'Enchiridion Indulgentiarum, Conc. 9 & 18',
    description: 'Give thanks for today’s graces, examine faults with filial contrition, and pray "Into Your hands, Lord, I commend my spirit."',
    profiles: ['standard', 'busy', 'contemplative', 'infirm']
  },

  // Corporal & Spiritual Works of Mercy
  {
    id: 'work-of-mercy-daily',
    title: 'Practice a Corporal or Spiritual Work of Mercy',
    category: 'Corporal & Spiritual Works of Mercy',
    durationMinutes: 10,
    physicalNote: 'Charitable assistance, almsgiving, comforting the sorrowful, or forgiving injury',
    infirmAdaptation: 'Apostolate of Suffering: Offer physical infirmity, patience with caregivers, and intercessory prayer for sinners (Norm 24)',
    indulgenceType: 'Partial Indulgence',
    indulgenceGrantRef: 'Enchiridion Indulgentiarum, Conc. 11',
    description: 'Fulfill Christ’s command in Matthew 25:40 through concrete charity of deed, word, forgiveness, or offered suffering.',
    profiles: ['standard', 'busy', 'contemplative', 'infirm']
  }
];

const PROFILE_METADATA: Record<
  RegimenProfileId,
  { label: string; subtitle: string; badge: string; estTime: string }
> = {
  standard: {
    label: 'Standard Lay Rule',
    subtitle: 'Balanced daily plan of prayer, Rosary, Scripture, and Works of Mercy for lay Catholics in the world.',
    badge: 'Balanced Daily Rule',
    estTime: '~45–60 mins/day'
  },
  busy: {
    label: 'Busy / Working Schedule',
    subtitle: 'Essential daily anchors (Morning Offering, Angelus, 3 PM Mercy, Scripture, Examen) for high-demand workdays.',
    badge: 'Essential Anchors',
    estTime: '~15–20 mins/day'
  },
  contemplative: {
    label: 'Contemplative & Liturgical',
    subtitle: 'Full liturgical immersion including Lauds, Vespers, Daily Mass, 30-min Adoration, 30-min Scripture, and Rosary.',
    badge: 'Full Horarium',
    estTime: '~90+ mins/day'
  },
  infirm: {
    label: 'Sick, Elderly & Homebound',
    subtitle: 'Adapted according to Norm 24 of the Manual of Indulgences—transforming physical weakness into the Apostolate of Suffering.',
    badge: 'Norm 24 Adapted',
    estTime: 'Flexible / Gentle Pace'
  }
};

const INDULGENCE_CALENDAR_ENTRIES: IndulgenceCalendarEntry[] = [
  {
    id: 'all-souls-octave',
    dateLabel: 'November 1 – November 8',
    feastOrOccasion: 'Octave of All Souls (Daily Visit to a Cemetery)',
    prescribedWork: 'Devoutly visit a cemetery and pray, if only mentally, for the faithful departed on each day from Nov 1 to Nov 8.',
    grantReference: 'Enchiridion Indulgentiarum, Conc. 29 §1, 1°',
    suffrageNote: 'Plenary Indulgence each day (8 total), applicable ONLY to the Holy Souls in Purgatory.',
    isUpcomingSoon: true
  },
  {
    id: 'all-souls-day-church',
    dateLabel: 'November 2',
    feastOrOccasion: 'Commemoration of All the Faithful Departed (All Souls’ Day)',
    prescribedWork: 'Piously visit a church or oratory and recite one Our Father and the Apostles’ Creed (Pater & Credo).',
    grantReference: 'Enchiridion Indulgentiarum, Conc. 29 §1, 2°',
    suffrageNote: 'Plenary Indulgence applicable ONLY to the Holy Souls in Purgatory.',
    isUpcomingSoon: true
  },
  {
    id: 'christ-the-king',
    dateLabel: 'November 22, 2026',
    feastOrOccasion: 'Solemnity of Our Lord Jesus Christ, King of the Universe',
    prescribedWork: 'Publicly recite the Act of Consecration of the Human Race to Jesus Christ the King ("Most Sweet Jesus, Redeemer of the human race — Iesu dulcissime, Redemptor").',
    grantReference: 'Enchiridion Indulgentiarum, Conc. 2',
    suffrageNote: 'Plenary Indulgence applicable to oneself or to the Holy Souls in Purgatory.',
    isUpcomingSoon: true
  },
  {
    id: 'immaculate-conception-shrine',
    dateLabel: 'December 8',
    feastOrOccasion: 'Solemnity of the Immaculate Conception of the Blessed Virgin Mary',
    prescribedWork: 'Piously visit a Marian basilica, shrine, or parish church on its titular feast and recite one Our Father and the Creed.',
    grantReference: 'Enchiridion Indulgentiarum, Conc. 33 §1',
    suffrageNote: 'Plenary Indulgence under the three usual conditions.'
  },
  {
    id: 'new-years-eve-te-deum',
    dateLabel: 'December 31',
    feastOrOccasion: 'Last Day of the Civil Year (Thanksgiving)',
    prescribedWork: 'Publicly recite or chant the hymn Te Deum in a church or oratory in thanksgiving for the benefits received over the course of the entire year.',
    grantReference: 'Enchiridion Indulgentiarum, Conc. 26 §1, 2°',
    suffrageNote: 'Plenary Indulgence under the three usual conditions.'
  },
  {
    id: 'new-years-day-veni-creator',
    dateLabel: 'January 1',
    feastOrOccasion: 'Solemnity of Mary, Mother of God (First Day of the Year)',
    prescribedWork: 'Publicly recite or chant the hymn Veni Creator Spiritus in a church or oratory to implore divine assistance for the whole year.',
    grantReference: 'Enchiridion Indulgentiarum, Conc. 26 §1, 1°',
    suffrageNote: 'Plenary Indulgence under the three usual conditions.'
  },
  {
    id: 'fridays-of-lent-en-ego',
    dateLabel: 'Fridays of Lent & Good Friday',
    feastOrOccasion: 'Prayer Before the Crucified Christ & Solemn Adoration of the Cross',
    prescribedWork: 'On Fridays of Lent, devoutly recite "Look down upon me, good and gentle Jesus" (En ego, O bone et dulcissime Iesu) after Communion before an image of Christ Crucified; on Good Friday, attend the liturgical Adoration of the Cross.',
    grantReference: 'Enchiridion Indulgentiarum, Conc. 8 §1 & Conc. 13, 1°',
    suffrageNote: 'Plenary Indulgence on each Friday of Lent and on Good Friday.'
  },
  {
    id: 'corpus-christi-sacred-heart',
    dateLabel: 'Corpus Christi & Solemnity of the Sacred Heart',
    feastOrOccasion: 'Eucharistic Procession & Act of Reparation (Iesu dulcissime)',
    prescribedWork: 'Take part in the solemn Eucharistic procession on Corpus Christi, or publicly recite the Act of Reparation ("Most Sweet Jesus") on the Solemnity of the Most Sacred Heart of Jesus.',
    grantReference: 'Enchiridion Indulgentiarum, Conc. 7 §1, 3° & Conc. 3',
    suffrageNote: 'Plenary Indulgence applicable to oneself or the Holy Souls.'
  }
];

const CEBU_RELIC_VISITS: CebuRelicVisit[] = [
  {
    id: 'st-therese-lahug',
    saintName: 'St. Thérèse of the Child Jesus & the Holy Face (Doctor of the Church)',
    relicClass: 'First-Class Relic (Ex Ossibus)',
    shrineOrParish: 'Archdiocesan Shrine of St. Thérèse of the Child Jesus',
    locationDistrict: 'Gorordo Ave., Lahug, Cebu City',
    dateRange: 'Year-Round Enshrinement & Monthly 1st Friday Veneration',
    venerationSchedule: 'Daily after the 6:30 AM, 12:15 PM, and 5:30 PM Holy Masses',
    spiritualFruits: 'Special graces for missionaries, priests, and learning the "Little Way" of spiritual childhood.',
    status: 'Enshrined / Ongoing Veneration'
  },
  {
    id: 'st-padre-pio-mandani',
    saintName: 'St. Pio of Pietrelcina (Padre Pio — Stigmatist & Confessor)',
    relicClass: 'First-Class Relic (Ex Indumentis with Blood from the Stigmata)',
    shrineOrParish: 'Archdiocesan Shrine of St. Padre Pio & Cebu Metropolitan Cathedral Pilgrim Stop',
    locationDistrict: 'Mandaue / Cebu City',
    dateRange: 'October 28 – November 12, 2026 (All Saints & All Souls Pilgrim Veneration)',
    venerationSchedule: 'Exposition from 8:00 AM to 7:00 PM; Healing Mass & Blessing with the Relic at 5:30 PM',
    spiritualFruits: 'Intercession for the sick, grace of a sincere Sacramental Confession, and relief for the Holy Souls in Purgatory.',
    status: 'Upcoming Archdiocesan Visit'
  },
  {
    id: 'st-pedro-calungsod-shrine',
    saintName: 'St. Pedro Calungsod (Visayan Martyr & Catechist) & Relics of the Apostles',
    relicClass: 'First-Class Relics of the Saints & Martyrs',
    shrineOrParish: 'Archdiocesan Shrine of St. Pedro Calungsod & Archbishop’s Palace Compound',
    locationDistrict: 'D. Jakosalem St., Ranudo, Cebu City',
    dateRange: 'Solemn Veneration during the Triduum of All Saints (Oct 29 – Nov 1, 2026)',
    venerationSchedule: '9:00 AM – 6:00 PM Daily; Solemn Vigil of All Hallows’ Eve at 6:00 PM on Oct 31',
    spiritualFruits: 'Courage in professing the Catholic Faith, purity of youth, and fidelity to catechetical mission.',
    status: 'Pilgrimage Jubilee Site'
  },
  {
    id: 'bl-carlo-acutis-cebu',
    saintName: 'St. Carlo Acutis (Apostle of the Eucharist & Patron of Youth)',
    relicClass: 'First-Class Relic (Ex Capillis & Pericardium Pilgrim Reliquary)',
    shrineOrParish: 'Basilica Minore del Santo Niño de Cebu & Cebu Youth Apostolate',
    locationDistrict: 'Osmeña Blvd., Cebu City',
    dateRange: 'November 14 – November 22, 2026 (Leading to Christ the King & World Youth Day)',
    venerationSchedule: 'Veneration alongside the Vatican International Exhibition of Eucharistic Miracles',
    spiritualFruits: 'Fervent love for Daily Mass, Eucharistic Adoration ("My highway to Heaven"), and frequent Confession.',
    status: 'Upcoming Archdiocesan Visit'
  }
];

const VATICAN_RECOMMENDED_EVENTS: VaticanEventItem[] = [
  {
    id: 'all-saints-all-souls-plenary',
    title: 'Solemnity of All Saints & Octave of Suffrage for All Souls in Purgatory',
    dateLabel: 'November 1 – November 8, 2026',
    dicasteryOrSource: 'Apostolic Penitentiary · Enchiridion Indulgentiarum (Norm 29)',
    summary: 'The Holy See warmly exhorts all the faithful to gain the Plenary Indulgence applicable exclusively to the Holy Souls in Purgatory each day from November 1 to 8 by devoutly visiting a cemetery and praying for the departed.',
    indulgenceOrGrace: 'Plenary Indulgence Daily (Nov 1–8) for the Holy Souls in Purgatory',
    recommendedAction: 'Go to Sacramental Confession, receive Holy Communion, pray for the Pope’s intentions, and visit a cemetery or church on Nov 2.'
  },
  {
    id: 'lateran-basilica-dedication',
    title: 'Feast of the Dedication of the Archbasilica of St. John Lateran',
    dateLabel: 'November 9, 2026',
    dicasteryOrSource: 'Diocese of Rome · Mother and Head of All Churches of the City and the World',
    summary: 'Celebrates the Cathedral of the Bishop of Rome (Omnium Urbis et Orbis Ecclesiarum Mater et Caput) as a visible sign of unity and communion with the Successor of St. Peter.',
    indulgenceOrGrace: 'Plenary Indulgence for pious visit to one’s Cathedral or Basilica reciting Our Father & Creed',
    recommendedAction: 'Pray the Creed and Our Father for the Supreme Pontiff and visit the Cebu Metropolitan Cathedral.'
  },
  {
    id: 'world-day-of-the-poor',
    title: 'X World Day of the Poor — "The Prayer of the Poor Rises Up to God" (cf. Sir 21:5)',
    dateLabel: 'Sunday, November 15, 2026 (33rd Sunday in Ordinary Time)',
    dicasteryOrSource: 'Dicastery for Evangelization · Vatican City',
    summary: 'Instituted by the Holy Father to call every parish and Catholic household to encounter Christ directly in the poor, the sick, the lonely, and the marginalized through concrete Corporal Works of Mercy.',
    indulgenceOrGrace: 'Partial Indulgence for every work of Christian charity and mercy (Conc. 11)',
    recommendedAction: 'Share a meal, offer alms, or visit the elderly and indigent in your parish community.'
  },
  {
    id: 'christ-the-king-wyd',
    title: 'Solemnity of Christ the King & XLI Diocesan World Youth Day',
    dateLabel: 'Sunday, November 22, 2026',
    dicasteryOrSource: 'Dicastery for Laity, Family and Life · Apostolic Penitentiary',
    summary: 'Marks the crowning Sunday of the Liturgical Year. The Vatican invites all parishes to hold a solemn Eucharistic Procession and publicly recite the Act of Consecration of the Human Race to Jesus Christ the King.',
    indulgenceOrGrace: 'Plenary Indulgence for public recitation of the Act of Consecration (Iesu dulcissime, Redemptor)',
    recommendedAction: 'Join the Archdiocesan Christ the King Eucharistic Procession and pray the Act of Consecration.'
  }
];

const NOVENA_REMINDERS: NovenaReminderItem[] = [
  {
    id: 'novena-st-jude',
    title: 'Solemn Novena to Ss. Simon and Jude, Apostles',
    feastDateLabel: 'Feast: October 28',
    startMonthDay: '10-19',
    endMonthDay: '10-27',
    patronage: 'Patron of Desperate Cases, Impossible Causes & Apostolic Zeal',
    dailyPrayerSnippet: 'Most holy Apostle, St. Jude, faithful servant and friend of Jesus, the Church honors and invokes you universally as the patron of difficult things...'
  },
  {
    id: 'novena-all-saints',
    title: 'Novena in Preparation for the Solemnity of All Saints',
    feastDateLabel: 'Solemnity: November 1',
    startMonthDay: '10-23',
    endMonthDay: '10-31',
    patronage: 'Communion of Saints & Universal Call to Holiness',
    dailyPrayerSnippet: 'O God, Source of all holiness, grant that through the intercession of the glorious cloud of witnesses in Heaven, we may run with perseverance the race set before us...'
  },
  {
    id: 'novena-holy-souls',
    title: 'Nine-Day Suffrage Novena for the Holy Souls in Purgatory',
    feastDateLabel: 'All Souls & Octave: Oct 24 – Nov 8',
    startMonthDay: '10-24',
    endMonthDay: '11-08',
    patronage: 'Release of the Faithful Departed into Beatific Vision',
    dailyPrayerSnippet: 'Out of the depths I have cried to Thee, O Lord; Lord, hear my voice. Eternal rest grant unto them, O Lord, and let perpetual light shine upon them...'
  },
  {
    id: 'novena-christ-the-king',
    title: 'Novena to Our Lord Jesus Christ, King of the Universe',
    feastDateLabel: 'Solemnity: November 22',
    startMonthDay: '11-13',
    endMonthDay: '11-21',
    patronage: 'Social Reign of Christ the King over Families & Nations',
    dailyPrayerSnippet: 'O Lord our God, You alone are the Most Holy King and Ruler of all nations. We pray to You, Lord, in the great expectation of receiving from You peace and holiness...'
  },
  {
    id: 'novena-immaculate-conception',
    title: 'Solemn Novena to the Immaculate Conception (Principal Patroness of the Philippines)',
    feastDateLabel: 'Solemnity: December 8',
    startMonthDay: '11-29',
    endMonthDay: '12-07',
    patronage: 'Purity of Soul, Protection of the Philippines & the Universal Church',
    dailyPrayerSnippet: 'Tota pulchra es, Maria, et macula originalis non est in te. O Mary, conceived without sin, pray for us who have recourse to thee!'
  },
  {
    id: 'novena-sto-nino-perpetual',
    title: 'Perpetual Friday Novena to Señor Santo Niño de Cebu',
    feastDateLabel: 'Every Friday · Fiesta Señor: Jan 8–16',
    startMonthDay: '01-01',
    endMonthDay: '12-31',
    patronage: 'Protection of Cebu, Christian Families & Childlike Trust in Divine Providence',
    dailyPrayerSnippet: 'O sweet Jesus, Santo Niño, Source of all consolation, look with compassion upon our petitions and grant us the grace of a humble and contrite heart. Pit Señor!'
  }
];

export const PersonalPietyDashboard: React.FC<PersonalPietyDashboardProps> = ({
  currentDateStr,
  onOpenCebuParishes,
  onOpenAngelus,
  onOpenAdoration
}) => {
  const [activeSection, setActiveSection] = useState<'all' | 'checklist' | 'collective' | 'precepts' | 'ecclesial'>('all');
  const [selectedProfile, setSelectedProfile] = useState<RegimenProfileId>(() => {
    try {
      return (localStorage.getItem('sanctum_piety_profile_v2') as RegimenProfileId) || 'standard';
    } catch {
      return 'standard';
    }
  });
  const [adaptForInfirm, setAdaptForInfirm] = useState<boolean>(() => {
    try {
      return localStorage.getItem('sanctum_piety_infirm_v2') === 'true';
    } catch {
      return false;
    }
  });
  const [isCustomizingChecklist, setIsCustomizingChecklist] = useState(false);

  // Enabled item IDs per user customization
  const [enabledItemIds, setEnabledItemIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sanctum_piety_enabled_items_v2');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_PIETY_ITEMS.filter((item) => item.profiles.includes('standard')).map((i) => i.id);
  });

  // Custom user-added prayers/activities
  const [customItems, setCustomItems] = useState<PietyChecklistItem[]>(() => {
    try {
      const saved = localStorage.getItem('sanctum_piety_custom_items_v2');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [];
  });

  // Completed items keyed by date string
  const [completedByDate, setCompletedByDate] = useState<Record<string, string[]>>(() => {
    try {
      const saved = localStorage.getItem('sanctum_piety_completed_by_date_v2');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {};
  });

  // Indulgence Collective: Usual Conditions & Suffrage Ledger
  const [usualConditions, setUsualConditions] = useState<{
    detachmentFromSin: boolean;
    sacramentalConfession: boolean;
    eucharisticCommunion: boolean;
    papalIntentionPrayer: boolean;
  }>(() => {
    try {
      const saved = localStorage.getItem(`sanctum_indulgence_conditions_${currentDateStr}`);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return {
      detachmentFromSin: true,
      sacramentalConfession: false,
      eucharisticCommunion: false,
      papalIntentionPrayer: false
    };
  });

  const [suffrageIntention, setSuffrageIntention] = useState<string>(() => {
    try {
      return localStorage.getItem('sanctum_suffrage_intention_v1') || 'Most Abandoned Souls in Purgatory';
    } catch {
      return 'Most Abandoned Souls in Purgatory';
    }
  });

  const [personalIndulgencesOffered, setPersonalIndulgencesOffered] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('sanctum_personal_indulgences_count_v1');
      return saved ? parseInt(saved, 10) : 14;
    } catch {
      return 14;
    }
  });

  const [offeredTodayToast, setOfferedTodayToast] = useState<string | null>(null);

  // Precepts of the Church State
  const [sundayMassStatus, setSundayMassStatus] = useState<'committed' | 'attended' | 'dispensed'>(() => {
    try {
      return (localStorage.getItem('sanctum_precept_sunday_v2') as 'committed' | 'attended' | 'dispensed') || 'committed';
    } catch {
      return 'committed';
    }
  });

  const [lastConfessionDate, setLastConfessionDate] = useState<string>(() => {
    try {
      return localStorage.getItem('sanctum_precept_confession_date_v2') || '2026-10-15';
    } catch {
      return '2026-10-15';
    }
  });

  const [fridayPenanceChoice, setFridayPenanceChoice] = useState<
    'abstinence' | 'mercy_substitution' | 'rosary_stations_substitution' | 'fasting_alms_substitution'
  >(() => {
    try {
      return (
        (localStorage.getItem('sanctum_precept_friday_choice_v2') as
          | 'abstinence'
          | 'mercy_substitution'
          | 'rosary_stations_substitution'
          | 'fasting_alms_substitution') || 'abstinence'
      );
    } catch {
      return 'abstinence';
    }
  });

  const [fridayFulfilledThisWeek, setFridayFulfilledThisWeek] = useState<boolean>(() => {
    try {
      return localStorage.getItem('sanctum_precept_friday_done_v2') === 'true';
    } catch {
      return false;
    }
  });

  // New Custom Item Form State
  const [newItemTitle, setNewItemTitle] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<PietyCategory>('Marian & Devotional');
  const [newItemDuration, setNewItemDuration] = useState(5);
  const [newItemIndulgence, setNewItemIndulgence] = useState<'Plenary Indulgence' | 'Partial Indulgence' | 'Sanctifying Merit'>('Partial Indulgence');

  // Persist states
  useEffect(() => {
    try {
      localStorage.setItem('sanctum_piety_profile_v2', selectedProfile);
    } catch {
      // ignore
    }
  }, [selectedProfile]);

  useEffect(() => {
    try {
      localStorage.setItem('sanctum_piety_infirm_v2', String(adaptForInfirm));
    } catch {
      // ignore
    }
  }, [adaptForInfirm]);

  useEffect(() => {
    try {
      localStorage.setItem('sanctum_piety_enabled_items_v2', JSON.stringify(enabledItemIds));
    } catch {
      // ignore
    }
  }, [enabledItemIds]);

  useEffect(() => {
    try {
      localStorage.setItem('sanctum_piety_custom_items_v2', JSON.stringify(customItems));
    } catch {
      // ignore
    }
  }, [customItems]);

  useEffect(() => {
    try {
      localStorage.setItem('sanctum_piety_completed_by_date_v2', JSON.stringify(completedByDate));
    } catch {
      // ignore
    }
  }, [completedByDate]);

  useEffect(() => {
    try {
      localStorage.setItem(`sanctum_indulgence_conditions_${currentDateStr}`, JSON.stringify(usualConditions));
    } catch {
      // ignore
    }
  }, [usualConditions, currentDateStr]);

  const allItems = useMemo(() => [...DEFAULT_PIETY_ITEMS, ...customItems], [customItems]);
  const activeRegimenItems = useMemo(
    () => allItems.filter((item) => enabledItemIds.includes(item.id)),
    [allItems, enabledItemIds]
  );

  const completedToday = completedByDate[currentDateStr] || [];
  const completedActiveCount = activeRegimenItems.filter((item) => completedToday.includes(item.id)).length;
  const progressPercent =
    activeRegimenItems.length > 0 ? Math.round((completedActiveCount / activeRegimenItems.length) * 100) : 0;

  const totalRegimenMinutes = useMemo(
    () => activeRegimenItems.reduce((acc, item) => acc + item.durationMinutes, 0),
    [activeRegimenItems]
  );

  const completedPartialIndulgencesCount = useMemo(
    () =>
      activeRegimenItems.filter(
        (item) => completedToday.includes(item.id) && item.indulgenceType === 'Partial Indulgence'
      ).length,
    [activeRegimenItems, completedToday]
  );

  const completedPlenaryWorksCount = useMemo(
    () =>
      activeRegimenItems.filter(
        (item) => completedToday.includes(item.id) && item.indulgenceType === 'Plenary Indulgence'
      ).length,
    [activeRegimenItems, completedToday]
  );

  const allConditionsMet =
    usualConditions.detachmentFromSin &&
    usualConditions.sacramentalConfession &&
    usualConditions.eucharisticCommunion &&
    usualConditions.papalIntentionPrayer;

  const handleSelectProfile = (profileId: RegimenProfileId) => {
    setSelectedProfile(profileId);
    if (profileId === 'infirm') {
      setAdaptForInfirm(true);
    }
    const defaultForProfile = DEFAULT_PIETY_ITEMS.filter((item) => item.profiles.includes(profileId)).map((i) => i.id);
    const customIds = customItems.map((c) => c.id);
    setEnabledItemIds([...defaultForProfile, ...customIds]);
  };

  const handleToggleCompleted = (itemId: string) => {
    setCompletedByDate((prev) => {
      const currentList = prev[currentDateStr] || [];
      const exists = currentList.includes(itemId);
      const nextList = exists ? currentList.filter((id) => id !== itemId) : [...currentList, itemId];
      return {
        ...prev,
        [currentDateStr]: nextList
      };
    });
  };

  const handleToggleEnabledItem = (itemId: string) => {
    setEnabledItemIds((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const handleAddCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newItemTitle.trim();
    if (!trimmed) return;
    const newItem: PietyChecklistItem = {
      id: `custom-${Date.now()}`,
      title: trimmed,
      category: newItemCategory,
      durationMinutes: Math.max(1, Number(newItemDuration) || 5),
      physicalNote: 'Personal devotion according to one’s state in life',
      infirmAdaptation: 'May be prayed quietly from bed or seated, uniting one’s heart with Our Lord',
      indulgenceType: newItemIndulgence,
      description: 'Custom personal devotion added to your daily rule of life.',
      profiles: ['standard', 'busy', 'contemplative', 'infirm'],
      isCustom: true
    };
    setCustomItems((prev) => [...prev, newItem]);
    setEnabledItemIds((prev) => [...prev, newItem.id]);
    setNewItemTitle('');
  };

  const handleDeleteCustomItem = (itemId: string) => {
    setCustomItems((prev) => prev.filter((i) => i.id !== itemId));
    setEnabledItemIds((prev) => prev.filter((id) => id !== itemId));
  };

  const handleOfferIndulgenceForSouls = () => {
    const nextCount = personalIndulgencesOffered + 1;
    setPersonalIndulgencesOffered(nextCount);
    try {
      localStorage.setItem('sanctum_personal_indulgences_count_v1', String(nextCount));
    } catch {
      // ignore
    }
    setOfferedTodayToast(
      `Offered by way of suffrage for: ${suffrageIntention}. "Requiem aeternam dona eis, Domine."`
    );
    setTimeout(() => setOfferedTodayToast(null), 5000);
  };

  // Calculate Confession status
  const daysSinceConfession = useMemo(() => {
    const current = new Date(currentDateStr + 'T12:00:00Z');
    const last = new Date(lastConfessionDate + 'T12:00:00Z');
    const diffMs = current.getTime() - last.getTime();
    return Math.max(0, Math.floor(diffMs / (1000 * 60 * 60 * 24)));
  }, [currentDateStr, lastConfessionDate]);

  // Calculate Novena Day status dynamically from currentDateStr
  const computedNovenas = useMemo(() => {
    const [, monthStr, dayStr] = currentDateStr.split('-');
    const currentVal = parseInt(monthStr, 10) * 100 + parseInt(dayStr, 10);
    const dayOfWeek = new Date(currentDateStr + 'T12:00:00Z').getUTCDay(); // 5 = Friday

    return NOVENA_REMINDERS.map((nov) => {
      if (nov.id === 'novena-sto-nino-perpetual') {
        return {
          ...nov,
          statusLabel: dayOfWeek === 5 ? 'Friday Novena Day Today' : 'Ongoing Perpetual Friday Novena',
          isOngoing: true,
          dayBadge: dayOfWeek === 5 ? 'Friday Devotion' : 'Every Friday'
        };
      }
      const [sM, sD] = nov.startMonthDay.split('-').map(Number);
      const [eM, eD] = nov.endMonthDay.split('-').map(Number);
      const startVal = sM * 100 + sD;
      const endVal = eM * 100 + eD;

      if (currentVal >= startVal && currentVal <= endVal) {
        const currentDateObj = new Date(currentDateStr + 'T12:00:00Z');
        const startDateObj = new Date(`${currentDateStr.split('-')[0]}-${nov.startMonthDay}T12:00:00Z`);
        const dayNum = Math.min(9, Math.max(1, Math.floor((currentDateObj.getTime() - startDateObj.getTime()) / 86400000) + 1));
        return {
          ...nov,
          statusLabel: `Ongoing · Day ${dayNum} of 9`,
          isOngoing: true,
          dayBadge: `Day ${dayNum} of 9`
        };
      }
      return {
        ...nov,
        statusLabel: `Upcoming (${nov.startMonthDay} to ${nov.endMonthDay})`,
        isOngoing: false,
        dayBadge: 'Upcoming'
      };
    });
  }, [currentDateStr]);

  const formattedCurrentDate = useMemo(() => {
    return new Date(currentDateStr + 'T12:00:00Z').toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }, [currentDateStr]);

  const categories: PietyCategory[] = [
    'Morning & Liturgical Hours',
    'Sacramental & Eucharistic',
    'Marian & Devotional',
    'Scripture & Spiritual Reading',
    'Night Examination',
    'Corporal & Spiritual Works of Mercy'
  ];

  return (
    <section
      id="personal-piety-dashboard"
      aria-label="Daily Checklist of Prayers and Spiritual Activities"
      className="w-full rounded-2xl bg-[#FAF6EE] text-[#261A10] border border-[#D8C8AC] shadow-[0_16px_48px_rgba(38,26,16,0.28)] overflow-hidden"
    >
      {/* Top Warm Alabaster Editorial Banner */}
      <div className="bg-gradient-to-b from-[#FDFBF7] to-[#F4EFE4] border-b border-[#E2D5BE] px-5 sm:px-8 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="space-y-2.5 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-cinzel font-bold uppercase tracking-[0.2em] text-[#8C6226]">
              <span>Daily Checklist</span>
              <span aria-hidden="true">·</span>
              <span>Customizable Rule of Life</span>
              <span aria-hidden="true">·</span>
              <span>{formattedCurrentDate}</span>
            </div>

            <h2
              className="font-cinzel text-2xl sm:text-3xl font-bold text-[#23170D] tracking-wide leading-tight"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Daily Checklist of Prayers &amp; Spiritual Activities
            </h2>

            <p className="font-serif text-sm sm:text-base text-[#4E3B2B] leading-relaxed">
              Essential daily prayers and spiritual activities—all customizable to each individual Catholic, his state in life, available time, and daily physical circumstances. Includes the indulgenced prayers, spiritual works, and liturgical calendar recommended by{' '}
              <span className="font-semibold text-[#23170D]">The Indulgence Collective</span>, gratefully attributed here for content that is deeply fruitful for souls not only in this world, but also for the Holy Souls in Purgatory.
            </p>
          </div>

          {/* Right Summary Card: Daily Progress & Collective Suffrage Counter */}
          <div className="w-full lg:w-80 shrink-0 rounded-xl bg-white border border-[#DED0B6] p-4 sm:p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-[#7A5420]">
                Today’s Spiritual Bouquet
              </span>
              <span className="font-serif text-xs font-bold text-[#2E5A36]">
                {completedActiveCount} / {activeRegimenItems.length} Completed ({progressPercent}%)
              </span>
            </div>

            {/* Warm Gold Progress Bar */}
            <div className="w-full h-2.5 rounded-full bg-[#EFE8DA] overflow-hidden border border-[#DFD2BA]">
              <div
                className="h-full bg-gradient-to-r from-[#B8860B] via-[#C89B2B] to-[#8C6226] transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="pt-1 flex items-center justify-between text-xs font-serif text-[#5C4633]">
              <span>
                Plenary Works: <strong className="text-[#23170D]">{completedPlenaryWorksCount}</strong>
              </span>
              <span aria-hidden="true">·</span>
              <span>
                Partial Grants: <strong className="text-[#23170D]">{completedPartialIndulgencesCount}</strong>
              </span>
              <span aria-hidden="true">·</span>
              <span>
                Suffrages: <strong className="text-[#7A2021]">{personalIndulgencesOffered}</strong>
              </span>
            </div>

            <button
              type="button"
              onClick={handleOfferIndulgenceForSouls}
              className="w-full py-2 px-3 rounded-lg bg-[#2C1E14] hover:bg-[#3F2B1D] text-[#FAF6EE] font-cinzel text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
            >
              <Flame className="w-3.5 h-3.5 text-[#E5B85B]" />
              <span>Offer Today’s Suffrage for Holy Souls</span>
            </button>

            {offeredTodayToast && (
              <p className="text-xs font-serif italic text-[#2E5A36] bg-[#EDF5EE] border border-[#BBD6BF] rounded-lg px-2.5 py-1.5">
                {offeredTodayToast}
              </p>
            )}
          </div>
        </div>

        {/* Light Editorial Section Switcher */}
        <div className="mt-6 pt-5 border-t border-[#E5DAC3] flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: 'Complete Daily Checklist', icon: Sparkles },
              { id: 'checklist', label: 'I. Customizable Prayers & Activities', icon: CheckCircle2 },
              { id: 'collective', label: 'II. Sacred Indulgences & Calendar', icon: Award },
              { id: 'precepts', label: 'III. Precepts (Mass · Confession · Friday)', icon: ShieldCheck },
              { id: 'ecclesial', label: 'IV. Novenas · Cebu Relics · Vatican', icon: Globe }
            ].map((tab) => {
              const Icon = tab.icon;
              const isSelected = activeSection === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveSection(tab.id as typeof activeSection)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-serif font-semibold transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-[#2C1E14] text-[#FAF6EE] border-[#2C1E14] shadow-xs'
                      : 'bg-white hover:bg-[#F3ECE0] text-[#3D2B1F] border-[#D8C8AC]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-[#E5B85B]' : 'text-[#8C6226]'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Sanctuary Triggers */}
          <div className="flex flex-wrap items-center gap-2">
            {onOpenAngelus && (
              <button
                type="button"
                onClick={onOpenAngelus}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFFDF9] hover:bg-[#F3ECE0] border border-[#D8C8AC] text-[#3D2B1F] text-xs font-serif font-semibold cursor-pointer transition-colors"
              >
                <Bell className="w-3.5 h-3.5 text-[#8C6226]" />
                <span>Pray Angelus</span>
              </button>
            )}
            {onOpenAdoration && (
              <button
                type="button"
                onClick={onOpenAdoration}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFFDF9] hover:bg-[#F3ECE0] border border-[#D8C8AC] text-[#3D2B1F] text-xs font-serif font-semibold cursor-pointer transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#8C6226]" />
                <span>Eucharistic Adoration</span>
              </button>
            )}
            {onOpenCebuParishes && (
              <button
                type="button"
                onClick={onOpenCebuParishes}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FFFDF9] hover:bg-[#F3ECE0] border border-[#D8C8AC] text-[#3D2B1F] text-xs font-serif font-semibold cursor-pointer transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-[#7A2021]" />
                <span>Cebu Parishes &amp; Confession</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Dashboard Body on Warm Alabaster Canvas */}
      <div className="p-5 sm:p-8 space-y-10">
        {/* =====================================================================
            SECTION I: CUSTOMIZABLE DAILY REGIMEN OF PERSONAL PIETY CHECKLIST
           ===================================================================== */}
        {(activeSection === 'all' || activeSection === 'checklist') && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-3 border-b border-[#E2D5BE]">
              <div>
                <span className="font-cinzel text-xs font-bold uppercase tracking-[0.2em] text-[#8C6226]">
                  Section I · Customizable Rule of Life
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#23170D] mt-1">
                  Daily Checklist of Prayers &amp; Religious Activities
                </h3>
                <p className="font-serif text-sm text-[#5A4432] mt-1">
                  Tailored to your daily schedule, state in life, and physical condition. Estimated time for active rule:{' '}
                  <strong className="text-[#23170D]">{totalRegimenMinutes} minutes</strong>.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setAdaptForInfirm((prev) => !prev)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-serif font-semibold border transition-colors cursor-pointer ${
                    adaptForInfirm
                      ? 'bg-[#7A2021] text-white border-[#7A2021]'
                      : 'bg-white hover:bg-[#F3ECE0] text-[#3D2B1F] border-[#D8C8AC]'
                  }`}
                  title="Show Norm 24 adaptations for illness, advanced age, or physical exhaustion"
                >
                  <Heart className={`w-4 h-4 ${adaptForInfirm ? 'text-amber-200' : 'text-[#7A2021]'}`} />
                  <span>
                    {adaptForInfirm ? 'Physical Illness / Homebound Mode: ON' : 'Adapt for Illness / Physical Condition'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsCustomizingChecklist((prev) => !prev)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-serif font-semibold border transition-colors cursor-pointer ${
                    isCustomizingChecklist
                      ? 'bg-[#2C1E14] text-white border-[#2C1E14]'
                      : 'bg-white hover:bg-[#F3ECE0] text-[#3D2B1F] border-[#D8C8AC]'
                  }`}
                >
                  <Sliders className="w-4 h-4 text-[#8C6226]" />
                  <span>{isCustomizingChecklist ? 'Done Customizing Checklist' : 'Customize Prayers & Add Custom'}</span>
                </button>
              </div>
            </div>

            {/* 4 State-of-Life & Physical Condition Presets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              {(Object.keys(PROFILE_METADATA) as RegimenProfileId[]).map((profId) => {
                const meta = PROFILE_METADATA[profId];
                const isSelected = selectedProfile === profId;
                return (
                  <button
                    key={profId}
                    type="button"
                    onClick={() => handleSelectProfile(profId)}
                    className={`text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#FFFDF9] border-2 border-[#8C6226] shadow-[0_6px_20px_rgba(140,98,38,0.12)]'
                        : 'bg-white hover:bg-[#FDFBF7] border-[#E2D5BE]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 text-xs font-cinzel font-bold uppercase tracking-wider text-[#8C6226]">
                        <span>{meta.badge}</span>
                        <span>{meta.estTime}</span>
                      </div>
                      <h4 className="font-cinzel text-base font-bold text-[#23170D] mt-1.5">
                        {meta.label}
                      </h4>
                      <p className="font-serif text-xs text-[#5A4432] mt-1 leading-relaxed">
                        {meta.subtitle}
                      </p>
                    </div>
                    <div className="mt-3 pt-2 border-t border-[#EFE8DA] flex items-center justify-between text-xs font-serif font-semibold text-[#3D2B1F]">
                      <span>{isSelected ? 'Active Rule Profile' : 'Apply This Profile'}</span>
                      {isSelected && <Check className="w-4 h-4 text-[#2E5A36]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Customization Drawer: Toggle any prayer or add a new custom prayer/activity */}
            {isCustomizingChecklist && (
              <div className="rounded-xl bg-[#FDFBF7] border border-[#D8C8AC] p-5 space-y-5 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E5DAC3] pb-3">
                  <div>
                    <h4 className="font-cinzel text-base font-bold text-[#23170D]">
                      Customize Your Personal Checklist &amp; Add Custom Devotions
                    </h4>
                    <p className="font-serif text-xs sm:text-sm text-[#5A4432]">
                      Check or uncheck any prayer or religious activity below to include it in your daily regimen, or add your own custom devotion.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEnabledItemIds(allItems.map((i) => i.id))}
                    className="self-start sm:self-auto px-3 py-1.5 rounded-lg bg-white hover:bg-[#F3ECE0] border border-[#D8C8AC] text-xs font-serif font-semibold text-[#3D2B1F] cursor-pointer"
                  >
                    Enable All ({allItems.length})
                  </button>
                </div>

                {/* Add Custom Prayer / Activity Form */}
                <form onSubmit={handleAddCustomItem} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
                  <div className="sm:col-span-5">
                    <label className="block font-serif text-xs font-semibold text-[#4E3B2B] mb-1">
                      Custom Prayer or Religious Activity Title
                    </label>
                    <input
                      type="text"
                      value={newItemTitle}
                      onChange={(e) => setNewItemTitle(e.target.value)}
                      placeholder="e.g., Litany of Humility, Seven Sorrows Rosary, Parish Choir..."
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#D8C8AC] text-sm font-serif text-[#23170D] focus:outline-none focus:border-[#8C6226]"
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className="block font-serif text-xs font-semibold text-[#4E3B2B] mb-1">
                      Category
                    </label>
                    <select
                      value={newItemCategory}
                      onChange={(e) => setNewItemCategory(e.target.value as PietyCategory)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#D8C8AC] text-sm font-serif text-[#23170D] focus:outline-none focus:border-[#8C6226]"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-serif text-xs font-semibold text-[#4E3B2B] mb-1">
                      Minutes
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={180}
                      value={newItemDuration}
                      onChange={(e) => setNewItemDuration(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#D8C8AC] text-sm font-serif text-[#23170D] focus:outline-none focus:border-[#8C6226]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="w-full py-2 px-3 rounded-lg bg-[#2C1E14] hover:bg-[#3F2B1D] text-white font-cinzel text-xs font-bold uppercase tracking-wider cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Plus className="w-4 h-4 text-[#E5B85B]" />
                      <span>Add Item</span>
                    </button>
                  </div>
                </form>

                {/* Quick Toggle Grid of All Items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-2">
                  {allItems.map((item) => {
                    const isEnabled = enabledItemIds.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        className={`flex items-center justify-between gap-2 px-3 py-2 rounded-lg border text-xs font-serif ${
                          isEnabled
                            ? 'bg-white border-[#8C6226] text-[#23170D] font-semibold'
                            : 'bg-[#F4EFE4]/60 border-[#E2D5BE] text-[#6E5641]'
                        }`}
                      >
                        <label className="flex items-center gap-2 cursor-pointer flex-1 min-w-0">
                          <input
                            type="checkbox"
                            checked={isEnabled}
                            onChange={() => handleToggleEnabledItem(item.id)}
                            className="accent-[#8C6226] w-3.5 h-3.5 cursor-pointer"
                          />
                          <span className="truncate">{item.title}</span>
                        </label>
                        {item.isCustom && (
                          <button
                            type="button"
                            onClick={() => handleDeleteCustomItem(item.id)}
                            className="text-[#7A2021] hover:text-red-700 p-1 cursor-pointer"
                            title="Delete custom item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Categorized Checklist Cards on Light Ivory/White Surfaces */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {categories.map((category) => {
                const itemsInCategory = activeRegimenItems.filter((i) => i.category === category);
                if (itemsInCategory.length === 0) return null;

                return (
                  <div
                    key={category}
                    className="rounded-xl bg-white border border-[#E2D5BE] p-5 shadow-[0_2px_12px_rgba(60,40,20,0.04)] space-y-3.5"
                  >
                    <div className="flex items-center justify-between border-b border-[#EFE8DA] pb-2.5">
                      <h4 className="font-cinzel text-sm sm:text-base font-bold text-[#23170D] tracking-wide">
                        {category}
                      </h4>
                      <span className="font-serif text-xs text-[#6E5641]">
                        {itemsInCategory.filter((i) => completedToday.includes(i.id)).length} / {itemsInCategory.length} Done
                      </span>
                    </div>

                    <div className="space-y-3">
                      {itemsInCategory.map((item) => {
                        const isDone = completedToday.includes(item.id);
                        return (
                          <div
                            key={item.id}
                            onClick={() => handleToggleCompleted(item.id)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleToggleCompleted(item.id);
                              }
                            }}
                            className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none ${
                              isDone
                                ? 'bg-[#F4F8F4] border-[#9BC4A2]'
                                : 'bg-[#FFFDF9] hover:bg-[#FAF5EB] border-[#E6DEC8]'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className="mt-0.5 shrink-0">
                                {isDone ? (
                                  <CheckCircle2 className="w-5 h-5 text-[#2E5A36]" />
                                ) : (
                                  <Circle className="w-5 h-5 text-[#9C8265]" />
                                )}
                              </div>

                              <div className="flex-1 min-w-0 space-y-1">
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <span
                                    className={`font-serif text-sm sm:text-base font-bold leading-snug ${
                                      isDone ? 'line-through text-[#5A705E]' : 'text-[#23170D]'
                                    }`}
                                  >
                                    {item.title}
                                  </span>
                                </div>

                                {/* Clean typographic metadata row with middle dots */}
                                <div className="flex flex-wrap items-center gap-1.5 text-xs font-serif text-[#6E5641]">
                                  <span
                                    className={
                                      item.indulgenceType === 'Plenary Indulgence'
                                        ? 'font-bold text-[#7A2021]'
                                        : item.indulgenceType === 'Partial Indulgence'
                                        ? 'font-semibold text-[#8C6226]'
                                        : 'text-[#5A4432]'
                                    }
                                  >
                                    {item.indulgenceType}
                                  </span>
                                  <span aria-hidden="true">·</span>
                                  <span>{item.durationMinutes} min</span>
                                  {item.indulgenceGrantRef && (
                                    <>
                                      <span aria-hidden="true">·</span>
                                      <span className="italic">{item.indulgenceGrantRef}</span>
                                    </>
                                  )}
                                </div>

                                <p className="font-serif text-xs sm:text-sm text-[#4A3728] leading-relaxed pt-0.5">
                                  {item.description}
                                </p>

                                {/* Physical posture or Norm 24 Infirm Adaptation */}
                                <div
                                  className={`mt-2 px-3 py-1.5 rounded-lg text-xs font-serif ${
                                    adaptForInfirm
                                      ? 'bg-[#FDF4F4] border border-[#E5C2C2] text-[#6B1D1E]'
                                      : 'bg-[#F5EFE4] text-[#5C4633]'
                                  }`}
                                >
                                  {adaptForInfirm ? (
                                    <span>
                                      <strong>Norm 24 Adaptation (Sick / Homebound):</strong> {item.infirmAdaptation}
                                    </span>
                                  ) : (
                                    <span>
                                      <strong>Posture / Practice:</strong> {item.physicalNote}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* =====================================================================
            SECTION II: THE INDULGENCE COLLECTIVE — MANUAL OF INDULGENCES & CALENDAR
           ===================================================================== */}
        {(activeSection === 'all' || activeSection === 'collective') && (
          <div className="space-y-6 pt-2">
            <div className="pb-3 border-b border-[#E2D5BE] flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="font-cinzel text-xs font-bold uppercase tracking-[0.2em] text-[#7A2021]">
                  Section II · Enchiridion Indulgentiarum &amp; Suffrage Apostolate
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#23170D] mt-1">
                  Sacred Indulgences: Conditions, Everyday Grants &amp; Liturgical Calendar
                </h3>
                <p className="font-serif text-sm text-[#5A4432] mt-1">
                  "An indulgence is a remission before God of the temporal punishment due to sins whose guilt has already been forgiven." (CCC 1471 · Apostolic Constitution <em>Indulgentiarum Doctrina</em>)
                </p>
              </div>
            </div>

            {/* Row 1: The Three Usual Conditions Tracker + Collective Suffrage Ledger */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
              {/* Left 7 Cols: Norm 20 — The Three Usual Conditions */}
              <div className="lg:col-span-7 rounded-xl bg-white border border-[#E2D5BE] p-5 sm:p-6 space-y-4 shadow-[0_2px_12px_rgba(60,40,20,0.04)]">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#EFE8DA] pb-3">
                  <div>
                    <span className="font-cinzel text-[11px] font-bold uppercase tracking-widest text-[#8C6226]">
                      Norm 20 · Apostolic Penitentiary
                    </span>
                    <h4 className="font-cinzel text-base sm:text-lg font-bold text-[#23170D]">
                      Requirements to Gain a Plenary Indulgence Today
                    </h4>
                  </div>
                  <span
                    className={`font-serif text-xs font-bold px-2.5 py-1 rounded-md border ${
                      allConditionsMet
                        ? 'bg-[#EDF5EE] text-[#2E5A36] border-[#BBD6BF]'
                        : 'bg-[#FAF3E6] text-[#8C6226] border-[#E2CFA9]'
                    }`}
                  >
                    {allConditionsMet ? 'All Conditions Fulfilled Today' : 'Check Conditions as Fulfilled'}
                  </span>
                </div>

                <p className="font-serif text-xs sm:text-sm text-[#4A3728] leading-relaxed">
                  To gain a <strong>Plenary Indulgence</strong> (which may be gained once per day, applicable either to oneself or to the Holy Souls in Purgatory), the faithful must perform the indulgenced work and fulfill these four conditions:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      key: 'detachmentFromSin' as const,
                      title: '1. Detachment from All Sin',
                      desc: 'Interior disposition of complete detachment from all sin, even venial sin (if lacking, the indulgence becomes Partial).'
                    },
                    {
                      key: 'sacramentalConfession' as const,
                      title: '2. Sacramental Confession',
                      desc: 'Within ~20 days before or after the indulgenced work. One Sacramental Confession suffices for several Plenary Indulgences.'
                    },
                    {
                      key: 'eucharisticCommunion' as const,
                      title: '3. Eucharistic Communion',
                      desc: 'Receive Holy Communion in the state of grace on the day the indulgenced work is performed (one Communion per Plenary Indulgence).'
                    },
                    {
                      key: 'papalIntentionPrayer' as const,
                      title: '4. Prayer for the Pope’s Intentions',
                      desc: 'Recite one Our Father and one Hail Mary (or another prayer) for the intentions of the Supreme Pontiff.'
                    }
                  ].map((cond) => {
                    const isChecked = usualConditions[cond.key];
                    return (
                      <div
                        key={cond.key}
                        onClick={() =>
                          setUsualConditions((prev) => ({
                            ...prev,
                            [cond.key]: !prev[cond.key]
                          }))
                        }
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setUsualConditions((prev) => ({
                              ...prev,
                              [cond.key]: !prev[cond.key]
                            }));
                          }
                        }}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-[#F4F8F4] border-[#9BC4A2]'
                            : 'bg-[#FFFDF9] hover:bg-[#FAF5EB] border-[#E6DEC8]'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          {isChecked ? (
                            <CheckCircle2 className="w-4 h-4 text-[#2E5A36] shrink-0 mt-0.5" />
                          ) : (
                            <Circle className="w-4 h-4 text-[#9C8265] shrink-0 mt-0.5" />
                          )}
                          <div>
                            <h5 className="font-serif text-sm font-bold text-[#23170D]">{cond.title}</h5>
                            <p className="font-serif text-xs text-[#5A4432] mt-1 leading-relaxed">{cond.desc}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right 5 Cols: The Collective Mission for the Holy Souls in Purgatory */}
              <div className="lg:col-span-5 rounded-xl bg-[#FDF8EE] border border-[#DECBA8] p-5 sm:p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-cinzel text-[11px] font-bold uppercase tracking-widest text-[#7A2021]">
                      Per Modum Suffragii · CCC 1479
                    </span>
                    <Users className="w-4 h-4 text-[#8C6226]" />
                  </div>

                  <h4 className="font-cinzel text-base sm:text-lg font-bold text-[#23170D]">
                    The Collective Suffrage for the Holy Souls
                  </h4>

                  <p className="font-serif text-xs sm:text-sm text-[#4A3728] leading-relaxed">
                    Since the faithful departed in Purgatory are members of the same Communion of Saints, we can untie their bonds of temporal punishment by offering our Plenary and Partial Indulgences for them <em>by way of suffrage</em>.
                  </p>

                  <div className="pt-1">
                    <label className="block font-serif text-xs font-bold text-[#3D2B1F] mb-1.5">
                      Select Your Suffrage Intention Today:
                    </label>
                    <select
                      value={suffrageIntention}
                      onChange={(e) => {
                        setSuffrageIntention(e.target.value);
                        try {
                          localStorage.setItem('sanctum_suffrage_intention_v1', e.target.value);
                        } catch {
                          // ignore
                        }
                      }}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-[#D8C8AC] text-xs sm:text-sm font-serif text-[#23170D] focus:outline-none focus:border-[#8C6226]"
                    >
                      <option value="Most Abandoned Souls in Purgatory">
                        For the Most Forgotten &amp; Abandoned Souls in Purgatory
                      </option>
                      <option value="Deceased Parents, Family & Benefactors">
                        For Deceased Parents, Relatives &amp; Benefactors
                      </option>
                      <option value="Deceased Priests, Bishops & Religious">
                        For Deceased Priests, Bishops &amp; Consecrated Souls
                      </option>
                      <option value="Souls Closest to Entering Heaven Today">
                        For the Souls Nearest to Release into Heaven Today
                      </option>
                      <option value="Personal Remission of Temporal Punishment">
                        For My Own Soul’s Remission of Temporal Punishment
                      </option>
                    </select>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E5D6BA] space-y-3">
                  <div className="flex items-center justify-between text-xs font-serif text-[#4E3B2B]">
                    <span>Your Recorded Suffrages Offered:</span>
                    <span className="font-cinzel text-base font-bold text-[#7A2021]">
                      {personalIndulgencesOffered} Offerings
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleOfferIndulgenceForSouls}
                    className="w-full py-2.5 px-4 rounded-lg bg-[#7A2021] hover:bg-[#611819] text-white font-cinzel text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-xs"
                  >
                    <Flame className="w-4 h-4 text-amber-200" />
                    <span>Record Suffrage Offering for Purgatory</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Row 2: The Four Ordinary Everyday Plenary Indulgences */}
            <div className="rounded-xl bg-white border border-[#E2D5BE] p-5 sm:p-6 space-y-4">
              <div className="border-b border-[#EFE8DA] pb-3">
                <span className="font-cinzel text-[11px] font-bold uppercase tracking-widest text-[#8C6226]">
                  Available Every Day of the Year
                </span>
                <h4 className="font-cinzel text-base sm:text-lg font-bold text-[#23170D]">
                  The Four Everyday Plenary Indulgences (Enchiridion Indulgentiarum)
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    num: 'I',
                    title: 'Eucharistic Adoration (30 Minutes)',
                    grant: 'Grant 7 §1, 1°',
                    desc: 'Visit the Most Blessed Sacrament for adoration lasting at least half an hour.'
                  },
                  {
                    num: 'II',
                    title: 'Sacred Scripture Reading (30 Minutes)',
                    grant: 'Grant 30 §1',
                    desc: 'Read Sacred Scripture from an approved edition for at least half an hour with veneration due to the Divine Word.'
                  },
                  {
                    num: 'III',
                    title: 'The Marian Rosary (5 Decades)',
                    grant: 'Grant 17 §1',
                    desc: 'Devoutly recite 5 continuous decades in a church, public oratory, or within the family or pious community, meditating on the Mysteries.'
                  },
                  {
                    num: 'IV',
                    title: 'Pious Way of the Cross (14 Stations)',
                    grant: 'Grant 13',
                    desc: 'Make the pious exercise before legitimately erected Stations of the Cross, meditating on the Lord’s Passion and Death.'
                  }
                ].map((grant) => (
                  <div
                    key={grant.num}
                    className="rounded-xl bg-[#FAF6EE] border border-[#E2D5BE] p-4 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-cinzel font-bold text-[#8C6226]">
                        <span>Everyday Grant {grant.num}</span>
                        <span>{grant.grant}</span>
                      </div>
                      <h5 className="font-cinzel text-sm font-bold text-[#23170D] mt-1.5">
                        {grant.title}
                      </h5>
                      <p className="font-serif text-xs text-[#4A3728] mt-1.5 leading-relaxed">
                        {grant.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 3: Indulgence Collective Calendar of Special Liturgical Dates */}
            <div className="rounded-xl bg-white border border-[#E2D5BE] p-5 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EFE8DA] pb-3">
                <div>
                  <span className="font-cinzel text-[11px] font-bold uppercase tracking-widest text-[#7A2021]">
                    Liturgical Indulgence Calendar
                  </span>
                  <h4 className="font-cinzel text-base sm:text-lg font-bold text-[#23170D]">
                    Upcoming Solemnities &amp; Special Plenary Indulgence Days
                  </h4>
                </div>
                <span className="font-serif text-xs text-[#6E5641]">
                  From the Official Vatican Manual of Indulgences (4th Edition)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {INDULGENCE_CALENDAR_ENTRIES.map((entry) => (
                  <div
                    key={entry.id}
                    className={`rounded-xl p-4 border transition-colors ${
                      entry.isUpcomingSoon
                        ? 'bg-[#FFFDF9] border-[#C9A66B]'
                        : 'bg-[#FAF6EE]/70 border-[#E5DAC3]'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-serif">
                      <span className="font-cinzel font-bold text-[#7A2021] uppercase tracking-wider">
                        {entry.dateLabel}
                      </span>
                      <span className="italic text-[#6E5641]">{entry.grantReference}</span>
                    </div>

                    <h5 className="font-cinzel text-sm sm:text-base font-bold text-[#23170D] mt-1">
                      {entry.feastOrOccasion}
                    </h5>

                    <p className="font-serif text-xs sm:text-sm text-[#4A3728] mt-1.5 leading-relaxed">
                      <strong>Prescribed Work:</strong> {entry.prescribedWork}
                    </p>

                    <p className="font-serif text-xs text-[#2E5A36] font-semibold mt-2 pt-2 border-t border-[#EFE8DA]">
                      {entry.suffrageNote}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            SECTION III: PRECEPTS OF THE CHURCH (SUNDAY MASS, CONFESSION, FRIDAY)
           ===================================================================== */}
        {(activeSection === 'all' || activeSection === 'precepts') && (
          <div className="space-y-6 pt-2">
            <div className="pb-3 border-b border-[#E2D5BE]">
              <span className="font-cinzel text-xs font-bold uppercase tracking-[0.2em] text-[#8C6226]">
                Section III · Fidelity to Ecclesial Precepts (CCC 2041–2043)
              </span>
              <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#23170D] mt-1">
                Sunday Mass, Yearly Confession &amp; Friday Abstinence or Substitution
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Card 1: Sunday Mass & Holy Days of Obligation */}
              <div className="rounded-xl bg-white border border-[#E2D5BE] p-5 flex flex-col justify-between space-y-4 shadow-[0_2px_12px_rgba(60,40,20,0.04)]">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-cinzel font-bold uppercase tracking-wider text-[#8C6226]">
                    <span>First Precept · Canon 1247</span>
                    <CalendarIcon className="w-4 h-4 text-[#8C6226]" />
                  </div>
                  <h4 className="font-cinzel text-base sm:text-lg font-bold text-[#23170D]">
                    Sunday Mass &amp; Holy Days of Obligation
                  </h4>
                  <p className="font-serif text-xs sm:text-sm text-[#4A3728] leading-relaxed">
                    Catholics are obliged to participate in the Eucharistic Sacrifice on all Sundays and Holy Days of Obligation, and to abstain from works that hinder the worship of God.
                  </p>

                  <div className="p-3 rounded-lg bg-[#FAF6EE] border border-[#E5DAC3] text-xs font-serif text-[#4E3B2B] space-y-1">
                    <div className="font-bold text-[#23170D]">Philippine Holy Days of Obligation (CBCP):</div>
                    <div>• Every Sunday of the Year · Nov 1 (All Saints)</div>
                    <div>• Dec 8 (Immaculate Conception) · Dec 25 (Christmas) · Jan 1 (Mother of God)</div>
                  </div>
                </div>

                <div className="space-y-2.5 pt-2 border-t border-[#EFE8DA]">
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'committed', label: 'Committed' },
                      { id: 'attended', label: 'Fulfilled' },
                      { id: 'dispensed', label: 'Sick / Dispensed' }
                    ].map((st) => (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => {
                          setSundayMassStatus(st.id as typeof sundayMassStatus);
                          try {
                            localStorage.setItem('sanctum_precept_sunday_v2', st.id);
                          } catch {
                            // ignore
                          }
                        }}
                        className={`py-1.5 px-2 rounded-lg text-xs font-serif font-semibold border cursor-pointer transition-colors ${
                          sundayMassStatus === st.id
                            ? 'bg-[#2C1E14] text-white border-[#2C1E14]'
                            : 'bg-[#FAF6EE] hover:bg-[#EFE8DA] text-[#3D2B1F] border-[#D8C8AC]'
                        }`}
                      >
                        {st.label}
                      </button>
                    ))}
                  </div>

                  {onOpenCebuParishes && (
                    <button
                      type="button"
                      onClick={onOpenCebuParishes}
                      className="w-full py-2 px-3 rounded-lg bg-[#FAF6EE] hover:bg-[#EFE8DA] border border-[#D8C8AC] text-[#23170D] text-xs font-serif font-bold cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#7A2021]" />
                      <span>View Cebu Parishes Mass Schedules</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Card 2: Yearly Confession (Easter Duty) & Monthly Devotional Confession */}
              <div className="rounded-xl bg-white border border-[#E2D5BE] p-5 flex flex-col justify-between space-y-4 shadow-[0_2px_12px_rgba(60,40,20,0.04)]">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-cinzel font-bold uppercase tracking-wider text-[#7A2021]">
                    <span>Second Precept · Canon 989</span>
                    <ShieldCheck className="w-4 h-4 text-[#7A2021]" />
                  </div>
                  <h4 className="font-cinzel text-base sm:text-lg font-bold text-[#23170D]">
                    Yearly &amp; Frequent Sacramental Confession
                  </h4>
                  <p className="font-serif text-xs sm:text-sm text-[#4A3728] leading-relaxed">
                    Every Catholic must confess grave sins at least once a year. For gaining regular <strong>Plenary Indulgences</strong>, the Apostolic Penitentiary recommends Confession every 2 to 3 weeks (~20 days).
                  </p>

                  <div className="p-3 rounded-lg bg-[#FAF6EE] border border-[#E5DAC3] space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-serif">
                      <span className="text-[#5A4432]">Days Since Last Confession:</span>
                      <span
                        className={`font-bold ${
                          daysSinceConfession <= 20
                            ? 'text-[#2E5A36]'
                            : daysSinceConfession <= 365
                            ? 'text-[#8C6226]'
                            : 'text-[#7A2021]'
                        }`}
                      >
                        {daysSinceConfession} days ago
                      </span>
                    </div>
                    <div className="text-[11px] font-serif text-[#5A4432]">
                      {daysSinceConfession <= 20
                        ? '✓ Within the ~20-day window for daily Plenary Indulgences.'
                        : daysSinceConfession <= 365
                        ? '✓ Yearly precept fulfilled. Schedule Confession soon to renew Plenary Indulgence window.'
                        : '⚠ Over 1 year since last Confession—please approach the Sacrament of Penance soon.'}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#EFE8DA]">
                  <label className="block font-serif text-xs font-bold text-[#3D2B1F]">
                    Update Last Sacramental Confession Date:
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="date"
                      value={lastConfessionDate}
                      onChange={(e) => {
                        setLastConfessionDate(e.target.value);
                        try {
                          localStorage.setItem('sanctum_precept_confession_date_v2', e.target.value);
                        } catch {
                          // ignore
                        }
                      }}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-[#FAF6EE] border border-[#D8C8AC] text-xs font-serif text-[#23170D]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setLastConfessionDate(currentDateStr);
                        setUsualConditions((prev) => ({ ...prev, sacramentalConfession: true }));
                        try {
                          localStorage.setItem('sanctum_precept_confession_date_v2', currentDateStr);
                        } catch {
                          // ignore
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg bg-[#2C1E14] text-white text-xs font-serif font-semibold cursor-pointer"
                    >
                      Confessed Today
                    </button>
                  </div>
                </div>
              </div>

              {/* Card 3: Friday Abstinence or Substitution Failing It */}
              <div className="rounded-xl bg-white border border-[#E2D5BE] p-5 flex flex-col justify-between space-y-4 shadow-[0_2px_12px_rgba(60,40,20,0.04)]">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs font-cinzel font-bold uppercase tracking-wider text-[#8C6226]">
                    <span>Fourth Precept · Canon 1251–1253</span>
                    <Cross className="w-4 h-4 text-[#8C6226]" />
                  </div>
                  <h4 className="font-cinzel text-base sm:text-lg font-bold text-[#23170D]">
                    Friday Abstinence or Substitution Failing It
                  </h4>
                  <p className="font-serif text-xs sm:text-sm text-[#4A3728] leading-relaxed">
                    Every Friday of the year (unless a Solemnity) is a day of penance in memory of Our Lord’s Passion. Outside Lent, if meat abstinence cannot be kept, a penitential or charitable substitution must be offered.
                  </p>

                  <div className="space-y-1.5 pt-1">
                    {[
                      {
                        id: 'abstinence',
                        label: 'Abstinence from Meat (Traditional Friday Penance)'
                      },
                      {
                        id: 'mercy_substitution',
                        label: 'Substitution: Corporal or Spiritual Work of Mercy (CBCP)'
                      },
                      {
                        id: 'rosary_stations_substitution',
                        label: 'Substitution: Extra 5-Decade Rosary or Stations of the Cross'
                      },
                      {
                        id: 'fasting_alms_substitution',
                        label: 'Substitution: Fast from Comforts/Media & Almsgiving to the Poor'
                      }
                    ].map((opt) => (
                      <label
                        key={opt.id}
                        className={`flex items-center gap-2 p-2 rounded-lg border text-xs font-serif cursor-pointer ${
                          fridayPenanceChoice === opt.id
                            ? 'bg-[#FAF6EE] border-[#8C6226] text-[#23170D] font-bold'
                            : 'bg-white border-[#EFE8DA] text-[#5A4432]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="fridayPenance"
                          checked={fridayPenanceChoice === opt.id}
                          onChange={() => {
                            setFridayPenanceChoice(opt.id as typeof fridayPenanceChoice);
                            try {
                              localStorage.setItem('sanctum_precept_friday_choice_v2', opt.id);
                            } catch {
                              // ignore
                            }
                          }}
                          className="accent-[#8C6226]"
                        />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#EFE8DA]">
                  <button
                    type="button"
                    onClick={() => {
                      const next = !fridayFulfilledThisWeek;
                      setFridayFulfilledThisWeek(next);
                      try {
                        localStorage.setItem('sanctum_precept_friday_done_v2', String(next));
                      } catch {
                        // ignore
                      }
                    }}
                    className={`w-full py-2 px-3 rounded-lg text-xs font-cinzel font-bold uppercase tracking-wider border cursor-pointer transition-colors flex items-center justify-center gap-2 ${
                      fridayFulfilledThisWeek
                        ? 'bg-[#2E5A36] text-white border-[#2E5A36]'
                        : 'bg-[#FAF6EE] hover:bg-[#EFE8DA] text-[#23170D] border-[#D8C8AC]'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>
                      {fridayFulfilledThisWeek
                        ? 'Friday Penance / Substitution Fulfilled'
                        : 'Mark This Week’s Friday Penance Fulfilled'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =====================================================================
            SECTION IV: ONGOING & UPCOMING NOVENAS, CEBU RELICS & VATICAN EVENTS
           ===================================================================== */}
        {(activeSection === 'all' || activeSection === 'ecclesial') && (
          <div className="space-y-8 pt-2">
            {/* Sub-block A: Ongoing & Upcoming Novenas */}
            <div className="space-y-4">
              <div className="pb-2 border-b border-[#E2D5BE]">
                <span className="font-cinzel text-xs font-bold uppercase tracking-[0.2em] text-[#8C6226]">
                  Section IV-A · Nine-Day Liturgical Preparation
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#23170D] mt-1">
                  Ongoing &amp; Upcoming Novenas
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {computedNovenas.map((nov) => (
                  <div
                    key={nov.id}
                    className={`rounded-xl p-4 sm:p-5 border flex flex-col justify-between space-y-3 ${
                      nov.isOngoing
                        ? 'bg-white border-2 border-[#B8860B] shadow-[0_4px_16px_rgba(184,134,11,0.1)]'
                        : 'bg-[#FFFDF9] border-[#E2D5BE]'
                    }`}
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-serif">
                        <span
                          className={`font-cinzel font-bold uppercase tracking-wider ${
                            nov.isOngoing ? 'text-[#7A2021]' : 'text-[#8C6226]'
                          }`}
                        >
                          {nov.statusLabel}
                        </span>
                        <span className="text-[#6E5641]">{nov.feastDateLabel}</span>
                      </div>

                      <h4 className="font-cinzel text-base font-bold text-[#23170D]">
                        {nov.title}
                      </h4>

                      <p className="font-serif text-xs font-semibold text-[#5A4432]">
                        Patronage: {nov.patronage}
                      </p>

                      <p className="font-serif text-xs italic text-[#4A3728] bg-[#FAF6EE] p-2.5 rounded-lg border border-[#E5DAC3] leading-relaxed">
                        "{nov.dailyPrayerSnippet}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sub-block B: Visits of the Relics of Great Saints to Cebu, Philippines */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 pb-2 border-b border-[#E2D5BE]">
                <div>
                  <span className="font-cinzel text-xs font-bold uppercase tracking-[0.2em] text-[#7A2021]">
                    Section IV-B · Archdiocese of Cebu Pilgrim Watch
                  </span>
                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#23170D] mt-1">
                    Visits &amp; Veneration of the Relics of Great Saints in Cebu, Philippines
                  </h3>
                </div>
                <span className="font-serif text-xs text-[#6E5641]">
                  Partial Indulgence granted for devoutly venerating Relics of the Saints (Enchiridion, Conc. 54)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CEBU_RELIC_VISITS.map((relic) => (
                  <div
                    key={relic.id}
                    className="rounded-xl bg-white border border-[#E2D5BE] p-5 space-y-2.5 shadow-[0_2px_12px_rgba(60,40,20,0.04)]"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-serif">
                      <span className="font-cinzel font-bold uppercase tracking-wider text-[#7A2021]">
                        {relic.status}
                      </span>
                      <span className="text-[#8C6226] font-semibold">{relic.relicClass}</span>
                    </div>

                    <h4 className="font-cinzel text-base sm:text-lg font-bold text-[#23170D]">
                      {relic.saintName}
                    </h4>

                    <div className="font-serif text-xs sm:text-sm text-[#3D2B1F] space-y-1">
                      <div>
                        <strong>Shrine / Parish:</strong> {relic.shrineOrParish} ({relic.locationDistrict})
                      </div>
                      <div>
                        <strong>Dates:</strong> {relic.dateRange}
                      </div>
                      <div>
                        <strong>Veneration Schedule:</strong> {relic.venerationSchedule}
                      </div>
                    </div>

                    <p className="font-serif text-xs text-[#5A4432] bg-[#FAF6EE] p-2.5 rounded-lg border border-[#E5DAC3] leading-relaxed">
                      <strong>Spiritual Fruits:</strong> {relic.spiritualFruits}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sub-block C: Important Events Recommended by the Vatican */}
            <div className="space-y-4">
              <div className="pb-2 border-b border-[#E2D5BE]">
                <span className="font-cinzel text-xs font-bold uppercase tracking-[0.2em] text-[#8C6226]">
                  Section IV-C · Universal Church &amp; Holy See Directives
                </span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#23170D] mt-1">
                  Important Events &amp; Observances Recommended by the Vatican
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {VATICAN_RECOMMENDED_EVENTS.map((ev) => (
                  <div
                    key={ev.id}
                    className="rounded-xl bg-white border border-[#E2D5BE] p-5 space-y-2.5 shadow-[0_2px_12px_rgba(60,40,20,0.04)]"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-serif text-[#6E5641]">
                      <span className="font-cinzel font-bold text-[#8C6226] uppercase tracking-wider">
                        {ev.dateLabel}
                      </span>
                      <span>{ev.dicasteryOrSource}</span>
                    </div>

                    <h4 className="font-cinzel text-base sm:text-lg font-bold text-[#23170D]">
                      {ev.title}
                    </h4>

                    <p className="font-serif text-xs sm:text-sm text-[#4A3728] leading-relaxed">
                      {ev.summary}
                    </p>

                    <div className="pt-2 border-t border-[#EFE8DA] space-y-1 text-xs font-serif">
                      <div className="text-[#7A2021] font-bold">
                        Indulgence / Spiritual Grace: {ev.indulgenceOrGrace}
                      </div>
                      <div className="text-[#2E5A36] font-semibold">
                        Recommended Action: {ev.recommendedAction}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
