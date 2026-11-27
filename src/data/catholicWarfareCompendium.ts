// Auto-structured from the user’s Catholic Spiritual Warfare Compendium

export interface WarfareBiblePassage {
  id: string;
  title: string;
  reference: string;
  verses: string[];
  notes: string[];
}

export interface FaustinaSecret {
  number: number;
  jesusWords: string;
  commentary: string;
}

export interface WarfareQuote {
  text: string;
  author: string;
}

export interface CompendiumPrayer {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  body: string;
  latinText?: string;
  notes: string[];
}

export interface StBenedictSection {
  heading: string;
  paragraphs: string[];
}

export interface PatronSaintItem {
  name: string;
  role: string;
}

export interface WarfarePrincipleItem {
  number: number;
  title: string;
  paragraphs: string[];
}

export interface WarfareEssay {
  id: string;
  title: string;
  author: string;
  meta: string;
  paragraphs: string[];
}

export interface ExorcistDiaryEntry {
  id: string;
  number: string;
  title: string;
  date: string;
  author: string;
  paragraphs: string[];
}

export const WARFARE_BIBLE_PASSAGES: WarfareBiblePassage[] = [
  {
    "id": "eph-6-10-20",
    "title": "The Armor of God",
    "reference": "Eph 6:10–20",
    "verses": [
      "*Finally, draw your strength from the Lord and from his mighty power. 11 Put on the armor of God so that you may be able to stand firm against the tactics of the devil.g 12 For our struggle is not with flesh and blood but with the principalities, with the powers, with the world rulers of this present darkness, with the evil spirits in the heavens.h 13 Therefore, put on the armor of God, that you may be able to resist on the evil day and, having done everything, to hold your ground.i 14 So stand fast with your loins girded in truth, clothed with righteousness as a breastplate,j 15 and your feet shod in readiness for the gospel of peace.k 16 In all circumstances, hold faith as a shield, to quench all [the] flaming arrows of the evil one.l 17 And take the helmet of salvation and the sword of the Spirit, which is the word of God.m",
      "Constant Prayer. 18 With all prayer and supplication, pray at every opportunity in the Spirit. To that end, be watchful with all perseverance and supplication for all the holy onesn 19 and also for me, that speech may be given me to open my mouth, to make known with boldness the mystery of the gospelo 20 for which I am an ambassador in chains, so that I may have the courage to speak as I must.p"
    ],
    "notes": [
      "* A general exhortation to courage and prayer. Drawing upon the imagery and ideas of Is 11:5; 59:16–17; and Wis 5:17–23, Paul describes the Christian in terms of the dress and equipment of Roman soldiers. He observes, however, that the Christian’s readiness for combat is not directed against human beings but against the spiritual powers of evil (Eph 6:10–17; cf. Eph 1:21; 2:2; 3:10). Unique importance is placed upon prayer (Eph 6:18–20).",
      "g Rom 13:12; 2 Cor 6:7; 10:4; Jas 4:7.",
      "h 1:21; 2:2; Col 1:13.",
      "i Rom 13:12.",
      "j Wis 5:17–20; Is 11:5; Lk 12:35; 1 Thes 5:8.",
      "k Is 52:7.",
      "l 1 Pt 5:9.",
      "m Is 59:17; 1 Thes 5:8.",
      "n Mt 26:41; Col 4:2–3.",
      "o Acts 4:29; Col 4:3; 2 Thes 3:1.",
      "p 2 Cor 5:20; Col 4:4."
    ]
  },
  {
    "id": "lk-10-17-19",
    "title": "Jesus Gives His Disciples Power Upon the Full Force of the Enemy",
    "reference": "Lk 10:17–19",
    "verses": [
      "The seventy[-two] returned rejoicing, and said, “Lord, even the demons are subject to us because of your name.” 18 Jesus said, “I have observed Satan fall like lightning* from the sky.p 19 Behold, I have given you the power ‘to tread upon serpents’ and scorpions and upon the full force of the enemy and nothing will harm you."
    ],
    "notes": [
      "* I have observed Satan fall like lightning: the effect of the mission of the seventy-two is characterized by the Lucan Jesus as a symbolic fall of Satan. As the kingdom of God is gradually being established, evil in all its forms is being defeated; the dominion of Satan over humanity is at an end.",
      "p Is 14:12; Jn 12:31; Rev 12:7–12."
    ]
  },
  {
    "id": "php-2-9-11",
    "title": "Jesus, the Name Above All Names",
    "reference": "Php 2:9–11",
    "verses": [
      "Because of this, God greatly exalted him",
      "and bestowed on him the name* that is above every name,g 10 that at the name of Jesus every knee should bend,* of those in heaven and on earth and under the earth,h 11 and every tongue confess that Jesus Christ is Lord,* to the glory of God the Father."
    ],
    "notes": [
      "* The name: “Lord” (Phil 2:11), revealing the true nature of the one who is named.",
      "g Acts 2:33; Mt 23:12; Eph 1:20–21; Heb 1:3–4.",
      "* Every knee should bend … every tongue confess: into this language of Is 45:23 there has been inserted a reference to the three levels in the universe, according to ancient thought, heaven, earth, under the earth.",
      "h Is 45:23; Jn 5:23; Rom 14:11; Rev 5:13.",
      "* Jesus Christ is Lord: a common early Christian acclamation; cf. 1 Cor 12:3; Rom 10:9. But doxology to God the Father is not overlooked here (Phil 2:11c) in the final version of the hymn."
    ]
  },
  {
    "id": "acts-4-12",
    "title": "No Other Name Under Heaven",
    "reference": "Acts 4:12",
    "verses": [
      "There is no salvation through anyone else, nor is there any other name under heaven given to the human race by which we are to be saved.”"
    ],
    "notes": []
  },
  {
    "id": "eph-1-13-14",
    "title": "Sealed with the Holy Spirit",
    "reference": "Eph 1:13–14",
    "verses": [
      "In him you also, who have heard the word of truth, the gospel of your salvation, and have believed in him, were sealed* with the promised holy Spirit,l 14 which is the first installment* of our inheritance toward redemption as God’s possession, to the praise of his glory.m"
    ],
    "notes": [
      "* Sealed: by God, in baptism; cf. Eph 4:30; 2 Cor 1:22.",
      "l 4:30; Acts 2:33; Col 1:5–6.",
      "* First installment: down payment by God on full salvation, as at 2 Cor 1:22.",
      "m 2 Cor 1:22; 5:5."
    ]
  },
  {
    "id": "ps-68-2-3-nabre",
    "title": "May God Arise and May His Enemies Be Scattered",
    "reference": "Ps 68:2–3 (NABRE)",
    "verses": [
      "May God arise;",
      "may his enemies be scattered;",
      "may those who hate him flee before him.a 3 As the smoke is dispersed, disperse them; as wax is melted by fire, so may the wicked perish before God."
    ],
    "notes": [
      "a Nm 10:35.",
      "Whenever the ark set out, Moses would say, “Arise, O LORD, may your enemies be scattered, and may those who hate you flee before you.”"
    ]
  },
  {
    "id": "ps-118-10",
    "title": "In the Lord’s Name I Cut Them Off",
    "reference": "Ps 118:10",
    "verses": [
      "All the nations surrounded me;",
      "in the LORD’s name I cut them off."
    ],
    "notes": []
  },
  {
    "id": "2cor-10-4-5",
    "title": "Our Weapons Can Destroy Fortresses",
    "reference": "2 Cor 10:4–5",
    "verses": [
      "for the weapons of our battle are not of flesh but are enormously powerful, capable of destroying fortresses. We destroy argumentsb 5 and every pretension raising itself against the knowledge of God, and take every thought captive in obedience to Christ,"
    ],
    "notes": [
      "b 6:7; 13:2–3; 1 Cor 1:25; Eph 6:10–14."
    ]
  },
  {
    "id": "is-54-17",
    "title": "Every Weapon Fashioned Against You Shall Fail",
    "reference": "Is 54:17",
    "verses": [
      "Every weapon fashioned against you shall fail; every tongue that brings you to trial you shall prove false. This is the lot of the servants of the LORD, their vindication from me—oracle of the LORD."
    ],
    "notes": []
  },
  {
    "id": "mt-4-10",
    "title": "You Shall Worship and Serve the Lord, Your God, Alone",
    "reference": "Mt 4:10 · The Deuteronomy Defense",
    "verses": [
      "At this, Jesus said to him, “Get away, Satan! It is written:",
      "‘The Lord, your God, shall you worship and him alone shall you serve.’ ”"
    ],
    "notes": [
      "The Deuteronomy Defense",
      "The three quotations of scripture cited by Jesus are Deuteronomy 8:3, 6:16, and Dt 6:13, all of them part of Moses’ exhortations to the Israelites about how to live according to God’s law when they come into their new promised land across the Jordan.",
      "Lawrence Boadt and Celine M. Allen, eds., The Paulist Liturgy Planning Guide: For the Readings of Sundays and Major Feast Days, vol. 1 (New York; Mahwah, NJ: Paulist Press, 2004–2007), 64."
    ]
  },
  {
    "id": "psalm-91",
    "title": "Security Under God’s Protection",
    "reference": "Psalm 91 (NABRE)",
    "verses": [
      "I",
      "You who dwell in the shelter of the Most High,*who abide in the shade of the Almighty,*",
      "2 Say to the Lord, “My refuge and fortress, my God in whom I trust.”a",
      "3 He will rescue you from the fowler’s snare, from the destroying plague,",
      "4 He will shelter you with his pinions,",
      "and under his wings you may take refuge;b his faithfulness is a protecting shield.",
      "5 You shall not fear the terror of the night",
      "nor the arrow that flies by day,c",
      "6 Nor the pestilence that roams in darkness,",
      "nor the plague that ravages at noon.d",
      "7 Though a thousand fall at your side,",
      "ten thousand at your right hand,",
      "near you it shall not come.",
      "8 You need simply watch;",
      "the punishment of the wicked you will see.e",
      "9 Because you have the Lord for your refuge and have made the Most High your stronghold,",
      "10 No evil shall befall you,",
      "no affliction come near your tent.f",
      "11 * For he commands his angels with regard to you,g to guard you wherever you go.h",
      "12 With their hands they shall support you, lest you strike your foot against a stone.i",
      "13 You can tread upon the asp and the viper,",
      "trample the lion and the dragon.j",
      "II",
      "14 Because he clings to me I will deliver him; because he knows my name I will set him on high.k",
      "15 He will call upon me and I will answer;l",
      "I will be with him in distress;m",
      "I will deliver him and give him honor.",
      "16 With length of days I will satisfy him,",
      "and fill him with my saving power.n 1"
    ],
    "notes": [
      "* * A prayer of someone who has taken refuge in the Lord, possibly within the Temple (Ps 91:1–2). The psalmist is confident that God’s presence will protect the people in every dangerous situation (Ps 91:3–13). The final verses are an oracle of salvation promising salvation to those who trust in God (Ps 91:14–16).",
      "* * The shelter of the Most High: basically “hiding place” but in the Psalms a designation for the protected Temple precincts, cf. Ps 27:5; 31:21; 61:5. The shade of the Almighty: lit., “the shadow of the wings of the Almighty,” cf. Ps 17:8; 36:8; 57:2; 63:8. Ps 91:4 makes clear that the shadow is an image of the safety afforded by the outstretched wings of the cherubim in the holy of holies.",
      "a Ps 18:3; 31:3–4; 42:10; 142:6; 2 Sm 22:3.",
      "b Ps 17:8; 36:8; 57:2; 63:8; Dt 32:11; Ru 2:12; Mt 23:37.",
      "c Prv 3:25; Sg 3:8.",
      "d Dt 32:24.",
      "e Ps 92:12.",
      "f Prv 12:21; Dt 7:15.",
      "* * The words are cited in Lk 4:10–11; Mt 4:6, as Satan tempts Jesus in the desert.",
      "g Mt 4:6; Lk 4:10f.",
      "h Heb 1:14.",
      "i Ps 121:3; Prv 3:23.",
      "j Is 11:8; Lk 10:19.",
      "k Ps 9:11; 119:132.",
      "l Jer 33:3; Zec 13:9.",
      "m Is 43:2.",
      "n Prv 3:2.",
      "1 New American Bible, Revised Edition. (Washington, DC: The United States Conference of Catholic Bishops, 2011), Ps 91."
    ]
  },
  {
    "id": "jas-4-7-8",
    "title": "Draw Near to God, and He Will Draw Near to You",
    "reference": "Jas 4:7–8",
    "verses": [
      "So submit yourselves to God. Resist the devil, and he will flee from you.d 8 Draw near to God, and he will draw near to you."
    ],
    "notes": [
      "d 1 Pt 5:8–9."
    ]
  },
  {
    "id": "ps-118-7",
    "title": "The Lord Is on My Side to Help Me",
    "reference": "Ps 118:7 (RSV-2CE)",
    "verses": [
      "The LORD is on my side to help me;",
      "I shall look in triumph on those who hate me."
    ],
    "notes": [
      "The Holy Bible, Revised Standard Version; Second Catholic Edition. (San Francisco: Ignatius Press, 2006)."
    ]
  },
  {
    "id": "rom-8-35",
    "title": "Nothing Can Separate Us from the Love of Christ",
    "reference": "Romans 8:35",
    "verses": [
      "What will separate us from the love of Christ? Will anguish, or distress, or persecution, or famine, or nakedness, or peril, or the sword?"
    ],
    "notes": []
  },
  {
    "id": "ps-68-2-3-drb",
    "title": "May God’s Enemies Be Scattered, May Those Who Hate Him Flee Before Him",
    "reference": "Psalm 68:2–3 (Douay-Rheims)",
    "verses": [
      "Let God arise, and let his enemies be scattered: and let them that hate him flee from before his face.",
      "3 As smoke vanisheth, so let them vanish away: as wax melteth before the fire, so let the wicked perish at the presence of God."
    ],
    "notes": [
      "a Nm 10:35.",
      "Douay-Rheims Bible, translated from the Latin Vulgate (Bellingham, WA: Logos Bible Software, 2009)."
    ]
  },
  {
    "id": "1jn-4-1-3",
    "title": "Testing the Spirits",
    "reference": "1 Jn 4:1–3",
    "verses": [
      "Beloved, do not trust every spirit but test the spirits to see whether they belong to God, because many false prophets have gone out into the world.a 2 This is how you can know the Spirit of God: every spirit that acknowledges Jesus Christ come in the flesh belongs to God,b 3 and every spirit that does not acknowledge Jesus* does not belong to God. This is the spirit of the antichrist that, as you heard, is to come, but in fact is already in the world."
    ],
    "notes": [
      "a 2:18; Mt 24:24.",
      "b 1 Cor 12:3; 1 Thes 5:21.",
      "* Does not acknowledge Jesus: some ancient manuscripts add “Christ” and/or “to have come in the flesh” (cf. 1 Jn 4:2), and others read “every spirit that annuls (or severs) Jesus.”"
    ]
  },
  {
    "id": "mt-8-28-34",
    "title": "The Healing of the Gadarene Demoniacs",
    "reference": "Mt 8:28–34",
    "verses": [
      "28 l When he came to the other side, to the territory of the Gadarenes,* two demoniacs who were coming from the tombs met him. They were so savage that no one could travel by that road. 29 They cried out, “What have you to do with us,* Son of God? Have you come here to torment us before the appointed time?” 30 Some distance away a herd of many swine was feeding.* 31 The demons pleaded with him, “If you drive us out, send us into the herd of swine.”m 32 And he said to them, “Go then!” They came out and entered the swine, and the whole herd rushed down the steep bank into the sea where they drowned. 33 The swineherds ran away, and when they came to the town they reported everything, including what had happened to the demoniacs. 34 Thereupon the whole town came out to meet Jesus, and when they saw him they begged him to leave their district."
    ],
    "notes": [
      "l Mk 5:1–17; Lk 8:26–37.",
      "* Gadarenes: this is the reading of Codex Vaticanus, supported by other important textual witnesses. The original reading of Codex Sinaiticus was Gazarenes, later changed to Gergesenes, and a few versions have Gerasenes. Each of these readings points to a different territory connected, respectively, with the cities Gadara, Gergesa, and Gerasa (modern Jerash). There is the same confusion of readings in the parallel texts, Mk 5:1 and Lk 8:26; there the best reading seems to be “Gerasenes,” whereas “Gadarenes” is probably the original reading in Matthew. The town of Gadara was about five miles southeast of the Sea of Galilee, and Josephus (Life 9:42) refers to it as possessing territory that lay on that sea. Two demoniacs: Mark (5:1–20) has one.",
      "* What have you to do with us?: see note on Jn 2:4. Before the appointed time: the notion that evil spirits were allowed by God to afflict human beings until the time of the final judgment is found in Enoch 16:1 and Jubilees 10:7–10.",
      "* The tending of pigs, animals considered unclean by Mosaic law (Lv 11:6–7), indicates that the population was Gentile.",
      "m Lk 4:34, 41."
    ]
  },
  {
    "id": "rev-20-10",
    "title": "The Final Defeat of the Devil",
    "reference": "Revelation 20:10",
    "verses": [
      "The Devil who had led them astray was thrown into the pool of fire and sulfur, where the beast and the false prophet were. There they will be tormented day and night forever and ever."
    ],
    "notes": []
  },
  {
    "id": "rev-12-12",
    "title": "The Devil Has Come Down Knowing His Time Is Short",
    "reference": "Revelation 12:12",
    "verses": [
      "Therefore, rejoice, you heavens, and you who dwell in them. But woe to you, earth and sea, for the Devil has come down to you in great fury, for he knows he has but a short time.”"
    ],
    "notes": []
  },
  {
    "id": "lam-3-22-23",
    "title": "The Steadfast Love of the Lord Never Ceases",
    "reference": "Lamentations 3:22–23 (ESV-CE)",
    "verses": [
      "The steadfast love of the LORD never ceases;2 his mercies never come to an end;",
      "23 they are new every morning; great is your faithfulness."
    ],
    "notes": [
      "2 Syriac, Targum; Hebrew Because of the steadfast love of the LORD, we are not cut off",
      "English Standard Version Catholic Edition (n.p.: Augustine Institute, 2019), La 3:22–23."
    ]
  },
  {
    "id": "st-paul-warfare",
    "title": "St. Paul on Spiritual Warfare (Summary)",
    "reference": "Eph 6 · Col 2:15 · Heb 2:14 · 1 Jn 3:8",
    "verses": [
      "One of St. Paul’s greatest statements of spiritual warfare occurs in his Letter to the Ephesians, chapter 6. He describes in detail the “Armor of God.” This will be discussed in detail, line by line, piece of armor by piece of armor, in a separate chapter.",
      "St. Paul frequently talked about Jesus overcoming the powers of darkness. “According to Your word, Lord, my enemy has been disarmed and embarrassed” (Colossians 2:15). Satan has been “overruled” (Eph 1:20-22), “mastered” (Phil 2:9-11), “rendered powerless” (Heb 2:14), and his works have been “destroyed” (1 John 3:8).",
      "Being these truths into your Prayer War Room. In that stronghold, command the ruin of the darkness with the Truth of Christ."
    ],
    "notes": []
  }
];

