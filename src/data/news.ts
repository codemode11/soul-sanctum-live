import { CatholicNewsItem } from '../types';
import { getMassReadingsForDate } from './massReadings';

export const CATHOLIC_NEWS_DATABASE: CatholicNewsItem[] = [
  {
    id: 'news-vatican-general-audience-hope-eucharist',
    title: 'The Eucharist as the Living Source of Christian Hope',
    subtitle: 'Holy Father at Vatican Catechesis: Daily prayer and the Holy Sacrifice disarm anxiety and lift the soul upright toward heaven',
    summary: 'In St. Peter\'s Square, the Holy Father delivered a stirring catechesis on supernatural hope and the Gospel, urging the universal Church to rediscover the contemplative silence of Eucharistic adoration and concrete fraternal mercy.',
    content: `VATICAN CITY — Addressing tens of thousands of faithful gathered in St. Peter's Square, the Holy Father continued his cycle of catechesis on the Holy Spirit, Christian Hope, and the healing power of the Most Holy Eucharist.

"Dear brothers and sisters," the Pope began, "in the letters of Saint Paul, we discover that Christian hope is not mere optimism or a vague wish that things might improve. No! Hope is an anchor cast into the very heart of the Blessed Trinity, forged in the Paschal Mystery of Christ."

Reflecting on the Gospel of Our Lord laying His healing hands upon the afflicted so that the soul immediately stands erect and glorifies God, the Holy Father invited pilgrims to gaze upon the Holy Eucharist, the sacramental reality where heaven touches earth.

"How often the worries, sins, and griefs of this world bend our backs toward the dust!" the Pontiff observed. "Yet when we enter the church and kneel before the tabernacle or approach the altar, Jesus sees us first, calls us forward, and lays His pierced hands upon our hearts. When the priest elevates the Sacred Host and the chalice of salvation, time opens to eternity, and the soul is lifted upright as a child of light."

"What disarms the anxieties of modern life?" the Pontiff asked. "It is not louder chatter, nor endless digital noise. It is quiet adoration before the Golden Monstrance and the tabernacle. Let us make space in our parishes and families for Eucharistic adoration, for where Christ is adored, peace takes root."

Concluding the audience, the Pope led pilgrims in chanting the Pater Noster and imparted his Apostolic Blessing upon all the sick, elderly, and pilgrims gathered.`,
    category: 'Vatican',
    author: 'Vatican News Editorial Staff',
    date: 'October 26, 2026',
    readTime: '3 min read',
    source: 'Vatican Media and Holy See Press Office',
    tags: ['Vatican', 'Pope', 'Eucharist', 'Hope', 'St. Peter\'s Square']
  },
  {
    id: 'news-vatican-pope-st-evaristus-roman-tituli-2026',
    title: 'Rome Commemorates Pope St. Evaristus, Early Martyr Pontiff Who Established the Eternal City\'s First Parishes',
    subtitle: 'Liturgical commemoration near the Tomb of St. Peter recalls the fifth Bishop of Rome and the Apostolic roots of parish life',
    summary: 'On the feast of Pope Saint Evaristus (r. c. 99–107), Vatican historians and Roman pastors celebrated the first-century Martyr-Pope who organized Rome into presbyteral tituli and appointed the seven deacons.',
    content: `VATICAN CITY — In the Vatican Grottoes near the confession of Saint Peter, clergy and pilgrims commemorated the liturgical feast of Pope Saint Evaristus, the fifth Supreme Pontiff after Saint Peter, who governed the Church during the reign of Emperor Trajan.

As recorded in the ancient Liber Pontificalis, Saint Evaristus—born at Bethlehem of a Hellenic-Jewish father and educated in Greek letters—divided the city of Rome into distinct parish titles (tituli), assigning priests to each sanctuary so that the faithful might be nourished daily with the Word of God and the Holy Eucharist even amidst imperial persecution.

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
    title: 'Holy Father on the Gospel: Christ\'s Fire Purifies the Heart from Worldly Lukewarmness',
    subtitle: 'Reflecting on Sacred Scripture, the Pope invites the faithful to root their lives in the breadth and depth of Christ\'s charity',
    summary: 'Meditating on the sacred liturgy, the Holy Father explained that the "fire" Jesus casts upon the earth is the Holy Spirit poured out from the pierced Heart of the Redeemer.',
    content: `VATICAN CITY — Reflecting on the liturgical readings, the Holy Father urged Christians not to settle for a mediocre, comfortable faith.

"When Jesus cries out, 'I have come to set the earth on fire, and how I wish it were already blazing!' He is speaking of the consuming flame of Trinitarian charity," the Pope observed. "The world offers many counterfeit sparks that dazzle for a moment and leave cold ashes behind. Only the fire of the Holy Spirit—kindled at our Baptism and nourished at the Altar in the Most Holy Eucharist—warms the human soul for eternity."

Pointing to Saint Paul's prayer on bended knee before the Father, the Pontiff invited every Catholic family to kneel before the Blessed Sacrament today: "Let us bow our knees before the Father, so that Christ may dwell in our hearts through faith, and that we may comprehend with all the saints the breadth and length and height and depth of the love of Christ, which surpasses all knowledge."`,
    category: 'Vatican',
    author: 'Vatican Media Desk',
    date: 'October 22, 2026',
    readTime: '3 min read',
    source: 'Holy See Press Office',
    tags: ['Vatican', 'Pope', 'Daily Homily', 'Holy Spirit', 'Eucharist']
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
  }
];

