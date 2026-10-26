import { LiturgicalColor, LiturgicalDayInfo } from '../types';

export interface MonthCalendarData {
  year: number;
  month: number; // 0-11
  days: LiturgicalDayInfo[];
}

export const LITURGICAL_COLORS_INFO: Record<LiturgicalColor, { name: string; hex: string; bgClass: string; textClass: string; borderClass: string; meaning: string }> = {
  green: {
    name: 'Green',
    hex: '#15803d',
    bgClass: 'bg-emerald-800 text-white',
    textClass: 'text-emerald-700',
    borderClass: 'border-emerald-700',
    meaning: 'Symbol of spiritual growth, life, and hope in Ordinary Time.'
  },
  white: {
    name: 'White / Gold',
    hex: '#eab308',
    bgClass: 'bg-amber-100 text-amber-950 border border-amber-300',
    textClass: 'text-amber-700',
    borderClass: 'border-amber-400',
    meaning: 'Symbol of light, divine majesty, joy, purity, and resurrection; used on Solemnities, Feasts of the Lord, Mary, and non-martyred Saints.'
  },
  red: {
    name: 'Red',
    hex: '#b91c1c',
    bgClass: 'bg-red-800 text-white',
    textClass: 'text-red-700',
    borderClass: 'border-red-700',
    meaning: 'Symbol of the blood of Christ, passion of the Martyrs, and the fire of the Holy Spirit on Pentecost.'
  },
  violet: {
    name: 'Violet',
    hex: '#6b21a8',
    bgClass: 'bg-purple-900 text-white',
    textClass: 'text-purple-700',
    borderClass: 'border-purple-700',
    meaning: 'Symbol of penance, sorrow, and solemn anticipation in Advent and Lent.'
  },
  rose: {
    name: 'Rose',
    hex: '#be185d',
    bgClass: 'bg-rose-600 text-white',
    textClass: 'text-rose-700',
    borderClass: 'border-rose-400',
    meaning: 'Symbol of anticipated joy on Gaudete Sunday (Advent III) and Laetare Sunday (Lent IV).'
  },
  black: {
    name: 'Black',
    hex: '#1f2937',
    bgClass: 'bg-stone-900 text-white',
    textClass: 'text-stone-800',
    borderClass: 'border-stone-800',
    meaning: 'Symbol of mourning and Christian hope for the faithful departed on All Souls Day (Nov 2) and Requiems.'
  }
};

// Known feast days and historical Catholic events for every single day in October
export const KNOWN_OCTOBER_DAYS: Record<number, Partial<LiturgicalDayInfo>> = {
  1: { 
    title: 'Memorial of St. Thérèse of the Child Jesus, Doctor of the Church', 
    rank: 'Memorial', 
    color: 'white', 
    saintName: 'St. Thérèse of Lisieux',
    historicalEvent: {
      year: '1997 AD',
      title: 'Proclamation of St. Thérèse as Doctor of the Church',
      description: 'Pope St. John Paul II declared St. Thérèse of Lisieux the 33rd Doctor of the Universal Church, affirming the sublime theological depth of her "Little Way" of spiritual childhood.',
      significance: 'Youngest Doctor of the Church, showing holiness is accessible to every humble soul.'
    }
  },
  2: { 
    title: 'Memorial of the Holy Guardian Angels', 
    rank: 'Memorial', 
    color: 'white', 
    saintName: 'The Holy Guardian Angels',
    historicalEvent: {
      year: '1608 AD',
      title: 'Universal Institution of the Feast of Guardian Angels',
      description: 'Pope Paul V officially added the Feast of the Holy Guardian Angels to the General Roman Calendar, honoring the celestial protectors appointed to every soul.',
      significance: 'Affirming biblical teaching (Mt 18:10) that each Christian is accompanied by an angelic minister of God.'
    }
  },
  3: { 
    title: 'Saturday of the Twenty-Sixth Week in Ordinary Time', 
    rank: 'Weekday', 
    color: 'green',
    historicalEvent: {
      year: '1226 AD',
      title: 'Transitus of Saint Francis of Assisi',
      description: 'On the evening of October 3, 1226, Saint Francis of Assisi died at the Portiuncula surrounded by his friars, welcoming "Sister Death" while chanting Psalm 141.',
      significance: 'Founder of the Franciscan Order and first recorded stigmatist in Church history.'
    }
  },
  4: { 
    title: 'Twenty-Seventh Sunday in Ordinary Time (or St. Francis of Assisi)', 
    rank: 'Sunday', 
    color: 'green', 
    saintName: 'St. Francis of Assisi',
    historicalEvent: {
      year: '1582 AD',
      title: 'Promulgation of the Gregorian Calendar',
      description: 'Pope Gregory XIII implemented the Gregorian Calendar to accurately restore the celebration of Easter to the vernal equinox as decreed by the Council of Nicaea.',
      significance: 'The global standard civil calendar was created and calculated by Catholic Jesuit astronomers.'
    }
  },
  5: { 
    title: 'Monday of the Twenty-Seventh Week in Ordinary Time (or St. Faustina Kowalska)', 
    rank: 'Weekday', 
    color: 'green', 
    saintName: 'St. Maria Faustina Kowalska',
    historicalEvent: {
      year: '1938 AD',
      title: 'Death of Saint Faustina Kowalska',
      description: 'Sister Faustina passed into eternal life at age 33 in Krakow, Poland, having recorded the words of Jesus Christ for the worldwide Divine Mercy devotion in her spiritual Diary.',
      significance: 'Christ\'s message of infinite mercy prepared the Church for World War II and the modern era.'
    }
  },
  6: { 
    title: 'Optional Memorial of St. Bruno, Priest', 
    rank: 'Optional Memorial', 
    color: 'green', 
    saintName: 'St. Bruno',
    historicalEvent: {
      year: '1084 AD',
      title: 'Foundation of the Carthusian Order',
      description: 'Saint Bruno and six companions settled in the valley of the Grande Chartreuse in the French Alps, founding the Carthusian Order dedicated to silent contemplation and perpetual prayer.',
      significance: 'The only monastic order that has "never been reformed because it never deformed".'
    }
  },
  7: { 
    title: 'Memorial of Our Lady of the Rosary', 
    rank: 'Memorial', 
    color: 'white', 
    saintName: 'Our Lady of the Rosary',
    historicalEvent: {
      year: '1571 AD',
      title: 'The Miraculous Victory of Lepanto',
      description: 'The Christian fleet of the Holy League defeated the mighty Ottoman Turkish navy in the Gulf of Patras, saving Christian Europe from conquest while Pope St. Pius V and the faithful throughout Europe prayed the Holy Rosary.',
      significance: 'Pope St. Pius V established this feast day in thanksgiving to Our Lady, Help of Christians.'
    }
  },
  8: { 
    title: 'Thursday of the Twenty-Seventh Week in Ordinary Time', 
    rank: 'Weekday', 
    color: 'green',
    historicalEvent: {
      year: '451 AD',
      title: 'Opening of the Fourth Ecumenical Council of Chalcedon',
      description: 'Over 500 Catholic bishops convened to define the Hypostatic Union against Monophysitism, declaring Christ is one Divine Person in two natures, divine and human, without confusion or division.',
      significance: 'The bishops famously cried out upon hearing Pope St. Leo\'s Tome: "Peter has spoken through Leo!"'
    }
  },
  9: { 
    title: 'Optional Memorial of St. Denis and Companions, or St. John Leonardi', 
    rank: 'Optional Memorial', 
    color: 'green', 
    saintName: 'St. Denis',
    historicalEvent: {
      year: '1845 AD',
      title: 'Conversion of St. John Henry Newman',
      description: 'John Henry Newman was received into the Catholic Church at Littlemore by Blessed Dominic Barberi, Passionist priest, completing his spiritual journey from the Oxford Movement.',
      significance: 'One of the most consequential conversions in English Church history.'
    }
  },
  10: { 
    title: 'Saturday of the Twenty-Seventh Week in Ordinary Time', 
    rank: 'Weekday', 
    color: 'green',
    historicalEvent: {
      year: '732 AD',
      title: 'The Battle of Tours (Poitiers)',
      description: 'Charles Martel and Frankish infantry halted the Umayyad caliphate\'s advance into Western Europe, preserving the Christian foundations of medieval Europe.',
      significance: 'Decisive military defense of Christendom.'
    }
  },
  11: { 
    title: 'Twenty-Eighth Sunday in Ordinary Time (or St. John XXIII, Pope)', 
    rank: 'Sunday', 
    color: 'green', 
    saintName: 'St. John XXIII',
    historicalEvent: {
      year: '1962 AD',
      title: 'Opening of the Second Vatican Ecumenical Council',
      description: 'Pope St. John XXIII solemnly opened the Second Vatican Council in Saint Peter\'s Basilica with the historic address "Gaudet Mater Ecclesia" (Rejoice, O Mother Church).',
      significance: 'The 21st Ecumenical Council of the Catholic Church.'
    }
  },
  12: { 
    title: 'Monday of the Twenty-Eighth Week in Ordinary Time', 
    rank: 'Weekday', 
    color: 'green',
    historicalEvent: {
      year: '1492 AD',
      title: 'Arrival of the Catholic Faith in the Americas',
      description: 'Christopher Columbus and Catholic crew members made landfall in the Americas, planting the Holy Cross and dedicating the first island as "San Salvador" (Holy Savior).',
      significance: 'Beginning of the evangelization of the Western Hemisphere.'
    }
  },
  13: { 
    title: 'Tuesday of the Twenty-Eighth Week in Ordinary Time', 
    rank: 'Weekday', 
    color: 'green',
    historicalEvent: {
      year: '1917 AD',
      title: 'The Miracle of the Sun at Fátima, Portugal',
      description: 'Over 70,000 people, including secular journalists and skeptics, witnessed the sun dance and plummet toward earth at the Cova da Iria, validating the apparitions of Our Lady of Fátima.',
      significance: 'Greatest publicly witnessed modern miracle in Church history.'
    }
  },
  14: { 
    title: 'Optional Memorial of St. Callistus I, Pope and Martyr', 
    rank: 'Optional Memorial', 
    color: 'red', 
    saintName: 'St. Callistus I',
    historicalEvent: {
      year: '222 AD',
      title: 'Martyrdom of Pope Saint Callistus I',
      description: 'Pope Callistus I, who had been an enslaved worker in the mines before his ordination, reorganized the Catacombs of St. Callixtus along the Appian Way before suffering martyrdom in Trastevere.',
      significance: 'Built the first official burial place of the early Popes.'
    }
  },
  15: { 
    title: 'Memorial of St. Teresa of Jesus (of Ávila), Doctor of the Church', 
    rank: 'Memorial', 
    color: 'white', 
    saintName: 'St. Teresa of Ávila',
    historicalEvent: {
      year: '1582 AD',
      title: 'Death of Saint Teresa of Ávila during the Calendar Reform',
      description: 'Saint Teresa died on the night between October 4 and October 15, 1582—the exact night the papal calendar jumped 10 days to correct the solar drift.',
      significance: 'Foundress of the Discalced Carmelites and first woman proclaimed a Doctor of the Church.'
    }
  },
  16: { 
    title: 'Memorial of St. Margaret Mary Alacoque, Virgin / St. Hedwig, Religious', 
    rank: 'Memorial', 
    color: 'white', 
    saintName: 'St. Margaret Mary Alacoque',
    historicalEvent: {
      year: '1978 AD',
      title: 'Election of Cardinal Karol Wojtyła as Pope Saint John Paul II',
      description: 'White smoke rose over the Sistine Chapel as the College of Cardinals elected the Archbishop of Krakow as the 264th Bishop of Rome—the first Slavic Pope in history.',
      significance: 'A 26-year pontificate that defeated totalitarian communism and published the Catechism.'
    }
  },
  17: { 
    title: 'Memorial of St. Ignatius of Antioch, Bishop and Martyr', 
    rank: 'Memorial', 
    color: 'red', 
    saintName: 'St. Ignatius of Antioch',
    historicalEvent: {
      year: '108 AD',
      title: 'Martyrdom of Saint Ignatius in the Colosseum',
      description: 'The third Bishop of Antioch was thrown to wild beasts in Rome under Emperor Trajan, having written the immortal words: "I am the wheat of God, ground by the teeth of wild beasts."',
      significance: 'First Christian writer to use the term "Catholic Church" (Katholike Ekklesia).'
    }
  },
  18: { 
    title: 'Feast of St. Luke the Evangelist', 
    rank: 'Feast', 
    color: 'red', 
    saintName: 'St. Luke',
    historicalEvent: {
      year: '1598 AD',
      title: 'Translation of St. Luke\'s Relics',
      description: 'The sacred relics of the Holy Evangelist Luke were solemnly enshrined in the Basilica of Santa Giustina in Padua, Italy, where pilgrims venerate them to this day.',
      significance: 'Author of the Gospel of Divine Mercy and the Acts of the Apostles.'
    }
  },
  19: { 
    title: 'Memorial of Sts. John de Brébeuf and Isaac Jogues, Martyrs', 
    rank: 'Memorial', 
    color: 'red', 
    saintName: 'North American Martyrs',
    historicalEvent: {
      year: '1646 AD',
      title: 'Martyrdom of Saint Isaac Jogues',
      description: 'Jesuit missionary priest Isaac Jogues, who had previously been tortured and had his fingers severed, returned courageously to present-day Auriesville, New York, where he was martyred for Christ.',
      significance: 'First canonized Catholic martyrs of North America.'
    }
  },
  20: { 
    title: 'Optional Memorial of St. Paul of the Cross, Priest', 
    rank: 'Optional Memorial', 
    color: 'green', 
    saintName: 'St. Paul of the Cross',
    historicalEvent: {
      year: '1959 AD',
      title: 'Consecration of the National Shrine in Washington, D.C.',
      description: 'The Upper Church of the Basilica of the National Shrine of the Immaculate Conception in Washington, D.C., was solemnly dedicated to the Patroness of the United States.',
      significance: 'The largest Roman Catholic church in North America.'
    }
  },
  21: { 
    title: 'Wednesday of the Twenty-Ninth Week in Ordinary Time', 
    rank: 'Weekday', 
    color: 'green',
    historicalEvent: {
      year: '383 AD',
      title: 'Veneration of Saint Ursula and Companions',
      description: 'Early Christian martyrs who refused to renounce their faith or chastity under Hun invaders were commemorated in ancient Cologne with the building of a grand basilica.',
      significance: 'Patronesses of holy education and young women.'
    }
  },
  22: { 
    title: 'Optional Memorial of St. John Paul II, Pope', 
    rank: 'Optional Memorial', 
    color: 'white', 
    saintName: 'St. John Paul II',
    historicalEvent: {
      year: '1978 AD',
      title: 'Inauguration of the Pontificate of St. John Paul II',
      description: 'Pope John Paul II formally inaugurated his Petrine ministry in St. Peter\'s Square, crying out to the nations: "Do not be afraid! Open wide the doors to Christ!"',
      significance: 'His chosen feast day commemorates this historic inaugural homily.'
    }
  },
  23: { 
    title: 'Optional Memorial of St. John of Capistrano, Priest', 
    rank: 'Optional Memorial', 
    color: 'green', 
    saintName: 'St. John of Capistrano',
    historicalEvent: {
      year: '1456 AD',
      title: 'Death of the "Soldier Priest" of Belgrade',
      description: 'Saint John of Capistrano died in Ilok after personally leading the crusade that lifted the Siege of Belgrade, holding aloft the Holy Name of Jesus.',
      significance: 'Defended Europe following the fall of Constantinople in 1453.'
    }
  },
  24: { 
    title: 'Optional Memorial of St. Anthony Mary Claret, Bishop', 
    rank: 'Optional Memorial', 
    color: 'green', 
    saintName: 'St. Anthony Mary Claret',
    historicalEvent: {
      year: '1260 AD',
      title: 'Consecration of Chartres Cathedral',
      description: 'The monumental Cathedral of Notre-Dame de Chartres, a pinnacle of High Gothic architecture holding the sacred Veil of the Virgin Mary, was consecrated in the presence of King St. Louis IX.',
      significance: 'Medieval masterwork expressing the theology of light and the City of God.'
    }
  },
  25: { 
    title: 'Thirtieth Sunday in Ordinary Time', 
    rank: 'Sunday', 
    color: 'green',
    historicalEvent: {
      year: '1415 AD',
      title: 'The Battle of Agincourt and St. Crispin\'s Mass',
      description: 'Catholic chaplains celebrated dawn Holy Mass before English soldiers under King Henry V on the feast of Saints Crispin and Crispinian.',
      significance: 'Historic battle commemorated with solemn prayers for the dead.'
    }
  },
  26: { 
    title: 'Monday of the Thirtieth Week in Ordinary Time', 
    rank: 'Weekday', 
    color: 'green',
    historicalEvent: {
      year: '97 AD',
      title: 'Accession of Pope Saint Evaristus',
      description: 'Saint Evaristus succeeded Saint Clement as the fifth Pope of the Catholic Church, establishing the division of Rome into parishes and appointing seven deacons to assist the Bishop.',
      significance: 'Early development of diocesan parish structures.'
    }
  },
  27: { 
    title: 'Tuesday of the Thirtieth Week in Ordinary Time', 
    rank: 'Weekday', 
    color: 'green',
    historicalEvent: {
      year: '312 AD',
      title: 'The Vision of the Cross: "In Hoc Signo Vinces"',
      description: 'On the eve of the Battle of the Milvian Bridge, Emperor Constantine looked into the sky and saw the luminous sign of the Cross with the words: "In this sign, conquer."',
      significance: 'Paved the way for the legal recognition of Christianity in the Roman Empire.'
    }
  },
  28: { 
    title: 'Feast of Sts. Simon and Jude, Apostles', 
    rank: 'Feast', 
    color: 'red', 
    saintName: 'Sts. Simon and Jude',
    historicalEvent: {
      year: '312 AD',
      title: 'Battle of the Milvian Bridge and Christian Liberty',
      description: 'Constantine defeated Maxentius under the Christian standard of the Chi-Rho (Labarum), ending two and a half centuries of brutal Roman persecutions against Catholics.',
      significance: 'Led directly to the Edict of Milan (313 AD) granting full religious freedom to the Church.'
    }
  },
  29: { 
    title: 'Thursday of the Thirtieth Week in Ordinary Time', 
    rank: 'Weekday', 
    color: 'green',
    historicalEvent: {
      year: '324 AD',
      title: 'Dedication of Saint John Lateran Basilica',
      description: 'Pope Saint Sylvester I dedicated the Archbasilica of the Most Holy Savior (St. John Lateran), the mother and head of all churches in Rome and the entire world (*Omnium Urbis et Orbis Ecclesiarum Mater et Caput*).',
      significance: 'The official cathedral seat of the Bishop of Rome.'
    }
  },
  30: { 
    title: 'Friday of the Thirtieth Week in Ordinary Time', 
    rank: 'Weekday', 
    color: 'green', 
    isFastingDay: true,
    historicalEvent: {
      year: '1311 AD',
      title: 'Opening of the Council of Vienne',
      description: 'Pope Clement V opened the 15th Ecumenical Council in southeastern France, which dealt with the dissolution of the Knights Templar and Catholic scholastic education in universities.',
      significance: 'Promoted chairs of Greek, Hebrew, and Arabic at major Catholic universities.'
    }
  },
  31: { 
    title: 'Vigil of All Saints (All Hallows\' Eve)', 
    rank: 'Weekday', 
    color: 'green',
    historicalEvent: {
      year: '1512 AD',
      title: 'Unveiling of Michelangelo\'s Sistine Chapel Ceiling',
      description: 'Pope Julius II celebrated Solemn Vespers in the Sistine Chapel on the Eve of All Saints to unveil Michelangelo\'s newly completed ceiling frescoes portraying Genesis and the ancestors of Christ.',
      significance: 'The greatest artistic synthesis of Catholic theology, human dignity, and salvation history.'
    }
  }
};

