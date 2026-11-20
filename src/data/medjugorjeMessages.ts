export interface MedjugorjeMessage {
  id: string;
  date: string; // YYYY-MM-DD
  displayDate: string;
  seerName: string;
  seerTitle: string;
  seerType:
    | 'monthly-world'
    | 'weekly-parish'
    | 'second-of-month'
    | 'annual'
    | 'prayer-group'
    | 'early-days'
    | 'special-intention';
  title: string;
  messageText: string;
  originalCroatianExcerpt: string;
  themes: string[];
  spiritualReflection: string;
  scriptureAnchor: {
    citation: string;
    text: string;
  };
  ecclesiasticalApproval?: boolean;
}

export interface FiveStonesDevotion {
  number: number;
  name: string;
  subtitle: string;
  description: string;
  gospaQuote: string;
  practiceTip: string;
}

export const FIVE_STONES_OF_MEDJUGORJE: FiveStonesDevotion[] = [
  {
    number: 1,
    name: 'Prayer with the Heart (The Rosary)',
    subtitle: 'Molitva srcem • The Holy Rosary Daily',
    description: 'Our Lady calls for daily recitation of the Holy Rosary with contemplation of the Mysteries, not rushing words but praying from deep within the soul.',
    gospaQuote: '"Pray the Rosary every day. May the Rosary in your hands remind you of Jesus and My maternal love for you."',
    practiceTip: 'Pray at least five decades of the Rosary every day, uniting with Mary in the silence of your room or with your family.'
  },
  {
    number: 2,
    name: 'The Holy Eucharist (Holy Mass)',
    subtitle: 'Sveta Misa • Center of Christian Life',
    description: 'The Holy Mass is the greatest prayer on earth, where Christ is truly present in His Body, Blood, Soul, and Divinity.',
    gospaQuote: '"May the Holy Mass be not a habit for you, but life. Every Mass is the greatest gift God gives to man."',
    practiceTip: 'Participate actively in Holy Mass on Sundays and weekdays whenever possible; adore Jesus in the Most Blessed Sacrament.'
  },
  {
    number: 3,
    name: 'Holy Scripture (The Holy Bible)',
    subtitle: 'Sveto Pismo • Daily Bread of God’s Word',
    description: 'Our Lady asks every Catholic home to place the Holy Bible in a visible, prominent place and read a few passages daily.',
    gospaQuote: '"Put Holy Scripture in a visible place in your family, read it, meditate on it, and live it."',
    practiceTip: 'Read the daily Gospel reading every morning before starting work; let God speak directly to your day.'
  },
  {
    number: 4,
    name: 'Fasting (Wednesdays and Fridays)',
    subtitle: 'Post • Wednesday and Friday Fasting',
    description: 'Fasting humbles the flesh, sharpens spiritual sight, and according to Our Lady, can stop wars and suspend natural laws.',
    gospaQuote: '"Fasting and prayer can stop wars and suspend the laws of nature. The best fast is on bread and water."',
    practiceTip: 'Fast on Wednesdays and Fridays on bread and water, or fast from excessive screen time, worldly gossip, and unnecessary luxuries.'
  },
  {
    number: 5,
    name: 'Monthly Confession',
    subtitle: 'Ispovijed • Sacrament of Reconciliation',
    description: 'Regular monthly sacramental confession cleanses the soul, repairs our relationship with God, and releases healing graces.',
    gospaQuote: '"Do not confess out of habit; let confession give an impulse to your faith. It should incite you to draw nearer to Jesus."',
    practiceTip: 'Examine your conscience and receive the Sacrament of Penance once every month, and whenever mortal sin is incurred.'
  }
];

export const VATICAN_NIHIL_OBSTAT_NOTE = {
  title: 'Vatican Decree: "The Queen of Peace"',
  subtitle: 'Dicastery for the Doctrine of the Faith (September 19, 2024)',
  summary: 'Approved by Pope Francis and issued by Prefect Cardinal Víctor Manuel Fernández, the Vatican granted the official decree of "Nihil Obstat" (No Objection) to the spiritual experience of Medjugorje. The decree highlights the abundant spiritual fruits—countless conversions, returns to the Sacraments, vocations to the priesthood and consecrated life, reconciliations in marriages, and profound Eucharistic adoration. The faithful are authorized to give it a positive adherence and engage in pilgrimages, recognizing that God works marvels through the title of the Queen of Peace.',
  keyQuote: '"The unique atmosphere of Medjugorje—of prayer, penance, silence, and communion—leads pilgrims to encounter Christ in the Eucharist and in the Sacrament of Reconciliation."'
};