export function formatLongDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(num => parseInt(num, 10));
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return `${monthNames[(month || 11) - 1]} ${day || 4}, ${year || 2026}`;
}

/**
 * Curated Pool of Holy See Dicastery Directives (Story 2)
 */
const DICASTERY_DIRECTIVES = [
  {
    title: 'Dicastery for Divine Worship: The Reverence of Sacred Silence and Gregorian Chant at Holy Mass',
    subtitle: 'Vatican pastoral note calls for elevating liturgical music and recovering sacred silence before the Eucharistic mystery',
    summary: 'The Dicastery for Divine Worship and the Discipline of the Sacraments has published pastoral recommendations urging parishes to foster moments of interior silence and authentic liturgical music during the Holy Sacrifice of the Mass.',
    content: `VATICAN CITY — Reaffirming the Second Vatican Council's Constitution on the Sacred Liturgy Sacrosanctum Concilium, the Dicastery for Divine Worship has issued a pastoral letter addressed to cathedral chapters and diocesan liturgical commissions.

"Sacred silence is not merely an absence of noise, but the quiet reverence of the soul standing in the presence of the Living God," stated Cardinal Arthur Roche, Prefect of the Dicastery. "When the priest and faithful pause in silent prayer after the homily and Holy Communion, the Holy Spirit deepens the interior assimilation of the Word and the Real Presence."

The document also commends parishes that cultivate Gregorian chant, the Church's native liturgical song, alongside polyphonic choral traditions that lift the human spirit above earthly banality into the celestial courts of the heavenly Jerusalem.`,
    category: 'Vatican' as const,
    author: 'L\'Osservatore Romano',
    source: 'Dicastery for Divine Worship and the Discipline of the Sacraments',
    tags: ['Liturgy', 'Vatican', 'Sacred Music', 'Gregorian Chant', 'Silence']
  },
  {
    title: 'Dicastery for the Doctrine of the Faith: The Primacy of Grace and the Living Magisterium',
    subtitle: 'Holy Office highlights the organic harmony between Sacred Scripture, Apostolic Tradition, and the Catechism',
    summary: 'The Dicastery for the Doctrine of the Faith emphasizes that Catholic dogma is the living deposit of divine revelation entrusted by Christ to His Church, protecting the faithful from theological confusion.',
    content: `VATICAN CITY — In a formal doctrinal clarification approved by the Holy Father, the Dicastery for the Doctrine of the Faith underscored the unbreakable bond uniting Sacred Scripture, Apostolic Tradition, and the teaching office of the Church.

"The deposit of faith is not an assortment of philosophical opinions subject to shifting cultural trends," the Dicastery noted. "Rather, as taught in Dei Verbum, Holy Mother Church receives the Word of God with filial devotion, faithfully guarding and expounding it through the guidance of the Holy Spirit."

Pastors are encouraged to utilize the Catechism of the Catholic Church in preaching and parochial instruction, offering clear doctrinal nourishment to young people seeking the certainty of divine truth amidst moral relativism.`,
    category: 'Vatican' as const,
    author: 'Holy See Press Office',
    source: 'Dicastery for the Doctrine of the Faith',
    tags: ['Doctrine', 'Vatican', 'Catechism', 'Magisterium', 'Faith']
  },
  {
    title: 'Dicastery for Evangelization: Worldwide Preparations for the Holy Year Pilgrimages of Hope',
    subtitle: 'Registration opens for thousands of youth delegations visiting the Four Major Roman Basilicas and the Holy Doors',
    summary: 'Coordinators at the Vatican Dicastery for Evangelization announced the expansion of pilgrimage corridors, pilgrim welcoming centers, and confession stations across Rome in preparation for the Jubilee.',
    content: `VATICAN CITY — Archbishop Rino Fisichella, Pro-Prefect of the Dicastery for Evangelization, announced the completion of major logistics and spiritual itineraries for the global Jubilee of Hope.

Special confession chapels staffed by multi-lingual priests have been prepared in the Papal Basilicas—St. Peter's in the Vatican, St. John Lateran, St. Mary Major, and St. Paul Outside the Walls—allowing pilgrims to pass through the Holy Doors with purified hearts and obtain the customary Plenary Indulgence.

"Pilgrimage is an ancient Christian act of conversion," Archbishop Fisichella remarked. "Walking along the Via Francigena or kneeling at the tombs of the Apostles Peter and Paul rekindles in the pilgrim the conviction that we are all on a sacred journey toward the Father's eternal embrace."`,
    category: 'Global Church' as const,
    author: 'Vatican Information Service',
    source: 'Dicastery for Evangelization',
    tags: ['Jubilee of Hope', 'Rome', 'Pilgrimage', 'Holy Door', 'Confession']
  },
  {
    title: 'Dicastery for the Causes of Saints: New Decrees of Heroic Virtue and Martyrdom Announced',
    subtitle: 'Holy Father authorizes promulgation of decrees honoring twentieth-century martyrs and lay apostles',
    summary: 'The Vatican Dicastery for the Causes of Saints has advanced several causes for canonization, celebrating ordinary men and women who lived extraordinary holiness in the midst of religious persecution.',
    content: `VATICAN CITY — During an audience granted to Cardinal Marcello Semeraro, Prefect of the Dicastery for the Causes of Saints, the Holy Father authorized the promulgation of decrees advancing the causes of several venerables and servants of God.

Among the decrees are testimonies of lay men and women, fathers, mothers, and young religious who gave their lives in defense of the Catholic faith during totalitarian regimes, as well as missionary confessors whose unrecorded charity brought comfort to the sick and abandoned.

"Holiness is the truest face of the Church," Cardinal Semeraro declared. "These holy men and women remind us that sanctity is not reserved for a privileged few, but is the high standard of ordinary Christian living accessible to anyone who loves Christ."`,
    category: 'Saints and Faith' as const,
    author: 'Vatican News Desk',
    source: 'Dicastery for the Causes of Saints',
    tags: ['Canonization', 'Martyrs', 'Saints', 'Vatican', 'Holiness']
  },
  {
    title: 'Dicastery for Laity, Family and Life: Compendium of the Domestic Church and the Family Rosary',
    subtitle: 'Global initiative encourages evening family prayer, table blessings, and consecration to the Sacred Heart',
    summary: 'Testimonies gathered from dioceses across five continents reveal how simple daily routines of prayer—such as the evening Rosary and the Angelus—sustain Catholic marriages and foster priestly vocations.',
    content: `VATICAN CITY — The Dicastery for Laity, Family and Life has published a worldwide compendium celebrating the fruits of family prayer within the "domestic church."

Recalling Pope Saint John Paul II's Apostolic Exhortation Familiaris Consortio, the Dicastery emphasized that when parents and children gather to pray the Holy Rosary before an image of Our Lady, household anxieties are dispelled by supernatural peace.

"The Christian family is the first seminary and the sanctuary where children first learn the name of Jesus and the sign of the Cross," the document observes. Over 40,000 parishes have enrolled families in parish-based consecrations to the Holy Family of Nazareth.`,
    category: 'Global Church' as const,
    author: 'Vatican Media Staff',
    source: 'Dicastery for Laity, Family and Life',
    tags: ['Family', 'Domestic Church', 'Holy Rosary', 'Sacred Heart', 'Vatican']
  }
];

