export type ChurchEra = 
  | 'apostolic' 
  | 'patristic' 
  | 'medieval' 
  | 'renaissance' 
  | 'modern' 
  | 'contemporary';

export interface TimelineEvent {
  id: string;
  year: string;
  yearNumeric: number;
  era: ChurchEra;
  title: string;
  subtitle: string;
  location: string;
  keyFigures: string[];
  description: string;
  theologicalSignificance: string;
  scriptureOrDocumentRef?: string;
}

export interface EcumenicalCouncil {
  number: number;
  name: string;
  year: string;
  pope: string;
  keyDogma: string;
  historicalContext: string;
}

export const CHURCH_ERAS_INFO: Record<ChurchEra, {
  name: string;
  period: string;
  theme: string;
  summary: string;
  bgGradient: string;
  accentColor: string;
}> = {
  apostolic: {
    name: 'Apostolic and Early Church',
    period: 'c. AD 30 – 313',
    theme: 'Foundations and Martyrdom',
    summary: 'From Pentecost and the missionary journeys of Saints Peter and Paul through the catacombs and Roman persecutions until the Edict of Milan.',
    bgGradient: 'from-amber-950/40 via-stone-900 to-amber-950/40',
    accentColor: '#D4AF37'
  },
  patristic: {
    name: 'Patristic and Imperial Age',
    period: 'AD 313 – 800',
    theme: 'Creeds, Councils and Monasticism',
    summary: 'The era of the Church Fathers, the great Ecumenical Councils defining the Trinity and Christology, the Latin Vulgate, and St. Benedictine monasticism.',
    bgGradient: 'from-stone-900 via-amber-950/30 to-stone-900',
    accentColor: '#C49B6E'
  },
  medieval: {
    name: 'High Middle Ages and Great Schism',
    period: 'AD 800 – 1300',
    theme: 'Christendom and Scholastic Flowering',
    summary: 'Coronation of Charlemagne, monastic reforms of Cluny, the East-West Schism (1054), Crusades, Gothic architecture, St. Thomas Aquinas and the Mendicants.',
    bgGradient: 'from-amber-950/30 via-stone-950 to-stone-900',
    accentColor: '#E6A15C'
  },
  renaissance: {
    name: 'Renaissance and Reformation',
    period: 'AD 1300 – 1648',
    theme: 'Tridentine Renewal and Global Missions',
    summary: 'The Council of Trent, the Catholic Reformation, St. Ignatius and the Jesuits, Our Lady of Guadalupe, and the global evangelization of the Americas and Asia.',
    bgGradient: 'from-stone-950 via-amber-950/20 to-stone-900',
    accentColor: '#D97706'
  },
  modern: {
    name: 'Enlightenment and Modern Papacy',
    period: 'AD 1648 – 1958',
    theme: 'Social Teaching and Marian Dawning',
    summary: 'Navigating secular revolutions, First Vatican Council (Papal Infallibility), Pope Leo XIII and Catholic Social Teaching, Lourdes, Fatima, and world wars.',
    bgGradient: 'from-stone-900 via-stone-950 to-stone-900',
    accentColor: '#B45309'
  },
  contemporary: {
    name: 'Vatican II to the Present',
    period: 'AD 1958 – 2026',
    theme: 'Universal Call to Holiness and Global Church',
    summary: 'The Second Vatican Council, the historic pontificate of St. John Paul II, Benedict XVI, Pope Francis, the Catechism, and rapid growth in the Global South.',
    bgGradient: 'from-amber-950/40 via-stone-900 to-stone-950',
    accentColor: '#F59E0B'
  }
};

