export interface CatholicWebsiteLink {
  id: string;
  name: string;
  url: string;
  secondaryUrl?: string;
  secondaryLabel?: string;
  displayDomain: string;
  category:
    | 'Holy See and Magisterium'
    | 'Scripture and Liturgy'
    | 'Patristics and Theology'
    | 'Apologetics and Catechesis'
    | 'News and Catholic Culture'
    | 'Prayer and Devotion';
  tagline: string;
  whyItsGood: string;
  keyHighlights: string[];
  featured?: boolean;
}

export const INITIAL_CATHOLIC_LINKS: CatholicWebsiteLink[] = [
  {
    id: 'catholic-com',
    name: 'Catholic.com (Catholic Answers)',
    url: 'https://www.catholic.com',
    displayDomain: 'catholic.com',
    category: 'Apologetics and Catechesis',
    tagline: 'The World’s Largest Ministry of Catholic Apologetics and Evangelization',
    whyItsGood:
      'Catholic.com is the single best online resource for answering objections and explaining why Catholics believe what we believe. Whether you are discussing the Real Presence in the Eucharist, the Papacy, Marian dogmas, Purgatory, or Sacred Tradition, Catholic Answers provides thousands of clear, charitable, Scripture-saturated tracts, encyclopedic articles, and daily Catholic Answers Live radio Q and A broadcasts.',
    keyHighlights: [
      'Thousands of searchable apologetics tracts, articles, and video answers by trusted apologists',
      'Home of Catholic Answers Live — daily call-in Q and A on doctrine, Scripture, and moral theology',
      'Essential resource for OCIA/RCIA candidates, converts, and Catholics sharing the faith with family and friends'
    ],
    featured: true
  },
  {
    id: 'magisterium-ai',
    name: 'Magisterium AI',
    url: 'https://www.magisterium.com',
    displayDomain: 'magisterium.com',
    category: 'Holy See and Magisterium',
    tagline: 'Authoritative Research Engine Grounded Strictly in Official Church Documents',
    whyItsGood:
      'Developed in collaboration with Catholic scholars and universities (such as Pontifical Oriental Institute initiatives), Magisterium AI is uniquely valuable because it does not speculate from general internet opinions. Instead, every answer it provides is strictly cited and footnoted from over 25,000+ official Magisterial documents — including the Catechism, Code of Canon Law, Ecumenical Councils, Papal Encyclicals, Vatican congregations, and Doctors of the Church.',
    keyHighlights: [
      'Every response includes direct, verifiable citations to paragraphs in the CCC, Canon Law, and Vatican documents',
      'Trained exclusively on authoritative Magisterial, Patristic, and Thomistic sources',
      'Ideal for catechists, students, clergy, and anyone seeking exact Church teaching on complex doctrinal or moral questions'
    ],
    featured: true
  },
  {
    id: 'christendom-app',
    name: 'Christendom (Christendom.app)',
    url: 'https://christendom.app',
    displayDomain: 'christendom.app',
    category: 'News and Catholic Culture',
    tagline: 'Centralized Catholic Video and Media Hub Uniting Faithful Creators',
    whyItsGood:
      'Christendom.app is a free, lay-run Catholic media aggregation platform that gathers videos, homilies, apologetics, interviews, and theological discussions from hundreds of faithful Catholic priests, scholars, and commentators into one distraction-free hub. Instead of relying on secular social media algorithms, you can follow your favorite Catholic channels directly, build custom watchlists, and discover solid Catholic video content in one place.',
    keyHighlights: [
      'Unifies hundreds of trusted Catholic video creators, priests, apologists, and commentators in one hub',
      'Custom feeds, “Watch Later” queues, and curated playlists free from secular algorithm distractions',
      'Available on the web (christendom.app) as well as iOS and Android mobile apps'
    ],
    featured: true
  },
  {
    id: 'st-paul-center',
    name: 'St. Paul Center for Biblical Theology',
    url: 'https://stpaulcenter.com',
    displayDomain: 'stpaulcenter.com',
    category: 'Scripture and Liturgy',
    tagline: 'Dr. Scott Hahn’s Institute Reading the Bible from the Heart of the Church',
    whyItsGood:
      'Founded by renowned Catholic theologian and convert Dr. Scott Hahn, the St. Paul Center for Biblical Theology promotes life-transforming Scripture study based on the Church’s living tradition and covenant theology. It shows how the Old Testament is fulfilled in the New Testament and how the entire Bible comes alive in the Catholic Mass and the Sacraments.',
    keyHighlights: [
      'Weekly “Sunday Bible Reflections” by Dr. Scott Hahn unpacking the Mass readings through covenant theology',
      'Journey Through Scripture video Bible studies (Genesis to Jesus, The Bible and the Virgin Mary, The Lamb’s Supper)',
      'Deep theological articles and courses by Dr. Scott Hahn, Dr. John Bergsma, and Dr. Brant Pitre'
    ],
    featured: true
  },
  {
    id: 'word-on-fire',
    name: 'Word on Fire (WordOnFire.org)',
    url: 'https://www.wordonfire.org',
    displayDomain: 'wordonfire.org',
    category: 'Apologetics and Catechesis',
    tagline: 'Bishop Robert Barron’s Global Apostolate Proclaiming Christ Through Truth, Goodness and Beauty',
    whyItsGood:
      'Founded by Bishop Robert Barron, Word on Fire is one of the most effective evangelistic ministries in the modern Church. Instead of dumbing down the faith, Word on Fire leads seekers and believers to Christ through the luminous beauty of Gothic cathedrals, sacred art, Flannery O’Connor, Dostoevsky, St. Thomas Aquinas, and St. John Henry Newman, alongside weekly Sunday Gospel homilies and daily Scripture reflections.',
    keyHighlights: [
      'Weekly Sunday Mass homilies and daily Gospel reflections written by Bishop Robert Barron',
      'Acclaimed articles, podcasts (The Word on Fire Show), and visual commentaries on Catholicism and culture',
      'Deep theological engagement with atheism, scientism, and secular philosophy'
    ],
    featured: true
  },
  {
    id: 'first-things',
    name: 'First Things',
    url: 'https://www.firstthings.com',
    displayDomain: 'firstthings.com',
    category: 'Patristics and Theology',
    tagline: 'America’s Most Influential Journal of Religion, Theology, and Public Life',
    whyItsGood:
      'Founded in 1990 by Fr. Richard John Neuhaus, First Things brings the full weight of Catholic intellectual tradition, natural law, and biblical wisdom to bear on modern culture, politics, bioethics, philosophy, and literature. It is where the most serious theological, philosophical, and cultural essays of our era are published for readers who want to think deeply with the mind of the Church in the public square.',
    keyHighlights: [
      'Rigorous long-form essays by leading Catholic theologians, philosophers, bishops, and cultural critics',
      'Uncompromising defense of the sanctity of human life, religious liberty, marriage, and natural law',
      'Thoughtful book reviews, poetry, and theological commentary on contemporary society'
    ],
    featured: true
  },
  {
    id: 'eternal-christendom',
    name: 'Eternal Christendom',
    url: 'https://eternalchristendom.com',
    displayDomain: 'eternalchristendom.com',
    category: 'Patristics and Theology',
    tagline: '“Cultivating Saints, Sages, and Statesmen Through the Great Tradition of Christendom”',
    whyItsGood:
      'Founded by Catholic convert, researcher, and author Joshua Charles, Eternal Christendom is a powerhouse of historical and patristic apologetics. Its “Becoming Catholic” quote banks, deep-dive essays, and podcasts gather primary-source testimonies from the Early Church Fathers, Doctors of the Church, and ecumenical councils to demonstrate the unbroken historical continuity of the Catholic Faith from the Apostles to the present day.',
    keyHighlights: [
      'Extensive primary-source quote archives from the Early Church Fathers organized by doctrine',
      'In-depth historical and biblical essays helping Protestants and seekers discover the ancient Church',
      'The Eternal Christendom Podcast exploring classic texts, spiritual warfare, and the lives of the Saints'
    ],
    featured: true
  },
  {
    id: 'aleteia',
    name: 'Aleteia (Aleteia.org)',
    url: 'https://aleteia.org',
    displayDomain: 'aleteia.org',
    category: 'News and Catholic Culture',
    tagline: 'Global Catholic Spirituality, Saint Stories, Family Life and Inspiring News',
    whyItsGood:
      'Published daily in seven languages with the support of the Foundation for Evangelization through the Media, Aleteia (from the Greek word for “Truth”) is a warm, uplifting daily read. It excels at uncovering little-known stories of the Saints, ancient monasteries, Eucharistic miracles, practical Catholic family advice, prayers for specific life struggles, and hopeful news from the global Church.',
    keyHighlights: [
      'Inspiring daily stories of Saints, blesseds, miracles, and sacred pilgrimage sites around the world',
      'Practical spiritual wisdom for Catholic marriage, parenting, mental peace, and daily prayer',
      'Accessible explanations of liturgical traditions, feast days, and sacred art'
    ]
  },
  {
    id: 'catholic-digest',
    name: 'Catholic Digest (CatholicDigest.com)',
    url: 'https://www.catholicdigest.com',
    displayDomain: 'catholicdigest.com',
    category: 'News and Catholic Culture',
    tagline: 'Trusted Companion for Joyful Catholic Living Since 1936',
    whyItsGood:
      'Founded in 1936 by Fr. Louis Gales, Catholic Digest has spent nearly a century helping everyday Catholics live their faith with warmth, joy, and practical wisdom. It features accessible explanations of Church customs, profiles of everyday Catholic heroes, seasonal recipes for feast days and liturgical fasts, saintly reflections, and pastoral Q and As.',
    keyHighlights: [
      'Warm, approachable articles on living the liturgical year in the Catholic home (Domestic Church)',
      'Clear “Ask a Priest” Q and As on everyday Catholic practices, sacramentals, and devotions',
      'Inspiring personal testimonies of answered prayers, conversion, and charity in action'
    ]
  },
  {
    id: 'fio-fm',
    name: 'Fio (Fio.fm)',
    url: 'https://fio.fm',
    secondaryUrl: 'https://play.fio.fm',
    secondaryLabel: 'Web Player (play.fio.fm)',
    displayDomain: 'fio.fm',
    category: 'Prayer and Devotion',
    tagline: 'All-in-One Catholic Audio Streaming Platform for Podcasts, Sacred Music and Audiobooks',
    whyItsGood:
      'Fio.fm is the Catholic answer to Spotify and Audible — a unified, 100% faith-aligned streaming platform where every creator is vetted for fidelity to Catholic teaching. It brings together over 60 categories of Catholic podcasts, sacred chant and contemporary worship music, curated Eucharistic Adoration playlists, and classic Catholic audiobooks from publishers like TAN Books, Sophia Institute Press, and Pauline Books and Media.',
    keyHighlights: [
      'Thousands of trusted Catholic podcasts, homilies, and audio prayers in one distraction-free app and web player',
      'Curated sacred music playlists for Eucharistic Adoration, Lectio Divina, and quiet contemplation',
      'Audiobooks of the Saints and spiritual classics while directly supporting Catholic creators and musicians'
    ],
    featured: true
  },
  {
    id: 'adoremus',
    name: 'Adoremus (Adoremus.org)',
    url: 'https://adoremus.org',
    displayDomain: 'adoremus.org',
    category: 'Scripture and Liturgy',
    tagline: 'Society for the Renewal of the Sacred Liturgy — Beauty, Reverence and Liturgical Theology',
    whyItsGood:
      'Founded in 1995 by Fr. Joseph Fessio, S.J., Helen Hull Hitchcock, and Fr. Jerry Pokorsky, Adoremus is dedicated to the authentic renewal of the Catholic liturgy in harmony with Vatican II’s Sacrosanctum Concilium and Pope Benedict XVI’s liturgical theology. The Adoremus Bulletin offers unmatched scholarship on the rubrics of the Roman Missal, Gregorian chant, sacred architecture, liturgical art, and reverent celebration of the Holy Sacrifice of the Mass.',
    keyHighlights: [
      'In-depth articles on the history, rubrics, and mystical meaning of every part of the Holy Mass',
      'Official Church documents on Sacred Music, Sacred Architecture, and Eucharistic reverence',
      'Practical Q and A on liturgical norms, vestments, altar vessels, and the General Instruction of the Roman Missal (GIRM)'
    ],
    featured: true
  },
  {
    id: 'cbcp-news',
    name: 'CBCPnews.net (Catholic Bishops’ Conference of the Philippines)',
    url: 'https://cbcpnews.net',
    secondaryUrl: 'https://cbcponline.net',
    secondaryLabel: 'CBCP Official Portal (cbcponline.net)',
    displayDomain: 'cbcpnews.net',
    category: 'News and Catholic Culture',
    tagline: 'Official News Service of the Catholic Bishops’ Conference of the Philippines',
    whyItsGood:
      'CBCPnews.net is the official news agency of the Catholic Bishops’ Conference of the Philippines, serving one of the largest and most devout Catholic nations in the world. It provides authoritative, daily coverage of the Philippine Church, official CBCP pastoral letters and liturgical directives, reports on national shrines and parishes, Asian Church developments, and dispatches directly from the Vatican.',
    keyHighlights: [
      'Official pastoral statements, liturgical guidelines, and decrees from the Philippine Bishops',
      'Daily news coverage of archdioceses, parishes, Marian shrines, and major liturgical celebrations',
      'Direct Vatican and Asian Church reporting faithful to the Magisterium'
    ],
    featured: true
  },
  {
    id: 'usccb',
    name: 'USCCB (United States Conference of Catholic Bishops)',
    url: 'https://www.usccb.org',
    secondaryUrl: 'https://bible.usccb.org',
    secondaryLabel: 'Daily Readings (bible.usccb.org)',
    displayDomain: 'usccb.org',
    category: 'Holy See and Magisterium',
    tagline: 'Official Lectionary Readings, NABRE Catholic Bible and Episcopal Teachings',
    whyItsGood:
      'The official website of the U.S. Catholic Bishops is an indispensable daily companion for every Catholic. It hosts the official Daily Mass Readings (Lectionary) with daily audio recordings and video reflections, the complete text of the New American Bible Revised Edition (NABRE) with full theological footnotes, the searchable Catechism of the Catholic Church, liturgical calendar guides, and Catholic social teaching documents.',
    keyHighlights: [
      'Official Daily Mass Lectionary readings synchronized with the liturgical calendar and audio proclamations',
      'Complete online Catholic Bible (NABRE) and Catechism of the Catholic Church',
      'Authoritative guides on the Sacraments, National Eucharistic Revival, pro-life ministry, and Catholic prayers'
    ],
    featured: true
  }
];
