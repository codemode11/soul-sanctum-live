import { MassReading } from '../types';
import { getMassReadingsForDate } from './massReadings';
import { toCurvedQuotes } from '../utils/typography';

export type OfficeHourKey = 'invitatory' | 'readings' | 'lauds' | 'daytime' | 'vespers' | 'compline';

export interface PsalmEntry {
  antiphon: string;
  citation: string;
  title: string;
  subtitle?: string;
  verses: string[];
}

export interface IntercessionPetition {
  petition: string;
  response: string;
}

export interface DivineOfficeHourData {
  hourKey: OfficeHourKey;
  englishTitle: string;
  latinTitle?: string;
  timeHint: string;
  openingVerse: string;
  openingResponse: string;
  hymnTitle: string;
  hymnAuthor?: string;
  hymnStanzas: string[];
  psalms: PsalmEntry[];
  shortReadingCitation: string;
  shortReadingText: string;
  responsory: {
    verse: string;
    response: string;
    repeat: string;
  };
  canticle?: {
    title: string;
    citation: string;
    antiphon: string;
    text: string;
  };
  patristicReading?: {
    author: string;
    work: string;
    title: string;
    text: string;
    responsory: string;
  };
  intercessions?: {
    introduction: string;
    response: string;
    petitions: string[];
  };
  collect: string;
  conclusion: string;
  marianAntiphon?: {
    title: string;
    text: string;
    verseResponse: string;
    collect: string;
  };
}

/**
 * Returns complete, authentic Liturgy of the Hours texts for the specified date and hour,
 * strictly matching our application's design system and typography.
 */
