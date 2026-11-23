import stPetersImg from '../assets/images/pilgrimage_st_peters_vatican_1795370664776.jpg';
import holySepulchreImg from '../assets/images/pilgrimage_holy_sepulchre_jerusalem_1795370665113.jpg';
import nativityImg from '../assets/images/pilgrimage_nativity_bethlehem_1795370664242.jpg';
import lourdesImg from '../assets/images/pilgrimage_lourdes_grotto_1795370665514.jpg';
import fatimaImg from '../assets/images/pilgrimage_fatima_sanctuary_1795370665718.jpg';
import guadalupeImg from '../assets/images/pilgrimage_guadalupe_mexico_1795370664696.jpg';
import assisiImg from '../assets/images/pilgrimage_assisi_basilica_1795370664830.jpg';
import santiagoImg from '../assets/images/pilgrimage_santiago_compostela_1795370665195.jpg';
import medjugorjeImg from '../assets/images/pilgrimage_medjugorje_shrine_1795409713765.jpg';
import krakowMercyImg from '../assets/images/pilgrimage_krakow_mercy_1795409713798.jpg';
import chartresImg from '../assets/images/pilgrimage_chartres_cathedral_1795409712698.jpg';
import montSaintMichelImg from '../assets/images/pilgrimage_mont_saint_michel_1795409713662.jpg';
import sevenChurchesImg from '../assets/images/pilgrimage_seven_churches_1795409713805.jpg';
import zeitounImg from '../assets/images/pilgrimage_zeitoun_egypt_1795409713708.jpg';

export type PilgrimageRegion =
  | 'All Shrines'
  | 'Holy Land'
  | 'Rome & Italy'
  | 'Marian Shrines'
  | 'European Sanctuaries'
  | 'Apostolic & Biblical';

export interface PilgrimageStop {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  scriptureRef: string;
  scriptureText: string;
  narrative: string;
  spiritualReflection: string;
  prayer: string;
}

export interface PilgrimageSite {
  id: string;
  indexLabel: string;
  name: string;
  shortName: string;
  location: string;
  country: string;
  region: Exclude<PilgrimageRegion, 'All Shrines'>;
  patronOrMystery: string;
  founded: string;
  feastDay: string;
  imageSrc: string;
  imageCaption: string;
  placesQuery: string;
  placesFallbackQuery: string;
  summary: string;
  historicalOverview: string;
  pilgrimTradition: string;
  spiritualGraceNote: string;
  officialTourUrl: string;
  officialTourLabel: string;
  secondaryPortalUrl?: string;
  secondaryPortalLabel?: string;
  shrinePrayerTitle: string;
  shrinePrayer: string;
  stops: PilgrimageStop[];
}

export const PILGRIMAGE_REGIONS: PilgrimageRegion[] = [
  'All Shrines',
  'Holy Land',
  'Rome & Italy',
  'Marian Shrines',
  'European Sanctuaries',
  'Apostolic & Biblical',
];

