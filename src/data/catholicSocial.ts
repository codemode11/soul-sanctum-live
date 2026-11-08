export interface CatholicInstagramSource {
  id: string;
  name: string;
  username: string;
  category: string;
  description: string;
  profileUrl: string;
  defaultShortcodes: string[];
}

export interface CatholicFacebookSource {
  id: string;
  name: string;
  handle: string;
  pageUrl: string;
  category: string;
  description: string;
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
    id: 'ig-vaticannews',
    name: 'Vatican News',
    username: 'vaticannews',
    category: 'Holy See & Papal Ministry',
    description: 'Official Instagram feed of Vatican News from the Dicastery for Communication of the Holy See.',
    profileUrl: 'https://www.instagram.com/vaticannews/',
    defaultShortcodes: ['Dfdc1NsEXy7', 'DfdaAiRCkCC', 'DfdZ_wKCuqc', 'DfdZ_yJCoEf', 'DfdZ_zgiiCe', 'DfdZ_uCCsYl']
  },
  {
    id: 'ig-ewtnmedia',
    name: 'EWTN Global Catholic Network',
    username: 'ewtnmedia',
    category: 'Global Catholic Television',
    description: 'Daily Catholic prayers, Papal updates, Saint feast days, and Eucharistic devotion from EWTN.',
    profileUrl: 'https://www.instagram.com/ewtnmedia/',
    defaultShortcodes: ['DfcLS5sjHof', 'Dfa4WLVlY2G', 'Dfaik3BjOpq', 'DfZeeyUFJ2u']
  },
  {
    id: 'ig-ascensionpress',
    name: 'Ascension',
    username: 'ascensionpress',
    category: 'Scripture & Catechism',
    description: 'Featured Reels, Scripture reflections, and Catechism insights with Fr. Mike Schmitz, Jeff Cavins, and Ascension.',
    profileUrl: 'https://www.instagram.com/ascensionpress/',
    defaultShortcodes: ['Dfc_a6dh9l6', 'DfaM3dOSo2T', 'DfZzi7zNWJZ', 'DfXhaCjF0jf']
  },
  {
    id: 'ig-catholicanswers',
    name: 'Catholic Answers',
    username: 'catholicanswers',
    category: 'Apologetics & Evangelization',
    description: 'Clear explanations of Catholic doctrine, apologetics Q&As, and feast day reflections from Catholic.com.',
    profileUrl: 'https://www.instagram.com/catholicanswers/',
    defaultShortcodes: ['DfazpyEgaIa', 'DfagCq8D3sp', 'DfZsT64CpxV', 'DfYQhEYAB8J']
  },
  {
    id: 'ig-thedivinemercy',
    name: 'The Divine Mercy (Marian Fathers)',
    username: 'thedivinemercy',
    category: 'Divine Mercy & St. Faustina',
    description: 'Daily Diary quotes of St. Faustina, National Shrine of The Divine Mercy updates, and Marian Fathers reflections.',
    profileUrl: 'https://www.instagram.com/thedivinemercy/',
    defaultShortcodes: ['DfWKM5HAS9l', 'DfSY0XCjT3B', 'DfOnweij1aj', 'DfM7kDkj3fJ']
  },
  {
    id: 'ig-ncregister',
    name: 'National Catholic Register',
    username: 'ncregister',
    category: 'Catholic Journalism',
    description: 'Fidelity to the Magisterium — visual stories, sacred liturgy, and news from the National Catholic Register.',
    profileUrl: 'https://www.instagram.com/ncregister/',
    defaultShortcodes: ['DfdmmVmNqN1', 'DfdkvpDuHz0', 'DfdiiN7Rm7h', 'Dfdd6VFO4To']
  },
  {
    id: 'ig-wordonfire',
    name: 'Word on Fire',
    username: 'wordonfire',
    category: 'Theology & Culture',
    description: 'Bishop Robert Barron and Word on Fire proclaiming Christ in the culture through beauty, truth, and goodness.',
    profileUrl: 'https://www.instagram.com/wordonfire/',
    defaultShortcodes: ['BYS0FWqF7hG', 'BYDZHvMA95e', 'BXUqbQYlkPZ', 'BWumymgFaPg']
  }
];

