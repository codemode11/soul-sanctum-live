import { CatholicWisdom, WisdomCategory } from '../types';

export const CATHOLIC_WISDOM_DATABASE: CatholicWisdom[] = [
  // Early Church Fathers
  {
    id: 'wisdom-ignatius-1',
    author: 'St. Ignatius of Antioch',
    authorTitle: 'Apostolic Father and Bishop of Antioch',
    authorLifespan: 'c. 35 - 108 AD',
    category: 'Fathers',
    sourceWork: 'Epistle to the Smyrnaeans, 8',
    theme: 'Eucharist',
    quote: 'They abstain from the Eucharist and from prayer, because they confess not the Eucharist to be the flesh of our Savior Jesus Christ, which suffered for our sins, and which the Father, of His goodness, raised up again.',
    reflection: 'From the immediate disciples of the Apostles, the Church has unbrokenly held that the Eucharist is not a symbol, but the literal Flesh and Blood of our Crucified and Risen Lord.'
  },
  {
    id: 'wisdom-justin-martyr-1',
    author: 'St. Justin Martyr',
    authorTitle: 'Philosopher and Martyr',
    authorLifespan: '100 - 165 AD',
    category: 'Fathers',
    sourceWork: 'First Apology, 66',
    theme: 'Eucharist',
    quote: 'For not as common bread and common drink do we receive these; but in like manner as Jesus Christ our Savior, having been made flesh by the Word of God, had both flesh and blood for our salvation, so likewise have we been taught that the food which is blessed by the prayer of His word is the flesh and blood of that Jesus who was made flesh.',
    reflection: 'In the year 155 AD, St. Justin defended the Catholic Mass before the pagan Roman Emperor Antoninus Pius.'
  },
  {
    id: 'wisdom-irenaeus-1',
    author: 'St. Irenaeus of Lyons',
    authorTitle: 'Bishop, Martyr, Doctor of Unity',
    authorLifespan: '130 - 202 AD',
    category: 'Fathers',
    sourceWork: 'Against Heresies, Book IV, 20:7',
    theme: 'Faith and Hope',
    quote: 'The glory of God is a human being fully alive; and the life of man consists in beholding God.',
    reflection: 'True sanctity does not crush human nature; it elevates and transfigures it in the splendor of divine grace.'
  },
  {
    id: 'wisdom-augustine-1',
    author: 'St. Augustine of Hippo',
    authorTitle: 'Bishop and Doctor of Grace',
    authorLifespan: '354 - 430 AD',
    category: 'Fathers',
    sourceWork: 'Confessions, Book I',
    theme: 'Prayer and Silence',
    quote: 'You have made us for Yourself, O Lord, and our hearts are restless until they find rest in You.',
    reflection: 'No earthly pleasure, prestige, or wealth can satisfy the infinite capacity of a soul made by and for God.'
  },
  {
    id: 'wisdom-chrysostom-1',
    author: 'St. John Chrysostom',
    authorTitle: 'Archbishop of Constantinople, Doctor of the Church',
    authorLifespan: '349 - 407 AD',
    category: 'Fathers',
    sourceWork: 'Homilies on the Gospel of Matthew, Homily 50',
    theme: 'Love and Charity',
    quote: 'Do you wish to honor the Body of Christ? Do not despise Him when He is naked. Do not honor Him here in the church with silk garments while outside you leave Him to perish of cold and nakedness.',
    reflection: 'The Golden-Mouthed preacher reminds us that the Christ we receive at the altar is the same Christ who suffers in the poor.'
  },
  {
    id: 'wisdom-athanasius-1',
    author: 'St. Athanasius of Alexandria',
    authorTitle: 'Patriarch of Alexandria, Doctor of the Incarnation',
    authorLifespan: '296 - 373 AD',
    category: 'Fathers',
    sourceWork: 'On the Incarnation, 54:3',
    theme: 'Faith and Hope',
    quote: 'The Son of God became man that we might become God [by grace through divine adoption].',
    reflection: 'The mystery of the Incarnation raises fallen human nature to fellowship with the Most Holy Trinity.'
  },

  // Doctors of the Church
  {
    id: 'wisdom-aquinas-1',
    author: 'St. Thomas Aquinas',
    authorTitle: 'The Angelic Doctor',
    authorLifespan: '1225 - 1274 AD',
    category: 'Doctors',
    sourceWork: 'Summa Theologiae, III, q. 73, a. 3',
    theme: 'Eucharist',
    quote: 'O saving Victim, opening wide the gate of heaven to man below: our foes press on from every side; your aid supply, your strength bestow. Grant of your grace that we may see your face in heaven eternally.',
    reflection: 'Aquinas, the greatest intellect of Christendom, laid his theological writings before the Crucifix, saying: "Non nisi te, Domine" — Nothing but You, Lord.'
  },
  {
    id: 'wisdom-teresa-avila-1',
    author: 'St. Teresa of Jesus (of Ávila)',
    authorTitle: 'Virgin and Doctor of the Church',
    authorLifespan: '1515 - 1582 AD',
    category: 'Doctors',
    sourceWork: 'The Way of Perfection, Chapter 28',
    theme: 'Prayer and Silence',
    quote: 'Mental prayer in my opinion is nothing else than an intimate sharing between friends; it means taking time frequently to be alone with Him who we know loves us.',
    reflection: 'Prayer is not reciting empty formulas; it is entering the interior castle of the soul where Christ awaits in love.'
  },
  {
    id: 'wisdom-john-cross-1',
    author: 'St. John of the Cross',
    authorTitle: 'The Mystical Doctor',
    authorLifespan: '1542 - 1591 AD',
    category: 'Doctors',
    sourceWork: 'Sayings of Light and Love, 64',
    theme: 'Love and Charity',
    quote: 'In the evening of life, we will be judged on our love alone.',
    reflection: 'When all earthly activities cease, the only measure that endures in eternity is how selflessly we loved God and our neighbor.'
  },
  {
    id: 'wisdom-therese-lisieux-1',
    author: 'St. Thérèse of Lisieux',
    authorTitle: 'The Little Flower, Doctor of Divine Love',
    authorLifespan: '1873 - 1897 AD',
    category: 'Doctors',
    sourceWork: 'Story of a Soul, Manuscript B',
    theme: 'Humility',
    quote: 'Miss no single opportunity of making some small sacrifice, here by a smiling look, there by a kindly word; always doing the smallest right and doing it all for love.',
    reflection: 'Her Little Way opens the gates of supreme sanctity to the weakest soul through heroic faithfulness in small things.'
  },
  {
    id: 'wisdom-francis-sales-1',
    author: 'St. Francis de Sales',
    authorTitle: 'The Gentleman Saint, Doctor of Charity',
    authorLifespan: '1567 - 1622 AD',
    category: 'Doctors',
    sourceWork: 'Introduction to the Devout Life',
    theme: 'The Cross and Suffering',
    quote: 'Do not fear what may happen tomorrow. The same loving Father who cares for you today will care for you tomorrow and every day. Either He will shield you from suffering, or He will give you unfailing strength to bear it. Be at peace, then, and put aside all anxious thoughts.',
    reflection: 'Gentleness and tranquility are the hallmarks of a heart anchored securely in the Providence of God.'
  },
  {
    id: 'wisdom-catherine-siena-1',
    author: 'St. Catherine of Siena',
    authorTitle: 'Virgin and Doctor of the Church',
    authorLifespan: '1347 - 1380 AD',
    category: 'Doctors',
    sourceWork: 'The Dialogue of Divine Providence',
    theme: 'Faith and Hope',
    quote: 'Be who God meant you to be and you will set the whole world on fire.',
    reflection: 'When a soul allows the Holy Spirit to purify and enflame it, its radiance transforms history.'
  },

  // Mystics
  {
    id: 'wisdom-padre-pio-1',
    author: 'St. Padre Pio of Pietrelcina',
    authorTitle: 'Capuchin Priest and Stigmatist',
    authorLifespan: '1887 - 1968 AD',
    category: 'Mystics',
    sourceWork: 'Letters of Padre Pio',
    theme: 'Prayer and Silence',
    quote: 'Pray, hope, and don\'t worry. Worry is useless. God is merciful and will hear your prayer.',
    reflection: 'Padre Pio, who bore the wounds of Christ for fifty years, held that the Rosary is the greatest weapon for our times.'
  },
  {
    id: 'wisdom-faustina-1',
    author: 'St. Maria Faustina Kowalska',
    authorTitle: 'Apostle of Divine Mercy',
    authorLifespan: '1905 - 1938 AD',
    category: 'Mystics',
    sourceWork: 'Diary of St. Faustina, 1486',
    theme: 'Faith and Hope',
    quote: 'The greater the sinner, the greater the right he has to My mercy... When a soul approaches Me with trust, I fill it with such an abundance of graces that it cannot contain them within itself, but radiates them to other souls.',
    reflection: 'Divine Mercy is not weakness toward sin, but the triumph of sacrificial love over human brokenness.'
  },
  {
    id: 'wisdom-julian-norwich-1',
    author: 'Blessed Julian of Norwich',
    authorTitle: 'English Mystic and Anchoress',
    authorLifespan: '1342 - c. 1416 AD',
    category: 'Mystics',
    sourceWork: 'Revelations of Divine Love, Chapter 27',
    theme: 'The Cross and Suffering',
    quote: 'All shall be well, and all shall be well, and all manner of thing shall be well. He said not: "Thou shalt not be tempested, thou shalt not be travailed, thou shalt not be afflicted"; but He said: "Thou shalt not be overcome."',
    reflection: 'In Christ\'s Passion, every sorrow is given redemptive meaning and will end in everlasting glory.'
  },

  // Popes
  {
    id: 'wisdom-john-paul-ii-1',
    author: 'Pope St. John Paul II',
    authorTitle: 'Supreme Pontiff (1978 - 2005)',
    authorLifespan: '1920 - 2005 AD',
    category: 'Popes',
    sourceWork: 'Novo Millennio Ineunte, 58',
    theme: 'Mary Mother of God',
    quote: 'To recite the Rosary is nothing other than to contemplate with Mary the face of Christ... It is an echo of the prayer of Mary, her perennial Magnificat for the work of the redemptive Incarnation which began in her virginal womb.',
    reflection: 'The Rosary is a School of Mary, leading us straight into the beating Heart of Jesus.'
  },
  {
    id: 'wisdom-benedict-xvi-1',
    author: 'Pope Benedict XVI',
    authorTitle: 'Supreme Pontiff and Theologian',
    authorLifespan: '1927 - 2022 AD',
    category: 'Popes',
    sourceWork: 'Homily at World Youth Day Cologne, 2005',
    theme: 'Love and Charity',
    quote: 'The world promises you comfort, but you were not made for comfort. You were made for greatness.',
    reflection: 'Christianity is not an ideology of mediocrity; it is the grand adventure of dying to self to live forever in God.'
  },
  {
    id: 'wisdom-leo-xiii-1',
    author: 'Pope Leo XIII',
    authorTitle: 'Supreme Pontiff (1878 - 1903)',
    authorLifespan: '1810 - 1903 AD',
    category: 'Popes',
    sourceWork: 'Encyclical Mirae Caritatis, 1902',
    theme: 'Eucharist',
    quote: 'The Holy Eucharist is the soul of the Church and the secret spring of her vitality. Where the Holy Sacrifice is devoutly celebrated, there faith burns bright, charity abounds, and hope never dies.',
    reflection: 'Pope Leo XIII consecrated the entire human race to the Sacred Heart of Jesus.'
  },

  // Saints
  {
    id: 'wisdom-francis-assisi-1',
    author: 'St. Francis of Assisi',
    authorTitle: 'Founder of the Order of Friars Minor',
    authorLifespan: '1181 - 1226 AD',
    category: 'Saints',
    sourceWork: 'Letter to the Entire Order',
    theme: 'Eucharist',
    quote: 'Let everyone be struck with fear, let the whole world tremble, and let the heavens exult when Christ, the Son of the living God, is present on the altar in the hands of a priest! O wonderful loftiness and stupendous dignity!',
    reflection: 'St. Francis was overcome with tears whenever he thought of the humility of the Son of God coming down onto the altar under the appearances of bread and wine.'
  },
  {
    id: 'wisdom-mother-teresa-1',
    author: 'St. Teresa of Calcutta (Mother Teresa)',
    authorTitle: 'Foundress of the Missionaries of Charity',
    authorLifespan: '1910 - 1997 AD',
    category: 'Saints',
    sourceWork: 'Words to Love By',
    theme: 'Love and Charity',
    quote: 'We cannot all do great things, but we can do small things with great love. It is not how much we do, but how much love we put into the doing.',
    reflection: 'Mother Teresa sustained her grueling work in the slums of Calcutta through a daily hour of silent Eucharistic adoration.'
  },
  {
    id: 'wisdom-maximilian-kolbe-1',
    author: 'St. Maximilian Maria Kolbe',
    authorTitle: 'Priest and Martyr of Auschwitz',
    authorLifespan: '1894 - 1941 AD',
    category: 'Saints',
    sourceWork: 'Writings of St. Maximilian Kolbe',
    theme: 'Mary Mother of God',
    quote: 'Never be afraid of loving the Blessed Virgin too much. You can never love her more than Jesus did.',
    reflection: 'Father Kolbe volunteered to die in the starvation bunker of Auschwitz in place of a married father of a family.'
  }
];

export const WISDOM_CATEGORIES: { id: WisdomCategory | 'All'; label: string; count: number }[] = [
  { id: 'All', label: 'All Traditions', count: CATHOLIC_WISDOM_DATABASE.length },
  { id: 'Fathers', label: 'Early Church Fathers', count: CATHOLIC_WISDOM_DATABASE.filter(w => w.category === 'Fathers').length },
  { id: 'Doctors', label: 'Doctors of the Church', count: CATHOLIC_WISDOM_DATABASE.filter(w => w.category === 'Doctors').length },
  { id: 'Mystics', label: 'Mystics', count: CATHOLIC_WISDOM_DATABASE.filter(w => w.category === 'Mystics').length },
  { id: 'Popes', label: 'Popes and Pontiffs', count: CATHOLIC_WISDOM_DATABASE.filter(w => w.category === 'Popes').length },
  { id: 'Saints', label: 'Saints', count: CATHOLIC_WISDOM_DATABASE.filter(w => w.category === 'Saints').length }
];
