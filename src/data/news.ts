import { CatholicNewsItem } from '../types';
import { getMassReadingsForDate } from './massReadings';

export const CATHOLIC_NEWS_DATABASE: CatholicNewsItem[] = [
  {
    id: 'news-vatican-general-audience-hope-eucharist',
    title: 'The Eucharist as the Living Source of Christian Hope',
    subtitle: 'Holy Father at Vatican Catechesis: Daily prayer and the Holy Sacrifice disarm anxiety and lift the soul upright toward heaven',
    summary: 'In St. Peter\'s Square, the Holy Father delivered a stirring catechesis on supernatural hope and today\'s Gospel (Luke 13:10-17), urging the universal Church to rediscover the contemplative silence of Eucharistic adoration and concrete fraternal mercy.',
    content: `VATICAN CITY — Addressing tens of thousands of faithful gathered in St. Peter's Square, the Holy Father continued his cycle of catechesis on the Holy Spirit, Christian Hope, and the healing power of the Most Holy Eucharist.

"Dear brothers and sisters," the Pope began, "in the letters of Saint Paul, we discover that Christian hope is not mere optimism or a vague wish that things might improve. No! Hope is an anchor cast into the very heart of the Blessed Trinity, forged in the Paschal Mystery of Christ."

Reflecting on the Gospel of Monday of the Thirtieth Week in Ordinary Time (Luke 13:10-17)—where Jesus lays His hands upon the woman bent over for eighteen years so that she immediately stands erect and glorifies God—the Holy Father invited pilgrims to gaze upon the Holy Eucharist, the sacramental reality where heaven touches earth.

"How often the worries, sins, and griefs of this world bend our backs toward the dust!" the Pontiff observed. "Yet when we enter the church and kneel before the tabernacle or approach the altar, Jesus sees us first, calls us forward, and lays His pierced hands upon our hearts. When the priest elevates the Sacred Host and the chalice of salvation, time opens to eternity, and the soul is lifted upright as a child of light (Ephesians 5:8)."

"What disarms the anxieties of modern life?" the Pontiff asked. "It is not louder chatter, nor endless digital noise. It is quiet adoration before the Golden Monstrance and the tabernacle. Let us make space in our parishes and families for Eucharistic adoration, for where Christ is adored, peace takes root."

Concluding the audience, the Pope led pilgrims in chanting the Pater Noster and imparted his Apostolic Blessing upon all the sick, elderly, and pilgrims gathered.`,
    category: 'Vatican',
    author: 'Vatican News Editorial Staff',
    date: 'October 26, 2026',
    readTime: '3 min read',
    source: 'Vatican Media and Holy See Press Office',
    tags: ['Vatican', 'Pope', 'Eucharist', 'Hope', 'Luke 13:10-17', 'St. Peter\'s Square']
  },
  {
    id: 'news-vatican-pope-st-evaristus-roman-tituli-2026',
    title: 'Rome Commemorates Pope St. Evaristus, Early Martyr Pontiff Who Established the Eternal City\'s First Parishes',
    subtitle: 'Liturgical commemoration near the Tomb of St. Peter recalls the fifth Bishop of Rome and the Apostolic roots of parish life',
    summary: 'On the October 26 feast of Pope Saint Evaristus (r. c. 99–107), Vatican historians and Roman pastors celebrated the first-century Martyr-Pope who organized Rome into presbyteral tituli and appointed the seven deacons.',
    content: `VATICAN CITY — In the Vatican Grottoes near the confession of Saint Peter, clergy and pilgrims commemorated the liturgical feast of Pope Saint Evaristus (October 26), the fifth Supreme Pontiff after Saint Peter, who governed the Church during the reign of Emperor Trajan.

As recorded in the ancient Liber Pontificalis and Butler's Lives of the Saints, Saint Evaristus—born at Bethlehem of a Hellenic-Jewish father and educated in Greek letters—divided the city of Rome into distinct parish titles (tituli), assigning priests to each sanctuary so that the faithful might be nourished daily with the Word of God and the Holy Eucharist even amidst imperial persecution.

"Every Catholic parish in the world today stands in unbroken continuity with those first Roman house-churches organized by Pope Saint Evaristus," noted the Archpriest of St. Peter's Basilica. "Watered by the blood of the early popes and martyrs, the parish remains the sanctuary where the Risen Lord gathers His beloved children into light."`,
    category: 'Saints and Faith',
    author: 'L\'Osservatore Romano',
    date: 'October 26, 2026',
    readTime: '4 min read',
    source: 'Vatican Media and Pontifical Committee for Historical Sciences',
    tags: ['Pope St. Evaristus', 'Vatican Grottoes', 'Early Church', 'Roman Parishes', 'Martyrs']
  },
  {
    id: 'news-vatican-st-john-paul-ii-memorial-2026',
    title: 'Vatican Celebrates Legacy of Pope St. John Paul II: "Open Wide the Doors for Christ!"',
    subtitle: 'Solemn Mass at the Altar of St. Sebastian in St. Peter\'s Basilica honors the Polish Pontiff\'s Eucharistic and Marian legacy',
    summary: 'Cardinals, bishops, and thousands of pilgrims gathered at the tomb of Pope Saint John Paul II in St. Peter\'s Basilica, recalling his call for fearless Christian witness and devotion to the Blessed Sacrament.',
    content: `VATICAN CITY — At the Altar of Saint Sebastian in St. Peter's Basilica—where the relics of Pope Saint John Paul II rest beneath the marble altar—prelates and pilgrims gathered in thanksgiving for the life and magisterium of the great Polish Pope.

"From his youth in Wadowice and underground seminary in Kraków to his twenty-seven years on the Chair of Peter, his secret was found on his knees before the Golden Monstrance and in his total consecration to Mary: Totus Tuus," the homilist proclaimed.

The Vatican Dicastery for the Causes of Saints also highlighted how Saint John Paul II's final encyclical, Ecclesia de Eucharistia, continues to inspire a worldwide resurgence of Perpetual Adoration chapels and solemn Eucharistic Benedictions among young Catholics across every continent.`,
    category: 'Vatican',
    author: 'Vatican News Editorial Staff',
    date: 'October 25, 2026',
    readTime: '4 min read',
    source: 'Vatican Media and Holy See Press Office',
    tags: ['Vatican', 'St. John Paul II', 'Eucharist', 'St. Peter\'s Basilica', 'Totus Tuus']
  },
  {
    id: 'news-vatican-holy-father-luke12-fire-of-love',
    title: 'Holy Father on Today\'s Gospel: Christ\'s Fire Purifies the Heart from Worldly Lukewarmness',
    subtitle: 'Reflecting on Luke 12:49-53 and Ephesians 3:14-21, the Pope invites the faithful to root their lives in the breadth and depth of Christ\'s charity',
    summary: 'Meditating on the liturgy of Thursday of the Twenty-Ninth Week in Ordinary Time, the Holy Father explained that the "fire" Jesus casts upon the earth is the Holy Spirit poured out from the pierced Heart of the Redeemer.',
    content: `VATICAN CITY — Reflecting on today's liturgical readings from Saint Paul's Letter to the Ephesians (3:14-21) and the Holy Gospel according to Luke (12:49-53), the Holy Father urged Christians not to settle for a mediocre, comfortable faith.

"When Jesus cries out, 'I have come to set the earth on fire, and how I wish it were already blazing!' He is speaking of the consuming flame of Trinitarian charity," the Pope observed. "The world offers many counterfeit sparks that dazzle for a moment and leave cold ashes behind. Only the fire of the Holy Spirit—kindled at our Baptism and nourished at the Altar in the Most Holy Eucharist—warms the human soul for eternity."

Pointing to Saint Paul's prayer on bended knee before the Father, the Pontiff invited every Catholic family to kneel before the Blessed Sacrament today: "Let us bow our knees before the Father, so that Christ may dwell in our hearts through faith, and that we may comprehend with all the saints the breadth and length and height and depth of the love of Christ, which surpasses all knowledge."`,
    category: 'Vatican',
    author: 'Vatican Media Desk',
    date: 'October 22, 2026',
    readTime: '3 min read',
    source: 'Holy See Press Office',
    tags: ['Vatican', 'Pope', 'Daily Homily', 'Gospel of Luke', 'Holy Spirit', 'Eucharist']
  },
  {
    id: 'news-vatican-benediction-liturgical-adoration-directive',
    title: 'Dicastery for Divine Worship Encourages Solemn Eucharistic Benediction and Parish Holy Hours',
    subtitle: 'New pastoral note highlights the traditional beauty of the Monstrance, altar candelabras, incense, and the Tantum Ergo',
    summary: 'The Dicastery for Divine Worship and the Discipline of the Sacraments has published a pastoral reflection encouraging cathedrals, shrines, and parishes to restore solemn Eucharistic Exposition and Benediction.',
    content: `VATICAN CITY — The Dicastery for Divine Worship and the Discipline of the Sacraments has issued a warm pastoral encouragement to bishops and parish pastors worldwide, emphasizing the spiritual fruitfulness of solemn Eucharistic Adoration and Benediction of the Most Blessed Sacrament.

Recalling the centuries-old tradition of the Church, the document underscores how the sacred signs surrounding Exposition—the ornate golden monstrance enthroned upon the altar, the flanking lighted candelabras, the rising clouds of frankincense, and the chanting of St. Thomas Aquinas's Eucharistic hymns O Salutaris Hostia and Tantum Ergo—educate the senses and awaken profound reverence for the Real Presence.

"When the priest, veiled in the humeral veil, traces the Sign of the Cross over the kneeling faithful with the Sacred Host and leads the Divine Praises ('Blessed be God, Blessed be His Holy Name'), heaven and earth unite in reparation and thanksgiving," the Dicastery noted. Parishes that have instituted weekly Thursday Holy Hours report a marked renewal in sacramental Confession and family peace.`,
    category: 'Saints and Faith',
    author: 'L\'Osservatore Romano',
    date: 'October 22, 2026',
    readTime: '4 min read',
    source: 'Dicastery for Divine Worship',
    tags: ['Eucharistic Adoration', 'Benediction', 'Monstrance', 'Liturgy', 'Divine Praises']
  },
  {
    id: 'news-vatican-pontifical-academy-family-consecration',
    title: 'Holy See Highlights Domestic Church Renewal Through Family Prayer and Evening Rosary',
    subtitle: 'Dicastery for Laity, Family and Life shares global testimonies of households consecrated to the Holy Family of Nazareth',
    summary: 'A new report from Rome showcases how families praying the Rosary, the Angelus, and daily Scripture readings together are experiencing deeper unity and resilience.',
    content: `VATICAN CITY — The Dicastery for Laity, Family and Life has released a compendium of testimonies from dioceses across five continents demonstrating the transformative power of daily family prayer within the "domestic church."

Inspired by Pope Saint John Paul II's Apostolic Exhortation Familiaris Consortio ("The future of humanity passes by way of the family"), parishes have been promoting the Act of Consecration to the Holy Family of Nazareth alongside daily recitation of the Holy Rosary and the Three Hail Marys.

"Where parents and children kneel together for even ten minutes each evening before an image of the Sacred Heart and Our Lady, resentment melts away and vocations to marriage and the priesthood flourish," the Dicastery affirmed.`,
    category: 'Global Church',
    author: 'Vatican Information Service',
    date: 'October 22, 2026',
    readTime: '3 min read',
    source: 'Dicastery for Laity, Family and Life',
    tags: ['Holy Family', 'Domestic Church', 'Family Rosary', 'Vatican']
  },
  {
    id: 'news-vatican-peace-appeal-shrines',
    title: 'Holy See Issues Solemn Worldwide Appeal for Ceasefire and Protection of Sacred Shrines',
    subtitle: 'Secretariat of State calls all dioceses and perpetual adoration chapels to unite in holy intercession',
    summary: 'Cardinal Pietro Parolin has released an urgent Vatican communique urging nations in conflict to respect consecrated sanctuaries and protect innocent civilian lives through dialogue.',
    content: `VATICAN CITY — The Vatican Secretariat of State has issued a formal appeal calling upon international leaders to halt the escalation of military hostility and guarantee the absolute neutrality and protection of churches, monasteries, hospitals, and sacred cultural heritage.

"In a world tempted by retribution and armed division, the silence of the altar is the true bastion of human dignity," the Holy See document affirmed. Parishes across the globe are invited to celebrate votive Masses for Peace and organize all-night vigils of Eucharistic adoration.

International shrines—including the Shrine of Our Lady of Fatima in Portugal, the Basilica of Lourdes in France, and the Polish sanctuary of Niepokalanów—have united in a synchronized prayer chain connecting millions of devotees in common prayer.`,
    category: 'Vatican',
    author: 'L\'Osservatore Romano',
    date: 'October 21, 2026',
    readTime: '4 min read',
    source: 'L\'Osservatore Romano',
    tags: ['Vatican', 'Peace', 'Diplomacy', 'Shrines', 'Adoration']
  },
  {
    id: 'news-vatican-eastern-churches-solidarity',
    title: 'Dicastery for the Eastern Churches Launches Urgent Aid and Scholarship Initiative for Holy Land Christians',
    subtitle: 'Supporting Catholic schools, hospitals, and parishes in Jerusalem, Bethlehem, and Galilee',
    summary: 'The Prefect of the Dicastery for the Eastern Churches announced new pastoral and humanitarian grants to sustain ancient Christian communities in the Holy Land.',
    content: `VATICAN CITY — The Dicastery for the Eastern Churches, in collaboration with the Franciscan Custody of the Holy Land and the Latin Patriarchate of Jerusalem, has announced an expanded solidarity fund to support Christian families, schools, and clinics across the Holy Land.

"The living stones of the Mother Church of Jerusalem guard the very places where Our Lord walked, suffered, died, and rose from the dead," the Prefect stated. "Our spiritual and material closeness ensures that the lamps of prayer before the Holy Sepulchre and the Basilica of the Nativity never go out."`,
    category: 'Culture and Charity',
    author: 'Vatican News Desk',
    date: 'October 21, 2026',
    readTime: '3 min read',
    source: 'Dicastery for the Eastern Churches',
    tags: ['Holy Land', 'Jerusalem', 'Eastern Churches', 'Charity']
  },
  {
    id: 'news-vatican-gospel-vigilance-2026',
    title: 'Holy Father at Morning Mass: Live with Girded Loins and Burning Lamps in Joyful Vigilance',
    subtitle: 'Reflecting on Luke 12:35-38, the Pope calls faithful to active charity and interior purity of heart',
    summary: 'At morning Mass in the Vatican, the Holy Father urged Christians to avoid spiritual slumber and lukewarmness, remaining ready to open the door immediately when Christ knocks in the needy and in daily prayer.',
    content: `VATICAN CITY — In his homily, the Holy Father meditated upon the Gospel of the vigilant servants awaiting their Master's return from the wedding feast (Luke 12:35-38).

"What does it mean to have our loins girded?" the Pope asked. "It means to be spiritually awake, untangled from the petty obsessions and anxieties of this fleeting world. And our burning lamps are the light of faith manifest through concrete works of mercy. Faith without love is a cold, extinguished wick; but faith active in charity illuminates the darkest nights of humanity."

The Holy Father underscored the astonishing humility of the Master, who 'will gird himself and make them sit down to meat, and will come forth and serve them.' "Behold our God: He does not come to subjugate us, but to serve us with His very Body and Blood! Let us run to Eucharistic adoration and the Sacrament of Reconciliation with renewed confidence."`,
    category: 'Vatican',
    author: 'Vatican News Editorial Staff',
    date: 'October 20, 2026',
    readTime: '3 min read',
    source: 'Vatican Media',
    tags: ['Vatican', 'Pope', 'Homily', 'Eucharist', 'Gospel']
  },
  {
    id: 'news-vatican-eucharist-revival-report',
    title: 'Holy See Highlights Global Eucharistic Revival and Fruits of Parish Adoration',
    subtitle: 'Dicastery for Evangelization emphasizes the central role of Eucharistic devotion in parish renewal worldwide',
    summary: 'The Dicastery for Evangelization has released a pastoral letter emphasizing how perpetual adoration chapels and parish holy hours are revitalizing vocations and families across five continents.',
    content: `VATICAN CITY — The Holy See has issued a comprehensive report praising the extraordinary spiritual fruits emerging from nationwide and parish-level Eucharistic initiatives across North America, Latin America, Europe, Africa, and Asia.

In an address delivered to bishops and apostolic delegates, cardinal officials noted that parishes maintaining regular Eucharistic adoration chapels have witnessed a noticeable resurgence in priestly vocations and youthful devotion to the sacraments.

"The real, living presence of Jesus Christ in the Most Blessed Sacrament is not a relic of centuries past, but the beating heart of the Church today," the Dicastery stated. The document urges pastors to provide regular access to silent adoration, solemn benedictions, and reverent celebrations of the Sacred Liturgy.`,
    category: 'Vatican',
    author: 'Vatican News Editorial Staff',
    date: 'October 20, 2026',
    readTime: '3 min read',
    source: 'Vatican Information Service',
    tags: ['Vatican', 'Eucharist', 'Adoration', 'Evangelization']
  },
  {
    id: 'news-mission-sunday-preparations',
    title: 'Global Church Celebrates World Mission Sunday and Courageous Lay Catechists',
    subtitle: 'Dicastery for Evangelization reports surge in lay catechists and mission volunteers worldwide',
    summary: 'Parishes across the globe celebrate the heroic witness of missionary saints and support developing dioceses with direct prayers and apostolic sponsorships.',
    content: `ROME — The Pontifical Mission Societies announced that missionary collections and direct apostolic sponsorships have reached new participation highs across young churches in Asia, Africa, and Latin America.

Special tributes honored the North American Martyrs—Saints Jean de Brébeuf, Isaac Jogues, and companions—whose memorial inspires contemporary missionaries facing religious persecution.

"Mission is not marketing; it is a radiant contagion of divine love," noted Cardinal Luis Antonio Tagle. "When a soul experiences the Eucharistic love of Jesus, it cannot remain silent."`,
    category: 'Global Church',
    author: 'Fides News Agency',
    date: 'October 19, 2026',
    readTime: '3 min read',
    source: 'Agenzia Fides',
    tags: ['Missions', 'Evangelization', 'Saints', 'Charity']
  },
  {
    id: 'news-synod-caritas-solace',
    title: 'Catholic Relief Agencies Expand Aid and Spiritual Care in Conflict Zones',
    subtitle: 'Caritas Internationalis mobilizes aid convoys while local priests and religious remain with suffering communities',
    summary: 'Faith-based aid organizations are delivering emergency relief, clean water, medical supplies, and pastoral solace to hundreds of thousands of displaced families.',
    content: `ROME — Highlighting the Church's unwavering mission to the marginalized and afflicted, Caritas Internationalis alongside local episcopal conferences has coordinated massive humanitarian operations across regions torn by conflict and natural disaster.

Local Catholic missionaries, sisters of Mother Teresa's Missionaries of Charity, and parish priests have chosen to remain in active conflict zones to administer the sacraments, run soup kitchens, and provide shelter within consecrated church compounds.

"Our presence is first and foremost the presence of Christ the Consoler," stated Archbishop Gabriel, regional coordinator. "When bread is broken with the starving, Christ is adored."`,
    category: 'Culture and Charity',
    author: 'Catholic News Agency',
    date: 'October 18, 2026',
    readTime: '4 min read',
    source: 'Catholic News Agency',
    tags: ['Charity', 'Caritas', 'Missions', 'Persecuted Christians']
  }
];

