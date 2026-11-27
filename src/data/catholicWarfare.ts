export interface ArmorPiece {
  id: string;
  order: number;
  name: string;
  latinName: string;
  scriptureRef: string;
  scriptureVerse: string;
  catechismRef: string;
  theologicalMeaning: string;
  tacticalDefense: string;
  putOnPrayer: string;
}

export interface WarfarePrayer {
  id: string;
  title: string;
  latinTitle?: string;
  origin: string;
  category: 'Archangel' | 'Marian' | 'Benedictine' | 'Liturgical' | 'Celtic';
  magisterialNote: string;
  englishText: string;
  latinText?: string;
}

export interface ViceVirtueCombat {
  id: string;
  vice: string;
  latinVice: string;
  virtue: string;
  latinVirtue: string;
  enemyTactic: string;
  catholicRemedy: string;
  saintWitness: string;
  scriptureSwordRef: string;
  scriptureSwordText: string;
}

export interface IgnatianRule {
  ruleNumber: string;
  title: string;
  summary: string;
  practicalAction: string;
}

export interface DemonicActivityLevel {
  type: string;
  category: 'Ordinary' | 'Extraordinary';
  description: string;
  catholicRemedy: string;
}

export interface SpiritualWeapon {
  id: string;
  rank: string;
  tier: 'Sacraments' | 'Prayer & Asceticism' | 'Sacramentals';
  name: string;
  latinName: string;
  catechismRef: string;
  efficacy: string;
  howToUse: string;
  saintQuote: string;
  saintAuthor: string;
}

