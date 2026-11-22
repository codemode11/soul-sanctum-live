export interface StationOfTheCross {
  number: number;
  roman: string;
  title: string;
  postureCue: string;
  scriptureRef: string;
  scriptureText: string;
  jerusalemSiteName: string;
  jerusalemQuarter: string;
  jerusalemHistoricalNote: string;
  jerusalemPlaceQuery: string;
  jerusalemFallbackQuery: string;
  meditation: string;
  prayer: string;
  stabatMaterEnglish: string;
  stabatMaterLatin: string;
}

export const STATIONS_AUTHOR_META = {
  author: "St. Alphonsus Maria de' Liguori",
  authorTitle: 'Bishop & Doctor of the Church (1696–1787)',
  workTitle: 'The Way of the Cross (Via Crucis, 1761)',
  faustinaCitation: 'St. Faustina Kowalska, Diary of Divine Mercy in My Soul, §1572',
  faustinaQuote:
    'At three o’clock, implore My mercy, especially for sinners; and, if only for a brief moment, immerse yourself in My Passion, particularly in My abandonment at the moment of agony. This is the hour of great mercy for the whole world... Try your best to make the Stations of the Cross in this hour, provided that your duties permit it.',
  openingVersicle: 'We adore Thee, O Christ, and we praise Thee.',
  openingResponse: 'Because by Thy holy Cross Thou hast redeemed the world.',
  aspiration:
    'I love Thee, Jesus, my love, above all things; I repent with my whole heart for having offended Thee. Never permit me to separate myself from Thee again. Grant that I may love Thee always; and then do with me what Thou wilt.',
};

export const STATIONS_PREPARATORY_PRAYER = {
  title: 'Preparatory Prayer',
  subtitle: 'Act of Contrition & Offering Before the Altar',
  postureCue: 'Kneeling before the Crucifix, make the Sign of the Cross',
  jerusalemSiteName: 'Via Dolorosa — Old City of Jerusalem, Israel',
  jerusalemHistoricalNote:
    'The Via Dolorosa ("Way of Sorrows") winds approximately 600 meters through the Old City of Jerusalem, from the ancient Antonia Fortress near the Lions’ Gate to the Church of the Holy Sepulchre on Mount Calvary.',
  jerusalemPlaceQuery: 'Via Dolorosa, Old City, Jerusalem',
  prayerText:
    'My Lord Jesus Christ, Thou hast made this journey to die for me with love unutterable, and I have so many times unworthily abandoned Thee; but now I love Thee with my whole heart, and because I love Thee, I repent sincerely for ever having offended Thee. Pardon me, my God, and permit me to accompany Thee on this journey. Thou goest to die for love of me; I wish also, my beloved Redeemer, to die for love of Thee. My Jesus, I will live and die always united to Thee.',
  stabatMaterEnglish:
    'At the Cross her station keeping, stood the mournful Mother weeping, close to Jesus to the last.',
  stabatMaterLatin:
    'Stabat Mater dolorosa, juxta Crucem lacrimosa, dum pendebat Filius.',
};

export const STATIONS_CONCLUDING_PRAYER = {
  title: 'Concluding Prayer to Jesus Crucified',
  subtitle: 'Prayer Before the Crucifix & Intentions of the Holy Father',
  postureCue: 'Kneeling at the end of the Way of the Cross',
  jerusalemSiteName: 'Church of the Holy Sepulchre — Jerusalem, Israel',
  jerusalemHistoricalNote:
    'Inside the Basilica of the Holy Sepulchre stand both the Rock of Calvary (Golgotha) and the Edicule enshrining the Empty Tomb of Christ, uniting the final five Stations of the Cross under one sacred roof.',
  jerusalemPlaceQuery: 'Church of the Holy Sepulchre, Jerusalem',
  prayerText:
    'Behold, O kind and most sweet Jesus, I cast myself upon my knees in Thy sight, and with the most fervent desire of my soul, I pray and beseech Thee that Thou wouldst impress upon my heart lively sentiments of faith, hope, and charity, with true contrition for my sins and a firm purpose of amendment; while with deep affection and grief of soul I ponder within myself and mentally contemplate Thy five most precious wounds, having before my eyes that which David the prophet spoke concerning Thee: "They have pierced My hands and My feet; they have numbered all My bones."',
  pontiffNote:
    'Recite one Our Father, one Hail Mary, and one Glory Be for the intentions of the Sovereign Pontiff. A plenary indulgence is granted under the usual conditions (sacramental Confession, Eucharistic Communion, prayer for the Pope’s intentions, and detachment from sin) to the faithful who piously make the Way of the Cross.',
  closingDoxology:
    'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.',
};

