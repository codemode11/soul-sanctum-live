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
      'DfcTTagRM-x', 'DfafIKssdp4', 'DfZl4NnxPXg',
      'DfXKc2DRKe4', 'DfUwwrKxbBo', 'DfUdUnZREdb'
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
      'DfcLS5sjHof', 'Dfa4WLVlY2G', 'Dfaik3BjOpq',
      'DfZeeyUFJ2u', 'DfYS9wkF3c9', 'DfXt3irk4nO'
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
      'DfdcESGCvQn', 'DfapmAaCUPe', 'DfaTK9hEWFC',
      'DfZ4SHSCUgL', 'DfS9kGilc3j', 'DfP1A9FDSbj'
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
      'DfceIbOAmI9', 'DfXTjQ7DFU6', 'DfTEQESl5s_',
      'DfQkH0XDMGD', 'DfKUnvWl2YL', 'DfCtqTbPJE3'
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
      'DfeK41aCXrY', 'Dfdc1NsEXy7', 'DfdaAiRCkCC',
      'DfdWKDjFGCF', 'DfdSmtQglJJ', 'DfdSIURARsW'
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
      'DfXs4C3Gzvn', 'DfVI5B6m-fC', 'DfTKen8F78Y',
      'DfS9UiAF9SP', 'DfQPZbPm2a7', 'DfLnJc1OX1i'
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
      'Dfc_Wwiildx', 'DfX1znejFBR', 'DfVQ9IjDAjV',
      'DfUlBvQkfvQ', 'DfQHW31l1NW', 'DfNAPJwF7yw'
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
      'DfaO1PQFaLj', 'DfTUkWNkSBB', 'DfSwL9Hmo7s',
      'DfPsQBNl7NE', 'DfN0eTWjKoU', 'DfM53G4CF5z',
      'DfKM6Fllu4A', 'DfHI8Dzl5cO', 'DfES4Srl7dB'
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
      'DfazpyEgaIa', 'DfagCq8D3sp', 'DfZsT64CpxV',
      'DfYQhEYAB8J', 'DfXqqsiPUPV', 'DfWDi7HDNuW',
      'DfU15qBD_wN', 'DfSD2a_DT9K', 'DfPX9L3D8mF'
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
      'DfdmmVmNqN1', 'DfdkvpDuHz0', 'DfdiiN7Rm7h',
      'Dfdd6VFO4To', 'DfdUMg_xeso', 'DfdQeAaF7cK',
      'Dfcy2B_x3a1', 'DfcspuNx6Fv', 'Dfcn8Nvx-4D'
    ]
  }
];