export const ARMOR_OF_GOD_PIECES: ArmorPiece[] = [
  {
    id: 'belt-of-truth',
    order: 1,
    name: 'The Belt of Truth',
    latinName: 'Cingulum Veritatis',
    scriptureRef: 'Ephesians 6:14a',
    scriptureVerse: 'Stand therefore, having girded your loins with truth.',
    catechismRef: 'CCC 215, 2465–2468',
    theologicalMeaning:
      'In Roman armor, the leather cingulum gathered the tunic so the soldier could move freely and held the breastplate and scabbard in place. In the spiritual life, Truth—Christ Himself (John 14:6) and the integrity of Catholic doctrine—binds together every other virtue and exposes the "father of lies" (John 8:44).',
    tacticalDefense:
      'Reject half-truths, self-deception, rationalized sins, and ideological errors. Anchor your intellect daily in Sacred Scripture, the Catechism, and honest examination of conscience.',
    putOnPrayer:
      'Lord Jesus Christ, Way, Truth, and Life, gird my mind and heart with Your unchanging truth today. Expose every illusion and lie of the adversary, and grant me complete honesty before You in thought, word, and deed. Amen.',
  },
  {
    id: 'breastplate-of-righteousness',
    order: 2,
    name: 'The Breastplate of Righteousness',
    latinName: 'Lorica Iustitiae',
    scriptureRef: 'Ephesians 6:14b',
    scriptureVerse: 'And having put on the breastplate of righteousness.',
    catechismRef: 'CCC 1987–1995, 1999',
    theologicalMeaning:
      'The breastplate shields the heart and vital organs from mortal blows. Sanctifying grace—the righteousness of Christ infused at Baptism and restored in Confession—guards the soul from mortal sin and keeps our conscience unstained.',
    tacticalDefense:
      'Guard the state of grace above all earthly treasures. Avoid the near occasions of sin and repair any grave wound immediately through Sacramental Confession.',
    putOnPrayer:
      'O Sacred Heart of Jesus, clothe my soul in the breastplate of Your sanctifying grace. Guard my heart from every corrupt desire, heal my past wounds, and keep me steadfast in holiness today. Amen.',
  },
  {
    id: 'shoes-of-peace',
    order: 3,
    name: 'Shoes of the Gospel of Peace',
    latinName: 'Calceamenta Evangelii Pacis',
    scriptureRef: 'Ephesians 6:15',
    scriptureVerse: 'And having shod your feet with the equipment of the gospel of peace.',
    catechismRef: 'CCC 2304–2305',
    theologicalMeaning:
      'Roman military sandals (caligae) were studded with nails for firm footing on treacherous slopes. The peace of Christ gives the soul stability amid spiritual turbulence, preventing the panic, bitterness, and division the enemy seeks to provoke.',
    tacticalDefense:
      'Refuse interior agitation, anxiety, and quarrels. Walk swiftly to forgive, sow reconciliation in your home, and bring the quiet steadiness of the Gospel wherever you are sent.',
    putOnPrayer:
      'Prince of Peace, plant my feet firmly in Your providence today. Keep me calm in trial, swift to reconcile, and unshaken by fear, resentment, or confusion. Amen.',
  },
  {
    id: 'shield-of-faith',
    order: 4,
    name: 'The Shield of Faith',
    latinName: 'Scutum Fidei',
    scriptureRef: 'Ephesians 6:16',
    scriptureVerse:
      'Besides all these, taking the shield of faith, with which you can quench all the flaming darts of the evil one.',
    catechismRef: 'CCC 150–165, 1814',
    theologicalMeaning:
      'The Roman scutum was a large rectangular shield covered in wet leather to extinguish incendiary arrows. Living Catholic faith—trusting God’s goodness and promises even in darkness—extinguishes fiery darts of blasphemy, despair, suspicion, and sudden temptation.',
    tacticalDefense:
      'Do not debate intrusive temptations or despairing accusations. Immediately raise an act of faith—"Jesus, I trust in You"—and stand shoulder-to-shoulder with the communion of the Church.',
    putOnPrayer:
      'Almighty Father, I raise the shield of the Catholic Faith today. Extinguish every fiery dart of doubt, despair, impure suggestion, and fear; I trust wholly in Your mercy and sovereign power. Amen.',
  },
  {
    id: 'helmet-of-salvation',
    order: 5,
    name: 'The Helmet of Salvation',
    latinName: 'Galea Salutis',
    scriptureRef: 'Ephesians 6:17a',
    scriptureVerse: 'And take the helmet of salvation.',
    catechismRef: 'CCC 1817–1821, 1023–1025',
    theologicalMeaning:
      'The helmet protects the mind—the primary battlefield of spiritual warfare. Anchored in Christian hope ("the hope of salvation," 1 Thess 5:8), it shields our memory and imagination against discouragement, scrupulosity, and cynicism.',
    tacticalDefense:
      'Take every stray thought captive to Christ (2 Cor 10:5). Remember your baptismal dignity as a child of God and fix your horizon on eternal life rather than passing defeats.',
    putOnPrayer:
      'Lord my Savior, crown my mind with the helmet of salvation and Christian hope. Protect my thoughts, memory, and imagination from discouragement and darkness, and lift my eyes to Your eternal Kingdom. Amen.',
  },
  {
    id: 'sword-of-the-spirit',
    order: 6,
    name: 'The Sword of the Spirit',
    latinName: 'Gladius Spiritus',
    scriptureRef: 'Ephesians 6:17b',
    scriptureVerse: 'And the sword of the Spirit, which is the word of God.',
    catechismRef: 'CCC 101–104, 131–133',
    theologicalMeaning:
      'The gladius is the lone offensive weapon listed by St. Paul. In the desert, Christ Himself defeated Satan’s threefold temptation solely with spoken Sacred Scripture ("It is written...", Matt 4:4, 7, 10). The Desert Fathers called this practice Antirrhetikos—answering every temptation with a concise verse of Scripture.',
    tacticalDefense:
      'Memorize short verses targeting your recurring struggles. Speak the Word of God aloud calmly when tempted, rather than arguing with the temptation on its own terms.',
    putOnPrayer:
      'Come, Holy Spirit, place the living Word of God upon my lips and in my heart. Grant me the wisdom to wield Sacred Scripture as Christ did in the wilderness, cutting through every snare of sin. Amen.',
  },
  {
    id: 'vigilant-prayer',
    order: 7,
    name: 'Constant, Vigilant Prayer',
    latinName: 'Oratio et Vigilia',
    scriptureRef: 'Ephesians 6:18',
    scriptureVerse:
      'Pray at all times in the Spirit, with all prayer and supplication. To that end keep alert with all perseverance, making supplication for all the saints.',
    catechismRef: 'CCC 2725–2745',
    theologicalMeaning:
      'Armor cannot fight on its own; prayer is the breath and lifeblood of the spiritual soldier. The Catechism explicitly teaches that "prayer is a battle" (CCC 2725)—against ourselves and against the wiles of the tempter who seeks to draw us away from union with God.',
    tacticalDefense:
      'Keep fixed anchors of daily prayer—Morning Offering, Angelus, Rosary, and Nightly Examen—and weave brief arrow prayers ("Lord Jesus Christ, have mercy on me") throughout the day.',
    putOnPrayer:
      'Eternal Father, keep me watchful in prayer at all times. Unite my weak petitions with the intercession of the Blessed Virgin Mary, St. Michael, and all the Saints for the protection of the Church and my family. Amen.',
  },
];