/**
 * Curated Pool of Global Eucharistic & Missionary Renewal Reports (Story 4)
 */
const EUCHARISTIC_MISSION_REPORTS = [
  {
    title: 'International Marian Shrines Unite in 24-Hour Eucharistic Adoration and Rosary for Peace',
    subtitle: 'From Lourdes and Fatima to Guadalupe and Niepokalanów, sanctuaries link in continuous worldwide prayer',
    summary: 'Sanctuaries across every time zone celebrated synchronized Holy Hours and candlelight processions, offering prayers before the Blessed Sacrament for peace and the conversion of sinners.',
    content: `VATICAN CITY — In coordination with the Sanctuary Section of the Holy See, major international shrines across five continents united in an unbroken 24-hour relay of Eucharistic Exposition and Holy Rosary recitation.

From the Grotto of Massabielle in Lourdes, France, and the Chapel of the Apparitions in Fatima, Portugal, to the Sanctuary of Saint Maximilian Kolbe in Niepokalanów, Poland, and the Basilica of Our Lady of Guadalupe in Mexico City, hundreds of thousands of pilgrims knelt before the Golden Monstrance.

"When we kneel before the Blessed Sacrament with Mary, we touch the source of all peace," the Rector of Fatima proclaimed. "In our troubled world, Eucharistic adoration is the most powerful spiritual shield available to humanity."`,
    category: 'Eucharist and Devotion' as const,
    author: 'Vatican News Editorial Staff',
    source: 'Dicastery for Evangelization (Sanctuary Section)',
    tags: ['Eucharistic Adoration', 'Fatima', 'Lourdes', 'Rosary', 'Peace', 'Niepokalanów']
  },
  {
    title: 'Global Resurgence of Perpetual Adoration Chapels Reported Across Dioceses Worldwide',
    subtitle: 'Episcopal conferences note striking rise in young adults taking nocturnal holy hours before the Tabernacle',
    summary: 'A new survey of diocesan cathedrals in the Americas, Europe, Africa, and Asia indicates a 35% increase in round-the-clock Eucharistic Adoration chapels over the past three years.',
    content: `ROME — Dioceses around the world are witnessing a vibrant revival of Perpetual Eucharistic Adoration, with parish chapels remaining open day and night for silent prayer.

Pastors report that young Catholics are volunteering in record numbers for nocturnal adoration hours between midnight and dawn. "Kneeling in total silence before the Eucharistic Face of Christ offers a peace that the digital world can never supply," testified a young university student in Madrid.

Bishops observe that parishes maintaining perpetual adoration report an immediate increase in confessions, matrimonial stability, and vocations to the holy priesthood and religious life.`,
    category: 'Eucharist and Devotion' as const,
    author: 'Catholic News Agency Desk',
    source: 'International Federation of Nocturnal Adoration',
    tags: ['Perpetual Adoration', 'Vocations', 'Youth', 'Holy Hour', 'Real Presence']
  },
  {
    title: 'African and Asian Missionary Dioceses Celebrate Surge in Baptisms and Lay Catechists',
    subtitle: 'Pontifical Mission Societies highlight courageous evangelization in frontier and rural regions',
    summary: 'Across emerging dioceses in East Africa, India, and Southeast Asia, thousands of adult catechumens have received the Sacraments of Christian Initiation through dedicated catechists.',
    content: `ROME — Agenzia Fides and the Pontifical Mission Societies have released their annual missionary overview, detailing the remarkable growth of the Catholic Church in mission territories.

Local bishops praised the tireless self-sacrifice of volunteer lay catechists who walk miles each Sunday to lead Liturgies of the Word and prepare families for Baptism and Holy Communion in rural chapels.

"Our catechists are the true vanguard of the Gospel," stated Archbishop Jean-Baptiste from central Africa. "They bring the light of Christ to communities that have never heard the Name of Jesus, demonstrating the living truth of the Great Commission."`,
    category: 'Global Church' as const,
    author: 'Fides News Agency',
    source: 'Pontifical Mission Societies',
    tags: ['Missions', 'Catechists', 'Baptism', 'Evangelization', 'Global Church']
  },
  {
    title: 'Solemn Corpus Christi and Eucharistic Processions Draw Millions Through Global Metropolises',
    subtitle: 'Public witness of faith brings Christ in the Blessed Sacrament through city streets and university campuses',
    summary: 'From New York and London to Manila and São Paulo, thousands of faithful walked in solemn Eucharistic procession singing the Tantum Ergo and kneeling for benediction.',
    content: `ROME — Reports from metropolitan archdioceses highlight the growing practice of outdoor Eucharistic processions through crowded city squares, financial districts, and university centers.

Preceded by incense, cross-bearers, and choirs chanting Gregorian hymns, the priest carries the Blessed Sacrament under an ornate canopy, blessing passersby, workers, and families gathered along the sidewalks.

"Bringing Jesus out of our churches and into the public streets reminds the world that He is the Lord of history," an auxiliary bishop reflected. "In the Blessed Sacrament, Christ meets humanity right where it lives and works."`,
    category: 'Eucharist and Devotion' as const,
    author: 'Vatican News Media',
    source: 'Episcopal Conferences International',
    tags: ['Eucharistic Procession', 'Corpus Christi', 'Benediction', 'Public Witness']
  }
];