export const CATHOLIC_FACEBOOK_SOURCES: CatholicFacebookSource[] = [
  {
    id: 'fb-wordonfire',
    name: 'Word on Fire (Bishop Robert Barron)',
    handle: '@BishopRobertBarron',
    socialUsername: 'bishopbarron',
    pageUrl: 'https://www.facebook.com/BishopRobertBarron',
    category: 'Theology & Evangelization',
    description: 'Static posts, homily reflections, theological commentary, and conference dispatches from Bishop Robert Barron and Word on Fire.',
    staticPosts: [
      {
        id: 'fb-barron-1',
        shortcode: 'DfaO1PQFaLj',
        typename: 'GraphImage',
        isVideo: false,
        imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
        carouselImages: [
          'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80'
        ],
        caption: 'Friends, I was delighted to attend Word on Fire’s annual New Ressourcement Conference yesterday in Rochester, Minnesota. Scholars, theologians, and pastors gathered to explore how the great Catholic tradition can speak afresh to our contemporary world.\n\nThrough beauty, truth, and goodness, Christ continues to renew His Church. Let us never be afraid to bring the light of the Gospel into the public square.',
        timestamp: Date.now() - 1000 * 60 * 60 * 18,
        likesCount: 5240,
        commentsCount: 384
      },
      {
        id: 'fb-barron-2',
        shortcode: 'DfTUkWNkSBB',
        typename: 'GraphImage',
        isVideo: false,
        imageUrl: 'https://images.unsplash.com/photo-1548625361-1959779df3a8?auto=format&fit=crop&w=1200&q=80',
        carouselImages: [
          'https://images.unsplash.com/photo-1548625361-1959779df3a8?auto=format&fit=crop&w=1200&q=80'
        ],
        caption: 'The Holy Eucharist is the source and summit of the Christian life. When we adore Christ present in the Blessed Sacrament, our minds and hearts are re-ordered toward God.\n\nSaint Thomas Aquinas reminds us: "O sacred banquet in which Christ is received, the memory of His Passion is renewed, the mind is filled with grace, and a pledge of future glory is given to us." May our adoration bear fruit in genuine charity for the poor and marginalized.',
        timestamp: Date.now() - 1000 * 60 * 60 * 42,
        likesCount: 6810,
        commentsCount: 495
      },
      {
        id: 'fb-barron-3',
        shortcode: 'DfSwL9Hmo7s',
        typename: 'GraphImage',
        isVideo: false,
        imageUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1200&q=80',
        carouselImages: [
          'https://images.unsplash.com/photo-1438232992991-995b7058bbb3?auto=format&fit=crop&w=1200&q=80'
        ],
        caption: 'Sunday Gospel Reflection: "You shall love the Lord your God with all your heart, with all your soul, and with all your mind."\n\nTo love God with your whole being means that nothing else—no wealth, pleasure, power, or honor—takes the sovereign place of Christ in your heart. When God is given the primary place, everything else in your life falls into radiant harmony.',
        timestamp: Date.now() - 1000 * 60 * 60 * 70,
        likesCount: 4720,
        commentsCount: 290
      },
      {
        id: 'fb-barron-4',
        shortcode: 'DfPsQBNl7NE',
        typename: 'GraphImage',
        isVideo: false,
        imageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
        carouselImages: [
          'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80'
        ],
        caption: 'Saint Augustine wrote in the Confessions: "You have made us for yourself, O Lord, and our heart is restless until it rests in you." Notice he did not say our heart is satisfied by worldly triumphs or political achievements. That holy restlessness is God’s divine hook within the soul, beckoning us home.',
        timestamp: Date.now() - 1000 * 60 * 60 * 96,
        likesCount: 5930,
        commentsCount: 412
      }
    ]
  },
  {
    id: 'fb-vaticannews',
    name: 'Vatican News (English)',
    handle: '@vaticannews',
    socialUsername: 'vaticannews',
    pageUrl: 'https://www.facebook.com/vaticannews',
    category: 'Holy See & Papal Ministry',
    description: 'Official English static posts and photo dispatches from Vatican News covering Pope Leo XIV and the Universal Church.',
    staticPosts: [
      {
        id: 'fb-vatican-1',
        shortcode: 'Dfdc1NsEXy7',
        typename: 'GraphImage',
        isVideo: false,
        imageUrl: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=1200&q=80',
        carouselImages: [
          'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80'
        ],
        caption: 'Pope at the Angelus: "Peace is not merely the absence of conflict; it is the gift of Christ’s presence in our hearts, working through justice, mutual respect, and maternal forgiveness."\n\nAddressing thousands gathered in St. Peter’s Square, the Holy Father urged the faithful worldwide to pray without ceasing for victims of violence and for peace across the Holy Land and Ukraine.',
        timestamp: Date.now() - 1000 * 60 * 60 * 12,
        likesCount: 12400,
        commentsCount: 890
      },
      {
        id: 'fb-vatican-2',
        shortcode: 'DfdaAiRCkCC',
        typename: 'GraphImage',
        isVideo: false,
        imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80',
        carouselImages: [
          'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80'
        ],
        caption: 'St. Peter’s Basilica in morning light: Pilgrims from every continent gather at the Tomb of the Prince of the Apostles to profess the one, holy, catholic, and apostolic faith. "And I tell you, you are Peter, and on this rock I will build my Church, and the gates of hell shall not prevail against it." (Matthew 16:18)',
        timestamp: Date.now() - 1000 * 60 * 60 * 36,
        likesCount: 9600,
        commentsCount: 410
      },
      {
        id: 'fb-vatican-3',
        shortcode: 'DfdWKDjFGCF',
        typename: 'GraphImage',
        isVideo: false,
        imageUrl: 'https://images.unsplash.com/photo-1548625361-1959779df3a8?auto=format&fit=crop&w=1200&q=80',
        carouselImages: [
          'https://images.unsplash.com/photo-1548625361-1959779df3a8?auto=format&fit=crop&w=1200&q=80'
        ],
        caption: 'Vatican Museums restore historic fresco of the Annunciation. Master conservators unveil the glowing lapis lazuli mantle of the Blessed Virgin Mary, depicting the moment the Word became Flesh and dwelt among us. "Behold the handmaid of the Lord; be it done unto me according to thy word."',
        timestamp: Date.now() - 1000 * 60 * 60 * 60,
        likesCount: 8350,
        commentsCount: 320
      }
    ]
  },
  {
    id: 'fb-ewtn',
    name: 'EWTN Global Catholic Network',
    handle: '@ewtnonline',
    socialUsername: 'ewtnmedia',
    pageUrl: 'https://www.facebook.com/ewtnonline',
    category: 'Global Catholic Television',
    description: 'Static devotion cards, Mother Angelica quotes, Catholic news, and daily spiritual encouragement from EWTN.',
    staticPosts: [
      {
        id: 'fb-ewtn-1',
        shortcode: 'DfcLS5sjHof',
        typename: 'GraphImage',
        isVideo: false,
        imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
        carouselImages: [
          'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80'
        ],
        caption: 'Mother Angelica reminds us: "Unless you are willing to do the ridiculous, God cannot do the miraculous. When you step out in faith for Jesus, do not look at your own smallness—look at His boundless majesty!"\n\nPray for our global mission today as we broadcast Holy Mass, Eucharistic adoration, and the Rosary to over 145 nations.',
        timestamp: Date.now() - 1000 * 60 * 60 * 14,
        likesCount: 8900,
        commentsCount: 620
      },
      {
        id: 'fb-ewtn-2',
        shortcode: 'Dfa4WLVlY2G',
        typename: 'GraphImage',
        isVideo: false,
        imageUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1200&q=80',
        carouselImages: [
          'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1200&q=80'
        ],
        caption: 'Daily Holy Hour before the Most Blessed Sacrament: "Come to me, all who labor and are heavy laden, and I will give you rest." Take a few quiet moments today to place all your anxieties, family needs, and burdens into the Pierced Heart of Jesus Christ.',
        timestamp: Date.now() - 1000 * 60 * 60 * 38,
        likesCount: 7420,
        commentsCount: 510
      }
    ]
  },
  {
    id: 'fb-ascension',
    name: 'Ascension (Fr. Mike Schmitz & Jeff Cavins)',
    handle: '@AscensionPress',
    socialUsername: 'ascensionpress',
    pageUrl: 'https://www.facebook.com/AscensionPress',
    category: 'Scripture & Catechism',
    description: 'Static Scripture & Catechism graphics, Advent/Lent invitations, and faith formation posts from Ascension.',
    staticPosts: [
      {
        id: 'fb-asc-1',
        shortcode: 'DfaTK9hEWFC',
        typename: 'GraphImage',
        isVideo: false,
        imageUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1200&q=80',
        carouselImages: [
          'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1200&q=80'
        ],
        caption: 'Fr. Mike Schmitz: "God does not call the equipped; He equips the called. Whatever trial you are facing right now, remember that God’s grace is not only sufficient—it is abundant. He is right beside you in the boat."\n\nTag a friend who needs this reminder of God’s steadfast fidelity today.',
        timestamp: Date.now() - 1000 * 60 * 60 * 20,
        likesCount: 11200,
        commentsCount: 740
      },
      {
        id: 'fb-asc-2',
        shortcode: 'DfS9kGilc3j',
        typename: 'GraphImage',
        isVideo: false,
        imageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80',
        carouselImages: [
          'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80'
        ],
        caption: 'The Great Adventure Bible Timeline: In Sacred Scripture, God reveals Himself through a series of covenants—from Adam to Noah, Abraham, Moses, David, and finally fulfilled in Jesus Christ and the Catholic Church.\n\nOpen your Bible today and encounter the living Word who died for you.',
        timestamp: Date.now() - 1000 * 60 * 60 * 48,
        likesCount: 9150,
        commentsCount: 520
      }
    ]
  },
  {
    id: 'fb-divinemercy',
    name: 'The Divine Mercy (Marian Fathers)',
    handle: '@DivineMercyOfficial',
    socialUsername: 'thedivinemercy',
    pageUrl: 'https://www.facebook.com/DivineMercyOfficial',
    category: 'Divine Mercy & Marian Devotion',
    description: 'Official static posts, St. Faustina quote cards, and shrine updates from the Marian Fathers of the Immaculate Conception.',
    staticPosts: [
      {
        id: 'fb-dm-1',
        shortcode: 'Dfc_Wwiildx',
        typename: 'GraphImage',
        isVideo: false,
        imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80',
        carouselImages: [
          'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80'
        ],
        caption: 'Saint Faustina’s Diary (Entry 1448): "My Heart overflows with great mercy for souls, and especially for poor sinners. If only they could understand that I am the best of Fathers to them and that it is for them that the Blood and Water flowed from My Heart as from a fount overflowing with mercy."\n\nJesus, I Trust in You!',
        timestamp: Date.now() - 1000 * 60 * 60 * 16,
        likesCount: 15300,
        commentsCount: 1250
      },
      {
        id: 'fb-dm-2',
        shortcode: 'DfX1znejFBR',
        typename: 'GraphImage',
        isVideo: false,
        imageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
        carouselImages: [
          'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80'
        ],
        caption: 'The 3:00 PM Hour of Great Mercy: "At three o’clock, implore My mercy, especially for sinners; and, if only for a brief moment, immerse yourself in My Passion, particularly in My abandonment at the moment of agony." Immerse yourself in Christ’s loving mercy right now.',
        timestamp: Date.now() - 1000 * 60 * 60 * 40,
        likesCount: 13800,
        commentsCount: 980
      }
    ]
  },
  {
    id: 'fb-ncregister',
    name: 'National Catholic Register',
    handle: '@NCRegister',
    socialUsername: 'ncregister',
    pageUrl: 'https://www.facebook.com/NCRegister',
    category: 'Catholic News & Analysis',
    description: 'Static photo dispatches, Vatican coverage, saint features, and liturgical reflections from the National Catholic Register.',
    staticPosts: [
      {
        id: 'fb-ncr-1',
        shortcode: 'DfdmmVmNqN1',
        typename: 'GraphImage',
        isVideo: false,
        imageUrl: 'https://images.unsplash.com/photo-1548625361-1959779df3a8?auto=format&fit=crop&w=1200&q=80',
        carouselImages: [
          'https://images.unsplash.com/photo-1548625361-1959779df3a8?auto=format&fit=crop&w=1200&q=80'
        ],
        caption: 'Liturgical Reflection: The Holy Sacrifice of the Mass transcends time and space, re-presenting on our altars the once-for-all sacrifice of Calvary. In the words of Saint John Chrysostom, "When the sacrifice is offered, angels stand by the priest and the whole sanctuary is filled with heavenly powers."',
        timestamp: Date.now() - 1000 * 60 * 60 * 22,
        likesCount: 4620,
        commentsCount: 310
      },
      {
        id: 'fb-ncr-2',
        shortcode: 'DfdkvpDuHz0',
        typename: 'GraphImage',
        isVideo: false,
        imageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80',
        carouselImages: [
          'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80'
        ],
        caption: 'Saint of the Day: Today the Church honors martyrs who willingly poured out their lives rather than compromise their fidelity to Christ. "The blood of the martyrs is the seed of the Church," wrote Tertullian in the second century. Holy Martyrs, pray for our steadfast faith!',
        timestamp: Date.now() - 1000 * 60 * 60 * 50,
        likesCount: 5120,
        commentsCount: 260
      }
    ]
  },
  {
    id: 'fb-catholicanswers',
    name: 'Catholic Answers',
    handle: '@catholicanswers',
    socialUsername: 'catholicanswers',
    pageUrl: 'https://www.facebook.com/catholicanswers',
    category: 'Apologetics & Doctrine',
    description: 'Static apologetics posts, doctrinal graphics, and Catholic Q&A highlights from Catholic Answers.',
    staticPosts: [
      {
        id: 'fb-ca-1',
        shortcode: 'DfazpyEgaIa',
        typename: 'GraphImage',
        isVideo: false,
        imageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80',
        carouselImages: [
          'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80'
        ],
        caption: 'Why do Catholics pray to the Saints? Saint Paul asks the faithful on earth to intercede for one another (1 Tim 2:1). In Revelation 5:8, the 24 elders in heaven hold golden bowls full of incense, which are the prayers of the saints. The Saints before the throne of the Lamb are alive in Christ and pray with us!\n\nRead the full apologetics guide on Catholic.com.',
        timestamp: Date.now() - 1000 * 60 * 60 * 24,
        likesCount: 7850,
        commentsCount: 610
      },
      {
        id: 'fb-ca-2',
        shortcode: 'DfagCq8D3sp',
        typename: 'GraphImage',
        isVideo: false,
        imageUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1200&q=80',
        carouselImages: [
          'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1200&q=80'
        ],
        caption: 'Did Jesus establish a visible Church? "You are Peter, and on this rock I will build my Church" (Matt 16:18). Jesus promised that the Holy Spirit would lead the Apostles into all truth (John 16:13). Through apostolic succession and the guidance of the Magisterium, the deposit of faith is preserved intact.',
        timestamp: Date.now() - 1000 * 60 * 60 * 56,
        likesCount: 6920,
        commentsCount: 480
      }
    ]
  }
];