// Known feast days and historical Catholic events for every single day in November
export const KNOWN_NOVEMBER_DAYS: Record<number, Partial<LiturgicalDayInfo>> = {
  1: {
    title: 'Solemnity of All Saints',
    rank: 'Solemnity',
    color: 'white',
    isHolyDay: true,
    saintName: 'All Saints of God',
    historicalEvent: {
      year: '835 AD',
      title: 'Universal Extension of the Solemnity of All Saints',
      description: 'Pope Gregory IV, with the support of Emperor Louis the Pious, extended the celebration of All Saints on November 1 to the entire Frankish Empire and the Universal Church.',
      significance: 'Honoring all holy men and women who dwell in the Beatific Vision, both known and unknown.'
    }
  },
  2: {
    title: 'The Commemoration of All the Faithful Departed (All Souls\' Day)',
    rank: 'Feast',
    color: 'violet',
    saintName: 'Holy Souls in Purgatory',
    historicalEvent: {
      year: '998 AD',
      title: 'Institution of All Souls\' Day by Saint Odilo of Cluny',
      description: 'Saint Odilo, fifth Abbot of Cluny, decreed that all Cluniac monasteries offer special prayers, Psalms, and Holy Masses annually on November 2 for the relief of suffering souls in Purgatory.',
      significance: 'Promoted the Church Suffering devotion across Europe.'
    }
  },
  3: {
    title: 'Optional Memorial of St. Martin de Porres, Religious',
    rank: 'Optional Memorial',
    color: 'white',
    saintName: 'St. Martin de Porres',
    historicalEvent: {
      year: '1639 AD',
      title: 'Transitus of Saint Martin de Porres in Lima, Peru',
      description: 'The beloved Dominican lay brother, known for his miraculous healings, levitation, and tender care for the sick and poor of Lima, entered eternal life holding a crucifix.',
      significance: 'Patron of social justice, barbers, and racial harmony.'
    }
  },
  4: {
    title: 'Memorial of St. Charles Borromeo, Bishop',
    rank: 'Memorial',
    color: 'white',
    saintName: 'St. Charles Borromeo',
    historicalEvent: {
      year: '1584 AD',
      title: 'Death of Saint Charles Borromeo, Reformer of Milan',
      description: 'Archbishop of Milan and leading figure of the Council of Trent, St. Charles established diocesan seminaries, catechized over 40,000 children, and personally ministered to plague victims.',
      significance: 'Patron of seminarians and Catholic catechists.'
    }
  },
  5: {
    title: 'Feast of Saints Elizabeth and Zechariah',
    rank: 'Weekday',
    color: 'green',
    saintName: 'Sts. Elizabeth and Zechariah',
    historicalEvent: {
      year: '1st Century AD',
      title: 'The Visitation and the Chant of the Magnificat',
      description: 'Saint Elizabeth, filled with the Holy Spirit upon hearing Mary\'s greeting, proclaimed: "Blessed art thou among women, and blessed is the fruit of thy womb!"',
      significance: 'Parents of St. John the Baptist and figures of the Dawn of Salvation.'
    }
  },
  6: {
    title: 'Memorial of All Saints of Ireland / St. Illtud',
    rank: 'Weekday',
    color: 'green',
    saintName: 'All Saints of Ireland',
    historicalEvent: {
      year: '1921 AD',
      title: 'Approval of the Feast of All Saints of Ireland',
      description: 'Pope Benedict XV authorized the solemn commemoration of all holy Irish monks, martyrs, and virgins who evangelized Europe during the Early Middle Ages.',
      significance: 'Celebrating the "Island of Saints and Scholars".'
    }
  },
  7: {
    title: 'Optional Memorial of St. Willibrord, Bishop',
    rank: 'Optional Memorial',
    color: 'white',
    saintName: 'St. Willibrord',
    historicalEvent: {
      year: '739 AD',
      title: 'Death of Saint Willibrord, Apostle to the Frisians',
      description: 'Northumbrian Benedictine monk sent by Saint Egbert to convert the Frisian tribes (modern Netherlands), becoming first Bishop of Utrecht.',
      significance: 'Pioneer of Anglo-Saxon missionary expansions in Western Europe.'
    }
  },
  8: {
    title: 'Commemoration of Blessed John Duns Scotus, Priest',
    rank: 'Weekday',
    color: 'green',
    saintName: 'Blessed John Duns Scotus',
    historicalEvent: {
      year: '1308 AD',
      title: 'Theological Defense of the Immaculate Conception',
      description: 'Franciscan theologian Duns Scotus argued at the University of Paris that God preserved Mary from original sin in anticipation of Christ\'s merits (*Subtilis Doctor*).',
      significance: 'Laid the scholastic foundations for the dogma of the Immaculate Conception.'
    }
  },
  9: {
    title: 'Feast of the Dedication of the Lateran Basilica',
    rank: 'Feast',
    color: 'white',
    saintName: 'Dedication of the Archbasilica of St. John Lateran',
    historicalEvent: {
      year: '324 AD',
      title: 'Consecration of the Cathedral of Rome by Pope St. Sylvester I',
      description: 'Emperor Constantine gifted the Laterani palace to the Church, where Pope Sylvester dedicated the mother church of all Catholic Christendom (*Omnium Urbis et Orbis Ecclesiarum Mater et Caput*).',
      significance: 'Symbol of unity with the Cathedral Seat of the Successor of Saint Peter.'
    }
  },
  10: {
    title: 'Memorial of St. Leo the Great, Pope and Doctor of the Church',
    rank: 'Memorial',
    color: 'white',
    saintName: 'St. Leo the Great',
    historicalEvent: {
      year: '452 AD',
      title: 'Pope Saint Leo Confronts Attila the Hun',
      description: 'Pope Leo I rode out unarmed to Mantua to meet Attila the Hun, persuading the invader to turn back from destroying the city of Rome.',
      significance: 'Defended the Petrine primacy and defined Christ\'s two natures at Chalcedon.'
    }
  },
  11: {
    title: 'Memorial of St. Martin of Tours, Bishop',
    rank: 'Memorial',
    color: 'white',
    saintName: 'St. Martin of Tours',
    historicalEvent: {
      year: '397 AD',
      title: 'The Cloak of Saint Martin of Tours',
      description: 'As a Roman soldier at Amiens, Martin cut his military cloak in two to share with a freezing beggar. That night, Christ appeared to him wearing the half-cloak.',
      significance: 'First non-martyr saint venerated in the Western Church.'
    }
  },
  12: {
    title: 'Memorial of St. Josaphat, Bishop and Martyr',
    rank: 'Memorial',
    color: 'red',
    saintName: 'St. Josaphat Kuncevyč',
    historicalEvent: {
      year: '1623 AD',
      title: 'Martyrdom of Saint Josaphat for Church Unity',
      description: 'Ruthenian Catholic Archbishop of Polotsk was martyred in Vitebsk while striving to reunite Eastern Orthodox Christians with the See of Saint Peter.',
      significance: 'Patron saint of Christian ecumenism and Ukrainian Catholics.'
    }
  },
  13: {
    title: 'Memorial of St. Frances Xavier Cabrini, Virgin',
    rank: 'Memorial',
    color: 'white',
    saintName: 'St. Frances Xavier Cabrini',
    historicalEvent: {
      year: '1946 AD',
      title: 'Canonization of Mother Cabrini (First US Citizen Saint)',
      description: 'Pope Pius XII canonized Mother Cabrini, foundress of the Missionary Sisters of the Sacred Heart of Jesus, who established 67 orphanages, hospitals, and schools across North and South America.',
      significance: 'Patroness of immigrants and hospital administrators.'
    }
  },
  14: {
    title: 'Optional Memorial of St. Gertrude the Great, Virgin',
    rank: 'Optional Memorial',
    color: 'white',
    saintName: 'St. Gertrude the Great',
    historicalEvent: {
      year: '1302 AD',
      title: 'Mystical Visions of the Sacred Heart of Jesus',
      description: 'Benedictine nun Gertrude at Helfta recorded profound mystical revelations of the Sacred Heart centuries before St. Margaret Mary Alacoque.',
      significance: 'Pioneer of Sacred Heart devotion and patroness of mystic theologians.'
    }
  },
  15: {
    title: 'Optional Memorial of St. Albert the Great, Bishop and Doctor',
    rank: 'Optional Memorial',
    color: 'white',
    saintName: 'St. Albert the Great',
    historicalEvent: {
      year: '1280 AD',
      title: 'Death of Doctor Universalis in Cologne',
      description: 'Dominican friar Albertus Magnus, scientist, philosopher, and teacher of St. Thomas Aquinas, reconciled Aristotelian philosophy with Catholic theology.',
      significance: 'Patron saint of natural scientists and chemists.'
    }
  },
  16: {
    title: 'Optional Memorial of St. Margaret of Scotland / St. Gertrude',
    rank: 'Optional Memorial',
    color: 'white',
    saintName: 'St. Margaret of Scotland',
    historicalEvent: {
      year: '1093 AD',
      title: 'Death of Queen Saint Margaret of Scotland',
      description: 'Queen Margaret, mother of three Scottish kings, reformed the Church in Scotland, fed hundreds of poor daily, and promoted liturgical renewal.',
      significance: 'Patroness of Scotland and royal charity.'
    }
  },
  17: {
    title: 'Memorial of St. Elizabeth of Hungary, Religious',
    rank: 'Memorial',
    color: 'white',
    saintName: 'St. Elizabeth of Hungary',
    historicalEvent: {
      year: '1231 AD',
      title: 'Passing of Saint Elizabeth, Princess of Peace',
      description: 'Daughter of the King of Hungary and Franciscan tertiary who gave up royal wealth to build hospitals and personally care for leprosy patients.',
      significance: 'Patroness of Catholic Charities and secular Franciscans.'
    }
  },
  18: {
    title: 'Optional Memorial of Dedication of the Basilicas of Sts. Peter and Paul',
    rank: 'Optional Memorial',
    color: 'white',
    saintName: 'Saints Peter and Paul',
    historicalEvent: {
      year: '1626 AD',
      title: 'Solemn Consecration of the New Saint Peter\'s Basilica',
      description: 'Pope Urban VIII consecrated the grand new Renaissance-Baroque Basilica of St. Peter built over the tomb of the Prince of the Apostles.',
      significance: 'Honoring the two apostolic pillars of Rome.'
    }
  },
  19: {
    title: 'Weekday (or St. Agnes of Assisi)',
    rank: 'Weekday',
    color: 'green',
    saintName: 'St. Agnes of Assisi',
    historicalEvent: {
      year: '1253 AD',
      title: 'Transitus of Saint Agnes of Assisi',
      description: 'Younger sister of Saint Clare of Assisi who joined her at San Damiano, establishing Poor Clare convents across Northern Italy.',
      significance: 'Example of heroic virginity and monastic sisterhood.'
    }
  },
  20: {
    title: 'Weekday (or Blessed Solanus Casey / St. Edmund)',
    rank: 'Weekday',
    color: 'green',
    saintName: 'Blessed Solanus Casey',
    historicalEvent: {
      year: '2017 AD',
      title: 'Beatification of Blessed Solanus Casey in Detroit',
      description: 'Capuchin friar who served as a humble doorkeeper in Detroit and New York, renowned for thousands of miraculous healings and spiritual counsel.',
      significance: 'Patron of the downhearted and door-to-door charity.'
    }
  },
  21: {
    title: 'Memorial of the Presentation of the Blessed Virgin Mary',
    rank: 'Memorial',
    color: 'white',
    saintName: 'Presentation of Mary',
    historicalEvent: {
      year: '543 AD',
      title: 'Dedication of the New Church of Saint Mary in Jerusalem',
      description: 'Commemorating Mary\'s self-offering to God in the Temple of Jerusalem as a child, preparing her immaculate heart to become the Tabernacle of the Most High.',
      significance: 'Patronal feast of contemplative religious sisters.'
    }
  },
  22: {
    title: 'Memorial of St. Cecilia, Virgin and Martyr',
    rank: 'Memorial',
    color: 'red',
    saintName: 'St. Cecilia',
    historicalEvent: {
      year: '230 AD',
      title: 'Martyrdom and Sacred Song of Saint Cecilia',
      description: 'Roman noblewoman martyred for Christ who sang in her heart to the Lord during her wedding and execution, preserved incorrupt in her catacomb.',
      significance: 'Patroness of musicians, singers, and sacred liturgy.'
    }
  },
  23: {
    title: 'Optional Memorial of St. Clement I, Pope / Bl. Miguel Pro',
    rank: 'Optional Memorial',
    color: 'red',
    saintName: 'Blessed Miguel Agustín Pro',
    historicalEvent: {
      year: '1927 AD',
      title: 'Martyrdom of Blessed Miguel Pro in Mexico City',
      description: 'Mexican Jesuit priest executed without trial by firing squad, raising his arms in the form of a cross and crying: "¡Viva Cristo Rey!" (Long Live Christ the King!).',
      significance: 'Symbol of heroic resistance to religious persecution in Mexico.'
    }
  },
  24: {
    title: 'Memorial of St. Andrew Dũng-Lạc and Companions, Martyrs',
    rank: 'Memorial',
    color: 'red',
    saintName: 'Vietnamese Martyrs',
    historicalEvent: {
      year: '1839 AD',
      title: 'Martyrdom of Saint Andrew Dũng-Lạc',
      description: 'Vietnamese Catholic priest martyred alongside 117 companions (bishops, priests, catechists, and mothers) during brutal 19th-century persecutions in Indochina.',
      significance: 'Seed of the thriving Catholic Church in Vietnam.'
    }
  },
  25: {
    title: 'Optional Memorial of St. Catherine of Alexandria, Virgin and Martyr',
    rank: 'Optional Memorial',
    color: 'red',
    saintName: 'St. Catherine of Alexandria',
    historicalEvent: {
      year: '305 AD',
      title: 'Martyrdom of Saint Catherine of Alexandria',
      description: 'Scholarly noblewoman who refuted 50 pagan philosophers before Emperor Maxentius before her breaking wheel miraculously shattered.',
      significance: 'Patroness of philosophers, theologians, and female students.'
    }
  },
  26: {
    title: 'Thursday of 34th Week in Ordinary Time (or Thanksgiving Mass)',
    rank: 'Weekday',
    color: 'green',
    saintName: 'Saint John Berchmans',
    historicalEvent: {
      year: '1621 AD',
      title: 'First Catholic Mass of Thanksgiving in North America',
      description: 'Catholic pilgrims and native peoples gathered for Holy Mass and feast days in Spanish Florida and Maryland colonies to thank Almighty God.',
      significance: 'Eucharist means "Thanksgiving" in Greek.'
    }
  },
  27: {
    title: 'Feast of Our Lady of the Miraculous Medal',
    rank: 'Weekday',
    color: 'white',
    saintName: 'Our Lady of the Miraculous Medal',
    historicalEvent: {
      year: '1830 AD',
      title: 'Apparition of Our Lady to Saint Catherine Labouré',
      description: 'The Blessed Mother appeared in Paris revealing the design of the Miraculous Medal with the invocation: "O Mary, conceived without sin, pray for us who have recourse to thee."',
      significance: 'Paved the way for the dogma of the Immaculate Conception.'
    }
  },
  28: {
    title: 'Optional Memorial of St. Catherine Labouré',
    rank: 'Optional Memorial',
    color: 'white',
    saintName: 'St. Catherine Labouré',
    historicalEvent: {
      year: '1876 AD',
      title: 'Incorrupt Body of Saint Catherine Labouré',
      description: 'Daughter of Charity novice who received the Miraculous Medal. Her body remains perfectly incorrupt in the chapel at Rue du Bac, Paris.',
      significance: 'Model of silent humility and Marian devotion.'
    }
  },
  29: {
    title: 'FIRST SUNDAY OF ADVENT',
    rank: 'Sunday',
    color: 'violet',
    season: 'Advent',
    historicalEvent: {
      year: 'Liturgical Year B/C',
      title: 'Beginning of the Sacred Season of Advent',
      description: 'The Catholic Church begins a new Liturgical Year, lighting the first violet candle on the Advent Wreath in joyful, penitential expectation of Christ\'s Nativity.',
      significance: 'Season of holy vigilance, hope, and longing for the Second Coming.'
    }
  },
  30: {
    title: 'Feast of St. Andrew the Apostle',
    rank: 'Feast',
    color: 'red',
    saintName: 'St. Andrew the Apostle',
    historicalEvent: {
      year: '60 AD',
      title: 'Martyrdom of Saint Andrew on the Decussate Cross',
      description: 'The first-called Apostle (*Protokletos*), brother of Saint Peter, was crucified in Patras, Greece, on an X-shaped cross, preaching Christ to his last breath.',
      significance: 'Patron saint of Scotland, Greece, and the Ecumenical Patriarchate.'
    }
  }
};

