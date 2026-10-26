import { RosaryMysteryGroup, RosaryMysterySet, RosaryBeadStep } from '../types';

export const ROSARY_MYSTERY_SETS: Record<RosaryMysteryGroup, RosaryMysterySet> = {
  Joyful: {
    type: 'Joyful',
    title: 'The Joyful Mysteries',
    traditionalDays: 'Mondays and Saturdays (and Sundays in Advent and Christmastide)',
    description: 'Contemplating the Incarnation of the Son of God, from the Annunciation to His Finding in the Temple.',
    mysteries: [
      {
        number: 1,
        name: 'The Annunciation of the Lord',
        scriptureCitation: 'Luke 1:28, 38',
        scriptureText: 'The angel Gabriel said to Mary: "Hail, full of grace, the Lord is with you!" And Mary said: "Behold, I am the handmaid of the Lord; let it be to me according to your word."',
        meditation: 'Let us contemplate the sublime humility of the Blessed Virgin Mary in accepting the call to become the Mother of God, and the immense love of the Word becoming flesh.',
        fruitOfTheMystery: 'Humility'
      },
      {
        number: 2,
        name: 'The Visitation of Mary to Elizabeth',
        scriptureCitation: 'Luke 1:41-42',
        scriptureText: 'When Elizabeth heard the greeting of Mary, the babe leaped in her womb; and Elizabeth was filled with the Holy Spirit and exclaimed: "Blessed are you among women, and blessed is the fruit of your womb!"',
        meditation: 'Let us contemplate Mary\'s selfless charity in traveling into the hill country of Judea to serve her cousin Elizabeth, carrying the unborn Savior in her womb.',
        fruitOfTheMystery: 'Love of Neighbor and Fraternal Charity'
      },
      {
        number: 3,
        name: 'The Nativity of the Lord (Birth of Jesus)',
        scriptureCitation: 'Luke 2:7',
        scriptureText: 'And she gave birth to her firstborn son and wrapped him in swaddling cloths, and laid him in a manger, because there was no place for them in the inn.',
        meditation: 'Let us contemplate the poverty of the cave of Bethlehem, where the Creator of heaven and earth was born in a lowly stable for our salvation.',
        fruitOfTheMystery: 'Poverty of Spirit and Detachment from Earthly Goods'
      },
      {
        number: 4,
        name: 'The Presentation of the Child Jesus in the Temple',
        scriptureCitation: 'Luke 2:22-23, 34-35',
        scriptureText: 'Simeon took him up in his arms and blessed God... and said to Mary his mother: "Behold, this child is set for the fall and rising of many in Israel... and a sword will pierce through your own soul also."',
        meditation: 'Let us contemplate Mary and Joseph obeying the Law of God, offering Jesus to the Father, and accepting Simeon\'s prophecy of the sword of sorrow.',
        fruitOfTheMystery: 'Obedience and Purity of Mind and Body'
      },
      {
        number: 5,
        name: 'The Finding of Jesus in the Temple',
        scriptureCitation: 'Luke 2:46, 49',
        scriptureText: 'After three days they found him in the temple, sitting among the teachers, listening to them and asking them questions... And he said to them: "Did you not know that I must be in my Father\'s house?"',
        meditation: 'Let us contemplate Mary and Joseph\'s sorrow in losing Jesus, and their holy joy in finding Him in the Temple doing the Father\'s will.',
        fruitOfTheMystery: 'Joy in Finding Christ and Piety'
      }
    ]
  },
  Sorrowful: {
    type: 'Sorrowful',
    title: 'The Sorrowful Mysteries',
    traditionalDays: 'Tuesdays and Fridays (and Sundays during Lent)',
    description: 'Contemplating the bitter Passion and Death of Our Lord Jesus Christ on Calvary for the redemption of the world.',
    mysteries: [
      {
        number: 1,
        name: 'The Agony in the Garden of Gethsemane',
        scriptureCitation: 'Matthew 26:39; Luke 22:44',
        scriptureText: 'And being in an agony he prayed more earnestly; and his sweat became like great drops of blood falling down upon the ground. And he said: "My Father, if it be possible, let this chalice pass from me; nevertheless, not as I will, but as you will."',
        meditation: 'Let us contemplate Jesus weighed down by the sins of all humanity in the Garden of Olives, sweating blood and submitting completely to the Father\'s will.',
        fruitOfTheMystery: 'Contrition for Sins and Conformity to God\'s Will'
      },
      {
        number: 2,
        name: 'The Scourging at the Pillar',
        scriptureCitation: 'John 19:1; Isaiah 53:5',
        scriptureText: 'Then Pilate took Jesus and scourged him... "He was wounded for our transgressions, he was bruised for our iniquities; upon him was the chastisement that made us whole, and with his stripes we are healed."',
        meditation: 'Let us contemplate Jesus bound to the stone pillar, bearing cruel lacerations on His sacred flesh to make reparation for sins of impurity and sensual indulgence.',
        fruitOfTheMystery: 'Mortification of the Senses and Purity'
      },
      {
        number: 3,
        name: 'The Crowning with Thorns',
        scriptureCitation: 'Matthew 27:28-29',
        scriptureText: 'And stripping him they put a scarlet cloak upon him, and plaiting a crown of thorns they put it on his head, and put a reed in his right hand. And kneeling before him they mocked him, saying: "Hail, King of the Jews!"',
        meditation: 'Let us contemplate the King of Kings mocked, spit upon, and crowned with sharp brambles to expiate our sins of pride, vanity, and arrogant thoughts.',
        fruitOfTheMystery: 'Moral Courage and Humility'
      },
      {
        number: 4,
        name: 'The Carrying of the Cross to Calvary',
        scriptureCitation: 'John 19:17; Luke 23:26',
        scriptureText: 'And bearing his own cross, he went out to the place which is called in Hebrew Golgotha... As they led him away, they seized one Simon of Cyrene, who was coming in from the country, and laid on him the cross, to carry it behind Jesus.',
        meditation: 'Let us contemplate Jesus carrying the crushing weight of the wood of the Cross, falling repeatedly, and meeting His sorrowful Mother on the Via Dolorosa.',
        fruitOfTheMystery: 'Patience in Bearing Crosses'
      },
      {
        number: 5,
        name: 'The Crucifixion and Death of Jesus',
        scriptureCitation: 'Luke 23:34, 46; John 19:30',
        scriptureText: 'Jesus said: "Father, forgive them; for they know not what they do." ...Then Jesus, crying with a loud voice, said: "Father, into your hands I commit my spirit!" And having said this he breathed his last.',
        meditation: 'Let us contemplate Jesus nailed to the Cross, hanging for three hours between heaven and earth, offering Himself to the Father as the supreme sacrifice for our eternal salvation.',
        fruitOfTheMystery: 'Pardon of Enemies and Salvation of Souls'
      }
    ]
  },
  Glorious: {
    type: 'Glorious',
    title: 'The Glorious Mysteries',
    traditionalDays: 'Wednesdays and Sundays (outside Advent, Lent, and Eastertide)',
    description: 'Contemplating Christ\'s triumph over death, His Ascension, the descent of the Holy Spirit, and Mary\'s Coronation in heaven.',
    mysteries: [
      {
        number: 1,
        name: 'The Resurrection of the Lord',
        scriptureCitation: 'Matthew 28:5-6; Mark 16:6',
        scriptureText: 'The angel said to the women: "Do not be amazed; you seek Jesus of Nazareth, who was crucified. He is risen, he is not here; see the place where they laid him."',
        meditation: 'Let us contemplate Jesus rising glorious and immortal from the sealed tomb on the third day, conquering sin and death forever.',
        fruitOfTheMystery: 'Faith'
      },
      {
        number: 2,
        name: 'The Ascension of the Lord into Heaven',
        scriptureCitation: 'Acts 1:9, 11; Mark 16:19',
        scriptureText: 'As they were looking on, he was lifted up, and a cloud took him out of their sight... "This Jesus, who was taken up from you into heaven, will come in the same way as you saw him go into heaven."',
        meditation: 'Let us contemplate Jesus ascending into heaven in the presence of His disciples, taking His seat at the right hand of the Father.',
        fruitOfTheMystery: 'Christian Hope and Desire for Heaven'
      },
      {
        number: 3,
        name: 'The Descent of the Holy Spirit at Pentecost',
        scriptureCitation: 'Acts 2:1-4',
        scriptureText: 'When the day of Pentecost had come, they were all together in one place... And there appeared to them tongues as of fire, distributed and resting on each one of them. And they were all filled with the Holy Spirit.',
        meditation: 'Let us contemplate the Holy Spirit descending upon the Apostles gathered in prayer with Mary in the Upper Room, giving them zeal to convert the nations.',
        fruitOfTheMystery: 'Love of God and Zeal for Souls'
      },
      {
        number: 4,
        name: 'The Assumption of the Blessed Virgin Mary',
        scriptureCitation: 'Revelation 12:1; Psalm 45:10',
        scriptureText: 'A great sign appeared in heaven: a woman clothed with the sun, with the moon under her feet, and on her head a crown of twelve stars.',
        meditation: 'Let us contemplate Mary, preserved immune from all stain of original sin, assumed body and soul into heavenly glory at the end of her earthly life.',
        fruitOfTheMystery: 'Grace of a Happy Death and Devotion to Mary'
      },
      {
        number: 5,
        name: 'The Coronation of Mary as Queen of Heaven and Earth',
        scriptureCitation: 'Revelation 12:1; Judith 15:9',
        scriptureText: 'You are the exaltation of Jerusalem, you are the great glory of Israel, you are the great pride of our nation!... You have done great things with your own hand; God has been pleased with them.',
        meditation: 'Let us contemplate the Blessed Virgin Mary crowned by the Most Holy Trinity as Queen of angels and saints, interceding ceaselessly for her children on earth.',
        fruitOfTheMystery: 'Trust in Mary\'s Intercession and Final Perseverance'
      }
    ]
  },
  Luminous: {
    type: 'Luminous',
    title: 'The Luminous Mysteries (Mysteries of Light)',
    traditionalDays: 'Thursdays',
    description: 'Instituted by Pope St. John Paul II in 2002 to contemplate Christ\'s public ministry as the Light of the World.',
    mysteries: [
      {
        number: 1,
        name: 'The Baptism of Jesus in the Jordan',
        scriptureCitation: 'Matthew 3:16-17',
        scriptureText: 'And when Jesus was baptized, he went up immediately from the water, and behold, the heavens were opened and he saw the Spirit of God descending like a dove, and alighting on him; and lo, a voice from heaven, saying: "This is my beloved Son, with whom I am well pleased."',
        meditation: 'Let us contemplate the voice of the Father and the descent of the Holy Spirit revealing Christ as the Messiah at His baptism.',
        fruitOfTheMystery: 'Openness to the Holy Spirit and Baptismal Promises'
      },
      {
        number: 2,
        name: 'The Wedding Feast at Cana',
        scriptureCitation: 'John 2:5, 11',
        scriptureText: 'His mother said to the servants: "Do whatever he tells you." ...This, the first of his signs, Jesus did at Cana in Galilee, and manifested his glory; and his disciples believed in him.',
        meditation: 'Let us contemplate Christ transforming water into choice wine at the request of His Mother, sanctifying holy matrimony and revealing His glory.',
        fruitOfTheMystery: 'To Jesus Through Mary and Fidelity'
      },
      {
        number: 3,
        name: 'The Proclamation of the Kingdom and Call to Conversion',
        scriptureCitation: 'Mark 1:14-15; Matthew 5:1-3',
        scriptureText: 'Jesus came into Galilee, preaching the gospel of God, and saying: "The time is fulfilled, and the kingdom of God is at hand; repent, and believe in the gospel."',
        meditation: 'Let us contemplate Christ preaching the Beatitudes, forgiving sins, and calling all souls to repentance and faith in the Gospel.',
        fruitOfTheMystery: 'Repentance and Trust in God'
      },
      {
        number: 4,
        name: 'The Transfiguration on Mount Tabor',
        scriptureCitation: 'Matthew 17:1-2, 5',
        scriptureText: 'And he was transfigured before them, and his face shone like the sun, and his garments became white as light... A bright cloud overshadowed them, and a voice from the cloud said: "This is my beloved Son, with whom I am well pleased; listen to him."',
        meditation: 'Let us contemplate the radiant divinity of Christ revealed to Peter, James, and John, fortifying them to face the scandal of the Cross.',
        fruitOfTheMystery: 'Desire for Holiness and Contemplation'
      },
      {
        number: 5,
        name: 'The Institution of the Holy Eucharist',
        scriptureCitation: 'Matthew 26:26-28; 1 Corinthians 11:23-25',
        scriptureText: 'Jesus took bread, and blessed, and broke it, and gave it to the disciples and said: "Take, eat; this is my body." And he took a cup, and when he had given thanks he gave it to them, saying: "Drink of it, all of you; for this is my blood of the covenant, which is poured out for many for the forgiveness of sins."',
        meditation: 'Let us contemplate Christ at the Last Supper giving us His true Body and Blood in the Holy Eucharist and instituting the ministerial Priesthood.',
        fruitOfTheMystery: 'Eucharistic Adoration and Reverence'
      }
    ]
  }
};

