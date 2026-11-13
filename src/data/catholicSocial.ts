export interface CatholicInstagramSource {
  id: string;
  name: string;
  username: string;
  category: string;
  description: string;
  profileUrl: string;
  defaultShortcodes: string[];
  defaultPosts?: CatholicStaticSocialPost[];
}

export interface CatholicStaticSocialPost {
  id: string;
  shortcode: string;
  typename: string;
  isVideo: boolean;
  imageUrl: string;
  carouselImages: string[];
  caption: string;
  timestamp: number;
  likesCount: number;
  commentsCount: number;
}

export interface CatholicFacebookPost {
  id: string;
  sourceId: string;
  sourceName: string;
  handle: string;
  pageUrl: string;
  postUrl?: string;
  embedUrl?: string;
  avatarUrl?: string;
  postDate: string;
  category: string;
  text: string;
  imageUrl?: string;
  imageAlt?: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  verified: boolean;
}

export interface CatholicFacebookArticlePost {
  id: string;
  sourceId: string;
  sourceName: string;
  handle: string;
  pageUrl: string;
  verified: boolean;
  avatarUrl?: string;
  postDate: string;
  postCaption: string;
  articleTitle: string;
  articleSummary: string;
  articleDomain: string;
  articleUrl: string;
  articleImageUrl: string;
  readTime: string;
  author: string;
  category: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  fullArticleText: string;
}

export interface CatholicFacebookSource {
  id: string;
  name: string;
  handle: string;
  socialUsername: string;
  pageUrl: string;
  category: string;
  description: string;
  staticPosts?: CatholicStaticSocialPost[];
  posts?: CatholicFacebookPost[];
  articles?: CatholicFacebookArticlePost[];
}

export interface CatholicPinterestSource {
  id: string;
  name: string;
  username: string;
  category: string;
  description: string;
  profileUrl: string;
}

export interface PinterestPinItem {
  id: string;
  username: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  imageUrl: string;
  thumbnailUrl: string;
}

export const CATHOLIC_INSTAGRAM_SOURCES: CatholicInstagramSource[] = [
  {
    id: 'ig-aleteia',
    name: 'Aleteia',
    username: 'aleteia_en',
    category: 'Catholic Spirituality & Culture',
    description: 'Catholic spirituality, saint stories, sacred art, and global Church news from Aleteia English.',
    profileUrl: 'https://www.instagram.com/aleteia_en/',
    defaultShortcodes: [
      'DfpUJZ0xB0k', 'DfpK1W4xb3S', 'Dfo-rg0RMqb',
      'Dfnu0i8s2MC', 'Dfm0n9hRMpz', 'Dfmh8OkhKmT',
      'DfhY3dnROGr', 'DfhV7ayR3vY', 'DfhTBSoxxx5',
      'DfcTTagRM-x', 'DfafIKssdp4', 'DfZl4NnxPXg'
    ]
  },
  {
    id: 'ig-ewtnmedia',
    name: 'EWTN Global Catholic Network',
    username: 'ewtnmedia',
    category: 'Global Catholic Television',
    description: 'Daily Catholic prayers, Papal updates, Saint feast days, and Eucharistic devotion from EWTN.',
    profileUrl: 'https://www.instagram.com/ewtnmedia/',
    defaultShortcodes: [
      'Dfp-P1OF_Hg', 'DfprLwqgwpr', 'Dfo5h3_l6sv',
      'DfoBeF9kXp9', 'DfngTDSiK9n', 'DfnQ0GtF_Hl',
      'DfixrNkAvEV', 'DfifRHSEs0s', 'DfiSanZAYHA',
      'Dfh_Zbegkng', 'Dfh1g21kzPj', 'DfhxdSxCiuv'
    ]
  },
  {
    id: 'ig-stpaulcenter',
    name: 'St. Paul Center',
    username: 'stpaulcenter',
    category: 'Biblical Theology',
    description: 'Dr. Scott Hahn and the St. Paul Center reading Sacred Scripture from the heart of the Church.',
    profileUrl: 'https://www.instagram.com/stpaulcenter/',
    defaultShortcodes: [
      'Dfp_3psjr0L', 'DfpEf8bmyQF', 'Dfh1uMPoX7W',
      'Dfe68ZIkVbg', 'DfdcESGCvQn', 'DfapmAaCUPe',
      'DfaTK9hEWFC', 'DfZ4SHSCUgL', 'DfS9kGilc3j',
      'DfP1A9FDSbj'
    ]
  },
  {
    id: 'ig-augustine-institute',
    name: 'Augustine Institute',
    username: 'augustine_institute',
    category: 'Theology & Evangelization',
    description: 'Graduate Catholic theology, Sacred Scripture study, and Catholic formation from the Augustine Institute.',
    profileUrl: 'https://www.instagram.com/augustine_institute/',
    defaultShortcodes: [
      'DfnE00XjRok', 'DfirVlgF0c_', 'DfceIbOAmI9',
      'DfXTjQ7DFU6', 'DfTEQESl5s_', 'DfQkH0XDMGD',
      'DfKUnvWl2YL', 'DfCtqTbPJE3'
    ]
  },
  {
    id: 'ig-formedcatholic',
    name: 'FORMED',
    username: 'formedcatholic',
    category: 'Catholic Faith On Demand',
    description: 'Sacred films, liturgical living, saint documentaries, and Bible studies from FORMED.',
    profileUrl: 'https://www.instagram.com/formedcatholic/',
    defaultShortcodes: [
      'Dfnsot7nOrC', 'DfkH_RyF2ki', 'Dfib6vUF8_F',
      'DfceIbOAmI9', 'DfTQI4NjvCS', 'DfQkH0XDMGD',
      'DfIEdAbjJat', 'DfBGG9ijkSk', 'De-d6KuAMR1'
    ]
  },
  {
    id: 'ig-vaticannews',
    name: 'Vatican News',
    username: 'vaticannews',
    category: 'Holy See & Papal Ministry',
    description: 'Official Instagram feed of Vatican News from the Dicastery for Communication of the Holy See.',
    profileUrl: 'https://www.instagram.com/vaticannews/',
    defaultShortcodes: [
      'DfrC3iTlIAa', 'DfqveEvB7v2', 'DfqliQrtcVr',
      'Dfqf03gNcuq', 'DfqdeWLtbpn', 'Dfqan5VNZff',
      'DfjUesupQwk', 'Dfi_izEkjOb', 'Dfi3QdrDYOM',
      'Dfil318CjiG', 'DfieB-AAGzN', 'DfidozIibtr'
    ]
  },
  {
    id: 'ig-usccb',
    name: 'U.S. Conference of Catholic Bishops (USCCB)',
    username: 'usccb',
    category: 'Episcopal Ministry & Liturgy',
    description: 'Official Instagram of the United States Conference of Catholic Bishops — daily readings, prayers, and pastoral teaching.',
    profileUrl: 'https://www.instagram.com/usccb/',
    defaultShortcodes: [
      'Dfp5fxolyvs', 'DfpKwxolJXx', 'Dfm6ju3l0Er',
      'DfmuD7Gl04z', 'DfkGgxplxUY', 'DfhjtDMl2cp',
      'DfXiNmdCIKN', 'DfUtgl3ju0o', 'DfUhCHSF4ea',
      'DfShAinlwx8', 'DfSErQgFwg0', 'DfQAXstiZS3'
    ]
  },
  {
    id: 'ig-icc',
    name: 'Institute of Catholic Culture',
    username: 'instituteofcatholicculture',
    category: 'Catechesis & Patristics',
    description: 'Orthodox Catholic adult catechesis in Sacred Scripture, Church history, philosophy, and patristics.',
    profileUrl: 'https://www.instagram.com/instituteofcatholicculture/',
    defaultShortcodes: [
      'Dfp5hCCgUqm', 'DfnQRIzAYn-', 'Dfk0rDejPrI',
      'DfXs4C3Gzvn', 'DfVI5B6m-fC', 'DfQPZbPm2a7',
      'DfTKen8F78Y', 'DfS9UiAF9SP', 'DfLnJc1OX1i'
    ]
  },
  {
    id: 'ig-spiritualdirection',
    name: 'SpiritualDirection.com',
    username: 'catholicspiritualdirection',
    category: 'Contemplative Prayer & Interior Life',
    description: 'Faithful Catholic spiritual direction, mental prayer, mystical theology, and wisdom of the Saints.',
    profileUrl: 'https://www.instagram.com/catholicspiritualdirection/',
    defaultShortcodes: [
      'Dfp3ToJl4uY', 'Dfktya3lXZg', 'DfiI_SMFzp4',
      'DffkIl3jBdg', 'Dfc_Wwiildx', 'DfX1znejFBR',
      'DfVQ9IjDAjV', 'DfUlBvQkfvQ', 'DfQHW31l1NW',
      'DfNAPJwF7yw'
    ]
  },
  {
    id: 'ig-wordonfire',
    name: 'Word on Fire (Bishop Robert Barron)',
    username: 'bishopbarron',
    category: 'Theology & Culture',
    description: 'Bishop Robert Barron and Word on Fire proclaiming Christ in the culture through beauty, truth, and goodness.',
    profileUrl: 'https://www.instagram.com/bishopbarron/',
    defaultShortcodes: [
      'DfqaJhyivBL', 'Dfm-d25DFGB', 'DfmrtC5DWNE',
      'DficXEZgN-q', 'DfhnBF4Fx4l', 'DfeusKXgPq3',
      'DfaO1PQFaLj', 'DfTUkWNkSBB', 'DfSwL9Hmo7s',
      'DfPsQBNl7NE', 'DfN0eTWjKoU', 'DfM53G4CF5z'
    ]
  },
  {
    id: 'ig-catholicanswers',
    name: 'Catholic Answers',
    username: 'catholicanswers',
    category: 'Apologetics & Evangelization',
    description: 'Clear explanations of Catholic doctrine, apologetics Q&As, and feast day reflections from Catholic.com.',
    profileUrl: 'https://www.instagram.com/catholicanswers/',
    defaultShortcodes: [
      'DfnwC00Dg-k', 'Dfk4cH-Ghdo', 'Dfk2XuNya3Y',
      'DficRbhjQBQ', 'DfhraB9j1cF', 'DfazpyEgaIa',
      'DfZsT64CpxV', 'DfXqqsiPUPV', 'DeSnw6_lH9p',
      'DBxAS6lSs_y', 'DbWIP8YEQ-v', 'DZfp_gcoPmp'
    ]
  },
  {
    id: 'ig-ncregister',
    name: 'National Catholic Register',
    username: 'ncregister',
    category: 'Catholic Journalism',
    description: 'Fidelity to the Magisterium — visual stories, sacred liturgy, and news from the National Catholic Register.',
    profileUrl: 'https://www.instagram.com/ncregister/',
    defaultShortcodes: [
      'DfqzLLaujKp', 'Dfqbbcbx2kW', 'DfqBom4F-Gy',
      'Dfp7QrWjksQ', 'Dfp1bsLv5LE', 'DfpX7tFg8xK',
      'Dfi_an2u1pU', 'DfisrCsRUIZ', 'Dfig-05l9K2',
      'DfiXPl9Mxa-', 'DfiN65uSiSF', 'DfiK2eMOvT4'
    ]
  }
];

