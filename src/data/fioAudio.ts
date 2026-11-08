export interface FioTrack {
  id: string;
  title: string;
  showTitle: string;
  creator: string;
  category: 'fio-originals' | 'chant-prayer' | 'audiobooks' | 'apologetics';
  categoryLabel: string;
  coverUrl: string;
  durationFormatted: string;
  durationSeconds: number;
  audioUrl: string;
  summary: string;
  description: string;
  fioUrl: string;
  tags: string[];
}

export const FIO_CATEGORIES = [
  { id: 'all', label: 'All Fio Audio' },
  { id: 'fio-originals', label: 'Fio Originals' },
  { id: 'chant-prayer', label: 'Chant & Adoration' },
  { id: 'audiobooks', label: 'Catholic Audiobooks' },
  { id: 'apologetics', label: 'Talks & Apologetics' }
] as const;

export const FIO_AUDIO_CATALOG: FioTrack[] = [
  {
    id: 'fio-track-anti-depressing',
    title: 'Ep 116: Liturgy to Lexapro — Healing, Faith & Mental Health',
    showTitle: 'Anti-Depressing',
    creator: 'Jasmyn Joubert & Chenele Shaw',
    category: 'fio-originals',
    categoryLabel: 'Fio Originals',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/9b/6e/64/9b6e6465-5c24-bcfa-cded-706f13af7f25/mza_6006783130415864132.jpg/600x600bb.jpg',
    durationFormatted: '34 min',
    durationSeconds: 2040,
    audioUrl: 'https://anchor.fm/s/dbd29c00/podcast/play/127205496/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2026-9-9%2F433813336-44100-2-06a7f9d849c3a.mp3',
    summary: 'The debut Fio Original discussing everything from liturgy to lexapro, pop culture, and emotional healing through Catholic faith.',
    description: 'Hosted by Jasmyn Joubert and Chenele Shaw, this original Fio podcast explores depression, grief, and emotional well-being anchored in Catholic hope and sacramental grace.',
    fioUrl: 'https://play.fio.fm',
    tags: ['Fio Original', 'Anti-Depressing', 'Mental Health', 'Catholic Healing']
  },
  {
    id: 'fio-track-further-up',
    title: 'Beauty Over Efficiency: Slowing Down to Make Space for God',
    showTitle: 'Further Up',
    creator: 'Further Up Podcast',
    category: 'fio-originals',
    categoryLabel: 'Fio Originals',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts211/v4/d7/07/3e/d7073e0f-d4c4-d6ee-2736-7b86cc10cb22/mza_9627954330277842369.jpg/600x600bb.jpg',
    durationFormatted: '28 min',
    durationSeconds: 1680,
    audioUrl: 'https://anchor.fm/s/102094360/podcast/play/105364923/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2025-6-11%2F403737601-44100-2-2da34401be52b.m4a',
    summary: 'Inspired by C.S. Lewis’s call "further up and further in," diving into Catholic wonder, classical literature, and the Church Fathers.',
    description: 'Examining the sacramental imagination in C.S. Lewis, J.R.R. Tolkien, and G.K. Chesterton, recovering quiet contemplation and beauty in a hurried world.',
    fioUrl: 'https://play.fio.fm',
    tags: ['Fio Original', 'Further Up', 'CS Lewis', 'Chesterton', 'Literature']
  },
  {
    id: 'fio-track-youth-ministry',
    title: 'NCYC Prep: How to Encounter Christ on the Frontlines',
    showTitle: 'Youth Ministry Mic’d',
    creator: 'Youth Ministry Mic’d Team',
    category: 'fio-originals',
    categoryLabel: 'Fio Originals',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts221/v4/fd/cd/f0/fdcdf073-e366-417c-74ba-fda820ded571/mza_6036820020032395293.jpg/600x600bb.jpg',
    durationFormatted: '22 min',
    durationSeconds: 1320,
    audioUrl: 'https://anchor.fm/s/edf4d8e4/podcast/play/111354753/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2025-10-18%2F412703406-44100-2-54ad16ec67266.m4a',
    summary: 'Authentic advice and spiritual encouragement for Catholic youth leaders, teachers, and catechists forming the next generation.',
    description: 'Real talk on accompaniment, discipleship, parish retreats, and bringing young souls into a personal encounter with Jesus Christ in the Eucharist.',
    fioUrl: 'https://play.fio.fm',
    tags: ['Fio Original', 'Youth Ministry', 'Evangelization', 'Catechesis']
  },
  {
    id: 'fio-track-floriani-chant',
    title: 'Vexilla Regis: The Sacred Triumph of the Holy Cross',
    showTitle: 'Chant School (Floriani)',
    creator: 'Floriani Men’s Vocal Ensemble',
    category: 'chant-prayer',
    categoryLabel: 'Chant & Adoration',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/f5/fc/79/f5fc793a-e470-e9c4-3b10-3f4a63e1cc9b/mza_11762758212780371630.jpg/600x600bb.jpg',
    durationFormatted: '18 min',
    durationSeconds: 1080,
    audioUrl: 'https://content.rss.com/episodes/86444/1400288/chantschool/2024_04_09_18_51_13_7ff82e7e-413d-4431-8e80-6a20e236e31f.mp3',
    summary: 'Reverent monastic Gregorian chant and choral pedagogy from Floriani, featured sacred music artists on Fio.',
    description: 'Monastic polyphony, chant history, and the traditional Passiontide hymn Vexilla Regis Prodeunt sung with sacred acoustic fidelity.',
    fioUrl: 'https://play.fio.fm',
    tags: ['Floriani', 'Gregorian Chant', 'Sacred Music', 'Adoration']
  },
  {
    id: 'fio-track-tob-christopher-west',
    title: 'Desire, Prayer & the Sacred Heart of the Human Person',
    showTitle: 'Ask Christopher West',
    creator: 'Christopher & Wendy West (Theology of the Body Institute)',
    category: 'apologetics',
    categoryLabel: 'Talks & Apologetics',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts221/v4/ba/49/5d/ba495d9c-3a93-73ae-f856-7b711701d938/mza_2739602271733654751.jpg/600x600bb.jpg',
    durationFormatted: '31 min',
    durationSeconds: 1860,
    audioUrl: 'https://traffic.megaphone.fm/APO7172954611.mp3',
    summary: 'Deep exploration of St. John Paul II’s Theology of the Body, human longing, and finding authentic love in Christ.',
    description: 'Answering listener questions on sexuality, sacramental marriage, and interior prayer through the Theology of the Body framework.',
    fioUrl: 'https://play.fio.fm',
    tags: ['Theology of the Body', 'Christopher West', 'St. John Paul II', 'Marriage']
  },
  {
    id: 'fio-track-tan-spiritual-masters',
    title: 'St. Francis de Sales: Introduction to the Devout Life',
    showTitle: 'The Spiritual Masters',
    creator: 'TAN Books Audio',
    category: 'audiobooks',
    categoryLabel: 'Catholic Audiobooks',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/89/13/70/891370fe-bc88-d12d-c5e2-e6d376c43b66/mza_11777662511035291891.jpg/600x600bb.jpg',
    durationFormatted: '35 min',
    durationSeconds: 2100,
    audioUrl: 'https://dts.podtrac.com/redirect.mp3/aphid.fireside.fm/d/1437767933/cdfbae20-3944-4880-bb6c-5860a901b00a/9fab2ef9-308d-4d28-a169-28caf25f76ce.mp3',
    summary: 'Official TAN Books audio series exploring Catholic spiritual classics, doctors of the Church, and contemplative prayer.',
    description: 'How St. Francis de Sales teaches ordinary Christians how to cultivate genuine interior holiness while living active lives in the world.',
    fioUrl: 'https://play.fio.fm',
    tags: ['TAN Books', 'Audiobook', 'Spiritual Masters', 'St. Francis de Sales']
  },
  {
    id: 'fio-track-tan-conversations',
    title: 'Catholic Social Teaching & the Dignity of Creation',
    showTitle: 'TAN Conversations',
    creator: 'TAN Books & Fr. Jeffrey Kirby',
    category: 'audiobooks',
    categoryLabel: 'Catholic Audiobooks',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts112/v4/66/6f/51/666f5194-7a08-b26e-71e5-f4fb6fcf5d2e/mza_16441694421031343560.jpg/600x600bb.jpg',
    durationFormatted: '27 min',
    durationSeconds: 1620,
    audioUrl: 'https://podcast.wistia.com/deliveries/94fcf8a14c64c9ac7e40a02d7aa913cbefbd4288.mp3?d=eyJtIjo5ODkyNDM3OCwibWQiOjE2MTQuMjQsImEiOiJ3aXN0aWEtcHJvZHVjdGlvbl8zNzM3MjgiLCJjIjo5NTc5NywiZSI6MTQxMjM1MCwiYiI6Ijk0ZmNmOGExNGM2NGM5YWM3ZTQwYTAyZDdhYTkxM2NiZWZiZDQyODgiLCJtYiI6NzUxMywib2IiOjE0Mzk5OTcuMDYzNjMzNjYwNn0%3D--2213e3b21136cd42edb8d55879a159520cf2a76aedbc66ebe10904bf974667b7',
    summary: 'In-depth theological conversations with TAN Books authors on apologetics, spiritual warfare, and Catholic culture.',
    description: 'Fr. Jeffrey Kirby and TAN authors unpack Catholic moral principles and the sacred stewardship of creation.',
    fioUrl: 'https://play.fio.fm',
    tags: ['TAN Books', 'Catholic Authors', 'Moral Theology', 'Creation']
  }
];
