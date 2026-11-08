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

export interface CatholicFacebookSource {
  id: string;
  name: string;
  handle: string;
  socialUsername: string;
  pageUrl: string;
  category: string;
  description: string;
  staticPosts?: CatholicStaticSocialPost[];
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
      'DfXKc2DRKe4', 'DfUwwrKxbBo', 'DfUdUnZREdb',
      'DfR3jLgR9Pz', 'DfPK4dJRbQw', 'DfMy9o1RSTu'
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
      'DfZeeyUFJ2u', 'DfYS9wkF3c9', 'DfXt3irk4nO',
      'DfVd-cRFRVl', 'DfTQ_b2lK1Q', 'DfQv5oHFNl4'
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
      'DfZ4SHSCUgL', 'DfS9kGilc3j', 'DfP1A9FDSbj',
      'DfN4b6sCg_n', 'DfL-uJODS2x', 'DfJH3a4CWyP'
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
      'DfQkH0XDMGD', 'DfKUnvWl2YL', 'DfCtqTbPJE3',
      'De-d6KuAMR1', 'De5F_WAlUfK', 'De2N6P-lu-8'
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
      'DfIEdAbjJat', 'DfBGG9ijkSk', 'De-d6KuAMR1',
      'De5F_WAlUfK', 'De2N6P-lu-8', 'DexL_TxlzVd'
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
      'Dfdc1NsEXy7', 'DfdaAiRCkCC', 'DfdWKDjFGCF',
      'DfdSmtQglJJ', 'DfdSIURARsW', 'DfdNR4QAQKC',
      'DfdKL3Ogpv2', 'Dfc-lRsgfLq', 'Dfc7Z6eAR-H'
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
      'DfShAinlwx8', 'DfSErQgFwg0', 'DfQAXstiZS3',
      'DfN4Z1KFrvL', 'DfL-y24Fz5m', 'DfJHe0kFG1X'
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
      'DfS9UiAF9SP', 'DfQPZbPm2a7', 'DfLnJc1OX1i',
      'DfJG-e6m4Qx', 'DfGu8G1m6Kz', 'DfDq4l-m7Nv'
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
      'DfUlBvQkfvQ', 'DfQHW31l1NW', 'DfNAPJwF7yw',
      'DfKa4R-l8sV', 'DfH36b3F4xN', 'DfFc9Jzl_1Q'
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