export const FAUSTINA_SECRETS_INTRO: string[] = [
  "In Cracow-Pradnik, June 2, 1938, the Lord Jesus directed a young Polish Sister of Mercy on a three-day retreat. Faustina Kowalska painstakingly recorded Christ’s instruction in her diary that is a mystical manual on prayer and Divine Mercy. Having read the Diary a few times in the past 20 years, I had forgotten about the unique retreat that Christ gave on the subject of spiritual warfare. Then, recently, I was invited to lead a retreat in Trinidad based on Christ’s “Conference on Spiritual Warfare” as presented in the Diary. The Sanctuary of the Holy Family, an amazing group of lay leaders in service to the Archbishop and priests, sponsored the retreat in the Archdiocese of Trinidad and we filled the Seminary of St. John Vianney to ponder this teaching.",
  "Here are the secret whispers of Jesus to his little bride Faustina on how to protect herself from the attacks of the devil. These instructions became Faustina’s weapon in fighting the good fight.",
  "Jesus began, “My daughter, I want to teach you about spiritual warfare” (1760). (The Lord’s words are in bold text; my comments follow.)"
];
export const FAUSTINA_25_SECRETS: FaustinaSecret[] = [
  {
    "number": 1,
    "jesusWords": "Never trust in yourself but abandon yourself totally to My will.",
    "commentary": "Trust is a spiritual weapon. Trust is part of the shield of faith that St. Paul mentions in chapter six of Ephesians: the armor of God. Abandonment to God’s will is an act of trust; faith in action dispels evil spirits."
  },
  {
    "number": 2,
    "jesusWords": "In desolation, darkness and various doubts, have recourse to Me and to your spiritual director. He will always answer you in my name.",
    "commentary": "In times of spiritual warfare, immediately pray to Jesus. Invoke His Holy Name that is feared in the netherworld. Bring darkness into the light by telling a spiritual director or confessor and follow his instruction."
  },
  {
    "number": 3,
    "jesusWords": "Do not bargain with any temptation; lock yourself immediately in My Heart.",
    "commentary": "In the Garden of Eden, Eve bargained with the devil and lost. We have recourse to the refuge of the Sacred Heart. In running to Christ, we turn our backs on the demonic."
  },
  {
    "number": 4,
    "jesusWords": "At the first opportunity, reveal the temptation to the confessor.",
    "commentary": "A good confession, a good confessor, and a good penitent are a recipe for victory over temptation and demonic oppression—without fail."
  },
  {
    "number": 5,
    "jesusWords": "Put your self-love in the last place, so that it does not taint your deeds.",
    "commentary": "Self-love is natural but it should be ordered, free of pride. Humility defeats the devil that is perfect pride. Satan tempts us to disordered self-love to lead us into his pool of pride."
  },
  {
    "number": 6,
    "jesusWords": "Bear with yourself with great patience.",
    "commentary": "Patience is a secret weapon that helps us to keep our peace of soul even in the great storms of life. Bearing with oneself is part of humility and trust. The devil tempts us to impatience, to turn against our selves so we become angry. See yourself from God’s view. He is infinitely patient."
  },
  {
    "number": 7,
    "jesusWords": "Do not neglect interior mortifications.",
    "commentary": "Scripture teaches that some demons can only be evicted by prayer and fasting. Interior mortifications are weapons of warfare. They can be small sacrifices offered with great love. The power of sacrificial love evicts the enemy."
  },
  {
    "number": 8,
    "jesusWords": "Always justify to yourself the opinions of your superiors and of your confessor.",
    "commentary": "Christ is speaking to St. Faustina who lives in a convent. But we all have people in authority over us. The devil aims to divide and conquer so humble obedience to authentic authority is a spiritual weapon."
  },
  {
    "number": 9,
    "jesusWords": "Shun murmurs like a plague.",
    "commentary": "The tongue is a powerful vessel that can do great harm. Murmuring, gossiping, is never of God. The devil is a liar who stirs up false accusations and gossip that can kill a person’s reputation. Shun murmurs!"
  },
  {
    "number": 10,
    "jesusWords": "Let all act as they like; you are to act, as I want you to.",
    "commentary": "To mind one’s own business is key in spiritual warfare. The devil is a busybody attempting to drag everyone down. Please God and let the opinions of others go by the wayside."
  },
  {
    "number": 11,
    "jesusWords": "Observe the rule as faithfully as you can.",
    "commentary": "Jesus is referring to the rule of a Religious Order here. Most of us have made some vow before God and Church and we should be faithful our promises—i.e. Marriage vows and baptismal vows. Satan tempts to infidelity, lawlessness and disobedience. Fidelity is a weapon for victory."
  },
  {
    "number": 12,
    "jesusWords": "If someone causes you trouble, think what good you can do for the person who caused you to suffer.",
    "commentary": "Being a vessel of divine mercy is a weapon for good and for defeating evil. The devil is about hatred, rage, revenge, and unforgiveness. Others have hurt us all at some time. What good can we do in return? Returning a blessing breaks curses."
  },
  {
    "number": 13,
    "jesusWords": "Do not pour out your feelings.",
    "commentary": "A talkative soul will more easily be attacked by the devil. Pour out your feelings to the Lord only. Remember, the good and evil spirits hear what you say aloud. Feelings are fleeting. Truth is the compass. Interior recollection is a spiritual armor."
  },
  {
    "number": 14,
    "jesusWords": "Be silent when you are rebuked.",
    "commentary": "Most of us have been rebuked at some time. We have no control over that but we can control our response. The need to be right all the time can lead into demonic traps. God knows the truth. Let it go. Silence is a protection. The devil can use self-righteousness to trip us up also."
  },
  {
    "number": 15,
    "jesusWords": "Do not ask everyone’s opinion, but only the opinion of your confessor; be as frank and simple as a child with him.",
    "commentary": "Simplicity of life can drive out demons. Honesty is a weapon to defeat Satan, the Liar. When we lie we put a foot in his camp and he will try to seduce us all the more."
  },
  {
    "number": 16,
    "jesusWords": "Do not become discouraged by ingratitude.",
    "commentary": "No one likes to be taken for granted. But when we are met with ingratitude or insensitivity, the spirit of discouragement can weigh us down. Resist all discouragement for it is never of God. It is one of the devil’s most effective temptations. Gratitude in all things wins the day."
  },
  {
    "number": 17,
    "jesusWords": "Do not examine with curiosity the roads down which I lead you.",
    "commentary": "The need to know, and curiosity about the future is a temptation that has led too many people into the backrooms of psychics, witches, etc. Choose to walk in faith. Decide to trust in God who leads you on the path to heaven. Resist the spirit of curiosity always."
  },
  {
    "number": 18,
    "jesusWords": "When boredom and discouragement beat against your heart, run away from yourself and hide in My heart.",
    "commentary": "Jesus delivers the same message a second time. Now He refers to boredom. Earlier in the Diary he told St. Faustina that the devil most easily tempts idle souls. Beware of boredom, a spirit of lethargy, or acedia—the noonday devil. Idle souls are easy prey for demons. Be about the business of God."
  },
  {
    "number": 19,
    "jesusWords": "Do not fear struggle; courage itself often intimidates temptations, and they dare not attack us.",
    "commentary": "Fear is the second most common tactic of the devil (pride is the first). Courage intimidates the devil—he will flee in the face of persevering courage that stands on Jesus, the rock. All people struggle, God is our provision."
  },
  {
    "number": 20,
    "jesusWords": "Always fight with the deep conviction that I am with you.",
    "commentary": "Jesus instructs a Sister in a convent to “fight” with conviction. She can do so because Christ accompanies her. Christians are called to fight with conviction against all demonic tactics. The devil tries to terrorize souls, demonic terrorism—resist! Invoke the Holy Sprit throughout the day."
  },
  {
    "number": 21,
    "jesusWords": "Do not be guided by feeling, because it is not always under your control; but all merit lies in the will.",
    "commentary": "All merit lies in the will because love is an act of the will. We are completely free in Christ. We must make a choice, a decision for good or evil. What camp do we live in?"
  },
  {
    "number": 22,
    "jesusWords": "Always depend upon your superiors, even in the smallest things.",
    "commentary": "Christ is instructing a Religious here. But, we all have the Lord as our Superior. Dependence upon God is a weapon of spiritual warfare because we cannot win on our own. Proclaiming Christ’s victory over evil is part of intentional discipleship. Christ came to defeat death & evil. Proclaim Him!"
  },
  {
    "number": 23,
    "jesusWords": "I will not delude you with prospects of peace and consolations; on the contrary, prepare for great battles.",
    "commentary": "St. Faustina suffered physically and spiritually. She was prepared for great battles by the grace of God who upheld her. Christ clearly instructs us in scripture to be prepared for great battles, to put on God’s armor and resist the devil. Be vigilant and discerning always."
  },
  {
    "number": 24,
    "jesusWords": "Know that you are on a great stage where all heaven and earth are watching you.",
    "commentary": "We are all on a great stage where heaven and earth are watching. What message is our life giving? What radiates from us—shades of light, darkness or grey? The way we live attracts more light or more darkness. If the devil does not succeed in pulling us into darkness, he tries to keep us in the category of the lukewarm, which is not pleasing to God."
  },
  {
    "number": 25,
    "jesusWords": "Fight like a knight, so I can reward you. Do not be unduly fearful, because you are not alone.",
    "commentary": "The Lord’s words to St. Faustina can become our mantra: Fight like a knight! A knight for Christ knows well the cause that he fights for, the nobility of his mission, the King who he serves, and with blessed assuredness of the victory, he fights to the end, even at the cost of his life. If a young, uneducated, simple Polish nun, united to Christ, can fight like a knight, every Christian can do the same. Trust is victorious."
  }
];
export const FAUSTINA_COPYRIGHT: string = "Quotes from the Diary of St. Faustina are copyrighted by the Marians of the Immaculate Conception, Stockbridge, Mass.";

export const SAINTS_WARFARE_QUOTES: WarfareQuote[] = [
  {
    "text": "The soul that is united with God is feared by the devil as though it were God himself.",
    "author": "St. John of the Cross"
  },
  {
    "text": "The devil is strong, but Christ is almighty. If we are in Christ, no force can move us.",
    "author": "St. Lawrence of Brindisi"
  },
  {
    "text": "With Jesus, I fear nothing; though hell itself were to rise against me.",
    "author": "St. Gemma Galgani"
  },
  {
    "text": "You carry a God within you, and yet you seek help from outside? Know your dignity and repel the enemy.",
    "author": "St. John Chrysostom"
  },
  {
    "text": "The devil is very afraid of us when we make the sign of the cross.",
    "author": "St. Jean Vianney"
  },
  {
    "text": "The demons tremble at the name of Jesus. Invoke it with fear and reverence, and they will flee.",
    "author": "St. Nilus of Sinai"
  },
  {
    "text": "Jesus, I trust in You—this disarms Satan.",
    "author": "St. Faustina"
  },
  {
    "text": "The most terrible enemy of the devil is Mary, for she crushes his head with her humility.",
    "author": "St. Louis de Montfort"
  },
  {
    "text": "The demons are very anxious in their pursuit of souls, yet, they quickly abandon their prey merely at the name of Mary.",
    "author": "St. Bridget Of Sweden"
  },
  {
    "text": "Bear in mind that the more the enemy assaults you, the closer God is to your soul. Think about that and penetrate this great and comforting truth.",
    "author": "St. Padre Pio"
  },
  {
    "text": "The more the soul advances, the more fiercely the devil assails it.",
    "author": "St. Gregory the Great"
  },
  {
    "text": "The most terrible of all the weapons in the armory of God is the humility of His saints.",
    "author": "St. Louis de Montfort, True Devotion to Mary, 114"
  },
  {
    "text": "Humility is the armor of the saints.",
    "author": "St. Vincent de Paul"
  },
  {
    "text": "The demons fear humility more than the discipline of asceticism.",
    "author": "St. John Climacus"
  },
  {
    "text": "The humble soul confounds Satan more than a thousand exorcisms.",
    "author": "St. Louis de Montfort"
  },
  {
    "text": "The devil fears a humble soul more than a thousand proud theologians.",
    "author": "St. Teresa of Ávila, The Way of Perfection, ch. 38"
  },
  {
    "text": "The devil fears a soul armed with humility more than a thousand warriors girded with iron.",
    "author": "St. Bernard of Clairvaux, Sermons on the Song of Songs, 33.16"
  },
  {
    "text": "A soul steeped in the Eucharist is like iron in the fire—it becomes untouchable.",
    "author": "St. John Eudes"
  },
  {
    "text": "When you have received the Body of the Lord, you are armed more terribly than a lion. The devil trembles and flees from you.",
    "author": "St. John Chrysostom, Homilies on John, 46.3"
  },
  {
    "text": "The devil has no power over a soul who adores Christ in the Blessed Sacrament.",
    "author": "St. Leonard of Port Maurice"
  },
  {
    "text": "The Precious Blood of Christ is our invincible armor.",
    "author": "St. Gaspar del Bufalo"
  },
  {
    "text": "Each drop of Thy most precious Blood suffices to redeem a thousand worlds.",
    "author": "St. Gertrude the Great, The Herald of Divine Love, Book 2"
  },
  {
    "text": "If we wish to understand the power of Christ’s blood, we should go back to the ancient account of its prefiguration in Egypt.",
    "author": "St. John Chrysostom"
  },
  {
    "text": "Anyone who doesn’t pray doesn’t need any devil to tempt him; while whoever prays, even if only for a quarter of an hour each day, will necessarily be saved.",
    "author": "St. Teresa of Ávila"
  },
  {
    "text": "The devil knows he has lost the soul who perseveres in prayer.",
    "author": "St. Teresa of Ávila"
  },
  {
    "text": "Purity and prayer are the devil’s worst enemies.",
    "author": "St. John Bosco"
  },
  {
    "text": "The devil fears fasting, punishes almsgiving, and flees from prayer.",
    "author": "St. Peter Chrysologus"
  },
  {
    "text": "The fast is the weapon of protection against demons. Our Guardian Angels more readily stay with those who have cleansed our souls through fasting.",
    "author": "St. Basil the Great"
  },
  {
    "text": "To fast is to banquet with angels.",
    "author": "St. Athanasius"
  },
  {
    "text": "And I will tell you the three powerful weapons against Satan. First, the Holy Name of Jesus. That is a name that Satan cannot stand because in the name of Jesus, every knee will bow, in the heavens, on the earth, and under the earth. The second, the blood of Christ. The invocation of the blood of Christ—I may give you a sermon on that—but we are saved with the blood of Christ. Therefore, in temptation, call upon his blood, for without the shedding of blood there is no remission of sin. And thirdly, devotion to our Blessed Mother. For at the beginning, in the book of Genesis, it was the seed of a woman that would crush the seed of Satan. We are armed with these three weapons. The Holy Name, the Blood of Christ, and the Blessed Mother.",
    "author": "Archbishop Fulton Sheen"
  },
  {
    "text": "I have often experienced that nothing was so effective as holy water for driving away evil spirits finally. They flee before the cross, but return again. Therefore the power of holy water must indeed be great.",
    "author": "St. Teresa of Avila"
  },
  {
    "text": "From long experience I have learned that there is nothing like holy water to put devils to flight and prevent them from coming back again. They also flee from the Cross, but return; so holy water must have great virtue.",
    "author": "St. Teresa of Avila"
  },
  {
    "text": "Always have holy water near you; for there is nothing the devil fears more than this. I have found this remedy of great service to me in many cases when I was tortured, not only by fear, but in other ways. I am telling this to you alone. But unless the holy water reaches him he will not flee; therefore you must sprinkle it around.",
    "author": "St. Teresa of Avila"
  },
  {
    "text": "The devil is afraid of us when we pray and make sacrifices. He also is afraid when we are humble and good. He is especially afraid when we love Jesus very much. He runs away when we make the Sign of the Cross.",
    "author": "St. Anthony the Great"
  },
  {
    "text": "Ignorance of Scripture is ignorance of Christ. If we arm ourselves with Scripture, the devil cannot prevail.",
    "author": "St. Jerome"
  },
  {
    "text": "The devil fears those who love silence and stillness, for he lies in wait at noisy crossroads.",
    "author": "St. Ignatius of Loyola"
  },
  {
    "text": "The greatest warfare is fought in the mind. Silence and vigilance are your sword and shield.",
    "author": "St. Hesychius of Jerusalem"
  },
  {
    "text": "The mind must keep watch as a sentinel upon the walls.",
    "author": "St. Gregory of Nazianzus"
  },
  {
    "text": "Be watchful in thought, and you’ll defeat the enemy before he strikes.",
    "author": "St. Theophan the Recluse"
  },
  {
    "text": "The devil trembles when he sees the weakest Christian on his knees.",
    "author": "St. John Chrysostom"
  },
  {
    "text": "We are not lost in this world’s darkness—we are sent into it to conquer with light.",
    "author": "St. Teresa Benedicta of the Cross (Edith Stein)"
  },
  {
    "text": "The endurance of darkness is the preparation for great light.",
    "author": "St. John of the Cross"
  },
  {
    "text": "Those who are in the Lord’s army do not fear the lion’s den.",
    "author": "St. Lucy"
  },
  {
    "text": "Who is like God? (Motto: \"Quis ut Deus\") battle cry of the leader of the heavenly hosts.",
    "author": "St. Michael the Archangel (Rev. 12:7)"
  },
  {
    "text": "Expect temptation until your last breath.",
    "author": "St. Anthony the Great"
  },
  {
    "text": "The triumph of the saints comes after much battle.",
    "author": "St. Gregory the Great"
  },
  {
    "text": "A single devout prayer is worth more than a thousand empty words.",
    "author": "St. Ignatius of Loyola"
  },
  {
    "text": "I discipline my body and bring it into subjection… (1 Cor 9:27)",
    "author": "St. Paul"
  },
  {
    "text": "Trust the past to God's mercy, the present to His love, the future to His providence.",
    "author": "St. Augustine"
  },
  {
    "text": "Endure! Suffering is the forge of saints.",
    "author": "St. Catherine of Siena"
  },
  {
    "text": "Let me be food for the beasts, if it brings me to God.",
    "author": "St. Ignatius of Antioch"
  },
  {
    "text": "Let us strive with all earnestness to finish the course of sanctity.",
    "author": "Catholic Spiritual Tradition"
  }
];
export const PADRE_PIO_WARFARE_QUOTES: string[] = [
  "Jesus permits the spiritual combat as a purification, not as a punishment. The trial is not unto death but unto salvation.",
  "If we are imitators of Jesus Christ and face up to all life’s battles, we too will share in His victories.",
  "The Devil does not want to lose this battle. He takes on many forms. For several days now, he has appeared with his brothers who are armed with batons and pieces of iron. One of the difficulties is that they appear in many disguises. There were several times when they threw me out of my bed and dragged me out of my bedroom. I am patient, however, and I know Jesus, Our Lady, my Guardian Angel, St. Joseph and St. Francis are always with me.",
  "I know that your spirit is always wrapped in the darkness of trials, but it is enough for you to know that Jesus is with you and in you.",
  "The Spirit of God is a spirit of peace. Even in the most serious faults He makes us feel a sorrow that is tranquil, humble, and confident. This is precisely because of His mercy. The spirit of the devil, instead, excites, exasperates, and makes us feel, in that very sorrow, anger against ourselves. We should, on the contrary, be charitable with ourselves first and foremost. Therefore if any thought agitates you, this agitation never comes from God, who gives you peace, being the spirit of peace, but from the devil.",
  "May the Child Jesus be the star that guides you through the desert of your present life.",
  "Let us always keep before our eyes the fact that here on earth we are on a battlefield and that in paradise we shall receive the crown of victory; that this is a testing-ground and the prize will be awarded up above; that we are now in a land of exile while our true homeland is Heaven to which we must continually aspire.",
  "Don’t allow any sadness to dwell in your soul, for sadness prevents the Holy Spirit from acting freely.",
  "Let us therefore, love to quench our thirst at this fountain of living water and go forward all the time along the way of divine love. But let us also be convinced that our souls will never be satisfied here below. In fact it would be disastrous for us if, at a certain stage of our journey, we were to feel satisfied, for it would be a sign that we thought we had reached our goal, and in this we would be deceived.",
  "I want your heart to be like this: well compact and closed on all sides, so that if the worries and storms of the world, the evil spirit, and the flesh come upon it, it will not be penetrated. Leave but one opening to your heart, that is toward heaven.",
  "The more you are afflicted, the more you ought to rejoice, because in the fire of tribulation the soul will become pure gold, worthy to be placed and to shine in the heavenly palace.",
  "Keep your eyes fixed on Him who is your guide to the heavenly country, where He is leading you. What does it matter to you whether Jesus wishes to guide you to Heaven by way of the desert or by the meadow, so long as He is always with you and you arrive at the possession of a blessed eternity?",
  "Jesus is always with you, even when you don’t feel his presence. He is never so close to you as he is during your spiritual battles. He is always there, close to you, encouraging you to fight the good fight; he is there to ward off the enemy’s blows so you won’t be hurt.",
  "Do not fear, I will make you suffer, but I will also give you the strength to suffer,” Jesus tells me continually. “I want your soul to be purified and tried by a daily hidden martyrdom”. . .”How many times,” Jesus said to me a little while ago, “would you have abandoned me, my son, if I had not crucified you.",
  "In order to attract us the Lord gives us many graces and we imagine we are almost in Heaven. We do not know, however, that to grow we need hard bread – crosses, humiliations, trials and contradictions.",
  "Jesus, who is infinitely merciful, will not fail to give you now and then a respite from the trial He has sent you. He is so good that He will never allow you to give in. The trial is a very hard one, but the Lord who is so very, very good will not fail to lighten the Cross from time to time.",
  "Our Lord sometimes makes you feel the weight of the cross. This weight seems unbearable but you carry it because in His love and mercy, the Lord helps you and gives you strength.",
  "If God wills to prolong our trials, do not let us lament or try to find out the reason. . .We have to see God through the fire of thorns, and to do this we must go barefoot and renounce our own will and affection and accept the will of God wholeheartedly.",
  "In order that we may willingly accept the tribulations lavished on us by the Divine mercy, let us keep our gaze fixed on the heavenly home reserved for us. . . Let us withdraw our gaze, moreover, from those good things which are visible to our eyes, by which I mean worldly goods, the sight of which fascinates the heart. Worldly goods prevent us from keeping our eyes fixed on our heavenly home.",
  "In darkness, at times of tribulation and distress of the spirit, Jesus is with you. In such a state you see nothing but darkness, but I can assure you on God’s behalf that the light of the Lord is all around you and pervades your spirit. . .You see yourself forsaken and I assure you that Jesus is holding you tighter than ever to His divine Heart.",
  "When disturbed by passions and misfortunes, may the sweet hope of His inexhaustible mercy sustain us. Let us hasten confidently to the tribunal of penance where He awaits us at every instant with the anxiety of a father; and even though we are aware of our inability to repay Him, let us have no doubts about the solemn pardon pronounced over our errors. Let us place a tombstone over them, just as the Lord has done."
];