/**
 * Curated Pool of Works of Mercy, Caritas & Sacred Culture Reports (Story 5)
 */
const CHARITY_AND_CULTURE_REPORTS = [
  {
    title: 'Papal Almoner Expands St. Peter\'s Square Medical Clinics and Winter Shelters for the Poor',
    subtitle: 'Dicastery for the Service of Charity brings concrete corporal and spiritual works of mercy to Rome\'s vulnerable',
    summary: 'Under the colonnade of Bernini in St. Peter\'s Square, volunteer physicians, religious sisters, and seminarians provide daily healthcare, warm meals, and pastoral listening to the homeless.',
    content: `VATICAN CITY — The Dicastery for the Service of Charity (Office of the Papal Almoner) has expanded its Mother of Mercy medical clinic located directly beneath the colonnade of St. Peter's Square, adding dental, ophthalmological, and pharmacy services for indigent families and the homeless.

Cardinal Konrad Krajewski, the Papal Almoner, personally supervises the distribution of warm coats, sleeping bags, and hygiene kits as temperatures drop across the Eternal City.

"Charity is the caress of the Church toward her suffering children," the Papal Almoner stated. "When we bind up the physical wounds of a brother or sister in need, we touch the sacred wounds of Jesus Himself. In every hungry person, Christ knocks at our door."`,
    category: 'Culture and Charity' as const,
    author: 'Vatican Media Desk',
    source: 'Dicastery for the Service of Charity',
    tags: ['Charity', 'Works of Mercy', 'St. Peter\'s Square', 'Papal Almoner', 'Vatican']
  },
  {
    title: 'Caritas Internationalis Coordinates Emergency Food and Medical Convoys in Conflict Zones',
    subtitle: 'Catholic relief network mobilizes across parish networks to sustain displaced and suffering families',
    summary: 'Caritas federations in over forty countries have deployed humanitarian workers, emergency medical kits, and clean water supplies to regions afflicted by war and natural disasters.',
    content: `ROME — Highlighting the Church's unwavering mission to the marginalized and afflicted, Caritas Internationalis has coordinated critical supply convoys delivering food, pediatric care, and trauma counseling to hundreds of thousands of refugees.

Local religious sisters, Missionaries of Charity, and parish priests have chosen to remain in danger zones to keep soup kitchens open and administer the Sacraments to those unable to flee.

"Our presence is first and foremost the presence of Christ the Consoler," stated a Caritas regional director. "When the Church breaks bread with the starving and shelters the orphan, the love of God becomes tangible in a broken world."`,
    category: 'Culture and Charity' as const,
    author: 'Catholic News Agency',
    source: 'Caritas Internationalis',
    tags: ['Caritas', 'Works of Mercy', 'Humanitarian Aid', 'Charity', 'Peace']
  },
  {
    title: 'Pontifical Commission for Sacred Archaeology Unveils Restored Early Christian Frescoes in Roman Catacombs',
    subtitle: 'Third-century Eucharistic and Marian imagery bears witness to the unbroken faith of the early martyrs',
    summary: 'Newly conserved frescoes in the Roman catacombs depict the Multiplication of the Loaves, the Good Shepherd, and the Blessed Virgin Mary in prayer, confirming first-millennium Catholic devotion.',
    content: `VATICAN CITY — The Pontifical Commission for Sacred Archaeology has presented newly restored third- and fourth-century frescoes in the Roman catacombs, revealing vibrant depictions of the Eucharistic banquet, the Good Shepherd carrying the lost sheep, and the Mother of God.

"These subterranean sanctuaries were not places of gloom, but chambers of resurrection hope where the early Christians celebrated the sacred mysteries near the tombs of the martyrs," explained the Commission's president.

"Across seventeen centuries, the Catholic Church professes the exact same faith in the Real Presence of Christ in the Eucharist and the maternal intercession of the Virgin Mary," the Vatican conservators noted.`,
    category: 'Culture and Charity' as const,
    author: 'Vatican News Cultural Desk',
    source: 'Pontifical Commission for Sacred Archaeology',
    tags: ['Catacombs', 'Sacred Art', 'Early Church', 'Martyrs', 'Archaeology', 'Rome']
  },
  {
    title: 'Vatican Apostolic Library Digitizes Ancient Illuminated Sacramentaries and Patristic Manuscripts',
    subtitle: 'Making the spiritual and liturgical treasury of the Church freely accessible to scholars and faithful worldwide',
    summary: 'High-resolution digital scans of medieval Missals, Gregorian chant antiphonaries, and manuscripts of the Church Fathers have been uploaded to the Vatican Library\'s public portal.',
    content: `VATICAN CITY — The Vatican Apostolic Library has completed a major milestone in its ongoing digital preservation project, providing scholars and faithful worldwide with open-access digital scans of hundreds of illuminated liturgical manuscripts.

Among the digitized treasures are tenth-century Carolingian Sacramentaries, illuminated antiphonaries with gold-leaf miniatures of the Annunciation and the Nativity, and ancient codices of Saint Augustine, Saint Jerome, and Saint Thomas Aquinas.

"Preserving and sharing the sacred heritage of faith is an act of spiritual stewardship," the Prefect of the Vatican Library noted. "These illuminated manuscripts show how our ancestors poured out their highest artistry to honor the Word of God."`,
    category: 'Culture and Charity' as const,
    author: 'L\'Osservatore Romano',
    source: 'Vatican Apostolic Library',
    tags: ['Vatican Library', 'Sacred Art', 'Manuscripts', 'Church Fathers', 'History']
  }
];