export const CATHOLIC_FACEBOOK_SOURCES: CatholicFacebookSource[] = [
  {
    id: 'fb-ewtnafrica',
    name: 'EWTN Africa',
    handle: '@EWTNAfrica',
    socialUsername: 'EWTNAfrica',
    pageUrl: 'https://www.facebook.com/EWTNAfrica',
    category: 'Catholic Media in Africa',
    description: 'Faithful Catholic media, Papal news, feast day reflections, and African Church testimonies from EWTN Africa on Facebook.'
  },
  {
    id: 'fb-ewtnasia',
    name: 'EWTN Asia',
    handle: '@EWTNasia',
    socialUsername: 'EWTNasia',
    pageUrl: 'https://www.facebook.com/EWTNasia',
    category: 'Catholic Media in Asia',
    description: 'Fidelity to the Church across Asia & Oceania — Catholic prayers, saint reflections, and global Asian apostolates from EWTN Asia.'
  },
  {
    id: 'fb-aleteia',
    name: 'Aleteia',
    handle: '@aleteia_en',
    socialUsername: 'aleteia_en',
    pageUrl: 'https://www.facebook.com/aleteia.en',
    category: 'Catholic Spirituality & Culture',
    description: 'Catholic spirituality, saint stories, sacred art, and global Church news from Aleteia English on Facebook.'
  },
  {
    id: 'fb-ewtn',
    name: 'EWTN Global Catholic Network',
    handle: '@ewtnonline',
    socialUsername: 'ewtnonline',
    pageUrl: 'https://www.facebook.com/ewtnonline',
    category: 'Global Catholic Television',
    description: 'Daily Catholic prayers, Papal updates, Saint feast days, and Eucharistic devotion from EWTN.'
  },
  {
    id: 'fb-stpaulcenter',
    name: 'St. Paul Center',
    handle: '@stpaulcenter',
    socialUsername: 'stpaulcenter',
    pageUrl: 'https://www.facebook.com/stpaulcenter',
    category: 'Biblical Theology',
    description: 'Dr. Scott Hahn and the St. Paul Center reading Sacred Scripture from the heart of the Church.'
  },
  {
    id: 'fb-augustine-institute',
    name: 'Augustine Institute',
    handle: '@AugustineInstitute',
    socialUsername: 'AugustineInstitute',
    pageUrl: 'https://www.facebook.com/AugustineInstitute',
    category: 'Theology & Evangelization',
    description: 'Graduate Catholic theology, Sacred Scripture study, and Catholic formation from the Augustine Institute.'
  },
  {
    id: 'fb-formedcatholic',
    name: 'FORMED',
    handle: '@FORMEDCatholic',
    socialUsername: 'FORMEDCatholic',
    pageUrl: 'https://www.facebook.com/FORMEDCatholic',
    category: 'Catholic Faith On Demand',
    description: 'Sacred films, liturgical living, saint documentaries, and Bible studies from FORMED.'
  },
  {
    id: 'fb-vaticannews',
    name: 'Vatican News',
    handle: '@vaticannews',
    socialUsername: 'vaticannews',
    pageUrl: 'https://www.facebook.com/vaticannews',
    category: 'Holy See & Papal Ministry',
    description: 'Official Facebook feed of Vatican News from the Dicastery for Communication of the Holy See.'
  },
  {
    id: 'fb-usccb',
    name: 'U.S. Conference of Catholic Bishops (USCCB)',
    handle: '@usccb',
    socialUsername: 'usccb',
    pageUrl: 'https://www.facebook.com/usccb',
    category: 'Episcopal Ministry & Liturgy',
    description: 'Official Facebook of the United States Conference of Catholic Bishops — daily readings, prayers, and pastoral teaching.'
  },
  {
    id: 'fb-icc',
    name: 'Institute of Catholic Culture',
    handle: '@InstituteofCatholicCulture',
    socialUsername: 'InstituteofCatholicCulture',
    pageUrl: 'https://www.facebook.com/InstituteofCatholicCulture',
    category: 'Catechesis & Patristics',
    description: 'Orthodox Catholic adult catechesis in Sacred Scripture, Church history, philosophy, and patristics.'
  },
  {
    id: 'fb-spiritualdirection',
    name: 'SpiritualDirection.com',
    handle: '@CatholicSpiritualDirection',
    socialUsername: 'CatholicSpiritualDirection',
    pageUrl: 'https://www.facebook.com/CatholicSpiritualDirection',
    category: 'Contemplative Prayer & Interior Life',
    description: 'Faithful Catholic spiritual direction, mental prayer, mystical theology, and wisdom of the Saints.'
  },
  {
    id: 'fb-ncregister',
    name: 'National Catholic Register',
    handle: '@NCRegister',
    socialUsername: 'NCRegister',
    pageUrl: 'https://www.facebook.com/NCRegister',
    category: 'Catholic Journalism & News',
    description: 'Fidelity to the Magisterium — Catholic journalism, Church news, Papal coverage, and liturgical analysis from the National Catholic Register.'
  }
];

