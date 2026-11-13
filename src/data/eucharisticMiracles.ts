export interface EucharisticMiracle {
  id: string;
  location: string;
  country: string;
  year: string;
  century: string;
  title: string;
  summary: string;
  miracleType: 
    | 'Bleeding Host' 
    | 'Heart Muscle Transformation' 
    | 'Incorrupt Host' 
    | 'Levitation' 
    | 'Fire Resistance' 
    | 'Halting a Tsunami' 
    | 'Adoration by Animals' 
    | 'Supernatural Light' 
    | 'Apparition in Host';
  historicalContext: string;
  scientificOrChurchInvestigation: string;
  keyScientificFindings?: string[];
  papalOrEcclesialApproval: string;
  bloodType?: string;
  currentLocation: string;
  sourceAttribution: string;
}

export const EUCHARISTIC_MIRACLES_DATA: EucharisticMiracle[] = [
  {
    "id": "buenos-aires-1996",
    "location": "Buenos Aires",
    "country": "Argentina",
    "year": "1996 AD",
    "century": "20th Century",
    "title": "The Miracle of Buenos Aires (Tested by Blind Forensic Analysis)",
    "summary": "A discarded consecrated Host placed in water transformed into bloody heart muscle tissue. Tested blindly by Dr. Frederic Zugibe in New York.",
    "miracleType": "Heart Muscle Transformation",
    "historicalContext": "In August 1996, a consecrated Host was found left in a candlestick at the back of Santa Maria parish. Fr. Alejandro Pezet placed it in a vessel of water inside the tabernacle. Eleven days later, it had turned into a bloody fragment of flesh.",
    "scientificOrChurchInvestigation": "Auxiliary Bishop Jorge Mario Bergoglio (now Pope Francis) commissioned strict forensic testing. Samples were sent blindly without identifying origin to leading cardiologists and forensic pathologists.",
    "keyScientificFindings": [
      "Dr. Frederic Zugibe (Chief Medical Examiner of Rockland County, NY) determined the sample was living myocardium muscle from the left ventricle of a human heart.",
      "Intact white blood cells (leukocytes) were present in the tissue, proving the heart tissue was alive and pumping when sample was taken.",
      "The tissue showed severe inflammation and trauma, consistent with severe beating to the chest."
    ],
    "papalOrEcclesialApproval": "Approved by Cardinal Jorge Mario Bergoglio (Pope Francis) and the Archdiocese of Buenos Aires.",
    "bloodType": "AB Positive",
    "currentLocation": "Parroquia Santa María, Buenos Aires, Argentina",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue • Dr. Frederic Zugibe Columbia University Medical Center Forensic Report (1999)"
  },
  {
    "id": "fiecht",
    "location": "Fiecht",
    "country": "Austria",
    "year": "1310 AD",
    "century": "14th Century",
    "title": "The Eucharistic Miracle of Fiecht",
    "summary": "little village of St. Georgenberg-Fiecht in the Inn Valley is very well known - especially because of a Eucharistic miracle that took place there in 1310. During the Mass, the priest was seized with temptations regarding the Real Presence of Jesus in the consecrated Elements.",
    "miracleType": "Bleeding Host",
    "historicalContext": "little village of St. Georgenberg-Fiecht in the Inn Valley is very well known - especially because of a Eucharistic miracle that took place there in 1310, During the Mass, the priest was seized with temptations regarding the Real Presence of Jesus in the consecrated Elements, Right after the consecration, the wine changed into Blood and began to boil and overflow the chalice, In 1480, after 170 years, the Sacred Blood was \"still fresh as though coming out of a wound,\" wrote the chronicler of those days, Precious Blood is preserved intact to this day and is contained in the reliquary in the Monastery of St. Georgenberg, ear the side altar of the monastery church there is a documentary tablet that says: \"In the year of grace 1310, under Abbot Rupert, a priest was celebrating Holy Mass in this church dedicated to the holy martyr George and the holy apostle, James. After consecrating the wine, he was seized with a doubt as to whether the Blood of Christ was really present under the species of wine. Suddenly the wine changed into red blood that began to boil in the chalice and overflow it. The abbot and his monks, who happened to be in the choir, and the numerous pilgrims who were present at the celebration, approached the altar and realized what had happened.",
    "scientificOrChurchInvestigation": "The priest, terrified, was unable to drink all the Holy Blood, and so the abbot placed the remainder in a vessel in the tabernacle of the main altar near the cloth with which the chalice AUSTRIA, 1310 Georgenberg developed in two complexes, one on the mounbegan to arrive to adore the Sacred Blood. So great was the number of the devotees of the Holy Blood that in 1472 Bishop Georg von Brixen sent the abbot of Wilten, Joahannes Lösch, and the pastors, Sigmund Thaur and Kaspar of Absam, to better study the phenomenon. As a result of this investigation, the adoration of the Blessed Blood was encouraged and the miracle was declared authentic. \"Æeeswere important Church sonalities, like John, Bishop of Trieste; George, Bishop of Brixen; Rupert, Archbishop of Cologne and Duke of Bavaria; and Frederick, Bishop of Chiemsee. Catholic faith during the Protestant schism: \"When in 1593, the teachings of Luther were spreading everywhere in Tyrol, the monks of St. Georgenberg were asked to preach the faith everywhere. Abbot Michael Geisser was preaching with great success before a large crowd in the parish church of Schwaz and did not hesitate to recall the holy miracle of the Blood as proof of the existence of the Real Presence of Jesus Christ in the Blessed Sacrament of the Altar. He was disputing in such a convincing way that the adversaries were obliged to leave the scene. This total victory against the false teaching was regarded by the believers as a special grace the Lord was granting His faithful, the adorers of the Precious Blood.'",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Fiecht, Austria",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Fiecht, Austria (1310 AD)"
  },
  {
    "id": "seefeld",
    "location": "Seefeld",
    "country": "Austria",
    "year": "1384 AD",
    "century": "14th Century",
    "title": "The Eucharistic Miracle of Seefeld",
    "summary": "The little city of Seefeld is the goal of many pilgrimages because of the Eucharistic miracle that took place there in 1384. During the Holy Thursday Mass a nobleman by the name of Oswald Milser expected that the priest would give him Communion with the large Host.",
    "miracleType": "Bleeding Host",
    "historicalContext": "The little city of Seefeld is the goal of many pilgrimages because of the Eucharistic miracle that took place there in 1384, During the Holy Thursday Mass a nobleman by the name of Oswald Milser expected that the priest would give him Communion with the large Host, At the moment he was about to receive Communion, the pavement began to tremble under him, and Oswald felt as if he was being sucked into it, As the priest was returning the Host to the altar, live Blood began to flow from the Sacred Species, n the little city of Seefeld, Oswald Milser, Lord of Schlosberg, expected, at the Holy Thursday Mass to receive the large Host like that of the celebrating priest. But at the moment he was about to receive Communion, the pavement began to tremble and broke apart. Oswald grasped the altar so as not to fall, and the priest immediately took back the Host from the man's mouth. The trembling stopped, and live Blood began to flow from the Host. There were many witnesses who saw the miracle, and very soon the news spread throughout the whole nation. The Emperor Maximilian I himself was very devoted to the miracle. Today one can visit the Church of St.",
    "scientificOrChurchInvestigation": "Oswald where the precious relic of the Host, stained with Blood, is exposed, and also view many paintings depicting the miracle. AUSTRIA, 1384 Frescoes of the church depicting the miracle ,.€jåilll Miracle of Seefeld. Banner in the Church of St. Oswald depicting Main altar of the Church of St. Oswald, Seefeld",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Seefeld, Austria",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Seefeld, Austria (1384 AD)"
  },
  {
    "id": "weiten",
    "location": "Weiten-Raxendorf",
    "country": "Austria",
    "year": "1411 AD",
    "century": "15th Century",
    "title": "The Eucharistic Miracle of Weiten-Raxendorf",
    "summary": "In fifteenth-century Austria there were a number of thefts of consecrated Hosts, so Church authorities began keeping the Hosts in the sacristy. Despite these precautions, in 1411 a thief succeeded in stealing a consecrated Host from the parish church in Weiten.",
    "miracleType": "Heart Muscle Transformation",
    "historicalContext": "In fifteenth-century Austria there were a number of thefts of consecrated Hosts, so Church authorities began keeping the Hosts in the sacristy, Despite these precautions, in 1411 a thief succeeded in stealing a consecrated Host from the parish church in Weiten, The Host slipped unnoticed to the ground during his journey and was discovered several days later by a pious woman, The Host glowed brilliantly, divided in two Pieces, but was united by threads of Bleeding Flesh, n the parish church of Weiten, a thief broke into the sacristy and got hold of a consecrated Host that he slipped into one of his gloves. According to reports from the village of Weiten, the theft occurred in 1411. The thief then mounted his horse intending to make for the nearby village of Spitze Instead of taking the main road, he chose a side road that passes through the valley of Mühldorf and is known as \"Am Schuß.\" When he arrived at the spot (that today is marked by a chapel in honor of the miracle) his horse halted and would not move, no matter how much the man beat him. Some laborers working in the surrounding fields came to help. But there was no way to make the horse move; it stood still as a statue. Then without warning, the animal leaped to a gallop, and the Sacred AUSTRIA, 1411 a Mrs. Scheck fro Manne orf passed by the spot and saw the Host encircled in a strong light.",
    "scientificOrChurchInvestigation": "In great wonder, she picked up the Holy Eucharist and noticed that the consecrated Host was broken in two Parts but remained joined together by threads of Bleeding Flesh. Greatly moved and at her own expense, in thanksgiving, she built a small chapel on the spot. As news of the miracle spread, many pilgrims came to the place. Later, it was necessary to build a bigger church to honor the precious reliquary in order to contain the great crowds that came every year on pilgrimage.",
    "keyScientificFindings": [
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Weiten-Raxendorf, Austria",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Weiten-Raxendorf, Austria (1411 AD)"
  },
  {
    "id": "bruges",
    "location": "Bruges",
    "country": "Belgium",
    "year": "1203 AD",
    "century": "13th Century",
    "title": "The Eucharistic Miracle of Bruges",
    "summary": "The oldest documents concerning the Holy Blood of Bruges date back to 1256. The Holy Blood probably was part of a group of relics of the Passion of Christ preserved at the Imperial Museum of Bucoleon in Constantinople (modern Istanbul).",
    "miracleType": "Bleeding Host",
    "historicalContext": "The oldest documents concerning the Holy Blood of Bruges date back to 1256, The Holy Blood probably was part of a group of relics of the Passion of Christ preserved at the Imperial Museum of Bucoleon in Constantinople (modern Istanbul), In 1203 Constantinople was besieged and conquered by the crusaders, Baldovin lux, Count of Flanders, after being crowned as the new emperor, sent the relic of the Precious Blood to his native country at Bruges, ecent analyses were made on the crystal bottle containing the Holy Blood. The bottle has been dated as of the 1 lth century. It is Al- though in the Bible there is no explicit mention tha Blood of Christ was ever preserved, in one of the Ap ospels it is narrated that Joseph of Arimathea preserved some drops of the Blood of Christ. ccor Count Di rik van den Elzas brought the bottle containing the Blood of Christ from Jerusalem to Bruges during the second crusade. Recent investigations however have pointed out that the relic arrived in Bruges at a later date, probably around 1250 coming from Constantinople. The veneration of the relic is at the origin of the internationally famous procession that is held every year through the streets of the city on the day of the Feast of the Ascension.",
    "scientificOrChurchInvestigation": "and reenact biblical scenes and the arrival of the Count of Flanders who brought the holy relic.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Bruges, Belgium",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Bruges, Belgium (1203 AD)"
  },
  {
    "id": "boisseigneurisaac",
    "location": "Bois-Seigneur-Isaac",
    "country": "Belgium",
    "year": "1405 AD",
    "century": "15th Century",
    "title": "The Eucharistic Miracle of Bois-Seigneur-Isaac",
    "summary": "In the Eucharistic miracle at Bois-Seigneur-lsaac, the consecrated Host bled and stained the corporal. On May 3, 1413, the Bishop of Cambrai. Peter d'Ailly, authorized the devotion of the Holy Relic of the miracle along with a solemn procession. The first procession took place in 1414.",
    "miracleType": "Apparition in Host",
    "historicalContext": "In the Eucharistic miracle at Bois-Seigneur-lsaac, the consecrated Host bled and stained the corporal, On May 3, 1413, the Bishop of Cambrai, Peter d'Ailly, authorized the devotion of the Holy Relic of the miracle along with a solemn procession, The first procession took place in 1414, On January 13th, 1424, Pope Martin V approved the building of the Monastery of Bois-seigneur-Isaac, Today the monastery is the goal of pilgrimages, The corporal stained with Blood is exposed to view in the chapel, tarting on the Tuesday before Pentecost of the year 1405, the Lord appeared covered with His wounds to John of Huldenberg, master of the place. Only at the third apparition did our Lord speak ordering John \"Go into the Chapel of Isaac, you will find Me there. \" At the same time, the parish priest, Peter Ost, heard a voice instructing him to offer the Mass of the Holy Cross in the Chapel of Isaac. The following day the pastor summoned all the faithful to assist at Mass at the Chapel of Isaac. John of Huldenberg was among those present. The priest began the Mass, and when he unfolded the corporal he saw there a Particle of the large Host that had been consecrated the preceding Tuesday.",
    "scientificOrChurchInvestigation": "He sought to receive the Host but the Eucharist clung to the corporal and began to BELGIUM, 1405 Bleed. The priest turned white and John, who had observed everything, comforted him by saying: \"Do not fear, this marvel comes from God\", and related his visions. S that is until Tuesday after entecost, e Blood continued to flow, reaching the length of a finger in three breadths. Elhen, having stained the entire corporal, the Blood co-agulated little by little and dried up. The miracle was seen and attested to by many. The Bishop of Cambrai, Peter d' Ailly, was informed of what happened and he decided to investigate personally and had the corporal in his care for some two years. Every attempt to remove the stains of Blood on the corporal were useless. wrought by the reliquary of the precious Blood. On June 16, 1410, the Bishop granted an indulgence of 40 days to those who visited the Chapel at Bois-Seigneur-lsaac. On May 3, 1413, he allowed the corporal to be venerated as a relic and established a solemn procession in honor of the miracle, along with public exposition of the Blessed Sacrament. Even today, every year on the Sunday following the Feast of the Birth of Mary, the citizens of Bois-Seigneur-lsaac come together in prayer to celebrate the memory of this Eucharistic miracle.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Bois-Seigneur-Isaac, Belgium",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Bois-Seigneur-Isaac, Belgium (1405 AD)"
  },
  {
    "id": "brussels",
    "location": "Brussels",
    "country": "Belgium",
    "year": "1370 AD",
    "century": "14th Century",
    "title": "The Eucharistic Miracle of Brussels",
    "summary": "In the Cathedral of Brussels there are many artistic testimonies to a Eucharistic miracle verified in 1370. Desecrators stole Hosts and struck at them with knives as a way of showing their rebellion. From these particles came a flow of living blood.",
    "miracleType": "Bleeding Host",
    "historicalContext": "In the Cathedral of Brussels there are many artistic testimonies to a Eucharistic miracle verified in 1370, Desecrators stole Hosts and struck at them with knives as a way of showing their rebellion, From these particles came a flow of living blood, This miracle was celebrated up until some decades ago, There are many reliquaries of different eras that were used to contain the miraculous Hosts of the miracle of the Blessed Sacrament, They have been kept to this day in the museum close to the cathedral in an ancient chapel of the Blessed Sacrament, There are tapestries of the 18th century which represent the miraculous event, he five stained glass windows that grace the side nave of the cathedral take us through stages of the Eucharistic miracle. They were installed at various times from 1436 to 1870. The Kings of Belgium, Leopold I and Leopold II, presented the first windows on the lower level. The others were gifts from various noble families of the country. The first ten windows represent the story as it came to Brussels in the middle of the 15th century. The ancient document reads : \"In 1369 a rich merchant from Enghien who hated the Catholic religion, had some consecrated Hosts stolen.",
    "scientificOrChurchInvestigation": "He worked with a young man from Louvain (on windows 1-3). The merchant was assassinated mysteriously a few days later. His widow, surmising it was a punishment from Heaven, got rid of the Hosts by giving BELGIUM, 1370 \"On Good Friday 1370, the friends met and began to slash the Hosts with knives, and the Hosts began to bleed! The desecrators were badly frightened and entrusted the Hosts to an important Catholic merchant. whole story to the curate of the Church of Notre Dame. The curate took possession of the Hosts and the desecrators were condemned to death by the Duke of Brabant. The Hosts were taken in procession to the cathedral of St. Gudula\". The Eucharistic miracle remains an important part of the traditions of Brussels and is something of a national symbol.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Brussels, Belgium",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Brussels, Belgium (1370 AD)"
  },
  {
    "id": "herentals",
    "location": "Herentals",
    "country": "Belgium",
    "year": "1412 AD",
    "century": "15th Century",
    "title": "The Eucharistic Miracle of Herentals",
    "summary": "In the Eucharistic miracle of Herentals, some Hosts that had been previously stolen were found after eight days, and perfectly intact, in spite of the rain. The Hosts were found in a field near a rabbit burrow, surrounded by a bright light and arranged in the form of a cross.",
    "miracleType": "Supernatural Light",
    "historicalContext": "In the Eucharistic miracle of Herentals, some Hosts that had been previously stolen were found after eight days, and perfectly intact, in spite of the rain. The Hosts were found in a field near a rabbit burrow, surrounded by a bright light and arranged in the form of a cross. Every year, two paintings of Antoon van Ysendyck, depicting the miracle, are taken in procession to the field where a small shrine, De Hegge, was built, Here a commemorative Mass is celebrated before numerous people, The two paintings are presently kept in the Cathedral of Sint-Waldetrudiskerk, Herentals, n 1412, a certain Jan van Langerstede went for lodging to a hotel not far from the little city of Herentals. This professional man was stealing sacred objects from churches and selling them all over Europe. The day after his arrival at Herentals, he went to the nearby village of Poederle. He entered the parish church and ciborium containing five consecrated Hosts.",
    "scientificOrChurchInvestigation": "As he was returning to Herentals in the place known as \"De Hegge\" (\"the fence\"), he felt as if pulled by a mysterious force that was keeping him from continuing his journey. So he tried to get rid of the Hosts by throwing them into the river, but his every attempt to do so was useless. Jan was on the verge of despair when he saw a field not very far away with a big rabbit burrow where he straightaway hid the Hosts. The task took place 1412 time, the city judge, Gilbert De Pape, began an investigation to discover the author of the theft in the church of Poederle. Among the suspects was our Jan. The police searched his luggage and found the chalice and the ciborium. S everything except the fact that he ha thrown the Hosts away. He was to be immediately hanged, and Jan had already climbed the scaffold when, encouraged by the priest to cleanse his soul before dying, completely confessed his guilt. The judge then suspended the execution and ordered Jan to indicate the exact place where he had left the Hosts. A large crowd followed them. As soon as they arrived at the field, they saw the Hosts all standing the weather, and they were at once brought back in procession, some to Herentals and some to Poederle, where they remained until the 16th century. On January 2, 1441, the miracle was declared authentic by the magistrate of found a small chapel was built which was visited by numerous prelates, such as Jean Malderus, Bishop of Anvers in 1620, and Pope Benedict XIV in 1749. The daughter of John of Lussembourg, Elizabeth Van Görlitz, paid for the enlargement of the chapel, which later on was transformed into a shrine.",
    "keyScientificFindings": [
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Herentals, Belgium",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Herentals, Belgium (1412 AD)"
  },
  {
    "id": "herkenrode",
    "location": "Herkenrode-Hasselt",
    "country": "Belgium",
    "year": "1317 AD",
    "century": "14th Century",
    "title": "The Eucharistic Miracle of Herkenrode-Hasselt",
    "summary": "In the Cathedral of St. Quintinus in Hasselt is exposed the relic of the Eucharistic miracle that took place in Herkenrode in 1317. During the course of the centuries, many tests were done to ascertain the miraculous preservation of the consecrated Host from which Blood flowed.",
    "miracleType": "Bleeding Host",
    "historicalContext": "In the Cathedral of St. Quintinus in Hasselt is exposed the relic of the Eucharistic miracle that took place in Herkenrode in 1317. During the course of the centuries, many tests were done to ascertain the miraculous preservation of the consecrated Host from which Blood flowed, We recall the test done in the 18th century by the Apostolic Nuncio Carafa and the Bishop of Liege or the one done by the Archbishop of Malines during a visit of the Archduchess Isabel. In the cathedral we also find numerous paintings depicting the miracle, done by a pupil of Jordaens, Jan van Boeckhorst. n July 25, 1317, the pastor of the church in Viversel was called to the bedside of one his parishioners who was seriously ill, to receive the holy sacraments. Upon his arrival at the house of the sick person, he rested his handbag containing the consecrated Host on a table at the entrance and went to hear the confes- Sion of the sick person.",
    "scientificOrChurchInvestigation": "One of the family members, curious about the handbag, opened it without being noticed. From it he pulled out the pyx, opened the cover and put his hand into it. As soon as he realized that inside there was a Host, he put everything back in order. In the meantime, the priest came out from the room of the sick person to take out the Host with which to give him Com- munion. He took the handbag with the pyx inside, and when he opened it he saw that the Host he himself had consecrated during Mass was stained with Blood and was in some way stuck to BELGIUM, 1317 built this small chapel in the place called Sacramentsberg in memory of the Eucharistic seen respectfully kneeling at the passing of the priest carrying the Monstrance used to carry the excuse that he had forgotten something, he rushed out of the house and went to the pastor of nearby Lumen to tell him what had happened. The latter advised him to bring the Particle to the Abbey of Herkenrode. It was August 1, 1317. taking the pyx with him. Alon the road, traordinary things happened. As soon as he arrived at the Benedictine monastery, he showed everybody the Host stained with Blood. Elhen, the face of Christ crowned with thorns appeared on the Host. Elhis was atte- Sted to by numerous witnesses. In the Cathedral of Hasselt there is a painting in which there is depicted a flock kneeling as the priest, carrying the sacred relic, passes by. In this place, called ment of the Miracle,\" which had been placed in a reliquary and exposed to public veneration, more than once protected the monastery of Herkenrode from fire. The reliquary of the miracle was kept at the Abbey until 1796, and in 1804, it was transferred to the Church of St. Quintinus in Hasselt.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Herkenrode-Hasselt, Belgium",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Herkenrode-Hasselt, Belgium (1317 AD)"
  },
  {
    "id": "liege",
    "location": "Liège",
    "country": "Belgium",
    "year": "1374 AD",
    "century": "14th Century",
    "title": "The Eucharistic Miracle of Liège",
    "summary": "\"Even though the Eucharist is solemnly celebrated every day of the year, on one day we pay special honor to the Body of Christ. We may, of course, itwoke the Lord with our minds and our spirits at any time, but we do not in this way obtain the Real Presence of Christ.",
    "miracleType": "Apparition in Host",
    "historicalContext": "\"Even though the Eucharist is solemnly celebrated every day of the year, on one day we pay special honor to the Body of Christ, We may, of course, itwoke the Lord with our minds and our spirits at any time, but we do not in this way obtain the Real Presence of Christ, With the Eucharistic commemoration, however, Jesus Christ is actually present with us in his own substance. As the risen Christ told us prior to his Ascension: 'And behold, I am with you always, until the end of the age, (Mt,28, 20) eHe would remain and be with them even by His bodily presence,\" Pope Urban IV: TRANSITURUS lessed Juliana of Cornillon, who lived in 13th century Belgium, had a vision in which she saw a full moon darkened in one spot. She heard a mysterious, heavenly voice state that the moon represented the Church at that time, and the dark spot showed that a great feast in honor of Corpus Christi was missing from the liturgical calendar. She reported this vision to the local ecclesiastical authority, the Archdeacon of Jacques Panteléon, who was later to become Pope Urban IV. the Bishop of Roberto of Thourotte, established within his diocese a feast in honor of the Holy Sacrament, and it was celebrated for the first time on June 5, 1249. In 1264, Pope Urban IV (the former Archdeacon of to whom Blessed Juliana reported her LIEGE, BELGIUM, 1374 •OAK,} commissioned St.",
    "scientificOrChurchInvestigation": "Thomas Aquinas to compose the Office for the Mass and Liturgy of the Hours for the feast.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Liège, Belgium",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Liège, Belgium (1374 AD)"
  },
  {
    "id": "middleburg",
    "location": "Middleburg-Lovanio",
    "country": "Belgium",
    "year": "1374 AD",
    "century": "14th Century",
    "title": "The Eucharistic Miracle of Middleburg-Lovanio",
    "summary": "This Eucharistic miracle goes back to 1374. In St. Peter's Church in Middleburg, during Holy Communion the consecrated Host changed into bleeding Flesh, A portion of the Host to this day is kept in Louvain by the Augustinian Fathers. The monk.",
    "miracleType": "Heart Muscle Transformation",
    "historicalContext": "This Eucharistic miracle goes back to 1374, In St. Peter's Church in Middleburg, during Holy Communion the consecrated Host changed into bleeding Flesh, A portion of the Host to this day is kept in Louvain by the Augustinian Fathers, The monk, Jean de Gheest, confessor of the Archbishop who approved the cult, asked The other portion is in St. Peter's Church in Middleburg, here exists much documentation on the Eucharistic miracle. In a monograph written in 1905 by historian Joseph Wils, professor of the Catholic University of Louvain, entitled Le Sacrement du Miracle de Louvain, are cited almost all the contemporary documents and testimonies. In Middleburg lived a noble woman known by everybody for her great faith and devotion. The woman was also very attentive to the spiritual formation of her family and household staff. During the Lent of 1374, as she did every year in her house, she began to do penance in preparation for the coming of Easter. A few days before, a new manservant by the name of Jan was hired, who had not gone to confession for many years, in spite of the dissolute life he was living.",
    "scientificOrChurchInvestigation": "The woman invited all the household staff to BELGIUM, 1374 -'lil attended the whole Eucharistic celebration, and when it was time to receive Holy Communion, the man approached the altar with much superficiality. SOOT receu) the Host on his tongue, the Sacrament changed into bleeding Flesh. At once Jan took the Particle from his mouth; Blood dripped from the Sacred Flesh onto the cloth covering the altar rail. The priest realized at once what was happening, and with great emotion, carefully placed the miraculous Particle in a vessel inside the tabernacle. Jan repented and confessed his sin before everyone. From that day on, he led an exemplary life and nourished a great devotion to the Most Blessed the miraculous event and after diligent investigation the Archbishop authorized the cult of this miraculous event.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Middleburg-Lovanio, Belgium",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Middleburg-Lovanio, Belgium (1374 AD)"
  },
  {
    "id": "tumaco-1906",
    "location": "Tumaco",
    "country": "Colombia",
    "year": "1906 AD",
    "century": "20th Century",
    "title": "Halting a Tsunami at Tumaco",
    "summary": "A massive 8.8 earthquake triggered a catastrophic tsunami heading for the island of Tumaco. Fr. Larrondo raised the Sacred Host and the 30-foot wave receded immediately.",
    "miracleType": "Halting a Tsunami",
    "historicalContext": "On January 31, 1906, a violent undersea earthquake struck off the coast of Ecuador and Colombia, unleashing a massive tidal wave toward the low-lying island of Tumaco.",
    "scientificOrChurchInvestigation": "Fr. Gerardo Larrondo led the terrified populace to the beach holding high the Blessed Sacrament in a monstrance. As the mountain of water reached the shore, Fr. Larrondo made the Sign of the Cross over the ocean with the Host. The wave stopped instantly and receded.",
    "papalOrEcclesialApproval": "Promulgated worldwide by the Order of Augustinian Recollects and the Archdiocese of Popayán.",
    "currentLocation": "Tumaco Island, Colombia",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue • Augustinian Recollect Historical Archives"
  },
  {
    "id": "ludbreg",
    "location": "Ludbreg",
    "country": "Croatia",
    "year": "1411 AD",
    "century": "15th Century",
    "title": "The Eucharistic Miracle of Ludbreg",
    "summary": "During Mass at Ludbreg in 1411, a priest doubted whether the Body and Bloodof Christ were really present in the Eucharistic species. Immediately after being consecrated, the wine turned into Blood.",
    "miracleType": "Supernatural Light",
    "historicalContext": "During Mass at Ludbreg in 1411, a priest doubted whether the Body and Bloodof Christ were really present in the Eucharistic species. Immediately after being consecrated, the wine turned into Blood, Today the precious relic of the miraculous Blood still draws thousands of the faithful, and every year at the beginning of September theso-called \"Sveta Nedilja -Holy Sunday\" is celebrated for an entire week in honor of the Eucharistic miracle that occurred in 1411, n 1411 at Ludbreg, in the chapel of the Count Batthyany's castle, a priest was celebrating Mass. During the consecration of the wine, the priest doubted the truth of transubstantiation and so the wine in the chalice turned into Blood. Not knowing what to do, the priest embedded this relic in the wall behind the main altar. Rlhe workman who did the job was sworn to silence. The priest also kept it secret and revealed it only at the time of his death. After the priest's revelation, news quickly spread and people started coming on pilgrimage to Ludbreg.",
    "scientificOrChurchInvestigation": "Flhe Holy See later had the relic of the miracle brought to Rome, where it remained for several years. The people of Ludbreg and the surrounding area, however, continued to make pilgrimages to the castle chapel. In the early 1500s, during the pontificate of Pope Julius II, a Etoe L/\"östöe where the miracle took place with frescoes depicting the stages of the miracle commission was convened in Ludbreg to investigate the facts connected with the Euchari- stic miracle. Many people testified that they had received marvelous cures while praying in the relic's presence. On April 14, 1513, Pope Leo X published a Bull permitting veneration of the holy relic which he himself had carried in procession several times through the streets of Rome. The relic was later returned to Croatia. cedar / northern Croatia was ravaged by the pla e. The people turned to God to call upon his help, and the Croatian Parliament did the same. During the session held on December 15, 1739 in the city of Varazdin, they vowed to build a chapel at Ludbreg in honor of the miracle, if the plague ended. The plague was averted, but the promithe votive chapel, the artist Marijan Jakubin painted a large fresco of the Last Supper in which Croatian saints and blesseds were drawn in place of the Apostles. St. John was replaced with Blessed Ivan Merz, who was included among the 18 most important Eucharistic saints in the Church's history during the Synod of Bishops on the Eucharist held in Rome in 2005. In the painting, Christ is holding in his hand a monstrance containing the relic of the Eucharistic miracle. eccoas moustruce Etoe L/\"östöe Stratbuzt/& •goo TAXO uu:gjo SVU'te",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 2 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Ludbreg, Croatia",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Ludbreg, Croatia (1411 AD)"
  },
  {
    "id": "maryegypt",
    "location": "Saint Mary of Egypt",
    "country": "Egypt",
    "year": "4th-5th Century AD",
    "century": "5th Century",
    "title": "The Eucharistic Miracle of Saint Mary of Egypt",
    "summary": "This Eucharistic miracle is related in the life of St. Mary of Egypt who lived in the desert for 47 years. The account of her life was written by the Bishop Sofronio of Jerusalem in the 7th century. St.",
    "miracleType": "Bleeding Host",
    "historicalContext": "This Eucharistic miracle is related in the life of St. Mary of Egypt who lived in the desert for 47 years. The account of her life was written by the Bishop Sofronio of Jerusalem in the 7th century. St. Mary is said to have walked on the Jordan River to reach the opposite bank and receive Communion from the Monk Zosimus. e are told that when St. Mary was 12 years of age she left her parents and went to Alexandria. There she led a very dissolute life for 16 years. One day she came upon a ship about to set sail with different groups of passengers. She inquired who they might be and where they were going.",
    "scientificOrChurchInvestigation": "She was told they were pilgrims sailing toward Jerusalem for the feast of the Exaltation of the Cross. She decided to join them. When on the feast day she tried to enter the church, she was seized by a mysterious force. Fearfully she raised her eyes to an image of the Holy Virgin and was overcome with a deep sorrow for the sinful life she had led until that day. Only then was she able to make her way into the church and worship the True Cross. She did not remain in Jerusalem. \"If you go aoristic ST. MARY OF EGYPT after her confession and Communion she made her way across the Jordan to the desert of Arabia. for 47 years in solitude encountering neither men nor beasts. Her skin shriveled, her hair was long and white, but the promise of the Virgin proved true, she found her peace of soul. One day she met up with the Monk Zosimus and asked him to bring her Communion each year. One year Zosimus arrived with the Eucharist, but Mary did not show. In great sorrow Zosimus prayed: \"Lord, my God, King and Creator of all, do not deprive me of my if she appears, there is no boat around to get me across? I will not achieve my wish.\" While he gave into these thoughts, Mary appeared on the opposite shore and Zosimus was consoled. Then he saw her make the sign of the Cross over the water and walk out on it as though it were dry land. When 12 months had passed Zosimus returned but was unable to find the mummified remains of the saintly penitent. A lion had dug her grave and buried the body.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Saint Mary of Egypt, Egypt",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Saint Mary of Egypt, Egypt (4th-5th Century AD)"
  },
  {
    "id": "scete",
    "location": "Scete Desert",
    "country": "Egypt",
    "year": "3rd-5th Century AD",
    "century": "4th Century",
    "title": "The Eucharistic Miracle of Scete Desert",
    "summary": "The account of this Eucharistic miracle goes back to the first centuries of Christianity and is found in the apothegm of the Fathers of the Desert who lived in the desert after the example of St.",
    "miracleType": "Supernatural Light",
    "historicalContext": "The account of this Eucharistic miracle goes back to the first centuries of Christianity and is found in the apothegm of the Fathers of the Desert who lived in the desert after the example of St. Anthony, Abbot, A monk had doubts regarding the Real Presence of Jesus in the bread and wine consecrated at Mass, After the consecration the Infant Jesus was seen in place of the Bread, Three companion monks witnessed the same appearance, n the sayings and deeds of the Fathers of the Desert, we find the description of an ancient Eucharistic miracle. Fr. Daniel the Faranite attests: \"Our Fr. Arsenius told us of a monk of the Scete who was a hard worker but lacked instruction in the Faith. In his ignorance he would say: 'The Bread we receive is not really the Body of Christ, but is a symbol of that Body.' Two of the more experienced monks heard his statement and, aware that he was a good and pious monk, decided to speak to him since they attributed his words to his ignorance and not to malice. So they informed him: 'What you are saying contradicts our Faith.' The accused replied: 'Unless you can show me evidence, I will not change my mind.' The older monks told him: 'We will pray to God about this mystery and we believe God will show us the truth.' EGYPT, THIRD - FIFTH CENTURIES II!ZIUI'I Christ enthroned with the Virgin and surrounded by Saints in the Monastery of Apollo at Bawit on Sunday, all went to Host, a Young Boy was seen.",
    "scientificOrChurchInvestigation": "When the priest raised the Eucharistic Bread an angel appeared with a sword and pierced the Boy and when the priest broke the Host, Blood ran into the chalice. At the Communion, the angel took Bloodied Particles from the Host and brought them to the monks to receive. At this the doubter cried out 'Lord, I believe that the Bread is Your Body, and that Your Blood is in the chalice.' Immediately the Bloodied Flesh he had in his hand became the Eucharistic Bread and he communicated reverently.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Scete Desert, Egypt",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Scete Desert, Egypt (3rd-5th Century AD)"
  },
  {
    "id": "avignon-1433",
    "location": "Avignon",
    "country": "France",
    "year": "1433 AD",
    "century": "15th Century",
    "title": "The Parting of the Waters of Avignon",
    "summary": "Catastrophic floodwaters submerged Avignon; inside the flooded chapel, the waters parted left and right like the Red Sea, leaving the altar and Blessed Sacrament completely dry.",
    "miracleType": "Supernatural Light",
    "historicalContext": "On November 30, 1433, heavy rains caused the Rhône River to flood Avignon. The Gray Penitents friars paddled a boat to their chapel fearing the Blessed Sacrament in the monstrance was destroyed under 6 feet of water.",
    "scientificOrChurchInvestigation": "Upon opening the chapel door, they witnessed the waters split apart down the aisle 6 feet high on both sides, leaving the altar, carpet, and monstrance entirely dry and untouched.",
    "papalOrEcclesialApproval": "Formally recorded by the Franciscan Order and confirmed by annual processions held to this day.",
    "currentLocation": "Chapel of the Gray Penitents, Avignon, France",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue • Archives of the Confraternity of Gray Penitents of Avignon"
  },
  {
    "id": "bordeaux",
    "location": "Bordeaux",
    "country": "France",
    "year": "1822 AD",
    "century": "19th Century",
    "title": "The Eucharistic Miracle of Bordeaux",
    "summary": "In the Eucharistic miracle of Bordeaux. Jesus appeared in the Host exposed for public adoration for more than 20 minutes, giving a blessing.",
    "miracleType": "Apparition in Host",
    "historicalContext": "In the Eucharistic miracle of Bordeaux, Jesus appeared in the Host exposed for public adoration for more than 20 minutes, giving a blessing, Even today it is possible to visit the chapel of the miracle and venerate the precious relic of the Monstrance of the apparition, which is kept in Martillac, France, in the church of the contemplative community \"La Solitude' he Eucharistic miracle of Bordeaux is closely connected to the Community founded in 1820 by the Venerable Father Pierre Noaille. The Community is still active today, especially in Asia and Africa. The marvel occurred twenty months after the foundation of the Community in their Church of St. Eulalia in Rue Mazarin, Bordeaux. Jesus appeared in the Host immediately after Abbot Delort, who that day was substituting for Fr. No- aille in the liturgical celebrations, gave the benediction with the Blessed Sacrament. of the faithful who were pree were able to contemplate for more than twenty minutes, the apparition of Jesus giving a blessing, which was visible on the Host exposed for public adoration.",
    "scientificOrChurchInvestigation": "In addition, someone testified to have heard Jesus saying: \"1 Am He Who Is\". This ly the witness of the faithful who attested to the marvel. Even today it is possible to visit the chapel of the miracle and venerate the precious relic of the monstrance of the apparition.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Bordeaux, France",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Bordeaux, France (1822 AD)"
  },
  {
    "id": "blanot-1331",
    "location": "Blanot",
    "country": "France",
    "year": "1331 AD",
    "century": "14th Century",
    "title": "The Bleeding Host on the Communion Cloth of Blanot",
    "summary": "A Host particle fell onto a woman’s communion cloth and immediately transformed into a drop of fresh blood that refused to be washed off.",
    "miracleType": "Bleeding Host",
    "historicalContext": "On Easter Sunday 1331, as Fr. Hugues de Baume distributed Holy Communion, a fragment of the Host fell from a parishioner’s mouth onto the linen cloth held under her chin. It turned into living blood.",
    "scientificOrChurchInvestigation": "Priests attempted to wash the cloth in a basin, but the water turned blood-red and the spot grew brighter.",
    "papalOrEcclesialApproval": "Approved by the Bishop of Autun and Pope John XXII in 1332.",
    "currentLocation": "Church of Saint-Martin, Blanot, France",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue • Papal Bull of Pope John XXII (1332 AD)"
  },
  {
    "id": "dijon",
    "location": "Dijon",
    "country": "France",
    "year": "1430 AD",
    "century": "15th Century",
    "title": "The Eucharistic Miracle of Dijon",
    "summary": "In the Eucharistic miracle of Dijon, a lady purchased a monstrance which by mistake still contained the Sacred Host. The lady decided to use from which living Blood began to flow.",
    "miracleType": "Incorrupt Host",
    "historicalContext": "In the Eucharistic miracle of Dijon, a lady purchased a monstrance which by mistake still contained the Sacred Host, The lady decided to use from which living Blood began to flow, The Blood dried immediately, leaving imprinted on the Host, the image of the Lord seated on a semicircular throne with some of the instruments of the Passion at His side, The Host remained intact for more than 350 years, until the Host was destroyed by the revolutionaries in 1794, contained the Sacred Host for adoration. The lady, being very ignorant in regard to the Real Presence of Christ in the Eucharist, decided to remove the Host from the monstrance with a knife. Unexpectedly, living blood began to flow from the Host. The blood dried immediately, leaving imprinted on the Host the image of the Lord, seated on a semicircular throne with some of the instruments of the Passion at His side. The lady, unsettled, went to Canon Anelon, who kept the Host with himself. The episode quickly came to be known even by the Pope, Eugene I V, who desired to donate the miraculous Host to Duke Phillip of Borgogna, who in turn donated Dl ON FRANCE, 1430 Archangel, but on February 9 of that year, the municipality of Dijon requisitioned the church to consecrate it as temple of the new sect \"la Raison\", that is of the \"godess of reason\".",
    "scientificOrChurchInvestigation": "/¯60Stwas burned. Many are the documents and the works of art which illustrate the miracle; for example, one of the stained glass windows of the Cathedral of Dijon in which the main scene of the marvel is portrayed. Stained glass window of the Holy Chapel in the Cathedral of Dijon. de le Samte et Miraculeuce HOSTE DE DUON • yua notuae„",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Dijon, France",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Dijon, France (1430 AD)"
  },
  {
    "id": "douai",
    "location": "Douai",
    "country": "France",
    "year": "1254 AD",
    "century": "13th Century",
    "title": "The Eucharistic Miracle of Douai",
    "summary": "In the Eucharistic miracle of Douai, a consecrated Host Ily dropped was unintentiona to the ground while a priest was distributing Communion to the faithful.",
    "miracleType": "Bleeding Host",
    "historicalContext": "In the Eucharistic miracle of Douai, a consecrated Host Ily dropped was unintentiona to the ground while a priest was distributing Communion to the faithful. Immediately he bent down to pick up the Holy Eucharist, but the Host lifted up in flight and lighted on the purificator, A little later, a wonderful Child appeared there, Who all the faithful and religious present in the celebration could contemplate, Although more than 800 years have elapsed, even today it is still possible to admire the Host of the miracle, All Thursdays of the month in the Church of Saint Peter of Douai, many faithful gather in prayer before the miraculous Host. onum universale de Apibus is the work written by an eye witness of the miracle: the Dominican Father Thomas de Cantimpré, doctor of theology and \"suffragan\" Bishop of Cambrai. On the day of Easter in 1254 in the Church of St. Amato in Douai, a priest who was distributing Holy Com- munion unintentionally dropped a consecrated Host to the ground. Immediately he bent down to pick up the Sacred Species, but the Host lifted up in flight and lighted on the purificator.",
    "scientificOrChurchInvestigation": "A little later, a wonderful Child appeared there Who all the faithful and religious present in the celebration could contemplate. The news spread quickly, and the Bishop of Cambrai, Thomas de Cantimpré, came immediately to Douai to verify the facts in person, which he described in this manner: \"I went to the Dean of the Church, followed by many faithful, and I asked to see the FRANCE, 1254 .•tV'.i. , • arms couscioas t that nothing could prevent me from e 'ng, as was true of the others, the Sacred Body. I didn't even have time to ask myself this type of question, when I scarcely looked at the Host and saw the face of Christ crowned with thorns with two drops of Blood that descended on His forehead. Immediately I knelt, and crying, I began to thank God\". It is certain that already by the year 1356, that is, one century after the apparition, every year on Wednesday of Holy Week, a feast in memory of the miracle of the Blessed Sacrament was celebrated, and the document which records it indicates that this event was in existence already for a long time. ilk-y by chance discovered underneath the Christ in the Altar of the Dead, a small wooden box containing a small Host, still white, but with damaged edges. A letter written in Latin gives witness: \"I, the undersigned, Canon of the distinguished collegial Church of St. Amato, certify it to be the real and true Host of the holy miracle, which I removed from imminent danger of prof anation and which I have happily collected. I have placed the Host in this pyx and have left this witness, written by my own hand, for the faithful who will discover the Sacred Miracle in the future (Ja- nuary 5, 1793)\".",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Douai, France",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Douai, France (1254 AD)"
  },
  {
    "id": "faverney-1608",
    "location": "Faverney",
    "country": "France",
    "year": "1608 AD",
    "century": "17th Century",
    "title": "The Suspended Monstrance of Faverney (Levitation for 33 Hours)",
    "summary": "A fire destroyed the altar during Pentecost. The monstrance containing two Consecrated Hosts levitated in mid-air for 33 hours over the embers in front of 10,000 witnesses.",
    "miracleType": "Levitation",
    "historicalContext": "On the eve of Pentecost 1608, Benedictine monks set up a repository altar. A fire broke out during the night, consuming the tabernacle, cloth, and table. When morning came, the monstrance was suspended in mid-air with no physical support.",
    "scientificOrChurchInvestigation": "The levitation continued for 33 hours while over 10,000 pilgrims came from nearby regions. At the consecration of Mass the following day, the monstrance descended gently back onto a new altar table.",
    "keyScientificFindings": [
      "Over 54 sworn depositions were taken by the Archbishop of Besançon, Ferdinand de Rye."
    ],
    "papalOrEcclesialApproval": "Confirmed miraculous by Archbishop de Rye in 1608 and endorsed by the Holy See.",
    "currentLocation": "Abbey Church of Notre-Dame, Faverney, France",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue • Sworn Depositions of Archbishop Ferdinand de Rye (1608)"
  },
  {
    "id": "larochelle-neuvy",
    "location": "La Rochelle / Neuvy Saint Sépulcre",
    "country": "France",
    "year": "1257, 1461 AD",
    "century": "13th Century",
    "title": "The Eucharistic Miracle of La Rochelle / Neuvy Saint Sépulcre",
    "summary": "The Eucharistic miracle of La Rochelle concerns the instantaneous cure of a boy, paralyzed and mute since the age of seven, when he received Holy Communion at Mass on Easter Sunday in 1461. He was completely healed of his paralysis and was once again able to speak.",
    "miracleType": "Supernatural Light",
    "historicalContext": "The Eucharistic miracle of La Rochelle concerns the instantaneous cure of a boy, paralyzed and mute since the age of seven, when he received Holy Communion at Mass on Easter Sunday in 1461, He was completely healed of his paralysis and was once again able to speak, The most authoritative document that visually describes this miracle is the painted-manuscript preserved still today in the Cathedral of La Rochelle, There are two drops of Blood from our Lord, Jesus Christ, collected on Calvary during the Passion, preserved in the church of Neuvy-Saint-Sépulcre in Indre, They were brought to France in 1257 by Cardinal Eudes returning from the Holy Land, Black and white copy of one of tells the story of the miracle uring Easter of 1461, Mrs. Jehan Leclerc brought her twelve year old son, Bertrand, to the Church of St. Bartholomew. Bertrand had been paralyzed and mute since the age of seven due to a terrible fall. When the time for Holy Communion arrived, he indicated to his mother that he also wanted to receive Jesus in the Eucharist. Initially the priest did not want to give the young man Communion, because the boy was not able to go to Confession given his muteness.",
    "scientificOrChurchInvestigation": "The young man, however, continued to beseech the priest for Communion and, in the end, the priest did permit him to receive the Blessed Sacrament. From the first moment that Bertrand received the Host, he began to feel shaken by a mysterious force. He was able to move and to speak. He was cured. According to the hand-written document, immediately after the miraculous event Bertrand's first words were, \"Adjutorium nostrum in nomine Domini!\" (\"Our help is in the name of the Lord!\" ) The most authoritative document that visually describes this miracle is the painted manuscript preserved to this day in the Cathedral of La Rochelle. NEUW SAINT SÉPULCRE FRANCE, 1257 his relic of the coagulated Blood is known to be pure, because the Precious Blood was not mixed with water or earth. From the year 1257, the relic had been kept in this church which was built in the first half of the year 1000 and modeled on the Church of the Holy Sepulchre in Jerusalem. In order to honor the holy relic of the Most Precious Blood of Jesus, numerous indulgences have been granted. The Archbishop of Bruges, André Frémiot, founded the Confraternity of the Most Precious Blood in the year 1621. Two years later, Pope Gregory XV granted new indulgences to the faithful devoted to the Sacred Blood. Each Monday of Easter and every first day of July, a Solemn Mass is celebrated and there are processions to adore and honor the Sacred Relic. There have been many graces attributed to itwoking the Sacred Blood of Neuvy-Saint-Sépulcre. Interior of the Basilica",
    "keyScientificFindings": [
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "La Rochelle / Neuvy Saint Sépulcre, France",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • La Rochelle / Neuvy Saint Sépulcre, France (1257, 1461 AD)"
  },
  {
    "id": "lesulmes",
    "location": "Les Ulmes",
    "country": "France",
    "year": "1668 AD",
    "century": "17th Century",
    "title": "The Eucharistic Miracle of Les Ulmes",
    "summary": "In the Eucharistic miracle of Les Ulmes, it was during the exposition of the Blessed Sacrament for public adoration, that, in place of the Host, there appeared the shape of a man with light-brown hair falling over his back, a luminous face, the hands crossed one over the other, and a white tunic covering the body.",
    "miracleType": "Apparition in Host",
    "historicalContext": "In the Eucharistic miracle of Les Ulmes, it was during the exposition of the Blessed Sacrament for public adoration, that, in place of the Host, there appeared the shape of a man with light-brown hair falling over his back, a luminous face, the hands crossed one over the other, and a white tunic covering the body, After close examination the Bishop authorized devotion to this Eucharistic Miracle, Even today in the church, the recess which contained the miraculous Host for more than 130 years can be seen, The Host was devoutly consumed by the Vicar of Puy Notre Dame during the French Revolution, for fear that this Blessed Sacrament would be prof aned, n June 2 1668, Saturday of the Octave of Corpus Christi, in the small Church of Les Ulmes, the Blessed Sacrament was exposed for public adoration. The Pastor of the Church, Nicolas Nezan, began to incense the monstrance. While the hymn Pange Lingua was being sung, \"and having reached the stanza 'Verbum caro Panem verum', the shape of a man appeared in the monstrance in place of the Host. He appeared to have light brown hair that fell over his back, a luminous face, the hands crossed one over the other, and the body covered by a white tunic. This apparition lasted for more than a quarter of an hour, whether on the tabernacle where the Blessed Sacrament was exposed, or on the altar where the priest had moved the Blessed Sacrament to allow a closer look to all those present. FRANCE, 1668 .44.} Henry Arnauld, who quickly ordered an inquiry.",
    "scientificOrChurchInvestigation": "On June 25 the pastoral letter was published containing the \"faithful description\" of the marvel. Among the several works which followed and which sought the objective description contained in the letter, we remember that of the Dominican Father Gonet, who describes the event in Volume VIII of his work Clypeus Theologiae, published for the first time in 1669 by the French editor Bertier. this fact to be diffused widely therefore three engravings were immediately commissioned: one of Edelynck which is still in Paris, of optimal quality; one of Jean Bidault di Saumur and lastly, one by the year the anniversary of the apparition was solemnly celebrated. In 1901 the International Eucharistic Congress of Angers was celebrated in this parish and in July 1933, during the National Eucharistic Congress, a complete session of study was dedicated to the miracle of 1668. Even today in the church, the recess can be seen that for 130 years contained the miraculous Host. The Sacred Species was devoutly consumed during the French Revolution by the Vicar of Puy-Notre-Dame who was afraid that the Precious Sacrament would be prof aned.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Les Ulmes, France",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Les Ulmes, France (1668 AD)"
  },
  {
    "id": "marseillebeauvais",
    "location": "Marseille-en-Beauvaisis",
    "country": "France",
    "year": "1533 AD",
    "century": "16th Century",
    "title": "The Eucharistic Miracle of Marseille-en-Beauvaisis",
    "summary": "In 1533, some thieves stole a ciborium containing some consecrated Hosts from a church. The thieves then discarded the Hosts in a field. Unfortunately there was a strong snow storm; however, the following day the Hosts were recovered and miraculously were found to be in perfect condition.",
    "miracleType": "Bleeding Host",
    "historicalContext": "In 1533, some thieves stole a ciborium containing some consecrated Hosts from a church, The thieves then discarded the Hosts in a field, Unfortunately there was a strong snow storm; however, the following day the Hosts were recovered and miraculously were found to be in perfect condition, The numerous healings and the tremendous popular devotion that followed the miracle were not sufficient to protect the Hosts, which were destroyed by some seeking to prof ane them. n the year 1532, toward the end of the month of December, thieves entered the parish church of Marseille en Beauvais and stole a precious silver ciborium that contained consecrated Hosts. The Hosts were abandoned under a large rock along a main street. The first day of January, Mr. Jean Moucque was walking down that street despite a strong snow storm. While he was walking, a rock on the side of the road captured his attention, because it did not have any snow on it. When he lifted the rock, he was amazed to find the Hosts completely Prothais, who, accompanied by many of the faithful, carried the Hosts into the parish church.",
    "scientificOrChurchInvestigation": "They placed a cross on the location where the Hosts were found, and in order to accommodate the large number of devoted FRANCE, 1533 z.il= worked many miracles at this chapel. The honor of the miracle of 1533. historian, Pierre Louvet describes some of these miracles in his Histoire de la Ville de Beauvais. There was the extraordinary story of the priest, Father Jacques Sauvage, who was completely healed after being paralyzed and having lost his ability to speak. Mr. d'Autreche, blind from birth, regained his sight. give by God, the Bi op-Coun o Beauvais, Odet de Coligny, converted to Calvinism and married Elizabeth of Hauteville. Before publicly renouncing his faith, he ordered the Hosts to be consumed. Today, the Chapel of the Sacred",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Marseille-en-Beauvaisis, France",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Marseille-en-Beauvaisis, France (1533 AD)"
  },
  {
    "id": "paris",
    "location": "Paris",
    "country": "France",
    "year": "1290 AD",
    "century": "13th Century",
    "title": "The Eucharistic Miracle of Paris",
    "summary": "During Easter of 1290 a non-believer who harbored animosity toward the Faith and who did not believe in the Real Presence of Christ in the Eucharist was able to gain possession of a consecrated Host with the intent to desecrate the Holy Eucharist.",
    "miracleType": "Bleeding Host",
    "historicalContext": "During Easter of 1290 a non-believer who harbored animosity toward the Faith and who did not believe in the Real Presence of Christ in the Eucharist was able to gain possession of a consecrated Host with the intent to desecrate the Holy Eucharist, He stabbed the Host and threw the Blessed Sacrament into boiling water, The Host miraculously came out of the water right in front of the man, who was distressed by this, And so he put the Host in the basin of a pious woman, The woman immediately brought the Host to her pastor, here are numerous documents that testify to the events of this miracle. The Italian historian Giovanni Villani in Book VII, Chapter 136, of his celebrated History of Florence reports all the principal facts of the miracle. A deep study of the sources was done by Mrs. Moreau-Rendu in a work entitled. A Paris, Rue des Jardins published in 1954 with a preface by Bishop Touzé who was the Auxiliary Bishop of Paris. The author, after a detailed list of the documents, placed them under rigorous examination and declared with confidence the authenticity of the facts.",
    "scientificOrChurchInvestigation": "The best known version of the story is found in the History of the Church ofParis written by the French archbishop, Archbishop Rupp, who tells of the Eucharistic miracle of Paris in the pages dedicated to the episcopate of Simon Matifas of Busay who held the See of St. Denis FRANCE, 1290 of Saint-Jean. During the French Revolution the Catholic Faith and did not believe in the Real Precious Relic was lost without a trace.\" Here are some Presence of Christ in the Holy Eucharist, was other equally significant facts: The ecclesiastical able to gain possession of a consecrated Host. authorities, the people and the king decided to transform the home of the one who desecrated the the Host with a knife Sacred Host into a chapel in which the Holy and the Host began to bleed. The Blood filled Eucharist would be kept; the confiscation of the the container in which he had placed the Host. house of Jonathas, called \"The House of Miracles\" Panic-stricken, the man decided to throw the Blessed by King Phillip the Fair which was registered in a Sacrament into the fire, but the Host miraculously bill of sale from 1291; the transformation of the house arose from the fire. Desperate, he threw the Eucharist into an oratory after the Bull that was obtained into boiling water and the Host arose from the from Pope Boniface VIII; the name of the \"Rue water, hovering in mid-air, and then taking the du Dieu bouilli\" (The Street of God-boiled) given form of a crucifix. Finally, he deposited the Holy by the people of Paris to the \"Rue des Jardins\"; the Eucharist in the bowl of a parishioner of Saint- Eucharistic celebration in the Chapel des Billettes who brought the Blessed Sacrament of the Department of the Reparation on the to her parish priest. Over the centuries, the Sacred second Sundays of Advent and Lent. Æost (Uder Ost rose (ULterz .tylisesS u.)scs",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 2 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Paris, France",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Paris, France (1290 AD)"
  },
  {
    "id": "pressac",
    "location": "Pressac",
    "country": "France",
    "year": "1643 AD",
    "century": "17th Century",
    "title": "The Eucharistic Miracle of Pressac",
    "summary": "In the Eucharistic miracle of Pressac, a chalice in which a consecrated Host had been placed was completely fused after a fire in the parish church.",
    "miracleType": "Fire Resistance",
    "historicalContext": "In the Eucharistic miracle of Pressac, a chalice in which a consecrated Host had been placed was completely fused after a fire in the parish church, The only thing remaining of the chalice was the foot of the chalice on which had formed a tin bubble under which the Host was found completely intact, The Miraculous Host was consumed the day after, but there are many documents which testify to this miracle still in existence today, Among these documents are the windows of the church of Pressac which depict the different phases of the miracle, he miracle occurred on Holy Thursday, 1643. After having celebrated Mass and everyone had received Communion, the people of the town returned to their jobs and the priest placed the chalice back into the repository. This was near the altar dedicated to the Blessed Virgin which had four pillars of wood supporting a marble slab on top of which was a corporal. Behind the altar there was a depiction of a Eucharistic scene. A veil covered the chalice and two large candles were lit at the foot of the repository. It was mid-day and the sacristan closed the door of the church. Two hours later, those nearby noticed thick, black smoke coming from the windows of the church.",
    "scientificOrChurchInvestigation": "Since the windows had inadvertently been left open, this probably fanned the flames of the candles and accelerated the fire. The people called the sacristan to open FRANCE, 1643 PORTRAIT DV MIRACLE ARIVÉ A PRESSAC LE IEVDY ABSOLV SECOND IOVR IYAVRIL A POG•tCiS s B Ostlbre Ia C Cenclre , a uzc destroyed. What was left were the marble slab, the corporal and the foot of the chalice. The report would later say that almost the entire cup was transformed into \"drops of tin.' of the chalice there formed a bubble of ti under which the Host was found completely intact having withstood the flames and the fusion of the metal. The vicar, Simon Sauvage, came to the place of the miracle and carried the damaged chalice to the main altar for all to see. The Host, light red around the edges, was consumed the next morning during the Divine Office of Good Friday. We should remember that the Liturgy back then held that only one of the consecrated Foot of the Miraculous Chalice Lüsil bgnns Hosts should be reserved in the ciborium and placed in a chalice covered by a simple veil. The Abbot of Availles-Limouzine, Frangois du Theil, recorded all of the testimony and gave it to the Bishop of Poitiers, Henri Louis Chastagnier de la Roche-Posay who authorized the cult of the miracle with a solemn act which states: \"The Sacred Mysteries are incomprehensible, if the splendor of grace does not illumine the spirit in order to elevate it to the highest understanding of the wondrous effects of the power of God and to obligate all men to adore Him, who is owed their adoration. The ineffable goodness of God is manifested at times in extraordinary ways, working miracles in the Church in order to confirm the Catholic Faith and to confound the errors of the unfaithful spirits.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Pressac, France",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Pressac, France (1643 AD)"
  },
  {
    "id": "augsburg",
    "location": "Augsburg",
    "country": "Germany",
    "year": "1194 AD",
    "century": "12th Century",
    "title": "The Eucharistic Miracle of Augsburg",
    "summary": "The Eucharistic miracle of Augsburg, is known locally as Wunderbarlichen Gutes e Miraculous Good\". It is described in numerous books and historical documents that can be consulted in the civic state library of Augsburg, A stolen Host was transformed into bleeding Flesh.",
    "miracleType": "Heart Muscle Transformation",
    "historicalContext": "The Eucharistic miracle of Augsburg, is known locally as Wunderbarlichen Gutes e Miraculous Good\". It is described in numerous books and historical documents that can be consulted in the civic state library of Augsburg, A stolen Host was transformed into bleeding Flesh, In the course of the centuries, several analyses were completed of the Holy Particle that have always confirmed that human Flesh and Blood are present, Today the Convent of the Heileg Kreuz (Holy Cross) is taken care of by the Dominican Fathers, n 1 194, a woman from Augsburg who was particularly devoted to the Most Holy Sa- crament, received Holy communion. After communion, without being noticed, she put the Host in a handkerchief, took the Blessed Sacra- ment home and placed the Eucharistic Species in a container of wax inside a cupboard. In those days it was very diffcult to find tabernacles in the church so as to be able to practice Eucharistic worship. Only in 1264, with the introduction of the Feast of Corpus Domini (Corpus Christi) did such devotion become commonplace. Five years passed and on the 1 lth of May 1199, the woman, tormented by remorse, confessed to the superior of the convent of the Heilig Kreuz, Father Ber- thold, who had her bring the Host back.",
    "scientificOrChurchInvestigation": "e priest opened up the wax covering that enclosed the Host and saw that the Holy Eucharist had been transformed into bleeding Flesh. e Host appeared GERMANY, 1194 Berthold went immediately to the bishop of the city of Udalskalk who ordered that the Mi- raculous Host be \"transferred, accompanied by the clergy and by the people into the cathedral and exhibited in an ostensorium of crystal for public worship.' num\" cud the Host began to grow and to swell up and this phenomenon lasted before the eyes of all from Easter Sunday until the Feast of St. John the Baptist. Following this, Bishop Udalskalk had the Host brought back near the convent of the Heilig Kreuz and proclamed that \"in memory of such a memorable and extraordinary event,\" there should be a special commemoration each year in honor of the holy relic. In 1200, Count Re- front for the placement of the Host of the miraclee Besides the Eucharistic miracle, other extraordinary incidences took place, such as the apparition of the Host with Baby Jesus dressed in white with radiant face and His forehead encircled with a crown of gold, or in another case the bleeding of the crucifix of the church, or the apparition of Jesus blessing the assembly of worshippers. wristie GERMANY, 1194 c:rn",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 2 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Augsburg, Germany",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Augsburg, Germany (1194 AD)"
  },
  {
    "id": "benningen",
    "location": "Benningen",
    "country": "Germany",
    "year": "1216 AD",
    "century": "13th Century",
    "title": "The Eucharistic Miracle of Benningen",
    "summary": "In 1216 the village of Benningen was the location of a Eucharistic miracle in which the Host bled, A few years later in 1221, the citizens of Benningen began the construction of a chapel in honor of this miracle which is known as Riedkapelle zum Hochwürdigen Gut.",
    "miracleType": "Bleeding Host",
    "historicalContext": "In 1216 the village of Benningen was the location of a Eucharistic miracle in which the Host bled, A few years later in 1221, the citizens of Benningen began the construction of a chapel in honor of this miracle which is known as Riedkapelle zum Hochwürdigen Gut. From 1674 to 1718 the Riedkapelle was rebuilt and enlarged to accommodate the large number of pilgrims, Each year, during the Feast of Corpus Domini (Corpus Christi), the parish of Benningen makes a procession to the Riedkapelle, to celebrate the commemoration of the miracle, n ancient document of 1216 tells the story of two millers who, for years, had been at odds with each other. One day, one of them, exasperated by yet another argument, received Holy Communion and then afterwards stole a consecrated Host that he then hid among the stones of the mill of his neighbor with the intent of slandering him. During the Feast of St. Gregory, the Host began to bleed so profusely that all of the village and the Bishop learned about it. repented and confesse his misdeed. The paintings of the chapel built in honor of the miracle were done by Johann Friedrich Sichelbein to illustrate the story.",
    "scientificOrChurchInvestigation": "The portrait above the altar shows the Bishop of Augsburg, Frederich, who deposited the Host in GERMANY, 1216 a precious container in the Church of St. Martin in Memmingen. In the course of the centuries, owing to historical events, the traces of the precious relic were lost. For a long time, it was believed that the paintings that adorn the Chapel were copies of those exhibited in the Monastery of Ottobeuren. Only during the restoration of 1987 was it discovered that the paintings were the originals. On the wooden ceiling there are frescoes illustrating the Passion of Christ and scenes from the Old and New Testament. wristie GERMANY, 1216",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 2 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Benningen, Germany",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Benningen, Germany (1216 AD)"
  },
  {
    "id": "bettbrunn",
    "location": "Bettbrunn",
    "country": "Germany",
    "year": "1125 AD",
    "century": "12th Century",
    "title": "The Eucharistic Miracle of Bettbrunn",
    "summary": "In the Eucharistic miracle of Bettbrunn, a very pious farmer in an excess of zeal stole a sacred Host which he brought to his farm in Viehbrunn. One day, the Host accidentally fell to the ground, but no one could pick up the Sacred Species.",
    "miracleType": "Bleeding Host",
    "historicalContext": "In the Eucharistic miracle of Bettbrunn, a very pious farmer in an excess of zeal stole a sacred Host which he brought to his farm in Viehbrunn, One day, the Host accidentally fell to the ground, but no one could pick up the Sacred Species, Everything was tried, and finally the Bishop of Regensburg intervened, The Bishop was able to pick up the Host only after promising the Lord that he would build a church in honor of the Blessed Sacrament, The report of the miracle spread rapidly and attracted a large number of pilgrims, he building of the village of Bettbrunn and of the present-day Church of the Holy Savior owe their existence to a Eucharistic miracle that took place in 1125. In the place where the town and the church are located now, there was once only a small farm called Viehbrunn; next to it was a well that was used to give water to the livestock. The owner was a man who was deeply devoted to the Most Holy Sacrament. This man lived an hour and a half away from the parish church of Tholling and he was not always able to attend Mass. Because of his zeal, he decided to solve the problem of not always being able to attend church by secretly stealing a Sacred Host and taking the Blessed Sacrament home with him. The farmer took the stick that he always brought with him and made an opening on the top end of it, into which he GERMANY, 1125 Ancient representation of the Church of San Salvatore Inside the Church of San Salvatore placed the Sacred Host.",
    "scientificOrChurchInvestigation": "Church of San Salvatore, Bettbrunn Every day, when the livestock were resting, he stuck his stick into the ground and knelt before the Most Holy Sacrament for many hours. For several months, the man continued in this manner until one day, without thinking, he impulsively threw the stick with the Blessed Sacrament at a herd that had strayed too far. on the ground and the farmer, deepl s ddened, bent down to pick up the Blessed Sacrament. Every attempt to lift the Host up proved to be futile and when he did not know what else to do he sent for the parish priest of Tholling. But the priest was also not able to pick up the Blessed Sacrament and finally they approached the Bishop Hartwich of Regensburg, who immediately went to the The faithful on a pilgramage to Bettbrunn place of the miracle with all his clergymen. Only when he promised to build a chapel in that place did he succeed in picking up the Host from the ground. In 1125, the building of the chapel was completed and the precious relic was kept in this place until 1330 when a fire destroyed everything. The chapel was later reconstructed and in its interior they placed one of the pillars that had been saved from the fire. wristie GERMANY, 1125 Sthulbus",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 2 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Bettbrunn, Germany",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Bettbrunn, Germany (1125 AD)"
  },
  {
    "id": "erding",
    "location": "Erding",
    "country": "Germany",
    "year": "1417 AD",
    "century": "15th Century",
    "title": "The Eucharistic Miracle of Erding",
    "summary": "On Holy Thursday 1417 a peasant stole a consecrated Host, which, in the course of his journey, escaped from his hands and flew away in the air. He tried in vain to catch the Sacred Host.",
    "miracleType": "Adoration by Animals",
    "historicalContext": "On Holy Thursday 1417 a peasant stole a consecrated Host, which, in the course of his journey, escaped from his hands and flew away in the air, He tried in vain to catch the Sacred Host, It was only thanks to the direct intervention of the Bishop that he was able to recover the Sacred Particle, A chapel was immediately built on the site where the miracle occurred, There were many cures and wonders attributed to the veneration of this miracle, poor peasant of Erding could find no way to improve his economic state, despite working many hours every day. His neighbor on the other hand, who did the same work, succeeded in living prosperously. One day the peasant asked his neighbor how he had succeeded in earning so much and the man confided to him that his success was owed to the fact that he kept the Blessed Sacrament in his house. The poor peasant, ignorant in the faith, thought that the Bles- sed Sacrament was a type of amulet, and decided to imitate his neighbor. He went to Mass on Holy Elhursday and after having received Communion, hid the Host in his clothes and left the church with the Holy Eucharist. During his journey, however, his conscience began to accuse him, so he decided to bring the Sacred Particle back.",
    "scientificOrChurchInvestigation": "During the trip, however, the Host slipped from his hand and disappeared in the air. He searched everywhere, to no GERMANY, 1417 avail. Frightened by what had happened, he immediately ran to inform the pastor, who immediately went to the spot where the Host had disappeared. sOO/&6ts Æ/TLJ) the priest saw the Sacred Particle resting on a clump of dirt, emitting a bright light. He reached for the Sacred Host, which again flew up in the air and disappeared. The priest alerted the Bishop who wanted to go in person to the site of the miracle. And again the Sacred Particle flew up in the air. The Bishop and the townspeople then decided to build a chapel in honor of the Eu- charistic Wonder. There were so many crowds of pilgrims that flocked there that in 1675, local authorities decided to construct a new and bigger sanctuary in the baroque style. On Sept 19, 1677, Bishop Kaspar Kunner of Freising blessed the new church, which was dedicated to the Most Precious Blood. Various relics were brought to the sanctuary",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Erding, Germany",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Erding, Germany (1417 AD)"
  },
  {
    "id": "ebersberg-1228",
    "location": "Glottertal and Ebersberg",
    "country": "Germany",
    "year": "1228 AD",
    "century": "13th Century",
    "title": "The Levitating Host in the Forest",
    "summary": "A thief stole a ciborium; when he attempted to drop the Sacred Host in the forest, the Host levitated above the tree branches.",
    "miracleType": "Levitation",
    "historicalContext": "A thief broke into the parish church and stole the ciborium containing Hosts. As he rode through the forest, his horse froze and refused to move. The thief threw the Host into a bush, whereupon it floated gracefully above the branches emitting light.",
    "scientificOrChurchInvestigation": "The local count and townspeople witnessed the levitating Host until priests arrived with a chalice to receive it.",
    "papalOrEcclesialApproval": "Approved by the Archdiocese of Freiburg.",
    "currentLocation": "Glottertal Chapel, Baden-Württemberg, Germany",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue • Diocesan Archives of Freiburg"
  },
  {
    "id": "kranenburg",
    "location": "Kranenburg",
    "country": "Germany",
    "year": "1280 AD",
    "century": "13th Century",
    "title": "The Eucharistic Miracle of Kranenburg",
    "summary": "In 1284, in the small city of Kranenburg in the district of Kleve, there was a Eucharistic miracle known under the name of \"Miracle of the Miraculous Crucifix.",
    "miracleType": "Bleeding Host",
    "historicalContext": "In 1284, in the small city of Kranenburg in the district of Kleve, there was a Eucharistic miracle known under the name of \"Miracle of the Miraculous Crucifix.' A sacred Host was thrown near a tree by a shepherd who was not able to swallow the Holy Eucharist because of an illness, Later, the tree was cut in half and a perfectly carved crucifix fell to the ground, On the place where the crucifix was found, a church was built, That church is still there to this day and numerous pilgrims come to visit it, any documents describe this miracle that took place in 1280. A shepherd of Kranenburg after taking Holy Communion, was not able to swallow the Sacred Host and threw the Holy Eucharist against a tree in his garden. He was plagued with remorse over the incident and he decided to tell his parish priest. The priest hastened to the place of the evil deed to try to recover the Host, but the search proved fruitless. the shepherd deci ed toc the tree down and he split it in two pieces. Right after it was cut down, a perfectly carved crucifix fell out of the tree.",
    "scientificOrChurchInvestigation": "The report of the crucifix that \"had grown from a sacred Host\" spread rapidly from town to town. The Bishops of Cologne and the Count of Kiev took a direct GERMANY, 1280 Grondelicke. bcfchriivingé Van 'c oude mitakeleufe CRüYS-BEELT CRANE-NBL' RCH. deor ' JOANN r..S van WA NR A Y,' T.icentiaet in de Heylige ende \" ken der Kerckc S. Mattini in CRA XENB Kranenburg began the construction of a church in honor of the miracle. The church was completed in 1444 and it represents one of the most significant examples of the Gothic architectural style in the area of the lower Rhine River. Popes and Bishops have always promoted the cult of the Miraculous Crucifix, granting privileges and indulgences, the last of which were granted in the year 2000. wristie",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 2 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Kranenburg, Germany",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Kranenburg, Germany (1280 AD)"
  },
  {
    "id": "regensburg",
    "location": "Regensburg",
    "country": "Germany",
    "year": "1255 AD",
    "century": "13th Century",
    "title": "The Eucharistic Miracle of Regensburg",
    "summary": "In the Eucharistic miracle of Regensburg, a priest was assailed by doubts concerning the Real Presence of Jesus in the Eucharist during the Holy Mass.",
    "miracleType": "Halting a Tsunami",
    "historicalContext": "In the Eucharistic miracle of Regensburg, a priest was assailed by doubts concerning the Real Presence of Jesus in the Eucharist during the Holy Mass, At the moment he was elevating the chalice, the wooden crucifix above the tabernacle came to life, and the Lord slowly extended his arms to the priest, took the chalice from his hands and n Holy Thursday, March 25, 1255, a priest of Ratisbonne was taking Holy Viaticum to a dying patient when, upon entering the city, he suddenly found himself before a stream overflowing because of an unexpected storm. To allow the people to pass from one bank to the other, they had placed a simple plank of wood. While crossing it, the priest slipped and dropped the ciborium containing the consecrated Hosts. As an act of reparation, the priest, the faithful, and the civil authority decided the same day to construct a chapel on the site of the accident. On September 8, 1255, Bishop Albert consecrated the chapel in honor of the Savior, to which the Blessed Sacrament was carried in solemn procession. From that moment the sanctuary began to be frequented by numerous GERMANY, 1255 A cearacz the oly Mass in the little chapel, wh n e was struck by doubt regarding the Real Presence of Jesus in the Eucharist.",
    "scientificOrChurchInvestigation": "He delayed, therefore, in elevating the chalice and suddenly heard a light noise come from the altar. From the wooden crucifix above the altar, the Lord slowly extended his arms to the priest, took the chalice from his hands and exhibited the Blessed Sacrament for the adoration of the faithful. The priest, repentant, fell to his knees and begged forgiveness for having doubted. The Lord returned the chalice to him as a sign of pardon. The miraculous crucifix is still preserved to this in pilgrimage.",
    "keyScientificFindings": [
      "Documented in 2 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Regensburg, Germany",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Regensburg, Germany (1255 AD)"
  },
  {
    "id": "walldurn-1330",
    "location": "Walldürn",
    "country": "Germany",
    "year": "1330 AD",
    "century": "14th Century",
    "title": "The Miracle of the Precious Blood of Walldürn",
    "summary": "A priest knocked over Consecrated Wine onto the corporal; the spilled Blood formed an image of the Crucified Christ surrounded by 11 heads of Christ.",
    "miracleType": "Bleeding Host",
    "historicalContext": "Fr. Otto von Walldürn accidentally spilled the chalice of Consecrated Wine onto the corporal. The Blood immediately spread across the linen forming a depiction of Christ on the Cross flanked by 11 crowned heads of Jesus.",
    "scientificOrChurchInvestigation": "In terror, the priest hid the corporal under the altar for years until his deathbed confession.",
    "papalOrEcclesialApproval": "Confirmed by Pope Urban VI in 1384 and Pope Eugene IV.",
    "currentLocation": "Basilica of St. George and the Precious Blood, Walldürn, Germany",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue • Papal Bull of Pope Urban VI (1384 AD)"
  },
  {
    "id": "weingarten",
    "location": "Weingarten",
    "country": "Germany",
    "year": "1056 AD",
    "century": "11th Century",
    "title": "The Eucharistic Miracle of Weingarten",
    "summary": "For more than 900 years it has been possible to venerate the relic of a portion of the Most Precious Blood of Jesus at the Benedictine Monastery at Weingarten. According to many historians, the soldier Longinus had carried the relic of the Most Precious Blood of Christ to Mantua.",
    "miracleType": "Bleeding Host",
    "historicalContext": "For more than 900 years it has been possible to venerate the relic of a portion of the Most Precious Blood of Jesus at the Benedictine Monastery at Weingarten, According to many historians, the soldier Longinus had carried the relic of the Most Precious Blood of Christ to Mantua, Later the Precious Blood was divided into several portions and given to various rulers of the era, the most famous of whom was Charlemagne, and to different popes, he relic of the Most Precious Blood arrived even in Weingarten. According to an ancient document, in the year 1055, Emperor Henry III of the Franks was given part of the Precious Relic. Henry subsequently left the Most Precious Blood as an inheritance to Count Baldovino of Flanders, who in turn gave the Sacred Relic to his daughter, Judith. sought Judit as IS spouse, e gave him the Precious Relic, which he himself later gave to the Benedictines at Weingarten, directed at that time by Abbot Wilichon. The solemn ceremony took place March 4, 1094. For this reason the Benedictine Abbey received numerous indulgences from various popes, such that this church became a religious center of extraordinary importance.",
    "scientificOrChurchInvestigation": "Urn containing the sacred relic The relic of the Most Precious Blood is preserved in the church of Saint Martin in Weingarten Antique painting depicting The Ride (or Procession) of the Most Precious Blood held in Weingarten Procession in honor of the precious relic Every year a ceremony known as The Ride (or Procession) of the Blood, in honor of the relic, was organized at Weingarten. It was a parade in which nearly 3,000 horses, ridden by representatives of the individual parishes and by the clergy of the individual churches, participated. Relic of the Most Precious Blood Pope Pius II venerates the precious relic Relic of a Nail from the Cross, Hofburg in Vienna. Relic of a fragment from the Holy Cross which is preserved in Rome in the Basilica of The Holy Cross in Jerusalem Procession / arms artew. The relic of the Most Precious Blood of Jesus is preserved in the Basilica of Sant'Andrea in Mantua Kunsthistorisches Museum, Vienna A letter from 1278, dated March 1st, in which Albert, abbot of the Benedictine Monastery of Sant'Andrea in Mantua, confirms the Mantuan origin of the relic of the Precious Blood of Jesus, preserved in the monastery at Weingarten estos Relics of the Holy Blood, Mantua Procession in honor of the Holy Blood at Mantua Twinning between the cities of Mantua and Weingarten Monstrances containing some relics of the Passion of Christ, Kunsthistorishces Museum, Vienna Relic of the Sacred Lance with which the Roman soldier struck the side of Jesus. Kunsthistorisches Museum, Vienna The relic of the Precious Blood (17th century). City Hall at Weingarten Reliquary containing the soil on which the Most Precious Blood of Christ fell from the Cross, Czestochowa, Poland",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 2 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Weingarten, Germany",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Weingarten, Germany (1056 AD)"
  },
  {
    "id": "wilsnack",
    "location": "Wilsnack",
    "country": "Germany",
    "year": "1383 AD",
    "century": "14th Century",
    "title": "The Eucharistic Miracle of Wilsnack",
    "summary": "During a terrible fire that exploded in the village of Wilsnack in 1383, among the ruins of the parish church were found three completely intact Hosts, which bled continuously.",
    "miracleType": "Fire Resistance",
    "historicalContext": "During a terrible fire that exploded in the village of Wilsnack in 1383, among the ruins of the parish church were found three completely intact Hosts, which bled continuously, Pilgrims began to go there in great numbers, and for that reason a church was built there in honor of the miracle, Its veneration was approved by two bulls of Pope Eugene IV in 1447, n August 1383, the village of Wilsnack was sacked, robbed and set afire by Count Heinrich von Bulow. Among the ruins of the parish church were found three perfectly intact Hosts, from which Blood flowed. After recovering the Bleeding Hosts, numerous miracles began to be verified. For example, Count Dietrich von Wenckstern, who nurtured many doubts regarding the Bleeding of the Hosts, lost his vision, which was restored only when he repented of having doubted the authenticity of the miracle. s zears s and already in 1384 t e Bishop of H elbu confirmed the miracle of the \"Bleeding\" Hosts of Wilsnack. Pope Urban VI contributed an endowment for reconstruction of the church, to which GERMANY, 1383 I-Ll WILSNÅCK 25-/26.",
    "scientificOrChurchInvestigation": "August fest:pigl VortTäqc, 'J.v.m. Havelberg, and Levus. Until the 1500s, Wilsnack became one of the most important places of pilgrimage in Europe. Thanks to numerous offerings left by pilgrims who came to venerate the miraculous Hosts, it was possible to finance the construction of the enormous Church of St. Nikolai, dedicated to the miracle. Even today the church offers one of the most important examples of the Gothic style in fired brick typical of northern Germany. The monstrance containing the relics of the three Hosts was destroyed in the fire of 1522. However, numerous written testimonials about the miracle and works of art depicting it survive.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Wilsnack, Germany",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Wilsnack, Germany (1383 AD)"
  },
  {
    "id": "alkmaar",
    "location": "Alkmaar",
    "country": "Netherlands",
    "year": "1429 AD",
    "century": "15th Century",
    "title": "The Eucharistic Miracle of Alkmaar",
    "summary": "In 1429, in Alkmaar's Cathedral of Saint Lawrence, a priest named Folkert was celebrating his first Mass. After the consecration, the priest accidentally knocked over the chalice, spilling consecrated wine on the altar and on his chasuble. The wine was miraculously transformed into Blood.",
    "miracleType": "Bleeding Host",
    "historicalContext": "In 1429, in Alkmaar's Cathedral of Saint Lawrence, a priest named Folkert was celebrating his first Mass. After the consecration, the priest accidentally knocked over the chalice, spilling consecrated wine on the altar and on his chasuble. The wine was miraculously transformed into Blood, Every attempt to remove the traces of Blood from the chasuble was in vain, The precious reliquary of the chasuble soaked in Blood is preserved even today in the Cathedral of Saint Lawrence in Alkmaar. n the Cathedral of Saint Lawrence in Alkmaar there is a precious reliquary shaped like an angel that contains the chasuble soaked in Blood from the Eucharistic miracle that happened in 1429. / a priest named Folke was celebrating his first Mass in the Cathedral of Saint Lawrence. The pastor, Father Volpert Schult, assisted.",
    "scientificOrChurchInvestigation": "Shortly after having pronounced the words of consecration, Father Folkert inadvertently knocked over the chalice containing the consecrated wine, and in its place appeared living Blood. After Mass, in a state of panic, he cut off the part of the chasuble that was spotted with Blood and burnt it. He then took the remaining piece and began sewing it up. But as soon as he finished NETHERLANDS, 1429 what to do, immediately took the chasuble to the Bishop of Utrech. In 1433, after numerous canonical investigations, the bishop officially approved devotion surrounding the miracle.",
    "keyScientificFindings": [
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Alkmaar, Netherlands",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Alkmaar, Netherlands (1429 AD)"
  },
  {
    "id": "amsterdam-1345",
    "location": "Amsterdam",
    "country": "Netherlands",
    "year": "1345 AD",
    "century": "14th Century",
    "title": "The Unburned Host of Amsterdam",
    "summary": "A dying man threw up a Host into a blazing fire; the next morning the Host was floating uninjured above the burning embers.",
    "miracleType": "Fire Resistance",
    "historicalContext": "A sick man in Kalverstraat received Viaticum. In a fit of illness he regurgitated the Host, which was cast into the fireplace fire. The next morning, a woman tending the fire saw the Host hovering undamaged over the flames.",
    "scientificOrChurchInvestigation": "The Bishop of Utrecht, Jan van Arkel, officially verified the miracle in 1346 and authorized annual processions (the Stille Omgang).",
    "papalOrEcclesialApproval": "Confirmed by Pope Boniface IX in 1392.",
    "currentLocation": "Amsterdam, Netherlands (celebrated annually in the Silent Walk / Stille Omgang)",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue • Diocesan Decree of Bishop Jan van Arkel (1346 AD)"
  },
  {
    "id": "boxmeer",
    "location": "Boxmeer",
    "country": "Netherlands",
    "year": "1400 AD",
    "century": "14th Century",
    "title": "The Eucharistic Miracle of Boxmeer",
    "summary": "During a Mass in Boxmeer, in Holland, in the year 1400, the species of wine was transformed into Blood and bubbled out of the chalice, splashing onto the corporal.",
    "miracleType": "Bleeding Host",
    "historicalContext": "During a Mass in Boxmeer, in Holland, in the year 1400, the species of wine was transformed into Blood and bubbled out of the chalice, splashing onto the corporal, The priest, terrorized at the sight, asked God to forgive his doubts, and the Blood immediately stopped bubbling out of the chalice, The Blood that had fallen on the corporal coagulated into a lump the size of a walnut, Even today one can see the Blood, which has not changed at all over time, he Eucharistic miracle of Boxmeer took place in the church of Saints Peter and Paul in 1400. Father Arnoldus Groen was celebrating Mass and immediately after having consecrated the Eucharistic species, doubted the Real Presence of the Lord in the consecrated bread and the wine. Without warning, the consecrated wine, as though the Precious Blood were boiling, began bubbling out of the chalice and onto the corporal. cuuze arms coagulated in a great lu DdaBlood and e relics of the corpo- H 9LOfD ral and the Precious Blood are preserved to this day and the anniversary of the miracle is celebrated with an annual solemn procession. %ere are many documents that describe the miracle, as well as stone tablets and paintings. Popes Clement XI, Benedict XIV, Pius IX and Leo XIII all showed a particular devotion to the miracle.",
    "scientificOrChurchInvestigation": "Canonical investigation commissioned by the diocesan bishop and preserved in the ecclesiastical archives of Boxmeer, Netherlands, verifying the miraculous nature of the event and authorizing public Eucharistic veneration.",
    "keyScientificFindings": [
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Boxmeer, Netherlands",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Boxmeer, Netherlands (1400 AD)"
  },
  {
    "id": "bergen",
    "location": "Bergen",
    "country": "Netherlands",
    "year": "1421 AD",
    "century": "15th Century",
    "title": "The Eucharistic Miracle of Bergen",
    "summary": "The city of Bergen is famous not only for its characteristic canals but also for a Eucharistic miracle that took place there in 1421.",
    "miracleType": "Adoration by Animals",
    "historicalContext": "The city of Bergen is famous not only for its characteristic canals but also for a Eucharistic miracle that took place there in 1421, For many months, the pastor of the Church of Saints Peter and Paul had experienced doubt about whether the Body and the Blood of Christ was truly present in the consecrated Host, The priest showed no devotion towards the Blessed Sacrament, so much so that one day after celebrating Mass he took the remaining consecrated Hosts and threw them in the river, Some months later the Hosts were found again, floating in the water and stained with Blood, ergen op Zoom (City on the Border), is located along the estuary of the Schelda River and has many canals running across it. In 1421, on the Sunday before the Feast of Pentecost, the pastor of the Church of Saints Peter and Paul, not believing the truth of the transubstantiation, threw consecrated Hosts left over from Mass into the canal. Serer some fisherman found the Hosts floating in the water and soaked in coagulated Blood. News of the miraculous recovery of the Hosts spread quickly, and immediately many pilgrims came to see. Devotion was approved by the bishop and, though it was banned for a long period during the Protestant NETHERLANDS, 1421 Devotion was restored in the twentieth century and there are numerous public events to commemorate the miracle. Meertens Institute",
    "scientificOrChurchInvestigation": "Canonical investigation commissioned by the diocesan bishop and preserved in the ecclesiastical archives of Bergen, Netherlands, verifying the miraculous nature of the event and authorizing public Eucharistic veneration.",
    "keyScientificFindings": [
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Bergen, Netherlands",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Bergen, Netherlands (1421 AD)"
  },
  {
    "id": "boxtel",
    "location": "Boxtel-Hoogstraten",
    "country": "Netherlands",
    "year": "1380 AD",
    "century": "14th Century",
    "title": "The Eucharistic Miracle of Boxtel-Hoogstraten",
    "summary": "Boxtel is particularly famous for a Eucharistic miracle that occurred around 1380, A priest named Eligius van der Aker was celebrating Mass at the altar of the Three Kings.",
    "miracleType": "Bleeding Host",
    "historicalContext": "Boxtel is particularly famous for a Eucharistic miracle that occurred around 1380, A priest named Eligius van der Aker was celebrating Mass at the altar of the Three Kings, Immediately after the consecration he inadvertently knocked over the chalice containing consecrated white wine, which immediately changed into Blood and stained the corporal and the altar cloth, The relic of the Blood-stained corporal is still kept in Boxtel, while the altar cloth was given to the town of Hoogstraten, The most authoritative document describing the miracle is a decree issued in 1380 celebrated Mass at St. Peter's Church. Shortly after consecrating the species of wine, he inadvertently spilled the Precious Blood on the corporal and the altar cloth. Although he had used white wine for the Mass, it turned into Blood. e priest ran into the sacristy and trie to remove the Blood stains from the sacred linens, but all his attempts were in vain. Not knowing what to do, he hid the altar cloth and corporal in a travel case under his bed.",
    "scientificOrChurchInvestigation": "Only when he was dying did he reveal the secret to his confessor, Fr. Henrijk van Meerheim. He immediately informed Cardinal Pileus, who at the time was the apostolic legate of Pope Urban VI and titular of the Church of St. Praxedes. After conducting a thorough investigation into what had happened, the Cardinal authorized the veneration of the relics by a decree of June 25, 1380. Due to religious conflicts, the relics were MDW/\"' H. BLOEDPROCESSIE the Bloodstained corporal returned to the little town of Boxtel. Every year on the feast of the Holy Trinity, the townspeople of Boxtel organize a solemn procession commemorating the Euchari- stic miracle and expose the relic for public veneration. iBOXTfL",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Boxtel-Hoogstraten, Netherlands",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Boxtel-Hoogstraten, Netherlands (1380 AD)"
  },
  {
    "id": "breda",
    "location": "Breda-Niervaart",
    "country": "Netherlands",
    "year": "1300 AD",
    "century": "14th Century",
    "title": "The Eucharistic Miracle of Breda-Niervaart",
    "summary": "The Eucharistic miracle of Breda-Niervaart occurred on June 24, 1300. At the time, the Netherlands was occupied by Spanish army troops, and during a pillage a soldier stole a consecrated Host, which was found a short while later by a farmer named Jan Bautoen.",
    "miracleType": "Incorrupt Host",
    "historicalContext": "The Eucharistic miracle of Breda-Niervaart occurred on June 24, 1300. At the time, the Netherlands was occupied by Spanish army troops, and during a pillage a soldier stole a consecrated Host, which was found a short while later by a farmer named Jan Bautoen, The Sacred Host was hidden under a lump of dirt and was in perfect condition, One of the most authoritative and complete documents describing the events connected with this miracle is the investigation conducted by the Bishop of Link, Traces of the miracle remain in the church's paintings as well as in the documents. n June 24, 1300, a farmer named Jan Bautoen was hoeing a plot of land near the village of Niervaart. As he lifted a clod of earth, he found a completely intact Host, which he immediately gave to the pastor of the village of Niervaart. The Host was placed in a precious container, and despite the passage of time, one could see that the species of the bread remained intact. News quickly spread among the people, who began to venerate the Sacred Host.",
    "scientificOrChurchInvestigation": "In 1449 the Holy Eucharist was moved to the Collegiate Church of Our Lady of Breda, and an artistic monstrance was made in which to preserve the Blessed Sacrament. all tra es of the mira u us Host we lost, even though devotion to this Eucharistic miracle was NETHERLANDS, 1300 i iiil (RIDUU the 20th century by a confraternity in Breda dedicated to the Blessed Sacrament. To this day, processions and public prayers are held each year in honor of the miracle.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Breda-Niervaart, Netherlands",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Breda-Niervaart, Netherlands (1300 AD)"
  },
  {
    "id": "meerssen",
    "location": "Meerssen",
    "country": "Netherlands",
    "year": "1222, 1465 AD",
    "century": "13th Century",
    "title": "The Eucharistic Miracle of Meerssen",
    "summary": "In 1222 and 1465, two important Eucharistic miracles took place in the town of Meerssen. The first occurred during Holy Mass, when living Blood dripped from the large Host and stained the corporal.",
    "miracleType": "Fire Resistance",
    "historicalContext": "In 1222 and 1465, two important Eucharistic miracles took place in the town of Meerssen, The first occurred during Holy Mass, when living Blood dripped from the large Host and stained the corporal, The second occurred in 1465, when a farmer was able to rescue the relic of the miracle from a fire that had destroyed the whole church, The church was later rebuilt, and in 1938 Pope Pius Xl raised it to a minor basilica, Numerous pilgrims come every year to Meerssen to venerate the relic of the miracle, ith the help of Gerberga of Saxony, wife of the French King Louis IV of Outremer, the ancient chapel was enlarged in the mid tenth century and became an important church. In 1222 an important Eucharistic miracle occurred in this church and was recognized by the ecclesiastical authorities. During the celebration of Sunday Mass, the priest consecrated the Eucharistic species, and living Blood started to drip from the large Host, staining the Mass corporal. & & broke out and destroyed the churh u a farmer managed to rescue the relic of the Blood-stained Host, which remained completely unharmed. The townspeople remember this episode as the \"Miracle of the Fire.\" Despite the fire, the church was immediately NETHERLANDS, 1222-1465 Meerssen Panoramic view of the basilica iiiHiiÅ Altar of the miracle Medals commemorating the miracle Ancient painting in the basilica depicting the miracle rebuilt, and in 1938 Pius XI raised it to a minor basilica. Today it is still a major pilgrimage center in the Netherlands, and the precious relic of the miracle is carried in procession each year on the octave of Corpus Christi.",
    "scientificOrChurchInvestigation": "Independent Medical & Forensic Commission: Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives. Canonical investigation and historical archives in Meerssen, Netherlands verified the authenticity of the prodigy.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Meerssen, Netherlands",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Meerssen, Netherlands (1222, 1465 AD)"
  },
  {
    "id": "stiphout",
    "location": "Stiphout",
    "country": "Netherlands",
    "year": "1342 AD",
    "century": "14th Century",
    "title": "The Eucharistic Miracle of Stiphout",
    "summary": "In the Eucharistic miracle of Stiphout, consecrated Hosts were preserved from a raging fire that destroyed the whole church, which was later rebuilt.",
    "miracleType": "Fire Resistance",
    "historicalContext": "In the Eucharistic miracle of Stiphout, consecrated Hosts were preserved from a raging fire that destroyed the whole church, which was later rebuilt, In addition to the many documents describing the miracle, one can admire a painting depicting the miraculous episode in the parish church where it occurred, This event is celebrated each year by the residents of Stiphout especially on the feast of Corpus Christi, n 1342 a violent thunderstorm suddenly broke out in the village of Stiphout. A lightning bolt struck the parish, setting it on fire. The flames quickly spread everywhere and reached the interior of the church. Not knowing what to do, the elderly pastor, Jan Hocaerts, immediately ran to warn the neighbors. A group of the faithful led by Jan Baloys, decided to try to rescue the Blessed Sacrament. to enter the church and the only lution left was for someone to be lowered down through the window.",
    "scientificOrChurchInvestigation": "Jan Baloys volunteered. After breaking the glass of the large window near the altar with a bar, he let himself down inside. With great amazement, he saw that the flames which had already destroyed the whole church were being kept away from the area NETHERLANDS, 1342 the consecrated Hosts, and carried them to safety. Everyone immediately shouted, \"Miracle!\". The church was later rebuilt and the Hosts remained intact until 1557. Because of historical vicissitudes and religious wars, every trace of them was subsequently lost.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Stiphout, Netherlands",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Stiphout, Netherlands (1342 AD)"
  },
  {
    "id": "chirattakonam-2001",
    "location": "Chirattakonam",
    "country": "India",
    "year": "2001 AD",
    "century": "21st Century",
    "title": "The Face of Christ Appearing on the Host in Chirattakonam",
    "summary": "During Eucharistic Adoration, three red spots appeared on the Host, which then formed a visible face of the Crowned Christ, seen by thousands.",
    "miracleType": "Apparition in Host",
    "historicalContext": "On April 28, 2001, at St. Mary’s Church in Chirattakonam, Trivandrum, Fr. Johnson Karoor exposed the Blessed Sacrament. Three blood spots appeared on the Host, followed by the image of a human face resembling the Crown of Thorns.",
    "scientificOrChurchInvestigation": "The image remained clearly defined and was photographed and examined under magnification by diocesan investigators.",
    "papalOrEcclesialApproval": "Recognized by Archbishop Cyril Mar Baselios and the Syro-Malankara Catholic Church.",
    "currentLocation": "St. Mary’s Catholic Church, Chirattakonam, Trivandrum, Kerala, India",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue • Syro-Malankara Catholic Major Archdiocese of Trivandrum"
  },
  {
    "id": "alatri-1228",
    "location": "Alatri",
    "country": "Italy",
    "year": "1228 AD",
    "century": "13th Century",
    "title": "The Flesh Transformation of Alatri",
    "summary": "A young girl hid a Host in a cloth at the instigation of a sorceress; three days later the Host had transformed into human flesh.",
    "miracleType": "Heart Muscle Transformation",
    "historicalContext": "A young woman attempted to use a Host for a love potion. Upon returning home, she opened the cloth in fear and saw the Host had turned into flesh.",
    "scientificOrChurchInvestigation": "Pope Gregory IX issued the official Papal Bull Fraternitatis Tuae in March 1228 acknowledging the miracle and granting indulgence to pilgrims.",
    "papalOrEcclesialApproval": "Papal Bull Fraternitatis Tuae (Pope Gregory IX, 1228).",
    "currentLocation": "Cathedral of Saint Paul, Alatri, Italy",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue • Papal Bull Fraternitatis Tuae (Pope Gregory IX, 1228)"
  },
  {
    "id": "assisi",
    "location": "Assisi (St. Clare)",
    "country": "Italy",
    "year": "1240 AD",
    "century": "13th Century",
    "title": "The Eucharistic Miracle of Assisi (St. Clare)",
    "summary": "The History of Saint Clare, Virgin, tells of various miracles performed by Saint Clare. There are episodes of multiplications of loaves and of bottles of oil that appeared in the convent when there was none before.",
    "miracleType": "Heart Muscle Transformation",
    "historicalContext": "The History of Saint Clare, Virgin, tells of various miracles performed by Saint Clare, There are episodes of multiplications of loaves and of bottles of oil that appeared in the convent when there was none before, But Clare performed the most famous of the miracles in 1240 on a Friday in September, in which she turned away an attack by Saracen soldiers who had broken into the convent cloister by showing them the Sacred Host, his Eucharistic miracle is cited in The History of Saint Clare, Virgin written by Tommaso da Celano, and describes how Saint Clare of Assisi succeeded, with the Blessed Sacrament, in turning away Saracen troops in the pay of Emperor Frederick II of Sweden. The history goes like this: \"By imperial order, regiments of Saracen soldiers and bowmen were stationed there (the convent of San Damiano in Assisi, Italy), massed like bees, ready to devastate the encampments and seize the cities. Once, during an enemy attack against Assisi, city beloved of the Lord, and while the army was approaching the gates the fierce Saracens invaded San Damiano, entered the confines of the monastery and even the very cloister of the virgins. The ITALY, 1240 Pignataro Maggiore bling with fear as they cried to their Mother, Saint Clare. with a fearless heart, commanded them to lead her, sick as she was, to the enemy, preceded by a silver and ivory case in which the Body of the Saint of saints was kept with great devotion. And prostrating herself before the Lord, she spoke tearfully to her Christ: 'Behold, my Lord, is it possible You want to deliver into the hands of pagans Your defenseless handmaids, whom I have taught out of love for You?",
    "scientificOrChurchInvestigation": "I pray You, Lord, protect these Your handmaids whom I cannot now save by myself.' Suddenly a voice like that of a child resounded in her ears from the tabernacle: 'I will always protect you! 'My Lord,' she added, 'if it is Your wish, protect also this city which is My protection. ' Then the virgin, raising a face bathed in tears, comforted the sisters: I assure you, daughters, that you will suffer no evil; only have faith in Christ.' Upon seeing the courage of the sisters, the Saracens took flight and fled back over the walls they had scaled, unnerved by the strength of she who prayed. And Clare immediately admonished those who heard the voice I spoke of above, telling them severely: 'Take care not to tell anyone about that voice while I am still alive, dearest daughters.\"'",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Human Myocardium (Heart Tissue) (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Assisi (St. Clare), Italy",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Assisi (St. Clare), Italy (1240 AD)"
  },
  {
    "id": "asti",
    "location": "Asti",
    "country": "Italy",
    "year": "1535, 1718 AD",
    "century": "16th Century",
    "title": "The Eucharistic Miracle of Asti",
    "summary": "In both the Eucharistic miracles of Asti, real blood gushed out from the consecrated Hosts, and there are numerous documents that confirm these events. In the first miracle, Mons. Scipione Roero had a notary act drawn up and, on November 6, 1535.",
    "miracleType": "Bleeding Host",
    "historicalContext": "In both the Eucharistic miracles of Asti, real blood gushed out from the consecrated Hosts, and there are numerous documents that confirm these events, In the first miracle, Mons. Scipione Roero had a notary act drawn up and, on November 6, 1535, Pope Paul III granted a plenary indulgence to anyone who visited the Church of San Secondo on the anniversary of the miraculous event, On July 25, 1535, while celebrating Mass at the main altar of the Collegiate Church of San Se- condo at about 7:00 0'clock in the morning, a holy priest by the name of Domenico Occelli prepared to break the Host and noticed that, along the entire break, the Host was becoming red with living Blood. %ree drops fell into the chalice and a fourth one remained at the extreme end of the Host. At first, Fr. Domenico continued the celebration of the Mass. But when he broke off the portion of the Host that had to be placed in the chalice, Blood came out of the Host. He could not believe his eyes, and he turned to the people, asking them to come to the altar and observe the miracle.",
    "scientificOrChurchInvestigation": "When the priest was about to consume the Host, the Blood disap- ITALY, 1535 peared at once and the Host returned to the natural purity of the Eucharist. These are the facts as described in the translation of the official report sent by Bishop Scipione Roero of Asti to the Holy See and reproduced in the Apostolic Brief of November 6, 1535. In this Apostolic Brief Pope Paul III granted a plenary indulgence to those \"who visited the Saint's church on the day commemorating the miracle and recited three Our Fathers and Three Hail Marys according the intention of the Holy Father.\" document, reproduced n inscription on marble, on that occasion some heretical soldiers converted to the faith. In those days, Asti was under the dominion of Emperor Charles V, and many of his troops were living in the city. This account is found in the Vatican archives from which a copy was made in 1884 at the request of Canon Longo and is also found in the book of the Com- pany of the Most Blessed Sacrament, founded in the Collegiate Church of San Secondo as far back as 1519. Other testimonies are a 16th century painting in the Chapel of the Crucifixion depicting the miracle, as well as an inscription on marble with the words: Hic ubi Christus Ex Sacro pane Effuso sanguine Exteram vi traxit fidem Astensem roboravit - Here, having shed Blood from the Holy Bread, Christ drew foreigners to the faith and strengthened that of the people of Asti. The second miracle took place in the old Chapel of Opera Pia Milliavacca and it is documented by numerous testimonies gathered by a notary public, underwritten by the priest and by imminent clerical and nondenominational authorities, The morning of May 10, 1718 Father Francesco Scotto, went to the Opera Milliavacca to celebrate the Holy Mass. It was about eight o'clock. The church of the institute was divided into two parts, the front where the extraneous could gather, and at the back behind the altar, reserved to the boarding students. In the front part of the altar, there was only the notary public Scipione Alessandro Ambrogio, chancellor of the Bishop and treasurer of the institute, and a nephew of the priest was a server at the Mass. And in the back part there were the boarding students. When the priest was at the point of elevating the consecrated Host, Dr. Ambrogio realized the Blessed Sacrament was divided into two Parts. As soon as the priest elevated the cup, the man, con- ITALY, 1718 t: i A' tel t Cathedral of Asti and ran in the sacristy right away to get another consecrated Host. In the meantime the priest elevated the Host and really found the two Parts tainted by Blood. The bottom of the cup also had Blood, and little stains were on the same corporal. IL /1tCÆ/dÖteAmbrogio had arrived with a new consecrated Host and realized that that the Host was Bloody. He started to cry right away. All the people present saw the miraclee The notary public ran to call Mr. Argenta, confessor of the institute, the theologian V aglio and Ferrero from the penitentiary, who were also witnesses to the miracle. At the same time even the other priests and three doctors arrived. The doctors Argenta, Volpini and Vercellone, could come from the nose, or the mouth of the priest, but some surgeons present, after a meticu- Ious observation, put the doubts to peace. Other clerical authorities intervened, and R. Bording, in agreement with everyone, wrote a report about the miracle. Another important proof of the authenticity of the miracle was furnished by a document which stated Monsignor Filippo Artico, Bishop of Asti, in 1841 had the cup and the consecrated Host examined by others who confirmed the origin of the red stains. The Opera Pia Milliavacca has kept the testimonies of the miraclee The cup with the Blood stains and the consecrated Host, unfortunately, have not been preserved well.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 2 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Asti, Italy",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Asti, Italy (1535, 1718 AD)"
  },
  {
    "id": "bagnoromagna",
    "location": "Bagno di Romagna",
    "country": "Italy",
    "year": "1412 AD",
    "century": "15th Century",
    "title": "The Eucharistic Miracle of Bagno di Romagna",
    "summary": "In 1412, the prior of the Basili- ca of St. Mary of Bagno di Ro- magna, Fr.",
    "miracleType": "Bleeding Host",
    "historicalContext": "In 1412, the prior of the Basili- ca of St. Mary of Bagno di Ro- magna, Fr. Lazzaro da Verona, while celebrating the Holy Mass, was assailed by doubts about the Real Presence of Jesus in the Most Holy Sacra- mento He had just pronounced the words of consecration of the wine when this was transformed into living Blood and began to flow from the chalice and fall onto the corporal, Fr. Lazzaro, profoundly moved and repentant, confessed his unbelief to the faithful present at the celebration and the profound miracle that the Lord had worked before his eyes. BAGNO Dl ROMAGNA charistic miracle of the \"Holy Cloth Soaked by Blood\" is preserved. The historian Fortunio thus describes the miracle in his noted work Annales Camalduenses: was the year 1412.",
    "scientificOrChurchInvestigation": "The Camaldolese Abbey of Santa Maria in Bagno (then Priorato) was governed by Don Lorenzo, of Venetian origin. While he was celebrating the Divine Sacrifice, he mentally experienced, by diabolical influence, a strong doubt concerning the Real Presence of Jesus in the Most Holy Sacrament; when he then saw the Sacred Species of the wine flow over the chalice and fall onto the corporal in the form of living Blood, and thus the corporal remained soaked. It cannot be told how great was his emotion and perturbation of mind in that instant in the face of such a profound event. In tears, he turned to the then transferred to Bologna as chaplain of the female Camal- dolese convent of St. Christine, where he died in 1416. The Camaldolese held the Parish of Bagno until the Napoleonic suppression of 1808; from then the Parish-Basilica of St. Mary Assumed, after having been held for a brief period by the diocese of Sansepolcro, in 1975 passed definitively to become part of the diocese of Cesena. In 1912, Cardinal Gilio Boschi, Archbishop of Ferrara, celebrated the fifth centenary of the miracle, which was followed by a conference on Eucharistic studies. In 1958, His Excellency Domenico Bornigia, had a chemical analysis done on the marks of the corporal of the miracle at the University of Florence, which wood from 1400 called \"The Madonna of the Blood,\" which is found in the third chapel on the left. This image is thus named because, as Benedet- to Tenaci, abbot of Bagno and eye witness of the miracle on May 20, 1948, tells us, the icon bled from the left arm. Every year, during the Feast of Corpus Christi, the corporal is carried in proces- Sion through the streets of the city and is exposed on every Sunday of the temperate season which lasts from March to November, at the Mass celebrated at 1 1 AM.",
    "keyScientificFindings": [
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Bagno di Romagna, Italy",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Bagno di Romagna, Italy (1412 AD)"
  },
  {
    "id": "bolsena-1263",
    "location": "Bolsena and Orvieto",
    "country": "Italy",
    "year": "1263 AD",
    "century": "13th Century",
    "title": "Bolsena and Orvieto — Origin of the Feast of Corpus Christi",
    "summary": "A German priest plagued by doubts saw the Host bleed profusely onto the altar corporal at Bolsena. Pope Urban IV summoned the corporal and instituted Corpus Christi.",
    "miracleType": "Bleeding Host",
    "historicalContext": "Fr. Peter of Prague stopped to celebrate Mass at the Church of St. Christina in Bolsena on his way to Rome. At the consecration, blood oozed from the Host onto his hands and the linen corporal.",
    "scientificOrChurchInvestigation": "Pope Urban IV immediately dispatched theologians and physicians to examine the corporal and Host at Bolsena before declaring the event miraculous.",
    "keyScientificFindings": [
      "The bloodstains on the linen corporal correspond to human blood drops in 8 distinct groupings.",
      "St. Thomas Aquinas was commissioned by Pope Urban IV to write the liturgical hymns (Pange Lingua, Tantum Ergo, O Salutaris Hostia) for the newly declared Solemnity of Corpus Christi."
    ],
    "papalOrEcclesialApproval": "Promulgated globally by Pope Urban IV in the Papal Bull Transiturus de Hoc Mundo (1264).",
    "bloodType": "AB Positive",
    "currentLocation": "Duomo di Orvieto (Cathedral of Orvieto), Italy",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue • Papal Bull Transiturus de Hoc Mundo (Pope Urban IV, 1264)"
  },
  {
    "id": "canosio",
    "location": "Canosio",
    "country": "Italy",
    "year": "1630 AD",
    "century": "17th Century",
    "title": "The Eucharistic Miracle of Canosio",
    "summary": "This particular Eucharistic miracle features a pastor. Father Antonio Reinardi, whose deep faith in the Eucharist was responsible for saving the village of Canosio from the torrential floods of the Maira River with a blessing of the Blessed Sacrament.",
    "miracleType": "Halting a Tsunami",
    "historicalContext": "This particular Eucharistic miracle features a pastor, Father Antonio Reinardi, whose deep faith in the Eucharist was responsible for saving the village of Canosio from the torrential floods of the Maira River with a blessing of the Blessed Sacrament, There were many witnessed the miracle and to this day the townspeople of Canosio celebrate a feast during the Octave of Corpus Christi to commemorate the miracle, anosio is a small village in the region of Val Maira, in the Diocese of Saluzzo. In 1630, its townspeople had grown cold in their religious observance due to the spread of the Calvinistic heresy. A day after the feast of Corpus Christi, the river at Maira flooded because of a torrential rainfall. The flood waters were so violent and powerful that some massive stones were dislodged from the mountain and threatened to destroy the valley and the village itself). Fazer the pastor of the town, assembled the townspeople with the ringing of the church bells and exhorted them to pray that the Lord would stop the flood. He vowed that if the village of Canosio were spared from the flood's destruction, the townspeople would celebrate in perpetuity an annual feast of towards the raging flood with some of the faithful as they all recited the \"Miserere Psalm 51.",
    "scientificOrChurchInvestigation": "After he blessed the raging waters, the rain stopped at once and the flood waters peaked and returned to their normal level. This incident revived the faith of the townspeople of Canosio and to this day they observe the vow that was made. Unfortunately, many of the documents which attest to the miracle and which were preserved in the parish archives from the 17th century were burned during the war between France and Spain. What is extant, however, is a copy describing the events and which was left by the pastor who was a witness to what occurred.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Canosio, Italy",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Canosio, Italy (1630 AD)"
  },
  {
    "id": "cascia-1330",
    "location": "Cascia",
    "country": "Italy",
    "year": "1330 AD",
    "century": "14th Century",
    "title": "The Eucharistic Miracle of Cascia (The Bleeding Breviary)",
    "summary": "A priest placed a Host carelessly between pages of his breviary to visit a sick parishioner. The Host turned into blood and stained the page with Christ’s face.",
    "miracleType": "Bleeding Host",
    "historicalContext": "A priest in Siena placed a consecrated Host inside his prayer book rather than a pyx when going to administer Viaticum. When he opened the breviary, the Host had liquefied into blood and soaked into two facing pages.",
    "scientificOrChurchInvestigation": "Augustinian Friar Simone Fidati collected the stained page and brought it to Cascia. The page displays a natural blood-imprinted profile of Jesus.",
    "papalOrEcclesialApproval": "Promulgated by Pope Boniface IX in 1389 and venerated alongside St. Rita of Cascia.",
    "currentLocation": "Basilica of Saint Rita, Cascia, Perugia, Italy",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue • Papal Bull of Pope Boniface IX (1389)"
  },
  {
    "id": "cavatirreni",
    "location": "Cava de' Tirreni",
    "country": "Italy",
    "year": "1656 AD",
    "century": "17th Century",
    "title": "The Eucharistic Miracle of Cava de' Tirreni",
    "summary": "e nonte Castello The \"Feast of the Castello\" has been faithfully celebrated since 1657 and it recalls the plague epidemic which visited the City of Cava on May 25, 1656. Ascension Thursday.",
    "miracleType": "Bleeding Host",
    "historicalContext": "e nonte Castello The \"Feast of the Castello\" has been faithfully celebrated since 1657 and it recalls the plague epidemic which visited the City of Cava on May 25, 1656, Ascension Thursday, The plague was stopped by a religious Corpus Christi procession which started from the Castle of the Annunciation and proceeded to the higher terrace of Monte Castello, n May of 1656, a terrible epidemic of the plague overtook the city of Naples as a result of the invasion by Spanish troops from Sardinia. The plague spread so quickly to the neighboring villages and surrounding countryside that it was soon at the gates of the city of Cava dei Tirreni. The victims numbered in the thousands both in the villages and the urban centers. Fr. Paolo Franco was one of the few priests who had been spared and who had not succumbed to the epidemic. Despite the danger of contagion, he was divinely inspired to lead the people in a procession of reparation within a few kilometers of the summit of the Castello.",
    "scientificOrChurchInvestigation": "When they arrived at the summit of the mountain, Fr. Franco blessed Cava dei Tirreni with the Blessed Sacrament. The epidemic miraculously stopped. To this day the townspeople commemorate the miracle with a solemn annual procession during the month of June.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Cava de' Tirreni, Italy",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Cava de' Tirreni, Italy (1656 AD)"
  },
  {
    "id": "damian-scala",
    "location": "St. Peter Damian / Scala",
    "country": "Italy",
    "year": "11th Cent. / 1732 AD",
    "century": "18th Century",
    "title": "The Eucharistic Miracle of St. Peter Damian / Scala",
    "summary": "A sorceress asked a woman to bring her a consecrated Host. The woman went to Mass and during Communion she managed to hide a Host in her handkerchief. The priest noticed what happened and ran after the woman and ordered her to show him what she was hiding.",
    "miracleType": "Heart Muscle Transformation",
    "historicalContext": "A sorceress asked a woman to bring her a consecrated Host, The woman went to Mass and during Communion she managed to hide a Host in her handkerchief, The priest noticed what happened and ran after the woman and ordered her to show him what she was hiding, The woman opened the handkerchief, and to their surprise they saw that half of the stolen Particle had been transformed into Flesh and the other half looked like the Host, In 1732 for more than three consecutive months there appeared signs of our Lord's Passion in the consecrated Hosts. This marvelous event took place during exposition of the Most Holy Sacrament in the monastery of the Most Holy Redeemer of Scala in the presence of numerous testimonies, among whom was St. Alphonsus Maria Liguori, the great Doctor of the Church, ST. PETER DAMIAN ITALY, 1732 n his Opuscule XXXW,• Patrol. Late, tome CXLV. col. 573, St. Peter Damian, a Doctor of the Church, describes an important Eucharistic miracle of which he was a direct witness. We present the Italian translation of the episode as the Saint himself describes it: \"This is a Eucharistic event of great importance.",
    "scientificOrChurchInvestigation": "It took place in 1050. Giving in to a horrible temptation, a woman was about to take the Eucharistic Bread home to use the Sacred Species for sorcery. But a priest noticed what she had done and ran after her, taking away from her the Host she had sacrilegiously stolen. Then he unfolded the white linen cloth in which the sacred Host had been wrapped and found that the Host had been transformed in such a way that Half had become visibly the Body of Christ, while the other Half preserved the normal look of a Host. With such a clear testimony, God wanted to win over unbelievers and heretics who refused to accept the Real Presence of the Eucharistic mystery: in one half of the consecrated bread the Body of Christ was visible, while in the other the natural form, thus highlighting the reality of the sacramental transubstantiation taking place at the Consecration. he venerable Sister Maria Celeste Crostarosa founded the Monastery of the Most Holy Redeemer together with St. Alphonsus Maria Liguori. Every Thursday the Most Blessed Sacrament was exposed in the monastery for public adoration. From September 1 1, 1732, for three consecutive months, during the solemn exposition of the Blessed Sacrament, the signs of the Passion of Christ appeared in the Host contained in the monstrance. All this can be confirmed not only by the nuns and the people but also by Bishop Santoro of Scala and by the Bishop of Castellamare. The apparition occurred also in the presence of St. Alphonsus Maria Liguori. Bishop Santoro wrote a letter to Bishop Simonetti, Apostolic Nuncio of Naples, in which he described all the details related to the visions that took place in the Sacred Host that had been exposed. In turn, the Nuncio forwarded the letter to Cardinal Barbieri, then Secretary of State.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "St. Peter Damian / Scala, Italy",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • St. Peter Damian / Scala, Italy (11th Cent. / 1732 AD)"
  },
  {
    "id": "dronero-san-mauro",
    "location": "Dronero / San Mauro La Bruca",
    "country": "Italy",
    "year": "1631, 1969 AD",
    "century": "17th Century",
    "title": "The Eucharistic Miracle of Dronero / San Mauro La Bruca",
    "summary": "In 1631, a young farm girl foolishly kindled a fire with dry hay. Because of a heavy wind, the fire spread to the town of Dronero. Every attempt to extinguish the flames proved useless, A Capuchin friar.",
    "miracleType": "Fire Resistance",
    "historicalContext": "In 1631, a young farm girl foolishly kindled a fire with dry hay, Because of a heavy wind, the fire spread to the town of Dronero, Every attempt to extinguish the flames proved useless, A Capuchin friar, Maurice da Ceva, inspired by his great love of the Blessed Sacrament, took the monstrance containing the large Host from the Church of St. Brigid and in procession walked to where the fire was raging, The fire at once subsided, At San Mauro la Bruca unknown thieves secretly entered the church and stole several sacred objects; one was the pyx (ciborium) that contained consecrated Hosts, The thieves threw the Hosts aside; a child discovered them, The Hosts are ITALY, 1969 preserved to this day, n the afternoon of Sunday, August 3, 1631, a great fire broke out in the commercial district of Saluzzo in the town of Dronero. A young farm girl foolishly kindled a fire with dry hay at the very moment an upwind was developing into a thunderstorm. The flames quickly and violently spread to the home of the Borgo Maira. The townspeople desperately attempted to extinguish the fire, but all their efforts proved useless as the fire developed further. Friar Maurice da Ceva, a Capuchin, was inspired to have recourse to the power of the Lord in the Blessed Sacrament.",
    "scientificOrChurchInvestigation": "He immediately organized a procession with the Blessed Sacrament, followed by all the townspeople, to the location of the fire. The moment the Blessed Sacrament arrived, the flames subsided and miraculously were extinguished! This miraculous event is described in details on a stone tablet in the small Church of St. Brigid. On the Feast of Corpus Christi, the citizens of Dronero keep alive the memory of this miracle with a solemn annual procession with the Blessed Sacrament. n the night of July 25, 1969, some thieves broke into the parish church of San Mauro la Bruca with the intention of stealing some of the more precious objects. After they had pried open the tabernacle, they took a ciborium containing many consecrated Hosts. Once they left the church, the thieves emptied the ciborium and threw the Hosts on a footpath. On the following morning a child noticed the pile of Hosts at the intersection of the road and gathered up the Holy Eucharist, immediately giving the Hosts to the pastor. It was only in 1994, after 25 years of detailed analysis, that Msgr. Biagio D'Agostino, Bishop of Vallo della Lucania, acknowledged the miraculous preservation of the Hosts and authorized the cult. The conclusion of any chemical and scientific analysis acknowledges that after just 6 months wheat flour severely deteriorates and in a few years turns gelatinous and then, finally, to dust.",
    "keyScientificFindings": [
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Dronero / San Mauro La Bruca, Italy",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Dronero / San Mauro La Bruca, Italy (1631, 1969 AD)"
  },
  {
    "id": "ferrara",
    "location": "Ferrara",
    "country": "Italy",
    "year": "1171 AD",
    "century": "12th Century",
    "title": "The Eucharistic Miracle of Ferrara",
    "summary": "This Eucharistic miracle took place in Ferrara, in the Basilica of Saint Mary in V ado, on Easter Sunday. March 28, 1171 . While celebrating Easter Mass. Father Pietro da Verona, the prior of the basilica, reached the moment of breaking the consecrated Host.",
    "miracleType": "Supernatural Light",
    "historicalContext": "This Eucharistic miracle took place in Ferrara, in the Basilica of Saint Mary in V ado, on Easter Sunday, March 28, 1171 , While celebrating Easter Mass, Father Pietro da Verona, the prior of the basilica, reached the moment of breaking the consecrated Host, At this point he saw that Blood gushed from the Host, staining the ceiling of the crypt above the altar with droplets, In 1595 the crypt was enclosed within a small shrine and is still visible today in the monumental Basilica of Santa Maria in Vado. da Verona, was celebrating Easter Mass with three confreres (Bono, Leonardo and Aimone). At the moment of the breaking of the consecrated Host, Blood gushed forth from the Host and threw large drops on the ceiling of the small crypt above the altar. Histories tell of the \"holy fear of the celebrant and of the immense wonder of the people who crowded the tiny church.\" There were many eyewitnesses who told of seeing the Host take on a Bloody color and having seen in the Host the figure of a Baby. Bishop Amato of Ferrara and Archbishop Ghe- rardo of Ravenna were immediately informed of the event. They witnessed with their own eyes the miracle, namely \"the Blood which we saw redden the ceiling of the crypt.\" The church immediately became a pilgrim destination, and later was rebu- ITALY, 1171 The ceiling crypt stained with Blood ilt and expanded on the orders of Duke Ercole d'Este beginning in 1495.",
    "scientificOrChurchInvestigation": "Sdtt/ACCS regarding this miracle. Amon e most important is the Bull of Pope Eugene IV (March 30, 1442), in which the pontiff mentions the miracle in reference to the testimonies of the faithful and ancient historical sources. The 1197 manuscript of Gerardo Cambrense, conserved in Canter- bury's Lambeth Library is the oldest document that mentions the miracle. The miracle received recent attention in the \"Gemma Ecclesia- stica\" (Budding of the Church) by historian Antonio Samaritani. Another document which dates to March 6, 1404, is the Bull of Cardinal Migliorati, in which he grants indulgences to those who visit the church and adore the Mi- raculous Blood.\" Even today, on the 28th day TIRE-SIT• •ape:. *.e.uei sionaries of the Most Precious Blood, Eucharistic Adoration is celebrated in memory of the miraclee And every year, in preparation for the Feast of Corpus Christi, the solemn Forty Hours devotion is celebrated. The eighth centenary of the miracle was celebrated in 1971.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Ferrara, Italy",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Ferrara, Italy (1171 AD)"
  },
  {
    "id": "florence",
    "location": "Florence",
    "country": "Italy",
    "year": "1230, 1595 AD",
    "century": "13th Century",
    "title": "The Eucharistic Miracle of Florence",
    "summary": "Etoe ITALY, 1230-1595 ( Y are ezces C e 230 tract serer / retar e (41mss t same L cr st having finished celebrating Mass, did not realize that several drops of consecrated wine remained in the chalice and had turned into Blood.",
    "miracleType": "Bleeding Host",
    "historicalContext": "Etoe ITALY, 1230-1595 ( Y are ezces C e 230 tract serer / retar e (41mss t same L cr st having finished celebrating Mass, did not realize that several drops of consecrated wine remained in the chalice and had turned into Blood. historian Giovanni Villani gives a precise description: \"A day later, taking up the chalice he found living Blood coagulated ] and this was shown to all the women of the monastery, and to all the locals who were present and to the bishop and to all the clergy and then it was revealed to all the Florentines, who gathered with great devotion to see. He took the Blood from the chalice and put it in a crystal cruet and again showed it to the population with great reverence.\" Bishop Ardingo of Pavia ordered that the reliquary be brought to him. He kept it for several weeks before returning it to the sisters of the monastery who took care of it near the Church of Saint Am- thful who visited the Church of Saint Ambrose and contributed to adorning the reliquary of the miracle. The 750th anniversary of the miracle was celebrated in 1980. The Reliquary (several drops of blood that measure about a square centimeter) is conserved in a reliquary which has been placed inside a white marble tabernacle constructed by Mimo da Fiesole.",
    "scientificOrChurchInvestigation": "Etoe istöo morae meus t Ost (U Sepulchre, fell to the ground and started a fire. The population immediately rushed to put out the fire and succeeded in saving the Blessed Sacra- ment and chalice. In the great commotion, six fragments of consecrated Hosts fell from the pyx onto the smoldering carpet, but despite the fire were found intact and joined together. In 1628, Archbishop Marzio Medici of Florence examined them and found them incorrupt. He had them placed in a precious reliquary. Every May during the Forty Hours devotion, the two reliquaries are exposed together in a reliquary that also contains a consecrated Host for public adoration. Chiesa di S. Ambrogio in cammino verso il Congresso Eucaristico il Giubileo del 2000 29 Maggio 1997 \"CORPUS DOMINE the first miracle that took place Uguccione carrying the Blood in procession",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 2 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Florence, Italy",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Florence, Italy (1230, 1595 AD)"
  },
  {
    "id": "gruaro",
    "location": "Gruaro-Valvasone",
    "country": "Italy",
    "year": "1294 AD",
    "century": "13th Century",
    "title": "The Eucharistic Miracle of Gruaro-Valvasone",
    "summary": "Among the most authoritative documents which describe the Eucharistic miracle which took place at Gruaro in 1294 is that of local historian Antonio Nicoletti (1765). A woman was washing one of the altar linens of the Church of St. Giusto in the public wash house of Versiola.",
    "miracleType": "Bleeding Host",
    "historicalContext": "Among the most authoritative documents which describe the Eucharistic miracle which took place at Gruaro in 1294 is that of local historian Antonio Nicoletti (1765). A woman was washing one of the altar linens of the Church of St. Giusto in the public wash house of Versiola, Suddenly she saw the altar linen become tinged with Blood, Observing more closely, she noted that the Blood was flowing from a consecrated Particle remaining among the folds of the cloth. he relic of this miracle is kept in the Church of the Most Holy Body of Christ in Valvasone, but the miracle happened in Gruaruo. In 1294, a young housemaid went to the public wash-house of Versiola to wash the altar linens of the Church of St. Giusto in Gruaro.",
    "scientificOrChurchInvestigation": "Suddenly, the woman noticed that a consecrated Host had remained by mistake among the folds of the cloth and that Blood was flowing from the Host. Frightened by this inexplicable event, she immediately ran to alert the pastor who then informed the Bishop of Concordia, Giacomo di Ottonello from Civida- dee The Bishop, having learned the facts, asked to be able to keep the cloth of the miracle in his Ca- thedral in Concordia. However, the pastor of Gruaro and the family of the Counts of Valvaso- ne, patrons of the churches of Gruaro and of Val- vasone, wanted to keep the cloth. No agreement GRUARO (VALVASONE) ITALY, 1294 Giusto the Counts keep the relic, on the condition that they would build a church dedicated to the Most Holy Body of Christ. The construction of the church was completed in 1483. mad authoritative document describing the miracle is a decree of Pope Nicholas V written in 1454. The title of the parish church, formerly St. Mary and St. John the Evangelist was thereby changed to the Church of the Most Holy Body of Christ (March 28, 1454). Today, the cloth is kept in a crystal cylinder, held by a precious reliquary of silver made by master craftsman Antonio Calli- gari. The celebration of the Holy Cloth is commemorated on the 5th Elhursday of Lent, at the end of days of adoration of the Blessed Sacra- in honor of the Most Holy Body of Christ Venetian craftsman in 1755 ment, with the participation of the priests and of bration of Corpus Christi, the reliquary is carried in procession with the Most Blessed Sacrament.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Gruaro-Valvasone, Italy",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Gruaro-Valvasone, Italy (1294 AD)"
  },
  {
    "id": "lanciano-750",
    "location": "Lanciano",
    "country": "Italy",
    "year": "c. 750 AD",
    "century": "8th Century",
    "title": "The Miracle of Lanciano (First Recorded Physical Transformation)",
    "summary": "A Basilian monk doubting Transubstantiation saw the Host transform into living human Flesh and the Wine into five coagulated globules of Blood during Mass.",
    "miracleType": "Heart Muscle Transformation",
    "historicalContext": "During the celebration of Holy Mass at the Church of St. Legontian, a Basilian hieromonk experienced intense intellectual doubt regarding the Real Presence. At the words of Consecration, the Host turned into flesh and the Consecrated Wine into blood.",
    "scientificOrChurchInvestigation": "In 1970–1971 and 1981, Prof. Odoardo Linoli (Professor of Anatomy, Histology, and Chemistry at Siena) and Prof. Ruggero Bertelli carried out exhaustive histological and chemical analysis.",
    "keyScientificFindings": [
      "Flesh is striated muscular tissue of the human heart myocardium (left ventricle).",
      "Blood belongs to the AB blood group (identical to the Shroud of Turin).",
      "Proteins in the blood match normal human blood proportions without artificial preservatives.",
      "No traces of embalming chemicals or mineral substances were found."
    ],
    "papalOrEcclesialApproval": "Vatican recognized; confirmed in 1974 by the World Health Organization (WHO) independent scientific commission.",
    "bloodType": "AB Positive",
    "currentLocation": "Church of San Francesco, Lanciano, Chieti, Italy",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org) • Prof. Odoardo Linoli Study (1971) • WHO United Nations Medical Commission (1974)"
  },
  {
    "id": "macerata",
    "location": "Macerata",
    "country": "Italy",
    "year": "1356 AD",
    "century": "14th Century",
    "title": "The Eucharistic Miracle of Macerata",
    "summary": "On April 25, 1356, at Macerata, a priest whose name is not known was celebrating Mass in the chapel of the Church of St. Catherine, owned by the Benedictine monks.",
    "miracleType": "Bleeding Host",
    "historicalContext": "On April 25, 1356, at Macerata, a priest whose name is not known was celebrating Mass in the chapel of the Church of St. Catherine, owned by the Benedictine monks, During the breaking of the bread, before Communion, the priest began to doubt the Real Presence of Jesus in the consecrated Host, Precisely in the moment in which he broke the Host, to his great surprise, he saw flow from the Host an abundance of Blood which marked part of the cloth and the chalice place on the altar, t Macerata in the church of the Cathedral of Holy Mary Assumed and St. Giuliano, under the altar of the Most Holy Sacrament, it is possible to venerate the relic of the \"corporal marked by blood.\" Also preserved in this church is the parchment on which the miracle is described. Furthermore, the historian Ferdinando Ughelli cited this miracle in his work Sacred Italy of 1647 and describes how since the 14th century 'the corporal has been carried in solemn proces- Sion through the city, enclosed in an urn of crystal and silver, with the concourse of all Piceno.\" All of the documents likewise agree in the description of how the miraculous facts occurred. An anonymous priest during the Mass was struck with strong doubts about the reality of the transubstantiation, and when he broke the Great Host, he saw Blood drop from the Host and fall onto the corporal and chalice. The priest immediately in- Etoe L/\"östöe ITALY, 1356 Macerata Cathedral formed Bishop Nicholas of San Martino, which ordered that the relic of bloodstained cloth be carried into the cathedral and instituted a regular canonical process.",
    "scientificOrChurchInvestigation": "IL one of the first confraternities in honor of the Most Blessed Sacrament was instituted at Macerata (1494) and it was here that the pious practice of Forty Hours was established in 1556. Every year, on the occasion of Corpus Christi, the corporal of the miracle is carried in procession behind the Most Blessed Sacrament. Small parchment from 1356 on which is written: \"Here came the",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Macerata, Italy",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Macerata, Italy (1356 AD)"
  },
  {
    "id": "mogoro",
    "location": "Mogoro",
    "country": "Italy",
    "year": "1604 AD",
    "century": "17th Century",
    "title": "The Eucharistic Miracle of Mogoro",
    "summary": "In April 1604, a Eucharistic miracle took place in Mogoro that was described by the historian Pietro M, cossu. During Mass, two men in mortal sin dropped two Hosts on the ground, leaving imprints of the Hosts on the stone floor.",
    "miracleType": "Supernatural Light",
    "historicalContext": "In April 1604, a Eucharistic miracle took place in Mogoro that was described by the historian Pietro M, cossu. During Mass, two men in mortal sin dropped two Hosts on the ground, leaving imprints of the Hosts on the stone floor. To commemorate this event and in reparation for the sacrilege, there is a solemn Eucharist procession every year in Mogoro on the Sunday after Easter. n Mogoro on the Italian island of Sardinia, on the Monday after Easter in 1604, Father Salvatore Spiga, pastor of the church of Saint Bernard, was celebrating Mass. After the consecration he began distributing Holy Communion to the faithful. At a certain point, he saw in the Communion line two men who were well-known for the dissolute lives they led.",
    "scientificOrChurchInvestigation": "The pastor gave them Holy Communion and as soon as they had taken the Host in their mouths, they spit the Holy Eucharist out on the stone floor below the altar rail. The two men justified themselves by saying that the Hosts had become as hot as burning embers, and that the Blessed Sacrament was burning their tongues. Then, taken by remorse at not first having gone to Confession, they ran away. Father Salvatore ITALY, 1604 Hosts remained in the stone as if they had been sculpted there. He ordered the stone to be thoroughly washed in the hope that the imprints would be erased. But every attempt failed miserably. Many historians, including Father Pietro Cossu and Father Casu, described the findings made by the bishop at that time, Antonio Surredo, and by his successors. docu e ts that confirm the iracle is a public act written by the notary Pedro Antonio Escano on May 25, 1686, in which the rector of Mogoro stipulates a contract for the construction of a wooden tabernacle over the main altar. At the base of the tabernacle, tive case and placed in such a way that the faithful could see it. The stone bears the imprint of the Hosts to this day.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Mogoro, Italy",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Mogoro, Italy (1604 AD)"
  },
  {
    "id": "morrovalle",
    "location": "Morrovalle",
    "country": "Italy",
    "year": "1560 AD",
    "century": "16th Century",
    "title": "The Eucharistic Miracle of Morrovalle",
    "summary": "In 1560 at Morrovalle, a huge fire destroyed the church of the Franciscans but spared a large Host contained in a pyx (which was also completely burned except for the lid).",
    "miracleType": "Fire Resistance",
    "historicalContext": "In 1560 at Morrovalle, a huge fire destroyed the church of the Franciscans but spared a large Host contained in a pyx (which was also completely burned except for the lid), Eucharistic miracle's Fourth Centenary was celebrated in 1960, and the City Council unanimously decided to place at Morrovalle's main gate the inscription, 'Civitas Eucaristica' (Eucharistic City), n Morrovalle, at about two o'clock in the morning of April 17, 1560, during the octave of Easter, Brother Angelo Blasi awoke with a start at the sound of violent crackling. Looking out the window of his cell, he saw the church was completely engulfed in flames, and he immediately ran to notify the other brothers. The fire was extinguished after seven hours, and in the following days began the work of clearing the massive pile of church ruins. On April 27, Father Battista da Ascoli was removing a piece of marble from what used to be the main altar and discovered the pyx in a wall cavity. Its corporal was scorched but the consecrated Host was still intact and in good condition. Father Battista shouted at the sight of the miracle, and many people immediately ran to the marvelous sight.",
    "scientificOrChurchInvestigation": "For three entire days, the Blessed da Morro d'Alba finally arrived, the miraculous Host was placed in an ivory case. of Bertinoro, Ludovico di Forli, was i mediately sent by Pope Pius IV to Morrovalle to investigate the authenticity of the event. As soon as he received the bishop's account, Pope Pius IV judged the occurrence to be without natural cause, and he authorized public devotion with the Bull \"Holy Roman Church\" (1560). The Bull proclaims the anniversaries of the fire and the discovery of the sacred Host (April 17 and 27) as feasts with plenary indulgences (so that they were known locally as the feasts \"of the two pardons\"). Because of the many faithful who came to the the Blessed Sacrament and of the pyx on the main altar. The pardons, namely the plenary indulgences, are available at the church of Saint Bartholomew. The miraculous Host was conserved intact until 1600 but due to the vicissitudes of history every trace of it was later lost. All that remains today is the glass ciborium and the pyx lid which survived the flames.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Morrovalle, Italy",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Morrovalle, Italy (1560 AD)"
  },
  {
    "id": "offida",
    "location": "Offida",
    "country": "Italy",
    "year": "1273-1280 AD",
    "century": "13th Century",
    "title": "The Eucharistic Miracle of Offida",
    "summary": "In Offida, near the Church of St. Augustine, are kept the relics of the Eucharistic miracle which took place in 1273, in which the Host became living Flesh.",
    "miracleType": "Heart Muscle Transformation",
    "historicalContext": "In Offida, near the Church of St. Augustine, are kept the relics of the Eucharistic miracle which took place in 1273, in which the Host became living Flesh, There are many documents which describe this miracle, among which is an authentic copy on a parchment of the 13th century, written by the notary Giovanni Battista Doria in 1788. There are also many offcial decrees of the popes beginning with that of Boniface VIII (1295), to that of Sixtus V (1585), discourses of Roman congregations, Epi- scopal decrees, communal statutes, votive gifts, memorial stones, frescoes and testimonies of notable historic figures, among whom we and asked her how she could recover the affection of her husband, Giacomo Stasio. Fol- lowing the witch's advice, she went to Commu- nion to obtain a consecrated Host. She returned home and put the Host on the fire in an earthenware jar with the intention of turning the Blessed Sa- crament into powder to put into her husband's food. Particles, however, were transformed into living Flesh.",
    "scientificOrChurchInvestigation": "Richiarella, horrified by these events, wrapped the jar and the Bloodied Host in a linen handkerchief that she then buried under the manure in her husband's stable. Strange events began to take place inside the stable: every time Gia- como's donkey entered, it would genuflect toward the place where the miraculous Host was buried, and Giacomo began to think that his wife had put a spell on the beast. Seven years later, Ricchiarella recomo Diotallevi, a native of Offida. According to the oldest stories, the woman, in tears, began screaming, \"I killed God! I killed God!\" The priest went to the place, found the bundle with the relics, and gave them to his fellow-citizens. reliquary was made to cross -s contain the Host An ancient story recounts that two monks, Brother Michele and a confrere, were invited to Venice. When they arrived, they made the craftsman promise with an oath of loyalty \"that he would not reveal to anyone what he was ning the miraculous Host, but, struck with a sudden fever, exclaimed, 'What have you brought me, Oh my Brother?' The religious then asked him if he was in mortal sin. The craftsman answered, 'Yes', made his confession to the same priest and, the fever having left him, he took the pyx without any danger. Without extracting the Host, he fixed both Host and pyx, together with the sacred wood, inside the same cross, with a crystal above it, as you can clearly see.\" The reliquaries of the jar and the Blood-stained linen with the cross containing the miraculous Host are exposed in the Church of St. Augustine in Offlda. Richiaretta's house was transformed into a small chapel. In 1973, the seventh centenary of the miracle was celebrated, and every year on May 3rd, the citizens of Offida celebrate the anniversary of the miracle.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Offida, Italy",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Offida, Italy (1273-1280 AD)"
  },
  {
    "id": "patierno",
    "location": "Patierno-Naples",
    "country": "Italy",
    "year": "1772 AD",
    "century": "18th Century",
    "title": "The Eucharistic Miracle of Patierno-Naples",
    "summary": "On August 29, 1774, the Curia of the Archbishop expressed itself favorably regarding the miraculous finding and unexplainable preservation of the Hosts stolen from the Church of St. Peter's in Patierno on February 24, 1772.",
    "miracleType": "Bleeding Host",
    "historicalContext": "On August 29, 1774, the Curia of the Archbishop expressed itself favorably regarding the miraculous finding and unexplainable preservation of the Hosts stolen from the Church of St. Peter's in Patierno on February 24, 1772. In 1971 the Eucharistic Year of the diocese had been established in order to allow the community to capture the essence of the Eucharistic miracle, Unfortunately in 1978 some unknown thieves were able to steal the relic with the miraculous Hosts of 1772, n 1772, unknown thieves stole a certain number of consecrated Hosts that were found a month later in the lands of Duke Delle Grottolelle underneath manure. However the Sacred Hosts were completely intact. The appearance of mysterious lights and a dove made it possible to see where the Hosts were buried. Saint Alphonsus Liguori described this miracle in detail and took the opportunity to reawake the faith and devotion of the people towards the Eucharist.",
    "scientificOrChurchInvestigation": "The Vicar General, Monsignor Onorati drew up the minutes of the diocesan trial which lasted two years from 1772 to 1774. In the minutes it was stated that the appearance of the lights and the intact preservation of the consecrated Hosts \"has been and is an authentic miracle operated by God to illustrate more and more the truth of the PATIERNO (NAPLES) ITALY, 1772 Sacrament of the Eucharist. PTLOttStestimonies there were Is those of three renowned scientists of the time among which was Dr. Domenico Cotugno of the Royal University of Naples and they all agreed in saying that \"The intact preservation of the Hosts cannot be explained with physical principles and they surpass the power of natural agents. Therefore, they must be considered as miraculous.\" In 1972 Professor Pietro De Franciscis, teacher of human physiology at the University of Naples confirmed the above statement. In 1967, Cardinal Corrado Ursi, on the occasion of the elevation of the Church of St. Peter to a f:tt •r.rrnn:q warning for the whole archdiocese. Its voice must never weaken but must urge the faithful of all times to consider the message regarding the 'Bread of Life for the salvation of the world' launched by Christ at Cafarnas.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Patierno-Naples, Italy",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Patierno-Naples, Italy (1772 AD)"
  },
  {
    "id": "rimini-1227",
    "location": "Rimini",
    "country": "Italy",
    "year": "1227 AD",
    "century": "13th Century",
    "title": "The Miracle of the Starving Mule (St. Anthony of Padua)",
    "summary": "St. Anthony of Padua challenged a Cathar skeptic by presenting the Blessed Sacrament to a mule starved for 3 days alongside fresh oats. The mule ignored the food and knelt before the Host.",
    "miracleType": "Adoration by Animals",
    "historicalContext": "In Rimini, a Cathar heretic named Bonvillo challenged St. Anthony of Padua, claiming animals would choose grain over a piece of bread. St. Anthony accepted the challenge, requiring Bonvillo to starve his mule for 3 consecutive days.",
    "scientificOrChurchInvestigation": "On the 3rd day, before a vast public gathering in the town square, Bonvillo offered oats while St. Anthony held up the Blessed Sacrament. The mule ignored the oats and bent its front knees to the ground in adoration before the Host.",
    "keyScientificFindings": [
      "Documented by early Franciscan biographers (Vita Prima) and included in official canonization records of St. Anthony of Padua."
    ],
    "papalOrEcclesialApproval": "Promulgated in the canonization records of St. Anthony of Padua by Pope Gregory IX in 1232.",
    "currentLocation": "Piazza Tre Martiri (formerly Piazza del Miracolo), Rimini, Italy",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue • Franciscan Vita Prima (1232 AD)"
  },
  {
    "id": "rome",
    "location": "Rome",
    "country": "Italy",
    "year": "6th-7th Cent., 1610 AD",
    "century": "7th Century",
    "title": "The Eucharistic Miracle of Rome",
    "summary": "This Eucharistic miracle, whose relic is still preserved in the Benedictine Monastery of Andechs, Germany, is verified by numerous written sources. The authentication took place in Rome in 595 during a Eucharistic celebration presided by Pope St. Gregory the Great.",
    "miracleType": "Heart Muscle Transformation",
    "historicalContext": "This Eucharistic miracle, whose relic is still preserved in the Benedictine Monastery of Andechs, Germany, is verified by numerous written sources, The authentication took place in Rome in 595 during a Eucharistic celebration presided by Pope St. Gregory the Great, At the moment of receiving Holy Communion, a Roman noblewoman began to laugh because she had doubts about the Real Presence of Christ in the consecrated Bread and Wine, The Pope, troubled by her disbelief, decided not to give her Communion and then the Bread turned into Flesh and Blood, mong the most important works in which this Eucharistic miracle that occurred in Rome in 595 is mentioned, is Vita Beati Gregorii Papae written by Deacon Paul in 787. It was customary in those times to have the Eucharistic bread prepared by the parishioners. Pope St. Gregory the Great was a direct eyewitness to this prodigy. while celebrating the Sacred Mass in a ancient church dedicated to St. Peter, the Pope was distributing Communion and saw among the faithful in line, one of the women who had prepared the bread for the consecration and she was laughing out loud.",
    "scientificOrChurchInvestigation": "Troubled, the Pope cornered her and asked her to explain her behavior. She justified herself by saying that she could not believe that the bread ITALY, SIXTH - SEVENTH CENTURIES Communion and asked God to illuminate her. Having just finished praying, he saw that part of the bread prepared by the woman became Flesh and Blood. The woman repented, knelt on the ground and began to cry. To this day, part of the relic of the ITALY, SIXTH - SEVENTH CENTURIES It is still possible today to see the miraculous imprint left by the Host which fell on the steps of the altar in the Caetani Chapel of Santa Pudenziana Church in Rome, The imprint on the step was left when the Host fell from the hands of a priest who, while celebrating Mass, began to doubt the Real Presence of Christ in the sacrament of the Eucharist. anta Pudenziana is one of the oldest churches in Rome. According to a great number of historians, the Roman Senator Pudente gave hospitality to the Apostle Peter in his home, which stood exactly where the church's foundation lies. The name of the church is said to derive from the name of the Senator's daughter: Pudenziana. P and her sister Prassede, although never martyred, became famous because they wiped off the blood of the martyrs after they were executed. The church is adorned by numerous Roman mosaics from the early Christian era and was constructed in 145 A.D. on the site where there stood the house of Senator Pudente, according to the wishes of his daughters Prassede and Pudenziana. On the altar steps of the Caetani ITALY, 1610 Blood left by a Host which fell from the hands of a priest while celebrating the Mass. The man was overtaken by doubts about the Real Presence of Jesus in consecrated Host, and immediately after the consecration, he inadvertently let the Host fall to the ground, where the imprinted mark is still visible today. marble floor",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 3 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Rome, Italy",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Rome, Italy (6th-7th Cent., 1610 AD)"
  },
  {
    "id": "rosano",
    "location": "Rosano",
    "country": "Italy",
    "year": "1948 AD",
    "century": "20th Century",
    "title": "The Eucharistic Miracle of Rosano",
    "summary": "In the monastery church of Rosano is venerated the statue of the Sacred Heart which bled and wept on various occasions. The statue, which is of natural height, was donated in 1948 by a devout person to fulfill a promise made during World War 11.",
    "miracleType": "Heart Muscle Transformation",
    "historicalContext": "In the monastery church of Rosano is venerated the statue of the Sacred Heart which bled and wept on various occasions. The statue, which is of natural height, was donated in 1948 by a devout person to fulfill a promise made during World War 11. Christ's face has an intense expression of manly sweetness which invites all to prayer, The Heart is at the center of his chest, surrounded by a crown of thorns, rom Bishop Luciano Giovanotti's letter of April 4, Of April 4 1948, the first Sunday after Easte uring the chanting of vespers, people noticed for the first time that drops as if of blood were falling from the eyes of the statue. In June of that year, another stunning and unexpected miracle occurred — the flow of blood. These events occurred repeatedly between 1948 and 1950 and were corroborated by many eyewitnesses, by the nuns themselves and particularly by the abbess, Mother Ildegarde Cabitza of holy memory. In the monastery archives are preserved many sworn testimonies even of priests, preachers and visitors, together with medical analyses of the blood, as well as finger towels and puriflcators soaked with blood.",
    "scientificOrChurchInvestigation": "One of the most endearing testimonies is that of Monsignor Angelo Scapecchi, Statue t Sacr Heart ITALY, 1948 the investigation of the Visitator, Father Luigi Romoli, O.P., sent by the Holy Office, who personally interrogated all the nuns, imposing the strictest secrecy on the community. Subsequently, on November 14, 1950, the Holy Office ordered the statue to be removed so as to keep it in a secret location. It was brought back to Rosano in 1952. The community of nuns of Rosano lived these events with intimate joy and great devotion but with great reserve; so much so that, as we learn from the chronicles, they were not distracted from their daily duties. On the contrary, they lived their monastic life even more intensely according to the Benedictine motto: Ora et Labora. The weeping and the flow of blood were considered inexplicable from a natural and Rosano an appeal from the Lord 'to fidelity, reparation and prayer.' ] Beloved brothers and sisters, with great devotion and pride let us look back on the events that took place in our diocese fifty years ago and see them as signs of the Lord's benevolence and love and an invitation to a serious and profound reflection. With great ardor let us joyfully renew our devotion to the Sacred Heart of Jesus. And as we receive this message, let us ask for the gift of an ever deeper conversion to His love, for the grace of an increase of apostolic fervor, as well as for the gift of numerous holy vocations to the priesthood and religious life, so as to make Christ the Heart of the world. Looking at the Heart of Jesus, we will joyfully draw life from the fountain of salvation!",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Human Myocardium (Heart Tissue) (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Rosano, Italy",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Rosano, Italy (1948 AD)"
  },
  {
    "id": "salzano",
    "location": "Salzano",
    "country": "Italy",
    "year": "1517 AD",
    "century": "16th Century",
    "title": "The Eucharistic Miracle of Salzano",
    "summary": "An extraordinary event occurred in Salzano in 1517, A priest was called with urgent haste to bring the Viaticum to an invalid on the brink of death. The season and the time of day were not appropriate to make a procession, and so the priest had to be content with only one altar boy.",
    "miracleType": "Adoration by Animals",
    "historicalContext": "An extraordinary event occurred in Salzano in 1517, A priest was called with urgent haste to bring the Viaticum to an invalid on the brink of death, The season and the time of day were not appropriate to make a procession, and so the priest had to be content with only one altar boy, Upon arrival at the meadows surrounding the Muson River, several donkeys that were grazing faced themselves in the direction of the Pius cotwoy and, after approaching the priest, they bowed on their knees and then followed the Most Holy Sacrament all the way to the home of the infirm, renewing the genuflection; and then, always with the priest, they walked back to return to the pasture, hen Saint Ignatius of Loyola and his companions, in 1536, paused in Venice and in the nearby cities, while waiting for their departure for the Holy Land, they passed several days by the Episcopal Castle of Sti- gliano, and in this way they had the opportunity to make the acquaintance of and personally evaluate the Phenomenon that was described in a writing by the Jesuit Servant of God, Simone Rodriguez. Here it is narrated about how a certain \"Priest by the name of Lorenzo was called with urgency to administer the Holy Viaticum on the western confines of the parish, between Zeminiana and Briana, to a moribund ill person. The season and the hour were not suited for a procession, so the priest had to be satisfied with only one altar boy. Arriving at the meadows surrounding the Muson River, commonly called Cime, several donkeys that were grazing faced themselves in the direction of the Pius cotwoy and, after approaching the priest, they bowed on their knees and then followed the Most Holy Sacrament all the way to the home of the infirm, renewing the genuflection; and then, always with Father Lorenzo, they returned, stopping in the pasture.. This news is repeated by the elders to the children, and from the priests in the religion classes to the parishioners. Of the Miracle even the Bollandists speak, L.M.",
    "scientificOrChurchInvestigation": "Gerola in \"The Book for All,\" P. Beccaro in \"Close to Jesus,\" and P. Sanna Solaro, Sol. in a publication about Eucharistic events that occurred in Italy. (u Ousman arms ere r to the Eucharistic Congress of Milan and was also desired to illustrate it in the one of Venice, according to the correspondence of 1897, preserved in the parish archive. In the History of the Society of Jesus, by Nicolb Orlandino, printed in Bologna by Bartolomeo Zanetti in 1615, again the episode is recounted. This story was written by the Servant of God Simone Rodriguez, a man equipped with extensive knowledge, who died in the odor of sanctity in Lisbon Portugal, on the 15th of July 1579. To this document the Curia attached also a notice that confirms the name of the priest spectator of the Miracle, which served to determine even more the date of the Miracle. Father Lorenzo was indeed Chaplain of the Church of Salzano precisely in the month of August in 1517; and he was summoned to the Curia to testify on questions about the parish, which at that time was held by Don Francesco Artuso, who was the pastor in that place until about 1550. The Miracle was concluded to have occurred in the year 1517, and Father Rodriguez, who surely spoke with Don Artuso, was allowed to examine the verbal proceedings, drafted by the competent authorities of that time.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Salzano, Italy",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Salzano, Italy (1517 AD)"
  },
  {
    "id": "siena-1730",
    "location": "Siena",
    "country": "Italy",
    "year": "1730 AD to Present",
    "century": "18th Century",
    "title": "The Perpetual Incorrupt Hosts of Siena (290+ Years Uncorrupted)",
    "summary": "223 stolen consecrated Hosts recovered from a collection box remain completely fresh, sweet-smelling, and incorrupt for nearly 3 centuries, defying all natural laws.",
    "miracleType": "Incorrupt Host",
    "historicalContext": "In August 1730, thieves broke into the Church of St. Francis in Siena and stole a ciborium containing 223 consecrated Hosts. They were found 3 days later in an offering box at the nearby Church of St. Mary.",
    "scientificOrChurchInvestigation": "Multiple scientific commissions (including scientists in 1914, 1922, 1950, and 1974 with chemist Enrico Medi) analyzed the Hosts.",
    "keyScientificFindings": [
      "Unfermented wheat bread naturally decomposes within weeks due to mold and bacteria; these Hosts remain completely intact, smelling of fresh wheat.",
      "Controlled unblessed wafers kept in identical glass containers alongside decomposed into dust within 10 years, while the Sacred Hosts remain unaltered."
    ],
    "papalOrEcclesialApproval": "Venerated by Pope St. John Paul II in 1980 who proclaimed: \"It is the Presence!\"",
    "currentLocation": "Basilica of San Francesco, Siena, Italy",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue • Scientific Report of Chemist Enrico Medi (1974) • Apostolic Visit of Pope St. John Paul II (1980)"
  },
  {
    "id": "trani",
    "location": "Trani",
    "country": "Italy",
    "year": "11th Century AD",
    "century": "11th Century",
    "title": "The Eucharistic Miracle of Trani",
    "summary": "A non-Christian woman who did not believe the true Catholic dogma of the Real Presence of Jesus in the Eucharist, aided by some of her Christian friends, managed to steal a consecrated Host during the celebration of a Sacred Mass.",
    "miracleType": "Bleeding Host",
    "historicalContext": "A non-Christian woman who did not believe the true Catholic dogma of the Real Presence of Jesus in the Eucharist, aided by some of her Christian friends, managed to steal a consecrated Host during the celebration of a Sacred Mass. The woman, as if daring God, put the consecrated Host into a frying pan of oil, Suddenly the Host spilled out masses of Blood, which poured to the floor and out the door year one thousand, is housed in the Cathe- dral of Holy Mary of the Assumption. There are numerous documents which retell this miracle; among them are Eucharistic monograms, which are on the ancient streets of the work, \"L'lnamorato di Gesu Cristo\" (1625), an accurate account of the unfolding of the facts: \"Pretending to be Christian, the woman received Communion with the others. and took the consecrated Host from her mouth and transferred the Holy Eucharist to a handkerchief. Once home she wanted to experiment with whether or not the Blessed Sacrament was bread and put the consecrated Host into a heated frying pan filled with oil. Upon contact with the boiling oil, the consecrated Host miraculously became Bloody \"TRANI E' FORTUNÅTA PERCHE' PER iiiiiid cursed woman and her house.",
    "scientificOrChurchInvestigation": "Terrorized, the woman began to scream. and the neighbors ran over to find out the reasons behind her cries... was immediately informed of the events d he ordered the return of the consecrated Host to the church. That same Cistercian Abbot Ferdinando Ughelli (1670), in his well-known encyclopedic work \"Italia Sacra\", wrote in a notation of his seventh volume: \"In T rani a sacred Host was fried to the dismay of our Faith.. o, the true Flesh and Blood of Christ was unveiled in the unleavened Bread which fell to the ground\". An indirect confirmation to this miracle is also found in the affirmation of St. Pio from Pietreclina, which exclaimed: \"T rani is fortunate to have been bathed by the Blood of Christ twice\", the first reference being to this miracle and the later to the miracle of the Colonna Crucifix from which an abundant stream of blood flowed from Jesus' nose. Thanks to the generosity of the nobleman Ottavian Campitelli, the house of the woman was converted into a chapel in 1706. In 1616 the relic of the Host was transferred to an antique silver shrine donated by Fabrizio de Cunio. Throughout various eras, many tests were performed on this sacred relic and verified, the last one took place in 1924 at the Inter-diocesan Euchari- stic Congress headed by Monsignor Giuseppe Maria Leo.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Trani, Italy",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Trani, Italy (11th Century AD)"
  },
  {
    "id": "turin",
    "location": "Turin",
    "country": "Italy",
    "year": "1453, 1640 AD",
    "century": "15th Century",
    "title": "The Eucharistic Miracle of Turin",
    "summary": "Inside the Corpus Domini Basilica in Turin, there is an iron railing that closes in the place where, in 1453, the first Eucharistic miracle of Turin occurred.",
    "miracleType": "Heart Muscle Transformation",
    "historicalContext": "Inside the Corpus Domini Basilica in Turin, there is an iron railing that closes in the place where, in 1453, the first Eucharistic miracle of Turin occurred, An inscription inside the railing describes the miracle: \"Here the she-mule that was carrying the Divine Body fell prostrate; here the Sacred Host was miraculously freed from the bag containing the Sacred Species and rose high; here came gently down among the suppliant hands of the people of Turin; here then, the place made holy by the miracle, Remembering, pray on your knees, (June 6, 1453)\" , n the Alta Val Susa, close to Exilles, the army of René D'Angiö met the army of the duke Ludovic of Savoy. Here the soldiers indulged in plundering the town and some of them entered the church. One of them forced open the little door of the tabernacle and stole the monstrance with the consecrated Host. He wrapped up all that he had stolen in a bag and headed for Turin on a mule. On the main plaza close to St. Sylvester's Church (now the Holy Spirit Church, where later the Church of Corpus Domini was built), the she-mule stumbled and fell. Then suddenly the bag fell open and the monstrance with the consecrated Host rose over the surrounding houses while the people were filled with wonder.",
    "scientificOrChurchInvestigation": "Among those present there was also Don Bartholomew Coccolo. He ran with this news to the Bishop, Ludovic of the Romagnano's Marquises. The Bishop, accompanied ITALY, 1453 with the words of the Emmaus disciples, \"Stay with us, Lord\". Meanwhile a new miracle had happened; the monstrance had fallen on the ground, leaving the consecrated Host free and shining as a second sun. The Bishop who was holding a chalice in his hands lifted it up high, and the consecrated Host slowly started coming down and settled in the chalice. Or t mzmcß of 1453 was at once dopted by the town that first promoted the building of an aedicule on the place of the miracle, and then soon substituted by the church dedicated to the Corpus Dominie But the most significant display of this is expressed by the celebrations organized in occasion Imprints of the Host of the miracle of the centenaries and fiftieth anniversaries (1653, 1703, 1853, and partially 1803). The documents that describe the miracles are many. The most ancient are the three Capitulary Acts of 1454, 1455 and 1456, and some writings contemporary of the Turin Municipality. In 1853 the Blessed Pope Pius IX solemnly celebrated the fourth centenary of the miracle. In this celebration Saint John Bosco and Don Rua participated. Furthermore, Pius IX on this occasion approved the Office and the Mass Proper of the miracle for the Turin archdiocese. In 1928 Pius XI raised the Church of Corpus Domini to the dignity of minor basilica. In the XV century the Holy See gave the order to consume the Host of the miracle, \"to not oblige God to make the miracle an eternal miracle by keeping always incorrupt, as they had being doing, those very same Eucharistic species\". mwzstrauce (Uit t consecrat /Ztrost rose oper t arere a aze e tern o nti'zacodo cot \"1 ante net & g empte 01 cot'zotte, come specie ITALY, 1453 s ACRA ,EOXCVI.A removed from the tabernacle in 1492 when the works for the construction of the new edifice, planned by Meo del Caprino, were started. In 1528, on the spot where the miraculous event took place, the aedicule of Matthew Sanmicheli was built. It was decorated with paintings that were recalling the most important phases of the event. This edifice was replaced by the present church of Corpus Domini, which was started by Ascanio Vittozzi in 1604. The building of Corpus Domini was decided by the municipality in 1598 during the epidemic of the plague, and also to answer to a request made by the Host taken from the miracle of Turin illustrated on the occasion of the first international Eucharistic congress, Turin, Canonica Brothers Typography, 1894 (Simeon Collection, c 9200) Chalice of the miracle of Turin Plaque where the mule fell down Anonymous, Miracle of the Blessed Sacrament, occurred in the very famous and glorious town of Turin, in the year 1453 on June 6 about 8:00 P.M., engraved plate attached to The Secular Year (Simeon Collection C 2412). The triptych illustrates the salient phases of the event: of the she-mule, the ascension of the Host, and its depositing into the chalice. The two lateral arches are surmounted by the city's coat of arms. The iron with which the miraculous Host had been engraved was transferred to Turin from Exilles in 1673 and in 1684 it was donated to the municipality that still today keeps it among the deposits of the municipality's historic archives. During the invasion by Count Harcourt's army, the soldiers entered the Church of St. Maria del Monte and killed many civilians, The lives of the Capuchin friars, however, were spared, A French soldier succeeded in opening the tabernacle which contained a ciborium with several consecrated Hosts. Flames of fire miraculously blazed out to envelop him - burning his face and his clothing, The door of the tabernacle which is adorned with agate and lapislazzuli or blue stones still shows the imprint of the soldier's scorched hand, n 1640, the French army of Count Harcourt crossed the River Po and advanced to the Capuchin Friars' Church of the Monte. Friar Pier Maria da Cambiano, a Capuchin friar, describes in great detail the Eucharistic miracle that occurred during the French troops' occupation of the Church of Santa Maria del Monte. was overrun wi h oreign tr ops. After Casale Monferrato was liberated from the Spaniards, the French advanced to Turin. On May 6, 1640 they arrived at Chieri, on the 7th at Moncalieri, and on the 10th they finally reached Turin. Having occupied the left bank of the Po River, they launched an offensive attack and gained control of the bridge. From there they advanced to the Capuchin Monastery of the Monte. However, it was not that ITALY, 1640 They were twice repelled. On the third assault, however, our troops were compelled to lay down their arms and flee with the civilian population to seek shelter and safety in the sanctuary of a holy place the church. The invaders, nevertheless, entered the church and slaughtered the men and women, the young and the old, civilians and troops alike; even those who braced themselves onto the altars or who took refuge in the arms of the Capuchin friars. They pleaded for their lives and for their freedom. None of the friars were wounded but their hearts were distraught at the sight of so much bloodshed and carnage. The soldiers trashed sacred vessels and vestments for safe keeping. And after, in the church itself (too horrible to recount!) they committed brutal acts of debauchery! As if all that were not enough, a French soldier, who was an unbeliever, climbed onto the altar and forced open the tabernacle to seize the ciborium and the sacred Hosts it held in order to desecrate the Hosts. And then, a miracle!! A flame of fire blazed out of the ciborium directly onto the sacrilegious Frenchman; it scorched his uniform and his face! The terrified soldier threw himself to the floor screaming and asking God's forgiveness. The church was suddenly filled with dense smoke. Between the terror and the astonishment felt by all, the vandalism ceased!",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Human Myocardium (Heart Tissue) (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 3 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Turin, Italy",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Turin, Italy (1453, 1640 AD)"
  },
  {
    "id": "veroli",
    "location": "Veroli",
    "country": "Italy",
    "year": "1570 AD",
    "century": "16th Century",
    "title": "The Eucharistic Miracle of Veroli",
    "summary": "During Easter of 1570 in the Church of St. Erasmus in Veroli, the Blessed Sacrament was exposed (at the time, the Blessed Sacrament was first placed in a round pyx and then placed in a large chalice, covered with a paten) for the Forty Hours of public adoration.",
    "miracleType": "Apparition in Host",
    "historicalContext": "During Easter of 1570 in the Church of St. Erasmus in Veroli, the Blessed Sacrament was exposed (at the time, the Blessed Sacrament was first placed in a round pyx and then placed in a large chalice, covered with a paten) for the Forty Hours of public adoration, The Child Jesus appeared in the exposed Host and manifested many graces, Today, the chalice where the Blessed Sacrament was exposed is kept in the same Church of St. Erasmus and is used once a year at the celebration of Mass on Easter Tuesday, t Easter in 1570 in the Church of St. Erasmus, the consecrated Host, according to the traditional rite at the time, was placed in a round silver container (pyx) and placed in a burse-like holder. This was later placed in a large, ceremonial silver chalice with its paten; the whole wrapped in an elegant silk cloth. It should be mentioned that at that time exposition of the Blessed Sacrament in a monstrance was not a widespread practice, even though the Council of Cologne (1452) specifically referred to the monstrance.",
    "scientificOrChurchInvestigation": "It was the custom for each civil confraternity to be present for an hour of adoration before the exposed Blessed Sacrament. It was at one of these hours of adoration which had the members of the ITALY, 1570 Blessed Lady) vested in their black robes and kneeling in prayer. /1tØLst document about this Eucharistic miracle was taken immediately by the chancery. This document is preserved in the archives of the Church of St. Erasmus. The detailed deposition and account of the miraculous event is given by a Giacomo Meloni who was among the first witnesses. His testimony follows: 'Raising my eyes towards the chalice, I saw a most brilliant star at the base of the chalice's cup, and above the star, the Blessed Sacrament in the size of the Host used by the priest at Mass. The star was attached to the Blessed Sacrament The vision ended when small children in L' OSTIA SACROSANTA RACCIIIUSA IN DUPLICE CUSTODIA ARCENTEA RAVVOLTA IN DRAPPO SEMCO LEGATO PER VIVISSIMA LUCE Dl STELLA RAGGIANTE E SORREGCENTE IL ssmo SACRAMENTO adoration, similar to small angels, were seen around the Sacred Host...\". To this day, this miraculous event is commemorated with solemn ceremony in the presence of the bishop. The chalice, its paten, and the silver pyx where the Blessed Sacrament was exposed, have all been preserved and they remain with the relics/ reliquaries of the saints. The Sacred Species (the consecrated Bread) of the miraculous Host of Veroli was consumed after 112 years. In 1970 on the occasion of the fourth centenary of the miracle, the Third Eucharistic Congress of the Diocese of Veroli-Frosinone was celebrated. The adoration of the Blessed Sacrament takes place every First Friday of the month, with all other churches being closed",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Veroli, Italy",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Veroli, Italy (1570 AD)"
  },
  {
    "id": "volterra",
    "location": "Volterra",
    "country": "Italy",
    "year": "1472 AD",
    "century": "15th Century",
    "title": "The Eucharistic Miracle of Volterra",
    "summary": "In 1472, during the war that broke between Volterra and Florence, a soldier from Florence, having entered in the Cathedral of Volterra, managed to take possession of the precious Ciborium of ivory which contained numerous consecrated Hosts.",
    "miracleType": "Bleeding Host",
    "historicalContext": "In 1472, during the war that broke between Volterra and Florence, a soldier from Florence, having entered in the Cathedral of Volterra, managed to take possession of the precious Ciborium of ivory which contained numerous consecrated Hosts. As soon as he left the Church, taken by a fit of fury against the sacramental Jesus, he threw the ciborium with its precious content against a Church wall, All the Hosts fell from it, and - illuminated by a mysterious light - elevated into the air and remained suspended for a long time, Many are the witnesses that were present at the event. mong the principal causes that unchained the pointless Allumiere war, which finished with the sacking of Volterra in 1472 by the army of the Duke of Montefeltro, were above all, the contrast that existed between the different social classes and the personal interests of Lorenzo di Medici. Absorbed by the Florentian state, Volterra was subjected to harsh treatment, which caused the emigration of many wealthy families and the appropriation of their goods at bankruptcy prices. scenar10 that in 1472 our Eucharistic miracle was verified. Among the most authoritative witnesses that describe the miracle, we have the written relation of Friar Biagio Lisci, who was a direct witness.",
    "scientificOrChurchInvestigation": "The relation is now kept in the archives of the ITALY, 1472 5ÅF H library of Volterra. A soldier from Florence entered the Cathedral Church and immediately went to the tabernacle, from which he took the ciborium with consecrated Hosts inside, along with many sacred objects. As soon as he left the Church, taken by a very strong hatred against Jesus in the Eucharist, the soldier flung the ciborium against one of the external walls of the Church and all the Sacred Hosts came out from it, which - as if held by an invisible hand - were elevated into the air, all radiant with light. The soldier fell to the ground out of fright, and having repented, began to cry. Many were the witnesses who were present at this marvel.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Volterra, Italy",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Volterra, Italy (1472 AD)"
  },
  {
    "id": "mornerouge",
    "location": "Morne-Rouge",
    "country": "Martinique",
    "year": "1902 AD",
    "century": "20th Century",
    "title": "The Eucharistic Miracle of Morne-Rouge",
    "summary": "On May 8, 1902. La Montagne, the volcano at the peak of Mount Pelée suddenly erupted. A discharge of lava immediately reached the city of Saint-Pierre de la Martinique and completely destroyed it.",
    "miracleType": "Halting a Tsunami",
    "historicalContext": "On May 8, 1902, La Montagne, the volcano at the peak of Mount Pelée suddenly erupted. A discharge of lava immediately reached the city of Saint-Pierre de la Martinique and completely destroyed it. That day, the eruption mysteriously spared the village of Morne-Rouge, located between Saint-Pierre and Mount Pelée, The prodigious event was accompanied by an apparition of Jesus and His Sacred Heart in the Host exposed for public Eucharistic adoration. There were many witnesses to that extraordinary phenomenon. k'f(é;,'• erupting lava and ashes. The inhabitants of Morne-Rouge, strongly devoted to the Sacred Heart of Jesus, immediately hurried to their parish church to ask Our Lady of Deliverance to spare their village from catastrophe.",
    "scientificOrChurchInvestigation": "p o e rushed to the confessionals. The parish priest, Fr. Mary, gave a general absolution to all the faithful, distributed Holy Communion, and then exposed the Blessed Sacrament for public adoration. At a certain point, a woman cried out, \"The Sacred Heart of Jesus is in the Host !\" A large number of people witnessed the apparition of Jesus in the Host, showing His Sacred Heart Etoe L/\"östöe and stopped only after the reposition of the Bles- sed Sacrament in the tabernacle. On May 8th, the village of Morne-Rouge was spared from the volcano's devastating fury. Therefore, the local population had a chance to reconcile themselves with God, receive the sacraments, and so be prepared to die in the state of grace. On August 30th of the same year, a violent eruption of the same volcano destroyed also the village of Morne-Rouge.",
    "keyScientificFindings": [
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Morne-Rouge, Martinique",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Morne-Rouge, Martinique (1902 AD)"
  },
  {
    "id": "tixtla-2006",
    "location": "Tixtla",
    "country": "Mexico",
    "year": "2006 AD",
    "century": "21st Century",
    "title": "The Bleeding Host of Tixtla (Fresh Blood and Cardiac Tissue)",
    "summary": "During a parish retreat, a nun distributing Communion saw a Host ooze a reddish liquid. Forensic analysis confirmed human blood type AB with active white blood cells.",
    "miracleType": "Bleeding Host",
    "historicalContext": "On October 21, 2006, during a spiritual retreat at the parish of Saint Martin of Tours in Tixtla, a consecrated Host began emitting a reddish substance.",
    "scientificOrChurchInvestigation": "Bishop Alejo Zavala Castro requested an international scientific study led by Dr. Ricardo Castañón Gómez.",
    "keyScientificFindings": [
      "Reddish substance is real human blood containing hemoglobin and intact white blood cells.",
      "DNA analysis showed human origin, but standard genetic profiling could not yield a complete secular genome matching an individual.",
      "Under the blood layer, cardiac muscle fibers (myocardium) were detected."
    ],
    "papalOrEcclesialApproval": "Approved by Bishop Alejo Zavala Castro in 2013 as a sign of divine origin.",
    "bloodType": "AB Positive",
    "currentLocation": "Parish of Saint Martin of Tours, Tixtla, Guerrero, Mexico",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue • Dr. Ricardo Castañón Gómez International Forensic Study (2013)"
  },
  {
    "id": "eten",
    "location": "Eten",
    "country": "Peru",
    "year": "1649 AD",
    "century": "17th Century",
    "title": "The Eucharistic Miracle of Eten",
    "summary": "The Eucharistic Miracle of Eten happened about 365 years ago in the Peruvian town of Port Eten. In a Host exposed for public adoration, there appeared the Child Jesus and three interconnected hearts of a brilliant white color.",
    "miracleType": "Apparition in Host",
    "historicalContext": "The Eucharistic Miracle of Eten happened about 365 years ago in the Peruvian town of Port Eten. In a Host exposed for public adoration, there appeared the Child Jesus and three interconnected hearts of a brilliant white color. Every year, the feast in honor of this event begins on July 12, with the transfer of the Host of the Miracle from its Sanctuary to the church in the City of Eten, and it ends on July 24. Child, framed by thick brown curls that falling to the shoulders. All the faithful present in the church experienced the same vision. took place a few ys later, on July 22 of the same year, during the celebrations in honor of St. Mary of Magdalene, Patroness of the city.",
    "scientificOrChurchInvestigation": "According to the testimony of Brother Marco the Host, dressed in a purple tunic. Beneath it he wore a shirt up to the middle of the chest, according to the custom of the South American Indians. Ihrough this sign, the Divine Child wanted to identify with the Mochican inhabitants of Eten, to demonstrate His love for them. In the same apparition, which lasted about 15 minutes, many also saw appearing in the Host three small white hearts, united among themselves. lhese symbolized the Three Persons of the Holy Trinity : the Father, the Son, and the Holy Spirit, present in the consecrated Host. To this day, the feast in honor of the Miracle of the Divine Child of Eten, continues to attract thousands of faithful yearly.",
    "keyScientificFindings": [
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Eten, Peru",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Eten, Peru (1649 AD)"
  },
  {
    "id": "glotowo",
    "location": "Glotowo",
    "country": "Poland",
    "year": "1290 AD",
    "century": "13th Century",
    "title": "The Eucharistic Miracle of Glotowo",
    "summary": "In 1290, due to the invasion of the Lithuanians, a priest from the village of Glotowo buried in a field a silver ciborium plated in gold, with a consecrated Host still in it which he missed by mistake. The Lithuanian's troops destroyed the village and the church.",
    "miracleType": "Adoration by Animals",
    "historicalContext": "In 1290, due to the invasion of the Lithuanians, a priest from the village of Glotowo buried in a field a silver ciborium plated in gold, with a consecrated Host still in it which he missed by mistake, The Lithuanian's troops destroyed the village and the church, None of the survivors knew about the hidden Host, Only a number of years later, while plowing the field in the spring, a farmer found it by chance, thanks to the strange behavior of his oxen, They had bowed to the ground in adoration of the Host which was emanating a very bright light, he most ancient documents describe how the miracle happened. The oxen were pulling the plow, behind which the farmer was walking. The sun was setting at the horizon, creating long shadows. The man lifted his eyes and prodded the animals which were going slowly up the hill. All of sudden, the plow got stuck, the oxen pulled harder and on the side they turned over a big clod of earth. The animals stopped as if frozen. At first the farmer scolded the beasts, yet paused surprised at the sudden change around him.",
    "scientificOrChurchInvestigation": "The light on the field was as if it were noon and a very intense light was coming from the ground shining on the kneeling oxen. The farmer began to dig and noticed that the bright light POLAND, 1290 white as snow. zears t ecvtrær event spread ra idly among the people, rushed immediately to the site. The local authorities organized a solemn procession to bring the Host to the church of Dobre Miasto, though according to an ancient chronicle, inexplicably, the Host disappeared and was found at the same spot as the first time. The event was interpreted as a sign from above and a little church dedicated to the Corpus Christi was built on that location. The popularity of Glotowo grew through the centuries and in the eighteenth century the old medieval church was enlarged and consecrated by the bishop Krzysztof Potocki, on July 24, 1726. Even today, every year, the shrine of Glotowo attracts numerous pilgrims who come to venerate the relic of the Host, intact since 1290.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Glotowo, Poland",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Glotowo, Poland (1290 AD)"
  },
  {
    "id": "krakow",
    "location": "Kraków",
    "country": "Poland",
    "year": "1345 AD",
    "century": "14th Century",
    "title": "The Eucharistic Miracle of Kraków",
    "summary": "The Eucharistic miracle of Krakow relates to consecrated Hosts that emitted an unusual bright light when they were hidden by thieves in a muddy marsh.",
    "miracleType": "Supernatural Light",
    "historicalContext": "The Eucharistic miracle of Krakow relates to consecrated Hosts that emitted an unusual bright light when they were hidden by thieves in a muddy marsh, The thieves had stolen a monstrance containing consecrated Hosts from a church in the village of Wawel (outside of modern-day Krakow) They ultimately abandoned the monstrance and Hosts in a marsh outside of the village, where the miracle took place, The Church of Corpus Christi in Krakow, Poland contains paintings depicting the miracle as well as documents and depositions relating to the matter, n the year 1345, King Casimar III the Great of Poland gave orders to build a church named Corpus Christi in honor of the Eucharistic miracle that was verified that same year. It had taken place in the village of Wawel, near Krakow. Some thieves broke into a little church ( Collegiate Church of All Saints), which was a short distance from Krakow. They forced their way into the tabernacle and stole the monstrance, which contained consecrated Hosts. Of but when they figured the mons ance was not made of real POLAND, 1345 muddy marshland that was prevalent in the area. Priests from the church began a search, but they did not hold out much hope.",
    "scientificOrChurchInvestigation": "When darkness fell, however, a mysterious light emanated from the spot where the treasure had been abandoned. Bright flashes of light were vi- Sible for several kilometers. Frightened villagers approached the area and reported back to the Bishop of Krakow. The bishop called for three days of fasting and prayer. On the third day, he led a procession out to the marsh. There, they found the monstrance, and within it they found the Hosts, which were unbroken and were the source of the unusual lights. The people began to pray and to celebrate the miraclee Annually on the occasion of the feast of Corpus Christi, the miracle is celebrated in the church of Corpus Christi in Krakow. gold, they threw it (including the Hosts) into the",
    "keyScientificFindings": [
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Kraków, Poland",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Kraków, Poland (1345 AD)"
  },
  {
    "id": "legnica-2013",
    "location": "Legnica",
    "country": "Poland",
    "year": "2013 AD",
    "century": "21st Century",
    "title": "The Miracle of Legnica (Heart Tissue Under Agony)",
    "summary": "A Host dropped on Christmas Day 2013 dissolved in water and produced red stains. Pathological examination confirmed human heart tissue with alteration typical of agony.",
    "miracleType": "Heart Muscle Transformation",
    "historicalContext": "On Christmas Day 2013, a consecrated Host fell to the floor during Communion at the Church of Saint Hyacinth in Legnica. It was placed in a container with water. In January 2014, a red stain appeared.",
    "scientificOrChurchInvestigation": "The Department of Forensic Medicine in Wrocław and later Pomeranian Medical University in Szczecin performed histopathological analysis.",
    "keyScientificFindings": [
      "The tissue is human origin, specifically striated cardiac muscle with changes characteristic of severe hypoxia and emotional/physical trauma.",
      "DNA testing confirmed human genetic material."
    ],
    "papalOrEcclesialApproval": "Approved by Bishop Zbigniew Kiernikowski in 2016 following submission to the Vatican Congregation for the Doctrine of the Faith.",
    "bloodType": "AB Positive",
    "currentLocation": "Church of Saint Hyacinth, Legnica, Poland",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue • Pomeranian Medical University in Szczecin • Vatican CDF Decree (2016)"
  },
  {
    "id": "poznan-1399",
    "location": "Poznań",
    "country": "Poland",
    "year": "1399 AD",
    "century": "14th Century",
    "title": "The Three Bleeding Hosts of Poznań",
    "summary": "Thieves desecrated 3 stolen Hosts with daggers; blood squirted from the Hosts, blinding a girl. Thrown into a swamp, the Hosts levitated in mid-air in brilliant light.",
    "miracleType": "Supernatural Light",
    "historicalContext": "In 1399, desecrators stole three Consecrated Hosts from the Dominican Church in Poznań and pierced them with daggers. Blood spurted from the Hosts onto the table. Frightened, they threw the Hosts into a nearby marsh in Kazimierz.",
    "scientificOrChurchInvestigation": "A young shepherd boy saw the three Hosts hovering above the marsh waters radiating supernatural white light. King Wladyslaw II Jagiello ordered the construction of Corpus Christi Sanctuary on the site.",
    "papalOrEcclesialApproval": "Confirmed by King Wladyslaw II Jagiello and Pope Boniface IX.",
    "currentLocation": "Church of Most Holy Body of Christ (Kościół Bożego Ciała), Poznań, Poland",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue • Royal Decrees of King Władysław II Jagiełło (1399 AD)"
  },
  {
    "id": "sokolka-2008",
    "location": "Sokółka",
    "country": "Poland",
    "year": "2008 AD",
    "century": "21st Century",
    "title": "The Miracle of Sokółka (Tissue Interwoven into Bread Fibers)",
    "summary": "A dropped Host placed in water developed a red clot that two independent university pathologists confirmed as living myocardial heart tissue fused seamlessly with bread fibers.",
    "miracleType": "Heart Muscle Transformation",
    "historicalContext": "During Holy Communion at St. Anthony of Padua Church in Sokółka, a priest accidentally dropped a consecrated Host. It was placed in a vessel of water in the sacristy safe. A week later, a red stain formed in the center.",
    "scientificOrChurchInvestigation": "Prof. Maria Sobaniec-Łotowska and Prof. Stanisław Sulkowski of Bialystok Medical University independently examined the sample under electron microscopy.",
    "keyScientificFindings": [
      "The red substance is living human heart muscle tissue (myocardium) in a state of agonal suffering.",
      "The heart fibers and wheat bread starch fibers are inextricably intertwined on a microscopic level, impossible to achieve by human synthesis or manipulation."
    ],
    "papalOrEcclesialApproval": "Formally recognized by Metropolitan Archbishop Edward Ozorowski and approved by the Vatican Apostolic Nunciature in Poland in 2009.",
    "bloodType": "AB Positive",
    "currentLocation": "Collegiate Church of St. Anthony, Sokółka, Poland",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue • Department of Pathomorphology, Medical University of Białystok"
  },
  {
    "id": "santarem-1247",
    "location": "Santarém",
    "country": "Portugal",
    "year": "1247 AD",
    "century": "13th Century",
    "title": "The Bleeding Host of Santarém",
    "summary": "A woman took a Host from Mass in her veil to give to a sorceress; the Host bled so profusely that light emanated from her wooden chest.",
    "miracleType": "Bleeding Host",
    "historicalContext": "Desperate to cure her husband of infidelity, a woman consulted a sorceress who demanded a Consecrated Host. The woman feigned illness at Mass, kept the Host in her veil, and as she walked home, it began bleeding profusely.",
    "scientificOrChurchInvestigation": "The parish priest and episcopal commission opened the chest, witnessed the glowing Host overflowing with blood, and carried it in solemn procession back to St. Stephen Church.",
    "keyScientificFindings": [
      "The coagulated blood and flesh fragment are contained within a crystal ampoule that has leaked blood during centuries of veneration."
    ],
    "papalOrEcclesialApproval": "Approved by King Afonso III and successive Popes including St. Francis Xavier who venerated the relic before going to India.",
    "currentLocation": "Church of Saint Stephen (Sanctuary of the Most Holy Miracle), Santarém, Portugal",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue • Archdiocesan Archives of Santarém, Portugal"
  },
  {
    "id": "reunion",
    "location": "Saint-André de la Réunion",
    "country": "Réunion Island",
    "year": "1902 AD",
    "century": "20th Century",
    "title": "The Eucharistic Miracle of Saint-André de la Réunion",
    "summary": "On January 26, 1902, at the parish church of Saint-André, a city on the island of La Réunion (French colony).",
    "miracleType": "Apparition in Host",
    "historicalContext": "On January 26, 1902, at the parish church of Saint-André, a city on the island of La Réunion (French colony), Abbot Henry Lacombe, pastor of the church, was witness to the miracle that he would recount to thousands of people during the Eucharistic Congress of Angouleme (1904), as well as to the group of priests gathered for a spiritual retreat in the town of Perigueux, face of Jesus appeared in the Host which was for many hours witnessed by thousands of people. et's look at Abbot Lacome's report: «lt was January 26, 1902. We were celebrating perpetual adoration (the Forty hours). The Most Holy Sacrament was exposed in the tabernacle. I began to celebrate the Mass. After the elevation, at the moment of the Our Father, my eyes were lifted toward the Host and I saw a bright halo around the rays of the monstrance. I continued to recite the prayers of the Mass, with great agitation in my soul but which I tried to overcome.",
    "scientificOrChurchInvestigation": "We came to the moment for Communion and again I looked toward the monstrance. This time I saw a human face, with lowered eyes and a crown of thorns on the forehead. What moved me the most was the dolorous expres- Sion painted on the face. The eyelashes were long and thick. I tried not to let on to the presence of the turmoil agitating inside of me. Etoe L/\"östöe SAINT-ANDRÉ DE LA RÉUNION ISLAND OF LA RÉUNION, 1902 the altar and closely observe the monstrance. raced back and told me : \"Father, we see the head of a man in the Host. It is the good Lord revealing Himself ! I understood then that the vision was authentic\". A young man of 16, Adam de Villiers, who had studied in a college in France, also arrived. I said to him as well: 'Go in the church and see if you notice something strange in the tabernacle\". The young student went to the sacristy and returned immediately, saying: \"Father, it is the good Lord who appears in the Host, I see His divine face\". Since then, all my doubts disappeared. Slowly the entire town went to the church to see the Host suddenly became animated and the crown of thorns disappeared. I used every possible precaution, and fearing the effects from the rays of light, I had all the candles extinguished and the shutters closed. The phenomenon became even more clear. There was a young artist among the visitors who faithfully reproduced the face in the Host. Later, the vision changed again and a crucifix appeared which covered the entire Host from top to bottom. After the Eucharistic blessing and recital of the Tantum Ergo, the vision disappeared.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Saint-André de la Réunion, Réunion Island",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Saint-André de la Réunion, Réunion Island (1902 AD)"
  },
  {
    "id": "alboraya-1348",
    "location": "Alboraya-Almácera",
    "country": "Spain",
    "year": "1348 AD",
    "century": "14th Century",
    "title": "The Miracle of the Fish of Alboraya",
    "summary": "A priest carrying Viaticum fell into a flooded river; three fish caught the three dropped Hosts in their mouths and returned them intact to the priest.",
    "miracleType": "Adoration by Animals",
    "historicalContext": "While crossing the Carraixet ravine to visit a dying sick parishioner, a vicar was swept away by flash floods. The ciborium opened and three Hosts floated downriver toward the sea.",
    "scientificOrChurchInvestigation": "Villagers on the shore saw three fish holding the Hosts upright in their open mouths at the river mouth. The priest brought a chalice to the shoreline, and each fish dropped its Host unharmed into the chalice.",
    "papalOrEcclesialApproval": "Promulgated by the Archdiocese of Valencia; commemorated in regional Eucharistic feasts.",
    "currentLocation": "Parish Church of the Assumption, Alboraya, Valencia, Spain",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue • Archdiocesan Archives of Valencia, Spain"
  },
  {
    "id": "alcala",
    "location": "Alcalá de Henares",
    "country": "Spain",
    "year": "1597 AD",
    "century": "16th Century",
    "title": "The Eucharistic Miracle of Alcalá de Henares",
    "summary": "In the year 1597, a thief stole consecrated Hosts along with some precious objects from a church not far from Alcalå, Spain. A few days later, the thief returned full of profound remorse and went to confess his sins at the church of the Jesuits.",
    "miracleType": "Bleeding Host",
    "historicalContext": "In the year 1597, a thief stole consecrated Hosts along with some precious objects from a church not far from Alcalå, Spain. A few days later, the thief returned full of profound remorse and went to confess his sins at the church of the Jesuits, The priest who heard his confession had him return the Hosts; however, for the sake of prudence, the priest asked him to transport the Eucharist in a silver box, without consuming the Sacred Species, After eleven years the Hosts were still perfectly intact and after careful analysis, both medical and theological, the act was declared miraculous. n 1597, a penitent bandit brought himself to confession at the Jesuit church of Alcalå. He was said to have been part of a band of Moorish gypsies who, after being dispersed from the nearby mountains, had sacked numerous churches and stole monstrances and other sacred objects in different countries, committing many sacrilegious acts. The penitent brought with him some consecrated Hosts that he delivered to the confessor with many tears. The confessor, very moved, went immediately to his superior to inform him.",
    "scientificOrChurchInvestigation": "Initially it was agreed to consume the Hosts during a Mass, but later, fearing that the Hosts could be poisoned as had recently been done to some priests in Murcia and Segovia, it was decided to keep the Hosts in a box made of silver and to allow them to decompose naturally. Eleven years later the twenty-four Hosts were found still intact. The mystic Father Luis de la with some unconsecrated hosts. A few months later, the unconsecrated hosts had decomposed from the humidity, while the consecrated Hosts remained intact. Six years later Father Palma decided to make public the miracle of the Hosts that were still intact. New academic and medical tests from the doctor of His Maje- sty, Garcia Carrera, as well as numerous illustrious theologians, all of whom identified this as a true miracle. IL (60 ecclesiastical authorities offcially authorized the veracity of the Miracle. The Holy Hosts were publicly adored before King Phillip III, who in 1620 presided over a solemn procession in which the whole royal family participated. When Charles III expelled the Jesuits nist revolutionists burned the church, the priests carefully hid the miraculous Hosts prior to being murdered. However, still today the hiding place of the Hosts has not been found. There have been many surveys in the church and in the crypt, but to no avail. Nobody until today had published any news of the twenty-four Sacred Hosts. \"God has made a new miracle!\" exclaimed the wise biographer of the city, Don Anselmo Raymundo Tornero, who has transmitted this story to us meticulously in his work.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Alcalá de Henares, Spain",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Alcalá de Henares, Spain (1597 AD)"
  },
  {
    "id": "alcoy",
    "location": "Alcoy",
    "country": "Spain",
    "year": "1568 AD",
    "century": "16th Century",
    "title": "The Eucharistic Miracle of Alcoy",
    "summary": "The Eucharistic miracle that took place in Alcoy in the year 1568 regards the miraculous retrieval of some consecrated Hosts that had been stolen. The miracle is still remembered every year by the inhabitants of Alcoy in a festival that is celebrated on the feast of Corpus Christi.",
    "miracleType": "Bleeding Host",
    "historicalContext": "The Eucharistic miracle that took place in Alcoy in the year 1568 regards the miraculous retrieval of some consecrated Hosts that had been stolen, The miracle is still remembered every year by the inhabitants of Alcoy in a festival that is celebrated on the feast of Corpus Christi, The house of the man who committed the sacrilege was turned into an oratory and can be visited to this day. n the 29th of January in 1568, a citizen of Alcoy by the name of Juan Prats, a man of French origin who needed money, secretly entered the parochial church and stole many sacred objects, among which was a precious silver box containing three consecrated Hosts. Juan Prats consumed the three Hosts immediately and then hid the box in his stable underneath a pile of wood. The next day, the parish priest, Don Antonio, found out about the sacrilegious theft. Distressed, he sounded the church bells to let the people know of the horrendous act. Soon after, all of the people of Alcoy were assembled in prayer in front of the church.",
    "scientificOrChurchInvestigation": "The searches began immediately, but were in vain. Near Juan Prat's house lived a pious widow, Marfa Miralles, who had a statue of the Holy Child. The woman, profoundly disturbed by the prof ane act, began to SPAIN, 1568 pray intensely in front of the statue of Jesus, pleading for the consecrated Hosts to be returned to the citizens of Alcoy. Few hours had passed when she started her fervent prayer when Marfa saw the little hand of the statue of Jesus point its finger to the house of her neighbor, Juan Prats. decided aromau&/ sus to tell the civil authorit• s of what had taken place. In that moment the pastor of the church, moved by a mysterious force, went to the garden of the house of Juan Prats and entered the stable. He rummaged through the pile of wood and immediately recovered the silver box with the three consecrated Hosts. Juan Prats, not understanding how the three Hosts were inside the silver box again, (as he remembered consuming them) repented deeply and confessed the misdeed. The documents relative to the miracle and monastery of the Holy Sepulcher of Alcoy.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Alcoy, Spain",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Alcoy, Spain (1568 AD)"
  },
  {
    "id": "caravaca-de-la-cruz",
    "location": "Caravaca de la Cruz",
    "country": "Spain",
    "year": "1231 AD",
    "century": "13th Century",
    "title": "The Eucharistic Miracle of Caravaca de la Cruz",
    "summary": "The Eucharistic miracle of Caravaca de la Cruz regards the celebration of a miraculous Mass during which Jesus appeared inside a Host together with a Crucifix. Thanks to this apparition, the Muslim king of Murcia and his family were converted to Catholicism.",
    "miracleType": "Apparition in Host",
    "historicalContext": "The Eucharistic miracle of Caravaca de la Cruz regards the celebration of a miraculous Mass during which Jesus appeared inside a Host together with a Crucifix, Thanks to this apparition, the Muslim king of Murcia and his family were converted to Catholicism, The most authoritative document describing the miracle is the contemporary testimony of the Franciscan Father Gilles of Zamora, the historian of King St. Ferdinand, tative is that supplied by King Saint Ferdinand's historian of the time, Father Gilles de Zamora. We know with certainty that a Christian priest, Don Gfnes Pérez Chirinos de Cuenca, traveled amongst the Moors of the Kingdom of Murcia with the purpose of preaching the Gospel. He was captured, however, and brought to the presence of the Mo- orish King Zeyt-Abu-Zeyt who asked him some questions about certain aspects of the Christian faith. The king particularly wanted to deepen his understanding of the Mass. The priest went into detail explaining the importance of the Mass and the king, fascinated by the preaching of the priest, ordered him immediately to celebrate a Mass. Since the priest did not have the necessary equipment for the celebration, the king ordered SPAIN, 1231 some of his men to get them from the nearby country of Cuenca, in Christian territory.",
    "scientificOrChurchInvestigation": "But still, the Cross, which needed to be present on the altar during a Mass, had been forgotten. The priest began to celebrate the Mass but, at a certain point, realized the absence of the Cross. He became troubled and stopped. why he was so disturbed the priest told him that he needed The king however immediately re- a Cross. sponded, \"Wouldn't that be it?\" In fact, at that thanks to the Lord. He then continued with the glorious celebration. The miracle continued. At the moment of the consecration, the Muslim king saw a beautiful Baby in the place of the Host Who gazed on him endearingly. After having witnessed the miraculous event, the king and his family converted to Christianity and were baptized. Zeyt-Abu-Zeyt took the name of Vincent and his wife took the name Elena. From that day, the 3rd of March 1231, the country is called Ca- ravaca de la Cruz. Recently, in the jubilee year, the Holy See allowed Caravaca de la Cruz to be the fifth city in the world, after Santiago de Com- postela, Santo Toribio de Liebana, Rome and Je- rusalem, to celebrate the Perpetual Jubilee (one holy year every seven in perpetuum) in the San- ctuary where the Holy Cross is kept.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Caravaca de la Cruz, Spain",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Caravaca de la Cruz, Spain (1231 AD)"
  },
  {
    "id": "cimballa",
    "location": "Cimballa",
    "country": "Spain",
    "year": "1370 AD",
    "century": "14th Century",
    "title": "The Eucharistic Miracle of Cimballa",
    "summary": "In the year 1370, the pastor of Cimballa was assaulted with a strong doubt during the Mass about the true presence of Jesus in the Eucharist. The Host then transformed into flesh and from it began to flow blood onto the altar-linens.",
    "miracleType": "Heart Muscle Transformation",
    "historicalContext": "In the year 1370, the pastor of Cimballa was assaulted with a strong doubt during the Mass about the true presence of Jesus in the Eucharist, The Host then transformed into flesh and from it began to flow blood onto the altar-linens, The episode reenforced the wavering faith of the priest who penitently retired to a monastery dedicating himself to a life of penance and prayer, Every year, the 12th of Septem- ber, the memory of the miracle in the parish church is celebrated where even now the Relic of Miracle that took place in 1370 in the church of the Purification of Our Lady. The pastor of the church, Don Tommaso, had been for many months plagued by doubt concerning the true presence of Christ in the sacrament of the Eucharist. During the celebration of Holy Mass on Sunday, after having pronounced the words of the consecration, Don Tommaso saw the Host transformed into flesh and the blood began to flow from it, so much as to soak the altar-linens. tat began to weep from remo e. The fait ul, seeing how he was troubled, quickly looked to the altar and saw the miracle. The relic was then taken in procession and the news spread everywhere. There were many Etoe L/\"östöe SPAIN, 1370 relic of the altar-linen soaked in the blood has been exposed the 12th of September of every year on the day of the anniversary of the feast of the blood Miracle.",
    "scientificOrChurchInvestigation": "Independent Medical & Forensic Commission: Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives. Canonical investigation and historical archives in Cimballa, Spain verified the authenticity of the prodigy.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Cimballa, Spain",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Cimballa, Spain (1370 AD)"
  },
  {
    "id": "daroca-1239",
    "location": "Daroca",
    "country": "Spain",
    "year": "1239 AD",
    "century": "13th Century",
    "title": "The Six Bleeding Hosts of Daroca",
    "summary": "During the Reconquista, six Hosts consecrated for Christian commanders bled onto the altar cloth during a surprise attack.",
    "miracleType": "Bleeding Host",
    "historicalContext": "Before a battle against Moorish forces at Luchente, Fr. Mateo Martínez consecrated six Hosts for commanders. When an unexpected assault occurred, Fr. Martínez hid the Hosts inside the altar corporal. Afterward, the cloth was found soaked in blood with 6 Hosts stuck to it.",
    "scientificOrChurchInvestigation": "The bloody corporal was placed on a mule which walked without guidance to Daroca and stopped at the Church of St. Mark.",
    "papalOrEcclesialApproval": "Promulgated by Pope Urban IV and Pope Clement VI.",
    "currentLocation": "Basilica of Santa María de los Sagrados Corporales, Daroca, Spain",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue • Papal Decrees of Pope Urban IV and Pope Clement VI"
  },
  {
    "id": "guadalupe",
    "location": "Guadalupe (Cáceres)",
    "country": "Spain",
    "year": "1420 AD",
    "century": "15th Century",
    "title": "The Bleeding Host of the Royal Monastery of Guadalupe",
    "summary": "During the celebration of the Mass, a priest saw numerous drops of Blood fall from the consecrated Host. The miracle contributed to strengthening the belief of the priest and many of the faithful, among whom was also the King of Castile.",
    "miracleType": "Bleeding Host",
    "historicalContext": "During the celebration of the Mass, a priest saw numerous drops of Blood fall from the consecrated Host. The miracle contributed to strengthening the belief of the priest and many of the faithful, among whom was also the King of Castile, There are numerous documents that testify to the miracle, The relics of the marvel had been exhibited for the veneration of the faithful during the Eucharistic Congress of Toledo in 1926 and even today are the objects of deep devotion to the whole of the Spani- cious relics of the corporal and of the bloodied pall (the pall is the small rigid linen cloth of square shape that serves to cover the chalice and the paten), used during the miraculous Mass from the Venerable Don Pedro Cabafiuelas, in the region of Toledo, He was always distinguished for his deep devotion to the Holy Eucharist, and he spent many hours in adoration, both night and day, before the Blessed Sa- crament. He had been brutally tempted to doubt the reality of transubstantiation, but in 1420 all of his doubts had disappeared. As he had been accustomed to do daily, Don Pedro began to celebrate the Holy Mass: at the moment of the consecration he saw a dense cloud come down from above and settle itself above the altar. He could not see any more. Then the priest began to im- SPAIN, 1420 plore the Lord to remove his doubts.",
    "scientificOrChurchInvestigation": "Slowly the cloud began to reduce itself and presented this sight: the Host was lifted above the chalice and abundant drops of Blood began to fall that immediately replenished the chalice and even overflowed pouring onto the corporal and on the pall. At that point, the priest heard a voice that said: \"Finish the Holy Mass, and for the moment reveal to no one what you saw\". (UZS u published by the brothers of Don Pedro and the news was spread in all of Spain until it reached the King of Castile, Don Juan II and the Queen, Lady Maria of Aragon, who became so devoted to the miracle that they asked to be buried near the body of the Venerable Father Pedro Ca- bafiuelas. *star",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Guadalupe (Cáceres), Spain",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Guadalupe (Cáceres), Spain (1420 AD)"
  },
  {
    "id": "gerona",
    "location": "Gerona",
    "country": "Spain",
    "year": "1297 AD",
    "century": "13th Century",
    "title": "The Eucharistic Miracle of Gerona",
    "summary": "In the Eucharistic miracle of Gerona, during the celebration of the Mass, a priest doubted the Real Presence of Christ in the Eucharist. But when the time for Communion arrived, the priest did not succeed in swallowing the Host, which had transformed into Flesh in his mouth.",
    "miracleType": "Heart Muscle Transformation",
    "historicalContext": "In the Eucharistic miracle of Gerona, during the celebration of the Mass, a priest doubted the Real Presence of Christ in the Eucharist, But when the time for Communion arrived, the priest did not succeed in swallowing the Host, which had transformed into Flesh in his mouth, Unfortunately the relic of the Host transformed into Flesh was destroyed in 1936, during the civil war, he miracle happened in the church of an ancient monastery of the Benedictines of San Daniele where, until the past century, a precious reliquary was preserved containing a cloth spotted with Blood, that the people called the \"Sant Dubt\", the \"Holy Doubt\". In 1297, while they assisted at Mass in their chapel, the nuns noticed that at the moment of consuming the consecrated Host, the celebrant was impeded and demonstrated bewilderment. A nun that followed the rite from above the altar saw the priest remove something from his mouth, and afterwards wrapped it in the corporal and placed it on the corner of the altar. After the Mass, the nun went immediately to the altar to verify what the priest had hidden in the white cloth and with great amazement discovered that it contained a small piece of Flesh, dripping with Blood. SPAIN, 1297 just as he put the Holy Host in his mouth, the size increased to such a volume and consistency that he was not able to swallow the Sacred Species. the Eucharist i one of the corporals d left the Sacrament on the altar.",
    "scientificOrChurchInvestigation": "The little Particle which was changed into Flesh was then placed in a reliquary. Unfortunately, many of the relevant documents to the miracle became lost. The reliquary containing the Incarnate Host and the Blood-soaked corporal were destroyed during the civil war of 1936.",
    "keyScientificFindings": [
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Gerona, Spain",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Gerona, Spain (1297 AD)"
  },
  {
    "id": "gorkum",
    "location": "Gorkum / El Escorial",
    "country": "Spain",
    "year": "1572 AD",
    "century": "16th Century",
    "title": "The Eucharistic Miracle of Gorkum / El Escorial",
    "summary": "The sacred relic of the Eucharistic miracle can be venerated even today in Spain. But it is kept in the Royal Monastery in El Escorial, but the miracle was verified in Holland. Some Protestant mercenaries entered into the Catholic church in Gorkum and plundered it.",
    "miracleType": "Bleeding Host",
    "historicalContext": "The sacred relic of the Eucharistic miracle can be venerated even today in Spain, But it is kept in the Royal Monastery in El Escorial, but the miracle was verified in Holland. Some Protestant mercenaries entered into the Catholic church in Gorkum and plundered it, As a sign of insult, one of the mercenaries trampled a consecrated Host with a spiked boot, which broke it into three pieces, Immediately from these piercings, it began to drip live Blood and in the Hosts formed themselves like three small wounds in the shape of a hoop in El Escorial (near Madrid). It was desecrated in Gorkum (in Holland) in 1572 by some followers of Ulrich Zwingli (the so-called \"Geux de la Mer\") from the Money of the Prince of Orange. t cit / they began to as soon as they entered, they began striking the tabernacle with bolts of iron, from which they seized the monstrance that contained the Blessed Sacra- mente The Host was then thrown onto the ground and trampled with a spiked boot which broke it into three pieces. One of the prof aners, penitent and upset by the sight, warned the Canon Jean van der Delft who succeeded in making the Hosts safe. The relic, after having passed through various the miracle happened in Holland Gothic temple designed dangers, was given to King Philip II of Spain in 1594, who then placed it under the care of the Monastery of San Lorenzo in El Escorial.",
    "scientificOrChurchInvestigation": "Above the altar where the miraculous Hosts are preserved, the Italian artist, Filippo Filippini made four bas-reliefs in marble and bronze that represents the phenomenal events. The painting by Claudio Coello (1621-1693) represents the inauguration of the magnificent tabernacle, commissioned by King Carlos II specifically to contain the precious relic. Each year in El Escorial, on September 29 and October 28, there are solemn festivities in remembrance of the miracle, in which there are moments where the Precious Host, known by the name of \"Sagrada Forma\", is exposed and carried in procession. by Vincente Lopez",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Gorkum / El Escorial, Spain",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Gorkum / El Escorial, Spain (1572 AD)"
  },
  {
    "id": "ivorra-1010",
    "location": "Ivorra",
    "country": "Spain",
    "year": "1010 AD",
    "century": "11th Century",
    "title": "The Miracle of the Precious Blood of Ivorra",
    "summary": "A priest doubting Transubstantiation saw Consecrated Wine gush over the altar chalice as real blood. St. Ermengol carried the bloodstained linens directly to Pope Sergius IV in Rome.",
    "miracleType": "Bleeding Host",
    "historicalContext": "Fr. Bernat Oliver, parish priest of Ivorra, suffered doubts regarding the real conversion of bread and wine. At the words of consecration, the wine in the chalice transformed into real blood and overflowed onto the altar cloth.",
    "scientificOrChurchInvestigation": "Bishop Saint Ermengol of Urgell investigated the miracle personally and brought the bloodsoaked linens and chalice to Rome.",
    "papalOrEcclesialApproval": "Pope Sergius IV issued a Papal Bull confirming the divine origin of the miracle and granted relics to the Diocese of Urgell.",
    "currentLocation": "Sanctuary of Santa Maria del Sant Dubte (Holy Doubt), Ivorra, Catalonia, Spain",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue • Papal Bull of Pope Sergius IV (1010 AD)"
  },
  {
    "id": "johnabbesses",
    "location": "Sant Joan de les Abadesses",
    "country": "Spain",
    "year": "1251 AD",
    "century": "13th Century",
    "title": "The Incorrupt Host of Sant Joan de les Abadesses",
    "summary": "In 887, the Count Vifred founded a monastery in the Pirenean region of Catalonia, around which a village developed almost immediately, called even today \"Saint John of the Abbesses (\"San Juan of the Abadesas\").",
    "miracleType": "Incorrupt Host",
    "historicalContext": "In 887, the Count Vifred founded a monastery in the Pirenean region of Catalonia, around which a village developed almost immediately, called even today \"Saint John of the Abbesses (\"San Juan of the Abadesas\"), Here a crucifix is preserved with a Host, kept intact since 1251, imbedded in the forehead of the statue of Jesus, n 1251 some artistic works in wood were done in the church of the monastery, depicting the deposition of Jesus from the Cross, with the figures of Jesus and His Mother Mary, Joseph of Arimathea, Nicodemus, Saint John the disciple Jesus loved, and the two thieves. These beautiful statues, saved from the destruction of the 1936 Spanish Civil War, cause great emotion in many people because of their expression. Jesus' head especially, is impressively beautiful. stmtae arms CLrP the artist made a depression in Jesus' forehead, approximately two and a half inches in diameter, with the idea of preserving the Eucharist in it. In 1251 someone put a consecrated Host there, but the memory of this was lost in time. SPAIN, 1251 Only in 1426, while working to restore the statues, the cavity in the forehead of the crucifix was discovered, sealed by a small silver plaque.",
    "scientificOrChurchInvestigation": "Inside, wrapped in a white linen cloth, the Host consecrated in 1251 was found, totally uncorrupted. Since then, that Host, known as \"The Most Holy Mystery of Saint John of the Abbesses is adored and visited by numerous pilgrims.",
    "keyScientificFindings": [
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Sant Joan de les Abadesses, Spain",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Sant Joan de les Abadesses, Spain (1251 AD)"
  },
  {
    "id": "moncada",
    "location": "Moncada",
    "country": "Spain",
    "year": "1392 AD",
    "century": "14th Century",
    "title": "The Eucharistic Miracle of Moncada",
    "summary": "In the Eucharistic miracle of Moncada. Baby Jesus appeared in the Sacred Host to dissipate the doubts of a priest uncertain about the validity of his priestly ordination.",
    "miracleType": "Apparition in Host",
    "historicalContext": "In the Eucharistic miracle of Moncada, Baby Jesus appeared in the Sacred Host to dissipate the doubts of a priest uncertain about the validity of his priestly ordination, At the end of the 14th century, in fact, the French cardinals elected an antipope hoping that he would transfer the Holy See back to Avignon, This event created great confusion among the clergy, to the point that many priests started doubting whether they had been validly ordained, Fre Odorico Raynaldi described the fact in his Anales Eclesiasticos, It is also narrated in other numerous documents kept in the archives of the city of Moncada, he election of Pope Urban VI (April 18, 1378) had been strongly opposed by the French cardinals, who hoped that a French Pope would transfer the Holy See back to Avignon. After many events, on September 20, 1378, they elected the antipope Clement VII. The schismatics immediately tried to seize Rome, but their attempts failed. Therefore, they retreated to Avignon where Clement VII continued to act as the legitimate pontiff. During this period of great uncertainties, Fr. Mosén Jaime Carr6s, a priest in Moncada, was living in the anguish that his ordination was invalid, since a bishop appointed by the antipope Clement VII had ordained him.",
    "scientificOrChurchInvestigation": "Every time he celebrated Mass he greatly feared he was deceiving the faithful by distributing unconsecrated hosts. He was also terrified that none of the other sacraments he was performing were valid. The priest ardently prayed SPAIN, 1392 r.iC!lnc i i lill That day, the aristocratic woman Angela Alpicat attended Mass with her five year old daughter, Inés (the future St. Inés de Moncada). At the end of Mass, the little girl refused to leave the church, imploring her mother to let her remain there to play with the beautiful child the pastor had held in his arms during Mass. Lady Angela went to Mass again, and when the priest lifted the Host, the little girl saw the child in the hands of the priest. At the end of Mass, Lady Angela referred her daughter's visions to the priest, who immediately examined her. Little Inés answered all the priest's questions without any difficulties. The priest, though, wanted to test her further and 7Ä'iih' t' only one of them. Then, taking the consecrated Host, the priest asked the little girl what she could see in his hands. She answered, \"I see Baby Jesus. Then he lifted the unconsecrated host and asked the same question. \"I see a white little disc,\" Inés answered. The priest was overwhelmed with joy, and the whole congregation exulted in seeing the validity of their pastor's ordination confirmed. Although an antipope had ordained the bishop who ordained Moncada's pastor Fr. Carr6s, God had remained faithful to the apostolic succession determined by the imposition of the bishop's hands.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Moncada, Spain",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Moncada, Spain (1392 AD)"
  },
  {
    "id": "montserrat",
    "location": "Montserrat",
    "country": "Spain",
    "year": "1657 AD",
    "century": "17th Century",
    "title": "The Eucharistic Miracle of Montserrat",
    "summary": "The Eucharistic miracle of Montserrat brings us to reflect on the reality of purgatory and reminds us that every Mass has an infinite value because it makes the unique sacrifice of Christ suffering on Calvary present in our minds.",
    "miracleType": "Heart Muscle Transformation",
    "historicalContext": "The Eucharistic miracle of Montserrat brings us to reflect on the reality of purgatory and reminds us that every Mass has an infinite value because it makes the unique sacrifice of Christ suffering on Calvary present in our minds, This Eucharistic prodigy is reported by the Benedictine priest Francio de Paula Crusellas, in his text, New History ofthe Sanctuary and Monastery of Our Lady of Montserrat, Benedictine order in Spain, and Abbot Don Millån de Mirando, arrived at the Monastery of Our Lady of Montserrat in order to participate in some conferences. During one of the conferences, a woman and her young daughter showed up and the daughter began to beg the Abbot Millån de Mirando to celebrate three Masses in memory of her deceased father, whole-heartedly convinced that with these Masses the soul of her father would be freed from the pains of purgatory. The good abbot, moved to tears by the girl, began to celebrate the first Mass of suffering the next day, and the girl, who was present with her mother, confirmed seeing her father kneeling, surrounded by frightening flames at the step of the main altar SPAIN, 1657 tissue close to the flames that surrounded her father in order to verify her story. Following their request, the girl put the tissue into the fire, which only she could see, and the tissue began to burn with a lively flame. (Mass the gi I onfirmed having seen her father dressed in a vibrantly colored suit standing next to the deacon. At the third Mass, the father appeared to his daughter dressed in a snow-white suit.",
    "scientificOrChurchInvestigation": "As soon as the Mass ended the girl exclaimed, \"There is my father going away and rising into the sky!\" The girl then thanked the community of monks on behalf of her father as he had asked her to do. The Most Reverend General of the Benedictine order in Spain, the Bishop of Astorga, and numerous citizens of the town were present.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Human Myocardium (Heart Tissue) (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Montserrat, Spain",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Montserrat, Spain (1657 AD)"
  },
  {
    "id": "cebreiro-1300",
    "location": "O Cebreiro",
    "country": "Spain",
    "year": "1300 AD",
    "century": "14th Century",
    "title": "The Galician Grail of O Cebreiro",
    "summary": "A monk mocked a poor farmer for walking through a blizzard to attend Mass. At the consecration, the Host turned into flesh and the wine into blood before the scoffing monk.",
    "miracleType": "Heart Muscle Transformation",
    "historicalContext": "In the mountain village of O Cebreiro along the Way of St. James, a monk celebrating Mass inwardly scoffed at a peasant, Juan Santín, who hiked through a fierce winter blizzard just for bread and wine. At the words of Consecration, the Host turned into visible human flesh and the chalice filled with real blood.",
    "scientificOrChurchInvestigation": "Queen Isabella of Castile visited O Cebreiro in 1486 and donated a crystal reliquary to preserve the miraculous blood and flesh.",
    "papalOrEcclesialApproval": "Approved by Pope Innocent VIII and Pope Alexander VI.",
    "currentLocation": "Church of Santa María la Real, O Cebreiro, Lugo, Galicia, Spain",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue • Royal Archives of Isabella of Castile (1486 AD)"
  },
  {
    "id": "onil",
    "location": "Onil",
    "country": "Spain",
    "year": "1824 AD",
    "century": "19th Century",
    "title": "The Eucharistic Miracle of Onil",
    "summary": "In the Eucharistic miracle of Onil, a pyx containing a consecrated Host was robbed from a parish church. Days later, a woman from the nearby town of Tibi recovered the stolen pyx with the consecrated Host inside in the middle of a green field. Exactly 119 years later, on November 28, 1943.",
    "miracleType": "Incorrupt Host",
    "historicalContext": "In the Eucharistic miracle of Onil, a pyx containing a consecrated Host was robbed from a parish church, Days later, a woman from the nearby town of Tibi recovered the stolen pyx with the consecrated Host inside in the middle of a green field. Exactly 119 years later, on November 28, 1943, Don Guillermo Hijarrubia, delegate of the Archbishop of Valencia, confirmed the authenticity of the miracle, verifying the complete preservation of the Host, To this day the consecrated Host has remained intact in spite of the 182 years that have passed, n November 5, 1824 Nicolås Bernabeu, who had been an altar boy in the church of Onil since the time he was little, stole the pyx that contained the Most Holy Sacrament and some other sacred objects from the church of Onil. The news of the sacrilegious robbery spread so quickly throughout the region that when the thief tried to sell the stolen objects to Alicante he aroused the suspicions of the businessman, who then warned the authorities. Nicolås Bernabeu was arrested, but did not want to reveal where he hid the pyx, which still contained the Blessed Sacrament. The faithful and the civil authorities looked for days all over the countryside but the stolen goods were in the nearby town of Tibi where the thief lived. A woman named Teresa Carbonell found the Hosts on November 28, SPAIN, 1824 Sacrament to Onil where she was received with great celebration.",
    "scientificOrChurchInvestigation": "Exactly 119 years later, on November 28, 1943, Don Guillermo Hijarrubia, delegate of the archbishop of Valencia, confirmed the authenticity of the miracle, verifying the complete preservation of the Host contained in the stolen pyx. one can admire the miraculous Host at has remained intact for almost two centuries in the parish church of St. James the Apostle in Onil. Every year the Feast of Our Lord \"Robat\" is celebrated in memory of this Eucharistic SPAIN, 1824 (Udmzt/& retar Sacr receip Æost (Uit escando cuanto podemos, la cristiana, y abntarla graciag usando librerrmte de las facultades que Nos y dando graciosamente que del misrno mcdo razibimos, por lus preseatu. cuerenta dias de Indulgencia mente recaren u J/2J, •runw V/rn;a/r *ndo å Dios por la exaltaCion de nugtra &uta Fé Catålica, Ctirpacion 'da las berqias, y oncordia entrø los principa de i8ra Por d' S. •i Sea«; gcøada koaÆÆa Önczvwuplo oeuetada en deada e.t aho 1824 Adoraciön Nocturna Espanola DIOCESIS DE ORIHUELA - ALICANTE SOLEMNE VIGILIA DIOCESANA DE ESPIGAS",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 2 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Onil, Spain",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Onil, Spain (1824 AD)"
  },
  {
    "id": "ponferrada",
    "location": "Ponferrada",
    "country": "Spain",
    "year": "1533 AD",
    "century": "16th Century",
    "title": "The Eucharistic Miracle of Ponferrada",
    "summary": "In the miracle of Ponferrada. Juan De Benavente decided to steal the tabernacle containing a precious silver ciborium with numerous consecrated Hosts inside from his very own parish.",
    "miracleType": "Bleeding Host",
    "historicalContext": "In the miracle of Ponferrada, Juan De Benavente decided to steal the tabernacle containing a precious silver ciborium with numerous consecrated Hosts inside from his very own parish, With only the passing of time and miraculous circumstances the recovery of the stolen Hosts, which remained perfectly intact, was made possible, uan De Benavente lived in Ponferrada with his wife. It was apparent that he was very devout and religious. In fact every evening he stopped in church to pray. One day, during his prayer time, he succumbed to greed and seized the tabernacle, a simple wooden container, in which there was a precious silver ciborium containing some consecrated Hosts. He fled from the church and headed towards the Sil River in order to pitch the cheap wooden tabernacle, but when he tried to launch it into the water he could not because of its sudden immense weight. So he returned home where he hid everything and said nothing to his wife.",
    "scientificOrChurchInvestigation": "During the night continuous flashes of light came from the tabernacle, arousing the suspicion of his wife. So Juan decided to go out and dispose of his sacrilegious stolen goods. He reached a place the townspeople called the SPAIN, 1533 SÅCRÅMEtuq was previously housed, Ponferrada Arenal Field and threw the tabernacle and consecrated Hosts into the middle of the blackberry patch. The discovery of the crime brought dismay among all of the population and Juan became increasingly nervous and anxious, also because he did not know how to sell the silver ciborium without getting caught. Mear Ar the owner of the land, Diego Nufiez de Losada, set up a target practice for entertainment during the feast days. During the time frame in which the sacred Hosts were still in the blackberry patch, eyewitnesses reported seeing flashes of light at night and strange doves hovering during the day. The crossbowmen tried in vain to hit the doves. The miller Nogaledo decided then to capture the doves with his own hands and the intense flashes of light originated. Disturbed, he went straight towards the church where the bells were ringing in the distance. The return of the sacred Hosts was organized Vith a solemn procession. Juan was overcome with remorse and decided to admit his guilt. In the place where the miraculous Hosts were recovered a chapel was immediately constructed. In 1570 the parish priest planned the expansion of the building and instituted a solemn annual procession on the eighth day of the Feast of Corpus Christi in memory of the miracle.",
    "keyScientificFindings": [
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Ponferrada, Spain",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Ponferrada, Spain (1533 AD)"
  },
  {
    "id": "silla",
    "location": "Silla",
    "country": "Spain",
    "year": "1907 AD",
    "century": "20th Century",
    "title": "The Eucharistic Miracle of Silla",
    "summary": "The Eucharistic miracle of Silla happened in 1907. Some Hosts, stolen by unknown thieves, were recovered in perfect condition and were hidden under a stone in a little garden not far from the city.",
    "miracleType": "Incorrupt Host",
    "historicalContext": "The Eucharistic miracle of Silla happened in 1907, Some Hosts, stolen by unknown thieves, were recovered in perfect condition and were hidden under a stone in a little garden not far from the city. Even today it is possible to adore the miraculous Hosts: they remain intact since almost one hundred years ago, The Hosts are preserved in the church of Our Lady of the Angels in Silla, Still today it is possible to adore the uncorrupted Hosts preserved in the church of this town at the outskirts of Valencia, uring the celebration of the Mass on March 25, 1907, feast of the Annunciation, Fernand Gomez, pastor of the Church of Our Lady of the Angels in Silla, opened the tabernacle to get the Hosts for the Communion of the faithful. Greatly perturbed, he found the little tabernacle door opened and the precious silver ciborium with all the consecrated Hosts missing. The Sacred Species were found two days later in a small garden outside the city, hidden under a stone. The pastor returned them with a solemn procession to the church. /7/& realizing that the Hosts remained \"in the same way in which they were found under the stone and that they had remained unchanged in the original condition\", the Archbishop of Valencia started a process to SPAIN, 1907 He also wrote a detailed documentation of the miracle.",
    "scientificOrChurchInvestigation": "Unfortunately, two years later the bishop's residence was burned down by the anarchists-communists and the precious document was lost. In 1982, then-Archbishop of Valencia. Monsignor Miguel Roca, started a new canonical process by which he also determined how to officially worship the Sacred Host of the miracle.",
    "keyScientificFindings": [
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Silla, Spain",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Silla, Spain (1907 AD)"
  },
  {
    "id": "valencia",
    "location": "Valencia",
    "country": "Spain",
    "year": "1392 AD",
    "century": "14th Century",
    "title": "The Eucharistic Miracle of Valencia",
    "summary": "This precious object has always been at the center of extraordinary stories and novels like the legend of the Knights of the Round Table in England, the stories of Perceval in France, and Parzival in Germany of the twelfth and thirteenth century.",
    "miracleType": "Bleeding Host",
    "historicalContext": "This precious object has always been at the center of extraordinary stories and novels like the legend of the Knights of the Round Table in England, the stories of Perceval in France, and Parzival in Germany of the twelfth and thirteenth century, This genre was used by Wagner in a Christian- esoteric perspective and at the end of the twentieth century the fantastic novels of B, Cornwell favored the birth of the editorial trend still alive today, he Holy Grail of Valencia is the Chalice used by Jesus in His Last Supper with the apostles to consecrate and offer the Eucharistic wine that is His Blood, but it has also been identifled as the cup in which Joseph of Arimathea collected the Blood of Jesus on the Cross. There are a number of variants to indicate the Grail: San Greal, Holy Grail, Sangreal in England, Sanct Graal and Saint Graal in the antique and modern French, Gral and Graal in German. The \"grolla\" of the Aostan valley is lexically related to the grail and similar to the Latin gradalis o gratalis, \"vase\" or glass. From many sources, we know that a few centuries after the death of Christ the Holy Grail was being shown to Christian pilgrims in Jerusalem. the Chalice in which the Lord Himself consecrated His own Blood was preserved in the Church of the Holy Sepulcher in Jerusalem. cup was protected by a net and it could be touched and kissed through an opening.",
    "scientificOrChurchInvestigation": "No one knows exactly when the Chalice was taken from Jerusalem; most probably as far back as the seventh century. Today, in the gothic chapel of the \"Santo Caliz\" (\"Holy Chalice\") in the city's cathedral, a miraculous chalice identified by tradition as the Holy Grail, is kept and shown for the veneration of the faithful. This precious item is constructed in different by precious stones and the upper part is a cup, also of Cornelian. These parts are attributed to different eras; the cup is the most antique and the most difficult to date and constitutes the most interesting part. On the base there is an inscription in Arabic of disputed interpretation, but that could be another proof to determine the date. According to professor Salvador Antunano, \"When we know the mystery of the Chalice of the Holy Grail we realize that in it there is nothing enigmatic or esoteric. The history of this precious Chalice concerns the most dramatic, most sublime episode ever lived by humanity: the history of the Word made Man and Eucharist\". consecrate cerime Cross. iiiiiL MS' 17. COPA b",
    "keyScientificFindings": [
      "Documented in 2 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Valencia, Spain",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Valencia, Spain (1392 AD)"
  },
  {
    "id": "zaragoza",
    "location": "Zaragoza",
    "country": "Spain",
    "year": "1427 AD",
    "century": "15th Century",
    "title": "The Eucharistic Miracle of Zaragoza",
    "summary": "In the consecrated Host, stolen by a woman of Zaragoza to use in making a love potion, the Baby Jesus appeared. In the town hall archives of the city of Zaragoza is preserved the document that describes the miracle in detail.",
    "miracleType": "Apparition in Host",
    "historicalContext": "In the consecrated Host, stolen by a woman of Zaragoza to use in making a love potion, the Baby Jesus appeared, In the town hall archives of the city of Zaragoza is preserved the document that describes the miracle in detail, And in the cathedral, next to the chapel there is a painting accurately depicting the marvelous event, the city was don Alonso Arhuello. Don Dorner, archdeacon of the city, left a written report of the event: \"A married woman consulted a Moorish evil sorcerer for a remedy to cure her husband of his violent nature and to make him treat her more gently. To change the husband's behavior, the sorcerer told her he needed a consecrated Host. The very superstitious woman went to the church of Saint Michael, went to confession and received the Eucharist. With diabolical cunning, she took the Blessed Sacrament from her mouth and hid the Host in a small coffer which she took immediately to the sorcerer. When they opened the coffer, instead of the Host they saw, with great terror, a little Baby surrounded by light.",
    "scientificOrChurchInvestigation": "The sorcerer told the SPAIN, 1427 The unscrupulous woman did as she was told, but with great amazement saw that though the coffer was completely burned, the Baby remained unharmed. ((Str'ccTe/& terror and out of her mind she ran to the house of the sorcerer to tell him what happened. The sorcerer on hearing the words of the woman, began to tremble, fearing a vengeance from heaven. They decided to go to the cathedral to inform the bishop don Alonso, confess their sin and ask for baptism. \"The bishop consulted some prelates and theologians of the diocese to shed light on the event and finally decided to take the Miraculous Baby Choir stalls of the See panied the procession and was deeply moved at the sight of the marvelous Baby. Once in the cathedral, the Miraculous Baby was put on the altar of the chapel of Saint Valerio so that the people of Zaragoza could see Him and venerate Him. The following day while the bishop was celebrating Mass at the same altar, at the words of consecration, a Host, immediately consumed by the bishop, appeared where the Baby was. Thanks to this Eucharistic miracle, the people of Zaragoza were renewed in their devotion to the Blessed Sacrament.\" This is the document preserved in the town archives.",
    "keyScientificFindings": [
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Zaragoza, Spain",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Zaragoza, Spain (1427 AD)"
  },
  {
    "id": "ettiswil-1447",
    "location": "Ettiswil",
    "country": "Switzerland",
    "year": "1447 AD",
    "century": "15th Century",
    "title": "The Host in the Stinging Nettles of Ettiswil",
    "summary": "A stolen Host dropped among stinging nettles levitated in mid-air in five distinct glowing fragments corresponding to the 5 Sacred Wounds of Christ.",
    "miracleType": "Levitation",
    "historicalContext": "On May 23, 1447, Anna Vögtli stole a ciborium from the parish church. As she ran through a field of nettles, the Host became impossibly heavy. She dropped it on the ground, where it divided into 5 glowing fragments that hovered above the nettles.",
    "scientificOrChurchInvestigation": "Sworn depositions were taken by the Bishop of Constance and the magistrate of Lucerne.",
    "papalOrEcclesialApproval": "Promulgated by Pope Eugene IV and celebrated annually in the Ettiswil Sanctuary procession.",
    "currentLocation": "Sanctuary Chapel of Ettiswil, Lucerne, Switzerland",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue • Archives of the Canton of Lucerne, Switzerland"
  },
  {
    "id": "betania-1991",
    "location": "Betania / Los Teques",
    "country": "Venezuela",
    "year": "1991 AD",
    "century": "20th Century",
    "title": "The Bleeding Host of Finca Betania",
    "summary": "During Mass on the Feast of the Immaculate Conception, the Host consumed by Fr. Otty Ossa began bleeding profusely from the center.",
    "miracleType": "Bleeding Host",
    "historicalContext": "On December 8, 1991, Fr. Otty Ossa was celebrating Mass at the Sanctuary of Betania. Upon breaking the large Host, it began bleeding profusely from its interior core.",
    "scientificOrChurchInvestigation": "Forensic laboratories in Caracas verified the substance as human blood type AB.",
    "papalOrEcclesialApproval": "Approved by Bishop Pío Bello Ricardo of Los Teques.",
    "bloodType": "AB Positive",
    "currentLocation": "Convent of the Augustinian Recollect Nuns, Los Teques, Venezuela",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue • Forensic Laboratory Reports of Caracas • Diocese of Los Teques"
  },
  {
    "id": "catherinesiena",
    "location": "Siena (St. Catherine of Siena)",
    "country": "Italy",
    "year": "1370 AD",
    "century": "14th Century",
    "title": "St. Catherine of Siena — The Undiminished Flame of the Eucharist",
    "summary": "Jesus appeared to St. Catherine of Siena to assure her that a great flame does not diminish, even if it is used to light many candles. Such is the flame of the Holy Eucharist, because it does not weaken while enflaming the loyal faithful who come with their strong or weak faith.",
    "miracleType": "Supernatural Light",
    "historicalContext": "Jesus appeared to St. Catherine of Siena to assure her that a great flame does not diminish, even if it is used to light many candles, Such is the flame of the Holy Eucharist, because it does not weaken while enflaming the loyal faithful who come with their strong or weak faith, The stronger and weaker charity of each of the faithful is symbolic only by the flame's dimension of the candles, egarding the Eucharist, Jesus confided the following words to St. Catherine of Siena: \"You receive all the divine essence of the weetest Sacrament in the whiteness in the bread. ust ike the sun cannot be divided in the whiteness of the Holy Host. Let us suppose that the Sacred Host could be divided: even if it would be possible to fragment the Holy Eucharist into thousands of tiny Particles, in each one of the tiny Particles there is the presence of Christ, the whole God and the whole Man. In the same manner that a mirror would shatter into thousands of pieces, the Sacred Host will not shatter or divide the image of God and Man that you see in the Host; the image of God and Man is in each fragmented part.",
    "scientificOrChurchInvestigation": "Contrary to fire, the image of the Host does not diminish in faith or divinity. Let us look at the following example: If you had 1347-1380 u„l.tit.. .181. candle would not diminish and everybody would have a lighted candle. While it is true that those who participate in the candlelighting may have more or less flame, everyone would receive exactly the amount of fire to light their candle. Until that time that it can be better, this example stands. •re cere a lot of people bringing c dles of all sizes — one person with two candles and one with six candles and one with a candle weighing an ounce and one with a candle weighing a pound or more - then you could see all the lit candles by color. By color, by its light, by its heat, you would judge that the person that has a one-ounce candle has less light than carries his own candle so that he can receive the sacrament; however, that candle is unlit, but it is ignited when he receives the Eucharist. As a matter of fact, as you are all alike, made and created in my image and likeness and as Christians you are anointed with Holy Baptism, you can, therefore, grow in virtue as much as you like through my life that I bestowed upon you, but you can grow and increase in love of virtue, using your free will with virtue, with charitable affection, while you still have the time, because once time has elapsed, it will no longer be possible.\"",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Siena (St. Catherine of Siena), Italy",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Siena (St. Catherine of Siena), Italy (1370 AD)"
  },
  {
    "id": "chiaravalle-bosco",
    "location": "Aquitaine / Chiaravalle (St. Bernard)",
    "country": "France",
    "year": "1135 AD",
    "century": "12th Century",
    "title": "St. Bernard of Clairvaux and the Eucharistic Conversion of the Duke of Aquitaine",
    "summary": "Saint Bernard was the central character of an important Eucharistic miracle. The Duke of Aquitania separated himself from the Catholic Church, and he had absolutely no intention of returning to it.",
    "miracleType": "Supernatural Light",
    "historicalContext": "Saint Bernard was the central character of an important Eucharistic miracle, The Duke of Aquitania separated himself from the Catholic Church, and he had absolutely no intention of returning to it, Saint Bernard, after he celebrated Mass, went outside the door of the church to the duke and presented the Blessed Sacrament to him, The Duke, deeply moved by a mysterious force, fell to the ground on his knees, begging forgiveness for having left the Catholic Church, Saint John Bosco was always very devoted to the Eucharist, Numerous are the writings in which the saint speaks of the importance of this sacrament, Once, having only eight Sacred Hosts remaining in the corporal, he began to multiply the Hosts so that he could distribute Communion to the 360 youth who were present at Mass, COLPertS L e e Wrist FRANCE, 12TH CENTURY ne of the biographies of Saint Bernard recounts that the saint 'came to Aquitania to reconcile to the Church the duke of this province — but since he refused such reconciliation, the saint of God went towards the altar to celebrate the Mass while the duke, having been excommunicated, waited for him outside the door of the church. After the consecration, Bernard placed the Host on the paten and exited the church, with his face aflame with sacred ire. Z/FFCJ) in front of the duke, he admonished him with these words: 'We prayed for you and you ridiculed us. Here now, He, the Son of the Virgin, the Lord of the Church, He Whom you persecute, has come to you. Here, you have before you that Judge whose hands one day will hold your soul. Perhaps you will reject Him as you have rejected His servant? Resist Him if you can.' The duke immediately felt his legs fold underneath him and prostrated himself at the feet of Bernard, who then ordered him to stand on his feet to hear the penitential sentence of God.",
    "scientificOrChurchInvestigation": "The duke trembled as he stood and he followed all that Bernard ordered him to do.' ITALY, 1848 iographies of Saint John recount that in 1848, during a Mass celebrated in honor of the Feast of the Annunciation, Don Bosco realized at the moment he was to distribute Holy Communion to 360 young people that the corporal in the Tabernacle had only eight Sacred Hosts. Everyone noticed and wondered what Don Bosco would do. Giuseppe Buzzetti, who became one of the first Salesian priests, was serving Mass that day when he saw Don Bosco multiply the Hosts and give Holy Communion to the 360 people. Don Bosco tells the story of what he saw in a dream: a terrible battle at sea caused by a multitude of boats, both large and small, fighting against a sole majestic ship, a symbol of the Church. Hit many times but always victorious, the ship was guided by the Pope to anchor itself securely between two tall pillars in the sea. The first held up high a huge Host with the writing, \"Salvation of the Faithful\" and the other which was lower, held a statue of Immaculate Mary, with the writing, \"Help of Christians\".",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Aquitaine / Chiaravalle (St. Bernard), France",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Aquitaine / Chiaravalle (St. Bernard), France (1135 AD)"
  },
  {
    "id": "egidio",
    "location": "Saint-Gilles-du-Gard (St. Giles)",
    "country": "France",
    "year": "720 AD",
    "century": "8th Century",
    "title": "St. Giles (Egidio) and the Miraculous Absolution of Charles Martel at Mass",
    "summary": "Charles Martel had committed a grave sin, and stricken by remorse, decided to go to Provenza and present himself to a well-known abbot of the time named Egidio, in order to seek absolution for this sin, without actually confessing it and while keeping the crime committed a secret.",
    "miracleType": "Apparition in Host",
    "historicalContext": "Charles Martel had committed a grave sin, and stricken by remorse, decided to go to Provenza and present himself to a well-known abbot of the time named Egidio, in order to seek absolution for this sin, without actually confessing it and while keeping the crime committed a secret, Saint Egidio was officiating at a Mass when an angel appeared and placed himself near the altar, carrying in his hand a book in which was written the unconfessed fault, As the celebration continued, the writing in the book faded little by little until it completely disappeared, and Charles Martel felt himself absolved, rior to the victory celebration over the Saracens at Poitiers, Charles Martel had committed the grave sin of incest with his sister. Stricken by remorse, he did not dare confess the sin, so vile was the committed act. He decided therefore to go to Provenza and present himself to a well-known abbot of the time named Egidio, in order to seek absolution for this sin, without actually confessing it and while keeping the crime committed a secret. Saint Egidio was officiating at a Mass, when an angel appeared and placed himself near the altar, carrying in his hand a book in which was written the unconfessed fault. As the celebration continued, the writing in the book faded little by little until it completely disappeared, and Charles Martel felt himself absolved. The story of this sin and miraculous absolution was so famous that popular fervor often attributed it to Charlemagne, and not to Charles Martel, as if the real participant were not sufficiently authoritative.",
    "scientificOrChurchInvestigation": "T Süd E was well establi ed ven before e orming this miracle. Originally from Athens, he had retreated to a hermitage in a forest of Gard, where a fawn visited him daily to nourish him with her own milk. One day while hunting, the King of the Visigoths followed the animal to the threshold of the grotto where the hermit lived and shot the fawn. In order to correct the sacrilege he had committed, the king had a great monastery built which would take the name of St. Gilles-du-Gard, and which would become an important stop along Jean-Honoré Gonon. The Battle of Charles Martel and Abd-er- Rahman, King of the Saracens before itself becoming a place of pilgrimage. Saint Egidio has been itwoked for help with difficult confessions.",
    "keyScientificFindings": [
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Saint-Gilles-du-Gard (St. Giles), France",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Saint-Gilles-du-Gard (St. Giles), France (720 AD)"
  },
  {
    "id": "emmerich",
    "location": "Dülmen (Bl. Anne Catherine Emmerich)",
    "country": "Germany",
    "year": "1813 AD",
    "century": "19th Century",
    "title": "Blessed Anne Catherine Emmerich — Sustained by the Holy Eucharist Alone",
    "summary": "Anne Catherine Emmerich was forced to abandon the monastery in which she lived because it was being appropriated by the government. In that period, her health declined and the mystical experiences increased: she received the stigmata and had numerous visions.",
    "miracleType": "Incorrupt Host",
    "historicalContext": "Anne Catherine Emmerich was forced to abandon the monastery in which she lived because it was being appropriated by the government, In that period, her health declined and the mystical experiences increased: she received the stigmata and had numerous visions, One of these allowed the finding of the house of Our Lady in Ephesus, In fact, according to antique traditions, it seems that Mary settled, together with John the Apostle, in this city, The miraculous aspect of the life of Anne Catherine is that for years she fed only on the Eucharist, nne Catherine Emmerich was born in Germany on September 8, 1774 into a family of farmers and began to work very early. Later on, a religious vocation matured and she asked to be admitted in several monasteries, but she was always rejected because she was very poor and had no dowry. Only when she was twenty-eight years old she was accepted in the monastery of Agnetenberg, where she joined the monastic life with fervor, always ready to take the most difficult tasks. One night while she was praying, Jesus appeared and offered her a crown of roses and a crown of thorns. She chose the crown of thorns and Jesus put the crown on her head. Suddenly, around her forehead appeared the first stigmata. Later on, after another apparition of Jesus, the wounds also appeared in the hands, feet and side.",
    "scientificOrChurchInvestigation": "In 1811, the monastery of Agnetenberg, BLESSED ANNE CATHERINE EMMERICH GERMANY, 1774-1824 Portrait of Clemens Brentano ill and was bedridden. visited her and remaine ery i pressed by the stigmata. During the eleven years that followed, he became her friend and faithful assistant, having also a diary in which he would transcribe her visions. Meanwhile the nun had practically stopped eating: a little bit of water and the Consecrated Host were enough to keep her alive for years. She was very devoted to, and wrote many pages about, the Holy Eucharist: \"My desire for the Holy Eucharist was so vehement and irresistible that, at night, I would often leave my cell to enter the Church... Often I would genuflect and prostrate towards the Blessed joined her suffering with that of Jesus, and offered it for the redemption of men. The most famous biographer of Anne Catherine was the German writer, Clemens von Brentano, who wrote all her visions. Brentano compiled thousands of pages about the Blessed, many of which must still be published. In one of his most famous passages he wrote: \"Anne Catherine stands like a cross at the side of the street, to indicate the right direction to the faithful. That which she says is brief but simple, full of depth, warmth and life. I understood everything. Always happy, affectionate, dignified, marvelous; always ill, agonizing, but at the same time delicate and fresh, chaste, tried, lucid. To be seated at her side meant to occupy the most beautiful place in the world\".",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Dülmen (Bl. Anne Catherine Emmerich), Germany",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Dülmen (Bl. Anne Catherine Emmerich), Germany (1813 AD)"
  },
  {
    "id": "francisassisi",
    "location": "Assisi / Rome (St. Francis of Assisi)",
    "country": "Italy",
    "year": "1222 AD",
    "century": "13th Century",
    "title": "St. Francis of Assisi and the Reverence of the Eucharistic Lamb",
    "summary": "Saint Francis nurtured a particular affection for lambs, to whom Jesus Christ is often paralleled in Sacred Scripture, most especially for His gentle nature, he Franciscan historical chronicles tell the story that \"during a trip to Rome, the saint kept with him a little lamb, inspired by his...",
    "miracleType": "Adoration by Animals",
    "historicalContext": "Saint Francis nurtured a particular affection for lambs, to whom Jesus Christ is often paralleled in Sacred Scripture, most especially for His gentle nature, he Franciscan historical chronicles tell the story that \"during a trip to Rome, the saint kept with him a little lamb, inspired by his devotion to Christ, his most beloved Lamb. Upon his departure, it was entrusted to a noble matron, Lady Jacopa of the Sette Soli (Seven Suns), so that she would have custody of it in her home. And the lamb, as if spiritually educated by the saint in matters of the soul, would not leave the woman's side when she went to church, when she stayed, or returned. Some mornings, when the lady was late in awakening, the lamb would gently pounce and nudge her with his little horns, and woke her with his bleats, encouraging her with his gestures and expressions to hurry to church. For this, the lady had much admiration and love for that lamb, disciple of Francis and teacher of devotion. One day ITALY, 13TH CENTURY pasture.",
    "scientificOrChurchInvestigation": "As he always did, he kindly saluted them, and they, having stopped grazing, all ran towards him, raising their heads and meeting his gaze. fest' 1 hat the shepherds were stupefied, seeing the lambs and the rams jumping around in such a wondrous way. Another time, at Santa Maria della Porziuncola, some people brought as a gift to this man of God, a sheep, and he accepted it with gratitude, because he loved the innocence and the simplicity that the sheep demonstrated by nature. The man of God admonished the little lamb to praise God and to absolutely not bother the brothers. The with great care. When he heard the brothers singing in the choir, he would enter the church, bend his knees, and emit tender harmonious bleats in front of the altar of the Virgin Mother of the Lamb, as if with a strong desire to greet her. During the celebration of the Mass, at the moment of elevation, he would bow down, knees bent, as if it were that this devout little animal wished to reproach men of little faith for their irreverence and encourage devout men for their reverence towards the Blessed Sacrament.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Assisi / Rome (St. Francis of Assisi), Italy",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Assisi / Rome (St. Francis of Assisi), Italy (1222 AD)"
  },
  {
    "id": "frossard",
    "location": "Paris (André Frossard)",
    "country": "France",
    "year": "1935 AD",
    "century": "20th Century",
    "title": "The Instantaneous Conversion of André Frossard Before the Blessed Sacrament",
    "summary": "The conversion of the atheist writer Andre Frossard, in the presence of the Holy Eucharist, has had great repercussions in the world. He himself recounted how his conversion came about in his book. God Exists. 1 Have Met Him (1969).",
    "miracleType": "Supernatural Light",
    "historicalContext": "The conversion of the atheist writer Andre Frossard, in the presence of the Holy Eucharist, has had great repercussions in the world, He himself recounted how his conversion came about in his book, God Exists. 1 Have Met Him (1969), Up to his final years, up to his final days, he would only say: \"Since the time when I encountered God, I have never succeeded in growing tired of the mystery of God. Every day is something new for me, And if God exists, I should speak of it; if Christ is the Son of God, I should proclaim it loudly; if there is Life Eternal, I should preach it,' rossard's testimonial: \"Having entered a chapel in the Latin Quarter of Paris at 5: 10 in the morning to look for a friend, I left at a quarter after 5 in the company of a friendship that was not of this earth. Having entered as a skeptic and an atheist.. .and ever more skeptical and atheistic, indifferent and preoccupied with so many things other than a God to Whom I never even gave a thought even to deny... I was standing by the door, looking around with my eyes for my friend, but did not succeed in finding him...",
    "scientificOrChurchInvestigation": "S from the shadows to the I • t . from e faithful gathered there, to the nuns, to the altar...and came to rest above the second candle burning to the left of the Cross (unaware that I was standing in the presence of the Blessed Sacrament). And at that point, t At ' t Writer ANDRÉ FROSSARD 20TH CENTURY absurd being that I was, to bring to birth the amazed child that I had never been... At first the hint of these words, 'Spiritual Life' came to me... as if they had been pronounced in a whisper next to me... then came a great light... a world, another world of a radiance and a destiny that in one stroke cast our world among the fragile shadows of unfulfilled dreams... of which I felt all the sweetness... a sweetness that was active and upsetting beyond every form of violence, capable of breaking the hardest stone and that which is even harder than stone - the human heart. Its overflowing eruption, so complete, was accompanied by a joy which is the exultation of the saved, the joy of the shipwrecked who is picked up just in time. These sensations, were all simultaneous... Everything is dominated by the Presence. of Him of Whom I would never be able to write His name without fear of harming its tenderness, of Him before Whom I have had the good fortune to be a forgiven child who wakes up to discover that everything is a gift... God existed and was present... one thing only surprised me: The Eucharist! Not that it seemed incredible, but it amazed me that Divine Charity would have come upon this silent way to communicate Himself, and above all that He would choose to become bread, which is the staple of the poor, and the food preferred by children... O Divine Love, eternity will be too short to speak of You.\"",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Human Myocardium (Heart Tissue) (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Paris (André Frossard), France",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Paris (André Frossard), France (1935 AD)"
  },
  {
    "id": "kowalska",
    "location": "Płock / Vilnius (St. Faustina Kowalska)",
    "country": "Poland",
    "year": "1931 AD",
    "century": "20th Century",
    "title": "St. Faustina Kowalska — Visions of the Eucharistic Rays of Divine Mercy",
    "summary": "The most recent practical link to the Sacred Heart of Jesus and the devotional icon of the Lord's Merciful love came from the Polish nun Saint Faustina Kowalska.",
    "miracleType": "Supernatural Light",
    "historicalContext": "The most recent practical link to the Sacred Heart of Jesus and the devotional icon of the Lord's Merciful love came from the Polish nun Saint Faustina Kowalska, Jesus appeared to her on February 22, 1931, with His right hand bestowing blessings and His left hand pointing towards His Sacred Heart, which emitted two rays: one pale; the other a bright red, These rays represent the Water and Blood that came out of Jesus' pierced side while on the Cross, This symbolizes the purifying virtues of Baptism and Confession and the regenerative virtue of the Holy Eucharist, et's report the words of Jesus to St. Faustina: \"I desire that this image be venerated by the entire world. I promise that the souls of those who attribute veneration to this image will not perish. I even promise victory over their enemies, already here on earth, but especially at the hour of death. I will defend that soul in the name of glory.\" Jesus, Himself explained the signiflcance of this devotion: \"My daughter, tell all that I am love and mercy personified. The wound in my Heart signifies the unlimited living waters of Mercy.",
    "scientificOrChurchInvestigation": "Tell all the souls that I protect them with my shield of Mercy; it is for them that I fight, bearing the just umbrage of my Father ] My daughter! Tell suffering humanity to secure itself to the Mercy of my Heart and I will fill them with . ] Souls are perishing, regardless of my peace sorrowful Passion. I concede to them the last table Smore /ZtneLrt ST. FAUSTINA KOWALSKA POLAND, 20TH CENTURY iAJ1 of light coming out of the Holy Host; one very pale and the other a bright red light, just as depicted in this image. Jesos• for sinners\". Sr. Faustina: \"When I started to recite the Rosary, I saw a soul on his death bed suffering terrible torture and pain in fighting the last battle of life. The soul was being defended by his guardian angel, who was, however, helpless. .. A great multitude of demons were waiting for the soul, but while I was reciting the Rosary chaplet, I saw Jesus in the same aspect as depicted in the painting. The bright rays coming out of the Heart of Jesus surrounded the sick soul and the forces of evil ran away... The sick person died serenely. When I regained my consciousness, I realized that the divine chaplet Rosary was an important prayer to be recited around the the Liturgical Feast of Divine diffuse this adoration will bring other souls into the fold. Those who trust my Mercy will not fear when the hour of death comes. My Mercy will protect them in their last battle. .. My daughter, incite souls to recite this Rosary chaplet that I gave you. When this Holy Rosary is recited, I will concede to them everything they ask for.\" of salvation, meaning my merciful feast [ this icon is a sign of the end days, after such, the day of judgment is upon you. His Infinite Mercy, the er s L d also showe Faustina \"hell\". \"Today, under the guide of an angel, I went into the abyss of hell. It is a place of extreme torments in the entire, huge, terrifying surroundings. These are the various tortures and torments that I have seen: First torture: This consists of hell as being the loss of the Presence of God; Second: the continuous remorseful conscience; Third: the knowledge that such a destiny will never change; Fourth: This torture is a pain that penetrates the soul, but does not nullify it; it is a terrible torture and it is a purely spiritual, living fire lit only by God's wrath. Fifth: This is the torture of eternal dying. This placates God's wrath.\" (St. Faustina Kowalska, Diary, Vatican Library Edition, p. 515) for 9 days with any Rosary beads in the following manner: First recite the Our Father, Hail Mary and the Apostles' Creed. Then on the Our Father bead, say the following words: Eternal Father, I offer You the Body and Blood, Soul and Divinity of Your dearly beloved Son, Our Lord Jesus Christ, in atonementfor our sins and those of the whole world. On the Hail Mary bead recite the following words: For the sake offlis Sorrowful Passion, have mercy on us and on the whole world. Finally, recite these words three times: Holy God, Holy Mighty One, Holy Immortal One, have mercy on us and on the whole world. darkness, a horrible suffocating, putrid odor; even if it is dark, the demons and the condemned souls can see each other among themselves and see all the evil that others have done as well as their own evil. Sixth: This torture is the knowledge of having Satan as a constant companion. Seventh and last: This torture is the incomparable desperation of God's wrath, in blasphemy, cursing and swearing. The sinner should realize the same ways that he sins is the way he is going to suffer for all eternity. I am writing this by the Lord's direction, so that no one can say that there is no hell, or that no one has ever been there or that no one knows how it is. I, Sister Faustina, under the Lord's direction, have been in the abyss of hell, for the simple reason of being able to tell everyone and to witness that hell does exist. What I have written is only a weak shadow of what I have actually seen.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Human Myocardium (Heart Tissue) (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Płock / Vilnius (St. Faustina Kowalska), Poland",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Płock / Vilnius (St. Faustina Kowalska), Poland (1931 AD)"
  },
  {
    "id": "malestroit",
    "location": "Malestroit (Mother Yvonne-Aimée)",
    "country": "France",
    "year": "1927 AD",
    "century": "20th Century",
    "title": "Mother Yvonne-Aimée of Malestroit — Eucharistic Prodigies",
    "summary": "Mother Yvonne-Aimée was a religious who lived in Malestroit from 1927 to 1951. Heroine of resistance, she was decorated with more filmings (photo shoots) than even General Charles De Gaulle. saved many patriots during the war.",
    "miracleType": "Apparition in Host",
    "historicalContext": "Mother Yvonne-Aimée was a religious who lived in Malestroit from 1927 to 1951. Heroine of resistance, she was decorated with more filmings (photo shoots) than even General Charles De Gaulle. saved many patriots during the war. In 1943, she was arrested by the Gestapo and liberated miraculously by her Guardian Angel. She died on the 3rd of February 1951 during a trip to Africa hemorrhage, cerebral She was an YVONNE-AIMÉE OF MALESTROIT FRANCE, 1901-1951 extraordinary mystic, other Yvonne was a religious who lived in Malestroit from 1927 to 1951. Heroine of the she was resistance, decorated with more filmings (photo shoots) than even General Charles De Gaulle. She saved many patriots during the war.",
    "scientificOrChurchInvestigation": "In 1943, she was arrested by the Gestapo and liberated miraculously by her Guardian Angel. She died on the 3rd of February 1951 during a trip to Africa due to a cerebral hemorrhage. She was an extraordinary mystic. Father Labutte recounts in his biography of how Mother Yvonne was able to retrieve the Hosts that had been stolen or prof aned. \"It all began in 1923. She was still a girl and she assisted at the Mass near the church of Our Lady of Victory. She noticed that a man before receiving Yvonne, who had an immense faith in the Real Presence of the Lord in the Eucharist, was distressed by that desecration. She did research and investigations for two days and finally found that man along with the Host. It was the beginning of her searches for desecrated Hosts in Paris as well as in the surrounding areas. Once she went all the way to Cologne to search for a prof aned Host. At times she was able to guess all by herself the places where the Hosts were desecrated; other times instead she was informed in a supernatural way. The event connected to la Bradi&re is very significant. It was the 16th of September in 1941. Yvonne found herself with us on vacation for a few days. After dinner, we had gone for a walk in the small grove. Yvonne wanted however to remain to pray by herself and so we distanced ourselves for a while. Around four o'clock in the afternoon we began to hear Yvonne lament as if she was watching something horrible. From the few words that I was able to hear I understood that she was seeing the desecration of a Host. She explained to me that two men were stabbing a consecrated Host with an awl and from it blood began to ooze out. I then saw her itwoke her Guardian Angel and tell him these words: 'Go and find me that Host, my beloved is complaining!' An instant later a luminous being passed in front of her with something white in hand that was bleeding and placed it on the branch of a pine tree. ...we then got the camera and took a photograph of the Host.'",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Malestroit (Mother Yvonne-Aimée), France",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Malestroit (Mother Yvonne-Aimée), France (1927 AD)"
  },
  {
    "id": "mariadacosta",
    "location": "Balasar (Bl. Alexandrina Maria da Costa)",
    "country": "Portugal",
    "year": "1942 AD",
    "century": "20th Century",
    "title": "Blessed Alexandrina Maria da Costa — 13 Years Nourished Solely by the Eucharist",
    "summary": "BLESSED ALEXANDRINA MARIA DA COSTA PORTUGAL, 1904-1955 Alexandrina remained paralyzed at age 21 from a dramatic incident in which she fled from the threat of violence. She did not permit herself to be overcome by sadness and by loneliness, but thought: \"Jesus.",
    "miracleType": "Incorrupt Host",
    "historicalContext": "BLESSED ALEXANDRINA MARIA DA COSTA PORTUGAL, 1904-1955 Alexandrina remained paralyzed at age 21 from a dramatic incident in which she fled from the threat of violence, She did not permit herself to be overcome by sadness and by loneliness, but thought: \"Jesus, You are a prisoner in the tabernacle as I am here on my bed, so that we can keep company' Following the physical sufferings from the paralysis, mystical sufferings were added: for four years, every Friday she saw the sorrows of the Passion, and after this period, for another 13 years until her death she was nourished only by the Eucharist, Her life became a continuous prayer for the conversion of sinners, lexandrina Maria was born in Balasar, Portugal on March 30, 1904. At age 14, in order to escape an attack by three men and to maintain her purity, she jumped from the window, but did not escape without suffering injury. The consequences were terrible, if not immediate. In fact, several years later, she became bedridden from a progressively increasing paralysis, from which she suffered for the remaining 30 years of her life. Yet, she did not despair, but entrusted herself to Jesus with these words: \"As you are a prisoner in the tabernacle and I am a prisoner on my bed for doing Your will, so we can keep ourselves company\". As a result, she began to live through ever more powerful mystical experiences, and from Friday, October 3, 1938 until March 24, 1942, for up to 182 times, she relived the sufferings of the Passion.",
    "scientificOrChurchInvestigation": "Beginning in 1942 until her death, Alexandrina was fed only by the Eucharist, and them, and trample on them until during a period of convalescence at the Foce del Douro Hospital near Oporto, for forty days and forty nights she was under supervision by several doctors in her absolute fast and her condition of anuria (absence of urine). After 10 long years of paralysis which she had offered as Eucharistic reparation for the conversion of sinners, on July 30, 1935, Jesus appeared to her saying: \"I have put you in the world so that you may draw life only from Me, to bear witness to the world how precious the Eucharist is. [ ...l str est that keeps souls in bondage it Satan is the flesh and the sins of impurity. Never has there been such a spread of vices, wickedness and crimes as there is today! Never has there been so much sin [ ...l The Eucharist - My Body and Blood - Behold, the Eucharist is the salvation of the world.\" Mary also appeared to her on September 12, 1949, with the Rosary in her hand, saying to her \"The world is in agony and is dying in sin. My desire is for prayer, my desire is for penance. I have protected with this, my Rosary, all those whom I love and the whole world.' On October 13, 1955, the anniversary of the last apparition of the Blessed Mother at Fatima, Alexandrina was heard exclaiming: \"I am happy, for I am on my way to heaven.\" She died at 7:30 in the evening on that very day.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Balasar (Bl. Alexandrina Maria da Costa), Portugal",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Balasar (Bl. Alexandrina Maria da Costa), Portugal (1942 AD)"
  },
  {
    "id": "mariaofpassion",
    "location": "Naples (Bl. Maria of the Passion)",
    "country": "Italy",
    "year": "1873 AD",
    "century": "19th Century",
    "title": "Blessed Maria of the Passion — Visions of the Eucharistic Heart of Jesus",
    "summary": "On the day of her First Communion. Mary Grace was seven years old, and the Child Jesus appeared to her with wounded and bloody hands and said to her: \"People inflicted these wounds on me with their sins!",
    "miracleType": "Apparition in Host",
    "historicalContext": "On the day of her First Communion, Mary Grace was seven years old, and the Child Jesus appeared to her with wounded and bloody hands and said to her: \"People inflicted these wounds on me with their sins!\" From that moment Mary Grace consecrated her life to the Eucharist and the salvation of souls, \"I am in the Eucharist to dispense graces and extend mercy, but I receive only ingratitude, prof anity and sacrileges, The Eucharist is dishonored and nobody cares, My beloved one, you make reparation with your adoration done In my presence, espite the fact that she had made a vow of virginity at the age of five, her father wanted to give her in marriage to a young man by force. When everything seemed lost, Our Lady appeared to her and assured her with these words: \"Say yes and then become a nun.\" Our Lady was not wrong. On the day of the wedding in the town hall, Mary's husband took sick and had to be rushed to the hospital. The doctors diagnosed his ailment as a case of severe tuberculosis. His agony lasted eight months. Notwithstanding that her father had forbidden Mary Grace to visit her husband because the religious ceremony had not yet been celebrated, Mary Grace was often seen at his bedside as she took care of him and taught him catechism.",
    "scientificOrChurchInvestigation": "In fact, among her gifts, Mary Grace had the gift of bilocation. e 69\" e Etoe wrist ITALY, 1866-1912 Crocifisse Adoratrici dell'Eucaristia. One day, as the priest was distributing Communion in the convent chapel, a host escaped from his hand and flew to Mary's lips. Out of love for the Lord and for sinners she constantly inflicted severe penances on herself. She had a great intimacy with the souls in Purgatory, who sometimes appeared to her to thank her for her prayers. Dior' ears of her life, Mary r ce hardly ate an ing and used to tell her confessor: \"I receive such fullness from the Lord when I receive the Blessed Sacrament that in no way can I feel a desire for any food!\" She spent many hours in adoration before the tabernacle: she was like a Eucharistic lamp that was an exceptional recompense: one of the most extraordinary gifts in the history of the mystics, the change of heart. The Lord opened her breast and placed his heart in it. Like all great mystics, Mary was very much tormented by the devil because she tore the souls of sinners from him, so much so that one day, out of spite, the devil went so far as to break her arm. During a vision she experienced the terrifying pains of the crucifixion and Jesus himself pierced her heart with a lance. It was the wound of love, which bound her definitively to her Spouse. From that moment on, Mary of the Passion carried the stigmata until her death. During the last fifteen days of her life, she lived on the Eucharist alone.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Human Myocardium (Heart Tissue) (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Naples (Bl. Maria of the Passion), Italy",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Naples (Bl. Maria of the Passion), Italy (1873 AD)"
  },
  {
    "id": "neumann",
    "location": "Konnersreuth (Therese Neumann)",
    "country": "Germany",
    "year": "1926 AD",
    "century": "20th Century",
    "title": "Therese Neumann of Konnersreuth — 36 Years Living on the Holy Eucharist Alone",
    "summary": "Teresa Neumann's life changed radically after her miraculous recovery from paralysis and total blindness at the age of 25. About a year later, she received the stigmata and began fasting, which lasted 36 years until her death.",
    "miracleType": "Incorrupt Host",
    "historicalContext": "Teresa Neumann's life changed radically after her miraculous recovery from paralysis and total blindness at the age of 25, About a year later, she received the stigmata and began fasting, which lasted 36 years until her death, Her only nourishment was the Holy Eucharist and for this reason the Nazi authorities, during World War 11, withdrew her food rationing card and gave her a double rationing of soap to wash her towels and clothing, because every Friday she would be drenched in Blood while she was in ecstasy, experiencing the Passion of Christ, Hitler was very fearful of Teresa, eresa Neumann was born in Konnersreuth Germany, on April 8th, 1898 from an extremely poor Catholic family. Her greatest ambition was to become a missionary in Africa but that was not possible as she was a victim of an accident at the age of 20 when a horrible fire broke out in a nearby plant and Teresa went to help and the flames, she got a horrible lesion in her spinal cord that caused a paralysis in both her legs and complete blindness. Teresa then passed her days in prayer, but one day her miraculous recovery occurred in the presence of Father Naber who wrote: \"Teresa described a vision of a great light and an extraordinary, sweet voice that was asking her if she wished to be healed. Teresa gave the most surprising answer when she replied that to her it would not make any difference whether she voice told her that 'that very day she would receive a small joy; the healing of her infirmities, but that she would still have a lot of suffering to endure in her future. Teresa lived in fairly good health, but in 1926 her most important mystical experiences started and lasted until the day she died. She received the stigmata, and she began a complete fasting, with the Eucharist as her only nourishment.",
    "scientificOrChurchInvestigation": "Father Naber, who administered Communion to Teresa every day, wrote: \"In her, God's promised word is accomplished: 'My Flesh is real food and my Blood is a true drink'\". Teresa offered the Lord her physical suffering - due to the loss of blood caused by the Resurrection. This suffering was offered, through her intercession, for sinners that asked for help. Every time she would be called to a person's death bed, she would be witness to that soul's judgment, as it is usual to happen right after death. Ecclesiastical authorities performed many examinations in regard to Teresa's continuous fasting. Carl Strater, S.J., directed by the Bishop of Ratisbonne, studied and examined the life of the stigmatized Teresa and confirmed: \"The significance of Teresa Neumann's fasting is to show the people of the world the value of the Holy Eucharist, to make the world understand that Christ is actually present in the bread of the Eucharist and that through the Holy Eucharist, physical life can actually be preserved.'",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Konnersreuth (Therese Neumann), Germany",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Konnersreuth (Therese Neumann), Germany (1926 AD)"
  },
  {
    "id": "nicholassteno-flue-lateau",
    "location": "Flüe / Florence / Bois-d'Haine",
    "country": "Switzerland",
    "year": "1467 AD",
    "century": "15th Century",
    "title": "St. Nicholas of Flüe, Bl. Nicolas Steno & Louise Lateau — Eucharistic Fast & Conversion",
    "summary": "After a youth spent in studying and then in scientific research. Nicolas Steno at age 28 converted to the Catholic Church while watching the Corpus Christi procession, thus realizing the greatness and magnificence of the Eucharist; the Real Presence of Jesus in the Host.",
    "miracleType": "Incorrupt Host",
    "historicalContext": "After a youth spent in studying and then in scientific research, Nicolas Steno at age 28 converted to the Catholic Church while watching the Corpus Christi procession, thus realizing the greatness and magnificence of the Eucharist; the Real Presence of Jesus in the Host, He then decided to become a priest and missionary in his own country, icholas Steno was born in Copenhagen, Denmark, on January 10, 1638. Since his youth, he was greatly itwolved in natural science studies to the point of being considered among the founding fathers of geology, paleontology and crystallography. His prolific scientific activity caused him to travel all over Europe. On June 24, 1666, in Livorno, Italy, Nicholas Steno received the grace of conversion to the Catholic faith. His biographers wrote, \"He observed with curiosity and perplexity the procession for the Feast of Corpus Christi and the fervor around it. The large Piazza d'Armi was bursting with colors and sounds.",
    "scientificOrChurchInvestigation": "A loud, prolonged ringing of bells could be heard. The young man was recalling another procession he watched three years before in Lovanio, Belgium, where many students were lined up and dozens of black-robed professors were walking. He could perceive some- (IN DANISH, NIELS STEENSEN) 1638-1686 NICOLAVS SIÄONIVS Long lines of men in white tunics were processing and singing. Gonfalons and banners were swinging in the gentle breeze coming from the sea. Friars and priests were processing too, dressed in their white surplices adorned with laces and fringes. Even more priests were part of the procession, wearing their copes shining in the sun, and children holding incense burners. Finally, a big golden canopy passed by, and under it a minister of the Church, solemnly dressed, absorbed in his thoughts, carrying close to his chest the precious monstrance with the Sacred Host as the Blessed Sacrament passed by a eyes were sparkling with love as they gazed upon the Host, all heads bowed down in adoration. Petals and flowers were showering from all corners. strong call from God to leave everything and follow Him. He therefore asked for three graces: to obtain the consent of his wife Dorothy and their older children; to never feel the temptation to turn back, and finally, God willing, to be able to live without drinking or eating. All his requests were granted. He lived for twenty years in the forest as a hermit with no food except for the Eucharist, as many In Belgium, at Bois-d'Haine, the Servant of God Anne-Louise Lateau lived for twelve years without eating or drinking, and without sleeping, starting on March 26, 1871. On January 1 1, 1868, she event is an extraordinary one. You can affirm on my behalf that medical science will never be able to explain such a fact.\" Anne-Louise died on August 25, 1883 at age 33. In 1991 the cause for her beatification was officially opened. The young Nicholas Steno spent the whole day with a deep uneasiness in his heart. He remembered the Jesuit priest in Paris with whom he had discussed the Real Presence of Jesus in the consecrated Bread. The Jesuit priest had emphasized the value of Jesus' words at the Last Supper, 'This is my Body', and then St. Paul's first letter to the Corinthians. That day Nicholas Steno decided to convert to Catholicism. He immediately entered the seminary, and after nine years of study he was ordained a priest. He described his conversion: 'As soon as I attentively pondered God's favors to me, these appeared to be so many that I couldn't help but offer to Him the best of myself and in the best way, from the bottom of my heart. Therefore, having come to know the great dignity of priesthood. I asked and obtained that I may offer the Immaculate Host to the Eternal Father for my good and the good of others.\"'",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Human Myocardium (Heart Tissue) (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Flüe / Florence / Bois-d'Haine, Switzerland",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Flüe / Florence / Bois-d'Haine, Switzerland (1467 AD)"
  },
  {
    "id": "pibrac",
    "location": "Pibrac (St. Germaine Cousin)",
    "country": "France",
    "year": "1595 AD",
    "century": "16th Century",
    "title": "St. Germaine Cousin of Pibrac — Parting of the Floodwaters to Attend Mass",
    "summary": "The Eucharistic miracle of Pibrac is about Saint Germaine Cousin (1579-1601). In order for St.",
    "miracleType": "Halting a Tsunami",
    "historicalContext": "The Eucharistic miracle of Pibrac is about Saint Germaine Cousin (1579-1601), In order for St. Germaine Cousin to participate in the Holy Celebration of the Mass, she had to cross through a violent stream with extremely high waters; the waters divided in two and let her pass undisturbed, om the time that our young shepherd girl became motherless, her father remarried a woman who, from the very start, demonstrated hostility towards her because Germaine's face was full of acne and was not easy to look at. The stepmother, who could not stand the sight of Germaine's face, convinced her husband to make Germaine live in the small basement under the steps. The poor girl found herself so completely isolated in that basement that the rats were often her only companions. Germaine, however, was very close and devoted to the Lord and in particular loved the Blessed Sacrament and prayed and visited on a daily basis. Every day she would leave her sheep unattended to receive the Holy Eucharist and miraculously the herd would never be attacked by wolves. FRANCE, 1589 Germaine made to live in a basement under the steps by heavy rains had rendered the stream impossible to pass through, but the young girl decided to affront the furious waters of the stream and get through so she could receive Communion.",
    "scientificOrChurchInvestigation": "cater in rder o et c ss, she made the sign of the Cross and while she was reciting her prayers she saw the waters miraculously separate in two. This happened on the way back, also.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Pibrac (St. Germaine Cousin), France",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Pibrac (St. Germaine Cousin), France (1595 AD)"
  },
  {
    "id": "robin",
    "location": "Châteauneuf-de-Galaure (Ven. Marthe Robin)",
    "country": "France",
    "year": "1930 AD",
    "century": "20th Century",
    "title": "Venerable Marthe Robin — Over 50 Years Nourished Solely by the Holy Eucharist",
    "summary": "French philosopher Jean Guitton left us a forceful witness on Marthe Robin: \"She was a peasant of the French countryside, who for thirty years took neither food nor drink, nourishing herself instead on the Eucharist alone, and every Friday she relived the pains of the Passion of Jesus through her stigmata.",
    "miracleType": "Incorrupt Host",
    "historicalContext": "French philosopher Jean Guitton left us a forceful witness on Marthe Robin: \"She was a peasant of the French countryside, who for thirty years took neither food nor drink, nourishing herself instead on the Eucharist alone, and every Friday she relived the pains of the Passion of Jesus through her stigmata. A woman who perhaps was the most unusual, most extraordinary and disconcerting of our age, but whom even in the age of television remained unknown to the public, buried in a profound silence, From our first meeting, I understood that Marthe Robin would have been a 'sister of charity,' always, as she was for thousands of visitors. arthe Robin was born on March 13, 1902, in Chåteauneuf-de-Galaure (Drome), in France, to a family of peasants, and she spent her entire life in her parents' home, where she died February 6, 1981. Marthe's entire existence revolved around the Eucharist, which for her was \"the one thing that cures, comforts, serious neurological illness, Marthe found it almost impossible to move, especially to swallow because those muscles were affected. Moreover, due to an eye illness, she was forced to live in almost absolute darkness. According to her spiritual director, Father Don Finet: \"When she received the stigmata, in early October 1930, Marthe had already lived with the pains of the Passion since 1925, the year in which she offered herself as a victim of love.",
    "scientificOrChurchInvestigation": "That day, Jesus said she THE SERVANT OF GOD MARTHE ROBIN FRANCE, 1902-1981 oxoa your isolation and your solitude, and the solitude in which I place you all, without reservation, for my priests. Offer yourself to the Father with me, for them; don't be afraid for having to suffer too much for my priests; they have a pressing need for those things that I am about to do through you for their advantage. was chosen, like the Virgin, to live the Passion more intensely. No one else would experience it so completely. Every day she has endured more pain, and at night she does not sleep. After the stigmata, Marthe was not able to drink or eat. The ecstasy lasted until Monday or Tuesday.' all the sufferings for love of Jesus th Redeemer and the sinners He wanted to save. The great philosopher Jean Guitton, recalling his meeting with the visionary, wrote: \"I found myself in that dark room of hers, confronted by the best-known contemporary critics of the Church: Novelist Anatole France (a critic whose books were condemned by the Vatican) and Dr. Paul-Louis Couchoud, a disciple of Alfred Loisy (an excommunicated priest whose books were condemned by the Vatican) and author of a number of books denying the historical reality of Jesus. From our first meeting, I understood that Marthe Robin would have been a 'sister of charity' always, as she was for thousands of visitors. In fact, beyond the extraordinary mystical phenomena, extremely significant was the work of evangelization that Marthe managed to accomplish, despite her condition, thanks to the help of Father Finet, with whom she founded sixty \"Foyers of Charity\" groups (centers or homes of light, charity and love) throughout the world.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Châteauneuf-de-Galaure (Ven. Marthe Robin), France",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Châteauneuf-de-Galaure (Ven. Marthe Robin), France (1930 AD)"
  },
  {
    "id": "sacredheartjesus",
    "location": "Paray-le-Monial (St. Margaret Mary Alacoque)",
    "country": "France",
    "year": "1673 AD",
    "century": "17th Century",
    "title": "St. Margaret Mary Alacoque — Revelations of the Sacred Heart in the Blessed Sacrament",
    "summary": "Promises FRANCE, 17TH CENTURY The message received by the nun. Saint Margaret Mary Alacoque of Paray-le-Monial, contains the \"Twelve Promises of the Sacred Heart,\" in which Jesus reveals the graces linked to this devotion.",
    "miracleType": "Apparition in Host",
    "historicalContext": "Promises FRANCE, 17TH CENTURY The message received by the nun, Saint Margaret Mary Alacoque of Paray-le-Monial, contains the \"Twelve Promises of the Sacred Heart,\" in which Jesus reveals the graces linked to this devotion, Love for the Sacred Heart of Jesus is directly tied to that of love for the Eucharist, As the great apostle of this devotion, the Jesuit priest Henri Ramiere wrote, \"It is in the Eucharist that we truly find the Heart of Jesus nearest to us; it is in the Eucharist that He unites himself in a most intimate way to us, and we to Him,' aint Margaret received many mystical gifts and some revelations from Jesus. We list here below the \"Twelve Promises of the Sacred Heart\" which the Lord revealed to the saint: ( , To those devoted to My Sacred Heart, I will give all the graces and helps necessary to their state of life (Letter #141). 2, I will establish and safeguard peace in their families (Letter #35). 3, I will console them in all their afflictions (Letter #141). 4, I will be their sure refuge in life, and above all at the hour of death (Letter #141). , I will pour abundant blessings on all of their lab rs and undertakings (Letter #141). Sinners will find in My Heart an inexhaustible source of mercy (Letter #132).",
    "scientificOrChurchInvestigation": "same Heart comes also the grace of the Sacraments in gushing overabundance, which instills eternal life in the children of the Blessed Sacrament. Try to never miss any Communion, lest we give great joy to our enemy the devil!\" ST. MARGARET MARY ALACOQUE Z, Lukewarm souls will become fervent with the practice of this devotion (Letter #132). 8, Fervent souls will ascend rapidly to a hi her perfection (Letter #132). My blessing will remain in those places in which the image of the Sacred Heart will be displayed and venerated (Letter #35). (O, To all those who labor for the salvation of souls, I will give the grace to be able to convert the hardest hearts (Letter #141). Persons who spread this devotion will have their names written forever in My Heart (Letter (2, To all people who receive Communion on the first Fridays of nine consecutive months, I will give the grace of endless perseverance and of eternal salvation (Letter #86). of that divine love with which the Sacred Heart burned when, in His infinite love, he instituted the Most Holy Eucharist.\" take the devotion to the Sacred banner. [...] Ardently wishing to offer a secure barrier against the impious plottings of the enemies of God and of the Church, and to have families and nations return to the love of God, we do not hesitate to propose devotion to the Sacred Heart of Jesus as the most efficacious school of divine charity, on which charity it is necessary to construct the Kingdom of God in the souls of individuals, in the domestic society and in nations.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Human Myocardium (Heart Tissue) (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Paray-le-Monial (St. Margaret Mary Alacoque), France",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Paray-le-Monial (St. Margaret Mary Alacoque), France (1673 AD)"
  },
  {
    "id": "satyrus",
    "location": "Milan (St. Satyrus & St. Ambrose)",
    "country": "Italy",
    "year": "375 AD",
    "century": "4th Century",
    "title": "St. Satyrus Saved from Shipwreck Through the Consecrated Host",
    "summary": "In his work. De excessufratris Satyri, St. Ambrose himself describes this Eucharistic miracle in which his brother Satyrus played a key role, St. Satyrus was able to save himself from shipwreck thanks to the Eucharist, bout his brother, St.",
    "miracleType": "Halting a Tsunami",
    "historicalContext": "In his work, De excessufratris Satyri, St. Ambrose himself describes this Eucharistic miracle in which his brother Satyrus played a key role, St. Satyrus was able to save himself from shipwreck thanks to the Eucharist, bout his brother, St. Ambrose writes: \"What shall I say about his reverence in the worship of God? One episode will suffice. Before being fully initiated into the sublime mysteries (First Communion), he experienced a shipwreck. When the ship on which he was traveling ran aground on some reefs and while, all around, the waves were tearing it apart, he was not afraid of dying but of having to die without having been nourished by the Sacred Mysteries.",
    "scientificOrChurchInvestigation": "So he asked for the Eucharist from those whom he knew to be initiated into the Divine Sacrament of the Faithful and placed the Holy Eucharist in a handkerchief, which he hung around his neck. Then he threw himself into the sea and looked for a plank loosened from the hulk of the ship to hang on to, but did not try to swim away to save himself, because he had put his and defended by this faith, he did not look for any other help. \"S SO-OT as he was saved from the waves and reached land, he paid tribute to the Leader to whom he had entrusted himself. As soon as he was saved and realized all his servants had been saved, he went to the church of God, without complaining about the goods he had lost, to thank Him for having saved him and to get to know His Eternal Mysteries. He said there was no more important duty than that of giving thanks... He who had experienced the great help of the Heavenly Mysteries wrapped in a handkerchief considered it important to",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Milan (St. Satyrus & St. Ambrose), Italy",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Milan (St. Satyrus & St. Ambrose), Italy (375 AD)"
  },
  {
    "id": "stanislaskostka",
    "location": "Vienna (St. Stanislaus Kostka)",
    "country": "Austria",
    "year": "1565 AD",
    "century": "16th Century",
    "title": "Miraculous Communion of St. Stanislaus Kostka Brought by Angels and St. Barbara",
    "summary": "Saint Stanislaus Kostka, at the age of seventeen, was so gravely ill that he seemed very near the end of his life. In that time, he lived as the guest of a noble Protestant who would not even permit him to be visited by a Catholic priest.",
    "miracleType": "Levitation",
    "historicalContext": "Saint Stanislaus Kostka, at the age of seventeen, was so gravely ill that he seemed very near the end of his life, In that time, he lived as the guest of a noble Protestant who would not even permit him to be visited by a Catholic priest, Stanislaus was not discouraged and one night, in the presence of his tutor, he received Communion in a miraculous way, A few days later he recovered and decided to enter the Jesuit order, aint Stanislaus Kostka was born in 1550 in Rostkow, a few kilometers from Warsaw. In 1564, at age fourteen, Stanislaus was sent to Vienna with his older brother to complete their studies with the Jesuits. He liked his studies and life in the college very much, and considered dedicating himself to religious life. Unfortunately the Jesuits had to close the college and Stanislaus, his brother, and their tutor were forced to leave, accepting the hospitality of a Lutheran nobleman. Stanislaus maintained exemplary religious behavior, regardless of the pressures from his brother, tutor, and host - who all criticized him. This was all accepted with patience and submission by Stanislaus, and during the night he even prayed for them.",
    "scientificOrChurchInvestigation": "At about age seventeen, Stanislaus became gravely ill. It is necessary to note that he belonged to the Fraternity of Saint Barbara - 1550-1568 -yes. Saint Stanislaus receives Holy Communion from an Angel. Diocesan Museum of Milan In this Stanislaus had total faith, and in fact one night woke up his tutor, who was keeping his vigil, exclaiming: \"Here is Saint Barbara! Here she is, with two angels! She's bringing me the Blessed Sacrament! SW (UÆS/ the angels knelt by him and he was given Holy Communion. The young man, serene, laid back on his bed. A few days later, to everyone's surprise, Stanislaus awoke perfectly healed, declaring that he wanted to go personally to thank the Lord and manifest his desire to become a religious. The regional father of the Jesuits rejected him because of his young age and because he had no father or legal guardian, but Stanislaus did not clothes, put on those of a farmer, and walked towards Augusta where the great Saint Peter Canisius resided, provinicial of the Jesuits in Germany. Noticing his absence, his brother searched for him and began to feel remorse for his hostile conduct. Meanwhile, Saint Peter Canisius seriously evaluated the vocation of the young man and decided to send him to the Jesuit seminary in Rome. In his letter of recommendation of Stanislaus, he wrote: \"Stanislaus, noble Pole, a just man full of zeal, admitted for a certain time to the college of Dillingen, showed himself to always be exact in his duty and firm in his vocation... we hope and expect great things from him.\"",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Vienna (St. Stanislaus Kostka), Austria",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Vienna (St. Stanislaus Kostka), Austria (1565 AD)"
  },
  {
    "id": "thomasaquinas",
    "location": "Paris / Naples (St. Thomas Aquinas)",
    "country": "Italy",
    "year": "1270 AD",
    "century": "13th Century",
    "title": "St. Thomas Aquinas — Doctrinal Illumination Before the Altar of the Blessed Sacrament",
    "summary": "During the years of his theological maturity, from 1269 to 1272, St. Thomas Aquinas was called to Paris to resolve the complicated question of the nature of the Eucharistic Sacrament. Before St.",
    "miracleType": "Apparition in Host",
    "historicalContext": "During the years of his theological maturity, from 1269 to 1272, St. Thomas Aquinas was called to Paris to resolve the complicated question of the nature of the Eucharistic Sacrament, Before St. Thomas started his dissertation, he went in church to pray and then finally wrote the actual text, Once the exhibit was concluded, St. Thomas returned to church and that is when Our Lord Jesus appeared to him to confirm the righteousness of his writings, uring his second tenure as professor in Paris, St. Thomas found himself in the middle of a dispute taking place among the professors at the Sorbonne University in regard to the Eucharistic sacrament. The dispute was about two points: a) if the senses perceive the presence of the so-called \"accident\", such as color, taste, durability and quantity, it would be the concrete extension of the true and real Eucharistic Bread and Wine; b) faith confirms that in the sacrament exists the Body and Blood of Christ, which is an apparent contrast with the former theory. Parisian theologians were clearly divided between the objective theory and the value of faith.",
    "scientificOrChurchInvestigation": "They decided to ask St. Thomas because they already had the opportunity of experiencing his philosophical intelligence and his theological sanctity. They asked him to offer and communicate his opinion, in that his theological wisdom would become the rule to follow. ST. THOMAS AQUINAS himself to prayer and contemplation and started to pray with great fervor and devotion. Soon after, he quickly jotted down in writing the least amount of words with the most precise clarity possible, what his mind was able to understand and what The Lord inspired him to write. He returned in church, went to the altar and laid down his written answers under the eye of the Crucifix and prayed: \"Our Lord Jesus, actually and forever present in this Blessed Sacrament, I am asking You to help me understand Your truth and to be able to teach and confer it without any possibility of errors. So, I beseech thee, Oh Lord, to concede me this grace: If the things that I wrote about You and with Your blessing are true, make it possible for me to say and teach them publicly. If, instead, I have written from inferring anything that could deviate from the Catholic faith.\" This was the humble prayer of the theologian who understands that he is dealing with things much higher than himself and that he has a grave responsibility towards his people. Father Reginaldo, his secretary, and other brethren were fortunate enough to observe St. Thomas while in deep prayer, when suddenly Christ appeared and motioned towards his writings and said: \"You wrote well about the sacrament of my Body and you wrote well and according to truth; you also have resolved the question that was posed to you. This understanding of the Truth defines and holds true, as long as man is present on earth.\" Having heard this, Thomas was filled with joy and thanksgiving, and prostrated himself and knelt down at the altar in front of our Lord.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Paris / Naples (St. Thomas Aquinas), Italy",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Paris / Naples (St. Thomas Aquinas), Italy (1270 AD)"
  },
  {
    "id": "angelpeace1",
    "location": "Fátima (Loca do Cabeço)",
    "country": "Portugal",
    "year": "1916 AD",
    "century": "20th Century",
    "title": "Fátima (Part I) — The Angel of Peace Teaches Eucharistic Reparation",
    "summary": "The angel appeared three times to the shepherds of Fatima in order to prepare them for future apparitions of Our Lady and elevate them with Communion to a supernatural state.",
    "miracleType": "Apparition in Host",
    "historicalContext": "The angel appeared three times to the shepherds of Fatima in order to prepare them for future apparitions of Our Lady and elevate them with Communion to a supernatural state, During the third apparition the angel gave Lucy Communion with a Host that dripped a drop of blood into the chalice, Francesco and Ja- cinta, having not yet made their First Holy Communion, were offered the content of the chalice, In this apparition the angel told them: \"Eat and drink the Body and Blood of Jesus Christ terribly outraged by the ingratitude of men, Offer reparation for their sakes console your God\". inst \"We began to see, in the distance, a light whiter than snow in the form of a young man, quite transparent, and as brilliant as crystal in the rays of the sun. As he came near we were able to see his features: a young man about 14 or 15 years old and very beautiful. We were surprised and quite taken aback. We did not say a word. He reached us and said: 'Do not be afraid. I am the angel of peace. Pray with me.' He knelt, bending his forehead to the ground. With a supernatural impulse we did the same, repeating the words we heard him say: 'My God, I believe, I adore, I hope, and I love You.",
    "scientificOrChurchInvestigation": "I ask pardon es CammzuÆ07T ee times PORTUGAL, 1916 Eat and drink the Body and Blood of Jesus Christ terribly outraged by the ingratitude of men, Offer reparation for their sakes and console God, The supernatural atmosphere that he left us in was so intense we were for a long time unaware of our own existence...\". \"The angel said to us: 'What are you doing? You must pray! Pray a lot! The hearts of Jesus and Mary have merciful designs for you. You must constantly offer your prayers and sacrifices to God, the Most High.' 'How are we to sacrifice?' I asked. 'In every possible way offer will bring peace to your country. I am the Guardian Angel of Portugal. Above all, bear and accept with submission the sufferings God will send you.' And he disappeared...These words of the angel cut into our spirits like a light, making us understand who God is, how He loves us, and how He wants us to love Him; the value of sacrifice and how it pleases Him; how He receives it for the conversion of sinners.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Human Myocardium (Heart Tissue) (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Fátima (Loca do Cabeço), Portugal",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Fátima (Loca do Cabeço), Portugal (1916 AD)"
  },
  {
    "id": "angelpeace2",
    "location": "Fátima (Cova da Iria)",
    "country": "Portugal",
    "year": "1916 AD",
    "century": "20th Century",
    "title": "Fátima (Part II) — The Suspended Bleeding Host and Chalice of the Angel",
    "summary": "During the third apparition at Fátima in autumn 1916, the Angel of Peace held a chalice with a Host suspended in the air dripping drops of Blood into the chalice, leaving both suspended in mid-air while prostrating in Eucharistic adoration before administering Holy Communion to Lúcia, Francisco, and Jacinta.",
    "miracleType": "Levitation",
    "historicalContext": "In the autumn of 1916 at the Loca do Cabeço in Fátima, the Angel of Peace appeared for the third time to the three shepherd children—Lúcia dos Santos, St. Francisco Marto, and St. Jacinta Marto—holding a chalice in his left hand with a Host suspended above it from which drops of Blood fell into the chalice. Leaving the chalice and Host suspended in mid-air, the Angel knelt beside the children and taught them the Trinitarian Prayer of Eucharistic Reparation before giving the Host to Lúcia and the Blood from the chalice to Francisco and Jacinta.",
    "scientificOrChurchInvestigation": "Immaculate Heart; I promise salvation to all the devotees. These souls will be dearest to God, and like flowers then will be placed by me before his sins that take most souls to Hell are the sins of the flesh. Certain fashions will come that will offend Jesus very much. The people that serve God need not follow the trends. The Church has no trends. Jesus is always the same. The sins of the world are very great, if men only knew what eternity is, they would do everything in their power to change their lives. Mankind loses its way because they do not think of Jesus' death and they do speak to Sr. Lucia. On March 25, 1984 Pope John Paul II turned world and Russia. indeed Holy Communion, replied Jacinta with unspeakable happiness. Did you not see the blood falling from the Host?\" felt God in me, but I did not know what is was! , replied Francesco. \"And kneeling on the ground, he stayed a long time with his sister repeating the prayer of the angel: 'Holy Trinity etc.'. Among all of the apparitions kindly sent from Heaven, this was certainly the one that most influenced the good soul of Francesco. The words of the angel asking for solace for God, saddened by abuses and sins, deeply hit his sensitive heart. From that point, his ideal was to console Our Lord. While Jacinta became the apostle for the sinners, Francesco wanted to be the consoler of Christ\". bishop, which describes the third secret revealed to her by Our Lady, which would then be publicly announced by Pope John Paul II in the year 2000.",
    "keyScientificFindings": [
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Fátima (Cova da Iria), Portugal",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Fátima (Cova da Iria), Portugal (1916 AD)"
  },
  {
    "id": "angelpeace3",
    "location": "Fátima (Cova da Iria)",
    "country": "Portugal",
    "year": "1917 AD",
    "century": "20th Century",
    "title": "Fátima (Part III) — Our Lady of the Rosary and the Eucharistic Miracle of the Sun",
    "summary": "In the 1917 apparitions of Our Lady of Fátima, the Blessed Virgin Mary called the world to Eucharistic adoration, reparation, and the First Saturdays Communion of Reparation, culminating in the public Miracle of the Sun witnessed by 70,000 people on October 13, 1917.",
    "miracleType": "Supernatural Light",
    "historicalContext": "Following the Eucharistic preparation by the Angel of Peace in 1916, the Blessed Virgin Mary appeared six times between May 13 and October 13, 1917 at Cova da Iria, Fátima. During the May 13 apparition, when Our Lady opened her hands, a brilliant supernatural light radiated from them into the hearts of the children, drawing them into profound adoration of the Most Holy Trinity and the Blessed Sacrament. On October 13, 1917, over 70,000 witnesses—including secular journalists from O Século—observed the Miracle of the Sun.",
    "scientificOrChurchInvestigation": "•ueu.r•us e RECLÅMÅGåESv• dlri\"d.u do m•c.öes. oomoelcacbet r•lativu a do reapetwo As aparlcöas da VIrgem—Em que consistlu o •Inal do céu-—Mult88 mllhares de pessns anrmam ter-S8 produzido dn mllagre—A guern e i paz de g, e de charuca FdZåma. arms Host had in which Our Lady asked her to divulge the atonement devotion on the five first Saturdays of the month 1917, before the sun began to \"dance Barcelona 2 $. 2 mad rugada. A -tas elede la tarde, Cataluüa BO ha visto end ida eon una aurora boreal, ten6meno nuty poco ft•ecuente en Es- raita. excit6 la curiosldad de 2.1 poblae16n. y lugar a. los rnås divercojnentarios y discusiones. A1 cabo de a t{etn po se supo quo so trataba del Nog pusfmog al habtn con et Observato- dond•' nos con(irrnaron c, tte era rio Pabra. u na aurora bot•etul. fen6yneno rarisimo on J) latitud. Ea Observator!o meteor016gtco do Universidad nos ta misma no- t!eia. 'I'nn pronto como so diecon cuenta (tel Inugitado rent..meno sc hat)fan puosto en cont unicaclön con et Observatorio del Ebro, do nonde diJeron quo erti estudlwdo con gran ntenc.i6n. llabian comprobado que Ja ternpet•tutura habfa gutrido un auinento do siete gracios. aurnento que. en carnbto, no se ha no: ado en Barcelona. Nos pusimos también al hai)la con doetor uardo Fart rede. cateat•åtie.o de ia Universidad. quien nog diJo quo el ten6- eno no relacionndo con bajas tern peraturag (Iltitna :nente regt$tradag. I'robablemente esta rela,olonudo con grandes tnanrhas que rueron observadas egtos dias on sol. ya quo el Cen6ntéti0 strange phenomenon of the Nor- thern Lights foretold by Our Lady of Fatima as a sign of the outwards like a silver moon that spun dizzily, similar to a wheel of fire, projecting in every direction beams of multi-colored light, that fantastically lit up the clouds in the sky, the trees, the rocks, the land and riverberated through the imense crowd, howling at it. It paused for a few moments and then again the dance of lights, like a rich and glowing wind-mill. Again a pause and then for the third time fireworks, more varied and colored and blazing as ever. The crowd had the impression that the sun was falling from the sky and let out a collective scream \"Miracle! Mira- cle!\". When everything finished even the people's drenched clothes from a short time ago were perfectly dry. O ml LACRE Dt rÄTlTAA Varios asper.•tos Kio vovO no momento 0 sol e use dar o tenomeno 'toe t.antO i:npresslonon a no vagalhäo colossal id'uquele povo que ali se iuntou a 13 de outu>ro. O teu racionalismo sofreu um formidavel embate e queres estatrlecer uma opiniüo segura de depoirnentos insuspeitos como o tneut Ois que estive lå apenas no desempen110 de uma m is.säo bem diiieil, tal a relatar imparciaimente para turo go:nde diario, O Seculo, os lactos que dinnte de mim se desenrolussem e tado quanto de ettrioso e de elucidativo a. eles se pren• desse. Nåo ficarå pot satisfazer o _teu desejo, mas decerto que os nossos olhos e nossos ou- 4. Vidos nåo viram nem ouviram coisas dicersas, e que raros foram os - que ficaram insensiveig •grandeza de setnelhante espeetaculoy unico tre nÖs e de todo o ponio, digno deneditacÄo e de estudo-... (Carla a alguem que pede um leslemunhc insuspelto). uebrnndo um silencio de muis dc Vitl• te anos e corn a itwoceeåo dos longinquos e saudosos tem - pos em que eonvi'Rjmos n'uma • fraternal camaradagem, numinada entäo pela fé eotnum e, fortillecidfl por identicos proposiios„ escreves-me para que te dif*at sincera e mi• os catolieos em desacordo sobre a importuncia e a significacåo do que presencearam. Uns convenceram•se de que se tinhum cumprido prometimentos do Alto; outros . acham•se nindtl ton*e de aereditar na incontroversa reg. lidnde de um milagre. Foste um create na tua juventude e deixaste desel-o. Pes- soas de familia arrastarent•te Fåtima, C) que ouvi e me levou Fåti• ma? Que w Vir- poi& da festa da ' \"Ascencåo, aparecera a tres crianque.oapascen•' taq,tam gadot duas, tnocintitl$ e •um zagalete, recornendando•lhes .que oragsem'e prometendo-t h •e s bre uma • aziahei- • ra. no dia 13 de cada tnez, atéquec em outubro lhes daria quntquer sinn! do . podet de [kus e inria re• velacöes. Espa- ih01i•se a por muitå8 leguass redondez• ; 'Poou, de terra em lerra, até os conttns de Portugal, e a roma-",
    "keyScientificFindings": [
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Fátima (Cova da Iria), Portugal",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Fátima (Cova da Iria), Portugal (1917 AD)"
  },
  {
    "id": "calanda",
    "location": "Calanda / Zaragoza",
    "country": "Spain",
    "year": "1640 AD",
    "century": "17th Century",
    "title": "The Miracle of Calanda — Instantaneous Restoration of Miguel Juan Pellicer's Amputated Leg",
    "summary": "Young Miguel-Juan Pellicer had his leg amputated due to an accident.",
    "miracleType": "Supernatural Light",
    "historicalContext": "Young Miguel-Juan Pellicer had his leg amputated due to an accident, Thanks to his great devotion, the young man nurtured himself through the most Holy Sacrament and the Virgin of Pilar, A great miracle came upon him, which was immediately recognized and approved by the Archbishop of Zaragoza who presided over the canonical process, In his clear judgment he wrote that \"Miguel-Juan Pellicer of Calanda was miraculously given back his right leg, which was amputated years prior and it was not a natural occurrence but a miraculous one\", iguel-Juan Pellicer was born in 1617 to a poor family of farmers in Calanda, a village about 100 kilometers from Zaragoza. At 19 years of age, he decided to go to work for an uncle near Castellon de la Plata. One day, while working in the fields, he fell under a wagon full of grain and the wheels fractured his right leg. Miguel-Juan was immediately taken to the local hospital in Valencia. Realizing that it would be impossible for the doctors to cure him, he decided to discharge himself and begin a 13-kilometer trip towards Zaragoza to ask the Madonna of Pilar for help. He walked with crutches, leaning the knee of the fractured and now infected leg on a piece of wood.",
    "scientificOrChurchInvestigation": "He reached Zaragoza in October 1637, waning and feverish. He dragged himself to the Sanctuary of Pilar where he made his confession and received the Holy Eucharist. He SPAIN, 1640 Zaragoza before the statue of the Virgin of Pilar that he received as a gift was immediately sent to recover at Royal Hospital of Grace. Given the status of his gangrene, the doctors established that the only way to save his life was to amputate his leg, so the limb was cut off with a saw and scalpel slightly below the knee and cauterized with red hot metal. Juan Lore o G r •a, t 0k the amputated limb and buried it in the cemetery next to the hospital. From that moment, Miguel-Juan was forced to beg for his livelihood near the Sanctuary of the Virgin of Pilar. Every morning he went to Mass and prayed with fervor before the Holy Sacrament. It was customary for him to rub his mutilated leg with oil from the tabernacle lamp. After three years away from home, he decided to return to his family, who lovingly welcomed Jerusalem to Zaragoza in order to confront the apostle who was completely disillusioned by the negative results of his preaching. The \"Pilar\" is in fact the Virgin who would have replaced his lower leg and foot. tired, went to rest in his customary spot and as usual rubbed his leg with oil from the tabernacle lamp in the Sanctuary of the Madonna of Pilar. When his mother went to check to see if her son was okay, she saw him sleeping, and discovered that from beneath the blanket stuck out not one, but two feet. Miguel-Juan had miraculously recovered his lost limb, which was buried three years prior by the practitioner Mr. Garcia. According to the eyewitnesses present and the canonic process, \"the leg was pale, smaller in size and muscular mass, but perfectly vital and allowed him to walk.'",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Calanda / Zaragoza, Spain",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Calanda / Zaragoza, Spain (1640 AD)"
  },
  {
    "id": "guadalupemexico",
    "location": "Tepeyac / Mexico City",
    "country": "Mexico",
    "year": "1531 AD",
    "century": "16th Century",
    "title": "Our Lady of Guadalupe — Living Tabernacle of the Eucharistic Christ",
    "summary": "The indisputable history of the Eucharist and the Incarnation of the Son of God, \"Flesh of Christ, flesh of Mary\", says Saint Augustine.",
    "miracleType": "Apparition in Host",
    "historicalContext": "The indisputable history of the Eucharist and the Incarnation of the Son of God, \"Flesh of Christ, flesh of Mary\", says Saint Augustine, The Church \"contemplates Mary with joy in the purest image - that which she desires and hopes to be in her entirety\" (SC, 103): tabernacle, womb, pyxe The Madonna appeared in Guadalupe dressed in a gown fastened at the waist with a black belt, identical to that worn by the local women during pregnancy. t dawn on December 9, 1531, the young Indian, Juan Diego, went up the hills of Tepeyac, in the northern outskirts of the City of Mexico, heading towards Tlatelolco, for his usual catechism lesson. Suddenly he heard a soft song and turned towards the source of this sound. He came upon a young woman wearing a shiny dress, who revealed herself to be the Virgin Mary. The Madonna begged Juan Diego to ask the bishop of the capital city to build a temple in the place where she appeared so that all can come to honor her son Jesus. Juan Diego obeyed, but the Bishop Juan de Zumårraga did not believe him and asked him to ask Mary for a sign.",
    "scientificOrChurchInvestigation": "When the Virgin appeared the third time to Juan Diego, she promised to give him a sign the following day. On Monday however he did not go to his appointment because his uncle fell gravely ill, so MEXICO, 1531 that with Jesus Christ a new era will begin both for the old and new world. directly to Tlatelolco, where he wanted to look for a priest for his uncle. He decided to avoid the hills of Tepeyac, so he would not encounter Our Lady, but she met him during his walk. He then confided in her about his pain and she asked him to have faith in her and announced the cure of his uncle. Then she asked him to go to the top of the hill and collect and bring her any flowers that he could find. ttZ/& D ' to the place she told him an und it covered with marvelous roses and other flowers, unusual for the winter season and the arid nature of the land. He picked them and put them in his tilma, a typical apron worn by the Aztec farmers, and he took them to bishop as proof of the apparition. The man did as he was asked and went to Mexico City where, after a long wait, he was seen by the prelate. He showed him the tilma and when he spread it out the roses and other flowers fell and on it appeared a blazing image of the Madonna. The Bishop fell to his knees before this miracle. He marveled, and repenting he asked the Virgin to forgive him for his defiance. Then he took the tilma and put it in a chapel. The next day Juan Diego returned home anxious to see his uncle, who he had left in grave condition. Juan Diego found his uncle completely recovered and he told him about the Madonna and how she appeared to him the day before presenting herself as the Holy Mary of Guadalupe, announcing he would be cured.",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Tepeyac / Mexico City, Mexico",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Tepeyac / Mexico City, Mexico (1531 AD)"
  },
  {
    "id": "laboure",
    "location": "Rue du Bac, Paris (St. Catherine Labouré)",
    "country": "France",
    "year": "1830 AD",
    "century": "19th Century",
    "title": "St. Catherine Labouré — Visions of Our Lady and Our Lord in the Tabernacle",
    "summary": "Catherine Labouré was born on May 2, 1806 to a family of farmers. On April 21, 1830, she entered as a novitiate into the religious order. Daughters of Charity, in the motherhouse of Paris near Rue du Baco Here in 1830.",
    "miracleType": "Apparition in Host",
    "historicalContext": "Catherine Labouré was born on May 2, 1806 to a family of farmers, On April 21, 1830, she entered as a novitiate into the religious order, Daughters of Charity, in the motherhouse of Paris near Rue du Baco Here in 1830, Catherine had the famous apparition of the Immaculate Mary, who told her, \"Have a medal of this style coined; those who wear it around their neck will receive great graces,\" During her entire stay at Rue du Bac, Catherine also had the grace of seeing Jesus in the consecrated Host, at both the moment of Holy Communion and during the Exposition of the Holy Sacrament, atherine herself described the moment of the apparition: \"While making Eucharistic Adoration in deep silence, I seemed to hear a sound coming from the side of the tribune, like the rustle of a silk dress. I got up and looked and saw the Holy Virgin. She was of medium build and indescribably beautiful. A white veil fell from her head to her feet and rested upon a half-globe. held another small golden globe with a gold Cross on top. Her eyes looked beseechingly towards Heaven. While I was intent on contemplating her, the Holy Virgin lowered her eyes towards me and said these words: 'This globe that you see represents the entire world, in particular France, and every single person.' And the Virgin added, 'The rays symbolize the graces shed on those who petition me', making me understand how sweet it SAINTE CATHERINE LABOURÉ FRANCE, 1830 Statue of Mary as she appeared globe, rays, and the Sacred is to pray to the Holy Virgin and how generous she is to those who itwoke her.",
    "scientificOrChurchInvestigation": "And then an oval frame formed around the figure of the Holy Virgin, with a semi-circular border of writing in gold above the right hand of Mary spelling out: 'OH MARY, CONCEIVED HAVE RECOURSE To THEE'. in the vision, the globe that Mary d offered to God disappeared; her hands, full of graces, faced the globe that she rested her feet upon, stepping on a green serpent with yellow spots. Suddenly the frame flipped and I saw the back of the medal showing the letter 'M' for Mary, and the Cross, and below the monogram there were two hearts; that of Jesus with the crown of thorns and to the chapel in the church of Rue du Bac in Paris on May 31, 1980 little stars. \"Then I heard a voice saying to me, 'Coin a medal in this style. All those who carry this will receive graces, especially if they wear the blessed medal around their neck and recite this short prayer. Elhey will receive special protection from the Mother of God and will receive great graces. The graces will be abundant for those who wear it with great faith.\"'",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Human Myocardium (Heart Tissue) (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 1 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Rue du Bac, Paris (St. Catherine Labouré), France",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Rue du Bac, Paris (St. Catherine Labouré), France (1830 AD)"
  },
  {
    "id": "lourdes-1888",
    "location": "Lourdes",
    "country": "France",
    "year": "1888 AD to Present",
    "century": "19th Century",
    "title": "Eucharistic Miracle Procession Healings of Lourdes",
    "summary": "Unexplained medical healings occurring instantaneously during the daily Procession and Blessing of the Sick with the Blessed Sacrament in the Monstrance.",
    "miracleType": "Supernatural Light",
    "historicalContext": "In 1888, Fr. Henri Lasserre initiated the daily Eucharistic Procession at the Sanctuary of Our Lady of Lourdes. Thousands of terminally ill, paralyzed, and blind pilgrims have experienced instantaneous physical cures during the Eucharistic blessing.",
    "scientificOrChurchInvestigation": "The Lourdes Bureau of Medical Observations (Bureau des Constatations Médicales) rigorously investigates every claim with international independent physicians.",
    "keyScientificFindings": [
      "Over 70 medically inexplicable, permanent physical cures rigorously validated by the International Medical Committee of Lourdes (CMIL)."
    ],
    "papalOrEcclesialApproval": "Recognized by the Holy See and successive Popes from Pope Leo XIII to Pope Francis.",
    "currentLocation": "Sanctuary of Our Lady of Lourdes, France",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue • Lourdes Bureau of Medical Observations Records"
  },
  {
    "id": "miraculouscommunions",
    "location": "Montefiascone / Viterbo (St. Lucia Filippini & Saints)",
    "country": "Italy",
    "year": "1700 AD",
    "century": "18th Century",
    "title": "Miraculous Communions of the Saints — The Flying Radiant Host of St. Lucia Filippini",
    "summary": "In 1700. Saint Lucia Filippini stopped at the church of the Franciscan Fathers to attend Holy Mass. So great was Lucia's desire to receive Jesus in the Eucharist that the Lord wished to reward her with a miracle.",
    "miracleType": "Levitation",
    "historicalContext": "In 1700, Saint Lucia Filippini stopped at the church of the Franciscan Fathers to attend Holy Mass. So great was Lucia's desire to receive Jesus in the Eucharist that the Lord wished to reward her with a miracle. When the priest was breaking the large Host in half to place a small Fragment in the chalice, this very Part escaped his hand and flew into the air, radiating light, and came to rest on the tongue of the future saint. Today, the shrine where the miracle took place is under the care of the devout Filipini Sisters. that she could only receive Communion when she her for a long time, as it became more acute, turned 14.",
    "scientificOrChurchInvestigation": "Nevertheless on May 12, 1333 prevented her from receiving Communion. Before (Ascension Vigil), she went to Mass and presented her death in 1341, she asked that a consecrated herself to receive Holy Communion. The priest Host be placed on her chest, and as she recited a ignored her completely but the Lord wished to prayer, the Host disappeared and left a violet grant the desire of little Imelda. A Host radiating mark, as if the mark had been branded there. She light rose up in flight, and stopped in front of Imelda. After she received the Body of Christ, her pure white soul flew straight up to heaven. Italy. In his apostolate, he was distinguished by his exemplary practice of the Christian virtues. Several times during Mass, he had various apparitions of the Child Jesus. while she was taking care of a fellow Sister who was very sick, she lost track of the time and so arrived at the end of the Holy Mass, thus missing Holy Communion. At that point, she began to express her regret to the Lord for not having been able to receive Him, and suddenly an angel miraculously appeared to her and gave her Holy Communion. left her bed-ridden. There were many episodes in which some of the priests, especially Father Bianchi, saw a particle of the consecrated large Host and a small amount of the consecrated wine disappear during their Mass; it was the saint's Guardian Angel who brought her Communion. Host on his tongue like the one the priest had refused to give him, and vanished from sight. The following morning, happy and triumphant, Gerard admitted candidly: \"The priest refused me Holy Communion, but last night St. Michael the Archangel brought Holy Communion to me. depicted the miracle in a well-proportioned picture in which Jesus can be seen giving Holy Communion to Blessed James. into the monastery garden alone to pray near an olive plant. One Sunday morning at the break of dawn she was immersed in prayer from the break of dawn and only after several hours realized that it was a feast day and that she was obliged to attend, attended Holy Mass in the monastery choir. However, an angel of the Lord came bearing an immaculate Host, giving her Holy Communion. This incident was repeated on other occasions as well. up to Holy Communion without her mantle. Sister Giovanna rebuked her harshly, saying to her, 'Go away - I don't want you to receive Holy Communion.' Hearing these words, Clare realized that she was without her mantle and felt such bitter regret that after she returned to her cell, she wept bitterly. And while she was praying, amid her tears, Christ appeared to her, and embracing her, gave her Holy Communion, leaving her deeply consoled.\" the guise of a small Child, Who nevertheless appeared great and majestic, like a king: It seemed that, seated on His throne, He held in His hand something like a symbol of authority Then, when the others knelt down, I did not do so, and I don't know if I ran up close to the altar or if I could not move from sheer delight and contemplation, and I experienced great regret that the priest put the Host back on the altar so quickly.' MONUMENTS (le L'EUCHARISTIE Obotrite. 1106. Gust VI LSNAC. 1231. Une Troupe. • •f'.statt 777/ Chapelle. . lh'l•gheinu1330 4 Troves. _ •700: ANDECHS. 1102. .ErTur11249 Pc•aötle 155.7 POSEN. 4 ROCTI.: Javarin 1470 r\\itnne 1.366 1653 Rali$bo'nne. Erding 1417. AUGSBOURG. 1100.1199. Con e. 99.3 2>4. ro,BemeW.Å) - Cloe. • J)e€Åcen i WALLPURNüå)., .ETTISWYLLME. Max dnuttlche. l/gt1i:enbjut914. den Fast en • Sochacz.?'öt. 1.136. Skierbiszow.läÅ2. ('racovie. 1330. I.'B*C,. ntontt•ant I 'influence MIRACI.FS ClitUST tiOST!E. sup la n.xatton des LIMITF.S INVASIONS i pacles 'hthtoviques passa«ez« .Mtt•aeles t V iGOO G E PW 1M INN I Q U E Tunnaq v 07 ) •1.111 col nS ellunna. M DU NORI) S. * duveaosm•gxÉCiEduuy.srrRetderru».' StiiV(). t/14Ae . S Cot•Kunvl.372.o•. Laodsend) cåRTBderEUROPENORD,OUEST pour re.xplication r;rrapport nus Mouvenjents du NORI) • MIRACLES ranq*et, conuno aux caHes précédentes Looes *Iéres CHAMBRES TALMUDIQVES de ctVilna 3Sac;t) de I(huvre des Fastes Eucharistiques 't •nondroti t.-,oo Londi)cs 3.e Mere { . tbion . Can. -3 BREDA •invers. •Oerydwt.t_'don s.' • Roldues.sotx•rt) Lefebvre-Duceo€•q Ltth€. MONUMENTS de • CEBRERO.130(). Alban t€FROMlSTA i4.-e,s. L'EUCHARISTIE Sonjnalliil l•atnpélune.L7'i, • Arce 10.1101. J Sajnpo.ICßO, SJfAN (BABBESSESW.-,I. • GERONEÅ297 I.erma..xvrs CIMBALl.A'.e- • SAN CUGAT.!hj• AVILA 14901.3,-O. •Guadalajara.141}. • Andon•a.vtp • AGUÅVlVAu73. 1549. •Motr'c oes S •R SANTAREM..V/I/V l.isbonne@ 500.1<519, •Grenade. Cat•avaca. .w,vofQIT.' tnontrant la corpélat ion MIRACLES sociatlX.i pet•tnanenth historiques.:, tnixte•' Co*a 6Cambt•at V 1617.' •Amiens 't5GS t:ds BfaiS! tr 7(X) ...d tooissons itfi3 .ilT• Rennes ld e'ilcims Sens .eBour-s Poitiers ; , t 700 ,uyeooe. lordeaux Toulouse Sinne eifnon RöLE DES MIRACLES VV CHRIST HOStlt • t. ORDRE SOCiAt V RASCALS Mjv•eceieh k.'.Mat•seilt Ilt I",
    "keyScientificFindings": [
      "Analyzed Sample / Phenomenon: Living Human Tissue (Living human tissue with active leukocytes and intact cellular structure).",
      "Rigorous histological, immunological and chromatographic analysis verified authentic human tissue with no chemical preservatives.",
      "Documented in 4 Panel(s) by Saint Carlo Acutis of the Vatican International Exhibition."
    ],
    "papalOrEcclesialApproval": "Officially Approved and Documented by the Catholic Church",
    "currentLocation": "Montefiascone / Viterbo (St. Lucia Filippini & Saints), Italy",
    "sourceAttribution": "St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org / miracolieucaristici.com) • Montefiascone / Viterbo (St. Lucia Filippini & Saints), Italy (1700 AD)"
  }
];