// Known feast days and historical Catholic events for every single day in December
export const KNOWN_DECEMBER_DAYS: Record<number, Partial<LiturgicalDayInfo>> = {
  1: {
    title: 'Tuesday of the First Week of Advent / St. Edmund Campion',
    rank: 'Weekday',
    color: 'violet',
    saintName: 'St. Edmund Campion',
    historicalEvent: {
      year: '1581 AD',
      title: 'Martyrdom of Saint Edmund Campion at Tyburn',
      description: 'Jesuit priest and Oxford scholar martyred under Queen Elizabeth I for celebrating secret Holy Mass, declaring his famous "Campion\'s Brag" in defense of the Catholic Faith.',
      significance: 'Hero of the English Catholic Reformation.'
    }
  },
  2: {
    title: 'Wednesday of the First Week of Advent / Bl. Rafqa',
    rank: 'Weekday',
    color: 'violet',
    saintName: 'Blessed Rafqa Pietra Choboq Ar-Rayès',
    historicalEvent: {
      year: '1914 AD',
      title: 'Passing of Saint Rafqa of Lebanon',
      description: 'Lebanese Maronite nun who prayed to share in Christ\'s suffering, bearing blindness and severe illness with unceasing joy and prayer.',
      significance: 'Patroness of sick and suffering souls in the Middle East.'
    }
  },
  3: {
    title: 'Memorial of St. Francis Xavier, Priest',
    rank: 'Memorial',
    color: 'white',
    saintName: 'St. Francis Xavier',
    historicalEvent: {
      year: '1552 AD',
      title: 'Death of Saint Francis Xavier on Shangchuan Island',
      description: 'Co-founder of the Jesuits and "Apostle of the Indies" died at age 46 gazing toward mainland China, having baptized over 700,000 souls in India, Japan, and the East Indies.',
      significance: 'Patron saint of Catholic foreign missions.'
    }
  },
  4: {
    title: 'Optional Memorial of St. John Damascene, Priest and Doctor',
    rank: 'Optional Memorial',
    color: 'violet',
    saintName: 'St. John Damascene',
    historicalEvent: {
      year: '749 AD',
      title: 'Theological Defense of Sacred Icons',
      description: 'Syrian monk and Doctor of the Church who successfully defended the veneration of holy images against Iconoclasm, writing *On the Divine Images*.',
      significance: 'Last of the Greek Church Fathers.'
    }
  },
  5: {
    title: 'Saturday of the First Week of Advent / St. Sabas',
    rank: 'Weekday',
    color: 'violet',
    saintName: 'St. Sabas, Abbot',
    historicalEvent: {
      year: '532 AD',
      title: 'Foundation of the Great Laura of Saint Sabas',
      description: 'Desert monk who established the Mar Saba Monastery overlooking the Kidron Valley near Jerusalem, a stronghold of Orthodox and Catholic monasticism.',
      significance: 'Pioneer of Palestinian monasticism and liturgical offices.'
    }
  },
  6: {
    title: 'SECOND SUNDAY OF ADVENT (or St. Nicholas, Bishop)',
    rank: 'Sunday',
    color: 'violet',
    saintName: 'St. Nicholas of Myra',
    historicalEvent: {
      year: '343 AD',
      title: 'Feast of Saint Nicholas of Myra',
      description: 'Bishop of Myra in Lycia who defended the deity of Christ at Nicaea (325 AD) and secretly dropped gold coins down chimneys to save impoverished daughters.',
      significance: 'Origin of Saint Nicholas / Santa Claus charity.'
    }
  },
  7: {
    title: 'Memorial of St. Ambrose, Bishop and Doctor of the Church',
    rank: 'Memorial',
    color: 'white',
    saintName: 'St. Ambrose of Milan',
    historicalEvent: {
      year: '374 AD',
      title: 'Consolidation of Milan Cathedral and Conversion of Augustine',
      description: 'Governor of Milan acclaimed Bishop by public acclamation before he was even baptized, going on to convert St. Augustine through his preaching.',
      significance: 'One of the four Great Doctors of the Western Church.'
    }
  },
  8: {
    title: 'Solemnity of the Immaculate Conception of Mary',
    rank: 'Solemnity',
    color: 'white',
    isHolyDay: true,
    saintName: 'Blessed Virgin Mary, Immaculate',
    historicalEvent: {
      year: '1854 AD',
      title: 'Dogmatic Definition of the Immaculate Conception',
      description: 'Pope Pius IX solemnly defined in *Ineffabilis Deus* that Mary was preserved exempt from all stain of original sin from the first instant of her conception by a singular grace of God.',
      significance: 'Patronal Feast of the United States, Philippines, and Spain.'
    }
  },
  9: {
    title: 'Optional Memorial of St. Juan Diego Cuauhtlatoatzin',
    rank: 'Optional Memorial',
    color: 'white',
    saintName: 'St. Juan Diego',
    historicalEvent: {
      year: '1531 AD',
      title: 'Apparition of Our Lady of Guadalupe at Tepeyac',
      description: 'Indigenous Mexican peasant Juan Diego heard celestial music on Tepeyac Hill as Mary appeared to him, leaving her miraculous image on his tilma.',
      significance: 'First indigenous saint of the Americas.'
    }
  },
  10: {
    title: 'Optional Memorial of Our Lady of Loreto',
    rank: 'Optional Memorial',
    color: 'white',
    saintName: 'Our Lady of Loreto',
    historicalEvent: {
      year: '1294 AD',
      title: 'Arrival of the Holy House of Nazareth in Loreto',
      description: 'The ancient stone walls of the Holy House of the Annunciation in Nazareth were translated to Loreto, Italy, where saints and popes have prayed for centuries.',
      significance: 'Patroness of aviators and Christian homes.'
    }
  },
  11: {
    title: 'Optional Memorial of St. Damasus I, Pope',
    rank: 'Optional Memorial',
    color: 'violet',
    saintName: 'St. Damasus I',
    historicalEvent: {
      year: '384 AD',
      title: 'Commissioning of the Latin Vulgate Bible',
      description: 'Pope Damasus I instructed his secretary Saint Jerome to produce an accurate Latin translation of the Holy Scriptures from Hebrew and Greek manuscripts.',
      significance: 'Established the official Latin Vulgate of the Catholic Church.'
    }
  },
  12: {
    title: 'Feast of Our Lady of Guadalupe',
    rank: 'Feast',
    color: 'white',
    saintName: 'Our Lady of Guadalupe',
    historicalEvent: {
      year: '1531 AD',
      title: 'Unfolding of Castilian Roses and Tilma Miraculous Image',
      description: 'Juan Diego opened his tilma before Bishop Zumárraga; Castilian roses tumbled out, revealing the radiant image of Our Lady imprinted onto the cactus fibers.',
      significance: 'Patroness of the Americas, the Philippines, and Protectress of Unborn Children.'
    }
  },
  13: {
    title: 'THIRD SUNDAY OF ADVENT (Gaudete Sunday) / St. Lucy',
    rank: 'Sunday',
    color: 'rose',
    saintName: 'St. Lucy, Virgin and Martyr',
    historicalEvent: {
      year: '304 AD',
      title: 'Gaudete Sunday Rose Vestments and St. Lucy of Syracuse',
      description: 'The Church wears Rose vestments signaling anticipated joy ("Gaudete in Domino semper"). Commemorating St. Lucy, virgin martyr whose name means "Light".',
      significance: 'Midpoint of Advent anticipating Christ\'s birth.'
    }
  },
  14: {
    title: 'Memorial of St. John of the Cross, Priest and Doctor',
    rank: 'Memorial',
    color: 'white',
    saintName: 'St. John of the Cross',
    historicalEvent: {
      year: '1591 AD',
      title: 'Transitus of the Mystical Doctor in Úbeda',
      description: 'Carmelite friar, poet, and co-reformer with St. Teresa of Ávila, author of *Dark Night of the Soul* and *Ascent of Mount Carmel*.',
      significance: 'Doctor of Mystical Theology.'
    }
  },
  15: {
    title: 'Tuesday of the Third Week of Advent',
    rank: 'Weekday',
    color: 'violet',
    historicalEvent: {
      year: '1931 AD',
      title: 'Establishment of Vatican Radio by Pope Pius XI',
      description: 'Guglielmo Marconi constructed the first broadcast station for the Holy See, allowing the Pope\'s voice to reach Catholics globally.',
      significance: 'Beginning of Catholic global mass communications.'
    }
  },
  16: {
    title: 'Wednesday of 3rd Week of Advent / Start of Simbang Gabi',
    rank: 'Weekday',
    color: 'violet',
    historicalEvent: {
      year: '1587 AD',
      title: 'Origins of the 9-Day Dawn Simbang Gabi Masses',
      description: 'Pope Sixtus V granted permission for dawn Masses in the Philippines and Mexico in honor of the Blessed Virgin Mary leading to Christmas Eve.',
      significance: 'Cherished Filipino Catholic novena tradition.'
    }
  },
  17: {
    title: 'Late Advent Weekday — O Antiphon: O Sapientia (O Wisdom)',
    rank: 'Weekday',
    color: 'violet',
    historicalEvent: {
      year: '8th Century AD',
      title: 'First Great O Antiphon of Advent Vespers',
      description: 'The Church begins chanting the seven magnificent O Antiphons at Vespers: "O Sapientia" (O Wisdom, coming forth from the mouth of the Most High!).',
      significance: 'Direct Messianic titles invocations leading to Christmas.'
    }
  },
  18: {
    title: 'Late Advent Weekday — O Antiphon: O Adonai (O Lord)',
    rank: 'Weekday',
    color: 'violet',
    historicalEvent: {
      year: '8th Century AD',
      title: 'Second O Antiphon: O Adonai',
      description: 'Invoking Christ as the Ruler of the House of Israel who appeared to Moses in the burning bush: "Come and redeem us with outstretched arm!"',
      significance: 'Prophetic fulfillment of the Old Covenant.'
    }
  },
  19: {
    title: 'Late Advent Weekday — O Antiphon: O Radix Jesse (O Root of Jesse)',
    rank: 'Weekday',
    color: 'violet',
    historicalEvent: {
      year: '8th Century AD',
      title: 'Third O Antiphon: O Radix Jesse',
      description: 'Invoking Christ as the Root of Jesse standing as a sign for the nations: "Come to deliver us, do not delay!"',
      significance: 'Messianic lineage of King David.'
    }
  },
  20: {
    title: 'FOURTH SUNDAY OF ADVENT — O Antiphon: O Clavis David',
    rank: 'Sunday',
    color: 'violet',
    historicalEvent: {
      year: '8th Century AD',
      title: 'Fourth O Antiphon: O Clavis David (O Key of David)',
      description: 'Invoking Christ who opens what no man can shut: "Come and lead the captive from the prison house!"',
      significance: 'Final Sunday before the Nativity of the Lord.'
    }
  },
  21: {
    title: 'Late Advent Weekday — O Antiphon: O Oriens / St. Peter Canisius',
    rank: 'Weekday',
    color: 'violet',
    saintName: 'St. Peter Canisius',
    historicalEvent: {
      year: '1597 AD',
      title: 'Fifth O Antiphon: O Oriens (O Radiant Dawn)',
      description: 'Invoking Christ as the Sun of Justice and Eternal Light. Commemorating St. Peter Canisius, Jesuit Doctor of the Church who authored the Catholic Catechism in Germany.',
      significance: 'Second Apostle of Germany.'
    }
  },
  22: {
    title: 'Late Advent Weekday — O Antiphon: O Rex Gentium',
    rank: 'Weekday',
    color: 'violet',
    historicalEvent: {
      year: '8th Century AD',
      title: 'Sixth O Antiphon: O Rex Gentium (O King of Nations)',
      description: 'Invoking Christ as the King of Nations and Cornerstone of Humanity: "Come and save man whom You formed from the dust!"',
      significance: 'Universal reign of Christ over all peoples.'
    }
  },
  23: {
    title: 'Late Advent Weekday — O Antiphon: O Emmanuel / St. John of Kanty',
    rank: 'Weekday',
    color: 'violet',
    saintName: 'St. John of Kanty',
    historicalEvent: {
      year: '8th Century AD',
      title: 'Seventh O Antiphon: O Emmanuel (God With Us)',
      description: 'The final O Antiphon spelling backwards *ERO CRAS* ("I will be there tomorrow!"). Commemorating St. John of Kanty, Polish priest renowned for radical generosity.',
      significance: 'Immediate threshold of the Nativity.'
    }
  },
  24: {
    title: 'Vigil of the Nativity of the Lord (Christmas Eve)',
    rank: 'Weekday',
    color: 'violet',
    historicalEvent: {
      year: 'c. 1 BC',
      title: 'The Sacred Night of the Savior\'s Birth',
      description: 'Joseph and Mary arrived in Bethlehem, finding no room in the inn. In a quiet cave manger, Mary brought forth the Savior of the World while angels sang *Gloria in Excelsis Deo* to shepherds.',
      significance: 'Midnight Mass and Christmas Vigil.'
    }
  },
  25: {
    title: 'SOLEMNITY OF THE NATIVITY OF THE LORD (CHRISTMAS)',
    rank: 'Solemnity',
    color: 'white',
    isHolyDay: true,
    saintName: 'The Infant Jesus Christ',
    historicalEvent: {
      year: 'c. 1 AD',
      title: 'The Word Was Made Flesh and Dwelt Among Us',
      description: 'The Eternal Son of God took human flesh from the Virgin Mary in Bethlehem for the salvation of humanity (*Et Verbum caro factum est*).',
      significance: 'The Incarnation of God—center of human history.'
    }
  },
  26: {
    title: 'Feast of St. Stephen, the First Martyr',
    rank: 'Feast',
    color: 'red',
    saintName: 'St. Stephen',
    historicalEvent: {
      year: '34 AD',
      title: 'Martyrdom of Saint Stephen the Protomartyr',
      description: 'The first Christian deacon was stoned to death outside Jerusalem, gazing into heaven and praying for his executioners like Christ: "Lord, do not hold this sin against them."',
      significance: 'First martyr of the Catholic Church.'
    }
  },
  27: {
    title: 'Feast of St. John, Apostle and Evangelist',
    rank: 'Feast',
    color: 'white',
    saintName: 'St. John the Evangelist',
    historicalEvent: {
      year: '100 AD',
      title: 'Passing of the Beloved Disciple at Ephesus',
      description: 'Author of the Fourth Gospel, three Epistles, and the Book of Revelation, who reclined on the Sacred Heart of Jesus at the Last Supper and stood at the foot of the Cross.',
      significance: 'Patron of theologians, writers, and Marian devotions.'
    }
  },
  28: {
    title: 'Feast of the Holy Innocents, Martyrs',
    rank: 'Feast',
    color: 'red',
    saintName: 'The Holy Innocents',
    historicalEvent: {
      year: 'c. 1 BC',
      title: 'Martyrdom of the Infant Boys of Bethlehem',
      description: 'King Herod ordered the massacre of all male children two years old and under in Bethlehem in a futile attempt to destroy the newborn King of Kings.',
      significance: 'Patron saints of unborn children and babies.'
    }
  },
  29: {
    title: 'Fifth Day in Octave of Christmas / St. Thomas Becket',
    rank: 'Weekday',
    color: 'white',
    saintName: 'St. Thomas Becket',
    historicalEvent: {
      year: '1170 AD',
      title: 'Martyrdom of Saint Thomas Becket in Canterbury Cathedral',
      description: 'Archbishop of Canterbury assassinated at the altar by king\'s knights for defending the rights and freedoms of the Church, crying: "For the Name of Jesus and protection of the Church I am ready to embrace death."',
      significance: 'Symbol of Church freedom against state tyranny.'
    }
  },
  30: {
    title: 'Sixth Day in the Octave of Christmas / Holy Family Eve',
    rank: 'Weekday',
    color: 'white',
    historicalEvent: {
      year: '1904 AD',
      title: 'Pius X Decrees Frequent Holy Communion',
      description: 'Pope St. Pius X urged all Catholic faithful to receive Holy Communion daily and lowered the age of First Communion for children.',
      significance: 'Eucharistic renewal across the universal Church.'
    }
  },
  31: {
    title: 'Seventh Day in Octave of Christmas / Te Deum Mass',
    rank: 'Weekday',
    color: 'white',
    saintName: 'St. Sylvester I, Pope',
    historicalEvent: {
      year: '335 AD',
      title: 'Te Deum Thanksgiving Mass at Year\'s End',
      description: 'Catholics worldwide gather on New Year\'s Eve for Exposition of the Blessed Sacrament and solemn chanting of the *Te Deum* hymn of thanksgiving for graces received.',
      significance: 'Consecrating time and civil years to Almighty God.'
    }
  }
};

