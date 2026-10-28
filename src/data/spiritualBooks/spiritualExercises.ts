import { SpiritualBook } from '../spiritualBooks';

export const SPIRITUAL_EXERCISES: SpiritualBook = {
  id: 'spiritual-exercises',
  title: 'The Spiritual Exercises',
  latinTitle: 'Exercitia Spiritualia Sancti Ignatii de Loyola',
  author: 'St. Ignatius of Loyola',
  authorTitle: 'Founder of the Society of Jesus and Patron of All Spiritual Retreats',
  era: '1522–1548 A.D.',
  category: 'devotion',
  categoryLabel: 'Retreat Manual, Meditation & Discernment of Spirits',
  description: 'Born in the cave of Manresa in 1522 and solemnly approved by Pope Paul III in the Bull Pastoralis Officii (1548), this complete twenty-chapter edition unfolds every canonical division of St. Ignatius’s Spiritual Exercises: the Annotations, Principle and Foundation, Particular and General Examens, the Four Weeks (Sin, Kingdom of Christ & Two Standards, Passion, Resurrection), Contemplatio ad Amorem, Three Methods of Prayer, and the Rules for Discernment, Almsgiving, Scruples, and Thinking with the Church.',
  theologicalFocus: 'Principle and Foundation, Holy Indifference, Examination of Conscience, The Two Standards, Three Modes of Humility, Contemplatio ad Amorem, Discernment of Spirits, and Sentire cum Ecclesia',
  nihilObstat: 'Autograph & Vulgate Text Approved by Pope Paul III (Pastoralis Officii, July 31, 1548)',
  imprimatur: 'Declared Patron of All Spiritual Exercises by Pope Pius XI (Mens Nostra, 1929)',
  coverGradient: 'from-[#1C1917] via-[#292524] to-[#0C0A09]',
  accentColor: '#F59E0B',
  emblemSymbol: '⚔️',
  estimatedMinutesPerChapter: 9,
  chapters: [
    {
      id: 'se-ch-1',
      chapterNumber: 1,
      title: 'Annotations (1–20): The Nature of Spiritual Exercises and Dispositions of the Soul',
      latinTitle: 'Annotationes I–XX • Quid Sint Exercitia Spiritualia',
      subtitle: 'Why ordering the affections to seek God’s will is the workout of the soul, the "Presupposition" of charity, and acting "against" desolation.',
      paragraphs: [
        'FIRST ANNOTATION: By the term "Spiritual Exercises" is meant every method of examination of conscience, of meditation, of contemplation, of vocal and mental prayer, and of other spiritual operations. For just as strolling, walking, and running are bodily exercises, so every way of preparing and disposing the soul to rid itself of all disordered affections—and, after their removal, of seeking and finding the Will of God in the disposition of our life for the salvation of our soul—is called a Spiritual Exercise.',
        'SECOND, FIFTH, and TWENTY-SECOND ANNOTATIONS: It is not abundance of knowledge that fills and satisfies the soul, but feeling and tasting things interiorly! Therefore he who makes the Exercises will profit greatly by entering upon them with a great heart and liberality toward his Creator and Lord, offering Him all his will and liberty—and always maintaining the "Presupposition" of charity, which is to be more ready to save and interpret in a good sense our neighbor’s proposition than to condemn it.'
      ],
      keyQuote: 'It is not abundance of knowledge that fills and satisfies the soul, but feeling and tasting things interiorly (Non multa sapere, sed sentire et gustare interne).',
      quoteCitation: 'Annotations §§ 1–2, 5, 22',
      reflectionPrompt: 'How can you enter your prayer today "with a great heart and liberality toward your Creator and Lord"?'
    },
    {
      id: 'se-ch-2',
      chapterNumber: 2,
      title: 'Principle and Foundation (23): The End of Man and Holy Indifference',
      latinTitle: 'Principium et Fundamentum (§ 23) • Homo Creatus Est ut Laudet, Revereatur et Serviat Deo',
      subtitle: 'The architectural cornerstone of the entire spiritual life: why we were created and the rule of "Tantum Quantum."',
      paragraphs: [
        'Man is created to praise, reverence, and serve God our Lord, and by this means to save his soul. And the other things on the face of the earth are created for man, to help him in attaining the end for which he is created. Hence, man is to make use of them in so far as they help him toward his eternal end, and he ought to rid himself of them in so far as they hinder him from it (Tantum Quantum).',
        'Therefore, we must make ourselves indifferent to all created things, in all that is allowed to the choice of our free will and is not forbidden to it; so that, on our part, we do not wish more for health than for sickness, for riches than for poverty, for honor than for dishonor, for a long life than for a short life, and so in all other things—desiring and choosing only that which is more conducive to the end for which we are created.'
      ],
      keyQuote: 'Man is created to praise, reverence, and serve God our Lord, and by this means to save his soul; desiring and choosing only that which leads more to the end for which we are created.',
      quoteCitation: 'Principle and Foundation, § 23',
      reflectionPrompt: 'Apply the rule of Tantum Quantum ("insofar as") to your habits and possessions today: what helps you praise and serve God, and what holds you back?'
    },
    {
      id: 'se-ch-3',
      chapterNumber: 3,
      title: 'First Week: Daily Particular and General Examination of Conscience (24–44)',
      latinTitle: 'Hebdomada Prima (§§ 24–44) • De Examine Particulari et Generali ac Confessione',
      subtitle: 'The three times of the Particular Examen, the Five Points of the General Examen, and the fruits of a General Confession.',
      paragraphs: [
        'THE PARTICULAR EXAMEN (§§ 24–31): Focus deliberately on uprooting one single fault or acquiring one single virtue at a time—upon rising in the morning, resolving to guard against that fault; at noon, asking God for grace and reviewing the morning hour by hour; and at night after supper, reviewing the afternoon and comparing each day and week with the preceding one.',
        'THE FIVE POINTS OF THE GENERAL EXAMEN (§§ 32–43): Every evening practice these five steps: (1) Give thanks to God our Lord for the benefits received that day; (2) Ask grace to know our sins and cast them out; (3) Demand an account of our soul from the hour of rising to the present examen, hour by hour, in thought, word, and deed; (4) Ask pardon of God our Lord for our faults; and (5) Purpose amendment with His grace, concluding with the Our Father.'
      ],
      keyQuote: 'First, give thanks to God our Lord for the benefits received; second, ask grace to know your faults; third, review the day hour by hour; fourth, ask pardon; fifth, resolve to amend.',
      quoteCitation: 'First Week: General Examen of Conscience, § 43',
      reflectionPrompt: 'Practice the Five Points of the General Examen tonight before going to sleep, beginning always with gratitude for God’s blessings.'
    },
    {
      id: 'se-ch-4',
      chapterNumber: 4,
      title: 'First Week, First Exercise: Meditation on the Triple Sin (45–54)',
      latinTitle: 'Hebdomada Prima, Exercitium I (§§ 45–54) • De Triplici Peccato et Colloquio ad Christum Crucifixum',
      subtitle: 'Applying memory, intellect, and will to the sin of the Angels, the sin of Adam and Eve, and a soul lost for a single mortal sin—ending at the foot of the Cross.',
      paragraphs: [
        'After the preparatory prayer and composition of place, apply the three powers of the soul—Memory, Intellect, and Will—to three mysteries of justice: First, the sin of the rebellious Angels, created in grace yet cast into hell for a single act of pride; Second, the sin of Adam and Eve, which brought corruption and centuries of penance upon the whole human race; Third, the particular sin of any soul that went to hell for one mortal sin, even though countless others have committed far more sins and been spared by Divine Mercy!',
        'COLLOQUY BEFORE CHRIST CRUCIFIED (§ 53): Imagining Christ our Lord present before you and nailed to the Cross, make a Colloquy asking how He, being the Creator, came to make Himself Man and pass from eternal life to temporal death for my sins—and then looking at myself, ask these three unforgettable questions: (1) What have I done for Christ? (2) What am I doing for Christ? (3) What ought I to do for Christ?'
      ],
      keyQuote: 'Gazing upon Christ our Lord nailed to the Cross, ask yourself: What have I done for Christ? What am I doing for Christ? What ought I to do for Christ?',
      quoteCitation: 'First Week, First Exercise, § 53',
      reflectionPrompt: 'Kneel in spirit before the Crucifix and answer St. Ignatius’s three questions from the depths of your heart.'
    },
    {
      id: 'se-ch-5',
      chapterNumber: 5,
      title: 'First Week, Second to Fourth Exercises: Personal Sins and the Triple Colloquy (55–64)',
      latinTitle: 'Hebdomada Prima, Exercitia II–IV (§§ 55–64) • De Propriis Peccatis et Triplici Colloquio',
      subtitle: 'Reviewing our own life from place to place, marveling that all creation sustained us while we sinned, and the Triple Colloquy to Mary, Jesus, and the Father.',
      paragraphs: [
        'In the Second Exercise (§§ 55–61), walk in memory through the places where you have lived, the offices you have held, and the people you have known; weigh the malice of your sins against the infinite Majesty of God; and burst into an exclamation of wonder and gratitude at how the Angels guarded you, the Saints interceded for you, the heavens, sun, moon, and earth sustained you, and God’s Mercy waited for you instead of cutting the thread of your life!',
        'In the Third Exercise (§§ 62–63), conclude with a Triple Colloquy—praying first to Our Lady (with a Hail Mary), then to the Son together with Our Lady (with the Anima Christi), and finally to the Eternal Father (with an Our Father)—asking for three graces: interior knowledge and hatred of my sins, recognition and correction of the disorder of my actions, and rejection of the world’s vanity.'
      ],
      keyQuote: 'Break forth into an exclamation of wonder with deep affection, pondering how all creatures have suffered me to live and preserved me while the Angels held back their sword and the Saints interceded for me!',
      quoteCitation: 'First Week, Second Exercise, § 60',
      reflectionPrompt: 'Thank God, His Angels, and His Saints for the patient mercy that has preserved and guided your life up to this very day.'
    },
    {
      id: 'se-ch-6',
      chapterNumber: 6,
      title: 'First Week, Fifth Exercise: Meditation on Hell Through the Five Spiritual Senses (65–72)',
      latinTitle: 'Hebdomada Prima, Exercitium V (§§ 65–72) • Meditatio de Inferno per Quinque Sensus',
      subtitle: 'Beholding, hearing, smelling, tasting, and touching the misery of eternal separation from God so that when love grows cold, at least salutary fear may preserve us from sin.',
      paragraphs: [
        'Apply the five spiritual senses to the state of the lost: First, see with the eyes of the imagination the vast fires and the souls enclosed as in bodies of fire; Second, hear the wailing, howling, cries, and blasphemies against Christ our Lord and His Saints; Third, smell the smoke, sulphur, filth, and putrid things; Fourth, taste the bitter things—tears, sadness, and the worm of conscience; Fifth, touch the flames that envelop and burn the souls.',
        'Making a Colloquy to Christ our Lord, give Him heartfelt thanks that He has not suffered me to fall into any of these sects or cut short my life when I deserved it, but has shown me up to this very day such tender pity and mercy—so that if through my faults I should ever forget the love of the Eternal Lord, at least the fear of losing Him forever may help me never to fall into sin.'
      ],
      keyQuote: 'Let me ask for an interior sense of the pain which the lost suffer, so that if through my faults I should forget the love of the Eternal Lord, at least the fear of punishment may help me not to come into sin.',
      quoteCitation: 'First Week, Fifth Exercise, § 65',
      reflectionPrompt: 'How does gratitude for being rescued from eternal loss deepen our love for the Sacred Heart of Jesus?'
    },
    {
      id: 'se-ch-7',
      chapterNumber: 7,
      title: 'Second Week: The Call of the Temporal King and the Eternal King (91–100)',
      latinTitle: 'Hebdomada Secunda (§§ 91–100) • De Regno Christi et Oblatione Maioris Momenti',
      subtitle: 'Christ our Eternal King calling every Christian to share His labor in conquering the world so as to share His glory in victory.',
      paragraphs: [
        'Imagine a human king, chosen by the hand of God our Lord, whom all Christian princes and men reverence and obey, speaking to all his subjects: "My will is to conquer all the land of infidels; therefore whoever wishes to come with me must be content to eat as I eat, drink as I drink, dress as I dress, and labor with me by day and watch by night, so that afterward he may have part with me in the victory as he has had it in the labors." If anyone refused so noble and generous a king, how justly would he be censured by all the world!',
        'Now apply this to Christ our Eternal King, standing before the whole universe and saying to each person in particular: "My Will is to conquer the whole world and all My enemies, and thus to enter into the glory of My Father; therefore, whoever wishes to come with Me must labor with Me, that following Me in the pain, he may also follow Me in the glory!" Those who wish to give greater proof of love make the Oblation of Greater Value: offering not only their labor, but begging to imitate Christ in bearing all wrongs, all abuse, and all poverty of spirit (and even actual poverty, if His Most Holy Majesty be pleased to choose them).'
      ],
      keyQuote: '"My Will is to conquer the whole world and all My enemies, and thus to enter into the glory of My Father; therefore whoever wishes to come with Me must labor with Me, that following Me in the pain, he may also follow Me in the glory!"',
      quoteCitation: 'Second Week: The Kingdom of Christ, § 95',
      reflectionPrompt: 'Hear Christ the Eternal King addressing you by name today: how will you answer His call to share His labor and His victory?'
    },
    {
      id: 'se-ch-8',
      chapterNumber: 8,
      title: 'Second Week, First Day: Contemplation on the Incarnation and the Nativity (101–117)',
      latinTitle: 'Hebdomada Secunda, Dies I (§§ 101–117) • De Incarnatione et Nativitate Domini',
      subtitle: 'The Three Divine Persons gazing upon the whole earth, sending Gabriel to Nazareth, and contemplating the cave of Bethlehem.',
      paragraphs: [
        'CONTEMPLATION ON THE INCARNATION (§§ 101–109): Ask for the fundamental grace of the Second Week: "an intimate knowledge of Our Lord, who has become man for me, that I may love Him more and follow Him more closely." First, see the great capacity and circuit of the world full of so many different peoples—some in peace, some in war, some weeping, some laughing, some dying—and simultaneously behold the Three Divine Persons on Their royal throne gazing upon the whole earth; Second, hear the Trinity say, "Let Us work the redemption of the human race!", and hear the Angel Gabriel greeting Our Lady at Nazareth and her humble answer; Third, behold the Eternal Word made flesh in the pure womb of Mary.',
        'CONTEMPLATION ON THE NATIVITY (§§ 110–117): See Our Lady setting out from Nazareth seated on an ass, with St. Joseph and a little maidservant leading an ox, traveling in winter cold to Bethlehem; make yourself a poor little unworthy servant, looking at them, contemplating them, and serving them in their needs as if you were present there in the cave—pondering how the Lord is born in extreme poverty so that after hunger, thirst, insults, and nails, He may die on the Cross for me!'
      ],
      keyQuote: 'Ask for an intimate knowledge of Our Lord, who has become man for me, that I may love Him more and follow Him more closely.',
      quoteCitation: 'Second Week, First Contemplation, § 104',
      reflectionPrompt: 'Pray St. Ignatius’s Second Week grace today: "Lord Jesus, grant me an intimate knowledge of You, that I may love You more and follow You more closely."'
    },
    {
      id: 'se-ch-9',
      chapterNumber: 9,
      title: 'Second Week: Application of the Five Senses & the Hidden Life at Nazareth (121–135)',
      latinTitle: 'Hebdomada Secunda (§§ 121–135) • Applicatio Quinque Sensuum et Vita Abscondita Nazareth',
      subtitle: 'Applying sight, hearing, smell, taste, and touch to the Mysteries of Christ, and the thirty years of obedience at Nazareth as the model of the common life.',
      paragraphs: [
        'APPLICATION OF THE FIVE SENSES (§§ 121–126): At the end of the day’s contemplations, pass the five spiritual senses over the mystery: see the persons with the sight of the imagination; hear what they are saying; smell and taste with the interior sense the infinite fragrance and sweetness of the Divinity and of the soul and virtues of Jesus and Mary; and touch by kissing and embracing the places where such persons tread and sit.',
        'THE HIDDEN LIFE AT NAZARETH AND TEMPLE OF JERUSALEM (§§ 127–135): Contemplate how the Son of God spent thirty years in hidden obedience to Mary and Joseph at Nazareth (Luke 2:51) to sanctify ordinary family and religious life, and how at age twelve He left His parents for three days to remain in the Temple about His Father’s business—showing the two states of Christian perfection: the common life of keeping the Commandments and the state of the Evangelical Counsels.'
      ],
      keyQuote: 'Smell and taste with the interior sense the infinite fragrance and sweetness of the Divinity and of the virtues of Jesus, Mary, and Joseph.',
      quoteCitation: 'Second Week: Application of the Five Senses, § 124',
      reflectionPrompt: 'When you read the Gospel today, place yourself inside the scene with all five spiritual senses as a humble bystander serving Jesus and Mary.'
    },
    {
      id: 'se-ch-10',
      chapterNumber: 10,
      title: 'Second Week, Fourth Day: Meditation on the Two Standards — Christ vs. Lucifer (136–148)',
      latinTitle: 'Hebdomada Secunda, Dies IV (§§ 136–148) • Meditatio de Duobus Vexillis',
      subtitle: 'Unmasking the three steps of the enemy’s snare (Riches, Vain Honor, Pride) and embracing the three steps of Christ’s strategy (Poverty, Contumely, Humility).',
      paragraphs: [
        'Consider how Christ our Sovereign Commander stands in a lowly, fair, and gracious field near Jerusalem, while Lucifer, the mortal enemy of human nature, sits in a great chair of fire and smoke in the plain of Babylon. Lucifer summons innumerable demons and commands them to cast nets and chains over all men by three steps: first, tempting them to covetousness of riches; second, leading them from riches to vain honor of the world; and third, bringing them from vain honor to swelling pride, and from pride to all other vices.',
        'Conversely, behold the Sovereign and True Captain, Christ our Lord, choosing His Apostles and disciples and sending them across the whole world to help all men by three opposite steps: first, drawing them to the highest spiritual poverty (and, if His Divine Majesty be pleased to choose them, actual poverty as well); second, to desire of reproaches and contempt (because from these two springs humility); and third, to true Humility, and from these three steps to all other virtues! Conclude with the Triple Colloquy to Our Lady, the Son, and the Father, begging to be received under the Standard of Christ.'
      ],
      keyQuote: 'The enemy leads men by three steps: Riches, Vain Honor, and Pride. Christ our Captain leads souls by three opposite steps: Poverty of Spirit, Bearing Reproaches for His Name, and Humility.',
      quoteCitation: 'Second Week: Meditation on the Two Standards, §§ 142, 146',
      reflectionPrompt: 'Examine where the world tempts you toward riches, status, and pride—and ask Our Lady to place you firmly beneath the Standard of her Son.'
    },
    {
      id: 'se-ch-11',
      chapterNumber: 11,
      title: 'Second Week: The Three Classes of Men and the Three Modes of Humility (149–168)',
      latinTitle: 'Hebdomada Secunda (§§ 149–168) • De Tribus Binariis Hominum et Tribus Gradibus Humilitatis',
      subtitle: 'Testing our readiness to detach from disordered attachments and rising to the Third Mode of Humility—choosing poverty and crosses simply to be more like Christ.',
      paragraphs: [
        'THE THREE CLASSES OF MEN (§§ 149–157): Imagine three pairs of men, each of whom has acquired ten thousand ducats not purely for the love of God, and all wish to find peace in God: the First Class wants to get rid of the disordered attachment, but procrastinates until death without taking any real means; the Second Class wants to get rid of the attachment, but tries to bend God’s will to come to where they want to keep the money; the Third Class detaches its heart completely right now, wanting neither to keep the thing nor to reject it save solely according as God our Lord inspires them for His greater service.',
        'THE THREE MODES OF HUMILITY (§§ 165–168): First Mode (necessary for eternal salvation): so to subject myself to the law of God that not even to be made lord of all creation or to save my temporal life would I deliberate about committing one mortal sin; Second Mode: reaching such holy indifference that not for all creation or my life would I deliberate about committing one venial sin; Third Mode (most perfect humility): when the praise and glory of the Divine Majesty are equally served, in order to imitate and be actually more like Christ our Lord, I desire and choose poverty with Christ poor rather than riches, and reproaches with Christ laden with them rather than honors!'
      ],
      keyQuote: 'Third Mode of Humility: Whenever the praise and glory of the Divine Majesty are equally served, in order to imitate and be more actually like Christ our Lord, I choose poverty with Christ poor rather than riches!',
      quoteCitation: 'Second Week: Three Modes of Humility, § 167',
      reflectionPrompt: 'Which of the Three Classes of Men describes how you handle attachments—procrastinating, bargaining with God, or surrendering with open hands?'
    },
    {
      id: 'se-ch-12',
      chapterNumber: 12,
      title: 'Second Week: Mysteries of the Public Life and the Three Times for Making a Sound Election (169–189)',
      latinTitle: 'Hebdomada Secunda (§§ 169–189) • De Mysteriis Vitae Publicae et Tribus Temporibus Electionis',
      subtitle: 'Contemplating the Baptism, Temptation, Beatitudes, and Transfiguration of Christ, and the three ways God guides a soul in making a life choice or reform.',
      paragraphs: [
        'Contemplating Our Lord’s Baptism in the Jordan, forty days in the wilderness, calling of the Apostles, Sermon on the Mount, walking on the waves, and Palm Sunday entry into Jerusalem, the soul prepares for the Election or Reform of Life (§§ 169–189), keeping its eye wholly simple and pure on the single end for which it was created.',
        'There are Three Times for making a sound and good Election: First Time, when God our Lord so moves and attracts the will (as with St. Paul and St. Matthew) that the soul follows without doubting or being able to doubt; Second Time, when much light and knowledge is received through the experience of consolations and desolations and the discernment of spirits; Third Time, a time of tranquillity, when the soul weighs freely with its natural powers sharpened by grace what choice it would wish to have made if it stood at the hour of death and at the Day of Judgment.'
      ],
      keyQuote: 'In making any important decision, consider what choice you would wish to have made if you were advising a dear friend, or if you stood right now at the hour of your death and at the Day of Judgment.',
      quoteCitation: 'Second Week: Rules for Making an Election, §§ 185–187',
      reflectionPrompt: 'Use St. Ignatius’s "Deathbed and Judgment Day" rule whenever you face an important moral or vocational decision.'
    },
    {
      id: 'se-ch-13',
      chapterNumber: 13,
      title: 'Third Week: The Last Supper, Washing of the Feet, and Agony in Gethsemane (190–207)',
      latinTitle: 'Hebdomada Tertia (§§ 190–207) • De Ultima Cena et Agonia in Horto Gethsemani',
      subtitle: 'Asking for sorrow, compassion, and tears with Christ in torment because for my sins the Lord is going to His Passion.',
      paragraphs: [
        'Entering the Third Week, the grace we beg for changes: we ask for "sorrow, feeling, and confusion, because for my sins the Lord is going to the Passion," and in the Colloquies we ask for sorrow with Christ sorrowful, a broken heart with Christ heart-broken, and tears and interior pain for the great pain which Christ suffered for me.',
        'Contemplate how Our Lord washes the feet of His Apostles—even the feet of Judas—institutes the Most Holy Sacrifice of the Eucharist as the greatest mark of His love, and enters the Garden of Gethsemane, where the fear, weariness, and weight of the sins of the world cause Him to sweat Blood so copiously that it trickles down upon the ground while He prays three times to the Father.'
      ],
      keyQuote: 'Ask for what I desire: sorrow with Christ in sorrow, anguish with Christ in anguish, tears and deep pain for the great pain that Christ endured for me.',
      quoteCitation: 'Third Week, First Contemplation, § 203',
      reflectionPrompt: 'Watch for one hour in spirit with Jesus in Gethsemane, thanking Him for instituting the Holy Eucharist on the very night He was betrayed.'
    },
    {
      id: 'se-ch-14',
      chapterNumber: 14,
      title: 'Third Week: From Caiaphas and Pilate to the Cross and Sepulchre (208–209, 289–298)',
      latinTitle: 'Hebdomada Tertia (§§ 208–209, 289–298) • De Passione, Crucifixione et Sepultura Domini',
      subtitle: 'Considering how the Divinity hides itself so as to allow the Sacred Humanity to suffer so cruelly for my salvation.',
      paragraphs: [
        'In the six points of each Third Week contemplation, consider above all: (1) how the Divinity hides itself—that is, how Christ could destroy His enemies in an instant, and does not do it, leaving His most sacred Humanity to suffer so cruelly; (2) how He suffers all this for my sins, and what I ought to do and suffer for Him!',
        'Follow Our Redeemer from the house of Annas and Caiaphas to Herod and Pontius Pilate; behold Him scourged at the pillar, crowned with thorns, clothed in purple mockery ("Ecce Homo!"), carrying His Cross to Golgotha, nailed between two thieves, speaking the Seven Last Words, yielding up His Spirit, pierced with the lance, taken down into the arms of His sorrowful Mother, and laid in the new sepulchre while Our Lady keeps vigil in unshakeable faith.'
      ],
      keyQuote: 'Consider how the Divinity hides itself during the Passion, allowing His Most Sacred Humanity to suffer so cruelly—and all this for my sins!',
      quoteCitation: 'Third Week, §§ 196–197, 296–298',
      reflectionPrompt: 'Keep company with Our Lady in the silence of Holy Saturday between the Burial and the Dawn of Easter.'
    },
    {
      id: 'se-ch-15',
      chapterNumber: 15,
      title: 'Fourth Week: First Contemplation — The Risen Christ Appears First to His Blessed Mother (218–229, 299)',
      latinTitle: 'Hebdomada Quarta (§§ 218–229, 299) • De Prima Apparitione Christi Resurgentis ad Matrem Suam',
      subtitle: 'Rejoicing intensely in the great joy and glory of Christ our Lord, Who behaves toward His friends as the True Consoler.',
      paragraphs: [
        'In the Fourth Week, we beg for the grace "to be glad and rejoice intensely because of the great joy and glory of Christ our Lord!" Here we consider how the Divinity, which seemed to hide itself in the Passion, now appears and shows itself so miraculously in the most holy Resurrection by its true and most sacred effects; and how Christ our Lord exercises the office of Consoler, just as one friend consoles another.',
        'FIRST APPARITION (§§ 219, 299): First of all, the Risen Soul and Divinity of Christ returns from Limbo with the just souls to the sepulchre, unites with His Sacred Body, and appears in body and soul FIRST to the Blessed Virgin Mary! For although Scripture does not state this in so many words, Scripture presupposes that we have understanding—as it is written: "Are you also without understanding?" Since Mary shared most deeply in the chalice of the Passion, filial love required that her Divine Son console her first of all with the radiance of His Resurrection.'
      ],
      keyQuote: 'Ask for the grace to be glad and rejoice intensely because of the great joy and glory of Christ our Lord, Who exercises toward His friends the office of Consoler!',
      quoteCitation: 'Fourth Week, §§ 221, 224, 299',
      reflectionPrompt: 'Rejoice with the Risen Jesus and His Blessed Mother: notice that unselfish love rejoices in Christ’s glory for His own sake!'
    },
    {
      id: 'se-ch-16',
      chapterNumber: 16,
      title: 'Fourth Week: The Easter Apparitions and the Glorious Ascension of Our Lord (300–312)',
      latinTitle: 'Hebdomada Quarta (§§ 300–312) • De Apparitionibus Paschalibus et Ascensione Domini',
      subtitle: 'Mary Magdalene at the tomb, the Disciples on the Road to Emmaus, the Upper Room, the Sea of Tiberias, the Great Commission, and the Mount of Olives.',
      paragraphs: [
        'Contemplate the remaining twelve apparitions of the Risen Savior (§§ 300–312): to Mary Magdalene weeping by the sepulchre; to the holy women returning from the tomb; to Simon Peter in secret mercy; to the two disciples on the road to Emmaus whose hearts burned within them as He opened the Scriptures and was known in the breaking of the bread; to the Apostles in the Upper Room breathing the Holy Spirit ("Receive ye the Holy Spirit; whose sins you shall forgive, they are forgiven them") and eight days later inviting St. Thomas to touch His glorious wounds.',
        'Finally, behold Him by the Sea of Tiberias entrusting His lambs and sheep to St. Peter after the triple "Lovest thou Me?", commissioning the Apostles on Mount Tabor in Galilee to baptize all nations, and ascending into Heaven from the Mount of Olives while Angels promise His glorious return.'
      ],
      keyQuote: '"Did not our heart burn within us whilst He spoke in the way, and opened to us the Scriptures?" And they knew Him in the breaking of the bread.',
      quoteCitation: 'Fourth Week: Mysteries of the Resurrection and Ascension, §§ 303, 312',
      reflectionPrompt: 'How do every Sunday Mass and every Gospel reading repeat for us the Emmaus walk with the Risen Lord?'
    },
    {
      id: 'se-ch-17',
      chapterNumber: 17,
      title: 'Contemplation to Attain Love (Contemplatio ad Amorem, 230–237): "Take, Lord, and Receive"',
      latinTitle: 'Contemplatio ad Amorem Spiritualem obtinendum (§§ 230–237) • Suscipe, Domine, Universam Meam Libertatem',
      subtitle: 'Finding God giving, dwelling, laboring, and descending in all things—and St. Ignatius’s crowning prayer of total self-gift (Suscipe).',
      paragraphs: [
        'TWO PRELUDES ON LOVE (§§ 230–231): First, love ought to be put more in deeds than in words; second, love consists in mutual communication on both sides—that is, in the lover giving and communicating to the beloved what he has, or out of what he has or can do! Ask for an interior knowledge of the so great good I have received, that recognizing this completely, I may in all things love and serve His Divine Majesty.',
        'THE FOUR POINTS AND THE SUSCIPE (§§ 234–237): First, recall all the gifts of Creation, Redemption, and personal graces God has given me; Second, consider how God dwells in all creatures—giving being to the elements, growth to plants, sensation to animals, and understanding to men, and making me His temple; Third, consider how God works and labors for me in all created things on the face of the earth; Fourth, behold how all blessings and gifts descend from above like rays from the sun and waters from the fountain. Then with deep affection pray: "Take, Lord, and receive all my liberty, my memory, my understanding, and my entire will, all that I have and possess. Thou hast given all to me; to Thee, O Lord, I return it. All is Thine, dispose of it wholly according to Thy will. Give me Thy love and Thy grace, for this is sufficient for me!"'
      ],
      keyQuote: 'Take, Lord, and receive all my liberty, my memory, my understanding, and my entire will, all that I have and possess. Thou hast given all to me; to Thee, O Lord, I return it. Give me Thy love and Thy grace, for this is sufficient for me!',
      quoteCitation: 'Contemplatio ad Amorem, § 234 (Suscipe)',
      reflectionPrompt: 'Pray St. Ignatius’s Suscipe ("Take, Lord, and receive...") slowly from your heart as the total offering of your life today.'
    },
    {
      id: 'se-ch-18',
      chapterNumber: 18,
      title: 'Three Methods of Prayer (238–260): Examination, Word-by-Word Contemplation, and Rhythmic Breath',
      latinTitle: 'Tres Modi Orandi (§§ 238–260) • De Conscientia, de Verbis Orationis et per Rhythmos Anhelitus',
      subtitle: 'Practical ways taught by St. Ignatius to pray profitably at all times, even when tired or unwell.',
      paragraphs: [
        'FIRST METHOD OF PRAYER (§§ 238–248): A restful review of the Ten Commandments, the Seven Capital Sins, the Three Powers of the Soul, and the Five Bodily Senses—pausing briefly on each to examine how we have kept them, asking pardon for faults, and asking grace for the future.',
        'SECOND AND THIRD METHODS OF PRAYER (§§ 249–260): In the Second Method, kneel or sit and take the Our Father or Hail Mary or Anima Christi one single word at a time—dwelling on "Our... Father..." for as long as you find meanings, comparisons, relish, and consolation in that single word before moving to the next! In the Third Method, pray by rhythm: with each single breath in and out, pronounce internally one word of the Our Father or Hail Mary while thinking on the meaning of that word, or on the Person to Whom you are speaking, or on your own lowliness.'
      ],
      keyQuote: 'With each breath in and out, pray one word of the Our Father or Hail Mary, pondering either the meaning of the word, or the Dignity of the Person to Whom you speak, or your own lowliness.',
      quoteCitation: 'Three Methods of Prayer, §§ 252, 258',
      reflectionPrompt: 'Try St. Ignatius’s Second or Third Method of Prayer right now with the Lord’s Prayer—savoring one word with each quiet breath.'
    },
    {
      id: 'se-ch-19',
      chapterNumber: 19,
      title: 'Rules for the Discernment of Spirits — First and Second Weeks (313–336)',
      latinTitle: 'Regulae ad Motus Animae Discernendos (§§ 313–336) • De Consolatione et Desolatione',
      subtitle: 'The fourteen Rules of the First Week (for overcoming desolation and unmasking the enemy) and the eight Rules of the Second Week (when the enemy disguises himself as an Angel of Light).',
      paragraphs: [
        'FIRST WEEK RULES (§§ 313–327): In those who go from mortal sin to mortal sin, the enemy proposes apparent pleasures while the good spirit pricks their conscience; in those who earnestly purify their sins and rise from good to better, the opposite happens—the evil spirit bites, saddens, and puts obstacles, while the good spirit gives courage, tears, peace, and consolation! Fifth Rule: In time of desolation, NEVER make a change in your firm resolutions made in consolation! Sixth to Eighth Rules: Act earnestly against desolation by insisting more on prayer, meditation, examination, and suitable penance, knowing that God is testing how far our love extends when sensible feelings are paused. Twelfth to Fourteenth Rules: The enemy acts like a spoiled bully (losing courage when confronted boldly), a false lover (who begs for secrecy and flees when exposed to a confessor), and a military captain (who studies our weakest wall to attack there).',
        'SECOND WEEK RULES (§§ 328–336): It belongs to God alone to give consolation without any previous cause! When the enemy cannot lure an earnest soul into coarse sin, he transforms himself into an "Angel of Light"—entering with the devout soul’s good desires and gradually steering them toward pride, indiscreet excess, or unquiet. Therefore examine the beginning, middle, and end of the thought: if in the end it leads to disquiet or lessens humility and obedience, the serpent’s tail is revealed!'
      ],
      keyQuote: 'In time of desolation never make a change, but stand firm and constant in the resolutions and determination in which you were on the day preceding such desolation!',
      quoteCitation: 'Rules for the Discernment of Spirits, First Week, Rule 5 (§ 318)',
      reflectionPrompt: 'Memorize St. Ignatius’s Fifth Rule: "In time of desolation, never make a change!" Why has this single rule saved countless vocations, marriages, and souls?'
    },
    {
      id: 'se-ch-20',
      chapterNumber: 20,
      title: 'Rules for Almsgiving, Overcoming Scruples, and Thinking with the Orthodox Church (337–370)',
      latinTitle: 'Regulae de Eleemosynis, de Scrupulis et ad Sentiendum cum Ecclesia Orthodoxa (§§ 337–370)',
      subtitle: 'Distributing goods with evangelical impartiality, trampling on scruples, and the Eighteen Rules for having the true mind of our Holy Mother the Hierarchical Church.',
      paragraphs: [
        'RULES FOR ALMSGIVING AND SCRUPLES (§§ 337–351): In distributing alms or Church goods, keep the rule of looking to what we would wish to have done at the hour of death. Regarding scruples (§§ 345–351): after stepping accidentally on a straw cross, the enemy tries to persuade a delicate soul that it has sinned—that is strictly a scruple and an illusion of the enemy! While the coarse soul must make its conscience more delicate, the scrupulous soul must act directly against the scruple with humble trust in its confessor.',
        'EIGHTEEN RULES FOR THINKING WITH THE CHURCH (Sentire cum Ecclesia, §§ 352–370): Putting aside all private judgment, we must always hold our mind ready and prompt to obey in all things the true Spouse of Christ our Lord, which is our Holy Mother the Hierarchical Church! Praise frequent Confession and weekly or daily reception of the Blessed Sacrament; praise the Canonical Hours, religious vows, relics, stations, pilgrimages, indulgences, church candles and sacred images; praise both positive theology (which moves the heart to love, like Augustine, Jerome, and Gregory) and scholastic theology (which defines truth clearly, like Thomas Aquinas and Bonaventure); and so deep is our unity with the Church guided by the Holy Spirit that we believe one and the same Spirit who gave the Ten Commandments rules and governs Holy Mother Church for the salvation of souls!'
      ],
      keyQuote: 'Putting aside all private judgment, we must always hold our mind ready and prompt to obey in all things the true Spouse of Christ our Lord, which is our Holy Mother the Hierarchical Church!',
      quoteCitation: 'Rules for Thinking with the Church, Rule 1 (§ 353)',
      reflectionPrompt: 'How do St. Ignatius’s Rules for Thinking with the Church unite deep personal mysticism with joyful fidelity to the Sacraments and Magisterium?'
    }
  ]
};
