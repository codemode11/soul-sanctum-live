import { CatechismArticle, MagisterialInput } from './gospelCatechism';

export interface GospelCatechismTemplate {
  gospelCitation: string;
  topicTitle: string;
  topicSubtitle: string;
  pillar: string;
  part: string;
  section: string;
  chapter: string;
  paragraphsRange: string;
  catechismArticles: CatechismArticle[];
  magisterialInputs: MagisterialInput[];
  inBrief: string[];
  meditationQuestion: string;
  practicalLiving: string;
  crossReferences: string[];
}

/**
 * Authoritative Catechism Mappings for Every Liturgical Gospel Proclamation
 * Covers all 58 unique pericopes of the complete 1-year and 1-month cycle (Nov 2026 - Dec 2027)
 */
export const GOSPEL_CATECHISM_REGISTRY: Record<string, GospelCatechismTemplate> = {
  'luke 15:1-10':   {
    gospelCitation: 'Luke 15:1-10',
    topicTitle: 'The Lost Sheep, The Lost Coin & The Boundless Mercy of God',
    topicSubtitle: 'Rejoice with me; for I have found my sheep which was lost: The Joy of Heaven over One Sinner Who Repents',
    pillar: '',
    part: 'Part Two: The Celebration of the Christian Mystery & Part Three: Life in Christ',
    section: 'Section Two: The Seven Sacraments',
    chapter: 'The Sacrament of Penance and Reconciliation',
    paragraphsRange: 'Catechism of the Catholic Church 545, 1422, 1439, 1468',
    catechismArticles: [
      {
            "number": 545,
            "title": "Jesus Invites Sinners to the Table of the Kingdom",
            "text": "Jesus invites sinners to the table of the kingdom: \"I came not to call the righteous, but sinners to repentance.\" He invites them to that conversion without which one cannot enter the kingdom, but shows them in word and deed his Father's boundless and unconditional mercy for them and the vast \"joy in heaven over one sinner who repents.\""
      },
      {
            "number": 1422,
            "title": "The Sacrament of Reconciliation and Divine Forgiveness",
            "text": "Those who approach the sacrament of Penance obtain pardon from God's mercy for the offense committed against him, and are, at the same time, reconciled with the Church which they have wounded by their sins and which by charity, by example, and by prayer labors for their conversion."
      },
      {
            "number": 1468,
            "title": "The Ineffable Peace and Consolation of Sacramental Absolution",
            "text": "The whole power of the sacrament of Penance consists in restoring us to God's grace and joining us with him in an intimate friendship. Reconciliation with God brings about a true \"spiritual resurrection,\" restoration of the dignity and blessings of the life of the children of God, of which the most precious is friendship with God."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Encyclical Dives in Misericordia (Rich in Mercy)",
            "citation": "DM 3",
            "insight": "In Christ and through Christ, God also becomes especially visible in his mercy... Not only does he speak of it and explain it by the use of parables and allegories, but above all he himself embodies it and personifies it."
      }
],
    inBrief: [
      "There will be more joy in heaven over one sinner who repents than over ninety-nine righteous persons who need no repentance (Luke 15:7).",
      "Christ is the Good Shepherd who tirelessly traverses the wilderness to seek and recover the lost sheep.",
      "The Church's confessional is the tribunal of divine tenderness where sinners are restored to sanctifying grace."
],
    meditationQuestion: 'Do I dare to believe that God rejoices more over my humble repentance than over my self-reliant achievements?',
    practicalLiving: 'Pray the Jesus Prayer three times today for a fallen-away family member or friend: "Lord Jesus Christ, Son of God, have mercy on us and bring them home."',
    crossReferences: [
      "Luke 15:1-10",
      "Ezekiel 34:11-16",
      "CCC 545",
      "CCC 1468"
]
  },
  'lk 15:1-10':   {
    gospelCitation: 'Luke 15:1-10',
    topicTitle: 'The Lost Sheep, The Lost Coin & The Boundless Mercy of God',
    topicSubtitle: 'Rejoice with me; for I have found my sheep which was lost: The Joy of Heaven over One Sinner Who Repents',
    pillar: '',
    part: 'Part Two: The Celebration of the Christian Mystery & Part Three: Life in Christ',
    section: 'Section Two: The Seven Sacraments',
    chapter: 'The Sacrament of Penance and Reconciliation',
    paragraphsRange: 'Catechism of the Catholic Church 545, 1422, 1439, 1468',
    catechismArticles: [
      {
            "number": 545,
            "title": "Jesus Invites Sinners to the Table of the Kingdom",
            "text": "Jesus invites sinners to the table of the kingdom: \"I came not to call the righteous, but sinners to repentance.\" He invites them to that conversion without which one cannot enter the kingdom, but shows them in word and deed his Father's boundless and unconditional mercy for them and the vast \"joy in heaven over one sinner who repents.\""
      },
      {
            "number": 1422,
            "title": "The Sacrament of Reconciliation and Divine Forgiveness",
            "text": "Those who approach the sacrament of Penance obtain pardon from God's mercy for the offense committed against him, and are, at the same time, reconciled with the Church which they have wounded by their sins and which by charity, by example, and by prayer labors for their conversion."
      },
      {
            "number": 1468,
            "title": "The Ineffable Peace and Consolation of Sacramental Absolution",
            "text": "The whole power of the sacrament of Penance consists in restoring us to God's grace and joining us with him in an intimate friendship. Reconciliation with God brings about a true \"spiritual resurrection,\" restoration of the dignity and blessings of the life of the children of God, of which the most precious is friendship with God."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Encyclical Dives in Misericordia (Rich in Mercy)",
            "citation": "DM 3",
            "insight": "In Christ and through Christ, God also becomes especially visible in his mercy... Not only does he speak of it and explain it by the use of parables and allegories, but above all he himself embodies it and personifies it."
      }
],
    inBrief: [
      "There will be more joy in heaven over one sinner who repents than over ninety-nine righteous persons who need no repentance (Luke 15:7).",
      "Christ is the Good Shepherd who tirelessly traverses the wilderness to seek and recover the lost sheep.",
      "The Church's confessional is the tribunal of divine tenderness where sinners are restored to sanctifying grace."
],
    meditationQuestion: 'Do I dare to believe that God rejoices more over my humble repentance than over my self-reliant achievements?',
    practicalLiving: 'Pray the Jesus Prayer three times today for a fallen-away family member or friend: "Lord Jesus Christ, Son of God, have mercy on us and bring them home."',
    crossReferences: [
      "Luke 15:1-10",
      "Ezekiel 34:11-16",
      "CCC 545",
      "CCC 1468"
]
  },
  'luke 15:1':   {
    gospelCitation: 'Luke 15:1-10',
    topicTitle: 'The Lost Sheep, The Lost Coin & The Boundless Mercy of God',
    topicSubtitle: 'Rejoice with me; for I have found my sheep which was lost: The Joy of Heaven over One Sinner Who Repents',
    pillar: '',
    part: 'Part Two: The Celebration of the Christian Mystery & Part Three: Life in Christ',
    section: 'Section Two: The Seven Sacraments',
    chapter: 'The Sacrament of Penance and Reconciliation',
    paragraphsRange: 'Catechism of the Catholic Church 545, 1422, 1439, 1468',
    catechismArticles: [
      {
            "number": 545,
            "title": "Jesus Invites Sinners to the Table of the Kingdom",
            "text": "Jesus invites sinners to the table of the kingdom: \"I came not to call the righteous, but sinners to repentance.\" He invites them to that conversion without which one cannot enter the kingdom, but shows them in word and deed his Father's boundless and unconditional mercy for them and the vast \"joy in heaven over one sinner who repents.\""
      },
      {
            "number": 1422,
            "title": "The Sacrament of Reconciliation and Divine Forgiveness",
            "text": "Those who approach the sacrament of Penance obtain pardon from God's mercy for the offense committed against him, and are, at the same time, reconciled with the Church which they have wounded by their sins and which by charity, by example, and by prayer labors for their conversion."
      },
      {
            "number": 1468,
            "title": "The Ineffable Peace and Consolation of Sacramental Absolution",
            "text": "The whole power of the sacrament of Penance consists in restoring us to God's grace and joining us with him in an intimate friendship. Reconciliation with God brings about a true \"spiritual resurrection,\" restoration of the dignity and blessings of the life of the children of God, of which the most precious is friendship with God."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Encyclical Dives in Misericordia (Rich in Mercy)",
            "citation": "DM 3",
            "insight": "In Christ and through Christ, God also becomes especially visible in his mercy... Not only does he speak of it and explain it by the use of parables and allegories, but above all he himself embodies it and personifies it."
      }
],
    inBrief: [
      "There will be more joy in heaven over one sinner who repents than over ninety-nine righteous persons who need no repentance (Luke 15:7).",
      "Christ is the Good Shepherd who tirelessly traverses the wilderness to seek and recover the lost sheep.",
      "The Church's confessional is the tribunal of divine tenderness where sinners are restored to sanctifying grace."
],
    meditationQuestion: 'Do I dare to believe that God rejoices more over my humble repentance than over my self-reliant achievements?',
    practicalLiving: 'Pray the Jesus Prayer three times today for a fallen-away family member or friend: "Lord Jesus Christ, Son of God, have mercy on us and bring them home."',
    crossReferences: [
      "Luke 15:1-10",
      "Ezekiel 34:11-16",
      "CCC 545",
      "CCC 1468"
]
  },
  'luke 15':   {
    gospelCitation: 'Luke 15:1-10',
    topicTitle: 'The Lost Sheep, The Lost Coin & The Boundless Mercy of God',
    topicSubtitle: 'Rejoice with me; for I have found my sheep which was lost: The Joy of Heaven over One Sinner Who Repents',
    pillar: '',
    part: 'Part Two: The Celebration of the Christian Mystery & Part Three: Life in Christ',
    section: 'Section Two: The Seven Sacraments',
    chapter: 'The Sacrament of Penance and Reconciliation',
    paragraphsRange: 'Catechism of the Catholic Church 545, 1422, 1439, 1468',
    catechismArticles: [
      {
            "number": 545,
            "title": "Jesus Invites Sinners to the Table of the Kingdom",
            "text": "Jesus invites sinners to the table of the kingdom: \"I came not to call the righteous, but sinners to repentance.\" He invites them to that conversion without which one cannot enter the kingdom, but shows them in word and deed his Father's boundless and unconditional mercy for them and the vast \"joy in heaven over one sinner who repents.\""
      },
      {
            "number": 1422,
            "title": "The Sacrament of Reconciliation and Divine Forgiveness",
            "text": "Those who approach the sacrament of Penance obtain pardon from God's mercy for the offense committed against him, and are, at the same time, reconciled with the Church which they have wounded by their sins and which by charity, by example, and by prayer labors for their conversion."
      },
      {
            "number": 1468,
            "title": "The Ineffable Peace and Consolation of Sacramental Absolution",
            "text": "The whole power of the sacrament of Penance consists in restoring us to God's grace and joining us with him in an intimate friendship. Reconciliation with God brings about a true \"spiritual resurrection,\" restoration of the dignity and blessings of the life of the children of God, of which the most precious is friendship with God."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Encyclical Dives in Misericordia (Rich in Mercy)",
            "citation": "DM 3",
            "insight": "In Christ and through Christ, God also becomes especially visible in his mercy... Not only does he speak of it and explain it by the use of parables and allegories, but above all he himself embodies it and personifies it."
      }
],
    inBrief: [
      "There will be more joy in heaven over one sinner who repents than over ninety-nine righteous persons who need no repentance (Luke 15:7).",
      "Christ is the Good Shepherd who tirelessly traverses the wilderness to seek and recover the lost sheep.",
      "The Church's confessional is the tribunal of divine tenderness where sinners are restored to sanctifying grace."
],
    meditationQuestion: 'Do I dare to believe that God rejoices more over my humble repentance than over my self-reliant achievements?',
    practicalLiving: 'Pray the Jesus Prayer three times today for a fallen-away family member or friend: "Lord Jesus Christ, Son of God, have mercy on us and bring them home."',
    crossReferences: [
      "Luke 15:1-10",
      "Ezekiel 34:11-16",
      "CCC 545",
      "CCC 1468"
]
  },
  'luke 14:25-33':   {
    gospelCitation: 'Luke 14:25-33',
    topicTitle: 'The Radical Cost of Discipleship: Renouncing All & Bearing the Daily Cross',
    topicSubtitle: 'Whoever does not bear his own cross and come after me cannot be my disciple',
    pillar: '',
    part: 'Part Three: Life in Christ',
    section: 'Section One: Man\'s Vocation — Life in the Spirit',
    chapter: 'The Universal Call to Christian Perfection and Evangelical Renunciation',
    paragraphsRange: 'Catechism of the Catholic Church 618, 2015, 2544',
    catechismArticles: [
      {
            "number": 618,
            "title": "Christ Calls His Disciples to Take Up Their Cross and Follow Him",
            "text": "The cross is the unique sacrifice of Christ, the \"one mediator between God and men.\" But because in his incarnate divine person he has in some way united himself to every man, \"the possibility of being made partners, in a way known to God, in the paschal mystery\" is offered to all men. He calls his disciples to \"take up their cross and follow him.\""
      },
      {
            "number": 2015,
            "title": "Spiritual Progress Entails the Ascetic Way of the Cross",
            "text": "Spiritual progress entails the ascesis and mortification that gradually lead to living in the peace and joy of the Beatitudes: \"He who climbs never stops going from beginning to beginning, through beginnings that have no end. He never stops desiring what he already knows.\" There is no holiness without renunciation and spiritual battle."
      },
      {
            "number": 2544,
            "title": "Disciples Renounce All for the Sake of Christ",
            "text": "Jesus enjoins his disciples to prefer him to everything and to everyone, and bids them \"renounce all that they have\" for his sake and that of the Gospel. Detachment from riches is obligatory for entrance into the Kingdom of heaven."
      }
],
    magisterialInputs: [
      {
            "authority": "Second Vatican Ecumenical Council",
            "documentTitle": "Dogmatic Constitution on the Church (Lumen Gentium)",
            "citation": "LG 42",
            "insight": "All the faithful are invited and obliged to try for affiliation and a state of life suited to themselves that they may reach Christian perfection. They must follow in His footsteps and conform themselves to His image."
      }
],
    inBrief: [
      "Whoever does not bear his own cross and follow Christ cannot be His disciple (Luke 14:27).",
      "True discipleship requires sovereign love for Christ surpassing all earthly ties.",
      "The path of evangelical perfection necessarily passes through the mystery of the Cross."
],
    meditationQuestion: 'What attachment or comfort am I still clinging to that prevents me from following Christ with an undivided heart?',
    practicalLiving: 'Embrace one difficult duty or minor annoyance today without complaining, uniting it interiorly to the Passion of Christ.',
    crossReferences: [
      "Luke 14:25-33",
      "Matthew 16:24",
      "CCC 618",
      "CCC 2015"
]
  },
  'lk 14:25-33':   {
    gospelCitation: 'Luke 14:25-33',
    topicTitle: 'The Radical Cost of Discipleship: Renouncing All & Bearing the Daily Cross',
    topicSubtitle: 'Whoever does not bear his own cross and come after me cannot be my disciple',
    pillar: '',
    part: 'Part Three: Life in Christ',
    section: 'Section One: Man\'s Vocation — Life in the Spirit',
    chapter: 'The Universal Call to Christian Perfection and Evangelical Renunciation',
    paragraphsRange: 'Catechism of the Catholic Church 618, 2015, 2544',
    catechismArticles: [
      {
            "number": 618,
            "title": "Christ Calls His Disciples to Take Up Their Cross and Follow Him",
            "text": "The cross is the unique sacrifice of Christ, the \"one mediator between God and men.\" But because in his incarnate divine person he has in some way united himself to every man, \"the possibility of being made partners, in a way known to God, in the paschal mystery\" is offered to all men. He calls his disciples to \"take up their cross and follow him.\""
      },
      {
            "number": 2015,
            "title": "Spiritual Progress Entails the Ascetic Way of the Cross",
            "text": "Spiritual progress entails the ascesis and mortification that gradually lead to living in the peace and joy of the Beatitudes: \"He who climbs never stops going from beginning to beginning, through beginnings that have no end. He never stops desiring what he already knows.\" There is no holiness without renunciation and spiritual battle."
      },
      {
            "number": 2544,
            "title": "Disciples Renounce All for the Sake of Christ",
            "text": "Jesus enjoins his disciples to prefer him to everything and to everyone, and bids them \"renounce all that they have\" for his sake and that of the Gospel. Detachment from riches is obligatory for entrance into the Kingdom of heaven."
      }
],
    magisterialInputs: [
      {
            "authority": "Second Vatican Ecumenical Council",
            "documentTitle": "Dogmatic Constitution on the Church (Lumen Gentium)",
            "citation": "LG 42",
            "insight": "All the faithful are invited and obliged to try for affiliation and a state of life suited to themselves that they may reach Christian perfection. They must follow in His footsteps and conform themselves to His image."
      }
],
    inBrief: [
      "Whoever does not bear his own cross and follow Christ cannot be His disciple (Luke 14:27).",
      "True discipleship requires sovereign love for Christ surpassing all earthly ties.",
      "The path of evangelical perfection necessarily passes through the mystery of the Cross."
],
    meditationQuestion: 'What attachment or comfort am I still clinging to that prevents me from following Christ with an undivided heart?',
    practicalLiving: 'Embrace one difficult duty or minor annoyance today without complaining, uniting it interiorly to the Passion of Christ.',
    crossReferences: [
      "Luke 14:25-33",
      "Matthew 16:24",
      "CCC 618",
      "CCC 2015"
]
  },
  'luke 14:25':   {
    gospelCitation: 'Luke 14:25-33',
    topicTitle: 'The Radical Cost of Discipleship: Renouncing All & Bearing the Daily Cross',
    topicSubtitle: 'Whoever does not bear his own cross and come after me cannot be my disciple',
    pillar: '',
    part: 'Part Three: Life in Christ',
    section: 'Section One: Man\'s Vocation — Life in the Spirit',
    chapter: 'The Universal Call to Christian Perfection and Evangelical Renunciation',
    paragraphsRange: 'Catechism of the Catholic Church 618, 2015, 2544',
    catechismArticles: [
      {
            "number": 618,
            "title": "Christ Calls His Disciples to Take Up Their Cross and Follow Him",
            "text": "The cross is the unique sacrifice of Christ, the \"one mediator between God and men.\" But because in his incarnate divine person he has in some way united himself to every man, \"the possibility of being made partners, in a way known to God, in the paschal mystery\" is offered to all men. He calls his disciples to \"take up their cross and follow him.\""
      },
      {
            "number": 2015,
            "title": "Spiritual Progress Entails the Ascetic Way of the Cross",
            "text": "Spiritual progress entails the ascesis and mortification that gradually lead to living in the peace and joy of the Beatitudes: \"He who climbs never stops going from beginning to beginning, through beginnings that have no end. He never stops desiring what he already knows.\" There is no holiness without renunciation and spiritual battle."
      },
      {
            "number": 2544,
            "title": "Disciples Renounce All for the Sake of Christ",
            "text": "Jesus enjoins his disciples to prefer him to everything and to everyone, and bids them \"renounce all that they have\" for his sake and that of the Gospel. Detachment from riches is obligatory for entrance into the Kingdom of heaven."
      }
],
    magisterialInputs: [
      {
            "authority": "Second Vatican Ecumenical Council",
            "documentTitle": "Dogmatic Constitution on the Church (Lumen Gentium)",
            "citation": "LG 42",
            "insight": "All the faithful are invited and obliged to try for affiliation and a state of life suited to themselves that they may reach Christian perfection. They must follow in His footsteps and conform themselves to His image."
      }
],
    inBrief: [
      "Whoever does not bear his own cross and follow Christ cannot be His disciple (Luke 14:27).",
      "True discipleship requires sovereign love for Christ surpassing all earthly ties.",
      "The path of evangelical perfection necessarily passes through the mystery of the Cross."
],
    meditationQuestion: 'What attachment or comfort am I still clinging to that prevents me from following Christ with an undivided heart?',
    practicalLiving: 'Embrace one difficult duty or minor annoyance today without complaining, uniting it interiorly to the Passion of Christ.',
    crossReferences: [
      "Luke 14:25-33",
      "Matthew 16:24",
      "CCC 618",
      "CCC 2015"
]
  },
  'luke 14:15-24':   {
    gospelCitation: 'Luke 14:15-24',
    topicTitle: 'The Great Banquet of Grace: The Lowly Welcomed & The Folly of Worldly Excuses',
    topicSubtitle: 'A man gave a great dinner to which he invited many: Come, for everything is now ready',
    pillar: '',
    part: 'Part Two: The Celebration of the Christian Mystery',
    section: 'Section Two: The Seven Sacraments',
    chapter: 'The Sacrament of the Eucharist — Anticipation of the Heavenly Feast',
    paragraphsRange: 'Catechism of the Catholic Church 543, 546, 1344, 2618',
    catechismArticles: [
      {
            "number": 543,
            "title": "The Universal Proclamation of the Kingdom of God",
            "text": "Everyone is called to enter the kingdom. First announced to the children of Israel, this messianic kingdom is intended to accept men of all nations. To enter it, one must accept Jesus' word: \"The word of the Lord is compared to a seed which is sown in a field; those who hear it with faith and are numbered among the little flock of Christ have received the kingdom itself.\""
      },
      {
            "number": 546,
            "title": "Parables as Radical Invitations to the Heavenly Feast",
            "text": "Through his parables Jesus invites people to the feast of the kingdom, but he also asks for a radical choice: to gain the kingdom, one must give up everything. Words are not enough; deeds are required. The parables are like a mirror for man: will he be like the rocky ground, or the good soil?"
      },
      {
            "number": 1344,
            "title": "The Eucharistic Gathering Anticipates the Eternal Banquet",
            "text": "Thus from celebration to celebration, as they proclaim the Paschal mystery of Jesus \"until he comes,\" the pilgrim People of God advances, \"following the narrow way of the cross,\" toward the heavenly banquet, when all the elect will be seated at the table of the kingdom."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Benedict XVI",
            "documentTitle": "Post-Synodal Apostolic Exhortation Sacramentum Caritatis",
            "citation": "SCar 31",
            "insight": "The Holy Eucharist is the wedding banquet of the Lamb. In this sacrament Jesus anticipates the final consummation when God will be all in all."
      }
],
    inBrief: [
      "Blessed is everyone who will eat bread in the kingdom of God (Luke 14:15).",
      "Worldly preoccupations and lukewarmness are tragic obstacles to answering God's banquet invitation.",
      "The poor, crippled, blind, and humble receive the feast of grace with joyful thanksgiving."
],
    meditationQuestion: 'Do I allow daily chores, work, or digital distractions to crowd out my fidelity to Sunday Mass and personal prayer?',
    practicalLiving: 'Make an Act of Spiritual Communion today and prioritize setting aside dedicated time for Sunday worship this week.',
    crossReferences: [
      "Luke 14:15-24",
      "Revelation 19:9",
      "CCC 546",
      "CCC 1344"
]
  },
  'lk 14:15-24':   {
    gospelCitation: 'Luke 14:15-24',
    topicTitle: 'The Great Banquet of Grace: The Lowly Welcomed & The Folly of Worldly Excuses',
    topicSubtitle: 'A man gave a great dinner to which he invited many: Come, for everything is now ready',
    pillar: '',
    part: 'Part Two: The Celebration of the Christian Mystery',
    section: 'Section Two: The Seven Sacraments',
    chapter: 'The Sacrament of the Eucharist — Anticipation of the Heavenly Feast',
    paragraphsRange: 'Catechism of the Catholic Church 543, 546, 1344, 2618',
    catechismArticles: [
      {
            "number": 543,
            "title": "The Universal Proclamation of the Kingdom of God",
            "text": "Everyone is called to enter the kingdom. First announced to the children of Israel, this messianic kingdom is intended to accept men of all nations. To enter it, one must accept Jesus' word: \"The word of the Lord is compared to a seed which is sown in a field; those who hear it with faith and are numbered among the little flock of Christ have received the kingdom itself.\""
      },
      {
            "number": 546,
            "title": "Parables as Radical Invitations to the Heavenly Feast",
            "text": "Through his parables Jesus invites people to the feast of the kingdom, but he also asks for a radical choice: to gain the kingdom, one must give up everything. Words are not enough; deeds are required. The parables are like a mirror for man: will he be like the rocky ground, or the good soil?"
      },
      {
            "number": 1344,
            "title": "The Eucharistic Gathering Anticipates the Eternal Banquet",
            "text": "Thus from celebration to celebration, as they proclaim the Paschal mystery of Jesus \"until he comes,\" the pilgrim People of God advances, \"following the narrow way of the cross,\" toward the heavenly banquet, when all the elect will be seated at the table of the kingdom."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Benedict XVI",
            "documentTitle": "Post-Synodal Apostolic Exhortation Sacramentum Caritatis",
            "citation": "SCar 31",
            "insight": "The Holy Eucharist is the wedding banquet of the Lamb. In this sacrament Jesus anticipates the final consummation when God will be all in all."
      }
],
    inBrief: [
      "Blessed is everyone who will eat bread in the kingdom of God (Luke 14:15).",
      "Worldly preoccupations and lukewarmness are tragic obstacles to answering God's banquet invitation.",
      "The poor, crippled, blind, and humble receive the feast of grace with joyful thanksgiving."
],
    meditationQuestion: 'Do I allow daily chores, work, or digital distractions to crowd out my fidelity to Sunday Mass and personal prayer?',
    practicalLiving: 'Make an Act of Spiritual Communion today and prioritize setting aside dedicated time for Sunday worship this week.',
    crossReferences: [
      "Luke 14:15-24",
      "Revelation 19:9",
      "CCC 546",
      "CCC 1344"
]
  },
  'luke 14:15':   {
    gospelCitation: 'Luke 14:15-24',
    topicTitle: 'The Great Banquet of Grace: The Lowly Welcomed & The Folly of Worldly Excuses',
    topicSubtitle: 'A man gave a great dinner to which he invited many: Come, for everything is now ready',
    pillar: '',
    part: 'Part Two: The Celebration of the Christian Mystery',
    section: 'Section Two: The Seven Sacraments',
    chapter: 'The Sacrament of the Eucharist — Anticipation of the Heavenly Feast',
    paragraphsRange: 'Catechism of the Catholic Church 543, 546, 1344, 2618',
    catechismArticles: [
      {
            "number": 543,
            "title": "The Universal Proclamation of the Kingdom of God",
            "text": "Everyone is called to enter the kingdom. First announced to the children of Israel, this messianic kingdom is intended to accept men of all nations. To enter it, one must accept Jesus' word: \"The word of the Lord is compared to a seed which is sown in a field; those who hear it with faith and are numbered among the little flock of Christ have received the kingdom itself.\""
      },
      {
            "number": 546,
            "title": "Parables as Radical Invitations to the Heavenly Feast",
            "text": "Through his parables Jesus invites people to the feast of the kingdom, but he also asks for a radical choice: to gain the kingdom, one must give up everything. Words are not enough; deeds are required. The parables are like a mirror for man: will he be like the rocky ground, or the good soil?"
      },
      {
            "number": 1344,
            "title": "The Eucharistic Gathering Anticipates the Eternal Banquet",
            "text": "Thus from celebration to celebration, as they proclaim the Paschal mystery of Jesus \"until he comes,\" the pilgrim People of God advances, \"following the narrow way of the cross,\" toward the heavenly banquet, when all the elect will be seated at the table of the kingdom."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Benedict XVI",
            "documentTitle": "Post-Synodal Apostolic Exhortation Sacramentum Caritatis",
            "citation": "SCar 31",
            "insight": "The Holy Eucharist is the wedding banquet of the Lamb. In this sacrament Jesus anticipates the final consummation when God will be all in all."
      }
],
    inBrief: [
      "Blessed is everyone who will eat bread in the kingdom of God (Luke 14:15).",
      "Worldly preoccupations and lukewarmness are tragic obstacles to answering God's banquet invitation.",
      "The poor, crippled, blind, and humble receive the feast of grace with joyful thanksgiving."
],
    meditationQuestion: 'Do I allow daily chores, work, or digital distractions to crowd out my fidelity to Sunday Mass and personal prayer?',
    practicalLiving: 'Make an Act of Spiritual Communion today and prioritize setting aside dedicated time for Sunday worship this week.',
    crossReferences: [
      "Luke 14:15-24",
      "Revelation 19:9",
      "CCC 546",
      "CCC 1344"
]
  },
  'john 6:37-40':   {
    gospelCitation: 'John 6:37-40',
    topicTitle: 'The Resurrection of the Body, Eternal Life & Intercession for the Departed',
    topicSubtitle: 'This is the will of my Father: that everyone who sees the Son and believes in him should have eternal life',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Last Things',
    chapter: 'The Resurrection of the Body and Life Everlasting',
    paragraphsRange: 'Catechism of the Catholic Church 989, 1001, 1030, 1032',
    catechismArticles: [
      {
            "number": 989,
            "title": "Christian Hope in the Bodily Resurrection",
            "text": "We firmly believe, and hence we hope that, just as Christ is truly risen from the dead and lives for ever, so after death the righteous will live for ever with the risen Christ and he will raise them up on the last day. Our resurrection, like his own, will be the work of the Most Holy Trinity."
      },
      {
            "number": 1030,
            "title": "The Final Purification, or Purgatory",
            "text": "All who die in God's grace and friendship, but still imperfectly purified, are indeed assured of their eternal salvation; but after death they undergo purification, so as to achieve the holiness necessary to enter the joy of heaven."
      },
      {
            "number": 1032,
            "title": "The Efficacy of Prayers and Holy Mass for the Faithful Departed",
            "text": "From the beginning the Church has honored the memory of the dead and offered prayers in suffrage for them, above all the Eucharistic sacrifice, so that, thus purified, they may attain the beatific vision of God."
      }
],
    magisterialInputs: [
      {
            "authority": "Sacred Council of Trent",
            "documentTitle": "Decree Concerning Purgatory",
            "citation": "Sess. XXV",
            "insight": "There is a Purgatory, and the souls there detained are helped by the suffrages of the faithful, but principally by the acceptable sacrifice of the altar."
      }
],
    inBrief: [
      "Everyone who sees the Son and believes in Him has eternal life, and Christ will raise him up on the last day (John 6:40).",
      "Christ loses nothing of what the Father has given Him; His redemptive power overcomes physical death.",
      "Praying for the Holy Souls in Purgatory is an exquisite duty of supernatural fraternal charity."
],
    meditationQuestion: 'Does the certainty of Christ\'s Resurrection anchor my soul when facing the sorrow of bereavement or the reality of death?',
    practicalLiving: 'Pray the Requiem prayer today for departed loved ones and the most forgotten soul in Purgatory.',
    crossReferences: [
      "John 6:37-40",
      "1 Corinthians 15:51-57",
      "CCC 989",
      "CCC 1030"
]
  },
  'jn 6:37-40':   {
    gospelCitation: 'John 6:37-40',
    topicTitle: 'The Resurrection of the Body, Eternal Life & Intercession for the Departed',
    topicSubtitle: 'This is the will of my Father: that everyone who sees the Son and believes in him should have eternal life',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Last Things',
    chapter: 'The Resurrection of the Body and Life Everlasting',
    paragraphsRange: 'Catechism of the Catholic Church 989, 1001, 1030, 1032',
    catechismArticles: [
      {
            "number": 989,
            "title": "Christian Hope in the Bodily Resurrection",
            "text": "We firmly believe, and hence we hope that, just as Christ is truly risen from the dead and lives for ever, so after death the righteous will live for ever with the risen Christ and he will raise them up on the last day. Our resurrection, like his own, will be the work of the Most Holy Trinity."
      },
      {
            "number": 1030,
            "title": "The Final Purification, or Purgatory",
            "text": "All who die in God's grace and friendship, but still imperfectly purified, are indeed assured of their eternal salvation; but after death they undergo purification, so as to achieve the holiness necessary to enter the joy of heaven."
      },
      {
            "number": 1032,
            "title": "The Efficacy of Prayers and Holy Mass for the Faithful Departed",
            "text": "From the beginning the Church has honored the memory of the dead and offered prayers in suffrage for them, above all the Eucharistic sacrifice, so that, thus purified, they may attain the beatific vision of God."
      }
],
    magisterialInputs: [
      {
            "authority": "Sacred Council of Trent",
            "documentTitle": "Decree Concerning Purgatory",
            "citation": "Sess. XXV",
            "insight": "There is a Purgatory, and the souls there detained are helped by the suffrages of the faithful, but principally by the acceptable sacrifice of the altar."
      }
],
    inBrief: [
      "Everyone who sees the Son and believes in Him has eternal life, and Christ will raise him up on the last day (John 6:40).",
      "Christ loses nothing of what the Father has given Him; His redemptive power overcomes physical death.",
      "Praying for the Holy Souls in Purgatory is an exquisite duty of supernatural fraternal charity."
],
    meditationQuestion: 'Does the certainty of Christ\'s Resurrection anchor my soul when facing the sorrow of bereavement or the reality of death?',
    practicalLiving: 'Pray the Requiem prayer today for departed loved ones and the most forgotten soul in Purgatory.',
    crossReferences: [
      "John 6:37-40",
      "1 Corinthians 15:51-57",
      "CCC 989",
      "CCC 1030"
]
  },
  'john 6:37':   {
    gospelCitation: 'John 6:37-40',
    topicTitle: 'The Resurrection of the Body, Eternal Life & Intercession for the Departed',
    topicSubtitle: 'This is the will of my Father: that everyone who sees the Son and believes in him should have eternal life',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Last Things',
    chapter: 'The Resurrection of the Body and Life Everlasting',
    paragraphsRange: 'Catechism of the Catholic Church 989, 1001, 1030, 1032',
    catechismArticles: [
      {
            "number": 989,
            "title": "Christian Hope in the Bodily Resurrection",
            "text": "We firmly believe, and hence we hope that, just as Christ is truly risen from the dead and lives for ever, so after death the righteous will live for ever with the risen Christ and he will raise them up on the last day. Our resurrection, like his own, will be the work of the Most Holy Trinity."
      },
      {
            "number": 1030,
            "title": "The Final Purification, or Purgatory",
            "text": "All who die in God's grace and friendship, but still imperfectly purified, are indeed assured of their eternal salvation; but after death they undergo purification, so as to achieve the holiness necessary to enter the joy of heaven."
      },
      {
            "number": 1032,
            "title": "The Efficacy of Prayers and Holy Mass for the Faithful Departed",
            "text": "From the beginning the Church has honored the memory of the dead and offered prayers in suffrage for them, above all the Eucharistic sacrifice, so that, thus purified, they may attain the beatific vision of God."
      }
],
    magisterialInputs: [
      {
            "authority": "Sacred Council of Trent",
            "documentTitle": "Decree Concerning Purgatory",
            "citation": "Sess. XXV",
            "insight": "There is a Purgatory, and the souls there detained are helped by the suffrages of the faithful, but principally by the acceptable sacrifice of the altar."
      }
],
    inBrief: [
      "Everyone who sees the Son and believes in Him has eternal life, and Christ will raise him up on the last day (John 6:40).",
      "Christ loses nothing of what the Father has given Him; His redemptive power overcomes physical death.",
      "Praying for the Holy Souls in Purgatory is an exquisite duty of supernatural fraternal charity."
],
    meditationQuestion: 'Does the certainty of Christ\'s Resurrection anchor my soul when facing the sorrow of bereavement or the reality of death?',
    practicalLiving: 'Pray the Requiem prayer today for departed loved ones and the most forgotten soul in Purgatory.',
    crossReferences: [
      "John 6:37-40",
      "1 Corinthians 15:51-57",
      "CCC 989",
      "CCC 1030"
]
  },
  'matthew 5:1-12a':   {
    gospelCitation: 'Matthew 5:1-12a',
    topicTitle: 'The Eight Beatitudes, The Heavenly Reward & The Universal Call to Holiness',
    topicSubtitle: 'Blessed are the poor in spirit, for theirs is the kingdom of heaven: Christ\'s Portrait of Christian Sanctity',
    pillar: '',
    part: 'Part Three: Life in Christ',
    section: 'Section One: Man\'s Vocation — Life in the Spirit',
    chapter: 'Our Vocation to Beatitude and The Universal Call to Holiness',
    paragraphsRange: 'Catechism of the Catholic Church 1716, 1717, 1721, 2013',
    catechismArticles: [
      {
            "number": 1716,
            "title": "The Beatitudes at the Center of Christ's Preaching",
            "text": "The Beatitudes are at the heart of Jesus' preaching. They take up the promises made to the chosen people since Abraham. The Beatitudes fulfill the promises by ordering them no longer merely to the possession of a territory, but to the Kingdom of heaven."
      },
      {
            "number": 1717,
            "title": "The Beatitudes Portray the Countenance of Jesus Christ",
            "text": "The Beatitudes depict the countenance of Jesus Christ and portray his charity. They express the vocation of the faithful associated with the glory of his Passion and Resurrection; they shed light on the actions and attitudes characteristic of the Christian life."
      },
      {
            "number": 2013,
            "title": "All Christians in Every State are Called to Holiness",
            "text": "\"All Christians in any state or walk of life are called to the fullness of Christian life and to the perfection of charity.\" All are called to holiness: \"Be perfect, as your heavenly Father is perfect.\""
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Veritatis Splendor",
            "citation": "VS 16",
            "insight": "The Beatitudes are not a substitute for the Commandments, but their deepest interior fulfillment, conforming the soul to the very heart of Christ."
      }
],
    inBrief: [
      "Blessed are the clean of heart, for they will see God (Matthew 5:8).",
      "The Beatitudes overturn worldly wisdom and reveal the true paradox of divine happiness.",
      "Holiness is the universal vocation of all the baptized, guided by the communion of saints."
],
    meditationQuestion: 'Which of the Beatitudes challenges my natural instincts most profoundly today?',
    practicalLiving: 'Choose the Beatitude of meekness or mercy in your first interpersonal encounter today, giving way with silent charity.',
    crossReferences: [
      "Matthew 5:1-12a",
      "Luke 6:20-26",
      "CCC 1716",
      "CCC 2013"
]
  },
  'mt 5:1-12a':   {
    gospelCitation: 'Matthew 5:1-12a',
    topicTitle: 'The Eight Beatitudes, The Heavenly Reward & The Universal Call to Holiness',
    topicSubtitle: 'Blessed are the poor in spirit, for theirs is the kingdom of heaven: Christ\'s Portrait of Christian Sanctity',
    pillar: '',
    part: 'Part Three: Life in Christ',
    section: 'Section One: Man\'s Vocation — Life in the Spirit',
    chapter: 'Our Vocation to Beatitude and The Universal Call to Holiness',
    paragraphsRange: 'Catechism of the Catholic Church 1716, 1717, 1721, 2013',
    catechismArticles: [
      {
            "number": 1716,
            "title": "The Beatitudes at the Center of Christ's Preaching",
            "text": "The Beatitudes are at the heart of Jesus' preaching. They take up the promises made to the chosen people since Abraham. The Beatitudes fulfill the promises by ordering them no longer merely to the possession of a territory, but to the Kingdom of heaven."
      },
      {
            "number": 1717,
            "title": "The Beatitudes Portray the Countenance of Jesus Christ",
            "text": "The Beatitudes depict the countenance of Jesus Christ and portray his charity. They express the vocation of the faithful associated with the glory of his Passion and Resurrection; they shed light on the actions and attitudes characteristic of the Christian life."
      },
      {
            "number": 2013,
            "title": "All Christians in Every State are Called to Holiness",
            "text": "\"All Christians in any state or walk of life are called to the fullness of Christian life and to the perfection of charity.\" All are called to holiness: \"Be perfect, as your heavenly Father is perfect.\""
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Veritatis Splendor",
            "citation": "VS 16",
            "insight": "The Beatitudes are not a substitute for the Commandments, but their deepest interior fulfillment, conforming the soul to the very heart of Christ."
      }
],
    inBrief: [
      "Blessed are the clean of heart, for they will see God (Matthew 5:8).",
      "The Beatitudes overturn worldly wisdom and reveal the true paradox of divine happiness.",
      "Holiness is the universal vocation of all the baptized, guided by the communion of saints."
],
    meditationQuestion: 'Which of the Beatitudes challenges my natural instincts most profoundly today?',
    practicalLiving: 'Choose the Beatitude of meekness or mercy in your first interpersonal encounter today, giving way with silent charity.',
    crossReferences: [
      "Matthew 5:1-12a",
      "Luke 6:20-26",
      "CCC 1716",
      "CCC 2013"
]
  },
  'matthew 5:1':   {
    gospelCitation: 'Matthew 5:1-12a',
    topicTitle: 'The Eight Beatitudes, The Heavenly Reward & The Universal Call to Holiness',
    topicSubtitle: 'Blessed are the poor in spirit, for theirs is the kingdom of heaven: Christ\'s Portrait of Christian Sanctity',
    pillar: '',
    part: 'Part Three: Life in Christ',
    section: 'Section One: Man\'s Vocation — Life in the Spirit',
    chapter: 'Our Vocation to Beatitude and The Universal Call to Holiness',
    paragraphsRange: 'Catechism of the Catholic Church 1716, 1717, 1721, 2013',
    catechismArticles: [
      {
            "number": 1716,
            "title": "The Beatitudes at the Center of Christ's Preaching",
            "text": "The Beatitudes are at the heart of Jesus' preaching. They take up the promises made to the chosen people since Abraham. The Beatitudes fulfill the promises by ordering them no longer merely to the possession of a territory, but to the Kingdom of heaven."
      },
      {
            "number": 1717,
            "title": "The Beatitudes Portray the Countenance of Jesus Christ",
            "text": "The Beatitudes depict the countenance of Jesus Christ and portray his charity. They express the vocation of the faithful associated with the glory of his Passion and Resurrection; they shed light on the actions and attitudes characteristic of the Christian life."
      },
      {
            "number": 2013,
            "title": "All Christians in Every State are Called to Holiness",
            "text": "\"All Christians in any state or walk of life are called to the fullness of Christian life and to the perfection of charity.\" All are called to holiness: \"Be perfect, as your heavenly Father is perfect.\""
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Veritatis Splendor",
            "citation": "VS 16",
            "insight": "The Beatitudes are not a substitute for the Commandments, but their deepest interior fulfillment, conforming the soul to the very heart of Christ."
      }
],
    inBrief: [
      "Blessed are the clean of heart, for they will see God (Matthew 5:8).",
      "The Beatitudes overturn worldly wisdom and reveal the true paradox of divine happiness.",
      "Holiness is the universal vocation of all the baptized, guided by the communion of saints."
],
    meditationQuestion: 'Which of the Beatitudes challenges my natural instincts most profoundly today?',
    practicalLiving: 'Choose the Beatitude of meekness or mercy in your first interpersonal encounter today, giving way with silent charity.',
    crossReferences: [
      "Matthew 5:1-12a",
      "Luke 6:20-26",
      "CCC 1716",
      "CCC 2013"
]
  },
  'mt 5:1':   {
    gospelCitation: 'Matthew 5:1-12a',
    topicTitle: 'The Eight Beatitudes, The Heavenly Reward & The Universal Call to Holiness',
    topicSubtitle: 'Blessed are the poor in spirit, for theirs is the kingdom of heaven: Christ\'s Portrait of Christian Sanctity',
    pillar: '',
    part: 'Part Three: Life in Christ',
    section: 'Section One: Man\'s Vocation — Life in the Spirit',
    chapter: 'Our Vocation to Beatitude and The Universal Call to Holiness',
    paragraphsRange: 'Catechism of the Catholic Church 1716, 1717, 1721, 2013',
    catechismArticles: [
      {
            "number": 1716,
            "title": "The Beatitudes at the Center of Christ's Preaching",
            "text": "The Beatitudes are at the heart of Jesus' preaching. They take up the promises made to the chosen people since Abraham. The Beatitudes fulfill the promises by ordering them no longer merely to the possession of a territory, but to the Kingdom of heaven."
      },
      {
            "number": 1717,
            "title": "The Beatitudes Portray the Countenance of Jesus Christ",
            "text": "The Beatitudes depict the countenance of Jesus Christ and portray his charity. They express the vocation of the faithful associated with the glory of his Passion and Resurrection; they shed light on the actions and attitudes characteristic of the Christian life."
      },
      {
            "number": 2013,
            "title": "All Christians in Every State are Called to Holiness",
            "text": "\"All Christians in any state or walk of life are called to the fullness of Christian life and to the perfection of charity.\" All are called to holiness: \"Be perfect, as your heavenly Father is perfect.\""
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Veritatis Splendor",
            "citation": "VS 16",
            "insight": "The Beatitudes are not a substitute for the Commandments, but their deepest interior fulfillment, conforming the soul to the very heart of Christ."
      }
],
    inBrief: [
      "Blessed are the clean of heart, for they will see God (Matthew 5:8).",
      "The Beatitudes overturn worldly wisdom and reveal the true paradox of divine happiness.",
      "Holiness is the universal vocation of all the baptized, guided by the communion of saints."
],
    meditationQuestion: 'Which of the Beatitudes challenges my natural instincts most profoundly today?',
    practicalLiving: 'Choose the Beatitude of meekness or mercy in your first interpersonal encounter today, giving way with silent charity.',
    crossReferences: [
      "Matthew 5:1-12a",
      "Luke 6:20-26",
      "CCC 1716",
      "CCC 2013"
]
  },
  'luke 16:1-8':   {
    gospelCitation: 'Luke 16:1-8',
    topicTitle: 'Children of Light Preparing for Our Heavenly Dwelling: Prudence, Stewardship & Eternity',
    topicSubtitle: 'Christ uses the shrewdness of the worldly manager to teach disciples supreme vigilance for the Kingdom of Heaven.',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Three: Life in Christ',
    section: 'Section Two: The Profession of Christian Faith',
    chapter: 'The Mysteries of the Life of Christ in the Sacred Liturgy',
    paragraphsRange: 'Catechism of the Catholic Church 514, 515, 521, 1806',
    catechismArticles: [
      {
            "number": 514,
            "title": "Many Things About Jesus are Written So That You May Believe",
            "text": "Many things about Jesus of interest to human curiosity do not figure in the Gospels. Almost nothing is said about his hidden life at Nazareth, and even a great part of his public life is not recounted. What is written in the Gospels was set down there \"so that you may believe that Jesus is the Christ, the Son of God, and that believing you may have life in his name.\""
      },
      {
            "number": 515,
            "title": "The Mysteries of Christ's Life as Revelation and Redemption",
            "text": "The Gospels were written by men who were among the first to have the faith and wanted to share it with others. Having known in faith who Jesus is, they could see and make others see the traces of his mystery in all his earthly life."
      },
      {
            "number": 1806,
            "title": "Prudence as Auriga Virtutum (Charioteer of the Virtues)",
            "text": "Prudence is the virtue that disposes practical reason to discern our true good in every circumstance and to choose the right means of achieving it; \"the prudent man looks where he is going.\" Prudence guides the other virtues by pointing out their rule and measure."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Catechesi Tradendae",
            "citation": "CT 5",
            "insight": "At the heart of catechesis we find, in essence, a Person, the Person of Jesus of Nazareth, the only Son from the Father."
      }
],
    inBrief: [
      "The master commended the dishonest steward because he had dealt prudently (Luke 16:8).",
      "The children of light are called to apply greater vigilance for heavenly treasures than worldlings do for passing wealth.",
      "Holy prudence disposes the Christian conscience to direct all temporal goods toward eternal beatitude."
],
    meditationQuestion: 'Do I exercise as much energy and ingenuity for my eternal salvation as I do for my worldly success?',
    practicalLiving: 'Make one prudent decision today regarding the use of your time or money that directly promotes the Kingdom of God.',
    crossReferences: [
      "Luke 16:1-8",
      "Proverbs 14:15",
      "CCC 515",
      "CCC 1806"
]
  },
  'lk 16:1-8':   {
    gospelCitation: 'Luke 16:1-8',
    topicTitle: 'Children of Light Preparing for Our Heavenly Dwelling: Prudence, Stewardship & Eternity',
    topicSubtitle: 'Christ uses the shrewdness of the worldly manager to teach disciples supreme vigilance for the Kingdom of Heaven.',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Three: Life in Christ',
    section: 'Section Two: The Profession of Christian Faith',
    chapter: 'The Mysteries of the Life of Christ in the Sacred Liturgy',
    paragraphsRange: 'Catechism of the Catholic Church 514, 515, 521, 1806',
    catechismArticles: [
      {
            "number": 514,
            "title": "Many Things About Jesus are Written So That You May Believe",
            "text": "Many things about Jesus of interest to human curiosity do not figure in the Gospels. Almost nothing is said about his hidden life at Nazareth, and even a great part of his public life is not recounted. What is written in the Gospels was set down there \"so that you may believe that Jesus is the Christ, the Son of God, and that believing you may have life in his name.\""
      },
      {
            "number": 515,
            "title": "The Mysteries of Christ's Life as Revelation and Redemption",
            "text": "The Gospels were written by men who were among the first to have the faith and wanted to share it with others. Having known in faith who Jesus is, they could see and make others see the traces of his mystery in all his earthly life."
      },
      {
            "number": 1806,
            "title": "Prudence as Auriga Virtutum (Charioteer of the Virtues)",
            "text": "Prudence is the virtue that disposes practical reason to discern our true good in every circumstance and to choose the right means of achieving it; \"the prudent man looks where he is going.\" Prudence guides the other virtues by pointing out their rule and measure."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Catechesi Tradendae",
            "citation": "CT 5",
            "insight": "At the heart of catechesis we find, in essence, a Person, the Person of Jesus of Nazareth, the only Son from the Father."
      }
],
    inBrief: [
      "The master commended the dishonest steward because he had dealt prudently (Luke 16:8).",
      "The children of light are called to apply greater vigilance for heavenly treasures than worldlings do for passing wealth.",
      "Holy prudence disposes the Christian conscience to direct all temporal goods toward eternal beatitude."
],
    meditationQuestion: 'Do I exercise as much energy and ingenuity for my eternal salvation as I do for my worldly success?',
    practicalLiving: 'Make one prudent decision today regarding the use of your time or money that directly promotes the Kingdom of God.',
    crossReferences: [
      "Luke 16:1-8",
      "Proverbs 14:15",
      "CCC 515",
      "CCC 1806"
]
  },
  'luke 16:1':   {
    gospelCitation: 'Luke 16:1-8',
    topicTitle: 'Children of Light Preparing for Our Heavenly Dwelling: Prudence, Stewardship & Eternity',
    topicSubtitle: 'Christ uses the shrewdness of the worldly manager to teach disciples supreme vigilance for the Kingdom of Heaven.',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Three: Life in Christ',
    section: 'Section Two: The Profession of Christian Faith',
    chapter: 'The Mysteries of the Life of Christ in the Sacred Liturgy',
    paragraphsRange: 'Catechism of the Catholic Church 514, 515, 521, 1806',
    catechismArticles: [
      {
            "number": 514,
            "title": "Many Things About Jesus are Written So That You May Believe",
            "text": "Many things about Jesus of interest to human curiosity do not figure in the Gospels. Almost nothing is said about his hidden life at Nazareth, and even a great part of his public life is not recounted. What is written in the Gospels was set down there \"so that you may believe that Jesus is the Christ, the Son of God, and that believing you may have life in his name.\""
      },
      {
            "number": 515,
            "title": "The Mysteries of Christ's Life as Revelation and Redemption",
            "text": "The Gospels were written by men who were among the first to have the faith and wanted to share it with others. Having known in faith who Jesus is, they could see and make others see the traces of his mystery in all his earthly life."
      },
      {
            "number": 1806,
            "title": "Prudence as Auriga Virtutum (Charioteer of the Virtues)",
            "text": "Prudence is the virtue that disposes practical reason to discern our true good in every circumstance and to choose the right means of achieving it; \"the prudent man looks where he is going.\" Prudence guides the other virtues by pointing out their rule and measure."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Catechesi Tradendae",
            "citation": "CT 5",
            "insight": "At the heart of catechesis we find, in essence, a Person, the Person of Jesus of Nazareth, the only Son from the Father."
      }
],
    inBrief: [
      "The master commended the dishonest steward because he had dealt prudently (Luke 16:8).",
      "The children of light are called to apply greater vigilance for heavenly treasures than worldlings do for passing wealth.",
      "Holy prudence disposes the Christian conscience to direct all temporal goods toward eternal beatitude."
],
    meditationQuestion: 'Do I exercise as much energy and ingenuity for my eternal salvation as I do for my worldly success?',
    practicalLiving: 'Make one prudent decision today regarding the use of your time or money that directly promotes the Kingdom of God.',
    crossReferences: [
      "Luke 16:1-8",
      "Proverbs 14:15",
      "CCC 515",
      "CCC 1806"
]
  },
  'luke 16:9-15':   {
    gospelCitation: 'Luke 16:9-15',
    topicTitle: 'Trustworthy in Small Matters & Undivided in Serving God Alone: True Riches and Detachment',
    topicSubtitle: 'No servant can serve two masters: the moral demand of single-hearted fidelity to God over the idolatry of mammon',
    pillar: '',
    part: 'Part Three: Life in Christ',
    section: 'Section Two: The Ten Commandments',
    chapter: 'The Seventh & Tenth Commandments — Justice, Solidarity, and Poverty of Heart',
    paragraphsRange: 'Catechism of the Catholic Church 2407, 2424, 2445, 2544',
    catechismArticles: [
      {
            "number": 2407,
            "title": "Moderating Attachment to Worldly Goods through Justice and Solidarity",
            "text": "In economic matters, respect for human dignity requires the practice of the virtue of temperance, so as to moderate attachment to this world's goods; the practice of the virtue of justice, to preserve our neighbor's rights and render him what is his due; and the practice of solidarity, in accordance with the golden rule and in keeping with the generosity of the Lord, who \"though he was rich, yet for your sake became poor, so that by his poverty you might become rich.\""
      },
      {
            "number": 2424,
            "title": "Subordination of Economic Systems to the Supreme Sovereignty of God",
            "text": "A system that \"subordinates the basic rights of individuals and of groups to the collective organization of production\" is contrary to human dignity. Every practice that reduces persons to nothing more than means of profit enslaves man, leads to idolizing money, and contributes to the spread of atheism. \"You cannot serve God and mammon.\""
      },
      {
            "number": 2445,
            "title": "Love for the Poor is Incompatible with Immoderate Love of Riches",
            "text": "Love for the poor is incompatible with immoderate love of riches or their selfish use: \"Come now, you rich, weep and howl for the miseries that are coming upon you. Your riches have rotted and your garments are moth-eaten. Your gold and silver have rusted, and their rust will be evidence against you.\""
      },
      {
            "number": 2544,
            "title": "Disciples of Christ Renounce All for the Precept of Evangelical Poverty",
            "text": "Jesus enjoins his disciples to prefer him to everything and to everyone, and bids them \"renounce all that they have\" for his sake and that of the Gospel. The precept of detachment from riches is obligatory for entrance into the Kingdom of heaven."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Encyclical Centesimus Annus",
            "citation": "CA 36",
            "insight": "It is not wrong to want to live better; what is wrong is a style of life directed towards \"having\" rather than \"being\", wanting to have more in order to spend life in enjoyment as an end in itself."
      }
],
    inBrief: [
      "The person who is trustworthy in very small matters is also trustworthy in great ones (Luke 16:10).",
      "No servant can serve two masters: you cannot serve both God and money (Luke 16:13).",
      "Evangelical poverty of spirit frees the baptized soul to possess God as its only supreme treasure."
],
    meditationQuestion: 'Does any created attachment, bank account, or comfort secretly compete with God\'s absolute sovereignty over my heart?',
    practicalLiving: 'Practice hidden detachment today: give an alms anonymously or decline a superfluous material indulgence in thanksgiving to God.',
    crossReferences: [
      "Luke 16:9-15",
      "Matthew 6:24",
      "1 Timothy 6:10",
      "CCC 2544"
]
  },
  'lk 16:9-15':   {
    gospelCitation: 'Luke 16:9-15',
    topicTitle: 'Trustworthy in Small Matters & Undivided in Serving God Alone: True Riches and Detachment',
    topicSubtitle: 'No servant can serve two masters: the moral demand of single-hearted fidelity to God over the idolatry of mammon',
    pillar: '',
    part: 'Part Three: Life in Christ',
    section: 'Section Two: The Ten Commandments',
    chapter: 'The Seventh & Tenth Commandments — Justice, Solidarity, and Poverty of Heart',
    paragraphsRange: 'Catechism of the Catholic Church 2407, 2424, 2445, 2544',
    catechismArticles: [
      {
            "number": 2407,
            "title": "Moderating Attachment to Worldly Goods through Justice and Solidarity",
            "text": "In economic matters, respect for human dignity requires the practice of the virtue of temperance, so as to moderate attachment to this world's goods; the practice of the virtue of justice, to preserve our neighbor's rights and render him what is his due; and the practice of solidarity, in accordance with the golden rule and in keeping with the generosity of the Lord, who \"though he was rich, yet for your sake became poor, so that by his poverty you might become rich.\""
      },
      {
            "number": 2424,
            "title": "Subordination of Economic Systems to the Supreme Sovereignty of God",
            "text": "A system that \"subordinates the basic rights of individuals and of groups to the collective organization of production\" is contrary to human dignity. Every practice that reduces persons to nothing more than means of profit enslaves man, leads to idolizing money, and contributes to the spread of atheism. \"You cannot serve God and mammon.\""
      },
      {
            "number": 2445,
            "title": "Love for the Poor is Incompatible with Immoderate Love of Riches",
            "text": "Love for the poor is incompatible with immoderate love of riches or their selfish use: \"Come now, you rich, weep and howl for the miseries that are coming upon you. Your riches have rotted and your garments are moth-eaten. Your gold and silver have rusted, and their rust will be evidence against you.\""
      },
      {
            "number": 2544,
            "title": "Disciples of Christ Renounce All for the Precept of Evangelical Poverty",
            "text": "Jesus enjoins his disciples to prefer him to everything and to everyone, and bids them \"renounce all that they have\" for his sake and that of the Gospel. The precept of detachment from riches is obligatory for entrance into the Kingdom of heaven."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Encyclical Centesimus Annus",
            "citation": "CA 36",
            "insight": "It is not wrong to want to live better; what is wrong is a style of life directed towards \"having\" rather than \"being\", wanting to have more in order to spend life in enjoyment as an end in itself."
      }
],
    inBrief: [
      "The person who is trustworthy in very small matters is also trustworthy in great ones (Luke 16:10).",
      "No servant can serve two masters: you cannot serve both God and money (Luke 16:13).",
      "Evangelical poverty of spirit frees the baptized soul to possess God as its only supreme treasure."
],
    meditationQuestion: 'Does any created attachment, bank account, or comfort secretly compete with God\'s absolute sovereignty over my heart?',
    practicalLiving: 'Practice hidden detachment today: give an alms anonymously or decline a superfluous material indulgence in thanksgiving to God.',
    crossReferences: [
      "Luke 16:9-15",
      "Matthew 6:24",
      "1 Timothy 6:10",
      "CCC 2544"
]
  },
  'luke 16:9':   {
    gospelCitation: 'Luke 16:9-15',
    topicTitle: 'Trustworthy in Small Matters & Undivided in Serving God Alone: True Riches and Detachment',
    topicSubtitle: 'No servant can serve two masters: the moral demand of single-hearted fidelity to God over the idolatry of mammon',
    pillar: '',
    part: 'Part Three: Life in Christ',
    section: 'Section Two: The Ten Commandments',
    chapter: 'The Seventh & Tenth Commandments — Justice, Solidarity, and Poverty of Heart',
    paragraphsRange: 'Catechism of the Catholic Church 2407, 2424, 2445, 2544',
    catechismArticles: [
      {
            "number": 2407,
            "title": "Moderating Attachment to Worldly Goods through Justice and Solidarity",
            "text": "In economic matters, respect for human dignity requires the practice of the virtue of temperance, so as to moderate attachment to this world's goods; the practice of the virtue of justice, to preserve our neighbor's rights and render him what is his due; and the practice of solidarity, in accordance with the golden rule and in keeping with the generosity of the Lord, who \"though he was rich, yet for your sake became poor, so that by his poverty you might become rich.\""
      },
      {
            "number": 2424,
            "title": "Subordination of Economic Systems to the Supreme Sovereignty of God",
            "text": "A system that \"subordinates the basic rights of individuals and of groups to the collective organization of production\" is contrary to human dignity. Every practice that reduces persons to nothing more than means of profit enslaves man, leads to idolizing money, and contributes to the spread of atheism. \"You cannot serve God and mammon.\""
      },
      {
            "number": 2445,
            "title": "Love for the Poor is Incompatible with Immoderate Love of Riches",
            "text": "Love for the poor is incompatible with immoderate love of riches or their selfish use: \"Come now, you rich, weep and howl for the miseries that are coming upon you. Your riches have rotted and your garments are moth-eaten. Your gold and silver have rusted, and their rust will be evidence against you.\""
      },
      {
            "number": 2544,
            "title": "Disciples of Christ Renounce All for the Precept of Evangelical Poverty",
            "text": "Jesus enjoins his disciples to prefer him to everything and to everyone, and bids them \"renounce all that they have\" for his sake and that of the Gospel. The precept of detachment from riches is obligatory for entrance into the Kingdom of heaven."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Encyclical Centesimus Annus",
            "citation": "CA 36",
            "insight": "It is not wrong to want to live better; what is wrong is a style of life directed towards \"having\" rather than \"being\", wanting to have more in order to spend life in enjoyment as an end in itself."
      }
],
    inBrief: [
      "The person who is trustworthy in very small matters is also trustworthy in great ones (Luke 16:10).",
      "No servant can serve two masters: you cannot serve both God and money (Luke 16:13).",
      "Evangelical poverty of spirit frees the baptized soul to possess God as its only supreme treasure."
],
    meditationQuestion: 'Does any created attachment, bank account, or comfort secretly compete with God\'s absolute sovereignty over my heart?',
    practicalLiving: 'Practice hidden detachment today: give an alms anonymously or decline a superfluous material indulgence in thanksgiving to God.',
    crossReferences: [
      "Luke 16:9-15",
      "Matthew 6:24",
      "1 Timothy 6:10",
      "CCC 2544"
]
  },
  'mark 12:38-44':   {
    gospelCitation: 'Mark 12:38-44',
    topicTitle: 'The Widow\'s Two Coins: Evangelical Poverty, Humility & The Total Gift of the Heart',
    topicSubtitle: 'Christ contrasts the ostentatious religion of the scribes with the sacrificial love of the poor widow who gave her whole livelihood',
    pillar: '',
    part: 'Part Three: Life in Christ',
    section: 'Section Two: The Ten Commandments',
    chapter: 'The Beatitudes & The Tenth Commandment — Poverty of Heart',
    paragraphsRange: 'Catechism of the Catholic Church 2443, 2447, 2544, 2546',
    catechismArticles: [
      {
            "number": 2443,
            "title": "God Blesses Those Who Come to the Aid of the Poor",
            "text": "God blesses those who come to the aid of the poor and rebukes those who turn away from them: \"Give to him who begs from you, do not refuse him who would borrow from you\"; \"you received without pay, give without pay.\" It is by what they have done for the poor that Jesus Christ will recognize his chosen ones."
      },
      {
            "number": 2447,
            "title": "The Spiritual and Corporal Works of Mercy",
            "text": "The works of mercy are charitable actions by which we come to the aid of our neighbor in his spiritual and bodily necessities. Instructing, advising, consoling, comforting are spiritual works of mercy, as are forgiving and bearing wrongs patiently. The corporal works of mercy consist especially in feeding the hungry, sheltering the homeless, clothing the naked, visiting the sick and imprisoned."
      },
      {
            "number": 2546,
            "title": "Blessed are the Poor in Spirit: The Mystery of Complete Abandonment",
            "text": "\"Blessed are the poor in spirit.\" The Beatitudes reveal an order of happiness and grace, of beauty and peace. Jesus celebrates the joy of the poor, to whom the Kingdom already belongs."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Benedict XVI",
            "documentTitle": "Angelus Address on the Poor Widow's Offering",
            "citation": "Nov 11, 2012",
            "insight": "In God's balance, it is not the quantity that is measured, but the weight of love. This widow is the living icon of the Church offering herself entirely to her Spouse Jesus Christ."
      }
],
    inBrief: [
      "Amen, I say to you, this poor widow put in more than all the other contributors to the treasury (Mark 12:43).",
      "The value of an offering before God is determined not by monetary abundance, but by the fullness of the heart that gives it.",
      "Total self-surrender to Christ is the pure root of all evangelical holiness."
],
    meditationQuestion: 'Do I hold back parts of my life from God while offering only what is leftover and convenient?',
    practicalLiving: 'Make a heartfelt act of total surrender today, praying: "Take, Lord, and receive all my liberty, my memory, my understanding, and my entire will."',
    crossReferences: [
      "Mark 12:38-44",
      "2 Corinthians 8:9",
      "CCC 2447",
      "CCC 2546"
]
  },
  'mk 12:38-44':   {
    gospelCitation: 'Mark 12:38-44',
    topicTitle: 'The Widow\'s Two Coins: Evangelical Poverty, Humility & The Total Gift of the Heart',
    topicSubtitle: 'Christ contrasts the ostentatious religion of the scribes with the sacrificial love of the poor widow who gave her whole livelihood',
    pillar: '',
    part: 'Part Three: Life in Christ',
    section: 'Section Two: The Ten Commandments',
    chapter: 'The Beatitudes & The Tenth Commandment — Poverty of Heart',
    paragraphsRange: 'Catechism of the Catholic Church 2443, 2447, 2544, 2546',
    catechismArticles: [
      {
            "number": 2443,
            "title": "God Blesses Those Who Come to the Aid of the Poor",
            "text": "God blesses those who come to the aid of the poor and rebukes those who turn away from them: \"Give to him who begs from you, do not refuse him who would borrow from you\"; \"you received without pay, give without pay.\" It is by what they have done for the poor that Jesus Christ will recognize his chosen ones."
      },
      {
            "number": 2447,
            "title": "The Spiritual and Corporal Works of Mercy",
            "text": "The works of mercy are charitable actions by which we come to the aid of our neighbor in his spiritual and bodily necessities. Instructing, advising, consoling, comforting are spiritual works of mercy, as are forgiving and bearing wrongs patiently. The corporal works of mercy consist especially in feeding the hungry, sheltering the homeless, clothing the naked, visiting the sick and imprisoned."
      },
      {
            "number": 2546,
            "title": "Blessed are the Poor in Spirit: The Mystery of Complete Abandonment",
            "text": "\"Blessed are the poor in spirit.\" The Beatitudes reveal an order of happiness and grace, of beauty and peace. Jesus celebrates the joy of the poor, to whom the Kingdom already belongs."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Benedict XVI",
            "documentTitle": "Angelus Address on the Poor Widow's Offering",
            "citation": "Nov 11, 2012",
            "insight": "In God's balance, it is not the quantity that is measured, but the weight of love. This widow is the living icon of the Church offering herself entirely to her Spouse Jesus Christ."
      }
],
    inBrief: [
      "Amen, I say to you, this poor widow put in more than all the other contributors to the treasury (Mark 12:43).",
      "The value of an offering before God is determined not by monetary abundance, but by the fullness of the heart that gives it.",
      "Total self-surrender to Christ is the pure root of all evangelical holiness."
],
    meditationQuestion: 'Do I hold back parts of my life from God while offering only what is leftover and convenient?',
    practicalLiving: 'Make a heartfelt act of total surrender today, praying: "Take, Lord, and receive all my liberty, my memory, my understanding, and my entire will."',
    crossReferences: [
      "Mark 12:38-44",
      "2 Corinthians 8:9",
      "CCC 2447",
      "CCC 2546"
]
  },
  'mark 12:38':   {
    gospelCitation: 'Mark 12:38-44',
    topicTitle: 'The Widow\'s Two Coins: Evangelical Poverty, Humility & The Total Gift of the Heart',
    topicSubtitle: 'Christ contrasts the ostentatious religion of the scribes with the sacrificial love of the poor widow who gave her whole livelihood',
    pillar: '',
    part: 'Part Three: Life in Christ',
    section: 'Section Two: The Ten Commandments',
    chapter: 'The Beatitudes & The Tenth Commandment — Poverty of Heart',
    paragraphsRange: 'Catechism of the Catholic Church 2443, 2447, 2544, 2546',
    catechismArticles: [
      {
            "number": 2443,
            "title": "God Blesses Those Who Come to the Aid of the Poor",
            "text": "God blesses those who come to the aid of the poor and rebukes those who turn away from them: \"Give to him who begs from you, do not refuse him who would borrow from you\"; \"you received without pay, give without pay.\" It is by what they have done for the poor that Jesus Christ will recognize his chosen ones."
      },
      {
            "number": 2447,
            "title": "The Spiritual and Corporal Works of Mercy",
            "text": "The works of mercy are charitable actions by which we come to the aid of our neighbor in his spiritual and bodily necessities. Instructing, advising, consoling, comforting are spiritual works of mercy, as are forgiving and bearing wrongs patiently. The corporal works of mercy consist especially in feeding the hungry, sheltering the homeless, clothing the naked, visiting the sick and imprisoned."
      },
      {
            "number": 2546,
            "title": "Blessed are the Poor in Spirit: The Mystery of Complete Abandonment",
            "text": "\"Blessed are the poor in spirit.\" The Beatitudes reveal an order of happiness and grace, of beauty and peace. Jesus celebrates the joy of the poor, to whom the Kingdom already belongs."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Benedict XVI",
            "documentTitle": "Angelus Address on the Poor Widow's Offering",
            "citation": "Nov 11, 2012",
            "insight": "In God's balance, it is not the quantity that is measured, but the weight of love. This widow is the living icon of the Church offering herself entirely to her Spouse Jesus Christ."
      }
],
    inBrief: [
      "Amen, I say to you, this poor widow put in more than all the other contributors to the treasury (Mark 12:43).",
      "The value of an offering before God is determined not by monetary abundance, but by the fullness of the heart that gives it.",
      "Total self-surrender to Christ is the pure root of all evangelical holiness."
],
    meditationQuestion: 'Do I hold back parts of my life from God while offering only what is leftover and convenient?',
    practicalLiving: 'Make a heartfelt act of total surrender today, praying: "Take, Lord, and receive all my liberty, my memory, my understanding, and my entire will."',
    crossReferences: [
      "Mark 12:38-44",
      "2 Corinthians 8:9",
      "CCC 2447",
      "CCC 2546"
]
  },
  'john 2:13-22':   {
    gospelCitation: 'John 2:13-22',
    topicTitle: 'The Dedication of the Lateran Basilica: The Church as Living Temple of the Holy Spirit',
    topicSubtitle: 'Destroy this temple, and in three days I will raise it up: Christ speaks of the temple of His Sacred Body and the Mother Church of Rome',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Two: The Sacraments of Faith',
    section: 'Section Two: The Seven Sacraments',
    chapter: 'The Church, Temple of the Holy Spirit & Liturgical Architecture',
    paragraphsRange: 'Catechism of the Catholic Church 583, 584, 797, 1179',
    catechismArticles: [
      {
            "number": 583,
            "title": "Jesus and the Temple of Jerusalem",
            "text": "Like the prophets before him Jesus evinced the deepest respect for the Temple at Jerusalem. There he was presented by Joseph and Mary forty days after his birth. At the age of twelve he decided to remain in the Temple to remind his parents that he must be about his Father's business. Indeed his very mission exercised itself in the Temple."
      },
      {
            "number": 584,
            "title": "Zeal for the Father's House and the Prophecy of the New Temple",
            "text": "Jesus went up to the Temple as the privileged place of encounter with God. For him, the Temple was the dwelling of his Father, a house of prayer, and he was angered that its outer court had become a place of commerce. He drives out the merchants out of zeal for his Father: \"Take these things away; you shall not make my Father's house a house of trade.\""
      },
      {
            "number": 797,
            "title": "The Church as the Temple of the Living God",
            "text": "\"What the soul is to the human body, the Holy Spirit is to the Body of Christ, which is the Church.\" To this Spirit of Christ, as an invisible principle, is to be attributed the fact that all the parts of the body are joined one with the other and with their exalted Head; the Holy Spirit makes the Church \"the temple of the living God.\""
      },
      {
            "number": 1179,
            "title": "Visible Churches are Sacred Signs of the Heavenly Jerusalem",
            "text": "Visible churches are not simply gathering places but signify and make manifest the Church living in this place, the dwelling of God with men reconciled and united in Christ."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Benedict XVI",
            "documentTitle": "Homily on the Feast of the Dedication of the Lateran Basilica",
            "citation": "Nov 9, 2008",
            "insight": "The Lateran Basilica is the Cathedral of Rome, Mother and Head of all churches in the city and of the world. Celebrating its dedication reminds us that the unity of the Catholic Church has a visible center in the See of Peter."
      }
],
    inBrief: [
      "Zeal for your house will consume me (John 2:17).",
      "The Lateran Basilica stands as the venerable Mother Church of Catholic Christendom and symbol of apostolic unity.",
      "Every baptized soul is consecrated as a living temple of the Holy Spirit."
],
    meditationQuestion: 'Do I treat my soul, and the visible church building where the Blessed Sacrament dwells, with supreme reverence and adoration?',
    practicalLiving: 'Make a reverent genuflection and silent prayer of reparation before the tabernacle today for offenses committed against the Sacred Liturgy.',
    crossReferences: [
      "John 2:13-22",
      "1 Corinthians 3:16",
      "CCC 797",
      "CCC 1179"
]
  },
  'jn 2:13-22':   {
    gospelCitation: 'John 2:13-22',
    topicTitle: 'The Dedication of the Lateran Basilica: The Church as Living Temple of the Holy Spirit',
    topicSubtitle: 'Destroy this temple, and in three days I will raise it up: Christ speaks of the temple of His Sacred Body and the Mother Church of Rome',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Two: The Sacraments of Faith',
    section: 'Section Two: The Seven Sacraments',
    chapter: 'The Church, Temple of the Holy Spirit & Liturgical Architecture',
    paragraphsRange: 'Catechism of the Catholic Church 583, 584, 797, 1179',
    catechismArticles: [
      {
            "number": 583,
            "title": "Jesus and the Temple of Jerusalem",
            "text": "Like the prophets before him Jesus evinced the deepest respect for the Temple at Jerusalem. There he was presented by Joseph and Mary forty days after his birth. At the age of twelve he decided to remain in the Temple to remind his parents that he must be about his Father's business. Indeed his very mission exercised itself in the Temple."
      },
      {
            "number": 584,
            "title": "Zeal for the Father's House and the Prophecy of the New Temple",
            "text": "Jesus went up to the Temple as the privileged place of encounter with God. For him, the Temple was the dwelling of his Father, a house of prayer, and he was angered that its outer court had become a place of commerce. He drives out the merchants out of zeal for his Father: \"Take these things away; you shall not make my Father's house a house of trade.\""
      },
      {
            "number": 797,
            "title": "The Church as the Temple of the Living God",
            "text": "\"What the soul is to the human body, the Holy Spirit is to the Body of Christ, which is the Church.\" To this Spirit of Christ, as an invisible principle, is to be attributed the fact that all the parts of the body are joined one with the other and with their exalted Head; the Holy Spirit makes the Church \"the temple of the living God.\""
      },
      {
            "number": 1179,
            "title": "Visible Churches are Sacred Signs of the Heavenly Jerusalem",
            "text": "Visible churches are not simply gathering places but signify and make manifest the Church living in this place, the dwelling of God with men reconciled and united in Christ."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Benedict XVI",
            "documentTitle": "Homily on the Feast of the Dedication of the Lateran Basilica",
            "citation": "Nov 9, 2008",
            "insight": "The Lateran Basilica is the Cathedral of Rome, Mother and Head of all churches in the city and of the world. Celebrating its dedication reminds us that the unity of the Catholic Church has a visible center in the See of Peter."
      }
],
    inBrief: [
      "Zeal for your house will consume me (John 2:17).",
      "The Lateran Basilica stands as the venerable Mother Church of Catholic Christendom and symbol of apostolic unity.",
      "Every baptized soul is consecrated as a living temple of the Holy Spirit."
],
    meditationQuestion: 'Do I treat my soul, and the visible church building where the Blessed Sacrament dwells, with supreme reverence and adoration?',
    practicalLiving: 'Make a reverent genuflection and silent prayer of reparation before the tabernacle today for offenses committed against the Sacred Liturgy.',
    crossReferences: [
      "John 2:13-22",
      "1 Corinthians 3:16",
      "CCC 797",
      "CCC 1179"
]
  },
  'john 2:13':   {
    gospelCitation: 'John 2:13-22',
    topicTitle: 'The Dedication of the Lateran Basilica: The Church as Living Temple of the Holy Spirit',
    topicSubtitle: 'Destroy this temple, and in three days I will raise it up: Christ speaks of the temple of His Sacred Body and the Mother Church of Rome',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Two: The Sacraments of Faith',
    section: 'Section Two: The Seven Sacraments',
    chapter: 'The Church, Temple of the Holy Spirit & Liturgical Architecture',
    paragraphsRange: 'Catechism of the Catholic Church 583, 584, 797, 1179',
    catechismArticles: [
      {
            "number": 583,
            "title": "Jesus and the Temple of Jerusalem",
            "text": "Like the prophets before him Jesus evinced the deepest respect for the Temple at Jerusalem. There he was presented by Joseph and Mary forty days after his birth. At the age of twelve he decided to remain in the Temple to remind his parents that he must be about his Father's business. Indeed his very mission exercised itself in the Temple."
      },
      {
            "number": 584,
            "title": "Zeal for the Father's House and the Prophecy of the New Temple",
            "text": "Jesus went up to the Temple as the privileged place of encounter with God. For him, the Temple was the dwelling of his Father, a house of prayer, and he was angered that its outer court had become a place of commerce. He drives out the merchants out of zeal for his Father: \"Take these things away; you shall not make my Father's house a house of trade.\""
      },
      {
            "number": 797,
            "title": "The Church as the Temple of the Living God",
            "text": "\"What the soul is to the human body, the Holy Spirit is to the Body of Christ, which is the Church.\" To this Spirit of Christ, as an invisible principle, is to be attributed the fact that all the parts of the body are joined one with the other and with their exalted Head; the Holy Spirit makes the Church \"the temple of the living God.\""
      },
      {
            "number": 1179,
            "title": "Visible Churches are Sacred Signs of the Heavenly Jerusalem",
            "text": "Visible churches are not simply gathering places but signify and make manifest the Church living in this place, the dwelling of God with men reconciled and united in Christ."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Benedict XVI",
            "documentTitle": "Homily on the Feast of the Dedication of the Lateran Basilica",
            "citation": "Nov 9, 2008",
            "insight": "The Lateran Basilica is the Cathedral of Rome, Mother and Head of all churches in the city and of the world. Celebrating its dedication reminds us that the unity of the Catholic Church has a visible center in the See of Peter."
      }
],
    inBrief: [
      "Zeal for your house will consume me (John 2:17).",
      "The Lateran Basilica stands as the venerable Mother Church of Catholic Christendom and symbol of apostolic unity.",
      "Every baptized soul is consecrated as a living temple of the Holy Spirit."
],
    meditationQuestion: 'Do I treat my soul, and the visible church building where the Blessed Sacrament dwells, with supreme reverence and adoration?',
    practicalLiving: 'Make a reverent genuflection and silent prayer of reparation before the tabernacle today for offenses committed against the Sacred Liturgy.',
    crossReferences: [
      "John 2:13-22",
      "1 Corinthians 3:16",
      "CCC 797",
      "CCC 1179"
]
  },
  'luke 13:31-35':   {
    gospelCitation: 'Luke 13:31-35',
    topicTitle: 'Gathered Under the Wings of the Redeemer: Christ\'s Tears, Messianic Kingship & The Papacy',
    topicSubtitle: 'How often would I have gathered your children together as a hen gathers her brood under her wings: divine maternal tenderness and apostolic authority',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Profession of Christian Faith',
    chapter: 'The Mysteries of Christ\'s Ascent to Jerusalem and The Petrine Ministry',
    paragraphsRange: 'Catechism of the Catholic Church 557, 558, 881, 882',
    catechismArticles: [
      {
            "number": 557,
            "title": "Jesus Sets His Face Resolutely Toward Jerusalem",
            "text": "\"When the days were drawing near for him to be taken up, Jesus set his face to go to Jerusalem.\" By this decision he indicated that he was going up to Jerusalem prepared to die there. Three times he had announced his Passion and his Resurrection; now, heading toward Jerusalem he says: \"It cannot be that a prophet should perish away from Jerusalem.\""
      },
      {
            "number": 558,
            "title": "Christ Weeps Over Jerusalem in Holy Grief",
            "text": "Jesus recalls the martyrdom of the prophets who had been put to death in Jerusalem. Nevertheless he persists in calling Jerusalem to gather around him: \"How often would I have gathered your children together as a hen gathers her brood under her wings, and you would not!\""
      },
      {
            "number": 882,
            "title": "The Pope as Perpetual and Visible Source of Catholic Unity",
            "text": "The Pope, Bishop of Rome and Peter's successor, \"is the perpetual and visible source and foundation of the unity both of the bishops and of the whole company of the faithful.\" \"For the Roman Pontiff, by reason of his office as Vicar of Christ, and as pastor of the entire Church has full, supreme, and universal power over the whole Church.\""
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. Leo the Great",
            "documentTitle": "Sermon on the Feast of the Apostles Peter and Paul",
            "citation": "Sermo 82, 1",
            "insight": "Out of the whole world one man, Peter, is chosen to preside over the calling of all nations, and over all the other Apostles, and over all the Fathers of the Church."
      }
],
    inBrief: [
      "Jesus resolutely marches toward His sacrifice on Golgotha to gather the scattered children of God into one fold.",
      "Christ weeps over those who reject His saving mercy, revealing the boundless depths of divine tenderness.",
      "Through St. Leo the Great and the Roman Pontiffs, Christ guides His flock safely into the haven of truth."
],
    meditationQuestion: 'Do I allow Christ to gather all my fears and brokenness under His sheltering wings, or do I resist His gentle yoke?',
    practicalLiving: 'Pray an earnest Our Father and Hail Mary for the Holy Father, the Pope, and for the preservation of pristine Catholic dogma.',
    crossReferences: [
      "Luke 13:31-35",
      "Matthew 23:37",
      "CCC 558",
      "CCC 882"
]
  },
  'lk 13:31-35':   {
    gospelCitation: 'Luke 13:31-35',
    topicTitle: 'Gathered Under the Wings of the Redeemer: Christ\'s Tears, Messianic Kingship & The Papacy',
    topicSubtitle: 'How often would I have gathered your children together as a hen gathers her brood under her wings: divine maternal tenderness and apostolic authority',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Profession of Christian Faith',
    chapter: 'The Mysteries of Christ\'s Ascent to Jerusalem and The Petrine Ministry',
    paragraphsRange: 'Catechism of the Catholic Church 557, 558, 881, 882',
    catechismArticles: [
      {
            "number": 557,
            "title": "Jesus Sets His Face Resolutely Toward Jerusalem",
            "text": "\"When the days were drawing near for him to be taken up, Jesus set his face to go to Jerusalem.\" By this decision he indicated that he was going up to Jerusalem prepared to die there. Three times he had announced his Passion and his Resurrection; now, heading toward Jerusalem he says: \"It cannot be that a prophet should perish away from Jerusalem.\""
      },
      {
            "number": 558,
            "title": "Christ Weeps Over Jerusalem in Holy Grief",
            "text": "Jesus recalls the martyrdom of the prophets who had been put to death in Jerusalem. Nevertheless he persists in calling Jerusalem to gather around him: \"How often would I have gathered your children together as a hen gathers her brood under her wings, and you would not!\""
      },
      {
            "number": 882,
            "title": "The Pope as Perpetual and Visible Source of Catholic Unity",
            "text": "The Pope, Bishop of Rome and Peter's successor, \"is the perpetual and visible source and foundation of the unity both of the bishops and of the whole company of the faithful.\" \"For the Roman Pontiff, by reason of his office as Vicar of Christ, and as pastor of the entire Church has full, supreme, and universal power over the whole Church.\""
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. Leo the Great",
            "documentTitle": "Sermon on the Feast of the Apostles Peter and Paul",
            "citation": "Sermo 82, 1",
            "insight": "Out of the whole world one man, Peter, is chosen to preside over the calling of all nations, and over all the other Apostles, and over all the Fathers of the Church."
      }
],
    inBrief: [
      "Jesus resolutely marches toward His sacrifice on Golgotha to gather the scattered children of God into one fold.",
      "Christ weeps over those who reject His saving mercy, revealing the boundless depths of divine tenderness.",
      "Through St. Leo the Great and the Roman Pontiffs, Christ guides His flock safely into the haven of truth."
],
    meditationQuestion: 'Do I allow Christ to gather all my fears and brokenness under His sheltering wings, or do I resist His gentle yoke?',
    practicalLiving: 'Pray an earnest Our Father and Hail Mary for the Holy Father, the Pope, and for the preservation of pristine Catholic dogma.',
    crossReferences: [
      "Luke 13:31-35",
      "Matthew 23:37",
      "CCC 558",
      "CCC 882"
]
  },
  'luke 13:31':   {
    gospelCitation: 'Luke 13:31-35',
    topicTitle: 'Gathered Under the Wings of the Redeemer: Christ\'s Tears, Messianic Kingship & The Papacy',
    topicSubtitle: 'How often would I have gathered your children together as a hen gathers her brood under her wings: divine maternal tenderness and apostolic authority',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Profession of Christian Faith',
    chapter: 'The Mysteries of Christ\'s Ascent to Jerusalem and The Petrine Ministry',
    paragraphsRange: 'Catechism of the Catholic Church 557, 558, 881, 882',
    catechismArticles: [
      {
            "number": 557,
            "title": "Jesus Sets His Face Resolutely Toward Jerusalem",
            "text": "\"When the days were drawing near for him to be taken up, Jesus set his face to go to Jerusalem.\" By this decision he indicated that he was going up to Jerusalem prepared to die there. Three times he had announced his Passion and his Resurrection; now, heading toward Jerusalem he says: \"It cannot be that a prophet should perish away from Jerusalem.\""
      },
      {
            "number": 558,
            "title": "Christ Weeps Over Jerusalem in Holy Grief",
            "text": "Jesus recalls the martyrdom of the prophets who had been put to death in Jerusalem. Nevertheless he persists in calling Jerusalem to gather around him: \"How often would I have gathered your children together as a hen gathers her brood under her wings, and you would not!\""
      },
      {
            "number": 882,
            "title": "The Pope as Perpetual and Visible Source of Catholic Unity",
            "text": "The Pope, Bishop of Rome and Peter's successor, \"is the perpetual and visible source and foundation of the unity both of the bishops and of the whole company of the faithful.\" \"For the Roman Pontiff, by reason of his office as Vicar of Christ, and as pastor of the entire Church has full, supreme, and universal power over the whole Church.\""
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. Leo the Great",
            "documentTitle": "Sermon on the Feast of the Apostles Peter and Paul",
            "citation": "Sermo 82, 1",
            "insight": "Out of the whole world one man, Peter, is chosen to preside over the calling of all nations, and over all the other Apostles, and over all the Fathers of the Church."
      }
],
    inBrief: [
      "Jesus resolutely marches toward His sacrifice on Golgotha to gather the scattered children of God into one fold.",
      "Christ weeps over those who reject His saving mercy, revealing the boundless depths of divine tenderness.",
      "Through St. Leo the Great and the Roman Pontiffs, Christ guides His flock safely into the haven of truth."
],
    meditationQuestion: 'Do I allow Christ to gather all my fears and brokenness under His sheltering wings, or do I resist His gentle yoke?',
    practicalLiving: 'Pray an earnest Our Father and Hail Mary for the Holy Father, the Pope, and for the preservation of pristine Catholic dogma.',
    crossReferences: [
      "Luke 13:31-35",
      "Matthew 23:37",
      "CCC 558",
      "CCC 882"
]
  },
  'matthew 14:22-33':   {
    gospelCitation: 'Matthew 14:22-33',
    topicTitle: 'Take Courage, It Is I; Do Not Be Afraid! Walking on Water & The Triumph of Faith',
    topicSubtitle: 'Lord, save me! Christ reaches out His hand to rescue Peter from the tempestuous waves, manifesting His divine Lordship',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Four: Christian Prayer',
    section: 'Section One: "I Believe" — Faith Tested in the Crucible of Doubt',
    chapter: 'The Obedience of Faith and The Cry of Petrine Supplication',
    paragraphsRange: 'Catechism of the Catholic Church 150, 164, 448, 2616',
    catechismArticles: [
      {
            "number": 150,
            "title": "Faith as Personal Adherence of Man to God",
            "text": "Faith is first of all a personal adherence of man to God. At the same time, and inseparably, it is a free assent to the whole truth that God has revealed. As personal adherence to God and assent to his truth, Christian faith differs from our faith in any human person. It is right and just to entrust oneself wholly to God and to believe absolutely what he says."
      },
      {
            "number": 164,
            "title": "Now We See But in a Glass Darkly: The Battle of Faith Amid Storms",
            "text": "Now, however, \"we walk by faith, not by sight\"; we perceive God as \"in a mirror, dimly\" and only in part. Even though enlightened by him in whom it believes, faith is often lived in darkness and can be put to the test. The world we live in often seems very far from the one promised us by faith."
      },
      {
            "number": 2616,
            "title": "Prayer to Jesus is Answered from the Deepest Cry of Need",
            "text": "Prayer to Jesus is answered by him already during his ministry, through signs that anticipate the power of his Death and Resurrection: Jesus hears the prayer of faith, expressed in words or in silence. The urgent plea, \"Lord, save me!\", has been carried over in the prayer: \"Lord Jesus Christ, Son of God, have mercy on me, a sinner!\""
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Benedict XVI",
            "documentTitle": "Angelus Reflection on Peter Walking on the Waves",
            "citation": "Aug 7, 2011",
            "insight": "As long as Peter kept his gaze fixed on Jesus, he walked on the waters! This is the drama of every Christian life: when we look at our own weakness and the fury of the world's tempests, we sink; when we look at Christ and cry \"Lord, save me!\", His hand instantly catches us."
      }
],
    inBrief: [
      "Take courage, it is I; do not be afraid! (Matthew 14:27).",
      "The Church, like the boat of the Apostles, navigates the turbulent seas of history with Christ aboard.",
      "When our faith wavers, the instantaneous cry \"Lord, save me!\" summons the immediate rescue of the Son of God."
],
    meditationQuestion: 'In the midst of spiritual or temporal anxiety, is my gaze focused on the threatening waves or on the face of Jesus Christ?',
    practicalLiving: 'Whenever fear or anxiety strikes you today, immediately pray the Petrine aspiration: "Lord, save me; Jesus, I trust in You!"',
    crossReferences: [
      "Matthew 14:22-33",
      "Hebrews 11:1",
      "CCC 164",
      "CCC 2616"
]
  },
  'mt 14:22-33':   {
    gospelCitation: 'Matthew 14:22-33',
    topicTitle: 'Take Courage, It Is I; Do Not Be Afraid! Walking on Water & The Triumph of Faith',
    topicSubtitle: 'Lord, save me! Christ reaches out His hand to rescue Peter from the tempestuous waves, manifesting His divine Lordship',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Four: Christian Prayer',
    section: 'Section One: "I Believe" — Faith Tested in the Crucible of Doubt',
    chapter: 'The Obedience of Faith and The Cry of Petrine Supplication',
    paragraphsRange: 'Catechism of the Catholic Church 150, 164, 448, 2616',
    catechismArticles: [
      {
            "number": 150,
            "title": "Faith as Personal Adherence of Man to God",
            "text": "Faith is first of all a personal adherence of man to God. At the same time, and inseparably, it is a free assent to the whole truth that God has revealed. As personal adherence to God and assent to his truth, Christian faith differs from our faith in any human person. It is right and just to entrust oneself wholly to God and to believe absolutely what he says."
      },
      {
            "number": 164,
            "title": "Now We See But in a Glass Darkly: The Battle of Faith Amid Storms",
            "text": "Now, however, \"we walk by faith, not by sight\"; we perceive God as \"in a mirror, dimly\" and only in part. Even though enlightened by him in whom it believes, faith is often lived in darkness and can be put to the test. The world we live in often seems very far from the one promised us by faith."
      },
      {
            "number": 2616,
            "title": "Prayer to Jesus is Answered from the Deepest Cry of Need",
            "text": "Prayer to Jesus is answered by him already during his ministry, through signs that anticipate the power of his Death and Resurrection: Jesus hears the prayer of faith, expressed in words or in silence. The urgent plea, \"Lord, save me!\", has been carried over in the prayer: \"Lord Jesus Christ, Son of God, have mercy on me, a sinner!\""
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Benedict XVI",
            "documentTitle": "Angelus Reflection on Peter Walking on the Waves",
            "citation": "Aug 7, 2011",
            "insight": "As long as Peter kept his gaze fixed on Jesus, he walked on the waters! This is the drama of every Christian life: when we look at our own weakness and the fury of the world's tempests, we sink; when we look at Christ and cry \"Lord, save me!\", His hand instantly catches us."
      }
],
    inBrief: [
      "Take courage, it is I; do not be afraid! (Matthew 14:27).",
      "The Church, like the boat of the Apostles, navigates the turbulent seas of history with Christ aboard.",
      "When our faith wavers, the instantaneous cry \"Lord, save me!\" summons the immediate rescue of the Son of God."
],
    meditationQuestion: 'In the midst of spiritual or temporal anxiety, is my gaze focused on the threatening waves or on the face of Jesus Christ?',
    practicalLiving: 'Whenever fear or anxiety strikes you today, immediately pray the Petrine aspiration: "Lord, save me; Jesus, I trust in You!"',
    crossReferences: [
      "Matthew 14:22-33",
      "Hebrews 11:1",
      "CCC 164",
      "CCC 2616"
]
  },
  'matthew 14:22':   {
    gospelCitation: 'Matthew 14:22-33',
    topicTitle: 'Take Courage, It Is I; Do Not Be Afraid! Walking on Water & The Triumph of Faith',
    topicSubtitle: 'Lord, save me! Christ reaches out His hand to rescue Peter from the tempestuous waves, manifesting His divine Lordship',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Four: Christian Prayer',
    section: 'Section One: "I Believe" — Faith Tested in the Crucible of Doubt',
    chapter: 'The Obedience of Faith and The Cry of Petrine Supplication',
    paragraphsRange: 'Catechism of the Catholic Church 150, 164, 448, 2616',
    catechismArticles: [
      {
            "number": 150,
            "title": "Faith as Personal Adherence of Man to God",
            "text": "Faith is first of all a personal adherence of man to God. At the same time, and inseparably, it is a free assent to the whole truth that God has revealed. As personal adherence to God and assent to his truth, Christian faith differs from our faith in any human person. It is right and just to entrust oneself wholly to God and to believe absolutely what he says."
      },
      {
            "number": 164,
            "title": "Now We See But in a Glass Darkly: The Battle of Faith Amid Storms",
            "text": "Now, however, \"we walk by faith, not by sight\"; we perceive God as \"in a mirror, dimly\" and only in part. Even though enlightened by him in whom it believes, faith is often lived in darkness and can be put to the test. The world we live in often seems very far from the one promised us by faith."
      },
      {
            "number": 2616,
            "title": "Prayer to Jesus is Answered from the Deepest Cry of Need",
            "text": "Prayer to Jesus is answered by him already during his ministry, through signs that anticipate the power of his Death and Resurrection: Jesus hears the prayer of faith, expressed in words or in silence. The urgent plea, \"Lord, save me!\", has been carried over in the prayer: \"Lord Jesus Christ, Son of God, have mercy on me, a sinner!\""
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Benedict XVI",
            "documentTitle": "Angelus Reflection on Peter Walking on the Waves",
            "citation": "Aug 7, 2011",
            "insight": "As long as Peter kept his gaze fixed on Jesus, he walked on the waters! This is the drama of every Christian life: when we look at our own weakness and the fury of the world's tempests, we sink; when we look at Christ and cry \"Lord, save me!\", His hand instantly catches us."
      }
],
    inBrief: [
      "Take courage, it is I; do not be afraid! (Matthew 14:27).",
      "The Church, like the boat of the Apostles, navigates the turbulent seas of history with Christ aboard.",
      "When our faith wavers, the instantaneous cry \"Lord, save me!\" summons the immediate rescue of the Son of God."
],
    meditationQuestion: 'In the midst of spiritual or temporal anxiety, is my gaze focused on the threatening waves or on the face of Jesus Christ?',
    practicalLiving: 'Whenever fear or anxiety strikes you today, immediately pray the Petrine aspiration: "Lord, save me; Jesus, I trust in You!"',
    crossReferences: [
      "Matthew 14:22-33",
      "Hebrews 11:1",
      "CCC 164",
      "CCC 2616"
]
  },
  'matthew 11:25-30':   {
    gospelCitation: 'Matthew 11:25-30',
    topicTitle: 'Learn From Me, For I Am Meek & Humble of Heart: The Rest of the Soul and Filial Love',
    topicSubtitle: 'Come to me, all who labor and are heavy laden: Christ reveals the sweetness of the divine will to the little ones',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Four: Christian Prayer',
    section: 'Section Two: The Seven Petitions of the Lord\'s Prayer',
    chapter: 'The Sacred Humanity of Christ as Exemplar of All Virtue',
    paragraphsRange: 'Catechism of the Catholic Church 459, 544, 2785, 2822',
    catechismArticles: [
      {
            "number": 459,
            "title": "The Word Became Flesh to Be Our Model of Holiness",
            "text": "The Word became flesh to be our model of holiness: \"Take my yoke upon you, and learn from me; for I am gentle and lowly in heart, and you will find rest for your souls.\" \"I am the way, and the truth, and the life; no one comes to the Father, but by me.\""
      },
      {
            "number": 544,
            "title": "The Kingdom Belongs to the Poor and Little Ones",
            "text": "The Kingdom belongs to the poor and lowly, which means those who have accepted it with humble hearts. Jesus is sent to \"preach good news to the poor\"; he declares them blessed, for \"theirs is the kingdom of heaven.\" To them—the \"little ones\"—the Father is pleased to reveal what remains hidden from the wise and the learned."
      },
      {
            "number": 2785,
            "title": "Lifting Up Pure Hearts in Childlike Humility",
            "text": "Humility makes us see that \"no one knows the Son except the Father, and no one knows the Father except the Son and anyone to whom the Son chooses to reveal him,\" that is, to \"little children.\""
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John XXIII",
            "documentTitle": "Journal of a Soul",
            "citation": "1961",
            "insight": "O Jesus, meek and humble of heart, hear me! All the troubles of this world vanish when I place my tired head upon Your Sacred Heart. Your yoke is easy and Your burden is light, because You bear it with us."
      }
],
    inBrief: [
      "Take my yoke upon you, and learn from me, for I am meek and humble of heart (Matthew 11:29).",
      "The divine mysteries of the Trinity remain hidden from worldly pride but are graciously opened to spiritual children.",
      "True interior peace is found only in resting upon the Sacred Heart of the Redeemer."
],
    meditationQuestion: 'Am I bearing my daily burdens alone with bitter exhaustion, or am I yoked alongside Jesus Christ in humble docility?',
    practicalLiving: 'Offer up three stressful moments today with the quiet prayer: "Jesus, meek and humble of heart, make my heart like unto Thine."',
    crossReferences: [
      "Matthew 11:25-30",
      "Philippians 2:5-8",
      "CCC 459",
      "CCC 544"
]
  },
  'mt 11:25-30':   {
    gospelCitation: 'Matthew 11:25-30',
    topicTitle: 'Learn From Me, For I Am Meek & Humble of Heart: The Rest of the Soul and Filial Love',
    topicSubtitle: 'Come to me, all who labor and are heavy laden: Christ reveals the sweetness of the divine will to the little ones',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Four: Christian Prayer',
    section: 'Section Two: The Seven Petitions of the Lord\'s Prayer',
    chapter: 'The Sacred Humanity of Christ as Exemplar of All Virtue',
    paragraphsRange: 'Catechism of the Catholic Church 459, 544, 2785, 2822',
    catechismArticles: [
      {
            "number": 459,
            "title": "The Word Became Flesh to Be Our Model of Holiness",
            "text": "The Word became flesh to be our model of holiness: \"Take my yoke upon you, and learn from me; for I am gentle and lowly in heart, and you will find rest for your souls.\" \"I am the way, and the truth, and the life; no one comes to the Father, but by me.\""
      },
      {
            "number": 544,
            "title": "The Kingdom Belongs to the Poor and Little Ones",
            "text": "The Kingdom belongs to the poor and lowly, which means those who have accepted it with humble hearts. Jesus is sent to \"preach good news to the poor\"; he declares them blessed, for \"theirs is the kingdom of heaven.\" To them—the \"little ones\"—the Father is pleased to reveal what remains hidden from the wise and the learned."
      },
      {
            "number": 2785,
            "title": "Lifting Up Pure Hearts in Childlike Humility",
            "text": "Humility makes us see that \"no one knows the Son except the Father, and no one knows the Father except the Son and anyone to whom the Son chooses to reveal him,\" that is, to \"little children.\""
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John XXIII",
            "documentTitle": "Journal of a Soul",
            "citation": "1961",
            "insight": "O Jesus, meek and humble of heart, hear me! All the troubles of this world vanish when I place my tired head upon Your Sacred Heart. Your yoke is easy and Your burden is light, because You bear it with us."
      }
],
    inBrief: [
      "Take my yoke upon you, and learn from me, for I am meek and humble of heart (Matthew 11:29).",
      "The divine mysteries of the Trinity remain hidden from worldly pride but are graciously opened to spiritual children.",
      "True interior peace is found only in resting upon the Sacred Heart of the Redeemer."
],
    meditationQuestion: 'Am I bearing my daily burdens alone with bitter exhaustion, or am I yoked alongside Jesus Christ in humble docility?',
    practicalLiving: 'Offer up three stressful moments today with the quiet prayer: "Jesus, meek and humble of heart, make my heart like unto Thine."',
    crossReferences: [
      "Matthew 11:25-30",
      "Philippians 2:5-8",
      "CCC 459",
      "CCC 544"
]
  },
  'matthew 11:25':   {
    gospelCitation: 'Matthew 11:25-30',
    topicTitle: 'Learn From Me, For I Am Meek & Humble of Heart: The Rest of the Soul and Filial Love',
    topicSubtitle: 'Come to me, all who labor and are heavy laden: Christ reveals the sweetness of the divine will to the little ones',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Four: Christian Prayer',
    section: 'Section Two: The Seven Petitions of the Lord\'s Prayer',
    chapter: 'The Sacred Humanity of Christ as Exemplar of All Virtue',
    paragraphsRange: 'Catechism of the Catholic Church 459, 544, 2785, 2822',
    catechismArticles: [
      {
            "number": 459,
            "title": "The Word Became Flesh to Be Our Model of Holiness",
            "text": "The Word became flesh to be our model of holiness: \"Take my yoke upon you, and learn from me; for I am gentle and lowly in heart, and you will find rest for your souls.\" \"I am the way, and the truth, and the life; no one comes to the Father, but by me.\""
      },
      {
            "number": 544,
            "title": "The Kingdom Belongs to the Poor and Little Ones",
            "text": "The Kingdom belongs to the poor and lowly, which means those who have accepted it with humble hearts. Jesus is sent to \"preach good news to the poor\"; he declares them blessed, for \"theirs is the kingdom of heaven.\" To them—the \"little ones\"—the Father is pleased to reveal what remains hidden from the wise and the learned."
      },
      {
            "number": 2785,
            "title": "Lifting Up Pure Hearts in Childlike Humility",
            "text": "Humility makes us see that \"no one knows the Son except the Father, and no one knows the Father except the Son and anyone to whom the Son chooses to reveal him,\" that is, to \"little children.\""
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John XXIII",
            "documentTitle": "Journal of a Soul",
            "citation": "1961",
            "insight": "O Jesus, meek and humble of heart, hear me! All the troubles of this world vanish when I place my tired head upon Your Sacred Heart. Your yoke is easy and Your burden is light, because You bear it with us."
      }
],
    inBrief: [
      "Take my yoke upon you, and learn from me, for I am meek and humble of heart (Matthew 11:29).",
      "The divine mysteries of the Trinity remain hidden from worldly pride but are graciously opened to spiritual children.",
      "True interior peace is found only in resting upon the Sacred Heart of the Redeemer."
],
    meditationQuestion: 'Am I bearing my daily burdens alone with bitter exhaustion, or am I yoked alongside Jesus Christ in humble docility?',
    practicalLiving: 'Offer up three stressful moments today with the quiet prayer: "Jesus, meek and humble of heart, make my heart like unto Thine."',
    crossReferences: [
      "Matthew 11:25-30",
      "Philippians 2:5-8",
      "CCC 459",
      "CCC 544"
]
  },
  'luke 12:49-53':   {
    gospelCitation: 'Luke 12:49-53',
    topicTitle: 'The Saving Fire of Divine Charity Cast Upon the Earth: The Holy Spirit and Holy Zeal',
    topicSubtitle: 'I came to cast fire upon the earth, and would that it were already kindled! The purifying flame of the Cross and missionary martyrdom',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Holy Spirit',
    chapter: 'The Symbols of the Holy Spirit — Fire and Pentecost',
    paragraphsRange: 'Catechism of the Catholic Church 696, 718, 1827, 2604',
    catechismArticles: [
      {
            "number": 696,
            "title": "Fire as the Symbol of the Transforming Energy of the Holy Spirit",
            "text": "Fire symbolizes the transforming energy of the Holy Spirit's actions. John the Baptist proclaims Christ as the one who \"will baptize you with the Holy Spirit and with fire.\" Jesus will say of the Spirit: \"I came to cast fire upon the earth, and would that it were already kindled!\" In the form of tongues \"as of fire,\" the Holy Spirit rests on the disciples on the morning of Pentecost."
      },
      {
            "number": 1827,
            "title": "Charity as the Form of All Virtues and Soul of the Apostolate",
            "text": "The practice of all the virtues is animated and inspired by charity, which \"binds everything together in perfect harmony\"; it is the form of the virtues; it articulates and orders them among themselves; it is the source and the goal of their Christian practice."
      }
],
    magisterialInputs: [
      {
            "authority": "St. Catherine of Siena",
            "documentTitle": "Dialogue of Divine Providence",
            "citation": "Ch. 167",
            "insight": "O boundless Fire of Love! If you are what you ought to be, you will set all Italy on fire, indeed the whole world! Do not be satisfied with little things, for God expects great things from you!"
      }
],
    inBrief: [
      "I came to cast fire upon the earth, and would that it were already kindled! (Luke 12:49).",
      "The fire of Christ is the consuming furnace of the Holy Spirit, purifying souls and igniting apostolic zeal.",
      "Following Christ entails holy division from worldly compromise and total consecration to divine truth."
],
    meditationQuestion: 'Is my spiritual life burning with the supernatural fire of divine love, or has it grown cold with lukewarm conformity to the world?',
    practicalLiving: 'Pray the Golden Sequence: "Veni Sancte Spiritus, and enkindle in us the fire of Your divine love," taking one courageous action for Christ today.',
    crossReferences: [
      "Luke 12:49-53",
      "Acts 2:3",
      "CCC 696",
      "CCC 1827"
]
  },
  'lk 12:49-53':   {
    gospelCitation: 'Luke 12:49-53',
    topicTitle: 'The Saving Fire of Divine Charity Cast Upon the Earth: The Holy Spirit and Holy Zeal',
    topicSubtitle: 'I came to cast fire upon the earth, and would that it were already kindled! The purifying flame of the Cross and missionary martyrdom',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Holy Spirit',
    chapter: 'The Symbols of the Holy Spirit — Fire and Pentecost',
    paragraphsRange: 'Catechism of the Catholic Church 696, 718, 1827, 2604',
    catechismArticles: [
      {
            "number": 696,
            "title": "Fire as the Symbol of the Transforming Energy of the Holy Spirit",
            "text": "Fire symbolizes the transforming energy of the Holy Spirit's actions. John the Baptist proclaims Christ as the one who \"will baptize you with the Holy Spirit and with fire.\" Jesus will say of the Spirit: \"I came to cast fire upon the earth, and would that it were already kindled!\" In the form of tongues \"as of fire,\" the Holy Spirit rests on the disciples on the morning of Pentecost."
      },
      {
            "number": 1827,
            "title": "Charity as the Form of All Virtues and Soul of the Apostolate",
            "text": "The practice of all the virtues is animated and inspired by charity, which \"binds everything together in perfect harmony\"; it is the form of the virtues; it articulates and orders them among themselves; it is the source and the goal of their Christian practice."
      }
],
    magisterialInputs: [
      {
            "authority": "St. Catherine of Siena",
            "documentTitle": "Dialogue of Divine Providence",
            "citation": "Ch. 167",
            "insight": "O boundless Fire of Love! If you are what you ought to be, you will set all Italy on fire, indeed the whole world! Do not be satisfied with little things, for God expects great things from you!"
      }
],
    inBrief: [
      "I came to cast fire upon the earth, and would that it were already kindled! (Luke 12:49).",
      "The fire of Christ is the consuming furnace of the Holy Spirit, purifying souls and igniting apostolic zeal.",
      "Following Christ entails holy division from worldly compromise and total consecration to divine truth."
],
    meditationQuestion: 'Is my spiritual life burning with the supernatural fire of divine love, or has it grown cold with lukewarm conformity to the world?',
    practicalLiving: 'Pray the Golden Sequence: "Veni Sancte Spiritus, and enkindle in us the fire of Your divine love," taking one courageous action for Christ today.',
    crossReferences: [
      "Luke 12:49-53",
      "Acts 2:3",
      "CCC 696",
      "CCC 1827"
]
  },
  'luke 12:49':   {
    gospelCitation: 'Luke 12:49-53',
    topicTitle: 'The Saving Fire of Divine Charity Cast Upon the Earth: The Holy Spirit and Holy Zeal',
    topicSubtitle: 'I came to cast fire upon the earth, and would that it were already kindled! The purifying flame of the Cross and missionary martyrdom',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Holy Spirit',
    chapter: 'The Symbols of the Holy Spirit — Fire and Pentecost',
    paragraphsRange: 'Catechism of the Catholic Church 696, 718, 1827, 2604',
    catechismArticles: [
      {
            "number": 696,
            "title": "Fire as the Symbol of the Transforming Energy of the Holy Spirit",
            "text": "Fire symbolizes the transforming energy of the Holy Spirit's actions. John the Baptist proclaims Christ as the one who \"will baptize you with the Holy Spirit and with fire.\" Jesus will say of the Spirit: \"I came to cast fire upon the earth, and would that it were already kindled!\" In the form of tongues \"as of fire,\" the Holy Spirit rests on the disciples on the morning of Pentecost."
      },
      {
            "number": 1827,
            "title": "Charity as the Form of All Virtues and Soul of the Apostolate",
            "text": "The practice of all the virtues is animated and inspired by charity, which \"binds everything together in perfect harmony\"; it is the form of the virtues; it articulates and orders them among themselves; it is the source and the goal of their Christian practice."
      }
],
    magisterialInputs: [
      {
            "authority": "St. Catherine of Siena",
            "documentTitle": "Dialogue of Divine Providence",
            "citation": "Ch. 167",
            "insight": "O boundless Fire of Love! If you are what you ought to be, you will set all Italy on fire, indeed the whole world! Do not be satisfied with little things, for God expects great things from you!"
      }
],
    inBrief: [
      "I came to cast fire upon the earth, and would that it were already kindled! (Luke 12:49).",
      "The fire of Christ is the consuming furnace of the Holy Spirit, purifying souls and igniting apostolic zeal.",
      "Following Christ entails holy division from worldly compromise and total consecration to divine truth."
],
    meditationQuestion: 'Is my spiritual life burning with the supernatural fire of divine love, or has it grown cold with lukewarm conformity to the world?',
    practicalLiving: 'Pray the Golden Sequence: "Veni Sancte Spiritus, and enkindle in us the fire of Your divine love," taking one courageous action for Christ today.',
    crossReferences: [
      "Luke 12:49-53",
      "Acts 2:3",
      "CCC 696",
      "CCC 1827"
]
  },
  'luke 12:54-59':   {
    gospelCitation: 'Luke 12:54-59',
    topicTitle: 'Discerning the Present Time of Mercy & Reconciliation: Vigilance Before the Judgment Seat',
    topicSubtitle: 'You know how to interpret the appearance of earth and sky; but why do you not know how to interpret the present time?',
    pillar: '',
    part: 'Part Two: The Sacraments of the Church & Part Three: Life in Christ',
    section: 'Section Two: The Seven Sacraments',
    chapter: 'The Sacrament of Penance & Interior Conversion of Heart',
    paragraphsRange: 'Catechism of the Catholic Church 1430, 1435, 1438, 2843',
    catechismArticles: [
      {
            "number": 1430,
            "title": "Jesus' Call to Immediate and Radical Conversion of Heart",
            "text": "Jesus' call to conversion and penance, like that of the prophets before him, does not aim first at outward works, \"sackcloth and ashes,\" fasting and mortification, but at the conversion of the heart, interior conversion. Without this, such penances remain sterile and false."
      },
      {
            "number": 1435,
            "title": "Daily Conversion and Seeking Reconciliation with Others",
            "text": "Conversion is accomplished in daily life by gestures of reconciliation, concern for the poor, the exercise and defense of justice and right, by the admission of faults to one's brethren, fraternal correction, revision of life, examination of conscience, spiritual direction, acceptance of suffering."
      },
      {
            "number": 2843,
            "title": "Forgiving Our Debtors from the Depths of the Heart",
            "text": "Thus the Lord's words on forgiveness, the love that loves to the end, become a living reality. The parable of the unforgiving servant, which crowns the Lord's teaching on ecclesial communion, ends with these words: \"So also my heavenly Father will do to every one of you, if you do not forgive your brother from your heart.\""
      }
],
    magisterialInputs: [
      {
            "authority": "Second Vatican Ecumenical Council",
            "documentTitle": "Gaudium et Spes",
            "citation": "GS 4",
            "insight": "At all times the Church carries the responsibility of reading the signs of the times and of interpreting them in the light of the Gospel, if it is to carry out its task."
      }
],
    inBrief: [
      "Why do you not judge for yourselves what is right? Make an effort to be reconciled with your accuser on the way (Luke 12:57-58).",
      "The present hour is the acceptable time of mercy: delay of conversion endangers eternal salvation.",
      "Reconciliation with brothers and sisters is the indispensable condition for receiving God's absolution."
],
    meditationQuestion: 'Is there any grudge, unresolved offense, or delayed repentance in my life that I must bring to Christ\'s confessional today?',
    practicalLiving: 'Make a thorough examination of conscience tonight and plan your next sacramental Confession within the week.',
    crossReferences: [
      "Luke 12:54-59",
      "2 Corinthians 6:2",
      "CCC 1435",
      "CCC 2843"
]
  },
  'lk 12:54-59':   {
    gospelCitation: 'Luke 12:54-59',
    topicTitle: 'Discerning the Present Time of Mercy & Reconciliation: Vigilance Before the Judgment Seat',
    topicSubtitle: 'You know how to interpret the appearance of earth and sky; but why do you not know how to interpret the present time?',
    pillar: '',
    part: 'Part Two: The Sacraments of the Church & Part Three: Life in Christ',
    section: 'Section Two: The Seven Sacraments',
    chapter: 'The Sacrament of Penance & Interior Conversion of Heart',
    paragraphsRange: 'Catechism of the Catholic Church 1430, 1435, 1438, 2843',
    catechismArticles: [
      {
            "number": 1430,
            "title": "Jesus' Call to Immediate and Radical Conversion of Heart",
            "text": "Jesus' call to conversion and penance, like that of the prophets before him, does not aim first at outward works, \"sackcloth and ashes,\" fasting and mortification, but at the conversion of the heart, interior conversion. Without this, such penances remain sterile and false."
      },
      {
            "number": 1435,
            "title": "Daily Conversion and Seeking Reconciliation with Others",
            "text": "Conversion is accomplished in daily life by gestures of reconciliation, concern for the poor, the exercise and defense of justice and right, by the admission of faults to one's brethren, fraternal correction, revision of life, examination of conscience, spiritual direction, acceptance of suffering."
      },
      {
            "number": 2843,
            "title": "Forgiving Our Debtors from the Depths of the Heart",
            "text": "Thus the Lord's words on forgiveness, the love that loves to the end, become a living reality. The parable of the unforgiving servant, which crowns the Lord's teaching on ecclesial communion, ends with these words: \"So also my heavenly Father will do to every one of you, if you do not forgive your brother from your heart.\""
      }
],
    magisterialInputs: [
      {
            "authority": "Second Vatican Ecumenical Council",
            "documentTitle": "Gaudium et Spes",
            "citation": "GS 4",
            "insight": "At all times the Church carries the responsibility of reading the signs of the times and of interpreting them in the light of the Gospel, if it is to carry out its task."
      }
],
    inBrief: [
      "Why do you not judge for yourselves what is right? Make an effort to be reconciled with your accuser on the way (Luke 12:57-58).",
      "The present hour is the acceptable time of mercy: delay of conversion endangers eternal salvation.",
      "Reconciliation with brothers and sisters is the indispensable condition for receiving God's absolution."
],
    meditationQuestion: 'Is there any grudge, unresolved offense, or delayed repentance in my life that I must bring to Christ\'s confessional today?',
    practicalLiving: 'Make a thorough examination of conscience tonight and plan your next sacramental Confession within the week.',
    crossReferences: [
      "Luke 12:54-59",
      "2 Corinthians 6:2",
      "CCC 1435",
      "CCC 2843"
]
  },
  'luke 12:54':   {
    gospelCitation: 'Luke 12:54-59',
    topicTitle: 'Discerning the Present Time of Mercy & Reconciliation: Vigilance Before the Judgment Seat',
    topicSubtitle: 'You know how to interpret the appearance of earth and sky; but why do you not know how to interpret the present time?',
    pillar: '',
    part: 'Part Two: The Sacraments of the Church & Part Three: Life in Christ',
    section: 'Section Two: The Seven Sacraments',
    chapter: 'The Sacrament of Penance & Interior Conversion of Heart',
    paragraphsRange: 'Catechism of the Catholic Church 1430, 1435, 1438, 2843',
    catechismArticles: [
      {
            "number": 1430,
            "title": "Jesus' Call to Immediate and Radical Conversion of Heart",
            "text": "Jesus' call to conversion and penance, like that of the prophets before him, does not aim first at outward works, \"sackcloth and ashes,\" fasting and mortification, but at the conversion of the heart, interior conversion. Without this, such penances remain sterile and false."
      },
      {
            "number": 1435,
            "title": "Daily Conversion and Seeking Reconciliation with Others",
            "text": "Conversion is accomplished in daily life by gestures of reconciliation, concern for the poor, the exercise and defense of justice and right, by the admission of faults to one's brethren, fraternal correction, revision of life, examination of conscience, spiritual direction, acceptance of suffering."
      },
      {
            "number": 2843,
            "title": "Forgiving Our Debtors from the Depths of the Heart",
            "text": "Thus the Lord's words on forgiveness, the love that loves to the end, become a living reality. The parable of the unforgiving servant, which crowns the Lord's teaching on ecclesial communion, ends with these words: \"So also my heavenly Father will do to every one of you, if you do not forgive your brother from your heart.\""
      }
],
    magisterialInputs: [
      {
            "authority": "Second Vatican Ecumenical Council",
            "documentTitle": "Gaudium et Spes",
            "citation": "GS 4",
            "insight": "At all times the Church carries the responsibility of reading the signs of the times and of interpreting them in the light of the Gospel, if it is to carry out its task."
      }
],
    inBrief: [
      "Why do you not judge for yourselves what is right? Make an effort to be reconciled with your accuser on the way (Luke 12:57-58).",
      "The present hour is the acceptable time of mercy: delay of conversion endangers eternal salvation.",
      "Reconciliation with brothers and sisters is the indispensable condition for receiving God's absolution."
],
    meditationQuestion: 'Is there any grudge, unresolved offense, or delayed repentance in my life that I must bring to Christ\'s confessional today?',
    practicalLiving: 'Make a thorough examination of conscience tonight and plan your next sacramental Confession within the week.',
    crossReferences: [
      "Luke 12:54-59",
      "2 Corinthians 6:2",
      "CCC 1435",
      "CCC 2843"
]
  },
  'luke 14:1, 7-11':   {
    gospelCitation: 'Luke 14:1, 7-11',
    topicTitle: 'The Exaltation of Christian Humility: The Lowest Place at the Wedding Feast',
    topicSubtitle: 'For everyone who exalts himself will be humbled, and he who humbles himself will be exalted: the law of Christ\'s Kingdom',
    pillar: '',
    part: 'Part Three: Life in Christ & Part Four: Christian Prayer',
    section: 'Section One: Prayer in the Christian Life',
    chapter: 'Humility as the Foundation of Authentic Christian Prayer',
    paragraphsRange: 'Catechism of the Catholic Church 2546, 2559, 2713, 2728',
    catechismArticles: [
      {
            "number": 2559,
            "title": "Humility is the Foundation of All Prayer",
            "text": "\"Prayer is the raising of one's mind and heart to God or the requesting of good things from God.\" But when we pray, do we speak from the height of our pride and will, or \"out of the depths\" of a humble and contrite heart? He who humbles himself will be exalted; humility is the foundation of prayer. Only when we humbly acknowledge that \"we do not know how to pray as we ought,\" are we in a disposition to receive freely the gift of prayer."
      },
      {
            "number": 2713,
            "title": "Contemplative Prayer as the Silence of Humble Love",
            "text": "Contemplative prayer is the prayer of the child of God, of the forgiven sinner who agrees to welcome the love by which he is loved and who wants to respond to it by loving even more. Contemplative prayer is the poor and humble surrender to the loving will of the Father in ever deeper union with his beloved Son."
      }
],
    magisterialInputs: [
      {
            "authority": "St. Bernard of Clairvaux",
            "documentTitle": "The Steps of Humility and Pride",
            "citation": "Ch. 1",
            "insight": "Humility is a virtue by which a man has a low opinion of himself because he knows himself well. The higher you are placed in honor, the humbler you should be in all things; for by the humble God is glorified."
      }
],
    inBrief: [
      "Everyone who exalts himself will be humbled, and he who humbles himself will be exalted (Luke 14:11).",
      "Voluntary choice of the lowest seat opens the floodgates of divine grace.",
      "Humility is the mother of all theological virtues, without which prayer collapses into vanity."
],
    meditationQuestion: 'Do I seek applause, recognition, and the highest seats, or do I delight in hidden service for the gaze of God alone?',
    practicalLiving: 'Perform one act of hidden charity today that no one else will notice, offering it to Jesus who took the form of a servant.',
    crossReferences: [
      "Luke 14:1, 7-11",
      "James 4:6",
      "CCC 2559",
      "CCC 2713"
]
  },
  'lk 14:1, 7-11':   {
    gospelCitation: 'Luke 14:1, 7-11',
    topicTitle: 'The Exaltation of Christian Humility: The Lowest Place at the Wedding Feast',
    topicSubtitle: 'For everyone who exalts himself will be humbled, and he who humbles himself will be exalted: the law of Christ\'s Kingdom',
    pillar: '',
    part: 'Part Three: Life in Christ & Part Four: Christian Prayer',
    section: 'Section One: Prayer in the Christian Life',
    chapter: 'Humility as the Foundation of Authentic Christian Prayer',
    paragraphsRange: 'Catechism of the Catholic Church 2546, 2559, 2713, 2728',
    catechismArticles: [
      {
            "number": 2559,
            "title": "Humility is the Foundation of All Prayer",
            "text": "\"Prayer is the raising of one's mind and heart to God or the requesting of good things from God.\" But when we pray, do we speak from the height of our pride and will, or \"out of the depths\" of a humble and contrite heart? He who humbles himself will be exalted; humility is the foundation of prayer. Only when we humbly acknowledge that \"we do not know how to pray as we ought,\" are we in a disposition to receive freely the gift of prayer."
      },
      {
            "number": 2713,
            "title": "Contemplative Prayer as the Silence of Humble Love",
            "text": "Contemplative prayer is the prayer of the child of God, of the forgiven sinner who agrees to welcome the love by which he is loved and who wants to respond to it by loving even more. Contemplative prayer is the poor and humble surrender to the loving will of the Father in ever deeper union with his beloved Son."
      }
],
    magisterialInputs: [
      {
            "authority": "St. Bernard of Clairvaux",
            "documentTitle": "The Steps of Humility and Pride",
            "citation": "Ch. 1",
            "insight": "Humility is a virtue by which a man has a low opinion of himself because he knows himself well. The higher you are placed in honor, the humbler you should be in all things; for by the humble God is glorified."
      }
],
    inBrief: [
      "Everyone who exalts himself will be humbled, and he who humbles himself will be exalted (Luke 14:11).",
      "Voluntary choice of the lowest seat opens the floodgates of divine grace.",
      "Humility is the mother of all theological virtues, without which prayer collapses into vanity."
],
    meditationQuestion: 'Do I seek applause, recognition, and the highest seats, or do I delight in hidden service for the gaze of God alone?',
    practicalLiving: 'Perform one act of hidden charity today that no one else will notice, offering it to Jesus who took the form of a servant.',
    crossReferences: [
      "Luke 14:1, 7-11",
      "James 4:6",
      "CCC 2559",
      "CCC 2713"
]
  },
  'luke 14:1':   {
    gospelCitation: 'Luke 14:1, 7-11',
    topicTitle: 'The Exaltation of Christian Humility: The Lowest Place at the Wedding Feast',
    topicSubtitle: 'For everyone who exalts himself will be humbled, and he who humbles himself will be exalted: the law of Christ\'s Kingdom',
    pillar: '',
    part: 'Part Three: Life in Christ & Part Four: Christian Prayer',
    section: 'Section One: Prayer in the Christian Life',
    chapter: 'Humility as the Foundation of Authentic Christian Prayer',
    paragraphsRange: 'Catechism of the Catholic Church 2546, 2559, 2713, 2728',
    catechismArticles: [
      {
            "number": 2559,
            "title": "Humility is the Foundation of All Prayer",
            "text": "\"Prayer is the raising of one's mind and heart to God or the requesting of good things from God.\" But when we pray, do we speak from the height of our pride and will, or \"out of the depths\" of a humble and contrite heart? He who humbles himself will be exalted; humility is the foundation of prayer. Only when we humbly acknowledge that \"we do not know how to pray as we ought,\" are we in a disposition to receive freely the gift of prayer."
      },
      {
            "number": 2713,
            "title": "Contemplative Prayer as the Silence of Humble Love",
            "text": "Contemplative prayer is the prayer of the child of God, of the forgiven sinner who agrees to welcome the love by which he is loved and who wants to respond to it by loving even more. Contemplative prayer is the poor and humble surrender to the loving will of the Father in ever deeper union with his beloved Son."
      }
],
    magisterialInputs: [
      {
            "authority": "St. Bernard of Clairvaux",
            "documentTitle": "The Steps of Humility and Pride",
            "citation": "Ch. 1",
            "insight": "Humility is a virtue by which a man has a low opinion of himself because he knows himself well. The higher you are placed in honor, the humbler you should be in all things; for by the humble God is glorified."
      }
],
    inBrief: [
      "Everyone who exalts himself will be humbled, and he who humbles himself will be exalted (Luke 14:11).",
      "Voluntary choice of the lowest seat opens the floodgates of divine grace.",
      "Humility is the mother of all theological virtues, without which prayer collapses into vanity."
],
    meditationQuestion: 'Do I seek applause, recognition, and the highest seats, or do I delight in hidden service for the gaze of God alone?',
    practicalLiving: 'Perform one act of hidden charity today that no one else will notice, offering it to Jesus who took the form of a servant.',
    crossReferences: [
      "Luke 14:1, 7-11",
      "James 4:6",
      "CCC 2559",
      "CCC 2713"
]
  },
  'luke 14:7':   {
    gospelCitation: 'Luke 14:1, 7-11',
    topicTitle: 'The Exaltation of Christian Humility: The Lowest Place at the Wedding Feast',
    topicSubtitle: 'For everyone who exalts himself will be humbled, and he who humbles himself will be exalted: the law of Christ\'s Kingdom',
    pillar: '',
    part: 'Part Three: Life in Christ & Part Four: Christian Prayer',
    section: 'Section One: Prayer in the Christian Life',
    chapter: 'Humility as the Foundation of Authentic Christian Prayer',
    paragraphsRange: 'Catechism of the Catholic Church 2546, 2559, 2713, 2728',
    catechismArticles: [
      {
            "number": 2559,
            "title": "Humility is the Foundation of All Prayer",
            "text": "\"Prayer is the raising of one's mind and heart to God or the requesting of good things from God.\" But when we pray, do we speak from the height of our pride and will, or \"out of the depths\" of a humble and contrite heart? He who humbles himself will be exalted; humility is the foundation of prayer. Only when we humbly acknowledge that \"we do not know how to pray as we ought,\" are we in a disposition to receive freely the gift of prayer."
      },
      {
            "number": 2713,
            "title": "Contemplative Prayer as the Silence of Humble Love",
            "text": "Contemplative prayer is the prayer of the child of God, of the forgiven sinner who agrees to welcome the love by which he is loved and who wants to respond to it by loving even more. Contemplative prayer is the poor and humble surrender to the loving will of the Father in ever deeper union with his beloved Son."
      }
],
    magisterialInputs: [
      {
            "authority": "St. Bernard of Clairvaux",
            "documentTitle": "The Steps of Humility and Pride",
            "citation": "Ch. 1",
            "insight": "Humility is a virtue by which a man has a low opinion of himself because he knows himself well. The higher you are placed in honor, the humbler you should be in all things; for by the humble God is glorified."
      }
],
    inBrief: [
      "Everyone who exalts himself will be humbled, and he who humbles himself will be exalted (Luke 14:11).",
      "Voluntary choice of the lowest seat opens the floodgates of divine grace.",
      "Humility is the mother of all theological virtues, without which prayer collapses into vanity."
],
    meditationQuestion: 'Do I seek applause, recognition, and the highest seats, or do I delight in hidden service for the gaze of God alone?',
    practicalLiving: 'Perform one act of hidden charity today that no one else will notice, offering it to Jesus who took the form of a servant.',
    crossReferences: [
      "Luke 14:1, 7-11",
      "James 4:6",
      "CCC 2559",
      "CCC 2713"
]
  },
  'luke 10:38-42':   {
    gospelCitation: 'Luke 10:38-42',
    topicTitle: 'Mary Has Chosen the Better Part: Contemplation at the Feet of Jesus',
    topicSubtitle: 'Martha, Martha, you are anxious and troubled about many things; one thing is needful',
    pillar: '',
    part: 'Part Four: Christian Prayer',
    section: 'Section One: Prayer in the Christian Life',
    chapter: 'The Contemplative Life and the Primacy of Listening to the Word',
    paragraphsRange: 'Catechism of the Catholic Church 2602, 2709, 2712, 2724',
    catechismArticles: [
      {
            "number": 2602,
            "title": "Jesus Prays and Invites Us to Solitary Communion",
            "text": "Jesus often draws apart to pray in solitude, on a mountain, preferably at night. He includes all men in his prayer, for he has taken on humanity in his Incarnation, and offers them to the Father when he offers himself. He teaches his disciples to pray with pure hearts, active faith, and loving boldness."
      },
      {
            "number": 2709,
            "title": "What is Contemplative Prayer?",
            "text": "What is contemplative prayer? St. Teresa answers: \"Contemplative prayer in my opinion is nothing else than a close sharing between friends; it means taking time frequently to be alone with him who we know loves us.\" Contemplative prayer seeks him \"whom my soul loves.\" It is Jesus, and in him, the Father."
      },
      {
            "number": 2712,
            "title": "Contemplative Prayer as the Gaze of Faith Fixed on Jesus",
            "text": "Contemplative prayer is the simplest expression of the mystery of prayer. It is a gift, a grace; it can be accepted only in humility and poverty. Contemplative prayer is a covenant relationship established by God within our hearts. Contemplative prayer is a communion in which the Holy Trinity conforms man, the image of God, \"to his likeness.\""
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Benedict XVI",
            "documentTitle": "Angelus Address on Martha and Mary",
            "citation": "July 18, 2010",
            "insight": "Hospitality is a virtue, but Jesus reminds Martha that hospitality to God means first and foremost listening to His Word. Action without prayer becomes frantic and anxious; prayer without action remains barren."
      }
],
    inBrief: [
      "Mary has chosen the good portion, which shall not be taken away from her (Luke 10:42).",
      "Contemplation at the feet of the Lord is the soul and fountainhead of all fruitful apostolic action.",
      "Interior silence and listening to the Word of God must precede and permeate every active task."
],
    meditationQuestion: 'Am I running on spiritual empty because my active duties have displaced intimate prayer at Jesus\' feet?',
    practicalLiving: 'Carve out 15 minutes of uninterrupted silence today before an image of Christ, doing nothing except resting in His presence.',
    crossReferences: [
      "Luke 10:38-42",
      "Psalm 46:10",
      "CCC 2709",
      "CCC 2712"
]
  },
  'lk 10:38-42':   {
    gospelCitation: 'Luke 10:38-42',
    topicTitle: 'Mary Has Chosen the Better Part: Contemplation at the Feet of Jesus',
    topicSubtitle: 'Martha, Martha, you are anxious and troubled about many things; one thing is needful',
    pillar: '',
    part: 'Part Four: Christian Prayer',
    section: 'Section One: Prayer in the Christian Life',
    chapter: 'The Contemplative Life and the Primacy of Listening to the Word',
    paragraphsRange: 'Catechism of the Catholic Church 2602, 2709, 2712, 2724',
    catechismArticles: [
      {
            "number": 2602,
            "title": "Jesus Prays and Invites Us to Solitary Communion",
            "text": "Jesus often draws apart to pray in solitude, on a mountain, preferably at night. He includes all men in his prayer, for he has taken on humanity in his Incarnation, and offers them to the Father when he offers himself. He teaches his disciples to pray with pure hearts, active faith, and loving boldness."
      },
      {
            "number": 2709,
            "title": "What is Contemplative Prayer?",
            "text": "What is contemplative prayer? St. Teresa answers: \"Contemplative prayer in my opinion is nothing else than a close sharing between friends; it means taking time frequently to be alone with him who we know loves us.\" Contemplative prayer seeks him \"whom my soul loves.\" It is Jesus, and in him, the Father."
      },
      {
            "number": 2712,
            "title": "Contemplative Prayer as the Gaze of Faith Fixed on Jesus",
            "text": "Contemplative prayer is the simplest expression of the mystery of prayer. It is a gift, a grace; it can be accepted only in humility and poverty. Contemplative prayer is a covenant relationship established by God within our hearts. Contemplative prayer is a communion in which the Holy Trinity conforms man, the image of God, \"to his likeness.\""
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Benedict XVI",
            "documentTitle": "Angelus Address on Martha and Mary",
            "citation": "July 18, 2010",
            "insight": "Hospitality is a virtue, but Jesus reminds Martha that hospitality to God means first and foremost listening to His Word. Action without prayer becomes frantic and anxious; prayer without action remains barren."
      }
],
    inBrief: [
      "Mary has chosen the good portion, which shall not be taken away from her (Luke 10:42).",
      "Contemplation at the feet of the Lord is the soul and fountainhead of all fruitful apostolic action.",
      "Interior silence and listening to the Word of God must precede and permeate every active task."
],
    meditationQuestion: 'Am I running on spiritual empty because my active duties have displaced intimate prayer at Jesus\' feet?',
    practicalLiving: 'Carve out 15 minutes of uninterrupted silence today before an image of Christ, doing nothing except resting in His presence.',
    crossReferences: [
      "Luke 10:38-42",
      "Psalm 46:10",
      "CCC 2709",
      "CCC 2712"
]
  },
  'luke 10:38':   {
    gospelCitation: 'Luke 10:38-42',
    topicTitle: 'Mary Has Chosen the Better Part: Contemplation at the Feet of Jesus',
    topicSubtitle: 'Martha, Martha, you are anxious and troubled about many things; one thing is needful',
    pillar: '',
    part: 'Part Four: Christian Prayer',
    section: 'Section One: Prayer in the Christian Life',
    chapter: 'The Contemplative Life and the Primacy of Listening to the Word',
    paragraphsRange: 'Catechism of the Catholic Church 2602, 2709, 2712, 2724',
    catechismArticles: [
      {
            "number": 2602,
            "title": "Jesus Prays and Invites Us to Solitary Communion",
            "text": "Jesus often draws apart to pray in solitude, on a mountain, preferably at night. He includes all men in his prayer, for he has taken on humanity in his Incarnation, and offers them to the Father when he offers himself. He teaches his disciples to pray with pure hearts, active faith, and loving boldness."
      },
      {
            "number": 2709,
            "title": "What is Contemplative Prayer?",
            "text": "What is contemplative prayer? St. Teresa answers: \"Contemplative prayer in my opinion is nothing else than a close sharing between friends; it means taking time frequently to be alone with him who we know loves us.\" Contemplative prayer seeks him \"whom my soul loves.\" It is Jesus, and in him, the Father."
      },
      {
            "number": 2712,
            "title": "Contemplative Prayer as the Gaze of Faith Fixed on Jesus",
            "text": "Contemplative prayer is the simplest expression of the mystery of prayer. It is a gift, a grace; it can be accepted only in humility and poverty. Contemplative prayer is a covenant relationship established by God within our hearts. Contemplative prayer is a communion in which the Holy Trinity conforms man, the image of God, \"to his likeness.\""
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Benedict XVI",
            "documentTitle": "Angelus Address on Martha and Mary",
            "citation": "July 18, 2010",
            "insight": "Hospitality is a virtue, but Jesus reminds Martha that hospitality to God means first and foremost listening to His Word. Action without prayer becomes frantic and anxious; prayer without action remains barren."
      }
],
    inBrief: [
      "Mary has chosen the good portion, which shall not be taken away from her (Luke 10:42).",
      "Contemplation at the feet of the Lord is the soul and fountainhead of all fruitful apostolic action.",
      "Interior silence and listening to the Word of God must precede and permeate every active task."
],
    meditationQuestion: 'Am I running on spiritual empty because my active duties have displaced intimate prayer at Jesus\' feet?',
    practicalLiving: 'Carve out 15 minutes of uninterrupted silence today before an image of Christ, doing nothing except resting in His presence.',
    crossReferences: [
      "Luke 10:38-42",
      "Psalm 46:10",
      "CCC 2709",
      "CCC 2712"
]
  },
  'john 18:33b-37':   {
    gospelCitation: 'John 18:33b-37',
    topicTitle: 'The Universal Kingship of Jesus Christ: Truth, Sovereignty & The Eternal Kingdom',
    topicSubtitle: 'My kingdom is not of this world: Everyone who is of the truth hears my voice',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — Jesus Christ, King and Lord',
    chapter: 'The Messianic Lordship of Christ and the Social Reign of the King of Kings',
    paragraphsRange: 'Catechism of the Catholic Church 440, 541, 668, 2105',
    catechismArticles: [
      {
            "number": 440,
            "title": "Jesus Welcomed the Title of Messiah While Clarifying Its Meaning",
            "text": "Jesus accepted Peter's profession of faith which acknowledged him to be the Messiah, by announcing the imminent Passion of the Son of Man. He unveiled the authentic content of his messianic kingship both in the transcendent identity of the Son of Man \"who came down from heaven,\" and in his redemptive mission as the suffering Servant: \"The Son of Man came not to be served, but to serve, and to give his life as a ransom for many.\""
      },
      {
            "number": 541,
            "title": "The Kingdom of God is at Hand in the Person of Christ",
            "text": "\"Now after John was arrested, Jesus came into Galilee, preaching the gospel of God, and saying: 'The time is fulfilled, and the kingdom of God is at hand; repent, and believe in the gospel.'\" To fulfill the Father's will, Christ ushered in the kingdom of heaven on earth. The Church \"is the Seed and Beginning of this kingdom. Her keys are entrusted to Peter.\""
      },
      {
            "number": 668,
            "title": "Christ's Ascension as the Inauguration of His Universal Reign",
            "text": "\"Christ died and lived again, that he might be Lord both of the dead and of the living.\" Christ's Ascension into heaven signifies his participation, in his humanity, in God's power and authority. Jesus Christ is Lord: he possesses all power in heaven and on earth. He is \"head over all things to the Church.\" In Christ, the realm of the Spirit and the created cosmos are subjected to divine sovereignty."
      },
      {
            "number": 2105,
            "title": "The Duty of Offering Genuine Worship and The Social Reign of Christ",
            "text": "The duty of offering God genuine worship concerns man both individually and socially. This is \"the traditional Catholic teaching on the moral duty of individuals and societies toward the true religion and the one Church of Christ.\" By constantly evangelizing men, the Church works toward enabling them \"to infuse the Christian spirit into the mentality and mores, laws and structures of the communities in which they live.\""
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Pius XI",
            "documentTitle": "Encyclical Quas Primas (On the Kingship of Christ)",
            "citation": "QP 17",
            "insight": "When once men recognize, both in private and in public life, that Christ is King, society will at last receive the great blessings of real liberty, well-ordered discipline, peace and harmony."
      }
],
    inBrief: [
      "You say that I am a king. For this I was born, and for this I have come into the world: to bear witness to the truth (John 18:37).",
      "The Kingdom of Jesus Christ is a kingdom of truth and life, holiness and grace, justice, love and peace.",
      "Christ must reign supreme over our intellects, our wills, our hearts, and our families."
],
    meditationQuestion: 'Does Jesus Christ truly reign as the Sovereign King over my choices, desires, and public decisions?',
    practicalLiving: 'Consecrate your home and heart to the Sacred Heart of Jesus today, professing: "Christus Vincit, Christus Regnat, Christus Imperat!"',
    crossReferences: [
      "John 18:33b-37",
      "Revelation 19:16",
      "CCC 541",
      "CCC 2105"
]
  },
  'john 18:33':   {
    gospelCitation: 'John 18:33b-37',
    topicTitle: 'The Universal Kingship of Jesus Christ: Truth, Sovereignty & The Eternal Kingdom',
    topicSubtitle: 'My kingdom is not of this world: Everyone who is of the truth hears my voice',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — Jesus Christ, King and Lord',
    chapter: 'The Messianic Lordship of Christ and the Social Reign of the King of Kings',
    paragraphsRange: 'Catechism of the Catholic Church 440, 541, 668, 2105',
    catechismArticles: [
      {
            "number": 440,
            "title": "Jesus Welcomed the Title of Messiah While Clarifying Its Meaning",
            "text": "Jesus accepted Peter's profession of faith which acknowledged him to be the Messiah, by announcing the imminent Passion of the Son of Man. He unveiled the authentic content of his messianic kingship both in the transcendent identity of the Son of Man \"who came down from heaven,\" and in his redemptive mission as the suffering Servant: \"The Son of Man came not to be served, but to serve, and to give his life as a ransom for many.\""
      },
      {
            "number": 541,
            "title": "The Kingdom of God is at Hand in the Person of Christ",
            "text": "\"Now after John was arrested, Jesus came into Galilee, preaching the gospel of God, and saying: 'The time is fulfilled, and the kingdom of God is at hand; repent, and believe in the gospel.'\" To fulfill the Father's will, Christ ushered in the kingdom of heaven on earth. The Church \"is the Seed and Beginning of this kingdom. Her keys are entrusted to Peter.\""
      },
      {
            "number": 668,
            "title": "Christ's Ascension as the Inauguration of His Universal Reign",
            "text": "\"Christ died and lived again, that he might be Lord both of the dead and of the living.\" Christ's Ascension into heaven signifies his participation, in his humanity, in God's power and authority. Jesus Christ is Lord: he possesses all power in heaven and on earth. He is \"head over all things to the Church.\" In Christ, the realm of the Spirit and the created cosmos are subjected to divine sovereignty."
      },
      {
            "number": 2105,
            "title": "The Duty of Offering Genuine Worship and The Social Reign of Christ",
            "text": "The duty of offering God genuine worship concerns man both individually and socially. This is \"the traditional Catholic teaching on the moral duty of individuals and societies toward the true religion and the one Church of Christ.\" By constantly evangelizing men, the Church works toward enabling them \"to infuse the Christian spirit into the mentality and mores, laws and structures of the communities in which they live.\""
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Pius XI",
            "documentTitle": "Encyclical Quas Primas (On the Kingship of Christ)",
            "citation": "QP 17",
            "insight": "When once men recognize, both in private and in public life, that Christ is King, society will at last receive the great blessings of real liberty, well-ordered discipline, peace and harmony."
      }
],
    inBrief: [
      "You say that I am a king. For this I was born, and for this I have come into the world: to bear witness to the truth (John 18:37).",
      "The Kingdom of Jesus Christ is a kingdom of truth and life, holiness and grace, justice, love and peace.",
      "Christ must reign supreme over our intellects, our wills, our hearts, and our families."
],
    meditationQuestion: 'Does Jesus Christ truly reign as the Sovereign King over my choices, desires, and public decisions?',
    practicalLiving: 'Consecrate your home and heart to the Sacred Heart of Jesus today, professing: "Christus Vincit, Christus Regnat, Christus Imperat!"',
    crossReferences: [
      "John 18:33b-37",
      "Revelation 19:16",
      "CCC 541",
      "CCC 2105"
]
  },
  'jn 18:33':   {
    gospelCitation: 'John 18:33b-37',
    topicTitle: 'The Universal Kingship of Jesus Christ: Truth, Sovereignty & The Eternal Kingdom',
    topicSubtitle: 'My kingdom is not of this world: Everyone who is of the truth hears my voice',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — Jesus Christ, King and Lord',
    chapter: 'The Messianic Lordship of Christ and the Social Reign of the King of Kings',
    paragraphsRange: 'Catechism of the Catholic Church 440, 541, 668, 2105',
    catechismArticles: [
      {
            "number": 440,
            "title": "Jesus Welcomed the Title of Messiah While Clarifying Its Meaning",
            "text": "Jesus accepted Peter's profession of faith which acknowledged him to be the Messiah, by announcing the imminent Passion of the Son of Man. He unveiled the authentic content of his messianic kingship both in the transcendent identity of the Son of Man \"who came down from heaven,\" and in his redemptive mission as the suffering Servant: \"The Son of Man came not to be served, but to serve, and to give his life as a ransom for many.\""
      },
      {
            "number": 541,
            "title": "The Kingdom of God is at Hand in the Person of Christ",
            "text": "\"Now after John was arrested, Jesus came into Galilee, preaching the gospel of God, and saying: 'The time is fulfilled, and the kingdom of God is at hand; repent, and believe in the gospel.'\" To fulfill the Father's will, Christ ushered in the kingdom of heaven on earth. The Church \"is the Seed and Beginning of this kingdom. Her keys are entrusted to Peter.\""
      },
      {
            "number": 668,
            "title": "Christ's Ascension as the Inauguration of His Universal Reign",
            "text": "\"Christ died and lived again, that he might be Lord both of the dead and of the living.\" Christ's Ascension into heaven signifies his participation, in his humanity, in God's power and authority. Jesus Christ is Lord: he possesses all power in heaven and on earth. He is \"head over all things to the Church.\" In Christ, the realm of the Spirit and the created cosmos are subjected to divine sovereignty."
      },
      {
            "number": 2105,
            "title": "The Duty of Offering Genuine Worship and The Social Reign of Christ",
            "text": "The duty of offering God genuine worship concerns man both individually and socially. This is \"the traditional Catholic teaching on the moral duty of individuals and societies toward the true religion and the one Church of Christ.\" By constantly evangelizing men, the Church works toward enabling them \"to infuse the Christian spirit into the mentality and mores, laws and structures of the communities in which they live.\""
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Pius XI",
            "documentTitle": "Encyclical Quas Primas (On the Kingship of Christ)",
            "citation": "QP 17",
            "insight": "When once men recognize, both in private and in public life, that Christ is King, society will at last receive the great blessings of real liberty, well-ordered discipline, peace and harmony."
      }
],
    inBrief: [
      "You say that I am a king. For this I was born, and for this I have come into the world: to bear witness to the truth (John 18:37).",
      "The Kingdom of Jesus Christ is a kingdom of truth and life, holiness and grace, justice, love and peace.",
      "Christ must reign supreme over our intellects, our wills, our hearts, and our families."
],
    meditationQuestion: 'Does Jesus Christ truly reign as the Sovereign King over my choices, desires, and public decisions?',
    practicalLiving: 'Consecrate your home and heart to the Sacred Heart of Jesus today, professing: "Christus Vincit, Christus Regnat, Christus Imperat!"',
    crossReferences: [
      "John 18:33b-37",
      "Revelation 19:16",
      "CCC 541",
      "CCC 2105"
]
  },
  'john 18:37':   {
    gospelCitation: 'John 18:33b-37',
    topicTitle: 'The Universal Kingship of Jesus Christ: Truth, Sovereignty & The Eternal Kingdom',
    topicSubtitle: 'My kingdom is not of this world: Everyone who is of the truth hears my voice',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — Jesus Christ, King and Lord',
    chapter: 'The Messianic Lordship of Christ and the Social Reign of the King of Kings',
    paragraphsRange: 'Catechism of the Catholic Church 440, 541, 668, 2105',
    catechismArticles: [
      {
            "number": 440,
            "title": "Jesus Welcomed the Title of Messiah While Clarifying Its Meaning",
            "text": "Jesus accepted Peter's profession of faith which acknowledged him to be the Messiah, by announcing the imminent Passion of the Son of Man. He unveiled the authentic content of his messianic kingship both in the transcendent identity of the Son of Man \"who came down from heaven,\" and in his redemptive mission as the suffering Servant: \"The Son of Man came not to be served, but to serve, and to give his life as a ransom for many.\""
      },
      {
            "number": 541,
            "title": "The Kingdom of God is at Hand in the Person of Christ",
            "text": "\"Now after John was arrested, Jesus came into Galilee, preaching the gospel of God, and saying: 'The time is fulfilled, and the kingdom of God is at hand; repent, and believe in the gospel.'\" To fulfill the Father's will, Christ ushered in the kingdom of heaven on earth. The Church \"is the Seed and Beginning of this kingdom. Her keys are entrusted to Peter.\""
      },
      {
            "number": 668,
            "title": "Christ's Ascension as the Inauguration of His Universal Reign",
            "text": "\"Christ died and lived again, that he might be Lord both of the dead and of the living.\" Christ's Ascension into heaven signifies his participation, in his humanity, in God's power and authority. Jesus Christ is Lord: he possesses all power in heaven and on earth. He is \"head over all things to the Church.\" In Christ, the realm of the Spirit and the created cosmos are subjected to divine sovereignty."
      },
      {
            "number": 2105,
            "title": "The Duty of Offering Genuine Worship and The Social Reign of Christ",
            "text": "The duty of offering God genuine worship concerns man both individually and socially. This is \"the traditional Catholic teaching on the moral duty of individuals and societies toward the true religion and the one Church of Christ.\" By constantly evangelizing men, the Church works toward enabling them \"to infuse the Christian spirit into the mentality and mores, laws and structures of the communities in which they live.\""
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Pius XI",
            "documentTitle": "Encyclical Quas Primas (On the Kingship of Christ)",
            "citation": "QP 17",
            "insight": "When once men recognize, both in private and in public life, that Christ is King, society will at last receive the great blessings of real liberty, well-ordered discipline, peace and harmony."
      }
],
    inBrief: [
      "You say that I am a king. For this I was born, and for this I have come into the world: to bear witness to the truth (John 18:37).",
      "The Kingdom of Jesus Christ is a kingdom of truth and life, holiness and grace, justice, love and peace.",
      "Christ must reign supreme over our intellects, our wills, our hearts, and our families."
],
    meditationQuestion: 'Does Jesus Christ truly reign as the Sovereign King over my choices, desires, and public decisions?',
    practicalLiving: 'Consecrate your home and heart to the Sacred Heart of Jesus today, professing: "Christus Vincit, Christus Regnat, Christus Imperat!"',
    crossReferences: [
      "John 18:33b-37",
      "Revelation 19:16",
      "CCC 541",
      "CCC 2105"
]
  },
  'luke 10:21-24':   {
    gospelCitation: 'Luke 10:21-24',
    topicTitle: 'The Exultation of Jesus in the Holy Spirit: The Mysteries Revealed to Little Ones',
    topicSubtitle: 'Blessed are the eyes which see the things that you see: Advent Expectation and Joyful Hope',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Four: Christian Prayer',
    section: 'Section Two: The Seven Petitions of the Lord\'s Prayer',
    chapter: 'The Prayer of Jesus Rejoicing in the Father\'s Holy Will',
    paragraphsRange: 'Catechism of the Catholic Church 522, 524, 1831, 2603',
    catechismArticles: [
      {
            "number": 522,
            "title": "The Coming of God's Son as the Fulfillment of All Longing",
            "text": "The coming of God's Son to earth is an event of such immensity that God willed to prepare for it over centuries. He makes everything converge on Christ: all the rituals and sacrifices, figures and symbols of the \"First Covenant.\" He announces him through the mouths of the prophets who succeeded one another in Israel."
      },
      {
            "number": 524,
            "title": "The Liturgical Season of Advent: Renewal of Ancient Expectation",
            "text": "When the Church celebrates the liturgy of Advent each year, she makes present this ancient expectancy of the Messiah, for by sharing in the long preparation for the Savior's first coming, the faithful renew their ardent desire for his second coming. By celebrating the precursor's birth and martyrdom, the Church unites herself to his desire: \"He must increase, but I must decrease.\""
      },
      {
            "number": 2603,
            "title": "The Evangelists Record Jesus' Prayer of Exultant Praise",
            "text": "The evangelists have preserved two more explicit prayers offered by Christ during his public life. Each begins with thanksgiving. In the first, Jesus confesses the Father, acknowledges and blesses him because he has hidden the mysteries of the Kingdom from those who think themselves learned and has revealed them to the \"little ones\" (the poor of the Beatitudes). His exclamation, \"Yes, Father!\" expresses the depth of his heart."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. Paul VI",
            "documentTitle": "Apostolic Exhortation Gaudete in Domino (On Christian Joy)",
            "citation": "GD 3",
            "insight": "No one is excluded from the joy brought by the Lord. The great joy announced by the angel on Christmas night is truly for all the people, especially the humble and poor who await redemption."
      }
],
    inBrief: [
      "I thank thee, Father, Lord of heaven and earth, that thou hast hidden these things from the wise and understanding and revealed them to babes (Luke 10:21).",
      "Advent is the season of holy desire, stirring our souls to watchfulness for Christ's arrival.",
      "Supernatural joy flows from childlike docility to the movements of the Holy Spirit."
],
    meditationQuestion: 'Do I approach the Word of God with the open wonder of a child or the cynical fatigue of the worldly-wise?',
    practicalLiving: 'Light your Advent candle or pray the Alma Redemptoris Mater today with renewed longing for Christ\'s presence.',
    crossReferences: [
      "Luke 10:21-24",
      "Isaiah 11:1-10",
      "CCC 524",
      "CCC 2603"
]
  },
  'lk 10:21-24':   {
    gospelCitation: 'Luke 10:21-24',
    topicTitle: 'The Exultation of Jesus in the Holy Spirit: The Mysteries Revealed to Little Ones',
    topicSubtitle: 'Blessed are the eyes which see the things that you see: Advent Expectation and Joyful Hope',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Four: Christian Prayer',
    section: 'Section Two: The Seven Petitions of the Lord\'s Prayer',
    chapter: 'The Prayer of Jesus Rejoicing in the Father\'s Holy Will',
    paragraphsRange: 'Catechism of the Catholic Church 522, 524, 1831, 2603',
    catechismArticles: [
      {
            "number": 522,
            "title": "The Coming of God's Son as the Fulfillment of All Longing",
            "text": "The coming of God's Son to earth is an event of such immensity that God willed to prepare for it over centuries. He makes everything converge on Christ: all the rituals and sacrifices, figures and symbols of the \"First Covenant.\" He announces him through the mouths of the prophets who succeeded one another in Israel."
      },
      {
            "number": 524,
            "title": "The Liturgical Season of Advent: Renewal of Ancient Expectation",
            "text": "When the Church celebrates the liturgy of Advent each year, she makes present this ancient expectancy of the Messiah, for by sharing in the long preparation for the Savior's first coming, the faithful renew their ardent desire for his second coming. By celebrating the precursor's birth and martyrdom, the Church unites herself to his desire: \"He must increase, but I must decrease.\""
      },
      {
            "number": 2603,
            "title": "The Evangelists Record Jesus' Prayer of Exultant Praise",
            "text": "The evangelists have preserved two more explicit prayers offered by Christ during his public life. Each begins with thanksgiving. In the first, Jesus confesses the Father, acknowledges and blesses him because he has hidden the mysteries of the Kingdom from those who think themselves learned and has revealed them to the \"little ones\" (the poor of the Beatitudes). His exclamation, \"Yes, Father!\" expresses the depth of his heart."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. Paul VI",
            "documentTitle": "Apostolic Exhortation Gaudete in Domino (On Christian Joy)",
            "citation": "GD 3",
            "insight": "No one is excluded from the joy brought by the Lord. The great joy announced by the angel on Christmas night is truly for all the people, especially the humble and poor who await redemption."
      }
],
    inBrief: [
      "I thank thee, Father, Lord of heaven and earth, that thou hast hidden these things from the wise and understanding and revealed them to babes (Luke 10:21).",
      "Advent is the season of holy desire, stirring our souls to watchfulness for Christ's arrival.",
      "Supernatural joy flows from childlike docility to the movements of the Holy Spirit."
],
    meditationQuestion: 'Do I approach the Word of God with the open wonder of a child or the cynical fatigue of the worldly-wise?',
    practicalLiving: 'Light your Advent candle or pray the Alma Redemptoris Mater today with renewed longing for Christ\'s presence.',
    crossReferences: [
      "Luke 10:21-24",
      "Isaiah 11:1-10",
      "CCC 524",
      "CCC 2603"
]
  },
  'luke 10:21':   {
    gospelCitation: 'Luke 10:21-24',
    topicTitle: 'The Exultation of Jesus in the Holy Spirit: The Mysteries Revealed to Little Ones',
    topicSubtitle: 'Blessed are the eyes which see the things that you see: Advent Expectation and Joyful Hope',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Four: Christian Prayer',
    section: 'Section Two: The Seven Petitions of the Lord\'s Prayer',
    chapter: 'The Prayer of Jesus Rejoicing in the Father\'s Holy Will',
    paragraphsRange: 'Catechism of the Catholic Church 522, 524, 1831, 2603',
    catechismArticles: [
      {
            "number": 522,
            "title": "The Coming of God's Son as the Fulfillment of All Longing",
            "text": "The coming of God's Son to earth is an event of such immensity that God willed to prepare for it over centuries. He makes everything converge on Christ: all the rituals and sacrifices, figures and symbols of the \"First Covenant.\" He announces him through the mouths of the prophets who succeeded one another in Israel."
      },
      {
            "number": 524,
            "title": "The Liturgical Season of Advent: Renewal of Ancient Expectation",
            "text": "When the Church celebrates the liturgy of Advent each year, she makes present this ancient expectancy of the Messiah, for by sharing in the long preparation for the Savior's first coming, the faithful renew their ardent desire for his second coming. By celebrating the precursor's birth and martyrdom, the Church unites herself to his desire: \"He must increase, but I must decrease.\""
      },
      {
            "number": 2603,
            "title": "The Evangelists Record Jesus' Prayer of Exultant Praise",
            "text": "The evangelists have preserved two more explicit prayers offered by Christ during his public life. Each begins with thanksgiving. In the first, Jesus confesses the Father, acknowledges and blesses him because he has hidden the mysteries of the Kingdom from those who think themselves learned and has revealed them to the \"little ones\" (the poor of the Beatitudes). His exclamation, \"Yes, Father!\" expresses the depth of his heart."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. Paul VI",
            "documentTitle": "Apostolic Exhortation Gaudete in Domino (On Christian Joy)",
            "citation": "GD 3",
            "insight": "No one is excluded from the joy brought by the Lord. The great joy announced by the angel on Christmas night is truly for all the people, especially the humble and poor who await redemption."
      }
],
    inBrief: [
      "I thank thee, Father, Lord of heaven and earth, that thou hast hidden these things from the wise and understanding and revealed them to babes (Luke 10:21).",
      "Advent is the season of holy desire, stirring our souls to watchfulness for Christ's arrival.",
      "Supernatural joy flows from childlike docility to the movements of the Holy Spirit."
],
    meditationQuestion: 'Do I approach the Word of God with the open wonder of a child or the cynical fatigue of the worldly-wise?',
    practicalLiving: 'Light your Advent candle or pray the Alma Redemptoris Mater today with renewed longing for Christ\'s presence.',
    crossReferences: [
      "Luke 10:21-24",
      "Isaiah 11:1-10",
      "CCC 524",
      "CCC 2603"
]
  },
  'matthew 4:18-22':   {
    gospelCitation: 'Matthew 4:18-22',
    topicTitle: 'The Call of the First Apostles: Leaving the Nets and Becoming Fishers of Men',
    topicSubtitle: 'Follow me, and I will make you fishers of men: The Apostolic Foundation of the Church',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Church',
    chapter: 'The Church is Apostolic: Founded on Peter, Andrew, and the Twelve',
    paragraphsRange: 'Catechism of the Catholic Church 857, 858, 863, 865',
    catechismArticles: [
      {
            "number": 857,
            "title": "The Church is Apostolic in Her Origin, Deposit, and Pastoral Guidance",
            "text": "The Church is apostolic because she is founded on the apostles, in three ways: she was and remains built on \"the foundation of the Apostles,\" the witnesses chosen and sent on mission by Christ himself; with the help of the Spirit dwelling in her, the Church keeps and hands on the teaching, the \"good deposit,\" the salutary words she has heard from the apostles; she continues to be taught, sanctified, and guided by the apostles until Christ's return, through their successors."
      },
      {
            "number": 858,
            "title": "Jesus is the Father's Emissary Who Calls Apostles to Share His Mission",
            "text": "Jesus is the Father's Emissary. From the beginning of his ministry, he \"called to him those whom he desired; and they came to him. And he appointed twelve, to be with him, and to be sent out to preach.\" From then on, they would also be his \"emissaries\" (that is what the Greek apostoloi means). In them, Christ continues his own mission: \"As the Father has sent me, even so I send you.\""
      },
      {
            "number": 863,
            "title": "The Whole Church is Apostolic in Her Universal Missionary Vocation",
            "text": "The whole Church is apostolic, in that she remains, through the successors of St. Peter and the other apostles, in communion of faith and life with her origin: and in that she is \"sent out,\" into the whole world. All members of the Church share in this mission, though in various ways."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Benedict XVI",
            "documentTitle": "General Audience on St. Andrew the Apostle",
            "citation": "June 14, 2006",
            "insight": "Andrew was the first of the Apostles to be called to follow Jesus. His first characteristic is enthusiasm: having found the Messiah, he immediately brings his brother Simon Peter to Jesus. True apostolic faith always leads to evangelizing others."
      }
],
    inBrief: [
      "At once they left their nets and followed him (Matthew 4:20).",
      "The call of Christ demands immediate, generous correspondence without delay or reservation.",
      "Through apostolic succession, the living voice and sacramental authority of the Twelve continues in the Catholic Church today."
],
    meditationQuestion: 'What "nets" of worldly hesitation or comfort must I leave behind to follow Christ\'s call to evangelize today?',
    practicalLiving: 'Share your faith or invite someone to Holy Mass this week, following the example of St. Andrew who brought Peter to Jesus.',
    crossReferences: [
      "Matthew 4:18-22",
      "John 1:40-42",
      "CCC 857",
      "CCC 863"
]
  },
  'mt 4:18-22':   {
    gospelCitation: 'Matthew 4:18-22',
    topicTitle: 'The Call of the First Apostles: Leaving the Nets and Becoming Fishers of Men',
    topicSubtitle: 'Follow me, and I will make you fishers of men: The Apostolic Foundation of the Church',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Church',
    chapter: 'The Church is Apostolic: Founded on Peter, Andrew, and the Twelve',
    paragraphsRange: 'Catechism of the Catholic Church 857, 858, 863, 865',
    catechismArticles: [
      {
            "number": 857,
            "title": "The Church is Apostolic in Her Origin, Deposit, and Pastoral Guidance",
            "text": "The Church is apostolic because she is founded on the apostles, in three ways: she was and remains built on \"the foundation of the Apostles,\" the witnesses chosen and sent on mission by Christ himself; with the help of the Spirit dwelling in her, the Church keeps and hands on the teaching, the \"good deposit,\" the salutary words she has heard from the apostles; she continues to be taught, sanctified, and guided by the apostles until Christ's return, through their successors."
      },
      {
            "number": 858,
            "title": "Jesus is the Father's Emissary Who Calls Apostles to Share His Mission",
            "text": "Jesus is the Father's Emissary. From the beginning of his ministry, he \"called to him those whom he desired; and they came to him. And he appointed twelve, to be with him, and to be sent out to preach.\" From then on, they would also be his \"emissaries\" (that is what the Greek apostoloi means). In them, Christ continues his own mission: \"As the Father has sent me, even so I send you.\""
      },
      {
            "number": 863,
            "title": "The Whole Church is Apostolic in Her Universal Missionary Vocation",
            "text": "The whole Church is apostolic, in that she remains, through the successors of St. Peter and the other apostles, in communion of faith and life with her origin: and in that she is \"sent out,\" into the whole world. All members of the Church share in this mission, though in various ways."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Benedict XVI",
            "documentTitle": "General Audience on St. Andrew the Apostle",
            "citation": "June 14, 2006",
            "insight": "Andrew was the first of the Apostles to be called to follow Jesus. His first characteristic is enthusiasm: having found the Messiah, he immediately brings his brother Simon Peter to Jesus. True apostolic faith always leads to evangelizing others."
      }
],
    inBrief: [
      "At once they left their nets and followed him (Matthew 4:20).",
      "The call of Christ demands immediate, generous correspondence without delay or reservation.",
      "Through apostolic succession, the living voice and sacramental authority of the Twelve continues in the Catholic Church today."
],
    meditationQuestion: 'What "nets" of worldly hesitation or comfort must I leave behind to follow Christ\'s call to evangelize today?',
    practicalLiving: 'Share your faith or invite someone to Holy Mass this week, following the example of St. Andrew who brought Peter to Jesus.',
    crossReferences: [
      "Matthew 4:18-22",
      "John 1:40-42",
      "CCC 857",
      "CCC 863"
]
  },
  'matthew 4:18':   {
    gospelCitation: 'Matthew 4:18-22',
    topicTitle: 'The Call of the First Apostles: Leaving the Nets and Becoming Fishers of Men',
    topicSubtitle: 'Follow me, and I will make you fishers of men: The Apostolic Foundation of the Church',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Church',
    chapter: 'The Church is Apostolic: Founded on Peter, Andrew, and the Twelve',
    paragraphsRange: 'Catechism of the Catholic Church 857, 858, 863, 865',
    catechismArticles: [
      {
            "number": 857,
            "title": "The Church is Apostolic in Her Origin, Deposit, and Pastoral Guidance",
            "text": "The Church is apostolic because she is founded on the apostles, in three ways: she was and remains built on \"the foundation of the Apostles,\" the witnesses chosen and sent on mission by Christ himself; with the help of the Spirit dwelling in her, the Church keeps and hands on the teaching, the \"good deposit,\" the salutary words she has heard from the apostles; she continues to be taught, sanctified, and guided by the apostles until Christ's return, through their successors."
      },
      {
            "number": 858,
            "title": "Jesus is the Father's Emissary Who Calls Apostles to Share His Mission",
            "text": "Jesus is the Father's Emissary. From the beginning of his ministry, he \"called to him those whom he desired; and they came to him. And he appointed twelve, to be with him, and to be sent out to preach.\" From then on, they would also be his \"emissaries\" (that is what the Greek apostoloi means). In them, Christ continues his own mission: \"As the Father has sent me, even so I send you.\""
      },
      {
            "number": 863,
            "title": "The Whole Church is Apostolic in Her Universal Missionary Vocation",
            "text": "The whole Church is apostolic, in that she remains, through the successors of St. Peter and the other apostles, in communion of faith and life with her origin: and in that she is \"sent out,\" into the whole world. All members of the Church share in this mission, though in various ways."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Benedict XVI",
            "documentTitle": "General Audience on St. Andrew the Apostle",
            "citation": "June 14, 2006",
            "insight": "Andrew was the first of the Apostles to be called to follow Jesus. His first characteristic is enthusiasm: having found the Messiah, he immediately brings his brother Simon Peter to Jesus. True apostolic faith always leads to evangelizing others."
      }
],
    inBrief: [
      "At once they left their nets and followed him (Matthew 4:20).",
      "The call of Christ demands immediate, generous correspondence without delay or reservation.",
      "Through apostolic succession, the living voice and sacramental authority of the Twelve continues in the Catholic Church today."
],
    meditationQuestion: 'What "nets" of worldly hesitation or comfort must I leave behind to follow Christ\'s call to evangelize today?',
    practicalLiving: 'Share your faith or invite someone to Holy Mass this week, following the example of St. Andrew who brought Peter to Jesus.',
    crossReferences: [
      "Matthew 4:18-22",
      "John 1:40-42",
      "CCC 857",
      "CCC 863"
]
  },
  'matthew 11:2-11':   {
    gospelCitation: 'Matthew 11:2-11',
    topicTitle: 'John the Baptist in Prison: The Messianic Signs and The Greater in the Kingdom',
    topicSubtitle: 'Go and tell John what you hear and see: the blind receive their sight, the lame walk, and the poor hear the Good News',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Messiah',
    chapter: 'The Precursor and The Manifestation of the Kingdom of God',
    paragraphsRange: 'Catechism of the Catholic Church 523, 547, 548, 719',
    catechismArticles: [
      {
            "number": 523,
            "title": "John the Baptist as the Precursor, Prophet, and Baptist",
            "text": "St. John the Baptist is the Lord's immediate precursor or forerunner, sent to prepare his way. \"Prophet of the Most High,\" John surpasses all the prophets, of whom he is the last. He inaugurates the Gospel, already from his mother's womb welcomes the coming of Christ, and rejoices in being \"the friend of the bridegroom,\" whom he points out as \"the Lamb of God, who takes away the sin of the world.\""
      },
      {
            "number": 547,
            "title": "Miracles and Signs Accompany the Preaching of the Kingdom",
            "text": "Jesus accompanies his words with many \"mighty works and wonders and signs\", which manifest that the kingdom is present in him and attest that he was the promised Messiah. The signs worked by Jesus attest that the Father has sent him. They invite belief in him."
      },
      {
            "number": 719,
            "title": "John the Baptist as the Voice of the Consolation of Israel",
            "text": "John the Baptist is \"more than a prophet.\" In him, the Holy Spirit concludes his speaking through the prophets. John completes the cycle of prophets begun by Elijah. He proclaims the imminence of the consolation of Israel; he is the \"voice\" of the Consoler who is coming."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. Gregory the Great",
            "documentTitle": "Homilies on the Gospels",
            "citation": "Homily 6",
            "insight": "John did not ask whether Jesus was the Messiah because he doubted, but so that his disciples might hear directly from the Lord and believe in Him as the Redeemer of the world."
      }
],
    inBrief: [
      "Blessed is he who takes no offense at me (Matthew 11:6).",
      "The miracles of Jesus confirm that the Messianic prophecies of Isaiah are fulfilled in His sacred humanity.",
      "Humility and fortitude make St. John the Baptist the greatest born of women, preparing the way of the Lord."
],
    meditationQuestion: 'When God works differently from my expectations or permits trials, do I stumble in faith or trust His sovereign wisdom?',
    practicalLiving: 'Pray for imprisoned, persecuted, or suffering Christians worldwide today, offering a decade of the Rosary for their perseverance.',
    crossReferences: [
      "Matthew 11:2-11",
      "Isaiah 35:5-6",
      "CCC 523",
      "CCC 548"
]
  },
  'mt 11:2-11':   {
    gospelCitation: 'Matthew 11:2-11',
    topicTitle: 'John the Baptist in Prison: The Messianic Signs and The Greater in the Kingdom',
    topicSubtitle: 'Go and tell John what you hear and see: the blind receive their sight, the lame walk, and the poor hear the Good News',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Messiah',
    chapter: 'The Precursor and The Manifestation of the Kingdom of God',
    paragraphsRange: 'Catechism of the Catholic Church 523, 547, 548, 719',
    catechismArticles: [
      {
            "number": 523,
            "title": "John the Baptist as the Precursor, Prophet, and Baptist",
            "text": "St. John the Baptist is the Lord's immediate precursor or forerunner, sent to prepare his way. \"Prophet of the Most High,\" John surpasses all the prophets, of whom he is the last. He inaugurates the Gospel, already from his mother's womb welcomes the coming of Christ, and rejoices in being \"the friend of the bridegroom,\" whom he points out as \"the Lamb of God, who takes away the sin of the world.\""
      },
      {
            "number": 547,
            "title": "Miracles and Signs Accompany the Preaching of the Kingdom",
            "text": "Jesus accompanies his words with many \"mighty works and wonders and signs\", which manifest that the kingdom is present in him and attest that he was the promised Messiah. The signs worked by Jesus attest that the Father has sent him. They invite belief in him."
      },
      {
            "number": 719,
            "title": "John the Baptist as the Voice of the Consolation of Israel",
            "text": "John the Baptist is \"more than a prophet.\" In him, the Holy Spirit concludes his speaking through the prophets. John completes the cycle of prophets begun by Elijah. He proclaims the imminence of the consolation of Israel; he is the \"voice\" of the Consoler who is coming."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. Gregory the Great",
            "documentTitle": "Homilies on the Gospels",
            "citation": "Homily 6",
            "insight": "John did not ask whether Jesus was the Messiah because he doubted, but so that his disciples might hear directly from the Lord and believe in Him as the Redeemer of the world."
      }
],
    inBrief: [
      "Blessed is he who takes no offense at me (Matthew 11:6).",
      "The miracles of Jesus confirm that the Messianic prophecies of Isaiah are fulfilled in His sacred humanity.",
      "Humility and fortitude make St. John the Baptist the greatest born of women, preparing the way of the Lord."
],
    meditationQuestion: 'When God works differently from my expectations or permits trials, do I stumble in faith or trust His sovereign wisdom?',
    practicalLiving: 'Pray for imprisoned, persecuted, or suffering Christians worldwide today, offering a decade of the Rosary for their perseverance.',
    crossReferences: [
      "Matthew 11:2-11",
      "Isaiah 35:5-6",
      "CCC 523",
      "CCC 548"
]
  },
  'matthew 11:2':   {
    gospelCitation: 'Matthew 11:2-11',
    topicTitle: 'John the Baptist in Prison: The Messianic Signs and The Greater in the Kingdom',
    topicSubtitle: 'Go and tell John what you hear and see: the blind receive their sight, the lame walk, and the poor hear the Good News',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Messiah',
    chapter: 'The Precursor and The Manifestation of the Kingdom of God',
    paragraphsRange: 'Catechism of the Catholic Church 523, 547, 548, 719',
    catechismArticles: [
      {
            "number": 523,
            "title": "John the Baptist as the Precursor, Prophet, and Baptist",
            "text": "St. John the Baptist is the Lord's immediate precursor or forerunner, sent to prepare his way. \"Prophet of the Most High,\" John surpasses all the prophets, of whom he is the last. He inaugurates the Gospel, already from his mother's womb welcomes the coming of Christ, and rejoices in being \"the friend of the bridegroom,\" whom he points out as \"the Lamb of God, who takes away the sin of the world.\""
      },
      {
            "number": 547,
            "title": "Miracles and Signs Accompany the Preaching of the Kingdom",
            "text": "Jesus accompanies his words with many \"mighty works and wonders and signs\", which manifest that the kingdom is present in him and attest that he was the promised Messiah. The signs worked by Jesus attest that the Father has sent him. They invite belief in him."
      },
      {
            "number": 719,
            "title": "John the Baptist as the Voice of the Consolation of Israel",
            "text": "John the Baptist is \"more than a prophet.\" In him, the Holy Spirit concludes his speaking through the prophets. John completes the cycle of prophets begun by Elijah. He proclaims the imminence of the consolation of Israel; he is the \"voice\" of the Consoler who is coming."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. Gregory the Great",
            "documentTitle": "Homilies on the Gospels",
            "citation": "Homily 6",
            "insight": "John did not ask whether Jesus was the Messiah because he doubted, but so that his disciples might hear directly from the Lord and believe in Him as the Redeemer of the world."
      }
],
    inBrief: [
      "Blessed is he who takes no offense at me (Matthew 11:6).",
      "The miracles of Jesus confirm that the Messianic prophecies of Isaiah are fulfilled in His sacred humanity.",
      "Humility and fortitude make St. John the Baptist the greatest born of women, preparing the way of the Lord."
],
    meditationQuestion: 'When God works differently from my expectations or permits trials, do I stumble in faith or trust His sovereign wisdom?',
    practicalLiving: 'Pray for imprisoned, persecuted, or suffering Christians worldwide today, offering a decade of the Rosary for their perseverance.',
    crossReferences: [
      "Matthew 11:2-11",
      "Isaiah 35:5-6",
      "CCC 523",
      "CCC 548"
]
  },
  'matthew 8:5-11':   {
    gospelCitation: 'Matthew 8:5-11',
    topicTitle: 'The Faith of the Centurion: "Lord, I Am Not Worthy" & The Universal Banquet of Grace',
    topicSubtitle: 'Only say the word, and my servant shall be healed: The Liturgical Cry of Eucharistic Faith',
    pillar: '',
    part: 'Part Two: The Celebration of the Christian Mystery',
    section: 'Section Two: The Seven Sacraments',
    chapter: 'The Holy Eucharist — Proper Dispositions for Holy Communion',
    paragraphsRange: 'Catechism of the Catholic Church 1386, 2616, 2734',
    catechismArticles: [
      {
            "number": 1386,
            "title": "The Centurion's Humble Profession in the Liturgy of Holy Communion",
            "text": "Before so great a sacrament, the faithful can only echo humbly and with ardent faith the words of the Centurion: \"Domine, non sum dignus ut intres sub tectum meum, sed tantum dic verbo, et sanabitur anima mea\" (\"Lord, I am not worthy that you should enter under my roof, but only say the word and my soul shall be healed\"). In the liturgy of St. John Chrysostom the faithful pray in the same spirit: \"O Son of God, bring me into communion today with your mystical feast.\""
      },
      {
            "number": 2616,
            "title": "Jesus Marvels at Humble and Bold Faith in Prayer",
            "text": "Jesus hears the prayer of faith, expressed in words or in silence. He is touched by the faith of the centurion, who recognizes Jesus' sovereign authority over illness and distance: \"Lord, I am not worthy... only say the word.\""
      },
      {
            "number": 2734,
            "title": "Filial Trust and Humility in Christian Petition",
            "text": "Filial trust is tested—it proves itself—in tribulation. The principal difficulty concerns the prayer of petition. But when our prayer is grounded in humble trust like that of the centurion, God gives us what is best for our salvation."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Benedict XVI",
            "documentTitle": "General Audience on Christian Prayer",
            "citation": "May 16, 2012",
            "insight": "The Roman Centurion was a pagan, yet his faith was praised by Jesus above that of all Israel. His humility made him worthy of welcoming divine mercy, teaching every communicant how to approach the altar."
      }
],
    inBrief: [
      "Lord, I am not worthy that you should enter under my roof; only say the word and my servant shall be healed (Matthew 8:8).",
      "The Church places the centurion's words on our lips at every Holy Mass right before receiving the Blessed Sacrament.",
      "Sincere humility and confident trust in Christ's divine power win immediate answers from the Heart of Jesus."
],
    meditationQuestion: 'Do I recite "Lord, I am not worthy" at Mass mechanically, or with the trembling awe and vibrant faith of the Centurion?',
    practicalLiving: 'Recite the Centurion\'s prayer three times with deep reverence today as a preparation for your next Holy Communion.',
    crossReferences: [
      "Matthew 8:5-11",
      "Luke 7:1-10",
      "CCC 1386",
      "CCC 2616"
]
  },
  'mt 8:5-11':   {
    gospelCitation: 'Matthew 8:5-11',
    topicTitle: 'The Faith of the Centurion: "Lord, I Am Not Worthy" & The Universal Banquet of Grace',
    topicSubtitle: 'Only say the word, and my servant shall be healed: The Liturgical Cry of Eucharistic Faith',
    pillar: '',
    part: 'Part Two: The Celebration of the Christian Mystery',
    section: 'Section Two: The Seven Sacraments',
    chapter: 'The Holy Eucharist — Proper Dispositions for Holy Communion',
    paragraphsRange: 'Catechism of the Catholic Church 1386, 2616, 2734',
    catechismArticles: [
      {
            "number": 1386,
            "title": "The Centurion's Humble Profession in the Liturgy of Holy Communion",
            "text": "Before so great a sacrament, the faithful can only echo humbly and with ardent faith the words of the Centurion: \"Domine, non sum dignus ut intres sub tectum meum, sed tantum dic verbo, et sanabitur anima mea\" (\"Lord, I am not worthy that you should enter under my roof, but only say the word and my soul shall be healed\"). In the liturgy of St. John Chrysostom the faithful pray in the same spirit: \"O Son of God, bring me into communion today with your mystical feast.\""
      },
      {
            "number": 2616,
            "title": "Jesus Marvels at Humble and Bold Faith in Prayer",
            "text": "Jesus hears the prayer of faith, expressed in words or in silence. He is touched by the faith of the centurion, who recognizes Jesus' sovereign authority over illness and distance: \"Lord, I am not worthy... only say the word.\""
      },
      {
            "number": 2734,
            "title": "Filial Trust and Humility in Christian Petition",
            "text": "Filial trust is tested—it proves itself—in tribulation. The principal difficulty concerns the prayer of petition. But when our prayer is grounded in humble trust like that of the centurion, God gives us what is best for our salvation."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Benedict XVI",
            "documentTitle": "General Audience on Christian Prayer",
            "citation": "May 16, 2012",
            "insight": "The Roman Centurion was a pagan, yet his faith was praised by Jesus above that of all Israel. His humility made him worthy of welcoming divine mercy, teaching every communicant how to approach the altar."
      }
],
    inBrief: [
      "Lord, I am not worthy that you should enter under my roof; only say the word and my servant shall be healed (Matthew 8:8).",
      "The Church places the centurion's words on our lips at every Holy Mass right before receiving the Blessed Sacrament.",
      "Sincere humility and confident trust in Christ's divine power win immediate answers from the Heart of Jesus."
],
    meditationQuestion: 'Do I recite "Lord, I am not worthy" at Mass mechanically, or with the trembling awe and vibrant faith of the Centurion?',
    practicalLiving: 'Recite the Centurion\'s prayer three times with deep reverence today as a preparation for your next Holy Communion.',
    crossReferences: [
      "Matthew 8:5-11",
      "Luke 7:1-10",
      "CCC 1386",
      "CCC 2616"
]
  },
  'matthew 8:5':   {
    gospelCitation: 'Matthew 8:5-11',
    topicTitle: 'The Faith of the Centurion: "Lord, I Am Not Worthy" & The Universal Banquet of Grace',
    topicSubtitle: 'Only say the word, and my servant shall be healed: The Liturgical Cry of Eucharistic Faith',
    pillar: '',
    part: 'Part Two: The Celebration of the Christian Mystery',
    section: 'Section Two: The Seven Sacraments',
    chapter: 'The Holy Eucharist — Proper Dispositions for Holy Communion',
    paragraphsRange: 'Catechism of the Catholic Church 1386, 2616, 2734',
    catechismArticles: [
      {
            "number": 1386,
            "title": "The Centurion's Humble Profession in the Liturgy of Holy Communion",
            "text": "Before so great a sacrament, the faithful can only echo humbly and with ardent faith the words of the Centurion: \"Domine, non sum dignus ut intres sub tectum meum, sed tantum dic verbo, et sanabitur anima mea\" (\"Lord, I am not worthy that you should enter under my roof, but only say the word and my soul shall be healed\"). In the liturgy of St. John Chrysostom the faithful pray in the same spirit: \"O Son of God, bring me into communion today with your mystical feast.\""
      },
      {
            "number": 2616,
            "title": "Jesus Marvels at Humble and Bold Faith in Prayer",
            "text": "Jesus hears the prayer of faith, expressed in words or in silence. He is touched by the faith of the centurion, who recognizes Jesus' sovereign authority over illness and distance: \"Lord, I am not worthy... only say the word.\""
      },
      {
            "number": 2734,
            "title": "Filial Trust and Humility in Christian Petition",
            "text": "Filial trust is tested—it proves itself—in tribulation. The principal difficulty concerns the prayer of petition. But when our prayer is grounded in humble trust like that of the centurion, God gives us what is best for our salvation."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Benedict XVI",
            "documentTitle": "General Audience on Christian Prayer",
            "citation": "May 16, 2012",
            "insight": "The Roman Centurion was a pagan, yet his faith was praised by Jesus above that of all Israel. His humility made him worthy of welcoming divine mercy, teaching every communicant how to approach the altar."
      }
],
    inBrief: [
      "Lord, I am not worthy that you should enter under my roof; only say the word and my servant shall be healed (Matthew 8:8).",
      "The Church places the centurion's words on our lips at every Holy Mass right before receiving the Blessed Sacrament.",
      "Sincere humility and confident trust in Christ's divine power win immediate answers from the Heart of Jesus."
],
    meditationQuestion: 'Do I recite "Lord, I am not worthy" at Mass mechanically, or with the trembling awe and vibrant faith of the Centurion?',
    practicalLiving: 'Recite the Centurion\'s prayer three times with deep reverence today as a preparation for your next Holy Communion.',
    crossReferences: [
      "Matthew 8:5-11",
      "Luke 7:1-10",
      "CCC 1386",
      "CCC 2616"
]
  },
  'luke 1:26-38':   {
    gospelCitation: 'Luke 1:26-38',
    topicTitle: 'The Annunciation to Mary & The Immaculate Conception: The Fiat of Pure Grace',
    topicSubtitle: 'Behold, I am the handmaid of the Lord; let it be done to me according to your word',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Virgin Mary',
    chapter: 'Conceived by the Power of the Holy Spirit, Born of the Virgin Mary',
    paragraphsRange: 'Catechism of the Catholic Church 484, 490, 494, 511',
    catechismArticles: [
      {
            "number": 484,
            "title": "The Annunciation Inaugurates the Fullness of Time",
            "text": "The Annunciation to Mary inaugurates \"the fullness of time\", the time of the fulfillment of God's promises and preparations. Mary was invited to conceive him in whom the \"whole fullness of deity\" would dwell \"bodily.\" The divine response to her question, \"How can this be, since I have no husband?\" was given by the power of the Spirit: \"The Holy Spirit will come upon you.\""
      },
      {
            "number": 490,
            "title": "Full of Grace: The Immaculate Conception of Mary",
            "text": "To become the mother of the Savior, Mary \"was enriched by God with gifts appropriate to such a role.\" The angel Gabriel at the moment of the annunciation salutes her as \"full of grace.\" In fact, in order for Mary to be able to give the free assent of her faith to the announcement of her vocation, it was necessary that she be wholly borne by God's grace."
      },
      {
            "number": 494,
            "title": "Mary's Fiat: The Obedience of Faith and Redemptive Cooperation",
            "text": "At the announcement that she would give birth to \"the Son of the Most High\" without knowing man, by the power of the Holy Spirit, Mary responded with the obedience of faith: \"Behold, I am the handmaid of the Lord; let it be to me according to your word.\" Thus, giving her consent to God's word, Mary becomes the mother of Jesus. Espousing the divine will for salvation wholeheartedly, she committed herself totally as the handmaid of the Lord."
      }
],
    magisterialInputs: [
      {
            "authority": "Blessed Pope Pius IX",
            "documentTitle": "Apostolic Constitution Ineffabilis Deus (Dogma of the Immaculate Conception)",
            "citation": "Dec 8, 1854",
            "insight": "The most Blessed Virgin Mary was, from the first moment of her conception, by a singular grace and privilege of almighty God and by virtue of the merits of Jesus Christ, Savior of the human race, preserved immune from all stain of original sin."
      }
],
    inBrief: [
      "Hail, full of grace, the Lord is with thee: blessed art thou among women (Luke 1:28).",
      "The Blessed Virgin Mary was preserved spotless from every taint of sin to become the living Tabernacle of the Son of God.",
      "Mary's unconditional \"Fiat\" untied the knot of Eve's disobedience and opened the gates of heaven to humanity."
],
    meditationQuestion: 'Do I surrender my plans and future to God with the prompt, generous "Fiat" of the Blessed Mother?',
    practicalLiving: 'Pray the Angelus at noon today with deep devotion, honoring the mystery of the Incarnation accomplished in Mary\'s womb.',
    crossReferences: [
      "Luke 1:26-38",
      "Genesis 3:15",
      "CCC 490",
      "CCC 494"
]
  },
  'lk 1:26-38':   {
    gospelCitation: 'Luke 1:26-38',
    topicTitle: 'The Annunciation to Mary & The Immaculate Conception: The Fiat of Pure Grace',
    topicSubtitle: 'Behold, I am the handmaid of the Lord; let it be done to me according to your word',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Virgin Mary',
    chapter: 'Conceived by the Power of the Holy Spirit, Born of the Virgin Mary',
    paragraphsRange: 'Catechism of the Catholic Church 484, 490, 494, 511',
    catechismArticles: [
      {
            "number": 484,
            "title": "The Annunciation Inaugurates the Fullness of Time",
            "text": "The Annunciation to Mary inaugurates \"the fullness of time\", the time of the fulfillment of God's promises and preparations. Mary was invited to conceive him in whom the \"whole fullness of deity\" would dwell \"bodily.\" The divine response to her question, \"How can this be, since I have no husband?\" was given by the power of the Spirit: \"The Holy Spirit will come upon you.\""
      },
      {
            "number": 490,
            "title": "Full of Grace: The Immaculate Conception of Mary",
            "text": "To become the mother of the Savior, Mary \"was enriched by God with gifts appropriate to such a role.\" The angel Gabriel at the moment of the annunciation salutes her as \"full of grace.\" In fact, in order for Mary to be able to give the free assent of her faith to the announcement of her vocation, it was necessary that she be wholly borne by God's grace."
      },
      {
            "number": 494,
            "title": "Mary's Fiat: The Obedience of Faith and Redemptive Cooperation",
            "text": "At the announcement that she would give birth to \"the Son of the Most High\" without knowing man, by the power of the Holy Spirit, Mary responded with the obedience of faith: \"Behold, I am the handmaid of the Lord; let it be to me according to your word.\" Thus, giving her consent to God's word, Mary becomes the mother of Jesus. Espousing the divine will for salvation wholeheartedly, she committed herself totally as the handmaid of the Lord."
      }
],
    magisterialInputs: [
      {
            "authority": "Blessed Pope Pius IX",
            "documentTitle": "Apostolic Constitution Ineffabilis Deus (Dogma of the Immaculate Conception)",
            "citation": "Dec 8, 1854",
            "insight": "The most Blessed Virgin Mary was, from the first moment of her conception, by a singular grace and privilege of almighty God and by virtue of the merits of Jesus Christ, Savior of the human race, preserved immune from all stain of original sin."
      }
],
    inBrief: [
      "Hail, full of grace, the Lord is with thee: blessed art thou among women (Luke 1:28).",
      "The Blessed Virgin Mary was preserved spotless from every taint of sin to become the living Tabernacle of the Son of God.",
      "Mary's unconditional \"Fiat\" untied the knot of Eve's disobedience and opened the gates of heaven to humanity."
],
    meditationQuestion: 'Do I surrender my plans and future to God with the prompt, generous "Fiat" of the Blessed Mother?',
    practicalLiving: 'Pray the Angelus at noon today with deep devotion, honoring the mystery of the Incarnation accomplished in Mary\'s womb.',
    crossReferences: [
      "Luke 1:26-38",
      "Genesis 3:15",
      "CCC 490",
      "CCC 494"
]
  },
  'luke 1:26':   {
    gospelCitation: 'Luke 1:26-38',
    topicTitle: 'The Annunciation to Mary & The Immaculate Conception: The Fiat of Pure Grace',
    topicSubtitle: 'Behold, I am the handmaid of the Lord; let it be done to me according to your word',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Virgin Mary',
    chapter: 'Conceived by the Power of the Holy Spirit, Born of the Virgin Mary',
    paragraphsRange: 'Catechism of the Catholic Church 484, 490, 494, 511',
    catechismArticles: [
      {
            "number": 484,
            "title": "The Annunciation Inaugurates the Fullness of Time",
            "text": "The Annunciation to Mary inaugurates \"the fullness of time\", the time of the fulfillment of God's promises and preparations. Mary was invited to conceive him in whom the \"whole fullness of deity\" would dwell \"bodily.\" The divine response to her question, \"How can this be, since I have no husband?\" was given by the power of the Spirit: \"The Holy Spirit will come upon you.\""
      },
      {
            "number": 490,
            "title": "Full of Grace: The Immaculate Conception of Mary",
            "text": "To become the mother of the Savior, Mary \"was enriched by God with gifts appropriate to such a role.\" The angel Gabriel at the moment of the annunciation salutes her as \"full of grace.\" In fact, in order for Mary to be able to give the free assent of her faith to the announcement of her vocation, it was necessary that she be wholly borne by God's grace."
      },
      {
            "number": 494,
            "title": "Mary's Fiat: The Obedience of Faith and Redemptive Cooperation",
            "text": "At the announcement that she would give birth to \"the Son of the Most High\" without knowing man, by the power of the Holy Spirit, Mary responded with the obedience of faith: \"Behold, I am the handmaid of the Lord; let it be to me according to your word.\" Thus, giving her consent to God's word, Mary becomes the mother of Jesus. Espousing the divine will for salvation wholeheartedly, she committed herself totally as the handmaid of the Lord."
      }
],
    magisterialInputs: [
      {
            "authority": "Blessed Pope Pius IX",
            "documentTitle": "Apostolic Constitution Ineffabilis Deus (Dogma of the Immaculate Conception)",
            "citation": "Dec 8, 1854",
            "insight": "The most Blessed Virgin Mary was, from the first moment of her conception, by a singular grace and privilege of almighty God and by virtue of the merits of Jesus Christ, Savior of the human race, preserved immune from all stain of original sin."
      }
],
    inBrief: [
      "Hail, full of grace, the Lord is with thee: blessed art thou among women (Luke 1:28).",
      "The Blessed Virgin Mary was preserved spotless from every taint of sin to become the living Tabernacle of the Son of God.",
      "Mary's unconditional \"Fiat\" untied the knot of Eve's disobedience and opened the gates of heaven to humanity."
],
    meditationQuestion: 'Do I surrender my plans and future to God with the prompt, generous "Fiat" of the Blessed Mother?',
    practicalLiving: 'Pray the Angelus at noon today with deep devotion, honoring the mystery of the Incarnation accomplished in Mary\'s womb.',
    crossReferences: [
      "Luke 1:26-38",
      "Genesis 3:15",
      "CCC 490",
      "CCC 494"
]
  },
  'luke 1:39-47':   {
    gospelCitation: 'Luke 1:39-47',
    topicTitle: 'The Visitation of Mary to Elizabeth & Our Lady of Guadalupe: The Leap of Joy in the Womb',
    topicSubtitle: 'Blessed is she who believed that there would be a fulfillment of what was spoken to her from the Lord',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Four: Christian Prayer',
    section: 'Section Two: The Creed & Prayer to the Mother of God',
    chapter: 'The Holy Spirit Sanctifying the Precursor in the Womb & The Hail Mary',
    paragraphsRange: 'Catechism of the Catholic Church 717, 971, 2676, 2677',
    catechismArticles: [
      {
            "number": 717,
            "title": "The Holy Spirit Fills John the Baptist at Mary's Greeting",
            "text": "\"There was a man sent from God, whose name was John.\" John was \"filled with the Holy Spirit even from his mother's womb\" by Christ himself, whom the Virgin Mary had just conceived by the Holy Spirit. Mary's visitation to Elizabeth thus became a visit from God to his people."
      },
      {
            "number": 2676,
            "title": "The Biblical Foundations of the Hail Mary in the Visitation",
            "text": "\"Blessed art thou among women and blessed is the fruit of thy womb, Jesus.\" In the greeting of Elizabeth, the Church echoes the praises of the Visitation. Mary is \"blessed among women\" because she believed in the fulfillment of the Lord's word. Abraham had \"hoped against hope,\" and through faith became the father of many nations. Mary, for her part, through faith conceived him who was to save the world."
      },
      {
            "number": 2677,
            "title": "Holy Mary, Mother of God, Pray for Us Sinners",
            "text": "\"Holy Mary, Mother of God\": With Elizabeth we marvel, \"And why is this granted me, that the mother of my Lord should come to me?\" Because she gives us Jesus, her son, Mary is Mother of God and our mother; we can entrust all our cares and petitions to her."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Homily at the Basilica of Our Lady of Guadalupe",
            "citation": "Jan 23, 1999",
            "insight": "At Tepeyac, Our Lady revealed herself as the Mother of the true God and our Mother, speaking tenderly to St. Juan Diego: \"Am I not here, I who have the honor to be your mother?\""
      }
],
    inBrief: [
      "When the voice of your greeting came to my ears, the babe in my womb leaped for joy (Luke 1:44).",
      "The Visitation reveals Mary as the Ark of the New Covenant carrying the Redeemer across the hill country.",
      "Devotion to Our Lady of Guadalupe and the Mother of God leads directly to vibrant adoration of Jesus Christ."
],
    meditationQuestion: 'Do I bring Christ\'s joy and peace to those I visit, just as Mary brought the Savior to Elizabeth and Zechariah?',
    practicalLiving: 'Pray five Hail Marys today for mothers and for the protection of unborn children in their mothers\' wombs.',
    crossReferences: [
      "Luke 1:39-47",
      "2 Samuel 6:9-11",
      "CCC 717",
      "CCC 2676"
]
  },
  'lk 1:39-47':   {
    gospelCitation: 'Luke 1:39-47',
    topicTitle: 'The Visitation of Mary to Elizabeth & Our Lady of Guadalupe: The Leap of Joy in the Womb',
    topicSubtitle: 'Blessed is she who believed that there would be a fulfillment of what was spoken to her from the Lord',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Four: Christian Prayer',
    section: 'Section Two: The Creed & Prayer to the Mother of God',
    chapter: 'The Holy Spirit Sanctifying the Precursor in the Womb & The Hail Mary',
    paragraphsRange: 'Catechism of the Catholic Church 717, 971, 2676, 2677',
    catechismArticles: [
      {
            "number": 717,
            "title": "The Holy Spirit Fills John the Baptist at Mary's Greeting",
            "text": "\"There was a man sent from God, whose name was John.\" John was \"filled with the Holy Spirit even from his mother's womb\" by Christ himself, whom the Virgin Mary had just conceived by the Holy Spirit. Mary's visitation to Elizabeth thus became a visit from God to his people."
      },
      {
            "number": 2676,
            "title": "The Biblical Foundations of the Hail Mary in the Visitation",
            "text": "\"Blessed art thou among women and blessed is the fruit of thy womb, Jesus.\" In the greeting of Elizabeth, the Church echoes the praises of the Visitation. Mary is \"blessed among women\" because she believed in the fulfillment of the Lord's word. Abraham had \"hoped against hope,\" and through faith became the father of many nations. Mary, for her part, through faith conceived him who was to save the world."
      },
      {
            "number": 2677,
            "title": "Holy Mary, Mother of God, Pray for Us Sinners",
            "text": "\"Holy Mary, Mother of God\": With Elizabeth we marvel, \"And why is this granted me, that the mother of my Lord should come to me?\" Because she gives us Jesus, her son, Mary is Mother of God and our mother; we can entrust all our cares and petitions to her."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Homily at the Basilica of Our Lady of Guadalupe",
            "citation": "Jan 23, 1999",
            "insight": "At Tepeyac, Our Lady revealed herself as the Mother of the true God and our Mother, speaking tenderly to St. Juan Diego: \"Am I not here, I who have the honor to be your mother?\""
      }
],
    inBrief: [
      "When the voice of your greeting came to my ears, the babe in my womb leaped for joy (Luke 1:44).",
      "The Visitation reveals Mary as the Ark of the New Covenant carrying the Redeemer across the hill country.",
      "Devotion to Our Lady of Guadalupe and the Mother of God leads directly to vibrant adoration of Jesus Christ."
],
    meditationQuestion: 'Do I bring Christ\'s joy and peace to those I visit, just as Mary brought the Savior to Elizabeth and Zechariah?',
    practicalLiving: 'Pray five Hail Marys today for mothers and for the protection of unborn children in their mothers\' wombs.',
    crossReferences: [
      "Luke 1:39-47",
      "2 Samuel 6:9-11",
      "CCC 717",
      "CCC 2676"
]
  },
  'luke 1:39':   {
    gospelCitation: 'Luke 1:39-47',
    topicTitle: 'The Visitation of Mary to Elizabeth & Our Lady of Guadalupe: The Leap of Joy in the Womb',
    topicSubtitle: 'Blessed is she who believed that there would be a fulfillment of what was spoken to her from the Lord',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Four: Christian Prayer',
    section: 'Section Two: The Creed & Prayer to the Mother of God',
    chapter: 'The Holy Spirit Sanctifying the Precursor in the Womb & The Hail Mary',
    paragraphsRange: 'Catechism of the Catholic Church 717, 971, 2676, 2677',
    catechismArticles: [
      {
            "number": 717,
            "title": "The Holy Spirit Fills John the Baptist at Mary's Greeting",
            "text": "\"There was a man sent from God, whose name was John.\" John was \"filled with the Holy Spirit even from his mother's womb\" by Christ himself, whom the Virgin Mary had just conceived by the Holy Spirit. Mary's visitation to Elizabeth thus became a visit from God to his people."
      },
      {
            "number": 2676,
            "title": "The Biblical Foundations of the Hail Mary in the Visitation",
            "text": "\"Blessed art thou among women and blessed is the fruit of thy womb, Jesus.\" In the greeting of Elizabeth, the Church echoes the praises of the Visitation. Mary is \"blessed among women\" because she believed in the fulfillment of the Lord's word. Abraham had \"hoped against hope,\" and through faith became the father of many nations. Mary, for her part, through faith conceived him who was to save the world."
      },
      {
            "number": 2677,
            "title": "Holy Mary, Mother of God, Pray for Us Sinners",
            "text": "\"Holy Mary, Mother of God\": With Elizabeth we marvel, \"And why is this granted me, that the mother of my Lord should come to me?\" Because she gives us Jesus, her son, Mary is Mother of God and our mother; we can entrust all our cares and petitions to her."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Homily at the Basilica of Our Lady of Guadalupe",
            "citation": "Jan 23, 1999",
            "insight": "At Tepeyac, Our Lady revealed herself as the Mother of the true God and our Mother, speaking tenderly to St. Juan Diego: \"Am I not here, I who have the honor to be your mother?\""
      }
],
    inBrief: [
      "When the voice of your greeting came to my ears, the babe in my womb leaped for joy (Luke 1:44).",
      "The Visitation reveals Mary as the Ark of the New Covenant carrying the Redeemer across the hill country.",
      "Devotion to Our Lady of Guadalupe and the Mother of God leads directly to vibrant adoration of Jesus Christ."
],
    meditationQuestion: 'Do I bring Christ\'s joy and peace to those I visit, just as Mary brought the Savior to Elizabeth and Zechariah?',
    practicalLiving: 'Pray five Hail Marys today for mothers and for the protection of unborn children in their mothers\' wombs.',
    crossReferences: [
      "Luke 1:39-47",
      "2 Samuel 6:9-11",
      "CCC 717",
      "CCC 2676"
]
  },
  'luke 2:1-14':   {
    gospelCitation: 'Luke 2:1-14',
    topicTitle: 'The Nativity of Our Lord Jesus Christ: The Word Made Flesh in the Manger of Bethlehem',
    topicSubtitle: 'Glory to God in the highest, and on earth peace among men with whom he is pleased',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Incarnation',
    chapter: 'The Mysteries of Jesus\' Infancy and the Holy Nativity',
    paragraphsRange: 'Catechism of the Catholic Church 456, 461, 525, 526',
    catechismArticles: [
      {
            "number": 456,
            "title": "Why Did the Word Become Flesh?",
            "text": "With the Nicene Creed, we answer by confessing: \"For us men and for our salvation he came down from heaven; by the power of the Holy Spirit, he became incarnate of the Virgin Mary, and was made man.\" The Word became flesh for us in order to save us by reconciling us with God, to be our model of holiness, and to make us partakers of the divine nature."
      },
      {
            "number": 525,
            "title": "Jesus Was Born in a Humble Stable: The Poverty of Bethlehem",
            "text": "Jesus was born in a humble stable, into a poor family. Simple shepherds were the first witnesses to this event. In this poverty heaven's glory was made manifest. The Church never tires of singing the glory of this night: \"The Virgin today brings into the world the Eternal, and the earth offers a cave to the Inaccessible. The angels and shepherds praise him and the magi advance with the star, for you are born for us, Little Child, God eternal!\""
      },
      {
            "number": 526,
            "title": "To Become a Child Before God is the Condition for Entering the Kingdom",
            "text": "To become a child in relation to God is the condition for entering the kingdom. For this, we must humble ourselves and become little. Even more: to become \"children of God\" we must be \"born from above\" or \"born of God.\" Only when Christ is formed in us will the mystery of Christmas be fulfilled in us."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. Leo the Great",
            "documentTitle": "First Sermon on the Nativity of the Lord",
            "citation": "Sermo 21",
            "insight": "Christian, recognize your dignity! Having become a sharer in the divine nature, do not return to your former base condition by sin. Remember the Head and the Body of which you are a member."
      }
],
    inBrief: [
      "For unto you is born this day in the city of David a Savior, who is Christ the Lord (Luke 2:11).",
      "In the Incarnation, the invisible Creator took upon Himself the vulnerability of infant flesh for our redemption.",
      "Bethlehem (\"House of Bread\") prefigures the Holy Eucharist where Christ lies down on the altar to nourish us."
],
    meditationQuestion: 'Have I prepared a quiet dwelling in my soul where the infant Savior may rest, detached from worldly noise?',
    practicalLiving: 'Kneel in spirit or before the Nativity crèche today, making an act of silent adoration to the Infant Jesus.',
    crossReferences: [
      "Luke 2:1-14",
      "John 1:14",
      "CCC 456",
      "CCC 525"
]
  },
  'lk 2:1-14':   {
    gospelCitation: 'Luke 2:1-14',
    topicTitle: 'The Nativity of Our Lord Jesus Christ: The Word Made Flesh in the Manger of Bethlehem',
    topicSubtitle: 'Glory to God in the highest, and on earth peace among men with whom he is pleased',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Incarnation',
    chapter: 'The Mysteries of Jesus\' Infancy and the Holy Nativity',
    paragraphsRange: 'Catechism of the Catholic Church 456, 461, 525, 526',
    catechismArticles: [
      {
            "number": 456,
            "title": "Why Did the Word Become Flesh?",
            "text": "With the Nicene Creed, we answer by confessing: \"For us men and for our salvation he came down from heaven; by the power of the Holy Spirit, he became incarnate of the Virgin Mary, and was made man.\" The Word became flesh for us in order to save us by reconciling us with God, to be our model of holiness, and to make us partakers of the divine nature."
      },
      {
            "number": 525,
            "title": "Jesus Was Born in a Humble Stable: The Poverty of Bethlehem",
            "text": "Jesus was born in a humble stable, into a poor family. Simple shepherds were the first witnesses to this event. In this poverty heaven's glory was made manifest. The Church never tires of singing the glory of this night: \"The Virgin today brings into the world the Eternal, and the earth offers a cave to the Inaccessible. The angels and shepherds praise him and the magi advance with the star, for you are born for us, Little Child, God eternal!\""
      },
      {
            "number": 526,
            "title": "To Become a Child Before God is the Condition for Entering the Kingdom",
            "text": "To become a child in relation to God is the condition for entering the kingdom. For this, we must humble ourselves and become little. Even more: to become \"children of God\" we must be \"born from above\" or \"born of God.\" Only when Christ is formed in us will the mystery of Christmas be fulfilled in us."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. Leo the Great",
            "documentTitle": "First Sermon on the Nativity of the Lord",
            "citation": "Sermo 21",
            "insight": "Christian, recognize your dignity! Having become a sharer in the divine nature, do not return to your former base condition by sin. Remember the Head and the Body of which you are a member."
      }
],
    inBrief: [
      "For unto you is born this day in the city of David a Savior, who is Christ the Lord (Luke 2:11).",
      "In the Incarnation, the invisible Creator took upon Himself the vulnerability of infant flesh for our redemption.",
      "Bethlehem (\"House of Bread\") prefigures the Holy Eucharist where Christ lies down on the altar to nourish us."
],
    meditationQuestion: 'Have I prepared a quiet dwelling in my soul where the infant Savior may rest, detached from worldly noise?',
    practicalLiving: 'Kneel in spirit or before the Nativity crèche today, making an act of silent adoration to the Infant Jesus.',
    crossReferences: [
      "Luke 2:1-14",
      "John 1:14",
      "CCC 456",
      "CCC 525"
]
  },
  'luke 2:1':   {
    gospelCitation: 'Luke 2:1-14',
    topicTitle: 'The Nativity of Our Lord Jesus Christ: The Word Made Flesh in the Manger of Bethlehem',
    topicSubtitle: 'Glory to God in the highest, and on earth peace among men with whom he is pleased',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Incarnation',
    chapter: 'The Mysteries of Jesus\' Infancy and the Holy Nativity',
    paragraphsRange: 'Catechism of the Catholic Church 456, 461, 525, 526',
    catechismArticles: [
      {
            "number": 456,
            "title": "Why Did the Word Become Flesh?",
            "text": "With the Nicene Creed, we answer by confessing: \"For us men and for our salvation he came down from heaven; by the power of the Holy Spirit, he became incarnate of the Virgin Mary, and was made man.\" The Word became flesh for us in order to save us by reconciling us with God, to be our model of holiness, and to make us partakers of the divine nature."
      },
      {
            "number": 525,
            "title": "Jesus Was Born in a Humble Stable: The Poverty of Bethlehem",
            "text": "Jesus was born in a humble stable, into a poor family. Simple shepherds were the first witnesses to this event. In this poverty heaven's glory was made manifest. The Church never tires of singing the glory of this night: \"The Virgin today brings into the world the Eternal, and the earth offers a cave to the Inaccessible. The angels and shepherds praise him and the magi advance with the star, for you are born for us, Little Child, God eternal!\""
      },
      {
            "number": 526,
            "title": "To Become a Child Before God is the Condition for Entering the Kingdom",
            "text": "To become a child in relation to God is the condition for entering the kingdom. For this, we must humble ourselves and become little. Even more: to become \"children of God\" we must be \"born from above\" or \"born of God.\" Only when Christ is formed in us will the mystery of Christmas be fulfilled in us."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. Leo the Great",
            "documentTitle": "First Sermon on the Nativity of the Lord",
            "citation": "Sermo 21",
            "insight": "Christian, recognize your dignity! Having become a sharer in the divine nature, do not return to your former base condition by sin. Remember the Head and the Body of which you are a member."
      }
],
    inBrief: [
      "For unto you is born this day in the city of David a Savior, who is Christ the Lord (Luke 2:11).",
      "In the Incarnation, the invisible Creator took upon Himself the vulnerability of infant flesh for our redemption.",
      "Bethlehem (\"House of Bread\") prefigures the Holy Eucharist where Christ lies down on the altar to nourish us."
],
    meditationQuestion: 'Have I prepared a quiet dwelling in my soul where the infant Savior may rest, detached from worldly noise?',
    practicalLiving: 'Kneel in spirit or before the Nativity crèche today, making an act of silent adoration to the Infant Jesus.',
    crossReferences: [
      "Luke 2:1-14",
      "John 1:14",
      "CCC 456",
      "CCC 525"
]
  },
  'matthew 10:17-22':   {
    gospelCitation: 'Matthew 10:17-22',
    topicTitle: 'The Feast of St. Stephen, the First Martyr: Persecution, Fortitude & Forgiving One\'s Enemies',
    topicSubtitle: 'He who endures to the end will be saved: Bearing Witness to the Truth Unto Blood',
    pillar: '',
    part: 'Part Three: Life in Christ',
    section: 'Section Two: The Ten Commandments — The Eighth Commandment',
    chapter: 'Bearing Witness to the Truth — The Supreme Witness of Martyrdom',
    paragraphsRange: 'Catechism of the Catholic Church 2471, 2473, 2474, 2506',
    catechismArticles: [
      {
            "number": 2471,
            "title": "Before Pilate, Christ Proclaimed He Came to Bear Witness to the Truth",
            "text": "Before Pilate, Christ proclaims that he \"has come into the world, to bear witness to the truth.\" The Christian is not to \"be ashamed then of testifying to our Lord.\" In situations that require the witness of the faith, the Christian must profess it without equivocation, after the example of St. Paul before his judges."
      },
      {
            "number": 2473,
            "title": "Martyrdom as the Supreme Witness Given to the Truth of the Faith",
            "text": "Martyrdom is the supreme witness given to the truth of the faith: it means bearing witness even unto death. The martyr bears witness to Christ who died and rose, to whom he is united by charity. He bears witness to the truth of the faith and of Christian doctrine. He endures death through an act of fortitude. \"Let me become the food of the beasts, through whom it will be given me to reach God.\""
      },
      {
            "number": 2474,
            "title": "The Church Gathers the Martyrs' Acts with Reverence",
            "text": "The Church has painstakingly collected the records of those who persevered to the end in witnessing for their faith. These are the acts of the Martyrs. They form the pages of glory in the Church's history, written in the indelible ink of blood."
      }
],
    magisterialInputs: [
      {
            "authority": "St. Fulgentius of Ruspe",
            "documentTitle": "Sermon on the Feast of St. Stephen",
            "citation": "Sermo 3",
            "insight": "Yesterday the King of glory was born on earth; today the brave soldier of Christ enters into heavenly triumph. Love was Stephen's weapon by which he conquered the brutality of the mob and won the crown of life."
      }
],
    inBrief: [
      "You will be hated by all for my name's sake; but he who endures to the end will be saved (Matthew 10:22).",
      "The feast of St. Stephen immediately following Christmas highlights that Christ was born in order to die and redeem us.",
      "Martyrdom is the pinnacle of the theological virtue of charity, conquering hatred through Christlike forgiveness."
],
    meditationQuestion: 'When I face mockery, opposition, or secular peer pressure for my Catholic faith, do I compromise or stand firm in charity?',
    practicalLiving: 'Pray for the grace of holy fortitude today, and forgive from your heart anyone who has spoken ill of you.',
    crossReferences: [
      "Matthew 10:17-22",
      "Acts 7:54-60",
      "CCC 2473",
      "CCC 2474"
]
  },
  'mt 10:17-22':   {
    gospelCitation: 'Matthew 10:17-22',
    topicTitle: 'The Feast of St. Stephen, the First Martyr: Persecution, Fortitude & Forgiving One\'s Enemies',
    topicSubtitle: 'He who endures to the end will be saved: Bearing Witness to the Truth Unto Blood',
    pillar: '',
    part: 'Part Three: Life in Christ',
    section: 'Section Two: The Ten Commandments — The Eighth Commandment',
    chapter: 'Bearing Witness to the Truth — The Supreme Witness of Martyrdom',
    paragraphsRange: 'Catechism of the Catholic Church 2471, 2473, 2474, 2506',
    catechismArticles: [
      {
            "number": 2471,
            "title": "Before Pilate, Christ Proclaimed He Came to Bear Witness to the Truth",
            "text": "Before Pilate, Christ proclaims that he \"has come into the world, to bear witness to the truth.\" The Christian is not to \"be ashamed then of testifying to our Lord.\" In situations that require the witness of the faith, the Christian must profess it without equivocation, after the example of St. Paul before his judges."
      },
      {
            "number": 2473,
            "title": "Martyrdom as the Supreme Witness Given to the Truth of the Faith",
            "text": "Martyrdom is the supreme witness given to the truth of the faith: it means bearing witness even unto death. The martyr bears witness to Christ who died and rose, to whom he is united by charity. He bears witness to the truth of the faith and of Christian doctrine. He endures death through an act of fortitude. \"Let me become the food of the beasts, through whom it will be given me to reach God.\""
      },
      {
            "number": 2474,
            "title": "The Church Gathers the Martyrs' Acts with Reverence",
            "text": "The Church has painstakingly collected the records of those who persevered to the end in witnessing for their faith. These are the acts of the Martyrs. They form the pages of glory in the Church's history, written in the indelible ink of blood."
      }
],
    magisterialInputs: [
      {
            "authority": "St. Fulgentius of Ruspe",
            "documentTitle": "Sermon on the Feast of St. Stephen",
            "citation": "Sermo 3",
            "insight": "Yesterday the King of glory was born on earth; today the brave soldier of Christ enters into heavenly triumph. Love was Stephen's weapon by which he conquered the brutality of the mob and won the crown of life."
      }
],
    inBrief: [
      "You will be hated by all for my name's sake; but he who endures to the end will be saved (Matthew 10:22).",
      "The feast of St. Stephen immediately following Christmas highlights that Christ was born in order to die and redeem us.",
      "Martyrdom is the pinnacle of the theological virtue of charity, conquering hatred through Christlike forgiveness."
],
    meditationQuestion: 'When I face mockery, opposition, or secular peer pressure for my Catholic faith, do I compromise or stand firm in charity?',
    practicalLiving: 'Pray for the grace of holy fortitude today, and forgive from your heart anyone who has spoken ill of you.',
    crossReferences: [
      "Matthew 10:17-22",
      "Acts 7:54-60",
      "CCC 2473",
      "CCC 2474"
]
  },
  'matthew 10:17':   {
    gospelCitation: 'Matthew 10:17-22',
    topicTitle: 'The Feast of St. Stephen, the First Martyr: Persecution, Fortitude & Forgiving One\'s Enemies',
    topicSubtitle: 'He who endures to the end will be saved: Bearing Witness to the Truth Unto Blood',
    pillar: '',
    part: 'Part Three: Life in Christ',
    section: 'Section Two: The Ten Commandments — The Eighth Commandment',
    chapter: 'Bearing Witness to the Truth — The Supreme Witness of Martyrdom',
    paragraphsRange: 'Catechism of the Catholic Church 2471, 2473, 2474, 2506',
    catechismArticles: [
      {
            "number": 2471,
            "title": "Before Pilate, Christ Proclaimed He Came to Bear Witness to the Truth",
            "text": "Before Pilate, Christ proclaims that he \"has come into the world, to bear witness to the truth.\" The Christian is not to \"be ashamed then of testifying to our Lord.\" In situations that require the witness of the faith, the Christian must profess it without equivocation, after the example of St. Paul before his judges."
      },
      {
            "number": 2473,
            "title": "Martyrdom as the Supreme Witness Given to the Truth of the Faith",
            "text": "Martyrdom is the supreme witness given to the truth of the faith: it means bearing witness even unto death. The martyr bears witness to Christ who died and rose, to whom he is united by charity. He bears witness to the truth of the faith and of Christian doctrine. He endures death through an act of fortitude. \"Let me become the food of the beasts, through whom it will be given me to reach God.\""
      },
      {
            "number": 2474,
            "title": "The Church Gathers the Martyrs' Acts with Reverence",
            "text": "The Church has painstakingly collected the records of those who persevered to the end in witnessing for their faith. These are the acts of the Martyrs. They form the pages of glory in the Church's history, written in the indelible ink of blood."
      }
],
    magisterialInputs: [
      {
            "authority": "St. Fulgentius of Ruspe",
            "documentTitle": "Sermon on the Feast of St. Stephen",
            "citation": "Sermo 3",
            "insight": "Yesterday the King of glory was born on earth; today the brave soldier of Christ enters into heavenly triumph. Love was Stephen's weapon by which he conquered the brutality of the mob and won the crown of life."
      }
],
    inBrief: [
      "You will be hated by all for my name's sake; but he who endures to the end will be saved (Matthew 10:22).",
      "The feast of St. Stephen immediately following Christmas highlights that Christ was born in order to die and redeem us.",
      "Martyrdom is the pinnacle of the theological virtue of charity, conquering hatred through Christlike forgiveness."
],
    meditationQuestion: 'When I face mockery, opposition, or secular peer pressure for my Catholic faith, do I compromise or stand firm in charity?',
    practicalLiving: 'Pray for the grace of holy fortitude today, and forgive from your heart anyone who has spoken ill of you.',
    crossReferences: [
      "Matthew 10:17-22",
      "Acts 7:54-60",
      "CCC 2473",
      "CCC 2474"
]
  },
  'john 20:1-9':   {
    gospelCitation: 'John 20:1-9',
    topicTitle: 'The Empty Tomb and the Beloved Disciple: "He Saw and Believed" — The Resurrection Faith',
    topicSubtitle: 'For as yet they did not know the scripture, that he must rise from the dead',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Resurrection',
    chapter: 'The Third Day He Rose Again from the Dead: The Empty Tomb and Apostolic Faith',
    paragraphsRange: 'Catechism of the Catholic Church 638, 640, 647, 651',
    catechismArticles: [
      {
            "number": 638,
            "title": "The Resurrection of Jesus as the Crowning Truth of Our Faith",
            "text": "\"We bring you the good news that what God promised to the fathers, this day he has fulfilled to us their children by raising Jesus.\" The Resurrection of Jesus is the crowning truth of our faith in Christ, a faith believed and lived as the central truth by the first Christian community; handed on as fundamental by Tradition; established by the documents of the New Testament; and preached as an essential part of the Paschal mystery along with the cross."
      },
      {
            "number": 640,
            "title": "The Discovery of the Empty Tomb by the Disciples",
            "text": "\"Why do you seek the living among the dead? He is not here, but has risen.\" The first step toward recognizing the Resurrection was the discovery of the empty tomb. The empty tomb was still not a direct proof of the Resurrection; the body's absence could be explained in other ways. Nonetheless the empty tomb was for all an essential sign. Its discovery by the disciples was the first step toward recognizing the very fact of the Resurrection."
      },
      {
            "number": 651,
            "title": "If Christ Has Not Been Raised, Then Our Preaching is in Vain",
            "text": "\"If Christ has not been raised, then our preaching is in vain and your faith is in vain.\" The Resurrection above all constitutes the confirmation of all Christ's works and teachings. All truths, even those most inaccessible to the human mind, find their justification if Christ by his Resurrection has given the definitive proof of his divine authority."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Benedict XVI",
            "documentTitle": "Jesus of Nazareth: Holy Week",
            "citation": "Ch. 9",
            "insight": "The Resurrection is not simply a miracle of a resuscitated corpse that returns to earthly life. It is an evolutionary leap into a totally new life, the inauguration of a new dimension of human existence."
      }
],
    inBrief: [
      "Then the other disciple, who reached the tomb first, also went in, and he saw and believed (John 20:8).",
      "The empty tomb and the carefully folded burial cloths testify to the historic reality of Christ's bodily Resurrection.",
      "The Resurrection of Christ is the bedrock foundation of the Christian faith and the pledge of our own resurrection."
],
    meditationQuestion: 'Does the living reality of the Risen Christ animate my daily actions and lift me out of despair and cynicism?',
    practicalLiving: 'Pray the Gloria Patri or the Regina Caeli today in joyous thanksgiving for the glorious victory of Christ over death.',
    crossReferences: [
      "John 20:1-9",
      "1 Corinthians 15:14-20",
      "CCC 638",
      "CCC 640"
]
  },
  'jn 20:1-9':   {
    gospelCitation: 'John 20:1-9',
    topicTitle: 'The Empty Tomb and the Beloved Disciple: "He Saw and Believed" — The Resurrection Faith',
    topicSubtitle: 'For as yet they did not know the scripture, that he must rise from the dead',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Resurrection',
    chapter: 'The Third Day He Rose Again from the Dead: The Empty Tomb and Apostolic Faith',
    paragraphsRange: 'Catechism of the Catholic Church 638, 640, 647, 651',
    catechismArticles: [
      {
            "number": 638,
            "title": "The Resurrection of Jesus as the Crowning Truth of Our Faith",
            "text": "\"We bring you the good news that what God promised to the fathers, this day he has fulfilled to us their children by raising Jesus.\" The Resurrection of Jesus is the crowning truth of our faith in Christ, a faith believed and lived as the central truth by the first Christian community; handed on as fundamental by Tradition; established by the documents of the New Testament; and preached as an essential part of the Paschal mystery along with the cross."
      },
      {
            "number": 640,
            "title": "The Discovery of the Empty Tomb by the Disciples",
            "text": "\"Why do you seek the living among the dead? He is not here, but has risen.\" The first step toward recognizing the Resurrection was the discovery of the empty tomb. The empty tomb was still not a direct proof of the Resurrection; the body's absence could be explained in other ways. Nonetheless the empty tomb was for all an essential sign. Its discovery by the disciples was the first step toward recognizing the very fact of the Resurrection."
      },
      {
            "number": 651,
            "title": "If Christ Has Not Been Raised, Then Our Preaching is in Vain",
            "text": "\"If Christ has not been raised, then our preaching is in vain and your faith is in vain.\" The Resurrection above all constitutes the confirmation of all Christ's works and teachings. All truths, even those most inaccessible to the human mind, find their justification if Christ by his Resurrection has given the definitive proof of his divine authority."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Benedict XVI",
            "documentTitle": "Jesus of Nazareth: Holy Week",
            "citation": "Ch. 9",
            "insight": "The Resurrection is not simply a miracle of a resuscitated corpse that returns to earthly life. It is an evolutionary leap into a totally new life, the inauguration of a new dimension of human existence."
      }
],
    inBrief: [
      "Then the other disciple, who reached the tomb first, also went in, and he saw and believed (John 20:8).",
      "The empty tomb and the carefully folded burial cloths testify to the historic reality of Christ's bodily Resurrection.",
      "The Resurrection of Christ is the bedrock foundation of the Christian faith and the pledge of our own resurrection."
],
    meditationQuestion: 'Does the living reality of the Risen Christ animate my daily actions and lift me out of despair and cynicism?',
    practicalLiving: 'Pray the Gloria Patri or the Regina Caeli today in joyous thanksgiving for the glorious victory of Christ over death.',
    crossReferences: [
      "John 20:1-9",
      "1 Corinthians 15:14-20",
      "CCC 638",
      "CCC 640"
]
  },
  'john 20:1':   {
    gospelCitation: 'John 20:1-9',
    topicTitle: 'The Empty Tomb and the Beloved Disciple: "He Saw and Believed" — The Resurrection Faith',
    topicSubtitle: 'For as yet they did not know the scripture, that he must rise from the dead',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Resurrection',
    chapter: 'The Third Day He Rose Again from the Dead: The Empty Tomb and Apostolic Faith',
    paragraphsRange: 'Catechism of the Catholic Church 638, 640, 647, 651',
    catechismArticles: [
      {
            "number": 638,
            "title": "The Resurrection of Jesus as the Crowning Truth of Our Faith",
            "text": "\"We bring you the good news that what God promised to the fathers, this day he has fulfilled to us their children by raising Jesus.\" The Resurrection of Jesus is the crowning truth of our faith in Christ, a faith believed and lived as the central truth by the first Christian community; handed on as fundamental by Tradition; established by the documents of the New Testament; and preached as an essential part of the Paschal mystery along with the cross."
      },
      {
            "number": 640,
            "title": "The Discovery of the Empty Tomb by the Disciples",
            "text": "\"Why do you seek the living among the dead? He is not here, but has risen.\" The first step toward recognizing the Resurrection was the discovery of the empty tomb. The empty tomb was still not a direct proof of the Resurrection; the body's absence could be explained in other ways. Nonetheless the empty tomb was for all an essential sign. Its discovery by the disciples was the first step toward recognizing the very fact of the Resurrection."
      },
      {
            "number": 651,
            "title": "If Christ Has Not Been Raised, Then Our Preaching is in Vain",
            "text": "\"If Christ has not been raised, then our preaching is in vain and your faith is in vain.\" The Resurrection above all constitutes the confirmation of all Christ's works and teachings. All truths, even those most inaccessible to the human mind, find their justification if Christ by his Resurrection has given the definitive proof of his divine authority."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Benedict XVI",
            "documentTitle": "Jesus of Nazareth: Holy Week",
            "citation": "Ch. 9",
            "insight": "The Resurrection is not simply a miracle of a resuscitated corpse that returns to earthly life. It is an evolutionary leap into a totally new life, the inauguration of a new dimension of human existence."
      }
],
    inBrief: [
      "Then the other disciple, who reached the tomb first, also went in, and he saw and believed (John 20:8).",
      "The empty tomb and the carefully folded burial cloths testify to the historic reality of Christ's bodily Resurrection.",
      "The Resurrection of Christ is the bedrock foundation of the Christian faith and the pledge of our own resurrection."
],
    meditationQuestion: 'Does the living reality of the Risen Christ animate my daily actions and lift me out of despair and cynicism?',
    practicalLiving: 'Pray the Gloria Patri or the Regina Caeli today in joyous thanksgiving for the glorious victory of Christ over death.',
    crossReferences: [
      "John 20:1-9",
      "1 Corinthians 15:14-20",
      "CCC 638",
      "CCC 640"
]
  },
  'matthew 2:13-18':   {
    gospelCitation: 'Matthew 2:13-18',
    topicTitle: 'The Holy Innocents, Martyrs: The Flight into Egypt and The Defense of Unborn Life',
    topicSubtitle: 'A voice was heard in Ramah, wailing and loud lamentation, Rachel weeping for her children',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Three: Life in Christ',
    section: 'Section Two: The Ten Commandments — Fifth Commandment',
    chapter: 'The Mysteries of Christ\'s Infancy and Respect for Human Life',
    paragraphsRange: 'Catechism of the Catholic Church 530, 1261, 2268, 2270',
    catechismArticles: [
      {
            "number": 530,
            "title": "The Flight into Egypt and The Massacre of the Innocents",
            "text": "The flight into Egypt and the massacre of the innocents make manifest the opposition of darkness to the light: \"He came to his own home, and his own people received him not.\" Christ's whole life was lived under the sign of persecution. His own share it with him. Jesus' departure from Egypt recalls the exodus and presents him as the definitive liberator of God's people."
      },
      {
            "number": 2268,
            "title": "The Fifth Commandment Forbids Direct and Intentional Murder",
            "text": "The fifth commandment forbids direct and intentional killing as gravely sinful. The murderer and those who cooperate voluntarily in murder commit a sin that cries out to heaven for vengeance: the murder of Abel by his brother Cain, the cries of the innocent blood."
      },
      {
            "number": 2270,
            "title": "Human Life Must Be Respected and Protected from Conception",
            "text": "Human life must be respected and protected absolutely from the moment of conception. From the first moment of his existence, a human being must be recognized as having the rights of a person—among which is the inviolable right of every innocent being to life."
      }
],
    magisterialInputs: [
      {
            "authority": "St. Quodvultdeus",
            "documentTitle": "Sermon on the Holy Innocents",
            "citation": "Sermo 2",
            "insight": "A tiny child is born who is a great King! The children die for Christ, though they know it not. How great the gift of grace! They could not speak, yet they confess Christ with their blood!"
      }
],
    inBrief: [
      "Herod killed all the male children in Bethlehem who were two years old or under (Matthew 2:16).",
      "The Holy Innocents gave their lives for the Savior not by speaking, but by dying as blossoms of the martyrs.",
      "The Church steadfastly defends the sacred inviolability of every innocent human life from conception to natural death."
],
    meditationQuestion: 'Do I actively stand up for the vulnerable, the unborn, and the voiceless in our contemporary culture of death?',
    practicalLiving: 'Fast or make a special sacrifice today for the protection of unborn children and healing for post-abortive families.',
    crossReferences: [
      "Matthew 2:13-18",
      "Jeremiah 31:15",
      "CCC 530",
      "CCC 2270"
]
  },
  'mt 2:13-18':   {
    gospelCitation: 'Matthew 2:13-18',
    topicTitle: 'The Holy Innocents, Martyrs: The Flight into Egypt and The Defense of Unborn Life',
    topicSubtitle: 'A voice was heard in Ramah, wailing and loud lamentation, Rachel weeping for her children',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Three: Life in Christ',
    section: 'Section Two: The Ten Commandments — Fifth Commandment',
    chapter: 'The Mysteries of Christ\'s Infancy and Respect for Human Life',
    paragraphsRange: 'Catechism of the Catholic Church 530, 1261, 2268, 2270',
    catechismArticles: [
      {
            "number": 530,
            "title": "The Flight into Egypt and The Massacre of the Innocents",
            "text": "The flight into Egypt and the massacre of the innocents make manifest the opposition of darkness to the light: \"He came to his own home, and his own people received him not.\" Christ's whole life was lived under the sign of persecution. His own share it with him. Jesus' departure from Egypt recalls the exodus and presents him as the definitive liberator of God's people."
      },
      {
            "number": 2268,
            "title": "The Fifth Commandment Forbids Direct and Intentional Murder",
            "text": "The fifth commandment forbids direct and intentional killing as gravely sinful. The murderer and those who cooperate voluntarily in murder commit a sin that cries out to heaven for vengeance: the murder of Abel by his brother Cain, the cries of the innocent blood."
      },
      {
            "number": 2270,
            "title": "Human Life Must Be Respected and Protected from Conception",
            "text": "Human life must be respected and protected absolutely from the moment of conception. From the first moment of his existence, a human being must be recognized as having the rights of a person—among which is the inviolable right of every innocent being to life."
      }
],
    magisterialInputs: [
      {
            "authority": "St. Quodvultdeus",
            "documentTitle": "Sermon on the Holy Innocents",
            "citation": "Sermo 2",
            "insight": "A tiny child is born who is a great King! The children die for Christ, though they know it not. How great the gift of grace! They could not speak, yet they confess Christ with their blood!"
      }
],
    inBrief: [
      "Herod killed all the male children in Bethlehem who were two years old or under (Matthew 2:16).",
      "The Holy Innocents gave their lives for the Savior not by speaking, but by dying as blossoms of the martyrs.",
      "The Church steadfastly defends the sacred inviolability of every innocent human life from conception to natural death."
],
    meditationQuestion: 'Do I actively stand up for the vulnerable, the unborn, and the voiceless in our contemporary culture of death?',
    practicalLiving: 'Fast or make a special sacrifice today for the protection of unborn children and healing for post-abortive families.',
    crossReferences: [
      "Matthew 2:13-18",
      "Jeremiah 31:15",
      "CCC 530",
      "CCC 2270"
]
  },
  'matthew 2:13':   {
    gospelCitation: 'Matthew 2:13-18',
    topicTitle: 'The Holy Innocents, Martyrs: The Flight into Egypt and The Defense of Unborn Life',
    topicSubtitle: 'A voice was heard in Ramah, wailing and loud lamentation, Rachel weeping for her children',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Three: Life in Christ',
    section: 'Section Two: The Ten Commandments — Fifth Commandment',
    chapter: 'The Mysteries of Christ\'s Infancy and Respect for Human Life',
    paragraphsRange: 'Catechism of the Catholic Church 530, 1261, 2268, 2270',
    catechismArticles: [
      {
            "number": 530,
            "title": "The Flight into Egypt and The Massacre of the Innocents",
            "text": "The flight into Egypt and the massacre of the innocents make manifest the opposition of darkness to the light: \"He came to his own home, and his own people received him not.\" Christ's whole life was lived under the sign of persecution. His own share it with him. Jesus' departure from Egypt recalls the exodus and presents him as the definitive liberator of God's people."
      },
      {
            "number": 2268,
            "title": "The Fifth Commandment Forbids Direct and Intentional Murder",
            "text": "The fifth commandment forbids direct and intentional killing as gravely sinful. The murderer and those who cooperate voluntarily in murder commit a sin that cries out to heaven for vengeance: the murder of Abel by his brother Cain, the cries of the innocent blood."
      },
      {
            "number": 2270,
            "title": "Human Life Must Be Respected and Protected from Conception",
            "text": "Human life must be respected and protected absolutely from the moment of conception. From the first moment of his existence, a human being must be recognized as having the rights of a person—among which is the inviolable right of every innocent being to life."
      }
],
    magisterialInputs: [
      {
            "authority": "St. Quodvultdeus",
            "documentTitle": "Sermon on the Holy Innocents",
            "citation": "Sermo 2",
            "insight": "A tiny child is born who is a great King! The children die for Christ, though they know it not. How great the gift of grace! They could not speak, yet they confess Christ with their blood!"
      }
],
    inBrief: [
      "Herod killed all the male children in Bethlehem who were two years old or under (Matthew 2:16).",
      "The Holy Innocents gave their lives for the Savior not by speaking, but by dying as blossoms of the martyrs.",
      "The Church steadfastly defends the sacred inviolability of every innocent human life from conception to natural death."
],
    meditationQuestion: 'Do I actively stand up for the vulnerable, the unborn, and the voiceless in our contemporary culture of death?',
    practicalLiving: 'Fast or make a special sacrifice today for the protection of unborn children and healing for post-abortive families.',
    crossReferences: [
      "Matthew 2:13-18",
      "Jeremiah 31:15",
      "CCC 530",
      "CCC 2270"
]
  },
  'mark 1:7-11':   {
    gospelCitation: 'Mark 1:7-11',
    topicTitle: 'The Baptism of the Lord in the Jordan: The Heavens Opened and The Trinitarian Epiphany',
    topicSubtitle: 'Thou art my beloved Son; with thee I am well pleased: The Sanctification of the Waters of Baptism',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Two: The Sacraments of the Church',
    section: 'Section Two: The Seven Sacraments',
    chapter: 'The Baptism of Jesus and The Sacrament of Holy Baptism',
    paragraphsRange: 'Catechism of the Catholic Church 535, 536, 537, 1224',
    catechismArticles: [
      {
            "number": 535,
            "title": "Jesus' Public Ministry Begins with His Baptism in the Jordan",
            "text": "Jesus' public life begins with his baptism by John in the Jordan. John proclaims \"a baptism of repentance for the forgiveness of sins.\" A crowd of sinners came to be baptized; Jesus too comes. The Baptist hesitates, but Jesus insists and receives baptism. Then the Holy Spirit, in the form of a dove, comes upon Jesus, and a voice from heaven proclaims, \"This is my beloved Son.\" This is the manifestation (\"Epiphany\") of Jesus as Messiah of Israel and Son of God."
      },
      {
            "number": 536,
            "title": "The Baptism of Jesus as the Acceptance and Inauguration of His Mission",
            "text": "The baptism of Jesus is on his part the acceptance and inauguration of his mission as God's suffering Servant. He allows himself to be numbered among sinners; he is already \"the Lamb of God, who takes away the sin of the world.\" Already he is anticipating the \"baptism\" of his bloody death."
      },
      {
            "number": 1224,
            "title": "Christ Submits to Baptism to Sanctify the Waters of Regeneration",
            "text": "Our Lord voluntarily submitted to the baptism of St. John, intended for sinners, in order to \"fulfill all righteousness.\" Jesus' gesture is a manifestation of his self-emptying. The Spirit who had hovered over the waters of the first creation descended on the waters of the new creation, so that all the baptized might be born of water and the Spirit."
      }
],
    magisterialInputs: [
      {
            "authority": "St. John of Damascus",
            "documentTitle": "Exposition of the Orthodox Faith",
            "citation": "Book IV, Ch. 9",
            "insight": "Christ was baptized not that He had any need of cleansing, but that He might cleanse the waters and impart to them the grace and power to wash away the sins of all who should be baptized in His name."
      }
],
    inBrief: [
      "The heavens opened and the Spirit descended upon him like a dove, and a voice came from heaven: \"Thou art my beloved Son\" (Mark 1:10-11).",
      "The Baptism of the Lord is a luminous revelation of the Most Holy Trinity: Father, Son, and Holy Spirit.",
      "Through Holy Baptism, we are plunged into Christ's death and raised up as adopted children of the Father."
],
    meditationQuestion: 'Do I remember my own Baptism and strive daily to live up to the sublime dignity of an adopted child of God?',
    practicalLiving: 'Bless yourself thoughtfully with Holy Water today, renewing your baptismal promises to reject Satan and cling to Christ.',
    crossReferences: [
      "Mark 1:7-11",
      "Romans 6:3-4",
      "CCC 536",
      "CCC 1224"
]
  },
  'mk 1:7-11':   {
    gospelCitation: 'Mark 1:7-11',
    topicTitle: 'The Baptism of the Lord in the Jordan: The Heavens Opened and The Trinitarian Epiphany',
    topicSubtitle: 'Thou art my beloved Son; with thee I am well pleased: The Sanctification of the Waters of Baptism',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Two: The Sacraments of the Church',
    section: 'Section Two: The Seven Sacraments',
    chapter: 'The Baptism of Jesus and The Sacrament of Holy Baptism',
    paragraphsRange: 'Catechism of the Catholic Church 535, 536, 537, 1224',
    catechismArticles: [
      {
            "number": 535,
            "title": "Jesus' Public Ministry Begins with His Baptism in the Jordan",
            "text": "Jesus' public life begins with his baptism by John in the Jordan. John proclaims \"a baptism of repentance for the forgiveness of sins.\" A crowd of sinners came to be baptized; Jesus too comes. The Baptist hesitates, but Jesus insists and receives baptism. Then the Holy Spirit, in the form of a dove, comes upon Jesus, and a voice from heaven proclaims, \"This is my beloved Son.\" This is the manifestation (\"Epiphany\") of Jesus as Messiah of Israel and Son of God."
      },
      {
            "number": 536,
            "title": "The Baptism of Jesus as the Acceptance and Inauguration of His Mission",
            "text": "The baptism of Jesus is on his part the acceptance and inauguration of his mission as God's suffering Servant. He allows himself to be numbered among sinners; he is already \"the Lamb of God, who takes away the sin of the world.\" Already he is anticipating the \"baptism\" of his bloody death."
      },
      {
            "number": 1224,
            "title": "Christ Submits to Baptism to Sanctify the Waters of Regeneration",
            "text": "Our Lord voluntarily submitted to the baptism of St. John, intended for sinners, in order to \"fulfill all righteousness.\" Jesus' gesture is a manifestation of his self-emptying. The Spirit who had hovered over the waters of the first creation descended on the waters of the new creation, so that all the baptized might be born of water and the Spirit."
      }
],
    magisterialInputs: [
      {
            "authority": "St. John of Damascus",
            "documentTitle": "Exposition of the Orthodox Faith",
            "citation": "Book IV, Ch. 9",
            "insight": "Christ was baptized not that He had any need of cleansing, but that He might cleanse the waters and impart to them the grace and power to wash away the sins of all who should be baptized in His name."
      }
],
    inBrief: [
      "The heavens opened and the Spirit descended upon him like a dove, and a voice came from heaven: \"Thou art my beloved Son\" (Mark 1:10-11).",
      "The Baptism of the Lord is a luminous revelation of the Most Holy Trinity: Father, Son, and Holy Spirit.",
      "Through Holy Baptism, we are plunged into Christ's death and raised up as adopted children of the Father."
],
    meditationQuestion: 'Do I remember my own Baptism and strive daily to live up to the sublime dignity of an adopted child of God?',
    practicalLiving: 'Bless yourself thoughtfully with Holy Water today, renewing your baptismal promises to reject Satan and cling to Christ.',
    crossReferences: [
      "Mark 1:7-11",
      "Romans 6:3-4",
      "CCC 536",
      "CCC 1224"
]
  },
  'mark 1:7':   {
    gospelCitation: 'Mark 1:7-11',
    topicTitle: 'The Baptism of the Lord in the Jordan: The Heavens Opened and The Trinitarian Epiphany',
    topicSubtitle: 'Thou art my beloved Son; with thee I am well pleased: The Sanctification of the Waters of Baptism',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Two: The Sacraments of the Church',
    section: 'Section Two: The Seven Sacraments',
    chapter: 'The Baptism of Jesus and The Sacrament of Holy Baptism',
    paragraphsRange: 'Catechism of the Catholic Church 535, 536, 537, 1224',
    catechismArticles: [
      {
            "number": 535,
            "title": "Jesus' Public Ministry Begins with His Baptism in the Jordan",
            "text": "Jesus' public life begins with his baptism by John in the Jordan. John proclaims \"a baptism of repentance for the forgiveness of sins.\" A crowd of sinners came to be baptized; Jesus too comes. The Baptist hesitates, but Jesus insists and receives baptism. Then the Holy Spirit, in the form of a dove, comes upon Jesus, and a voice from heaven proclaims, \"This is my beloved Son.\" This is the manifestation (\"Epiphany\") of Jesus as Messiah of Israel and Son of God."
      },
      {
            "number": 536,
            "title": "The Baptism of Jesus as the Acceptance and Inauguration of His Mission",
            "text": "The baptism of Jesus is on his part the acceptance and inauguration of his mission as God's suffering Servant. He allows himself to be numbered among sinners; he is already \"the Lamb of God, who takes away the sin of the world.\" Already he is anticipating the \"baptism\" of his bloody death."
      },
      {
            "number": 1224,
            "title": "Christ Submits to Baptism to Sanctify the Waters of Regeneration",
            "text": "Our Lord voluntarily submitted to the baptism of St. John, intended for sinners, in order to \"fulfill all righteousness.\" Jesus' gesture is a manifestation of his self-emptying. The Spirit who had hovered over the waters of the first creation descended on the waters of the new creation, so that all the baptized might be born of water and the Spirit."
      }
],
    magisterialInputs: [
      {
            "authority": "St. John of Damascus",
            "documentTitle": "Exposition of the Orthodox Faith",
            "citation": "Book IV, Ch. 9",
            "insight": "Christ was baptized not that He had any need of cleansing, but that He might cleanse the waters and impart to them the grace and power to wash away the sins of all who should be baptized in His name."
      }
],
    inBrief: [
      "The heavens opened and the Spirit descended upon him like a dove, and a voice came from heaven: \"Thou art my beloved Son\" (Mark 1:10-11).",
      "The Baptism of the Lord is a luminous revelation of the Most Holy Trinity: Father, Son, and Holy Spirit.",
      "Through Holy Baptism, we are plunged into Christ's death and raised up as adopted children of the Father."
],
    meditationQuestion: 'Do I remember my own Baptism and strive daily to live up to the sublime dignity of an adopted child of God?',
    practicalLiving: 'Bless yourself thoughtfully with Holy Water today, renewing your baptismal promises to reject Satan and cling to Christ.',
    crossReferences: [
      "Mark 1:7-11",
      "Romans 6:3-4",
      "CCC 536",
      "CCC 1224"
]
  },
  'john 1:1-18':   {
    gospelCitation: 'John 1:1-18',
    topicTitle: 'The Prologue of St. John: In Principio Erat Verbum — The Eternal Word Made Flesh',
    topicSubtitle: 'And the Word became flesh and dwelt among us, full of grace and truth',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Eternal Word',
    chapter: 'The Incarnation of the Son of God and The Light That Shines in Darkness',
    paragraphsRange: 'Catechism of the Catholic Church 241, 461, 462, 463',
    catechismArticles: [
      {
            "number": 241,
            "title": "The Eternal Generation of the Word in the Mystery of the Trinity",
            "text": "For this reason the Apostles confess Jesus to be the Word: \"In the beginning was the Word, and the Word was with God, and the Word was God\"; as \"the image of the invisible God\"; as the \"reflection of the glory of God and the very stamp of his nature.\""
      },
      {
            "number": 461,
            "title": "The Church Confesses that the Son of God Truly Became Man",
            "text": "Taking up St. John's expression, \"The Word became flesh\", the Church calls \"Incarnation\" the fact that the Son of God assumed a human nature in order to accomplish our salvation in it. In a hymn cited by St. Paul, the Church sings the mystery of the Incarnation: \"Have this mind among yourselves, which is yours in Christ Jesus, who, though he was in the form of God, did not count equality with God a thing to be grasped, but emptied himself, taking the form of a servant.\""
      },
      {
            "number": 463,
            "title": "Belief in the True Incarnation is the Distinctive Mark of Christian Faith",
            "text": "Belief in the true Incarnation of the Son of God is the distinctive sign of Christian faith: \"By this you know the Spirit of God: every spirit which confesses that Jesus Christ has come in the flesh is of God.\" Such is the joyous conviction of the Church from her beginning, that \"great indeed is the mystery of our religion: He was manifested in the flesh.\""
      }
],
    magisterialInputs: [
      {
            "authority": "First Ecumenical Council of Nicaea",
            "documentTitle": "The Nicene Creed",
            "citation": "325 AD",
            "insight": "We believe in one Lord Jesus Christ, the only-begotten Son of God, born of the Father before all ages, God from God, Light from Light, true God from true God, begotten, not made, consubstantial with the Father; through Him all things were made."
      }
],
    inBrief: [
      "In the beginning was the Word, and the Word was with God, and the Word was God... and the Word became flesh and dwelt among us (John 1:1, 14).",
      "The Incarnation is the bridge linking the uncreated eternity of God with human history.",
      "Christ is the true Light who dispels the darkness of error and gives power to become children of God."
],
    meditationQuestion: 'Do I pause in reverent wonder before the staggering truth that God became a human being to save me?',
    practicalLiving: 'Genuflect or bow deeply during the Creed today at the words "and by the Holy Spirit was incarnate of the Virgin Mary, and became man."',
    crossReferences: [
      "John 1:1-18",
      "Philippians 2:5-11",
      "CCC 241",
      "CCC 461"
]
  },
  'jn 1:1-18':   {
    gospelCitation: 'John 1:1-18',
    topicTitle: 'The Prologue of St. John: In Principio Erat Verbum — The Eternal Word Made Flesh',
    topicSubtitle: 'And the Word became flesh and dwelt among us, full of grace and truth',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Eternal Word',
    chapter: 'The Incarnation of the Son of God and The Light That Shines in Darkness',
    paragraphsRange: 'Catechism of the Catholic Church 241, 461, 462, 463',
    catechismArticles: [
      {
            "number": 241,
            "title": "The Eternal Generation of the Word in the Mystery of the Trinity",
            "text": "For this reason the Apostles confess Jesus to be the Word: \"In the beginning was the Word, and the Word was with God, and the Word was God\"; as \"the image of the invisible God\"; as the \"reflection of the glory of God and the very stamp of his nature.\""
      },
      {
            "number": 461,
            "title": "The Church Confesses that the Son of God Truly Became Man",
            "text": "Taking up St. John's expression, \"The Word became flesh\", the Church calls \"Incarnation\" the fact that the Son of God assumed a human nature in order to accomplish our salvation in it. In a hymn cited by St. Paul, the Church sings the mystery of the Incarnation: \"Have this mind among yourselves, which is yours in Christ Jesus, who, though he was in the form of God, did not count equality with God a thing to be grasped, but emptied himself, taking the form of a servant.\""
      },
      {
            "number": 463,
            "title": "Belief in the True Incarnation is the Distinctive Mark of Christian Faith",
            "text": "Belief in the true Incarnation of the Son of God is the distinctive sign of Christian faith: \"By this you know the Spirit of God: every spirit which confesses that Jesus Christ has come in the flesh is of God.\" Such is the joyous conviction of the Church from her beginning, that \"great indeed is the mystery of our religion: He was manifested in the flesh.\""
      }
],
    magisterialInputs: [
      {
            "authority": "First Ecumenical Council of Nicaea",
            "documentTitle": "The Nicene Creed",
            "citation": "325 AD",
            "insight": "We believe in one Lord Jesus Christ, the only-begotten Son of God, born of the Father before all ages, God from God, Light from Light, true God from true God, begotten, not made, consubstantial with the Father; through Him all things were made."
      }
],
    inBrief: [
      "In the beginning was the Word, and the Word was with God, and the Word was God... and the Word became flesh and dwelt among us (John 1:1, 14).",
      "The Incarnation is the bridge linking the uncreated eternity of God with human history.",
      "Christ is the true Light who dispels the darkness of error and gives power to become children of God."
],
    meditationQuestion: 'Do I pause in reverent wonder before the staggering truth that God became a human being to save me?',
    practicalLiving: 'Genuflect or bow deeply during the Creed today at the words "and by the Holy Spirit was incarnate of the Virgin Mary, and became man."',
    crossReferences: [
      "John 1:1-18",
      "Philippians 2:5-11",
      "CCC 241",
      "CCC 461"
]
  },
  'john 1:1':   {
    gospelCitation: 'John 1:1-18',
    topicTitle: 'The Prologue of St. John: In Principio Erat Verbum — The Eternal Word Made Flesh',
    topicSubtitle: 'And the Word became flesh and dwelt among us, full of grace and truth',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Eternal Word',
    chapter: 'The Incarnation of the Son of God and The Light That Shines in Darkness',
    paragraphsRange: 'Catechism of the Catholic Church 241, 461, 462, 463',
    catechismArticles: [
      {
            "number": 241,
            "title": "The Eternal Generation of the Word in the Mystery of the Trinity",
            "text": "For this reason the Apostles confess Jesus to be the Word: \"In the beginning was the Word, and the Word was with God, and the Word was God\"; as \"the image of the invisible God\"; as the \"reflection of the glory of God and the very stamp of his nature.\""
      },
      {
            "number": 461,
            "title": "The Church Confesses that the Son of God Truly Became Man",
            "text": "Taking up St. John's expression, \"The Word became flesh\", the Church calls \"Incarnation\" the fact that the Son of God assumed a human nature in order to accomplish our salvation in it. In a hymn cited by St. Paul, the Church sings the mystery of the Incarnation: \"Have this mind among yourselves, which is yours in Christ Jesus, who, though he was in the form of God, did not count equality with God a thing to be grasped, but emptied himself, taking the form of a servant.\""
      },
      {
            "number": 463,
            "title": "Belief in the True Incarnation is the Distinctive Mark of Christian Faith",
            "text": "Belief in the true Incarnation of the Son of God is the distinctive sign of Christian faith: \"By this you know the Spirit of God: every spirit which confesses that Jesus Christ has come in the flesh is of God.\" Such is the joyous conviction of the Church from her beginning, that \"great indeed is the mystery of our religion: He was manifested in the flesh.\""
      }
],
    magisterialInputs: [
      {
            "authority": "First Ecumenical Council of Nicaea",
            "documentTitle": "The Nicene Creed",
            "citation": "325 AD",
            "insight": "We believe in one Lord Jesus Christ, the only-begotten Son of God, born of the Father before all ages, God from God, Light from Light, true God from true God, begotten, not made, consubstantial with the Father; through Him all things were made."
      }
],
    inBrief: [
      "In the beginning was the Word, and the Word was with God, and the Word was God... and the Word became flesh and dwelt among us (John 1:1, 14).",
      "The Incarnation is the bridge linking the uncreated eternity of God with human history.",
      "Christ is the true Light who dispels the darkness of error and gives power to become children of God."
],
    meditationQuestion: 'Do I pause in reverent wonder before the staggering truth that God became a human being to save me?',
    practicalLiving: 'Genuflect or bow deeply during the Creed today at the words "and by the Holy Spirit was incarnate of the Virgin Mary, and became man."',
    crossReferences: [
      "John 1:1-18",
      "Philippians 2:5-11",
      "CCC 241",
      "CCC 461"
]
  },
  'in principio':   {
    gospelCitation: 'John 1:1-18',
    topicTitle: 'The Prologue of St. John: In Principio Erat Verbum — The Eternal Word Made Flesh',
    topicSubtitle: 'And the Word became flesh and dwelt among us, full of grace and truth',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Eternal Word',
    chapter: 'The Incarnation of the Son of God and The Light That Shines in Darkness',
    paragraphsRange: 'Catechism of the Catholic Church 241, 461, 462, 463',
    catechismArticles: [
      {
            "number": 241,
            "title": "The Eternal Generation of the Word in the Mystery of the Trinity",
            "text": "For this reason the Apostles confess Jesus to be the Word: \"In the beginning was the Word, and the Word was with God, and the Word was God\"; as \"the image of the invisible God\"; as the \"reflection of the glory of God and the very stamp of his nature.\""
      },
      {
            "number": 461,
            "title": "The Church Confesses that the Son of God Truly Became Man",
            "text": "Taking up St. John's expression, \"The Word became flesh\", the Church calls \"Incarnation\" the fact that the Son of God assumed a human nature in order to accomplish our salvation in it. In a hymn cited by St. Paul, the Church sings the mystery of the Incarnation: \"Have this mind among yourselves, which is yours in Christ Jesus, who, though he was in the form of God, did not count equality with God a thing to be grasped, but emptied himself, taking the form of a servant.\""
      },
      {
            "number": 463,
            "title": "Belief in the True Incarnation is the Distinctive Mark of Christian Faith",
            "text": "Belief in the true Incarnation of the Son of God is the distinctive sign of Christian faith: \"By this you know the Spirit of God: every spirit which confesses that Jesus Christ has come in the flesh is of God.\" Such is the joyous conviction of the Church from her beginning, that \"great indeed is the mystery of our religion: He was manifested in the flesh.\""
      }
],
    magisterialInputs: [
      {
            "authority": "First Ecumenical Council of Nicaea",
            "documentTitle": "The Nicene Creed",
            "citation": "325 AD",
            "insight": "We believe in one Lord Jesus Christ, the only-begotten Son of God, born of the Father before all ages, God from God, Light from Light, true God from true God, begotten, not made, consubstantial with the Father; through Him all things were made."
      }
],
    inBrief: [
      "In the beginning was the Word, and the Word was with God, and the Word was God... and the Word became flesh and dwelt among us (John 1:1, 14).",
      "The Incarnation is the bridge linking the uncreated eternity of God with human history.",
      "Christ is the true Light who dispels the darkness of error and gives power to become children of God."
],
    meditationQuestion: 'Do I pause in reverent wonder before the staggering truth that God became a human being to save me?',
    practicalLiving: 'Genuflect or bow deeply during the Creed today at the words "and by the Holy Spirit was incarnate of the Virgin Mary, and became man."',
    crossReferences: [
      "John 1:1-18",
      "Philippians 2:5-11",
      "CCC 241",
      "CCC 461"
]
  },
  'luke 2:41-52':   {
    gospelCitation: 'Luke 2:41-52',
    topicTitle: 'The Finding in the Temple & The Holy Family: Obedience, Nazareth & The Father\'s Business',
    topicSubtitle: 'Did you not know that I must be in my Father\'s house? The School of Nazareth',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Three: Life in Christ',
    section: 'Section Two: The Ten Commandments — The Fourth Commandment',
    chapter: 'The Mysteries of Jesus\' Hidden Life and The Christian Family',
    paragraphsRange: 'Catechism of the Catholic Church 531, 532, 534, 2214',
    catechismArticles: [
      {
            "number": 531,
            "title": "The Hidden Life at Nazareth: The Sanctification of Daily Work",
            "text": "During the greater part of his life Jesus shared the condition of the vast majority of human beings: a daily life spent without evident greatness, a life of manual labor. His religious life was that of a Jew obedient to the law of God, a life in the community. From this whole period it is revealed to us that Jesus was \"obedient\" to his parents and that he \"increased in wisdom and in stature, and in favor with God and man.\""
      },
      {
            "number": 532,
            "title": "Jesus' Obedience to Mary and Joseph as the Image of His Filial Obedience",
            "text": "Jesus' obedience to his mother and legal father fulfills the fourth commandment perfectly and was the temporal image of his filial obedience to his Father in heaven. The everyday obedience of Jesus to Joseph and Mary both announced and anticipated the obedience of Holy Thursday: \"Not my will... \" The hidden life of Nazareth thus initiated the restoration of what had been destroyed by Adam's disobedience."
      },
      {
            "number": 534,
            "title": "The Finding of Jesus in the Temple Unveils His Divine Sonship",
            "text": "The finding of Jesus in the temple is the only event that breaks the silence of the Gospels about the hidden years of Jesus. Here Jesus lets us catch a glimpse of the mystery of his total consecration to a mission that flows from his divine sonship: \"Did you not know that I must be in my Father's house?\" Mary and Joseph \"did not understand\" this mystery, but they welcomed it in faith, and Mary \"kept all these things in her heart.\""
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. Paul VI",
            "documentTitle": "Address at Nazareth",
            "citation": "Jan 5, 1964",
            "insight": "Nazareth is the school in which we begin to understand the life of Jesus: the school of the Gospel. Here we learn the need for silence, the importance of family communion, and the nobility of daily work."
      }
],
    inBrief: [
      "And he went down with them and came to Nazareth, and was obedient to them; and his mother kept all these things in her heart (Luke 2:51).",
      "The thirty years of Jesus' hidden life at Nazareth sanctify ordinary family life, prayer, and manual labor.",
      "Above all human duties, the supreme claims of the Heavenly Father have absolute primacy."
],
    meditationQuestion: 'Do I sanctify my ordinary routine and domestic chores by offering them in silent love as Jesus did at Nazareth?',
    practicalLiving: 'Perform one acts of humble service or patience for a member of your household today without seeking any praise.',
    crossReferences: [
      "Luke 2:41-52",
      "Colossians 3:18-21",
      "CCC 532",
      "CCC 534"
]
  },
  'lk 2:41-52':   {
    gospelCitation: 'Luke 2:41-52',
    topicTitle: 'The Finding in the Temple & The Holy Family: Obedience, Nazareth & The Father\'s Business',
    topicSubtitle: 'Did you not know that I must be in my Father\'s house? The School of Nazareth',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Three: Life in Christ',
    section: 'Section Two: The Ten Commandments — The Fourth Commandment',
    chapter: 'The Mysteries of Jesus\' Hidden Life and The Christian Family',
    paragraphsRange: 'Catechism of the Catholic Church 531, 532, 534, 2214',
    catechismArticles: [
      {
            "number": 531,
            "title": "The Hidden Life at Nazareth: The Sanctification of Daily Work",
            "text": "During the greater part of his life Jesus shared the condition of the vast majority of human beings: a daily life spent without evident greatness, a life of manual labor. His religious life was that of a Jew obedient to the law of God, a life in the community. From this whole period it is revealed to us that Jesus was \"obedient\" to his parents and that he \"increased in wisdom and in stature, and in favor with God and man.\""
      },
      {
            "number": 532,
            "title": "Jesus' Obedience to Mary and Joseph as the Image of His Filial Obedience",
            "text": "Jesus' obedience to his mother and legal father fulfills the fourth commandment perfectly and was the temporal image of his filial obedience to his Father in heaven. The everyday obedience of Jesus to Joseph and Mary both announced and anticipated the obedience of Holy Thursday: \"Not my will... \" The hidden life of Nazareth thus initiated the restoration of what had been destroyed by Adam's disobedience."
      },
      {
            "number": 534,
            "title": "The Finding of Jesus in the Temple Unveils His Divine Sonship",
            "text": "The finding of Jesus in the temple is the only event that breaks the silence of the Gospels about the hidden years of Jesus. Here Jesus lets us catch a glimpse of the mystery of his total consecration to a mission that flows from his divine sonship: \"Did you not know that I must be in my Father's house?\" Mary and Joseph \"did not understand\" this mystery, but they welcomed it in faith, and Mary \"kept all these things in her heart.\""
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. Paul VI",
            "documentTitle": "Address at Nazareth",
            "citation": "Jan 5, 1964",
            "insight": "Nazareth is the school in which we begin to understand the life of Jesus: the school of the Gospel. Here we learn the need for silence, the importance of family communion, and the nobility of daily work."
      }
],
    inBrief: [
      "And he went down with them and came to Nazareth, and was obedient to them; and his mother kept all these things in her heart (Luke 2:51).",
      "The thirty years of Jesus' hidden life at Nazareth sanctify ordinary family life, prayer, and manual labor.",
      "Above all human duties, the supreme claims of the Heavenly Father have absolute primacy."
],
    meditationQuestion: 'Do I sanctify my ordinary routine and domestic chores by offering them in silent love as Jesus did at Nazareth?',
    practicalLiving: 'Perform one acts of humble service or patience for a member of your household today without seeking any praise.',
    crossReferences: [
      "Luke 2:41-52",
      "Colossians 3:18-21",
      "CCC 532",
      "CCC 534"
]
  },
  'luke 2:41':   {
    gospelCitation: 'Luke 2:41-52',
    topicTitle: 'The Finding in the Temple & The Holy Family: Obedience, Nazareth & The Father\'s Business',
    topicSubtitle: 'Did you not know that I must be in my Father\'s house? The School of Nazareth',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Three: Life in Christ',
    section: 'Section Two: The Ten Commandments — The Fourth Commandment',
    chapter: 'The Mysteries of Jesus\' Hidden Life and The Christian Family',
    paragraphsRange: 'Catechism of the Catholic Church 531, 532, 534, 2214',
    catechismArticles: [
      {
            "number": 531,
            "title": "The Hidden Life at Nazareth: The Sanctification of Daily Work",
            "text": "During the greater part of his life Jesus shared the condition of the vast majority of human beings: a daily life spent without evident greatness, a life of manual labor. His religious life was that of a Jew obedient to the law of God, a life in the community. From this whole period it is revealed to us that Jesus was \"obedient\" to his parents and that he \"increased in wisdom and in stature, and in favor with God and man.\""
      },
      {
            "number": 532,
            "title": "Jesus' Obedience to Mary and Joseph as the Image of His Filial Obedience",
            "text": "Jesus' obedience to his mother and legal father fulfills the fourth commandment perfectly and was the temporal image of his filial obedience to his Father in heaven. The everyday obedience of Jesus to Joseph and Mary both announced and anticipated the obedience of Holy Thursday: \"Not my will... \" The hidden life of Nazareth thus initiated the restoration of what had been destroyed by Adam's disobedience."
      },
      {
            "number": 534,
            "title": "The Finding of Jesus in the Temple Unveils His Divine Sonship",
            "text": "The finding of Jesus in the temple is the only event that breaks the silence of the Gospels about the hidden years of Jesus. Here Jesus lets us catch a glimpse of the mystery of his total consecration to a mission that flows from his divine sonship: \"Did you not know that I must be in my Father's house?\" Mary and Joseph \"did not understand\" this mystery, but they welcomed it in faith, and Mary \"kept all these things in her heart.\""
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. Paul VI",
            "documentTitle": "Address at Nazareth",
            "citation": "Jan 5, 1964",
            "insight": "Nazareth is the school in which we begin to understand the life of Jesus: the school of the Gospel. Here we learn the need for silence, the importance of family communion, and the nobility of daily work."
      }
],
    inBrief: [
      "And he went down with them and came to Nazareth, and was obedient to them; and his mother kept all these things in her heart (Luke 2:51).",
      "The thirty years of Jesus' hidden life at Nazareth sanctify ordinary family life, prayer, and manual labor.",
      "Above all human duties, the supreme claims of the Heavenly Father have absolute primacy."
],
    meditationQuestion: 'Do I sanctify my ordinary routine and domestic chores by offering them in silent love as Jesus did at Nazareth?',
    practicalLiving: 'Perform one acts of humble service or patience for a member of your household today without seeking any praise.',
    crossReferences: [
      "Luke 2:41-52",
      "Colossians 3:18-21",
      "CCC 532",
      "CCC 534"
]
  },
  'luke 2:16-21':   {
    gospelCitation: 'Luke 2:16-21',
    topicTitle: 'The Solemnity of Mary, Mother of God: The Holy Name of Jesus and The Circumcision',
    topicSubtitle: 'And at the end of eight days, when he was circumcised, he was called Jesus',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Mother of God',
    chapter: 'Mary the Theotokos and The Saving Name of Jesus',
    paragraphsRange: 'Catechism of the Catholic Church 430, 466, 495, 527',
    catechismArticles: [
      {
            "number": 430,
            "title": "The Holy Name of Jesus Signifies \"God Saves\"",
            "text": "Jesus means in Hebrew: \"God saves.\" At the annunciation, the angel Gabriel gave him the name Jesus as his proper name, which expresses both his identity and his mission. Since God alone can forgive sins, it is God who, in Jesus his eternal Son made man, \"will save his people from their sins.\" In Jesus, God recapitulates the whole of his history of salvation on behalf of men."
      },
      {
            "number": 495,
            "title": "Mary is Truly the \"Mother of God\" (Theotokos)",
            "text": "Called in the Gospels \"the mother of Jesus,\" Mary is acclaimed by Elizabeth even before the birth of her son as \"the mother of my Lord.\" In fact, the One whom she conceived as man by the Holy Spirit, who truly became her Son according to the flesh, was none other than the Father's eternal Son, the second person of the Holy Trinity. Hence the Church confesses that Mary is truly \"Mother of God\" (Theotokos)."
      },
      {
            "number": 527,
            "title": "Jesus' Circumcision as Sign of His Incorporation into Abraham's Descendants",
            "text": "Jesus' circumcision on the eighth day after his birth is the sign of his incorporation into Abraham's descendants, into the people of the covenant. It is the sign of his submission to the Law and his deputation to Israel's worship, in which he will participate throughout his life. This sign prefigures that \"circumcision of Christ\" which is Baptism."
      }
],
    magisterialInputs: [
      {
            "authority": "Council of Ephesus",
            "documentTitle": "Declaration of the Council",
            "citation": "431 AD",
            "insight": "If anyone does not confess that Emmanuel is God in truth, and therefore that the holy Virgin is the Mother of God (Theotokos)—since she bore according to the flesh the Word of God who became flesh—let him be anathema."
      }
],
    inBrief: [
      "Mary kept all these things, pondering them in her heart (Luke 2:19).",
      "Mary is rightly invoked as Theotokos, Mother of God, because she gave birth to the Son of God according to human nature.",
      "There is no other name under heaven given among men by which we must be saved than the Holy Name of Jesus."
],
    meditationQuestion: 'Do I call upon the Holy Name of Jesus with veneration and love during moments of trial and temptation?',
    practicalLiving: 'Bow your head in interior adoration whenever you speak or hear the Holy Name of Jesus today, invoking His protection over the new year.',
    crossReferences: [
      "Luke 2:16-21",
      "Acts 4:12",
      "CCC 430",
      "CCC 495"
]
  },
  'lk 2:16-21':   {
    gospelCitation: 'Luke 2:16-21',
    topicTitle: 'The Solemnity of Mary, Mother of God: The Holy Name of Jesus and The Circumcision',
    topicSubtitle: 'And at the end of eight days, when he was circumcised, he was called Jesus',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Mother of God',
    chapter: 'Mary the Theotokos and The Saving Name of Jesus',
    paragraphsRange: 'Catechism of the Catholic Church 430, 466, 495, 527',
    catechismArticles: [
      {
            "number": 430,
            "title": "The Holy Name of Jesus Signifies \"God Saves\"",
            "text": "Jesus means in Hebrew: \"God saves.\" At the annunciation, the angel Gabriel gave him the name Jesus as his proper name, which expresses both his identity and his mission. Since God alone can forgive sins, it is God who, in Jesus his eternal Son made man, \"will save his people from their sins.\" In Jesus, God recapitulates the whole of his history of salvation on behalf of men."
      },
      {
            "number": 495,
            "title": "Mary is Truly the \"Mother of God\" (Theotokos)",
            "text": "Called in the Gospels \"the mother of Jesus,\" Mary is acclaimed by Elizabeth even before the birth of her son as \"the mother of my Lord.\" In fact, the One whom she conceived as man by the Holy Spirit, who truly became her Son according to the flesh, was none other than the Father's eternal Son, the second person of the Holy Trinity. Hence the Church confesses that Mary is truly \"Mother of God\" (Theotokos)."
      },
      {
            "number": 527,
            "title": "Jesus' Circumcision as Sign of His Incorporation into Abraham's Descendants",
            "text": "Jesus' circumcision on the eighth day after his birth is the sign of his incorporation into Abraham's descendants, into the people of the covenant. It is the sign of his submission to the Law and his deputation to Israel's worship, in which he will participate throughout his life. This sign prefigures that \"circumcision of Christ\" which is Baptism."
      }
],
    magisterialInputs: [
      {
            "authority": "Council of Ephesus",
            "documentTitle": "Declaration of the Council",
            "citation": "431 AD",
            "insight": "If anyone does not confess that Emmanuel is God in truth, and therefore that the holy Virgin is the Mother of God (Theotokos)—since she bore according to the flesh the Word of God who became flesh—let him be anathema."
      }
],
    inBrief: [
      "Mary kept all these things, pondering them in her heart (Luke 2:19).",
      "Mary is rightly invoked as Theotokos, Mother of God, because she gave birth to the Son of God according to human nature.",
      "There is no other name under heaven given among men by which we must be saved than the Holy Name of Jesus."
],
    meditationQuestion: 'Do I call upon the Holy Name of Jesus with veneration and love during moments of trial and temptation?',
    practicalLiving: 'Bow your head in interior adoration whenever you speak or hear the Holy Name of Jesus today, invoking His protection over the new year.',
    crossReferences: [
      "Luke 2:16-21",
      "Acts 4:12",
      "CCC 430",
      "CCC 495"
]
  },
  'luke 2:16':   {
    gospelCitation: 'Luke 2:16-21',
    topicTitle: 'The Solemnity of Mary, Mother of God: The Holy Name of Jesus and The Circumcision',
    topicSubtitle: 'And at the end of eight days, when he was circumcised, he was called Jesus',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Mother of God',
    chapter: 'Mary the Theotokos and The Saving Name of Jesus',
    paragraphsRange: 'Catechism of the Catholic Church 430, 466, 495, 527',
    catechismArticles: [
      {
            "number": 430,
            "title": "The Holy Name of Jesus Signifies \"God Saves\"",
            "text": "Jesus means in Hebrew: \"God saves.\" At the annunciation, the angel Gabriel gave him the name Jesus as his proper name, which expresses both his identity and his mission. Since God alone can forgive sins, it is God who, in Jesus his eternal Son made man, \"will save his people from their sins.\" In Jesus, God recapitulates the whole of his history of salvation on behalf of men."
      },
      {
            "number": 495,
            "title": "Mary is Truly the \"Mother of God\" (Theotokos)",
            "text": "Called in the Gospels \"the mother of Jesus,\" Mary is acclaimed by Elizabeth even before the birth of her son as \"the mother of my Lord.\" In fact, the One whom she conceived as man by the Holy Spirit, who truly became her Son according to the flesh, was none other than the Father's eternal Son, the second person of the Holy Trinity. Hence the Church confesses that Mary is truly \"Mother of God\" (Theotokos)."
      },
      {
            "number": 527,
            "title": "Jesus' Circumcision as Sign of His Incorporation into Abraham's Descendants",
            "text": "Jesus' circumcision on the eighth day after his birth is the sign of his incorporation into Abraham's descendants, into the people of the covenant. It is the sign of his submission to the Law and his deputation to Israel's worship, in which he will participate throughout his life. This sign prefigures that \"circumcision of Christ\" which is Baptism."
      }
],
    magisterialInputs: [
      {
            "authority": "Council of Ephesus",
            "documentTitle": "Declaration of the Council",
            "citation": "431 AD",
            "insight": "If anyone does not confess that Emmanuel is God in truth, and therefore that the holy Virgin is the Mother of God (Theotokos)—since she bore according to the flesh the Word of God who became flesh—let him be anathema."
      }
],
    inBrief: [
      "Mary kept all these things, pondering them in her heart (Luke 2:19).",
      "Mary is rightly invoked as Theotokos, Mother of God, because she gave birth to the Son of God according to human nature.",
      "There is no other name under heaven given among men by which we must be saved than the Holy Name of Jesus."
],
    meditationQuestion: 'Do I call upon the Holy Name of Jesus with veneration and love during moments of trial and temptation?',
    practicalLiving: 'Bow your head in interior adoration whenever you speak or hear the Holy Name of Jesus today, invoking His protection over the new year.',
    crossReferences: [
      "Luke 2:16-21",
      "Acts 4:12",
      "CCC 430",
      "CCC 495"
]
  },
  'matthew 2:1-12':   {
    gospelCitation: 'Matthew 2:1-12',
    topicTitle: 'The Epiphany of the Lord: The Adoration of the Magi and The Manifestation to the Nations',
    topicSubtitle: 'They fell down and worshiped him; then, opening their treasures, they offered him gifts, gold and frankincense and myrrh',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Epiphany',
    chapter: 'The Manifestation of Christ to the Gentiles and The Universal Call to Faith',
    paragraphsRange: 'Catechism of the Catholic Church 528, 774, 1202',
    catechismArticles: [
      {
            "number": 528,
            "title": "The Epiphany as the Manifestation of Jesus as King and Savior",
            "text": "The Epiphany is the manifestation of Jesus as Messiah of Israel, Son of God and Savior of the world. The great feast of Epiphany celebrates the adoration of the Magi from the East, together with Jesus' baptism in the Jordan and the wedding feast at Cana in Galilee. In the magi, representatives of the neighboring pagan religions, the Gospel sees the first-fruits of the nations, who welcome the good news of salvation through the Incarnation."
      },
      {
            "number": 774,
            "title": "The Church as the Visible Sacrament of Salvation for All Peoples",
            "text": "The Greek word mysterion was translated into Latin by two terms: mysterium and sacramentum. In later usage the term sacramentum emphasizes the visible sign of the hidden reality of salvation which was indicated by the term mysterium. In this sense the Church herself is the sacrament of salvation, the sign and the instrument of the communion of God and men."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. Leo the Great",
            "documentTitle": "Sermon on the Feast of the Epiphany",
            "citation": "Sermo 31",
            "insight": "The star guided the Magi to worship the tiny Infant. In their treasures they opened a three-fold confession: gold for His royal majesty, incense for His divine nature, and myrrh for His mortal humanity that would die for us."
      }
],
    inBrief: [
      "Where is he who has been born king of the Jews? For we have seen his star in the East, and have come to worship him (Matthew 2:2).",
      "The Magi represent all pagan nations summoned to join the true Israel in adoring Jesus Christ.",
      "Our gifts to Christ are not material riches, but the gold of charity, the incense of prayer, and the myrrh of self-denial."
],
    meditationQuestion: 'What star of divine inspiration is God using to lead me closer to Christ, and what gifts am I presenting to Him?',
    practicalLiving: 'Make an act of adoration before Christ the King today, offering Him your work (gold), your prayers (incense), and your sufferings (myrrh).',
    crossReferences: [
      "Matthew 2:1-12",
      "Isaiah 60:1-6",
      "CCC 528",
      "CCC 774"
]
  },
  'mt 2:1-12':   {
    gospelCitation: 'Matthew 2:1-12',
    topicTitle: 'The Epiphany of the Lord: The Adoration of the Magi and The Manifestation to the Nations',
    topicSubtitle: 'They fell down and worshiped him; then, opening their treasures, they offered him gifts, gold and frankincense and myrrh',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Epiphany',
    chapter: 'The Manifestation of Christ to the Gentiles and The Universal Call to Faith',
    paragraphsRange: 'Catechism of the Catholic Church 528, 774, 1202',
    catechismArticles: [
      {
            "number": 528,
            "title": "The Epiphany as the Manifestation of Jesus as King and Savior",
            "text": "The Epiphany is the manifestation of Jesus as Messiah of Israel, Son of God and Savior of the world. The great feast of Epiphany celebrates the adoration of the Magi from the East, together with Jesus' baptism in the Jordan and the wedding feast at Cana in Galilee. In the magi, representatives of the neighboring pagan religions, the Gospel sees the first-fruits of the nations, who welcome the good news of salvation through the Incarnation."
      },
      {
            "number": 774,
            "title": "The Church as the Visible Sacrament of Salvation for All Peoples",
            "text": "The Greek word mysterion was translated into Latin by two terms: mysterium and sacramentum. In later usage the term sacramentum emphasizes the visible sign of the hidden reality of salvation which was indicated by the term mysterium. In this sense the Church herself is the sacrament of salvation, the sign and the instrument of the communion of God and men."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. Leo the Great",
            "documentTitle": "Sermon on the Feast of the Epiphany",
            "citation": "Sermo 31",
            "insight": "The star guided the Magi to worship the tiny Infant. In their treasures they opened a three-fold confession: gold for His royal majesty, incense for His divine nature, and myrrh for His mortal humanity that would die for us."
      }
],
    inBrief: [
      "Where is he who has been born king of the Jews? For we have seen his star in the East, and have come to worship him (Matthew 2:2).",
      "The Magi represent all pagan nations summoned to join the true Israel in adoring Jesus Christ.",
      "Our gifts to Christ are not material riches, but the gold of charity, the incense of prayer, and the myrrh of self-denial."
],
    meditationQuestion: 'What star of divine inspiration is God using to lead me closer to Christ, and what gifts am I presenting to Him?',
    practicalLiving: 'Make an act of adoration before Christ the King today, offering Him your work (gold), your prayers (incense), and your sufferings (myrrh).',
    crossReferences: [
      "Matthew 2:1-12",
      "Isaiah 60:1-6",
      "CCC 528",
      "CCC 774"
]
  },
  'matthew 2:1':   {
    gospelCitation: 'Matthew 2:1-12',
    topicTitle: 'The Epiphany of the Lord: The Adoration of the Magi and The Manifestation to the Nations',
    topicSubtitle: 'They fell down and worshiped him; then, opening their treasures, they offered him gifts, gold and frankincense and myrrh',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Epiphany',
    chapter: 'The Manifestation of Christ to the Gentiles and The Universal Call to Faith',
    paragraphsRange: 'Catechism of the Catholic Church 528, 774, 1202',
    catechismArticles: [
      {
            "number": 528,
            "title": "The Epiphany as the Manifestation of Jesus as King and Savior",
            "text": "The Epiphany is the manifestation of Jesus as Messiah of Israel, Son of God and Savior of the world. The great feast of Epiphany celebrates the adoration of the Magi from the East, together with Jesus' baptism in the Jordan and the wedding feast at Cana in Galilee. In the magi, representatives of the neighboring pagan religions, the Gospel sees the first-fruits of the nations, who welcome the good news of salvation through the Incarnation."
      },
      {
            "number": 774,
            "title": "The Church as the Visible Sacrament of Salvation for All Peoples",
            "text": "The Greek word mysterion was translated into Latin by two terms: mysterium and sacramentum. In later usage the term sacramentum emphasizes the visible sign of the hidden reality of salvation which was indicated by the term mysterium. In this sense the Church herself is the sacrament of salvation, the sign and the instrument of the communion of God and men."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. Leo the Great",
            "documentTitle": "Sermon on the Feast of the Epiphany",
            "citation": "Sermo 31",
            "insight": "The star guided the Magi to worship the tiny Infant. In their treasures they opened a three-fold confession: gold for His royal majesty, incense for His divine nature, and myrrh for His mortal humanity that would die for us."
      }
],
    inBrief: [
      "Where is he who has been born king of the Jews? For we have seen his star in the East, and have come to worship him (Matthew 2:2).",
      "The Magi represent all pagan nations summoned to join the true Israel in adoring Jesus Christ.",
      "Our gifts to Christ are not material riches, but the gold of charity, the incense of prayer, and the myrrh of self-denial."
],
    meditationQuestion: 'What star of divine inspiration is God using to lead me closer to Christ, and what gifts am I presenting to Him?',
    practicalLiving: 'Make an act of adoration before Christ the King today, offering Him your work (gold), your prayers (incense), and your sufferings (myrrh).',
    crossReferences: [
      "Matthew 2:1-12",
      "Isaiah 60:1-6",
      "CCC 528",
      "CCC 774"
]
  },
  'mark 16:15-18':   {
    gospelCitation: 'Mark 16:15-18',
    topicTitle: 'The Feast of the Conversion of St. Paul: The Great Commission & The Power of Grace',
    topicSubtitle: 'Go into all the world and preach the gospel to the whole creation: The Radical Transformation of Saul',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Three: Life in Christ',
    section: 'Section Two: The Creed — The Catholicity of the Church',
    chapter: 'The Universal Missionary Mandate and The Sovereign Power of Grace',
    paragraphsRange: 'Catechism of the Catholic Church 849, 851, 1816, 1996',
    catechismArticles: [
      {
            "number": 849,
            "title": "The Missionary Mandate of the Catholic Church",
            "text": "\"Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, teaching them to observe all that I have commanded you.\" Having been divinely sent to the nations that she might be 'the universal sacrament of salvation,' the Church, in obedience to the command of her founder and because it is demanded by her own essential universality, strives to preach the Gospel to all men."
      },
      {
            "number": 851,
            "title": "The Ultimate Purpose of Mission: Sharing the Trinitarian Communion",
            "text": "The ultimate purpose of mission is none other than to make men share in the communion between the Father and the Son in their Spirit of love. \"God desires all men to be saved and to come to the knowledge of the truth.\" Truth is found in a Person, Jesus Christ."
      },
      {
            "number": 1996,
            "title": "Grace as the Free and Undeserved Help Given by God",
            "text": "Our justification comes from the grace of God. Grace is favor, the free and undeserved help that God gives us to respond to his call to become children of God, adoptive sons, partakers of the divine nature and of eternal life."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Benedict XVI",
            "documentTitle": "Homily on the Conversion of St. Paul",
            "citation": "Jan 25, 2008",
            "insight": "Paul's conversion was not a mere moral turnaround or psychological shift, but a real encounter with the Risen Christ. From that encounter on the road to Damascus, Paul understood that Christ is indivisibly united to His Church: \"Saul, Saul, why do you persecute me?\""
      }
],
    inBrief: [
      "Go into all the world and preach the gospel to the whole creation (Mark 16:15).",
      "The grace of Christ transformed Saul the persecutor into Paul the passionate vessel of election.",
      "Every baptized Christian shares in the urgent duty to proclaim Christ by word and holy example."
],
    meditationQuestion: 'Do I allow the grace of Christ to convert my stubborn habits and make me a bold witness for His truth?',
    practicalLiving: 'Pray for the conversion of hardened sinners today, invoking the intercession of the Apostle Paul.',
    crossReferences: [
      "Mark 16:15-18",
      "Acts 9:1-19",
      "CCC 849",
      "CCC 1996"
]
  },
  'mk 16:15-18':   {
    gospelCitation: 'Mark 16:15-18',
    topicTitle: 'The Feast of the Conversion of St. Paul: The Great Commission & The Power of Grace',
    topicSubtitle: 'Go into all the world and preach the gospel to the whole creation: The Radical Transformation of Saul',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Three: Life in Christ',
    section: 'Section Two: The Creed — The Catholicity of the Church',
    chapter: 'The Universal Missionary Mandate and The Sovereign Power of Grace',
    paragraphsRange: 'Catechism of the Catholic Church 849, 851, 1816, 1996',
    catechismArticles: [
      {
            "number": 849,
            "title": "The Missionary Mandate of the Catholic Church",
            "text": "\"Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, teaching them to observe all that I have commanded you.\" Having been divinely sent to the nations that she might be 'the universal sacrament of salvation,' the Church, in obedience to the command of her founder and because it is demanded by her own essential universality, strives to preach the Gospel to all men."
      },
      {
            "number": 851,
            "title": "The Ultimate Purpose of Mission: Sharing the Trinitarian Communion",
            "text": "The ultimate purpose of mission is none other than to make men share in the communion between the Father and the Son in their Spirit of love. \"God desires all men to be saved and to come to the knowledge of the truth.\" Truth is found in a Person, Jesus Christ."
      },
      {
            "number": 1996,
            "title": "Grace as the Free and Undeserved Help Given by God",
            "text": "Our justification comes from the grace of God. Grace is favor, the free and undeserved help that God gives us to respond to his call to become children of God, adoptive sons, partakers of the divine nature and of eternal life."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Benedict XVI",
            "documentTitle": "Homily on the Conversion of St. Paul",
            "citation": "Jan 25, 2008",
            "insight": "Paul's conversion was not a mere moral turnaround or psychological shift, but a real encounter with the Risen Christ. From that encounter on the road to Damascus, Paul understood that Christ is indivisibly united to His Church: \"Saul, Saul, why do you persecute me?\""
      }
],
    inBrief: [
      "Go into all the world and preach the gospel to the whole creation (Mark 16:15).",
      "The grace of Christ transformed Saul the persecutor into Paul the passionate vessel of election.",
      "Every baptized Christian shares in the urgent duty to proclaim Christ by word and holy example."
],
    meditationQuestion: 'Do I allow the grace of Christ to convert my stubborn habits and make me a bold witness for His truth?',
    practicalLiving: 'Pray for the conversion of hardened sinners today, invoking the intercession of the Apostle Paul.',
    crossReferences: [
      "Mark 16:15-18",
      "Acts 9:1-19",
      "CCC 849",
      "CCC 1996"
]
  },
  'mark 16:15':   {
    gospelCitation: 'Mark 16:15-18',
    topicTitle: 'The Feast of the Conversion of St. Paul: The Great Commission & The Power of Grace',
    topicSubtitle: 'Go into all the world and preach the gospel to the whole creation: The Radical Transformation of Saul',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Three: Life in Christ',
    section: 'Section Two: The Creed — The Catholicity of the Church',
    chapter: 'The Universal Missionary Mandate and The Sovereign Power of Grace',
    paragraphsRange: 'Catechism of the Catholic Church 849, 851, 1816, 1996',
    catechismArticles: [
      {
            "number": 849,
            "title": "The Missionary Mandate of the Catholic Church",
            "text": "\"Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, teaching them to observe all that I have commanded you.\" Having been divinely sent to the nations that she might be 'the universal sacrament of salvation,' the Church, in obedience to the command of her founder and because it is demanded by her own essential universality, strives to preach the Gospel to all men."
      },
      {
            "number": 851,
            "title": "The Ultimate Purpose of Mission: Sharing the Trinitarian Communion",
            "text": "The ultimate purpose of mission is none other than to make men share in the communion between the Father and the Son in their Spirit of love. \"God desires all men to be saved and to come to the knowledge of the truth.\" Truth is found in a Person, Jesus Christ."
      },
      {
            "number": 1996,
            "title": "Grace as the Free and Undeserved Help Given by God",
            "text": "Our justification comes from the grace of God. Grace is favor, the free and undeserved help that God gives us to respond to his call to become children of God, adoptive sons, partakers of the divine nature and of eternal life."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Benedict XVI",
            "documentTitle": "Homily on the Conversion of St. Paul",
            "citation": "Jan 25, 2008",
            "insight": "Paul's conversion was not a mere moral turnaround or psychological shift, but a real encounter with the Risen Christ. From that encounter on the road to Damascus, Paul understood that Christ is indivisibly united to His Church: \"Saul, Saul, why do you persecute me?\""
      }
],
    inBrief: [
      "Go into all the world and preach the gospel to the whole creation (Mark 16:15).",
      "The grace of Christ transformed Saul the persecutor into Paul the passionate vessel of election.",
      "Every baptized Christian shares in the urgent duty to proclaim Christ by word and holy example."
],
    meditationQuestion: 'Do I allow the grace of Christ to convert my stubborn habits and make me a bold witness for His truth?',
    practicalLiving: 'Pray for the conversion of hardened sinners today, invoking the intercession of the Apostle Paul.',
    crossReferences: [
      "Mark 16:15-18",
      "Acts 9:1-19",
      "CCC 849",
      "CCC 1996"
]
  },
  'luke 2:22-40':   {
    gospelCitation: 'Luke 2:22-40',
    topicTitle: 'The Presentation of the Lord (Candlemas): Light of Revelation to the Gentiles and The Piercing Sword',
    topicSubtitle: 'A light for revelation to the Gentiles, and for glory to thy people Israel; and a sword will pierce through your own soul also',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Mysteries of Christ\'s Childhood',
    chapter: 'The Presentation in the Temple and The Compassion of Our Lady',
    paragraphsRange: 'Catechism of the Catholic Church 529, 583, 711, 964',
    catechismArticles: [
      {
            "number": 529,
            "title": "The Presentation of Jesus in the Temple Celebrates the Encounter of the Messiah",
            "text": "The presentation of Jesus in the temple shows him to be the firstborn Son who belongs to the Lord. With Simeon and Anna, all Israel's awaiting of its Savior comes to meet him—the Byzantine tradition calls this the Hypapante (\"meeting\"). Jesus is recognized as the long-expected Messiah, the \"light to the Gentiles\" and the \"glory of Israel\", but also \"a sign that is spoken against.\" The sword of sorrow predicted for Mary announces Christ's perfect and unique oblation on the cross that will impart the salvation God had \"prepared in the presence of all peoples.\""
      },
      {
            "number": 964,
            "title": "Mary's Association with Christ's Suffering at the Cross",
            "text": "Mary's role in the Church is inseparable from her union with Christ and flows directly from it. \"This union of the mother with the Son in the work of salvation is made manifest from the time of Christ's virginal conception up to his death\"; it is made manifest above all at the hour of his Passion. Mary suffered grievously with her only-begotten Son, lovingly associating herself with his sacrifice."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Homily on the Feast of the Presentation",
            "citation": "Feb 2, 1997",
            "insight": "Candlemas celebrates the encounter between the ancient hopes of Israel and the Infant Redeemer. Holding candles, we profess that Christ is the Light who dispels the darkness of the world and consecrated life is called to radiate this light."
      }
],
    inBrief: [
      "Lord, now lettest thou thy servant depart in peace, according to thy word; for mine eyes have seen thy salvation (Luke 2:29-30).",
      "The Infant Jesus is offered in the Temple as the spotless Lamb who will offer Himself on Calvary for our redemption.",
      "Our Lady of Sorrows stands united to her Son, whose Passion is prefigured by the sword prophesied by Simeon."
],
    meditationQuestion: 'Do I present my life, my work, and my family completely to God, accepting whatever "swords" of purification He may permit?',
    practicalLiving: 'Light a blessed candle or pray Simeon\'s Canticle (Nunc Dimittis) tonight before going to bed.',
    crossReferences: [
      "Luke 2:22-40",
      "Leviticus 12:1-8",
      "CCC 529",
      "CCC 964"
]
  },
  'lk 2:22-40':   {
    gospelCitation: 'Luke 2:22-40',
    topicTitle: 'The Presentation of the Lord (Candlemas): Light of Revelation to the Gentiles and The Piercing Sword',
    topicSubtitle: 'A light for revelation to the Gentiles, and for glory to thy people Israel; and a sword will pierce through your own soul also',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Mysteries of Christ\'s Childhood',
    chapter: 'The Presentation in the Temple and The Compassion of Our Lady',
    paragraphsRange: 'Catechism of the Catholic Church 529, 583, 711, 964',
    catechismArticles: [
      {
            "number": 529,
            "title": "The Presentation of Jesus in the Temple Celebrates the Encounter of the Messiah",
            "text": "The presentation of Jesus in the temple shows him to be the firstborn Son who belongs to the Lord. With Simeon and Anna, all Israel's awaiting of its Savior comes to meet him—the Byzantine tradition calls this the Hypapante (\"meeting\"). Jesus is recognized as the long-expected Messiah, the \"light to the Gentiles\" and the \"glory of Israel\", but also \"a sign that is spoken against.\" The sword of sorrow predicted for Mary announces Christ's perfect and unique oblation on the cross that will impart the salvation God had \"prepared in the presence of all peoples.\""
      },
      {
            "number": 964,
            "title": "Mary's Association with Christ's Suffering at the Cross",
            "text": "Mary's role in the Church is inseparable from her union with Christ and flows directly from it. \"This union of the mother with the Son in the work of salvation is made manifest from the time of Christ's virginal conception up to his death\"; it is made manifest above all at the hour of his Passion. Mary suffered grievously with her only-begotten Son, lovingly associating herself with his sacrifice."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Homily on the Feast of the Presentation",
            "citation": "Feb 2, 1997",
            "insight": "Candlemas celebrates the encounter between the ancient hopes of Israel and the Infant Redeemer. Holding candles, we profess that Christ is the Light who dispels the darkness of the world and consecrated life is called to radiate this light."
      }
],
    inBrief: [
      "Lord, now lettest thou thy servant depart in peace, according to thy word; for mine eyes have seen thy salvation (Luke 2:29-30).",
      "The Infant Jesus is offered in the Temple as the spotless Lamb who will offer Himself on Calvary for our redemption.",
      "Our Lady of Sorrows stands united to her Son, whose Passion is prefigured by the sword prophesied by Simeon."
],
    meditationQuestion: 'Do I present my life, my work, and my family completely to God, accepting whatever "swords" of purification He may permit?',
    practicalLiving: 'Light a blessed candle or pray Simeon\'s Canticle (Nunc Dimittis) tonight before going to bed.',
    crossReferences: [
      "Luke 2:22-40",
      "Leviticus 12:1-8",
      "CCC 529",
      "CCC 964"
]
  },
  'luke 2:22':   {
    gospelCitation: 'Luke 2:22-40',
    topicTitle: 'The Presentation of the Lord (Candlemas): Light of Revelation to the Gentiles and The Piercing Sword',
    topicSubtitle: 'A light for revelation to the Gentiles, and for glory to thy people Israel; and a sword will pierce through your own soul also',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Mysteries of Christ\'s Childhood',
    chapter: 'The Presentation in the Temple and The Compassion of Our Lady',
    paragraphsRange: 'Catechism of the Catholic Church 529, 583, 711, 964',
    catechismArticles: [
      {
            "number": 529,
            "title": "The Presentation of Jesus in the Temple Celebrates the Encounter of the Messiah",
            "text": "The presentation of Jesus in the temple shows him to be the firstborn Son who belongs to the Lord. With Simeon and Anna, all Israel's awaiting of its Savior comes to meet him—the Byzantine tradition calls this the Hypapante (\"meeting\"). Jesus is recognized as the long-expected Messiah, the \"light to the Gentiles\" and the \"glory of Israel\", but also \"a sign that is spoken against.\" The sword of sorrow predicted for Mary announces Christ's perfect and unique oblation on the cross that will impart the salvation God had \"prepared in the presence of all peoples.\""
      },
      {
            "number": 964,
            "title": "Mary's Association with Christ's Suffering at the Cross",
            "text": "Mary's role in the Church is inseparable from her union with Christ and flows directly from it. \"This union of the mother with the Son in the work of salvation is made manifest from the time of Christ's virginal conception up to his death\"; it is made manifest above all at the hour of his Passion. Mary suffered grievously with her only-begotten Son, lovingly associating herself with his sacrifice."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Homily on the Feast of the Presentation",
            "citation": "Feb 2, 1997",
            "insight": "Candlemas celebrates the encounter between the ancient hopes of Israel and the Infant Redeemer. Holding candles, we profess that Christ is the Light who dispels the darkness of the world and consecrated life is called to radiate this light."
      }
],
    inBrief: [
      "Lord, now lettest thou thy servant depart in peace, according to thy word; for mine eyes have seen thy salvation (Luke 2:29-30).",
      "The Infant Jesus is offered in the Temple as the spotless Lamb who will offer Himself on Calvary for our redemption.",
      "Our Lady of Sorrows stands united to her Son, whose Passion is prefigured by the sword prophesied by Simeon."
],
    meditationQuestion: 'Do I present my life, my work, and my family completely to God, accepting whatever "swords" of purification He may permit?',
    practicalLiving: 'Light a blessed candle or pray Simeon\'s Canticle (Nunc Dimittis) tonight before going to bed.',
    crossReferences: [
      "Luke 2:22-40",
      "Leviticus 12:1-8",
      "CCC 529",
      "CCC 964"
]
  },
  'matthew 6:1-6':   {
    gospelCitation: 'Matthew 6:1-6, 16-18',
    topicTitle: 'Ash Wednesday & The Three Pillars of Lent: Prayer, Fasting, and Almsgiving in Secret',
    topicSubtitle: 'Your Father who sees in secret will reward you: Interior Penance and Mortification of Heart',
    pillar: '',
    part: 'Part Two: The Sacraments of Faith & Part Three: Life in Christ',
    section: 'Section Two: The Seven Sacraments — Penance',
    chapter: 'The Many Forms of Penance in the Christian Life',
    paragraphsRange: 'Catechism of the Catholic Church 1434, 1438, 1969, 2043',
    catechismArticles: [
      {
            "number": 1434,
            "title": "The Three Primary Forms of Christian Penance",
            "text": "The interior penance of the Christian can be expressed in many and various ways. Scripture and the Fathers insist above all on three forms, fasting, prayer, and almsgiving, which express conversion in relation to oneself, to God, and to others. Alongside the radical purification brought about by Baptism or martyrdom they cite as means of obtaining forgiveness of sins: efforts at reconciliation with one's neighbor, tears of penance, concern for the salvation of one's neighbor, the intercession of the saints, and the practice of charity \"which covers a multitude of sins.\""
      },
      {
            "number": 1438,
            "title": "The Seasons and Days of Penance in the Liturgical Year",
            "text": "The seasons and days of penance in the course of the liturgical year (Lent, and each Friday in memory of the death of the Lord) are intense moments of the Church's penitential practice. These times are particularly appropriate for spiritual exercises, penitential liturgies, pilgrimages as signs of penance, voluntary self-denial such as fasting and almsgiving, and fraternal sharing (charitable and missionary works)."
      },
      {
            "number": 2043,
            "title": "The Precept of the Church on Fasting and Abstinence",
            "text": "The fourth precept of the Church (\"You shall observe the days of fasting and abstinence established by the Church\") ensures the times of ascesis and penance which prepare us for the liturgical feasts and help us acquire mastery over our instincts and freedom of heart."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Benedict XVI",
            "documentTitle": "Lenten Message on Fasting",
            "citation": "Lent 2009",
            "insight": "Fasting is not a mere dietary regimen; it is a spiritual therapy that opens our hearts to God and our brothers. By fasting from food or vanity, we recognize our radical dependence on the Bread of Life."
      }
],
    inBrief: [
      "Beware of practicing your piety before men in order to be seen by them; for then you will have no reward from your Father who is in heaven (Matthew 6:1).",
      "The holy season of Lent is a forty-day retreat of interior renewal through fasting, fervent prayer, and sacrificial almsgiving.",
      "Penance practiced in hidden love purifies the soul and restores deep communion with God."
],
    meditationQuestion: 'What worldly distraction, vanity, or comfort is God asking me to fast from during this holy season?',
    practicalLiving: 'Choose one concrete act of hidden fasting and one silent act of almsgiving today, doing both for God\'s eyes alone.',
    crossReferences: [
      "Matthew 6:1-6, 16-18",
      "Joel 2:12-18",
      "CCC 1434",
      "CCC 1438"
]
  },
  'mt 6:1-6':   {
    gospelCitation: 'Matthew 6:1-6, 16-18',
    topicTitle: 'Ash Wednesday & The Three Pillars of Lent: Prayer, Fasting, and Almsgiving in Secret',
    topicSubtitle: 'Your Father who sees in secret will reward you: Interior Penance and Mortification of Heart',
    pillar: '',
    part: 'Part Two: The Sacraments of Faith & Part Three: Life in Christ',
    section: 'Section Two: The Seven Sacraments — Penance',
    chapter: 'The Many Forms of Penance in the Christian Life',
    paragraphsRange: 'Catechism of the Catholic Church 1434, 1438, 1969, 2043',
    catechismArticles: [
      {
            "number": 1434,
            "title": "The Three Primary Forms of Christian Penance",
            "text": "The interior penance of the Christian can be expressed in many and various ways. Scripture and the Fathers insist above all on three forms, fasting, prayer, and almsgiving, which express conversion in relation to oneself, to God, and to others. Alongside the radical purification brought about by Baptism or martyrdom they cite as means of obtaining forgiveness of sins: efforts at reconciliation with one's neighbor, tears of penance, concern for the salvation of one's neighbor, the intercession of the saints, and the practice of charity \"which covers a multitude of sins.\""
      },
      {
            "number": 1438,
            "title": "The Seasons and Days of Penance in the Liturgical Year",
            "text": "The seasons and days of penance in the course of the liturgical year (Lent, and each Friday in memory of the death of the Lord) are intense moments of the Church's penitential practice. These times are particularly appropriate for spiritual exercises, penitential liturgies, pilgrimages as signs of penance, voluntary self-denial such as fasting and almsgiving, and fraternal sharing (charitable and missionary works)."
      },
      {
            "number": 2043,
            "title": "The Precept of the Church on Fasting and Abstinence",
            "text": "The fourth precept of the Church (\"You shall observe the days of fasting and abstinence established by the Church\") ensures the times of ascesis and penance which prepare us for the liturgical feasts and help us acquire mastery over our instincts and freedom of heart."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Benedict XVI",
            "documentTitle": "Lenten Message on Fasting",
            "citation": "Lent 2009",
            "insight": "Fasting is not a mere dietary regimen; it is a spiritual therapy that opens our hearts to God and our brothers. By fasting from food or vanity, we recognize our radical dependence on the Bread of Life."
      }
],
    inBrief: [
      "Beware of practicing your piety before men in order to be seen by them; for then you will have no reward from your Father who is in heaven (Matthew 6:1).",
      "The holy season of Lent is a forty-day retreat of interior renewal through fasting, fervent prayer, and sacrificial almsgiving.",
      "Penance practiced in hidden love purifies the soul and restores deep communion with God."
],
    meditationQuestion: 'What worldly distraction, vanity, or comfort is God asking me to fast from during this holy season?',
    practicalLiving: 'Choose one concrete act of hidden fasting and one silent act of almsgiving today, doing both for God\'s eyes alone.',
    crossReferences: [
      "Matthew 6:1-6, 16-18",
      "Joel 2:12-18",
      "CCC 1434",
      "CCC 1438"
]
  },
  'matthew 6:1':   {
    gospelCitation: 'Matthew 6:1-6, 16-18',
    topicTitle: 'Ash Wednesday & The Three Pillars of Lent: Prayer, Fasting, and Almsgiving in Secret',
    topicSubtitle: 'Your Father who sees in secret will reward you: Interior Penance and Mortification of Heart',
    pillar: '',
    part: 'Part Two: The Sacraments of Faith & Part Three: Life in Christ',
    section: 'Section Two: The Seven Sacraments — Penance',
    chapter: 'The Many Forms of Penance in the Christian Life',
    paragraphsRange: 'Catechism of the Catholic Church 1434, 1438, 1969, 2043',
    catechismArticles: [
      {
            "number": 1434,
            "title": "The Three Primary Forms of Christian Penance",
            "text": "The interior penance of the Christian can be expressed in many and various ways. Scripture and the Fathers insist above all on three forms, fasting, prayer, and almsgiving, which express conversion in relation to oneself, to God, and to others. Alongside the radical purification brought about by Baptism or martyrdom they cite as means of obtaining forgiveness of sins: efforts at reconciliation with one's neighbor, tears of penance, concern for the salvation of one's neighbor, the intercession of the saints, and the practice of charity \"which covers a multitude of sins.\""
      },
      {
            "number": 1438,
            "title": "The Seasons and Days of Penance in the Liturgical Year",
            "text": "The seasons and days of penance in the course of the liturgical year (Lent, and each Friday in memory of the death of the Lord) are intense moments of the Church's penitential practice. These times are particularly appropriate for spiritual exercises, penitential liturgies, pilgrimages as signs of penance, voluntary self-denial such as fasting and almsgiving, and fraternal sharing (charitable and missionary works)."
      },
      {
            "number": 2043,
            "title": "The Precept of the Church on Fasting and Abstinence",
            "text": "The fourth precept of the Church (\"You shall observe the days of fasting and abstinence established by the Church\") ensures the times of ascesis and penance which prepare us for the liturgical feasts and help us acquire mastery over our instincts and freedom of heart."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Benedict XVI",
            "documentTitle": "Lenten Message on Fasting",
            "citation": "Lent 2009",
            "insight": "Fasting is not a mere dietary regimen; it is a spiritual therapy that opens our hearts to God and our brothers. By fasting from food or vanity, we recognize our radical dependence on the Bread of Life."
      }
],
    inBrief: [
      "Beware of practicing your piety before men in order to be seen by them; for then you will have no reward from your Father who is in heaven (Matthew 6:1).",
      "The holy season of Lent is a forty-day retreat of interior renewal through fasting, fervent prayer, and sacrificial almsgiving.",
      "Penance practiced in hidden love purifies the soul and restores deep communion with God."
],
    meditationQuestion: 'What worldly distraction, vanity, or comfort is God asking me to fast from during this holy season?',
    practicalLiving: 'Choose one concrete act of hidden fasting and one silent act of almsgiving today, doing both for God\'s eyes alone.',
    crossReferences: [
      "Matthew 6:1-6, 16-18",
      "Joel 2:12-18",
      "CCC 1434",
      "CCC 1438"
]
  },
  'ash wednesday':   {
    gospelCitation: 'Matthew 6:1-6, 16-18',
    topicTitle: 'Ash Wednesday & The Three Pillars of Lent: Prayer, Fasting, and Almsgiving in Secret',
    topicSubtitle: 'Your Father who sees in secret will reward you: Interior Penance and Mortification of Heart',
    pillar: '',
    part: 'Part Two: The Sacraments of Faith & Part Three: Life in Christ',
    section: 'Section Two: The Seven Sacraments — Penance',
    chapter: 'The Many Forms of Penance in the Christian Life',
    paragraphsRange: 'Catechism of the Catholic Church 1434, 1438, 1969, 2043',
    catechismArticles: [
      {
            "number": 1434,
            "title": "The Three Primary Forms of Christian Penance",
            "text": "The interior penance of the Christian can be expressed in many and various ways. Scripture and the Fathers insist above all on three forms, fasting, prayer, and almsgiving, which express conversion in relation to oneself, to God, and to others. Alongside the radical purification brought about by Baptism or martyrdom they cite as means of obtaining forgiveness of sins: efforts at reconciliation with one's neighbor, tears of penance, concern for the salvation of one's neighbor, the intercession of the saints, and the practice of charity \"which covers a multitude of sins.\""
      },
      {
            "number": 1438,
            "title": "The Seasons and Days of Penance in the Liturgical Year",
            "text": "The seasons and days of penance in the course of the liturgical year (Lent, and each Friday in memory of the death of the Lord) are intense moments of the Church's penitential practice. These times are particularly appropriate for spiritual exercises, penitential liturgies, pilgrimages as signs of penance, voluntary self-denial such as fasting and almsgiving, and fraternal sharing (charitable and missionary works)."
      },
      {
            "number": 2043,
            "title": "The Precept of the Church on Fasting and Abstinence",
            "text": "The fourth precept of the Church (\"You shall observe the days of fasting and abstinence established by the Church\") ensures the times of ascesis and penance which prepare us for the liturgical feasts and help us acquire mastery over our instincts and freedom of heart."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Benedict XVI",
            "documentTitle": "Lenten Message on Fasting",
            "citation": "Lent 2009",
            "insight": "Fasting is not a mere dietary regimen; it is a spiritual therapy that opens our hearts to God and our brothers. By fasting from food or vanity, we recognize our radical dependence on the Bread of Life."
      }
],
    inBrief: [
      "Beware of practicing your piety before men in order to be seen by them; for then you will have no reward from your Father who is in heaven (Matthew 6:1).",
      "The holy season of Lent is a forty-day retreat of interior renewal through fasting, fervent prayer, and sacrificial almsgiving.",
      "Penance practiced in hidden love purifies the soul and restores deep communion with God."
],
    meditationQuestion: 'What worldly distraction, vanity, or comfort is God asking me to fast from during this holy season?',
    practicalLiving: 'Choose one concrete act of hidden fasting and one silent act of almsgiving today, doing both for God\'s eyes alone.',
    crossReferences: [
      "Matthew 6:1-6, 16-18",
      "Joel 2:12-18",
      "CCC 1434",
      "CCC 1438"
]
  },
  'luke 15:11-32':   {
    gospelCitation: 'Luke 15:11-32',
    topicTitle: 'The Parable of the Prodigal Son: The Merciful Father and The Sacrament of Penance',
    topicSubtitle: 'This my son was dead, and is alive again; he was lost, and is found: The Ineffable Joy of Forgiveness',
    pillar: '',
    part: 'Part Two: The Celebration of the Christian Mystery',
    section: 'Section Two: The Seven Sacraments',
    chapter: 'The Sacrament of Penance and Reconciliation — The Call to Return to the Father',
    paragraphsRange: 'Catechism of the Catholic Church 1423, 1439, 1468, 2839',
    catechismArticles: [
      {
            "number": 1423,
            "title": "The Sacrament of Conversion, Penance, Confession, and Forgiveness",
            "text": "It is called the sacrament of conversion because it makes sacramentally present Jesus' call to conversion, the first step in returning to the Father from whom one has strayed by sin. It is called the sacrament of Penance, since it consecrates the Christian sinner's personal and ecclesial steps of conversion, penance, and satisfaction."
      },
      {
            "number": 1439,
            "title": "The Parable of the Prodigal Son as the Definitive Icon of Conversion",
            "text": "The process of conversion and repentance was described by Jesus in the parable of the prodigal son, the center of which is the merciful father: the fascination of illusory freedom, the abandonment of the father's house; the extreme misery in which the son finds himself after squandering his fortune; his deep humiliation at finding himself obliged to feed swine; his reflection on all he has lost; his repentance and his resolution to declare himself guilty before his father; the journey back; the father's generous welcome; the father's joy—all these are characteristics of the process of conversion. The beautiful robe, the ring, and the festive banquet are symbols of that new life."
      },
      {
            "number": 1468,
            "title": "The Restoration of Dignity in the Friendship of God",
            "text": "The whole power of the sacrament of Penance consists in restoring us to God's grace and joining us with him in an intimate friendship. Reconciliation with God brings about a true \"spiritual resurrection\", restoration of the dignity and blessings of the life of the children of God, of which the most precious is friendship with God."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Post-Synodal Apostolic Exhortation Reconciliatio et Paenitentia",
            "citation": "RP 5-6",
            "insight": "The parable of the prodigal son is the drama of every human heart. In the arms of the merciful Father, we discover that God's love is infinitely greater than our sins, capable of transforming our deepest misery into radiant sonship."
      }
],
    inBrief: [
      "I will arise and go to my father, and I will say to him, \"Father, I have sinned against heaven and before you\" (Luke 15:18).",
      "The Father does not wait for an exhaustive legal defense; seeing the son while still far off, He runs to embrace him.",
      "Sacramental Confession is the Catholic home where the wounded prodigal is washed, clothed with grace, and restored to the table."
],
    meditationQuestion: 'Do I ever hesitate to return to Confession out of shame, forgetting that God\'s greatest joy is to pardon and embrace me?',
    practicalLiving: 'Make an Act of Contrition right now from the bottom of your heart, thanking God for His infinite and tender mercy.',
    crossReferences: [
      "Luke 15:11-32",
      "Psalm 51:1-12",
      "CCC 1439",
      "CCC 1468"
]
  },
  'lk 15:11-32':   {
    gospelCitation: 'Luke 15:11-32',
    topicTitle: 'The Parable of the Prodigal Son: The Merciful Father and The Sacrament of Penance',
    topicSubtitle: 'This my son was dead, and is alive again; he was lost, and is found: The Ineffable Joy of Forgiveness',
    pillar: '',
    part: 'Part Two: The Celebration of the Christian Mystery',
    section: 'Section Two: The Seven Sacraments',
    chapter: 'The Sacrament of Penance and Reconciliation — The Call to Return to the Father',
    paragraphsRange: 'Catechism of the Catholic Church 1423, 1439, 1468, 2839',
    catechismArticles: [
      {
            "number": 1423,
            "title": "The Sacrament of Conversion, Penance, Confession, and Forgiveness",
            "text": "It is called the sacrament of conversion because it makes sacramentally present Jesus' call to conversion, the first step in returning to the Father from whom one has strayed by sin. It is called the sacrament of Penance, since it consecrates the Christian sinner's personal and ecclesial steps of conversion, penance, and satisfaction."
      },
      {
            "number": 1439,
            "title": "The Parable of the Prodigal Son as the Definitive Icon of Conversion",
            "text": "The process of conversion and repentance was described by Jesus in the parable of the prodigal son, the center of which is the merciful father: the fascination of illusory freedom, the abandonment of the father's house; the extreme misery in which the son finds himself after squandering his fortune; his deep humiliation at finding himself obliged to feed swine; his reflection on all he has lost; his repentance and his resolution to declare himself guilty before his father; the journey back; the father's generous welcome; the father's joy—all these are characteristics of the process of conversion. The beautiful robe, the ring, and the festive banquet are symbols of that new life."
      },
      {
            "number": 1468,
            "title": "The Restoration of Dignity in the Friendship of God",
            "text": "The whole power of the sacrament of Penance consists in restoring us to God's grace and joining us with him in an intimate friendship. Reconciliation with God brings about a true \"spiritual resurrection\", restoration of the dignity and blessings of the life of the children of God, of which the most precious is friendship with God."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Post-Synodal Apostolic Exhortation Reconciliatio et Paenitentia",
            "citation": "RP 5-6",
            "insight": "The parable of the prodigal son is the drama of every human heart. In the arms of the merciful Father, we discover that God's love is infinitely greater than our sins, capable of transforming our deepest misery into radiant sonship."
      }
],
    inBrief: [
      "I will arise and go to my father, and I will say to him, \"Father, I have sinned against heaven and before you\" (Luke 15:18).",
      "The Father does not wait for an exhaustive legal defense; seeing the son while still far off, He runs to embrace him.",
      "Sacramental Confession is the Catholic home where the wounded prodigal is washed, clothed with grace, and restored to the table."
],
    meditationQuestion: 'Do I ever hesitate to return to Confession out of shame, forgetting that God\'s greatest joy is to pardon and embrace me?',
    practicalLiving: 'Make an Act of Contrition right now from the bottom of your heart, thanking God for His infinite and tender mercy.',
    crossReferences: [
      "Luke 15:11-32",
      "Psalm 51:1-12",
      "CCC 1439",
      "CCC 1468"
]
  },
  'luke 15:11':   {
    gospelCitation: 'Luke 15:11-32',
    topicTitle: 'The Parable of the Prodigal Son: The Merciful Father and The Sacrament of Penance',
    topicSubtitle: 'This my son was dead, and is alive again; he was lost, and is found: The Ineffable Joy of Forgiveness',
    pillar: '',
    part: 'Part Two: The Celebration of the Christian Mystery',
    section: 'Section Two: The Seven Sacraments',
    chapter: 'The Sacrament of Penance and Reconciliation — The Call to Return to the Father',
    paragraphsRange: 'Catechism of the Catholic Church 1423, 1439, 1468, 2839',
    catechismArticles: [
      {
            "number": 1423,
            "title": "The Sacrament of Conversion, Penance, Confession, and Forgiveness",
            "text": "It is called the sacrament of conversion because it makes sacramentally present Jesus' call to conversion, the first step in returning to the Father from whom one has strayed by sin. It is called the sacrament of Penance, since it consecrates the Christian sinner's personal and ecclesial steps of conversion, penance, and satisfaction."
      },
      {
            "number": 1439,
            "title": "The Parable of the Prodigal Son as the Definitive Icon of Conversion",
            "text": "The process of conversion and repentance was described by Jesus in the parable of the prodigal son, the center of which is the merciful father: the fascination of illusory freedom, the abandonment of the father's house; the extreme misery in which the son finds himself after squandering his fortune; his deep humiliation at finding himself obliged to feed swine; his reflection on all he has lost; his repentance and his resolution to declare himself guilty before his father; the journey back; the father's generous welcome; the father's joy—all these are characteristics of the process of conversion. The beautiful robe, the ring, and the festive banquet are symbols of that new life."
      },
      {
            "number": 1468,
            "title": "The Restoration of Dignity in the Friendship of God",
            "text": "The whole power of the sacrament of Penance consists in restoring us to God's grace and joining us with him in an intimate friendship. Reconciliation with God brings about a true \"spiritual resurrection\", restoration of the dignity and blessings of the life of the children of God, of which the most precious is friendship with God."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Post-Synodal Apostolic Exhortation Reconciliatio et Paenitentia",
            "citation": "RP 5-6",
            "insight": "The parable of the prodigal son is the drama of every human heart. In the arms of the merciful Father, we discover that God's love is infinitely greater than our sins, capable of transforming our deepest misery into radiant sonship."
      }
],
    inBrief: [
      "I will arise and go to my father, and I will say to him, \"Father, I have sinned against heaven and before you\" (Luke 15:18).",
      "The Father does not wait for an exhaustive legal defense; seeing the son while still far off, He runs to embrace him.",
      "Sacramental Confession is the Catholic home where the wounded prodigal is washed, clothed with grace, and restored to the table."
],
    meditationQuestion: 'Do I ever hesitate to return to Confession out of shame, forgetting that God\'s greatest joy is to pardon and embrace me?',
    practicalLiving: 'Make an Act of Contrition right now from the bottom of your heart, thanking God for His infinite and tender mercy.',
    crossReferences: [
      "Luke 15:11-32",
      "Psalm 51:1-12",
      "CCC 1439",
      "CCC 1468"
]
  },
  'prodigal son':   {
    gospelCitation: 'Luke 15:11-32',
    topicTitle: 'The Parable of the Prodigal Son: The Merciful Father and The Sacrament of Penance',
    topicSubtitle: 'This my son was dead, and is alive again; he was lost, and is found: The Ineffable Joy of Forgiveness',
    pillar: '',
    part: 'Part Two: The Celebration of the Christian Mystery',
    section: 'Section Two: The Seven Sacraments',
    chapter: 'The Sacrament of Penance and Reconciliation — The Call to Return to the Father',
    paragraphsRange: 'Catechism of the Catholic Church 1423, 1439, 1468, 2839',
    catechismArticles: [
      {
            "number": 1423,
            "title": "The Sacrament of Conversion, Penance, Confession, and Forgiveness",
            "text": "It is called the sacrament of conversion because it makes sacramentally present Jesus' call to conversion, the first step in returning to the Father from whom one has strayed by sin. It is called the sacrament of Penance, since it consecrates the Christian sinner's personal and ecclesial steps of conversion, penance, and satisfaction."
      },
      {
            "number": 1439,
            "title": "The Parable of the Prodigal Son as the Definitive Icon of Conversion",
            "text": "The process of conversion and repentance was described by Jesus in the parable of the prodigal son, the center of which is the merciful father: the fascination of illusory freedom, the abandonment of the father's house; the extreme misery in which the son finds himself after squandering his fortune; his deep humiliation at finding himself obliged to feed swine; his reflection on all he has lost; his repentance and his resolution to declare himself guilty before his father; the journey back; the father's generous welcome; the father's joy—all these are characteristics of the process of conversion. The beautiful robe, the ring, and the festive banquet are symbols of that new life."
      },
      {
            "number": 1468,
            "title": "The Restoration of Dignity in the Friendship of God",
            "text": "The whole power of the sacrament of Penance consists in restoring us to God's grace and joining us with him in an intimate friendship. Reconciliation with God brings about a true \"spiritual resurrection\", restoration of the dignity and blessings of the life of the children of God, of which the most precious is friendship with God."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Post-Synodal Apostolic Exhortation Reconciliatio et Paenitentia",
            "citation": "RP 5-6",
            "insight": "The parable of the prodigal son is the drama of every human heart. In the arms of the merciful Father, we discover that God's love is infinitely greater than our sins, capable of transforming our deepest misery into radiant sonship."
      }
],
    inBrief: [
      "I will arise and go to my father, and I will say to him, \"Father, I have sinned against heaven and before you\" (Luke 15:18).",
      "The Father does not wait for an exhaustive legal defense; seeing the son while still far off, He runs to embrace him.",
      "Sacramental Confession is the Catholic home where the wounded prodigal is washed, clothed with grace, and restored to the table."
],
    meditationQuestion: 'Do I ever hesitate to return to Confession out of shame, forgetting that God\'s greatest joy is to pardon and embrace me?',
    practicalLiving: 'Make an Act of Contrition right now from the bottom of your heart, thanking God for His infinite and tender mercy.',
    crossReferences: [
      "Luke 15:11-32",
      "Psalm 51:1-12",
      "CCC 1439",
      "CCC 1468"
]
  },
  'john 8:1-11':   {
    gospelCitation: 'John 8:1-11',
    topicTitle: 'The Woman Caught in Adultery: "Neither Do I Condemn You; Go and Sin No More"',
    topicSubtitle: 'He who is without sin among you, let him cast the first stone: Misery Meets Mercy',
    pillar: '',
    part: 'Part Three: Life in Christ & Part Four: Christian Prayer',
    section: 'Section One: Man\'s Vocation & The Lord\'s Prayer',
    chapter: 'The Splendor of Truth and Mercy: "Forgive Us Our Trespasses"',
    paragraphsRange: 'Catechism of the Catholic Church 1846, 1850, 2842, 2843',
    catechismArticles: [
      {
            "number": 1846,
            "title": "The Gospel is the Revelation of God's Mercy to Sinners",
            "text": "The Gospel is the revelation in Jesus Christ of God's mercy to sinners. The angel announced to Joseph: \"You shall call his name Jesus, for he will save his people from their sins.\" The same is true of the Eucharist, the sacrament of redemption: \"This is my blood of the covenant, which is poured out for many for the forgiveness of sins.\""
      },
      {
            "number": 1850,
            "title": "Sin is an Offense Against God and Rejection of Love",
            "text": "Sin is an offense against God: \"Against you, you alone, have I sinned, and done that which is evil in your sight.\" Sin sets itself against God's love for us and turns our hearts away from it. Like the first sin, it is disobedience, a revolt against God through the will to become \"like gods,\" knowing and determining good and evil."
      },
      {
            "number": 2842,
            "title": "As We Forgive Those Who Trespass Against Us",
            "text": "This \"as\" is not unique in Jesus' teaching: \"Be perfect, as your heavenly Father is perfect\"; \"Be merciful, even as your Father is merciful\"; \"A new commandment I give to you, that you love one another; even as I have loved you, that you also love one another.\" It is impossible to keep the Lord's commandment by imitating the divine model from outside; there has to be a vital participation, coming from the depths of the heart, in the holiness and the mercy and the love of our God."
      }
],
    magisterialInputs: [
      {
            "authority": "St. Augustine of Hippo",
            "documentTitle": "Tractates on the Gospel of John",
            "citation": "Tractate 33, 5",
            "insight": "All departed, until two were left behind alone: the miserable woman and Divine Mercy (\"Relicta sunt duo: misera et misericordia\"). The Lord said to her, \"Has no one condemned thee? Neither do I condemn thee; go, and sin no more.\""
      }
],
    inBrief: [
      "Let him who is without sin among you be the first to throw a stone at her... Neither do I condemn you; go, and do not sin again (John 8:7, 11).",
      "Christ exposes the hypocrisy of self-righteous judgment while upholding the unalterable sanctity of God's moral law.",
      "Mercy does not condone sin; it forgives the past and imparts divine power to walk in newness of life."
],
    meditationQuestion: 'Do I hold stones of criticism and harsh judgment against others while ignoring my own need for God\'s absolution?',
    practicalLiving: 'Drop every critical thought or gossip about another person today, praying instead for their sanctification.',
    crossReferences: [
      "John 8:1-11",
      "Romans 2:1-4",
      "CCC 1846",
      "CCC 2843"
]
  },
  'jn 8:1-11':   {
    gospelCitation: 'John 8:1-11',
    topicTitle: 'The Woman Caught in Adultery: "Neither Do I Condemn You; Go and Sin No More"',
    topicSubtitle: 'He who is without sin among you, let him cast the first stone: Misery Meets Mercy',
    pillar: '',
    part: 'Part Three: Life in Christ & Part Four: Christian Prayer',
    section: 'Section One: Man\'s Vocation & The Lord\'s Prayer',
    chapter: 'The Splendor of Truth and Mercy: "Forgive Us Our Trespasses"',
    paragraphsRange: 'Catechism of the Catholic Church 1846, 1850, 2842, 2843',
    catechismArticles: [
      {
            "number": 1846,
            "title": "The Gospel is the Revelation of God's Mercy to Sinners",
            "text": "The Gospel is the revelation in Jesus Christ of God's mercy to sinners. The angel announced to Joseph: \"You shall call his name Jesus, for he will save his people from their sins.\" The same is true of the Eucharist, the sacrament of redemption: \"This is my blood of the covenant, which is poured out for many for the forgiveness of sins.\""
      },
      {
            "number": 1850,
            "title": "Sin is an Offense Against God and Rejection of Love",
            "text": "Sin is an offense against God: \"Against you, you alone, have I sinned, and done that which is evil in your sight.\" Sin sets itself against God's love for us and turns our hearts away from it. Like the first sin, it is disobedience, a revolt against God through the will to become \"like gods,\" knowing and determining good and evil."
      },
      {
            "number": 2842,
            "title": "As We Forgive Those Who Trespass Against Us",
            "text": "This \"as\" is not unique in Jesus' teaching: \"Be perfect, as your heavenly Father is perfect\"; \"Be merciful, even as your Father is merciful\"; \"A new commandment I give to you, that you love one another; even as I have loved you, that you also love one another.\" It is impossible to keep the Lord's commandment by imitating the divine model from outside; there has to be a vital participation, coming from the depths of the heart, in the holiness and the mercy and the love of our God."
      }
],
    magisterialInputs: [
      {
            "authority": "St. Augustine of Hippo",
            "documentTitle": "Tractates on the Gospel of John",
            "citation": "Tractate 33, 5",
            "insight": "All departed, until two were left behind alone: the miserable woman and Divine Mercy (\"Relicta sunt duo: misera et misericordia\"). The Lord said to her, \"Has no one condemned thee? Neither do I condemn thee; go, and sin no more.\""
      }
],
    inBrief: [
      "Let him who is without sin among you be the first to throw a stone at her... Neither do I condemn you; go, and do not sin again (John 8:7, 11).",
      "Christ exposes the hypocrisy of self-righteous judgment while upholding the unalterable sanctity of God's moral law.",
      "Mercy does not condone sin; it forgives the past and imparts divine power to walk in newness of life."
],
    meditationQuestion: 'Do I hold stones of criticism and harsh judgment against others while ignoring my own need for God\'s absolution?',
    practicalLiving: 'Drop every critical thought or gossip about another person today, praying instead for their sanctification.',
    crossReferences: [
      "John 8:1-11",
      "Romans 2:1-4",
      "CCC 1846",
      "CCC 2843"
]
  },
  'john 8:1':   {
    gospelCitation: 'John 8:1-11',
    topicTitle: 'The Woman Caught in Adultery: "Neither Do I Condemn You; Go and Sin No More"',
    topicSubtitle: 'He who is without sin among you, let him cast the first stone: Misery Meets Mercy',
    pillar: '',
    part: 'Part Three: Life in Christ & Part Four: Christian Prayer',
    section: 'Section One: Man\'s Vocation & The Lord\'s Prayer',
    chapter: 'The Splendor of Truth and Mercy: "Forgive Us Our Trespasses"',
    paragraphsRange: 'Catechism of the Catholic Church 1846, 1850, 2842, 2843',
    catechismArticles: [
      {
            "number": 1846,
            "title": "The Gospel is the Revelation of God's Mercy to Sinners",
            "text": "The Gospel is the revelation in Jesus Christ of God's mercy to sinners. The angel announced to Joseph: \"You shall call his name Jesus, for he will save his people from their sins.\" The same is true of the Eucharist, the sacrament of redemption: \"This is my blood of the covenant, which is poured out for many for the forgiveness of sins.\""
      },
      {
            "number": 1850,
            "title": "Sin is an Offense Against God and Rejection of Love",
            "text": "Sin is an offense against God: \"Against you, you alone, have I sinned, and done that which is evil in your sight.\" Sin sets itself against God's love for us and turns our hearts away from it. Like the first sin, it is disobedience, a revolt against God through the will to become \"like gods,\" knowing and determining good and evil."
      },
      {
            "number": 2842,
            "title": "As We Forgive Those Who Trespass Against Us",
            "text": "This \"as\" is not unique in Jesus' teaching: \"Be perfect, as your heavenly Father is perfect\"; \"Be merciful, even as your Father is merciful\"; \"A new commandment I give to you, that you love one another; even as I have loved you, that you also love one another.\" It is impossible to keep the Lord's commandment by imitating the divine model from outside; there has to be a vital participation, coming from the depths of the heart, in the holiness and the mercy and the love of our God."
      }
],
    magisterialInputs: [
      {
            "authority": "St. Augustine of Hippo",
            "documentTitle": "Tractates on the Gospel of John",
            "citation": "Tractate 33, 5",
            "insight": "All departed, until two were left behind alone: the miserable woman and Divine Mercy (\"Relicta sunt duo: misera et misericordia\"). The Lord said to her, \"Has no one condemned thee? Neither do I condemn thee; go, and sin no more.\""
      }
],
    inBrief: [
      "Let him who is without sin among you be the first to throw a stone at her... Neither do I condemn you; go, and do not sin again (John 8:7, 11).",
      "Christ exposes the hypocrisy of self-righteous judgment while upholding the unalterable sanctity of God's moral law.",
      "Mercy does not condone sin; it forgives the past and imparts divine power to walk in newness of life."
],
    meditationQuestion: 'Do I hold stones of criticism and harsh judgment against others while ignoring my own need for God\'s absolution?',
    practicalLiving: 'Drop every critical thought or gossip about another person today, praying instead for their sanctification.',
    crossReferences: [
      "John 8:1-11",
      "Romans 2:1-4",
      "CCC 1846",
      "CCC 2843"
]
  },
  'matthew 6:7-15':   {
    gospelCitation: 'Matthew 6:7-15',
    topicTitle: 'The Lord\'s Prayer: The Summary of the Whole Gospel & The Seven Petitions',
    topicSubtitle: 'Pray then like this: Our Father who art in heaven, hallowed be thy name',
    pillar: '',
    part: 'Part Four: Christian Prayer',
    section: 'Section Two: The Lord\'s Prayer — "Our Father!"',
    chapter: 'The Summary of the Whole Gospel and The Seven Holy Petitions',
    paragraphsRange: 'Catechism of the Catholic Church 2759, 2761, 2765, 2777',
    catechismArticles: [
      {
            "number": 2759,
            "title": "Jesus Teaches His Disciples How to Pray as Children of God",
            "text": "Jesus \"was praying in a certain place, and when he ceased, one of his disciples said to him, 'Lord, teach us to pray, as John taught his disciples.'\" In response to this request the Lord entrusts to his disciples and to his Church the fundamental Christian prayer. St. Luke presents a brief text of five petitions, while St. Matthew gives a more developed version of seven petitions. The liturgical tradition of the Church has retained St. Matthew's text."
      },
      {
            "number": 2761,
            "title": "The Lord's Prayer as the Summary of the Whole Gospel",
            "text": "The Lord's Prayer \"is truly the summary of the whole Gospel.\" \"Since the Lord... after handing over the practice of prayer, said elsewhere, 'Ask and it will be given you,' each of us can make other prayers corresponding to his specific needs, but always beginning with the Lord's Prayer which remains the fundamental prayer.\""
      },
      {
            "number": 2777,
            "title": "At the Savior's Command and Formed by Divine Teaching, We Dare to Say",
            "text": "In the Roman liturgy, the Eucharistic community is invited to pray to our heavenly Father with filial boldness: the German text says \"im Vertrauen auf Gottes Wort wagen wir zu sprechen\"; the Roman rite says \"audemus dicere\" (\"we dare to say\"). Before our Lord taught us to say \"Our Father,\" none of the prayers of the Old Testament dared to address God with such intimate filial audacity."
      }
],
    magisterialInputs: [
      {
            "authority": "Tertullian",
            "documentTitle": "De Oratione (On Prayer)",
            "citation": "Ch. 1",
            "insight": "The Lord's Prayer contains not only the praise of God and the petition of man, but the whole scope of Christian life. It is the breviary of the entire Gospel."
      }
],
    inBrief: [
      "Our Father who art in heaven, hallowed be thy name. Thy kingdom come. Thy will be done on earth as it is in heaven (Matthew 6:9-10).",
      "The Lord's Prayer contains seven petitions: the first three draw us toward the glory of the Father, and the last four commend our needs to His grace.",
      "Filial trust and mutual forgiveness are the twin doors through which the peace of the Lord's Prayer enters the soul."
],
    meditationQuestion: 'When I pray the Our Father, am I truly willing for God\'s holy will to be done in my life, even when it crosses my plans?',
    practicalLiving: 'Pray one Our Father very slowly today, lingering on each petition for ten seconds of contemplative devotion.',
    crossReferences: [
      "Matthew 6:7-15",
      "Luke 11:1-4",
      "CCC 2761",
      "CCC 2777"
]
  },
  'mt 6:7-15':   {
    gospelCitation: 'Matthew 6:7-15',
    topicTitle: 'The Lord\'s Prayer: The Summary of the Whole Gospel & The Seven Petitions',
    topicSubtitle: 'Pray then like this: Our Father who art in heaven, hallowed be thy name',
    pillar: '',
    part: 'Part Four: Christian Prayer',
    section: 'Section Two: The Lord\'s Prayer — "Our Father!"',
    chapter: 'The Summary of the Whole Gospel and The Seven Holy Petitions',
    paragraphsRange: 'Catechism of the Catholic Church 2759, 2761, 2765, 2777',
    catechismArticles: [
      {
            "number": 2759,
            "title": "Jesus Teaches His Disciples How to Pray as Children of God",
            "text": "Jesus \"was praying in a certain place, and when he ceased, one of his disciples said to him, 'Lord, teach us to pray, as John taught his disciples.'\" In response to this request the Lord entrusts to his disciples and to his Church the fundamental Christian prayer. St. Luke presents a brief text of five petitions, while St. Matthew gives a more developed version of seven petitions. The liturgical tradition of the Church has retained St. Matthew's text."
      },
      {
            "number": 2761,
            "title": "The Lord's Prayer as the Summary of the Whole Gospel",
            "text": "The Lord's Prayer \"is truly the summary of the whole Gospel.\" \"Since the Lord... after handing over the practice of prayer, said elsewhere, 'Ask and it will be given you,' each of us can make other prayers corresponding to his specific needs, but always beginning with the Lord's Prayer which remains the fundamental prayer.\""
      },
      {
            "number": 2777,
            "title": "At the Savior's Command and Formed by Divine Teaching, We Dare to Say",
            "text": "In the Roman liturgy, the Eucharistic community is invited to pray to our heavenly Father with filial boldness: the German text says \"im Vertrauen auf Gottes Wort wagen wir zu sprechen\"; the Roman rite says \"audemus dicere\" (\"we dare to say\"). Before our Lord taught us to say \"Our Father,\" none of the prayers of the Old Testament dared to address God with such intimate filial audacity."
      }
],
    magisterialInputs: [
      {
            "authority": "Tertullian",
            "documentTitle": "De Oratione (On Prayer)",
            "citation": "Ch. 1",
            "insight": "The Lord's Prayer contains not only the praise of God and the petition of man, but the whole scope of Christian life. It is the breviary of the entire Gospel."
      }
],
    inBrief: [
      "Our Father who art in heaven, hallowed be thy name. Thy kingdom come. Thy will be done on earth as it is in heaven (Matthew 6:9-10).",
      "The Lord's Prayer contains seven petitions: the first three draw us toward the glory of the Father, and the last four commend our needs to His grace.",
      "Filial trust and mutual forgiveness are the twin doors through which the peace of the Lord's Prayer enters the soul."
],
    meditationQuestion: 'When I pray the Our Father, am I truly willing for God\'s holy will to be done in my life, even when it crosses my plans?',
    practicalLiving: 'Pray one Our Father very slowly today, lingering on each petition for ten seconds of contemplative devotion.',
    crossReferences: [
      "Matthew 6:7-15",
      "Luke 11:1-4",
      "CCC 2761",
      "CCC 2777"
]
  },
  'matthew 6:7':   {
    gospelCitation: 'Matthew 6:7-15',
    topicTitle: 'The Lord\'s Prayer: The Summary of the Whole Gospel & The Seven Petitions',
    topicSubtitle: 'Pray then like this: Our Father who art in heaven, hallowed be thy name',
    pillar: '',
    part: 'Part Four: Christian Prayer',
    section: 'Section Two: The Lord\'s Prayer — "Our Father!"',
    chapter: 'The Summary of the Whole Gospel and The Seven Holy Petitions',
    paragraphsRange: 'Catechism of the Catholic Church 2759, 2761, 2765, 2777',
    catechismArticles: [
      {
            "number": 2759,
            "title": "Jesus Teaches His Disciples How to Pray as Children of God",
            "text": "Jesus \"was praying in a certain place, and when he ceased, one of his disciples said to him, 'Lord, teach us to pray, as John taught his disciples.'\" In response to this request the Lord entrusts to his disciples and to his Church the fundamental Christian prayer. St. Luke presents a brief text of five petitions, while St. Matthew gives a more developed version of seven petitions. The liturgical tradition of the Church has retained St. Matthew's text."
      },
      {
            "number": 2761,
            "title": "The Lord's Prayer as the Summary of the Whole Gospel",
            "text": "The Lord's Prayer \"is truly the summary of the whole Gospel.\" \"Since the Lord... after handing over the practice of prayer, said elsewhere, 'Ask and it will be given you,' each of us can make other prayers corresponding to his specific needs, but always beginning with the Lord's Prayer which remains the fundamental prayer.\""
      },
      {
            "number": 2777,
            "title": "At the Savior's Command and Formed by Divine Teaching, We Dare to Say",
            "text": "In the Roman liturgy, the Eucharistic community is invited to pray to our heavenly Father with filial boldness: the German text says \"im Vertrauen auf Gottes Wort wagen wir zu sprechen\"; the Roman rite says \"audemus dicere\" (\"we dare to say\"). Before our Lord taught us to say \"Our Father,\" none of the prayers of the Old Testament dared to address God with such intimate filial audacity."
      }
],
    magisterialInputs: [
      {
            "authority": "Tertullian",
            "documentTitle": "De Oratione (On Prayer)",
            "citation": "Ch. 1",
            "insight": "The Lord's Prayer contains not only the praise of God and the petition of man, but the whole scope of Christian life. It is the breviary of the entire Gospel."
      }
],
    inBrief: [
      "Our Father who art in heaven, hallowed be thy name. Thy kingdom come. Thy will be done on earth as it is in heaven (Matthew 6:9-10).",
      "The Lord's Prayer contains seven petitions: the first three draw us toward the glory of the Father, and the last four commend our needs to His grace.",
      "Filial trust and mutual forgiveness are the twin doors through which the peace of the Lord's Prayer enters the soul."
],
    meditationQuestion: 'When I pray the Our Father, am I truly willing for God\'s holy will to be done in my life, even when it crosses my plans?',
    practicalLiving: 'Pray one Our Father very slowly today, lingering on each petition for ten seconds of contemplative devotion.',
    crossReferences: [
      "Matthew 6:7-15",
      "Luke 11:1-4",
      "CCC 2761",
      "CCC 2777"
]
  },
  'lords prayer':   {
    gospelCitation: 'Matthew 6:7-15',
    topicTitle: 'The Lord\'s Prayer: The Summary of the Whole Gospel & The Seven Petitions',
    topicSubtitle: 'Pray then like this: Our Father who art in heaven, hallowed be thy name',
    pillar: '',
    part: 'Part Four: Christian Prayer',
    section: 'Section Two: The Lord\'s Prayer — "Our Father!"',
    chapter: 'The Summary of the Whole Gospel and The Seven Holy Petitions',
    paragraphsRange: 'Catechism of the Catholic Church 2759, 2761, 2765, 2777',
    catechismArticles: [
      {
            "number": 2759,
            "title": "Jesus Teaches His Disciples How to Pray as Children of God",
            "text": "Jesus \"was praying in a certain place, and when he ceased, one of his disciples said to him, 'Lord, teach us to pray, as John taught his disciples.'\" In response to this request the Lord entrusts to his disciples and to his Church the fundamental Christian prayer. St. Luke presents a brief text of five petitions, while St. Matthew gives a more developed version of seven petitions. The liturgical tradition of the Church has retained St. Matthew's text."
      },
      {
            "number": 2761,
            "title": "The Lord's Prayer as the Summary of the Whole Gospel",
            "text": "The Lord's Prayer \"is truly the summary of the whole Gospel.\" \"Since the Lord... after handing over the practice of prayer, said elsewhere, 'Ask and it will be given you,' each of us can make other prayers corresponding to his specific needs, but always beginning with the Lord's Prayer which remains the fundamental prayer.\""
      },
      {
            "number": 2777,
            "title": "At the Savior's Command and Formed by Divine Teaching, We Dare to Say",
            "text": "In the Roman liturgy, the Eucharistic community is invited to pray to our heavenly Father with filial boldness: the German text says \"im Vertrauen auf Gottes Wort wagen wir zu sprechen\"; the Roman rite says \"audemus dicere\" (\"we dare to say\"). Before our Lord taught us to say \"Our Father,\" none of the prayers of the Old Testament dared to address God with such intimate filial audacity."
      }
],
    magisterialInputs: [
      {
            "authority": "Tertullian",
            "documentTitle": "De Oratione (On Prayer)",
            "citation": "Ch. 1",
            "insight": "The Lord's Prayer contains not only the praise of God and the petition of man, but the whole scope of Christian life. It is the breviary of the entire Gospel."
      }
],
    inBrief: [
      "Our Father who art in heaven, hallowed be thy name. Thy kingdom come. Thy will be done on earth as it is in heaven (Matthew 6:9-10).",
      "The Lord's Prayer contains seven petitions: the first three draw us toward the glory of the Father, and the last four commend our needs to His grace.",
      "Filial trust and mutual forgiveness are the twin doors through which the peace of the Lord's Prayer enters the soul."
],
    meditationQuestion: 'When I pray the Our Father, am I truly willing for God\'s holy will to be done in my life, even when it crosses my plans?',
    practicalLiving: 'Pray one Our Father very slowly today, lingering on each petition for ten seconds of contemplative devotion.',
    crossReferences: [
      "Matthew 6:7-15",
      "Luke 11:1-4",
      "CCC 2761",
      "CCC 2777"
]
  },
  'matthew 1:16':   {
    gospelCitation: 'Matthew 1:16, 18-21, 24a',
    topicTitle: 'The Solemnity of St. Joseph, Spouse of the Blessed Virgin: The Just Man and Guardian of the Redeemer',
    topicSubtitle: 'Joseph, son of David, do not fear to take Mary your wife: Silent Fidelity and Fatherly Protection',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Virgin Conception',
    chapter: 'The Virginal Conception of Jesus and The Role of St. Joseph',
    paragraphsRange: 'Catechism of the Catholic Church 437, 497, 532, 1014',
    catechismArticles: [
      {
            "number": 437,
            "title": "To Joseph, the Angel Announced the Birth of the Son of David",
            "text": "To the shepherds, the angel announced the birth of Jesus as the Messiah promised to Israel: \"To you is born this day in the city of David a Savior, who is Christ the Lord.\" From the beginning he was \"the one whom the Father consecrated and sent into the world\", conceived as \"holy\" in Mary's virginal womb. God called Joseph to \"take Mary as your wife, for that which is conceived in her is of the Holy Spirit\", so that Jesus, \"who is called Christ\", should be born of David's line."
      },
      {
            "number": 497,
            "title": "The Gospel Accounts Understand the Virginal Conception as a Divine Work",
            "text": "The Gospel accounts understand the virginal conception of Jesus as a divine work that surpasses all human understanding and possibility: \"That which is conceived in her is of the Holy Spirit\", said the angel to Joseph about Mary, his betrothed. The Church sees here the fulfillment of the divine promise given through the prophet Isaiah: \"Behold, a virgin shall conceive and bear a son.\""
      },
      {
            "number": 1014,
            "title": "St. Joseph, Patron of a Happy Death and Protector of the Church",
            "text": "The Church encourages us to prepare ourselves for the hour of our death (\"From a sudden and unprovided death, deliver us, O Lord\"), to ask the Mother of God to intercede for us \"at the hour of our death\" in the Hail Mary, and to entrust ourselves to St. Joseph, the patron of a happy death."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Apostolic Exhortation Redemptoris Custos (Guardian of the Redeemer)",
            "citation": "RC 1",
            "insight": "Just as St. Joseph took loving care of Mary and gladly dedicated himself to Jesus Christ's upbringing, he likewise watches over and protects Christ's Mystical Body, that is, the Church."
      }
],
    inBrief: [
      "When Joseph woke from sleep, he did as the angel of the Lord commanded him; he took his wife (Matthew 1:24).",
      "St. Joseph, the just and silent man of faith, served the incarnate Word with fatherly love and prompt obedience.",
      "The Universal Church runs with filial confidence to the patronage of St. Joseph: \"Ite ad Joseph\" (Go to Joseph)."
],
    meditationQuestion: 'Do I respond to God\'s commands with the immediate, silent, and courageous obedience of St. Joseph?',
    practicalLiving: 'Pray the Litany of St. Joseph or invoke him today: "St. Joseph, Guardian of the Redeemer and Protector of the Church, pray for us."',
    crossReferences: [
      "Matthew 1:16-24",
      "Luke 1:26-38",
      "CCC 437",
      "CCC 1014"
]
  },
  'mt 1:16':   {
    gospelCitation: 'Matthew 1:16, 18-21, 24a',
    topicTitle: 'The Solemnity of St. Joseph, Spouse of the Blessed Virgin: The Just Man and Guardian of the Redeemer',
    topicSubtitle: 'Joseph, son of David, do not fear to take Mary your wife: Silent Fidelity and Fatherly Protection',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Virgin Conception',
    chapter: 'The Virginal Conception of Jesus and The Role of St. Joseph',
    paragraphsRange: 'Catechism of the Catholic Church 437, 497, 532, 1014',
    catechismArticles: [
      {
            "number": 437,
            "title": "To Joseph, the Angel Announced the Birth of the Son of David",
            "text": "To the shepherds, the angel announced the birth of Jesus as the Messiah promised to Israel: \"To you is born this day in the city of David a Savior, who is Christ the Lord.\" From the beginning he was \"the one whom the Father consecrated and sent into the world\", conceived as \"holy\" in Mary's virginal womb. God called Joseph to \"take Mary as your wife, for that which is conceived in her is of the Holy Spirit\", so that Jesus, \"who is called Christ\", should be born of David's line."
      },
      {
            "number": 497,
            "title": "The Gospel Accounts Understand the Virginal Conception as a Divine Work",
            "text": "The Gospel accounts understand the virginal conception of Jesus as a divine work that surpasses all human understanding and possibility: \"That which is conceived in her is of the Holy Spirit\", said the angel to Joseph about Mary, his betrothed. The Church sees here the fulfillment of the divine promise given through the prophet Isaiah: \"Behold, a virgin shall conceive and bear a son.\""
      },
      {
            "number": 1014,
            "title": "St. Joseph, Patron of a Happy Death and Protector of the Church",
            "text": "The Church encourages us to prepare ourselves for the hour of our death (\"From a sudden and unprovided death, deliver us, O Lord\"), to ask the Mother of God to intercede for us \"at the hour of our death\" in the Hail Mary, and to entrust ourselves to St. Joseph, the patron of a happy death."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Apostolic Exhortation Redemptoris Custos (Guardian of the Redeemer)",
            "citation": "RC 1",
            "insight": "Just as St. Joseph took loving care of Mary and gladly dedicated himself to Jesus Christ's upbringing, he likewise watches over and protects Christ's Mystical Body, that is, the Church."
      }
],
    inBrief: [
      "When Joseph woke from sleep, he did as the angel of the Lord commanded him; he took his wife (Matthew 1:24).",
      "St. Joseph, the just and silent man of faith, served the incarnate Word with fatherly love and prompt obedience.",
      "The Universal Church runs with filial confidence to the patronage of St. Joseph: \"Ite ad Joseph\" (Go to Joseph)."
],
    meditationQuestion: 'Do I respond to God\'s commands with the immediate, silent, and courageous obedience of St. Joseph?',
    practicalLiving: 'Pray the Litany of St. Joseph or invoke him today: "St. Joseph, Guardian of the Redeemer and Protector of the Church, pray for us."',
    crossReferences: [
      "Matthew 1:16-24",
      "Luke 1:26-38",
      "CCC 437",
      "CCC 1014"
]
  },
  'matthew 1:18':   {
    gospelCitation: 'Matthew 1:16, 18-21, 24a',
    topicTitle: 'The Solemnity of St. Joseph, Spouse of the Blessed Virgin: The Just Man and Guardian of the Redeemer',
    topicSubtitle: 'Joseph, son of David, do not fear to take Mary your wife: Silent Fidelity and Fatherly Protection',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Virgin Conception',
    chapter: 'The Virginal Conception of Jesus and The Role of St. Joseph',
    paragraphsRange: 'Catechism of the Catholic Church 437, 497, 532, 1014',
    catechismArticles: [
      {
            "number": 437,
            "title": "To Joseph, the Angel Announced the Birth of the Son of David",
            "text": "To the shepherds, the angel announced the birth of Jesus as the Messiah promised to Israel: \"To you is born this day in the city of David a Savior, who is Christ the Lord.\" From the beginning he was \"the one whom the Father consecrated and sent into the world\", conceived as \"holy\" in Mary's virginal womb. God called Joseph to \"take Mary as your wife, for that which is conceived in her is of the Holy Spirit\", so that Jesus, \"who is called Christ\", should be born of David's line."
      },
      {
            "number": 497,
            "title": "The Gospel Accounts Understand the Virginal Conception as a Divine Work",
            "text": "The Gospel accounts understand the virginal conception of Jesus as a divine work that surpasses all human understanding and possibility: \"That which is conceived in her is of the Holy Spirit\", said the angel to Joseph about Mary, his betrothed. The Church sees here the fulfillment of the divine promise given through the prophet Isaiah: \"Behold, a virgin shall conceive and bear a son.\""
      },
      {
            "number": 1014,
            "title": "St. Joseph, Patron of a Happy Death and Protector of the Church",
            "text": "The Church encourages us to prepare ourselves for the hour of our death (\"From a sudden and unprovided death, deliver us, O Lord\"), to ask the Mother of God to intercede for us \"at the hour of our death\" in the Hail Mary, and to entrust ourselves to St. Joseph, the patron of a happy death."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Apostolic Exhortation Redemptoris Custos (Guardian of the Redeemer)",
            "citation": "RC 1",
            "insight": "Just as St. Joseph took loving care of Mary and gladly dedicated himself to Jesus Christ's upbringing, he likewise watches over and protects Christ's Mystical Body, that is, the Church."
      }
],
    inBrief: [
      "When Joseph woke from sleep, he did as the angel of the Lord commanded him; he took his wife (Matthew 1:24).",
      "St. Joseph, the just and silent man of faith, served the incarnate Word with fatherly love and prompt obedience.",
      "The Universal Church runs with filial confidence to the patronage of St. Joseph: \"Ite ad Joseph\" (Go to Joseph)."
],
    meditationQuestion: 'Do I respond to God\'s commands with the immediate, silent, and courageous obedience of St. Joseph?',
    practicalLiving: 'Pray the Litany of St. Joseph or invoke him today: "St. Joseph, Guardian of the Redeemer and Protector of the Church, pray for us."',
    crossReferences: [
      "Matthew 1:16-24",
      "Luke 1:26-38",
      "CCC 437",
      "CCC 1014"
]
  },
  'solemnity of st joseph':   {
    gospelCitation: 'Matthew 1:16, 18-21, 24a',
    topicTitle: 'The Solemnity of St. Joseph, Spouse of the Blessed Virgin: The Just Man and Guardian of the Redeemer',
    topicSubtitle: 'Joseph, son of David, do not fear to take Mary your wife: Silent Fidelity and Fatherly Protection',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Virgin Conception',
    chapter: 'The Virginal Conception of Jesus and The Role of St. Joseph',
    paragraphsRange: 'Catechism of the Catholic Church 437, 497, 532, 1014',
    catechismArticles: [
      {
            "number": 437,
            "title": "To Joseph, the Angel Announced the Birth of the Son of David",
            "text": "To the shepherds, the angel announced the birth of Jesus as the Messiah promised to Israel: \"To you is born this day in the city of David a Savior, who is Christ the Lord.\" From the beginning he was \"the one whom the Father consecrated and sent into the world\", conceived as \"holy\" in Mary's virginal womb. God called Joseph to \"take Mary as your wife, for that which is conceived in her is of the Holy Spirit\", so that Jesus, \"who is called Christ\", should be born of David's line."
      },
      {
            "number": 497,
            "title": "The Gospel Accounts Understand the Virginal Conception as a Divine Work",
            "text": "The Gospel accounts understand the virginal conception of Jesus as a divine work that surpasses all human understanding and possibility: \"That which is conceived in her is of the Holy Spirit\", said the angel to Joseph about Mary, his betrothed. The Church sees here the fulfillment of the divine promise given through the prophet Isaiah: \"Behold, a virgin shall conceive and bear a son.\""
      },
      {
            "number": 1014,
            "title": "St. Joseph, Patron of a Happy Death and Protector of the Church",
            "text": "The Church encourages us to prepare ourselves for the hour of our death (\"From a sudden and unprovided death, deliver us, O Lord\"), to ask the Mother of God to intercede for us \"at the hour of our death\" in the Hail Mary, and to entrust ourselves to St. Joseph, the patron of a happy death."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Apostolic Exhortation Redemptoris Custos (Guardian of the Redeemer)",
            "citation": "RC 1",
            "insight": "Just as St. Joseph took loving care of Mary and gladly dedicated himself to Jesus Christ's upbringing, he likewise watches over and protects Christ's Mystical Body, that is, the Church."
      }
],
    inBrief: [
      "When Joseph woke from sleep, he did as the angel of the Lord commanded him; he took his wife (Matthew 1:24).",
      "St. Joseph, the just and silent man of faith, served the incarnate Word with fatherly love and prompt obedience.",
      "The Universal Church runs with filial confidence to the patronage of St. Joseph: \"Ite ad Joseph\" (Go to Joseph)."
],
    meditationQuestion: 'Do I respond to God\'s commands with the immediate, silent, and courageous obedience of St. Joseph?',
    practicalLiving: 'Pray the Litany of St. Joseph or invoke him today: "St. Joseph, Guardian of the Redeemer and Protector of the Church, pray for us."',
    crossReferences: [
      "Matthew 1:16-24",
      "Luke 1:26-38",
      "CCC 437",
      "CCC 1014"
]
  },
  'matthew 21:1-11':   {
    gospelCitation: 'Matthew 21:1-11',
    topicTitle: 'Palm Sunday of the Passion of the Lord: The Messianic Entry into Jerusalem',
    topicSubtitle: 'Hosanna to the Son of David! Blessed is he who comes in the name of the Lord! Hosanna in the highest!',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Passion of Jesus',
    chapter: 'Jesus\' Messianic Entry into Jerusalem and The Mystery of Holy Week',
    paragraphsRange: 'Catechism of the Catholic Church 559, 560, 569, 570',
    catechismArticles: [
      {
            "number": 559,
            "title": "How Will Jerusalem Welcome Her Messiah?",
            "text": "How will Jerusalem welcome her Messiah? Although Jesus had always refused popular attempts to make him a king, he chooses the time and details of his messianic entry into the city of \"his father David.\" He is acclaimed as the Son of David, as the one who brings salvation (\"Hosanna\" means \"Save!\" or \"Give salvation!\"). But he enters his city riding on an ass, not on a horse of conquest: he conquers Jerusalem not by violence but by the humility of truth."
      },
      {
            "number": 560,
            "title": "Jesus' Entry into Jerusalem Manifests the Coming of the Kingdom",
            "text": "Jesus' entry into Jerusalem manifests the coming of the kingdom that the King-Messiah is going to accomplish by the Passover of his Death and Resurrection. It is with the celebration of that entry on Palm Sunday that the Church's liturgy solemnly opens the Paschal Week."
      },
      {
            "number": 570,
            "title": "The Acclamation of the Children of Jerusalem",
            "text": "Jesus' messianic entry into Jerusalem, celebrated on Palm Sunday, prefigures the heavenly liturgy where the whole company of the redeemed waves palms before the Lamb, chanting: \"Salvation belongs to our God who sits upon the throne, and to the Lamb!\""
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Benedict XVI",
            "documentTitle": "Homily for Palm Sunday of the Passion of the Lord",
            "citation": "April 1, 2012",
            "insight": "The entry on the donkey reveals that Jesus is a King of peace and humility, fulfilling Zechariah's prophecy. The palm branches represent the victory of the cross, where true royalty is manifested through total self-giving love."
      }
],
    inBrief: [
      "Behold, your king is coming to you, humble, and mounted on an ass (Matthew 21:5).",
      "Palm Sunday opens the most sacred week of the year, commemorating the Redeemer's ascent to the altar of the Cross.",
      "The same crowd that cried \"Hosanna!\" would soon cry \"Crucify him!\", warning us against superficial emotion in religion."
],
    meditationQuestion: 'Is my praise of Jesus constant in times of suffering and trial, or do I only sing "Hosanna" when things go well?',
    practicalLiving: 'Place a blessed palm behind your crucifix at home, renewing your commitment to walk with Christ through Holy Week.',
    crossReferences: [
      "Matthew 21:1-11",
      "Zechariah 9:9",
      "CCC 559",
      "CCC 560"
]
  },
  'mt 21:1-11':   {
    gospelCitation: 'Matthew 21:1-11',
    topicTitle: 'Palm Sunday of the Passion of the Lord: The Messianic Entry into Jerusalem',
    topicSubtitle: 'Hosanna to the Son of David! Blessed is he who comes in the name of the Lord! Hosanna in the highest!',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Passion of Jesus',
    chapter: 'Jesus\' Messianic Entry into Jerusalem and The Mystery of Holy Week',
    paragraphsRange: 'Catechism of the Catholic Church 559, 560, 569, 570',
    catechismArticles: [
      {
            "number": 559,
            "title": "How Will Jerusalem Welcome Her Messiah?",
            "text": "How will Jerusalem welcome her Messiah? Although Jesus had always refused popular attempts to make him a king, he chooses the time and details of his messianic entry into the city of \"his father David.\" He is acclaimed as the Son of David, as the one who brings salvation (\"Hosanna\" means \"Save!\" or \"Give salvation!\"). But he enters his city riding on an ass, not on a horse of conquest: he conquers Jerusalem not by violence but by the humility of truth."
      },
      {
            "number": 560,
            "title": "Jesus' Entry into Jerusalem Manifests the Coming of the Kingdom",
            "text": "Jesus' entry into Jerusalem manifests the coming of the kingdom that the King-Messiah is going to accomplish by the Passover of his Death and Resurrection. It is with the celebration of that entry on Palm Sunday that the Church's liturgy solemnly opens the Paschal Week."
      },
      {
            "number": 570,
            "title": "The Acclamation of the Children of Jerusalem",
            "text": "Jesus' messianic entry into Jerusalem, celebrated on Palm Sunday, prefigures the heavenly liturgy where the whole company of the redeemed waves palms before the Lamb, chanting: \"Salvation belongs to our God who sits upon the throne, and to the Lamb!\""
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Benedict XVI",
            "documentTitle": "Homily for Palm Sunday of the Passion of the Lord",
            "citation": "April 1, 2012",
            "insight": "The entry on the donkey reveals that Jesus is a King of peace and humility, fulfilling Zechariah's prophecy. The palm branches represent the victory of the cross, where true royalty is manifested through total self-giving love."
      }
],
    inBrief: [
      "Behold, your king is coming to you, humble, and mounted on an ass (Matthew 21:5).",
      "Palm Sunday opens the most sacred week of the year, commemorating the Redeemer's ascent to the altar of the Cross.",
      "The same crowd that cried \"Hosanna!\" would soon cry \"Crucify him!\", warning us against superficial emotion in religion."
],
    meditationQuestion: 'Is my praise of Jesus constant in times of suffering and trial, or do I only sing "Hosanna" when things go well?',
    practicalLiving: 'Place a blessed palm behind your crucifix at home, renewing your commitment to walk with Christ through Holy Week.',
    crossReferences: [
      "Matthew 21:1-11",
      "Zechariah 9:9",
      "CCC 559",
      "CCC 560"
]
  },
  'matthew 21:1':   {
    gospelCitation: 'Matthew 21:1-11',
    topicTitle: 'Palm Sunday of the Passion of the Lord: The Messianic Entry into Jerusalem',
    topicSubtitle: 'Hosanna to the Son of David! Blessed is he who comes in the name of the Lord! Hosanna in the highest!',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Passion of Jesus',
    chapter: 'Jesus\' Messianic Entry into Jerusalem and The Mystery of Holy Week',
    paragraphsRange: 'Catechism of the Catholic Church 559, 560, 569, 570',
    catechismArticles: [
      {
            "number": 559,
            "title": "How Will Jerusalem Welcome Her Messiah?",
            "text": "How will Jerusalem welcome her Messiah? Although Jesus had always refused popular attempts to make him a king, he chooses the time and details of his messianic entry into the city of \"his father David.\" He is acclaimed as the Son of David, as the one who brings salvation (\"Hosanna\" means \"Save!\" or \"Give salvation!\"). But he enters his city riding on an ass, not on a horse of conquest: he conquers Jerusalem not by violence but by the humility of truth."
      },
      {
            "number": 560,
            "title": "Jesus' Entry into Jerusalem Manifests the Coming of the Kingdom",
            "text": "Jesus' entry into Jerusalem manifests the coming of the kingdom that the King-Messiah is going to accomplish by the Passover of his Death and Resurrection. It is with the celebration of that entry on Palm Sunday that the Church's liturgy solemnly opens the Paschal Week."
      },
      {
            "number": 570,
            "title": "The Acclamation of the Children of Jerusalem",
            "text": "Jesus' messianic entry into Jerusalem, celebrated on Palm Sunday, prefigures the heavenly liturgy where the whole company of the redeemed waves palms before the Lamb, chanting: \"Salvation belongs to our God who sits upon the throne, and to the Lamb!\""
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Benedict XVI",
            "documentTitle": "Homily for Palm Sunday of the Passion of the Lord",
            "citation": "April 1, 2012",
            "insight": "The entry on the donkey reveals that Jesus is a King of peace and humility, fulfilling Zechariah's prophecy. The palm branches represent the victory of the cross, where true royalty is manifested through total self-giving love."
      }
],
    inBrief: [
      "Behold, your king is coming to you, humble, and mounted on an ass (Matthew 21:5).",
      "Palm Sunday opens the most sacred week of the year, commemorating the Redeemer's ascent to the altar of the Cross.",
      "The same crowd that cried \"Hosanna!\" would soon cry \"Crucify him!\", warning us against superficial emotion in religion."
],
    meditationQuestion: 'Is my praise of Jesus constant in times of suffering and trial, or do I only sing "Hosanna" when things go well?',
    practicalLiving: 'Place a blessed palm behind your crucifix at home, renewing your commitment to walk with Christ through Holy Week.',
    crossReferences: [
      "Matthew 21:1-11",
      "Zechariah 9:9",
      "CCC 559",
      "CCC 560"
]
  },
  'palm sunday':   {
    gospelCitation: 'Matthew 21:1-11',
    topicTitle: 'Palm Sunday of the Passion of the Lord: The Messianic Entry into Jerusalem',
    topicSubtitle: 'Hosanna to the Son of David! Blessed is he who comes in the name of the Lord! Hosanna in the highest!',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Passion of Jesus',
    chapter: 'Jesus\' Messianic Entry into Jerusalem and The Mystery of Holy Week',
    paragraphsRange: 'Catechism of the Catholic Church 559, 560, 569, 570',
    catechismArticles: [
      {
            "number": 559,
            "title": "How Will Jerusalem Welcome Her Messiah?",
            "text": "How will Jerusalem welcome her Messiah? Although Jesus had always refused popular attempts to make him a king, he chooses the time and details of his messianic entry into the city of \"his father David.\" He is acclaimed as the Son of David, as the one who brings salvation (\"Hosanna\" means \"Save!\" or \"Give salvation!\"). But he enters his city riding on an ass, not on a horse of conquest: he conquers Jerusalem not by violence but by the humility of truth."
      },
      {
            "number": 560,
            "title": "Jesus' Entry into Jerusalem Manifests the Coming of the Kingdom",
            "text": "Jesus' entry into Jerusalem manifests the coming of the kingdom that the King-Messiah is going to accomplish by the Passover of his Death and Resurrection. It is with the celebration of that entry on Palm Sunday that the Church's liturgy solemnly opens the Paschal Week."
      },
      {
            "number": 570,
            "title": "The Acclamation of the Children of Jerusalem",
            "text": "Jesus' messianic entry into Jerusalem, celebrated on Palm Sunday, prefigures the heavenly liturgy where the whole company of the redeemed waves palms before the Lamb, chanting: \"Salvation belongs to our God who sits upon the throne, and to the Lamb!\""
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Benedict XVI",
            "documentTitle": "Homily for Palm Sunday of the Passion of the Lord",
            "citation": "April 1, 2012",
            "insight": "The entry on the donkey reveals that Jesus is a King of peace and humility, fulfilling Zechariah's prophecy. The palm branches represent the victory of the cross, where true royalty is manifested through total self-giving love."
      }
],
    inBrief: [
      "Behold, your king is coming to you, humble, and mounted on an ass (Matthew 21:5).",
      "Palm Sunday opens the most sacred week of the year, commemorating the Redeemer's ascent to the altar of the Cross.",
      "The same crowd that cried \"Hosanna!\" would soon cry \"Crucify him!\", warning us against superficial emotion in religion."
],
    meditationQuestion: 'Is my praise of Jesus constant in times of suffering and trial, or do I only sing "Hosanna" when things go well?',
    practicalLiving: 'Place a blessed palm behind your crucifix at home, renewing your commitment to walk with Christ through Holy Week.',
    crossReferences: [
      "Matthew 21:1-11",
      "Zechariah 9:9",
      "CCC 559",
      "CCC 560"
]
  },
  'john 13:1-15':   {
    gospelCitation: 'John 13:1-15',
    topicTitle: 'Holy Thursday — The Evening Mass of the Lord\'s Supper: Washing of the Feet & Institution of the Holy Eucharist',
    topicSubtitle: 'He loved them to the end: The Institution of the Holy Eucharist and the Ministerial Priesthood',
    pillar: '',
    part: 'Part Two: The Celebration of the Christian Mystery',
    section: 'Section Two: The Seven Sacraments',
    chapter: 'The Sacraments of the Eucharist and Holy Orders — The Paschal Banquet',
    paragraphsRange: 'Catechism of the Catholic Church 610, 1337, 1340, 1548',
    catechismArticles: [
      {
            "number": 610,
            "title": "Jesus Gave the Last Supper the Meaning of a Voluntary Sacrifice",
            "text": "Jesus gave the supreme expression of his free offering of himself at the meal shared with the twelve Apostles on \"the night he was betrayed.\" On the eve of his Passion, while still at liberty, Jesus transformed this Last Supper with the apostles into the memorial of his voluntary offering to the Father for the salvation of men: \"This is my body which is given for you.\" \"This is my blood of the covenant, which is poured out for many for the forgiveness of sins.\""
      },
      {
            "number": 1337,
            "title": "The Institution of the Holy Eucharist at the Last Supper",
            "text": "The Lord, having loved those who were his own, loved them to the end. Knowing that the hour had come to leave this world and return to the Father, in the course of a meal he washed their feet and gave them the commandment of love. In order to leave them a pledge of this love, in order never to depart from his own and to make them sharers in his Passover, he instituted the Eucharist as the memorial of his death and Resurrection."
      },
      {
            "number": 1548,
            "title": "The Catholic Priest Acts In Persona Christi Capitis",
            "text": "In the ecclesial service of the ordained minister, it is Christ himself who is present to his Church as Head of his Body, Shepherd of his flock, high priest of the redemptive sacrifice, Teacher of Truth. This is what the Church means by saying that the priest, by virtue of the sacrament of Holy Orders, acts in persona Christi Capitis."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Encyclical Ecclesia de Eucharistia",
            "citation": "EE 1",
            "insight": "The Church draws her life from the Eucharist. This truth does not simply express a daily experience of faith, but encapsulates the heart of the mystery of the Church. In the Upper Room, Christ gave us the greatest gift of His Sacred Heart."
      }
],
    inBrief: [
      "If I then, your Lord and Teacher, have washed your feet, you also ought to wash one another's feet (John 13:14).",
      "On Holy Thursday night, Jesus instituted the Most Holy Eucharist as His true Body and Blood, and the Holy Priesthood to celebrate it.",
      "The washing of the feet is the dramatic icon of Eucharistic love, which lowers itself to cleanse and serve humanity."
],
    meditationQuestion: 'Do I participate in Holy Mass with deep awe, recognizing that the Upper Room and Calvary are made truly present on the altar?',
    practicalLiving: 'Spend time in adoration before the Altar of Repose or the Tabernacle today, thanking Jesus for the Priesthood and the Holy Eucharist.',
    crossReferences: [
      "John 13:1-15",
      "1 Corinthians 11:23-26",
      "CCC 1337",
      "CCC 1548"
]
  },
  'jn 13:1-15':   {
    gospelCitation: 'John 13:1-15',
    topicTitle: 'Holy Thursday — The Evening Mass of the Lord\'s Supper: Washing of the Feet & Institution of the Holy Eucharist',
    topicSubtitle: 'He loved them to the end: The Institution of the Holy Eucharist and the Ministerial Priesthood',
    pillar: '',
    part: 'Part Two: The Celebration of the Christian Mystery',
    section: 'Section Two: The Seven Sacraments',
    chapter: 'The Sacraments of the Eucharist and Holy Orders — The Paschal Banquet',
    paragraphsRange: 'Catechism of the Catholic Church 610, 1337, 1340, 1548',
    catechismArticles: [
      {
            "number": 610,
            "title": "Jesus Gave the Last Supper the Meaning of a Voluntary Sacrifice",
            "text": "Jesus gave the supreme expression of his free offering of himself at the meal shared with the twelve Apostles on \"the night he was betrayed.\" On the eve of his Passion, while still at liberty, Jesus transformed this Last Supper with the apostles into the memorial of his voluntary offering to the Father for the salvation of men: \"This is my body which is given for you.\" \"This is my blood of the covenant, which is poured out for many for the forgiveness of sins.\""
      },
      {
            "number": 1337,
            "title": "The Institution of the Holy Eucharist at the Last Supper",
            "text": "The Lord, having loved those who were his own, loved them to the end. Knowing that the hour had come to leave this world and return to the Father, in the course of a meal he washed their feet and gave them the commandment of love. In order to leave them a pledge of this love, in order never to depart from his own and to make them sharers in his Passover, he instituted the Eucharist as the memorial of his death and Resurrection."
      },
      {
            "number": 1548,
            "title": "The Catholic Priest Acts In Persona Christi Capitis",
            "text": "In the ecclesial service of the ordained minister, it is Christ himself who is present to his Church as Head of his Body, Shepherd of his flock, high priest of the redemptive sacrifice, Teacher of Truth. This is what the Church means by saying that the priest, by virtue of the sacrament of Holy Orders, acts in persona Christi Capitis."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Encyclical Ecclesia de Eucharistia",
            "citation": "EE 1",
            "insight": "The Church draws her life from the Eucharist. This truth does not simply express a daily experience of faith, but encapsulates the heart of the mystery of the Church. In the Upper Room, Christ gave us the greatest gift of His Sacred Heart."
      }
],
    inBrief: [
      "If I then, your Lord and Teacher, have washed your feet, you also ought to wash one another's feet (John 13:14).",
      "On Holy Thursday night, Jesus instituted the Most Holy Eucharist as His true Body and Blood, and the Holy Priesthood to celebrate it.",
      "The washing of the feet is the dramatic icon of Eucharistic love, which lowers itself to cleanse and serve humanity."
],
    meditationQuestion: 'Do I participate in Holy Mass with deep awe, recognizing that the Upper Room and Calvary are made truly present on the altar?',
    practicalLiving: 'Spend time in adoration before the Altar of Repose or the Tabernacle today, thanking Jesus for the Priesthood and the Holy Eucharist.',
    crossReferences: [
      "John 13:1-15",
      "1 Corinthians 11:23-26",
      "CCC 1337",
      "CCC 1548"
]
  },
  'john 13:1':   {
    gospelCitation: 'John 13:1-15',
    topicTitle: 'Holy Thursday — The Evening Mass of the Lord\'s Supper: Washing of the Feet & Institution of the Holy Eucharist',
    topicSubtitle: 'He loved them to the end: The Institution of the Holy Eucharist and the Ministerial Priesthood',
    pillar: '',
    part: 'Part Two: The Celebration of the Christian Mystery',
    section: 'Section Two: The Seven Sacraments',
    chapter: 'The Sacraments of the Eucharist and Holy Orders — The Paschal Banquet',
    paragraphsRange: 'Catechism of the Catholic Church 610, 1337, 1340, 1548',
    catechismArticles: [
      {
            "number": 610,
            "title": "Jesus Gave the Last Supper the Meaning of a Voluntary Sacrifice",
            "text": "Jesus gave the supreme expression of his free offering of himself at the meal shared with the twelve Apostles on \"the night he was betrayed.\" On the eve of his Passion, while still at liberty, Jesus transformed this Last Supper with the apostles into the memorial of his voluntary offering to the Father for the salvation of men: \"This is my body which is given for you.\" \"This is my blood of the covenant, which is poured out for many for the forgiveness of sins.\""
      },
      {
            "number": 1337,
            "title": "The Institution of the Holy Eucharist at the Last Supper",
            "text": "The Lord, having loved those who were his own, loved them to the end. Knowing that the hour had come to leave this world and return to the Father, in the course of a meal he washed their feet and gave them the commandment of love. In order to leave them a pledge of this love, in order never to depart from his own and to make them sharers in his Passover, he instituted the Eucharist as the memorial of his death and Resurrection."
      },
      {
            "number": 1548,
            "title": "The Catholic Priest Acts In Persona Christi Capitis",
            "text": "In the ecclesial service of the ordained minister, it is Christ himself who is present to his Church as Head of his Body, Shepherd of his flock, high priest of the redemptive sacrifice, Teacher of Truth. This is what the Church means by saying that the priest, by virtue of the sacrament of Holy Orders, acts in persona Christi Capitis."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Encyclical Ecclesia de Eucharistia",
            "citation": "EE 1",
            "insight": "The Church draws her life from the Eucharist. This truth does not simply express a daily experience of faith, but encapsulates the heart of the mystery of the Church. In the Upper Room, Christ gave us the greatest gift of His Sacred Heart."
      }
],
    inBrief: [
      "If I then, your Lord and Teacher, have washed your feet, you also ought to wash one another's feet (John 13:14).",
      "On Holy Thursday night, Jesus instituted the Most Holy Eucharist as His true Body and Blood, and the Holy Priesthood to celebrate it.",
      "The washing of the feet is the dramatic icon of Eucharistic love, which lowers itself to cleanse and serve humanity."
],
    meditationQuestion: 'Do I participate in Holy Mass with deep awe, recognizing that the Upper Room and Calvary are made truly present on the altar?',
    practicalLiving: 'Spend time in adoration before the Altar of Repose or the Tabernacle today, thanking Jesus for the Priesthood and the Holy Eucharist.',
    crossReferences: [
      "John 13:1-15",
      "1 Corinthians 11:23-26",
      "CCC 1337",
      "CCC 1548"
]
  },
  'holy thursday':   {
    gospelCitation: 'John 13:1-15',
    topicTitle: 'Holy Thursday — The Evening Mass of the Lord\'s Supper: Washing of the Feet & Institution of the Holy Eucharist',
    topicSubtitle: 'He loved them to the end: The Institution of the Holy Eucharist and the Ministerial Priesthood',
    pillar: '',
    part: 'Part Two: The Celebration of the Christian Mystery',
    section: 'Section Two: The Seven Sacraments',
    chapter: 'The Sacraments of the Eucharist and Holy Orders — The Paschal Banquet',
    paragraphsRange: 'Catechism of the Catholic Church 610, 1337, 1340, 1548',
    catechismArticles: [
      {
            "number": 610,
            "title": "Jesus Gave the Last Supper the Meaning of a Voluntary Sacrifice",
            "text": "Jesus gave the supreme expression of his free offering of himself at the meal shared with the twelve Apostles on \"the night he was betrayed.\" On the eve of his Passion, while still at liberty, Jesus transformed this Last Supper with the apostles into the memorial of his voluntary offering to the Father for the salvation of men: \"This is my body which is given for you.\" \"This is my blood of the covenant, which is poured out for many for the forgiveness of sins.\""
      },
      {
            "number": 1337,
            "title": "The Institution of the Holy Eucharist at the Last Supper",
            "text": "The Lord, having loved those who were his own, loved them to the end. Knowing that the hour had come to leave this world and return to the Father, in the course of a meal he washed their feet and gave them the commandment of love. In order to leave them a pledge of this love, in order never to depart from his own and to make them sharers in his Passover, he instituted the Eucharist as the memorial of his death and Resurrection."
      },
      {
            "number": 1548,
            "title": "The Catholic Priest Acts In Persona Christi Capitis",
            "text": "In the ecclesial service of the ordained minister, it is Christ himself who is present to his Church as Head of his Body, Shepherd of his flock, high priest of the redemptive sacrifice, Teacher of Truth. This is what the Church means by saying that the priest, by virtue of the sacrament of Holy Orders, acts in persona Christi Capitis."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Encyclical Ecclesia de Eucharistia",
            "citation": "EE 1",
            "insight": "The Church draws her life from the Eucharist. This truth does not simply express a daily experience of faith, but encapsulates the heart of the mystery of the Church. In the Upper Room, Christ gave us the greatest gift of His Sacred Heart."
      }
],
    inBrief: [
      "If I then, your Lord and Teacher, have washed your feet, you also ought to wash one another's feet (John 13:14).",
      "On Holy Thursday night, Jesus instituted the Most Holy Eucharist as His true Body and Blood, and the Holy Priesthood to celebrate it.",
      "The washing of the feet is the dramatic icon of Eucharistic love, which lowers itself to cleanse and serve humanity."
],
    meditationQuestion: 'Do I participate in Holy Mass with deep awe, recognizing that the Upper Room and Calvary are made truly present on the altar?',
    practicalLiving: 'Spend time in adoration before the Altar of Repose or the Tabernacle today, thanking Jesus for the Priesthood and the Holy Eucharist.',
    crossReferences: [
      "John 13:1-15",
      "1 Corinthians 11:23-26",
      "CCC 1337",
      "CCC 1548"
]
  },
  'john 18:1–19:42':   {
    gospelCitation: 'John 18:1–19:42',
    topicTitle: 'Good Friday of the Passion of the Lord: Behold the Wood of the Cross — Consummatum Est',
    topicSubtitle: 'He bowed his head and gave up his spirit: The Redemptive Sacrifice That Took Away the Sins of the World',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — Suffered Under Pontius Pilate',
    chapter: 'The Passion, Crucifixion, and Burial of Jesus Christ',
    paragraphsRange: 'Catechism of the Catholic Church 599, 608, 616, 624',
    catechismArticles: [
      {
            "number": 599,
            "title": "Jesus' Violent Death Was Part of the Mystery of God's Plan",
            "text": "Jesus' violent death was not the result of chance in an unfortunate sequence of events. It belongs to the mystery of God's plan, as St. Peter explains to the Jews of Jerusalem in his first sermon on Pentecost: \"This Jesus [was] delivered up according to the definite plan and foreknowledge of God.\" This biblical language does not mean that those who handed him over were merely passive players in a scenario written in advance by God."
      },
      {
            "number": 608,
            "title": "Behold the Lamb of God Who Takes Away the Sin of the World",
            "text": "After agreeing to baptize him along with the sinners, John the Baptist looked at Jesus and pointed him out as the \"Lamb of God, who takes away the sin of the world.\" By doing so, he reveals that Jesus is at the same time the suffering Servant who silently allows himself to be led to the slaughter and who bears the sin of the multitudes, and also the Paschal Lamb, the symbol of Israel's redemption at the first Passover."
      },
      {
            "number": 616,
            "title": "Christ's Sacrifice is Unique, Surpassing and Perfecting All Sacrifices",
            "text": "It is love \"to the end\" that confers on Christ's sacrifice its value as redemption and reparation, as atonement and satisfaction. He knew and loved us all when he offered his life. Now \"the love of Christ controls us, because we are convinced that one has died for all; therefore all have died.\" No man, not even the holiest, was ever able to take on himself the sins of all men and offer himself as a sacrifice for all."
      },
      {
            "number": 624,
            "title": "The Mystery of the Burial: In the Tomb from Good Friday to Easter Sunday",
            "text": "\"By the grace of God\" Jesus tasted death \"for every one.\" In his plan of salvation, God ordained that his Son should not only \"die for our sins\" but should also \"taste death,\" experience the condition of death, the separation of his soul from his body, between the time he expired on the cross and the time he was raised again."
      }
],
    magisterialInputs: [
      {
        authority: 'Pope Benedict XVI',
        documentTitle: 'Way of the Cross at the Colosseum',
        citation: 'Good Friday 2006',
        insight: 'On the Cross, God Himself enters into the deepest misery of human sin and abandonment to drown it in the abyss of His divine love. Ave Crux, spes unica—Hail, O Cross, our only hope!'
      }
    ],
    inBrief: [
      "When Jesus had received the vinegar, he said, \"It is finished\"; and he bowed his head and gave up his spirit (John 19:30).",
      "On Good Friday, the spotless Lamb of God suffered the torments of the Cross to blot out the handwriting of our condemnation.",
      "The piercing of Christ's Sacred Heart on Calvary brought forth blood and water, the sacramental birth of the Catholic Church."
],
    meditationQuestion: 'Do I contemplate the crucifix with deep compunction, realizing that my personal sins caused those wounds?',
    practicalLiving: 'Venerate the crucifix in your home today: kneel and kiss the five Sacred Wounds of Jesus in silent adoration and gratitude.',
    crossReferences: [
      "John 18:1–19:42",
      "Isaiah 53:3-7",
      "CCC 608",
      "CCC 616"
]
  },
  'john 18:1':   {
    gospelCitation: 'John 18:1–19:42',
    topicTitle: 'Good Friday of the Passion of the Lord: Behold the Wood of the Cross — Consummatum Est',
    topicSubtitle: 'He bowed his head and gave up his spirit: The Redemptive Sacrifice That Took Away the Sins of the World',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — Suffered Under Pontius Pilate',
    chapter: 'The Passion, Crucifixion, and Burial of Jesus Christ',
    paragraphsRange: 'Catechism of the Catholic Church 599, 608, 616, 624',
    catechismArticles: [
      {
            "number": 599,
            "title": "Jesus' Violent Death Was Part of the Mystery of God's Plan",
            "text": "Jesus' violent death was not the result of chance in an unfortunate sequence of events. It belongs to the mystery of God's plan, as St. Peter explains to the Jews of Jerusalem in his first sermon on Pentecost: \"This Jesus [was] delivered up according to the definite plan and foreknowledge of God.\" This biblical language does not mean that those who handed him over were merely passive players in a scenario written in advance by God."
      },
      {
            "number": 608,
            "title": "Behold the Lamb of God Who Takes Away the Sin of the World",
            "text": "After agreeing to baptize him along with the sinners, John the Baptist looked at Jesus and pointed him out as the \"Lamb of God, who takes away the sin of the world.\" By doing so, he reveals that Jesus is at the same time the suffering Servant who silently allows himself to be led to the slaughter and who bears the sin of the multitudes, and also the Paschal Lamb, the symbol of Israel's redemption at the first Passover."
      },
      {
            "number": 616,
            "title": "Christ's Sacrifice is Unique, Surpassing and Perfecting All Sacrifices",
            "text": "It is love \"to the end\" that confers on Christ's sacrifice its value as redemption and reparation, as atonement and satisfaction. He knew and loved us all when he offered his life. Now \"the love of Christ controls us, because we are convinced that one has died for all; therefore all have died.\" No man, not even the holiest, was ever able to take on himself the sins of all men and offer himself as a sacrifice for all."
      },
      {
            "number": 624,
            "title": "The Mystery of the Burial: In the Tomb from Good Friday to Easter Sunday",
            "text": "\"By the grace of God\" Jesus tasted death \"for every one.\" In his plan of salvation, God ordained that his Son should not only \"die for our sins\" but should also \"taste death,\" experience the condition of death, the separation of his soul from his body, between the time he expired on the cross and the time he was raised again."
      }
],
    magisterialInputs: [
      {
        authority: 'Pope Benedict XVI',
        documentTitle: 'Way of the Cross at the Colosseum',
        citation: 'Good Friday 2006',
        insight: 'On the Cross, God Himself enters into the deepest misery of human sin and abandonment to drown it in the abyss of His divine love. Ave Crux, spes unica—Hail, O Cross, our only hope!'
      }
    ],
    inBrief: [
      "When Jesus had received the vinegar, he said, \"It is finished\"; and he bowed his head and gave up his spirit (John 19:30).",
      "On Good Friday, the spotless Lamb of God suffered the torments of the Cross to blot out the handwriting of our condemnation.",
      "The piercing of Christ's Sacred Heart on Calvary brought forth blood and water, the sacramental birth of the Catholic Church."
],
    meditationQuestion: 'Do I contemplate the crucifix with deep compunction, realizing that my personal sins caused those wounds?',
    practicalLiving: 'Venerate the crucifix in your home today: kneel and kiss the five Sacred Wounds of Jesus in silent adoration and gratitude.',
    crossReferences: [
      "John 18:1–19:42",
      "Isaiah 53:3-7",
      "CCC 608",
      "CCC 616"
]
  },
  'jn 18:1':   {
    gospelCitation: 'John 18:1–19:42',
    topicTitle: 'Good Friday of the Passion of the Lord: Behold the Wood of the Cross — Consummatum Est',
    topicSubtitle: 'He bowed his head and gave up his spirit: The Redemptive Sacrifice That Took Away the Sins of the World',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — Suffered Under Pontius Pilate',
    chapter: 'The Passion, Crucifixion, and Burial of Jesus Christ',
    paragraphsRange: 'Catechism of the Catholic Church 599, 608, 616, 624',
    catechismArticles: [
      {
            "number": 599,
            "title": "Jesus' Violent Death Was Part of the Mystery of God's Plan",
            "text": "Jesus' violent death was not the result of chance in an unfortunate sequence of events. It belongs to the mystery of God's plan, as St. Peter explains to the Jews of Jerusalem in his first sermon on Pentecost: \"This Jesus [was] delivered up according to the definite plan and foreknowledge of God.\" This biblical language does not mean that those who handed him over were merely passive players in a scenario written in advance by God."
      },
      {
            "number": 608,
            "title": "Behold the Lamb of God Who Takes Away the Sin of the World",
            "text": "After agreeing to baptize him along with the sinners, John the Baptist looked at Jesus and pointed him out as the \"Lamb of God, who takes away the sin of the world.\" By doing so, he reveals that Jesus is at the same time the suffering Servant who silently allows himself to be led to the slaughter and who bears the sin of the multitudes, and also the Paschal Lamb, the symbol of Israel's redemption at the first Passover."
      },
      {
            "number": 616,
            "title": "Christ's Sacrifice is Unique, Surpassing and Perfecting All Sacrifices",
            "text": "It is love \"to the end\" that confers on Christ's sacrifice its value as redemption and reparation, as atonement and satisfaction. He knew and loved us all when he offered his life. Now \"the love of Christ controls us, because we are convinced that one has died for all; therefore all have died.\" No man, not even the holiest, was ever able to take on himself the sins of all men and offer himself as a sacrifice for all."
      },
      {
            "number": 624,
            "title": "The Mystery of the Burial: In the Tomb from Good Friday to Easter Sunday",
            "text": "\"By the grace of God\" Jesus tasted death \"for every one.\" In his plan of salvation, God ordained that his Son should not only \"die for our sins\" but should also \"taste death,\" experience the condition of death, the separation of his soul from his body, between the time he expired on the cross and the time he was raised again."
      }
],
    magisterialInputs: [
      {
        authority: 'Pope Benedict XVI',
        documentTitle: 'Way of the Cross at the Colosseum',
        citation: 'Good Friday 2006',
        insight: 'On the Cross, God Himself enters into the deepest misery of human sin and abandonment to drown it in the abyss of His divine love. Ave Crux, spes unica—Hail, O Cross, our only hope!'
      }
    ],
    inBrief: [
      "When Jesus had received the vinegar, he said, \"It is finished\"; and he bowed his head and gave up his spirit (John 19:30).",
      "On Good Friday, the spotless Lamb of God suffered the torments of the Cross to blot out the handwriting of our condemnation.",
      "The piercing of Christ's Sacred Heart on Calvary brought forth blood and water, the sacramental birth of the Catholic Church."
],
    meditationQuestion: 'Do I contemplate the crucifix with deep compunction, realizing that my personal sins caused those wounds?',
    practicalLiving: 'Venerate the crucifix in your home today: kneel and kiss the five Sacred Wounds of Jesus in silent adoration and gratitude.',
    crossReferences: [
      "John 18:1–19:42",
      "Isaiah 53:3-7",
      "CCC 608",
      "CCC 616"
]
  },
  'good friday':   {
    gospelCitation: 'John 18:1–19:42',
    topicTitle: 'Good Friday of the Passion of the Lord: Behold the Wood of the Cross — Consummatum Est',
    topicSubtitle: 'He bowed his head and gave up his spirit: The Redemptive Sacrifice That Took Away the Sins of the World',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — Suffered Under Pontius Pilate',
    chapter: 'The Passion, Crucifixion, and Burial of Jesus Christ',
    paragraphsRange: 'Catechism of the Catholic Church 599, 608, 616, 624',
    catechismArticles: [
      {
            "number": 599,
            "title": "Jesus' Violent Death Was Part of the Mystery of God's Plan",
            "text": "Jesus' violent death was not the result of chance in an unfortunate sequence of events. It belongs to the mystery of God's plan, as St. Peter explains to the Jews of Jerusalem in his first sermon on Pentecost: \"This Jesus [was] delivered up according to the definite plan and foreknowledge of God.\" This biblical language does not mean that those who handed him over were merely passive players in a scenario written in advance by God."
      },
      {
            "number": 608,
            "title": "Behold the Lamb of God Who Takes Away the Sin of the World",
            "text": "After agreeing to baptize him along with the sinners, John the Baptist looked at Jesus and pointed him out as the \"Lamb of God, who takes away the sin of the world.\" By doing so, he reveals that Jesus is at the same time the suffering Servant who silently allows himself to be led to the slaughter and who bears the sin of the multitudes, and also the Paschal Lamb, the symbol of Israel's redemption at the first Passover."
      },
      {
            "number": 616,
            "title": "Christ's Sacrifice is Unique, Surpassing and Perfecting All Sacrifices",
            "text": "It is love \"to the end\" that confers on Christ's sacrifice its value as redemption and reparation, as atonement and satisfaction. He knew and loved us all when he offered his life. Now \"the love of Christ controls us, because we are convinced that one has died for all; therefore all have died.\" No man, not even the holiest, was ever able to take on himself the sins of all men and offer himself as a sacrifice for all."
      },
      {
            "number": 624,
            "title": "The Mystery of the Burial: In the Tomb from Good Friday to Easter Sunday",
            "text": "\"By the grace of God\" Jesus tasted death \"for every one.\" In his plan of salvation, God ordained that his Son should not only \"die for our sins\" but should also \"taste death,\" experience the condition of death, the separation of his soul from his body, between the time he expired on the cross and the time he was raised again."
      }
],
    magisterialInputs: [
      {
        authority: 'Pope Benedict XVI',
        documentTitle: 'Way of the Cross at the Colosseum',
        citation: 'Good Friday 2006',
        insight: 'On the Cross, God Himself enters into the deepest misery of human sin and abandonment to drown it in the abyss of His divine love. Ave Crux, spes unica—Hail, O Cross, our only hope!'
      }
    ],
    inBrief: [
      "When Jesus had received the vinegar, he said, \"It is finished\"; and he bowed his head and gave up his spirit (John 19:30).",
      "On Good Friday, the spotless Lamb of God suffered the torments of the Cross to blot out the handwriting of our condemnation.",
      "The piercing of Christ's Sacred Heart on Calvary brought forth blood and water, the sacramental birth of the Catholic Church."
],
    meditationQuestion: 'Do I contemplate the crucifix with deep compunction, realizing that my personal sins caused those wounds?',
    practicalLiving: 'Venerate the crucifix in your home today: kneel and kiss the five Sacred Wounds of Jesus in silent adoration and gratitude.',
    crossReferences: [
      "John 18:1–19:42",
      "Isaiah 53:3-7",
      "CCC 608",
      "CCC 616"
]
  },
  'passion of our lord':   {
    gospelCitation: 'John 18:1–19:42',
    topicTitle: 'Good Friday of the Passion of the Lord: Behold the Wood of the Cross — Consummatum Est',
    topicSubtitle: 'He bowed his head and gave up his spirit: The Redemptive Sacrifice That Took Away the Sins of the World',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — Suffered Under Pontius Pilate',
    chapter: 'The Passion, Crucifixion, and Burial of Jesus Christ',
    paragraphsRange: 'Catechism of the Catholic Church 599, 608, 616, 624',
    catechismArticles: [
      {
            "number": 599,
            "title": "Jesus' Violent Death Was Part of the Mystery of God's Plan",
            "text": "Jesus' violent death was not the result of chance in an unfortunate sequence of events. It belongs to the mystery of God's plan, as St. Peter explains to the Jews of Jerusalem in his first sermon on Pentecost: \"This Jesus [was] delivered up according to the definite plan and foreknowledge of God.\" This biblical language does not mean that those who handed him over were merely passive players in a scenario written in advance by God."
      },
      {
            "number": 608,
            "title": "Behold the Lamb of God Who Takes Away the Sin of the World",
            "text": "After agreeing to baptize him along with the sinners, John the Baptist looked at Jesus and pointed him out as the \"Lamb of God, who takes away the sin of the world.\" By doing so, he reveals that Jesus is at the same time the suffering Servant who silently allows himself to be led to the slaughter and who bears the sin of the multitudes, and also the Paschal Lamb, the symbol of Israel's redemption at the first Passover."
      },
      {
            "number": 616,
            "title": "Christ's Sacrifice is Unique, Surpassing and Perfecting All Sacrifices",
            "text": "It is love \"to the end\" that confers on Christ's sacrifice its value as redemption and reparation, as atonement and satisfaction. He knew and loved us all when he offered his life. Now \"the love of Christ controls us, because we are convinced that one has died for all; therefore all have died.\" No man, not even the holiest, was ever able to take on himself the sins of all men and offer himself as a sacrifice for all."
      },
      {
            "number": 624,
            "title": "The Mystery of the Burial: In the Tomb from Good Friday to Easter Sunday",
            "text": "\"By the grace of God\" Jesus tasted death \"for every one.\" In his plan of salvation, God ordained that his Son should not only \"die for our sins\" but should also \"taste death,\" experience the condition of death, the separation of his soul from his body, between the time he expired on the cross and the time he was raised again."
      }
],
    magisterialInputs: [
      {
        authority: 'Pope Benedict XVI',
        documentTitle: 'Way of the Cross at the Colosseum',
        citation: 'Good Friday 2006',
        insight: 'On the Cross, God Himself enters into the deepest misery of human sin and abandonment to drown it in the abyss of His divine love. Ave Crux, spes unica—Hail, O Cross, our only hope!'
      }
    ],
    inBrief: [
      "When Jesus had received the vinegar, he said, \"It is finished\"; and he bowed his head and gave up his spirit (John 19:30).",
      "On Good Friday, the spotless Lamb of God suffered the torments of the Cross to blot out the handwriting of our condemnation.",
      "The piercing of Christ's Sacred Heart on Calvary brought forth blood and water, the sacramental birth of the Catholic Church."
],
    meditationQuestion: 'Do I contemplate the crucifix with deep compunction, realizing that my personal sins caused those wounds?',
    practicalLiving: 'Venerate the crucifix in your home today: kneel and kiss the five Sacred Wounds of Jesus in silent adoration and gratitude.',
    crossReferences: [
      "John 18:1–19:42",
      "Isaiah 53:3-7",
      "CCC 608",
      "CCC 616"
]
  },
  'john 15:1-8':   {
    gospelCitation: 'John 15:1-8',
    topicTitle: 'I Am the True Vine and You Are the Branches: Abiding in Christ Through Sanctifying Grace',
    topicSubtitle: 'He who abides in me, and I in him, he it is that bears much fruit, for apart from me you can do nothing',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Three: Life in Christ',
    section: 'Section Two: The Creed — The Mystical Body of Christ',
    chapter: 'The Church as the Vine & The Life of Grace',
    paragraphsRange: 'Catechism of the Catholic Church 755, 787, 1988, 2074',
    catechismArticles: [
      {
            "number": 755,
            "title": "The Church as the Cultivated Field and Choice Vineyard",
            "text": "The Church is a cultivated field, the tillage of God. On that land the ancient olive tree grows whose holy roots were the prophets and in which the reconciliation of Jews and Gentiles has been brought about and will be brought about again. That land, like a choice vineyard, has been planted by the heavenly cultivator. Yet the true vine is Christ who gives life and fruitfulness to the branches, that is, to us, who through the Church remain in him without whom we can do nothing."
      },
      {
            "number": 787,
            "title": "From the Beginning Jesus Associated Disciples with His Life",
            "text": "From the beginning, Jesus associated his disciples with his own life, revealed the mystery of the Kingdom to them, and gave them a share in his mission, joy, and sufferings. Jesus spoke of a still more intimate communion between him and those who would follow him: \"Abide in me, and I in you... I am the vine, you are the branches.\""
      },
      {
            "number": 2074,
            "title": "Bearing Fruit in the Spirit Through Union with the Vine",
            "text": "Jesus says: \"I am the vine, you are the branches. He who abides in me, and I in him, he it is that bears much fruit, for apart from me you can do nothing.\" The fruit of this vine is holiness of life, which flows from union with the true vine."
      }
],
    magisterialInputs: [
      {
            "authority": "Second Vatican Ecumenical Council",
            "documentTitle": "Dogmatic Constitution on the Church (Lumen Gentium)",
            "citation": "LG 6",
            "insight": "Christ is the true vine who imparts life and fruitfulness to the branches, that is, to us, who through the Church remain in Him, without whom we can do nothing."
      }
],
    inBrief: [
      "Apart from me you can do nothing (John 15:5).",
      "Sanctifying grace is the sap of divine life flowing from Christ the Vine into every soul in a state of grace.",
      "To bear lasting spiritual fruit, the Christian must abide intimately in Christ through prayer, the Sacraments, and holy charity."
],
    meditationQuestion: 'Am I trying to solve problems and bear fruit through mere human willpower rather than staying rooted in Christ through prayer?',
    practicalLiving: 'Examine whether you are in the state of grace; if not, go to Confession, and if so, thank the Lord for dwelling in your soul.',
    crossReferences: [
      "John 15:1-8",
      "Galatians 5:22-23",
      "CCC 755",
      "CCC 1988"
]
  },
  'jn 15:1-8':   {
    gospelCitation: 'John 15:1-8',
    topicTitle: 'I Am the True Vine and You Are the Branches: Abiding in Christ Through Sanctifying Grace',
    topicSubtitle: 'He who abides in me, and I in him, he it is that bears much fruit, for apart from me you can do nothing',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Three: Life in Christ',
    section: 'Section Two: The Creed — The Mystical Body of Christ',
    chapter: 'The Church as the Vine & The Life of Grace',
    paragraphsRange: 'Catechism of the Catholic Church 755, 787, 1988, 2074',
    catechismArticles: [
      {
            "number": 755,
            "title": "The Church as the Cultivated Field and Choice Vineyard",
            "text": "The Church is a cultivated field, the tillage of God. On that land the ancient olive tree grows whose holy roots were the prophets and in which the reconciliation of Jews and Gentiles has been brought about and will be brought about again. That land, like a choice vineyard, has been planted by the heavenly cultivator. Yet the true vine is Christ who gives life and fruitfulness to the branches, that is, to us, who through the Church remain in him without whom we can do nothing."
      },
      {
            "number": 787,
            "title": "From the Beginning Jesus Associated Disciples with His Life",
            "text": "From the beginning, Jesus associated his disciples with his own life, revealed the mystery of the Kingdom to them, and gave them a share in his mission, joy, and sufferings. Jesus spoke of a still more intimate communion between him and those who would follow him: \"Abide in me, and I in you... I am the vine, you are the branches.\""
      },
      {
            "number": 2074,
            "title": "Bearing Fruit in the Spirit Through Union with the Vine",
            "text": "Jesus says: \"I am the vine, you are the branches. He who abides in me, and I in him, he it is that bears much fruit, for apart from me you can do nothing.\" The fruit of this vine is holiness of life, which flows from union with the true vine."
      }
],
    magisterialInputs: [
      {
            "authority": "Second Vatican Ecumenical Council",
            "documentTitle": "Dogmatic Constitution on the Church (Lumen Gentium)",
            "citation": "LG 6",
            "insight": "Christ is the true vine who imparts life and fruitfulness to the branches, that is, to us, who through the Church remain in Him, without whom we can do nothing."
      }
],
    inBrief: [
      "Apart from me you can do nothing (John 15:5).",
      "Sanctifying grace is the sap of divine life flowing from Christ the Vine into every soul in a state of grace.",
      "To bear lasting spiritual fruit, the Christian must abide intimately in Christ through prayer, the Sacraments, and holy charity."
],
    meditationQuestion: 'Am I trying to solve problems and bear fruit through mere human willpower rather than staying rooted in Christ through prayer?',
    practicalLiving: 'Examine whether you are in the state of grace; if not, go to Confession, and if so, thank the Lord for dwelling in your soul.',
    crossReferences: [
      "John 15:1-8",
      "Galatians 5:22-23",
      "CCC 755",
      "CCC 1988"
]
  },
  'john 15:1':   {
    gospelCitation: 'John 15:1-8',
    topicTitle: 'I Am the True Vine and You Are the Branches: Abiding in Christ Through Sanctifying Grace',
    topicSubtitle: 'He who abides in me, and I in him, he it is that bears much fruit, for apart from me you can do nothing',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Three: Life in Christ',
    section: 'Section Two: The Creed — The Mystical Body of Christ',
    chapter: 'The Church as the Vine & The Life of Grace',
    paragraphsRange: 'Catechism of the Catholic Church 755, 787, 1988, 2074',
    catechismArticles: [
      {
            "number": 755,
            "title": "The Church as the Cultivated Field and Choice Vineyard",
            "text": "The Church is a cultivated field, the tillage of God. On that land the ancient olive tree grows whose holy roots were the prophets and in which the reconciliation of Jews and Gentiles has been brought about and will be brought about again. That land, like a choice vineyard, has been planted by the heavenly cultivator. Yet the true vine is Christ who gives life and fruitfulness to the branches, that is, to us, who through the Church remain in him without whom we can do nothing."
      },
      {
            "number": 787,
            "title": "From the Beginning Jesus Associated Disciples with His Life",
            "text": "From the beginning, Jesus associated his disciples with his own life, revealed the mystery of the Kingdom to them, and gave them a share in his mission, joy, and sufferings. Jesus spoke of a still more intimate communion between him and those who would follow him: \"Abide in me, and I in you... I am the vine, you are the branches.\""
      },
      {
            "number": 2074,
            "title": "Bearing Fruit in the Spirit Through Union with the Vine",
            "text": "Jesus says: \"I am the vine, you are the branches. He who abides in me, and I in him, he it is that bears much fruit, for apart from me you can do nothing.\" The fruit of this vine is holiness of life, which flows from union with the true vine."
      }
],
    magisterialInputs: [
      {
            "authority": "Second Vatican Ecumenical Council",
            "documentTitle": "Dogmatic Constitution on the Church (Lumen Gentium)",
            "citation": "LG 6",
            "insight": "Christ is the true vine who imparts life and fruitfulness to the branches, that is, to us, who through the Church remain in Him, without whom we can do nothing."
      }
],
    inBrief: [
      "Apart from me you can do nothing (John 15:5).",
      "Sanctifying grace is the sap of divine life flowing from Christ the Vine into every soul in a state of grace.",
      "To bear lasting spiritual fruit, the Christian must abide intimately in Christ through prayer, the Sacraments, and holy charity."
],
    meditationQuestion: 'Am I trying to solve problems and bear fruit through mere human willpower rather than staying rooted in Christ through prayer?',
    practicalLiving: 'Examine whether you are in the state of grace; if not, go to Confession, and if so, thank the Lord for dwelling in your soul.',
    crossReferences: [
      "John 15:1-8",
      "Galatians 5:22-23",
      "CCC 755",
      "CCC 1988"
]
  },
  'luke 24:13-35':   {
    gospelCitation: 'Luke 24:13-35',
    topicTitle: 'The Road to Emmaus: Burning Hearts, Sacred Scripture & The Breaking of the Bread',
    topicSubtitle: 'Did not our hearts burn within us while he talked to us on the road, while he opened to us the scriptures?',
    pillar: '',
    part: 'Part Two: The Celebration of the Christian Mystery',
    section: 'Section Two: The Seven Sacraments — The Eucharist',
    chapter: 'The Liturgy of the Word and The Liturgy of the Eucharist',
    paragraphsRange: 'Catechism of the Catholic Church 1329, 1346, 1347, 2605',
    catechismArticles: [
      {
            "number": 1329,
            "title": "The Lord's Supper and The Breaking of the Bread",
            "text": "The inexhaustible richness of this sacrament is expressed in the different names we give it. Each name evokes certain aspects of it. It is called: The Breaking of Bread, because Jesus used this rite, part of a Jewish meal, when as master of the table he blessed and distributed the bread, above all at the Last Supper. It is by this action that his disciples will recognize him after his Resurrection, and it is this expression that the first Christians will use to designate their Eucharistic assemblies."
      },
      {
            "number": 1346,
            "title": "The Eucharistic Liturgy Unfolds in Two Great Parts",
            "text": "The liturgy of the Eucharist unfolds according to a fundamental structure which has been preserved throughout the centuries down to our own day. It displays two great parts that form a fundamental unity: the gathering, the liturgy of the Word, with readings, homily and general intercessions; the liturgy of the Eucharist, with the presentation of the bread and wine, the consecratory thanksgiving, and communion. The liturgy of the Word and liturgy of the Eucharist together form \"one single act of worship.\""
      },
      {
            "number": 1347,
            "title": "The Structure of Holy Mass Evokes the Walk to Emmaus",
            "text": "Is this not the same movement as the Paschal meal of the risen Jesus with his disciples? Walking with them he explained the Scriptures to them; sitting with them at table \"he took bread, blessed and broke it, and gave it to them.\""
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Apostolic Letter Mane Nobiscum Domine (Stay With Us, Lord)",
            "citation": "MND 1",
            "insight": "The journey to Emmaus is a paradigm for every Christian generation. The Risen Lord walks alongside us in our confusion, sets our hearts ablaze with Sacred Scripture, and reveals His real presence in the breaking of the bread."
      }
],
    inBrief: [
      "And their eyes were opened and they recognized him; and he vanished out of their sight (Luke 24:31).",
      "The Holy Mass perfectly mirrors the Emmaus encounter: Christ speaks to us in the readings, then gives us Himself in Holy Communion.",
      "When our hearts feel cold or despondent, listening to the Word of God rekindles the supernatural fire of divine love."
],
    meditationQuestion: 'Does my heart burn with love when Sacred Scripture is proclaimed and explained at Sunday Mass?',
    practicalLiving: 'Pray the Emmaus aspiration today: "Mane nobiscum, Domine"—"Stay with us, Lord, for it is toward evening and the day is far spent."',
    crossReferences: [
      "Luke 24:13-35",
      "Dei Verbum 21",
      "CCC 1329",
      "CCC 1347"
]
  },
  'lk 24:13-35':   {
    gospelCitation: 'Luke 24:13-35',
    topicTitle: 'The Road to Emmaus: Burning Hearts, Sacred Scripture & The Breaking of the Bread',
    topicSubtitle: 'Did not our hearts burn within us while he talked to us on the road, while he opened to us the scriptures?',
    pillar: '',
    part: 'Part Two: The Celebration of the Christian Mystery',
    section: 'Section Two: The Seven Sacraments — The Eucharist',
    chapter: 'The Liturgy of the Word and The Liturgy of the Eucharist',
    paragraphsRange: 'Catechism of the Catholic Church 1329, 1346, 1347, 2605',
    catechismArticles: [
      {
            "number": 1329,
            "title": "The Lord's Supper and The Breaking of the Bread",
            "text": "The inexhaustible richness of this sacrament is expressed in the different names we give it. Each name evokes certain aspects of it. It is called: The Breaking of Bread, because Jesus used this rite, part of a Jewish meal, when as master of the table he blessed and distributed the bread, above all at the Last Supper. It is by this action that his disciples will recognize him after his Resurrection, and it is this expression that the first Christians will use to designate their Eucharistic assemblies."
      },
      {
            "number": 1346,
            "title": "The Eucharistic Liturgy Unfolds in Two Great Parts",
            "text": "The liturgy of the Eucharist unfolds according to a fundamental structure which has been preserved throughout the centuries down to our own day. It displays two great parts that form a fundamental unity: the gathering, the liturgy of the Word, with readings, homily and general intercessions; the liturgy of the Eucharist, with the presentation of the bread and wine, the consecratory thanksgiving, and communion. The liturgy of the Word and liturgy of the Eucharist together form \"one single act of worship.\""
      },
      {
            "number": 1347,
            "title": "The Structure of Holy Mass Evokes the Walk to Emmaus",
            "text": "Is this not the same movement as the Paschal meal of the risen Jesus with his disciples? Walking with them he explained the Scriptures to them; sitting with them at table \"he took bread, blessed and broke it, and gave it to them.\""
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Apostolic Letter Mane Nobiscum Domine (Stay With Us, Lord)",
            "citation": "MND 1",
            "insight": "The journey to Emmaus is a paradigm for every Christian generation. The Risen Lord walks alongside us in our confusion, sets our hearts ablaze with Sacred Scripture, and reveals His real presence in the breaking of the bread."
      }
],
    inBrief: [
      "And their eyes were opened and they recognized him; and he vanished out of their sight (Luke 24:31).",
      "The Holy Mass perfectly mirrors the Emmaus encounter: Christ speaks to us in the readings, then gives us Himself in Holy Communion.",
      "When our hearts feel cold or despondent, listening to the Word of God rekindles the supernatural fire of divine love."
],
    meditationQuestion: 'Does my heart burn with love when Sacred Scripture is proclaimed and explained at Sunday Mass?',
    practicalLiving: 'Pray the Emmaus aspiration today: "Mane nobiscum, Domine"—"Stay with us, Lord, for it is toward evening and the day is far spent."',
    crossReferences: [
      "Luke 24:13-35",
      "Dei Verbum 21",
      "CCC 1329",
      "CCC 1347"
]
  },
  'luke 24:13':   {
    gospelCitation: 'Luke 24:13-35',
    topicTitle: 'The Road to Emmaus: Burning Hearts, Sacred Scripture & The Breaking of the Bread',
    topicSubtitle: 'Did not our hearts burn within us while he talked to us on the road, while he opened to us the scriptures?',
    pillar: '',
    part: 'Part Two: The Celebration of the Christian Mystery',
    section: 'Section Two: The Seven Sacraments — The Eucharist',
    chapter: 'The Liturgy of the Word and The Liturgy of the Eucharist',
    paragraphsRange: 'Catechism of the Catholic Church 1329, 1346, 1347, 2605',
    catechismArticles: [
      {
            "number": 1329,
            "title": "The Lord's Supper and The Breaking of the Bread",
            "text": "The inexhaustible richness of this sacrament is expressed in the different names we give it. Each name evokes certain aspects of it. It is called: The Breaking of Bread, because Jesus used this rite, part of a Jewish meal, when as master of the table he blessed and distributed the bread, above all at the Last Supper. It is by this action that his disciples will recognize him after his Resurrection, and it is this expression that the first Christians will use to designate their Eucharistic assemblies."
      },
      {
            "number": 1346,
            "title": "The Eucharistic Liturgy Unfolds in Two Great Parts",
            "text": "The liturgy of the Eucharist unfolds according to a fundamental structure which has been preserved throughout the centuries down to our own day. It displays two great parts that form a fundamental unity: the gathering, the liturgy of the Word, with readings, homily and general intercessions; the liturgy of the Eucharist, with the presentation of the bread and wine, the consecratory thanksgiving, and communion. The liturgy of the Word and liturgy of the Eucharist together form \"one single act of worship.\""
      },
      {
            "number": 1347,
            "title": "The Structure of Holy Mass Evokes the Walk to Emmaus",
            "text": "Is this not the same movement as the Paschal meal of the risen Jesus with his disciples? Walking with them he explained the Scriptures to them; sitting with them at table \"he took bread, blessed and broke it, and gave it to them.\""
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Apostolic Letter Mane Nobiscum Domine (Stay With Us, Lord)",
            "citation": "MND 1",
            "insight": "The journey to Emmaus is a paradigm for every Christian generation. The Risen Lord walks alongside us in our confusion, sets our hearts ablaze with Sacred Scripture, and reveals His real presence in the breaking of the bread."
      }
],
    inBrief: [
      "And their eyes were opened and they recognized him; and he vanished out of their sight (Luke 24:31).",
      "The Holy Mass perfectly mirrors the Emmaus encounter: Christ speaks to us in the readings, then gives us Himself in Holy Communion.",
      "When our hearts feel cold or despondent, listening to the Word of God rekindles the supernatural fire of divine love."
],
    meditationQuestion: 'Does my heart burn with love when Sacred Scripture is proclaimed and explained at Sunday Mass?',
    practicalLiving: 'Pray the Emmaus aspiration today: "Mane nobiscum, Domine"—"Stay with us, Lord, for it is toward evening and the day is far spent."',
    crossReferences: [
      "Luke 24:13-35",
      "Dei Verbum 21",
      "CCC 1329",
      "CCC 1347"
]
  },
  'emmaus':   {
    gospelCitation: 'Luke 24:13-35',
    topicTitle: 'The Road to Emmaus: Burning Hearts, Sacred Scripture & The Breaking of the Bread',
    topicSubtitle: 'Did not our hearts burn within us while he talked to us on the road, while he opened to us the scriptures?',
    pillar: '',
    part: 'Part Two: The Celebration of the Christian Mystery',
    section: 'Section Two: The Seven Sacraments — The Eucharist',
    chapter: 'The Liturgy of the Word and The Liturgy of the Eucharist',
    paragraphsRange: 'Catechism of the Catholic Church 1329, 1346, 1347, 2605',
    catechismArticles: [
      {
            "number": 1329,
            "title": "The Lord's Supper and The Breaking of the Bread",
            "text": "The inexhaustible richness of this sacrament is expressed in the different names we give it. Each name evokes certain aspects of it. It is called: The Breaking of Bread, because Jesus used this rite, part of a Jewish meal, when as master of the table he blessed and distributed the bread, above all at the Last Supper. It is by this action that his disciples will recognize him after his Resurrection, and it is this expression that the first Christians will use to designate their Eucharistic assemblies."
      },
      {
            "number": 1346,
            "title": "The Eucharistic Liturgy Unfolds in Two Great Parts",
            "text": "The liturgy of the Eucharist unfolds according to a fundamental structure which has been preserved throughout the centuries down to our own day. It displays two great parts that form a fundamental unity: the gathering, the liturgy of the Word, with readings, homily and general intercessions; the liturgy of the Eucharist, with the presentation of the bread and wine, the consecratory thanksgiving, and communion. The liturgy of the Word and liturgy of the Eucharist together form \"one single act of worship.\""
      },
      {
            "number": 1347,
            "title": "The Structure of Holy Mass Evokes the Walk to Emmaus",
            "text": "Is this not the same movement as the Paschal meal of the risen Jesus with his disciples? Walking with them he explained the Scriptures to them; sitting with them at table \"he took bread, blessed and broke it, and gave it to them.\""
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Apostolic Letter Mane Nobiscum Domine (Stay With Us, Lord)",
            "citation": "MND 1",
            "insight": "The journey to Emmaus is a paradigm for every Christian generation. The Risen Lord walks alongside us in our confusion, sets our hearts ablaze with Sacred Scripture, and reveals His real presence in the breaking of the bread."
      }
],
    inBrief: [
      "And their eyes were opened and they recognized him; and he vanished out of their sight (Luke 24:31).",
      "The Holy Mass perfectly mirrors the Emmaus encounter: Christ speaks to us in the readings, then gives us Himself in Holy Communion.",
      "When our hearts feel cold or despondent, listening to the Word of God rekindles the supernatural fire of divine love."
],
    meditationQuestion: 'Does my heart burn with love when Sacred Scripture is proclaimed and explained at Sunday Mass?',
    practicalLiving: 'Pray the Emmaus aspiration today: "Mane nobiscum, Domine"—"Stay with us, Lord, for it is toward evening and the day is far spent."',
    crossReferences: [
      "Luke 24:13-35",
      "Dei Verbum 21",
      "CCC 1329",
      "CCC 1347"
]
  },
  'john 6:44-51':   {
    gospelCitation: 'John 6:44-51',
    topicTitle: 'The Bread of Life Discourse: "I Am the Living Bread Come Down from Heaven"',
    topicSubtitle: 'If any one eats of this bread, he will live for ever; and the bread which I shall give for the life of the world is my flesh',
    pillar: '',
    part: 'Part Two: The Celebration of the Christian Mystery',
    section: 'Section Two: The Seven Sacraments — The Holy Eucharist',
    chapter: 'The Sacramental Real Presence and Spiritual Effects of Holy Communion',
    paragraphsRange: 'Catechism of the Catholic Church 1333, 1336, 1391, 1405',
    catechismArticles: [
      {
            "number": 1333,
            "title": "At the Heart of the Eucharistic Celebration are the Bread and Wine",
            "text": "At the heart of the Eucharistic celebration are the bread and wine that, by the words of Christ and the invocation of the Holy Spirit, become Christ's Body and Blood. Faithful to the Lord's command the Church continues to do, in his memory and until his glorious return, what he did on the eve of his Passion: \"He took bread... He took the cup filled with wine...\" The signs of bread and wine become, in a way surpassing understanding, the Body and Blood of Christ."
      },
      {
            "number": 1336,
            "title": "The First Announcement of the Eucharist Divided Disciples",
            "text": "The first announcement of the Eucharist divided the disciples, just as the announcement of the Passion scandalized them: \"This is a hard saying; who can listen to it?\" The Eucharist and the Cross are stumbling blocks. It is the same mystery and it never ceases to be an occasion of division. \"Will you also go away?\": the Lord's question echoes through the ages, as a loving invitation to discover that only he has \"the words of eternal life.\""
      },
      {
            "number": 1391,
            "title": "Holy Communion Augments Our Union with Christ",
            "text": "Holy Communion augments our union with Christ. The principal fruit of receiving the Eucharist in Holy Communion is an intimate union with Christ Jesus. Indeed, the Lord says: \"He who eats my flesh and drinks my blood abides in me, and I in him.\" What material food produces in our bodily life, Holy Communion wonderfully achieves in our spiritual life."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Benedict XVI",
            "documentTitle": "Apostolic Exhortation Sacramentum Caritatis",
            "citation": "SCar 7",
            "insight": "In the sacrament of the altar, the Lord comes to meet human beings, created in God's image, and becomes their companion on the way. Here he truly gives his very flesh as food for our journey toward eternity."
      }
],
    inBrief: [
      "I am the living bread which came down from heaven; if any one eats of this bread, he will live for ever (John 6:51).",
      "The Holy Eucharist is not a mere symbol, but the real, true, and substantial Body, Blood, Soul, and Divinity of Jesus Christ.",
      "Worthily receiving Holy Communion preserves, increases, and renews the life of grace received at Baptism."
],
    meditationQuestion: 'Do I approach Holy Communion with profound adoration and clean conscience, having gone to Confession if needed?',
    practicalLiving: 'Make an act of profound thanksgiving after receiving Holy Communion or pray the Anima Christi today.',
    crossReferences: [
      "John 6:44-51",
      "1 Corinthians 10:16-17",
      "CCC 1336",
      "CCC 1391"
]
  },
  'jn 6:44-51':   {
    gospelCitation: 'John 6:44-51',
    topicTitle: 'The Bread of Life Discourse: "I Am the Living Bread Come Down from Heaven"',
    topicSubtitle: 'If any one eats of this bread, he will live for ever; and the bread which I shall give for the life of the world is my flesh',
    pillar: '',
    part: 'Part Two: The Celebration of the Christian Mystery',
    section: 'Section Two: The Seven Sacraments — The Holy Eucharist',
    chapter: 'The Sacramental Real Presence and Spiritual Effects of Holy Communion',
    paragraphsRange: 'Catechism of the Catholic Church 1333, 1336, 1391, 1405',
    catechismArticles: [
      {
            "number": 1333,
            "title": "At the Heart of the Eucharistic Celebration are the Bread and Wine",
            "text": "At the heart of the Eucharistic celebration are the bread and wine that, by the words of Christ and the invocation of the Holy Spirit, become Christ's Body and Blood. Faithful to the Lord's command the Church continues to do, in his memory and until his glorious return, what he did on the eve of his Passion: \"He took bread... He took the cup filled with wine...\" The signs of bread and wine become, in a way surpassing understanding, the Body and Blood of Christ."
      },
      {
            "number": 1336,
            "title": "The First Announcement of the Eucharist Divided Disciples",
            "text": "The first announcement of the Eucharist divided the disciples, just as the announcement of the Passion scandalized them: \"This is a hard saying; who can listen to it?\" The Eucharist and the Cross are stumbling blocks. It is the same mystery and it never ceases to be an occasion of division. \"Will you also go away?\": the Lord's question echoes through the ages, as a loving invitation to discover that only he has \"the words of eternal life.\""
      },
      {
            "number": 1391,
            "title": "Holy Communion Augments Our Union with Christ",
            "text": "Holy Communion augments our union with Christ. The principal fruit of receiving the Eucharist in Holy Communion is an intimate union with Christ Jesus. Indeed, the Lord says: \"He who eats my flesh and drinks my blood abides in me, and I in him.\" What material food produces in our bodily life, Holy Communion wonderfully achieves in our spiritual life."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Benedict XVI",
            "documentTitle": "Apostolic Exhortation Sacramentum Caritatis",
            "citation": "SCar 7",
            "insight": "In the sacrament of the altar, the Lord comes to meet human beings, created in God's image, and becomes their companion on the way. Here he truly gives his very flesh as food for our journey toward eternity."
      }
],
    inBrief: [
      "I am the living bread which came down from heaven; if any one eats of this bread, he will live for ever (John 6:51).",
      "The Holy Eucharist is not a mere symbol, but the real, true, and substantial Body, Blood, Soul, and Divinity of Jesus Christ.",
      "Worthily receiving Holy Communion preserves, increases, and renews the life of grace received at Baptism."
],
    meditationQuestion: 'Do I approach Holy Communion with profound adoration and clean conscience, having gone to Confession if needed?',
    practicalLiving: 'Make an act of profound thanksgiving after receiving Holy Communion or pray the Anima Christi today.',
    crossReferences: [
      "John 6:44-51",
      "1 Corinthians 10:16-17",
      "CCC 1336",
      "CCC 1391"
]
  },
  'john 6:44':   {
    gospelCitation: 'John 6:44-51',
    topicTitle: 'The Bread of Life Discourse: "I Am the Living Bread Come Down from Heaven"',
    topicSubtitle: 'If any one eats of this bread, he will live for ever; and the bread which I shall give for the life of the world is my flesh',
    pillar: '',
    part: 'Part Two: The Celebration of the Christian Mystery',
    section: 'Section Two: The Seven Sacraments — The Holy Eucharist',
    chapter: 'The Sacramental Real Presence and Spiritual Effects of Holy Communion',
    paragraphsRange: 'Catechism of the Catholic Church 1333, 1336, 1391, 1405',
    catechismArticles: [
      {
            "number": 1333,
            "title": "At the Heart of the Eucharistic Celebration are the Bread and Wine",
            "text": "At the heart of the Eucharistic celebration are the bread and wine that, by the words of Christ and the invocation of the Holy Spirit, become Christ's Body and Blood. Faithful to the Lord's command the Church continues to do, in his memory and until his glorious return, what he did on the eve of his Passion: \"He took bread... He took the cup filled with wine...\" The signs of bread and wine become, in a way surpassing understanding, the Body and Blood of Christ."
      },
      {
            "number": 1336,
            "title": "The First Announcement of the Eucharist Divided Disciples",
            "text": "The first announcement of the Eucharist divided the disciples, just as the announcement of the Passion scandalized them: \"This is a hard saying; who can listen to it?\" The Eucharist and the Cross are stumbling blocks. It is the same mystery and it never ceases to be an occasion of division. \"Will you also go away?\": the Lord's question echoes through the ages, as a loving invitation to discover that only he has \"the words of eternal life.\""
      },
      {
            "number": 1391,
            "title": "Holy Communion Augments Our Union with Christ",
            "text": "Holy Communion augments our union with Christ. The principal fruit of receiving the Eucharist in Holy Communion is an intimate union with Christ Jesus. Indeed, the Lord says: \"He who eats my flesh and drinks my blood abides in me, and I in him.\" What material food produces in our bodily life, Holy Communion wonderfully achieves in our spiritual life."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Benedict XVI",
            "documentTitle": "Apostolic Exhortation Sacramentum Caritatis",
            "citation": "SCar 7",
            "insight": "In the sacrament of the altar, the Lord comes to meet human beings, created in God's image, and becomes their companion on the way. Here he truly gives his very flesh as food for our journey toward eternity."
      }
],
    inBrief: [
      "I am the living bread which came down from heaven; if any one eats of this bread, he will live for ever (John 6:51).",
      "The Holy Eucharist is not a mere symbol, but the real, true, and substantial Body, Blood, Soul, and Divinity of Jesus Christ.",
      "Worthily receiving Holy Communion preserves, increases, and renews the life of grace received at Baptism."
],
    meditationQuestion: 'Do I approach Holy Communion with profound adoration and clean conscience, having gone to Confession if needed?',
    practicalLiving: 'Make an act of profound thanksgiving after receiving Holy Communion or pray the Anima Christi today.',
    crossReferences: [
      "John 6:44-51",
      "1 Corinthians 10:16-17",
      "CCC 1336",
      "CCC 1391"
]
  },
  'bread of life':   {
    gospelCitation: 'John 6:44-51',
    topicTitle: 'The Bread of Life Discourse: "I Am the Living Bread Come Down from Heaven"',
    topicSubtitle: 'If any one eats of this bread, he will live for ever; and the bread which I shall give for the life of the world is my flesh',
    pillar: '',
    part: 'Part Two: The Celebration of the Christian Mystery',
    section: 'Section Two: The Seven Sacraments — The Holy Eucharist',
    chapter: 'The Sacramental Real Presence and Spiritual Effects of Holy Communion',
    paragraphsRange: 'Catechism of the Catholic Church 1333, 1336, 1391, 1405',
    catechismArticles: [
      {
            "number": 1333,
            "title": "At the Heart of the Eucharistic Celebration are the Bread and Wine",
            "text": "At the heart of the Eucharistic celebration are the bread and wine that, by the words of Christ and the invocation of the Holy Spirit, become Christ's Body and Blood. Faithful to the Lord's command the Church continues to do, in his memory and until his glorious return, what he did on the eve of his Passion: \"He took bread... He took the cup filled with wine...\" The signs of bread and wine become, in a way surpassing understanding, the Body and Blood of Christ."
      },
      {
            "number": 1336,
            "title": "The First Announcement of the Eucharist Divided Disciples",
            "text": "The first announcement of the Eucharist divided the disciples, just as the announcement of the Passion scandalized them: \"This is a hard saying; who can listen to it?\" The Eucharist and the Cross are stumbling blocks. It is the same mystery and it never ceases to be an occasion of division. \"Will you also go away?\": the Lord's question echoes through the ages, as a loving invitation to discover that only he has \"the words of eternal life.\""
      },
      {
            "number": 1391,
            "title": "Holy Communion Augments Our Union with Christ",
            "text": "Holy Communion augments our union with Christ. The principal fruit of receiving the Eucharist in Holy Communion is an intimate union with Christ Jesus. Indeed, the Lord says: \"He who eats my flesh and drinks my blood abides in me, and I in him.\" What material food produces in our bodily life, Holy Communion wonderfully achieves in our spiritual life."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Benedict XVI",
            "documentTitle": "Apostolic Exhortation Sacramentum Caritatis",
            "citation": "SCar 7",
            "insight": "In the sacrament of the altar, the Lord comes to meet human beings, created in God's image, and becomes their companion on the way. Here he truly gives his very flesh as food for our journey toward eternity."
      }
],
    inBrief: [
      "I am the living bread which came down from heaven; if any one eats of this bread, he will live for ever (John 6:51).",
      "The Holy Eucharist is not a mere symbol, but the real, true, and substantial Body, Blood, Soul, and Divinity of Jesus Christ.",
      "Worthily receiving Holy Communion preserves, increases, and renews the life of grace received at Baptism."
],
    meditationQuestion: 'Do I approach Holy Communion with profound adoration and clean conscience, having gone to Confession if needed?',
    practicalLiving: 'Make an act of profound thanksgiving after receiving Holy Communion or pray the Anima Christi today.',
    crossReferences: [
      "John 6:44-51",
      "1 Corinthians 10:16-17",
      "CCC 1336",
      "CCC 1391"
]
  },
  'john 20:19-31':   {
    gospelCitation: 'John 20:19-31',
    topicTitle: 'Divine Mercy Sunday: "My Lord and My God!" & The Power to Forgive Sins',
    topicSubtitle: 'Peace be with you. As the Father has sent me, even so I send you. Receive the Holy Spirit: If you forgive the sins of any, they are forgiven',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Two: The Sacraments of Faith',
    section: 'Section Two: The Seven Sacraments — Penance',
    chapter: 'The Institution of the Sacrament of Penance and Divine Mercy',
    paragraphsRange: 'Catechism of the Catholic Church 644, 1441, 1442, 2088',
    catechismArticles: [
      {
            "number": 644,
            "title": "Even Faced with the Reality of the Risen Jesus the Disciples Still Doubted",
            "text": "Even faced with the reality of the risen Jesus the disciples are still doubtful, so impossible did the thing seem: they thought they were seeing a ghost. \"In their joy they were still disbelieving and still wondering.\" Thomas will also experience the test of doubt and for the last time the disciples will doubt when Jesus appears to them in Galilee before his Ascension. Therefore the hypothesis that the Resurrection was produced by the apostles' faith will not hold."
      },
      {
            "number": 1441,
            "title": "Only God Forgives Sins",
            "text": "Only God forgives sins. Since he is the Son of God, Jesus says of himself, \"The Son of man has authority on earth to forgive sins\" and exercises this divine power: \"Your sins are forgiven.\" Further, by virtue of his divine authority he gives this power to men to exercise in his name."
      },
      {
            "number": 1442,
            "title": "Christ Willed that His Church Should Continue His Work of Forgiveness",
            "text": "Christ has willed that in her prayer and life and action his whole Church should be the sign and instrument of the forgiveness and reconciliation that he acquired for us at the price of his blood. But he entrusted the exercise of the power of absolution to the apostolic ministry which he charged with the \"ministry of reconciliation.\""
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Homily for the Canonization of St. Faustina Kowalska",
            "citation": "April 30, 2000",
            "insight": "Divine Mercy reaches man through the Heart of Christ crucified. By instituting the Feast of Divine Mercy on the Second Sunday of Easter, the Church invites all humanity to drink deeply from the ocean of grace flowing from the pierced Heart of Jesus."
      }
],
    inBrief: [
      "Jesus came and stood among them and said to them, \"Peace be with you... Receive the Holy Spirit. If you forgive the sins of any, they are forgiven\" (John 20:19, 22-23).",
      "The Risen Lord instituted the Sacrament of Penance on Easter evening as His first gift of reconciliation.",
      "Thomas's cry of faith, \"My Lord and my God!\", is the most perfect confession of Christ's true Divinity."
],
    meditationQuestion: 'Do I trust in the fathomless mercy of God, or do I let doubts and guilt keep me away from His embrace?',
    practicalLiving: 'Pray the Chaplet of Divine Mercy at 3:00 PM today, offering Christ\'s Passion for the forgiveness of sins and for the whole world.',
    crossReferences: [
      "John 20:19-31",
      "Psalm 118:1-4",
      "CCC 1441",
      "CCC 1442"
]
  },
  'jn 20:19-31':   {
    gospelCitation: 'John 20:19-31',
    topicTitle: 'Divine Mercy Sunday: "My Lord and My God!" & The Power to Forgive Sins',
    topicSubtitle: 'Peace be with you. As the Father has sent me, even so I send you. Receive the Holy Spirit: If you forgive the sins of any, they are forgiven',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Two: The Sacraments of Faith',
    section: 'Section Two: The Seven Sacraments — Penance',
    chapter: 'The Institution of the Sacrament of Penance and Divine Mercy',
    paragraphsRange: 'Catechism of the Catholic Church 644, 1441, 1442, 2088',
    catechismArticles: [
      {
            "number": 644,
            "title": "Even Faced with the Reality of the Risen Jesus the Disciples Still Doubted",
            "text": "Even faced with the reality of the risen Jesus the disciples are still doubtful, so impossible did the thing seem: they thought they were seeing a ghost. \"In their joy they were still disbelieving and still wondering.\" Thomas will also experience the test of doubt and for the last time the disciples will doubt when Jesus appears to them in Galilee before his Ascension. Therefore the hypothesis that the Resurrection was produced by the apostles' faith will not hold."
      },
      {
            "number": 1441,
            "title": "Only God Forgives Sins",
            "text": "Only God forgives sins. Since he is the Son of God, Jesus says of himself, \"The Son of man has authority on earth to forgive sins\" and exercises this divine power: \"Your sins are forgiven.\" Further, by virtue of his divine authority he gives this power to men to exercise in his name."
      },
      {
            "number": 1442,
            "title": "Christ Willed that His Church Should Continue His Work of Forgiveness",
            "text": "Christ has willed that in her prayer and life and action his whole Church should be the sign and instrument of the forgiveness and reconciliation that he acquired for us at the price of his blood. But he entrusted the exercise of the power of absolution to the apostolic ministry which he charged with the \"ministry of reconciliation.\""
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Homily for the Canonization of St. Faustina Kowalska",
            "citation": "April 30, 2000",
            "insight": "Divine Mercy reaches man through the Heart of Christ crucified. By instituting the Feast of Divine Mercy on the Second Sunday of Easter, the Church invites all humanity to drink deeply from the ocean of grace flowing from the pierced Heart of Jesus."
      }
],
    inBrief: [
      "Jesus came and stood among them and said to them, \"Peace be with you... Receive the Holy Spirit. If you forgive the sins of any, they are forgiven\" (John 20:19, 22-23).",
      "The Risen Lord instituted the Sacrament of Penance on Easter evening as His first gift of reconciliation.",
      "Thomas's cry of faith, \"My Lord and my God!\", is the most perfect confession of Christ's true Divinity."
],
    meditationQuestion: 'Do I trust in the fathomless mercy of God, or do I let doubts and guilt keep me away from His embrace?',
    practicalLiving: 'Pray the Chaplet of Divine Mercy at 3:00 PM today, offering Christ\'s Passion for the forgiveness of sins and for the whole world.',
    crossReferences: [
      "John 20:19-31",
      "Psalm 118:1-4",
      "CCC 1441",
      "CCC 1442"
]
  },
  'john 20:19':   {
    gospelCitation: 'John 20:19-31',
    topicTitle: 'Divine Mercy Sunday: "My Lord and My God!" & The Power to Forgive Sins',
    topicSubtitle: 'Peace be with you. As the Father has sent me, even so I send you. Receive the Holy Spirit: If you forgive the sins of any, they are forgiven',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Two: The Sacraments of Faith',
    section: 'Section Two: The Seven Sacraments — Penance',
    chapter: 'The Institution of the Sacrament of Penance and Divine Mercy',
    paragraphsRange: 'Catechism of the Catholic Church 644, 1441, 1442, 2088',
    catechismArticles: [
      {
            "number": 644,
            "title": "Even Faced with the Reality of the Risen Jesus the Disciples Still Doubted",
            "text": "Even faced with the reality of the risen Jesus the disciples are still doubtful, so impossible did the thing seem: they thought they were seeing a ghost. \"In their joy they were still disbelieving and still wondering.\" Thomas will also experience the test of doubt and for the last time the disciples will doubt when Jesus appears to them in Galilee before his Ascension. Therefore the hypothesis that the Resurrection was produced by the apostles' faith will not hold."
      },
      {
            "number": 1441,
            "title": "Only God Forgives Sins",
            "text": "Only God forgives sins. Since he is the Son of God, Jesus says of himself, \"The Son of man has authority on earth to forgive sins\" and exercises this divine power: \"Your sins are forgiven.\" Further, by virtue of his divine authority he gives this power to men to exercise in his name."
      },
      {
            "number": 1442,
            "title": "Christ Willed that His Church Should Continue His Work of Forgiveness",
            "text": "Christ has willed that in her prayer and life and action his whole Church should be the sign and instrument of the forgiveness and reconciliation that he acquired for us at the price of his blood. But he entrusted the exercise of the power of absolution to the apostolic ministry which he charged with the \"ministry of reconciliation.\""
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Homily for the Canonization of St. Faustina Kowalska",
            "citation": "April 30, 2000",
            "insight": "Divine Mercy reaches man through the Heart of Christ crucified. By instituting the Feast of Divine Mercy on the Second Sunday of Easter, the Church invites all humanity to drink deeply from the ocean of grace flowing from the pierced Heart of Jesus."
      }
],
    inBrief: [
      "Jesus came and stood among them and said to them, \"Peace be with you... Receive the Holy Spirit. If you forgive the sins of any, they are forgiven\" (John 20:19, 22-23).",
      "The Risen Lord instituted the Sacrament of Penance on Easter evening as His first gift of reconciliation.",
      "Thomas's cry of faith, \"My Lord and my God!\", is the most perfect confession of Christ's true Divinity."
],
    meditationQuestion: 'Do I trust in the fathomless mercy of God, or do I let doubts and guilt keep me away from His embrace?',
    practicalLiving: 'Pray the Chaplet of Divine Mercy at 3:00 PM today, offering Christ\'s Passion for the forgiveness of sins and for the whole world.',
    crossReferences: [
      "John 20:19-31",
      "Psalm 118:1-4",
      "CCC 1441",
      "CCC 1442"
]
  },
  'divine mercy sunday':   {
    gospelCitation: 'John 20:19-31',
    topicTitle: 'Divine Mercy Sunday: "My Lord and My God!" & The Power to Forgive Sins',
    topicSubtitle: 'Peace be with you. As the Father has sent me, even so I send you. Receive the Holy Spirit: If you forgive the sins of any, they are forgiven',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Two: The Sacraments of Faith',
    section: 'Section Two: The Seven Sacraments — Penance',
    chapter: 'The Institution of the Sacrament of Penance and Divine Mercy',
    paragraphsRange: 'Catechism of the Catholic Church 644, 1441, 1442, 2088',
    catechismArticles: [
      {
            "number": 644,
            "title": "Even Faced with the Reality of the Risen Jesus the Disciples Still Doubted",
            "text": "Even faced with the reality of the risen Jesus the disciples are still doubtful, so impossible did the thing seem: they thought they were seeing a ghost. \"In their joy they were still disbelieving and still wondering.\" Thomas will also experience the test of doubt and for the last time the disciples will doubt when Jesus appears to them in Galilee before his Ascension. Therefore the hypothesis that the Resurrection was produced by the apostles' faith will not hold."
      },
      {
            "number": 1441,
            "title": "Only God Forgives Sins",
            "text": "Only God forgives sins. Since he is the Son of God, Jesus says of himself, \"The Son of man has authority on earth to forgive sins\" and exercises this divine power: \"Your sins are forgiven.\" Further, by virtue of his divine authority he gives this power to men to exercise in his name."
      },
      {
            "number": 1442,
            "title": "Christ Willed that His Church Should Continue His Work of Forgiveness",
            "text": "Christ has willed that in her prayer and life and action his whole Church should be the sign and instrument of the forgiveness and reconciliation that he acquired for us at the price of his blood. But he entrusted the exercise of the power of absolution to the apostolic ministry which he charged with the \"ministry of reconciliation.\""
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Homily for the Canonization of St. Faustina Kowalska",
            "citation": "April 30, 2000",
            "insight": "Divine Mercy reaches man through the Heart of Christ crucified. By instituting the Feast of Divine Mercy on the Second Sunday of Easter, the Church invites all humanity to drink deeply from the ocean of grace flowing from the pierced Heart of Jesus."
      }
],
    inBrief: [
      "Jesus came and stood among them and said to them, \"Peace be with you... Receive the Holy Spirit. If you forgive the sins of any, they are forgiven\" (John 20:19, 22-23).",
      "The Risen Lord instituted the Sacrament of Penance on Easter evening as His first gift of reconciliation.",
      "Thomas's cry of faith, \"My Lord and my God!\", is the most perfect confession of Christ's true Divinity."
],
    meditationQuestion: 'Do I trust in the fathomless mercy of God, or do I let doubts and guilt keep me away from His embrace?',
    practicalLiving: 'Pray the Chaplet of Divine Mercy at 3:00 PM today, offering Christ\'s Passion for the forgiveness of sins and for the whole world.',
    crossReferences: [
      "John 20:19-31",
      "Psalm 118:1-4",
      "CCC 1441",
      "CCC 1442"
]
  },
  'doubting thomas':   {
    gospelCitation: 'John 20:19-31',
    topicTitle: 'Divine Mercy Sunday: "My Lord and My God!" & The Power to Forgive Sins',
    topicSubtitle: 'Peace be with you. As the Father has sent me, even so I send you. Receive the Holy Spirit: If you forgive the sins of any, they are forgiven',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Two: The Sacraments of Faith',
    section: 'Section Two: The Seven Sacraments — Penance',
    chapter: 'The Institution of the Sacrament of Penance and Divine Mercy',
    paragraphsRange: 'Catechism of the Catholic Church 644, 1441, 1442, 2088',
    catechismArticles: [
      {
            "number": 644,
            "title": "Even Faced with the Reality of the Risen Jesus the Disciples Still Doubted",
            "text": "Even faced with the reality of the risen Jesus the disciples are still doubtful, so impossible did the thing seem: they thought they were seeing a ghost. \"In their joy they were still disbelieving and still wondering.\" Thomas will also experience the test of doubt and for the last time the disciples will doubt when Jesus appears to them in Galilee before his Ascension. Therefore the hypothesis that the Resurrection was produced by the apostles' faith will not hold."
      },
      {
            "number": 1441,
            "title": "Only God Forgives Sins",
            "text": "Only God forgives sins. Since he is the Son of God, Jesus says of himself, \"The Son of man has authority on earth to forgive sins\" and exercises this divine power: \"Your sins are forgiven.\" Further, by virtue of his divine authority he gives this power to men to exercise in his name."
      },
      {
            "number": 1442,
            "title": "Christ Willed that His Church Should Continue His Work of Forgiveness",
            "text": "Christ has willed that in her prayer and life and action his whole Church should be the sign and instrument of the forgiveness and reconciliation that he acquired for us at the price of his blood. But he entrusted the exercise of the power of absolution to the apostolic ministry which he charged with the \"ministry of reconciliation.\""
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. John Paul II",
            "documentTitle": "Homily for the Canonization of St. Faustina Kowalska",
            "citation": "April 30, 2000",
            "insight": "Divine Mercy reaches man through the Heart of Christ crucified. By instituting the Feast of Divine Mercy on the Second Sunday of Easter, the Church invites all humanity to drink deeply from the ocean of grace flowing from the pierced Heart of Jesus."
      }
],
    inBrief: [
      "Jesus came and stood among them and said to them, \"Peace be with you... Receive the Holy Spirit. If you forgive the sins of any, they are forgiven\" (John 20:19, 22-23).",
      "The Risen Lord instituted the Sacrament of Penance on Easter evening as His first gift of reconciliation.",
      "Thomas's cry of faith, \"My Lord and my God!\", is the most perfect confession of Christ's true Divinity."
],
    meditationQuestion: 'Do I trust in the fathomless mercy of God, or do I let doubts and guilt keep me away from His embrace?',
    practicalLiving: 'Pray the Chaplet of Divine Mercy at 3:00 PM today, offering Christ\'s Passion for the forgiveness of sins and for the whole world.',
    crossReferences: [
      "John 20:19-31",
      "Psalm 118:1-4",
      "CCC 1441",
      "CCC 1442"
]
  },
  'matthew 28:16-20':   {
    gospelCitation: 'Matthew 28:16-20',
    topicTitle: 'The Ascension of the Lord: The Great Commission — "Go, Make Disciples of All Nations"',
    topicSubtitle: 'All authority in heaven and on earth has been given to me: I am with you always, to the close of the age',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Ascension into Heaven',
    chapter: 'He Ascended into Heaven and Sits at the Right Hand of the Father',
    paragraphsRange: 'Catechism of the Catholic Church 659, 664, 668, 857',
    catechismArticles: [
      {
            "number": 659,
            "title": "The Final Apparition of Jesus and His Glorious Ascension",
            "text": "\"So then the Lord Jesus, after he had spoken to them, was taken up into heaven, and sat down at the right hand of God.\" Christ's body was glorified at the moment of his Resurrection, as proved by the new and supernatural properties it subsequently and permanently enjoys. But during the forty days when he eats and drinks familiarly with his disciples and teaches them about the kingdom, his glory remains veiled under the appearance of ordinary humanity."
      },
      {
            "number": 664,
            "title": "Sitting at the Right Hand of the Father Signifies Inauguration of the Messiah's Kingdom",
            "text": "Being seated at the Father's right hand signifies the inauguration of the Messiah's kingdom, the fulfillment of the prophet Daniel's vision concerning the Son of Man: \"To him was given dominion and glory and kingdom, that all peoples, nations, and languages should serve him; his dominion is an everlasting dominion, which shall not pass away.\""
      },
      {
            "number": 857,
            "title": "The Church is Apostolic, Sent Forth to All Nations",
            "text": "The Church is apostolic because she was and remains built on \"the foundation of the Apostles,\" the witnesses chosen and sent on mission by Christ himself, continuing to be taught, sanctified, and guided by them through their successors the bishops."
      }
],
    magisterialInputs: [
      {
        authority: 'Pope St. Leo the Great',
        documentTitle: 'Sermon on the Ascension of the Lord',
        citation: 'Sermo 74',
        insight: 'What was visible in our Redeemer has passed over into the Sacraments. Christ did not abandon us by ascending to heaven; rather, our human nature was exalted above all the choirs of angels to the right hand of God.'
      }
    ],
    inBrief: [
      "Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit (Matthew 28:19).",
      "By ascending into heaven, Christ our High Priest intercedes ceaselessly for us before the Father.",
      "Christ promises to remain with His Catholic Church always, even unto the end of the world."
],
    meditationQuestion: 'Do I set my mind on things that are above where Christ is seated, or am I entirely weighed down by earthly concerns?',
    practicalLiving: 'Renew your baptismal faith by making a fervent Sign of the Cross: "In the name of the Father, and of the Son, and of the Holy Spirit. Amen."',
    crossReferences: [
      "Matthew 28:16-20",
      "Acts 1:9-11",
      "CCC 659",
      "CCC 664"
]
  },
  'mt 28:16-20':   {
    gospelCitation: 'Matthew 28:16-20',
    topicTitle: 'The Ascension of the Lord: The Great Commission — "Go, Make Disciples of All Nations"',
    topicSubtitle: 'All authority in heaven and on earth has been given to me: I am with you always, to the close of the age',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Ascension into Heaven',
    chapter: 'He Ascended into Heaven and Sits at the Right Hand of the Father',
    paragraphsRange: 'Catechism of the Catholic Church 659, 664, 668, 857',
    catechismArticles: [
      {
            "number": 659,
            "title": "The Final Apparition of Jesus and His Glorious Ascension",
            "text": "\"So then the Lord Jesus, after he had spoken to them, was taken up into heaven, and sat down at the right hand of God.\" Christ's body was glorified at the moment of his Resurrection, as proved by the new and supernatural properties it subsequently and permanently enjoys. But during the forty days when he eats and drinks familiarly with his disciples and teaches them about the kingdom, his glory remains veiled under the appearance of ordinary humanity."
      },
      {
            "number": 664,
            "title": "Sitting at the Right Hand of the Father Signifies Inauguration of the Messiah's Kingdom",
            "text": "Being seated at the Father's right hand signifies the inauguration of the Messiah's kingdom, the fulfillment of the prophet Daniel's vision concerning the Son of Man: \"To him was given dominion and glory and kingdom, that all peoples, nations, and languages should serve him; his dominion is an everlasting dominion, which shall not pass away.\""
      },
      {
            "number": 857,
            "title": "The Church is Apostolic, Sent Forth to All Nations",
            "text": "The Church is apostolic because she was and remains built on \"the foundation of the Apostles,\" the witnesses chosen and sent on mission by Christ himself, continuing to be taught, sanctified, and guided by them through their successors the bishops."
      }
],
    magisterialInputs: [
      {
        authority: 'Pope St. Leo the Great',
        documentTitle: 'Sermon on the Ascension of the Lord',
        citation: 'Sermo 74',
        insight: 'What was visible in our Redeemer has passed over into the Sacraments. Christ did not abandon us by ascending to heaven; rather, our human nature was exalted above all the choirs of angels to the right hand of God.'
      }
    ],
    inBrief: [
      "Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit (Matthew 28:19).",
      "By ascending into heaven, Christ our High Priest intercedes ceaselessly for us before the Father.",
      "Christ promises to remain with His Catholic Church always, even unto the end of the world."
],
    meditationQuestion: 'Do I set my mind on things that are above where Christ is seated, or am I entirely weighed down by earthly concerns?',
    practicalLiving: 'Renew your baptismal faith by making a fervent Sign of the Cross: "In the name of the Father, and of the Son, and of the Holy Spirit. Amen."',
    crossReferences: [
      "Matthew 28:16-20",
      "Acts 1:9-11",
      "CCC 659",
      "CCC 664"
]
  },
  'matthew 28:16':   {
    gospelCitation: 'Matthew 28:16-20',
    topicTitle: 'The Ascension of the Lord: The Great Commission — "Go, Make Disciples of All Nations"',
    topicSubtitle: 'All authority in heaven and on earth has been given to me: I am with you always, to the close of the age',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Ascension into Heaven',
    chapter: 'He Ascended into Heaven and Sits at the Right Hand of the Father',
    paragraphsRange: 'Catechism of the Catholic Church 659, 664, 668, 857',
    catechismArticles: [
      {
            "number": 659,
            "title": "The Final Apparition of Jesus and His Glorious Ascension",
            "text": "\"So then the Lord Jesus, after he had spoken to them, was taken up into heaven, and sat down at the right hand of God.\" Christ's body was glorified at the moment of his Resurrection, as proved by the new and supernatural properties it subsequently and permanently enjoys. But during the forty days when he eats and drinks familiarly with his disciples and teaches them about the kingdom, his glory remains veiled under the appearance of ordinary humanity."
      },
      {
            "number": 664,
            "title": "Sitting at the Right Hand of the Father Signifies Inauguration of the Messiah's Kingdom",
            "text": "Being seated at the Father's right hand signifies the inauguration of the Messiah's kingdom, the fulfillment of the prophet Daniel's vision concerning the Son of Man: \"To him was given dominion and glory and kingdom, that all peoples, nations, and languages should serve him; his dominion is an everlasting dominion, which shall not pass away.\""
      },
      {
            "number": 857,
            "title": "The Church is Apostolic, Sent Forth to All Nations",
            "text": "The Church is apostolic because she was and remains built on \"the foundation of the Apostles,\" the witnesses chosen and sent on mission by Christ himself, continuing to be taught, sanctified, and guided by them through their successors the bishops."
      }
],
    magisterialInputs: [
      {
        authority: 'Pope St. Leo the Great',
        documentTitle: 'Sermon on the Ascension of the Lord',
        citation: 'Sermo 74',
        insight: 'What was visible in our Redeemer has passed over into the Sacraments. Christ did not abandon us by ascending to heaven; rather, our human nature was exalted above all the choirs of angels to the right hand of God.'
      }
    ],
    inBrief: [
      "Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit (Matthew 28:19).",
      "By ascending into heaven, Christ our High Priest intercedes ceaselessly for us before the Father.",
      "Christ promises to remain with His Catholic Church always, even unto the end of the world."
],
    meditationQuestion: 'Do I set my mind on things that are above where Christ is seated, or am I entirely weighed down by earthly concerns?',
    practicalLiving: 'Renew your baptismal faith by making a fervent Sign of the Cross: "In the name of the Father, and of the Son, and of the Holy Spirit. Amen."',
    crossReferences: [
      "Matthew 28:16-20",
      "Acts 1:9-11",
      "CCC 659",
      "CCC 664"
]
  },
  'ascension':   {
    gospelCitation: 'Matthew 28:16-20',
    topicTitle: 'The Ascension of the Lord: The Great Commission — "Go, Make Disciples of All Nations"',
    topicSubtitle: 'All authority in heaven and on earth has been given to me: I am with you always, to the close of the age',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Ascension into Heaven',
    chapter: 'He Ascended into Heaven and Sits at the Right Hand of the Father',
    paragraphsRange: 'Catechism of the Catholic Church 659, 664, 668, 857',
    catechismArticles: [
      {
            "number": 659,
            "title": "The Final Apparition of Jesus and His Glorious Ascension",
            "text": "\"So then the Lord Jesus, after he had spoken to them, was taken up into heaven, and sat down at the right hand of God.\" Christ's body was glorified at the moment of his Resurrection, as proved by the new and supernatural properties it subsequently and permanently enjoys. But during the forty days when he eats and drinks familiarly with his disciples and teaches them about the kingdom, his glory remains veiled under the appearance of ordinary humanity."
      },
      {
            "number": 664,
            "title": "Sitting at the Right Hand of the Father Signifies Inauguration of the Messiah's Kingdom",
            "text": "Being seated at the Father's right hand signifies the inauguration of the Messiah's kingdom, the fulfillment of the prophet Daniel's vision concerning the Son of Man: \"To him was given dominion and glory and kingdom, that all peoples, nations, and languages should serve him; his dominion is an everlasting dominion, which shall not pass away.\""
      },
      {
            "number": 857,
            "title": "The Church is Apostolic, Sent Forth to All Nations",
            "text": "The Church is apostolic because she was and remains built on \"the foundation of the Apostles,\" the witnesses chosen and sent on mission by Christ himself, continuing to be taught, sanctified, and guided by them through their successors the bishops."
      }
],
    magisterialInputs: [
      {
        authority: 'Pope St. Leo the Great',
        documentTitle: 'Sermon on the Ascension of the Lord',
        citation: 'Sermo 74',
        insight: 'What was visible in our Redeemer has passed over into the Sacraments. Christ did not abandon us by ascending to heaven; rather, our human nature was exalted above all the choirs of angels to the right hand of God.'
      }
    ],
    inBrief: [
      "Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit (Matthew 28:19).",
      "By ascending into heaven, Christ our High Priest intercedes ceaselessly for us before the Father.",
      "Christ promises to remain with His Catholic Church always, even unto the end of the world."
],
    meditationQuestion: 'Do I set my mind on things that are above where Christ is seated, or am I entirely weighed down by earthly concerns?',
    practicalLiving: 'Renew your baptismal faith by making a fervent Sign of the Cross: "In the name of the Father, and of the Son, and of the Holy Spirit. Amen."',
    crossReferences: [
      "Matthew 28:16-20",
      "Acts 1:9-11",
      "CCC 659",
      "CCC 664"
]
  },
  'john 20:19-23':   {
    gospelCitation: 'John 20:19-23',
    topicTitle: 'Pentecost Sunday: The Outpouring of the Holy Spirit and The Birth of the Church',
    topicSubtitle: 'He breathed on them, and said to them, "Receive the Holy Spirit": The Sanctifier and Soul of the Church',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — I Believe in the Holy Spirit',
    chapter: 'The Spirit and the Church in the Last Days — Pentecost',
    paragraphsRange: 'Catechism of the Catholic Church 731, 732, 737, 1287',
    catechismArticles: [
      {
            "number": 731,
            "title": "On the Day of Pentecost Christ's Passover Was Fulfilled",
            "text": "On the day of Pentecost when the seven weeks of Easter had come to an end, Christ's Passover is fulfilled in the outpouring of the Holy Spirit, manifested, given, and communicated as a divine person: of his fullness, Christ, the Lord, pours out the Spirit in abundance."
      },
      {
            "number": 732,
            "title": "On That Day the Holy Trinity is Fully Revealed",
            "text": "On that day, the Holy Trinity is fully revealed. Since that day, the Kingdom announced by Christ has been open to those who believe in him: in the humility of the flesh and in faith, they already share in the communion of the Holy Trinity. By his coming, which never ceases, the Holy Spirit causes the world to enter into the \"last days\", the time of the Church."
      },
      {
            "number": 737,
            "title": "The Holy Spirit Prepares Men and Draws Them to Christ",
            "text": "The mission of Christ and the Holy Spirit is brought to completion in the Church, which is the Body of Christ and the Temple of the Holy Spirit. This joint mission henceforth brings Christ's faithful to share in his communion with the Father in the Holy Spirit. The Spirit prepares men and goes out to them with his grace, in order to draw them to Christ."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Leo XIII",
            "documentTitle": "Encyclical Divinum Illud Munus (On the Holy Spirit)",
            "citation": "DIM 9",
            "insight": "Let it suffice to state that, as Christ is the Head of the Church, so is the Holy Ghost her soul: \"What the soul is in our body, that is the Holy Ghost in the Body of Christ, the Church.\""
      }
],
    inBrief: [
      "Receive the Holy Spirit (John 20:22).",
      "Pentecost is the solemn public manifestation of the Catholic Church and the universal outpouring of divine charity.",
      "The Holy Spirit animates the Church with the sevenfold gifts: wisdom, understanding, counsel, fortitude, knowledge, piety, and fear of the Lord."
],
    meditationQuestion: 'Do I pray daily to the Holy Spirit for light and guidance before making important decisions?',
    practicalLiving: 'Pray the Veni Creator Spiritus or "Come Holy Spirit, fill the hearts of Thy faithful and kindle in them the fire of Thy love."',
    crossReferences: [
      "John 20:19-23",
      "Acts 2:1-11",
      "CCC 731",
      "CCC 737"
]
  },
  'jn 20:19-23':   {
    gospelCitation: 'John 20:19-23',
    topicTitle: 'Pentecost Sunday: The Outpouring of the Holy Spirit and The Birth of the Church',
    topicSubtitle: 'He breathed on them, and said to them, "Receive the Holy Spirit": The Sanctifier and Soul of the Church',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — I Believe in the Holy Spirit',
    chapter: 'The Spirit and the Church in the Last Days — Pentecost',
    paragraphsRange: 'Catechism of the Catholic Church 731, 732, 737, 1287',
    catechismArticles: [
      {
            "number": 731,
            "title": "On the Day of Pentecost Christ's Passover Was Fulfilled",
            "text": "On the day of Pentecost when the seven weeks of Easter had come to an end, Christ's Passover is fulfilled in the outpouring of the Holy Spirit, manifested, given, and communicated as a divine person: of his fullness, Christ, the Lord, pours out the Spirit in abundance."
      },
      {
            "number": 732,
            "title": "On That Day the Holy Trinity is Fully Revealed",
            "text": "On that day, the Holy Trinity is fully revealed. Since that day, the Kingdom announced by Christ has been open to those who believe in him: in the humility of the flesh and in faith, they already share in the communion of the Holy Trinity. By his coming, which never ceases, the Holy Spirit causes the world to enter into the \"last days\", the time of the Church."
      },
      {
            "number": 737,
            "title": "The Holy Spirit Prepares Men and Draws Them to Christ",
            "text": "The mission of Christ and the Holy Spirit is brought to completion in the Church, which is the Body of Christ and the Temple of the Holy Spirit. This joint mission henceforth brings Christ's faithful to share in his communion with the Father in the Holy Spirit. The Spirit prepares men and goes out to them with his grace, in order to draw them to Christ."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Leo XIII",
            "documentTitle": "Encyclical Divinum Illud Munus (On the Holy Spirit)",
            "citation": "DIM 9",
            "insight": "Let it suffice to state that, as Christ is the Head of the Church, so is the Holy Ghost her soul: \"What the soul is in our body, that is the Holy Ghost in the Body of Christ, the Church.\""
      }
],
    inBrief: [
      "Receive the Holy Spirit (John 20:22).",
      "Pentecost is the solemn public manifestation of the Catholic Church and the universal outpouring of divine charity.",
      "The Holy Spirit animates the Church with the sevenfold gifts: wisdom, understanding, counsel, fortitude, knowledge, piety, and fear of the Lord."
],
    meditationQuestion: 'Do I pray daily to the Holy Spirit for light and guidance before making important decisions?',
    practicalLiving: 'Pray the Veni Creator Spiritus or "Come Holy Spirit, fill the hearts of Thy faithful and kindle in them the fire of Thy love."',
    crossReferences: [
      "John 20:19-23",
      "Acts 2:1-11",
      "CCC 731",
      "CCC 737"
]
  },
  'pentecost':   {
    gospelCitation: 'John 20:19-23',
    topicTitle: 'Pentecost Sunday: The Outpouring of the Holy Spirit and The Birth of the Church',
    topicSubtitle: 'He breathed on them, and said to them, "Receive the Holy Spirit": The Sanctifier and Soul of the Church',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — I Believe in the Holy Spirit',
    chapter: 'The Spirit and the Church in the Last Days — Pentecost',
    paragraphsRange: 'Catechism of the Catholic Church 731, 732, 737, 1287',
    catechismArticles: [
      {
            "number": 731,
            "title": "On the Day of Pentecost Christ's Passover Was Fulfilled",
            "text": "On the day of Pentecost when the seven weeks of Easter had come to an end, Christ's Passover is fulfilled in the outpouring of the Holy Spirit, manifested, given, and communicated as a divine person: of his fullness, Christ, the Lord, pours out the Spirit in abundance."
      },
      {
            "number": 732,
            "title": "On That Day the Holy Trinity is Fully Revealed",
            "text": "On that day, the Holy Trinity is fully revealed. Since that day, the Kingdom announced by Christ has been open to those who believe in him: in the humility of the flesh and in faith, they already share in the communion of the Holy Trinity. By his coming, which never ceases, the Holy Spirit causes the world to enter into the \"last days\", the time of the Church."
      },
      {
            "number": 737,
            "title": "The Holy Spirit Prepares Men and Draws Them to Christ",
            "text": "The mission of Christ and the Holy Spirit is brought to completion in the Church, which is the Body of Christ and the Temple of the Holy Spirit. This joint mission henceforth brings Christ's faithful to share in his communion with the Father in the Holy Spirit. The Spirit prepares men and goes out to them with his grace, in order to draw them to Christ."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Leo XIII",
            "documentTitle": "Encyclical Divinum Illud Munus (On the Holy Spirit)",
            "citation": "DIM 9",
            "insight": "Let it suffice to state that, as Christ is the Head of the Church, so is the Holy Ghost her soul: \"What the soul is in our body, that is the Holy Ghost in the Body of Christ, the Church.\""
      }
],
    inBrief: [
      "Receive the Holy Spirit (John 20:22).",
      "Pentecost is the solemn public manifestation of the Catholic Church and the universal outpouring of divine charity.",
      "The Holy Spirit animates the Church with the sevenfold gifts: wisdom, understanding, counsel, fortitude, knowledge, piety, and fear of the Lord."
],
    meditationQuestion: 'Do I pray daily to the Holy Spirit for light and guidance before making important decisions?',
    practicalLiving: 'Pray the Veni Creator Spiritus or "Come Holy Spirit, fill the hearts of Thy faithful and kindle in them the fire of Thy love."',
    crossReferences: [
      "John 20:19-23",
      "Acts 2:1-11",
      "CCC 731",
      "CCC 737"
]
  },
  'john 6:51-58':   {
    gospelCitation: 'John 6:51-58',
    topicTitle: 'Solemnity of the Most Holy Body and Blood of Christ (Corpus Christi): The Flesh and Blood of the Son of Man',
    topicSubtitle: 'He who eats my flesh and drinks my blood has eternal life, and I will raise him up at the last day',
    pillar: '',
    part: 'Part Two: The Celebration of the Christian Mystery',
    section: 'Section Two: The Seven Sacraments — The Holy Eucharist',
    chapter: 'Transubstantiation and The Eucharistic Sacrifice',
    paragraphsRange: 'Catechism of the Catholic Church 1373, 1376, 1380, 1406',
    catechismArticles: [
      {
            "number": 1373,
            "title": "Christ Jesus is Present in Many Ways, but Above All Under the Eucharistic Species",
            "text": "\"Christ Jesus, who died, yes, who was raised from the dead, who is at the right hand of God, who indeed intercedes for us,\" is present in many ways to his Church... But \"he is present... most especially in the Eucharistic species.\""
      },
      {
            "number": 1376,
            "title": "The Catholic Dogma of Transubstantiation",
            "text": "The Council of Trent summarizes the Catholic faith by declaring: \"Because Christ our Redeemer said that it was truly his body that he was offering under the species of bread, it has always been the conviction of the Church of God, and this holy Council now declares again, that by the consecration of the bread and wine there takes place a change of the whole substance of the bread into the substance of the body of Christ our Lord and of the whole substance of the wine into the substance of his blood. This change the holy Catholic Church has fittingly and properly called transubstantiation.\""
      },
      {
            "number": 1380,
            "title": "The Inestimable Value of Eucharistic Adoration",
            "text": "The Church and the world have a great need for Eucharistic worship. Jesus awaits us in this sacrament of love. Let us not refuse the time to go to meet him in adoration, in contemplation full of faith, and open to making amends for the serious offenses and crimes of the world. Let our adoration never cease."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. Paul VI",
            "documentTitle": "Encyclical Mysterium Fidei",
            "citation": "MF 39",
            "insight": "This presence is called \"real\"—by which is not intended to exclude other kinds of presence as if they were not real, but because it is presence in the fullest sense: that is to say, a substantial presence by which Christ, God and man, makes Himself wholly and entirely present."
      }
],
    inBrief: [
      "My flesh is food indeed, and my blood is drink indeed (John 6:55).",
      "By the words of consecration spoken by a validly ordained priest, the bread and wine become substantially the Body, Blood, Soul, and Divinity of Jesus Christ.",
      "Corpus Christi publicly proclaims the supreme gift of Christ's living presence in our midst."
],
    meditationQuestion: 'Do I adore the Blessed Sacrament with the lively faith that Jesus Christ is as truly present in the Tabernacle as He was in Galilee?',
    practicalLiving: 'Make a visit to the Blessed Sacrament today for fifteen minutes of silent adoration, chanting the Tantum Ergo.',
    crossReferences: [
      "John 6:51-58",
      "1 Corinthians 11:27-29",
      "CCC 1376",
      "CCC 1380"
]
  },
  'jn 6:51-58':   {
    gospelCitation: 'John 6:51-58',
    topicTitle: 'Solemnity of the Most Holy Body and Blood of Christ (Corpus Christi): The Flesh and Blood of the Son of Man',
    topicSubtitle: 'He who eats my flesh and drinks my blood has eternal life, and I will raise him up at the last day',
    pillar: '',
    part: 'Part Two: The Celebration of the Christian Mystery',
    section: 'Section Two: The Seven Sacraments — The Holy Eucharist',
    chapter: 'Transubstantiation and The Eucharistic Sacrifice',
    paragraphsRange: 'Catechism of the Catholic Church 1373, 1376, 1380, 1406',
    catechismArticles: [
      {
            "number": 1373,
            "title": "Christ Jesus is Present in Many Ways, but Above All Under the Eucharistic Species",
            "text": "\"Christ Jesus, who died, yes, who was raised from the dead, who is at the right hand of God, who indeed intercedes for us,\" is present in many ways to his Church... But \"he is present... most especially in the Eucharistic species.\""
      },
      {
            "number": 1376,
            "title": "The Catholic Dogma of Transubstantiation",
            "text": "The Council of Trent summarizes the Catholic faith by declaring: \"Because Christ our Redeemer said that it was truly his body that he was offering under the species of bread, it has always been the conviction of the Church of God, and this holy Council now declares again, that by the consecration of the bread and wine there takes place a change of the whole substance of the bread into the substance of the body of Christ our Lord and of the whole substance of the wine into the substance of his blood. This change the holy Catholic Church has fittingly and properly called transubstantiation.\""
      },
      {
            "number": 1380,
            "title": "The Inestimable Value of Eucharistic Adoration",
            "text": "The Church and the world have a great need for Eucharistic worship. Jesus awaits us in this sacrament of love. Let us not refuse the time to go to meet him in adoration, in contemplation full of faith, and open to making amends for the serious offenses and crimes of the world. Let our adoration never cease."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. Paul VI",
            "documentTitle": "Encyclical Mysterium Fidei",
            "citation": "MF 39",
            "insight": "This presence is called \"real\"—by which is not intended to exclude other kinds of presence as if they were not real, but because it is presence in the fullest sense: that is to say, a substantial presence by which Christ, God and man, makes Himself wholly and entirely present."
      }
],
    inBrief: [
      "My flesh is food indeed, and my blood is drink indeed (John 6:55).",
      "By the words of consecration spoken by a validly ordained priest, the bread and wine become substantially the Body, Blood, Soul, and Divinity of Jesus Christ.",
      "Corpus Christi publicly proclaims the supreme gift of Christ's living presence in our midst."
],
    meditationQuestion: 'Do I adore the Blessed Sacrament with the lively faith that Jesus Christ is as truly present in the Tabernacle as He was in Galilee?',
    practicalLiving: 'Make a visit to the Blessed Sacrament today for fifteen minutes of silent adoration, chanting the Tantum Ergo.',
    crossReferences: [
      "John 6:51-58",
      "1 Corinthians 11:27-29",
      "CCC 1376",
      "CCC 1380"
]
  },
  'corpus christi':   {
    gospelCitation: 'John 6:51-58',
    topicTitle: 'Solemnity of the Most Holy Body and Blood of Christ (Corpus Christi): The Flesh and Blood of the Son of Man',
    topicSubtitle: 'He who eats my flesh and drinks my blood has eternal life, and I will raise him up at the last day',
    pillar: '',
    part: 'Part Two: The Celebration of the Christian Mystery',
    section: 'Section Two: The Seven Sacraments — The Holy Eucharist',
    chapter: 'Transubstantiation and The Eucharistic Sacrifice',
    paragraphsRange: 'Catechism of the Catholic Church 1373, 1376, 1380, 1406',
    catechismArticles: [
      {
            "number": 1373,
            "title": "Christ Jesus is Present in Many Ways, but Above All Under the Eucharistic Species",
            "text": "\"Christ Jesus, who died, yes, who was raised from the dead, who is at the right hand of God, who indeed intercedes for us,\" is present in many ways to his Church... But \"he is present... most especially in the Eucharistic species.\""
      },
      {
            "number": 1376,
            "title": "The Catholic Dogma of Transubstantiation",
            "text": "The Council of Trent summarizes the Catholic faith by declaring: \"Because Christ our Redeemer said that it was truly his body that he was offering under the species of bread, it has always been the conviction of the Church of God, and this holy Council now declares again, that by the consecration of the bread and wine there takes place a change of the whole substance of the bread into the substance of the body of Christ our Lord and of the whole substance of the wine into the substance of his blood. This change the holy Catholic Church has fittingly and properly called transubstantiation.\""
      },
      {
            "number": 1380,
            "title": "The Inestimable Value of Eucharistic Adoration",
            "text": "The Church and the world have a great need for Eucharistic worship. Jesus awaits us in this sacrament of love. Let us not refuse the time to go to meet him in adoration, in contemplation full of faith, and open to making amends for the serious offenses and crimes of the world. Let our adoration never cease."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. Paul VI",
            "documentTitle": "Encyclical Mysterium Fidei",
            "citation": "MF 39",
            "insight": "This presence is called \"real\"—by which is not intended to exclude other kinds of presence as if they were not real, but because it is presence in the fullest sense: that is to say, a substantial presence by which Christ, God and man, makes Himself wholly and entirely present."
      }
],
    inBrief: [
      "My flesh is food indeed, and my blood is drink indeed (John 6:55).",
      "By the words of consecration spoken by a validly ordained priest, the bread and wine become substantially the Body, Blood, Soul, and Divinity of Jesus Christ.",
      "Corpus Christi publicly proclaims the supreme gift of Christ's living presence in our midst."
],
    meditationQuestion: 'Do I adore the Blessed Sacrament with the lively faith that Jesus Christ is as truly present in the Tabernacle as He was in Galilee?',
    practicalLiving: 'Make a visit to the Blessed Sacrament today for fifteen minutes of silent adoration, chanting the Tantum Ergo.',
    crossReferences: [
      "John 6:51-58",
      "1 Corinthians 11:27-29",
      "CCC 1376",
      "CCC 1380"
]
  },
  'body and blood of christ':   {
    gospelCitation: 'John 6:51-58',
    topicTitle: 'Solemnity of the Most Holy Body and Blood of Christ (Corpus Christi): The Flesh and Blood of the Son of Man',
    topicSubtitle: 'He who eats my flesh and drinks my blood has eternal life, and I will raise him up at the last day',
    pillar: '',
    part: 'Part Two: The Celebration of the Christian Mystery',
    section: 'Section Two: The Seven Sacraments — The Holy Eucharist',
    chapter: 'Transubstantiation and The Eucharistic Sacrifice',
    paragraphsRange: 'Catechism of the Catholic Church 1373, 1376, 1380, 1406',
    catechismArticles: [
      {
            "number": 1373,
            "title": "Christ Jesus is Present in Many Ways, but Above All Under the Eucharistic Species",
            "text": "\"Christ Jesus, who died, yes, who was raised from the dead, who is at the right hand of God, who indeed intercedes for us,\" is present in many ways to his Church... But \"he is present... most especially in the Eucharistic species.\""
      },
      {
            "number": 1376,
            "title": "The Catholic Dogma of Transubstantiation",
            "text": "The Council of Trent summarizes the Catholic faith by declaring: \"Because Christ our Redeemer said that it was truly his body that he was offering under the species of bread, it has always been the conviction of the Church of God, and this holy Council now declares again, that by the consecration of the bread and wine there takes place a change of the whole substance of the bread into the substance of the body of Christ our Lord and of the whole substance of the wine into the substance of his blood. This change the holy Catholic Church has fittingly and properly called transubstantiation.\""
      },
      {
            "number": 1380,
            "title": "The Inestimable Value of Eucharistic Adoration",
            "text": "The Church and the world have a great need for Eucharistic worship. Jesus awaits us in this sacrament of love. Let us not refuse the time to go to meet him in adoration, in contemplation full of faith, and open to making amends for the serious offenses and crimes of the world. Let our adoration never cease."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope St. Paul VI",
            "documentTitle": "Encyclical Mysterium Fidei",
            "citation": "MF 39",
            "insight": "This presence is called \"real\"—by which is not intended to exclude other kinds of presence as if they were not real, but because it is presence in the fullest sense: that is to say, a substantial presence by which Christ, God and man, makes Himself wholly and entirely present."
      }
],
    inBrief: [
      "My flesh is food indeed, and my blood is drink indeed (John 6:55).",
      "By the words of consecration spoken by a validly ordained priest, the bread and wine become substantially the Body, Blood, Soul, and Divinity of Jesus Christ.",
      "Corpus Christi publicly proclaims the supreme gift of Christ's living presence in our midst."
],
    meditationQuestion: 'Do I adore the Blessed Sacrament with the lively faith that Jesus Christ is as truly present in the Tabernacle as He was in Galilee?',
    practicalLiving: 'Make a visit to the Blessed Sacrament today for fifteen minutes of silent adoration, chanting the Tantum Ergo.',
    crossReferences: [
      "John 6:51-58",
      "1 Corinthians 11:27-29",
      "CCC 1376",
      "CCC 1380"
]
  },
  'john 19:31-37':   {
    gospelCitation: 'John 19:31-37',
    topicTitle: 'Solemnity of the Most Sacred Heart of Jesus: The Pierced Side, Blood and Water',
    topicSubtitle: 'One of the soldiers pierced his side with a spear, and at once there came out blood and water: The Ocean of Divine Love',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Sacred Heart of Jesus',
    chapter: 'The Incarnate Son of God and The Symbol of His Infinite Love',
    paragraphsRange: 'Catechism of the Catholic Church 478, 766, 1225, 2669',
    catechismArticles: [
      {
            "number": 478,
            "title": "Jesus Knew and Loved Us Each and All with a Human Heart",
            "text": "Jesus knew and loved us each and all during his life, his agony and his Passion, and gave himself up for each one of us: \"The Son of God... loved me and gave himself for me.\" He has loved us all with a human heart. For this reason, the Sacred Heart of Jesus, pierced by our sins and for our salvation, \"is quite rightly considered the chief sign and symbol of that... love with which the divine Redeemer continually loves the eternal Father and all human beings without exception.\""
      },
      {
            "number": 766,
            "title": "The Church is Born Primarily from Christ's Total Self-Giving on the Cross",
            "text": "The Church is born primarily of Christ's total self-giving for our salvation, anticipated in the institution of the Eucharist and fulfilled on the cross. \"The origin and growth of the Church are symbolized by the blood and water which flowed from the open side of the crucified Jesus.\" For it was from the side of Christ as he slept the sleep of death upon the cross that there came forth \"the wondrous sacrament of the whole Church.\" As Eve was formed from the sleeping Adam's side, so the Church was born from the pierced heart of Christ hanging dead on the cross."
      },
      {
            "number": 2669,
            "title": "The Prayer of the Church Veneration of the Sacred Heart",
            "text": "The prayer of the Church venerates and honors the Heart of Jesus just as it invokes his most holy Name. It adores the incarnate Word and his Heart which, out of love for men, he allowed to be pierced by our sins. Christian prayer loves to follow the way of the cross in the footsteps of the Savior."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Pius XII",
            "documentTitle": "Encyclical Haurietis Aquas (On Devotion to the Sacred Heart)",
            "citation": "HA 3",
            "insight": "Devotion to the Sacred Heart is not just an ordinary form of piety; it is the most complete profession of the Christian religion, for it is the worship of the love of God revealed in Jesus Christ."
      }
],
    inBrief: [
      "They shall look on him whom they have pierced (John 19:37).",
      "The pierced Heart of Jesus is the burning furnace of divine charity, pouring out mercy upon repentant sinners.",
      "From the open side of the Savior on Calvary flowed the Sacraments of Baptism and the Holy Eucharist."
],
    meditationQuestion: 'Do I offer reparation to the Sacred Heart of Jesus for the ingratitude and indifference of the world?',
    practicalLiving: 'Pray the Act of Consecration to the Sacred Heart of Jesus today: "Sacred Heart of Jesus, I place all my trust in Thee."',
    crossReferences: [
      "John 19:31-37",
      "Zechariah 12:10",
      "CCC 478",
      "CCC 766"
]
  },
  'jn 19:31-37':   {
    gospelCitation: 'John 19:31-37',
    topicTitle: 'Solemnity of the Most Sacred Heart of Jesus: The Pierced Side, Blood and Water',
    topicSubtitle: 'One of the soldiers pierced his side with a spear, and at once there came out blood and water: The Ocean of Divine Love',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Sacred Heart of Jesus',
    chapter: 'The Incarnate Son of God and The Symbol of His Infinite Love',
    paragraphsRange: 'Catechism of the Catholic Church 478, 766, 1225, 2669',
    catechismArticles: [
      {
            "number": 478,
            "title": "Jesus Knew and Loved Us Each and All with a Human Heart",
            "text": "Jesus knew and loved us each and all during his life, his agony and his Passion, and gave himself up for each one of us: \"The Son of God... loved me and gave himself for me.\" He has loved us all with a human heart. For this reason, the Sacred Heart of Jesus, pierced by our sins and for our salvation, \"is quite rightly considered the chief sign and symbol of that... love with which the divine Redeemer continually loves the eternal Father and all human beings without exception.\""
      },
      {
            "number": 766,
            "title": "The Church is Born Primarily from Christ's Total Self-Giving on the Cross",
            "text": "The Church is born primarily of Christ's total self-giving for our salvation, anticipated in the institution of the Eucharist and fulfilled on the cross. \"The origin and growth of the Church are symbolized by the blood and water which flowed from the open side of the crucified Jesus.\" For it was from the side of Christ as he slept the sleep of death upon the cross that there came forth \"the wondrous sacrament of the whole Church.\" As Eve was formed from the sleeping Adam's side, so the Church was born from the pierced heart of Christ hanging dead on the cross."
      },
      {
            "number": 2669,
            "title": "The Prayer of the Church Veneration of the Sacred Heart",
            "text": "The prayer of the Church venerates and honors the Heart of Jesus just as it invokes his most holy Name. It adores the incarnate Word and his Heart which, out of love for men, he allowed to be pierced by our sins. Christian prayer loves to follow the way of the cross in the footsteps of the Savior."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Pius XII",
            "documentTitle": "Encyclical Haurietis Aquas (On Devotion to the Sacred Heart)",
            "citation": "HA 3",
            "insight": "Devotion to the Sacred Heart is not just an ordinary form of piety; it is the most complete profession of the Christian religion, for it is the worship of the love of God revealed in Jesus Christ."
      }
],
    inBrief: [
      "They shall look on him whom they have pierced (John 19:37).",
      "The pierced Heart of Jesus is the burning furnace of divine charity, pouring out mercy upon repentant sinners.",
      "From the open side of the Savior on Calvary flowed the Sacraments of Baptism and the Holy Eucharist."
],
    meditationQuestion: 'Do I offer reparation to the Sacred Heart of Jesus for the ingratitude and indifference of the world?',
    practicalLiving: 'Pray the Act of Consecration to the Sacred Heart of Jesus today: "Sacred Heart of Jesus, I place all my trust in Thee."',
    crossReferences: [
      "John 19:31-37",
      "Zechariah 12:10",
      "CCC 478",
      "CCC 766"
]
  },
  'sacred heart':   {
    gospelCitation: 'John 19:31-37',
    topicTitle: 'Solemnity of the Most Sacred Heart of Jesus: The Pierced Side, Blood and Water',
    topicSubtitle: 'One of the soldiers pierced his side with a spear, and at once there came out blood and water: The Ocean of Divine Love',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Sacred Heart of Jesus',
    chapter: 'The Incarnate Son of God and The Symbol of His Infinite Love',
    paragraphsRange: 'Catechism of the Catholic Church 478, 766, 1225, 2669',
    catechismArticles: [
      {
            "number": 478,
            "title": "Jesus Knew and Loved Us Each and All with a Human Heart",
            "text": "Jesus knew and loved us each and all during his life, his agony and his Passion, and gave himself up for each one of us: \"The Son of God... loved me and gave himself for me.\" He has loved us all with a human heart. For this reason, the Sacred Heart of Jesus, pierced by our sins and for our salvation, \"is quite rightly considered the chief sign and symbol of that... love with which the divine Redeemer continually loves the eternal Father and all human beings without exception.\""
      },
      {
            "number": 766,
            "title": "The Church is Born Primarily from Christ's Total Self-Giving on the Cross",
            "text": "The Church is born primarily of Christ's total self-giving for our salvation, anticipated in the institution of the Eucharist and fulfilled on the cross. \"The origin and growth of the Church are symbolized by the blood and water which flowed from the open side of the crucified Jesus.\" For it was from the side of Christ as he slept the sleep of death upon the cross that there came forth \"the wondrous sacrament of the whole Church.\" As Eve was formed from the sleeping Adam's side, so the Church was born from the pierced heart of Christ hanging dead on the cross."
      },
      {
            "number": 2669,
            "title": "The Prayer of the Church Veneration of the Sacred Heart",
            "text": "The prayer of the Church venerates and honors the Heart of Jesus just as it invokes his most holy Name. It adores the incarnate Word and his Heart which, out of love for men, he allowed to be pierced by our sins. Christian prayer loves to follow the way of the cross in the footsteps of the Savior."
      }
],
    magisterialInputs: [
      {
            "authority": "Pope Pius XII",
            "documentTitle": "Encyclical Haurietis Aquas (On Devotion to the Sacred Heart)",
            "citation": "HA 3",
            "insight": "Devotion to the Sacred Heart is not just an ordinary form of piety; it is the most complete profession of the Christian religion, for it is the worship of the love of God revealed in Jesus Christ."
      }
],
    inBrief: [
      "They shall look on him whom they have pierced (John 19:37).",
      "The pierced Heart of Jesus is the burning furnace of divine charity, pouring out mercy upon repentant sinners.",
      "From the open side of the Savior on Calvary flowed the Sacraments of Baptism and the Holy Eucharist."
],
    meditationQuestion: 'Do I offer reparation to the Sacred Heart of Jesus for the ingratitude and indifference of the world?',
    practicalLiving: 'Pray the Act of Consecration to the Sacred Heart of Jesus today: "Sacred Heart of Jesus, I place all my trust in Thee."',
    crossReferences: [
      "John 19:31-37",
      "Zechariah 12:10",
      "CCC 478",
      "CCC 766"
]
  },
  'luke 1:57-66':   {
    gospelCitation: 'Luke 1:57-66, 80',
    topicTitle: 'Solemnity of the Nativity of St. John the Baptist: His Name is John — The Voice in the Wilderness',
    topicSubtitle: 'And the child grew and became strong in spirit, and he was in the wilderness till the day of his manifestation to Israel',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Precursor of the Messiah',
    chapter: 'The Mission of John the Baptist Preparing the Way of the Lord',
    paragraphsRange: 'Catechism of the Catholic Church 523, 717, 718, 720',
    catechismArticles: [
      {
            "number": 523,
            "title": "St. John the Baptist as the Prophet of the Most High",
            "text": "St. John the Baptist is the Lord's immediate precursor or forerunner, sent to prepare his way. \"Prophet of the Most High,\" John surpasses all the prophets, of whom he is the last. He inaugurates the Gospel, already from his mother's womb welcomes the coming of Christ, and rejoices in being \"the friend of the bridegroom.\""
      },
      {
            "number": 718,
            "title": "John Prepares for the Lord a People Well-Disposed",
            "text": "John is \"Elijah [who] must come.\" The fire of the Spirit dwells in him and makes him the forerunner of the coming Lord. In John, the Precursor, the Holy Spirit completes the work of \"[making] ready a people prepared for the Lord.\""
      },
      {
            "number": 720,
            "title": "John Points Out the Lamb of God Who Takes Away Sin",
            "text": "Finally, with John the Baptist, the Holy Spirit begins the restoration to man of \"the divine likeness\", prefiguring what he would achieve with and in Christ. John's baptism was for repentance; baptism in water and the Spirit will be a new birth."
      }
],
    magisterialInputs: [
      {
            "authority": "St. Augustine of Hippo",
            "documentTitle": "Sermon on the Birth of St. John the Baptist",
            "citation": "Sermo 293",
            "insight": "John is the voice, but the Lord is the Word who was in the beginning. John is the voice for a time, but Christ is the eternal Word from the beginning."
      }
],
    inBrief: [
      "His name is John... And immediately his mouth was opened and his tongue loosed, and he spoke, blessing God (Luke 1:63-64).",
      "The Church celebrates the earthly birthdays of only three persons: Jesus Christ, the Blessed Virgin Mary, and St. John the Baptist.",
      "John the Baptist teaches us holy humility: \"He must increase, but I must decrease.\""
],
    meditationQuestion: 'Do I point others to Jesus Christ in humility, willing to decrease so that He may increase in the hearts of men?',
    practicalLiving: 'Pray the Benedictus (Canticle of Zechariah) today, praising God for visiting and redeeming His people.',
    crossReferences: [
      "Luke 1:57-80",
      "Malachi 3:1-4",
      "CCC 523",
      "CCC 718"
]
  },
  'lk 1:57-66':   {
    gospelCitation: 'Luke 1:57-66, 80',
    topicTitle: 'Solemnity of the Nativity of St. John the Baptist: His Name is John — The Voice in the Wilderness',
    topicSubtitle: 'And the child grew and became strong in spirit, and he was in the wilderness till the day of his manifestation to Israel',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Precursor of the Messiah',
    chapter: 'The Mission of John the Baptist Preparing the Way of the Lord',
    paragraphsRange: 'Catechism of the Catholic Church 523, 717, 718, 720',
    catechismArticles: [
      {
            "number": 523,
            "title": "St. John the Baptist as the Prophet of the Most High",
            "text": "St. John the Baptist is the Lord's immediate precursor or forerunner, sent to prepare his way. \"Prophet of the Most High,\" John surpasses all the prophets, of whom he is the last. He inaugurates the Gospel, already from his mother's womb welcomes the coming of Christ, and rejoices in being \"the friend of the bridegroom.\""
      },
      {
            "number": 718,
            "title": "John Prepares for the Lord a People Well-Disposed",
            "text": "John is \"Elijah [who] must come.\" The fire of the Spirit dwells in him and makes him the forerunner of the coming Lord. In John, the Precursor, the Holy Spirit completes the work of \"[making] ready a people prepared for the Lord.\""
      },
      {
            "number": 720,
            "title": "John Points Out the Lamb of God Who Takes Away Sin",
            "text": "Finally, with John the Baptist, the Holy Spirit begins the restoration to man of \"the divine likeness\", prefiguring what he would achieve with and in Christ. John's baptism was for repentance; baptism in water and the Spirit will be a new birth."
      }
],
    magisterialInputs: [
      {
            "authority": "St. Augustine of Hippo",
            "documentTitle": "Sermon on the Birth of St. John the Baptist",
            "citation": "Sermo 293",
            "insight": "John is the voice, but the Lord is the Word who was in the beginning. John is the voice for a time, but Christ is the eternal Word from the beginning."
      }
],
    inBrief: [
      "His name is John... And immediately his mouth was opened and his tongue loosed, and he spoke, blessing God (Luke 1:63-64).",
      "The Church celebrates the earthly birthdays of only three persons: Jesus Christ, the Blessed Virgin Mary, and St. John the Baptist.",
      "John the Baptist teaches us holy humility: \"He must increase, but I must decrease.\""
],
    meditationQuestion: 'Do I point others to Jesus Christ in humility, willing to decrease so that He may increase in the hearts of men?',
    practicalLiving: 'Pray the Benedictus (Canticle of Zechariah) today, praising God for visiting and redeeming His people.',
    crossReferences: [
      "Luke 1:57-80",
      "Malachi 3:1-4",
      "CCC 523",
      "CCC 718"
]
  },
  'luke 1:57':   {
    gospelCitation: 'Luke 1:57-66, 80',
    topicTitle: 'Solemnity of the Nativity of St. John the Baptist: His Name is John — The Voice in the Wilderness',
    topicSubtitle: 'And the child grew and became strong in spirit, and he was in the wilderness till the day of his manifestation to Israel',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Precursor of the Messiah',
    chapter: 'The Mission of John the Baptist Preparing the Way of the Lord',
    paragraphsRange: 'Catechism of the Catholic Church 523, 717, 718, 720',
    catechismArticles: [
      {
            "number": 523,
            "title": "St. John the Baptist as the Prophet of the Most High",
            "text": "St. John the Baptist is the Lord's immediate precursor or forerunner, sent to prepare his way. \"Prophet of the Most High,\" John surpasses all the prophets, of whom he is the last. He inaugurates the Gospel, already from his mother's womb welcomes the coming of Christ, and rejoices in being \"the friend of the bridegroom.\""
      },
      {
            "number": 718,
            "title": "John Prepares for the Lord a People Well-Disposed",
            "text": "John is \"Elijah [who] must come.\" The fire of the Spirit dwells in him and makes him the forerunner of the coming Lord. In John, the Precursor, the Holy Spirit completes the work of \"[making] ready a people prepared for the Lord.\""
      },
      {
            "number": 720,
            "title": "John Points Out the Lamb of God Who Takes Away Sin",
            "text": "Finally, with John the Baptist, the Holy Spirit begins the restoration to man of \"the divine likeness\", prefiguring what he would achieve with and in Christ. John's baptism was for repentance; baptism in water and the Spirit will be a new birth."
      }
],
    magisterialInputs: [
      {
            "authority": "St. Augustine of Hippo",
            "documentTitle": "Sermon on the Birth of St. John the Baptist",
            "citation": "Sermo 293",
            "insight": "John is the voice, but the Lord is the Word who was in the beginning. John is the voice for a time, but Christ is the eternal Word from the beginning."
      }
],
    inBrief: [
      "His name is John... And immediately his mouth was opened and his tongue loosed, and he spoke, blessing God (Luke 1:63-64).",
      "The Church celebrates the earthly birthdays of only three persons: Jesus Christ, the Blessed Virgin Mary, and St. John the Baptist.",
      "John the Baptist teaches us holy humility: \"He must increase, but I must decrease.\""
],
    meditationQuestion: 'Do I point others to Jesus Christ in humility, willing to decrease so that He may increase in the hearts of men?',
    practicalLiving: 'Pray the Benedictus (Canticle of Zechariah) today, praising God for visiting and redeeming His people.',
    crossReferences: [
      "Luke 1:57-80",
      "Malachi 3:1-4",
      "CCC 523",
      "CCC 718"
]
  },
  'nativity of st john the baptist':   {
    gospelCitation: 'Luke 1:57-66, 80',
    topicTitle: 'Solemnity of the Nativity of St. John the Baptist: His Name is John — The Voice in the Wilderness',
    topicSubtitle: 'And the child grew and became strong in spirit, and he was in the wilderness till the day of his manifestation to Israel',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Precursor of the Messiah',
    chapter: 'The Mission of John the Baptist Preparing the Way of the Lord',
    paragraphsRange: 'Catechism of the Catholic Church 523, 717, 718, 720',
    catechismArticles: [
      {
            "number": 523,
            "title": "St. John the Baptist as the Prophet of the Most High",
            "text": "St. John the Baptist is the Lord's immediate precursor or forerunner, sent to prepare his way. \"Prophet of the Most High,\" John surpasses all the prophets, of whom he is the last. He inaugurates the Gospel, already from his mother's womb welcomes the coming of Christ, and rejoices in being \"the friend of the bridegroom.\""
      },
      {
            "number": 718,
            "title": "John Prepares for the Lord a People Well-Disposed",
            "text": "John is \"Elijah [who] must come.\" The fire of the Spirit dwells in him and makes him the forerunner of the coming Lord. In John, the Precursor, the Holy Spirit completes the work of \"[making] ready a people prepared for the Lord.\""
      },
      {
            "number": 720,
            "title": "John Points Out the Lamb of God Who Takes Away Sin",
            "text": "Finally, with John the Baptist, the Holy Spirit begins the restoration to man of \"the divine likeness\", prefiguring what he would achieve with and in Christ. John's baptism was for repentance; baptism in water and the Spirit will be a new birth."
      }
],
    magisterialInputs: [
      {
            "authority": "St. Augustine of Hippo",
            "documentTitle": "Sermon on the Birth of St. John the Baptist",
            "citation": "Sermo 293",
            "insight": "John is the voice, but the Lord is the Word who was in the beginning. John is the voice for a time, but Christ is the eternal Word from the beginning."
      }
],
    inBrief: [
      "His name is John... And immediately his mouth was opened and his tongue loosed, and he spoke, blessing God (Luke 1:63-64).",
      "The Church celebrates the earthly birthdays of only three persons: Jesus Christ, the Blessed Virgin Mary, and St. John the Baptist.",
      "John the Baptist teaches us holy humility: \"He must increase, but I must decrease.\""
],
    meditationQuestion: 'Do I point others to Jesus Christ in humility, willing to decrease so that He may increase in the hearts of men?',
    practicalLiving: 'Pray the Benedictus (Canticle of Zechariah) today, praising God for visiting and redeeming His people.',
    crossReferences: [
      "Luke 1:57-80",
      "Malachi 3:1-4",
      "CCC 523",
      "CCC 718"
]
  },
  'matthew 16:13-19':   {
    gospelCitation: 'Matthew 16:13-19',
    topicTitle: 'Solemnity of Sts. Peter and Paul: "You Are the Christ" & "You Are Peter, and on This Rock I Will Build My Church"',
    topicSubtitle: 'I will give you the keys of the kingdom of heaven: The Petrine Office and the Infallibility of the Magisterium',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Church Founded on the Apostles',
    chapter: 'The Petrine Office, Apostolic Succession, and The Keys of the Kingdom',
    paragraphsRange: 'Catechism of the Catholic Church 551, 552, 553, 881',
    catechismArticles: [
      {
            "number": 551,
            "title": "From the Beginning of His Public Life Jesus Chose Twelve Men",
            "text": "From the beginning of his public life Jesus chose certain men, twelve in number, to be with him and to participate in his mission. He gave them a share in his authority and 'sent them out to preach as his emissaries.' In this college of the twelve, Simon Peter holds the first place."
      },
      {
            "number": 552,
            "title": "Simon Peter Holds the First Place in the College of the Twelve",
            "text": "Simon Peter holds the first place in the college of the Twelve; Jesus entrusted a unique mission to him. Through a charism from the Father, Peter had confessed: \"You are the Christ, the Son of the living God.\" Our Lord then declared to him: \"You are Peter, and on this rock I will build my Church, and the gates of Hades shall not prevail against it.\" Christ, the \"living Stone\", thus assures his Church, built on Peter, of victory over the powers of death. Because of the faith he confessed Peter will remain the unshakable rock of the Church."
      },
      {
            "number": 553,
            "title": "The Power of the Keys Entrusted Exclusively to Peter",
            "text": "Jesus entrusted a specific authority to Peter: \"I will give you the keys of the kingdom of heaven, and whatever you bind on earth shall be bound in heaven, and whatever you loose on earth shall be loosed in heaven.\" The \"power of the keys\" designates authority to govern the house of God, which is the Church. Jesus, the Good Shepherd, confirmed this mandate after his Resurrection: \"Feed my sheep.\" The power to \"bind and loose\" connotes the authority to absolve sins, to pronounce doctrinal judgments, and to make disciplinary decisions in the Church."
      },
      {
            "number": 881,
            "title": "The Lord Made Simon Alone the Rock and Keybearer of the Church",
            "text": "The Lord made Simon alone, whom he named Peter, the \"rock\" of his Church. He gave him the keys of his Church and instituted him shepherd of the whole flock. \"The office of binding and loosing which was given to Peter was also granted to the college of apostles, joined with its head.\" This pastoral office of Peter and the other apostles belongs to the Church's very foundation and is continued by the bishops under the primacy of the Pope."
      }
],
    magisterialInputs: [
      {
        authority: 'First Vatican Ecumenical Council',
        documentTitle: 'Dogmatic Constitution Pastor Aeternus',
        citation: 'Ch. 1-4',
        insight: 'We teach and define that it is a dogma divinely revealed that the Roman Pontiff, when he speaks ex cathedra... possesses that infallibility with which the divine Redeemer willed that His Church should be endowed.'
      }
    ],
    inBrief: [
      "You are Peter, and on this rock I will build my Church, and the gates of hell shall not prevail against it (Matthew 16:18).",
      "The Petrine ministry is the divinely established perpetual foundation of visible unity and orthodoxy in the Catholic Church.",
      "The Roman Pontiff, as successor of St. Peter, exercises full and supreme pastoral authority over the universal Church."
],
    meditationQuestion: 'Do I hold fast to the Catholic Faith taught by the Successor of Peter with filial fidelity and supernatural obedience?',
    practicalLiving: 'Pray for the Holy Father and the unity of the Catholic Church today, reciting an Our Father and Hail Mary for his intentions.',
    crossReferences: [
      "Matthew 16:13-19",
      "John 21:15-17",
      "CCC 552",
      "CCC 881"
]
  },
  'mt 16:13-19':   {
    gospelCitation: 'Matthew 16:13-19',
    topicTitle: 'Solemnity of Sts. Peter and Paul: "You Are the Christ" & "You Are Peter, and on This Rock I Will Build My Church"',
    topicSubtitle: 'I will give you the keys of the kingdom of heaven: The Petrine Office and the Infallibility of the Magisterium',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Church Founded on the Apostles',
    chapter: 'The Petrine Office, Apostolic Succession, and The Keys of the Kingdom',
    paragraphsRange: 'Catechism of the Catholic Church 551, 552, 553, 881',
    catechismArticles: [
      {
            "number": 551,
            "title": "From the Beginning of His Public Life Jesus Chose Twelve Men",
            "text": "From the beginning of his public life Jesus chose certain men, twelve in number, to be with him and to participate in his mission. He gave them a share in his authority and 'sent them out to preach as his emissaries.' In this college of the twelve, Simon Peter holds the first place."
      },
      {
            "number": 552,
            "title": "Simon Peter Holds the First Place in the College of the Twelve",
            "text": "Simon Peter holds the first place in the college of the Twelve; Jesus entrusted a unique mission to him. Through a charism from the Father, Peter had confessed: \"You are the Christ, the Son of the living God.\" Our Lord then declared to him: \"You are Peter, and on this rock I will build my Church, and the gates of Hades shall not prevail against it.\" Christ, the \"living Stone\", thus assures his Church, built on Peter, of victory over the powers of death. Because of the faith he confessed Peter will remain the unshakable rock of the Church."
      },
      {
            "number": 553,
            "title": "The Power of the Keys Entrusted Exclusively to Peter",
            "text": "Jesus entrusted a specific authority to Peter: \"I will give you the keys of the kingdom of heaven, and whatever you bind on earth shall be bound in heaven, and whatever you loose on earth shall be loosed in heaven.\" The \"power of the keys\" designates authority to govern the house of God, which is the Church. Jesus, the Good Shepherd, confirmed this mandate after his Resurrection: \"Feed my sheep.\" The power to \"bind and loose\" connotes the authority to absolve sins, to pronounce doctrinal judgments, and to make disciplinary decisions in the Church."
      },
      {
            "number": 881,
            "title": "The Lord Made Simon Alone the Rock and Keybearer of the Church",
            "text": "The Lord made Simon alone, whom he named Peter, the \"rock\" of his Church. He gave him the keys of his Church and instituted him shepherd of the whole flock. \"The office of binding and loosing which was given to Peter was also granted to the college of apostles, joined with its head.\" This pastoral office of Peter and the other apostles belongs to the Church's very foundation and is continued by the bishops under the primacy of the Pope."
      }
],
    magisterialInputs: [
      {
        authority: 'First Vatican Ecumenical Council',
        documentTitle: 'Dogmatic Constitution Pastor Aeternus',
        citation: 'Ch. 1-4',
        insight: 'We teach and define that it is a dogma divinely revealed that the Roman Pontiff, when he speaks ex cathedra... possesses that infallibility with which the divine Redeemer willed that His Church should be endowed.'
      }
    ],
    inBrief: [
      "You are Peter, and on this rock I will build my Church, and the gates of hell shall not prevail against it (Matthew 16:18).",
      "The Petrine ministry is the divinely established perpetual foundation of visible unity and orthodoxy in the Catholic Church.",
      "The Roman Pontiff, as successor of St. Peter, exercises full and supreme pastoral authority over the universal Church."
],
    meditationQuestion: 'Do I hold fast to the Catholic Faith taught by the Successor of Peter with filial fidelity and supernatural obedience?',
    practicalLiving: 'Pray for the Holy Father and the unity of the Catholic Church today, reciting an Our Father and Hail Mary for his intentions.',
    crossReferences: [
      "Matthew 16:13-19",
      "John 21:15-17",
      "CCC 552",
      "CCC 881"
]
  },
  'matthew 16:13':   {
    gospelCitation: 'Matthew 16:13-19',
    topicTitle: 'Solemnity of Sts. Peter and Paul: "You Are the Christ" & "You Are Peter, and on This Rock I Will Build My Church"',
    topicSubtitle: 'I will give you the keys of the kingdom of heaven: The Petrine Office and the Infallibility of the Magisterium',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Church Founded on the Apostles',
    chapter: 'The Petrine Office, Apostolic Succession, and The Keys of the Kingdom',
    paragraphsRange: 'Catechism of the Catholic Church 551, 552, 553, 881',
    catechismArticles: [
      {
            "number": 551,
            "title": "From the Beginning of His Public Life Jesus Chose Twelve Men",
            "text": "From the beginning of his public life Jesus chose certain men, twelve in number, to be with him and to participate in his mission. He gave them a share in his authority and 'sent them out to preach as his emissaries.' In this college of the twelve, Simon Peter holds the first place."
      },
      {
            "number": 552,
            "title": "Simon Peter Holds the First Place in the College of the Twelve",
            "text": "Simon Peter holds the first place in the college of the Twelve; Jesus entrusted a unique mission to him. Through a charism from the Father, Peter had confessed: \"You are the Christ, the Son of the living God.\" Our Lord then declared to him: \"You are Peter, and on this rock I will build my Church, and the gates of Hades shall not prevail against it.\" Christ, the \"living Stone\", thus assures his Church, built on Peter, of victory over the powers of death. Because of the faith he confessed Peter will remain the unshakable rock of the Church."
      },
      {
            "number": 553,
            "title": "The Power of the Keys Entrusted Exclusively to Peter",
            "text": "Jesus entrusted a specific authority to Peter: \"I will give you the keys of the kingdom of heaven, and whatever you bind on earth shall be bound in heaven, and whatever you loose on earth shall be loosed in heaven.\" The \"power of the keys\" designates authority to govern the house of God, which is the Church. Jesus, the Good Shepherd, confirmed this mandate after his Resurrection: \"Feed my sheep.\" The power to \"bind and loose\" connotes the authority to absolve sins, to pronounce doctrinal judgments, and to make disciplinary decisions in the Church."
      },
      {
            "number": 881,
            "title": "The Lord Made Simon Alone the Rock and Keybearer of the Church",
            "text": "The Lord made Simon alone, whom he named Peter, the \"rock\" of his Church. He gave him the keys of his Church and instituted him shepherd of the whole flock. \"The office of binding and loosing which was given to Peter was also granted to the college of apostles, joined with its head.\" This pastoral office of Peter and the other apostles belongs to the Church's very foundation and is continued by the bishops under the primacy of the Pope."
      }
],
    magisterialInputs: [
      {
        authority: 'First Vatican Ecumenical Council',
        documentTitle: 'Dogmatic Constitution Pastor Aeternus',
        citation: 'Ch. 1-4',
        insight: 'We teach and define that it is a dogma divinely revealed that the Roman Pontiff, when he speaks ex cathedra... possesses that infallibility with which the divine Redeemer willed that His Church should be endowed.'
      }
    ],
    inBrief: [
      "You are Peter, and on this rock I will build my Church, and the gates of hell shall not prevail against it (Matthew 16:18).",
      "The Petrine ministry is the divinely established perpetual foundation of visible unity and orthodoxy in the Catholic Church.",
      "The Roman Pontiff, as successor of St. Peter, exercises full and supreme pastoral authority over the universal Church."
],
    meditationQuestion: 'Do I hold fast to the Catholic Faith taught by the Successor of Peter with filial fidelity and supernatural obedience?',
    practicalLiving: 'Pray for the Holy Father and the unity of the Catholic Church today, reciting an Our Father and Hail Mary for his intentions.',
    crossReferences: [
      "Matthew 16:13-19",
      "John 21:15-17",
      "CCC 552",
      "CCC 881"
]
  },
  'peter and paul':   {
    gospelCitation: 'Matthew 16:13-19',
    topicTitle: 'Solemnity of Sts. Peter and Paul: "You Are the Christ" & "You Are Peter, and on This Rock I Will Build My Church"',
    topicSubtitle: 'I will give you the keys of the kingdom of heaven: The Petrine Office and the Infallibility of the Magisterium',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Church Founded on the Apostles',
    chapter: 'The Petrine Office, Apostolic Succession, and The Keys of the Kingdom',
    paragraphsRange: 'Catechism of the Catholic Church 551, 552, 553, 881',
    catechismArticles: [
      {
            "number": 551,
            "title": "From the Beginning of His Public Life Jesus Chose Twelve Men",
            "text": "From the beginning of his public life Jesus chose certain men, twelve in number, to be with him and to participate in his mission. He gave them a share in his authority and 'sent them out to preach as his emissaries.' In this college of the twelve, Simon Peter holds the first place."
      },
      {
            "number": 552,
            "title": "Simon Peter Holds the First Place in the College of the Twelve",
            "text": "Simon Peter holds the first place in the college of the Twelve; Jesus entrusted a unique mission to him. Through a charism from the Father, Peter had confessed: \"You are the Christ, the Son of the living God.\" Our Lord then declared to him: \"You are Peter, and on this rock I will build my Church, and the gates of Hades shall not prevail against it.\" Christ, the \"living Stone\", thus assures his Church, built on Peter, of victory over the powers of death. Because of the faith he confessed Peter will remain the unshakable rock of the Church."
      },
      {
            "number": 553,
            "title": "The Power of the Keys Entrusted Exclusively to Peter",
            "text": "Jesus entrusted a specific authority to Peter: \"I will give you the keys of the kingdom of heaven, and whatever you bind on earth shall be bound in heaven, and whatever you loose on earth shall be loosed in heaven.\" The \"power of the keys\" designates authority to govern the house of God, which is the Church. Jesus, the Good Shepherd, confirmed this mandate after his Resurrection: \"Feed my sheep.\" The power to \"bind and loose\" connotes the authority to absolve sins, to pronounce doctrinal judgments, and to make disciplinary decisions in the Church."
      },
      {
            "number": 881,
            "title": "The Lord Made Simon Alone the Rock and Keybearer of the Church",
            "text": "The Lord made Simon alone, whom he named Peter, the \"rock\" of his Church. He gave him the keys of his Church and instituted him shepherd of the whole flock. \"The office of binding and loosing which was given to Peter was also granted to the college of apostles, joined with its head.\" This pastoral office of Peter and the other apostles belongs to the Church's very foundation and is continued by the bishops under the primacy of the Pope."
      }
],
    magisterialInputs: [
      {
        authority: 'First Vatican Ecumenical Council',
        documentTitle: 'Dogmatic Constitution Pastor Aeternus',
        citation: 'Ch. 1-4',
        insight: 'We teach and define that it is a dogma divinely revealed that the Roman Pontiff, when he speaks ex cathedra... possesses that infallibility with which the divine Redeemer willed that His Church should be endowed.'
      }
    ],
    inBrief: [
      "You are Peter, and on this rock I will build my Church, and the gates of hell shall not prevail against it (Matthew 16:18).",
      "The Petrine ministry is the divinely established perpetual foundation of visible unity and orthodoxy in the Catholic Church.",
      "The Roman Pontiff, as successor of St. Peter, exercises full and supreme pastoral authority over the universal Church."
],
    meditationQuestion: 'Do I hold fast to the Catholic Faith taught by the Successor of Peter with filial fidelity and supernatural obedience?',
    practicalLiving: 'Pray for the Holy Father and the unity of the Catholic Church today, reciting an Our Father and Hail Mary for his intentions.',
    crossReferences: [
      "Matthew 16:13-19",
      "John 21:15-17",
      "CCC 552",
      "CCC 881"
]
  },
  'matthew 17:1-9':   {
    gospelCitation: 'Matthew 17:1-9',
    topicTitle: 'Feast of the Transfiguration of the Lord: The Uncreated Light of Mount Tabor',
    topicSubtitle: 'His face shone like the sun, and his garments became white as light: A Glimpse of the Glory of the Resurrection',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Mysteries of Christ\'s Public Life',
    chapter: 'The Transfiguration of Christ on Mount Tabor',
    paragraphsRange: 'Catechism of the Catholic Church 554, 555, 556, 568',
    catechismArticles: [
      {
            "number": 554,
            "title": "Jesus Gives Peter, James, and John a Foretaste of His Kingdom",
            "text": "From the day Peter confessed that Jesus is the Christ, the Son of the living God, the Master \"began to show his disciples that he must go to Jerusalem and suffer many things... and be killed, and on the third day be raised.\" Peter scorns this prediction, nor do the others understand it any better than he. In this setting Jesus took with him Peter, James, and John his brother, and led them up a high mountain apart. Jesus' face shone like the sun, and his clothes became white as light."
      },
      {
            "number": 555,
            "title": "Christ's Transfiguration Aims at Strengthening the Apostles' Faith",
            "text": "Christ's Transfiguration aims at strengthening the apostles' faith in anticipation of his Passion: the ascent onto the \"high mountain\" prepares for the ascent to Calvary. Christ, Head of the Church, manifests what his Body contains and radiates in the sacraments: \"the hope of glory.\""
      },
      {
            "number": 556,
            "title": "On the Threshold of the Passion Jesus Prepares His Disciples",
            "text": "On the threshold of the public life: the baptism; on the threshold of the Passover: the Transfiguration. Jesus' baptism proclaimed \"the mystery of the first regeneration,\" namely, our Baptism; his Transfiguration \"is the sacrament of the second regeneration\": our own Resurrection. From now on we share in the Lord's Resurrection through the Spirit who acts in the sacraments of the Body of Christ."
      }
],
    magisterialInputs: [
      {
        authority: 'Second Vatican Ecumenical Council',
        documentTitle: 'Dogmatic Constitution on Divine Revelation (Dei Verbum)',
        citation: 'DV 10, 21',
        insight: 'Sacred Tradition and Sacred Scripture form one sacred deposit of the word of God, committed to the Church. Holding fast to this deposit the entire holy people united with their shepherds remain always steadfast in the teaching of the Apostles.'
      }
    ],
    inBrief: [
      "This is my beloved Son, with whom I am well pleased; listen to him (Matthew 17:5).",
      "The Transfiguration reveals the divine glory concealed under the veil of Christ's sacred humanity.",
      "Moses and Elijah appearing on Mount Tabor attest that the Law and the Prophets are fulfilled in Jesus Christ."
],
    meditationQuestion: 'Do I listen to the voice of Jesus Christ in prayer, allowing His uncreated light to transfigure my daily thoughts and actions?',
    practicalLiving: 'Fast from noise today and spend twenty minutes reading Sacred Scripture, listening attentively to what the Son reveals.',
    crossReferences: [
      "Matthew 17:1-9",
      "2 Peter 1:16-18",
      "CCC 554",
      "CCC 555"
]
  },
  'mt 17:1-9':   {
    gospelCitation: 'Matthew 17:1-9',
    topicTitle: 'Feast of the Transfiguration of the Lord: The Uncreated Light of Mount Tabor',
    topicSubtitle: 'His face shone like the sun, and his garments became white as light: A Glimpse of the Glory of the Resurrection',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Mysteries of Christ\'s Public Life',
    chapter: 'The Transfiguration of Christ on Mount Tabor',
    paragraphsRange: 'Catechism of the Catholic Church 554, 555, 556, 568',
    catechismArticles: [
      {
            "number": 554,
            "title": "Jesus Gives Peter, James, and John a Foretaste of His Kingdom",
            "text": "From the day Peter confessed that Jesus is the Christ, the Son of the living God, the Master \"began to show his disciples that he must go to Jerusalem and suffer many things... and be killed, and on the third day be raised.\" Peter scorns this prediction, nor do the others understand it any better than he. In this setting Jesus took with him Peter, James, and John his brother, and led them up a high mountain apart. Jesus' face shone like the sun, and his clothes became white as light."
      },
      {
            "number": 555,
            "title": "Christ's Transfiguration Aims at Strengthening the Apostles' Faith",
            "text": "Christ's Transfiguration aims at strengthening the apostles' faith in anticipation of his Passion: the ascent onto the \"high mountain\" prepares for the ascent to Calvary. Christ, Head of the Church, manifests what his Body contains and radiates in the sacraments: \"the hope of glory.\""
      },
      {
            "number": 556,
            "title": "On the Threshold of the Passion Jesus Prepares His Disciples",
            "text": "On the threshold of the public life: the baptism; on the threshold of the Passover: the Transfiguration. Jesus' baptism proclaimed \"the mystery of the first regeneration,\" namely, our Baptism; his Transfiguration \"is the sacrament of the second regeneration\": our own Resurrection. From now on we share in the Lord's Resurrection through the Spirit who acts in the sacraments of the Body of Christ."
      }
],
    magisterialInputs: [
      {
        authority: 'Second Vatican Ecumenical Council',
        documentTitle: 'Dogmatic Constitution on Divine Revelation (Dei Verbum)',
        citation: 'DV 10, 21',
        insight: 'Sacred Tradition and Sacred Scripture form one sacred deposit of the word of God, committed to the Church. Holding fast to this deposit the entire holy people united with their shepherds remain always steadfast in the teaching of the Apostles.'
      }
    ],
    inBrief: [
      "This is my beloved Son, with whom I am well pleased; listen to him (Matthew 17:5).",
      "The Transfiguration reveals the divine glory concealed under the veil of Christ's sacred humanity.",
      "Moses and Elijah appearing on Mount Tabor attest that the Law and the Prophets are fulfilled in Jesus Christ."
],
    meditationQuestion: 'Do I listen to the voice of Jesus Christ in prayer, allowing His uncreated light to transfigure my daily thoughts and actions?',
    practicalLiving: 'Fast from noise today and spend twenty minutes reading Sacred Scripture, listening attentively to what the Son reveals.',
    crossReferences: [
      "Matthew 17:1-9",
      "2 Peter 1:16-18",
      "CCC 554",
      "CCC 555"
]
  },
  'matthew 17:1':   {
    gospelCitation: 'Matthew 17:1-9',
    topicTitle: 'Feast of the Transfiguration of the Lord: The Uncreated Light of Mount Tabor',
    topicSubtitle: 'His face shone like the sun, and his garments became white as light: A Glimpse of the Glory of the Resurrection',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Mysteries of Christ\'s Public Life',
    chapter: 'The Transfiguration of Christ on Mount Tabor',
    paragraphsRange: 'Catechism of the Catholic Church 554, 555, 556, 568',
    catechismArticles: [
      {
            "number": 554,
            "title": "Jesus Gives Peter, James, and John a Foretaste of His Kingdom",
            "text": "From the day Peter confessed that Jesus is the Christ, the Son of the living God, the Master \"began to show his disciples that he must go to Jerusalem and suffer many things... and be killed, and on the third day be raised.\" Peter scorns this prediction, nor do the others understand it any better than he. In this setting Jesus took with him Peter, James, and John his brother, and led them up a high mountain apart. Jesus' face shone like the sun, and his clothes became white as light."
      },
      {
            "number": 555,
            "title": "Christ's Transfiguration Aims at Strengthening the Apostles' Faith",
            "text": "Christ's Transfiguration aims at strengthening the apostles' faith in anticipation of his Passion: the ascent onto the \"high mountain\" prepares for the ascent to Calvary. Christ, Head of the Church, manifests what his Body contains and radiates in the sacraments: \"the hope of glory.\""
      },
      {
            "number": 556,
            "title": "On the Threshold of the Passion Jesus Prepares His Disciples",
            "text": "On the threshold of the public life: the baptism; on the threshold of the Passover: the Transfiguration. Jesus' baptism proclaimed \"the mystery of the first regeneration,\" namely, our Baptism; his Transfiguration \"is the sacrament of the second regeneration\": our own Resurrection. From now on we share in the Lord's Resurrection through the Spirit who acts in the sacraments of the Body of Christ."
      }
],
    magisterialInputs: [
      {
        authority: 'Second Vatican Ecumenical Council',
        documentTitle: 'Dogmatic Constitution on Divine Revelation (Dei Verbum)',
        citation: 'DV 10, 21',
        insight: 'Sacred Tradition and Sacred Scripture form one sacred deposit of the word of God, committed to the Church. Holding fast to this deposit the entire holy people united with their shepherds remain always steadfast in the teaching of the Apostles.'
      }
    ],
    inBrief: [
      "This is my beloved Son, with whom I am well pleased; listen to him (Matthew 17:5).",
      "The Transfiguration reveals the divine glory concealed under the veil of Christ's sacred humanity.",
      "Moses and Elijah appearing on Mount Tabor attest that the Law and the Prophets are fulfilled in Jesus Christ."
],
    meditationQuestion: 'Do I listen to the voice of Jesus Christ in prayer, allowing His uncreated light to transfigure my daily thoughts and actions?',
    practicalLiving: 'Fast from noise today and spend twenty minutes reading Sacred Scripture, listening attentively to what the Son reveals.',
    crossReferences: [
      "Matthew 17:1-9",
      "2 Peter 1:16-18",
      "CCC 554",
      "CCC 555"
]
  },
  'transfiguration':   {
    gospelCitation: 'Matthew 17:1-9',
    topicTitle: 'Feast of the Transfiguration of the Lord: The Uncreated Light of Mount Tabor',
    topicSubtitle: 'His face shone like the sun, and his garments became white as light: A Glimpse of the Glory of the Resurrection',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Mysteries of Christ\'s Public Life',
    chapter: 'The Transfiguration of Christ on Mount Tabor',
    paragraphsRange: 'Catechism of the Catholic Church 554, 555, 556, 568',
    catechismArticles: [
      {
            "number": 554,
            "title": "Jesus Gives Peter, James, and John a Foretaste of His Kingdom",
            "text": "From the day Peter confessed that Jesus is the Christ, the Son of the living God, the Master \"began to show his disciples that he must go to Jerusalem and suffer many things... and be killed, and on the third day be raised.\" Peter scorns this prediction, nor do the others understand it any better than he. In this setting Jesus took with him Peter, James, and John his brother, and led them up a high mountain apart. Jesus' face shone like the sun, and his clothes became white as light."
      },
      {
            "number": 555,
            "title": "Christ's Transfiguration Aims at Strengthening the Apostles' Faith",
            "text": "Christ's Transfiguration aims at strengthening the apostles' faith in anticipation of his Passion: the ascent onto the \"high mountain\" prepares for the ascent to Calvary. Christ, Head of the Church, manifests what his Body contains and radiates in the sacraments: \"the hope of glory.\""
      },
      {
            "number": 556,
            "title": "On the Threshold of the Passion Jesus Prepares His Disciples",
            "text": "On the threshold of the public life: the baptism; on the threshold of the Passover: the Transfiguration. Jesus' baptism proclaimed \"the mystery of the first regeneration,\" namely, our Baptism; his Transfiguration \"is the sacrament of the second regeneration\": our own Resurrection. From now on we share in the Lord's Resurrection through the Spirit who acts in the sacraments of the Body of Christ."
      }
],
    magisterialInputs: [
      {
        authority: 'Second Vatican Ecumenical Council',
        documentTitle: 'Dogmatic Constitution on Divine Revelation (Dei Verbum)',
        citation: 'DV 10, 21',
        insight: 'Sacred Tradition and Sacred Scripture form one sacred deposit of the word of God, committed to the Church. Holding fast to this deposit the entire holy people united with their shepherds remain always steadfast in the teaching of the Apostles.'
      }
    ],
    inBrief: [
      "This is my beloved Son, with whom I am well pleased; listen to him (Matthew 17:5).",
      "The Transfiguration reveals the divine glory concealed under the veil of Christ's sacred humanity.",
      "Moses and Elijah appearing on Mount Tabor attest that the Law and the Prophets are fulfilled in Jesus Christ."
],
    meditationQuestion: 'Do I listen to the voice of Jesus Christ in prayer, allowing His uncreated light to transfigure my daily thoughts and actions?',
    practicalLiving: 'Fast from noise today and spend twenty minutes reading Sacred Scripture, listening attentively to what the Son reveals.',
    crossReferences: [
      "Matthew 17:1-9",
      "2 Peter 1:16-18",
      "CCC 554",
      "CCC 555"
]
  },
  'luke 1:39-56':   {
    gospelCitation: 'Luke 1:39-56',
    topicTitle: 'Solemnity of the Assumption of the Blessed Virgin Mary: The Magnificat & Bodily Glory',
    topicSubtitle: 'My soul magnifies the Lord, and my spirit rejoices in God my Savior: The Ark of the Covenant Assumed into Heaven',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — Mary Assumed into Heaven',
    chapter: 'The Assumption of the Virgin Mary Body and Soul into Heavenly Glory',
    paragraphsRange: 'Catechism of the Catholic Church 966, 969, 972, 2619',
    catechismArticles: [
      {
            "number": 966,
            "title": "The Bodily Assumption of Mary into Heaven",
            "text": "\"Finally the Immaculate Virgin, preserved free from all stain of original sin, when the course of her earthly life was finished, was taken up body and soul into heavenly glory, and exalted by the Lord as Queen over all things, so that she might be the more fully conformed to her Son, the Lord of lords and conqueror of sin and death.\" The Assumption of the Blessed Virgin is a singular participation in her Son's Resurrection and an anticipation of the resurrection of other Christians."
      },
      {
            "number": 969,
            "title": "Mary Continues Her Intercession in Heaven for the Pilgrim Church",
            "text": "\"This motherhood of Mary in the order of grace continues uninterruptedly from the consent which she loyally gave at the Annunciation and which she sustained without wavering beneath the cross, until the eternal fulfillment of all the elect. Taken up to heaven she did not lay aside this saving office but by her manifold intercession continues to bring us the gifts of eternal salvation.\""
      },
      {
            "number": 972,
            "title": "Mary as the Eschatological Icon of the Church",
            "text": "After speaking of the Church, her origin, mission, and destiny, we can find no better way to conclude than by looking to Mary. In her we contemplate what the Church already is in her mystery on her own \"pilgrimage of faith,\" and what she will be in the homeland at the end of her journey. There, \"in the glory of the Most Holy and Undivided Trinity,\" \"in the communion of all the saints,\" the Church is venerated in the person of the Mother of God."
      }
],
    magisterialInputs: [
      {
        authority: 'Second Vatican Ecumenical Council',
        documentTitle: 'Dogmatic Constitution on Divine Revelation (Dei Verbum)',
        citation: 'DV 10, 21',
        insight: 'Sacred Tradition and Sacred Scripture form one sacred deposit of the word of God, committed to the Church. Holding fast to this deposit the entire holy people united with their shepherds remain always steadfast in the teaching of the Apostles.'
      }
    ],
    inBrief: [
      "My soul magnifies the Lord, and my spirit rejoices in God my Savior; for he has regarded the low estate of his handmaiden (Luke 1:46-48).",
      "The bodily Assumption of the Blessed Virgin Mary is the pledge and guarantee of our own bodily resurrection on the last day.",
      "Exalted as Queen of Heaven and Earth, Mary intercedes ceaselessly for the Church Militant on earth."
],
    meditationQuestion: 'Do I contemplate Mary\'s heavenly glory to renew my hope in the promised resurrection and eternal life?',
    practicalLiving: 'Pray the Magnificat today with fervent gratitude for all the mighty works God has done in your life.',
    crossReferences: [
      "Luke 1:39-56",
      "Revelation 12:1",
      "CCC 966",
      "CCC 969"
]
  },
  'lk 1:39-56':   {
    gospelCitation: 'Luke 1:39-56',
    topicTitle: 'Solemnity of the Assumption of the Blessed Virgin Mary: The Magnificat & Bodily Glory',
    topicSubtitle: 'My soul magnifies the Lord, and my spirit rejoices in God my Savior: The Ark of the Covenant Assumed into Heaven',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — Mary Assumed into Heaven',
    chapter: 'The Assumption of the Virgin Mary Body and Soul into Heavenly Glory',
    paragraphsRange: 'Catechism of the Catholic Church 966, 969, 972, 2619',
    catechismArticles: [
      {
            "number": 966,
            "title": "The Bodily Assumption of Mary into Heaven",
            "text": "\"Finally the Immaculate Virgin, preserved free from all stain of original sin, when the course of her earthly life was finished, was taken up body and soul into heavenly glory, and exalted by the Lord as Queen over all things, so that she might be the more fully conformed to her Son, the Lord of lords and conqueror of sin and death.\" The Assumption of the Blessed Virgin is a singular participation in her Son's Resurrection and an anticipation of the resurrection of other Christians."
      },
      {
            "number": 969,
            "title": "Mary Continues Her Intercession in Heaven for the Pilgrim Church",
            "text": "\"This motherhood of Mary in the order of grace continues uninterruptedly from the consent which she loyally gave at the Annunciation and which she sustained without wavering beneath the cross, until the eternal fulfillment of all the elect. Taken up to heaven she did not lay aside this saving office but by her manifold intercession continues to bring us the gifts of eternal salvation.\""
      },
      {
            "number": 972,
            "title": "Mary as the Eschatological Icon of the Church",
            "text": "After speaking of the Church, her origin, mission, and destiny, we can find no better way to conclude than by looking to Mary. In her we contemplate what the Church already is in her mystery on her own \"pilgrimage of faith,\" and what she will be in the homeland at the end of her journey. There, \"in the glory of the Most Holy and Undivided Trinity,\" \"in the communion of all the saints,\" the Church is venerated in the person of the Mother of God."
      }
],
    magisterialInputs: [
      {
        authority: 'Second Vatican Ecumenical Council',
        documentTitle: 'Dogmatic Constitution on Divine Revelation (Dei Verbum)',
        citation: 'DV 10, 21',
        insight: 'Sacred Tradition and Sacred Scripture form one sacred deposit of the word of God, committed to the Church. Holding fast to this deposit the entire holy people united with their shepherds remain always steadfast in the teaching of the Apostles.'
      }
    ],
    inBrief: [
      "My soul magnifies the Lord, and my spirit rejoices in God my Savior; for he has regarded the low estate of his handmaiden (Luke 1:46-48).",
      "The bodily Assumption of the Blessed Virgin Mary is the pledge and guarantee of our own bodily resurrection on the last day.",
      "Exalted as Queen of Heaven and Earth, Mary intercedes ceaselessly for the Church Militant on earth."
],
    meditationQuestion: 'Do I contemplate Mary\'s heavenly glory to renew my hope in the promised resurrection and eternal life?',
    practicalLiving: 'Pray the Magnificat today with fervent gratitude for all the mighty works God has done in your life.',
    crossReferences: [
      "Luke 1:39-56",
      "Revelation 12:1",
      "CCC 966",
      "CCC 969"
]
  },
  'assumption of mary':   {
    gospelCitation: 'Luke 1:39-56',
    topicTitle: 'Solemnity of the Assumption of the Blessed Virgin Mary: The Magnificat & Bodily Glory',
    topicSubtitle: 'My soul magnifies the Lord, and my spirit rejoices in God my Savior: The Ark of the Covenant Assumed into Heaven',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — Mary Assumed into Heaven',
    chapter: 'The Assumption of the Virgin Mary Body and Soul into Heavenly Glory',
    paragraphsRange: 'Catechism of the Catholic Church 966, 969, 972, 2619',
    catechismArticles: [
      {
            "number": 966,
            "title": "The Bodily Assumption of Mary into Heaven",
            "text": "\"Finally the Immaculate Virgin, preserved free from all stain of original sin, when the course of her earthly life was finished, was taken up body and soul into heavenly glory, and exalted by the Lord as Queen over all things, so that she might be the more fully conformed to her Son, the Lord of lords and conqueror of sin and death.\" The Assumption of the Blessed Virgin is a singular participation in her Son's Resurrection and an anticipation of the resurrection of other Christians."
      },
      {
            "number": 969,
            "title": "Mary Continues Her Intercession in Heaven for the Pilgrim Church",
            "text": "\"This motherhood of Mary in the order of grace continues uninterruptedly from the consent which she loyally gave at the Annunciation and which she sustained without wavering beneath the cross, until the eternal fulfillment of all the elect. Taken up to heaven she did not lay aside this saving office but by her manifold intercession continues to bring us the gifts of eternal salvation.\""
      },
      {
            "number": 972,
            "title": "Mary as the Eschatological Icon of the Church",
            "text": "After speaking of the Church, her origin, mission, and destiny, we can find no better way to conclude than by looking to Mary. In her we contemplate what the Church already is in her mystery on her own \"pilgrimage of faith,\" and what she will be in the homeland at the end of her journey. There, \"in the glory of the Most Holy and Undivided Trinity,\" \"in the communion of all the saints,\" the Church is venerated in the person of the Mother of God."
      }
],
    magisterialInputs: [
      {
        authority: 'Second Vatican Ecumenical Council',
        documentTitle: 'Dogmatic Constitution on Divine Revelation (Dei Verbum)',
        citation: 'DV 10, 21',
        insight: 'Sacred Tradition and Sacred Scripture form one sacred deposit of the word of God, committed to the Church. Holding fast to this deposit the entire holy people united with their shepherds remain always steadfast in the teaching of the Apostles.'
      }
    ],
    inBrief: [
      "My soul magnifies the Lord, and my spirit rejoices in God my Savior; for he has regarded the low estate of his handmaiden (Luke 1:46-48).",
      "The bodily Assumption of the Blessed Virgin Mary is the pledge and guarantee of our own bodily resurrection on the last day.",
      "Exalted as Queen of Heaven and Earth, Mary intercedes ceaselessly for the Church Militant on earth."
],
    meditationQuestion: 'Do I contemplate Mary\'s heavenly glory to renew my hope in the promised resurrection and eternal life?',
    practicalLiving: 'Pray the Magnificat today with fervent gratitude for all the mighty works God has done in your life.',
    crossReferences: [
      "Luke 1:39-56",
      "Revelation 12:1",
      "CCC 966",
      "CCC 969"
]
  },
  'magnificat':   {
    gospelCitation: 'Luke 1:39-56',
    topicTitle: 'Solemnity of the Assumption of the Blessed Virgin Mary: The Magnificat & Bodily Glory',
    topicSubtitle: 'My soul magnifies the Lord, and my spirit rejoices in God my Savior: The Ark of the Covenant Assumed into Heaven',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — Mary Assumed into Heaven',
    chapter: 'The Assumption of the Virgin Mary Body and Soul into Heavenly Glory',
    paragraphsRange: 'Catechism of the Catholic Church 966, 969, 972, 2619',
    catechismArticles: [
      {
            "number": 966,
            "title": "The Bodily Assumption of Mary into Heaven",
            "text": "\"Finally the Immaculate Virgin, preserved free from all stain of original sin, when the course of her earthly life was finished, was taken up body and soul into heavenly glory, and exalted by the Lord as Queen over all things, so that she might be the more fully conformed to her Son, the Lord of lords and conqueror of sin and death.\" The Assumption of the Blessed Virgin is a singular participation in her Son's Resurrection and an anticipation of the resurrection of other Christians."
      },
      {
            "number": 969,
            "title": "Mary Continues Her Intercession in Heaven for the Pilgrim Church",
            "text": "\"This motherhood of Mary in the order of grace continues uninterruptedly from the consent which she loyally gave at the Annunciation and which she sustained without wavering beneath the cross, until the eternal fulfillment of all the elect. Taken up to heaven she did not lay aside this saving office but by her manifold intercession continues to bring us the gifts of eternal salvation.\""
      },
      {
            "number": 972,
            "title": "Mary as the Eschatological Icon of the Church",
            "text": "After speaking of the Church, her origin, mission, and destiny, we can find no better way to conclude than by looking to Mary. In her we contemplate what the Church already is in her mystery on her own \"pilgrimage of faith,\" and what she will be in the homeland at the end of her journey. There, \"in the glory of the Most Holy and Undivided Trinity,\" \"in the communion of all the saints,\" the Church is venerated in the person of the Mother of God."
      }
],
    magisterialInputs: [
      {
        authority: 'Second Vatican Ecumenical Council',
        documentTitle: 'Dogmatic Constitution on Divine Revelation (Dei Verbum)',
        citation: 'DV 10, 21',
        insight: 'Sacred Tradition and Sacred Scripture form one sacred deposit of the word of God, committed to the Church. Holding fast to this deposit the entire holy people united with their shepherds remain always steadfast in the teaching of the Apostles.'
      }
    ],
    inBrief: [
      "My soul magnifies the Lord, and my spirit rejoices in God my Savior; for he has regarded the low estate of his handmaiden (Luke 1:46-48).",
      "The bodily Assumption of the Blessed Virgin Mary is the pledge and guarantee of our own bodily resurrection on the last day.",
      "Exalted as Queen of Heaven and Earth, Mary intercedes ceaselessly for the Church Militant on earth."
],
    meditationQuestion: 'Do I contemplate Mary\'s heavenly glory to renew my hope in the promised resurrection and eternal life?',
    practicalLiving: 'Pray the Magnificat today with fervent gratitude for all the mighty works God has done in your life.',
    crossReferences: [
      "Luke 1:39-56",
      "Revelation 12:1",
      "CCC 966",
      "CCC 969"
]
  },
  'john 3:13-17':   {
    gospelCitation: 'John 3:13-17',
    topicTitle: 'Feast of the Exaltation of the Holy Cross: "God So Loved the World" & The Lifted-Up Son of Man',
    topicSubtitle: 'For God so loved the world that he gave his only-begotten Son: Ave Crux, Spes Unica',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Mystery of Redemptive Love',
    chapter: 'The Cross of Christ as the Source of Eternal Salvation',
    paragraphsRange: 'Catechism of the Catholic Church 444, 458, 616, 617',
    catechismArticles: [
      {
            "number": 444,
            "title": "The Gospels Narrate the Unique Filial Relationship of Jesus to the Father",
            "text": "The Gospels narrate on two solemn moments, the baptism and the Transfiguration of Christ, the voice of the Father designating him his \"beloved Son.\" Jesus calls himself the \"only Son\" of God, and by this title affirms his eternal pre-existence: \"God so loved the world that he gave his only Son.\""
      },
      {
            "number": 458,
            "title": "The Word Became Flesh That Thus We Might Know God's Love",
            "text": "The Word became flesh that thus we might know God's love: \"In this the love of God was made manifest among us, that God sent his only Son into the world, so that we might live through him.\" \"For God so loved the world that he gave his only Son, that whoever believes in him should not perish but have eternal life.\""
      },
      {
            "number": 617,
            "title": "The Council of Trent Emphasizes the Unique Character of Christ's Sacrifice",
            "text": "The Council of Trent emphasizes the unique character of Christ's sacrifice as \"the source of eternal salvation\" and teaches that \"his most holy Passion on the wood of the cross merited justification for us.\" And the Church venerates his cross, chanting: \"Hail, O Cross, our only hope.\""
      }
],
    magisterialInputs: [
      {
        authority: 'Second Vatican Ecumenical Council',
        documentTitle: 'Dogmatic Constitution on Divine Revelation (Dei Verbum)',
        citation: 'DV 10, 21',
        insight: 'Sacred Tradition and Sacred Scripture form one sacred deposit of the word of God, committed to the Church. Holding fast to this deposit the entire holy people united with their shepherds remain always steadfast in the teaching of the Apostles.'
      }
    ],
    inBrief: [
      "For God sent the Son into the world, not to condemn the world, but that the world might be saved through him (John 3:17).",
      "The Cross is not an instrument of defeat, but the triumphal throne from which Christ reigns over human hearts.",
      "As Moses lifted up the bronze serpent in the desert, so Christ was lifted up on Golgotha to heal the poisonous bite of sin."
],
    meditationQuestion: 'Do I run away from crosses and suffering, or do I embrace them in union with the redemptive love of Jesus Christ?',
    practicalLiving: 'Make a reverent Sign of the Cross on your forehead, lips, and heart today, professing: "We adore Thee, O Christ, and we bless Thee, because by Thy Holy Cross Thou hast redeemed the world."',
    crossReferences: [
      "John 3:13-17",
      "Numbers 21:8-9",
      "CCC 458",
      "CCC 617"
]
  },
  'jn 3:13-17':   {
    gospelCitation: 'John 3:13-17',
    topicTitle: 'Feast of the Exaltation of the Holy Cross: "God So Loved the World" & The Lifted-Up Son of Man',
    topicSubtitle: 'For God so loved the world that he gave his only-begotten Son: Ave Crux, Spes Unica',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Mystery of Redemptive Love',
    chapter: 'The Cross of Christ as the Source of Eternal Salvation',
    paragraphsRange: 'Catechism of the Catholic Church 444, 458, 616, 617',
    catechismArticles: [
      {
            "number": 444,
            "title": "The Gospels Narrate the Unique Filial Relationship of Jesus to the Father",
            "text": "The Gospels narrate on two solemn moments, the baptism and the Transfiguration of Christ, the voice of the Father designating him his \"beloved Son.\" Jesus calls himself the \"only Son\" of God, and by this title affirms his eternal pre-existence: \"God so loved the world that he gave his only Son.\""
      },
      {
            "number": 458,
            "title": "The Word Became Flesh That Thus We Might Know God's Love",
            "text": "The Word became flesh that thus we might know God's love: \"In this the love of God was made manifest among us, that God sent his only Son into the world, so that we might live through him.\" \"For God so loved the world that he gave his only Son, that whoever believes in him should not perish but have eternal life.\""
      },
      {
            "number": 617,
            "title": "The Council of Trent Emphasizes the Unique Character of Christ's Sacrifice",
            "text": "The Council of Trent emphasizes the unique character of Christ's sacrifice as \"the source of eternal salvation\" and teaches that \"his most holy Passion on the wood of the cross merited justification for us.\" And the Church venerates his cross, chanting: \"Hail, O Cross, our only hope.\""
      }
],
    magisterialInputs: [
      {
        authority: 'Second Vatican Ecumenical Council',
        documentTitle: 'Dogmatic Constitution on Divine Revelation (Dei Verbum)',
        citation: 'DV 10, 21',
        insight: 'Sacred Tradition and Sacred Scripture form one sacred deposit of the word of God, committed to the Church. Holding fast to this deposit the entire holy people united with their shepherds remain always steadfast in the teaching of the Apostles.'
      }
    ],
    inBrief: [
      "For God sent the Son into the world, not to condemn the world, but that the world might be saved through him (John 3:17).",
      "The Cross is not an instrument of defeat, but the triumphal throne from which Christ reigns over human hearts.",
      "As Moses lifted up the bronze serpent in the desert, so Christ was lifted up on Golgotha to heal the poisonous bite of sin."
],
    meditationQuestion: 'Do I run away from crosses and suffering, or do I embrace them in union with the redemptive love of Jesus Christ?',
    practicalLiving: 'Make a reverent Sign of the Cross on your forehead, lips, and heart today, professing: "We adore Thee, O Christ, and we bless Thee, because by Thy Holy Cross Thou hast redeemed the world."',
    crossReferences: [
      "John 3:13-17",
      "Numbers 21:8-9",
      "CCC 458",
      "CCC 617"
]
  },
  'john 3:13':   {
    gospelCitation: 'John 3:13-17',
    topicTitle: 'Feast of the Exaltation of the Holy Cross: "God So Loved the World" & The Lifted-Up Son of Man',
    topicSubtitle: 'For God so loved the world that he gave his only-begotten Son: Ave Crux, Spes Unica',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Mystery of Redemptive Love',
    chapter: 'The Cross of Christ as the Source of Eternal Salvation',
    paragraphsRange: 'Catechism of the Catholic Church 444, 458, 616, 617',
    catechismArticles: [
      {
            "number": 444,
            "title": "The Gospels Narrate the Unique Filial Relationship of Jesus to the Father",
            "text": "The Gospels narrate on two solemn moments, the baptism and the Transfiguration of Christ, the voice of the Father designating him his \"beloved Son.\" Jesus calls himself the \"only Son\" of God, and by this title affirms his eternal pre-existence: \"God so loved the world that he gave his only Son.\""
      },
      {
            "number": 458,
            "title": "The Word Became Flesh That Thus We Might Know God's Love",
            "text": "The Word became flesh that thus we might know God's love: \"In this the love of God was made manifest among us, that God sent his only Son into the world, so that we might live through him.\" \"For God so loved the world that he gave his only Son, that whoever believes in him should not perish but have eternal life.\""
      },
      {
            "number": 617,
            "title": "The Council of Trent Emphasizes the Unique Character of Christ's Sacrifice",
            "text": "The Council of Trent emphasizes the unique character of Christ's sacrifice as \"the source of eternal salvation\" and teaches that \"his most holy Passion on the wood of the cross merited justification for us.\" And the Church venerates his cross, chanting: \"Hail, O Cross, our only hope.\""
      }
],
    magisterialInputs: [
      {
        authority: 'Second Vatican Ecumenical Council',
        documentTitle: 'Dogmatic Constitution on Divine Revelation (Dei Verbum)',
        citation: 'DV 10, 21',
        insight: 'Sacred Tradition and Sacred Scripture form one sacred deposit of the word of God, committed to the Church. Holding fast to this deposit the entire holy people united with their shepherds remain always steadfast in the teaching of the Apostles.'
      }
    ],
    inBrief: [
      "For God sent the Son into the world, not to condemn the world, but that the world might be saved through him (John 3:17).",
      "The Cross is not an instrument of defeat, but the triumphal throne from which Christ reigns over human hearts.",
      "As Moses lifted up the bronze serpent in the desert, so Christ was lifted up on Golgotha to heal the poisonous bite of sin."
],
    meditationQuestion: 'Do I run away from crosses and suffering, or do I embrace them in union with the redemptive love of Jesus Christ?',
    practicalLiving: 'Make a reverent Sign of the Cross on your forehead, lips, and heart today, professing: "We adore Thee, O Christ, and we bless Thee, because by Thy Holy Cross Thou hast redeemed the world."',
    crossReferences: [
      "John 3:13-17",
      "Numbers 21:8-9",
      "CCC 458",
      "CCC 617"
]
  },
  'exaltation of the holy cross':   {
    gospelCitation: 'John 3:13-17',
    topicTitle: 'Feast of the Exaltation of the Holy Cross: "God So Loved the World" & The Lifted-Up Son of Man',
    topicSubtitle: 'For God so loved the world that he gave his only-begotten Son: Ave Crux, Spes Unica',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Mystery of Redemptive Love',
    chapter: 'The Cross of Christ as the Source of Eternal Salvation',
    paragraphsRange: 'Catechism of the Catholic Church 444, 458, 616, 617',
    catechismArticles: [
      {
            "number": 444,
            "title": "The Gospels Narrate the Unique Filial Relationship of Jesus to the Father",
            "text": "The Gospels narrate on two solemn moments, the baptism and the Transfiguration of Christ, the voice of the Father designating him his \"beloved Son.\" Jesus calls himself the \"only Son\" of God, and by this title affirms his eternal pre-existence: \"God so loved the world that he gave his only Son.\""
      },
      {
            "number": 458,
            "title": "The Word Became Flesh That Thus We Might Know God's Love",
            "text": "The Word became flesh that thus we might know God's love: \"In this the love of God was made manifest among us, that God sent his only Son into the world, so that we might live through him.\" \"For God so loved the world that he gave his only Son, that whoever believes in him should not perish but have eternal life.\""
      },
      {
            "number": 617,
            "title": "The Council of Trent Emphasizes the Unique Character of Christ's Sacrifice",
            "text": "The Council of Trent emphasizes the unique character of Christ's sacrifice as \"the source of eternal salvation\" and teaches that \"his most holy Passion on the wood of the cross merited justification for us.\" And the Church venerates his cross, chanting: \"Hail, O Cross, our only hope.\""
      }
],
    magisterialInputs: [
      {
        authority: 'Second Vatican Ecumenical Council',
        documentTitle: 'Dogmatic Constitution on Divine Revelation (Dei Verbum)',
        citation: 'DV 10, 21',
        insight: 'Sacred Tradition and Sacred Scripture form one sacred deposit of the word of God, committed to the Church. Holding fast to this deposit the entire holy people united with their shepherds remain always steadfast in the teaching of the Apostles.'
      }
    ],
    inBrief: [
      "For God sent the Son into the world, not to condemn the world, but that the world might be saved through him (John 3:17).",
      "The Cross is not an instrument of defeat, but the triumphal throne from which Christ reigns over human hearts.",
      "As Moses lifted up the bronze serpent in the desert, so Christ was lifted up on Golgotha to heal the poisonous bite of sin."
],
    meditationQuestion: 'Do I run away from crosses and suffering, or do I embrace them in union with the redemptive love of Jesus Christ?',
    practicalLiving: 'Make a reverent Sign of the Cross on your forehead, lips, and heart today, professing: "We adore Thee, O Christ, and we bless Thee, because by Thy Holy Cross Thou hast redeemed the world."',
    crossReferences: [
      "John 3:13-17",
      "Numbers 21:8-9",
      "CCC 458",
      "CCC 617"
]
  },
  'john 3:16':   {
    gospelCitation: 'John 3:13-17',
    topicTitle: 'Feast of the Exaltation of the Holy Cross: "God So Loved the World" & The Lifted-Up Son of Man',
    topicSubtitle: 'For God so loved the world that he gave his only-begotten Son: Ave Crux, Spes Unica',
    pillar: '',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creed — The Mystery of Redemptive Love',
    chapter: 'The Cross of Christ as the Source of Eternal Salvation',
    paragraphsRange: 'Catechism of the Catholic Church 444, 458, 616, 617',
    catechismArticles: [
      {
            "number": 444,
            "title": "The Gospels Narrate the Unique Filial Relationship of Jesus to the Father",
            "text": "The Gospels narrate on two solemn moments, the baptism and the Transfiguration of Christ, the voice of the Father designating him his \"beloved Son.\" Jesus calls himself the \"only Son\" of God, and by this title affirms his eternal pre-existence: \"God so loved the world that he gave his only Son.\""
      },
      {
            "number": 458,
            "title": "The Word Became Flesh That Thus We Might Know God's Love",
            "text": "The Word became flesh that thus we might know God's love: \"In this the love of God was made manifest among us, that God sent his only Son into the world, so that we might live through him.\" \"For God so loved the world that he gave his only Son, that whoever believes in him should not perish but have eternal life.\""
      },
      {
            "number": 617,
            "title": "The Council of Trent Emphasizes the Unique Character of Christ's Sacrifice",
            "text": "The Council of Trent emphasizes the unique character of Christ's sacrifice as \"the source of eternal salvation\" and teaches that \"his most holy Passion on the wood of the cross merited justification for us.\" And the Church venerates his cross, chanting: \"Hail, O Cross, our only hope.\""
      }
],
    magisterialInputs: [
      {
        authority: 'Second Vatican Ecumenical Council',
        documentTitle: 'Dogmatic Constitution on Divine Revelation (Dei Verbum)',
        citation: 'DV 10, 21',
        insight: 'Sacred Tradition and Sacred Scripture form one sacred deposit of the word of God, committed to the Church. Holding fast to this deposit the entire holy people united with their shepherds remain always steadfast in the teaching of the Apostles.'
      }
    ],
    inBrief: [
      "For God sent the Son into the world, not to condemn the world, but that the world might be saved through him (John 3:17).",
      "The Cross is not an instrument of defeat, but the triumphal throne from which Christ reigns over human hearts.",
      "As Moses lifted up the bronze serpent in the desert, so Christ was lifted up on Golgotha to heal the poisonous bite of sin."
],
    meditationQuestion: 'Do I run away from crosses and suffering, or do I embrace them in union with the redemptive love of Jesus Christ?',
    practicalLiving: 'Make a reverent Sign of the Cross on your forehead, lips, and heart today, professing: "We adore Thee, O Christ, and we bless Thee, because by Thy Holy Cross Thou hast redeemed the world."',
    crossReferences: [
      "John 3:13-17",
      "Numbers 21:8-9",
      "CCC 458",
      "CCC 617"
]
  },
  'luke 11:47-54':   {
    gospelCitation: 'Luke 11:47-54',
    topicTitle: 'Memorial of St. Teresa of Jesus: The Key of Knowledge and The Depths of Interior Prayer',
    topicSubtitle: 'Woe to you lawyers! For you have taken away the key of knowledge: The Interior Castle and Friendship with God',
    pillar: '',
    part: 'Part Four: Christian Prayer',
    section: 'Section One: Prayer in the Christian Life',
    chapter: 'The Tradition of Prayer — The Way of Contemplation',
    paragraphsRange: 'Catechism of the Catholic Church 2562, 2709, 2710, 2715',
    catechismArticles: [
      {
            "number": 2562,
            "title": "Where Does Prayer Come From? Out of the Depths of the Heart",
            "text": "Where does prayer come from? Whether prayer is expressed in words or gestures, it is the whole man who prays. But in naming the source of prayer, Scripture speaks sometimes of the soul or the spirit, but most often of the heart (more than a thousand times). According to Scripture, it is the heart that prays. If our heart is far from God, the words of prayer are in vain."
      },
      {
            "number": 2709,
            "title": "St. Teresa's Definition of Contemplative Prayer",
            "text": "What is contemplative prayer? St. Teresa answers: \"Contemplative prayer in my opinion is nothing else than a close sharing between friends; it means taking time frequently to be alone with him who we know loves us.\" Contemplative prayer seeks him \"whom my soul loves.\" It is Jesus, and in him, the Father."
      },
      {
            "number": 2715,
            "title": "Contemplation as the Gaze of Faith Fixed on Jesus",
            "text": "Contemplation is a gaze of faith, fixed on Jesus. \"I look at him and he looks at me\": this is what a certain peasant of Ars used to say to his holy curé about his prayer before the tabernacle. This focus on Jesus is a renunciation of self. His gaze purifies our heart; the light of the countenance of Jesus illumines the eyes of our heart."
      }
],
    magisterialInputs: [
      {
        authority: 'Second Vatican Ecumenical Council',
        documentTitle: 'Dogmatic Constitution on Divine Revelation (Dei Verbum)',
        citation: 'DV 10, 21',
        insight: 'Sacred Tradition and Sacred Scripture form one sacred deposit of the word of God, committed to the Church. Holding fast to this deposit the entire holy people united with their shepherds remain always steadfast in the teaching of the Apostles.'
      }
    ],
    inBrief: [
      "Woe to you! For you have taken away the key of knowledge (Luke 11:52).",
      "The true key of divine knowledge is not cold intellectual pride, but humble contemplative prayer and love for Christ.",
      "As St. Teresa of Jesus wrote: \"Let nothing disturb thee, nothing affright thee; all things are passing; God never changeth. Patience obtaineth all things. Who God possesseth in nothing is wanting: God alone sufficeth.\""
],
    meditationQuestion: 'Do I practice mental prayer as an intimate friendship with Jesus, or do I settle for external routine?',
    practicalLiving: 'Pray St. Teresa\'s Bookmark prayer today: "Solo Dios basta" (God alone suffices), letting go of anxiety.',
    crossReferences: [
      "Luke 11:47-54",
      "Colossians 2:2-3",
      "CCC 2562",
      "CCC 2709"
]
  },
  'lk 11:47-54':   {
    gospelCitation: 'Luke 11:47-54',
    topicTitle: 'Memorial of St. Teresa of Jesus: The Key of Knowledge and The Depths of Interior Prayer',
    topicSubtitle: 'Woe to you lawyers! For you have taken away the key of knowledge: The Interior Castle and Friendship with God',
    pillar: '',
    part: 'Part Four: Christian Prayer',
    section: 'Section One: Prayer in the Christian Life',
    chapter: 'The Tradition of Prayer — The Way of Contemplation',
    paragraphsRange: 'Catechism of the Catholic Church 2562, 2709, 2710, 2715',
    catechismArticles: [
      {
            "number": 2562,
            "title": "Where Does Prayer Come From? Out of the Depths of the Heart",
            "text": "Where does prayer come from? Whether prayer is expressed in words or gestures, it is the whole man who prays. But in naming the source of prayer, Scripture speaks sometimes of the soul or the spirit, but most often of the heart (more than a thousand times). According to Scripture, it is the heart that prays. If our heart is far from God, the words of prayer are in vain."
      },
      {
            "number": 2709,
            "title": "St. Teresa's Definition of Contemplative Prayer",
            "text": "What is contemplative prayer? St. Teresa answers: \"Contemplative prayer in my opinion is nothing else than a close sharing between friends; it means taking time frequently to be alone with him who we know loves us.\" Contemplative prayer seeks him \"whom my soul loves.\" It is Jesus, and in him, the Father."
      },
      {
            "number": 2715,
            "title": "Contemplation as the Gaze of Faith Fixed on Jesus",
            "text": "Contemplation is a gaze of faith, fixed on Jesus. \"I look at him and he looks at me\": this is what a certain peasant of Ars used to say to his holy curé about his prayer before the tabernacle. This focus on Jesus is a renunciation of self. His gaze purifies our heart; the light of the countenance of Jesus illumines the eyes of our heart."
      }
],
    magisterialInputs: [
      {
        authority: 'Second Vatican Ecumenical Council',
        documentTitle: 'Dogmatic Constitution on Divine Revelation (Dei Verbum)',
        citation: 'DV 10, 21',
        insight: 'Sacred Tradition and Sacred Scripture form one sacred deposit of the word of God, committed to the Church. Holding fast to this deposit the entire holy people united with their shepherds remain always steadfast in the teaching of the Apostles.'
      }
    ],
    inBrief: [
      "Woe to you! For you have taken away the key of knowledge (Luke 11:52).",
      "The true key of divine knowledge is not cold intellectual pride, but humble contemplative prayer and love for Christ.",
      "As St. Teresa of Jesus wrote: \"Let nothing disturb thee, nothing affright thee; all things are passing; God never changeth. Patience obtaineth all things. Who God possesseth in nothing is wanting: God alone sufficeth.\""
],
    meditationQuestion: 'Do I practice mental prayer as an intimate friendship with Jesus, or do I settle for external routine?',
    practicalLiving: 'Pray St. Teresa\'s Bookmark prayer today: "Solo Dios basta" (God alone suffices), letting go of anxiety.',
    crossReferences: [
      "Luke 11:47-54",
      "Colossians 2:2-3",
      "CCC 2562",
      "CCC 2709"
]
  },
  'luke 11:47':   {
    gospelCitation: 'Luke 11:47-54',
    topicTitle: 'Memorial of St. Teresa of Jesus: The Key of Knowledge and The Depths of Interior Prayer',
    topicSubtitle: 'Woe to you lawyers! For you have taken away the key of knowledge: The Interior Castle and Friendship with God',
    pillar: '',
    part: 'Part Four: Christian Prayer',
    section: 'Section One: Prayer in the Christian Life',
    chapter: 'The Tradition of Prayer — The Way of Contemplation',
    paragraphsRange: 'Catechism of the Catholic Church 2562, 2709, 2710, 2715',
    catechismArticles: [
      {
            "number": 2562,
            "title": "Where Does Prayer Come From? Out of the Depths of the Heart",
            "text": "Where does prayer come from? Whether prayer is expressed in words or gestures, it is the whole man who prays. But in naming the source of prayer, Scripture speaks sometimes of the soul or the spirit, but most often of the heart (more than a thousand times). According to Scripture, it is the heart that prays. If our heart is far from God, the words of prayer are in vain."
      },
      {
            "number": 2709,
            "title": "St. Teresa's Definition of Contemplative Prayer",
            "text": "What is contemplative prayer? St. Teresa answers: \"Contemplative prayer in my opinion is nothing else than a close sharing between friends; it means taking time frequently to be alone with him who we know loves us.\" Contemplative prayer seeks him \"whom my soul loves.\" It is Jesus, and in him, the Father."
      },
      {
            "number": 2715,
            "title": "Contemplation as the Gaze of Faith Fixed on Jesus",
            "text": "Contemplation is a gaze of faith, fixed on Jesus. \"I look at him and he looks at me\": this is what a certain peasant of Ars used to say to his holy curé about his prayer before the tabernacle. This focus on Jesus is a renunciation of self. His gaze purifies our heart; the light of the countenance of Jesus illumines the eyes of our heart."
      }
],
    magisterialInputs: [
      {
        authority: 'Second Vatican Ecumenical Council',
        documentTitle: 'Dogmatic Constitution on Divine Revelation (Dei Verbum)',
        citation: 'DV 10, 21',
        insight: 'Sacred Tradition and Sacred Scripture form one sacred deposit of the word of God, committed to the Church. Holding fast to this deposit the entire holy people united with their shepherds remain always steadfast in the teaching of the Apostles.'
      }
    ],
    inBrief: [
      "Woe to you! For you have taken away the key of knowledge (Luke 11:52).",
      "The true key of divine knowledge is not cold intellectual pride, but humble contemplative prayer and love for Christ.",
      "As St. Teresa of Jesus wrote: \"Let nothing disturb thee, nothing affright thee; all things are passing; God never changeth. Patience obtaineth all things. Who God possesseth in nothing is wanting: God alone sufficeth.\""
],
    meditationQuestion: 'Do I practice mental prayer as an intimate friendship with Jesus, or do I settle for external routine?',
    practicalLiving: 'Pray St. Teresa\'s Bookmark prayer today: "Solo Dios basta" (God alone suffices), letting go of anxiety.',
    crossReferences: [
      "Luke 11:47-54",
      "Colossians 2:2-3",
      "CCC 2562",
      "CCC 2709"
]
  },
  'st teresa of jesus':   {
    gospelCitation: 'Luke 11:47-54',
    topicTitle: 'Memorial of St. Teresa of Jesus: The Key of Knowledge and The Depths of Interior Prayer',
    topicSubtitle: 'Woe to you lawyers! For you have taken away the key of knowledge: The Interior Castle and Friendship with God',
    pillar: '',
    part: 'Part Four: Christian Prayer',
    section: 'Section One: Prayer in the Christian Life',
    chapter: 'The Tradition of Prayer — The Way of Contemplation',
    paragraphsRange: 'Catechism of the Catholic Church 2562, 2709, 2710, 2715',
    catechismArticles: [
      {
            "number": 2562,
            "title": "Where Does Prayer Come From? Out of the Depths of the Heart",
            "text": "Where does prayer come from? Whether prayer is expressed in words or gestures, it is the whole man who prays. But in naming the source of prayer, Scripture speaks sometimes of the soul or the spirit, but most often of the heart (more than a thousand times). According to Scripture, it is the heart that prays. If our heart is far from God, the words of prayer are in vain."
      },
      {
            "number": 2709,
            "title": "St. Teresa's Definition of Contemplative Prayer",
            "text": "What is contemplative prayer? St. Teresa answers: \"Contemplative prayer in my opinion is nothing else than a close sharing between friends; it means taking time frequently to be alone with him who we know loves us.\" Contemplative prayer seeks him \"whom my soul loves.\" It is Jesus, and in him, the Father."
      },
      {
            "number": 2715,
            "title": "Contemplation as the Gaze of Faith Fixed on Jesus",
            "text": "Contemplation is a gaze of faith, fixed on Jesus. \"I look at him and he looks at me\": this is what a certain peasant of Ars used to say to his holy curé about his prayer before the tabernacle. This focus on Jesus is a renunciation of self. His gaze purifies our heart; the light of the countenance of Jesus illumines the eyes of our heart."
      }
],
    magisterialInputs: [
      {
        authority: 'Second Vatican Ecumenical Council',
        documentTitle: 'Dogmatic Constitution on Divine Revelation (Dei Verbum)',
        citation: 'DV 10, 21',
        insight: 'Sacred Tradition and Sacred Scripture form one sacred deposit of the word of God, committed to the Church. Holding fast to this deposit the entire holy people united with their shepherds remain always steadfast in the teaching of the Apostles.'
      }
    ],
    inBrief: [
      "Woe to you! For you have taken away the key of knowledge (Luke 11:52).",
      "The true key of divine knowledge is not cold intellectual pride, but humble contemplative prayer and love for Christ.",
      "As St. Teresa of Jesus wrote: \"Let nothing disturb thee, nothing affright thee; all things are passing; God never changeth. Patience obtaineth all things. Who God possesseth in nothing is wanting: God alone sufficeth.\""
],
    meditationQuestion: 'Do I practice mental prayer as an intimate friendship with Jesus, or do I settle for external routine?',
    practicalLiving: 'Pray St. Teresa\'s Bookmark prayer today: "Solo Dios basta" (God alone suffices), letting go of anxiety.',
    crossReferences: [
      "Luke 11:47-54",
      "Colossians 2:2-3",
      "CCC 2562",
      "CCC 2709"
]
  },
  'st teresa of avila':   {
    gospelCitation: 'Luke 11:47-54',
    topicTitle: 'Memorial of St. Teresa of Jesus: The Key of Knowledge and The Depths of Interior Prayer',
    topicSubtitle: 'Woe to you lawyers! For you have taken away the key of knowledge: The Interior Castle and Friendship with God',
    pillar: '',
    part: 'Part Four: Christian Prayer',
    section: 'Section One: Prayer in the Christian Life',
    chapter: 'The Tradition of Prayer — The Way of Contemplation',
    paragraphsRange: 'Catechism of the Catholic Church 2562, 2709, 2710, 2715',
    catechismArticles: [
      {
            "number": 2562,
            "title": "Where Does Prayer Come From? Out of the Depths of the Heart",
            "text": "Where does prayer come from? Whether prayer is expressed in words or gestures, it is the whole man who prays. But in naming the source of prayer, Scripture speaks sometimes of the soul or the spirit, but most often of the heart (more than a thousand times). According to Scripture, it is the heart that prays. If our heart is far from God, the words of prayer are in vain."
      },
      {
            "number": 2709,
            "title": "St. Teresa's Definition of Contemplative Prayer",
            "text": "What is contemplative prayer? St. Teresa answers: \"Contemplative prayer in my opinion is nothing else than a close sharing between friends; it means taking time frequently to be alone with him who we know loves us.\" Contemplative prayer seeks him \"whom my soul loves.\" It is Jesus, and in him, the Father."
      },
      {
            "number": 2715,
            "title": "Contemplation as the Gaze of Faith Fixed on Jesus",
            "text": "Contemplation is a gaze of faith, fixed on Jesus. \"I look at him and he looks at me\": this is what a certain peasant of Ars used to say to his holy curé about his prayer before the tabernacle. This focus on Jesus is a renunciation of self. His gaze purifies our heart; the light of the countenance of Jesus illumines the eyes of our heart."
      }
],
    magisterialInputs: [
      {
        authority: 'Second Vatican Ecumenical Council',
        documentTitle: 'Dogmatic Constitution on Divine Revelation (Dei Verbum)',
        citation: 'DV 10, 21',
        insight: 'Sacred Tradition and Sacred Scripture form one sacred deposit of the word of God, committed to the Church. Holding fast to this deposit the entire holy people united with their shepherds remain always steadfast in the teaching of the Apostles.'
      }
    ],
    inBrief: [
      "Woe to you! For you have taken away the key of knowledge (Luke 11:52).",
      "The true key of divine knowledge is not cold intellectual pride, but humble contemplative prayer and love for Christ.",
      "As St. Teresa of Jesus wrote: \"Let nothing disturb thee, nothing affright thee; all things are passing; God never changeth. Patience obtaineth all things. Who God possesseth in nothing is wanting: God alone sufficeth.\""
],
    meditationQuestion: 'Do I practice mental prayer as an intimate friendship with Jesus, or do I settle for external routine?',
    practicalLiving: 'Pray St. Teresa\'s Bookmark prayer today: "Solo Dios basta" (God alone suffices), letting go of anxiety.',
    crossReferences: [
      "Luke 11:47-54",
      "Colossians 2:2-3",
      "CCC 2562",
      "CCC 2709"
]
  },
  'luke 10:1-9':   {
    gospelCitation: 'Luke 10:1-9',
    topicTitle: 'Feast of St. Luke the Evangelist: The Harvest is Plentiful & The Physician of Soul and Body',
    topicSubtitle: 'The harvest is plentiful, but the laborers are few; pray therefore the Lord of the harvest to send out laborers',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Two: The Sacraments of the Church',
    section: 'Section Two: The Seven Sacraments — The Anointing of the Sick',
    chapter: 'The Apostolic Mission and Christ the Divine Physician',
    paragraphsRange: 'Catechism of the Catholic Church 852, 856, 1503, 1506',
    catechismArticles: [
      {
            "number": 852,
            "title": "The Missionary Mandate Requires the Church to Follow Christ's Example",
            "text": "The missionary mandate implies a delicate process of inculturation if the Gospel is to take flesh in each people's culture. The Church's mission stimulates efforts towards Christian unity. The missionary path passes by way of poverty, obedience, service and self-sacrifice, even to death, from which Christ emerged victorious."
      },
      {
            "number": 1503,
            "title": "Christ's Compassion for the Sick and The Mystery of Healing",
            "text": "Christ's compassion toward the sick and his many healings of every kind of infirmity are a resplendent sign that \"God has visited his people\" and that the Kingdom of God is close at hand. Jesus has the power not only to heal, but also to forgive sins; he has come to heal the whole man, soul and body; he is the physician the sick have need of."
      },
      {
            "number": 1506,
            "title": "Christ Invites Disciples to Share His Ministry of Healing",
            "text": "Christ invites his disciples to follow him by taking up their cross in their turn. By following him they acquire a new outlook on illness and the sick. Jesus associates them with his own life of poverty and service. He makes them share in his ministry of compassion and healing: \"So they went out and preached that men should repent. And they cast out many demons, and anointed with oil many that were sick and healed them.\""
      }
],
    magisterialInputs: [
      {
        authority: 'Second Vatican Ecumenical Council',
        documentTitle: 'Dogmatic Constitution on Divine Revelation (Dei Verbum)',
        citation: 'DV 10, 21',
        insight: 'Sacred Tradition and Sacred Scripture form one sacred deposit of the word of God, committed to the Church. Holding fast to this deposit the entire holy people united with their shepherds remain always steadfast in the teaching of the Apostles.'
      }
    ],
    inBrief: [
      "The harvest is plentiful, but the laborers are few; pray therefore the Lord of the harvest to send out laborers into his harvest (Luke 10:2).",
      "The seventy-two disciples prefigure the universal apostolate of all the faithful called to announce the peace of Christ.",
      "Jesus Christ is the divine Physician who heals spiritual paralysis through the Sacraments of the Church."
],
    meditationQuestion: 'Am I praying earnestly for holy vocations to the priesthood and religious life to reap God\'s harvest?',
    practicalLiving: 'Pray an earnest prayer for seminarians and priests today, and perform a spiritual work of mercy for someone who is sick or lonely.',
    crossReferences: [
      "Luke 10:1-9",
      "Colossians 4:14",
      "CCC 852",
      "CCC 1503"
]
  },
  'lk 10:1-9':   {
    gospelCitation: 'Luke 10:1-9',
    topicTitle: 'Feast of St. Luke the Evangelist: The Harvest is Plentiful & The Physician of Soul and Body',
    topicSubtitle: 'The harvest is plentiful, but the laborers are few; pray therefore the Lord of the harvest to send out laborers',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Two: The Sacraments of the Church',
    section: 'Section Two: The Seven Sacraments — The Anointing of the Sick',
    chapter: 'The Apostolic Mission and Christ the Divine Physician',
    paragraphsRange: 'Catechism of the Catholic Church 852, 856, 1503, 1506',
    catechismArticles: [
      {
            "number": 852,
            "title": "The Missionary Mandate Requires the Church to Follow Christ's Example",
            "text": "The missionary mandate implies a delicate process of inculturation if the Gospel is to take flesh in each people's culture. The Church's mission stimulates efforts towards Christian unity. The missionary path passes by way of poverty, obedience, service and self-sacrifice, even to death, from which Christ emerged victorious."
      },
      {
            "number": 1503,
            "title": "Christ's Compassion for the Sick and The Mystery of Healing",
            "text": "Christ's compassion toward the sick and his many healings of every kind of infirmity are a resplendent sign that \"God has visited his people\" and that the Kingdom of God is close at hand. Jesus has the power not only to heal, but also to forgive sins; he has come to heal the whole man, soul and body; he is the physician the sick have need of."
      },
      {
            "number": 1506,
            "title": "Christ Invites Disciples to Share His Ministry of Healing",
            "text": "Christ invites his disciples to follow him by taking up their cross in their turn. By following him they acquire a new outlook on illness and the sick. Jesus associates them with his own life of poverty and service. He makes them share in his ministry of compassion and healing: \"So they went out and preached that men should repent. And they cast out many demons, and anointed with oil many that were sick and healed them.\""
      }
],
    magisterialInputs: [
      {
        authority: 'Second Vatican Ecumenical Council',
        documentTitle: 'Dogmatic Constitution on Divine Revelation (Dei Verbum)',
        citation: 'DV 10, 21',
        insight: 'Sacred Tradition and Sacred Scripture form one sacred deposit of the word of God, committed to the Church. Holding fast to this deposit the entire holy people united with their shepherds remain always steadfast in the teaching of the Apostles.'
      }
    ],
    inBrief: [
      "The harvest is plentiful, but the laborers are few; pray therefore the Lord of the harvest to send out laborers into his harvest (Luke 10:2).",
      "The seventy-two disciples prefigure the universal apostolate of all the faithful called to announce the peace of Christ.",
      "Jesus Christ is the divine Physician who heals spiritual paralysis through the Sacraments of the Church."
],
    meditationQuestion: 'Am I praying earnestly for holy vocations to the priesthood and religious life to reap God\'s harvest?',
    practicalLiving: 'Pray an earnest prayer for seminarians and priests today, and perform a spiritual work of mercy for someone who is sick or lonely.',
    crossReferences: [
      "Luke 10:1-9",
      "Colossians 4:14",
      "CCC 852",
      "CCC 1503"
]
  },
  'luke 10:1':   {
    gospelCitation: 'Luke 10:1-9',
    topicTitle: 'Feast of St. Luke the Evangelist: The Harvest is Plentiful & The Physician of Soul and Body',
    topicSubtitle: 'The harvest is plentiful, but the laborers are few; pray therefore the Lord of the harvest to send out laborers',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Two: The Sacraments of the Church',
    section: 'Section Two: The Seven Sacraments — The Anointing of the Sick',
    chapter: 'The Apostolic Mission and Christ the Divine Physician',
    paragraphsRange: 'Catechism of the Catholic Church 852, 856, 1503, 1506',
    catechismArticles: [
      {
            "number": 852,
            "title": "The Missionary Mandate Requires the Church to Follow Christ's Example",
            "text": "The missionary mandate implies a delicate process of inculturation if the Gospel is to take flesh in each people's culture. The Church's mission stimulates efforts towards Christian unity. The missionary path passes by way of poverty, obedience, service and self-sacrifice, even to death, from which Christ emerged victorious."
      },
      {
            "number": 1503,
            "title": "Christ's Compassion for the Sick and The Mystery of Healing",
            "text": "Christ's compassion toward the sick and his many healings of every kind of infirmity are a resplendent sign that \"God has visited his people\" and that the Kingdom of God is close at hand. Jesus has the power not only to heal, but also to forgive sins; he has come to heal the whole man, soul and body; he is the physician the sick have need of."
      },
      {
            "number": 1506,
            "title": "Christ Invites Disciples to Share His Ministry of Healing",
            "text": "Christ invites his disciples to follow him by taking up their cross in their turn. By following him they acquire a new outlook on illness and the sick. Jesus associates them with his own life of poverty and service. He makes them share in his ministry of compassion and healing: \"So they went out and preached that men should repent. And they cast out many demons, and anointed with oil many that were sick and healed them.\""
      }
],
    magisterialInputs: [
      {
        authority: 'Second Vatican Ecumenical Council',
        documentTitle: 'Dogmatic Constitution on Divine Revelation (Dei Verbum)',
        citation: 'DV 10, 21',
        insight: 'Sacred Tradition and Sacred Scripture form one sacred deposit of the word of God, committed to the Church. Holding fast to this deposit the entire holy people united with their shepherds remain always steadfast in the teaching of the Apostles.'
      }
    ],
    inBrief: [
      "The harvest is plentiful, but the laborers are few; pray therefore the Lord of the harvest to send out laborers into his harvest (Luke 10:2).",
      "The seventy-two disciples prefigure the universal apostolate of all the faithful called to announce the peace of Christ.",
      "Jesus Christ is the divine Physician who heals spiritual paralysis through the Sacraments of the Church."
],
    meditationQuestion: 'Am I praying earnestly for holy vocations to the priesthood and religious life to reap God\'s harvest?',
    practicalLiving: 'Pray an earnest prayer for seminarians and priests today, and perform a spiritual work of mercy for someone who is sick or lonely.',
    crossReferences: [
      "Luke 10:1-9",
      "Colossians 4:14",
      "CCC 852",
      "CCC 1503"
]
  },
  'st luke the evangelist':   {
    gospelCitation: 'Luke 10:1-9',
    topicTitle: 'Feast of St. Luke the Evangelist: The Harvest is Plentiful & The Physician of Soul and Body',
    topicSubtitle: 'The harvest is plentiful, but the laborers are few; pray therefore the Lord of the harvest to send out laborers',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Two: The Sacraments of the Church',
    section: 'Section Two: The Seven Sacraments — The Anointing of the Sick',
    chapter: 'The Apostolic Mission and Christ the Divine Physician',
    paragraphsRange: 'Catechism of the Catholic Church 852, 856, 1503, 1506',
    catechismArticles: [
      {
            "number": 852,
            "title": "The Missionary Mandate Requires the Church to Follow Christ's Example",
            "text": "The missionary mandate implies a delicate process of inculturation if the Gospel is to take flesh in each people's culture. The Church's mission stimulates efforts towards Christian unity. The missionary path passes by way of poverty, obedience, service and self-sacrifice, even to death, from which Christ emerged victorious."
      },
      {
            "number": 1503,
            "title": "Christ's Compassion for the Sick and The Mystery of Healing",
            "text": "Christ's compassion toward the sick and his many healings of every kind of infirmity are a resplendent sign that \"God has visited his people\" and that the Kingdom of God is close at hand. Jesus has the power not only to heal, but also to forgive sins; he has come to heal the whole man, soul and body; he is the physician the sick have need of."
      },
      {
            "number": 1506,
            "title": "Christ Invites Disciples to Share His Ministry of Healing",
            "text": "Christ invites his disciples to follow him by taking up their cross in their turn. By following him they acquire a new outlook on illness and the sick. Jesus associates them with his own life of poverty and service. He makes them share in his ministry of compassion and healing: \"So they went out and preached that men should repent. And they cast out many demons, and anointed with oil many that were sick and healed them.\""
      }
],
    magisterialInputs: [
      {
        authority: 'Second Vatican Ecumenical Council',
        documentTitle: 'Dogmatic Constitution on Divine Revelation (Dei Verbum)',
        citation: 'DV 10, 21',
        insight: 'Sacred Tradition and Sacred Scripture form one sacred deposit of the word of God, committed to the Church. Holding fast to this deposit the entire holy people united with their shepherds remain always steadfast in the teaching of the Apostles.'
      }
    ],
    inBrief: [
      "The harvest is plentiful, but the laborers are few; pray therefore the Lord of the harvest to send out laborers into his harvest (Luke 10:2).",
      "The seventy-two disciples prefigure the universal apostolate of all the faithful called to announce the peace of Christ.",
      "Jesus Christ is the divine Physician who heals spiritual paralysis through the Sacraments of the Church."
],
    meditationQuestion: 'Am I praying earnestly for holy vocations to the priesthood and religious life to reap God\'s harvest?',
    practicalLiving: 'Pray an earnest prayer for seminarians and priests today, and perform a spiritual work of mercy for someone who is sick or lonely.',
    crossReferences: [
      "Luke 10:1-9",
      "Colossians 4:14",
      "CCC 852",
      "CCC 1503"
]
  },
  'luke 6:12-16':   {
    gospelCitation: 'Luke 6:12-16',
    topicTitle: 'Feast of Sts. Simon and Jude, Apostles: The Night-Long Prayer and The Choice of the Twelve',
    topicSubtitle: 'He went out to the mountain to pray, and all night he continued in prayer to God; and when it was day, he called his disciples and chose twelve',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Four: Christian Prayer',
    section: 'Section Two: The Creed — The Apostolic Church',
    chapter: 'The Prayer of Jesus and The Foundation of the Twelve Apostles',
    paragraphsRange: 'Catechism of the Catholic Church 857, 859, 860, 2600',
    catechismArticles: [
      {
            "number": 857,
            "title": "The Church is Built on the Foundation of the Apostles",
            "text": "The Church is apostolic because she was and remains built on \"the foundation of the Apostles,\" the witnesses chosen and sent on mission by Christ himself; with the help of the Spirit dwelling in her, the Church keeps and hands on the teaching, the \"good deposit\"; she continues to be taught, sanctified, and guided by the apostles until Christ's return, through their successors."
      },
      {
            "number": 859,
            "title": "Jesus Associates the Apostles with His Own Mission from the Father",
            "text": "Jesus is the Father's Emissary. From the beginning of his ministry, he \"called to him those whom he desired; and they came to him. And he appointed twelve, to be with him, and to be sent out to preach.\" In them, Christ continues his own mission: \"As the Father has sent me, even so I send you.\" The apostles' ministry is the continuation of his own mission."
      },
      {
            "number": 2600,
            "title": "Jesus Prays Before Decisive Moments of His Mission",
            "text": "The Gospel tells us how Jesus prays at decisive moments in his ministry: before his Father gives witness to him at his baptism and Transfiguration, and before his passion he fulfills the Father's plan of love; he also prays before the decisive moments in the mission of his apostles: his prayer before the choice and calling of the Twelve, and Peter's confession of faith."
      }
],
    magisterialInputs: [
      {
        authority: 'Second Vatican Ecumenical Council',
        documentTitle: 'Dogmatic Constitution on Divine Revelation (Dei Verbum)',
        citation: 'DV 10, 21',
        insight: 'Sacred Tradition and Sacred Scripture form one sacred deposit of the word of God, committed to the Church. Holding fast to this deposit the entire holy people united with their shepherds remain always steadfast in the teaching of the Apostles.'
      }
    ],
    inBrief: [
      "And when it was day, he called his disciples, and chose from them twelve, whom he named apostles (Luke 6:13).",
      "Before instituting the apostolic college, Jesus spent the entire night in communion with His heavenly Father on the mountain.",
      "Through Sts. Simon and Jude, the Catholic Church preserves the apostolic succession, apostolic doctrine, and supernatural zeal."
],
    meditationQuestion: 'Do I bathe major decisions and vocational crossroads in persevering, night-long prayer as Jesus did?',
    practicalLiving: 'Pray for your local Bishop and for all Catholic bishops today, that they may be courageous successors of the Apostles.',
    crossReferences: [
      "Luke 6:12-16",
      "Jude 1:20-21",
      "CCC 857",
      "CCC 2600"
]
  },
  'lk 6:12-16':   {
    gospelCitation: 'Luke 6:12-16',
    topicTitle: 'Feast of Sts. Simon and Jude, Apostles: The Night-Long Prayer and The Choice of the Twelve',
    topicSubtitle: 'He went out to the mountain to pray, and all night he continued in prayer to God; and when it was day, he called his disciples and chose twelve',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Four: Christian Prayer',
    section: 'Section Two: The Creed — The Apostolic Church',
    chapter: 'The Prayer of Jesus and The Foundation of the Twelve Apostles',
    paragraphsRange: 'Catechism of the Catholic Church 857, 859, 860, 2600',
    catechismArticles: [
      {
            "number": 857,
            "title": "The Church is Built on the Foundation of the Apostles",
            "text": "The Church is apostolic because she was and remains built on \"the foundation of the Apostles,\" the witnesses chosen and sent on mission by Christ himself; with the help of the Spirit dwelling in her, the Church keeps and hands on the teaching, the \"good deposit\"; she continues to be taught, sanctified, and guided by the apostles until Christ's return, through their successors."
      },
      {
            "number": 859,
            "title": "Jesus Associates the Apostles with His Own Mission from the Father",
            "text": "Jesus is the Father's Emissary. From the beginning of his ministry, he \"called to him those whom he desired; and they came to him. And he appointed twelve, to be with him, and to be sent out to preach.\" In them, Christ continues his own mission: \"As the Father has sent me, even so I send you.\" The apostles' ministry is the continuation of his own mission."
      },
      {
            "number": 2600,
            "title": "Jesus Prays Before Decisive Moments of His Mission",
            "text": "The Gospel tells us how Jesus prays at decisive moments in his ministry: before his Father gives witness to him at his baptism and Transfiguration, and before his passion he fulfills the Father's plan of love; he also prays before the decisive moments in the mission of his apostles: his prayer before the choice and calling of the Twelve, and Peter's confession of faith."
      }
],
    magisterialInputs: [
      {
        authority: 'Second Vatican Ecumenical Council',
        documentTitle: 'Dogmatic Constitution on Divine Revelation (Dei Verbum)',
        citation: 'DV 10, 21',
        insight: 'Sacred Tradition and Sacred Scripture form one sacred deposit of the word of God, committed to the Church. Holding fast to this deposit the entire holy people united with their shepherds remain always steadfast in the teaching of the Apostles.'
      }
    ],
    inBrief: [
      "And when it was day, he called his disciples, and chose from them twelve, whom he named apostles (Luke 6:13).",
      "Before instituting the apostolic college, Jesus spent the entire night in communion with His heavenly Father on the mountain.",
      "Through Sts. Simon and Jude, the Catholic Church preserves the apostolic succession, apostolic doctrine, and supernatural zeal."
],
    meditationQuestion: 'Do I bathe major decisions and vocational crossroads in persevering, night-long prayer as Jesus did?',
    practicalLiving: 'Pray for your local Bishop and for all Catholic bishops today, that they may be courageous successors of the Apostles.',
    crossReferences: [
      "Luke 6:12-16",
      "Jude 1:20-21",
      "CCC 857",
      "CCC 2600"
]
  },
  'luke 6:12':   {
    gospelCitation: 'Luke 6:12-16',
    topicTitle: 'Feast of Sts. Simon and Jude, Apostles: The Night-Long Prayer and The Choice of the Twelve',
    topicSubtitle: 'He went out to the mountain to pray, and all night he continued in prayer to God; and when it was day, he called his disciples and chose twelve',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Four: Christian Prayer',
    section: 'Section Two: The Creed — The Apostolic Church',
    chapter: 'The Prayer of Jesus and The Foundation of the Twelve Apostles',
    paragraphsRange: 'Catechism of the Catholic Church 857, 859, 860, 2600',
    catechismArticles: [
      {
            "number": 857,
            "title": "The Church is Built on the Foundation of the Apostles",
            "text": "The Church is apostolic because she was and remains built on \"the foundation of the Apostles,\" the witnesses chosen and sent on mission by Christ himself; with the help of the Spirit dwelling in her, the Church keeps and hands on the teaching, the \"good deposit\"; she continues to be taught, sanctified, and guided by the apostles until Christ's return, through their successors."
      },
      {
            "number": 859,
            "title": "Jesus Associates the Apostles with His Own Mission from the Father",
            "text": "Jesus is the Father's Emissary. From the beginning of his ministry, he \"called to him those whom he desired; and they came to him. And he appointed twelve, to be with him, and to be sent out to preach.\" In them, Christ continues his own mission: \"As the Father has sent me, even so I send you.\" The apostles' ministry is the continuation of his own mission."
      },
      {
            "number": 2600,
            "title": "Jesus Prays Before Decisive Moments of His Mission",
            "text": "The Gospel tells us how Jesus prays at decisive moments in his ministry: before his Father gives witness to him at his baptism and Transfiguration, and before his passion he fulfills the Father's plan of love; he also prays before the decisive moments in the mission of his apostles: his prayer before the choice and calling of the Twelve, and Peter's confession of faith."
      }
],
    magisterialInputs: [
      {
        authority: 'Second Vatican Ecumenical Council',
        documentTitle: 'Dogmatic Constitution on Divine Revelation (Dei Verbum)',
        citation: 'DV 10, 21',
        insight: 'Sacred Tradition and Sacred Scripture form one sacred deposit of the word of God, committed to the Church. Holding fast to this deposit the entire holy people united with their shepherds remain always steadfast in the teaching of the Apostles.'
      }
    ],
    inBrief: [
      "And when it was day, he called his disciples, and chose from them twelve, whom he named apostles (Luke 6:13).",
      "Before instituting the apostolic college, Jesus spent the entire night in communion with His heavenly Father on the mountain.",
      "Through Sts. Simon and Jude, the Catholic Church preserves the apostolic succession, apostolic doctrine, and supernatural zeal."
],
    meditationQuestion: 'Do I bathe major decisions and vocational crossroads in persevering, night-long prayer as Jesus did?',
    practicalLiving: 'Pray for your local Bishop and for all Catholic bishops today, that they may be courageous successors of the Apostles.',
    crossReferences: [
      "Luke 6:12-16",
      "Jude 1:20-21",
      "CCC 857",
      "CCC 2600"
]
  },
  'sts simon and jude':   {
    gospelCitation: 'Luke 6:12-16',
    topicTitle: 'Feast of Sts. Simon and Jude, Apostles: The Night-Long Prayer and The Choice of the Twelve',
    topicSubtitle: 'He went out to the mountain to pray, and all night he continued in prayer to God; and when it was day, he called his disciples and chose twelve',
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Four: Christian Prayer',
    section: 'Section Two: The Creed — The Apostolic Church',
    chapter: 'The Prayer of Jesus and The Foundation of the Twelve Apostles',
    paragraphsRange: 'Catechism of the Catholic Church 857, 859, 860, 2600',
    catechismArticles: [
      {
            "number": 857,
            "title": "The Church is Built on the Foundation of the Apostles",
            "text": "The Church is apostolic because she was and remains built on \"the foundation of the Apostles,\" the witnesses chosen and sent on mission by Christ himself; with the help of the Spirit dwelling in her, the Church keeps and hands on the teaching, the \"good deposit\"; she continues to be taught, sanctified, and guided by the apostles until Christ's return, through their successors."
      },
      {
            "number": 859,
            "title": "Jesus Associates the Apostles with His Own Mission from the Father",
            "text": "Jesus is the Father's Emissary. From the beginning of his ministry, he \"called to him those whom he desired; and they came to him. And he appointed twelve, to be with him, and to be sent out to preach.\" In them, Christ continues his own mission: \"As the Father has sent me, even so I send you.\" The apostles' ministry is the continuation of his own mission."
      },
      {
            "number": 2600,
            "title": "Jesus Prays Before Decisive Moments of His Mission",
            "text": "The Gospel tells us how Jesus prays at decisive moments in his ministry: before his Father gives witness to him at his baptism and Transfiguration, and before his passion he fulfills the Father's plan of love; he also prays before the decisive moments in the mission of his apostles: his prayer before the choice and calling of the Twelve, and Peter's confession of faith."
      }
],
    magisterialInputs: [
      {
        authority: 'Second Vatican Ecumenical Council',
        documentTitle: 'Dogmatic Constitution on Divine Revelation (Dei Verbum)',
        citation: 'DV 10, 21',
        insight: 'Sacred Tradition and Sacred Scripture form one sacred deposit of the word of God, committed to the Church. Holding fast to this deposit the entire holy people united with their shepherds remain always steadfast in the teaching of the Apostles.'
      }
    ],
    inBrief: [
      "And when it was day, he called his disciples, and chose from them twelve, whom he named apostles (Luke 6:13).",
      "Before instituting the apostolic college, Jesus spent the entire night in communion with His heavenly Father on the mountain.",
      "Through Sts. Simon and Jude, the Catholic Church preserves the apostolic succession, apostolic doctrine, and supernatural zeal."
],
    meditationQuestion: 'Do I bathe major decisions and vocational crossroads in persevering, night-long prayer as Jesus did?',
    practicalLiving: 'Pray for your local Bishop and for all Catholic bishops today, that they may be courageous successors of the Apostles.',
    crossReferences: [
      "Luke 6:12-16",
      "Jude 1:20-21",
      "CCC 857",
      "CCC 2600"
]
  },
};

/**
 * Find the most matching Catechism template by citation string,
 * title, or liturgical day keywords.
 */
export function lookupGospelCatechism(
  citation?: string,
  reflectionTitle?: string,
  liturgicalDay?: string
): GospelCatechismTemplate | null {
  if (!citation && !reflectionTitle && !liturgicalDay) return null;

  const rawCite = (citation || '').toLowerCase().trim();
  const cleanCite = rawCite.replace(/[^a-z0-9]/g, '');

  // 1. Direct registry key exact match
  if (GOSPEL_CATECHISM_REGISTRY[rawCite]) {
    return GOSPEL_CATECHISM_REGISTRY[rawCite];
  }

  // 2. Normalized alphanumeric match
  for (const [key, template] of Object.entries(GOSPEL_CATECHISM_REGISTRY)) {
    const cleanKey = key.replace(/[^a-z0-9]/g, '');
    if (cleanCite.includes(cleanKey) || cleanKey.includes(cleanCite)) {
      return template;
    }
  }

  // 3. Match by chapter and verse substring (e.g. "16:9" or "2:13" or "14:22")
  const chapterVerseMatch = rawCite.match(/([a-z]+)\s*(\d+):(\d+)/);
  if (chapterVerseMatch) {
    const book = chapterVerseMatch[1];
    const chapter = chapterVerseMatch[2];
    const verse = chapterVerseMatch[3];
    const searchToken = `${book} ${chapter}:${verse}`;
    for (const [key, template] of Object.entries(GOSPEL_CATECHISM_REGISTRY)) {
      if (key.includes(searchToken)) {
        return template;
      }
    }
  }

  // 4. Match by liturgical feast keywords
  const lDay = (liturgicalDay || '').toLowerCase();
  const rTitle = (reflectionTitle || '').toLowerCase();

  if (lDay.includes('christ the king') || rTitle.includes('christus vincit')) {
    return GOSPEL_CATECHISM_REGISTRY['john 18:33b-37'] || null;
  }
  if (lDay.includes('immaculate conception') || rTitle.includes('tota pulchra')) {
    return GOSPEL_CATECHISM_REGISTRY['luke 1:26-38'] || null;
  }
  if (lDay.includes('guadalupe')) {
    return GOSPEL_CATECHISM_REGISTRY['luke 1:39-47'] || null;
  }
  if (lDay.includes('nativity of the lord') || lDay.includes('christmas')) {
    return GOSPEL_CATECHISM_REGISTRY['luke 2:1-14'] || null;
  }
  if (lDay.includes('stephen')) {
    return GOSPEL_CATECHISM_REGISTRY['matthew 10:17-22'] || null;
  }
  if (lDay.includes('john the evangelist') || lDay.includes('holy family')) {
    return GOSPEL_CATECHISM_REGISTRY['john 20:1-9'] || null;
  }
  if (lDay.includes('holy innocents')) {
    return GOSPEL_CATECHISM_REGISTRY['matthew 2:13-18'] || null;
  }
  if (lDay.includes('mother of god') || (lDay.includes('january 1') && lDay.includes('mary'))) {
    return GOSPEL_CATECHISM_REGISTRY['luke 2:16-21'] || null;
  }
  if (lDay.includes('epiphany')) {
    return GOSPEL_CATECHISM_REGISTRY['matthew 2:1-12'] || null;
  }
  if (lDay.includes('conversion of saint paul')) {
    return GOSPEL_CATECHISM_REGISTRY['mark 16:15-18'] || null;
  }
  if (lDay.includes('presentation of the lord') || lDay.includes('candlemas')) {
    return GOSPEL_CATECHISM_REGISTRY['luke 2:22-40'] || null;
  }
  if (lDay.includes('ash wednesday')) {
    return GOSPEL_CATECHISM_REGISTRY['matthew 6:1-6'] || null;
  }
  if (lDay.includes('joseph')) {
    return GOSPEL_CATECHISM_REGISTRY['matthew 1:16'] || null;
  }
  if (lDay.includes('palm sunday')) {
    return GOSPEL_CATECHISM_REGISTRY['matthew 21:1-11'] || null;
  }
  if (lDay.includes('holy thursday') || lDay.includes('lord\'s supper')) {
    return GOSPEL_CATECHISM_REGISTRY['john 13:1-15'] || null;
  }
  if (lDay.includes('good friday') || lDay.includes('passion of the lord')) {
    return GOSPEL_CATECHISM_REGISTRY['john 18:1–19:42'] || null;
  }
  if (lDay.includes('divine mercy')) {
    return GOSPEL_CATECHISM_REGISTRY['john 20:19-31'] || null;
  }
  if (lDay.includes('ascension')) {
    return GOSPEL_CATECHISM_REGISTRY['matthew 28:16-20'] || null;
  }
  if (lDay.includes('pentecost')) {
    return GOSPEL_CATECHISM_REGISTRY['john 20:19-23'] || null;
  }
  if (lDay.includes('corpus christi') || lDay.includes('body and blood of christ')) {
    return GOSPEL_CATECHISM_REGISTRY['john 6:51-58'] || null;
  }
  if (lDay.includes('sacred heart')) {
    return GOSPEL_CATECHISM_REGISTRY['john 19:31-37'] || null;
  }
  if (lDay.includes('peter and paul')) {
    return GOSPEL_CATECHISM_REGISTRY['matthew 16:13-19'] || null;
  }
  if (lDay.includes('transfiguration')) {
    return GOSPEL_CATECHISM_REGISTRY['matthew 17:1-9'] || null;
  }
  if (lDay.includes('assumption')) {
    return GOSPEL_CATECHISM_REGISTRY['luke 1:39-56'] || null;
  }
  if (lDay.includes('exaltation of the holy cross')) {
    return GOSPEL_CATECHISM_REGISTRY['john 3:13-17'] || null;
  }

  return null;
}
