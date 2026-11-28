import { LiturgicalDayInfo, MassReading } from '../types';
import {
  getEasterDate,
  getFirstSundayOfAdvent,
  getBaptismOfTheLordDate,
} from './liturgicalCalendar';

export type SundayCycle = 'A' | 'B' | 'C';
export type SecondReadingEntry = NonNullable<MassReading['secondReading']>;

/**
 * Complete Roman Catholic Lectionary Sunday Second Readings across all three
 * liturgical cycles (Year A, Year B, and Year C), covering every Sunday of
 * Advent, Christmas Time, Lent, Easter Time, Ordinary Time (Weeks 2–33),
 * and Sunday Solemnities.
 */
export const SUNDAY_SECOND_READINGS: Record<string, Record<SundayCycle, SecondReadingEntry>> = {
  "ADVENT_1": {
    "A": {
      "citation": "Romans 13:11-14",
      "theme": "Now is the hour to awake from sleep, for our salvation is nearer now",
      "text": "Brothers and sisters:\nDo this, knowing the time, that it is already time for you to awaken out of sleep, for salvation is now nearer to us than when we first believed. The night is far gone, and the day is near. Let’s therefore throw off the deeds of darkness, and let’s put on the armor of light. Let’s walk properly, as in the day; not in reveling and drunkenness, not in sexual promiscuity and lustful acts, and not in strife and jealousy. But put on the Lord Jesus Christ, and make no provision for the flesh, for its lusts."
    },
    "B": {
      "citation": "1 Corinthians 1:3-9",
      "theme": "We wait for the revelation of our Lord Jesus Christ",
      "text": "Brothers and sisters:\nGrace to you and peace from God our Father and the Lord Jesus Christ. I always thank my God concerning you for the grace of God which was given you in Christ Jesus, that in everything you were enriched in him, in all speech and all knowledge— even as the testimony of Christ was confirmed in you— so that you come behind in no gift, waiting for the revelation of our Lord Jesus Christ, who will also confirm you until the end, blameless in the day of our Lord Jesus Christ. God is faithful, through whom you were called into the fellowship of his Son, Jesus Christ our Lord."
    },
    "C": {
      "citation": "1 Thessalonians 3:12–4:2",
      "theme": "May the Lord strengthen your hearts to be blameless in holiness",
      "text": "Brothers and sisters:\nMay the Lord make you to increase and abound in love toward one another and toward all men, even as we also do toward you, to the end he may establish your hearts blameless in holiness before our God and Father at the coming of our Lord Jesus with all his saints. Finally then, brothers, we beg and exhort you in the Lord Jesus, that as you received from us how you ought to walk and to please God, that you abound more and more. For you know what instructions we gave you through the Lord Jesus."
    }
  },
  "ADVENT_2": {
    "A": {
      "citation": "Romans 15:4-9",
      "theme": "Welcome one another as Christ welcomed you, for the glory of God",
      "text": "Brothers and sisters:\nFor whatever things were written before were written for our learning, that through perseverance and through encouragement of the Scriptures we might have hope. Now the God of perseverance and of encouragement grant you to be of the same mind with one another according to Christ Jesus, that with one accord you may with one mouth glorify the God and Father of our Lord Jesus Christ. Therefore accept one another, even as Christ also accepted you, to the glory of God. Now I say that Christ has been made a servant of the circumcision for the truth of God, that he might confirm the promises given to the fathers, and that the Gentiles might glorify God for his mercy. As it is written, “Therefore I will give praise to you among the Gentiles and sing to your name.”"
    },
    "B": {
      "citation": "2 Peter 3:8-14",
      "theme": "We await new heavens and a new earth in which righteousness dwells",
      "text": "Beloved:\nBut don’t forget this one thing, beloved, that one day is with the Lord as a thousand years, and a thousand years as one day. The Lord is not slow concerning his promise, as some count slowness; but he is patient with us, not wishing that anyone should perish, but that all should come to repentance. But the day of the Lord will come as a thief in the night, in which the heavens will pass away with a great noise, and the elements will be dissolved with fervent heat; and the earth and the works that are in it will be burned up. Therefore, since all these things will be destroyed like this, what kind of people ought you to be in holy living and godliness, looking for and earnestly desiring the coming of the day of God, which will cause the burning heavens to be dissolved, and the elements will melt with fervent heat? But, according to his promise, we look for new heavens and a new earth, in which righteousness dwells. Therefore, beloved, seeing that you look for these things, be diligent to be found in peace, without defect and blameless in his sight."
    },
    "C": {
      "citation": "Philippians 1:4-6, 8-11",
      "theme": "Pure and blameless for the day of Christ",
      "text": "Brothers and sisters:\nalways in every request of mine on behalf of you all, making my requests with joy, for your partnership in furtherance of the Good News from the first day until now; being confident of this very thing, that he who began a good work in you will complete it until the day of Jesus Christ. For God is my witness, how I long after all of you in the tender mercies of Christ Jesus. This I pray, that your love may abound yet more and more in knowledge and all discernment, so that you may approve the things that are excellent, that you may be sincere and without offense to the day of Christ, being filled with the fruits of righteousness which are through Jesus Christ, to the glory and praise of God."
    }
  },
  "ADVENT_3": {
    "A": {
      "citation": "James 5:7-10",
      "theme": "Make your hearts firm, because the coming of the Lord is at hand",
      "text": "Brothers and sisters:\nBe patient therefore, brothers, until the coming of the Lord. Behold, the farmer waits for the precious fruit of the earth, being patient over it, until it receives the early and late rain. You also be patient. Establish your hearts, for the coming of the Lord is at hand. Don’t grumble, brothers, against one another, so that you won’t be judged. Behold, the judge stands at the door. Take, brothers, for an example of suffering and of perseverance, the prophets who spoke in the name of the Lord."
    },
    "B": {
      "citation": "1 Thessalonians 5:16-24",
      "theme": "Rejoice always; may you be kept blameless for the coming of our Lord",
      "text": "Brothers and sisters:\nAlways rejoice. Pray without ceasing. In everything give thanks, for this is the will of God in Christ Jesus toward you. Don’t quench the Spirit. Don’t despise prophecies. Test all things, and hold firmly that which is good. Abstain from every form of evil. May the God of peace himself sanctify you completely. May your whole spirit, soul, and body be preserved blameless at the coming of our Lord Jesus Christ. He who calls you is faithful, who will also do it."
    },
    "C": {
      "citation": "Philippians 4:4-7",
      "theme": "Rejoice in the Lord always; the Lord is near",
      "text": "Brothers and sisters:\nRejoice in the Lord always! Again I will say, “Rejoice!” Let your gentleness be known to all men. The Lord is at hand. In nothing be anxious, but in everything, by prayer and petition with thanksgiving, let your requests be made known to God. And the peace of God, which surpasses all understanding, will guard your hearts and your thoughts in Christ Jesus."
    }
  },
  "ADVENT_4": {
    "A": {
      "citation": "Romans 1:1-7",
      "theme": "Jesus Christ, descended from David, established as Son of God in power",
      "text": "Paul, a servant of Jesus Christ, called to be an apostle, set apart for the Good News of God, which he promised before through his prophets in the holy Scriptures, concerning his Son, who was born of the offspring of David according to the flesh, who was declared to be the Son of God with power according to the Spirit of holiness, by the resurrection from the dead, Jesus Christ our Lord, through whom we received grace and apostleship for obedience of faith among all the nations for his name’s sake; among whom you are also called to belong to Jesus Christ; to all who are in Rome, beloved of God, called to be saints: Grace to you and peace from God our Father and the Lord Jesus Christ."
    },
    "B": {
      "citation": "Romans 16:25-27",
      "theme": "The mystery kept secret for long ages is now manifested",
      "text": "Brothers and sisters:\nNow to him who is able to establish you according to my Good News and the preaching of Jesus Christ, according to the revelation of the mystery which has been kept secret through long ages, but now is revealed, and by the Scriptures of the prophets, according to the commandment of the eternal God, is made known for obedience of faith to all the nations; to the only wise God, through Jesus Christ, to whom be the glory forever! Amen."
    },
    "C": {
      "citation": "Hebrews 10:5-10",
      "theme": "Behold, I come to do your will, O God",
      "text": "Brothers and sisters:\nTherefore when he comes into the world, he says, “You didn’t desire sacrifice and offering, but you prepared a body for me. You had no pleasure in whole burnt offerings and sacrifices for sin. Then I said, ‘Behold, I have come (in the scroll of the book it is written of me) to do your will, O God.’” Previously saying, “Sacrifices and offerings and whole burnt offerings and sacrifices for sin you didn’t desire, neither had pleasure in them” (those which are offered according to the law), then he has said, “Behold, I have come to do your will.” He takes away the first, that he may establish the second, by which will we have been sanctified through the offering of the body of Jesus Christ once for all."
    }
  },
  "HOLY_FAMILY": {
    "A": {
      "citation": "Colossians 3:12-21",
      "theme": "Put on heartfelt compassion, kindness, humility, gentleness, and patience",
      "text": "Brothers and sisters:\nPut on therefore, as God’s chosen ones, holy and beloved, a heart of compassion, kindness, lowliness, humility, and perseverance; bearing with one another, and forgiving each other, if any man has a complaint against any; even as Christ forgave you, so you also do. Above all these things, walk in love, which is the bond of perfection. And let the peace of God rule in your hearts, to which also you were called in one body, and be thankful. Let the word of Christ dwell in you richly; in all wisdom teaching and admonishing one another with psalms, hymns, and spiritual songs, singing with grace in your heart to the Lord. Whatever you do, in word or in deed, do all in the name of the Lord Jesus, giving thanks to God the Father through him. Wives, be in subjection to your husbands, as is fitting in the Lord. Husbands, love your wives, and don’t be bitter against them. Children, obey your parents in all things, for this pleases the Lord. Fathers, don’t provoke your children, so that they won’t be discouraged."
    },
    "B": {
      "citation": "Hebrews 11:8, 11-12, 17-19",
      "theme": "The faith of Abraham, Sarah, and Isaac",
      "text": "Brothers and sisters:\nBy faith Abraham, when he was called, obeyed to go out to the place which he was to receive for an inheritance. He went out, not knowing where he went. By faith even Sarah herself received power to conceive, and she bore a child when she was past age, since she counted him faithful who had promised. Therefore as many as the stars of the sky in multitude, and as innumerable as the sand which is by the sea shore, were fathered by one man, and him as good as dead. By faith, Abraham, being tested, offered up Isaac. Yes, he who had gladly received the promises was offering up his only born son, to whom it was said, “Your offspring will be accounted as from Isaac,” concluding that God is able to raise up even from the dead. Figuratively speaking, he also did receive him back from the dead."
    },
    "C": {
      "citation": "1 John 3:1-2, 21-24",
      "theme": "See what love the Father has bestowed on us that we may be called children of God",
      "text": "Beloved:\nSee how great a love the Father has given to us, that we should be called children of God! For this cause the world doesn’t know us, because it didn’t know him. Beloved, now we are children of God. It is not yet revealed what we will be; but we know that when he is revealed, we will be like him, for we will see him just as he is. Beloved, if our hearts don’t condemn us, we have boldness toward God; so whatever we ask, we receive from him, because we keep his commandments and do the things that are pleasing in his sight. This is his commandment, that we should believe in the name of his Son, Jesus Christ, and love one another, even as he commanded. He who keeps his commandments remains in him, and he in him. By this we know that he remains in us, by the Spirit which he gave us."
    }
  },
  "SECOND_AFTER_NATIVITY": {
    "A": {
      "citation": "Ephesians 1:3-6, 15-18",
      "theme": "He destined us for adoption to himself through Jesus Christ",
      "text": "Blessed be the God and Father of our Lord Jesus Christ, who has blessed us with every spiritual blessing in the heavenly places in Christ, even as he chose us in him before the foundation of the world, that we would be holy and without defect before him in love, having predestined us for adoption as children through Jesus Christ to himself, according to the good pleasure of his desire, to the praise of the glory of his grace, by which he freely gave us favor in the Beloved. For this cause I also, having heard of the faith in the Lord Jesus which is among you and the love which you have toward all the saints, don’t cease to give thanks for you, making mention of you in my prayers, that the God of our Lord Jesus Christ, the Father of glory, may give to you a spirit of wisdom and revelation in the knowledge of him, having the eyes of your hearts enlightened, that you may know what is the hope of his calling, and what are the riches of the glory of his inheritance in the saints,"
    },
    "B": {
      "citation": "Ephesians 1:3-6, 15-18",
      "theme": "He destined us for adoption to himself through Jesus Christ",
      "text": "Blessed be the God and Father of our Lord Jesus Christ, who has blessed us with every spiritual blessing in the heavenly places in Christ, even as he chose us in him before the foundation of the world, that we would be holy and without defect before him in love, having predestined us for adoption as children through Jesus Christ to himself, according to the good pleasure of his desire, to the praise of the glory of his grace, by which he freely gave us favor in the Beloved. For this cause I also, having heard of the faith in the Lord Jesus which is among you and the love which you have toward all the saints, don’t cease to give thanks for you, making mention of you in my prayers, that the God of our Lord Jesus Christ, the Father of glory, may give to you a spirit of wisdom and revelation in the knowledge of him, having the eyes of your hearts enlightened, that you may know what is the hope of his calling, and what are the riches of the glory of his inheritance in the saints,"
    },
    "C": {
      "citation": "Ephesians 1:3-6, 15-18",
      "theme": "He destined us for adoption to himself through Jesus Christ",
      "text": "Blessed be the God and Father of our Lord Jesus Christ, who has blessed us with every spiritual blessing in the heavenly places in Christ, even as he chose us in him before the foundation of the world, that we would be holy and without defect before him in love, having predestined us for adoption as children through Jesus Christ to himself, according to the good pleasure of his desire, to the praise of the glory of his grace, by which he freely gave us favor in the Beloved. For this cause I also, having heard of the faith in the Lord Jesus which is among you and the love which you have toward all the saints, don’t cease to give thanks for you, making mention of you in my prayers, that the God of our Lord Jesus Christ, the Father of glory, may give to you a spirit of wisdom and revelation in the knowledge of him, having the eyes of your hearts enlightened, that you may know what is the hope of his calling, and what are the riches of the glory of his inheritance in the saints,"
    }
  },
  "EPIPHANY": {
    "A": {
      "citation": "Ephesians 3:2-3, 5-6",
      "theme": "The Gentiles are coheirs, members of the same body, and copartners in the promise",
      "text": "Brothers and sisters:\nif it is so that you have heard of the administration of that grace of God which was given me toward you, how that by revelation the mystery was made known to me, as I wrote before in few words, which in other generations was not made known to the children of men, as it has now been revealed to his holy apostles and prophets in the Spirit, that the Gentiles are fellow heirs and fellow members of the body, and fellow partakers of his promise in Christ Jesus through the Good News,"
    },
    "B": {
      "citation": "Ephesians 3:2-3, 5-6",
      "theme": "The Gentiles are coheirs, members of the same body, and copartners in the promise",
      "text": "Brothers and sisters:\nif it is so that you have heard of the administration of that grace of God which was given me toward you, how that by revelation the mystery was made known to me, as I wrote before in few words, which in other generations was not made known to the children of men, as it has now been revealed to his holy apostles and prophets in the Spirit, that the Gentiles are fellow heirs and fellow members of the body, and fellow partakers of his promise in Christ Jesus through the Good News,"
    },
    "C": {
      "citation": "Ephesians 3:2-3, 5-6",
      "theme": "The Gentiles are coheirs, members of the same body, and copartners in the promise",
      "text": "Brothers and sisters:\nif it is so that you have heard of the administration of that grace of God which was given me toward you, how that by revelation the mystery was made known to me, as I wrote before in few words, which in other generations was not made known to the children of men, as it has now been revealed to his holy apostles and prophets in the Spirit, that the Gentiles are fellow heirs and fellow members of the body, and fellow partakers of his promise in Christ Jesus through the Good News,"
    }
  },
  "BAPTISM_OF_THE_LORD": {
    "A": {
      "citation": "Acts 10:34-38",
      "theme": "God anointed Jesus of Nazareth with the Holy Spirit and power",
      "text": "Peter opened his mouth and said, “Truly I perceive that God doesn’t show favoritism; but in every nation he who fears him and works righteousness is acceptable to him. The word which he sent to the children of Israel, preaching good news of peace by Jesus Christ—he is Lord of all— you yourselves know what happened, which was proclaimed throughout all Judea, beginning from Galilee, after the baptism which John preached; how God anointed Jesus of Nazareth with the Holy Spirit and with power, who went about doing good and healing all who were oppressed by the devil, for God was with him."
    },
    "B": {
      "citation": "1 John 5:1-9",
      "theme": "The Spirit, the water, and the blood give testimony to the Son of God",
      "text": "Beloved:\nWhoever believes that Jesus is the Christ has been born of God. Whoever loves the Father also loves the child who is born of him. By this we know that we love the children of God, when we love God and keep his commandments. For this is loving God, that we keep his commandments. His commandments are not grievous. For whatever is born of God overcomes the world. This is the victory that has overcome the world: your faith. Who is he who overcomes the world, but he who believes that Jesus is the Son of God? This is he who came by water and blood, Jesus Christ; not with the water only, but with the water and the blood. It is the Spirit who testifies, because the Spirit is the truth. For there are three who testify: the Spirit, the water, and the blood; and the three agree as one. If we receive the witness of men, the witness of God is greater; for this is God’s testimony which he has testified concerning his Son."
    },
    "C": {
      "citation": "Titus 2:11-14; 3:4-7",
      "theme": "He saved us through the bath of rebirth and renewal by the Holy Spirit",
      "text": "Beloved:\nFor the grace of God has appeared, bringing salvation to all men, instructing us to the intent that, denying ungodliness and worldly lusts, we would live soberly, righteously, and godly in this present age; looking for the blessed hope and appearing of the glory of our great God and Savior, Jesus Christ, who gave himself for us, that he might redeem us from all iniquity and purify for himself a people for his own possession, zealous for good works. But when the kindness of God our Savior and his love toward mankind appeared, not by works of righteousness which we did ourselves, but according to his mercy, he saved us through the washing of regeneration and renewing by the Holy Spirit, whom he poured out on us richly through Jesus Christ our Savior; that being justified by his grace, we might be made heirs according to the hope of eternal life."
    }
  },
  "SANTO_NINO": {
    "A": {
      "citation": "Ephesians 1:3-6, 15-18",
      "theme": "Chosen in Christ before the foundation of the world to be holy and without blemish",
      "text": "Blessed be the God and Father of our Lord Jesus Christ, who has blessed us with every spiritual blessing in the heavenly places in Christ, even as he chose us in him before the foundation of the world, that we would be holy and without defect before him in love, having predestined us for adoption as children through Jesus Christ to himself, according to the good pleasure of his desire, to the praise of the glory of his grace, by which he freely gave us favor in the Beloved. For this cause I also, having heard of the faith in the Lord Jesus which is among you and the love which you have toward all the saints, don’t cease to give thanks for you, making mention of you in my prayers, that the God of our Lord Jesus Christ, the Father of glory, may give to you a spirit of wisdom and revelation in the knowledge of him, having the eyes of your hearts enlightened, that you may know what is the hope of his calling, and what are the riches of the glory of his inheritance in the saints,"
    },
    "B": {
      "citation": "Ephesians 1:3-6, 15-18",
      "theme": "Chosen in Christ before the foundation of the world to be holy and without blemish",
      "text": "Blessed be the God and Father of our Lord Jesus Christ, who has blessed us with every spiritual blessing in the heavenly places in Christ, even as he chose us in him before the foundation of the world, that we would be holy and without defect before him in love, having predestined us for adoption as children through Jesus Christ to himself, according to the good pleasure of his desire, to the praise of the glory of his grace, by which he freely gave us favor in the Beloved. For this cause I also, having heard of the faith in the Lord Jesus which is among you and the love which you have toward all the saints, don’t cease to give thanks for you, making mention of you in my prayers, that the God of our Lord Jesus Christ, the Father of glory, may give to you a spirit of wisdom and revelation in the knowledge of him, having the eyes of your hearts enlightened, that you may know what is the hope of his calling, and what are the riches of the glory of his inheritance in the saints,"
    },
    "C": {
      "citation": "Ephesians 1:3-6, 15-18",
      "theme": "Chosen in Christ before the foundation of the world to be holy and without blemish",
      "text": "Blessed be the God and Father of our Lord Jesus Christ, who has blessed us with every spiritual blessing in the heavenly places in Christ, even as he chose us in him before the foundation of the world, that we would be holy and without defect before him in love, having predestined us for adoption as children through Jesus Christ to himself, according to the good pleasure of his desire, to the praise of the glory of his grace, by which he freely gave us favor in the Beloved. For this cause I also, having heard of the faith in the Lord Jesus which is among you and the love which you have toward all the saints, don’t cease to give thanks for you, making mention of you in my prayers, that the God of our Lord Jesus Christ, the Father of glory, may give to you a spirit of wisdom and revelation in the knowledge of him, having the eyes of your hearts enlightened, that you may know what is the hope of his calling, and what are the riches of the glory of his inheritance in the saints,"
    }
  },
  "LENT_1": {
    "A": {
      "citation": "Romans 5:12-19",
      "theme": "Where sin increased, grace overflowed all the more through Jesus Christ",
      "text": "Brothers and sisters:\nTherefore, as sin entered into the world through one man, and death through sin, so death passed to all men because all sinned. For until the law, sin was in the world; but sin is not charged when there is no law. Nevertheless death reigned from Adam until Moses, even over those whose sins weren’t like Adam’s disobedience, who is a foreshadowing of him who was to come. But the free gift isn’t like the trespass. For if by the trespass of the one the many died, much more did the grace of God and the gift by the grace of the one man, Jesus Christ, abound to the many. The gift is not as through one who sinned; for the judgment came by one to condemnation, but the free gift followed many trespasses to justification. For if by the trespass of the one, death reigned through the one; so much more will those who receive the abundance of grace and of the gift of righteousness reign in life through the one, Jesus Christ. So then as through one trespass, all men were condemned; even so through one act of righteousness, all men were justified to life. For as through the one man’s disobedience many were made sinners, even so through the obedience of the one, many will be made righteous."
    },
    "B": {
      "citation": "1 Peter 3:18-22",
      "theme": "Christ suffered for sins once, the righteous for the unrighteous",
      "text": "Beloved:\nBecause Christ also suffered for sins once, the righteous for the unrighteous, that he might bring you to God, being put to death in the flesh, but made alive in the Spirit, in whom he also went and preached to the spirits in prison, who before were disobedient when God waited patiently in the days of Noah while the ship was being built. In it, few, that is, eight souls, were saved through water. This is a symbol of baptism, which now saves you—not the putting away of the filth of the flesh, but the answer of a good conscience toward God—through the resurrection of Jesus Christ, who is at the right hand of God, having gone into heaven, angels and authorities and powers being made subject to him."
    },
    "C": {
      "citation": "Romans 10:8-13",
      "theme": "Everyone who calls on the name of the Lord will be saved",
      "text": "Brothers and sisters:\nBut what does it say? “The word is near you, in your mouth and in your heart;” that is, the word of faith which we preach: that if you will confess with your mouth that Jesus is Lord and believe in your heart that God raised him from the dead, you will be saved. For with the heart one believes resulting in righteousness; and with the mouth confession is made resulting in salvation. For the Scripture says, “Whoever believes in him will not be disappointed.” For there is no distinction between Jew and Greek; for the same Lord is Lord of all, and is rich to all who call on him. For, “Whoever will call on the name of the Lord will be saved.”"
    }
  },
  "LENT_2": {
    "A": {
      "citation": "2 Timothy 1:8-10",
      "theme": "Bear your share of hardship for the Gospel with the strength that comes from God",
      "text": "Beloved:\nTherefore don’t be ashamed of the testimony of our Lord, nor of me his prisoner; but endure hardship for the Good News according to the power of God, who saved us and called us with a holy calling, not according to our works, but according to his own purpose and grace, which was given to us in Christ Jesus before times eternal, but has now been revealed by the appearing of our Savior, Christ Jesus, who abolished death, and brought life and immortality to light through the Good News."
    },
    "B": {
      "citation": "Romans 8:31-34",
      "theme": "If God is for us, who can be against us?",
      "text": "Brothers and sisters:\nWhat then shall we say about these things? If God is for us, who can be against us? He who didn’t spare his own Son, but delivered him up for us all, how would he not also with him freely give us all things? Who could bring a charge against God’s chosen ones? It is God who justifies. Who is he who condemns? It is Christ who died, yes rather, who was raised from the dead, who is at the right hand of God, who also makes intercession for us."
    },
    "C": {
      "citation": "Philippians 3:17–4:1",
      "theme": "Our citizenship is in heaven, from where we await a savior, the Lord Jesus Christ",
      "text": "Brothers, be imitators together of me, and note those who walk this way, even as you have us for an example. For many walk, of whom I told you often, and now tell you even weeping, as the enemies of the cross of Christ, whose end is destruction, whose god is the belly, and whose glory is in their shame, who think about earthly things. For our citizenship is in heaven, from where we also wait for a Savior, the Lord Jesus Christ, who will change the body of our humiliation to be conformed to the body of his glory, according to the working by which he is able even to subject all things to himself. Therefore, my brothers, beloved and longed for, my joy and crown, stand firm in the Lord in this way, my beloved."
    }
  },
  "LENT_3": {
    "A": {
      "citation": "Romans 5:1-2, 5-8",
      "theme": "The love of God has been poured out into our hearts through the Holy Spirit",
      "text": "Brothers and sisters:\nBeing therefore justified by faith, we have peace with God through our Lord Jesus Christ; through whom we also have our access by faith into this grace in which we stand. We rejoice in hope of the glory of God. and hope doesn’t disappoint us, because God’s love has been poured into our hearts through the Holy Spirit who was given to us. For while we were yet weak, at the right time Christ died for the ungodly. For one will hardly die for a righteous man. Yet perhaps for a good person someone would even dare to die. But God commends his own love toward us, in that while we were yet sinners, Christ died for us."
    },
    "B": {
      "citation": "1 Corinthians 1:22-25",
      "theme": "We proclaim Christ crucified, the power of God and the wisdom of God",
      "text": "Brothers and sisters:\nFor Jews ask for signs, Greeks seek after wisdom, but we preach Christ crucified, a stumbling block to Jews and foolishness to Greeks, but to those who are called, both Jews and Greeks, Christ is the power of God and the wisdom of God; because the foolishness of God is wiser than men, and the weakness of God is stronger than men."
    },
    "C": {
      "citation": "1 Corinthians 10:1-6, 10-12",
      "theme": "These things happened as examples for us",
      "text": "Brothers and sisters:\nNow I would not have you ignorant, brothers, that our fathers were all under the cloud, and all passed through the sea; and were all baptized into Moses in the cloud and in the sea; and all ate the same spiritual food; and all drank the same spiritual drink. For they drank of a spiritual rock that followed them, and the rock was Christ. However with most of them, God was not well pleased, for they were overthrown in the wilderness. Now these things were our examples, to the intent we should not lust after evil things as they also lusted. Don’t grumble, as some of them also grumbled, and perished by the destroyer. Now all these things happened to them by way of example, and they were written for our admonition, on whom the ends of the ages have come. Therefore let him who thinks he stands be careful that he doesn’t fall."
    }
  },
  "LENT_4": {
    "A": {
      "citation": "Ephesians 5:8-14",
      "theme": "Live as children of light; awake, O sleeper, and Christ will give you light",
      "text": "Brothers and sisters:\nFor you were once darkness, but are now light in the Lord. Walk as children of light, for the fruit of the Spirit is in all goodness and righteousness and truth, proving what is well pleasing to the Lord. Have no fellowship with the unfruitful deeds of darkness, but rather even reprove them. For it is a shame even to speak of the things which are done by them in secret. But all things, when they are reproved, are revealed by the light, for everything that reveals is light. Therefore he says, “Awake, you who sleep, and arise from the dead, and Christ will shine on you.”"
    },
    "B": {
      "citation": "Ephesians 2:4-10",
      "theme": "God, who is rich in mercy, brought us to life with Christ; by grace you have been saved",
      "text": "Brothers and sisters:\nBut God, being rich in mercy, for his great love with which he loved us, even when we were dead through our trespasses, made us alive together with Christ—by grace you have been saved— and raised us up with him, and made us to sit with him in the heavenly places in Christ Jesus, that in the ages to come he might show the exceeding riches of his grace in kindness toward us in Christ Jesus; for by grace you have been saved through faith, and that not of yourselves; it is the gift of God, not of works, that no one would boast. For we are his workmanship, created in Christ Jesus for good works, which God prepared before that we would walk in them."
    },
    "C": {
      "citation": "2 Corinthians 5:17-21",
      "theme": "Whoever is in Christ is a new creation; be reconciled to God",
      "text": "Brothers and sisters:\nTherefore if anyone is in Christ, he is a new creation. The old things have passed away. Behold, all things have become new. But all things are of God, who reconciled us to himself through Jesus Christ, and gave to us the ministry of reconciliation; namely, that God was in Christ reconciling the world to himself, not reckoning to them their trespasses, and having committed to us the word of reconciliation. We are therefore ambassadors on behalf of Christ, as though God were entreating by us: we beg you on behalf of Christ, be reconciled to God. For him who knew no sin he made to be sin on our behalf, so that in him we might become the righteousness of God."
    }
  },
  "LENT_5": {
    "A": {
      "citation": "Romans 8:8-11",
      "theme": "The Spirit of the one who raised Jesus from the dead dwells in you",
      "text": "Brothers and sisters:\nThose who are in the flesh can’t please God. But you are not in the flesh but in the Spirit, if it is so that the Spirit of God dwells in you. But if any man doesn’t have the Spirit of Christ, he is not his. If Christ is in you, the body is dead because of sin, but the spirit is alive because of righteousness. But if the Spirit of him who raised up Jesus from the dead dwells in you, he who raised up Christ Jesus from the dead will also give life to your mortal bodies through his Spirit who dwells in you."
    },
    "B": {
      "citation": "Hebrews 5:7-9",
      "theme": "Son though he was, he learned obedience from what he suffered",
      "text": "Brothers and sisters:\nHe, in the days of his flesh, having offered up prayers and petitions with strong crying and tears to him who was able to save him from death, and having been heard for his godly fear, though he was a Son, yet learned obedience by the things which he suffered. Having been made perfect, he became to all of those who obey him the author of eternal salvation,"
    },
    "C": {
      "citation": "Philippians 3:8-14",
      "theme": "I consider everything as a loss because of the supreme good of knowing Christ Jesus",
      "text": "Brothers and sisters:\nYes most certainly, and I count all things to be a loss for the excellency of the knowledge of Christ Jesus, my Lord, for whom I suffered the loss of all things, and count them nothing but refuse, that I may gain Christ and be found in him, not having a righteousness of my own, that which is of the law, but that which is through faith in Christ, the righteousness which is from God by faith, that I may know him and the power of his resurrection, and the fellowship of his sufferings, becoming conformed to his death, if by any means I may attain to the resurrection from the dead. Not that I have already obtained, or am already made perfect; but I press on, that I may take hold of that for which also I was taken hold of by Christ Jesus. Brothers, I don’t regard myself as yet having taken hold, but one thing I do: forgetting the things which are behind and stretching forward to the things which are before, I press on toward the goal for the prize of the high calling of God in Christ Jesus."
    }
  },
  "PALM_SUNDAY": {
    "A": {
      "citation": "Philippians 2:6-11",
      "theme": "Christ humbled himself, becoming obedient to the point of death on a cross",
      "text": "who, existing in the form of God, didn’t consider equality with God a thing to be grasped, but emptied himself, taking the form of a servant, being made in the likeness of men. And being found in human form, he humbled himself, becoming obedient to the point of death, yes, the death of the cross. Therefore God also highly exalted him, and gave to him the name which is above every name, that at the name of Jesus every knee should bow, of those in heaven, those on earth, and those under the earth, and that every tongue should confess that Jesus Christ is Lord, to the glory of God the Father."
    },
    "B": {
      "citation": "Philippians 2:6-11",
      "theme": "Christ humbled himself, becoming obedient to the point of death on a cross",
      "text": "who, existing in the form of God, didn’t consider equality with God a thing to be grasped, but emptied himself, taking the form of a servant, being made in the likeness of men. And being found in human form, he humbled himself, becoming obedient to the point of death, yes, the death of the cross. Therefore God also highly exalted him, and gave to him the name which is above every name, that at the name of Jesus every knee should bow, of those in heaven, those on earth, and those under the earth, and that every tongue should confess that Jesus Christ is Lord, to the glory of God the Father."
    },
    "C": {
      "citation": "Philippians 2:6-11",
      "theme": "Christ humbled himself, becoming obedient to the point of death on a cross",
      "text": "who, existing in the form of God, didn’t consider equality with God a thing to be grasped, but emptied himself, taking the form of a servant, being made in the likeness of men. And being found in human form, he humbled himself, becoming obedient to the point of death, yes, the death of the cross. Therefore God also highly exalted him, and gave to him the name which is above every name, that at the name of Jesus every knee should bow, of those in heaven, those on earth, and those under the earth, and that every tongue should confess that Jesus Christ is Lord, to the glory of God the Father."
    }
  },
  "EASTER_1": {
    "A": {
      "citation": "Colossians 3:1-4",
      "theme": "Seek what is above, where Christ is seated at the right hand of God",
      "text": "Brothers and sisters:\nIf then you were raised together with Christ, seek the things that are above, where Christ is, seated on the right hand of God. Set your mind on the things that are above, not on the things that are on the earth. For you died, and your life is hidden with Christ in God. When Christ, our life, is revealed, then you will also be revealed with him in glory."
    },
    "B": {
      "citation": "Colossians 3:1-4",
      "theme": "Seek what is above, where Christ is seated at the right hand of God",
      "text": "Brothers and sisters:\nIf then you were raised together with Christ, seek the things that are above, where Christ is, seated on the right hand of God. Set your mind on the things that are above, not on the things that are on the earth. For you died, and your life is hidden with Christ in God. When Christ, our life, is revealed, then you will also be revealed with him in glory."
    },
    "C": {
      "citation": "Colossians 3:1-4",
      "theme": "Seek what is above, where Christ is seated at the right hand of God",
      "text": "Brothers and sisters:\nIf then you were raised together with Christ, seek the things that are above, where Christ is, seated on the right hand of God. Set your mind on the things that are above, not on the things that are on the earth. For you died, and your life is hidden with Christ in God. When Christ, our life, is revealed, then you will also be revealed with him in glory."
    }
  },
  "EASTER_2": {
    "A": {
      "citation": "1 Peter 1:3-9",
      "theme": "He gave us a new birth to a living hope through the resurrection of Jesus Christ",
      "text": "Blessed be the God and Father of our Lord Jesus Christ, who according to his great mercy caused us to be born again to a living hope through the resurrection of Jesus Christ from the dead, to an incorruptible and undefiled inheritance that doesn’t fade away, reserved in Heaven for you, who by the power of God are guarded through faith for a salvation ready to be revealed in the last time. In this you greatly rejoice, though now for a little while, if need be, you have been grieved in various trials, that the proof of your faith, which is more precious than gold that perishes, even though it is tested by fire, may be found to result in praise, glory, and honor at the revelation of Jesus Christ— whom, not having known, you love. In him, though now you don’t see him, yet believing, you rejoice greatly with joy that is unspeakable and full of glory, receiving the result of your faith, the salvation of your souls."
    },
    "B": {
      "citation": "1 John 5:1-6",
      "theme": "The victory that conquers the world is our faith",
      "text": "Beloved:\nWhoever believes that Jesus is the Christ has been born of God. Whoever loves the Father also loves the child who is born of him. By this we know that we love the children of God, when we love God and keep his commandments. For this is loving God, that we keep his commandments. His commandments are not grievous. For whatever is born of God overcomes the world. This is the victory that has overcome the world: your faith. Who is he who overcomes the world, but he who believes that Jesus is the Son of God? This is he who came by water and blood, Jesus Christ; not with the water only, but with the water and the blood. It is the Spirit who testifies, because the Spirit is the truth."
    },
    "C": {
      "citation": "Revelation 1:9-13, 17-19",
      "theme": "Once I was dead, but now I am alive forever and ever",
      "text": "I John, your brother and partner with you in the oppression, Kingdom, and perseverance in Christ Jesus, was on the isle that is called Patmos because of God’s Word and the testimony of Jesus Christ. I was in the Spirit on the Lord’s day, and I heard behind me a loud voice, like a trumpet saying, “What you see, write in a book and send to the seven assemblies: to Ephesus, Smyrna, Pergamum, Thyatira, Sardis, Philadelphia, and to Laodicea.” I turned to see the voice that spoke with me. Having turned, I saw seven golden lamp stands. And among the lamp stands was one like a son of man, clothed with a robe reaching down to his feet, and with a golden sash around his chest. When I saw him, I fell at his feet like a dead man. He laid his right hand on me, saying, “Don’t be afraid. I am the first and the last, and the Living one. I was dead, and behold, I am alive forever and ever. Amen. I have the keys of Death and of Hades. Write therefore the things which you have seen, and the things which are, and the things which will happen hereafter."
    }
  },
  "EASTER_3": {
    "A": {
      "citation": "1 Peter 1:17-21",
      "theme": "You were ransomed with the precious blood of Christ as of a spotless unblemished lamb",
      "text": "Beloved:\nIf you call on him as Father, who without respect of persons judges according to each man’s work, pass the time of your living as foreigners here in reverent fear, knowing that you were redeemed, not with corruptible things like silver or gold, from the useless way of life handed down from your fathers, but with precious blood, as of a lamb without blemish or spot, the blood of Christ, who was foreknown indeed before the foundation of the world, but was revealed in this last age for your sake, who through him are believers in God, who raised him from the dead and gave him glory, so that your faith and hope might be in God."
    },
    "B": {
      "citation": "1 John 2:1-5",
      "theme": "Jesus Christ the righteous one is expiation for our sins and for the whole world",
      "text": "My children:\nMy little children, I write these things to you so that you may not sin. If anyone sins, we have a Counselor with the Father, Jesus Christ, the righteous. And he is the atoning sacrifice for our sins, and not for ours only, but also for the whole world. This is how we know that we know him: if we keep his commandments. One who says, “I know him,” and doesn’t keep his commandments, is a liar, and the truth isn’t in him. But God’s love has most certainly been perfected in whoever keeps his word. This is how we know that we are in him:"
    },
    "C": {
      "citation": "Revelation 5:11-14",
      "theme": "Worthy is the Lamb that was slain to receive power, riches, wisdom, and honor",
      "text": "I looked, and I heard something like a voice of many angels around the throne, the living creatures, and the elders. The number of them was ten thousands of ten thousands, and thousands of thousands, saying with a loud voice, “Worthy is the Lamb who has been killed to receive the power, wealth, wisdom, strength, honor, glory, and blessing!” I heard every created thing which is in heaven, on the earth, under the earth, on the sea, and everything in them, saying, “To him who sits on the throne and to the Lamb be the blessing, the honor, the glory, and the dominion, forever and ever! Amen!” The four living creatures said, “Amen!” Then the elders fell down and worshiped."
    }
  },
  "EASTER_4": {
    "A": {
      "citation": "1 Peter 2:20-25",
      "theme": "By his wounds you have been healed; you have returned to the shepherd of your souls",
      "text": "Beloved:\nFor what glory is it if, when you sin, you patiently endure beating? But if when you do well, you patiently endure suffering, this is commendable with God. For you were called to this, because Christ also suffered for us, leaving you an example, that you should follow his steps, who didn’t sin, “neither was deceit found in his mouth.” When he was cursed, he didn’t curse back. When he suffered, he didn’t threaten, but committed himself to him who judges righteously. He himself bore our sins in his body on the tree, that we, having died to sins, might live to righteousness. You were healed by his wounds. For you were going astray like sheep; but now you have returned to the Shepherd and Overseer of your souls."
    },
    "B": {
      "citation": "1 John 3:1-2",
      "theme": "We are God’s children now; we shall see him as he is",
      "text": "Beloved:\nSee how great a love the Father has given to us, that we should be called children of God! For this cause the world doesn’t know us, because it didn’t know him. Beloved, now we are children of God. It is not yet revealed what we will be; but we know that when he is revealed, we will be like him, for we will see him just as he is."
    },
    "C": {
      "citation": "Revelation 7:9, 14-17",
      "theme": "The Lamb who is in the center of the throne will shepherd them",
      "text": "After these things I looked, and behold, a great multitude which no man could count, out of every nation and of all tribes, peoples, and languages, standing before the throne and before the Lamb, dressed in white robes, with palm branches in their hands. I told him, “My lord, you know.” He said to me, “These are those who came out of the great suffering. They washed their robes and made them white in the Lamb’s blood. Therefore they are before the throne of God, and they serve him day and night in his temple. He who sits on the throne will spread his tabernacle over them. They will never be hungry or thirsty any more. The sun won’t beat on them, nor any heat; for the Lamb who is in the middle of the throne shepherds them and leads them to springs of life-giving waters. And God will wipe away every tear from their eyes.”"
    }
  },
  "EASTER_5": {
    "A": {
      "citation": "1 Peter 2:4-9",
      "theme": "You are a chosen race, a royal priesthood, a holy nation",
      "text": "Beloved:\nCome to him, a living stone, rejected indeed by men, but chosen by God, precious. You also as living stones are built up as a spiritual house, to be a holy priesthood, to offer up spiritual sacrifices, acceptable to God through Jesus Christ. Because it is contained in Scripture, “Behold, I lay in Zion a chief cornerstone, chosen and precious. He who believes in him will not be disappointed.” For you who believe therefore is the honor, but for those who are disobedient, “The stone which the builders rejected has become the chief cornerstone,” and, “a stumbling stone and a rock of offense.” For they stumble at the word, being disobedient, to which also they were appointed. But you are a chosen race, a royal priesthood, a holy nation, a people for God’s own possession, that you may proclaim the excellence of him who called you out of darkness into his marvelous light."
    },
    "B": {
      "citation": "1 John 3:18-24",
      "theme": "Let us love not in word or speech but in deed and truth",
      "text": "Children:\nMy little children, let’s not love in word only, or with the tongue only, but in deed and truth. And by this we know that we are of the truth and persuade our hearts before him, because if our heart condemns us, God is greater than our heart, and knows all things. Beloved, if our hearts don’t condemn us, we have boldness toward God; so whatever we ask, we receive from him, because we keep his commandments and do the things that are pleasing in his sight. This is his commandment, that we should believe in the name of his Son, Jesus Christ, and love one another, even as he commanded. He who keeps his commandments remains in him, and he in him. By this we know that he remains in us, by the Spirit which he gave us."
    },
    "C": {
      "citation": "Revelation 21:1-5",
      "theme": "Behold, God’s dwelling is with the human race; he will wipe every tear from their eyes",
      "text": "I saw a new heaven and a new earth, for the first heaven and the first earth have passed away, and the sea is no more. I saw the holy city, New Jerusalem, coming down out of heaven from God, prepared like a bride adorned for her husband. I heard a loud voice out of heaven saying, “Behold, God’s dwelling is with people; and he will dwell with them, and they will be his people, and God himself will be with them as their God. He will wipe away every tear from their eyes. Death will be no more; neither will there be mourning, nor crying, nor pain any more. The first things have passed away.” He who sits on the throne said, “Behold, I am making all things new.” He said, “Write, for these words of God are faithful and true.”"
    }
  },
  "EASTER_6": {
    "A": {
      "citation": "1 Peter 3:15-18",
      "theme": "Always be ready to give an explanation for the reason for your hope",
      "text": "Beloved:\nBut sanctify the Lord God in your hearts. Always be ready to give an answer to everyone who asks you a reason concerning the hope that is in you, with humility and fear, having a good conscience. Thus, while you are spoken against as evildoers, they may be disappointed who curse your good way of life in Christ. For it is better, if it is God’s will, that you suffer for doing what is right than for doing evil. Because Christ also suffered for sins once, the righteous for the unrighteous, that he might bring you to God, being put to death in the flesh, but made alive in the Spirit,"
    },
    "B": {
      "citation": "1 John 4:7-10",
      "theme": "Let us love one another, because love is of God; God is love",
      "text": "Beloved, let’s love one another, for love is of God; and everyone who loves has been born of God and knows God. He who doesn’t love doesn’t know God, for God is love. By this God’s love was revealed in us, that God has sent his only born Son into the world that we might live through him. In this is love, not that we loved God, but that he loved us, and sent his Son as the atoning sacrifice for our sins."
    },
    "C": {
      "citation": "Revelation 21:10-14, 22-23",
      "theme": "The glory of God gave the holy city light, and its lamp was the Lamb",
      "text": "He carried me away in the Spirit to a great and high mountain, and showed me the holy city, Jerusalem, coming down out of heaven from God, having the glory of God. Her light was like a most precious stone, like a jasper stone, clear as crystal; having a great and high wall with twelve gates, and at the gates twelve angels, and names written on them, which are the names of the twelve tribes of the children of Israel. On the east were three gates, and on the north three gates, and on the south three gates, and on the west three gates. The wall of the city had twelve foundations, and on them twelve names of the twelve Apostles of the Lamb. I saw no temple in it, for the Lord God the Almighty and the Lamb are its temple. The city has no need for the sun or moon to shine, for the very glory of God illuminated it and its lamp is the Lamb."
    }
  },
  "EASTER_7": {
    "A": {
      "citation": "1 Peter 4:13-16",
      "theme": "Rejoice to the extent that you share in the sufferings of Christ",
      "text": "Beloved:\nBut because you are partakers of Christ’s sufferings, rejoice, that at the revelation of his glory you also may rejoice with exceeding joy. If you are insulted for the name of Christ, you are blessed, because the Spirit of glory and of God rests on you. On their part he is blasphemed, but on your part he is glorified. But let none of you suffer as a murderer, or a thief, or an evil doer, or a meddler in other men’s matters. But if one of you suffers for being a Christian, let him not be ashamed; but let him glorify God in this matter."
    },
    "B": {
      "citation": "1 John 4:11-16",
      "theme": "Whoever remains in love remains in God and God in him",
      "text": "Beloved, if God loved us in this way, we also ought to love one another. No one has seen God at any time. If we love one another, God remains in us, and his love has been perfected in us. By this we know that we remain in him and he in us, because he has given us of his Spirit. We have seen and testify that the Father has sent the Son as the Savior of the world. Whoever confesses that Jesus is the Son of God, God remains in him, and he in God. We know and have believed the love which God has for us. God is love, and he who remains in love remains in God, and God remains in him."
    },
    "C": {
      "citation": "Revelation 22:12-14, 16-17, 20",
      "theme": "Come, Lord Jesus!",
      "text": "“Behold, I am coming soon! My reward is with me, to repay to each man according to his work. I am the Alpha and the Omega, the First and the Last, the Beginning and the End. Blessed are those who do his commandments, that they may have the right to the tree of life, and may enter in by the gates into the city. I, Jesus, have sent my angel to testify these things to you for the assemblies. I am the root and the offspring of David, the Bright and Morning Star.” The Spirit and the bride say, “Come!” He who hears, let him say, “Come!” He who is thirsty, let him come. He who desires, let him take the water of life freely. He who testifies these things says, “Yes, I am coming soon.” Amen! Yes, come, Lord Jesus!"
    }
  },
  "PENTECOST": {
    "A": {
      "citation": "1 Corinthians 12:3-7, 12-13",
      "theme": "In one Spirit we were all baptized into one body",
      "text": "Brothers and sisters:\nTherefore I make known to you that no man speaking by God’s Spirit says, “Jesus is accursed.” No one can say, “Jesus is Lord,” but by the Holy Spirit. Now there are various kinds of gifts, but the same Spirit. There are various kinds of service, and the same Lord. There are various kinds of workings, but the same God who works all things in all. But to each one is given the manifestation of the Spirit for the profit of all. For as the body is one and has many members, and all the members of the body, being many, are one body; so also is Christ. For in one Spirit we were all baptized into one body, whether Jews or Greeks, whether bond or free; and were all given to drink into one Spirit."
    },
    "B": {
      "citation": "Galatians 5:16-25",
      "theme": "The fruit of the Spirit is love, joy, peace, patience, kindness, generosity, faithfulness, gentleness, self-control",
      "text": "Brothers and sisters:\nBut I say, walk by the Spirit, and you won’t fulfill the lust of the flesh. For the flesh lusts against the Spirit, and the Spirit against the flesh; and these are contrary to one another, that you may not do the things that you desire. But if you are led by the Spirit, you are not under the law. Now the deeds of the flesh are obvious, which are: adultery, sexual immorality, uncleanness, lustfulness, idolatry, sorcery, hatred, strife, jealousies, outbursts of anger, rivalries, divisions, heresies, envy, murders, drunkenness, orgies, and things like these; of which I forewarn you, even as I also forewarned you, that those who practice such things will not inherit God’s Kingdom. But the fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faith, gentleness, and self-control. Against such things there is no law. Those who belong to Christ have crucified the flesh with its passions and lusts. If we live by the Spirit, let’s also walk by the Spirit."
    },
    "C": {
      "citation": "Romans 8:8-17",
      "theme": "Those who are led by the Spirit of God are sons of God",
      "text": "Brothers and sisters:\nThose who are in the flesh can’t please God. But you are not in the flesh but in the Spirit, if it is so that the Spirit of God dwells in you. But if any man doesn’t have the Spirit of Christ, he is not his. If Christ is in you, the body is dead because of sin, but the spirit is alive because of righteousness. But if the Spirit of him who raised up Jesus from the dead dwells in you, he who raised up Christ Jesus from the dead will also give life to your mortal bodies through his Spirit who dwells in you. So then, brothers, we are debtors, not to the flesh, to live after the flesh. For if you live after the flesh, you must die; but if by the Spirit you put to death the deeds of the body, you will live. For as many as are led by the Spirit of God, these are children of God. For you didn’t receive the spirit of bondage again to fear, but you received the Spirit of adoption, by whom we cry, “Abba! Father!” The Spirit himself testifies with our spirit that we are children of God; and if children, then heirs—heirs of God and joint heirs with Christ, if indeed we suffer with him, that we may also be glorified with him."
    }
  },
  "TRINITY": {
    "A": {
      "citation": "2 Corinthians 13:11-13",
      "theme": "The grace of the Lord Jesus Christ, the love of God, and the fellowship of the Holy Spirit",
      "text": "Brothers and sisters:\nFinally, brothers, rejoice! Be perfected. Be comforted. Be of the same mind. Live in peace, and the God of love and peace will be with you. Greet one another with a holy kiss. All the saints greet you."
    },
    "B": {
      "citation": "Romans 8:14-17",
      "theme": "You received a Spirit of adoption, through whom we cry, Abba, Father!",
      "text": "Brothers and sisters:\nFor as many as are led by the Spirit of God, these are children of God. For you didn’t receive the spirit of bondage again to fear, but you received the Spirit of adoption, by whom we cry, “Abba! Father!” The Spirit himself testifies with our spirit that we are children of God; and if children, then heirs—heirs of God and joint heirs with Christ, if indeed we suffer with him, that we may also be glorified with him."
    },
    "C": {
      "citation": "Romans 5:1-5",
      "theme": "We have peace with God through our Lord Jesus Christ",
      "text": "Brothers and sisters:\nBeing therefore justified by faith, we have peace with God through our Lord Jesus Christ; through whom we also have our access by faith into this grace in which we stand. We rejoice in hope of the glory of God. Not only this, but we also rejoice in our sufferings, knowing that suffering produces perseverance; and perseverance, proven character; and proven character, hope; and hope doesn’t disappoint us, because God’s love has been poured into our hearts through the Holy Spirit who was given to us."
    }
  },
  "CORPUS_CHRISTI": {
    "A": {
      "citation": "1 Corinthians 10:16-17",
      "theme": "Because the loaf of bread is one, we, though many, are one body",
      "text": "Brothers and sisters:\nThe cup of blessing which we bless, isn’t it a sharing of the blood of Christ? The bread which we break, isn’t it a sharing of the body of Christ? Because there is one loaf of bread, we, who are many, are one body; for we all partake of the one loaf of bread."
    },
    "B": {
      "citation": "Hebrews 9:11-15",
      "theme": "The blood of Christ will cleanse our consciences to worship the living God",
      "text": "Brothers and sisters:\nBut Christ having come as a high priest of the coming good things, through the greater and more perfect tabernacle, not made with hands, that is to say, not of this creation, nor yet through the blood of goats and calves, but through his own blood, entered in once for all into the Holy Place, having obtained eternal redemption. For if the blood of goats and bulls, and the ashes of a heifer sprinkling those who have been defiled, sanctify to the cleanness of the flesh, how much more will the blood of Christ, who through the eternal Spirit offered himself without defect to God, cleanse your conscience from dead works to serve the living God? For this reason he is the mediator of a new covenant, since a death has occurred for the redemption of the transgressions that were under the first covenant, that those who have been called may receive the promise of the eternal inheritance."
    },
    "C": {
      "citation": "1 Corinthians 11:23-26",
      "theme": "As often as you eat this bread and drink the cup, you proclaim the death of the Lord",
      "text": "Brothers and sisters:\nFor I received from the Lord that which also I delivered to you, that the Lord Jesus on the night in which he was betrayed took bread. When he had given thanks, he broke it and said, “Take, eat. This is my body, which is broken for you. Do this in memory of me.” In the same way he also took the cup after supper, saying, “This cup is the new covenant in my blood. Do this, as often as you drink, in memory of me.” For as often as you eat this bread and drink this cup, you proclaim the Lord’s death until he comes."
    }
  },
  "CHRIST_THE_KING": {
    "A": {
      "citation": "1 Corinthians 15:20-26, 28",
      "theme": "Christ will hand over the kingdom to God the Father, that God may be all in all",
      "text": "Brothers and sisters:\nBut now Christ has been raised from the dead. He became the first fruit of those who are asleep. For since death came by man, the resurrection of the dead also came by man. For as in Adam all die, so also in Christ all will be made alive. But each in his own order: Christ the first fruits, then those who are Christ’s at his coming. Then the end comes, when he will deliver up the Kingdom to God the Father, when he will have abolished all rule and all authority and power. For he must reign until he has put all his enemies under his feet. The last enemy that will be abolished is death. When all things have been subjected to him, then the Son will also himself be subjected to him who subjected all things to him, that God may be all in all."
    },
    "B": {
      "citation": "Revelation 1:5-8",
      "theme": "Ruler of the kings of the earth; he has made us into a kingdom, priests for his God and Father",
      "text": "and from Jesus Christ, the faithful witness, the firstborn of the dead, and the ruler of the kings of the earth. To him who loves us, and washed us from our sins by his blood— and he made us to be a Kingdom, priests to his God and Father—to him be the glory and the dominion forever and ever. Amen. Behold, he is coming with the clouds, and every eye will see him, including those who pierced him. All the tribes of the earth will mourn over him. Even so, Amen. “I am the Alpha and the Omega,” says the Lord God, “who is and who was and who is to come, the Almighty.”"
    },
    "C": {
      "citation": "Colossians 1:12-20",
      "theme": "He transferred us to the kingdom of his beloved Son",
      "text": "Brothers and sisters:\ngiving thanks to the Father, who made us fit to be partakers of the inheritance of the saints in light, who delivered us out of the power of darkness, and translated us into the Kingdom of the Son of his love, in whom we have our redemption, the forgiveness of our sins. He is the image of the invisible God, the firstborn of all creation. For by him all things were created in the heavens and on the earth, visible things and invisible things, whether thrones or dominions or principalities or powers. All things have been created through him and for him. He is before all things, and in him all things are held together. He is the head of the body, the assembly, who is the beginning, the firstborn from the dead, that in all things he might have the preeminence. For all the fullness was pleased to dwell in him, and through him to reconcile all things to himself by him, whether things on the earth or things in the heavens, having made peace through the blood of his cross."
    }
  },
  "OT_2": {
    "A": {
      "citation": "1 Corinthians 1:1-3",
      "theme": "Grace to you and peace from God our Father and the Lord Jesus Christ",
      "text": "Paul, called to be an apostle of Jesus Christ through the will of God, and our brother Sosthenes, to the assembly of God which is at Corinth—those who are sanctified in Christ Jesus, called saints, with all who call on the name of our Lord Jesus Christ in every place, both theirs and ours: Grace to you and peace from God our Father and the Lord Jesus Christ."
    },
    "B": {
      "citation": "1 Corinthians 6:13-15, 17-20",
      "theme": "Your body is a temple of the Holy Spirit; therefore glorify God in your body",
      "text": "Brothers and sisters:\n“Foods for the belly, and the belly for foods,” but God will bring to nothing both it and them. But the body is not for sexual immorality, but for the Lord, and the Lord for the body. Now God raised up the Lord, and will also raise us up by his power. Don’t you know that your bodies are members of Christ? Shall I then take the members of Christ and make them members of a prostitute? May it never be! But he who is joined to the Lord is one spirit. Flee sexual immorality! “Every sin that a man does is outside the body,” but he who commits sexual immorality sins against his own body. Or don’t you know that your body is a temple of the Holy Spirit who is in you, whom you have from God? You are not your own, for you were bought with a price. Therefore glorify God in your body and in your spirit, which are God’s."
    },
    "C": {
      "citation": "1 Corinthians 12:4-11",
      "theme": "One and the same Spirit distributes different gifts to each as he wishes",
      "text": "Brothers and sisters:\nNow there are various kinds of gifts, but the same Spirit. There are various kinds of service, and the same Lord. There are various kinds of workings, but the same God who works all things in all. But to each one is given the manifestation of the Spirit for the profit of all. For to one is given through the Spirit the word of wisdom, and to another the word of knowledge according to the same Spirit, to another faith by the same Spirit, and to another gifts of healings by the same Spirit, and to another workings of miracles, and to another prophecy, and to another discerning of spirits, to another different kinds of languages, and to another the interpretation of languages. But the one and the same Spirit produces all of these, distributing to each one separately as he desires."
    }
  },
  "OT_3": {
    "A": {
      "citation": "1 Corinthians 1:10-13, 17",
      "theme": "Let there be no divisions among you; be united in the same mind and purpose",
      "text": "Brothers and sisters:\nNow I beg you, brothers, through the name of our Lord, Jesus Christ, that you all speak the same thing, and that there be no divisions among you, but that you be perfected together in the same mind and in the same judgment. For it has been reported to me concerning you, my brothers, by those who are from Chloe’s household, that there are contentions among you. Now I mean this, that each one of you says, “I follow Paul,” “I follow Apollos,” “I follow Cephas,” and, “I follow Christ.” Is Christ divided? Was Paul crucified for you? Or were you baptized into the name of Paul? For Christ sent me not to baptize, but to preach the Good News—not in wisdom of words, so that the cross of Christ wouldn’t be made void."
    },
    "B": {
      "citation": "1 Corinthians 7:29-31",
      "theme": "The world in its present form is passing away",
      "text": "Brothers and sisters:\nBut I say this, brothers: the time is short. From now on, both those who have wives may be as though they had none; and those who weep, as though they didn’t weep; and those who rejoice, as though they didn’t rejoice; and those who buy, as though they didn’t possess; and those who use the world, as not using it to the fullest. For the mode of this world passes away."
    },
    "C": {
      "citation": "1 Corinthians 12:12-14, 27",
      "theme": "You are Christ’s body, and individually parts of it",
      "text": "Brothers and sisters:\nFor as the body is one and has many members, and all the members of the body, being many, are one body; so also is Christ. For in one Spirit we were all baptized into one body, whether Jews or Greeks, whether bond or free; and were all given to drink into one Spirit. For the body is not one member, but many. Now you are the body of Christ, and members individually."
    }
  },
  "OT_4": {
    "A": {
      "citation": "1 Corinthians 1:26-31",
      "theme": "God chose the weak of the world to shame the strong",
      "text": "Brothers and sisters:\nFor you see your calling, brothers, that not many are wise according to the flesh, not many mighty, and not many noble; but God chose the foolish things of the world that he might put to shame those who are wise. God chose the weak things of the world that he might put to shame the things that are strong. God chose the lowly things of the world, and the things that are despised, and the things that don’t exist, that he might bring to nothing the things that exist, that no flesh should boast before God. Because of him, you are in Christ Jesus, who was made to us wisdom from God, and righteousness and sanctification, and redemption, that, as it is written, “He who boasts, let him boast in the Lord.”"
    },
    "B": {
      "citation": "1 Corinthians 7:32-35",
      "theme": "Adherence to the Lord without distraction",
      "text": "Brothers and sisters:\nBut I desire to have you to be free from cares. He who is unmarried is concerned for the things of the Lord, how he may please the Lord; but he who is married is concerned about the things of the world, how he may please his wife. There is also a difference between a wife and a virgin. The unmarried woman cares about the things of the Lord, that she may be holy both in body and in spirit. But she who is married cares about the things of the world—how she may please her husband. This I say for your own benefit, not that I may ensnare you, but for that which is appropriate, and that you may attend to the Lord without distraction."
    },
    "C": {
      "citation": "1 Corinthians 12:31–13:13",
      "theme": "Faith, hope, and love remain, these three; but the greatest of these is love",
      "text": "Brothers and sisters:\nBut earnestly desire the best gifts. Moreover, I show a most excellent way to you. If I speak with the languages of men and of angels, but don’t have love, I have become sounding brass or a clanging cymbal. If I have the gift of prophecy, and know all mysteries and all knowledge, and if I have all faith, so as to remove mountains, but don’t have love, I am nothing. If I give away all my goods to feed the poor, and if I give my body to be burned, but don’t have love, it profits me nothing. Love is patient and is kind. Love doesn’t envy. Love doesn’t brag, is not proud, doesn’t behave itself inappropriately, doesn’t seek its own way, is not provoked, takes no account of evil; doesn’t rejoice in unrighteousness, but rejoices with the truth; bears all things, believes all things, hopes all things, and endures all things. Love never fails. But where there are prophecies, they will be done away with. Where there are various languages, they will cease. Where there is knowledge, it will be done away with. For we know in part and we prophesy in part; but when that which is complete has come, then that which is partial will be done away with. When I was a child, I spoke as a child, I felt as a child, I thought as a child. Now that I have become a man, I have put away childish things. For now we see in a mirror, dimly, but then face to face. Now I know in part, but then I will know fully, even as I was also fully known. But now faith, hope, and love remain—these three. The greatest of these is love."
    }
  },
  "OT_5": {
    "A": {
      "citation": "1 Corinthians 2:1-5",
      "theme": "I resolved to know nothing while I was with you except Jesus Christ, and him crucified",
      "text": "Brothers and sisters:\nWhen I came to you, brothers, I didn’t come with excellence of speech or of wisdom, proclaiming to you the testimony of God. For I determined not to know anything among you except Jesus Christ and him crucified. I was with you in weakness, in fear, and in much trembling. My speech and my preaching were not in persuasive words of human wisdom, but in demonstration of the Spirit and of power, that your faith wouldn’t stand in the wisdom of men, but in the power of God."
    },
    "B": {
      "citation": "1 Corinthians 9:16-19, 22-23",
      "theme": "Woe to me if I do not preach the Gospel!",
      "text": "Brothers and sisters:\nFor if I preach the Good News, I have nothing to boast about, for necessity is laid on me; but woe is to me if I don’t preach the Good News. For if I do this of my own will, I have a reward. But if not of my own will, I have a stewardship entrusted to me. What then is my reward? That when I preach the Good News, I may present the Good News of Christ without charge, so as not to abuse my authority in the Good News. For though I was free from all, I brought myself under bondage to all, that I might gain the more. To the weak I became as weak, that I might gain the weak. I have become all things to all men, that I may by all means save some. Now I do this for the sake of the Good News, that I may be a joint partaker of it."
    },
    "C": {
      "citation": "1 Corinthians 15:1-11",
      "theme": "Christ died for our sins and was raised on the third day",
      "text": "Brothers and sisters:\nNow I declare to you, brothers, the Good News which I preached to you, which also you received, in which you also stand, by which also you are saved, if you hold firmly the word which I preached to you—unless you believed in vain. For I delivered to you first of all that which I also received: that Christ died for our sins according to the Scriptures, that he was buried, that he was raised on the third day according to the Scriptures, and that he appeared to Cephas, then to the twelve. Then he appeared to over five hundred brothers at once, most of whom remain until now, but some have also fallen asleep. Then he appeared to James, then to all the apostles, and last of all, as to the child born at the wrong time, he appeared to me also. For I am the least of the apostles, who is not worthy to be called an apostle, because I persecuted the assembly of God. But by the grace of God I am what I am. His grace which was given to me was not futile, but I worked more than all of them; yet not I, but the grace of God which was with me. Whether then it is I or they, so we preach, and so you believed."
    }
  },
  "OT_6": {
    "A": {
      "citation": "1 Corinthians 2:6-10",
      "theme": "God has revealed to us through the Spirit what eye has not seen",
      "text": "Brothers and sisters:\nWe speak wisdom, however, among those who are full grown, yet a wisdom not of this world nor of the rulers of this world who are coming to nothing. But we speak God’s wisdom in a mystery, the wisdom that has been hidden, which God foreordained before the worlds for our glory, which none of the rulers of this world has known. For had they known it, they wouldn’t have crucified the Lord of glory. But as it is written, “Things which an eye didn’t see, and an ear didn’t hear, which didn’t enter into the heart of man, these God has prepared for those who love him.” But to us, God revealed them through the Spirit. For the Spirit searches all things, yes, the deep things of God."
    },
    "B": {
      "citation": "1 Corinthians 10:31–11:1",
      "theme": "Whatever you do, do everything for the glory of God; be imitators of me, as I am of Christ",
      "text": "Brothers and sisters:\nWhether therefore you eat or drink, or whatever you do, do all to the glory of God. Give no occasion for stumbling, whether to Jews, to Greeks, or to the assembly of God; even as I also please all men in all things, not seeking my own profit, but the profit of the many, that they may be saved. Be imitators of me, even as I also am of Christ."
    },
    "C": {
      "citation": "1 Corinthians 15:12, 16-20",
      "theme": "Christ has been raised from the dead, the firstfruits of those who have fallen asleep",
      "text": "Brothers and sisters:\nNow if Christ is preached, that he has been raised from the dead, how do some among you say that there is no resurrection of the dead? For if the dead aren’t raised, neither has Christ been raised. If Christ has not been raised, your faith is vain; you are still in your sins. Then they also who are fallen asleep in Christ have perished. If we have only hoped in Christ in this life, we are of all men most pitiable. But now Christ has been raised from the dead. He became the first fruit of those who are asleep."
    }
  },
  "OT_7": {
    "A": {
      "citation": "1 Corinthians 3:16-23",
      "theme": "You are the temple of God, and the Spirit of God dwells in you",
      "text": "Brothers and sisters:\nDon’t you know that you are God’s temple and that God’s Spirit lives in you? If anyone destroys God’s temple, God will destroy him; for God’s temple is holy, which you are. Let no one deceive himself. If anyone thinks that he is wise among you in this world, let him become a fool that he may become wise. For the wisdom of this world is foolishness with God. For it is written, “He has taken the wise in their craftiness.” And again, “The Lord knows the reasoning of the wise, that it is worthless.” Therefore let no one boast in men. For all things are yours, whether Paul, or Apollos, or Cephas, or the world, or life, or death, or things present, or things to come. All are yours, and you are Christ’s, and Christ is God’s."
    },
    "B": {
      "citation": "2 Corinthians 1:18-22",
      "theme": "All the promises of God find their Yes in Jesus Christ",
      "text": "Brothers and sisters:\nBut as God is faithful, our word toward you was not “Yes and no.” For the Son of God, Jesus Christ, who was preached among you by us—by me, Silvanus, and Timothy—was not “Yes and no,” but in him is “Yes.” For however many are the promises of God, in him is the “Yes.” Therefore also through him is the “Amen”, to the glory of God through us. Now he who establishes us with you in Christ and anointed us is God, who also sealed us and gave us the down payment of the Spirit in our hearts."
    },
    "C": {
      "citation": "1 Corinthians 15:45-49",
      "theme": "Just as we have borne the image of the earthly one, we shall also bear the image of the heavenly one",
      "text": "Brothers and sisters:\nSo also it is written, “The first man Adam became a living soul.” The last Adam became a life-giving spirit. However, that which is spiritual isn’t first, but that which is natural, then that which is spiritual. The first man is of the earth, made of dust. The second man is the Lord from heaven. As is the one made of dust, such are those who are also made of dust; and as is the heavenly, such are they also that are heavenly. As we have borne the image of those made of dust, let’s also bear the image of the heavenly."
    }
  },
  "OT_8": {
    "A": {
      "citation": "1 Corinthians 4:1-5",
      "theme": "Servants of Christ and stewards of the mysteries of God",
      "text": "Brothers and sisters:\nSo let a man think of us as Christ’s servants and stewards of God’s mysteries. Here, moreover, it is required of stewards that they be found faithful. But with me it is a very small thing that I should be judged by you, or by a human court. Yes, I don’t even judge my own self. For I know nothing against myself. Yet I am not justified by this, but he who judges me is the Lord. Therefore judge nothing before the time, until the Lord comes, who will both bring to light the hidden things of darkness and reveal the counsels of the hearts. Then each man will get his praise from God."
    },
    "B": {
      "citation": "2 Corinthians 3:1-6",
      "theme": "A letter of Christ written not in ink but by the Spirit of the living God",
      "text": "Brothers and sisters:\nAre we beginning again to commend ourselves? Or do we need, as do some, letters of commendation to you or from you? You are our letter, written in our hearts, known and read by all men, being revealed that you are a letter of Christ, served by us, written not with ink, but with the Spirit of the living God; not in tablets of stone, but in tablets that are hearts of flesh. Such confidence we have through Christ toward God, not that we are sufficient of ourselves to account anything as from ourselves; but our sufficiency is from God, who also made us sufficient as servants of a new covenant, not of the letter but of the Spirit. For the letter kills, but the Spirit gives life."
    },
    "C": {
      "citation": "1 Corinthians 15:54-58",
      "theme": "Thanks be to God who gives us the victory through our Lord Jesus Christ",
      "text": "Brothers and sisters:\nBut when this perishable body will have become imperishable, and this mortal will have put on immortality, then what is written will happen: “Death is swallowed up in victory.” “Death, where is your sting? Hades, where is your victory?” The sting of death is sin, and the power of sin is the law. But thanks be to God, who gives us the victory through our Lord Jesus Christ. Therefore, my beloved brothers, be steadfast, immovable, always abounding in the Lord’s work, because you know that your labor is not in vain in the Lord."
    }
  },
  "OT_9": {
    "A": {
      "citation": "Romans 3:21-25, 28",
      "theme": "Justified freely by God’s grace through the redemption in Christ Jesus",
      "text": "Brothers and sisters:\nBut now apart from the law, a righteousness of God has been revealed, being testified by the law and the prophets; even the righteousness of God through faith in Jesus Christ to all and on all those who believe. For there is no distinction, for all have sinned, and fall short of the glory of God; being justified freely by his grace through the redemption that is in Christ Jesus, whom God sent to be an atoning sacrifice through faith in his blood, for a demonstration of his righteousness through the passing over of prior sins, in God’s forbearance; We maintain therefore that a man is justified by faith apart from the works of the law."
    },
    "B": {
      "citation": "2 Corinthians 4:6-11",
      "theme": "We hold this treasure in earthen vessels, that the surpassing power may be of God",
      "text": "Brothers and sisters:\nseeing it is God who said, “Light will shine out of darkness,” who has shone in our hearts to give the light of the knowledge of the glory of God in the face of Jesus Christ. But we have this treasure in clay vessels, that the exceeding greatness of the power may be of God and not from ourselves. We are pressed on every side, yet not crushed; perplexed, yet not to despair; pursued, yet not forsaken; struck down, yet not destroyed; always carrying in the body the putting to death of the Lord Jesus, that the life of Jesus may also be revealed in our body. For we who live are always delivered to death for Jesus’ sake, that the life also of Jesus may be revealed in our mortal flesh."
    },
    "C": {
      "citation": "Galatians 1:1-2, 6-10",
      "theme": "There is no other Gospel than the Gospel of Christ",
      "text": "Paul, an apostle—not from men, nor through man, but through Jesus Christ, and God the Father, who raised him from the dead— and all the brothers who are with me, to the assemblies of Galatia: I marvel that you are so quickly deserting him who called you in the grace of Christ to a different “good news”, but there isn’t another “good news.” Only there are some who trouble you and want to pervert the Good News of Christ. But even though we, or an angel from heaven, should preach to you any “good news” other than that which we preached to you, let him be cursed. As we have said before, so I now say again: if any man preaches to you any “good news” other than that which you received, let him be cursed. For am I now seeking the favor of men, or of God? Or am I striving to please men? For if I were still pleasing men, I wouldn’t be a servant of Christ."
    }
  },
  "OT_10": {
    "A": {
      "citation": "Romans 4:18-25",
      "theme": "Jesus our Lord was handed over for our transgressions and raised for our justification",
      "text": "Brothers and sisters:\nAgainst hope, Abraham in hope believed, to the end that he might become a father of many nations, according to that which had been spoken, “So will your offspring be.” Without being weakened in faith, he didn’t consider his own body, already having been worn out, (he being about a hundred years old), and the deadness of Sarah’s womb. Yet, looking to the promise of God, he didn’t waver through unbelief, but grew strong through faith, giving glory to God, and being fully assured that what he had promised, he was also able to perform. Therefore it also was “credited to him for righteousness.” Now it was not written that it was accounted to him for his sake alone, but for our sake also, to whom it will be accounted, who believe in him who raised Jesus our Lord from the dead, who was delivered up for our trespasses, and was raised for our justification."
    },
    "B": {
      "citation": "2 Corinthians 4:13–5:1",
      "theme": "We look not to what is seen but to what is unseen, for what is unseen is eternal",
      "text": "Brothers and sisters:\nBut having the same spirit of faith, according to that which is written, “I believed, and therefore I spoke.” We also believe, and therefore we also speak, knowing that he who raised the Lord Jesus will raise us also through Jesus, and will present us with you. For all things are for your sakes, that the grace, being multiplied through the many, may cause the thanksgiving to abound to the glory of God. Therefore we don’t faint, but though our outward person is decaying, yet our inward person is renewed day by day. For our light affliction, which is for the moment, works for us more and more exceedingly an eternal weight of glory, while we don’t look at the things which are seen, but at the things which are not seen. For the things which are seen are temporal, but the things which are not seen are eternal. For we know that if the earthly house of our tent is dissolved, we have a building from God, a house not made with hands, eternal, in the heavens."
    },
    "C": {
      "citation": "Galatians 1:11-19",
      "theme": "God was pleased to reveal his Son to me so that I might proclaim him",
      "text": "Brothers and sisters:\nBut I make known to you, brothers, concerning the Good News which was preached by me, that it is not according to man. For I didn’t receive it from man, nor was I taught it, but it came to me through revelation of Jesus Christ. For you have heard of my way of living in time past in the Jews’ religion, how that beyond measure I persecuted the assembly of God and ravaged it. I advanced in the Jews’ religion beyond many of my own age among my countrymen, being more exceedingly zealous for the traditions of my fathers. But when it was the good pleasure of God, who separated me from my mother’s womb and called me through his grace, to reveal his Son in me, that I might preach him among the Gentiles, I didn’t immediately confer with flesh and blood, nor did I go up to Jerusalem to those who were apostles before me, but I went away into Arabia. Then I returned to Damascus. Then after three years I went up to Jerusalem to visit Peter, and stayed with him fifteen days. But of the other apostles I saw no one except James, the Lord’s brother."
    }
  },
  "OT_11": {
    "A": {
      "citation": "Romans 5:6-11",
      "theme": "God proves his love for us in that while we were still sinners Christ died for us",
      "text": "Brothers and sisters:\nFor while we were yet weak, at the right time Christ died for the ungodly. For one will hardly die for a righteous man. Yet perhaps for a good person someone would even dare to die. But God commends his own love toward us, in that while we were yet sinners, Christ died for us. Much more then, being now justified by his blood, we will be saved from God’s wrath through him. For if while we were enemies, we were reconciled to God through the death of his Son, much more, being reconciled, we will be saved by his life. Not only so, but we also rejoice in God through our Lord Jesus Christ, through whom we have now received the reconciliation."
    },
    "B": {
      "citation": "2 Corinthians 5:6-10",
      "theme": "We walk by faith, not by sight",
      "text": "Brothers and sisters:\nTherefore we are always confident and know that while we are at home in the body, we are absent from the Lord; for we walk by faith, not by sight. We are courageous, I say, and are willing rather to be absent from the body and to be at home with the Lord. Therefore also we make it our aim, whether at home or absent, to be well pleasing to him. For we must all be revealed before the judgment seat of Christ that each one may receive the things in the body according to what he has done, whether good or bad."
    },
    "C": {
      "citation": "Galatians 2:16, 19-21",
      "theme": "I live, no longer I, but Christ lives in me",
      "text": "Brothers and sisters:\nyet knowing that a man is not justified by the works of the law but through faith in Jesus Christ, even we believed in Christ Jesus, that we might be justified by faith in Christ and not by the works of the law, because no flesh will be justified by the works of the law. For I through the law died to the law, that I might live to God. I have been crucified with Christ, and it is no longer I who live, but Christ lives in me. That life which I now live in the flesh, I live by faith in the Son of God, who loved me and gave himself up for me. I don’t reject the grace of God. For if righteousness is through the law, then Christ died for nothing!”"
    }
  },
  "OT_12": {
    "A": {
      "citation": "Romans 5:12-15",
      "theme": "The gift of grace through the one man Jesus Christ overflows for the many",
      "text": "Brothers and sisters:\nTherefore, as sin entered into the world through one man, and death through sin, so death passed to all men because all sinned. For until the law, sin was in the world; but sin is not charged when there is no law. Nevertheless death reigned from Adam until Moses, even over those whose sins weren’t like Adam’s disobedience, who is a foreshadowing of him who was to come. But the free gift isn’t like the trespass. For if by the trespass of the one the many died, much more did the grace of God and the gift by the grace of the one man, Jesus Christ, abound to the many."
    },
    "B": {
      "citation": "2 Corinthians 5:14-17",
      "theme": "The love of Christ impels us; whoever is in Christ is a new creation",
      "text": "Brothers and sisters:\nFor the love of Christ compels us; because we judge thus: that one died for all, therefore all died. He died for all, that those who live should no longer live to themselves, but to him who for their sakes died and rose again. Therefore we know no one according to the flesh from now on. Even though we have known Christ according to the flesh, yet now we know him so no more. Therefore if anyone is in Christ, he is a new creation. The old things have passed away. Behold, all things have become new."
    },
    "C": {
      "citation": "Galatians 3:26-29",
      "theme": "All of you who were baptized into Christ have clothed yourselves with Christ",
      "text": "Brothers and sisters:\nFor you are all children of God, through faith in Christ Jesus. For as many of you as were baptized into Christ have put on Christ. There is neither Jew nor Greek, there is neither slave nor free man, there is neither male nor female; for you are all one in Christ Jesus. If you are Christ’s, then you are Abraham’s offspring and heirs according to promise."
    }
  },
  "OT_13": {
    "A": {
      "citation": "Romans 6:3-4, 8-11",
      "theme": "Buried with Christ through baptism into death, so that we too might live in newness of life",
      "text": "Brothers and sisters:\nOr don’t you know that all of us who were baptized into Christ Jesus were baptized into his death? We were buried therefore with him through baptism into death, that just as Christ was raised from the dead through the glory of the Father, so we also might walk in newness of life. But if we died with Christ, we believe that we will also live with him, knowing that Christ, being raised from the dead, dies no more. Death no longer has dominion over him! For the death that he died, he died to sin one time; but the life that he lives, he lives to God. Thus consider yourselves also to be dead to sin, but alive to God in Christ Jesus our Lord."
    },
    "B": {
      "citation": "2 Corinthians 8:7, 9, 13-15",
      "theme": "Though rich, Christ became poor for your sake, so that by his poverty you might become rich",
      "text": "Brothers and sisters:\nBut as you abound in everything—in faith, utterance, knowledge, all earnestness, and in your love to us—see that you also abound in this grace. For you know the grace of our Lord Jesus Christ, that though he was rich, yet for your sakes he became poor, that you through his poverty might become rich. For this is not that others may be eased and you distressed, but for equality. Your abundance at this present time supplies their lack, that their abundance also may become a supply for your lack, that there may be equality. As it is written, “He who gathered much had nothing left over, and he who gathered little had no lack.”"
    },
    "C": {
      "citation": "Galatians 5:1, 13-18",
      "theme": "For freedom Christ set us free; serve one another through love",
      "text": "Brothers and sisters:\nStand firm therefore in the liberty by which Christ has made us free, and don’t be entangled again with a yoke of bondage. For you, brothers, were called for freedom. Only don’t use your freedom as an opportunity for the flesh, but through love be servants to one another. For the whole law is fulfilled in one word, in this: “You shall love your neighbor as yourself.” But if you bite and devour one another, be careful that you don’t consume one another. But I say, walk by the Spirit, and you won’t fulfill the lust of the flesh. For the flesh lusts against the Spirit, and the Spirit against the flesh; and these are contrary to one another, that you may not do the things that you desire. But if you are led by the Spirit, you are not under the law."
    }
  },
  "OT_14": {
    "A": {
      "citation": "Romans 8:9, 11-13",
      "theme": "If by the Spirit you put to death the deeds of the body, you will live",
      "text": "But you are not in the flesh but in the Spirit, if it is so that the Spirit of God dwells in you. But if any man doesn’t have the Spirit of Christ, he is not his. But if the Spirit of him who raised up Jesus from the dead dwells in you, he who raised up Christ Jesus from the dead will also give life to your mortal bodies through his Spirit who dwells in you. So then, brothers, we are debtors, not to the flesh, to live after the flesh. For if you live after the flesh, you must die; but if by the Spirit you put to death the deeds of the body, you will live."
    },
    "B": {
      "citation": "2 Corinthians 12:7-10",
      "theme": "My grace is sufficient for you, for power is made perfect in weakness",
      "text": "Brothers and sisters:\nBy reason of the exceeding greatness of the revelations, that I should not be exalted excessively, a thorn in the flesh was given to me: a messenger of Satan to torment me, that I should not be exalted excessively. Concerning this thing, I begged the Lord three times that it might depart from me. He has said to me, “My grace is sufficient for you, for my power is made perfect in weakness.” Most gladly therefore I will rather glory in my weaknesses, that the power of Christ may rest on me. Therefore I take pleasure in weaknesses, in injuries, in necessities, in persecutions, and in distresses, for Christ’s sake. For when I am weak, then am I strong."
    },
    "C": {
      "citation": "Galatians 6:14-18",
      "theme": "May I never boast except in the cross of our Lord Jesus Christ",
      "text": "Brothers and sisters:\nBut far be it from me to boast except in the cross of our Lord Jesus Christ, through which the world has been crucified to me, and I to the world. For in Christ Jesus neither is circumcision anything, nor uncircumcision, but a new creation. As many as walk by this rule, peace and mercy be on them, and on God’s Israel. From now on, let no one cause me any trouble, for I bear the marks of the Lord Jesus branded on my body. The grace of our Lord Jesus Christ be with your spirit, brothers. Amen."
    }
  },
  "OT_15": {
    "A": {
      "citation": "Romans 8:18-23",
      "theme": "Creation awaits with eager expectation the revelation of the children of God",
      "text": "Brothers and sisters:\nFor I consider that the sufferings of this present time are not worthy to be compared with the glory which will be revealed toward us. For the creation waits with eager expectation for the children of God to be revealed. For the creation was subjected to vanity, not of its own will, but because of him who subjected it, in hope that the creation itself also will be delivered from the bondage of decay into the liberty of the glory of the children of God. For we know that the whole creation groans and travails in pain together until now. Not only so, but ourselves also, who have the first fruits of the Spirit, even we ourselves groan within ourselves, waiting for adoption, the redemption of our body."
    },
    "B": {
      "citation": "Ephesians 1:3-14",
      "theme": "God has blessed us in Christ with every spiritual blessing in the heavens",
      "text": "Blessed be the God and Father of our Lord Jesus Christ, who has blessed us with every spiritual blessing in the heavenly places in Christ, even as he chose us in him before the foundation of the world, that we would be holy and without defect before him in love, having predestined us for adoption as children through Jesus Christ to himself, according to the good pleasure of his desire, to the praise of the glory of his grace, by which he freely gave us favor in the Beloved. In him we have our redemption through his blood, the forgiveness of our trespasses, according to the riches of his grace which he made to abound toward us in all wisdom and prudence, making known to us the mystery of his will, according to his good pleasure which he purposed in him to an administration of the fullness of the times, to sum up all things in Christ, the things in the heavens and the things on the earth, in him. We were also assigned an inheritance in him, having been foreordained according to the purpose of him who does all things after the counsel of his will, to the end that we should be to the praise of his glory, we who had before hoped in Christ. In him you also, having heard the word of the truth, the Good News of your salvation—in whom, having also believed, you were sealed with the promised Holy Spirit, who is a pledge of our inheritance, to the redemption of God’s own possession, to the praise of his glory."
    },
    "C": {
      "citation": "Colossians 1:15-20",
      "theme": "Christ is the image of the invisible God, the firstborn of all creation",
      "text": "Brothers and sisters:\nHe is the image of the invisible God, the firstborn of all creation. For by him all things were created in the heavens and on the earth, visible things and invisible things, whether thrones or dominions or principalities or powers. All things have been created through him and for him. He is before all things, and in him all things are held together. He is the head of the body, the assembly, who is the beginning, the firstborn from the dead, that in all things he might have the preeminence. For all the fullness was pleased to dwell in him, and through him to reconcile all things to himself by him, whether things on the earth or things in the heavens, having made peace through the blood of his cross."
    }
  },
  "OT_16": {
    "A": {
      "citation": "Romans 8:26-27",
      "theme": "The Spirit comes to the aid of our weakness and intercedes for us",
      "text": "Brothers and sisters:\nIn the same way, the Spirit also helps our weaknesses, for we don’t know how to pray as we ought. But the Spirit himself makes intercession for us with groanings which can’t be uttered. He who searches the hearts knows what is on the Spirit’s mind, because he makes intercession for the saints according to God."
    },
    "B": {
      "citation": "Ephesians 2:13-18",
      "theme": "Christ is our peace, who made both one and broke down the dividing wall of enmity",
      "text": "Brothers and sisters:\nBut now in Christ Jesus you who once were far off are made near in the blood of Christ. For he is our peace, who made both one, and broke down the middle wall of separation, having abolished in his flesh the hostility, the law of commandments contained in ordinances, that he might create in himself one new man of the two, making peace, and might reconcile them both in one body to God through the cross, having killed the hostility through it. He came and preached peace to you who were far off and to those who were near. For through him we both have our access in one Spirit to the Father."
    },
    "C": {
      "citation": "Colossians 1:24-28",
      "theme": "The mystery hidden from ages past: Christ in you, the hope for glory",
      "text": "Brothers and sisters:\nNow I rejoice in my sufferings for your sake, and fill up on my part that which is lacking of the afflictions of Christ in my flesh for his body’s sake, which is the assembly, of which I was made a servant according to the stewardship of God which was given me toward you to fulfill the word of God, the mystery which has been hidden for ages and generations. But now it has been revealed to his saints, to whom God was pleased to make known what are the riches of the glory of this mystery among the Gentiles, which is Christ in you, the hope of glory. We proclaim him, admonishing every man and teaching every man in all wisdom, that we may present every man perfect in Christ Jesus;"
    }
  },
  "OT_17": {
    "A": {
      "citation": "Romans 8:28-30",
      "theme": "All things work for good for those who love God",
      "text": "Brothers and sisters:\nWe know that all things work together for good for those who love God, for those who are called according to his purpose. For whom he foreknew, he also predestined to be conformed to the image of his Son, that he might be the firstborn among many brothers. Whom he predestined, those he also called. Whom he called, those he also justified. Whom he justified, those he also glorified."
    },
    "B": {
      "citation": "Ephesians 4:1-6",
      "theme": "One Lord, one faith, one baptism; one God and Father of all",
      "text": "Brothers and sisters:\nI therefore, the prisoner in the Lord, beg you to walk worthily of the calling with which you were called, with all lowliness and humility, with patience, bearing with one another in love, being eager to keep the unity of the Spirit in the bond of peace. There is one body and one Spirit, even as you also were called in one hope of your calling, one Lord, one faith, one baptism, one God and Father of all, who is over all and through all and in us all."
    },
    "C": {
      "citation": "Colossians 2:12-14",
      "theme": "Buried with Christ in baptism, you were also raised with him through faith",
      "text": "Brothers and sisters:\nhaving been buried with him in baptism, in which you were also raised with him through faith in the working of God, who raised him from the dead. You were dead through your trespasses and the uncircumcision of your flesh. He made you alive together with him, having forgiven us all our trespasses, wiping out the handwriting in ordinances which was against us. He has taken it out of the way, nailing it to the cross."
    }
  },
  "OT_18": {
    "A": {
      "citation": "Romans 8:35, 37-39",
      "theme": "Nothing will be able to separate us from the love of God in Christ Jesus",
      "text": "Brothers and sisters:\nWho shall separate us from the love of Christ? Could oppression, or anguish, or persecution, or famine, or nakedness, or peril, or sword? No, in all these things we are more than conquerors through him who loved us. For I am persuaded that neither death, nor life, nor angels, nor principalities, nor things present, nor things to come, nor powers, nor height, nor depth, nor any other created thing will be able to separate us from God’s love which is in Christ Jesus our Lord."
    },
    "B": {
      "citation": "Ephesians 4:17, 20-24",
      "theme": "Put on the new self, created in God’s way in righteousness and holiness of truth",
      "text": "Brothers and sisters:\nThis I say therefore, and testify in the Lord, that you no longer walk as the rest of the Gentiles also walk, in the futility of their mind, But you didn’t learn Christ that way, if indeed you heard him and were taught in him, even as truth is in Jesus: that you put away, as concerning your former way of life, the old man that grows corrupt after the lusts of deceit, and that you be renewed in the spirit of your mind, and put on the new man, who in the likeness of God has been created in righteousness and holiness of truth."
    },
    "C": {
      "citation": "Colossians 3:1-5, 9-11",
      "theme": "Seek what is above, where Christ is seated at the right hand of God",
      "text": "Brothers and sisters:\nIf then you were raised together with Christ, seek the things that are above, where Christ is, seated on the right hand of God. Set your mind on the things that are above, not on the things that are on the earth. For you died, and your life is hidden with Christ in God. When Christ, our life, is revealed, then you will also be revealed with him in glory. Put to death therefore your members which are on the earth: sexual immorality, uncleanness, depraved passion, evil desire, and covetousness, which is idolatry. Don’t lie to one another, seeing that you have put off the old man with his doings, and have put on the new man, who is being renewed in knowledge after the image of his Creator, where there can’t be Greek and Jew, circumcision and uncircumcision, barbarian, Scythian, bondservant, or free person; but Christ is all, and in all."
    }
  },
  "OT_19": {
    "A": {
      "citation": "Romans 9:1-5",
      "theme": "Christ, who is over all, God blessed forever",
      "text": "Brothers and sisters:\nI tell the truth in Christ. I am not lying, my conscience testifying with me in the Holy Spirit that I have great sorrow and unceasing pain in my heart. For I could wish that I myself were accursed from Christ for my brothers’ sake, my relatives according to the flesh who are Israelites; whose is the adoption, the glory, the covenants, the giving of the law, the service, and the promises; of whom are the fathers, and from whom is Christ as concerning the flesh, who is over all, God, blessed forever. Amen."
    },
    "B": {
      "citation": "Ephesians 4:30–5:2",
      "theme": "Live in love, as Christ loved us and handed himself over for us",
      "text": "Brothers and sisters:\nDon’t grieve the Holy Spirit of God, in whom you were sealed for the day of redemption. Let all bitterness, wrath, anger, outcry, and slander be put away from you, with all malice. And be kind to one another, tender hearted, forgiving each other, just as God also in Christ forgave you. Be therefore imitators of God, as beloved children. Walk in love, even as Christ also loved us and gave himself up for us, an offering and a sacrifice to God for a sweet-smelling fragrance."
    },
    "C": {
      "citation": "Hebrews 11:1-2, 8-19",
      "theme": "Faith is the realization of what is hoped for and evidence of things not seen",
      "text": "Brothers and sisters:\nNow faith is assurance of things hoped for, proof of things not seen. For by this, the elders obtained approval. By faith Abraham, when he was called, obeyed to go out to the place which he was to receive for an inheritance. He went out, not knowing where he went. By faith he lived as an alien in the land of promise, as in a land not his own, dwelling in tents with Isaac and Jacob, the heirs with him of the same promise. For he was looking for the city which has foundations, whose builder and maker is God. By faith even Sarah herself received power to conceive, and she bore a child when she was past age, since she counted him faithful who had promised. Therefore as many as the stars of the sky in multitude, and as innumerable as the sand which is by the sea shore, were fathered by one man, and him as good as dead. These all died in faith, not having received the promises, but having seen them and embraced them from afar, and having confessed that they were strangers and pilgrims on the earth. For those who say such things make it clear that they are seeking a country of their own. If indeed they had been thinking of that country from which they went out, they would have had enough time to return. But now they desire a better country, that is, a heavenly one. Therefore God is not ashamed of them, to be called their God, for he has prepared a city for them. By faith, Abraham, being tested, offered up Isaac. Yes, he who had gladly received the promises was offering up his only born son, to whom it was said, “Your offspring will be accounted as from Isaac,” concluding that God is able to raise up even from the dead. Figuratively speaking, he also did receive him back from the dead."
    }
  },
  "OT_20": {
    "A": {
      "citation": "Romans 11:13-15, 29-32",
      "theme": "The gifts and the call of God are irrevocable",
      "text": "Brothers and sisters:\nFor I speak to you who are Gentiles. Since then as I am an apostle to Gentiles, I glorify my ministry, if by any means I may provoke to jealousy those who are my flesh, and may save some of them. For if the rejection of them is the reconciling of the world, what would their acceptance be, but life from the dead? For the gifts and the calling of God are irrevocable. For as you in time past were disobedient to God, but now have obtained mercy by their disobedience, even so these also have now been disobedient, that by the mercy shown to you they may also obtain mercy. For God has bound all to disobedience, that he might have mercy on all."
    },
    "B": {
      "citation": "Ephesians 5:15-20",
      "theme": "Be filled with the Spirit, giving thanks always for everything to God the Father",
      "text": "Brothers and sisters:\nTherefore watch carefully how you walk, not as unwise, but as wise, redeeming the time, because the days are evil. Therefore, don’t be foolish, but understand what the will of the Lord is. Don’t be drunken with wine, in which is dissipation, but be filled with the Spirit, speaking to one another in psalms, hymns, and spiritual songs; singing and making melody in your heart to the Lord; giving thanks always concerning all things in the name of our Lord Jesus Christ to God, even the Father;"
    },
    "C": {
      "citation": "Hebrews 12:1-4",
      "theme": "Let us persevere in running the race, keeping our eyes fixed on Jesus",
      "text": "Brothers and sisters:\nTherefore let’s also, seeing we are surrounded by so great a cloud of witnesses, lay aside every weight and the sin which so easily entangles us, and let’s run with perseverance the race that is set before us, looking to Jesus, the author and perfecter of faith, who for the joy that was set before him endured the cross, despising its shame, and has sat down at the right hand of the throne of God. For consider him who has endured such contradiction of sinners against himself, that you don’t grow weary, fainting in your souls. You have not yet resisted to blood, striving against sin."
    }
  },
  "OT_21": {
    "A": {
      "citation": "Romans 11:33-36",
      "theme": "Oh, the depth of the riches and wisdom and knowledge of God!",
      "text": "Brothers and sisters:\nOh the depth of the riches both of the wisdom and the knowledge of God! How unsearchable are his judgments, and his ways past tracing out! “For who has known the mind of the Lord? Or who has been his counselor?” “Or who has first given to him, and it will be repaid to him again?” For of him and through him and to him are all things. To him be the glory for ever! Amen."
    },
    "B": {
      "citation": "Ephesians 5:21-32",
      "theme": "This is a great mystery, and I speak in reference to Christ and the Church",
      "text": "Brothers and sisters:\nsubjecting yourselves to one another in the fear of Christ. Wives, be subject to your own husbands, as to the Lord. For the husband is the head of the wife, as Christ also is the head of the assembly, being himself the savior of the body. But as the assembly is subject to Christ, so let the wives also be to their own husbands in everything. Husbands, love your wives, even as Christ also loved the assembly and gave himself up for her, that he might sanctify her, having cleansed her by the washing of water with the word, that he might present the assembly to himself gloriously, not having spot or wrinkle or any such thing, but that she should be holy and without defect. Even so husbands also ought to love their own wives as their own bodies. He who loves his own wife loves himself. For no man ever hated his own flesh, but nourishes and cherishes it, even as the Lord also does the assembly, because we are members of his body, of his flesh and bones. “For this cause a man will leave his father and mother and will be joined to his wife. Then the two will become one flesh.” This mystery is great, but I speak concerning Christ and the assembly."
    },
    "C": {
      "citation": "Hebrews 12:5-7, 11-13",
      "theme": "Whom the Lord loves, he disciplines",
      "text": "Brothers and sisters:\nYou have forgotten the exhortation which reasons with you as with children, “My son, don’t take lightly the chastening of the Lord, nor faint when you are reproved by him; for whom the Lord loves, he disciplines, and chastises every son whom he receives.” It is for discipline that you endure. God deals with you as with children, for what son is there whom his father doesn’t discipline? All chastening seems for the present to be not joyous but grievous; yet afterward it yields the peaceful fruit of righteousness to those who have been trained by it. Therefore lift up the hands that hang down and the feeble knees, and make straight paths for your feet, so what is lame may not be dislocated, but rather be healed."
    }
  },
  "OT_22": {
    "A": {
      "citation": "Romans 12:1-2",
      "theme": "Offer your bodies as a living sacrifice, holy and pleasing to God",
      "text": "Brothers and sisters:\nTherefore I urge you, brothers, by the mercies of God, to present your bodies a living sacrifice, holy, acceptable to God, which is your spiritual service. Don’t be conformed to this world, but be transformed by the renewing of your mind, so that you may prove what is the good, well-pleasing, and perfect will of God."
    },
    "B": {
      "citation": "James 1:17-18, 21-22, 27",
      "theme": "Be doers of the word and not hearers only",
      "text": "Dearest brothers and sisters:\nEvery good gift and every perfect gift is from above, coming down from the Father of lights, with whom can be no variation nor turning shadow. Of his own will he gave birth to us by the word of truth, that we should be a kind of first fruits of his creatures. Therefore, putting away all filthiness and overflowing of wickedness, receive with humility the implanted word, which is able to save your souls. But be doers of the word, and not only hearers, deluding your own selves. Pure religion and undefiled before our God and Father is this: to visit the fatherless and widows in their affliction, and to keep oneself unstained by the world."
    },
    "C": {
      "citation": "Hebrews 12:18-19, 22-24",
      "theme": "You have approached Mount Zion and the city of the living God, the heavenly Jerusalem",
      "text": "Brothers and sisters:\nFor you have not come to a mountain that might be touched and that burned with fire, and to blackness, darkness, storm, the sound of a trumpet, and the voice of words; which those who heard it begged that not one more word should be spoken to them, But you have come to Mount Zion and to the city of the living God, the heavenly Jerusalem, and to innumerable multitudes of angels, to the festal gathering and assembly of the firstborn who are enrolled in heaven, to God the Judge of all, to the spirits of just men made perfect, to Jesus, the mediator of a new covenant, and to the blood of sprinkling that speaks better than that of Abel."
    }
  },
  "OT_23": {
    "A": {
      "citation": "Romans 13:8-10",
      "theme": "Love does no evil to the neighbor; hence, love is the fulfillment of the law",
      "text": "Brothers and sisters:\nOwe no one anything, except to love one another; for he who loves his neighbor has fulfilled the law. For the commandments, “You shall not commit adultery,” “You shall not murder,” “You shall not steal,” “You shall not covet,” and whatever other commandments there are, are all summed up in this saying, namely, “You shall love your neighbor as yourself.” Love doesn’t harm a neighbor. Love therefore is the fulfillment of the law."
    },
    "B": {
      "citation": "James 2:1-5",
      "theme": "Did not God choose those who are poor in the world to be rich in faith?",
      "text": "My brothers, don’t hold the faith of our glorious Lord Jesus Christ with partiality. For if a man with a gold ring, in fine clothing, comes into your synagogue, and a poor man in filthy clothing also comes in, and you pay special attention to him who wears the fine clothing and say, “Sit here in a good place;” and you tell the poor man, “Stand there,” or “Sit by my footstool” haven’t you shown partiality among yourselves, and become judges with evil thoughts? Listen, my beloved brothers. Didn’t God choose those who are poor in this world to be rich in faith and heirs of the Kingdom which he promised to those who love him?"
    },
    "C": {
      "citation": "Philemon 9-10, 12-17",
      "theme": "Welcome him no longer as a slave, but as a beloved brother",
      "text": "Beloved:\nyet for love’s sake I rather appeal to you, being such a one as Paul, the aged, but also a prisoner of Jesus Christ. I appeal to you for my child Onesimus, whom I have become the father of in my chains, I am sending him back. Therefore receive him, that is, my own heart, whom I desired to keep with me, that on your behalf he might serve me in my chains for the Good News. But I was willing to do nothing without your consent, that your goodness would not be as of necessity, but of free will. For perhaps he was therefore separated from you for a while that you would have him forever, no longer as a slave, but more than a slave, a beloved brother—especially to me, but how much rather to you, both in the flesh and in the Lord. If then you count me a partner, receive him as you would receive me."
    }
  },
  "OT_24": {
    "A": {
      "citation": "Romans 14:7-9",
      "theme": "Whether we live or die, we are the Lord’s",
      "text": "Brothers and sisters:\nFor none of us lives to himself, and none dies to himself. For if we live, we live to the Lord. Or if we die, we die to the Lord. If therefore we live or die, we are the Lord’s. For to this end Christ died, rose, and lived again, that he might be Lord of both the dead and the living."
    },
    "B": {
      "citation": "James 2:14-18",
      "theme": "Faith of itself, if it does not have works, is dead",
      "text": "Brothers and sisters:\nWhat good is it, my brothers, if a man says he has faith, but has no works? Can faith save him? And if a brother or sister is naked and in lack of daily food, and one of you tells them, “Go in peace. Be warmed and filled;” yet you didn’t give them the things the body needs, what good is it? Even so faith, if it has no works, is dead in itself. Yes, a man will say, “You have faith, and I have works.” Show me your faith without works, and I will show you my faith by my works."
    },
    "C": {
      "citation": "1 Timothy 1:12-17",
      "theme": "Christ Jesus came into the world to save sinners",
      "text": "Beloved:\nI thank him who enabled me, Christ Jesus our Lord, because he counted me faithful, appointing me to service, although I used to be a blasphemer, a persecutor, and insolent. However, I obtained mercy because I did it ignorantly in unbelief. The grace of our Lord abounded exceedingly with faith and love which is in Christ Jesus. The saying is faithful and worthy of all acceptance, that Christ Jesus came into the world to save sinners, of whom I am chief. However, for this cause I obtained mercy, that in me first, Jesus Christ might display all his patience for an example of those who were going to believe in him for eternal life. Now to the King eternal, immortal, invisible, to God who alone is wise, be honor and glory forever and ever. Amen."
    }
  },
  "OT_25": {
    "A": {
      "citation": "Philippians 1:20-24, 27",
      "theme": "For to me life is Christ, and death is gain",
      "text": "Brothers and sisters:\naccording to my earnest expectation and hope, that I will in no way be disappointed, but with all boldness, as always, now also Christ will be magnified in my body, whether by life or by death. For to me to live is Christ, and to die is gain. But if I live on in the flesh, this will bring fruit from my work; yet I don’t know what I will choose. But I am hard pressed between the two, having the desire to depart and be with Christ, which is far better. Yet to remain in the flesh is more needful for your sake. Only let your way of life be worthy of the Good News of Christ, that whether I come and see you or am absent, I may hear of your state, that you stand firm in one spirit, with one soul striving for the faith of the Good News;"
    },
    "B": {
      "citation": "James 3:16–4:3",
      "theme": "The wisdom from above is first of all pure, then peaceable, gentle, and full of mercy",
      "text": "Beloved:\nFor where jealousy and selfish ambition are, there is confusion and every evil deed. But the wisdom that is from above is first pure, then peaceful, gentle, reasonable, full of mercy and good fruits, without partiality, and without hypocrisy. Now the fruit of righteousness is sown in peace by those who make peace. Where do wars and fightings among you come from? Don’t they come from your pleasures that war in your members? You lust, and don’t have. You murder and covet, and can’t obtain. You fight and make war. You don’t have, because you don’t ask. You ask, and don’t receive, because you ask with wrong motives, so that you may spend it on your pleasures."
    },
    "C": {
      "citation": "1 Timothy 2:1-8",
      "theme": "God wills everyone to be saved; there is one mediator between God and humanity, Christ Jesus",
      "text": "Beloved:\nI exhort therefore, first of all, that petitions, prayers, intercessions, and givings of thanks be made for all men, for kings and all who are in high places, that we may lead a tranquil and quiet life in all godliness and reverence. For this is good and acceptable in the sight of God our Savior, who desires all people to be saved and come to full knowledge of the truth. For there is one God and one mediator between God and men, the man Christ Jesus, who gave himself as a ransom for all, the testimony at the proper time, to which I was appointed a preacher and an apostle—I am telling the truth in Christ, not lying—a teacher of the Gentiles in faith and truth. I desire therefore that the men in every place pray, lifting up holy hands without anger and doubting."
    }
  },
  "OT_26": {
    "A": {
      "citation": "Philippians 2:1-11",
      "theme": "Have in you the same attitude that is also in Christ Jesus",
      "text": "Brothers and sisters:\nIf therefore there is any exhortation in Christ, if any consolation of love, if any fellowship of the Spirit, if any tender mercies and compassion, make my joy full by being like-minded, having the same love, being of one accord, of one mind; doing nothing through rivalry or through conceit, but in humility, each counting others better than himself; each of you not just looking to his own things, but each of you also to the things of others. Have this in your mind, which was also in Christ Jesus, who, existing in the form of God, didn’t consider equality with God a thing to be grasped, but emptied himself, taking the form of a servant, being made in the likeness of men. And being found in human form, he humbled himself, becoming obedient to the point of death, yes, the death of the cross. Therefore God also highly exalted him, and gave to him the name which is above every name, that at the name of Jesus every knee should bow, of those in heaven, those on earth, and those under the earth, and that every tongue should confess that Jesus Christ is Lord, to the glory of God the Father."
    },
    "B": {
      "citation": "James 5:1-6",
      "theme": "Your wealth has rotted away; the wages you withheld cry out to the Lord of hosts",
      "text": "Brothers and sisters:\nCome now, you rich, weep and howl for your miseries that are coming on you. Your riches are corrupted and your garments are moth-eaten. Your gold and your silver are corroded, and their corrosion will be for a testimony against you and will eat your flesh like fire. You have laid up your treasure in the last days. Behold, the wages of the laborers who mowed your fields, which you have kept back by fraud, cry out; and the cries of those who reaped have entered into the ears of the Lord of Armies. You have lived in luxury on the earth, and taken your pleasure. You have nourished your hearts as in a day of slaughter. You have condemned and you have murdered the righteous one. He doesn’t resist you."
    },
    "C": {
      "citation": "1 Timothy 6:11-16",
      "theme": "Compete well for the faith; lay hold of eternal life, to which you were called",
      "text": "But you, man of God, flee these things, and follow after righteousness, godliness, faith, love, perseverance, and gentleness. Fight the good fight of faith. Take hold of the eternal life to which you were called, and you confessed the good confession in the sight of many witnesses. I command you before God who gives life to all things, and before Christ Jesus who before Pontius Pilate testified the good confession, that you keep the commandment without spot, blameless until the appearing of our Lord Jesus Christ, which at the right time he will show, who is the blessed and only Ruler, the King of kings and Lord of lords. He alone has immortality, dwelling in unapproachable light, whom no man has seen nor can see, to whom be honor and eternal power. Amen."
    }
  },
  "OT_27": {
    "A": {
      "citation": "Philippians 4:6-9",
      "theme": "Have no anxiety at all; the God of peace will be with you",
      "text": "Brothers and sisters:\nIn nothing be anxious, but in everything, by prayer and petition with thanksgiving, let your requests be made known to God. And the peace of God, which surpasses all understanding, will guard your hearts and your thoughts in Christ Jesus. Finally, brothers, whatever things are true, whatever things are honorable, whatever things are just, whatever things are pure, whatever things are lovely, whatever things are of good report: if there is any virtue and if there is anything worthy of praise, think about these things. Do the things which you learned, received, heard, and saw in me, and the God of peace will be with you."
    },
    "B": {
      "citation": "Hebrews 2:9-11",
      "theme": "He who consecrates and those who are being consecrated all have one origin",
      "text": "Brothers and sisters:\nBut we see him who has been made a little lower than the angels, Jesus, because of the suffering of death crowned with glory and honor, that by the grace of God he should taste of death for everyone. For it became him, for whom are all things and through whom are all things, in bringing many children to glory, to make the author of their salvation perfect through sufferings. For both he who sanctifies and those who are sanctified are all from one, for which cause he is not ashamed to call them brothers,"
    },
    "C": {
      "citation": "2 Timothy 1:6-8, 13-14",
      "theme": "Stir into flame the gift of God that you have; guard this rich trust with the help of the Holy Spirit",
      "text": "Beloved:\nFor this cause, I remind you that you should stir up the gift of God which is in you through the laying on of my hands. For God didn’t give us a spirit of fear, but of power, love, and self-control. Therefore don’t be ashamed of the testimony of our Lord, nor of me his prisoner; but endure hardship for the Good News according to the power of God, Hold the pattern of sound words which you have heard from me, in faith and love which is in Christ Jesus. That good thing which was committed to you, guard through the Holy Spirit who dwells in us."
    }
  },
  "OT_28": {
    "A": {
      "citation": "Philippians 4:12-14, 19-20",
      "theme": "I can do all things in him who strengthens me",
      "text": "Brothers and sisters:\nI know how to be humbled, and I also know how to abound. In any and all circumstances I have learned the secret both to be filled and to be hungry, both to abound and to be in need. I can do all things through Christ who strengthens me. However you did well that you shared in my affliction. My God will supply every need of yours according to his riches in glory in Christ Jesus. Now to our God and Father be the glory forever and ever! Amen."
    },
    "B": {
      "citation": "Hebrews 4:12-13",
      "theme": "The word of God is living and effective, sharper than any two-edged sword",
      "text": "Brothers and sisters:\nFor the word of God is living and active, and sharper than any two-edged sword, piercing even to the dividing of soul and spirit, of both joints and marrow, and is able to discern the thoughts and intentions of the heart. There is no creature that is hidden from his sight, but all things are naked and laid open before the eyes of him to whom we must give an account."
    },
    "C": {
      "citation": "2 Timothy 2:8-13",
      "theme": "If we persevere we shall also reign with Christ; he remains faithful",
      "text": "Beloved:\nRemember Jesus Christ, risen from the dead, of the offspring of David, according to my Good News, in which I suffer hardship to the point of chains as a criminal. But God’s word isn’t chained. Therefore I endure all things for the chosen ones’ sake, that they also may obtain the salvation which is in Christ Jesus with eternal glory. This saying is trustworthy: “For if we died with him, we will also live with him. If we endure, we will also reign with him. If we deny him, he also will deny us. If we are faithless, he remains faithful; for he can’t deny himself.”"
    }
  },
  "OT_29": {
    "A": {
      "citation": "1 Thessalonians 1:1-5",
      "theme": "Our Gospel did not come to you in word alone, but also in power and in the Holy Spirit",
      "text": "Paul, Silvanus, and Timothy, to the assembly of the Thessalonians in God the Father and the Lord Jesus Christ: Grace to you and peace from God our Father and the Lord Jesus Christ. We always give thanks to God for all of you, mentioning you in our prayers, remembering without ceasing your work of faith and labor of love and perseverance of hope in our Lord Jesus Christ, before our God and Father. We know, brothers loved by God, that you are chosen, and that our Good News came to you not in word only, but also in power, and in the Holy Spirit and with much assurance. You know what kind of men we showed ourselves to be among you for your sake."
    },
    "B": {
      "citation": "Hebrews 4:14-16",
      "theme": "Let us confidently approach the throne of grace to receive mercy",
      "text": "Brothers and sisters:\nHaving then a great high priest who has passed through the heavens, Jesus, the Son of God, let’s hold tightly to our confession. For we don’t have a high priest who can’t be touched with the feeling of our infirmities, but one who has been in all points tempted like we are, yet without sin. Let’s therefore draw near with boldness to the throne of grace, that we may receive mercy and may find grace for help in time of need."
    },
    "C": {
      "citation": "2 Timothy 3:14–4:2",
      "theme": "All Scripture is inspired by God; proclaim the word whether it is convenient or inconvenient",
      "text": "But you remain in the things which you have learned and have been assured of, knowing from whom you have learned them. From infancy, you have known the holy Scriptures which are able to make you wise for salvation through faith which is in Christ Jesus. Every Scripture is God-breathed and profitable for teaching, for reproof, for correction, and for instruction in righteousness, that each person who belongs to God may be complete, thoroughly equipped for every good work. I command you therefore before God and the Lord Jesus Christ, who will judge the living and the dead at his appearing and his Kingdom: preach the word; be urgent in season and out of season; reprove, rebuke, and exhort with all patience and teaching."
    }
  },
  "OT_30": {
    "A": {
      "citation": "1 Thessalonians 1:5-10",
      "theme": "You turned to God from idols to serve the living and true God",
      "text": "Brothers and sisters:\nand that our Good News came to you not in word only, but also in power, and in the Holy Spirit and with much assurance. You know what kind of men we showed ourselves to be among you for your sake. You became imitators of us and of the Lord, having received the word in much affliction, with joy of the Holy Spirit, so that you became an example to all who believe in Macedonia and in Achaia. For from you the word of the Lord has been declared, not only in Macedonia and Achaia, but also in every place your faith toward God has gone out, so that we need not say anything. For they themselves report concerning us what kind of a reception we had from you, and how you turned to God from idols to serve a living and true God, and to wait for his Son from heaven, whom he raised from the dead: Jesus, who delivers us from the wrath to come."
    },
    "B": {
      "citation": "Hebrews 5:1-6",
      "theme": "You are a priest forever according to the order of Melchizedek",
      "text": "Brothers and sisters:\nFor every high priest, being taken from among men, is appointed for men in things pertaining to God, that he may offer both gifts and sacrifices for sins. The high priest can deal gently with those who are ignorant and going astray, because he himself is also surrounded with weakness. Because of this, he must offer sacrifices for sins for the people, as well as for himself. Nobody takes this honor on himself, but he is called by God, just like Aaron was. So also Christ didn’t glorify himself to be made a high priest, but it was he who said to him, “You are my Son. Today I have become your father.” As he says also in another place, “You are a priest forever, after the order of Melchizedek.”"
    },
    "C": {
      "citation": "2 Timothy 4:6-8, 16-18",
      "theme": "I have competed well; I have finished the race; I have kept the faith",
      "text": "Beloved:\nFor I am already being offered, and the time of my departure has come. I have fought the good fight. I have finished the course. I have kept the faith. From now on, the crown of righteousness is stored up for me, which the Lord, the righteous judge, will give to me on that day; and not to me only, but also to all those who have loved his appearing. At my first defense, no one came to help me, but all left me. May it not be held against them. But the Lord stood by me and strengthened me, that through me the message might be fully proclaimed, and that all the Gentiles might hear. So I was delivered out of the mouth of the lion. And the Lord will deliver me from every evil work and will preserve me for his heavenly Kingdom. To him be the glory forever and ever. Amen."
    }
  },
  "OT_31": {
    "A": {
      "citation": "1 Thessalonians 2:7-9, 13",
      "theme": "You received the word of God not as the word of human beings, but as what it truly is, the word of God",
      "text": "Brothers and sisters:\nBut we were gentle among you, like a nursing mother cherishes her own children. Even so, affectionately longing for you, we were well pleased to impart to you not the Good News of God only, but also our own souls, because you had become very dear to us. For you remember, brothers, our labor and travail; for working night and day, that we might not burden any of you, we preached to you the Good News of God. For this cause we also thank God without ceasing that when you received from us the word of the message of God, you accepted it not as the word of men, but as it is in truth, God’s word, which also works in you who believe."
    },
    "B": {
      "citation": "Hebrews 7:23-28",
      "theme": "Because Jesus remains forever, he has a priesthood that does not pass away",
      "text": "Brothers and sisters:\nMany, indeed, have been made priests, because they are hindered from continuing by death. But he, because he lives forever, has his priesthood unchangeable. Therefore he is also able to save to the uttermost those who draw near to God through him, seeing that he lives forever to make intercession for them. For such a high priest was fitting for us: holy, guiltless, undefiled, separated from sinners, and made higher than the heavens; who doesn’t need, like those high priests, to offer up sacrifices daily, first for his own sins, and then for the sins of the people. For he did this once for all, when he offered up himself. For the law appoints men as high priests who have weakness, but the word of the oath, which came after the law, appoints a Son forever who has been perfected."
    },
    "C": {
      "citation": "2 Thessalonians 1:11–2:2",
      "theme": "May the name of our Lord Jesus be glorified in you, and you in him",
      "text": "Brothers and sisters:\nTo this end we also pray always for you that our God may count you worthy of your calling, and fulfill every desire of goodness and work of faith with power, that the name of our Lord Jesus may be glorified in you, and you in him, according to the grace of our God and the Lord Jesus Christ. Now, brothers, concerning the coming of our Lord Jesus Christ and our gathering together to him, we ask you not to be quickly shaken in your mind or troubled, either by spirit or by word or by letter as if from us, saying that the day of Christ has already come."
    }
  },
  "OT_32": {
    "A": {
      "citation": "1 Thessalonians 4:13-18",
      "theme": "God, through Jesus, will bring with him those who have fallen asleep",
      "text": "Brothers and sisters:\nBut we don’t want you to be ignorant, brothers, concerning those who have fallen asleep, so that you don’t grieve like the rest, who have no hope. For if we believe that Jesus died and rose again, even so God will bring with him those who have fallen asleep in Jesus. For this we tell you by the word of the Lord, that we who are alive, who are left until the coming of the Lord, will in no way precede those who have fallen asleep. For the Lord himself will descend from heaven with a shout, with the voice of the archangel and with God’s trumpet. The dead in Christ will rise first, then we who are alive, who are left, will be caught up together with them in the clouds to meet the Lord in the air. So we will be with the Lord forever. Therefore comfort one another with these words."
    },
    "B": {
      "citation": "Hebrews 9:24-28",
      "theme": "Christ was offered once to take away the sins of many",
      "text": "Brothers and sisters:\nFor Christ hasn’t entered into holy places made with hands, which are representations of the true, but into heaven itself, now to appear in the presence of God for us; nor yet that he should offer himself often, as the high priest enters into the holy place year by year with blood not his own, or else he must have suffered often since the foundation of the world. But now once at the end of the ages, he has been revealed to put away sin by the sacrifice of himself. Inasmuch as it is appointed for men to die once, and after this, judgment, so Christ also, having been offered once to bear the sins of many, will appear a second time, not to deal with sin, but to save those who are eagerly waiting for him."
    },
    "C": {
      "citation": "2 Thessalonians 2:16–3:5",
      "theme": "May the Lord direct your hearts to the love of God and to the endurance of Christ",
      "text": "Brothers and sisters:\nNow our Lord Jesus Christ himself, and God our Father, who loved us and gave us eternal comfort and good hope through grace, comfort your hearts and establish you in every good work and word. Finally, brothers, pray for us, that the word of the Lord may spread rapidly and be glorified, even as also with you, and that we may be delivered from unreasonable and evil men; for not all have faith. But the Lord is faithful, who will establish you and guard you from the evil one. We have confidence in the Lord concerning you, that you both do and will do the things we command. May the Lord direct your hearts into God’s love and into the perseverance of Christ."
    }
  },
  "OT_33": {
    "A": {
      "citation": "1 Thessalonians 5:1-6",
      "theme": "You are children of the light and children of the day; let us stay alert and sober",
      "text": "Brothers and sisters:\nBut concerning the times and the seasons, brothers, you have no need that anything be written to you. For you yourselves know well that the day of the Lord comes like a thief in the night. For when they are saying, “Peace and safety,” then sudden destruction will come on them, like birth pains on a pregnant woman. Then they will in no way escape. But you, brothers, aren’t in darkness, that the day should overtake you like a thief. You are all children of light and children of the day. We don’t belong to the night, nor to darkness, so then let’s not sleep, as the rest do, but let’s watch and be sober."
    },
    "B": {
      "citation": "Hebrews 10:11-14, 18",
      "theme": "By one offering Christ has made perfect forever those who are being consecrated",
      "text": "Brothers and sisters:\nEvery priest indeed stands day by day serving and offering often the same sacrifices, which can never take away sins, but he, when he had offered one sacrifice for sins forever, sat down on the right hand of God, from that time waiting until his enemies are made the footstool of his feet. For by one offering he has perfected forever those who are being sanctified. Now where remission of these is, there is no more offering for sin."
    },
    "C": {
      "citation": "2 Thessalonians 3:7-12",
      "theme": "Work quietly and eat your own food",
      "text": "Brothers and sisters:\nFor you know how you ought to imitate us. For we didn’t behave ourselves rebelliously among you, neither did we eat bread from anyone’s hand without paying for it, but in labor and travail worked night and day, that we might not burden any of you. This was not because we don’t have the right, but to make ourselves an example to you, that you should imitate us. For even when we were with you, we commanded you this: “If anyone is not willing to work, don’t let him eat.” For we hear of some who walk among you in rebellion, who don’t work at all, but are busybodies. Now those who are that way, we command and exhort in the Lord Jesus Christ, that they work with quietness and eat their own bread."
    }
  }
};

