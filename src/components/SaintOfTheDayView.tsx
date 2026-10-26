import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check,
  ChevronLeft,
  ChevronRight,
  Calendar,
  BookOpen
} from 'lucide-react';
import { Saint, LiturgicalColor } from '../types';
import { SAINTS_DATABASE } from '../data/saints';
import { LITURGICAL_COLORS_INFO } from '../data/liturgicalCalendar';
import { SacredReader } from '../utils/speech';
import { SaintWithHaloIcon } from './SanctumIcons';

export interface CompanionSaint {
  name: string;
  title: string;
  dates?: string;
  lifespan?: string;
  place?: string;
  shortDescription: string;
}

export interface DailySaintEntry extends Omit<Saint, 'biography' | 'quote' | 'liturgicalColor'> {
  biography: string | string[];
  quote: string | { text: string; source?: string };
  liturgicalColor: LiturgicalColor | string;
  wikiSlug?: string;
  butlerVolume?: string;
  butlerReference?: string;
  companionSaints?: CompanionSaint[];
}

function getBiographyParagraphs(bio: string | string[]): string[] {
  if (Array.isArray(bio)) return bio;
  return String(bio || '')
    .split(/\n\n+/)
    .map(p => p.trim())
    .filter(Boolean);
}

function getQuoteText(quote: string | { text: string; source?: string }): string {
  if (typeof quote === 'string') return quote;
  return quote?.text || '';
}

function normalizeLiturgicalColor(color: string | undefined): LiturgicalColor {
  const lower = (color || 'white').toLowerCase();
  if (lower === 'red' || lower === 'green' || lower === 'violet' || lower === 'rose' || lower === 'black') {
    return lower;
  }
  return 'white';
}

interface SaintOfTheDayViewProps {
  currentMonth?: number;
  currentDay?: number;
}