export const VIRTUAL_PILGRIMAGE_SITES: PilgrimageSite[] = [
  {
    id: 'st-peters-basilica',
    indexLabel: '01',
    name: "St. Peter's Basilica & Vatican City",
    shortName: "St. Peter's Basilica",
    location: 'Vatican City, Rome',
    country: 'Vatican City',
    region: 'Rome & Italy',
    patronOrMystery: 'Tomb of St. Peter, Prince of the Apostles',
    founded: '324 AD (Constantinian) · 1626 (Present Basilica)',
    feastDay: 'June 29 — Solemnity of Sts. Peter & Paul',
    imageSrc: stPetersImg,
    imageCaption:
      "Fig. 01 — Piazza San Pietro, Bernini's embracing travertine colonnade, and Michelangelo's dome rising above the Confession of St. Peter.",
    placesQuery: "St. Peter's Basilica Vatican City",
    placesFallbackQuery: 'Piazza San Pietro Vatican City Rome',
    summary:
      'Stand at the heart of Catholic unity where the Prince of the Apostles gave his final witness to Christ and where the Chair of Peter endures across two millennia.',
    historicalOverview:
      "Built directly above the first-century Vatican Hill necropolis where St. Peter was crucified and buried during Nero's persecution (c. 64–67 AD), the present basilica succeeded Emperor Constantine's fourth-century shrine. Bramante, Michelangelo, Maderno, and Bernini raised a sanctuary whose geometry proclaims the universality of the Church.",
    pilgrimTradition:
      "Crossing Bernini's colonnade, pausing before Michelangelo's Pietà, professing the Nicene Creed at the Confession of St. Peter, and praying for the intentions of the Roman Pontiff.",
    spiritualGraceNote:
      "Pilgrims to the Papal Basilicas of Rome traditionally pray the Creed, Our Father, Hail Mary, and Glory Be for the Holy Father's intentions, uniting their hearts with the universal Church.",
    officialTourUrl: 'https://www.basilicasanpietro.va/en',
    officialTourLabel: "Official St. Peter's Basilica Virtual Portal",
    secondaryPortalUrl: 'https://www.vatican.va/various/basiliche/san_pietro/vr_tour/index-en.html',
    secondaryPortalLabel: 'Vatican 360° Basilica Tour',
    shrinePrayerTitle: 'Prayer at the Tomb of St. Peter',
    shrinePrayer:
      'Lord Jesus Christ, You built Your Church upon the rock of Peter’s confession of faith and promised that the gates of hell shall never prevail against it. Strengthen the Holy Father, unite Your faithful throughout the world in truth and charity, and grant us the courage of the Apostles to witness to Your Resurrection. Amen.',
    stops: [
      {
        id: 'stp-1',
        stepNumber: '01',
        title: "Piazza San Pietro & Bernini's Colonnade",
        subtitle: 'The Maternal Arms of the Universal Church',
        scriptureRef: 'Isaiah 2:2–3',
        scriptureText:
          'In days to come, the mountain of the Lord’s house shall be established as the highest mountain; all nations shall stream toward it.',
        narrative:
          'Approaching from the Via della Conciliazione, the pilgrim enters the sweeping elliptical embrace of Gian Lorenzo Bernini’s 284 travertine columns. Bernini deliberately designed the twin semicircular colonnades as the maternal arms of Mother Church welcoming every nation, sinner, and seeker into communion with Christ. At the center stands the Egyptian obelisk that once overlooked the Circus of Nero, mute witness to St. Peter’s martyrdom, now crowned with a bronze cross holding a relic of the True Cross.',
        spiritualReflection:
          'Pause at the threshold of the square and offer gratitude for the Catholicity of the Church—one faith, one baptism, one altar shared across every continent and century.',
        prayer:
          'O God, who gather Your scattered children into the unity of Your Church, welcome all who seek Your face today into the embrace of Your mercy. Amen.',
      },
      {
        id: 'stp-2',
        stepNumber: '02',
        title: "Michelangelo's Pietà & the Holy Door",
        subtitle: 'Contemplating the Sorrowful Mother at the Entrance',
        scriptureRef: 'Luke 2:35',
        scriptureText: 'And you yourself a sword will pierce so that the thoughts of many hearts may be revealed.',
        narrative:
          'Just inside the right aisle, beside the sealed bronze Holy Door opened during Jubilee Years, rests Michelangelo Buonarroti’s marble Pietà, sculpted when the master was only twenty-four. Carrara marble softens into living grief and serene surrender: the youthful Virgin Mary holds the lifeless body of her crucified Son across her lap, her left hand quietly turned upward in an invitation to behold the cost of our redemption.',
        spiritualReflection:
          'Bring before Our Lady of Sorrows any quiet grief, illness, or family cross you carry. Learn from her open palm how sorrow offered to God becomes redemptive love.',
        prayer:
          'Holy Mary, Mother of Sorrows, teach us to remain steadfast beneath the Cross of your Son and to trust in the dawn of His Resurrection. Amen.',
      },
      {
        id: 'stp-3',
        stepNumber: '03',
        title: 'The Papal Altar, Baldacchino & Confession of St. Peter',
        subtitle: 'Above the First-Century Fisherman’s Tomb',
        scriptureRef: 'Matthew 16:18–19',
        scriptureText:
          'And so I say to you, you are Peter, and upon this rock I will build my church, and the gates of the netherworld shall not prevail against it.',
        narrative:
          'Soaring ninety-five feet above the Papal Altar, Bernini’s bronze Baldacchino frames the exact vertical axis between Michelangelo’s dome and the modest first-century burial ground far beneath the floor. Ninety-nine oil lamps burn perpetually around the sunken Confession balustrade. Below, archaeological excavations confirmed the red-walled Trophy of Gaius and the venerated bones of the Galilean fisherman who wept bitterly, received Christ’s threefold commission to “feed my sheep,” and sealed his fidelity upside-down on a Roman cross.',
        spiritualReflection:
          'Peter was not chosen because he never stumbled, but because he repented and loved the Lord above all. Renew your own Creed here in full confidence in Christ’s mercy.',
        prayer:
          'I believe in one, holy, catholic, and apostolic Church. Lord, You know everything; You know that I love You. Keep me faithful to Your Gospel until the end. Amen.',
      },
      {
        id: 'stp-4',
        stepNumber: '04',
        title: 'The Altar of the Chair & Chapel of the Blessed Sacrament',
        subtitle: 'Light of the Holy Spirit and Eucharistic Adoration',
        scriptureRef: 'John 21:17',
        scriptureText: 'Jesus said to him, “Feed my sheep.”',
        narrative:
          'In the apse beyond the Papal Altar glows the alabaster window of the Holy Spirit—a luminous dove radiating golden light above the bronze Cathedra Petri upheld by four Doctors of the Eastern and Western Church: Sts. Ambrose, Augustine, Athanasius, and John Chrysostom. Before departing, pilgrims kneel in silence inside the side Chapel of the Blessed Sacrament, where Christ Himself abides in the golden tabernacle, the true center of Rome and of the entire cosmos.',
        spiritualReflection:
          'Spend a quiet moment in spiritual adoration before the tabernacle. Entrust the Pope, your bishop, your parish priests, and your own vocation to the fire of the Holy Spirit.',
        prayer:
          'Come, Holy Spirit, illuminate the Church with Your truth. Lord Jesus in the Most Blessed Sacrament, we adore You, we praise You, and we consecrate our lives to You. Amen.',
      },
    ],
  },
  {
    id: 'church-of-the-holy-sepulchre',
    indexLabel: '02',
    name: 'Church of the Holy Sepulchre',
    shortName: 'Holy Sepulchre',
    location: 'Christian Quarter, Old City, Jerusalem',
    country: 'Holy Land',
    region: 'Holy Land',
    patronOrMystery: 'Calvary (Golgotha) & the Empty Tomb of the Resurrection',
    founded: '335 AD (Consecrated under St. Helena & Constantine)',
    feastDay: 'Easter Sunday & September 14 — Exaltation of the Holy Cross',
    imageSrc: holySepulchreImg,
    imageCaption:
      'Fig. 02 — The limestone courtyard and arched Crusader portals of the Basilica of the Holy Sepulchre enclosing both Golgotha and the Tomb of Christ.',
    placesQuery: 'Church of the Holy Sepulchre Old City Jerusalem',
    placesFallbackQuery: 'Holy Sepulchre Jerusalem',
    summary:
      'Enter the holiest sanctuary in all of Christendom, enclosing beneath one ancient roof both the rocky summit of Golgotha and the Empty Tomb of Easter morning.',
    historicalOverview:
      'When St. Helena journeyed to Jerusalem in 326 AD, local Christian memory preserved the exact quarry outside the first-century city walls where Jesus was crucified and buried in Joseph of Arimathea’s nearby garden tomb. Emperor Constantine erected the Anastasis Rotunda and Martyrion basilica in 335 AD; rebuilt by the Crusaders in the twelfth century, the basilica remains the living liturgical heartbeat of Easter.',
    pilgrimTradition:
      'Kissing the Stone of Anointing, ascending the narrow stone steps to touch the living bedrock of Calvary beneath the altar, and kneeling inside the Aedicule of the Empty Tomb.',
    spiritualGraceNote:
      'Here the Passion and Resurrection are separated by scarcely forty paces—reminding every pilgrim that the Cross and the Empty Tomb are one indivisible mystery of salvation.',
    officialTourUrl: 'https://www.custodia.org/en/sanctuaries/holy-sepulchre/',
    officialTourLabel: 'Custody of the Holy Land — Official Shrine Guide',
    secondaryPortalUrl: 'https://christianmediacenter.org/',
    secondaryPortalLabel: 'Christian Media Center Jerusalem',
    shrinePrayerTitle: 'Easter Prayer at the Empty Tomb',
    shrinePrayer:
      'Risen Lord Jesus, by Your Precious Blood shed upon Golgotha and Your glorious triumph from this stone tomb, You have conquered sin and death forever. Roll away every stone of fear and despair from our hearts, that we may walk in the newness of Your Resurrection. Amen.',
    stops: [
      {
        id: 'hs-1',
        stepNumber: '01',
        title: 'The Parvis Courtyard & Stone of Anointing',
        subtitle: 'Threshold of Myrrh, Aloes, and Silent Reverence',
        scriptureRef: 'John 19:39–40',
        scriptureText:
          'Nicodemus brought a mixture of myrrh and aloes weighing about one hundred pounds. They took the body of Jesus and bound it with burial cloths along with the spices.',
        narrative:
          'Stepping across the sun-warmed stone parvis and through the weathered twelfth-century double portal, the pilgrim encounters the scent of rose oil, beeswax, and centuries of incense. Directly inside lies the reddish-pink limestone Stone of Anointing, illuminated by eight hanging sanctuary lamps. Faithful from every rite kneel here to kiss the cool stone and lay rosaries upon it in remembrance of the loving hands that prepared the Lord’s wounded body for burial.',
        spiritualReflection:
          'Every act of tender mercy shown to the suffering, the forgotten, and the dying continues the ministry of Nicodemus, Joseph of Arimathea, and the holy women.',
        prayer:
          'Lord Jesus, wounded for our transgressions, grant us tender hands and compassionate hearts to care for Your suffering members in the world today. Amen.',
      },
      {
        id: 'hs-2',
        stepNumber: '02',
        title: 'Calvary — The Rock of Golgotha',
        subtitle: 'Where the Cross Was Raised Between Heaven and Earth',
        scriptureRef: 'John 19:17–18, 30',
        scriptureText:
          'Going out to what is called the Place of the Skull, in Hebrew, Golgotha, there they crucified him. When Jesus had taken the wine, he said, “It is finished.”',
        narrative:
          'A steep staircase to the right climbs fourteen feet onto the natural limestone outcrop of Golgotha. Divided into the Franciscan Chapel of the Nailing to the Cross (Station XI) and the Greek Orthodox Altar of the Crucifixion (Station XII), the bedrock remains visibly split by the Good Friday earthquake. Kneeling beneath the altar, pilgrims reach through a silver-rimmed opening to touch the actual rock socket where the Cross of our Savior stood.',
        spiritualReflection:
          'Look closely upon the cleft rock of Calvary. Nothing you have ever done is beyond the reach of the mercy poured out on this hill.',
        prayer:
          'We adore You, O Christ, and we praise You, because by Your holy Cross You have redeemed the world. Have mercy on us and on the whole world. Amen.',
      },
      {
        id: 'hs-3',
        stepNumber: '03',
        title: 'The Anastasis Rotunda & the Holy Aedicule',
        subtitle: '“He Is Not Here, for He Has Been Raised”',
        scriptureRef: 'Matthew 28:5–6',
        scriptureText:
          'Do not be afraid! I know that you are seeking Jesus the crucified. He is not here, for he has been raised just as he said. Come and see the place where he lay.',
        narrative:
          'Beneath the vast sunlit oculus of the Anastasis (“Resurrection”) Rotunda stands the freestanding marble shrine of the Aedicule. Passing first through the Chapel of the Angel—where a pedestal preserves a fragment of the rolling stone—the pilgrim stoops through a low doorway into the narrow inner burial chamber. Only four people can kneel at once beside the marble-clad limestone bench where Christ’s body lay until the glory of Easter dawn.',
        spiritualReflection:
          'Stoop in humility as Peter and John stooped on Easter morning. Let the silence of the Empty Tomb quiet every anxiety about mortality, failure, or tomorrow.',
        prayer:
          'Christ is risen! Truly He is risen! Lord of life, anchor my hope in Your Empty Tomb and raise my soul to live always for heaven. Amen.',
      },
      {
        id: 'hs-4',
        stepNumber: '04',
        title: 'Chapel of St. Helena & Cave of the Finding of the True Cross',
        subtitle: 'Descending into the Roots of Christian Memory',
        scriptureRef: 'Galatians 6:14',
        scriptureText:
          'May I never boast except in the cross of our Lord Jesus Christ, through which the world has been crucified to me, and I to the world.',
        narrative:
          'Descending twenty-nine wide stone steps lined with thousands of medieval pilgrim crosses carved into the limestone walls, one enters the serene Armenian Chapel of St. Helena and, thirteen steps deeper still, the ancient cistern grotto where St. Helena discovered the wood of the True Cross in the fourth century. Here, below the bustle of the upper basilica, quiet prayer rises through cool stone vaults untouched by time.',
        spiritualReflection:
          'Like St. Helena, seek the Cross not as a burden to flee, but as the hidden treasure through which God transforms every trial into eternal glory.',
        prayer:
          'Saint Helena, seeker of the Holy Cross, intercede for us that we may treasure the Cross of Christ above all earthly honors and follow Him with perseverance. Amen.',
      },
    ],
  },
  {
    id: 'basilica-of-the-nativity',
    indexLabel: '03',
    name: 'Basilica of the Nativity',
    shortName: 'Nativity, Bethlehem',
    location: 'Manger Square, Bethlehem',
    country: 'Holy Land',
    region: 'Holy Land',
    patronOrMystery: 'The Incarnation & Birthplace of Our Lord Jesus Christ',
    founded: '339 AD (Constantine) · 565 AD (Rebuilt by Justinian)',
    feastDay: 'December 25 — Solemnity of the Nativity of the Lord',
    imageSrc: nativityImg,
    imageCaption:
      'Fig. 03 — The fortified limestone facade of the Basilica of the Nativity opening onto Manger Square in Bethlehem, the oldest continuously used church in the Holy Land.',
    placesQuery: 'Church of the Nativity Bethlehem',
    placesFallbackQuery: 'Basilica of the Nativity Manger Square Bethlehem',
    summary:
      'Stoop through the Door of Humility into the ancient basilica sheltering the limestone cave where the Eternal Word became flesh and was laid in a manger.',
    historicalOverview:
      'Venerated by Christians since the second century—as attested by St. Justin Martyr and Origen—the Nativity Grotto was enshrined by St. Helena and Constantine and rebuilt in its present five-aisled basilica form by Emperor Justinian in 565 AD. Spared during the Persian invasion of 614 AD because the invaders recognized the Magi in Persian robes on its facade mosaic, its cedar beams and Corinthian columns have sheltered Christmas liturgies for nearly fifteen centuries.',
    pilgrimTradition:
      'Bowing low to enter through the Door of Humility, kneeling at the fourteen-pointed Silver Star inscribed “Hic de Virgine Maria Jesus Christus Natus Est,” and visiting St. Jerome’s cave study.',
    spiritualGraceNote:
      'The low stone doorway physically teaches the posture required for the Incarnation: only those who become small and humble can enter the mystery of Bethlehem.',
    officialTourUrl: 'https://www.custodia.org/en/sanctuaries/bethlehem/',
    officialTourLabel: 'Custody of the Holy Land — Bethlehem Shrine',
    shrinePrayerTitle: 'Prayer at the Grotto of the Nativity',
    shrinePrayer:
      'Eternal Word of the Father, who emptied Yourself to be born of the Virgin Mary in the poverty of Bethlehem’s cave, make our hearts a warm and humble manger for Your dwelling. Grant peace to the Holy Land and to every home throughout the earth. Amen.',
    stops: [
      {
        id: 'nat-1',
        stepNumber: '01',
        title: 'The Door of Humility',
        subtitle: 'Bowing Low to Enter the Mystery of God-With-Us',
        scriptureRef: 'Philippians 2:6–7',
        scriptureText:
          'Though he was in the form of God, he did not regard equality with God something to be grasped. Rather, he emptied himself, taking the form of a slave.',
        narrative:
          'Across Manger Square, the immense original stone lintel of Justinian’s entrance has been progressively narrowed over the centuries into a doorway barely four feet high. Originally reduced to prevent mounted soldiers from riding into the sanctuary, pilgrims cherish it as the Door of Humility. Kings, popes, and travelers alike must bow their heads and bend their backs to cross the threshold.',
        spiritualReflection:
          'What pride, self-reliance, or resentment do I need to lay down at the doorway so I can approach the Christ Child in childlike simplicity?',
        prayer:
          'Lord Jesus, meek and humble of heart, bend my pride before the mystery of Your self-emptying love. Amen.',
      },
      {
        id: 'nat-2',
        stepNumber: '02',
        title: 'The Nave of Justinian & Restored Golden Mosaics',
        subtitle: 'Fifteen Centuries of Unbroken Christmas Praise',
        scriptureRef: 'John 1:14',
        scriptureText:
          'And the Word became flesh and made his dwelling among us, and we saw his glory, the glory as of the Father’s only Son, full of grace and truth.',
        narrative:
          'Inside, forty-four monolithic rosy Bethlehem limestone columns line a majestic five-aisled nave. Trapdoors in the floor reveal fourth-century geometric mosaics from Constantine’s original pavement, while high along the clerestory walls shimmer restored twelfth-century golden glass mosaics depicting the ancestors of Christ, ecumenical councils, and luminous angels advancing toward the sanctuary.',
        spiritualReflection:
          'Generation after generation has walked between these pillars carrying petitions for peace. Join your voice to the unbroken chorus of angels and saints.',
        prayer:
          'Glory to God in the highest, and on earth peace to people of good will. We praise You, we bless You, we adore You, we glorify You. Amen.',
      },
      {
        id: 'nat-3',
        stepNumber: '03',
        title: 'The Grotto of the Nativity & the Fourteen-Pointed Silver Star',
        subtitle: '“Here Jesus Christ Was Born of the Virgin Mary”',
        scriptureRef: 'Luke 2:6–7',
        scriptureText:
          'While they were there, the time came for her to have her child, and she gave birth to her firstborn son. She wrapped him in swaddling clothes and laid him in a manger.',
        narrative:
          'Descending narrow marble steps beneath the high altar, the pilgrim enters a quiet, vaulted limestone cave warmed by hanging silver oil lamps. Set into the white marble beneath the Altar of the Nativity gleams a fourteen-pointed silver star symbolizing the fourteen generations from Abraham to David, David to the Exile, and the Exile to Christ. Its Latin inscription reads simply: HIC DE VIRGINE MARIA JESUS CHRISTUS NATUS EST. Three steps away stands the Chapel of the Manger where Mary laid her newborn Son.',
        spiritualReflection:
          'Touch the bedrock beneath the star in spirit. God did not love humanity from a safe distance; He entered our flesh, our cold night, and our vulnerability.',
        prayer:
          'Infant Jesus of Bethlehem, I adore You in the arms of Mary and Joseph. Be born anew in my heart today and reign as Prince of Peace. Amen.',
      },
      {
        id: 'nat-4',
        stepNumber: '04',
        title: 'Church of St. Catherine & the Cave of St. Jerome',
        subtitle: 'Translating the Living Word Beside the Manger',
        scriptureRef: 'Psalm 119:105',
        scriptureText: 'Your word is a lamp for my feet, a light for my path.',
        narrative:
          'Adjacent to the main basilica rises the Franciscan Church of St. Catherine, from which Bethlehem’s Christmas Midnight Mass is broadcast around the globe. Beneath its cloister lie subterranean caves where St. Jerome lived for more than thirty years (386–420 AD), fasting, praying, and translating the Sacred Scriptures into the Latin Vulgate—convinced that “ignorance of Scripture is ignorance of Christ.”',
        spiritualReflection:
          'Resolve to listen daily to Sacred Scripture with the devotion of St. Jerome, who stayed near the Manger so every word he translated would breathe the warmth of the Incarnation.',
        prayer:
          'Saint Jerome, faithful lover of the Word of God, obtain for us a hunger for Sacred Scripture and grace to live what we read. Amen.',
      },
    ],
  },
  {
    id: 'sanctuary-of-lourdes',
    indexLabel: '04',
    name: 'Sanctuary of Our Lady of Lourdes',
    shortName: 'Our Lady of Lourdes',
    location: 'Lourdes, Hautes-Pyrénées',
    country: 'France',
    region: 'Marian Shrines',
    patronOrMystery: 'Apparitions of the Immaculate Conception to St. Bernadette (1858)',
    founded: '1858 (Apparitions) · 1876 (Basilica Consecrated)',
    feastDay: 'February 11 — Our Lady of Lourdes & World Day of the Sick',
    imageSrc: lourdesImg,
    imageCaption:
      'Fig. 04 — The limestone Grotto of Massabielle beside the Gave de Pau river, framed by the spires of the Basilica of the Immaculate Conception and flickering vigil candles.',
    placesQuery: 'Sanctuary of Our Lady of Lourdes France',
    placesFallbackQuery: 'Grotto of Massabielle Lourdes France',
    summary:
      'Kneel beside the smooth rock of Massabielle where the Immaculate Conception revealed a spring of healing waters and called the world to prayer and penance.',
    historicalOverview:
      'Between February 11 and July 16, 1858, the Blessed Virgin Mary appeared eighteen times to fourteen-year-old Bernadette Soubirous in a damp riverside hollow used for gathering firewood. On March 25, 1858, the Lady clasped her hands, raised her eyes to heaven, and spoke in the local Gascon dialect: “Que soy era Immaculada Councepciou” — “I am the Immaculate Conception.” Seventy-plus scientifically verified miraculous healings and millions of interior conversions have flowed from the spring she bade Bernadette uncover.',
    pilgrimTradition:
      'Touching the rock of the Grotto, drinking and washing in the spring water of Lourdes, joining the twilight Torchlight Marian Procession singing the Lourdes Ave Maria, and serving the sick.',
    spiritualGraceNote:
      'Lourdes is uniquely the sanctuary of the sick and suffering—where wheelchairs lead every procession and spiritual peace is cherished as the greatest miracle of all.',
    officialTourUrl: 'https://www.lourdes-france.org/en/',
    officialTourLabel: 'Official Sanctuary of Our Lady of Lourdes',
    secondaryPortalUrl: 'https://www.lourdes-france.org/en/tv-lourdes/',
    secondaryPortalLabel: 'Live Grotto of Massabielle Camera (TV Lourdes)',
    shrinePrayerTitle: 'Prayer to Our Lady of Lourdes',
    shrinePrayer:
      'O ever-Immaculate Virgin, Mother of Mercy, Health of the Sick, Refuge of Sinners, Comforter of the Afflicted, you know our needs, our troubles, and our sufferings. Look with mercy upon us from the Grotto of Lourdes, obtain for us healing of body and soul, and lead us always to Jesus your Son. Amen.',
    stops: [
      {
        id: 'lrd-1',
        stepNumber: '01',
        title: 'The Grotto of Massabielle',
        subtitle: 'Where Heaven Touched Humble Pyrenean Stone',
        scriptureRef: 'Luke 1:28',
        scriptureText: 'Hail, full of grace! The Lord is with you.',
        narrative:
          'Beside the rushing green waters of the Gave de Pau rises the dark natural cavern of Massabielle. Above a simple stone altar, high in the oval niche where a wild rosebush once bloomed, stands Joseph-Hugues Fabisch’s marble statue of the Lady in white robe and sky-blue sash, golden roses resting on her feet. Millions of pilgrims have walked slowly beneath the overhanging rock, letting their fingertips brush the stone worn glassy smooth by generations of trust.',
        spiritualReflection:
          'Our Lady did not choose a palace in Paris, but a poor, neglected rocky alcove and an asthmatic miller’s daughter. God delights to pour His greatest graces into humble places.',
        prayer:
          'O Mary, conceived without sin, pray for us who have recourse to thee. Heal what is wounded in our bodies, memories, and souls. Amen.',
      },
      {
        id: 'lrd-2',
        stepNumber: '02',
        title: 'The Miraculous Spring & Baths of Lourdes',
        subtitle: '“Go, Drink at the Spring and Wash Yourself There”',
        scriptureRef: 'John 9:7',
        scriptureText: 'Jesus said to him, “Go wash in the Pool of Siloam.” So he went and washed, and came back able to see.',
        narrative:
          'During the ninth apparition on February 25, 1858, Mary instructed Bernadette to dig with her bare hands in the muddy floor of the cave. At first only muddy water trickled forth, yet by the next day a crystal spring flowed abundantly—yielding over 27,000 gallons a day ever since. Behind a glass pane inside the Grotto, pilgrims still glimpse the original spring before approaching the taps and stone baths to recall their Baptismal rebirth in Christ.',
        spiritualReflection:
          'The waters of Lourdes have no magical minerals; their power is the grace of Christ responding to humble, obedient faith. Recall your own Baptismal promises today.',
        prayer:
          'Lord Jesus, Living Water, wash away my sins, renew the grace of my Baptism, and bring comfort and healing to all who are ill today. Amen.',
      },
      {
        id: 'lrd-3',
        stepNumber: '03',
        title: 'The Rosary Basilica & Crypt of the Immaculate Conception',
        subtitle: 'Fifteen Venetian Mosaic Chapels of the Gospel',
        scriptureRef: 'Luke 1:46–49',
        scriptureText:
          'My soul proclaims the greatness of the Lord; my spirit rejoices in God my savior, for he has looked upon his lowly servant.',
        narrative:
          'Built directly above the rock of Massabielle in answer to Our Lady’s request—“Tell the priests that people should come here in procession and have a chapel built”—the Sanctuary rises in three tiered churches. The Byzantine-style Basilica of Our Lady of the Rosary encircles its nave with fifteen radiant mosaic chapels depicting the Joyful, Sorrowful, and Glorious Mysteries, crowned by the towering neo-Gothic Basilica of the Immaculate Conception overhead.',
        spiritualReflection:
          'Mary always holds the Rosary in her hands at Lourdes because the Rosary is the Gospel contemplated through a Mother’s eyes. Offer even a single decade slowly right now.',
        prayer:
          'Queen of the Most Holy Rosary, draw our hearts deeper into the mysteries of Jesus’ life, Passion, and glory. Amen.',
      },
      {
        id: 'lrd-4',
        stepNumber: '04',
        title: 'The Esplanade & Candlelight Marian Procession',
        subtitle: 'Thousands of Flames Lifting One Song into the Night',
        scriptureRef: 'Psalm 141:2',
        scriptureText: 'Let my prayer be incense before you; my uplifted hands an evening offering.',
        narrative:
          'Each evening at nine o’clock from spring through autumn, the vast Esplanade fills with pilgrims from every nation carrying paper-shielded tapers. As the Rosary is prayed in six languages and the refrain “Ave, Ave, Ave Maria!” swells under the Pyrenean stars, thousands lift their glowing candles in unison—a living river of light testifying that faith endures in every age.',
        spiritualReflection:
          'Unite your own vigil candle tonight with the prayers of the sick, caregivers, and families gathered at Lourdes from across the globe.',
        prayer:
          'Ave, Ave, Ave Maria! Immaculate Mother, keep the flame of faith, hope, and charity burning brightly in our homes and in the whole world. Amen.',
      },
    ],
  },
  {
    id: 'sanctuary-of-fatima',
    indexLabel: '05',
    name: 'Sanctuary of Our Lady of Fátima',
    shortName: 'Our Lady of Fátima',
    location: 'Cova da Iria, Fátima',
    country: 'Portugal',
    region: 'Marian Shrines',
    patronOrMystery: 'Apparitions of Our Lady of the Rosary to Sts. Francisco, Jacinta & Lucia (1917)',
    founded: '1917 (Apparitions) · 1953 (Basilica Consecrated)',
    feastDay: 'May 13 — Our Lady of Fátima',
    imageSrc: fatimaImg,
    imageCaption:
      'Fig. 05 — The vast white limestone esplanade of the Cova da Iria leading to the Neo-Baroque Basilica of Our Lady of the Rosary and the Chapel of the Apparitions.',
    placesQuery: 'Sanctuary of Our Lady of Fatima Portugal',
    placesFallbackQuery: 'Cova da Iria Fatima Portugal',
    summary:
      'Walk the Cova da Iria where Our Lady promised the triumph of her Immaculate Heart and entrusted the world with a call to daily Rosary prayer, reparation, and peace.',
    historicalOverview:
      'From May 13 to October 13, 1917—amid the devastation of the First World War—the Blessed Virgin Mary appeared six times above a small holm oak tree to three young shepherd children: Lúcia dos Santos (10), Francisco Marto (9), and Jacinta Marto (7). On October 13, before 70,000 witnesses including skeptical journalists, the Miracle of the Sun confirmed her urgent maternal message of conversion, penance, Eucharistic adoration, and devotion to her Immaculate Heart.',
    pilgrimTradition:
      'Praying the Rosary at the Chapel of the Apparitions, walking the smooth marble penitential path across the Prayer Area, visiting the tombs of Sts. Francisco and Jacinta, and keeping the Five First Saturdays.',
    spiritualGraceNote:
      'Our Lady’s words to Lucia at Fátima remain a perennial consolation: “My Immaculate Heart will be your refuge and the way that will lead you to God.”',
    officialTourUrl: 'https://www.fatima.pt/en',
    officialTourLabel: 'Official Sanctuary of Our Lady of Fátima',
    secondaryPortalUrl: 'https://www.fatima.pt/en/pages/online-transmissions',
    secondaryPortalLabel: 'Live Chapel of the Apparitions Stream',
    shrinePrayerTitle: 'Consecration & Prayer of the Angel of Fátima',
    shrinePrayer:
      'My God, I believe, I adore, I hope and I love Thee! I ask pardon of Thee for those who do not believe, do not adore, do not hope and do not love Thee. O Jesus, it is for love of Thee, for the conversion of sinners, and in reparation for the sins committed against the Immaculate Heart of Mary. Amen.',
    stops: [
      {
        id: 'fat-1',
        stepNumber: '01',
        title: 'The Chapel of the Apparitions (Capelinha)',
        subtitle: 'Exact Site of the Holm Oak Tree in the Cova da Iria',
        scriptureRef: 'Revelation 12:1',
        scriptureText:
          'A great sign appeared in the sky, a woman clothed with the sun, with the moon under her feet, and on her head a crown of twelve stars.',
        narrative:
          'At the spiritual center of the immense open sanctuary stands the humble open-air Chapel of the Apparitions, erected in 1919 on the exact spot where the holm oak tree grew. Inside a glass case atop a marble pillar—marking the precise place where Our Lady stood—rests the beloved cedar statue of Our Lady of Fátima, her golden crown holding the very bullet that struck Pope St. John Paul II on May 13, 1981.',
        spiritualReflection:
          'Listen to Our Lady’s quiet, repeated plea in all six apparitions: “Pray the Rosary every day in order to obtain peace for the world.”',
        prayer:
          'Our Lady of the Rosary of Fátima, take our families, our nations, and our anxious world under the mantle of your Immaculate Heart. Amen.',
      },
      {
        id: 'fat-2',
        stepNumber: '02',
        title: 'The Great Prayer Area & Penitential Path',
        subtitle: 'Walking in Sacrifice for the Conversion of Sinners',
        scriptureRef: 'Colossians 1:24',
        scriptureText:
          'Now I rejoice in my sufferings for your sake, and in my flesh I am filling up what is lacking in the afflictions of Christ on behalf of his body, which is the church.',
        narrative:
          'Stretching across the Cova da Iria—twice the expanse of St. Peter’s Square—the white limestone esplanade is bisected by a polished marble walkway where devout pilgrims travel on their knees in thanksgiving or intercession. Beside the Capelinha burns a glowing brazier of beeswax candles offered for loved ones, while the bronze Monument to the Sacred Heart of Jesus rises above a spring at the plaza’s center.',
        spiritualReflection:
          'Our Lady asked the children to offer their daily duties and small hidden sacrifices with love. What ordinary duty today can you offer as a quiet gift to Jesus?',
        prayer:
          'O my Jesus, forgive us our sins, save us from the fires of hell; lead all souls to heaven, especially those in most need of Thy mercy. Amen.',
      },
      {
        id: 'fat-3',
        stepNumber: '03',
        title: 'Basilica of Our Lady of the Rosary & Tombs of the Seers',
        subtitle: 'Resting Place of Sts. Francisco, Jacinta, and Sister Lúcia',
        scriptureRef: 'Matthew 11:25',
        scriptureText:
          'I give praise to you, Father, Lord of heaven and earth, for although you have hidden these things from the wise and the learned you have revealed them to the childlike.',
        narrative:
          'Built of white limestone from the nearby hills and crowned by a 213-foot bell tower topped with a bronze crown and illuminated cross, the Basilica shelters the simple stone tombs of the three visionaries. On the right rests St. Francisco Marto, who longed above all to “console the Hidden Jesus” in the tabernacle; on the left rest St. Jacinta Marto, consumed by love for sinners, and the Servant of God Sister Lúcia, who faithfully bore the message of Fátima until 2005.',
        spiritualReflection:
          'Francisco and Jacinta reached heroic sanctity before age eleven simply by loving Jesus in the Eucharist and praying fervently for sinners. Holiness is possible at every age.',
        prayer:
          'Saints Francisco and Jacinta Marto, teach us to console Jesus in the Most Blessed Sacrament and to love the Immaculate Heart of Mary with childlike fidelity. Amen.',
      },
      {
        id: 'fat-4',
        stepNumber: '04',
        title: 'Valinhos & the Chapel of the Angel of Peace',
        subtitle: 'Eucharistic Adoration in the Olive Groves of Aljustrel',
        scriptureRef: 'John 6:51',
        scriptureText:
          'I am the living bread that came down from heaven; whoever eats this bread will live forever.',
        narrative:
          'A quiet olive-lined path leads from the basilica toward the shepherds’ village of Aljustrel, passing the Hungarian Stations of the Cross and the rocky outcrop of Loca do Cabeço. Here in 1916, before Mary ever appeared, the Angel of Peace knelt prostrate before a suspended Chalice and Host, teaching the children to adore the Most Holy Trinity and make reparation for outrages against the Blessed Sacrament.',
        spiritualReflection:
          'Before Marian devotion blossoms, the Angel prepares the heart through Eucharistic adoration. Bow in reverence before Christ truly present in every tabernacle on earth.',
        prayer:
          'Most Holy Trinity, Father, Son, and Holy Spirit, I adore Thee profoundly and offer Thee the most precious Body, Blood, Soul, and Divinity of Jesus Christ, present in all the tabernacles of the world. Amen.',
      },
    ],
  },
  {
    id: 'basilica-of-guadalupe',
    indexLabel: '06',
    name: 'Basilica of Our Lady of Guadalupe',
    shortName: 'Our Lady of Guadalupe',
    location: 'Tepeyac Hill, Mexico City',
    country: 'Mexico',
    region: 'Marian Shrines',
    patronOrMystery: 'Apparition of Our Lady of Guadalupe & the Miraculous Tilma (1531)',
    founded: '1531 (Apparition) · 1976 (Modern Basilica)',
    feastDay: 'December 12 — Feast of Our Lady of Guadalupe, Patroness of the Americas',
    imageSrc: guadalupeImg,
    imageCaption:
      'Fig. 06 — Tepeyac Hill, the historic baroque Old Basilica, and the sweeping circular tent-roof New Basilica sheltering St. Juan Diego’s miraculous tilma.',
    placesQuery: 'Basilica of Our Lady of Guadalupe Mexico City',
    placesFallbackQuery: 'Basílica de Santa María de Guadalupe Tepeyac',
    summary:
      'Ascend Tepeyac Hill to gaze upon the miraculous cactus-fiber tilma of St. Juan Diego and hear the tender words of the Mother of the Americas: “Am I not here, who am your Mother?”',
    historicalOverview:
      'In December 1531, ten years after the fall of Tenochtitlan, the Blessed Virgin Mary appeared four times on Tepeyac Hill to St. Juan Diego Cuauhtlatoatzin, an indigenous Nahua convert. Speaking in Nahuatl, she asked for a sacred house where she might show her compassion to all peoples. As a sign for Bishop Juan de Zumárraga, she arranged blooming Castilian roses in midwinter inside Juan Diego’s coarse agave-fiber cloak (tilma); when he unfurled it on December 12, her luminous image stood miraculously imprinted upon fibers that should have disintegrated within twenty years—remaining intact nearly five centuries later.',
    pilgrimTradition:
      'Venerating the original tilma above the high altar, climbing the stone steps of Tepeyac Hill to the Capilla del Cerrito where the winter roses bloomed, and consecrating families to Our Lady of Guadalupe.',
    spiritualGraceNote:
      'The tilma of Guadalupe bridges indigenous and European heritage in a single visual Gospel, bringing nine million souls into the Catholic faith within a decade of 1531.',
    officialTourUrl: 'https://virgendeguadalupe.org.mx/',
    officialTourLabel: 'Official Basilica of Guadalupe Portal',
    shrinePrayerTitle: 'Prayer to Our Lady of Guadalupe',
    shrinePrayer:
      'Our Lady of Guadalupe, Mystical Rose and Mother of the True God for whom we live, look with maternal tenderness upon your children. In every sorrow and uncertainty, let us hear your comforting assurance: “Am I not here, who am your Mother?” Keep us folded in the crossing of your arms and lead us safely to Jesus Christ. Amen.',
    stops: [
      {
        id: 'gua-1',
        stepNumber: '01',
        title: 'The Plaza of the Americas & Historic Old Basilica',
        subtitle: 'Meeting Place of Twenty Million Pilgrims Each Year',
        scriptureRef: 'Song of Songs 2:11–12',
        scriptureText:
          'For see, the winter is past, the rains are over and gone. The flowers appear on the earth, the time of pruning the vines has come.',
        narrative:
          'Framed by the golden baroque dome of the 1709 Old Basilica (now the Expiatory Temple of Christ the King) and the broad circular silhouette of the New Basilica, the Atrium of the Americas welcomes the largest Catholic pilgrimage gathering in the Western Hemisphere. Families arrive from every corner of the Americas carrying banners, fresh red roses, and quiet petitions for healing and reconciliation.',
        spiritualReflection:
          'Our Lady came to Tepeyac during a fractured era of conquest and grief, speaking peace in the native tongue of the poor. Pray for unity and healing across every division today.',
        prayer:
          'Empress of the Americas, gather all nations and families into the peace and justice of your Son’s Kingdom. Amen.',
      },
      {
        id: 'gua-2',
        stepNumber: '02',
        title: 'The Miraculous Tilma of St. Juan Diego',
        subtitle: 'The Living Image Painted by No Human Hand',
        scriptureRef: 'Judith 15:9',
        scriptureText:
          'You are the glory of Jerusalem, the surpassing joy of Israel; you are the splendid boast of our people.',
        narrative:
          'Designed like a desert Tabernacle tent so that 10,000 worshippers have an unobstructed sightline, the New Basilica centers every gaze upon the gold-framed ayate tilma suspended above the main altar. Moving walkways beneath the sanctuary allow pilgrims to pass quietly beneath the cloak: Mary stands before the sun, resting on the crescent moon, her teal-blue mantle sprinkled with the exact constellations of the winter solstice sky of December 1531, and a black maternity sash tied around her waist signaling she carries Christ within her womb.',
        spiritualReflection:
          'Notice Mary’s bowed head and folded hands: she is never the end of worship, but the humble living Tabernacle bringing Christ to the world.',
        prayer:
          'Holy Mary of Guadalupe, Star of the New Evangelization, imprint the image of your Son Jesus upon our hearts as He was imprinted upon the humble tilma of Juan Diego. Amen.',
      },
      {
        id: 'gua-3',
        stepNumber: '03',
        title: 'Capilla del Cerrito — The Summit of Tepeyac Hill',
        subtitle: 'Where Castilian Roses Bloomed in December Frost',
        scriptureRef: 'Isaiah 35:1–2',
        scriptureText:
          'The desert and the parched land will exult; the steppe will rejoice and bloom. They will see the glory of the Lord, the splendor of our God.',
        narrative:
          'Stone staircases lined with terraced gardens climb the rocky flank of Tepeyac Hill to the luminous Capilla del Cerrito. Here, on the frosty morning of December 12, 1531, Mary directed Juan Diego to gather fresh Castilian roses blooming impossibly atop the barren stones. Even today, the quiet courtyard overlooks the expanse of Mexico City like a watchtower of maternal intercession.',
        spiritualReflection:
          'God brings blossoms out of barren winter ground when we trust His timing. Entrust an apparently impossible situation in your life to Our Lady at the summit of Tepeyac.',
        prayer:
          'Mother of the True God, cause flowers of hope, conversion, and mercy to bloom in the barren places of our lives. Amen.',
      },
      {
        id: 'gua-4',
        stepNumber: '04',
        title: 'Chapel of the Well (El Pocito) & Words of Maternal Comfort',
        subtitle: '“Let Nothing Frighten or Grieve Your Heart”',
        scriptureRef: 'John 19:26–27',
        scriptureText:
          'Jesus said to his mother, “Woman, behold, your son.” Then he said to the disciple, “Behold, your mother.”',
        narrative:
          'At the eastern base of Tepeyac stands the jewel-like Baroque Chapel of El Pocito, built over the spring that welled up where Mary met Juan Diego as he hurried to find a priest for his gravely ill uncle, Juan Bernardino. Gently intercepting his anxious detour, Our Lady spoke the immortal words recorded in the Nican Mopohua: “Do not let your heart be troubled... Am I not here, who am your Mother? Are you not under my shadow and protection? Are you not in the crossing of my arms?”',
        spiritualReflection:
          'Repeat Our Lady’s words slowly until anxiety yields to trust: “Am I not here, who am your Mother? What more do you need?”',
        prayer:
          'Saint Juan Diego, humble messenger of Our Lady, pray for us that we may always rest peacefully within the mantle of Mary and hurry to do the will of God. Amen.',
      },
    ],
  },
  {
    id: 'basilica-of-st-francis-assisi',
    indexLabel: '07',
    name: 'Basilica of St. Francis of Assisi',
    shortName: 'Assisi — St. Francis',
    location: 'Assisi, Umbria',
    country: 'Italy',
    region: 'Rome & Italy',
    patronOrMystery: 'Tomb of St. Francis of Assisi & Birthplace of Franciscan Renewal',
    founded: '1228–1253 (Papal Basilica)',
    feastDay: 'October 4 — Memorial of St. Francis of Assisi',
    imageSrc: assisiImg,
    imageCaption:
      'Fig. 07 — The sun-kissed pink Subasio stone arches and twin-tiered Papal Basilica of St. Francis crowning the western spur of Assisi above the Umbrian valley.',
    placesQuery: 'Papal Basilica of Saint Francis of Assisi Italy',
    placesFallbackQuery: 'Basilica di San Francesco Assisi',
    summary:
      'Journey to the Umbrian hillside of Assisi to pray beside the stone tomb of the Poverello, contemplate Giotto’s frescoes, and embrace Gospel poverty and peace.',
    historicalOverview:
      'Begun in 1228 just two years after St. Francis’s death and consecrated by Pope Innocent IV in 1253, the Papal Basilica rises in two distinct churches—the contemplative Romanesque Lower Basilica and the soaring Gothic Upper Basilica—above the hill once called the Hill of Hell, renamed the Hill of Paradise. From the Portiuncula in the valley below to San Damiano’s crucifix, Assisi remains a living school of joy, reconciliation, and love for Christ crucified.',
    pilgrimTradition:
      'Praying in silence at the rough stone crypt of St. Francis, contemplating the San Damiano Cross, visiting the Portiuncula inside St. Mary of the Angels, and praying the Canticle of the Creatures.',
    spiritualGraceNote:
      'St. Francis obtained the celebrated Portiuncula Indulgence from Pope Honorius III with a single desire: “Holy Father, I want to send everybody to heaven.”',
    officialTourUrl: 'https://www.sanfrancescoassisi.org/en/',
    officialTourLabel: 'Official Papal Basilica of St. Francis of Assisi',
    secondaryPortalUrl: 'https://www.porziuncola.org/en/',
    secondaryPortalLabel: 'Basilica of St. Mary of the Angels (Portiuncula)',
    shrinePrayerTitle: 'Prayer Before the Crucifix (St. Francis of Assisi)',
    shrinePrayer:
      'Most High, glorious God, enlighten the darkness of my heart and give me true faith, certain hope, and perfect charity, sense and knowledge, Lord, that I may carry out Your holy and true command. Amen.',
    stops: [
      {
        id: 'ass-1',
        stepNumber: '01',
        title: 'The Hill of Paradise & Piazza Inferiore',
        subtitle: 'Pace e Bene — Peace and All Good',
        scriptureRef: 'Matthew 5:3, 9',
        scriptureText: 'Blessed are the poor in spirit, for theirs is the kingdom of heaven. Blessed are the peacemakers, for they will be called children of God.',
        narrative:
          'Built of pale rose-tinted limestone quarried from Mount Subasio, the double arcades of the Lower Piazza greet pilgrims with the traditional Franciscan greeting: Pax et Bonum—Peace and All Good. Below stretches the olive-carpeted Umbrian plain where Francis walked barefoot preaching repentance, praising God for Brother Sun and Sister Moon, and rebuilding the Church from within through radical fidelity to the Gospel.',
        spiritualReflection:
          'True peace is not merely the absence of noise, but a heart stripped of bitterness and anchored in the goodness of the Creator.',
        prayer:
          'Lord, make me an instrument of Your peace. Where there is hatred, let me sow love; where there is injury, pardon; where there is despair, hope. Amen.',
      },
      {
        id: 'ass-2',
        stepNumber: '02',
        title: 'The Crypt Tomb of St. Francis',
        subtitle: 'Silent Reverence Beside the Poverello of Assisi',
        scriptureRef: 'Galatians 2:19–20',
        scriptureText:
          'I have been crucified with Christ; yet I live, no longer I, but Christ lives in me.',
        narrative:
          'Beneath the low vaulted arches of the Lower Basilica, stone steps descend into a hushed subterranean crypt carved from living bedrock. At the center stands a rough-hewn stone pier housing the sarcophagus of St. Francis, surrounded by the tombs of his four closest companions—Brothers Leo, Angelo, Masseo, and Rufino. A single oil lamp, replenished annually with olive oil donated by a different Italian region, burns steadily before the saint who bore the stigmata of Christ.',
        spiritualReflection:
          'Francis called himself “the little poor man” because he owned nothing and therefore possessed everything in God. Release one unnecessary attachment today.',
        prayer:
          'My God and my All! Saint Francis of Assisi, obtain for us a burning love for Jesus crucified and joyful simplicity of heart. Amen.',
      },
      {
        id: 'ass-3',
        stepNumber: '03',
        title: 'The Upper Basilica & Giotto’s Fresco Cycle',
        subtitle: 'The Gospel Painted in Light and Ultramarine',
        scriptureRef: '2 Corinthians 8:9',
        scriptureText:
          'For your sake he became poor although he was rich, so that by his poverty you might become rich.',
        narrative:
          'Rising above the dim monastic stillness of the Lower Church, the Gothic Upper Basilica floods with Umbrian daylight through tall stained-glass lancets. Along its nave unfold twenty-eight luminous frescoes attributed to Giotto and his workshop—chronicling Francis praying before the San Damiano Cross, renouncing his worldly garments before the bishop, preaching to the birds, receiving Pope Innocent III’s approval, and greeting Sister Death in joyful song.',
        spiritualReflection:
          'Hear again the words spoken to Francis from the Cross of San Damiano: “Francis, go and repair my house.” How is Christ inviting you to help rebuild His Church today through holiness?',
        prayer:
          'Lord Jesus, speak to my heart as You spoke to Francis at San Damiano, and grant me courage to answer Your call without delay. Amen.',
      },
      {
        id: 'ass-4',
        stepNumber: '04',
        title: 'The Portiuncula & Valley of St. Mary of the Angels',
        subtitle: 'Cradle of the Franciscan Order and Gate of Mercy',
        scriptureRef: 'Luke 15:7',
        scriptureText:
          'I tell you, in just the same way there will be more joy in heaven over one sinner who repents than over ninety-nine righteous people who have no need of repentance.',
        narrative:
          'In the green valley directly below Assisi’s walls, enclosed within the grand dome of the Basilica of St. Mary of the Angels, stands a tiny ninth-century fieldstone chapel: the Portiuncula (“Little Portion”). Here Francis repaired the crumbling walls with his own hands, received St. Clare into religious life, gathered the first friars, and died peacefully upon the bare earth on October 3, 1226, singing Psalm 142.',
        spiritualReflection:
          'Like the tiny stone Portiuncula sheltered inside a vast basilica, God values the smallest hidden chapel of a faithful, repentant soul.',
        prayer:
          'Holy Mary of the Angels, Queen of the Franciscan family, welcome us into the mercy of your Son and guide our footsteps along the narrow path of the Gospel. Amen.',
      },
    ],
  },
  {
    id: 'santiago-de-compostela',
    indexLabel: '08',
    name: 'Cathedral of Santiago de Compostela',
    shortName: 'Santiago de Compostela',
    location: 'Santiago de Compostela, Galicia',
    country: 'Spain',
    region: 'Apostolic & Biblical',
    patronOrMystery: 'Tomb of St. James the Greater & Destination of the Camino',
    founded: '814 AD (Discovery of Tomb) · 1075–1211 (Romanesque Cathedral)',
    feastDay: 'July 25 — Feast of St. James the Apostle',
    imageSrc: santiagoImg,
    imageCaption:
      'Fig. 08 — The twin granite baroque spires of the Obradoiro Facade welcoming Camino pilgrims across the sunlit stones of Praza do Obradoiro in Galicia.',
    placesQuery: 'Cathedral of Santiago de Compostela Spain',
    placesFallbackQuery: 'Praza do Obradoiro Santiago de Compostela',
    summary:
      'Arrive at the westernmost apostolic shrine of Europe, where millions of Camino pilgrims have walked for over a thousand years beneath the emblem of the scallop shell.',
    historicalOverview:
      'Tradition holds that St. James the Greater—brother of John, witness to the Transfiguration and Gethsemane, and the first Apostle martyred in Jerusalem (Acts 12:2)—evangelized Roman Hispania before his disciples bore his relics by sea back to Galicia. Rediscovered around 814 AD under a field of stars (Campus Stellae), his tomb became one of the three supreme pilgrimages of Christendom alongside Jerusalem and Rome, uniting Europe along the network of paths known as the Camino de Santiago.',
    pilgrimTradition:
      'Arriving in Praza do Obradoiro with a stamped Pilgrim Credencial, gazing upon Master Mateo’s Portico of Glory, embracing the statue of St. James behind the high altar, descending to his silver reliquary crypt, and witnessing the swinging Botafumeiro.',
    spiritualGraceNote:
      'The Camino reminds every Catholic that all of earthly life is a pilgrimage toward the heavenly Jerusalem—walking lightly, carrying one another’s burdens, and greeting fellow travelers with “Ultreia!” (“Onward and upward!”).',
    officialTourUrl: 'https://catedraldesantiago.es/en/',
    officialTourLabel: 'Official Cathedral of Santiago de Compostela',
    shrinePrayerTitle: 'Pilgrim’s Prayer of St. James (Camino de Santiago)',
    shrinePrayer:
      'Lord God, who guided the footsteps of Your Apostle St. James to the ends of the earth to proclaim the Gospel of Christ, walk beside us on our earthly pilgrimage. Give us strength when the road is steep, gratitude in every companion we meet, and perseverance until we reach our eternal home in You. Amen.',
    stops: [
      {
        id: 'stg-1',
        stepNumber: '01',
        title: 'Praza do Obradoiro & the Pilgrim’s Arrival',
        subtitle: 'Laying Down Staff and Burden Before the Granite Spires',
        scriptureRef: 'Psalm 84:6–8',
        scriptureText:
          'Blessed the man who finds refuge in you, in their own hearts are pilgrim roads. They go from strength to strength and see the God of gods in Zion.',
        narrative:
          'Whether after eight hundred kilometers along the Camino Francés or a quiet journey of the heart from home, every pilgrim steps into the vast granite expanse of Praza do Obradoiro and lifts their eyes to the twin weather-carved baroque towers rising above golden Galician lichen. Backpacks rest upon the paving stones, scallop shells clink softly, and tears of gratitude mingle with quiet joy: the long road has brought the traveler home.',
        spiritualReflection:
          'Every step of fidelity in daily life—even when unseen and weary—is a kilometer walked toward God. Thank Him today for carrying you thus far.',
        prayer:
          'Lord, You have guided my footsteps over hills and valleys. Receive the weariness and gratitude of my journey and renew my spirit in Your presence. Amen.',
      },
      {
        id: 'stg-2',
        stepNumber: '02',
        title: 'The Portico of Glory (Pórtico da Gloria)',
        subtitle: 'Master Mateo’s Stone Symphony of Salvation',
        scriptureRef: 'Revelation 21:3',
        scriptureText: 'Behold, God’s dwelling is with the human race. He will dwell with them and they will be his people.',
        narrative:
          'Just inside the western facade opens one of the supreme treasures of Romanesque sculpture: Master Mateo’s 1188 Portico of Glory. Carved in granite and recently restored to traces of its medieval polychrome gold and lapis, the central tympanum reveals the Risen Christ displaying His glorious wounds surrounded by the four Evangelists, angels carrying the instruments of the Passion, and twenty-four joyful elders tuning medieval stringed instruments—while St. James welcomes travelers from the central column.',
        spiritualReflection:
          'Heaven is not a silent museum; it is a joyful symphony of redeemed humanity gathered around the Wounds of the Risen Lord.',
        prayer:
          'Risen Christ, Door of Salvation, welcome us into the joy of Your saints and tune our lives to the praise of Your glory. Amen.',
      },
      {
        id: 'stg-3',
        stepNumber: '03',
        title: 'The Silver Crypt of St. James & the Pilgrim’s Embrace',
        subtitle: 'Brotherhood with the First Martyred Apostle',
        scriptureRef: 'Mark 10:38–39',
        scriptureText:
          'Jesus said to them, “The cup that I drink, you will drink, and with the baptism with which I am baptized, you will be baptized.”',
        narrative:
          'Descending beneath the baroque baldachin of the High Altar, pilgrims enter the Romanesque crypt housing the chased silver urn containing the relics of St. James the Greater and his disciples Athanasius and Theodore. Ascending the narrow staircase behind the altar, travelers traditionally place both hands warmly upon the gilded shoulders of the thirteenth-century seated statue of the Apostle—an intimate gesture of friendship known as the Abrazo al Apóstol.',
        spiritualReflection:
          'St. James was once an impulsive “Son of Thunder,” yet grace transformed him into the first Apostle to drink Christ’s cup of martyrdom. Ask him to intercede for your own transformation.',
        prayer:
          'Saint James the Greater, Apostle and Martyr, embrace our intentions and present them before the throne of Christ our King. Amen.',
      },
      {
        id: 'stg-4',
        stepNumber: '04',
        title: 'The Pilgrim’s Mass & Swinging of the Botafumeiro',
        subtitle: 'Rising Incense and the Sending Forth (“Ultreia!”)',
        scriptureRef: 'Malachi 1:11',
        scriptureText:
          'From the rising of the sun, even to its setting, my name is great among the nations; and everywhere they bring sacrifice to my name, and a pure offering.',
        narrative:
          'At noon each day, the Cathedral fills for the Pilgrim’s Mass, during which the homelands and starting towns of newly arrived walkers are announced aloud. On major solemnities and designated celebrations, eight tiraboleiros pull thick ropes to swing the monumental silver-plated censer—the Botafumeiro—nearly the full height of the transept vaults, filling the granite nave with clouds of fragrant frankincense as prayers ascend to heaven and pilgrims are sent back into the world as witnesses of mercy.',
        spiritualReflection:
          'The end of every pilgrimage is truly a beginning: strengthened by the Eucharist, we return to our families and communities carrying the fragrance of Christ.',
        prayer:
          'Ultreia et Suseia! Go with us, Lord, as we return to daily life, that our words, work, and charity may always point others toward Your heavenly Kingdom. Amen.',
      },
    ],
  },
  {
    id: 'our-lady-of-medjugorje',
    indexLabel: '09',
    name: 'Shrine of Our Lady of Medjugorje',
    shortName: 'Our Lady of Medjugorje',
    location: 'Medjugorje, Herzegovina',
    country: 'Bosnia & Herzegovina',
    region: 'Marian Shrines',
    patronOrMystery: 'Queen of Peace (Gospa) · Prayer, Fasting & Reconciliation',
    founded: 'June 24, 1981 (First Apparition) · 2024 Vatican Nulla Osta',
    feastDay: 'June 25 — Anniversary of Our Lady, Queen of Peace',
    imageSrc: medjugorjeImg,
    imageCaption:
      'Fig. 09 — Twin pale limestone towers of St. James Parish Church in Medjugorje framed by cypresses and the rocky hillsides of Podbrdo and Križevac.',
    placesQuery: 'St. James Church Medjugorje Bosnia and Herzegovina',
    placesFallbackQuery: 'Medjugorje Bosnia and Herzegovina',
    summary:
      'Ascend rocky Podbrdo and gather at St. James Church where millions have experienced Confession, Eucharistic adoration, and the call of Our Lady, Queen of Peace.',
    historicalOverview:
      'Beginning on June 24, 1981, six young parishioners reported apparitions of the Blessed Virgin Mary as Queen of Peace on Crnica Hill above the village of Medjugorje. Over four decades, this quiet valley has grown into one of the Catholic world’s great centers of Confession, Rosary prayer, fasting, and Eucharistic Adoration—leading the Vatican’s Dicastery for the Doctrine of the Faith in September 2024 to grant a formal Nulla Osta ("The Queen of Peace") approving public devotion and spiritual pilgrimage.',
    pilgrimTradition:
      'Climbing rocky Apparition Hill (Podbrdo) while praying the Joyful and Sorrowful Mysteries, walking the Stations up Cross Mountain (Križevac), going to Confession at St. James Church, and joining evening Adoration.',
    spiritualGraceNote:
      'At the heart of Medjugorje’s spirituality stand five simple Gospel “stones”: daily Rosary prayer, Holy Mass and Adoration, fasting on Wednesdays and Fridays, daily Sacred Scripture, and monthly Confession.',
    officialTourUrl: 'https://www.medjugorje.hr/en/',
    officialTourLabel: 'Official Parish of St. James Medjugorje',
    shrinePrayerTitle: 'Prayer to Our Lady, Queen of Peace (Medjugorje)',
    shrinePrayer:
      'Mary, Mother of Jesus and Queen of Peace, look upon our restless hearts and our divided world. Teach us to pray with our hearts, to seek reconciliation in the Sacrament of Confession, and to adore your Son Jesus in the Eucharist with childlike trust. Obtain peace for our families, our parishes, and all nations. Amen.',
    stops: [
      {
        id: 'med-1',
        stepNumber: '01',
        title: 'Apparition Hill (Podbrdo)',
        subtitle: 'Climbing Bare Limestone Through the Mysteries of the Rosary',
        scriptureRef: 'Luke 1:39–45',
        scriptureText:
          'Mary set out and traveled to the hill country in haste... “Blessed are you who believed that what was spoken to you by the Lord would be fulfilled.”',
        narrative:
          'Rough red-earth footpaths wind upward over sharp, sunlit Herzegovina limestone smoothed by the footsteps of millions of barefoot and sandal-clad pilgrims. Bronze bas-reliefs along the climb invite slow contemplation of the Joyful and Sorrowful Mysteries until one reaches the summit clearing where the white marble statue of Our Lady, Queen of Peace looks out silently over the valley of Medjugorje.',
        spiritualReflection:
          'Prayer is not meant to be rushed; like climbing Podbrdo step by step, persevering faith grows stronger over uneven stone.',
        prayer:
          'Queen of Peace, guide our footsteps up every steep hill of trial and teach us to pray from the depths of our hearts. Amen.',
      },
      {
        id: 'med-2',
        stepNumber: '02',
        title: 'St. James Parish Church & the Evening Rosary',
        subtitle: '“Confessional of the World” and Living Parish Liturgy',
        scriptureRef: 'Acts 1:14',
        scriptureText:
          'All these devoted themselves with one accord to prayer, together with some women, and Mary the mother of Jesus.',
        narrative:
          'Consecrated in 1969 long before the events of 1981, St. James Church opens onto a broad paved courtyard flanked by rows of multilingual confessionals. Every evening at dusk, bells gather thousands into three hours of Rosary, international Holy Mass, Healing Prayer, and hushed Eucharistic Adoration beneath the stars—turning an ordinary village parish into a global school of sacramental conversion.',
        spiritualReflection:
          'When did I last receive the Sacrament of Reconciliation with a sincere, open heart? Mercy is always waiting.',
        prayer:
          'Lord Jesus, Good Shepherd, pour out Your healing forgiveness in the Sacrament of Confession and draw every prodigal child home. Amen.',
      },
      {
        id: 'med-3',
        stepNumber: '03',
        title: 'Cross Mountain (Križevac)',
        subtitle: 'The Twenty-Eight-Foot Concrete Cross Raised in 1934',
        scriptureRef: 'John 19:25–27',
        scriptureText:
          'Standing by the cross of Jesus were his mother... “Behold, your mother.” And from that hour the disciple took her into his home.',
        narrative:
          'Nearly fifty years before 1981, villagers hauled sand, cement, and steel up the steep 1,700-foot summit of Križevac on their backs to erect a monumental cross commemorating the 1900th anniversary of Christ’s Redemption, enshrining a relic of the True Cross inside its beam. Walking the fourteen bronze Stations of the Cross up its slope unites physical exertion with tender gratitude for Calvary.',
        spiritualReflection:
          'Stand beside Mary at the foot of Križevac and entrust one heavy cross in your family to the redemptive triumph of Jesus.',
        prayer:
          'We adore You, O Christ, and we bless You, for by Your holy Cross You have redeemed the world. Grant us grace to carry our daily cross with love. Amen.',
      },
      {
        id: 'med-4',
        stepNumber: '04',
        title: 'The Blue Cross & Chapel of Perpetual Adoration',
        subtitle: 'Silence Before Jesus Truly Present in the Monstrance',
        scriptureRef: 'John 14:27',
        scriptureText:
          'Peace I leave with you; my peace I give to you. Not as the world gives do I give it to you.',
        narrative:
          'At the base of Podbrdo stands the weathered Blue Cross where prayer groups still gather in twilight song, while beside St. James Church opens the quiet Chapel of Adoration. Framed by warm stone and soft candlelight, pilgrims kneel in uninterrupted stillness before the Blessed Sacrament—remembering Our Lady’s constant focus on her Son: “Adore my Son continuously in the Most Holy Sacrament of the Altar.”',
        spiritualReflection:
          'Every authentic Marian shrine leads straight to Jesus in the Eucharist. Rest in His peaceful gaze for a quiet minute right now.',
        prayer:
          'Jesus, Prince of Peace hidden in the Blessed Sacrament, I love You, I adore You, and I place my whole trust in You. Amen.',
      },
    ],
  },
  {
    id: 'shrine-of-divine-mercy-krakow',
    indexLabel: '10',
    name: 'Shrine of Divine Mercy (Kraków, Poland)',
    shortName: 'Shrine of Divine Mercy (Kraków, Poland)',
    location: 'Łagiewniki, Kraków',
    country: 'Poland',
    region: 'European Sanctuaries',
    patronOrMystery: 'St. Faustina Kowalska & World Capital of Divine Mercy',
    founded: '1891 (Convent) · 2002 (Basilica Consecrated by St. John Paul II)',
    feastDay: 'Second Sunday of Easter — Divine Mercy Sunday',
    imageSrc: krakowMercyImg,
    imageCaption:
      'Fig. 10 — The Sanctuary of Divine Mercy in Łagiewniki, Kraków, uniting the historic Sisters of Our Lady of Mercy convent and the modern basilica consecrated by St. John Paul II.',
    placesQuery: 'Sanctuary of Divine Mercy Krakow Lagiewniki Poland',
    placesFallbackQuery: 'Sanktuarium Bozego Milosierdzia Krakow Poland',
    summary:
      'Visit Kraków-Łagiewniki, where Christ revealed the Chaplet and Image of Divine Mercy to St. Faustina and where St. John Paul II entrusted the entire world to God’s mercy.',
    historicalOverview:
      'Within the quiet brick convent of the Congregation of the Sisters of Our Lady of Mercy in Kraków-Łagiewniki, St. Maria Faustina Kowalska spent her final years recording Jesus’ revelations in her Diary: Divine Mercy in My Soul (1934–1938). During the Nazi occupation, a young quarry worker named Karol Wojtyła prayed in this very chapel—returning decades later as Pope St. John Paul II in 2002 to consecrate the new Basilica and solemnly entrust humanity to Divine Mercy.',
    pilgrimTradition:
      'Venerating the miraculous Image of Merciful Jesus (“Jesus, I Trust in You”), praying before St. Faustina’s relics in the Convent Chapel, observing the 3:00 PM Hour of Great Mercy, and praying the Chaplet of Divine Mercy.',
    spiritualGraceNote:
      'Jesus promised St. Faustina that “mankind will not have peace until it turns with trust to My mercy”—a message echoed at every 3:00 PM Hour of Mercy in Kraków.',
    officialTourUrl: 'https://www.faustyna.pl/zmbm/en/',
    officialTourLabel: 'Official Shrine of Divine Mercy (Łagiewniki)',
    secondaryPortalUrl: 'https://www.milosierdzie.pl/en/',
    secondaryPortalLabel: 'Sanctuary of Divine Mercy Basilica Portal',
    shrinePrayerTitle: 'Act of Entrustment & Prayer to Divine Mercy',
    shrinePrayer:
      'Eternal Father, I offer You the Body and Blood, Soul and Divinity of Your dearly beloved Son, Our Lord Jesus Christ, in atonement for our sins and those of the whole world. For the sake of His sorrowful Passion, have mercy on us and on the whole world. Jesus, I trust in You! Amen.',
    stops: [
      {
        id: 'krk-1',
        stepNumber: '01',
        title: 'The Convent Chapel & Image of Merciful Jesus',
        subtitle: '“Jesus, I Trust in You” — Rays of Blood and Water',
        scriptureRef: 'John 20:19–22',
        scriptureText:
          'Jesus came and stood in their midst and said to them, “Peace be with you.” When he had said this, he showed them his hands and his side.',
        narrative:
          'Inside the intimate neo-Gothic convent chapel of St. Joseph gleams Adolf Hyła’s 1944 painting of the Risen Christ striding forward with right hand raised in blessing and left hand parting His tunic over His pierced Heart. From His Heart stream two luminous rays—pale water making souls righteous and red blood giving life to souls—above the immortal petition requested by Christ Himself: Jezu, ufam Tobie.',
        spiritualReflection:
          'Notice that Christ is stepping forward toward you, not retreating in anger. Speak those five words slowly from the heart: “Jesus, I trust in You.”',
        prayer:
          'O Blood and Water, which gushed forth from the Heart of Jesus as a fount of mercy for us, I trust in You! Amen.',
      },
      {
        id: 'krk-2',
        stepNumber: '02',
        title: 'The Reliquary Tomb of St. Faustina Kowalska',
        subtitle: 'Secretary of Divine Mercy (1905–1938)',
        scriptureRef: 'Psalm 136:1',
        scriptureText:
          'Praise the Lord, for he is good, for his mercy endures forever.',
        narrative:
          'Directly beneath the Image of Merciful Jesus rests the white marble sarcophagus containing the relics of St. Faustina, canonized in 2000 as the first saint of the third millennium. Though she served quietly in the convent kitchen, garden, and gatehouse and died at thirty-three from tuberculosis, her humble obedience carried the message of Mercy from Łagiewniki to every nation on earth.',
        spiritualReflection:
          'God chooses hidden, humble souls to renew the whole Church. Offer your hidden labors and patience today in union with St. Faustina.',
        prayer:
          'Saint Faustina, faithful apostle of Divine Mercy, obtain for us an unshakable confidence in the tender compassion of God our Father. Amen.',
      },
      {
        id: 'krk-3',
        stepNumber: '03',
        title: 'The Basilica of Divine Mercy & Papal Altar',
        subtitle: '“The World Will Find Peace Only in Turning to Mercy”',
        scriptureRef: '1 John 4:16',
        scriptureText:
          'We have come to know and to believe in the love God has for us. God is love, and whoever remains in love remains in God and God in him.',
        narrative:
          'Rising beside the old convent like a radiant ship of salvation, the two-story elliptical Basilica—crowned with a 250-foot tower overlooking Kraków—was consecrated by Pope St. John Paul II on August 17, 2002. Beneath the global globe-framed tabernacle sculpted as a bush ablaze with the fire of love, the Pontiff entrusted all peoples and future generations to the merciful Heart of Christ.',
        spiritualReflection:
          'Bring before the Lord any nation, family member, or wound in society that seems beyond repair, entrusting them without reserve to Divine Mercy.',
        prayer:
          'God, merciful Father, in Your Son Jesus Christ You have revealed Your love and poured it out upon us in the Holy Spirit: we entrust to You today the destiny of the world and of every human soul. Amen.',
      },
      {
        id: 'krk-4',
        stepNumber: '04',
        title: 'The Hour of Great Mercy (3:00 PM)',
        subtitle: 'Standing Beneath the Cross in Intercession for Sinners',
        scriptureRef: 'Luke 23:44–46',
        scriptureText:
          'It was now about noon and darkness came over the whole land until three in the afternoon... Jesus cried out in a loud voice, “Father, into your hands I commend my spirit.”',
        narrative:
          'At three o’clock every afternoon, bells across Łagiewniki call pilgrims to pause everything for the Hour of Great Mercy, the moment Christ breathed His last on Calvary and His side was opened by the lance. Through the Chaplet of Divine Mercy prayed on ordinary Rosary beads, believers stand spiritually beside Mary and John to plead for grace for the dying and hardened hearts everywhere.',
        spiritualReflection:
          'Remember today anyone who is dying or feeling unforgivable, and offer one slow decade of the Chaplet of Divine Mercy for their peace.',
        prayer:
          'Holy God, Holy Mighty One, Holy Immortal One, have mercy on us and on the whole world. Amen.',
      },
    ],
  },
  {
    id: 'chartres-cathedral-france',
    indexLabel: '11',
    name: 'Chartres Cathedral (Notre-Dame de Chartres)',
    shortName: 'Chartres Cathedral, France',
    location: 'Chartres, Eure-et-Loir',
    country: 'France',
    region: 'European Sanctuaries',
    patronOrMystery: 'Veil of the Blessed Virgin Mary (Sancta Camisa) & High Gothic Light',
    founded: '1194–1220 (Present Gothic Cathedral) · 876 AD (Relic Arrival)',
    feastDay: 'August 15 & September 8 — Marian Solemnities at Chartres',
    imageSrc: chartresImg,
    imageCaption:
      'Fig. 11 — Chartres Cathedral (Notre-Dame de Chartres) rising above the Beauce plain with its mismatched twin spires, Royal Portal, and renowned Chartres-blue glass.',
    placesQuery: 'Chartres Cathedral France',
    placesFallbackQuery: 'Cathédrale Notre-Dame de Chartres France',
    summary:
      'Step into the luminous stone hymn of High Gothic Christendom, guardian of the Sancta Camisa Marian tunic and 176 original medieval stained-glass windows.',
    historicalOverview:
      'Standing atop an ancient spring sanctified since the dawn of Christianity in Gaul, Chartres was rebuilt in an astonishing burst of faith between 1194 and 1220 after a devastating fire spared the cherished Sancta Camisa—the tunic relic traditionally worn by the Virgin Mary at the Annunciation and Nativity, gifted to Chartres in 876 AD. Guild artisans, nobles, and peasants alike pulled stone carts together to raise one of humanity’s supreme temples of theological light.',
    pilgrimTradition:
      'Making the Pentecost walking pilgrimage from Notre-Dame de Paris to Chartres, walking the ancient stone floor labyrinth in silent prayer, venerating the Sancta Camisa, and contemplating the twelfth-century Madonna of the Pillar.',
    spiritualGraceNote:
      'For medieval Christians, Chartres’ cobalt-blue stained glass was theology made visible—proclaiming that divine light passes cleanly through human fragility without breaking it.',
    officialTourUrl: 'https://www.cathedrale-chartres.org/en/',
    officialTourLabel: 'Official Cathedral of Notre-Dame de Chartres',
    shrinePrayerTitle: 'Pilgrim Prayer of Notre-Dame de Chartres',
    shrinePrayer:
      'Our Lady of Chartres, Star of the Morning and Temple of the Incarnate Word, illuminate the stone of our hearts with the light of grace. As you carried Christ beneath your heart, help us walk the winding path of our lives with steadfast faith until we reach the heavenly Jerusalem. Amen.',
    stops: [
      {
        id: 'chr-1',
        stepNumber: '01',
        title: 'The Royal Portal & Asymmetrical Twin Spires',
        subtitle: 'A Catechism Carved in Living Beauce Limestone',
        scriptureRef: 'Psalm 122:1–2',
        scriptureText:
          'I rejoiced when they said to me, “Let us go to the house of the Lord.” And now our feet are standing within your gates, Jerusalem.',
        narrative:
          'Rising above the golden wheat fields of the Beauce, Chartres’ twin spires embody centuries of living faith: the austere twelfth-century Romanesque Old Tower beside the soaring flamboyant Gothic North Spire. Below, the three carved doorways of the Royal Portal invite pilgrims inside through the majesty of Christ Pantocrator, flanked by serene elongated figures of Old Testament kings, queens, and prophets.',
        spiritualReflection:
          'Notice how two very different towers stand side by side in harmony on one facade: God weaves different temperaments and generations into a single house of praise.',
        prayer:
          'Lord of beauty and truth, establish my steps within Your Church and let my life reflect Your harmony and order. Amen.',
      },
      {
        id: 'chr-2',
        stepNumber: '02',
        title: 'Notre-Dame de la Belle Verrière & Chartres Blue Glass',
        subtitle: 'Light of Christ Illuminating the Sanctuary',
        scriptureRef: 'John 1:4–5',
        scriptureText:
          'What came to be through him was life, and this life was the light of the human race; the light shines in the darkness, and the darkness has not overcome it.',
        narrative:
          'Crossing into the vast nave, the eye is hushed by deep cobalt blues, ruby reds, and emerald greens preserved across eight centuries. Over 26,000 square feet of original medieval stained glass tell the entire drama of salvation—culminating in the twelfth-century window of Notre-Dame de la Belle Verrière (“Our Lady of the Beautiful Window”), where Mary holds the Christ Child amidst luminous angels.',
        spiritualReflection:
          'Just as stained glass stays dark from the outside yet blazes with color when sunlight passes through it from within, grace reveals beauty when God dwells inside the soul.',
        prayer:
          'Christ, Light of the World, shine through every corner of my soul so others may glimpse Your goodness through my life. Amen.',
      },
      {
        id: 'chr-3',
        stepNumber: '03',
        title: 'The Medieval Nave Labyrinth',
        subtitle: 'Eleven Concentric Rings of the Pilgrim’s Journey',
        scriptureRef: 'Psalm 25:4–5',
        scriptureText:
          'Make known to me your ways, Lord; teach me your paths. Guide me by your truth and teach me, for you are God my savior.',
        narrative:
          'Inlaid directly into the limestone floor of the nave around 1200, Chartres’ circular labyrinth spans forty-two feet in alternating white and dark stone. Unlike a maze with dead ends, the single winding 858-foot path leads faithfully to the center rosette—used for centuries as a contemplative “Jerusalem Road” for pilgrims unable to sail to the Holy Land.',
        spiritualReflection:
          'Often in life God’s path curves sharply inward and outward when we expect a straight road. Trust that Christ holds the center and never breaks the thread.',
        prayer:
          'Good Shepherd, even when my path winds through uncertainty, keep me walking steadily toward Your center of peace. Amen.',
      },
      {
        id: 'chr-4',
        stepNumber: '04',
        title: 'The Sancta Camisa & Crypt of Our Lady Under the Earth',
        subtitle: 'Venerating the Sacred Relic in Silent Memory',
        scriptureRef: 'Luke 1:38',
        scriptureText:
          'Mary said, “Behold, I am the handmaid of the Lord. May it be done to me according to your word.”',
        narrative:
          'In the ambulatory treasury reposes the treasured Sancta Camisa, a fine cream silk-and-linen tunic venerated since 876 AD as the garment worn by Mary at Nazareth, carried onto the city ramparts during medieval sieges as a sign of maternal protection. Beneath the choir stretches Europe’s largest cathedral crypt, where candlelight flickers beside Notre-Dame de Sous-Terre and the ancient Well of the Saints-Forts.',
        spiritualReflection:
          'Echo Mary’s Fiat in the silent crypt of your own heart: “Let it be done to me today according to Your word.”',
        prayer:
          'Notre-Dame de Chartres, shelter us under your mantle and teach us your humble “yes” to the will of God. Amen.',
      },
    ],
  },
  {
    id: 'mont-saint-michel',
    indexLabel: '12',
    name: 'Abbey of Mont-Saint-Michel',
    shortName: 'Mont-Saint-Michel',
    location: 'Normandy Coast',
    country: 'France',
    region: 'European Sanctuaries',
    patronOrMystery: 'Sanctuary of St. Michael the Archangel & Monastic Citadel',
    founded: '708 AD (Bishop St. Aubert) · 966 AD (Benedictine Abbey)',
    feastDay: 'September 29 — Feast of Sts. Michael, Gabriel & Raphael, Archangels',
    imageSrc: montSaintMichelImg,
    imageCaption:
      'Fig. 12 — The Abbey of Mont-Saint-Michel crowning its tidal granite peak off Normandy, reflected in golden dawn tidewaters.',
    placesQuery: 'Mont-Saint-Michel Abbey Normandy France',
    placesFallbackQuery: 'Le Mont-Saint-Michel France',
    summary:
      'Cross the tidal sands to the granite sanctuary where St. Michael the Archangel bade St. Aubert raise a monastery—a citadel of prayer rising between sea and sky.',
    historicalOverview:
      'In 708 AD, St. Aubert, Bishop of Avranches, received three visions of the Archangel St. Michael commanding him to build an oratory atop the rocky tidal islet then known as Mont-Tombe. Populated by Benedictine monks in 966 AD and crowned over centuries by Romanesque churches and the Gothic “Marvel” (La Merveille), Mont-Saint-Michel became a beloved Western shrine of spiritual warfare, hospitality, and daily monastic praise.',
    pilgrimTradition:
      'Crossing the shifting bay sands at low tide with a guide toward the Archangel’s golden spire, climbing the 350 abbey steps, praying before the statue of St. Michael, and joining the Monastic Fraternities of Jerusalem for Vespers.',
    spiritualGraceNote:
      'Surrounded twice daily by rushing Atlantic tides yet anchored in solid granite, Mont-Saint-Michel stands as an enduring icon of the soul rooted in God amid the storms of history.',
    officialTourUrl: 'https://www.abbaye-mont-saint-michel.fr/en/',
    officialTourLabel: 'Official Abbey of Mont-Saint-Michel',
    shrinePrayerTitle: 'Prayer to St. Michael at Mont-Saint-Michel',
    shrinePrayer:
      'Saint Michael the Archangel, defend us in battle. Be our protection against the wickedness and snares of the devil. May God rebuke him, we humbly pray; and do thou, O Prince of the Heavenly Host, by the power of God, thrust into hell Satan and all the evil spirits who prowl about the world seeking the ruin of souls. Amen.',
    stops: [
      {
        id: 'msm-1',
        stepNumber: '01',
        title: 'Crossing the Tidal Bay at Dawn',
        subtitle: 'Approaching the Granite Fortress Between Sea and Sky',
        scriptureRef: 'Psalm 91:11–12',
        scriptureText:
          'For he commands his angels with regard to you, to guard you wherever you go. With their hands they shall support you.',
        narrative:
          'Across miles of silver wet sand where Europe’s fastest tides rise and fall, medieval miquelots walked singing psalms toward the silhouette of the Abbey crowned by Emmanuel Frémiet’s gilded statue of St. Michael 500 feet above the sea. Each step across the open flats strips away distraction, turning the horizon itself into a sanctuary of silence and anticipation.',
        spiritualReflection:
          'What shifting anxieties surround your life like rising tides right now? Look upward to the unchanging Rock of God’s faithfulness.',
        prayer:
          'Lord, my Rock and my Fortress, place Your holy angels around my path and anchor my soul against every fear. Amen.',
      },
      {
        id: 'msm-2',
        stepNumber: '02',
        title: 'The Grand Stairway & Abbey Church',
        subtitle: 'Prayer Raised on the Summit of Mount Tumba',
        scriptureRef: 'Revelation 12:7–10',
        scriptureText:
          'Then war broke out in heaven; Michael and his angels battled against the dragon... Now have salvation and power come, and the kingdom of our God.',
        narrative:
          'Ascending the steep fortified granite stairwell known as the Grand Degré between massive stone buttresses, the pilgrim emerges onto the bright West Terrace looking over the Channel before entering the Abbey Church. Built directly atop four colossal masonry crypts supporting the mount’s peak, the Romanesque nave and luminous Flamboyant Gothic choir host daily Mass and liturgical chanting by resident monks and nuns.',
        spiritualReflection:
          'St. Michael’s very name—Mi-ka-El—asks “Who is like God?” Humility, not pride, is the secret victory of every Christian battle.',
        prayer:
          'Saint Michael, Prince of the Heavenly Host, teach us to say with steadfast humility: Who is like God! Grant us courage in every temptation. Amen.',
      },
      {
        id: 'msm-3',
        stepNumber: '03',
        title: 'La Merveille — The Cloister Suspended Over the Sea',
        subtitle: 'Open-Air Monastic Solitude Beneath Double Stone Arcades',
        scriptureRef: 'Psalm 46:2–5',
        scriptureText:
          'God is our refuge and our strength, an ever-present help in distress... A river’s streams gladden the city of God, the holy dwelling of the Most High.',
        narrative:
          'Built across three breathtaking vertical tiers on the northern cliff face between 1204 and 1228, La Merveille culminates in a tranquil thirteenth-century cloister supported by staggered pink and cream Caen limestone columns. Opening onto sheer sea air and gulls wheeling high above the surf, its quiet square courtyard invites prayerful contemplation midway between earth and heaven.',
        spiritualReflection:
          'Carve out a quiet inner cloister amid daily work—a few uninterrupted minutes where only God’s voice is heard.',
        prayer:
          'Be still and know that I am God. Lord of sea and sky, quiet every storm within me and dwell in my heart in peace. Amen.',
      },
      {
        id: 'msm-4',
        stepNumber: '04',
        title: 'Crypt of Our Lady of Thirty Candles & Carolingian Chapel',
        subtitle: 'Ancient Stone Roots of French Christian Devotion',
        scriptureRef: 'Jude 1:20–21',
        scriptureText:
          'Build yourselves up in your most holy faith; pray in the Holy Spirit. Keep yourselves in the love of God and wait for the mercy of our Lord Jesus Christ.',
        narrative:
          'Far beneath the bright upper church endures the dark, pillar-filled crypt of Notre-Dame des Trente Cierges (“Our Lady of Thirty Candles”) alongside the pre-Romanesque tenth-century nave of Notre-Dame-Sous-Terre—the earliest masonry foundations on the mount. Here, lit by warm beeswax candles, pilgrims have knelt for over a millennium uniting devotion to the Queen of Angels with St. Michael’s protection.',
        spiritualReflection:
          'Deep underground foundations carry the entire soaring spire above. Tend your unseen life of daily prayer, charity, and fidelity.',
        prayer:
          'Holy Mary, Queen of Angels, together with St. Michael the Archangel, guard our homes, strengthen the Church, and bring us safely to eternal life. Amen.',
      },
    ],
  },
  {
    id: 'seven-churches-of-revelation',
    indexLabel: '13',
    name: 'Seven Churches of Revelation (Asia Minor)',
    shortName: 'Seven Churches of Revelation',
    location: 'Western Anatolia (Ephesus to Laodicea)',
    country: 'Türkiye',
    region: 'Apostolic & Biblical',
    patronOrMystery: 'Letters of the Risen Christ to the Seven Churches (Rev 1–3)',
    founded: 'First Century AD (Apostolic Age · St. John & St. Paul)',
    feastDay: 'December 27 — Feast of St. John the Apostle & Evangelist',
    imageSrc: sevenChurchesImg,
    imageCaption:
      'Fig. 13 — Sunlit columns and Byzantine brick arches of the Basilica of St. John at Ephesus, first of the Seven Churches addressed in the Book of Revelation.',
    placesQuery: 'Basilica of St. John Ephesus Selcuk Turkey',
    placesFallbackQuery: 'Ephesus Ancient City Selcuk Turkey',
    summary:
      'Trace the ancient Roman postal circuit of western Anatolia—Ephesus, Smyrna, Pergamum, Thyatira, Sardis, Philadelphia, and Laodicea—hearing Christ’s timeless words to the Church.',
    historicalOverview:
      'Exiled on nearby Patmos around 95 AD, the Apostle St. John received the Book of Revelation addressed to seven historic Christian communities forming a clockwise crescent along the imperial road of Roman Asia: Ephesus, Smyrna, Pergamum, Thyatira, Sardis, Philadelphia, and Laodicea. Linked closely to St. Paul’s missionary journeys, St. Ignatius of Antioch, St. Polycarp of Smyrna, and the ancient tradition honoring Ephesus as Mary’s later home, these seven churches mirror the spiritual trials and triumphs of the Church in every age.',
    pilgrimTradition:
      'Meditating sequentially through Revelation Chapters 2–3 while visiting Ephesus (and the nearby House of the Virgin Mary on Mount Coressus), St. Polycarp’s Smyrna, Pergamum, Thyatira, Sardis, Philadelphia, and Laodicea.',
    spiritualGraceNote:
      '“Whoever has ears ought to hear what the Spirit says to the churches”—Christ’s seven letters diagnose our own hearts today with tender honesty and unconquerable hope.',
    officialTourUrl: 'https://whc.unesco.org/en/list/1018/',
    officialTourLabel: 'Ephesus Historic Sanctuary Overview (UNESCO)',
    shrinePrayerTitle: 'Prayer Across the Seven Churches of Revelation',
    shrinePrayer:
      'Lord Jesus Christ, Alpha and Omega, who walk among the seven golden lampstands of Your Church, renew our first love as at Ephesus, give us Smyrna’s courage under trial, wake our hearts from Sardis’ slumber, and open before us Philadelphia’s door of mission. Stand at the door of our hearts today as we welcome You in. Amen.',
    stops: [
      {
        id: 'rev-1',
        stepNumber: '01',
        title: 'Ephesus & Basilica of St. John — Returning to First Love',
        subtitle: 'Church 1 of 7 · Apostle John, St. Paul & Marian Tradition',
        scriptureRef: 'Revelation 2:2, 4–5',
        scriptureText:
          '“I know your works, your labor, and your endurance... Yet I hold this against you: you have lost the love you had at first. Realize how far you have fallen. Repent, and do the works you did at first.”',
        narrative:
          'On Ayasoluk Hill overlooking the marble colonnades of ancient Ephesus rise the brick-and-marble vaults of Emperor Justinian’s sixth-century Basilica built over the tomb of St. John the Evangelist, just miles from the tranquil House of the Virgin Mary (Meryem Ana) on Mount Coressus and the Basilica of the Council of 431 AD that proclaimed Mary Theotokos, Mother of God. Even an orthodox, hardworking church can grow mechanically dutiful if love cools.',
        spiritualReflection:
          'Where has routine replaced tenderness in your prayer or family life? Ask Jesus to rekindle your “first love.”',
        prayer:
          'Lord Jesus, cleanse my heart from weary routine and restore the joyful ardor of my first love for You. Amen.',
      },
      {
        id: 'rev-2',
        stepNumber: '02',
        title: 'Smyrna & Pergamum — Faithful Unto the Crown of Life',
        subtitle: 'Churches 2 & 3 of 7 · Courage in Persecution & Pagan Culture',
        scriptureRef: 'Revelation 2:10, 17',
        scriptureText:
          '“Remain faithful until death, and I will give you the crown of life... To the victor I shall give some of the hidden manna; I shall also give a white amulet upon which is inscribed a new name.”',
        narrative:
          'North along the Aegean coast stands ancient Smyrna (modern İzmir), church of the aged martyr-bishop St. Polycarp—disciple of St. John—to whom Christ had only praise despite poverty and slander. Farther north on a sheer hilltop acropolis sits Pergamum, crowned by monumental pagan altars, where Antipas bore witness unto death and believers were called to resist subtle compromise with idolatry in daily commerce and public life.',
        spiritualReflection:
          'Faithfulness in small hidden choices builds courage for great trials. Pray for persecuted Christians suffering around the world today.',
        prayer:
          'Christ our King, strengthen all Christians enduring persecution and keep us unstained by the idols of our age. Amen.',
      },
      {
        id: 'rev-3',
        stepNumber: '03',
        title: 'Thyatira & Sardis — Watchful Hearts & White Garments',
        subtitle: 'Churches 4 & 5 of 7 · Discernment and Spiritual Awakening',
        scriptureRef: 'Revelation 3:1–3',
        scriptureText:
          '“I know your works, that you have the reputation of being alive, but you are dead. Be watchful and strengthen what is left, which is going to die.”',
        narrative:
          'Inland through fertile Lydian valleys lay prosperous Thyatira—praised for charity and perseverance yet warned against moral complacency—and wealthy Sardis, perched on rugged cliffs twice conquered while its sentries slept overconfident. Excavations beside the colossal Temple of Artemis reveal an early fourth-century Christian chapel tucked quietly against ancient marble columns—a reminder to stay spiritually awake.',
        spiritualReflection:
          'Reputation before the world means nothing if prayer has grown cold inside. What part of my spiritual life needs gentle awakening today?',
        prayer:
          'Holy Spirit, awaken whatever sleeps within my soul and clothe me anew in the grace of my Baptism. Amen.',
      },
      {
        id: 'rev-4',
        stepNumber: '04',
        title: 'Philadelphia & Laodicea — The Open Door & He Who Knocks',
        subtitle: 'Churches 6 & 7 of 7 · Fidelity and Warmth of Heart',
        scriptureRef: 'Revelation 3:8, 20',
        scriptureText:
          '“Look, I have left an open door before you, which no one can close... Behold, I stand at the door and knock. If anyone hears my voice and opens the door, then I will enter his house and dine with him.”',
        narrative:
          'At the eastern arc of the seven-city route stand Philadelphia—the modest, earthquake-tested community promised an unbreakable open door—and prosperous Laodicea, whose aqueducts carried mineral water that arrived lukewarm compared with Hierapolis’s hot springs and Colossae’s cold mountain streams. Yet even to lukewarm Laodicea, Christ speaks not with rejection but tender invitation: standing patiently at the door, knocking for Eucharistic communion.',
        spiritualReflection:
          'Open the door of your daily life to Christ right now. Trade lukewarm hesitation for wholehearted love.',
        prayer:
          'Come in, Lord Jesus! I open the door of my heart to You today; dine with me and make me wholly Yours. Amen.',
      },
    ],
  },
  {
    id: 'our-lady-of-zeitoun-egypt',
    indexLabel: '14',
    name: 'Church of the Virgin Mary, Zeitoun',
    shortName: 'Zeitoun, Egypt',
    location: 'Zeitoun District, Cairo',
    country: 'Egypt',
    region: 'Marian Shrines',
    patronOrMystery: 'Our Lady of Light (1968–1971 Apparitions) · Witnessed by All Peoples',
    founded: '1924 (Church Built) · April 2, 1968 – 1971 (Apparitions of Light)',
    feastDay: 'April 2 — Commemoration of the Apparitions of Our Lady of Zeitoun',
    imageSrc: zeitounImg,
    imageCaption:
      'Fig. 14 — The twin white domes and palm-lined courtyard of St. Mary’s Church in Zeitoun, Cairo, illuminated beneath a serene evening sky.',
    placesQuery: 'St. Mary Church Zeitoun Cairo Egypt',
    placesFallbackQuery: 'Church of the Virgin Mary Zeitoun Cairo',
    summary:
      'Visit Zeitoun in Cairo, along the ancient path of the Holy Family in Egypt, where luminous Marian apparitions above the church domes were witnessed by hundreds of thousands from 1968 to 1971.',
    historicalOverview:
      'Erected in 1924 in northern Cairo near Matariyah—where Christian memory treasures the resting place of the Holy Family during their flight into Egypt—St. Mary’s Coptic Orthodox Church became the focal point of remarkable public Marian apparitions beginning on the night of April 2, 1968, and continuing periodically until 1971. Photographed in newspapers and beheld simultaneously by vast crowds of Coptic Orthodox, Catholic, Protestant, and Muslim Egyptians, the silent figure of the Blessed Virgin Mary bathed in radiant light above the domes moved Coptic Patriarch Cyril VI to issue an official declaration of authenticity, while Catholic authorities—including Cardinal Stephanos I Sidarouss and observers sent on behalf of Pope St. Paul VI—welcomed the extraordinary spiritual renewal and documented healings.',
    pilgrimTradition:
      'Gathering in evening vigil prayer beneath the domes of St. Mary’s in Zeitoun, singing ancient Marian hymns of Egypt, venerating the Holy Family’s pilgrimage route, and praying for Christian unity and peace in the Middle East.',
    spiritualGraceNote:
      'In Zeitoun, Mary never spoke a recorded word aloud—letting silent heavenly light, luminous doves, and healed hearts proclaim the glory of her Son across religious and cultural borders.',
    officialTourUrl: 'https://www.zeitun-eg.org/',
    officialTourLabel: 'Historical Chronicle of St. Mary’s Zeitoun',
    shrinePrayerTitle: 'Prayer to Our Lady of Light (Zeitoun, Egypt)',
    shrinePrayer:
      'O Virgin Mary, Mother of True Light, who blessed the land of Egypt in the Flight of the Holy Family and shone peacefully above the domes of Zeitoun, pour out your gentle light upon darkened and anxious hearts. Heal the sick, strengthen Christians across the Middle East, unite East and West in charity, and lead all nations to Jesus Christ, the Light of the World. Amen.',
    stops: [
      {
        id: 'zei-1',
        stepNumber: '01',
        title: 'The White Domes at Dusk — April 2, 1968',
        subtitle: '“Arise, Shine, for Your Light Has Come”',
        scriptureRef: 'Isaiah 60:1–3',
        scriptureText:
          'Rise up in splendor! Your light has come, the glory of the Lord shines upon you... Nations shall walk by your light, and kings by your shining radiance.',
        narrative:
          'On the evening of April 2, 1968, transit mechanics across the street from St. Mary’s Church noticed a radiant figure draped in white light standing silently beside the central rooftop dome cross. Thinking someone might fall, bystanders shouted in alarm before realizing the luminous figure was not earthly flesh and blood. Night after night for nearly three years, crowds swelling to tens of thousands kept peaceful vigil in the streets until dawn.',
        spiritualReflection:
          'In seasons of national grief or darkness—Zeitoun occurred less than a year after devastating regional war—God sends quiet signs of hope rather than despair.',
        prayer:
          'Lord Jesus, Light from Light, shine upon every city and home weighed down by grief, war, or uncertainty today. Amen.',
      },
      {
        id: 'zei-2',
        stepNumber: '02',
        title: 'Luminous Doves & the Silent Woman Clothed with Light',
        subtitle: 'Heavenly Peace Above the Rooftop Cross',
        scriptureRef: 'Song of Songs 6:10',
        scriptureText:
          'Who is this that comes forth like the dawn, as beautiful as the moon, as resplendent as the sun?',
        narrative:
          'Eyewitnesses—including engineers, journalists, police officers, and visiting bishops—described doves of pure white light gliding swiftly without flapping their wings across the night sky before the appearance of Our Lady, accompanied by sweet clouds of luminous incense rising from the roof. Bowing silently toward the cross atop the main dome and blessing the gathered multitudes in every direction, the Virgin spoke wholly through reverent presence.',
        spiritualReflection:
          'Sometimes the deepest witness is silent reverence before the Cross of Christ rather than many anxious words.',
        prayer:
          'Mary, Temple of the Holy Spirit, teach us to point always to the Cross of your Son through gentle peace and luminous charity. Amen.',
      },
      {
        id: 'zei-3',
        stepNumber: '03',
        title: 'Along the Holy Family’s Egyptian Route',
        subtitle: 'Matariyah, Zeitoun & Ancient Bridges of East and West',
        scriptureRef: 'Matthew 2:13–15',
        scriptureText:
          '“Rise, take the child and his mother, flee to Egypt, and stay there until I tell you.” ... Out of Egypt I called my son.',
        narrative:
          'Zeitoun lies just minutes from historic Matariyah, where ancient Christian tradition recalls the Virgin Mary resting beside a fresh spring and ancient sycamore tree with the Infant Jesus and St. Joseph during Herod’s persecution. Here in Cairo, Coptic, Catholic, and neighboring traditions alike share reverence for the pure Mother of Jesus, creating an extraordinary living bridge of mutual respect.',
        spiritualReflection:
          'Pray today for refugees, displaced families, and Christian unity between Catholic and Eastern Apostolic Churches.',
        prayer:
          'Jesus, Mary, and Joseph, refugees in Egypt, protect every displaced family in our world today and hasten the full visible unity of all Christians. Amen.',
      },
      {
        id: 'zei-4',
        stepNumber: '04',
        title: 'Courtyard Hymns, Healings & Witness Before the Nations',
        subtitle: 'Blessed Among Women Across Generations',
        scriptureRef: 'Luke 1:48–50',
        scriptureText:
          'From now on will all ages call me blessed. The Mighty One has done great things for me, and holy is his name.',
        narrative:
          'Inside the sunlit sanctuary courtyard of Zeitoun, marble plaques and medical commissions—including investigations led by Catholic and Orthodox physicians—recorded numerous unexplained healings among the sick brought during the 1968–1971 vigils. Today, gentle evening hymns still rise among palm trees beside the white limestone facade, reminding pilgrims that Mary’s Magnificat echoes across every language and shore.',
        spiritualReflection:
          'Join your own gratitude to Mary’s Magnificat tonight for one blessing God has quietly worked in your family this week.',
        prayer:
          'My soul proclaims the greatness of the Lord! Thank You, Father, for keeping Your mercy from age to age upon those who trust in You. Amen.',
      },
    ],
  },
];
