export interface CountryCatholicData {
  id: string;
  name: string;
  code: string;
  flag: string;
  continent: 'Americas' | 'Europe' | 'Africa' | 'Asia' | 'Oceania';
  totalPopulation: number;
  catholicPopulation: number;
  catholicPercentage: number;
  primaryArchdiocese: string;
  yearEstablished: string;
  notableFact: string;
}

export interface InterestingChurchFact {
  id: string;
  category: 'Science and Discovery' | 'Global Humanitarian' | 'Vatican and Papacy' | 'Rites and Liturgy' | 'Art and Culture' | 'Miracles and Mysteries';
  title: string;
  shortSummary: string;
  detailedText: string;
  metric?: string;
  metricLabel?: string;
  keyFigure?: string;
  scriptureOrSource?: string;
}

export const GLOBAL_CATHOLIC_STATISTICS = {
  totalCatholics: 1389573000,
  formattedTotal: '1.39 Billion',
  percentageOfWorld: 17.7,
  dailyMassesOffered: 415000,
  parishesWorldwide: 221740,
  diocesesAndPrelatures: 3030,
  totalBishops: 5353,
  totalPriests: 407872,
  permanentDeacons: 50150,
  religiousSisters: 599228,
  religiousBrothers: 49176,
  majorSeminarians: 108481,
  institutions: {
    schoolsAndKindergartens: 141250,
    studentsEducated: 35400000,
    catholicUniversities: 1358,
    hospitals: 5405,
    dispensariesAndClinics: 14207,
    careHomesForElderlyAndDisabled: 15476,
    orphanagesAndNurseries: 9374
  },
  continentalDistribution: [
    { continent: 'Americas', percentage: 48.0, catholics: 667000000, color: '#D97706', growthRate: '+0.4% / yr' },
    { continent: 'Europe', percentage: 20.3, catholics: 282000000, color: '#2563EB', growthRate: '-0.2% / yr' },
    { continent: 'Africa', percentage: 19.3, catholics: 268000000, color: '#16A34A', growthRate: '+3.1% / yr (Fastest)' },
    { continent: 'Asia', percentage: 11.0, catholics: 153000000, color: '#9333EA', growthRate: '+1.5% / yr' },
    { continent: 'Oceania', percentage: 0.8, catholics: 11000000, color: '#EA580C', growthRate: '+0.8% / yr' }
  ]
};