export const WARFARE_PRAYERS: WarfarePrayer[] = [
  {
    id: 'st-michael-prayer',
    title: 'Prayer to St. Michael the Archangel',
    latinTitle: 'Oratio ad Sanctum Michaelem Archangelum',
    origin: 'Composed by Pope Leo XIII (1886)',
    category: 'Archangel',
    magisterialNote:
      'Approved universal prayer of the Roman Church for all the faithful; traditionally prayed after Low Mass and recommended daily by Pope St. John Paul II (Regina Caeli, April 24, 1994).',
    englishText: `Saint Michael the Archangel, defend us in battle.
Be our protection against the wickedness and snares of the devil.
May God rebuke him, we humbly pray;
and do thou, O Prince of the heavenly host,
by the power of God, cast into hell Satan
and all the evil spirits,
who prowl about the world seeking the ruin of souls.
Amen.`,
    latinText: `Sancte Michaël Archangele, defende nos in proelio;
contra nequitiam et insidias diaboli esto praesidium.
Imperet illi Deus, supplices deprecamur:
tuque, Princeps militiae caelestis,
Satanam aliosque spiritus malignos,
qui ad perditionem animarum pervagantur in mundo,
divina virtute, in infernum detrude.
Amen.`,
  },
  {
    id: 'st-benedict-medal',
    title: 'Prayer of the Medal of St. Benedict',
    latinTitle: 'Crux Sacra Sit Mihi Lux',
    origin: 'Benedictine Monastic Tradition (Approved by Pope Benedict XIV, 1742)',
    category: 'Benedictine',
    magisterialNote:
      'A classic Catholic prayer of renunciation and defense inscribed upon the Medal of St. Benedict; suitable for daily lay recitation in moments of temptation or spiritual attack.',
    englishText: `May the Holy Cross be my light;
may the dragon never be my guide.
Begone, Satan!
Never tempt me with your vanities!
What you offer me is evil;
drink the poison yourself!

In the Name of the Father, and of the Son, and of the Holy Spirit. Amen.`,
    latinText: `Crux Sacra sit mihi lux!
Non draco sit mihi dux!
Vade retro, Satana!
Numquam suade mihi vana!
Sunt mala quae libas;
ipse venena bibas!

In nomine Patris, et Filii, et Spiritus Sancti. Amen.`,
  },
  {
    id: 'august-queen-of-heaven',
    title: 'August Queen of Heaven',
    latinTitle: 'Augusta Regina Caelorum',
    origin: 'Given to Venerable Fr. Louis-Édouard Cestac (1864); Indulgenced by Pope St. Pius X (1908)',
    category: 'Marian',
    magisterialNote:
      'Approved by Bishop Lacroix of Bayonne and enriched with indulgences by Pope St. Pius X. Invokes the Blessed Virgin Mary, the Woman of Genesis 3:15 who crushes the serpent’s head.',
    englishText: `August Queen of Heaven, Sovereign Mistress of the Angels,
thou who from the beginning hast received from God the power and mission to crush the head of Satan,
we humbly beseech thee to send thy holy Legions,
that, under thy command and by thy power,
they may pursue the evil spirits, encounter them on every side,
resist their bold attacks, and drive them hence into the abyss of eternal woe.
Who is like unto God?

O good and tender Mother, thou shalt always be our love and our hope!
O Divine Mother, send thy Holy Angels to defend me and to drive far away from me the cruel enemy.
Holy Angels and Archangels, defend us, guard us.
Amen.`,
    latinText: `Augusta Regina caelorum, superna Domina Angelorum,
quae ab initio a Deo potestatem et missionem accepisti caput Satanae conterendi,
humiliter te deprecamur ut mittas sanctas legiones tuas,
ut sub tuo imperio et tua potestate daemones persequantur,
ubique eos impugnent, eorum audaciam comprimant,
et in abyssum detrudant.
Quis ut Deus?

O bona et tenera Mater, tu semper eris amor noster et spes nostra.
O Mater Dei, mitte sanctos Angelos tuos ut me defendant
et crudelissimum inimicum procul a me repellant.
Sancti Angeli et Archangeli, defendite nos, custodite nos.
Amen.`,
  },
  {
    id: 'st-patricks-breastplate',
    title: 'St. Patrick’s Breastplate (Lorica — Core Shield)',
    latinTitle: 'Lorica Sancti Patricii',
    origin: 'Attributed to St. Patrick of Ireland (5th Century)',
    category: 'Celtic',
    magisterialNote:
      'One of the earliest Christian loricae ("breastplates"), invoking the Most Holy Trinity and the Presence of Christ to encircle body, mind, and senses against every spiritual snare.',
    englishText: `I arise today through a mighty strength,
the invocation of the Trinity,
through belief in the Threeness,
through confession of the Oneness
of the Creator of creation.

Christ with me, Christ before me, Christ behind me,
Christ in me, Christ beneath me, Christ above me,
Christ on my right, Christ on my left,
Christ when I lie down, Christ when I sit down, Christ when I arise,
Christ in the heart of every man who thinks of me,
Christ in the mouth of everyone who speaks of me,
Christ in every eye that sees me,
Christ in every ear that hears me.

Salvation is of the Lord. Salvation is of the Lord.
Salvation is of Christ.
May Thy salvation, O Lord, be ever with us. Amen.`,
    latinText: `Christus mecum, Christus ante me, Christus post me,
Christus in me, Christus infra me, Christus supra me,
Christus ad dexteram meam, Christus ad sinistram meam,
Christus ubi cubo, Christus ubi sedeo, Christus ubi surgo.
Domini est salus, Christi est salus;
salus tua, Domine, sit semper nobiscum. Amen.`,
  },
  {
    id: 'brief-of-st-anthony',
    title: 'The Brief of St. Anthony & Precious Blood Sealing',
    latinTitle: 'Ecce Crucem Domini',
    origin: 'St. Anthony of Padua (13th Century) & Roman Liturgical Tradition',
    category: 'Liturgical',
    magisterialNote:
      'Inscribed by Pope Sixtus V on the obelisk in St. Peter’s Square, Rome. A brief, potent Scriptural proclamation of Christ’s victory on Calvary.',
    englishText: `Behold the Cross of the Lord!
Be gone, all evil powers!
The Lion of the tribe of Judah,
the Root of David, has conquered! Alleluia!

Lord Jesus Christ, cover me, my family, my home, and my mind with Your Most Precious Blood shed upon the Cross. Place a hedge of protection around us through the intercession of the Immaculate Virgin Mary, St. Joseph Terror of Demons, and our Guardian Angels. Amen.`,
    latinText: `Ecce Crucem Domini!
Fugite, partes adversae!
Vicit Leo de tribu Iuda,
Radix David! Alleluia!`,
  },
  {
    id: 'prayer-against-every-evil',
    title: 'Prayer Against Every Evil & for Interior Peace',
    latinTitle: 'Oratio Contra Omne Malum',
    origin: 'Traditional Catholic Deliverance Manual (Precatory Lay Form)',
    category: 'Liturgical',
    magisterialNote:
      'A purely precatory prayer (addressing God directly rather than commanding demons directly), in full harmony with the 1985 Letter of the Congregation for the Doctrine of the Faith (Inde ab aliquot annis).',
    englishText: `Spirit of our God, Father, Son, and Holy Spirit, Most Holy Trinity, Immaculate Virgin Mary, Angels, Archangels, and Saints of Heaven, descend upon me.
Please purify me, Lord, mold me, fill me with Yourself, and use me.
Banish all the forces of evil from me, destroy them, vanquish them, so that I can be healthy and do good deeds.
Banish from me all spells, witchcraft, dark snares, curses, envy, jealousy, and every diabolical infestation, oppression, and deception—everything that is evil and sinful, and every physical, mental, moral, and spiritual ailment.

Lord Jesus Christ, by the power of Your Holy Cross and Resurrection, rebuke every spirit of fear, division, impurity, and despair, and fill this home with Your peace, humility, and burning charity. Through Christ our Lord. Amen.`,
  },
];

