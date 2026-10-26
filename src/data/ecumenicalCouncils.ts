export interface EcumenicalCouncil {
  id: string;
  number: number;
  name: string;
  shortName: string;
  year: string;
  startYear: number;
  endYear: number;
  location: string;
  modernCountry: string;
  era: 'early-church' | 'medieval' | 'reformation-renaissance' | 'modern';
  eraLabel: string;
  pontiff: {
    name: string;
    dates: string;
    note?: string;
  };
  convenedBy: string;
  attendeesCount: string;
  summary: string;
  historicalContext: string;
  majorPlayers: {
    saintsAndDoctors: string[];
    emperorsAndRulers: string[];
    theologiansAndLeaders: string[];
    adversariesOrHeresies: string[];
  };
  achievements: string[];
  keyDogmasAndCanons: string[];
  famousQuotesOrCreed: string[];
  lastingImpact: string;
  theologicalCategory: ('christology' | 'holy-spirit' | 'sacraments' | 'papacy' | 'sacred-art' | 'church-reform' | 'scripture-tradition')[];
}

export const ECUMENICAL_COUNCILS_DATABASE: EcumenicalCouncil[] = [
  {
    id: 'nicaea-i',
    number: 1,
    name: 'First Council of Nicaea',
    shortName: 'Nicaea I',
    year: '325 AD',
    startYear: 325,
    endYear: 325,
    location: 'Nicaea (Bithynia)',
    modernCountry: 'İznik, Turkey',
    era: 'early-church',
    eraLabel: 'Early Church (325–787 AD)',
    pontiff: {
      name: 'Pope St. Sylvester I',
      dates: '314–335 AD',
      note: 'Represented by papal legates Vitus and Vincentius, presided over with Bishop Hosius of Cordoba'
    },
    convenedBy: 'Emperor Constantine I (with approval of Pope Sylvester I)',
    attendeesCount: '~318 Bishops ("The 318 Holy Fathers of Nicaea")',
    summary: 'The inaugural ecumenical council that defeated Arianism, defined the full divinity of Jesus Christ as consubstantial (homoousios) with the Father, formulated the original Nicene Creed, and unified the celebration of Easter.',
    historicalContext: 'Following Constantine\'s Edict of Milan (313 AD) granting religious freedom to Christians, the Church was violently convulsed by the teachings of Arius, an Alexandrian priest who asserted that the Son was a created being ("There was a time when the Son was not"). To restore unity and preserve orthodox faith, the first global assembly of bishops gathered.',
    majorPlayers: {
      saintsAndDoctors: ['St. Athanasius the Great (then Deacon of Alexandria)', 'St. Nicholas of Myra (Wonderworker)', 'St. Alexander of Alexandria', 'St. Spyridon of Trimythous'],
      emperorsAndRulers: ['Emperor Constantine I the Great'],
      theologiansAndLeaders: ['Hosius of Cordoba (Presiding Bishop and Papal Confidant)', 'Vitus and Vincentius (Papal Legates)', 'Eusebius of Caesarea (Historian)'],
      adversariesOrHeresies: ['Arius of Alexandria (Author of Arian heresy)', 'Eusebius of Nicomedia (Arian sympathizer)']
    },
    achievements: [
      'Condemned Arius and his heresy as blasphemous contrary to apostolic revelation.',
      'Formulated the foundational clauses of the Nicene Creed, dogmatizing that Jesus Christ is "God from God, Light from Light, true God from true God, begotten, not made, consubstantial (homoousios) with the Father".',
      'Promulgated 20 disciplinary canons regarding episcopal ordination, reconciliation of lapsed Christians, and clerical celibacy.',
      'Established the method for calculating the universal date of Easter independent of the Jewish Passover calendar.',
      'Recognized the special administrative primacy and patriarchal authority of Rome, Alexandria, and Antioch.'
    ],
    keyDogmasAndCanons: [
      'Dogma of the Consubstantiality (Homoousion) of the Son with the Father.',
      'Canon 4: A bishop must be consecrated by all bishops of the province, with at least three present and approval of the metropolitan.',
      'Canon 6: The ancient customs shall prevail in Egypt, Libya, and Pentapolis, recognizing the pre-eminent jurisdiction of Rome, Alexandria, and Antioch.'
    ],
    famousQuotesOrCreed: [
      '"We believe in one God, the Father Almighty, Maker of all things visible and invisible; and in one Lord Jesus Christ, the Son of God, begotten of the Father, only-begotten, that is, from the substance of the Father, God of God, Light of Light, true God of true God, begotten not made, consubstantial with the Father..." — Original Nicene Creed (325 AD)'
    ],
    lastingImpact: 'Laid the unshakeable bedrock of Trinitarian orthodoxy for the universal Church. The term homoousios became the theological gold standard defending the truth that our Savior is truly and fully God.',
    theologicalCategory: ['christology']
  },
  {
    id: 'constantinople-i',
    number: 2,
    name: 'First Council of Constantinople',
    shortName: 'Constantinople I',
    year: '381 AD',
    startYear: 381,
    endYear: 381,
    location: 'Constantinople',
    modernCountry: 'Istanbul, Turkey',
    era: 'early-church',
    eraLabel: 'Early Church (325–787 AD)',
    pontiff: {
      name: 'Pope Damasus I',
      dates: '366–384 AD',
      note: 'Confirmed the council dogmatic decrees; St. Damasus also commissioned St. Jerome to translate the Latin Vulgate Bible'
    },
    convenedBy: 'Emperor Theodosius I the Great',
    attendeesCount: '~150 Catholic Bishops and 36 Pneumatomachians',
    summary: 'Defeated the Macedonian (Pneumatomachian) heresy that denied the Holy Spirit\'s deity, promulgated the complete Niceno-Constantinopolitan Creed recited at Sunday Mass, and condemned Apollinarianism.',
    historicalContext: 'Decades after Nicaea, new heresies arose: the "Pneumatomachians" ("Spirit-fighters") taught the Holy Spirit was merely a ministering creature, while Apollinaris taught Christ lacked a human rational mind, being replaced by the Logos. St. Basil the Great and the Cappadocian Fathers vigorously defended orthodox pneumatology.',
    majorPlayers: {
      saintsAndDoctors: ['St. Gregory of Nazianzus (Doctor of the Church & President of the Council)', 'St. Gregory of Nyssa (Theologian & Brother of Basil)', 'St. Cyril of Jerusalem', 'St. Peter of Sebaste'],
      emperorsAndRulers: ['Emperor Theodosius I'],
      theologiansAndLeaders: ['Meletius of Antioch (First President)', 'Nectarius of Constantinople (Successor)'],
      adversariesOrHeresies: ['Macedonius of Constantinople (Pneumatomachianism)', 'Apollinaris of Laodicea (Apollinarianism)']
    },
    achievements: [
      'Defined the complete Divinity and personhood of the Holy Spirit.',
      'Expanded the Creed to include: "And in the Holy Spirit, the Lord and Giver of life, who proceeds from the Father, who with the Father and the Son is adored and glorified, who has spoken through the prophets."',
      'Affirmed the Four Marks of the Church: One, Holy, Catholic, and Apostolic.',
      'Condemned Apollinarianism, affirming Christ possesses both a true human soul and mind alongside His divinity.',
      'Completed the Niceno-Constantinopolitan Creed that remains universal across Christendom today.'
    ],
    keyDogmasAndCanons: [
      'Dogma of the True and Full Divinity of the Holy Spirit as the Third Person of the Blessed Trinity.',
      'Dogma that Christ is fully man with a human rational soul, mind, and human body.',
      'Canon 1: The faith of the 318 fathers assembled at Nicaea shall not be set aside but remain firm and unalterable.'
    ],
    famousQuotesOrCreed: [
      '"And in the Holy Spirit, the Lord, the Giver of Life, who proceeds from the Father, who with the Father and the Son is adored and glorified, who spoke through the prophets. In one, holy, catholic and apostolic Church." — Niceno-Constantinopolitan Creed (381 AD)'
    ],
    lastingImpact: 'Gave the Catholic Church the universal Profession of Faith proclaimed at every Sunday Mass across the world and sealed the Trinitarian dogma of Three Persons in One Divine Substance.',
    theologicalCategory: ['christology', 'holy-spirit']
  },
  {
    id: 'ephesus',
    number: 3,
    name: 'Council of Ephesus',
    shortName: 'Ephesus',
    year: '431 AD',
    startYear: 431,
    endYear: 431,
    location: 'Ephesus (Church of Mary)',
    modernCountry: 'Selçuk, Turkey',
    era: 'early-church',
    eraLabel: 'Early Church (325–787 AD)',
    pontiff: {
      name: 'Pope St. Celestine I',
      dates: '422–432 AD',
      note: 'Instructed his legates Arcadius, Projectus, and Philip to support St. Cyril and execute the Roman sentence against Nestorius'
    },
    convenedBy: 'Emperor Theodosius II',
    attendeesCount: '~200 to 250 Bishops',
    summary: 'Dogmatically proclaimed the Blessed Virgin Mary as Theotokos (Mother of God / God-Bearer), condemned Nestorius who split Christ into two separate persons, and defined the Hypostatic Union of divinity and humanity in the One Person of Christ.',
    historicalContext: 'Nestorius, Patriarch of Constantinople, objected to calling Mary Theotokos, insisting she was only Christotokos (Mother of Christ the man). St. Cyril of Alexandria recognized that dividing Christ\'s humanity from His divinity destroyed the Incarnation and Redemptive Sacrifice.',
    majorPlayers: {
      saintsAndDoctors: ['St. Cyril of Alexandria (Doctor of the Incarnation, Papal Delegate)', 'St. Celestine I (Pope)'],
      emperorsAndRulers: ['Emperor Theodosius II', 'Count Candidian (Imperial commissioner)'],
      theologiansAndLeaders: ['Philip (Roman Papal Presbyter and Legate)', 'Memnon of Ephesus', 'John of Antioch'],
      adversariesOrHeresies: ['Nestorius of Constantinople (Nestorianism)', 'Pelagius (re-condemned at Ephesus)']
    },
    achievements: [
      'Solemnly declared Mary to be Theotokos (Mother of God), igniting joyous torchlit processions through the streets of Ephesus.',
      'Condemned Nestorianism, which falsely taught two separate persons (one divine, one human) loosely conjoined.',
      'Definitively established the doctrine of the Hypostatic Union: Christ is One Divine Person possessing two intact natures.',
      'Deposed and excommunicated Nestorius from the See of Constantinople.',
      'Re-affirmed the condemnation of Pelagianism (the heresy denying original sin and the necessity of grace).'
    ],
    keyDogmasAndCanons: [
      'Dogma of Mary as Theotokos (Mother of God): Because Jesus is God incarnate, the woman who gave birth to Him is truly the Mother of God according to His humanity.',
      'Anathemas of St. Cyril (12 Chapters) ratified by the Council against any separation of the Word and the flesh.'
    ],
    famousQuotesOrCreed: [
      '"If anyone does not confess that Emmanuel is God in truth, and that therefore the holy Virgin is Theotokos (for she bore in the flesh the Word of God become flesh), let him be anathema." — Council of Ephesus, Anathematism I'
    ],
    lastingImpact: 'Secured the core truth of the Incarnation: God Himself took real flesh in the womb of the Virgin Mary. Also inaugurated the golden age of Marian theology and devotion, inspiring the construction of St. Mary Major in Rome.',
    theologicalCategory: ['christology']
  },
  {
    id: 'chalcedon',
    number: 4,
    name: 'Council of Chalcedon',
    shortName: 'Chalcedon',
    year: '451 AD',
    startYear: 451,
    endYear: 451,
    location: 'Chalcedon (Church of St. Euphemia)',
    modernCountry: 'Kadıköy, Istanbul, Turkey',
    era: 'early-church',
    eraLabel: 'Early Church (325–787 AD)',
    pontiff: {
      name: 'Pope St. Leo I ("Leo the Great")',
      dates: '440–461 AD',
      note: 'His magisterial "Tome of Leo" was read aloud to thunderous acclamations: "Peter has spoken through Leo!"'
    },
    convenedBy: 'Emperor Marcian and Empress St. Pulcheria',
    attendeesCount: '~520 to 600 Bishops (Largest of the early councils)',
    summary: 'The monumental Christological council that defeated Monophysitism (Eutyches), defining that Jesus Christ is One Divine Person in Two Natures (divine and human)—unconfused, unchangeable, indivisible, and inseparate.',
    historicalContext: 'In reaction against Nestorianism, the archimandrite Eutyches swung to the opposite extreme, asserting that Christ had only one single nature after the Incarnation (Monophysitism), effectively absorbing His humanity into His divinity. Following the illegitimate "Robber Council of Ephesus" (449 AD), Pope St. Leo appealed for a valid council.',
    majorPlayers: {
      saintsAndDoctors: ['Pope St. Leo I the Great (Author of the Tome of Leo)', 'St. Flavian of Constantinople (Martyr Patriarch)', 'Empress St. Pulcheria'],
      emperorsAndRulers: ['Emperor Marcian', 'Empress Pulcheria'],
      theologiansAndLeaders: ['Paschasinus of Lilybaeum (Papal Legate & Council President)', 'Anatolius of Constantinople'],
      adversariesOrHeresies: ['Eutyches (Monophysite leader)', 'Dioscorus of Alexandria (Deposed for tyranny)']
    },
    achievements: [
      'Formulated the definitive Chalcedonian Definition of Faith.',
      'Defined that Christ is acknowledged in Two Natures, without confusion, without change, without division, without separation (in duabus naturis inconfuse, immutabiliter, indivise, inseparabiliter).',
      'Acclaimed the dogmatic authority of the Bishop of Rome: "This is the faith of the fathers! Peter has spoken through Leo!"',
      'Overturned the illicit Latrocinium (Robber Council) of 449 and restored orthodox bishops.',
      'Promulgated 28 disciplinary canons regarding monastic obedience and clerical discipline.'
    ],
    keyDogmasAndCanons: [
      'Dogma of the Two Natures in Christ: Christ is consubstantial with the Father as touching His Godhead, and consubstantial with us as touching His manhood.',
      'Hypostatic Union: The distinction of natures being in no way taken away by the union, but rather the property of each nature being preserved, concurring into one Person (Prosopon) and one Subsistence (Hypostasis).'
    ],
    famousQuotesOrCreed: [
      '"Peter has spoken through Leo! The Apostles so taught! Piously and truly did Leo teach! Anathema to him who believes otherwise!" — Acclamation of the Council Fathers (451 AD)'
    ],
    lastingImpact: 'Provided the permanent and irreplaceable vocabulary for Christology throughout Church history. All orthodox Christian theology rests upon the Chalcedonian balance between Christ\'s complete divinity and complete humanity.',
    theologicalCategory: ['christology']
  },
  {
    id: 'constantinople-ii',
    number: 5,
    name: 'Second Council of Constantinople',
    shortName: 'Constantinople II',
    year: '553 AD',
    startYear: 553,
    endYear: 553,
    location: 'Constantinople (Hagia Sophia)',
    modernCountry: 'Istanbul, Turkey',
    era: 'early-church',
    eraLabel: 'Early Church (325–787 AD)',
    pontiff: {
      name: 'Pope Vigilius',
      dates: '537–555 AD',
      note: 'After initial resistance to imperial pressure, formally ratified the conciliar decrees in his Constitutum II'
    },
    convenedBy: 'Emperor Justinian I the Great',
    attendeesCount: '~165 Bishops',
    summary: 'Confirmed Chalcedon by condemning the "Three Chapters" (writings suspected of Nestorianism), affirmed the perpetual virginity of Mary, and condemned Origenist errors on the pre-existence of souls.',
    historicalContext: 'Emperor Justinian sought to reunite Monophysite Christians of Egypt and Syria with the Catholic Church by demonstrating that Chalcedon did not endorse Nestorianism. He pressed the council to condemn three specific fifth-century authors and their writings known as the "Three Chapters".',
    majorPlayers: {
      saintsAndDoctors: ['St. Eutychius of Constantinople', 'St. Gregory the Great (later defended its authority)'],
      emperorsAndRulers: ['Emperor Justinian I', 'Empress Theodora (influence)'],
      theologiansAndLeaders: ['Pope Vigilius', 'Patriarch Apollinaris of Alexandria', 'Domninus of Antioch'],
      adversariesOrHeresies: ['Theodore of Mopsuestia', 'Writings of Theodoret of Cyrrhus against Cyril', 'Letter of Ibas of Edessa to Maris']
    },
    achievements: [
      'Condemned the Three Chapters to clarify the true orthodox anti-Nestorian meaning of Chalcedon.',
      'Reiterated the Theopaschite formula: "One of the Trinity suffered in the flesh for us."',
      'Solemnly affirmed Mary as Aeiparthenos (Ever-Virgin / Perpetual Virginity of Our Lady).',
      'Condemned Origenist speculations regarding the pre-existence and fall of human souls before birth, and the idea of universal restoration (apokatastasis) if understood as denying eternal punishment.'
    ],
    keyDogmasAndCanons: [
      'Dogma of the Theopaschite Formula: It is the Second Person of the Trinity Himself who suffered in the human flesh He assumed.',
      'Dogma of the Perpetual Virginity of the Blessed Virgin Mary before, during, and perpetually after the birth of Christ.'
    ],
    famousQuotesOrCreed: [
      '"If anyone says that the holy, glorious, and ever-virgin Mary is only metaphorically and not truly the Mother of God, let him be anathema." — Constantinople II, Canon 6'
    ],
    lastingImpact: 'Strengthened the Cyril-inspired understanding of the Incarnation and solidified the Church\'s dogmatic stance on the perpetual virginity of the Mother of God.',
    theologicalCategory: ['christology']
  },
  {
    id: 'constantinople-iii',
    number: 6,
    name: 'Third Council of Constantinople',
    shortName: 'Constantinople III',
    year: '680–681 AD',
    startYear: 680,
    endYear: 681,
    location: 'Constantinople (Imperial Palace, Trullus Room)',
    modernCountry: 'Istanbul, Turkey',
    era: 'early-church',
    eraLabel: 'Early Church (325–787 AD)',
    pontiff: {
      name: 'Pope St. Agatho & Pope St. Leo II',
      dates: 'St. Agatho (678–681 AD) & St. Leo II (682–683 AD)',
      note: 'St. Agatho authored the dogmatic epistola asserting Petrine orthodoxy; St. Leo II confirmed the council acts'
    },
    convenedBy: 'Emperor Constantine IV Pogonatus',
    attendeesCount: '~174 Bishops',
    summary: 'Defeated Monothelitism and Monoenergism; dogmatically defined that Jesus Christ has two natural wills (divine and human) and two natural energies or operations, existing in perfect harmony.',
    historicalContext: 'To placate Monophysites, Emperor Heraclius and Patriarch Sergius invented "Monothelitism" (teaching that Christ had two natures, but only one single divine-human will). St. Maximus the Confessor and Pope St. Martin I suffered torture and martyrdom defending that without a true human will, Christ\'s human obedience and our redemption are void.',
    majorPlayers: {
      saintsAndDoctors: ['St. Maximus the Confessor (Theological Champion & Martyr, posthumously vindicated)', 'Pope St. Martin I (Martyr Pope)', 'Pope St. Agatho', 'St. Sophronius of Jerusalem'],
      emperorsAndRulers: ['Emperor Constantine IV'],
      theologiansAndLeaders: ['George of Constantinople', 'Peter of Alexandria', 'Papal Legates John and Abundantius'],
      adversariesOrHeresies: ['Sergius of Constantinople (Originator of Monothelitism)', 'Macarius of Antioch', 'Pope Honorius I (reprimanded for negligence in suppressing heresy)']
    },
    achievements: [
      'Dogmatically defined that Christ has Two Natural Wills and Two Operations (Dyothelitism).',
      'Affirmed that Christ\'s human will is not opposed to His divine will, but freely, gladly, and perfectly submits to it ("Not my will, but Thine be done").',
      'Vindicated St. Maximus the Confessor and Pope St. Martin I who had been tortured for this exact truth.',
      'Reprimanded Pope Honorius I posthumously for failing to crush the heresy at its start and ambiguously writing that "we confess one will".'
    ],
    keyDogmasAndCanons: [
      'Dogma of Dyothelitism: Two natural wills and two natural operations, not contrary to one another, but His human will following His divine and omnipotent will, and not resisting or opposing it.',
      'Full humanity of Christ: What is not assumed is not redeemed; Christ had a real human will that chose obedience unto death.'
    ],
    famousQuotesOrCreed: [
      '"We proclaim in Him two natural wills and two natural operations not contrary to each other, but His human will following His divine and almighty will, not resisting or opposing it, but rather subject to it." — Council Decree of Faith (681 AD)'
    ],
    lastingImpact: 'Completed the ancient Christological debates. It affirmed that Jesus possessed authentic human moral freedom, emotional depth, and heroic obedience in Gethsemane and on the Cross.',
    theologicalCategory: ['christology']
  },
  {
    id: 'nicaea-ii',
    number: 7,
    name: 'Second Council of Nicaea',
    shortName: 'Nicaea II',
    year: '787 AD',
    startYear: 787,
    endYear: 787,
    location: 'Nicaea (Hagia Sophia)',
    modernCountry: 'İznik, Turkey',
    era: 'early-church',
    eraLabel: 'Early Church (325–787 AD)',
    pontiff: {
      name: 'Pope Hadrian I',
      dates: '772–795 AD',
      note: 'Sent papal legates Archpriest Peter and Abbot Peter, delivering decisive letters defending the veneration of sacred images'
    },
    convenedBy: 'Empress Regent Irene & Emperor Constantine VI',
    attendeesCount: '~350 Bishops and numerous monastic abbots',
    summary: 'Defeated Iconoclasm, defended Sacred Art, and defined the vital theological distinction between veneration/honor (dulia/proskynesis) shown to holy icons and the adoration/worship (latria) due to God alone.',
    historicalContext: 'Byzantine Emperors (Leo III and Constantine V) launched a brutal persecution against sacred images, tearing down icons of Christ, Mary, and the saints, and martyring monks. They claimed icons violated the Old Testament commandment against graven images. St. John Damascene defended icons from Damascus.',
    majorPlayers: {
      saintsAndDoctors: ['St. John Damascene (Doctor of Christian Art and Iconography, deceased)', 'St. Tarasios (Patriarch of Constantinople)', 'St. Theodore the Studite (theological heir)'],
      emperorsAndRulers: ['Empress Regent Irene of Athens', 'Emperor Constantine VI'],
      theologiansAndLeaders: ['Archpriest Peter and Abbot Peter of Rome (Papal Legates)', 'John of Antioch'],
      adversariesOrHeresies: ['The Iconoclasts (Icon-smashers)', 'Emperor Leo III the Isaurian', 'Council of Hiereia (754 AD counterfeit council)']
    },
    achievements: [
      'Restored the veneration of holy images of Jesus Christ, Mary, the angels, and all the saints across the Christian world.',
      'Established the theological foundation: The honor paid to the image passes to the Prototype (God, Christ, or the Saint represented).',
      'Made the definitive distinction between Latria (worship and adoration reserved strictly for God alone) and Dulia / Proskynesis (veneration, honor, and affectionate respect given to creatures and sacred images).',
      'Affirmed that because the invisible God truly became visible in Jesus Christ, He can rightfully be depicted in paint, mosaic, and sculpture.',
      'Annulled the false iconoclast council of Hiereia (754 AD).'
    ],
    keyDogmasAndCanons: [
      'Dogma of the Legitimacy and Necessity of Sacred Images in Christian worship.',
      'Distinction between Latria (Adoration of God) and Proskynesis/Dulia (Veneration of holy icons and relics).',
      'Anathema against anyone who says that the Catholic Church ever worshipped idols.'
    ],
    famousQuotesOrCreed: [
      '"The honor paid to an image passes over to the prototype; and whoever venerates an image, in it venerates the person represented thereby. For thus the teaching of our holy Fathers is strengthened, that is to say, the Tradition of the Catholic Church." — Second Council of Nicaea, Session VII'
    ],
    lastingImpact: 'Saved Christian art, sacred architecture, stained glass, and iconography for the entire history of Western civilization and Eastern Orthodoxy. It is the last of the seven councils recognized by both Catholicism and Eastern Orthodoxy.',
    theologicalCategory: ['christology', 'sacred-art']
  },
  {
    id: 'constantinople-iv',
    number: 8,
    name: 'Fourth Council of Constantinople',
    shortName: 'Constantinople IV',
    year: '869–870 AD',
    startYear: 869,
    endYear: 870,
    location: 'Constantinople (Hagia Sophia)',
    modernCountry: 'Istanbul, Turkey',
    era: 'medieval',
    eraLabel: 'High Medieval Era (869–1312 AD)',
    pontiff: {
      name: 'Pope Hadrian II',
      dates: '867–872 AD',
      note: 'Building upon Pope St. Nicholas the Great, sent legates Donatus and Stephen with the Papal Libellus'
    },
    convenedBy: 'Emperor Basil I the Macedonian',
    attendeesCount: '~102 Bishops and 3 Papal Legates',
    summary: 'Deposed the usurping Patriarch Photius, restored Patriarch St. Ignatius, affirmed the universal primacy of the Roman See, and condemned trichotomy (teaching that human beings have two souls).',
    historicalContext: 'Emperor Michael III had unjustly exiled Patriarch St. Ignatius and elevated a layman, Photius, to the patriarchal throne within days. Pope St. Nicholas I defended Ignatius and excommunicated Photius. Photius responded by attacking Western practices and the Filioque.',
    majorPlayers: {
      saintsAndDoctors: ['St. Ignatius of Constantinople (Restored Patriarch)', 'Pope St. Nicholas I ("The Great", ideological leader)'],
      emperorsAndRulers: ['Emperor Basil I the Macedonian'],
      theologiansAndLeaders: ['Pope Hadrian II', 'Bishop Donatus of Ostia (Papal Legate)', 'Stephen of Nepi (Papal Legate)'],
      adversariesOrHeresies: ['Photius (Patriarch of Constantinople, deposed)', 'Trichotism (error of two human souls)']
    },
    achievements: [
      'Deposed Photius from the patriarchal see and ordered him to sign submission to Roman decisions.',
      'Reinstated Saint Ignatius as lawful Patriarch of Constantinople.',
      'Required all attending bishops to sign the Libellus of Pope Hormisdas and Hadrian, professing faith in the indefectibility of the Roman See.',
      'Affirmed that human beings possess one rational and intellectual soul, condemning the error of two distinct souls (one sensitive, one spiritual).',
      'Forbade secular princes from appointing bishops or interfering in patriarchal elections.'
    ],
    keyDogmasAndCanons: [
      'Canon 11: Condemned the teaching that man has two souls; man is one composite of body and a single rational soul.',
      'Canon 21: Forbade disrespect or deposition of the Roman Pontiff and the four other Patriarchs by temporal authorities.'
    ],
    famousQuotesOrCreed: [
      '"Because the sentence of our Lord Jesus Christ cannot be passed by, who said: \'Thou art Peter, and upon this rock I will build my Church\'... in the Apostolic See the Catholic religion has always been preserved unstained." — Libellus of Pope Hadrian II'
    ],
    lastingImpact: 'Affirmed Roman primacy and papal oversight over all sees, and settled Catholic anthropology regarding the unity of the human soul.',
    theologicalCategory: ['papacy', 'church-reform']
  },
  {
    id: 'lateran-i',
    number: 9,
    name: 'First Council of the Lateran',
    shortName: 'Lateran I',
    year: '1123 AD',
    startYear: 1123,
    endYear: 1123,
    location: 'Rome (St. John Lateran)',
    modernCountry: 'Rome, Italy',
    era: 'medieval',
    eraLabel: 'High Medieval Era (869–1312 AD)',
    pontiff: {
      name: 'Pope Callixtus II',
      dates: '1119–1124 AD',
      note: 'The first ecumenical council held in the West and presided over in person by the Pope himself'
    },
    convenedBy: 'Pope Callixtus II',
    attendeesCount: '~300 to 1,000 Clergy and Bishops',
    summary: 'The first ecumenical council held in Western Europe; ratified the historic Concordat of Worms (1122), ending the Investiture Controversy by taking episcopal appointment out of secular hands, and enforced clerical celibacy.',
    historicalContext: 'For centuries, European kings and the Holy Roman Emperor had claimed the right to invest bishops and abbots with their pastoral ring and crosier (Lay Investiture), leading to widespread simony (buying of Church offices) and moral degradation. Pope St. Gregory VII fought bitterly for Church liberty; this council crowned that victory.',
    majorPlayers: {
      saintsAndDoctors: ['St. Norbert of Xanten (Founder of the Norbertines/Premonstratensians)'],
      emperorsAndRulers: ['Emperor Henry V (Holy Roman Emperor)'],
      theologiansAndLeaders: ['Pope Callixtus II', 'Cardinal Huno', 'Adalbert of Mainz'],
      adversariesOrHeresies: ['Lay Investiture abuses', 'Simony (trafficking in holy offices)']
    },
    achievements: [
      'Ratified and confirmed the Concordat of Worms, guaranteeing the Church\'s freedom to elect her own bishops.',
      'Strictly prohibited simony, decreeing that anyone who purchased Holy Orders is deposed.',
      'Strictly enforced clerical celibacy in the Western Church, forbidding priests, deacons, and subdeacons from cohabiting with wives or concubines.',
      'Decreed indulgences and papal protection for the families and property of Crusaders protecting the Holy Land.',
      'Abolished the claim of lay nobility to inherit the property of deceased bishops.'
    ],
    keyDogmasAndCanons: [
      'Canon 1: Following the canons of the holy fathers, we utterly forbid that anyone be ordained or promoted for money in the Church of God.',
      'Canon 3: We absolutely forbid priests, deacons, or subdeacons to associate with concubines or women, or to live with women other than those permitted by the ancient canons.'
    ],
    famousQuotesOrCreed: [
      '"If anyone shall have been ordained or promoted by means of money... let him be altogether deprived of the dignity which he has acquired." — Lateran I, Canon 1'
    ],
    lastingImpact: 'Achieved the liberation of the Catholic Church from secular political control (Libertas Ecclesiae) and initiated the great medieval Papal Monarchy.',
    theologicalCategory: ['church-reform', 'papacy']
  },
  {
    id: 'lateran-ii',
    number: 10,
    name: 'Second Council of the Lateran',
    shortName: 'Lateran II',
    year: '1139 AD',
    startYear: 1139,
    endYear: 1139,
    location: 'Rome (St. John Lateran)',
    modernCountry: 'Rome, Italy',
    era: 'medieval',
    eraLabel: 'High Medieval Era (869–1312 AD)',
    pontiff: {
      name: 'Pope Innocent II',
      dates: '1130–1143 AD',
      note: 'Restored to Rome with the assistance of St. Bernard of Clairvaux and Emperor Lothair II'
    },
    convenedBy: 'Pope Innocent II',
    attendeesCount: '~500 to 1,000 Bishops and Abbots',
    summary: 'Healed the papal schism of Antipope Anacletus II, declared marriages contracted by priests and religious to be completely null and invalid, and outlawed lethal crossbow warfare between Christians.',
    historicalContext: 'A bitter eight-year schism divided Europe between Pope Innocent II and Antipope Anacletus II (Pierleoni). St. Bernard of Clairvaux traveled tirelessly across Europe to win crowns to the legitimate Pope. After Anacletus died, the council re-established ecclesiastical peace.',
    majorPlayers: {
      saintsAndDoctors: ['St. Bernard of Clairvaux (Doctor of the Church & Papal Defender)', 'St. Malachy of Armagh'],
      emperorsAndRulers: ['Emperor Lothair II', 'King Roger II of Sicily'],
      theologiansAndLeaders: ['Pope Innocent II', 'Peter the Venerable (Abbot of Cluny)'],
      adversariesOrHeresies: ['Antipope Anacletus II', 'Arnold of Brescia (Demagogue calling for destruction of temporal Church)', 'Peter of Bruys (Petrobrusians)']
    },
    achievements: [
      'Nullified all ordinations performed by Antipope Anacletus II and his schismatic followers.',
      'Decreed that marriages attempted by priests, deacons, subdeacons, and monks are not merely illicit, but completely invalid and void (diriment impediment).',
      'Condemned the heretical errors of the Petrobrusians (who rejected infant baptism, the Mass, and crucifixes) and Arnold of Brescia.',
      'Canon 29: Outlawed the deadly use of crossbows and archers against Christians under pain of anathema.',
      'Prohibited usury (exploitative lending of money for excessive interest) and protected merchants and pilgrims under the Truce of God.'
    ],
    keyDogmasAndCanons: [
      'Canon 7: Those who are in holy orders or bound by monastic vows who attempt to marry are separated, for such union contracted against ecclesiastical law is not considered marriage.',
      'Canon 23: Those who reject the sacraments of the body and blood of the Lord, baptism of infants, and lawful marriage, we expel from the Church.'
    ],
    famousQuotesOrCreed: [
      '"We forbid under pain of anathema that murderous art of crossbowmen and archers, which is hateful to God, to be employed against Christians and Catholics." — Lateran II, Canon 29'
    ],
    lastingImpact: 'Codified the permanent Western canonical rule that clerical Holy Orders constitute an invalidating impediment to marriage, preserving priestly devotion exclusively for Christ and His Church.',
    theologicalCategory: ['sacraments', 'church-reform']
  },
  {
    id: 'lateran-iii',
    number: 11,
    name: 'Third Council of the Lateran',
    shortName: 'Lateran III',
    year: '1179 AD',
    startYear: 1179,
    endYear: 1179,
    location: 'Rome (St. John Lateran)',
    modernCountry: 'Rome, Italy',
    era: 'medieval',
    eraLabel: 'High Medieval Era (869–1312 AD)',
    pontiff: {
      name: 'Pope Alexander III',
      dates: '1159–1181 AD',
      note: 'The great jurist Pope who triumphed over Frederick Barbarossa and canonized St. Thomas Becket'
    },
    convenedBy: 'Pope Alexander III',
    attendeesCount: '~300 Bishops and delegates from all of Europe',
    summary: 'Established the historic rule that a two-thirds majority of Cardinal electors is required to elect a Pope (preventing future schisms), condemned Catharism/Albigensianism, and mandated cathedral schools for the poor.',
    historicalContext: 'Emperor Frederick Barbarossa had maintained a bitter 17-year war against Pope Alexander III, sponsoring multiple antipopes. After Barbarossa suffered total defeat at the Battle of Legnano (1176), he signed the Treaty of Venice (1177) and kissed the Pope\'s feet in repentance. Alexander convoked the council to prevent future schisms.',
    majorPlayers: {
      saintsAndDoctors: ['St. Lawrence O\'Toole (Archbishop of Dublin)'],
      emperorsAndRulers: ['Emperor Frederick I Barbarossa', 'King Louis VII of France', 'King Henry II of England'],
      theologiansAndLeaders: ['Pope Alexander III', 'Cardinal Boso', 'William of Tyre (Archbishop and Historian)'],
      adversariesOrHeresies: ['Cathars / Albigensians of southern France', 'Waldensians (Peter Waldo)']
    },
    achievements: [
      'Established the Two-Thirds Cardinal Supermajority rule for papal elections (Licet de Vitanda), eliminating imperial or secular interference and effectively ending double elections.',
      'Condemned the dualist heresy of the Cathars/Albigensians who claimed the material world was created by an evil deity.',
      'Mandated that every cathedral church appoint a master to teach clerics and poor scholars free of charge (laying the foundation for medieval universities).',
      'Forbade charging any money for consecrations, burials, marriages, or sacraments (Anti-simony).',
      'Set the minimum age for a bishop at thirty years, and for a parish priest or deacon at twenty-five.'
    ],
    keyDogmasAndCanons: [
      'Canon 1 (Licet de Vitanda): If anyone is elected Pope by fewer than two-thirds of the cardinals, he shall not be received as Pope without a two-thirds consensus.',
      'Canon 18: Every cathedral church shall provide a suitable benefice for a master who will teach the clergy and poor students without charge.'
    ],
    famousQuotesOrCreed: [
      '"Let him be held as Pope who shall have been chosen and received by two parts of the Cardinals. If anyone relying on the nomination of one-third shall usurp the name... let him be excommunicated." — Lateran III, Canon 1'
    ],
    lastingImpact: 'Secured the stability and independence of the Papacy with an electoral system that has governed papal conclaves for over 800 years down to this day.',
    theologicalCategory: ['papacy', 'church-reform']
  },
  {
    id: 'lateran-iv',
    number: 12,
    name: 'Fourth Council of the Lateran',
    shortName: 'Lateran IV',
    year: '1215 AD',
    startYear: 1215,
    endYear: 1215,
    location: 'Rome (St. John Lateran)',
    modernCountry: 'Rome, Italy',
    era: 'medieval',
    eraLabel: 'High Medieval Era (869–1312 AD)',
    pontiff: {
      name: 'Pope Innocent III',
      dates: '1198–1216 AD',
      note: 'The most powerful Pope of the Middle Ages; presided over the crowning glory of medieval Christendom'
    },
    convenedBy: 'Pope Innocent III',
    attendeesCount: '412 Bishops, 800 Abbots/Priors, representatives of kings and emperors',
    summary: 'The pinnacle council of the medieval Church: dogmatically defined Transubstantiation in the Holy Eucharist, instituted the "Easter Duty" (mandatory annual Confession and Holy Communion), approved the Franciscan and Dominican charisms, and promulgated 70 comprehensive canons.',
    historicalContext: 'Christendom was at the height of its cultural and theological flourishing. Pope Innocent III called the entire Christian world to Rome to renew spiritual fervor, combat the dangerous Albigensian heresy that was tearing through southern Europe, reform clerical morality, and organize the Fifth Crusade.',
    majorPlayers: {
      saintsAndDoctors: ['St. Dominic de Guzmán (Founder of the Order of Preachers / Dominicans)', 'St. Francis of Assisi (Founder of the Franciscans)'],
      emperorsAndRulers: ['Emperor Frederick II (Holy Roman Emperor)', 'Emperor of Constantinople', 'Kings of France, England, Hungary, Aragon'],
      theologiansAndLeaders: ['Pope Innocent III', 'Simon de Montfort', 'Stephen Langton (Archbishop of Canterbury)'],
      adversariesOrHeresies: ['Albigensians / Cathars', 'Waldensians', 'Trinitarian errors of Joachim of Fiore', 'Amaury of Bène']
    },
    achievements: [
      'Dogmatically defined the doctrine of Transubstantiation: Christ\'s Body and Blood are truly contained in the sacrament of the altar under the forms of bread and wine, transubstantiated by divine power.',
      'Promulgated Canon 21 ("Omnis Utriusque Sexus"): Every Catholic of either sex who has reached the age of discernment must confess their sins at least once a year to their own priest and receive Holy Communion at least at Easter ("The Easter Duty").',
      'Affirmed that there is one universal Church of the faithful, outside of which no one at all is saved (Extra Ecclesiam Nulla Salus properly understood).',
      'Approved the mendicant movements of St. Francis of Assisi and St. Dominic, transforming Catholic evangelization and university education.',
      'Condemned the Trinitarian errors of Joachim of Fiore while affirming the orthodox definition of the Divine Essence.',
      'Mandated distinctive clothing for non-Christians and issued guidelines for trial by ordeal (effectively ending the practice).'
    ],
    keyDogmasAndCanons: [
      'Dogma of Transubstantiation: "Jesus Christ, whose body and blood are truly contained in the sacrament of the altar under the forms of bread and wine, the bread being transubstantiated into the body, and the wine into the blood by divine power."',
      'Canon 21 (Easter Duty): Annual confession and Easter communion mandated under pain of exclusion from church entry and Christian burial.'
    ],
    famousQuotesOrCreed: [
      '"There is one universal Church of the faithful, outside of which nobody at all is saved, in which Jesus Christ is both priest and sacrifice, whose body and blood are truly contained in the sacrament of the altar..." — Lateran IV, Constitution 1'
    ],
    lastingImpact: 'The greatest council of the Middle Ages. Its Eucharistic definitions and pastoral canons shaped everyday Catholic parish life and devotional practice for centuries.',
    theologicalCategory: ['sacraments', 'church-reform']
  },
  {
    id: 'lyons-i',
    number: 13,
    name: 'First Council of Lyons',
    shortName: 'Lyons I',
    year: '1245 AD',
    startYear: 1245,
    endYear: 1245,
    location: 'Lyons (Cathedral of Saint-Jean)',
    modernCountry: 'Lyon, France',
    era: 'medieval',
    eraLabel: 'High Medieval Era (869–1312 AD)',
    pontiff: {
      name: 'Pope Innocent IV',
      dates: '1243–1254 AD',
      note: 'Fled Italy to escape imperial encirclement and presided in the imperial free city of Lyon'
    },
    convenedBy: 'Pope Innocent IV',
    attendeesCount: '~150 Bishops, including the Latin Patriarchs of Constantinople, Antioch, and Aquileia',
    summary: 'Deposed the Holy Roman Emperor Frederick II for perjury, sacrilege, and heresy; bestowed the Red Hat upon Cardinals as a symbol of their willingness to shed blood for the faith; mobilized assistance for the Holy Land and defended against Mongol invasions.',
    historicalContext: 'Emperor Frederick II ("Stupor Mundi") sought total domination over the Papacy and the Italian peninsula, capturing bishops traveling to an earlier council in Rome. Pope Innocent IV disguised himself as a knight, escaped by sea to Genoa, and convoked the council at Lyon to confront imperial aggression.',
    majorPlayers: {
      saintsAndDoctors: ['St. Louis IX (King of France, Mediator)'],
      emperorsAndRulers: ['Emperor Frederick II (Deposed)', 'Baldwin II (Latin Emperor of Constantinople)'],
      theologiansAndLeaders: ['Pope Innocent IV', 'Thaddaeus of Suessa (Defender of Frederick II)', 'Albert Suerbeer (Archbishop of Armagh/Prussia)'],
      adversariesOrHeresies: ['Imperial absolutism', 'Mongol invasions of Eastern Europe']
    },
    achievements: [
      'Pronounced the solemn deposition of Emperor Frederick II, releasing all his subjects from their oath of fealty.',
      'Granted the Red Hat (Galero) to Cardinals of the Roman Church, signifying their duty to defend the Church even unto the shedding of their blood.',
      'Directed financial aid and military preparations for the Seventh Crusade led by King St. Louis IX of France.',
      'Devised defensive strategies and sent Franciscan and Dominican missionaries (including John of Plano Carpini) to the Mongols.',
      'Promulgated 38 constitutions reforming ecclesiastical court procedures.'
    ],
    keyDogmasAndCanons: [
      'Bull of Deposition against Frederick II: Listing four grave charges—frequent perjury, peace-breaking, sacrilege in capturing bishops, and suspicion of heresy.',
      'Institution of the Cardinal\'s Red Hat as an official insignia of martyrdom and ecclesiastical nobility.'
    ],
    famousQuotesOrCreed: [
      '"We declare the aforesaid prince, who has made himself so unworthy of the empire and kingdom... to be bound by his sins and cast off by God, and deprived of all honor and dignity." — Pope Innocent IV, Bull of Deposition'
    ],
    lastingImpact: 'Marked the dramatic zenith of the Papacy\'s authority over secular medieval monarchs and established the distinctive red vesture of the College of Cardinals.',
    theologicalCategory: ['papacy', 'church-reform']
  },
  {
    id: 'lyons-ii',
    number: 14,
    name: 'Second Council of Lyons',
    shortName: 'Lyons II',
    year: '1274 AD',
    startYear: 1274,
    endYear: 1274,
    location: 'Lyons (Cathedral of Saint-Jean)',
    modernCountry: 'Lyon, France',
    era: 'medieval',
    eraLabel: 'High Medieval Era (869–1312 AD)',
    pontiff: {
      name: 'Blessed Pope Gregory X',
      dates: '1271–1276 AD',
      note: 'Elected after an excruciating three-year vacant conclave; consecrated bishop and crowned pope on the same day'
    },
    convenedBy: 'Blessed Pope Gregory X',
    attendeesCount: '~500 Bishops, 60 Abbots, over 1,000 Prelates and Greek Envoys',
    summary: 'Achieved a short-lived reunion with the Eastern Orthodox Church; defined that the Holy Spirit proceeds eternally from the Father and the Son (Filioque); codified the Papal Conclave system (locking cardinals in seclusion); mourned the deaths of St. Thomas Aquinas and St. Bonaventure.',
    historicalContext: 'Faced with the threat of Charles of Anjou conquering Constantinople, Byzantine Emperor Michael VIII Palaiologos agreed to accept reunion with Rome. Meanwhile, after the cardinals took nearly three years (1268–1271) to elect Gregory X, a drastic reform of papal elections was demanded by all of Europe.',
    majorPlayers: {
      saintsAndDoctors: ['St. Bonaventure (Doctor of the Church & Cardinal-Bishop of Albano, died during council)', 'St. Thomas Aquinas (Summoned by the Pope, died en route at Fossanova Abbey)', 'St. Albert the Great'],
      emperorsAndRulers: ['Emperor Michael VIII Palaiologos', 'King James I of Aragon', 'Emperor Rudolf I of Habsburg'],
      theologiansAndLeaders: ['Blessed Pope Gregory X', 'George Akropolites (Grand Logothete of Constantinople)', 'Germanus III of Constantinople'],
      adversariesOrHeresies: ['Anti-unionist Byzantine factions', 'Clerical election delays']
    },
    achievements: [
      'Proclaimed the reunion of the Eastern and Western Churches under the Bull of Union, with Greek envoys chanting the Creed with the Filioque three times.',
      'Defined dogmatically that the Holy Spirit proceeds eternally from the Father and the Son, not as from two principles, but as from one single principle and one single spiration.',
      'Promulgated the landmark Constitution Ubi Periculum, creating the strict modern Papal Conclave (locking electors in a room with diminishing food rations until a Pope is elected).',
      'Regulated and affirmed the mendicant orders (Franciscans and Dominicans), defended fiercely by St. Bonaventure.',
      'Imposed a six-year worldwide tithe to finance a new Crusade.'
    ],
    keyDogmasAndCanons: [
      'Dogma of the Procession of the Holy Spirit: "The Holy Spirit proceeds eternally from the Father and the Son, not as from two principles, but as from one principle, not by two spirations, but by one single spiration."',
      'Constitution Ubi Periculum: Instituted the conclave room locked "cum clave" (with a key) to eliminate political delays in papal elections.'
    ],
    famousQuotesOrCreed: [
      '"We profess faithfully and devotedly that the Holy Spirit proceeds eternally from the Father and the Son, not as from two principles, but as from one principle..." — Lyons II, Constitution on the Supreme Trinity'
    ],
    lastingImpact: 'Established the sacred rules of the Papal Conclave that still govern the election of every Bishop of Rome today, and defined the orthodox Catholic theology of the Filioque.',
    theologicalCategory: ['holy-spirit', 'papacy']
  },
  {
    id: 'vienne',
    number: 15,
    name: 'Council of Vienne',
    shortName: 'Vienne',
    year: '1311–1312 AD',
    startYear: 1311,
    endYear: 1312,
    location: 'Vienne (Cathedral of Saint-Maurice)',
    modernCountry: 'Vienne, Isère, France',
    era: 'medieval',
    eraLabel: 'High Medieval Era (869–1312 AD)',
    pontiff: {
      name: 'Pope Clement V',
      dates: '1305–1314 AD',
      note: 'The first Pope of the Avignon Papacy, under heavy pressure from King Philip the Fair'
    },
    convenedBy: 'Pope Clement V',
    attendeesCount: '~170 Bishops and Cardinals',
    summary: 'Suppressed the wealthy and controversial military order of the Knights Templar; condemned the pseudo-mystical heresy of the Free Spirit (Beghards and Beguines); established university chairs for Oriental languages to foster overseas missionary evangelization.',
    historicalContext: 'King Philip IV ("The Fair") of France was heavily indebted to the Knights Templar and determined to destroy them. He arrested the Templars in France on charges of blasphemy and heresy, demanding the Pope dissolve the order. Simultaneously, quietist heresies were spreading across northern Europe.',
    majorPlayers: {
      saintsAndDoctors: ['Blessed Raymond Lull (Franciscan tertiary and missionary philosopher)'],
      emperorsAndRulers: ['King Philip IV the Fair of France'],
      theologiansAndLeaders: ['Pope Clement V', 'Jacques de Molay (Grand Master of the Templars)', 'William Durand the Younger'],
      adversariesOrHeresies: ['The Brethren of the Free Spirit (Spiritual antinomianism)', 'Beghards and Beguines quietist errors']
    },
    achievements: [
      'Suppressed the Knights Templar by papal administrative provision (Vox in Excelso) rather than a definitive judicial condemnation, transferring their vast properties to the Knights Hospitaller (Knights of Malta).',
      'Condemned the heresy of the Free Spirit, which falsely claimed that human beings can attain such spiritual perfection in this life that they become incapable of sin and need neither prayer, sacraments, nor moral law.',
      'Defined that the rational human soul is in itself and essentially the form of the human body (Anima rationalis est forma corporis).',
      'Established chairs of Hebrew, Arabic, Greek, and Syriac at Paris, Oxford, Bologna, and Salamanca to train missionaries to preach the Gospel to Muslims and Jews.',
      'Enacted stringent reforms against clerical luxury, concubinage, and monastic laxity.'
    ],
    keyDogmasAndCanons: [
      'Dogma on the Human Soul: The rational and intellectual soul is per se and essentially the substantial form of the human body.',
      'Condemnation of the Ad Nostrum errors of the Free Spirit regarding sinless perfection on earth.'
    ],
    famousQuotesOrCreed: [
      '"We define that anyone who presumes henceforth to assert, defend, or hold that the rational or intellectual soul is not per se and essentially the form of the human body, is to be regarded as a heretic." — Council of Vienne, Decree on the Soul'
    ],
    lastingImpact: 'Affirmed the Thomistic definition of the soul as the form of the body, launched university-level linguistic training for world missions, and resolved the tragic saga of the Templars.',
    theologicalCategory: ['church-reform', 'sacraments']
  },
  {
    id: 'constance',
    number: 16,
    name: 'Council of Constance',
    shortName: 'Constance',
    year: '1414–1418 AD',
    startYear: 1414,
    endYear: 1418,
    location: 'Constance (Lake Constance / Minster)',
    modernCountry: 'Konstanz, Germany',
    era: 'reformation-renaissance',
    eraLabel: 'Renaissance & Reformation Era (1414–1563 AD)',
    pontiff: {
      name: 'Pope Gregory XII (Resigned) & Pope Martin V (Elected)',
      dates: 'Gregory XII (1406–1415 AD), Martin V (1417–1431 AD)',
      note: 'Gregory XII canonically convoked the council before resigning, restoring legitimate Petrine succession'
    },
    convenedBy: 'Emperor Sigismund of Luxembourg & Antipope John XXIII, later legitimized by Pope Gregory XII',
    attendeesCount: '3 Patriarchs, 29 Cardinals, 186 Bishops, 100 Abbots, 300 Theologians',
    summary: 'Resolved the catastrophic 40-year Western Schism (which had 3 simultaneous claimants to the Papacy) through Pope Gregory XII\'s noble resignation and the election of Pope Martin V; condemned the pre-Protestant heresies of John Wycliffe and Jan Hus.',
    historicalContext: 'Since 1378, Christendom had been torn apart with rival papal lines in Rome, Avignon, and Pisa. Even saints had been divided: St. Catherine of Siena backed Rome, while St. Vincent Ferrer initially backed Avignon. The council voting was conducted by "nations" (Germany, France, England, Italy, Spain) to prevent Italian domination.',
    majorPlayers: {
      saintsAndDoctors: ['St. Vincent Ferrer (Preached repentance, abandoned the Avignon claimant)'],
      emperorsAndRulers: ['Emperor Sigismund of Luxembourg (Diplomatic force behind the council)'],
      theologiansAndLeaders: ['Jean Gerson (Chancellor of Paris)', 'Cardinal Pierre d\'Ailly', 'Pope Martin V (Oddone Colonna)', 'Pope Gregory XII (Legitimate Pope who abdicated)'],
      adversariesOrHeresies: ['Jan Hus (Bohemian reformer, condemned and burned)', 'John Wycliffe (English reformer, posthumously condemned)', 'Antipope John XXIII (Baldassarre Cossa)', 'Antipope Benedict XIII (Pedro de Luna)']
    },
    achievements: [
      'Ended the Great Western Schism: Legitimate Pope Gregory XII officially convoked the council, authorized its acts, and selflessly abdicated; Antipope John XXIII was deposed; Antipope Benedict XIII was stripped of office.',
      'Universally elected Cardinal Oddone Colonna as Pope Martin V on St. Martin\'s Day (1417), fully reuniting the Roman Catholic Church.',
      'Condemned 45 errors of John Wycliffe (denial of the Papacy, transubstantiation, and monasticism) and 30 errors of Jan Hus.',
      'Passed the decree Frequens, mandating the periodic convocation of general councils (within 5 years, then 7, then every 10 years).',
      'Condemned tyrannical tyrannicide as proposed by Jean Petit.'
    ],
    keyDogmasAndCanons: [
      'Condemnation of Wycliffe and Hus: Reaffirmed that the validity of sacraments does not depend upon the personal moral state of the minister (anti-Donatism), and affirmed Transubstantiation.',
      'Decree Frequens (1417): Instituting regular schedules for general ecumenical councils.'
    ],
    famousQuotesOrCreed: [
      '"I, Gregory, bishop, servant of the servants of God... do give up and yield purely, simply, and actually all right, title, and possession which I have in the papacy." — Pope Gregory XII, Formula of Resignation'
    ],
    lastingImpact: 'Saved the Catholic Church from dissolution during her greatest institutional crisis and preserved the monarchical unity of the Chair of St. Peter.',
    theologicalCategory: ['papacy', 'church-reform']
  },
  {
    id: 'florence',
    number: 17,
    name: 'Council of Basel-Ferrara-Florence',
    shortName: 'Florence',
    year: '1431–1445 AD',
    startYear: 1431,
    endYear: 1445,
    location: 'Basel, Ferrara, Florence, and Rome',
    modernCountry: 'Switzerland & Italy',
    era: 'reformation-renaissance',
    eraLabel: 'Renaissance & Reformation Era (1414–1563 AD)',
    pontiff: {
      name: 'Pope Eugene IV',
      dates: '1431–1447 AD',
      note: 'Resolutely transferred the council from Basel to Ferrara then Florence to meet the Greeks, defeating conciliarism'
    },
    convenedBy: 'Pope Martin V & Pope Eugene IV',
    attendeesCount: 'Over 200 Latin Bishops and 700 Greek Envoys, Patriarchs, and Scholars',
    summary: 'Defeated radical conciliarism, proclaimed dogmatic union with the Eastern Orthodox Church in the historic bull Laetentur Caeli (1439), settled the Filioque and Purgatory disputes, and reunited temporary delegations of Copts, Armenians, and Chaldeans.',
    historicalContext: 'Faced with impending Ottoman conquest, Byzantine Emperor John VIII Palaiologos brought the entire Greek hierarchy—including Patriarch Joseph II and leading scholars—to Italy. After fierce theological debates in Ferrara and Florence, agreement was reached on the Filioque, papal primacy, and Eucharistic unleavened bread.',
    majorPlayers: {
      saintsAndDoctors: ['St. Antoninus of Florence (Archbishop of Florence)'],
      emperorsAndRulers: ['Emperor John VIII Palaiologos', 'Cosimo de\' Medici (Financier of the council in Florence)'],
      theologiansAndLeaders: ['Pope Eugene IV', 'Cardinal Bessarion of Nicaea (Greek convert to Catholicism, later Cardinal)', 'Isidore of Kiev (Russian Metropolitan who accepted union)', 'Cardinal Giuliano Cesarini', 'Ambrogio Traversari'],
      adversariesOrHeresies: ['Mark of Ephesus (Sole Greek bishop refusing to sign the union)', 'Radical Conciliarists of Basel who elected Antipope Felix V']
    },
    achievements: [
      'Promulgated the historic Bull of Union with the Greeks, Laetentur Caeli ("Let the Heavens Rejoice", July 6, 1439).',
      'Settled the centuries-old dispute over the Filioque: the Greeks recognized that "proceeding from the Father through the Son" expressed the same truth as the Latin "proceeding from the Father and the Son".',
      'Defined Papal Primacy over the universal Church: The Roman Pontiff is the successor of blessed Peter, prince of the Apostles, true vicar of Christ, head of the whole Church, and father and teacher of all Christians.',
      'Dogmatically defined the doctrine of Purgatory and the particular judgment immediately after death.',
      'Achieved subsequent reunions with the Armenian Church (Bull Exsultate Deo), the Coptic Church (Cantate Domino), and the Chaldeans and Maronites.'
    ],
    keyDogmasAndCanons: [
      'Dogma of Papal Primacy (Laetentur Caeli): The Roman Pontiff has full power to pasture, rule, and govern the universal Church.',
      'Dogma on the Procession of the Holy Spirit (Filioque): The Holy Spirit is from the Father and the Son eternally, having His essence and subsistent being from Father and Son together.',
      'Dogma on the Sacraments: Reaffirmed the Seven Sacraments, their matter and form, and the valid use of both leavened and unleavened bread in the Eucharist.'
    ],
    famousQuotesOrCreed: [
      '"Let the heavens rejoice and let the earth be glad... for the wall that divided the Western and the Eastern Church has been removed, peace and harmony have returned!" — Pope Eugene IV, Bull Laetentur Caeli (1439)'
    ],
    lastingImpact: 'The theological high-water mark of ecumenical union between East and West, establishing the doctrinal foundation for the Eastern Catholic Churches (Byzantine, Maronite, Melkite, Ukrainian) that remain in communion with Rome today.',
    theologicalCategory: ['papacy', 'holy-spirit', 'sacraments']
  },
  {
    id: 'lateran-v',
    number: 18,
    name: 'Fifth Council of the Lateran',
    shortName: 'Lateran V',
    year: '1512–1517 AD',
    startYear: 1512,
    endYear: 1517,
    location: 'Rome (St. John Lateran)',
    modernCountry: 'Rome, Italy',
    era: 'reformation-renaissance',
    eraLabel: 'Renaissance & Reformation Era (1414–1563 AD)',
    pontiff: {
      name: 'Pope Julius II & Pope Leo X',
      dates: 'Julius II (1503–1513 AD), Leo X (1513–1521 AD)',
      note: 'Closed on March 16, 1517—just seven months before Martin Luther posted his 95 Theses'
    },
    convenedBy: 'Pope Julius II',
    attendeesCount: '~100 to 115 Bishops and Cardinals',
    summary: 'The final council before the Protestant Reformation; dissolved the schismatic assembly of Pisa, dogmatically defined the individual immortality of the human soul against Neo-Aristotelian Averroism, and enacted initial censorship rules for the printing press.',
    historicalContext: 'King Louis XII of France and rogue cardinals organized an illegal pseudo-council at Pisa to depose Pope Julius II ("The Warrior Pope"). Julius swiftly checkmated them by convoking Lateran V in Rome with the support of Spain, the Holy Roman Empire, and England.',
    majorPlayers: {
      saintsAndDoctors: ['St. Thomas More (English delegate and diplomat, background influence)'],
      emperorsAndRulers: ['Emperor Maximilian I', 'King Louis XII & King Francis I of France', 'King Henry VIII of England'],
      theologiansAndLeaders: ['Pope Julius II', 'Pope Leo X', 'Cardinal Tommaso de Vio (Cajetan)', 'Giles of Viterbo (Prior General of Augustinians)'],
      adversariesOrHeresies: ['Schismatic conciliabulum of Pisa', 'Pietro Pomponazzi (Averroist philosopher denying immortality of soul)']
    },
    achievements: [
      'Nullified the schismatic council of Pisa and reconciled the French crown through the Concordat of Bologna (1516).',
      'Promulgated the Bull Apostolici Regiminis, dogmatically defining that the individual human soul is naturally immortal, refuting philosophers who claimed only a universal collective mind survives.',
      'Decreed that all books printed must receive church examination and an imprimatur to protect the faithful against heresy.',
      'Approved pawnshops for the poor (Montes Pietatis) offering low-interest loans to prevent usurious exploitation.',
      'Sounded the famous prophetic warning through Giles of Viterbo: "Men must be changed by religion, not religion by men."'
    ],
    keyDogmasAndCanons: [
      'Bull Apostolici Regiminis: We define that every soul of man is immortal and individual, and not one single soul shared by all mankind.',
      'Bull Pastor Aeternus (1516): Declared that the Roman Pontiff alone has authority to convoke, transfer, and dissolve general councils.'
    ],
    famousQuotesOrCreed: [
      '"Men must be changed by religion, not religion by men!" — Giles of Viterbo, Opening Address to Lateran V (1512)'
    ],
    lastingImpact: 'Defended Christian philosophical anthropology on the human soul and established printing press oversight. Its failure to implement sweeping moral discipline opened the floodgates to the Protestant revolt months later.',
    theologicalCategory: ['church-reform', 'papacy']
  },
  {
    id: 'trent',
    number: 19,
    name: 'Council of Trent',
    shortName: 'Trent',
    year: '1545–1563 AD',
    startYear: 1545,
    endYear: 1563,
    location: 'Trent (Cathedral of San Vigilio) and Bologna',
    modernCountry: 'Trento, Italy',
    era: 'reformation-renaissance',
    eraLabel: 'Renaissance & Reformation Era (1414–1563 AD)',
    pontiff: {
      name: 'Pope Paul III, Pope Julius III, & Pope Pius IV',
      dates: 'Paul III (1534–1549), Julius III (1550–1555), Pius IV (1559–1565)',
      note: 'Spanned 18 years, 3 distinct periods, across 5 popes (including brief reigns of Marcellus II and Paul IV)'
    },
    convenedBy: 'Pope Paul III',
    attendeesCount: 'Over 255 Bishops, Cardinal Legates, Ambassadors, and Jesuit Theologians',
    summary: 'The great counter-reformation council: definitively defined the Canon of Scripture (73 books), the Catholic doctrine of Justification by grace through faith animated by love, the Seven Sacraments, the Sacrificial nature of the Holy Mass, Transubstantiation, Purgatory, and mandated diocesan seminaries.',
    historicalContext: 'The Protestant Reformation had fractured European Christendom, rejecting the Papacy, the Sacraments, the Mass as sacrifice, Tradition, and free will under Martin Luther, John Calvin, and Huldrych Zwingli. The Church required a comprehensive, rigorous, and unshakeable dogmatic response alongside moral reform.',
    majorPlayers: {
      saintsAndDoctors: ['St. Charles Borromeo (Architect of the Roman Catechism)', 'St. Robert Bellarmine (Theological Giant)', 'St. Peter Canisius (Doctor of the Church)', 'St. Francis de Sales (Propagator of Trent)'],
      emperorsAndRulers: ['Emperor Charles V (Holy Roman Emperor)', 'Emperor Ferdinand I', 'King Philip II of Spain'],
      theologiansAndLeaders: ['Diego Laynez & Alfonso Salmeron (Papal Jesuit Theologians)', 'Cardinal Reginald Pole', 'Cardinal Giovanni Morone', 'Cardinal Hosius'],
      adversariesOrHeresies: ['Martin Luther (Sola Fide, Sola Scriptura)', 'John Calvin (Double Predestination)', 'Anabaptists and radical reformers']
    },
    achievements: [
      'Definitively closed the Canon of Sacred Scripture, declaring the 73 books (including the 7 Deuterocanonical Old Testament books) as inspired by the Holy Spirit.',
      'Decreed that Divine Revelation is transmitted in both Sacred Scripture and Sacred Apostolic Tradition, preserved faithfully by the Church.',
      'Formulated the definitive Decree on Justification (Session VI): Justification is not a legal fiction of imputed righteousness (Luther), but a true inner transformation and renewal by sanctifying grace, faith, hope, and charity working through free will.',
      'Dogmatically defined all Seven Sacraments instituted by Christ (Baptism, Confirmation, Eucharist, Penance, Anointing of the Sick, Holy Orders, Matrimony).',
      'Defended the Holy Mass as a true and proper propitiatory Sacrifice, re-presenting the one Sacrifice of Calvary.',
      'Mandated that every diocese establish a seminary to rigorously educate and form holy priests.',
      'Codified the Tridentine Mass, unified the Roman Missal (1570), published the Roman Catechism (1566), and abolished all commercial sales of indulgences.'
    ],
    keyDogmasAndCanons: [
      'Decree on the Canon of Scripture: Anathema to anyone who does not accept all 73 books of the Old and New Testaments as sacred and canonical.',
      'Decree on Justification: "If anyone says that man can be justified before God by his own works... without the grace of God through Jesus Christ, let him be anathema."',
      'Decree on the Most Holy Eucharist: Reaffirmed Transubstantiation and the Real Presence of Christ, Body, Blood, Soul, and Divinity.',
      'Decree on the Sacrifice of the Mass: The Mass is the same Victim and same Priest offering Himself, only the manner of offering being unbloody.'
    ],
    famousQuotesOrCreed: [
      '"If anyone says that justifying faith is nothing else than confidence in divine mercy which remits sins for Christ\'s sake, or that this confidence alone is that whereby we are justified, let him be anathema." — Council of Trent, Session VI, Canon 12'
    ],
    lastingImpact: 'The bedrock of modern Catholicism. Trent revitalized the Catholic Church, birthed the baroque Catholic revival, inspired thousands of saints and martyrs across the globe, and defined Catholic doctrine for 400 years.',
    theologicalCategory: ['scripture-tradition', 'sacraments', 'church-reform']
  },
  {
    id: 'vatican-i',
    number: 20,
    name: 'First Vatican Council',
    shortName: 'Vatican I',
    year: '1869–1870 AD',
    startYear: 1869,
    endYear: 1870,
    location: 'Rome (St. Peter\'s Basilica)',
    modernCountry: 'Vatican City',
    era: 'modern',
    eraLabel: 'Modern Era (1869–Present)',
    pontiff: {
      name: 'Blessed Pope Pius IX ("Pio Nono")',
      dates: '1846–1878 AD',
      note: 'The longest-reigning post-apostolic Pope in history (31 years); defined the Immaculate Conception in 1854'
    },
    convenedBy: 'Blessed Pope Pius IX',
    attendeesCount: '744 Bishops, Cardinals, and Abbots from around the globe',
    summary: 'Defined the harmony between faith and reason against rationalism and fideism (Dei Filius); and solemnly defined the dogma of Papal Infallibility and universal ordinary papal jurisdiction (Pastor Aeternus).',
    historicalContext: 'The nineteenth century witnessed the rise of aggressive secularism, atheistic materialism, rationalism, and liberalism that denied supernatural revelation. Concurrently, Italian nationalists sought to annex Rome and abolish the Papal States. Pius IX convoked the bishops to assert divine truth against modern errors.',
    majorPlayers: {
      saintsAndDoctors: ['St. John Henry Newman (Influential thinker on the development of doctrine)', 'St. Anthony Mary Claret (Council father)', 'St. Bernadette Soubirous (Witness of Lourdes, background inspiration)'],
      emperorsAndRulers: ['Napoleon III (Withdrew French troops defending Rome)', 'King Victor Emmanuel II of Italy'],
      theologiansAndLeaders: ['Cardinal Henry Edward Manning (Archbishop of Westminster)', 'Bishop Wilhelm Emmanuel von Ketteler (Bishop of Mainz)', 'Bishop Josip Juraj Strossmayer', 'Cardinal Joseph Pecci'],
      adversariesOrHeresies: ['Secular Rationalism (denying miracles and revelation)', 'Fideism (denying that reason can know God)', 'Gallicanism and Febronianism (seeking to diminish papal authority)']
    },
    achievements: [
      'Promulgated the Dogmatic Constitution Dei Filius: Proclaimed that God\'s existence can be known with certainty by the natural light of human reason from created things, and that faith and reason never truly contradict each other.',
      'Promulgated the Dogmatic Constitution Pastor Aeternus: Solemnly defined the dogma of Papal Infallibility: when the Roman Pontiff speaks ex cathedra (from the Chair of Peter) on matters of faith and morals to the whole Church, he possesses by divine assistance that infallibility with which the divine Redeemer willed His Church to be endowed.',
      'Defined the universal, supreme, full, and immediate ordinary episcopal jurisdiction of the Pope over all pastors and faithful throughout the world.',
      'The council was interrupted and suspended indefinitely on October 20, 1870, after Italian troops breached the walls of Rome at Porta Pia, ending the thousand-year temporal Papal States.'
    ],
    keyDogmasAndCanons: [
      'Dogma of Papal Infallibility (Pastor Aeternus, Ch. 4): Ex cathedra definitions of the Roman Pontiff on faith and morals are irreformable of themselves, and not from the consent of the Church.',
      'Dogma of Faith and Reason (Dei Filius, Ch. 2): God can be known with certitude by the natural light of human reason through created realities.'
    ],
    famousQuotesOrCreed: [
      '"The Roman Pontiff, when he speaks ex cathedra—that is, when acting as shepherd and teacher of all Christians, he defines by virtue of his supreme apostolic authority a doctrine concerning faith or morals to be held by the whole Church—by the divine assistance promised to him in blessed Peter, possesses that infallibility with which the divine Redeemer willed His Church to be endowed." — Vatican I, Pastor Aeternus (1870)'
    ],
    lastingImpact: 'Solidified the doctrinal anchor of papal teaching authority against an era of secular revolution and confusion, clarifying the exact conditions and limits of infallible Church teaching.',
    theologicalCategory: ['papacy', 'scripture-tradition']
  },
  {
    id: 'vatican-ii',
    number: 21,
    name: 'Second Vatican Council',
    shortName: 'Vatican II',
    year: '1962–1965 AD',
    startYear: 1962,
    endYear: 1965,
    location: 'Rome (St. Peter\'s Basilica)',
    modernCountry: 'Vatican City',
    era: 'modern',
    eraLabel: 'Modern Era (1869–Present)',
    pontiff: {
      name: 'St. Pope John XXIII & St. Pope Paul VI',
      dates: 'St. John XXIII (1958–1963), St. Paul VI (1963–1978)',
      note: 'John XXIII convoked the council with "aggiornamento"; Paul VI steered it to completion with wisdom'
    },
    convenedBy: 'Saint Pope John XXIII',
    attendeesCount: 'Over 2,600 Bishops from 116 countries (The largest gathering in human history)',
    summary: 'The great pastoral renewal council: promulgated 16 landmark documents including the four Dogmatic Constitutions on Sacred Liturgy (Sacrosanctum Concilium), the Mystery of the Church (Lumen Gentium), Divine Revelation (Dei Verbum), and the Church in the Modern World (Gaudium et Spes); proclaimed the Universal Call to Holiness for all baptized Christians.',
    historicalContext: 'Following two devastating World Wars, the onset of the Cold War, and rapid technological secularization, St. John XXIII perceived the urgent need for a "new Pentecost"—an aggionarmento (bringing up to date) not to change one iota of Catholic dogma, but to communicate the eternal deposit of faith with fresh vigor, beauty, and evangelical power to contemporary humanity.',
    majorPlayers: {
      saintsAndDoctors: ['Saint Pope John XXIII', 'Saint Pope Paul VI', 'Saint Pope John Paul II (then Bishop Karol Wojtyła of Kraków)', 'Blessed Álvaro del Portillo'],
      emperorsAndRulers: ['Represented modern democratic and international observers'],
      theologiansAndLeaders: ['Joseph Ratzinger (future Pope Benedict XVI, theological peritus)', 'Henri de Lubac', 'Yves Congar', 'Cardinal Alfredo Ottaviani', 'Cardinal Augustin Bea', 'Cardinal Leo Joseph Suenens'],
      adversariesOrHeresies: ['Secularism, Totalitarianism, Atheistic Communism, and Nihilism']
    },
    achievements: [
      'Promulgated 16 monumental conciliar documents (4 Constitutions, 9 Decrees, 3 Declarations).',
      'Sacrosanctum Concilium (Constitution on the Sacred Liturgy): Ordered the restoration of the liturgy for full, conscious, and active participation, permitted the vernacular alongside Latin, and renewed the lectionary.',
      'Lumen Gentium (Dogmatic Constitution on the Church): Highlighted the Church as the Mystical Body of Christ and People of God, and proclaimed the "Universal Call to Holiness" for lay people in their everyday work and family lives.',
      'Dei Verbum (Dogmatic Constitution on Divine Revelation): Beautifully integrated Sacred Scripture and Sacred Tradition as the one sacred deposit of the Word of God, encouraging deep biblical study and lectio divina.',
      'Gaudium et Spes (Pastoral Constitution on the Church in the Modern World): Addressed human dignity, marriage and family, socio-economic justice, and international peace.',
      'Dignitatis Humanae: Defended the freedom of religious conscience against state coercion.',
      'Unitatis Redintegratio & Nostra Aetate: Fostered authentic Catholic ecumenical dialogue and respect for world religions without compromising the uniqueness of Christ.'
    ],
    keyDogmasAndCanons: [
      'Lumen Gentium, Chapter V: "The Universal Call to Holiness: All Christians in any state or walk of life are called to the fullness of Christian life and to the perfection of charity."',
      'Dei Verbum, Chapter II: "Sacred Tradition and Sacred Scripture form one sacred deposit of the Word of God, committed to the Church."',
      'Sacrosanctum Concilium, Article 10: "The liturgy is the summit toward which the activity of the Church is directed; it is also the font from which all her power flows."'
    ],
    famousQuotesOrCreed: [
      '"The Church has always venerated the divine Scriptures just as she venerates the body of the Lord... for in the sacred books, the Father who is in heaven meets His children with great love and speaks with them." — Second Vatican Council, Dei Verbum, 21'
    ],
    lastingImpact: 'The roadmap for Catholic life, evangelization, and theology in the modern era. It ignited the lay apostolate, renewed biblical literacy among ordinary Catholics, and established the contemporary liturgical and pastoral life of the universal Church.',
    theologicalCategory: ['scripture-tradition', 'church-reform', 'sacraments', 'papacy']
  }
];

export const getCouncilById = (id: string): EcumenicalCouncil | undefined => {
  return ECUMENICAL_COUNCILS_DATABASE.find(c => c.id === id);
};

export const getCouncilsByEra = (era: EcumenicalCouncil['era']): EcumenicalCouncil[] => {
  return ECUMENICAL_COUNCILS_DATABASE.filter(c => c.era === era);
};