// Known feast days and historical Catholic events for every single day in January
export const KNOWN_JANUARY_DAYS: Record<number, Partial<LiturgicalDayInfo>> = {
  1: {
    title: 'Solemnity of Mary, the Holy Mother of God',
    rank: 'Solemnity',
    color: 'white',
    isHolyDay: true,
    saintName: 'Mary, Holy Mother of God',
    historicalEvent: {
      year: '431 AD',
      title: 'Dogmatic Proclamation of Mary as Theotokos at Ephesus',
      description: 'The Third Ecumenical Council of Ephesus declared Mary to be truly *Theotokos* (Mother of God), as Jesus Christ is one Divine Person with a true human nature.',
      significance: 'Octave Day of Christmas and World Day of Peace.'
    }
  },
  2: {
    title: 'Memorial of Sts. Basil the Great and Gregory Nazianzen',
    rank: 'Memorial',
    color: 'white',
    saintName: 'Sts. Basil and Gregory Nazianzen',
    historicalEvent: {
      year: '379 AD',
      title: 'Defenders of the Holy Spirit and the Trinity',
      description: 'Cappadocian Church Fathers and Doctors who formulated classical Catholic Trinitarian theology against the Arian heresy.',
      significance: 'Pillars of Eastern Christian monasticism and theology.'
    }
  },
  3: {
    title: 'Optional Memorial of the Most Holy Name of Jesus',
    rank: 'Optional Memorial',
    color: 'white',
    saintName: 'The Holy Name of Jesus',
    historicalEvent: {
      year: '1530 AD',
      title: 'Promotion of the Holy Name Monogram (IHS)',
      description: 'Saint Bernardino of Siena and Saint John of Capistrano promoted the public veneration of the Holy Name of Jesus (*IHS* monogram) across Europe.',
      significance: '"At the name of Jesus every knee should bow" (Phil 2:10).'
    }
  },
  4: {
    title: 'Memorial of St. Elizabeth Ann Seton, Religious',
    rank: 'Memorial',
    color: 'white',
    saintName: 'St. Elizabeth Ann Seton',
    historicalEvent: {
      year: '1821 AD',
      title: 'Passing of Saint Elizabeth Ann Seton in Emmitsburg',
      description: 'Episcopalian widow who converted to Catholicism, founded the Sisters of Charity of St. Joseph, and established the first free Catholic parochial school in the US.',
      significance: 'First native-born United States citizen canonized a Saint.'
    }
  },
  5: {
    title: 'Memorial of St. John Neumann, Bishop',
    rank: 'Memorial',
    color: 'white',
    saintName: 'St. John Neumann',
    historicalEvent: {
      year: '1860 AD',
      title: 'Pioneer of Catholic Parochial Schools in Philadelphia',
      description: 'Bohemian Redemptorist priest who became 4th Bishop of Philadelphia, building 89 Catholic churches and multiplying parochial schools from 2 to 100.',
      significance: 'First male US saint and organizer of 40-Hour Eucharistic Adoration.'
    }
  },
  6: {
    title: 'SOLEMNITY OF THE EPIPHANY OF THE LORD (Three Kings)',
    rank: 'Solemnity',
    color: 'white',
    isHolyDay: true,
    saintName: 'The Holy Magi',
    historicalEvent: {
      year: 'c. 1 AD',
      title: 'Adoration of the Magi in Bethlehem',
      description: 'Wise Men from the East guided by the miraculous Star brought gifts of gold, frankincense, and myrrh to the Infant King of Kings.',
      significance: 'Manifestation of Christ to the Gentile nations.'
    }
  },
  7: {
    title: 'Optional Memorial of St. Raymond of Peñafort, Priest',
    rank: 'Optional Memorial',
    color: 'white',
    saintName: 'St. Raymond of Peñafort',
    historicalEvent: {
      year: '1275 AD',
      title: 'Compilation of the Decretals of Gregory IX',
      description: 'Dominican friar and master general who compiled the first official collection of Catholic Canon Law (*Decretales Gregorii IX*) used for 700 years.',
      significance: 'Patron saint of Canon Lawyers.'
    }
  },
  8: {
    title: 'Weekday (or St. Severinus / St. Gudula)',
    rank: 'Weekday',
    color: 'green',
    saintName: 'St. Severinus of Noricum',
    historicalEvent: {
      year: '482 AD',
      title: 'Passing of Saint Severinus, Apostle to Noricum',
      description: 'Monk who evangelized the Danube provinces during the collapse of the Western Roman Empire, establishing monasteries and ransoming captives.',
      significance: 'Protector of refugees during barbarian invasions.'
    }
  },
  9: {
    title: 'Feast of the Black Nazarene (Manila) / St. Adrian',
    rank: 'Feast',
    color: 'red',
    saintName: 'Poong Itim na Nazareno',
    historicalEvent: {
      year: '1606 AD',
      title: 'Traslación of the Black Nazarene in Quiapo, Manila',
      description: 'Augustinian Recollects brought the life-sized dark wooden statue of Jesus carrying the Cross from Mexico to Manila, producing millions of miraculous healings.',
      significance: 'One of the largest religious processions in global Christianity.'
    }
  },
  10: {
    title: 'FEAST OF THE BAPTISM OF THE LORD',
    rank: 'Feast',
    color: 'white',
    historicalEvent: {
      year: 'c. 27 AD',
      title: 'Baptism of Jesus Christ in the Jordan River',
      description: 'Saint John the Baptist baptized Jesus as the Heavens opened, the Holy Spirit descended like a dove, and the Father proclaimed: "This is my beloved Son!"',
      significance: 'Conclusion of Christmas Season and inauguration of Christ\'s public ministry.'
    }
  },
  11: {
    title: 'Monday of the First Week in Ordinary Time',
    rank: 'Weekday',
    color: 'green',
    historicalEvent: {
      year: '529 AD',
      title: 'Passing of Saint Theodosius the Cenobiarch',
      description: 'Founder of organized communal monasticism in the Judean desert who housed over 400 monks of various languages in unity.',
      significance: 'Father of cenobitic monasticism in the East.'
    }
  },
  12: {
    title: 'Weekday (or St. Marguerite Bourgeoys, Virgin)',
    rank: 'Weekday',
    color: 'green',
    saintName: 'St. Marguerite Bourgeoys',
    historicalEvent: {
      year: '1700 AD',
      title: 'Founding of the Congregation of Notre Dame of Montreal',
      description: 'French Catholic sister who traveled to New France (Canada) to build the first uncloistered religious community educating French and indigenous girls.',
      significance: 'Mother of Catholic education in Canada.'
    }
  },
  13: {
    title: 'Optional Memorial of St. Hilary, Bishop and Doctor',
    rank: 'Optional Memorial',
    color: 'green',
    saintName: 'St. Hilary of Poitiers',
    historicalEvent: {
      year: '367 AD',
      title: 'Defense of the Nicene Creed Against Arianism',
      description: 'Bishop of Poitiers known as the "Hammer of the Arians" (*Malleus Arianorum*), who suffered exile for defending the divinity of Jesus Christ.',
      significance: 'Doctor of the Divinity of Christ.'
    }
  },
  14: {
    title: 'Weekday (or St. Felix of Nola, Priest)',
    rank: 'Weekday',
    color: 'green',
    saintName: 'St. Felix of Nola',
    historicalEvent: {
      year: '255 AD',
      title: 'Miraculous Escape of Saint Felix in the Catacombs',
      description: 'Confessor priest who escaped Decian persecutions when a spider rapidly spun a web over his hiding cave opening, fooling pursuers.',
      significance: 'Subject of Saint Paulinus of Nola\'s yearly poems.'
    }
  },
  15: {
    title: 'Weekday (or St. Paul the First Hermit)',
    rank: 'Weekday',
    color: 'green',
    saintName: 'St. Paul the First Hermit',
    historicalEvent: {
      year: '341 AD',
      title: 'Meeting of Saint Anthony the Great and Saint Paul the Hermit',
      description: '90-year-old Anthony walked into the Egyptian desert to meet 113-year-old Paul, who had lived in a palm cave fed daily by a raven bringing half a loaf of bread.',
      significance: 'First recorded Christian hermit in Church history.'
    }
  },
  16: {
    title: 'Weekday (or St. Berard and Companions, Franciscan Martyrs)',
    rank: 'Weekday',
    color: 'green',
    saintName: 'Franciscan First Martyrs',
    historicalEvent: {
      year: '1220 AD',
      title: 'Martyrdom of Saint Berard and Companions in Morocco',
      description: 'Five Franciscan friars sent by Saint Francis to preach in Morocco were martyred, inspiring young Anthony of Padua to join the Franciscans.',
      significance: 'First martyrs of the Franciscan Order.'
    }
  },
  17: {
    title: 'SOLEMNITY OF SANTO NIÑO (Philippines) / St. Anthony, Abbot',
    rank: 'Solemnity',
    color: 'white',
    saintName: 'Santo Niño de Cebú / St. Anthony',
    historicalEvent: {
      year: '1521 AD',
      title: 'Arrival of the Image of Santo Niño de Cebú',
      description: 'Ferdinand Magellan presented the miraculous image of the Holy Child Jesus (Santo Niño) to Queen Juana of Cebu upon her baptism.',
      significance: 'Cradle of Christian faith in the Philippines and Asia.'
    }
  },
  18: {
    title: 'Start of the Week of Prayer for Christian Unity',
    rank: 'Weekday',
    color: 'green',
    historicalEvent: {
      year: '1908 AD',
      title: 'Inauguration of the Octave of Christian Unity',
      description: 'Father Paul Wattson and Sister Lurana White initiated eight days of prayer between the Feast of the Chair of Peter (Jan 18) and Conversion of St. Paul (Jan 25).',
      significance: 'Universal Catholic movement for Christian reconciliation.'
    }
  },
  19: {
    title: 'Weekday (or St. Wulstan / St. Sebastian)',
    rank: 'Weekday',
    color: 'green',
    saintName: 'St. Wulstan of Worcester',
    historicalEvent: {
      year: '1095 AD',
      title: 'Passing of Saint Wulstan, Bishop of Worcester',
      description: 'Benedictine bishop who abolished the slave trade in Bristol and was the last surviving Anglo-Saxon bishop after the Norman Conquest.',
      significance: 'Patron saint of vegetarianism and opponents of slavery.'
    }
  },
  20: {
    title: 'Optional Memorial of St. Fabian, Pope / St. Sebastian',
    rank: 'Optional Memorial',
    color: 'red',
    saintName: 'St. Sebastian, Martyr',
    historicalEvent: {
      year: '288 AD',
      title: 'Martyrdom of Saint Sebastian under Diocletian',
      description: 'Captain of the Pretorian Guard who secretly encouraged imprisoned Christians before being shot with arrows and beaten for his faith.',
      significance: 'Patron saint of athletes, soldiers, and plague protection.'
    }
  },
  21: {
    title: 'Memorial of St. Agnes, Virgin and Martyr',
    rank: 'Memorial',
    color: 'red',
    saintName: 'St. Agnes of Rome',
    historicalEvent: {
      year: '304 AD',
      title: 'Martyrdom of 12-Year-Old Saint Agnes in Rome',
      description: 'Young Roman maiden who refused suitors to preserve her consecrated virginity for Christ, martyred under Diocletian with heroic serenity.',
      significance: 'Patroness of young girls, chastity, and victims of abuse.'
    }
  },
  22: {
    title: 'Day of Prayer for Legal Protection of Unborn Children',
    rank: 'Weekday',
    color: 'violet',
    isFastingDay: true,
    historicalEvent: {
      year: '1973 AD',
      title: 'Catholic Day of Penance and Prayer for Unborn Children',
      description: 'Bishops established a national day of prayer, fasting, and Eucharistic adoration for the restoration of legal protection for unborn human lives.',
      significance: 'Promoting the Gospel of Life (*Evangelium Vitae*).'
    }
  },
  23: {
    title: 'Optional Memorial of St. Marianne Cope, Virgin',
    rank: 'Optional Memorial',
    color: 'white',
    saintName: 'St. Marianne Cope',
    historicalEvent: {
      year: '1918 AD',
      title: 'Mission of Saint Marianne Cope to Molokai',
      description: 'Syracuse Franciscan sister who volunteered with six sisters to care for victims of Hansen\'s disease (leprosy) in Hawaii alongside Saint Damien.',
      significance: 'Patroness of lepers and healthcare workers.'
    }
  },
  24: {
    title: 'Memorial of St. Francis de Sales, Bishop and Doctor',
    rank: 'Memorial',
    color: 'white',
    saintName: 'St. Francis de Sales',
    historicalEvent: {
      year: '1622 AD',
      title: 'Passing of the Gentle Doctor of Love',
      description: 'Bishop of Geneva who converted 72,000 Calvinists through gentle pamphlets and wrote *Introduction to the Devout Life*, proving holiness is for all states of life.',
      significance: 'Patron saint of Catholic journalists, writers, and deaf people.'
    }
  },
  25: {
    title: 'Feast of the Conversion of Saint Paul the Apostle',
    rank: 'Feast',
    color: 'white',
    saintName: 'St. Paul the Apostle',
    historicalEvent: {
      year: '34 AD',
      title: 'The Road to Damascus Conversion of Saul of Tarsus',
      description: 'Saul was struck down by a blinding light as the Risen Christ asked: "Saul, Saul, why do you persecute Me?", transforming the persecutor into the Great Apostle to the Gentiles.',
      significance: 'Conclusion of the Week of Prayer for Christian Unity.'
    }
  },
  26: {
    title: 'Memorial of Sts. Timothy and Titus, Bishops',
    rank: 'Memorial',
    color: 'white',
    saintName: 'Sts. Timothy and Titus',
    historicalEvent: {
      year: '1st Century AD',
      title: 'Apostolic Companions of Saint Paul',
      description: 'Saint Timothy (first Bishop of Ephesus) and Saint Titus (first Bishop of Crete), faithful disciples who received Saint Paul\'s Pastoral Epistles.',
      significance: 'Models of apostolic succession and episcopal ministry.'
    }
  },
  27: {
    title: 'Optional Memorial of St. Angela Merici, Virgin',
    rank: 'Optional Memorial',
    color: 'white',
    saintName: 'St. Angela Merici',
    historicalEvent: {
      year: '1540 AD',
      title: 'Founding of the Company of Saint Ursula',
      description: 'Italian Franciscan tertiary who founded the Ursulines in Brescia, the first teaching order of women in Church history.',
      significance: 'Pioneer of Catholic women\'s education.'
    }
  },
  28: {
    title: 'Memorial of St. Thomas Aquinas, Priest and Doctor',
    rank: 'Memorial',
    color: 'white',
    saintName: 'St. Thomas Aquinas',
    historicalEvent: {
      year: '1274 AD',
      title: 'Translation of the Relics of Doctor Angelicus',
      description: 'Dominican friar, author of the *Summa Theologiae*, and composer of Eucharistic hymns (*Pange Lingua*, *Panis Angelicus*, *Adoro Te Devote*).',
      significance: 'Patron saint of Catholic schools, universities, and theologians.'
    }
  },
  29: {
    title: 'Weekday (or St. Gildas / Bl. Mutien-Marie)',
    rank: 'Weekday',
    color: 'green',
    saintName: 'Blessed Mutien-Marie Wiaux',
    historicalEvent: {
      year: '1917 AD',
      title: 'Passing of Brother Mutien-Marie ("The Praying Brother")',
      description: 'De La Salle Christian Brother in Belgium who spent 50 years teaching music and drawing, known as "the brother who prays always".',
      significance: 'Model of sanctification in hidden daily duties.'
    }
  },
  30: {
    title: 'Weekday (or St. Hyacintha Mariscotti)',
    rank: 'Weekday',
    color: 'green',
    saintName: 'St. Hyacintha Mariscotti',
    historicalEvent: {
      year: '1640 AD',
      title: 'Conversion and Sanctification of Saint Hyacintha',
      description: 'Franciscan Third Order nun who converted from worldly vanity to heroic penance and care for the sick and elderly in Viterbo.',
      significance: 'Patroness of repentant sinners.'
    }
  },
  31: {
    title: 'Memorial of St. John Bosco, Priest',
    rank: 'Memorial',
    color: 'white',
    saintName: 'St. John Bosco (Don Bosco)',
    historicalEvent: {
      year: '1888 AD',
      title: 'Passing of Don Bosco, Father and Teacher of Youth',
      description: 'Italian priest who founded the Salesians and Daughters of Mary Help of Christians, building oratories, trade schools, and homes for poor street youth of Turin.',
      significance: 'Patron saint of youth, apprentices, and Catholic publishers.'
    }
  }
};


