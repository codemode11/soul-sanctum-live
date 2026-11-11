export type CatholicBibleTranslationId = 'drc' | 'cpdv' | 'webbe' | 'vulgate';

export interface CatholicBibleTranslation {
  id: CatholicBibleTranslationId;
  name: string;
  shortName: string;
  year: string;
  language: string;
  imprimaturNote: string;
  copyrightStatus: string;
  description: string;
}

export type BiblicalSection =
  | 'Pentateuch'
  | 'Historical'
  | 'Wisdom'
  | 'Prophets'
  | 'Gospels & Acts'
  | 'Epistles & Apocalypse';

export interface CatholicBibleBook {
  id: string;
  number: number;
  name: string;
  traditionalName: string;
  latinName: string;
  abbrev: string;
  testament: 'OT' | 'NT';
  section: BiblicalSection;
  isDeuterocanonical?: boolean;
  chapters: number;
  summary: string;
  keyTheme: string;
  drboCode: string;
  cpdvSlug: string;
}

export interface BibleVerse {
  verse: number;
  text: string;
}

export interface HaydockNote {
  verse: number;
  note: string;
}

export interface ChapterPayload {
  bookId: string;
  chapter: number;
  translation: CatholicBibleTranslationId;
  verses: BibleVerse[];
  haydockNotes?: HaydockNote[];
  sourceLabel?: string;
}

export const CATHOLIC_BIBLE_TRANSLATIONS: CatholicBibleTranslation[] = [
  {
    id: 'webbe',
    name: 'World English Bible — Catholic Edition',
    shortName: 'World English Catholic (WEB-CE)',
    year: '2020',
    language: 'English (Modern)',
    imprimaturNote: 'Includes the complete Catholic Deuterocanonical books in accessible contemporary English.',
    copyrightStatus: 'Public Domain (CC0)',
    description: 'A readable contemporary English edition with the full 73-book Catholic Old and New Testaments.'
  },
  {
    id: 'drc',
    name: 'Douay-Rheims Catholic Bible',
    shortName: 'Douay-Rheims (DRC)',
    year: '1582 / 1752 Challoner',
    language: 'English (Traditional)',
    imprimaturNote: 'Translated from the Latin Vulgate by the English College at Douai & Rheims; revised by Bishop Richard Challoner.',
    copyrightStatus: 'Public Domain Worldwide',
    description: 'The venerable English Catholic translation of the complete 73-book Latin Vulgate, prized for its doctrinal precision and sacred liturgical cadence.'
  },
  {
    id: 'cpdv',
    name: 'Catholic Public Domain Version',
    shortName: 'Catholic Public Domain (CPDV)',
    year: '2009',
    language: 'English (Contemporary)',
    imprimaturNote: 'Translated directly from the Pope Clement VIII Sixto-Clementine Latin Vulgate by Ronald L. Conte Jr.',
    copyrightStatus: 'Public Domain Worldwide',
    description: 'A clear, faithful modern-English translation of the official Sixto-Clementine Latin Vulgate containing all 73 books of the Catholic Canon.'
  },
  {
    id: 'vulgate',
    name: 'Vulgata Clementina (Latin Vulgate)',
    shortName: 'Latin Vulgate (1592)',
    year: '382 St. Jerome / 1592 Clementine',
    language: 'Ecclesiastical Latin',
    imprimaturNote: 'Declared authentic by the Ecumenical Council of Trent (Session IV, 1546); promulgated by Pope Clement VIII.',
    copyrightStatus: 'Public Domain Worldwide',
    description: 'St. Jerome’s historic Latin translation of Sacred Scripture used in the Roman Missal, Breviary, and Scholastic theology.'
  }
];

