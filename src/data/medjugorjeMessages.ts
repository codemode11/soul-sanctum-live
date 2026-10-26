export interface MedjugorjeMessage {
  id: string;
  date: string; // YYYY-MM-DD
  displayDate: string;
  seerName: string;
  seerTitle: string;
  seerType: 'monthly-world' | 'second-of-month' | 'annual' | 'prayer-group' | 'special-intention';
  title: string;
  messageText: string;
  originalCroatianExcerpt: string;
  themes: string[];
  spiritualReflection: string;
  scriptureAnchor: {
    citation: string;
    text: string;
  };
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
    id: 'medj-2026-09-25',
    date: '2026-09-25',
    displayDate: 'September 25, 2026',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message to the Parish and the World',
    seerType: 'monthly-world',
    title: 'Good and Evil: Pray for the Triumph of Light',
    messageText: 'Dear children! In this time of grace, pray with me for the good to win in you and around you. In a special way, little children, pray united with Jesus on His Way of the Cross for humanity which has gone astray without God. Pray, little children, that your hearts may not be closed by fear or indifference. Be carriers of peace and love to everyone you meet, because God has chosen you to be His instruments in this restless world. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! U ovom milosnom vremenu molite sa mnom da dobro pobijedi u vama i oko vas...',
    themes: ['Peace', 'Prayer with the Heart', 'Way of the Cross', 'Hope', 'Apostles of Love'],
    spiritualReflection: 'Our Lady gently summons us to unite our personal sufferings to the Sorrowful Way of the Cross. When the world feels disordered and cold, prayer with the heart becomes an impenetrable shield of divine grace.',
    scriptureAnchor: {
      citation: 'Romans 12:21',
      text: '"Do not be overcome by evil, but overcome evil with good."'
    }
  },
  {
    id: 'medj-2026-08-25',
    date: '2026-08-25',
    displayDate: 'August 25, 2026',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message to the Parish and the World',
    seerType: 'monthly-world',
    title: 'Prayer for Peace in Hearts and the World',
    messageText: 'Dear children! Today my prayer with you is for peace. Good and evil are fighting and want to prevail in the world and in the hearts of people. Be people of prayer and witnesses of God’s great love. Little children, return to prayer with the heart so that God may transform you and fill you with His Holy Spirit. Do not lose hope; I am with you and I intercede before my Son Jesus for each of you. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! Danas je moja molitva s vama za mir. Dobro i zlo se bore i žele prevladati...',
    themes: ['Peace', 'Holy Spirit', 'Hope', 'Intercession'],
    spiritualReflection: 'Peace (Mir in Croatian) is the foundational greeting of the Risen Christ. Mary reminds us that the spiritual battle begins in the human heart; when our heart is at peace with God through Confession and Eucharist, peace radiates outwards to the world.',
    scriptureAnchor: {
      citation: 'John 14:27',
      text: '"Peace I leave with you; my peace I give to you. Not as the world gives do I give to you. Let not your hearts be troubled, neither let them be afraid."'
    }
  },
  {
    id: 'medj-2026-07-25',
    date: '2026-07-25',
    displayDate: 'July 25, 2026',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message to the Parish and the World',
    seerType: 'monthly-world',
    title: 'Chosen to be People of Faith and Joy',
    messageText: 'Dear children! With joy I have chosen you and I am leading you, because in you, little children, I see people of faith who seek God\'s love. Pray, little children, that your life may become a song of praise to the Creator. Open your hearts to the holy Sacraments, especially the Holy Mass. May the Holy Eucharist be your daily food and the light on your earthly journey. I am with you and I bless you with my motherly blessing. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! S radošću sam vas izabrala i vodim vas, jer u vama, dječice, vidim ljude vjere...',
    themes: ['Holy Mass', 'Holy Eucharist', 'Joy', 'Praise'],
    spiritualReflection: 'The Holy Eucharist is the fountain of eternal youth for the soul. In this message, the Queen of Peace places Holy Mass at the very center of spiritual life, urging us to approach the altar with vibrant gratitude.',
    scriptureAnchor: {
      citation: 'John 6:51',
      text: '"I am the living bread that came down from heaven. If anyone eats of this bread, he will live forever."'
    }
  },
  {
    id: 'medj-2026-06-25',
    date: '2026-06-25',
    displayDate: 'June 25, 2026 (Anniversary of Apparitions)',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: '45th Anniversary of the Apparitions of the Queen of Peace',
    seerType: 'monthly-world',
    title: '45 Years of Maternal Grace and Call to Conversion',
    messageText: 'Dear children! I rejoice with you and thank God for my presence with you, for my love and the joy with which I lead you on the path of salvation. Pray, little children, because the world is in a great crisis of faith and peace. Satan wants hatred and war; therefore, you, my little children, be my hands extended to this lost world. Fast, pray, and witness so that God may be loved and glorified. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! Radujem se s vama i zahvaljujem Bogu za moju prisutnost među vama...',
    themes: ['Anniversary', 'Conversion', 'Fasting', 'Apostles of Peace'],
    spiritualReflection: 'Commemorating the arrival of Our Lady in Medjugorje on June 24-25, 1981. Mary reveals that our fasting and prayer are God\'s appointed remedies for modern crises, transforming ordinary believers into the extended hands of Jesus.',
    scriptureAnchor: {
      citation: 'Mark 9:29',
      text: '"This kind cannot be driven out by anything but prayer and fasting."'
    }
  },
  {
    id: 'medj-2026-05-25',
    date: '2026-05-25',
    displayDate: 'May 25, 2026',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message to the Parish and the World',
    seerType: 'monthly-world',
    title: 'Let Your Whole Life Become a Prayer',
    messageText: 'Dear children! In this time of grace, I am praying with you that your life may become a prayer. Little children, seek God and do not allow the material things of this world to bind your heart. Surrender your worries, your families, and your plans into God’s hands. When you pray with the heart, God gives you the wisdom to recognize what is essential for eternal life. I bless you all with my motherly blessing. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! U ovom milosnom vremenu molim s vama da vaš život postane molitva...',
    themes: ['Prayer with the Heart', 'Detachment', 'Family', 'Wisdom'],
    spiritualReflection: 'To make life a prayer means offering every thought, conversation, and duty as a fragrant sacrifice to God. Freedom from worldly attachments allows the soul to fly to heaven.',
    scriptureAnchor: {
      citation: 'Colossians 3:2',
      text: '"Set your minds on things that are above, not on things that are on earth."'
    }
  },
  {
    id: 'medj-2026-04-25',
    date: '2026-04-25',
    displayDate: 'April 25, 2026',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message to the Parish and the World',
    seerType: 'monthly-world',
    title: 'Overcoming Darkness with Prayer and Forgiveness',
    messageText: 'Dear children! I am with you to tell you that I love you and to encourage you to prayer; because Satan is strong and every day his strength is stronger through those who have chosen death and hatred. You, little children, be prayer, be my extended hands of love for all those who are in darkness and seek the light of God’s salvation. Forgive, love, and pray for your enemies, so that in your hearts there may be only room for Jesus. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! S vama sam da vam kažem da vas volim i potičem na molitvu...',
    themes: ['Forgiveness', 'Love', 'Spiritual Warfare', 'Light'],
    spiritualReflection: 'Echoing Christ’s Sermon on the Mount, Mary calls us to the heroic Gospel virtue of loving our enemies and forgiving from the heart. True spiritual strength lies in humility and forgiveness.',
    scriptureAnchor: {
      citation: 'Matthew 5:44',
      text: '"Love your enemies and pray for those who persecute you, so that you may be sons of your Father who is in heaven."'
    }
  },
  {
    id: 'medj-2026-03-25',
    date: '2026-03-25',
    displayDate: 'March 25, 2026 (Feast of the Annunciation)',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message on the Feast of the Annunciation',
    seerType: 'monthly-world',
    title: 'United with Jesus on His Way of the Cross',
    messageText: 'Dear children! In this time of grace, pray with me that good may win in you and around you. In a special way, little children, pray united with Jesus on His Way of the Cross. Put in your prayers this humanity which is wandering without God and without His love. Be prayer, be light, and witnesses to everyone you meet, little children, so that the merciful God may have mercy on you. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! U ovom milosnom vremenu molite sa mnom da dobro pobijedi u vama i oko vas...',
    themes: ['Annunciation', 'Way of the Cross', 'Divine Mercy', 'Witness'],
    spiritualReflection: 'Given on the solemnity of Mary\'s "Fiat" (Annunciation). Like Mary standing faithfully at the foot of the Cross, we are called to stand with Jesus for the salvation of our brothers and sisters.',
    scriptureAnchor: {
      citation: 'Luke 1:38',
      text: '"Behold, I am the handmaid of the Lord; let it be to me according to your word."'
    }
  },
  {
    id: 'medj-2026-03-18',
    date: '2026-03-18',
    displayDate: 'March 18, 2026',
    seerName: 'Mirjana Dragićević-Soldo',
    seerTitle: 'Annual Apparition Message to Mirjana',
    seerType: 'annual',
    title: 'Apostles of My Love: Do Not Be Afraid',
    messageText: 'Dear children, by the merciful love of God, I am with you. And that is why, as a mother, I call you to believe in love—the love that is union with my Son. With love you achieve everything, even what you think is impossible. My children, look at the Cross and see how much Jesus loved you; He gave His life so that you may have life eternal. Pray that you may understand this mystery of love. Do not be afraid; open your hearts, and let my Son reign in them. Thank you.',
    originalCroatianExcerpt: 'Draga djeco, po milosrdnoj ljubavi Božjoj ja sam s vama...',
    themes: ['Love', 'The Cross', 'Trust', 'Eternal Life'],
    spiritualReflection: 'Mirjana receives an apparition every year on March 18. Mary points every heart toward the Holy Cross as the supreme school of love where fear is dissolved in the ocean of divine mercy.',
    scriptureAnchor: {
      citation: '1 John 4:18',
      text: '"There is no fear in love, but perfect love casts out fear."'
    }
  },
  {
    id: 'medj-2025-12-25',
    date: '2025-12-25',
    displayDate: 'December 25, 2025 (Nativity of Our Lord)',
    seerName: 'Jakov Čolo',
    seerTitle: 'Annual Christmas Apparition Message to Jakov',
    seerType: 'annual',
    title: 'I Bring You Little Jesus, King of Peace',
    messageText: 'Dear children, today with little Jesus in my arms, I invite you to open your hearts to Him. He is the Prince of Peace, the One who alone can give true peace to your weary hearts and to your families. Do not seek peace in the passing things of this world; seek it on your knees before the tabernacle. Receive Jesus in Holy Communion with clean hearts, and allow Him to be born anew in you today. Thank you for responding to my call.',
    originalCroatianExcerpt: 'Draga djeco, danas s malim Isusom u naručju pozivam vas da Mu otvorite svoja srca...',
    themes: ['Christmas', 'Eucharist', 'Prince of Peace', 'Family'],
    spiritualReflection: 'Our Lady appeared with the Infant Jesus in her arms. She reminds us that peace is not an abstract concept or treaty; Peace is a Divine Person: Jesus Christ in the Holy Eucharist.',
    scriptureAnchor: {
      citation: 'Isaiah 9:6',
      text: '"For to us a child is born, to us a son is given... and his name shall be called Wonderful Counselor, Mighty God, Everlasting Father, Prince of Peace."'
    }
  },
  {
    id: 'medj-2025-11-25',
    date: '2025-11-25',
    displayDate: 'November 25, 2025',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message to the Parish and the World',
    seerType: 'monthly-world',
    title: 'Open Your Hearts to the Beauty of Holiness and Gratitude',
    messageText: 'Dear children! In this time of grace, I am calling you to prayer. Pray, little children, that your life may become a continuous act of thanksgiving to God for everything He gives you. Do not allow worldly anxieties to rob you of joy. When you pray with the heart, your soul is filled with divine light and Satan has no power over you. Be messengers of my peace to all who suffer. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! U ovom milosnom vremenu pozivam vas na molitvu...',
    themes: ['Gratitude', 'Prayer with the Heart', 'Light', 'Peace'],
    spiritualReflection: 'Gratitude is the antidote to spiritual fatigue. When we thank God for every breath and cross, our eyes open to see His infinite providence directing our life.',
    scriptureAnchor: {
      citation: '1 Thessalonians 5:18',
      text: '"Give thanks in all circumstances; for this is the will of God in Christ Jesus for you."'
    }
  },
  {
    id: 'medj-2025-08-25',
    date: '2025-08-25',
    displayDate: 'August 25, 2025',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message to the Parish and the World',
    seerType: 'monthly-world',
    title: 'Be Transformed in the Silence of Eucharistic Adoration',
    messageText: 'Dear children! I am calling you to be prayer for all those who do not pray; to be joy for all those who do not see a way out; to be light in the darkness of this time. Pray, little children, and spend time in silent adoration before Jesus in the Blessed Sacrament. There He will transform your heart, heal your wounds, and give you strength to overcome every obstacle. I am with you and I bless you. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! Pozivam vas da budete molitva za sve one koji ne mole...',
    themes: ['Eucharist', 'Adoration', 'Silence', 'Healing'],
    spiritualReflection: 'Silent adoration before the Sacred Host is the school of divine transformation. Before the tabernacle, the soul loses its self-centered burdens and absorbs Christ\'s gentle humility.',
    scriptureAnchor: {
      citation: '2 Corinthians 3:18',
      text: '"And we all, with unveiled face, beholding the glory of the Lord, are being transformed into the same image from one degree of glory to another."'
    }
  },
  {
    id: 'medj-2025-06-25',
    date: '2025-06-25',
    displayDate: 'June 25, 2025 (44th Anniversary of Apparitions)',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: '44th Anniversary Message to the World',
    seerType: 'monthly-world',
    title: 'Thank God for the Abundance of Divine Grace and Conversions',
    messageText: 'Dear children! My heart is full of joy because through all these years I see your response and your love for my call. Today I invite you: be prayer, be my extended hands of peace to this world which is perishing without God. Fast, pray, and return to the Sacraments. May Holy Mass be the crown of your week and the source of your daily joy. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! Moje srce je puno radosti jer kroz sve ove godine vidim vaš odaziv...',
    themes: ['Anniversary', 'Holy Mass', 'Sacraments', 'Apostles of Peace'],
    spiritualReflection: 'Celebrating 44 years of Marian apparitions. Our Lady reminds us that her long presence is a testament to God\'s incredible patience and desire that no soul be lost.',
    scriptureAnchor: {
      citation: '2 Peter 3:9',
      text: '"The Lord is not slow to fulfill his promise as some count slowness, but is patient toward you, not wishing that any should perish, but that all should reach repentance."'
    }
  },
  {
    id: 'medj-2025-03-25',
    date: '2025-03-25',
    displayDate: 'March 25, 2025 (Feast of the Annunciation)',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message on the Feast of the Annunciation',
    seerType: 'monthly-world',
    title: 'Prayer with the Heart is the Key to Peace in Families',
    messageText: 'Dear children! In this time of grace, pray with me for peace, because Satan wants to destroy everything that is holy in you and in your families. Little children, pray until prayer becomes your life. Put Holy Scripture in a visible place in your family, read it together, and let God’s Word guide your steps. May the Holy Eucharist be the sun of your life. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! U ovom milosnom vremenu molite sa mnom za mir...',
    themes: ['Annunciation', 'Family', 'Holy Scripture', 'Eucharist'],
    spiritualReflection: 'Given on the Annunciation, Mary\'s message reinforces two of her Five Stones: daily reading of the Bible in the home and centeredness on Holy Mass.',
    scriptureAnchor: {
      citation: 'Psalm 119:105',
      text: '"Your word is a lamp to my feet and a light to my path."'
    }
  },
  {
    id: 'medj-2024-10-25',
    date: '2024-10-25',
    displayDate: 'October 25, 2024',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message to the Parish and the World',
    seerType: 'monthly-world',
    title: 'Pray with the Saints and Witness God’s Boundless Love',
    messageText: 'Dear children! In this time, when you are celebrating the day of All Saints and remembering your dear deceased, I invite you: pray, little children, so that your life may become a continuous witness of love and hope. Pray for those who do not have peace in their hearts and who do not know the love of God. God desires to work through each of you. Open your hearts to His Holy Spirit and do not fear the trials of this world. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! U ovom vremenu kada slavite Dan Svih Svetih i spominjete se svojih dragih pokojnih...',
    themes: ['All Saints', 'Witness', 'Holy Spirit', 'Hope', 'Eternal Life'],
    spiritualReflection: 'Following the Vatican’s "Nihil Obstat" decree, Our Lady encourages us to unite with the communion of saints. Sanctity is not reserved for the few, but is the universal Catholic calling of every baptized believer.',
    scriptureAnchor: {
      citation: '1 Thessalonians 4:14',
      text: '"For since we believe that Jesus died and rose again, even so, through Jesus, God will bring with him those who have fallen asleep."'
    }
  },
  {
    id: 'medj-2024-09-25',
    date: '2024-09-25',
    displayDate: 'September 25, 2024 (Following Vatican Nihil Obstat)',
    seerName: 'Marija Pavlović-Lunetti',
    seerTitle: 'Monthly Message Following the Holy See Decree on Medjugorje',
    seerType: 'monthly-world',
    title: 'Return to Prayer with the Heart and the Holy Eucharist',
    messageText: 'Dear children! Out of love for you, God has sent me among you, to love you and encourage you to prayer. Little children, return to prayer with the heart, because when you pray with the heart, the ice melts in your souls and every anxiety disappears. Be carriers of peace in this world without peace. Worship Jesus in the Most Blessed Sacrament of the Altar; let Him be your strength, your peace, and your eternal consolation. Thank you for having responded to my call.',
    originalCroatianExcerpt: 'Draga djeco! Iz ljubavi prema vama Bog me poslao među vas, da vas ljubim i potičem na molitvu...',
    themes: ['Holy Eucharist', 'Adoration', 'Vatican Decree', 'Peace', 'Prayer with the Heart'],
    spiritualReflection: 'Issued six days after the Holy See granted "Nihil Obstat" to Medjugorje. Mary directs all eyes not to herself, but to Jesus present in the Blessed Sacrament on the altar.',
    scriptureAnchor: {
      citation: 'Matthew 11:28',
      text: '"Come to me, all who labor and are heavy laden, and I will give you rest."'
    }
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