/**
 * Builds Story 1 (Papal Homily & Gospel Meditation) tailored specifically to the day's liturgy
 */
function buildDailyPapalGospelStory(dateStr: string, dateFormatted: string): CatholicNewsItem {
  const reading = getMassReadingsForDate(dateStr);
  const citation = reading.gospel.citation;
  const feast = reading.liturgicalDay;
  const gospelSnippet = reading.gospel.text.substring(0, 180).replace(/\n/g, ' ') + '...';

  // Customize headline and content based on the day's Gospel pericope
  let topicPhrase = 'Living the Gospel with Undivided Love';
  let papalMeditation = `Reflecting on the Holy Gospel (${citation}), the Holy Father invited pilgrims to open their hearts to Christ's living voice. "${reading.reflection?.content || 'In every page of the Gospel, Jesus speaks directly to the human heart today, inviting us to leave behind worldly anxiety and rest in the loving providence of the Heavenly Father.'}"`;

  if (citation.includes('15:1-10') || citation.includes('15:1')) {
    topicPhrase = 'The Boundless Joy in Heaven When the Lost Sinner Returns';
    papalMeditation = `Meditating on the parables of the Lost Sheep and the Lost Coin (Luke 15:1-10), the Holy Father reminded the faithful that God's mercy is never a passive sentiment, but an active, searching love. "The Good Shepherd does not wait in the sheepfold for the lost sheep to find its own way home," the Pope stressed. "No! He sets out into the wilderness, searches untiringly until He finds it, and carries it home upon His sacred shoulders with great rejoicing. This is the heart of the Gospel: there is more joy in heaven over one repentant sinner than over ninety-nine righteous who have no need of repentance."`;
  } else if (citation.includes('14:25-33') || citation.includes('14:27')) {
    topicPhrase = 'Calculating the True Cost of Discipleship and Carrying the Daily Cross';
    papalMeditation = `Addressing the crowds in St. Peter's Square on the Gospel of carrying one's cross (Luke 14:25-33), the Pope warned against a superficial or convenience-based Christianity. "Jesus does not deceive His disciples with illusions of easy comfort," the Pontiff emphasized. "He tells us with divine frankness: 'Whoever does not carry his own cross and come after me cannot be my disciple.' Following Christ requires us to renounce our selfish attachments and sit down, like the builder of the tower, to calculate the cost. But what we surrender in worldly pride, Christ replaces a hundredfold with the joy of His Holy Spirit."`;
  } else if (citation.includes('14:15-24') || citation.includes('14:16')) {
    topicPhrase = 'The Master\'s Banquet is Ready: Cast Aside the Excuses of Lukewarmness';
    papalMeditation = `Reflecting on the Parable of the Great Dinner (Luke 14:15-24), the Holy Father warned against allowing worldly busyness—fields, oxen, and domestic preoccupations—to become excuses for missing the Eucharistic supper. "The Master commands His servants: 'Go out quickly into the streets and alleys and bring in the poor, the crippled, the blind, and the lame.' The Kingdom of God is a banquet of divine grace for those who recognize their spiritual poverty and hunger for the Bread of Life."`;
  } else if (citation.includes('6:37-40')) {
    topicPhrase = 'The Resurrection and the Father\'s Will: Not One Soul Given to Christ Will Be Lost';
    papalMeditation = `In his homily on John 6:37-40, the Pope offered consolation to all who mourn the loss of departed loved ones. "Our Savior proclaims with absolute certainty: 'This is the will of the one who sent me, that I should not lose anything of what he gave me, but that I should raise it on the last day.' In the Holy Sacrifice of the Mass, heaven and earth embrace, and the souls of our faithful departed are refreshed by the Precious Blood of the Lamb."`;
  } else if (citation.includes('5:1-12') || citation.includes('5:1')) {
    topicPhrase = 'The Eight Beatitudes: The Portrait of Christ and the Ladder to Sanctity';
    papalMeditation = `Meditating on the Beatitudes (Matthew 5:1-12a), the Holy Father highlighted that holiness is not an unreachable ideal for an elite few, but the ordinary calling of every baptized Christian. "The Beatitudes are the identity card of the Christian disciple," the Pope said. "Blessed are the poor in spirit, the meek, the merciful, and the clean of heart! By living these paradoxical promises, the saints turned the world upside down and entered into the radiant joy of the Kingdom."`;
  }

  return {
    id: `news-daily-story-1-${dateStr}`,
    title: `Holy Father at Vatican: ${topicPhrase} (${citation})`,
    subtitle: `Reflecting on ${citation} for ${feast}, the Pope calls the universal Church to fervent Eucharistic Adoration and fraternal charity`,
    summary: `In St. Peter's Square on ${dateFormatted}, the Holy Father offered a pastoral meditation on ${feast}, reflecting on the day's Holy Gospel (${citation}) and urging the faithful to draw supernatural strength from the Blessed Sacrament.`,
    content: `VATICAN CITY — Proclaiming the Word of God on ${dateFormatted}, as Holy Mother Church celebrates ${feast}, the Holy Father addressed thousands of prelates, religious, and pilgrims gathered in St. Peter's Square.

Connecting the day's First Reading (${reading.firstReading.citation}) and Responsorial Psalm ("${reading.responsorialPsalm.antiphon}") with the Gospel (${citation}), the Pontiff drew the eyes of the faithful to the living presence of Jesus Christ.

${papalMeditation}

"Today's Gospel passage—'${gospelSnippet}'—reminds us that our Catholic faith is not a dead philosophy, but a living encounter with a Person: Jesus Christ, the Son of the Living God," the Holy Father remarked.

Pointing toward the Blessed Sacrament exposed upon the altar in St. Peter's Basilica, the Pope concluded: "Let us not leave Holy Mass today unchanged. Kneel before the tabernacle, gaze upon the Lord in quiet adoration, and ask for the grace to live the Gospel in concrete deeds of love toward our neighbors."

The Holy Father then led the congregation in the recitation of the Angelus Domini and imparted his Apostolic Blessing upon all the sick, families, and pilgrims present.`,
    category: 'Vatican',
    author: 'Vatican News Editorial Staff',
    date: dateFormatted,
    readTime: '4 min read',
    source: 'Holy See Press Office & Vatican Media',
    tags: ['Vatican', 'Pope', 'Daily Homily', citation, 'Eucharist', feast]
  };
}

