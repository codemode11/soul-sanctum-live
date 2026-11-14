import { MassReading } from '../types';
import { getMassReadingsForDate } from './massReadings';
import { getSaintForDate } from './saints';

export type OfficeHourKey = 'invitatory' | 'readings' | 'lauds' | 'daytime' | 'vespers' | 'compline';
export type DaytimeSubHourKey = 'terce' | 'sext' | 'none';
export type DaytimePsalmodyMode = 'current' | 'complementary';

export interface PsalmEntry {
  antiphon: string;
  citation: string;
  title: string;
  subtitle?: string; // Christological psalm caption printed in italics (GILH 111, 114)
  verses: string[];
  isSectioned?: boolean; // Divided long psalm (GILH 115, 124)
}

export interface ExaminationOfConscienceData {
  rubricNote: string;
  prompts: string[];
  penitentialAct: string;
  absolutionPrayer: string;
}

export interface VigilExtensionData {
  rubricNote: string;
  canticles: {
    title: string;
    citation: string;
    excerpt: string;
  }[];
  gospelCitation: string;
  gospelText: string;
}

export interface TeDeumData {
  rubricNote: string;
  mainText: string[];
  optionalEndingNote: string;
  optionalEndingLines: string[];
}

export interface DivineOfficeHourData {
  hourKey: OfficeHourKey;
  englishTitle: string;
  latinTitle?: string;
  timeHint: string;
  introSectionLabel: string;
  combiningHoursNote: string;
  openingVerse: string;
  openingResponse: string;
  examinationOfConscience?: ExaminationOfConscienceData;
  hymnTitle: string;
  hymnAuthor?: string;
  hymnStanzas: string[];
  psalmodyModeNote?: string;
  psalms: PsalmEntry[];
  readingSectionLabel: string;
  readingRubricNote?: string;
  shortReadingCitation: string;
  shortReadingText: string;
  longerReadingOption?: {
    citation: string;
    text: string;
    rubricNote: string;
  };
  silenceNote?: string;
  responsory: {
    verse: string;
    response: string;
    repeat: string;
    omissionNote?: string;
  };
  canticle?: {
    title: string;
    citation: string;
    antiphon: string;
    text: string;
  };
  patristicReading?: {
    sectionLabel: string;
    author: string;
    work: string;
    title: string;
    text: string;
    responsory: string;
    rubricNote?: string;
    alternateOption?: {
      label: string;
      author: string;
      work: string;
      title: string;
      text: string;
    };
  };
  vigilExtension?: VigilExtensionData;
  teDeum?: TeDeumData;
  intercessions?: {
    introduction: string;
    response: string;
    petitions: string[];
    methodNote: string;
    shorterForm?: {
      response: string;
      petitions: string[];
    };
  };
  collect: string;
  conclusion: string;
  conclusionOmissionNote?: string;
  marianAntiphon?: {
    title: string;
    text: string;
    verseResponse: string;
    collect: string;
  };
  liturgicalContextNote?: string;
}

export interface DivineOfficeOptions {
  daytimeSubHour?: DaytimeSubHourKey;
  daytimePsalmodyMode?: DaytimePsalmodyMode;
  useComplineSundayPsalms?: boolean;
}

export interface CanonicalHourSchedule {
  key: OfficeHourKey;
  label: string;
  approxTime: string;
}

export const CANONICAL_HOUR_SCHEDULE: Record<OfficeHourKey, CanonicalHourSchedule> = {
  invitatory: { key: 'invitatory', label: 'Invitatory', approxTime: 'Before First Hour' },
  readings: { key: 'readings', label: 'Office of Readings', approxTime: 'Any Hour of Day' },
  lauds: { key: 'lauds', label: 'Morning Prayer', approxTime: 'Start of Day' },
  daytime: { key: 'daytime', label: 'Daytime Prayer', approxTime: 'Terce • Sext • None' },
  vespers: { key: 'vespers', label: 'Evening Prayer', approxTime: 'Close of Day' },
  compline: { key: 'compline', label: 'Night Prayer', approxTime: 'Before Sleep' },
};

export function getIdealDivineOfficeHour(date: Date = new Date()): OfficeHourKey {
  const hour = date.getHours();
  if (hour >= 21 || hour < 3) return 'compline';   // Night / before sleep convenience default
  if (hour >= 3 && hour < 5) return 'readings';    // Pre-dawn convenience default
  if (hour >= 5 && hour < 6) return 'invitatory';  // Early waking convenience default
  if (hour >= 6 && hour < 9) return 'lauds';       // Morning convenience default
  if (hour >= 9 && hour < 17) return 'daytime';    // Daytime convenience default
  return 'vespers';                                // Evening convenience default
}

export function getDaytimeSubHourKey(date: Date = new Date()): DaytimeSubHourKey {
  const mins = date.getHours() * 60 + date.getMinutes();
  if (mins < 11 * 60 + 30) return 'terce';
  if (mins < 14 * 60 + 30) return 'sext';
  return 'none';
}

export function getDaytimeSubHourLabel(date: Date = new Date()): string {
  const key = getDaytimeSubHourKey(date);
  if (key === 'terce') return 'Terce (Mid-Morning)';
  if (key === 'sext') return 'Sext (Midday)';
  return 'None (Mid-Afternoon)';
}

