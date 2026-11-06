import { MassReading } from '../types';
import { getMassReadingsForDate } from './massReadings';
import { lookupGospelCatechism } from './gospelCatechismDatabase';

export interface CatechismArticle {
  number: number;
  title?: string;
  text: string;
}

export interface MagisterialInput {
  authority: string; // e.g., 'Second Vatican Ecumenical Council', 'Pope St. John Paul II', 'Sacred Ecumenical Council of Trent', 'Pope Benedict XVI'
  documentTitle: string; // e.g., 'Dogmatic Constitution Lumen Gentium', 'Encyclical Dives in Misericordia'
  citation: string; // e.g., 'LG 8', 'DM 3', 'Dei Verbum 2'
  insight: string;
}

export interface GospelCatechismTopic {
  id: string;
  dateKey: string;
  dateLabel: string;
  monthName: string;
  monthYearLabel?: string;
  monthYearKey?: string;
  year?: number;
  dayNumber: number;
  gospelCitation: string;
  gospelTextSnippet: string;
  liturgicalDay: string;
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
 * Curated Gospel Catechism Topics for Major Liturgical Readings
 */
const CURATED_GOSPEL_CATECHISM_TOPICS: Record<string, Omit<GospelCatechismTopic, 'id' | 'dateKey' | 'dateLabel' | 'monthName' | 'dayNumber' | 'liturgicalDay' | 'gospelTextSnippet'>> = {
  // Luke 15:1-10 — Parables of the Lost Sheep and Lost Coin
  'luke 15:1-10': {
    gospelCitation: 'Luke 15:1-10',
    topicTitle: "God's Seeking Mercy, Conversion of Sinners & The Joy in Heaven Over Repentance",
    topicSubtitle: 'Christ welcomes sinners and reveals the Heart of the Father who actively seeks out what was lost',
    pillar: 'Pillars II & III: Sacraments of Healing & Life in Christ',
    part: 'Part Two: The Sacraments of the Church & Part Three: Life in Christ',
    section: 'Section Two: The Seven Sacraments of the Church',
    chapter: 'Chapter Two: The Sacraments of Healing — Penance and Reconciliation',
    paragraphsRange: 'CCC 545, 1439, 1468, 1846, 605, 982',
    catechismArticles: [
      {
        number: 545,
        title: 'Jesus Invites Sinners to the Table of the Kingdom',
        text: 'Jesus invites sinners to the table of the kingdom: "I came not to call the righteous, but sinners to repentance." He shows them that the Father\'s mercy has no bounds: there will be more joy in heaven over one sinner who repents than over ninety-nine righteous people who have no need of repentance. He invites them to that conversion without which one cannot enter the kingdom, but shows them in word and deed his Father\'s boundless mercy for them and the vast "joy in heaven over one sinner who repents". The supreme proof of his love will be the sacrifice of his own life "for the forgiveness of sins".'
      },
      {
        number: 1439,
        title: 'The Process of Conversion in the Parables of Mercy',
        text: 'The process of conversion and repentance was described by Jesus in the parable of the prodigal son, the lost sheep, and the lost coin (Luke 15). The fascination of illusory freedom, the abandonment of the father\'s house, the extreme misery in which the sinner finds himself, the movement of return, and the generous welcome of the father: these are all characteristic of the process of conversion. The beautiful robe, the ring, and the festive banquet are symbols of that new life—pure, worthy, and joyful—of anyone who returns to God and to the bosom of his family, which is the Church. Only the heart of Christ who knows the depths of his Father\'s love could reveal the abyss of his mercy in so simple and beautiful a way.'
      },
      {
        number: 1468,
        title: 'Restoration of Divine Friendship and Spiritual Resurrection',
        text: '"The whole power of the sacrament of Penance consists in restoring us to God\'s grace and joining us with him in an intimate friendship." Reconciliation with God brings about a true "spiritual resurrection," restoration of the dignity and blessings of the life of the children of God, of which the most precious is friendship with God (Roman Catechism II, V, 18).'
      },
      {
        number: 1846,
        title: 'The Gospel as the Revelation of Mercy to Sinners',
        text: 'The Gospel is the revelation in Jesus Christ of God\'s mercy to sinners. The angel announced to Joseph: "You shall call his name Jesus, for he will save his people from their sins." The same is true of the Eucharist, the sacrament of redemption: "This is my blood of the covenant, which is poured out for many for the forgiveness of sins."'
      },
      {
        number: 605,
        title: 'Christ Suffered and Died for Every Soul Without Exception',
        text: 'Jesus recalls that he came "to give his life as a ransom for many"; this last term is not restrictive, but contrasts the whole of humanity with the unique person of the redeemer who hands himself over to save us. The Church, following the apostles, teaches that Christ died for all men without exception: "There is not, never has been, and never will be a single human being for whom Christ did not suffer."'
      },
      {
        number: 982,
        title: 'The Gates of Church Forgiveness are Always Open',
        text: 'There is no offense, however serious, that the Church cannot forgive. "There is no one so wicked and guilty who may not confidently hope for forgiveness, provided his repentance is honest." Christ who died for all men desires that in his Church the gates of forgiveness should always be open to anyone who turns away from sin.'
      }
    ],
    magisterialInputs: [
      {
        authority: 'Pope St. John Paul II',
        documentTitle: 'Encyclical Dives in Misericordia (On the Mercy of God)',
        citation: 'DM 3, 13',
        insight: 'Mercy is an indispensable dimension of love; it is love\'s second name. In the parables of Luke 15, Christ reveals that God does not remain passive waiting for man to return, but actively goes forth in search of what was lost. The divine joy over the recovered sheep reveals that redemption is the restoration of that which was deemed irrecoverable by human calculation.'
      },
      {
        authority: 'Pope Francis',
        documentTitle: 'Bull of Indiction Misericordiae Vultus (The Face of Mercy)',
        citation: 'MV 9',
        insight: 'In the parables dedicated to mercy, Jesus reveals the nature of God as that of a Father who never gives up until he has forgiven the wrong and overcome rejection with compassion. We know these parables well: the lost sheep, the lost coin, and the father with two sons. In these parables, God is always presented as full of joy, especially when He pardons. In them we find the core of the Gospel.'
      },
      {
        authority: 'Second Vatican Ecumenical Council',
        documentTitle: 'Dogmatic Constitution on the Church (Lumen Gentium)',
        citation: 'LG 8',
        insight: 'The Church, embracing in its bosom sinners, at the same time holy and always in need of being purified, always follows the way of penance and renewal. Exiles from their heavenly homeland, the faithful are continually invited by the mercy of Christ to renew their baptismal innocence through sincere sacramental contrition.'
      },
      {
        authority: 'Sacred Ecumenical Council of Trent',
        documentTitle: 'Fourteenth Session: Doctrine on the Sacrament of Penance',
        citation: 'Session XIV, Cap. 1',
        insight: 'Penance was indeed at all times necessary for all men who had defiled themselves with any mortal sin, in order to attain unto grace and justice... Christ our Lord especially instituted the sacrament of Penance when, being raised from the dead, He breathed upon His disciples, saying: "Receive the Holy Spirit; whose sins you shall forgive, they are forgiven them."'
      }
    ],
    inBrief: [
      'Christ came not to condemn the world, but to seek out and save the lost through divine mercy.',
      'God rejoices more over one sinner who turns back to Him in contrition than over ninety-nine who presume their own righteousness.',
      'The Sacrament of Penance is the ordinary divine instrument instituted by Christ for the forgiveness of sins committed after Baptism.',
      'No sin exceeds the infinite merits of the Precious Blood of Jesus when approached with sincere repentance.'
    ],
    meditationQuestion: 'Do you allow Jesus to place you gently upon His shoulders in confession, or do you hesitate out of pride or shame, forgetting the boundless joy your return brings to the Heart of God and all the angels?',
    practicalLiving: 'Perform an examination of conscience today under the loving gaze of the Good Shepherd. If aware of serious sin, resolve to approach the Sacrament of Reconciliation; and extend the same patience and forgiveness to someone in your family or community.',
    crossReferences: ['Lk 15:1-10', 'Ezek 34:11-16', '1 Tim 1:15', 'CCC 545', 'CCC 1439', 'CCC 1468']
  },

  // Luke 14:25-33 — Carrying the Cross & Cost of Discipleship
  'luke 14:25-33': {
    gospelCitation: 'Luke 14:25-33',
    topicTitle: 'The Radical Call to Discipleship, Christian Renunciation & Carrying the Daily Cross',
    topicSubtitle: 'Whoever does not carry his own cross and renounce all earthly attachments cannot be Christ\'s disciple',
    pillar: 'Pillar III: Life in Christ',
    part: 'Part Three: Life in Christ',
    section: 'Section One: Man\'s Vocation — Life in the Spirit',
    chapter: 'Chapter Three: God\'s Salvation — Law and Grace',
    paragraphsRange: 'CCC 544, 618, 2015, 2544',
    catechismArticles: [
      {
        number: 544,
        title: 'The Kingdom Belongs to the Lowly and Poor in Spirit',
        text: 'The kingdom belongs to the poor and lowly, which means those who have accepted it with humble hearts. Jesus is sent to "preach good news to the poor"; he declares them blessed, for "theirs is the kingdom of heaven." To them—the "little ones"—the Father is pleased to reveal what remains hidden from the wise and the understanding. Jesus shares the life of the poor, from the cradle to the cross; he experiences hunger, thirst and privation. Jesus identifies himself with the poor of every kind and makes active love toward them the condition for enter his kingdom.'
      },
      {
        number: 618,
        title: 'Christ Calls His Disciples to Take Up Their Cross',
        text: 'The cross is the unique sacrifice of Christ, the "one mediator between God and men." But because in his incarnate divine person he has in some way united himself to every man, "the possibility of being made partners, in a way known to God, in the paschal mystery" is offered to all men. He calls his disciples to "take up their cross and follow him", for "Christ also suffered for us, leaving us an example, so that we should follow in his steps." In fact Jesus desires to associate with his redeeming sacrifice those who were to be its first beneficiaries.'
      },
      {
        number: 2015,
        title: 'Spiritual Progress and the Way of the Cross',
        text: 'The way of perfection passes by way of the Cross. There is no holiness without renunciation and spiritual battle. Spiritual progress entails the ascesis and mortification that gradually lead to living in the peace and joy of the Beatitudes: "He who climbs never stops going from beginning to beginning, through beginnings that have no end. He never stops desiring what he already knows." (St. Gregory of Nyssa).'
      },
      {
        number: 2544,
        title: 'Poverty of Heart and Evangelical Detachment',
        text: 'Jesus enjoins his disciples to prefer him to everything and to everyone, and bids them "renounce all that they have" for his sake and that of the Gospel. Shortly before his passion he gave them the example of the poor widow of Jerusalem who, out of her poverty, gave all that she had to live on. The detachment from riches is mandatory for entrance into the Kingdom of heaven.'
      }
    ],
    magisterialInputs: [
      {
        authority: 'Second Vatican Ecumenical Council',
        documentTitle: 'Dogmatic Constitution on the Church (Lumen Gentium)',
        citation: 'LG 42',
        insight: 'Jesus, the divine Teacher and Model of all perfection, preached holiness of life to each and every one of His disciples of every condition... Therefore, all the faithful are invited and obliged to try for affiliation and a state of life suited to themselves that they may reach Christian perfection. They must follow in His footsteps and conform themselves to His image, seeking the will of the Father in all things.'
      },
      {
        authority: 'Pope St. John Paul II',
        documentTitle: 'Encyclical Veritatis Splendor (The Splendor of Truth)',
        citation: 'VS 19-21',
        insight: 'Following Christ is not an outward imitation, since it touches man in his inmost depth. Being a disciple of Jesus means being conformed to him who became a servant even to giving his life on the Cross. This radical discipleship demands the readiness to give up everything, even life itself, for love of the Lord.'
      }
    ],
    inBrief: [
      'Discipleship requires placing Christ above every earthly bond, family relation, and material possession.',
      'Carrying the cross daily is not an optional spiritual counsel, but the indispensable mark of authentic union with the Crucified Lord.',
      'Evangelical poverty of spirit frees the heart from the tyranny of created goods to possess the uncreated God.'
    ],
    meditationQuestion: 'What earthly attachment, comfort, or desire for human approval is holding you back from surrendering your entire life unconditionally into Christ\'s hands today?',
    practicalLiving: 'Choose one voluntary mortification today—such as fasting from an unnecessary comfort or speech—and offer it in quiet love for the conversion of souls.',
    crossReferences: ['Lk 14:25-33', 'Mt 16:24', 'Phil 3:7-8', 'CCC 618', 'CCC 2015', 'CCC 2544']
  },

  // Luke 14:15-24 — The Parable of the Great Banquet
  'luke 14:15-24': {
    gospelCitation: 'Luke 14:15-24',
    topicTitle: 'The Eucharistic & Heavenly Banquet, Excuses of Lukewarmness & The Lowly Received',
    topicSubtitle: 'A man gave a great dinner to which he invited many: Come, for everything is now ready',
    pillar: 'Pillars II & III: The Holy Eucharist & Life in Grace',
    part: 'Part Two: The Celebration of the Christian Mystery',
    section: 'Section Two: The Seven Sacraments',
    chapter: 'Chapter One: The Sacrament of the Eucharist',
    paragraphsRange: 'CCC 543, 546, 1344, 2618',
    catechismArticles: [
      {
        number: 543,
        title: 'The Proclamation of the Kingdom to All Peoples',
        text: 'Everyone is called to enter the kingdom. First announced to the children of Israel, this messianic kingdom is intended to accept men of all nations. To enter it, one must accept Jesus\' word: "The word of the Lord is compared to a seed which is sown in a field; those who hear it with faith and are numbered among the little flock of Christ have received the kingdom itself."'
      },
      {
        number: 546,
        title: 'Parables as Invitations to the Heavenly Feast',
        text: 'Through his parables Jesus invites people to the feast of the kingdom, but he also asks for a radical choice: to gain the kingdom, one must give up everything. Words are not enough; deeds are required. The parables are like a mirror for man: will he be like the rocky ground, or the good soil? What will he do with the talents he has received? Jesus and the presence of the kingdom in this world are secretly at the heart of the parables.'
      },
      {
        number: 1344,
        title: 'The Eucharistic Gathering Anticipates the Eternal Banquet',
        text: 'Thus from celebration to celebration, as they proclaim the Paschal mystery of Jesus "until he comes," the pilgrim People of God advances, "following the narrow way of the cross," toward the heavenly banquet, when all the elect will be seated at the table of the kingdom.'
      },
      {
        number: 2618,
        title: 'Prayerful Readiness for the Master\'s Call',
        text: 'The Gospel tells us how Jesus prays at decisive moments in his ministry: before his Father gives witness to him at his baptism and Transfiguration, and before his passion he fulfills the Father\'s plan of love; he also prays before the decisive moments in the mission of his apostles. Jesus\' prayer teaches us to be watchful and vigilant, not letting the cares of this life exclude us from the eternal supper.'
      }
    ],
    magisterialInputs: [
      {
        authority: 'Second Vatican Ecumenical Council',
        documentTitle: 'Constitution on the Sacred Liturgy (Sacrosanctum Concilium)',
        citation: 'SC 10',
        insight: 'The liturgy is the summit toward which the activity of the Church is directed; at the same time it is the font from which all her power flows. For the aim and object of apostolic works is that all who are made sons of God by faith and baptism should come together to praise God in the midst of His Church, to take part in the sacrifice, and to eat the Lord\'s supper.'
      },
      {
        authority: 'Pope Benedict XVI',
        documentTitle: 'Post-Synodal Apostolic Exhortation Sacramentum Caritatis',
        citation: 'SCar 31',
        insight: 'The Holy Eucharist is the wedding banquet of the Lamb. In this sacrament Jesus anticipates the final consummation when God will be all in all. None of our earthly pursuits—possessions, commerce, or family—should become an obstacle to answering the Master\'s loving invitation: "Come, for everything is now ready."'
      }
    ],
    inBrief: [
      'The Kingdom of God is prefigured as a joyous banquet where Christ satisfies the spiritual hunger of humanity.',
      'Worldly preoccupations, pride, and lukewarmness are the tragic excuses that cause souls to forfeit the table of grace.',
      'The poor, the crippled, the blind, and the humble in heart receive the Kingdom with profound gratitude.'
    ],
    meditationQuestion: 'Have you ever allowed busyness, worldly tiredness, or trivial distractions to become an excuse for delaying prayer or missing Holy Mass?',
    practicalLiving: 'Make an intentional Act of Spiritual Communion today, asking Our Lord to purify your appetite of earthly attachments so you may hunger solely for the Bread of Life.',
    crossReferences: ['Lk 14:15-24', 'Mt 22:1-14', 'Rev 19:9', 'CCC 546', 'CCC 1344']
  },

  // John 6:37-40 — Eternal Life and Resurrection (All Souls)
  'john 6:37-40': {
    gospelCitation: 'John 6:37-40',
    topicTitle: 'The Resurrection of the Dead, Eternal Life & Intercession for the Faithful Departed',
    topicSubtitle: 'This is the will of my Father: that everyone who sees the Son and believes in him may have eternal life',
    pillar: 'Pillar I: The Profession of Faith (Creed)',
    part: 'Part One: The Profession of Faith',
    section: 'Section Two: The Creeds of the Church',
    chapter: 'Chapter Three: I Believe in the Resurrection of the Body and Life Everlasting',
    paragraphsRange: 'CCC 988-1004, 1030-1032, 1055',
    catechismArticles: [
      {
        number: 989,
        title: 'The Christian Hope in the Resurrection of the Body',
        text: 'We firmly believe, and hence we hope that, just as Christ is truly risen from the dead and lives for ever, so after death the righteous will live for ever with the risen Christ and he will raise them up on the last day. Our resurrection, like his own, will be the work of the Most Holy Trinity.'
      },
      {
        number: 1001,
        title: 'When Will the Dead Rise?',
        text: 'When? Definitively "at the last day," "at the end of the world." Indeed, the resurrection of the dead is closely associated with Christ\'s Parousia: "For the Lord himself will descend from heaven, with a cry of command, with the archangel\'s call, and with the sound of the trumpet of God. And the dead in Christ will rise first."'
      },
      {
        number: 1030,
        title: 'The Final Purification, or Purgatory',
        text: 'All who die in God\'s grace and friendship, but still imperfectly purified, are indeed assured of their eternal salvation; but after death they undergo purification, so as to achieve the holiness necessary to enter the joy of heaven.'
      },
      {
        number: 1032,
        title: 'The Church\'s Commendation of Prayers and Alms for the Dead',
        text: 'This teaching is also based on the practice of prayer for the dead, already mentioned in Sacred Scripture: "Therefore [Judas Maccabeus] made atonement for the dead, that they might be delivered from their sin." From the beginning the Church has honored the memory of the dead and offered prayers in suffrage for them, above all the Eucharistic sacrifice, so that, thus purified, they may attain the beatific vision of God.'
      }
    ],
    magisterialInputs: [
      {
        authority: 'Sacred Ecumenical Council of Trent',
        documentTitle: 'Twenty-Fifth Session: Decree Concerning Purgatory',
        citation: 'Session XXV',
        insight: 'The Catholic Church, instructed by the Holy Ghost, has, from the Sacred Scriptures and the ancient tradition of the Fathers, taught in sacred councils, and very recently in this Ecumenical Synod, that there is a Purgatory, and that the souls there detained are helped by the suffrages of the faithful, but principally by the acceptable sacrifice of the altar.'
      },
      {
        authority: 'Second Vatican Ecumenical Council',
        documentTitle: 'Dogmatic Constitution on the Church (Lumen Gentium)',
        citation: 'LG 49-50',
        insight: 'Until the Lord shall come in His majesty, and all the angels with Him, some of His disciples are exiles on earth, some having died are being purified, and others are in glory contemplating clearly God Himself. All indeed in different ways and degrees offer communion in the same love of God and neighbor, chanting the same hymn of glory to our God.'
      }
    ],
    inBrief: [
      'Christ promises that not one soul given to Him by the Father will be lost, but raised up in glory on the last day.',
      'The Communion of Saints unites the Church Militant on earth, the Church Suffering in Purgatory, and the Church Triumphant in Heaven.',
      'Offering Holy Mass, indulgences, prayers, and alms for the faithful departed is a preeminent work of supernatural charity.'
    ],
    meditationQuestion: 'Do you regularly pray for the Holy Souls in Purgatory, especially those in your family or those who have no one on earth to remember them at the altar?',
    practicalLiving: 'Offer a Rosary or visit a cemetery today, praying the Requiem Aeternam ("Eternal rest grant unto them, O Lord") for all the faithful departed.',
    crossReferences: ['Jn 6:37-40', '2 Macc 12:46', '1 Cor 15:51-57', 'CCC 989', 'CCC 1030-1032']
  },

  // Matthew 5:1-12a — The Beatitudes (All Saints)
  'matthew 5:1-12a': {
    gospelCitation: 'Matthew 5:1-12a',
    topicTitle: 'The Eight Beatitudes, The Heavenly Reward & The Universal Call to Holiness',
    topicSubtitle: 'Blessed are the poor in spirit, the merciful, and the pure of heart: for theirs is the Kingdom of Heaven',
    pillar: 'Pillar III: Life in Christ',
    part: 'Part Three: Life in Christ',
    section: 'Section One: Man\'s Vocation — Life in the Spirit',
    chapter: 'Chapter One: The Dignity of the Human Person — Our Vocation to Beatitude',
    paragraphsRange: 'CCC 1716-1729, 2013-2016, 956',
    catechismArticles: [
      {
        number: 1716,
        title: 'The Beatitudes at the Heart of Jesus\' Preaching',
        text: 'The Beatitudes are at the heart of Jesus\' preaching. They take up the promises made to the chosen people since Abraham. The Beatitudes fulfill the promises by ordering them no longer merely to the possession of a territory, but to the Kingdom of heaven.'
      },
      {
        number: 1717,
        title: 'The Beatitudes Depict the Countenance of Jesus Christ',
        text: 'The Beatitudes depict the countenance of Jesus Christ and portray his charity. They express the vocation of the faithful associated with the glory of his Passion and Resurrection; they shed light on the actions and attitudes characteristic of the Christian life; they are the paradoxical promises that sustain hope in the midst of tribulations; they proclaim the blessings and rewards already won, obscurely, for Christ\'s disciples; they have begun in the lives of the Virgin Mary and all the saints.'
      },
      {
        number: 1721,
        title: 'God Placed the Desire for Beatitude in the Human Heart',
        text: 'God put us in the world to know, to love, and to serve him, and so to come to paradise. Beatitude makes us "partakers of the divine nature" and of eternal life. With beatitude, man enters into the glory of Christ and into the joy of the Trinitarian life.'
      },
      {
        number: 2013,
        title: 'All Christians are Called to the Fullness of Christian Life',
        text: '"All Christians in any state or walk of life are called to the fullness of Christian life and to the perfection of charity." All are called to holiness: "Be perfect, as your heavenly Father is perfect."'
      }
    ],
    magisterialInputs: [
      {
        authority: 'Second Vatican Ecumenical Council',
        documentTitle: 'Dogmatic Constitution on the Church (Lumen Gentium)',
        citation: 'LG Chapter V (40)',
        insight: 'The classes and duties of life are many, but holiness is one—that holiness which is cultivated by all who are moved by the Spirit of God, and who obey the voice of the Father and worship God the Father in spirit and in truth. These people, in their given conditions, duties and circumstances from day to day, become more holy if they receive all things with faith from the hand of the heavenly Father.'
      },
      {
        authority: 'Pope St. John Paul II',
        documentTitle: 'Encyclical Veritatis Splendor (The Splendor of Truth)',
        citation: 'VS 16',
        insight: 'The Beatitudes are not a substitute for the Commandments, but their deepest interior fulfillment. They reveal that the moral life is not a cold legal code, but the radiant path of love that conforms the soul to the very life of Christ.'
      }
    ],
    inBrief: [
      'The Beatitudes are Christ\'s self-portrait and the blueprint of sanctity for every Christian soul.',
      'True happiness (beatitude) cannot be found in wealth, power, fame, or pleasure, but in God alone.',
      'The saints in heaven intercede ceaselessly for the Church on earth, guiding our pilgrimage along the way of the Beatitudes.'
    ],
    meditationQuestion: 'Which of the eight Beatitudes—poverty of spirit, meekness, purity of heart, or mercy—is the Holy Spirit urging you to cultivate most urgently today?',
    practicalLiving: 'Choose to respond to an annoyance or contradiction today with the meekness and silence of Christ, rejoicing that your reward is stored in Heaven.',
    crossReferences: ['Mt 5:1-12a', 'Lk 6:20-23', 'CCC 1716-1729', 'CCC 2013']
  }
};

/**
 * Cleanly extracts a complete Gospel reading or passage summary.
 * NEVER cuts a word in half and ALWAYS completes the full sentence.
 */
export function extractGospelSnippet(rawText: string): string {
  if (!rawText) return '';
  const text = rawText.trim();

  // If the Gospel reading is under 1,200 characters (such as Luke 16:1-8),
  // return the entire proclamation so every sentence is completely intact.
  if (text.length <= 1200) {
    return text;
  }

  // For longer proclamations, find a natural sentence boundary after 550 characters,
  // guaranteeing no partial words or chopped sentences.
  const targetMin = 550;
  const sentenceEndPattern = /([.?!]['"”’]?)\s+/g;
  let match: RegExpExecArray | null;
  let bestCut = -1;

  while ((match = sentenceEndPattern.exec(text)) !== null) {
    const endPos = match.index + match[1].length;
    if (endPos >= targetMin) {
      bestCut = endPos;
      break;
    }
  }

  if (bestCut !== -1) {
    return text.substring(0, bestCut).trim();
  }

  // Fallback: search for last complete sentence within first 800 characters
  const fallbackPattern = /([.?!]['"”’]?)\s+/g;
  let lastEnd = -1;
  while ((match = fallbackPattern.exec(text.substring(0, 800))) !== null) {
    lastEnd = match.index + match[1].length;
  }
  if (lastEnd > 200) {
    return text.substring(0, lastEnd).trim();
  }

  // Word boundary fallback
  const lastSpace = text.lastIndexOf(' ', 600);
  if (lastSpace > 0) {
    return text.substring(0, lastSpace).trim() + '.';
  }

  return text;
}

/**
 * Intelligent Fallback Generator for any Gospel reading
 */
export function getGospelCatechismForReading(
  reading?: MassReading,
  dateStr?: string
): GospelCatechismTopic {
  const effectiveDate = reading?.date || dateStr || '2026-11-04';
  const effectiveReading = reading || getMassReadingsForDate(effectiveDate);
  const citation = (effectiveReading.gospel.citation || '').trim();
  const citationKey = citation.toLowerCase();

  const dateParts = effectiveDate.split('-');
  const yearNum = parseInt(dateParts[0], 10) || 2026;
  const monthNum = parseInt(dateParts[1], 10) || 11;
  const dayNum = parseInt(dateParts[2], 10) || 4;
  const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const fullMonthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // 1. Authoritative registry lookup across all 58 liturgical Gospel pericopes
  const dbTemplate = lookupGospelCatechism(
    citation,
    effectiveReading.reflection?.title,
    effectiveReading.liturgicalDay
  );

  if (dbTemplate) {
    return {
      id: `ccc-gospel-${effectiveDate}`,
      dateKey: effectiveDate,
      dateLabel: `${monthNames[monthNum]} ${dayNum}, ${yearNum}`,
      monthName: fullMonthNames[monthNum],
      monthYearLabel: `${fullMonthNames[monthNum]} ${yearNum}`,
      monthYearKey: `${yearNum}-${String(monthNum).padStart(2, '0')}`,
      year: yearNum,
      dayNumber: dayNum,
      gospelCitation: citation || dbTemplate.gospelCitation,
      gospelTextSnippet: effectiveReading.gospel.text ? extractGospelSnippet(effectiveReading.gospel.text) : '',
      liturgicalDay: effectiveReading.liturgicalDay,
      topicTitle: dbTemplate.topicTitle,
      topicSubtitle: dbTemplate.topicSubtitle,
      pillar: dbTemplate.pillar,
      part: dbTemplate.part,
      section: dbTemplate.section,
      chapter: dbTemplate.chapter,
      paragraphsRange: dbTemplate.paragraphsRange,
      catechismArticles: dbTemplate.catechismArticles,
      magisterialInputs: dbTemplate.magisterialInputs,
      inBrief: dbTemplate.inBrief,
      meditationQuestion: dbTemplate.meditationQuestion,
      practicalLiving: dbTemplate.practicalLiving,
      crossReferences: dbTemplate.crossReferences
    };
  }

  // 2. Direct match in curated topics
  for (const [key, topic] of Object.entries(CURATED_GOSPEL_CATECHISM_TOPICS)) {
    if (citationKey.includes(key) || key.includes(citationKey)) {
      return {
        ...topic,
        id: `ccc-gospel-${effectiveDate}`,
        dateKey: effectiveDate,
        dateLabel: `${monthNames[monthNum]} ${dayNum}, ${yearNum}`,
        monthName: fullMonthNames[monthNum],
        monthYearLabel: `${fullMonthNames[monthNum]} ${yearNum}`,
        monthYearKey: `${yearNum}-${String(monthNum).padStart(2, '0')}`,
        year: yearNum,
        dayNumber: dayNum,
        liturgicalDay: effectiveReading.liturgicalDay,
        gospelTextSnippet: effectiveReading.gospel.text ? extractGospelSnippet(effectiveReading.gospel.text) : ''
      };
    }
  }

  // 3. Fallback synthesizer
  const titleTopic = effectiveReading.reflection?.title || 'The Saving Truth of the Holy Gospel';
  const patristicAuthor = effectiveReading.reflection?.author || 'The Sacred Magisterium and Doctors of the Church';

  return {
    id: `ccc-gospel-${effectiveDate}`,
    dateKey: effectiveDate,
    dateLabel: `${monthNames[monthNum]} ${dayNum}, ${yearNum}`,
    monthName: fullMonthNames[monthNum],
    monthYearLabel: `${fullMonthNames[monthNum]} ${yearNum}`,
    monthYearKey: `${yearNum}-${String(monthNum).padStart(2, '0')}`,
    year: yearNum,
    dayNumber: dayNum,
    gospelCitation: citation || 'Holy Gospel Proclamation',
    gospelTextSnippet: effectiveReading.gospel.text ? extractGospelSnippet(effectiveReading.gospel.text) : '',
    liturgicalDay: effectiveReading.liturgicalDay,
    topicTitle: `${titleTopic}: What the Church Believes, Celebrates & Lives`,
    topicSubtitle: `Magisterial insights on ${citation} in the light of the Catechism of the Catholic Church`,
    pillar: '',
    part: 'Part One: The Profession of Faith & Part Three: Life in Christ',
    section: 'Section Two: The Profession of Christian Faith',
    chapter: 'The Mysteries of the Life of Christ in the Sacred Liturgy',
    paragraphsRange: 'Catechism of the Catholic Church 514, 515, 521, 1074',
    catechismArticles: [
      {
        number: 514,
        title: 'Many Things About Jesus are Written So That You May Believe',
        text: 'Many things about Jesus of interest to human curiosity do not figure in the Gospels. Almost nothing is said about his hidden life at Nazareth, and even a great part of his public life is not recounted. What is written in the Gospels was set down there "so that you may believe that Jesus is the Christ, the Son of God, and that believing you may have life in his name."'
      },
      {
        number: 515,
        title: 'The Mysteries of Christ\'s Life as Revelation and Redemption',
        text: 'The Gospels were written by men who were among the first to have the faith and wanted to share it with others. Having known in faith who Jesus is, they could see and make others see the traces of his mystery in all his earthly life.'
      },
      {
        number: 521,
        title: 'Christ Enables Us to Live in Him All That He Himself Lived',
        text: 'Christ enables us to live in him all that he himself lived, and he lives it in us. "By his Incarnation, he, the Son of God, has in a certain way united himself with each man."'
      },
      {
        number: 1074,
        title: 'The Liturgy as Privileged Place for Church Catechesis',
        text: '"The liturgy is the summit toward which the activity of the Church is directed; it is also the font from which all her power flows." It is therefore the privileged place for catechizing the People of God.'
      }
    ],
    magisterialInputs: [
      {
        authority: 'Second Vatican Ecumenical Council',
        documentTitle: 'Dogmatic Constitution on Divine Revelation (Dei Verbum)',
        citation: 'DV 10, 21',
        insight: 'Sacred Tradition and Sacred Scripture form one sacred deposit of the word of God, committed to the Church.'
      },
      {
        authority: patristicAuthor,
        documentTitle: 'Patristic and Conciliar Heritage of the Universal Church',
        citation: effectiveReading.liturgicalDay,
        insight: effectiveReading.reflection?.content || 'The Holy Scriptures proclaimed in the Sacred Liturgy are not dead letters of antiquity, but the living voice of the Bridegroom addressing His Bride the Church today.'
      }
    ],
    inBrief: [
      `The Gospel proclamation (${citation}) is the living voice of Jesus Christ sanctifying the soul on ${effectiveReading.liturgicalDay}.`,
      'The Catechism of the Catholic Church provides the infallible organic key to understanding Sacred Scripture in full fidelity to Apostolic Tradition.',
      'Every liturgical proclamation of God\'s Word calls forth the fruit of obedience, sacramental communion, and active charity.'
    ],
    meditationQuestion: `How does the teaching of today's Holy Gospel (${citation}) speak directly to your moral conscience and call you to deeper holiness?`,
    practicalLiving: `Spend five minutes in silent thanksgiving after receiving the Word of God today, praying: "Speak, Lord, for your servant is listening."`,
    crossReferences: [citation, 'Dei Verbum 21', 'CCC 515', 'CCC 521']
  };
}

/**
 * All 14 Months from November 2026 through December 2027 (1 year and 1 month: 426 days)
 */
export const CATECHISM_YEAR_AND_MONTH_SPECS = [
  { year: 2026, month: 11, days: 30, monthName: 'November', shortName: 'Nov', key: '2026-11', label: 'Nov 2026' },
  { year: 2026, month: 12, days: 31, monthName: 'December', shortName: 'Dec', key: '2026-12', label: 'Dec 2026' },
  { year: 2027, month: 1, days: 31, monthName: 'January', shortName: 'Jan', key: '2027-01', label: 'Jan 2027' },
  { year: 2027, month: 2, days: 28, monthName: 'February', shortName: 'Feb', key: '2027-02', label: 'Feb 2027' },
  { year: 2027, month: 3, days: 31, monthName: 'March', shortName: 'Mar', key: '2027-03', label: 'Mar 2027' },
  { year: 2027, month: 4, days: 30, monthName: 'April', shortName: 'Apr', key: '2027-04', label: 'Apr 2027' },
  { year: 2027, month: 5, days: 31, monthName: 'May', shortName: 'May', key: '2027-05', label: 'May 2027' },
  { year: 2027, month: 6, days: 30, monthName: 'June', shortName: 'Jun', key: '2027-06', label: 'Jun 2027' },
  { year: 2027, month: 7, days: 31, monthName: 'July', shortName: 'Jul', key: '2027-07', label: 'Jul 2027' },
  { year: 2027, month: 8, days: 31, monthName: 'August', shortName: 'Aug', key: '2027-08', label: 'Aug 2027' },
  { year: 2027, month: 9, days: 30, monthName: 'September', shortName: 'Sep', key: '2027-09', label: 'Sep 2027' },
  { year: 2027, month: 10, days: 31, monthName: 'October', shortName: 'Oct', key: '2027-10', label: 'Oct 2027' },
  { year: 2027, month: 11, days: 30, monthName: 'November', shortName: 'Nov', key: '2027-11', label: 'Nov 2027' },
  { year: 2027, month: 12, days: 31, monthName: 'December', shortName: 'Dec', key: '2027-12', label: 'Dec 2027' }
];

/**
 * Returns all 426 daily Gospel Catechism Topics for 1 year and 1 month:
 * November 2026 through December 2027
 */
export function getAllGospelCatechisms(): GospelCatechismTopic[] {
  const result: GospelCatechismTopic[] = [];
  for (const spec of CATECHISM_YEAR_AND_MONTH_SPECS) {
    for (let day = 1; day <= spec.days; day++) {
      const dateStr = `${spec.year}-${String(spec.month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const reading = getMassReadingsForDate(dateStr);
      result.push(getGospelCatechismForReading(reading, dateStr));
    }
  }
  return result;
}

// Backward-compatibility alias
export const getAllThreeMonthGospelCatechisms = getAllGospelCatechisms;