export const LAITY_DELIVERANCE_GUIDELINES: string[] = [
  "The prayers included in this section are for use by the Laity.",
  "The prayers in this section are typically phrased to be used for praying over oneself. All individuals have authority over their own selves and bodies and thus they are free to use both imprecatory prayers (directly commanding demons to leave) and deprecatory prayers (prayers directed to God to cast out the demons).",
  "In the case of praying these prayers for others who are not under their direct authority, we recommend the faithful adjust the prayers so that they are directed to God, thus making it a deprecatory prayer. For their own pastoral protection, we recommend that faithful not use imprecatory prayers, ie., directly commanding demons to leave, over others whom they do not have authority.",
  "In accordance with natural law, the laity have authority over their own selves, their spouses and their children. In these cases, they have the authority to use imprecatory prayers."
];
export const FR_RIPPERGER_QUOTE: string = "\"An imprecatory prayer is one in which I command the demons to leave. A deprecatory prayer is one in which I petition Jesus, Our Lady to drive the demons out. If I have authority, I can pray an imprecatory prayer. If I don't then I should pray a deprecatory prayer\" (Fr Ripperger; \"Freedom through Christ - a Catholic approach to Liberation\" p.130).";
export const COMPENDIUM_PRAYERS: CompendiumPrayer[] = [
  {
    "id": "august-queen",
    "title": "The August Queen Prayer",
    "subtitle": "Given to Bl. Father Louis Cestac (January 13, 1864); Indulgenced by Pope St. Pius X",
    "category": "Marian",
    "body": "August Queen of the Heavens, Heavenly Sovereign of the Angels, thou who from the beginning received from God the power and the mission to crush the head of Satan, we humbly beseech thee, to send thy holy legions so that, under thy command and through thy power, they may pursue the demons, combat them everywhere, suppress their boldness and drive them back into the abyss.\n“Who is like unto God?”\nO good and tender Mother, thou shalt always be our love and our hope!\nO Divine Mother, send thy holy Angels to defend us and drive far away from us the cruel enemy.\nAll ye holy Angels and Archangels, defend us and guard us. Amen.\nHoly Angels and Archangels defend us, protect us. Amen.\n(Given to Bl. Father Louis Cestac, 13 January 1864; See also Psalm 90)",
    "latinText": "Augusta Regina caelorum, superna Domina Angelorum,\nquae ab initio a Deo potestatem et missionem accepisti caput Satanae conterendi,\nhumiliter te deprecamur ut mittas sanctas legiones tuas,\nut sub tuo imperio et tua potestate daemones persequantur,\nubique eos impugnent, eorum audaciam comprimant,\net in abyssum detrudant.\nQuis ut Deus?\n\nO bona et tenera Mater, tu semper eris amor noster et spes nostra.\nO Mater Dei, mitte sanctos Angelos tuos ut me defendant\net crudelissimum inimicum procul a me repellant.\nSancti Angeli et Archangeli, defendite nos, custodite nos.\nAmen.",
    "notes": [
      "On 13 January 1864, Blessed Louis Cestac (+1868), who was already accustomed to the favors of the Blessed Virgin Mary, was suddenly struck as if by a ray of divine light and thought he saw demons spread out over the whole earth, causing unbelievable devastation. It was then that the August Mother of God told him the time had come to pray to the Queen of the Angels and to ask her to send her holy legions to combat and over-throw the powers of Hell.",
      "‘My Mother,’ Blessed Cestac replied, ‘you are so good, could you not send them without our having to ask?’",
      "‘No,’ said the Holy Virgin. ‘Prayer is a condition set by God Himself to obtain graces.’",
      "‘Well then, my Mother!’ he replied ‘Would you teach me yourself how to pray to you?’",
      "In response to this request, the Blessed Virgin dictated this prayer to him.",
      "‘My first duty,’ said Blessed Cestac, ‘was to present this prayer to Msgr. Lacroix, Bishop of Bayonne, who approved it. This duly accomplished, I had 500,000 copies drawn up, then I sent them everywhere.’ During the first printing of this prayer, the presses broke down twice!",
      "Under the leadership of Blessed Cestac, this prayer has been granted ecclesiastical permission all over the Catholic world, and many and extraordinary favours have followed. As a sign of his support, Pope St. Pius X wanted the prayer to be enriched with an indulgence."
    ]
  },
  {
    "id": "holy-face-chaplet",
    "title": "The Holy Face Chaplet Invocation",
    "subtitle": "Honoring the Five Wounds of Christ · Psalm 68 (67) · Reported by St. Athanasius",
    "category": "Liturgical",
    "body": "The chaplet honors the Five Wounds of Christ and asks God for the triumph of His holy Church. The Five Wounds do reparation for sins committed through the five senses. The most repeated line, thirty-three times, “Let God arise, and let His enemies be scattered. Let them that hate Him flee from before His Face” has been reported by St. Athanasius that the devils take flight from hearing this Scripture passage more than any other. When prayed in Latin, the language the devil particularly hates, this passage is given even greater efficacy as is included below.",
    "latinText": "Surge Domine et dissipentur inimici Tui et fugiant qui oderunt Te a Facie Tua.(Arise, O Lord, and let Thy enemies be scattered, and let all who hate Thee flee before Thy Face!)",
    "notes": [
      "Repeated thirty-three times on the Chaplet of the Holy Face to ask God for the triumph of His holy Church and reparation for sins committed through the five senses."
    ]
  },
  {
    "id": "binding-prayer-laity",
    "title": "Binding Prayer (Laity)",
    "subtitle": "Deprecatory Prayer of Protection & Sealing (SMC)",
    "category": "Deliverance",
    "body": "In the Holy Name of Jesus, and through the power of His precious blood, I ask Almighty God to bind each and every demon coming against me (or my family) or trying to affect me (us) in any way. In Jesus’ name may they be bound and cast out. I ask God to render them all deaf, dumb, blind and powerless. In Jesus name, may He make them incapable of tempting, tormenting, afflicting or harming me (us). I ask the Blessed Virgin Mary to spread her mantle of protection over me (us). I ask the Holy Angels to surround me (us), and with the sword of Truth, keep out the evil spirits. I ask the Blood of Jesus to wash over me (us) and protect me (us). May it wash over this place, making it a sacred space, free of all evil. (SMC)",
    "notes": [
      "Suitable for personal and family protection by the laity."
    ]
  },
  {
    "id": "fr-amorth-deliverance",
    "title": "Fr. Gabriele Amorth’s Deliverance Prayer",
    "subtitle": "Chief Exorcist of Rome (1986–2016) · Deprecatory Prayer to Jesus Our Savior",
    "category": "Deliverance",
    "body": "O Jesus our Savior, my Lord and my God, my God and my all, with your sacrifice on the Cross you redeemed us and defeated the power of Satan. I beg you to deliver me from every evil presence and every evil influence.\n\nI ask you in your name, I ask you for the sake of your wounds, I ask you for the sake of your blood, I ask you for the sake of your Cross, I ask you through the intercession of Mary, Immaculate and Sorrowful.\n\nMay the blood and the water that flow from your side wash over me to purify me, deliver me, heal me.\n\nAmen.",
    "notes": [
      "Composed by Fr. Gabriele Amorth for daily personal deliverance and healing through the Cross, Wounds, and Blood of Christ."
    ]
  },
  {
    "id": "binding-prayer-short",
    "title": "Binding Prayer (Over Oneself or Those Under One’s Authority)",
    "subtitle": "Imprecatory Form · See Laity Guidelines Above",
    "category": "Deliverance",
    "body": "Spirit of N., I bind you in the Name of Jesus, by the power of the most Precious Blood of Our Lord Jesus Christ and by the intercession of the Blessed Virgin Mary, St. Michael the Archangel, the blessed Apostles, Peter and Paul and all of the saints, and I command you to leave N. (Name of person or object) and go to the foot of the Holy Cross to receive your sentence, in the Name of the Father, the Son and the Holy Spirit.",
    "notes": [
      "Per the Laity Guidelines above, use directly over oneself, spouse, or minor children; adapt into a deprecatory prayer asking God to act when praying for others outside one’s direct authority."
    ]
  },
  {
    "id": "binding-mass-attendance",
    "title": "A Binding Prayer for Demons Impeding Mass Attendance",
    "subtitle": "Deprecatory Intercession for Loved Ones to Return to Sunday Mass",
    "category": "Deliverance",
    "body": "In the Holy Name of Jesus, I ask Jesus, through the intercession of Mary his Mother and the Powers of Heaven, that any demons that are keeping [N.] from attending Mass this weekend be bound. I pray that God might render them impotent, paralyzed and ineffective. May they have no influence on [N.]; may they not prevent [N.] from attending Mass this Sunday or any day. May the Holy Spirit empower the angels to escort [N.] to the Church and to protect [N.] to the praise and glory of God the Father in his Son Jesus Christ. Amen.",
    "notes": [
      "Insert the name of the loved one at [N.] when praying for their freedom to attend Holy Mass."
    ]
  },
  {
    "id": "st-patrick-short",
    "title": "Saint Patrick’s Breastplate Prayer (Short Version)",
    "subtitle": "Lorica of St. Patrick · 5th Century Celtic Shield Prayer",
    "category": "Celtic",
    "body": "Christ with me, Christ before me, Christ behind me, Christ in me, Christ beneath me, Christ above me, Christ on my right, Christ on my left, Christ when I lie down, Christ when I sit down, Christ in the heart of every man who thinks of me, Christ in the mouth of every man who speaks of me, Christ in the eye that sees me, Christ in the ear that hears me.",
    "notes": [
      "Concise core shield from the Lorica of St. Patrick for rapid daily recitation."
    ]
  },
  {
    "id": "st-patrick-long",
    "title": "Saint Patrick’s Breastplate Prayer (Long Version)",
    "subtitle": "Complete Lorica of St. Patrick · Invocation of the Most Holy Trinity",
    "category": "Celtic",
    "body": "I arise today\nThrough a mighty strength, the invocation of the Trinity,\nThrough a belief in the Threeness,\nThrough confession of the Oneness\nOf the Creator of creation.\nI arise today\nThrough the strength of Christ’s birth and His baptism,\nThrough the strength of His crucifixion and His burial,\nThrough the strength of His resurrection and His ascension,\nThrough the strength of His descent for the judgment of doom.\nI arise today\nThrough the strength of the love of cherubim,\nIn obedience of angels,\nIn service of archangels,\nIn the hope of resurrection to meet with reward,\nIn the prayers of patriarchs,\nIn preachings of the apostles,\nIn faiths of confessors,\nIn innocence of virgins,\nIn deeds of righteous men.\nI arise today\nThrough the strength of heaven;\nLight of the sun,\nSplendor of fire,\nSpeed of lightning,\nSwiftness of the wind,\nDepth of the sea,\nStability of the earth,\nFirmness of the rock.\nI arise today\nThrough God’s strength to pilot me;\nGod’s might to uphold me,\nGod’s wisdom to guide me,\nGod’s eye to look before me,\nGod’s ear to hear me,\nGod’s word to speak for me,\nGod’s hand to guard me,\nGod’s way to lie before me,\nGod’s shield to protect me,\nGod’s hosts to save me\nFrom snares of the devil,\nFrom temptations of vices,\nFrom every one who desires me ill,\nAfar and anear,\nAlone or in a multitude.\nI summon today all these powers between me and evil,\nAgainst every cruel merciless power that opposes my body and soul,\nAgainst incantations of false prophets,\nAgainst black laws of pagandom,\nAgainst false laws of heretics,\nAgainst craft of idolatry,\nAgainst spells of women and smiths and wizards,\nAgainst every knowledge that corrupts man’s body and soul.\nChrist shield me today\nAgainst poison, against burning,\nAgainst drowning, against wounding,\nSo that reward may come to me in abundance.\nChrist with me, Christ before me, Christ behind me,\nChrist in me, Christ beneath me, Christ above me,\nChrist on my right, Christ on my left,\nChrist when I lie down, Christ when I sit down,\nChrist in the heart of every man who thinks of me,\nChrist in the mouth of every man who speaks of me,\nChrist in the eye that sees me,\nChrist in the ear that hears me.\nI arise today\nThrough a mighty strength, the invocation of the Trinity,\nThrough a belief in the Threeness,\nThrough a confession of the Oneness\nOf the Creator of creation.",
    "notes": [
      "Full traditional version invoking the Trinity, the mysteries of Christ, the nine choirs of angels, creation, and Christ’s all-surrounding presence."
    ]
  }
];

export const ST_BENEDICT_MEDAL_SECTIONS: StBenedictSection[] = [
  {
    "heading": "Christian Use of Religious Articles",
    "paragraphs": [
      "Medals, crosses, rosaries, statues, paintings, and other religious articles have long been used as a means of fostering and expressing our religious devotion to God and the saints. Icons, or painted images of Christ and the saints, are especially popular among Eastern Christians as an aid to Christian piety and devotion. The use of any religious article is therefore intended as a means of reminding us of God and of stirring up in us a ready willingness and desire to serve God and our neighbor. With this understanding we reject any use of religious articles as if they were mere charms or had some magic power to bring us good luck or better health. Such is not the Christian attitude."
    ]
  },
  {
    "heading": "Origin of the Medal of Saint Benedict",
    "paragraphs": [
      "For the early Christians, the cross was a favorite symbol and badge of their faith in Christ. From the writings of St. Gregory the Great (540-604), we know that St. Benedict had a deep faith in the Cross and worked miracles with the sign of the cross. This faith in, and special devotion to, the Cross was passed on to succeeding generations of Benedictines. Devotion to the Cross of Christ also gave rise to the striking of medals that bore the image of St. Benedict holding a cross aloft in his right hand and his Rule for Monasteries in the other hand. Thus, the Cross has always been closely associated with the Medal of St. Benedict, which is often referred to as the Medal-Cross of St. Benedict.",
      "In the course of time, other additions were made, such as the Latin petition on the margin of the medal, asking that by St. Benedict’s presence, we may be strengthened in the hour of death, as will be explained later.",
      "We do not know just when the first medal of St. Benedict was struck. At some point in history a series of capital letters was placed around the large figure of the cross on the reverse side of the medal. For a long time the meaning of these letters was unknown, but in 1647 a manuscript dating back to 1415 was found at the Abbey of Metten in Bavaria, giving an explanation of the letters. They are the initial letters of a Latin prayer of exorcism against Satan, as will be explained below."
    ]
  },
  {
    "heading": "The Jubilee Medal of Montecassino (1880)",
    "paragraphs": [
      "The above features were finally incorporated in a newly designed medal struck in 1880 under the supervision of the monks of Montecassino, Italy, to mark the 1400th anniversary of the birth of St. Benedict. The design of this medal was produced at St. Martin’s Archabbey, Beuron, Germany, at the request of the prior of Montecassino, Very Rev. Boniface Krug OSB (1838-1909). Prior Boniface was originally a monk of St. Vincent Archabbey, Latrobe, Pennsylvania, until he was chosen to become prior and latter archabbot of Montecassino. Since that time, the Jubilee Medal of 1880 has proven to be more popular throughout the Christian world than any other medal ever struck to honor St. Benedict."
    ]
  },
  {
    "heading": "Description of the Jubilee Medal",
    "paragraphs": [
      "Description of the Jubilee Medal",
      "Because the Jubilee Medal of 1880 has all the important features ever associated with the Medal of St. Benedict, the following description of this medal can serve to make clear the nature and intent of any medal of St. Benedict, no matter what shape or design it may legitimately have.",
      "In his right hand Saint Benedict holds the cross.",
      "On the face of the medal is the image of Saint Benedict. In his right hand he holds the cross, the Christian’s symbol of salvation. The cross reminds us of the zealous work of Benedictine monks and nuns evangelizing and civilizing England and Europe, especially for the sixth to the ninth/tenth centuries.",
      "In Saint Benedict’s left hand is his Rule for Monasteries.",
      "In St. Benedict’s left hand is his Rule for Monasteries that could well be summed up in the words of the Prolog exhorting us to “walk in God’s ways, with the Gospel as our guide.”",
      "The poisoned cup and a loaf of poisoned bread.",
      "On a pedestal to the right of St. Benedict is the poisoned cup, shattered when he made the sign of the cross over it. On a pedestal to the left is a raven about to carry away a loaf of poisoned bread that a jealous enemy had sent to St. Benedict.",
      "The Cross of our holy father Benedict",
      "Above the cup and the raven are the Latin words: Crux s. patris Benedicti (The Cross of our holy father Benedict).",
      "May we be strengthened by his presence in the hour of our death!",
      "On the margin of the medal, encircling the figure of Benedict, are the Latin words: Eius in obitu nostro praesentia muniamur! (May we be strengthened by his presence in the hour of our death!). Benedictines have always regarded St. Benedict as a special patron of a happy death. He himself died in the chapel at Montecassino while standing with his arms raised up to heaven, supported by the brothers of the monastery, shortly after St. Benedict had received Holy Communion.",
      "From holy Monte Cassino, 1880",
      "Below Benedict we read: ex SM Casino MDCCCLXXX (from holy Monte Cassino, 1880). This is the medal struck to commemorate the 1400th anniversary of the birth of Saint Benedict.",
      "May the holy cross be my light! May the dragon never be my guide!",
      "On the back of the medal, the cross is dominant. On the arms of the cross are the initial letters of a rhythmic Latin prayer: Crux sacra sit mihi lux! Non draco sit mihi dux! (May the holy cross be my light! May the dragon never be my guide!).",
      "The cross of our holy father Benedict.",
      "In the angles of the cross, the letters C S P B stand for Crux Sancti Patris Benedicti (The cross of our holy father Benedict).",
      "PEACE!",
      "Above the cross is the word pax (peace), that has been a Benedictine motto for centuries.",
      "Begone Satan! Never tempt me with your vanities! What you offer me is evil. Drink the poison yourself!",
      "Around the margin of the back of the medal, the letters V R S N S M V – S M Q L I V B are the initial letters, as mentioned above, of a Latin prayer of exorcism against Satan: Vade retro Satana! Nunquam suade mihi vana! Sunt mala quae libas. Ipse venena bibas! (Begone Satan! Never tempt me with your vanities! What you offer me is evil. Drink the poison yourself!)",
      "Use of the Medal",
      "There is no special way prescribed for carrying or wearing the Medal of St. Benedict. It can be worn on a chain around the neck, attached to one’s rosary, kept in one’s pocket or purse, or placed in one’s car or home. Some of the faithful often put the medal into the foundations of houses and building, on the walls of barns and sheds, or in one’s place of business. The purpose of using the medal in any of the above ways is to call down God’s blessing and protection upon us, wherever we are, and upon our homes and possessions, especially through the intercession of St. Benedict. By the conscious and devout use of the medal, it becomes, as it were, a constant silent prayer and reminder to us of our dignity as followers of Christ."
    ]
  },
  {
    "heading": "Use of the Medal",
    "paragraphs": [
      "A profitable spiritual experience can be ours if we but take the time to study the array of inscriptions and representations found on the two sides of the medal. The lessons found there can be pondered over and over to bring true peace of mind and heart into our lives as we struggle to overcome the weaknesses of our human nature and realize that our human condition is not perfect, but that with the help of God and the intercession of the saints our condition can become better.",
      "The Medal of St. Benedict can serve as a constant reminder of the need for us to take up our cross daily and “follow the true King, Christ our Lord,” and thus learn “to share in his heavenly kingdom,” as St. Benedict urges us in the Prolog of his Rule.",
      "By a rescript of the Sacred Congregation of Religious (4 May 1965) lay Oblates of St. Benedict are permitted to wear the Medal of St. Benedict instead of the small black cloth scapular formerly worn. By a decree of the Sacred Congregation of Rites (6 March 1959), the Blessing of St. Maur over the sick is permitted to be given with a Medal of St. Benedict instead of with a relic of the True Cross, since the latter is difficult to obtain.",
      "Blessing of the Medal of Saint Benedict"
    ]
  },
  {
    "heading": "Blessing of the Medal of Saint Benedict",
    "paragraphs": [
      "Medals of Saint Benedict are sacramentals that may be blessed legitimately by any priest or deacon — not necessarily a Benedictine (Instr., 26 Sept. 1964; Can. 1168). The following English form may be used.",
      "Our help is in the name of the Lord.",
      "Who made heaven and earth.",
      "In the name of God the Father + almighty, who made heaven and earth, the seas and all that is in them, I exorcise these medals against the power and attacks of the evil one. May all who use these medals devoutly be blessed with health of soul and body. In the name of the Father + almighty, of the Son + Jesus Christ our Lord, and of the Holy + Spirit the Paraclete, and in the love of the same Lord Jesus Christ who will come on the last day to judge the living and the dead, and the world by fire.",
      "Amen.",
      "Let us pray.",
      "Almighty God, the boundless source of all good things, we humbly ask that, through the intercession of Saint Benedict, you pour out your blessings + upon these medals. May those who use them devoutly and earnestly strive to perform good works be blessed by you with health of soul and body, the grace of a holy life, and remission of the temporal punishment due to sin. May they also with the help of your merciful love, resist the temptation of the evil one and strive to exercise true charity and justice toward all, so that one day they may appear sinless and holy in your sight. This we ask through Christ our Lord.",
      "Amen.",
      "The cleric then sprinkles the medals with holy water.",
      "Permissu superiorum. Nihil obstat and Imprimatur, 24 April 1980."
    ]
  }
];
export const HOLY_WATER_DEVOTION_QUOTE = {
  "quote": "Blessing ourselves with holy water was the first thing we did in the morning and the last thing we did at night.",
  "source": "Kathryn J. Hermes, Surviving Depression: A Catholic Approach, Second Edition. (Boston, MA: Pauline Books & Media, 2012), 97."
};

