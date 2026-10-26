import { MassReading } from '../types';
import {
  getLiturgicalDayInfo,
  getLiturgicalCycles,
  getEasterDate,
  getFirstSundayOfAdvent,
  getBaptismOfTheLordDate
} from './liturgicalCalendar';

export const MASS_READINGS_DATABASE: Record<string, MassReading> = {
  // Today: October 16, 2026
  '2026-10-16': {
    id: 'reading-2026-10-16',
    date: '2026-10-16',
    liturgicalDay: 'Friday of the Twenty-Eighth Week in Ordinary Time / Memorial of St. Margaret Mary Alacoque',
    liturgicalSeason: 'Ordinary Time (Year II / Cycle B)',
    liturgicalColor: 'white',
    liturgicalRank: 'Memorial',
    firstReading: {
      citation: 'Ephesians 1:11-14',
      theme: 'We who first hoped in Christ exist for the praise of His glory',
      text: `Brothers and sisters:
In Christ we were also chosen, destined in accord with the purpose of the One who accomplishes all things according to the intention of his will, so that we might exist for the praise of his glory, we who first hoped in Christ.

In him you also, who have heard the word of truth, the gospel of your salvation, and have believed in him, were sealed with the promised holy Spirit, which is the first installment of our inheritance toward redemption as God's possession, to the praise of his glory.`
    },
    responsorialPsalm: {
      citation: 'Psalm 33:1-2, 4-5, 12-13',
      antiphon: 'Blessed the people the Lord has chosen to be his own.',
      verses: [
        'Exult, you just, in the LORD; praise from the upright is fitting. Give thanks to the LORD on the harp; with the ten-stringed lyre chant his praises.',
        'For upright is the word of the LORD, and all his works are trustworthy. He loves justice and right; of the kindness of the LORD the earth is full.',
        'Blessed the nation whose God is the LORD, the people he has chosen for his own inheritance. From heaven the LORD looks down; he sees all mankind.'
      ]
    },
    alleluia: {
      verse: 'May your kindness, O LORD, be upon us who have put our hope in you.'
    },
    gospel: {
      citation: 'Luke 12:1-7',
      text: `At that time:
So many people were crowding together that they were trampling one another underfoot. Jesus began to speak, first to his disciples:

"Beware of the leaven—that is, the hypocrisy—of the Pharisees.

There is nothing concealed that will not be revealed, nor secret that will not be known. Therefore whatever you have said in the darkness will be heard in the light, and what you have whispered behind closed doors will be proclaimed on the housetops.

I tell you, my friends, do not be afraid of those who kill the body but after that can do no more. I shall show you whom to fear: Be afraid of the one who after killing has the power to cast into Gehenna; yes, I tell you, be afraid of that one.

Are not five sparrows sold for two small coins? Yet not one of them has escaped the notice of God. Even the hairs of your head have all been counted. Do not be afraid. You are worth more than many sparrows."`
    },
    reflection: {
      author: 'St. John Chrysostom and Church Tradition',
      title: 'Confidence in Divine Providence and the Sacred Heart',
      content: `Our Lord reminds us that God's loving providence encompasses even the smallest creatures of His creation: "Even the hairs of your head have all been counted." On this feast of St. Margaret Mary Alacoque, the apostle of the Sacred Heart of Jesus, we are called to banish all servile fear and hypocrisy. Christ showed St. Margaret Mary His burning Heart, pierced with love for humanity, begging not for mere external rituals, but for the sincere devotion of our interior souls. Live in the radiant light of truth; you are infinitely cherished by the Father.`
    }
  },

  // October 17, 2026: Memorial of St. Ignatius of Antioch, Bishop and Martyr
  '2026-10-17': {
    id: 'reading-2026-10-17',
    date: '2026-10-17',
    liturgicalDay: 'Memorial of St. Ignatius of Antioch, Bishop and Martyr',
    liturgicalSeason: 'Ordinary Time (Year II)',
    liturgicalColor: 'red',
    liturgicalRank: 'Memorial',
    firstReading: {
      citation: 'Ephesians 1:15-23',
      theme: 'God put all things beneath His feet and gave Him as head over all things to the Church',
      text: `Brothers and sisters:
Hearing of your faith in the Lord Jesus and of your love for all the holy ones, I do not cease giving thanks for you, remembering you in my prayers, that the God of our Lord Jesus Christ, the Father of glory, may give you a spirit of wisdom and revelation resulting in knowledge of him.

May the eyes of your hearts be enlightened, that you may know what is the hope that belongs to his call, what are the riches of glory in his inheritance among the holy ones, and what is the surpassing greatness of his power for us who believe, in accord with the exercise of his great might, which he worked in Christ, raising him from the dead and seating him at his right hand in the heavens.`
    },
    responsorialPsalm: {
      citation: 'Psalm 8:2-3ab, 4-5, 6-7',
      antiphon: 'You have given your Son rule over the works of your hands.',
      verses: [
        'O LORD, our Lord, how glorious is your name over all the earth! You have exalted your majesty above the heavens. Out of the mouths of babes and sucklings you have fashioned praise.',
        'When I behold your heavens, the work of your fingers, the moon and the stars which you set in place—What is man that you should be mindful of him, or the son of man that you should care for him?',
        'You have made him little less than the angels, and crowned him with glory and honor. You have given him rule over the works of your hands, putting all things under his feet.'
      ]
    },
    alleluia: {
      verse: 'The Spirit of truth will testify to me, says the Lord, and you also will testify.'
    },
    gospel: {
      citation: 'Luke 12:8-12',
      text: `Jesus said to his disciples:
"I tell you, everyone who acknowledges me before others the Son of Man will acknowledge before the angels of God. But whoever denies me before others will be denied before the angels of God.

Everyone who speaks a word against the Son of Man will be forgiven, but the one who blasphemes against the holy Spirit will not be forgiven.

When they take you before synagogues and before magistrates and authorities, do not worry about how or what your defense will be or about what you are to say. For the holy Spirit will teach you at that moment what you should say."`
    },
    reflection: {
      author: 'St. Ignatius of Antioch',
      title: 'I am the Wheat of Christ',
      content: `"I am the wheat of Christ, and am ground by the teeth of the wild beasts, that I may be found the pure bread of God." St. Ignatius faced martyrdom in the Roman Colosseum with unbroken joy because his heart was anchored in the Holy Spirit. Christ assures us today that whenever we stand for truth and confess His Holy Name, the Spirit Himself will give us the divine words to speak.`
    }
  },

  // October 18, 2026: Feast of St. Luke the Evangelist
  '2026-10-18': {
    id: 'reading-2026-10-18',
    date: '2026-10-18',
    liturgicalDay: 'Feast of St. Luke the Evangelist',
    liturgicalSeason: 'Ordinary Time',
    liturgicalColor: 'red',
    liturgicalRank: 'Feast',
    firstReading: {
      citation: '2 Timothy 4:10-17b',
      theme: 'Luke is the only one with me',
      text: `Beloved:
Demas, enamored of the present world, deserted me and went to Thessalonica, Crescens to Galatia, and Titus to Dalmatia. Luke is the only one with me. Get Mark and bring him with you, for he is helpful to me in the ministry. I have sent Tychicus to Ephesus.

When you come, bring the cloak I left with Carpus in Troas, the papyrus rolls, and especially the parchments.

At my first defense no one appeared on my behalf, but everyone deserted me. May it not be held against them! But the Lord stood by me and gave me strength, so that through me the proclamation might be completed and all the Gentiles might hear it.`
    },
    responsorialPsalm: {
      citation: 'Psalm 145:10-11, 12-13, 17-18',
      antiphon: 'Your friends make known, O Lord, the glorious splendor of your kingdom.',
      verses: [
        'Let all your works give you thanks, O LORD, and let your faithful ones bless you. Let them speak of the glory of your kingdom and talk of your might.',
        'Making known to men your might and the glorious splendor of your kingdom. Your kingdom is a kingdom for all ages, and your dominion endures through all generations.',
        'The LORD is just in all his ways and holy in all his works. The LORD is near to all who call upon him, to all who call upon him in truth.'
      ]
    },
    alleluia: {
      verse: 'I chose you from the world, to go and bear fruit that will last, says the Lord.'
    },
    gospel: {
      citation: 'Luke 10:1-9',
      text: `The Lord Jesus appointed seventy-two other disciples whom he sent ahead of him in pairs to every town and place he intended to visit.

He said to them, "The harvest is abundant but the laborers are few; so ask the master of the harvest to send out laborers for his harvest. Go on your way; behold, I am sending you like lambs among wolves. Carry no money bag, no sack, no sandals; and greet no one along the way.

Into whatever house you enter, first say, 'Peace to this household.' If a peaceful person lives there, your peace will rest on him; but if not, it will return to you. Stay in the same house and eat and drink what is offered to you, for the laborer deserves his payment. Do not move about from one house to another.

Whatever town you enter and they welcome you, eat what is set before you, cure the sick in it and say to them, 'The Kingdom of God is at hand for you.'"`
    },
    reflection: {
      author: 'St. Jerome',
      title: 'The Physician of Soul and Body',
      content: `St. Luke, native of Antioch and physician, recorded the tender mercy of Jesus toward sinners, the poor, women, and the outcasts. In his Gospel we hear the Parables of the Prodigal Son, the Good Samaritan, and the Pharisee and the Publican. He reminds us that the Kingdom of God is a healing balm for weary hearts.`
    }
  },

  // October 15, 2026: Memorial of St. Teresa of Jesus
  '2026-10-15': {
    id: 'reading-2026-10-15',
    date: '2026-10-15',
    liturgicalDay: 'Memorial of St. Teresa of Jesus (of Ávila), Virgin and Doctor of the Church',
    liturgicalSeason: 'Ordinary Time',
    liturgicalColor: 'white',
    liturgicalRank: 'Memorial',
    firstReading: {
      citation: 'Ephesians 1:1-10',
      theme: 'God chose us in Christ before the foundation of the world',
      text: `Paul, an Apostle of Christ Jesus by the will of God, to the holy ones who are in Ephesus and faithful in Christ Jesus: grace to you and peace from God our Father and the Lord Jesus Christ.

Blessed be the God and Father of our Lord Jesus Christ, who has blessed us in Christ with every spiritual blessing in the heavens, as he chose us in him, before the foundation of the world, to be holy and without blemish before him.

In love he destined us for adoption to himself through Jesus Christ, in accord with the favor of his will, for the praise of the glory of his grace that he granted us in the beloved.`
    },
    responsorialPsalm: {
      citation: 'Psalm 98:1, 2-3ab, 3cd-4, 5-6',
      antiphon: 'The Lord has made known his salvation.',
      verses: [
        'Sing to the LORD a new song, for he has done wondrous deeds; His right hand has won victory for him, his holy arm.',
        'The LORD has made his salvation known: in the sight of the nations he has revealed his justice. He has remembered his kindness and his faithfulness toward the house of Israel.',
        'All the ends of the earth have seen the salvation by our God. Sing joyfully to the LORD, all you lands; break into song; sing praise.'
      ]
    },
    alleluia: {
      verse: 'I am the way, the truth and the life, says the Lord; no one comes to the Father, except through me.'
    },
    gospel: {
      citation: 'Luke 11:47-54',
      text: `The Lord said: "Woe to you who build the memorials of the prophets whom your fathers killed. Consequently, you bear witness and give consent to the deeds of your ancestors, for they killed them and you do the building.

Therefore, the wisdom of God said, 'I will send to them prophets and apostles; some of them they will kill and persecute' in order that this generation might be charged with the blood of all the prophets shed since the foundation of the world, from the blood of Abel to the blood of Zechariah who died between the altar and the temple building. Yes, I tell you, this generation will be charged with their blood!

Woe to you, scholars of the law! You have taken away the key of knowledge. You yourselves did not enter and you stopped those trying to enter."

When Jesus left, the scribes and Pharisees began to act with great hostility toward him and to interrogate him about many things, for they were plotting to catch him at something he might say.`
    },
    reflection: {
      author: 'St. Teresa of Ávila',
      title: 'Let Nothing Disturb Thee',
      content: `"Let nothing disturb you, let nothing frighten you, all things are passing away: God never changes. Patience obtains all things. Whoever has God lacks nothing; God alone suffices." St. Teresa teaches us that interior intimacy with Christ in mental prayer is the fortress that withstands every storm of this life.`
    }
  },

  // October 19, 2026: Monday of the Twenty-Ninth Week in Ordinary Time / Memorial of Saints Jean de Brébeuf and Isaac Jogues
  '2026-10-19': {
    id: 'reading-2026-10-19',
    date: '2026-10-19',
    liturgicalDay: 'Monday of the Twenty-Ninth Week in Ordinary Time / Memorial of Saints Jean de Brébeuf and Isaac Jogues, Priests, and Companions, Martyrs',
    liturgicalSeason: 'Ordinary Time (Year II / Cycle B)',
    liturgicalColor: 'red',
    liturgicalRank: 'Memorial',
    firstReading: {
      citation: 'Ephesians 2:1-10',
      theme: 'God, who is rich in mercy, brought us to life with Christ',
      text: `Brothers and sisters:
You were dead in your transgressions and sins in which you once lived following the age of this world, following the ruler of the power of the air, the spirit that is now at work in the disobedient.

All of us once lived among them in the desires of our flesh, following the wishes of the flesh and the impulses, and we were by nature children of wrath, like the rest.

But God, who is rich in mercy, because of the great love he had for us, even when we were dead in our transgressions, brought us to life with Christ (by grace you have been saved), raised us up with him, and seated us with him in the heavens in Christ Jesus, that in the ages to come he might show the immeasurable riches of his grace in his kindness to us in Christ Jesus.

For by grace you have been saved through faith, and this is not from you; it is the gift of God; it is not from works, so no one may boast. For we are his handiwork, created in Christ Jesus for the good works that God has prepared in advance, that we should live in them.`
    },
    responsorialPsalm: {
      citation: 'Psalm 100:1b-2, 3, 4ab, 4c-5',
      antiphon: 'The Lord made us, we belong to him.',
      verses: [
        'Sing joyfully to the LORD, all you lands; serve the LORD with gladness; come before him with joyful song.',
        'Know that the LORD is God; he made us, his we are; his people, the flock he tends.',
        'Enter his gates with thanksgiving, his courts with praise. Give thanks to him; bless his name, for he is good: the LORD, whose kindness endures forever, and his faithfulness, to all generations.'
      ]
    },
    alleluia: {
      verse: 'Blessed are the poor in spirit; for theirs is the kingdom of heaven.'
    },
    gospel: {
      citation: 'Luke 12:13-21',
      text: `Someone in the crowd said to Jesus, "Teacher, tell my brother to share the inheritance with me."

He replied to him, "Friend, who appointed me as your judge and arbitrator?"

Then he said to the crowd, "Take care to guard against all greed, for though one may be rich, one's life does not consist of possessions."

Then he told them a parable. "There was a rich man whose land produced a bountiful harvest. He asked himself, 'What shall I do, for I do not have space to store my harvest?' And he said, 'This is what I shall do: I shall tear down my barns and build larger ones. There I shall store all my grain and other goods and I shall say to myself, "Now as for you, you have so many good things stored up for many years, rest, eat, drink, be merry!"'

But God said to him, 'You fool, this night your life will be demanded of you; and the things you have prepared, to whom will they belong?'

Thus will it be for the one who stores up treasure for himself but is not rich in what matters to God."`
    },
    reflection: {
      author: 'St. Cyril of Alexandria and Fathers of the Church',
      title: 'Becoming Rich in What Matters to God',
      content: `The tragic folly of the rich man lay not in having fruitful harvests, but in forgetting that his abundance was entrusted to him by God for the relief of the poor. He spoke only to his own belly: "Rest, eat, drink, be merry." But the true barns of the Christian are the hands and mouths of Christ's needy children. Let us store up heavenly treasure through almsgiving, prayer, and interior humility, knowing our lives are held in the tender hands of the Father.`
    }
  },

  // October 20, 2026: Tuesday of the Twenty-Ninth Week in Ordinary Time
  '2026-10-20': {
    id: 'reading-2026-10-20',
    date: '2026-10-20',
    liturgicalDay: 'Tuesday of the Twenty-Ninth Week in Ordinary Time',
    liturgicalSeason: 'Ordinary Time (Year II / Cycle B)',
    liturgicalColor: 'green',
    liturgicalRank: 'Weekday',
    firstReading: {
      citation: 'Ephesians 2:12-22',
      theme: 'Christ is our peace, who made both one',
      text: `Brothers and sisters:
Remember that you were at that time without Christ, alienated from the community of Israel and strangers to the covenants of promise, without hope and without God in the world.

But now in Christ Jesus you who once were far off have become near by the blood of Christ. For he is our peace, he who made both one and broke down the dividing wall of enmity, through his flesh, abolishing the law with its commandments and legal claims, that he might create in himself one new person in place of the two, thus establishing peace, and might reconcile both with God, in one body, through the cross, putting that enmity to death by it.

He came and preached peace to you who were far off and peace to those who were near, for through him we both have access in one Spirit to the Father.

So then you are no longer strangers and sojourners, but you are fellow citizens with the holy ones and members of the household of God, built upon the foundation of the Apostles and prophets, with Christ Jesus himself as the capstone.`
    },
    responsorialPsalm: {
      citation: 'Psalm 85:9ab-10, 11-12, 13-14',
      antiphon: 'The Lord speaks of peace to his people.',
      verses: [
        'I will hear what God proclaims; the LORD—for he proclaims peace to his people. Near indeed is his salvation to those who fear him, glory dwelling in our land.',
        'Kindness and truth shall meet; justice and peace shall kiss. Truth shall spring out of the earth, and justice shall look down from heaven.',
        'The LORD himself will give his benefits; our land shall yield its increase. Justice shall walk before him, and prepare the pathway of his steps.'
      ]
    },
    alleluia: {
      verse: 'Be vigilant at all times and pray that you may have the strength to stand before the Son of Man.'
    },
    gospel: {
      citation: 'Luke 12:35-38',
      text: `Jesus said to his disciples:
"Gird your loins and light your lamps and be like servants who await their master's return from a wedding, ready to open immediately when he comes and knocks.

Blessed are those servants whom the master finds vigilant on his arrival. Amen, I say to you, he will gird himself, have them recline at table, and proceed to wait on them.

And should he come in the second or third watch and find them prepared in this way, blessed are those servants."`
    },
    reflection: {
      author: 'Pope St. Gregory the Great',
      title: 'Girded Loins and Burning Lamps',
      content: `Pope St. Gregory the Great reminds us that to "gird our loins" is to restrain carnal passions with holy purity, while to "light our lamps" is to let our good works shine before others through divine charity. Neither the lamp without the belt nor the belt without the lamp pleases Christ; we are summoned to both purity of life and active generosity of heart. Live in holy anticipation of the Master's knock.`
    }
  },

  // October 21, 2026: Wednesday of the Twenty-Ninth Week in Ordinary Time
  '2026-10-21': {
    id: 'reading-2026-10-21',
    date: '2026-10-21',
    liturgicalDay: 'Wednesday of the Twenty-Ninth Week in Ordinary Time',
    liturgicalSeason: 'Ordinary Time (Year II / Cycle B)',
    liturgicalColor: 'green',
    liturgicalRank: 'Weekday',
    firstReading: {
      citation: 'Ephesians 3:2-12',
      theme: 'The mystery of Christ was made known to me by revelation: the Gentiles are coheirs',
      text: `Brothers and sisters:
You have heard of the stewardship of God's grace that was given to me for your benefit, namely, that the mystery was made known to me by revelation, as I have written briefly earlier. When you read this you can understand my insight into the mystery of Christ, which was not made known to human beings in other generations as it has now been revealed to his holy apostles and prophets by the Spirit, that the Gentiles are coheirs, members of the same body, and copartners in the promise in Christ Jesus through the gospel.

Of this I became a minister by the gift of God's grace that was granted me in accord with the exercise of his power. To me, the very least of all the holy ones, this grace was given, to preach to the Gentiles the inscrutable riches of Christ, and to bring to light for all what is the plan of the mystery hidden from ages past in God who created all things, so that the manifold wisdom of God might now be made known through theiven Church to the principalities and authorities in the heavens, in accord with the eternal purpose that he accomplished in Christ Jesus our Lord, in whom we have boldness of speech and confidence of access through faith in him.`
    },
    responsorialPsalm: {
      citation: 'Isaiah 12:2-3, 4bcd, 5-6',
      antiphon: 'You will draw water joyfully from the springs of salvation.',
      verses: [
        'God indeed is my savior; I am confident and unafraid. My strength and my courage is the LORD, and he has been my savior. With joy you will draw water at the fountain of salvation.',
        'Give thanks to the LORD, acclaim his name; among the nations make known his deeds, proclaim how exalted is his name.',
        'Sing praise to the LORD for his glorious achievement; let this be known throughout all the earth. Shout with exultation, O city of Zion, for great in your midst is the Holy One of Israel!'
      ]
    },
    alleluia: {
      verse: 'Stay awake and be ready! For you do not know on what day your Lord will come.'
    },
    gospel: {
      citation: 'Luke 12:39-48',
      text: `Jesus said to his disciples:
"Be sure of this: if the master of the house had known the hour when the thief was coming, he would not have let his house be broken into. You also must be prepared, for at an hour you do not expect, the Son of Man will come."

Then Peter said, "Lord, is this parable meant for us or for everyone?" And the Lord replied, "Who, then, is the faithful and prudent steward whom the master will put in charge of his servants to distribute the food allowance at the proper time? Blessed is that servant whom his master on arrival finds doing so. Truly, I say to you, he will put him in charge of all his property.

But if that servant says to himself, 'My master is delayed in coming,' and begins to beat the menservants and the maidservants, to eat and drink and get drunk, then that servant's master will come on an unexpected day and at an unknown hour and will punish him severely and assign him a place with the unfaithful.

That servant who knew his master's will but did not make preparations nor act in accord with his will shall be beaten severely; and the servant who was ignorant of his master's will but acted in a way deserving of a severe beating shall be beaten only lightly. Much will be required of the person entrusted with much, and still more will be demanded of the person entrusted with more."`
    },
    reflection: {
      author: 'St. Basil the Great and St. Augustine',
      title: 'The Faithful and Prudent Steward',
      content: `"Much will be required of the person entrusted with much." Every grace we have received—our faith, the Sacraments, our time, and our material goods—has been entrusted to us as stewards of the Divine Master. We prove ourselves faithful stewards when we nourish our brothers and sisters with charity and remain watchful for Christ's coming at every hour.`
    }
  },

  // October 22, 2026: Thursday of the Twenty-Ninth Week in Ordinary Time / Memorial of Pope St. John Paul II
  '2026-10-22': {
    id: 'reading-2026-10-22',
    date: '2026-10-22',
    liturgicalDay: 'Thursday of the Twenty-Ninth Week in Ordinary Time',
    liturgicalSeason: 'Ordinary Time (Year II / Cycle B)',
    liturgicalColor: 'green',
    liturgicalRank: 'Weekday',
    firstReading: {
      citation: 'Ephesians 3:14-21',
      theme: 'Grounded in love, may you be filled with all the fullness of God',
      text: `Brothers and sisters:
I kneel before the Father, from whom every family in heaven and on earth is named, that he may grant you in accord with the riches of his glory to be strengthened with power through his Spirit in the inner self, and that Christ may dwell in your hearts through faith; that you, rooted and grounded in love, may have strength to comprehend with all the holy ones what is the breadth and length and height and depth, and to know the love of Christ that surpasses knowledge, so that you may be filled with all the fullness of God.

Now to him who is able to accomplish far more than all we ask or imagine, by the power at work within us, to him be glory in the Church and in Christ Jesus to all generations, forever and ever. Amen.`
    },
    responsorialPsalm: {
      citation: 'Psalm 33:1-2, 4-5, 11-12, 18-19',
      antiphon: 'The earth is full of the goodness of the Lord.',
      verses: [
        'Exult, you just, in the LORD; praise from the upright is fitting. Give thanks to the LORD on the harp; with the ten-stringed lyre chant his praises.',
        'For upright is the word of the LORD, and all his works are trustworthy. He loves justice and right; of the kindness of the LORD the earth is full.',
        'But the plan of the LORD stands forever; the design of his heart, through all generations. Blessed the nation whose God is the LORD, the people he has chosen for his own inheritance.',
        'But see, the eyes of the LORD are upon those who fear him, upon those who hope for his kindness, to deliver them from death and preserve them in spite of famine.'
      ]
    },
    alleluia: {
      verse: 'I consider all things so much rubbish that I may gain Christ and be found in him.'
    },
    gospel: {
      citation: 'Luke 12:49-53',
      text: `Jesus said to his disciples:
"I have come to set the earth on fire, and how I wish it were already blazing! There is a baptism with which I must be baptized, and how great is my anguish until it is accomplished!

Do you think that I have come to establish peace on the earth? No, I tell you, but rather division. From now on a household of five will be divided, three against two and two against three; a father will be divided against his son and a son against his father, a mother against her daughter and a daughter against her mother, a mother-in-law against her daughter-in-law and a daughter-in-law against her mother-in-law."`
    },
    reflection: {
      author: 'St. Cyril of Alexandria and St. Ambrose',
      title: 'The Sacred Fire of Divine Charity',
      content: `What is the fire that Our Lord Jesus Christ came to cast upon the earth? The Fathers teach that it is the saving flame of the Holy Spirit and divine love, kindled through His Passion ("the baptism with which I must be baptized"). This holy fire burns away worldly lukewarmness and self-love, awakening in the Christian soul a courageous fidelity that puts Christ above every earthly attachment.`
    }
  },

  // October 23, 2026: Friday of the Twenty-Ninth Week in Ordinary Time
  '2026-10-23': {
    id: 'reading-2026-10-23',
    date: '2026-10-23',
    liturgicalDay: 'Friday of the Twenty-Ninth Week in Ordinary Time',
    liturgicalSeason: 'Ordinary Time (Year II / Cycle B)',
    liturgicalColor: 'green',
    liturgicalRank: 'Weekday',
    firstReading: {
      citation: 'Ephesians 4:1-6',
      theme: 'One body and one Spirit, one Lord, one faith, one baptism',
      text: `Brothers and sisters:
I, a prisoner for the Lord, urge you to live in a manner worthy of the call you have received, with all humility and gentleness, with patience, bearing with one another through love, striving to preserve the unity of the spirit through the bond of peace: one body and one Spirit, as you were also called to the one hope of your call; one Lord, one faith, one baptism; one God and Father of all, who is over all and through all and in all.`
    },
    responsorialPsalm: {
      citation: 'Psalm 24:1-2, 3-4ab, 5-6',
      antiphon: 'Lord, this is the people that longs to see your face.',
      verses: [
        'The LORD\'s are the earth and its fullness; the world and those who dwell in it. For he founded it upon the seas and established it upon the rivers.',
        'Who can ascend the mountain of the LORD? Or who may stand in his holy place? He whose hands are sinless, whose heart is clean, who desires not what is vain.',
        'He shall receive a blessing from the LORD, a reward from God his savior. Such is the race that seeks for him, that seeks the face of the God of Jacob.'
      ]
    },
    alleluia: {
      verse: 'Blessed are you, Father, Lord of heaven and earth; you have revealed to little ones the mysteries of the Kingdom.'
    },
    gospel: {
      citation: 'Luke 12:54-59',
      text: `Jesus said to the crowds:
"When you see a cloud rising in the west you say immediately that it is going to rain—and so it does; and when you notice that the wind is blowing from the south you say that it is going to be hot—and so it is. You hypocrites! You know how to interpret the appearance of the earth and the sky; why do you not know how to interpret the present time?

Why do you not judge for yourselves what is right? If you are to go with your opponent before a magistrate, make an effort to settle the matter on the way; otherwise your opponent will turn you over to the judge, and the judge hand you over to the constable, and the constable throw you into prison. I say to you, you will not be released until you have paid the last penny."`
    },
    reflection: {
      author: 'St. Cyril of Alexandria and St. Augustine',
      title: 'Discerning the Present Time of Mercy and Reconciliation',
      content: `Our Lord reproves those who scrutinize the clouds and winds to predict earthly weather, yet remain blind to the "present time" of salvation ushered in by His Incarnation. While we walk upon the road of this mortal life, Christ urges us to be reconciled with God and our neighbor before we reach the tribunal of eternal judgment. Every day is a precious gift of mercy in which charity, humility, and sacramental confession pay off our debts through the grace of the Redeemer.`
    }
  },

  // October 24, 2026: Saturday of the Twenty-Ninth Week in Ordinary Time
  '2026-10-24': {
    id: 'reading-2026-10-24',
    date: '2026-10-24',
    liturgicalDay: 'Saturday of the Twenty-Ninth Week in Ordinary Time',
    liturgicalSeason: 'Ordinary Time (Year II / Cycle B)',
    liturgicalColor: 'green',
    liturgicalRank: 'Weekday',
    firstReading: {
      citation: 'Ephesians 4:7-16',
      theme: 'Living the truth in love, we should grow in every way into Him who is the head, Christ',
      text: `Brothers and sisters:
Grace was given to each of us according to the measure of Christ's gift. Therefore, it says:
He ascended on high and took prisoners captive; he gave gifts to men.
What does "he ascended" mean except that he also descended into the lower regions of the earth? The one who descended is also the one who ascended far above all the heavens, that he might fill all things.

And he gave some as apostles, others as prophets, others as evangelists, others as pastors and teachers, to equip the holy ones for the work of ministry, for building up the body of Christ, until we all attain to the unity of faith and knowledge of the Son of God, to mature manhood, to the extent of the full stature of Christ, so that we may no longer be infants, tossed by waves and swept along by every wind of teaching arising from human trickery, from their cunning in the interests of deceitful scheming.

Rather, living the truth in love, we should grow in every way into him who is the head, Christ, from whom the whole body, joined and held together by every supporting ligament, with the proper functioning of each part, brings about the body's growth and builds itself up in love.`
    },
    responsorialPsalm: {
      citation: 'Psalm 122:1-2, 3-4ab, 4cd-5',
      antiphon: 'Let us go rejoicing to the house of the Lord.',
      verses: [
        'I rejoiced because they said to me, "We will go up to the house of the LORD." And now we have set foot within your gates, O Jerusalem.',
        'Jerusalem, built as a city with compact unity. To it the tribes go up, the tribes of the LORD.',
        'According to the decree for Israel, to give thanks to the name of the LORD. In it are set up judgment seats, seats for the house of David.'
      ]
    },
    alleluia: {
      verse: 'I take no pleasure in the death of the wicked man, says the Lord, but rather in his conversion, that he may live.'
    },
    gospel: {
      citation: 'Luke 13:1-9',
      text: `Some people told Jesus about the Galileans whose blood Pilate had mingled with the blood of their sacrifices. He said to them in reply, "Do you think that because these Galileans suffered in this way they were greater sinners than all other Galileans? By no means! But I tell you, if you do not repent, you will all perish as they did! Or those eighteen people who were killed when the tower at Siloam fell on them—do you think they were more guilty than everyone else who lived in Jerusalem? By no means! But I tell you, if you do not repent, you will all perish as they did!"

And he told them this parable: "There once was a person who had a fig tree planted in his orchard, and when he came in search of fruit on it but found none, he said to the gardener, 'For three years now I have come in search of fruit on this fig tree but have found none. So cut it down. Why should it exhaust the soil?' He said to him in reply, 'Sir, leave it for this year also, and I shall cultivate the ground around it and fertilize it; it may bear fruit in the future. If not you can cut it down.'"`
    },
    reflection: {
      author: 'St. Augustine and Pope St. Gregory the Great',
      title: 'The Merciful Gardener and the Fruit of Repentance',
      content: `In the parable of the barren fig tree, Christ reveals Himself as the merciful Gardener who pleads before the Father on behalf of every human soul: "Leave it for this year also." He digs around our hardened hearts with the spade of compunction and nourishes us with the grace of the Sacraments so that we may bring forth the sweet fruits of repentance and charity.`
    }
  },

  // October 25, 2026: Thirtieth Sunday in Ordinary Time (Cycle B)
  '2026-10-25': {
    id: 'reading-2026-10-25',
    date: '2026-10-25',
    liturgicalDay: 'Thirtieth Sunday in Ordinary Time',
    liturgicalSeason: 'Ordinary Time (Year II / Cycle B)',
    liturgicalColor: 'green',
    liturgicalRank: 'Sunday',
    firstReading: {
      citation: 'Jeremiah 31:7-9',
      theme: 'I will gather the blind and the lame: a great company shall return',
      text: `Thus says the LORD:
Shout with joy for Jacob, exult at the head of the nations; proclaim your praise and say: The LORD has delivered his people, the remnant of Israel.

Behold, I will bring them back from the land of the north; I will gather them from the ends of the world, with the blind and the lame in their midst, the mothers and those with child; they shall return as an immense throng.

They departed in tears, but I will console them and guide them; I will lead them to brooks of water, on a level road, so that none shall stumble. For I am a father to Israel, Ephraim is my first-born.`
    },
    responsorialPsalm: {
      citation: 'Psalm 126:1-2, 2-3, 4-5, 6',
      antiphon: 'The Lord has done great things for us; we are filled with joy.',
      verses: [
        'When the LORD brought back the captives of Zion, we were like men dreaming. Then our mouth was filled with laughter, and our tongue with rejoicing.',
        'Then they said among the nations, "The LORD has done great things for them." The LORD has done great things for us; we are glad indeed.',
        'Restore our fortunes, O LORD, like the torrents in the southern desert. Those that sow in tears shall reap rejoicing.',
        'Although they go forth weeping, carrying the seed to be sown, they shall come back rejoicing, carrying their sheaves.'
      ]
    },
    alleluia: {
      verse: 'Our Savior Jesus Christ destroyed death and brought life to light through the Gospel.'
    },
    gospel: {
      citation: 'Mark 10:46-52',
      text: `As Jesus was leaving Jericho with his disciples and a sizable crowd, Bartimaeus, a blind man, the son of Timaeus, sat by the roadside begging.

On hearing that it was Jesus of Nazareth, he began to cry out and say, "Jesus, son of David, have pity on me." And many rebuked him, telling him to be silent. But he kept calling out all the more, "Son of David, have pity on me."

Jesus stopped and said, "Call him." So they called the blind man, saying to him, "Take courage; get up, Jesus is calling you." He threw aside his cloak, sprang up, and came to Jesus.

Jesus said to him in reply, "What do you want me to do for you?" The blind man replied to him, "Master, I want to see." Jesus told him, "Go your way; your faith has saved you." Immediately he received his sight and followed him on the way.`
    },
    reflection: {
      author: 'St. Augustine',
      title: 'Master, That I May See',
      content: `Bartimaeus cast aside his beggar's cloak, leapt to his feet, and cried out with unyielding faith: "Master, I want to see." St. Augustine observes that we too sit beside the road of this world in need of Christ's illumination. When Christ passes by in the Holy Sacraments, let no worldly distraction silence our plea. He restores our spiritual vision so that we may follow Him on the way of the Cross toward eternal life.`
    }
  },

  // October 26, 2026: Monday of the Thirtieth Week in Ordinary Time
  '2026-10-26': {
    id: 'reading-2026-10-26',
    date: '2026-10-26',
    liturgicalDay: 'Monday of the Thirtieth Week in Ordinary Time',
    liturgicalSeason: 'Ordinary Time (Year II / Cycle B)',
    liturgicalColor: 'green',
    liturgicalRank: 'Weekday',
    firstReading: {
      citation: 'Ephesians 4:32–5:8',
      theme: 'Live in love, as Christ loved us and handed Himself over for us',
      text: `Brothers and sisters:
Be kind to one another, compassionate, forgiving one another as God has forgiven you in Christ.

Be imitators of God, as beloved children, and live in love, as Christ loved us and handed himself over for us as a sacrificial offering to God for a fragrant aroma. Immorality or any impurity or greed must not even be mentioned among you, as is fitting among holy ones, no obscenity or silly or suggestive talk, which is out of place, but instead, thanksgiving.

For you were once darkness, but now you are light in the Lord. Live as children of light.`
    },
    responsorialPsalm: {
      citation: 'Psalm 1:1-2, 3, 4 and 6',
      antiphon: 'Behave like God as his very dear children.',
      verses: [
        'Blessed the man who follows not the counsel of the wicked nor walks in the way of sinners, nor sits in the company of the insolent, but delights in the law of the LORD and meditates on his law day and night.',
        'He is like a tree planted near running water, that yields its fruit in due season, and whose leaves never fade. Whatever he does, prospers.',
        'Not so the wicked, not so; they are like chaff which the wind drives away. For the LORD watches over the way of the just, but the way of the wicked vanishes.'
      ]
    },
    alleluia: {
      verse: 'Your word, O Lord, is truth; consecrate us in the truth.'
    },
    gospel: {
      citation: 'Luke 13:10-17',
      text: `Jesus was teaching in a synagogue on the sabbath. And a woman was there who for eighteen years had been crippled by a spirit; she was bent over, completely incapable of standing erect. When Jesus saw her, he called her forward and said to her, "Woman, you are set free of your infirmity." He laid his hands on her, and she at once stood up straight and glorified God.

But the leader of the synagogue, indignant that Jesus had cured on the sabbath, said to the crowd in reply, "There are six days when work should be done. Come on those days to be cured, not on the sabbath day."

The Lord said to him in reply, "Hypocrites! Does not each one of you on the sabbath untie his ox or his ass from the manger and lead it out for watering? This daughter of Abraham, whom Satan has bound for eighteen years now, ought she not to have been set free on the sabbath day from this bondage?" When he said this, all his adversaries were humiliated; and the whole crowd rejoiced at all the splendid deeds done by him.`
    },
    reflection: {
      author: 'St. Ambrose and St. Augustine',
      title: 'Lifted Upright by the Touch of Christ',
      content: `The woman bent toward the earth for eighteen years is an image of the soul weighed down by earthly cares and spiritual bondage, unable to gaze up toward heaven until Jesus calls her forward and lays His saving hands upon her. On the Lord's Day and in every Eucharist, Christ looses our bonds so that we may stand upright and glorify God.`
    }
  },

  // October 27, 2026: Tuesday of the Thirtieth Week in Ordinary Time
  '2026-10-27': {
    id: 'reading-2026-10-27',
    date: '2026-10-27',
    liturgicalDay: 'Tuesday of the Thirtieth Week in Ordinary Time',
    liturgicalSeason: 'Ordinary Time (Year II / Cycle B)',
    liturgicalColor: 'green',
    liturgicalRank: 'Weekday',
    firstReading: {
      citation: 'Ephesians 5:21-33',
      theme: 'This is a great mystery, but I speak in reference to Christ and the Church',
      text: `Brothers and sisters:
Be subordinate to one another out of reverence for Christ. Wives should be subordinate to their husbands as to the Lord. For the husband is head of his wife just as Christ is head of the Church, he himself the savior of the body.

Husbands, love your wives, even as Christ loved the Church and handed himself over for her to sanctify her, cleansing her by the bath of water with the word, that he might present to himself the Church in splendor, without spot or wrinkle or any such thing, that she might be holy and without blemish.

For this reason a man shall leave his father and his mother and be joined to his wife, and the two shall become one flesh. This is a great mystery, but I speak in reference to Christ and the Church.`
    },
    responsorialPsalm: {
      citation: 'Psalm 128:1-2, 3, 4-5',
      antiphon: 'Blessed are those who fear the Lord.',
      verses: [
        'Blessed are you who fear the LORD, who walk in his ways! For you shall eat the fruit of your handiwork; blessed shall you be, and favored.',
        'Your wife shall be like a fruitful vine in the recesses of your home; your children like olive plants around your table.',
        'Behold, thus is the man blessed who fears the LORD. The LORD bless you from Zion: may you see the prosperity of Jerusalem all the days of your life.'
      ]
    },
    alleluia: {
      verse: 'Blessed are you, Father, Lord of heaven and earth; you have revealed to little ones the mysteries of the Kingdom.'
    },
    gospel: {
      citation: 'Luke 13:18-21',
      text: `Jesus said, "What is the Kingdom of God like? To what can I compare it? It is like a mustard seed that a man took and planted in the garden. When it was fully grown, it became a large bush and the birds of the sky dwelt in its branches."

Again he said, "To what shall I compare the Kingdom of God? It is like yeast that a woman took and mixed in with three measures of wheat flour until the whole batch of dough was leavened."`
    },
    reflection: {
      author: 'St. Hilary of Poitiers and St. Ambrose',
      title: 'The Mustard Seed and the Heavenly Leaven',
      content: `Christ Himself is both the mustard seed buried in the garden of the sepulcher, rising into a cosmic tree that shelters all nations, and the heavenly leaven hidden within our human nature to transform the whole of our lives into the bread of immortality.`
    }
  },

  // October 28, 2026: Feast of Saints Simon and Jude, Apostles
  '2026-10-28': {
    id: 'reading-2026-10-28',
    date: '2026-10-28',
    liturgicalDay: 'Feast of Saints Simon and Jude, Apostles',
    liturgicalSeason: 'Ordinary Time (Year II / Cycle B)',
    liturgicalColor: 'red',
    liturgicalRank: 'Feast',
    firstReading: {
      citation: 'Ephesians 2:19-22',
      theme: 'Built upon the foundation of the Apostles and prophets, with Christ Jesus Himself as the capstone',
      text: `Brothers and sisters:
You are no longer strangers and sojourners, but you are fellow citizens with the holy ones and members of the household of God, built upon the foundation of the Apostles and prophets, with Christ Jesus himself as the capstone. Through him the whole structure is held together and grows into a temple sacred in the Lord; in him you also are being built together into a dwelling place of God in the Spirit.`
    },
    responsorialPsalm: {
      citation: 'Psalm 19:2-3, 4-5',
      antiphon: 'Their message goes out through all the earth.',
      verses: [
        'The heavens declare the glory of God, and the firmament proclaims his handiwork. Day pours out the word to day, and night to night imparts knowledge.',
        'Not a word nor a discourse whose voice is not heard; through all the earth their voice resounds, and to the ends of the world, their message.'
      ]
    },
    alleluia: {
      verse: 'We praise you, O God, we acclaim you as Lord; the glorious company of Apostles praise you.'
    },
    gospel: {
      citation: 'Luke 6:12-16',
      text: `In those days Jesus departed to the mountain to pray, and he spent the night in prayer to God. When day came, he called his disciples to himself, and from them he chose Twelve, whom he also named Apostles: Simon, whom he named Peter, and his brother Andrew, James, John, Philip, Bartholomew, Matthew, Thomas, James the son of Alphaeus, Simon who was called a Zealot, and Judas the son of James, and Judas Iscariot, who became a traitor.`
    },
    reflection: {
      author: 'St. Cyril of Alexandria and The Venerable Bede',
      title: 'Night-Long Prayer and the Apostolic Foundation',
      content: `Before calling the Twelve Apostles upon whom His Church would be built, Jesus spent the entire night in solitary prayer on the mountain. Saints Simon the Zealot and Jude Thaddaeus carried the fire of that prayer to the ends of the earth, sealing their witness with martyrdom.`
    }
  },

  // October 29, 2026: Thursday of the Thirtieth Week in Ordinary Time
  '2026-10-29': {
    id: 'reading-2026-10-29',
    date: '2026-10-29',
    liturgicalDay: 'Thursday of the Thirtieth Week in Ordinary Time',
    liturgicalSeason: 'Ordinary Time (Year II / Cycle B)',
    liturgicalColor: 'green',
    liturgicalRank: 'Weekday',
    firstReading: {
      citation: 'Ephesians 6:10-20',
      theme: 'Put on the armor of God, that you may be able to resist on the evil day',
      text: `Brothers and sisters:
Draw your strength from the Lord and from his mighty power. Put on the armor of God so that you may be able to stand firm against the tactics of the Devil. For our struggle is not with flesh and blood but with the principalities, with the powers, with the world rulers of this present darkness, with the evil spirits in the heavens.

Therefore, put on the armor of God, that you may be able to resist on the evil day and, having done everything, to hold your ground. So stand fast with your loins girded in truth, clothed with righteousness as a breastplate, and your feet shod in readiness for the gospel of peace. In all circumstances, hold faith as a shield, to quench all the flaming arrows of the evil one. And take the helmet of salvation and the sword of the Spirit, which is the word of God.

With all prayer and supplication, pray at every opportunity in the Spirit. To that end, be watchful with all perseverance and supplication for all the holy ones and also for me, that speech may be given me to open my mouth, to make known with boldness the mystery of the gospel for which I am an ambassador in chains, so that I may have the courage to speak as I must.`
    },
    responsorialPsalm: {
      citation: 'Psalm 144:1b, 2, 9-10',
      antiphon: 'Blessed be the Lord, my Rock!',
      verses: [
        'Blessed be the LORD, my rock, who trains my hands for battle, my fingers for war.',
        'My mercy and my fortress, my stronghold, my deliverer, my shield, in whom I trust, who subdues my people under me.',
        'O God, a new song I will sing to you; on a ten-stringed lyre I will play to you, you who give victory to kings, and deliver David, your servant, from the evil sword.'
      ]
    },
    alleluia: {
      verse: 'Blessed is the king who comes in the name of the Lord! Peace in heaven and glory in the highest!'
    },
    gospel: {
      citation: 'Luke 13:31-35',
      text: `Some Pharisees came to Jesus and said, "Go away, leave this area because Herod wants to kill you."

He replied, "Go and tell that fox, 'Behold, I cast out demons and I perform healings today and tomorrow, and on the third day I accomplish my purpose.' Yet I must continue on my way today, tomorrow, and the following day, for it is impossible that a prophet should die outside of Jerusalem.

Jerusalem, Jerusalem, you who kill the prophets and stone those sent to you, how many times I yearned to gather your children together as a hen gathers her brood under her wings, but you were unwilling! Behold, your house will be abandoned. But I tell you, you will not see me until the time comes when you say, 'Blessed is he who comes in the name of the Lord.'"`
    },
    reflection: {
      author: 'St. Augustine of Hippo and St. John Chrysostom',
      title: 'Clothed in the Armor of God and Sheltered Under the Wings of Christ',
      content: `While Saint Paul summons us to put on the full spiritual armor of God—truth, righteousness, faith, and the Word of God—Our Lord reveals the tender maternal heart behind His divine majesty: "How many times I yearned to gather your children together as a hen gathers her brood under her wings!" In every Holy Mass we acclaim: "Blessed is He who comes in the name of the Lord," finding invincible shelter beneath His Eucharistic presence.`
    }
  },

  // October 30, 2026: Friday of the Thirtieth Week in Ordinary Time
  '2026-10-30': {
    id: 'reading-2026-10-30',
    date: '2026-10-30',
    liturgicalDay: 'Friday of the Thirtieth Week in Ordinary Time',
    liturgicalSeason: 'Ordinary Time (Year II / Cycle B)',
    liturgicalColor: 'green',
    liturgicalRank: 'Weekday',
    firstReading: {
      citation: 'Philippians 1:1-11',
      theme: 'The one who began a good work in you will continue to complete it until the day of Christ Jesus',
      text: `Paul and Timothy, slaves of Christ Jesus, to all the holy ones in Christ Jesus who are in Philippi, with the bishops and deacons: grace to you and peace from God our Father and the Lord Jesus Christ.

I give thanks to my God at every remembrance of you, praying always with joy in my every prayer for all of you, because of your partnership for the gospel from the first day until now. I am confident of this, that the one who began a good work in you will continue to complete it until the day of Christ Jesus.

And this is my prayer: that your love may increase ever more and more in knowledge and every kind of perception, to discern what is of value, so that you may be pure and blameless for the day of Christ, filled with the fruit of righteousness that comes through Jesus Christ for the glory and praise of God.`
    },
    responsorialPsalm: {
      citation: 'Psalm 111:1-2, 3-4, 5-6',
      antiphon: 'How great are the works of the Lord!',
      verses: [
        'I will give thanks to the LORD with all my heart in the company and assembly of the just. Great are the works of the LORD, exquisite in all their delights.',
        'Majesty and glory are his work, and his justice endures forever. He has won renown for his wondrous deeds; gracious and merciful is the LORD.',
        'He has given food to those who fear him; he will forever be mindful of his covenant. He has made known to his people the power of his works.'
      ]
    },
    alleluia: {
      verse: 'My sheep hear my voice, says the Lord; I know them, and they follow me.'
    },
    gospel: {
      citation: 'Luke 14:1-6',
      text: `On a sabbath Jesus went to dine at the home of one of the leading Pharisees, and the people there were observing him carefully.

In front of him there was a man suffering from dropsy. Jesus spoke to the scholars of the law and Pharisees in reply, asking, "Is it lawful to cure on the sabbath or not?" But they kept silent; so he took the man and, after he had healed him, dismissed him.

Then he said to them, "Who among you, if your son or ox falls into a cistern, would not immediately pull him out on the sabbath day?" But they were unable to answer his question.`
    },
    reflection: {
      author: 'St. Cyril of Alexandria and The Venerable Bede',
      title: 'The True Sabbath Healing of Charity',
      content: `The Pharisees watched Jesus with cold suspicion while a suffering man stood before them. Our Lord heals the man afflicted with dropsy—an ancient symbol of insatiable worldly avarice—teaching us that works of mercy and spiritual liberation are the noblest sanctification of God's holy day.`
    }
  },

  // October 31, 2026: Saturday of the Thirtieth Week in Ordinary Time
  '2026-10-31': {
    id: 'reading-2026-10-31',
    date: '2026-10-31',
    liturgicalDay: 'Saturday of the Thirtieth Week in Ordinary Time (Blessed Virgin Mary on Saturday)',
    liturgicalSeason: 'Ordinary Time (Year II / Cycle B)',
    liturgicalColor: 'green',
    liturgicalRank: 'Weekday',
    firstReading: {
      citation: 'Philippians 1:18b-26',
      theme: 'For to me life is Christ, and death is gain',
      text: `Brothers and sisters:
I rejoice because of the proclamation of Christ, and I shall continue to rejoice. For I know that this will result in deliverance for me through your prayers and support from the Spirit of Jesus Christ. My eager expectation and hope is that I shall not be put to shame in any way, but that with all boldness, now as always, Christ will be magnified in my body, whether by life or by death. For to me life is Christ, and death is gain.

If I go on living in the flesh, that means fruitful labor for me. And I do not know which I shall choose. I am caught between the two. I long to depart this life and be with Christ, for that is far better. Yet that I remain in the flesh is more necessary for your benefit.`
    },
    responsorialPsalm: {
      citation: 'Psalm 42:2, 3, 5cdef',
      antiphon: 'My soul is thirsting for the living God.',
      verses: [
        'As the hind longs for the running waters, so my soul longs for you, O God.',
        'Athirst is my soul for God, the living God. When shall I go and behold the face of God?',
        'I went with the throng and led them in procession to the house of God, amid loud cries of joy and thanksgiving, with the multitude keeping festival.'
      ]
    },
    alleluia: {
      verse: 'Take my yoke upon you and learn from me, for I am meek and humble of heart.'
    },
    gospel: {
      citation: 'Luke 14:1, 7-11',
      text: `On a sabbath Jesus went to dine at the home of one of the leading Pharisees, and the people there were observing him carefully.

He told a parable to those who had been invited, noticing how they were choosing the places of honor at the table. "When you are invited by someone to a wedding banquet, do not recline at table in the place of honor. A more distinguished guest than you may have been invited by him, and the host who invited both of you may approach you and say, 'Give your place to this man,' and then you would proceed with embarrassment to take the lowest place.

Rather, when you are invited, go and take the lowest place so that when the host comes to you he may say, 'My friend, move up to a higher position.' Then you will enjoy the esteem of your companions at the table. For everyone who exalts himself will be humbled, but the one who humbles himself will be exalted."`
    },
    reflection: {
      author: 'St. Bernard of Clairvaux and St. Augustine',
      title: 'Choose the Lowest Place with Christ and Mary',
      content: `On the eve of All Saints' Day, Our Lord hands us the golden key to the heavenly banquet: humility. "Everyone who exalts himself will be humbled, but the one who humbles himself will be exalted." When we choose the lowest place in imitation of Jesus and His lowly Handmaid Mary, the Heavenly Host Himself lifts us up to the table of His Saints.`
    }
  }
};