/**
 * Automatically determine today's traditional mystery based on day of week
 */
export function getTodaysMysteryGroup(): RosaryMysteryGroup {
  const day = new Date().getDay(); // 0 is Sunday, 1 Monday, 2 Tuesday, 3 Wednesday, 4 Thursday, 5 Friday, 6 Saturday
  if (day === 1 || day === 6) return 'Joyful'; // Mon, Sat
  if (day === 2 || day === 5) return 'Sorrowful'; // Tue, Fri
  if (day === 4) return 'Luminous'; // Thu
  return 'Glorious'; // Wed, Sun
}

/**
 * Builds the complete sequence of beads/steps for a 5-decade Rosary
 */
export function generateRosaryBeadsSequence(mysteryGroup: RosaryMysteryGroup): RosaryBeadStep[] {
  const mysteries = ROSARY_MYSTERY_SETS[mysteryGroup].mysteries;
  const steps: RosaryBeadStep[] = [];
  let index = 0;

  // Step 1: Sign of the Cross
  steps.push({
    stepIndex: index++,
    decadeIndex: 0,
    prayerName: 'Sign of the Cross',
    latinName: 'Signum Crucis',
    prayerText: 'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.',
    instruction: 'Hold the Crucifix and make the Sign of the Cross.'
  });

  // Step 2: Apostles' Creed
  steps.push({
    stepIndex: index++,
    decadeIndex: 0,
    prayerName: 'The Apostles\' Creed',
    latinName: 'Symbolum Apostolorum',
    prayerText: `I believe in God, the Father Almighty, Creator of heaven and earth, and in Jesus Christ, His only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died and was buried; He descended into hell; on the third day He rose again from the dead; He ascended into heaven, and is seated at the right hand of God the Father Almighty; from there He will come to judge the living and the dead. I believe in the Holy Spirit, the holy catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.`,
    instruction: 'On the Crucifix, profess the Catholic faith.'
  });

  // Step 3: Our Father on the first large bead
  steps.push({
    stepIndex: index++,
    decadeIndex: 0,
    prayerName: 'Our Father',
    latinName: 'Pater Noster',
    prayerText: `Our Father, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.`,
    instruction: 'On the first large bead, pray for the intentions of the Holy Father.'
  });

  // Steps 4, 5, 6: Three Hail Marys (Faith, Hope, Charity)
  const virtues = ['an increase of Faith', 'an increase of Hope', 'an increase of Charity'];
  for (let i = 0; i < 3; i++) {
    steps.push({
      stepIndex: index++,
      decadeIndex: 0,
      beadInDecade: i + 1,
      prayerName: `Hail Mary (for ${virtues[i]})`,
      latinName: 'Ave Maria',
      prayerText: `Hail Mary, full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.`,
      instruction: `On the ${i === 0 ? 'first' : i === 1 ? 'second' : 'third'} small bead, pray for ${virtues[i]}.`
    });
  }

  // Step 7: Glory Be
  steps.push({
    stepIndex: index++,
    decadeIndex: 0,
    prayerName: 'Glory Be',
    latinName: 'Gloria Patri',
    prayerText: `Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.`,
    instruction: 'Praise the Holy Trinity.'
  });

  // Steps for each of the 5 decades
  for (let d = 0; d < 5; d++) {
    const mystery = mysteries[d];

    // Decade Announcement and Our Father (Large Bead)
    steps.push({
      stepIndex: index++,
      decadeIndex: d + 1,
      prayerName: `Decade ${d + 1}: ${mystery.name} (Our Father)`,
      mysteryName: mystery.name,
      fruit: mystery.fruitOfTheMystery,
      prayerText: `Our Father, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.`,
      instruction: `Announce the ${mystery.number}st/nd/rd/th Mystery: "${mystery.name}". Fruit: ${mystery.fruitOfTheMystery}. Scripture: ${mystery.scriptureCitation}. Pray the Our Father on the large bead.`
    });

    // 10 Hail Marys
    for (let h = 1; h <= 10; h++) {
      steps.push({
        stepIndex: index++,
        decadeIndex: d + 1,
        beadInDecade: h,
        mysteryName: mystery.name,
        fruit: mystery.fruitOfTheMystery,
        prayerName: `Decade ${d + 1} - Hail Mary (${h} of 10)`,
        latinName: 'Ave Maria',
        prayerText: `Hail Mary, full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.`,
        instruction: `Decade ${d + 1}, Bead ${h}/10. Contemplate ${mystery.name}: "${mystery.meditation}"`
      });
    }

    // Glory Be at the end of decade
    steps.push({
      stepIndex: index++,
      decadeIndex: d + 1,
      mysteryName: mystery.name,
      prayerName: `Decade ${d + 1} - Glory Be`,
      latinName: 'Gloria Patri',
      prayerText: `Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.`,
      instruction: 'Conclude the decade with the Glory Be.'
    });

    // Fatima Prayer (O My Jesus)
    steps.push({
      stepIndex: index++,
      decadeIndex: d + 1,
      mysteryName: mystery.name,
      prayerName: `Decade ${d + 1} - Fatima Prayer`,
      prayerText: `O my Jesus, forgive us our sins, save us from the fires of hell, lead all souls to heaven, especially those who have most need of Thy mercy. Amen.`,
      instruction: 'Pray the Fatima prayer requested by Our Lady in 1917.'
    });
  }

  // Concluding Prayers: Hail Holy Queen
  steps.push({
    stepIndex: index++,
    decadeIndex: 6,
    prayerName: 'Hail, Holy Queen',
    latinName: 'Salve Regina',
    prayerText: `Hail, holy Queen, Mother of mercy, our life, our sweetness, and our hope. To thee do we cry, poor banished children of Eve. To thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious advocate, thine eyes of mercy toward us, and after this our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary. Pray for us, O holy Mother of God, that we may be made worthy of the promises of Christ.`,
    instruction: 'Pray the Salve Regina.'
  });

  // Concluding Rosary Collect
  steps.push({
    stepIndex: index++,
    decadeIndex: 6,
    prayerName: 'Concluding Rosary Prayer',
    prayerText: `O God, whose only begotten Son, by His life, death, and resurrection, has purchased for us the rewards of eternal life, grant, we beseech Thee, that meditating upon these mysteries of the Most Holy Rosary of the Blessed Virgin Mary, we may imitate what they contain and obtain what they promise, through the same Christ our Lord. Amen.
May the divine assistance remain always with us. And may the souls of the faithful departed, through the mercy of God, rest in peace. Amen.`,
    instruction: 'Final Collect and Sign of the Cross.'
  });

  return steps;
}

