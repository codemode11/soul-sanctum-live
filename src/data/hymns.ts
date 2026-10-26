import { CatholicHymn } from '../types';

export const CATHOLIC_HYMNS_DATABASE: CatholicHymn[] = [
  {
    id: 'hymn-tantum-ergo',
    title: 'Tantum Ergo Sacramentum',
    latinTitle: 'Tantum Ergo',
    composerOrEra: 'Composed by Saint Thomas Aquinas (1264 AD)',
    liturgicalSeasonOrUse: 'Eucharistic Adoration and Benediction of the Blessed Sacrament',
    audioFrequencyBase: 146.83, // D3
    latinLyrics: `Tantum ergo Sacraméntum
Venerémur cérnui:
Et antíquum documéntum
Novo cedat rítui:
Praestet fides suppleméntum
Sénsuum deféctui.

Genitóri, Genitóque
Laus et iubilátio,
Salus, honor, virtus quoque
Sit et benedíctio:
Procedénti ab utróque
Compar sit laudátio. Amen.`,
    englishTranslation: `Down in adoration falling,
Lo! the sacred Host we hail,
Lo! o'er ancient forms departing
Newer rites of grace prevail;
Faith for all defects supplying,
Where the feeble senses fail.

To the Everlasting Father,
And the Son Who reigns on high
With the Holy Ghost proceeding
Forth from Each eternally,
Be salvation, honor, blessing,
Might, and endless majesty. Amen.`,
    theologicalContext: 'The final two stanzas of the hymn Pange Lingua, composed by the Angelic Doctor St. Thomas Aquinas for the newly instituted Feast of Corpus Christi at the request of Pope Urban IV in 1264.',
    tags: ['Eucharist', 'Adoration', 'Aquinas', 'Benediction']
  },
  {
    id: 'hymn-salve-regina',
    title: 'Salve Regina (Hail Holy Queen - Solemn Tone)',
    latinTitle: 'Salve Regina (Tonus Solemnis)',
    composerOrEra: 'Attributed to Blessed Hermann of Reichenau (c. 1050 AD)',
    liturgicalSeasonOrUse: 'Compline (Night Prayer) and conclusion of the Holy Rosary',
    audioFrequencyBase: 130.81, // C3
    latinLyrics: `Salve, Regína, Mater misericórdiae,
vita, dulcédo, et spes nostra, salve.
Ad te clamámus éxsules fílii Evae.
Ad te suspirámus, geméntes et flentes
in hac lacrimárum valle.

Eia ergo, advocáta nostra,
illos tuos misericórdes óculos ad nos convérte.
Et Iesum, benedíctum fructum ventris tui,
nobis post hoc exsílium osténde.
O clemens, o pia, o dulcis Virgo María.`,
    englishTranslation: `Hail, holy Queen, Mother of mercy,
our life, our sweetness, and our hope.
To thee do we cry, poor banished children of Eve.
To thee do we send up our sighs,
mourning and weeping in this valley of tears.

Turn then, most gracious advocate,
thine eyes of mercy toward us,
and after this our exile,
show unto us the blessed fruit of thy womb, Jesus.
O clement, O loving, O sweet Virgin Mary.`,
    theologicalContext: 'One of the four solemn Marian antiphons of the Western Church, chanted at the end of Compline throughout Ordinary Time. In monasteries, friars chant this in darkness by candlelight before retiring.',
    tags: ['Marian', 'Compline', 'Gregorian Chant', 'Rosary']
  },
  {
    id: 'hymn-panis-angelicus',
    title: 'Panis Angelicus (Bread of Angels)',
    latinTitle: 'Panis Angelicus',
    composerOrEra: 'Saint Thomas Aquinas (1264 AD) / César Franck (1872)',
    liturgicalSeasonOrUse: 'Holy Mass and Communion of the Faithful',
    audioFrequencyBase: 164.81, // E3
    latinLyrics: `Panis angélicus
Fit panis hóminum;
Dat panis caélicus
Figúris términum:
O res mirábilis!
Mandúcat Dóminum
Pauper, servus et húmilis.

Te trina Déitas
Únaque póscimus:
Sic nos tu vísita,
Sicut te cólimus;
Per tuas sémitas
Duc nos quo téndimus,
Ad lucem quam inhábitas. Amen.`,
    englishTranslation: `The angelic bread
Becomes the bread of men;
The heavenly bread puts an end
To all symbols:
O wondrous thing!
The poor, the slave, and the humble
Feed upon their Lord.

O threefold Deity,
We beseech You:
Visit us even
As we worship You;
Along Your paths
Lead us to where we strive,
To the light wherein You dwell. Amen.`,
    theologicalContext: 'Stanza from St. Thomas Aquinas\'s hymn Sacris Solemniis. It marvels at the astounding humility of Almighty God who gives Himself as sustenance to poor mortals.',
    tags: ['Eucharist', 'Communion', 'Aquinas', 'Chant']
  },
  {
    id: 'hymn-ubi-caritas',
    title: 'Ubi Caritas et Amor (Where Charity and Love Are)',
    latinTitle: 'Ubi Caritas',
    composerOrEra: '8th Century Gallican / Paulinus of Aquileia (c. 796 AD)',
    liturgicalSeasonOrUse: 'Holy Thursday (Mass of the Lord\'s Supper - Washing of the Feet)',
    audioFrequencyBase: 146.83, // D3
    latinLyrics: `Ubi cáritas et amor, Deus ibi est.
Congregávit nos in unum Christi amor.
Exsultémus, et in ipso iucundémur.
Timeámus, et amémus Deum vivum.
Et ex corde diligámus nos sincéro.

Ubi cáritas et amor, Deus ibi est.
Simul ergo cum in unum congregámur:
Ne nos mente dividámur, caveámus.
Cessent iúrgia malígna, cessent lites.
Et in médio nostri sit Christus Deus.

Ubi cáritas et amor, Deus ibi est. Amen.`,
    englishTranslation: `Where true charity and love are, God is there.
Christ\'s love has gathered us into one.
Let us rejoice and be pleased in Him.
Let us fear, and let us love the living God.
And may we love each other with a sincere heart.

Where true charity and love are, God is there.
As we are gathered together into one,
Let us beware lest we be in mind divided.
Let bitter quarrels cease, let strife cease,
And in the midst of us be Christ our God.

Where true charity and love are, God is there. Amen.`,
    theologicalContext: 'Chanted during the Mandatum (Washing of the Feet) at the Mass of the Lord\'s Supper on Holy Thursday, emphasizing fraternal charity and ecclesial unity.',
    tags: ['Holy Thursday', 'Charity', 'Chant', 'Triduum']
  },
  {
    id: 'hymn-adoro-te-devote',
    title: 'Adoro Te Devote (Hidden God, Devoutly I Adore Thee)',
    latinTitle: 'Adoro Te Devote',
    composerOrEra: 'Saint Thomas Aquinas (c. 1260 AD)',
    liturgicalSeasonOrUse: 'Thanksgiving after Holy Communion and Eucharistic Adoration',
    audioFrequencyBase: 130.81, // C3
    latinLyrics: `Adóro te devóte, latens Déitas,
Quae sub his figúris vere látitas:
Tibi se cor meum totum súbicit,
Quia te contémplans totum déficit.

Visus, tactus, gustus in te fállitur,
Sed audítu solo tuto créditur:
Credo quidquid dixit Dei Fílius:
Nil hoc verbo Veritátis vérius.

In cruce latébat sola Déitas,
At hic latet simul et humánitas;
Ambo tamen credens atque cónfitens,
Peto quod petívit latro paénitens. Amen.`,
    englishTranslation: `Hidden God, devoutly I adore Thee,
Truly present underneath these veils:
All my heart subdues itself before Thee,
Since all fullness in Thy presence fails.

Sight, touch, and taste in Thee are all deceived,
The hearing only safely is believed:
I believe whatever God\'s own Son has spoken:
Nothing is truer than this Word of Truth.

Upon the Cross Thy Godhead was concealed,
Here Thy humanity is hidden too;
Yet both believing, both in faith confessed,
I ask for what the dying thief requested. Amen.`,
    theologicalContext: 'Dictated by St. Thomas Aquinas on his deathbed at the Cistercian Abbey of Fossanova. A supreme theological poem professing unshakeable faith in the Real Presence despite the failure of human senses.',
    tags: ['Eucharist', 'Aquinas', 'Contemplation', 'Faith']
  },
  {
    id: 'hymn-veni-creator',
    title: 'Veni Creator Spiritus (Come, Creator Spirit)',
    latinTitle: 'Veni Creator Spiritus',
    composerOrEra: 'Attributed to Rabanus Maurus (9th Century)',
    liturgicalSeasonOrUse: 'Pentecost, Holy Orders, Papal Conclaves, and Solemn Beginnings',
    audioFrequencyBase: 174.61, // F3
    latinLyrics: `Veni, Creátor Spíritus,
Mentes tuórum vísita,
Imple supérna grátia,
Quae tu creásti péctora.

Qui díceris Paráclitus,
Altíssimi donum Dei,
Fons vivus, ignis, cáritas,
Et spiritális únctio.

Hostem repéllas lóngius,
Pacémque dones prótinus:
Ductóre sic te praévio
Vitémus omne nóxium. Amen.`,
    englishTranslation: `Come, Holy Ghost, Creator blest,
And in our hearts take up Thy rest;
Come with Thy grace and heavenly aid
To fill the hearts which Thou hast made.

O Comforter, to Thee we cry,
Thou gift of God sent from on high,
Thou fount of life, and fire of love,
And sweet anointing from above.

Far from us drive our deadly foe;
True peace unto our spirits show;
With Thee for our unerring guide,
No evil can our steps betide. Amen.`,
    theologicalContext: 'The most famous invocation of the Holy Spirit in Christendom, chanted by Cardinals entering the Sistine Chapel conclave and at the ordination of every Catholic priest and bishop.',
    tags: ['Holy Spirit', 'Pentecost', 'Chant', 'Conclave']
  }
];