// Self-contained Butler's Lives of the Saints daily entries so SaintOfTheDayView.tsx works standalone
const BUTLER_LIVES_ENTRIES: Record<string, DailySaintEntry> = {
  '10-24': {
    id: 'anthony-mary-claret',
    name: 'St. Anthony Mary Claret',
    feastDate: 'October 24',
    month: 10,
    day: 24,
    title: 'Bishop, Missionary, and Founder of the Claretians (1807–1870)',
    butlerVolume: "Butler's Lives of the Saints — Vol. IV (October 24)",
    patronage: ['Textiles and Weavers', 'Catholic Press', 'Claretian Missionaries', 'Savings Banks'],
    symbols: ['Episcopal Crozier', 'Missionary Cross', 'Book on Preaching', 'Immaculate Heart of Mary'],
    quote: 'The love of Christ arouses us, urges us to run, and to fly, lifted on the wings of holy zeal.',
    biography: [
      "According to Butler's Lives of the Saints, St. Anthony Mary Claret was born in Sallent, Catalonia, Spain, on December 23, 1807, the fifth of eleven children of a devout woollen manufacturer. After working at his father's looms and studying textile design in Barcelona, he left industry behind to enter the seminary at Vich and was ordained a priest in 1835.",
      "Prevented by ill health from entering the Carthusians or travelling to foreign missions through Propaganda Fide, he became an apostolic missionary across Catalonia and the Canary Islands, preaching up to ten times a day. In 1849, with five other priests, he founded the Missionary Sons of the Immaculate Heart of Mary (the Claretians) and established the great Religious Publishing House in Barcelona, writing or publishing over two hundred works.",
      "Appointed Archbishop of Santiago de Cuba in 1850, he reformed the seminary, validated thousands of marriages, defended poor labourers and enslaved people, and survived a brutal assassination attempt in Holguín that sliced open his cheek. Recalled to Madrid in 1857 as confessor to Queen Isabella II, he lived in austere poverty while evangelizing through the press and preaching. Exiled with the royal court in 1868 and after defending papal infallibility at the First Vatican Council, he died in exile at the Cistercian abbey of Fontfroide in France on October 24, 1870."
    ],
    prayer: 'O God, who for the evangelization of peoples strengthened the Bishop Saint Anthony Mary Claret with admirable charity and long-suffering, grant, through his intercession, that, seeking the things that are yours, we may earnestly devote ourselves to winning our brothers and sisters for Christ. Through Christ our Lord. Amen.',
    liturgicalColor: 'White',
    wikiSlug: 'Anthony_Mary_Claret',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/San_Antonio_Mar%C3%ADa_Claret.jpg/800px-San_Antonio_Mar%C3%ADa_Claret.jpg',
    companionSaints: [
      {
        name: 'St. Felix of Thibiuca and Companions',
        title: 'Bishop and Martyrs in North Africa',
        dates: 'd. 303',
        shortDescription: "In Butler's Lives of the Saints for October 24: Bishop of Thibiuca near Carthage during the persecution of Emperor Diocletian. When ordered by the magistrates to surrender the Sacred Scriptures to be burned, Felix answered, 'It is better that I myself should be burned than the Divine Scriptures,' and was beheaded at Carthage."
      },
      {
        name: 'St. Proclus of Constantinople',
        title: 'Archbishop and Doctor of the Incarnation',
        dates: 'd. 446',
        shortDescription: "In Butler's Lives of the Saints for October 24: Disciple and secretary of St. John Chrysostom who later became Patriarch of Constantinople. Famous for his eloquent homily defending the Virgin Mary's title as Theotokos (Mother of God) against Nestorius and for introducing the Trisagion hymn ('Holy God, Holy Mighty, Holy Immortal') into the liturgy."
      },
      {
        name: 'St. Magloire of Dol',
        title: 'Missionary Bishop and Abbot in Brittany',
        dates: 'c. 495–575',
        shortDescription: "In Butler's Lives of the Saints for October 24: Welsh-born cousin and disciple of St. Samson of Dol. He succeeded Samson as Abbot-Bishop of Dol in Brittany before retiring to the island of Sark to live a life of strict monastic penance, fasting, and evangelization of the Channel Islands."
      }
    ]
  },
  '10-25': {
    id: 'chrysanthus-and-daria',
    name: 'Sts. Chrysanthus and Daria',
    feastDate: 'October 25',
    month: 10,
    day: 25,
    title: 'Martyrs of Rome (d. c. 283)',
    butlerVolume: "Butler's Lives of the Saints — Vol. IV (October 25)",
    patronage: ['Judges', 'Reggio Emilia', 'Married Chaste Couples', 'Catechumens'],
    symbols: ['Palm of Martyrdom', 'Pit of Stones', 'Torch and Crown', 'Lion'],
    quote: 'Christ is our light in the darkness of the dungeon, and His truth no earthly chain can bind.',
    biography: [
      "As recorded as the principal entry in Alban Butler's Lives of the Saints for October 25, Chrysanthus was the son of Polemius, a noble Egyptian senator who moved from Alexandria to Rome during the reign of Emperor Numerian. Educated in rhetoric and philosophy, young Chrysanthus grew dissatisfied with the pagan myths of Rome until he discovered copies of the Gospels and Acts of the Apostles, receiving baptism and instruction from a priest hiding in the catacombs.",
      "Alarmed by his son's conversion, Polemius locked Chrysanthus in a dungeon before placing him in luxurious chambers and sending Daria, a brilliant and learned virgin priestess of Minerva from Athens, to debate him and draw him back to paganism. Instead, Chrysanthus reasoned with Daria on the vanity of idols and the truth of Christ Crucified. Deeply moved, Daria converted to Christianity and was baptized. To protect their freedom to evangelize, they entered into the appearance of marriage while vowing perpetual virginity together.",
      "Chrysanthus drew countless Roman men to the faith, while Daria converted numerous Roman noblewomen. Arrested under the prefect Celerinus and handed to the tribune Claudius, their calm endurance under torture moved Claudius himself, his wife Hilaria, their two sons Jason and Maurus, and seventy soldiers to embrace baptism and martyrdom. By order of Emperor Numerian, Chrysanthus and Daria were led down the Salarian Way to a sandpit, thrown alive into a deep trench, and buried under earth and stones around the year 283."
    ],
    prayer: 'Lord our God, you united Saints Chrysanthus and Daria in the bond of chaste charity and crowned their fearless witness to the Gospel on the Salarian Way; grant through their prayers that we may hold fast to Christ through every trial of life. Through Christ our Lord. Amen.',
    liturgicalColor: 'Red',
    wikiSlug: 'Chrysanthus_and_Daria',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Chrysanthus_and_Daria_Menologion_of_Basil_II.jpg/800px-Chrysanthus_and_Daria_Menologion_of_Basil_II.jpg',
    companionSaints: [
      {
        name: 'Sts. Crispin and Crispinian',
        title: 'Martyrs of Soissons and Patrons of Shoemakers',
        dates: 'd. c. 286',
        shortDescription: "In Butler's Lives of the Saints for October 25: Two noble Roman brothers who traveled to Soissons in Gaul to preach the Gospel while supporting themselves and the poor by making shoes at night. Arrested under Maximian Herculeus and the cruel prefect Rictiovarus, they endured severe tortures with unshakeable constancy before being beheaded."
      },
      {
        name: 'St. Gaudentius of Brescia',
        title: 'Bishop and Ecclesiastical Writer',
        dates: 'd. c. 410',
        shortDescription: "In Butler's Lives of the Saints for October 25: Disciple and successor of St. Philastrius as Bishop of Brescia. Consecrated by St. Ambrose of Milan after returning from a pilgrimage to Jerusalem, he left twenty-one Paschal sermons on the Eucharist and traveled to Constantinople in 405 on behalf of Pope Innocent I to defend the exiled St. John Chrysostom."
      },
      {
        name: 'Pope St. Boniface I',
        title: 'Pope and Confessor',
        dates: 'd. 422',
        shortDescription: "In Butler's Lives of the Saints for October 25: Elected Bishop of Rome in 418, he restored peace to the Roman Church after the schism of Eulalius, strongly supported St. Augustine of Hippo in his defense of divine grace against the Pelagians, and governed his flock with fatherly mildness and fidelity to canonical discipline."
      }
    ]
  },
  '10-26': {
    id: 'pope-evaristus',
    name: 'Pope St. Evaristus',
    feastDate: 'October 26',
    month: 10,
    day: 26,
    title: 'Pope and Martyr (c. 99–107)',
    butlerVolume: "Butler's Lives of the Saints — Vol. IV (October 26)",
    patronage: ['Parishes of Rome', 'Bishops', 'Seminarians'],
    symbols: ['Papal Tiara', 'Palm of Martyrdom', 'Seven Deacons'],
    quote: 'Let the shepherds keep watch over every title and flock entrusted to them, so that the word of truth may remain uncorrupted.',
    biography: [
      "As recorded as the principal entry in Butler's Lives of the Saints for October 26, St. Evaristus (also known in ancient catalogues as Aristus) was of Greek-Jewish parentage, born in Bethlehem, and educated in the Christian faith at Rome. Around the year 99, during the reign of the Roman Emperor Trajan, he was elected the fifth Bishop of Rome, succeeding Pope St. Clement I.",
      "According to the Liber Pontificalis cited by Alban Butler, as the Christian community in the imperial capital multiplied rapidly, Evaristus organized the urban pastoral care of Rome by dividing the city into distinct parish titles (tituli), assigning a presbyter to each church. He also decreed that seven deacons should attend the bishop whenever he preached in order to bear witness to the orthodoxy of his teaching and assist the poor.",
      "Having governed the Roman See for approximately eight or nine years and ordained seventeen priests, two deacons, and fifteen bishops, Evaristus laid down his life in fidelity to Christ around the year 107 and was buried near the tomb of St. Peter on the Vatican Hill."
    ],
    prayer: 'Almighty and eternal God, who chose Pope Saint Evaristus to govern and organize your flock in the heart of Rome, grant that through his intercession your Church may ever be faithfully shepherded in truth and charity. Through Christ our Lord. Amen.',
    liturgicalColor: 'Red',
    wikiSlug: 'Pope_Evaristus',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Evaristo_-_Basilica_di_San_Paolo_fuori_le_mura.jpg/800px-Evaristo_-_Basilica_di_San_Paolo_fuori_le_mura.jpg',
    companionSaints: [
      {
        name: 'Sts. Lucian and Marcian',
        title: 'Martyrs of Nicomedia',
        dates: 'd. 250',
        shortDescription: "In Butler's Lives of the Saints for October 26: Former pagan magicians in Nicomedia who were converted when their spells proved powerless against a humble Christian virgin praying with the Sign of the Cross. They publicly burned their books of magic, received baptism, distributed their goods to the poor, and were burned alive during the persecution of Decius."
      },
      {
        name: 'St. Cedd',
        title: 'Missionary Bishop of the East Saxons',
        dates: 'd. 664',
        shortDescription: "In Butler's Lives of the Saints for October 26: Northumbrian monk trained at Lindisfarne under St. Aidan and brother of St. Chad. Consecrated Bishop of the East Saxons, he evangelized Essex, built churches at Bradwell-on-Sea and Tilbury, founded the monastery of Lastingham in Yorkshire, and served as interpreter at the Synod of Whitby."
      },
      {
        name: 'St. Bean of Mortlach',
        title: 'First Bishop of Mortlach (Aberdeen), Scotland',
        dates: 'd. c. 1032',
        shortDescription: "In Butler's Lives of the Saints for October 26: Scottish missionary bishop appointed at the request of King Malcolm II to the newly established see of Mortlach in Banffshire, where he labored for thirty years preaching the Gospel and establishing Christian discipline in northern Scotland."
      }
    ]
  },
  '10-27': {
    id: 'frumentius-of-axum',
    name: 'St. Frumentius',
    feastDate: 'October 27',
    month: 10,
    day: 27,
    title: 'Apostle of Ethiopia and Bishop of Axum (d. c. 383)',
    butlerVolume: "Butler's Lives of the Saints — Vol. IV (October 27)",
    patronage: ['Ethiopia', 'Eritrea', 'Foreign Missionaries', 'Captives'],
    symbols: ['Episcopal Staff', 'Coptic Cross', 'Book of the Gospels'],
    quote: 'The harvest of the Lord is rich in every nation; send forth a shepherd to gather those who already long for the light of Christ.',
    biography: [
      "As chronicled in the principal entry of Butler's Lives of the Saints for October 27, St. Frumentius and his younger brother St. Aedesius were fourth-century Syrian-Greek Christians from Tyre who accompanied their uncle, the philosopher Meropius, on a voyage along the Red Sea coast. When their ship stopped for provisions on the Ethiopian shore, local tribesmen attacked the crew in retaliation for a broken Roman treaty, sparing only the two studious boys whom they found reading peacefully beneath a tree.",
      "Taken to the royal court at Axum, the brothers won the complete trust of the King. Aedesius was made the royal cupbearer and Frumentius became keeper of the royal archives and treasurer. Shortly before his death, the King granted both brothers their freedom, but the widowed Queen begged them to remain as regents until her young son, Prince Ezana, came of age. Frumentius used his influence to gather Christian Roman merchants for prayer and quietly planted the seeds of the Gospel across the kingdom.",
      "Once Ezana assumed the throne, Aedesius returned to Tyre (where he later recounted these events to the historian Rufinus), while Frumentius traveled to Alexandria to ask St. Athanasius the Great to send a bishop for Ethiopia. Athanasius declared before his synod, 'What other man shall we find in whom the Spirit of God is as in thee, who can accomplish these things?' Consecrated Bishop of Axum around 328, Frumentius returned to Ethiopia, baptized King Ezana, translated the Scriptures into Ge'ez, and became revered forever as Abba Salama ('Father of Peace')."
    ],
    prayer: 'O God, who through the missionary zeal of Saint Frumentius brought the light of the Gospel to the peoples of Ethiopia, grant by his prayers that your Church may proclaim the peace of Christ to the ends of the earth. Through Christ our Lord. Amen.',
    liturgicalColor: 'White',
    wikiSlug: 'Frumentius',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Frumentius.jpg/800px-Frumentius.jpg',
    companionSaints: [
      {
        name: 'St. Capitolinus and St. Erotheis',
        title: 'Martyrs of Cappadocia',
        dates: 'd. 304',
        shortDescription: "In Butler's Lives of the Saints for October 27: St. Capitolinus was a Christian bishop in Cappadocia who, together with his pious servant Erotheis, boldly confessed Jesus Christ before the imperial governor during the persecution of Diocletian and suffered martyrdom by the sword."
      },
      {
        name: 'St. Odran (Otteran) of Iona',
        title: 'Monk and Companion of St. Columba',
        dates: 'd. 563',
        shortDescription: "In Butler's Lives of the Saints for October 27: Irish abbot from Latteragh in County Tipperary who accompanied his kinsman St. Columba with eleven other disciples to establish the great missionary abbey on the island of Iona. He was the first of the community to die on the island, and St. Columba saw his soul carried by angels into heaven."
      },
      {
        name: 'St. Abban of Magheranoidhe',
        title: 'Abbot and Founder of Monasteries in Ireland',
        dates: '6th Century',
        shortDescription: "In Butler's Lives of the Saints for October 27: Nephew of St. Ibar of Beggerin who founded numerous monasteries across Leinster and Munster in Ireland, most notably Magheranoidhe (near New Ross, County Wexford) and Kill-Abban, renowned for his gift of peacemaking and hospitality."
      }
    ]
  },
  '10-28': {
    id: 'simon-and-jude',
    name: 'Sts. Simon and Jude, Apostles',
    feastDate: 'October 28',
    month: 10,
    day: 28,
    title: 'Apostles and Martyrs (1st Century)',
    butlerVolume: "Butler's Lives of the Saints — Vol. IV (October 28)",
    patronage: ['Impossible and Desperate Causes', 'Hospitals', 'Sawyers and Woodworkers', 'Lost Causes'],
    symbols: ['Carpenter Saw', 'Flame over the Head', 'Medallion of Christ (Image of Edessa)', 'Club or Halberd'],
    quote: 'Keep yourselves in the love of God, waiting for the mercy of our Lord Jesus Christ that leads to eternal life.',
    biography: [
      "As presented in the principal entry of Butler's Lives of the Saints for October 28, Saints Simon the Zealot and Jude Thaddaeus were chosen by Our Lord Jesus Christ among the Twelve Apostles and share a joint liturgical feast because of their missionary partnership and shared martyrdom. St. Simon is called the 'Canaanite' or 'Zealot' in the Gospels to distinguish him from St. Simon Peter, signifying his fiery zeal for God's law and the coming of the Messianic Kingdom.",
      "St. Jude, also called Thaddaeus or Lebbaeus, was the brother of St. James the Less and a kinsman of the Lord. At the Last Supper, it was Jude who asked Jesus, 'Lord, how is it that you will manifest yourself to us, and not to the world?' receiving Christ's profound promise that the Father and the Son will come and make their dwelling in every soul who loves Him and keeps His word (John 14:22–23). He is also the author of the canonical Catholic Epistle of St. Jude, exhorting believers to contend earnestly for the faith once delivered to the saints.",
      "According to ancient Christian tradition recounted by Alban Butler, after preaching in Judea, Samaria, Syria, Mesopotamia, and Egypt, the two Apostles met in Persia, where they converted thousands, confounded pagan sorcerers, and sealed their apostolic witness by martyrdom at Suanir around the year 65—St. Simon reputedly being sawn asunder and St. Jude struck down with an axe or club."
    ],
    prayer: 'O God, who by the blessed Apostles have brought us to acknowledge your name, graciously grant, through the intercession of Saints Simon and Jude, that the Church may constantly grow by increase of the peoples who believe in you. Through Christ our Lord. Amen.',
    liturgicalColor: 'Red',
    wikiSlug: 'Simon_the_Zealot',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Peter_Paul_Rubens_-_St_Simon_-_Prado.jpg/800px-Peter_Paul_Rubens_-_St_Simon_-_Prado.jpg',
    companionSaints: [
      {
        name: 'St. Faro of Meaux',
        title: 'Bishop and Confessor',
        dates: 'c. 592–672',
        shortDescription: "In Butler's Lives of the Saints for October 28: Brother of St. Fara and St. Cagnoald, who left high office at the Frankish court of King Dagobert I with the mutual consent of his wife Blidechild (who became a nun) to enter the clergy. As Bishop of Meaux for nearly fifty years, he founded monasteries, welcomed St. Fiacre from Ireland, and cared tirelessly for the blind and poor."
      },
      {
        name: 'St. Salvius (Saire) of Normandy',
        title: 'Hermit in Normandy',
        dates: '6th Century',
        shortDescription: "In Butler's Lives of the Saints for October 28: A sixth-century contemplative hermit in the Bray region of Normandy whose cell became a center of prayer, spiritual counsel, and miraculous healings, giving his name to the town of Saint-Saire."
      },
      {
        name: 'St. Fidelis of Como',
        title: 'Soldier and Martyr',
        dates: 'd. c. 304',
        shortDescription: "In Butler's Lives of the Saints for October 28: A Christian Roman soldier of the era of Maximian who escaped persecution in Milan after freeing fellow Christian prisoners, preached the faith around Lake Como, and was overtaken and beheaded at Samolaco for refusing to offer sacrifice to the gods."
      }
    ]
  },
  '10-29': {
    id: 'narcissus-of-jerusalem',
    name: 'St. Narcissus of Jerusalem',
    feastDate: 'October 29',
    month: 10,
    day: 29,
    title: 'Patriarch of Jerusalem (c. 99–c. 216)',
    butlerVolume: "Butler's Lives of the Saints — Vol. IV (October 29)",
    patronage: ['Jerusalem', 'Victims of False Accusation', 'Elderly Bishops'],
    symbols: ['Pitcher of Water Turned to Oil', 'Lighted Easter Vigil Lamps', 'Episcopal Staff'],
    quote: 'Though men may speak falsely against us, the eyes of the Most High behold the hidden truth of every heart.',
    biography: [
      "As recorded as the first and principal saint in Alban Butler's Lives of the Saints for October 29 (drawn from the Ecclesiastical History of Eusebius), St. Narcissus was born near the end of the first century and was already nearly eighty years old when he was chosen thirty-first Bishop of Jerusalem. Despite his advanced age, he governed the Church of the Holy City with apostolic vigor and co-presided at the Palestinian Synod of Caesarea in 195, affirming that Easter should always be celebrated on a Sunday.",
      "Eusebius preserves the famous miracle wrought by Narcissus during an Easter Vigil in Jerusalem: when the deacons discovered that there was no oil left to light the lamps of the church for the solemn Paschal service, Narcissus ordered them to draw water from a nearby well, prayed over it in faith, and bade them pour it into the lamps. Miraculously, the water was changed into pure oil, portions of which were preserved by Christians in Jerusalem for generations.",
      "Three wicked men, dreading his strict pastoral discipline, conspired to bring a grave false accusation against him, confirming their slander with terrifying oaths—one calling down fire upon himself, the second a wasting disease, and the third blindness if they lied. Narcissus forgave his accusers and quietly withdrew into the desert to live as a hermit for several years until all three perjurers suffered the exact judgments they had invoked, and the surviving third man confessed the plot in tears. Narcissus returned to his see and, assisted by St. Alexander as coadjutor, lived past the age of 116."
    ],
    prayer: 'O God, who adorned your Bishop Saint Narcissus with wonderful patience under false accusation and the power of miracles in your sanctuary, grant that we may ever walk in integrity of heart and bear witness to the light of the risen Christ. Through Christ our Lord. Amen.',
    liturgicalColor: 'White',
    wikiSlug: 'Narcissus_of_Jerusalem',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/St._Narcissus_of_Jerusalem.jpg/800px-St._Narcissus_of_Jerusalem.jpg',
    companionSaints: [
      {
        name: 'St. Chef (Theuderius) of Vienne',
        title: 'Abbot and Confessor',
        dates: 'd. c. 575',
        shortDescription: "In Butler's Lives of the Saints for October 29: Disciple of St. Caesarius of Arles who was ordained priest by St. Avitus of Vienne. He founded several monasteries around Vienne in Dauphiné and spent his final twelve years enclosed in a penitential cell near the Church of St. Lawrence, counseling the faithful through a small window."
      },
      {
        name: 'St. Colman of Kilmacduagh',
        title: 'Bishop and Abbot in Ireland',
        dates: 'd. c. 632',
        shortDescription: "In Butler's Lives of the Saints for October 29: Born of royal Connacht lineage, he lived for seven years as a solitary hermit in a limestone cave in the Burren (County Clare) before founding the monastery and diocese of Kilmacduagh with the patronage of his cousin, King Guaire Aidne."
      },
      {
        name: 'St. Ermelinda of Meldert',
        title: 'Virgin and Recluse in Brabant',
        dates: 'd. c. 595',
        shortDescription: "In Butler's Lives of the Saints for October 29: Born of wealthy Frankish parents near Louvain in Belgium, she refused marriage, cut off her hair, distributed her inheritance to the poor, and lived as a consecrated anchorite in the forest of Meldert in unceasing nightly prayer and manual labor."
      }
    ]
  },
  '10-30': {
    id: 'marcellus-the-centurion',
    name: 'St. Marcellus the Centurion',
    feastDate: 'October 30',
    month: 10,
    day: 30,
    title: 'Centurion and Martyr of Tangier (d. 298)',
    butlerVolume: "Butler's Lives of the Saints — Vol. IV (October 30)",
    patronage: ['Conscientious Objectors', 'Soldiers', 'León (Spain)', 'Tangier'],
    symbols: ['Cast-off Military Belt and Sword', 'Palm of Martyrdom', 'Centurion Armor'],
    quote: 'I serve Jesus Christ the eternal King. From this hour I cease to serve your emperors, and I scorn to worship your gods of wood and stone.',
    biography: [
      "As recorded as the principal entry in Alban Butler's Lives of the Saints for October 30, based on the authentic ancient Acta of his trial, St. Marcellus was a Roman centurion of the Trajan Legion stationed in Spain and North Africa during the reign of Emperor Diocletian and Maximian. On July 21, 298, as the army celebrated the Emperor's birthday with pagan sacrifices and banquets, Marcellus stepped forward before the standards of the legion.",
      "Unbuckling his military belt—the symbol of his rank—he cast it down along with his sword and centurion's vine-staff before the pagan altars, declaring aloud: 'I serve Jesus Christ the eternal King. I will no longer serve your emperors, and I refuse to adore your gods of wood and stone, which are deaf and dumb idols.' Arrested immediately, he was sent in chains to Tangier in Mauretania to stand before Aurelius Agricolanus, the deputy prefect of the praetorium.",
      "On October 30, 298, when the official minutes of his declaration were read out in court, Marcellus calmly confirmed every word, stating that it was not fitting for a Christian who serves the Lord Christ to take part in idolatrous military festivities. When Agricolanus sentenced him to be beheaded with the sword, Marcellus replied, 'May God bless you,' bowing his head in peace. The court stenographer, St. Cassian of Tangier, threw down his stylus and wax tablets in protest at the unjust sentence and was martyred a month later."
    ],
    prayer: 'Almighty God, who gave the martyr Saint Marcellus the courage to prefer allegiance to Christ the Eternal King above all earthly honors, grant that we may never prefer anything to your love and truth. Through Christ our Lord. Amen.',
    liturgicalColor: 'Red',
    wikiSlug: 'Marcellus_of_Tangier',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/San_Marcelo_Centuri%C3%B3n_%28Le%C3%B3n%29.jpg/800px-San_Marcelo_Centuri%C3%B3n_%28Le%C3%B3n%29.jpg',
    companionSaints: [
      {
        name: 'St. Germanus of Capua',
        title: 'Bishop and Papal Legate',
        dates: 'd. c. 540',
        shortDescription: "In Butler's Lives of the Saints for October 30: Revered Bishop of Capua and close friend of St. Benedict of Nursia. In 519 Pope St. Hormisdas sent him as head of the papal legation to Constantinople to heal the thirty-five-year Acacian Schism. At the hour of his death, St. Benedict saw angels carrying the soul of Germanus to heaven in a sphere of fire."
      },
      {
        name: 'St. Serapion of Antioch',
        title: 'Patriarch of Antioch and Ecclesiastical Writer',
        dates: 'd. 211',
        shortDescription: "In Butler's Lives of the Saints for October 30: Eighth Bishop of Antioch (191–211) and one of the most learned theologians of his age. Praised by Eusebius and St. Jerome for his letters defending apostolic doctrine against Montanism, Docetism, and the spurious apocryphal Gospel of Peter."
      },
      {
        name: 'St. Asterius of Amasea',
        title: 'Metropolitan Bishop in Pontus',
        dates: 'c. 350–c. 410',
        shortDescription: "In Butler's Lives of the Saints for October 30: Trained in rhetoric and law before becoming Metropolitan Bishop of Amasea in Asia Minor. Twenty-one of his vivid homilies survive, famed for defending Christian marriage, exhorting the wealthy to mercy toward the poor, and describing the early veneration of the martyrs."
      }
    ]
  },
  '10-31': {
    id: 'wolfgang-of-regensburg',
    name: 'St. Wolfgang of Regensburg',
    feastDate: 'October 31',
    month: 10,
    day: 31,
    title: 'Bishop of Regensburg and Monastic Reformer (c. 924–994)',
    butlerVolume: "Butler's Lives of the Saints — Vol. IV (October 31)",
    patronage: ['Bavaria', 'Regensburg', 'Woodcarvers and Carpenters', 'Shepherds'],
    symbols: ['Church Model', 'Woodman Axe', 'Episcopal Crozier'],
    quote: 'Let nothing be preferred to the service of God and the care of the poor, who are the living treasure of the Church.',
    biography: [
      "As recorded in Alban Butler's Lives of the Saints for October 31, St. Wolfgang was born around 924 in Swabia, Germany, and educated at the famous monastic school of Reichenau Abbey and later at Würzburg. Drawn by a desire for silence and perfection, he entered the Benedictine Abbey of Einsiedeln in Switzerland in 964, where he directed the abbey school with such brilliance and holiness that it became the premier center of learning in the region.",
      "Ordained a priest by St. Ulrich of Augsburg, Wolfgang set out with a band of monks to evangelize the Magyars in Hungary before being appointed Bishop of Regensburg (Ratisbon) by Emperor Otto II in 972. Despite his high imperial office, he continued to wear the rough Benedictine habit beneath his episcopal robes, lived in strict austerity, reformed the monasteries and clergy of his diocese, and generously ceded territory from his own see so that a new missionary diocese could be established at Prague under St. Adalbert.",
      "Entrusted with the education of the young children of Duke Henry of Bavaria—including the future Emperor St. Henry II and Bl. Gisela, Queen of Hungary—Wolfgang formed an entire generation of saints. Falling ill at Pupping in Upper Austria while travelling on a pastoral visitation, he asked to be carried into the chapel of St. Othmar, received Viaticum before the altar, and died peacefully on October 31, 994."
    ],
    prayer: 'O God, who made the Bishop Saint Wolfgang shine forth with pastoral zeal, monastic humility, and tender charity toward the poor, grant by his intercession that we may faithfully serve you in our daily calling. Through Christ our Lord. Amen.',
    liturgicalColor: 'White',
    wikiSlug: 'Wolfgang_of_Regensburg',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Michael_Pacher_004.jpg/800px-Michael_Pacher_004.jpg',
    companionSaints: [
      {
        name: 'St. Quentin (Quintinus)',
        title: 'Roman Missionary and Martyr in Gaul',
        dates: 'd. c. 287',
        shortDescription: "In Butler's Lives of the Saints for October 31: Son of a Roman senator who traveled to Gaul with St. Lucian of Beauvais and preached the Gospel at Amiens. Arrested by the prefect Rictiovarus, he endured prolonged imprisonment and torture before being beheaded at Augusta Viromanduorum (now Saint-Quentin in Picardy)."
      },
      {
        name: 'St. Foillan of Fosses',
        title: 'Irish Missionary Abbot and Martyr',
        dates: 'd. c. 655',
        shortDescription: "In Butler's Lives of the Saints for October 31: Brother of St. Fursey and St. Ultan. After founding Cnobheresburg monastery in East Anglia, he traveled to Brabant in Belgium where St. Gertrude of Nivelles gave him land to found the monastery of Fosses. He and three companions were murdered by outlaws in the Forest of Soignies while returning from celebrating Mass."
      },
      {
        name: 'St. Alphonsus Rodriguez',
        title: 'Jesuit Lay Brother and Mystic of Majorca',
        dates: '1532–1617',
        shortDescription: "In Butler's Lives of the Saints for October 31: After losing his wife, children, and wool business in Segovia, he entered the Society of Jesus at age thirty-eight as a humble lay brother. For forty-six years he served as porter (doorkeeper) at the College of Montesión in Palma de Majorca, greeting every visitor with 'I come, Lord!' and guiding St. Peter Claver to the missions of South America."
      }
    ]
  }
};