// Complete Fixed General Roman Calendar for Months February (2) through September (9)
export const FIXED_ROMAN_FEASTS_FEB_TO_SEP: Record<string, Partial<LiturgicalDayInfo>> = {
  // FEBRUARY
  '02-02': {
    title: 'Feast of the Presentation of the Lord (Candlemas)',
    rank: 'Feast',
    color: 'white',
    saintName: 'Presentation of the Lord',
    historicalEvent: {
      year: 'c. 1 BC / 4th Century AD',
      title: 'The Presentation in the Temple and Blessing of Candles',
      description: 'Forty days after Christmas, Mary and Joseph presented the Child Jesus in the Temple, where righteous Simeon proclaimed Him "a Light of revelation to the Gentiles."',
      significance: 'Traditional blessing of liturgical candles for the whole year.'
    }
  },
  '02-03': {
    title: 'Optional Memorial of St. Blaise, Bishop and Martyr / St. Ansgar, Bishop',
    rank: 'Optional Memorial',
    color: 'red',
    saintName: 'St. Blaise of Sebaste',
    historicalEvent: {
      year: '316 AD',
      title: 'Martyrdom of Saint Blaise and the Blessing of Throats',
      description: 'Physician and Bishop of Sebaste in Armenia who miraculously saved a boy choking on a fishbone before suffering martyrdom under Licinius.',
      significance: 'Origin of the annual Catholic Blessing of Throats with crossed candles.'
    }
  },
  '02-05': {
    title: 'Memorial of St. Agatha, Virgin and Martyr',
    rank: 'Memorial',
    color: 'red',
    saintName: 'St. Agatha of Sicily',
    historicalEvent: {
      year: '251 AD',
      title: 'Martyrdom of Saint Agatha at Catania',
      description: 'Noble Sicilian virgin martyred during the Decian persecution for preserving her consecrated chastity; her name is inscribed in the Roman Canon of the Mass.',
      significance: 'One of the seven women saints commemorated by name in Eucharistic Prayer I.'
    }
  },
  '02-06': {
    title: 'Memorial of St. Paul Miki and Companions, Martyrs',
    rank: 'Memorial',
    color: 'red',
    saintName: 'St. Paul Miki and the Martyrs of Japan',
    historicalEvent: {
      year: '1597 AD',
      title: 'Crucifixion of the Twenty-Six Martyrs of Nagasaki',
      description: 'Japanese Jesuit brother Paul Miki preached forgiveness and the Gospel from his cross on Nishizaka Hill alongside twenty-five Franciscan and lay companions.',
      significance: 'Heroic witnesses who sustained the Hidden Christians of Japan for 250 years.'
    }
  },
  '02-08': {
    title: 'Optional Memorial of St. Josephine Bakhita, Virgin / St. Jerome Emiliani',
    rank: 'Optional Memorial',
    color: 'white',
    saintName: 'St. Josephine Bakhita',
    historicalEvent: {
      year: '1947 AD',
      title: 'Passing of Saint Josephine Bakhita in Schio, Italy',
      description: 'Kidnapped into slavery in Sudan as a child, she discovered Christ in Italy as a Canossian Sister, declaring she would kneel and kiss the hands of her former captors because they led her to Jesus.',
      significance: 'Patroness of Sudan and victims of human trafficking.'
    }
  },
  '02-10': {
    title: 'Memorial of St. Scholastica, Virgin',
    rank: 'Memorial',
    color: 'white',
    saintName: 'St. Scholastica',
    historicalEvent: {
      year: '543 AD',
      title: 'Last Colloquy of Saints Benedict and Scholastica',
      description: 'Twin sister of St. Benedict who prayed up a sudden thunderstorm so her brother could remain all night conversing on the joys of heaven; three days later Benedict saw her soul ascend as a dove.',
      significance: 'Mother of Benedictine nuns.'
    }
  },
  '02-11': {
    title: 'Optional Memorial of Our Lady of Lourdes',
    rank: 'Optional Memorial',
    color: 'white',
    saintName: 'Our Lady of Lourdes',
    historicalEvent: {
      year: '1858 AD',
      title: 'First Apparition of the Immaculate Conception at Massabielle',
      description: 'The Blessed Virgin Mary appeared eighteen times to fourteen-year-old St. Bernadette Soubirous in the grotto of Lourdes, France, revealing the miraculous healing spring.',
      significance: 'World Day of the Sick across the Universal Church.'
    }
  },
  '02-14': {
    title: 'Memorial of Sts. Cyril, Monk, and Methodius, Bishop (or St. Valentine)',
    rank: 'Memorial',
    color: 'white',
    saintName: 'Sts. Cyril and Methodius / St. Valentine',
    historicalEvent: {
      year: '869 AD',
      title: 'Evangelization of the Slavic Peoples',
      description: 'Greek missionary brothers from Thessalonica who devised the Glagolitic alphabet and translated the Sacred Scriptures and Liturgy into Old Church Slavonic.',
      significance: 'Apostles of the Slavs and Co-Patrons of Europe.'
    }
  },
  '02-21': {
    title: 'Optional Memorial of St. Peter Damian, Bishop and Doctor',
    rank: 'Optional Memorial',
    color: 'white',
    saintName: 'St. Peter Damian',
    historicalEvent: {
      year: '1072 AD',
      title: 'Gregorian Reform and Monastic Renewal',
      description: 'Camaldolese monk, Cardinal-Bishop of Ostia, and Doctor of the Church who spearheaded eleventh-century clerical reform and Eucharistic devotion.',
      significance: 'Great reformer of the medieval papacy and priesthood.'
    }
  },
  '02-22': {
    title: 'Feast of the Chair of St. Peter the Apostle',
    rank: 'Feast',
    color: 'white',
    saintName: 'Chair of St. Peter',
    historicalEvent: {
      year: '1st Century AD',
      title: 'Primacy of the Apostolic See of Peter',
      description: 'Celebrated in Rome since the fourth century as the liturgical sign of the mission of teaching and pastoral governance conferred by Christ upon Simon Peter: "You are Peter, and upon this rock I will build my Church."',
      significance: 'Feast of Catholic unity with the Successor of Peter.'
    }
  },
  '02-23': {
    title: 'Memorial of St. Polycarp, Bishop and Martyr',
    rank: 'Memorial',
    color: 'red',
    saintName: 'St. Polycarp of Smyrna',
    historicalEvent: {
      year: '155 AD',
      title: 'Martyrdom of Saint Polycarp in the Stadium of Smyrna',
      description: 'Direct disciple of St. John the Apostle who declared before the Roman proconsul: "Eighty and six years have I served Him, and He never did me any injury: how then can I blaspheme my King and my Savior?"',
      significance: 'Earliest preserved eyewitness account of Christian martyrdom outside the New Testament.'
    }
  },
  '02-27': {
    title: 'Optional Memorial of St. Gregory of Narek, Abbot and Doctor',
    rank: 'Optional Memorial',
    color: 'white',
    saintName: 'St. Gregory of Narek',
    historicalEvent: {
      year: '1003 AD',
      title: 'Composition of the Book of Lamentations',
      description: 'Armenian mystical monk and poet proclaimed the 36th Doctor of the Universal Church for his sublime prayers from the depths of the heart.',
      significance: 'Bridge of theological unity between East and West.'
    }
  },

  // MARCH
  '03-07': {
    title: 'Memorial of Sts. Perpetua and Felicity, Martyrs',
    rank: 'Memorial',
    color: 'red',
    saintName: 'Sts. Perpetua and Felicity',
    historicalEvent: {
      year: '203 AD',
      title: 'Martyrdom of Saints Perpetua and Felicity at Carthage',
      description: 'Young noblewoman Vibia Perpetua and her pregnant catechumen companion Felicity went hand-in-hand into the amphitheater of Carthage, giving the kiss of peace before the sword.',
      significance: 'Named in the Roman Canon; Perpetua\'s prison diary is the oldest surviving text by a Christian woman.'
    }
  },
  '03-08': {
    title: 'Optional Memorial of St. John of God, Religious',
    rank: 'Optional Memorial',
    color: 'white',
    saintName: 'St. John of God',
    historicalEvent: {
      year: '1550 AD',
      title: 'Founding of the Brothers Hospitallers in Granada',
      description: 'Converted by a sermon of St. John of Ávila, he dedicated his life to carrying the sick and destitute on his shoulders to his hospital in Granada.',
      significance: 'Patron saint of hospitals, nurses, and the sick.'
    }
  },
  '03-09': {
    title: 'Optional Memorial of St. Frances of Rome, Religious',
    rank: 'Optional Memorial',
    color: 'white',
    saintName: 'St. Frances of Rome',
    historicalEvent: {
      year: '1440 AD',
      title: 'Heroic Charity During the Roman Plague and Famine',
      description: 'Roman wife, mother, and mystic blessed with the visible presence of her Guardian Angel who founded the Oblates of Mary of Tor de\' Specchi.',
      significance: 'Patroness of Benedictine oblates, widows, and motorists.'
    }
  },
  '03-17': {
    title: 'Optional Memorial of St. Patrick, Bishop',
    rank: 'Optional Memorial',
    color: 'white',
    saintName: 'St. Patrick of Ireland',
    historicalEvent: {
      year: '461 AD',
      title: 'Evangelization of Ireland and the Paschal Fire at Slane',
      description: 'Kidnapped to Ireland as a youth, Patrick escaped and returned as missionary Bishop, converting the island to Christ and teaching the Mystery of the Most Holy Trinity.',
      significance: 'Apostle and Patron of Ireland.'
    }
  },
  '03-18': {
    title: 'Optional Memorial of St. Cyril of Jerusalem, Bishop and Doctor',
    rank: 'Optional Memorial',
    color: 'white',
    saintName: 'St. Cyril of Jerusalem',
    historicalEvent: {
      year: '386 AD',
      title: 'The Mystagogical Catecheses at the Holy Sepulchre',
      description: 'Bishop of Jerusalem who delivered the celebrated Catechetical Lectures explaining Baptism, Confirmation, and the Real Presence in the Holy Eucharist.',
      significance: 'Doctor of the Church and master of sacramental catechesis.'
    }
  },
  '03-19': {
    title: 'SOLEMNITY OF ST. JOSEPH, SPOUSE OF THE BLESSED VIRGIN MARY',
    rank: 'Solemnity',
    color: 'white',
    isHolyDay: true,
    saintName: 'St. Joseph, Spouse of Mary',
    historicalEvent: {
      year: '1870 AD',
      title: 'Proclamation of Saint Joseph as Patron of the Universal Church',
      description: 'Pope Pius IX declared Saint Joseph—foster-father of the Incarnate Word and chaste guardian of the Virgin—the Universal Patron and Protector of the Catholic Church.',
      significance: 'Model of fathers, workers, silent obedience, and a happy death.'
    }
  },
  '03-25': {
    title: 'SOLEMNITY OF THE ANNUNCIATION OF THE LORD',
    rank: 'Solemnity',
    color: 'white',
    saintName: 'Annunciation of the Lord',
    historicalEvent: {
      year: 'c. 1 BC',
      title: 'The Incarnation of the Eternal Word at Nazareth',
      description: 'The Archangel Gabriel announced to the Virgin Mary that she would conceive the Son of the Most High, and at her "Fiat" the Word became flesh and dwelt among us.',
      significance: 'Nine months before Christmas; solemn celebration of the Incarnation.'
    }
  },

  // APRIL
  '04-02': {
    title: 'Optional Memorial of St. Francis of Paola, Hermit',
    rank: 'Optional Memorial',
    color: 'white',
    saintName: 'St. Francis of Paola',
    historicalEvent: {
      year: '1507 AD',
      title: 'Founding of the Order of Minims',
      description: 'Calabrian hermit renowned for prophecy, miracles, and perpetual Lenten abstinence who founded the Order of Minims ("the least of the friars").',
      significance: 'Patron saint of seafarers and boatmen.'
    }
  },
  '04-04': {
    title: 'Optional Memorial of St. Isidore of Seville, Bishop and Doctor',
    rank: 'Optional Memorial',
    color: 'white',
    saintName: 'St. Isidore of Seville',
    historicalEvent: {
      year: '636 AD',
      title: 'Encyclopedic Preservation of Classical and Christian Learning',
      description: 'Archbishop of Seville and "Schoolmaster of the Middle Ages" whose twenty-volume *Etymologiae* preserved sacred and secular knowledge after the fall of Rome.',
      significance: 'Last of the Western Latin Fathers and patron of computer users and students.'
    }
  },
  '04-05': {
    title: 'Optional Memorial of St. Vincent Ferrer, Priest',
    rank: 'Optional Memorial',
    color: 'white',
    saintName: 'St. Vincent Ferrer',
    historicalEvent: {
      year: '1419 AD',
      title: 'Missionary Preaching and Healing of the Western Schism',
      description: 'Spanish Dominican friar known as the "Angel of the Judgment" who preached repentance across Europe and helped restore papal unity at Constance.',
      significance: 'One of the greatest missionary preachers in Church history.'
    }
  },
  '04-07': {
    title: 'Memorial of St. John Baptist de la Salle, Priest',
    rank: 'Memorial',
    color: 'white',
    saintName: 'St. John Baptist de la Salle',
    historicalEvent: {
      year: '1719 AD',
      title: 'Foundation of the Brothers of the Christian Schools',
      description: 'Canon of Reims who gave away his fortune to establish free schools for poor boys and pioneered modern classroom pedagogy and teacher training colleges.',
      significance: 'Universal Patron of all Teachers of Youth.'
    }
  },
  '04-11': {
    title: 'Memorial of St. Stanislaus, Bishop and Martyr',
    rank: 'Memorial',
    color: 'red',
    saintName: 'St. Stanislaus of Kraków',
    historicalEvent: {
      year: '1079 AD',
      title: 'Martyrdom of Saint Stanislaus at the Altar in Kraków',
      description: 'Bishop of Kraków who fearlessly rebuked King Bolesław II for tyranny and immorality and was slain by the king himself while celebrating Holy Mass.',
      significance: 'Principal Patron of Poland and defender of moral order.'
    }
  },
  '04-21': {
    title: 'Optional Memorial of St. Anselm, Bishop and Doctor',
    rank: 'Optional Memorial',
    color: 'white',
    saintName: 'St. Anselm of Canterbury',
    historicalEvent: {
      year: '1109 AD',
      title: 'Father of Scholasticism: Faith Seeking Understanding',
      description: 'Benedictine Abbot of Bec and Archbishop of Canterbury who authored *Proslogion* and *Cur Deus Homo* ("Why God Became Man").',
      significance: 'Formulated the motto of Catholic theology: *Fides quaerens intellectum*.'
    }
  },
  '04-25': {
    title: 'Feast of St. Mark, Evangelist',
    rank: 'Feast',
    color: 'red',
    saintName: 'St. Mark the Evangelist',
    historicalEvent: {
      year: 'c. 68 AD',
      title: 'Proclamation of the Second Gospel and Founding of Alexandria',
      description: 'Disciple and interpreter of St. Peter in Rome who wrote the earliest Gospel account and established the great Patriarchal See of Alexandria before his martyrdom.',
      significance: 'Symbolized by the Winged Lion; Patron of Venice and notaries.'
    }
  },
  '04-29': {
    title: 'Memorial of St. Catherine of Siena, Virgin and Doctor of the Church',
    rank: 'Memorial',
    color: 'white',
    saintName: 'St. Catherine of Siena',
    historicalEvent: {
      year: '1380 AD',
      title: 'Return of the Papacy from Avignon to Rome',
      description: 'Dominican tertiary, stigmatist, and mystic who persuaded Pope Gregory XI to return to Rome and dictated *The Dialogue of Divine Providence*.',
      significance: 'Doctor of the Church and Co-Patroness of Europe and Italy.'
    }
  },

  // MAY
  '05-01': {
    title: 'Optional Memorial of St. Joseph the Worker',
    rank: 'Optional Memorial',
    color: 'white',
    saintName: 'St. Joseph the Worker',
    historicalEvent: {
      year: '1955 AD',
      title: 'Institution of the Feast of Saint Joseph the Worker',
      description: 'Pope Pius XII instituted this feast on May 1 to sanctify human labor through the example of the Carpenter of Nazareth who worked alongside Jesus.',
      significance: 'Affirming the sacred dignity of work and workers.'
    }
  },
  '05-02': {
    title: 'Memorial of St. Athanasius, Bishop and Doctor of the Church',
    rank: 'Memorial',
    color: 'white',
    saintName: 'St. Athanasius of Alexandria',
    historicalEvent: {
      year: '373 AD',
      title: 'Athanasius Contra Mundum: Champion of Nicene Orthodoxy',
      description: 'Patriarch of Alexandria who suffered five exiles spanning seventeen years for defending the consubstantial divinity of Christ against the Arian heresy.',
      significance: 'Father of Orthodoxy and biographer of St. Anthony of the Desert.'
    }
  },
  '05-03': {
    title: 'Feast of Sts. Philip and James, Apostles',
    rank: 'Feast',
    color: 'red',
    saintName: 'Sts. Philip and James, Apostles',
    historicalEvent: {
      year: '560 AD',
      title: 'Enshrinement of the Relics of Apostles Philip and James in Rome',
      description: 'Commemorating Philip of Bethsaida (who heard Jesus say "Whoever has seen Me has seen the Father") and James the Less, first Bishop of Jerusalem and author of the Epistle of James.',
      significance: 'Enshrined together in the Basilica of the Twelve Holy Apostles in Rome.'
    }
  },
  '05-12': {
    title: 'Optional Memorial of Sts. Nereus and Achilleus / St. Pancras, Martyrs',
    rank: 'Optional Memorial',
    color: 'red',
    saintName: 'St. Pancras of Rome',
    historicalEvent: {
      year: '304 AD',
      title: 'Martyrdom of Fourteen-Year-Old Saint Pancras on the Aurelian Way',
      description: 'Orphaned Phrygian youth who embraced Baptism in Rome and fearlessly confessed Christ before Emperor Diocletian, suffering martyrdom by the sword at age fourteen.',
      significance: 'Patron of children, first communicants, and solemn oaths.'
    }
  },
  '05-13': {
    title: 'Optional Memorial of Our Lady of Fátima',
    rank: 'Optional Memorial',
    color: 'white',
    saintName: 'Our Lady of Fátima',
    historicalEvent: {
      year: '1917 AD',
      title: 'First Apparition of Our Lady of the Rosary at the Cova da Iria',
      description: 'The Blessed Virgin Mary, "more brilliant than the sun," appeared to the three shepherd children Lúcia, St. Francisco, and St. Jacinta Marto in Fátima, Portugal, calling the world to prayer, penance, and the daily Rosary.',
      significance: 'Message of peace and triumph of the Immaculate Heart.'
    }
  },
  '05-14': {
    title: 'Feast of St. Matthias, Apostle',
    rank: 'Feast',
    color: 'red',
    saintName: 'St. Matthias the Apostle',
    historicalEvent: {
      year: '33 AD',
      title: 'Election of Saint Matthias to Complete the Twelve Apostles',
      description: 'Having accompanied the Lord Jesus from His Baptism by John until the Ascension, Matthias was chosen after prayer in the Upper Room to take the place of Judas and bear witness to the Resurrection.',
      significance: 'Named in the Roman Canon among the Apostles.'
    }
  },
  '05-22': {
    title: 'Optional Memorial of St. Rita of Cascia, Religious',
    rank: 'Optional Memorial',
    color: 'white',
    saintName: 'St. Rita of Cascia',
    historicalEvent: {
      year: '1457 AD',
      title: 'The Thorn of the Crucified and the Rose of Roccaporena',
      description: 'Peacemaker wife, mother, widow, and later Augustinian nun who bore a mystical wound from a thorn of Christ\'s crown on her forehead for fifteen years.',
      significance: 'Saint of Impossible Causes and peacemaking.'
    }
  },
  '05-25': {
    title: 'Optional Memorial of St. Bede the Venerable / St. Gregory VII / St. Mary Magdalene de\' Pazzi',
    rank: 'Optional Memorial',
    color: 'white',
    saintName: 'St. Bede the Venerable',
    historicalEvent: {
      year: '735 AD',
      title: 'Passing of the Father of English History at Jarrow',
      description: 'Benedictine monk of Wearmouth-Jarrow and Doctor of the Church who popularized the AD (*Anno Domini*) dating system and died chanting the *Gloria Patri* after completing his Gospel translation.',
      significance: 'Only native-born Englishman among the ancient Doctors of the Church.'
    }
  },
  '05-26': {
    title: 'Memorial of St. Philip Neri, Priest',
    rank: 'Memorial',
    color: 'white',
    saintName: 'St. Philip Neri',
    historicalEvent: {
      year: '1595 AD',
      title: 'The Apostle of Rome and Founder of the Oratory',
      description: 'Known for his radiant joy, humor, and mystical dilated heart, St. Philip Neri revitalized sixteenth-century Rome through spiritual conversation, sacred music, and the Forty Hours Devotion.',
      significance: 'Second Apostle of Rome and Patron of Christian joy.'
    }
  },
  '05-31': {
    title: 'Feast of the Visitation of the Blessed Virgin Mary',
    rank: 'Feast',
    color: 'white',
    saintName: 'Visitation of the Blessed Virgin Mary',
    historicalEvent: {
      year: 'c. 1 BC',
      title: 'Mary\'s Journey to the Hill Country of Judea and the Magnificat',
      description: 'Carrying the Incarnate Word in her womb, Mary went in haste to serve her cousin Elizabeth; at Mary\'s voice, John the Baptist leaped for joy and was sanctified in the womb.',
      significance: 'First Eucharistic procession in history and proclamation of the Magnificat.'
    }
  },

  // JUNE
  '06-01': {
    title: 'Memorial of St. Justin, Martyr',
    rank: 'Memorial',
    color: 'red',
    saintName: 'St. Justin Martyr',
    historicalEvent: {
      year: '165 AD',
      title: 'First Apology Describing the Early Catholic Mass',
      description: 'Early Christian philosopher who addressed two Apologies to the Roman Emperor, leaving the earliest detailed description of the Sunday Eucharistic Liturgy and Real Presence before his martyrdom in Rome.',
      significance: 'Patron of Christian philosophers and apologists.'
    }
  },
  '06-03': {
    title: 'Memorial of St. Charles Lwanga and Companions, Martyrs',
    rank: 'Memorial',
    color: 'red',
    saintName: 'St. Charles Lwanga and the Uganda Martyrs',
    historicalEvent: {
      year: '1886 AD',
      title: 'Martyrdom of the Young Christian Pages at Namugongo',
      description: 'Twenty-two young Ugandan royal pages and catechists—many in their teens—burned alive under King Mwanga II for defending their Christian faith and chastity.',
      significance: 'Patrons of African Catholic Action and youth.'
    }
  },
  '06-05': {
    title: 'Memorial of St. Boniface, Bishop and Martyr',
    rank: 'Memorial',
    color: 'red',
    saintName: 'St. Boniface',
    historicalEvent: {
      year: '754 AD',
      title: 'Felling of Donar\'s Oak and Evangelization of Germany',
      description: 'Anglo-Saxon Benedictine monk commissioned by Pope Gregory II who felled the pagan oak of Thor at Geismar, organized the German dioceses, and died a martyr in Frisia holding the Book of the Gospels.',
      significance: 'Apostle of Germany.'
    }
  },
  '06-11': {
    title: 'Memorial of St. Barnabas, Apostle',
    rank: 'Memorial',
    color: 'red',
    saintName: 'St. Barnabas the Apostle',
    historicalEvent: {
      year: 'c. 61 AD',
      title: 'Apostolic Mission of the "Son of Encouragement"',
      description: 'Levite of Cyprus described in Acts as "a good man, full of the Holy Spirit and of faith," who introduced the newly converted Saul to the Apostles and accompanied him on the First Missionary Journey.',
      significance: 'Venerated with the title of Apostle and named in the Roman Canon.'
    }
  },
  '06-13': {
    title: 'Memorial of St. Anthony of Padua, Priest and Doctor of the Church',
    rank: 'Memorial',
    color: 'white',
    saintName: 'St. Anthony of Padua',
    historicalEvent: {
      year: '1231 AD',
      title: 'Passing of the Evangelical Doctor and Wonder-Worker of Padua',
      description: 'Portuguese-born Franciscan friar and friend of St. Francis of Assisi whose mastery of Scripture earned him the title "Ark of the Testament" and who proved the Real Presence when a starving mule knelt before the Blessed Sacrament.',
      significance: 'Doctor of the Church and patron of the poor and lost things.'
    }
  },
  '06-21': {
    title: 'Memorial of St. Aloysius Gonzaga, Religious',
    rank: 'Memorial',
    color: 'white',
    saintName: 'St. Aloysius Gonzaga',
    historicalEvent: {
      year: '1591 AD',
      title: 'Heroic Death Caring for Plague Victims in Rome',
      description: 'Heir to the Marquisate of Castiglione who renounced his princely birthright to enter the Society of Jesus and died at age twenty-three after carrying a dying plague victim to the hospital on his own shoulders.',
      significance: 'Universal Patron of Christian Youth and students.'
    }
  },
  '06-22': {
    title: 'Optional Memorial of Sts. John Fisher, Bishop, and Thomas More, Martyrs',
    rank: 'Optional Memorial',
    color: 'red',
    saintName: 'Sts. Thomas More and John Fisher',
    historicalEvent: {
      year: '1535 AD',
      title: 'Martyrdom on Tower Hill for the Unity of the Church',
      description: 'Cardinal John Fisher, Bishop of Rochester, and Lord Chancellor Sir Thomas More were beheaded in London under King Henry VIII for refusing to deny the spiritual supremacy of the Successor of Peter, More declaring: "I die the King\'s good servant, and God\'s first."',
      significance: 'Patrons of statesmen, politicians, and lawyers.'
    }
  },
  '06-24': {
    title: 'SOLEMNITY OF THE NATIVITY OF ST. JOHN THE BAPTIST',
    rank: 'Solemnity',
    color: 'white',
    saintName: 'St. John the Baptist',
    historicalEvent: {
      year: 'c. 1 BC',
      title: 'Birth of the Precursor of the Lord: "His Name is John"',
      description: 'Sanctified in his mother Elizabeth\'s womb at the Visitation of Mary, John was born six months before Jesus to prepare the way of the Lord, prompting Zechariah\'s canticle, the *Benedictus*.',
      significance: 'One of only three birthdays celebrated in the Roman Liturgy (Jesus, Mary, and John the Baptist).'
    }
  },
  '06-28': {
    title: 'Memorial of St. Irenaeus, Bishop, Martyr, and Doctor of the Church',
    rank: 'Memorial',
    color: 'red',
    saintName: 'St. Irenaeus of Lyons',
    historicalEvent: {
      year: 'c. 202 AD',
      title: 'Against Heresies and the Rule of Apostolic Succession',
      description: 'Disciple of St. Polycarp (who knew St. John the Apostle) and Bishop of Lyons who refuted Gnosticism, testified to the fourfold Gospel canon, and declared that every church must agree with the Church of Rome.',
      significance: 'Proclaimed "Doctor of Unity" by Pope Francis in 2022.'
    }
  },
  '06-29': {
    title: 'SOLEMNITY OF STS. PETER AND PAUL, APOSTLES',
    rank: 'Solemnity',
    color: 'red',
    isHolyDay: true,
    saintName: 'Sts. Peter and Paul, Apostles',
    historicalEvent: {
      year: 'c. 64–67 AD',
      title: 'Martyrdom of the Princes of the Apostles in Eternal Rome',
      description: 'Saint Peter, Rock of the Church, was crucified head-downward on the Vatican Hill, while Saint Paul, Apostle of the Gentiles, was beheaded by the sword at Aquae Salviae along the Ostian Way.',
      significance: 'Twin Apostolic Pillars of the Roman Catholic Church.'
    }
  },

  // JULY
  '07-03': {
    title: 'Feast of St. Thomas, Apostle',
    rank: 'Feast',
    color: 'red',
    saintName: 'St. Thomas the Apostle',
    historicalEvent: {
      year: 'c. 72 AD',
      title: '"My Lord and My God!" and the Evangelization of India',
      description: 'The Apostle who placed his hand into the Risen Lord\'s glorious wounds and made the supreme profession of Christ\'s divinity, later carrying the Gospel to the Malabar Coast of India where he suffered martyrdom at Mylapore.',
      significance: 'Apostle of India and patron of architects.'
    }
  },
  '07-06': {
    title: 'Optional Memorial of St. Maria Goretti, Virgin and Martyr',
    rank: 'Optional Memorial',
    color: 'red',
    saintName: 'St. Maria Goretti',
    historicalEvent: {
      year: '1902 AD',
      title: 'Heroic Forgiveness and Martyrdom of Purity',
      description: 'Eleven-year-old Italian girl who died defending her purity and forgave her attacker Alessandro Serenelli on her deathbed ("I forgive Alessandro Serenelli... and I want him with me in heaven forever"), leading to his complete conversion.',
      significance: '500,000 people—including her mother and repentant killer—attended her 1950 canonization.'
    }
  },
  '07-11': {
    title: 'Memorial of St. Benedict, Abbot',
    rank: 'Memorial',
    color: 'white',
    saintName: 'St. Benedict of Nursia',
    historicalEvent: {
      year: '547 AD',
      title: 'The Rule of Saint Benedict: Ora et Labora',
      description: 'Founder of Monte Cassino and Patriarch of Western Monasticism whose Holy Rule (*Ora et Labora* — Pray and Work) preserved Christian civilization, agriculture, and scholarship across Europe.',
      significance: 'Principal Patron of All Europe.'
    }
  },
  '07-14': {
    title: 'Memorial of St. Kateri Tekakwitha, Virgin',
    rank: 'Memorial',
    color: 'white',
    saintName: 'St. Kateri Tekakwitha',
    historicalEvent: {
      year: '1680 AD',
      title: 'Passing of the "Lily of the Mohawks"',
      description: 'Mohawk-Algonquin maiden baptized by Jesuit missionaries who lived heroic virginity, Eucharistic devotion, and penance at Kahnawake in Canada, dying at age twenty-four with the words: "Jesus, Mary, I love you."',
      significance: 'First Native American woman canonized a Saint.'
    }
  },
  '07-15': {
    title: 'Memorial of St. Bonaventure, Bishop and Doctor of the Church',
    rank: 'Memorial',
    color: 'white',
    saintName: 'St. Bonaventure',
    historicalEvent: {
      year: '1274 AD',
      title: 'The Seraphic Doctor at the Second Council of Lyons',
      description: 'Minister General of the Franciscans, Cardinal-Bishop of Albano, and friend of St. Thomas Aquinas who authored *The Soul\'s Journey into God* and helped achieve reunion with the Greeks at Lyons.',
      significance: 'Seraphic Doctor of the Church.'
    }
  },
  '07-16': {
    title: 'Optional Memorial of Our Lady of Mount Carmel',
    rank: 'Optional Memorial',
    color: 'white',
    saintName: 'Our Lady of Mount Carmel',
    historicalEvent: {
      year: '1251 AD',
      title: 'Gift of the Brown Scapular to Saint Simon Stock',
      description: 'Honoring the Blessed Virgin Mary as Patroness of the Carmelite Order, rooted in the prophet Elijah on Mount Carmel and the presentation of the Brown Scapular as a sign of Marian consecration and protection.',
      significance: 'One of the most cherished Marian devotions in the Church.'
    }
  },
  '07-22': {
    title: 'Feast of St. Mary Magdalene',
    rank: 'Feast',
    color: 'white',
    saintName: 'St. Mary Magdalene',
    historicalEvent: {
      year: '33 AD / 2016 AD',
      title: 'Apostola Apostolorum: Apostle to the Apostles',
      description: 'Standing faithfully at the foot of the Cross on Calvary, Mary Magdalene was the first witness of the Risen Christ on Easter morning and was sent by the Lord to announce the Resurrection to Peter and the Apostles.',
      significance: 'Elevated from Memorial to liturgical Feast by Pope Francis in 2016.'
    }
  },
  '07-25': {
    title: 'Feast of St. James, Apostle',
    rank: 'Feast',
    color: 'red',
    saintName: 'St. James the Greater, Apostle',
    historicalEvent: {
      year: '44 AD',
      title: 'First Apostle Martyred and the Shrine of Santiago de Compostela',
      description: 'Son of Zebedee and brother of St. John, privileged to witness the Transfiguration and Agony in Gethsemane, who became the first of the Twelve Apostles to drink the chalice of martyrdom under Herod Agrippa I.',
      significance: 'Patron of Spain and pilgrims along the Camino de Santiago.'
    }
  },
  '07-26': {
    title: 'Memorial of Sts. Joachim and Anne, Parents of the Blessed Virgin Mary',
    rank: 'Memorial',
    color: 'white',
    saintName: 'Sts. Joachim and Anne',
    historicalEvent: {
      year: '1st Century BC',
      title: 'Holy Grandparents of Jesus Christ',
      description: 'Righteous couple of the house of David whose faithful prayers were answered with the immaculate conception and birth of Mary, the Mother of God.',
      significance: 'Patrons of grandparents, married couples, and Christian mothers.'
    }
  },
  '07-29': {
    title: 'Memorial of Sts. Martha, Mary, and Lazarus',
    rank: 'Memorial',
    color: 'white',
    saintName: 'Sts. Martha, Mary, and Lazarus of Bethany',
    historicalEvent: {
      year: '1st Century AD',
      title: 'The Household of Bethany Loved by Jesus',
      description: 'In the home of Bethany, Jesus was welcomed with generous hospitality by Martha ("I believe that you are the Christ, the Son of God"), listened to in contemplative love by Mary, and glorified by raising Lazarus from the tomb.',
      significance: 'Models of active service, contemplative prayer, and resurrection hope.'
    }
  },
  '07-31': {
    title: 'Memorial of St. Ignatius of Loyola, Priest',
    rank: 'Memorial',
    color: 'white',
    saintName: 'St. Ignatius of Loyola',
    historicalEvent: {
      year: '1556 AD',
      title: 'The Spiritual Exercises and Founding of the Society of Jesus',
      description: 'Basque nobleman wounded by a cannonball at Pamplona who converted while reading the *Lives of the Saints*, authored the *Spiritual Exercises*, and founded the Jesuits under the motto *Ad Majorem Dei Gloriam* (For the Greater Glory of God).',
      significance: 'Patron saint of spiritual retreats and soldiers.'
    }
  },

  // AUGUST
  '08-01': {
    title: 'Memorial of St. Alphonsus Liguori, Bishop and Doctor of the Church',
    rank: 'Memorial',
    color: 'white',
    saintName: 'St. Alphonsus Maria de Liguori',
    historicalEvent: {
      year: '1787 AD',
      title: 'Founder of the Redemptorists and Master of Moral Theology',
      description: 'Neapolitan lawyer who left the courts to preach to forgotten rural shepherds, founded the Congregation of the Most Holy Redeemer, and wrote *Visits to the Blessed Sacrament* and *The Glories of Mary*.',
      significance: 'Patron of confessors and moral theologians.'
    }
  },
  '08-04': {
    title: 'Memorial of St. John Vianney, Priest',
    rank: 'Memorial',
    color: 'white',
    saintName: 'St. John Marie Vianney (Curé of Ars)',
    historicalEvent: {
      year: '1859 AD',
      title: 'The Curé of Ars: Heroic Ministry of the Confessional',
      description: 'Humble French parish priest who transformed the spiritually indifferent village of Ars and spent sixteen to eighteen hours a day in the confessional reconciling hundreds of thousands of pilgrims from across Europe.',
      significance: 'Universal Patron of all Parish Priests.'
    }
  },
  '08-06': {
    title: 'FEAST OF THE TRANSFIGURATION OF THE LORD',
    rank: 'Feast',
    color: 'white',
    saintName: 'Transfiguration of the Lord',
    historicalEvent: {
      year: '33 AD / 1457 AD',
      title: 'Manifestation of Christ\'s Divine Glory on Mount Tabor',
      description: 'Before Peter, James, and John, Jesus\' face shone like the sun and His garments became white as light as Moses and Elijah appeared and the Father\'s voice thundered from the cloud: "This is my beloved Son; listen to Him!"',
      significance: 'Extended to the Universal Church by Pope Callixtus III in 1457 after the Christian victory at Belgrade.'
    }
  },
  '08-08': {
    title: 'Memorial of St. Dominic, Priest',
    rank: 'Memorial',
    color: 'white',
    saintName: 'St. Dominic de Guzmán',
    historicalEvent: {
      year: '1221 AD',
      title: 'Founding of the Order of Preachers (Dominicans)',
      description: 'Spanish canon who combined apostolic poverty, rigorous theological study, and Marian prayer to convert the Albigensians and establish the Order of Preachers (*Contemplari et contemplata aliis tradere*).',
      significance: 'Promoter of the Holy Rosary and evangelical preaching.'
    }
  },
  '08-10': {
    title: 'Feast of St. Lawrence, Deacon and Martyr',
    rank: 'Feast',
    color: 'red',
    saintName: 'St. Lawrence of Rome',
    historicalEvent: {
      year: '258 AD',
      title: '"Behold the Treasures of the Church!"',
      description: 'Ordered by the Roman prefect to hand over the material riches of the Church four days after the martyrdom of Pope St. Sixtus II, Archdeacon Lawrence assembled the poor, crippled, and orphans, declaring: "These are the true treasures of the Church!" before suffering martyrdom on a gridiron.',
      significance: 'Third Patron of the City of Rome after Saints Peter and Paul.'
    }
  },
  '08-11': {
    title: 'Memorial of St. Clare, Virgin',
    rank: 'Memorial',
    color: 'white',
    saintName: 'St. Clare of Assisi',
    historicalEvent: {
      year: '1253 AD',
      title: 'Eucharistic Miracle of San Damiano and Privilege of Poverty',
      description: 'First woman follower of St. Francis who founded the Poor Clares, became the first woman to write a monastic Rule approved by a Pope, and repelled invading Saracen troops by holding aloft the Golden Monstrance at the convent gate.',
      significance: 'Model of Eucharistic adoration and contemplative poverty.'
    }
  },
  '08-14': {
    title: 'Memorial of St. Maximilian Kolbe, Priest and Martyr',
    rank: 'Memorial',
    color: 'red',
    saintName: 'St. Maximilian Maria Kolbe',
    historicalEvent: {
      year: '1941 AD',
      title: 'Martyr of Charity in the Starvation Bunker of Auschwitz',
      description: 'Conventual Franciscan friar, founder of the Militia Immaculatae and the monastery-city of Niepokalanów, who voluntarily stepped forward at Auschwitz to die in the starvation bunker in place of a married father, Franciszek Gajowniczek.',
      significance: 'Patron saint of the pro-life movement, families, prisoners, and journalists.'
    }
  },
  '08-15': {
    title: 'SOLEMNITY OF THE ASSUMPTION OF THE BLESSED VIRGIN MARY',
    rank: 'Solemnity',
    color: 'white',
    isHolyDay: true,
    saintName: 'Assumption of the Blessed Virgin Mary',
    historicalEvent: {
      year: '1950 AD',
      title: 'Infallible Dogmatic Definition of the Assumption (Munificentissimus Deus)',
      description: 'Pope Pius XII solemnly defined as a divinely revealed dogma that the Immaculate Mother of God, the ever-Virgin Mary, having completed the course of her earthly life, was assumed body and soul into heavenly glory.',
      significance: 'Oldest and greatest Marian Solemnity, prefiguring the bodily resurrection of the redeemed.'
    }
  },
  '08-20': {
    title: 'Memorial of St. Bernard, Abbot and Doctor of the Church',
    rank: 'Memorial',
    color: 'white',
    saintName: 'St. Bernard of Clairvaux',
    historicalEvent: {
      year: '1153 AD',
      title: 'The Mellifluous Doctor and Reformer of Cistercian Monasticism',
      description: 'Entered Cîteaux with thirty noble companions and founded Clairvaux Abbey, authoring sublime sermons on the Song of Songs and Marian devotion ("Remember, O most gracious Virgin Mary...").',
      significance: 'Last of the Fathers of the Church (*Doctor Mellifluus*).'
    }
  },
  '08-21': {
    title: 'Memorial of St. Pius X, Pope',
    rank: 'Memorial',
    color: 'white',
    saintName: 'Pope St. Pius X',
    historicalEvent: {
      year: '1914 AD',
      title: 'Pope of the Blessed Sacrament: "To Restore All Things in Christ"',
      description: 'Born in humble poverty at Riese, Giuseppe Sarto became Pope Pius X, promoting daily Holy Communion, lowering the age of First Communion to the age of reason (~7), renewing Gregorian Chant, and defending Catholic doctrine against Modernism.',
      significance: 'First Pope canonized since St. Pius V nearly four centuries earlier.'
    }
  },
  '08-22': {
    title: 'Memorial of the Queenship of the Blessed Virgin Mary',
    rank: 'Memorial',
    color: 'white',
    saintName: 'Queenship of Mary',
    historicalEvent: {
      year: '1954 AD',
      title: 'Encyclical Ad Caeli Reginam and Octave Day of the Assumption',
      description: 'Instituted by Pope Pius XII and placed on the Octave Day of the Assumption to celebrate Mary crowned by her Divine Son as Queen of Heaven and Earth, interceding as Mother of Mercy.',
      significance: 'Fifth Glorious Mystery of the Most Holy Rosary.'
    }
  },
  '08-24': {
    title: 'Feast of St. Bartholomew, Apostle',
    rank: 'Feast',
    color: 'red',
    saintName: 'St. Bartholomew (Nathanael) the Apostle',
    historicalEvent: {
      year: '1st Century AD',
      title: '"Behold, an Israelite Indeed, in Whom There Is No Duplicity!"',
      description: 'Brought to Jesus by Philip, Nathanael Bartholomew acclaimed Christ as "the Son of God, the King of Israel" and later carried the Gospel of Matthew to India and Armenia, where he was martyred.',
      significance: 'Co-Patron of the Armenian Church alongside St. Jude Thaddaeus.'
    }
  },
  '08-27': {
    title: 'Memorial of St. Monica',
    rank: 'Memorial',
    color: 'white',
    saintName: 'St. Monica of Hippo',
    historicalEvent: {
      year: '387 AD',
      title: 'Seventeen Years of Tears and Prayer for the Conversion of Augustine',
      description: 'Devout North African mother whose unceasing prayers, fasts, and tears won the conversion of her pagan husband Patricius and her wayward son St. Augustine, hearing Bishop Ambrose prophesy: "It is impossible that the son of so many tears should perish!"',
      significance: 'Patroness of Christian mothers, wives, and wayward children.'
    }
  },
  '08-28': {
    title: 'Memorial of St. Augustine, Bishop and Doctor of the Church',
    rank: 'Memorial',
    color: 'white',
    saintName: 'St. Augustine of Hippo',
    historicalEvent: {
      year: '430 AD',
      title: 'Doctor of Grace: "Our Heart Is Restless Until It Rests in Thee"',
      description: 'Converted in Milan after hearing a child\'s voice chant *Tolle, lege* ("Take up and read") and baptized by St. Ambrose, Augustine served thirty-four years as Bishop of Hippo, authoring *The Confessions*, *The City of God*, and *On the Trinity*.',
      significance: 'Preeminent Father and Doctor of Grace in the Western Church.'
    }
  },
  '08-29': {
    title: 'Memorial of the Passion of St. John the Baptist',
    rank: 'Memorial',
    color: 'red',
    saintName: 'Martyrdom of St. John the Baptist',
    historicalEvent: {
      year: 'c. 29 AD',
      title: 'Martyr for Truth and the Sanctity of Marriage at Machaerus',
      description: 'Imprisoned by Herod Antipas for courageously upholding the divine law of marriage ("It is not lawful for you to have your brother\'s wife"), the greatest of the prophets sealed his mission as Precursor by shedding his blood for truth.',
      significance: 'Forerunner of Christ in both birth, preaching, and martyrdom.'
    }
  },

  // SEPTEMBER
  '09-03': {
    title: 'Memorial of St. Gregory the Great, Pope and Doctor of the Church',
    rank: 'Memorial',
    color: 'white',
    saintName: 'Pope St. Gregory the Great',
    historicalEvent: {
      year: '604 AD',
      title: 'Servus Servorum Dei and Mission to Anglo-Saxon England',
      description: 'Roman prefect turned monk who became Pope in 590, styled himself "Servant of the Servants of God," codified Gregorian Chant and the Roman Liturgy, authored *Pastoral Care*, and sent St. Augustine of Canterbury to evangelize England.',
      significance: 'Fourth of the four original Great Doctors of the Western Church.'
    }
  },
  '09-05': {
    title: 'Optional Memorial of St. Teresa of Calcutta, Virgin',
    rank: 'Optional Memorial',
    color: 'white',
    saintName: 'St. Teresa of Calcutta (Mother Teresa)',
    historicalEvent: {
      year: '1997 AD',
      title: 'Satiating the Thirst of Jesus on the Cross in the Poorest of the Poor',
      description: 'Foundress of the Missionaries of Charity who began each day with a daily Holy Hour of Eucharistic Adoration before serving the dying, lepers, and abandoned children in Calcutta and around the globe.',
      significance: 'Icon of evangelical charity and reverence for every unborn and dying human life.'
    }
  },
  '09-08': {
    title: 'Feast of the Nativity of the Blessed Virgin Mary',
    rank: 'Feast',
    color: 'white',
    saintName: 'Nativity of the Blessed Virgin Mary',
    historicalEvent: {
      year: 'c. 16 BC / 5th Century AD',
      title: '"Your Birth, O Virgin Mother of God, Proclaimed Joy to the Whole World"',
      description: 'Celebrated nine months after the Solemnity of the Immaculate Conception (Dec 8), honoring the birth of Mary in Jerusalem near the Pool of Bethesda as the radiant dawn preceding Christ, the Sun of Justice.',
      significance: 'Originating from the fifth-century dedication of the Basilica of St. Anne in Jerusalem.'
    }
  },
  '09-12': {
    title: 'Optional Memorial of the Most Holy Name of Mary',
    rank: 'Optional Memorial',
    color: 'white',
    saintName: 'Most Holy Name of Mary',
    historicalEvent: {
      year: '1683 AD',
      title: 'Christian Deliverance at the Siege of Vienna',
      description: 'Extended to the Universal Church by Pope Innocent XI in thanksgiving after King Jan III Sobieski of Poland consecrated his troops to the Blessed Virgin Mary and lifted the Ottoman Siege of Vienna on September 12, 1683.',
      significance: 'Celebrating the power and sweetness of the maternal name of Mary.'
    }
  },
  '09-13': {
    title: 'Memorial of St. John Chrysostom, Bishop and Doctor of the Church',
    rank: 'Memorial',
    color: 'white',
    saintName: 'St. John Chrysostom',
    historicalEvent: {
      year: '407 AD',
      title: 'The "Golden-Mouthed" Preacher and Doctor of the Eucharist',
      description: 'Patriarch of Constantinople renowned for his unmatched scriptural homilies, defense of the poor, and Eucharistic theology, who died in exile with the immortal final words: "Glory be to God for all things!"',
      significance: 'One of the Three Holy Hierarchs of the East and Universal Patron of Preachers.'
    }
  },
  '09-14': {
    title: 'FEAST OF THE EXALTATION OF THE HOLY CROSS',
    rank: 'Feast',
    color: 'red',
    saintName: 'Exaltation of the Holy Cross',
    historicalEvent: {
      year: '326 AD / 335 AD',
      title: 'Discovery of the True Cross by St. Helena and Dedication of the Holy Sepulchre',
      description: 'Commemorating the finding of the True Cross of Calvary by Empress St. Helena, the dedication of the Constantinian Basilica over Calvary and the Tomb (335 AD), and the recovery of the Cross from the Persians by Emperor Heraclius (629 AD).',
      significance: 'Venerating the Wood of the Cross as the Tree of Life and throne of Christ\'s triumph.'
    }
  },
  '09-15': {
    title: 'Memorial of Our Lady of Sorrows',
    rank: 'Memorial',
    color: 'white',
    saintName: 'Our Lady of Sorrows (Mater Dolorosa)',
    historicalEvent: {
      year: '33 AD',
      title: 'Stabat Mater Dolorosa: Mary Standing at the Foot of the Cross',
      description: 'Celebrated the day after the Exaltation of the Holy Cross to honor the spiritual martyrdom of the Blessed Virgin Mary, whose soul was pierced by the sword foretold by Simeon as she stood courageously beneath her dying Son.',
      significance: 'Meditation on the Seven Sorrows of Mary and her compassionate union with the Redeemer.'
    }
  },
  '09-16': {
    title: 'Memorial of Sts. Cornelius, Pope, and Cyprian, Bishop, Martyrs',
    rank: 'Memorial',
    color: 'red',
    saintName: 'Sts. Cornelius and Cyprian',
    historicalEvent: {
      year: '253 AD / 258 AD',
      title: 'Pastoral Unity and Martyrdom During the Decian and Valerian Persecutions',
      description: 'Pope St. Cornelius and St. Cyprian of Carthage defended the merciful reconciliation of repentant Christians (*lapsi*) against Novatian rigorism and sealed their fraternal bond with martyrdom.',
      significance: 'Both are invoked together in the Roman Canon of the Mass.'
    }
  },
  '09-21': {
    title: 'Feast of St. Matthew, Apostle and Evangelist',
    rank: 'Feast',
    color: 'red',
    saintName: 'St. Matthew the Apostle and Evangelist',
    historicalEvent: {
      year: '1st Century AD',
      title: 'The Call of Levi from the Customs Post: "I Desire Mercy, Not Sacrifice"',
      description: 'At a single word from Jesus—"Follow Me"—the tax collector Levi rose, left his counting table behind in Capernaum, hosted a banquet for Christ, and penned the First Gospel demonstrating Jesus as the promised Messiah of Israel.',
      significance: 'Symbolized by the Winged Man; Patron of bankers and accountants.'
    }
  },
  '09-23': {
    title: 'Memorial of St. Pius of Pietrelcina (Padre Pio), Priest',
    rank: 'Memorial',
    color: 'white',
    saintName: 'St. Padre Pio of Pietrelcina',
    historicalEvent: {
      year: '1968 AD',
      title: 'Fifty Years Bearing the Visible Stigmata of Christ Crucified',
      description: 'Capuchin friar of San Giovanni Rotondo who bore the five bleeding wounds of Christ for half a century, celebrated transcendent daily Masses, read souls in the confessional, founded the "Home for the Relief of Suffering" hospital, and established worldwide Prayer Groups.',
      significance: '"Pray, hope, and don\'t worry. Worry is useless. God is merciful and will hear your prayer."'
    }
  },
  '09-27': {
    title: 'Memorial of St. Vincent de Paul, Priest',
    rank: 'Memorial',
    color: 'white',
    saintName: 'St. Vincent de Paul',
    historicalEvent: {
      year: '1660 AD',
      title: 'Father of Modern Organized Catholic Charity',
      description: 'French peasant priest who founded the Congregation of the Mission (Vincentians) and, with St. Louise de Marillac, the Daughters of Charity—serving galley slaves, foundlings, war refugees, and the sick poor.',
      significance: 'Universal Patron of all Charitable Societies (including the St. Vincent de Paul Society).'
    }
  },
  '09-28': {
    title: 'Optional Memorial of St. Lorenzo Ruiz and Companions / St. Wenceslaus, Martyrs',
    rank: 'Optional Memorial',
    color: 'red',
    saintName: 'St. Lorenzo Ruiz of Manila / St. Wenceslaus',
    historicalEvent: {
      year: '1637 AD',
      title: 'Martyrdom of Saint Lorenzo Ruiz, First Filipino Saint, in Nagasaki',
      description: 'Married layman, father of three, and Binondo parish scribe who accompanied Dominican missionaries to Japan and declared under torture: "I am a Catholic and wholeheartedly do accept death for God; had I a thousand lives, all these to Him shall I offer."',
      significance: 'Protomartyr and First Canonized Saint of the Philippines.'
    }
  },
  '09-29': {
    title: 'Feast of Sts. Michael, Gabriel, and Raphael, Archangels',
    rank: 'Feast',
    color: 'white',
    saintName: 'Sts. Michael, Gabriel, and Raphael, Archangels',
    historicalEvent: {
      year: '5th Century AD',
      title: 'Michaelmas and the Heavenly Hosts Who Serve Before God\'s Throne',
      description: 'Honoring the three biblical Archangels: Michael ("Who is like God?"), Prince of the Heavenly Host who cast down Satan; Gabriel ("Strength of God"), Herald of the Incarnation; and Raphael ("God Heals"), companion and healer of Tobiah.',
      significance: 'Protectors of the Church Militant, messengers of salvation, and healers of pilgrims.'
    }
  },
  '09-30': {
    title: 'Memorial of St. Jerome, Priest and Doctor of the Church',
    rank: 'Memorial',
    color: 'white',
    saintName: 'St. Jerome',
    historicalEvent: {
      year: '420 AD',
      title: '"Ignorance of the Scriptures Is Ignorance of Christ"',
      description: 'Commissioned by Pope St. Damasus I, Jerome spent thirty-four years in a cave beside the Church of the Nativity in Bethlehem translating the Bible from Hebrew and Greek into the Latin Vulgate and writing monumental biblical commentaries.',
      significance: 'Doctor Maximus in Exponendis Sacris Scripturis (Greatest Doctor in Explaining Sacred Scripture).'
    }
  }
};