function diffDaysUTC(a: Date, b: Date): number {
  return Math.round((a.getTime() - b.getTime()) / 86400000);
}

/**
 * Resolves the authentic Roman Lectionary Second Reading for any Sunday of any year
 * based on the liturgical season, Sunday week number, and Lectionary Cycle (A, B, or C).
 */
export function getSundaySecondReading(
  year: number,
  monthIndex0: number,
  day: number,
  dayInfo: LiturgicalDayInfo,
  sundayCycle: SundayCycle
): SecondReadingEntry | undefined {
  const dateObj = new Date(Date.UTC(year, monthIndex0, day, 12, 0, 0));
  if (dateObj.getUTCDay() !== 0) {
    return undefined;
  }

  const easter = getEasterDate(year);
  const diffFromEaster = diffDaysUTC(dateObj, easter);
  const advent1 = getFirstSundayOfAdvent(year);
  const diffFromAdvent1 = diffDaysUTC(dateObj, advent1);
  const baptism = getBaptismOfTheLordDate(year);
  const diffFromBaptism = diffDaysUTC(dateObj, baptism);

  const pick = (key: string): SecondReadingEntry =>
    SUNDAY_SECOND_READINGS[key]?.[sundayCycle] ?? SUNDAY_SECOND_READINGS['OT_15'][sundayCycle];

  // 1. Moveable Sundays tied to Easter
  if (diffFromEaster >= -42 && diffFromEaster < -7) {
    const lentWeek = Math.floor((diffFromEaster + 42) / 7) + 1;
    return pick(`LENT_${Math.min(5, Math.max(1, lentWeek))}`);
  }
  if (diffFromEaster === -7) return pick('PALM_SUNDAY');
  if (diffFromEaster === 0) return pick('EASTER_1');
  if (diffFromEaster === 7) return pick('EASTER_2');
  if (diffFromEaster > 7 && diffFromEaster < 49) {
    const easterWeek = Math.floor(diffFromEaster / 7) + 1;
    return pick(`EASTER_${Math.min(7, Math.max(3, easterWeek))}`);
  }
  if (diffFromEaster === 49) return pick('PENTECOST');
  if (diffFromEaster === 56) return pick('TRINITY');
  if (diffFromEaster === 63) return pick('CORPUS_CHRISTI');

  // 2. Christ the King & Advent Sundays
  if (diffFromAdvent1 === -7) return pick('CHRIST_THE_KING');
  if (diffFromAdvent1 >= 0 && !(monthIndex0 === 11 && day >= 25)) {
    const adventWeek = Math.floor(diffFromAdvent1 / 7) + 1;
    return pick(`ADVENT_${Math.min(4, Math.max(1, adventWeek))}`);
  }

  // 3. Christmas Time Sundays
  if (monthIndex0 === 11 && day > 25) {
    return pick('HOLY_FAMILY');
  }
  if (monthIndex0 === 0 && diffFromBaptism <= 0) {
    if (diffFromBaptism === 0) return pick('BAPTISM_OF_THE_LORD');
    if (day === 6) return pick('EPIPHANY');
    return pick('SECOND_AFTER_NATIVITY');
  }

  // 4. Solemnity of Santo Niño (3rd Sunday of January in the Philippines)
  if (dayInfo.title.toUpperCase().includes('SANTO NIÑO')) {
    return pick('SANTO_NINO');
  }

  // 5. Ordinary Time Part I (after Baptism of the Lord until Ash Wednesday)
  if (diffFromBaptism > 0 && diffFromEaster < -46) {
    const weekNum = Math.ceil(diffFromBaptism / 7) + 1;
    const clamped = Math.min(9, Math.max(2, weekNum));
    return pick(`OT_${clamped}`);
  }

  // 6. Ordinary Time Part II (after Pentecost until Christ the King)
  if (diffFromEaster > 49 && diffFromAdvent1 < 0) {
    const weeksBeforeAdvent = Math.ceil(Math.abs(diffFromAdvent1) / 7);
    const weekNum = Math.max(2, Math.min(33, 35 - weeksBeforeAdvent));
    return pick(`OT_${weekNum}`);
  }

  return pick('OT_15');
}