export const CHURCH_TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'pentecost-ad33',
    year: 'AD 30 / 33',
    yearNumeric: 33,
    era: 'apostolic',
    title: 'Pentecost: Birth of the Catholic Church',
    subtitle: 'Descent of the Holy Spirit upon the Apostles and the Virgin Mary',
    location: 'Cenacle (Upper Room), Jerusalem',
    keyFigures: ['Saint Peter', 'Virgin Mary', 'The Twelve Apostles'],
    description: 'Fifty days after the Resurrection of Jesus Christ, the Holy Spirit descended with the sound of a rushing wind and tongues of fire upon the Apostles and Mary. St. Peter proclaimed the Kerygma, and three thousand souls were baptized, marking the public beginning of the universal Church.',
    theologicalSignificance: 'The Holy Spirit animates the Mystical Body of Christ, bestowing apostolic authority and inaugurating the missionary mandate to all nations.',
    scriptureOrDocumentRef: 'Acts 2:1-41; CCC 731-732'
  },
  {
    id: 'council-jerusalem-ad49',
    year: 'AD 49 / 50',
    yearNumeric: 50,
    era: 'apostolic',
    title: 'The Council of Jerusalem',
    subtitle: 'The First Apostolic Council and Gentile Inclusion',
    location: 'Jerusalem',
    keyFigures: ['Saint Peter', 'Saint Paul', 'Saint James the Just'],
    description: 'The Apostles gathered to resolve whether Gentile converts to Christianity were bound by Mosaic ceremonial laws, particularly circumcision. St. Peter pronounced the magisterial judgment that salvation is by the grace of the Lord Jesus Christ alone.',
    theologicalSignificance: 'Established the conciliar model of ecclesiastical governance under Petrine primacy, affirming the Catholic (universal) nature of salvation.',
    scriptureOrDocumentRef: 'Acts 15:1-29; Galatians 2:1-10'
  },
  {
    id: 'martyrdom-peter-paul-ad67',
    year: 'c. AD 64 – 67',
    yearNumeric: 67,
    era: 'apostolic',
    title: 'Martyrdom of Saints Peter and Paul in Rome',
    subtitle: 'Petrine Foundation and Blood of the Martyrs',
    location: 'Rome (Vatican Hill and Ostian Way)',
    keyFigures: ['Saint Peter', 'Saint Paul', 'Emperor Nero'],
    description: 'During the first imperial persecution under Nero, St. Peter was crucified upside-down on the Vatican Hill (where St. Peter\'s Basilica now stands), and St. Paul was beheaded along the Via Ostiense as a Roman citizen.',
    theologicalSignificance: 'Consecrated the See of Rome as the perpetual Chair of Peter. As Tertullian wrote: "The blood of the martyrs is the seed of the Church."',
    scriptureOrDocumentRef: '1 Clement 5; Eusebius, Church History'
  },
  {
    id: 'ignatius-catholic-ad107',
    year: 'c. AD 107',
    yearNumeric: 107,
    era: 'apostolic',
    title: 'St. Ignatius of Antioch First Uses the Word "Catholic"',
    subtitle: 'The Universal Church and Real Presence in the Eucharist',
    location: 'Antioch / En route to Rome',
    keyFigures: ['Saint Ignatius of Antioch (Apostolic Father)'],
    description: 'In his Letter to the Smyrnaeans, St. Ignatius, disciple of St. John the Apostle, wrote: "Wherever Jesus Christ is, there is the Catholic Church." He also strongly affirmed the Real Presence of Christ\'s Body and Blood in the Holy Eucharist against Docetist heresies.',
    theologicalSignificance: 'Earliest surviving written record designating Christ\'s Church as "Catholic" (Greek: Katholikos, meaning "universal" or "complete according to the whole").',
    scriptureOrDocumentRef: 'Epistle to the Smyrnaeans, 8:2'
  },
  {
    id: 'edict-milan-ad313',
    year: 'AD 313',
    yearNumeric: 313,
    era: 'patristic',
    title: 'The Edict of Milan: Freedom of the Christian Faith',
    subtitle: 'Emperor Constantine Legalizes Christianity',
    location: 'Mediolanum (Modern Milan, Italy)',
    keyFigures: ['Emperor Constantine the Great', 'Licinius', 'Pope St. Sylvester I'],
    description: 'After three centuries of periodic persecution under Emperors Nero, Decius, and Diocletian, Emperor Constantine and Licinius issued the Edict of Milan, establishing universal religious toleration and ordering the restoration of confiscated Christian properties and basilicas.',
    theologicalSignificance: 'Ended Roman persecutions and inaugurated the era of public Christian architecture, imperial patronage, and theological consolidation.',
    scriptureOrDocumentRef: 'Lactantius, De Mortibus Persecutorum 48'
  },
  {
    id: 'first-council-nicaea-ad325',
    year: 'AD 325',
    yearNumeric: 325,
    era: 'patristic',
    title: 'First Council of Nicaea (First Ecumenical Council)',
    subtitle: 'The Nicene Creed and the Divinity of Christ',
    location: 'Nicaea (Modern Iznik, Turkey)',
    keyFigures: ['Saint Athanasius', 'Saint Nicholas of Myra', 'Pope St. Sylvester I (legates)'],
    description: 'Convoked to confront Arius, who denied the full divinity of the Son. 318 bishops defined that Jesus Christ is "Homoousios" (consubstantial / of one substance) with the Father, formulating the core of the Nicene Creed recited at every Sunday Mass today.',
    theologicalSignificance: 'Infallibly dogmatized the full divinity and eternal begottenness of God the Son, forming the bedrock of Trinitarian orthodoxy.',
    scriptureOrDocumentRef: 'Nicene Creed; First Ecumenical Council'
  },
  {
    id: 'latin-vulgate-ad382',
    year: 'AD 382 – 405',
    yearNumeric: 382,
    era: 'patristic',
    title: 'St. Jerome Translates the Latin Vulgate Bible',
    subtitle: 'The Canon of Sacred Scripture Promulgated',
    location: 'Bethlehem / Rome',
    keyFigures: ['Saint Jerome', 'Pope Saint Damasus I'],
    description: 'Commissioned by Pope Damasus I, St. Jerome spent three decades in a cave next to the Church of the Nativity in Bethlehem translating the Old Testament from Hebrew and the New Testament from Greek into Latin. The Council of Rome (382) affirmed the 73-book Catholic biblical canon.',
    theologicalSignificance: 'Created the definitive scriptural text of the Western Catholic Church for over 1,500 years and formalized the 73-book canon of Scripture.',
    scriptureOrDocumentRef: 'Decree of Damasus (382); Council of Carthage (397)'
  },
  {
    id: 'council-chalcedon-ad451',
    year: 'AD 451',
    yearNumeric: 451,
    era: 'patristic',
    title: 'Council of Chalcedon and The Tome of Pope St. Leo the Great',
    subtitle: 'Two Natures in One Divine Person',
    location: 'Chalcedon, Bithynia',
    keyFigures: ['Pope Saint Leo the Great', 'Emperor Marcian'],
    description: 'Over 500 bishops assembled to condemn Monophysitism. When Pope Leo\'s doctrinal letter (the *Tome*) was read, the council fathers exclaimed: "Peter has spoken through Leo!" The Council defined Christ as one divine Person in two complete natures, divine and human, without confusion or division.',
    theologicalSignificance: 'Definitive Christological dogma safeguarding the reality of the Incarnation, our Redemption, and Petrine doctrinal infallibility.',
    scriptureOrDocumentRef: 'Chalcedonian Definition; Tome of Leo'
  },
  {
    id: 'monastic-rule-benedict-ad529',
    year: 'AD 529',
    yearNumeric: 529,
    era: 'patristic',
    title: 'St. Benedict Founds Monte Cassino: Ora et Labora',
    subtitle: 'The Father of Western Monasticism and European Culture',
    location: 'Monte Cassino, Italy',
    keyFigures: ['Saint Benedict of Nursia', 'Saint Scholastica'],
    description: 'St. Benedict composed the holy *Rule of Saint Benedict*, centering monastic life on prayer, liturgical praise (*Opus Dei*), manual work, and hospitality (*Ora et Labora*). Benedictine monasteries became the ark preserving classical knowledge, agriculture, and literature through the Dark Ages.',
    theologicalSignificance: 'Established the institutional foundation of Western monasticism and Christian civil order across medieval Europe.',
    scriptureOrDocumentRef: 'Rule of Saint Benedict; Dialogues of St. Gregory'
  },
  {
    id: 'coronation-charlemagne-ad800',
    year: 'AD 800',
    yearNumeric: 800,
    era: 'medieval',
    title: 'Charlemagne Crowned Holy Roman Emperor on Christmas Day',
    subtitle: 'Birth of Western Christendom',
    location: 'Old St. Peter\'s Basilica, Rome',
    keyFigures: ['Pope Saint Leo III', 'Charlemagne'],
    description: 'On Christmas Day in the year 800, Pope Leo III crowned the King of the Franks as Emperor of the Romans. This initiated the Holy Roman Empire, a geopolitical and spiritual alliance uniting European nations under Christian principles.',
    theologicalSignificance: 'Deepened the relationship between temporal governance and ecclesiastical authority throughout medieval Christendom.',
    scriptureOrDocumentRef: 'Annales Regni Francorum'
  },
  {
    id: 'great-schism-1054',
    year: 'AD 1054',
    yearNumeric: 1054,
    era: 'medieval',
    title: 'The Great East-West Schism',
    subtitle: 'The Separation between the Catholic West and the Eastern Orthodox',
    location: 'Hagia Sophia, Constantinople / Rome',
    keyFigures: ['Pope Leo IX (Cardinal Humbert)', 'Patriarch Michael Cerularius'],
    description: 'Long-simmering tensions over papal universal jurisdiction, liturgical customs (unleavened bread), and the *Filioque* clause culminated when Cardinal Humbert placed a bull of excommunication on the altar of Hagia Sophia. While mutual anathemas were lifted in 1965 by Pope Paul VI and Patriarch Athenagoras, the separation remains an ongoing ecumenical wound.',
    theologicalSignificance: 'Tragic division within the historic apostolic churches; heightened Catholic commitment to prayer for the full visible unity of the Body of Christ.',
    scriptureOrDocumentRef: 'Unitatis Redintegratio (Vatican II)'
  },
  {
    id: 'mendicants-aquinas-1215',
    year: 'AD 1215',
    yearNumeric: 1215,
    era: 'medieval',
    title: 'Fourth Lateran Council and The Mendicant Golden Age',
    subtitle: 'Transubstantiation Defined, St. Francis and St. Dominic',
    location: 'Lateran Basilica, Rome',
    keyFigures: ['Pope Innocent III', 'Saint Francis of Assisi', 'Saint Dominic de Guzmán'],
    description: 'Fourth Lateran Council dogmatically defined the doctrine of *Transubstantiation* (the bread and wine becoming the actual Body, Blood, Soul, and Divinity of Christ). Simultaneously, God raised up the Friars Minor (Franciscans) and the Order of Preachers (Dominicans) to live in evangelical poverty and preaching.',
    theologicalSignificance: 'Formalized Eucharistic theology and produced the theological zenith of High Scholasticism through St. Thomas Aquinas (Summa Theologiae) and St. Bonaventure.',
    scriptureOrDocumentRef: 'Fourth Lateran Council, Canon 1'
  },
  {
    id: 'our-lady-guadalupe-1531',
    year: 'AD 1531',
    yearNumeric: 1531,
    era: 'renaissance',
    title: 'Apparition of Our Lady of Guadalupe',
    subtitle: 'Mother of the Americas and Miraculous Mass Conversion',
    location: 'Tepeyac Hill, Mexico City',
    keyFigures: ['Saint Juan Diego Cuauhtlatoatzin', 'Bishop Juan de Zumárraga'],
    description: 'The Blessed Virgin Mary appeared as a pregnant mestiza woman to indigenous peasant Juan Diego, leaving her miraculous self-image imprinted upon his cactus-fiber tilma. Over the following decade, approximately nine million indigenous people willingly embraced the Catholic faith.',
    theologicalSignificance: 'The greatest mass conversion in Church history; proclaimed Our Lady of Guadalupe as Patroness of the Americas and Protectress of the Unborn.',
    scriptureOrDocumentRef: 'Nican Mopohua (16th Century Nahuatl codex)'
  },
  {
    id: 'council-trent-1545',
    year: 'AD 1545 – 1563',
    yearNumeric: 1545,
    era: 'renaissance',
    title: 'The Council of Trent and The Catholic Counter-Reformation',
    subtitle: 'Doctrinal Clarity, Seminary Reform, and Liturgical Renewal',
    location: 'Trent and Bologna, Italy',
    keyFigures: ['Pope Saint Pius V', 'Saint Charles Borromeo', 'Saint Ignatius of Loyola'],
    description: 'Meeting across 25 sessions over 18 years in response to the Protestant Reformation, Trent reaffirmed all Seven Sacraments, justification by grace working through faith and love, the authentic biblical canon, apostolic Tradition, and the sacrificial nature of the Mass. It established diocesan seminaries and promulgated the Roman Catechism.',
    theologicalSignificance: 'Solidified Catholic dogma with definitive precision and initiated centuries of vibrant spiritual, missionary, and educational renewal.',
    scriptureOrDocumentRef: 'Canons and Decrees of the Council of Trent'
  },
  {
    id: 'first-vatican-council-1870',
    year: 'AD 1869 – 1870',
    yearNumeric: 1870,
    era: 'modern',
    title: 'First Vatican Council: Papal Infallibility Defined',
    subtitle: 'Pastor Aeternus and the Primacy of Peter',
    location: 'St. Peter\'s Basilica, Vatican City',
    keyFigures: ['Blessed Pope Pius IX'],
    description: 'Convoked by Bl. Pius IX amidst 19th-century secular rationalism and the loss of the Papal States. The Dogmatic Constitution *Pastor Aeternus* defined that when the Roman Pontiff speaks *ex cathedra* (from the chair of Peter) on matters of faith and morals to the universal Church, he possesses apostolic infallibility through the assistance of the Holy Spirit.',
    theologicalSignificance: 'Articulated the supreme teaching authority and indefectibility of the Church safeguarded by Christ\'s promise to St. Peter (Lk 22:32, Mt 16:18).',
    scriptureOrDocumentRef: 'Pastor Aeternus (1870); Dei Filius'
  },
  {
    id: 'rerum-novarum-1891',
    year: 'AD 1891',
    yearNumeric: 1891,
    era: 'modern',
    title: 'Rerum Novarum: Inauguration of Modern Catholic Social Teaching',
    subtitle: 'Pope Leo XIII Defends Worker Dignity and Private Property',
    location: 'Vatican City',
    keyFigures: ['Pope Leo XIII'],
    description: 'In the wake of the Industrial Revolution, Pope Leo XIII issued the landmark encyclical *Rerum Novarum* ("Of Revolutionary Change"). He condemned atheistic socialism while simultaneously denouncing predatory unbridled capitalism, asserting workers\' rights to a living wage, safe conditions, and collective association.',
    theologicalSignificance: 'Foundation of modern Catholic Social Teaching: human dignity, subsidiarity, solidarity, and the universal destination of goods.',
    scriptureOrDocumentRef: 'Rerum Novarum (1891); Compendium of Catholic Social Doctrine'
  },
  {
    id: 'fatima-apparitions-1917',
    year: 'AD 1917',
    yearNumeric: 1917,
    era: 'modern',
    title: 'Apparitions of Our Lady of Fatima and The Miracle of the Sun',
    subtitle: 'Message of Rosary, Penance, and Hope Amid World War I',
    location: 'Cova da Iria, Fátima, Portugal',
    keyFigures: ['Saints Francisco and Jacinta Marto', 'Sister Lúcia dos Santos'],
    description: 'From May to October 1917, Our Lady appeared monthly to three shepherd children, requesting daily recitation of the Holy Rosary for world peace and conversion. On October 13, 1917, seventy thousand witnesses—including secular journalists and atheists—witnessed the "Miracle of the Sun" dancing in the sky.',
    theologicalSignificance: 'Prophetic call to prayer, reparation to the Immaculate Heart of Mary, and heavenly reassurance against 20th-century totalitarian ideologies.',
    scriptureOrDocumentRef: 'Fatima in Lúcia’s Own Words'
  },
  {
    id: 'vatican-two-1962',
    year: 'AD 1962 – 1965',
    yearNumeric: 1962,
    era: 'contemporary',
    title: 'Second Vatican Council (Vatican II)',
    subtitle: 'Aggiornamento and The Universal Call to Holiness',
    location: 'St. Peter\'s Basilica, Vatican City',
    keyFigures: ['Saint John XXIII', 'Saint Paul VI', 'Karol Wojtyła (Saint John Paul II)'],
    description: 'The 21st Ecumenical Council brought together over 2,500 bishops from every continent. Vatican II produced sixteen landmark constitutions and decrees, including *Lumen Gentium* (Church as the People of God), *Dei Verbum* (Divine Revelation), *Sacrosanctum Concilium* (Sacred Liturgy), and *Gaudium et Spes* (Church in the Modern World).',
    theologicalSignificance: 'Re-energized the Church\'s evangelizing mission, underscored the active vocation of the laity, and promoted ecumenical and interreligious dialogue.',
    scriptureOrDocumentRef: 'Documents of Vatican II; CCC 8'
  },
  {
    id: 'pontificate-john-paul-ii-1978',
    year: 'AD 1978 – 2005',
    yearNumeric: 1978,
    era: 'contemporary',
    title: 'The Epochal Pontificate of Pope Saint John Paul II',
    subtitle: 'The Great Evangelizer, Fall of Communism and Divine Mercy',
    location: 'Vatican City and 129 Nations Visited',
    keyFigures: ['Saint John Paul II the Great', 'Saint Faustina Kowalska'],
    description: 'Elected the first non-Italian Pope in 455 years, Karol Wojtyła inspired the peaceful collapse of Soviet communism in Eastern Europe. He instituted World Youth Day, promulgated the *Catechism of the Catholic Church* (1992), established Divine Mercy Sunday, articulated the Theology of the Body, and canonized 482 saints.',
    theologicalSignificance: 'Defended the sacredness of human life (*Evangelium Vitae*), inspired a New Evangelization, and led the Church across the threshold of the Third Millennium.',
    scriptureOrDocumentRef: 'Fides et Ratio; Evangelium Vitae; Veritatis Splendor'
  },
  {
    id: 'contemporary-church-2026',
    year: 'AD 2013 – 2026',
    yearNumeric: 2026,
    era: 'contemporary',
    title: 'The Contemporary Global Church, Jubilee of Hope and Pope Leo XIV',
    subtitle: 'Pope Francis, Pope Leo XIV, Global South Expansion and Synodality',
    location: 'Universal Catholic Church (1.4 Billion Catholics Worldwide)',
    keyFigures: ['Pope Leo XIV', 'Pope Francis', 'Pope Emeritus Benedict XVI'],
    description: 'The Catholic Church encompasses nearly 1.4 billion baptized faithful across 195 nations. Pope Francis became the first Pope from the Americas, emphasizing pastoral closeness to the peripheries, stewardship of God\'s creation (*Laudato Si\'*), fraternity (*Fratelli Tutti*), and inaugurating the 2025 Jubilee of Hope. Following the passing of Pope Francis in 2025, the College of Cardinals elected Pope Leo XIV (Robert Francis Prevost, O.S.A.), the first Augustinian and first North American-born Roman Pontiff, who continues to shepherd the universal Church in apostolic unity, peace, and missionary renewal.',
    theologicalSignificance: 'Demonstrates the unbroken Petrine succession through Pope Leo XIV and the dynamic universality of the Church, with vibrant vitality expanding especially across Sub-Saharan Africa, Asia, and Latin America.',
    scriptureOrDocumentRef: 'Evangelii Gaudium; Laudato Si\'; In Illo Uno Unum'
  }
];