interface LectionaryTemplate {
  firstReading: MassReading['firstReading'];
  responsorialPsalm: MassReading['responsorialPsalm'];
  secondReading?: MassReading['secondReading'];
  alleluia: MassReading['alleluia'];
  gospel: MassReading['gospel'];
  reflection: MassReading['reflection'];
}

// Proper Readings for Moveable Solemnities & Major Feasts (valid across 2026–2030+)
const MOVEABLE_PROPER_READINGS: Record<string, LectionaryTemplate> = {
  'ASH_WEDNESDAY': {
    firstReading: {
      citation: 'Joel 2:12-18',
      theme: 'Rend your hearts, not your garments, and return to the LORD your God',
      text: `Even now, says the LORD, return to me with your whole heart, with fasting, and weeping, and mourning; rend your hearts, not your garments, and return to the LORD, your God. For gracious and merciful is he, slow to anger, rich in kindness, and relenting in punishment.\n\nBlow the trumpet in Zion! proclaim a fast, call an assembly; gather the people, notify the congregation; assemble the elders, gather the children and the infants at the breast. Between the porch and the altar let the priests, the ministers of the LORD, weep, and say, "Spare, O LORD, your people!"`
    },
    responsorialPsalm: {
      citation: 'Psalm 51:3-4, 5-6ab, 12-13, 14 and 17',
      antiphon: 'Be merciful, O Lord, for we have sinned.',
      verses: [
        'Have mercy on me, O God, in your goodness; in the greatness of your compassion wipe out my offense. Thoroughly wash me from my guilt and of my sin cleanse me.',
        'For I acknowledge my offense, and my sin is before me always: "Against you only have I sinned, and done what is evil in your sight."',
        'A clean heart create for me, O God, and a steadfast spirit renew within me. Cast me not out from your presence, and your Holy Spirit take not from me.'
      ]
    },
    secondReading: {
      citation: '2 Corinthians 5:20–6:2',
      text: `Brothers and sisters: We are ambassadors for Christ, as if God were appealing through us. We implore you on behalf of Christ, be reconciled to God. For our sake he made him to be sin who did not know sin, so that we might become the righteousness of God in him. Behold, now is a very acceptable time; behold, now is the day of salvation.`
    },
    alleluia: {
      verse: 'Praise to you, Lord Jesus Christ, King of endless glory! If today you hear his voice, harden not your hearts.'
    },
    gospel: {
      citation: 'Matthew 6:1-6, 16-18',
      text: `Jesus said to his disciples: "Take care not to perform righteous deeds in order that people may see them; otherwise, you will have no recompense from your heavenly Father.\n\nWhen you give alms, do not blow a trumpet before you... keep your almsgiving in secret, and your Father who sees in secret will repay you.\n\nWhen you pray, go to your inner room, close the door, and pray to your Father in secret. And your Father who sees in secret will repay you.\n\nWhen you fast, anoint your head and wash your face, so that you may not appear to be fasting, except to your Father who is hidden. And your Father who sees what is hidden will repay you."`
    },
    reflection: {
      author: 'Pope St. Leo the Great and St. Augustine',
      title: 'The Three Pillars of Lent: Prayer, Fasting, and Almsgiving',
      content: `As the sacred forty days of Lent begin with the imposition of ashes—"Remember that you are dust, and to dust you shall return"—Christ calls us into the inner sanctuary of the heart where the Father alone sees. Prayer lifts the soul to God, fasting masters the flesh, and almsgiving heals our neighbor.`
    }
  },
  'PALM_SUNDAY': {
    firstReading: {
      citation: 'Isaiah 50:4-7',
      theme: 'I gave my back to those who beat me, and my face I did not shield from buffets and spitting',
      text: `The Lord GOD has given me a well-trained tongue, that I might know how to speak to the weary a word that will rouse them. Morning after morning he opens my ear that I may hear; and I have not rebelled, have not turned back. I gave my back to those who beat me, my cheeks to those who plucked my beard; my face I did not shield from buffets and spitting. The Lord GOD is my help, therefore I am not disgraced.`
    },
    responsorialPsalm: {
      citation: 'Psalm 22:8-9, 17-18, 19-20, 23-24',
      antiphon: 'My God, my God, why have you abandoned me?',
      verses: [
        'All who see me scoff at me; they mock me with parted lips, they wag their heads: "He relied on the LORD; let him deliver him, let him rescue him, if he loves him."',
        'Indeed, many dogs surround me, a pack of evildoers closes in upon me; They have pierced my hands and my feet; I can count all my bones.',
        'They divide my garments among them, and for my vesture they cast lots. But you, O LORD, be not far from me; O my help, hasten to aid me!'
      ]
    },
    secondReading: {
      citation: 'Philippians 2:6-11',
      text: `Christ Jesus, though he was in the form of God, did not regard equality with God something to be grasped. Rather, he emptied himself, taking the form of a slave, coming in human likeness; and found human in appearance, he humbled himself, becoming obedient to the point of death, even death on a cross. Because of this, God greatly exalted him and bestowed on him the name which is above every name.`
    },
    alleluia: {
      verse: 'Praise to you, Lord Jesus Christ, King of endless glory! Christ became obedient to the point of death, even death on a cross.'
    },
    gospel: {
      citation: 'Matthew 21:1-11 / Passion of Our Lord Jesus Christ',
      text: `The crowds preceding Jesus and those following kept crying out and saying: "Hosanna to the Son of David; blessed is he who comes in the name of the Lord; hosanna in the highest!"\n\nAnd at the ninth hour Jesus cried out in a loud voice, "Eli, Eli, lema sabachthani?" And bowing his head, he handed over the spirit. Truly, this was the Son of God!`
    },
    reflection: {
      author: 'St. Bernard of Clairvaux and St. Andrew of Crete',
      title: 'Hosanna to the Meek King Entering His Passion',
      content: `Today the Church holds palm branches in her hands to acclaim Christ her King, and immediately kneels before Calvary as the Passion is proclaimed. Let us spread not merely branches of olive and palm beneath His feet, but our very hearts clothed in humility and contrition.`
    }
  },
  'HOLY_THURSDAY': {
    firstReading: {
      citation: 'Exodus 12:1-8, 11-14',
      theme: 'The law of the Passover meal: This day shall be a memorial feast for you',
      text: `The LORD said to Moses and Aaron in the land of Egypt: "This month shall stand at the head of your calendar... Tell the whole community of Israel: On the tenth of this month every one of your families must procure for itself a lamb, one apiece for each household... The blood will mark the houses where you are. Seeing the blood, I will pass over you."`
    },
    responsorialPsalm: {
      citation: 'Psalm 116:12-13, 15-16bc, 17-18',
      antiphon: 'Our blessing-cup is a communion with the Blood of Christ.',
      verses: [
        'How shall I make a return to the LORD for all the good he has done for me? The cup of salvation I will take up, and I will call upon the name of the LORD.',
        'Precious in the eyes of the LORD is the death of his faithful ones. I am your servant, the son of your handmaid; you have loosed my bonds.',
        'To you will I offer sacrifice of thanksgiving, and I will call upon the name of the LORD.'
      ]
    },
    secondReading: {
      citation: '1 Corinthians 11:23-26',
      text: `Brothers and sisters: I received from the Lord what I also handed on to you, that the Lord Jesus, on the night he was handed over, took bread, and, after he had given thanks, broke it and said, "This is my body that is for you. Do this in remembrance of me." In the same way also the cup, after supper, saying, "This cup is the new covenant in my blood. Do this, as often as you drink it, in remembrance of me."`
    },
    alleluia: {
      verse: 'I give you a new commandment, says the Lord: love one another as I have loved you.'
    },
    gospel: {
      citation: 'John 13:1-15',
      text: `Before the feast of Passover, Jesus knew that his hour had come to pass from this world to the Father. He loved his own in the world and he loved them to the end.\n\nSo, during supper, he rose from supper and took off his outer garments. He took a towel and tied it around his waist. Then he poured water into a basin and began to wash the disciples' feet... "If I, therefore, the master and teacher, have washed your feet, you ought to wash one another's feet. I have given you a model to follow, so that as I have done for you, you should also do."`
    },
    reflection: {
      author: 'St. Thomas Aquinas and St. John Chrysostom',
      title: 'The Institution of the Most Holy Eucharist and the Sacred Priesthood',
      content: `Having loved His own who were in the world, Jesus loved them to the end! On this most sacred night, Our Savior instituted the Sacrament of His Body and Blood, ordained His Apostles priests of the New Covenant, and knelt to wash their feet, uniting Eucharistic adoration with humble fraternal service.`
    }
  },
  'GOOD_FRIDAY': {
    firstReading: {
      citation: 'Isaiah 52:13–53:12',
      theme: 'He was pierced for our offenses, crushed for our sins; by his stripes we were healed',
      text: `See, my servant shall prosper, he shall be raised high and greatly exalted... Yet it was our infirmities that he bore, our sufferings that he endured, while we thought of him as stricken, as one smitten by God and afflicted. But he was pierced for our offenses, crushed for our sins; upon him was the chastisement that makes us whole, by his stripes we were healed.`
    },
    responsorialPsalm: {
      citation: 'Psalm 31:2, 6, 12-13, 15-16, 17, 25',
      antiphon: 'Father, into your hands I commend my spirit.',
      verses: [
        'In you, O LORD, I take refuge; let me never be put to shame. In your justice rescue me. Into your hands I commend my spirit; you will redeem me, O LORD, O faithful God.',
        'But my trust is in you, O LORD; I say, "You are my God." In your hands is my destiny; rescue me from the clutches of my enemies.',
        'Let your face shine upon your servant; save me in your kindness. Take courage and be stouthearted, all you who hope in the LORD.'
      ]
    },
    secondReading: {
      citation: 'Hebrews 4:14-16; 5:7-9',
      text: `Brothers and sisters: Since we have a great high priest who has passed through the heavens, Jesus, the Son of God, let us hold fast to our confession... Son though he was, he learned obedience from what he suffered; and when he was made perfect, he became the source of eternal salvation for all who obey him.`
    },
    alleluia: {
      verse: 'Praise to you, Lord Jesus Christ, King of endless glory! Christ became obedient to the point of death, even death on a cross.'
    },
    gospel: {
      citation: 'John 18:1–19:42',
      text: `Standing by the cross of Jesus were his mother and his mother's sister, Mary the wife of Clopas, and Mary of Magdala. When Jesus saw his mother and the disciple there whom he loved, he said to his mother, "Woman, behold, your son." Then he said to the disciple, "Behold, your mother."... When Jesus had taken the wine, he said, "It is finished." And bowing his head, he handed over the spirit.\n\nOne of the soldiers thrust his lance into his side, and immediately blood and water flowed out.`
    },
    reflection: {
      author: 'St. John Chrysostom and St. Augustine',
      title: 'Behold the Wood of the Cross, on Which Hung the Salvation of the World',
      content: `As the new Adam sleeps the sleep of death upon the Tree of the Cross, there is formed from His pierced side—from the Blood and Water of the Eucharist and Baptism—His spotless Bride, the Catholic Church. Come, let us adore!`
    }
  },
  'EASTER_SUNDAY': {
    firstReading: {
      citation: 'Acts 10:34a, 37-43',
      theme: 'We ate and drank with Him after He rose from the dead',
      text: `Peter proceeded to speak and said: "You know what has happened all over Judea, beginning in Galilee after the baptism that John preached, how God anointed Jesus of Nazareth with the Holy Spirit and power. He went about doing good and healing all those oppressed by the devil, for God was with him... They put him to death by hanging him on a tree. This man God raised on the third day and granted that he be visible, not to all the people, but to us, the witnesses chosen by God in advance, who ate and drank with him after he rose from the dead."`
    },
    responsorialPsalm: {
      citation: 'Psalm 118:1-2, 16-17, 22-23',
      antiphon: 'This is the day the Lord has made; let us rejoice and be glad.',
      verses: [
        'Give thanks to the LORD, for he is good, for his mercy endures forever. Let the house of Israel say, "His mercy endures forever."',
        '"The right hand of the LORD has struck with power; the right hand of the LORD is exalted. I shall not die, but live, and declare the works of the LORD."',
        'The stone which the builders rejected has become the cornerstone. By the LORD has this been done; it is wonderful in our eyes.'
      ]
    },
    secondReading: {
      citation: 'Colossians 3:1-4',
      text: `Brothers and sisters: If then you were raised with Christ, seek what is above, where Christ is seated at the right hand of God. Think of what is above, not of what is on earth. For you have died, and your life is hidden with Christ in God. When Christ your life appears, then you too will appear with him in glory.`
    },
    alleluia: {
      verse: 'Christ, our paschal lamb, has been sacrificed; let us then feast with joy in the Lord. Alleluia!'
    },
    gospel: {
      citation: 'John 20:1-9',
      text: `On the first day of the week, Mary of Magdala came to the tomb early in the morning, while it was still dark, and saw the stone removed from the tomb. So she ran and went to Simon Peter and to the other disciple whom Jesus loved, and told them, "They have taken the Lord from the tomb, and we don't know where they put him."\n\nSo Peter and the other disciple went out and came to the tomb... Then the other disciple also went in, the one who had arrived at the tomb first, and he saw and believed.`
    },
    reflection: {
      author: 'St. John Chrysostom (Paschal Homily)',
      title: 'Christ Is Risen, and Not One Dead Remains in the Grave!',
      content: `"O Death, where is thy sting? O Hell, where is thy victory? Christ is risen, and thou art overthrown! Christ is risen, and the demons are fallen! Christ is risen, and the angels rejoice! Christ is risen, and life reigns!" Rejoice in the splendor of our Risen Redeemer.`
    }
  },
  'DIVINE_MERCY_SUNDAY': {
    firstReading: {
      citation: 'Acts 2:42-47',
      theme: 'They devoted themselves to the teaching of the Apostles and to the breaking of the bread',
      text: `They devoted themselves to the teaching of the apostles and to the communal life, to the breaking of the bread and to the prayers. Awe came upon everyone, and many wonders and signs were done through the apostles. All who believed were together and had all things in common.`
    },
    responsorialPsalm: {
      citation: 'Psalm 118:2-4, 13-15, 22-24',
      antiphon: 'Give thanks to the Lord for he is good, his love is everlasting.',
      verses: [
        'Let the house of Israel say, "His mercy endures forever." Let the house of Aaron say, "His mercy endures forever." Let those who fear the LORD say, "His mercy endures forever."',
        'I was hard pressed and was falling, but the LORD helped me. My strength and my courage is the LORD, and he has been my savior.',
        'The stone which the builders rejected has become the cornerstone. This is the day the LORD has made; let us be glad and rejoice in it.'
      ]
    },
    secondReading: {
      citation: '1 Peter 1:3-9',
      text: `Blessed be the God and Father of our Lord Jesus Christ, who in his great mercy gave us a new birth to a living hope through the resurrection of Jesus Christ from the dead... Although you have not seen him you love him; even though you do not see him now yet believe in him, you rejoice with an indescribable and glorious joy.`
    },
    alleluia: {
      verse: 'You believe in me, Thomas, because you have seen me, says the Lord; blessed are they who have not seen me, but still believe! Alleluia.'
    },
    gospel: {
      citation: 'John 20:19-31',
      text: `On the evening of that first day of the week, when the doors were locked, where the disciples were, for fear of the Jews, Jesus came and stood in their midst and said to them, "Peace be with you." When he had said this, he showed them his hands and his side. The disciples rejoiced when they saw the Lord.\n\nJesus said to them again, "Peace be with you. As the Father has sent me, so I send you." And when he had said this, he breathed on them and said to them, "Receive the Holy Spirit. Whose sins you forgive are forgiven them, and whose sins you retain are retained."\n\nThen he said to Thomas, "Put your finger here and see my hands, and bring your hand and put it into my side, and do not be unbelieving, but believe." Thomas answered and said to him, "My Lord and my God!"`
    },
    reflection: {
      author: 'St. Faustina Kowalska and St. John Paul II',
      title: 'Jesus, I Trust in You — Ocean of Divine Mercy',
      content: `On the Octave Day of Easter, the Risen Lord shows His glorious wounds as fountains of mercy, breathing the Holy Spirit upon His Apostles to institute the Sacrament of Reconciliation and eliciting from St. Thomas the supreme act of Eucharistic faith: "My Lord and my God!"`
    }
  },
  'ASCENSION': {
    firstReading: {
      citation: 'Acts 1:1-11',
      theme: 'As they were looking on, He was lifted up, and a cloud took Him from their sight',
      text: `In the first book, Theophilus, I dealt with all that Jesus did and taught until the day he was taken up, after giving instructions through the Holy Spirit to the apostles whom he had chosen... "But you will receive power when the Holy Spirit comes upon you, and you will be my witnesses in Jerusalem, throughout Judea and Samaria, and to the ends of the earth." When he had said this, as they were looking on, he was lifted up, and a cloud took him from their sight.`
    },
    responsorialPsalm: {
      citation: 'Psalm 47:2-3, 6-7, 8-9',
      antiphon: 'God mounts his throne to shouts of joy: a blare of trumpets for the Lord.',
      verses: [
        'All you peoples, clap your hands, shout to God with cries of gladness, For the LORD, the Most High, the awesome, is the great king over all the earth.',
        'God mounts his throne amid shouts of joy; the LORD, amid trumpet blasts. Sing praise to God, sing praise; sing praise to our king, sing praise.',
        'For king of all the earth is God; sing hymns of praise. God reigns over the nations, God sits upon his holy throne.'
      ]
    },
    secondReading: {
      citation: 'Ephesians 1:17-23',
      text: `May the God of our Lord Jesus Christ, the Father of glory, give you a Spirit of wisdom and revelation resulting in knowledge of him... raising him from the dead and seating him at his right hand in the heavens, far above every principality, authority, power, and dominion.`
    },
    alleluia: {
      verse: 'Go and teach all nations, says the Lord; I am with you always, until the end of the world. Alleluia.'
    },
    gospel: {
      citation: 'Matthew 28:16-20',
      text: `The eleven disciples went to Galilee, to the mountain to which Jesus had ordered them. When they saw him, they worshiped, but they doubted. Then Jesus approached and said to them, "All power in heaven and on earth has been given to me. Go, therefore, and make disciples of all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Spirit, teaching them to observe all that I have commanded you. And behold, I am with you always, until the end of the age."`
    },
    reflection: {
      author: 'Pope St. Leo the Great',
      title: 'What Was Visible in Our Redeemer Has Passed Over into the Sacraments',
      content: `In ascending to the Father's right hand, Christ did not abandon His Church; rather, He carried our human nature into the throne room of the Blessed Trinity and remains substantially present with us in the Most Blessed Sacrament "always, until the end of the age."`
    }
  },
  'PENTECOST': {
    firstReading: {
      citation: 'Acts 2:1-11',
      theme: 'They were all filled with the Holy Spirit and began to speak',
      text: `When the time for Pentecost was fulfilled, they were all in one place together. And suddenly there came from the sky a noise like a strong driving wind, and it filled the entire house in which they were. Then there appeared to them tongues as of fire, which parted and came to rest on each one of them. And they were all filled with the Holy Spirit and began to speak in different tongues, as the Spirit enabled them to proclaim.`
    },
    responsorialPsalm: {
      citation: 'Psalm 104:1, 24, 29-30, 31, 34',
      antiphon: 'Lord, send out your Spirit, and renew the face of the earth.',
      verses: [
        'Bless the LORD, O my soul! O LORD, my God, you are great indeed! How manifold are your works, O LORD! the earth is full of your creatures.',
        'If you take away their breath, they perish and return to their dust. When you send forth your spirit, they are created, and you renew the face of the earth.',
        'May the glory of the LORD endure forever; may the LORD be glad in his works! Pleasing to him be my theme; I will be glad in the LORD.'
      ]
    },
    secondReading: {
      citation: '1 Corinthians 12:3b-7, 12-13',
      text: `Brothers and sisters: No one can say, "Jesus is Lord," except by the Holy Spirit. There are different kinds of spiritual gifts but the same Spirit; there are different forms of service but the same Lord... For in one Spirit we were all baptized into one body.`
    },
    alleluia: {
      verse: 'Come, Holy Spirit, fill the hearts of your faithful and kindle in them the fire of your love. Alleluia!'
    },
    gospel: {
      citation: 'John 20:19-23',
      text: `On the evening of that first day of the week, when the doors were locked, where the disciples were, for fear of the Jews, Jesus came and stood in their midst and said to them, "Peace be with you." When he had said this, he showed them his hands and his side. The disciples rejoiced when they saw the Lord.\n\nJesus said to them again, "Peace be with you. As the Father has sent me, so I send you." And when he had said this, he breathed on them and said to them, "Receive the Holy Spirit. Whose sins you forgive are forgiven them, and whose sins you retain are retained."`
    },
    reflection: {
      author: 'St. Cyril of Jerusalem and St. Irenaeus',
      title: 'Veni Sancte Spiritus: The Fire of Divine Love',
      content: `At Babel, human pride divided the tongues of nations; at Pentecost, the Holy Spirit descended in tongues of fire upon Mary and the Apostles in the Upper Room, uniting all peoples into the one Catholic Church.`
    }
  },
  'TRINITY_SUNDAY': {
    firstReading: {
      citation: 'Deuteronomy 4:32-34, 39-40',
      theme: 'The LORD is God in the heavens above and on earth below, and there is no other',
      text: `Moses said to the people: "Ask now of the days of old, before your time, ever since God created man upon the earth; ask from one end of the sky to the other: Did anything so great ever happen before? Was it ever heard of?... This is why you must now know, and fix in your heart, that the LORD is God in the heavens above and on earth below, and that there is no other."`
    },
    responsorialPsalm: {
      citation: 'Psalm 33:4-5, 6, 9, 18-19, 20, 22',
      antiphon: 'Blessed the people the Lord has chosen to be his own.',
      verses: [
        'Upright is the word of the LORD, and all his works are trustworthy. He loves justice and right; of the kindness of the LORD the earth is full.',
        'By the word of the LORD the heavens were made; by the breath of his mouth all their host. For he spoke, and it was made; he commanded, and it stood forth.',
        'Our soul waits for the LORD, who is our help and our shield. May your kindness, O LORD, be upon us who have put our hope in you.'
      ]
    },
    secondReading: {
      citation: 'Romans 8:14-17',
      text: `Brothers and sisters: For those who are led by the Spirit of God are children of God. For you did not receive a spirit of slavery to fall back into fear, but you received a Spirit of adoption, through whom we cry, "Abba, Father!" The Spirit itself bears witness with our spirit that we are children of God, and if children, then heirs, heirs of God and joint heirs with Christ.`
    },
    alleluia: {
      verse: 'Glory to the Father, the Son, and the Holy Spirit; to God who is, who was, and who is to come. Alleluia!'
    },
    gospel: {
      citation: 'Matthew 28:16-20',
      text: `The eleven disciples went to Galilee, to the mountain to which Jesus had ordered them. When they saw him, they worshiped, but they doubted. Then Jesus approached and said to them, "All power in heaven and on earth has been given to me. Go, therefore, and make disciples of all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Spirit, teaching them to observe all that I have commanded you. And behold, I am with you always, until the end of the age."`
    },
    reflection: {
      author: 'St. Augustine of Hippo and St. Athanasius',
      title: 'Adoring the Undivided Unity of the Most Blessed Trinity',
      content: `The central mystery of the Christian faith and life is the mystery of the Most Blessed Trinity: one God in three Divine Persons—Father, Son, and Holy Spirit—into whose eternal communion of love we are baptized and indwelt.`
    }
  },
  'CORPUS_CHRISTI': {
    firstReading: {
      citation: 'Deuteronomy 8:2-3, 14b-16a',
      theme: 'He fed you with manna, a food unknown to you and your fathers',
      text: `Moses said to the people: "Remember how for forty years now the LORD, your God, has directed all your journeying in the desert... He therefore let you be afflicted with hunger, and then fed you with manna, a food unknown to you and your fathers, in order to show you that not by bread alone does man live, but by every word that comes forth from the mouth of the LORD."`
    },
    responsorialPsalm: {
      citation: 'Psalm 147:12-13, 14-15, 19-20',
      antiphon: 'Praise the Lord, Jerusalem.',
      verses: [
        'Glorify the LORD, O Jerusalem; praise your God, O Zion. For he has strengthened the bars of your gates; he has blessed your children within you.',
        'He has granted peace in your borders; with the best of wheat he fills you. He sends forth his command to the earth; swiftly runs his word!',
        'He has proclaimed his word to Jacob, his statutes and his ordinances to Israel.'
      ]
    },
    secondReading: {
      citation: '1 Corinthians 10:16-17',
      text: `Brothers and sisters: The cup of blessing that we bless, is it not a participation in the blood of Christ? The bread that we break, is it not a participation in the body of Christ? Because the loaf of bread is one, we, though many, are one body, for we all partake of the one loaf.`
    },
    alleluia: {
      verse: 'I am the living bread that came down from heaven, says the Lord; whoever eats this bread will live forever. Alleluia!'
    },
    gospel: {
      citation: 'John 6:51-58',
      text: `Jesus said to the Jewish crowds: "I am the living bread that came down from heaven; whoever eats this bread will live forever; and the bread that I will give is my flesh for the life of the world."\n\nThe Jews quarreled among themselves, saying, "How can this man give us his flesh to eat?" Jesus said to them, "Amen, amen, I say to you, unless you eat the flesh of the Son of Man and drink his blood, you do not have life within you. Whoever eats my flesh and drinks my blood has eternal life, and I will raise him on the last day. For my flesh is true food, and my blood is true drink. Whoever eats my flesh and drinks my blood remains in me and I in him."`
    },
    reflection: {
      author: 'St. Thomas Aquinas (Lauda Sion & Summa Theologiae)',
      title: 'O Sacred Banquet, in Which Christ Is Received!',
      content: `"O sacred banquet, in which Christ is received, the memory of His Passion is renewed, the mind is filled with grace, and a pledge of future glory is given to us!" What the manna prefigured in the desert, Jesus fulfills substantially on the Altar.`
    }
  },
  'SACRED_HEART': {
    firstReading: {
      citation: 'Hosea 11:1, 3-4, 8c-9',
      theme: 'My heart is overwhelmed, my pity is stirred',
      text: `Thus says the LORD: When Israel was a child I loved him, out of Egypt I called my son. Yet it was I who taught Ephraim to walk, who took them in my arms; I drew them with human cords, with bands of love; I fostered them like one who raises an infant to his cheeks, yet, though I stooped to feed my child, they did not know that I was their healer. My heart is overwhelmed, my pity is stirred.`
    },
    responsorialPsalm: {
      citation: 'Isaiah 12:2-3, 4bcd, 5-6',
      antiphon: 'You will draw water joyfully from the springs of salvation.',
      verses: [
        'God indeed is my savior; I am confident and unafraid. My strength and my courage is the LORD, and he has been my savior.',
        'With joy you will draw water at the fountains of salvation. Give thanks to the LORD, acclaim his name; among the nations make known his deeds.',
        'Sing praise to the LORD for his glorious achievement; let this be known throughout all the earth. Shout with exultation, O city of Zion, for great in your midst is the Holy One of Israel!'
      ]
    },
    secondReading: {
      citation: 'Ephesians 3:8-12, 14-19',
      text: `For this reason I kneel before the Father, from whom every family in heaven and on earth is named, that he may grant you in accord with the riches of his glory to be strengthened with power through his Spirit in the inner self, and that Christ may dwell in your hearts through faith; that you, rooted and grounded in love, may have strength to comprehend with all the holy ones what is the breadth and length and height and depth, and to know the love of Christ that surpasses knowledge.`
    },
    alleluia: {
      verse: 'Take my yoke upon you, says the Lord, and learn from me, for I am meek and humble of heart. Alleluia.'
    },
    gospel: {
      citation: 'John 19:31-37',
      text: `Since it was preparation day, in order that the bodies might not remain on the cross on the sabbath, for the sabbath day of that week was a solemn one, the Jews asked Pilate that their legs be broken and they be taken down... But when they came to Jesus and saw that he was already dead, they did not break his legs, but one soldier thrust his lance into his side, and immediately blood and water flowed out. An eyewitness has testified, and his testimony is true; he knows that he is speaking the truth, so that you also may come to believe. For this happened so that the Scripture passage might be fulfilled: "They will look upon him whom they have pierced."`
    },
    reflection: {
      author: 'St. Bonaventure and St. Margaret Mary Alacoque',
      title: 'The Pierced Heart of the Redeemer: Furnace of Infinite Charity',
      content: `The lance of the soldier opened the Sacred Heart of Jesus so that through the visible wound we might behold the invisible wound of Divine Love. From that pierced Heart flow the sacraments of the Church—water of Baptism and Blood of the Eucharist.`
    }
  },
  'CHRIST_THE_KING': {
    firstReading: {
      citation: 'Daniel 7:13-14',
      theme: 'His dominion is an everlasting dominion that shall not be taken away',
      text: `As the visions during the night continued, I saw one like a Son of man coming, on the clouds of heaven; when he reached the Ancient of Days and was presented before him, the one like a Son of man received dominion, glory, and kingship; all peoples, nations, and languages serve him. His dominion is an everlasting dominion that shall not be taken away, his kingship shall not be destroyed.`
    },
    responsorialPsalm: {
      citation: 'Psalm 93:1, 1-2, 5',
      antiphon: 'The Lord is king; he is robed in majesty.',
      verses: [
        'The LORD is king, in splendor robed; robed is the LORD and girt about with strength.',
        'And he has made the world firm, not to be moved. Your throne stands firm from of old; from everlasting you are, O LORD.',
        'Your decrees are worthy of trust indeed; holiness befits your house, O LORD, for length of days.'
      ]
    },
    secondReading: {
      citation: 'Revelation 1:5-8',
      text: `Jesus Christ is the faithful witness, the firstborn of the dead and ruler of the kings of the earth. To him who loves us and has freed us from our sins by his blood, who has made us into a kingdom, priests for his God and Father, to him be glory and power forever and ever. Amen. "I am the Alpha and the Omega," says the Lord God, "the one who is and who was and who is to come, the almighty."`
    },
    alleluia: {
      verse: 'Blessed is he who comes in the name of the Lord! Blessed is the kingdom of our father David that is to come!'
    },
    gospel: {
      citation: 'John 18:33b-37',
      text: `Pilate said to Jesus, "Are you the King of the Jews?" Jesus answered, "Do you say this on your own or have others told you about me?" Pilate answered, "I am not a Jew, am I? Your own nation and the chief priests handed you over to me. What have you done?"\n\nJesus answered, "My kingdom does not belong to this world. If my kingdom did belong to this world, my attendants would be fighting to keep me from being handed over to the Jews. But as it is, my kingdom is not here."\n\nSo Pilate said to him, "Then you are a king?" Jesus answered, "You say I am a king. For this I was born and for this I came into the world, to testify to the truth. Everyone who belongs to the truth listens to my voice."`
    },
    reflection: {
      author: 'St. Augustine and Pope Pius XI (Quas Primas)',
      title: 'Christus Vincit, Christus Regnat, Christus Imperat!',
      content: `On the final Sunday of the Liturgical Year, the Church acclaims Jesus Christ as King of the Universe. His throne is the Cross and the Eucharistic Altar; His law is Truth and Charity. Everyone who belongs to the truth listens to His voice.`
    }
  }
};