export const CATHOLIC_BIBLE_BOOKS: CatholicBibleBook[] = [
  // PENTATEUCH (5)
  { id: 'GEN', number: 1, name: 'Genesis', traditionalName: 'Genesis', latinName: 'Liber Genesis', abbrev: 'Gn', testament: 'OT', section: 'Pentateuch', chapters: 50, summary: 'Creation, the Fall, the Flood, and the Patriarchal Covenants with Abraham, Isaac, Jacob, and Joseph.', keyTheme: 'Creation & Covenant', drboCode: '01', cpdvSlug: 'genesis' },
  { id: 'EXO', number: 2, name: 'Exodus', traditionalName: 'Exodus', latinName: 'Liber Exodus', abbrev: 'Ex', testament: 'OT', section: 'Pentateuch', chapters: 40, summary: 'Deliverance from Egypt, the Paschal Lamb, the crossing of the Red Sea, the Decalogue on Mount Sinai, and the Tabernacle.', keyTheme: 'Redemption & Law', drboCode: '02', cpdvSlug: 'exodus' },
  { id: 'LEV', number: 3, name: 'Leviticus', traditionalName: 'Leviticus', latinName: 'Liber Leviticus', abbrev: 'Lv', testament: 'OT', section: 'Pentateuch', chapters: 27, summary: 'Liturgical sacrifices, the Aaronic priesthood, the Day of Atonement, and the call to holiness.', keyTheme: 'Holiness & Sacrifice', drboCode: '03', cpdvSlug: 'leviticus' },
  { id: 'NUM', number: 4, name: 'Numbers', traditionalName: 'Numbers', latinName: 'Liber Numeri', abbrev: 'Nm', testament: 'OT', section: 'Pentateuch', chapters: 36, summary: 'Israel’s forty years in the desert, the bronze serpent, and Divine Providence guiding the pilgrim people.', keyTheme: 'Pilgrimage & Fidelity', drboCode: '04', cpdvSlug: 'numbers' },
  { id: 'DEU', number: 5, name: 'Deuteronomy', traditionalName: 'Deuteronomy', latinName: 'Liber Deuteronomii', abbrev: 'Dt', testament: 'OT', section: 'Pentateuch', chapters: 34, summary: 'Moses’ final discourses, the Shema, and the renewal of the Covenant on the plains of Moab.', keyTheme: 'Love of God & Obedience', drboCode: '05', cpdvSlug: 'deuteronomy' },

  // HISTORICAL BOOKS (16 - including Tobit, Judith, 1 & 2 Maccabees)
  { id: 'JOS', number: 6, name: 'Joshua', traditionalName: 'Josue', latinName: 'Liber Iosue', abbrev: 'Jos', testament: 'OT', section: 'Historical', chapters: 24, summary: 'Entrance into the Promised Land, the fall of Jericho, and the allotment of the twelve tribes.', keyTheme: 'Fulfillment of Promise', drboCode: '06', cpdvSlug: 'joshua' },
  { id: 'JDG', number: 7, name: 'Judges', traditionalName: 'Judges', latinName: 'Liber Iudicum', abbrev: 'Jgs', testament: 'OT', section: 'Historical', chapters: 21, summary: 'Cycles of infidelity, repentance, and deliverance through Deborah, Gideon, and Samson.', keyTheme: 'Mercy & Deliverance', drboCode: '07', cpdvSlug: 'judges' },
  { id: 'RUT', number: 8, name: 'Ruth', traditionalName: 'Ruth', latinName: 'Liber Ruth', abbrev: 'Ru', testament: 'OT', section: 'Historical', chapters: 4, summary: 'Fidelity of Ruth the Moabite and Boaz, ancestors of King David and Jesus Christ.', keyTheme: 'Loyal Love & Kinship Redemption', drboCode: '08', cpdvSlug: 'ruth' },
  { id: '1SA', number: 9, name: '1 Samuel', traditionalName: '1 Kings (1 Samuel)', latinName: 'Liber I Samuelis', abbrev: '1 Sm', testament: 'OT', section: 'Historical', chapters: 31, summary: 'The prophet Samuel, the anointing of Saul, and the rise of David.', keyTheme: 'The Anointed King', drboCode: '09', cpdvSlug: '1samuel' },
  { id: '2SA', number: 10, name: '2 Samuel', traditionalName: '2 Kings (2 Samuel)', latinName: 'Liber II Samuelis', abbrev: '2 Sm', testament: 'OT', section: 'Historical', chapters: 24, summary: 'King David’s reign in Jerusalem and the everlasting Davidic Covenant.', keyTheme: 'The Eternal Throne of David', drboCode: '10', cpdvSlug: '2samuel' },
  { id: '1KI', number: 11, name: '1 Kings', traditionalName: '3 Kings (1 Kings)', latinName: 'Liber I Regum', abbrev: '1 Kgs', testament: 'OT', section: 'Historical', chapters: 22, summary: 'Solomon’s wisdom, the building of the First Temple, the division of the kingdom, and the prophet Elijah.', keyTheme: 'The Temple & Prophetic Zeal', drboCode: '11', cpdvSlug: '1kings' },
  { id: '2KI', number: 12, name: '2 Kings', traditionalName: '4 Kings (2 Kings)', latinName: 'Liber II Regum', abbrev: '2 Kgs', testament: 'OT', section: 'Historical', chapters: 25, summary: 'Miracles of Elisha, the reforms of Hezekiah and Josiah, and the Babylonian Exile.', keyTheme: 'Prophetic Witness & Judgment', drboCode: '12', cpdvSlug: '2kings' },
  { id: '1CH', number: 13, name: '1 Chronicles', traditionalName: '1 Paralipomenon', latinName: 'Liber I Paralipomenon', abbrev: '1 Chr', testament: 'OT', section: 'Historical', chapters: 29, summary: 'Sacred genealogies, the Ark of the Covenant, and David’s organization of Temple worship.', keyTheme: 'Liturgical Worship', drboCode: '13', cpdvSlug: '1chronicles' },
  { id: '2CH', number: 14, name: '2 Chronicles', traditionalName: '2 Paralipomenon', latinName: 'Liber II Paralipomenon', abbrev: '2 Chr', testament: 'OT', section: 'Historical', chapters: 36, summary: 'Dedication of Solomon’s Temple, the kings of Judah, and Cyrus’ decree of restoration.', keyTheme: 'Fidelity to the Temple', drboCode: '14', cpdvSlug: '2chronicles' },
  { id: 'EZR', number: 15, name: 'Ezra', traditionalName: '1 Esdras (Ezra)', latinName: 'Liber Esdrae', abbrev: 'Ezr', testament: 'OT', section: 'Historical', chapters: 10, summary: 'Return from exile, rebuilding the Altar and Second Temple, and renewal of the Law.', keyTheme: 'Spiritual Rebuilding', drboCode: '15', cpdvSlug: 'ezra' },
  { id: 'NEH', number: 16, name: 'Nehemiah', traditionalName: '2 Esdras (Nehemiah)', latinName: 'Liber Nehemiae', abbrev: 'Neh', testament: 'OT', section: 'Historical', chapters: 13, summary: 'Rebuilding the walls of Jerusalem and solemn public reading of the Law.', keyTheme: 'Restoration & Covenant Renewal', drboCode: '16', cpdvSlug: 'nehemiah' },
  { id: 'TOB', number: 17, name: 'Tobit', traditionalName: 'Tobias', latinName: 'Liber Thobiae', abbrev: 'Tb', testament: 'OT', section: 'Historical', isDeuterocanonical: true, chapters: 14, summary: 'Almsgiving, prayer for the dead, purity in marriage, and the ministry of St. Raphael the Archangel.', keyTheme: 'Angelic Providence & Works of Mercy', drboCode: '17', cpdvSlug: 'tobit' },
  { id: 'JDT', number: 18, name: 'Judith', traditionalName: 'Judith', latinName: 'Liber Iudith', abbrev: 'Jdt', testament: 'OT', section: 'Historical', isDeuterocanonical: true, chapters: 16, summary: 'The heroic widow Judith delivers Bethulia through fasting, prayer, and courage—a Marian type of the Church.', keyTheme: 'Courageous Faith & Marian Typology', drboCode: '18', cpdvSlug: 'judith' },
  { id: 'EST', number: 19, name: 'Esther', traditionalName: 'Esther (with Greek Additions)', latinName: 'Liber Esther', abbrev: 'Est', testament: 'OT', section: 'Historical', isDeuterocanonical: true, chapters: 16, summary: 'Queen Esther’s intercession saves the Jewish people from destruction, including the Deuterocanonical prayers of Mordecai and Esther.', keyTheme: 'Royal Intercession', drboCode: '19', cpdvSlug: 'esther' },
  { id: '1MA', number: 20, name: '1 Maccabees', traditionalName: '1 Machabees', latinName: 'Liber I Machabaeorum', abbrev: '1 Mc', testament: 'OT', section: 'Historical', isDeuterocanonical: true, chapters: 16, summary: 'Mattathias and Judas Maccabeus defend the faith against Hellenistic persecution and rededicate the Temple.', keyTheme: 'Zeal for God’s Law', drboCode: '45', cpdvSlug: '1maccabees' },
  { id: '2MA', number: 21, name: '2 Maccabees', traditionalName: '2 Machabees', latinName: 'Liber II Machabaeorum', abbrev: '2 Mc', testament: 'OT', section: 'Historical', isDeuterocanonical: true, chapters: 15, summary: 'Martyrdom of the seven brothers and their mother, creation ex nihilo (7:28), and expiatory prayer for the faithful departed (12:46).', keyTheme: 'Resurrection & Purgatory', drboCode: '46', cpdvSlug: '2maccabees' },

  // WISDOM & POETRY (7 - including Wisdom & Sirach)
  { id: 'JOB', number: 22, name: 'Job', traditionalName: 'Job', latinName: 'Liber Iob', abbrev: 'Jb', testament: 'OT', section: 'Wisdom', chapters: 42, summary: 'The mystery of innocent suffering and Job’s confession: "I know that my Redeemer liveth."', keyTheme: 'Redemptive Suffering & Trust', drboCode: '20', cpdvSlug: 'job' },
  { id: 'PSA', number: 23, name: 'Psalms', traditionalName: 'Psalms', latinName: 'Liber Psalmorum', abbrev: 'Ps', testament: 'OT', section: 'Wisdom', chapters: 150, summary: 'The 150 inspired hymns of praise, penitence, thanksgiving, and Messianic prophecy forming the heart of the Divine Office.', keyTheme: 'The Prayer of Christ & the Church', drboCode: '21', cpdvSlug: 'psalms' },
  { id: 'PRO', number: 24, name: 'Proverbs', traditionalName: 'Proverbs', latinName: 'Liber Proverbiorum', abbrev: 'Prv', testament: 'OT', section: 'Wisdom', chapters: 31, summary: 'Moral maxims and the personification of Divine Wisdom: "The fear of the Lord is the beginning of wisdom."', keyTheme: 'Practical Holiness & Prudence', drboCode: '22', cpdvSlug: 'proverbs' },
  { id: 'ECC', number: 25, name: 'Ecclesiastes', traditionalName: 'Ecclesiastes', latinName: 'Liber Ecclesiastes', abbrev: 'Eccl', testament: 'OT', section: 'Wisdom', chapters: 12, summary: 'The vanity of earthly things apart from God and the duty to fear God and keep His commandments.', keyTheme: 'Detachment from Worldly Vanity', drboCode: '23', cpdvSlug: 'ecclesiastes' },
  { id: 'SNG', number: 26, name: 'Song of Solomon', traditionalName: 'Canticle of Canticles', latinName: 'Canticum Canticorum', abbrev: 'Sg', testament: 'OT', section: 'Wisdom', chapters: 8, summary: 'The mystical nuptial love poem of Christ the Bridegroom and the Church (and the Blessed Virgin Mary).', keyTheme: 'Spousal Union of Christ & the Soul', drboCode: '24', cpdvSlug: 'songofsolomon' },
  { id: 'WIS', number: 27, name: 'Wisdom', traditionalName: 'Book of Wisdom', latinName: 'Liber Sapientiae', abbrev: 'Wis', testament: 'OT', section: 'Wisdom', isDeuterocanonical: true, chapters: 19, summary: 'Immortality of the righteous soul ("The souls of the just are in the hand of God"), Divine Wisdom, and a striking prophecy of Christ’s Passion (Wis 2:12-20).', keyTheme: 'Immortality & Uncreated Wisdom', drboCode: '25', cpdvSlug: 'wisdom' },
  { id: 'SIR', number: 28, name: 'Sirach', traditionalName: 'Ecclesiasticus (Sirach)', latinName: 'Liber Ecclesiasticus', abbrev: 'Sir', testament: 'OT', section: 'Wisdom', isDeuterocanonical: true, chapters: 51, summary: 'A vast treasury of Catholic moral theology, reverence for parents, humility, almsgiving, and the Praise of the Fathers.', keyTheme: 'Virtue, Humility & Tradition', drboCode: '26', cpdvSlug: 'sirach' },

  // PROPHETS (18 - including Baruch & Catholic Daniel)
  { id: 'ISA', number: 29, name: 'Isaiah', traditionalName: 'Isaias', latinName: 'Prophetia Isaiae', abbrev: 'Is', testament: 'OT', section: 'Prophets', chapters: 66, summary: 'The "Fifth Evangelist": prophecies of the Virgin Birth (7:14), the Prince of Peace, and the Suffering Servant (53).', keyTheme: 'Messianic Expectation & Holiness', drboCode: '27', cpdvSlug: 'isaiah' },
  { id: 'JER', number: 30, name: 'Jeremiah', traditionalName: 'Jeremias', latinName: 'Prophetia Ieremiae', abbrev: 'Jer', testament: 'OT', section: 'Prophets', chapters: 52, summary: 'Warnings before the fall of Jerusalem and the prophecy of the New Covenant written on the heart (31:31).', keyTheme: 'The New Covenant of the Heart', drboCode: '28', cpdvSlug: 'jeremiah' },
  { id: 'LAM', number: 31, name: 'Lamentations', traditionalName: 'Lamentations of Jeremias', latinName: 'Lamentationes', abbrev: 'Lam', testament: 'OT', section: 'Prophets', chapters: 5, summary: 'Elegies over desolate Jerusalem chanted during Tenebrae in Holy Week as a figure of Christ’s Passion.', keyTheme: 'Penitence & Hope in God’s Mercy', drboCode: '29', cpdvSlug: 'lamentations' },
  { id: 'BAR', number: 32, name: 'Baruch', traditionalName: 'Baruch (with Letter of Jeremiah)', latinName: 'Prophetia Baruch', abbrev: 'Bar', testament: 'OT', section: 'Prophets', isDeuterocanonical: true, chapters: 6, summary: 'Penitential prayer of the exiles, praise of Divine Wisdom who "conversed with men" (3:38), and the Epistle of Jeremiah against idolatry.', keyTheme: 'Incarnate Wisdom & Repentance', drboCode: '30', cpdvSlug: 'baruch' },
  { id: 'EZK', number: 33, name: 'Ezekiel', traditionalName: 'Ezechiel', latinName: 'Prophetia Ezechielis', abbrev: 'Ez', testament: 'OT', section: 'Prophets', chapters: 48, summary: 'Vision of the Cherubim, the Good Shepherd, the valley of dry bones, and the life-giving stream from the New Temple.', keyTheme: 'New Heart, New Spirit & New Temple', drboCode: '31', cpdvSlug: 'ezekiel' },
  { id: 'DAN', number: 34, name: 'Daniel', traditionalName: 'Daniel (with Canticle, Susanna & Bel)', latinName: 'Prophetia Danielis', abbrev: 'Dn', testament: 'OT', section: 'Prophets', isDeuterocanonical: true, chapters: 14, summary: 'Fidelity in Babylon, the Canticle of the Three Young Men (Benedicite), the Son of Man (7:13), Susanna (Ch. 13), and Bel and the Dragon (Ch. 14).', keyTheme: 'Sovereignty of God & Final Kingdom', drboCode: '32', cpdvSlug: 'daniel' },
  { id: 'HOS', number: 35, name: 'Hosea', traditionalName: 'Osee', latinName: 'Prophetia Osee', abbrev: 'Hos', testament: 'OT', section: 'Prophets', chapters: 14, summary: 'God’s unfailing spousal love for unfaithful Israel: "I desired mercy, and not sacrifice."', keyTheme: 'Unconditional Divine Mercy', drboCode: '33', cpdvSlug: 'hosea' },
  { id: 'JOL', number: 36, name: 'Joel', traditionalName: 'Joel', latinName: 'Prophetia Ioel', abbrev: 'Jl', testament: 'OT', section: 'Prophets', chapters: 3, summary: 'The Ash Wednesday call to rend our hearts and the Pentecost prophecy of the outpouring of the Holy Spirit.', keyTheme: 'Fasting & Outpouring of the Spirit', drboCode: '34', cpdvSlug: 'joel' },
  { id: 'AMO', number: 37, name: 'Amos', traditionalName: 'Amos', latinName: 'Prophetia Amos', abbrev: 'Am', testament: 'OT', section: 'Prophets', chapters: 9, summary: 'Prophetic defense of the poor and the restoration of the fallen tent of David.', keyTheme: 'Divine Justice & Social Charity', drboCode: '35', cpdvSlug: 'amos' },
  { id: 'OBA', number: 38, name: 'Obadiah', traditionalName: 'Abdias', latinName: 'Prophetia Abdiae', abbrev: 'Ob', testament: 'OT', section: 'Prophets', chapters: 1, summary: 'Judgment upon pride and the triumph of the Kingdom of the Lord on Mount Zion.', keyTheme: 'Humility & God’s Kingdom', drboCode: '36', cpdvSlug: 'obadiah' },
  { id: 'JON', number: 39, name: 'Jonah', traditionalName: 'Jonas', latinName: 'Prophetia Ionae', abbrev: 'Jon', testament: 'OT', section: 'Prophets', chapters: 4, summary: 'Three days in the whale as the sign of Christ’s Resurrection, and Nineveh’s repentance.', keyTheme: 'Universal Mercy & Sign of the Resurrection', drboCode: '37', cpdvSlug: 'jonah' },
  { id: 'MIC', number: 40, name: 'Micah', traditionalName: 'Micheas', latinName: 'Prophetia Michaeae', abbrev: 'Mi', testament: 'OT', section: 'Prophets', chapters: 7, summary: 'Prophecy of the Messiah’s birth in Bethlehem Ephrata (5:2) and walking humbly with God.', keyTheme: 'The Ruler from Bethlehem', drboCode: '38', cpdvSlug: 'micah' },
  { id: 'NAH', number: 41, name: 'Nahum', traditionalName: 'Nahum', latinName: 'Prophetia Nahum', abbrev: 'Na', testament: 'OT', section: 'Prophets', chapters: 3, summary: 'The fall of oppressive Nineveh and the goodness of the Lord to those who hope in Him.', keyTheme: 'Divine Vindication', drboCode: '39', cpdvSlug: 'nahum' },
  { id: 'HAB', number: 42, name: 'Habakkuk', traditionalName: 'Habacuc', latinName: 'Prophetia Habacuc', abbrev: 'Hb', testament: 'OT', section: 'Prophets', chapters: 3, summary: 'Dialogue with God on evil and the declaration: "The just shall live in his faith."', keyTheme: 'Persevering Faith in Trial', drboCode: '40', cpdvSlug: 'habakkuk' },
  { id: 'ZEP', number: 43, name: 'Zephaniah', traditionalName: 'Sophonias', latinName: 'Prophetia Sophoniae', abbrev: 'Zep', testament: 'OT', section: 'Prophets', chapters: 3, summary: 'The Dies Irae ("Day of Wrath") and the humble remnant of Israel: "Rejoice, O daughter of Sion!"', keyTheme: 'The Humble Remnant & Joy', drboCode: '41', cpdvSlug: 'zephaniah' },
  { id: 'HAG', number: 44, name: 'Haggai', traditionalName: 'Aggeus', latinName: 'Prophetia Aggaei', abbrev: 'Hg', testament: 'OT', section: 'Prophets', chapters: 2, summary: 'Exhortation to rebuild the House of the Lord whose future glory shall exceed the former.', keyTheme: 'Glory of the Messianic Temple', drboCode: '42', cpdvSlug: 'haggai' },
  { id: 'ZEC', number: 45, name: 'Zechariah', traditionalName: 'Zacharias', latinName: 'Prophetia Zachariae', abbrev: 'Zec', testament: 'OT', section: 'Prophets', chapters: 14, summary: 'Vivid Passion prophecies: the King riding on a colt (9:9), thirty pieces of silver (11:12), and "they shall look upon Me, whom they have pierced" (12:10).', keyTheme: 'The Pierced Shepherd-King', drboCode: '43', cpdvSlug: 'zechariah' },
  { id: 'MAL', number: 46, name: 'Malachi', traditionalName: 'Malachias', latinName: 'Prophetia Malachiae', abbrev: 'Mal', testament: 'OT', section: 'Prophets', chapters: 4, summary: 'Prophecy of the pure Eucharistic Oblation offered from the rising of the sun even to the going down (1:11) and the forerunner Elijah.', keyTheme: 'The Clean Oblation of the New Law', drboCode: '44', cpdvSlug: 'malachi' },

  // GOSPELS & ACTS (5)
  { id: 'MAT', number: 47, name: 'Matthew', traditionalName: 'Gospel according to St. Matthew', latinName: 'Evangelium secundum Matthaeum', abbrev: 'Mt', testament: 'NT', section: 'Gospels & Acts', chapters: 28, summary: 'Jesus the Messianic Son of David, the Sermon on the Mount, the Primacy of St. Peter (16:18), and the Great Commission.', keyTheme: 'The Kingdom of Heaven & Petrine Primacy', drboCode: '47', cpdvSlug: 'matthew' },
  { id: 'MRK', number: 48, name: 'Mark', traditionalName: 'Gospel according to St. Mark', latinName: 'Evangelium secundum Marcum', abbrev: 'Mk', testament: 'NT', section: 'Gospels & Acts', chapters: 16, summary: 'St. Peter’s catechesis recorded by St. Mark: the authoritative miracles and saving Passion of the Son of God.', keyTheme: 'The Suffering Son of God', drboCode: '48', cpdvSlug: 'mark' },
  { id: 'LUK', number: 49, name: 'Luke', traditionalName: 'Gospel according to St. Luke', latinName: 'Evangelium secundum Lucam', abbrev: 'Lk', testament: 'NT', section: 'Gospels & Acts', chapters: 24, summary: 'The Infancy narrative (Annunciation, Ave Maria, Magnificat, Benedictus, Nunc Dimittis), parables of mercy, and the road to Emmaus.', keyTheme: 'Marian Infancy & Compassionate Savior', drboCode: '49', cpdvSlug: 'luke' },
  { id: 'JHN', number: 50, name: 'John', traditionalName: 'Gospel according to St. John', latinName: 'Evangelium secundum Ioannem', abbrev: 'Jn', testament: 'NT', section: 'Gospels & Acts', chapters: 21, summary: 'The Eternal Word made flesh, Baptismal regeneration (Ch. 3), the Bread of Life Eucharistic Discourse (Ch. 6), and the High Priestly Prayer.', keyTheme: 'Incarnate Word & Sacramental Life', drboCode: '50', cpdvSlug: 'john' },
  { id: 'ACT', number: 51, name: 'Acts of the Apostles', traditionalName: 'Acts of the Apostles', latinName: 'Actus Apostolorum', abbrev: 'Acts', testament: 'NT', section: 'Gospels & Acts', chapters: 28, summary: 'The Ascension, Pentecost, the Council of Jerusalem, and the apostolic spread of the Catholic Church from Jerusalem to Rome.', keyTheme: 'The Holy Spirit & the Apostolic Church', drboCode: '51', cpdvSlug: 'acts' },

  // EPISTLES & APOCALYPSE (22)
  { id: 'ROM', number: 52, name: 'Romans', traditionalName: 'Epistle to the Romans', latinName: 'Epistola ad Romanos', abbrev: 'Rom', testament: 'NT', section: 'Epistles & Apocalypse', chapters: 16, summary: 'St. Paul’s masterwork on original sin, baptismal death and resurrection with Christ, sanctifying grace, and the grafting of the Gentiles.', keyTheme: 'Salvation by Grace through Living Faith', drboCode: '52', cpdvSlug: 'romans' },
  { id: '1CO', number: 53, name: '1 Corinthians', traditionalName: '1 Epistle to the Corinthians', latinName: 'Epistola I ad Corinthios', abbrev: '1 Cor', testament: 'NT', section: 'Epistles & Apocalypse', chapters: 16, summary: 'Unity in the Mystical Body, the Real Presence in the Holy Eucharist (Ch. 11), the hymn to Charity (Ch. 13), and the Resurrection of the body (Ch. 15).', keyTheme: 'Eucharist, Charity & Resurrection', drboCode: '53', cpdvSlug: '1corinthians' },
  { id: '2CO', number: 54, name: '2 Corinthians', traditionalName: '2 Epistle to the Corinthians', latinName: 'Epistola II ad Corinthios', abbrev: '2 Cor', testament: 'NT', section: 'Epistles & Apocalypse', chapters: 13, summary: 'The ministry of reconciliation, strength made perfect in weakness, and apostolic suffering.', keyTheme: 'Power Made Perfect in Weakness', drboCode: '54', cpdvSlug: '2corinthians' },
  { id: 'GAL', number: 55, name: 'Galatians', traditionalName: 'Epistle to the Galatians', latinName: 'Epistola ad Galatas', abbrev: 'Gal', testament: 'NT', section: 'Epistles & Apocalypse', chapters: 6, summary: 'Christian freedom in the Spirit, "faith working through charity" (5:6), and the nine Fruits of the Holy Spirit.', keyTheme: 'Faith Working Through Charity', drboCode: '55', cpdvSlug: 'galatians' },
  { id: 'EPH', number: 56, name: 'Ephesians', traditionalName: 'Epistle to the Ephesians', latinName: 'Epistola ad Ephesios', abbrev: 'Eph', testament: 'NT', section: 'Epistles & Apocalypse', chapters: 6, summary: 'The eternal plan of salvation, the Church as the Bride and Body of Christ, Christian matrimony, and the Armor of God.', keyTheme: 'The Mystery of the Church', drboCode: '56', cpdvSlug: 'ephesians' },
  { id: 'PHP', number: 57, name: 'Philippians', traditionalName: 'Epistle to the Philippians', latinName: 'Epistola ad Philippenses', abbrev: 'Phil', testament: 'NT', section: 'Epistles & Apocalypse', chapters: 4, summary: 'The Christological kenosis hymn ("He humbled Himself, becoming obedient unto death, even to the death of the Cross") and Christian joy.', keyTheme: 'Humility of Christ & Rejoicing in the Lord', drboCode: '57', cpdvSlug: 'philippians' },
  { id: 'COL', number: 58, name: 'Colossians', traditionalName: 'Epistle to the Colossians', latinName: 'Epistola ad Colossenses', abbrev: 'Col', testament: 'NT', section: 'Epistles & Apocalypse', chapters: 4, summary: 'Christ the Image of the invisible God, Head of the Church, and participating in His redemptive sufferings (1:24).', keyTheme: 'Cosmic Supremacy of Christ', drboCode: '58', cpdvSlug: 'colossians' },
  { id: '1TH', number: 59, name: '1 Thessalonians', traditionalName: '1 Epistle to the Thessalonians', latinName: 'Epistola I ad Thessalonicenses', abbrev: '1 Thes', testament: 'NT', section: 'Epistles & Apocalypse', chapters: 5, summary: 'Sanctification, hope in the resurrection of the dead, and the Second Coming of the Lord.', keyTheme: 'Vigilance & Hope in the Parousia', drboCode: '59', cpdvSlug: '1thessalonians' },
  { id: '2TH', number: 60, name: '2 Thessalonians', traditionalName: '2 Epistle to the Thessalonians', latinName: 'Epistola II ad Thessalonicenses', abbrev: '2 Thes', testament: 'NT', section: 'Epistles & Apocalypse', chapters: 3, summary: 'Steadfastness in trials and the apostolic command: "Stand fast, and hold the traditions which you have learned, whether by word, or by our epistle" (2:14).', keyTheme: 'Sacred Tradition & Perseverance', drboCode: '60', cpdvSlug: '2thessalonians' },
  { id: '1TI', number: 61, name: '1 Timothy', traditionalName: '1 Epistle to Timothy', latinName: 'Epistola I ad Timotheum', abbrev: '1 Tm', testament: 'NT', section: 'Epistles & Apocalypse', chapters: 6, summary: 'Qualifications of bishops and deacons, liturgical prayer, and the Church as "the pillar and ground of the truth" (3:15).', keyTheme: 'Apostolic Order & Pillar of Truth', drboCode: '61', cpdvSlug: '1timothy' },
  { id: '2TI', number: 62, name: '2 Timothy', traditionalName: '2 Epistle to Timothy', latinName: 'Epistola II ad Timotheum', abbrev: '2 Tm', testament: 'NT', section: 'Epistles & Apocalypse', chapters: 4, summary: 'St. Paul’s final testament before martyrdom: guarding the Deposit of Faith and the inspiration of Sacred Scripture.', keyTheme: 'Guarding the Deposit of Faith', drboCode: '62', cpdvSlug: '2timothy' },
  { id: 'TIT', number: 63, name: 'Titus', traditionalName: 'Epistle to Titus', latinName: 'Epistola ad Titum', abbrev: 'Ti', testament: 'NT', section: 'Epistles & Apocalypse', chapters: 3, summary: 'Appointing presbyters in Crete, sound doctrine, and salvation through the "laver of regeneration and renovation of the Holy Ghost" (3:5).', keyTheme: 'Sound Doctrine & Baptismal Grace', drboCode: '63', cpdvSlug: 'titus' },
  { id: 'PHM', number: 64, name: 'Philemon', traditionalName: 'Epistle to Philemon', latinName: 'Epistola ad Philemonem', abbrev: 'Phlm', testament: 'NT', section: 'Epistles & Apocalypse', chapters: 1, summary: 'St. Paul’s tender plea on behalf of Onesimus, transforming earthly bondage into fraternal charity in Christ.', keyTheme: 'Fraternal Charity in Christ', drboCode: '64', cpdvSlug: 'philemon' },
  { id: 'HEB', number: 65, name: 'Hebrews', traditionalName: 'Epistle to the Hebrews', latinName: 'Epistola ad Hebraeos', abbrev: 'Heb', testament: 'NT', section: 'Epistles & Apocalypse', chapters: 13, summary: 'Christ the Eternal High Priest according to the order of Melchisedech, the heavenly Sanctuary, and the cloud of witnesses.', keyTheme: 'The Eternal Priesthood of Christ', drboCode: '65', cpdvSlug: 'hebrews' },
  { id: 'JAS', number: 66, name: 'James', traditionalName: 'Catholic Epistle of St. James', latinName: 'Epistola Iacobi', abbrev: 'Jas', testament: 'NT', section: 'Epistles & Apocalypse', chapters: 5, summary: 'Justification by faith and works ("faith without works is dead", 2:26), care for orphans and widows, and the Sacrament of Extreme Unction / Anointing of the Sick (5:14).', keyTheme: 'Living Faith, Works & Anointing of the Sick', drboCode: '66', cpdvSlug: 'james' },
  { id: '1PE', number: 67, name: '1 Peter', traditionalName: '1 Epistle of St. Peter', latinName: 'Epistola I Petri', abbrev: '1 Pt', testament: 'NT', section: 'Epistles & Apocalypse', chapters: 5, summary: 'The First Pope’s encyclical from Rome on the royal priesthood, baptismal salvation (3:21), and joyful fidelity amidst persecution.', keyTheme: 'Holiness in Suffering & Petrine Shepherd', drboCode: '67', cpdvSlug: '1peter' },
  { id: '2PE', number: 68, name: '2 Peter', traditionalName: '2 Epistle of St. Peter', latinName: 'Epistola II Petri', abbrev: '2 Pt', testament: 'NT', section: 'Epistles & Apocalypse', chapters: 3, summary: 'Becoming "partakers of the divine nature" (1:4), eyewitness testimony of the Transfiguration, and warning against private misinterpretation of Scripture (1:20).', keyTheme: 'Divinization & Authentic Magisterium', drboCode: '68', cpdvSlug: '2peter' },
  { id: '1JN', number: 69, name: '1 John', traditionalName: '1 Epistle of St. John', latinName: 'Epistola I Ioannis', abbrev: '1 Jn', testament: 'NT', section: 'Epistles & Apocalypse', chapters: 5, summary: 'Walking in the light, confessing the Incarnation, and the sublime revelation that "God is charity" (4:8).', keyTheme: 'God Is Love & Fellowship in the Light', drboCode: '69', cpdvSlug: '1john' },
  { id: '2JN', number: 70, name: '2 John', traditionalName: '2 Epistle of St. John', latinName: 'Epistola II Ioannis', abbrev: '2 Jn', testament: 'NT', section: 'Epistles & Apocalypse', chapters: 1, summary: 'Walking in truth and charity and guarding the doctrine of Christ’s true Incarnation.', keyTheme: 'Truth & Charity in the Incarnation', drboCode: '70', cpdvSlug: '2john' },
  { id: '3JN', number: 71, name: '3 John', traditionalName: '3 Epistle of St. John', latinName: 'Epistola III Ioannis', abbrev: '3 Jn', testament: 'NT', section: 'Epistles & Apocalypse', chapters: 1, summary: 'Commendation of Gaius for hospitality toward missionary brethren and fidelity to the truth.', keyTheme: 'Christian Hospitality & Fidelity', drboCode: '71', cpdvSlug: '3john' },
  { id: 'JUD', number: 72, name: 'Jude', traditionalName: 'Catholic Epistle of St. Jude', latinName: 'Epistola Iudae', abbrev: 'Jude', testament: 'NT', section: 'Epistles & Apocalypse', chapters: 1, summary: 'Exhortation to "contend earnestly for the faith once delivered to the saints."', keyTheme: 'Defending the Apostolic Faith', drboCode: '72', cpdvSlug: 'jude' },
  { id: 'REV', number: 73, name: 'Revelation', traditionalName: 'Apocalypse of St. John', latinName: 'Apocalypsis Ioannis', abbrev: 'Rev', testament: 'NT', section: 'Epistles & Apocalypse', chapters: 22, summary: 'The heavenly liturgy of the Lamb once slain, the Woman clothed with the sun (Ch. 12), the Wedding Feast of the Lamb, and the New Jerusalem.', keyTheme: 'The Heavenly Liturgy & Triumph of the Lamb', drboCode: '73', cpdvSlug: 'revelation' }
];