export const PATRON_SAINTS_INTRO: string[] = [
  "The following Saints are recommended to those who experience spiritual afflictions, oppressions, obsessions, or other harassments from the Enemy, or any other spiritual warfare issue.",
  "In our Spiritual Warfare prayers where we ask for the intercessions of all of our Primary Patrons, we say the follow, which you may also include in your prayers:"
];
export const PATRON_LONG_INVOCATION: string = "...with the intercessions of the Blessed Virgin Mary, Mother of God, Blessed Michael the Archangel, Blessed Apostles Peter and Paul, Padre Pio of Pietrelcina, Gordius, Dymphna, Benedict of Nursia, Bruno, Rita of Cascia, Lucian, Marcian, Margaret of Fontana, Quirinus of Sescia, Ubaldo Baldassini, Lucy Bufalari, Teresa of Avila, Bernadette of Lourdes, Agrippina of Rome, Amabilis of Auvergne, Andrew of Segni, Columba of Rieti, Cyriacus the Martyr, Demetrius of Sermium, Denis of Paris, Dionysius the Aeropagite, Margaret of Antioch, Peter the Exorcist, and Vincent de Paul, of my Patron Saint and my Guardian Angel, all the Saints and Angels of Heaven, and powerful in the holy authority of the blessed Name of our Lord Jesus Christ...";
export const PATRON_SHORT_INVOCATION: string = "...with the intercessions of the Blessed Virgin Mary, Mother of God, Blessed Michael the Archangel, Blessed Apostles Peter and Paul, Blessed Saints Padre Pio, Gordius, Dymphna, and Benedict, all the Saints and Angels of Heaven, and powerful in the holy authority of the blessed Name of our Lord Jesus Christ...";
export const PRIMARY_WARFARE_PATRONS: PatronSaintItem[] = [
  {
    "name": "Our Blessed Mother",
    "role": "Queen of Spiritual Warfare"
  },
  {
    "name": "St. Michael the Archangel",
    "role": "Prince of Spiritual Warfare"
  },
  {
    "name": "Peter the Apostle and Paul the Apostle",
    "role": "Generals of Spiritual Warfare"
  },
  {
    "name": "Padre Pio of Pietrelcina",
    "role": "Patron Saint of our mentor’s apostolate; patron of deliverance"
  },
  {
    "name": "Dymphna",
    "role": "patron of our mentor’s apostolate"
  },
  {
    "name": "Gordius",
    "role": "challenged the pagans at Casearea; martyred; Robert’s Patron Saint"
  },
  {
    "name": "Benedict of Nursia",
    "role": "Founder of Western Monasticism and Great Spiritual Warfare, Patron against Sorcery"
  },
  {
    "name": "Bruno",
    "role": "patron of possessed people"
  },
  {
    "name": "Rita of Cascia",
    "role": "patron of desperate & impossible causes, the sick and the abused"
  },
  {
    "name": "Lucian",
    "role": "patron of possessed people"
  },
  {
    "name": "Marcian",
    "role": "former devil worshipper, patron of possessed people"
  },
  {
    "name": "Margaret of Fontana",
    "role": "patron of possessed people"
  },
  {
    "name": "Quirinus of Sescia",
    "role": "patron against evil spirits, obsession, possessed people"
  },
  {
    "name": "Ubaldo Baldassini",
    "role": "against demonic possession, possessed people"
  },
  {
    "name": "Blessed Lucy Bufalari",
    "role": "against demonic possession"
  },
  {
    "name": "Teresa of Ávila",
    "role": "Doctor of the Church, people in need of grace"
  },
  {
    "name": "Bernadette of Lourdes",
    "role": "against sickness and illness, sick people"
  }
];
export const ADDITIONAL_WARFARE_PATRONS: PatronSaintItem[] = [
  {
    "name": "Agrippina of Rome",
    "role": "against evil spirits"
  },
  {
    "name": "Amabilis of Auvergne",
    "role": "against demonic possession"
  },
  {
    "name": "Andrew of Segni",
    "role": "against demons"
  },
  {
    "name": "Columba of Rieti",
    "role": "with St. Benedict, Patron against Sorcery, against magic, against temptation"
  },
  {
    "name": "Cyriacus the Martyr",
    "role": "against diabolical possession"
  },
  {
    "name": "Demetrius of Sermium",
    "role": "against evil spirits"
  },
  {
    "name": "Denis of Paris",
    "role": "patron of possessed people"
  },
  {
    "name": "Dionysius the Aeropagite",
    "role": "against the devil"
  },
  {
    "name": "Margaret of Antioch",
    "role": "escape from devils"
  },
  {
    "name": "Peter the Exorcist",
    "role": "Patron in Spiritual Warfare"
  },
  {
    "name": "Vincent de Paul",
    "role": "for general Spiritual Help"
  }
];

export const SEVEN_PRINCIPLES_INTRO: string[] = [
  "For, although we are in the flesh, we do not battle according to the flesh, for the weapons of our battle are not of flesh but are enormously powerful, capable of destroying fortresses. We destroy arguments and every pretension raising itself against the knowledge of God, and take every thought captive in obedience to Christ, 2 Corinthians 10:4-6",
  "This post is about spiritual warfare. Fighting the good fight!",
  "There are numerous strategies we can follow to combat a formidable and relentless opponent. Below are seven (7) principles I learned from Fr. Mark Goring via YouTube.",
  "Father Mark Goring is a Catholic priest and a member of The Companions of the Cross. The Companions of the Cross are a community of Catholic priests inviting people to know Jesus and empowering them to share Jesus."
];
export const SEVEN_PRINCIPLES_GORING: WarfarePrincipleItem[] = [
  {
    "number": 1,
    "title": "Know Who You Are",
    "paragraphs": [
      "The important thing here is not to be deceived by the devil with the life God has given you. You are a child of God (1 John 3:2). The devil does not want you to believe this.",
      "Who is the liar? Whoever denies that Jesus is the Christ. Whoever denies the Father and the Son, this is the antichrist. 1 John 2:22",
      "Obviously, the devil has been very successful with his cunning ability to convince people to do anything but worship God. We know from the first three commandments of the Decalogue, the Ten Commandments, God must be our all.",
      "“The love of Christ must come before all else. + St. Benedict",
      "I am the LORD your God, who brought you out of the land of Egypt, out of the house of slavery. You shall not have other gods beside me.",
      "You shall not make for yourself an idol or a likeness of anything in the heavens above or on the earth below or in the waters beneath the earth; Deuteronomy 5:6-8",
      "The first three commandments of the Ten Commandments are as follows:",
      "1. I AM THE LORD THY GOD: THOU SHALT NOT HAVE STRANGE GODS BEFORE ME.",
      "2. THOU SHALL NOT TAKE THE NAME OF THE LORD THY GOD IN VAIN.",
      "3. KEEP THE SABBATH HOLY.",
      "Jesus has given us the Church and he has given us assurance the gates of hell will not prevail against it (Mt 16:18). The Church has been built by Christ to last forever, and we have been chosen to be a part of it. Don’t miss the opportunity!",
      "“Oh Catholic faith, how solid, how strong you are! How deeply rooted, how firmly founded on solid rock! Heaven and earth will pass away, but you can never pass away.” + St. Fidelis",
      "The devil, however, wants you to fall away and abandon the Church. And this helps explain why there are so many empty seats at Mass. The devil deceives. Lies and deceit are his diabolical specialty. He deceives people, especially fallen away Catholics, into thinking their Christian faith in Jesus is no longer needed.",
      "Do not be surprised that, as time goes on, our ancient foe will fight all the harder to wipe out the Christian religion. + St. Gregory VII",
      "The disturbing proof is in the numerous empty seats at Mass. Shortly after the September 11, 2001 terror attacks church pews throughout much of America were full. Then after a while, the devil began to pick off people from the pews through an array of diabolical tactics, and these diabolical tactics are being carried out on us today.",
      "Then the dragon became angry with the woman and went off to wage war against the rest of her offspring, those who keep God’s commandments and bear witness to Jesus. Revelation 12:17",
      "The devil even tempted Jesus to question his own identity in the Gospels!",
      "Then the devil took him to the holy city, and made him stand on the parapet of the temple,",
      "and said to him, “If you are the Son of God, throw yourself down… Matthew 4:5-6",
      "Do you not think the devil won’t tempt you into abandoning your Christian identity ?",
      "Christ could have kept the devil from himself; but if he were not tempted he could not teach you how to triumph over temptation.” + St. Augustine"
    ]
  },
  {
    "number": 2,
    "title": "Remember We Are at War",
    "paragraphs": [
      "The war is ongoing, and we are thrust in the battle whether we like it or not, and whether we choose to believe it or not. This key spiritual warfare principle reminds us to remember each day that we are at war with the enemy, the devil and his demons.",
      "“To stand fast in battle on the day of the Lord means to oppose the wicked enemy out of love for what is right.” + St. Gregory",
      "With that said, it is time to put on the spiritual armor of God.",
      "Put on the armor of God so that you may be able to stand firm against the tactics of the devil. Ephesian 6:11",
      "The good news of the Gospels is Jesus has decisively won this war with his saving work on the cross and resurrection. Sacred Scripture, however, does soberly remind us we are still very much engaged in a battle with a cunning and unholy enemy:",
      "Be sober and vigilant. Your opponent the devil is prowling around like a roaring lion looking for [someone] to devour. 1 Peter 5:8",
      "This is why it is a good idea to take time to pray the Lord’s Prayer each day. We win this battle firmly rooted in God. By all means, hide in Jesus’ wounds! This is not a battle we can win on our own. We will perish if we abandon our faith in Jesus the LORD.",
      "Whoever is ashamed of me and of my words in this faithless and sinful generation, the Son of Man will be ashamed of when he comes in his Father’s glory with the holy angels. Mark 8:38"
    ]
  },
  {
    "number": 3,
    "title": "Know the Tactics of Your Enemy",
    "paragraphs": [
      "The aforementioned verse from 1 Peter gives some indication of what kind of opponent we are dealing with: a fallen angel, the Evil One. Our opponent, the devil, roams around the world – even as you read this – looking for someone to devour.",
      "The LORD said to the satan, “Where have you been?” Then the satan answered the LORD and said, “Roaming the earth and patrolling it.” Job 1:7",
      "TACTIC #1: The satan is the ACCUSER. He attacks our conscience and our spirit.",
      "The accuser: the meaning of the Hebrew word “Satan,” found in",
      "Revelation 12:9;",
      "Job 1–2;",
      "Zechariah 3:1;",
      "1 Chronciles 21:1;",
      "Satan continues to accuse Christ’s disciples. Source: USCCB",
      "The huge dragon, the ancient serpent, who is called the Devil and Satan, who deceived the whole world, was thrown down to earth, and its angels were thrown down with it.",
      "Then I heard a loud voice in heaven say: “Now have salvation and power come, and the kingdom of our God and the authority of his Anointed. For the accuser of our brothers is cast out, who accuses them before our God day and night. Revelation 12:9-10",
      "TACTIC #2: The devil is the DECEIVER. Not only does Satan lie, he is the father of lies.",
      "Listen to what Jesus has to say about the devil in John’s Gospel:",
      "…He was a murderer from the beginning and does not stand in truth, because there is no truth in him. When he tells a lie, he speaks in character, because he is a liar and the father of lies. John 8:44"
    ]
  },
  {
    "number": 4,
    "title": "Keep Your Peace",
    "paragraphs": [
      "Easier said than done in this day and age, but that is what we are called by God to do.",
      "And let the peace of Christ control your hearts, the peace into which you were also called in one body. And be thankful. Colossians 3:15",
      "If you do fall in sin get back up and keep moving! Go to confession if you can and take time to examine your conscience each day and confess your sins to God.",
      "If we acknowledge our sins, he is faithful and just and will forgive our sins and cleanse us from every wrongdoing. 1 John 1:9",
      "This spiritual warfare battle is won in Christ. Thus, our hearts should be formed:",
      "in Prayer",
      "in the Word",
      "in Preaching",
      "in the Sacraments",
      "And when we focus on being humble we find favor with God.",
      "And all of you, clothe yourselves with humility in your dealings with one another, for: “God opposes the proud but bestows favor on the humble.” 1 Peter 5:5",
      "Not so with the devil. The devil wants to deceive, confuse and corrupt you. This is why we must remain close to God. God wants to give us his peace.",
      "…He is not the God of disorder but of peace. As in all the churches of the holy ones, 1 Corinthians 14:33"
    ]
  },
  {
    "number": 5,
    "title": "Need to Know Your Weaknesses",
    "paragraphs": [
      "When the enemy attacks, the first thing he looks for is the weakest line of defense. Only a fool doesn’t want to take a step back and consider what his weaknesses are.",
      "The wise person is cautious and turns from evil; the fool is reckless and gets embroiled. Proverbs 14:16",
      "We as human beings are inclined to sin, and we all do.",
      "all have sinned and are deprived of the glory of God. Romans 3:23",
      "Here are the 7 deadly sins. Which of these sins apply to you in your own life?",
      "Anger",
      "Gluttony",
      "Greed",
      "Pride",
      "Lazy",
      "Lust",
      "Envy",
      "We must avoid sins. Should we neglect this we give the enemy a stronghold on us. If we live a life in unrepentant sin we might lose the battle, and there is simply too much at stake not to live a repentant life and make atonement to God for our many sins.",
      "Whoever sins belongs to the devil, because the devil has sinned from the beginning. Indeed, the Son of God was revealed to destroy the works of the devil. 1 John 3:8"
    ]
  },
  {
    "number": 6,
    "title": "Need to Have a Holy Spirit Inspired Specific Strategy",
    "paragraphs": [
      "Let’s take a look at what the fruits of the Holy Spirit are:",
      "The fruit of the Spirit is",
      "Love",
      "Joy",
      "Peace",
      "Patience",
      "Kindness",
      "Generosity",
      "Faithfulness",
      "Gentleness",
      "Self-control",
      "Galatians 5:22-23a",
      "You can combat your weaknesses with your virtuous characteristics given to you by the Holy Spirit. Example: if you struggle with lust, combat it with generosity.",
      "As water quenches a flaming fire, so almsgiving atones for sins. Sirach 3:30",
      "Generous donations and works of charity will help to yield favor from the Lord.",
      "The generous will be blessed, for they share their food with the poor. Proverbs 22:9",
      "If you struggle with anger, combat it with some devotional prayers each day. Simply praying some Hail Mary prayers after any type of outburst or disturbance can help humble the soul, and it is a great way to combat one’s own demons.",
      "“The Hail Mary puts the devil to flight and causes Hell to Tremble with terror.” + St. Bernard",
      "Any exorcist priest will tell you: The demons will flee in fear whenever they hear a Hail Mary prayer. Please consider the rosary as a devotional prayer.",
      "“Through devotion your family cares become more peaceful, mutual love between husband and wife become more sincere, the service we owe to the prince becomes more faithful, and our work, no matter what it is, becomes more pleasant and agreeable.” + St. Francis de Sales"
    ]
  },
  {
    "number": 7,
    "title": "Remember the Lord",
    "paragraphs": [
      "Remember what is most important in life is union with God. We win the spiritual warfare battle in Christ. Without Jesus, we would wither away and be lost.",
      "Remain in me, as I remain in you. Just as a branch cannot bear fruit on its own unless it remains on the vine, so neither can you unless you remain in me. John 15:5",
      "You can have it all, as they say: wealth, pleasure, power, and fame.",
      "But if there is no union with God in your life, the devil has won his battle against you.",
      "A primary tactic of Satan and his demons is to get you to pursue false idols.",
      "Some examples of false idols today are:",
      "Sports",
      "Entertainment",
      "Recreation",
      "The demons don’t really care what idol it is, as long as it makes you neglect or reject your own personal relationship with Jesus. To give all our time, talent and treasure over to idols is quiet dangerous and could leave us cut off from eternal rest in the Lord.",
      "How shall we escape if we ignore so great a salvation? Hebrews 2:3",
      "There is a classic spiritual warfare book, The Spiritual Combat, written hundreds of years ago. St. Francis de Sales called it “the golden book.” He also carried it with him and constantly read from it. Why would a saint do that?",
      "Rely on the mighty LORD; constantly seek His face. 1 Chronicles 16:11",
      "The first two chapters of this classic book, and maybe the most important ones, say to distrust in yourself and keep your confidence in God.",
      "For the LORD will be your confidence, and will keep your foot from the snare. Proverbs 3:26"
    ]
  }
];
export const SEVEN_PRINCIPLES_RECAP: string[] = [
  "Spiritual warfare goes on in the world until Christ returns in glory with his angels.",
  "In the meantime, we will win the ongoing battle in our own lives by drawing near to Christ with humble and contrite hearts. And always keep in mind in this spiritual warfare we are in that the family that prays together stays together.",
  "So submit yourselves to God. Resist the devil, and he will flee from you. James 4:7"
];

