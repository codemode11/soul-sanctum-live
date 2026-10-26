import { CatholicPrayer } from '../types';

export const CATHOLIC_PRAYERS_DATABASE: CatholicPrayer[] = [
  {
    id: 'prayer-sign-of-cross',
    title: 'The Sign of the Cross',
    latinTitle: 'Signum Crucis',
    category: 'Daily and Traditional',
    englishText: 'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.',
    latinText: 'In nómine Patris, et Fílii, et Spíritus Sancti. Amen.',
    scripturalOrTraditionOrigin: 'Matthew 28:19; used by the Apostles and early Christians from apostolic times (Tertullian, 2nd century).',
    usageTime: 'Beginning and end of every Catholic prayer and action'
  },
  {
    id: 'prayer-our-father',
    title: 'The Lord\'s Prayer (Our Father)',
    latinTitle: 'Pater Noster',
    category: 'Daily and Traditional',
    englishText: `Our Father, who art in heaven,
hallowed be thy name;
thy kingdom come;
thy will be done on earth as it is in heaven.
Give us this day our daily bread;
and forgive us our trespasses
as we forgive those who trespass against us;
and lead us not into temptation,
but deliver us from evil. Amen.`,
    latinText: `Pater noster, qui es in caelis,
sanctificétur nomen tuum.
Advéniat regnum tuum.
Fiat volúntas tua, sicut in caelo et in terra.
Panem nostrum quotidiánum da nobis hódie,
et dimítte nobis débita nostra
sicut et nos dimíttimus debitóribus nostris.
Et ne nos indúcas in tentatiónem:
sed líbera nos a malo. Amen.`,
    scripturalOrTraditionOrigin: 'Matthew 6:9-13; Luke 11:2-4. Taught by Christ to His Apostles.',
    usageTime: 'Daily morning, evening, Holy Mass, Rosary'
  },
  {
    id: 'prayer-hail-mary',
    title: 'The Hail Mary',
    latinTitle: 'Ave Maria',
    category: 'Marian',
    englishText: `Hail Mary, full of grace, the Lord is with thee.
Blessed art thou among women,
and blessed is the fruit of thy womb, Jesus.
Holy Mary, Mother of God,
pray for us sinners,
now and at the hour of our death. Amen.`,
    latinText: `Ave María, grátia plena, Dóminus tecum.
Benedícta tu in muliéribus,
et benedíctus fructus ventris tui, Iesus.
Sancta María, Mater Dei,
ora pro nobis peccatóribus,
nunc et in hora mortis nostrae. Amen.`,
    scripturalOrTraditionOrigin: 'Luke 1:28 (Archangel Gabriel\'s greeting) and Luke 1:42 (St. Elizabeth\'s greeting under the Holy Spirit), with Church\'s invocation confirmed at Council of Ephesus (431 AD).',
    usageTime: 'Holy Rosary, Angelus, Daily Devotion'
  },
  {
    id: 'prayer-glory-be',
    title: 'Glory Be to the Father (Doxology)',
    latinTitle: 'Gloria Patri',
    category: 'Daily and Traditional',
    englishText: `Glory be to the Father, and to the Son, and to the Holy Spirit,
as it was in the beginning, is now, and ever shall be,
world without end. Amen.`,
    latinText: `Glória Patri, et Fílio, et Spirítui Sancto.
Sicut erat in princípio, et nunc, et semper,
et in saécula saeculórum. Amen.`,
    scripturalOrTraditionOrigin: 'Apostolic doxology honoring the Most Holy Trinity; reaffirmed at the Council of Nicaea (325 AD).',
    usageTime: 'Liturgy of the Hours, end of Psalms, Rosary decades'
  },
  {
    id: 'prayer-apostles-creed',
    title: 'The Apostles\' Creed',
    latinTitle: 'Symbolum Apostolorum',
    category: 'Daily and Traditional',
    englishText: `I believe in God, the Father Almighty,
Creator of heaven and earth,
and in Jesus Christ, His only Son, our Lord,
who was conceived by the Holy Spirit,
born of the Virgin Mary,
suffered under Pontius Pilate,
was crucified, died and was buried;
He descended into hell;
on the third day He rose again from the dead;
He ascended into heaven,
and is seated at the right hand of God the Father Almighty;
from there He will come to judge the living and the dead.

I believe in the Holy Spirit,
the holy catholic Church,
the communion of saints,
the forgiveness of sins,
the resurrection of the body,
and life everlasting. Amen.`,
    latinText: `Credo in Deum Patrem omnipoténtem, Creatórem caeli et terrae.
Et in Iesum Christum, Fílium eius únicum, Dóminum nostrum: qui concéptus est de Spíritu Sancto, natus ex María Vírgine, passus sub Póntio Piláto, crucifixus, mórtuus, et sepúltus, descéndit ad ínferos, tértia die resurréxit a mórtuis, ascéndit ad caelos, sedet ad déxteram Dei Patris omnipoténtis, inde ventúrus est iudicáre vivos et mórtuos.
Credo in Spíritum Sanctum, sanctam Ecclésiam cathólicam, sanctórum communiónem, remissiónem peccatórum, carnis resurrectiónem, vitam aetérnam. Amen.`,
    scripturalOrTraditionOrigin: 'Ancient summary of the Faith handed down by the Apostles for Holy Baptism.',
    usageTime: 'Beginning of the Rosary, Baptism, Daily Prayer'
  },
  {
    id: 'prayer-st-michael',
    title: 'Prayer to Saint Michael the Archangel',
    latinTitle: 'Oratio ad Sanctum Michaelem',
    category: 'Saints and Intercession',
    englishText: `Saint Michael the Archangel, defend us in battle.
Be our protection against the wickedness and snares of the devil.
May God rebuke him, we humbly pray;
and do thou, O Prince of the Heavenly Host,
by the power of God,
cast into hell Satan and all the evil spirits
who prowl about the world seeking the ruin of souls. Amen.`,
    latinText: `Sancte Míchael Archángele, defénde nos in proélio,
contra nequítiam et insídias diáboli esto praesídium.
Ímperet illi Deus, súpplices deprecámur:
tuque, Princeps milítiae caeléstis,
Sátanam aliósque spíritus malígnos,
qui ad perditiónem animárum pervagántur in mundo,
divína virtúte, in inférnum detrúde. Amen.`,
    scripturalOrTraditionOrigin: 'Composed by Pope Leo XIII in 1884 following a mystical vision of the spiritual assault on the Church.',
    usageTime: 'After Holy Mass, during spiritual warfare, before sleep'
  },
  {
    id: 'prayer-memorare',
    title: 'The Memorare',
    latinTitle: 'Memorare',
    category: 'Marian',
    englishText: `Remember, O most gracious Virgin Mary,
that never was it known that anyone who fled to thy protection,
implored thy help, or sought thy intercession was left unaided.
Inspired with this confidence, I fly unto thee,
O Virgin of virgins, my Mother;
to thee do I come, before thee I stand, sinful and sorrowful.
O Mother of the Word Incarnate, despise not my petitions,
but in thy mercy hear and answer me. Amen.`,
    latinText: `Memoráre, o piíssima Virgo María,
a saéculo non esse audítum, quemquam ad tua curréntem praesídia,
tua implorántem auxília, tua peténtem suffrágia,
esse derelíctum.
Ego tali animátus confidéntia, ad te, Virgo Vírginum, Mater, curro,
ad te vénio, coram te gemens peccátor assísto.
Noli, Mater Verbi, verba mea despícere;
sed audi propítia et exáudi. Amen.`,
    scripturalOrTraditionOrigin: 'Attributed to St. Bernard of Clairvaux (12th Century) and popularized by Fr. Claude Bernard (17th Century).',
    usageTime: 'In urgent needs and tribulations'
  },
  {
    id: 'prayer-hail-holy-queen',
    title: 'Hail Holy Queen (Salve Regina)',
    latinTitle: 'Salve Regina',
    category: 'Marian',
    englishText: `Hail, holy Queen, Mother of mercy, our life, our sweetness, and our hope.
To thee do we cry, poor banished children of Eve.
To thee do we send up our sighs, mourning and weeping in this valley of tears.
Turn then, most gracious advocate, thine eyes of mercy toward us,
and after this our exile, show unto us the blessed fruit of thy womb, Jesus.
O clement, O loving, O sweet Virgin Mary.

V. Pray for us, O holy Mother of God.
R. That we may be made worthy of the promises of Christ.`,
    latinText: `Salve, Regína, Mater misericórdiae,
vita, dulcédo, et spes nostra, salve.
Ad te clamámus éxsules fílii Evae.
Ad te suspirámus, geméntes et flentes in hac lacrimárum valle.
Eia ergo, advocáta nostra,
illos tuos misericórdes óculos ad nos convérte.
Et Iesum, benedíctum fructum ventris tui,
nobis post hoc exsílium osténde.
O clemens, o pia, o dulcis Virgo María.

V. Ora pro nobis, Sancta Dei Génetrix.
R. Ut digni efficiámur promissiónibus Christi.`,
    scripturalOrTraditionOrigin: 'Composed by Blessed Hermann the Cripple, monk of Reichenau, c. 1050 AD.',
    usageTime: 'Conclusion of the Holy Rosary and Night Prayer (Compline)'
  },
  {
    id: 'prayer-angelus',
    title: 'The Angelus (Traditional 6am, 12pm, 6pm Prayer)',
    latinTitle: 'Angelus Domini',
    category: 'Daily and Traditional',
    englishText: `V. The Angel of the Lord declared unto Mary.
R. And she conceived of the Holy Spirit.
Hail Mary...

V. Behold the handmaid of the Lord.
R. Be it done unto me according to thy word.
Hail Mary...

V. And the Word was made flesh.
R. And dwelt among us.
Hail Mary...

V. Pray for us, O holy Mother of God.
R. That we may be made worthy of the promises of Christ.

Let us pray:
Pour forth, we beseech Thee, O Lord, Thy grace into our hearts; that we, to whom the Incarnation of Christ, Thy Son, was made known by the message of an Angel, may by His Passion and Cross be brought to the glory of His Resurrection. Through the same Christ our Lord. Amen.`,
    scripturalOrTraditionOrigin: 'Commemoration of the Annunciation and Incarnation recited when the church bells chime thrice daily.',
    usageTime: '6:00 AM, 12:00 PM, and 6:00 PM daily'
  },
  {
    id: 'prayer-anima-christi',
    title: 'Anima Christi (Soul of Christ)',
    latinTitle: 'Anima Christi',
    category: 'Eucharistic and Adoration',
    englishText: `Soul of Christ, sanctify me.
Body of Christ, save me.
Blood of Christ, inebriate me.
Water from the side of Christ, wash me.
Passion of Christ, strengthen me.
O good Jesus, hear me.
Within Thy wounds hide me.
Suffer me not to be separated from Thee.
From the malicious enemy defend me.
In the hour of my death call me.
And bid me come unto Thee,
That with Thy saints I may praise Thee,
Forever and ever. Amen.`,
    latinText: `Ánima Christi, sanctífica me.
Corpus Christi, salva me.
Sanguis Christi, inébria me.
Aqua láteris Christi, lava me.
Pássio Christi, confórta me.
O bone Iesu, exáudi me.
Intra tua vúlnera abscónde me.
Ne permíttas me separári a te.
Ab hoste malígno defénde me.
In hora mortis meae voca me.
Et iube me veníre ad te,
ut cum Sanctis tuis laudem te
in saécula saeculórum. Amen.`,
    scripturalOrTraditionOrigin: '14th-century Eucharistic prayer popularized by St. Ignatius of Loyola in the Spiritual Exercises.',
    usageTime: 'Thanksgiving after receiving Holy Communion'
  },
  {
    id: 'prayer-act-of-contrition',
    title: 'Act of Contrition',
    latinTitle: 'Actus Contritionis',
    category: 'Daily and Traditional',
    englishText: `O my God, I am heartily sorry for having offended Thee,
and I detest all my sins because of Thy just punishments,
but most of all because they offend Thee, my God,
who art all good and deserving of all my love.
I firmly resolve, with the help of Thy grace,
to sin no more and to avoid the near occasion of sin. Amen.`,
    scripturalOrTraditionOrigin: 'Sacramental formula for the Sacrament of Reconciliation (Confession) and nightly examination of conscience.',
    usageTime: 'During Confession and nightly examination of conscience'
  },
  {
    id: 'prayer-requiem-aeternam',
    title: 'Prayer for the Holy Souls in Purgatory',
    latinTitle: 'Requiem Aeternam',
    category: 'Prayers for the Faithful Departed',
    englishText: `Eternal rest grant unto them, O Lord,
and let perpetual light shine upon them.
May the souls of all the faithful departed,
through the mercy of God, rest in peace. Amen.`,
    latinText: `Réquiem aetérnam dona eis, Dómine,
et lux perpétua lúceat eis.
Requiéscant in pace. Amen.`,
    scripturalOrTraditionOrigin: 'From 2 Maccabees 12:46; traditional liturgical prayer for deceased relatives and holy souls.',
    usageTime: 'Daily for deceased loved ones and souls in purgatory'
  },
  {
    id: 'prayer-spiritual-communion',
    title: 'Act of Spiritual Communion',
    latinTitle: 'Actus Communionis Spiritualis',
    category: 'Eucharistic and Adoration',
    englishText: `My Jesus,
I believe that You are present in the Most Holy Sacrament.
I love You above all things,
and I desire to receive You into my soul.
Since I cannot at this moment receive You sacramentally,
come at least spiritually into my heart.
I embrace You as if You were already there
and unite myself wholly to You.
Never permit me to be separated from You. Amen.`,
    latinText: `Iesu mi, credo te esse praesentem in sanctissimo Sacramento.
Amo te super omnia, et te recipere cupio in animam meam.
Quoniam te sacramentaliter nunc recipere nequeo,
veni saltem spiritualiter in cor meum.
Amplector te quasi iam venisses,
et me totum tibi unio;
ne permittas me umquam a te separari. Amen.`,
    scripturalOrTraditionOrigin: 'Composed by Saint Alphonsus Maria de Liguori, Bishop and Doctor of the Church (1696–1787). Reaffirmed by the Council of Trent.',
    usageTime: 'When unable to attend Holy Mass or receive sacramental Communion, and during Eucharistic Adoration'
  },
  {
    id: 'prayer-holy-trinity',
    title: 'Prayer to the Holy Trinity',
    latinTitle: 'Oratio ad Sanctissimam Trinitatem',
    category: 'Daily and Traditional',
    englishText: `Most Holy Trinity, Godhead indivisible, Father, Son and Holy Spirit, our first beginning and our last end, since Thou hast made us after Thine Own image and likeness, grant that all the thoughts of our minds, all the words of our tongues, all the affections of our hearts and all our actions may be always conformed to Thy most holy will, to the end that after having seen Thee here below in appearances and in a dark manner by the means of faith, we may come at last to contemplate Thee face-to-face in the perfect possession of Thee for ever in Paradise. Amen.`,
    scripturalOrTraditionOrigin: 'Traditional Catholic prayer of adoration and conformity to the Divine Will addressed to the Most Holy and Undivided Trinity.',
    usageTime: 'Morning and Evening Devotion, Trinity Sunday, Daily Prayer'
  },
  {
    id: 'prayer-lord-god-almighty',
    title: 'Lord, God Almighty',
    latinTitle: 'Domine, Deus omnipotens',
    category: 'Daily and Traditional',
    englishText: `Lord God Almighty, who hast brought us safely to the beginning of this day, defend us today by Thy mighty power, that we may not fall into any sin, but that all our thoughts, words, and works may be directed to the fulfillment of Thy holy will. Through Christ our Lord. Amen.`,
    latinText: `Dómine Deus omnípotens, qui ad princípium huius diéi nos perveníre fecísti: tua nos hódie salva virtúte; ut in hac die ad nullum declinémus peccátum, sed semper ad tuam iustítiam faciéndam nostra procédat elóquium, dirigántur cogitatiónes et ópera. Per Dóminum nostrum Iesum Christum Fílium tuum, qui tecum vivit et regnat in unitáte Spíritus Sancti, Deus, per ómnia saécula saeculórum. Amen.`,
    scripturalOrTraditionOrigin: 'Roman Breviary Collect for Prime (Traditional Morning Liturgical Prayer of the Church).',
    usageTime: 'First thing in the morning upon waking'
  },
  {
    id: 'prayer-morning-offering',
    title: 'Morning Offering',
    latinTitle: 'Oblatio Cotidiana',
    category: 'Daily and Traditional',
    englishText: `O Jesus, through the Immaculate Heart of Mary, I offer You my prayers, works, joys, and sufferings of this day for all the intentions of Your Sacred Heart, in union with the Holy Sacrifice of the Mass throughout the world, for the salvation of souls, the reparation of sins, the reunion of all Christians, and in particular for the intentions of the Holy Father this month. Amen.`,
    scripturalOrTraditionOrigin: 'Composed by Fr. François-Xavier Gautrelet, S.J. in 1844 for the Apostleship of Prayer (Pope\'s Worldwide Prayer Network).',
    usageTime: 'Every morning upon rising'
  },
  {
    id: 'prayer-holy-spirit',
    title: 'Prayer to the Holy Spirit',
    latinTitle: 'Veni Sancte Spiritus',
    category: 'Daily and Traditional',
    englishText: `Come, Holy Spirit, fill the hearts of your faithful and kindle in them the fire of your love. Send forth your Spirit and they shall be created, and you shall renew the face of the earth.

Let us pray. 

O God, who by the light of the Holy Spirit, did instruct the hearts of the faithful, grant that by the same Holy Spirit we may be truly wise, and ever rejoice in His consolation. Through Christ Our Lord. Amen.`,
    latinText: `Veni, Sancte Spíritus, reple tuórum corda fidélium, et tui amóris in eis ignem accénde. Emítte Spíritum tuum et creabúntur, et renovábis fáciem terrae.

Orémus.
Deus, qui corda fidélium Sancti Spíritus illustratióne docuísti: da nobis in eódem Spíritu recta sápere, et de eius semper consolatióne gaudére. Per Christum Dóminum nostrum. Amen.`,
    scripturalOrTraditionOrigin: 'Psalm 104:30 and the Roman Missal Collect of Pentecost; ancient invocation of the Paraclete.',
    usageTime: 'Before study, prayer, discernment, and daily work'
  },
  {
    id: 'prayer-angels-prayer-fatima',
    title: 'The Angel’s Prayer',
    latinTitle: 'Oratio Angeli Pacis (Fatima)',
    category: 'Eucharistic and Adoration',
    englishText: `O Most Holy Trinity, Father, Son, and Holy Spirit, I adore Thee profoundly. I offer Thee the most precious Body, Blood, Soul, and Divinity of Jesus Christ present in all the tabernacles of the world, in reparation for the outrages, sacrileges, and indifferences by which He is offended. By the infinite merits of the Sacred Heart of Jesus and the Immaculate Heart of Mary, I beg the conversion of poor sinners.`,
    scripturalOrTraditionOrigin: 'Taught by the Angel of Peace in autumn 1916 at Fatima, Portugal, to Lucia dos Santos and Saints Francisco and Jacinta Marto before the Blessed Sacrament.',
    usageTime: 'During Eucharistic Adoration, before the Tabernacle, and in reparation'
  },
  {
    id: 'prayer-pardon-prayer-fatima',
    title: 'The Pardon Prayer',
    latinTitle: 'Oratio Veniae (Fatima)',
    category: 'Eucharistic and Adoration',
    englishText: `My God, I believe, I adore, I hope, and I love You! I beg pardon for those who do not believe, do not adore, do not hope, and do not love You.`,
    scripturalOrTraditionOrigin: 'Taught by the Angel of Peace in spring 1916 at the Loca do Cabeço in Fatima, Portugal, to the three shepherd children.',
    usageTime: 'Daily aspiration of faith, adoration, hope, charity, and reparation'
  },
  {
    id: 'prayer-consecration-holy-family',
    title: 'Act of Consecration to the Holy Family',
    latinTitle: 'Actus Consecrationis Sanctae Familiae',
    category: 'Daily and Traditional',
    englishText: `O Jesus, our most loving Savior! Thou Who was sent down from Heaven to enlighten the world by Thy teaching and example, and Who didst will to pass the greater part of Thy holy life in Nazareth, subject to Mary and Joseph, and thereby didst hallow the household which was to be the pattern for all Christian families, do Thou in Thy goodness receive our household which this day consecrates itself to Thee. Protect and guard us, strengthen us in Thy holy fear, establish in our hearts the peace and concord of Christian Charity, so that each one of us becoming like the Divine model of Thy family, may be sharers of eternal joy.
	O Mary, most loving Mother of Jesus Christ, our Mother, through thy love and mercy intercede, that Jesus receives this act of Consecration, and pour out upon us His graces and blessings.
	O Joseph, most holy Guardian of Jesus and Mary, help us by thy prayers in all our necessities, both of body and soul; that together with the Blessed Virgin Mary and thyself we shall praise and thank Jesus Christ, our Divine Redeemer. 
	(Recite the Our Father, Hail Mary and Glory Be three times.) Amen.`,
    scripturalOrTraditionOrigin: 'Traditional Catholic family consecration approved by Pope Leo XIII to place Christian households under the patronage of Jesus, Mary, and Joseph.',
    usageTime: 'Feast of the Holy Family and daily family prayer'
  },
  {
    id: 'prayer-divine-praises',
    title: 'Divine Praises',
    latinTitle: 'Laudes Divinae',
    category: 'Eucharistic and Adoration',
    englishText: `Blessed be God.
Blessed be his Holy Name.
Blessed be Jesus Christ, 
true God and true man.
Blessed be the name of Jesus.
Blessed be his Most Sacred Heart. 
Blessed be his Most Precious Blood. 
Blessed be Jesus in the Most Holy Sacrament of the altar.
Blessed be the Holy Spirit the Paraclete. 
Blessed be the great Mother of God, 
Mary Most Holy.
Blessed be her holy and 
Immaculate Conception. 
Blessed be her glorious Assumption. 
Blessed be the name of Mary, 
Virgin and Mother.
Blessed be St. Joseph, 
her most chaste spouse.
Blessed be God 
in his Angels and in his Saints.`,
    scripturalOrTraditionOrigin: 'Composed by Fr. Luigi Felici, S.J. in 1797 as an act of reparation for blasphemy and profanity; recited during Eucharistic Benediction.',
    usageTime: 'During Benediction of the Most Blessed Sacrament and after Holy Mass'
  },
  {
    id: 'prayer-shoulder-wound-of-christ',
    title: 'Prayer to the shoulder wound of Christ',
    latinTitle: 'Oratio ad Plagam Humeri Christi',
    category: 'Daily and Traditional',
    englishText: `Most loving Jesus, meek Lamb of God, I, a miserable sinner, salute and worship the most sacred wound of Thy shoulder on which Thou didst bear Thy heavy cross which so tore Thy flesh and laid bare Thy bones as to inflict on Thee an anguish greater than any other wound of Thy most blessed body. I adore Thee, O Jesus most sorrowful; I praise and glorify Thee, and give Thee thanks for this most sacred and painful wound, beseeching Thee by that exceeding pain, and by the crushing burden of Thy heavy cross to be merciful to me, a sinner, to forgive me all my mortal and venial sins, and to lead me on towards heaven along the Way of Thy Cross. Amen.`,
    scripturalOrTraditionOrigin: 'Attributed to Saint Bernard of Clairvaux from the Annals of Clairvaux, honoring the hidden wound inflicted by the Cross on Our Lord\'s shoulder.',
    usageTime: 'Fridays, Lent, Stations of the Cross, and daily penitential devotion'
  },
  {
    id: 'prayer-three-hail-marys',
    title: 'The three Hail Marys',
    latinTitle: 'Tres Ave Maria',
    category: 'Marian',
    englishText: `With all my heart I praise thee, Most Holy Virgin, above all angels and saints in paradise, Daughter of the Eternal Father, and I consecrate to thee my soul with all its faculties. Hail Mary . . .
	By thy holy and Immaculate Conception, O Mary, make my body pure and my soul holy; preserve me this day/night from mortal sin.
	With all my heart I praise thee, Most Holy Virgin, above all angels and saints in paradise, beloved Mother of the Son of God, and I consecrate to thee my body with all its senses. Hail Mary . . .
	By thy holy and Immaculate Conception, O Mary, make my body pure and my soul holy; preserve me this day/night from mortal sin.
	With all my heart I praise thee, Most Holy Virgin, above all angels and saints in paradise, beloved Spouse of the Holy Ghost, and I consecrate to thee my heart with all its affections, and beseech thee to obtain for me from the Most Holy Trinity all the graces necessary for salvation. Hail Mary . . .
	By thy holy and Immaculate Conception, O Mary, make my body pure and my soul holy; preserve me this day/night from mortal sin.`,
    scripturalOrTraditionOrigin: 'Revealed to Saint Mechtilde and promoted by Saint Anthony of Padua, Saint Leonard of Port Maurice, and Saint Alphonsus Liguori for purity and final perseverance.',
    usageTime: 'Every morning upon waking and every night before retiring'
  },
  {
    id: 'prayer-spiritual-armor',
    title: 'Prayer of spiritual armor',
    latinTitle: 'Armatura Dei',
    category: 'Saints and Intercession',
    englishText: `Heavenly Father, I come before You today, seeking Your protection from all that is evil.
	I ask that You surround me with Your heavenly angels, and that You shield me from all attacks, both physical and spiritual.
	May the armor of God protect me in every moment, and may Your grace be my constant defense. In the name of Jesus Christ, I pray. Amen.`,
    scripturalOrTraditionOrigin: 'Rooted in Ephesians 6:10-18 ("Put on the armor of God so that you may be able to stand firm against the tactics of the devil").',
    usageTime: 'Daily morning prayer for spiritual protection'
  },
  {
    id: 'prayer-deliverance',
    title: 'Deliverance Prayer',
    latinTitle: 'Oratio Liberationis',
    category: 'Saints and Intercession',
    englishText: `O Jesus our Savior, my Lord and my God, my God and my all, with your sacrifice on the Cross you redeemed us and defeated the power of Satan. I beg you to deliver me from every evil presence and every evil influence.
	I ask you in your name, I ask you for the sake of your wounds, I ask you for the sake of your blood, I ask you for the sake of your Cross, I ask you through the intercession of Mary, Immaculate and Sorrowful.
	May the blood and the water that flow from your side wash over me to purify me, deliver me, heal me. Amen.`,
    scripturalOrTraditionOrigin: 'Traditional Catholic prayer of deliverance invoking the Holy Name, Precious Blood, Sacred Wounds, and Cross of Jesus alongside Our Lady of Sorrows.',
    usageTime: 'During times of temptation, spiritual oppression, or interior trial'
  },
  {
    id: 'prayer-binding-laity',
    title: 'Binding Prayer (Laity)',
    latinTitle: 'Oratio Ligationis pro Laicis',
    category: 'Saints and Intercession',
    englishText: `In the Holy Name of Jesus, and through the power of His precious blood, I ask Almighty God to bind each and every demon coming against me or trying to affect me in any way. In Jesus’ name may they be bound and cast out. I ask God to render them all deaf, dumb, blind, and powerless. In Jesus’ name, may He make them incapable of tempting, tormenting, afflicting or harming me. I ask the Blessed Virgin Mary to spread her mantle of protection over me. I ask the Holy Angels to surround me, and with the sword of truth, keep out the evil spirits. I ask the Blood of Jesus to wash over me and protect me. May it wash over this place, making it a sacred space, free of all evil. Amen.`,
    scripturalOrTraditionOrigin: 'Deprecatory prayer of spiritual protection for the lay faithful, asking Almighty God in the Holy Name of Jesus and through His Precious Blood to protect against evil.',
    usageTime: 'When seeking spiritual protection for oneself and one\'s home'
  },
  {
    id: 'prayer-august-queen',
    title: 'The August Queen Prayer',
    latinTitle: 'Augusta Regina Caelorum',
    category: 'Marian',
    englishText: `August Queen of the Heavens, Heavenly Sovereign of the Angels, thou who from the beginning received from God the power and the mission to crush the head of Satan, we humbly beseech thee, to send thy holy legions so that, under thy command and through thy power, they may pursue the demons, combat them everywhere, suppress their boldness and drive them back into the abyss. 
	“Who is like unto God?” 
	O good and tender Mother, thou shalt always be our love and our hope! 
	O Divine Mother, send thy holy Angels to defend us and drive far away from us the cruel enemy. 
	All ye holy Angels and Archangels, defend us and guard us. Amen. 
	Holy Angels and Archangels defend us, protect us. Amen.`,
    latinText: `Augústa Regína caelórum, supérna Dómina Angelórum, quae ab inítio a Deo accepísti potestátem et missiónem ad conteréndum caput Sátanae, súpplices te deprecámur, ut mittas legiónes tuas caeléstes, ut sub tuo império et tua virtúte daémones persequántur, ubíque eos oppúgnent, eórum audáciam réprimant et in abýssum retrúdant. Quis ut Deus? O bona et ténera Mater, tu semper eris amor et spes nostra! O divína Mater, mitte sanctos Ángelos tuos ad defendéndum nos, et ad repelléndum longe a nobis crudélem inimícum. Sancti Ángeli et Archángeli, deféndite nos, custodíte nos. Amen.`,
    scripturalOrTraditionOrigin: 'Dictated by the Blessed Virgin Mary to Venerable Father Louis-Édouard Cestac on January 13, 1864, and indulgenced by Pope St. Pius X in 1908.',
    usageTime: 'Daily Marian and Angelic prayer for spiritual defense'
  },
  {
    id: 'prayer-st-joseph-terror-of-demons',
    title: 'Prayer to St. Joseph',
    latinTitle: 'Sancte Ioseph, Terror Daemonum',
    category: 'Saints and Intercession',
    englishText: `St. Joseph, terror of demons, cast your solemn gaze upon the devil and all his minions and protect us with your mighty staff. You fled through the night to avoid the devil’s wicked designs; now with the power of God, smite the demons as they flee from you! Grant special protection, we pray, for children, fathers, families, and the dying. By God’s grace, no demon dares approach while you are near, so we beg of you, always be near to us! Amen.`,
    scripturalOrTraditionOrigin: 'Devotional invocation honoring Saint Joseph under his traditional litany title "Terror of Demons" (Terror Daemonum), protector of the Holy Family and universal Church.',
    usageTime: 'Wednesdays, March, and daily for protection of families, fathers, children, and the dying'
  }
];