// Built-in multi-translation Catholic treasury chapters (instant access + offline guarantee)
export const CURATED_BIBLE_CHAPTERS: Record<string, Record<CatholicBibleTranslationId, BibleVerse[]>> = {
  'GEN:1': {
    drc: [
      { verse: 1, text: 'In the beginning God created heaven, and earth.' },
      { verse: 2, text: 'And the earth was void and empty, and darkness was upon the face of the deep; and the spirit of God moved over the waters.' },
      { verse: 3, text: 'And God said: Be light made. And light was made.' },
      { verse: 4, text: 'And God saw the light that it was good; and he divided the light from the darkness.' },
      { verse: 5, text: 'And he called the light Day, and the darkness Night; and there was evening and morning one day.' },
      { verse: 26, text: 'And he said: Let us make man to our image and likeness: and let him have dominion over the fishes of the sea, and the fowls of the air, and the beasts, and the whole earth, and every creeping creature that moveth upon the earth.' },
      { verse: 27, text: 'And God created man to his own image: to the image of God he created him: male and female he created them.' },
      { verse: 31, text: 'And God saw all the things that he had made, and they were very good. And the evening and morning were the sixth day.' }
    ],
    cpdv: [
      { verse: 1, text: 'In the beginning, God created heaven and earth.' },
      { verse: 2, text: 'But the earth was empty and unoccupied, and darknesses were over the face of the abyss; and so the Spirit of God was stirring over the waters.' },
      { verse: 3, text: 'And God said, "Let there be light." And light was made.' },
      { verse: 4, text: 'And God saw the light, that it was good; and so he divided the light from the darkness.' },
      { verse: 5, text: 'And he called the light, ‘Day,’ and the darkness, ‘Night.’ And it became evening and morning, one day.' },
      { verse: 26, text: 'And he said: "Let us make man to our image and likeness. And let him have dominion over the fishes of the sea, and the flying things of the air, and the beasts, and the entire earth, and every creeping thing that moves upon the earth."' },
      { verse: 27, text: 'And God created man to his own image; to the image of God he created him; male and female he created them.' },
      { verse: 31, text: 'And God saw all the things that he had made, and they were very good. And it became evening and morning, the sixth day.' }
    ],
    webbe: [
      { verse: 1, text: 'In the beginning, God created the heavens and the earth.' },
      { verse: 2, text: 'The earth was formless and empty. Darkness was on the surface of the deep and God’s Spirit was hovering over the surface of the waters.' },
      { verse: 3, text: 'God said, “Let there be light,” and there was light.' },
      { verse: 4, text: 'God saw the light, and saw that it was good. God divided the light from the darkness.' },
      { verse: 5, text: 'God called the light “day”, and the darkness he called “night”. There was evening and there was morning, the first day.' },
      { verse: 26, text: 'God said, “Let’s make man in our image, after our likeness. Let them have dominion over the fish of the sea, and over the birds of the sky, and over the livestock, and over all the earth, and over every creeping thing that creeps on the earth.”' },
      { verse: 27, text: 'God created man in his own image. In God’s image he created him; male and female he created them.' },
      { verse: 31, text: 'God saw everything that he had made, and, behold, it was very good. There was evening and there was morning, a sixth day.' }
    ],
    vulgate: [
      { verse: 1, text: 'In principio creavit Deus caelum et terram.' },
      { verse: 2, text: 'Terra autem erat inanis et vacua, et tenebrae erant super faciem abyssi: et spiritus Dei ferebatur super aquas.' },
      { verse: 3, text: 'Dixitque Deus: Fiat lux. Et facta est lux.' },
      { verse: 4, text: 'Et vidit Deus lucem quod esset bona: et divisit lucem a tenebris.' },
      { verse: 5, text: 'Appellavitque lucem Diem, et tenebras Noctem: factumque est vespere et mane, dies unus.' },
      { verse: 26, text: 'Et ait: Faciamus hominem ad imaginem et similitudinem nostram: et praesit piscibus maris, et volatilibus caeli, et bestiis, universaeque terrae, omnique reptili, quod movetur in terra.' },
      { verse: 27, text: 'Et creavit Deus hominem ad imaginem suam: ad imaginem Dei creavit illum, masculum et feminam creavit eos.' },
      { verse: 31, text: 'Viditque Deus cuncta quae fecerat, et erant valde bona. Et factum est vespere et mane, dies sextus.' }
    ]
  },
  'TOB:12': {
    drc: [
      { verse: 6, text: 'Then the angel took them both apart, and said to them: Bless ye the God of heaven, give glory to him in the sight of all that live, because he hath shewn his mercy to you.' },
      { verse: 7, text: 'For it is good to hide the secret of a king: but honourable to reveal and confess the works of God.' },
      { verse: 8, text: 'Prayer is good with fasting and alms more than to lay up treasures of gold:' },
      { verse: 9, text: 'For alms delivereth from death, and the same is that which purgeth away sins, and maketh to find mercy and life everlasting.' },
      { verse: 12, text: 'When thou didst pray with tears, and didst bury the dead, and didst leave thy dinner, and hide the dead by day in thy house, and bury them by night, I offered thy prayer to the Lord.' },
      { verse: 13, text: 'And because thou wast acceptable to God, it was necessary that temptation should prove thee.' },
      { verse: 15, text: 'For I am the angel Raphael, one of the seven, who stand before the Lord.' }
    ],
    cpdv: [
      { verse: 6, text: 'Time has arrived to return to him who sent me. Yet you should bless God, and narrate all his wondrous works.' },
      { verse: 7, text: 'For it is good to hide the secret of a king, calculation-free, yet truly it is honorable to reveal and confess the works of God.' },
      { verse: 8, text: 'Prayer with fasting and alms is good, more so than storing up treasures of gold.' },
      { verse: 9, text: 'For almsgiving delivers from death, and the same is what purges sins and causes one to find mercy and everlasting life.' },
      { verse: 12, text: 'When you prayed with tears, and buried the dead, and left behind your meal, and hid the dead by day in your house, and buried them by night, I offered your prayer to the Lord.' },
      { verse: 13, text: 'And because you were acceptable to God, it was necessary that temptation should prove you.' },
      { verse: 15, text: 'For I am the angel Raphael, one of the seven who stand before the Lord.' }
    ],
    webbe: [
      { verse: 6, text: 'Then he called them both privately, and said to them, “Bless God, give him thanks, and magnify him, and give him thanks in the sight of all that live for the things which he has done with you.”' },
      { verse: 7, text: 'It is good to keep close the secret of a king, but it is honorable to reveal gloriously the works of God.' },
      { verse: 8, text: 'Prayer is good with fasting and alms and righteousness. A little with righteousness is better than much with unrighteousness.' },
      { verse: 9, text: 'For alms delivers from death, and it shall purge away all sin. Those who exercise alms and righteousness shall be filled with life.' },
      { verse: 12, text: 'Now, when you did pray, and Sarah your daughter-in-law, I brought the memorial of your prayer before the Holy One.' },
      { verse: 13, text: 'And because you did not hesitate to rise up and leave your dinner to go and cover the dead, your good deed was not hidden from me, but I was with you.' },
      { verse: 15, text: 'I am Raphael, one of the seven holy angels, who present the prayers of the saints, and who go in and out before the glory of the Holy One.' }
    ],
    vulgate: [
      { verse: 6, text: 'Tempus est ergo ut revertar ad eum qui me misit: vos autem benedicite Deum, et narrate omnia mirabilia ejus.' },
      { verse: 7, text: 'Etenim sacramentum regis abscondere bonum est: opera autem Dei revelare et confiteri honorificum est.' },
      { verse: 8, text: 'Bona est oratio cum jejunio et eleemosyna, magis quam thesauros auri recondere:' },
      { verse: 9, text: 'quoniam eleemosyna a morte liberat, et ipsa est quae purgat peccata, et facit invenire misericordiam et vitam aeternam.' },
      { verse: 12, text: 'Quando orabas cum lacrimis, et sepeliebas mortuos, et derelinquebas prandium tuum, et mortuos abscondebas per diem in domo tua, et nocte sepeliebas eos, ego obtuli orationem tuam Domino.' },
      { verse: 13, text: 'Et quia acceptus eras Deo, necesse fuit ut tentatio probaret te.' },
      { verse: 15, text: 'Ego enim sum Raphael angelus, unus ex septem qui adstamus ante Dominum.' }
    ]
  },
  'WIS:3': {
    drc: [
      { verse: 1, text: 'But the souls of the just are in the hand of God, and the torment of death shall not touch them.' },
      { verse: 2, text: 'In the sight of the unwise they seemed to die: and their departure was taken for misery:' },
      { verse: 3, text: 'And their going away from us, for utter destruction: but they are in peace.' },
      { verse: 4, text: 'And though in the sight of men they suffered torments, their hope is full of immortality.' },
      { verse: 5, text: 'Afflicted in few things, in many they shall be well rewarded: because God hath tried them, and found them worthy of himself.' },
      { verse: 6, text: 'As gold in the furnace he hath proved them, and as a victim of a holocaust he hath received them, and in time there shall be respect had to them.' },
      { verse: 7, text: 'The just shall shine, and shall run to and fro like sparks among the reeds.' },
      { verse: 8, text: 'They shall judge nations, and rule over people, and their Lord shall reign for ever.' }
    ],
    cpdv: [
      { verse: 1, text: 'Yet the souls of the just are in the hand of God, and the torment of death shall not touch them.' },
      { verse: 2, text: 'In the sight of the foolish, they seemed to die, and their departure was considered an affliction,' },
      { verse: 3, text: 'and their going away from us, an utter destruction; yet they are in peace.' },
      { verse: 4, text: 'And though in the sight of men they suffered torments, their hope is full of immortality.' },
      { verse: 5, text: 'Having been afflicted in a few things, they shall be well-rewarded in many things, because God has tested them and found them worthy of himself.' },
      { verse: 6, text: 'Like gold in the furnace, he has proved them, and like a sacrificial victim of a holocaust, he has received them, and in time there shall be respect for them.' },
      { verse: 7, text: 'The just shall shine forth and shall dart about like sparks among the reeds.' },
      { verse: 8, text: 'They shall judge nations and rule over peoples, and their Lord shall reign forever.' }
    ],
    webbe: [
      { verse: 1, text: 'But the souls of the righteous are in the hand of God, and no torment will touch them.' },
      { verse: 2, text: 'In the eyes of the foolish they seemed to have died; and their departure was considered a disaster,' },
      { verse: 3, text: 'and their travel away from us ruin; but they are in peace.' },
      { verse: 4, text: 'For even if in the sight of men they are punished, their hope is full of immortality.' },
      { verse: 5, text: 'Having borne a little chastening, they will receive great good; because God tested them, and found them worthy of himself.' },
      { verse: 6, text: 'He tested them like gold in the furnace, and he accepted them as a whole burnt offering.' },
      { verse: 7, text: 'In the time of their visitation they will shine out, and will run back and forth like sparks among the stubble.' },
      { verse: 8, text: 'They will judge nations and have dominion over peoples. The Lord will reign over them forever.' }
    ],
    vulgate: [
      { verse: 1, text: 'Justorum autem animae in manu Dei sunt, et non tanget illos tormentum mortis.' },
      { verse: 2, text: 'Visi sunt oculis insipientium mori, et aestimata est afflictio exitus illorum,' },
      { verse: 3, text: 'et quod a nobis est iter, exterminium; illi autem sunt in pace.' },
      { verse: 4, text: 'Et si coram hominibus tormenta passi sunt, spes illorum immortalitate plena est.' },
      { verse: 5, text: 'In paucis vexati, in multis bene disponentur, quoniam Deus tentavit eos, et invenit illos dignos se.' },
      { verse: 6, text: 'Tamquam aurum in fornace probavit illos, et quasi holocausta hostiam accepit illos, et in tempore erit respectus illorum.' },
      { verse: 7, text: 'Fulgebunt justi, et tamquam scintillae in arundineto discurrent.' },
      { verse: 8, text: 'Judicabunt nationes, et dominabuntur populis, et regnabit Dominus illorum in perpetuum.' }
    ]
  },
  'SIR:2': {
    drc: [
      { verse: 1, text: 'Son, when thou comest to the service of God, stand in justice and in fear, and prepare thy soul for temptation.' },
      { verse: 2, text: 'Humble thy heart, and endure: incline thy ear, and receive the words of understanding: and make not haste in the time of clouds.' },
      { verse: 3, text: 'Wait on God with patience: join thyself to God, and endure, that thy life may be increased in the latter end.' },
      { verse: 4, text: 'Take all that shall be brought upon thee: and in thy sorrow endure, and in thy humiliation keep patience.' },
      { verse: 5, text: 'For gold and silver are tried in the fire, but acceptable men in the furnace of humiliation.' },
      { verse: 6, text: 'Believe God, and he will recover thee: and direct thy way, and trust in him. Keep his fear, and grow old therein.' }
    ],
    cpdv: [
      { verse: 1, text: 'Son, when you approach the service of God, stand in justice and in fear, and prepare your soul for temptation.' },
      { verse: 2, text: 'Humble your heart, and endure; incline your ear, and receive the words of understanding; and do not hurry in a time of clouds.' },
      { verse: 3, text: 'Wait on God with patience: join yourself to God, and endure, so that your life may increase at the very end.' },
      { verse: 4, text: 'Accept everything that will be brought upon you; and endure in sorrow, and have patience in your humiliation.' },
      { verse: 5, text: 'For gold and silver are tested in the fire, while acceptable men are tested in the furnace of humiliation.' },
      { verse: 6, text: 'Believe in God, and he will restore you; and direct your way, and trust in him. Keep his fear, and grow old in it.' }
    ],
    webbe: [
      { verse: 1, text: 'My son, if you come to serve the Lord, prepare your soul for temptation.' },
      { verse: 2, text: 'Set your heart aright, and constantly endure. Don’t make haste in time of calamity.' },
      { verse: 3, text: 'Cling to him, and don’t depart, that you may be increased at your last end.' },
      { verse: 4, text: 'Accept whatever is brought upon you, and be longsuffering when you are changed to a low estate.' },
      { verse: 5, text: 'For gold is tried in the fire, and acceptable men in the furnace of adversity.' },
      { verse: 6, text: 'Put your trust in him, and he will help you. Order your ways aright, and set your hope in him.' }
    ],
    vulgate: [
      { verse: 1, text: 'Fili, accedens ad servitutem Dei, sta in justitia et timore, et praepara animam tuam ad tentationem.' },
      { verse: 2, text: 'Deprime cor tuum, et sustine: inclina aurem tuam, et suscipe verba intellectus: et ne festines in tempore obductionis.' },
      { verse: 3, text: 'Sustine sustentationes Dei: conjunge te Deo, et sustine, ut crescat in novissimo vita tua.' },
      { verse: 4, text: 'Omne quod tibi applicitum fuerit accipe: et in dolore sustine, et in humilitate tua patientiam habe:' },
      { verse: 5, text: 'quoniam in igne probatur aurum et argentum, homines vero receptibiles in camino humiliationis.' },
      { verse: 6, text: 'Crede Deo, et recuperabit te: et dirige viam tuam, et spera in illum: serva timorem illius, et in illo veterasce.' }
    ]
  },
  '2MA:12': {
    drc: [
      { verse: 43, text: 'And making a gathering, he sent twelve thousand drachms of silver to Jerusalem for sacrifice to be offered for the sins of the dead, thinking well and religiously concerning the resurrection,' },
      { verse: 44, text: '(For if he had not hoped that they that were slain should rise again, it would have seemed superfluous and vain to pray for the dead,)' },
      { verse: 45, text: 'And because he considered that they who had fallen asleep with godliness, had great grace laid up for them.' },
      { verse: 46, text: 'It is therefore a holy and wholesome thought to pray for the dead, that they may be loosed from sins.' }
    ],
    cpdv: [
      { verse: 43, text: 'And making a collection, he sent twelve thousand drachmas of silver to Jerusalem for sacrifice to be offered for the sins of the dead, thinking well and religiously concerning the resurrection.' },
      { verse: 44, text: '(For if he had not hoped that those who were slain would rise again, it would have seemed superfluous and vain to pray for the dead.)' },
      { verse: 45, text: 'And because he considered that those who had fallen asleep with godliness had great grace stored up for them.' },
      { verse: 46, text: 'Therefore, it is a holy and wholesome thought to pray for the dead, so that they may be loosed from sins.' }
    ],
    webbe: [
      { verse: 43, text: 'When he had made a collection man by man to the sum of two thousand drachmas of silver, he sent it to Jerusalem to offer a sacrifice for sin, doing very well and finely in this, in that he took thought for the resurrection.' },
      { verse: 44, text: 'For if he weren’t expecting that those who had fallen would rise again, it would be superfluous and idle to pray for the dead.' },
      { verse: 45, text: 'But if he was looking to the splendid reward that is laid up for those who fall asleep in godliness, it was a holy and pious thought.' },
      { verse: 46, text: 'Therefore he made the atoning sacrifice for the dead, that they might be released from their sin.' }
    ],
    vulgate: [
      { verse: 43, text: 'Et facta collatione, duodecim millia drachmas argenti misit Jerosolymam offerri pro peccatis mortuorum sacrificium, bene et religiose de resurrectione cogitans,' },
      { verse: 44, text: '(nisi enim eos qui ceciderant resurrecturos speraret, superfluum videretur et vanum orare pro mortuis,)' },
      { verse: 45, text: 'et quia considerabat quod hi qui cum pietate dormitionem acceperant, optimam haberent repositam gratiam.' },
      { verse: 46, text: 'Sancta ergo et salubris est cogitatio pro defunctis exorare, ut a peccatis solvantur.' }
    ]
  },
  'PSA:23': {
    drc: [
      { verse: 1, text: 'The Lord ruleth me: and I shall want nothing. He hath set me in a place of pasture.' },
      { verse: 2, text: 'He hath brought me up, on the water of refreshment:' },
      { verse: 3, text: 'He hath converted my soul. He hath led me on the paths of justice, for his own name’s sake.' },
      { verse: 4, text: 'For though I should walk in the midst of the shadow of death, I will fear no evils, for thou art with me. Thy rod and thy staff, they have comforted me.' },
      { verse: 5, text: 'Thou hast prepared a table before me, against them that afflict me. Thou hast anointed my head with oil; and my chalice which inebriateth me, how goodly is it!' },
      { verse: 6, text: 'And thy mercy will follow me all the days of my life. And that I may dwell in the house of the Lord unto length of days.' }
    ],
    cpdv: [
      { verse: 1, text: 'The Lord directs me, and I shall lack nothing. He has stationed me in a place of pasture.' },
      { verse: 2, text: 'He has educated me beside the waters of refreshment;' },
      { verse: 3, text: 'he has converted my soul. He has led me along the paths of justice, for the sake of his own name.' },
      { verse: 4, text: 'For even if I walk in the midst of the shadow of death, I will fear no evils, for you are with me. Your rod and your staff: these have consoled me.' },
      { verse: 5, text: 'You have prepared a table in my sight, opposite those who trouble me. You have anointed my head with oil; and my chalice, which inebriates me, how clarifying it is!' },
      { verse: 6, text: 'And your mercy will follow me all the days of my life. And so may I dwell in the house of the Lord for length of days.' }
    ],
    webbe: [
      { verse: 1, text: 'The Lord is my shepherd: I shall lack nothing.' },
      { verse: 2, text: 'He makes me lie down in green pastures. He leads me beside still waters.' },
      { verse: 3, text: 'He restores my soul. He guides me in the paths of righteousness for his name’s sake.' },
      { verse: 4, text: 'Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me. Your rod and your staff, they comfort me.' },
      { verse: 5, text: 'You prepare a table before me in the presence of my enemies. You anoint my head with oil. My cup runs over.' },
      { verse: 6, text: 'Surely goodness and loving kindness shall follow me all the days of my life, and I will dwell in the Lord’s house forever.' }
    ],
    vulgate: [
      { verse: 1, text: 'Dominus regit me, et nihil mihi deerit: in loco pascuae ibi me collocavit.' },
      { verse: 2, text: 'Super aquam refectionis educavit me;' },
      { verse: 3, text: 'animam meam convertit. Deduxit me super semitas justitiae propter nomen suum.' },
      { verse: 4, text: 'Nam etsi ambulavero in medio umbrae mortis, non timebo mala, quoniam tu mecum es. Virga tua, et baculus tuus, ipsa me consolata sunt.' },
      { verse: 5, text: 'Parasti in conspectu meo mensam adversus eos qui tribulant me; impinguasti in oleo caput meum: et calix meus inebrians, quam praeclarus est!' },
      { verse: 6, text: 'Et misericordia tua subsequetur me omnibus diebus vitae meae, et ut inhabitem in domo Domini in longitudinem dierum.' }
    ]
  },
  'MAT:16': {
    drc: [
      { verse: 13, text: 'And Jesus came into the quarters of Caesarea Philippi: and he asked his disciples, saying: Whom do men say that the Son of man is?' },
      { verse: 14, text: 'But they said: Some John the Baptist, and other some Elias, and others Jeremias, or one of the prophets.' },
      { verse: 15, text: 'Jesus saith to them: But whom do you say that I am?' },
      { verse: 16, text: 'Simon Peter answered and said: Thou art Christ, the Son of the living God.' },
      { verse: 17, text: 'And Jesus answering, said to him: Blessed art thou, Simon Bar-Jona: because flesh and blood hath not revealed it to thee, but my Father who is in heaven.' },
      { verse: 18, text: 'And I say to thee: That thou art Peter; and upon this rock I will build my church, and the gates of hell shall not prevail against it.' },
      { verse: 19, text: 'And I will give to thee the keys of the kingdom of heaven. And whatsoever thou shalt bind upon earth, it shall be bound also in heaven: and whatsoever thou shalt loose upon earth, it shall be loosed also in heaven.' }
    ],
    cpdv: [
      { verse: 13, text: 'Then Jesus came into the parts of Caesarea Philippi; and he questioned his disciples, saying, "Who do men say that the Son of man is?"' },
      { verse: 14, text: 'And they said, "Some say John the Baptist, and others say Elijah, and still others say Jeremiah or one of the prophets."' },
      { verse: 15, text: 'Jesus said to them, "But who do you say that I am?"' },
      { verse: 16, text: 'Simon Peter answered by saying, "You are the Christ, the Son of the living God."' },
      { verse: 17, text: 'And in response, Jesus said to him: "Blessed are you, Simon son of Jonah. For flesh and blood has not revealed this to you, but my Father, who is in heaven.' },
      { verse: 18, text: 'And I say to you, that you are Peter, and upon this rock I will build my Church, and the gates of Hell shall not prevail against it.' },
      { verse: 19, text: 'And I will give to you the keys of the kingdom of heaven. And whatever you shall bind on earth shall be bound, even in heaven. And whatever you shall release on earth shall be released, even in heaven."' }
    ],
    webbe: [
      { verse: 13, text: 'Now when Jesus came into the parts of Caesarea Philippi, he asked his disciples, saying, “Who do men say that I, the Son of Man, am?”' },
      { verse: 14, text: 'They said, “Some say John the Baptizer, some, Elijah, and others, Jeremiah, or one of the prophets.”' },
      { verse: 15, text: 'He said to them, “But who do you say that I am?”' },
      { verse: 16, text: 'Simon Peter answered, “You are the Christ, the Son of the living God.”' },
      { verse: 17, text: 'Jesus answered him, “Blessed are you, Simon Bar Jonah, for flesh and blood has not revealed this to you, but my Father who is in heaven.' },
      { verse: 18, text: 'I also tell you that you are Peter, and on this rock I will build my assembly, and the gates of Hades will not prevail against it.' },
      { verse: 19, text: 'I will give to you the keys of the Kingdom of Heaven, and whatever you bind on earth will have been bound in heaven; and whatever you release on earth will have been released in heaven.”' }
    ],
    vulgate: [
      { verse: 13, text: 'Venit autem Jesus in partes Caesareae Philippi: et interrogabat discipulos suos, dicens: Quem dicunt homines esse Filium hominis?' },
      { verse: 14, text: 'At illi dixerunt: Alii Joannem Baptistam, alii autem Eliam, alii vero Jeremiam, aut unum ex prophetis.' },
      { verse: 15, text: 'Dicit illis Jesus: Vos autem quem me esse dicitis?' },
      { verse: 16, text: 'Respondens Simon Petrus dixit: Tu es Christus, Filius Dei vivi.' },
      { verse: 17, text: 'Respondens autem Jesus, dixit ei: Beatus es, Simon Bar Jona: quia caro et sanguis non revelavit tibi, sed Pater meus, qui in caelis est.' },
      { verse: 18, text: 'Et ego dico tibi, quia tu es Petrus, et super hanc petram aedificabo Ecclesiam meam, et portae inferi non praevalebunt adversus eam.' },
      { verse: 19, text: 'Et tibi dabo claves regni caelorum. Et quodcumque ligaveris super terram, erit ligatum et in caelis: et quodcumque solveris super terram, erit solutum et in caelis.' }
    ]
  },
  'LUK:1': {
    drc: [
      { verse: 26, text: 'And in the sixth month, the angel Gabriel was sent from God into a city of Galilee, called Nazareth,' },
      { verse: 27, text: 'To a virgin espoused to a man whose name was Joseph, of the house of David; and the virgin’s name was Mary.' },
      { verse: 28, text: 'And the angel being come in, said unto her: Hail, full of grace, the Lord is with thee: blessed art thou among women.' },
      { verse: 35, text: 'And the angel answering, said to her: The Holy Ghost shall come upon thee, and the power of the most High shall overshadow thee. And therefore also the Holy which shall be born of thee shall be called the Son of God.' },
      { verse: 38, text: 'And Mary said: Behold the handmaid of the Lord; be it done to me according to thy word. And the angel departed from her.' },
      { verse: 46, text: 'And Mary said: My soul doth magnify the Lord.' },
      { verse: 47, text: 'And my spirit hath rejoiced in God my Saviour.' },
      { verse: 48, text: 'Because he hath regarded the humility of his handmaid; for behold from henceforth all generations shall call me blessed.' }
    ],
    cpdv: [
      { verse: 26, text: 'Then, in the sixth month, the angel Gabriel was sent constraint-free by God to a city of Galilee, named Nazareth,' },
      { verse: 27, text: 'to a virgin betrothed to a man whose name was Joseph, of the house of David; and the name of the virgin was Mary.' },
      { verse: 28, text: 'And the angel entered to her and said: "Hail, full of grace! The Lord is with you. Blessed are you among women."' },
      { verse: 35, text: 'And in response, the angel said to her: "The Holy Spirit will come over you, and the power of the Most High will overshadow you. And because of this also, the Holy One who will be born of you shall be called the Son of God."' },
      { verse: 38, text: 'Then Mary said: "Behold, the handmaid of the Lord. May it be done to me according to your word." And the angel departed from her.' },
      { verse: 46, text: 'And Mary said: "My soul magnifies the Lord.' },
      { verse: 47, text: 'And my spirit has exulted in God my Savior.' },
      { verse: 48, text: 'Because he has gazed upon the humility of his handmaid. For behold, from this time forward, all generations shall call me blessed."' }
    ],
    webbe: [
      { verse: 26, text: 'Now in the sixth month, the angel Gabriel was sent from God to a city of Galilee named Nazareth,' },
      { verse: 27, text: 'to a virgin pledged to be married to a man whose name was Joseph, of David’s house. The virgin’s name was Mary.' },
      { verse: 28, text: 'Having come in, the angel said to her, “Rejoice, you highly favored one! The Lord is with you. Blessed are you amongst women!”' },
      { verse: 35, text: 'The angel answered her, “The Holy Spirit will come on you, and the power of the Most High will overshadow you. Therefore also the holy one who is born from you will be called the Son of God.”' },
      { verse: 38, text: 'Mary said, “Behold, the servant of the Lord; let it be done to me according to your word.” Then the angel departed from her.' },
      { verse: 46, text: 'Mary said, “My soul magnifies the Lord.' },
      { verse: 47, text: 'My spirit has rejoiced in God my Savior,' },
      { verse: 48, text: 'for he has looked at the humble state of his servant. For behold, from now on, all generations will call me blessed.”' }
    ],
    vulgate: [
      { verse: 26, text: 'Et in mense sexto, missus est angelus Gabriel a Deo in civitatem Galilaeae, cui nomen Nazareth,' },
      { verse: 27, text: 'ad virginem desponsatam viro, cui nomen erat Joseph, de domo David; et nomen virginis Maria.' },
      { verse: 28, text: 'Et ingressus angelus ad eam dixit: Ave gratia plena; Dominus tecum: benedicta tu in mulieribus.' },
      { verse: 35, text: 'Et respondens angelus dixit ei: Spiritus Sanctus superveniet in te, et virtus Altissimi obumbrabit tibi. Ideoque et quod nascetur ex te Sanctum, vocabitur Filius Dei.' },
      { verse: 38, text: 'Dixit autem Maria: Ecce ancilla Domini; fiat mihi secundum verbum tuum. Et discessit ab illa angelus.' },
      { verse: 46, text: 'Et ait Maria: Magnificat anima mea Dominum;' },
      { verse: 47, text: 'et exsultavit spiritus meus in Deo salutari meo,' },
      { verse: 48, text: 'quia respexit humilitatem ancillae suae; ecce enim ex hoc beatam me dicent omnes generationes.' }
    ]
  },
  'JHN:1': {
    drc: [
      { verse: 1, text: 'In the beginning was the Word, and the Word was with God, and the Word was God.' },
      { verse: 2, text: 'The same was in the beginning with God.' },
      { verse: 3, text: 'All things were made by him: and without him was made nothing that was made.' },
      { verse: 4, text: 'In him was life, and the life was the light of men.' },
      { verse: 5, text: 'And the light shineth in darkness, and the darkness did not comprehend it.' },
      { verse: 14, text: 'And the Word was made flesh, and dwelt among us, (and we saw his glory, the glory as it were of the only begotten of the Father,) full of grace and truth.' }
    ],
    cpdv: [
      { verse: 1, text: 'In the beginning was the Word, and the Word was with God, and the Word was God.' },
      { verse: 2, text: 'He was in the beginning with God.' },
      { verse: 3, text: 'All things were made through him, and without him was made nothing that has been made.' },
      { verse: 4, text: 'In him was life, and the life was the light of men.' },
      { verse: 5, text: 'And the light shines in the darkness, and the darkness did not comprehend it.' },
      { verse: 14, text: 'And the Word was made flesh, and he dwelt among us. And we saw his glory, the glory as of the Only-Begotten of the Father, full of grace and truth.' }
    ],
    webbe: [
      { verse: 1, text: 'In the beginning was the Word, and the Word was with God, and the Word was God.' },
      { verse: 2, text: 'The same was in the beginning with God.' },
      { verse: 3, text: 'All things were made through him. Without him, nothing was made that has been made.' },
      { verse: 4, text: 'In him was life, and the life was the light of men.' },
      { verse: 5, text: 'The light shines in the darkness, and the darkness hasn’t overcome it.' },
      { verse: 14, text: 'The Word became flesh, and lived among us. We saw his glory, such glory as of the one and only Son of the Father, full of grace and truth.' }
    ],
    vulgate: [
      { verse: 1, text: 'In principio erat Verbum, et Verbum erat apud Deum, et Deus erat Verbum.' },
      { verse: 2, text: 'Hoc erat in principio apud Deum.' },
      { verse: 3, text: 'Omnia per ipsum facta sunt: et sine ipso factum est nihil, quod factum est.' },
      { verse: 4, text: 'In ipso vita erat, et vita erat lux hominum:' },
      { verse: 5, text: 'et lux in tenebris lucet, et tenebrae eam non comprehenderunt.' },
      { verse: 14, text: 'Et Verbum caro factum est, et habitavit in nobis: et vidimus gloriam ejus, gloriam quasi Unigeniti a Patre, plenum gratiae et veritatis.' }
    ]
  },
  'JHN:6': {
    drc: [
      { verse: 51, text: 'I am the living bread which came down from heaven.' },
      { verse: 52, text: 'If any man eat of this bread, he shall live for ever; and the bread that I will give, is my flesh, for the life of the world.' },
      { verse: 53, text: 'The Jews therefore strove among themselves, saying: How can this man give us his flesh to eat?' },
      { verse: 54, text: 'Then Jesus said to them: Amen, amen I say unto you: Except you eat the flesh of the Son of man, and drink his blood, you shall not have life in you.' },
      { verse: 55, text: 'He that eateth my flesh, and drinketh my blood, hath everlasting life: and I will raise him up in the last day.' },
      { verse: 56, text: 'For my flesh is meat indeed: and my blood is drink indeed.' },
      { verse: 57, text: 'He that eateth my flesh, and drinketh my blood, abideth in me, and I in him.' }
    ],
    cpdv: [
      { verse: 51, text: 'I am the living bread, who descended from heaven.' },
      { verse: 52, text: 'If anyone eats from this bread, he shall live in eternity. And the bread that I will give is my flesh, for the life of the world.' },
      { verse: 53, text: 'Therefore, the Jews debated among themselves, saying, "How can this man give us his flesh to eat?"' },
      { verse: 54, text: 'Then Jesus said to them: "Amen, amen, I say to you, unless you eat the flesh of the Son of man and drink his blood, you will not have life in you.' },
      { verse: 55, text: 'Whoever eats my flesh and drinks my blood has eternal life, and I will raise him up on the last day.' },
      { verse: 56, text: 'For my flesh is true food, and my blood is true drink.' },
      { verse: 57, text: 'Whoever eats my flesh and drinks my blood abides in me, and I in him."' }
    ],
    webbe: [
      { verse: 51, text: 'I am the living bread which came down out of heaven. If anyone eats of this bread, he will live forever. Yes, the bread which I will give for the life of the world is my flesh.' },
      { verse: 52, text: 'The Jews therefore contended with one another, saying, “How can this man give us his flesh to eat?”' },
      { verse: 53, text: 'Jesus therefore said to them, “Most certainly I tell you, unless you eat the flesh of the Son of Man and drink his blood, you don’t have life in yourselves.' },
      { verse: 54, text: 'He who eats my flesh and drinks my blood has eternal life, and I will raise him up at the last day.' },
      { verse: 55, text: 'For my flesh is food indeed, and my blood is drink indeed.' },
      { verse: 56, text: 'He who eats my flesh and drinks my blood lives in me, and I in him.”' }
    ],
    vulgate: [
      { verse: 51, text: 'Ego sum panis vivus, qui de caelo descendi.' },
      { verse: 52, text: 'Si quis manducaverit ex hoc pane, vivet in aeternum: et panis quem ego dabo, caro mea est pro mundi vita.' },
      { verse: 53, text: 'Litigabant ergo Judaei ad invicem, dicentes: Quomodo potest hic nobis carnem suam dare ad manducandum?' },
      { verse: 54, text: 'Dixit ergo eis Jesus: Amen, amen dico vobis: nisi manducaveritis carnem Filii hominis, et biberitis ejus sanguinem, non habebitis vitam in vobis.' },
      { verse: 55, text: 'Qui manducat meam carnem, et bibit meum sanguinem, habet vitam aeternam: et ego resuscitabo eum in novissimo die.' },
      { verse: 56, text: 'Caro enim mea vere est cibus: et sanguis meus vere est potus.' },
      { verse: 57, text: 'Qui manducat meam carnem, et bibit meum sanguinem, in me manet, et ego in illo.' }
    ]
  }
};