// Companion saints backup rotation from Butler's Lives of the Saints for any calendar date without custom companions
const BUTLER_COMPANION_ROTATION: CompanionSaint[][] = [
  [
    {
      name: 'Sts. Crispin and Crispinian',
      title: 'Martyrs of Soissons',
      dates: 'd. c. 286',
      shortDescription: "Recorded in Butler's Lives of the Saints: Two Roman brothers who preached the Gospel in Gaul while supporting themselves and the poor as shoemakers by night until their martyrdom under Maximian."
    },
    {
      name: 'St. Gaudentius of Brescia',
      title: 'Bishop and Confessor',
      dates: 'd. c. 410',
      shortDescription: "Recorded in Butler's Lives of the Saints: Consecrated Bishop of Brescia by St. Ambrose of Milan, renowned for his Paschal sermons on the Holy Eucharist and his defense of St. John Chrysostom."
    },
    {
      name: 'Pope St. Boniface I',
      title: 'Bishop of Rome',
      dates: 'd. 422',
      shortDescription: "Recorded in Butler's Lives of the Saints: Wise shepherd of the Roman Church who supported St. Augustine of Hippo in defending the doctrine of divine grace."
    }
  ],
  [
    {
      name: 'St. Germanus of Capua',
      title: 'Bishop and Papal Legate',
      dates: 'd. c. 540',
      shortDescription: "Recorded in Butler's Lives of the Saints: Friend of St. Benedict of Nursia and papal legate to Constantinople who helped heal the Acacian Schism between East and West."
    },
    {
      name: 'St. Serapion of Antioch',
      title: 'Patriarch of Antioch',
      dates: 'd. 211',
      shortDescription: "Recorded in Butler's Lives of the Saints: Eighth Bishop of Antioch, celebrated by Eusebius and St. Jerome for his theological writings defending the four canonical Gospels."
    },
    {
      name: 'St. Alphonsus Rodriguez',
      title: 'Jesuit Lay Brother',
      dates: '1532–1617',
      shortDescription: "Recorded in Butler's Lives of the Saints: Humble Jesuit porter at Majorca for forty-six years who formed St. Peter Claver and answered every knock at the door as if welcoming Christ Himself."
    }
  ],
  [
    {
      name: 'St. Proclus of Constantinople',
      title: 'Patriarch and Doctor',
      dates: 'd. 446',
      shortDescription: "Recorded in Butler's Lives of the Saints: Disciple of St. John Chrysostom and Patriarch of Constantinople who defended the Virgin Mary's title as Mother of God (Theotokos)."
    },
    {
      name: 'St. Faro of Meaux',
      title: 'Bishop and Confessor',
      dates: 'c. 592–672',
      shortDescription: "Recorded in Butler's Lives of the Saints: Bishop of Meaux for nearly half a century who founded monasteries, welcomed Irish missionary monks, and sheltered the poor and blind."
    },
    {
      name: 'St. Cedd of Lastingham',
      title: 'Missionary Bishop of the East Saxons',
      dates: 'd. 664',
      shortDescription: "Recorded in Butler's Lives of the Saints: Monk of Lindisfarne and brother of St. Chad who evangelized Essex and founded the monastery of Lastingham."
    }
  ]
];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function resolveDailySaintEntry(month: number, day: number): DailySaintEntry {
  const key = `${month}-${day}`;
  if (BUTLER_LIVES_ENTRIES[key]) {
    return BUTLER_LIVES_ENTRIES[key];
  }

  const exactMatch = SAINTS_DATABASE.find(s => s.month === month && s.day === day) as (DailySaintEntry | undefined);
  const butlerKeys = Object.keys(BUTLER_LIVES_ENTRIES);
  const fallbackButler = BUTLER_LIVES_ENTRIES[butlerKeys[(month * 31 + day) % butlerKeys.length]];
  const base: DailySaintEntry = exactMatch || (SAINTS_DATABASE[(month * 31 + day) % Math.max(1, SAINTS_DATABASE.length)] as DailySaintEntry) || fallbackButler;
  const fallbackIdx = (month * 31 + day) % BUTLER_COMPANION_ROTATION.length;
  const monthName = MONTH_NAMES[(month - 1 + 12) % 12] || 'October';

  return {
    ...base,
    month,
    day,
    feastDate: exactMatch ? base.feastDate : `${monthName} ${day}`,
    butlerVolume: base.butlerVolume || base.butlerReference || `Butler's Lives of the Saints — ${monthName} ${day}`,
    companionSaints:
      base.companionSaints && base.companionSaints.length > 0
        ? base.companionSaints.map(c => ({
            ...c,
            dates: c.dates || c.lifespan
          }))
        : BUTLER_COMPANION_ROTATION[fallbackIdx]
  };
}