export const COUNTRIES_CATHOLIC_DATA: CountryCatholicData[] = [
  // 100% - 90%
  {
    id: 'va',
    name: 'Vatican City',
    code: 'VAT',
    flag: '🇻🇦',
    continent: 'Europe',
    totalPopulation: 825,
    catholicPopulation: 825,
    catholicPercentage: 100.0,
    primaryArchdiocese: 'Diocese of Rome (Holy See)',
    yearEstablished: 'AD 33',
    notableFact: 'The spiritual epicenter of the Catholic Church and smallest sovereign nation in the world.'
  },
  {
    id: 'tl',
    name: 'Timor-Leste (East Timor)',
    code: 'TLS',
    flag: '🇹🇱',
    continent: 'Asia',
    totalPopulation: 1340000,
    catholicPopulation: 1306000,
    catholicPercentage: 97.5,
    primaryArchdiocese: 'Archdiocese of Dili',
    yearEstablished: '1515 AD',
    notableFact: 'Highest percentage Catholic population in Asia; the Church was vital in their struggle for independence.'
  },
  {
    id: 'sm',
    name: 'San Marino',
    code: 'SMR',
    flag: '🇸🇲',
    continent: 'Europe',
    totalPopulation: 34000,
    catholicPopulation: 31000,
    catholicPercentage: 91.5,
    primaryArchdiocese: 'Diocese of San Marino-Montefeltro',
    yearEstablished: 'AD 301',
    notableFact: 'Founded by Saint Marinus, a Christian stonecutter escaping Diocletian persecutions.'
  },
  {
    id: 'mt',
    name: 'Malta',
    code: 'MLT',
    flag: '🇲🇹',
    continent: 'Europe',
    totalPopulation: 520000,
    catholicPopulation: 468000,
    catholicPercentage: 90.0,
    primaryArchdiocese: 'Archdiocese of Malta',
    yearEstablished: 'AD 60',
    notableFact: 'St. Paul was shipwrecked on Malta (Acts 28); has 365 churches—one for each day of the year.'
  },
  {
    id: 'py',
    name: 'Paraguay',
    code: 'PRY',
    flag: '🇵🇾',
    continent: 'Americas',
    totalPopulation: 7400000,
    catholicPopulation: 6512000,
    catholicPercentage: 88.0,
    primaryArchdiocese: 'Archdiocese of Asunción',
    yearEstablished: '1537 AD',
    notableFact: 'Famous for the 17th-century Jesuit Reductions protecting indigenous Guaraní people.'
  },
  {
    id: 'ad',
    name: 'Andorra',
    code: 'AND',
    flag: '🇦🇩',
    continent: 'Europe',
    totalPopulation: 80000,
    catholicPopulation: 70400,
    catholicPercentage: 88.0,
    primaryArchdiocese: 'Diocese of Urgell',
    yearEstablished: 'AD 400',
    notableFact: 'One of Andorra\'s co-princes is the Catholic Bishop of Urgell in Spain.'
  },
  {
    id: 'pl',
    name: 'Poland',
    code: 'POL',
    flag: '🇵🇱',
    continent: 'Europe',
    totalPopulation: 37750000,
    catholicPopulation: 32080000,
    catholicPercentage: 85.0,
    primaryArchdiocese: 'Archdiocese of Gniezno / Warsaw / Kraków',
    yearEstablished: 'AD 966',
    notableFact: 'Baptism of Mieszko I in 966 founded Poland; homeland of Pope St. John Paul II and St. Faustina.'
  },
  {
    id: 'hr',
    name: 'Croatia',
    code: 'HRV',
    flag: '🇭🇷',
    continent: 'Europe',
    totalPopulation: 3880000,
    catholicPopulation: 3220000,
    catholicPercentage: 83.0,
    primaryArchdiocese: 'Archdiocese of Zagreb',
    yearEstablished: 'AD 641',
    notableFact: 'Historic bastion of Catholic faith in Southeastern Europe (*Antemurale Christianitatis*).'
  },
  {
    id: 'ph',
    name: 'Philippines',
    code: 'PHL',
    flag: '🇵🇭',
    continent: 'Asia',
    totalPopulation: 115500000,
    catholicPopulation: 93500000,
    catholicPercentage: 81.0,
    primaryArchdiocese: 'Archdiocese of Manila / Cebu',
    yearEstablished: '1521 AD',
    notableFact: 'Largest Catholic nation in Asia (#3 in the world); first Mass celebrated on Limasawa in 1521.'
  },
  {
    id: 'pt',
    name: 'Portugal',
    code: 'PRT',
    flag: '🇵🇹',
    continent: 'Europe',
    totalPopulation: 10300000,
    catholicPopulation: 8240000,
    catholicPercentage: 80.0,
    primaryArchdiocese: 'Patriarchate of Lisbon / Braga',
    yearEstablished: 'AD 300',
    notableFact: 'Home to the world-renowned Sanctuary of Our Lady of Fátima.'
  },
  {
    id: 'co',
    name: 'Colombia',
    code: 'COL',
    flag: '🇨🇴',
    continent: 'Americas',
    totalPopulation: 51800000,
    catholicPopulation: 40920000,
    catholicPercentage: 79.0,
    primaryArchdiocese: 'Archdiocese of Bogotá',
    yearEstablished: '1508 AD',
    notableFact: 'Home of the miraculous salt cathedral of Zipaquirá and Our Lady of the Rosary of Chiquinquirá.'
  },
  {
    id: 'it',
    name: 'Italy',
    code: 'ITA',
    flag: '🇮🇹',
    continent: 'Europe',
    totalPopulation: 58850000,
    catholicPopulation: 46500000,
    catholicPercentage: 79.0,
    primaryArchdiocese: 'Diocese of Rome / Archdiocese of Milan',
    yearEstablished: 'AD 40',
    notableFact: 'Has produced more canonized saints and popes than any other country in Christendom.'
  },
  {
    id: 'mx',
    name: 'Mexico',
    code: 'MEX',
    flag: '🇲🇽',
    continent: 'Americas',
    totalPopulation: 128500000,
    catholicPopulation: 100230000,
    catholicPercentage: 78.0,
    primaryArchdiocese: 'Archdiocese of Mexico',
    yearEstablished: '1519 AD',
    notableFact: 'Second largest Catholic population in the world; Basilica of Our Lady of Guadalupe draws 20M pilgrims annually.'
  },
  {
    id: 'ec',
    name: 'Ecuador',
    code: 'ECU',
    flag: '🇪🇨',
    continent: 'Americas',
    totalPopulation: 18000000,
    catholicPopulation: 13860000,
    catholicPercentage: 77.0,
    primaryArchdiocese: 'Archdiocese of Quito',
    yearEstablished: '1534 AD',
    notableFact: 'First nation in the world officially consecrated to the Sacred Heart of Jesus (1874).'
  },
  {
    id: 'pe',
    name: 'Peru',
    code: 'PER',
    flag: '🇵🇪',
    continent: 'Americas',
    totalPopulation: 34000000,
    catholicPopulation: 25840000,
    catholicPercentage: 76.0,
    primaryArchdiocese: 'Archdiocese of Lima',
    yearEstablished: '1532 AD',
    notableFact: 'Birthplace of St. Rose of Lima (first canonized saint of the Americas) and St. Martin de Porres.'
  },
  {
    id: 'ie',
    name: 'Ireland',
    code: 'IRL',
    flag: '🇮🇪',
    continent: 'Europe',
    totalPopulation: 5120000,
    catholicPopulation: 3740000,
    catholicPercentage: 73.0,
    primaryArchdiocese: 'Archdiocese of Armagh / Dublin',
    yearEstablished: 'AD 432',
    notableFact: 'Evangelized by Saint Patrick; Irish monks re-evangelized continental Europe after the barbarian invasions.'
  },
  {
    id: 'ar',
    name: 'Argentina',
    code: 'ARG',
    flag: '🇦🇷',
    continent: 'Americas',
    totalPopulation: 46000000,
    catholicPopulation: 32660000,
    catholicPercentage: 71.0,
    primaryArchdiocese: 'Archdiocese of Buenos Aires',
    yearEstablished: '1536 AD',
    notableFact: 'Native homeland of Pope Francis; home of the Eucharistic Miracle of Buenos Aires (1996).'
  },
  {
    id: 've',
    name: 'Venezuela',
    code: 'VEN',
    flag: '🇻🇪',
    continent: 'Americas',
    totalPopulation: 28800000,
    catholicPopulation: 20160000,
    catholicPercentage: 70.0,
    primaryArchdiocese: 'Archdiocese of Caracas',
    yearEstablished: '1513 AD',
    notableFact: 'Home to the Marian sanctuary of Our Lady of Coromoto, Patroness of Venezuela.'
  },
  {
    id: 'bo',
    name: 'Bolivia',
    code: 'BOL',
    flag: '🇧🇴',
    continent: 'Americas',
    totalPopulation: 12200000,
    catholicPopulation: 8540000,
    catholicPercentage: 70.0,
    primaryArchdiocese: 'Archdiocese of Sucre',
    yearEstablished: '1538 AD',
    notableFact: 'Cathedral Basilica of Our Lady of Peace in Potosí was one of the grandest colonial cathedrals.'
  },
  {
    id: 'lt',
    name: 'Lithuania',
    code: 'LTU',
    flag: '🇱🇹',
    continent: 'Europe',
    totalPopulation: 2800000,
    catholicPopulation: 2016000,
    catholicPercentage: 72.0,
    primaryArchdiocese: 'Archdiocese of Vilnius',
    yearEstablished: '1387 AD',
    notableFact: 'Hill of Crosses stands as a world monument of Catholic resistance against Soviet totalitarianism.'
  },
  {
    id: 'br',
    name: 'Brazil',
    code: 'BRA',
    flag: '🇧🇷',
    continent: 'Americas',
    totalPopulation: 215000000,
    catholicPopulation: 133300000,
    catholicPercentage: 62.0,
    primaryArchdiocese: 'Archdiocese of São Sebastião do Rio de Janeiro',
    yearEstablished: '1500 AD',
    notableFact: 'Largest total Catholic population of any country on Earth (over 133 million faithful).'
  },
  {
    id: 'cd',
    name: 'Democratic Republic of Congo',
    code: 'COD',
    flag: '🇨🇩',
    continent: 'Africa',
    totalPopulation: 102000000,
    catholicPopulation: 51000000,
    catholicPercentage: 50.0,
    primaryArchdiocese: 'Archdiocese of Kinshasa',
    yearEstablished: '1491 AD',
    notableFact: 'Largest Catholic population in Africa; celebrated the historic beatification of Isidore Bakanja.'
  },
  {
    id: 'es',
    name: 'Spain',
    code: 'ESP',
    flag: '🇪🇸',
    continent: 'Europe',
    totalPopulation: 47800000,
    catholicPopulation: 26760000,
    catholicPercentage: 56.0,
    primaryArchdiocese: 'Archdiocese of Toledo / Madrid',
    yearEstablished: 'AD 40',
    notableFact: 'Tradition holds St. James preached in Spain; home of St. Teresa of Ávila, St. John of the Cross, and St. Ignatius.'
  },
  {
    id: 'cl',
    name: 'Chile',
    code: 'CHL',
    flag: '🇨🇱',
    continent: 'Americas',
    totalPopulation: 19600000,
    catholicPopulation: 10780000,
    catholicPercentage: 55.0,
    primaryArchdiocese: 'Archdiocese of Santiago de Chile',
    yearEstablished: '1541 AD',
    notableFact: 'Home of Saint Alberto Hurtado, apostle of workers and homeless children.'
  },
  {
    id: 'at',
    name: 'Austria',
    code: 'AUT',
    flag: '🇦🇹',
    continent: 'Europe',
    totalPopulation: 9100000,
    catholicPopulation: 4732000,
    catholicPercentage: 52.0,
    primaryArchdiocese: 'Archdiocese of Vienna',
    yearEstablished: 'AD 174',
    notableFact: 'Heart of the Habsburg Holy Roman Empire; St. Stephen\'s Cathedral in Vienna is an iconic Gothic symbol.'
  },
  {
    id: 'be',
    name: 'Belgium',
    code: 'BEL',
    flag: '🇧🇪',
    continent: 'Europe',
    totalPopulation: 11650000,
    catholicPopulation: 5825000,
    catholicPercentage: 50.0,
    primaryArchdiocese: 'Archdiocese of Mechelen-Brussels',
    yearEstablished: 'AD 300',
    notableFact: 'Famous for Saint Damien of Molokai who ministered to lepers in Hawaii, and Fr. Georges Lemaître.'
  },
  {
    id: 'fr',
    name: 'France',
    code: 'FRA',
    flag: '🇫🇷',
    continent: 'Europe',
    totalPopulation: 68000000,
    catholicPopulation: 32640000,
    catholicPercentage: 48.0,
    primaryArchdiocese: 'Archdiocese of Paris / Lyon (Primate of the Gauls)',
    yearEstablished: 'AD 177',
    notableFact: 'Historically called the "Eldest Daughter of the Church" (*Fille aînée de l\'Église*); St. Joan of Arc, Lourdes, Paray-le-Monial.'
  },
  {
    id: 'gq',
    name: 'Equatorial Guinea',
    code: 'GNQ',
    flag: '🇬🇶',
    continent: 'Africa',
    totalPopulation: 1670000,
    catholicPopulation: 1470000,
    catholicPercentage: 88.0,
    primaryArchdiocese: 'Archdiocese of Malabo',
    yearEstablished: '1856 AD',
    notableFact: 'Highest percentage of Catholics on the African continent.'
  },
  {
    id: 'sc',
    name: 'Seychelles',
    code: 'SYC',
    flag: '🇸🇨',
    continent: 'Africa',
    totalPopulation: 100000,
    catholicPopulation: 76000,
    catholicPercentage: 76.0,
    primaryArchdiocese: 'Diocese of Port Victoria',
    yearEstablished: '1852 AD',
    notableFact: 'Island nation with an overwhelmingly Catholic French Creole cultural heritage.'
  },
  {
    id: 'ao',
    name: 'Angola',
    code: 'AGO',
    flag: '🇦🇴',
    continent: 'Africa',
    totalPopulation: 35500000,
    catholicPopulation: 19525000,
    catholicPercentage: 55.0,
    primaryArchdiocese: 'Archdiocese of Luanda',
    yearEstablished: '1491 AD',
    notableFact: 'King Afonso I of Kongo created the first indigenous African Christian kingdom in the early 1500s.'
  },
  {
    id: 'ug',
    name: 'Uganda',
    code: 'UGA',
    flag: '🇺🇬',
    continent: 'Africa',
    totalPopulation: 47200000,
    catholicPopulation: 18880000,
    catholicPercentage: 40.0,
    primaryArchdiocese: 'Archdiocese of Kampala',
    yearEstablished: '1879 AD',
    notableFact: 'Home of the Holy Uganda Martyrs (St. Charles Lwanga and companions), canonized in 1964.'
  },
  {
    id: 'tz',
    name: 'Tanzania',
    code: 'TZA',
    flag: '🇹🇿',
    continent: 'Africa',
    totalPopulation: 65500000,
    catholicPopulation: 20960000,
    catholicPercentage: 32.0,
    primaryArchdiocese: 'Archdiocese of Dar-es-Salaam',
    yearEstablished: '1868 AD',
    notableFact: 'Rapidly growing Catholic population with thousands of adult baptisms celebrated each Easter.'
  },
  {
    id: 'ke',
    name: 'Kenya',
    code: 'KEN',
    flag: '🇰🇪',
    continent: 'Africa',
    totalPopulation: 54000000,
    catholicPopulation: 17280000,
    catholicPercentage: 32.0,
    primaryArchdiocese: 'Archdiocese of Nairobi',
    yearEstablished: '1889 AD',
    notableFact: 'Hosts one of the largest networks of Catholic hospitals, schools, and refugee aid centers in East Africa.'
  },
  {
    id: 'ng',
    name: 'Nigeria',
    code: 'NGA',
    flag: '🇳🇬',
    continent: 'Africa',
    totalPopulation: 220000000,
    catholicPopulation: 26400000,
    catholicPercentage: 12.0,
    primaryArchdiocese: 'Archdiocese of Abuja / Lagos / Onitsha',
    yearEstablished: '1885 AD',
    notableFact: 'Has the highest recorded Sunday Mass attendance rate in the world (>94% of Catholics attend weekly).'
  },
  {
    id: 'de',
    name: 'Germany',
    code: 'DEU',
    flag: '🇩🇪',
    continent: 'Europe',
    totalPopulation: 84300000,
    catholicPopulation: 21600000,
    catholicPercentage: 25.6,
    primaryArchdiocese: 'Archdiocese of Cologne / Munich and Freising',
    yearEstablished: 'AD 300',
    notableFact: 'Cologne Cathedral holds the Relics of the Three Magi; homeland of Pope Benedict XVI.'
  },
  {
    id: 'us',
    name: 'United States',
    code: 'USA',
    flag: '🇺🇸',
    continent: 'Americas',
    totalPopulation: 335000000,
    catholicPopulation: 72000000,
    catholicPercentage: 21.5,
    primaryArchdiocese: 'Archdiocese of New York / Washington / Los Angeles',
    yearEstablished: '1565 AD',
    notableFact: 'Largest single religious denomination in the U.S.; operates over 6,000 schools and 650 hospitals.'
  },
  {
    id: 'ca',
    name: 'Canada',
    code: 'CAN',
    flag: '🇨🇦',
    continent: 'Americas',
    totalPopulation: 40000000,
    catholicPopulation: 12800000,
    catholicPercentage: 32.0,
    primaryArchdiocese: 'Archdiocese of Quebec / Toronto',
    yearEstablished: '1534 AD',
    notableFact: 'Basilica of Sainte-Anne-de-Beaupré in Quebec is a renowned North American pilgrimage shrine.'
  },
  {
    id: 'au',
    name: 'Australia',
    code: 'AUS',
    flag: '🇦🇺',
    continent: 'Oceania',
    totalPopulation: 26000000,
    catholicPopulation: 5200000,
    catholicPercentage: 20.0,
    primaryArchdiocese: 'Archdiocese of Sydney / Melbourne',
    yearEstablished: '1803 AD',
    notableFact: 'Largest single Christian denomination in Australia; home of Saint Mary MacKillop.'
  },
  {
    id: 'in',
    name: 'India',
    code: 'IND',
    flag: '🇮🇳',
    continent: 'Asia',
    totalPopulation: 1428000000,
    catholicPopulation: 21420000,
    catholicPercentage: 1.5,
    primaryArchdiocese: 'Archdiocese of Bombay / Ernakulam-Angamaly (Syro-Malabar)',
    yearEstablished: 'AD 52',
    notableFact: 'St. Thomas the Apostle arrived in Kerala in AD 52; home to the ancient Syro-Malabar and Syro-Malankara Eastern Catholic Rites.'
  },
  {
    id: 'vn',
    name: 'Vietnam',
    code: 'VNM',
    flag: '🇻🇳',
    continent: 'Asia',
    totalPopulation: 98000000,
    catholicPopulation: 7350000,
    catholicPercentage: 7.5,
    primaryArchdiocese: 'Archdiocese of Hanoi / Ho Chi Minh City',
    yearEstablished: '1533 AD',
    notableFact: '117 Vietnamese Martyrs canonized in 1988; Our Lady of La Vang is deeply revered.'
  },
  {
    id: 'kr',
    name: 'South Korea',
    code: 'KOR',
    flag: '🇰🇷',
    continent: 'Asia',
    totalPopulation: 51700000,
    catholicPopulation: 5950000,
    catholicPercentage: 11.5,
    primaryArchdiocese: 'Archdiocese of Seoul',
    yearEstablished: '1784 AD',
    notableFact: 'Uniquely founded by lay scholars studying books before any foreign priest entered the country.'
  },
  {
    id: 'lb',
    name: 'Lebanon',
    code: 'LBN',
    flag: '🇱🇧',
    continent: 'Asia',
    totalPopulation: 5500000,
    catholicPopulation: 1650000,
    catholicPercentage: 30.0,
    primaryArchdiocese: 'Maronite Patriarchate of Antioch (Bkerké)',
    yearEstablished: 'AD 400',
    notableFact: 'Home of the Maronite Catholic Church and Saint Charbel Makhlouf, whose tomb is visited by millions.'
  },
  {
    id: 'gb',
    name: 'United Kingdom',
    code: 'GBR',
    flag: '🇬🇧',
    continent: 'Europe',
    totalPopulation: 67500000,
    catholicPopulation: 5400000,
    catholicPercentage: 8.0,
    primaryArchdiocese: 'Archdiocese of Westminster / St Andrews and Edinburgh',
    yearEstablished: 'AD 180 / 597',
    notableFact: 'St. Augustine of Canterbury arrived in 597; home of St. Thomas More and St. John Henry Newman.'
  },
  {
    id: 'jp',
    name: 'Japan',
    code: 'JPN',
    flag: '🇯🇵',
    continent: 'Asia',
    totalPopulation: 125000000,
    catholicPopulation: 500000,
    catholicPercentage: 0.4,
    primaryArchdiocese: 'Archdiocese of Tokyo / Nagasaki',
    yearEstablished: '1549 AD',
    notableFact: 'Evangelized by St. Francis Xavier; "Hidden Christians" (*Kakure Kirishitan*) kept the faith secret for 250 years without priests.'
  }
];

