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
  },
  {
    id: 'term-in-persona-christi',
    term: 'In Persona Christi Capitis',
    phonetic: '/ɪn pɜːrˈsoʊ.nə ˈkrɪs.ti ˈkæp.ɪ.tɪs/',
    languageOrigin: 'Latin: in (in) + persona (person) + Christi (of Christ) + capitis (the Head)',
    literalMeaning: 'In the person of Christ the Head',
    shortDefinition: 'The sacred sacramental reality whereby a validly ordained bishop or priest acts not merely as a representative, but sacramentally in the very person of Jesus Christ, Head of the Church, when celebrating the sacraments.',
    detailedExplanation: `Through the Sacrament of Holy Orders, the ordained minister is ontologically configured to Christ the High Priest so that Christ Himself acts through the minister's voice and gestures in the Church's liturgy.

When the priest pronounces "This is My Body" at Mass or "I absolve you from your sins" in Confession, it is Christ the Head who consecrates the Eucharist and forgives sins through His ordained servant.`,
    catechismRef: 'CCC 875, 1548–1551',
    scripturalBasis: '2 Corinthians 2:10; 2 Corinthians 5:20 ("So we are ambassadors for Christ, God making his appeal through us"); Luke 10:16',
    liturgicalContext: 'The Words of Institution during the Eucharistic Prayer and the formula of absolution in the Sacrament of Penance.',
    category: 'Sacraments'
  },
  {
    id: 'term-real-presence',
    term: 'Real Presence',
    phonetic: '/riːəl ˈprɛz.əns/',
    languageOrigin: 'Latin: praesentia realis (true, actual, substantial presence)',
    literalMeaning: 'True and substantial presence',
    shortDefinition: 'The Catholic dogma that Jesus Christ is truly, really, and substantially present—Body, Blood, Soul, and Divinity—under the consecrated appearances of bread and wine in the Most Holy Eucharist.',
    detailedExplanation: `While Christ is present to His Church in many ways—in His Word, in the gathered assembly, in the poor, and in the person of the minister—His presence in the Eucharistic species is called "real" not to exclude other modes of presence, but by excellence, because it is substantial.

Whole and entire Christ, God and man, becomes wholly present under both the consecrated Host and the Precious Blood, and remains present in the consecrated hosts reserved in the tabernacle for as long as the Eucharistic species endure.`,
    catechismRef: 'CCC 1373–1381',
    scripturalBasis: 'John 6:51–56 ("For my flesh is true food, and my blood is true drink"); Matthew 26:26–28; 1 Corinthians 11:27–29',
    liturgicalContext: 'Genuflection before the tabernacle, Holy Communion, Corpus Christi processions, and Eucharistic Adoration.',
    category: 'Sacraments'
  },
  {
    id: 'term-sacramental-character',
    term: 'Sacramental Character',
    phonetic: '/ˌsæk.rəˈmɛn.təl ˈkær.ək.tər/',
    languageOrigin: 'Greek: χαρακτήρ (charaktēr - engraved mark, stamp, seal)',
    literalMeaning: 'Indelible spiritual seal or stamp',
    shortDefinition: 'An indelible spiritual mark imprinted upon the soul by the sacraments of Baptism, Confirmation, and Holy Orders, configuring the believer permanently to Christ and His priesthood.',
    detailedExplanation: `Because these three sacraments impart a permanent ontological seal that can never be erased—even by sin—they can each be received only once in a person's lifetime.

The sacramental character enables and commits the Christian to participate in the worship of the Church: Baptism incorporates the soul into Christ, Confirmation strengthens it for public witness, and Holy Orders configures the minister to act in the person of Christ the Head.`,
    catechismRef: 'CCC 1121, 1272–1274, 1304–1305, 1582',
    scripturalBasis: '2 Corinthians 1:21–22 ("He has put his seal upon us and given us his Spirit in our hearts"); Ephesians 1:13; Ephesians 4:30',
    liturgicalContext: 'The sealing with Sacred Chrism in Baptism and Confirmation and the anointing of hands in Priestly Ordination.',
    category: 'Sacraments'
  },
  {
    id: 'term-absolution',
    term: 'Absolution',
    phonetic: '/ˌæb.səˈluː.ʃən/',
    languageOrigin: 'Latin: absolvere, from ab (from) + solvere (to loose, unbind, set free)',
    literalMeaning: 'A loosing or freeing from the bond of sin',
    shortDefinition: 'The sacramental act by which a validly ordained priest with faculties, acting in the name and authority of Christ and His Church, grants God\'s forgiveness of sins to a contrite penitent.',
    detailedExplanation: `Instituted by the Risen Lord on Easter Sunday evening when He breathed on the Apostles and granted them authority to forgive or retain sins, sacramental absolution reconciles the sinner both with God and with the Church.

The essential words of the Roman Rite—"I absolve you from your sins in the name of the Father, and of the Son, and of the Holy Spirit"—restore sanctifying grace to the soul burdened by mortal sin and impart healing grace against future temptation.`,
    catechismRef: 'CCC 1441–1449, 1480–1481',
    scripturalBasis: 'John 20:22–23 ("Whose sins you forgive are forgiven them"); Matthew 16:19; Matthew 18:18',
    liturgicalContext: 'Spoken by the confessor while extending his right hand over the penitent in the Sacrament of Penance and Reconciliation.',
    category: 'Sacraments'
  },
  {
    id: 'term-anamnesis',
    term: 'Anamnesis',
    phonetic: '/ˌæn.æmˈniː.sɪs/',
    languageOrigin: 'Greek: ἀνάμνησις (anamnēsis - active remembrance, living memorial)',
    literalMeaning: 'Living liturgical memorial',
    shortDefinition: 'The liturgical remembrance in the Eucharistic Prayer by which the Church does not merely recall past events, but sacramentally makes Christ\'s once-for-all Passion, Resurrection, and Ascension truly present here and now.',
    detailedExplanation: `Rooted in the biblical Hebrew concept of zikkaron (memorial), anamnesis is far more than psychological memory. Just as the Jewish Passover made the liberation from Egypt mystically present to each generation, the Christian Eucharist makes present the one redemptive sacrifice of Calvary.

Immediately following the Words of Institution ("Do this in memory of me") and the Mystery of Faith, the priest offers the prayer of anamnesis recalling Christ's saving Death, glorious Resurrection, and Ascension into heaven.`,
    catechismRef: 'CCC 1103, 1354, 1362–1366',
    scripturalBasis: 'Luke 22:19 ("Do this in remembrance of me"); 1 Corinthians 11:24–26; Exodus 12:14',
    liturgicalContext: 'In Eucharistic Prayer I–IV immediately after the Memorial Acclamation: "Therefore, as we celebrate the memorial of his Death and Resurrection..."',
    category: 'Sacraments'
  },
  {
    id: 'term-immaculate-conception',
    term: 'Immaculate Conception',
    phonetic: '/ɪˈmæk.jʊ.lət kənˈsɛp.ʃən/',
    languageOrigin: 'Latin: immaculata (unstained, spotless) + conceptio (conception)',
    literalMeaning: 'Spotless, sinless conception',
    shortDefinition: 'The Marian dogma that the Blessed Virgin Mary, from the very first instant of her conception in the womb of St. Anne, was preserved free from all stain of Original Sin by a singular grace and privilege of God in view of the merits of Jesus Christ.',
    detailedExplanation: `Solemnly defined ex cathedra by Pope Pius IX in the Apostolic Constitution Ineffabilis Deus (December 8, 1854), and confirmed four years later at Lourdes when Our Lady told St. Bernadette, "I am the Immaculate Conception."

Contrary to common misunderstanding, this dogma does not refer to the virginal conception of Jesus, but to Mary's own conception. Mary was redeemed in the most sublime manner—preserved from falling into sin beforehand—so that she might be a pure and worthy dwelling place for the incarnate Son of God.`,
    catechismRef: 'CCC 490–493',
    scripturalBasis: 'Luke 1:28 ("Hail, full of grace [kecharitōmenē], the Lord is with you"); Genesis 3:15',
    liturgicalContext: 'Celebrated every December 8 as the Solemnity of the Immaculate Conception of the Blessed Virgin Mary, a Holy Day of Obligation.',
    category: 'Theology and Dogma'
  },
  {
    id: 'term-assumption-of-mary',
    term: 'Assumption of Mary',
    phonetic: '/əˈsʌmp.ʃən əv ˈmɛər.i/',
    languageOrigin: 'Latin: assumere (to take up, receive unto oneself)',
    literalMeaning: 'Being taken up into heaven',
    shortDefinition: 'The dogma that the Immaculate Mother of God, the ever Virgin Mary, having completed the course of her earthly life, was assumed body and soul into heavenly glory.',
    detailedExplanation: `Solemnly defined as a divinely revealed dogma by Pope Pius XII in the Apostolic Constitution Munificentissimus Deus (November 1, 1950). Whereas Christ ascended into heaven by His own divine power (Ascension), Mary was taken up by the power of God (Assumption).

Her Assumption is a singular participation in the Resurrection of her Son and an anticipation of the bodily resurrection promised to all faithful Christians at the end of time.`,
    catechismRef: 'CCC 966, 974',
    scripturalBasis: 'Revelation 11:19–12:1 (the Ark of the Covenant seen in heaven, followed by the Woman clothed with the sun); Psalm 132:8',
    liturgicalContext: 'Celebrated annually on August 15 as the Solemnity of the Assumption of the Blessed Virgin Mary, and meditated upon in the Fourth Glorious Mystery of the Rosary.',
    category: 'Theology and Dogma'
  },
  {
    id: 'term-homoousios',
    term: 'Homoousios (Consubstantial)',
    phonetic: '/ˌhɒm.oʊˈuː.si.ɒs/',
    languageOrigin: 'Greek: ὁμοούσιος, from homos (same) + ousia (essence, being, substance)',
    literalMeaning: 'Of the same substance / Consubstantial',
    shortDefinition: 'The pivotal dogmatic term adopted by the First Council of Nicaea (325 AD) affirming that God the Son is eternally of the exact same divine substance and essence as God the Father.',
    detailedExplanation: `Formulated to refute Arianism—which falsely taught that the Son was a created being rather than true God—homoousios (rendered in Latin as consubstantialis) safeguards the full divinity of Jesus Christ and the absolute unity of the Blessed Trinity.

The Father, Son, and Holy Spirit are three distinct Divine Persons who possess the one, indivisible divine nature completely and equally.`,
    catechismRef: 'CCC 242, 465',
    scripturalBasis: 'John 10:30 ("I and the Father are one"); John 1:1; Hebrews 1:3 ("He reflects the glory of God and bears the very stamp of his nature")',
    liturgicalContext: 'Recited every Sunday in the Nicene Creed: "consubstantial with the Father."',
    category: 'Theology and Dogma'
  },
  {
    id: 'term-filioque',
    term: 'Filioque',
    phonetic: '/ˌfɪl.iˈoʊ.kweɪ/',
    languageOrigin: 'Latin: Filio (from the Son) + -que (and)',
    literalMeaning: 'And from the Son',
    shortDefinition: 'The phrase in the Western Nicene Creed confessing that the Holy Spirit eternally proceeds from the Father "and the Son" as from one single principle and spiration.',
    detailedExplanation: `Expressing the Latin patristic theology of St. Augustine and St. Ambrose, the Filioque clarifies that the Father is the ultimate source of the Trinity, while the Son shares completely in the Father's eternal breathing forth (spiration) of the Holy Spirit—often harmonized with the Eastern formulation "from the Father through the Son."

Understanding both traditions faithfully remains a cornerstone of Catholic Trinitarian theology and ecumenical dialogue between Rome and the Eastern Churches.`,
    catechismRef: 'CCC 246–248',
    scripturalBasis: 'John 15:26; John 16:14–15; Galatians 4:6 ("God has sent the Spirit of his Son into our hearts")',
    liturgicalContext: 'Professed in the Roman Rite Nicene Creed: "who proceeds from the Father and the Son."',
    category: 'Theology and Dogma'
  },
  {
    id: 'term-purgatory',
    term: 'Purgatory',
    phonetic: '/ˈpɜːr.ɡə.tɔːr.i/',
    languageOrigin: 'Latin: purgatorium, from purgare (to cleanse, purify)',
    literalMeaning: 'A state of final purification',
    shortDefinition: 'The state of final merciful purification after death for those who die in God\'s grace and friendship, yet still require cleansing from lingering venial sins or temporal attachments before entering the joy of heaven.',
    detailedExplanation: `Every soul in Purgatory is permanently saved and assured of eternal beatitude; Purgatory is not a "second chance" for the damned, but the vestibule of Heaven where Christ's purifying love removes every remaining imperfection so that nothing unclean enters God's presence.

Defined at the Councils of Florence (1439) and Trent (1563), the Church commends praying for the Holy Souls in Purgatory—above all through the offering of the Holy Sacrifice of the Mass, almsgiving, and indulgences.`,
    catechismRef: 'CCC 1030–1032',
    scripturalBasis: '2 Maccabees 12:44–46 (praying for the dead); 1 Corinthians 3:13–15 ("saved, but only as through fire"); Revelation 21:27',
    liturgicalContext: 'Commemorated especially on All Souls\' Day (November 2) and in every Eucharistic Prayer during the Memento of the Dead.',
    category: 'Theology and Dogma'
  },
  {
    id: 'term-beatific-vision',
    term: 'Beatific Vision',
    phonetic: '/ˌbiː.əˈtɪf.ɪk ˈvɪʒ.ən/',
    languageOrigin: 'Latin: visio beatifica, from beatus (blessed, supremely happy) + facere (to make)',
    literalMeaning: 'The vision that makes one supremely blessed',
    shortDefinition: 'The direct, immediate, face-to-face contemplation of God in His divine essence enjoyed by the angels and saints in Heaven, constituting the ultimate fulfillment of all human longing.',
    detailedExplanation: `In earthly life we know God through faith, creation, and sacramental signs; in Heaven, faith gives way to direct sight through a supernatural gift called the "light of glory" (lumen gloriae).

Solemnly defined by Pope Benedict XII in Benedictus Deus (1336), the Beatific Vision does not erase human individuality but elevates the soul into unending communion, joy, and love with the Most Holy Trinity.`,
    catechismRef: 'CCC 1023–1028, 1720',
    scripturalBasis: '1 Corinthians 13:12 ("Now we see in a mirror dimly, but then face to face"); 1 John 3:2 ("we shall see him as he is"); Matthew 5:8',
    liturgicalContext: 'Invoked in the Requiem Mass ("Let perpetual light shine upon them") and the Feast of All Saints.',
    category: 'Theology and Dogma'
  },
  {
    id: 'term-deposit-of-faith',
    term: 'Deposit of Faith',
    phonetic: '/dɪˈpɒz.ɪt əv feɪθ/',
    languageOrigin: 'Latin: Depositum Fidei (the sacred trust of faith)',
    literalMeaning: 'The entrusted treasure of divine revelation',
    shortDefinition: 'The complete, definitive body of divine revelation entrusted by Jesus Christ to the Apostles and preserved faithfully by the Church in both Sacred Scripture and Sacred Tradition.',
    detailedExplanation: `Public divine revelation reached its fullness in Jesus Christ and closed with the death of the last Apostle. Consequently, the Catholic Church never invents "new" dogmas; rather, guided by the Holy Spirit, she penetrates ever more deeply into the Deposit of Faith already given once for all.

Sacred Scripture, Sacred Tradition, and the living Magisterium work in indivisible harmony so that the entire Deposit of Faith is transmitted intact across every century.`,
    catechismRef: 'CCC 84–87, 97',
    scripturalBasis: '1 Timothy 6:20 ("Guard what has been entrusted to you"); 2 Timothy 1:14; Jude 1:3 ("the faith once for all delivered to the saints")',
    liturgicalContext: 'Proclaimed in the Liturgy of the Word and guarded by the Bishop at his ordination and pastoral teaching.',
    category: 'Theology and Dogma'
  },
  {
    id: 'term-communion-of-saints',
    term: 'Communion of Saints',
    phonetic: '/kəˈmjuː.njən əv seɪnts/',
    languageOrigin: 'Latin: Communio Sanctorum (fellowship in holy things and among holy persons)',
    literalMeaning: 'Fellowship of holy ones and holy realities',
    shortDefinition: 'The living spiritual unity binding together all members of Christ\'s Mystical Body—the faithful on earth (Church Militant), the souls in Purgatory (Church Suffering), and the saints in Heaven (Church Triumphant).',
    detailedExplanation: `The phrase communio sanctorum carries a dual meaning: communion in holy things (sancta—faith, sacraments, grace, and charity) and communion among holy persons (sancti—all who belong to Christ).

Because death cannot sever the bond of charity in Christ, the saints in Heaven actively intercede for us before God, and the faithful on earth assist the souls in Purgatory through prayer and the Eucharist.`,
    catechismRef: 'CCC 946–962',
    scripturalBasis: '1 Corinthians 12:12–27; Hebrews 12:1, 22–24 ("surrounded by so great a cloud of witnesses"); Revelation 5:8',
    liturgicalContext: 'Professed in the Apostles\' Creed and experienced liturgically in the Litany of the Saints and Eucharistic Prayers.',
    category: 'Theology and Dogma'
  },
  {
    id: 'term-eucharistic-adoration',
    term: 'Eucharistic Adoration',
    phonetic: '/ˌjuː.kəˈrɪs.tɪk ˌæd.əˈreɪ.ʃən/',
    languageOrigin: 'Greek: εὐχαριστία (thanksgiving) + Latin: adorare (to worship, honor face-to-face)',
    literalMeaning: 'Worship of Christ truly present in the Eucharist',
    shortDefinition: 'The devout worship and silent contemplation of Jesus Christ truly present in the consecrated Host, whether reserved inside the tabernacle or solemnly exposed on the altar in a monstrance.',
    detailedExplanation: `Flowing directly from the celebration of the Holy Mass, Eucharistic Adoration prolongs and deepens union with Christ the Bridegroom. When the Blessed Sacrament is exposed, the service often concludes with Benediction—in which the priest blesses the faithful with the monstrance while singing Tantum Ergo.

Popes and saints alike have called the Holy Hour before the Blessed Sacrament a school of contemplation, reparation, and missionary zeal.`,
    catechismRef: 'CCC 1378–1380',
    scripturalBasis: 'Matthew 26:40 ("Could you not watch with me one hour?"); Matthew 2:11; Psalm 95:6',
    liturgicalContext: 'Exposition, Holy Hour, Forty Hours Devotion, and Benediction of the Most Blessed Sacrament.',
    category: 'Liturgy and Worship'
  },
  {
    id: 'term-liturgy-of-the-hours',
    term: 'Liturgy of the Hours',
    phonetic: '/ˈlɪt.ər.dʒi əv ðə aʊərz/',
    languageOrigin: 'Greek: λειτουργία (leitourgia - public work/service) + Latin: Officium Divinum (Divine Office)',
    literalMeaning: 'The public prayer sanctifying the hours of the day',
    shortDefinition: 'The official daily public prayer of the Catholic Church—composed of psalms, hymns, Scripture readings, and intercessions—prayed at set intervals to consecrate the whole course of day and night to God.',
    detailedExplanation: `Also known as the Divine Office or Breviary, the Liturgy of the Hours fulfills St. Paul's command to "pray without ceasing." Its two hinge hours are Morning Prayer (Lauds) and Evening Prayer (Vespers), complemented by the Office of Readings, Daytime Prayer (Terce, Sext, None), and Night Prayer (Compline).

Priests, deacons, and consecrated religious are bound to pray it daily on behalf of all humanity, and the Second Vatican Council warmly encourages lay faithful to join in this unceasing hymn of Christ and His Bride, the Church.`,
    catechismRef: 'CCC 1174–1178',
    scripturalBasis: '1 Thessalonians 5:17 ("Pray constantly"); Psalm 119:164 ("Seven times a day I praise you"); Acts 3:1',
    liturgicalContext: 'Prayed daily in monasteries, parishes, and Catholic homes around the world in rhythm with the liturgical year.',
    category: 'Liturgy and Worship'
  },
  {
    id: 'term-paschal-triduum',
    term: 'Paschal Triduum',
    phonetic: '/ˈpæs.kəl ˈtrɪd.ju.əm/',
    languageOrigin: 'Hebrew/Aramaic: Pesach (Passover) + Latin: triduum (a space of three days)',
    literalMeaning: 'The Sacred Three Days of Christ\'s Passover',
    shortDefinition: 'The liturgical summit of the entire Catholic year, extending from the Evening Mass of the Lord\'s Supper on Holy Thursday through Good Friday and Holy Saturday to Evening Prayer on Easter Sunday.',
    detailedExplanation: `Though spanning three calendar days, the Paschal Triduum is celebrated as one single continuous liturgical drama—there is no dismissal at the end of Holy Thursday or Good Friday, and the celebration reaches its glorious climax in the Easter Vigil, the "mother of all vigils."

During these three days the Church enters mystically into the institution of the Eucharist and Priesthood, the Crucifixion and Death of the Lord, His silent rest in the tomb, and His victorious Resurrection from the dead.`,
    catechismRef: 'CCC 1168–1170',
    scripturalBasis: 'Luke 22–24; John 13–20; 1 Corinthians 5:7 ("Christ, our paschal lamb, has been sacrificed")',
    liturgicalContext: 'Holy Thursday Evening Mass of the Lord\'s Supper, Good Friday Celebration of the Passion, and the Holy Saturday Easter Vigil.',
    category: 'Liturgy and Worship'
  },
  {
    id: 'term-latria-dulia',
    term: 'Latria, Hyperdulia & Dulia',
    phonetic: '/ləˈtraɪ.ə, ˌhaɪ.pər.duːˈlaɪ.ə, duːˈlaɪ.ə/',
    languageOrigin: 'Greek: λατρεία (adoration/worship) + δουλεία (veneration/honor) + ὑπέρ (above/highest)',
    literalMeaning: 'Adoration due to God alone vs. veneration given to saints',
    shortDefinition: 'The precise theological distinction reserving supreme worship and adoration (latria) strictly to God alone, while granting honor and veneration (dulia) to the angels and saints, and highest veneration (hyperdulia) to the Blessed Virgin Mary.',
    detailedExplanation: `Catholics never worship Mary or the saints as gods—doing so would violate the First Commandment. Latria involves sacrifice and absolute adoration owed exclusively to the Most Holy Trinity.

Dulia is the filial reverence we show to God's faithful friends in Heaven, honoring the triumph of God's grace in them. Because Mary is the Mother of God and Queen of All Saints, she receives hyperdulia—the highest form of creaturely honor, yet infinitely below the adoration owed to God alone.`,
    catechismRef: 'CCC 971, 2096–2097, 2132',
    scripturalBasis: 'Matthew 4:10 ("You shall worship the Lord your God and him only shall you serve"); Luke 1:48 ("all generations will call me blessed")',
    liturgicalContext: 'The Sacrifice of the Mass is offered exclusively to God (latria), while feasts of Mary and the saints celebrate God\'s grace in His servants.',
    category: 'Liturgy and Worship'
  },
  {
    id: 'term-doxology',
    term: 'Doxology',
    phonetic: '/dɒkˈsɒl.ə.dʒi/',
    languageOrigin: 'Greek: δόξα (doxa - glory, praise) + λόγος (logos - word, expression)',
    literalMeaning: 'A solemn word or hymn of glory',
    shortDefinition: 'A concise liturgical formula or hymn of solemn praise glorifying the Most Holy Trinity—most notably the Minor Doxology (Glory Be) and the Concluding Doxology of the Eucharistic Prayer.',
    detailedExplanation: `Catholic worship is fundamentally Trinitarian: every prayer ascends to the Father, through the Son, in the unity of the Holy Spirit.

At the climax of the Eucharistic Prayer, the priest elevates the Body and Blood of Christ and chants the Great Doxology—"Through him, and with him, and in him, O God, almighty Father, in the unity of the Holy Spirit, all glory and honor is yours, for ever and ever"—to which the entire assembly responds with the Great Amen.`,
    catechismRef: 'CCC 1354, 2855',
    scripturalBasis: 'Romans 11:36 ("For from him and through him and to him are all things. To him be glory for ever. Amen."); Jude 1:25; Revelation 5:13',
    liturgicalContext: 'Concluding elevation of the Eucharistic Prayer, end of every psalm in the Liturgy of the Hours, and each decade of the Holy Rosary.',
    category: 'Liturgy and Worship'
  },
  {
    id: 'term-monstrance',
    term: 'Monstrance (Ostensorium)',
    phonetic: '/ˈmɒn.strəns/',
    languageOrigin: 'Latin: monstrare (to show, display) / ostendere (to exhibit)',
    literalMeaning: 'Vessel for showing forth the Blessed Sacrament',
    shortDefinition: 'A sacred ornate vessel—traditionally fashioned of gold or gilded silver in the form of a radiant sunburst—designed to hold and display the consecrated Eucharistic Host during Exposition, Adoration, and Benediction.',
    detailedExplanation: `At the center of the monstrance sits a transparent glass enclosure holding the luna (lunette), a crescent-shaped clip that secures the large consecrated Host so the faithful can gaze upon Christ in the Eucharist.

Its radiant golden rays evoke Christ as the "Sun of Righteousness" (Malachi 4:2) and the "Light of the World" (John 8:12), shining His healing mercy upon all who adore Him.`,
    catechismRef: 'CCC 1378–1379',
    scripturalBasis: 'John 8:12 ("I am the light of the world"); Malachi 4:2; John 1:29 ("Behold, the Lamb of God")',
    liturgicalContext: 'Placed upon the altar during Eucharistic Adoration and carried by the priest during Corpus Christi processions.',
    category: 'Liturgy and Worship'
  },
  {
    id: 'term-tabernacle',
    term: 'Tabernacle',
    phonetic: '/ˈtæb.ər.næk.əl/',
    languageOrigin: 'Latin: tabernaculum (tent, dwelling place)',
    literalMeaning: 'Sacred tent or dwelling place of God',
    shortDefinition: 'The noble, secure, immovable liturgical shrine in a Catholic church where the consecrated Eucharistic Hosts are reserved for Holy Communion to the sick and for silent adoration of the faithful.',
    detailedExplanation: `Echoing the Old Testament Tent of Meeting where the glory (Shekinah) of God dwelt among Israel, the Catholic tabernacle houses the true living Body of Jesus Christ under the Eucharistic species.

A continuously burning red Sanctuary Lamp beside the tabernacle signifies Christ's Real Presence within, inviting every visitor entering a Catholic church to genuflect on the right knee in loving adoration.`,
    catechismRef: 'CCC 1183, 1379',
    scripturalBasis: 'Exodus 25:8 ("And let them make me a sanctuary, that I may dwell in their midst"); John 1:14 ("dwelt [pitched his tent] among us"); Revelation 21:3',
    liturgicalContext: 'Located prominently in the sanctuary or Eucharistic chapel, marked by the sanctuary lamp and often draped with a conopaeum (veil).',
    category: 'Liturgy and Worship'
  },
  {
    id: 'term-sanctifying-grace',
    term: 'Sanctifying Grace',
    phonetic: '/ˈsæŋk.tɪ.faɪ.ɪŋ ɡreɪs/',
    languageOrigin: 'Latin: gratia sanctificans (grace that makes holy)',
    literalMeaning: 'Holiness-imparting divine life within the soul',
    shortDefinition: 'The habitual, permanent supernatural gift infused into the soul at Baptism—and restored in Confession—that heals human nature, makes us adopted children of God, and renders the soul a living temple of the Blessed Trinity.',
    detailedExplanation: `Unlike actual grace (temporary divine impulses helping us perform good actions or avoid sin), sanctifying grace is an abiding state of friendship and union with God.

To die in the state of sanctifying grace is to be assured of eternal salvation. Mortal sin tragically expels sanctifying grace from the soul, whereas the Sacrament of Penance restores it completely through the merits of Christ.`,
    catechismRef: 'CCC 1996–2005',
    scripturalBasis: 'Romans 5:5 ("God\'s love has been poured into our hearts through the Holy Spirit"); 1 Corinthians 3:16; 2 Peter 1:4',
    liturgicalContext: 'Infused at Holy Baptism, nourished in every worthy Holy Communion, and restored in the Sacrament of Reconciliation.',
    category: 'Spiritual Life'
  },
  {
    id: 'term-theosis',
    term: 'Theosis (Divinization)',
    phonetic: '/θiˈoʊ.sɪs/',
    languageOrigin: 'Greek: θέωσις (theōsis - becoming godlike, participation in divine life)',
    literalMeaning: 'Deification / Participation in the divine nature',
    shortDefinition: 'The transformative spiritual process by which, through grace and the sacraments, a Christian grows into ever deeper likeness and union with God, becoming by grace what Christ is by nature.',
    detailedExplanation: `Celebrated by both Eastern and Western Church Fathers—famously summed up by St. Athanasius: "God became man so that man might become god"—theosis never blurs the infinite distinction between Creator and creature.

Rather, through the indwelling of the Holy Spirit, prayer, virtue, and the Eucharist, the believer's intellect, will, and desires are progressively conformed to the image of Jesus Christ.`,
    catechismRef: 'CCC 460, 1988',
    scripturalBasis: '2 Peter 1:4 ("that through these you may become partakers of the divine nature"); 2 Corinthians 3:18; Galatians 2:20',
    liturgicalContext: 'Expressed at the Offertory of every Mass when the priest mixes water into wine: "By the mystery of this water and wine may we come to share in the divinity of Christ who humbled himself to share in our humanity."',
    category: 'Spiritual Life'
  },
  {
    id: 'term-examination-of-conscience',
    term: 'Examination of Conscience',
    phonetic: '/ɪɡˌzæm.ɪˈneɪ.ʃən əv ˈkɒn.ʃəns/',
    languageOrigin: 'Latin: examen conscientiae (weighing or testing of moral awareness)',
    literalMeaning: 'Prayerful weighing of one\'s soul before God',
    shortDefinition: 'A prayerful, honest reflection upon one\'s thoughts, words, actions, and omissions in the light of God\'s Commandments and the Gospel, practiced nightly and before the Sacrament of Reconciliation.',
    detailedExplanation: `Rooted in ancient monastic wisdom and refined by St. Ignatius of Loyola in his Daily Examen, this discipline begins with gratitude for God's blessings, asks the Holy Spirit for light, reviews the day honestly, expresses sorrow for sins, and resolves with grace to amend one's life.

Far from encouraging scrupulosity, a healthy examination of conscience deepens self-knowledge and opens the heart to God's tender mercy.`,
    catechismRef: 'CCC 1454, 1785',
    scripturalBasis: '1 Corinthians 11:28 ("Let a man examine himself"); Psalm 139:23–24 ("Search me, O God, and know my heart"); Lamentations 3:40',
    liturgicalContext: 'Practiced before Confession, at Night Prayer (Compline), and during the Penitential Act at the beginning of Mass.',
    category: 'Spiritual Life'
  },
  {
    id: 'term-metanoia',
    term: 'Metanoia',
    phonetic: '/ˌmɛt.əˈnɔɪ.ə/',
    languageOrigin: 'Greek: μετάνοια, from meta (change, beyond) + nous (mind, heart, spirit)',
    literalMeaning: 'A profound change of mind and heart',
    shortDefinition: 'Radical interior conversion—a decisive turning away from sin and selfishness toward God, accompanied by a transformed way of seeing, loving, and living according to the Gospel.',
    detailedExplanation: `The very first word of Jesus' public proclamation in Mark's Gospel is "Repent [metanoeite] and believe in the Gospel." Metanoia is not merely feeling regret over mistakes, nor is it a one-time emotional moment.

Catholic spirituality understands conversion as a lifelong pilgrimage of continual purification, humility, and deeper surrender to the grace of Christ.`,
    catechismRef: 'CCC 1427–1433',
    scripturalBasis: 'Mark 1:15; Romans 12:2 ("Be transformed by the renewal of your mind"); Joel 2:12–13 ("Return to me with all your heart")',
    liturgicalContext: 'Proclaimed on Ash Wednesday during the imposition of ashes and throughout the penitential season of Lent.',
    category: 'Spiritual Life'
  },
  {
    id: 'term-indulgence',
    term: 'Indulgence',
    phonetic: '/ɪnˈdʌl.dʒəns/',
    languageOrigin: 'Latin: indulgentia (kindness, tenderness, remission)',
    literalMeaning: 'Gracious remission of temporal penalty',
    shortDefinition: 'A remission before God of the temporal punishment due to sins whose guilt has already been forgiven, granted by the Church from the treasury of the merits of Christ and the saints under prescribed conditions.',
    detailedExplanation: `Every sin entails a double consequence: eternal guilt (forgiven through Confession and contrition) and unhealthy temporal attachment or disorder that must be healed either in this life or in Purgatory.

An indulgence—partial or plenary (full)—does not buy forgiveness for past or future sins. Rather, exercising the Power of the Keys given to Peter, the Church applies the infinite merits of Christ to aid the repentant Christian (or a soul in Purgatory) who fulfills the prescribed prayer or work with detachment from sin, Confession, Communion, and prayer for the Pope's intentions.`,
    catechismRef: 'CCC 1471–1479',
    scripturalBasis: 'Matthew 16:19 ("Whatever you loose on earth shall be loosed in heaven"); 2 Samuel 12:13–14; Colossians 1:24',
    liturgicalContext: 'Granted especially during Jubilee Holy Years, Divine Mercy Sunday, All Souls\' Day, Eucharistic Adoration, and devout recitation of the Rosary.',
    category: 'Spiritual Life'
  },
  {
    id: 'term-dark-night-of-the-soul',
    term: 'Dark Night of the Soul',
    phonetic: '/dɑːrk naɪt əv ðə soʊl/',
    languageOrigin: 'Spanish: La Noche Oscura del Alma (St. John of the Cross, 16th century)',
    literalMeaning: 'Purifying night of contemplative faith',
    shortDefinition: 'A classic stage of mystical purification described by St. John of the Cross in which God withdraws sensible consolations in prayer so the soul learns to love Him purely in naked faith, hope, and charity.',
    detailedExplanation: `Far from being a sign of God's abandonment or ordinary clinical depression, the Dark Night is an intense work of divine mercy. In the "Night of the Senses" and deeper "Night of the Spirit," God detaches the believer from subtle spiritual pride and dependence on emotional feelings.

Through faithful perseverance in dryness, the soul emerges purified, humble, and prepared for transforming union with God.`,
    catechismRef: 'CCC 2719, 2731',
    scripturalBasis: 'Psalm 42:2–3; Isaiah 50:10 ("Who walks in darkness and has no light, yet trusts in the name of the Lord"); Matthew 27:46',
    liturgicalContext: 'Meditated upon in Carmelite spirituality, Lenten retreats, and the Liturgy of Holy Saturday.',
    category: 'Spiritual Life'
  },
  {
    id: 'term-works-of-mercy',
    term: 'Works of Mercy',
    phonetic: '/wɜːrks əv ˈmɜːr.si/',
    languageOrigin: 'Latin: Opera Misericordiae (deeds of compassionate love)',
    literalMeaning: 'Charitable acts of mercy for body and soul',
    shortDefinition: 'The fourteen traditional charitable actions—seven Corporal Works caring for bodily needs and seven Spiritual Works caring for the soul—by which Christians serve Christ Himself in their neighbor.',
    detailedExplanation: `The seven Corporal Works of Mercy are: feed the hungry, give drink to the thirsty, clothe the naked, shelter the homeless, visit the sick, visit the imprisoned, and bury the dead.

The seven Spiritual Works of Mercy are: admonish the sinner, instruct the ignorant, counsel the doubtful, comfort the sorrowful, bear wrongs patiently, forgive all injuries, and pray for the living and the dead.`,
    catechismRef: 'CCC 2447',
    scripturalBasis: 'Matthew 25:31–46 ("As you did it to one of the least of these my brethren, you did it to me"); Tobit 1:16–17; James 2:15–17',
    liturgicalContext: 'Emphasized during Lenten almsgiving, the Solemnity of Christ the King, and the Church\'s social and charitable apostolates.',
    category: 'Spiritual Life'
  },
  {
    id: 'term-apostolic-succession',
    term: 'Apostolic Succession',
    phonetic: '/ˌæp.əˈstɒl.ɪk səkˈsɛʃ.ən/',
    languageOrigin: 'Greek: ἀπόστολος (apostolos - one sent forth) + Latin: successio (unbroken inheritance)',
    literalMeaning: 'Unbroken sacramental succession from the Apostles',
    shortDefinition: 'The uninterrupted historical and sacramental handing on of pastoral authority, teaching office, and priestly grace from the Twelve Apostles to the bishops of the Catholic Church through the laying on of hands.',
    detailedExplanation: `Because Christ willed His saving mission to endure until the end of the age, the Apostles appointed successors (episkopoi—bishops) to shepherd local churches and transmit the Deposit of Faith intact.

Through valid episcopal ordination in communion with the Bishop of Rome (successor of St. Peter), every Catholic bishop stands in an unbroken sacramental lineage reaching directly back to the Upper Room.`,
    catechismRef: 'CCC 77, 861–862, 1575–1576',
    scripturalBasis: '2 Timothy 1:6; 2 Timothy 2:2; Titus 1:5; Acts 1:20–26; Acts 14:23',
    liturgicalContext: 'Visibly enacted in the Rite of Ordination of a Bishop through the imposition of hands by the consecrating bishops.',
    category: 'Church Hierarchy and Canon Law'
  },
  {
    id: 'term-ex-cathedra',
    term: 'Ex Cathedra',
    phonetic: '/ɛks kəˈθiː.drə/',
    languageOrigin: 'Latin: ex (from) + cathedra (the official teaching chair/throne)',
    literalMeaning: 'From the Chair (of Saint Peter)',
    shortDefinition: 'The solemn, formal mode in which the Pope exercises his charism of papal infallibility—speaking as supreme pastor and teacher of all Christians to definitively define a doctrine concerning faith or morals to be held by the whole Church.',
    detailedExplanation: `Defined by the First Vatican Council in Pastor Aeternus (1870), papal infallibility does not mean the Pope is sinless (impeccable) or infallible in casual remarks, interviews, or non-doctrinal opinions.

It is a negative protective charism of the Holy Spirit safeguarding the Successor of Peter from teaching error solely when four strict conditions are met: he speaks in his official office as Supreme Pontiff, addresses the universal Church, treats a matter of faith or morals, and explicitly intends to define the teaching definitively.`,
    catechismRef: 'CCC 891',
    scripturalBasis: 'Matthew 16:18–19; Luke 22:31–32 ("I have prayed for you that your faith may not fail; and when you have turned again, strengthen your brethren"); John 21:15–17',
    liturgicalContext: 'Historic solemn proclamations such as the definitions of the Immaculate Conception (1854) and the Assumption of Mary (1950).',
    category: 'Church Hierarchy and Canon Law'
  },
  {
    id: 'term-ecumenical-council',
    term: 'Ecumenical Council',
    phonetic: '/ˌɛk.juːˈmɛn.ɪ.kəl ˈkaʊn.səl/',
    languageOrigin: 'Greek: οἰκουμένη (oikoumenē - the whole inhabited world) + Latin: concilium (assembly)',
    literalMeaning: 'Assembly of the bishops of the whole world',
    shortDefinition: 'A solemn universal gathering of the College of Bishops from across the world, convoked and confirmed by the Pope, exercising supreme and full authority over the universal Church to clarify doctrine and renew discipline.',
    detailedExplanation: `Modeled upon the Apostolic Council of Jerusalem (Acts 15), the Catholic Church recognizes twenty-one Ecumenical Councils across two millennia—from Nicaea I (325) and Chalcedon (451) through Trent (1545–1563), Vatican I (1869–1870), and Vatican II (1962–1965).

A council possesses ecumenical authority only when united with and ratified by the Roman Pontiff as head of the Episcopal College.`,
    catechismRef: 'CCC 884, 891',
    scripturalBasis: 'Acts 15:6–29 ("For it has seemed good to the Holy Spirit and to us..."); Matthew 18:18–20',
    liturgicalContext: 'Conciliar decrees shape the Church\'s Creeds, liturgical books, and pastoral mission across the globe.',
    category: 'Church Hierarchy and Canon Law'
  },
  {
    id: 'term-encyclical',
    term: 'Encyclical',
    phonetic: '/ɛnˈsɪk.lɪ.kəl/',
    languageOrigin: 'Greek: ἐγκύκλιος (enkyklios - circular, sent around to all)',
    literalMeaning: 'A circular pastoral letter',
    shortDefinition: 'An authoritative teaching letter issued by the Pope—traditionally titled after its first two Latin words—addressed to the bishops, clergy, and faithful of the Catholic Church (and often all people of good will) on matters of doctrine, morals, or social teaching.',
    detailedExplanation: `Exercising the Ordinary Universal Magisterium, papal encyclicals illuminate how timeless Gospel truths apply to contemporary spiritual, moral, and social questions—such as Rerum Novarum (social justice), Humanae Vitae (human life), Evangelium Vitae (sanctity of life), and Deus Caritas Est (Christian love).

Catholics receive papal encyclicals with religious submission of intellect and will (obsequium religiosum).`,
    catechismRef: 'CCC 892',
    scripturalBasis: 'Colossians 4:16 (apostolic letters circulated among the churches); 2 Thessalonians 2:15',
    liturgicalContext: 'Studied in diocesan catechesis, seminaries, homilies, and parish adult faith formation.',
    category: 'Church Hierarchy and Canon Law'
  },
  {
    id: 'term-imprimatur-nihil-obstat',
    term: 'Imprimatur & Nihil Obstat',
    phonetic: '/ˌɪm.prɪˈmɑː.tʊər & ˈniː.hɪl ˈɒb.stæt/',
    languageOrigin: 'Latin: imprimatur ("let it be printed") + nihil obstat ("nothing stands in the way")',
    literalMeaning: 'Official assurance of doctrinal soundness',
    shortDefinition: 'Ecclesiastical declarations granted by a diocesan bishop (Imprimatur) after review by an appointed theological censor (Nihil Obstat), certifying that a published book contains nothing contrary to Catholic faith or morals.',
    detailedExplanation: `Governed by Canons 823–830 of the Code of Canon Law, these marks are neither an endorsement of every personal opinion in a book nor a claim of infallibility.

Rather, they offer the faithful pastoral confidence that a Bible translation, catechism, prayer book, or theological work is free from doctrinal heresy and moral error.`,
    catechismRef: 'CCC 85, 890; CIC Canons 823–830',
    scripturalBasis: '1 Thessalonians 5:21 ("Test everything; hold fast what is good"); Titus 1:9',
    liturgicalContext: 'Printed on the copyright page of approved Catholic Bibles, liturgical missals, catechisms, and devotional manuals.',
    category: 'Church Hierarchy and Canon Law'
  },
  {
    id: 'term-sensus-fidei',
    term: 'Sensus Fidei',
    phonetic: '/ˈsɛn.sʊs ˈfiː.deɪ/',
    languageOrigin: 'Latin: sensus (sense, perception, instinct) + fidei (of the faith)',
    literalMeaning: 'The supernatural instinct of faith',
    shortDefinition: 'The supernatural spiritual instinct granted by the Holy Spirit to the baptized faithful—and collectively to the whole People of God (sensus fidelium)—enabling them to recognize, adhere to, and live authentic Catholic truth.',
    detailedExplanation: `Taught solemnly by the Second Vatican Council in Lumen Gentium (no. 12), the entire body of the faithful, anointed by the Holy Spirit, cannot err in matters of belief when showing universal agreement in faith and morals in communion with the Magisterium.

The sensus fidei is not a secular opinion poll of majorities; it operates authentically in believers who actively live in grace, prayer, sacramental life, and docility to the Church's shepherds.`,
    catechismRef: 'CCC 91–93',
    scripturalBasis: '1 John 2:20, 27 ("You have been anointed by the Holy One"); John 10:4–5 ("the sheep follow him, for they know his voice")',
    liturgicalContext: 'Witnessed throughout history in the faithful\'s deep devotion to dogmas such as the Theotokos, Real Presence, and Immaculate Conception.',
    category: 'Church Hierarchy and Canon Law'
  },
  {
    id: 'term-canon-law',
    term: 'Canon Law',
    phonetic: '/ˈkæn.ən lɔː/',
    languageOrigin: 'Greek: κανών (kanōn - measuring rod, rule, standard)',
    literalMeaning: 'The rule and legal ordering of Church life',
    shortDefinition: 'The body of ecclesiastical laws enacted by legitimate Church authority—codified in the 1983 Code of Canon Law for the Latin Church and the 1990 Code of Canons of the Eastern Churches—guiding the Church\'s governance, sacraments, rights, and pastoral mission.',
    detailedExplanation: `Far from cold legalism, Canon Law exists to protect the rights of the faithful, preserve the integrity of the sacraments, and foster orderly communion within the Body of Christ.

Its very final canon (Canon 1752) declares the supreme guiding principle of all ecclesiastical law: "the salvation of souls, which must always be the supreme law in the Church" (salus animarum suprema lex).`,
    catechismRef: 'CCC 87, 1311; CIC Canon 1752',
    scripturalBasis: '1 Corinthians 14:40 ("All things should be done decently and in order"); Matthew 16:19; Acts 15:28–29',
    liturgicalContext: 'Governs sacramental celebration, marriage tribunals, diocesan governance, and the obligations of clergy and laity.',
    category: 'Church Hierarchy and Canon Law'
  }
];

export function getTermOfTheDay(): CatholicTerm {
  // Use today's calendar date to consistently pick term
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  const index = Math.abs(dayOfYear) % CATHOLIC_TERMS_DATABASE.length;
  return CATHOLIC_TERMS_DATABASE[index] || CATHOLIC_TERMS_DATABASE[0];
}