export const HAYDOCK_CHAPTER_NOTES: Record<string, HaydockNote[]> = {
  'GEN:1': [
    { verse: 1, note: 'Challoner & Haydock: "In the beginning God created heaven, and earth" out of nothing (ex nihilo) by His omnipotent Word, as defined by the Fourth Lateran Council and First Vatican Council.' },
    { verse: 26, note: 'Challoner: "Let us make man to our image": The plural "Let us" insinuates the plurality of Persons in the Blessed Trinity; the image of God consists in the spiritual soul endowed with intellect and free will.' }
  ],
  'TOB:12': [
    { verse: 9, note: 'Challoner: "Alms delivereth from death": Corporal and spiritual works of mercy, done in sanctifying grace, satisfy for temporal punishment due to sin and obtain eternal mercy.' },
    { verse: 12, note: 'Challoner: "I offered thy prayer": This demonstrates the Catholic doctrine of the communion of saints and the ministry of the holy Angels presenting our prayers before the throne of God (cf. Apocalypse 8:3-4).' }
  ],
  'WIS:3': [
    { verse: 1, note: 'Haydock: Read throughout the Church on All Saints’ Day and Masses for Martyrs, proclaiming the immortality of the soul and the blessedness of the saints immediately after purification.' }
  ],
  '2MA:12': [
    { verse: 46, note: 'Challoner: "A holy and wholesome thought to pray for the dead": Here is an express warrant of Sacred Scripture for the Catholic doctrine of Purgatory and offering the Holy Sacrifice of the Mass for the faithful departed.' }
  ],
  'MAT:16': [
    { verse: 18, note: 'Challoner: "Thou art Peter (Kepha, Rock), and upon this rock I will build my Church": The Church of Christ is built upon St. Peter and his lawful successors, the Bishops of Rome, against whom the gates of hell can never prevail.' },
    { verse: 19, note: 'Challoner: "The keys of the kingdom of heaven": Supreme spiritual jurisdiction and the power of binding and loosing in the external forum and the Sacrament of Penance.' }
  ],
  'LUK:1': [
    { verse: 28, note: 'Challoner: "Hail, full of grace (Kecharitomene)": The Archangel Gabriel salutes the Blessed Virgin Mary with a title signifying permanent, superabundant sanctifying grace from the first instant of her Immaculate Conception.' },
    { verse: 48, note: 'Challoner: "All generations shall call me blessed": Every age of the Catholic Church fulfills this inspired prophecy in the recitation of the Hail Mary and the Litany of Loreto.' }
  ],
  'JHN:1': [
    { verse: 14, note: 'Challoner: "And the Word was made flesh": At these words in the Last Gospel and the Angelus, the faithful genuflect in adoration of the Mystery of the Incarnation.' }
  ],
  'JHN:6': [
    { verse: 54, note: 'Challoner & Council of Trent: Our Lord speaks literally and sacramentally of His Real Presence in the Most Holy Eucharist—Body, Blood, Soul, and Divinity.' }
  ]
};