export const CATHOLIC_FACEBOOK_SOURCES: CatholicFacebookSource[] = [
  {
    id: 'fb-vaticannews',
    name: 'Vatican News (English)',
    handle: '@vaticannews',
    pageUrl: 'https://www.facebook.com/vaticannews',
    category: 'Holy See & Papal Ministry',
    description: 'Official English Facebook timeline of Vatican News covering the Holy Father, Roman Curia, and Universal Church.'
  },
  {
    id: 'fb-ewtn',
    name: 'EWTN Global Catholic Network',
    handle: '@ewtnonline',
    pageUrl: 'https://www.facebook.com/ewtnonline',
    category: 'Global Catholic Television',
    description: 'Live Mass broadcasts, devotions, Catholic news, and daily spiritual encouragement from EWTN.'
  },
  {
    id: 'fb-ascension',
    name: 'Ascension (Fr. Mike Schmitz & Jeff Cavins)',
    handle: '@AscensionPress',
    pageUrl: 'https://www.facebook.com/AscensionPress',
    category: 'Scripture & Catechism',
    description: 'Daily Catholic videos, Bible in a Year & Catechism in a Year community posts, and faith formation.'
  },
  {
    id: 'fb-wordonfire',
    name: 'Bishop Robert Barron / Word on Fire',
    handle: '@WordOnFire',
    pageUrl: 'https://www.facebook.com/WordOnFire',
    category: 'Theology & Evangelization',
    description: 'Homilies, cultural commentary, theological articles, and sacred art reflections from Word on Fire.'
  },
  {
    id: 'fb-catholicanswers',
    name: 'Catholic Answers',
    handle: '@catholicanswers',
    pageUrl: 'https://www.facebook.com/catholicanswers',
    category: 'Apologetics & Doctrine',
    description: 'Explaining and defending the Catholic Faith with daily apologetics clips, articles, and live Q&A.'
  },
  {
    id: 'fb-divinemercy',
    name: 'The Divine Mercy (Marian Fathers)',
    handle: '@DivineMercyOfficial',
    pageUrl: 'https://www.facebook.com/DivineMercyOfficial',
    category: 'Divine Mercy & Marian Devotion',
    description: 'Official Facebook page of the Marian Fathers of the Immaculate Conception at the National Shrine of The Divine Mercy.'
  },
  {
    id: 'fb-ncregister',
    name: 'National Catholic Register',
    handle: '@NCRegister',
    pageUrl: 'https://www.facebook.com/NCRegister',
    category: 'Catholic News & Analysis',
    description: 'Breaking Catholic news, Vatican dispatches, saint features, and liturgical reflections.'
  },
  {
    id: 'fb-cna',
    name: 'Catholic News Agency (CNA)',
    handle: '@catholicnewsagency',
    pageUrl: 'https://www.facebook.com/catholicnewsagency',
    category: 'Global Catholic News',
    description: 'Up-to-the-minute global news and photography from the universal Catholic Church.'
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
    id: 'pin-ascensionpress',
    name: 'Ascension',
    username: 'ascensionpress',
    category: 'Scripture & Faith Formation',
    description: 'Bible study charts, Rosary guides, saint quotes, and Catholic spiritual formation graphics.',
    profileUrl: 'https://www.pinterest.com/ascensionpress/'
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
    id: 'https://www.pinterest.com/pin/490962796896630722/',
    username: 'catholicanswers',
    title: 'Holy Habits: Repentance, Fasting, and Spiritual Growth',
    description: 'Deepen your interior life through daily prayer, fasting, and almsgiving in union with the universal Church.',
    link: 'https://www.pinterest.com/pin/490962796896630722/',
    pubDate: 'Wed, 05 Mar 2025 23:34:40 GMT',
    imageUrl: 'https://i.pinimg.com/736x/12/33/ef/1233ef94aed67530b3a572a47f257068.jpg',
    thumbnailUrl: 'https://i.pinimg.com/236x/12/33/ef/1233ef94aed67530b3a572a47f257068.jpg'
  }
];