// Fixed Feasts & Solemnities Proper Readings by MM-DD
const FIXED_DATE_PROPER_READINGS: Record<string, LectionaryTemplate> = {
  '01-01': {
    firstReading: {
      citation: 'Numbers 6:22-27',
      theme: 'They shall invoke my name upon the Israelites, and I will bless them',
      text: `The LORD said to Moses: "Speak to Aaron and his sons and tell them: This is how you shall bless the Israelites. Say to them:\nThe LORD bless you and keep you!\nThe LORD let his face shine upon you, and be gracious to you!\nThe LORD look upon you kindly and give you peace!\nSo shall they invoke my name upon the Israelites, and I will bless them."`
    },
    responsorialPsalm: {
      citation: 'Psalm 67:2-3, 5, 6, 8',
      antiphon: 'May God bless us in his mercy.',
      verses: [
        'May God have pity on us and bless us; may he let his face shine upon us. So may your way be known upon earth; among all nations, your salvation.',
        'May the nations be glad and exult because you rule the peoples in equity; the nations on the earth you guide.',
        'May the peoples praise you, O God; may all the peoples praise you! May God bless us, and may all the ends of the earth fear him!'
      ]
    },
    secondReading: {
      citation: 'Galatians 4:4-7',
      text: `Brothers and sisters: When the fullness of time had come, God sent his Son, born of a woman, born under the law, to ransom those under the law, so that we might receive adoption as sons. As proof that you are sons, God sent the Spirit of his Son into our hearts, crying out, "Abba, Father!"`
    },
    alleluia: {
      verse: 'In the past God spoke to our ancestors through the prophets; in these last days, he has spoken to us through the Son.'
    },
    gospel: {
      citation: 'Luke 2:16-21',
      text: `The shepherds went in haste to Bethlehem and found Mary and Joseph, and the infant lying in the manger. When they saw this, they made known the message that had been told them about this child. All who heard it were amazed by what had been told them by the shepherds. And Mary kept all these things, reflecting on them in her heart.\n\nWhen eight days were completed for his circumcision, he was named Jesus, the name given him by the angel before he was conceived in the womb.`
    },
    reflection: {
      author: 'St. Cyril of Alexandria (Council of Ephesus)',
      title: 'Hail, Mary Theotokos, Mother of God, Through Whom the Trinity Is Glorified!',
      content: `We begin the civil year beneath the mantle of Mary, the Holy Mother of God (*Theotokos*). Like her, let us treasure all the mysteries of Christ in our hearts and consecrate every day of the coming year to the Prince of Peace.`
    }
  },
  '01-06': {
    firstReading: {
      citation: 'Isaiah 60:1-6',
      theme: 'Rise up in splendor, Jerusalem! The glory of the Lord shines upon you',
      text: `Rise up in splendor, Jerusalem! Your light has come, the glory of the Lord shines upon you. See, darkness covers the earth, and thick clouds cover the peoples; but upon you the LORD shines, and over you appears his glory. Nations shall walk by your light, and kings by your shining radiance... All from Sheba shall come bearing gold and frankincense, and proclaiming the praises of the LORD.`
    },
    responsorialPsalm: {
      citation: 'Psalm 72:1-2, 7-8, 10-11, 12-13',
      antiphon: 'Lord, every nation on earth will adore you.',
      verses: [
        'O God, with your judgment endow the king, and with your justice, the king\'s son; He shall govern your people with justice and your afflicted ones with judgment.',
        'The kings of Tarshish and the Isles shall offer gifts; the kings of Arabia and Seba shall bring tribute. All kings shall pay him homage, all nations shall serve him.',
        'For he shall rescue the poor when he cries out, and the afflicted when he has no one to help him.'
      ]
    },
    secondReading: {
      citation: 'Ephesians 3:2-3a, 5-6',
      text: `Brothers and sisters: It was not made known to people in other generations as it has now been revealed to his holy apostles and prophets by the Spirit: that the Gentiles are coheirs, members of the same body, and copartners in the promise in Christ Jesus through the gospel.`
    },
    alleluia: {
      verse: 'We saw his star at its rising and have come to do him homage.'
    },
    gospel: {
      citation: 'Matthew 2:1-12',
      text: `When Jesus was born in Bethlehem of Judea, in the days of King Herod, behold, magi from the east arrived in Jerusalem, saying, "Where is the newborn king of the Jews? We saw his star at its rising and have come to do him homage."... And behold, the star that they had seen at its rising preceded them, until it came and stopped over the place where the child was. They were overjoyed at seeing the star, and on entering the house they saw the child with Mary his mother. They prostrated themselves and did him homage. Then they opened their treasures and offered him gifts of gold, frankincense, and myrrh.`
    },
    reflection: {
      author: 'Pope St. Leo the Great and St. Gregory the Great',
      title: 'Gold for the King, Incense for God, Myrrh for the Redeemer',
      content: `Led by the star of faith, the Magi kneel before the Infant Savior with Mary His Mother. We too offer Him the gold of pure charity, the frankincense of unceasing prayer, and the myrrh of mortification.`
    }
  },
  '02-02': {
    firstReading: {
      citation: 'Malachi 3:1-4',
      theme: 'Suddenly there will come to the temple the LORD whom you seek',
      text: `Thus says the Lord GOD: Lo, I am sending my messenger to prepare the way before me; And suddenly there will come to the temple the LORD whom you seek, And the messenger of the covenant whom you desire.`
    },
    responsorialPsalm: {
      citation: 'Psalm 24:7, 8, 9, 10',
      antiphon: 'Who is this king of glory? It is the Lord!',
      verses: [
        'Lift up, O gates, your lintels; reach up, you ancient portals, that the king of glory may come in!',
        'Who is this king of glory? The LORD, strong and mighty, the LORD, mighty in battle.',
        'Who is this king of glory? The LORD of hosts; he is the king of glory.'
      ]
    },
    alleluia: {
      verse: 'A light of revelation to the Gentiles, and glory for your people Israel.'
    },
    gospel: {
      citation: 'Luke 2:22-40',
      text: `When the days were completed for their purification according to the law of Moses, Mary and Joseph took Jesus up to Jerusalem to present him to the Lord... Simeon took him into his arms and blessed God, saying:\n"Now, Master, you may let your servant go in peace, according to your word, for my eyes have seen your salvation, which you prepared in the sight of all the peoples: a light for revelation to the Gentiles, and glory for your people Israel."`
    },
    reflection: {
      author: 'St. Sophronius of Jerusalem',
      title: 'Running to Meet the True Light with Lighted Lamps',
      content: `As Simeon took the Infant Christ into his arms, let us receive Him into our hearts at the Altar, bearing the lighted candle of faith and charity.`
    }
  },
  '03-19': {
    firstReading: {
      citation: '2 Samuel 7:4-5a, 12-14a, 16',
      theme: 'The Lord God will give him the throne of David his father',
      text: `The LORD spoke to Nathan and said: "Go, tell my servant David... I will raise up your heir after you, sprung from your loins, and I will make his kingdom firm. I will be a father to him, and he shall be a son to me. Your house and your kingdom shall endure forever before me; your throne shall stand firm forever."`
    },
    responsorialPsalm: {
      citation: 'Psalm 89:2-3, 4-5, 27 and 29',
      antiphon: 'The son of David will live for ever.',
      verses: [
        'The promises of the LORD I will sing forever; through all generations my mouth shall proclaim your faithfulness.',
        'I have made a covenant with my chosen one, I have sworn to David my servant: Forever will I confirm your posterity and establish your throne for all generations.',
        'He shall say of me, "You are my father, my God, the Rock, my savior." Forever I will maintain my kindness toward him.'
      ]
    },
    secondReading: {
      citation: 'Romans 4:13, 16-18, 22',
      text: `Brothers and sisters: Abraham believed, hoping against hope, that he would become "the father of many nations," according to what was said, "Thus shall your descendants be." That is why "it was credited to him as righteousness."`
    },
    alleluia: {
      verse: 'Blessed are those who dwell in your house, O Lord; they never cease to praise you.'
    },
    gospel: {
      citation: 'Matthew 1:16, 18-21, 24a',
      text: `Jacob was the father of Joseph, the husband of Mary. Of her was born Jesus who is called the Christ.\n\nNow this is how the birth of Jesus Christ came about. When his mother Mary was betrothed to Joseph, but before they lived together, she was found with child through the Holy Spirit. Joseph her husband, since he was a righteous man, yet unwilling to expose her to shame, decided to divorce her quietly. Such was his intention when, behold, the angel of the Lord appeared to him in a dream and said, "Joseph, son of David, do not be afraid to take Mary your wife into your home. For it is through the Holy Spirit that this child has been conceived in her. She will bear a son and you are to name him Jesus, because he will save his people from their sins."\n\nWhen Joseph awoke, he did as the angel of the Lord had commanded him and took his wife into his home.`
    },
    reflection: {
      author: 'St. Bernardine of Siena and St. Teresa of Ávila',
      title: 'Go to Joseph: Guardian of the Redeemer and Protector of the Church',
      content: `In reverent silence and immediate obedience, St. Joseph guarded the Virgin Mother and the Incarnate Word. St. Teresa of Ávila testifies: "I have never known anyone to be truly devoted to St. Joseph and fail to advance rapidly in virtue."`
    }
  },
  '03-25': {
    firstReading: {
      citation: 'Isaiah 7:10-14; 8:10',
      theme: 'The virgin shall be with child, and bear a son, and shall name him Emmanuel',
      text: `The LORD spoke to Ahaz, saying: Ask for a sign from the LORD, your God... Therefore the Lord himself will give you this sign: the virgin shall be with child, and bear a son, and shall name him Emmanuel, which means "God is with us!"`
    },
    responsorialPsalm: {
      citation: 'Psalm 40:7-8a, 8b-9, 10, 11',
      antiphon: 'Here am I, Lord; I come to do your will.',
      verses: [
        'Sacrifice or oblation you wished not, but ears open to obedience you gave me. Holocausts or sin-offerings you sought not; then said I, "Behold I come."',
        '"In the written scroll it is prescribed for me, to do your will, O my God, is my delight, and your law is within my heart!"',
        'I announced your justice in the vast assembly; I did not restrain my lips, as you, O LORD, know.'
      ]
    },
    secondReading: {
      citation: 'Hebrews 10:4-10',
      text: `Brothers and sisters: It is impossible that the blood of bulls and goats take away sins. For this reason, when Christ came into the world, he said: "Sacrifice and offering you did not desire, but a body you prepared for me... Behold, I come to do your will, O God."`
    },
    alleluia: {
      verse: 'The Word of God became flesh and made his dwelling among us; and we saw his glory.'
    },
    gospel: {
      citation: 'Luke 1:26-38',
      text: `The angel Gabriel was sent from God to a town of Galilee called Nazareth, to a virgin betrothed to a man named Joseph, of the house of David, and the virgin's name was Mary. And coming to her, he said, "Hail, full of grace! The Lord is with you."... "Behold, you will conceive in your womb and bear a son, and you shall name him Jesus... The Holy Spirit will come upon you, and the power of the Most High will overshadow you. Therefore the child to be born will be called holy, the Son of God."\n\nMary said, "Behold, I am the handmaid of the Lord. May it be done to me according to your word." Then the angel departed from her.`
    },
    reflection: {
      author: 'St. Bernard of Clairvaux',
      title: 'The Virgin\'s Fiat and the Dawn of Redemption',
      content: `All heaven and earth held their breath awaiting Mary's answer. By her humble "Fiat"—"Let it be done to me according to your word"—the Eternal Word took flesh in her Immaculate Womb, uniting heaven and earth forever.`
    }
  },
  '06-24': {
    firstReading: {
      citation: 'Isaiah 49:1-6',
      theme: 'The LORD called me from birth; I will make you a light to the nations',
      text: `Hear me, O coastlands, listen, O distant peoples. The LORD called me from birth, from my mother's womb he gave me my name. He made of me a sharp-edged sword and concealed me in the shadow of his arm... I will make you a light to the nations, that my salvation may reach to the ends of the earth.`
    },
    responsorialPsalm: {
      citation: 'Psalm 139:1b-3, 13-14ab, 14c-15',
      antiphon: 'I praise you, for I am wonderfully made.',
      verses: [
        'O LORD, you have probed me, you know me: you know when I sit and when I stand; you understand my thoughts from afar.',
        'Truly you have formed my inmost being; you knit me in my mother\'s womb. I give you thanks that I am fearfully, wonderfully made; wonderful are your works.',
        'My soul also you knew full well; nor was my frame unknown to you when I was made in secret.'
      ]
    },
    secondReading: {
      citation: 'Acts 13:22-26',
      text: `As John was completing his course, he would say, 'What do you suppose that I am? I am not he. Behold, one is coming after me; I am not worthy to unfasten the sandals of his feet.'`
    },
    alleluia: {
      verse: 'You, child, will be called prophet of the Most High, for you will go before the Lord to prepare his ways.'
    },
    gospel: {
      citation: 'Luke 1:57-66, 80',
      text: `When the time arrived for Elizabeth to have her child she gave birth to a son... They made signs, asking his father what he wished him to be called. He asked for a tablet and wrote, "John is his name," and all were amazed. Immediately his mouth was opened, his tongue freed, and he spoke blessing God... The child grew and became strong in spirit, and he was in the desert until the day of his manifestation to Israel.`
    },
    reflection: {
      author: 'St. Augustine of Hippo',
      title: 'The Voice Preparing the Way for the Eternal Word',
      content: `John the Baptist is the Voice crying in the wilderness; Jesus Christ is the Eternal Word. The Voice goes before so that the Word may enter the hearts of the listeners.`
    }
  },
  '06-29': {
    firstReading: {
      citation: 'Acts 12:1-11',
      theme: 'Now I know for certain that the Lord sent His angel and rescued me',
      text: `In those days, King Herod laid hands upon some members of the church to harm them... So Peter was being kept in prison, but prayer by the church was fervently being made to God on his behalf. On the very night before Herod was to bring him to trial, Peter, secured by double chains, was sleeping between two soldiers... And behold, the angel of the Lord stood by him and a light shone in the cell. He tapped Peter on the side and awakened him, saying, "Get up quickly." The chains fell from his wrists.`
    },
    responsorialPsalm: {
      citation: 'Psalm 34:2-3, 4-5, 6-7, 8-9',
      antiphon: 'The angel of the Lord will rescue those who fear him.',
      verses: [
        'I will bless the LORD at all times; his praise shall be ever in my mouth. Let my soul glory in the LORD; the lowly will hear me and be glad.',
        'Glorify the LORD with me, let us together extol his name. I sought the LORD, and he answered me and delivered me from all my fears.',
        'The angel of the LORD encamps around those who fear him, and delivers them. Taste and see how good the LORD is; blessed the man who takes refuge in him.'
      ]
    },
    secondReading: {
      citation: '2 Timothy 4:6-8, 17-18',
      text: `I, Paul, am already being poured out like a libation, and the time of my departure is at hand. I have competed well; I have finished the race; I have kept the faith. From now on the crown of righteousness awaits me, which the Lord, the just judge, will award to me on that day.`
    },
    alleluia: {
      verse: 'You are Peter and upon this rock I will build my Church, and the gates of the netherworld shall not prevail against it.'
    },
    gospel: {
      citation: 'Matthew 16:13-19',
      text: `When Jesus went into the region of Caesarea Philippi he asked his disciples, "Who do people say that the Son of Man is?"... Simon Peter said in reply, "You are the Christ, the Son of the living God." Jesus said to him in reply, "Blessed are you, Simon son of Jonah. For flesh and blood has not revealed this to you, but my heavenly Father. And so I say to you, you are Peter, and upon this rock I will build my Church, and the gates of the netherworld shall not prevail against it. I will give you the keys to the Kingdom of heaven. Whatever you bind on earth shall be bound in heaven; and whatever you loose on earth shall be loosed in heaven."`
    },
    reflection: {
      author: 'Pope St. Leo the Great',
      title: 'Peter the Rock and Paul the Vessel of Election',
      content: `Precious in the eyes of the Lord is the martyrdom of Saints Peter and Paul, who planted the Church of Rome with their blood and remain the twin apostolic pillars of Catholic faith and unity.`
    }
  },
  '08-06': {
    firstReading: {
      citation: 'Daniel 7:9-10, 13-14',
      theme: 'His clothing was snow bright, and one like a Son of Man received dominion and glory',
      text: `As I watched: Thrones were set up and the Ancient One took his throne. His clothing was bright as snow, and the hair on his head as white as wool... One like a Son of man received dominion, glory, and kingship; all peoples, nations, and languages serve him.`
    },
    responsorialPsalm: {
      citation: 'Psalm 97:1-2, 5-6, 9',
      antiphon: 'The Lord is king, the Most High over all the earth.',
      verses: [
        'The LORD is king; let the earth rejoice; let the many islands be glad. Clouds and darkness are round about him, justice and judgment are the foundation of his throne.',
        'The mountains melt like wax before the LORD, before the LORD of all the earth. The heavens proclaim his justice, and all peoples see his glory.',
        'Because you, O LORD, are the Most High over all the earth, exalted far above all gods.'
      ]
    },
    secondReading: {
      citation: '2 Peter 1:16-19',
      text: `Beloved: We did not follow cleverly devised myths when we made known to you the power and coming of our Lord Jesus Christ, but we had been eyewitnesses of his majesty. For he received honor and glory from God the Father when that unique declaration came to him from the majestic glory, "This is my Son, my beloved, with whom I am well pleased." We ourselves heard this voice come from heaven while we were with him on the holy mountain.`
    },
    alleluia: {
      verse: 'This is my beloved Son, with whom I am well pleased; listen to him.'
    },
    gospel: {
      citation: 'Matthew 17:1-9',
      text: `Jesus took Peter, James, and his brother, John, and led them up a high mountain by themselves. And he was transfigured before them; his face shone like the sun and his clothes became white as light. And behold, Moses and Elijah appeared to them, conversing with him. Then Peter said to Jesus in reply, "Lord, it is good that we are here..." While he was still speaking, behold, a bright cloud cast a shadow over them, then from the cloud came a voice that said, "This is my beloved Son, with whom I am well pleased; listen to him."`
    },
    reflection: {
      author: 'St. John Damascene and St. Thomas Aquinas',
      title: 'The Uncreated Light of Tabor Shining Through Christ\'s Humanity',
      content: `On Mount Tabor, Jesus revealed a glimpse of His divine glory to fortify His disciples before the scandal of the Cross, showing that the way of the Cross leads to the splendor of the Resurrection.`
    }
  },
  '08-15': {
    firstReading: {
      citation: 'Revelation 11:19a; 12:1-6a, 10ab',
      theme: 'A great sign appeared in the sky, a woman clothed with the sun',
      text: `God's temple in heaven was opened, and the ark of his covenant could be seen in the temple. A great sign appeared in the sky, a woman clothed with the sun, with the moon under her feet, and on her head a crown of twelve stars... Then I heard a loud voice in heaven say: "Now have salvation and power come, and the Kingdom of our God and the authority of his Anointed."`
    },
    responsorialPsalm: {
      citation: 'Psalm 45:10, 11, 12, 16',
      antiphon: 'The queen stands at your right hand, arrayed in gold.',
      verses: [
        'The queen takes her place at your right hand in gold of Ophir. Hear, O daughter, and see; turn your ear, forget your people and your father\'s house.',
        'So shall the king desire your beauty; for he is your lord, and you must do him homage.',
        'They are borne in with gladness and joy; they enter the palace of the king.'
      ]
    },
    secondReading: {
      citation: '1 Corinthians 15:20-27',
      text: `Brothers and sisters: Christ has been raised from the dead, the firstfruits of those who have fallen asleep. For since death came through man, the resurrection of the dead came also through man. For just as in Adam all die, so too in Christ shall all be brought to life, but each one in proper order: Christ the firstfruits; then, at his coming, those who belong to Christ.`
    },
    alleluia: {
      verse: 'Mary is taken up to heaven; a chorus of angels exults!'
    },
    gospel: {
      citation: 'Luke 1:39-56',
      text: `Mary set out and traveled to the hill country in haste to a town of Judah, where she entered the house of Zechariah and greeted Elizabeth. When Elizabeth heard Mary's greeting, the infant leaped in her womb, and Elizabeth, filled with the Holy Spirit, cried out in a loud voice and said, "Blessed are you among women, and blessed is the fruit of your womb..."\n\nAnd Mary said: "My soul proclaims the greatness of the Lord; my spirit rejoices in God my Savior, for he has looked with favor on his lowly servant. From this day all generations will call me blessed: the Almighty has done great things for me, and holy is his Name."`
    },
    reflection: {
      author: 'St. John Damascene and Pope Pius XII',
      title: 'The Ark of the New Covenant Enters the Heavenly Sanctuary',
      content: `It was fitting that she who preserved her virginity intact in childbirth, and whose womb was the living Tabernacle of the Incarnate Word, should be preserved from the corruption of the grave and assumed body and soul into heavenly glory.`
    }
  },
  '09-14': {
    firstReading: {
      citation: 'Numbers 21:4b-9',
      theme: 'Whenever anyone who had been bitten looked at the bronze serpent, he lived',
      text: `With their patience worn out by the journey, the people complained against God and Moses... So the LORD said to Moses, "Make a saraph and mount it on a pole, and if any who have been bitten look at it, they will live." Moses accordingly made a bronze serpent and mounted it on a pole, and whenever anyone who had been bitten by a serpent looked at the bronze serpent, he lived.`
    },
    responsorialPsalm: {
      citation: 'Psalm 78:1bc-2, 34-35, 36-37, 38',
      antiphon: 'Do not forget the works of the Lord!',
      verses: [
        'Hearken, my people, to my teaching; incline your ears to the words of my mouth. I will open my mouth in a parable, I will utter mysteries from of old.',
        'While he slew them they sought him and inquired after God again, Remembering that God was their rock and the Most High God, their redeemer.',
        'But he, being merciful, forgave their sin and destroyed them not; often he turned back his anger and let none of his wrath be roused.'
      ]
    },
    secondReading: {
      citation: 'Philippians 2:6-11',
      text: `Christ Jesus, though he was in the form of God, did not regard equality with God something to be grasped. Rather, he emptied himself, taking the form of a slave... becoming obedient to the point of death, even death on a cross. Because of this, God greatly exalted him.`
    },
    alleluia: {
      verse: 'We adore you, O Christ, and we bless you, because by your Cross you have redeemed the world.'
    },
    gospel: {
      citation: 'John 3:13-17',
      text: `Jesus said to Nicodemus: "No one has gone up to heaven except the one who has come down from heaven, the Son of Man. And just as Moses lifted up the serpent in the desert, so must the Son of Man be lifted up, so that everyone who believes in him may have eternal life.\n\nFor God so loved the world that he gave his only Son, so that everyone who believes in him might not perish but might have eternal life. For God did not send his Son into the world to condemn the world, but that the world might be saved through him."`
    },
    reflection: {
      author: 'St. Andrew of Crete',
      title: 'Ave Crux, Spes Unica — Hail the Cross, Our Only Hope!',
      content: `Had there been no Cross, Christ could not have been crucified; had there been no Cross, Life Himself could not have been nailed to the tree and the streams of immortality—Blood and Water—would not have poured forth to cleanse the world.`
    }
  },
  '11-01': {
    firstReading: {
      citation: 'Revelation 7:2-4, 9-14',
      theme: 'After this I had a vision of a great multitude, which no one could count, from every nation',
      text: `I, John, saw another angel come up from the East, holding the seal of the living God... After this I had a vision of a great multitude, which no one could count, from every nation, race, people, and tongue. They stood before the throne and before the Lamb, wearing white robes and holding palm branches in their hands. They cried out in a loud voice: "Salvation comes from our God, who is seated on the throne, and from the Lamb."`
    },
    responsorialPsalm: {
      citation: 'Psalm 24:1bc-2, 3-4ab, 5-6',
      antiphon: 'Lord, this is the people that longs to see your face.',
      verses: [
        'The LORD\'s are the earth and its fullness; the world and those who dwell in it. For he founded it upon the seas and established it upon the rivers.',
        'Who can ascend the mountain of the LORD? or who may stand in his holy place? One whose hands aresinless, whose heart is clean, who desires not what is vain.',
        'He shall receive a blessing from the LORD, a reward from God his savior. Such is the race that seeks for him, that seeks the face of the God of Jacob.'
      ]
    },
    secondReading: {
      citation: '1 John 3:1-3',
      text: `Beloved: See what love the Father has bestowed on us that we may be called the children of God. Yet so we are. The reason the world does not know us is that it did not know him. Beloved, we are God's children now; what we shall be has not yet been revealed. We do know that when it is revealed we shall be like him, for we shall see him as he is.`
    },
    alleluia: {
      verse: 'Come to me, all you who labor and are burdened, and I will give you rest, says the Lord.'
    },
    gospel: {
      citation: 'Matthew 5:1-12a',
      text: `When Jesus saw the crowds, he went up the mountain, and after he had sat down, his disciples came to him. He began to teach them, saying:\n"Blessed are the poor in spirit, for theirs is the Kingdom of heaven.\nBlessed are they who mourn, for they will be comforted.\nBlessed are the meek, for they will inherit the land.\nBlessed are they who hunger and thirst for righteousness, for they will be satisfied.\nBlessed are the merciful, for they will be shown mercy.\nBlessed are the clean of heart, for they will see God.\nBlessed are the peacemakers, for they will be called children of God.\nBlessed are they who are persecuted for the sake of righteousness, for theirs is the Kingdom of heaven.\nRejoice and be glad, for your reward will be great in heaven."`
    },
    reflection: {
      author: 'St. Bernard of Clairvaux and St. Augustine',
      title: 'The Communion of Saints and the Charter of the Beatitudes',
      content: `Today we lift our eyes to the Church Triumphant—that countless multitude washed in the Blood of the Lamb who lived the Beatitudes on earth and now behold the Beatific Vision face to face. Their intercession surrounds us at every Mass.`
    }
  },
  '11-02': {
    firstReading: {
      citation: 'Wisdom 3:1-9',
      theme: 'The souls of the just are in the hand of God, and no torment shall touch them',
      text: `The souls of the just are in the hand of God, and no torment shall touch them. They seemed, in the view of the foolish, to be dead; and their passing away was thought an affliction and their going forth from us, utter destruction. But they are in peace. For if before men, indeed, they be punished, yet is their hope full of immortality; chastised a little, they shall be greatly blessed, because God tried them and found them worthy of himself. As gold in the furnace, he proved them, and as sacrificial offerings he took them to himself.`
    },
    responsorialPsalm: {
      citation: 'Psalm 23:1-3a, 3b-4, 5, 6',
      antiphon: 'The Lord is my shepherd; there is nothing I shall want.',
      verses: [
        'The LORD is my shepherd; I shall not want. In verdant pastures he gives me repose; beside restful waters he leads me; he refreshes my soul.',
        'He guides me in right paths for his name\'s sake. Even though I walk in the dark valley I fear no evil; for you are at my side with your rod and your staff that give me courage.',
        'You spread the table before me in the sight of my foes; you anoint my head with oil; my cup overflows. Only goodness and kindness follow me all the days of my life; and I shall dwell in the house of the LORD for years to come.'
      ]
    },
    secondReading: {
      citation: 'Romans 6:3-9',
      text: `Brothers and sisters: Are you unaware that we who were baptized into Christ Jesus were baptized into his death? We were indeed buried with him through baptism into death, so that, just as Christ was raised from the dead by the glory of the Father, we too might live in newness of life.`
    },
    alleluia: {
      verse: 'This is the will of my Father, says the Lord, that everyone who sees the Son and believes in him may have eternal life.'
    },
    gospel: {
      citation: 'John 6:37-40',
      text: `Jesus said to the crowds: "Everything that the Father gives me will come to me, and I will not reject anyone who comes to me, because I came down from heaven not to do my own will but the will of the one who sent me. And this is the will of the one who sent me, that I should not lose anything of what he gave me, but that I should raise it on the last day. For this is the will of my Father, that everyone who sees the Son and believes in him may have eternal life, and I shall raise him on the last day."`
    },
    reflection: {
      author: 'St. Odilo of Cluny and St. Catherine of Genoa',
      title: 'Suffrages of Love for the Holy Souls in Purgatory',
      content: `"Eternal rest grant unto them, O Lord, and let perpetual light shine upon them!" Through the Holy Sacrifice of the Mass, almsgiving, and indulgenced prayers, the Church Militant hastens the purification of the Church Suffering.`
    }
  },
  '11-09': {
    firstReading: {
      citation: 'Ezekiel 47:1-2, 8-9, 12',
      theme: 'I saw water flowing out from beneath the threshold of the temple',
      text: `The angel brought me back to the entrance of the temple, and I saw water flowing out from beneath the threshold of the temple toward the east... Wherever the river flows, every sort of living creature that can multiply shall live, and there shall be abundant fish, for wherever this water comes the sea shall be made fresh.`
    },
    responsorialPsalm: {
      citation: 'Psalm 46:2-3, 5-6, 8-9',
      antiphon: 'The waters of the river gladden the city of God, the holy dwelling of the Most High!',
      verses: [
        'God is our refuge and our strength, an ever-present help in distress. Therefore we fear not, though the earth be shaken and mountains plunge into the depths of the sea.',
        'There is a stream whose runlets gladden the city of God, the holy dwelling of the Most High. God is in its midst; it shall not be disturbed.',
        'The LORD of hosts is with us; our stronghold is the God of Jacob. Come! behold the deeds of the LORD.'
      ]
    },
    secondReading: {
      citation: '1 Corinthians 3:9c-11, 16-17',
      text: `Brothers and sisters: You are God's building. According to the grace of God given to me, like a wise master builder I laid a foundation... Do you not know that you are the temple of God, and that the Spirit of God dwells in you? If anyone destroys God's temple, God will destroy that person; for the temple of God, which you are, is holy.`
    },
    alleluia: {
      verse: 'I have chosen and consecrated this house, says the Lord, that my name may be there forever.'
    },
    gospel: {
      citation: 'John 2:13-22',
      text: `Since the Passover of the Jews was near, Jesus went up to Jerusalem. He found in the temple area those who sold oxen, sheep, and doves, as well as the money-changers seated there. He made a whip out of cords and drove them all out of the temple area... "Stop making my Father's house a marketplace." His disciples recalled the words of Scripture, "Zeal for your house will consume me."\n\nAt this the Jews answered and said to him, "What sign can you show us for doing this?" Jesus answered and said to them, "Destroy this temple and in three days I will raise it up."... But he was speaking about the temple of his body.`
    },
    reflection: {
      author: 'St. Caesarius of Arles',
      title: 'The Mother and Head of All Churches — And the Temple of the Soul',
      content: `Celebrating the dedication of the Archbasilica of St. John Lateran, cathedral of the Bishop of Rome, the Liturgy reminds us that while Christ is adored in churches of stone, every baptized soul is consecrated to be a living temple of the Holy Spirit.`
    }
  },
  '12-08': {
    firstReading: {
      citation: 'Genesis 3:9-15, 20',
      theme: 'I will put enmity between you and the woman, and between your offspring and hers',
      text: `After the man, Adam, had eaten of the tree, the LORD God called to the man and asked him, "Where are you?"... Then the LORD God said to the serpent: "Because you have done this, you shall be banned from all the animals... I will put enmity between you and the woman, and between your offspring and hers; he will strike at your head, while you strike at his heel."`
    },
    responsorialPsalm: {
      citation: 'Psalm 98:1, 2-3ab, 3cd-4',
      antiphon: 'Sing to the Lord a new song, for he has done marvelous deeds.',
      verses: [
        'Sing to the LORD a new song, for he has done wondrous deeds; His right hand has won victory for him, his holy arm.',
        'The LORD has made his salvation known: in the sight of the nations he has revealed his justice. He has remembered his kindness and his faithfulness toward the house of Israel.',
        'All the ends of the earth have seen the salvation by our God. Sing joyfully to the LORD, all you lands; break into song; sing praise.'
      ]
    },
    secondReading: {
      citation: 'Ephesians 1:3-6, 11-12',
      text: `Blessed be the God and Father of our Lord Jesus Christ, who has blessed us in Christ with every spiritual blessing in the heavens, as he chose us in him, before the foundation of the world, to be holy and without blemish before him.`
    },
    alleluia: {
      verse: 'Hail, Mary, full of grace, the Lord is with you; blessed are you among women.'
    },
    gospel: {
      citation: 'Luke 1:26-38',
      text: `The angel Gabriel was sent from God to a town of Galilee called Nazareth, to a virgin betrothed to a man named Joseph, of the house of David, and the virgin's name was Mary. And coming to her, he said, "Hail, full of grace! The Lord is with you."... Mary said, "Behold, I am the handmaid of the Lord. May it be done to me according to your word."`
    },
    reflection: {
      author: 'Blessed John Duns Scotus and St. Maximilian Kolbe',
      title: 'Tota Pulchra Es, Maria — Conceived Without Original Sin',
      content: `By a singular privilege and grace of Almighty God, in view of the foreseen merits of Jesus Christ the Savior of the human race, the Blessed Virgin Mary was preserved immune from all stain of original sin from the first instant of her conception.`
    }
  },
  '12-12': {
    firstReading: {
      citation: 'Zechariah 2:14-17',
      theme: 'Sing and rejoice, O daughter Zion! See, I am coming to dwell among you',
      text: `Sing and rejoice, O daughter Zion! See, I am coming to dwell among you, says the LORD. Many nations shall join themselves to the LORD on that day, and they shall be his people, and he will dwell among you.`
    },
    responsorialPsalm: {
      citation: 'Judith 13:18bcde, 19',
      antiphon: 'You are the highest honor of our race.',
      verses: [
        'Blessed are you, daughter, by the Most High God, above all the women on earth; and blessed be the LORD God, the creator of heaven and earth.',
        'Your deed of hope will never be forgotten by those who tell of the might of God.'
      ]
    },
    alleluia: {
      verse: 'Blessed are you, holy Virgin Mary, deserving of all praise; from you rose the sun of justice, Christ our God.'
    },
    gospel: {
      citation: 'Luke 1:39-47',
      text: `Mary set out and traveled to the hill country in haste to a town of Judah, where she entered the house of Zechariah and greeted Elizabeth. When Elizabeth heard Mary's greeting, the infant leaped in her womb, and Elizabeth, filled with the Holy Spirit, cried out in a loud voice and said, "Most blessed are you among women, and blessed is the fruit of your womb. And how does this happen to me, that the mother of my Lord should come to me?"`
    },
    reflection: {
      author: 'St. Juan Diego and Pope St. John Paul II',
      title: 'Am I Not Here, I Who Have the Honor to Be Your Mother?',
      content: `At Tepeyac in 1531, Our Lady of Guadalupe imprinted her miraculous portrait upon the tilma of St. Juan Diego, bringing millions of souls to the Baptismal font and the Eucharistic Altar.`
    }
  },
  '12-25': {
    firstReading: {
      citation: 'Isaiah 9:1-6',
      theme: 'A child is born to us, a son is given to us; upon his shoulder dominion rests',
      text: `The people who walked in darkness have seen a great light; upon those who dwelt in the land of gloom a light has shone... For a child is born to us, a son is given to us; upon his shoulder dominion rests. They name him Wonder-Counselor, God-Hero, Father-Forever, Prince of Peace. His dominion is vast and forever peaceful, from David's throne, and over his kingdom, which he confirms and sustains by judgment and justice, both now and forever.`
    },
    responsorialPsalm: {
      citation: 'Psalm 96:1-2, 2-3, 11-12, 13',
      antiphon: 'Today is born our Savior, Christ the Lord.',
      verses: [
        'Sing to the LORD a new song; sing to the LORD, all you lands. Sing to the LORD; bless his name.',
        'Announce his salvation, day after day. Tell his glory among the nations; among all peoples, his wondrous deeds.',
        'Let the heavens be glad and the earth rejoice; let the sea and what fills it resound; let the plains be joyful and all that is in them!'
      ]
    },
    secondReading: {
      citation: 'Titus 2:11-14',
      text: `Beloved: The grace of God has appeared, saving all and training us to reject godless ways and worldly desires and to live temperately, justly, and devoutly in this age, as we await the blessed hope, the appearance of the glory of our great God and savior Jesus Christ.`
    },
    alleluia: {
      verse: 'I proclaim to you good news of great joy: today a Savior is born for us, Christ the Lord. Alleluia!'
    },
    gospel: {
      citation: 'Luke 2:1-14 (and John 1:1-18)',
      text: `In those days a decree went out from Caesar Augustus that the whole world should be enrolled... And Joseph too went up from Galilee from the town of Nazareth to Judea, to the city of David that is called Bethlehem, because he was of the house and family of David, to be enrolled with Mary, his betrothed, who was with child. While they were there, the time came for her to have her child, and she gave birth to her firstborn son. She wrapped him in swaddling clothes and laid him in a manger, because there was no room for them in the inn.\n\nAnd suddenly there was a multitude of the heavenly host with the angel, praising God and saying: "Glory to God in the highest and on earth peace to those on whom his favor rests."`
    },
    reflection: {
      author: 'Pope St. Leo the Great and St. Bernard of Clairvaux',
      title: 'The Word Was Made Flesh and Laid in the Manger of Bethlehem',
      content: `In Bethlehem ("House of Bread"), the Eternal Word of the Father, born of the Virgin Mary, is laid in a manger so that He may become the Living Bread upon our altars. "Christian, recognize your dignity!"`
    }
  }
};