export const TWELVE_PRINCIPLES_INTRO: string[] = [
  "With all that has been going on in the world of late this might be a good time to review some principles of spiritual warfare. Before Jesus was baptized and began his public ministry of destroying the work of the devil (1 John 3:8), there were a number of years where Jesus was in formation, reading and meditating on the scriptures in obscurity.",
  "Jesus knew God. Jesus is God. Jesus knew his enemies. And when Jesus began his public ministry, He did not back down from the diabolic and go on defense. Jesus went on offense. Big difference! We too are called to go on offense for the Lord.",
  "This is why I pray the rosary every day. I’m the little pawn that helps to open up the lanes on the spiritual chessboard to let the Queen of Heaven take over!",
  "Spiritual Warfare is Real",
  "I would prefer the exterior and interior evils we have to combat did not exist, but they do exist, and they’re not going away. On the contrary, spiritual warfare and suffering are unavoidable. We have to accept it, align our will with God’s will, and combat evil.",
  "The greater your faith and wisdom, the better you can successfully combat diabolical influences in your life and provide help for the lives of your loved ones and fellow Christians throughout the world who undergo the same testings and struggles.",
  "This is why I am a member of the Rosary Confraternity. We pray for each other!",
  "Most of the spiritual warfare principles in this post I learned from spiritual warfare expert and exorcist, Fr. Chad Ripperger, Dr. Paul Thigpen, Fr. Vivian Boland, the late Fr. Don Scupoli and others. May God bless them all for their ministry and for fighting the good fight in the name of Our Lord Jesus Christ +",
  "There is an abundance of sacred scripture verses to support the spiritual warfare principles listed below. Our spiritual combat is with the world, the flesh and the devil.",
  "“The difficulties, even the attacks we endure, mean to separate us from our own selfishness and open us more to God. – Fr. Mark Niehaus"
];
export const TWELVE_PRINCIPLES_WARFARE: WarfarePrincipleItem[] = [
  {
    "number": 1,
    "title": "Christ Controls All Spiritual Warfare",
    "paragraphs": [
      "Jesus approached and said to them,",
      "“All power in heaven and on earth has been given to me.",
      "Go, therefore, and make disciples of all nations, baptizing them in the name of the Father, and of the Son, and of the holy Spirit, teaching them to observe all that I have commanded you.",
      "And behold, I am with you always, until the end of the age.” Matthew 28:18-20",
      "Christ has control over every facet of spiritual warfare, even down to the minutia.",
      "Minutia – defined as the smallest and finest details of anything (Mt 10:30).",
      "Christ determines the types of diabolical influences He allows in our lives.",
      "I am the LORD forming the light and creating the darkness, making peace and creating evil. Isaiah 45:6-7"
    ]
  },
  {
    "number": 2,
    "title": "The Fall of Adam and Eve",
    "paragraphs": [
      "Now the snake was the most cunning of all the wild animals that the LORD God had made… Genesis 3:1",
      "When Adam and Eve fell, they seated a certain amount of control over their body to Satan and those under him. In committing the sin, they took themselves out from underneath God and placed themselves under the domination and control of Satan. Demons have access to any aspect of your body. This is an important point. – Fr. Ripperger",
      "CCC 407 The doctrine of original sin, closely connected with that of redemption by Christ, provides lucid discernment of man’s situation and activity in the world. By our first parents’ sin, the devil has acquired a certain domination over man, even though man remains free…"
    ]
  },
  {
    "number": 3,
    "title": "Divine Economy of Authority",
    "paragraphs": [
      "Let every person be subordinate to the higher authorities, for there is no authority except from God, and those that exist have been established by God. Therefore, whoever resists authority opposes what God has appointed, and those who oppose it will bring judgment upon themselves. Romans 13:1-2",
      "When God created the angels, He established the Divine Economy of Authority.",
      "Divine Economy of Authority has a specific structure, a hierarchy.",
      "Divine Economy of Authority has set of laws in the ways that if functions.",
      "The demons know it, they have to obey it and live according to it.",
      "The demons do not like the structure that is there, but they also make use of it.",
      "Fr. Ripperger has said that when the fallen angles lost their status of hierarchy in heaven and were cast down to earth (Rev 12:12), they know that the saints will take their places in God’s hierarchy arranged in heaven, and they are infuriated about it."
    ]
  },
  {
    "number": 4,
    "title": "Types of Diabolical Influences",
    "paragraphs": [
      "Be sober and vigilant. Your opponent the devil is prowling around like a roaring lion looking for [someone] to devour. 1 Peter 5:8",
      "There are two (2) types of diabolical influence:",
      "Ordinary Diabolical Influence",
      "Everyone is subject to it",
      "The Blessed Virgin Mary was not subject to it.",
      "This is why the Blessed Virgin Mary is called Mother Inviolate.",
      "Extraordinary Diabolical Influence",
      "Possession",
      "The most dangerous and most rare form of diabolical influence.",
      "Obsession",
      "Interior life – people just cannot keep their mind off things.",
      "Oppression",
      "Exterior life – demons start destroying the things around you in your world – home, family, relationships, work, etc.",
      "Infestation",
      "Diabolical activity connected with a place, building or object.",
      "Per spiritual warfare expert and exorcist Msgr. Stephen Rossetti, America is under an unprecedented level of oppression and influence from the diabolic. God help us!"
    ]
  },
  {
    "number": 5,
    "title": "Sin and Its Effects",
    "paragraphs": [
      "If we say, “We are without sin,” we deceive ourselves, and the truth is not in us. 1 John 1:8",
      "Mortal Sins",
      "It only takes one (1) mortal sin to be subject to extraordinary diabolic influence. Mortal sins are grievous offenses against the law of God.",
      "Venial Sins",
      "Lessen the love of God in our heart, making us less worthy of His help, and the weakening of the power to resist mortal sin.",
      "Capital Sins",
      "Pride, Covetousness, Lust, Anger, Gluttony, Envy, Sloth",
      "Take some time and acknowledge your sins to Jesus in the evenings. Forget about yourself and be done with them. God will forgive you if you acknowledge your sins to Him. This may give you a boost of grace because it takes humility to do that. You could pray the Act of Contrition, Psalm 51, or just pray from the heart."
    ]
  },
  {
    "number": 6,
    "title": "Five Types of Diabolical Temptations",
    "paragraphs": [
      "Put on the armor of God so that you may be able to stand firm against the tactics of the devil. Ephesians 6:11",
      "1. Deception",
      "The Devil is the father of lies and the heart of his temptations are lies.",
      "….The devil was a murderer from the beginning and does not stand in truth, because there is no truth in him. When he tells a lie, he speaks in character, because he is a liar and the father of lies. John 8:44",
      "2. Accusation",
      "The Devil is the accuser of Christians.",
      "Then I heard a loud voice in heaven say: “Now have salvation and power come, and the kingdom of our God and the authority of his Anointed. For the accuser of our brothers is cast out, who accuses them before our God day and night. Revelation 12:10",
      "3. Doubt",
      "Demons seek to diminish your faith and fidelity in God.",
      "Now the snake was the most cunning of all the wild animals that the LORD God had made. He asked the woman, “Did God really say, ‘You shall not eat from any of the trees in the garden’?” Genesis 3:1",
      "4. Enticement",
      "Demons tempt us with attraction to other things, anything but God.",
      "The woman saw that the tree was good for food and pleasing to the eyes, and the tree was desirable for gaining wisdom. So she took some of its fruit and ate it; and she also gave some to her husband, who was with her, and he ate it. Genesis 3:6",
      "5. Provocation",
      "Use circumstances to drag us down with pride, anger, lust and despair.",
      "Then his wife said to him, “Are you still holding to your innocence? Curse God and die!” Job 2:9"
    ]
  },
  {
    "number": 7,
    "title": "Diabolical Warfare Principles",
    "paragraphs": [
      "“Every kingdom divided against itself will be laid waste, and no town or house divided against itself will stand. And if Satan drives out Satan, he is divided against himself; how, then, will his kingdom stand? Matthew 12:25-26",
      "Anything but God",
      "Demons will get you to fixate on something to an exaggerated or extreme degree to where it starts to detract you from your relationship with God.",
      "Divide and Conquer",
      "The principal way demons try to get people to divide is getting people to hook on to the perspective they have on what other people are doing or saying, or things of that sort. This is why Christ says do not judge (Mt 7:1)",
      "Anything but Moderation",
      "Demons will make you go from one extreme to another; they don’t care what that extreme is, as long as it is not moderated.",
      "Likeness for Power",
      "Fr. Ripperger noted that during previous sessions, he would find the demons would rather sing the Tantum Ergo than give up any power, grip, or influence they have over someone or some locality (example – a building or territory). Demons even challenged Jesus over their territorial places of influence in the Gospels.",
      "When He got out of the boat, at once a man from the tombs who had an unclean spirit met him. Mark 5:2"
    ]
  },
  {
    "number": 8,
    "title": "The Levels of Spiritual Warfare",
    "paragraphs": [
      "If you belonged to the world, the world would love its own; but because you do not belong to the world, and I have chosen you out of the world, the world hates you. John 15:19",
      "Attacks from the enemy can occur on the following levels:",
      "Personal level",
      "Moral level",
      "Spiritual level",
      "Social level",
      "Intellectual level",
      "Political level",
      "Stop and think about how Jesus and His disciples experienced attacks on these various levels in the Gospels. Contemplate how Jesus orchestrated a Divine demolition job on every one of those attacks from the diabolic. He is an amazing God!"
    ]
  },
  {
    "number": 9,
    "title": "Jesus Calls His Disciples to Be Participants, Not Spectators",
    "paragraphs": [
      "Then Jesus said to his disciples, “Whoever wishes to come after me must deny himself, take up his cross, and follow me. For whoever wishes to save his life will lose it, but whoever loses his life for my sake will find it. Matthew 16:24-25",
      "Warfare",
      "For, although we are in the flesh, we do not battle according to the flesh, for the weapons of our battle are not of flesh but are enormously powerful, capable of destroying fortresses. We destroy arguments and every pretension raising itself against the knowledge of God, and take every thought captive in obedience to Christ, 2 Corinthians 10:3-5",
      "Struggle",
      "For to you has been granted, for the sake of Christ, not only to believe in him but also to suffer for him. Yours is the same struggles as you saw in me and now hear about me. Philippians 1:29-30",
      "It is he whom we proclaim, admonishing everyone and teaching everyone with all wisdom, that we may present everyone perfect in Christ. For this I labor and struggle, in accord with the exercise of his power working within me. Colossians 1:28-29",
      "Remember the days past when, after you had been enlightened, you endured a great contest of suffering. Hebrews 10:32",
      "Consider how He endured such opposition from sinners, in order that you may not grow weary and lose heart. In your struggle against sin you have not yet resisted to the point of shedding blood. Hebrews 12:3-4",
      "Fight",
      "I entrust this charge to you, Timothy, my child, in accordance with the prophetic words once spoken about you. Through them may you fight a good fight. 1 Tim 1 :18",
      "Compete",
      "Do you not know that the runners in the stadium all run in the race, but only one wins the prize? Run so as to win. Every athlete exercises discipline in every way. They do it to win a perishable crown, but we an imperishable one. 1 Corinthians 9:24-25",
      "…I do not fight as if I were shadowboxing. No, I drive my body and train it, for fear that, after having preached to others, I myself should be disqualified. 1 Corinthians 9:26-27",
      "Flesh vs. Spirit",
      "…if you live according to the flesh, you will die, but if by the spirit you put to death the deeds of the body, you will live. Romans 8:13",
      "Good vs. Evil",
      "…the hour is coming in which all who are in the tombs will hear his voices and will come out, those who have done good deeds to the resurrection of life, but those who have done wicked deeds to the resurrection of condemnation. John 5:28-29",
      "So, then, I discover the principle that when I want to do right, evil is at hand. For I take delight in the law of God, in my inner self, l but I see in my members another principle at war with the law of my mind… Romans 7:21-23",
      "Light vs. Darkness",
      "The lamp of the body is your eye. When your eye is sound, then your whole body is filled with light, but when it is bad, then your body is in darkness. Luke 11:34",
      "Truth vs. Falsehood",
      "Jesus said to them, “If God were your Father, you would love me, for I came from God and am here; I did not come on my own, but he sent me. Why do you not understand what I am saying? Because you cannot bear to hear my word. You belong to your father the devil and you willingly carry out your father’s desires. He was a murderer from the beginning and does not stand in truth, because there is no truth in him. When he tells a lie, he speaks in character, because he is a liar and the father of lies. But because I speak the truth, you do not believe me. John 8:42-45",
      "Life and Death",
      "And do not present the parts of your bodies to sin as weapons for wickedness, but present yourselves to God as raised from the dead to life and the parts of your bodies to God as weapons for righteousness. Romans 6:13",
      "For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord. Romans 6:23"
    ]
  },
  {
    "number": 10,
    "title": "Lovers of the World and Lovers of God",
    "paragraphs": [
      "Do not love the world or the things of the world. If anyone loves the world, the love of the Father is not in him. 1 John 2:15",
      "Lovers of the World",
      "…Do you not know that to be a lover of the world means enmity with God? Therefore, whoever wants to be a lover of the world makes himself an enemy of God. James 4:4",
      "Lust of the flesh – relating to self",
      "Lust of the eyes – relating to others",
      "Pride of life – relating to God",
      "Lovers of God",
      "So submit yourselves to God. Resist the devil, and he will flee from you. Draw near to God, and he will draw near to you. Cleanse your hands, you sinners, and purify your hearts, you of two minds. James 4:7-8",
      "Fasting",
      "Relating to self",
      "Almsgiving",
      "Relating to others",
      "Prayer",
      "Relating to God"
    ]
  },
  {
    "number": 11,
    "title": "Vows of Religion Combat Temptations",
    "paragraphs": [
      "Watch and pray that you may not undergo the test. The spirit is willing, but the flesh is weak.” Matthew 26:41",
      "Vow of Chastity – combats lusts of the flesh.",
      "Vow of Poverty – combats lusts of the eyes.",
      "Vow of Obedience – combats the pride of life."
    ]
  },
  {
    "number": 12,
    "title": "Four Weapons to Combat Against Selfish Human Nature",
    "paragraphs": [
      "Better to take refuge in the LORD than to put one’s trust in mortals. Psalms 118:8",
      "Weapon #1 : Distrust in Oneself",
      "Those who trust in themselves are fools, but those who walk in wisdom are safe. Proverbs 28:26",
      "Weapon #2: Trust in God",
      "In all your ways be mindful of him, and he will make straight your paths. Proverbs 3:5",
      "Weapon #3: Spiritual Exercises",
      "…train yourself for devotion, for, while physical training is of limited value, devotion is valuable in every respect, since it holds a promise of life both for the present and for the future. 1 Timothy 4:7-8",
      "Weapon #4: Prayer",
      "Will not God then secure the rights of his chosen ones who call out to him day and night? Will he be slow to answer them? I tell you, he will see to it that justice is done for them speedily. But when the Son of Man comes, will he find faith on earth?” Luke 18:7-8"
    ]
  }
];

