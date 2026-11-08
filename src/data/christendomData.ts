export interface ChristendomChannel {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  subscribers: string;
  verified: boolean;
  description: string;
  category: string;
  christendomUrl: string;
}

export interface ChristendomVideo {
  id: string;
  title: string;
  channelId: string;
  channelName: string;
  channelAvatar: string;
  youtubeId: string;
  duration: string;
  views: string;
  publishedAt: string;
  category: 'Theology & Homilies' | 'Sacred Scripture' | 'Church History' | 'Apologetics & Culture' | 'Sacred Liturgy & Chant' | 'Documentaries';
  description: string;
  thumbnailUrl: string;
  verified: boolean;
  likes: string;
  christendomUrl: string;
}

export const CHRISTENDOM_CHANNELS: ChristendomChannel[] = [
  {
    id: 'ch-christendom',
    name: 'Christendom College & Media',
    handle: '@ChristendomTube',
    avatarUrl: 'https://images.unsplash.com/photo-1548625361-1959779df3a8?auto=format&fit=crop&w=120&q=80',
    subscribers: '48K subscribers',
    verified: true,
    description: 'Catholic liberal arts education, collegiate lectures, faith and science conferences, and sacred choral traditions.',
    category: 'Catholic Intellectual Tradition',
    christendomUrl: 'https://www.christendom.com'
  },
  {
    id: 'ch-wordonfire',
    name: 'Word on Fire (Bishop Barron)',
    handle: '@BishopBarron',
    avatarUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=120&q=80',
    subscribers: '1.2M subscribers',
    verified: true,
    description: 'Bishop Robert Barron proclaiming Christ through intellectual rigor, philosophical beauty, and cultural commentary.',
    category: 'Theology & Philosophy',
    christendomUrl: 'https://www.christendom.com'
  },
  {
    id: 'ch-ascension',
    name: 'Ascension Presents',
    handle: '@AscensionPresents',
    avatarUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=120&q=80',
    subscribers: '950K subscribers',
    verified: true,
    description: 'Fr. Mike Schmitz, Jackie and Bobby Angel, and faithful creators sharing practical Catholic spiritual wisdom for daily life.',
    category: 'Spiritual Life & Discipleship',
    christendomUrl: 'https://www.christendom.com'
  },
  {
    id: 'ch-stpaulcenter',
    name: 'St. Paul Center (Dr. Scott Hahn)',
    handle: '@StPaulCenter',
    avatarUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=120&q=80',
    subscribers: '210K subscribers',
    verified: true,
    description: 'Biblical scholarship from the heart of the Church, covenant theology, and Eucharistic liturgy with Dr. Scott Hahn.',
    category: 'Biblical Theology',
    christendomUrl: 'https://www.christendom.com'
  },
  {
    id: 'ch-catholicanswers',
    name: 'Catholic Answers Live',
    handle: '@CatholicAnswers',
    avatarUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=120&q=80',
    subscribers: '540K subscribers',
    verified: true,
    description: 'Live call-in apologetics defending Catholic doctrine, scripture passages, and moral teachings with charity and clarity.',
    category: 'Apologetics',
    christendomUrl: 'https://www.christendom.com'
  },
  {
    id: 'ch-augustine',
    name: 'Augustine Institute & FORMED',
    handle: '@AugustineInstitute',
    avatarUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=120&q=80',
    subscribers: '320K subscribers',
    verified: true,
    description: 'Graduate theological studies, Lectio Divina, cinematic documentaries, and parish formation series.',
    category: 'Theology & Evangelization',
    christendomUrl: 'https://www.christendom.com'
  },
  {
    id: 'ch-icc',
    name: 'Institute of Catholic Culture',
    handle: '@InstituteOfCatholicCulture',
    avatarUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=120&q=80',
    subscribers: '145K subscribers',
    verified: true,
    description: 'Orthodox adult catechesis exploring the Early Church Fathers, patristics, Church councils, and traditional liturgy.',
    category: 'Church History & Patristics',
    christendomUrl: 'https://www.christendom.com'
  },
  {
    id: 'ch-ewtn',
    name: 'EWTN Global Catholic Network',
    handle: '@EWTN',
    avatarUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=120&q=80',
    subscribers: '1.4M subscribers',
    verified: true,
    description: 'Mother Angelica classics, Papal liturgies, international Catholic news dispatches, and daily prayer devotions.',
    category: 'Catholic Media Network',
    christendomUrl: 'https://www.christendom.com'
  }
];