const ORDINAL_NAMES: Record<number, string> = {
  1: 'First', 2: 'Second', 3: 'Third', 4: 'Fourth', 5: 'Fifth',
  6: 'Sixth', 7: 'Seventh', 8: 'Eighth', 9: 'Ninth', 10: 'Tenth',
  11: 'Eleventh', 12: 'Twelfth', 13: 'Thirteenth', 14: 'Fourteenth',
  15: 'Fifteenth', 16: 'Sixteenth', 17: 'Seventeenth', 18: 'Eighteenth',
  19: 'Nineteenth', 20: 'Twentieth', 21: 'Twenty-First', 22: 'Twenty-Second',
  23: 'Twenty-Third', 24: 'Twenty-Fourth', 25: 'Twenty-Fifth', 26: 'Twenty-Sixth',
  27: 'Twenty-Seventh', 28: 'Twenty-Eighth', 29: 'Twenty-Ninth', 30: 'Thirtieth',
  31: 'Thirty-First', 32: 'Thirty-Second', 33: 'Thirty-Third', 34: 'Thirty-Fourth'
};

/**
 * Exact Gregorian Computus for Easter Sunday (2026, 2027, 2028, 2029, 2030, and any year)
 * - 2026: April 5
 * - 2027: March 28
 * - 2028: April 16
 * - 2029: April 1
 * - 2030: April 21
 */