/**
 * Builds Story 3 (Saint of the Day & Patristic Tradition) tailored to the calendar memorial
 */
function buildDailySaintHeritageStory(dateStr: string, dateFormatted: string): CatholicNewsItem {
  const reading = getMassReadingsForDate(dateStr);
  const liturgicalDay = reading.liturgicalDay;

  let saintHeadline = `Rome Celebrates ${liturgicalDay}: The Living Heritage of Catholic Sanctity`;
  let saintSubtitle = `Vatican liturgical commemoration highlights the heroic virtue and patristic witness of the day's feast`;
  let saintContent = `VATICAN CITY — In the liturgical calendar of the universal Church, ${dateFormatted} marks the celebration of ${liturgicalDay}.

Pilgrims and clergy gathered in the sanctuaries of Rome to commemorate the witness of the saints who illuminated the Church with holy teaching and heroic charity. As the fathers of the Church remind us, the saints are like stained-glass windows through which the radiant light of Christ shines into the world.

"When we honor the memory of the saints, we do not worship human achievement," noted a Vatican prelate. "Rather, we glorify God whose grace triumphs over human weakness. Their lives encourage our pilgrim journey and remind us that our true homeland is in Heaven."`;

  if (liturgicalDay.toLowerCase().includes('borromeo')) {
    saintHeadline = 'Rome Commemorates St. Charles Borromeo: Fearless Shepherd of the Milan Plague and Champion of Eucharistic Renewal';
    saintSubtitle = 'Solemn Liturgy at the Basilica of Sts. Ambrose and Charles on the Via del Corso honors the great Council of Trent reformer';
    saintContent = `VATICAN CITY — On this liturgical Memorial of Saint Charles Borromeo (1538–1584), Cardinal Archbishop of Milan and leader of the Catholic Counter-Reformation, priests, seminarians, and pilgrims gathered in Rome to venerate the great saint's memory.

Born into the noble Borromeo family and appointed Cardinal Nephew by Pope Pius IV, Charles renounced worldly luxury to implement the decrees of the Council of Trent. He founded the first diocesan seminaries, instituted regular parish catechisms, and led the Church into a golden era of liturgical dignity and Eucharistic adoration.

During the catastrophic Great Plague of Milan in 1576—when civic magistrates fled—Saint Charles remained in the city, using his personal patrimony to feed sixty to seventy thousand starving citizens daily. Walking barefoot through the streets carrying the Holy Nail and a large Crucifix in solemn penitential procession, he administered the Last Rites and Holy Communion to the dying at their doorsteps.

"Saint Charles Borromeo showed the world what a true Catholic shepherd is," remarked the Archpriest during the commemorative Mass. "He gave away everything—his wealth, his health, and his sleep—to preserve his flock in the grace of Jesus Christ."`;
  } else if (liturgicalDay.toLowerCase().includes('martin de porres')) {
    saintHeadline = 'Vatican Honors St. Martin de Porres: The Dominican Brother Whose Humble Broom Brought Christ\'s Charity to Lima';
    saintSubtitle = 'Liturgical commemoration celebrates the patron of social justice, interracial harmony, and care for the destitute';
    saintContent = `VATICAN CITY — The universal Church celebrated the feast of Saint Martin de Porres (1579–1639), the humble Dominican lay brother of Lima, Peru, renowned for his profound mystical contemplation before the Blessed Sacrament and boundless love for the poor.

Born to a Spanish nobleman and a freed black Panamanian woman, Martin entered the Dominican convent as a donado (volunteer servant). Assigned to sweep the priory floors, care for the sick in the infirmary, and feed hundreds of destitute beggars at the priory gates daily, Martin turned every menial task into an act of adoration.

Witnesses at his canonization attested to numerous miracles—bilocation to minister to prisoners, multiplying food for orphans, and healing the terminally ill. Yet Martin referred to himself only as "the poor slave" and spent entire nights prostrated before the Tabernacle.

"Saint Martin de Porres teaches us that true greatness in the Kingdom of God is measured by humility and hidden charity," the Vatican homilist observed. "He sanctified the ordinary and showed that no human being is unworthy of Christ's tender love."`;
  } else if (liturgicalDay.toLowerCase().includes('all saints')) {
    saintHeadline = 'St. Peter\'s Basilica Clothed in White for All Saints: Celebrating the Unnumbered Multitude of Divine Grace';
    saintSubtitle = 'Holy Father presides over solemn Papal Mass honoring all known and unknown holy souls in the Heavenly Jerusalem';
    saintContent = `VATICAN CITY — St. Peter's Basilica shone in festive gold and white as the universal Church celebrated the Solemnity of All Saints (Omnium Sanctorum).

In his homily beneath Bernini's baldacchino, the Pope lifted the eyes of the faithful toward the Heavenly Jerusalem: "Today we celebrate not only the canonized saints whose names adorn our liturgical calendars, but that great multitude from every tribe, tongue, and nation whom no one could count—the holy mothers, fathers, workers, and hidden martyrs of everyday fidelity."

The Pontiff urged young pilgrims to seek friendship with the saints: "The saints are our older brothers and sisters who have run the race before us. They stand around the Throne of the Lamb, interceding for us and whispering: 'Do not be afraid; Christ has conquered the world!'"`;
  } else if (liturgicalDay.toLowerCase().includes('all souls') || liturgicalDay.toLowerCase().includes('faithful departed')) {
    saintHeadline = 'Pope Leads All Souls Commemoration in Vatican Grottoes: Praying for the Holy Souls in Purgatory';
    saintSubtitle = 'Holy Father descends to the tombs of the Apostles and martyr popes, offering Holy Mass for the faithful departed';
    saintContent = `VATICAN CITY — On the Commemoration of All the Faithful Departed (All Souls' Day), the Holy Father descended into the ancient Vatican Grottoes beneath St. Peter's Basilica to celebrate Holy Mass near the confession of Saint Peter.

The Pontiff prayed silently before the tombs of the early martyr popes and faithful departed, reminding the Church of the ancient Catholic duty of offering suffrages, Holy Masses, and indulgences for the Holy Souls in Purgatory.

"As Saint Monica said to Saint Augustine: 'Only this I ask of you, that you remember me at the altar of the Lord, wherever you may be,'" the Pope reflected. "Our prayers for the dead are the most sublime manifestation of the Communion of Saints, bridging time and eternity in the charity of Christ."`;
  }

  return {
    id: `news-daily-story-3-${dateStr}`,
    title: saintHeadline,
    subtitle: saintSubtitle,
    summary: `On ${dateFormatted}, the Vatican marked ${liturgicalDay}, celebrating the heroic virtue and timeless spiritual lessons of the saints for contemporary believers.`,
    content: saintContent,
    category: 'Saints and Faith',
    author: 'L\'Osservatore Romano',
    date: dateFormatted,
    readTime: '4 min read',
    source: 'Vatican Media and Pontifical Historical Commission',
    tags: ['Saints and Faith', 'Liturgical Year', liturgicalDay, 'Tradition', 'Vatican']
  };
}