export const SEVEN_DEADLY_SINS_COMBAT: ViceVirtueCombat[] = [
  {
    id: 'pride',
    vice: 'Pride',
    latinVice: 'Superbia',
    virtue: 'Humility',
    latinVirtue: 'Humilitas',
    enemyTactic:
      'The root of all sin (Sir 10:13). The adversary whispers that you do not need God, that your gifts belong to yourself, or conversely traps you in wounded vanity and hypersensitivity to criticism.',
    catholicRemedy:
      'Pray the Litany of Humility, accept hidden humiliations without self-defense, thank God immediately for every success, and confess sins plainly without excuses.',
    saintWitness:
      'St. Anthony of the Desert saw the world covered with snares and cried out, "Who can pass through these?" A voice answered: "Humility alone."',
    scriptureSwordRef: 'James 4:6–7',
    scriptureSwordText:
      'God opposes the proud, but gives grace to the humble. Submit yourselves therefore to God. Resist the devil and he will flee from you.',
  },
  {
    id: 'greed',
    vice: 'Greed (Avarice)',
    latinVice: 'Avaritia',
    virtue: 'Generosity',
    latinVirtue: 'Liberalitas',
    enemyTactic:
      'Stirs anxious hoarding and convinces the heart that security comes from possessions, status, or control rather than Divine Providence.',
    catholicRemedy:
      'Practice secret almsgiving that actually costs you something, simplify possessions deliberately, and tithe joyfully to the Church and the poor.',
    saintWitness:
      'St. John Chrysostom: "Not to share our own wealth with the poor is theft from the poor and deprivation of their means of life."',
    scriptureSwordRef: 'Matthew 6:24',
    scriptureSwordText:
      'No one can serve two masters… You cannot serve God and mammon.',
  },
  {
    id: 'lust',
    vice: 'Lust',
    latinVice: 'Luxuria',
    virtue: 'Chastity',
    latinVirtue: 'Castitas',
    enemyTactic:
      'Blinds the intellect, isolates the soul in shame, and uses small compromises of curiosity, idleness, and unguarded eyes to break down willpower.',
    catholicRemedy:
      'Flee immediately rather than debating (1 Cor 6:18); practice strict custody of the eyes and digital devices, fast bodily, pray the Rosary daily, and run to St. Joseph and the Immaculate Heart.',
    saintWitness:
      'St. Philip Neri: "In the war of the flesh, the cowards win—those who flee at the very first spark."',
    scriptureSwordRef: 'Matthew 5:8',
    scriptureSwordText:
      'Blessed are the pure in heart, for they shall see God.',
  },
  {
    id: 'anger',
    vice: 'Wrath (Anger)',
    latinVice: 'Ira',
    virtue: 'Meekness & Patience',
    latinVirtue: 'Patientia et Mansuetudo',
    enemyTactic:
      'Disguises bitterness, resentment, and vengeance as "righteous indignation," fracturing charity in families and parishes while robbing the soul of prayer.',
    catholicRemedy:
      'Never speak or write in heat; pause to pray a Hail Mary for the person who provoked you, pardon injuries quickly before sundown, and imitate Christ silent before Pilate.',
    saintWitness:
      'St. Francis de Sales: "I have never made a covenant with my tongue in anger without regretting it afterward."',
    scriptureSwordRef: 'Ephesians 4:26–27',
    scriptureSwordText:
      'Do not let the sun go down on your anger, and give no opportunity to the devil.',
  },
  {
    id: 'gluttony',
    vice: 'Gluttony',
    latinVice: 'Gula',
    virtue: 'Temperance',
    latinVirtue: 'Temperantia',
    enemyTactic:
      'Dulls spiritual vigilance through disordered comfort, excess in food, drink, or constant media consumption, training the will to say "yes" to every impulse.',
    catholicRemedy:
      'Restore Friday penance and regular fasting, bless every meal gratefully, leave a small portion uneaten for the Holy Souls, and schedule tech-free silence.',
    saintWitness:
      'St. John Climacus: "He who masters his stomach weakens all other passions at their root."',
    scriptureSwordRef: '1 Corinthians 9:27',
    scriptureSwordText:
      'I pommel my body and subdue it, lest after preaching to others I myself should be disqualified.',
  },
  {
    id: 'envy',
    vice: 'Envy',
    latinVice: 'Invidia',
    virtue: 'Brotherly Charity',
    latinVirtue: 'Caritas Fraterna',
    enemyTactic:
      'Poisons the soul with sadness at another’s good—the exact sin by which "death entered the world" (Wis 2:24)—breeding gossip, detraction, and rivalry.',
    catholicRemedy:
      'Intentionally praise and bless the person you envy; pray daily for God to multiply their graces and rejoice that their gifts enrich the one Mystical Body of Christ.',
    saintWitness:
      'St. Thomas Aquinas teaches that charity rejoices in the neighbor’s good as one’s own, because we are members of one another in Christ.',
    scriptureSwordRef: '1 Corinthians 13:4',
    scriptureSwordText:
      'Love is patient and kind; love is not jealous or boastful.',
  },
  {
    id: 'sloth',
    vice: 'Sloth (Acedia)',
    latinVice: 'Acedia',
    virtue: 'Diligence & Zeal',
    latinVirtue: 'Industria et Zelus',
    enemyTactic:
      'Called the "noonday devil" (Ps 91:6) by the Desert Fathers—spiritual torpor, restless boredom with prayer, procrastination of duty, and quiet sorrow over the effort holiness demands.',
    catholicRemedy:
      'Keep a concrete daily Rule of Life, begin prayer at the exact appointed minute regardless of feelings, embrace small daily duties with love, and never cut prayer short in dryness.',
    saintWitness:
      'St. Ignatius of Loyola: "In time of desolation, insist more upon prayer, meditation, and some suitable way of doing penance."',
    scriptureSwordRef: 'Romans 12:11–12',
    scriptureSwordText:
      'Never flag in zeal, be aglow with the Spirit, serve the Lord. Rejoice in your hope, be patient in tribulation, be constant in prayer.',
  },
];