export const CATHOLIC_FACEBOOK_POSTS: CatholicFacebookPost[] = [
  // 0. EWTN Africa (Featured User Embed)
  {
    id: 'fb-post-ewtnafrica-1',
    sourceId: 'fb-ewtnafrica',
    sourceName: 'EWTN Africa',
    handle: '@EWTNAfrica',
    pageUrl: 'https://www.facebook.com/EWTNAfrica',
    postUrl: 'https://www.facebook.com/EWTNAfrica/posts/pfbid02dHUKotdNF9Ax2on8Ktr5cQDhpW6DoWcpqh6G7upT9Z7tDaRXDWeN5AE2D45bYQoBl',
    embedUrl: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FEWTNAfrica%2Fposts%2Fpfbid02dHUKotdNF9Ax2on8Ktr5cQDhpW6DoWcpqh6G7upT9Z7tDaRXDWeN5AE2D45bYQoBl&show_text=true&width=500',
    avatarUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=120&q=80',
    verified: true,
    postDate: 'EWTN Africa Post',
    category: 'EWTN Africa & Catholic Faith',
    text: `EWTN Africa — Eternal Word Television Network in Africa. Proclaiming Catholic faith, liturgical celebration, and Papal guidance across the African continent and the world.`,
    imageUrl: 'https://images.unsplash.com/photo-1548625361-1959779df3a8?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Catholic Mass and faith community in Africa',
    likesCount: 15400,
    commentsCount: 1280,
    sharesCount: 6420
  },
  // 0b. EWTN Asia (Featured User Embed)
  {
    id: 'fb-post-ewtnasia-1',
    sourceId: 'fb-ewtnasia',
    sourceName: 'EWTN Asia',
    handle: '@EWTNasia',
    pageUrl: 'https://www.facebook.com/EWTNasia',
    postUrl: 'https://www.facebook.com/EWTNasia/posts/pfbid02hCX86UMvAQYLxa8Q9LwnQ5SFK4sho8XCzLythbbPYwFh9byWnR5d6s2gg7evXivil',
    embedUrl: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FEWTNasia%2Fposts%2Fpfbid02hCX86UMvAQYLxa8Q9LwnQ5SFK4sho8XCzLythbbPYwFh9byWnR5d6s2gg7evXivil&show_text=true&width=500',
    avatarUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=120&q=80',
    verified: true,
    postDate: 'EWTN Asia Post',
    category: 'EWTN Asia & Gospel Witness',
    text: `EWTN Asia — Eternal Word Television Network Asia. Serving the Church in Asia and Oceania with daily Mass, Marian devotion, and Catholic news.`,
    imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Catholic sanctuary and altar of Christ in Asia',
    likesCount: 18200,
    commentsCount: 1450,
    sharesCount: 7100
  },
  // 0c. NCRegister (Featured User Embed)
  {
    id: 'fb-post-ncregister-1',
    sourceId: 'fb-ncregister',
    sourceName: 'National Catholic Register',
    handle: '@NCRegister',
    pageUrl: 'https://www.facebook.com/NCRegister',
    postUrl: 'https://www.facebook.com/NCRegister/posts/pfbid0M2zP7Kobgk1qALXucs9cNVdQ9yAcuPxrKvDyY2DULoUTbkdXq2BARv12WtGy7GYZl',
    embedUrl: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2FNCRegister%2Fposts%2Fpfbid0M2zP7Kobgk1qALXucs9cNVdQ9yAcuPxrKvDyY2DULoUTbkdXq2BARv12WtGy7GYZl&show_text=true&width=500',
    avatarUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=120&q=80',
    verified: true,
    postDate: 'NCRegister Featured Post',
    category: 'Catholic Journalism & Magisterium',
    text: `National Catholic Register — Providing Catholic news and analysis with fidelity to the Magisterium of the Church.`,
    imageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'National Catholic Register journalism and sacred news',
    likesCount: 16800,
    commentsCount: 1120,
    sharesCount: 5490
  },
  // 0c2. Vatican News (Featured User Embed)
  {
    id: 'fb-post-vatican-embed-1',
    sourceId: 'fb-vaticannews',
    sourceName: 'Vatican News',
    handle: '@vaticannews',
    pageUrl: 'https://www.facebook.com/vaticannews',
    postUrl: 'https://www.facebook.com/vaticannews/posts/pfbid02aoXsGmtQerkYXouJzdGDdpcE8kkrnWrd6h8djpL9cNCKqa7qhocZGiYsweHyY3JUl',
    embedUrl: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fvaticannews%2Fposts%2Fpfbid02aoXsGmtQerkYXouJzdGDdpcE8kkrnWrd6h8djpL9cNCKqa7qhocZGiYsweHyY3JUl&show_text=true&width=500',
    avatarUrl: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=120&q=80',
    verified: true,
    postDate: 'Vatican News Featured Post',
    category: 'Holy See & Papal Ministry',
    text: `Vatican News — Official news service of the Holy See. Bringing the voice of the Pope and global Church news to faithful believers worldwide.`,
    imageUrl: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'St. Peter’s Basilica and the Holy See at Vatican City',
    likesCount: 24500,
    commentsCount: 1890,
    sharesCount: 9240
  },
  // 0d. Catholic Social Community Post (Featured User Embed)
  {
    id: 'fb-post-user-permalink-1',
    sourceId: 'fb-ewtn',
    sourceName: 'Catholic Faith Community',
    handle: '@CatholicCommunity',
    pageUrl: 'https://www.facebook.com/permalink.php?story_fbid=pfbid025JYCJp6RiyWZDP1F7hvdBGSEwmnHHJXXj14MXRrbZmZrkt4azboRZJGZNjCpXqeZl&id=100085925378028',
    postUrl: 'https://www.facebook.com/permalink.php?story_fbid=pfbid025JYCJp6RiyWZDP1F7hvdBGSEwmnHHJXXj14MXRrbZmZrkt4azboRZJGZNjCpXqeZl&id=100085925378028',
    embedUrl: 'https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fpermalink.php%3Fstory_fbid%3Dpfbid025JYCJp6RiyWZDP1F7hvdBGSEwmnHHJXXj14MXRrbZmZrkt4azboRZJGZNjCpXqeZl%26id%3D100085925378028&show_text=true&width=500',
    avatarUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=120&q=80',
    verified: true,
    postDate: 'Catholic Community Post',
    category: 'Catholic Community & Devotion',
    text: `Catholic Faith Reflection — Seeking Christ through prayer, sacred liturgy, and community fellowship.`,
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Catholic prayer chapel bathed in quiet morning light',
    likesCount: 12400,
    commentsCount: 980,
    sharesCount: 4520
  },
  // 1. Aleteia
  {
    id: 'fb-post-aleteia-1',
    sourceId: 'fb-aleteia',
    sourceName: 'Aleteia',
    handle: '@aleteia_en',
    pageUrl: 'https://www.facebook.com/aleteia.en',
    avatarUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=120&q=80',
    verified: true,
    postDate: 'Yesterday at 2:30 PM',
    category: 'Sacred Silence & Prayer',
    text: `Feeling mentally drained or anxious? A parish priest in Ars, France, noticed a local farmer sitting alone in the village church for hours every afternoon.

Saint John Vianney approached him and asked: "My friend, what do you do here for so long?"

The peasant looked up with serenity and replied: "Nothing, Monsieur le Curé. I look at Him, and He looks at me."

Take five minutes today to sit quietly before the Blessed Sacrament. Sacred silence heals what the noise of the world fractures.`,
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Quiet sanctuary pew bathed in soft morning sunlight for contemplative prayer',
    likesCount: 8640,
    commentsCount: 520,
    sharesCount: 2890
  },
  {
    id: 'fb-post-aleteia-2',
    sourceId: 'fb-aleteia',
    sourceName: 'Aleteia',
    handle: '@aleteia_en',
    pageUrl: 'https://www.facebook.com/aleteia.en',
    avatarUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=120&q=80',
    verified: true,
    postDate: '3 days ago',
    category: 'Saints & Interior Peace',
    text: `Saint Teresa of Ávila carried this bookmark in her breviary her entire life:

"Let nothing disturb you,
Let nothing frighten you,
All things are passing away:
God never changes.
Patience obtains all things.
Whoever has God lacks nothing;
God alone suffices."

Whatever trial or cross you are carrying today, hold fast to Jesus Christ. His grace is more than enough for you.`,
    imageUrl: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Glowing Gothic stained glass window filling a sacred Catholic chapel with warm light',
    likesCount: 11200,
    commentsCount: 780,
    sharesCount: 4320
  },

  // 2. EWTN Global Catholic Network
  {
    id: 'fb-post-ewtn-1',
    sourceId: 'fb-ewtn',
    sourceName: 'EWTN Global Catholic Network',
    handle: '@ewtnonline',
    pageUrl: 'https://www.facebook.com/ewtnonline',
    avatarUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=120&q=80',
    verified: true,
    postDate: 'Yesterday at 4:15 PM',
    category: 'The Holy Rosary & Prayer',
    text: `Saint Padre Pio called the Rosary "the weapon for our times." In the Holy Rosary, we do not simply repeat words; we contemplate the face of Jesus Christ through the immaculate eyes and maternal heart of the Virgin Mary.

Take fifteen minutes today to pray five decades of the Rosary for your family, your priests, and for peace in the world.

Our Lady promised: "Whoever shall faithfully serve me by the recitation of the Rosary, shall receive signal graces."`,
    imageUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Traditional wooden Catholic Rosary beads with sacred crucifix',
    likesCount: 14700,
    commentsCount: 1040,
    sharesCount: 5210
  },
  {
    id: 'fb-post-ewtn-2',
    sourceId: 'fb-ewtn',
    sourceName: 'EWTN Global Catholic Network',
    handle: '@ewtnonline',
    pageUrl: 'https://www.facebook.com/ewtnonline',
    avatarUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=120&q=80',
    verified: true,
    postDate: '4 days ago',
    category: 'Mother Angelica Wisdom',
    text: `Mother Angelica reminds us: "Unless you are willing to do the ridiculous, God cannot do the miraculous. When you step out in faith for Jesus, do not look at your own smallness—look at His boundless majesty!"

Never let human fear, worldly doubt, or smallness of spirit stop you from responding to God’s call. He is faithful to the very end.`,
    imageUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'The Holy Cross of Christ rising against the radiant morning sky',
    likesCount: 12500,
    commentsCount: 890,
    sharesCount: 4190
  },

  // 3. St. Paul Center
  {
    id: 'fb-post-stpaul-1',
    sourceId: 'fb-stpaulcenter',
    sourceName: 'St. Paul Center',
    handle: '@stpaulcenter',
    pageUrl: 'https://www.facebook.com/stpaulcenter',
    avatarUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=120&q=80',
    verified: true,
    postDate: '2 days ago',
    category: 'Biblical Theology & Holy Mass',
    text: `Dr. Scott Hahn: "When I was a Protestant pastor, the Book of Revelation was an enigma of dragons, beasts, and trumpets. But on the morning I quietly slipped into the back of a Catholic chapel for daily Mass, scales fell from my eyes."

In the Mass, we hear: "Holy, Holy, Holy is the Lord God Almighty." We see the altar, the golden chalice, the incense, the candles, and the chant of the Lamb of God.

Saint John was revealing the heavenly liturgy. In the Holy Mass, heaven touches earth.`,
    imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Reverent Catholic sanctuary with the high altar and golden tabernacle',
    likesCount: 10400,
    commentsCount: 670,
    sharesCount: 3510
  },
  {
    id: 'fb-post-stpaul-2',
    sourceId: 'fb-stpaulcenter',
    sourceName: 'St. Paul Center',
    handle: '@stpaulcenter',
    pageUrl: 'https://www.facebook.com/stpaulcenter',
    avatarUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=120&q=80',
    verified: true,
    postDate: '5 days ago',
    category: 'Sacred Scripture & The Word of God',
    text: `Ignorance of Scripture is ignorance of Christ, wrote Saint Jerome. When you open your Catholic Bible, God is not communicating distant memories from the ancient past—He is speaking directly into your life today.

"For the word of God is living and active, sharper than any two-edged sword." (Hebrews 4:12)

Make a commitment to read the daily Mass readings each morning before opening emails or social media. Let God's Word shape your soul.`,
    imageUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Open Catholic Holy Bible bathed in warm morning light',
    likesCount: 8900,
    commentsCount: 540,
    sharesCount: 3100
  },

  // 4. Augustine Institute
  {
    id: 'fb-post-augustine-1',
    sourceId: 'fb-augustine-institute',
    sourceName: 'Augustine Institute',
    handle: '@AugustineInstitute',
    pageUrl: 'https://www.facebook.com/AugustineInstitute',
    avatarUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=120&q=80',
    verified: true,
    postDate: 'Yesterday at 1:00 PM',
    category: 'Saint Augustine & Catholic Wisdom',
    text: `Saint Augustine in his Confessions: "You were within me, but I was in the world outside myself. I sought You there, and in my unlovely state I plunged into those lovely created things which You made. You were with me, and I was not with You."

"Late have I loved You, O Beauty ever ancient, ever new! Late have I loved You!"

God is closer to us than we are to ourselves. Turn inward in silent prayer today and listen to the voice of the divine Physician.`,
    imageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Historic theological manuscripts and Catholic scholarly library bathed in candlelight',
    likesCount: 9340,
    commentsCount: 620,
    sharesCount: 3280
  },
  {
    id: 'fb-post-augustine-2',
    sourceId: 'fb-augustine-institute',
    sourceName: 'Augustine Institute',
    handle: '@AugustineInstitute',
    pageUrl: 'https://www.facebook.com/AugustineInstitute',
    avatarUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=120&q=80',
    verified: true,
    postDate: '4 days ago',
    category: 'Theological Formation & Grace',
    text: `Faith seeks understanding (fides quaerens intellectum). The Catholic faith is not a blind leap into the dark; it is a radiant leap into the Light of Christ that illuminates every corner of reality.

When we study theology from the heart of the Church, our love for Jesus Christ deepens from mere sentiment into unbreakable conviction.

"You have made us for Yourself, O Lord, and our hearts are restless until they rest in You."`,
    imageUrl: 'https://images.unsplash.com/photo-1548625361-1959779df3a8?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Majestic cathedral arches with morning light pouring down upon the sanctuary',
    likesCount: 7820,
    commentsCount: 490,
    sharesCount: 2650
  },

  // 5. FORMED
  {
    id: 'fb-post-formed-1',
    sourceId: 'fb-formedcatholic',
    sourceName: 'FORMED',
    handle: '@FORMEDCatholic',
    pageUrl: 'https://www.facebook.com/FORMEDCatholic',
    avatarUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=120&q=80',
    verified: true,
    postDate: '2 days ago',
    category: 'Liturgical Living & Catholic Culture',
    text: `How do we cultivate a truly Catholic home? By filling the domestic church with the rhythm of the liturgical seasons, the beauty of sacred art, and regular family prayer.

Hang a crucifix in every room. Keep holy water by the front door. Gather at the dinner table to share the story of the Saint of the Day.

"As for me and my house, we will serve the Lord." (Joshua 24:15)`,
    imageUrl: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Sacred image of Jesus Christ revealing His Sacred Heart to all families',
    likesCount: 8940,
    commentsCount: 512,
    sharesCount: 3180
  },
  {
    id: 'fb-post-formed-2',
    sourceId: 'fb-formedcatholic',
    sourceName: 'FORMED',
    handle: '@FORMEDCatholic',
    pageUrl: 'https://www.facebook.com/FORMEDCatholic',
    avatarUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=120&q=80',
    verified: true,
    postDate: '5 days ago',
    category: 'Saint of the Day & Evangelization',
    text: `Saint Francis of Assisi did not merely talk about the Gospel; he became the living Gospel for everyone who crossed his path.

When the world is fractured by cynicism, anger, and despair, the holiness of one Christian can ignite a revival across the entire Church.

Lord, make me an instrument of Your peace: where there is hatred, let me sow love; where there is injury, pardon; where there is despair, hope.`,
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Peaceful Franciscan cloister stone walkway illuminated by peaceful sunlight',
    likesCount: 9780,
    commentsCount: 630,
    sharesCount: 3410
  },

  // 6. Vatican News
  {
    id: 'fb-post-vatican-1',
    sourceId: 'fb-vaticannews',
    sourceName: 'Vatican News',
    handle: '@vaticannews',
    pageUrl: 'https://www.facebook.com/vaticannews',
    avatarUrl: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=120&q=80',
    verified: true,
    postDate: 'Yesterday at 11:30 AM',
    category: 'Papal Angelus & Global Peace',
    text: `Pope at the Angelus: "Peace is not merely the absence of conflict; it is the gift of Christ’s presence in our hearts, working through justice, mutual respect, and maternal forgiveness."

Addressing thousands of pilgrims gathered in St. Peter’s Square, the Holy Father urged the faithful worldwide to pray without ceasing for victims of violence and for peace across our troubled world.

"Let us place all our brothers and sisters under the loving protection of Mary, Queen of Peace."`,
    imageUrl: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'St. Peter’s Basilica and thousands of pilgrims gathered in St. Peter’s Square at the Vatican',
    likesCount: 14200,
    commentsCount: 920,
    sharesCount: 4180
  },
  {
    id: 'fb-post-vatican-2',
    sourceId: 'fb-vaticannews',
    sourceName: 'Vatican News',
    handle: '@vaticannews',
    pageUrl: 'https://www.facebook.com/vaticannews',
    avatarUrl: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=120&q=80',
    verified: true,
    postDate: '3 days ago',
    category: 'Holy See & Papal Ministry',
    text: `"The Eucharist is not a prize for the perfect, but a powerful medicine and nourishment for the weak."

At morning Mass in the Vatican, the Holy Father reminded pastors and the faithful that the heart of Jesus Christ beats with infinite mercy for every weary soul who walks through the doors of the Church. Come to Him with trust.`,
    imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'High altar and sanctuary illuminated within St. Peter’s Basilica',
    likesCount: 11800,
    commentsCount: 640,
    sharesCount: 3240
  },

  // 7. USCCB
  {
    id: 'fb-post-usccb-1',
    sourceId: 'fb-usccb',
    sourceName: 'U.S. Conference of Catholic Bishops (USCCB)',
    handle: '@usccb',
    pageUrl: 'https://www.facebook.com/usccb',
    avatarUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=120&q=80',
    verified: true,
    postDate: 'Yesterday at 9:00 AM',
    category: 'Daily Gospel Reflection',
    text: `Daily Gospel Reflection (Matthew 5:1-12): "Blessed are the poor in spirit, for theirs is the kingdom of heaven."

Jesus turns worldly values upside down. True blessedness does not come from wealth, fame, or self-sufficiency, but from total dependence upon God's merciful fatherhood.

Today, ask the Holy Spirit to teach you humility of heart so you may recognize Christ in the hungry, the stranger, and the forgotten.`,
    imageUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Holy Gospel book and liturgical candles illuminated on the lectern',
    likesCount: 9800,
    commentsCount: 610,
    sharesCount: 3200
  },
  {
    id: 'fb-post-usccb-2',
    sourceId: 'fb-usccb',
    sourceName: 'U.S. Conference of Catholic Bishops (USCCB)',
    handle: '@usccb',
    pageUrl: 'https://www.facebook.com/usccb',
    avatarUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=120&q=80',
    verified: true,
    postDate: '4 days ago',
    category: 'National Eucharistic Revival',
    text: `National Eucharistic Revival: "My flesh is true food, and my blood is true drink. Whoever feeds on my flesh and drinks my blood abides in me, and I in him." (John 6:55-56)

The greatest gift Jesus left us is Himself in the Blessed Sacrament. When you receive Holy Communion, you are united to the living God.

Spend an hour in Eucharistic adoration this week. Kneel before the King of Kings and let His Eucharistic love heal your soul.`,
    imageUrl: 'https://images.unsplash.com/photo-1548625361-1959779df3a8?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'The Blessed Sacrament exposed in a golden monstrance during parish Eucharistic adoration',
    likesCount: 12900,
    commentsCount: 940,
    sharesCount: 4890
  },

  // 8. Institute of Catholic Culture
  {
    id: 'fb-post-icc-1',
    sourceId: 'fb-icc',
    sourceName: 'Institute of Catholic Culture',
    handle: '@InstituteofCatholicCulture',
    pageUrl: 'https://www.facebook.com/InstituteofCatholicCulture',
    avatarUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=120&q=80',
    verified: true,
    postDate: '2 days ago',
    category: 'The Early Church Fathers & Patristics',
    text: `Saint Irenaeus of Lyons (c. 130–202 AD): "The glory of God is a human being fully alive; and the life of man consists in beholding God."

The Early Church Fathers did not see theology as dry academic theory, but as the pathway to theosis—divinization through participation in the life of the Holy Trinity.

Rediscover the ancient beauty of Patristic wisdom. As the Fathers proclaimed: What Christ has not assumed, He has not redeemed!`,
    imageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Illuminated Patristic Greek manuscripts and sacred icons in a monastery scriptorium',
    likesCount: 7650,
    commentsCount: 480,
    sharesCount: 2940
  },
  {
    id: 'fb-post-icc-2',
    sourceId: 'fb-icc',
    sourceName: 'Institute of Catholic Culture',
    handle: '@InstituteofCatholicCulture',
    pageUrl: 'https://www.facebook.com/InstituteofCatholicCulture',
    avatarUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=120&q=80',
    verified: true,
    postDate: '6 days ago',
    category: 'Sacred Liturgy & Sacred Music',
    text: `Why is the Sacred Liturgy adorned with Gregorian chant, incense, and sacred vestments? Because worship on earth is a participation in the eternal heavenly liturgy before the throne of the Lamb.

When the bells toll and incense rises at the consecration, time stops. We stand at the foot of Mount Calvary, and we enter the heavenly Jerusalem.

"Let all mortal flesh keep silence, and with fear and trembling stand."`,
    imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Incense smoke rising gently before the altar during the solemn Catholic Mass',
    likesCount: 8420,
    commentsCount: 530,
    sharesCount: 3120
  },

  // 9. SpiritualDirection.com
  {
    id: 'fb-post-sd-1',
    sourceId: 'fb-spiritualdirection',
    sourceName: 'SpiritualDirection.com',
    handle: '@CatholicSpiritualDirection',
    pageUrl: 'https://www.facebook.com/CatholicSpiritualDirection',
    avatarUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=120&q=80',
    verified: true,
    postDate: 'Yesterday at 5:00 PM',
    category: 'Contemplative Prayer & Interior Life',
    text: `Saint Teresa of Jesus writes: "Mental prayer, in my opinion, is nothing else than an intimate sharing between friends; it means taking time frequently to be alone with Him who we know loves us."

Many souls abandon prayer when distractions come or feelings fade. But true prayer is an act of the will, not an emotional surge.

Stay with Jesus in the chapel or your prayer corner. Even five minutes of faithful presence draws down boundless graces.`,
    imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Solitary Catholic prayer chapel bathed in peaceful morning light',
    likesCount: 9140,
    commentsCount: 670,
    sharesCount: 3620
  },
  {
    id: 'fb-post-sd-2',
    sourceId: 'fb-spiritualdirection',
    sourceName: 'SpiritualDirection.com',
    handle: '@CatholicSpiritualDirection',
    pageUrl: 'https://www.facebook.com/CatholicSpiritualDirection',
    avatarUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=120&q=80',
    verified: true,
    postDate: '4 days ago',
    category: 'Saint John of the Cross & The Dark Night',
    text: `Saint John of the Cross teaches that when God withholds sensible consolations, He is not abandoning the soul—He is weaning it from spiritual infancy to mature divine love.

In the dark night, the soul learns to love God for His own sake, rather than for the spiritual sweetness He gives.

"In the evening of life, we will be judged on love alone." Persevere in prayer through the dry seasons!`,
    imageUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Crucifix with quiet candle glow illuminating sacred prayer in the dark night',
    likesCount: 8850,
    commentsCount: 590,
    sharesCount: 3340
  }
];

