export interface DivineMercyStep {
  stepIndex: number;
  decadeIndex: number; // 0 for intro, 1-5 for decades, 6 for conclusion
  prayerName: string;
  prayerText: string;
  instruction: string;
  countLabel?: string;
}

export const DIVINE_MERCY_OPENING_PRAYERS = {
  hourOfMercyTitle: 'The 3:00 PM Hour of Great Mercy',
  hourOfMercyIntro: 'At three o\'clock, implore My mercy, especially for sinners; and, if only for a brief moment, immerse yourself in My Passion, particularly in My abandonment at the moment of agony. This is the hour of great mercy for the whole world. (Diary 1320)',
  youExpiredJesus: `You expired, Jesus, but the source of life gushed forth for souls, and the ocean of mercy opened up for the whole world. O Fount of Life, unfathomable Divine Mercy, envelop the whole world and empty Yourself out upon us.`,
  bloodAndWater: `O Blood and Water, which gushed forth from the Heart of Jesus as a fount of mercy for us, I trust in You! (Repeat 3 times)`
};

export const DIVINE_MERCY_DECADE_PRAYERS = {
  eternalFather: `Eternal Father, I offer you the Body and Blood, Soul and Divinity of Your Dearly Beloved Son, Our Lord, Jesus Christ, in atonement for our sins and those of the whole world.`,
  sorrowfulPassion: `For the sake of His sorrowful Passion, have mercy on us and on the whole world.`,
  holyGod: `Holy God, Holy Mighty One, Holy Immortal One, have mercy on us and on the whole world. (Prayed 3 times)`,
  closingPrayer: `Eternal God, in whom mercy is endless and the treasury of compassion inexhaustible, look kindly upon us and increase Your mercy in us, that in difficult moments we might not despair nor become despondent, but with great confidence submit ourselves to Your holy will, which is Love and Mercy itself. Amen.`,
  jesusITrustInYou: `Jesus, I trust in You! (Repeat 3 times)`
};

export function generateDivineMercySequence(): DivineMercyStep[] {
  const steps: DivineMercyStep[] = [];
  let index = 0;

  // Step 1: Sign of the Cross
  steps.push({
    stepIndex: index++,
    decadeIndex: 0,
    prayerName: 'Sign of the Cross',
    prayerText: 'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.',
    instruction: 'Hold the Crucifix and make the Sign of the Cross.'
  });

  // Step 2: Opening Prayer (You expired, Jesus)
  steps.push({
    stepIndex: index++,
    decadeIndex: 0,
    prayerName: 'Opening Prayer: You Expired, Jesus',
    prayerText: DIVINE_MERCY_OPENING_PRAYERS.youExpiredJesus,
    instruction: 'Immerse your soul in the 3:00 PM Hour of Divine Mercy.'
  });

  // Step 3: O Blood and Water (3x)
  steps.push({
    stepIndex: index++,
    decadeIndex: 0,
    prayerName: 'O Blood and Water (3 times)',
    prayerText: `O Blood and Water, which gushed forth from the Heart of Jesus as a fount of mercy for us, I trust in You!
O Blood and Water, which gushed forth from the Heart of Jesus as a fount of mercy for us, I trust in You!
O Blood and Water, which gushed forth from the Heart of Jesus as a fount of mercy for us, I trust in You!`,
    instruction: 'Pray the triple ejaculation revealed to St. Faustina.'
  });

  // Step 4: Our Father
  steps.push({
    stepIndex: index++,
    decadeIndex: 0,
    prayerName: 'Our Father',
    prayerText: 'Our Father, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
    instruction: 'On the first bead, pray the Lord\'s Prayer.'
  });

  // Step 5: Hail Mary
  steps.push({
    stepIndex: index++,
    decadeIndex: 0,
    prayerName: 'Hail Mary',
    prayerText: 'Hail Mary, full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
    instruction: 'On the second bead, ask the Mother of Mercy for her intercession.'
  });

  // Step 6: Apostles\' Creed
  steps.push({
    stepIndex: index++,
    decadeIndex: 0,
    prayerName: 'The Apostles\' Creed',
    prayerText: `I believe in God, the Father Almighty, Creator of heaven and earth, and in Jesus Christ, His only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died and was buried; He descended into hell; on the third day He rose again from the dead; He ascended into heaven, and is seated at the right hand of God the Father Almighty; from there He will come to judge the living and the dead. I believe in the Holy Spirit, the holy catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.`,
    instruction: 'On the third bead, profess the Catholic faith.'
  });

  // Decades 1 to 5
  for (let d = 1; d <= 5; d++) {
    // Large Bead: Eternal Father
    steps.push({
      stepIndex: index++,
      decadeIndex: d,
      prayerName: `Decade ${d}: Eternal Father (Large Bead)`,
      prayerText: DIVINE_MERCY_DECADE_PRAYERS.eternalFather,
      instruction: `Decade ${d}: Offer the sacrifice of the Son to the Heavenly Father.`
    });

    // 10 Small Beads: Sorrowful Passion
    for (let b = 1; b <= 10; b++) {
      steps.push({
        stepIndex: index++,
        decadeIndex: d,
        prayerName: `Decade ${d} - Bead ${b} of 10`,
        countLabel: `${b}/10`,
        prayerText: DIVINE_MERCY_DECADE_PRAYERS.sorrowfulPassion,
        instruction: `Decade ${d}, Bead ${b}/10: Implore divine mercy for the whole world.`
      });
    }
  }

  // Holy God (Trisagion) 3x
  steps.push({
    stepIndex: index++,
    decadeIndex: 6,
    prayerName: 'Concluding Doxology: Holy God (3 times)',
    prayerText: `Holy God, Holy Mighty One, Holy Immortal One, have mercy on us and on the whole world.
Holy God, Holy Mighty One, Holy Immortal One, have mercy on us and on the whole world.
Holy God, Holy Mighty One, Holy Immortal One, have mercy on us and on the whole world.`,
    instruction: 'Bow reverently and pray the ancient Trisagion three times.'
  });

  // Closing Prayer
  steps.push({
    stepIndex: index++,
    decadeIndex: 6,
    prayerName: 'Closing Prayer and Ejaculation',
    prayerText: `${DIVINE_MERCY_DECADE_PRAYERS.closingPrayer}

Jesus, I trust in You!
Jesus, I trust in You!
Jesus, I trust in You!

Saint Faustina, pray for us.
Saint John Paul II, pray for us.
In the name of the Father, and of the Son, and of the Holy Spirit. Amen.`,
    instruction: 'Conclude the Chaplet with trust in Divine Mercy.'
  });

  return steps;
}