export const IGNATIAN_DISCERNMENT_RULES: IgnatianRule[] = [
  {
    ruleNumber: 'Rules 1–2',
    title: 'How the Two Spirits Act Depending on Your Direction',
    summary:
      'In souls moving from sin to deeper sin, the enemy offers apparent pleasures and dulls the conscience, while the Good Spirit stings the conscience with salutary remorse. In souls striving to grow in grace, the opposite occurs: the enemy bites, saddens, and raises false obstacles, whereas the Good Spirit gives courage, strength, tears of love, and peace.',
    practicalAction:
      'Ask first: "Am I actively trying to serve God today?" If yes, sudden anxiety, harsh self-condemnation, and despairing obstacles do not come from God.',
  },
  {
    ruleNumber: 'Rule 5',
    title: 'Never Make a Change in Time of Desolation',
    summary:
      'When your soul feels dry, heavy, anxious, or tempted to abandon a good resolution, remain firm and constant in the decisions made during prior consolation. In consolation the Good Spirit leads; in desolation the bad spirit counsels.',
    practicalAction:
      'Hold the line on your daily prayers, vocation, and charitable commitments during dark seasons. Defer major decisions until interior peace returns.',
  },
  {
    ruleNumber: 'Rule 6',
    title: 'Act Directly Against the Desolation (Agere Contra)',
    summary:
      'Although we must never change our resolutions in desolation, we should intensify our counter-offensive: pray slightly longer, examine our conscience honestly, and perform a small act of penance or charity.',
    practicalAction:
      'If temptation urges you to skip your Rosary or Mass, stay five minutes longer before the Tabernacle instead.',
  },
  {
    ruleNumber: 'Rules 7–9',
    title: 'Remember Consolation Will Return & Know Why Desolation Comes',
    summary:
      'St. Ignatius notes three reasons God permits desolation: (1) our own tepidity or negligence in prayer, (2) to test our fidelity when we receive no sensible reward, and (3) to teach us humbly that spiritual consolation is pure gift from God, never our private possession.',
    practicalAction:
      'Endure dryness with patience, trusting that you always possess sufficient grace to resist every temptation (2 Cor 12:9).',
  },
  {
    ruleNumber: 'Rules 12–14',
    title: 'Three Classic Tactics of the Enemy',
    summary:
      'The enemy behaves like (1) a bully who turns cowardly the instant you stand firm in Christ, (2) a seducer who demands secrecy—losing power as soon as temptations are exposed to a confessor or spiritual director, and (3) a commander probing for the single weakest point in our wall.',
    practicalAction:
      'Bring hidden temptations promptly into the light of Confession, identify your predominant fault, and fortify that exact gate daily.',
  },
];