export const SaintOfTheDayView: React.FC<SaintOfTheDayViewProps> = ({
  currentMonth,
  currentDay
}) => {
  const getTodayParts = () => {
    const now = new Date();
    return {
      month: now.getMonth() + 1,
      day: now.getDate()
    };
  };

  const initialParts = {
    month: currentMonth ?? getTodayParts().month,
    day: currentDay ?? getTodayParts().day
  };

  const [activeMonth, setActiveMonth] = useState<number>(initialParts.month);
  const [activeDay, setActiveDay] = useState<number>(initialParts.day);
  const [selectedSaint, setSelectedSaint] = useState<DailySaintEntry>(() =>
    resolveDailySaintEntry(initialParts.month, initialParts.day)
  );
  const [resolvedSaintImageUrl, setResolvedSaintImageUrl] = useState<string | undefined>(
    () => resolveDailySaintEntry(initialParts.month, initialParts.day).imageUrl
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [readingCompanionIndex, setReadingCompanionIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Sync when parent date props change
  useEffect(() => {
    if (currentMonth && currentDay) {
      setActiveMonth(currentMonth);
      setActiveDay(currentDay);
      const nextSaint = resolveDailySaintEntry(currentMonth, currentDay);
      setSelectedSaint(nextSaint);
      setResolvedSaintImageUrl(nextSaint.imageUrl);
      setImgError(false);
    }
  }, [currentMonth, currentDay]);

  // Automatically check for calendar day rollover so Saint of the Day updates daily
  useEffect(() => {
    const checkDailyRollover = () => {
      if (!currentMonth && !currentDay) {
        const today = getTodayParts();
        if (today.month !== activeMonth || today.day !== activeDay) {
          setActiveMonth(today.month);
          setActiveDay(today.day);
          const nextSaint = resolveDailySaintEntry(today.month, today.day);
          setSelectedSaint(nextSaint);
          setResolvedSaintImageUrl(nextSaint.imageUrl);
          setImgError(false);
        }
      }
    };

    const interval = setInterval(checkDailyRollover, 60000);
    window.addEventListener('focus', checkDailyRollover);
    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', checkDailyRollover);
    };
  }, [currentMonth, currentDay, activeMonth, activeDay]);

  // Look for an image of the Saint of the Day ONLY (via local asset or Wikimedia/Wikipedia REST API)
  useEffect(() => {
    let isCancelled = false;
    setImgError(false);
    setResolvedSaintImageUrl(selectedSaint.imageUrl);

    const isLocalSaintAsset = selectedSaint.imageUrl?.startsWith('/images/saints/');
    if (isLocalSaintAsset) {
      return;
    }

    const fetchSaintOfTheDayPortrait = async () => {
      const slug =
        selectedSaint.wikiSlug ||
        selectedSaint.name
          .replace(/^(Sts\.|St\.|Pope St\.|Saints|Saint)\s+/i, '')
          .trim()
          .replace(/\s+/g, '_');

      try {
        const response = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(slug)}`
        );
        if (!response.ok) return;
        const data = await response.json();
        const wikiImg: string | undefined =
          data?.originalimage?.source || data?.thumbnail?.source;
        if (!isCancelled && wikiImg) {
          setResolvedSaintImageUrl(wikiImg);
          setImgError(false);
        }
      } catch {
        // Keep existing imageUrl or sacred icon fallback
      }
    };

    fetchSaintOfTheDayPortrait();

    return () => {
      isCancelled = true;
    };
  }, [selectedSaint]);

  const handleShiftDay = (deltaDays: number) => {
    const baseDate = new Date(new Date().getFullYear(), activeMonth - 1, activeDay, 12, 0, 0);
    baseDate.setDate(baseDate.getDate() + deltaDays);
    const nextMonth = baseDate.getMonth() + 1;
    const nextDay = baseDate.getDate();
    setActiveMonth(nextMonth);
    setActiveDay(nextDay);
    const nextSaint = resolveDailySaintEntry(nextMonth, nextDay);
    setSelectedSaint(nextSaint);
    setResolvedSaintImageUrl(nextSaint.imageUrl);
    setImgError(false);
    SacredReader.stop();
    setIsReadingAloud(false);
    setReadingCompanionIndex(null);
  };

  const handleResetToToday = () => {
    const today = getTodayParts();
    setActiveMonth(today.month);
    setActiveDay(today.day);
    const nextSaint = resolveDailySaintEntry(today.month, today.day);
    setSelectedSaint(nextSaint);
    setResolvedSaintImageUrl(nextSaint.imageUrl);
    setImgError(false);
    SacredReader.stop();
    setIsReadingAloud(false);
    setReadingCompanionIndex(null);
  };

  // Combine built-in Butler entries and SAINTS_DATABASE for directory search
  const combinedDirectory: DailySaintEntry[] = React.useMemo(() => {
    const map = new Map<string, DailySaintEntry>();
    for (const s of SAINTS_DATABASE) {
      map.set(`${s.month}-${s.day}`, resolveDailySaintEntry(s.month, s.day));
    }
    for (const key of Object.keys(BUTLER_LIVES_ENTRIES)) {
      map.set(key, BUTLER_LIVES_ENTRIES[key]);
    }
    return Array.from(map.values()).sort((a, b) =>
      a.month !== b.month ? a.month - b.month : a.day - b.day
    );
  }, []);

  const filteredSaints = combinedDirectory.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.feastDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.patronage.some(p => p.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (s.companionSaints && s.companionSaints.some(c => c.name.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const normalizedColorKey = normalizeLiturgicalColor(selectedSaint.liturgicalColor);
  const colorInfo = LITURGICAL_COLORS_INFO[normalizedColorKey] || LITURGICAL_COLORS_INFO.white;
  const biographyParagraphs = getBiographyParagraphs(selectedSaint.biography);
  const quoteText = getQuoteText(selectedSaint.quote);

  const handleReadAloud = () => {
    if (isReadingAloud) {
      SacredReader.stop();
      setIsReadingAloud(false);
      return;
    }

    SacredReader.stop();
    setReadingCompanionIndex(null);
    const fullText = `${selectedSaint.name}. ${selectedSaint.title}. Feast Day: ${selectedSaint.feastDate}. From Butler's Lives of the Saints. "${quoteText}". Biography: ${biographyParagraphs.join(' ')} Collect Prayer: ${selectedSaint.prayer}`;
    setIsReadingAloud(true);
    SacredReader.speak(fullText, () => setIsReadingAloud(false));
  };

  const handleReadCompanion = (companion: CompanionSaint, idx: number) => {
    if (readingCompanionIndex === idx) {
      SacredReader.stop();
      setReadingCompanionIndex(null);
      return;
    }

    SacredReader.stop();
    setIsReadingAloud(false);
    setReadingCompanionIndex(idx);
    const text = `${companion.name}. ${companion.title}. ${companion.shortDescription}`;
    SacredReader.speak(text, () => setReadingCompanionIndex(null));
  };

  const handleCopy = () => {
    const companionsText = selectedSaint.companionSaints?.length
      ? `\n\nOther Saints Commemorated Today (Butler's Lives of the Saints):\n` +
        selectedSaint.companionSaints
          .map((c, i) => `${i + 2}. ${c.name} (${c.title}): ${c.shortDescription}`)
          .join('\n')
      : '';

    const fullText = `${selectedSaint.name} (${selectedSaint.feastDate})\n${selectedSaint.title}\nSource: ${selectedSaint.butlerVolume || "Butler's Lives of the Saints"}\n\n"${quoteText}"\n\n${biographyParagraphs.join('\n\n')}\n\nPrayer: ${selectedSaint.prayer}${companionsText}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const companionSaints = (selectedSaint.companionSaints || []).slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Top Header & Daily Date Switcher */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100/80 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-xs font-bold uppercase tracking-widest mb-3 border border-amber-200/60 dark:border-amber-700/50">
          <SaintWithHaloIcon className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span>Alban Butler&apos;s Lives of the Saints • Updated Daily</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-2">
          Saint of the Day &amp; Daily Martyrology
        </h1>
        <p className="text-stone-600 dark:text-stone-400 max-w-2xl mx-auto text-sm sm:text-base mb-5">
          From Alban Butler&apos;s classic <em>Lives of the Fathers, Martyrs, and Other Principal Saints</em>: featuring the principal Saint of the Day with sacred portrait and full biography, followed by the next three saints commemorated on the same calendar day.
        </p>

        {/* Daily Navigation Bar */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 bg-white dark:bg-stone-900 border border-stone-200/80 dark:border-stone-800 rounded-xl p-1.5 shadow-sm">
          <button
            onClick={() => handleShiftDay(-1)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            title="Previous Day"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Day</span>
          </button>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/50 text-amber-900 dark:text-amber-200 text-xs font-bold">
            <Calendar className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>{selectedSaint.feastDate}</span>
          </div>

          <button
            onClick={() => handleShiftDay(1)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
            title="Next Day"
          >
            <span>Next Day</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            onClick={handleResetToToday}
            className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-amber-700 hover:bg-amber-800 text-white transition-colors"
          >
            Today
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar: Saints Calendar & Search */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 p-4 shadow-sm">
            <div className="relative mb-4">
              <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Butler's Lives, patronage, date..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-600 text-stone-800 dark:text-stone-200"
              />
            </div>

            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Butler&apos;s Calendar Directory
              </span>
              <span className="text-xs text-stone-400">{filteredSaints.length} feast days</span>
            </div>

            <div className="space-y-1.5 max-h-[560px] overflow-y-auto pr-1">
              {filteredSaints.map((saint) => {
                const isSelected = saint.id === selectedSaint.id && saint.feastDate === selectedSaint.feastDate;
                return (
                  <button
                    key={`${saint.id}-${saint.month}-${saint.day}`}
                    onClick={() => {
                      SacredReader.stop();
                      setIsReadingAloud(false);
                      setReadingCompanionIndex(null);
                      setActiveMonth(saint.month);
                      setActiveDay(saint.day);
                      const resolved = resolveDailySaintEntry(saint.month, saint.day);
                      setSelectedSaint(resolved);
                      setResolvedSaintImageUrl(resolved.imageUrl);
                      setImgError(false);
                    }}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-start justify-between gap-2 ${
                      isSelected
                        ? 'bg-amber-700 text-white shadow-sm'
                        : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300'
                    }`}
                  >
                    <div>
                      <div className="font-serif font-bold text-sm leading-snug">
                        {saint.name}
                      </div>
                      <div className={`text-xs mt-0.5 line-clamp-1 ${isSelected ? 'text-amber-100' : 'text-stone-500 dark:text-stone-400'}`}>
                        {saint.title}
                      </div>
                      {saint.companionSaints && saint.companionSaints.length > 0 && (
                        <div className={`text-[11px] mt-1 line-clamp-1 ${isSelected ? 'text-amber-200/90' : 'text-amber-700/80 dark:text-amber-400/80'}`}>
                          + {saint.companionSaints.slice(0, 3).map(c => c.name).join(', ')}
                        </div>
                      )}
                    </div>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-md shrink-0 ${
                      isSelected
                        ? 'bg-amber-800 text-amber-100'
                        : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                    }`}>
                      {saint.feastDate}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Detail Panel: 1st Saint (Saint of the Day with Portrait) + Next 3 Companion Saints */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 shadow-sm overflow-hidden">
            {/* Hero Banner */}
            <div className="bg-gradient-to-br from-stone-900 via-stone-800 to-amber-950 text-white p-6 sm:p-8 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
                      1st Saint • Saint of the Day • {selectedSaint.feastDate}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-stone-200 text-xs font-medium">
                      <BookOpen className="w-3.5 h-3.5 text-amber-300" />
                      {selectedSaint.butlerVolume || "Butler's Lives of the Saints"}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-stone-200 text-xs font-medium capitalize">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          normalizedColorKey === 'red'
                            ? 'bg-red-500'
                            : normalizedColorKey === 'green'
                            ? 'bg-emerald-500'
                            : normalizedColorKey === 'violet'
                            ? 'bg-purple-400'
                            : 'bg-amber-300'
                        }`}
                      />
                      {colorInfo.name} Vestments
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleReadAloud}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        isReadingAloud
                          ? 'bg-amber-500 text-stone-950 shadow-sm animate-pulse'
                          : 'bg-white/10 hover:bg-white/20 text-white'
                      }`}
                    >
                      {isReadingAloud ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      <span>{isReadingAloud ? 'Stop Audio' : 'Listen'}</span>
                    </button>
                    <button
                      onClick={handleCopy}
                      className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                      title="Copy Saint Biography & Martyrology"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Main Content Header with Portrait for the Saint of the Day ONLY */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  {resolvedSaintImageUrl && !imgError ? (
                    <div className="w-36 h-44 sm:w-40 sm:h-48 rounded-2xl overflow-hidden border-2 border-amber-400/40 shadow-xl shrink-0 bg-stone-800 relative group">
                      <img 
                        src={resolvedSaintImageUrl} 
                        alt={selectedSaint.name}
                        onError={() => setImgError(true)}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl pointer-events-none" />
                    </div>
                  ) : (
                    <div className="w-32 h-40 sm:w-36 sm:h-44 rounded-2xl border-2 border-amber-400/30 bg-stone-800/90 flex flex-col items-center justify-center p-4 text-center shrink-0">
                      <SaintWithHaloIcon className="w-12 h-12 text-amber-400 mb-2" />
                      <span className="text-[10px] uppercase tracking-widest text-amber-200/80 font-semibold">
                        Saint of the Day
                      </span>
                    </div>
                  )}

                  <div className="flex-1 text-center sm:text-left">
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-1 text-white">
                      {selectedSaint.name}
                    </h2>
                    <p className="text-amber-200/90 text-sm sm:text-base font-medium mb-4">
                      {selectedSaint.title}
                    </p>

                    <blockquote className="border-l-2 border-amber-400 pl-4 py-1 italic text-stone-200 font-serif text-base sm:text-lg">
                      &ldquo;{quoteText}&rdquo;
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              {/* Patronage & Symbols */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 mb-2">
                    <SaintWithHaloIcon className="w-4 h-4" />
                    <span>Patronage</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedSaint.patronage.map((item, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium text-stone-700 dark:text-stone-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/60 dark:border-stone-700/60">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 mb-2">
                    <SaintWithHaloIcon className="w-4 h-4" />
                    <span>Sacred Symbols &amp; Attributes</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedSaint.symbols.map((item, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-xs font-medium text-stone-700 dark:text-stone-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Biography from Butler's Lives of the Saints */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-stone-400">
                    Life &amp; Witness — From Alban Butler&apos;s Lives of the Saints
                  </h3>
                  <span className="text-[11px] font-semibold text-amber-700 dark:text-amber-400">
                    Principal Feast • {selectedSaint.feastDate}
                  </span>
                </div>
                <div className="space-y-4 font-serif text-stone-700 dark:text-stone-300 text-base sm:text-lg leading-relaxed">
                  {biographyParagraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Collect Prayer */}
              <div className="p-6 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-800/40">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-800 dark:text-amber-400 mb-2">
                  <SaintWithHaloIcon className="w-4 h-4" />
                  <span>Collect Prayer of the Feast</span>
                </div>
                <p className="font-serif italic text-stone-800 dark:text-stone-200 text-base sm:text-lg leading-relaxed">
                  {selectedSaint.prayer}
                </p>
              </div>
            </div>
          </div>

          {/* Next Three Saints of the Day (Shorter Descriptions from Butler's Lives, No Images) */}
          {companionSaints.length > 0 && (
            <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200/80 dark:border-stone-800 p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-6 border-b border-stone-200/80 dark:border-stone-800">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400 mb-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Also Commemorated on {selectedSaint.feastDate}</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 dark:text-stone-100">
                    Next Three Saints in Butler&apos;s Lives of the Saints
                  </h3>
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 self-start sm:self-center">
                  Saints 2 – {companionSaints.length + 1} of the Day
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {companionSaints.map((companion, idx) => {
                  const isSpeakingThis = readingCompanionIndex === idx;
                  return (
                    <div
                      key={`${companion.name}-${idx}`}
                      className="p-5 rounded-xl bg-stone-50/80 dark:bg-stone-800/50 border border-stone-200/70 dark:border-stone-700/60 transition-all hover:border-amber-300 dark:hover:border-amber-700/60"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-amber-700 text-white text-xs font-bold flex items-center justify-center shrink-0">
                            {idx + 2}
                          </span>
                          <div>
                            <h4 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100 leading-snug">
                              {companion.name}
                            </h4>
                            <div className="flex flex-wrap items-center gap-2 text-xs text-amber-800 dark:text-amber-400 font-medium">
                              <span>{companion.title}</span>
                              {companion.dates && (
                                <>
                                  <span>•</span>
                                  <span className="text-stone-500 dark:text-stone-400">{companion.dates}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleReadCompanion(companion, idx)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                            isSpeakingThis
                              ? 'bg-amber-600 text-white animate-pulse'
                              : 'bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
                          }`}
                          title={`Listen to ${companion.name}`}
                        >
                          {isSpeakingThis ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                          <span>{isSpeakingThis ? 'Stop' : 'Listen'}</span>
                        </button>
                      </div>

                      <p className="font-serif text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed pl-8">
                        {companion.shortDescription}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
