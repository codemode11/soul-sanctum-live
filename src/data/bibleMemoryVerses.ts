export interface BibleFlashcard {
  id: string;
  title: string;
  reference: string;
  text: string;
  translation?: string;
  notes?: string;
  category: 'Kingdom and Eternity' | 'Wisdom and Word' | 'Protection and Trust' | 'Humility and Service' | 'Faith and Salvation' | 'Prayer and Praise' | 'Vigilance and Perseverance';
  difficulty: 'short' | 'medium' | 'passage';
}

export const BIBLE_MEMORY_VERSES: BibleFlashcard[] = [
  {
    id: 'col-3-1-2',
    title: 'Seek the things that are above',
    reference: 'Colossians 3:1-2',
    text: 'If then you have been raised with Christ, seek the things that are above, where Christ is, seated at the right hand of God. Set your minds on things that are above, not on things that are on earth.',
    translation: 'English Standard Version (ESV)',
    category: 'Kingdom and Eternity',
    difficulty: 'short'
  },
  {
    id: 'mt-6-33',
    title: 'Seek first the kingdom of God',
    reference: 'Matthew 6:33',
    text: 'But seek first the kingdom of God and his righteousness, and all these things will be added to you.',
    translation: 'English Standard Version Catholic Edition (Augustine Institute)',
    category: 'Kingdom and Eternity',
    difficulty: 'short'
  },
  {
    id: 'phil-3-20',
    title: 'Citizens of heaven',
    reference: 'Philippians 3:20',
    text: 'But our citizenship is in heaven, and from it we also await a savior, the Lord Jesus Christ.',
    translation: 'New American Bible Revised Edition (NABRE)',
    notes: 'Citizenship: Christians constitute a colony of heaven, as Philippi was a colonia of Rome (Acts 16:12). The hope Paul expresses involves the final coming of Christ, not a status already attained.',
    category: 'Kingdom and Eternity',
    difficulty: 'short'
  },
  {
    id: 'jn-14-1-12',
    title: 'In the Father’s house',
    reference: 'John 14:1-12',
    text: 'Jesus said to his disciples: “Do not let your hearts be troubled. You have faith in God; have faith also in me. In my Father’s house there are many dwelling places. If there were not, would I have told you that I am going to prepare a place for you? And if I go and prepare a place for you, I will come back again and take you to myself, so that where I am you also may be. Where I am going you know the way.”\nThomas said to him, “Master, we do not know where you are going; how can we know the way?” Jesus said to him, “I am the way and the truth and the life. No one comes to the Father except through me. If you know me, then you will also know my Father. From now on you do know him and have seen him.”\nThe words that I speak to you I do not speak on my own. The Father who dwells in me is doing his works. Believe me that I am in the Father and the Father is in me, or else, believe because of the works themselves. Amen, amen, I say to you, whoever believes in me will do the works that I do, and will do greater ones than these, because I am going to the Father.”',
    translation: 'New American Bible Revised Edition (NABRE)',
    category: 'Kingdom and Eternity',
    difficulty: 'passage'
  },
  {
    id: 'wis-6-12-16',
    title: 'Wisdom is found by those who seek her',
    reference: 'Wisdom 6:12-16',
    text: 'Resplendent and unfading is wisdom, and she is readily perceived by those who love her, and found by those who seek her. She hastens to make herself known in anticipation of their desire; Whoever watches for her at dawn shall not be disappointed, for he shall find her sitting by his gate. For taking thought of wisdom is the perfection of prudence, and whoever for her sake keeps vigil shall quickly be free from care; because she makes her own rounds, seeking those worthy of her, and graciously appears to them in the ways, and meets them with all solicitude.',
    translation: 'Catholic Scripture (Wisdom of Solomon)',
    category: 'Wisdom and Word',
    difficulty: 'passage'
  },
  {
    id: 'ps-23',
    title: 'The Lord is my Shepherd',
    reference: 'Psalm 23:1-6',
    text: 'The LORD is my shepherd; I shall not want. In verdant pastures he gives me repose. Beside restful waters he leads me; he refreshes my soul. He guides me in right paths for his name’s sake. You spread the table before me in the sight of my foes; you anoint my head with oil; my cup overflows. Only goodness and kindness follow me all the days of my life; and I shall dwell in the house of the LORD for years to come.',
    translation: 'The Book of Psalms (NABRE)',
    category: 'Protection and Trust',
    difficulty: 'passage'
  },
  {
    id: 'mt-25-31-46',
    title: 'Whatever you did for one of the least brothers of mine, you did for me',
    reference: 'Matthew 25:31-46',
    text: 'Jesus said to his disciples: “When the Son of Man comes in his glory, and all the angels with him, he will sit upon his glorious throne, and all the nations will be assembled before him. And he will separate them one from another, as a shepherd separates the sheep from the goats. He will place the sheep on his right and the goats on his left.\nThen the king will say to those on his right, ‘Come, you who are blessed by my Father. Inherit the kingdom prepared for you from the foundation of the world. For I was hungry and you gave me food, I was thirsty and you gave me drink, a stranger and you welcomed me, naked and you clothed me, ill and you cared for me, in prison and you visited me.’\nThen the righteous will answer him and say, ‘Lord, when did we see you hungry and feed you, or thirsty and give you drink? When did we see you a stranger and welcome you, or naked and clothe you? When did we see you ill or in prison, and visit you?’ And the king will say to them in reply, ‘Amen, I say to you, whatever you did for one of the least brothers of mine, you did for me.’\nThen he will say to those on his left, ‘Depart from me, you accursed, into the eternal fire prepared for the devil and his angels. For I was hungry and you gave me no food, I was thirsty and you gave me no drink, a stranger and you gave me no welcome, naked and you gave me no clothing, ill and in prison, and you did not care for me.’\nThen they will answer and say, ‘Lord, when did we see you hungry or thirsty or a stranger or naked or ill or in prison, and not minister to your needs?’ He will answer them, ‘Amen, I say to you, what you did not do for one of these least ones, you did not do for me.’ And these will go off to eternal punishment, but the righteous to eternal life.”',
    translation: 'The Holy Gospel according to Matthew (NABRE)',
    category: 'Humility and Service',
    difficulty: 'passage'
  },
  {
    id: '2-pt-3-8-14',
    title: 'The day of the Lord will come like a thief',
    reference: '2 Peter 3:8-14',
    text: 'But do not ignore this one fact, beloved, that with the Lord one day is like a thousand years and a thousand years like one day. The Lord does not delay his promise, as some regard “delay,” but he is patient with you, not wishing that any should perish but that all should come to repentance. But the day of the Lord will come like a thief, and then the heavens will pass away with a mighty roar and the elements will be dissolved by fire, and the earth and everything done on it will be found out. Since everything is to be dissolved in this way, what sort of persons ought you to be, conducting yourselves in holiness and devotion, waiting for and hastening the coming of the day of God, because of which the heavens will be dissolved in flames and the elements melted by fire. But according to his promise we await new heavens and a new earth in which righteousness dwells. Therefore, beloved, since you await these things, be eager to be found without spot or blemish before him, at peace.',
    translation: 'Second Epistle of Saint Peter (NABRE)',
    category: 'Vigilance and Perseverance',
    difficulty: 'passage'
  },
  {
    id: '1-thes-5-16-24',
    title: 'Rejoice always. Pray without ceasing.',
    reference: '1 Thessalonians 5:16-24',
    text: 'Rejoice always. Pray without ceasing. In all circumstances give thanks, for this is the will of God for you in Christ Jesus. Do not quench the Spirit. Do not despise prophetic utterances. Test everything; retain what is good. Refrain from every kind of evil. May the God of peace make you perfectly holy and may you entirely, spirit, soul, and body, be preserved blameless for the coming of our Lord Jesus Christ. The one who calls you is faithful, and he will also accomplish it.',
    translation: 'First Epistle of Saint Paul to the Thessalonians',
    category: 'Prayer and Praise',
    difficulty: 'medium'
  },
  {
    id: 'ps-121-7-8',
    title: 'Divine protection',
    reference: 'Psalm 121:7-8',
    text: 'The LORD will guard you from all evil; he will guard your soul. The LORD will guard your coming and going both now and forever.',
    translation: 'The Book of Psalms',
    category: 'Protection and Trust',
    difficulty: 'short'
  },
  {
    id: '1-jn-2-5',
    title: 'The love of God is perfected in him who keeps his word',
    reference: '1 John 2:5',
    text: 'But whoever keeps his word, the love of God is truly perfected in him.',
    translation: 'First Epistle of Saint John',
    category: 'Wisdom and Word',
    difficulty: 'short'
  },
  {
    id: '1-thes-2-13',
    title: 'The word of God at work in believers',
    reference: '1 Thessalonians 2:13',
    text: 'And for this reason we too give thanks to God unceasingly, that, in receiving the word of God from hearing us, you received not a human word but, as it truly is, the word of God, which is now at work in you who believe.',
    translation: 'First Epistle to the Thessalonians',
    category: 'Wisdom and Word',
    difficulty: 'short'
  },
  {
    id: 'ez-34-11',
    title: 'The Good Shepherd',
    reference: 'Ezekiel 34:11',
    text: 'For thus says the Lord GOD: I myself will look after and tend my sheep.',
    translation: 'Prophecy of Ezekiel',
    category: 'Protection and Trust',
    difficulty: 'short'
  },
  {
    id: 'heb-4-12',
    title: 'The living word of God',
    reference: 'Hebrews 4:12',
    text: 'Indeed, the word of God is living and effective, sharper than any two-edged sword, penetrating even between soul and spirit, joints and marrow.',
    translation: 'Epistle to the Hebrews',
    category: 'Wisdom and Word',
    difficulty: 'short'
  },
  {
    id: '1-cor-1-8',
    title: 'God’s help',
    reference: '1 Corinthians 1:8',
    text: 'He will keep you firm to the end, irreproachable on the day of our Lord Jesus Christ.',
    translation: 'First Epistle to the Corinthians',
    category: 'Protection and Trust',
    difficulty: 'short'
  },
  {
    id: 'mt-24-42',
    title: 'Eternal vigilance',
    reference: 'Matthew 24:42',
    text: '“Stay awake! For you do not know on which day your Lord will come.”',
    translation: 'The Holy Gospel of Jesus Christ',
    category: 'Vigilance and Perseverance',
    difficulty: 'short'
  },
  {
    id: 'sir-3-17-18-20-21',
    title: 'Practicing humility',
    reference: 'Sirach 3:17-18, 20-21',
    text: 'My son, conduct your affairs with humility, and you will be loved more than a giver of gifts. Humble yourself the more, the greater you are, and you will find mercy in the sight of God. For great is the power of the Lord; by the humble he is glorified. What is too sublime for you, seek not, into things beyond your strength search not.',
    translation: 'Book of Sirach (Ecclesiasticus)',
    category: 'Humility and Service',
    difficulty: 'medium'
  },
  {
    id: 'lk-14-10-14',
    title: 'Seek the lowest place',
    reference: 'Luke 14:10-14',
    text: 'Rather, when you are invited, go and take the lowest place so that when the host comes to you he may say, ‘My friend, move up to a higher position.’ Then you will enjoy the esteem of your companions at the table. For everyone who exalts himself will be humbled, but the one who humbles himself will be exalted.” Then he said to the host who invited him, “When you hold a lunch or a dinner, do not invite your friends or your brothers or your relatives or your wealthy neighbors, in case they may invite you back and you have repayment. Rather, when you hold a banquet, invite the poor, the crippled, the lame, the blind; blessed indeed will you be because of their inability to repay you. For you will be repaid at the resurrection of the righteous.”',
    translation: 'The Holy Gospel according to Luke',
    category: 'Humility and Service',
    difficulty: 'passage'
  },
  {
    id: 'lk-4-39',
    title: 'Rebuking illnesses',
    reference: 'Luke 4:39',
    text: 'He stood over her, rebuked the fever, and it left her.',
    translation: 'The Holy Gospel according to Luke',
    category: 'Protection and Trust',
    difficulty: 'short'
  },
  {
    id: '1-cor-4-1',
    title: 'Servants and stewards',
    reference: '1 Corinthians 4:1',
    text: 'Thus should one regard us: as servants of Christ and stewards of the mysteries of God.',
    translation: 'First Epistle to the Corinthians',
    category: 'Humility and Service',
    difficulty: 'short'
  },
  {
    id: 'lk-6-3-5',
    title: 'Lord of the sabbath',
    reference: 'Luke 6:3-5',
    text: '“Have you not read what David did when he and those who were with him were hungry? How he went into the house of God, took the bread of offering, which only the priests could lawfully eat, ate of it, and shared it with his companions?” Then he said to them, “The Son of Man is lord of the sabbath.”',
    translation: 'The Holy Gospel according to Luke',
    category: 'Kingdom and Eternity',
    difficulty: 'medium'
  },
  {
    id: 'psa-90-12',
    title: 'Help us to number our days',
    reference: 'Psalm 90:12',
    text: 'Teach us to number our days aright . . . So teach us to consider our mortality, so that we might live wisely.',
    translation: 'NET 2 / Catholic Psalter',
    category: 'Wisdom and Word',
    difficulty: 'short'
  },
  {
    id: 'psa-90-17',
    title: 'Prosper the work of our hands',
    reference: 'Psalm 90:17',
    text: 'And may the gracious care of the LORD our God be ours; prosper the work of our hands for us! Prosper the work of our hands!',
    translation: 'The Book of Psalms',
    category: 'Prayer and Praise',
    difficulty: 'short'
  },
  {
    id: 'psa-119-125',
    title: 'Discernment to know God’s decrees',
    reference: 'Psalm 119:125',
    text: 'I am your servant; give me discernment that I may know your decrees.',
    translation: 'The Book of Psalms',
    category: 'Wisdom and Word',
    difficulty: 'short'
  },
  {
    id: 'ps-117-2',
    title: 'The Lord’s kindness and faithfulness',
    reference: 'Psalm 117:2',
    text: 'For steadfast is his kindness toward us, and the fidelity of the LORD endures forever.',
    translation: 'The Book of Psalms',
    category: 'Prayer and Praise',
    difficulty: 'short'
  },
  {
    id: '1-thes-5-16-18',
    title: 'Rejoice always',
    reference: '1 Thessalonians 5:16-18',
    text: 'Rejoice always, pray without ceasing, give thanks in all circumstances; for this is the will of God in Christ Jesus for you.',
    translation: 'English Standard Version (ESV)',
    category: 'Prayer and Praise',
    difficulty: 'short'
  },
  {
    id: 'lk-11-9-10',
    title: 'Ask and you will receive',
    reference: 'Luke 11:9-10',
    text: '“And I tell you, ask and you will receive; seek and you will find; knock and the door will be opened to you. For everyone who asks, receives; and the one who seeks, finds; and to the one who knocks, the door will be opened.”',
    translation: 'The Holy Gospel according to Luke',
    category: 'Prayer and Praise',
    difficulty: 'medium'
  },
  {
    id: 'eph-6-10-17',
    title: 'Put on the armor of God',
    reference: 'Ephesians 6:10-17',
    text: 'Finally, draw your strength from the Lord and from his mighty power. Put on the armor of God so that you may be able to stand firm against the tactics of the devil. For our struggle is not with flesh and blood but with the principalities, with the powers, with the world rulers of this present darkness, with the evil spirits in the heavens. Therefore, put on the armor of God, that you may be able to resist on the evil day and, having done everything, to hold your ground. So stand fast with your loins girded in truth, clothed with righteousness as a breastplate, and your feet shod in readiness for the gospel of peace. In all circumstances, hold faith as a shield, to quench all [the] flaming arrows of the evil one. And take the helmet of salvation and the sword of the Spirit, which is the word of God.',
    translation: 'Epistle of Saint Paul to the Ephesians',
    notes: 'Paul describes the Christian in terms of the dress and equipment of Roman soldiers (truth, righteousness, peace, faith, salvation, and the word of God).',
    category: 'Protection and Trust',
    difficulty: 'passage'
  },
  {
    id: 'eph-1-13-14',
    title: 'Sealed with the Holy Spirit',
    reference: 'Ephesians 1:13-14',
    text: 'In him you also, who have heard the word of truth, the Gospel of your salvation, and have believed in him, were sealed with the promised Holy Spirit, which is the first installment of our inheritance toward redemption as God’s possession, to the praise of his glory.',
    translation: 'Epistle of Saint Paul to the Ephesians',
    notes: 'Sealed: by God in baptism and confirmation. First installment: down payment by God on eternal salvation.',
    category: 'Faith and Salvation',
    difficulty: 'medium'
  },
  {
    id: 'ex-17-11-13',
    title: 'Constancy and perseverance',
    reference: 'Exodus 17:11-13',
    text: 'As long as Moses kept his hands raised up, Israel had the better of the fight, but when he let his hands rest, Amalek had the better of the fight. Moses\' hands, however, grew tired; so they put a rock in place for him to sit on. Meanwhile Aaron and Hur supported his hands, one on one side and one on the other, so that his hands remained steady till sunset. And Joshua mowed down Amalek and his people with the edge of the sword.',
    translation: 'The Book of Exodus',
    category: 'Vigilance and Perseverance',
    difficulty: 'medium'
  },
  {
    id: '2-ti-3-16-17',
    title: 'Divine inspiration of Sacred Scriptures',
    reference: '2 Timothy 3:16-17',
    text: 'All Scripture is inspired by God and is useful for teaching, for refutation, for correction, and for training in righteousness, so that one who belongs to God may be competent, equipped for every good work.',
    translation: 'Second Epistle of Saint Paul to Timothy',
    category: 'Wisdom and Word',
    difficulty: 'short'
  },
  {
    id: 'lk-1-28',
    title: 'The Angelic Salutation',
    reference: 'Luke 1:28',
    text: 'And the angel being come in, said unto her: Hail, full of grace, the Lord is with thee: blessed art thou among women.',
    translation: 'The Annunciation of the Blessed Virgin Mary',
    category: 'Faith and Salvation',
    difficulty: 'short'
  },
  {
    id: '1-thes-5-21-22',
    title: 'Test everything',
    reference: '1 Thessalonians 5:21-22',
    text: 'Test everything. Hold on to the good. Avoid every kind of evil.',
    translation: 'First Epistle to the Thessalonians',
    category: 'Wisdom and Word',
    difficulty: 'short'
  },
  {
    id: '2-th-2-16-17',
    title: 'Blessing and encouragement',
    reference: '2 Thessalonians 2:16–17',
    text: 'May our Lord Jesus Christ himself and God our Father, who has loved us and given us eternal encouragement and good hope by grace, encourage your hearts and strengthen you in every good work and word.',
    translation: 'Christian Standard Bible (CSB)',
    category: 'Prayer and Praise',
    difficulty: 'short'
  },
  {
    id: 'lk-17-21',
    title: 'The Kingdom of God is within you',
    reference: 'Luke 17:21',
    text: 'For behold, the kingdom of God is within you. For you see, the kingdom of God is in your midst.',
    translation: 'The Holy Gospel according to Luke',
    category: 'Kingdom and Eternity',
    difficulty: 'short'
  },
  {
    id: 'lk-21-28',
    title: 'Redemption is at hand',
    reference: 'Luke 21:28',
    text: 'But when these things begin to come to pass, look up and lift up your heads, because your redemption is at hand.',
    translation: 'The Holy Gospel according to Luke',
    category: 'Kingdom and Eternity',
    difficulty: 'short'
  },
  {
    id: 'lk-19-10',
    title: 'To seek and to save what was lost',
    reference: 'Luke 19:10',
    text: 'For the Son of Man has come to seek and to save what was lost.',
    translation: 'New American Bible Revised Edition (NABRE)',
    category: 'Faith and Salvation',
    difficulty: 'short'
  },
  {
    id: 'ac-17-28',
    title: 'In Him we live and have our being',
    reference: 'Acts 17:28',
    text: 'In Him we live and move and have our being.',
    translation: 'The Acts of the Apostles',
    category: 'Protection and Trust',
    difficulty: 'short'
  },
  {
    id: 'phil-4-19',
    title: 'Divine providence',
    reference: 'Philippians 4:19',
    text: 'And with all his abundant wealth through Christ Jesus, my God will supply all your needs.',
    translation: 'Epistle to the Philippians',
    category: 'Protection and Trust',
    difficulty: 'short'
  },
  {
    id: 'le-19-2',
    title: 'Be holy',
    reference: 'Leviticus 19:2 / 1 Peter 1:15-16',
    text: 'Speak to the whole Israelite community and tell them: Be holy, for I, the Lord your God, am holy. Just as he who called you is holy, so be holy in all you do; for it is written: “Be holy, because I am holy.”',
    translation: 'Leviticus and First Epistle of Saint Peter',
    category: 'Humility and Service',
    difficulty: 'short'
  },
  {
    id: 'heb-4-12-16',
    title: 'The living word of God and Throne of Grace',
    reference: 'Hebrews 4:12, 16',
    text: 'For the word of God is living and active, sharper than any two-edged sword, piercing to the division of soul and of spirit, of joints and of marrow, and discerning the thoughts and intentions of the heart. Let us then with confidence draw near to the throne of grace, that we may receive mercy and find grace to help in time of need.',
    translation: 'Epistle to the Hebrews',
    category: 'Wisdom and Word',
    difficulty: 'medium'
  },
  {
    id: 'ps-19-8-12',
    title: 'The ways of the Lord',
    reference: 'Psalm 19:8-12',
    text: 'The law of the LORD is perfect, refreshing the soul. The decree of the LORD is trustworthy, giving wisdom to the simple. The precepts of the LORD are right, rejoicing the heart. The command of the LORD is clear, enlightening the eye. The fear of the LORD is pure, enduring forever. The statutes of the LORD are true, all of them just; More desirable than gold, than a hoard of purest gold, Sweeter also than honey or drippings from the comb. By them your servant is warned; obeying them brings much reward.',
    translation: 'New American Bible Revised Edition (NABRE)',
    notes: 'Warned: the Hebrew verb means both to shine and to illuminate truth.',
    category: 'Wisdom and Word',
    difficulty: 'passage'
  },
  {
    id: 'mk-3-31-35',
    title: 'Whoever does the will of God, he is my brother and sister and mother',
    reference: 'Mark 3:31–35',
    text: 'And his mother and his brothers came, and standing outside they sent to him and called him. And a crowd was sitting around him, and they said to him, “Your mother and your brothers are outside, seeking you.” And he answered them, “Who are my mother and my brothers?” And looking about at those who sat around him, he said, “Here are my mother and my brothers! For whoever does the will of God, he is my brother and sister and mother.”',
    translation: 'The Holy Gospel according to Mark',
    category: 'Humility and Service',
    difficulty: 'medium'
  },
  {
    id: '1-cor-2-9',
    title: 'What God has prepared for those who love him',
    reference: '1 Corinthians 2:9',
    text: 'But, as it is written, “What no eye has seen, nor ear heard, nor the heart of man imagined, what God has prepared for those who love him.”',
    translation: 'English Standard Version Catholic Edition (ESV-CE)',
    category: 'Kingdom and Eternity',
    difficulty: 'short'
  },
  {
    id: 'mt-6-19-21',
    title: 'Store up riches in heaven',
    reference: 'Matthew 6:19-21',
    text: '“Do not store up for yourselves treasures on earth, where moth and rust consume and where thieves break in and steal; but store up for yourselves treasures in heaven, where neither moth nor rust consumes and where thieves do not break in and steal. For where your treasure is, there your heart will be also.”',
    translation: 'New Revised Standard Version Catholic Edition (NRSV-CE)',
    category: 'Kingdom and Eternity',
    difficulty: 'medium'
  },
  {
    id: '1-pe-3-15',
    title: 'Readiness to defend the Faith',
    reference: '1 Peter 3:15',
    text: 'Always be prepared to make a defense to any one who calls you to account for the hope that is in you, yet do it with gentleness and reverence.',
    translation: 'First Epistle of Saint Peter',
    category: 'Faith and Salvation',
    difficulty: 'short'
  },
  {
    id: 'jn-20-29',
    title: 'Blessed faith',
    reference: 'John 20:29',
    text: 'Jesus said to him, “Have you come to believe because you have seen me? Blessed are those who have not seen and have believed.”',
    translation: 'The Holy Gospel according to John',
    category: 'Faith and Salvation',
    difficulty: 'short'
  },
  {
    id: 'mk-11-24',
    title: 'Believe that you have received it',
    reference: 'Mark 11:24',
    text: '“Therefore I tell you, whatever you ask in prayer, believe that you have received it, and it will be yours.”',
    translation: 'The Holy Gospel according to Mark',
    category: 'Prayer and Praise',
    difficulty: 'short'
  },
  {
    id: 'col-3-16',
    title: 'Immersing in the Lord’s words',
    reference: 'Colossians 3:16',
    text: 'Let the word of Christ dwell in you richly, teaching and admonishing one another in all wisdom, singing psalms and hymns and spiritual songs, with thankfulness in your hearts to God.',
    translation: 'Epistle of Saint Paul to the Colossians',
    category: 'Wisdom and Word',
    difficulty: 'short'
  },
  {
    id: 'ro-12-2',
    title: 'Discern the will of God',
    reference: 'Romans 12:2',
    text: 'Do not conform yourselves to this age but be transformed by the renewal of your mind, that you may discern what is the will of God, what is good and pleasing and perfect.',
    translation: 'Epistle to the Romans',
    category: 'Wisdom and Word',
    difficulty: 'short'
  },
  {
    id: 'mt-24-13',
    title: 'Endure to the end',
    reference: 'Matthew 24:13',
    text: 'But the one who perseveres to the end will be saved.',
    translation: 'The Holy Gospel according to Matthew',
    category: 'Vigilance and Perseverance',
    difficulty: 'short'
  },
  {
    id: 'heb-12-1-2',
    title: 'Persevere in running the race',
    reference: 'Hebrews 12:1–2',
    text: 'Therefore, since we are surrounded by so great a cloud of witnesses, let us rid ourselves of every burden and sin that clings to us and persevere in running the race that lies before us while keeping our eyes fixed on Jesus, the leader and perfecter of faith. For the sake of the joy that lay before him he endured the cross, despising its shame, and has taken his seat at the right of the throne of God.',
    translation: 'Epistle to the Hebrews',
    category: 'Vigilance and Perseverance',
    difficulty: 'medium'
  },
  {
    id: 'heb-4-16',
    title: 'Confidently approach the throne of grace',
    reference: 'Hebrews 4:16',
    text: 'So let us confidently approach the throne of grace to receive mercy and to find grace for timely help.',
    translation: 'Epistle to the Hebrews',
    category: 'Prayer and Praise',
    difficulty: 'short'
  },
  {
    id: '2-th-2-15',
    title: 'Hold fast to Sacred Tradition',
    reference: '2 Thessalonians 2:15',
    text: 'Therefore, brothers, stand firm and hold fast to the traditions that you were taught, either by an oral statement or by a letter of ours.',
    translation: 'Second Epistle of Saint Paul to the Thessalonians',
    category: 'Faith and Salvation',
    difficulty: 'short'
  },
  {
    id: 'ro-8-28-30',
    title: 'All things work for good for those who love God',
    reference: 'Romans 8:28–30',
    text: 'We know that all things work for good for those who love God, who are called according to his purpose. For those he foreknew he also predestined to be conformed to the image of his Son, so that he might be the firstborn among many brothers. And those he predestined he also called; and those he called he also justified; and those he justified he also glorified.',
    translation: 'Epistle of Saint Paul to the Romans',
    notes: 'Outlines the Christian vocation: to be conformed to the image of the Son. God redemptively cares for the salvation of all who love Him.',
    category: 'Protection and Trust',
    difficulty: 'medium'
  },
  {
    id: 'jas-3-13',
    title: 'Wisdom and works',
    reference: 'James 3:13',
    text: 'Who among you is wise and understanding? Let him show his works by a good life in the humility that comes from wisdom.',
    translation: 'Epistle of Saint James',
    category: 'Wisdom and Word',
    difficulty: 'short'
  },
  {
    id: 'lk-10-19-20',
    title: 'Rejoice for your names are written in heaven',
    reference: 'Luke 10:19–20',
    text: '“Behold, I have given you the power ‘to tread upon serpents’ and scorpions and upon the full force of the enemy and nothing will harm you. Nevertheless, do not rejoice because the spirits are subject to you, but rejoice because your names are written in heaven.”',
    translation: 'The Holy Gospel according to Luke',
    category: 'Kingdom and Eternity',
    difficulty: 'short'
  },
  {
    id: '2-pe-3-8',
    title: 'The divine sense of time',
    reference: '2 Peter 3:8',
    text: 'But do not ignore this one fact, beloved, that with the Lord one day is like a thousand years and a thousand years like one day.',
    translation: 'Second Epistle of Saint Peter',
    category: 'Kingdom and Eternity',
    difficulty: 'short'
  },
  {
    id: 'ro-12-12',
    title: 'Rejoice in hope',
    reference: 'Romans 12:12',
    text: 'Rejoice in hope, endure in affliction, persevere in prayer.',
    translation: 'Epistle to the Romans',
    category: 'Prayer and Praise',
    difficulty: 'short'
  },
  {
    id: 'ps-103-1',
    title: 'Bless the Lord, my soul',
    reference: 'Psalm 103:1',
    text: 'Bless the Lord, my soul; all my being, bless his holy name!',
    translation: 'The Book of Psalms',
    category: 'Prayer and Praise',
    difficulty: 'short'
  },
  {
    id: 'heb-11-1',
    title: 'Faith—the realization of what is hoped for',
    reference: 'Hebrews 11:1',
    text: 'Faith is the realization of what is hoped for and evidence of things not seen.',
    translation: 'Epistle to the Hebrews',
    category: 'Faith and Salvation',
    difficulty: 'short'
  },
  {
    id: 'je-31-33-34',
    title: 'I will be their God, and they shall be my people',
    reference: 'Jeremiah 31:33–34',
    text: '“But this is the covenant I will make with the house of Israel after those days—oracle of the Lord. I will place my law within them, and write it upon their hearts; I will be their God, and they shall be my people. They will no longer teach their friends and relatives, ‘Know the Lord!’ Everyone, from least to greatest, shall know me—oracle of the Lord—for I will forgive their iniquity and no longer remember their sin.”',
    translation: 'Prophecy of Jeremiah',
    category: 'Faith and Salvation',
    difficulty: 'medium'
  },
  {
    id: '1-th-5-17',
    title: 'Constant prayer',
    reference: '1 Thessalonians 5:17',
    text: 'Pray without ceasing.',
    translation: 'First Epistle to the Thessalonians',
    category: 'Prayer and Praise',
    difficulty: 'short'
  },
  {
    id: 'ro-2-5-8',
    title: 'God will repay everyone according to his works',
    reference: 'Romans 2:5–8',
    text: 'By your stubbornness and impenitent heart, you are storing up wrath for yourself for the day of wrath and revelation of the just judgment of God, who will repay everyone according to his works: eternal life to those who seek glory, honor, and immortality through perseverance in good works, but wrath and fury to those who selfishly disobey the truth and obey wickedness.',
    translation: 'Epistle to the Romans',
    category: 'Vigilance and Perseverance',
    difficulty: 'medium'
  },
  {
    id: 'mk-10-45',
    title: 'He gave his life as a ransom for many',
    reference: 'Mark 10:45',
    text: '“For the Son of Man did not come to be served but to serve and to give his life as a ransom for many.”',
    translation: 'The Holy Gospel according to Mark',
    category: 'Humility and Service',
    difficulty: 'short'
  },
  {
    id: 'ac-10-35',
    title: 'Whoever acts uprightly is acceptable to God',
    reference: 'Acts 10:35',
    text: 'Rather, in every nation whoever fears him and acts uprightly is acceptable to him.',
    translation: 'The Acts of the Apostles',
    category: 'Humility and Service',
    difficulty: 'short'
  },
  {
    id: 'ro-4-25',
    title: 'Christ was handed over for our transgressions',
    reference: 'Romans 4:25',
    text: '...who was handed over for our transgressions and was raised for our justification.',
    translation: 'Epistle to the Romans',
    category: 'Faith and Salvation',
    difficulty: 'short'
  },
  {
    id: 'col-3-4',
    title: 'Appearing with Christ in glory',
    reference: 'Colossians 3:4',
    text: 'When Christ your life appears, then you too will appear with him in glory.',
    translation: 'Epistle to the Colossians',
    category: 'Kingdom and Eternity',
    difficulty: 'short'
  },
  {
    id: '1-pe-2-9',
    title: 'A chosen race to announce his praises',
    reference: '1 Peter 2:9',
    text: 'But you are “a chosen race, a royal priesthood, a holy nation, a people of his own, so that you may announce the praises” of him who called you out of darkness into his wonderful light.',
    translation: 'First Epistle of Saint Peter',
    category: 'Faith and Salvation',
    difficulty: 'short'
  },
  {
    id: 'ac-2-42',
    title: 'The first Christians',
    reference: 'Acts 2:42',
    text: 'They devoted themselves to the teaching of the apostles and to the communal life, to the breaking of the bread and to the prayers.',
    translation: 'The Acts of the Apostles',
    category: 'Faith and Salvation',
    difficulty: 'short'
  },
  {
    id: 'lk-9-25',
    title: 'Gain eternity',
    reference: 'Luke 9:25',
    text: 'What profit is there for one to gain the whole world yet lose or forfeit himself?',
    translation: 'The Holy Gospel according to Luke',
    category: 'Kingdom and Eternity',
    difficulty: 'short'
  },
  {
    id: 'ac-4-12',
    title: 'To be saved by the name of Jesus',
    reference: 'Acts 4:12',
    text: 'There is no salvation through anyone else, nor is there any other name under heaven given to the human race by which we are to be saved.',
    translation: 'The Acts of the Apostles',
    category: 'Faith and Salvation',
    difficulty: 'short'
  },
  {
    id: 'lk-6-36-38',
    title: 'Your measure will in return be measured out to you',
    reference: 'Luke 6:36–38',
    text: 'Be merciful, just as also your Father is merciful. “Stop judging and you will not be judged. Stop condemning and you will not be condemned. Forgive and you will be forgiven. Give and gifts will be given to you; a good measure, packed together, shaken down, and overflowing, will be poured into your lap. For the measure with which you measure will in return be measured out to you.”',
    translation: 'The Holy Gospel according to Luke',
    category: 'Humility and Service',
    difficulty: 'medium'
  },
  {
    id: 'mt-13-52',
    title: 'Scribe of heaven',
    reference: 'Matthew 13:52',
    text: 'And he replied, “Then every scribe who has been instructed in the kingdom of heaven is like the head of a household who brings from his storeroom both the new and the old.”',
    translation: 'The Holy Gospel according to Matthew',
    category: 'Wisdom and Word',
    difficulty: 'short'
  },
  {
    id: 'lk-23-42',
    title: 'The prayer of St. Dismas',
    reference: 'Luke 23:42',
    text: 'Then he said, “Jesus, remember me when you come into your kingdom.”',
    translation: 'The Good Thief on the Cross',
    category: 'Prayer and Praise',
    difficulty: 'short'
  },
  {
    id: 'pr-2-6',
    title: 'The Lord gives wisdom',
    reference: 'Proverbs 2:6',
    text: 'For the Lord gives wisdom, from his mouth come knowledge and understanding;',
    translation: 'Book of Proverbs',
    category: 'Wisdom and Word',
    difficulty: 'short'
  },
  {
    id: 'ps-105-3',
    title: 'Glory in his holy name',
    reference: 'Psalm 105:3',
    text: 'Glory in his holy name; let hearts that seek the Lord rejoice!',
    translation: 'The Book of Psalms',
    category: 'Prayer and Praise',
    difficulty: 'short'
  },
  {
    id: '2-ti-4-7',
    title: 'I have kept the faith',
    reference: '2 Timothy 4:7',
    text: 'I have competed well; I have finished the race; I have kept the faith.',
    translation: 'Second Epistle of Saint Paul to Timothy',
    category: 'Vigilance and Perseverance',
    difficulty: 'short'
  },
  {
    id: 'ro-10-13',
    title: 'Call on the name of the Lord to be saved',
    reference: 'Romans 10:13',
    text: 'For “everyone who calls on the name of the Lord will be saved.”',
    translation: 'Epistle to the Romans',
    category: 'Faith and Salvation',
    difficulty: 'short'
  },
  {
    id: 'ps-124-8',
    title: 'Our help is in the name of the LORD',
    reference: 'Psalm 124:8',
    text: 'Our help is in the name of the LORD, who made heaven and earth.',
    translation: 'The Book of Psalms',
    category: 'Protection and Trust',
    difficulty: 'short'
  },
  {
    id: 'ac-2-17',
    title: 'I will pour out a portion of my spirit on all',
    reference: 'Acts 2:17',
    text: '“It will come to pass in the last days,” God says, “that I will pour out a portion of my spirit upon all flesh.”',
    translation: 'The Acts of the Apostles (Pentecost)',
    category: 'Kingdom and Eternity',
    difficulty: 'short'
  },
  {
    id: 're-3-5',
    title: 'The Lord will acknowledge the victor’s name',
    reference: 'Revelation 3:5',
    text: '“‘The victor will thus be dressed in white, and I will never erase his name from the book of life but will acknowledge his name in the presence of my Father and of his angels.’”',
    translation: 'Book of Revelation (NABRE)',
    notes: 'In white: sign of victory, joy, and resurrection. Book of life: the roll of the redeemed acknowledged by Christ before God.',
    category: 'Kingdom and Eternity',
    difficulty: 'short'
  },
  {
    id: 'lk-10-17-20',
    title: 'Return of the Seventy-two',
    reference: 'Luke 10:17–20',
    text: 'The seventy-two returned rejoicing, and said, “Lord, even the demons are subject to us because of your name.” Jesus said, “I have observed Satan fall like lightning from the sky. Behold, I have given you the power ‘to tread upon serpents’ and scorpions and upon the full force of the enemy and nothing will harm you. Nevertheless, do not rejoice because the spirits are subject to you, but rejoice because your names are written in heaven.”',
    translation: 'The Holy Gospel according to Luke',
    notes: 'The mission of the seventy-two symbolizes the gradual establishment of the Kingdom of God and defeat of evil.',
    category: 'Protection and Trust',
    difficulty: 'medium'
  },
  {
    id: '2-co-10-4-5',
    title: 'Our weapons can destroy fortresses',
    reference: '2 Corinthians 10:4–5',
    text: 'For the weapons of our battle are not of flesh but are enormously powerful, capable of destroying fortresses. We destroy arguments and every pretension raising itself against the knowledge of God, and take every thought captive in obedience to Christ.',
    translation: 'Second Epistle of Saint Paul to the Corinthians',
    category: 'Protection and Trust',
    difficulty: 'short'
  },
  {
    id: 'is-54-17',
    title: 'Every weapon fashioned against you shall fail',
    reference: 'Isaiah 54:17',
    text: 'Every weapon fashioned against you shall fail; every tongue that brings you to trial you shall prove false. This is the lot of the servants of the LORD, their vindication from me—oracle of the LORD.',
    translation: 'Prophecy of Isaiah',
    category: 'Protection and Trust',
    difficulty: 'short'
  },
  {
    id: 'ps-91',
    title: 'Security Under God’s Protection',
    reference: 'Psalm 91:1-16',
    text: 'You who dwell in the shelter of the Most High, who abide in the shade of the Almighty, Say to the LORD, “My refuge and fortress, my God in whom I trust.” He will rescue you from the fowler’s snare, from the destroying plague, He will shelter you with his pinions, and under his wings you may take refuge; his faithfulness is a protecting shield. You shall not fear the terror of the night nor the arrow that flies by day, Nor the pestilence that roams in darkness, nor the plague that ravages at noon. Though a thousand fall at your side, ten thousand at your right hand, near you it shall not come. You need simply watch; the punishment of the wicked you will see. Because you have the LORD for your refuge and have made the Most High your stronghold, No evil shall befall you, no affliction come near your tent. For he commands his angels with regard to you, to guard you wherever you go. With their hands they shall support you, lest you strike your foot against a stone. You can tread upon the asp and the viper, trample the lion and the dragon. Because he clings to me I will deliver him; because he knows my name I will set him on high. He will call upon me and I will answer; I will be with him in distress; I will deliver him and give him honor. With length of days I will satisfy him, and fill him with my saving power.',
    translation: 'New American Bible Revised Edition (NABRE)',
    notes: 'A sublime prayer of refuge in the Lord. Outstretched wings of the cherubim protect those who take refuge in the Most High.',
    category: 'Protection and Trust',
    difficulty: 'passage'
  },
  {
    id: 'jas-4-7-8',
    title: 'Draw near to God, and he will draw near to you',
    reference: 'James 4:7–8',
    text: 'So submit yourselves to God. Resist the devil, and he will flee from you. Draw near to God, and he will draw near to you.',
    translation: 'Epistle of Saint James',
    category: 'Protection and Trust',
    difficulty: 'short'
  },
  {
    id: 'php-1-6',
    title: 'The one who began a good work in you will complete it',
    reference: 'Philippians 1:6',
    text: 'I am confident of this, that the one who began a good work in you will continue to complete it until the day of Christ Jesus.',
    translation: 'Epistle of Saint Paul to the Philippians',
    category: 'Vigilance and Perseverance',
    difficulty: 'short'
  },
  {
    id: 'ro-8-38-39',
    title: 'Nothing can separate us from the love of God in Christ Jesus',
    reference: 'Romans 8:38–39',
    text: 'For I am convinced that neither death, nor life, nor angels, nor principalities, nor present things, nor future things, nor powers, nor height, nor depth, nor any other creature will be able to separate us from the love of God in Christ Jesus our Lord.',
    translation: 'Epistle of Saint Paul to the Romans',
    category: 'Faith and Salvation',
    difficulty: 'short'
  },
  {
    id: 'ro-8-18',
    title: 'The sufferings are as nothing compared with future glory',
    reference: 'Romans 8:18',
    text: 'I consider that the sufferings of this present time are as nothing compared with the glory to be revealed for us.',
    translation: 'Epistle to the Romans',
    category: 'Kingdom and Eternity',
    difficulty: 'short'
  },
  {
    id: 'ps-37-23-24',
    title: 'The valiant one will never fall, for the Lord holds his hand',
    reference: 'Psalm 37:23–24',
    text: 'The valiant one whose steps are guided by the LORD, who will delight in his way, May stumble, but he will never fall, for the LORD holds his hand.',
    translation: 'The Book of Psalms',
    category: 'Protection and Trust',
    difficulty: 'short'
  },
  {
    id: 'ps-50-14-sir-35',
    title: 'Praise as sacrifice',
    reference: 'Psalm 50:14 / Sirach 35:3–4',
    text: 'Offer praise as your sacrifice to God; fulfill your vows to the Most High. By works of charity one offers fine flour, and one who gives alms presents a sacrifice of praise.',
    translation: 'Psalms and Sirach',
    category: 'Prayer and Praise',
    difficulty: 'short'
  },
  {
    id: 'ps-31-25',
    title: 'Be strong and take heart all you who wait for the LORD',
    reference: 'Psalm 31:25',
    text: 'Be strong, and let your heart take courage, all you who wait for the LORD!',
    translation: 'English Standard Version Catholic Edition (ESV-CE)',
    category: 'Protection and Trust',
    difficulty: 'short'
  },
  {
    id: 'ps-33-22',
    title: 'May your mercy, LORD, be upon us',
    reference: 'Psalm 33:22',
    text: 'May your mercy, LORD, be upon us; as we put our hope in you.',
    translation: 'The Book of Psalms',
    category: 'Prayer and Praise',
    difficulty: 'short'
  },
  {
    id: '1-co-15-58',
    title: 'Be always fully devoted to the Lord’s work',
    reference: '1 Corinthians 15:58',
    text: 'Therefore, my beloved brothers, be firm, steadfast, always fully devoted to the work of the Lord, knowing that in the Lord your labor is not in vain.',
    translation: 'First Epistle to the Corinthians',
    category: 'Vigilance and Perseverance',
    difficulty: 'short'
  },
  {
    id: 'ps-50-23',
    title: 'God will let the steadfast look upon his salvation',
    reference: 'Psalm 50:23',
    text: 'Those who offer praise as a sacrifice honor me; I will let him whose way is steadfast look upon the salvation of God.',
    translation: 'The Book of Psalms',
    category: 'Prayer and Praise',
    difficulty: 'short'
  },
  {
    id: 'sir-35-11',
    title: 'Cheerful giving',
    reference: 'Sirach 35:11',
    text: 'With each contribution show a cheerful countenance, and pay your tithes in a spirit of joy.',
    translation: 'Book of Sirach',
    category: 'Humility and Service',
    difficulty: 'short'
  },
  {
    id: 'ps-40-5',
    title: 'Setting one’s security in the Lord',
    reference: 'Psalm 40:5',
    text: 'Blessed the man who sets his security in the LORD.',
    translation: 'The Book of Psalms',
    category: 'Protection and Trust',
    difficulty: 'short'
  },
  {
    id: 'ps-51-19',
    title: 'My sacrifice, O God, is a contrite spirit',
    reference: 'Psalm 51:19',
    text: 'My sacrifice, O God, is a contrite spirit; a contrite, humbled heart, O God, you will not scorn.',
    translation: 'The Miserere (Psalm 51)',
    category: 'Prayer and Praise',
    difficulty: 'short'
  },
  {
    id: 'is-55-10-11',
    title: 'The word of God is all powerful to execute what he announces',
    reference: 'Isaiah 55:10–11',
    text: 'Yet just as from the heavens the rain and snow come down and do not return there till they have watered the earth, making it fertile and fruitful, giving seed to the one who sows and bread to the one who eats, So shall my word be that goes forth from my mouth; It shall not return to me empty, but shall do what pleases me, achieving the end for which I sent it.',
    translation: 'Prophecy of Isaiah',
    category: 'Wisdom and Word',
    difficulty: 'medium'
  },
  {
    id: 'ps-34-4',
    title: 'Let us exalt the name of the Lord together',
    reference: 'Psalm 34:4',
    text: 'Magnify the LORD with me; and let us exalt his name together.',
    translation: 'The Book of Psalms',
    category: 'Prayer and Praise',
    difficulty: 'short'
  },
  {
    id: 'hos-6-6',
    title: 'It is loyalty that God desires, not sacrifice',
    reference: 'Hosea 6:6',
    text: 'For it is loyalty that I desire, not sacrifice, and knowledge of God rather than burnt offerings.',
    translation: 'Prophecy of Hosea',
    category: 'Humility and Service',
    difficulty: 'short'
  },
  {
    id: 'lk-8-15',
    title: 'Bearing fruit through perseverance',
    reference: 'Luke 8:15',
    text: 'But as for the seed that fell on rich soil, they are the ones who, when they have heard the word, embrace it with a generous and good heart, and bear fruit through perseverance.',
    translation: 'Parable of the Sower (Luke)',
    category: 'Vigilance and Perseverance',
    difficulty: 'short'
  },
  {
    id: 'jas-5-16',
    title: 'The powerful prayer of a righteous person',
    reference: 'James 5:16',
    text: 'The fervent prayer of a righteous person is very powerful.',
    translation: 'Epistle of Saint James',
    category: 'Prayer and Praise',
    difficulty: 'short'
  },
  {
    id: 'dt-6-4-5',
    title: 'The great commandment',
    reference: 'Deuteronomy 6:4–5',
    text: 'Hear, O Israel! The LORD is our God, the LORD alone! Therefore, you shall love the LORD, your God, with your whole heart, and with your whole being, and with your whole strength.',
    translation: 'The Shema Yisrael (Deuteronomy)',
    category: 'Faith and Salvation',
    difficulty: 'short'
  },
  {
    id: 'ps-91-11-esv',
    title: 'God’s angels will guard and protect',
    reference: 'Psalm 91:11',
    text: 'For he will command his angels concerning you to guard you in all your ways to protect you wherever you go.',
    translation: 'English Standard Version (ESV)',
    category: 'Protection and Trust',
    difficulty: 'short'
  },
  {
    id: 'eph-1-17-23',
    title: 'The surpassing greatness of his power for us who believe',
    reference: 'Ephesians 1:17–23',
    text: '...that the God of our Lord Jesus Christ, the Father of glory, may give you a spirit of wisdom and revelation resulting in knowledge of him. May the eyes of your hearts be enlightened, that you may know what is the hope that belongs to his call, what are the riches of glory in his inheritance among the holy ones, and what is the surpassing greatness of his power for us who believe, in accord with the exercise of his great might, which he worked in Christ, raising him from the dead and seating him at his right hand in the heavens, far above every principality, authority, power, and dominion, and every name that is named not only in this age but also in the one to come. And he put all things beneath his feet and gave him as head over all things to the church, which is his body, the fullness of the one who fills all things in every way.',
    translation: 'Epistle of Saint Paul to the Ephesians',
    notes: 'His body: the Church. In Christ dwells the fullness of the deity, and through the Church His grace fills all in all.',
    category: 'Kingdom and Eternity',
    difficulty: 'passage'
  },
  {
    id: 'ps-116-17',
    title: 'I will offer a sacrifice of praise',
    reference: 'Psalm 116:17',
    text: 'I will offer a sacrifice of praise and call on the name of the LORD.',
    translation: 'The Book of Psalms',
    category: 'Prayer and Praise',
    difficulty: 'short'
  },
  {
    id: 'jn-1-16',
    title: 'Grace in place of grace',
    reference: 'John 1:16',
    text: 'From his fullness we have all received, grace in place of grace.',
    translation: 'The Prologue of the Gospel of John',
    category: 'Faith and Salvation',
    difficulty: 'short'
  },
  {
    id: 'jn-14-14',
    title: 'I will do anything you ask of me in my name',
    reference: 'John 14:14',
    text: 'If you ask anything of me in my name, I will do it.',
    translation: 'The Holy Gospel according to John',
    category: 'Prayer and Praise',
    difficulty: 'short'
  },
  {
    id: '2-co-5-7',
    title: 'Walking by faith',
    reference: '2 Corinthians 5:7',
    text: '...for we walk by faith, not by sight.',
    translation: 'Second Epistle to the Corinthians',
    category: 'Faith and Salvation',
    difficulty: 'short'
  },
  {
    id: '2-co-4-17-18',
    title: 'We look to what is unseen',
    reference: '2 Corinthians 4:17-18',
    text: 'For this momentary light affliction is producing for us an eternal weight of glory beyond all comparison, as we look not to what is seen but to what is unseen; for what is seen is transitory, but what is unseen is eternal.',
    translation: 'Second Epistle of Saint Paul to the Corinthians',
    category: 'Kingdom and Eternity',
    difficulty: 'short'
  },
  {
    id: 'pr-21-30',
    title: 'No wisdom prevails against the Lord',
    reference: 'Proverbs 21:30',
    text: 'No wisdom, no understanding, no counsel prevail against the LORD.',
    translation: 'Douay-Rheims Bible',
    category: 'Wisdom and Word',
    difficulty: 'short'
  },
  {
    id: 'sir-3-30',
    title: 'Alms atones for sins',
    reference: 'Sirach 3:30',
    text: 'As water quenches a flaming fire, so almsgiving atones for sins.',
    translation: 'Book of Sirach',
    category: 'Humility and Service',
    difficulty: 'short'
  },
  {
    id: 'lk-14-11',
    title: 'The one who humbles himself will be exalted',
    reference: 'Luke 14:11',
    text: 'For everyone who exalts himself will be humbled, but the one who humbles himself will be exalted.',
    translation: 'The Holy Gospel according to Luke',
    category: 'Humility and Service',
    difficulty: 'short'
  },
  {
    id: 'dan-3-89',
    title: 'Give thanks to the Lord, whose mercy endures forever',
    reference: 'Daniel 3:89',
    text: 'Give thanks to the Lord, who is good, whose mercy endures forever.',
    translation: 'Canticle of the Three Youths (Book of Daniel)',
    category: 'Prayer and Praise',
    difficulty: 'short'
  },
  {
    id: 'phil-2-9-11',
    title: 'At the name of Jesus every knee should bend',
    reference: 'Philippians 2:9–11',
    text: 'Because of this, God greatly exalted him and bestowed on him the name that is above every name, that at the name of Jesus every knee should bend, of those in heaven and on earth and under the earth, and every tongue confess that Jesus Christ is Lord, to the glory of God the Father.',
    translation: 'Christological Hymn of Saint Paul (Philippians)',
    notes: 'The Name: Lord (Kyrios), revealing the divine nature of Jesus Christ to the glory of God the Father.',
    category: 'Kingdom and Eternity',
    difficulty: 'medium'
  },
  {
    id: 'jn-3-16-17',
    title: 'For God so loved the world that he gave his only Son',
    reference: 'John 3:16–17',
    text: 'For God so loved the world that he gave his only Son, so that everyone who believes in him might not perish but might have eternal life. For God did not send his Son into the world to condemn the world, but that the world might be saved through him.',
    translation: 'The Holy Gospel according to John',
    category: 'Faith and Salvation',
    difficulty: 'short'
  },
  {
    id: '1-ti-6-13-16',
    title: 'Keep the commandment without stain or reproach',
    reference: '1 Timothy 6:13–16',
    text: 'I charge you before God, who gives life to all things, and before Christ Jesus, who gave testimony under Pontius Pilate for the noble confession, to keep the commandment without stain or reproach until the appearance of our Lord Jesus Christ that the blessed and only ruler will make manifest at the proper time, the King of kings and Lord of lords, who alone has immortality, who dwells in unapproachable light, and whom no human being has seen or can see. To him be honor and eternal power. Amen.',
    translation: 'First Epistle of Saint Paul to Timothy',
    category: 'Vigilance and Perseverance',
    difficulty: 'medium'
  },
  {
    id: '1-pe-1-24-25',
    title: 'The word of the Lord remains forever',
    reference: '1 Peter 1:24–25 / Isaiah 40:8',
    text: '“All flesh is like grass, and all its glory like the flower of the field; the grass withers, and the flower wilts; but the word of the Lord remains forever.” Heaven and earth will pass away, but my words will not pass away.',
    translation: '1 Peter and Isaiah 40:8 / Matthew 24:35',
    category: 'Wisdom and Word',
    difficulty: 'short'
  },
  {
    id: 'jn-14-6',
    title: 'The way and the truth and the life',
    reference: 'John 14:6',
    text: 'Jesus said to him, “I am the way and the truth and the life. No one comes to the Father except through me.”',
    translation: 'The Holy Gospel according to John',
    category: 'Faith and Salvation',
    difficulty: 'short'
  },
  {
    id: 'lk-12-40',
    title: 'Eternal vigilance',
    reference: 'Luke 12:40',
    text: 'You also must be prepared, for at an hour you do not expect, the Son of Man will come.',
    translation: 'The Holy Gospel according to Luke',
    category: 'Vigilance and Perseverance',
    difficulty: 'short'
  },
  {
    id: 'wis-1-1-2',
    title: 'Seek the Lord in integrity of heart',
    reference: 'Wisdom 1:1–2',
    text: 'Think of the LORD in goodness, and seek him in integrity of heart; Because he is found by those who do not test him, and manifests himself to those who do not disbelieve him.',
    translation: 'Book of Wisdom',
    category: 'Wisdom and Word',
    difficulty: 'short'
  },
  {
    id: 'wis-2-23',
    title: 'God formed us to be imperishable',
    reference: 'Wisdom 2:23',
    text: 'For God formed us to be imperishable; the image of his own nature he made us.',
    translation: 'Book of Wisdom',
    category: 'Kingdom and Eternity',
    difficulty: 'short'
  },
  {
    id: 'pr-3-5-7',
    title: 'Trust in the LORD with all your heart',
    reference: 'Proverbs 3:5–7',
    text: 'Trust in the LORD with all your heart, and do not rely on your own insight. In all your ways acknowledge him, and he will make straight your paths. Be not wise in your own eyes; fear the LORD, and turn away from evil.',
    translation: 'Book of Proverbs',
    category: 'Protection and Trust',
    difficulty: 'short'
  },
  {
    id: 'mt-11-19',
    title: 'Wisdom vindicated by works',
    reference: 'Matthew 11:19',
    text: '...wisdom is vindicated by her works.',
    translation: 'The Holy Gospel according to Matthew',
    category: 'Wisdom and Word',
    difficulty: 'short'
  },
  {
    id: '1-jn-5-14-15',
    title: 'If we ask anything according to his will, he hears us',
    reference: '1 John 5:14-15',
    text: 'And we have this confidence in him, that if we ask anything according to his will, he hears us. And if we know that he hears us in regard to whatever we ask, we know that what we have asked him for is ours.',
    translation: 'First Epistle of Saint John',
    category: 'Prayer and Praise',
    difficulty: 'short'
  },
  {
    id: 'is-42-4',
    title: 'The coastlands will wait for his teaching',
    reference: 'Isaiah 42:4',
    text: '...the coastlands will wait for his teaching.',
    translation: 'Prophecy of Isaiah (Servant Song)',
    notes: 'Coastlands: the nations and peoples of the entire world awaiting the light of the Gospel.',
    category: 'Kingdom and Eternity',
    difficulty: 'short'
  },
  {
    id: 'col-1-15',
    title: 'The preeminence of Christ',
    reference: 'Colossians 1:15',
    text: 'He is the image of the invisible God, the firstborn of all creation.',
    translation: 'Epistle of Saint Paul to the Colossians',
    category: 'Faith and Salvation',
    difficulty: 'short'
  },
  {
    id: 'ex-14-14',
    title: 'The LORD will fight for you',
    reference: 'Exodus 14:14',
    text: 'The LORD will fight for you; you have only to keep still.',
    translation: 'The Book of Exodus',
    category: 'Protection and Trust',
    difficulty: 'short'
  },
  {
    id: 'lk-18-14',
    title: 'Everyone who exalts himself will be humbled',
    reference: 'Luke 18:14',
    text: 'I tell you, the latter went home justified, not the former; for everyone who exalts himself will be humbled, and the one who humbles himself will be exalted.',
    translation: 'Parable of the Pharisee and the Tax Collector',
    category: 'Humility and Service',
    difficulty: 'short'
  },
  {
    id: 'ps-27-1',
    title: 'The LORD is my light and my salvation',
    reference: 'Psalm 27:1',
    text: 'The LORD is my light and my salvation; whom shall I fear? The LORD is the stronghold of my life; of whom shall I be afraid?',
    translation: 'The Book of Psalms',
    category: 'Protection and Trust',
    difficulty: 'short'
  },
  {
    id: 'ps-33-5',
    title: 'The earth is full of the mercy of the LORD',
    reference: 'Psalm 33:5',
    text: 'The earth is full of the mercy of the LORD.',
    translation: 'The Book of Psalms',
    category: 'Prayer and Praise',
    difficulty: 'short'
  },
  {
    id: 'ps-17-15',
    title: 'When I awake, let me be filled with your presence',
    reference: 'Psalm 17:15',
    text: '...when I awake, let me be filled with your presence.',
    translation: 'The Book of Psalms',
    category: 'Prayer and Praise',
    difficulty: 'short'
  }
];