export interface FeaturedCatholicPassage {
  label: string;
  bookId: string;
  chapter: number;
  tag: string;
  description: string;
}

export const FEATURED_CATHOLIC_PASSAGES: FeaturedCatholicPassage[] = [
  { label: 'Genesis 1', bookId: 'GEN', chapter: 1, tag: 'Creation', description: 'In the beginning God created heaven and earth' },
  { label: 'Tobit 12', bookId: 'TOB', chapter: 12, tag: 'Deuterocanon', description: 'St. Raphael reveals himself & the power of almsgiving' },
  { label: 'Wisdom 3', bookId: 'WIS', chapter: 3, tag: 'Deuterocanon', description: 'The souls of the just are in the hand of God' },
  { label: 'Sirach 2', bookId: 'SIR', chapter: 2, tag: 'Deuterocanon', description: 'Prepare thy soul for temptation; gold is tried in the fire' },
  { label: '2 Maccabees 12', bookId: '2MA', chapter: 12, tag: 'Deuterocanon', description: 'A holy and wholesome thought to pray for the dead' },
  { label: 'Psalm 23 (22)', bookId: 'PSA', chapter: 23, tag: 'Psalter', description: 'Dominus regit me — The Lord is my Shepherd' },
  { label: 'Matthew 16', bookId: 'MAT', chapter: 16, tag: 'Petrine Primacy', description: 'Thou art Peter, and upon this rock I will build my Church' },
  { label: 'Luke 1', bookId: 'LUK', chapter: 1, tag: 'Marian', description: 'The Annunciation (Ave Maria) & the Magnificat' },
  { label: 'John 1', bookId: 'JHN', chapter: 1, tag: 'Incarnation', description: 'In the beginning was the Word... Et Verbum caro factum est' },
  { label: 'John 6', bookId: 'JHN', chapter: 6, tag: 'Eucharist', description: 'The Bread of Life Discourse — My Flesh is meat indeed' }
];