export const STATIONS_OF_THE_CROSS: StationOfTheCross[] = [
  {
    number: 1,
    roman: 'I',
    title: 'Jesus Is Condemned to Death',
    postureCue: 'Kneel or genuflect during the Adoration, then stand for the meditation',
    scriptureRef: 'Matthew 27:22–26',
    scriptureText:
      'Pilate said to them, "Then what shall I do with Jesus who is called Christ?" They all said, "Let Him be crucified!" So he released for them Barabbas, and having scourged Jesus, delivered Him to be crucified.',
    jerusalemSiteName: 'Praetorium / Antonia Fortress (Al-Omariya School Courtyard)',
    jerusalemQuarter: 'Muslim Quarter, Old City of Jerusalem',
    jerusalemHistoricalNote:
      'Traditionally identified with the Roman Antonia Fortress overlooking the Temple Mount, where Pontius Pilate sat on the Lithostrotos (Stone Pavement) and pronounced the sentence of death.',
    jerusalemPlaceQuery: 'First Station of the Cross Via Dolorosa Jerusalem',
    jerusalemFallbackQuery: 'Al-Omariya School Via Dolorosa Jerusalem',
    meditation:
      'Consider how Jesus, after having been scourged and crowned with thorns, was unjustly condemned by Pilate to die on the Cross.',
    prayer:
      'My adorable Jesus, it was not Pilate, no, it was my sins that condemned Thee to die. I beseech Thee, by the merits of this sorrowful journey, to assist my soul in its journey towards eternity.',
    stabatMaterEnglish:
      'Through her heart, His sorrow sharing, all His bitter anguish bearing, now at length the sword has passed.',
    stabatMaterLatin:
      'Cujus animam gementem, contristatam et dolentem, pertransivit gladius.',
  },
  {
    number: 2,
    roman: 'II',
    title: 'Jesus Carries His Cross',
    postureCue: 'Kneel or genuflect during the Adoration, then stand for the meditation',
    scriptureRef: 'John 19:16–17',
    scriptureText:
      'So they took Jesus, and He went out, bearing His own cross, to the place called the place of a skull, which is called in Hebrew Golgotha.',
    jerusalemSiteName: 'Church of the Condemnation & Chapel of the Flagellation',
    jerusalemQuarter: 'Via Dolorosa, Old City of Jerusalem',
    jerusalemHistoricalNote:
      'Located directly across from the First Station within the Franciscan Monastery of the Flagellation, preserving ancient Roman Herodian pavement stones beneath the Convent of the Sisters of Zion nearby.',
    jerusalemPlaceQuery: 'Church of the Condemnation and Imposition of the Cross Jerusalem',
    jerusalemFallbackQuery: 'Church of the Flagellation Via Dolorosa Jerusalem',
    meditation:
      'Consider how Jesus, in making this journey with the Cross on His shoulders, thought of us, and offered for us to His Father the death He was about to undergo.',
    prayer:
      'My most beloved Jesus, I embrace all the tribulations Thou hast destined for me until death. I beseech Thee, by the merits of the pain Thou didst suffer in carrying Thy Cross, to give me the necessary help to carry mine with perfect patience and resignation.',
    stabatMaterEnglish:
      'O how sad and sore distressed was that Mother, highly blest, of the sole-begotten One!',
    stabatMaterLatin:
      'O quam tristis et afflicta fuit illa benedicta Mater Unigeniti!',
  },
  {
    number: 3,
    roman: 'III',
    title: 'Jesus Falls the First Time',
    postureCue: 'Kneel or genuflect during the Adoration, then stand for the meditation',
    scriptureRef: 'Isaiah 53:4–5',
    scriptureText:
      'Surely He has borne our griefs and carried our sorrows; yet we esteemed Him stricken, smitten by God, and afflicted. But He was wounded for our transgressions, He was bruised for our iniquities.',
    jerusalemSiteName: 'Third Station Chapel (Armenian Catholic Patriarchate)',
    jerusalemQuarter: 'Corner of Via Dolorosa & El-Wad Road, Jerusalem',
    jerusalemHistoricalNote:
      'Where the Via Dolorosa turns south onto El-Wad Road (the ancient Tyropoeon Valley), a chapel cared for by the Armenian Catholic Church marks the spot where Christ first fell beneath the weight of the Cross.',
    jerusalemPlaceQuery: 'Third Station of the Cross Via Dolorosa Jerusalem',
    jerusalemFallbackQuery: 'Station III Via Dolorosa El-Wad Road Jerusalem',
    meditation:
      'Consider this first fall of Jesus under His Cross. His flesh was torn by the scourges, His head crowned with thorns, and He had lost a great quantity of blood. He was so weakened that He could scarcely walk, and yet He had to carry this great load upon His shoulders. The soldiers struck Him rudely, and thus He fell several times in His journey.',
    prayer:
      'My beloved Jesus, it is not the weight of the Cross, but my sins, which have made Thee suffer so much pain. Ah, by the merits of this first fall, deliver me from the misfortune of falling into mortal sin.',
    stabatMaterEnglish:
      'Christ above in torment hangs; she beneath beholds the pangs of her dying glorious Son.',
    stabatMaterLatin:
      'Quae maerebat et dolebat, pia Mater, dum videbat nati poenas inclyti.',
  },
  {
    number: 4,
    roman: 'IV',
    title: 'Jesus Meets His Afflicted Mother',
    postureCue: 'Kneel or genuflect during the Adoration, then stand for the meditation',
    scriptureRef: 'Luke 2:34–35',
    scriptureText:
      'And Simeon blessed them and said to Mary His mother, "Behold, this child is set for the fall and rising of many in Israel... and a sword will pierce through your own soul also."',
    jerusalemSiteName: 'Church of Our Lady of the Spasm (Armenian Catholic)',
    jerusalemQuarter: 'El-Wad Road, Old City of Jerusalem',
    jerusalemHistoricalNote:
      'Just steps south of the Third Station stands the Church of Our Lady of the Spasm, featuring a Byzantine mosaic floor depicting a pair of sandals pointing toward the street where Mary stood to gaze upon her Son.',
    jerusalemPlaceQuery: 'Fourth Station of the Cross Church of Our Lady of the Spasm Jerusalem',
    jerusalemFallbackQuery: 'Station IV Via Dolorosa Jerusalem',
    meditation:
      'Consider the meeting of the Son and the Mother, which took place on this journey. Jesus and Mary looked at each other, and their looks became as so many arrows to wound those hearts which loved each other so tenderly.',
    prayer:
      'My most loving Jesus, by the sorrow Thou didst experience in this meeting, grant me the grace of a truly devoted love for Thy most holy Mother. And thou, my Queen, who wast overwhelmed with sorrow, obtain for me by thy intercession a continual and tender remembrance of the Passion of thy Son.',
    stabatMaterEnglish:
      'Is there one who would not weep, whelmed in miseries so deep, Christ’s dear Mother to behold?',
    stabatMaterLatin:
      'Quis est homo qui non fleret, Matrem Christi si videret in tanto supplicio?',
  },
  {
    number: 5,
    roman: 'V',
    title: 'Simon of Cyrene Helps Jesus Carry His Cross',
    postureCue: 'Kneel or genuflect during the Adoration, then stand for the meditation',
    scriptureRef: 'Mark 15:21',
    scriptureText:
      'And they compelled a passer-by, Simon of Cyrene, who was coming in from the country, the father of Alexander and Rufus, to carry His cross.',
    jerusalemSiteName: 'Franciscan Chapel of Simon of Cyrene',
    jerusalemQuarter: 'Base of the Ascent up Via Dolorosa, Jerusalem',
    jerusalemHistoricalNote:
      'Here the Via Dolorosa turns sharply west and begins its steep cobbled climb toward Calvary. A small Franciscan chapel marks the intersection where Roman guards pressed Simon of Cyrene into service.',
    jerusalemPlaceQuery: 'Fifth Station of the Cross Via Dolorosa Jerusalem',
    jerusalemFallbackQuery: 'Chapel of Simon of Cyrene Via Dolorosa Jerusalem',
    meditation:
      'Consider how the Jews, seeing that at each step Jesus from weakness was on the point of expiring, and fearing that He would die on the way, when they wished Him to die the ignominious death of the Cross, constrained Simon the Cyrenian to carry the Cross behind our Lord.',
    prayer:
      'My most sweet Jesus, I will not refuse the Cross, as the Cyrenian did; I accept it—I embrace it. I accept in particular the death Thou hast destined for me, with all the pains that may accompany it; I unite it to Thy death, I offer it to Thee. Thou hast died for love of me; I will die for love of Thee, and to please Thee. Help me by Thy grace.',
    stabatMaterEnglish:
      'Can the human heart refrain from partaking in her pain, in that Mother’s pain untold?',
    stabatMaterLatin:
      'Quis non posset contristari, Christi Matrem contemplari dolentem cum Filio?',
  },
  {
    number: 6,
    roman: 'VI',
    title: 'Veronica Wipes the Face of Jesus',
    postureCue: 'Kneel or genuflect during the Adoration, then stand for the meditation',
    scriptureRef: 'Psalm 27:8–9',
    scriptureText:
      'Thou hast said, "Seek ye My face." My heart says to Thee, "Thy face, Lord, do I seek." Hide not Thy face from me.',
    jerusalemSiteName: 'Church of Saint Veronica (Little Sisters of Jesus)',
    jerusalemQuarter: 'Steep Ascent of Via Dolorosa, Old City of Jerusalem',
    jerusalemHistoricalNote:
      'Halfway up the stepped lane toward the market sits the Melkite Greek Catholic Church of Saint Veronica, built over ancient Crusader arches honoring the devout woman who wiped the blood and sweat from Christ’s face.',
    jerusalemPlaceQuery: 'Sixth Station of the Cross Church of Saint Veronica Jerusalem',
    jerusalemFallbackQuery: 'Station VI Via Dolorosa Jerusalem',
    meditation:
      'Consider how the holy woman named Veronica, seeing Jesus so afflicted, and His face bathed in sweat and blood, presented Him with a towel, with which He wiped His adorable face, leaving on it the impression of His holy countenance.',
    prayer:
      'My most beloved Jesus, Thy face was beautiful before, but in this journey it has lost all its beauty, and wounds and blood have disfigured it. Alas, my soul also was once beautiful, when it received Thy grace in Baptism; but I have disfigured it since by my sins. Thou alone, my Redeemer, canst restore it to its former beauty. Do this by Thy Passion, O Jesus.',
    stabatMaterEnglish:
      'Bruised, derided, cursed, defiled, she beheld her tender Child, all with bloody scourges rent.',
    stabatMaterLatin:
      'Pro peccatis suae gentis vidit Jesum in tormentis, et flagellis subditum.',
  },
  {
    number: 7,
    roman: 'VII',
    title: 'Jesus Falls the Second Time',
    postureCue: 'Kneel or genuflect during the Adoration, then stand for the meditation',
    scriptureRef: 'Lamentations 3:1–2, 9',
    scriptureText:
      'I am the man who has seen affliction under the rod of His wrath; He has driven and brought me into darkness without any light... He has blocked my ways with hewn stones, He has made my paths crooked.',
    jerusalemSiteName: 'Seventh Station Franciscan Chapel (Ancient Judgment Gate)',
    jerusalemQuarter: 'Suq Khan ez-Zeit Intersection, Old City of Jerusalem',
    jerusalemHistoricalNote:
      'At the busy crossroads of the Old City’s ancient Roman Cardo, a Franciscan chapel encloses a towering red Roman column marking the threshold of the ancient city gate ("Gate of Judgment") leading outside the walls to Golgotha.',
    jerusalemPlaceQuery: 'Seventh Station of the Cross Via Dolorosa Jerusalem',
    jerusalemFallbackQuery: 'Station VII Via Dolorosa Jerusalem',
    meditation:
      'Consider the second fall of Jesus under the Cross—a fall which renews the pain of all the wounds of the head and members of our afflicted Lord.',
    prayer:
      'My most gentle Jesus, how many times hast Thou pardoned me, and how many times have I fallen again, and begun again to offend Thee! Oh, by the merits of this new fall, give me the necessary helps to persevere in Thy grace until death. Grant that in all temptations which assail me I may always commend myself to Thee.',
    stabatMaterEnglish:
      'For the sins of His own nation, saw Him hang in desolation, till His spirit forth He sent.',
    stabatMaterLatin:
      'Vidit suum dulcem Natum moriendo desolatum, dum emisit spiritum.',
  },
  {
    number: 8,
    roman: 'VIII',
    title: 'Jesus Consoles the Women of Jerusalem',
    postureCue: 'Kneel or genuflect during the Adoration, then stand for the meditation',
    scriptureRef: 'Luke 23:27–28',
    scriptureText:
      'And there followed Him a great multitude of the people, and of women who bewailed and lamented Him. But Jesus turning to them said, "Daughters of Jerusalem, do not weep for Me, but weep for yourselves and for your children."',
    jerusalemSiteName: 'Greek Orthodox Monastery of St. Charalambos Wall',
    jerusalemQuarter: 'Al-Khanqah Street, Christian Quarter, Jerusalem',
    jerusalemHistoricalNote:
      'Carved into the exterior limestone wall of the Greek Orthodox Monastery of St. Charalambos is a small stone medallion inscribed with a cross and the Greek letters IC XC NIKA ("Jesus Christ Conquers"), marking where Christ spoke to the weeping daughters of Jerusalem.',
    jerusalemPlaceQuery: 'Eighth Station of the Cross Via Dolorosa Jerusalem',
    jerusalemFallbackQuery: 'Monastery of Saint Charalambos Via Dolorosa Jerusalem',
    meditation:
      'Consider how those women wept with compassion at seeing Jesus in such a pitiable state, streaming with blood as He walked along. But Jesus said to them: "Weep not for Me, but for your children."',
    prayer:
      'My Jesus, laden with sorrows, I weep for the offenses I have committed against Thee, because of the pains they have deserved, and still more because of the displeasure they have caused Thee, who hast loved me so much. It is Thy love, more than the fear of hell, which causes me to weep for my sins.',
    stabatMaterEnglish:
      'O thou Mother! fount of love! Touch my spirit from above, make my heart with thine accord.',
    stabatMaterLatin:
      'Eia, Mater, fons amoris, me sentire vim doloris fac, ut tecum lugeam.',
  },
  {
    number: 9,
    roman: 'IX',
    title: 'Jesus Falls the Third Time',
    postureCue: 'Kneel or genuflect during the Adoration, then stand for the meditation',
    scriptureRef: 'Psalm 22:14–15',
    scriptureText:
      'I am poured out like water, and all my bones are out of joint; my heart is like wax, it is melted within my breast; my strength is dried up like a potsherd.',
    jerusalemSiteName: 'Coptic Orthodox Patriarchate / Entrance near Holy Sepulchre Roof',
    jerusalemQuarter: 'Christian Quarter, Old City of Jerusalem',
    jerusalemHistoricalNote:
      'Marked by a Roman column set into the wall beside the Coptic Orthodox Patriarchate and the Ethiopian Monastery of Deir es-Sultan, just steps from the rooftop courtyard overlooking the Church of the Holy Sepulchre.',
    jerusalemPlaceQuery: 'Ninth Station of the Cross Via Dolorosa Jerusalem',
    jerusalemFallbackQuery: 'Coptic Orthodox Patriarchate Station IX Jerusalem',
    meditation:
      'Consider the third fall of Jesus Christ. His weakness was extreme, and the cruelty of His executioners excessive, who tried to hasten His steps when He had scarcely strength to move.',
    prayer:
      'Ah, my outraged Jesus, by the merits of the weakness Thou didst suffer in going to Calvary, give me strength sufficient to conquer all human respect and all my wicked passions, which have led me to despise Thy friendship.',
    stabatMaterEnglish:
      'Make me feel as thou hast felt; make my soul to glow and melt with the love of Christ my Lord.',
    stabatMaterLatin:
      'Fac, ut ardeat cor meum in amando Christum Deum, ut sibi complaceam.',
  },
  {
    number: 10,
    roman: 'X',
    title: 'Jesus Is Stripped of His Garments',
    postureCue: 'Kneel or genuflect during the Adoration, then stand for the meditation',
    scriptureRef: 'John 19:23–24',
    scriptureText:
      'When the soldiers had crucified Jesus they took His garments and made four parts, one for each soldier; also His tunic. But the tunic was without seam, woven from top to bottom.',
    jerusalemSiteName: 'Chapel of the Franks — Church of the Holy Sepulchre',
    jerusalemQuarter: 'Parvis / Entrance of the Church of the Holy Sepulchre, Jerusalem',
    jerusalemHistoricalNote:
      'The Tenth Station is located at the top of the exterior stone steps of the Chapel of the Franks, immediately to the right of the main entrance of the Church of the Holy Sepulchre, overlooking the ancient courtyard.',
    jerusalemPlaceQuery: 'Chapel of the Franks Church of the Holy Sepulchre Jerusalem',
    jerusalemFallbackQuery: 'Tenth Station of the Cross Holy Sepulchre Jerusalem',
    meditation:
      'Consider the violence with which the executioners stripped Jesus. His inner garments adhered to His torn flesh, and they dragged them off so roughly that the skin came with them. Compassionate your Saviour thus cruelly treated, and say to Him:',
    prayer:
      'My most innocent Jesus, by the merits of the torment Thou hast felt, help me to strip myself of all affection to things of earth, in order that I may place all my love in Thee, who art so worthy of my love.',
    stabatMaterEnglish:
      'Holy Mother! pierce me through; in my heart each wound renew of my Saviour crucified.',
    stabatMaterLatin:
      'Sancta Mater, istud agas, Crucifixi fige plagas cordi meo valide.',
  },
  {
    number: 11,
    roman: 'XI',
    title: 'Jesus Is Nailed to the Cross',
    postureCue: 'Kneel or genuflect during the Adoration, then stand for the meditation',
    scriptureRef: 'Luke 23:33–34',
    scriptureText:
      'And when they came to the place which is called The Skull, there they crucified Him, and the criminals, one on the right and one on the left. And Jesus said, "Father, forgive them; for they know not what they do."',
    jerusalemSiteName: 'Chapel of the Nailing to the Cross — Calvary (Golgotha)',
    jerusalemQuarter: 'Upper Level, Church of the Holy Sepulchre, Jerusalem',
    jerusalemHistoricalNote:
      'Ascending the steep stone staircase inside the Basilica of the Holy Sepulchre leads directly onto the Rock of Golgotha. The Roman Catholic Altar of the Nailing to the Cross marks the Eleventh Station.',
    jerusalemPlaceQuery: 'Calvary Golgotha Church of the Holy Sepulchre Jerusalem',
    jerusalemFallbackQuery: 'Church of the Holy Sepulchre Jerusalem',
    meditation:
      'Consider how Jesus, after being thrown on the Cross, extended His hands, and offered to His Eternal Father the sacrifice of His life for our salvation. Those barbarians fastened Him with nails, and then, raising the Cross, allowed Him to die with anguish on this infamous gibbet.',
    prayer:
      'My Jesus, loaded with contempt, nail my heart to Thy feet, that it may ever remain there, to love Thee and never quit Thee again.',
    stabatMaterEnglish:
      'Let me share with thee His pain, who for all my sins was slain, who for me in torments died.',
    stabatMaterLatin:
      'Tui Nati vulnerati, tam dignati pro me pati, poenas mecum divide.',
  },
  {
    number: 12,
    roman: 'XII',
    title: 'Jesus Dies on the Cross',
    postureCue: 'Kneel in reverent silence for a moment after the Scripture and Meditation',
    scriptureRef: 'John 19:28–30',
    scriptureText:
      'When Jesus had received the vinegar, He said, "It is finished"; and He bowed His head and gave up His spirit.',
    jerusalemSiteName: 'Altar of the Crucifixion — Rock of Golgotha',
    jerusalemQuarter: 'Calvary, Church of the Holy Sepulchre, Jerusalem',
    jerusalemHistoricalNote:
      'Directly beside the Eleventh Station stands the Greek Orthodox Altar of the Crucifixion. Beneath the altar, a silver disk marks the exact socket in the bedrock of Mount Calvary where the Cross of Christ was raised.',
    jerusalemPlaceQuery: 'Golgotha Chapel Church of the Holy Sepulchre Jerusalem',
    jerusalemFallbackQuery: 'Church of the Holy Sepulchre Calvary Jerusalem',
    meditation:
      'Consider how thy Jesus, after three hours’ agony on the Cross, consumed at length with anguish, abandons Himself to the weight of His body, bows His head, and dies.',
    prayer:
      'O my dying Jesus, I kiss devoutly the Cross on which Thou didst die for love of me. I have merited by my sins to die a miserable death; but Thy death is my hope. Ah, by the merits of Thy death, give me grace to die embracing Thy feet, and burning with love for Thee. I commit my soul into Thy hands.',
    stabatMaterEnglish:
      'Let me mingle tears with thee, mourning Him who mourned for me, all the days that I may live.',
    stabatMaterLatin:
      'Fac me tecum pie flere, Crucifixo condolere, donec ego vixero.',
  },
  {
    number: 13,
    roman: 'XIII',
    title: 'Jesus Is Taken Down from the Cross',
    postureCue: 'Kneel or genuflect during the Adoration, then stand for the meditation',
    scriptureRef: 'John 19:38',
    scriptureText:
      'After this Joseph of Arimathea, who was a disciple of Jesus, but secretly, for fear of the Jews, asked Pilate that he might take away the body of Jesus, and Pilate gave him leave. So he came and took away His body.',
    jerusalemSiteName: 'Altar of Our Lady of Sorrows & Stone of Anointing',
    jerusalemQuarter: 'Church of the Holy Sepulchre, Jerusalem',
    jerusalemHistoricalNote:
      'Located between the Roman Catholic and Greek Orthodox altars on Calvary is the small Franciscan Altar of the Stabat Mater (Our Lady of Sorrows), while at the foot of the stairs rests the Stone of Anointing where Christ’s body was prepared for burial.',
    jerusalemPlaceQuery: 'Stone of Anointing Church of the Holy Sepulchre Jerusalem',
    jerusalemFallbackQuery: 'Church of the Holy Sepulchre Jerusalem',
    meditation:
      'Consider how, after the death of our Lord, two of His disciples, Joseph and Nicodemus, took Him down from the Cross, and placed Him in the arms of His afflicted Mother, who received Him with unutterable tenderness, and pressed Him to her bosom.',
    prayer:
      'O Mother of sorrow, for the love of this Son, accept me for thy servant, and pray to Him for me. And Thou, my Redeemer, since Thou hast died for me, permit me to love Thee; for I wish but Thee, and nothing more.',
    stabatMaterEnglish:
      'By the Cross with thee to stay, there with thee to weep and pray, is all I ask of thee to give.',
    stabatMaterLatin:
      'Juxta Crucem tecum stare, et me tibi sociare in planctu desidero.',
  },
  {
    number: 14,
    roman: 'XIV',
    title: 'Jesus Is Placed in the Sepulchre',
    postureCue: 'Kneel or genuflect during the Adoration, then stand for the meditation',
    scriptureRef: 'John 19:41–42',
    scriptureText:
      'Now in the place where He was crucified there was a garden, and in the garden a new tomb where no one had ever been laid. So because of the Jewish day of Preparation, as the tomb was close at hand, they laid Jesus there.',
    jerusalemSiteName: 'The Edicule — The Holy Sepulchre (Tomb of Christ)',
    jerusalemQuarter: 'Rotunda of the Anastasis, Church of the Holy Sepulchre, Jerusalem',
    jerusalemHistoricalNote:
      'Beneath the great dome of the Anastasis (Resurrection) stands the Edicule, enshrining the rock-cut tomb where Joseph of Arimathea laid the body of Jesus—and from which He rose triumphantly on the third day.',
    jerusalemPlaceQuery: 'Aedicule Church of the Holy Sepulchre Jerusalem',
    jerusalemFallbackQuery: 'Tomb of Jesus Church of the Holy Sepulchre Jerusalem',
    meditation:
      'Consider how the disciples carried the body of Jesus to bury it, accompanied by His holy Mother, who arranged it in the sepulchre with her own hands. They then closed the tomb, and all withdrew.',
    prayer:
      'Ah, my buried Jesus, I kiss the stone that encloses Thee. But Thou didst rise again the third day. I beseech Thee, by Thy Resurrection, make me rise glorious with Thee at the last day, to be always united with Thee in heaven, to praise Thee and love Thee forever.',
    stabatMaterEnglish:
      'Virgin of all virgins blest! Listen to my fond request: let me share thy grief divine.',
    stabatMaterLatin:
      'Virgo virginum praeclara, mihi jam non sis amara, fac me tecum plangere.',
  },
];