export interface MarianRosaryPromise {
  number: number;
  title: string;
  promise: string;
  theologicalContext: string;
}

/**
 * The 15 Promises of the Blessed Virgin Mary to Christians who recite the Rosary,
 * as revealed to Saint Dominic and Blessed Alan de la Roche,
 * and documented by Saint Louis-Marie Grignion de Montfort in 'The Secret of the Rosary'.
 */
export const MARIAN_ROSARY_PROMISES: MarianRosaryPromise[] = [
  {
    number: 1,
    title: 'Signal Graces of Heaven',
    promise: 'Whoever shall faithfully serve me by the recitation of the Rosary, shall receive signal graces.',
    theologicalContext: 'Signal graces are extraordinary lights, divine intuitions, and holy inspirations guiding the soul through discernment and spiritual trials.'
  },
  {
    number: 2,
    title: 'Special Protection and Greatest Graces',
    promise: 'I promise my special protection and the greatest graces to all those who shall recite the Rosary.',
    theologicalContext: 'The Blessed Virgin surrounds devotees with her maternal shield against sudden perils and spiritual enemies.'
  },
  {
    number: 3,
    title: 'Armor Against Hell and Defeat of Vice',
    promise: 'The Rosary shall be a powerful armor against hell; it will destroy vice, decrease sin, and defeat heresies.',
    theologicalContext: 'Contemplation of Christ’s Incarnation and Passion roots out worldly affections and crushes demonic pride.'
  },
  {
    number: 4,
    title: 'Flourishing Virtue and Divine Mercy',
    promise: 'It will cause virtue and good works to flourish; it will obtain for souls the abundant mercy of God; it will withdraw the hearts of men from the love of the world and its vanities, and lift them to the desire of eternal things. Oh, that souls would sanctify themselves by this means.',
    theologicalContext: 'The repetitive rhythm of the angelic salutation quiets earthly passions, reorienting the heart to heavenly treasures.'
  },
  {
    number: 5,
    title: 'Preservation from Eternal Peril',
    promise: 'The soul which recommends itself to me by the recitation of the Rosary, shall not perish.',
    theologicalContext: 'True devotion to the Mother of God ensures her ceaseless maternal advocacy at the judgment seat of Christ.'
  },
  {
    number: 6,
    title: 'Freedom from Misfortune and Unprovided Death',
    promise: 'Whoever shall recite the Rosary devoutly, applying himself to the consideration of its sacred mysteries, shall never be conquered by misfortune. God will not chastise him in His justice, he shall not perish by an unprovided death; if he be just he shall remain in the grace of God, and become worthy of eternal life.',
    theologicalContext: 'Devout meditation preserves the Christian in habitual sanctifying grace and provides peaceful passage to eternal life.'
  },
  {
    number: 7,
    title: 'Sacramental Viaticum at Death',
    promise: 'Whoever shall have a true devotion for the Rosary shall not die without the Sacraments of the Church.',
    theologicalContext: 'Our Lady obtains the grace of final Confession, Anointing of the Sick, and the Holy Viaticum.'
  },
  {
    number: 8,
    title: 'Light of God and Fellowship with Saints',
    promise: 'Those who are faithful to recite the Rosary shall have during their life and at their death the light of God and the plenitude of His graces; at the moment of death they shall participate in the merits of the saints in paradise.',
    theologicalContext: 'A radiant infusion of supernatural faith consoles the soul in its final agony in communion with the whole Church triumphant.'
  },
  {
    number: 9,
    title: 'Speedy Deliverance from Purgatory',
    promise: 'I shall deliver from purgatory those who have been devoted to the Rosary.',
    theologicalContext: 'The Mother of Mercy descends into the fires of Purgatory to console and swiftly liberate her devoted children.'
  },
  {
    number: 10,
    title: 'High Degree of Heavenly Glory',
    promise: 'The faithful children of the Rosary shall merit a high degree of glory in heaven.',
    theologicalContext: 'Because they meditated daily on Christ’s humility and cross, they shall share closely in His eternal exaltation.'
  },
  {
    number: 11,
    title: 'Fulfillment of Righteous Petitions',
    promise: 'You shall obtain all you ask of me by the recitation of the Rosary.',
    theologicalContext: 'Whatever conforms to the salvation of the soul and God’s holy will is granted through Mary’s omnipotent supplication.'
  },
  {
    number: 12,
    title: 'Aid in Every Necessity for Apostles of the Rosary',
    promise: 'All those who propagate the holy Rosary shall be aided by me in their necessities.',
    theologicalContext: 'Those who lead others to pray the Rosary find in Mary an unfailing helper in temporal and spiritual wants.'
  },
  {
    number: 13,
    title: 'Intercession of the Entire Celestial Court',
    promise: 'I have obtained from my Divine Son that all the advocates of the Rosary shall have for intercessors the entire celestial court during their life and at the hour of death.',
    theologicalContext: 'The Angels, Apostles, Martyrs, and all Saints join their prayers with the devotee who honors the Queen of Heaven.'
  },
  {
    number: 14,
    title: 'Spiritual Brotherhood with Jesus Christ',
    promise: 'All who recite the Rosary are my children, and brothers and sisters of my only Son, Jesus Christ.',
    theologicalContext: 'Reciting the Psalter of Mary binds the believer into the intimate family circle of the Holy Family of Nazareth.'
  },
  {
    number: 15,
    title: 'A Sure Sign of Predestination',
    promise: 'Devotion of my Rosary is a great sign of predestination.',
    theologicalContext: 'St. Louis-Marie de Montfort notes that persistent, persevering love for the Rosary is a moral certainty of heavenly election.'
  }
];