// Seasonal & Lectionary-Cycle Rotating Readings Pool for 2026–2030+
const ADVENT_READINGS_POOL: LectionaryTemplate[] = [
  {
    firstReading: {
      citation: 'Isaiah 2:1-5',
      theme: 'The Lord will gather all nations into the eternal peace of God\'s Kingdom',
      text: `This is what Isaiah, son of Amoz, saw concerning Judah and Jerusalem. In days to come, the mountain of the LORD's house shall be established as the highest mountain and raised above the hills. All nations shall stream toward it; many peoples shall come and say: "Come, let us climb the LORD's mountain, to the house of the God of Jacob, that he may instruct us in his ways, and we may walk in his paths."... O house of Jacob, come, let us walk in the light of the LORD!`
    },
    responsorialPsalm: {
      citation: 'Psalm 122:1-2, 3-4b, 4cd-5, 6-7, 8-9',
      antiphon: 'Let us go rejoicing to the house of the Lord.',
      verses: [
        'I rejoiced because they said to me, "We will go up to the house of the LORD." And now we have set foot within your gates, O Jerusalem.',
        'To it the tribes go up, the tribes of the LORD, according to the decree for Israel, to give thanks to the name of the LORD.',
        'Pray for the peace of Jerusalem! May those who love you prosper! May peace be within your walls, prosperity in your buildings.'
      ]
    },
    alleluia: {
      verse: 'Come and save us, LORD our God; let your face shine upon us, that we may be saved.'
    },
    gospel: {
      citation: 'Matthew 8:5-11',
      text: `When Jesus entered Capernaum, a centurion approached him and appealed to him, saying, "Lord, my servant is lying at home paralyzed, suffering dreadfully." He said to him, "I will come and cure him." The centurion said in reply, "Lord, I am not worthy to have you enter under my roof; only say the word and my servant will be healed..." When Jesus heard this, he was amazed and said to those following him, "Amen, I say to you, in no one in Israel have I found such faith."`
    },
    reflection: {
      author: 'St. Augustine and St. John Chrysostom',
      title: 'Lord, I Am Not Worthy That You Should Enter Under My Roof',
      content: `While the centurion confessed himself unworthy to welcome Christ beneath his roof of stone, by that very humility he became worthy to welcome Christ into the sanctuary of his heart. Every time we approach Holy Communion, the Church places the centurion's prayer upon our lips.`
    }
  },
  {
    firstReading: {
      citation: 'Isaiah 11:1-10',
      theme: 'A shoot shall sprout from the stump of Jesse, and the Spirit of the LORD shall rest upon him',
      text: `On that day, a shoot shall sprout from the stump of Jesse, and from his roots a bud shall blossom. The Spirit of the LORD shall rest upon him: a Spirit of wisdom and of understanding, a Spirit of counsel and of strength, a Spirit of knowledge and of fear of the LORD, and his delight shall be the fear of the LORD. Not by appearance shall he judge, nor by hearsay shall he decide, but he shall judge the poor with justice.`
    },
    responsorialPsalm: {
      citation: 'Psalm 72:1-2, 7-8, 12-13, 17',
      antiphon: 'Justice shall flourish in his time, and fullness of peace for ever.',
      verses: [
        'O God, with your judgment endow the king, and with your justice, the king\'s son; He shall govern your people with justice and your afflicted ones with judgment.',
        'Justice shall flower in his days, and profound peace, till the moon be no more. May he rule from sea to sea, and from the River to the ends of the earth.',
        'May his name be blessed forever; as long as the sun his name shall remain. In him shall all the tribes of the earth be blessed.'
      ]
    },
    alleluia: {
      verse: 'Prepare the way of the Lord, make straight his paths: all flesh shall see the salvation of God.'
    },
    gospel: {
      citation: 'Luke 10:21-24',
      text: `At that very moment Jesus rejoiced in the Holy Spirit and said, "I give you praise, Father, Lord of heaven and earth, for although you have hidden these things from the wise and the learned you have revealed them to the childlike. Yes, Father, such has been your gracious will. All things have been handed over to me by my Father. No one knows who the Son is except the Father, and who the Father is except the Son and anyone to whom the Son wishes to reveal him."\n\nTurning to the disciples in private he said, "Blessed are the eyes that see what you see. For I say to you, many prophets and kings desired to see what you see, but did not see it, and to hear what you hear, but did not hear it."`
    },
    reflection: {
      author: 'St. Ambrose and St. Jerome',
      title: 'The Flower of Jesse and the Seven Gifts of the Holy Spirit',
      content: `As St. Jerome explains, the root is the house of David, the rod rising from the root is the Blessed Virgin Mary, and the Flower blossoming from the rod is Our Lord Jesus Christ, upon whom rests the fullness of the sevenfold Spirit.`
    }
  },
  {
    firstReading: {
      citation: 'Isaiah 35:1-6a, 10',
      theme: 'Be strong, fear not! Here is your God, He comes to save you',
      text: `The desert and the parched land will exult; the steppe will rejoice and bloom. They will bloom with abundant flowers, and rejoice with joyful song... Say to those whose hearts are frightened: Be strong, fear not! Here is your God, he comes with vindication; with divine recompense he comes to save you. Then will the eyes of the blind be opened, the ears of the deaf be cleared; then will the lame leap like a stag, then the tongue of the mute will sing.`
    },
    responsorialPsalm: {
      citation: 'Psalm 146:6-7, 8-9a, 9bc-10',
      antiphon: 'Lord, come and save us.',
      verses: [
        'The LORD God keeps faith forever, secures justice for the oppressed, gives food to the hungry. The LORD sets captives free.',
        'The LORD gives sight to the blind; the LORD raises up those who were bowed down. The LORD loves the just; the LORD protects strangers.',
        'The fatherless and the widow he sustains, but the way of the wicked he thwarts. The LORD shall reign forever, your God, O Zion, through all generations.'
      ]
    },
    alleluia: {
      verse: 'The Spirit of the Lord is upon me, because he has anointed me to bring glad tidings to the poor.'
    },
    gospel: {
      citation: 'Matthew 11:2-11',
      text: `When John the Baptist heard in prison of the works of the Christ, he sent his disciples to Jesus with this question, "Are you the one who is to come, or should we look for another?" Jesus said to them in reply, "Go and tell John what you hear and see: the blind regain their sight, the lame walk, lepers are cleansed, the deaf hear, the dead are raised, and the poor have the good news proclaimed to them. And blessed is the one who takes no offense at me."`
    },
    reflection: {
      author: 'St. Hilary of Poitiers and St. Gregory the Great',
      title: 'Rejoice in the Lord Always: The Signs of the Messianic Kingdom',
      content: `In the midst of Advent vigilance, Christ points to His works of mercy and healing as the unmistakable proof of His divinity. He comes today to open our spiritual eyes and raise our souls to newness of life.`
    }
  }
];

