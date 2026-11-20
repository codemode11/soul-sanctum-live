import { CatholicPrayer } from '../types';

export const PRAYERS_PART_1_CORE_AND_MARIAN: CatholicPrayer[] = [
  {
    id: 'prayer-before-a-crucifix',
    title: 'Prayer Before a Crucifix',
    latinTitle: 'En Ego, O Bone et Dulcissime Iesu',
    category: 'Eucharistic and Adoration',
    englishText: `Look down upon me, good and gentle Jesus, while before Thy face I humbly kneel, and with burning soul pray and beseech Thee to fix deep in my heart lively sentiments of faith, hope, and charity, true contrition for my sins, and a firm purpose of amendment; while I contemplate with great love and tender pity Thy five wounds, pondering over them within me, and calling to mind the words which David Thy prophet said of Thee, my Jesus: “They have pierced My hands and My feet; they have numbered all My bones.” Amen.`,
    latinText: `En ego, o bone et dulcíssime Iesu, ante conspéctum tuum génibus me provólvo, ac máximo ánimi ardóre te oro atque obtéstor, ut meum in cor vívidos fídei, spei et caritátis sensus, atque veram peccatórum meórum paeniténtiam, éaque emendándi firmíssimam voluntátem velis imprímere; dum magno ánimi afféctu et dolóre tua quinque vúlnera mecum ipse consídero ac mente contémplor, illud prae óculis habens, quod iam in ore ponébat tuo David prophéta de te, o bone Iesu: “Fodérunt manus meas et pedes meos; dinumeravérunt ómnia ossa mea.” Amen.`,
    scripturalOrTraditionOrigin: 'Psalm 22:17–18; traditional Roman post-Communion prayer enriched with indulgences by Popes Clement VIII, Pius IX, and Pius XI.',
    historicalContext: 'Known by its Latin opening “En ego” (“Behold, I”), this cherished prayer invites the communicant to unite the Eucharist directly with Christ’s Passion on Calvary. After receiving the Body and Blood of Christ, the believer kneels before a crucifix, meditating on the Five Wounds and begging for the three theological virtues and genuine repentance.',
    usageTime: 'Immediately after receiving Holy Communion, especially on Fridays of Lent',
    indulgence: {
      type: 'Plenary or Partial',
      grantReference: 'Enchiridion Indulgentiarum (4th ed.), Grant #8 §1',
      summary: 'A Plenary Indulgence is granted to the faithful who recite this prayer devoutly before an image of Jesus Crucified after Holy Communion on any Friday of Lent. On any other day of the year, a Partial Indulgence is granted.',
      conditions: 'For the Plenary Indulgence: fulfill the four usual conditions (Sacramental Confession, Eucharistic Communion, prayer for the Pope’s intentions, and complete detachment from all sin).'
    }
  },
  {
    id: 'prayer-nicene-creed',
    title: 'The Nicene-Constantinopolitan Creed',
    latinTitle: 'Symbolum Nicaenum',
    category: 'Daily and Traditional',
    englishText: `I believe in one God, the Father Almighty, Maker of heaven and earth, and of all things visible and invisible.
And in one Lord Jesus Christ, the only-begotten Son of God, born of the Father before all ages; God of God, Light of Light, true God of true God; begotten, not made, consubstantial with the Father; by whom all things were made. Who for us men and for our salvation came down from heaven, and became incarnate by the Holy Spirit of the Virgin Mary, and was made man. He was crucified also for us, suffered under Pontius Pilate, and was buried. And the third day He rose again according to the Scriptures, and ascended into heaven, and sits at the right hand of the Father. And He shall come again with glory to judge the living and the dead; of whose kingdom there shall be no end.
And in the Holy Spirit, the Lord and Giver of life, who proceeds from the Father and the Son; who together with the Father and the Son is adored and glorified; who spoke by the prophets.
And one, holy, catholic, and apostolic Church. I confess one baptism for the remission of sins. And I expect the resurrection of the dead, and the life of the world to come. Amen.`,
    latinText: `Credo in unum Deum, Patrem omnipoténtem, factórem caeli et terrae, visibílium ómnium et invisibílium. Et in unum Dóminum Iesum Christum, Fílium Dei unigénitum, et ex Patre natum ante ómnia saécula. Deum de Deo, lumen de lúmine, Deum verum de Deo vero, génitum, non factum, consubstantiálem Patri: per quem ómnia facta sunt. Qui propter nos hómines et propter nostram salútem descéndit de caelis. Et incarnátus est de Spíritu Sancto ex María Vírgine, et homo factus est. Crucifíxus étiam pro nobis sub Póntio Piláto; passus et sepúltus est, et resurréxit tértia die, secúndum Scriptúras, et ascéndit in caelum, sedet ad déxteram Patris. Et íterum ventúrus est cum glória, iudicáre vivos et mórtuos, cuius regni non erit finis. Et in Spíritum Sanctum, Dóminum et vivificántem: qui ex Patre Filióque procédit. Qui cum Patre et Fílio simul adorátur et conglorificátur: qui locútus est per prophétas. Et unam, sanctam, cathólicam et apostólicam Ecclésiam. Confíteor unum baptísma in remissiónem peccatórum. Et exspécto resurrectiónem mortuórum, et vitam ventúri saéculi. Amen.`,
    scripturalOrTraditionOrigin: 'Formulated at the First Council of Nicaea (325 AD) and completed at the First Council of Constantinople (381 AD).',
    historicalContext: 'Composed to defend the true divinity of Jesus Christ against the Arian heresy and the divinity of the Holy Spirit against the Macedonians, the Nicene Creed has served for over sixteen centuries as the universal profession of faith proclaimed at Sunday and solemnity Masses.',
    usageTime: 'Sundays, Solemnities, and daily renewal of Catholic faith',
    indulgence: {
      type: 'Partial',
      grantReference: 'Enchiridion Indulgentiarum (4th ed.), Grant #28',
      summary: 'A Partial Indulgence is granted to the faithful who devoutly recite the Apostles’ Creed or the Nicene-Constantinopolitan Creed.'
    }
  },
  {
    id: 'prayer-fatima-o-my-jesus',
    title: 'The Fatima Prayer (O My Jesus)',
    latinTitle: 'Oratio Fatimae',
    category: 'Marian',
    englishText: `O my Jesus, forgive us our sins, save us from the fires of hell, lead all souls to Heaven, especially those most in need of Thy mercy. Amen.`,
    latinText: `O mi Iesu, dimítte nobis débita nostra, líbera nos ab igne inférni, conduc in caelum omnes ánimas, praesértim illas quae máxime índigent misericórdia tua. Amen.`,
    scripturalOrTraditionOrigin: 'Taught by Our Lady of Fatima on July 13, 1917, to Lucia dos Santos and Saints Francisco and Jacinta Marto in Portugal.',
    historicalContext: 'During the third apparition at the Cova da Iria, Our Lady showed the three shepherd children a brief vision of hell and asked that this short prayer be inserted after every decade of the Holy Rosary to beg Christ’s mercy for poor sinners.'
    ,
    usageTime: 'After each decade of the Holy Rosary and throughout the day'
  },
  {
    id: 'prayer-jesus-prayer',
    title: 'The Jesus Prayer',
    latinTitle: 'Oratio Iesu',
    category: 'Daily and Traditional',
    englishText: `Lord Jesus Christ, Son of God, have mercy on me, a sinner.`,
    latinText: `Dómine Iesu Christe, Fili Dei, miserére mei peccatóris.`,
    scripturalOrTraditionOrigin: 'Rooted in the cry of blind Bartimaeus (Mark 10:47) and the humble tax collector in the Temple (Luke 18:13).',
    historicalContext: 'Treasured since the Desert Fathers of the 4th and 5th centuries and central to Eastern Catholic spirituality (CCC 2667–2668), the Jesus Prayer condenses the entire Gospel into a single breath: confessing Christ’s divinity and pleading for His mercy in fulfillment of St. Paul’s call to “pray without ceasing.”',
    usageTime: 'At any moment of the day, synchronized gently with quiet breathing'
  },
  {
    id: 'prayer-grace-before-meals',
    title: 'Grace Before Meals',
    latinTitle: 'Benedicite',
    category: 'Daily and Traditional',
    englishText: `Bless us, O Lord, and these Thy gifts, which we are about to receive from Thy bounty, through Christ our Lord. Amen.`,
    latinText: `Bénedic, Dómine, nos et haec tua dona quae de tua largitáte sumus sumptúri. Per Christum Dóminum nostrum. Amen.`,
    scripturalOrTraditionOrigin: 'Following Christ’s own blessing of bread (Matthew 14:19; Luke 24:30) and St. Paul’s counsel (1 Timothy 4:4–5).',
    historicalContext: 'Derived from the ancient monastic table blessings of the Roman Breviary, this brief prayer sanctifies daily nourishment by acknowledging that every good gift flows from the providence of God.',
    usageTime: 'Before every meal'
  },
  {
    id: 'prayer-thanksgiving-after-meals',
    title: 'Thanksgiving After Meals',
    latinTitle: 'Agimus Tibi Gratias',
    category: 'Daily and Traditional',
    englishText: `We give Thee thanks for all Thy benefits, O Almighty God, who livest and reignest forever; and may the souls of the faithful departed, through the mercy of God, rest in peace. Amen.`,
    latinText: `Ágimus tibi grátias, omnípotens Deus, pro univérsis benefíciis tuis, qui vivis et regnas in saécula saeculórum. Amen. Et fidélium ánimae per misericórdiam Dei requiéscant in pace. Amen.`,
    scripturalOrTraditionOrigin: 'Traditional Roman Breviary post-meal thanksgiving joined with intercession for the faithful departed.',
    historicalContext: 'Completing the rhythm of Christian gratitude at table, the Church pairs thanksgiving for bodily food with charity toward the Holy Souls in Purgatory, reminding families that earthly meals foretaste the heavenly banquet.',
    usageTime: 'Immediately after meals'
  },
  {
    id: 'prayer-evening-prayer',
    title: 'Traditional Evening Prayer (Before Sleep)',
    latinTitle: 'Oratio Vespertina',
    category: 'Daily and Traditional',
    englishText: `O my God, at the close of this day I adore Thee and thank Thee for all the graces Thou hast bestowed upon me. Forgive me every sin I have committed today in thought, word, deed, or omission. Into Thy hands, O Lord, I commend my spirit. Guard me this night under the protection of the Blessed Virgin Mary, St. Joseph, and my Guardian Angel, and if it be Thy holy will, bring me safely to the light of a new day. Amen.`,
    scripturalOrTraditionOrigin: 'Echoing Psalm 31:6, Christ’s words on the Cross (Luke 23:46), and the spirit of Compline (Night Prayer).',
    historicalContext: 'From the earliest centuries of the Church, Christians closed the day with a brief examination of conscience, an act of thanksgiving, and entrustment of body and soul to God before the “little death” of sleep.',
    usageTime: 'Every evening before retiring to sleep'
  },
  {
    id: 'prayer-guardian-angel',
    title: 'Prayer to One’s Guardian Angel',
    latinTitle: 'Angele Dei',
    category: 'Saints and Intercession',
    englishText: `Angel of God, my guardian dear,
to whom God’s love commits me here,
ever this day (or night) be at my side,
to light and guard, to rule and guide. Amen.`,
    latinText: `Ángele Dei, qui custos es mei,
me, tibi commíssum pietáte supérna,
hódie (hac nocte) illúmina, custódi, rege et gubérna. Amen.`,
    scripturalOrTraditionOrigin: 'Rooted in Matthew 18:10, Exodus 23:20, and Psalm 91:11; Latin verse attributed to Reginald of Canterbury (11th century).',
    historicalContext: 'The Catechism (CCC 336) teaches that from infancy to death, human life is surrounded by the watchful care and intercession of a personal Guardian Angel. This beloved prayer asks our heavenly companion for four distinct graces: illumination of the mind, protection from danger, right ordering of the will, and guidance along the path to heaven.',
    usageTime: 'Morning, evening, before travel, and in moments of temptation',
    indulgence: {
      type: 'Partial',
      grantReference: 'Enchiridion Indulgentiarum (4th ed.), Grant #18',
      summary: 'A Partial Indulgence is granted to the faithful who devoutly recite the prayer “Angele Dei” to their Guardian Angel.'
    }
  },
  {
    id: 'prayer-magnificat',
    title: 'The Magnificat (Canticle of Mary)',
    latinTitle: 'Magnificat Anima Mea Dominum',
    category: 'Marian',
    englishText: `My soul doth magnify the Lord,
and my spirit hath rejoiced in God my Savior.
Because He hath regarded the humility of His handmaid;
for behold from henceforth all generations shall call me blessed.
Because He that is mighty hath done great things to me;
and holy is His name.
And His mercy is from generation unto generations, to them that fear Him.
He hath showed might in His arm:
He hath scattered the proud in the conceit of their heart.
He hath put down the mighty from their seat, and hath exalted the humble.
He hath filled the hungry with good things; and the rich He hath sent empty away.
He hath received Israel His servant, being mindful of His mercy:
As He spoke to our fathers, to Abraham and to his seed forever.
Glory be to the Father, and to the Son, and to the Holy Spirit;
as it was in the beginning, is now, and ever shall be, world without end. Amen.`,
    latinText: `Magníficat ánima mea Dóminum,
et exsultávit spíritus meus in Deo salutári meo,
quia respéxit humilitátem ancíllae suae.
Ecce enim ex hoc beátam me dicent omnes generatiónes,
quia fecit mihi magna, qui potens est, et sanctum nomen eius,
et misericórdia eius in progénies et progénies timéntibus eum.
Fecit poténtiam in bráchio suo, dispérsit supérbos mente cordis sui;
depósuit poténtes de sede et exaltávit húmiles;
esuriéntes implévit bonis et dívites dimísit inánes.
Suscépit Ísrael púerum suum, recordátus misericórdiae,
sicut locútus est ad patres nostros, Ábraham et sémini eius in saécula.`,
    scripturalOrTraditionOrigin: 'Gospel of St. Luke 1:46–55 (Douay-Rheims classic rendering), spoken by the Blessed Virgin Mary at the Visitation.',
    historicalContext: 'When Mary visited her cousin St. Elizabeth in the hill country of Judea, St. John the Baptist leaped in the womb and Mary burst forth with this inspired canticle echoing Hannah’s song (1 Samuel 2). The Church chants it every evening at Vespers as the supreme hymn of Christian humility and gratitude.',
    usageTime: 'Evening Prayer (Vespers) and moments of joyful thanksgiving',
    indulgence: {
      type: 'Partial',
      grantReference: 'Enchiridion Indulgentiarum (4th ed.), Grant #17 §2',
      summary: 'A Partial Indulgence is granted to the faithful who devoutly recite the Magnificat.'
    }
  },
  {
    id: 'prayer-regina-caeli',
    title: 'Regina Caeli (Queen of Heaven — Eastertide)',
    latinTitle: 'Regina Caeli',
    category: 'Marian',
    englishText: `V. Queen of Heaven, rejoice, alleluia.
R. For He whom you did merit to bear, alleluia.
V. Has risen, as He said, alleluia.
R. Pray for us to God, alleluia.
V. Rejoice and be glad, O Virgin Mary, alleluia.
R. For the Lord has truly risen, alleluia.

Let us pray.
O God, who gave joy to the world through the resurrection of Thy Son, our Lord Jesus Christ, grant we beseech Thee, that through the intercession of the Virgin Mary, His Mother, we may obtain the joys of everlasting life. Through the same Christ our Lord. Amen.`,
    latinText: `V. Regína caeli, laetáre, allelúia.
R. Quia quem meruísti portáre, allelúia.
V. Resurréxit, sicut dixit, allelúia.
R. Ora pro nobis Deum, allelúia.
V. Gaude et laetáre, Virgo María, allelúia.
R. Quia surréxit Dóminus vere, allelúia.

Orémus.
Deus, qui per resurrectiónem Fílii tui Dómini nostri Iesu Christi mundum laetificáre dignátus es: praesta, quáesumus, ut per eius Genetrícem Vírginem Maríam perpétuae capiámus gáudia vitae. Per eúndem Christum Dóminum nostrum. Amen.`,
    scripturalOrTraditionOrigin: '12th-century Marian Easter antiphon ordered by Pope Benedict XIV (1742) to replace the Angelus during Eastertide.',
    historicalContext: 'According to venerable Roman legend, Pope St. Gregory the Great heard angels singing the opening lines during a plague procession in Rome in 596 AD and replied, “Pray for us to God, alleluia!” Standing rather than kneeling, Catholics pray it thrice daily from Easter Sunday until Pentecost.',
    usageTime: '6:00 AM, 12:00 PM, and 6:00 PM daily throughout Eastertide',
    indulgence: {
      type: 'Partial',
      grantReference: 'Enchiridion Indulgentiarum (4th ed.), Grant #17 §2',
      summary: 'A Partial Indulgence is granted for the devout recitation of the Regina Caeli at morning, noon, or evening during Eastertide.'
    }
  },
  {
    id: 'prayer-sub-tuum-praesidium',
    title: 'Sub Tuum Praesidium (We Fly to Thy Patronage)',
    latinTitle: 'Sub Tuum Praesidium',
    category: 'Marian',
    englishText: `We fly to thy patronage, O holy Mother of God;
despise not our petitions in our necessities,
but deliver us always from all dangers,
O glorious and blessed Virgin. Amen.`,
    latinText: `Sub tuum praesídium confúgimus, Sancta Dei Génetrix;
nostras deprecatiónes ne despícias in necessitátibus,
sed a perículis cunctis líbera nos semper,
Virgo gloriósa et benedícta. Amen.`,
    scripturalOrTraditionOrigin: 'Oldest surviving Marian prayer (c. 250 AD), preserved on a 3rd-century Greek papyrus discovered in Egypt.',
    historicalContext: 'Written during the fierce Roman persecutions of the 3rd century, this brief cry of confidence already invokes Mary as Theotokos (“Mother of God”) nearly two hundred years before the Council of Ephesus solemnly defined the dogma in 431 AD.',
    usageTime: 'In times of danger, persecution, trial, or evening devotion',
    indulgence: {
      type: 'Partial',
      grantReference: 'Enchiridion Indulgentiarum (4th ed.), Grant #17 §2',
      summary: 'A Partial Indulgence is granted to the faithful who devoutly recite the Sub Tuum Praesidium.'
    }
  },
  {
    id: 'prayer-consecration-to-mary',
    title: 'Act of Consecration to Mary (O My Queen, O My Mother)',
    latinTitle: 'O Domina Mea, O Mater Mea',
    category: 'Marian',
    englishText: `My Queen and my Mother, I give myself entirely to thee; and to show my devotion to thee, I consecrate to thee this day my eyes, my ears, my mouth, my heart, my whole being without reserve. Wherefore, good Mother, as I am thine own, keep me, guard me, as thy property and possession. Amen.`,
    latinText: `O Dómina mea! O Mater mea! Tibi me totum óffero; atque ut me tibi probem devótum, cónsecro tibi hódie óculos meos, aures meas, os meum, cor meum, plane me totum. Quóniam ítaque tuus sum, o bona Mater, serva me, defénde me ut rem ac possessiónem tuam. Amen.`,
    scripturalOrTraditionOrigin: 'Traditional Marian consecration prayer from the 17th-century Sodalities of Our Lady; enriched with indulgences by Pope Pius IX.',
    historicalContext: 'Designed as a concise daily renewal of baptismal and Marian entrustment, this prayer places every sense and faculty of the body and soul under the maternal guardianship of the Blessed Virgin so that all one sees, hears, speaks, and loves belongs to Christ.',
    usageTime: 'Every morning and evening as a daily Marian consecration'
  },
  {
    id: 'prayer-childrens-prayer-to-mary',
    title: 'Children’s Prayer to Mary',
    latinTitle: 'Oratio Puerorum ad Mariam',
    category: 'Marian',
    englishText: `Dear Mother Mary, look down upon me with love today. Hold my hand as you held the hand of the Child Jesus in Nazareth. Keep my heart pure, my words kind, and my mind attentive to what is good. Watch over my family, my friends, and all children in the world, and lead us closer to Jesus every day. Amen.`,
    scripturalOrTraditionOrigin: 'Inspired by Our Lord’s words in Matthew 19:14 (“Let the little children come to me”) and Marian domestic catechesis.',
    historicalContext: 'In Catholic family life, parents teach young children to speak simply and trustingly to the Blessed Mother, forming habits of filial love and purity from the earliest years.',
    usageTime: 'Morning and bedtime family prayers with children'
  },
  {
    id: 'prayer-our-lady-of-guadalupe',
    title: 'Prayer to Our Lady of Guadalupe',
    latinTitle: 'Oratio ad Beatam Mariam Virginem de Guadalupe',
    category: 'Marian',
    englishText: `Our Lady of Guadalupe, Mystical Rose, make intercession for holy Church, protect the Sovereign Pontiff, help all those who invoke thee in their necessities, and since thou art the ever Virgin Mary and Mother of the true God, obtain for us from thy most holy Son the grace of keeping our faith, of sweet hope in the midst of the bitterness of life, of burning charity, and the precious gift of final perseverance. Amen.`,
    scripturalOrTraditionOrigin: 'Honoring the 1531 apparitions of the Blessed Virgin Mary to St. Juan Diego on Tepeyac Hill, Mexico City.',
    historicalContext: 'In December 1531, the Mother of God appeared to the humble indigenous convert St. Juan Diego, leaving her miraculous image imprinted upon his cactus-fiber tilma and speaking those tender words: “Am I not here, who am your Mother?” Within a decade, millions across the Americas embraced the Catholic Faith.',
    usageTime: 'December 12 (Feast of Our Lady of Guadalupe), for life, and for the Americas'
  },
  {
    id: 'prayer-our-lady-of-perpetual-help',
    title: 'Prayer to Our Lady of Perpetual Help',
    latinTitle: 'Oratio ad Matrem de Perpetuo Succursu',
    category: 'Marian',
    englishText: `O Mother of Perpetual Help, grant that I may ever invoke thy most powerful name, which is the safeguard of the living and the salvation of the dying. O purest Mary, O sweetest Mary, let thy name henceforth be ever on my lips. Delay not, O Blessed Lady, to help me whenever I call on thee; for, in all my temptations, in all my needs, I shall never cease to call on thee, ever repeating thy sacred name, Mary, Mary. Amen.`,
    author: 'St. Alphonsus Maria de Liguori (1696–1787)',
    scripturalOrTraditionOrigin: 'Composed by St. Alphonsus Liguori and cherished with the 15th-century Cretan icon entrusted by Pope Pius IX to the Redemptorists in 1866.',
    historicalContext: 'When Pope Pius IX gave the miraculous icon of Our Lady of Perpetual Help to the Redemptorists in Rome, he charged them: “Make her known throughout the world.” The icon depicts the Child Jesus running into His Mother’s arms—one sandal falling loose—as Archangels Michael and Gabriel show Him the instruments of His Passion.',
    usageTime: 'June 27 (Feast), Wednesdays, and in every urgent temporal or spiritual need'
  },
  {
    id: 'prayer-our-lady-of-lourdes',
    title: 'Prayer to Our Lady of Lourdes',
    latinTitle: 'Oratio ad Beatam Mariam Virginem de Lourdes',
    category: 'Marian',
    englishText: `O ever Immaculate Virgin, Mother of Mercy, Health of the Sick, Refuge of Sinners, Comfortess of the Afflicted, you know my wants, my troubles, my sufferings. Cast upon me a look of mercy. By appearing in the Grotto of Lourdes, you were pleased to make it a privileged sanctuary, whence you dispense your favors, and already many sufferers have obtained the cure of their infirmities, both spiritual and corporal. I come, therefore, with unbounded confidence to implore your maternal intercession. Obtain, O loving Mother, the grant of my requests. Through gratitude for your favors, I will endeavor to imitate your virtues, that I may one day share your glory. Amen.`,
    scripturalOrTraditionOrigin: 'Honoring the 1858 apparitions of the Immaculate Conception to St. Bernadette Soubirous at Massabielle, Lourdes, France.',
    historicalContext: 'Four years after Pope Pius IX solemnly defined the dogma of the Immaculate Conception (1854), Our Lady appeared eighteen times to fourteen-year-old Bernadette Soubirous, declaring “I am the Immaculate Conception” and revealing a miraculous spring of healing water for the sick and penitent.',
    usageTime: 'February 11 (World Day of the Sick) and when praying for physical or spiritual healing'
  },
  {
    id: 'prayer-thanksgiving-to-our-lady',
    title: 'Thanksgiving Prayer to Our Lady',
    latinTitle: 'Gratiarum Actio ad Beatam Mariam Virginem',
    category: 'Marian',
    englishText: `O Most Holy Virgin Mary, Mother of God and our tender Mother, with a grateful heart I thank thee for all the graces, protections, and answers to prayer thou hast obtained for me from thy Divine Son. Never let me forget the mercies God has shown me through thy loving intercession. Present my gratitude before the throne of the Most Holy Trinity, and keep me faithful to Jesus unto eternity. Amen.`,
    scripturalOrTraditionOrigin: 'Traditional Catholic Marian thanksgiving echoing the Magnificat and Luke 17:15–16.',
    historicalContext: 'Catholic devotion does not only petition Mary in distress; it returns in gratitude after prayers are answered, honoring her as the channel of grace who directs all praise back to her Son.',
    usageTime: 'After answered prayers, completed novenas, or safe journeys'
  },
  {
    id: 'prayer-veni-creator-spiritus',
    title: 'Veni, Creator Spiritus (Come, Creator Spirit)',
    latinTitle: 'Veni, Creator Spiritus',
    author: 'Attributed to St. Rabanus Maurus (c. 780–856)',
    category: 'Prayers of the Saints',
    englishText: `Come, Holy Ghost, Creator blest,
and in our souls take up Thy rest;
come with Thy grace and heavenly aid
to fill the hearts which Thou hast made.

O Comforter, to Thee we cry,
O heavenly gift of God Most High,
O fount of life and fire of love,
and sweet anointing from above.

Thou in Thy sevenfold gifts art known;
Thou, finger of God’s hand we own;
Thou, promise of the Father, Thou
who dost the tongue with power imbue.

Kindle our senses from above,
and make our hearts o’erflow with love;
with patience firm and virtue high
the weakness of our flesh supply.

Far from us drive the foe we dread,
and grant us Thy peace instead;
so shall we not, with Thee for guide,
turn from the path of life aside.

Oh, may Thy grace on us bestow
the Father and the Son to know;
and Thee, through endless times confessed,
of both the eternal Spirit blest.

Now to the Father and the Son,
who rose from death, be glory done,
with Thee, O Holy Comforter,
henceforth by all forevermore. Amen.`,
    latinText: `Veni, Creátor Spíritus,
mentes tuórum vísita,
imple supérna grátia,
quae tu creásti péctora.

Qui díceris Paráclitus,
altíssimi donum Dei,
fons vivus, ignis, cáritas,
et spiritális únctio.

Tu septifórmis múnere,
dígitus patérnae déxterae,
tu rite promíssum Patris,
sermóne ditans gúttura.

Accénde lumen sénsibus,
infúnde amórem córdibus,
infírma nostri córporis
virtúte firmans pérpeti.

Hostem repéllas lóngius
pacémque dones prótinus;
ductóre sic te práevio
vitémus omne nóxium.

Per te sciámus da Patrem
noscámus atque Fílium,
teque utriúsque Spíritum
credámus omni témpore.

Deo Patri sit glória,
et Fílio, qui a mórtuis
surréxit, ac Paráclito,
in saeculórum saécula. Amen.`,
    scripturalOrTraditionOrigin: '9th-century Pentecost hymn traditionally ascribed to St. Rabanus Maurus, Archbishop of Mainz (English verse by Fr. Edward Caswall, 1849).',
    historicalContext: 'One of the Church’s greatest liturgical hymns, Veni Creator Spiritus is chanted at Vespers of Pentecost, during the ordination of priests and bishops, at the opening of Ecumenical Councils, and as cardinals enter the Sistine Chapel for a papal conclave.',
    usageTime: 'January 1 (New Year’s Day), Pentecost Sunday, and before major decisions',
    indulgence: {
      type: 'Plenary or Partial',
      grantReference: 'Enchiridion Indulgentiarum (4th ed.), Grant #26',
      summary: 'A Plenary Indulgence is granted when Veni Creator Spiritus is publicly recited or sung on January 1 (Solemnity of Mary, Mother of God) or on Pentecost Sunday. A Partial Indulgence is granted on all other days.',
      conditions: 'For the Plenary Indulgence: public recitation on Jan 1 or Pentecost plus the four usual conditions.'
    }
  },
  {
    id: 'prayer-acts-faith-hope-charity',
    title: 'Acts of Faith, Hope, and Charity',
    latinTitle: 'Actus Fidei, Spei et Caritatis',
    category: 'Acts of the Theological Virtues',
    englishText: `ACT OF FAITH
O my God, I firmly believe that Thou art one God in three divine Persons, Father, Son, and Holy Spirit; I believe that Thy divine Son became man and died for our sins, and that He will come to judge the living and the dead. I believe these and all the truths which the Holy Catholic Church teaches, because Thou hast revealed them, who canst neither deceive nor be deceived. Amen.

ACT OF HOPE
O my God, relying on Thy infinite goodness and promises, I hope to obtain pardon of my sins, the help of Thy grace, and life everlasting, through the merits of Jesus Christ, my Lord and Redeemer. Amen.

ACT OF CHARITY
O my God, I love Thee above all things, with my whole heart and soul, because Thou art all-good and worthy of all my love. I love my neighbor as myself for the love of Thee. I forgive all who have injured me, and ask pardon of all whom I have injured. Amen.`,
    scripturalOrTraditionOrigin: '1 Corinthians 13:13; classic catechetical formulas promulgated by Pope Benedict XIV (1756) and the Baltimore Catechism.',
    historicalContext: 'Faith, Hope, and Charity are the three theological virtues infused directly into the soul at Baptism, uniting the believer immediately to God. Explicitly renewing these acts daily—and especially near death—strengthens grace against doubt, despair, and selfishness.',
    usageTime: 'Morning and evening prayers, before Holy Mass, and in times of temptation',
    indulgence: {
      type: 'Partial',
      grantReference: 'Enchiridion Indulgentiarum (4th ed.), Grant #8 §2',
      summary: 'A Partial Indulgence is granted to the faithful who devoutly recite an Act of Faith, Hope, or Charity using any legitimately approved formula.'
    }
  },
  {
    id: 'prayer-agnus-dei',
    title: 'Agnus Dei (Lamb of God)',
    latinTitle: 'Agnus Dei',
    category: 'Eucharistic and Adoration',
    englishText: `Lamb of God, who takest away the sins of the world, have mercy on us.
Lamb of God, who takest away the sins of the world, have mercy on us.
Lamb of God, who takest away the sins of the world, grant us peace.`,
    latinText: `Agnus Dei, qui tollis peccáta mundi, miserére nobis.
Agnus Dei, qui tollis peccáta mundi, miserére nobis.
Agnus Dei, qui tollis peccáta mundi, dona nobis pacem.`,
    scripturalOrTraditionOrigin: 'John 1:29 (St. John the Baptist’s witness); introduced into the Roman Mass by Pope St. Sergius I (c. 687–701).',
    historicalContext: 'Chanted during the Fraction Rite of the Holy Mass as the priest breaks the consecrated Host, the Agnus Dei directs every eye to Jesus Christ—the true Passover Lamb slain for the sins of the world—just moments before Holy Communion.',
    usageTime: 'During Holy Mass before Communion and in Eucharistic Adoration'
  },
  {
    id: 'prayer-for-the-unborn',
    title: 'Prayer for the Unborn',
    latinTitle: 'Oratio pro Nascituris',
    category: 'Daily and Traditional',
    englishText: `Heavenly Father, Author and Creator of all human life, we lift up to You every unborn child formed in the womb in Your image and likeness. Shield these innocent little ones from harm, grant courage and generous support to mothers and fathers facing fear or hardship, soften hardened hearts with the grace of conversion, and move our society to cherish every life from conception until natural death. Through Jesus Christ, who Himself dwelled in the womb of the Virgin Mary. Amen.`,
    scripturalOrTraditionOrigin: 'Rooted in Psalm 139:13–16, Jeremiah 1:5, and Luke 1:41 (the Visitation of Mary and Elizabeth).',
    historicalContext: 'Standing firmly on the perennial moral teaching of the Church from the 1st-century Didache to St. John Paul II’s Evangelium Vitae, Catholics intercede daily for the protection of the unborn and compassionate healing for parents in crisis.',
    usageTime: 'Daily, on March 25 (Annunciation / Day of the Unborn Child), and in January'
  }
];