const COMPLEMENTARY_GRADUAL_PSALMS: Record<DaytimeSubHourKey, PsalmEntry[]> = {
  terce: [
    {
      antiphon: 'I called to the Lord in my distress, and he answered me.',
      citation: 'Psalm 120 (Gradual Psalm 1)',
      title: 'A Cry for Deliverance and Peace',
      subtitle: 'Blessed are the peacemakers, for they shall be called children of God (Mt 5:9)',
      verses: [
        '1 To the LORD in my distress I cried, and he answered me.',
        '2 "O LORD, deliver me from lying lip, from a treacherous tongue."',
        '5 Woe is me that I sojourn in Meshech, that I dwell among the tents of Kedar!',
        '7 I am for peace; but when I speak, they are for war!',
        'Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen.'
      ]
    },
    {
      antiphon: 'The Lord will guard your coming and your going, now and forever.',
      citation: 'Psalm 121 (Gradual Psalm 2)',
      title: 'The Lord Is the Guardian of His People',
      subtitle: 'They will never hunger or thirst again; neither sun nor scorching heat will strike them (Rev 7:16)',
      verses: [
        '1 I lift up my eyes to the hills. From where does my help come? My help comes from the LORD, who made heaven and earth.',
        '3 He will not let your foot be moved; he who keeps you will not slumber.',
        '7 The LORD will keep you from all evil; he will keep your life.',
        '8 The LORD will keep your going out and your coming in from this time forth and forevermore.',
        'Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen.'
      ]
    },
    {
      antiphon: 'I rejoiced when they said to me: Let us go to the house of the Lord.',
      citation: 'Psalm 122 (Gradual Psalm 3)',
      title: 'The Joy of Pilgrims Entering Jerusalem',
      subtitle: 'You have come to Mount Zion and to the city of the living God, the heavenly Jerusalem (Heb 12:22)',
      verses: [
        '1 I was glad when they said to me, "Let us go to the house of the LORD!"',
        '2 Our feet have been standing within your gates, O Jerusalem!',
        '6 Pray for the peace of Jerusalem! "May they be secure who love you!"',
        '9 For the sake of the house of the LORD our God, I will seek your good.',
        'Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen.'
      ]
    }
  ],
  sext: [
    {
      antiphon: 'To you I lift up my eyes, O you who are enthroned in the heavens.',
      citation: 'Psalm 123 (Gradual Psalm 4)',
      title: 'A Prayer of Trusting Expectation',
      subtitle: 'Father, forgive them, for they know not what they do (Lk 23:34)',
      verses: [
        '1 To you I lift up my eyes, O you who are enthroned in the heavens!',
        '2 Behold, as the eyes of servants look to the hand of their master, so our eyes look to the LORD our God, till he has mercy upon us.',
        '3 Have mercy upon us, O LORD, have mercy upon us, for we have had more than enough of contempt.',
        'Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen.'
      ]
    },
    {
      antiphon: 'Our help is in the name of the Lord, who made heaven and earth.',
      citation: 'Psalm 124 (Gradual Psalm 5)',
      title: 'Thanksgiving for Rescue from Mortal Peril',
      subtitle: 'If God is for us, who can be against us? (Rom 8:31)',
      verses: [
        '1 If it had not been the LORD who was on our side—let Israel now say—when people rose up against us, then they would have swallowed us up alive.',
        '6 Blessed be the LORD, who has not given us as prey to their teeth!',
        '7 We have escaped like a bird from the snare of the fowlers; the snare is broken, and we have escaped!',
        '8 Our help is in the name of the LORD, who made heaven and earth.',
        'Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen.'
      ]
    },
    {
      antiphon: 'As the mountains surround Jerusalem, so the Lord surrounds his people.',
      citation: 'Psalm 125 (Gradual Psalm 6)',
      title: 'The Security of Those Who Trust in God',
      subtitle: 'Peace upon the Israel of God (Gal 6:16)',
      verses: [
        '1 Those who trust in the LORD are like Mount Zion, which cannot be moved, but abides forever.',
        '2 As the mountains surround Jerusalem, so the LORD surrounds his people, from this time forth and forevermore.',
        '4 Do good, O LORD, to those who are good, and to those who are upright in their hearts!',
        '5 Peace be upon Israel!',
        'Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen.'
      ]
    }
  ],
  none: [
    {
      antiphon: 'The Lord has done great things for us; we are filled with joy.',
      citation: 'Psalm 126 (Gradual Psalm 7)',
      title: 'Harvest of Joy After Tears of Exile',
      subtitle: 'Unless a grain of wheat falls into the earth and dies, it bears much fruit (Jn 12:24)',
      verses: [
        '1 When the LORD restored the fortunes of Zion, we were like those who dream. Then our mouth was filled with laughter, and our tongue with shouts of joy.',
        '3 The LORD has done great things for us; we are glad.',
        '5 Those who sow in tears shall reap with shouts of joy! He who goes out weeping, bearing the seed for sowing, shall come home with shouts of joy, bringing his sheaves with him.',
        'Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen.'
      ]
    },
    {
      antiphon: 'Unless the Lord builds the house, those who build it labor in vain.',
      citation: 'Psalm 127 (Gradual Psalm 8)',
      title: 'Human Effort Depends Wholly on God',
      subtitle: 'Apart from me you can do nothing (Jn 15:5)',
      verses: [
        '1 Unless the LORD builds the house, those who build it labor in vain. Unless the LORD watches over the city, the watchman stays awake in vain.',
        '2 It is in vain that you rise up early and go late to rest, eating the bread of anxious toil; for he gives to his beloved sleep.',
        '3 Behold, children are a heritage from the LORD, the fruit of the womb a reward.',
        'Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen.'
      ]
    },
    {
      antiphon: 'Blessed are all who fear the Lord, who walk in his ways.',
      citation: 'Psalm 128 (Gradual Psalm 9)',
      title: 'Blessings of the God-Fearing Household',
      subtitle: 'Peace to you from God our Father and the Lord Jesus Christ (Eph 1:2)',
      verses: [
        '1 Blessed is everyone who fears the LORD, who walks in his ways!',
        '2 You shall eat the fruit of the labor of your hands; you shall be blessed, and it shall be well with you.',
        '5 The LORD bless you from Zion! May you see the prosperity of Jerusalem all the days of your life! Peace be upon Israel!',
        'Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen.'
      ]
    }
  ]
};

const CURRENT_DAYTIME_PSALMS: Record<DaytimeSubHourKey, PsalmEntry[]> = {
  terce: [
    {
      antiphon: 'Lord, keep my steps firm in your paths.',
      citation: 'Psalm 119:33-40 (He — Section V)',
      title: 'Prayer for Wisdom and Fidelity to God\'s Law',
      subtitle: 'If you love me, keep my commandments (Jn 14:15)',
      isSectioned: true,
      verses: [
        '33 Teach me, O LORD, the way of your statutes, and I will keep it to the end.',
        '34 Give me understanding, that I may keep your law and observe it with my whole heart.',
        '36 Incline my heart to your testimonies, and not to selfish gain!',
        '37 Turn my eyes from looking at worthless things; and give me life in your ways.',
        'Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen.'
      ]
    },
    {
      antiphon: 'Let my cry come before you, O Lord; give me understanding according to your word.',
      citation: 'Psalm 25:1-10',
      title: 'Prayer for Guidance and Pardon',
      subtitle: 'Show me your ways, O Lord, and teach me your paths',
      verses: [
        '1 To you, O LORD, I lift up my soul. O my God, in you I trust.',
        '4 Make me to know your ways, O LORD; teach me your paths. Lead me in your truth and teach me, for you are the God of my salvation.',
        '6 Remember your mercy, O LORD, and your steadfast love, for they have been from of old.',
        '10 All the paths of the LORD are steadfast love and faithfulness, for those who keep his covenant and his testimonies.',
        'Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen.'
      ]
    },
    {
      antiphon: 'God is our refuge and strength, a very present help in trouble.',
      citation: 'Psalm 46',
      title: 'The Almighty Lord Is With Us',
      subtitle: 'They shall call his name Emmanuel, which means God with us (Mt 1:23)',
      verses: [
        '1 God is our refuge and strength, a very present help in trouble. Therefore we will not fear though the earth gives way.',
        '4 There is a river whose streams make glad the city of God, the holy habitation of the Most High.',
        '10 "Be still, and know that I am God. I will be exalted among the nations, I will be exalted in the earth!"',
        '11 The LORD of hosts is with us; the God of Jacob is our fortress.',
        'Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen.'
      ]
    }
  ],
  sext: [
    {
      antiphon: 'With my whole heart I seek you; let me not stray from your commandments.',
      citation: 'Psalm 119:41-48 (Waw — Section VI)',
      title: 'Delight in the Saving Word of God',
      subtitle: 'I am not ashamed of the Gospel: it is the power of God for salvation (Rom 1:16)',
      isSectioned: true,
      verses: [
        '41 Let your steadfast love come to me, O LORD, your salvation according to your promise.',
        '44 I will keep your law continually, forever and ever, and I shall walk in a wide place, for I have sought your precepts.',
        '47 I find my delight in your commandments, which I love.',
        'Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen.'
      ]
    },
    {
      antiphon: 'The Lord is my shepherd; there is nothing I shall want.',
      citation: 'Psalm 23',
      title: 'The Good Shepherd Who Guides and Nourishes',
      subtitle: 'I am the Good Shepherd; I know my sheep and mine know me (Jn 10:14)',
      verses: [
        '1 The LORD is my shepherd; I shall not want. He makes me lie down in green pastures. He leads me beside still waters.',
        '4 Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me.',
        '5 You prepare a table before me in the presence of my enemies; you anoint my head with oil; my cup overflows.',
        '6 Surely goodness and mercy shall follow me all the days of my life, and I shall dwell in the house of the LORD forever.',
        'Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen.'
      ]
    },
    {
      antiphon: 'Keep me safe, O God, for in you I take refuge.',
      citation: 'Psalm 62:2-9',
      title: 'Silent Trust in God Alone',
      subtitle: 'Come to me, all who labor and are heavy laden, and I will give you rest (Mt 11:28)',
      verses: [
        '2 For God alone my soul waits in silence; from him comes my salvation. He alone is my rock and my salvation.',
        '7 On God rests my salvation and my glory; my mighty rock, my refuge is God.',
        '8 Trust in him at all times, O people; pour out your heart before him; God is a refuge for us.',
        'Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen.'
      ]
    }
  ],
  none: [
    {
      antiphon: 'Seven times a day I praise you for your righteous decrees.',
      citation: 'Psalm 119:49-56 (Zayin — Section VII)',
      title: 'Hope and Consolation in God\'s Promise',
      subtitle: 'Your word is truth; sanctify them in the truth (Jn 17:17)',
      isSectioned: true,
      verses: [
        '49 Remember your word to your servant, in which you have made me hope.',
        '50 This is my comfort in my affliction, that your promise gives me life.',
        '54 Your statutes have been my songs in the house of my sojourning.',
        'Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen.'
      ]
    },
    {
      antiphon: 'The Lord is near to all who call upon him in truth.',
      citation: 'Psalm 34:2-10',
      title: 'Taste and See the Goodness of the Lord',
      subtitle: 'Blessed are those who are invited to the wedding feast of the Lamb (Rev 19:9)',
      verses: [
        '2 I will bless the LORD at all times; his praise shall continually be in my mouth.',
        '5 I sought the LORD, and he answered me and delivered me from all my fears.',
        '9 Oh, taste and see that the LORD is good! Blessed is the man who takes refuge in him!',
        'Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen.'
      ]
    },
    {
      antiphon: 'Wait for the Lord; be strong, and let your heart take courage.',
      citation: 'Psalm 27:1, 4, 13-14',
      title: 'Confidence in the Light and Salvation of God',
      subtitle: 'I am the light of the world; whoever follows me will not walk in darkness (Jn 8:12)',
      verses: [
        '1 The LORD is my light and my salvation; whom shall I fear? The LORD is the stronghold of my life; of whom shall I be afraid?',
        '4 One thing have I asked of the LORD, that will I seek after: that I may dwell in the house of the LORD all the days of my life.',
        '14 Wait for the LORD; be strong, and let your heart take courage; wait for the LORD!',
        'Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen.'
      ]
    }
  ]
};