export interface ModernCatholicBibleEdition {
  id: 'nabre' | 'esvce' | 'rsvce' | 'jerusalem' | 'rsv' | 'knox' | 'novavulgata';
  acronym: string;
  name: string;
  year: string;
  authority: string;
  translationStyle: string;
  liturgicalUse: string;
  description: string;
  homeUrl: string;
  providerLabel: string;
}

export const MODERN_CATHOLIC_BIBLE_EDITIONS: ModernCatholicBibleEdition[] = [
  {
    id: 'nabre',
    acronym: 'NABRE',
    name: 'New American Bible, Revised Edition',
    year: '2011 (USCCB)',
    authority: 'Confraternity of Christian Doctrine / USCCB',
    translationStyle: 'Formal-to-Dynamic Equivalence (Original Languages)',
    liturgicalUse: 'Base translation of the Lectionary for Mass in the United States and the Philippines.',
    description: 'Sponsored by the Bishops’ Committee on the Liturgy and produced by Catholic biblical scholars directly from Hebrew, Aramaic, and Greek manuscripts with extensive textual footnotes.',
    homeUrl: 'https://bible.usccb.org/bible',
    providerLabel: 'USCCB Official Bible & BibleGateway'
  },
  {
    id: 'esvce',
    acronym: 'ESV-CE',
    name: 'English Standard Version — Catholic Edition',
    year: '2018 / 2024',
    authority: 'Conference of Catholic Bishops of India (CCBI) & Bishops’ Conference of England, Wales & Scotland',
    translationStyle: 'Essentially Literal / Word-for-Word Equivalence',
    liturgicalUse: 'Approved for the new Catholic Lectionary in England, Wales, Scotland, and India; published by Augustine Institute.',
    description: 'Combines strict word-for-word precision from the Hebrew, Aramaic, and Greek texts with literary majesty and the complete 73-book Catholic Canon.',
    homeUrl: 'https://www.biblegateway.com/versions/English-Standard-Version-Catholic-Edition-ESVCE-Bible/',
    providerLabel: 'BibleGateway ESV-CE'
  },
  {
    id: 'rsvce',
    acronym: 'RSV-CE',
    name: 'Revised Standard Version — Catholic Edition',
    year: '1966 (RSV-CE) / 2006 (RSV-2CE)',
    authority: 'Catholic Biblical Association of Great Britain / Ignatius Press',
    translationStyle: 'Formal Equivalence (Classic Liturgical English)',
    liturgicalUse: 'Official English translation cited throughout the Catechism of the Catholic Church (CCC), Magisterial encyclicals, and the Ignatius Catholic Study Bible.',
    description: 'Renowned for its theological fidelity and dignified English style; conforms closely to the liturgical Norms of Liturgiam Authenticam.',
    homeUrl: 'https://www.biblegateway.com/versions/Revised-Standard-Version-Catholic-Edition-RSVCE-Bible/',
    providerLabel: 'BibleGateway RSV-CE'
  },
  {
    id: 'jerusalem',
    acronym: 'JB / NJB',
    name: 'The Jerusalem Bible & New Jerusalem Bible',
    year: '1966 (JB) / 1985 (NJB) / 2019 (RNJB)',
    authority: 'École Biblique et Archéologique Française de Jérusalem',
    translationStyle: 'Dynamic Literary Equivalence with Scholarly Introductions',
    liturgicalUse: 'Traditional Lectionary text for Mass across England, Wales, Ireland, Australia, New Zealand, and much of Africa.',
    description: 'Born from Dominican biblical scholarship in Jerusalem (with J.R.R. Tolkien contributing as translator of Jonah), celebrated for its poetic cadence and deep theological notes.',
    homeUrl: 'https://www.catholic.org/bible/',
    providerLabel: 'Catholic.org Jerusalem Bible'
  },
  {
    id: 'rsv',
    acronym: 'RSV',
    name: 'Revised Standard Version (Complete with Deuterocanon / Apocrypha)',
    year: '1952 / 1977 Expanded',
    authority: 'Standard Bible Committee (Ecumenical Edition with Full Deuterocanon)',
    translationStyle: 'Formal Equivalence (Scholarly Reference)',
    liturgicalUse: 'Widely used in academic biblical theology, patristic cross-referencing, and ecumenical scripture study.',
    description: 'The foundational twentieth-century revision of the classic English biblical tradition, including all Deuterocanonical books.',
    homeUrl: 'https://www.biblegateway.com/versions/Revised-Standard-Version-RSV-Bible/',
    providerLabel: 'BibleGateway RSV'
  },
  {
    id: 'knox',
    acronym: 'KNOX',
    name: 'The Knox Translation of the Holy Bible',
    year: '1950',
    authority: 'Msgr. Ronald Knox / Hierarchy of England and Wales',
    translationStyle: 'Timeless Literary English from the Clementine Vulgate in light of Hebrew & Greek',
    liturgicalUse: 'Approved by Cardinal Bernard Griffin and Archbishop Richard Downey for Catholic liturgical and devotional reading.',
    description: 'Praised by Pope Pius XII and Archbishop Fulton Sheen as one of the most luminous English translations of the Latin Vulgate ever penned.',
    homeUrl: 'https://catholicbible.online/knox',
    providerLabel: 'CatholicBible.online (Side-by-Side)'
  },
  {
    id: 'novavulgata',
    acronym: 'NOVA VULGATA',
    name: 'Nova Vulgata — Bibliorum Sacrorum Editio Typica',
    year: '1979 (Pope St. John Paul II)',
    authority: 'Holy See (Apostolic Constitution Scripturarum Thesaurus)',
    translationStyle: 'Official Liturgical Latin of the Post-Conciliar Roman Rite',
    liturgicalUse: 'The official typical Latin edition promulgated by the Vatican as the standard for all modern vernacular liturgical translations.',
    description: 'Hosted directly by the Holy See on Vatican.va, harmonizing St. Jerome’s venerable Vulgate with critical editions of the Hebrew, Aramaic, and Greek originals.',
    homeUrl: 'https://www.vatican.va/archive/bible/nova_vulgata/documents/nova-vulgata_index_lt.html',
    providerLabel: 'Vatican.va Official Archive'
  }
];