export const DAILY_ROTATING_VATICAN_DISPATCHES: Omit<CatholicNewsItem, 'id' | 'date'>[] = [
  {
    title: 'Dicastery for Divine Worship Encourages Solemn Eucharistic Benediction and Parish Holy Hours',
    subtitle: 'Pastoral note highlights the traditional beauty of the Monstrance, altar candelabras, incense, and the Tantum Ergo',
    summary: 'The Dicastery for Divine Worship and the Discipline of the Sacraments has published a pastoral reflection encouraging cathedrals, shrines, and parishes to restore solemn Eucharistic Exposition and Benediction.',
    content: `VATICAN CITY — The Dicastery for Divine Worship and the Discipline of the Sacraments has issued a warm pastoral encouragement to bishops and parish pastors worldwide, emphasizing the spiritual fruitfulness of solemn Eucharistic Adoration and Benediction of the Most Blessed Sacrament.

Recalling the centuries-old tradition of the Church, the document underscores how the sacred signs surrounding Exposition—the ornate golden monstrance enthroned upon the altar, the flanking lighted candelabras, the rising clouds of frankincense, and the chanting of St. Thomas Aquinas's Eucharistic hymns O Salutaris Hostia and Tantum Ergo—educate the senses and awaken profound reverence for the Real Presence.

"When the priest, veiled in the humeral veil, traces the Sign of the Cross over the kneeling faithful with the Sacred Host and leads the Divine Praises ('Blessed be God, Blessed be His Holy Name'), heaven and earth unite in reparation and thanksgiving," the Dicastery noted.`,
    category: 'Vatican',
    author: 'L\'Osservatore Romano',
    readTime: '4 min read',
    source: 'Dicastery for Divine Worship',
    tags: ['Eucharistic Adoration', 'Benediction', 'Monstrance', 'Liturgy']
  },
  {
    title: 'Holy See Highlights Domestic Church Renewal Through Family Prayer and Evening Rosary',
    subtitle: 'Dicastery for Laity, Family and Life shares global testimonies of households consecrated to the Holy Family of Nazareth',
    summary: 'A new report from Rome showcases how families praying the Rosary, the Angelus, and daily Scripture readings together are experiencing deeper unity and resilience.',
    content: `VATICAN CITY — The Dicastery for Laity, Family and Life has released a compendium of testimonies from dioceses across five continents demonstrating the transformative power of daily family prayer within the "domestic church."

Inspired by Pope Saint John Paul II's Apostolic Exhortation Familiaris Consortio ("The future of humanity passes by way of the family"), parishes have been promoting the Act of Consecration to the Holy Family of Nazareth alongside daily recitation of the Holy Rosary and the Three Hail Marys.

"Where parents and children kneel together for even ten minutes each evening before an image of the Sacred Heart and Our Lady, resentment melts away and vocations to marriage and the priesthood flourish," the Dicastery affirmed.`,
    category: 'Global Church',
    author: 'Vatican Information Service',
    readTime: '3 min read',
    source: 'Dicastery for Laity, Family and Life',
    tags: ['Holy Family', 'Domestic Church', 'Family Rosary', 'Vatican']
  },
  {
    title: 'Pontifical Commission for Sacred Archaeology Unveils Restored Early Christian Frescoes in Roman Catacombs',
    subtitle: 'Third-century Eucharistic and Marian imagery bears witness to the unbroken faith of the early martyrs',
    summary: 'Newly conserved frescoes in the Catacombs of Rome depict the Multiplication of the Loaves and the Virgin Mary in prayer, confirming first-millennium devotion to the Eucharist and the Mother of God.',
    content: `VATICAN CITY — The Pontifical Commission for Sacred Archaeology has presented newly restored third- and fourth-century frescoes in the Roman catacombs, revealing vibrant depictions of the Eucharistic banquet, the Good Shepherd, and the Orans figure of the Blessed Virgin Mary.

"These subterranean sanctuaries were not places of gloom, but chambers of resurrection hope where the early Christians celebrated the sacred mysteries near the tombs of the martyrs," explained the Commission's president. "Across seventeen centuries, the Catholic Church professes the exact same faith in the Real Presence of Christ and the maternal intercession of Mary."`,
    category: 'Saints and Faith',
    author: 'Vatican News Cultural Desk',
    readTime: '4 min read',
    source: 'Pontifical Commission for Sacred Archaeology',
    tags: ['Catacombs', 'Early Church', 'Sacred Art', 'Martyrs', 'Rome']
  },
  {
    title: 'Papal Almoner Expands St. Peter\'s Square Medical Clinics and Shelters for the Poor',
    subtitle: 'Dicastery for the Service of Charity brings concrete corporal and spiritual works of mercy to Rome\'s vulnerable',
    summary: 'Under the colonnade of Bernini in St. Peter\'s Square, volunteer physicians, religious sisters, and seminarians provide daily healthcare, warm meals, and pastoral listening to the homeless.',
    content: `VATICAN CITY — The Dicastery for the Service of Charity (Office of the Papal Almoner) has expanded its Mother of Mercy medical clinic located directly beneath the colonnade of St. Peter's Square, adding dental, ophthalmological, and pharmacy services for indigent families and the homeless.

"Charity is the caress of the Church toward her suffering children," the Papal Almoner stated. "When we bind up the physical wounds of a brother or sister in need, we touch the sacred wounds of Jesus Himself."`,
    category: 'Culture and Charity',
    author: 'Vatican Media Desk',
    readTime: '3 min read',
    source: 'Dicastery for the Service of Charity',
    tags: ['Charity', 'Works of Mercy', 'St. Peter\'s Square', 'Vatican']
  },
  {
    title: 'Vatican Apostolic Library Digitizes Ancient Illuminated Missals and Patristic Manuscripts',
    subtitle: 'Making the spiritual and liturgical treasury of the Church freely accessible to scholars and faithful worldwide',
    summary: 'High-resolution scans of medieval Sacramentaries, Gregorian chant antiphonaries, and manuscripts of the Church Fathers have been added to the Vatican Library\'s digital portal.',
    content: `VATICAN CITY — The Vatican Apostolic Library has announced the completion of a major digitization milestone, adding hundreds of illuminated liturgical manuscripts, ancient Bibles, and patristic treatises of St. Augustine, St. Jerome, and St. Thomas Aquinas to its public digital archives.

"From the founding of the Vatican Library in the fifteenth century, the Popes have sought to preserve the heritage of faith and human wisdom for every generation," the Prefect of the Library noted.`,
    category: 'Saints and Faith',
    author: 'L\'Osservatore Romano',
    readTime: '3 min read',
    source: 'Vatican Apostolic Library',
    tags: ['Vatican Library', 'Manuscripts', 'Church Fathers', 'Gregorian Chant']
  },
  {
    title: 'International Marian Shrines Unite in Worldwide Rosary Relay for Peace and Conversion',
    subtitle: 'From Lourdes, Fatima, and Niepokalanów to Guadalupe and Knock, sanctuaries link in 24-hour intercession',
    summary: 'Thousands of pilgrims gathered by candlelight at the world\'s major Marian shrines to pray the Holy Rosary and the Angel\'s Prayer of Fatima for world peace.',
    content: `VATICAN CITY — Coordinated with the Sanctuary Section of the Dicastery for Evangelization, major Marian shrines across every time zone united in a continuous 24-hour chain of Eucharistic Adoration and Rosary recitation.

From the Grotto of Massabielle in Lourdes and the Capelinha of Fatima to the Sanctuary of Saint Maximilian Kolbe in Niepokalanów, Poland, and the Basilica of Our Lady of Guadalupe in Mexico City, faithful implored the Queen of Peace to protect families and bring conversion of heart.`,
    category: 'Global Church',
    author: 'Vatican News Editorial Staff',
    readTime: '3 min read',
    source: 'Dicastery for Evangelization',
    tags: ['Marian Shrines', 'Rosary', 'Peace', 'Fatima', 'Lourdes', 'Niepokalanów']
  }
];

function formatLongDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(num => parseInt(num, 10));
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return `${monthNames[(month || 10) - 1]} ${day || 22}, ${year || 2026}`;
}

export function getDailyVaticanNews(dateStr: string): CatholicNewsItem[] {
  const dateFormatted = formatLongDate(dateStr);
  const reading = getMassReadingsForDate(dateStr);

  const eucharistFirstStory: CatholicNewsItem = {
    ...CATHOLIC_NEWS_DATABASE[0],
    date: dateFormatted
  };

  if (dateStr === '2026-10-22') {
    return [eucharistFirstStory, ...CATHOLIC_NEWS_DATABASE.slice(1)];
  }

  const [year, month, day] = dateStr.split('-').map(num => parseInt(num, 10));
  const seed = (year || 2026) * 372 + (month || 10) * 31 + (day || 22);

  const dailyLeadStory: CatholicNewsItem = {
    id: `news-daily-liturgy-${dateStr}`,
    title: `Vatican Daily Dispatch: Celebrating ${reading.liturgicalDay}`,
    subtitle: `Holy Father reflects on ${reading.gospel.citation} and calls the universal Church to Eucharistic adoration and active charity`,
    summary: `In today's Vatican meditation for ${reading.liturgicalDay}, the Holy Father invited the faithful to ponder the Holy Gospel (${reading.gospel.citation}) and draw strength from the Real Presence of Jesus in the Most Blessed Sacrament.`,
    content: `VATICAN CITY — On ${dateFormatted}, as the universal Church celebrates ${reading.liturgicalDay}, the Holy Father offered a pastoral meditation on the day's Liturgy of the Word, centering on the First Reading (${reading.firstReading.citation}), Responsorial Psalm (${reading.responsorialPsalm.citation}), and Holy Gospel (${reading.gospel.citation}).

"${reading.reflection?.content || 'In every page of the Gospel, Christ speaks directly to the human heart today, inviting us out of fear and into the radiant peace of His Eucharistic presence,'}" the Vatican commentary observed.

Pilgrims gathered in St. Peter's Basilica joined in praying the Responsorial Psalm antiphon—"${reading.responsorialPsalm.antiphon}"—before kneeling in silent adoration before the Blessed Sacrament exposed upon the altar.`,
    category: 'Vatican',
    author: 'Vatican News Editorial Staff',
    date: dateFormatted,
    readTime: '3 min read',
    source: 'Vatican Media and Holy See Press Office',
    tags: ['Vatican', 'Daily Homily', reading.gospel.citation, 'Eucharist', 'Liturgy']
  };

  const dispatchATemplate = DAILY_ROTATING_VATICAN_DISPATCHES[seed % DAILY_ROTATING_VATICAN_DISPATCHES.length];
  const dispatchBTemplate = DAILY_ROTATING_VATICAN_DISPATCHES[(seed + 2) % DAILY_ROTATING_VATICAN_DISPATCHES.length];

  const dailyStory2: CatholicNewsItem = {
    ...dispatchATemplate,
    id: `news-daily-dispatch-a-${dateStr}`,
    date: dateFormatted
  };

  const dailyStory3: CatholicNewsItem = {
    ...dispatchBTemplate,
    id: `news-daily-dispatch-b-${dateStr}`,
    date: dateFormatted
  };

  const remainingArchive = CATHOLIC_NEWS_DATABASE.slice(1).filter(
    item => item.title !== dailyStory2.title && item.title !== dailyStory3.title
  );

  return [eucharistFirstStory, dailyLeadStory, dailyStory2, dailyStory3, ...remainingArchive];
}

export function getTopVaticanHeadline(dateStr: string): CatholicNewsItem {
  const dailyNews = getDailyVaticanNews(dateStr);
  return dailyNews[0];
}