export const CATHOLIC_FACEBOOK_ARTICLES: CatholicFacebookArticlePost[] = [
  {
    id: 'fb-art-ncr-1',
    sourceId: 'fb-ncregister',
    sourceName: 'National Catholic Register',
    handle: '@NCRegister',
    pageUrl: 'https://www.facebook.com/NCRegister',
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1548625361-1959779df3a8?auto=format&fit=crop&w=120&q=80',
    postDate: 'Yesterday at 3:15 PM',
    postCaption: 'Across parishes and campus ministries, young Catholics are returning to the source and summit of the faith. Why Eucharistic adoration, sacred silence, and traditional reverence are inspiring a new generation of believers.\n\nRead our comprehensive special report below: 👇',
    articleTitle: 'Returning to the Sources: Why Eucharistic Reverence Is Drawing Young Adults to the Church',
    articleSummary: 'From university chapels to inner-city parishes, young adults are discovering that sacred reverence, prolonged Eucharistic silence, and traditional liturgy speak with extraordinary power to a generation exhausted by secular noise.',
    articleDomain: 'ncregister.com',
    articleUrl: 'https://www.ncregister.com/daily-news/returning-to-the-sources-eucharistic-reverence',
    articleImageUrl: 'https://images.unsplash.com/photo-1548625361-1959779df3a8?auto=format&fit=crop&w=1200&q=80',
    readTime: '6 min read',
    author: 'Joseph Pronechen',
    category: 'Eucharist & Liturgy',
    likesCount: 5820,
    commentsCount: 412,
    sharesCount: 1640,
    fullArticleText: `A striking spiritual phenomenon is unfolding in parishes and university Newman Centers across the country: young Catholic adults are turning in droves toward Eucharistic adoration, traditional sacred music, and deep liturgical reverence.\n\nWhere conventional wisdom once assumed that youth sought casual, trend-driven worship, pastors report that millennials and Gen Z are thirsting for transcendence. "Young people today are inundated 24/7 with digital noise, algorithmic polarization, and relentless commercial demands," notes Fr. Julian Carron. "When they walk into a sanctuary lit only by vigil lamps, with the Blessed Sacrament exposed in a gold monstrance and the silence of eternity resting over the nave, they recognize something real."\n\nSociological surveys conducted during the National Eucharistic Congress confirmed this trend. Over 62% of attendees under thirty cited Eucharistic adoration as the single most transformative element of their prayer life.\n\nAs one university senior put it: "I don't need the Church to look like a coffee shop or a concert hall. I need the Church to bring me into the presence of the living God." For pastors and diocesan leaders, the message is clear: authentic renewal will not come from diluting the sacred, but from plunging fearlessly into its depths.`
  },
  {
    id: 'fb-art-barron-1',
    sourceId: 'fb-wordonfire',
    sourceName: 'Word on Fire (Bishop Robert Barron)',
    handle: '@BishopRobertBarron',
    pageUrl: 'https://www.facebook.com/BishopRobertBarron',
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=120&q=80',
    postDate: '2 days ago',
    postCaption: 'Friends, we live in a culture deeply confused about truth, freedom, and the purpose of human life. In this new essay, I explore why Saint Thomas Aquinas remains our greatest guide through the modern intellectual labyrinth.\n\nGrace does not destroy nature; it elevates and perfects it.',
    articleTitle: 'Bishop Robert Barron: Why Saint Thomas Aquinas Is the Doctor of Wonder and Realism',
    articleSummary: 'Saint Thomas Aquinas refused both hyper-rationalism and anti-intellectual fideism. His masterly synthesis of faith and reason provides the antidote to modern cynicism and restores wonder before created being.',
    articleDomain: 'wordonfire.org',
    articleUrl: 'https://www.wordonfire.org/articles/barron/why-thomas-aquinas-matters-today/',
    articleImageUrl: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80',
    readTime: '7 min read',
    author: 'Bishop Robert Barron',
    category: 'Theology & Philosophy',
    likesCount: 7940,
    commentsCount: 630,
    sharesCount: 2310,
    fullArticleText: `Pope Leo XIII famously wrote that Saint Thomas Aquinas gathered together the scattered philosophical insights of antiquity and harmonized them with Divine Revelation into an invincible citadel of truth.\n\nWhat makes Aquinas so perennial is his radical intellectual honesty. In every article of the Summa Theologiae, Thomas begins not by dismissing his opponents, but by formulating their objections with greater clarity and force than they themselves could muster. Only after giving full weight to the difficulty does he offer his famous "Sed Contra" (On the contrary) and his luminous "Respondeo" (I answer that).\n\nThomas teaches us that all truth, wherever it is found, comes from the Holy Spirit. He was not afraid of pagan philosophy, secular science, or challenging counterarguments, because he possessed unshakeable confidence in Christ as the Logos—the divine Word through whom all things were made.\n\nIf we wish to evangelize our modern culture, we must recover the Thomistic habit of mind: charity toward opponents, rigorous clarity of definition, and profound humility before the mystery of God who is ipsum esse subsistens—the very act of Being itself.`
  },
  {
    id: 'fb-art-ca-1',
    sourceId: 'fb-catholicanswers',
    sourceName: 'Catholic Answers',
    handle: '@catholicanswers',
    pageUrl: 'https://www.facebook.com/catholicanswers',
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=120&q=80',
    postDate: '3 days ago',
    postCaption: 'Did the first Christians believe the bread and wine at Mass were merely symbols? The historical evidence from the Apostolic Fathers is overwhelming and unanimous.\n\nRead our full apologetics breakdown from Catholic Answers Magazine:',
    articleTitle: 'Did the Early Church Believe in the Real Presence? The Irrefutable Patristic Evidence',
    articleSummary: 'From Saint Ignatius of Antioch in 110 AD to Saint Justin Martyr and Saint Irenaeus, the earliest Christian disciples taught unequivocally that the Eucharist is the real Flesh and Blood of the Incarnate Jesus.',
    articleDomain: 'catholic.com',
    articleUrl: 'https://www.catholic.com/magazine/online-edition/the-early-church-and-the-real-presence',
    articleImageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80',
    readTime: '8 min read',
    author: 'Joe Heschmeyer',
    category: 'Apologetics & History',
    likesCount: 9120,
    commentsCount: 840,
    sharesCount: 3450,
    fullArticleText: `Non-Catholic historians often claim that the doctrine of transubstantiation and the Real Presence of Christ in the Eucharist were late medieval corruptions invented by the Roman Catholic hierarchy. But what do the earliest historical documents actually reveal?\n\nConsider Saint Ignatius of Antioch, a direct disciple of the Apostle John. Writing around 110 AD on his way to be martyred by lions in Rome, Ignatius warned the Church about Gnostic heretics: "They abstain from the Eucharist and from prayer because they do not confess that the Eucharist is the flesh of our Savior Jesus Christ, flesh which suffered for our sins and which that Father in His goodness raised up again." (Letter to the Smyrnaeans, 7:1).\n\nForty years later, around 150 AD, Saint Justin Martyr explained Christian liturgy to the Roman Emperor Antoninus Pius: "Not as common bread and common drink do we receive these; but in like manner as Jesus Christ our Savior, having been made flesh by the Word of God, had both flesh and blood for our salvation, so likewise have we been taught that the food which is blessed by the prayer of His word is the flesh and blood of that Jesus who was made flesh." (First Apology, 66).\n\nThere is not a single Church Father who interpreted John 6 as a mere metaphor. From the Roman catacombs to the desert fathers, the witness of apostolic Christianity is unanimous: Jesus Christ is truly, really, and substantially present on our altars.`
  },
  {
    id: 'fb-art-vatican-1',
    sourceId: 'fb-vaticannews',
    sourceName: 'Vatican News (English)',
    handle: '@vaticannews',
    pageUrl: 'https://www.facebook.com/vaticannews',
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=120&q=80',
    postDate: 'Nov 6 at 11:20 AM',
    postCaption: 'Pope at the Solemn Mass: "The Eucharist is not a badge of honor for the righteous, but the bread that nourishes weary pilgrims on the road to eternal life."\n\nFull papal homily reflection and video dispatch from the Dicastery for Communication:',
    articleTitle: 'Pope at Corpus Christi: The Eucharist Is Bread for Pilgrims, Not a Reward for the Perfect',
    articleSummary: 'Celebrating the Solemnity of the Most Holy Body and Blood of Christ, the Holy Father urged believers never to reduce the Mass to a routine ritual, but to approach Christ with humility and open hearts.',
    articleDomain: 'vaticannews.va',
    articleUrl: 'https://www.vaticannews.va/en/pope/news/2026-11/pope-homily-corpus-christi-bread-pilgrims.html',
    articleImageUrl: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=1200&q=80',
    readTime: '5 min read',
    author: 'Vatican News Editorial',
    category: 'Holy See & Magisterium',
    likesCount: 14200,
    commentsCount: 920,
    sharesCount: 4180,
    fullArticleText: `In his homily delivered from the steps of the Archbasilica of St. John Lateran, the Holy Father reflected on the fragility of human life and the infinite condescension of Christ in the Blessed Sacrament.\n\n"When Jesus took bread into His hands on the night before He died," the Pope noted, "He did not wait for the Apostles to understand His mystery. He knew Peter would deny Him, Judas would betray Him, and the others would scatter in fear. Yet He broke Himself for them."\n\nThe Eucharist, the Holy Father emphasized, is the medicine of immortality for souls wounded by sin and grief. When we receive Holy Communion, we allow Christ to heal our selfishness and unite us to the sufferings of the poor.\n\n"Let us kneel before the Lord of glory with adoration," the Pope concluded, "and let us rise up from our knees to run with haste toward our brothers and sisters who need love, bread, and hope."`
  },
  {
    id: 'fb-art-ewtn-1',
    sourceId: 'fb-ewtn',
    sourceName: 'EWTN Global Catholic Network',
    handle: '@ewtnonline',
    pageUrl: 'https://www.facebook.com/ewtnonline',
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=120&q=80',
    postDate: '4 days ago',
    postCaption: 'Mother Angelica: "Faith is having one foot on the ground, one foot in the air, and a queasy feeling in your stomach!"\n\nHow Mother Angelica learned radical abandonment to God’s holy will when all worldly resources ran dry:',
    articleTitle: 'Mother Angelica’s Five Rules for Trusting God When Everything Seems to Fail',
    articleSummary: 'With only two hundred dollars in her bank account and zero broadcast experience, a cloistered Poor Clare nun built the world’s largest religious media network. Her secret: radical trust in divine Providence.',
    articleDomain: 'ewtn.com',
    articleUrl: 'https://www.ewtn.com/catholicism/library/mother-angelica-radical-trust-in-providence',
    articleImageUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?auto=format&fit=crop&w=1200&q=80',
    readTime: '5 min read',
    author: 'Raymond Arroyo',
    category: 'Spiritual Life & Wisdom',
    likesCount: 11500,
    commentsCount: 780,
    sharesCount: 3920,
    fullArticleText: `When Rita Rizzo entered the Poor Clares of Perpetual Adoration in Cleveland, Ohio, in 1944, she could never have anticipated that decades later she would stand before satellite dishes in Alabama broadcasting Christ’s Gospel to hundreds of millions of people.\n\nHer spiritual philosophy was disarmingly simple, rooted entirely in the Little Way of Saint Thérèse of Lisieux and the radical poverty of Saint Francis. "Unless you are willing to look ridiculous for Jesus," she famously told her sisters, "God cannot do the miraculous through you."\n\nRule 1: Pray as if everything depends on God; work as if everything depends on you.\nRule 2: Never let financial scarcity dictate what God can accomplish through obedience.\nRule 3: Keep your eyes fixed on the tabernacle, not on television ratings or worldly approval.\nRule 4: Laugh at yourself often—pride is the great enemy of grace.\nRule 5: When you suffer, offer it up in union with the Crucified Lord for the salvation of souls.\n\nToday, Mother Angelica’s legacy continues to shine across every continent as a living monument to what one woman wholly surrendered to God can achieve.`
  },
  {
    id: 'fb-art-aleteia-1',
    sourceId: 'fb-aleteia',
    sourceName: 'Aleteia (English)',
    handle: '@aleteia_en',
    pageUrl: 'https://www.facebook.com/aleteia.en',
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=120&q=80',
    postDate: 'Nov 5 at 8:45 AM',
    postCaption: 'Feeling mentally drained, anxious, or overwhelmed by your daily routine? The Saints discovered that five minutes of quiet adoration before the Blessed Sacrament can reorder the entire interior life.\n\nRead how silent Eucharistic presence heals the soul:',
    articleTitle: 'How Five Minutes of Silent Adoration Before the Tabernacle Transforms the Weary Soul',
    articleSummary: 'You do not need to memorize complicated prayers or read dense spiritual treatises. Simply sitting in the quiet gaze of Jesus in the tabernacle restores emotional balance, peace of mind, and supernatural hope.',
    articleDomain: 'aleteia.org',
    articleUrl: 'https://aleteia.org/2026/11/05/five-minutes-of-silent-adoration-transforms-soul/',
    articleImageUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=80',
    readTime: '4 min read',
    author: 'Cerith Gardiner',
    category: 'Prayer & Spirituality',
    likesCount: 8640,
    commentsCount: 520,
    sharesCount: 2890,
    fullArticleText: `A parish priest in Ars, France, noticed a local farmer sitting alone in the village church for hours every afternoon. The farmer had no prayer book, no beads in hand, and his lips did not move.\n\nCurious, Saint John Vianney approached him and asked: "My friend, what do you do here for so long?" The peasant looked up with serenity and replied: "Nothing, Monsieur le Curé. I look at Him, and He looks at me."\n\nThat peasant had unlocked the sublime secret of contemplation. Modern psychology affirms that constant sensory overstimulation creates chronic nervous exhaustion. But when a soul steps into the sacred stillness of a Catholic church, breathing in the quiet presence of Jesus Christ residing in the golden tabernacle, the soul undergoes spiritual decompression.\n\nSaint Alphonsus Liguori wrote: "Know that of all devotions, that of adoring Jesus in the Blessed Sacrament is the greatest after the sacraments, the one dearest to God and the one most helpful to us." Even five minutes spent on the way to work or on your lunch break will anchor your spirit in divine eternity.`
  },
  {
    id: 'fb-art-stpaul-1',
    sourceId: 'fb-stpaulcenter',
    sourceName: 'St. Paul Center',
    handle: '@stpaulcenter',
    pageUrl: 'https://www.facebook.com/stpaulcenter',
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=120&q=80',
    postDate: '5 days ago',
    postCaption: 'Why did the Book of Revelation take center stage in the early Church’s liturgy? Dr. Scott Hahn unpacks the astonishing truth that the Holy Sacrifice of the Mass is heaven touching earth.\n\nDive into our biblical theology study below:',
    articleTitle: 'Dr. Scott Hahn: The Lamb’s Supper — How the Apocalypse Unlocks the Holy Mass',
    articleSummary: 'When we read the Book of Revelation through Catholic eyes, we discover not an incomprehensible code about the end of the world, but the heavenly liturgy that we enter every time we step into the Mass.',
    articleDomain: 'stpaulcenter.com',
    articleUrl: 'https://stpaulcenter.com/studies-and-resources/the-lambs-supper-the-mass-as-heaven-on-earth/',
    articleImageUrl: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?auto=format&fit=crop&w=1200&q=80',
    readTime: '7 min read',
    author: 'Dr. Scott Hahn',
    category: 'Biblical Theology',
    likesCount: 10400,
    commentsCount: 670,
    sharesCount: 3510,
    fullArticleText: `When I was a Protestant pastor and biblical scholar, the Book of Revelation was an enigma of dragons, beasts, and apocalyptic trumpets. But on the morning I quietly slipped into the back of a Catholic chapel for daily Mass, scales fell from my eyes.\n\nSuddenly, the entire Apocalypse made coherent sense. In the Mass, I heard the words of Revelation: "Holy, holy, holy is the Lord God Almighty." I saw the altar, the golden chalice, the incense rising before the throne, the seven candles, the white-robed presbyters, and the chanting of the Lamb of God who takes away the sin of the world.\n\nSaint John was not writing a science fiction novel; he was giving the early persecuted Church a vision of the heavenly Eucharistic banquet. In the Mass, time collapses. Heaven opens. We stand at the foot of Mount Zion alongside the angels, archangels, and the triumphant company of the saints.\n\nWhen the priest raises the Host and proclaims, "Behold the Lamb of God," we are participating in the marriage supper of the Lamb. To miss Mass is to turn down an invitation to the court of the King of Kings.`
  },
  {
    id: 'fb-art-ascension-1',
    sourceId: 'fb-ascension',
    sourceName: 'Ascension',
    handle: '@AscensionPress',
    pageUrl: 'https://www.facebook.com/AscensionPress',
    verified: true,
    avatarUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=120&q=80',
    postDate: '6 days ago',
    postCaption: 'Fr. Mike Schmitz: "God doesn’t measure prayer by how good you feel during it. He measures prayer by your faithfulness when you’d rather do anything else."\n\nHow to persevere in prayer when dryness hits your soul:',
    articleTitle: 'Fr. Mike Schmitz: What to Do When You Feel Absolutely Nothing in Prayer',
    articleSummary: 'Feelings are the weather of the soul; faith is the rock upon which we stand. When prayers feel empty and God seems silent, that is often the precise moment your love is being purified of self-seeking.',
    articleDomain: 'media.ascensionpress.com',
    articleUrl: 'https://media.ascensionpress.com/2026/11/02/fr-mike-schmitz-dryness-in-prayer/',
    articleImageUrl: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80',
    readTime: '5 min read',
    author: 'Fr. Mike Schmitz',
    category: 'Faith & Pastoral',
    likesCount: 13200,
    commentsCount: 890,
    sharesCount: 4620,
    fullArticleText: `Almost every Catholic has experienced that heartbreaking moment: you sit down in your prayer corner or kneel before the tabernacle, and... nothing. No warm emotions, no profound insights, no spiritual goosebumps. Just boredom, distraction, and the persistent clock ticking on the wall.\n\nIt is tempting to think: "I must be doing this wrong," or worse, "God has abandoned me."\n\nFr. Mike Schmitz offers a profound corrective: "If you only pray when you feel like praying, you aren't loving God—you're loving the consolation God gives you."\n\nSaint John of the Cross called this the dark night of the senses. When God withdraws emotional candy from our spiritual diet, He is treating us as adults. He is asking: "Will you love Me for who I am, even when I give you no emotional payback?"\n\nWhen you show up to prayer tired and dry, and you stay for the full fifteen minutes purely out of love for Jesus, that prayer is often infinitely more pleasing to God than tears of joy. Fidelity in the desert is the crucible of sanctity.`
  }
];

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