const USCCB_BOOK_SLUGS: Record<string, string> = {
  GEN: 'genesis', EXO: 'exodus', LEV: 'leviticus', NUM: 'numbers', DEU: 'deuteronomy',
  JOS: 'joshua', JDG: 'judges', RUT: 'ruth', '1SA': '1samuel', '2SA': '2samuel',
  '1KI': '1kings', '2KI': '2kings', '1CH': '1chronicles', '2CH': '2chronicles',
  EZR: 'ezra', NEH: 'nehemiah', TOB: 'tobit', JDT: 'judith', EST: 'esther',
  '1MA': '1maccabees', '2MA': '2maccabees', JOB: 'job', PSA: 'psalms', PRO: 'proverbs',
  ECC: 'ecclesiastes', SNG: 'songofsongs', WIS: 'wisdom', SIR: 'sirach',
  ISA: 'isaiah', JER: 'jeremiah', LAM: 'lamentations', BAR: 'baruch', EZK: 'ezekiel',
  DAN: 'daniel', HOS: 'hosea', JOL: 'joel', AMO: 'amos', OBA: 'obadiah',
  JON: 'jonah', MIC: 'micah', NAH: 'nahum', HAB: 'habakkuk', ZEP: 'zephaniah',
  HAG: 'haggai', ZEC: 'zechariah', MAL: 'malachi',
  MAT: 'matthew', MRK: 'mark', LUK: 'luke', JHN: 'john', ACT: 'acts',
  ROM: 'romans', '1CO': '1corinthians', '2CO': '2corinthians', GAL: 'galatians',
  EPH: 'ephesians', PHP: 'philippians', COL: 'colossians', '1TH': '1thessalonians',
  '2TH': '2thessalonians', '1TI': '1timothy', '2TI': '2timothy', TIT: 'titus',
  PHM: 'philemon', HEB: 'hebrews', JAS: 'james', '1PE': '1peter', '2PE': '2peter',
  '1JN': '1john', '2JN': '2john', '3JN': '3john', JUD: 'jude', REV: 'revelation'
};