const LENT_READINGS_POOL: LectionaryTemplate[] = [
  {
    firstReading: {
      citation: 'Isaiah 55:10-11',
      theme: 'My word shall not return to me void, but shall do my will, achieving the end for which I sent it',
      text: `Thus says the LORD: Just as from the heavens the rain and snow come down and do not return there till they have watered the earth, making it fertile and fruitful, giving seed to the one who sows and bread to the one who eats, so shall my word be that goes forth from my mouth; it shall not return to me void, but shall do my will, achieving the end for which I sent it.`
    },
    responsorialPsalm: {
      citation: 'Psalm 34:4-5, 6-7, 16-17, 18-19',
      antiphon: 'From all their distress God rescues the just.',
      verses: [
        'Glorify the LORD with me, let us together extol his name. I sought the LORD, and he answered me and delivered me from all my fears.',
        'Look to him that you may be radiant with joy, and your faces may not blush with shame. When the poor one called out, the LORD heard, and from all his distress he saved him.',
        'The LORD is close to the brokenhearted; and those who are crushed in spirit he saves.'
      ]
    },
    alleluia: {
      verse: 'Praise to you, Lord Jesus Christ, King of endless glory! One does not live on bread alone, but on every word that comes forth from the mouth of God.'
    },
    gospel: {
      citation: 'Matthew 6:7-15',
      text: `Jesus said to his disciples: "In praying, do not babble like the pagans, who think that they will be heard because of their many words. Do not be like them. Your Father knows what you need before you ask him.\n\nThis is how you are to pray:\nOur Father who art in heaven, hallowed be thy name, thy Kingdom come, thy will be done, on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses, as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil."`
    },
    reflection: {
      author: 'St. Cyprian of Carthage and St. Thomas Aquinas',
      title: 'The Lord\'s Prayer: Breviary of the Entire Gospel',
      content: `What prayer can be more spiritual than that which was given to us by Christ, by whom the Holy Spirit was also sent to us? When we pray "Give us this day our daily supersubstantial bread," we ask both for our daily sustenance and for the Living Bread of the Holy Eucharist.`
    }
  },
  {
    firstReading: {
      citation: 'Ezekiel 18:21-28',
      theme: 'Do I indeed derive any pleasure from the death of the wicked? says the Lord GOD',
      text: `Thus says the Lord GOD: If the wicked man turns away from all the sins he committed, if he keeps all my statutes and does what is right and just, he shall surely live, he shall not die. None of the crimes he committed shall be remembered against him; he shall live because of the virtue he has practiced. Do I indeed derive any pleasure from the death of the wicked? says the Lord GOD. Do I not rather rejoice when he turns from his evil way that he may live?`
    },
    responsorialPsalm: {
      citation: 'Psalm 130:1-2, 3-4, 5-7a, 7bc-8',
      antiphon: 'If you, O Lord, mark iniquities, who can stand?',
      verses: [
        'Out of the depths I cry to you, O LORD; LORD, hear my voice! Let your ears be attentive to my voice in supplication.',
        'If you, O LORD, mark iniquities, LORD, who can stand? But with you is forgiveness, that you may be revered.',
        'I trust in the LORD; my soul trusts in his word. For with the LORD is kindness and with him is plenteous redemption.'
      ]
    },
    alleluia: {
      verse: 'Praise to you, Lord Jesus Christ, King of endless glory! Cast away from you all the crimes you have committed, says the LORD, and make for yourselves a new heart and a new spirit.'
    },
    gospel: {
      citation: 'Luke 15:11-32',
      text: `Jesus said: "A man had two sons, and the younger son said to his father, 'Father, give me the share of your estate that should come to me.'... Coming to his senses he thought, 'I shall get up and go to my father and I shall say to him, "Father, I have sinned against heaven and against you."' While he was still a long way off, his father caught sight of him, and was filled with compassion. He ran to his son, embraced him and kissed him... 'Let us celebrate with a feast, because this son of mine was dead, and has come to life again; he was lost, and has been found.'"`
    },
    reflection: {
      author: 'St. Ambrose of Milan and St. Augustine',
      title: 'The Father Who Runs to Embrace the Returning Prodigal',
      content: `Notice how, while the prodigal son is still a long way off, the Father catches sight of him and runs to fall upon his neck! He places the first robe of baptismal grace back upon his shoulders, the ring of the Holy Spirit upon his finger, and prepares the Eucharistic banquet of the fatted calf.`
    }
  },
  {
    firstReading: {
      citation: 'Jeremiah 17:5-10',
      theme: 'Blessed is the man who trusts in the LORD, whose hope is the LORD',
      text: `Thus says the LORD: Cursed is the man who trusts in human beings, who seeks his strength in flesh, whose heart turns away from the LORD... Blessed is the man who trusts in the LORD, whose hope is the LORD. He is like a tree planted beside the waters that stretches out its roots to the stream: It fears not the heat when it comes; its leaves stay green; in the year of drought it shows no distress, but still bears fruit.`
    },
    responsorialPsalm: {
      citation: 'Psalm 1:1-2, 3, 4 and 6',
      antiphon: 'Blessed are they who hope in the Lord.',
      verses: [
        'Blessed the man who follows not the counsel of the wicked nor walks in the way of sinners, but delights in the law of the LORD and meditates on his law day and night.',
        'He is like a tree planted near running water, that yields its fruit in due season, and whose leaves never fade.',
        'For the LORD watches over the way of the just, but the way of the wicked vanishes.'
      ]
    },
    alleluia: {
      verse: 'Praise to you, Lord Jesus Christ, King of endless glory! Blessed are they who have kept the word with a generous heart and yield a harvest through perseverance.'
    },
    gospel: {
      citation: 'John 8:1-11',
      text: `Jesus went to the Mount of Olives. But early in the morning he arrived again in the temple area, and all the people started coming to him, and he sat down and taught them. Then the scribes and the Pharisees brought a woman who had been caught in adultery and made her stand in the middle... Jesus bent down and began to write on the ground with his finger. When they continued asking him, he straightened up and said to them, "Let the one among you who is without sin be the first to throw a stone at her."... Then Jesus straightened up and said to her, "Woman, where are they? Has no one condemned you?" She replied, "No one, sir." Then Jesus said, "Neither do I condemn you. Go, and from now on do not sin any more."`
    },
    reflection: {
      author: 'St. Augustine of Hippo (Tractates on John)',
      title: 'Relicta Sunt Duo, Misera et Misericordia — Misery and Mercy Remain Alone',
      content: `All her accusers departed, and only two remained: misery and Mercy (*misera et Misericordia*). Christ hates the sin, yet loves the sinner, lifting her from condemnation and empowering her to walk in holiness: "Go, and from now on sin no more."`
    }
  }
];

