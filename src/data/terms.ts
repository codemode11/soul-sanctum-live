import { CatholicTerm } from '../types';

export const CATHOLIC_TERMS_DATABASE: CatholicTerm[] = [
  {
    id: 'term-transubstantiation',
    term: 'Transubstantiation',
    phonetic: '/ˌtræn.səbˌstæn.ʃiˈeɪ.ʃən/',
    languageOrigin: 'Latin: trans (across, change) + substantia (substance)',
    literalMeaning: 'Change of substance',
    shortDefinition: 'The theological term expressing the complete change of the whole substance of bread and wine into the Body, Blood, Soul, and Divinity of Jesus Christ at the consecration of the Mass, while the physical appearances (accidents) remain.',
    detailedExplanation: `At the words of consecration spoken by a validly ordained priest acting "in persona Christi capitis" (in the person of Christ the Head), the metaphysical substance of bread ceases to exist and becomes the true Body of Jesus Christ; likewise the substance of wine becomes His true Blood.

Although the physical properties (accidents)—such as taste, scent, color, texture, and nutritional value—remain identical to human senses and scientific instruments, the underlying ontological reality is wholly transformed. This dogma was formally promulgated at the Fourth Lateran Council (1215) and solemnly defined at the Council of Trent (1551).`,
    catechismRef: 'CCC 1373–1377, 1413',
    scripturalBasis: 'Matthew 26:26–28; Mark 14:22–24; Luke 22:19–20; 1 Corinthians 11:23–29; John 6:51–58',
    liturgicalContext: 'The moment of the Eucharistic Prayer (Anaphora) when the priest genuflects and elevates the Host and Chalice for the adoration of the faithful.',
    category: 'Sacraments'
  },
  {
    id: 'term-epiclesis',
    term: 'Epiclesis',
    phonetic: '/ˌɛp.ɪˈkliː.sɪs/',
    languageOrigin: 'Greek: ἐπίκλησις (epiklēsis), from epi (upon) + kalein (to call, invoke)',
    literalMeaning: 'Invocation upon / Calling down from above',
    shortDefinition: 'The prayer in the Eucharistic Liturgy and other sacramental rites by which the priest implores God the Father to send the Holy Spirit upon the gifts or persons to sanctify and transform them.',
    detailedExplanation: `In the celebration of the Holy Mass, the epiclesis occurs when the priest extends his hands over the paten and chalice containing the bread and wine, asking the Father to send down the Holy Spirit like the dewfall to make them holy, so that they may become the Body and Blood of Our Lord Jesus Christ.

An epiclesis also occurs in Holy Baptism (calling upon the Spirit over the baptismal water), Holy Orders (imposition of hands), Confirmation (imposition of hands and anointing with Chrism), and the Sacrament of the Sick.`,
    catechismRef: 'CCC 1105, 1106, 1353',
    scripturalBasis: 'Luke 1:35 (the Holy Spirit overshadowing the Virgin Mary); Acts 1:8',
    liturgicalContext: 'In Eucharistic Prayer II: "Make holy, therefore, these gifts, we pray, by sending down your Spirit upon them like the dewfall..."',
    category: 'Liturgy and Worship'
  },
  {
    id: 'term-theotokos',
    term: 'Theotokos',
    phonetic: '/ˌθiː.əˈtɒk.ɒs/',
    languageOrigin: 'Greek: Θεοτόκος, from Theos (God) + tiktein (to bear, bring forth)',
    literalMeaning: 'God-bearer / Mother of God',
    shortDefinition: 'The dogmatic title of the Blessed Virgin Mary confirming that the Son she conceived and gave birth to in time according to His human nature is the eternal second Person of the Blessed Trinity, true God.',
    detailedExplanation: `In 431 AD, the Council of Ephesus solemnly dogmatized the title Theotokos against the heresy of Nestorius, who falsely claimed Mary was only the mother of Jesus\' human nature (Christotokos).

Because Jesus Christ is one single Divine Person with two indivisible natures (divine and human), Mary gave birth to a Person, not an abstract nature. Since that Person is truly God, Mary is truly the Mother of God. This title guards and safeguards the true divinity and humanity of Jesus Christ.`,
    catechismRef: 'CCC 466, 495, 963',
    scripturalBasis: 'Luke 1:43 ("And why is this granted to me, that the mother of my Lord should come to me?"); Galatians 4:4 ("God sent forth His Son, born of a woman")',
    liturgicalContext: 'Celebrated on January 1st as the Solemnity of Mary, the Holy Mother of God (Octave of the Nativity), and recited in every Hail Mary ("Holy Mary, Mother of God").',
    category: 'Theology and Dogma'
  },
  {
    id: 'term-hypostatic-union',
    term: 'Hypostatic Union',
    phonetic: '/ˌhaɪ.pəˈstæt.ɪk ˈjuː.njən/',
    languageOrigin: 'Greek: ὑπόστασις (hypostasis - subsistence, concrete individual reality) + Latin: unio',
    literalMeaning: 'Personal union of two natures in one divine hypostasis',
    shortDefinition: 'The dogmatic truth that Jesus Christ is one divine Person possessing two complete and distinct natures: a fully divine nature and a fully human nature, united without confusion, change, division, or separation.',
    detailedExplanation: `Solemnly defined at the Ecumenical Council of Chalcedon in 451 AD. Jesus Christ is not half-God and half-man, nor is He an angel in disguise. He is true God from true God, begotten not made, who took a real human body, human rational soul, human intellect, and human will from the Virgin Mary.

Because of the Hypostatic Union, when Jesus wept, God wept in His human nature; when Jesus died on Calvary, the second Person of the Trinity suffered in His human flesh.`,
    catechismRef: 'CCC 464–469',
    scripturalBasis: 'John 1:1, 14 ("And the Word became flesh and dwelt among us"); Philippians 2:6–8; Colossians 2:9 ("For in him the whole fullness of deity dwells bodily")',
    liturgicalContext: 'Professed in the Nicene-Constantinopolitan Creed every Sunday and Solemnity.',
    category: 'Theology and Dogma'
  },
  {
    id: 'term-magisterium',
    term: 'Magisterium',
    phonetic: '/ˌmædʒ.ɪˈstɪə.ri.əm/',
    languageOrigin: 'Latin: magister (master, teacher) + -ium',
    literalMeaning: 'The teaching office or authority of a teacher',
    shortDefinition: 'The living, teaching office of the Catholic Church, consisting of the Pope and the bishops in communion with him, tasked with authentically interpreting the written and handed-down Word of God.',
    detailedExplanation: `The Magisterium is not superior to the Word of God, but is its servant. It teaches only what has been handed down from the Apostles through Sacred Scripture and Sacred Tradition.

By divine mandate and with the assistance of the Holy Spirit, the Magisterium listens to this devotionally, guards it with dedication, and expounds it faithfully. The Magisterium exercises the gift of Infallibility when defining dogmas ex cathedra (by the Pope) or in Ecumenical Councils.`,
    catechismRef: 'CCC 85–87, 888–892',
    scripturalBasis: 'Matthew 28:18–20; Luke 10:16 ("He who hears you hears me"); 1 Timothy 3:15 ("the Church of the living God, the pillar and bulwark of the truth")',
    liturgicalContext: 'Promulgation of pastoral letters, encyclicals, and doctrinal instructions for the faithful.',
    category: 'Church Hierarchy and Canon Law'
  },
  {
    id: 'term-viaticum',
    term: 'Viaticum',
    phonetic: '/vaɪˈæt.ɪ.kəm/',
    languageOrigin: 'Latin: viaticum, from via (way, journey, road)',
    literalMeaning: 'Provisions for a journey ("Food for the road")',
    shortDefinition: 'The Holy Eucharist administered to a Catholic Christian who is in danger of death, serving as spiritual nourishment and strength for the passage from this earthly life into eternity.',
    detailedExplanation: `When received at the end of life alongside the Sacrament of Anointing of the Sick and the Apostolic Pardon, the Holy Eucharist takes on the sacred character of Viaticum.

It is the pledge of the resurrection: "He who eats My flesh and drinks My blood has eternal life, and I will raise him up on the last day" (Jn 6:54). Viaticum assures the dying soul that Christ Himself is their escort and companion as they cross the threshold of death into the hands of the Father.`,
    catechismRef: 'CCC 1524–1525',
    scripturalBasis: 'John 6:54; 1 Kings 19:7–8 (Elijah nourished by angelic bread on the mountain)',
    liturgicalContext: 'Last Rites administered by a priest to the critically ill or dying believer.',
    category: 'Sacraments'
  },
  {
    id: 'term-ex-opere-operato',
    term: 'Ex Opere Operato',
    phonetic: '/ɛks ˈɒp.ə.reɪ ˌɒp.əˈrɑː.toʊ/',
    languageOrigin: 'Latin: ex (from/by) + opere (the work) + operato (having been worked)',
    literalMeaning: 'By the very fact of the action\'s being performed',
    shortDefinition: 'The Catholic sacramental dogma that the sacraments produce their spiritual grace by the power of Christ\'s redemptive sacrifice itself, independently of the personal moral worthiness or holiness of the minister.',
    detailedExplanation: `Defined by the Council of Trent against the Donatist heresy. Because Jesus Christ is the primary and true minister of every sacrament—it is Christ who baptizes, Christ who absolves, Christ who consecrates—the sacrament is valid and effective as long as the minister has the intention to do what the Church does and uses the proper form and matter.

However, the fruitfulness of the sacrament in the soul of the recipient depends upon their own interior disposition, faith, and freedom from mortal sin ("ex opere operantis").`,
    catechismRef: 'CCC 1128',
    scripturalBasis: '2 Timothy 1:6; 1 Thessalonians 2:13',
    liturgicalContext: 'Provides absolute spiritual certainty to the faithful receiving absolution in Confession or receiving Holy Communion.',
    category: 'Sacraments'
  },
  {
    id: 'term-lectio-divina',
    term: 'Lectio Divina',
    phonetic: '/ˌlɛk.tsi.oʊ dɪˈviː.nə/',
    languageOrigin: 'Latin: lectio (reading) + divina (divine, holy)',
    literalMeaning: 'Divine or Sacred Reading',
    shortDefinition: 'A venerable traditional Catholic method of praying with Sacred Scripture, structured into four classical movements: Lectio (reading), Meditatio (meditation), Oratio (prayer), and Contemplatio (contemplation).',
    detailedExplanation: `Developed in early monasticism by the Desert Fathers and formulated systematically by Guigo the Carthusian in the 12th century.
1. Lectio: Reading a scriptural passage slowly, reverently, listening for the word or phrase God addresses to you.
2. Meditatio: Reflecting with the mind and heart, pondering the meaning and relevance to your life.
3. Oratio: Speaking directly to God in heartfelt prayer in response to what He has revealed.
4. Contemplatio: Resting quietly in God's presence above thoughts and words, allowing His love to transform your spirit.`,
    catechismRef: 'CCC 1177, 2708, 2710',
    scripturalBasis: 'Luke 2:19 ("Mary kept all these things, pondering them in her heart"); Psalm 1:2',
    liturgicalContext: 'Personal mental prayer and monastic Liturgy of the Hours.',
    category: 'Spiritual Life'
  }
];

export function getTermOfTheDay(): CatholicTerm {
  // Use today's calendar date to consistently pick term
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  const index = Math.abs(dayOfYear) % CATHOLIC_TERMS_DATABASE.length;
  return CATHOLIC_TERMS_DATABASE[index] || CATHOLIC_TERMS_DATABASE[0];
}