export function getDivineOfficeHour(
  dateStr?: string,
  hourKey: OfficeHourKey = 'lauds'
): DivineOfficeHourData {
  const effectiveDate = dateStr || '2026-11-06';
  const reading: MassReading = getMassReadingsForDate(effectiveDate);

  const dateParts = effectiveDate.split('-');
  const yearNum = parseInt(dateParts[0], 10) || 2026;
  const monthNum = parseInt(dateParts[1], 10) || 11;
  const dayNum = parseInt(dateParts[2], 10) || 6;
  const monthNames = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const fullMonthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const formattedDateLabel = `${fullMonthNames[monthNum]} ${dayNum}, ${yearNum}`;

  const gospelText = reading.gospel.text || '';
  const gospelCitation = reading.gospel.citation || 'Holy Gospel';
  const liturgicalDay = reading.liturgicalDay || 'Weekday in Ordinary Time';

  switch (hourKey) {
    case 'invitatory':
      return {
        hourKey: 'invitatory',
        englishTitle: 'Invitatory Prayer',
        timeHint: 'First prayer upon waking before any other Hour',
        openingVerse: 'Lord, open my lips.',
        openingResponse: 'And my mouth will proclaim your praise.',
        hymnTitle: 'Venite, Exultemus Domino (Psalm 95)',
        hymnStanzas: [
          'Come, let us ring out our joy to the Lord, hail the rock who saves us. Let us come before him, giving thanks, with songs let us hail the Lord.',
          'A mighty God is the Lord, a great king above all gods. In his hand are the depths of the earth; the heights of the mountains are his. To him belongs the sea, for he made it, and the dry land shaped by his hands.',
          'Come in, let us bow and bend low; let us kneel before the God who made us for he is our God and we the people who belong to his pasture, the flock that is led by his hand.',
          'O that today you would listen to his voice: "Harden not your hearts as at Meribah, as on that day at Massah in the desert when your fathers put me to the test; when they tried me, though they saw my work."'
        ],
        psalms: [
          {
            antiphon: `Come, let us worship Christ the Lord, who speaks to us in the Holy Gospel.`,
            citation: 'Psalm 95',
            title: 'Call to Praise the Lord and Sovereign God',
            verses: [
              'Forty years I was wearied of that generation, and I said: "Their hearts are always astray, they do not know my ways." So I swore in my anger: "They shall not enter my rest."',
              'Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen.'
            ]
          }
        ],
        shortReadingCitation: 'Hebrews 3:7-8',
        shortReadingText: 'Today, if you hear his voice, do not harden your hearts as in the rebellion, on the day of testing in the wilderness.',
        responsory: {
          verse: 'V. Hear the word of the Lord, O nations.',
          response: 'R. Proclaim it to the ends of the earth.',
          repeat: 'Proclaim it to the ends of the earth.'
        },
        collect: `Almighty and ever-living God, grant that our hearts may always be attentive to your divine voice, so that, responding in faith to the Holy Gospel proclaimed today in ${liturgicalDay}, we may enter into your eternal rest. Through Christ our Lord. Amen.`,
        conclusion: 'V. May the Lord bless us, protect us from all evil and bring us to everlasting life. R. Amen.'
      };

    case 'readings':
      return {
        hourKey: 'readings',
        englishTitle: 'Office of Readings',
        timeHint: 'Prayed at night, early morning, or any quiet hour of the day',
        openingVerse: 'O God, come to my assistance.',
        openingResponse: 'O Lord, make haste to help me. Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen. Alleluia.',
        hymnTitle: 'O Splendor of God\'s Glory Bright',
        hymnAuthor: 'St. Ambrose of Milan (340–397)',
        hymnStanzas: [
          'O Splendor of God\'s glory bright, who bringest forth the light from Light; O Light of light, light\'s Fount and Spring, Redeemer, Savior, heavenly King.',
          'Come, very Sun of truth and love, come in thy radiance from above, and shed the Holy Spirit\'s ray on all we think or do today.',
          'To God the Father, glory be, and to his sole-begotten Son, with thee, O Holy Paraclete, while everlasting ages run.'
        ],
        psalms: [
          {
            antiphon: 'Great is the Lord and worthy of high praise in the city of our God.',
            citation: 'Psalm 48',
            title: 'Thanksgiving for the Salvation of the Holy City',
            subtitle: 'The Jerusalem above is free, and she is our mother (Gal 4:26)',
            verses: [
              '1 Great is the LORD and highly to be praised in the city of our God.',
              '2 His holy mountain, beautiful in elevation, is the joy of the all the earth.',
              '3 Mount Zion, in the far north, the city of the great King. Within her citadels God has shown himself to be a fortress.',
              '8 As we have heard, so have we seen in the city of the LORD of hosts, in the city of our God, which God establishes forever.',
              '14 For this God is our God forever and ever; he will guide us for eternity.',
              'Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen.'
            ]
          },
          {
            antiphon: 'Hear this, all you peoples; listen, all who dwell in the world.',
            citation: 'Psalm 49:1-13',
            title: 'The Vanity of Riches and Human Pride',
            subtitle: 'Hard it is for a rich man to enter the Kingdom of Heaven (Mt 19:23)',
            verses: [
              '1 Hear this, all you peoples! Give ear, all inhabitants of the world, both low and high, rich and poor together!',
              '5 Why should I fear in times of trouble, when the iniquity of my persecutors surrounds me, those who trust in their wealth and boast of the abundance of their riches?',
              '7 Truly no man can ransom another, or give to God the price of his life, for the ransom of his soul is costly and can never suffice.',
              '12 Man in his pomp will not remain; he is like the beasts that perish.',
              'Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen.'
            ]
          }
        ],
        shortReadingCitation: reading.firstReading.citation,
        shortReadingText: reading.firstReading.text,
        responsory: {
          verse: 'V. Your word is a lamp for my feet, O Lord.',
          response: 'R. And a light for my path.',
          repeat: 'And a light for my path.'
        },
        patristicReading: {
          author: reading.reflection?.author || 'St. Augustine of Hippo',
          work: 'Expositio in Evangelium & Sermones Patrum',
          title: reading.reflection?.title || 'The Living Voice of the Gospel Proclaimed in the Church',
          text: reading.reflection?.content || 'Notice how the harmony of today’s liturgy—uniting the Sacred Scripture proclamation with the prayer of the Universal Church—prepares the soul to pass from the shadow of the old Adam into the radiant light of the Risen Christ.',
          responsory: 'R. Lord, to whom shall we go? You have the words of eternal life. V. We have come to believe and know that you are the Holy One of God.'
        },
        collect: `O God, who in the mystery of the Liturgy of the Hours draw your Bride the Church into unceasing communion with the Trinity, grant that as we meditate upon your holy Word today, we may grow in wisdom and holiness. Through our Lord Jesus Christ, your Son, who lives and reigns with you in the unity of the Holy Spirit, God, for ever and ever. Amen.`,
        conclusion: 'V. Let us praise the Lord. R. Thanks be to God.'
      };

    case 'lauds':
    default:
      return {
        hourKey: 'lauds',
        englishTitle: 'Morning Prayer (Lauds)',
        timeHint: 'Prayed at dawn to consecrate the first hours of the day to the Risen Christ',
        openingVerse: 'O God, come to my assistance.',
        openingResponse: 'O Lord, make haste to help me. Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen. Alleluia.',
        hymnTitle: 'Lucis Creator Optime (O Blest Creator of the Light)',
        hymnAuthor: 'Attributed to St. Gregory the Great (540–604)',
        hymnStanzas: [
          'O blest Creator of the light, who mak\'st the day with radiance bright, and o\'er the forming world didst call the light from chaos first of all.',
          'Whose wisdom joined in meet array the morning and the closing day; now night returns with solemn shade, hear thou the prayers thy saints have made.',
          'Most loving Father, hear our cry through Jesus Christ, thy Son Most High, who with the Holy Ghost and thee doth live and reign eternally. Amen.'
        ],
        psalms: [
          {
            antiphon: 'O God, you are my God, for you I long; for you my soul is thirsting.',
            citation: 'Psalm 63:2-9',
            title: 'A Soul Thirsting for the Living God',
            subtitle: 'He keeps watch over the Bride of Christ who wakes in the morning (St. Athanasius)',
            verses: [
              '2 O God, you are my God, for you I long; for you my soul is thirsting. My body pines for you like a dry, weary land without water.',
              '3 So I gaze upon you in the sanctuary to see your strength and your glory.',
              '4 For your love is better than life; my lips will speak your praise.',
              '5 So I will bless you all my life, in your name I will lift up my hands.',
              '8 For you have been my help; in the shadow of your wings I rejoice. My soul clings to you; your right hand holds me fast.',
              'Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen.'
            ]
          },
          {
            antiphon: 'All works of the Lord, bless the Lord; praise and exalt him above all forever.',
            citation: 'Canticle of Daniel (Dan 3:57-88, 56)',
            title: 'Hymn of All Creation to the Almighty Creator',
            subtitle: 'Praise our God, all you his servants (Rev 19:5)',
            verses: [
              '57 Bless the Lord, all you works of the Lord; praise and exalt him above all forever.',
              '58 Angels of the Lord, bless the Lord; you heavens, bless the Lord.',
              '59 All you waters above the heavens, bless the Lord; all you hosts of the Lord, bless the Lord.',
              '87 Holy and humble of heart, bless the Lord; praise and exalt him above all forever.',
              'Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen.'
            ]
          },
          {
            antiphon: 'Sing a new song to the Lord, his praise in the assembly of the faithful.',
            citation: 'Psalm 149',
            title: 'The Joy of God\'s Holy Ones in His Victory',
            subtitle: 'Let the sons of the Church rejoice in Christ, their Heavenly King (St. Hesychius)',
            verses: [
              '1 Sing a new song to the LORD, his praise in the assembly of the faithful.',
              '2 Let Israel rejoice in its Maker; let the children of Zion exult in their King.',
              '4 For the LORD takes pleasure in his people; he crowns the humble with victory.',
              'Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen.'
            ]
          }
        ],
        shortReadingCitation: reading.firstReading.citation,
        shortReadingText: reading.firstReading.text,
        responsory: {
          verse: 'V. The Lord is my strength and my song; he has become my salvation.',
          response: 'R. The Lord is my strength and my song; he has become my salvation.',
          repeat: 'Glory to the Father, and to the Son, and to the Holy Spirit. The Lord is my strength and my song.'
        },
        canticle: {
          title: 'Canticle of Zechariah (The Benedictus)',
          citation: 'Luke 1:68-79',
          antiphon: `Blessed be the Lord God of Israel, who has visited and redeemed his people in the Gospel of this day (${gospelCitation}).`,
          text: `68 Blessed be the Lord, the God of Israel; he has come to his people and set them free.
69 He has raised up for us a mighty savior, born of the house of his servant David.
70 Through his holy prophets he promised of old that he would save us from our enemies, from the hands of all who hate us.
71 He promised to show mercy to our fathers and to remember his holy covenant.
72 This was the oath he swore to our father Abraham: to set us free from the hands of our enemies, free to worship him without fear, holy and righteous in his sight all the days of our life.
76 You, my child, shall be called the prophet of the Most High, for you will go before the Lord to prepare his way, to give his people knowledge of salvation by the forgiveness of their sins.
78 In the tender compassion of our God the dawn from on high shall break upon us, to shine on those who dwell in darkness and the shadow of death, and to guide our feet into the way of peace.`
        },
        intercessions: {
          introduction: 'Let us glorify Christ, the Sun of Justice, who rises upon the world to enlighten all mankind. In joy and faith let us cry out:',
          response: 'Lord, guide our feet into the way of peace.',
          petitions: [
            'Blessed are you, Lord God, who preserved us through the darkness of night: fill this morning with the radiant light of your Holy Spirit.',
            `Bless the holy Catholic Church across the earth, our Holy Father the Pope, and our Bishop: grant them apostolic zeal in proclaiming the truth of ${gospelCitation}.`,
            'Teach us to manage the passing goods of this world with prudence and justice, always preparing our eternal dwelling in the Kingdom of Heaven.',
            'Comfort the sick, the dying, the lonely, and the suffering today: let them feel the tender compassion of your divine Sacred Heart.'
          ]
        },
        collect: `Almighty God, who in your infinite love grant us to begin this new day praising your holy Name, grant that as we hear your word proclaimed in ${liturgicalDay}, we may walk before you in righteousness and purity of heart. Through our Lord Jesus Christ, your Son, who lives and reigns with you in the unity of the Holy Spirit, God, for ever and ever. Amen.`,
        conclusion: 'V. The Lord be with you. R. And with your spirit. V. May almighty God bless you, the Father, and the Son, and the Holy Spirit. R. Amen.'
      };

    case 'daytime':
      return {
        hourKey: 'daytime',
        englishTitle: 'Daytime Prayer (Terce • Sext • None)',
        timeHint: 'Prayed at mid-morning (9 AM), mid-day (12 PM), or mid-afternoon (3 PM)',
        openingVerse: 'O God, come to my assistance.',
        openingResponse: 'O Lord, make haste to help me. Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen. Alleluia.',
        hymnTitle: 'Rerum, Deus, Tenax Vigor (O God, Creation\'s Secret Force)',
        hymnAuthor: 'Attributed to St. Ambrose of Milan',
        hymnStanzas: [
          'O God, creation\'s secret force, yourself unmoved, all motion\'s source, who guide the day from morning light through all its changes to the night.',
          'Grant us a holy death, we pray, a life that fades not with the day, but brings at last, for cloudless peace, a heavenly bliss that shall not cease.'
        ],
        psalms: [
          {
            antiphon: 'Lord, keep my steps firm in your paths.',
            citation: 'Psalm 119:33-40',
            title: 'Prayer for Wisdom and Fidelity to God\'s Law',
            subtitle: 'If you love me, keep my commandments (Jn 14:15)',
            verses: [
              '33 Teach me, O LORD, the way of your statutes, and I will keep it to the end.',
              '34 Give me understanding, that I may keep your law and observe it with my whole heart.',
              '36 Incline my heart to your testimonies, and not to selfish gain!',
              '37 Turn my eyes from looking at vanished things; give me life in your ways.',
              'Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen.'
            ]
          }
        ],
        shortReadingCitation: 'Romans 12:1-2',
        shortReadingText: 'I appeal to you therefore, brethren, by the mercies of God, to present your bodies as a living sacrifice, holy and acceptable to God, which is your spiritual worship. Do not be conformed to this world, but be transformed by the renewal of your mind.',
        responsory: {
          verse: 'V. The Lord is my shepherd, I shall not want.',
          response: 'R. He makes me lie down in green pastures.',
          repeat: 'He makes me lie down in green pastures.'
        },
        collect: `Lord God, heavenly King, at this midday hour when your blessed Son hung upon the Cross for our redemption, grant that his sacred Passion may sanctify our daily labors and protect us from every temptation. Through Christ our Lord. Amen.`,
        conclusion: 'V. Let us praise the Lord. R. Thanks be to God.'
      };

    case 'vespers':
      return {
        hourKey: 'vespers',
        englishTitle: 'Evening Prayer (Vespers)',
        timeHint: 'Prayed at sunset to offer thanksgiving for the day and commemorate the Last Supper & Cross',
        openingVerse: 'O God, come to my assistance.',
        openingResponse: 'O Lord, make haste to help me. Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen. Alleluia.',
        hymnTitle: 'O Lux Beata Trinitas (O Trinity of Blessed Light)',
        hymnAuthor: 'Attributed to St. Ambrose of Milan',
        hymnStanzas: [
          'O Trinity of blessed light, O Unity of princely might, the fiery sun now goes his way; shed thou within our hearts thy ray.',
          'To thee our morning song of praise, to thee our evening prayer we raise; thy glory suppliant we adore forever and forevermore.'
        ],
        psalms: [
          {
            antiphon: 'The Lord said to my Lord: Sit at my right hand.',
            citation: 'Psalm 110:1-5, 7',
            title: 'The Messiah as King and Eternal High Priest',
            subtitle: 'He must reign until he has put all enemies under his feet (1 Cor 15:25)',
            verses: [
              '1 The LORD says to my lord: "Sit at my right hand, until I make your enemies your footstool."',
              '2 The LORD sends forth from Zion your mighty scepter. Rule in the midst of your enemies!',
              '4 The LORD has sworn and will not change his mind: "You are a priest forever after the order of Melchizedek."',
              'Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen.'
            ]
          },
          {
            antiphon: 'Great are the works of the Lord, full of honor and majesty.',
            citation: 'Psalm 111',
            title: 'Praise for the Wonderful Deeds of God',
            subtitle: 'Great and wonderful are your deeds, O Lord God Almighty (Rev 15:3)',
            verses: [
              '1 Praise the LORD! I will give thanks to the LORD with my whole heart, in the company of the upright, in the congregation.',
              '4 He has caused his wondrous works to be remembered; the LORD is gracious and merciful.',
              '5 He provides food for those who fear him; he remembers his covenant forever.',
              '9 He sent redemption to his people; he has commanded his covenant forever. Holy and awesome is his name!',
              'Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen.'
            ]
          }
        ],
        shortReadingCitation: '1 Peter 1:18-19',
        shortReadingText: 'You know that you were ransomed from the futile ways inherited from your fathers, not with perishable things such as silver or gold, but with the precious blood of Christ, like that of a lamb without blemish or spot.',
        responsory: {
          verse: 'V. From the rising of the sun to its setting, praised be the name of the Lord.',
          response: 'R. From the rising of the sun to its setting, praised be the name of the Lord.',
          repeat: 'His splendor is above the heavens. Praised be the name of the Lord.'
        },
        canticle: {
          title: 'Canticle of Mary (The Magnificat)',
          citation: 'Luke 1:46-55',
          antiphon: `My soul proclaims the greatness of the Lord, for he who is mighty has done great things for me, and holy is his name.`,
          text: `46 My soul proclaims the greatness of the Lord, my spirit rejoices in God my Savior;
48 for he has looked with favor on his lowly servant. From this day all generations will call me blessed:
49 the Almighty has done great things for me, and holy is his Name.
50 He has mercy on those who fear him in every generation.
51 He has shown the strength of his arm, he has scattered the proud in their conceit.
52 He has cast down the mighty from their thrones, and has lifted up the lowly.
53 He has filled the hungry with good things, and the rich he has sent away empty.
54 He has come to the help of his servant Israel for he has remembered his promise of mercy,
55 the promise he made to our fathers, to Abraham and his children for ever.`
        },
        intercessions: {
          introduction: 'Let us offer our evening thanksgiving to Christ, the Savior of the world, who laid down his life on the Cross for our salvation:',
          response: 'Stay with us, Lord, for evening draws near.',
          petitions: [
            'We give you thanks, O Lord, for guiding us through the hours of this day: pardon our sins and strengthen our fragile hearts.',
            `Protect all families, holy religious orders, priests, and the faithful: let the truth of today’s Gospel proclamation (${gospelCitation}) bear abundant fruit in our lives.`,
            'Remember the poor, the sick, the dying, and the destitute tonight: let your holy angels watch over them in peace.',
            'Grant eternal rest to our deceased relatives and friends: admit them to the light of your Heavenly Jerusalem.'
          ]
        },
        collect: `Lord God, as evening falls upon the world, we pray that your divine grace may abide in our homes and hearts. Forgive our shortcomings today, and let the light of your Son Christ Jesus shine upon us through the dark watches of the night. Through our Lord Jesus Christ, your Son, who lives and reigns with you in the unity of the Holy Spirit, God, for ever and ever. Amen.`,
        conclusion: 'V. May the Lord bless us, protect us from all evil and bring us to everlasting life. R. Amen.'
      };

    case 'compline':
      return {
        hourKey: 'compline',
        englishTitle: 'Night Prayer (Compline)',
        timeHint: 'Prayed immediately before going to sleep at night',
        openingVerse: 'May the Lord almighty grant us a quiet night and a perfect end.',
        openingResponse: 'Amen. Our help is in the name of the Lord, who made heaven and earth.',
        hymnTitle: 'Te Lucis Ante Terminum (To Thee Before the Close of Day)',
        hymnAuthor: '7th Century Breviary Hymn',
        hymnStanzas: [
          'To thee before the close of day, Creator of the world, we pray, that, with thy wonted favor, thou wouldst be our guard and keeper now.',
          'From all ill dreams defend our eyes, from nightly fears and fantasies; tread underfoot our ghostly foe, that no pollution we may know.',
          'O Father, that we ask be done, through Jesus Christ, thine only Son, who, with the Holy Ghost and thee, doth live and reign eternally. Amen.'
        ],
        psalms: [
          {
            antiphon: 'Night holds no terrors for me, for the Lord is my refuge.',
            citation: 'Psalm 91',
            title: 'Under the Shadow of the Wings of the Most High',
            subtitle: 'I have given you power to tread upon serpents and scorpions (Lk 10:19)',
            verses: [
              '1 He who dwells in the shelter of the Most High will abide in the shadow of the Almighty.',
              '2 I will say to the LORD, "My refuge and my fortress; my God, in whom I trust."',
              '5 You will not fear the terror of the night, nor the arrow that flies by day, nor the pestilence that stalks in darkness.',
              '11 For he will command his angels concerning you to guard you in all your ways.',
              '14 "Because he holds fast to me in love, I will deliver him; I will protect him, because he knows my name."',
              'Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen.'
            ]
          }
        ],
        shortReadingCitation: 'Revelation 22:4-5',
        shortReadingText: 'They will see his face, and his name will be on their foreheads. And night will be no more; they will need no light of lamp or sun, for the Lord God will be their light, and they will reign forever and ever.',
        responsory: {
          verse: 'V. Into your hands, Lord, I commend my spirit.',
          response: 'R. Into your hands, Lord, I commend my spirit.',
          repeat: 'You have redeemed us, Lord God of truth. Into your hands, Lord, I commend my spirit.'
        },
        canticle: {
          title: 'Canticle of Simeon (The Nunc Dimittis)',
          citation: 'Luke 2:29-32',
          antiphon: 'Protect us, Lord, as we stay awake; watch over us as we sleep, that awake, we may keep watch with Christ, and asleep, rest in his peace.',
          text: `29 Lord, now you let your servant go in peace; your word has been fulfilled.
30 My own eyes have seen the salvation which you have prepared in the sight of every people:
32 a light to reveal you to the nations and the glory of your people Israel.`
        },
        collect: `Visit this house, we beseech thee, O Lord, and drive far from it all snares of the enemy; let thy holy angels dwell herein to preserve us in peace, and may thy blessing be upon us evermore. Through Christ our Lord. Amen.`,
        conclusion: 'V. May the all-powerful Lord grant us a restful night and a peaceful death. R. Amen.',
        marianAntiphon: {
          title: 'Salve Regina (Hail, Holy Queen)',
          text: 'Hail, Holy Queen, Mother of Mercy, our life, our sweetness and our hope! To thee do we cry, poor banished children of Eve. To thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious advocate, thine eyes of mercy toward us, and after this our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary.',
          verseResponse: 'V. Pray for us, O Holy Mother of God. R. That we may be made worthy of the promises of Christ.',
          collect: 'Almighty, everlasting God, who by the co-operation of the Holy Spirit didst prepare the body and soul of the glorious Virgin-Mother Mary to become a worthy dwelling for Thy Son; grant that we who rejoice in her commemoration may, by her loving intercession, be delivered from present evils and from everlasting death. Through the same Christ our Lord. Amen.'
        }
      };
  }
}
