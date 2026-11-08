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
  fallbackImageUrl: string;
  verified: boolean;
  likes: string;
  christendomUrl: string;
}

export const CHRISTENDOM_CHANNELS: ChristendomChannel[] = [
  {
    id: 'ch-christendom',
    name: 'Christendom College & Media',
    handle: '@ChristendomTube',
    avatarUrl: 'https://yt3.googleusercontent.com/ytc/AIdro_lse_d8k2NYELKQE-5cu2m5vRt5ikYvw1Q_74LaZkg=s176-c-k-c0x00ffffff-no-rj',
    subscribers: '48K subscribers',
    verified: true,
    description: 'Catholic liberal arts education, collegiate lectures, faith and science conferences, and sacred choral traditions from Front Royal, Virginia.',
    category: 'Catholic Intellectual Tradition',
    christendomUrl: 'https://www.christendom.com'
  },
  {
    id: 'ch-wordonfire',
    name: 'Word on Fire (Bishop Barron)',
    handle: '@BishopBarron',
    avatarUrl: 'https://yt3.googleusercontent.com/yjqfvu6ZX2QWSqczNIi3sbN6224_O62eAFob7uLgomGEVG6es2Tc3i_RNjAa4TbJfrceWuHw8Q=s176-c-k-c0x00ffffff-no-rj',
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
    avatarUrl: 'https://yt3.googleusercontent.com/2mhKBivLUIgeKbZ70A7z-rv3DX-KSZsxL5UPSF8CvkKQ_TAITqgarHM2eCXbtgza1vYy_VAI=s176-c-k-c0x00ffffff-no-rj',
    subscribers: '950K subscribers',
    verified: true,
    description: 'Fr. Mike Schmitz, Bible in a Year, and faithful Catholic creators sharing practical spiritual wisdom for daily discipleship.',
    category: 'Spiritual Life & Discipleship',
    christendomUrl: 'https://www.christendom.com'
  },
  {
    id: 'ch-stpaulcenter',
    name: 'St. Paul Center (Dr. Scott Hahn)',
    handle: '@StPaulCenter',
    avatarUrl: 'https://yt3.googleusercontent.com/eYpoPbiU611IXhHWGo5-5kUboJkA1CPWRNSMDbcxLfKLU4YAEHRdPHpdORnlfLsRc227-3PPBZc=s176-c-k-c0x00ffffff-no-rj',
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
    avatarUrl: 'https://yt3.googleusercontent.com/ytc/AIdro_mVshmYIBh_5n_6zbctv3onmWbDUQo6polUcPZjL1Y=s176-c-k-c0x00ffffff-no-rj',
    subscribers: '540K subscribers',
    verified: true,
    description: 'Live call-in apologetics explaining Catholic doctrine, Scripture passages, and moral teachings with charity and clarity.',
    category: 'Apologetics',
    christendomUrl: 'https://www.christendom.com'
  },
  {
    id: 'ch-augustine',
    name: 'Augustine Institute & FORMED',
    handle: '@AugustineInstitute',
    avatarUrl: 'https://yt3.googleusercontent.com/c8SAvU-uBojeQEEDkeOs1qbntDhnJ6tY_brmG-8USjn6LNdlKza3OKLSZS2OqT5ciM_cczmj59I=s176-c-k-c0x00ffffff-no-rj',
    subscribers: '320K subscribers',
    verified: true,
    description: 'Graduate theological studies, Lectio Divina, cinematic documentaries, and parish formation series.',
    category: 'Theology & Evangelization',
    christendomUrl: 'https://www.christendom.com'
  },
  {
    id: 'ch-icc',
    name: 'Institute of Catholic Culture',
    handle: '@InstituteCC',
    avatarUrl: 'https://yt3.googleusercontent.com/ytc/AIdro_kLo4Wzqbjkld4929HovTthbN0CUMEwQXH2ODvq1ZBmKg=s176-c-k-c0x00ffffff-no-rj',
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
    avatarUrl: 'https://yt3.googleusercontent.com/aXMeNbOffojVIm0uqTNEUMzmHtA5YxiLzzuj7gAwbuVdsIcv1jx5tkUfMWEEMte4eKT1hasUbJY=s176-c-k-c0x00ffffff-no-rj',
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
    title: 'Thrive at Christendom College | Catholic Liberal Arts & Culture',
    channelId: 'ch-christendom',
    channelName: 'Christendom College & Media',
    channelAvatar: 'https://yt3.googleusercontent.com/ytc/AIdro_lse_d8k2NYELKQE-5cu2m5vRt5ikYvw1Q_74LaZkg=s176-c-k-c0x00ffffff-no-rj',
    youtubeId: 'ZXHoVTo-8vk',
    duration: '52:14',
    views: '400K views',
    publishedAt: 'Christendom Lecture',
    category: 'Apologetics & Culture',
    description: 'Recorded live at Christendom College: Experience Catholic liberal arts education where faith and reason meet, forming men and women to "restore all things in Christ" with intellectual vigor and sacramental devotion.',
    thumbnailUrl: 'https://img.youtube.com/vi/ZXHoVTo-8vk/maxresdefault.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200&q=80',
    verified: true,
    likes: '24K',
    christendomUrl: 'https://www.christendom.com'
  },
  {
    id: 'cv-2',
    title: 'Unlocking the Catholicism of "The Lord of the Rings" | Joseph Pearce',
    channelId: 'ch-christendom',
    channelName: 'Christendom College & Media',
    channelAvatar: 'https://yt3.googleusercontent.com/ytc/AIdro_lse_d8k2NYELKQE-5cu2m5vRt5ikYvw1Q_74LaZkg=s176-c-k-c0x00ffffff-no-rj',
    youtubeId: 'n27mXqW89oo',
    duration: '48:32',
    views: '72K views',
    publishedAt: 'Christendom Lecture',
    category: 'Church History',
    description: 'Delivered at Christendom College: Renowned biographer Joseph Pearce explores the deep sacramental and Catholic theology woven into J.R.R. Tolkien’s Middle-earth, from the Lembas bread of the Eucharist to the triumph of humility over tyranny.',
    thumbnailUrl: 'https://img.youtube.com/vi/n27mXqW89oo/maxresdefault.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80',
    verified: true,
    likes: '8.2K',
    christendomUrl: 'https://www.christendom.com'
  },
  {
    id: 'cv-3',
    title: 'Why Is Prayer So Hard? | Fr. Mike Schmitz',
    channelId: 'ch-ascension',
    channelName: 'Ascension Presents',
    channelAvatar: 'https://yt3.googleusercontent.com/2mhKBivLUIgeKbZ70A7z-rv3DX-KSZsxL5UPSF8CvkKQ_TAITqgarHM2eCXbtgza1vYy_VAI=s176-c-k-c0x00ffffff-no-rj',
    youtubeId: 'Smana2aJxkQ',
    duration: '8:42',
    views: '980K views',
    publishedAt: 'Ascension Presents',
    category: 'Theology & Homilies',
    description: 'Fr. Mike Schmitz offers powerful spiritual counsel on overcoming distraction, dryness, and feelings of inadequacy in prayer. When feelings fade, persevering in prayer is the purest expression of authentic love for Jesus Christ.',
    thumbnailUrl: 'https://img.youtube.com/vi/Smana2aJxkQ/maxresdefault.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    verified: true,
    likes: '74K',
    christendomUrl: 'https://www.christendom.com'
  },
  {
    id: 'cv-4',
    title: 'Bishop Barron on King, Aquinas, and Our Nation’s Future',
    channelId: 'ch-wordonfire',
    channelName: 'Word on Fire (Bishop Barron)',
    channelAvatar: 'https://yt3.googleusercontent.com/yjqfvu6ZX2QWSqczNIi3sbN6224_O62eAFob7uLgomGEVG6es2Tc3i_RNjAa4TbJfrceWuHw8Q=s176-c-k-c0x00ffffff-no-rj',
    youtubeId: 'vNLWWiDXI8s',
    duration: '14:50',
    views: '340K views',
    publishedAt: 'Word on Fire',
    category: 'Theology & Homilies',
    description: 'Bishop Robert Barron reflects on the classical natural law tradition of Saint Thomas Aquinas and its enduring power to bring truth, justice, and transcendent moral order to human society.',
    thumbnailUrl: 'https://img.youtube.com/vi/vNLWWiDXI8s/maxresdefault.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=1200&q=80',
    verified: true,
    likes: '22K',
    christendomUrl: 'https://www.christendom.com'
  },
  {
    id: 'cv-5',
    title: 'What Led Scott Hahn to the Eucharist | Dr. Scott Hahn',
    channelId: 'ch-stpaulcenter',
    channelName: 'St. Paul Center (Dr. Scott Hahn)',
    channelAvatar: 'https://yt3.googleusercontent.com/eYpoPbiU611IXhHWGo5-5kUboJkA1CPWRNSMDbcxLfKLU4YAEHRdPHpdORnlfLsRc227-3PPBZc=s176-c-k-c0x00ffffff-no-rj',
    youtubeId: '1sFMI6vIiH4',
    duration: '48:15',
    views: '290K views',
    publishedAt: 'St. Paul Center',
    category: 'Sacred Scripture',
    description: 'Dr. Scott Hahn unfolds the profound biblical journey that brought him into the Catholic Church: uncovering the Holy Sacrifice of the Mass in the Book of Revelation and the early Church Fathers.',
    thumbnailUrl: 'https://img.youtube.com/vi/1sFMI6vIiH4/maxresdefault.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1200&q=80',
    verified: true,
    likes: '19K',
    christendomUrl: 'https://www.christendom.com'
  },
  {
    id: 'cv-6',
    title: 'Did Jesus Intend the Eucharist to Be Symbolic? | Tim Staples',
    channelId: 'ch-catholicanswers',
    channelName: 'Catholic Answers Live',
    channelAvatar: 'https://yt3.googleusercontent.com/ytc/AIdro_mVshmYIBh_5n_6zbctv3onmWbDUQo6polUcPZjL1Y=s176-c-k-c0x00ffffff-no-rj',
    youtubeId: 'rTNXpLU8p50',
    duration: '12:35',
    views: '195K views',
    publishedAt: 'Catholic Answers Live',
    category: 'Apologetics & Culture',
    description: 'Senior apologist Tim Staples addresses the Bread of Life discourse in John 6, Saint Paul’s warnings in 1 Corinthians 11, and the universal witness of the early Church that the Eucharist is the literal Body, Blood, Soul, and Divinity of Jesus Christ.',
    thumbnailUrl: 'https://img.youtube.com/vi/rTNXpLU8p50/maxresdefault.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80',
    verified: true,
    likes: '16K',
    christendomUrl: 'https://www.christendom.com'
  },
  {
    id: 'cv-7',
    title: 'The Search: What Do You Seek? | Augustine Institute & FORMED',
    channelId: 'ch-augustine',
    channelName: 'Augustine Institute & FORMED',
    channelAvatar: 'https://yt3.googleusercontent.com/c8SAvU-uBojeQEEDkeOs1qbntDhnJ6tY_brmG-8USjn6LNdlKza3OKLSZS2OqT5ciM_cczmj59I=s176-c-k-c0x00ffffff-no-rj',
    youtubeId: 'VUFZiFVfsHE',
    duration: '31:20',
    views: '580K views',
    publishedAt: 'Augustine Institute Studios',
    category: 'Documentaries',
    description: 'An evocative cinematic series from the Augustine Institute hosted by Chris Stefanick, exploring the foundational questions of human existence: Why are we here? What is the purpose of life? Where do we find lasting joy?',
    thumbnailUrl: 'https://img.youtube.com/vi/VUFZiFVfsHE/maxresdefault.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80',
    verified: true,
    likes: '42K',
    christendomUrl: 'https://www.christendom.com'
  },
  {
    id: 'cv-8',
    title: 'Welcome to the Institute of Catholic Culture | Deacon Sabatino Carnazzo',
    channelId: 'ch-icc',
    channelName: 'Institute of Catholic Culture',
    channelAvatar: 'https://yt3.googleusercontent.com/ytc/AIdro_kLo4Wzqbjkld4929HovTthbN0CUMEwQXH2ODvq1ZBmKg=s176-c-k-c0x00ffffff-no-rj',
    youtubeId: 'KhPbUL6TL_U',
    duration: '22:18',
    views: '110K views',
    publishedAt: 'Institute of Catholic Culture',
    category: 'Church History',
    description: 'Deacon Sabatino Carnazzo presents the educational mission of the Institute of Catholic Culture: faithful adult formation in Sacred Scripture, Patristic theology, philosophy, and liturgical heritage.',
    thumbnailUrl: 'https://img.youtube.com/vi/KhPbUL6TL_U/maxresdefault.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1200&q=80',
    verified: true,
    likes: '9.8K',
    christendomUrl: 'https://www.christendom.com'
  },
  {
    id: 'cv-9',
    title: 'The Catholic Church & Sacred Music | EWTN Vatican',
    channelId: 'ch-ewtn',
    channelName: 'EWTN Global Catholic Network',
    channelAvatar: 'https://yt3.googleusercontent.com/aXMeNbOffojVIm0uqTNEUMzmHtA5YxiLzzuj7gAwbuVdsIcv1jx5tkUfMWEEMte4eKT1hasUbJY=s176-c-k-c0x00ffffff-no-rj',
    youtubeId: '1OiLU6-q0Dw',
    duration: '26:40',
    views: '420K views',
    publishedAt: 'EWTN Vatican',
    category: 'Sacred Liturgy & Chant',
    description: 'EWTN Vatican explores the timeless treasure of Catholic sacred music: Gregorian chant, choral polyphony in Rome, and how noble liturgical music elevates the human heart toward heavenly contemplation.',
    thumbnailUrl: 'https://img.youtube.com/vi/1OiLU6-q0Dw/maxresdefault.jpg',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80',
    verified: true,
    likes: '35K',
    christendomUrl: 'https://www.christendom.com'
  }
];
