export interface ParishSchedule {
  id: string;
  name: string;
  popularName?: string;
  address: string;
  patronSaint: string;
  feastDay: string;
  contactNumber?: string;
  dailyMasses: { time: string; language: string; notes?: string }[];
  sundayMasses: { time: string; language: string; notes?: string }[];
  confessionSchedule: string[];
  adorationChapelHours: string;
  notes?: string;
  historicalSignificance?: string;
}

export const CEBU_CITY_PARISHES: ParishSchedule[] = [
  {
    id: 'santo-nino',
    name: 'Basilica Minore del Santo Niño de Cebú',
    popularName: 'Santo Niño Basilica and Pilgrim Center',
    address: 'Osmeña Boulevard, Cebu City 6000',
    patronSaint: 'Señor Santo Niño de Cebú',
    feastDay: 'Third Sunday of January (Fiesta Señor)',
    contactNumber: '(032) 255-6697',
    historicalSignificance: 'The Mother and Head of all Churches in the Philippines (established 1565 by Fray Andrés de Urdaneta and Miguel López de Legazpi). Enshrines the miraculous 1521 Santo Niño image gifted by Magellan to Queen Juana.',
    dailyMasses: [
      { time: '6:00 AM', language: 'Cebuano', notes: 'Basilica Church' },
      { time: '7:00 AM', language: 'English', notes: 'Basilica Church' },
      { time: '8:00 AM', language: 'English', notes: 'Basilica Church' },
      { time: '10:00 AM', language: 'Cebuano', notes: 'Basilica Church' },
      { time: '12:15 PM', language: 'English', notes: 'Basilica Church' },
      { time: '4:00 PM', language: 'Cebuano', notes: 'Basilica Church' },
      { time: '5:30 PM', language: 'English', notes: 'Basilica Church' },
      { time: 'Friday Novena', language: 'Bilingual', notes: 'Masses every hour from 5:00 AM to 7:00 PM at Pilgrim Center' }
    ],
    sundayMasses: [
      { time: '6:00 AM', language: 'Cebuano', notes: 'Pilgrim Center' },
      { time: '7:00 AM', language: 'English', notes: 'Pilgrim Center' },
      { time: '8:30 AM', language: 'English', notes: 'Pilgrim Center' },
      { time: '10:00 AM', language: 'Cebuano', notes: 'Pilgrim Center' },
      { time: '11:30 AM', language: 'English', notes: 'Pilgrim Center' },
      { time: '1:00 PM', language: 'English', notes: 'Pilgrim Center' },
      { time: '2:30 PM', language: 'Cebuano', notes: 'Pilgrim Center' },
      { time: '4:00 PM', language: 'Cebuano', notes: 'Pilgrim Center' },
      { time: '5:30 PM', language: 'English', notes: 'Pilgrim Center' },
      { time: '7:00 PM', language: 'English', notes: 'Pilgrim Center' }
    ],
    confessionSchedule: [
      'Daily (Monday to Saturday): 7:00 AM – 11:30 AM',
      'Daily (Monday to Saturday): 3:00 PM – 6:00 PM',
      'Location: Basilica Confessionals (beside the Adoration Chapel)',
      'By appointment at the Augustinian Friars Priory Convent'
    ],
    adorationChapelHours: 'Open daily: 6:00 AM – 7:00 PM',
    notes: 'Veneration of the miraculous image of Señor Santo Niño open daily at the interior marble chapel.'
  },
  {
    id: 'cebu-cathedral',
    name: 'Cebu Metropolitan Cathedral',
    popularName: 'Archdiocesan Cathedral of St. Vitalis and the Immaculate Conception',
    address: 'Mabini Street, Barangay Sto. Niño, Cebu City',
    patronSaint: 'Saint Vitalis of Milan and The Immaculate Conception',
    feastDay: 'April 28 (St. Vitalis) / December 8 (Immaculate Conception)',
    contactNumber: '(032) 255-8823',
    historicalSignificance: 'The ecclesiastical seat of the Metropolitan Archdiocese of Cebu, one of the oldest dioceses in the Far East (created 1595 by Pope Clement VIII).',
    dailyMasses: [
      { time: '6:00 AM', language: 'Cebuano' },
      { time: '7:00 AM', language: 'English' },
      { time: '12:15 PM', language: 'English' },
      { time: '5:30 PM', language: 'Cebuano' },
      { time: '6:30 PM', language: 'English', notes: 'Anticipated on Saturdays' }
    ],
    sundayMasses: [
      { time: '5:00 AM', language: 'Cebuano' },
      { time: '6:30 AM', language: 'Cebuano' },
      { time: '8:00 AM', language: 'English' },
      { time: '9:30 AM', language: 'English' },
      { time: '11:00 AM', language: 'English' },
      { time: '12:30 PM', language: 'English' },
      { time: '2:00 PM', language: 'Cebuano' },
      { time: '3:30 PM', language: 'Cebuano' },
      { time: '5:00 PM', language: 'English', notes: 'Cathedral Solemn Mass' },
      { time: '6:30 PM', language: 'English' },
      { time: '8:00 PM', language: 'English', notes: 'Youth and Young Professionals' }
    ],
    confessionSchedule: [
      'Monday to Saturday: 4:30 PM – 5:30 PM',
      'First Fridays: 3:00 PM – 6:00 PM (Holy Hour and Penance)',
      'Sundays: Priests available 30 minutes before select Masses upon request'
    ],
    adorationChapelHours: 'Open daily: 6:00 AM – 8:00 PM (Cathedral Crypt and Adoration Chapel)',
    notes: 'Cathedral Museum of Cebu is located adjacent to the cathedral grounds.'
  },
  {
    id: 'redemptorist-cebu',
    name: 'Our Mother of Perpetual Help Parish',
    popularName: 'Redemptorist Church Cebu',
    address: 'Queen’s Road, Kamputhaw, Cebu City',
    patronSaint: 'Our Mother of Perpetual Help',
    feastDay: 'June 27 (Perpetual Novena Every Wednesday)',
    contactNumber: '(032) 253-5292',
    historicalSignificance: 'Famous worldwide center for the Wednesday Novena to Our Mother of Perpetual Help, attended by tens of thousands of pilgrims weekly.',
    dailyMasses: [
      { time: '6:00 AM', language: 'Cebuano' },
      { time: '6:45 AM', language: 'English' },
      { time: '5:30 PM', language: 'Cebuano' },
      { time: '6:30 PM', language: 'English' },
      { time: 'Wednesdays', language: 'Novena and Mass', notes: 'Masses every hour from 5:00 AM to 8:00 PM' }
    ],
    sundayMasses: [
      { time: '6:00 AM', language: 'Cebuano' },
      { time: '7:30 AM', language: 'English' },
      { time: '9:00 AM', language: 'English' },
      { time: '10:30 AM', language: 'English' },
      { time: '12:00 NN', language: 'English' },
      { time: '3:00 PM', language: 'Cebuano' },
      { time: '4:30 PM', language: 'Cebuano' },
      { time: '6:00 PM', language: 'English' },
      { time: '7:30 PM', language: 'English' }
    ],
    confessionSchedule: [
      'Wednesdays (Novena Day): 6:00 AM – 12:00 NN and 3:00 PM – 7:30 PM',
      'Saturdays: 4:30 PM – 6:30 PM',
      'Weekdays: Available by ringing Redemptorist Monastery Office'
    ],
    adorationChapelHours: '24 Hours Daily for Adoration of the Blessed Sacrament',
    notes: 'Home to the St. Alphonsus Liguori theological formation center.'
  },
  {
    id: 'carmelite-mabolo',
    name: 'Carmelite Monastery of the Holy Family',
    popularName: 'Carmelite Church Cebu',
    address: 'Pope John Paul II Avenue, Mabolo, Cebu City',
    patronSaint: 'Our Lady of Mount Carmel and St. Teresa of Avila',
    feastDay: 'July 16 (Our Lady of Mount Carmel)',
    contactNumber: '(032) 232-1557',
    historicalSignificance: 'Sanctuary of peace and cloistered prayer. Site visited by Pope St. John Paul II during his 1981 Apostolic Journey, and refuge of President Corazon Aquino in 1986.',
    dailyMasses: [
      { time: '6:00 AM', language: 'English', notes: 'With Carmelite Cloistered Nuns Choir' }
    ],
    sundayMasses: [
      { time: '6:00 AM', language: 'English' },
      { time: '8:00 AM', language: 'English' },
      { time: '10:00 AM', language: 'English' },
      { time: '5:00 PM', language: 'English' }
    ],
    confessionSchedule: [
      'Daily: 30 minutes before 6:00 AM Mass',
      'Sundays: Before and during all morning Masses',
      'Upon request at the Monastery Parlor'
    ],
    adorationChapelHours: 'Monastery Chapel open daily: 5:30 AM – 6:30 PM',
    notes: 'Brown Scapulars of Our Lady of Mount Carmel enrolled after Holy Mass upon request.'
  },
  {
    id: 'lourdes-shrine-punta',
    name: 'Archdiocesan Shrine of Our Lady of Lourdes',
    popularName: 'Lourdes Shrine Punta Princesa',
    address: 'F. Llamas Street, Punta Princesa, Cebu City',
    patronSaint: 'Our Lady of Lourdes and St. Bernadette Soubirous',
    feastDay: 'February 11 (World Day of the Sick)',
    contactNumber: '(032) 261-5393',
    dailyMasses: [
      { time: '6:00 AM', language: 'Cebuano' },
      { time: '5:30 PM', language: 'English' }
    ],
    sundayMasses: [
      { time: '5:30 AM', language: 'Cebuano' },
      { time: '7:00 AM', language: 'Cebuano' },
      { time: '8:30 AM', language: 'English' },
      { time: '10:00 AM', language: 'English' },
      { time: '11:30 AM', language: 'English' },
      { time: '3:30 PM', language: 'Cebuano' },
      { time: '5:00 PM', language: 'English' },
      { time: '6:30 PM', language: 'English' },
      { time: '8:00 PM', language: 'English' }
    ],
    confessionSchedule: [
      'Thursdays and Saturdays: 4:30 PM – 5:30 PM',
      '11th of Every Month (Lourdes Day): 3:00 PM – 5:00 PM with Anointing of the Sick'
    ],
    adorationChapelHours: 'Open daily: 6:00 AM – 9:00 PM',
    notes: 'Administered by the Salesians of Don Bosco (SDB).'
  },
  {
    id: 'sacred-heart-jakosalem',
    name: 'Archdiocesan Shrine of the Sacred Heart of Jesus',
    popularName: 'Sacred Heart Parish (Jesuit)',
    address: '242 D. Jakosalem Street, Cebu City',
    patronSaint: 'Most Sacred Heart of Jesus',
    feastDay: 'Solemnity of the Sacred Heart (Friday after Corpus Christi)',
    contactNumber: '(032) 253-6473',
    historicalSignificance: 'Administered by the Society of Jesus (Jesuits). Serves the Chinese-Filipino Catholic community and greater Cebu archdiocese.',
    dailyMasses: [
      { time: '6:00 AM', language: 'English' },
      { time: '6:45 AM', language: 'English' },
      { time: '12:15 PM', language: 'English' },
      { time: '6:00 PM', language: 'English / Mandarin (Select days)' }
    ],
    sundayMasses: [
      { time: '6:30 AM', language: 'English' },
      { time: '8:00 AM', language: 'English' },
      { time: '9:30 AM', language: 'Mandarin and English' },
      { time: '11:00 AM', language: 'English' },
      { time: '3:00 PM', language: 'English' },
      { time: '4:30 PM', language: 'English' },
      { time: '6:00 PM', language: 'English' },
      { time: '7:30 PM', language: 'English' }
    ],
    confessionSchedule: [
      'Monday to Saturday: 15 minutes before daily Masses',
      'First Fridays: 4:00 PM – 6:00 PM (Eucharistic Adoration and Penance)',
      'Sundays: During all morning Masses'
    ],
    adorationChapelHours: 'Open daily: 6:00 AM – 8:00 PM',
    notes: 'Active Eucharistic Apostles and Sacred Heart Devotees apostolates.'
  },
  {
    id: 'san-pedro-calungsod-srp',
    name: 'Chapel of San Pedro Calungsod',
    popularName: 'Pedro Calungsod Shrine SRP',
    address: 'SM Seaside Complex, South Road Properties (SRP), Cebu City',
    patronSaint: 'Saint Pedro Calungsod (Second Filipino Saint, Martyr of Guam)',
    feastDay: 'April 2',
    dailyMasses: [
      { time: '6:00 PM', language: 'English', notes: 'Tuesday to Saturday' }
    ],
    sundayMasses: [
      { time: '10:00 AM', language: 'English' },
      { time: '4:00 PM', language: 'English' },
      { time: '6:00 PM', language: 'English' }
    ],
    confessionSchedule: [
      'Saturdays and Sundays: 30 minutes before Holy Mass'
    ],
    adorationChapelHours: 'Open during mall and complex hours: 10:00 AM – 7:00 PM',
    notes: 'Houses first-class relics of Saint Pedro Calungsod.'
  },
  {
    id: 'santo-rosario-del-rosario',
    name: 'Santo Rosario Parish',
    popularName: 'Santo Rosario Church (University Belt)',
    address: 'P. del Rosario Street, Cebu City',
    patronSaint: 'Our Lady of the Most Holy Rosary',
    feastDay: 'First Sunday of October',
    contactNumber: '(032) 255-5942',
    dailyMasses: [
      { time: '6:00 AM', language: 'Cebuano' },
      { time: '6:45 AM', language: 'English' },
      { time: '12:15 PM', language: 'English' },
      { time: '5:30 PM', language: 'Cebuano' },
      { time: '6:15 PM', language: 'English' }
    ],
    sundayMasses: [
      { time: '5:30 AM', language: 'Cebuano' },
      { time: '7:00 AM', language: 'Cebuano' },
      { time: '8:30 AM', language: 'English' },
      { time: '10:00 AM', language: 'English' },
      { time: '12:00 NN', language: 'English' },
      { time: '2:00 PM', language: 'Cebuano' },
      { time: '3:30 PM', language: 'Cebuano' },
      { time: '5:00 PM', language: 'English' },
      { time: '6:30 PM', language: 'English' },
      { time: '8:00 PM', language: 'English' }
    ],
    confessionSchedule: [
      'Saturdays: 5:00 PM – 6:30 PM',
      'First Fridays: 4:30 PM – 6:00 PM',
      'Daily upon request at the Parish Office'
    ],
    adorationChapelHours: 'Open daily: 6:00 AM – 8:00 PM',
    notes: 'Located in the university belt, highly accessible to students and faculty.'
  },
  {
    id: 'guadalupe-shrine',
    name: 'Archdiocesan Shrine of Our Lady of Guadalupe',
    popularName: 'Guadalupe Parish (Patroness of Cebu)',
    address: 'Guadalupe, Cebu City',
    patronSaint: 'Our Lady of Guadalupe of Cebu',
    feastDay: 'December 12 (Solemnity of Our Lady of Guadalupe)',
    contactNumber: '(032) 254-4593',
    historicalSignificance: 'Declared the Secondary Patroness of Cebu in 2002. Enshrines the venerable image of Our Lady of Guadalupe believed to have protected Cebu from cholera in 1888.',
    dailyMasses: [
      { time: '6:00 AM', language: 'Cebuano' },
      { time: '5:30 PM', language: 'Cebuano / English' }
    ],
    sundayMasses: [
      { time: '5:30 AM', language: 'Cebuano' },
      { time: '7:00 AM', language: 'Cebuano' },
      { time: '8:30 AM', language: 'English' },
      { time: '10:00 AM', language: 'English' },
      { time: '1:00 PM', language: 'Cebuano' },
      { time: '2:30 PM', language: 'Cebuano' },
      { time: '4:00 PM', language: 'Cebuano' },
      { time: '5:30 PM', language: 'English' },
      { time: '7:00 PM', language: 'English' }
    ],
    confessionSchedule: [
      'Wednesdays and Saturdays: 4:30 PM – 5:30 PM',
      'Every 12th of the Month (Guadalupe Day): 3:00 PM – 5:00 PM'
    ],
    adorationChapelHours: 'Open daily: 6:00 AM – 9:00 PM',
    notes: 'Famous pilgrimage cave and spring of Our Lady of Guadalupe located nearby.'
  },
  {
    id: 'st-therese-lahug',
    name: 'Saint Therese of the Child Jesus Parish',
    popularName: 'Lahug Parish',
    address: 'Salinas Drive, Lahug, Cebu City',
    patronSaint: 'Saint Thérèse of Lisieux (The Little Flower, Doctor of the Church)',
    feastDay: 'October 1',
    contactNumber: '(032) 233-4964',
    dailyMasses: [
      { time: '6:00 AM', language: 'Cebuano' },
      { time: '6:00 PM', language: 'English' }
    ],
    sundayMasses: [
      { time: '6:30 AM', language: 'Cebuano' },
      { time: '8:00 AM', language: 'English' },
      { time: '9:30 AM', language: 'English' },
      { time: '11:00 AM', language: 'English' },
      { time: '3:30 PM', language: 'Cebuano' },
      { time: '5:00 PM', language: 'English' },
      { time: '6:30 PM', language: 'English' }
    ],
    confessionSchedule: [
      'Saturdays: 4:30 PM – 6:00 PM',
      'Thursdays: 5:00 PM – 6:00 PM before Novena Mass'
    ],
    adorationChapelHours: 'Open daily: 6:00 AM – 9:00 PM',
    notes: 'Home to the Little Way apostolate and active young adult devotions.'
  }
];