export const DEMONIC_ACTIVITY_LEVELS: DemonicActivityLevel[] = [
  {
    type: 'Temptation',
    category: 'Ordinary',
    description:
      'The ordinary, universal combat experienced by every human being—including Christ Himself in the desert. An external suggestion toward sin that cannot force the free will.',
    catholicRemedy:
      'Daily prayer, custody of the senses, the Sacraments, invoking the Holy Name of Jesus, and immediate refusal without dialogue.',
  },
  {
    type: 'Infestation',
    category: 'Extraordinary',
    description:
      'Rare diabolical disturbance directed toward a place, home, or material object rather than directly at a person’s body.',
    catholicRemedy:
      'Remove any occult or superstitious items, have a Catholic priest bless the house with Holy Water and blessed salt, enthrone the Sacred Heart, and pray the Rosary together in the home.',
  },
  {
    type: 'Oppression (Vexation)',
    category: 'Extraordinary',
    description:
      'Rare external physical, relational, or circumstantial attacks permitted by God for the testing and sanctification of a soul (as seen in Job, St. John Vianney, and St. Padre Pio).',
    catholicRemedy:
      'Perseverance in grace, frequent Confession and Eucharist, spiritual direction with a prudent priest, and serene trust in Divine Providence.',
  },
  {
    type: 'Obsession',
    category: 'Extraordinary',
    description:
      'Persistent, sudden, irrational attacks on the mind and imagination—violent, blasphemous, or despairing thoughts—occurring without consent of the will.',
    catholicRemedy:
      'Careful discernment with both a sound Catholic priest and competent medical/psychological care (never assuming demonic origin without ruling out natural causes), paired with calm detachment and Sacramental life.',
  },
  {
    type: 'Possession',
    category: 'Extraordinary',
    description:
      'The rarest extraordinary state in which an evil spirit temporarily exercises control over a person’s body (never the immortal soul or free will).',
    catholicRemedy:
      'Strictly governed by Canon 1172 and CCC 1673: requires thorough medical, psychiatric, and ecclesiastical evaluation and may only be addressed by the diocesan Bishop or his expressly appointed priest-exorcist.',
  },
];

