import stPetersImg from '../assets/images/pilgrimage_st_peters_vatican_1795370664776.jpg';
import holySepulchreImg from '../assets/images/pilgrimage_holy_sepulchre_jerusalem_1795370665113.jpg';
import nativityImg from '../assets/images/pilgrimage_nativity_bethlehem_1795370664242.jpg';
import lourdesImg from '../assets/images/pilgrimage_lourdes_grotto_1795370665514.jpg';
import fatimaImg from '../assets/images/pilgrimage_fatima_sanctuary_1795370665718.jpg';
import guadalupeImg from '../assets/images/pilgrimage_guadalupe_mexico_1795370664696.jpg';
import assisiImg from '../assets/images/pilgrimage_assisi_basilica_1795370664830.jpg';
import santiagoImg from '../assets/images/pilgrimage_santiago_compostela_1795370665195.jpg';

export type PilgrimageRegion =
  | 'All Shrines'
  | 'Holy Land'
  | 'Rome & Italy'
  | 'Marian Shrines'
  | 'Apostolic Ways';

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
  'Apostolic Ways',
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
    region: 'Apostolic Ways',
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
];
