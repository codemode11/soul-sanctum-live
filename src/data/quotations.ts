export type QuotationSectionId =
  | 'holy-trinity'
  | 'jesus-christ'
  | 'blessed-virgin-mary'
  | 'st-joseph'
  | 'the-saints'
  | 'catholic-church'
  | 'holy-bible'
  | 'faith'
  | 'spiritual-warfare'
  | 'holy-death'
  | 'generosity'
  | 'sacraments'
  | 'holiness'
  | 'redemptive-suffering'
  | 'sacrifice'
  | 'piety'
  | 'the-incarnation'
  | 'detachment'
  | 'spirituality'
  | 'reflections'
  | 'virtue'
  | 'truth'
  | 'peace'
  | 'servanthood'
  | 'apologetics'
  | 'holy-eucharist'
  | 'grace'
  | 'spiritual-communion'
  | 'mortification'
  | 'revelation'
  | 'ressourcement'
  | 'liturgy'
  | 'tradition'
  | 'beatific-vision'
  | 'custody-of-the-senses'
  | 'continuity'
  | 'both-and'
  | 'indulgences';

export interface SacredQuotation {
  id: string;
  sectionId: QuotationSectionId;
  sectionTitle: string;
  subHeading?: string;
  text: string;
  attribution?: string;
  postscript?: string;
  isNarrative?: boolean;
}

export interface QuotationSection {
  id: QuotationSectionId;
  title: string;
  subtitle: string;
}

export const QUOTATION_SECTIONS: QuotationSection[] = [
  {
    id: 'holy-trinity',
    title: 'The Holy Trinity',
    subtitle: 'The Indwelling of the Three Divine Persons—Father, Son, and Holy Spirit—in the Christian Soul and the Holy Eucharist'
  },
  {
    id: 'jesus-christ',
    title: 'Jesus Christ',
    subtitle: 'The Sacred Heart, the Threefold Coming of the Redeemer, and the Saving Passion of Our Lord'
  },
  {
    id: 'blessed-virgin-mary',
    title: 'The Blessed Virgin Mary',
    subtitle: 'Our Lady of Fatima, the Immaculate Heart of Mary, the Hail Mary, and the Most Holy Rosary'
  },
  {
    id: 'st-joseph',
    title: 'St. Joseph',
    subtitle: 'Universal Patronage and Powerful Intercession of the Foster-Father of the Son of God'
  },
  {
    id: 'the-saints',
    title: 'The saints',
    subtitle: 'Living Commentaries on the Gospel, Pillars of Renewal, and Great Doctors of the Church'
  },
  {
    id: 'catholic-church',
    title: 'The Catholic Church',
    subtitle: 'The One True Fold of the Redeemer, Pillar and Ground of the Truth, and Continuation of the Incarnation'
  },
  {
    id: 'holy-bible',
    title: 'The Holy Bible',
    subtitle: 'Sacred Scripture, the Covenantal Spine of Salvation History, Biblical Typology, and the Living Word of God'
  },
  {
    id: 'faith',
    title: 'Faith',
    subtitle: 'Believing What We Do Not Yet See and the Harmony of Faith and Reason'
  },
  {
    id: 'spiritual-warfare',
    title: 'Spiritual warfare',
    subtitle: 'The Weapons of the Christian: Humility, the Holy Name, the Precious Blood, the Eucharist, Mary, Prayer, Fasting, and Holy Water'
  },
  {
    id: 'holy-death',
    title: 'Holy Death',
    subtitle: 'Keeping Death Daily Before Our Eyes and Preparing for the Passage to Immortality'
  },
  {
    id: 'generosity',
    title: 'Generosity',
    subtitle: 'Giving to Those in Need out of Love for God'
  },
  {
    id: 'sacraments',
    title: 'Sacraments',
    subtitle: 'The Unfailing Sanctifying Power of Christ in Baptism and Confession'
  },
  {
    id: 'holiness',
    title: 'Holiness',
    subtitle: 'The Pursuit of Christian Perfection, Abandonment to Divine Providence, and Interior Silence'
  },
  {
    id: 'redemptive-suffering',
    title: 'Redemptive suffering',
    subtitle: 'The Royal Ladder of the Holy Cross'
  },
  {
    id: 'sacrifice',
    title: 'Sacrifice',
    subtitle: 'Contemplating the Crucifix and the Sacred Host'
  },
  {
    id: 'piety',
    title: 'Piety',
    subtitle: 'Unceasing Prayer, the Power of the Holy Rosary, and Practicing the Presence of God'
  },
  {
    id: 'the-incarnation',
    title: 'The Incarnation',
    subtitle: 'The Word Made Flesh That We Might Partake of His Divinity'
  },
  {
    id: 'detachment',
    title: 'Detachment',
    subtitle: 'Laying Down All Earthly Attachments to Possess God Alone'
  },
  {
    id: 'spirituality',
    title: 'Spirituality',
    subtitle: 'Our Spiritual Heritage and Unity in the One'
  },
  {
    id: 'reflections',
    title: 'Reflections',
    subtitle: 'Meditations on Silence, Trust in God, Eternity, and the Priesthood'
  },
  {
    id: 'virtue',
    title: 'Virtue',
    subtitle: 'Habitual Disposition to the Good and Humility as the Foundation of All Virtues'
  },
  {
    id: 'truth',
    title: 'Truth',
    subtitle: 'Witnessing to Eternal Truths Illuminated by the Holy Spirit'
  },
  {
    id: 'peace',
    title: 'Peace',
    subtitle: 'Preserving the Heart in Unshakable Interior Peace'
  },
  {
    id: 'servanthood',
    title: 'Servanthood',
    subtitle: 'Humble Service to the Poor and All God’s Creation'
  },
  {
    id: 'apologetics',
    title: 'Apologetics',
    subtitle: 'Defending the Catholic Faith with Truth, History, Reason, and Charity'
  },
  {
    id: 'holy-eucharist',
    title: 'Holy Eucharist',
    subtitle: 'Source and Summit of the Christian Life, Bread of Angels, and Pledge of Future Resurrection'
  },
  {
    id: 'grace',
    title: 'Grace',
    subtitle: 'The Substantial Indwelling of God and the Beginning of Eternal Glory'
  },
  {
    id: 'spiritual-communion',
    title: 'Spiritual communion',
    subtitle: 'Uniting the Soul to the Eucharistic Heart of Jesus through Ardent Desire'
  },
  {
    id: 'mortification',
    title: 'Mortification',
    subtitle: 'Outward Discipline and the Secret Crucifixion of the Will'
  },
  {
    id: 'revelation',
    title: 'Revelation',
    subtitle: 'God Revealing Himself through Creation, the Prophets, and the Word Made Flesh'
  },
  {
    id: 'ressourcement',
    title: 'Ressourcement',
    subtitle: 'Returning to the Apostolic Wellsprings of Scripture, the Fathers, and the Liturgy'
  },
  {
    id: 'liturgy',
    title: 'Liturgy',
    subtitle: 'Cosmic Worship Joining Heaven and Earth and Making Present the Mysteries of Salvation'
  },
  {
    id: 'tradition',
    title: 'Tradition',
    subtitle: 'The Living Transmission of the Apostolic Deposit of Faith'
  },
  {
    id: 'beatific-vision',
    title: 'Beatific vision',
    subtitle: 'Man’s Ultimate Beatitude in the Vision of the Divine Essence'
  },
  {
    id: 'custody-of-the-senses',
    title: 'Custody of the senses',
    subtitle: 'Guarding the Gates of the Soul as the Beginning of Contemplation'
  },
  {
    id: 'continuity',
    title: 'Continuity',
    subtitle: 'The Organic Continuity of the Catholic Church with the Faith and Promises of Israel'
  },
  {
    id: 'both-and',
    title: 'Both/and',
    subtitle: 'The Great Catholic Synthesis: Scripture and Tradition, Faith and Reason, Grace and Free Will, Faith and Works'
  },
  {
    id: 'indulgences',
    title: 'Indulgences',
    subtitle: 'The Treasury of Charity That Covers a Multitude of Sins'
  }
];