const EASTER_READINGS_POOL: LectionaryTemplate[] = [
  {
    firstReading: {
      citation: 'Acts 3:1-10',
      theme: 'In the name of Jesus Christ the Nazorean, rise and walk!',
      text: `Peter and John were going up to the temple area for the three o'clock hour of prayer. And a man crippled from birth was carried and placed at the gate of the temple called "the Beautiful Gate" every day to beg for alms... Peter looked intently at him, as did John, and said, "Look at us." He paid attention to them, expecting to receive something from them. Peter said, "Silver and gold I have none, but what I have I give you: in the name of Jesus Christ the Nazorean, rise and walk." Then Peter took him by the right hand and raised him up, and immediately his feet and ankles grew strong. He leaped up, stood and walked around, and went into the temple with them, walking and jumping and praising God.`
    },
    responsorialPsalm: {
      citation: 'Psalm 105:1-2, 3-4, 6-7, 8-9',
      antiphon: 'Rejoice, O hearts that seek the Lord.',
      verses: [
        'Give thanks to the LORD, invoke his name; make known among the nations his deeds. Sing to him, sing his praise, proclaim all his wondrous deeds.',
        'Glory in his holy name; rejoice, O hearts that seek the LORD! Look to the LORD in his strength; seek to serve him constantly.',
        'He, the LORD, is our God; throughout the earth his judgments prevail. He remembers forever his covenant which he made binding for a thousand generations.'
      ]
    },
    alleluia: {
      verse: 'This is the day the LORD has made; let us be glad and rejoice in it. Alleluia!'
    },
    gospel: {
      citation: 'Luke 24:13-35',
      text: `That very day, the first day of the week, two of Jesus' disciples were going to a village seven miles from Jerusalem called Emmaus, and they were conversing about all the things that had occurred. And it happened that while they were conversing and debating, Jesus himself drew near and walked with them, but their eyes were prevented from recognizing him... And beginning with Moses and all the prophets, he interpreted to them what referred to him in all the Scriptures.\n\nAnd it happened that, while he was with them at table, he took bread, said the blessing, broke it, and gave it to them. With that their eyes were opened and they recognized him, but he vanished from their sight. Then they said to each other, "Were not our hearts burning within us while he spoke to us on the way and opened the Scriptures to us?"`
    },
    reflection: {
      author: 'Pope St. Gregory the Great and St. Augustine',
      title: 'Recognizing the Risen Lord in the Breaking of the Bread',
      content: `On the road to Emmaus, the Risen Christ gives us the structure of every Holy Mass: first He sets our hearts ablaze in the Liturgy of the Word, and then He opens our eyes in the Eucharistic Breaking of the Bread.`
    }
  },
  {
    firstReading: {
      citation: 'Acts 8:26-40',
      theme: 'Philip opened his mouth and, beginning with this Scripture passage, proclaimed Jesus to him',
      text: `The angel of the Lord spoke to Philip, "Get up and head south on the road that goes down from Jerusalem to Gaza, the desert route." So he got up and set out. Now there was an Ethiopian eunuch, a court official of the Candace, who had come to Jerusalem to worship and was returning home. Seated in his chariot, he was reading the prophet Isaiah... Then Philip opened his mouth and, beginning with this Scripture passage, he proclaimed Jesus to him. As they traveled along the road they came to some water, and the eunuch said, "Look, there is water. What is to prevent my being baptized?"`
    },
    responsorialPsalm: {
      citation: 'Psalm 66:8-9, 16-17, 20',
      antiphon: 'Let all the earth cry out to God with joy.',
      verses: [
        'Bless our God, you peoples, loudly sound his praise; He has given life to our souls, and has not let our feet slip.',
        'Hear now, all you who fear God, while I declare what he has done for me. When I appealed to him in words, praise was on the tip of my tongue.',
        'Blessed be God who refused me not my prayer or his kindness!'
      ]
    },
    alleluia: {
      verse: 'I am the living bread that came down from heaven, says the Lord; whoever eats this bread will live forever. Alleluia!'
    },
    gospel: {
      citation: 'John 6:44-51',
      text: `Jesus said to the crowds: "No one can come to me unless the Father who sent me draw him, and I will raise him on the last day. It is written in the prophets: They shall all be taught by God. Everyone who listens to my Father and learns from him comes to me. Not that anyone has seen the Father except the one who is from God; he has seen the Father. Amen, amen, I say to you, whoever believes has eternal life.\n\nI am the bread of life. Your ancestors ate the manna in the desert, but they died; this is the bread that comes down from heaven so that one may eat it and not die. I am the living bread that came down from heaven; whoever eats this bread will live forever; and the bread that I will give is my flesh for the life of the world."`
    },
    reflection: {
      author: 'St. Cyril of Alexandria and St. Hilary of Poitiers',
      title: 'The Living Bread That Gives Immortality to Soul and Body',
      content: `During the Easter Season, the Church proclaims the Bread of Life Discourse from John Chapter 6, teaching us that the Risen Christ feeds us with His own glorified Flesh and Blood as the pledge of our bodily resurrection.`
    }
  },
  {
    firstReading: {
      citation: 'Acts 15:1-6',
      theme: 'The Apostles and presbyters met together to see about this matter',
      text: `Paul and Barnabas and some others of the Church went up to Jerusalem to the Apostles and presbyters about this question. They were sent on their journey by the Church, and passed through Phoenicia and Samaria telling of the conversion of the Gentiles, and brought great joy to all the brethren. When they arrived in Jerusalem, they were welcomed by the Church, as well as by the Apostles and the presbyters, and they reported what God had done with them.`
    },
    responsorialPsalm: {
      citation: 'Psalm 122:1-2, 3-4ab, 4cd-5',
      antiphon: 'Let us go rejoicing to the house of the Lord.',
      verses: [
        'I rejoiced because they said to me, "We will go up to the house of the LORD." And now we have set foot within your gates, O Jerusalem.',
        'Jerusalem, built as a city with compact unity. To it the tribes go up, the tribes of the LORD.',
        'According to the decree for Israel, to give thanks to the name of the LORD. In it are set up judgment seats, seats for the house of David.'
      ]
    },
    alleluia: {
      verse: 'Remain in my love, says the Lord; whoever remains in me and I in him will bear much fruit. Alleluia!'
    },
    gospel: {
      citation: 'John 15:1-8',
      text: `Jesus said to his disciples: "I am the true vine, and my Father is the vine grower. He takes away every branch in me that does not bear fruit, and everyone that does he prunes so that it bears more fruit. You are already pruned because of the word that I spoke to you. Remain in me, as I remain in you. Just as a branch cannot bear fruit on its own unless it remains on the vine, so neither can you unless you remain in me.\n\nI am the vine, you are the branches. Whoever remains in me and I in him will bear much fruit, because without me you can do nothing."`
    },
    reflection: {
      author: 'St. Augustine of Hippo',
      title: 'Abiding in Christ the True Vine Through Sanctifying Grace',
      content: `As the branch draws all its life-giving sap from the vine, so the Christian draws every supernatural virtue from union with Christ through prayer and the Sacraments: "Without Me you can do nothing."`
    }
  }
];