export function getEasterDate(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31); // 3 = March, 4 = April
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
}

/**
 * Returns the UTC Date for the First Sunday of Advent in a given civil year (falls Nov 27 – Dec 3)
 * - 2026: Nov 29, 2026
 * - 2027: Nov 28, 2027
 * - 2028: Dec 3, 2028
 * - 2029: Dec 2, 2029
 * - 2030: Dec 1, 2030
 */
export function getFirstSundayOfAdvent(year: number): Date {
  const christmas = new Date(Date.UTC(year, 11, 25, 12, 0, 0));
  const dow = christmas.getUTCDay(); // 0 = Sun ... 6 = Sat
  // 4th Sunday of Advent is between Dec 18 and Dec 24
  const daysBackToAdvent4 = dow === 0 ? 7 : dow;
  const advent1Offset = daysBackToAdvent4 + 21;
  const advent1 = new Date(christmas.getTime());
  advent1.setUTCDate(christmas.getUTCDate() - advent1Offset);
  return advent1;
}

/**
 * Returns the liturgical year, Sunday Cycle (A, B, C), and Weekday Cycle (I, II) for any date
 */
export function getLiturgicalCycles(year: number, monthIndex0: number, day: number): {
  liturgicalYear: number;
  sundayCycle: 'A' | 'B' | 'C';
  weekdayCycle: 'I' | 'II';
} {
  const target = new Date(Date.UTC(year, monthIndex0, day, 12, 0, 0));
  const advent1 = getFirstSundayOfAdvent(year);
  // If on or after First Sunday of Advent, we are in the next Liturgical Year
  const liturgicalYear = target.getTime() >= advent1.getTime() ? year + 1 : year;
  // Liturgical Year 2026: 2026 % 3 === 2 -> A; 2027 % 3 === 0 -> B; 2028 % 3 === 1 -> C
  const mod = liturgicalYear % 3;
  const sundayCycle: 'A' | 'B' | 'C' = mod === 2 ? 'A' : mod === 0 ? 'B' : 'C';
  const weekdayCycle: 'I' | 'II' = liturgicalYear % 2 === 1 ? 'I' : 'II';
  return { liturgicalYear, sundayCycle, weekdayCycle };
}

function diffDaysUTC(a: Date, b: Date): number {
  return Math.round((a.getTime() - b.getTime()) / 86400000);
}

/**
 * Computes the Feast of the Baptism of the Lord for a given civil year (in January)
 */
export function getBaptismOfTheLordDate(year: number): Date {
  // Traditional Jan 6 Epiphany: Baptism of the Lord is the Sunday after Jan 6 (Jan 7–13)
  const jan6 = new Date(Date.UTC(year, 0, 6, 12, 0, 0));
  const dow = jan6.getUTCDay();
  const daysToNextSunday = dow === 0 ? 7 : 7 - dow;
  const baptism = new Date(jan6.getTime());
  baptism.setUTCDate(6 + daysToNextSunday);
  return baptism;
}

function stripHardcodedWeekdayTitle(knownDay: Partial<LiturgicalDayInfo>, monthIndex0: number, day: number): Partial<LiturgicalDayInfo> {
  // In KNOWN_OCTOBER_DAYS, KNOWN_NOVEMBER_DAYS, KNOWN_DECEMBER_DAYS, KNOWN_JANUARY_DAYS,
  // some entries were 2026-specific ordinary weekdays or Sundays (e.g., "Monday of the Twenty-Eighth Week...", "FIRST SUNDAY OF ADVENT" on Nov 29).
  // We preserve fixed saints/memorials/feasts/solemnities and historical events while letting the dynamic calendar engine compute moveable Sundays/weekdays!
  const title = knownDay.title || '';
  const isHardcodedMoveableOrWeekday =
    title.includes('Week in Ordinary Time') ||
    title.includes('Sunday in Ordinary Time') ||
    title.includes('Week of Advent') ||
    title.includes('SUNDAY OF ADVENT') ||
    title.includes('FEAST OF THE BAPTISM OF THE LORD') ||
    (monthIndex0 === 9 && day === 31 && title.includes('Vigil of All Saints')) ||
    (monthIndex0 === 11 && (day === 26 || day === 30) && title.includes('Holy Family'));

  if (!isHardcodedMoveableOrWeekday) {
    return knownDay;
  }

  // If it had a saintName (like Oct 4 St. Francis, Oct 5 St. Faustina, Oct 11 St. John XXIII, Nov 26 St. John Berchmans, Dec 1 St. Edmund Campion, Dec 6 St. Nicholas, Dec 13 St. Lucy),
  // convert it to a proper fixed saint commemoration so it works on any day of the week in 2027-2030!
  if (knownDay.saintName) {
    const fixedRank: LiturgicalDayInfo['rank'] =
      (monthIndex0 === 9 && day === 4) || (monthIndex0 === 11 && day === 13)
        ? 'Memorial'
        : 'Optional Memorial';
    const fixedColor: LiturgicalColor =
      monthIndex0 === 11 && day === 13 ? 'red' : 'white';
    return {
      title: `${fixedRank} of ${knownDay.saintName}`,
      rank: fixedRank,
      color: fixedColor,
      saintName: knownDay.saintName,
      historicalEvent: knownDay.historicalEvent
    };
  }

  // Otherwise keep only its historicalEvent so the dynamic season/week title is used!
  return {
    historicalEvent: knownDay.historicalEvent
  };
}

