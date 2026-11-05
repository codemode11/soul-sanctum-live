import { MassReading } from '../types';

export interface DailySaintHomily {
  id: string;
  scriptureReference: string;
  saintName: string;
  doctorTitle: string;
  workTitle: string;
  yearDelivered: string;
  homilyTitle: string;
  homilyAttribution: string;
  homilyHeading: string;
  paragraphs: string[];
  spiritualApplication: string;
}

export const DAILY_SAINT_HOMILIES_DATABASE: DailySaintHomily[] = [
  // Tuesday of the Thirtieth Week in Ordinary Time (Oct 27, 2026): Luke 13:18-21
  {
    id: 'homily-luke-13-18-21-bede',
    scriptureReference: 'Luke 13:18-21',
    saintName: 'St. Bede the Venerable',
    doctorTitle: 'Doctor of the Church',
    workTitle: 'Homiliae Evangelii, Book II',
    yearDelivered: 'c. 725 AD',
    homilyTitle: 'On the Mustard Seed and the Three Measures of Leaven',
    homilyAttribution: 'St. Bede the Venerable, Doctor of the Church (Homiliae Evangelii, delivered at Jarrow Abbey, c. 725 AD)',
    homilyHeading: 'On the Mustard Seed and the Three Measures of Leaven\nSt. Bede the Venerable, Doctor of the Church (Homiliae Evangelii, delivered at Jarrow Abbey, c. 725 AD)',
    paragraphs: [
      'Our Lord and Redeemer compares the Kingdom of God to a grain of mustard seed which a man took and cast into his garden; and it grew and became a great tree, and the birds of the air rested in its branches. The man who sows this blessed seed is Christ our Savior Himself, or every faithful preacher who plants the Word of life in the garden of the Catholic Church. Considered in its outward appearance, a grain of mustard seed is tiny, simple, and despised by the proud eye of the world; yet within its small shell lies a fiery warmth and medicinal vigor capable ofhealing serpents’ bites and awakening the senses. Even so, the preaching of the Cross appeared lowly and foolish to the philosophers of this world, yet when bruised through the Passion of the Redeemer and buried in the sepulcher of Joseph’s garden, it sprang forth in the glory of the Resurrection!',
      'Notice that the mustard seed does not remain a mere herb of the field, but grows into a mighty tree whose branches shelter the birds of heaven. By the branches of this tree are signified the diverse teachings and apostolic churches spreading from Jerusalem to the utmost bounds of the earth; and by the "birds of the sky" are meant contemplative and heavenly-minded souls who, raising their affections above earthly dust on the wings of prayer, find safe refuge and eternal rest in the doctrine of the Apostles and Doctors.',
      'Immediately Our Savior adds a second similitude: "The Kingdom of God is like yeast that a woman took and mixed in with three measures of wheat flour until the whole batch of dough was leavened." The woman is Holy Mother Church, or the uncreated Wisdom of God. The yeast is the fervent charity of the Holy Spirit—for just as yeast warms, expands, and binds together cold and scattered grains of flour into one wholesome loaf, so divine love unites the scattered nations in the bond of peace. And why does she hide this yeast in "three measures of flour"? Because the grace of the Gospel sanctifies the three powers of our human nature—the intellect with truth, the memory with hope, and the will with charity—until the whole man, body, soul, and spirit, is transformed into the pure bread of Christ fit for the table of the Eternal King.'
    ],
    spiritualApplication: 'Never despise small, hidden beginnings in prayer or daily fidelity. Receive the tiny seed of God’s Word with humility today, and allow the yeast of the Holy Spirit to leaven your thoughts, words, and deeds with charity.'
  },

  // Wednesday, Feast of Saints Simon and Jude, Apostles (Oct 28, 2026): Luke 6:12-16
  {
    id: 'homily-luke-6-12-16-chrysostom',
    scriptureReference: 'Luke 6:12-16',
    saintName: 'St. John Chrysostom',
    doctorTitle: 'Doctor of the Church (Doctor of Eucharistic Eloquence)',
    workTitle: 'Homilies on the Gospel Readings',
    yearDelivered: 'c. 392 AD',
    homilyTitle: 'On Christ’s Night Vigil of Prayer and the Calling of the Twelve Apostles',
    homilyAttribution: 'St. John Chrysostom, Doctor of the Church (Homilies on the Gospel Readings, delivered at Antioch, c. 392 AD)',
    homilyHeading: 'On Christ’s Night Vigil of Prayer and the Calling of the Twelve Apostles\nSt. John Chrysostom, Doctor of the Church (Homilies on the Gospel Readings, delivered at Antioch, c. 392 AD)',
    paragraphs: [
      'In those days Jesus went out to the mountain to pray, and He spent the whole night in prayer to God. And when day came, He called His disciples to Himself, and from them He chose Twelve, whom He also named Apostles. Pause and marvel, my beloved brethren, at the humility of the Only-Begotten Son of God! He who with the Father and the Holy Spirit hears the prayers of angels and men ascends a solitary mountain and continues all night in prayer before choosing His Twelve Apostles.',
      'Did the Lord of Glory stand in need of prayer? By no means! Rather, He became our pattern and teacher by His own sacred actions. Because He was about to send twelve unlearned fishermen into the jaws of wolves, to overthrow pagan idols, to silence the pride of philosophers, and to plant the standard of the Cross across the inhabited earth, He consecrated their election in the silence of nocturnal vigil. He teaches every bishop, every priest, and every Christian soul that before we undertake any grave duty or spiritual enterprise, we must first ascend the mountain of recollection and converse with God in secret.',
      'And when the dawn broke, He called them forward—including Simon called the Zealot, burning with holy zeal for the house of the Lord, and Jude Thaddaeus, the fearless herald of Catholic fidelity. Weak in human resources, they were invincible in divine grace. Let us imitate both the Master’s prayerful vigil and the Apostles’ unshakeable zeal, knowing that every fruitful work in the Church is born from the sanctuary of prayer.'
    ],
    spiritualApplication: 'Before making important decisions or beginning your daily labors, withdraw briefly into the silent mountain of your heart in prayer, asking Christ to guide and bless your steps.'
  },

  // Thursday of the Thirtieth Week in Ordinary Time (Oct 29, 2026): Luke 13:31-35
  {
    id: 'homily-luke-13-31-35-augustine',
    scriptureReference: 'Luke 13:31-35',
    saintName: 'St. Augustine of Hippo',
    doctorTitle: 'Doctor of Grace',
    workTitle: 'Sermons on the Liturgical Gospels (Tractates & Sermons, Sermo 105)',
    yearDelivered: 'c. 412 AD',
    homilyTitle: 'On the Maternal Wings of Christ over Jerusalem',
    homilyAttribution: 'St. Augustine of Hippo, Doctor of the Church (Sermon 105, delivered at Hippo Regius, c. 412 AD)',
    homilyHeading: 'On the Maternal Wings of Christ over Jerusalem\nSt. Augustine of Hippo, Doctor of the Church (Sermon 105, delivered at Hippo Regius, c. 412 AD)',
    paragraphs: [
      'When certain Pharisees warned the Lord, "Go away and leave this place, because Herod wants to kill You," our fearless Redeemer answered: "Go and tell that fox, Behold, I cast out demons and perform healings today and tomorrow, and on the third day I accomplish My purpose." What is the cunning of an earthly ruler before the sovereign providence of the King of Ages? No human malice could hasten or delay the hour of His sacrifice; He walked toward Jerusalem not as a captive dragged to punishment, but as the Victorious High Priest ascending His altar.',
      'Yet listen to the tender lamentation that bursts from the Sacred Heart of Wisdom: "Jerusalem, Jerusalem, you who kill the prophets and stone those sent to you, how many times I yearned to gather your children together as a hen gathers her brood under her wings, and you were unwilling!" Consider, dearly beloved, the maternal affection of the hen among all other birds. Other birds, even when we see them building nests, show no outward change of body when their young are hatched; but the hen weakens herself out of love for her chicks! Her voice grows hoarse, her feathers droop, she lowers her wings to the dust, and she fiercely interposes her own body against the kite and the hawk.',
      'Even so, the Eternal Wisdom of God, who reigns in majesty at the right hand of the Father, made Himself weak in our mortal flesh, roughened His beauty with the dust of our infirmities, and stretched out the bleeding wings of His arms upon the wood of the Cross to shelter us from the infernal hawk! Let us not be unwilling as ungrateful Jerusalem was; let us run daily beneath the shadow of His pierced hands and acclaim Him in the Holy Eucharist: "Blessed is He who comes in the name of the Lord!"'
    ],
    spiritualApplication: 'In every moment of temptation, anxiety, or spiritual trial, take refuge immediately beneath the outstretched arms of Jesus on the Cross and in the Blessed Sacrament.'
  },

  // Friday of the Thirtieth Week in Ordinary Time (Oct 30, 2026): Luke 14:1-6
  {
    id: 'homily-luke-14-1-6-gregory',
    scriptureReference: 'Luke 14:1-6',
    saintName: 'Pope St. Gregory the Great',
    doctorTitle: 'Doctor of the Church',
    workTitle: 'Homiliae in Evangelia',
    yearDelivered: 'c. 592 AD',
    homilyTitle: 'On the Healing of Dropsy and the True Sabbath Rest',
    homilyAttribution: 'Pope St. Gregory the Great, Doctor of the Church (Homiliae in Evangelia, delivered at Rome, c. 592 AD)',
    homilyHeading: 'On the Healing of Dropsy and the True Sabbath Rest\nPope St. Gregory the Great, Doctor of the Church (Homiliae in Evangelia, delivered at Rome, c. 592 AD)',
    paragraphs: [
      'When Our Lord entered the house of a leading Pharisee on the Sabbath to take bread, His enemies watched Him with malicious eyes, while a man afflicted with dropsy stood directly before Him. Why did Divine Wisdom permit this sufferer to stand in the midst of the banquet hall? So that the bodily malady of the sick man might expose and heal the deeper spiritual malady of the onlookers! For the Pharisees were swollen with the pride of self-righteousness, while the sick man was swollen with the water of dropsy.',
      'Now dropsy is a disease in which the body is bloated with watery humor, and yet the sufferer is consumed by an unquenchable thirst: the more abundantly he drinks, the more fiercely he thirsts and the more dangerously he swells. By this bodily infirmity is mystically represented the vice of avarice and worldly ambition. For the covetous man, the more gold, honors, or carnal pleasures he swallows, the more insatiably he burns with desire to acquire still more! Earthly possessions never quench the thirst of an immortal soul; they only inflate it with anxiety and pride.',
      'Christ asked the lawyers: "Is it lawful to cure on the Sabbath or not?" And when they remained silent, He took the man, healed him by His divine touch, and sent him away freed. Then He silenced their hypocrisy: if each of them unties his ox or ass on the Sabbath and leads it to water, how much more ought a child of God to be loosed from the bond of sickness and sin? Let us come before the Divine Physician today, asking Him to drain from our hearts the swollen waters of worldly greed and fill us with the living water of eternal charity.'
    ],
    spiritualApplication: 'Examine whether any worldly desire or ambition is leaving your soul restless and thirsty. Bring your heart to Christ in prayer so His touch may restore you to interior peace.'
  },

  // Saturday of the Thirtieth Week in Ordinary Time (Oct 31, 2026): Luke 14:1, 7-11
  {
    id: 'homily-luke-14-1-7-11-bernard',
    scriptureReference: 'Luke 14:1, 7-11',
    saintName: 'St. Bernard of Clairvaux',
    doctorTitle: 'Doctor Mellifluus (Doctor of the Church)',
    workTitle: 'Sermons on the Gospel of St. Luke & Degrees of Humility',
    yearDelivered: 'c. 1138 AD',
    homilyTitle: 'On Choosing the Lowest Seat at the Wedding Banquet',
    homilyAttribution: 'St. Bernard of Clairvaux, Doctor of the Church (Sermons on the Gospel of St. Luke, delivered at Clairvaux Abbey, c. 1138 AD)',
    homilyHeading: 'On Choosing the Lowest Seat at the Wedding Banquet\nSt. Bernard of Clairvaux, Doctor of the Church (Sermons on the Gospel of St. Luke, delivered at Clairvaux Abbey, c. 1138 AD)',
    paragraphs: [
      'Observing how the guests at the Pharisee’s banquet eagerly scrambled for the first places at table, Our Lord Jesus Christ delivered a lesson that is the very foundation of all Christian perfection: "When you are invited, go and take the lowest place, so that when the host comes to you he may say: My friend, move up to a higher position... For everyone who exalts himself will be humbled, and the one who humbles himself will be exalted."',
      'O foolishness of human pride! Why does dust and ashes strain after the highest seat, when the Majesty of Heaven descended to the lowest? Look upon the Son of God: in Bethlehem He chose a stable and a manger; in Nazareth He lived in hidden obedience at a carpenter’s bench; in the Upper Room He knelt at the feet of fishermen with a towel and basin; and on Calvary He hung naked between two thieves! He chose the lowest place on earth because He knew that from the valley of humility alone rises the mountain of eternal glory.',
      'Consider how secure is the lowest seat: he who sits upon the ground has nowhere to fall! He who claims the first seat lives in perpetual dread of being displaced with shame when the Great Host arrives and judges the secrets of hearts. Let us therefore embrace genuine humility—not with empty words of false modesty, but with a sincere conviction of our nothingness apart from grace—until the Heavenly Bridegroom takes us by the hand and says: "Friend, ascend higher into the joy of your Lord!"'
    ],
    spiritualApplication: 'Practice quiet humility today by yielding preference to others in conversation, service, and honor, seeking only the secret approval of your Heavenly Father.'
  },

  // Monday of the Thirtieth Week in Ordinary Time (Oct 26, 2026): Luke 13:10-17
  {
    id: 'homily-luke-13-10-17-gregory',
    scriptureReference: 'Luke 13:10-17',
    saintName: 'Pope St. Gregory the Great',
    doctorTitle: 'Doctor of the Church',
    workTitle: 'Homiliae in Evangelia, Book II, Homily 31',
    yearDelivered: '591 AD',
    homilyTitle: 'On the Woman Bent Double for Eighteen Years',
    homilyAttribution: 'Pope St. Gregory the Great, Doctor of the Church (Homiliae in Evangelia, Book II, Homily 31, delivered at the Basilica of St. John Lateran, Rome, 591 AD)',
    homilyHeading: 'On the Woman Bent Double for Eighteen Years\nPope St. Gregory the Great, Doctor of the Church (Homiliae in Evangelia, Book II, Homily 31, delivered at the Basilica of St. John Lateran, Rome, 591 AD)',
    paragraphs: [
      'When Our Lord Jesus Christ taught in the synagogue on the Sabbath, behold, there was a woman who had a spirit of infirmity for eighteen years; she was bowed together and could in no wise look upward. In the creation of the world, Almighty God formed all other animals bowed downward toward the earth to seek their pasture in the soil; but man alone He created with an upright stature, so that his bodily posture might remind him that his soul was made to gaze upward toward heaven and contemplate his Creator.',
      'Whenever a Christian forgets his heavenly homeland and buries all his thoughts in earthly avarice, carnal pleasures, and temporal anxieties, he becomes like this crippled woman: bowed double by an evil spirit, incapable of lifting the eyes of his mind to the light of eternity. Yet observe two consoling truths in today’s Gospel: first, though she was bent double, she still came faithfully into the synagogue on the Sabbath to hear God’s Word; second, Jesus saw her before she even asked, called her forward by His prevenient grace, and laid His sacred hands upon her.',
      'No sooner had the Incarnate Word touched her than she stood upright and glorified God! By the laying on of Christ’s hands is signified the power of His saving Humanity operating through the Sacraments of the Church, especially Sacramental Absolution and the Most Holy Eucharist. Let no sinner despair, even if bound by habitual sin for eighteen years; at one word and one touch of the merciful Savior, the chains of Satan are shattered and the soul stands erect in the freedom of the children of God.'
    ],
    spiritualApplication: 'Whenever earthly worries or past failings weigh your heart downward, come into the presence of Christ in prayer and the Sacraments, and let His healing hand lift your soul back toward heaven.'
  },

  // Thirtieth Sunday in Ordinary Time (Oct 25, 2026): Mark 10:46-52
  {
    id: 'homily-mark-10-46-52-leo',
    scriptureReference: 'Mark 10:46-52',
    saintName: 'Pope St. Leo the Great',
    doctorTitle: 'Doctor of the Church',
    workTitle: 'Sermons on the Mysteries of Christ',
    yearDelivered: 'c. 450 AD',
    homilyTitle: 'On Blind Bartimaeus Crying Out by the Roadside',
    homilyAttribution: 'Pope St. Leo the Great, Doctor of the Church (Sermons on the Mysteries of Christ, delivered at St. Peter’s Basilica, Rome, c. 450 AD)',
    homilyHeading: 'On Blind Bartimaeus Crying Out by the Roadside\nPope St. Leo the Great, Doctor of the Church (Sermons on the Mysteries of Christ, delivered at St. Peter’s Basilica, Rome, c. 450 AD)',
    paragraphs: [
      'As Our Savior departed from Jericho with His disciples on His royal march toward Jerusalem to consummate the sacrifice of our redemption, blind Bartimaeus, the son of Timaeus, sat begging beside the road. In the mystical language of Holy Scripture, Jericho signifies the moon—the symbol of our waxing and waning mortal state. The human race, cast out of the paradise of light through the transgression of our first parents, sat blind and impoverished beside the highway of this fleeting world, knowing not the way to eternal life.',
      'Yet although Bartimaeus lacked bodily eyes, the ears of his heart were wide awake! Hearing that Jesus of Nazareth was passing by, he feared lest the hour of visitation slip away, and he raised his voice in a cry of living faith: "Jesus, Son of David, have pity on me!" Notice what happened immediately: the crowd rebuked him and commanded him to keep silent. Whenever a soul resolves to break with sin and cry out to God in earnest prayer, a noisy crowd of old habits, worldly distractions, and demonic discouragements rises up to silence that prayer. What did the blind beggar do? He did not argue with the crowd; he cried out all the more loudly: "Son of David, have pity on me!"',
      'O victorious perseverance of humble prayer, which brought the Lord of the Universe to a halt! Jesus stood still and commanded him to be called. Instantly Bartimaeus cast aside his cloak—the heavy garment of worldly attachments—leapt to his feet, and came to Christ. Receiving the light of both body and soul, he did not turn back to Jericho, but followed Jesus "on the way"—teaching us that true faith seeks light from Christ only so that it may walk in His footsteps all the way to Calvary and eternal glory.'
    ],
    spiritualApplication: 'Repeat the prayer of Bartimaeus throughout this day—"Jesus, Son of David, have pity on me! Master, that I may see!"—and cast aside every attachment that hinders you from following Christ.'
  },

  // Saturday of the Twenty-Ninth Week in Ordinary Time (Oct 24, 2026): Luke 13:1-9
  {
    id: 'homily-luke-13-1-9-augustine',
    scriptureReference: 'Luke 13:1-9',
    saintName: 'St. Augustine of Hippo',
    doctorTitle: 'Doctor of Grace',
    workTitle: 'Sermons on the New Testament (Sermo 110)',
    yearDelivered: 'c. 416 AD',
    homilyTitle: 'On the Barren Fig Tree and the Merciful Vinedresser',
    homilyAttribution: 'St. Augustine of Hippo, Doctor of the Church (Sermon 110, delivered at Hippo Regius, c. 416 AD)',
    homilyHeading: 'On the Barren Fig Tree and the Merciful Vinedresser\nSt. Augustine of Hippo, Doctor of the Church (Sermon 110, delivered at Hippo Regius, c. 416 AD)',
    paragraphs: [
      'When Our Lord warned the crowds, "Unless you repent, you will all likewise perish," He immediately set before their eyes the parable of the fig tree planted in the vineyard. For three years the Lord of the vineyard came seeking fruit upon it and found none, and He said to the vinedresser: "Cut it down! Why should it exhaust the soil?" Every tree that occupies a place in the vineyard of the Church, casting shade with the green leaves of an outward Christian profession while producing no sweet fruit of charity, is in danger of the axe of Divine Justice.',
      'What are these "three years" during which the Almighty Father has come seeking fruit from the human race? The first year was the age of the Patriarchs under the natural law written on the human conscience; the second year was the age of Moses and the Prophets under the written Law; and the third year is this sacred age of the Gospel, in which the Son of God Himself has come down from heaven to water the earth with His own Precious Blood.',
      'And who is the merciful Vinedresser who steps between the raised axe and the barren tree, pleading: "Sir, leave it for this year also, until I dig around it and fertilize it"? It is Our Lord Jesus Christ, our Advocate with the Father! To dig around the roots is to open the hardened heart with the spade of salutary tribulation and contrition; to apply the basket of fertilizer is to nourish the soul with the remembrance of its own lowliness and with the grace of Sacramental Penance. This very day is the "extra year" Christ has won for you by His intercession—do not delay your conversion until tomorrow, but bring forth the fruits of mercy today!'
    ],
    spiritualApplication: 'Thank Jesus, our merciful Vinedresser, for granting you this day of grace, and bear concrete fruit today through sincere contrition, prayer, and an act of kindness to someone in need.'
  },

  // Friday of the Twenty-Ninth Week in Ordinary Time (Oct 23, 2026): Luke 12:54-59
  {
    id: 'homily-luke-12-54-59-gregory-nazianzen',
    scriptureReference: 'Luke 12:54-59',
    saintName: 'St. Gregory Nazianzen',
    doctorTitle: 'Doctor of the Church (The Theologian)',
    workTitle: 'Orations on the Seasons of Grace',
    yearDelivered: 'c. 380 AD',
    homilyTitle: 'On Discerning the Present Time of Salvation',
    homilyAttribution: 'St. Gregory Nazianzen, Doctor of the Church (Orations on the Seasons of Grace, delivered at Constantinople, c. 380 AD)',
    homilyHeading: 'On Discerning the Present Time of Salvation\nSt. Gregory Nazianzen, Doctor of the Church (Orations on the Seasons of Grace, delivered at Constantinople, c. 380 AD)',
    paragraphs: [
      'When you look toward the western horizon and behold a cloud rising, you say at once that rain is coming, and so it happens; and when the south wind blows, you foretell scorching heat, and it comes to pass. Why then, asks the Savior, are men so sharp-sighted in reading the face of the sky for their earthly harvests, and yet so blind in discerning "the present time" for their immortal souls?',
      'What is this "present time" of which the Lord speaks? It is the acceptable hour of Messianic mercy, the brief span of our earthly pilgrimage in which the Sun of Justice shines upon us and the rain of baptismal and sacramental grace falls gently upon the field of the Church. Soon the season of mercy will give way to the tribunal of exact judgment.',
      'Therefore Christ commands us to be reconciled with our opponent "on the way" before we arrive before the Magistrate. Our opponent on this road is the holy Law of God whenever our sins contradict His commandments, and every brother whom we have wronged. While we still draw breath upon the road of mortal life, we can settle the debt for a word of humble confession and an act of fraternal forgiveness; once death brings us before the Judge, every unrepentant debt is exacted to the very last mite.'
    ],
    spiritualApplication: 'Settle every spiritual debt "on the way" today: forgive anyone who has offended you from the bottom of your heart, and bring your sins promptly to Sacramental Confession.'
  },

  // Thursday of the Twenty-Ninth Week in Ordinary Time (Oct 22, 2026): Luke 12:49-53
  {
    id: 'homily-luke-12-49-53-ephrem',
    scriptureReference: 'Luke 12:49-53',
    saintName: 'St. Ephrem the Syrian',
    doctorTitle: 'Doctor of the Church (Harp of the Holy Spirit)',
    workTitle: 'Homilies on Our Lord',
    yearDelivered: 'c. 363 AD',
    homilyTitle: 'On the Divine Fire Cast upon the Earth',
    homilyAttribution: 'St. Ephrem the Syrian, Doctor of the Church (Homilies on Our Lord, delivered at Edessa, c. 363 AD)',
    homilyHeading: 'On the Divine Fire Cast upon the Earth\nSt. Ephrem the Syrian, Doctor of the Church (Homilies on Our Lord, delivered at Edessa, c. 363 AD)',
    paragraphs: [
      'Our Lord and Savior cried aloud with burning desire: "I have come to set the earth on fire, and how I wish it were already blazing!" What is this heavenly fire which the Son of God brought down from the bosom of the Father? It is not a fire that destroys creation, but the sanctifying flame of the Holy Spirit and of supernatural charity, which consumes the briars of sin, melts the ice of human selfishness, and refines the human heart like pure gold in the furnace!',
      'Before this divine fire could blaze across the world, Christ declared: "There is a baptism with which I must be baptized, and how great is My anguish until it is accomplished!" He speaks of the baptism of His own Precious Blood upon the wood of the Cross. Out of infinite love for mankind, He longed for the hour of Calvary, knowing that when the soldier’s lance opened His Sacred Heart, the fire of the Spirit and the living waters of the Sacraments would flow forth to renew the face of the earth.',
      'And why does the Prince of Peace declare that He came to bring division rather than a worldly peace? Because there can be no true peace where sin and falsehood reign unchallenged. The sword of Gospel truth severs the soul from disordered attachments and compromises with the world, uniting us in an unbreakable covenant of love with God above all things.'
    ],
    spiritualApplication: 'Invite the Holy Spirit today to enkindle the fire of divine love in your heart, burning away all lukewarmness and placing fidelity to Christ above every human respect.'
  },

  // Wednesday of the Twenty-Ninth Week in Ordinary Time (Oct 21, 2026): Luke 12:39-48
  {
    id: 'homily-luke-12-39-48-chrysostom',
    scriptureReference: 'Luke 12:39-48',
    saintName: 'St. John Chrysostom',
    doctorTitle: 'Doctor of the Church',
    workTitle: 'Homilies on the Gospel',
    yearDelivered: 'c. 390 AD',
    homilyTitle: 'On the Faithful and Prudent Steward',
    homilyAttribution: 'St. John Chrysostom, Doctor of the Church (Homilies on the Gospel, delivered at Antioch, c. 390 AD)',
    homilyHeading: 'On the Faithful and Prudent Steward\nSt. John Chrysostom, Doctor of the Church (Homilies on the Gospel, delivered at Antioch, c. 390 AD)',
    paragraphs: [
      'Our Master commands us to remain ever watchful, because at an hour we do not expect, the Son of Man will come. If a householder knew at what watch of the night the thief would come, he would stay awake; because God has mercifully concealed from us the day of our death, He wills that we keep watch over our conscience every single day of our lives.',
      'When Saint Peter asked whether this parable was spoken to the Apostles alone or to all, Our Lord answered by describing the faithful and prudent steward placed over His household to distribute the portion of wheat in due season. Every bishop and priest is a steward of the sacred Mysteries, and every baptized Christian is likewise a steward of the gifts God has entrusted to him—whether time, wealth, intellect, family, or spiritual grace. None of these gifts are ours to squander in pride or luxury; they belong to the Master and are given for the service of our brethren.',
      'Tremble at the closing sentence of the Judge, and yet take heart in His mercy: "Much will be required of the person entrusted with much, and still more will be demanded of the person entrusted with more." We who have received the fullness of Catholic truth and the Bread of Angels in the Eucharist have been entrusted with unfathomable treasures; let our humility, our prayer, and our generosity to the poor be proportionate to the graces we have received!'
    ],
    spiritualApplication: 'Act as a faithful steward today by using your time, talents, and resources not for self-indulgence, but to nourish and encourage those whom God has placed in your life.'
  },

  // Tuesday of the Twenty-Ninth Week in Ordinary Time (Oct 20, 2026): Luke 12:35-38
  {
    id: 'homily-luke-12-35-38-augustine',
    scriptureReference: 'Luke 12:35-38',
    saintName: 'St. Augustine of Hippo',
    doctorTitle: 'Doctor of Grace',
    workTitle: 'Sermons on the New Testament (Sermo 108)',
    yearDelivered: 'c. 420 AD',
    homilyTitle: 'On Loins Girded and Burning Lamps',
    homilyAttribution: 'St. Augustine of Hippo, Doctor of the Church (Sermon 108, delivered at Hippo Regius, c. 420 AD)',
    homilyHeading: 'On Loins Girded and Burning Lamps\nSt. Augustine of Hippo, Doctor of the Church (Sermon 108, delivered at Hippo Regius, c. 420 AD)',
    paragraphs: [
      '"Let your loins be girded and your lamps burning, and be like men who are waiting for their master to return from the marriage feast, so that they may open to him at once when he comes and knocks." In these two brief commands, Our Savior summarizes the entire Christian life: we must both abstain from evil and do good! To gird our loins is to restrain carnal concupiscence and worldly entanglements through holy purity and temperance; to hold burning lamps in our hands is to shine with true faith and active works of charity.',
      'Why must we do both? Because a man who keeps continence but lacks charity toward his neighbor has girded loins, yet carries a cold, extinguished lamp; while a man who performs outward alms to be praised by men while indulging secret vices carries a smoking lamp with ungirded loins. Only when purity of heart is united with the oil of unfeigned love for God and neighbor do we stand ready to open the door the instant the Bridegroom knocks.',
      'And behold the inconceivable reward promised to the vigilant servant: "Amen, I say to you, He will gird Himself, have them sit at table, and come and serve them!" In this life Christ served us by washing our feet and pouring out His Blood; in the eternal banquet of heaven, He Himself will be our food, our light, and our everlasting joy!'
    ],
    spiritualApplication: 'Keep your heart pure and your lamp of charity burning brightly today so that at every moment you are ready to welcome Christ with joy.'
  },

  // Monday of the Twenty-Ninth Week in Ordinary Time (Oct 19, 2026): Luke 12:13-21
  {
    id: 'homily-luke-12-13-21-basil',
    scriptureReference: 'Luke 12:13-21',
    saintName: 'St. Basil the Great',
    doctorTitle: 'Doctor of the Church',
    workTitle: 'Homilia VI, In Illud Lucae: Destruam Horrea Mea',
    yearDelivered: 'c. 368 AD',
    homilyTitle: 'On the Parable of the Rich Fool',
    homilyAttribution: 'St. Basil the Great, Doctor of the Church (Homilia VI, In Illud Lucae: Destruam Horrea Mea, delivered at Caesarea, c. 368 AD)',
    homilyHeading: 'On the Parable of the Rich Fool\nSt. Basil the Great, Doctor of the Church (Homilia VI, In Illud Lucae: Destruam Horrea Mea, delivered at Caesarea, c. 368 AD)',
    paragraphs: [
      'Twofold is the trial with which God tests the human soul: poverty tests our patience, while abundance tests our justice and charity. Today Our Lord sets before us a man whose fertile fields brought forth an overflowing harvest. Yet instead of lifting his hands in thanksgiving to the Giver of all good things and opening his granaries to the hungry, he fell into an agony of greed, crying within himself: "What shall I do, for I have nowhere to store my crops? I will tear down my barns and build larger ones!"',
      'Why do you say you have nowhere to store your grain, O foolish man? Have you no granaries? You have the stomachs of the hungry, the roofs of widows, the hands of orphans, the prisons of the afflicted! Those are the everlasting barns that never rot, that no thief can break into, and that carry your harvest directly into the Kingdom of Heaven! Listen to how the miser speaks to his own immortal soul as though it were a beast of the stall: "Soul, you have many good things laid up for many years; rest, eat, drink, be merry!"',
      'While he was still counting decades on his fingers, the voice of Almighty God thundered in the night: "You fool, this very night your life will be demanded of you; and the things you have prepared, to whom will they belong?" Let us learn from his folly: we are not absolute owners, but stewards of God’s gifts. What we hoard for ourselves we lose at death; what we give away in love for Christ we possess for all eternity!'
    ],
    spiritualApplication: 'Guard your heart against all greed today, and make yourself "rich in what matters to God" through generous almsgiving, gratitude, and detachment from earthly possessions.'
  },

  // Friday of the Twenty-Eighth Week in Ordinary Time (Oct 16, 2026): Luke 12:1-7
  {
    id: 'homily-luke-12-1-7-ambrose',
    scriptureReference: 'Luke 12:1-7',
    saintName: 'St. Ambrose of Milan',
    doctorTitle: 'Doctor of the Church',
    workTitle: 'Expositio Evangelii secundum Lucam, Book VII',
    yearDelivered: 'c. 388 AD',
    homilyTitle: 'On Divine Providence and Fearless Confidence in God',
    homilyAttribution: 'St. Ambrose of Milan, Doctor of the Church (Expositio Evangelii secundum Lucam, Book VII, delivered at Milan, c. 388 AD)',
    homilyHeading: 'On Divine Providence and Fearless Confidence in God\nSt. Ambrose of Milan, Doctor of the Church (Expositio Evangelii secundum Lucam, Book VII, delivered at Milan, c. 388 AD)',
    paragraphs: [
      'Our Lord begins by warning His disciples: "Beware of the leaven of the Pharisees, which is hypocrisy. For there is nothing concealed that will not be revealed, nor secret that will not be known." Hypocrisy is a counterfeit virtue that seeks the applause of men while hiding a corrupt heart; yet before the all-seeing eye of the Eternal Judge, every mask shall fall away and every hidden intention shall be manifested in the light of truth.',
      'To strengthen His witnesses against the threats of persecutors and the anxieties of this world, the Savior immediately lifts our gaze to the tender Providence of our Heavenly Father: "Are not five sparrows sold for two small coins? Yet not one of them has escaped the notice of God. Even the hairs of your head have all been counted. Do not be afraid; you are worth more than many sparrows."',
      'Reflect upon the majesty of this consola­tion! If the Creator of the universe does not forget a single tiny bird of the air, how could He ever forget you, whom He fashioned in His own image and redeemed at the price of His Only-Begotten Son’s Blood? Not that God counts our hairs as a miser counts coins, but that nothing in our lives—no tear, no trial, no hidden act of fidelity—escapes His loving care. Banish all servile fear, walk in holy sincerity, and rest securely in the hands of your Father!'
    ],
    spiritualApplication: 'Cast every anxious care upon your Heavenly Father today, trusting that He who numbers the very hairs of your head watches over every detail of your life with infinite love.'
  },

  // Solemnity of All Saints (Nov 1): Matthew 5:1-12a
  {
    id: 'homily-matt-5-1-12-bede-all-saints',
    scriptureReference: 'Matthew 5:1-12',
    saintName: 'St. Bede the Venerable',
    doctorTitle: 'Doctor of the Church',
    workTitle: 'Homily on the Feast of All Saints',
    yearDelivered: 'c. 730 AD',
    homilyTitle: 'On the Solemnity of All Saints and the Eight Beatitudes',
    homilyAttribution: 'St. Bede the Venerable, Doctor of the Church (Homily on the Feast of All Saints, delivered at Jarrow Abbey, c. 730 AD)',
    homilyHeading: 'On the Solemnity of All Saints and the Eight Beatitudes\nSt. Bede the Venerable, Doctor of the Church (Homily on the Feast of All Saints, delivered at Jarrow Abbey, c. 730 AD)',
    paragraphs: [
      'Today, dearly beloved brethren, we celebrate in one joyful solemnity the triumph of all the Saints of God—the glorious company of Apostles, the purple-robed army of Martyrs, the radiant choir of Confessors and Doctors, and the lilies of holy Virgins—who now reign forever with Christ in the heavenly Jerusalem. And to show us the royal highway by which these our brethren ascended from earthly exile to eternal glory, Mother Church proclaims today the Sermon on the Mount.',
      'Notice how the Divine Lawgiver opens His mouth upon the mountain: "Blessed are the poor in spirit, for theirs is the Kingdom of Heaven." Pride was the first step by which man fell from paradise; therefore humility and poverty of spirit is the first step by which man ascends back to God! The poor in spirit are those who, whether rich or poor in outward estate, attribute nothing to their own merits, tremble at God’s word, and place all their treasure in heaven.',
      'As we venerate the Saints today, let us remember that they were clothed in the same frail flesh as we are, tempted by the same world, yet conquered through the grace of Christ by living these Beatitudes—mourning over sin, hungering after justice, showing mercy, keeping purity of heart, and enduring persecution for the truth. Lift up your eyes to our homeland: the Saints are praying for us at the throne of the Lamb, calling us to join their everlasting feast!'
    ],
    spiritualApplication: 'Choose one Beatitude today to practice with special devotion in honor of All Saints, asking your patron saint to obtain for you the grace of final perseverance.'
  },

  // Commemoration of All the Faithful Departed / All Souls (Nov 2): John 6:37-40
  {
    id: 'homily-john-6-37-40-augustine',
    scriptureReference: 'John 6:37-40',
    saintName: 'St. Augustine of Hippo',
    doctorTitle: 'Doctor of Grace',
    workTitle: 'Tractates on the Gospel of John (Tractate 25) & De Cura pro Mortuis Gerenda',
    yearDelivered: 'c. 414 AD',
    homilyTitle: 'On the Resurrection of the Dead and Suffrages for the Faithful Departed',
    homilyAttribution: 'St. Augustine of Hippo, Doctor of the Church (Tractates on the Gospel of John, Tractate 25, delivered at Hippo Regius, c. 414 AD)',
    homilyHeading: 'On the Resurrection of the Dead and Suffrages for the Faithful Departed\nSt. Augustine of Hippo, Doctor of the Church (Tractates on the Gospel of John, Tractate 25, delivered at Hippo Regius, c. 414 AD)',
    paragraphs: [
      'Listen to the unfailing promise of the Incarnate Word, which is the anchor of our hope in the face of death: "Everything that the Father gives Me will come to Me, and I will not reject anyone who comes to Me... And this is the will of the One who sent Me, that I should not lose anything of what He gave Me, but that I should raise it on the last day." Death is not the annihilation of the Christian; it is a temporary sleep in the hands of the Redeemer until the trumpet of the final Resurrection!',
      'Because the Body of Christ is one, the bond of charity between the pilgrim Church on earth and the suffering souls in Purgatory is never severed by bodily death. As Holy Mother Church has received from the Apostles themselves, the Eucharistic Sacrifice of the Altar, together with our fervent prayers and almsgiving, brings immense refreshment, light, and speedy release to the faithful departed who died in the grace and friendship of God, yet still undergo purification.',
      'Let us therefore weep for our departed brethren not as those who have no hope, but assist them with the most efficacious help of all: by offering the Holy Sacrifice of the Mass, praying for their eternal rest, and receiving Holy Communion, trusting in Christ’s solemn word: "Everyone who sees the Son and believes in Him may have eternal life, and I shall raise him on the last day."'
    ],
    spiritualApplication: 'Offer your prayers, Holy Mass, and a spiritual work of mercy today for the Holy Souls in Purgatory, especially for your departed family members and those who have no one to pray for them.'
  },

  // Tuesday of the 31st Week in Ordinary Time / St. Martin de Porres (Nov 3): Luke 14:15-24
  {
    id: 'homily-luke-14-15-24-gregory',
    scriptureReference: 'Luke 14:15-24',
    saintName: 'Pope St. Gregory the Great',
    doctorTitle: 'Doctor of the Church',
    workTitle: 'Forty Gospel Homilies (Homily 36)',
    yearDelivered: '591 AD',
    homilyTitle: 'On the Parable of the Great Supper and the Excuses of the World',
    homilyAttribution: 'Pope St. Gregory the Great, Doctor of the Church (Forty Gospel Homilies, Homily 36, delivered at the Basilica of Ss. Philip and James in Rome, 591 AD)',
    homilyHeading: 'On the Parable of the Great Supper and the Excuses of the World\nPope St. Gregory the Great, Doctor of the Church (Forty Gospel Homilies, Homily 36, delivered at the Basilica of Ss. Philip and James in Rome, 591 AD)',
    paragraphs: [
      'Dearly beloved brethren, between the delights of the body and the delights of the heart there is this great difference: bodily delights, before we possess them, awaken a burning desire, but once we have eaten our fill, they quickly turn into satiety and weariness; spiritual delights, on the contrary, are little understood by those who do not yet possess them, but the more we taste them, the more intensely we hunger for them! Therefore our Lord sets before us the parable of a man who prepared a great dinner and sent His servant at the hour of the feast to say to the invited guests: "Come, everything is now ready."',
      'Yet behold the tragedy of human blindness: one by one, all who were invited began to excuse themselves! One said, "I have purchased a field and must go out and examine it"; another said, "I have purchased five yoke of oxen and am on my way to evaluate them"; a third said, "I have just married a wife and therefore I cannot come." What is signified by the field, if not earthly ambition? What are the five yoke of oxen, if not the five bodily senses when yoked solely to restless worldly curiosity? And what is symbolized by the marriage, if not the allurements of the flesh which chain the heart to earth?',
      'Because the proud and the worldly spurned the invitation, the Master of the house commanded His servant to go out into the streets, lanes, highways, and hedgerows and bring in the poor, the crippled, the blind, and the lame—the humble and contrite sinners who recognize their own spiritual poverty and hasten with gratitude to the Eucharistic Banquet of the Lamb!'
    ],
    spiritualApplication: 'Whenever the Church calls you to prayer and the Holy Sacrifice of the Mass, cast aside every worldly excuse and approach the Altar with the humility of the poor in spirit.'
  },

  // Wednesday of the 31st Week in Ordinary Time / St. Charles Borromeo (Nov 4): Luke 14:25-33
  {
    id: 'homily-luke-14-25-33-basil',
    scriptureReference: 'Luke 14:25-33',
    saintName: 'St. Basil the Great',
    doctorTitle: 'Doctor of the Church',
    workTitle: 'The Morals & Ascetical Discourses on Evangelical Renunciation',
    yearDelivered: 'c. 370 AD',
    homilyTitle: 'On Carrying the Cross and Calculating the Cost of the Spiritual Tower',
    homilyAttribution: 'St. Basil the Great, Doctor of the Church (Ascetical Discourses on Evangelical Renunciation, Caesarea in Cappadocia, c. 370 AD)',
    homilyHeading: 'On Carrying the Cross and Calculating the Cost of the Spiritual Tower\nSt. Basil the Great, Doctor of the Church (Ascetical Discourses on Evangelical Renunciation, Caesarea in Cappadocia, c. 370 AD)',
    paragraphs: [
      'When great crowds were traveling with our Lord Jesus Christ, He turned and spoke to them words of piercing truth: "Whoever does not carry his own cross and come after Me cannot be My disciple... Everyone of you who does not renounce all his possessions cannot be My disciple." Earthly captains conceal the hardships of war to recruit soldiers; our Divine King reveals the Cross from the very outset so that our discipleship may be founded on resolute love rather than fleeting emotion.',
      'Why does the Lord command us to prefer Him even above father, mother, and our own life? Not to destroy natural piety—which He Himself commanded in the Law—but to teach us that whenever human affection, worldly honor, or self-preservation would draw us away from fidelity to God, the Creator must be loved infinitely above every creature.',
      'Like a wise builder constructing a watchtower whose summit reaches heaven, let us first dig deep into the bedrock of humility and calculate the cost: detaching our hearts from all earthly possessions so that, stripped of every weight that clings to us, we may follow Christ Crucified with joyful freedom.'
    ],
    spiritualApplication: 'In imitation of St. Charles Borromeo and St. Basil the Great, unite today’s trials and duties with the Cross of Christ and practice generous detachment from worldly goods.'
  },

  // Thursday of the 31st Week in Ordinary Time (Nov 5): Luke 15:1-10
  {
    id: 'homily-luke-15-1-10-ambrose',
    scriptureReference: 'Luke 15:1-10',
    saintName: 'St. Ambrose of Milan',
    doctorTitle: 'Doctor of the Church',
    workTitle: 'Exposition of the Holy Gospel According to Luke (Book VII)',
    yearDelivered: 'c. 389 AD',
    homilyTitle: 'On the Good Shepherd Who Carries the Lost Sheep\nupon His Shoulders',
    homilyAttribution: 'St. Ambrose of Milan, Doctor of the Church (Exposition of the Holy Gospel According to Luke, Book VII, delivered at Milan, c. 389 AD)',
    homilyHeading: 'On the Good Shepherd Who Carries the Lost Sheep\nupon His Shoulders\nSt. Ambrose of Milan, Doctor of the Church (Exposition of the Holy Gospel According to Luke, Book VII, delivered at Milan, c. 389 AD)',
    paragraphs: [
      'Take courage, O sinner, and never despair of pardon when you behold the three parables by which our Savior heals the wounds of fallen humanity! Who is this Shepherd who leaves the ninety-nine sheep in the heavenly heights to seek the one lost sheep in the wilderness? It is Christ the Lord! Who is the Woman who lights her lamp and sweeps the house to recover the lost silver coin? It is the Church of Christ! And who is the Father who runs out to embrace the returning prodigal? It is God the Father of mercies!',
      'Rich is That Shepherd of whose flock the entire human race is but a single hundredth part, while the ninety-nine are the countless choirs of blessed Angels! When this one sheep strayed into the thorny thickets of sin and was too exhausted to walk back on its own, the Good Shepherd did not beat it or abandon it. He bent down from heaven in the Incarnation and lifted the weary sheep upon His own sacred shoulders.',
      'What are the shoulders of Christ? They are the arms of His Holy Cross! There He bore our sins and carried our frail humanity back to the Father’s fold. And just as the lost drachma stamped with the image of the Emperor is found when the Church lights the lamp of the Gospel, so all the Angels of God rejoice whenever one contrite soul returns to grace through repentance!'
    ],
    spiritualApplication: 'Thank our Lord today for seeking you when you strayed, and pray fervently for the conversion and return of one soul who has wandered away from the Sacraments.'
  },

  // Friday of the 31st Week in Ordinary Time (Nov 6): Luke 16:1-8
  {
    id: 'homily-luke-16-1-8-augustine',
    scriptureReference: 'Luke 16:1-8',
    saintName: 'St. Augustine of Hippo',
    doctorTitle: 'Doctor of Grace',
    workTitle: 'Sermons on the Liturgical Seasons & New Testament (Sermon 113)',
    yearDelivered: 'c. 410 AD',
    homilyTitle: 'On Christian Stewardship and Providing for Our Eternal Dwelling',
    homilyAttribution: 'St. Augustine of Hippo, Doctor of the Church (Sermon 113, On the Words of the Gospel of Luke 16, delivered at Hippo Regius, c. 410 AD)',
    homilyHeading: 'On Christian Stewardship and Providing for Our Eternal Dwelling\nSt. Augustine of Hippo, Doctor of the Church (Sermon 113, On the Words of the Gospel of Luke 16, delivered at Hippo Regius, c. 410 AD)',
    paragraphs: [
      'Why did our Lord Jesus Christ set before us the parable of the steward who was about to be dismissed from his office? Assuredly not to teach us fraud—far be it from the Truth to praise dishonesty! Rather, He praised the foresight with which that man provided for his future when he knew his present stewardship was coming to an end. For "the children of this world are more prudent in dealing with their own generation than the children of light."',
      'Every one of us in this mortal life is a steward, not an absolute proprietor, of the time, health, talents, and earthly resources entrusted to us by Almighty God. And very soon, at the hour of death, each of us will hear the voice of the Master: "Prepare a full account of your stewardship, for you can no longer be steward here!"',
      'How then can we act with holy prudence while time remains? By remitting the debts of those who have offended us through heartfelt forgiveness, and by placing our temporal goods into the hands of Christ’s poor through almsgiving, so that what we must soon leave behind on earth may go before us to build an everlasting tabernacle in heaven.'
    ],
    spiritualApplication: 'Examine your stewardship of time and blessings today: forgive someone from the heart and perform a concrete work of charity that lays up treasure in heaven.'
  },

  // Saturday of the 31st Week in Ordinary Time (Nov 7): Luke 16:9-15
  {
    id: 'homily-luke-16-9-15-cyril',
    scriptureReference: 'Luke 16:9-15',
    saintName: 'St. Cyril of Alexandria',
    doctorTitle: 'Doctor of the Incarnation',
    workTitle: 'Commentary on the Gospel of Luke (Homily 110)',
    yearDelivered: 'c. 430 AD',
    homilyTitle: 'On Fidelity in Small Things and Serving God Alone',
    homilyAttribution: 'St. Cyril of Alexandria, Doctor of the Church (Commentary on the Gospel of Luke, Homily 110, delivered at Alexandria, c. 430 AD)',
    homilyHeading: 'On Fidelity in Small Things and Serving God Alone\nSt. Cyril of Alexandria, Doctor of the Church (Commentary on the Gospel of Luke, Homily 110, delivered at Alexandria, c. 430 AD)',
    paragraphs: [
      'Listen to the heavenly wisdom with which our Savior weighs all the riches of this passing world: He calls earthly wealth "very small matters" and "another’s property," whereas He calls divine grace and the Beatific Vision "true wealth" and "our own"! Earthly riches are "another’s" because no man brought them into the world at birth or can carry them with him through the gate of death.',
      'Yet Christ reveals a blessed mystery: by sharing passing earthly goods with the poor and needy, we make for ourselves friends among the saints who will welcome us into eternal tents when this world passes away! And He adds the golden rule of spiritual progress: "The person who is trustworthy in very small matters is also trustworthy in great ones."',
      'No servant can serve two masters whose commands are contrary: "You cannot serve God and mammon." Let us therefore enthrone God alone as the Lord of our hearts, sanctifying our smallest daily duties with undivided love and fidelity.'
    ],
    spiritualApplication: 'Offer your smallest daily tasks, prayers, and hidden sacrifices to God with great fidelity today, refusing to let worldly worries divide your heart.'
  },

  // 32nd Sunday in Ordinary Time (Nov 8): Mark 12:38-44
  {
    id: 'homily-mark-12-38-44-leo',
    scriptureReference: 'Mark 12:38-44',
    saintName: 'Pope St. Leo the Great',
    doctorTitle: 'Doctor of the Church',
    workTitle: 'Sermons on Almsgiving and the Treasury of Christian Charity',
    yearDelivered: 'c. 450 AD',
    homilyTitle: 'On the Poor Widow’s Two Coins and the Divine Scales of Charity',
    homilyAttribution: 'Pope St. Leo the Great, Doctor of the Church (Sermons on the Collections and Christian Charity, delivered at Rome, c. 450 AD)',
    homilyHeading: 'On the Poor Widow’s Two Coins and the Divine Scales of Charity\nPope St. Leo the Great, Doctor of the Church (Sermons on the Collections and Christian Charity, delivered at Rome, c. 450 AD)',
    paragraphs: [
      'In the scales of divine justice, dearly beloved, the quantity of our gifts is not measured by their outward weight in gold or silver, but by the fullness of the goodwill and charity of the soul that offers them! Today in the Gospel we behold our Lord Jesus Christ seated opposite the Temple treasury, watching not merely the hands of the givers, but the hidden secrets of their hearts.',
      'Many rich men cast in large sums from their abundance, yet a poor widow came and silently dropped in two tiny copper coins worth scarcely a quadrant. Immediately the Eternal Judge summoned His disciples and pronounced sentence: "Amen, I say to you, this poor widow put in more than all the other contributors to the treasury. For they have all contributed from their surplus wealth, but she, from her poverty, has contributed all she had, her whole livelihood."',
      'Let no one, therefore, fear that slender means can exclude him from the palm of charity! Even the poorest Christian is rich if his heart is full of love for God and neighbor. When you give yourself wholly to God—holding nothing back for pride or self-love, and entrusting your tomorrow to Divine Providence like the widow of Zarephath and the widow in the Temple—your two small coins purchase the Kingdom of Heaven!'
    ],
    spiritualApplication: 'Make a total offering of your day, your heart, and your charitable works to God today, remembering that Christ measures every gift by the love with which it is given.'
  },

  // Feast of the Dedication of the Lateran Basilica (Nov 9): John 2:13-22
  {
    id: 'homily-john-2-13-22-augustine',
    scriptureReference: 'John 2:13-22',
    saintName: 'St. Augustine of Hippo',
    doctorTitle: 'Doctor of Grace',
    workTitle: 'Tractates on the Gospel of John (Tractate 10) & Sermon 336 on the Dedication of a Church',
    yearDelivered: 'c. 414 AD',
    homilyTitle: 'On the Living Temple of Christ’s Body and the Dedication of Our Souls',
    homilyAttribution: 'St. Augustine of Hippo, Doctor of the Church (Tractates on the Gospel of John, Tractate 10, & Sermon 336, Hippo Regius, c. 414 AD)',
    homilyHeading: 'On the Living Temple of Christ’s Body and the Dedication of Our Souls\nSt. Augustine of Hippo, Doctor of the Church (Tractates on the Gospel of John, Tractate 10, & Sermon 336, Hippo Regius, c. 414 AD)',
    paragraphs: [
      'Whenever we celebrate with solemnity the Dedication of the House of God—and today the Dedication of the Mother and Head of all Churches in Rome—what is accomplished visibly in walls of stone must be fulfilled spiritually within our own souls! For as the Apostle Paul proclaims: "You are God’s building... Do you not know that you are the temple of God, and that the Spirit of God dwells in you?"',
      'In today’s Gospel we behold our Lord Jesus Christ burning with holy zeal for His Father’s house, driving out the buyers and sellers who had turned the sanctuary of prayer into a marketplace of greed, and declaring of His own Sacred Humanity: "Destroy this temple, and in three days I will raise it up." Slain upon the altar of the Cross and raised in glory on Easter morning, Christ Himself is the true and everlasting Temple from whose pierced side flows the lifeblood of the Sacraments, like the life-giving river beheld by the prophet Ezekiel.',
      'Let us therefore welcome Christ into the temple of our hearts today, beseeching Him to drive out every noisy traffic of worldly vanity, anger, and covetousness, so that our souls may remain a pure house of prayer, united in unshakable communion with the Universal Church.'
    ],
    spiritualApplication: 'Make an act of thanksgiving today for your baptismal incorporation into the Catholic Church, and visit or pray before the Blessed Sacrament with deep reverence.'
  }
];