/**
 * Returns exactly FIVE brand-new, date-specific, comprehensive Vatican stories for any given day
 */
export function getDailyFiveVaticanStories(dateStr: string): CatholicNewsItem[] {
  const dateFormatted = formatLongDate(dateStr);
  const [year, month, day] = dateStr.split('-').map(num => parseInt(num, 10));
  const seed = (year || 2026) * 372 + (month || 11) * 31 + (day || 4);

  // Story 1: Papal Audience / Daily Homily on the Day's Gospel & Feast
  const story1 = buildDailyPapalGospelStory(dateStr, dateFormatted);

  // Story 2: Holy See Dicastery Pastoral Announcement & Vatican Directive
  const directiveTemplate = DICASTERY_DIRECTIVES[seed % DICASTERY_DIRECTIVES.length];
  const story2: CatholicNewsItem = {
    readTime: '3 min read',
    ...directiveTemplate,
    id: `news-daily-story-2-${dateStr}`,
    date: dateFormatted
  };

  // Story 3: Saint of the Day & Patristic Tradition
  const story3 = buildDailySaintHeritageStory(dateStr, dateFormatted);

  // Story 4: Worldwide Eucharistic Adoration & Marian Sanctuaries Dispatch
  const eucharistTemplate = EUCHARISTIC_MISSION_REPORTS[(seed + 1) % EUCHARISTIC_MISSION_REPORTS.length];
  const story4: CatholicNewsItem = {
    readTime: '4 min read',
    ...eucharistTemplate,
    id: `news-daily-story-4-${dateStr}`,
    date: dateFormatted
  };

  // Story 5: Works of Mercy, Caritas & Sacred Catholic Culture
  const charityTemplate = CHARITY_AND_CULTURE_REPORTS[(seed + 2) % CHARITY_AND_CULTURE_REPORTS.length];
  const story5: CatholicNewsItem = {
    readTime: '3 min read',
    ...charityTemplate,
    id: `news-daily-story-5-${dateStr}`,
    date: dateFormatted
  };

  return [story1, story2, story3, story4, story5];
}

/**
 * Returns the full daily Vatican News array: the 5 fresh daily stories followed by the broader archive
 */
export function getDailyVaticanNews(dateStr: string): CatholicNewsItem[] {
  const fiveDailyStories = getDailyFiveVaticanStories(dateStr);
  const fiveTitles = new Set(fiveDailyStories.map(s => s.title));

  const remainingArchive = CATHOLIC_NEWS_DATABASE.filter(item => !fiveTitles.has(item.title));
  return [...fiveDailyStories, ...remainingArchive];
}

/**
 * Returns the top headline story of the day for the masthead
 */
export function getTopVaticanHeadline(dateStr: string): CatholicNewsItem {
  const dailyNews = getDailyFiveVaticanStories(dateStr);
  return dailyNews[0];
}