export const INTERESTING_CHURCH_FACTS: InterestingChurchFact[] = [
  {
    id: 'humanitarian-network',
    category: 'Global Humanitarian',
    title: 'The World’s Largest Non-Governmental Healthcare and Educational Network',
    shortSummary: 'The Catholic Church operates over 140,000 schools and 19,000 medical clinics worldwide.',
    detailedText: 'No single organization on planet Earth educates more children, treats more sick patients, or cares for more impoverished elderly people than the Catholic Church. Catholic Charities and Caritas Internationalis operate in over 200 countries, providing immediate emergency relief, food distribution, and long-term economic development regardless of a recipient\'s religion, race, or nationality.',
    metric: '141,000+ Schools · 5,400+ Hospitals',
    metricLabel: 'Global Institutional Footprint',
    keyFigure: 'Caritas Internationalis and Catholic Religious Orders',
    scriptureOrSource: 'Pontifical Yearbook (Annuario Pontificio)'
  },
  {
    id: 'big-bang-theory',
    category: 'Science and Discovery',
    title: 'The Father of the Big Bang Was a Catholic Priest and Physicist',
    shortSummary: 'Father Georges Lemaître formulated the expanding universe and the cosmic primeval atom hypothesis in 1927.',
    detailedText: 'Belgian Catholic priest, astronomer, and professor of physics Monsignor Georges Lemaître proposed what is now universally known as the Big Bang Theory. When Albert Einstein first heard Lemaître’s calculation from general relativity, he initially resisted, but later publicly applauded Lemaître, stating: "This is the most beautiful and satisfactory explanation of creation to which I have ever listened."',
    metric: '1927 AD',
    metricLabel: 'Birth of Modern Cosmology',
    keyFigure: 'Fr. Georges Lemaître (1894–1966)',
    scriptureOrSource: 'Annales de la Société Scientifique de Bruxelles'
  },
  {
    id: 'father-of-genetics',
    category: 'Science and Discovery',
    title: 'The Father of Modern Genetics Was an Augustinian Catholic Friar',
    shortSummary: 'Gregor Mendel discovered the fundamental laws of genetic inheritance in his monastery garden.',
    detailedText: 'Between 1856 and 1863, Augustinian friar and abbot Gregor Mendel cultivated over 28,000 pea plants at St. Thomas\'s Abbey in Brno. His discoveries on dominant and recessive traits, published in 1866, established the foundational principles of modern genetics and heredity upon which all contemporary biotechnology and molecular medicine rest.',
    metric: '28,000 Plants Studied',
    metricLabel: 'Monastic Scientific Rigor',
    keyFigure: 'Abbot Gregor Johann Mendel, O.S.A.',
    scriptureOrSource: 'Versuche über Pflanzen-Hybriden (1866)'
  },
  {
    id: 'unbroken-apostolic-line',
    category: 'Vatican and Papacy',
    title: '266 Popes in an Unbroken Apostolic Chain for 2,000 Years',
    shortSummary: 'The papacy is the oldest continuously functioning office and governing institution in human civilization.',
    detailedText: 'From Saint Peter receiving the Keys of the Kingdom of Heaven from Jesus Christ (Matthew 16:18-19) to Pope Francis today, the Chair of Peter has endured through the Roman Empire, barbarian invasions, the collapse of feudalism, the Renaissance, the French Revolution, Nazi totalitarianism, and the Cold War. It remains entirely self-sustaining without a standing army.',
    metric: '266 Successors',
    metricLabel: 'Uninterrupted Apostolic Lineage',
    keyFigure: 'From St. Peter to Pope Francis',
    scriptureOrSource: 'Matthew 16:18-19; Liber Pontificalis'
  },
  {
    id: 'smallest-sovereign-nation',
    category: 'Vatican and Papacy',
    title: 'Vatican City: Zero Debt, Latin ATMs, and 100% UNESCO Heritage',
    shortSummary: 'Measuring just 121 acres (0.49 km²), Vatican City is the only country entirely recognized as a UNESCO World Heritage site.',
    detailedText: 'Established under the Lateran Treaty of 1929, Vatican City State has zero national debt, operates its own postal system, railway station, pharmacy, radio station (broadcasting in over 40 languages), and mints its own official Euro coins. Its bank ATMs offer on-screen prompts in Classical Latin, and it is guarded by the Pontifical Swiss Guard, the world’s oldest active military corps founded in 1506.',
    metric: '0.49 km²',
    metricLabel: 'Independent Sovereign State',
    keyFigure: 'Pontifical Swiss Guard (Est. 1506)',
    scriptureOrSource: 'Lateran Treaty (1929)'
  },
  {
    id: 'twenty-four-rites',
    category: 'Rites and Liturgy',
    title: 'The Catholic Church Consists of 24 Autonomous Churches in One',
    shortSummary: '1 Western Latin Rite and 23 Eastern Catholic Churches exist in complete sacramental communion.',
    detailedText: 'Many assume Catholicism is solely the Western Roman Rite. In truth, the universal Catholic Church is a communion of 24 distinct, self-governing (*sui iuris*) apostolic churches. These include the Byzantine Rite (Ukrainian Greek, Melkite, Romanian), the Antiochene Rite (Maronite, Syro-Malankara), the Alexandrian Rite (Coptic, Ethiopian), and the East Syrian Rite (Chaldean, Syro-Malabar), each preserving ancient liturgical traditions in full unity under the Pope.',
    metric: '24 Churches sui iuris',
    metricLabel: 'One Faith, Diverse Liturgies',
    keyFigure: 'Code of Canons of the Eastern Churches (CCEO)',
    scriptureOrSource: 'Orientalium Ecclesiarum (Vatican II)'
  },
  {
    id: 'gregorian-calendar',
    category: 'Science and Discovery',
    title: 'The Worldwide Calendar You Use Was Created by the Catholic Church',
    shortSummary: 'Pope Gregory XIII and Jesuit astronomers designed the Gregorian Calendar in 1582.',
    detailedText: 'Because the ancient Julian calendar drifted by one day every 128 years, the liturgical celebration of Easter was slowly moving away from the spring equinox. Pope Gregory XIII gathered top mathematicians and Jesuit astronomers (including Father Christopher Clavius) to formulate the leap-year algorithm we use globally today. When promulgated in October 1582, ten days were skipped to restore astronomical accuracy.',
    metric: '1582 AD',
    metricLabel: 'Global Standard Timekeeping',
    keyFigure: 'Pope Gregory XIII and Fr. Christopher Clavius, S.J.',
    scriptureOrSource: 'Papal Bull Inter Gravissimas (1582)'
  },
  {
    id: 'daily-masses-worldwide',
    category: 'Rites and Liturgy',
    title: 'Over 400,000 Holy Masses Are Offered Around the World Every Single Day',
    shortSummary: 'At every second of every hour, the Holy Sacrifice of the Mass is being celebrated somewhere on Earth.',
    detailedText: 'Fulfilling the prophecy of the Prophet Malachi—"For from the rising of the sun to its setting my name is great among the nations, and in every place incense is offered to my name, and a pure offering" (Malachi 1:11)—the Catholic Church celebrates approximately 415,000 Eucharistic liturgies each day. As the Earth rotates across time zones, the sacrifice of Calvary is perpetually re-presented without pause.',
    metric: '415,000 Masses / Day',
    metricLabel: 'Perpetual Adoration and Sacrifice',
    keyFigure: '407,000+ Ordained Priests',
    scriptureOrSource: 'Malachi 1:11; CCC 1330'
  },
  {
    id: 'preservation-of-western-civilization',
    category: 'Art and Culture',
    title: 'Monks Preserved Western Literature, Agriculture, and Classical Philosophy',
    shortSummary: 'Catholic scriptoria preserved Aristotle, Cicero, Plato, and the Bible after the collapse of the Roman Empire.',
    detailedText: 'Following the fall of Rome, Western civilization faced the loss of literacy and classical texts. Catholic Benedictine, Cistercian, and Celtic monks hand-copied hundreds of thousands of biblical and philosophical manuscripts in scriptoria. Monasteries also pioneered beer brewing, champagne (Dom Pérignon was a Benedictine monk), watermill technology, metallurgy, and the first university systems in Bologna, Paris, and Oxford.',
    metric: '100% of Classical Heritage',
    metricLabel: 'Hand-Copied Monastic Heritage',
    keyFigure: 'St. Benedict, Cassiodorus and Medieval Monks',
    scriptureOrSource: 'Thomas Woods, How the Catholic Church Built Western Civilization'
  },
  {
    id: 'scientific-eucharistic-miracles',
    category: 'Miracles and Mysteries',
    title: 'Modern Forensic Science Has Verified Ancient Eucharistic Miracles',
    shortSummary: 'Independent laboratory analyses of hosts in Lanciano, Buenos Aires, and Sokolka revealed living AB human heart tissue.',
    detailedText: 'In 1970 and 1981, Professor Odoardo Linoli (chief pathologist and professor of anatomy) performed microscopic and biological testing on the 8th-century Eucharistic Miracle of Lanciano. His findings confirmed that the flesh is striated muscular myocardium (human heart wall tissue), and the blood is real human type AB blood with active proteins, preserved for 1,200 years without chemical preservatives. Similar AB heart tissue findings were documented in Buenos Aires (1996) and Sokolka (2008).',
    metric: 'Type AB Blood and Heart Myocardium',
    metricLabel: 'Independent Forensic Verification',
    keyFigure: 'Prof. Odoardo Linoli and Dr. Frederic Zugibe',
    scriptureOrSource: 'Quaderni Sclavo di Diagnostica Clinica e di Laboratorio'
  }
];