export const MAJOR_ECUMENICAL_COUNCILS: EcumenicalCouncil[] = [
  {
    number: 1,
    name: 'First Council of Nicaea',
    year: 'AD 325',
    pope: 'St. Sylvester I',
    keyDogma: 'Christ is consubstantial (homoousios) with the Father; defeated Arianism; Nicene Creed.',
    historicalContext: 'Convened by Constantine to address the denial of Christ\'s divinity by Arius of Alexandria.'
  },
  {
    number: 2,
    name: 'First Council of Constantinople',
    year: 'AD 381',
    pope: 'St. Damasus I',
    keyDogma: 'Affirmed full divinity of the Holy Spirit; completed the Niceno-Constantinopolitan Creed.',
    historicalContext: 'Condemned Macedonian heresy which claimed the Holy Spirit was a created being.'
  },
  {
    number: 3,
    name: 'Council of Ephesus',
    year: 'AD 431',
    pope: 'St. Celestine I',
    keyDogma: 'Mary is Theotokos (Mother of God / God-bearer); Christ is one indivisible Divine Person.',
    historicalContext: 'Refuted Nestorius, who claimed Mary was only the mother of Jesus the human man.'
  },
  {
    number: 4,
    name: 'Council of Chalcedon',
    year: 'AD 451',
    pope: 'St. Leo I the Great',
    keyDogma: 'Christ has two complete natures (divine and human) united in one Divine Person without confusion.',
    historicalContext: 'Condemned Eutychian Monophysitism asserting Christ had only a single absorbed divine nature.'
  },
  {
    number: 7,
    name: 'Second Council of Nicaea',
    year: 'AD 787',
    pope: 'Hadrian I',
    keyDogma: 'Veneration (dulia) of sacred icons and images is holy and legitimate; worship (latria) is due to God alone.',
    historicalContext: 'Defeated Byzantine iconoclasm which ordered the destruction of sacred religious images.'
  },
  {
    number: 12,
    name: 'Fourth Lateran Council',
    year: 'AD 1215',
    pope: 'Innocent III',
    keyDogma: 'Defined Transubstantiation; required annual confession and Easter Communion ("Easter duty").',
    historicalContext: 'Largest medieval council, addressing the Albigensian heresy and reforming clerical life.'
  },
  {
    number: 19,
    name: 'Council of Trent',
    year: 'AD 1545–1563',
    pope: 'Paul III, Julius III, Pius IV',
    keyDogma: 'Reaffirmed the 7 Sacraments, Scripture and Tradition, original sin, justification, sacrificial Mass, purgatory.',
    historicalContext: 'The foundational Catholic Reformation answer to Protestant reformers (Luther, Calvin, Zwingli).'
  },
  {
    number: 20,
    name: 'First Vatican Council',
    year: 'AD 1869–1870',
    pope: 'Bl. Pius IX',
    keyDogma: 'Papal Infallibility defined when teaching ex cathedra on faith and morals; relationship of faith and reason.',
    historicalContext: 'Addressed secular rationalism, atheism, and materialism; halted prematurely by Italian unification troops.'
  },
  {
    number: 21,
    name: 'Second Vatican Council',
    year: 'AD 1962–1965',
    pope: 'St. John XXIII, St. Paul VI',
    keyDogma: 'Universal call to holiness, renewal of liturgical participation, biblical study, ecumenical brotherhood.',
    historicalContext: 'Pastoral council updating Church presentation to modern world while preserving dogmatic deposit of faith.'
  }
];