function getComplinePsalmsForDate(dayOfWeek: number, useSundayPsalms: boolean): {
  psalms: PsalmEntry[];
  modeNote: string;
} {
  const saturdayNightPsalms: PsalmEntry[] = [
    {
      antiphon: 'Have mercy on me, Lord, and hear my prayer.',
      citation: 'Psalm 4 (After Evening Prayer I of Sunday)',
      title: 'Confidence in the Peace of God Before Rest',
      subtitle: 'In the evening of life, trust wholly in the mercy of Christ (GILH 88)',
      verses: [
        '2 Answer me when I call, O God of my righteousness! You have given me relief when I was in distress. Be gracious to me and hear my prayer!',
        '4 Know that the LORD has set apart the godly for himself; the LORD hears when I call to him.',
        '7 You have put more joy in my heart than they have when their grain and wine abound.',
        '8 In peace I will both lie down and sleep; for you alone, O LORD, make me dwell in safety.',
        'Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen.'
      ]
    },
    {
      antiphon: 'In the silent hours of night, bless the Lord.',
      citation: 'Psalm 134 (After Evening Prayer I of Sunday)',
      title: 'Evening Watch in the Sanctuary of the Lord',
      subtitle: 'Pray without ceasing; lift up holy hands in blessing (1 Thess 5:17)',
      verses: [
        '1 Come, bless the LORD, all you servants of the LORD, who stand by night in the house of the LORD!',
        '2 Lift up your hands to the holy place and bless the LORD!',
        '3 May the LORD bless you from Zion, he who made heaven and earth!',
        'Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen.'
      ]
    }
  ];

  const sundayNightPsalms: PsalmEntry[] = [
    {
      antiphon: 'Night holds no terrors for me, for the Lord is my refuge.',
      citation: 'Psalm 91 (After Evening Prayer II of Sunday)',
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
  ];

  if (dayOfWeek === 6) {
    return {
      psalms: saturdayNightPsalms,
      modeNote: 'After Evening Prayer I of Sunday (Saturday Night): Psalm 4 and Psalm 134 (GILH 88).'
    };
  }

  if (dayOfWeek === 0 || useSundayPsalms) {
    return {
      psalms: sundayNightPsalms,
      modeNote: dayOfWeek === 0
        ? 'After Evening Prayer II of Sunday (Sunday Night): Psalm 91 (GILH 88).'
        : 'Using Sunday Night Psalm 91 from memory, expressly permitted on any day of the week (GILH 88).'
    };
  }

  // Monday (1) to Friday (5): Proper weekday confidence psalms (GILH 88)
  const weekdayMap: Record<number, PsalmEntry[]> = {
    1: [
      {
        antiphon: 'O Lord, my God, you are merciful and gracious, slow to anger and abounding in steadfast love.',
        citation: 'Psalm 86 (Monday Night)',
        title: 'A Prayer of Humility and Confidence in the Lord',
        subtitle: 'Blessed be the God and Father of mercies and all consolation (2 Cor 1:3)',
        verses: [
          '1 Incline your ear, O LORD, and answer me, for I am poor and needy.',
          '5 For you, O Lord, are good and forgiving, abounding in steadfast love to all who call upon you.',
          '11 Teach me your way, O LORD, that I may walk in your truth; unite my heart to fear your name.',
          '15 But you, O Lord, are a God merciful and gracious, slow to anger and abounding in steadfast love and faithfulness.',
          'Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen.'
        ]
      }
    ],
    2: [
      {
        antiphon: 'Do not hide your face from me, O Lord, for in you I put my trust.',
        citation: 'Psalm 143:1-11 (Tuesday Night)',
        title: 'Prayer in Nighttime Trial and Hope at Dawn',
        subtitle: 'No one is justified by works of the law, but through faith in Jesus Christ (Gal 2:16)',
        verses: [
          '1 Hear my prayer, O LORD; give ear to my pleas for mercy! In your faithfulness answer me, in your righteousness!',
          '6 I stretch out my hands to you; my soul thirsts for you like a parched land.',
          '8 Let me hear in the morning of your steadfast love, for in you I trust. Make me know the way I should go, for to you I lift up my soul.',
          '10 Teach me to do your will, for you are my God! Let your good Spirit lead me on level ground!',
          'Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen.'
        ]
      }
    ],
    3: [
      {
        antiphon: 'Be a rock of refuge for me, O Lord; into your hands I commend my spirit.',
        citation: 'Psalm 31:2-6 (Wednesday Night — I)',
        title: 'Abandonment into the Father\'s Hands',
        subtitle: 'Father, into your hands I commend my spirit (Lk 23:46)',
        verses: [
          '2 In you, O LORD, do I take refuge; let me never be put to shame; in your righteousness deliver me!',
          '3 Incline your ear to me; rescue me speedily! Be a rock of refuge for me, a strong fortress to save me!',
          '6 Into your hand I commit my spirit; you have redeemed me, O LORD, faithful God.',
          'Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen.'
        ]
      },
      {
        antiphon: 'Out of the depths I cry to you, O Lord.',
        citation: 'Psalm 130 (Wednesday Night — II)',
        title: 'De Profundis: Waiting Upon Plentiful Redemption',
        subtitle: 'He will save his people from their sins (Mt 1:21)',
        verses: [
          '1 Out of the depths I cry to you, O LORD! O Lord, hear my voice!',
          '5 I wait for the LORD, my soul waits, and in his word I hope; my soul waits for the Lord more than watchmen for the morning.',
          '7 O Israel, hope in the LORD! For with the LORD there is steadfast love, and with him is plentiful redemption.',
          'Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen.'
        ]
      }
    ],
    4: [
      {
        antiphon: 'In you, my body shall rest in hope.',
        citation: 'Psalm 16 (Thursday Night)',
        title: 'Christ\'s Victory Over Death and Peaceful Rest',
        subtitle: 'God raised up Jesus, having loosed the pangs of death (Acts 2:24)',
        verses: [
          '1 Preserve me, O God, for in you I take refuge. I say to the LORD, "You are my Lord; I have no good apart from you."',
          '5 The LORD is my chosen portion and my cup; you hold my lot.',
          '9 Therefore my heart is glad, and my whole being rejoices; my flesh also dwells secure.',
          '11 You make known to me the path of life; in your presence there is fullness of joy; at your right hand are pleasures forevermore.',
          'Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen.'
        ]
      }
    ],
    5: [
      {
        antiphon: 'By day and by night I cry to you, O Lord.',
        citation: 'Psalm 88 (Friday Night)',
        title: 'The Soul in Gethsemane Watching With Christ',
        subtitle: 'In the days of his flesh, Jesus offered up prayers with loud cries and tears (Heb 5:7)',
        verses: [
          '1 O LORD, God of my salvation, I cry out day and night before you.',
          '2 Let my prayer come before you; incline your ear to my cry!',
          '9 Every day I call upon you, O LORD; I spread out my hands to you.',
          '13 But I, O LORD, cry to you; in the morning my prayer comes before you.',
          'Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen.'
        ]
      }
    ]
  };

  return {
    psalms: weekdayMap[dayOfWeek] || sundayNightPsalms,
    modeNote: 'Weekday Night Prayer psalmody of confidence in the Lord; you may also switch to Sunday Psalm 91 for recitation from memory (GILH 88).'
  };
}

export interface GilhQaGuideItem {
  id: string;
  category: 'Schedule & Hours' | 'Readings & Vigils' | 'Psalms & Singing' | 'Intercessions, Silence & Structure' | 'Adaptations, Votives & Omissions';
  gilhRef: string;
  question: string;
  answer: string;
}

export const GILH_QA_ITEMS: GilhQaGuideItem[] = [
  {
    id: 'gilh-0',
    category: 'Schedule & Hours',
    gilhRef: 'GILH 11, 29, 58–59, 84',
    question: 'When should the Hours be said? Are specific clock times prescribed?',
    answer: 'No specific clock times are prescribed. While some guides suggest traditional times for each Hour, the General Instruction of the Liturgy of the Hours carefully avoids specifying any particular schedule. If you prefer to recite a specific Hour at the same time each day, you are completely free to do so as a personal choice—there is no intrinsic significance to the clock in this context.'
  },
  {
    id: 'gilh-1',
    category: 'Schedule & Hours',
    gilhRef: 'GILH 58–59',
    question: 'When is the Office of Readings to be celebrated?',
    answer: 'The Office of Readings may be recited at any hour of the day (59). It may also be celebrated as a night office of praise, either very early in the morning before Morning Prayer or during the night hours of the previous day after Evening Prayer has been said (58–59); maintaining its character as a night office is commended.'
  },
  {
    id: 'gilh-2',
    category: 'Readings & Vigils',
    gilhRef: 'GILH 66–67',
    question: 'From where are the readings for the Office of Readings taken?',
    answer: 'The First Reading is normally taken from the Proper of Seasons (or from the Proper or Common on solemnities and feasts). On solemnities and feasts of saints, a proper Second Reading is used, or one from the Common of Saints; on memorials of saints when not impeded, the reading connected with the saint replaces the current Second Reading.'
  },
  {
    id: 'gilh-3',
    category: 'Readings & Vigils',
    gilhRef: 'GILH 248',
    question: 'Can I choose a different First Reading for the Office of Readings?',
    answer: 'During Ordinary Time, for a good reason (such as retreats, pastoral gatherings, or prayers for Christian unity), readings from other days or other suitable biblical texts may be chosen. When continuous reading is interrupted by a solemnity, feast, or special celebration, omitted parts may be combined or preferred texts selected within the same week.'
  },
  {
    id: 'gilh-4',
    category: 'Readings & Vigils',
    gilhRef: 'GILH 250',
    question: 'Can I choose a different Second Reading for the Office of Readings?',
    answer: 'With good reason, another reading from the same season may be chosen in place of the appointed Second Reading. On weekdays in Ordinary Time—and when opportune in Advent, Christmas, Lent, and Easter—a semicontinuous reading of a work by a Father of the Church in harmony with the liturgical context may be chosen.'
  },
  {
    id: 'gilh-5',
    category: 'Readings & Vigils',
    gilhRef: 'GILH 71, 73',
    question: 'How can the Office of Readings be extended with a Vigil?',
    answer: 'On Sundays, solemnities (preeminently Christmas and Pentecost), feasts, and pilgrimages, the Office of Readings proceeds as usual through the two readings; before the Te Deum, three Old Testament canticles from the appendix are added, followed by the Gospel (from the Lectionary on solemnities/feasts or the paschal mystery series on Sundays) and an optional homily, then the Te Deum and Prayer.'
  },
  {
    id: 'gilh-6',
    category: 'Readings & Vigils',
    gilhRef: 'GILH 45–46, 248',
    question: 'Can a longer Scripture reading and a homily be used at Morning and Evening Prayer?',
    answer: 'Yes. Especially in celebration with a congregation, retreats, or pastoral gatherings, a longer Scripture reading may be chosen from the Office of Readings or the Lectionary for Mass in place of the short reading. A short homily or a period of silence is also permitted after the reading.'
  },
  {
    id: 'gilh-7',
    category: 'Intercessions, Silence & Structure',
    gilhRef: 'GILH 188–193',
    question: 'How are the intercessions at Morning and Evening Prayer prayed?',
    answer: 'They may be adapted for congregation, small community, or private recitation: introduced by a brief invitation designating a single response, either with both parts of an intention spoken before the uniform response/silent pause or with the assembly completing the second part. Particular personal intentions may be added, and shorter forms from the appendix may replace the longer ones at Evening Prayer.'
  },
  {
    id: 'gilh-8',
    category: 'Psalms & Singing',
    gilhRef: 'GILH 81–83',
    question: 'Which psalms are used for the daytime hours (Terce, Sext, None)?',
    answer: 'Two psalmodies are provided: the Current Psalmody (three psalms or sections) and the Complementary Psalmody (three sets of three psalms, normally from the Gradual Psalms 120–128). Those praying one Daytime Hour use the Current Psalmody; those praying more than one use Current Psalmody at one hour and Complementary Psalmody at the others (also used on solemnities, the Easter Triduum, and Easter Octave).'
  },
  {
    id: 'gilh-9',
    category: 'Schedule & Hours',
    gilhRef: 'GILH 84, 86',
    question: 'When is Night Prayer celebrated, and is there an Examination of Conscience?',
    answer: 'Night Prayer (Compline) is the last prayer of the day, said before retiring, even after midnight. An Examination of Conscience before the hymn is a laudable practice—observed in silence or through a penitential act based on the Roman Missal formularies.'
  },
  {
    id: 'gilh-10',
    category: 'Psalms & Singing',
    gilhRef: 'GILH 88',
    question: 'Which psalms are used for Night Prayer?',
    answer: 'After Evening Prayer I of Sunday (Saturday night), Psalms 4 and 134 are used; after Evening Prayer II of Sunday (Sunday night), Psalm 91 is used. On other days, psalms of confidence in the Lord are appointed, though the Sunday psalms may always be used instead—especially for praying Night Prayer from memory.'
  },
  {
    id: 'gilh-11',
    category: 'Schedule & Hours',
    gilhRef: 'GILH 60, 93–99',
    question: 'Can any of the Hours be combined with Mass or other Hours?',
    answer: 'Yes. Morning, Daytime, or Evening Prayer can be combined with Mass (Daytime or Evening Prayer may follow directly after the Prayer after Communion). The Office of Readings can also be prayed immediately before another Hour, especially Morning Prayer; in that case, the closing prayer and acclamation of the Office of Readings and the introduction to the next Hour are omitted.'
  },
  {
    id: 'gilh-12',
    category: 'Psalms & Singing',
    gilhRef: 'GILH 111–125',
    question: 'How are the psalms said or sung?',
    answer: 'Always begin with the psalm\'s own antiphon, then pray or sing directly (all together), antiphonally (two alternating choirs/sections), or responsorially (fitting for Dan 3), concluding with Glory to the Father and optional repetition of the antiphon (or after each strophe, which is the norm for sung Invitatory Psalm 95).'
  },
  {
    id: 'gilh-13',
    category: 'Psalms & Singing',
    gilhRef: 'GILH 111, 114',
    question: 'What is the purpose of the italicized captions under each Psalm number?',
    answer: 'Drawn from the New Testament or the Church Fathers, these Christological captions help us pray the psalms in light of Christ and their personal spiritual meaning. When the Office of Ordinary Time is recited (not sung), the captions may even be used in place of the proper antiphons.'
  },
  {
    id: 'gilh-14',
    category: 'Psalms & Singing',
    gilhRef: 'GILH 115, 124',
    question: 'Why is a long psalm divided into several sections?',
    answer: 'Dividing long psalms (such as Psalm 119) provides an antiphon for each section for variety when sung and deeper meditation on the psalm\'s riches. However, it remains permissible to pray the entire psalm without interruption using only the first antiphon.'
  },
  {
    id: 'gilh-15',
    category: 'Psalms & Singing',
    gilhRef: 'GILH 247',
    question: 'Must a parish praying Sunday Evening Prayer use that week\'s proper psalms?',
    answer: 'Sunday psalms of a different week may be substituted—or, in offices celebrated with a congregation, other well-chosen psalms that gradually lead the faithful into understanding the Psalter.'
  },
  {
    id: 'gilh-16',
    category: 'Intercessions, Silence & Structure',
    gilhRef: 'GILH 194–196',
    question: 'How is the Lord\'s Prayer prayed in the Divine Office?',
    answer: 'After the intercessions at Morning Prayer and Evening Prayer—matching its solemn threefold daily placement at Mass, Lauds, and Vespers—all pray the Lord\'s Prayer together after a brief invitation when opportune.'
  },
  {
    id: 'gilh-17',
    category: 'Intercessions, Silence & Structure',
    gilhRef: 'GILH 201–203',
    question: 'Is there a place for silence in the Liturgy of the Hours?',
    answer: 'Yes. Prudent intervals of sacred silence may follow the psalm antiphon repetition or follow the reading/homily (before or after the responsory), avoiding awkward or overly long pauses. In private recitation there is greater freedom to pause and meditate on any moving verse.'
  },
  {
    id: 'gilh-18',
    category: 'Adaptations, Votives & Omissions',
    gilhRef: 'GILH 242',
    question: 'If a cleric or religious prays with a community using a different calendar or psalter, is their obligation fulfilled?',
    answer: 'Yes. When joining an Office celebrated in common according to a rite or calendar different from their own, those bound to the Divine Office fulfill their obligation for the part of the Office at which they are present.'
  },
  {
    id: 'gilh-19',
    category: 'Adaptations, Votives & Omissions',
    gilhRef: 'GILH 240, 245',
    question: 'Are votive offices and Saturday memorials of Our Lady permitted?',
    answer: 'Yes. Except on solemnities, Sundays of Advent/Lent/Easter, Ash Wednesday, Holy Week, Easter Octave, and November 2, a votive office may be celebrated in whole or part for a public cause or devotion (e.g., pilgrimage or local feast). On Saturdays in Ordinary Time when optional memorials are allowed, an optional memorial of the Blessed Virgin Mary may be celebrated.'
  },
  {
    id: 'gilh-20',
    category: 'Adaptations, Votives & Omissions',
    gilhRef: 'GILH / Office for the Dead',
    question: 'When is the Office for the Dead used?',
    answer: 'It is the proper Office on All Souls\' Day (November 2). Outside November 2, following the norms of Masses for the Dead, it may be celebrated upon news of a death, on the day of a funeral or final burial, on anniversaries, or as a votive office for the faithful departed.'
  },
  {
    id: 'gilh-21',
    category: 'Adaptations, Votives & Omissions',
    gilhRef: 'GILH 251–252',
    question: 'When may readings, prayers, or psalms be exchanged?',
    answer: 'Readings, prayers, hymns, and intercessions from one weekday of a season may be used on another weekday of the same season, and for pastoral or spiritual advantage the psalms of one day may be replaced with those of the same hour from another day.'
  },
  {
    id: 'gilh-22',
    category: 'Adaptations, Votives & Omissions',
    gilhRef: 'GILH 35, 41, 68–69, 79, 171',
    question: 'What elements may be omitted in the Hours?',
    answer: 'When the Invitatory immediately precedes Morning Prayer or Office of Readings, "God, come to my assistance" and "Glory to the Father" are omitted at the start of the Hour (41); the Invitatory itself may also be omitted before Morning Prayer (35). At Morning/Evening Prayer, the responsory may be omitted (49), and when not sung the full reprise is optional (171). The final section of the Te Deum ("Save your people, Lord..." to the end) may be omitted (68), and "Let us praise the Lord. And give him thanks" may be omitted in private recitation of the Office of Readings and Daytime Prayer (69, 79).'
  }
];

/**
 * Returns complete, authentic Liturgy of the Hours texts for the specified date and hour,
 * faithfully aligned with the General Instruction of the Liturgy of the Hours (GILH).
 */
export function getDivineOfficeHour(
  dateStr?: string,
  hourKey: OfficeHourKey = getIdealDivineOfficeHour(),
  options: DivineOfficeOptions = {}
): DivineOfficeHourData {
  const effectiveDate = dateStr || '2026-11-13';
  const reading: MassReading = getMassReadingsForDate(effectiveDate);

  const dateParts = effectiveDate.split('-');
  const yearNum = parseInt(dateParts[0], 10) || 2026;
  const monthNum = parseInt(dateParts[1], 10) || 11;
  const dayNum = parseInt(dateParts[2], 10) || 13;
  const parsedDate = new Date(yearNum, monthNum - 1, dayNum);
  const dayOfWeek = parsedDate.getDay(); // 0 = Sun, 6 = Sat

  const saint = getSaintForDate(monthNum, dayNum);
  const gospelCitation = reading.gospel.citation || 'Holy Gospel';
  const liturgicalDay = reading.liturgicalDay || 'Weekday in Ordinary Time';
  const liturgicalRank = reading.liturgicalRank || 'Weekday';
  const isLent = reading.liturgicalSeason.toLowerCase().includes('lent');
  const isTeDeumEligible =
    (!isLent && dayOfWeek === 0) ||
    liturgicalRank === 'Solemnity' ||
    liturgicalRank === 'Feast';
  const isVigilEligible =
    dayOfWeek === 0 ||
    liturgicalRank === 'Solemnity' ||
    liturgicalRank === 'Feast';
  const isSaturdayOrdinaryTime =
    dayOfWeek === 6 && reading.liturgicalSeason.toLowerCase().includes('ordinary');
  const isSaintMemorialOrFeast =
    liturgicalRank === 'Memorial' ||
    liturgicalRank === 'Optional Memorial' ||
    liturgicalRank === 'Feast' ||
    liturgicalRank === 'Solemnity';

  const saturdayBvmNote = isSaturdayOrdinaryTime
    ? 'Saturday in Ordinary Time: Where no obligatory memorial impedes it, an Optional Memorial of the Blessed Virgin Mary may be celebrated (GILH 240); Saturday night begins Evening Prayer I of Sunday.'
    : undefined;

  switch (hourKey) {
    case 'invitatory':
      return {
        hourKey: 'invitatory',
        englishTitle: 'Invitatory Prayer',
        timeHint: 'Opening call to praise before the first Hour of the day — no clock time is prescribed (GILH 34–41)',
        introSectionLabel: 'Invitatory Opening',
        combiningHoursNote: 'When the Invitatory serves as the prelude to Morning Prayer or Office of Readings, omit "O God, come to my assistance" and "Glory to the Father" at the beginning of that Hour (GILH 41); the Invitatory may also be omitted before Morning Prayer (GILH 35).',
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
            antiphon: `Come, let us worship Christ the Lord, who speaks to us in the Holy Gospel (${liturgicalDay}).`,
            citation: 'Psalm 95 (Concluding Strophe & Doxology)',
            title: 'Call to Praise the Lord and Sovereign God',
            subtitle: 'Encourage one another every day, as long as it is called "Today" (Heb 3:13)',
            verses: [
              'Forty years I was wearied of that generation, and I said: "Their hearts are always astray, they do not know my ways." So I swore in my anger: "They shall not enter my rest."',
              'Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen.'
            ]
          }
        ],
        readingSectionLabel: 'Invitatory Scripture Verse',
        shortReadingCitation: 'Hebrews 3:7-8',
        shortReadingText: 'Today, if you hear his voice, do not harden your hearts as in the rebellion, on the day of testing in the wilderness.',
        responsory: {
          verse: 'V. Hear the word of the Lord, O nations.',
          response: 'R. Proclaim it to the ends of the earth.',
          repeat: 'Proclaim it to the ends of the earth.',
          omissionNote: 'Repeat the antiphon after each strophe when sung; in private recitation it suffices at the beginning and end of Psalm 95 (GILH 35, 123).'
        },
        collect: `Almighty and ever-living God, grant that our hearts may always be attentive to your divine voice, so that, responding in faith to the Holy Gospel proclaimed today in ${liturgicalDay}, we may enter into your eternal rest. Through Christ our Lord. Amen.`,
        conclusion: 'V. May the Lord bless us, protect us from all evil and bring us to everlasting life. R. Amen.',
        liturgicalContextNote: saturdayBvmNote
      };

    case 'readings': {
      const patristicAuthor = reading.reflection?.author || 'St. Augustine of Hippo';
      const patristicTitle = reading.reflection?.title || 'The Living Voice of the Gospel Proclaimed in the Church';
      const patristicText = reading.reflection?.content || 'Notice how the harmony of today’s liturgy—uniting the Sacred Scripture proclamation with the prayer of the Universal Church—prepares the soul to pass from the shadow of the old Adam into the radiant light of the Risen Christ.';

      const secondReading = isSaintMemorialOrFeast
        ? {
            sectionLabel: `Second Reading — Proper of ${liturgicalRank}: ${saint.name} (GILH 67)`,
            author: saint.name,
            work: saint.butlerReference || `Roman Martyrology & Hagiographical Reading (${saint.feastDate})`,
            title: `${saint.name} — ${saint.title}`,
            text: `${saint.biography}\n\nSpiritual Maxim: "${saint.quote.text}"${saint.quote.source ? ` (${saint.quote.source})` : ''}`,
            responsory: `R. Pray for us, ${saint.name}. V. That we may be made worthy of the promises of Christ.`,
            rubricNote: 'On solemnities and feasts of saints, a proper Second Reading or one from the Common of Saints is used; on unimpeded memorials, the reading of the saint replaces the current Second Reading (GILH 67).',
            alternateOption: {
              label: 'Patristic Alternative (GILH 250)',
              author: patristicAuthor,
              work: 'Expositio in Evangelium & Sermones Patrum',
              title: patristicTitle,
              text: patristicText
            }
          }
        : {
            sectionLabel: `Second Reading — Ecclesiastical & Patristic (${patristicAuthor})`,
            author: patristicAuthor,
            work: 'Expositio in Evangelium & Sermones Patrum',
            title: patristicTitle,
            text: patristicText,
            responsory: 'R. Lord, to whom shall we go? You have the words of eternal life. V. We have come to believe and know that you are the Holy One of God.',
            rubricNote: 'For good reason, another reading from the same season—or on weekdays a semicontinuous reading from a Father of the Church—may be chosen (GILH 250).',
            alternateOption: {
              label: `Commemoration of ${saint.name} (${saint.feastDate})`,
              author: saint.name,
              work: saint.butlerReference || `Roman Martyrology (${saint.feastDate})`,
              title: `${saint.name} — ${saint.title}`,
              text: `${saint.biography}\n\n"${saint.quote.text}"`
            }
          };

      return {
        hourKey: 'readings',
        englishTitle: 'Office of Readings',
        timeHint: 'May be recited at any hour of the day, or as a night office after Evening Prayer / before Morning Prayer (GILH 58–59)',
        introSectionLabel: 'Introduction',
        combiningHoursNote: 'If prayed immediately before Morning Prayer or another Hour, omit the closing prayer and acclamation of this Office and omit the introduction of the following Hour (GILH 60).',
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
              '2 His holy mountain, beautiful in elevation, is the joy of all the earth.',
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
        readingSectionLabel: 'First Reading — Sacred Scripture',
        readingRubricNote: 'Normally taken from the Proper of Seasons (or Proper/Common on solemnities and feasts). During Ordinary Time or retreats, suitable alternate or combined biblical readings may be chosen (GILH 66, 248).',
        shortReadingCitation: reading.firstReading.citation,
        shortReadingText: reading.firstReading.text,
        silenceNote: 'Pause briefly in sacred silence after the readings or responsories for meditation (GILH 201–203).',
        responsory: {
          verse: 'V. Your word is a lamp for my feet, O Lord.',
          response: 'R. And a light for my path.',
          repeat: 'And a light for my path.'
        },
        patristicReading: secondReading,
        vigilExtension: {
          rubricNote: isVigilEligible
            ? `Today (${liturgicalDay}) may be extended with a Vigil: after the Second Reading and before the Te Deum, add the three Vigil Canticles and proclaim the Gospel (GILH 71, 73).`
            : 'On Sundays, solemnities (preeminently Christmas and Pentecost), feasts, and pilgrimages, the Office of Readings may be extended with a Vigil after the two readings (GILH 71, 73).',
          canticles: [
            {
              title: 'Canticle I — Song of Isaiah on the Eternal City',
              citation: 'Isaiah 66:10-14',
              excerpt: 'Rejoice with Jerusalem, and be glad for her, all you who love her... For thus says the LORD: "Behold, I will extend peace to her like a river, and the glory of the nations like an overflowing stream."'
            },
            {
              title: 'Canticle II — Prayer of Jeremiah in Hope',
              citation: 'Jeremiah 14:17-21',
              excerpt: 'Do not spurn us, for your name\'s sake; do not dishonor your glorious throne; remember and do not break your covenant with us!'
            },
            {
              title: 'Canticle III — Promise of the New Heart',
              citation: 'Ezekiel 36:24-28',
              excerpt: 'I will sprinkle clean water upon you, and you shall be clean from all your uncleannesses... And I will give you a new heart, and a new spirit I will put within you.'
            }
          ],
          gospelCitation: gospelCitation,
          gospelText: reading.gospel.text
        },
        teDeum: {
          rubricNote: isTeDeumEligible
            ? `Said or sung today (${liturgicalDay}) before the Concluding Collect (GILH 68).`
            : 'Prescribed on Sundays (outside Lent), Solemnities, and Feasts before the Concluding Collect (GILH 68).',
          mainText: [
            'You are God: we praise you; You are the Lord: we acclaim you; You are the eternal Father: all creation worships you.',
            'To you all angels, all the powers of heaven, Cherubim and Seraphim, sing in endless praise: Holy, holy, holy Lord, God of power and might, heaven and earth are full of your glory.',
            'The glorious company of apostles praise you. The noble fellowship of prophets praise you. The white-robed army of martyrs praise you. Throughout the world the holy Church acclaims you: Father, of majesty unbounded, your true and only Son, worthy of all worship, and the Holy Spirit, advocate and guide.',
            'You, Christ, are the king of glory, the eternal Son of the Father. When you became man to set us free you did not spurn the Virgin\'s womb. You overcame the sting of death and opened the kingdom of heaven to all believers. You are seated at God\'s right hand in glory. We believe that you will come and be our judge.',
            'Come then, Lord, and help your people, bought with the price of your own blood, and bring us with your saints to glory everlasting.'
          ],
          optionalEndingNote: 'Optional ending — from "Save your people, Lord" to the end may be omitted (GILH 68):',
          optionalEndingLines: [
            'Save your people, Lord, and bless your inheritance. Govern and uphold them now and always.',
            'Day by day we bless you. We praise your name for ever.',
            'Keep us today, Lord, from all sin. Have mercy on us, Lord, have mercy.',
            'Lord, show us your love and mercy; for we put our trust in you.',
            'In you, Lord, is our hope: and we shall never hope in vain.'
          ]
        },
        collect: `O God, who in the mystery of the Liturgy of the Hours draw your Bride the Church into unceasing communion with the Trinity, grant that as we meditate upon your holy Word today, we may grow in wisdom and holiness. Through our Lord Jesus Christ, your Son, who lives and reigns with you in the unity of the Holy Spirit, God, for ever and ever. Amen.`,
        conclusion: 'V. Let us praise the Lord. R. Thanks be to God.',
        conclusionOmissionNote: 'In private recitation, "Let us praise the Lord. Thanks be to God." may be omitted (GILH 69); omit prayer and acclamation if immediately followed by Morning Prayer (GILH 60).',
        liturgicalContextNote: saturdayBvmNote
      };
    }

    case 'lauds':
    default:
      return {
        hourKey: 'lauds',
        englishTitle: 'Morning Prayer (Lauds)',
        timeHint: 'Morning prayer consecrating the start of the day to the Risen Christ — no clock time is prescribed (GILH 37–54)',
        introSectionLabel: 'Introduction',
        combiningHoursNote: 'If immediately preceded by the Invitatory or Office of Readings, omit "O God, come to my assistance" and "Glory to the Father" (GILH 41, 60). Morning Prayer may also be combined with Mass (GILH 93–95).',
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
        readingSectionLabel: 'Short Scripture Reading',
        shortReadingCitation: '2 Thessalonians 3:10b, 13',
        shortReadingText: 'If anyone is not willing to work, let him not eat. As for you, brothers and sisters, do not grow weary in doing good.',
        longerReadingOption: {
          citation: reading.firstReading.citation,
          text: reading.firstReading.text,
          rubricNote: 'In celebration with a congregation, retreats, or pastoral gatherings, a longer Scripture reading from the Lectionary for Mass or Office of Readings—followed by a short homily or silence—may be used (GILH 45–46, 248).'
        },
        silenceNote: 'A short reflection or a moment of sacred silence may follow the reading (GILH 45, 201–203).',
        responsory: {
          verse: 'V. The Lord is my strength and my song; he has become my salvation.',
          response: 'R. The Lord is my strength and my song; he has become my salvation.',
          repeat: 'Glory to the Father, and to the Son, and to the Holy Spirit. The Lord is my strength and my song.',
          omissionNote: 'The responsory may be omitted (GILH 49), and when not sung the repetition of the whole responsory is optional (GILH 171).'
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
          ],
          methodNote: 'In common, the leader invites the people and announces the single response; each intention may be prayed in full before the response, or split into two parts completed by the assembly. Personal intentions may be added (GILH 188–193).'
        },
        collect: `Almighty God, who in your infinite love grant us to begin this new day praising your holy Name, grant that as we hear your word proclaimed in ${liturgicalDay}, we may walk before you in righteousness and purity of heart. Through our Lord Jesus Christ, your Son, who lives and reigns with you in the unity of the Holy Spirit, God, for ever and ever. Amen.`,
        conclusion: 'V. The Lord be with you. R. And with your spirit. V. May almighty God bless you, the Father, and the Son, and the Holy Spirit. R. Amen. (Or in private recitation: May the Lord bless us, protect us from all evil and bring us to everlasting life. R. Amen.)',
        liturgicalContextNote: saturdayBvmNote
      };

    case 'daytime': {
      const subHour: DaytimeSubHourKey = options.daytimeSubHour || getDaytimeSubHourKey(new Date());
      const useComplementary =
        options.daytimePsalmodyMode === 'complementary' ||
        liturgicalRank === 'Solemnity';

      const subHourMeta: Record<DaytimeSubHourKey, {
        title: string;
        hymnTitle: string;
        hymnStanzas: string[];
        citation: string;
        readingText: string;
        respV: string;
        respR: string;
        collect: string;
      }> = {
        terce: {
          title: 'Daytime Prayer — Mid-Morning (Terce)',
          hymnTitle: 'Nunc, Sancte, Nobis, Spiritus (Come, Holy Ghost, Who Ever One)',
          hymnStanzas: [
            'Come, Holy Ghost, who ever One art with the Father and the Son; come, Holy Ghost, our souls possess with thy full flood of holiness.',
            'In will and deed, by heart and tongue, with all our powers, thy praise be sung; and love light up our mortal frame, till others catch the living flame.'
          ],
          citation: '1 John 4:16b',
          readingText: 'God is love, and whoever abides in love abides in God, and God abides in him.',
          respV: 'V. Direct my steps according to your word, O Lord.',
          respR: 'R. And let no iniquity gain dominion over me.',
          collect: 'Almighty, eternal God, at this third hour you poured out your Holy Spirit upon the Apostles; grant that the same Spirit of truth and charity may sanctify our work and strengthen our witness today. Through Christ our Lord. Amen.'
        },
        sext: {
          title: 'Daytime Prayer — Midday (Sext)',
          hymnTitle: 'Rector Potens, Verax Deus (O God of Truth, O Lord of Might)',
          hymnStanzas: [
            'O God of truth, O Lord of might, who orderest time and change aright, arraying morn with golden gleams, and kindling noonday\'s fiery beams.',
            'Extinguish thou each sinful fire, and banish every ill desire; and while thou keepest the body whole, shed forth thy peace upon the soul.'
          ],
          citation: 'Romans 12:1-2',
          readingText: 'I appeal to you therefore, brethren, by the mercies of God, to present your bodies as a living sacrifice, holy and acceptable to God, which is your spiritual worship. Do not be conformed to this world, but be transformed by the renewal of your mind.',
          respV: 'V. The Lord is my shepherd, I shall not want.',
          respR: 'R. He makes me lie down in green pastures.',
          collect: 'Lord God, heavenly King, at this midday hour when your blessed Son hung upon the Cross for our redemption, grant that his sacred Passion may sanctify our daily labors and protect us from every temptation. Through Christ our Lord. Amen.'
        },
        none: {
          title: 'Daytime Prayer — Mid-Afternoon (None)',
          hymnTitle: 'Rerum, Deus, Tenax Vigor (O God, Creation\'s Secret Force)',
          hymnStanzas: [
            'O God, creation\'s secret force, yourself unmoved, all motion\'s source, who guide the day from morning light through all its changes to the night.',
            'Grant us a holy death, we pray, a life that fades not with the day, but brings at last, for cloudless peace, a heavenly bliss that shall not cease.'
          ],
          citation: '1 Peter 1:18-19',
          readingText: 'You know that you were ransomed from the futile ways inherited from your fathers, not with perishable things such as silver or gold, but with the precious blood of Christ, like that of a lamb without blemish or spot.',
          respV: 'V. You have redeemed us, O Lord, by your blood.',
          respR: 'R. And made us a kingdom for our God.',
          collect: 'Lord Jesus Christ, at the ninth hour you commended your spirit to the Father and opened paradise to the repentant thief; hear our afternoon prayer and keep us ever faithful to the hour of our passing. Who live and reign for ever and ever. Amen.'
        }
      };

      const activeMeta = subHourMeta[subHour];
      const psalms = useComplementary
        ? COMPLEMENTARY_GRADUAL_PSALMS[subHour]
        : CURRENT_DAYTIME_PSALMS[subHour];

      return {
        hourKey: 'daytime',
        englishTitle: activeMeta.title,
        timeHint: 'Mid-morning (Terce), midday (Sext), or mid-afternoon (None) — no fixed clock hour is prescribed (GILH 74–83)',
        introSectionLabel: 'Introduction',
        combiningHoursNote: 'Daytime Prayer may be combined with Mass or celebrated directly after the Prayer after Communion (GILH 93–98).',
        openingVerse: 'O God, come to my assistance.',
        openingResponse: 'O Lord, make haste to help me. Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen. Alleluia.',
        hymnTitle: activeMeta.hymnTitle,
        hymnAuthor: 'Attributed to St. Ambrose of Milan (4th Century)',
        hymnStanzas: activeMeta.hymnStanzas,
        psalmodyModeNote: useComplementary
          ? 'Complementary Psalmody (Gradual Psalms — 3 psalms): prescribed on solemnities, Easter Triduum, Easter Octave, and when praying more than one Daytime Hour (GILH 81–83).'
          : 'Current Psalmody (3 psalm selections): prescribed for those praying one Daytime Hour; switch to Complementary Psalmody if praying additional Daytime Hours (GILH 81–83).',
        psalms,
        readingSectionLabel: 'Short Reading',
        shortReadingCitation: activeMeta.citation,
        shortReadingText: activeMeta.readingText,
        silenceNote: 'Pause briefly in silent prayer before concluding (GILH 201–203).',
        responsory: {
          verse: activeMeta.respV,
          response: activeMeta.respR,
          repeat: activeMeta.respR.replace(/^R\.\s*/, '')
        },
        collect: activeMeta.collect,
        conclusion: 'V. Let us praise the Lord. R. Thanks be to God.',
        conclusionOmissionNote: 'In private recitation, "Let us praise the Lord. Thanks be to God." may be omitted (GILH 79).',
        liturgicalContextNote: saturdayBvmNote
      };
    }

    case 'vespers':
      return {
        hourKey: 'vespers',
        englishTitle: 'Evening Prayer (Vespers)',
        timeHint: 'Evening thanksgiving at the close of the day — no fixed clock hour is prescribed (GILH 37–54)',
        introSectionLabel: 'Introduction',
        combiningHoursNote: 'Evening Prayer may be combined with Mass or prayed directly after the Prayer after Communion (GILH 93–98). On Saturdays and eve of Solemnities, Evening Prayer I celebrates the coming Sunday or Solemnity.',
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
        readingSectionLabel: 'Short Scripture Reading',
        shortReadingCitation: '1 Peter 1:18-19',
        shortReadingText: 'You know that you were ransomed from the futile ways inherited from your fathers, not with perishable things such as silver or gold, but with the precious blood of Christ, like that of a lamb without blemish or spot.',
        longerReadingOption: {
          citation: reading.firstReading.citation,
          text: reading.firstReading.text,
          rubricNote: 'Especially in celebration with a congregation, retreats, or pastoral gatherings, a longer Scripture reading from the Lectionary for Mass or Office of Readings—followed by a short homily or silence—may be chosen (GILH 45–46, 248).'
        },
        silenceNote: 'A short reflection or a moment of sacred silence may follow the reading (GILH 45, 201–203).',
        responsory: {
          verse: 'V. From the rising of the sun to its setting, praised be the name of the Lord.',
          response: 'R. From the rising of the sun to its setting, praised be the name of the Lord.',
          repeat: 'His splendor is above the heavens. Praised be the name of the Lord.',
          omissionNote: 'The responsory may be omitted (GILH 49), and when not sung the full reprise is optional (GILH 171).'
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
          ],
          methodNote: 'Intercessions may be adapted for congregation, small community, or private prayer, and particular intentions may be added (GILH 188–193). Shorter forms from the appendix may also replace the longer Evening Prayer petitions.',
          shorterForm: {
            response: 'Lord, hear our prayer.',
            petitions: [
              'For the Church and all her shepherds: Lord, sustain your flock.',
              'For peace among nations and justice for the poor: Lord, bring healing.',
              'For our families, our community, and all in distress: Lord, watch over us.',
              'For the faithful departed: Lord, grant them eternal light.'
            ]
          }
        },
        collect: `Lord God, as evening falls upon the world, we pray that your divine grace may abide in our homes and hearts. Forgive our shortcomings today, and let the light of your Son Christ Jesus shine upon us through the dark watches of the night. Through our Lord Jesus Christ, your Son, who lives and reigns with you in the unity of the Holy Spirit, God, for ever and ever. Amen.`,
        conclusion: 'V. May the Lord bless us, protect us from all evil and bring us to everlasting life. R. Amen.',
        liturgicalContextNote: dayOfWeek === 6
          ? 'Saturday Evening: Evening Prayer I of Sunday opens the Lord\'s Day; Night Prayer tonight uses Psalms 4 and 134 (GILH 88).'
          : undefined
      };

    case 'compline': {
      const { psalms, modeNote } = getComplinePsalmsForDate(
        dayOfWeek,
        Boolean(options.useComplineSundayPsalms)
      );
      return {
        hourKey: 'compline',
        englishTitle: 'Night Prayer (Compline)',
        timeHint: 'Last prayer of the day before retiring to sleep, even if after midnight — no clock time is prescribed (GILH 84–92)',
        introSectionLabel: 'Introduction',
        combiningHoursNote: 'Said as the final prayer of the day before rest (GILH 84). Followed immediately by the Examination of Conscience before the Hymn (GILH 86).',
        openingVerse: 'O God, come to my assistance.',
        openingResponse: 'O Lord, make haste to help me. Glory to the Father, and to the Son, and to the Holy Spirit: as it was in the beginning, is now, and will be for ever. Amen. Alleluia.',
        examinationOfConscience: {
          rubricNote: 'It is a laudable practice to have an examination of conscience before the hymn—observed in silence or through a penitential rite based on the formularies in the Roman Missal (GILH 86).',
          prompts: [
            'Pause in silence to thank God for the graces and blessings received throughout this day.',
            'Examine your thoughts, words, deeds, and omissions before the merciful Lord.',
            'Ask forgiveness for any failings and entrust the coming night to Christ.'
          ],
          penitentialAct: 'I confess to almighty God and to you, my brothers and sisters, that I have greatly sinned, in my thoughts and in my words, in what I have done and in what I have failed to do, through my fault, through my fault, through my most grievous fault; therefore I ask blessed Mary ever-Virgin, all the Angels and Saints, and you, my brothers and sisters, to pray for me to the Lord our God.',
          absolutionPrayer: 'May almighty God have mercy on us, forgive us our sins, and bring us to everlasting life. R. Amen.'
        },
        hymnTitle: 'Te Lucis Ante Terminum (To Thee Before the Close of Day)',
        hymnAuthor: '7th Century Breviary Hymn',
        hymnStanzas: [
          'To thee before the close of day, Creator of the world, we pray, that, with thy wonted favor, thou wouldst be our guard and keeper now.',
          'From all ill dreams defend our eyes, from nightly fears and fantasies; tread underfoot our ghostly foe, that no pollution we may know.',
          'O Father, that we ask be done, through Jesus Christ, thine only Son, who, with the Holy Ghost and thee, doth live and reign eternally. Amen.'
        ],
        psalmodyModeNote: modeNote,
        psalms,
        readingSectionLabel: 'Short Scripture Reading',
        shortReadingCitation: 'Revelation 22:4-5',
        shortReadingText: 'They will see his face, and his name will be on their foreheads. And night will be no more; they will need no light of lamp or sun, for the Lord God will be their light, and they will reign forever and ever.',
        silenceNote: 'Pause briefly in tranquil silence before the responsory and Nunc Dimittis (GILH 201–203).',
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
        },
        liturgicalContextNote: dayOfWeek === 6
          ? 'Saturday Night: Night Prayer is prayed after Evening Prayer I of Sunday using Psalms 4 and 134 (GILH 88).'
          : undefined
      };
    }
  }
}