// Backwards-compatibility alias
export const CATHOLIC_FACEBOOK_ARTICLES: CatholicFacebookArticlePost[] = [];

export const CATHOLIC_PINTEREST_SOURCES: CatholicPinterestSource[] = [
  {
    id: 'pin-catholicanswers',
    name: 'Catholic Answers',
    username: 'catholicanswers',
    category: 'Saints, Prayers & Apologetics',
    description: 'Feast day cards, patron saint graphics, Catholic prayers, and apologetics visual guides.',
    profileUrl: 'https://www.pinterest.com/catholicanswers/'
  },
  {
    id: 'pin-franciscanmedia',
    name: 'Franciscan Media',
    username: 'franciscanmedia',
    category: 'Saint of the Day & Spirituality',
    description: 'Inspirational quotes from the Saints, Franciscan spirituality, and liturgical season meditations.',
    profileUrl: 'https://www.pinterest.com/franciscanmedia/'
  },
  {
    id: 'pin-catholiccompany',
    name: 'The Catholic Company',
    username: 'catholiccompany',
    category: 'Catholic Devotion & Liturgical Living',
    description: 'Traditional Catholic prayers, Marian devotion, sacred art, and feast day inspiration.',
    profileUrl: 'https://www.pinterest.com/catholiccompany/'
  },
  {
    id: 'pin-ascensionpress',
    name: 'Ascension',
    username: 'ascensionpress',
    category: 'Scripture & Faith Formation',
    description: 'Bible study charts, Rosary guides, saint quotes, and Catholic spiritual formation graphics.',
    profileUrl: 'https://www.pinterest.com/ascensionpress/'
  },
  {
    id: 'pin-loyolapress',
    name: 'Loyola Press',
    username: 'loyolapress',
    category: 'Ignatian Spirituality & Catechesis',
    description: '3-Minute Retreats, Ignatian prayer visuals, liturgical calendar activities, and catechetical resources.',
    profileUrl: 'https://www.pinterest.com/loyolapress/'
  },
  {
    id: 'pin-catholicicing',
    name: 'Catholic Icing',
    username: 'catholicicing',
    category: 'Liturgical Year & Family Faith',
    description: 'Creative liturgical living ideas, feast day traditions, and Catholic visual resources.',
    profileUrl: 'https://www.pinterest.com/catholicicing/'
  },
  {
    id: 'pin-ignatiuspress',
    name: 'Ignatius Press',
    username: 'ignatiuspress',
    category: 'Catholic Classics & Sacred Cinema',
    description: 'Catholic literature, Papal encyclicals, sacred films, and theological classics.',
    profileUrl: 'https://www.pinterest.com/ignatiuspress/'
  },
  {
    id: 'pin-tanbooks',
    name: 'TAN Books',
    username: 'tanbooks',
    category: 'Traditional Catholic Treasury',
    description: 'Classic lives of the Saints, spiritual warfare, Eucharistic devotion, and Catholic heritage.',
    profileUrl: 'https://www.pinterest.com/tanbooks/'
  }
];