export const WARFARE_ESSAYS: WarfareEssay[] = [
  {
    "id": "weapons-against-satan-sheen",
    "title": "Weapons Against Satan",
    "author": "Archbishop Fulton J. Sheen",
    "meta": "The Cross, the Holy Name of Jesus, the Precious Blood & Our Blessed Mother",
    "paragraphs": [
      "It is the cross that saves us, Sheen taught, and yet, even while dying on the cross Jesus was told: “Come down from that cross, if you are the Son of God” (Matthew 27:40). “It’s human to come down; it’s divine to hang there,” Sheen stated. “The demonic, very simply, is the anti-cross, the anti-disciplined life, the anti-Christ.”",
      "Father Tomaszycki then quoted Sheen’s identification of three powerful weapons against Satan: First, the Holy Name of Jesus, which Satan cannot stand because “at the name of Jesus, every knee shall bow in the heavens, on the earth, and under the earth” (Philippians 2:10).",
      "Second, the invocation of the Blood of Christ: “We are saved by the Blood of Christ; therefore, in temptation, call upon his Blood, ‘for without the shedding of blood, there is no remission of sin’” (Hebrews 9:22).",
      "Third, devotion to our Blessed Mother: “For at the beginning in the Book of Genesis it was the seed of a woman that would crush the seed of Satan” (Genesis 3:15)."
    ]
  },
  {
    "id": "revisiting-spiritual-warfare-barron",
    "title": "Revisiting the Spiritual Warfare",
    "author": "Bishop Robert Barron",
    "meta": "Jesus sent out the Twelve to battle dark spirits. He still empowers His Church to do the same.",
    "paragraphs": [
      "by Bishop Robert Barron",
      "In the sixth chapter of St. Mark’s Gospel, we find the account of Jesus sending out the Twelve, two by two, on mission. The first thing he gave them, Mark tells us, was “authority over unclean spirits.” And the first pastoral act that they performed was to “drive out many demons.”",
      "When I was coming of age in the ’60s and ’70s, it was common, even in seminaries, to dismiss such talk as primitive superstition — or perhaps to modernize it and make it a literary device, using symbolic language evocative of the struggle with evil in the abstract. But the problem with that approach is that it just does not do justice to the Bible. The biblical authors knew all about “evil” in both its personal and institutional expressions, but they also knew about a level of spiritual dysfunction that lies underneath both of those more ordinary dimensions. They knew about the world of fallen or morally compromised spirits. Jesus indeed battled sin in individual hearts as well as the sin that dwelt in institutional structures, but he also struggled with a dark power more fundamental and more dangerous than those.",
      "What, or better, who is this threatening spiritual force? It is a devil, a fallen or morally compromised angel. Imagine a truly wicked person who is also very smart, very talented and very enterprising. Now raise that person to a far higher pitch of ontological perfection, and you will have some idea of what a devil is like. Very rarely, devils intervene in human affairs in vividly frightening and dramatic ways. But typically, devils act more indirectly and clandestinely, through temptation, influence and suggestion. One of the most terrifying religious paintings in the world is in the Cathedral of Orvieto in Italy. It is a depiction of the Antichrist by the great early renaissance painter Luca Signorelli. The artist shows the devil whispering into the ear of the Antichrist, and also working his arm through the vesture of his victim in such a way that it appears to be the Antichrist’s own arm, thereby beautifully symbolizing how the dark power acts precisely with us and through us.",
      "What are his usual effects? We can answer that question quite well by examining the names that the Bible gives to this figure. He is often called diabolos in the Greek of the New Testament, a word derived from dia-balein, to throw apart, to scatter. God is a great gathering force, for by his very nature he is love; but the devil’s work is to sunder, to set one against the other. Whenever communities, families, nations, churches are divided, we sniff out the diabolic.",
      "The other great New Testament name for the devil is ho Satanas, which means “the accuser.” Perform a little experiment: gauge how often in the course of the day you accuse another person of something or find yourself accused. It’s easy enough to notice how often dysfunctional families and societies finally collapse into an orgy of mutual blaming. That’s satanic work.",
      "Another great biblical name for the devil is “the father of lies.” Because God is Truth, truthfulness — about oneself, about others, about the way things really are — is the key to smooth human relations. But how often we suffer because of untruth! Perhaps many years ago, someone told you a lie about yourself, and you’ve been wounded by it ever since. Perhaps you’ve deliberately lied about another person and thereby ruined his character and reputation. Consider how many wars and genocides have been predicated upon pervasive misperceptions and fabrications. Finally, the author of the first letter of John refers to the devil as “the murderer from the beginning.” God is life and thus the fosterer of human life.",
      "Perform a little experiment: gauge how often in the course of the day you accuse another person of something or find yourself accused.",
      "The devil — like an unhappy person who likes nothing better than to spread unhappiness around him — is the enemy of human flourishing, the killer of life. Does anyone really think that the massive slaughters that took place in the twentieth century — the piling up of tens of millions of corpses — can be adequately explained through political or psychological categories?",
      "An extraordinarily important aspect of the good news of Christianity is that Jesus, through his death and resurrection, has won victory over these dark forces. St. Paul said that we battle, not simply flesh and blood, but spiritual powers and principalities. But then he reminded us that nothing — neither height nor depth, nor any other power — could finally separate us from the love of Christ. Jesus has entrusted to his Church the means to apply this victory, the weapons, if you will, to win the spiritual warfare. These are the sacraments (especially the Eucharist and Confession), the Mass, the Bible, personal prayer, the rosary, etc. One of the tragedies of our time is that so many Catholics have dropped those weapons. Allow me to focus a bit more attention on Confession by switching from a military to a medical analogy. An open wound — untreated and un-bandaged — will rapidly become infected by germs and bacteria. Think of a pattern of serious sin as a sort of open wound in the spiritual order. Untreated, which is to say, un-confessed, it becomes a point of entry for less than savory spiritual powers.",
      "Jesus sent out the Twelve to battle dark spirits. He still empowers his church to do the same. Don’t be reluctant to use the weapons — and the healing balms — that he has given."
    ]
  },
  {
    "id": "lambs-supper-hahn",
    "title": "The Lamb’s Supper: The Mass as Heaven on Earth",
    "author": "Scott Hahn (quoting Dom Lorenzo Scupoli)",
    "meta": "Doubleday, 1999, pp. 131–132",
    "paragraphs": [
      "In his classic work, The Spiritual Combat, Dom Lorenzo Scupoli wrote: “This war is unavoidable, and you must either fight or die. The obstinacy of your enemies is so fierce that peace and arbitration with them is utterly impossible.” In short: we can run from evil, but we can’t hide.",
      "Moreover, we cannot ascend to heaven if we flee the battle. God has destined us, the Church, to be the Bride of the Lamb. Yet we cannot rule if we do not first conquer the forces that oppose us, the powers who are pretenders to our throne.",
      "What are we to do? We should take a look around us, after lifting the veil of mere human sight. John reveals the most encouraging news for Christians in battle. Two thirds of the angels are on our side, fighting constantly, even while we sleep. St. Michael the Archangel, heaven’s fiercest warrior, is our untiring and unbeatable ally. All the saints in heaven constantly call to almighty God for our vindication. And—most encouraging of all—in the end we win! John sees the battle from the perspective of eternity, so he can reveal the ending as vividly as he describes the casualties. The battles rage so fiercely that rivers run red with blood and corpses lie rotting in heaps in the streets. Yet the victors enter a city whose streams flow with living water and whose sun never sets.",
      "Hear Father Scupoli again: “if the fury of your enemies is great, and their numbers overwhelming, the love which God holds for you is infinitely greater. The angel who protects you and the saints who intercede for you are more numerous.”",
      "Scott Hahn, The Lamb’s Supper: The Mass as Heaven on Earth, First Edition. (New York; London; Toronto; Sydney; Auckland: Doubleday, 1999), 131–132."
    ]
  },
  {
    "id": "deliverance-exorcism-blai",
    "title": "What to Know About Catholic Deliverance and Exorcism",
    "author": "Adam Blai (Auxiliary Member, International Association of Exorcists)",
    "meta": "October 24, 2018 · Deprecatory vs. Imprecatory Prayer & Solemn Exorcism",
    "paragraphs": [
      "Deliverance and exorcism are two different forms of spiritual intervention. Deliverance is a broad term that can mean being freed from any problem of a spiritual nature or cause. Here it will be defined as deprecatory prayer (a request) offered with the hope that God will free a person from a spiritual affliction.",
      "Over the last fifty years or so, most deliverance work was done by Protestant denominations, and the books on deliverance over that time were from those perspectives. One erroneous idea that comes out of this tradition is that anything commanded to a demon by a baptized Christian in the name of Jesus will be obeyed immediately. This is a magical-thinking approach as it doesn’t take into account the free will of the person in relationship with that demon. We cannot foist our choices onto other adults; they have their own free will. In some Protestant books on deliverance, one is encouraged to speak directly to, and command, the demons. This is imprecatory prayer, a direct command. It is critical to understand that imprecatory prayer directly commands a demon, which is a tacit acceptance to a personal battle with that demon, while deprecatory prayer asks God to act against the demon. The Catholic Church has understood that the full authority to command demons was given to the Twelve Apostles, therefore a priest needs Apostolic authority given to him by a bishop before he engages in a battle with a demon. Of course a bishop, cardinal, or pope can do an exorcism at any time.",
      "It is easy to become distracted by the drama of deliverance and exorcism and lose sight of the fact that the source of demonic problems is a relationship with sin, and usually involves the First Commandment. It is often the case that, over time, emotional wounds lead to sin, which becomes habitual. The person grows in the wrong direction, like a tree that is bound and canted to the side as a sapling. The deception of the demon is to hide in these wounded feelings and distorted sense of self, seeming integral and necessary while fomenting more harm. People affected by demons must begin their healing by letting go of their own sins through repentance and of the sins of others through forgiveness.",
      "The cycle of repentance and forgiveness is bolstered by reaffirming one’s loyalty to God, such as with the recitation of the Apostles’ Creed, the renewal of baptismal promises, and participation in the sacraments. God works with the person where they are and they are usually given as much insight into their own wounds and sinfulness as they can handle at the time. It is like training that tree to now grow in a new way: change too fast and the tree breaks.",
      "A common challenge in deliverance and exorcism ministry is discerning whether a case is possession or severe oppression. Just below full possession, a person may manifest to some degree contorting, growling, reacting somewhat negatively to sacramentals, and hints of other indications of possession. However, in cases of full possession we see the demon taking over the body completely: supernatural strength, occult knowledge, knowledge of all languages, and detecting the holy.",
      "It is important to understand the difference between an exorcism and a solemn exorcism. An exorcism is an imprecatory prayer (a command), such as the exorcism in the Sacrament of Baptism. A solemn exorcism is a liturgical imprecatory ritual provided by the Church for treating demonically possessed people. Trouble arises when well-intentioned people presume to be able to perform something resembling a solemn exorcism to aid in cases of demonic oppression or possession. Liturgical prayer is reserved to clergy, and the Church limits imprecatory prayers against demons to priests with authority from their bishops.",
      "In 1890 Pope Leo XIII added the “Exorcism Against Satan and the Fallen Angels” as an appendix to the solemn exorcism. The Leonine (or “minor”) exorcism is effective in resolving demonic infestation cases. It has also been used, with permission from the ordinary, as a diagnostic test of possession in cases that are not yet clear. Not just any manifestation in response to the Leonine exorcism is sufficient evidence of possession; one or more of the traditional signs must still be documented. At no time should the public use this prayer as a way to test for possession; it must only be used by a priest with permission from his bishop. There have been cases of lay people becoming possessed as a result of using the minor exorcism over a possessed person.",
      "The Church provides deliverance from oppression cases, even just under full possession, primarily through reception of the sacraments and spiritual direction. The affected person contributes greatly to their liberation through fully embracing spiritual guidance, confession, forgiveness, prayer, penance, and the Mass. When a person starts to exhibit demonic manifestations, the case should be referred to the bishop’s office. Even though the case may not rise to the level of full possession, the bishop’s office or appointed personnel can oversee the spiritual direction and monitoring of the case.",
      "In the instructions to the priest in the Roman Ritual, the priest is warned to not too readily believe that a person is possessed and to consider whether they are suffering from mental illness. The Church requires that an investigation be made to ensure that the symptoms cannot be explained by mental or medical illness and that at least some of the four signs of possession are also present.",
      "Adam Blai is an expert on religious demonology and exorcism for the Pittsburgh Diocese. He has been an auxiliary member of the International Association of Exorcists in Rome for a number of years. Blai is the author of Hauntings, Possessions, and Exorcisms, a field guide to defense against the demonic."
    ]
  },
  {
    "id": "can-lay-catholics-deliverance",
    "title": "Can Lay Catholics Say Deliverance Prayers? & What Is a Deliverance Prayer?",
    "author": "Catholic Deliverance Study (citing CCC 1673, Can. 1172, Fr. Amorth & Fr. Fortea)",
    "meta": "Major vs. Minor Exorcisms · The Twin Pillars of Baptism & Reconciliation",
    "paragraphs": [
      "Well…can they? This is a very good question. There are two kinds of exorcism that have been defined by the Church: major (or solemn) exorcisms and minor (or simple) exorcisms.",
      "In 1673 of the Catechism of the Catholic Church, a major exorcism is defined as one that “can be performed only by a priest and with the permission of the bishop.” This is in reference to the Rite of Exorcism, which is a sacramental of the Church. The Rite of Exorcism may only be performed by a priest who has been appointed and given faculties (or written permission) by the local bishop. This priest is called an exorcist. It is the only form of exorcism that may be used on those who are fully possessed by an evil spirit.",
      "Minor exorcisms, on the other hand, do not always require a priest to perform them, nor do they require written permission from the bishop. On the U.S. Conference of Catholic Bishops’ Web site, two examples of these are given: minor exorcisms performed by a priest during a person’s Baptism at the Easter Vigil, and special prayers that may be used by the faithful or laymen.",
      "These “special prayers” are called deliverance prayers.",
      "Furthermore, the only reference in canon law concerning exorcisms reads:",
      "“Can. 1172 §1. No one can perform exorcisms legitimately upon the possessed unless he has obtained special and express permission from the local ordinary.”",
      "Notice that exorcisms cannot be performed “upon the possessed” unless “express” (or written) permission has been gained from the bishop. This wording is very important to our work as deliverance counselors. There are many different degrees of extraordinary diabolical influence that we may encounter in the world. Possession is the most severe of them, and the Rite of Exorcism is reserved for just those situations.",
      "So having said that, we, as Catholic laymen, must only abide by two restrictions, according to this canon law statute:",
      "·   We may not perform a major (or solemn) exorcism because it requires that we be a priest who has been given written permission from his bishop. The Rite of Exorcism is, therefore, forbidden. (It should be mentioned here that, because the formula for the Rite of Exorcism includes directly questioning the possessing demon to learn its name and characteristics, laymen are therefore forbidden from conversing with demons in this fashion, as a result. They may only rebuke an evil spirit and order it to depart, which is not the same thing as talking with it.)",
      "·   We may not perform any kind of exorcism prayer upon those who are fully possessed.",
      "This only leaves us with the option of performing minor exorcisms. Of course, the first kind of minor exorcism, which is performed solely by a priest during the Easter Vigil, is obviously outside our purview as laymen. That means deliverance prayers (those “special prayers” that I mentioned earlier) are the only exorcism prayers available to a Christian. They can be used on any person who is showing symptoms of obsession, oppression, infestation, vexation, or any other “lesser” degree of diabolical influence that might be caused by a demon. But deliverance prayers may not be used on someone who is fully possessed: that condition is dealt with exclusively by the Rite of Exorcism.",
      "In fact, this is one of the reasons why laymen refer to minor exorcisms as “deliverance prayers,” so as not to create confusion about what forms of “exorcism” they can or cannot perform. Usually in the field, when a person says “exorcism,” he means the Rite of Exorcism for the possessed, but when a person says “deliverance,” he means special prayers permitted to the laity that can be used to deal with a wide-range of lesser issues stemming from a demonic origin.",
      "Still not convinced? Father Gabriele Amorth, an exorcist in the Diocese of Rome who practiced and mastered spiritual warfare directly under the oversight of several popes, wrote in his excellent book, An Exorcist Explains the Demonic, “After exorcism, the most effective means in the struggle against the demon are prayers of deliverance and healing…. Do not be surprised if I speak of laymen. In the Gospel of Mark, before ascending to heaven, Jesus says: ‘And these signs will accompany those who believe: in my name they will cast out demons’ (Mark 16:17). Jesus gave this power first to the twelve apostles and then to the seventy-two disciples. This fact indicates that He intended to extend it to those who believe in Him. This is the scriptural foundation for carrying out prayers of deliverance and healing. Whoever it is [praying deliverance]…matters little. What matters is faith. The power to drive out demons comes directly from Jesus. No one can deny it or take it away.”",
      "So, who can say prayers of deliverance? Any believer in a state of grace who is spiritually prepared for such an undertaking and who has been properly trained can perform a minor exorcism (or a prayer of deliverance). It is well-known that many famous saints performed minor exorcisms during their lifetimes, such as St. Catherine of Sienna, Blessed Catherine Anne Emmerich, St. Padre Pio, Luisa Piccarreta, and others. It is not just a practice that we, as Christians, can participate in, but it is a work of mercy that we are called to perform by Christ, who gave us the authority to help those truly poor and afflicted in spirit.",
      "What is a Deliverance Prayer?",
      "Deliverance is any prayer to God, the angels, or the saints asking to be freed from the power of the Evil One and the kingdom of darkness. Technically, we pray deliverance every single time we say the Our Father. The authority to pray deliverance is derived directly from one’s Baptism. It cannot be taken away. If you have been baptized “in the name of the Father, and the Son, and the Holy Spirit,” you possess a general authority against demons (although you should never undertake this kind of action without considerable training and a direct calling from God).",
      "Deliverance is also a term which is used to describe specific ministries or prayer sessions which are conducted with intent to expel demons. While ordinary demonic activity, such as everyday temptation, are largely defended against by living the good Catholic life, there are special cases where the kingdom of darkness has managed to gain a legal right to act above and beyond mere temptation in a person's life. This is called extraordinary activity. In most cases, the primary means of casting out (or removing) from someone’s life this insidious activity of the Devil comes through two special forms of prayer: minor (or simple) exorcisms and major (or solemn) exorcisms.",
      "In this case, deliverance is a series of private minor exorcism prayers. They are permitted to the laity and normally performed by a trained deliverance counselor over those who suffer from some form of extraordinary demonic activity. After the victim of such demonic activity has willingly participated in the Sacrament of Reconciliation with a Catholic priest, these kinds of prayers are said over the afflicted person by a deliverance counselor (or even by the afflicted person himself, if he knows how to do it) in order to break the bonds that any evil spirits may have over him. This act brings about a greater freedom for the person than if the prayers had not been said.",
      "In fact, if you think about the process that adults undergo to become Catholic through RCIA (the Rite of Christian Initiation for Adults), you see a parallel structure that exists between deliverance and initiation into Christianity. First, the candidate goes to Confession. Then, when he is at the Easter Vigil, he is Baptized, he renounces the Devil publicly, and then he is prayed over by the priest in the form of a minor exorcism. So the legal rights of the Devil over the initiated person are broken when he confesses his sins to God and is forgiven, then he renounces the Devil verbally, and the priest casts the Devil out with a prayer of deliverance.",
      "This is basically the same step-by-step process we follow in our model of deliverance.",
      "It's also important to note that this is why it is so critical that we, as Christians, attend Confession regularly and pray the acts of penance assigned to us by the priest. The Sacrament breaks any hold the Devil might have over us after we have willingly chosen to sin, and when we perform the assigned acts of penance, which usually include the Our Father or the Hail Mary, these prayers drive out the demons attached to us as a result of our sin.",
      "According to Fr. Fortea, an exorcist in Madrid, who spoke on the subject of deliverance prayers and the Rite of Exorcism: “God, in His wisdom, has not desired to place too many conditions on the most essential Christian practices for them to be valid (e.g., baptism or exorcism).” In other words, Christians of all kinds technically have this authority over demons because of the primary reason the Kingdom of God was inaugurated by Christ: to expel demons from our lives, freeing us from sin and demonic bondage, so that we can know and accept Jesus Christ as our Lord and Savior and become baptized and enter His Church.",
      "In fact, in many cases, Catholic exorcists rely on deliverance counselors or similar prayer groups to alleviate their heavy caseloads. This is because an exorcist is first a priest: he must still perform all the duties required of him by his office. The exorcist appointment is a secondary function, so you can see that, as busy as priests are, they cannot always handle every minor case that comes their way. The Devil often tries to wear the exorcist down through such busyness, so when a particular case is not as severe as full possession, it is often a blessing for the exorcist to direct the client towards a local deliverance counselor, who can handle the less severe cases of demonic activity.",
      "But it is important now for me to draw your attention to something very important about exorcism in general: even the Rite of Exorcism, which is the highest form of exorcism prayer that is available within the Church, is merely a sacramental. The Rite is not a full Sacrament. This is very important to understand. All prayers of deliverance, from the Rite itself to those deliverance prayers permitted to the laity, exist upon the firm foundation laid by two critically important Sacraments: Baptism and Reconciliation. Exorcism prayers would not be possible otherwise. This is because a layman's authority to cast out or rebuke demons, which was handed down to him directly by Jesus Christ, exists by virtue of the individual's Baptism. However, even when a Christian has the authority to use an exorcism prayer such as this, the Devil's legal right to the afflicted person must be broken first. And how is this done? Through the Sacrament of Reconciliation. In most cases, when the Devil has an extraordinary influence in a person's life, it is because of the person’s own free will choices, their own sin, in other words. So, the person must first confess these sins (i.e., participate willingly in the Sacrament of Reconciliation) before he--or a person with spiritual authority over him--can exercise the Christian authority to cast out a demon (i.e., by virtue of the Christian's Baptism).",
      "In conclusion, the Sacraments of Baptism and Reconciliation are twin pillars which hold aloft prayers of deliverance and make it possible for the Christian to use them against the demonic kingdom. This is why it is necessary to first become a baptized Christian in order to find freedom from bondage, and why it is necessary for an already baptized Christian who is under the influence of diabolic activity to confess their sins regularly, with haste. As you can see, while deliverance is an important ministry, and it certainly has its place within the Church, in the end, it is the Sacraments which truly free us!"
    ]
  },
  {
    "id": "fighting-and-winning-battles",
    "title": "Fighting and Winning Spiritual Battles",
    "author": "Drawing on Fr. José Antonio Fortea (Interview with an Exorcist)",
    "meta": "The Image of the White Rider · How to Win Our Spiritual Battles · Our Victory in Christ",
    "paragraphs": [
      "In his wonderful book, Interview with an Exorcist, José Antonio Fortea, a Spanish exorcist and priest, wrote the following concerning the fall of Satan and the heavenly battle between the angels that occurred at the dawn of history: “How can purely spiritual beings fight among themselves? What weapons do they use? Angels are spirits, so their battles must be purely intellectual. The only weapons that they can use are intellectual arguments. The angels gave reasons to the rebels for why they should return to obedience to God. The rebel angels countered with their reasons to support their position and spread their rebellion among the faithful angels. In this epic angelic battle, some who were inclined to rebel returned to obedience, while some of the faithful angels were seduced by the evil arguments of the rebels.”",
      "Now, stop and think about that for a moment: Angels (and therefore, fallen angels, or demons) are not physical creatures. They do not have bodies. They are entirely spiritual beings. So, because they are not tangible, they do not use earthly weapons, like guns or knives or swords, to fight their battles. Instead they use intellectual arguments to defeat enemy angels.",
      "And demons use these arguments to defeat you and me.",
      "The Image of the White Rider",
      "When I was a 12-year-old boy, I used to read the Bible into the late hours of the night, and there was a description in the book of Revelation which always both confused and fascinated me. It's the image of Christ as the White Rider on a white horse in chapter 19:11, 14-15: “Then I saw the heavens opened, and there was a white horse; its rider was [called] 'Faithful and True.' He judges and wages war in righteousness…The armies of heaven followed him, mounted on white horses and wearing clean white linen. Out of his mouth came a sharp sword to strike the nations.”",
      "What really got me every time I would read this passage is that a big sword was sticking out of Jesus's mouth. I tried picturing this to the best of my ability at that age, but not only did the imagery that I ultimately came up with look rather silly in my mind, but it just didn't make any sense. I knew there was some deeper meaning behind this illustration. But I wasn't smart enough or wise enough to figure it out.",
      "Twenty-three years later, with Fr. Fortea's help, I finally understand.",
      "The sword coming out of the White Rider's mouth is the Word of God. Ephesians 6:12-17 says: \"Therefore, put on the armor of God, that you may be able to resist on the evil day and, having done everything, to hold your ground. So stand fast with your loins girded in truth, clothed with righteousness as a breastplate, and your feet shod in readiness for the gospel of peace. In all circumstances, hold faith as a shield, to quench all [the] flaming arrows of the evil one. And take the helmet of salvation and the sword of the Spirit, which is the word of God.”",
      "See, the sword is the Word of God. But it isn't an actual sword. It is an argument.",
      "In 2 Corinthians 10:3-5, St. Paul writes: “For, although we are in the flesh, we do not battle according to the flesh, for the weapons of our battle are not of flesh but are enormously powerful, capable of destroying fortresses. We destroy arguments and every pretension raising itself against the knowledge of God, and take every thought captive in obedience to Christ.”",
      "Notice that St. Paul describes spiritual warfare as a war of words! This is the key to winning the battles we fight in spiritual warfare. We must destroy the arguments of demons, who with their wicked reasoning whisper to us nothing more than seductive lies that are not founded on the Truth. They do this, like Satan did in the Garden of Eden to Adam and Eve, in order to persuade us to disobey God, which leads to our sin and death and eternal ruin. And this battle, it should be noted, always takes place entirely in our minds.",
      "How to Win Our Spiritual Battles",
      "So how do we win an argument with a demon, who is far more intelligent than we are? The clue to this answer lies in the Gospels. At the beginning of John, the text reads: \"In the beginning was the Word, and the Word was with God, and the Word was God.\" Earlier we read how the sword of the Spirit is the Word of God, what Christians would refer to as Sacred Scripture. Well, here we see that Jesus Christ is Himself the Word of God.",
      "In other words, Christ Himself is our Eternal Argument! Out of His mouth, he dismantles and destroys the flawed arguments of the Evil One. He strikes down Satan's arguments and the wicked arguments of the world. We put on Christ like a garment, like a suit of armor that protects us from the snares of the Devil. How do we put on Christ? By living the good, Catholic life: partaking of the Sacraments of Reconciliation and the Eucharist as often as our station in life allows us to; praying every day; doing charitable works; almsgiving; fasting; reading sacred writings or other holy texts; studying the lives of the saints; volunteering at the local parish. The more we put on Christ, the more He defends us against the wiles of the Devil, and we keep our minds far from sin and disobedience.",
      "It is just like King David when he battled Goliath: \"...I come against you in the name of the LORD Almighty.\" We must rely on the name of Jesus Christ, and when we do, He wins our arguments against the demonic for us.",
      "And that's not all. Acts 2:1-4 says: “When the time for Pentecost was fulfilled, they were all in one place together. And suddenly there came from the sky a noise like a strong driving wind, and it filled the entire house in which they were. Then there appeared to them tongues as of fire, which parted and came to rest on each one of them. And they were all filled with the Holy Spirit and began to speak in different tongues, as the Spirit enabled them to proclaim.”",
      "This event, known as Pentecost, was the Holy Spirit's descent from Heaven that He might be received by all the faithful on the Earth. It is the Holy Spirit who enables us to proclaim to demons and to the fallen world the Eternal Argument of Christ, which is the Truth, and which cannot be defeated by the father of lies.",
      "Our Victory in Christ",
      "And this is really the heart and secret to victory in spiritual warfare: a quiet dependence on the Lord, a silent humility and obedience to Him in all things, a tireless resistance against temptation and a determined avoidance of all sin, great or small. This is how we win our spiritual battles and receive the crown of glory.",
      "As St. Peter wrote in his First Epistle, 5:8-10: \"Be sober and vigilant. Your opponent the devil is prowling around like a roaring lion looking for [someone] to devour. Resist him, steadfast in faith, knowing that your fellow believers throughout the world undergo the same sufferings. The God of all grace who called you to his eternal glory through Christ [Jesus] will himself restore, confirm, strengthen, and establish you after you have suffered a little.\"",
      "And if we, as sons and daughters of the Kingdom of God, do all these things as St. Peter counsels, then God, through Sacred Scripture, guarantees us this: \"Blessed is the man who perseveres in temptation, for when he has been proved he will receive the crown of life that he promised to those who love him\" (James 1:12)."
    ]
  },
  {
    "id": "adjuration-catholic-encyclopedia",
    "title": "Adjuration",
    "author": "Thomas Duggan · The Catholic Encyclopedia (1907–1913)",
    "meta": "Deprecatory vs. Imprecatory Adjuration · Private vs. Solemn Exorcism",
    "paragraphs": [
      "An urgent demand made upon another to do something, or to desist from doing something, which demand is rendered more solemn and more irresistible by coupling with it the name of God or of some sacred person or thing. Such, too, was the primitive use of the word. In its theological acceptation, however, adjuration never carries with it the idea of an oath, or the calling upon God to witness to the truth of what is asserted. Adjuration is rather an earnest appeal, or a most stringent command requiring another to act, or not to act, under pain of divine visitation or the rupture of the sacred ties of reverence and love. Thus, when Christ was silent in the house of Caiphas, answering nothing to the things that were witnessed against Him, the High Priest would force Him to speak and so said to Him: “I adjure Thee by the living God, that Thou tell us if Thou be the Christ the Son of God.” (Matthew 26:63) Adjuration may be either deprecatory or imprecatory. The one implies deference, affection, reverence, or prayer; the other, authority, command, or menace. The one may be addressed to any rational creature except the demon; the other can be addressed only to inferiors and the demon. In Mark (5:7) the man with the unclean spirit cast himself at the feet of Jesus saying: “What have we to do with Thee Jesus the Son of the Most High God? I adjure Thee that Thou torment me not.” The wretched man recognized that Christ was his superior, and his attitude was that of humility and petition. Caiphas, on the contrary, fancied himself vastly superior to the Prisoner before him. He stood and commanded Christ to declare Himself under pain of incurring the wrath of Heaven. It is hardly necessary to insist that one mode of adjuration is to be employed when addressing the Deity and quite another when dealing with the powers of darkness. Helpless man, calling upon Heaven to assist him, adds weight to his naked words by joining with them the persuasive names of those whose deeds and virtues are written in the Book of Life. No necessity is thereby laid upon the Almighty, and no constraint save that of benevolence and love. But when the spirit of darkness is to be adjured, it is never allowable to address him in the language of peace and friendship. Satan must ever be approached as man’s eternal enemy. He must be spoken to in the language of hostility and command. Nor is there aught of presumption in such treatment of the evil one. It were indeed egregious temerity for man to cope single-handed with the devil and his ministers, but the name of God, reverently invoked, carries with it an efficacy which demons are unable to withstand. Nor should it be supposed that adjuration implies disrespect for the Almighty. If it is allowable to invoke the adorable name of God in order to induce others to build more securely upon our world, it must be equally permissible to make use of the made means in order to impel others to action. Indeed, when used under due conditions, that is “in truth, in justice, and in judgment”, adjuration is a positive act of religion, for it presupposes on the part of the speaker faith in God and his superintending Providence, as well as an acknowledgment that He is to be reckoned with in the manifold affairs of life. What more beautiful form of prayer that that of the litany, wherein we beg immunity from evil through the Advent, the Birth, the Fasting, the Cross, the Death and Burial, the Holy Resurrection, and the wonderful Ascension of the Second Person of the Blessed Trinity? Christ Himself recommends this form of invocation: “Whatsoever you shall ask the Father in My name, that will I do: that the Father may be Glorified in the Son” (John 14:13). Acting upon this promise, the Church sends all her more solemn prayers with the adjuration: Per Dominum nostrum Jesum Christum (Through Our Lord Jesus Christ). St. Thomas declares that the words of Christ, “in My name that shall cast out devils” (Mark 16:17) give all believing Christians warrant to adjure the spirit of evil. This, however, must not be done out of mere curiosity, for vainglory, or for any other unworthy motive. According to Acts 19:12, St. Paul was successful in casting out wicked spirits, whereas the Jewish exorcists, using magic arts purporting to come from Solomon, “attempted to invoke over them that had evil spirits, the name of the Lord Jesus, saying: ‘I conjure you by Jesus, whom Paul preaches,’ ” were leaped upon and overcome by those possessed, in such sort that they found it convenient “to flee out of that house, naked and wounded.” In adjuring the demon one may bid him depart in the name of the Lord, or in such other language as faith and piety may suggest; or he may drive him forth by the formal and fixed prayers of the Church. The first manner, which is free to all Christians, is called private adjuration. The second, which is reserved to the ministers of the Church alone, is called solemn. Solemn adjuration, or adjuration properly so called, corresponds to the Greek exorkismos. It properly means an expelling of the evil one. In the Roman Ritual there are many forms of solemn adjuration. These are to be found, notably, in the ceremony of baptism. One is pronounced over the water, another over the salt, while many are pronounced over the child. Manifold and solemn as are the adjurations pronounced over the catechumen in baptism, those uttered over the possessed are more numerous and, if possible, more solemn. This ceremony, with its rubrics, takes up thirty pages of the Roman Ritual. It is, however, but rarely used, and never without the express permission of the bishop, for there is room for no end of deception and hallucination when it is question of dealing with the unseen powers. (See BAPTISM; DEVIL; EXORCISM.)",
      "Sources",
      "BILLUART, Summa Sancti Thomae, V; BALLERINI, Opus Theologicum Morale, IV; LEHMKUHL, Theologia Moralis, I; MARC, Institutiones Morales Alphonsianae, I; LIGUORI, V, 2, appendix.",
      "Thomas Duggan, “Adjuration,” ed. Charles G. Herbermann et al., The Catholic Encyclopedia: An International Work of Reference on the Constitution, Doctrine, Discipline, and History of the Catholic Church (New York: The Encyclopedia Press; The Universal Knowledge Foundation, 1907–1913)."
    ]
  }
];