export const MEDJUGORJE_MESSAGES: MedjugorjeMessage[] = [
  {
    id: 'medj-2026-10-25',
    date: '2026-10-25',
    displayDate: 'October 25, 2026',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message to the Parish and the World',
    seerType: 'monthly-world',
    title: 'Be Prayer and Extended Hands of Love and Peace',
    messageText: 'Dear children! A fire of hatred and wars is spreading in the hearts of people who do not want peace but their own weak interests. That is why, little children, you be prayer and my extended hands of love and peace for all those who are far from my motherly heart. Pray more strongly and more for the peace that God desires to give you, but you do not want it. I am with you and I am praying that peace may prevail and begin to reign in every heart. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! Vatra mržnje i ratova širi se u srcima ljudi koji ne žele mir, nego svoje slabe interese...',
    themes: ['Peace', 'Prayer with the Heart', 'Extended Hands', 'Intercession', 'Love'],
    spiritualReflection: 'Our Lady urgently calls believers to become living prayer and instruments of reconciliation in a world threatened by selfishness and conflict. True peace begins when human hearts open themselves to the peace God desires to bestow.',
    scriptureAnchor: {
      citation: 'Matthew 5:9',
      text: '"Blessed are the peacemakers, for they shall be called sons of God."'
    },
    ecclesiasticalApproval: true
  },
  {
    id: 'medj-2026-09-25',
    date: '2026-09-25',
    displayDate: 'September 25, 2026',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message to the Parish and the World',
    seerType: 'monthly-world',
    title: 'Renew the Family Rosary for Peace',
    messageText: 'Dear children! May this time be a time of prayer for peace. I am calling you to renew in your families the prayer of the Rosary for my intentions, so that I may be able to multiply your prayers and intercede for you before the Most High, [for Him] to heed your prayers and to give you peace. I am with you and like never before I pray for you and with you, my little children. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! Neka ovo vrijeme bude vrijeme molitve za mir. Pozivam vas da obnovite u vašim obiteljima molitvu krunice...',
    themes: ['Peace', 'Rosary', 'Family', 'Intercession'],
    spiritualReflection: 'When families gather to pray the Rosary together, Mary multiplies their humble petitions before the throne of the Most High. Renewing domestic prayer turns the home into a sanctuary of peace.',
    scriptureAnchor: {
      citation: 'Matthew 18:20',
      text: '"For where two or three are gathered in my name, there am I in the midst of them."'
    },
    ecclesiasticalApproval: true
  },
  {
    id: 'medj-2026-08-25',
    date: '2026-08-25',
    displayDate: 'August 25, 2026',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message to the Parish and the World',
    seerType: 'monthly-world',
    title: 'Return to God and Become Carriers of Peace',
    messageText: 'Dear children, Today I am calling you: return to God, return to prayer, so that you may become carriers of peace. Pray, little children, for peace that is in danger; and may prayer begin to flow anew from your hearts and from your families, so that, in joy, you may feel the voice of Jesus in your hearts: \'Peace be with you.\' Be, little children, carriers of peace and prayer for all those who do not pray. I am with you and I pray for you before my Son Jesus. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco, Danas vas pozivam: vratite se Bogu, vratite se molitvi, kako biste postali nositelji mira...',
    themes: ['Peace', 'Prayer with the Heart', 'Family', 'Joy', 'Conversion'],
    spiritualReflection: 'Echoing the Risen Lord\'s greeting in the Upper Room—"Peace be with you"—Our Lady invites prayer to flow freshly from hearts and homes, interceding especially for those who do not pray.',
    scriptureAnchor: {
      citation: 'John 20:19',
      text: '"Jesus came and stood among them and said to them, \'Peace be with you.\'"'
    },
    ecclesiasticalApproval: true
  },
  {
    id: 'medj-2026-07-25',
    date: '2026-07-25',
    displayDate: 'July 25, 2026',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message to the Parish and the World',
    seerType: 'monthly-world',
    title: 'Place Sacred Scripture in a Visible Place in Your Family',
    messageText: 'Dear children! While darkness and peacelessness rule in many hearts, you, little children, be prayer and my extended hands of love. Little children, place the Sacred Scripture in a visible place in your family and read it, so that it may be an encouragement for you to conversion and a new life; because Satan is strong and seduces hearts. Your hearts, through my maternal Heart, I desire to commend to the Heart of my Son Jesus, so that He, the Risen One, may reign in you and joy may begin to reign in you and around you. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! Dok tama i nemir vladaju u mnogim srcima, vi budite, dječice, molitva i moje ispružene ruke ljubavi...',
    themes: ['Holy Scripture', 'Family', 'Conversion', 'Spiritual Warfare', 'Joy'],
    spiritualReflection: 'Our Lady returns to one of the Five Stones of Medjugorje—enthroning the Holy Bible in the home—and consecrating human hearts through her Immaculate Heart to the Risen Heart of Jesus.',
    scriptureAnchor: {
      citation: 'Psalm 119:105',
      text: '"Your word is a lamp to my feet and a light to my path."'
    },
    ecclesiasticalApproval: true
  },
  {
    id: 'medj-2026-06-25',
    date: '2026-06-25',
    displayDate: 'June 25, 2026 (45th Anniversary of Apparitions)',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: '45th Anniversary Monthly Message to the Parish and the World',
    seerType: 'monthly-world',
    title: 'Rejoice Also in Difficulties: I Am Your Mother and I Love You',
    messageText: 'Dear children, Rejoice with me because the Most High permits me to be with you, to lead you to Him Who is the Way, the Truth and the Life. Rejoice, little children, and be joyful also in difficulties and you will have the strength, because you will be aware that you are transient and you will know to offer everything to God. That is why, do not forget: I am your Mother and I love you. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! Radujte se sa mnom jer mi Svevišnji dozvoli da sam s vama, da vas vodim Njemu, koji je Put, Istina i Život...',
    themes: ['Anniversary', 'Joy', 'Eternal Life', 'Surrender', 'Motherly Love'],
    spiritualReflection: 'Marking 45 years since the first apparitions in June 1981, Mary points every pilgrim to Christ—the Way, the Truth, and the Life—teaching that remembering our heavenly homeland gives joyful strength in every trial.',
    scriptureAnchor: {
      citation: 'John 14:6',
      text: '"Jesus said to him, \'I am the way, and the truth, and the life.\'"'
    },
    ecclesiasticalApproval: true
  },
  {
    id: 'medj-2026-06-25-ivanka',
    date: '2026-06-25',
    displayDate: 'June 25, 2026 (45th Anniversary Annual Apparition)',
    seerName: 'Ivanka Ivanković-Elez',
    seerTitle: 'Annual Apparition Message to Ivanka',
    seerType: 'annual',
    title: 'Carry the Peace and Love of My Son into Every Heart',
    messageText: 'Dear children, carry the peace and the love of my Son into every heart. Pray for peace, peace, peace.',
    originalCroatianExcerpt: 'Draga djeco, nosite mir i ljubav moga Sina u svako srce. Molite za mir, mir, mir.',
    themes: ['Peace', 'Love', 'Anniversary', 'Prayer with the Heart'],
    spiritualReflection: 'In her annual apparition on the 45th Anniversary, Ivanka received a concise, urgent call echoing the very first days of Medjugorje: bring Christ\'s love into every heart and pray ceaselessly for peace.',
    scriptureAnchor: {
      citation: 'John 14:27',
      text: '"Peace I leave with you; my peace I give to you. Not as the world gives do I give to you."'
    }
  },
  {
    id: 'medj-2026-05-25',
    date: '2026-05-25',
    displayDate: 'May 25, 2026',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message to the Parish and the World',
    seerType: 'monthly-world',
    title: 'A Time of Prayer and Fasting: Return in Love to God',
    messageText: 'Dear children, May this time be for you a time of prayer and fasting. Return, little children, in love to God Who is your peace. I am with you, little children, and I love you with my motherly tenderness. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! Nek vam ovo vrijeme bude vrijeme molitve i posta. Vratite se, dječice, u ljubavi Bogu koji je vaš mir...',
    themes: ['Fasting', 'Prayer with the Heart', 'Peace', 'Conversion', 'Motherly Love'],
    spiritualReflection: 'With brief, luminous simplicity, Our Lady unites prayer, fasting, and loving return to God—assuring every soul of her gentle maternal nearness.',
    scriptureAnchor: {
      citation: 'Joel 2:12',
      text: '"Return to me with all your heart, with fasting, with weeping, and with mourning."'
    },
    ecclesiasticalApproval: true
  },
  {
    id: 'medj-2026-04-25',
    date: '2026-04-25',
    displayDate: 'April 25, 2026',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message to the Parish and the World',
    seerType: 'monthly-world',
    title: 'Missionaries of Love and Peace Filled with the Holy Spirit',
    messageText: 'Dear children, I am praying for you and encourage you to a new life, a life in joy and prayer. May the Holy Spirit fill you, little children, with joy so that you may be like a spring of pure and drinkable water; that you, little children, may be in God and with God missionaries of love and peace. Your life is short here on earth and that is why I am with you to lead you towards Heaven. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! Molim se za vas i potičem vas na novi život, život u radosti i molitvi. Nek vas, dječice, Duh Sveti ispuni radošću...',
    themes: ['Holy Spirit', 'Joy', 'Peace', 'Witness', 'Eternal Life'],
    spiritualReflection: 'Filled with the joy of the Holy Spirit, Christians become a living spring of pure water for a thirsty world, remembering that earthly life is brief and ordered toward Heaven.',
    scriptureAnchor: {
      citation: 'John 7:38',
      text: '"Whoever believes in me, as the Scripture has said, \'Out of his heart will flow rivers of living water.\'"'
    },
    ecclesiasticalApproval: true
  },
  {
    id: 'medj-2026-03-25',
    date: '2026-03-25',
    displayDate: 'March 25, 2026 (Feast of the Annunciation)',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message on the Feast of the Annunciation',
    seerType: 'monthly-world',
    title: 'In Humility, Pray for Peace and Work on Reconciliation',
    messageText: 'Dear children, The poison of selfishness and hatred rules human hearts and that is why you do not have peace. I am calling you, little children: be love and my extended hands to all those whom you meet. In humility, pray for peace and work on reconciliation among people, so that it may be good for every person on earth. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! Otrov sebičnosti i mržnje vlada ljudskim srcima i zato nemate mira. Pozivam vas, dječice: budite ljubav...',
    themes: ['Annunciation', 'Peace', 'Humility', 'Forgiveness', 'Love'],
    spiritualReflection: 'Given on the Solemnity of the Annunciation, Our Lady diagnoses the root of human unrest—selfishness and hatred—and prescribes the Gospel antidote: humility, active reconciliation, and becoming her extended hands of love.',
    scriptureAnchor: {
      citation: '2 Corinthians 5:18',
      text: '"All this is from God, who through Christ reconciled us to himself and gave us the ministry of reconciliation."'
    },
    ecclesiasticalApproval: true
  },
  {
    id: 'medj-2026-03-18',
    date: '2026-03-18',
    displayDate: 'March 18, 2026',
    seerName: 'Mirjana Dragićević-Soldo',
    seerTitle: 'Annual Apparition Message to Mirjana',
    seerType: 'annual',
    title: 'Abandon Yourselves to My Son and Do Not Be Afraid of the Future',
    messageText: 'Dear children, never forget how great is the love of God. Through that love I am with you. Do not forget how great is His mercy. Through that mercy I am showing you the way to true happiness and perfect peace. That is the way to my Son. Therefore, my children, with complete trust, abandon yourselves to my Son and do not be afraid. Do not be afraid of the future because it belongs entirely to the will of my Son. Therefore, my children, renounce everything that distances you from my Son: false happiness, false hope, false splendor. Trust my Son. Tell Him about your pains, sufferings, desires and hopes. You will feel His love and His blessing. Thank you!',
    originalCroatianExcerpt: 'Draga djeco, nikada ne zaboravite koliko je velika Božja ljubav. Po toj ljubavi sam s vama...',
    themes: ['Trust', 'Divine Mercy', 'Peace', 'Surrender', 'Hope'],
    spiritualReflection: 'In her annual apparition on March 18, Mirjana received a tender summons to cast off fear of the future, renounce worldly illusions, and speak honestly to Jesus about every pain, desire, and hope.',
    scriptureAnchor: {
      citation: '1 Peter 5:7',
      text: '"Cast all your anxieties on him, because he cares for you."'
    }
  },
  {
    id: 'medj-2026-02-25',
    date: '2026-02-25',
    displayDate: 'February 25, 2026',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message to the Parish and the World',
    seerType: 'monthly-world',
    title: 'Awaken from Sleep and Shine Holiness Like a Spring Flower',
    messageText: 'Dear children, In this time of grace, anew, I am calling you to offer your lives to God that He may lead you towards the resurrection through your personal conversion. Little children, God is near to you and heeds your prayers, but you are lulled to sleep, and that is why He sent me to you to awaken you, and that you may shine holiness like a spring flower. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! U ovom milosnom vremenu iznova vas pozivam da prikažete vaše živote Bogu, da vas on vodi prema uskrsnuću...',
    themes: ['Conversion', 'Holiness', 'Resurrection', 'Prayer with the Heart'],
    spiritualReflection: 'Given during Lent, this message gently rouses souls from spiritual slumber, assuring us that God is close and hears every prayer as He leads us through conversion toward the glory of the Resurrection.',
    scriptureAnchor: {
      citation: 'Ephesians 5:14',
      text: '"Awake, O sleeper, and arise from the dead, and Christ will shine on you."'
    },
    ecclesiasticalApproval: true
  },
  {
    id: 'medj-2026-01-25',
    date: '2026-01-25',
    displayDate: 'January 25, 2026',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message to the Parish and the World',
    seerType: 'monthly-world',
    title: 'Be Prayer and a Sign of God\'s Love to Others',
    messageText: 'Dear children, Today, I am calling you to be prayer and a blessing for all those who have not come to know God\'s love. Little children, be different from others and be positive people of prayer and love towards God, that with your lives, you may be a sign of God\'s love to others. I bless you with my motherly blessing and intercede for each of you before my Son Jesus. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! Danas vas pozivam da budete molitva i blagoslov za sve one koji nisu upoznali Božju ljubav...',
    themes: ['Witness', 'Love', 'Prayer with the Heart', 'Intercession'],
    spiritualReflection: 'Opening the year 2026, Our Lady asks Christians to stand out from worldly cynicism as radiant, positive people of prayer whose very lives point unbelievers to the love of God.',
    scriptureAnchor: {
      citation: 'Matthew 5:16',
      text: '"Let your light shine before others, so that they may see your good works and give glory to your Father who is in heaven."'
    },
    ecclesiasticalApproval: true
  },
  {
    id: 'medj-2025-12-25-marija',
    date: '2025-12-25',
    displayDate: 'December 25, 2025 (Christmas Monthly Message)',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Christmas Message to the Parish and the World',
    seerType: 'monthly-world',
    title: 'Be Resolute and Courageous Defenders of the Love of God',
    messageText: 'Dear children! Also today — when God permits me to carry to you in my arms little Jesus, the King of Peace, that He may fill you with the ardor of love and peace, so that every heart may be similar to His Heart in this time of grace — be resolute and courageous defenders of the love of your God, that in this time of grace He may give you His peace. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! I danas - kad mi Bog dozvoli da vam u mojim rukama nosim malog Isusa Kralja mira, da vas on ispuni žarom ljubavi i mirom...',
    themes: ['Christmas', 'Prince of Peace', 'Love', 'Courage'],
    spiritualReflection: 'Bearing the Infant Jesus, King of Peace, in her arms on Christmas Day, Mary calls the faithful to courageous fidelity so every heart may grow like the Sacred Heart of Christ.',
    scriptureAnchor: {
      citation: 'Isaiah 9:6',
      text: '"For to us a child is born, to us a son is given... and his name shall be called Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace."'
    },
    ecclesiasticalApproval: true
  },
  {
    id: 'medj-2025-12-25',
    date: '2025-12-25',
    displayDate: 'December 25, 2025 (Annual Christmas Apparition)',
    seerName: 'Jakov Čolo',
    seerTitle: 'Annual Christmas Apparition Message to Jakov',
    seerType: 'annual',
    title: 'Complete Surrender to Jesus: Permit Him to Rule in Your Lives',
    messageText: 'Today, on this day of grace, in a special way I am calling you to complete surrender to Jesus. Little children, surrender to Him your wounds and pains, your past and future, and permit Jesus to begin to rule in your lives. My children, only with complete surrender, Jesus gives Himself in your life, and this is the greatest gift that you can receive. Pray that you may comprehend how precious you are for Jesus and how much He loves you. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Danas, na ovaj milosni dan, na poseban način pozivam vas na potpuno predanje Isusu...',
    themes: ['Christmas', 'Surrender', 'Healing', 'Love', 'Trust'],
    spiritualReflection: 'In her annual Christmas message to Jakov, Our Lady invites total surrender of past wounds and future fears to Jesus, revealing that when we surrender wholly, Christ gives Himself completely to us.',
    scriptureAnchor: {
      citation: 'Galatians 2:20',
      text: '"It is no longer I who live, but Christ who lives in me."'
    }
  },
  {
    id: 'medj-2025-11-25',
    date: '2025-11-25',
    displayDate: 'November 25, 2025',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message to the Parish and the World',
    seerType: 'monthly-world',
    title: 'United in the Joy of Expectancy and Confidence in God',
    messageText: 'Dear children! In this time of grace, I am calling you to follow me. Pray for those who do not pray and do not want peace and joy, which only the Most High can give. May your souls be united in the joy of expectancy and your heart will be filled with peace. You will be convinced, little children, that all will be good and that God will bless all; because the good that you give will return to you, and joy will enfold your heart because you are with God and in God. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! U ovom milosnom vremenu pozivam vas da me slijedite. Molite za one koji ne mole i ne žele mir i radost...',
    themes: ['Peace', 'Joy', 'Hope', 'Intercession'],
    spiritualReflection: 'On the threshold of Advent, Our Lady consoles the faithful with radiant hope: every act of goodness returns multiplied in grace, and living with God fills the heart with unshakeable peace.',
    scriptureAnchor: {
      citation: 'Romans 8:28',
      text: '"And we know that for those who love God all things work together for good."'
    },
    ecclesiasticalApproval: true
  },
  {
    id: 'medj-2025-10-25',
    date: '2025-10-25',
    displayDate: 'October 25, 2025',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message to the Parish and the World',
    seerType: 'monthly-world',
    title: 'Create Prayer Groups to Encourage Each Other to the Good',
    messageText: 'Dear children! The Most High in His goodness gave me to you to lead you on the way of peace. Many have responded and are praying, but there are many creatures who do not have peace and have not come to know the God of love. Therefore, little children, pray and love, create prayer groups to encourage each other to the good. I am with you and am praying for your conversion. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! Svevišnji u svojoj dobroti dade me vama da vas vodim na putu mira. Mnogi su se odazvali i mole...',
    themes: ['Peace', 'Prayer Groups', 'Conversion', 'Love'],
    spiritualReflection: 'Christian faith flourishes in communion. By forming prayer groups, believers strengthen one another in virtue and intercede for those who have not yet encountered the God of love.',
    scriptureAnchor: {
      citation: 'Hebrews 10:24',
      text: '"And let us consider how to stir up one another to love and good works."'
    },
    ecclesiasticalApproval: true
  },
  {
    id: 'medj-2025-09-25',
    date: '2025-09-25',
    displayDate: 'September 25, 2025',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message to the Parish and the World',
    seerType: 'monthly-world',
    title: 'May This Time Be a Time of Prayer for Peace',
    messageText: 'Dear children! May this time for you be a time of prayer for peace. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! Neka vam ovo vrijeme bude vrijeme molitve za mir. Hvala vam što ste se odazvali mome pozivu.',
    themes: ['Peace', 'Prayer with the Heart'],
    spiritualReflection: 'One of the briefest and most penetrating monthly messages in Medjugorje history—summoning the whole Church to single-minded, urgent prayer for peace.',
    scriptureAnchor: {
      citation: 'Psalm 122:6',
      text: '"Pray for the peace of Jerusalem! May they be secure who love you!"'
    },
    ecclesiasticalApproval: true
  },
  {
    id: 'medj-2025-08-25',
    date: '2025-08-25',
    displayDate: 'August 25, 2025',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message to the Parish and the World',
    seerType: 'monthly-world',
    title: 'Fast, Sacrifice Yourselves, and Be My Extended Hands',
    messageText: 'Dear children, my little children, my beloved ones; you are chosen because you have responded, you have put into practice my instructions and love God above all else. Therefore, little children, pray with all your heart that my words may be realized. Fast, sacrifice yourselves, love out of love for God Who created you, and be, little children, my extended hands to this world that has not come to know the God of love. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco, dječice moja, ljubljeni moji! Vi ste izabrani jer ste se odazvali, stavili u praksu moje upute...',
    themes: ['Fasting', 'Extended Hands', 'Prayer with the Heart', 'Love'],
    spiritualReflection: 'With deep maternal affection ("my beloved ones"), Our Lady praises those who live her messages and calls them to fasting, self-offering, and active charity for a world in need of God.',
    scriptureAnchor: {
      citation: 'Romans 12:1',
      text: '"I appeal to you therefore, brothers, by the mercies of God, to present your bodies as a living sacrifice, holy and acceptable to God."'
    },
    ecclesiasticalApproval: true
  },
  {
    id: 'medj-2025-07-25',
    date: '2025-07-25',
    displayDate: 'July 25, 2025',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message to the Parish and the World',
    seerType: 'monthly-world',
    title: 'Fight for the Holiness of Every Life',
    messageText: 'Dear children! In this time of grace, when the Most High permits me to love you and lead you on the way of holiness, Satan wants to entangle you with the cord of peacelessness and hatred. Do not permit him to prevail, but, little children, fight for the holiness of every life. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! U ovom milosnom vremenu, kad mi Svevišnji dozvoli da vas ljubim i vodim putem svetosti, sotona vas želi zapetljati...',
    themes: ['Holiness', 'Spiritual Warfare', 'Peace', 'Pro-Life'],
    spiritualReflection: 'Our Lady warns against the snare of unrest and hatred, calling believers to defend the dignity and sanctity of every human life through steadfast holiness.',
    scriptureAnchor: {
      citation: '1 Peter 1:15',
      text: '"As he who called you is holy, you also be holy in all your conduct."'
    },
    ecclesiasticalApproval: true
  },
  {
    id: 'medj-2025-06-25',
    date: '2025-06-25',
    displayDate: 'June 25, 2025 (44th Anniversary of Apparitions)',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: '44th Anniversary Monthly Message to the Parish and the World',
    seerType: 'monthly-world',
    title: 'Return to God: Ideologies Are Transitory, With God You Have Eternal Life',
    messageText: 'Dear children, Also today I thank the Almighty that I am with you and that I can lead you towards the God of love and peace. The ideologies which destroy you and your spiritual life are transitory. I am calling you, little children: return to God, because with God you have a future and eternal life. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! I danas zahvaljujem Svemogućemu da sam s vama i da vas mogu voditi prema Bogu ljubavi i mira...',
    themes: ['Anniversary', 'Conversion', 'Eternal Life', 'Peace'],
    spiritualReflection: 'Celebrating 44 years of apparitions, Mary contrasts passing worldly ideologies that erode spiritual life with the eternal future promised to all who return to the God of love and peace.',
    scriptureAnchor: {
      citation: '1 John 2:17',
      text: '"And the world is passing away along with its desires, but whoever does the will of God abides forever."'
    },
    ecclesiasticalApproval: true
  },
  {
    id: 'medj-2025-05-25',
    date: '2025-05-25',
    displayDate: 'May 25, 2025',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message to the Parish and the World',
    seerType: 'monthly-world',
    title: 'Pray to the Holy Spirit for Courage, Surrender, and Peace',
    messageText: 'Dear children, In this time of grace, I am calling you to be people of hope, peace and joy, so that every person may be a peacemaker and a lover of life. Pray, little children, to the Holy Spirit to fill you with the strength of His own Holy Spirit of courage and surrender. And this time for you will be a gift and a walk in holiness towards eternal life. I am with you and I love you. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! U ovom milosnom vremenu pozivam vas da budete ljudi nade, mira i radosti, da bi svaki čovjek bio mirotvorac...',
    themes: ['Holy Spirit', 'Hope', 'Peace', 'Joy', 'Holiness'],
    spiritualReflection: 'Approaching Pentecost, Our Lady urges us to invoke the Holy Spirit for courage and surrender so that every believer becomes a joyful peacemaker and defender of life.',
    scriptureAnchor: {
      citation: 'Romans 15:13',
      text: '"May the God of hope fill you with all joy and peace in believing, so that by the power of the Holy Spirit you may abound in hope."'
    },
    ecclesiasticalApproval: true
  },
  {
    id: 'medj-2025-04-25',
    date: '2025-04-25',
    displayDate: 'April 25, 2025',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message to the Parish and the World',
    seerType: 'monthly-world',
    title: 'Winds of Peacelessness: Return to God and to Prayer',
    messageText: 'Dear children, Winds of peacelessness, selfishness and sin are catching hold of many hearts and leading them into peacelessness and perdition. That is why I am calling you, little children: return to God and to prayer, so that it may be good for you in the hearts and on the earth on which you live. I love you, little children, and that is why I am not tiring of calling you to conversion. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! Vjetrovi nemira, sebičnosti i grijeha zahvaćaju mnoga srca i vode ih u nemir i propast...',
    themes: ['Conversion', 'Peace', 'Prayer with the Heart', 'Motherly Love'],
    spiritualReflection: 'Mary\'s tireless maternal love persists in calling humanity away from sin and selfishness, reminding us that interior peace and blessing on earth come only by returning to God.',
    scriptureAnchor: {
      citation: 'Isaiah 55:6-7',
      text: '"Seek the Lord while he may be found; call upon him while he is near."'
    },
    ecclesiasticalApproval: true
  },
  {
    id: 'medj-2025-03-25',
    date: '2025-03-25',
    displayDate: 'March 25, 2025 (Feast of the Annunciation)',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message on the Feast of the Annunciation',
    seerType: 'monthly-world',
    title: 'Say "Yes" to God: Offer Prayers, Sufferings, and Tears',
    messageText: 'Dear children, in this time of grace when you are called to conversion, I am encouraging you, little children: offer me your prayers, sufferings and tears for conversion of hearts that are far from the Heart of my Son Jesus. Pray with me, because, little children, without God you do not have a future or eternal life. I love you, but I cannot help you without you; therefore, say "yes" to God. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! U ovom milosnom vremenu kad ste pozvani na obraćenje potičem vas, dječice, prikažite mi vaše molitve, patnje i suze...',
    themes: ['Annunciation', 'Conversion', 'Redemptive Suffering', 'Eternal Life'],
    spiritualReflection: 'On the Solemnity of her own "Fiat," Mary invites us to unite our daily crosses and tears with hers for distant hearts, reminding us that God respects our free will and awaits our personal "yes."',
    scriptureAnchor: {
      citation: 'Luke 1:38',
      text: '"Behold, I am the handmaid of the Lord; let it be to me according to your word."'
    },
    ecclesiasticalApproval: true
  },
  {
    id: 'medj-2025-02-25',
    date: '2025-02-25',
    displayDate: 'February 25, 2025',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message to the Parish and the World',
    seerType: 'monthly-world',
    title: 'Springtime of Personal Conversion: Be My Hands of Peace',
    messageText: 'Dear children, May this springtime be an encouragement for personal conversion for you, that with your lives you may pray and love God above all, for all those who are in need. Little children, be my hands of peace and prayer; be love for all those who do not love, do not pray and do not want peace. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! Nek vam ovo proljetno vrijeme bude poticaj na osobno obraćenje da bi svojim životima molili i ljubili Boga iznad svega...',
    themes: ['Conversion', 'Extended Hands', 'Peace', 'Love'],
    spiritualReflection: 'Personal conversion bears fruit in concrete charity: becoming Mary\'s hands of peace and prayer specifically for those who neither pray nor love.',
    scriptureAnchor: {
      citation: '1 John 3:18',
      text: '"Little children, let us not love in word or talk but in deed and in truth."'
    },
    ecclesiasticalApproval: true
  },
  {
    id: 'medj-2025-01-25',
    date: '2025-01-25',
    displayDate: 'January 25, 2025',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message to the Parish and the World',
    seerType: 'monthly-world',
    title: 'Put God in the Center of Your Living',
    messageText: 'Dear children, In this year of grace, I am calling you to conversion. Put God, dear children, in the center of your living and the fruits will be love towards neighbor and joy of witnessing; and the holiness of your life will become a true witnessing of faith. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! U ovoj milosnoj godini pozivam vas na obraćenje. Stavite Boga, draga djeco, u centar vašeg življenja...',
    themes: ['Conversion', 'Holiness', 'Witness', 'Joy', 'Love'],
    spiritualReflection: 'Given during the Jubilee Year of Grace 2025, Our Lady teaches that when God holds the center of our lives, neighborly love and joyful witness of faith spring forth naturally.',
    scriptureAnchor: {
      citation: 'Matthew 6:33',
      text: '"But seek first the kingdom of God and his righteousness, and all these things will be added to you."'
    },
    ecclesiasticalApproval: true
  },
  {
    id: 'medj-2024-12-25',
    date: '2024-12-25',
    displayDate: 'December 25, 2024 (Nativity of Our Lord)',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Christmas Message to the Parish and the World',
    seerType: 'monthly-world',
    title: 'Pray That Peace May Reign Over Every Evil',
    messageText: 'Dear children! Pray, pray, pray that peace may begin to reign in every heart and prevail over every evil and peacelessness. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! Molite, molite, molite da bi mir zavladao u svakom srcu i prevladao nad svakim zlom i nemirom.',
    themes: ['Christmas', 'Peace', 'Prayer with the Heart'],
    spiritualReflection: 'A piercing Christmas plea from the Queen of Peace: persistent, triple-repeated prayer is the path by which Christ\'s peace overcomes every evil and unrest.',
    scriptureAnchor: {
      citation: 'Luke 2:14',
      text: '"Glory to God in the highest, and on earth peace among those with whom he is pleased!"'
    },
    ecclesiasticalApproval: true
  },
  {
    id: 'medj-2024-11-25',
    date: '2024-11-25',
    displayDate: 'November 25, 2024',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message to the Parish and the World',
    seerType: 'monthly-world',
    title: 'May Advent Be Prayer of the Family',
    messageText: 'Dear children! In this time of the grace of expectation, I desire to call you to prayer for Advent to be prayer of the family. In a special way, little children whom I tenderly embrace, I encourage you to prayer for peace in the world; for peace to prevail over peacelessness and hatred. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! U ovom milosnom vremenu iščekivanja želim vas pozvati na molitvu da Došašće bude molitva obitelji...',
    themes: ['Family', 'Peace', 'Prayer with the Heart', 'Motherly Love'],
    spiritualReflection: 'Inviting families to keep Advent together in prayer, Our Lady tenderly embraces her children and urges intercession so that peace triumphs over hatred.',
    scriptureAnchor: {
      citation: 'Philippians 4:6-7',
      text: '"In everything by prayer and supplication with thanksgiving let your requests be made known to God. And the peace of God, which surpasses all understanding, will guard your hearts."'
    },
    ecclesiasticalApproval: true
  },
  {
    id: 'medj-2024-10-25',
    date: '2024-10-25',
    displayDate: 'October 25, 2024',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message to the Parish and the World',
    seerType: 'monthly-world',
    title: 'Seek the Intercession of the Saints and Live Holily',
    messageText: 'Dear children, At this time, when you are celebrating the day of All Saints, seek their intercession and prayers so that in union with them, you may find peace. May the Saints be your intercessors and example, that you imitate them and live holily. I am with you and intercede before God for each of you. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! U ovom vremenu kada slavite dan svih svetih, tražite njihov zagovor i molitve, da biste u jedinstvu s njima pronašli mir...',
    themes: ['All Saints', 'Holiness', 'Intercession', 'Peace'],
    spiritualReflection: 'Uniting with the Communion of Saints brings peace and courage to imitate their holiness. Our Lady assures us that she and all the Saints actively intercede for us before God.',
    scriptureAnchor: {
      citation: 'Hebrews 12:1',
      text: '"Therefore, since we are surrounded by so great a cloud of witnesses, let us also lay aside every weight... and let us run with endurance the race that is set before us."'
    },
    ecclesiasticalApproval: true
  },
  {
    id: 'medj-2024-09-25',
    date: '2024-09-25',
    displayDate: 'September 25, 2024 (Following Vatican Nihil Obstat)',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message Following the Holy See Decree on Medjugorje',
    seerType: 'monthly-world',
    title: 'True Peace Comes Only Through Prayer, From God Who Is Your Peace',
    messageText: 'Dear children, Out of love towards you, God has sent me among you, to love you and encourage you to prayer and conversion, for peace in you and in your families and in the world. Little children, do not forget that true peace comes only through prayer, from God Who is your peace. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! Iz ljubavi prema vama Bog me posla među vas da vas ljubim i potičem na molitvu i obraćenje za mir u vama...',
    themes: ['Vatican Decree', 'Peace', 'Conversion', 'Family', 'Prayer with the Heart'],
    spiritualReflection: 'Issued six days after the Holy See granted "Nihil Obstat" to Medjugorje, this message sums up the entire spirituality of the Queen of Peace: true peace comes only through prayer, from God Who is our peace.',
    scriptureAnchor: {
      citation: 'Ephesians 2:14',
      text: '"For he himself is our peace, who has made us both one."'
    },
    ecclesiasticalApproval: true
  },
  {
    id: 'medj-2024-06-25-ivanka',
    date: '2024-06-25',
    displayDate: 'June 25, 2024 (Anniversary of Apparitions)',
    seerName: 'Ivanka Ivanković-Elez',
    seerTitle: 'Annual Apparition Message to Ivanka on Family Prayer',
    seerType: 'annual',
    title: 'Family Prayer: Light Overcoming the Darkness of the World',
    messageText: 'Our Lady appeared to Ivanka in her family home. The apparition lasted 5 minutes. Our Lady was joyful and gave the following maternal message:\n\n"Little children, pray, pray, pray. Pray especially for your families. May the family be a place where God is honored, loved, and welcomed every day. Only family prayer can heal the wounds of modern society. Receive my motherly blessing."',
    originalCroatianExcerpt: 'Dječice, molite, molite, molite. Molite posebno za svoje obitelji...',
    themes: ['Family', 'Marriage', 'Domestic Church', 'Motherly Blessing'],
    spiritualReflection: 'Ivanka was the first of the six children to see the Blessed Virgin on Podbrdo. Her mission from Our Lady is dedicated to families and matrimony. Family prayer with the Rosary creates an impenetrable spiritual haven.',
    scriptureAnchor: {
      citation: 'Joshua 24:15',
      text: '"As for me and my house, we will serve the Lord."'
    }
  },
  {
    id: 'medj-2024-06-22-ivan',
    date: '2024-06-22',
    displayDate: 'June 22, 2024 (Podbrdo Novena for Peace)',
    seerName: 'Ivan Dragičević',
    seerTitle: 'Special Apparition to Ivan on Apparition Hill at 11:30 PM',
    seerType: 'prayer-group',
    title: 'Urgent Novena for Peace: Pray at the Foot of the Cross',
    messageText: 'During the extraordinary 9-day novena requested by Our Lady at 11:30 PM on Apparition Hill, thousands gathered on the rocks of Podbrdo. Our Lady appeared with open hands, looked at the crowd with deep maternal love and tenderness, and said:\n\n"Dear children, thank you for answering my call and climbing this holy hill to pray with me. In these days of unrest, pray for peace in the world and peace in human hearts. Satan wants to destroy peace and family life. Stand firm with the Rosary in your hands. I pray with you and intercede for you before my Son. Go in peace of God."',
    originalCroatianExcerpt: 'Draga djeco, hvala vam što ste se odazvali mom pozivu i popeli se na ovo sveto brdo...',
    themes: ['Urgent Prayer for Peace', 'Podbrdo Novena', 'Spiritual Warfare', 'Rosary'],
    spiritualReflection: 'In June 2024, Our Lady made an extraordinary request through visionary Ivan Dragičević and Marija for nightly Rosary vigils at 11:30 PM on Apparition Hill. Tens of thousands knelt in the dark on the rough stones, asking the Queen of Peace to avert war.',
    scriptureAnchor: {
      citation: 'Ephesians 6:11',
      text: '"Put on the whole armor of God, that you may be able to stand against the schemes of the devil."'
    }
  },
  {
    id: 'medj-2024-03-18-mirjana',
    date: '2024-03-18',
    displayDate: 'March 18, 2024',
    seerName: 'Mirjana Dragićević-Soldo',
    seerTitle: 'Annual Apparition Message to Mirjana',
    seerType: 'annual',
    title: 'Do Not Judge: Pray for Your Shepherds and Non-Believers',
    messageText: 'Dear children! By the merciful love of God, I am with you. As a Mother, I call you: love, forgive, and do not judge. My Son did not judge; He loved and gave Himself entirely on the Cross. Pray for your shepherds, for those whom my Son has chosen to lead you; do not judge them, but support them with your prayers. May my love accompany you in every trial. Thank you.',
    originalCroatianExcerpt: 'Draga djeco! Po milosrdnoj ljubavi Božjoj ja sam s vama...',
    themes: ['Priesthood', 'Shepherds', 'Forgiveness', 'Mercy', 'Love'],
    spiritualReflection: 'Mirjana’s primary spiritual intention is praying for "those who have not experienced God’s love" (non-believers) and praying for priests and bishops. Mary emphasizes that criticism divides, while loving intercession brings unity.',
    scriptureAnchor: {
      citation: 'Hebrews 13:17',
      text: '"Obey your leaders and submit to them, for they are keeping watch over your souls, as those who will have to give an account."'
    }
  },
  {
    id: 'medj-2024-02-11-vicka',
    date: '2024-02-11',
    displayDate: 'February 11, 2024 (World Day of the Sick)',
    seerName: 'Vicka Ivanković-Mijatović',
    seerTitle: 'Maternal Counsel to the Sick, Suffering and Hospitalized',
    seerType: 'special-intention',
    title: 'Offer Your Cross with Joy: Sufferings United with Christ',
    messageText: 'Vicka, who received from Our Lady the special mission of praying for the sick and sufferers, shares this constant maternal teaching of the Queen of Peace:\n\n"Dear children, do not look upon illness and suffering as a punishment from God. Suffering, when accepted with love and surrendered into the hands of Jesus, is a great gift of grace that can convert sinners, save souls from purgatory, and bring immense peace to the world. Smile through your tears, unite your cross to Jesus on Calvary, and know that your Mother holds your hand in every hospital bed and sick room. I love you with an everlasting love."',
    originalCroatianExcerpt: 'Draga djeco, ne gledajte na bolest i patnju kao na kaznu...',
    themes: ['The Sick', 'Redemptive Suffering', 'Calvary', 'Comfort', 'Healing'],
    spiritualReflection: 'Vicka’s radiant smile despite undergoing severe physical illnesses herself has inspired millions. She teaches the Catholic dogma of redemptive suffering (Colossians 1:24)—that our pains united with the Sacred Heart have infinite value for the salvation of souls.',
    scriptureAnchor: {
      citation: 'Colossians 1:24',
      text: '"Now I rejoice in my sufferings for your sake, and in my flesh I am filling up what is lacking in Christ\'s afflictions for the sake of his body, that is, the church."'
    }
  },
  {
    id: 'medj-2024-01-25',
    date: '2024-01-25',
    displayDate: 'January 25, 2024',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message to the Parish and the World',
    seerType: 'monthly-world',
    title: 'Let Prayer Be Like Breathing for Your Soul',
    messageText: 'Dear children! May this time be for you a time of prayer. Little children, pray until prayer becomes your joy and a meeting with God. He will give you the strength to witness the love which He has put into your hearts. Peace will begin to reign in your hearts, and through you, into this restless world. I am with you and I unceasingly intercede before my Son Jesus for each of you. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! Neka ovo vrijeme bude za vas vrijeme molitve...',
    themes: ['Joy of Prayer', 'Encounter with God', 'Inner Peace', 'Witness'],
    spiritualReflection: 'Prayer is not a mechanical duty, but an intimate encounter with a Loving Father. When prayer becomes joy, peace overflows naturally from the soul to family and society.',
    scriptureAnchor: {
      citation: 'Psalm 16:11',
      text: '"You will make known to me the path of life; in Your presence is fullness of joy; at Your right hand are pleasures forevermore."'
    }
  },
  {
    id: 'medj-2023-12-25',
    date: '2023-12-25',
    displayDate: 'December 25, 2023 (Christmas Message)',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Christmas Message to the World',
    seerType: 'monthly-world',
    title: 'Carry the Light of the Infant Jesus into Your Homes',
    messageText: 'Dear children! I am bringing to you my Son Jesus to fill your hearts with peace, because He is peace. Little children, seek Jesus in the silence of your heart so that He may be born anew in you. The world needs Jesus, therefore, little children, witness Him through your lives, through prayer and love. May your families be places where God is adored and loved. I bless you with my motherly blessing. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! Nosim vam svog Sina Isusa da ispuni vaša srca mirom...',
    themes: ['Christmas', 'Peace', 'Family', 'Adoration'],
    spiritualReflection: 'At Christmas, Our Lady reminds us that Christ comes to dwell not in grand earthly palaces, but in humble, prayerful hearts and families that adore Him.',
    scriptureAnchor: {
      citation: 'Luke 2:14',
      text: '"Glory to God in the highest, and on earth peace among those with whom he is pleased!"'
    }
  },
  {
    id: 'medj-2023-08-25',
    date: '2023-08-25',
    displayDate: 'August 25, 2023',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message to the Parish and the World',
    seerType: 'monthly-world',
    title: 'Pray for My Intentions for the Salvation of Humanity',
    messageText: 'Dear children! In this time of grace, I am calling you to prayer with the heart. May your hearts, little children, be raised in prayer towards heaven, so that your heart may feel the God of love who loves you and heals you. Pray, little children, for my intentions, because Satan wants to destroy my plans and to lead you away from salvation. I am with you and I lead you all towards my Son Jesus. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! U ovom milosnom vremenu pozivam vas na molitvu srcem...',
    themes: ['Prayer with the Heart', 'Spiritual Warfare', 'Maternal Protection', 'Salvation'],
    spiritualReflection: 'When we pray for Our Lady\'s intentions, we align our personal desires with the divine plan for world peace and the conversion of sinners.',
    scriptureAnchor: {
      citation: 'Psalm 121:1-2',
      text: '"I lift up my eyes to the hills. From where does my help come? My help comes from the Lord, who made heaven and earth."'
    }
  },
  {
    id: 'medj-2023-05-25',
    date: '2023-05-25',
    displayDate: 'May 25, 2023',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message to the Parish and the World',
    seerType: 'monthly-world',
    title: 'Awaken Your Souls to the Gifts of the Holy Spirit',
    messageText: 'Dear children! I am calling you to go into nature and to pray that the Most High may speak to your heart, and that you may feel the power of the Holy Spirit. In nature you will see the beauty and simplicity of God\'s creation. Open your hearts to the gifts of the Spirit and be carriers of peace and good in this restless world. I bless you with my motherly blessing. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! Pozivam vas da idete u prirodu i da molite...',
    themes: ['Creation', 'Holy Spirit', 'Peace', 'Nature'],
    spiritualReflection: 'Nature is the primary book of divine revelation. In quiet fields and mountain stillness, the noise of technology falls silent and the soft voice of the Holy Spirit can be heard.',
    scriptureAnchor: {
      citation: 'Romans 1:20',
      text: '"For his invisible attributes, namely, his eternal power and divine nature, have been clearly perceived, ever since the creation of the world, in the things that have been made."'
    }
  },
  {
    id: 'medj-2023-01-25',
    date: '2023-01-25',
    displayDate: 'January 25, 2023',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message to the Parish and the World',
    seerType: 'monthly-world',
    title: 'Pray with Me for Peace: The World is in Great Peril',
    messageText: 'Dear children! Pray with me for peace, because Satan wants war and hatred. I am with you, little children, and I am interceding before God for each of you. Do not lose hope; be people of hope and carriers of peace in a world without peace. Fast and pray, so that God may give peace to the nations and to your hearts. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! Molite sa mnom za mir, jer Sotona želi rat i mržnju...',
    themes: ['Peace', 'Fasting', 'Hope', 'Intercession'],
    spiritualReflection: 'Our Lady speaks with intense urgency about the threat of war. Fasting and prayer remain the weapons given by Heaven to change human history and melt hardened hearts.',
    scriptureAnchor: {
      citation: 'Philippians 4:6-7',
      text: '"Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God. And the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus."'
    }
  },
  {
    id: 'medj-2022-10-25',
    date: '2022-10-25',
    displayDate: 'October 25, 2022',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message to the Parish and the World',
    seerType: 'monthly-world',
    title: 'The Most High Sends Me to Guide You to Eternal Salvation',
    messageText: 'Dear children! The Most High permits me to be with you, and to be joy for you and the way in hope, because humanity has decided for death. That is why He sent me to keep instructing you that without God you do not have a future. Little children, be instruments of love for all those who have not come to know the God of love. Witness joyfully your faith and do not lose hope in a change of the human heart. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! Svevišnji mi dopušta da budem s vama...',
    themes: ['Salvation', 'Witness', 'Hope', 'Godless Humanity'],
    spiritualReflection: 'Without God, human progress devolves into culture of death and despair. Mary comes as a loving guide sent directly by the Most High to point the way back to eternal life.',
    scriptureAnchor: {
      citation: 'Jeremiah 29:11',
      text: '"For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope."'
    }
  },
  {
    id: 'medj-2022-06-25',
    date: '2022-06-25',
    displayDate: 'June 25, 2022 (41st Anniversary of Apparitions)',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: '41st Anniversary Message to the World',
    seerType: 'monthly-world',
    title: 'Thank God for Every Gift of Prayer and Grace',
    messageText: 'Dear children! I rejoice with you and I thank you for every sacrifice and prayer which you have offered for my intentions. Little children, do not forget that you are important in my plan of salvation of humanity. Return to God and to prayer so that the Holy Spirit may work in you and through you. I am with you and I bless you with my motherly blessing. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! Radujem se s vama i zahvaljujem vam na svakoj žrtvi i molitvi...',
    themes: ['Anniversary', 'Holy Spirit', 'Salvation Plan', 'Gratitude'],
    spiritualReflection: 'Every Rosary offered, every Wednesday fast, every Holy Mass attended forms an essential link in Our Lady\'s maternal chain of salvation for the modern world.',
    scriptureAnchor: {
      citation: '1 Corinthians 3:9',
      text: '"For we are God\'s fellow workers. You are God\'s field, God\'s building."'
    }
  },
  {
    id: 'medj-2022-02-25',
    date: '2022-02-25',
    displayDate: 'February 25, 2022 (Given at Outbreak of War in Eastern Europe)',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message at Outbreak of War in Eastern Europe',
    seerType: 'monthly-world',
    title: 'Pray with Me for Peace in a World Without Peace',
    messageText: 'Dear children! I am with you and we pray together. Help me with prayer, little children, that Satan may not prevail. His power of death, hate, and fear has visited the earth. Therefore, little children, return to God and to prayer, to fasting and to renunciation, for all those who are trampled upon, poor, and have no voice in this world without God. Little children, if you do not return to God and His Commandments, you do not have a future. That is why He sent me to lead you. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! S vama sam i molimo zajedno. Pomozite mi molitvom, dječice, da Sotona ne prevlada...',
    themes: ['Peace', 'Outbreak of War', 'Fasting', 'God\'s Commandments', 'Protection of Poor'],
    spiritualReflection: 'Given hours after war erupted in Eastern Europe in February 2022. Our Lady identifies fear, hate, and death as Satanic forces, calling the Church to immediate fasting and defensive intercession.',
    scriptureAnchor: {
      citation: 'Psalm 46:1',
      text: '"God is our refuge and strength, a very present help in trouble."'
    }
  },
  {
    id: 'medj-2021-12-25',
    date: '2021-12-25',
    displayDate: 'December 25, 2021 (Christmas Message)',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Christmas Message to the World',
    seerType: 'monthly-world',
    title: 'Be Witnesses of Hope and the Light of the Newborn King',
    messageText: 'Dear children! Today I am bringing to you my Son Jesus for Him to give you His peace. Little children, without peace you do not have joy, hope or salvation. Therefore, return to prayer, because prayer is the key to peace. Open your hearts and give time to God so that He may be your friend. When a friendship with God grows, no storm can shake you. I bless you with my motherly blessing. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! Danas vam nosim svog Sina Isusa da vam dade Svoj mir...',
    themes: ['Christmas', 'Friendship with God', 'Peace', 'Hope'],
    spiritualReflection: 'True peace is rooted in personal friendship with Jesus Christ. When prayer nurtures this friendship, soul stability is maintained even in the midst of global crises.',
    scriptureAnchor: {
      citation: 'John 15:15',
      text: '"No longer do I call you servants... but I have called you friends, for all that I have heard from my Father I have made known to you."'
    }
  },
  {
    id: 'medj-2021-06-25',
    date: '2021-06-25',
    displayDate: 'June 25, 2021 (40th Anniversary Jubilee of Apparitions)',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: '40th Anniversary Jubilee Message to the Parish and the World',
    seerType: 'monthly-world',
    title: '40 Years of Grace: My Heart Rejoices with You',
    messageText: 'Dear children! My heart is joyful because through all these years I see your love and response to my call. Today I am calling all of you: pray with me for peace and freedom, because Satan is strong and by his deception wants to lead away as many hearts as possible from my motherly heart. Therefore, decide for God so that it may be well with you on the earth which God gave you. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! Moje srce je radosno jer kroz sve ove godine vidim vašu ljubav...',
    themes: ['40th Anniversary', 'Jubilee', 'Freedom', 'Motherly Heart', 'Peace'],
    spiritualReflection: 'Marking 40 years—the biblical length of Israel’s journey through the desert. Mary calls us to choose freedom in God rather than the deceptive slavery offered by modern culture.',
    scriptureAnchor: {
      citation: 'Galatians 5:1',
      text: '"For freedom Christ has set us free; stand firm therefore, and do not submit again to a yoke of slavery."'
    }
  },
  {
    id: 'medj-2021-03-25',
    date: '2021-03-25',
    displayDate: 'March 25, 2021 (Feast of the Annunciation)',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message on the Feast of the Annunciation',
    seerType: 'monthly-world',
    title: 'Return to God, His Commandments, and Holy Scripture',
    messageText: 'Dear children! In this time of grace, I am calling you to return to God and to prayer. Little children, put Holy Scripture in a visible place in your family, read it, and live it. Teach your children, because if you are not an example for them, children will fall into godlessness. Reflect and pray, and God will be born in your heart and your heart will be joyful. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! U ovom milosnom vremenu pozivam vas na povratak Bogu i molitvi...',
    themes: ['Annunciation', 'Holy Scripture', 'Children', 'Family Example'],
    spiritualReflection: 'Parents are the primary catechists of their children. By reading the Bible as a family and living according to God\'s commandments, parents build an indestructible spiritual foundation.',
    scriptureAnchor: {
      citation: 'Deuteronomy 6:6-7',
      text: '"And these words that I command you today shall be on your heart. You shall teach them diligently to your children, and shall talk of them when you sit in your house, and when you walk by the way."'
    }
  },
  {
    id: 'medj-2020-11-25',
    date: '2020-11-25',
    displayDate: 'November 25, 2020',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message to the Parish and the World',
    seerType: 'monthly-world',
    title: 'Do Not Allow Fear to Paralyze Your Faith and Hope',
    messageText: 'Dear children! This is a time of love, warmth, prayer and joy. Pray, little children, for little Jesus to be born in your hearts. Open your hearts to Jesus who gives Himself to each of you. God sent me to be joy and hope for you in this time, and I am saying to you: without God you do not have peace or hope; therefore, return to prayer. When you pray, Satan cannot touch you because you are children of God and He is watching over you. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! Ovo je vrijeme ljubavi, topline, molitve i radosti...',
    themes: ['Hope', 'Protection from Evil', 'Inner Peace', 'Trust'],
    spiritualReflection: 'In times of widespread fear and disease, Mary reminds us that those who take shelter under God\'s wings are protected from spiritual destruction.',
    scriptureAnchor: {
      citation: 'Psalm 91:4',
      text: '"He will cover you with his pinions, and under his wings you will find refuge; his faithfulness is a shield and buckler."'
    }
  },
  {
    id: 'medj-2020-08-25',
    date: '2020-08-25',
    displayDate: 'August 25, 2020',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message to the Parish and the World',
    seerType: 'monthly-world',
    title: 'Pray for Peace and Holy Mass as the Heart of Your Day',
    messageText: 'Dear children! This is a time of grace. I am with you and anew I am calling you, little children: return to God and to prayer until prayer becomes joy for you. Little children, you do not have a future or peace until your life begins with personal conversion and a change to the good. Evil will cease and peace will begin to reign in your hearts and in the world. Therefore, little children, pray, pray, pray. May the Holy Mass be for you not a habit, but life. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! Ovo je vrijeme milosti. S vama sam i iznova vas pozivam, dječice...',
    themes: ['Holy Mass', 'Conversion', 'Peace', 'Joy of Prayer'],
    spiritualReflection: 'Personal conversion is the engine of global renewal. When Holy Mass is celebrated not out of dry habit, but with incandescent love, the powers of darkness retreat.',
    scriptureAnchor: {
      citation: 'Romans 12:2',
      text: '"Do not be conformed to this world, but be transformed by the renewal of your mind, that by testing you may discern what is the will of God, what is good and acceptable and perfect."'
    }
  },
  {
    id: 'medj-2020-03-25',
    date: '2020-03-25',
    displayDate: 'March 25, 2020 (Given at the Start of Global Lockdowns)',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message at Outbreak of Global Pandemic and Lockdowns',
    seerType: 'monthly-world',
    title: 'I Am with You in Your Trials: Pray with the Heart',
    messageText: 'Dear children! I am with you all these years to lead you to the way of salvation. Return to my Son; return to prayer and fasting. Little children, permit God to speak to your heart, because Satan reigns and wants to destroy your lives and the earth on which you walk. Be courageous and decide for holiness. You will see conversion in your hearts and in your families; prayer will be heard; God will hear your cries and give you peace. I am with you and am blessing you all with my motherly blessing. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! S vama sam sve ove godine da vas vodim na put spasenja...',
    themes: ['Global Trials', 'Fasting', 'Courage', 'Decide for Holiness'],
    spiritualReflection: 'Given on March 25, 2020 as churches closed worldwide. Our Lady urged faithful not to fall into despair or fear, but to turn every home into an altar of prayer and fasting.',
    scriptureAnchor: {
      citation: '2 Chronicles 7:14',
      text: '"If my people who are called by my name humble themselves, and pray and seek my face and turn from their wicked ways, then I will hear from heaven and will forgive their sin and heal their land."'
    }
  },
  {
    id: 'medj-2020-03-18',
    date: '2020-03-18',
    displayDate: 'March 18, 2020 (Final Announcement of 2nd of Month Apparitions)',
    seerName: 'Mirjana Dragićević-Soldo',
    seerTitle: 'Annual Apparition Message and Final 2nd of the Month Apparition',
    seerType: 'annual',
    title: 'My Son Has Promised Me That Evil Will Not Triumph',
    messageText: 'Dear children, my Son, as God, always looked beyond time. I, as His mother, through Him, see through time. I see beautiful and sorrowful things. But I see that love is still present, and that it needs to be made known. My children, you cannot be happy if you do not love one another, if you do not have love in every situation and in every moment of your life. And I, as a mother, am coming to you through love—to help you to come to know true love, to come to know my Son. That is why I am calling you to thirst anew for love, faith and hope. The only source from which you can drink is trust in God, my Son. My children, in times of unrest and renunciation, you just seek the face of my Son. You just live His words and do not be afraid. Pray and love. My children, do not be afraid, for I am with you. Thank you.',
    originalCroatianExcerpt: 'Draga djeco, Moj Sin kao Bog je uvijek gledao iznad vremena...',
    themes: ['Love', 'Trust in God', 'Do Not Be Afraid', 'Triumph of Love'],
    spiritualReflection: 'In this historical message, Mirjana received the final monthly 2nd of the month apparition (which began in 1987 for non-believers). Our Lady left a perpetual legacy of trust: "Do not be afraid, for I am with you."',
    scriptureAnchor: {
      citation: 'John 16:33',
      text: '"I have said these things to you, that in me you may have peace. In the world you will have tribulation. But take heart; I have overcome the world."'
    }
  },
  {
    id: 'medj-1981-06-26',
    date: '1981-06-26',
    displayDate: 'June 26, 1981 (Cornerstone Message)',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'The Historical Cornerstone Message of the Queen of Peace',
    seerType: 'monthly-world',
    title: 'Peace, Peace, Peace! Be Reconciled with God',
    messageText: 'Mir, mir, mir—i samo mir! Mir mora zavladati između Boga i čovjeka i između ljudi!\n\n"Peace, peace, peace—and only peace! Peace must reign between God and man, and between men!"\n\n(Our Lady appeared with tears in her eyes on Apparition Hill beneath a luminous Cross, revealing her title: The Queen of Peace / Kraljica Mira).',
    originalCroatianExcerpt: 'Mir, mir, mir—i samo mir! Mir mora zavladati između Boga i čovjeka i između ljudi!',
    themes: ['Peace', 'Reconciliation', 'Cornerstone', 'Tears of Mary'],
    spiritualReflection: 'The inaugural and foundational charter of Medjugorje. Mary reveals that external peace among nations is impossible without interior reconciliation with God through confession and humility.',
    scriptureAnchor: {
      citation: '2 Corinthians 5:20',
      text: '"We implore you on behalf of Christ, be reconciled to God."'
    }
  },
  {
    id: 'medj-2015-08-25',
    date: '2015-08-25',
    displayDate: 'August 25, 2015',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message to the World',
    seerType: 'monthly-world',
    title: 'Pray for My Intentions and Seek God in Freedom',
    messageText: 'Dear children! Also today I am calling you to be prayer. May prayer be for you the wings for an encounter with God. The world is in a moment of trial, because it forgot and abandoned God. Therefore you, little children, be those who seek and love God above all. I am with you and I am leading you to my Son, but you must say your "yes" in the freedom of the children of God. I intercede for you and I love you, little children, with an endless love. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! I danas vas pozivam da budete molitva. Neka vam molitva bude krila za susret s Bogom...',
    themes: ['Prayer with the Heart', 'Freedom', 'Endless Love', 'Intercession'],
    spiritualReflection: 'Prayer gives spiritual wings to the soul. In a world burdened by materialism, Mary calls us to freely give our consent to God.',
    scriptureAnchor: {
      citation: '2 Corinthians 3:17',
      text: '"Now the Lord is the Spirit, and where the Spirit of the Lord is, there is freedom."'
    }
  },
  {
    id: 'medj-2010-03-02',
    date: '2010-03-02',
    displayDate: 'March 2, 2010',
    seerName: 'Mirjana Dragićević-Soldo',
    seerTitle: '2nd of the Month Apparition Message for Non-Believers',
    seerType: 'second-of-month',
    title: 'Apostles of My Love: Do Not Condemn, But Love',
    messageText: 'Dear children! In this special time, as I am looking at your faces, my heart is filled with love for you and my Son. I desire to lead you closer to Him. I am calling you to open your hearts, to live the Gospel with fervor, and to pray for those who have not known God\'s love. Do not judge, do not condemn, but love and forgive, so that my Son\'s light may shine through you into the world. Thank you.',
    originalCroatianExcerpt: 'Draga djeco! U ovom posebnom vremenu, dok gledam vaša lica...',
    themes: ['Apostles of Love', 'Non-Believers', 'Forgiveness', 'Gospel Light'],
    spiritualReflection: 'Mirjana received the monthly 2nd of the month message dedicated to praying for non-believers. Mary calls us to be soft-hearted apostles of mercy who reflect Christ\'s unconditional love.',
    scriptureAnchor: {
      citation: 'John 13:35',
      text: '"By this all people will know that you are my disciples, if you have love for one another."'
    }
  },
  {
    id: 'medj-2005-06-25',
    date: '2005-06-25',
    displayDate: 'June 25, 2005 (24th Anniversary)',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: '24th Anniversary Message to the World',
    seerType: 'monthly-world',
    title: 'Live the Sacraments and Put Holy Mass in First Place',
    messageText: 'Dear children! Today, thanking God for all that He has given you, I bless you with my motherly blessing. In a special way, little children, I call you to live the Sacraments. Put Holy Mass in the first place in your families. May your life be a continuous prayer for peace. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! Danas zahvaljujući Bogu na svemu što vam je dao...',
    themes: ['Holy Mass', 'Sacraments', 'Family Prayer', 'Gratitude'],
    spiritualReflection: 'The Sacraments are the streams of divine life given to the Catholic Church. Mary asks families to build their week around Holy Mass.',
    scriptureAnchor: {
      citation: 'Acts 2:42',
      text: '"And they devoted themselves to the apostles\' teaching and the fellowship, to the breaking of bread and the prayers."'
    }
  },
  {
    id: 'medj-2001-09-25',
    date: '2001-09-25',
    displayDate: 'September 25, 2001 (Given After September 11 Events)',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message Following Global Crisis',
    seerType: 'monthly-world',
    title: 'Fast and Pray for Peace in this Dark Hour',
    messageText: 'Dear children! Also today I call you to prayer, especially today when Satan wants to create war and hatred. I call you anew, little children: pray and fast so that God may give you peace. Witness peace to everyone and be carriers of peace in this world without peace. I am with you and intercede before God for each of you. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! I danas vas pozivam na molitvu, posebno danas kad Sotona želi stvoriti rat i mržnju...',
    themes: ['Global Crisis', 'Fasting', 'Spiritual Warfare', 'Carriers of Peace'],
    spiritualReflection: 'Given two weeks after 9/11 as the world teetered on war. Our Lady summoned believers to fast and pray as the only divine remedy capable of defeating hatred.',
    scriptureAnchor: {
      citation: '2 Corinthians 10:4',
      text: '"For the weapons of our warfare are not of the flesh but have divine power to destroy strongholds."'
    }
  },
  {
    id: 'medj-2000-01-25',
    date: '2000-01-25',
    displayDate: 'January 25, 2000 (Great Jubilee Year 2000)',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Message for the Great Jubilee Year 2000',
    seerType: 'monthly-world',
    title: 'Decide for God in the Great Jubilee Year',
    messageText: 'Dear children! I call you, little children, to unceasing prayer. If you pray, you are closer to God and He will lead you on the way of peace and salvation. Therefore, I call you today to give time to God. Decide for God in this Holy Year. May Holy Mass and Confession be your daily and monthly strength. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! Pozivam vas, dječice, na neprestanu molitvu...',
    themes: ['Jubilee 2000', 'Decide for God', 'Confession', 'Unceasing Prayer'],
    spiritualReflection: 'Entering the new millennium, Mary urged the faithful to make a decisive choice for Jesus Christ through monthly Confession and fervent Holy Mass.',
    scriptureAnchor: {
      citation: 'Hebrews 3:15',
      text: '"Today, if you hear his voice, do not harden your hearts as in the rebellion."'
    }
  },
  {
    id: 'medj-1995-12-25',
    date: '1995-12-25',
    displayDate: 'December 25, 1995 (Christmas Message)',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Christmas Message on Holy Scripture in the Family',
    seerType: 'monthly-world',
    title: 'Put Holy Scripture in a Visible Place in Your Home',
    messageText: 'Dear children! Today I rejoice with you and I bring you little Jesus so that He may give you His peace. I invite you, little children, to be carriers of peace. Put Holy Scripture in a visible place in your families, read it every day, and let God’s Word guide your steps. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! Danas se radujem s vama i nosim vam malog Isusa...',
    themes: ['Christmas', 'Holy Bible', 'Family Word', 'Prince of Peace'],
    spiritualReflection: 'Placing the Holy Bible prominently in the living room reminds every family member to feast daily on God\'s Word.',
    scriptureAnchor: {
      citation: 'Colossians 3:16',
      text: '"Let the word of Christ dwell in you richly, teaching and admonishing one another in all wisdom."'
    }
  },
  {
    id: 'medj-1991-08-25',
    date: '1991-08-25',
    displayDate: 'August 25, 1991 (Outbreak of Balkan War and Fatima Plan)',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Historic Message at Outbreak of War and Fatima Fulfillment',
    seerType: 'monthly-world',
    title: 'Satan Wants to Destroy Peace, Nature, and the Planet',
    messageText: 'Dear children! Today again I invite you to prayer, now as never before, when my plan has begun to be realized. Satan is strong and wants to sweep away my plans of peace and joy and make you think that my Son is not strong in His decisions. Therefore, I call you, little children, to pray and fast even more firmly. I invite you to renunciation for nine days, so that with your help everything I wanted to realize through the secrets I began in Fatima may be fulfilled. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! Danas vas iznova pozivam na molitvu, sada kao nikada prije...',
    themes: ['Fatima Secrets', 'Fasting Novena', 'Outbreak of War', 'Spiritual Warfare'],
    spiritualReflection: 'Given in August 1991 as war erupted in Yugoslavia and the USSR collapsed. Our Lady explicitly linked Medjugorje to the fulfillment of the secrets of Fatima.',
    scriptureAnchor: {
      citation: 'Revelation 12:17',
      text: '"Then the dragon became furious with the woman and went off to make war on the rest of her offspring, on those who keep the commandments of God and hold to the testimony of Jesus."'
    }
  },
  {
    id: 'medj-1987-01-25',
    date: '1987-01-25',
    displayDate: 'January 25, 1987 (Inaugural 25th of Month Message)',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Historical First 25th of the Month Message to the World',
    seerType: 'monthly-world',
    title: 'Start Living a New Life Today: Surrender Your Heart to God',
    messageText: 'Dear children! Today I want to call you to start living a new life today. Dear children, I want you to understand that God has chosen each of you, in order to use you in a great plan for the salvation of mankind. You cannot understand how great your role is in God’s design. Therefore, dear children, pray so that in prayer you may come to know what you are to do according to God’s plan. I am with you so that you may be able to realize it all. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! Danas vas želim pozvati da od danas počnete živjeti novi život...',
    themes: ['First Monthly Message', 'Salvation Plan', 'New Life', 'Vocation'],
    spiritualReflection: 'The historic inaugural message initiating the monthly 25th of the month series. Mary reveals that every single human soul plays an irreplaceable role in God\'s salvation plan.',
    scriptureAnchor: {
      citation: 'Ephesians 2:10',
      text: '"For we are his workmanship, created in Christ Jesus for good works, which God prepared beforehand, that we should walk in them."'
    }
  },
  {
    id: 'medj-1984-08-05',
    date: '1984-08-05',
    displayDate: 'August 5, 1984 (2000th Birthday of Our Lady)',
    seerName: 'Jelena Vasilj and Parish Seers',
    seerTitle: 'Special Revelation on Our Lady’s 2000th Birthday',
    seerType: 'special-intention',
    title: 'The 2000th Anniversary of My Birth: Prepare with 3 Days of Fasting',
    messageText: 'The Virgin Mary revealed to Jelena Vasilj and the parish that August 5, 1984 was the bimillennial 2000th anniversary of her birth:\n\n"The second millennium of my birth will be celebrated on August 5, 1984. For that day God allows me to give you special graces and to give the world a special blessing. I ask you to prepare yourselves intensively for three days with fasting and continuous prayer. On that day do not work, but take up your Rosary and pray with joy."',
    originalCroatianExcerpt: 'Drugi milenij moga rođenja slavit će se 5. kolovoza 1984...',
    themes: ['2000th Birthday of Mary', 'Fasting', 'Rosary', 'Special Graces'],
    spiritualReflection: 'Marking 2000 years since the birth of Mary, the Mother of God. Millions prepared with 3 days of fasting on bread and water, experiencing unprecedented peace and tearful reconciliations.',
    scriptureAnchor: {
      citation: 'Luke 1:48',
      text: '"For behold, from now on all generations will call me blessed."'
    }
  },
  {
    id: 'medj-1984-03-01',
    date: '1984-03-01',
    displayDate: 'March 1, 1984 (First Weekly Message to Parish)',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Inaugural Message Initiating Weekly Parish Messages',
    seerType: 'monthly-world',
    title: 'I Have Chosen This Parish in a Special Way',
    messageText: 'Dear children! I have chosen this parish in a special way and I wish to lead it. I am guarding it in love and I want everyone to be mine. Thank you for coming here this evening. I wish you to be with me and my Son in ever greater numbers. Every Thursday I shall give a special message for you. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! Ja sam ovu župu izabrala na poseban način i želim je voditi...',
    themes: ['Inaugural Message', 'Parish Vocation', 'Maternal Guarding'],
    spiritualReflection: 'Our Lady chose St. James Parish in Medjugorje as an oasis of prayer and a spiritual beacon for the entire world.',
    scriptureAnchor: {
      citation: '1 Peter 2:9',
      text: '"But you are a chosen race, a royal priesthood, a holy nation, a people for his own possession, that you may proclaim the excellencies of him who called you out of darkness into his marvelous light."'
    }
  },
  {
    id: 'medj-1981-10-01',
    date: '1981-10-01',
    displayDate: 'October 1, 1981 (Early Apparition Revelation)',
    seerName: 'All Six Visionaries',
    seerTitle: 'Early Apparition Revelation on Power of Fasting',
    seerType: 'special-intention',
    title: 'Fasting and Prayer Can Suspend Laws of Nature and Stop Wars',
    messageText: 'In the early months of the apparitions on Podbrdo, Our Lady declared to the six children:\n\n"Fasting and prayer can stop wars; fasting and prayer can suspend the laws of nature. Severe fasting on bread and water can accomplish miracles that seem impossible to human strength."',
    originalCroatianExcerpt: 'Postom i molitvom mogu se zaustaviti ratovi i suspendirati prirodni zakoni...',
    themes: ['Fasting on Bread and Water', 'Suspending Natural Laws', 'Stopping Wars', 'Miracles'],
    spiritualReflection: 'One of the most famous declarations of Medjugorje. Our Lady reveals that fasting on bread and water on Wednesdays and Fridays releases divine power that surpasses natural human limitations.',
    scriptureAnchor: {
      citation: 'Joel 2:12',
      text: '"Yet even now, declares the Lord, return to me with all your heart, with fasting, with weeping, and with mourning."'
    }
  },
  {
    id: 'medj-1981-06-25',
    date: '1981-06-25',
    displayDate: 'June 25, 1981 (First Day All Six Seers Gathered)',
    seerName: 'Ivanka, Mirjana, Vicka, Ivan, Marija, Jakov',
    seerTitle: 'First Apparition to All Six Visionaries on Apparition Hill',
    seerType: 'annual',
    title: 'I Am the Blessed Virgin Mary: Praise Be Jesus!',
    messageText: 'On the afternoon of June 25, 1981, the six children felt an inner pull and ran up the rocky slopes of Crnica (Podbrdo). They saw Our Lady shining with luminous glory holding the Infant Jesus in her arms. She beckoned them close. When Ivanka asked, "Who are you?", Our Lady smiled warmly and replied:\n\n"Ja sam Blažena Djevica Marija — I am the Blessed Virgin Mary! I have come because there are many true believers here. I wish to be with you to convert and reconcile the whole world. Hvaljen Isus i Marija — Praised be Jesus and Mary!"',
    originalCroatianExcerpt: 'Ja sam Blažena Djevica Marija! Došla sam jer ovdje ima mnogo pravih vjernika...',
    themes: ['First Apparition', 'Queen of Peace', 'Conversion of World', 'Blessed Virgin'],
    spiritualReflection: 'The historic first encounter with all six children on Podbrdo. Mary reveals her identity as the Blessed Virgin Mary come to lead humanity to her Divine Son Jesus.',
    scriptureAnchor: {
      citation: 'Luke 1:28',
      text: '"And he came to her and said, Hail, full of grace, the Lord is with you!"'
    }
  }
];