export function getModernBibleChapterUrl(
  editionId: ModernCatholicBibleEdition['id'],
  book: CatholicBibleBook,
  chapter: number,
  sourcePreference: 'primary' | 'biblegateway' = 'primary'
): string {
  const queryPassage = encodeURIComponent(`${book.name} ${chapter}`);

  if (editionId === 'nabre') {
    if (sourcePreference === 'biblegateway') {
      return `https://www.biblegateway.com/passage/?search=${queryPassage}&version=NABRE`;
    }
    const slug = USCCB_BOOK_SLUGS[book.id] || book.cpdvSlug;
    return `https://bible.usccb.org/bible/${slug}/${chapter}`;
  }

  if (editionId === 'esvce') {
    return `https://www.biblegateway.com/passage/?search=${queryPassage}&version=ESVCE`;
  }

  if (editionId === 'rsvce') {
    return `https://www.biblegateway.com/passage/?search=${queryPassage}&version=RSVCE`;
  }

  if (editionId === 'rsv') {
    return `https://www.biblegateway.com/passage/?search=${queryPassage}&version=RSV`;
  }

  if (editionId === 'jerusalem') {
    if (sourcePreference === 'biblegateway') {
      return `https://www.catholic.org/bible/book.php?id=${book.number}&bible_chapter=${chapter}`;
    }
    return `https://www.catholic.org/bible/book.php?id=${book.number}&bible_chapter=${chapter}`;
  }

  if (editionId === 'knox') {
    const testamentPath = book.testament === 'OT' ? 'OT' : 'NT';
    return `https://catholicbible.online/knox/${testamentPath}/${book.abbrev.replace(/\s+/g, '_')}/${chapter}`;
  }

  if (editionId === 'novavulgata') {
    return 'https://www.vatican.va/archive/bible/nova_vulgata/documents/nova-vulgata_index_lt.html';
  }

  return `https://www.biblegateway.com/passage/?search=${queryPassage}&version=RSVCE`;
}