/**
 * Computes complete, accurate LiturgicalDayInfo for any single calendar date (2026–2030 and beyond)
 */
export function getLiturgicalDayInfo(year: number, monthIndex0: number, day: number): LiturgicalDayInfo {
  const dateObj = new Date(Date.UTC(year, monthIndex0, day, 12, 0, 0));
  const dayOfWeekStr = dateObj.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'UTC' });
  const dayOfWeekNum = dateObj.getUTCDay(); // 0 = Sun ... 6 = Sat
  const monthNum = monthIndex0 + 1;
  const dateKey = `${year}-${String(monthNum).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  const mmdd = `${String(monthNum).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  const easter = getEasterDate(year);
  const diffFromEaster = diffDaysUTC(dateObj, easter);
  const advent1 = getFirstSundayOfAdvent(year);
  const diffFromAdvent1 = diffDaysUTC(dateObj, advent1);
  const baptism = getBaptismOfTheLordDate(year);
  const diffFromBaptism = diffDaysUTC(dateObj, baptism);

  // Look up fixed Roman Calendar entry & historical event
  let fixedEntry: Partial<LiturgicalDayInfo> | undefined;
  if (monthIndex0 === 0 && KNOWN_JANUARY_DAYS[day]) {
    fixedEntry = stripHardcodedWeekdayTitle(KNOWN_JANUARY_DAYS[day], monthIndex0, day);
  } else if (monthIndex0 === 9 && KNOWN_OCTOBER_DAYS[day]) {
    fixedEntry = stripHardcodedWeekdayTitle(KNOWN_OCTOBER_DAYS[day], monthIndex0, day);
  } else if (monthIndex0 === 10 && KNOWN_NOVEMBER_DAYS[day]) {
    fixedEntry = stripHardcodedWeekdayTitle(KNOWN_NOVEMBER_DAYS[day], monthIndex0, day);
  } else if (monthIndex0 === 11 && KNOWN_DECEMBER_DAYS[day]) {
    fixedEntry = stripHardcodedWeekdayTitle(KNOWN_DECEMBER_DAYS[day], monthIndex0, day);
  } else if (FIXED_ROMAN_FEASTS_FEB_TO_SEP[mmdd]) {
    fixedEntry = FIXED_ROMAN_FEASTS_FEB_TO_SEP[mmdd];
  }

  let season = 'Ordinary Time';
  let title = `${dayOfWeekStr} in Ordinary Time`;
  let rank: LiturgicalDayInfo['rank'] = dayOfWeekNum === 0 ? 'Sunday' : 'Weekday';
  let color: LiturgicalColor = 'green';
  let isHolyDay = dayOfWeekNum === 0;
  let isFasting = dayOfWeekNum === 5;
  let saintName: string | undefined = fixedEntry?.saintName;
  const historicalEvent = fixedEntry?.historicalEvent;

  // 1. CHECK MOVEABLE SEASONS & SOLEMNITIES RELATIVE TO EASTER
  if (diffFromEaster === -46) {
    season = 'Lent';
    title = 'Ash Wednesday (Day of Fasting and Abstinence)';
    rank = 'Solemnity';
    color = 'violet';
    isFasting = true;
  } else if (diffFromEaster > -46 && diffFromEaster < -42) {
    season = 'Lent';
    title = `${dayOfWeekStr} after Ash Wednesday`;
    rank = 'Weekday';
    color = 'violet';
    isFasting = dayOfWeekNum === 5;
  } else if (diffFromEaster >= -42 && diffFromEaster < -7) {
    season = 'Lent';
    const lentWeek = Math.floor((diffFromEaster + 42) / 7) + 1; // 1 to 5
    const ordWeek = ORDINAL_NAMES[lentWeek] || `${lentWeek}th`;
    if (dayOfWeekNum === 0) {
      rank = 'Sunday';
      if (lentWeek === 4) {
        title = 'Fourth Sunday of Lent (Laetare Sunday)';
        color = 'rose';
      } else {
        title = `${ordWeek} Sunday of Lent`;
        color = 'violet';
      }
    } else {
      rank = 'Weekday';
      title = `${dayOfWeekStr} of the ${ordWeek} Week of Lent`;
      color = 'violet';
    }
  } else if (diffFromEaster === -7) {
    season = 'Holy Week';
    title = 'Palm Sunday of the Passion of the Lord';
    rank = 'Sunday';
    color = 'red';
  } else if (diffFromEaster >= -6 && diffFromEaster <= -4) {
    season = 'Holy Week';
    title = `${dayOfWeekStr} of Holy Week`;
    rank = 'Weekday';
    color = 'violet';
  } else if (diffFromEaster === -3) {
    season = 'Paschal Triduum';
    title = 'Holy Thursday — Evening Mass of the Lord\'s Supper';
    rank = 'Solemnity';
    color = 'white';
  } else if (diffFromEaster === -2) {
    season = 'Paschal Triduum';
    title = 'Friday of the Passion of the Lord (Good Friday)';
    rank = 'Solemnity';
    color = 'red';
    isFasting = true;
  } else if (diffFromEaster === -1) {
    season = 'Paschal Triduum';
    title = 'Holy Saturday / The Easter Vigil in the Holy Night';
    rank = 'Solemnity';
    color = 'white';
  } else if (diffFromEaster === 0) {
    season = 'Easter';
    title = 'EASTER SUNDAY OF THE RESURRECTION OF THE LORD';
    rank = 'Solemnity';
    color = 'white';
    isHolyDay = true;
  } else if (diffFromEaster >= 1 && diffFromEaster <= 6) {
    season = 'Easter';
    title = `${dayOfWeekStr} within the Octave of Easter`;
    rank = 'Solemnity';
    color = 'white';
    isFasting = false; // No Friday abstinence during the Octave of Easter
  } else if (diffFromEaster === 7) {
    season = 'Easter';
    title = 'Second Sunday of Easter (Sunday of Divine Mercy)';
    rank = 'Solemnity';
    color = 'white';
  } else if (diffFromEaster > 7 && diffFromEaster < 49) {
    season = 'Easter';
    const easterWeek = Math.floor(diffFromEaster / 7) + 1; // 2 to 7
    const ordWeek = ORDINAL_NAMES[easterWeek] || `${easterWeek}th`;
    if (diffFromEaster === 39) {
      title = 'SOLEMNITY OF THE ASCENSION OF THE LORD';
      rank = 'Solemnity';
      color = 'white';
      isHolyDay = true;
    } else if (dayOfWeekNum === 0) {
      title = `${ordWeek} Sunday of Easter`;
      rank = 'Sunday';
      color = 'white';
    } else {
      title = `${dayOfWeekStr} of the ${ordWeek} Week of Easter`;
      rank = 'Weekday';
      color = 'white';
    }
  } else if (diffFromEaster === 49) {
    season = 'Easter';
    title = 'PENTECOST SUNDAY';
    rank = 'Solemnity';
    color = 'red';
    isHolyDay = true;
  } else if (diffFromEaster === 50) {
    season = 'Ordinary Time';
    title = 'Memorial of the Blessed Virgin Mary, Mother of the Church';
    rank = 'Memorial';
    color = 'white';
    saintName = 'Blessed Virgin Mary, Mother of the Church';
  } else if (diffFromEaster === 56) {
    season = 'Ordinary Time';
    title = 'SOLEMNITY OF THE MOST HOLY TRINITY';
    rank = 'Solemnity';
    color = 'white';
  } else if (diffFromEaster === 60 || diffFromEaster === 63) {
    season = 'Ordinary Time';
    if (diffFromEaster === 63) {
      title = 'SOLEMNITY OF THE MOST HOLY BODY AND BLOOD OF CHRIST (CORPUS CHRISTI)';
      rank = 'Solemnity';
      color = 'white';
    } else {
      // Thursday Corpus Christi
      title = 'Thursday of the Ninth/Tenth Week in Ordinary Time (or Corpus Christi)';
      rank = 'Solemnity';
      color = 'white';
    }
  } else if (diffFromEaster === 68) {
    season = 'Ordinary Time';
    title = 'SOLEMNITY OF THE MOST SACRED HEART OF JESUS';
    rank = 'Solemnity';
    color = 'white';
    saintName = 'Most Sacred Heart of Jesus';
    isFasting = false;
  } else if (diffFromEaster === 69) {
    season = 'Ordinary Time';
    title = 'Memorial of the Immaculate Heart of the Blessed Virgin Mary';
    rank = 'Memorial';
    color = 'white';
    saintName = 'Immaculate Heart of Mary';
  }
  // 2. CHECK ADVENT & CHRISTMAS SEASON
  else if (diffFromAdvent1 === -7) {
    season = 'Ordinary Time';
    title = 'SOLEMNITY OF OUR LORD JESUS CHRIST, KING OF THE UNIVERSE (Christ the King)';
    rank = 'Solemnity';
    color = 'white';
  } else if (diffFromAdvent1 >= 0 && !(monthIndex0 === 11 && day >= 25)) {
    season = 'Advent';
    const adventWeek = Math.floor(diffFromAdvent1 / 7) + 1; // 1 to 4
    const ordWeek = ORDINAL_NAMES[adventWeek] || `${adventWeek}th`;
    if (dayOfWeekNum === 0) {
      rank = 'Sunday';
      if (adventWeek === 3) {
        title = 'THIRD SUNDAY OF ADVENT (Gaudete Sunday)';
        color = 'rose';
      } else {
        title = `${ordWeek.toUpperCase()} SUNDAY OF ADVENT`;
        color = 'violet';
      }
    } else {
      rank = 'Weekday';
      color = 'violet';
      if (monthIndex0 === 11 && day >= 17) {
        title = `Late Advent Weekday (December ${day} — "O Antiphons")`;
      } else {
        title = `${dayOfWeekStr} of the ${ordWeek} Week of Advent`;
      }
    }
  } else if (monthIndex0 === 11 && day >= 25) {
    season = 'Christmas';
    color = 'white';
    if (day === 25) {
      title = 'SOLEMNITY OF THE NATIVITY OF THE LORD (CHRISTMAS)';
      rank = 'Solemnity';
      isHolyDay = true;
      isFasting = false;
    } else if (dayOfWeekNum === 0 || (day === 30 && new Date(Date.UTC(year, 11, 25)).getUTCDay() === 0)) {
      // Feast of the Holy Family is the Sunday within the Octave of Christmas, or Dec 30 if Christmas is on Sunday
      title = 'Feast of the Holy Family of Jesus, Mary, and Joseph';
      rank = 'Feast';
      saintName = 'The Holy Family of Nazareth';
    } else {
      title = fixedEntry?.title || `${dayOfWeekStr} within the Octave of Christmas`;
      rank = fixedEntry?.rank || 'Weekday';
      color = fixedEntry?.color || 'white';
    }
  } else if (monthIndex0 === 0 && diffFromBaptism <= 0) {
    season = 'Christmas';
    color = 'white';
    if (day === 1) {
      title = 'SOLEMNITY OF MARY, THE HOLY MOTHER OF GOD';
      rank = 'Solemnity';
      isHolyDay = true;
    } else if (day === 6) {
      title = 'SOLEMNITY OF THE EPIPHANY OF THE LORD';
      rank = 'Solemnity';
      isHolyDay = true;
    } else if (diffFromBaptism === 0) {
      title = 'FEAST OF THE BAPTISM OF THE LORD';
      rank = 'Feast';
      color = 'white';
    } else if (dayOfWeekNum === 0) {
      title = 'Second Sunday after the Nativity (or Epiphany of the Lord)';
      rank = 'Sunday';
    } else {
      title = fixedEntry?.title || `${dayOfWeekStr} of Christmas Time`;
      rank = fixedEntry?.rank || 'Weekday';
    }
  }
  // 3. ORDINARY TIME PART I (After Baptism of the Lord until Tuesday before Ash Wednesday)
  else if (diffFromBaptism > 0 && diffFromEaster < -46) {
    season = 'Ordinary Time';
    const weekNum = Math.floor((diffFromBaptism - 1) / 7) + 1;
    const ordWeek = ORDINAL_NAMES[weekNum] || `${weekNum}th`;
    if (dayOfWeekNum === 0) {
      title = `${ordWeek} Sunday in Ordinary Time`;
      rank = 'Sunday';
      color = 'green';
    } else {
      title = `${dayOfWeekStr} of the ${ordWeek} Week in Ordinary Time`;
      rank = 'Weekday';
      color = 'green';
    }
  }
  // 4. ORDINARY TIME PART II (After Pentecost until Saturday before First Sunday of Advent)
  else if (diffFromEaster > 49 && diffFromAdvent1 < 0) {
    season = 'Ordinary Time';
    // Count backwards from First Sunday of Advent:
    // The week immediately before Advent 1 is the 34th Week in Ordinary Time (starting with Christ the King on diffFromAdvent1 === -7).
    const weeksBeforeAdvent = Math.ceil(Math.abs(diffFromAdvent1) / 7); // 1 for 34th week, 2 for 33rd week, etc.
    const weekNum = Math.max(1, Math.min(34, 35 - weeksBeforeAdvent));
    const ordWeek = ORDINAL_NAMES[weekNum] || `${weekNum}th`;
    if (dayOfWeekNum === 0) {
      title = `${ordWeek} Sunday in Ordinary Time`;
      rank = 'Sunday';
      color = 'green';
    } else {
      title = `${dayOfWeekStr} of the ${ordWeek} Week in Ordinary Time`;
      rank = 'Weekday';
      color = 'green';
    }
  }

  // 5. APPLY FIXED ROMAN CALENDAR FEASTS & MEMORIALS ACCORDING TO LITURGICAL PRECEDENCE
  if (fixedEntry && fixedEntry.title) {
    const isProtectedMoveableDay =
      (diffFromEaster >= -7 && diffFromEaster <= 7) || // Palm Sunday, Holy Week, Triduum, Easter Octave
      diffFromEaster === -46 || // Ash Wednesday
      diffFromEaster === 39 || // Ascension
      diffFromEaster === 49 || // Pentecost
      diffFromEaster === 56 || // Trinity Sunday
      diffFromEaster === 63 || // Corpus Christi Sunday
      diffFromEaster === 68 || // Sacred Heart
      diffFromAdvent1 === -7; // Christ the King

    if (!isProtectedMoveableDay) {
      if (fixedEntry.rank === 'Solemnity') {
        // Fixed Solemnity overrides Ordinary Sundays and Weekdays (unless Sunday of Advent/Lent/Easter, where it is noted alongside)
        if (dayOfWeekNum === 0 && (season === 'Advent' || season === 'Lent' || season === 'Easter')) {
          title = `${title} (Transferred: ${fixedEntry.title})`;
        } else {
          title = fixedEntry.title;
          rank = 'Solemnity';
          color = fixedEntry.color || 'white';
          if (fixedEntry.isHolyDay !== undefined) isHolyDay = fixedEntry.isHolyDay;
          isFasting = false; // Solemnities dispense Friday abstinence
        }
      } else if (fixedEntry.rank === 'Feast') {
        if (dayOfWeekNum === 0) {
          // Feasts of the Lord (Presentation Feb 2, Transfiguration Aug 6, Exaltation of Cross Sep 14, Lateran Basilica Nov 9) override Ordinary Sundays
          const isFeastOfTheLord =
            mmdd === '02-02' || mmdd === '08-06' || mmdd === '09-14' || mmdd === '11-09' || mmdd === '11-02';
          if (isFeastOfTheLord && season === 'Ordinary Time') {
            title = fixedEntry.title;
            rank = 'Feast';
            color = fixedEntry.color || 'white';
          } else {
            title = `${title} (${fixedEntry.saintName || fixedEntry.title})`;
          }
        } else if (season !== 'Paschal Triduum') {
          title = fixedEntry.title;
          rank = 'Feast';
          color = fixedEntry.color || 'white';
        }
      } else if (fixedEntry.rank === 'Memorial' || fixedEntry.rank === 'Optional Memorial') {
        if (dayOfWeekNum === 0) {
          // Sundays take precedence over Memorials, but we preserve the Saint note for awareness
          if (fixedEntry.saintName) {
            title = `${title} (Commemoration: ${fixedEntry.saintName})`;
          }
        } else if (season === 'Lent') {
          // During Lent, Memorials become Optional Commemorations and keep Violet vestments
          title = `${title} / Commemoration of ${fixedEntry.saintName || fixedEntry.title.replace(/^(Optional )?Memorial of /, '')}`;
          color = 'violet';
        } else if (season === 'Advent' && monthIndex0 === 11 && day >= 17) {
          // Dec 17-24 Late Advent weekdays keep Violet vestments
          title = `${title} (${fixedEntry.saintName || fixedEntry.title})`;
          color = 'violet';
        } else {
          title = `${title} / ${fixedEntry.title}`;
          rank = fixedEntry.rank;
          color = fixedEntry.color || color;
        }
      }
    }
  }

  return {
    date: dateKey,
    dayOfWeek: dayOfWeekStr,
    title,
    rank,
    season,
    color,
    isHolyDay,
    isFastingDay: isFasting,
    saintName,
    historicalEvent
  };
}

// Generates liturgical information for any month and year (2026, 2027, 2028, 2029, 2030, and beyond)
export function getLiturgicalMonth(year: number, month: number): LiturgicalDayInfo[] {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const result: LiturgicalDayInfo[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
    result.push(getLiturgicalDayInfo(year, month, day));
  }

  return result;
}