const ORDINARY_TIME_READINGS_POOL: LectionaryTemplate[] = [
  {
    firstReading: {
      citation: 'Ephesians 3:14-21',
      theme: 'Rooted and grounded in love, may you know the love of Christ that surpasses knowledge',
      text: `Brothers and sisters: I kneel before the Father, from whom every family in heaven and on earth is named, that he may grant you in accord with the riches of his glory to be strengthened with power through his Spirit in the inner self, and that Christ may dwell in your hearts through faith; that you, rooted and grounded in love, may have strength to comprehend with all the holy ones what is the breadth and length and height and depth, and to know the love of Christ that surpasses knowledge, so that you may be filled with all the fullness of God.`
    },
    responsorialPsalm: {
      citation: 'Psalm 33:1-2, 4-5, 11-12, 18-19',
      antiphon: 'The earth is full of the goodness of the Lord.',
      verses: [
        'Exult, you just, in the LORD; praise from the upright is fitting. Give thanks to the LORD on the harp; with the ten-stringed lyre chant his praises.',
        'For upright is the word of the LORD, and all his works are trustworthy. He loves justice and right; of the kindness of the LORD the earth is full.',
        'But the plan of the LORD stands forever; the design of his heart, through all generations. Blessed the nation whose God is the LORD.'
      ]
    },
    alleluia: {
      verse: 'I consider all things so much rubbish that I may gain Christ and be found in him.'
    },
    gospel: {
      citation: 'Luke 12:49-53',
      text: `Jesus said to his disciples: "I have come to set the earth on fire, and how I wish it were already blazing! There is a baptism with which I must be baptized, and how great is my anguish until it is accomplished! Do you think that I have come to establish peace on the earth? No, I tell you, but rather division. From now on a household of five will be divided, three against two and two against three."`
    },
    reflection: {
      author: 'St. Cyril of Alexandria and St. Ambrose',
      title: 'The Saving Fire of Divine Charity Cast Upon the Earth',
      content: `The fire that Our Lord longs to see blazing across the earth is the sanctifying flame of the Holy Spirit and evangelical charity, which burns away spiritual lukewarmness and unites the soul to God.`
    }
  },
  {
    firstReading: {
      citation: 'Ephesians 4:1-6',
      theme: 'One Body and one Spirit, one Lord, one faith, one baptism',
      text: `Brothers and sisters: I, a prisoner for the Lord, urge you to live in a manner worthy of the call you have received, with all humility and gentleness, with patience, bearing with one another through love, striving to preserve the unity of the spirit through the bond of peace: one body and one Spirit, as you were also called to the one hope of your call; one Lord, one faith, one baptism; one God and Father of all, who is over all and through all and in all.`
    },
    responsorialPsalm: {
      citation: 'Psalm 24:1-2, 3-4ab, 5-6',
      antiphon: 'Lord, this is the people that longs to see your face.',
      verses: [
        'The LORD\'s are the earth and its fullness; the world and those who dwell in it. For he founded it upon the seas and established it upon the rivers.',
        'Who can ascend the mountain of the LORD? or who may stand in his holy place? He whose hands are sinless, whose heart is clean.',
        'He shall receive a blessing from the LORD, a reward from God his savior. Such is the race that seeks for him.'
      ]
    },
    alleluia: {
      verse: 'Blessed are you, Father, Lord of heaven and earth; you have revealed to little ones the mysteries of the Kingdom.'
    },
    gospel: {
      citation: 'Luke 12:54-59',
      text: `Jesus said to the crowds:\n"When you see a cloud rising in the west you say immediately that it is going to rain—and so it does; and when you notice that the wind is blowing from the south you say that it is going to be hot—and so it is. You hypocrites! You know how to interpret the appearance of the earth and the sky; why do you not know how to interpret the present time?\n\nWhy do you not judge for yourselves what is right? If you are to go with your opponent before a magistrate, make an effort to settle the matter on the way; otherwise your opponent will turn you over to the judge, and the judge hand you over to the constable, and the constable throw you into prison. I say to you, you will not be released until you have paid the last penny."`
    },
    reflection: {
      author: 'St. Augustine and The Venerable Bede',
      title: 'Discerning the Present Time of Mercy and Reconciliation',
      content: `Our Lord reproves those who scrutinize the clouds and winds to predict earthly weather, yet remain blind to the "present time" of salvation ushered in by His Incarnation. While we walk upon the road of this mortal life, Christ urges us to be reconciled with God and our neighbor.`
    }
  },
  {
    firstReading: {
      citation: 'Philippians 1:1-11',
      theme: 'He who began a good work in you will continue to complete it until the day of Christ Jesus',
      text: `Brothers and sisters:\nI give thanks to my God at every remembrance of you, praying always with joy in my every prayer for all of you, because of your partnership for the gospel from the first day until now. I am confident of this, that the one who began a good work in you will continue to complete it until the day of Christ Jesus.\n\nAnd this is my prayer: that your love may increase ever more and more in knowledge and every kind of perception, to discern what is of value, so that you may be pure and blameless for the day of Christ, filled with the fruit of righteousness that comes through Jesus Christ for the glory and praise of God.`
    },
    responsorialPsalm: {
      citation: 'Psalm 111:1-2, 3-4, 5-6',
      antiphon: 'How great are the works of the Lord!',
      verses: [
        'I will give thanks to the LORD with all my heart in the company and assembly of the just. Great are the works of the LORD, exquisite in all their delights.',
        'Majesty and glory are his work, and his justice endures forever. He has won renown for his wondrous deeds; gracious and merciful is the LORD.',
        'He has given food to those who fear him; he will forever be mindful of his covenant.'
      ]
    },
    alleluia: {
      verse: 'My sheep hear my voice, says the Lord; I know them, and they follow me.'
    },
    gospel: {
      citation: 'Luke 14:1, 7-11',
      text: `On a sabbath Jesus went to dine at the home of one of the leading Pharisees, and the people there were observing him carefully. He told a parable to those who had been invited, noticing how they were choosing the places of honor at the table:\n\n"When you are invited by someone to a wedding banquet, do not recline at table in the place of honor. Rather, when you are invited, go and take the lowest place so that when the host comes to you he may say, 'My friend, move up to a higher position.' For everyone who exalts himself will be humbled, but the one who humbles himself will be exalted."`
    },
    reflection: {
      author: 'St. Bernard of Clairvaux and St. Basil the Great',
      title: 'The Exaltation of Christian Humility',
      content: `"Everyone who exalts himself will be humbled, but the one who humbles himself will be exalted." True greatness in the Kingdom of God begins at the lowest place, kneeling in humble adoration before the Lord who made Himself the servant of all.`
    }
  },
  {
    firstReading: {
      citation: 'Colossians 1:15-20',
      theme: 'He is the image of the invisible God, the firstborn of all creation',
      text: `Christ Jesus is the image of the invisible God, the firstborn of all creation. For in him were created all things in heaven and on earth, the visible and the invisible, whether thrones or dominions or principalities or powers; all things were created through him and for him. He is before all things, and in him all things hold together. He is the head of the body, the church. He is the beginning, the firstborn from the dead, that in all things he himself might be preeminent. For in him all the fullness was pleased to dwell, and through him to reconcile all things for him, making peace by the blood of his cross.`
    },
    responsorialPsalm: {
      citation: 'Psalm 100:1b-2, 3, 4, 5',
      antiphon: 'Come with joy into the presence of the Lord.',
      verses: [
        'Sing joyfully to the LORD, all you lands; serve the LORD with gladness; come before him with joyful song.',
        'Know that the LORD is God; he made us, his we are; his people, the flock he tends.',
        'Enter his gates with thanksgiving, his courts with praise. Give thanks to him; bless his name, for he is good: the LORD, whose kindness endures forever.'
      ]
    },
    alleluia: {
      verse: 'I am the light of the world, says the Lord; whoever follows me will have the light of life.'
    },
    gospel: {
      citation: 'Luke 10:38-42',
      text: `Jesus entered a village where a woman whose name was Martha welcomed him. She had a sister named Mary who sat beside the Lord at his feet listening to him speak. Martha, burdened with much serving, came to him and said, "Lord, do you not care that my sister has left me by myself to do the serving? Tell her to help me." The Lord said to her in reply, "Martha, Martha, you are anxious and worried about many things. There is need of only one thing. Mary has chosen the better part and it will not be taken from her."`
    },
    reflection: {
      author: 'St. Augustine and St. Gregory the Great',
      title: 'Mary Has Chosen the Better Part: Contemplation at the Feet of Jesus',
      content: `Martha's active charity is good and necessary in this mortal life, yet Mary's contemplative sitting at the feet of the Lord is the "better part" because it anticipates the eternal rest of heaven, which shall never be taken away.`
    }
  },
  {
    firstReading: {
      citation: 'Romans 8:28-30',
      theme: 'We know that all things work for good for those who love God',
      text: `Brothers and sisters: We know that all things work for good for those who love God, who are called according to his purpose. For those he foreknew he also predestined to be conformed to the image of his Son, so that he might be the firstborn among many brothers. And those he predestined he also called; and those he called he also justified; and those he justified he also glorified.`
    },
    responsorialPsalm: {
      citation: 'Psalm 13:6ab, 6c',
      antiphon: 'My hope, O Lord, is in your loving kindness.',
      verses: [
        'Though I trusted in your mercy, let my heart rejoice in your salvation.',
        'Let me sing of the LORD, "He has been good to me."',
        'For your kindness is before my eyes, and I walk in your truth.'
      ]
    },
    alleluia: {
      verse: 'Blessed are the pure in heart, for they shall see God.'
    },
    gospel: {
      citation: 'Luke 13:31-35',
      text: `At that time some Pharisees came to Jesus and said, "Go away, leave this area because Herod wants to kill you." He replied, "Go and tell that fox, 'Behold, I cast out demons and I perform healings today and tomorrow, and on the third day I accomplish my purpose.'\n\nJerusalem, Jerusalem, you who kill the prophets and stone those sent to you, how many times I yearned to gather your children together as a hen gathers her brood under her wings, but you were unwilling! Behold, your house will be abandoned. But I tell you, you will not see me until the time comes when you say, 'Blessed is he who comes in the name of the Lord.'"`
    },
    reflection: {
      author: 'St. Augustine and St. Jerome',
      title: 'Gathered Under the Wings of the Redeemer',
      content: `With maternal tenderness, Christ longs to gather every scattered and wounded soul under the shelter of His wings. Let us never resist His call, but acclaim Him in every Eucharist: "Blessed is He who comes in the name of the Lord!"`
    }
  },
  {
    firstReading: {
      citation: '1 Kings 19:9a, 11-13a',
      theme: 'Go outside and stand on the mountain before the LORD; the LORD was in the tiny whispering sound',
      text: `When Elijah reached Horeb, the mountain of God, he came to a cave where he took shelter. Then the LORD said, "Go outside and stand on the mountain before the LORD; the LORD will be passing by." A strong and heavy wind was rending the mountains and crushing rocks before the LORD—but the LORD was not in the wind. After the wind there was an earthquake—but the LORD was not in the earthquake. After the earthquake there was fire—but the LORD was not in the fire. After the fire there was a tiny whispering sound. When he heard this, Elijah hid his face in his cloak and went and stood at the entrance of the cave.`
    },
    responsorialPsalm: {
      citation: 'Psalm 85:9, 10, 11-12, 13-14',
      antiphon: 'Lord, let us see your kindness, and grant us your salvation.',
      verses: [
        'I will hear what God proclaims; the LORD—for he proclaims peace to his people. Near indeed is his salvation to those who fear him, glory dwelling in our land.',
        'Kindness and truth shall meet; justice and peace shall kiss. Truth shall spring out of the earth, and justice shall look down from heaven.',
        'The LORD himself will give his benefits; our land shall yield its increase. Justice shall walk before him, and prepare the way of his steps.'
      ]
    },
    alleluia: {
      verse: 'Speak, O Lord, your servant is listening; you have the words of everlasting life.'
    },
    gospel: {
      citation: 'Matthew 14:22-33',
      text: `After he had fed the people, Jesus made the disciples get into a boat and precede him to the other side, while he dismissed the crowds. After doing so, he went up on the mountain by himself to pray... During the fourth watch of the night, he came toward them walking on the sea. When the disciples saw him walking on the sea they were terrified. At once Jesus spoke to them, "Take courage, it is I; do not be afraid."\n\nPeter said to him in reply, "Lord, if it is you, command me to come to you on the water." He said, "Come." Peter got out of the boat and began to walk on the water toward Jesus. But when he saw how strong the wind was he became frightened; and, beginning to sink, he cried out, "Lord, save me!" Immediately Jesus stretched out his hand and caught him, and said to him, "O you of little faith, why did you doubt?"`
    },
    reflection: {
      author: 'St. Augustine and St. John Chrysostom',
      title: 'Take Courage, It Is I; Do Not Be Afraid!',
      content: `As long as Peter kept his eyes fixed on Jesus, the stormy waves were solid beneath his feet; the moment he looked at the wind, he began to sink. Yet at his cry—"Lord, save me!"—Christ's hand immediately caught him. Keep your gaze fixed on Jesus in the Blessed Sacrament.`
    }
  },
  {
    firstReading: {
      citation: 'Micah 6:6-8',
      theme: 'What does the LORD require of you? Only to do the right and to love goodness, and to walk humbly with your God',
      text: `With what shall I come before the LORD, and bow before God most high? Shall I come before him with burnt offerings, with calves a year old?... You have been told, O man, what is good, and what the LORD requires of you: Only to do the right and to love goodness, and to walk humbly with your God.`
    },
    responsorialPsalm: {
      citation: 'Psalm 15:2-3a, 3bc-4ab, 5',
      antiphon: 'To the upright I will show the saving power of God.',
      verses: [
        'He who walks blamelessly and does justice; who thinks the truth in his heart and slanders not with his tongue.',
        'Who harms not his fellow man, nor takes up a reproach against his neighbor; by whom the reprobate is despised, while he honors those who fear the LORD.',
        'Who lends not his money at usury and accepts no bribe against the innocent. He who does these things shall never be disturbed.'
      ]
    },
    alleluia: {
      verse: 'Take my yoke upon you, says the Lord, and learn from me, for I am meek and humble of heart.'
    },
    gospel: {
      citation: 'Matthew 11:25-30',
      text: `At that time Jesus exclaimed: "I give praise to you, Father, Lord of heaven and earth, for although you have hidden these things from the wise and the learned you have revealed them to the childlike. Yes, Father, such has been your gracious will.\n\nCome to me, all you who labor and are burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am meek and humble of heart; and you will find rest for yourselves. For my yoke is easy, and my burden light."`
    },
    reflection: {
      author: 'St. John Chrysostom and St. Francis de Sales',
      title: 'Learn From Me, For I Am Meek and Humble of Heart',
      content: `Our Lord does not bid us learn from Him how to create the heavens and the earth, or even how to work visible miracles; He bids us learn from Him meekness and humility of heart, wherein our weary souls find true rest.`
    }
  }
];