export const SPIRITUAL_ARSENAL: SpiritualWeapon[] = [
  {
    id: 'holy-eucharist',
    rank: 'I',
    tier: 'Sacraments',
    name: 'The Holy Sacrifice of the Mass & Eucharist',
    latinName: 'Sanctissimum Eucharistiae Sacramentum',
    catechismRef: 'CCC 1324, 1394–1395',
    efficacy:
      'The supreme weapon of Catholic spiritual warfare. Worthy Holy Communion unites the soul bodily and spiritually with the Risen Conqueror of sin and death, wiping away venial sins and strengthening the soul against future mortal sin.',
    howToUse:
      'Participate devoutly in Sunday Mass and, when possible, weekday Mass; spend quiet minutes in Eucharistic Adoration before the Tabernacle.',
    saintQuote: 'When we approach the Blessed Sacrament, the demons flee as from a lion breathing fire.',
    saintAuthor: 'St. John Chrysostom',
  },
  {
    id: 'sacramental-confession',
    rank: 'II',
    tier: 'Sacraments',
    name: 'Sacramental Confession (Penance)',
    latinName: 'Sacramentum Paenitentiae',
    catechismRef: 'CCC 1422–1470',
    efficacy:
      'Veteran Roman exorcists consistently testify that a single sincere, contrite Confession is more powerful than an exorcism: it shatters the enemy’s legal foothold of sin and floods the soul with restorative grace.',
    howToUse:
      'Practice a nightly Examination of Conscience and go to Confession regularly (monthly or bi-weekly, and immediately if burdened by grave sin).',
    saintQuote: 'Confession is stronger than an exorcism, because it directly takes the soul away from Satan and returns it to God.',
    saintAuthor: 'Fr. Gabriele Amorth (Chief Exorcist of Rome, 1986–2016)',
  },
  {
    id: 'holy-rosary',
    rank: 'III',
    tier: 'Prayer & Asceticism',
    name: 'The Most Holy Rosary',
    latinName: 'Sanctissimum Rosarium',
    catechismRef: 'CCC 971, 2678, 2708',
    efficacy:
      'By meditating on the Mysteries of Christ with His Immaculate Mother, the Rosary humbles the pride of Satan—who trembles far more before the humility of Mary than before angelic power.',
    howToUse:
      'Pray five decades daily with calm meditation on each Mystery; keep a blessed rosary in your pocket or beside your bed.',
    saintQuote: 'Love the Madonna and pray the Rosary, for her Rosary is the weapon against the evils of the world today.',
    saintAuthor: 'St. Pio of Pietrelcina (Padre Pio)',
  },
  {
    id: 'fasting-almsgiving',
    rank: 'IV',
    tier: 'Prayer & Asceticism',
    name: 'Fasting, Penance & Almsgiving',
    latinName: 'Ieiunium et Eleemosyna',
    catechismRef: 'CCC 1434–1438, 2043',
    efficacy:
      'Our Lord Himself declared of stubborn spiritual strongholds: "This kind cannot be driven out by anything but prayer and fasting" (Mark 9:29). Fasting trains the will to command bodily appetites rather than obey them.',
    howToUse:
      'Observe Friday penance faithfully (abstinence or sacrifice), fast prudently according to your health, and pair every fast with secret charity to the poor.',
    saintQuote: 'Prayer is good, but with fasting and almsgiving it becomes winged and reaches the throne of God.',
    saintAuthor: 'St. Augustine of Hippo',
  },
  {
    id: 'holy-water-salt',
    rank: 'V',
    tier: 'Sacramentals',
    name: 'Holy Water, Exorcised Salt & House Blessings',
    latinName: 'Aqua Benedicta et Sal Exorcizatum',
    catechismRef: 'CCC 1667–1672',
    efficacy:
      'Sacramentals do not operate as magic charms; their power flows from the intercessory prayer of the Church and the faith and state of grace of the believer. Holy Water recalls Baptism and drives away spiritual defilement.',
    howToUse:
      'Keep a small holy water font near your doorway, bless yourself and your bedroom before sleep, and invite a priest to bless your home (especially at Epiphany).',
    saintQuote: 'From long experience I have learned that there is nothing like Holy Water to put devils to flight and prevent them from coming back again.',
    saintAuthor: 'St. Teresa of Avila (Autobiography, Ch. 31)',
  },
  {
    id: 'st-benedict-scapular',
    rank: 'VI',
    tier: 'Sacramentals',
    name: 'Medal of St. Benedict & Brown Scapular',
    latinName: 'Numisma S. Benedicti et Scapulare',
    catechismRef: 'CCC 1670–1674',
    efficacy:
      'Worn devoutly in faith and obedience to Christ, the Medal of St. Benedict and the Brown Scapular of Our Lady of Mount Carmel serve as continual silent prayers of consecration and shields against temptation.',
    howToUse:
      'Have them properly blessed (and be enrolled in the Brown Scapular) by a Catholic priest; wear them as reminders to live chastely and prayerfully every hour.',
    saintQuote: 'The Cross of Christ is the invincible trophy over the powers of darkness.',
    saintAuthor: 'St. Cyril of Jerusalem',
  },
];