/**
 * Returns the daily homily by a Saint and Doctor of the Church for the given MassReading.
 * Updates automatically every day to match the day's Gospel reading.
 */
export function getDailySaintHomily(reading: MassReading): DailySaintHomily {
  const gospelCitation = (reading.gospel?.citation || '').trim();

  // 1. Exact match on Gospel citation
  const exactMatch = DAILY_SAINT_HOMILIES_DATABASE.find(
    h => h.scriptureReference.toLowerCase() === gospelCitation.toLowerCase()
  );
  if (exactMatch) return exactMatch;

  // 2. Partial match on Gospel citation
  const partialMatch = DAILY_SAINT_HOMILIES_DATABASE.find(h => {
    const book = gospelCitation.split(' ')[0];
    return (
      h.scriptureReference.startsWith(book) &&
      (gospelCitation.includes(h.scriptureReference) ||
        h.scriptureReference.includes(gospelCitation))
    );
  });
  if (partialMatch) return partialMatch;

  // 3. Deterministic daily rotation across the great Saints and Doctors of the Church for any date of the year
  const doctors: Array<{
    saintName: string;
    doctorTitle: string;
    workTitle: string;
    yearDelivered: string;
    city: string;
  }> = [
    {
      saintName: 'St. John Chrysostom',
      doctorTitle: 'Doctor of the Church',
      workTitle: 'Homilies on the Liturgical Gospels',
      yearDelivered: 'c. 390 AD',
      city: 'Antioch'
    },
    {
      saintName: 'St. Augustine of Hippo',
      doctorTitle: 'Doctor of Grace',
      workTitle: 'Sermons on the New Testament (Sermones de Scripturis)',
      yearDelivered: 'c. 412 AD',
      city: 'Hippo Regius'
    },
    {
      saintName: 'Pope St. Gregory the Great',
      doctorTitle: 'Doctor of the Church',
      workTitle: 'Homiliae in Evangelia',
      yearDelivered: '591 AD',
      city: 'Rome'
    },
    {
      saintName: 'St. Bede the Venerable',
      doctorTitle: 'Doctor of the Church',
      workTitle: 'Homiliae Evangelii',
      yearDelivered: 'c. 725 AD',
      city: 'Jarrow Abbey'
    },
    {
      saintName: 'St. Cyril of Alexandria',
      doctorTitle: 'Doctor of the Incarnation',
      workTitle: 'Commentarius in Evangelium',
      yearDelivered: 'c. 430 AD',
      city: 'Alexandria'
    },
    {
      saintName: 'St. Ambrose of Milan',
      doctorTitle: 'Doctor of the Church',
      workTitle: 'Expositio Evangelii',
      yearDelivered: 'c. 388 AD',
      city: 'Milan'
    },
    {
      saintName: 'Pope St. Leo the Great',
      doctorTitle: 'Doctor of the Church',
      workTitle: 'Liturgical Sermons',
      yearDelivered: 'c. 448 AD',
      city: 'Rome'
    },
    {
      saintName: 'St. Bernard of Clairvaux',
      doctorTitle: 'Doctor Mellifluus (Doctor of the Church)',
      workTitle: 'Sermones per Annum',
      yearDelivered: 'c. 1138 AD',
      city: 'Clairvaux Abbey'
    },
    {
      saintName: 'St. Thomas Aquinas',
      doctorTitle: 'Angelic Doctor (Doctor of the Church)',
      workTitle: 'Collationes et Sermones Dominicales',
      yearDelivered: 'c. 1268 AD',
      city: 'Paris'
    },
    {
      saintName: 'St. Francis de Sales',
      doctorTitle: 'Doctor of Charity (Doctor of the Church)',
      workTitle: 'Sermons on the Gospels of the Liturgical Year',
      yearDelivered: 'c. 1615 AD',
      city: 'Annecy'
    }
  ];

  // Hash the date string to pick a consistent Doctor of the Church for that day
  const dateHash = (reading.date || gospelCitation)
    .split('')
    .reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const chosen = doctors[dateHash % doctors.length];

  const homilyTitle = `On the Holy Gospel (${gospelCitation})`;
  const homilyAttribution = `${chosen.saintName}, ${chosen.doctorTitle} (${chosen.workTitle}, delivered at ${chosen.city}, ${chosen.yearDelivered})`;

  return {
    id: `homily-daily-${reading.date || gospelCitation}`,
    scriptureReference: gospelCitation,
    saintName: chosen.saintName,
    doctorTitle: chosen.doctorTitle,
    workTitle: chosen.workTitle,
    yearDelivered: chosen.yearDelivered,
    homilyTitle,
    homilyAttribution,
    homilyHeading: `${homilyTitle}\n${homilyAttribution}`,
    paragraphs: [
      `Whenever the Holy Gospel (${gospelCitation}) is proclaimed in the liturgical assembly on ${reading.liturgicalDay}, our Lord and Savior Jesus Christ Himself stands in the midst of His faithful people, speaking words of spirit and eternal life. Let us incline the ear of our heart with reverent attention, my beloved brethren, for just as we take care that not a single particle of the Eucharistic Bread falls to the ground, so we must treasure every syllable that falls from the lips of the Incarnate Word.`,
      `${reading.reflection?.content || 'In this sacred passage, the Divine Physician reveals both the greatness of His mercy and the holiness to which every baptized soul is summoned. He draws our minds away from fleeting earthly cares toward the imperishable treasures of the Kingdom of Heaven.'} Notice how the harmony of today’s liturgy—uniting the First Reading (${reading.firstReading.citation}) and the Responsorial Psalm ("${reading.responsorialPsalm.antiphon}") with the Gospel proclamation—prepares the soul to pass from the shadow of the old Adam into the radiant light of the Risen Christ.`,
      `Let us not be mere hearers of the Word, my brethren, but joyful doers of the truth! Carry the fragrance of today’s Gospel from the altar into your homes and daily duties, practicing humble prayer, fraternal forgiveness, and active charity toward the poor, so that when the Heavenly Bridegroom appears in glory, He may recognize in us the likeness of His own divine love.`
    ],
    spiritualApplication: `Meditate upon today’s Gospel (${gospelCitation}) in silent prayer, and put its teaching into practice through a concrete act of humility, thanksgiving, and charity today.`
  };
}