function diffDays(a: Date, b: Date): number {
  return Math.round((a.getTime() - b.getTime()) / 86400000);
}

/**
 * Returns Mass readings for any given date (2026, 2027, 2028, 2029, 2030, and beyond),
 * combining exact static dates, Proper Moveable & Fixed Solemnities/Feasts, and
 * full Lectionary Cycle (A/B/C & Year I/II) seasonal rotation.
 */
export function getMassReadingsForDate(dateStr: string): MassReading {
  if (MASS_READINGS_DATABASE[dateStr]) {
    return MASS_READINGS_DATABASE[dateStr];
  }

  const parts = dateStr.split('-').map(Number);
  const year = parts[0] || new Date().getFullYear();
  const monthNum = parts[1] || 1;
  const day = parts[2] || 1;
  const monthIndex0 = monthNum - 1;
  const mmdd = `${String(monthNum).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  const dayInfo = getLiturgicalDayInfo(year, monthIndex0, day);
  const cycles = getLiturgicalCycles(year, monthIndex0, day);
  const dateObj = new Date(Date.UTC(year, monthIndex0, day, 12, 0, 0));

  const easter = getEasterDate(year);
  const diffFromEaster = diffDays(dateObj, easter);
  const advent1 = getFirstSundayOfAdvent(year);
  const diffFromAdvent1 = diffDays(dateObj, advent1);
  const baptism = getBaptismOfTheLordDate(year);
  const diffFromBaptism = diffDays(dateObj, baptism);

  const seasonLabel =
    dayInfo.rank === 'Sunday' || dayInfo.rank === 'Solemnity'
      ? `${dayInfo.season} (Cycle ${cycles.sundayCycle} / Year ${cycles.weekdayCycle})`
      : `${dayInfo.season} (Year ${cycles.weekdayCycle} / Cycle ${cycles.sundayCycle})`;

  // 1. Check Moveable Proper Readings (Ash Wednesday, Palm Sunday, Holy Thursday, Good Friday, Easter, Divine Mercy, Ascension, Pentecost, Trinity, Corpus Christi, Sacred Heart, Christ the King)
  let properTemplate: LectionaryTemplate | undefined;
  if (diffFromEaster === -46) properTemplate = MOVEABLE_PROPER_READINGS['ASH_WEDNESDAY'];
  else if (diffFromEaster === -7) properTemplate = MOVEABLE_PROPER_READINGS['PALM_SUNDAY'];
  else if (diffFromEaster === -3) properTemplate = MOVEABLE_PROPER_READINGS['HOLY_THURSDAY'];
  else if (diffFromEaster === -2) properTemplate = MOVEABLE_PROPER_READINGS['GOOD_FRIDAY'];
  else if (diffFromEaster === 0) properTemplate = MOVEABLE_PROPER_READINGS['EASTER_SUNDAY'];
  else if (diffFromEaster === 7) properTemplate = MOVEABLE_PROPER_READINGS['DIVINE_MERCY_SUNDAY'];
  else if (diffFromEaster === 39) properTemplate = MOVEABLE_PROPER_READINGS['ASCENSION'];
  else if (diffFromEaster === 49) properTemplate = MOVEABLE_PROPER_READINGS['PENTECOST'];
  else if (diffFromEaster === 56) properTemplate = MOVEABLE_PROPER_READINGS['TRINITY_SUNDAY'];
  else if (diffFromEaster === 60 || diffFromEaster === 63) properTemplate = MOVEABLE_PROPER_READINGS['CORPUS_CHRISTI'];
  else if (diffFromEaster === 68) properTemplate = MOVEABLE_PROPER_READINGS['SACRED_HEART'];
  else if (diffFromAdvent1 === -7) properTemplate = MOVEABLE_PROPER_READINGS['CHRIST_THE_KING'];

  // 2. Check Fixed Date Proper Readings (if not overridden by a higher moveable feast)
  if (!properTemplate && FIXED_DATE_PROPER_READINGS[mmdd]) {
    properTemplate = FIXED_DATE_PROPER_READINGS[mmdd];
  }

  // 3. Also check if Oct 15–28 proper saint feasts (like Oct 18 St. Luke or Oct 28 Sts. Simon & Jude) exist in MASS_READINGS_DATABASE for 2026 and reuse their proper Scripture on weekday feast days in 2027-2030
  if (!properTemplate && (dayInfo.rank === 'Feast' || dayInfo.rank === 'Solemnity' || dayInfo.rank === 'Memorial')) {
    const ref2026 = MASS_READINGS_DATABASE[`2026-${mmdd}`];
    if (ref2026 && (mmdd === '10-18' || mmdd === '10-28' || mmdd === '10-15' || mmdd === '10-17')) {
      properTemplate = {
        firstReading: ref2026.firstReading,
        responsorialPsalm: ref2026.responsorialPsalm,
        secondReading: ref2026.secondReading,
        alleluia: ref2026.alleluia,
        gospel: ref2026.gospel,
        reflection: ref2026.reflection
      };
    }
  }

  // 4. Otherwise select from the Seasonal & Cycle Lectionary Pool
  if (!properTemplate) {
    const daySeed = year * 372 + monthNum * 31 + day;
    if (dayInfo.season === 'Advent') {
      properTemplate = ADVENT_READINGS_POOL[daySeed % ADVENT_READINGS_POOL.length];
    } else if (dayInfo.season === 'Lent' || dayInfo.season === 'Holy Week' || dayInfo.season === 'Paschal Triduum') {
      properTemplate = LENT_READINGS_POOL[daySeed % LENT_READINGS_POOL.length];
    } else if (dayInfo.season === 'Easter' || dayInfo.season === 'Christmas' || diffFromBaptism === 0) {
      properTemplate = EASTER_READINGS_POOL[daySeed % EASTER_READINGS_POOL.length];
    } else {
      properTemplate = ORDINARY_TIME_READINGS_POOL[daySeed % ORDINARY_TIME_READINGS_POOL.length];
    }
  }

  return {
    id: `reading-${dateStr}`,
    date: dateStr,
    liturgicalDay: dayInfo.title,
    liturgicalSeason: seasonLabel,
    liturgicalColor: dayInfo.color,
    liturgicalRank: dayInfo.rank,
    holyDayOfObligation: dayInfo.isHolyDay,
    firstReading: properTemplate.firstReading,
    responsorialPsalm: properTemplate.responsorialPsalm,
    secondReading: properTemplate.secondReading,
    alleluia: properTemplate.alleluia,
    gospel: properTemplate.gospel,
    reflection: properTemplate.reflection
  };
}