export const EXORCIST_DIARY_ENTRIES: ExorcistDiaryEntry[] = [
  {
    "id": "diary-1",
    "number": "Diary #1",
    "title": "“Stop Saying that Name!”",
    "date": "Oct 29, 2020",
    "author": "Msgr. Stephen Rossetti",
    "paragraphs": [
      "In the middle of our exorcism session, out of the mouth of the possessed person came the cry, “Stop saying that name!” We had been saying the holy name of Jesus and it was really getting to the demons. They hated to hear it. So, realizing they hated it, we said it all the more, again and again. Jesus, Jesus, Jesus.",
      "“At the name of Jesus every knee should bend, of those in heaven and on earth and under the earth” (Phil 2:10). I often quote this passage in the midst of a session, and emphasize the phrase, “under the earth.” Even in hell, the name of Jesus is all-powerful and every knee must bend.",
      "On earth, the name of Jesus has power to cast out demons. As the Rite of Exorcism says, “In nomine Domini nostri Iesu Christi eradicare et effugare ab hoc plasmate Dei” which is, “In the name of our Lord Jesus Christ: be uprooted and be put to flight from this creature of God.”",
      "How many saints have died with the name of Jesus on their lips! But to the demons, his name is torture or, truly, pure hell.",
      "I was in the midst of an exorcism recently and the demons were suffering greatly as a result of the prayers. I commanded them to answer, “Did you make a bad choice rejecting God?” The answer came back reluctantly, “Yes.” I then asked, “Are you suffering because of it?” Again, the reluctant response, “Yes.” And so I concluded with the question, “So would you change your choice if you could?” They answered, “No.” That is an example of the sickness of evil and sin- they know they made a bad choice but still wouldn’t change it."
    ]
  },
  {
    "id": "diary-3",
    "number": "Diary #3",
    "title": "Why Do Demons Choke People?",
    "date": "Nov 12, 2020",
    "author": "Msgr. Stephen Rossetti",
    "paragraphs": [
      "A man recently called and said his house was infested with demons. He added that they recently attacked him in bed and choked him. He couldn’t breathe. So, he instinctively said in a loud voice, “In the name of Jesus, get off me!” He said this several times. Finally, the demons stopped.",
      "Many people who are attacked by demons say that they are sometimes choked by them. In the midst of exorcist sessions, the possessed person will not uncommonly start choking. During the worst case we had, the demons said, through the mouth of the possessed person, they are “forced” to choke this person because of what the exorcism team was doing to them. So, the demons tried to blame it on us. My response, “Nice try.”",
      "Why do demons choke people? First, it is something animals do. They grab their prey by the throat to subdue it and to kill it. Demons are not allowed to kill people but they can choke people in certain limited circumstances, especially the possessed. Demons act like vicious beasts and are often portrayed as animals. They choke people to try to establish their authority over the person and also to frighten and intimidate them. If you’ve ever been choked, you know how terrifying it can be.",
      "But, rest assured, God does not allow the demons to kill us. Also, the proper response is what the man spontaneously did: he commanded the demons In Jesus’ name to stop. We all have authority over our own bodies and we can exercise this authority by telling the demons to leave.",
      "Demons try to establish their control through intimidation and fear. We should remember always that Jesus is Lord! and we trust in him."
    ]
  },
  {
    "id": "diary-6",
    "number": "Diary #6",
    "title": "Can You Convert Demons?",
    "date": "2020",
    "author": "Msgr. Stephen Rossetti",
    "paragraphs": [
      "Demons cannot be converted. So, to all those in deliverance ministry, don’t try. Don’t try to convince them of the Truth. At times I will force them to tell the Truth. For example, I will command them to answer, “Whose death and resurrection smashed Satan’s kingdom?” They will respond only under duress, “Jesus.” In an exorcism, we “pour the Truth down their throats,” as one senior exorcist described the Rite, but we cannot convert them. They are lost forever."
    ]
  },
  {
    "id": "diary-119",
    "number": "Diary #119",
    "title": "“She Will Come.”",
    "date": "Jan 1, 2021",
    "author": "Msgr. Stephen Rossetti",
    "paragraphs": [
      "It was a very tough case. The young woman was possessed by hundreds of demons with Satan himself personally leading them. But the more difficult the case, the stronger the graces God gives. In this case, I knew that we would need the very best God could send.",
      "We were coming close to the end, after countless hours of ugly and painful sessions. The demons were getting weaker and were now more obedient, much to their dismay. I commanded them, in the name of Jesus, to tell us, \"When will you leave and by what means?\" The demons reluctantly responded with a date two weeks hence and said, \"She will come.\"",
      "Everyone in the room knew who \"she\" was. The demons would not say the name of the Mother of God. Her name, like that of her Son, is itself holy.",
      "The day finally came and the moment approached. The room grew silent and the possessed woman said, \"She is here.\" As the Virgin quietly moved closer, the demons began to thrash wildly. She said nothing but the radiant light of Christ shining through the humble handmaid of God was overpowering.",
      "Satan himself screamed. After screaming and thrashing several times, the Prince of Darkness left. It was over.",
      "Now, I ask all of the possessed to consecrate themselves to the Mother of God as part of the healing process. We ask Mary not only to cast out the demons but to protect the afflicted person for the rest of their lives, until she welcomes them into the Kingdom.",
      "The Gates of Hell will not prevail against the Church, or against its Mother."
    ]
  },
  {
    "id": "diary-148",
    "number": "Diary #148",
    "title": "Socked by a Demon",
    "date": "Jul 25, 2021",
    "author": "Msgr. Stephen Rossetti",
    "paragraphs": [
      "One of our spiritual sensitives (SS) sent the attached photo of a nasty large bruise on her body. She had been assisting our priest-exorcists in cleansing a demonically-infested building. Below is our text exchange:",
      "Spiritual Sensitive (SS): Here is the latest development [referring to the photo she sent me].",
      "Priest-exorcist: Is that your arm?",
      "SS: Leg",
      "Priest-exorcist: How did it go last night?",
      "SS: Got rid of 8 [demons].",
      "Priest-exorcist: Ok, thanks for doing that.",
      "SS: Then they socked me in the leg.",
      "Priest-exorcist: Ugh.",
      "Look more closely at the lives of the saints. Many of them were beaten by demons. For example, in a letter to her spiritual director, Gemma Galgani wrote: \"The Devil has pursued me in every possible way...He seized me by the hair and dragged me about...He tormented me like this for more than four hours, and thus I passed the night.\" She was so afflicted by demons that she asked for an exorcism to be performed over her. The priest rightly refused, responding that she wasn’t possessed.",
      "Similarly, Padre Pio often suffered physical beatings by demons: “These devils don’t stop striking me, even making me fall down from the bed. They even tear off my shirt to beat me! But now they do not frighten me anymore. Jesus loves me....” Some of his community members suggested an exorcism for him. Again, it was rightly refused by his superiors.",
      "The possessed and strongly oppressed can also be clawed, scratched and bruised by demons.* In fact, it is one of the discernment questions I typically ask during intake, “Do you have any unexplained bruises or scratches?” I have many photos of such.",
      "I have been asked several times, “Why doesn’t God just shut all the demons up in hell and stop them from afflicting people?” Good question. It’s part of a larger question: “Why does God allow bad things to happen to people at all?” In fact, what demons can physically do to us pale in comparison to what humans do to each other.",
      "Demons are very restrained in what God allows. They tempt everyone. They can harass and occasionally physically torment people. But they cannot directly kill or maim us, although human beings can and, sadly, do so to each other.",
      "Our spiritual sensitive generously assisted us in this exorcism ministry. She paid a price for it, just as Jesus paid the price for us all. In faith, her suffering participates in Jesus’ redemptive sacrifice. God will reward her for it.",
      "*Fr. Cliff Ermatinger, The Trouble with Magic, Padre Pio Press, p. IX."
    ]
  },
  {
    "id": "diary-152",
    "number": "Diary #152",
    "title": "The 70/30 Rule in an Exorcism",
    "date": "Aug 22, 2021",
    "author": "Msgr. Stephen Rossetti",
    "paragraphs": [
      "She had been suffering under a witch’s curse for a long time. The witch’s voice taunted her day and night. She had large, unexplained marks and scratches on her body. The last was a message etched on her back. In the hospital, the baffled doctors read it to her father: “She is gone. You lost.”",
      "The witch was tempting her to sin and despair, but she valiantly resisted. She confessed everything to a priest and to her Dad. Moments later, she incredibly coughed up what the medical team described as \"a black fluid that came out still boiling and a mass that began to move independently and crumble.\" They did not know what it was.",
      "We did. It was a witch’s bolus, by which the witch helps keep the curse in place. Now, the curse was greatly weakened, if not broken.",
      "In an exorcism, we use the 70/30 rule. Liberation typically depends about 70% on the efforts of the possessed person and 30% on the work of the exorcist and team. This is not to denigrate the importance and power of the Church’s authority or the power of the Rite of Exorcism prayed by a priest with ecclesiastical faculties. It is irreplaceable. But it is not effective without the possessed renouncing sin, rejecting the Evil One, and receiving the sacraments. I dare say many demonic afflictions would eventually cease on their own if the afflicted person engaged in an intensive process of conversion and sanctification.",
      "This young woman rejected the witch and the curse; she confessed her sins; and she resisted the temptations, despite the incredible spiritual evil that was pressing upon her. Her courage and faith were the final catalyst for the witch’s bolus to be ejected.",
      "The witch’s message scratched on her back (\"She is gone. You lost.\") could not have been more wrong. This strong young woman is not gone; she is not lost. God and her family did not lose. She is back and at peace. Love wins...always."
    ]
  },
  {
    "id": "diary-161",
    "number": "Diary #161",
    "title": "The Rosary as an Exorcist’s Weapon",
    "date": "Oct 24, 2021",
    "author": "Msgr. Stephen Rossetti",
    "paragraphs": [
      "\"The demons were attacking me,\" said the Exorcist, \"So I grabbed my rosary and held it up. Instantly, the demons were undone and fled.\"",
      "St. Bartolo Longo, the Apostle of the Rosary, was being crushed by demonic obsessions. He had been converted to the Faith from his practice of Satanism. But he was haunted by the idea that he remained consecrated to Satan and destined for hell. He was on the brink of despair and suicide. In desperation he began to pray the rosary. His devotion to the rosary cast out the demonic mental attacks and was the instrument of his road to sanctity.",
      "Pope Pius XI wrote, \"“The Rosary is a powerful weapon to put the demons to flight.\" Padre Pio said, \"The rosary is the weapon for these times.\" In our exorcism sessions, as the priest prays the solemn rite, we often have the laity praying the rosary. Fr. Gabriel Amorth, former exorcist of Rome, recalled an encounter with Satan. The Evil One, being forced to tell the truth, said, \"Every Hail Mary of the Rosary is a blow to the head for me; if Christians knew the power of the Rosary, it would be the end of me!\"",
      "As exorcists, we are a particular target for Satan. Overall, we are protected but there remains a demonic bullseye on our back. Nightly I sprinkle my room with holy water and invoke the Virgin and St. Michael. And I sleep, just as I go throughout the day, with the rosary in my hands."
    ]
  },
  {
    "id": "diary-176",
    "number": "Diary #176",
    "title": "Demons Hate Gemma",
    "date": "Feb 5, 2022",
    "author": "Msgr. Stephen Rossetti",
    "paragraphs": [
      "For ten years, \"Valerie\" was deep into the occult. She visited houses of witchcraft, pagan temples, and attached herself to gurus and pagan deities. By the grace of God, she had a powerful experience of Christ and realized how evil it all was. But the path back has been tortuous...",
      "These witches, gurus and demons are not letting her go without a fight. Demons of divination typically are dug in deep and hard to expunge. They are attacking and tormenting Valerie daily. But after weekly deliverance sessions for a year, she is much better. She is starting to emerge from the mental darkness and spiritual lethargy that increasingly engulfed her in the occult. She now has more moments of light and peace.",
      "Valerie recently had a \"dream.\" She told me she saw a huge Catholic shrine. On one side of the building was the word: \"Pray.\" On the other side was the word: \"Rosary.\" She took this as a clear sign that she should pray the rosary daily, which she is now doing.",
      "She was also given the sure knowledge that this shrine was in an Italian town called Lucca. Valerie told me she never heard of Lucca and knew \"zero\" about it. So, she went online and found that it was the home of St. Gemma Galgani. St. Gemma herself regularly suffered \"furious assaults of the devil on her body and her soul, so fiendish and continuous that she imagined herself possessed and begged to be exorcized.\"* The body of St. Gemma is currently interred in the Passionist monastery-sanctuary of St. Gemma in Lucca.",
      "St. Gemma has been a huge help to Valerie on her road to spiritual recovery. Valerie even claims that St. Gemma woke her up on Easter Sunday to attend Mass when she was in danger of over-sleeping. She said, \"When I woke up, I was filled with an enormous love for Jesus in my heart. I knew this was a special grace.\" Likewise, St. Gemma was noted for being filled with a pure, child-like love for Jesus.",
      "Valerie also said that whenever she sees a picture of beautiful Gemma and prays for her help, the demons react strongly. She said they \"hate\" her and have a \"pure disgust\" for her. The demons tormenting Valerie make her feel like \"vomiting\" whenever St. Gemma is invoked. They shout, \"Keep that woman away from me!\"",
      "Demons hate Gemma. We love her!"
    ]
  },
  {
    "id": "diary-195",
    "number": "Diary #195",
    "title": "Demons Tortured by St. Michael Prayer",
    "date": "Jun 28, 2022",
    "author": "Msgr. Stephen Rossetti",
    "paragraphs": [
      "I strongly encourage those afflicted by demons to regularly attend Mass. But I know that it is difficult for them, especially for the fully possessed. When someone is possessed, there is a kind of interpenetration of the bodies of the possessed with demons. Thus, the possessed will often feel some of what the demons feel. So their lives will, at times, be a living hell-- literally.",
      "For example, when placed in contact with anything holy, the possessed will typically say they feel excruciating pain. They will say that cold holy water burns. When looking at a crucifix, their eyes will feel like they are on \"fire.\" When encountering a priest or a Catholic Church, they may feel intense hatred.",
      "I asked \"David,\" who formerly belonged to a Satanic cult and is now possessed, to do his best to attend Sunday Mass. He valiantly tries but has only managed to attend once every few months, if that. He said that when he is able to attend, \"I can't say the prayers while I'm there or respond to them like everyone else does.\"",
      "David added, \"It's torture to be there, with all of the statues, and pictures that surround me.\" He went on, \"All of the people and the priest praying is such a loud noise that it makes me so angry.\" And he concluded, \"When they say the St. Michael prayer, I can hear the demons screaming. It's so horrible and frightening and painful.\"",
      "I love the Church's sacramentals. They inspire and strengthen us. But they also serve an important apotropaic function: they are abhorrent to demons and help to cast them out. I noted especially David's comment about the St. Michael prayer: it frightens demons, causes them intense pain, and they scream in agony. I will be more diligent in using this prayer in our future exorcism sessions."
    ]
  },
  {
    "id": "diary-200",
    "number": "Diary #200",
    "title": "The Three R’s for Casting Out Demons",
    "date": "Aug 10, 2022",
    "author": "Msgr. Stephen Rossetti",
    "paragraphs": [
      "\"He turned and said to Peter, 'Get behind me, Satan!'\" Mt 16:23",
      "After a recent online deliverance session with us, a woman shared her experience:",
      "I've been able to attend most of the sessions and have found that with each",
      "successive one, I have been increasingly able to attain spiritual healing.",
      "For many years, I have been afflicted with an evil spirit that causes me to hate God and to curse Jesus. I have sought deliverance for a long time. I am learning",
      "with each session how to better deal with evil attacks from the devil.",
      "I have learned, in particular, that I must do the 3 Rs...I am now able to relate with the Lord Jesus in a loving way, without any sense of the previous hostility, resentment or anger.",
      "These three R's of casting out demons are: reject, renounce, and rebuke. In our online sessions, as well as our face-to-face solemn exorcisms, we ask afflicted people to identify the evil spirits present and then say the three R's. So, for example, if an individual identifies the presence of an evil spirit of lust, the person would then say: \"In the holy name of Jesus, I reject, I renounce, and I rebuke the spirit of lust. In Jesus' holy name, I cast it out!\"",
      "To \"reject\" is to make an act of the will which says in effect: \"I do not want this evil spirit.\" To \"renounce\" is to give back any benefits desired or received in the demonic relationship. To \"rebuke\" is sharply denouncing the evil spirit. In deliverance work, an important step in the process of liberation is cutting the relationship between the individual and the evil spirit. While a simple rejection would likely suffice, we have found these three R's to be a bit more thorough and decisive.",
      "After the afflicted person has formally rejected the evil spirit, the Exorcist can then invoke the authority of the Church and more easily cast it out. While the entire process of casting out demons can take some time, this formal process of rejecting the evil spirits, using the three R's, is an important step along the way.",
      "I have also found these three R's helpful in overcoming the normal temptations of life, which are often fueled by evil spirits. Whenever we are tempted, we can say: \"In the holy name of Jesus, I reject the evil spirits of [name the temptation]. I reject them; I renounce them; I rebuke them. In Jesus' holy name, I cast them out!\" I have personally found it helpful. I suspect others would as well."
    ]
  },
  {
    "id": "diary-215",
    "number": "Diary #215",
    "title": "Demons Cast Out by the Saints",
    "date": "Nov 12, 2022",
    "author": "Msgr. Stephen Rossetti",
    "paragraphs": [
      "[The Forerunners of Christ with Saints and Martyrs, Fra Angelica, 1420s]",
      "Our exorcist began to pray over a possessed woman. But at the very beginning of the session, the demons spontaneously shouted, \"Charbel, you stay away from me!\" The team had not yet been invoking the saints, or St. Charbel by name, so they were surprised he showed up. They were also surprised the demons admitted it. Moments later, as the Litany of the Saints ensued, the demons shouted again and again: \"Not that name! Not that name!\" This demonic reaction was unusual. Clearly something was up.",
      "An astute exorcist discerns what is working in a session and adjusts the prayers accordingly. The exorcist was initially skeptical, as he should be, and careful not to be deceived by the demons. But as the session continued, it was becoming apparent that these and many other saints were indeed coming to help. Their holiness and intercession were visibly torturing the demons.",
      "Normally, the Litany of the Saints is part of the opening of an exorcism session. Then the exorcist moves quickly into what are thought to be \"more important\" prayers. However, in this case, the exorcist adjusted his normal routine and stayed with the Litany of the Saints for hours, making it the bulk of the sessions.",
      "Also he had dozens of first class relics of the saints at his fingertips. As the exorcist prayed each name, he laid the corresponding relic of the saint on the afflicted person's forehead. With each relic and invocation of a saint, the demons howled in agony.",
      "The three consecutive days of intensive exorcism sessions were focused on and filled with hours of invoking the saints. Again and again, the demons shouted, \"Not that name! Not that name!\" St. Patrick. St. Rose of Lima. St. Maximillian Kolbe, The 12 Apostles. St. Margaret Mary Alacoque. Blessed Michael McGivney. St. Lawrence. Blessed Conchita. St. Teresa and the Carmelite saints. St. Catherine of Alexandria. St. John Eudes. And more.",
      "On day two, the demons began to manifest their leaving. The afflicted woman started coughing up a white frothy foam. The demonic screaming reached a crescendo followed by a kind of demonic \"explosion.\" Then she came back to herself. Again and again, as each set of demons left, there was coughing up of foam, a crescendo and explosion, followed by a moment of calm with the person returning to her conscious self.",
      "Finally, at the end of day three, the exorcist invoked the special intercession of the Virgin Mary. This time, after the demonic explosion, a peace came over the woman and filled the entire room. She came back to herself and said, \"It's over.\" She said that a great weight had been lifted and the demons were gone. Subsequent discernment continues to confirm that the demonic possession had ended.",
      "Each possession and each path to liberation is always somewhat unique. In this case, the exorcist believes that the Lord was teaching him and the team the importance of the communion of the saints and their powerful intercession. Moreover, he said, \"It taught me that every part of the Rite is exorcistic, not just the imprecatory prayers that command the demons to leave.\"",
      "Now the exorcist does not fail to value the prayers which invoke the powerful intercession of the saints. Nor should we."
    ]
  },
  {
    "id": "diary-216",
    "number": "Diary #216",
    "title": "Demons Retaliate Against the Saints",
    "date": "Nov 19, 2022",
    "author": "Msgr. Stephen Rossetti",
    "paragraphs": [
      "[Reliquary with a theca inside containing a relic of the True Cross.]",
      "Last week, I related how powerful the Litany of the Saints was when used in a recent exorcism. The results were astounding and led to the quick liberation of a possessed young woman. As each saint was invoked and the first class relic of the saint was placed on the afflicted person's forehead, the demons kept shouting, \"Not that name! Not that name!\" They howled in agony and were quickly expelled.",
      "Less than a week later one of our exorcists, who is also the pastor of a parish, put out a handful of relics of the saints for veneration in his church. For many years without incident, he has followed this practice in the month of November, the month when we venerate All Saints. But this year, the relics were stolen.",
      "The security cameras show that a woman in a dark coat sat in front of the relics for some time. Then as she approached the relics, the security camera tape went inexplicably blank for five and one-half minutes. The tape subsequently shows that the reliquaries in which the relics were housed were opened and the relics (the thecas) were stolen while the reliquaries themselves were not.",
      "One might first presume that it was a case of a simple robbery. But the reliquaries were not stolen and most likely they would be the object of a robbery. Who would steal a little piece of the bone or blood of a saint and leave behind a somewhat ornate reliquary? Moreover, the security cameras went blank precisely as she was apparently stealing them.",
      "While we do not want to jump to conclusions, it seems more than likely that this was an intentional act to steal the sacred remains of the saints, and not a simple robbery. Also, the \"malfunction\" of the security camera at precisely the time of the robbery suggests that demons were directly involved in the act. It is highly unlikely she could have pulled off such a technical feat, but it would be simple task for demons. And if demons were involved, then this woman was likely acting at the behest of Satan. She is probably a minion of the Evil One.",
      "Our response? We pray for the conversion and salvation of her soul. We also pray that these holy objects will be returned. This retaliation of the Evil One against the saints only reaffirms our conviction of the importance of the saints in the battle against evil. In the days ahead, the Litany of the Saints and the relics of the saints will hold a place of great importance for us in our exorcisms."
    ]
  },
  {
    "id": "diary-249",
    "number": "Diary #249",
    "title": "Demons Hate St. Benedict Medal",
    "date": "Jul 15, 2023",
    "author": "Msgr. Stephen Rossetti",
    "paragraphs": [
      "One of our afflicted persons was having problems communicating on her phone. So, we suggested she put a sticker with an image of the Medal of St. Benedict and attach it to her phone. She said she put the sticker on the phone and when she tried to pick up the phone, it burned. She could hardly hold it. Similarly, during one of our exorcism sessions a few weeks ago, a crucifix on the wall loudly snapped and the Benedictine medal on it flew off the wall and crashed on the ground.",
      "It is very clear that the demons hate this medal. Practitioners of magic invoke talismans and magic formulas. We do neither of these. The power of the medal does not come from an inherent power in the medal itself. Rather, it invokes the authority of the Church and the intercession of St. Benedict, who is the patron of exorcisms. It includes ancient exorcistic prayers of the Church.",
      "For many years, the meaning of the letters on the medal was lost. In 1647, a manuscript, dated 1415, was found in a monastery in Bavaria which explained the symbols. The letters around the outside of the medal are: V.R.S.N.S.M.V.—S.M.Q.L.I.V.B. Vade Retro Satana, Nunquam Suade Mihi Vana; Sunt Mala Quae Libas, Ipse Venena Bibas. Begone Satan! Never tempt me with your vanities!",
      "What you offer me is evil. Drink the poison yourself!",
      "The Benedictine medal is the only sacramental I am aware of that actually includes an exorcism on it. And very clearly, it has a powerful effect on the demonic. Many of us in this ministry puts stickers with the symbol of the Benedictine medal on our phones and computers. When using our electronic devices, we have had more than a little demonic harassment. Also, we often use a crucifix with a Benedictine medal on it during our exorcisms. We encourage our laity to use these medals as well.",
      "St. Benedict, patron of exorcisms, pray for us!"
    ]
  },
  {
    "id": "diary-demonic-hour",
    "number": "Exorcist Diary",
    "title": "The Demonic Hour",
    "date": "Mar 29, 2023",
    "author": "Msgr. Stephen Rossetti",
    "paragraphs": [
      "James complained of demonic attacks. One fact especially caught my attention. I asked, “What time do they occur?” He responded, “3 am.” I thought, “Ahhh, the demonic hour.”",
      "To discern if someone is possessed, we look for the well-known major signs such as occult knowledge, superhuman strength, knowledge of unknown languages, and aversion to the sacred. But many times these classic signs do not appear until much later. In the beginning, we are attuned to more subtle signs that typically accompany the possessed, such as the characteristics of the alleged demonic attacks.",
      "Satan hates Jesus. The Evil One mocks Jesus at every turn, inverting sacred signs and truths. Jesus died on the cross at 3 pm. Jesus called it, “My hour.” In the Satanic inversion, Satan claims 3 am as his hour. We find some of the most intense Satanic attacks on the possessed occur at that time. It is likely that, at 3 am, he is at his greatest strength.",
      "Carey, too, was possessed. She also described intense demonic attacks at 3 am. As the lengthy process of her exorcism continued, she was losing strength and we feared she would not be able to hold up. We were more than concerned. The demons were pummeling her at 3 am. So, we decided to start praying with her at 2:30 am.",
      "In addition to giving her some relief, I wanted to attack the demons at their strength. They previously controlled the night. Now, with these night sessions, we were on the offensive. For some weeks, the Team gathered at 2:30 am. Carey said, “It did fend the demons off a little bit and gave me some peaceful nights after the 3 am hour.” At this stage, her getting some sleep was critical.",
      "Eventually, the demons realized that we would not stop praying at 2:30 am. So, they started attacking her at 1 am. I was surprised it took them so long to adjust. I think they were very surprised we would wake in the middle of the night to help this young woman. They probably figured we would eventually give up; but we did not. In their narcissistic world, they cannot comprehend the idea of charity and self-giving. And since the demons started attacking her at 1 am, we then began to gather at 12:30 am (the Team was happy to pray earlier!). So, the cat and mouse tactics continued. Happily, Carey eventually made it to the end and is now liberated.",
      "I see many signs of the Satanic inversion in our world today, especially in people’s thinking, although often not recognized. For example, Satanists claim to offer freedom from “tyrannical religious authority,” but it is Satan who enslaves. They claim to promote human dignity and fulfillment, but Satan is the destroyer of humanity. Some witches claim that their spells are really the same as Christian prayers, but the only result of any magic spell is a curse. In Jesus is true freedom and the fullness of human potential. In true Christianity, we find real grace and wonderful blessings.",
      "Be on guard against Satanic inversions. Whenever you hear one, say a simple prayer: “May the light of the Holy Spirit come upon us all and reveal Him who is the Truth.”"
    ]
  },
  {
    "id": "diary-angelic-powers",
    "number": "Exorcist Diary",
    "title": "Angelic Powers in an Exorcism",
    "date": "Jun 4, 2023",
    "author": "Msgr. Stephen Rossetti",
    "paragraphs": [
      "One of our afflicted persons has been particularly violent in sessions and needs strong restraints. At one point, he managed to break free and started to swing his arms wildly. The exorcist was justly alarmed and prayed aloud: “I ask the holy angels to restrain this man until we can secure him!” Immediately, his arms dropped to his side and remained motionless until he was restrained again. After being restrained, he again began to thrash, but was safely secured.",
      "A particularly gifted individual told us that we have at least one angel from the angelic ranks of Powers at each of our exorcism sessions. Of the nine choirs of angels, the Powers are of the middle rank, higher than guardian angels, and they “order how what has been commanded [by God] … be carried out by others” including protecting from evil spirits. She said we have had up to eight angelic Powers present in a single session, depending on the size of the demonic cohort.",
      "At one point, we addressed these angelic Powers as “warrior angels” and we were given to understand that they prefer to be addressed as “defenders.” It is demons who are the aggressors; God’s holy angels are defending against these evil attacks. These Powers are naturally “all strong-willed and very protective” in the best sense. When given a vision of these powerful angels, they appear muscular, strong, imposing, and somewhat taller than a guardian angel.",
      "Their role is to protect what belongs to God and to keep out other demons that try to enter. Thus, in our exorcism sessions we explicitly pray for them to surround us and protect us. They are also actively involved in casting out the demons. For their weapons, they typically appear with lances or swords that are “the sword of the Spirit which is the Word of God” or Jesus Christ (Eph 6:17).",
      "Exorcists should invoke their assistance at every session. We have been doing this explicitly with great effect using the St. Michael prayer (“St. Michael the Archangel defend us in battle…”) as well as the Breastplate of St. Patrick. When it comes to the section in the Breastplate: “I bind N. today to the virtue of ranks of Cherubim, in obedience of Angels, [in service of Archangels],” the Exorcist repeats this phrase many times, imploring the help of God’s heavenly army.",
      "Exorcists tend to focus on the presence of demons in an exorcism since their ministry is directly to cast them out. However, good angels are present in every exorcism and their unseen presence is vital, and a consolation."
    ]
  }
];