export const INITIAL_PINTEREST_PINS_FALLBACK: PinterestPinItem[] = [
  {
    id: 'https://www.pinterest.com/pin/490962796896630722/',
    username: 'catholicanswers',
    title: 'Ash Wednesday marks the start of Lent—a time for repentance, fasting, and spiritual growth.',
    description: 'Ash Wednesday marks the start of Lent—a time for repentance, fasting, and spiritual growth. Deepen your interior life through daily prayer, fasting, and almsgiving in union with the universal Church.',
    link: 'https://www.pinterest.com/pin/490962796896630722/',
    pubDate: 'Wed, 05 Mar 2025 23:34:40 GMT',
    imageUrl: 'https://i.pinimg.com/736x/12/33/ef/1233ef94aed67530b3a572a47f257068.jpg',
    thumbnailUrl: 'https://i.pinimg.com/236x/12/33/ef/1233ef94aed67530b3a572a47f257068.jpg'
  },
  {
    id: 'https://www.pinterest.com/pin/490962796896407104/',
    username: 'catholicanswers',
    title: 'Saint Francis de Sales Feast Day & Intercessory Prayer',
    description: 'Saint Francis de Sales, Doctor of the Church and patron of Catholic writers and journalists — pray for us that we may speak the truth in charity.',
    link: 'https://www.pinterest.com/pin/490962796896407104/',
    pubDate: 'Sat, 08 Feb 2025 00:05:41 GMT',
    imageUrl: 'https://i.pinimg.com/736x/65/25/5d/65255d6b022dd888e97d45a311aabffd.jpg',
    thumbnailUrl: 'https://i.pinimg.com/236x/65/25/5d/65255d6b022dd888e97d45a311aabffd.jpg'
  },
  {
    id: 'https://www.pinterest.com/pin/490962796896407080/',
    username: 'catholicanswers',
    title: 'Saint Vincent — Witness of Heroic Faith and Intercession',
    description: 'Celebrating the witness of the martyrs and saints of the Church through prayer, Sacred Scripture, and intercession.',
    link: 'https://www.pinterest.com/pin/490962796896407080/',
    pubDate: 'Sat, 08 Feb 2025 00:02:05 GMT',
    imageUrl: 'https://i.pinimg.com/736x/72/0a/b0/720ab0e184c5fbe7a9b29483b577a048.jpg',
    thumbnailUrl: 'https://i.pinimg.com/236x/72/0a/b0/720ab0e184c5fbe7a9b29483b577a048.jpg'
  },
  {
    id: 'https://www.pinterest.com/pin/490962796896407037/',
    username: 'catholicanswers',
    title: 'Saint Marianne Cope — Apostle of Compassion and Charity',
    description: 'Saint Marianne Cope ministered tirelessly with Saint Damien of Molokai to leprosy patients in Hawaii with heroic sacrificial love.',
    link: 'https://www.pinterest.com/pin/490962796896407037/',
    pubDate: 'Fri, 07 Feb 2025 23:56:24 GMT',
    imageUrl: 'https://i.pinimg.com/736x/ae/f7/56/aef75688e1a329bb03959010920880a5.jpg',
    thumbnailUrl: 'https://i.pinimg.com/236x/ae/f7/56/aef75688e1a329bb03959010920880a5.jpg'
  },
  {
    id: 'https://www.pinterest.com/pin/490962796896407020/',
    username: 'catholicanswers',
    title: 'Saint Agnes of Rome — Pure Virgin and Valiant Martyr',
    description: 'Saint Agnes gave her life for Jesus Christ at the tender age of twelve, exemplifying invincible purity and trust in God.',
    link: 'https://www.pinterest.com/pin/490962796896407020/',
    pubDate: 'Fri, 07 Feb 2025 23:54:09 GMT',
    imageUrl: 'https://i.pinimg.com/736x/35/af/6c/35af6c6f477147e1fda0a5d6d72d1bde.jpg',
    thumbnailUrl: 'https://i.pinimg.com/236x/35/af/6c/35af6c6f477147e1fda0a5d6d72d1bde.jpg'
  },
  {
    id: 'https://www.pinterest.com/pin/490962796896407003/',
    username: 'catholicanswers',
    title: 'Pope Saint Fabian — Shepherd of Unity and Martyr of Christ',
    description: 'Elected Pope unexpectedly when a dove landed upon his head, Saint Fabian served the Roman Church with wisdom until his martyrdom.',
    link: 'https://www.pinterest.com/pin/490962796896407003/',
    pubDate: 'Fri, 07 Feb 2025 23:51:22 GMT',
    imageUrl: 'https://i.pinimg.com/736x/02/7a/3c/027a3c5b90a290403e0a3a58dc3389ef.jpg',
    thumbnailUrl: 'https://i.pinimg.com/236x/02/7a/3c/027a3c5b90a290403e0a3a58dc3389ef.jpg'
  },
  {
    id: 'https://www.pinterest.com/pin/195906652533110663/',
    username: 'franciscanmedia',
    title: 'A Conspiracy of Love — Blessed is the Holy Season',
    description: 'Reflections on the Franciscan journey of fraternity, humility, and the love of Christ that embraces the entire world.',
    link: 'https://www.pinterest.com/pin/195906652533110663/',
    pubDate: 'Tue, 12 Dec 2023 20:51:29 GMT',
    imageUrl: 'https://i.pinimg.com/736x/be/d2/ab/bed2ab6110e3e563d94a4fd37fa2e0de.jpg',
    thumbnailUrl: 'https://i.pinimg.com/236x/be/d2/ab/bed2ab6110e3e563d94a4fd37fa2e0de.jpg'
  },
  {
    id: 'https://www.pinterest.com/pin/195906652532764710/',
    username: 'franciscanmedia',
    title: 'Contemplation and Peace in the Midst of Daily Life',
    description: 'The peace of contemplation is not divorced from daily life, but invites all believers to quiet their hearts and listen to God in the silence.',
    link: 'https://www.pinterest.com/pin/195906652532764710/',
    pubDate: 'Fri, 18 Aug 2023 13:21:49 GMT',
    imageUrl: 'https://i.pinimg.com/736x/70/9a/e9/709ae9289ea0066a5c590c468f0eec75.jpg',
    thumbnailUrl: 'https://i.pinimg.com/236x/70/9a/e9/709ae9289ea0066a5c590c468f0eec75.jpg'
  },
  {
    id: 'https://www.pinterest.com/pin/195906652532397362/',
    username: 'franciscanmedia',
    title: 'Saint Anthony Messenger — Living the Gospel with Joy',
    description: 'Saint Anthony of Padua, hammer of heretics and friend of the poor: pray that we may boldly proclaim the Gospel with joy.',
    link: 'https://www.pinterest.com/pin/195906652532397362/',
    pubDate: 'Tue, 04 Apr 2023 19:35:57 GMT',
    imageUrl: 'https://i.pinimg.com/736x/eb/38/9e/eb389e3ff985f27c9f104e6d1aa8620e.jpg',
    thumbnailUrl: 'https://i.pinimg.com/236x/eb/38/9e/eb389e3ff985f27c9f104e6d1aa8620e.jpg'
  },
  {
    id: 'https://www.pinterest.com/pin/195906652532397360/',
    username: 'franciscanmedia',
    title: 'The Great Teacher Inspires — Catholic Educational Vocation',
    description: 'Education rooted in truth, beauty, and goodness inspires hearts and minds to know and love God.',
    link: 'https://www.pinterest.com/pin/195906652532397360/',
    pubDate: 'Tue, 04 Apr 2023 19:30:10 GMT',
    imageUrl: 'https://i.pinimg.com/736x/19/8d/55/198d55abaff849af9929d731206d5300.jpg',
    thumbnailUrl: 'https://i.pinimg.com/236x/19/8d/55/198d55abaff849af9929d731206d5300.jpg'
  },
  {
    id: 'https://www.pinterest.com/pin/195906652532342011/',
    username: 'franciscanmedia',
    title: 'Saint Francis of Assisi — Instruments of Peace in Christ',
    description: 'Lord, make me an instrument of your peace: where there is hatred, let me sow love; where there is injury, pardon; where there is doubt, faith.',
    link: 'https://www.pinterest.com/pin/195906652532342011/',
    pubDate: 'Wed, 15 Mar 2023 14:40:36 GMT',
    imageUrl: 'https://i.pinimg.com/736x/dd/dd/ef/ddddef8bdad0fcfed3f4db88e01de86b.jpg',
    thumbnailUrl: 'https://i.pinimg.com/236x/dd/dd/ef/ddddef8bdad0fcfed3f4db88e01de86b.jpg'
  },
  {
    id: 'https://www.pinterest.com/pin/195906652532319457/',
    username: 'franciscanmedia',
    title: 'The Miracle of the Loaves and Fishes — Abundant Divine Grace',
    description: 'Reflections on how Christ takes our humble offerings and multiplies them to nourish the multitudes in body and soul.',
    link: 'https://www.pinterest.com/pin/195906652532319457/',
    pubDate: 'Tue, 07 Mar 2023 18:40:04 GMT',
    imageUrl: 'https://i.pinimg.com/736x/85/ea/d1/85ead12a5d64354b9256f7d328e4b9ca.jpg',
    thumbnailUrl: 'https://i.pinimg.com/236x/85/ea/d1/85ead12a5d64354b9256f7d328e4b9ca.jpg'
  },
  {
    id: 'https://www.pinterest.com/pin/136445063703843848/',
    username: 'catholiccompany',
    title: 'Saint John the Baptist — Voice Crying in the Wilderness',
    description: 'Saint John the Baptist prepared the way for the Lord Jesus Christ, calling all hearts to repentance and baptism.',
    link: 'https://www.pinterest.com/pin/136445063703843848/',
    pubDate: 'Fri, 23 Jun 2023 16:43:06 GMT',
    imageUrl: 'https://i.pinimg.com/736x/c2/76/8b/c2768bf0ffcd47b45261e4ece179f9dc.jpg',
    thumbnailUrl: 'https://i.pinimg.com/236x/c2/76/8b/c2768bf0ffcd47b45261e4ece179f9dc.jpg'
  },
  {
    id: 'https://www.pinterest.com/pin/136445063703831731/',
    username: 'catholiccompany',
    title: 'The Holy Archangels: Saint Michael, Saint Gabriel & Saint Raphael',
    description: 'Saint Michael the Archangel, defend us in battle! Holy Archangels, protect our homes, families, and parish communities.',
    link: 'https://www.pinterest.com/pin/136445063703831731/',
    pubDate: 'Tue, 20 Jun 2023 03:19:42 GMT',
    imageUrl: 'https://i.pinimg.com/736x/f2/27/24/f2272467608e4c94f6b23fc5519045b3.jpg',
    thumbnailUrl: 'https://i.pinimg.com/236x/f2/27/24/f2272467608e4c94f6b23fc5519045b3.jpg'
  },
  {
    id: 'https://www.pinterest.com/pin/136445063703824307/',
    username: 'catholiccompany',
    title: 'Saint Martha — Humble Service and Steadfast Profession of Faith',
    description: 'Saint Martha proclaimed to Christ: "Yes, Lord; I have believed that you are the Christ, the Son of God." Model of hospitality and faith.',
    link: 'https://www.pinterest.com/pin/136445063703824307/',
    pubDate: 'Sun, 18 Jun 2023 03:02:29 GMT',
    imageUrl: 'https://i.pinimg.com/736x/37/d6/0a/37d60adfcb83e48ef2d172f49743d13c.jpg',
    thumbnailUrl: 'https://i.pinimg.com/236x/37/d6/0a/37d60adfcb83e48ef2d172f49743d13c.jpg'
  },
  {
    id: 'https://www.pinterest.com/pin/136445063703823813/',
    username: 'catholiccompany',
    title: 'Blessed Imelda Lambertini — Patroness of First Communicants',
    description: 'Blessed Imelda’s burning love for the Holy Eucharist exemplifies the innocence and devotion of children coming to Jesus at the altar.',
    link: 'https://www.pinterest.com/pin/136445063703823813/',
    pubDate: 'Sat, 17 Jun 2023 23:37:18 GMT',
    imageUrl: 'https://i.pinimg.com/736x/f4/1c/ce/f41cce7ddde2a9e092ec957c644fd9ef.jpg',
    thumbnailUrl: 'https://i.pinimg.com/236x/f4/1c/ce/f41cce7ddde2a9e092ec957c644fd9ef.jpg'
  },
  {
    id: 'https://www.pinterest.com/pin/136445063703823062/',
    username: 'catholiccompany',
    title: 'Saint Sebastian — Valiant Soldier of Christ and Holy Martyr',
    description: 'Saint Sebastian stood bravely before the Roman Emperor to profess Jesus Christ, surviving arrows to testify to the resurrection.',
    link: 'https://www.pinterest.com/pin/136445063703823062/',
    pubDate: 'Sat, 17 Jun 2023 21:28:29 GMT',
    imageUrl: 'https://i.pinimg.com/736x/8d/24/0e/8d240e729520b08b83b13c2b59a4ff7b.jpg',
    thumbnailUrl: 'https://i.pinimg.com/236x/8d/24/0e/8d240e729520b08b83b13c2b59a4ff7b.jpg'
  },
  {
    id: 'https://www.pinterest.com/pin/136445063703820686/',
    username: 'catholiccompany',
    title: 'Saint Gianna Beretta Molla — Heroic Mother and Sacred Physician',
    description: 'Saint Gianna gave her life so that her unborn child might live, teaching us that every human life is sacred and beloved by God.',
    link: 'https://www.pinterest.com/pin/136445063703820686/',
    pubDate: 'Sat, 17 Jun 2023 13:39:18 GMT',
    imageUrl: 'https://i.pinimg.com/736x/21/93/d1/2193d14cb3b29c83f8a5c50c03637751.jpg',
    thumbnailUrl: 'https://i.pinimg.com/236x/21/93/d1/2193d14cb3b29c83f8a5c50c03637751.jpg'
  },
  {
    id: 'https://www.pinterest.com/pin/532621093445382358/',
    username: 'ascensionpress',
    title: 'Rooted in Sacred Scripture and the Catholic Liturgical Year',
    description: 'Stay rooted in prayer, Sacred Scripture, and liturgical rhythm to bring holy meaning and peace to every day.',
    link: 'https://www.pinterest.com/pin/532621093445382358/',
    pubDate: 'Thu, 13 Jul 2023 17:51:08 GMT',
    imageUrl: 'https://i.pinimg.com/736x/7c/c0/ba/7cc0baaa0e0b29103f616a8038428ca7.jpg',
    thumbnailUrl: 'https://i.pinimg.com/236x/7c/c0/ba/7cc0baaa0e0b29103f616a8038428ca7.jpg'
  },
  {
    id: 'https://www.pinterest.com/pin/532621093445366126/',
    username: 'ascensionpress',
    title: 'Teaching Children the Beauty of Personal Prayer with God',
    description: 'Inspiring children to enter into real, personal, and quiet conversation with God through prayer and sacred icons.',
    link: 'https://www.pinterest.com/pin/532621093445366126/',
    pubDate: 'Tue, 11 Jul 2023 12:43:54 GMT',
    imageUrl: 'https://i.pinimg.com/736x/e9/6f/97/e96f972334b100a7dc6748e3c93beb56.jpg',
    thumbnailUrl: 'https://i.pinimg.com/236x/e9/6f/97/e96f972334b100a7dc6748e3c93beb56.jpg'
  },
  {
    id: 'https://www.pinterest.com/pin/532621093445331658/',
    username: 'ascensionpress',
    title: 'The Parables of Jesus — Living Wisdom of the Kingdom of Heaven',
    description: 'Exploring the Good Samaritan, the Prodigal Son, the Sower, and the Pearl of Great Price.',
    link: 'https://www.pinterest.com/pin/532621093445331658/',
    pubDate: 'Thu, 06 Jul 2023 19:20:48 GMT',
    imageUrl: 'https://i.pinimg.com/736x/65/ab/6d/65ab6d737b054740e761103b58ab69e8.jpg',
    thumbnailUrl: 'https://i.pinimg.com/236x/65/ab/6d/65ab6d737b054740e761103b58ab69e8.jpg'
  },
  {
    id: 'https://www.pinterest.com/pin/532621093445331473/',
    username: 'ascensionpress',
    title: 'Catholic Classics Library — Reading the Church Fathers & Doctors',
    description: 'Deepen your knowledge of the faith with Saint Augustine, Saint Thomas Aquinas, Saint Teresa of Avila, and Saint John of the Cross.',
    link: 'https://www.pinterest.com/pin/532621093445331473/',
    pubDate: 'Thu, 06 Jul 2023 18:26:02 GMT',
    imageUrl: 'https://i.pinimg.com/736x/58/2f/df/582fdfc33b9dc4be185656081417a568.jpg',
    thumbnailUrl: 'https://i.pinimg.com/236x/58/2f/df/582fdfc33b9dc4be185656081417a568.jpg'
  },
  {
    id: 'https://www.pinterest.com/pin/532621093445331458/',
    username: 'ascensionpress',
    title: 'Encounter Jesus in the Mass and Love the Holy Eucharist',
    description: 'Inspiring families and youth to understand the sacred liturgy and reverence Jesus truly present in the tabernacle.',
    link: 'https://www.pinterest.com/pin/532621093445331458/',
    pubDate: 'Thu, 06 Jul 2023 18:20:59 GMT',
    imageUrl: 'https://i.pinimg.com/736x/b0/f8/20/b0f820496c5cefe462dca6c21d314956.jpg',
    thumbnailUrl: 'https://i.pinimg.com/236x/b0/f8/20/b0f820496c5cefe462dca6c21d314956.jpg'
  },
  {
    id: 'https://www.pinterest.com/pin/532621093445331445/',
    username: 'ascensionpress',
    title: 'Habits for Holiness — Small Steps of Grace Toward Sainthood',
    description: 'Daily prayer routines, regular confession, Eucharistic adoration, and acts of hidden charity.',
    link: 'https://www.pinterest.com/pin/532621093445331445/',
    pubDate: 'Thu, 06 Jul 2023 18:17:49 GMT',
    imageUrl: 'https://i.pinimg.com/736x/f9/3b/fb/f93bfbff402c255d5203077d4a019c47.jpg',
    thumbnailUrl: 'https://i.pinimg.com/236x/f9/3b/fb/f93bfbff402c255d5203077d4a019c47.jpg'
  }
];
