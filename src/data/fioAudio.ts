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
    title: 'Healing the Wounded Heart: Grace, Neuroscience & the Dark Night',
    showTitle: 'Anti-Depressing',
    creator: 'Catholic Therapists & Evangelists',
    category: 'fio-originals',
    categoryLabel: 'Fio Originals',
    coverUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=600&h=600&fit=crop&q=80',
    durationFormatted: '25 min',
    durationSeconds: 1540,
    audioUrl: 'https://dts.podtrac.com/redirect.mp3/aphid.fireside.fm/d/1437767933/1456b80f-6519-4796-9f1b-aae59da377b7/cc19930a-77ec-4f3f-92ae-29ff2d64a15d.mp3',
    summary: 'Exploring the intersection of clinical depression, emotional healing, and St. John of the Cross’s Dark Night of the Soul.',
    description: 'Catholic clinicians break down how to approach anxiety, suffering, and interior weariness through a Catholic sacramental lens, affirming that grace builds upon nature.',
    fioUrl: 'https://play.fio.fm',
    tags: ['Mental Health', 'Healing', 'Dark Night', 'Catholic Psychology']
  },
  {
    id: 'fio-track-further-up',
    title: 'The Great Dance: Lewis, Chesterton & the Catholic Cosmic Vision',
    showTitle: 'Further Up',
    creator: 'Catholic Scholars & Writers',
    category: 'fio-originals',
    categoryLabel: 'Fio Originals',
    coverUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=600&fit=crop&q=80',
    durationFormatted: '28 min',
    durationSeconds: 1680,
    audioUrl: 'https://traffic.libsyn.com/secure/wordonfire/Word_on_Fire_Show_-_546_-_v2_-_Mixed_English_Audio_Master.mp3?dest-id=302449',
    summary: 'An exploration of the sacramental imagination in C.S. Lewis and G.K. Chesterton, uncovering the eternal dance of the Trinity in myth and story.',
    description: 'Inspired by C.S. Lewis’s call "Further up and further in," this series re-awakens wonder for the beauty of God’s sacramental cosmos.',
    fioUrl: 'https://play.fio.fm',
    tags: ['Literature', 'Chesterton', 'CS Lewis', 'Sacramental Imagination']
  },
  {
    id: 'fio-track-youth-ministry',
    title: 'Rekindling Fire: Frontline Evangelization & Youth Catechesis',
    showTitle: 'Youth Ministry Mic’d',
    creator: 'Catholic Youth Ministers',
    category: 'fio-originals',
    categoryLabel: 'Fio Originals',
    coverUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=600&fit=crop&q=80',
    durationFormatted: '22 min',
    durationSeconds: 1320,
    audioUrl: 'https://dts.podtrac.com/redirect.mp3/aphid.fireside.fm/d/1437767933/1456b80f-6519-4796-9f1b-aae59da377b7/630742ca-3896-462d-b933-a100c4f68290.mp3',
    summary: 'Practical wisdom and authentic testimony on reaching the next generation with the fullness of the Gospel and the Eucharist.',
    description: 'Fio youth ministers share actionable insights on accompaniment, parish youth groups, and leading teens into a personal encounter with Jesus Christ.',
    fioUrl: 'https://play.fio.fm',
    tags: ['Youth Ministry', 'Evangelization', 'Discipleship', 'Parish Life']
  },
  {
    id: 'fio-track-adoration-chant',
    title: 'Eucharistic Adoration Hour: Salve Regina, Pange Lingua & Sacred Silence',
    showTitle: 'Fio Sacred Adoration',
    creator: 'Benedictine & Gregorian Sacred Artists',
    category: 'chant-prayer',
    categoryLabel: 'Chant & Adoration',
    coverUrl: 'https://images.unsplash.com/photo-1548625361-16a7f9273c59?w=600&h=600&fit=crop&q=80',
    durationFormatted: '30 min',
    durationSeconds: 1820,
    audioUrl: 'https://media.transistor.fm/7056bc90/ecf79d75.mp3',
    summary: 'Monastic Gregorian chant and contemplative silence curated for Holy Hours, Eucharistic Adoration, and evening prayer.',
    description: 'Traditional chants including Salve Regina, Tantum Ergo, and O Salutaris Hostia recorded with reverent monastic acoustics to draw the soul into quiet worship.',
    fioUrl: 'https://play.fio.fm',
    tags: ['Gregorian Chant', 'Holy Hour', 'Adoration', 'Monastic Prayer']
  },
  {
    id: 'fio-track-devout-life',
    title: 'Introduction to the Devout Life: The Call to Holiness in Every State of Life',
    showTitle: 'TAN Books Audio Library',
    creator: 'St. Francis de Sales (TAN Books Audio)',
    category: 'audiobooks',
    categoryLabel: 'Catholic Audiobooks',
    coverUrl: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=600&fit=crop&q=80',
    durationFormatted: '35 min',
    durationSeconds: 2100,
    audioUrl: 'https://dts.podtrac.com/redirect.mp3/aphid.fireside.fm/d/1437767933/cdfbae20-3944-4880-bb6c-5860a901b00a/9fab2ef9-308d-4d28-a169-28caf25f76ce.mp3',
    summary: 'The timeless Doctor of the Church guides everyday Christians on purifying the soul, persevering in prayer, and loving God in the midst of worldly duties.',
    description: 'An unabridged classic Catholic audiobook edition from TAN Books, narrating St. Francis de Sales’s gentle and practical roadmap to sanctity.',
    fioUrl: 'https://play.fio.fm',
    tags: ['TAN Books', 'Audiobook', 'St. Francis de Sales', 'Holiness']
  },
  {
    id: 'fio-track-presence-of-god',
    title: 'The Practice of the Presence of God: Conversations and Letters',
    showTitle: 'Sophia Institute Audio',
    creator: 'Brother Lawrence (Sophia Institute Press)',
    category: 'audiobooks',
    categoryLabel: 'Catholic Audiobooks',
    coverUrl: 'https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=600&h=600&fit=crop&q=80',
    durationFormatted: '26 min',
    durationSeconds: 1560,
    audioUrl: 'https://dts.podtrac.com/redirect.mp3/aphid.fireside.fm/d/1437767933/cdfbae20-3944-4880-bb6c-5860a901b00a/884c8f03-616f-42f6-841b-f9e900528832.mp3',
    summary: 'How a humble Carmelite monastery cook discovered unceasing interior union with Jesus Christ amid the pots, pans, and daily labor.',
    description: 'Brother Lawrence teaches how a pure heart and constant loving awareness of God transforms ordinary daily chores into profound contemplation.',
    fioUrl: 'https://play.fio.fm',
    tags: ['Sophia Institute', 'Audiobook', 'Brother Lawrence', 'Prayer of the Heart']
  },
  {
    id: 'fio-track-apologetics-mastery',
    title: 'Defending the Faith with Reason and Charity: Catholic Apologetics Masterclass',
    showTitle: 'Catholic Apologetics on Fio',
    creator: 'Catholic Answers Scholars',
    category: 'apologetics',
    categoryLabel: 'Talks & Apologetics',
    coverUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=600&fit=crop&q=80',
    durationFormatted: '32 min',
    durationSeconds: 1920,
    audioUrl: 'https://dts.podtrac.com/redirect.mp3/aphid.fireside.fm/d/1437767933/c6354d0d-bd10-4eed-b811-1bb569d46efd/ddb1001d-a9ac-45ed-bd60-9da133e8ac4a.mp3',
    summary: 'Essential answers to modern objections regarding the Papacy, Sacred Tradition, the Real Presence, and Mary.',
    description: 'A masterclass on explaining the Catholic Faith with clarity, philosophical precision, and gentle charity as commanded in 1 Peter 3:15.',
    fioUrl: 'https://play.fio.fm',
    tags: ['Apologetics', 'Papacy', 'Sacred Tradition', 'Eucharist']
  }
];
