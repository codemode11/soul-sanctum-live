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
    | 'Tsunami Arrest' 
    | 'Animal Adoration' 
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
    id: 'lanciano-750',
    location: 'Lanciano',
    country: 'Italy',
    year: 'c. 750 AD',
    century: '8th Century',
    title: 'The Miracle of Lanciano (First Recorded Physical Transformation)',
    summary: 'A Basilian monk doubting Transubstantiation saw the Host transform into living human Flesh and the Wine into five coagulated globules of Blood during Mass.',
    miracleType: 'Heart Muscle Transformation',
    historicalContext: 'During the celebration of Holy Mass at the Church of St. Legontian, a Basilian hieromonk experienced intense intellectual doubt regarding the Real Presence. At the words of Consecration, the Host turned into flesh and the Consecrated Wine into blood.',
    scientificOrChurchInvestigation: 'In 1970–1971 and 1981, Prof. Odoardo Linoli (Professor of Anatomy, Histology, and Chemistry at Siena) and Prof. Ruggero Bertelli carried out exhaustive histological and chemical analysis.',
    keyScientificFindings: [
      'Flesh is striated muscular tissue of the human heart myocardium (left ventricle).',
      'Blood belongs to the AB blood group (identical to the Shroud of Turin).',
      'Proteins in the blood match normal human blood proportions without artificial preservatives.',
      'No traces of embalming chemicals or mineral substances were found.'
    ],
    papalOrEcclesialApproval: 'Vatican recognized; confirmed in 1974 by the World Health Organization (WHO) independent scientific commission.',
    bloodType: 'AB Positive',
    currentLocation: 'Church of San Francesco, Lanciano, Chieti, Italy',
    sourceAttribution: 'St. Carlo Acutis Vatican Exhibition Catalogue (miracolieucaristici.org) • Prof. Odoardo Linoli Study (1971) • WHO United Nations Medical Commission (1974)'
  },
  {
    id: 'ivorra-1010',
    location: 'Ivorra',
    country: 'Spain',
    year: '1010 AD',
    century: '11th Century',
    title: 'The Miracle of the Precious Blood of Ivorra',
    summary: 'A priest doubting Transubstantiation saw Consecrated Wine gush over the altar chalice as real blood. St. Ermengol carried the bloodstained linens directly to Pope Sergius IV in Rome.',
    miracleType: 'Bleeding Host',
    historicalContext: 'Fr. Bernat Oliver, parish priest of Ivorra, suffered doubts regarding the real conversion of bread and wine. At the words of consecration, the wine in the chalice transformed into real blood and overflowed onto the altar cloth.',
    scientificOrChurchInvestigation: 'Bishop Saint Ermengol of Urgell investigated the miracle personally and brought the bloodsoaked linens and chalice to Rome.',
    papalOrEcclesialApproval: 'Pope Sergius IV issued a Papal Bull confirming the divine origin of the miracle and granted relics to the Diocese of Urgell.',
    currentLocation: 'Sanctuary of Santa Maria del Sant Dubte (Holy Doubt), Ivorra, Catalonia, Spain',
    sourceAttribution: 'St. Carlo Acutis Vatican Exhibition Catalogue • Papal Bull of Pope Sergius IV (1010 AD)'
  },
  {
    id: 'rimini-1227',
    location: 'Rimini',
    country: 'Italy',
    year: '1227 AD',
    century: '13th Century',
    title: 'The Miracle of the Starving Mule (St. Anthony of Padua)',
    summary: 'St. Anthony of Padua challenged a Cathar skeptic by presenting the Blessed Sacrament to a mule starved for 3 days alongside fresh oats. The mule ignored the food and knelt before the Host.',
    miracleType: 'Animal Adoration',
    historicalContext: 'In Rimini, a Cathar heretic named Bonvillo challenged St. Anthony of Padua, claiming animals would choose grain over a piece of bread. St. Anthony accepted the challenge, requiring Bonvillo to starve his mule for 3 consecutive days.',
    scientificOrChurchInvestigation: 'On the 3rd day, before a vast public gathering in the town square, Bonvillo offered oats while St. Anthony held up the Blessed Sacrament. The mule ignored the oats and bent its front knees to the ground in adoration before the Host.',
    keyScientificFindings: [
      'Documented by early Franciscan biographers (Vita Prima) and included in official canonization records of St. Anthony of Padua.'
    ],
    papalOrEcclesialApproval: 'Promulgated in the canonization records of St. Anthony of Padua by Pope Gregory IX in 1232.',
    currentLocation: 'Piazza Tre Martiri (formerly Piazza del Miracolo), Rimini, Italy',
    sourceAttribution: 'St. Carlo Acutis Vatican Exhibition Catalogue • Franciscan Vita Prima (1232 AD)'
  },
  {
    id: 'alatri-1228',
    location: 'Alatri',
    country: 'Italy',
    year: '1228 AD',
    century: '13th Century',
    title: 'The Flesh Transformation of Alatri',
    summary: 'A young girl hid a Host in a cloth at the instigation of a sorceress; three days later the Host had transformed into human flesh.',
    miracleType: 'Heart Muscle Transformation',
    historicalContext: 'A young woman attempted to use a Host for a love potion. Upon returning home, she opened the cloth in fear and saw the Host had turned into flesh.',
    scientificOrChurchInvestigation: 'Pope Gregory IX issued the official Papal Bull Fraternitatis Tuae in March 1228 acknowledging the miracle and granting indulgence to pilgrims.',
    papalOrEcclesialApproval: 'Papal Bull Fraternitatis Tuae (Pope Gregory IX, 1228).',
    currentLocation: 'Cathedral of Saint Paul, Alatri, Italy',
    sourceAttribution: 'St. Carlo Acutis Vatican Exhibition Catalogue • Papal Bull Fraternitatis Tuae (Pope Gregory IX, 1228)'
  },
  {
    id: 'ebersberg-1228',
    location: 'Glottertal and Ebersberg',
    country: 'Germany',
    year: '1228 AD',
    century: '13th Century',
    title: 'The Levitating Host in the Forest',
    summary: 'A thief stole a ciborium; when he attempted to drop the Sacred Host in the forest, the Host levitated above the tree branches.',
    miracleType: 'Levitation',
    historicalContext: 'A thief broke into the parish church and stole the ciborium containing Hosts. As he rode through the forest, his horse froze and refused to move. The thief threw the Host into a bush, whereupon it floated gracefully above the branches emitting light.',
    scientificOrChurchInvestigation: 'The local count and townspeople witnessed the levitating Host until priests arrived with a chalice to receive it.',
    papalOrEcclesialApproval: 'Approved by the Archdiocese of Freiburg.',
    currentLocation: 'Glottertal Chapel, Baden-Württemberg, Germany',
    sourceAttribution: 'St. Carlo Acutis Vatican Exhibition Catalogue • Diocesan Archives of Freiburg'
  },
  {
    id: 'daroca-1239',
    location: 'Daroca',
    country: 'Spain',
    year: '1239 AD',
    century: '13th Century',
    title: 'The Six Bleeding Hosts of Daroca',
    summary: 'During the Reconquista, six Hosts consecrated for Christian commanders bled onto the altar cloth during a surprise attack.',
    miracleType: 'Bleeding Host',
    historicalContext: 'Before a battle against Moorish forces at Luchente, Fr. Mateo Martínez consecrated six Hosts for commanders. When an unexpected assault occurred, Fr. Martínez hid the Hosts inside the altar corporal. Afterward, the cloth was found soaked in blood with 6 Hosts stuck to it.',
    scientificOrChurchInvestigation: 'The bloody corporal was placed on a mule which walked without guidance to Daroca and stopped at the Church of St. Mark.',
    papalOrEcclesialApproval: 'Promulgated by Pope Urban IV and Pope Clement VI.',
    currentLocation: 'Basilica of Santa María de los Sagrados Corporales, Daroca, Spain',
    sourceAttribution: 'St. Carlo Acutis Vatican Exhibition Catalogue • Papal Decrees of Pope Urban IV and Pope Clement VI'
  },
  {
    id: 'santarem-1247',
    location: 'Santarém',
    country: 'Portugal',
    year: '1247 AD',
    century: '13th Century',
    title: 'The Bleeding Host of Santarém',
    summary: 'A woman took a Host from Mass in her veil to give to a sorceress; the Host bled so profusely that light emanated from her wooden chest.',
    miracleType: 'Bleeding Host',
    historicalContext: 'Desperate to cure her husband of infidelity, a woman consulted a sorceress who demanded a Consecrated Host. The woman feigned illness at Mass, kept the Host in her veil, and as she walked home, it began bleeding profusely.',
    scientificOrChurchInvestigation: 'The parish priest and episcopal commission opened the chest, witnessed the glowing Host overflowing with blood, and carried it in solemn procession back to St. Stephen Church.',
    keyScientificFindings: [
      'The coagulated blood and flesh fragment are contained within a crystal ampoule that has leaked blood during centuries of veneration.'
    ],
    papalOrEcclesialApproval: 'Approved by King Afonso III and successive Popes including St. Francis Xavier who venerated the relic before going to India.',
    currentLocation: 'Church of Saint Stephen (Sanctuary of the Most Holy Miracle), Santarém, Portugal',
    sourceAttribution: 'St. Carlo Acutis Vatican Exhibition Catalogue • Archdiocesan Archives of Santarém, Portugal'
  },
  {
    id: 'bolsena-1263',
    location: 'Bolsena and Orvieto',
    country: 'Italy',
    year: '1263 AD',
    century: '13th Century',
    title: 'Bolsena and Orvieto — Origin of the Feast of Corpus Christi',
    summary: 'A German priest plagued by doubts saw the Host bleed profusely onto the altar corporal at Bolsena. Pope Urban IV summoned the corporal and instituted Corpus Christi.',
    miracleType: 'Bleeding Host',
    historicalContext: 'Fr. Peter of Prague stopped to celebrate Mass at the Church of St. Christina in Bolsena on his way to Rome. At the consecration, blood oozed from the Host onto his hands and the linen corporal.',
    scientificOrChurchInvestigation: 'Pope Urban IV immediately dispatched theologians and physicians to examine the corporal and Host at Bolsena before declaring the event miraculous.',
    keyScientificFindings: [
      'The bloodstains on the linen corporal correspond to human blood drops in 8 distinct groupings.',
      'St. Thomas Aquinas was commissioned by Pope Urban IV to write the liturgical hymns (Pange Lingua, Tantum Ergo, O Salutaris Hostia) for the newly declared Solemnity of Corpus Christi.'
    ],
    papalOrEcclesialApproval: 'Promulgated globally by Pope Urban IV in the Papal Bull Transiturus de Hoc Mundo (1264).',
    bloodType: 'AB Positive',
    currentLocation: 'Duomo di Orvieto (Cathedral of Orvieto), Italy',
    sourceAttribution: 'St. Carlo Acutis Vatican Exhibition Catalogue • Papal Bull Transiturus de Hoc Mundo (Pope Urban IV, 1264)'
  },
  {
    id: 'cebreiro-1300',
    location: 'O Cebreiro',
    country: 'Spain',
    year: '1300 AD',
    century: '14th Century',
    title: 'The Galician Grail of O Cebreiro',
    summary: 'A monk mocked a poor farmer for walking through a blizzard to attend Mass. At the consecration, the Host turned into flesh and the wine into blood before the scoffing monk.',
    miracleType: 'Heart Muscle Transformation',
    historicalContext: 'In the mountain village of O Cebreiro along the Way of St. James, a monk celebrating Mass inwardly scoffed at a peasant, Juan Santín, who hiked through a fierce winter blizzard just for bread and wine. At the words of Consecration, the Host turned into visible human flesh and the chalice filled with real blood.',
    scientificOrChurchInvestigation: 'Queen Isabella of Castile visited O Cebreiro in 1486 and donated a crystal reliquary to preserve the miraculous blood and flesh.',
    papalOrEcclesialApproval: 'Approved by Pope Innocent VIII and Pope Alexander VI.',
    currentLocation: 'Church of Santa María la Real, O Cebreiro, Lugo, Galicia, Spain',
    sourceAttribution: 'St. Carlo Acutis Vatican Exhibition Catalogue • Royal Archives of Isabella of Castile (1486 AD)'
  },
  {
    id: 'cascia-1330',
    location: 'Cascia',
    country: 'Italy',
    year: '1330 AD',
    century: '14th Century',
    title: 'The Eucharistic Miracle of Cascia (The Bleeding Breviary)',
    summary: 'A priest placed a Host carelessly between pages of his breviary to visit a sick parishioner. The Host turned into blood and stained the page with Christ’s face.',
    miracleType: 'Bleeding Host',
    historicalContext: 'A priest in Siena placed a consecrated Host inside his prayer book rather than a pyx when going to administer Viaticum. When he opened the breviary, the Host had liquefied into blood and soaked into two facing pages.',
    scientificOrChurchInvestigation: 'Augustinian Friar Simone Fidati collected the stained page and brought it to Cascia. The page displays a natural blood-imprinted profile of Jesus.',
    papalOrEcclesialApproval: 'Promulgated by Pope Boniface IX in 1389 and venerated alongside St. Rita of Cascia.',
    currentLocation: 'Basilica of Saint Rita, Cascia, Perugia, Italy',
    sourceAttribution: 'St. Carlo Acutis Vatican Exhibition Catalogue • Papal Bull of Pope Boniface IX (1389)'
  },
  {
    id: 'walldurn-1330',
    location: 'Walldürn',
    country: 'Germany',
    year: '1330 AD',
    century: '14th Century',
    title: 'The Miracle of the Precious Blood of Walldürn',
    summary: 'A priest knocked over Consecrated Wine onto the corporal; the spilled Blood formed an image of the Crucified Christ surrounded by 11 heads of Christ.',
    miracleType: 'Bleeding Host',
    historicalContext: 'Fr. Otto von Walldürn accidentally spilled the chalice of Consecrated Wine onto the corporal. The Blood immediately spread across the linen forming a depiction of Christ on the Cross flanked by 11 crowned heads of Jesus.',
    scientificOrChurchInvestigation: 'In terror, the priest hid the corporal under the altar for years until his deathbed confession.',
    papalOrEcclesialApproval: 'Confirmed by Pope Urban VI in 1384 and Pope Eugene IV.',
    currentLocation: 'Basilica of St. George and the Precious Blood, Walldürn, Germany',
    sourceAttribution: 'St. Carlo Acutis Vatican Exhibition Catalogue • Papal Bull of Pope Urban VI (1384 AD)'
  },
  {
    id: 'blanot-1331',
    location: 'Blanot',
    country: 'France',
    year: '1331 AD',
    century: '14th Century',
    title: 'The Bleeding Host on the Communion Cloth of Blanot',
    summary: 'A Host particle fell onto a woman’s communion cloth and immediately transformed into a drop of fresh blood that refused to be washed off.',
    miracleType: 'Bleeding Host',
    historicalContext: 'On Easter Sunday 1331, as Fr. Hugues de Baume distributed Holy Communion, a fragment of the Host fell from a parishioner’s mouth onto the linen cloth held under her chin. It turned into living blood.',
    scientificOrChurchInvestigation: 'Priests attempted to wash the cloth in a basin, but the water turned blood-red and the spot grew brighter.',
    papalOrEcclesialApproval: 'Approved by the Bishop of Autun and Pope John XXII in 1332.',
    currentLocation: 'Church of Saint-Martin, Blanot, France',
    sourceAttribution: 'St. Carlo Acutis Vatican Exhibition Catalogue • Papal Bull of Pope John XXII (1332 AD)'
  },
  {
    id: 'amsterdam-1345',
    location: 'Amsterdam',
    country: 'Netherlands',
    year: '1345 AD',
    century: '14th Century',
    title: 'The Unburned Host of Amsterdam',
    summary: 'A dying man threw up a Host into a blazing fire; the next morning the Host was floating uninjured above the burning embers.',
    miracleType: 'Fire Resistance',
    historicalContext: 'A sick man in Kalverstraat received Viaticum. In a fit of illness he regurgitated the Host, which was cast into the fireplace fire. The next morning, a woman tending the fire saw the Host hovering undamaged over the flames.',
    scientificOrChurchInvestigation: 'The Bishop of Utrecht, Jan van Arkel, officially verified the miracle in 1346 and authorized annual processions (the Stille Omgang).',
    papalOrEcclesialApproval: 'Confirmed by Pope Boniface IX in 1392.',
    currentLocation: 'Amsterdam, Netherlands (celebrated annually in the Silent Walk / Stille Omgang)',
    sourceAttribution: 'St. Carlo Acutis Vatican Exhibition Catalogue • Diocesan Decree of Bishop Jan van Arkel (1346 AD)'
  },
  {
    id: 'alboraya-1348',
    location: 'Alboraya-Almácera',
    country: 'Spain',
    year: '1348 AD',
    century: '14th Century',
    title: 'The Miracle of the Fish of Alboraya',
    summary: 'A priest carrying Viaticum fell into a flooded river; three fish caught the three dropped Hosts in their mouths and returned them intact to the priest.',
    miracleType: 'Animal Adoration',
    historicalContext: 'While crossing the Carraixet ravine to visit a dying sick parishioner, a vicar was swept away by flash floods. The ciborium opened and three Hosts floated downriver toward the sea.',
    scientificOrChurchInvestigation: 'Villagers on the shore saw three fish holding the Hosts upright in their open mouths at the river mouth. The priest brought a chalice to the shoreline, and each fish dropped its Host unharmed into the chalice.',
    papalOrEcclesialApproval: 'Promulgated by the Archdiocese of Valencia; commemorated in regional Eucharistic feasts.',
    currentLocation: 'Parish Church of the Assumption, Alboraya, Valencia, Spain',
    sourceAttribution: 'St. Carlo Acutis Vatican Exhibition Catalogue • Archdiocesan Archives of Valencia, Spain'
  },
  {
    id: 'poznan-1399',
    location: 'Poznań',
    country: 'Poland',
    year: '1399 AD',
    century: '14th Century',
    title: 'The Three Bleeding Hosts of Poznań',
    summary: 'Thieves desecrated 3 stolen Hosts with daggers; blood squirted from the Hosts, blinding a girl. Thrown into a swamp, the Hosts levitated in mid-air in brilliant light.',
    miracleType: 'Supernatural Light',
    historicalContext: 'In 1399, desecrators stole three Consecrated Hosts from the Dominican Church in Poznań and pierced them with daggers. Blood spurted from the Hosts onto the table. Frightened, they threw the Hosts into a nearby marsh in Kazimierz.',
    scientificOrChurchInvestigation: 'A young shepherd boy saw the three Hosts hovering above the marsh waters radiating supernatural white light. King Wladyslaw II Jagiello ordered the construction of Corpus Christi Sanctuary on the site.',
    papalOrEcclesialApproval: 'Confirmed by King Wladyslaw II Jagiello and Pope Boniface IX.',
    currentLocation: 'Church of Most Holy Body of Christ (Kościół Bożego Ciała), Poznań, Poland',
    sourceAttribution: 'St. Carlo Acutis Vatican Exhibition Catalogue • Royal Decrees of King Władysław II Jagiełło (1399 AD)'
  },
  {
    id: 'avignon-1433',
    location: 'Avignon',
    country: 'France',
    year: '1433 AD',
    century: '15th Century',
    title: 'The Parting of the Waters of Avignon',
    summary: 'Catastrophic floodwaters submerged Avignon; inside the flooded chapel, the waters parted left and right like the Red Sea, leaving the altar and Blessed Sacrament completely dry.',
    miracleType: 'Supernatural Light',
    historicalContext: 'On November 30, 1433, heavy rains caused the Rhône River to flood Avignon. The Gray Penitents friars paddled a boat to their chapel fearing the Blessed Sacrament in the monstrance was destroyed under 6 feet of water.',
    scientificOrChurchInvestigation: 'Upon opening the chapel door, they witnessed the waters split apart down the aisle 6 feet high on both sides, leaving the altar, carpet, and monstrance entirely dry and untouched.',
    papalOrEcclesialApproval: 'Formally recorded by the Franciscan Order and confirmed by annual processions held to this day.',
    currentLocation: 'Chapel of the Gray Penitents, Avignon, France',
    sourceAttribution: 'St. Carlo Acutis Vatican Exhibition Catalogue • Archives of the Confraternity of Gray Penitents of Avignon'
  },
  {
    id: 'ettiswil-1447',
    location: 'Ettiswil',
    country: 'Switzerland',
    year: '1447 AD',
    century: '15th Century',
    title: 'The Host in the Stinging Nettles of Ettiswil',
    summary: 'A stolen Host dropped among stinging nettles levitated in mid-air in five distinct glowing fragments corresponding to the 5 Sacred Wounds of Christ.',
    miracleType: 'Levitation',
    historicalContext: 'On May 23, 1447, Anna Vögtli stole a ciborium from the parish church. As she ran through a field of nettles, the Host became impossibly heavy. She dropped it on the ground, where it divided into 5 glowing fragments that hovered above the nettles.',
    scientificOrChurchInvestigation: 'Sworn depositions were taken by the Bishop of Constance and the magistrate of Lucerne.',
    papalOrEcclesialApproval: 'Promulgated by Pope Eugene IV and celebrated annually in the Ettiswil Sanctuary procession.',
    currentLocation: 'Sanctuary Chapel of Ettiswil, Lucerne, Switzerland',
    sourceAttribution: 'St. Carlo Acutis Vatican Exhibition Catalogue • Archives of the Canton of Lucerne, Switzerland'
  },
  {
    id: 'faverney-1608',
    location: 'Faverney',
    country: 'France',
    year: '1608 AD',
    century: '17th Century',
    title: 'The Suspended Monstrance of Faverney (Levitation for 33 Hours)',
    summary: 'A fire destroyed the altar during Pentecost. The monstrance containing two Consecrated Hosts levitated in mid-air for 33 hours over the embers in front of 10,000 witnesses.',
    miracleType: 'Levitation',
    historicalContext: 'On the eve of Pentecost 1608, Benedictine monks set up a repository altar. A fire broke out during the night, consuming the tabernacle, cloth, and table. When morning came, the monstrance was suspended in mid-air with no physical support.',
    scientificOrChurchInvestigation: 'The levitation continued for 33 hours while over 10,000 pilgrims came from nearby regions. At the consecration of Mass the following day, the monstrance descended gently back onto a new altar table.',
    keyScientificFindings: [
      'Over 54 sworn depositions were taken by the Archbishop of Besançon, Ferdinand de Rye.'
    ],
    papalOrEcclesialApproval: 'Confirmed miraculous by Archbishop de Rye in 1608 and endorsed by the Holy See.',
    currentLocation: 'Abbey Church of Notre-Dame, Faverney, France',
    sourceAttribution: 'St. Carlo Acutis Vatican Exhibition Catalogue • Sworn Depositions of Archbishop Ferdinand de Rye (1608)'
  },
  {
    id: 'siena-1730',
    location: 'Siena',
    country: 'Italy',
    year: '1730 AD to Present',
    century: '18th Century',
    title: 'The Perpetual Incorrupt Hosts of Siena (290+ Years Uncorrupted)',
    summary: '223 stolen consecrated Hosts recovered from a collection box remain completely fresh, sweet-smelling, and incorrupt for nearly 3 centuries, defying all natural laws.',
    miracleType: 'Incorrupt Host',
    historicalContext: 'In August 1730, thieves broke into the Church of St. Francis in Siena and stole a ciborium containing 223 consecrated Hosts. They were found 3 days later in an offering box at the nearby Church of St. Mary.',
    scientificOrChurchInvestigation: 'Multiple scientific commissions (including scientists in 1914, 1922, 1950, and 1974 with chemist Enrico Medi) analyzed the Hosts.',
    keyScientificFindings: [
      'Unfermented wheat bread naturally decomposes within weeks due to mold and bacteria; these Hosts remain completely intact, smelling of fresh wheat.',
      'Controlled unblessed wafers kept in identical glass containers alongside decomposed into dust within 10 years, while the Sacred Hosts remain unaltered.'
    ],
    papalOrEcclesialApproval: 'Venerated by Pope St. John Paul II in 1980 who proclaimed: "It is the Presence!"',
    currentLocation: 'Basilica of San Francesco, Siena, Italy',
    sourceAttribution: 'St. Carlo Acutis Vatican Exhibition Catalogue • Scientific Report of Chemist Enrico Medi (1974) • Apostolic Visit of Pope St. John Paul II (1980)'
  },
  {
    id: 'lourdes-1888',
    location: 'Lourdes',
    country: 'France',
    year: '1888 AD to Present',
    century: '19th Century',
    title: 'Eucharistic Miracle Procession Healings of Lourdes',
    summary: 'Unexplained medical healings occurring instantaneously during the daily Procession and Blessing of the Sick with the Blessed Sacrament in the Monstrance.',
    miracleType: 'Supernatural Light',
    historicalContext: 'In 1888, Fr. Henri Lasserre initiated the daily Eucharistic Procession at the Sanctuary of Our Lady of Lourdes. Thousands of terminally ill, paralyzed, and blind pilgrims have experienced instantaneous physical cures during the Eucharistic blessing.',
    scientificOrChurchInvestigation: 'The Lourdes Bureau of Medical Observations (Bureau des Constatations Médicales) rigorously investigates every claim with international independent physicians.',
    keyScientificFindings: [
      'Over 70 medically inexplicable, permanent physical cures rigorously validated by the International Medical Committee of Lourdes (CMIL).'
    ],
    papalOrEcclesialApproval: 'Recognized by the Holy See and successive Popes from Pope Leo XIII to Pope Francis.',
    currentLocation: 'Sanctuary of Our Lady of Lourdes, France',
    sourceAttribution: 'St. Carlo Acutis Vatican Exhibition Catalogue • Lourdes Bureau of Medical Observations Records'
  },
  {
    id: 'tumaco-1906',
    location: 'Tumaco',
    country: 'Colombia',
    year: '1906 AD',
    century: '20th Century',
    title: 'The Tsunami Arrest of Tumaco',
    summary: 'A massive 8.8 earthquake triggered a catastrophic tsunami heading for the island of Tumaco. Fr. Larrondo raised the Sacred Host and the 30-foot wave receded immediately.',
    miracleType: 'Tsunami Arrest',
    historicalContext: 'On January 31, 1906, a violent undersea earthquake struck off the coast of Ecuador and Colombia, unleashing a massive tidal wave toward the low-lying island of Tumaco.',
    scientificOrChurchInvestigation: 'Fr. Gerardo Larrondo led the terrified populace to the beach holding high the Blessed Sacrament in a monstrance. As the mountain of water reached the shore, Fr. Larrondo made the Sign of the Cross over the ocean with the Host. The wave stopped instantly and receded.',
    papalOrEcclesialApproval: 'Promulgated worldwide by the Order of Augustinian Recollects and the Archdiocese of Popayán.',
    currentLocation: 'Tumaco Island, Colombia',
    sourceAttribution: 'St. Carlo Acutis Vatican Exhibition Catalogue • Augustinian Recollect Historical Archives'
  },
  {
    id: 'betania-1991',
    location: 'Betania / Los Teques',
    country: 'Venezuela',
    year: '1991 AD',
    century: '20th Century',
    title: 'The Bleeding Host of Finca Betania',
    summary: 'During Mass on the Feast of the Immaculate Conception, the Host consumed by Fr. Otty Ossa began bleeding profusely from the center.',
    miracleType: 'Bleeding Host',
    historicalContext: 'On December 8, 1991, Fr. Otty Ossa was celebrating Mass at the Sanctuary of Betania. Upon breaking the large Host, it began bleeding profusely from its interior core.',
    scientificOrChurchInvestigation: 'Forensic laboratories in Caracas verified the substance as human blood type AB.',
    papalOrEcclesialApproval: 'Approved by Bishop Pío Bello Ricardo of Los Teques.',
    bloodType: 'AB Positive',
    currentLocation: 'Convent of the Augustinian Recollect Nuns, Los Teques, Venezuela',
    sourceAttribution: 'St. Carlo Acutis Vatican Exhibition Catalogue • Forensic Laboratory Reports of Caracas • Diocese of Los Teques'
  },
  {
    id: 'buenos-aires-1996',
    location: 'Buenos Aires',
    country: 'Argentina',
    year: '1996 AD',
    century: '20th Century',
    title: 'The Miracle of Buenos Aires (Tested by Blind Forensic Analysis)',
    summary: 'A discarded consecrated Host placed in water transformed into bloody heart muscle tissue. Tested blindly by Dr. Frederic Zugibe in New York.',
    miracleType: 'Heart Muscle Transformation',
    historicalContext: 'In August 1996, a consecrated Host was found left in a candlestick at the back of Santa Maria parish. Fr. Alejandro Pezet placed it in a vessel of water inside the tabernacle. Eleven days later, it had turned into a bloody fragment of flesh.',
    scientificOrChurchInvestigation: 'Auxiliary Bishop Jorge Mario Bergoglio (now Pope Francis) commissioned strict forensic testing. Samples were sent blindly without identifying origin to leading cardiologists and forensic pathologists.',
    keyScientificFindings: [
      'Dr. Frederic Zugibe (Chief Medical Examiner of Rockland County, NY) determined the sample was living myocardium muscle from the left ventricle of a human heart.',
      'Intact white blood cells (leukocytes) were present in the tissue, proving the heart tissue was alive and pumping when sample was taken.',
      'The tissue showed severe inflammation and trauma, consistent with severe beating to the chest.'
    ],
    papalOrEcclesialApproval: 'Approved by Cardinal Jorge Mario Bergoglio (Pope Francis) and the Archdiocese of Buenos Aires.',
    bloodType: 'AB Positive',
    currentLocation: 'Parroquia Santa María, Buenos Aires, Argentina',
    sourceAttribution: 'St. Carlo Acutis Vatican Exhibition Catalogue • Dr. Frederic Zugibe Columbia University Medical Center Forensic Report (1999)'
  },
  {
    id: 'chirattakonam-2001',
    location: 'Chirattakonam',
    country: 'India',
    year: '2001 AD',
    century: '21st Century',
    title: 'The Face of Christ Appearing on the Host in Chirattakonam',
    summary: 'During Eucharistic Adoration, three red spots appeared on the Host, which then formed a visible face of the Crowned Christ, seen by thousands.',
    miracleType: 'Apparition in Host',
    historicalContext: 'On April 28, 2001, at St. Mary’s Church in Chirattakonam, Trivandrum, Fr. Johnson Karoor exposed the Blessed Sacrament. Three blood spots appeared on the Host, followed by the image of a human face resembling the Crown of Thorns.',
    scientificOrChurchInvestigation: 'The image remained clearly defined and was photographed and examined under magnification by diocesan investigators.',
    papalOrEcclesialApproval: 'Recognized by Archbishop Cyril Mar Baselios and the Syro-Malankara Catholic Church.',
    currentLocation: 'St. Mary’s Catholic Church, Chirattakonam, Trivandrum, Kerala, India',
    sourceAttribution: 'St. Carlo Acutis Vatican Exhibition Catalogue • Syro-Malankara Catholic Major Archdiocese of Trivandrum'
  },
  {
    id: 'tixtla-2006',
    location: 'Tixtla',
    country: 'Mexico',
    year: '2006 AD',
    century: '21st Century',
    title: 'The Bleeding Host of Tixtla (Fresh Blood and Cardiac Tissue)',
    summary: 'During a parish retreat, a nun distributing Communion saw a Host ooze a reddish liquid. Forensic analysis confirmed human blood type AB with active white blood cells.',
    miracleType: 'Bleeding Host',
    historicalContext: 'On October 21, 2006, during a spiritual retreat at the parish of Saint Martin of Tours in Tixtla, a consecrated Host began emitting a reddish substance.',
    scientificOrChurchInvestigation: 'Bishop Alejo Zavala Castro requested an international scientific study led by Dr. Ricardo Castañón Gómez.',
    keyScientificFindings: [
      'Reddish substance is real human blood containing hemoglobin and intact white blood cells.',
      'DNA analysis showed human origin, but standard genetic profiling could not yield a complete secular genome matching an individual.',
      'Under the blood layer, cardiac muscle fibers (myocardium) were detected.'
    ],
    papalOrEcclesialApproval: 'Approved by Bishop Alejo Zavala Castro in 2013 as a sign of divine origin.',
    bloodType: 'AB Positive',
    currentLocation: 'Parish of Saint Martin of Tours, Tixtla, Guerrero, Mexico',
    sourceAttribution: 'St. Carlo Acutis Vatican Exhibition Catalogue • Dr. Ricardo Castañón Gómez International Forensic Study (2013)'
  },
  {
    id: 'sokolka-2008',
    location: 'Sokółka',
    country: 'Poland',
    year: '2008 AD',
    century: '21st Century',
    title: 'The Miracle of Sokółka (Tissue Interwoven into Bread Fibers)',
    summary: 'A dropped Host placed in water developed a red clot that two independent university pathologists confirmed as living myocardial heart tissue fused seamlessly with bread fibers.',
    miracleType: 'Heart Muscle Transformation',
    historicalContext: 'During Holy Communion at St. Anthony of Padua Church in Sokółka, a priest accidentally dropped a consecrated Host. It was placed in a vessel of water in the sacristy safe. A week later, a red stain formed in the center.',
    scientificOrChurchInvestigation: 'Prof. Maria Sobaniec-Łotowska and Prof. Stanisław Sulkowski of Bialystok Medical University independently examined the sample under electron microscopy.',
    keyScientificFindings: [
      'The red substance is living human heart muscle tissue (myocardium) in a state of agonal suffering.',
      'The heart fibers and wheat bread starch fibers are inextricably intertwined on a microscopic level, impossible to achieve by human synthesis or manipulation.'
    ],
    papalOrEcclesialApproval: 'Formally recognized by Metropolitan Archbishop Edward Ozorowski and approved by the Vatican Apostolic Nunciature in Poland in 2009.',
    bloodType: 'AB Positive',
    currentLocation: 'Collegiate Church of St. Anthony, Sokółka, Poland',
    sourceAttribution: 'St. Carlo Acutis Vatican Exhibition Catalogue • Department of Pathomorphology, Medical University of Białystok'
  },
  {
    id: 'legnica-2013',
    location: 'Legnica',
    country: 'Poland',
    year: '2013 AD',
    century: '21st Century',
    title: 'The Miracle of Legnica (Heart Tissue Under Agony)',
    summary: 'A Host dropped on Christmas Day 2013 dissolved in water and produced red stains. Pathological examination confirmed human heart tissue with alteration typical of agony.',
    miracleType: 'Heart Muscle Transformation',
    historicalContext: 'On Christmas Day 2013, a consecrated Host fell to the floor during Communion at the Church of Saint Hyacinth in Legnica. It was placed in a container with water. In January 2014, a red stain appeared.',
    scientificOrChurchInvestigation: 'The Department of Forensic Medicine in Wrocław and later Pomeranian Medical University in Szczecin performed histopathological analysis.',
    keyScientificFindings: [
      'The tissue is human origin, specifically striated cardiac muscle with changes characteristic of severe hypoxia and emotional/physical trauma.',
      'DNA testing confirmed human genetic material.'
    ],
    papalOrEcclesialApproval: 'Approved by Bishop Zbigniew Kiernikowski in 2016 following submission to the Vatican Congregation for the Doctrine of the Faith.',
    bloodType: 'AB Positive',
    currentLocation: 'Church of Saint Hyacinth, Legnica, Poland',
    sourceAttribution: 'St. Carlo Acutis Vatican Exhibition Catalogue • Pomeranian Medical University in Szczecin • Vatican CDF Decree (2016)'
  }
];