export const SACRED_QUOTATIONS_DATABASE: SacredQuotation[] = [
  // =========================================================================
  // 1. THE HOLY TRINITY
  // =========================================================================
  {
    id: 'quote-trinity-1',
    sectionId: 'holy-trinity',
    sectionTitle: 'The Holy Trinity',
    text: 'Where one Person of the Trinity is present, there is the whole Trinity.',
    attribution: 'St. John Chrysostom'
  },
  {
    id: 'quote-trinity-2',
    sectionId: 'holy-trinity',
    sectionTitle: 'The Holy Trinity',
    text: 'We are living temples of the Godhead: the Father is our Creator, the Son our Redeemer, and the Holy Spirit our Sanctifier—each living within us.',
    attribution: 'St. Francis de Sales, Treatise on the Love of God, Book II, Ch. 15'
  },
  {
    id: 'quote-trinity-3',
    sectionId: 'holy-trinity',
    sectionTitle: 'The Holy Trinity',
    text: 'The Christian soul is the throne of the Holy Trinity, the tabernacle of divine majesty, the sanctuary of infinite love.',
    attribution: 'St. John Eudes, The Kingdom of Jesus, I.2'
  },
  {
    id: 'quote-trinity-4',
    sectionId: 'holy-trinity',
    sectionTitle: 'The Holy Trinity',
    text: 'The whole Trinity dwells in the soul by sanctifying grace, but in a manner proper to each Divine Person: the Father as origin, the Son as truth, the Holy Spirit as gift.',
    attribution: 'St. Thomas Aquinas, Summa Theologiae, I, q. 43, a. 3'
  },
  {
    id: 'quote-trinity-5',
    sectionId: 'holy-trinity',
    sectionTitle: 'The Holy Trinity',
    text: 'God sustains every soul and dwells in every soul substantially, even though it may be the greatest sinner in the world.',
    attribution: 'St. John of the Cross'
  },
  {
    id: 'quote-trinity-6',
    sectionId: 'holy-trinity',
    sectionTitle: 'The Holy Trinity',
    text: 'Since Christ is God, and God is Trinity, in the Eucharist the soul receives not only Christ but also the Father and the Holy Spirit, by reason of the unity of the Divine Essence.',
    attribution: 'St. Thomas Aquinas, Summa Theologiae, III, q. 73, a. 5; III, q. 3, a. 3'
  },
  {
    id: 'quote-trinity-7',
    sectionId: 'holy-trinity',
    sectionTitle: 'The Holy Trinity',
    text: 'He who has the Spirit has both the Son and the Father, for the Trinity is inseparable. The soul becomes the temple where the whole Godhead dwells.',
    attribution: 'St. Hilary of Poitiers, On the Trinity, Book VIII'
  },
  {
    id: 'quote-trinity-8',
    sectionId: 'holy-trinity',
    sectionTitle: 'The Holy Trinity',
    text: 'When the Holy Spirit comes to dwell in us, He brings with Him the Father and the Son. For the Godhead is indivisible.',
    attribution: 'St. Cyril of Jerusalem, Catechetical Lectures, 17.24'
  },
  {
    id: 'quote-trinity-9',
    sectionId: 'holy-trinity',
    sectionTitle: 'The Holy Trinity',
    text: 'God the Trinity dwells in the soul through the Spirit’s grace, enlightening, sanctifying, and deifying it by participation.',
    attribution: 'St. John Damascene, Exposition of the Orthodox Faith, I.13'
  },
  {
    id: 'quote-trinity-10',
    sectionId: 'holy-trinity',
    sectionTitle: 'The Holy Trinity',
    text: 'Do you not know that the Trinity is within you? That you are His temple, and that God finds delight in dwelling in your soul?',
    attribution: 'St. Teresa of Ávila, The Interior Castle, I.1.3'
  },
  {
    id: 'quote-trinity-11',
    sectionId: 'holy-trinity',
    sectionTitle: 'The Holy Trinity',
    text: 'Because the whole Christ is present in the Eucharist, and Christ is never separated from the Father and the Holy Spirit, the soul that receives Him becomes a temple of the entire Trinity.',
    attribution: 'St. Augustine, Paraphrased from Sermon 272 and De Trinitate, XV.27.50'
  },
  {
    id: 'quote-trinity-12',
    sectionId: 'holy-trinity',
    sectionTitle: 'The Holy Trinity',
    text: 'All actions of the divine persons are one. It is the Trinity that creates, the Trinity that redeems, and the Trinity that sanctifies.',
    attribution: 'St. Augustine'
  },
  {
    id: 'quote-trinity-13',
    sectionId: 'holy-trinity',
    sectionTitle: 'The Holy Trinity',
    text: 'The Father creates all things through the Word in the Holy Spirit.',
    attribution: 'St. Athanasius, Letters to Serapion, I.28'
  },
  {
    id: 'quote-trinity-14',
    sectionId: 'holy-trinity',
    sectionTitle: 'The Holy Trinity',
    text: 'The Father plans, the Son executes, the Spirit completes: one God in three Persons working the salvation of the world.',
    attribution: 'St. Irenaeus of Lyons, Against Heresies, IV.20.1'
  },
  {
    id: 'quote-trinity-15',
    sectionId: 'holy-trinity',
    sectionTitle: 'The Holy Trinity',
    text: 'If you see charity, you see the Trinity.',
    attribution: 'St. Augustine, De Trinitate, VIII.8.12'
  },
  {
    id: 'quote-trinity-16',
    sectionId: 'holy-trinity',
    sectionTitle: 'The Holy Trinity',
    text: 'I live with the Trinity in my soul.',
    attribution: 'St. Teresa of the Andes, Letters'
  },
  {
    id: 'quote-trinity-17',
    sectionId: 'holy-trinity',
    sectionTitle: 'The Holy Trinity',
    text: 'No sooner do I conceive of the One than I am illumined by the splendor of the Three.',
    attribution: 'St. Gregory of Nazianzus, Oration 40, On Holy Baptism'
  },
  {
    id: 'quote-trinity-18',
    sectionId: 'holy-trinity',
    sectionTitle: 'The Holy Trinity',
    text: 'We adore the Trinity in unity and unity in Trinity.',
    attribution: 'St. Vincent of Lérins, Commonitorium, 2.5'
  },
  {
    id: 'quote-trinity-19',
    sectionId: 'holy-trinity',
    sectionTitle: 'The Holy Trinity',
    text: 'The Three Persons are distinct but not divided.',
    attribution: 'St. Robert Bellarmine, Controversies, I.2.5'
  },
  {
    id: 'quote-trinity-20',
    sectionId: 'holy-trinity',
    sectionTitle: 'The Holy Trinity',
    text: 'The mystery of the Trinity is the most sublime and the most profound of all mysteries.',
    attribution: 'St. Thomas Aquinas, Summa Theologiae, I, q.32, a.1'
  },
  {
    id: 'quote-trinity-21',
    sectionId: 'holy-trinity',
    sectionTitle: 'The Holy Trinity',
    text: 'The Trinity is the first principle, without principle, eternal and incomprehensible.',
    attribution: 'St. Bonaventure, Breviloquium, I.1.1'
  },
  {
    id: 'quote-trinity-22',
    sectionId: 'holy-trinity',
    sectionTitle: 'The Holy Trinity',
    text: 'God in His deepest mystery is not a solitude, but a family.',
    attribution: 'St. John Paul II, Homily, Puebla, 1979'
  },
  {
    id: 'quote-trinity-23',
    sectionId: 'holy-trinity',
    sectionTitle: 'The Holy Trinity',
    text: 'The Holy Trinity is a holy family; the Holy Family is a holy trinity.'
  },
  {
    id: 'quote-trinity-24',
    sectionId: 'holy-trinity',
    sectionTitle: 'The Holy Trinity',
    text: 'All our perfection consists in being conformed, united, and consecrated to Jesus Christ, and through Him to the Most Holy Trinity.',
    attribution: 'St. Louis de Montfort, True Devotion to Mary, §120'
  },
  {
    id: 'quote-trinity-25',
    sectionId: 'holy-trinity',
    sectionTitle: 'The Holy Trinity',
    text: 'Let us love the Father as His children, the Son as His members, and the Holy Spirit as His temples.',
    attribution: 'St. John Eudes, The Kingdom of Jesus'
  },

  // =========================================================================
  // 2. JESUS CHRIST
  // =========================================================================
  {
    id: 'quote-christ-1',
    sectionId: 'jesus-christ',
    sectionTitle: 'Jesus Christ',
    text: 'I promise you, in the excessive mercy of my Heart, that my all-powerful love will grant to all those who receive Holy Communion on the first Friday for nine consecutive months the grace of final repentance, they shall not die in my disgrace nor without receiving the Sacraments.',
    attribution: 'Jesus Christ'
  },
  {
    id: 'quote-christ-2',
    sectionId: 'jesus-christ',
    sectionTitle: 'Jesus Christ',
    text: 'What we celebrate in Advent is the threefold coming of the Lord: in the flesh at Bethlehem, in our souls by grace, and in glory at the end of time.',
    attribution: 'St. Bernard of Clairvaux'
  },
  {
    id: 'quote-christ-3',
    sectionId: 'jesus-christ',
    sectionTitle: 'Jesus Christ',
    text: 'A single tear shed at the remembrance of the Passion of Jesus is worth more than a pilgrimage to Jerusalem, or a year of fasting on bread and water.',
    attribution: 'St. Augustine'
  },
  {
    id: 'quote-christ-4',
    sectionId: 'jesus-christ',
    sectionTitle: 'Jesus Christ',
    text: 'Christ has turned all our sunsets into dawns.',
    attribution: 'St. Clement of Alexandria'
  },

  // =========================================================================
  // 3. THE BLESSED VIRGIN MARY
  // =========================================================================
  {
    id: 'quote-mary-1',
    sectionId: 'blessed-virgin-mary',
    sectionTitle: 'The Blessed Virgin Mary',
    text: 'If men knew what eternity is, they would do everything to change their lives.',
    attribution: 'Our Lady of Fatima'
  },
  {
    id: 'quote-mary-2',
    sectionId: 'blessed-virgin-mary',
    sectionTitle: 'The Blessed Virgin Mary',
    text: 'The name of Mary is the key to the gates of Heaven.',
    attribution: 'St. Ephrem'
  },
  {
    id: 'quote-mary-3',
    sectionId: 'blessed-virgin-mary',
    sectionTitle: 'The Blessed Virgin Mary',
    text: 'Tell everyone that God grants graces through the Immaculate Heart of Mary.',
    attribution: 'St. Jacinta Marto'
  },
  {
    id: 'quote-mary-4',
    sectionId: 'blessed-virgin-mary',
    sectionTitle: 'The Blessed Virgin Mary',
    text: 'One day someone asked St. Padre Pio: "Why do you insist so much on the Consecration to the Immaculate Heart of Mary?" He replied: "Because it is the only place where Satan has not set foot and he will never be able to take away the souls who enter there."',
    isNarrative: true
  },
  {
    id: 'quote-mary-5',
    sectionId: 'blessed-virgin-mary',
    sectionTitle: 'The Blessed Virgin Mary',
    text: 'After the Holy Sacrifice of the Mass, the Rosary is the prayer most pleasing to God and most profitable to our souls.',
    attribution: 'St. Alphonsus Liguori'
  },
  {
    id: 'quote-mary-6',
    sectionId: 'blessed-virgin-mary',
    sectionTitle: 'The Blessed Virgin Mary',
    text: 'The Rosary, though clearly Marian in character, is at heart a Christocentric prayer . . . it has all the depth of the Gospel message in its entirety.',
    attribution: 'St. John Paul II, Rosarium Virginis Mariae, 1'
  },
  {
    id: 'quote-mary-7',
    sectionId: 'blessed-virgin-mary',
    sectionTitle: 'The Blessed Virgin Mary',
    text: 'The Rosary is a compendium of the entire Gospel.',
    attribution: 'Pope Pius XII'
  },
  {
    id: 'quote-mary-8',
    sectionId: 'blessed-virgin-mary',
    sectionTitle: 'The Blessed Virgin Mary',
    text: 'The salvation of the whole world began with the “Hail Mary.” Hence, the salvation of each person is also attached to this prayer.',
    attribution: 'St. Louis de Montfort'
  },
  {
    id: 'quote-mary-9',
    sectionId: 'blessed-virgin-mary',
    sectionTitle: 'The Blessed Virgin Mary',
    text: 'It is through Mary that the salvation of the world began, and it is through Mary that it must be brought to completion.',
    attribution: 'St. Louis de Montfort'
  },
  {
    id: 'quote-mary-10',
    sectionId: 'blessed-virgin-mary',
    sectionTitle: 'The Blessed Virgin Mary',
    text: 'A single Hail Mary said devoutly shakes the entire hell, and causes the devil to take flight.',
    attribution: 'St. Alphonsus Liguori, Glories of Mary, Part I, Discourse VI'
  },
  {
    id: 'quote-mary-11',
    sectionId: 'blessed-virgin-mary',
    sectionTitle: 'The Blessed Virgin Mary',
    text: 'My Lady is beautiful, beautiful beyond compare; so beautiful that when one has seen her once, one would wish to die so as to see her again; so beautiful that when one has seen her, one can no longer love anything earthly.',
    attribution: 'St. Bernadette'
  },
  {
    id: 'quote-mary-12',
    sectionId: 'blessed-virgin-mary',
    sectionTitle: 'The Blessed Virgin Mary',
    text: 'Her Son esteems her prayers so greatly, and is so eager to please her that when she prays it seems as if she rather commands, and is rather a queen than a handmaid.',
    attribution: 'St. Peter Damian'
  },
  {
    id: 'quote-mary-13',
    sectionId: 'blessed-virgin-mary',
    sectionTitle: 'The Blessed Virgin Mary',
    text: 'After the most holy and adorable Name of Jesus, there is no name more glorious or more powerful than the name of Mary. At the mention of this name, the angels rejoice and the devils tremble; through this invocation of this name, sinners obtain grace and pardon.',
    attribution: 'St. Peter Canisius'
  },

  // =========================================================================
  // 4. ST. JOSEPH
  // =========================================================================
  {
    id: 'quote-joseph-1',
    sectionId: 'st-joseph',
    sectionTitle: 'St. Joseph',
    text: 'Some saints are privileged to extend to us their patronage with particular efficacy in certain needs, but not in others; but our holy patron St. Joseph has the power to assist us in all cases, in every necessity, in every undertaking.',
    attribution: 'St. Thomas Aquinas'
  },
  {
    id: 'quote-joseph-2',
    sectionId: 'st-joseph',
    sectionTitle: 'St. Joseph',
    text: 'Though thou hast recourse to many saints as thine intercessors, go specially to St. Joseph, for he has great power with God.',
    attribution: 'St. Teresa of Avila'
  },

  // =========================================================================
  // 5. THE SAINTS
  // =========================================================================
  {
    id: 'quote-saints-1',
    sectionId: 'the-saints',
    sectionTitle: 'The saints',
    text: 'The Church is built upon the foundation of the saints. Their sanctity is her defense; their memory, her inspiration; their intercession, her strength.',
    attribution: 'St. John Henry Newman, Parochial and Plain Sermons, vol. 5, Sermon 11'
  },
  {
    id: 'quote-saints-2',
    sectionId: 'the-saints',
    sectionTitle: 'The saints',
    text: 'The saints are those who, by God’s grace, have been gathered from every age and nation into the one body of Christ, where each member plays its part in the unfolding of salvation history.',
    attribution: 'St. Augustine, City of God, XX.9'
  },
  {
    id: 'quote-saints-3',
    sectionId: 'the-saints',
    sectionTitle: 'The saints',
    text: 'The saints are the firstfruits of the new creation; in them we see what awaits those who remain faithful to the promises of Christ.',
    attribution: 'St. Ambrose of Milan, On the Sacraments, V.4.25'
  },
  {
    id: 'quote-saints-4',
    sectionId: 'the-saints',
    sectionTitle: 'The saints',
    text: 'If we study the virtues of the saints, we shall see that it was chiefly by their love of prayer, mortification, humility, and obedience that they became holy.',
    attribution: 'St. Alphonsus Liguori, The Way of Salvation and Perfection'
  },
  {
    id: 'quote-saints-5',
    sectionId: 'the-saints',
    sectionTitle: 'The saints',
    text: 'What the Scriptures proclaim in words, the lives of the saints proclaim by example.',
    attribution: 'St. Gregory the Great, Homilies on the Gospels, 1.1'
  },
  {
    id: 'quote-saints-6',
    sectionId: 'the-saints',
    sectionTitle: 'The saints',
    text: 'The lives of the saints are the most authentic commentary on the Gospel. Their virtues explain what the words alone cannot fully convey.',
    attribution: 'St. Francis de Sales, Introduction to the Devout Life, II.16'
  },
  {
    id: 'quote-saints-7',
    sectionId: 'the-saints',
    sectionTitle: 'The saints',
    text: 'The saints are the true interpreters of Scripture, because they lived the Word of God and gave it flesh through their virtues.',
    attribution: 'Pope Benedict XVI, General Audience, April 13, 2011'
  },
  {
    id: 'quote-saints-8',
    sectionId: 'the-saints',
    sectionTitle: 'The saints',
    text: 'In every age God raises up saints as signs of His providence and instruments of His mercy, to lead others more securely along the path of salvation.',
    attribution: 'St. Thomas Aquinas, Summa Theologiae, II-II, q. 174, a. 6'
  },
  {
    id: 'quote-saints-9',
    sectionId: 'the-saints',
    sectionTitle: 'The saints',
    subHeading: 'St. Athanasius',
    text: 'Athanasius stood alone, and he saved the faith.',
    attribution: 'St. Gregory Nazianzen, Oration 21'
  },
  {
    id: 'quote-saints-10',
    sectionId: 'the-saints',
    sectionTitle: 'The saints',
    subHeading: 'St. Augustine',
    text: 'He is the greatest of the Fathers and the teacher of grace; from his pen came a theology that shaped Western Christendom.',
    attribution: 'St. Thomas Aquinas, Commentary on the Sentences, I.3'
  },
  {
    id: 'quote-saints-11',
    sectionId: 'the-saints',
    sectionTitle: 'The saints',
    subHeading: 'St. Thomas Aquinas',
    text: 'Among all the Doctors, Thomas shines like the sun. He gave to the Church a synthesis that is both faithful and luminous.',
    attribution: 'Pope Leo XIII, Aeterni Patris, no. 17'
  },
  {
    id: 'quote-saints-12',
    sectionId: 'the-saints',
    sectionTitle: 'The saints',
    text: 'He enlightened the Church more than all the other Doctors. In his writings one profits more in one year than in the study of others in a whole lifetime.',
    attribution: 'Pope Pius XI, Studiorum Ducem, no. 11'
  },
  {
    id: 'quote-saints-13',
    sectionId: 'the-saints',
    sectionTitle: 'The saints',
    text: 'His humility matched his intellect, and he saw knowledge as a pathway to union with God.',
    attribution: 'G. K. Chesterton, The Dumb Ox, ch. 5'
  },
  {
    id: 'quote-saints-14',
    sectionId: 'the-saints',
    sectionTitle: 'The saints',
    subHeading: 'St. Francis of Assisi',
    text: '“Rebuild my Church,” Christ said to him, and Francis did so not with stones but with holiness.',
    attribution: 'St. Bonaventure, Legenda Maior, ch. 2'
  },
  {
    id: 'quote-saints-15',
    sectionId: 'the-saints',
    sectionTitle: 'The saints',
    text: 'He appeared not so much a man praying as a prayer made flesh.',
    attribution: 'St. Bonaventure, Legenda Maior, ch. 10'
  },
  {
    id: 'quote-saints-16',
    sectionId: 'the-saints',
    sectionTitle: 'The saints',
    text: 'The saints have always been the source and origin of renewal in the most difficult moments in the Church’s history.',
    attribution: 'St. Ignatius of Antioch'
  },

  // =========================================================================
  // 6. THE CATHOLIC CHURCH
  // =========================================================================
  {
    id: 'quote-church-1',
    sectionId: 'catholic-church',
    sectionTitle: 'The Catholic Church',
    text: 'The Catholic Church is the one true fold of the Redeemer, the pillar and ground of the truth.',
    attribution: 'St. John Henry Newman, Apologia Pro Vita Sua, ch. 5'
  },
  {
    id: 'quote-church-2',
    sectionId: 'catholic-church',
    sectionTitle: 'The Catholic Church',
    text: 'On the whole, all parties will agree that, of all existing systems, the present communion of Rome is the nearest approximation in fact to the Church of the Fathers, possibly though some may think it, to be nearer still to that Church on paper . . . Did St. Athanasius or St. Ambrose come suddenly to life, it cannot be doubted what communion he would take to be his own. All surely will agree that these Fathers . . . would find themselves more at home with such men as St Bernard or St Ignatius Loyola . . . or the holy sisterhood of mercy.',
    attribution: 'St. John Henry Newman'
  },
  {
    id: 'quote-church-3',
    sectionId: 'catholic-church',
    sectionTitle: 'The Catholic Church',
    text: 'And, further, it is the nearest approach, to say the least, to the religious sentiment, and what is called ethos, of the early Church, nay, to that of the Apostles and Prophets; for all will agree so far as this, that Elijah, Jeremiah, the Baptist, and St. Paul are in their history and mode of life (I do not speak of measures of grace, no, nor of doctrine and conduct, for these are the points in dispute, but) in what is external and meets the eye (and this is no slight resemblance when things are viewed as a whole and from a distance),—these saintly and heroic men, I say, are more like a Dominican preacher, or a Jesuit missionary, or a Carmelite friar, more like St. Toribio, or St. Vincent Ferrer, or St. Francis Xavier, or St. Alphonso Liguori, than to any individuals, or to any classes of men, that can be found in other communions.',
    attribution: 'St. John Henry Newman'
  },
  {
    id: 'quote-church-4',
    sectionId: 'catholic-church',
    sectionTitle: 'The Catholic Church',
    text: 'The Church is the continuation of Christ’s presence through time. As Christ is immutable, so the Church preserves in herself the unchanging truth.',
    attribution: 'St. Thomas Aquinas, Summa Theologiae, III, q. 8, a. 3'
  },
  {
    id: 'quote-church-5',
    sectionId: 'catholic-church',
    sectionTitle: 'The Catholic Church',
    text: 'Wherever Jesus Christ is, there is the Catholic Church.',
    attribution: 'St. Ignatius of Antioch, Letter to the Smyrnaeans, 8.2'
  },
  {
    id: 'quote-church-6',
    sectionId: 'catholic-church',
    sectionTitle: 'The Catholic Church',
    text: 'In the Catholic Church herself, all possible care must be taken that we hold that faith which has been believed everywhere, always, by all. This is truly and properly Catholic.',
    attribution: 'St. Vincent of Lérins, Commonitorium, ch. 2'
  },
  {
    id: 'quote-church-7',
    sectionId: 'catholic-church',
    sectionTitle: 'The Catholic Church',
    text: 'The Church of Christ, the careful and watchful guardian of the dogmas deposited in her charge, changes nothing in them, diminishes nothing, adds nothing, but she develops them faithfully, unfolding them in the same doctrine, in the same meaning, and in the same judgment.”',
    attribution: 'St. Vincent of Lérins, Commonitorium, ch. 23'
  },
  {
    id: 'quote-church-8',
    sectionId: 'catholic-church',
    sectionTitle: 'The Catholic Church',
    text: 'Divine truth never changes, though our understanding of it may deepen with time. What was once taught in mystery is now taught more clearly, but never differently.',
    attribution: 'St. Gregory the Great, Homilies on Ezekiel, I.7.8'
  },
  {
    id: 'quote-church-9',
    sectionId: 'catholic-church',
    sectionTitle: 'The Catholic Church',
    text: 'The Church has been established by Christ to care for souls: to instruct, to sanctify, to guide, to save.',
    attribution: 'Pope St. Pius X, E Supremi Apostolatus, no. 5'
  },
  {
    id: 'quote-church-10',
    sectionId: 'catholic-church',
    sectionTitle: 'The Catholic Church',
    text: 'Where the Church is, there is the Spirit of God, and where the Spirit of God is, there is all grace and truth.',
    attribution: 'St. Irenaeus of Lyons, Against Heresies, III.24.1'
  },
  {
    id: 'quote-church-11',
    sectionId: 'catholic-church',
    sectionTitle: 'The Catholic Church',
    text: 'The Catholic Church is the continuation of the Incarnation through time. Without her, Europe would never have been born.',
    attribution: 'Hilaire Belloc, Europe and the Faith, ch. 3'
  },
  {
    id: 'quote-church-12',
    sectionId: 'catholic-church',
    sectionTitle: 'The Catholic Church',
    text: 'The Church is the world’s soul; if she does not breathe, the world suffocates.',
    attribution: 'Henri de Lubac, Catholicism, ch. 5'
  },
  {
    id: 'quote-church-13',
    sectionId: 'catholic-church',
    sectionTitle: 'The Catholic Church',
    text: 'The Church has guided mankind’s conscience, often against the tide, lifting it from barbarism to a moral and spiritual order.',
    attribution: 'Romano Guardini, The Church and the Catholic, ch. 2'
  },
  {
    id: 'quote-church-14',
    sectionId: 'catholic-church',
    sectionTitle: 'The Catholic Church',
    text: 'The Church is the sacrament of history—it is in her that time is consecrated, fulfilled, and directed to God.',
    attribution: 'Jean Cardinal Daniélou, The Salvation of the Nations (1950)'
  },
  {
    id: 'quote-church-15',
    sectionId: 'catholic-church',
    sectionTitle: 'The Catholic Church',
    text: 'The Church was buried in the catacombs; she rose again with Constantine. She died in the Dark Ages; she rose again with Charlemagne. She died with the Renaissance; she rose again with the saints of the Counter- Reformation. You cannot kill the Catholic Church.',
    attribution: 'Fr. Ronald Knox'
  },

  // =========================================================================
  // 7. THE HOLY BIBLE
  // =========================================================================
  {
    id: 'quote-bible-1',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The author of Holy Scripture is God.',
    attribution: 'St. Thomas Aquinas, Summa Theologiae, I, q.1, a.10'
  },
  {
    id: 'quote-bible-2',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'Each verse of Scripture is a spark of the divine.',
    attribution: 'Fr. George Leo Haydock'
  },
  {
    id: 'quote-bible-3',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The Holy Scriptures are our letters from home.',
    attribution: 'St. Augustine, Expositions on the Psalms'
  },
  {
    id: 'quote-bible-4',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'When we pray, we talk to God; when we read Scripture, God talks to us.',
    attribution: 'St. Isidore of Seville'
  },
  {
    id: 'quote-bible-5',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'Scripture grows with the one who reads it.',
    attribution: 'St. Gregory the Great, Moralia in Job, Preface'
  },
  {
    id: 'quote-bible-6',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'Let us drink deeply from the springs of Scripture.',
    attribution: 'St. John Cassian'
  },
  {
    id: 'quote-bible-7',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'Apply yourself wholly to the Scriptures, and apply the Scriptures wholly to yourself.',
    attribution: 'Johann A. Bengel'
  },
  {
    id: 'quote-bible-8',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The study of the sacred page is the soul of sacred theology.',
    attribution: 'St. Thomas Aquinas'
  },
  {
    id: 'quote-bible-9',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'Scripture is the soul of all theology and the heart of all liturgy.',
    attribution: 'Fr. Henri de Lubac, SJ'
  },
  {
    id: 'quote-bible-10',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The Scriptures are consistent, harmonious, and clear, being spoken by one and the same Spirit.',
    attribution: 'St. Irenaeus of Lyons, Against Heresies, Book II, 28.2'
  },
  {
    id: 'quote-bible-11',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'All Sacred Scripture is but one book, and that one book is Christ, because all divine Scripture speaks of Christ, and all divine Scripture is fulfilled in Christ.',
    attribution: 'Hugh of St. Victor, De arca Noe 2, 8: PL 176, 642'
  },
  {
    id: 'quote-bible-12',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The Bible is the inspired account of salvation history, revealing the mystery of Christ from Genesis to Revelation.',
    attribution: 'Mary Healy, Men and Women Are from Eden'
  },
  {
    id: 'quote-bible-13',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The whole of Scripture teaches and illustrates the gradual unfolding of the divine plan of salvation.',
    attribution: 'Pope Leo XIII, Providentissimus Deus'
  },
  {
    id: 'quote-bible-14',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'From Genesis to the Gospels, from the Law to the Apostles, the Scriptures whisper one name—Christ. He is the marrow of the Bible.',
    attribution: 'St. John Chrysostom, Homilies on Matthew, 2.6'
  },
  {
    id: 'quote-bible-15',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'He is in Genesis as Creator, in Exodus as Deliverer, in the Prophets as the One to come, in the Gospels as Redeemer, and in the Apocalypse as Judge and King.',
    attribution: 'St. Ambrose of Milan, Expositio Evangelii secundum Lucam, IV.6'
  },
  {
    id: 'quote-bible-16',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'Everything in Scripture speaks of Christ: from the Law to the Psalms, from the Prophets to the Apostles, He is proclaimed as the One who was, is, and is to come.',
    attribution: 'St. Cyril of Jerusalem, Catechetical Lectures, XIII.12'
  },
  {
    id: 'quote-bible-17',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The Law prefigured Him, the Prophets foretold Him, the Psalms sang of Him, the Gospels revealed Him, and the Apostles preached Him. Christ is the fullness of all Scripture.',
    attribution: 'St. Cyril of Alexandria, Commentary on John, Book I'
  },
  {
    id: 'quote-bible-18',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'Christ is not merely the center of Scripture; He is its totality. The Law predicts Him, the Prophets announce Him, the Psalms sing of Him, the Gospels unveil Him, and the Letters preach Him.',
    attribution: 'Aidan Nichols, O.P., Lovely Like Jerusalem, ch. 5'
  },
  {
    id: 'quote-bible-19',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'Revelation is not given all at once, but like the dawn: Christ appears in twilight in the patriarchs, in morning light in the prophets, and in noonday brilliance in the Gospels.',
    attribution: 'St. John Henry Newman, Parochial and Plain Sermons, Vol. VI'
  },
  {
    id: 'quote-bible-20',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The Scriptures, though many in form and diverse in writing, have one theme running through them: the revelation of Jesus Christ, the Son of God.',
    attribution: 'St. Irenaeus of Lyons, Against Heresies, IV.20.11'
  },
  {
    id: 'quote-bible-21',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'Jesus is the key to the Scriptures, the light of salvation history, the fulfillment of every promise.',
    attribution: 'St. Cyril of Jerusalem, Catechetical Lectures, 10.9'
  },
  {
    id: 'quote-bible-22',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'Only when we read Scripture as a whole, centered on Christ, do we understand its deepest meaning. Christ is the interpretive key to all Scripture.',
    attribution: 'Joseph Ratzinger, Jesus of Nazareth, Vol. I'
  },
  {
    id: 'quote-bible-23',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The Scriptures have a body, a soul, and a spirit. The body is the literal sense, the soul is the moral teaching, and the spirit is the hidden mystery of Christ.',
    attribution: 'Origen, On First Principles, IV.2.4'
  },
  {
    id: 'quote-bible-24',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'Christ is not simply one among the many meanings of Scripture; He is the final and fullest meaning, in whom all its mysteries converge.',
    attribution: 'Michael Dauphinais and Matthew Levering, Holy People, Holy Land'
  },
  {
    id: 'quote-bible-25',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'In all the Scriptures, seek Christ—for He is the treasure hidden in the field.',
    attribution: 'St. Ambrose of Milan, On the Holy Spirit, II.96'
  },
  {
    id: 'quote-bible-26',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'In the Law and the Prophets I see sketches; in Christ, the living image.',
    attribution: 'Bl. Miriam Teresa Demjanovich'
  },
  {
    id: 'quote-bible-27',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'In every page of Scripture, Christ walks as shadow, type, and truth.',
    attribution: 'St. Jerome, Letter 53, to Paulinus'
  },
  {
    id: 'quote-bible-28',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'In every page of the Bible, Christ walks among us, sometimes hidden, sometimes revealed; always as the light behind the letter.',
    attribution: 'St. Bonaventure, Breviloquium, Prologue'
  },
  {
    id: 'quote-bible-29',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'Christ is the golden thread that runs through every part of the Bible, uniting what is dispersed, illuminating what is dark.',
    attribution: 'St. Edith Stein, Collected Works, Vol. II'
  },
  {
    id: 'quote-bible-30',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The Scriptures are to be interpreted in the sense of the Church.',
    attribution: 'St. Robert Bellarmine, De controversiis'
  },
  {
    id: 'quote-bible-31',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'We must read the Bible with the spirit of the Church.',
    attribution: 'St. Louis de Montfort, True Devotion to Mary'
  },
  {
    id: 'quote-bible-32',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'To grasp the Bible as a unified story, one must see its covenantal spine.',
    attribution: 'Fr. Robert Barron'
  },
  {
    id: 'quote-bible-33',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'A covenant is not a mere contract; it is the divine embrace, wherein the Eternal stoops in mercy to bind Himself to the dust He has made.',
    attribution: 'St. John Henry Newman, Parochial and Plain Sermons, vol. 4'
  },
  {
    id: 'quote-bible-34',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'All Scripture is covenant: God revealing Himself progressively to draw us into union.',
    attribution: 'Origen, Homilies on Leviticus, 1.5.'
  },
  {
    id: 'quote-bible-35',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'God in His covenant revealed Himself gradually—as the light dawns in stages, so the Law, the Prophets, and the Christ.',
    attribution: 'St. Gregory of Nyssa, Contra Eunomium, II.10'
  },
  {
    id: 'quote-bible-36',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The covenants of God are like stages in a great pedagogy, leading the soul from shadow to reality, from law to grace, from fear to love.',
    attribution: 'Origen of Alexandria, Homilies on Leviticus, 9.7'
  },
  {
    id: 'quote-bible-37',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'Every covenant in the Bible builds upon the last and drives salvation history forward to Christ and His Church.',
    attribution: 'Brant Pitre, Jesus and the Jewish Roots of the Eucharist'
  },
  {
    id: 'quote-bible-38',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The New Testament is in the Old concealed, the Old is in the New revealed. The covenants are not contradictions, but one revelation unfolding.',
    attribution: 'St. Augustine, Quaestiones in Heptateuchum, II.73'
  },
  {
    id: 'quote-bible-39',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The Old Covenant remains God’s irrevocable gift; it is the root into which the New Covenant is grafted.',
    attribution: 'Hans Urs von Balthasar, The Glory of the Lord, vol. 6 (San Francisco: Ignatius Press, 1991), 237.'
  },
  {
    id: 'quote-bible-40',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The Old Testament is the letter that prepares for the spirit; the New is the spirit that fulfills the letter.',
    attribution: 'Hugh of St. Victor, De Sacramentis Christianae Fidei 1.6.'
  },
  {
    id: 'quote-bible-41',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The Old Covenant gave commandments; the New gives the grace to fulfill them.',
    attribution: 'St. Augustine, Against Faustus, XIX.18'
  },
  {
    id: 'quote-bible-42',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'He who gave the Old Covenant through Moses has given the New through His Son.',
    attribution: 'St. Cyril of Jerusalem, Catechetical Lectures, 10'
  },
  {
    id: 'quote-bible-43',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The New concludes the Old and yet the New includes the Old.',
    attribution: 'Scott Hahn'
  },
  {
    id: 'quote-bible-44',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The dignity of the old covenant was to prepare for the majesty of the new.',
    attribution: 'St. Leo the Great, Sermon 28, On the Nativity'
  },
  {
    id: 'quote-bible-45',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The whole Old Testament is a vast prophecy, and Christ is its fulfillment—not by abolishing, but by fulfilling in Himself all its types and figures.',
    attribution: 'Jean Daniélou, From Shadows to Reality, p. 27'
  },
  {
    id: 'quote-bible-46',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'Who can fail to see that the entire Old Testament is a prophecy of the New?',
    attribution: 'St. Augustine'
  },
  {
    id: 'quote-bible-47',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'In the Old Testament, we have the ground plan; in the New, the structure built upon it.',
    attribution: 'St. Jerome, Letter to Paulinus, Ep. 53.8'
  },
  {
    id: 'quote-bible-48',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The principal purpose of the Old Law is to prepare for Christ; the principal purpose of the New Law is to manifest Christ.',
    attribution: 'St. Thomas Aquinas, Summa Theologiae, I–II, q. 107, a. 2'
  },
  {
    id: 'quote-bible-49',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'Christ is the axis of Scripture. The two Testaments rotate around Him: the one anticipates Him, the other reveals Him.',
    attribution: 'Jean Daniélou, S.J., From Shadows to Reality'
  },
  {
    id: 'quote-bible-50',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'Christ is not merely a link between two parts of Scripture; He is its hinge, its axis, its living synthesis. In Him the unity of the Bible finds flesh.',
    attribution: 'Henri de Lubac, S.J., Medieval Exegesis, Vol. I'
  },
  {
    id: 'quote-bible-51',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The Law was the foreshadowing; the covenant in Christ is the fulfillment. That which was once carved in stone is now written on hearts.',
    attribution: 'St. Ambrose of Milan, On the Mysteries, 5.25'
  },
  {
    id: 'quote-bible-52',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'What the letter veils, Christ unveils; what the shadow promises, the Light fulfills.',
    attribution: 'St. Gregory the Great, Homilies on the Gospels, 1.14'
  },
  {
    id: 'quote-bible-53',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The grace of the New Covenant excels the glory of the Old as truth surpasses shadow.',
    attribution: 'St. Thomas Aquinas, Summa Theologiae, I–II, q. 107, a. 2'
  },
  {
    id: 'quote-bible-54',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The five Old Testament covenants are the spine of salvation history, each forming the structure of divine family.',
    attribution: 'Dr. Brant Pitre'
  },
  {
    id: 'quote-bible-55',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The five major covenants in Scripture—Adam, Noah, Abraham, Moses, David—all point to the new and everlasting covenant in Jesus Christ.',
    attribution: 'Brant Pitre'
  },
  {
    id: 'quote-bible-56',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The covenant of Christ surpasses all, for it is sealed with His own blood and brings eternal life.',
    attribution: 'St. Cyril of Jerusalem, Catechetical Lectures, 13.6'
  },
  {
    id: 'quote-bible-57',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'Divine Mercy is the soul of the covenant: a love that forgets sin and remembers the promise.',
    attribution: 'St. Faustina Kowalska, Diary: Divine Mercy in My Soul, §1485'
  },
  {
    id: 'quote-bible-58',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'Blessed be God who sealed the covenant with Noah with the bow, with Abraham by fire, with Israel by blood, and with the Church by His Spirit.',
    attribution: 'St. Ephrem the Syrian, Hymns on Paradise, 9.26'
  },
  {
    id: 'quote-bible-59',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The covenant of faith does not change, but grows; not altered in substance, but unfolded in understanding.',
    attribution: 'St. Vincent of Lérins, Commonitorium, 23'
  },
  {
    id: 'quote-bible-60',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The Incarnation is the hinge of salvation history—God entered time so that man might enter eternity.',
    attribution: 'St. Cyril of Alexandria, Commentary on John, 1.14'
  },
  {
    id: 'quote-bible-61',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'God’s plan for salvation is inseparably linked to Mary, from the first promise in Eden to the new creation in Christ.',
    attribution: 'St. Louis de Montfort, True Devotion to Mary, §36'
  },
  {
    id: 'quote-bible-62',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The history of salvation is the progressive revelation of the Word, who from the beginning has guided all to union with God.',
    attribution: 'St. Maximus the Confessor, Ambigua, 41'
  },
  {
    id: 'quote-bible-63',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The history of salvation is the unfolding of covenants: God ever faithful, man ever faltering, and yet redeemed.',
    attribution: 'Pope Pius XI, Miserentissimus Redemptor, §7'
  },
  {
    id: 'quote-bible-64',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'Salvation unfolds like dawn: first faint light in the prophets, then full day in Christ.',
    attribution: 'St. Bernard of Clairvaux, Sermons on the Song of Songs, 28.1'
  },
  {
    id: 'quote-bible-65',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'Everything in the Old Testament was a shadow of the things to come.',
    attribution: 'St. Cyril of Jerusalem, Catechetical Lectures, 13.1'
  },
  {
    id: 'quote-bible-66',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The Old Law is a figure of the New; the ceremonial prefigures the sacramental.',
    attribution: 'St. Thomas Aquinas, Summa Theologiae, I–II, q.107, a.2'
  },
  {
    id: 'quote-bible-67',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'All the rivers of prophecy flow into the ocean of Christ. In Him the veiled words of the prophets are made flesh, and history becomes sacrament.',
    attribution: 'St. Bernard of Clairvaux, Sermons on the Song of Songs, 15.6'
  },
  {
    id: 'quote-bible-68',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'Typology is God’s poetry in history: the rhyme and meter of redemption.',
    attribution: 'Peter Kreeft, You Can Understand the Bible'
  },
  {
    id: 'quote-bible-69',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'Typology is the music of Scripture.',
    attribution: 'Fr. Jean Daniélou, SJ'
  },
  {
    id: 'quote-bible-70',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The types are shadows cast by the light of Christ before He entered the world.',
    attribution: 'St. Basil the Great, On the Holy Spirit, 15.36'
  },
  {
    id: 'quote-bible-71',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'In the beginning, God formed Adam, and in the end, He refashioned him in Christ.',
    attribution: 'St. Irenaeus, Adversus Haereses, 3.22.1'
  },
  {
    id: 'quote-bible-72',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The first Eve sprang from the side of Adam; the Church was born from the side of Christ.',
    attribution: 'St. Methodius of Olympus, Symposium, 2'
  },
  {
    id: 'quote-bible-73',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'Adam is the type, Christ the reality; Eve is the figure, Mary the fulfillment.',
    attribution: 'St. Ephrem the Syrian, Hymns on the Nativity, 10.1'
  },
  {
    id: 'quote-bible-74',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The types in the Old are fulfilled in the New. The sacrifice of Isaac was a shadow of the crucifixion.',
    attribution: 'John Chrysostom, Homily on Genesis, 47'
  },
  {
    id: 'quote-bible-75',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'In Isaac, we see the image of Christ, offered by the Father, carrying the wood on which he was to be sacrificed.',
    attribution: 'St. Ambrose, De Sacramentis, 2.2.6'
  },
  {
    id: 'quote-bible-76',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'What Moses prefigured in the Passover, Christ fulfilled on the Cross.',
    attribution: 'St. Gregory of Nyssa, Catechetical Oration, 33'
  },
  {
    id: 'quote-bible-77',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The sacrament of baptism was prefigured in the crossing of the Red Sea.',
    attribution: 'St. Ambrose, De Sacramentis, 1.4'
  },
  {
    id: 'quote-bible-78',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The waters of the flood, the waters of the Red Sea, and the waters from Christ’s side—all prefigure baptism.',
    attribution: 'St. Cyril of Jerusalem, Catechetical Lectures, 3.3'
  },
  {
    id: 'quote-bible-79',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The Passover of the Law prefigured the true Passover of the Lamb of God.',
    attribution: 'St. Athanasius, Festal Letters, 4.2'
  },
  {
    id: 'quote-bible-80',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'Recognize in the bread what hung on the cross, and in the cup what flowed from His side.',
    attribution: 'St. Augustine, Sermon 272'
  },
  {
    id: 'quote-bible-81',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'He who hung on the tree has written the covenant with His Blood—not with ink but with crimson grace.',
    attribution: 'St. Melito of Sardis, On Pascha, 96'
  },
  {
    id: 'quote-bible-82',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The Church is the ark of the new covenant, into which all nations are gathered for salvation.',
    attribution: 'St. Hippolytus of Rome, Commentary on Daniel, 2.6'
  },
  {
    id: 'quote-bible-83',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The Liturgy of the Word demonstrates how the Old Covenant was a preparation for the New.',
    attribution: 'General Instruction of the Roman Missal, §57'
  },
  {
    id: 'quote-bible-84',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The types must pass away, for the Truth has come in flesh.',
    attribution: 'St. Gregory Nazianzus'
  },
  {
    id: 'quote-bible-85',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'All history before Christ was a preparation; all history after Him is a proclamation.',
    attribution: 'St. Bede the Venerable, Homilies on the Gospels, I.1'
  },
  {
    id: 'quote-bible-86',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The Gospel speaks of three who were dead and who were visibly restored to life by our Lord, but He has restored thousands invisibly.',
    attribution: 'St. Augustine'
  },
  {
    id: 'quote-bible-87',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The world is the first Bible that God made for the instruction of man.',
    attribution: 'St. Clement of Alexandria'
  },
  {
    id: 'quote-bible-88',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'May your behavior and your conversation be such that everyone who sees or hears you can say: this man reads the Gospel.',
    attribution: 'St. Josemaría Escrivá'
  },
  {
    id: 'quote-bible-89',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'Let your thoughts be clothed with the Word.',
    attribution: 'Bl. Dina Bélanger'
  },
  {
    id: 'quote-bible-90',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The Word of God is not a fossilized text, but a living address.',
    attribution: 'Fr. Joseph Ratzinger'
  },
  {
    id: 'quote-bible-91',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'God pursues you even when you flee from Him. He has planned your salvation before you knew how to seek Him.',
    attribution: 'St. John Chrysostom, Homilies on Genesis, 2.3'
  },
  {
    id: 'quote-bible-92',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'It is a great thing, this reading of the Scriptures! For it is not possible ever to exhaust the mind of the Scriptures. It is a well that has no bottom.',
    attribution: 'St. John Chrysostom'
  },
  {
    id: 'quote-bible-93',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The Word of God is limitless and cannot be exhausted by our understanding.',
    attribution: 'St. Gregory of Nyssa, On the Beatitudes, I'
  },
  {
    id: 'quote-bible-94',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The word of God is light to the mind and fire to the will.',
    attribution: 'St. Anthony of Padua, Sermones Dominicales'
  },
  {
    id: 'quote-bible-95',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'The Bible does not teach us how the heavens go, but how to go to Heaven.',
    attribution: 'Galileo Galilei'
  },
  {
    id: 'quote-bible-96',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'He who hath heard the Word of God can bear his silences.',
    attribution: 'St. Ignatius of Loyola'
  },
  {
    id: 'quote-bible-97',
    sectionId: 'holy-bible',
    sectionTitle: 'The Holy Bible',
    text: 'It is the whole business of the whole church to preach the whole gospel to the whole world.',
    attribution: 'Charles Spurgeon'
  },

  // =========================================================================
  // 8. FAITH
  // =========================================================================
  {
    id: 'quote-faith-1',
    sectionId: 'faith',
    sectionTitle: 'Faith',
    text: 'Faith is to believe what you do not yet see; the reward for this faith is to see what you believe.',
    attribution: 'St. Augustine'
  },
  {
    id: 'quote-faith-2',
    sectionId: 'faith',
    sectionTitle: 'Faith',
    text: 'Faith and reason are like two wings on which the human spirit rises to the contemplation of truth.',
    attribution: 'Pope St. John Paul II, Fides et Ratio (1998), §1'
  },
  {
    id: 'quote-faith-3',
    sectionId: 'faith',
    sectionTitle: 'Faith',
    text: 'For I do not seek to understand that I may believe, but I believe in order to understand. For this also I believe—that unless I believe, I should not understand.',
    attribution: 'St. Anselm'
  },
  {
    id: 'quote-faith-4',
    sectionId: 'faith',
    sectionTitle: 'Faith',
    text: 'I would not believe if I did not realize that it is reasonable to believe.',
    attribution: 'St. Thomas Aquinas'
  },
  {
    id: 'quote-faith-5',
    sectionId: 'faith',
    sectionTitle: 'Faith',
    text: 'We hold that faith which has been believed everywhere, always, and by all.',
    attribution: 'St. Vincent of Lérins, Commonitorium, 2.6'
  },
  {
    id: 'quote-faith-6',
    sectionId: 'faith',
    sectionTitle: 'Faith',
    text: 'Faith is not opposed to reason, but goes before it, leading the mind into light.',
    attribution: 'St. Anselm, Monologion, ch. 78'
  },
  {
    id: 'quote-faith-7',
    sectionId: 'faith',
    sectionTitle: 'Faith',
    text: 'For faith without works cannot please, nor can good works without faith.',
    attribution: 'St. Bede'
  },
  {
    id: 'quote-faith-8',
    sectionId: 'faith',
    sectionTitle: 'Faith',
    text: 'To one who has faith, no explanation is necessary. To one without faith, no explanation is possible.',
    attribution: 'St. Thomas Aquinas'
  },
  {
    id: 'quote-faith-9',
    sectionId: 'faith',
    sectionTitle: 'Faith',
    text: 'Where signs and testimonies abound, there is less merit in believing.',
    attribution: 'St. John of the Cross'
  },

  // =========================================================================
  // 9. SPIRITUAL WARFARE
  // =========================================================================
  {
    id: 'quote-warfare-1',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'The soul that is united with God is feared by the devil as though it were God himself.',
    attribution: 'St. John of the Cross'
  },
  {
    id: 'quote-warfare-2',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'The devil is strong, but Christ is almighty. If we are in Christ, no force can move us.',
    attribution: 'St. Lawrence of Brindisi'
  },
  {
    id: 'quote-warfare-3',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'With Jesus, I fear nothing; though hell itself were to rise against me.',
    attribution: 'St. Gemma Galgani'
  },
  {
    id: 'quote-warfare-4',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'You carry a God within you, and yet you seek help from outside? Know your dignity and repel the enemy.',
    attribution: 'St. John Chrysostom'
  },
  {
    id: 'quote-warfare-5',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'The devil is very afraid of us when we make the sign of the cross.',
    attribution: 'St. Jean Vianney'
  },
  {
    id: 'quote-warfare-6',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'The demons tremble at the name of Jesus. Invoke it with fear and reverence, and they will flee.',
    attribution: 'St. Nilus of Sinai'
  },
  {
    id: 'quote-warfare-7',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'Jesus, I trust in You—this disarms Satan.',
    attribution: 'St. Faustina'
  },
  {
    id: 'quote-warfare-8',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'The most terrible enemy of the devil is Mary, for she crushes his head with her humility.',
    attribution: 'St. Louis de Montfort'
  },
  {
    id: 'quote-warfare-9',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'The demons are very anxious in their pursuit of souls, yet, they quickly abandon their prey merely at the name of Mary.',
    attribution: 'St. Bridget Of Sweden'
  },
  {
    id: 'quote-warfare-10',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'Bear in mind that the more the enemy assaults you, the closer God is to your soul. Think about that and penetrate this great and comforting truth.',
    attribution: 'St. Padre Pio'
  },
  {
    id: 'quote-warfare-11',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'The more the soul advances, the more fiercely the devil assails it.',
    attribution: 'St. Gregory the Great'
  },
  {
    id: 'quote-warfare-12',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'The most terrible of all the weapons in the armory of God is the humility of His saints.',
    attribution: 'St. Louis de Montfort, True Devotion to Mary, 114'
  },
  {
    id: 'quote-warfare-13',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'Humility is the armor of the saints.',
    attribution: 'St. Vincent de Paul'
  },
  {
    id: 'quote-warfare-14',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'The demons fear humility more than the discipline of asceticism.',
    attribution: 'St. John Climacus'
  },
  {
    id: 'quote-warfare-15',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'The humble soul confounds Satan more than a thousand exorcisms.',
    attribution: 'St. Louis de Montfort'
  },
  {
    id: 'quote-warfare-16',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'The devil fears a humble soul more than a thousand proud theologians.',
    attribution: 'St. Teresa of Ávila, The Way of Perfection, ch. 38'
  },
  {
    id: 'quote-warfare-17',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'The devil fears a soul armed with humility more than a thousand warriors girded with iron.',
    attribution: 'St. Bernard of Clairvaux, Sermons on the Song of Songs, 33.16'
  },
  {
    id: 'quote-warfare-18',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'A soul steeped in the Eucharist is like iron in the fire—it becomes untouchable.',
    attribution: 'St. John Eudes'
  },
  {
    id: 'quote-warfare-19',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'When you have received the Body of the Lord, you are armed more terribly than a lion. The devil trembles and flees from you.',
    attribution: 'St. John Chrysostom, Homilies on John, 46.3'
  },
  {
    id: 'quote-warfare-20',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'The devil has no power over a soul who adores Christ in the Blessed Sacrament.',
    attribution: 'St. Leonard of Port Maurice'
  },
  {
    id: 'quote-warfare-21',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'The Precious Blood of Christ is our invincible armor.',
    attribution: 'St. Gaspar del Bufalo'
  },
  {
    id: 'quote-warfare-22',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'Each drop of Thy most precious Blood suffices to redeem a thousand worlds.',
    attribution: 'St. Gertrude the Great, The Herald of Divine Love, Book 2'
  },
  {
    id: 'quote-warfare-23',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'If we wish to understand the power of Christ’s blood, we should go back to the ancient account of its prefiguration in Egypt.',
    attribution: 'St. John Chrysostom'
  },
  {
    id: 'quote-warfare-24',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'Anyone who doesn’t pray doesn’t need any devil to tempt him; while whoever prays, even if only for a quarter of an hour each day, will necessarily be saved.',
    attribution: 'St. Teresa of Ávila'
  },
  {
    id: 'quote-warfare-25',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'The devil knows he has lost the soul who perseveres in prayer.',
    attribution: 'St. Teresa of Ávila'
  },
  {
    id: 'quote-warfare-26',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'Purity and prayer are the devil’s worst enemies.',
    attribution: 'St. John Bosco'
  },
  {
    id: 'quote-warfare-27',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'The devil fears fasting, punishes almsgiving, and flees from prayer.',
    attribution: 'St. Peter Chrysologus'
  },
  {
    id: 'quote-warfare-28',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'The fast is the weapon of protection against demons. Our Guardian Angels more readily stay with those who have cleansed our souls through fasting.',
    attribution: 'St. Basil the Great'
  },
  {
    id: 'quote-warfare-29',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'To fast is to banquet with angels.',
    attribution: 'St. Athanasius'
  },
  {
    id: 'quote-warfare-30',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'And I will tell you the three powerful weapons against Satan. First, the Holy Name of Jesus. That is a name that Satan cannot stand because in the name of Jesus, every knee will bow, in the heavens, on the earth, and under the earth. The second, the blood of Christ. The invocation of the blood of Christ—I may give you a sermon on that—but we are saved with the blood of Christ. Therefore, in temptation, call upon his blood, for without the shedding of blood there is no remission of sin. And thirdly, devotion to our Blessed Mother. For at the beginning, in the book of Genesis, it was the seed of a woman that would crush the seed of Satan. We are armed with these three weapons. The Holy Name, the Blood of Christ, and the Blessed Mother.',
    attribution: 'Archbishop Fulton Sheen'
  },
  {
    id: 'quote-warfare-31',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'I have often experienced that nothing was so effective as holy water for driving away evil spirits finally. They flee before the cross, but return again. Therefore the power of holy water must indeed be great.',
    attribution: 'St. Teresa of Avila'
  },
  {
    id: 'quote-warfare-32',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'From long experience I have learned that there is nothing like holy water to put devils to flight and prevent them from coming back again. They also flee from the Cross, but return; so holy water must have great virtue.',
    attribution: 'St. Teresa of Avila'
  },
  {
    id: 'quote-warfare-33',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'Always have holy water near you; for there is nothing the devil fears more than this. I have found this remedy of great service to me in many cases when I was tortured, not only by fear, but in other ways. I am telling this to you alone. But unless the holy water reaches him he will not flee; therefore you must sprinkle it around.',
    attribution: 'St. Teresa of Avila'
  },
  {
    id: 'quote-warfare-34',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'The devil is afraid of us when we pray and make sacrifices. He also is afraid when we are humble and good. He is especially afraid when we love Jesus very much. He runs away when we make the Sign of the Cross.',
    attribution: 'St. Anthony the Great'
  },
  {
    id: 'quote-warfare-35',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'Ignorance of Scripture is ignorance of Christ. If we arm ourselves with Scripture, the devil cannot prevail.',
    attribution: 'St. Jerome'
  },
  {
    id: 'quote-warfare-36',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'The devil fears those who love silence and stillness, for he lies in wait at noisy crossroads.',
    attribution: 'St. Ignatius of Loyola'
  },
  {
    id: 'quote-warfare-37',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'The greatest warfare is fought in the mind. Silence and vigilance are your sword and shield.',
    attribution: 'St. Hesychius of Jerusalem'
  },
  {
    id: 'quote-warfare-38',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'The mind must keep watch as a sentinel upon the walls.',
    attribution: 'St. Gregory of Nazianzus'
  },
  {
    id: 'quote-warfare-39',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'Be watchful in thought, and you’ll defeat the enemy before he strikes.',
    attribution: 'St. Theophan the Recluse'
  },
  {
    id: 'quote-warfare-40',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'The devil trembles when he sees the weakest Christian on his knees.',
    attribution: 'St. John Chrysostom'
  },
  {
    id: 'quote-warfare-41',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'We are not lost in this world’s darkness—we are sent into it to conquer with light.',
    attribution: 'St. Teresa Benedicta of the Cross (Edith Stein)'
  },
  {
    id: 'quote-warfare-42',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'The endurance of darkness is the preparation for great light.',
    attribution: 'St. John of the Cross'
  },
  {
    id: 'quote-warfare-43',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'Those who are in the Lord’s army do not fear the lion’s den.',
    attribution: 'St. Lucy'
  },
  {
    id: 'quote-warfare-44',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'Who is like God? (Motto: "Quis ut Deus") battle cry of the leader of the heavenly hosts.',
    attribution: 'St. Michael the Archangel (Rev. 12:7)'
  },
  {
    id: 'quote-warfare-45',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'Expect temptation until your last breath.',
    attribution: 'St. Anthony the Great'
  },
  {
    id: 'quote-warfare-46',
    sectionId: 'spiritual-warfare',
    sectionTitle: 'Spiritual warfare',
    text: 'The triumph of the saints comes after much battle.',
    attribution: 'St. Gregory the Great'
  },

  // =========================================================================
  // 10. HOLY DEATH
  // =========================================================================
  {
    id: 'quote-death-1',
    sectionId: 'holy-death',
    sectionTitle: 'Holy Death',
    text: 'Keep death daily before your eyes.',
    attribution: 'St. Benedict, Rule'
  },
  {
    id: 'quote-death-2',
    sectionId: 'holy-death',
    sectionTitle: 'Holy Death',
    text: 'Let every day be a preparation for the Lord’s coming, and every action a step toward His Kingdom.',
    attribution: 'St. Bede the Venerable, Homilies on the Gospels, II.20'
  },
  {
    id: 'quote-death-3',
    sectionId: 'holy-death',
    sectionTitle: 'Holy Death',
    text: 'Consider how you would wish to have acted when you come to die, and then act accordingly now.',
    attribution: 'St. Ignatius of Loyola, Spiritual Exercises, Principle and Foundation'
  },
  {
    id: 'quote-death-4',
    sectionId: 'holy-death',
    sectionTitle: 'Holy Death',
    text: 'Do now what you wish to have done when your moment comes to die.',
    attribution: 'St. Angela Merici'
  },
  {
    id: 'quote-death-5',
    sectionId: 'holy-death',
    sectionTitle: 'Holy Death',
    text: 'This life has been given to you for repentance; do not waste it in vain pursuits.',
    attribution: 'St. Isaac the Syrian'
  },
  {
    id: 'quote-death-6',
    sectionId: 'holy-death',
    sectionTitle: 'Holy Death',
    text: 'It is for us who believe in eternal life to regard death not as an end, but as the passage to immortality.',
    attribution: 'St. Cyprian of Carthage, On the Mortality, 26'
  },
  {
    id: 'quote-death-7',
    sectionId: 'holy-death',
    sectionTitle: 'Holy Death',
    text: 'The present life is like a shadow, vanishing with the setting sun. But the brightness of eternal day awaits those who walk in God’s light.',
    attribution: 'St. Bede the Venerable, Homilies on the Gospels, II.15'
  },
  {
    id: 'quote-death-8',
    sectionId: 'holy-death',
    sectionTitle: 'Holy Death',
    text: 'In your last agony, call upon Jesus, Mary, and Joseph. Say, ‘Jesus, Mary, Joseph, I give you my heart and soul.’ That will be your strength and your peace.',
    attribution: 'St. Peter Julian Eymard, Eucharistic Meditations'
  },
  {
    id: 'quote-death-9',
    sectionId: 'holy-death',
    sectionTitle: 'Holy Death',
    text: 'Say every day: ‘Jesus, Mary, and Joseph, assist me in my last agony.’ It is a prayer hell fears and heaven hears.',
    attribution: 'St. Leonard of Port Maurice, Sermons on Death and Eternity'
  },
  {
    id: 'quote-death-10',
    sectionId: 'holy-death',
    sectionTitle: 'Holy Death',
    text: 'Do not despair, one of the thieves was saved; do not presume, one of the thieves was damned.',
    attribution: 'St. Augustine'
  },
  {
    id: 'quote-death-11',
    sectionId: 'holy-death',
    sectionTitle: 'Holy Death',
    text: 'Death is not the extinguishing of the light; it is the putting out of the lamp because the dawn has come.',
    attribution: 'Ven. Fulton Sheen, Life of Christ'
  },

  // =========================================================================
  // 11. GENEROSITY
  // =========================================================================
  {
    id: 'quote-generosity-1',
    sectionId: 'generosity',
    sectionTitle: 'Generosity',
    text: 'Give something, however small, to the one in need. For it is not small to one who has nothing. Neither is it small to God, if we have given what we could.',
    attribution: 'St. Gregory of Nazianzus'
  },

  // =========================================================================
  // 12. SACRAMENTS
  // =========================================================================
  {
    id: 'quote-sacraments-1',
    sectionId: 'sacraments',
    sectionTitle: 'Sacraments',
    text: 'The spiritual virtue of a sacrament is like light: although it passes among the impure, it is not polluted.',
    attribution: 'St. Augustine'
  },
  {
    id: 'quote-sacraments-2',
    sectionId: 'sacraments',
    sectionTitle: 'Sacraments',
    text: 'Baptism is not the work of man but of Christ, and this sacrament is so holy that it would not be defiled, even if the minister were a murderer.',
    attribution: 'St. Isidore'
  },
  {
    id: 'quote-sacraments-3',
    sectionId: 'sacraments',
    sectionTitle: 'Sacraments',
    text: 'If sinners saw hell for one second, they would crawl on broken glass to Confession.',
    attribution: 'St. Veronica Giuliani'
  },

  // =========================================================================
  // 13. HOLINESS
  // =========================================================================
  {
    id: 'quote-holiness-1',
    sectionId: 'holiness',
    sectionTitle: 'Holiness',
    text: 'Resolve henceforth to keep heaven before your mind, to be ready to forego everything that can hinder you or cause you to stray on your journey there.',
    attribution: 'St. Francis de Sales'
  },
  {
    id: 'quote-holiness-2',
    sectionId: 'holiness',
    sectionTitle: 'Holiness',
    text: 'Let us strive with all earnestness to finish the course of sanctity.',
    attribution: 'St. Clement of Rome'
  },
  {
    id: 'quote-holiness-3',
    sectionId: 'holiness',
    sectionTitle: 'Holiness',
    text: 'You wish to be saved with the few, live like the few.',
    attribution: 'St. John Climacus'
  },
  {
    id: 'quote-holiness-4',
    sectionId: 'holiness',
    sectionTitle: 'Holiness',
    text: 'Endure! Suffering is the forge of saints.',
    attribution: 'St. Catherine of Siena'
  },
  {
    id: 'quote-holiness-5',
    sectionId: 'holiness',
    sectionTitle: 'Holiness',
    text: 'Let me be food for the beasts, if it brings me to God.',
    attribution: 'St. Ignatius of Antioch'
  },
  {
    id: 'quote-holiness-6',
    sectionId: 'holiness',
    sectionTitle: 'Holiness',
    text: 'In Thee I move and in Thee I have my being.',
    attribution: 'St. Anselm'
  },
  {
    id: 'quote-holiness-7',
    sectionId: 'holiness',
    sectionTitle: 'Holiness',
    text: 'The more fully we abandon ourselves to the care of Providence, the more attentive God is not to let us want for anything.',
    attribution: 'St. John Baptist de La Salle'
  },
  {
    id: 'quote-holiness-8',
    sectionId: 'holiness',
    sectionTitle: 'Holiness',
    text: 'I have been made for heaven and heaven for me.',
    attribution: 'St. Joseph Cafasso'
  },
  {
    id: 'quote-holiness-9',
    sectionId: 'holiness',
    sectionTitle: 'Holiness',
    text: 'Acquire the habit of speaking to God as if you were alone with Him, familiarly and with confidence and love, as to the dearest and most loving of friends.',
    attribution: 'St. Alphonsus Ligouri'
  },
  {
    id: 'quote-holiness-10',
    sectionId: 'holiness',
    sectionTitle: 'Holiness',
    text: 'To him who wishes to walk in the path of virtue, nothing is more necessary than the reading of spiritual books.',
    attribution: 'St. Athanasius'
  },
  {
    id: 'quote-holiness-11',
    sectionId: 'holiness',
    sectionTitle: 'Holiness',
    text: 'You ought to make every effort to free yourselves even from venial sin, and to do what is most perfect.',
    attribution: 'St. Teresa of Ávila'
  },
  {
    id: 'quote-holiness-12',
    sectionId: 'holiness',
    sectionTitle: 'Holiness',
    text: 'No one should despair of his salvation. Did you sin? Repent. Did you sin a thousand times? Repent a thousand times.',
    attribution: 'St. John Chrysostom'
  },
  {
    id: 'quote-holiness-13',
    sectionId: 'holiness',
    sectionTitle: 'Holiness',
    text: 'Build yourself a cell in your heart and retire there to pray.',
    attribution: 'St. Catherine of Siena'
  },
  {
    id: 'quote-holiness-14',
    sectionId: 'holiness',
    sectionTitle: 'Holiness',
    text: 'Every holy thought is the gift of God, the inspiration of God, the grace of God.',
    attribution: 'St. Ambrose'
  },
  {
    id: 'quote-holiness-15',
    sectionId: 'holiness',
    sectionTitle: 'Holiness',
    text: 'O happy soul, who hast loved neither the world nor the things of the world apart from God! Happy soul, who, amid the world’s toil, hast chosen the one thing needful, that better part which can never be taken away!',
    attribution: 'St. John Henry Cardinal Newman'
  },
  {
    id: 'quote-holiness-16',
    sectionId: 'holiness',
    sectionTitle: 'Holiness',
    text: 'Look back and thank God.\nLook forward and trust God.\nLook around and serve God.\nLook within and find God.'
  },
  {
    id: 'quote-holiness-17',
    sectionId: 'holiness',
    sectionTitle: 'Holiness',
    text: 'We may always rejoice, if we will only keep our head a little raised above the flood of human things.',
    attribution: 'St. John Chrysostom'
  },
  {
    id: 'quote-holiness-18',
    sectionId: 'holiness',
    sectionTitle: 'Holiness',
    text: 'I have always something to repent for after having talked, but have never been sorry for having been silent.',
    attribution: 'St. Arsenius'
  },
  {
    id: 'quote-holiness-19',
    sectionId: 'holiness',
    sectionTitle: 'Holiness',
    text: 'To derive true profit from whatever happens, a man should be silent amidst reproaches, injuries, and ill-treatment, whether there be any fault on his side or not; and when people contend with him, let him prefer silence to victory.',
    attribution: 'St. Peter Claver'
  },
  {
    id: 'quote-holiness-20',
    sectionId: 'holiness',
    sectionTitle: 'Holiness',
    text: 'Remembering grievances works great damage. … It is a rusty arrow spreading poison in the soul.',
    attribution: 'St. Francis of Paola'
  },

  // =========================================================================
  // 14. REDEMPTIVE SUFFERING
  // =========================================================================
  {
    id: 'quote-suffering-1',
    sectionId: 'redemptive-suffering',
    sectionTitle: 'Redemptive suffering',
    text: 'Apart from the Cross there is no other ladder by which we may get to heaven.',
    attribution: 'St. Rose of Lima'
  },
  {
    id: 'quote-suffering-2',
    sectionId: 'redemptive-suffering',
    sectionTitle: 'Redemptive suffering',
    text: 'When it is all over, you will not regret having suffered; rather you will regret having suffered so little and suffered that little so badly.',
    attribution: 'Bl. Sebastian Valfré'
  },
  {
    id: 'quote-suffering-3',
    sectionId: 'redemptive-suffering',
    sectionTitle: 'Redemptive suffering',
    text: 'Thank the good God for having visited you through suffering; if we knew the value of suffering, we would ask for it.',
    attribution: 'St. André Bessette, Maxims'
  },

  // =========================================================================
  // 15. SACRIFICE
  // =========================================================================
  {
    id: 'quote-sacrifice-1',
    sectionId: 'sacrifice',
    sectionTitle: 'Sacrifice',
    text: 'When you look at the cruciﬁx, you understand how much Jesus loved you then. When you look at the Sacred Host, you understand how much Jesus loves you now.',
    attribution: 'St. Ignatius of Loyola'
  },
  {
    id: 'quote-sacrifice-2',
    sectionId: 'sacrifice',
    sectionTitle: 'Sacrifice',
    text: 'Nowhere other than looking at himself in the mirror of the Cross can man better understand how much he is worth.',
    attribution: 'St. Anthony of Padua'
  },

  // =========================================================================
  // 16. PIETY
  // =========================================================================
  {
    id: 'quote-piety-1',
    sectionId: 'piety',
    sectionTitle: 'Piety',
    text: 'For perfected souls, every place is to them an oratory, every moment a time for prayer.',
    attribution: 'St. Catherine of Siena'
  },
  {
    id: 'quote-piety-2',
    sectionId: 'piety',
    sectionTitle: 'Piety',
    text: 'Prayer is the key of the morning and the bolt of the evening.',
    attribution: 'St. Augustine'
  },
  {
    id: 'quote-piety-3',
    sectionId: 'piety',
    sectionTitle: 'Piety',
    text: 'Pray as though everything depended on God. Work as though everything depended on you.',
    attribution: 'St. Augustine'
  },
  {
    id: 'quote-piety-4',
    sectionId: 'piety',
    sectionTitle: 'Piety',
    text: 'Abandon yourself to Divine Providence as if no human means existed, and work as if there were no Divine Providence.',
    attribution: 'Blessed Mary of the Incarnation'
  },
  {
    id: 'quote-piety-5',
    sectionId: 'piety',
    sectionTitle: 'Piety',
    text: 'After the Holy Sacrifice of the Mass, the Rosary is the prayer most pleasing to God and most profitable to our souls.',
    attribution: 'St. Alphonsus Liguori'
  },
  {
    id: 'quote-piety-6',
    sectionId: 'piety',
    sectionTitle: 'Piety',
    text: 'The Rosary, though clearly Marian in character, is at heart a Christocentric prayer . . . it has all the depth of the Gospel message in its entirety.',
    attribution: 'St. John Paul II, Rosarium Virginis Mariae, 1'
  },
  {
    id: 'quote-piety-7',
    sectionId: 'piety',
    sectionTitle: 'Piety',
    text: 'The Rosary is a compendium of the entire Gospel.',
    attribution: 'Pope Pius XII'
  },
  {
    id: 'quote-piety-8',
    sectionId: 'piety',
    sectionTitle: 'Piety',
    text: 'The Rosary is the most excellent form of prayer and the most efficacious means of attaining eternal life. It is the remedy for all our evils, the root of all our blessings. There is no more excellent way of praying.',
    attribution: 'Pope Leo XIII'
  },
  {
    id: 'quote-piety-9',
    sectionId: 'piety',
    sectionTitle: 'Piety',
    text: 'One day a colleague of mine heard the devil say during an exorcism: "Every Hail Mary is like a blow on my head. If Christians knew how powerful the Rosary was, it would be my end." The secret that makes this prayer so effective is that the Rosary is both prayer and meditation. It is addressed to the Father, to the Blessed Virgin, and to the Holy Trinity, and is a meditation centered on Christ.',
    attribution: 'Fr. Gabriel Amorth',
    postscript: `\tI write in addition to the above: Please enunciate each word of the Rosary clearly and distinctly. Do not trample on the heels' of the words of anyone with your words. Do not speak over the leader, if you are following, or the responders if you are leading the Rosary. Remember that they also are having a conversation with Mary Our Mother and it is not polite to speak when someone else is speaking.
\tIn the case of the public Rosary there are only two people speaking, the Leader and the Responders. Each are speaking to their Mother and listening carefully to her response within their hearts as they meditate on the scene before them in their consideration of the mystery being spoken of and interpreted and translated into their lives. Spread this powerful prayer of exorcism, The Rosary which contains the Our Father, the Perfect Prayer, prayed five times in the recitation of each set of the Rosary's Mysteries, backed up by the powerful prayers of Our Mother who prays with us as we pray 53 Hail Marys. The Eternal Father described to a group of us, through a Visionary Friend of mine, what happens when we pray the Rosary, saying, "When you pray Holy Mary Mother of God, pray for us sinners now . . . , the Blessed Mother comes instantly to your side to pray with you. And she does not come alone. She brings angels with her. And not just one or two for she is the Queen of Angels, so choirs of angels come with her. And she and Jesus are joined at the heart and cannot be separated so she brings Jesus with her. And Jesus cannot be separated from the Trinity so He brings the Father and the Holy Spirit with Him.
\tAnd where the Holy Trinity is all of creation is and you are surrounded by such beauty and light as you cannot imagine in this life. Your Mother comes as Our Lady of Grace with her hands out-stretched. Rays of light emit from her hands piercing your body, healing you and filling you with graces.
\tThis is your inheritance which was poured out from the heart of Jesus on the Cross, when the centurion pierced His Heart with the spear, into the only pure vessel ready to receive such graces at that time, Your Mother.
\tNow as you pray the Rosary, or even just recite one Hail Mary, you receive your portion of these graces. "He also said at this time, "Anyone who goes to Mary and prays the Rosary cannot be touched by Satan." Is it any wonder that anyone who prays the Rosary from the heart is so blessed and protected and powerful in their prayers for others?"`
  },
  {
    id: 'quote-piety-10',
    sectionId: 'piety',
    sectionTitle: 'Piety',
    text: 'With me, the time of business does not differ from the time of prayer, and in the noise and clatter of my kitchen, while several persons are at the same time calling for different things, I possess God in as great tranquility, as if I were upon my knees at the Blessed Sacrament.',
    attribution: 'Brother Lawrence of the Resurrection'
  },
  {
    id: 'quote-piety-11',
    sectionId: 'piety',
    sectionTitle: 'Piety',
    text: 'To be with GOD, there is no need to be continually in church. Of our heart we may make an Oratory, wherein to retire from time to time and with Him hold meek, humble, loving converse.',
    attribution: 'Brother Lawrence of the Resurrection'
  },
  {
    id: 'quote-piety-12',
    sectionId: 'piety',
    sectionTitle: 'Piety',
    text: 'This is how you pray continually—not by offering prayer in words, but by joining yourself to God through your whole way of life, so that your life becomes one continuous and uninterrupted prayer.',
    attribution: 'St. Basil the Great'
  },
  {
    id: 'quote-piety-13',
    sectionId: 'piety',
    sectionTitle: 'Piety',
    text: 'All difficulties in prayer have just one cause: praying as though God were not there.',
    attribution: 'St. Teresa of Avila'
  },
  {
    id: 'quote-piety-14',
    sectionId: 'piety',
    sectionTitle: 'Piety',
    text: 'Pray, even if you feel nothing, see nothing . . . at such a time is your prayer most pleasing to God.',
    attribution: 'St. Julian of Norwich'
  },

  // =========================================================================
  // 17. THE INCARNATION
  // =========================================================================
  {
    id: 'quote-incarnation-1',
    sectionId: 'the-incarnation',
    sectionTitle: 'The Incarnation',
    text: 'For he was made man that we might be made God.',
    attribution: 'St. Athanasius'
  },
  {
    id: 'quote-incarnation-2',
    sectionId: 'the-incarnation',
    sectionTitle: 'The Incarnation',
    text: 'He became what we are, that He might make us what He is.',
    attribution: 'St. Augustine, Sermons, 192.1'
  },
  {
    id: 'quote-incarnation-3',
    sectionId: 'the-incarnation',
    sectionTitle: 'The Incarnation',
    text: 'By joining to us the likeness of his humanity, he took away the unlikeness of our unrighteousness; and by being made partaker of our mortality, he made us partakers of his Divinity.',
    attribution: 'St. Augustine'
  },

  // =========================================================================
  // 18. DETACHMENT
  // =========================================================================
  {
    id: 'quote-detachment-1',
    sectionId: 'detachment',
    sectionTitle: 'Detachment',
    text: 'To come to possess all, desire the possession of nothing. To arrive at being all, desire to be nothing. To come to the knowledge of all, desire the knowledge of nothing.',
    attribution: 'St. John of the Cross, Ascent of Mount Carmel, Book I, ch. 13'
  },
  {
    id: 'quote-detachment-2',
    sectionId: 'detachment',
    sectionTitle: 'Detachment',
    text: '. . . The Spanish word for detachment, desprendimiento, has a fundamentally positive thrust to it that is lost in translation; it does not merely refer to "giving up" something, but rather the laying down of something for the sake of something better . . ."',
    attribution: 'St. John of the Cross, The Ascent to Joy'
  },
  {
    id: 'quote-detachment-3',
    sectionId: 'detachment',
    sectionTitle: 'Detachment',
    text: 'Detach your heart from all that is earthly. For as long as a single thread binds the bird, it cannot fly.',
    attribution: 'St. Alphonsus Liguori, Preparation for Death, ch. 16'
  },
  {
    id: 'quote-detachment-4',
    sectionId: 'detachment',
    sectionTitle: 'Detachment',
    text: 'Detach yourself from the world because its noise prevents you from hearing God.',
    attribution: 'St. Charbel'
  },
  {
    id: 'quote-detachment-5',
    sectionId: 'detachment',
    sectionTitle: 'Detachment',
    text: 'A detached man should always be looking to see what he can do without.',
    attribution: 'Bl. Henry Suso'
  },

  // =========================================================================
  // 19. SPIRITUALITY
  // =========================================================================
  {
    id: 'quote-spirituality-1',
    sectionId: 'spirituality',
    sectionTitle: 'Spirituality',
    text: 'We are all spiritually Semites.',
    attribution: 'Pope Pius XI'
  },
  {
    id: 'quote-spirituality-2',
    sectionId: 'spirituality',
    sectionTitle: 'Spirituality',
    text: 'In the One, we are one. (In Illo uno unum.)',
    attribution: 'St. Augustine, Expositions of the Psalms'
  },

  // =========================================================================
  // 20. REFLECTIONS
  // =========================================================================
  {
    id: 'quote-reflections-1',
    sectionId: 'reflections',
    sectionTitle: 'Reflections',
    text: 'It is in silence that God is known, and through mysteries that he declares himself.',
    attribution: 'Msgr. Robert Hugh Benson'
  },
  {
    id: 'quote-reflections-2',
    sectionId: 'reflections',
    sectionTitle: 'Reflections',
    text: 'To be immortal is to share in Divinity.',
    attribution: 'St. Clement of Alexandria'
  },
  {
    id: 'quote-reflections-3',
    sectionId: 'reflections',
    sectionTitle: 'Reflections',
    text: 'We must remember God more often than we draw breath.',
    attribution: 'St. Gregory of Nazianzus'
  },
  {
    id: 'quote-reflections-4',
    sectionId: 'reflections',
    sectionTitle: 'Reflections',
    text: 'Trust God that you are exactly where you are meant to be.',
    attribution: 'St. Teresa of Avila'
  },
  {
    id: 'quote-reflections-5',
    sectionId: 'reflections',
    sectionTitle: 'Reflections',
    text: 'I have a great need for Christ; I have a great Christ for my need.',
    attribution: 'Charles Spurgeon'
  },
  {
    id: 'quote-reflections-6',
    sectionId: 'reflections',
    sectionTitle: 'Reflections',
    text: 'When you are hanging by a thread,\nmake sure it is the hem of His garment.',
    attribution: 'Toby McKeehan'
  },
  {
    id: 'quote-reflections-7',
    sectionId: 'reflections',
    sectionTitle: 'Reflections',
    text: 'The deeper a tree sinks its roots into the soil, the greater its chances of growing, branching out, and bearing fruit.',
    attribution: 'Bl. Marie-Anne Blondin'
  },
  {
    id: 'quote-reflections-8',
    sectionId: 'reflections',
    sectionTitle: 'Reflections',
    text: 'Trust the past to God\'s mercy, the present to His love, the future to His providence.',
    attribution: 'St. Augustine'
  },
  {
    id: 'quote-reflections-9',
    sectionId: 'reflections',
    sectionTitle: 'Reflections',
    text: 'Read not the Times. Read the Eternities.',
    attribution: 'Henry David Thoreau'
  },
  {
    id: 'quote-reflections-10',
    sectionId: 'reflections',
    sectionTitle: 'Reflections',
    text: 'Have you ever stopped to consider the enormous sum that many “littles” can come to?',
    attribution: 'St. Josemaría Escrivá'
  },
  {
    id: 'quote-reflections-11',
    sectionId: 'reflections',
    sectionTitle: 'Reflections',
    text: 'God loves each of us as if there were only one of us.',
    attribution: 'St. Augustine'
  },
  {
    id: 'quote-reflections-12',
    sectionId: 'reflections',
    sectionTitle: 'Reflections',
    text: 'Christ with me, Christ before me, Christ behind me, Christ within me, Christ beneath me, Christ above me.',
    attribution: 'St. Patrick'
  },
  {
    id: 'quote-reflections-13',
    sectionId: 'reflections',
    sectionTitle: 'Reflections',
    text: 'Fear not that your life shall come to an end, but rather that it shall never have a beginning.',
    attribution: 'Bl. John Henry Cardinal Newman'
  },
  {
    id: 'quote-reflections-14',
    sectionId: 'reflections',
    sectionTitle: 'Reflections',
    text: 'We must always remember that we are not condemned for the multitude of our evils, but because we do not want to repent.',
    attribution: 'St. Mark the Ascetic'
  },
  {
    id: 'quote-reflections-15',
    sectionId: 'reflections',
    sectionTitle: 'Reflections',
    text: 'For by gold the power of a king is signified, by frankincense the honor of God, by myrrh the burial of the body; and accordingly they offer Him gold as King, frankincense as God, myrrh as Man.',
    attribution: 'St. John Chrysostom'
  },
  {
    id: 'quote-reflections-16',
    sectionId: 'reflections',
    sectionTitle: 'Reflections',
    text: 'If the priest is a saint, the people will be fervent; if the priest is fervent, the people will be pious; if the priest is pious, the people will at least be decent; if the priest is only decent, the people will be godless. The spiritual generation is always one-degree less intense in its life than the one who begets it in Christ.',
    attribution: 'Dom Jean-Baptiste Chautard, O.C.S.O.'
  },

  // =========================================================================
  // 21. VIRTUE
  // =========================================================================
  {
    id: 'quote-virtue-1',
    sectionId: 'virtue',
    sectionTitle: 'Virtue',
    text: 'Virtue is a habitual and firm disposition to do the good. It allows the person not only to perform good acts, but to give the best of himself.',
    attribution: 'St. Thomas Aquinas, Summa Theologiae, I–II, q. 55, a. 4'
  },
  {
    id: 'quote-virtue-2',
    sectionId: 'virtue',
    sectionTitle: 'Virtue',
    text: 'Character is shaped by repeated action. As we sow acts, we reap habits; as we sow habits, we reap character; as we sow character, we reap destiny.',
    attribution: 'St. Thomas Aquinas, Commentary on Aristotle’s Ethics, Bk. II'
  },
  {
    id: 'quote-virtue-3',
    sectionId: 'virtue',
    sectionTitle: 'Virtue',
    text: 'Prudence is the knowledge of what to seek and what to avoid.',
    attribution: 'St. Augustine'
  },
  {
    id: 'quote-virtue-4',
    sectionId: 'virtue',
    sectionTitle: 'Virtue',
    text: 'The three most important virtues are: humility, humility, and humility.',
    attribution: 'St. Bernard of Clairvaux'
  },
  {
    id: 'quote-virtue-5',
    sectionId: 'virtue',
    sectionTitle: 'Virtue',
    text: 'Humility is to the various virtues what the chain is in a rosary. Take away the chain and the beads are scattered; remove humility and all virtues vanish.',
    attribution: 'St. John Vianney'
  },
  {
    id: 'quote-virtue-6',
    sectionId: 'virtue',
    sectionTitle: 'Virtue',
    text: 'Lord, grant me humility, that I may acquire all the virtues; Lord, grant me all the virtues, that I may acquire humility.'
  },
  {
    id: 'quote-virtue-7',
    sectionId: 'virtue',
    sectionTitle: 'Virtue',
    text: 'If then you are the work of God, await the hand of the artist who does all things in due season.',
    attribution: 'St. Irenaeus'
  },

  // =========================================================================
  // 22. TRUTH
  // =========================================================================
  {
    id: 'quote-truth-1',
    sectionId: 'truth',
    sectionTitle: 'Truth',
    text: 'Every truth without exception—and whoever may utter it—is from the Holy Spirit.',
    attribution: 'St. Thomas Aquinas'
  },
  {
    id: 'quote-truth-2',
    sectionId: 'truth',
    sectionTitle: 'Truth',
    text: 'The Church is not called to reflect the opinions of the age, but to be the living witness of eternal truths.',
    attribution: 'Benedict XVI'
  },
  {
    id: 'quote-truth-3',
    sectionId: 'truth',
    sectionTitle: 'Truth',
    text: 'Better to illuminate than merely to shine, to deliver to others contemplated truths than merely to contemplate.',
    attribution: 'St. Thomas Aquinas, Summa Theologiae, II–II, q. 188, a. 6, ad 1'
  },

  // =========================================================================
  // 23. PEACE
  // =========================================================================
  {
    id: 'quote-peace-1',
    sectionId: 'peace',
    sectionTitle: 'Peace',
    text: 'Strive to preserve your heart in peace; let no event of this world disturb it.',
    attribution: 'St. John of the Cross'
  },

  // =========================================================================
  // 24. SERVANTHOOD
  // =========================================================================
  {
    id: 'quote-servanthood-1',
    sectionId: 'servanthood',
    sectionTitle: 'Servanthood',
    text: 'I am the servant of God. In the morning, I wash the feet of the poor, and at night, I comfort the animals.',
    attribution: 'St. Martin de Porres'
  },

  // =========================================================================
  // 25. APOLOGETICS
  // =========================================================================
  {
    id: 'quote-apologetics-1',
    sectionId: 'apologetics',
    sectionTitle: 'Apologetics',
    text: 'Always be ready to give an explanation to anyone who asks you for a reason for your hope, but do it with gentleness and reverence.',
    attribution: 'St. Peter, 1 Peter 3:15'
  },
  {
    id: 'quote-apologetics-2',
    sectionId: 'apologetics',
    sectionTitle: 'Apologetics',
    text: 'To defend the faith is a work of mercy greater than to feed the hungry: for the former feeds the soul, the latter only the body.',
    attribution: 'St. Thomas Aquinas, Summa Theologiae, II-II, q. 188, a. 6, ad 2'
  },
  {
    id: 'quote-apologetics-3',
    sectionId: 'apologetics',
    sectionTitle: 'Apologetics',
    text: 'Our controversies with heretics arise not from the Scriptures, which both sides accept, but from the interpretation of the Scriptures.',
    attribution: 'St. Robert Bellarmine, Disputations on the Controversies of the Christian Faith, Book I'
  },
  {
    id: 'quote-apologetics-4',
    sectionId: 'apologetics',
    sectionTitle: 'Apologetics',
    text: 'Faith does not destroy reason, but perfects it. Grace does not abolish nature, but elevates it.',
    attribution: 'St. Thomas Aquinas, Summa Theologiae, I, q. 1, a. 8'
  },
  {
    id: 'quote-apologetics-5',
    sectionId: 'apologetics',
    sectionTitle: 'Apologetics',
    text: 'The truth of the faith shines all the more brightly when it is assailed, for the light is made manifest in contrast to darkness.',
    attribution: 'St. Robert Bellarmine, Controversies, De Romano Pontifice, Book 1'
  },
  {
    id: 'quote-apologetics-6',
    sectionId: 'apologetics',
    sectionTitle: 'Apologetics',
    text: 'The world is against me,” said Athanasius. “Then I am against the world,” he replied, defending the divinity of Christ.',
    attribution: 'St. Athanasius, Historical account by Rufinus, Ecclesiastical History, Book X'
  },
  {
    id: 'quote-apologetics-7',
    sectionId: 'apologetics',
    sectionTitle: 'Apologetics',
    text: 'There are not one hundred people in the U.S. who hate the Catholic Church, but there are millions who hate what they wrongly believe the Church to be.',
    attribution: 'Fulton J. Sheen, Radio address, 1947'
  },
  {
    id: 'quote-apologetics-8',
    sectionId: 'apologetics',
    sectionTitle: 'Apologetics',
    text: 'To be deep in history is to cease to be a Protestant.',
    attribution: 'St. John Henry Newman'
  },
  {
    id: 'quote-apologetics-9',
    sectionId: 'apologetics',
    sectionTitle: 'Apologetics',
    text: 'Charity is the most effective form of apologetics. One drop of honey attracts more flies than a barrel of vinegar.',
    attribution: 'St. Francis de Sales, Introduction to the Devout Life, Part III, ch. 8'
  },

  // =========================================================================
  // 26. HOLY EUCHARIST
  // =========================================================================
  {
    id: 'quote-eucharist-1',
    sectionId: 'holy-eucharist',
    sectionTitle: 'Holy Eucharist',
    text: 'In the Eucharist, we receive Jesus Christ himself, Body, Blood, Soul, and Divinity.',
    attribution: 'St. Francis de Sales'
  },
  {
    id: 'quote-eucharist-2',
    sectionId: 'holy-eucharist',
    sectionTitle: 'Holy Eucharist',
    text: 'Recognize in this bread what hung on the cross, and in this chalice what flowed from His side.',
    attribution: 'St. Augustine'
  },
  {
    id: 'quote-eucharist-3',
    sectionId: 'holy-eucharist',
    sectionTitle: 'Holy Eucharist',
    text: 'If we knew the value of Holy Communion, we would walk miles to receive it.',
    attribution: 'St. Margaret Mary Alacoque'
  },
  {
    id: 'quote-eucharist-4',
    sectionId: 'holy-eucharist',
    sectionTitle: 'Holy Eucharist',
    text: 'The Eucharist is the source and summit of the Christian life.',
    attribution: 'Pope St. Paul VI'
  },
  {
    id: 'quote-eucharist-5',
    sectionId: 'holy-eucharist',
    sectionTitle: 'Holy Eucharist',
    text: 'Since Christ Himself has declared the bread to be His body, who shall dare to doubt it?',
    attribution: 'St. Cyril of Jerusalem'
  },
  {
    id: 'quote-eucharist-6',
    sectionId: 'holy-eucharist',
    sectionTitle: 'Holy Eucharist',
    text: 'For whenever we eat this bread and drink the cup, we proclaim the death of the Lord. If we proclaim the Lord’s death, we proclaim the remission of sins. If, as often as His blood is shed, it is shed for the remission of sins, I ought always to receive it, that it may always forgive my sins. Because I always sin, I should always have a remedy.',
    attribution: 'St. Ambrose'
  },
  {
    id: 'quote-eucharist-7',
    sectionId: 'holy-eucharist',
    sectionTitle: 'Holy Eucharist',
    text: 'The presence of Christ’s true body and blood in this sacrament cannot be detected by sense, nor understanding, but by faith alone, which rests upon divine authority.',
    attribution: 'St. Thomas Aquinas'
  },
  {
    id: 'quote-eucharist-8',
    sectionId: 'holy-eucharist',
    sectionTitle: 'Holy Eucharist',
    text: 'The proper effect of the Eucharist is the transformation of man into God.',
    attribution: 'St. Thomas Aquinas'
  },
  {
    id: 'quote-eucharist-9',
    sectionId: 'holy-eucharist',
    sectionTitle: 'Holy Eucharist',
    text: 'If you desire to be holy, eat the bread of angels frequently, receive the most holy Eucharist.',
    attribution: 'St. Alphonsus Liguori'
  },
  {
    id: 'quote-eucharist-10',
    sectionId: 'holy-eucharist',
    sectionTitle: 'Holy Eucharist',
    text: 'The Eucharist is the supreme proof of the love of Jesus. After this, there is nothing more but Heaven itself.',
    attribution: 'St. Peter Julian Eymard'
  },
  {
    id: 'quote-eucharist-11',
    sectionId: 'holy-eucharist',
    sectionTitle: 'Holy Eucharist',
    text: 'When you approach the tabernacle remember that He has been waiting for you for twenty centuries.',
    attribution: 'St. Josemaría Escrivá'
  },
  {
    id: 'quote-eucharist-12',
    sectionId: 'holy-eucharist',
    sectionTitle: 'Holy Eucharist',
    text: 'As two pieces of wax fused together make one, so he who receives Holy Communion is so united with Christ that Christ is in him, and he is in Christ.',
    attribution: 'St. Cyril of Alexandria'
  },
  {
    id: 'quote-eucharist-13',
    sectionId: 'holy-eucharist',
    sectionTitle: 'Holy Eucharist',
    text: 'What you have received, you should become.',
    attribution: 'St. Andrew Avellino'
  },
  {
    id: 'quote-eucharist-14',
    sectionId: 'holy-eucharist',
    sectionTitle: 'Holy Eucharist',
    text: 'I have served Christ for eighty-six years, receiving the Eucharist is my singular devotion.',
    attribution: 'St. Polycarp'
  },
  {
    id: 'quote-eucharist-15',
    sectionId: 'holy-eucharist',
    sectionTitle: 'Holy Eucharist',
    text: 'The partaking of the Eucharist is a true communion with the Godhead.',
    attribution: 'Pope St. Leo the Great'
  },
  {
    id: 'quote-eucharist-16',
    sectionId: 'holy-eucharist',
    sectionTitle: 'Holy Eucharist',
    text: 'The Eucharist stores up the memory of salvation, it opens up law and the prophets.',
    attribution: 'St. Jerome'
  },
  {
    id: 'quote-eucharist-17',
    sectionId: 'holy-eucharist',
    sectionTitle: 'Holy Eucharist',
    text: 'The Eucharist brings us the fortitude of the angels.',
    attribution: 'Bl. Anne Catherine Emmerich'
  },
  {
    id: 'quote-eucharist-18',
    sectionId: 'holy-eucharist',
    sectionTitle: 'Holy Eucharist',
    text: 'The Body of Christ is bread of angels, manna of heaven.',
    attribution: 'St. Anthony of Padua'
  },
  {
    id: 'quote-eucharist-19',
    sectionId: 'holy-eucharist',
    sectionTitle: 'Holy Eucharist',
    text: 'The Eucharist clothes the soul with grace.',
    attribution: 'St. Philomena'
  },
  {
    id: 'quote-eucharist-20',
    sectionId: 'holy-eucharist',
    sectionTitle: 'Holy Eucharist',
    text: 'He once changed water into wine, and shall we think Him less worthy of credit when He changes wine into His blood?',
    attribution: 'St. Cyril of Jerusalem'
  },
  {
    id: 'quote-eucharist-21',
    sectionId: 'holy-eucharist',
    sectionTitle: 'Holy Eucharist',
    text: 'The Eucharist is a promise of our future resurrection.',
    attribution: 'St. Lawrence of Brindisi'
  },
  {
    id: 'quote-eucharist-22',
    sectionId: 'holy-eucharist',
    sectionTitle: 'Holy Eucharist',
    text: 'The Eucharist is a present promise of our future resurrection.'
  },
  {
    id: 'quote-eucharist-23',
    sectionId: 'holy-eucharist',
    sectionTitle: 'Holy Eucharist',
    text: 'The Eucharist is the life of the saints.',
    attribution: 'St. Charbel Makhlouf'
  },
  {
    id: 'quote-eucharist-24',
    sectionId: 'holy-eucharist',
    sectionTitle: 'Holy Eucharist',
    text: 'The Eucharist is the consummation of the whole spiritual life.',
    attribution: 'St. Thomas Aquinas'
  },
  {
    id: 'quote-eucharist-25',
    sectionId: 'holy-eucharist',
    sectionTitle: 'Holy Eucharist',
    text: 'Those who feed on Christ in the Eucharist need not wait until the hereafter to receive eternal life: they already possess it on earth, as the first-fruits of a future fullness which will embrace man in his totality. For in the Eucharist we also receive the pledge of our bodily resurrection at the end of the world . . . This pledge of the future resurrection comes from the fact that the flesh of the Son of Man, given as food, is his body in its glorious state after the resurrection. With the Eucharist we digest, as it were, the ‘secret’ of the resurrection.',
    attribution: 'St. John Paul II'
  },
  {
    id: 'quote-eucharist-26',
    sectionId: 'holy-eucharist',
    sectionTitle: 'Holy Eucharist',
    text: 'This Bread is the food of pilgrims—the strength for the journey toward eternal life.',
    attribution: 'St. Bede the Venerable, Homily on John 6'
  },
  {
    id: 'quote-eucharist-27',
    sectionId: 'holy-eucharist',
    sectionTitle: 'Holy Eucharist',
    text: 'The Eucharist is not a metaphor—it is metaphysical reality.',
    attribution: 'Fr. Robert Spitzer, SJ'
  },

  // =========================================================================
  // 27. GRACE
  // =========================================================================
  {
    id: 'quote-grace-1',
    sectionId: 'grace',
    sectionTitle: 'Grace',
    text: 'Grace makes God dwell in us substantially, so that we are by grace what He is by nature.',
    attribution: 'St. Maximus the Confessor, Ambigua, 7'
  },
  {
    id: 'quote-grace-2',
    sectionId: 'grace',
    sectionTitle: 'Grace',
    text: 'The grace of God precedes every good work, follows it, and completes it.',
    attribution: 'St. Gregory the Great, Moralia in Job, Preface'
  },
  {
    id: 'quote-grace-3',
    sectionId: 'grace',
    sectionTitle: 'Grace',
    text: 'Grace is ordered to glory. Between the first stirring of faith and the vision of God there is no break, only unfolding.',
    attribution: 'Henri de Lubac, The Mystery of the Supernatural'
  },
  {
    id: 'quote-grace-4',
    sectionId: 'grace',
    sectionTitle: 'Grace',
    text: 'God, who justifies you by grace, will also glorify you through that same grace. Grace is the beginning of glory.',
    attribution: 'St. Augustine, Sermon 169'
  },
  {
    id: 'quote-grace-5',
    sectionId: 'grace',
    sectionTitle: 'Grace',
    text: 'Grace is already heaven begun. When it reaches its fullness, it bursts into eternal glory.',
    attribution: 'St. Elizabeth of the Trinity, Heaven in Faith, Day 2'
  },

  // =========================================================================
  // 28. SPIRITUAL COMMUNION
  // =========================================================================
  {
    id: 'quote-spiritual-communion-1',
    sectionId: 'spiritual-communion',
    sectionTitle: 'Spiritual communion',
    text: 'There is no effect of the sacrament which cannot be obtained by spiritual communion, provided that it is made with devotion and fervor.',
    attribution: 'St. Thomas Aquinas, Summa Theologiae, III, q. 80, a. 1, ad 3'
  },
  {
    id: 'quote-spiritual-communion-2',
    sectionId: 'spiritual-communion',
    sectionTitle: 'Spiritual communion',
    text: 'The effect of this sacrament can be obtained by every man even when he receives it in desire, though not in reality; such is called spiritual communion.',
    attribution: 'St. Thomas Aquinas, Summa Theologiae, III, q. 80, a. 1, ad 3'
  },
  {
    id: 'quote-spiritual-communion-3',
    sectionId: 'spiritual-communion',
    sectionTitle: 'Spiritual communion',
    text: 'A man receives the effect of this sacrament [the Eucharist] if he receives it in desire, though not in reality. Hence Augustine says that some drink invisibly the same blood of Christ which others drink visibly.',
    attribution: 'St. Thomas Aquinas, Summa Theologiae, III, q. 80, a. 1, ad 3'
  },
  {
    id: 'quote-spiritual-communion-4',
    sectionId: 'spiritual-communion',
    sectionTitle: 'Spiritual communion',
    text: 'When you cannot go to Holy Communion, unite yourself in spirit with the Heart of Jesus, and you will share in the same graces as if you had received Him sacramentally.',
    attribution: 'St. Margaret Mary Alacoque, Letters, vol. II'
  },
  {
    id: 'quote-spiritual-communion-5',
    sectionId: 'spiritual-communion',
    sectionTitle: 'Spiritual communion',
    text: 'The soul inflamed with divine love receives more from the desire of the Eucharist than many do from actual Communion.',
    attribution: 'St. John of the Cross, Sayings of Light and Love, no. 75'
  },
  {
    id: 'quote-spiritual-communion-6',
    sectionId: 'spiritual-communion',
    sectionTitle: 'Spiritual communion',
    text: 'Spiritual communion, so much recommended by the Council of Trent, is a practice most profitable for the soul. It can be made many times in the day and brings abundant grace.',
    attribution: 'Pope St. Pius X, Decree on Frequent Communion (1905)'
  },
  {
    id: 'quote-spiritual-communion-7',
    sectionId: 'spiritual-communion',
    sectionTitle: 'Spiritual communion',
    text: 'We should make spiritual communions every fifteen minutes! This is the best way to keep our hearts burning with the love of God.',
    attribution: 'St. Leonard of Port Maurice'
  },

  // =========================================================================
  // 29. MORTIFICATION
  // =========================================================================
  {
    id: 'quote-mortification-1',
    sectionId: 'mortification',
    sectionTitle: 'Mortification',
    text: 'To reach satisfaction in all, desire satisfaction in nothing.\nTo come to possess all, desire the possession of nothing.\nTo arrive at being all, desire to be nothing.',
    attribution: 'St. John of the Cross, Ascent of Mount Carmel, Book I, ch. 13'
  },
  {
    id: 'quote-mortification-2',
    sectionId: 'mortification',
    sectionTitle: 'Mortification',
    text: 'Endeavor to be inclined always: not to the easiest, but to the most difficult;\nnot to what means rest, but to hard work; not to the consoling, but to the unconsoling; not to the most, but to the least; not to the highest and most precious, but to the lowest and most despised . . .\nIn this way, you will gradually become accustomed to denying your will and to placing yourself in the hands of God.',
    attribution: 'St. John of the Cross, Ascent of Mount Carmel, I.13.6'
  },
  {
    id: 'quote-mortification-3',
    sectionId: 'mortification',
    sectionTitle: 'Mortification',
    text: 'We must practice not only outward mortifications, but far more those which are inward and spiritual. These are more excellent and less subject to vainglory.',
    attribution: 'St. Francis de Sales, Introduction to the Devout Life, III.23'
  },
  {
    id: 'quote-mortification-4',
    sectionId: 'mortification',
    sectionTitle: 'Mortification',
    text: 'The mortification of the senses is good, but still better is the mortification of the will.',
    attribution: 'St. Alphonsus Liguori, The Way of Salvation and of Perfection, Pt. I, ch. 7'
  },
  {
    id: 'quote-mortification-5',
    sectionId: 'mortification',
    sectionTitle: 'Mortification',
    text: 'Deny your own will; bend your own judgment; conquer your own temper. These little daily contradictions, these inner sacrifices, are worth more than hair shirts and disciplines.',
    attribution: 'St. Francis de Sales, Introduction to the Devout Life, III.23'
  },
  {
    id: 'quote-mortification-6',
    sectionId: 'mortification',
    sectionTitle: 'Mortification',
    text: 'Interior mortification is a secret crucifixion, known only to God. It is the soul’s most intimate offering, stripped of all comfort and recognition.',
    attribution: 'Bl. Angela of Foligno, Instructions, 18'
  },
  {
    id: 'quote-mortification-7',
    sectionId: 'mortification',
    sectionTitle: 'Mortification',
    text: 'To mortify the flesh is easy compared to mortifying the spirit: to subdue pride, to be silent when condemned, to listen and not answer—this is the true fast.',
    attribution: 'St. John Henry Newman, Parochial and Plain Sermons, vol. V'
  },
  {
    id: 'quote-mortification-8',
    sectionId: 'mortification',
    sectionTitle: 'Mortification',
    text: 'I discipline my body and bring it into subjection… (1 Cor 9:27)',
    attribution: 'St. Paul'
  },
  {
    id: 'quote-mortification-9',
    sectionId: 'mortification',
    sectionTitle: 'Mortification',
    text: 'Mortification is the narrow path walked by Christ Himself. If we will not follow Him, we cannot expect to arrive where He has gone.',
    attribution: 'Bl. Anne Catherine Emmerich, The Life and Revelations of Anne Catherine Emmerich, Vol. 2'
  },
  {
    id: 'quote-mortification-10',
    sectionId: 'mortification',
    sectionTitle: 'Mortification',
    text: 'There is no better crucifixion than mortification. Every act of restraint for God’s sake is a nail driven into the body of sin.',
    attribution: 'St. Teresa of Ávila, Way of Perfection, ch. 11'
  },
  {
    id: 'quote-mortification-11',
    sectionId: 'mortification',
    sectionTitle: 'Mortification',
    text: 'I lived in a little cell no longer than my body, scourged myself with disciplines of iron and rope, and never allowed myself even a single indulgence.',
    attribution: 'St. John of the Cross, Sayings of Light and Love, no. 96'
  },

  // =========================================================================
  // 30. REVELATION
  // =========================================================================
  {
    id: 'quote-revelation-1',
    sectionId: 'revelation',
    sectionTitle: 'Revelation',
    text: 'By His Word and Wisdom, God reveals Himself to men: first through creation, then through the prophets, and finally through the Word made flesh.',
    attribution: 'St. Irenaeus of Lyons, Against Heresies, IV.20.7'
  },

  // =========================================================================
  // 31. RESSOURCEMENT
  // =========================================================================
  {
    id: 'quote-ressourcement-1',
    sectionId: 'ressourcement',
    sectionTitle: 'Ressourcement',
    text: 'The only way forward is the path back—back to the Church\'s full spiritual inheritance.',
    attribution: 'Louis Bouyer'
  },
  {
    id: 'quote-ressourcement-2',
    sectionId: 'ressourcement',
    sectionTitle: 'Ressourcement',
    text: 'True reform always begins with a return to the sources, a movement toward the Word, the sacraments, and the witness of the saints.',
    attribution: 'Yves Congar, True and False Reform in the Church, ch. 4'
  },
  {
    id: 'quote-ressourcement-3',
    sectionId: 'ressourcement',
    sectionTitle: 'Ressourcement',
    text: 'Renewal in theology must not consist in innovation for its own sake, but in returning to the sources—Scripture and the Fathers—so that the Church may breathe again with full lungs.',
    attribution: 'Jean Daniélou, Quoted in Henri de Lubac, At the Service of the Church, p. 147'
  },
  {
    id: 'quote-ressourcement-4',
    sectionId: 'ressourcement',
    sectionTitle: 'Ressourcement',
    text: 'Theology must be born of adoration. It must kneel before the mystery it contemplates. That is why the Fathers remain so close to the flame.',
    attribution: 'Jean Daniélou, From Shadows to Reality, p. 9'
  },
  {
    id: 'quote-ressourcement-5',
    sectionId: 'ressourcement',
    sectionTitle: 'Ressourcement',
    text: 'To renew is not to discard but to draw more deeply from the fountain. Reform, if it is to be Christian, must begin with a return to the apostolic wellspring.',
    attribution: 'Yves Congar, True and False Reform in the Church, p. 76'
  },
  {
    id: 'quote-ressourcement-6',
    sectionId: 'ressourcement',
    sectionTitle: 'Ressourcement',
    text: 'Tradition is not the transmission of ashes but the preservation of fire.',
    attribution: 'Yves Congar, I Believe in the Holy Spirit, Vol. 3'
  },
  {
    id: 'quote-ressourcement-7',
    sectionId: 'ressourcement',
    sectionTitle: 'Ressourcement',
    text: 'The real answer to modern problems is to rediscover the primitive vigor of the Christian message. Christianity must return to its sources to find again its power to transform.',
    attribution: 'Jean Daniélou, The Lord of History, ch. 5'
  },
  {
    id: 'quote-ressourcement-8',
    sectionId: 'ressourcement',
    sectionTitle: 'Ressourcement',
    text: 'True renewal in the Church consists in rediscovering her origins, in listening again to the Word, the Fathers, and the liturgy in all its depth.',
    attribution: 'Joseph Ratzinger, Principles of Catholic Theology, ch. 1'
  },

  // =========================================================================
  // 32. LITURGY
  // =========================================================================
  {
    id: 'quote-liturgy-1',
    sectionId: 'liturgy',
    sectionTitle: 'Liturgy',
    text: 'When the liturgy is being celebrated, the whole sanctuary is filled with countless angels who adore the divine victim immolated on the altar.',
    attribution: 'St. John Chrysostom, Homilies on Hebrews, 4.7'
  },
  {
    id: 'quote-liturgy-2',
    sectionId: 'liturgy',
    sectionTitle: 'Liturgy',
    text: 'Liturgy is the cosmic worship of the Church. It joins heaven and earth, past and future, creation and redemption.',
    attribution: 'Joseph Ratzinger, The Spirit of the Liturgy, ch. 3'
  },
  {
    id: 'quote-liturgy-3',
    sectionId: 'liturgy',
    sectionTitle: 'Liturgy',
    text: 'The liturgy is the continuation of salvation history. It does not simply commemorate, it actualizes: it makes present the mysteries it celebrates.',
    attribution: 'Jean Daniélou, The Bible and the Liturgy, ch. 2'
  },

  // =========================================================================
  // 33. TRADITION
  // =========================================================================
  {
    id: 'quote-tradition-1',
    sectionId: 'tradition',
    sectionTitle: 'Tradition',
    text: 'The apostles, instructed by Christ, handed on what they had received, not only in writing but also in oral teaching, and both are to be accepted with equal reverence.',
    attribution: 'St. Thomas Aquinas, Summa Theologiae, II–II, q.1, a.10'
  },
  {
    id: 'quote-tradition-2',
    sectionId: 'tradition',
    sectionTitle: 'Tradition',
    text: 'What has been believed everywhere, always, and by all—that is truly Catholic. The Church holds fast to that which is handed down by universality, antiquity, and consent.',
    attribution: 'St. Vincent of Lérins, Commonitorium, 2.5'
  },
  {
    id: 'quote-tradition-3',
    sectionId: 'tradition',
    sectionTitle: 'Tradition',
    text: 'The best advice I can give you is this. Church tradition—especially when they do not run counter to the Faith—are to be observed in the form in which previous generations have handed them down.',
    attribution: 'St. Jerome'
  },
  {
    id: 'quote-tradition-4',
    sectionId: 'tradition',
    sectionTitle: 'Tradition',
    text: 'Sacred Tradition and Sacred Scripture form one sacred deposit of the word of God, committed to the Church. It is not from Scripture alone that the Church draws her certainty about revealed truths.',
    attribution: 'Dei Verbum'
  },

  // =========================================================================
  // 34. BEATIFIC VISION
  // =========================================================================
  {
    id: 'quote-beatific-vision-1',
    sectionId: 'beatific-vision',
    sectionTitle: 'Beatific vision',
    text: 'The ultimate beatitude of man consists in the vision of the divine essence.',
    attribution: 'St. Thomas Aquinas, Summa Theologiae, I–II, q.3, a.8'
  },

  // =========================================================================
  // 35. CUSTODY OF THE SENSES
  // =========================================================================
  {
    id: 'quote-senses-1',
    sectionId: 'custody-of-the-senses',
    sectionTitle: 'Custody of the senses',
    text: 'The mortification of the senses is the beginning of contemplation. If you do not close the door to the senses, how will you enter the interior room to converse with God?',
    attribution: 'St. John of the Cross, Sayings of Light and Love, no. 65'
  },
  {
    id: 'quote-senses-2',
    sectionId: 'custody-of-the-senses',
    sectionTitle: 'Custody of the senses',
    text: 'The mortification of the senses is the beginning of contemplation. He who does not mortify the senses will never reach union with God.',
    attribution: 'St. John of the Cross, Ascent of Mount Carmel, I.6'
  },
  {
    id: 'quote-senses-3',
    sectionId: 'custody-of-the-senses',
    sectionTitle: 'Custody of the senses',
    text: 'Be deaf to all that does not speak of God. Let your ears be closed to the world and open to the Word.',
    attribution: 'St. Basil the Great, Homily on Psalm 1'
  },
  {
    id: 'quote-senses-4',
    sectionId: 'custody-of-the-senses',
    sectionTitle: 'Custody of the senses',
    text: 'The senses are like the doors of the soul; if they are not guarded, the enemies enter.',
    attribution: 'St. Teresa of Ávila'
  },
  {
    id: 'quote-senses-5',
    sectionId: 'custody-of-the-senses',
    sectionTitle: 'Custody of the senses',
    text: 'Not only the mouth must fast, but also the eye, the ear, the hands, the feet, and all the members of our body. The fasting of the mouth is in vain if the heart is full of malice.',
    attribution: 'St. John Chrysostom'
  },
  {
    id: 'quote-senses-6',
    sectionId: 'custody-of-the-senses',
    sectionTitle: 'Custody of the senses',
    text: 'Let us put sentries on the senses and shut the gates of our thoughts. This is the beginning of hesychia—holy stillness.',
    attribution: 'St. John Climacus, Ladder of Divine Ascent, Step 15'
  },
  {
    id: 'quote-senses-7',
    sectionId: 'custody-of-the-senses',
    sectionTitle: 'Custody of the senses',
    text: 'Let every sense be mortified, not in hatred of the body, but in reverence for the soul. The eye that sees Christ crucified can no longer gaze on vanity.',
    attribution: 'St. Peter Damian, Letter 28: On the Discipline of the Monastic Life'
  },

  // =========================================================================
  // 36. CONTINUITY
  // =========================================================================
  {
    id: 'quote-continuity-1',
    sectionId: 'continuity',
    sectionTitle: 'Continuity',
    text: 'The visible Church of today is the continuation of the ancient Church of the Hebrews.',
    attribution: 'John Henry Newman, Essay on the Development of Christian Doctrine (1845), ch. 1, §14.'
  },
  {
    id: 'quote-continuity-2',
    sectionId: 'continuity',
    sectionTitle: 'Continuity',
    text: 'The roots of the Catholic Church are in the faith of Abraham, the law of Moses, and the worship of the temple.',
    attribution: 'Karl Adam, The Spirit of Catholicism (London: Sheed & Ward, 1929), 19.'
  },
  {
    id: 'quote-continuity-3',
    sectionId: 'continuity',
    sectionTitle: 'Continuity',
    text: 'The Church of Christ acknowledges that according to the mystery of God’s saving design, the beginnings of her faith and election are already found among the patriarchs, Moses, and the prophets of Israel.',
    attribution: 'Pope Benedict XVI, Jesus of Nazareth: From the Baptism in the Jordan to the Transfiguration (New York: Doubleday, 2007), 116.'
  },
  {
    id: 'quote-continuity-4',
    sectionId: 'continuity',
    sectionTitle: 'Continuity',
    text: 'The Church of Christ is the heir of the synagogue, not by usurpation, but by the very will of God, who transferred the covenant from the Hebrews to all nations in Christ.',
    attribution: 'Cornelius a Lapide, Commentaria in Sacram Scripturam on Matthew 21:43.'
  },
  {
    id: 'quote-continuity-5',
    sectionId: 'continuity',
    sectionTitle: 'Continuity',
    text: 'The Church’s proclamation of Christ is inseparable from the heritage of Israel, for it is Israel’s God whom Christians worship.',
    attribution: 'Raymond E. Brown, An Introduction to the New Testament (New York: Doubleday, 1997), 13.'
  },
  {
    id: 'quote-continuity-6',
    sectionId: 'continuity',
    sectionTitle: 'Continuity',
    text: 'The Church is born from the promises made to Israel . . . she cannot understand herself without reference to the chosen people.',
    attribution: 'Henri de Lubac, Catholicisme: Les aspects sociaux du dogme (Paris: Cerf, 1947), 168.'
  },
  {
    id: 'quote-continuity-7',
    sectionId: 'continuity',
    sectionTitle: 'Continuity',
    text: 'The Church is not the negation of Israel but its transfiguration in Christ.',
    attribution: 'Louis Bouyer, The Church of God (Chicago: Henry Regnery, 1973), 45.'
  },
  {
    id: 'quote-continuity-8',
    sectionId: 'continuity',
    sectionTitle: 'Continuity',
    text: 'We are all spiritually Semites.',
    attribution: 'Pope Pius XI'
  },

  // =========================================================================
  // 37. BOTH/AND
  // =========================================================================
  {
    id: 'quote-both-and-1',
    sectionId: 'both-and',
    sectionTitle: 'Both/and',
    subHeading: 'I. The Broad Catholic Vision',
    text: 'Catholicism means embracing the whole. It is the great both/and: Scripture and Tradition, authority and freedom, Christ and His Church, action and contemplation.',
    attribution: 'Hans Urs von Balthasar, Catholicism (San Francisco: Ignatius Press, 1988), 15.'
  },
  {
    id: 'quote-both-and-2',
    sectionId: 'both-and',
    sectionTitle: 'Both/and',
    text: 'Catholicism . . . does not choose between Scripture or Tradition, grace or freedom, faith or works. It is always both/and, never either/or. This is the hallmark of Catholic truth, a unity that holds together what human logic would divide.',
    attribution: 'Joseph Ratzinger (Pope Benedict XVI), Principles of Catholic Theology: Building Stones for a Fundamental Theology (San Francisco: Ignatius Press, 1987), 16.'
  },
  {
    id: 'quote-both-and-3',
    sectionId: 'both-and',
    sectionTitle: 'Both/and',
    text: 'The mark of Catholicism is that it is both things at once: it is both free and authoritative, both universal and local, both divine and human. Where the world demands a choice, the Church insists on a paradox.',
    attribution: 'G. K. Chesterton, The Catholic Church and Conversion (London: Macmillan, 1926), 52.'
  },
  {
    id: 'quote-both-and-4',
    sectionId: 'both-and',
    sectionTitle: 'Both/and',
    text: 'Catholic theology does not break paradoxes; it holds them. The whole is greater than the part, and the Church lives from the unity of truths that seem to oppose each other.',
    attribution: 'Joseph Ratzinger, Principles of Catholic Theology (San Francisco: Ignatius Press, 1987), 16.'
  },
  {
    id: 'quote-both-and-5',
    sectionId: 'both-and',
    sectionTitle: 'Both/and',
    text: 'Catholic theology does not resolve the tension between Scripture and Tradition by eliminating one. It lives from their unity: Scripture is the norm, Tradition the living context, and both together hand on the one Word of God.',
    attribution: 'Joseph Ratzinger, God’s Word: Scripture—Tradition—Office (San Francisco: Ignatius Press, 2008), 39.'
  },
  {
    id: 'quote-both-and-6',
    sectionId: 'both-and',
    sectionTitle: 'Both/and',
    text: 'Catholicism is not an ‘either-or’; it is an ‘as well as.’ It is not so much synthesis as it is fullness.',
    attribution: 'Romano Guardini, The Catholic Church and the Spirit of the Liturgy (London: Sheed & Ward, 1935), 25.'
  },
  {
    id: 'quote-both-and-7',
    sectionId: 'both-and',
    sectionTitle: 'Both/and',
    text: 'The Catholic is not one who lives by a part of the Gospel, but by its fullness. He accepts not half of Christ, but the whole Christ.',
    attribution: 'Karl Adam, The Spirit of Catholicism (New York: Macmillan, 1929), 54.'
  },
  {
    id: 'quote-both-and-8',
    sectionId: 'both-and',
    sectionTitle: 'Both/and',
    subHeading: 'II. Revelation: Scripture and Tradition',
    text: 'Sacred tradition and Sacred Scripture form one sacred deposit of the word of God, committed to the Church.',
    attribution: 'Dei Verbum (1965), no. 10, Second Vatican Council'
  },
  {
    id: 'quote-both-and-9',
    sectionId: 'both-and',
    sectionTitle: 'Both/and',
    text: 'Tradition is not a second source alongside Scripture, but the living reality in which the Word of God resounds and is made fruitful.',
    attribution: 'Yves Congar, Tradition and Traditions (London: Burns & Oates, 1966), 42.'
  },
  {
    id: 'quote-both-and-10',
    sectionId: 'both-and',
    sectionTitle: 'Both/and',
    text: 'We hold that faith which has been believed everywhere, always, and by all.',
    attribution: 'Vincent of Lérins, Commonitorium, ch. 2, in Nicene and Post-Nicene Fathers, vol. 11 (Buffalo, NY: Christian Literature Publishing, 1894), 132.'
  },
  {
    id: 'quote-both-and-11',
    sectionId: 'both-and',
    sectionTitle: 'Both/and',
    text: 'The teaching of the Church is handed down in public through the Scriptures and in secret through Tradition.',
    attribution: 'Origen, On First Principles, preface, 2, trans. G. W. Butterworth (New York: Harper & Row, 1966), 3.'
  },
  {
    id: 'quote-both-and-12',
    sectionId: 'both-and',
    sectionTitle: 'Both/and',
    subHeading: 'III. Knowledge: Faith and Reason',
    text: 'Faith and reason are like two wings on which the human spirit rises to the contemplation of truth.',
    attribution: 'John Paul II, Fides et Ratio (1998), no. 1.'
  },
  {
    id: 'quote-both-and-13',
    sectionId: 'both-and',
    sectionTitle: 'Both/and',
    text: 'Grace does not destroy nature but perfects it.',
    attribution: 'Thomas Aquinas, Summa Theologiae I, q.1, a.8, ad 2.'
  },
  {
    id: 'quote-both-and-14',
    sectionId: 'both-and',
    sectionTitle: 'Both/and',
    text: 'I do not seek to understand in order that I may believe, but I believe in order to understand.',
    attribution: 'Anselm, Proslogion, ch. 1, in Anselm of Canterbury: The Major Works, ed. Brian Davies and G. R. Evans (Oxford: Oxford University Press, 1998), 87.'
  },
  {
    id: 'quote-both-and-15',
    sectionId: 'both-and',
    sectionTitle: 'Both/and',
    text: 'Faith comes first, understanding follows; but understanding increases faith.',
    attribution: 'Bonaventure, Itinerarium Mentis in Deum, prologue, in Works of St. Bonaventure, vol. 2 (St. Bonaventure, NY: Franciscan Institute, 1956), 3.'
  },
  {
    id: 'quote-both-and-16',
    sectionId: 'both-and',
    sectionTitle: 'Both/and',
    subHeading: 'IV. Salvation: Grace and Free Will',
    text: 'He who created you without you will not justify you without you.',
    attribution: 'Augustine, Sermons, 169.11, in Nicene and Post-Nicene Fathers, vol. 6 (Buffalo, NY: Christian Literature Publishing, 1888), 338.'
  },
  {
    id: 'quote-both-and-17',
    sectionId: 'both-and',
    sectionTitle: 'Both/and',
    text: 'In adults, the beginning of justification is to be derived from the prevenient grace of God . . . yet they, assenting to and freely cooperating with that grace, are prepared for justification.',
    attribution: 'Decree on Justification, Session VI (1547), ch. 5, Council of Trent'
  },
  {
    id: 'quote-both-and-18',
    sectionId: 'both-and',
    sectionTitle: 'Both/and',
    text: 'God, who made us without our help, will not save us without our cooperation.',
    attribution: 'Francis de Sales, Treatise on the Love of God, trans. Henry B. Mackey (London: Burns & Oates, 1884), book II, ch. 12.'
  },
  {
    id: 'quote-both-and-19',
    sectionId: 'both-and',
    sectionTitle: 'Both/and',
    subHeading: 'V. Faith and Works',
    text: 'See how a person is justified by works and not by faith alone.',
    attribution: 'St. James, James 2:24, NABRE.'
  },
  {
    id: 'quote-both-and-20',
    sectionId: 'both-and',
    sectionTitle: 'Both/and',
    text: 'It is not enough to love God in your heart alone; you must also show it in works of mercy, for love of neighbor is the proof of love of God.',
    attribution: 'Catherine of Siena, Dialogue, trans. Suzanne Noffke (New York: Paulist Press, 1980), 116.'
  },
  {
    id: 'quote-both-and-21',
    sectionId: 'both-and',
    sectionTitle: 'Both/and',
    text: 'Faith without works is not sufficient, for even the devils believe and tremble.',
    attribution: 'Augustine, On Faith and Works, ch. 23, in Nicene and Post-Nicene Fathers, vol. 5 (Buffalo, NY: Christian Literature Publishing, 1887), 230.'
  },
  {
    id: 'quote-both-and-22',
    sectionId: 'both-and',
    sectionTitle: 'Both/and',
    text: 'Faith and charity are inseparable; faith without charity is a dead word, charity without faith is mere philanthropy.',
    attribution: 'Benedict XVI, Deus Caritas Est (2005), no. 31.'
  },
  {
    id: 'quote-both-and-23',
    sectionId: 'both-and',
    sectionTitle: 'Both/and',
    subHeading: 'VI. The Church: Human and Divine',
    text: 'The Church is not a purely spiritual reality; nor is she a purely sociological one. She is both: the sacrament of Christ, where heaven and earth, grace and nature, are bound together.',
    attribution: 'Henri de Lubac, Catholicism: Christ and the Common Destiny of Man (San Francisco: Ignatius Press, 1988), 76.'
  },
  {
    id: 'quote-both-and-24',
    sectionId: 'both-and',
    sectionTitle: 'Both/and',
    text: 'The Church is at once militant and contemplative, practical and mystical, visible and invisible, a body with a soul.',
    attribution: 'John Henry Newman, An Essay on the Development of Christian Doctrine (London: J. Toovey, 1845), 40.'
  },
  {
    id: 'quote-both-and-25',
    sectionId: 'both-and',
    sectionTitle: 'Both/and',
    subHeading: 'VII. Christian Life: Contemplation and Action',
    text: 'The contemplative life is undoubtedly higher than the active; but when charity demands it, one must descend from the heights of contemplation to serve the needs of one’s neighbor.',
    attribution: 'Gregory the Great, Pastoral Rule, II.5, in Nicene and Post-Nicene Fathers, vol. 12 (1895), 21.'
  },
  {
    id: 'quote-both-and-26',
    sectionId: 'both-and',
    sectionTitle: 'Both/and',
    text: 'Martha and Mary must work together. Contemplation must lead to action, and action must be sustained by contemplation.',
    attribution: 'Teresa of Ávila, The Interior Castle, V.iii.11.'
  },
  {
    id: 'quote-both-and-27',
    sectionId: 'both-and',
    sectionTitle: 'Both/and',
    text: 'Let all things be done so that God may be glorified . . . the monk’s life is both prayer and work (ora et labora).',
    attribution: 'Benedict of Nursia, Rule of St. Benedict, ch. 57.'
  },
  {
    id: 'quote-both-and-28',
    sectionId: 'both-and',
    sectionTitle: 'Both/and',
    text: 'The Church must be contemplative and missionary. Prayer without mission is fruitless; mission without prayer is lifeless.',
    attribution: 'John Paul II, Redemptoris Missio (1990), no. 91.'
  },
  {
    id: 'quote-both-and-29',
    sectionId: 'both-and',
    sectionTitle: 'Both/and',
    subHeading: 'VIII. Mary and Christ',
    text: 'In dangers, in distress, in doubt, think of Mary, call on Mary . . . following her, you will not stray; imploring her, you will not despair; with her holding you, you will not fall. Yet always she leads you to her Son.',
    attribution: 'Bernard of Clairvaux, Homily II on the Missus Est, in Sermons on the Song of Songs, trans. Kilian Walsh (Kalamazoo, MI: Cistercian Publications, 1971), 91.'
  },
  {
    id: 'quote-both-and-30',
    sectionId: 'both-and',
    sectionTitle: 'Both/and',
    subHeading: 'IX. The Eucharist: Word and Sacrament',
    text: 'The Church lives from the Eucharist and from the Word: one is not without the other, for the Word becomes flesh and the Flesh speaks the Word.',
    attribution: 'Benedict XVI, Sacramentum Caritatis (2007), no. 44.'
  },
  {
    id: 'quote-both-and-31',
    sectionId: 'both-and',
    sectionTitle: 'Both/and',
    subHeading: 'X. Christ: True God and True Man',
    text: 'He became man so that we might become God.',
    attribution: 'Athanasius, On the Incarnation, 54, in Nicene and Post-Nicene Fathers, vol. 4 (Buffalo, NY: Christian Literature Publishing, 1892), 65.'
  },
  {
    id: 'quote-both-and-32',
    sectionId: 'both-and',
    sectionTitle: 'Both/and',
    text: 'Christ was both above us and with us: above us as God, with us as man; above us that He might create us, with us that He might recreate us.',
    attribution: 'Augustine, Sermons, 123.3, in Nicene and Post-Nicene Fathers, vol. 6 (Buffalo, NY: Christian Literature Publishing, 1888), 501.'
  },

  // =========================================================================
  // 38. INDULGENCES
  // =========================================================================
  {
    id: 'quote-indulgences-1',
    sectionId: 'indulgences',
    sectionTitle: 'Indulgences',
    text: 'The chief plenary indulgence, which is within reach of everybody, and can be gained without the ordinary conditions, is that of charity—which \'covereth a multitude of sins.\'',
    attribution: 'St. Thérèse of Lisieux'
  }
];