export const CHRISTENDOM_VIDEOS: ChristendomVideo[] = [
  {
    id: 'cv-1',
    title: 'The Lamb’s Supper: The Mass and the Book of Revelation',
    channelId: 'ch-stpaulcenter',
    channelName: 'St. Paul Center (Dr. Scott Hahn)',
    channelAvatar: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=120&q=80',
    youtubeId: 'p3iA63o0n2I',
    duration: '48:22',
    views: '412K views',
    publishedAt: '3 weeks ago',
    category: 'Theology & Homilies',
    description: 'Dr. Scott Hahn unveils how the Book of Revelation is not an apocalyptic code, but the divine key to understanding the Holy Sacrifice of the Mass as heaven kissing earth.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80',
    verified: true,
    likes: '28K',
    christendomUrl: 'https://www.christendom.com'
  },
  {
    id: 'cv-2',
    title: 'Why Is Prayer So Difficult? Overcoming Spiritual Dryness',
    channelId: 'ch-ascension',
    channelName: 'Ascension Presents',
    channelAvatar: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=120&q=80',
    youtubeId: 'q8q3F2j2X9E',
    duration: '11:45',
    views: '840K views',
    publishedAt: '1 month ago',
    category: 'Theology & Homilies',
    description: 'Fr. Mike Schmitz explains why God permits dryness in prayer. When feelings fade, showing up for Jesus Christ becomes an act of authentic theological charity.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    verified: true,
    likes: '62K',
    christendomUrl: 'https://www.christendom.com'
  },
  {
    id: 'cv-3',
    title: 'Saint Thomas Aquinas & The Five Ways to Prove God Exists',
    channelId: 'ch-wordonfire',
    channelName: 'Word on Fire (Bishop Barron)',
    channelAvatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=120&q=80',
    youtubeId: '1zmf_gU6wG4',
    duration: '34:10',
    views: '920K views',
    publishedAt: '2 months ago',
    category: 'Apologetics & Culture',
    description: 'Bishop Robert Barron offers a lucid masterclass on the cosmological arguments of Saint Thomas Aquinas in the Summa Theologiae, dismantling modern secular materialism.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80',
    verified: true,
    likes: '51K',
    christendomUrl: 'https://www.christendom.com'
  },
  {
    id: 'cv-4',
    title: 'Why Catholic Liberal Arts Build the Free Human Soul',
    channelId: 'ch-christendom',
    channelName: 'Christendom College & Media',
    channelAvatar: 'https://images.unsplash.com/photo-1548625361-1959779df3a8?auto=format&fit=crop&w=120&q=80',
    youtubeId: '8d2a6Q9X1kM',
    duration: '52:18',
    views: '124K views',
    publishedAt: '2 months ago',
    category: 'Church History',
    description: 'Recorded live at Christendom College: How the synthesis of Athens and Jerusalem, classical philosophy and Christian revelation, built Western civilization and preserves human dignity.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1548625361-1959779df3a8?auto=format&fit=crop&w=1200&q=80',
    verified: true,
    likes: '9.4K',
    christendomUrl: 'https://www.christendom.com'
  },
  {
    id: 'cv-5',
    title: 'The Real Presence: Is the Eucharist Literally the Body of Christ?',
    channelId: 'ch-catholicanswers',
    channelName: 'Catholic Answers Live',
    channelAvatar: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=120&q=80',
    youtubeId: '5k8A6Q0w1kY',
    duration: '22:15',
    views: '350K views',
    publishedAt: '3 weeks ago',
    category: 'Sacred Scripture',
    description: 'Tim Staples answers Protestant callers on John 6, 1 Corinthians 11, and the universal consensus of the Early Church Fathers regarding transubstantiation.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=1200&q=80',
    verified: true,
    likes: '24K',
    christendomUrl: 'https://www.christendom.com'
  },
  {
    id: 'cv-6',
    title: 'Presence: The Mystery of the Eucharist (Full Catholic Documentary)',
    channelId: 'ch-augustine',
    channelName: 'Augustine Institute & FORMED',
    channelAvatar: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=120&q=80',
    youtubeId: '3v9M7Q1z8fL',
    duration: '42:50',
    views: '610K views',
    publishedAt: '4 months ago',
    category: 'Documentaries',
    description: 'An award-winning cinematic documentary exploring the biblical origins, liturgical beauty, and miraculous reality of Jesus Christ present in the Holy Eucharist.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80',
    verified: true,
    likes: '45K',
    christendomUrl: 'https://www.christendom.com'
  },
  {
    id: 'cv-7',
    title: 'The Apostolic Fathers: Polycarp, Ignatius of Antioch & Clement',
    channelId: 'ch-icc',
    channelName: 'Institute of Catholic Culture',
    channelAvatar: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=120&q=80',
    youtubeId: '7x2k9Q4w3bN',
    duration: '1:12:05',
    views: '185K views',
    publishedAt: '5 months ago',
    category: 'Church History',
    description: 'What did the earliest Christians believe in the 1st and 2nd centuries? Discover how disciples of Saint John the Apostle professed the Catholic hierarchy, sacraments, and martyrdom.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80',
    verified: true,
    likes: '14K',
    christendomUrl: 'https://www.christendom.com'
  },
  {
    id: 'cv-8',
    title: 'Gregorian Chant & Solemn Choral Polyphony for Adoration',
    channelId: 'ch-ewtn',
    channelName: 'EWTN Global Catholic Network',
    channelAvatar: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=120&q=80',
    youtubeId: '4m1q7K9b0vP',
    duration: '1:05:40',
    views: '1.8M views',
    publishedAt: '6 months ago',
    category: 'Sacred Liturgy & Chant',
    description: 'Timeless Latin Gregorian chant (Pange Lingua, Tantum Ergo, Salve Regina, Adoro Te Devote) recorded in sacred cathedrals for contemplation and Eucharistic adoration.',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80',
    verified: true,
    likes: '110K',
    christendomUrl: 'https://www.christendom.com'
  },
  {
    id: 'cv-9',
    title: 'Mother Angelica: Unless You Are Willing to Do the Ridiculous',
    channelId: 'ch-ewtn',
    channelName: 'EWTN Global Catholic Network',
    channelAvatar: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=120&q=80',
    youtubeId: '9z3k8A4v7qL',
    duration: '28:14',
    views: '540K views',
    publishedAt: '8 months ago',
    category: 'Theology & Homilies',
    description: 'Classic Mother Angelica on the holy daring of Christian faith: God doesn’t call the equipped; He equips the called. Step out of the boat and keep your eyes fixed on Jesus!',
    thumbnailUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1200&q=80',
    verified: true,
    likes: '39K',
    christendomUrl: 'https://www.christendom.com'
  }
];
