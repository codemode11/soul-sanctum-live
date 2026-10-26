import { Novena, UserNovenaProgress } from '../types';

export const NOVENAS_DATABASE: Novena[] = [
  {
    id: 'novena-st-jude',
    title: 'Novena to Saint Jude Thaddaeus',
    subtitle: 'Patron of Desperate Cases and Lost Causes',
    patronOrSubject: 'Saint Jude Thaddaeus, Apostle and Martyr',
    associatedFeast: 'Feast of Sts. Simon and Jude (October 28)',
    traditionalStartDate: '10-19',
    traditionalFeastDate: '10-28',
    category: 'Saints',
    description: 'Traditionally prayed from October 19 through October 27, concluding on the vigil of St. Jude\'s feast day on October 28. Also prayed any time a soul faces an impossible trial, severe illness, or legal or financial distress.',
    intentionsSuggestion: 'Pray for seemingly hopeless situations, grave illness, difficult family reconciliation, or impossible obstacles.',
    closingPrayer: `May the Most Sacred Heart of Jesus be adored, and loved in all the tabernacles until the end of time. Amen.
May the most Sacred Heart of Jesus be praised and glorified now and forever. Amen.
St. Jude, pray for us and hear our prayers. Amen.
Blessed be the Sacred Heart of Jesus.
Blessed be the Immaculate Heart of Mary.
Blessed be Saint Jude Thaddaeus, in all the world and for all eternity. Our Father... Hail Mary... Glory Be...`,
    days: [
      {
        dayNumber: 1,
        theme: 'Faith in God\'s Power in Desperation',
        scriptureVerse: 'Mark 11:24: "Therefore I tell you, whatever you ask in prayer, believe that you have received it, and it will be yours."',
        prayerText: `O holy Apostle, Saint Jude, faithful servant and friend of Jesus! The Church honors and invokes you universally as the patron of hopeless cases and things almost despaired of. Pray for me, I am so helpless and alone. Intercede with God that He bring visible and speedy help where help is almost despaired of. Come to my assistance in this great need, that I may receive the consolation and help of heaven in all my necessities, tribulations, and sufferings, particularly (mention your intention).`,
        intentionsFocus: 'A deeper faith that God can make a way where humanly there is no way.'
      },
      {
        dayNumber: 2,
        theme: 'Perseverance in the Midst of Trials',
        scriptureVerse: 'Romans 12:12: "Rejoice in hope, be patient in tribulation, be constant in prayer."',
        prayerText: `Saint Jude, you witnessed the power of Jesus during His earthly ministry and endured trials to proclaim His holy name. When darkness seems to surround my life and despair tempts my heart, grant me the courage to persevere. Stand by me, holy Apostle, and ask Our Lord to grant me light in this darkness and relief in this trial (mention your intention).`,
        intentionsFocus: 'Strength not to lose heart when waiting for God\'s timing.'
      },
      {
        dayNumber: 3,
        theme: 'Confidence in Divine Mercy',
        scriptureVerse: 'Psalm 130:7: "O Israel, hope in the Lord! For with the Lord there is steadfast love, and with him is plentiful redemption."',
        prayerText: `Saint Jude, apostle of Christ, you learned at the feet of the Divine Master how tender and merciful the Heart of Jesus is. Look upon my weakness and my shortcomings. Do not allow my sins to separate me from the abundance of Christ\'s mercy. Through your powerful intercession, present my petition to the throne of God (mention your intention).`,
        intentionsFocus: 'Trust that God\'s mercy is infinitely larger than our past mistakes.'
      },
      {
        dayNumber: 4,
        theme: 'Courage to Stand for the Truth',
        scriptureVerse: 'Epistle of St. Jude 1:20-21: "Build yourselves up in your most holy faith; pray in the Holy Spirit; keep yourselves in the love of God."',
        prayerText: `Holy Saint Jude, you wrote in your epistle urging the faithful to contend earnestly for the faith once delivered to the saints. In a world fraught with confusion and doubt, help me to keep my eyes fixed on Jesus. Pray that my soul may be anchored in the Truth, and obtain for me the special favor I now ask (mention your intention).`,
        intentionsFocus: 'Courage to live and profess the Catholic faith with steadfast integrity.'
      },
      {
        dayNumber: 5,
        theme: 'Peace of Soul and Resignation to God\'s Will',
        scriptureVerse: 'Philippians 4:6-7: "Do not be anxious about anything... and the peace of God which surpasses all understanding will guard your hearts."',
        prayerText: `O glorious Saint Jude, you surrendered your life totally into the hands of the Savior. Deliver my soul from fretful anxiety and panic. Give me the grace to pray with Jesus in Gethsemane: "Not my will, but Thine be done." Intercede for my intention (mention your intention), and help me trust that God works all things for good.`,
        intentionsFocus: 'Interior tranquility and total trust in the Father\'s plan.'
      },
      {
        dayNumber: 6,
        theme: 'Patience and Charity Toward Others',
        scriptureVerse: 'Colossians 3:12: "Put on then, as God\'s chosen ones, holy and beloved, compassionate hearts, kindness, humility, meekness, and patience."',
        prayerText: `Saint Jude, you loved your fellow apostles and served the Church with pure fraternal charity. In times of suffering, keep my heart from becoming bitter, hard, or impatient with those around me. Let the love of Christ soften my words and actions. Hear my prayer today and obtain this urgent grace (mention your intention).`,
        intentionsFocus: 'Patience with family, friends, and coworkers during stressful days.'
      },
      {
        dayNumber: 7,
        theme: 'Generosity and Gratitude to God',
        scriptureVerse: '1 Thessalonians 5:18: "Give thanks in all circumstances; for this is the will of God in Christ Jesus for you."',
        prayerText: `Saint Jude, apostle of the Gospel, you poured out your life as a libation of gratitude for the gift of salvation. Teach me to thank God not only when blessings are evident, but even in the hidden trials that refine my soul. I place my desperate plea into your compassionate hands (mention your intention).`,
        intentionsFocus: 'A spirit of constant thanksgiving and generosity toward the needy.'
      },
      {
        dayNumber: 8,
        theme: 'Hope of Eternal Life',
        scriptureVerse: '2 Corinthians 4:17: "For this light momentary affliction is preparing for us an eternal weight of glory beyond all comparison."',
        prayerText: `O blessed Saint Jude, through your martyrdom you entered triumphantly into the heavenly Jerusalem. Remind me that the trials of this present world are passing, but the glory promised by Christ is everlasting. Comfort me in my distress and bring my petition before the King of Kings (mention your intention).`,
        intentionsFocus: 'Fixing our eyes on Heaven and the resurrection of the body.'
      },
      {
        dayNumber: 9,
        theme: 'Thanksgiving and Perpetual Praise',
        scriptureVerse: 'Psalm 146:1-2: "Praise the Lord! Praise the Lord, O my soul! I will praise the Lord as long as I live."',
        prayerText: `Holy Apostle Saint Jude, on this final day of our novena, I praise God for the graces He has poured out through your intercession. I promise, O blessed Jude, to be ever mindful of this great favor, never to cease honoring you as my special and powerful patron, and to do all in my power to encourage devotion to you. Hear my prayer, receive my petition, and carry it into the glory of God. Amen. (mention your intention).`,
        intentionsFocus: 'Gratitude for graces received and promising to encourage others in devotion.'
      }
    ]
  },
  {
    id: 'novena-all-saints-souls',
    title: 'Novena for All Saints and All Souls',
    subtitle: 'Communion of Saints and Suffrage for the Faithful Departed',
    patronOrSubject: 'All Holy Men and Women of God and The Holy Souls in Purgatory',
    associatedFeast: 'Solemnity of All Saints and All Souls (November 1–2)',
    traditionalStartDate: '10-23',
    traditionalFeastDate: '11-01',
    category: 'Saints',
    description: 'Prayed from October 23 through October 31 in preparation for the Solemnity of All Saints (November 1) and the Commemoration of All the Faithful Departed (November 2). Unites the Church Militant on earth with the Church Triumphant in Heaven and the Church Suffering in Purgatory.',
    intentionsSuggestion: 'For the universal call to holiness in our family, and for the eternal rest of deceased parents, relatives, friends, and forgotten souls in Purgatory.',
    closingPrayer: `Eternal rest grant unto them, O Lord, and let perpetual light shine upon them. May their souls and the souls of all the faithful departed, through the mercy of God, rest in peace.
All ye holy Angels and Saints of God, pray for us! Our Father... Hail Mary... Glory Be...`,
    days: [
      {
        dayNumber: 1,
        theme: 'The Universal Call to Holiness',
        scriptureVerse: 'Revelation 7:9: "After this I looked, and behold, a great multitude that no one could number, from every nation, standing before the throne and before the Lamb."',
        prayerText: `Almighty and Eternal God, who enabled Your saints to triumph over human weakness through the grace of Christ, awaken in my heart an ardent desire for Heaven. Help me to walk in the footsteps of the saints today, and grant refreshment and light to the holy souls awaiting their entrance into eternal glory (mention your intention).`,
        intentionsFocus: 'Desiring holiness above all earthly ambitions.'
      },
      {
        dayNumber: 2,
        theme: 'The Blessed Virgin Mary, Queen of All Saints',
        scriptureVerse: 'Luke 1:48: "For behold, from now on all generations will call me blessed."',
        prayerText: `O Mary, Queen of All Saints and Mother of Mercy, you lead the choir of the redeemed before the throne of your Divine Son. Look with maternal compassion upon us still journeying on earth, and console your children detained in the purifying fires of Purgatory (mention your intention).`,
        intentionsFocus: 'Entrusting our departed loved ones to Our Lady\'s mantle.'
      },
      {
        dayNumber: 3,
        theme: 'The Holy Apostles and Martyrs',
        scriptureVerse: 'Revelation 12:11: "And they have conquered him by the blood of the Lamb and by the word of their testimony."',
        prayerText: `Lord Jesus, through the intercession of the glorious Apostles and Martyrs who shed their blood for Your truth, strengthen our faith in every trial. Apply the infinite merits of Your Precious Blood to release the souls in Purgatory, especially our deceased family members (mention your intention).`,
        intentionsFocus: 'Steadfast fidelity to Christ and relief for souls in Purgatory.'
      },
      {
        dayNumber: 4,
        theme: 'Holy Pastors, Confessors, and Doctors of the Church',
        scriptureVerse: 'Daniel 12:3: "And those who are wise shall shine like the brightness of the sky above; and those who turn many to righteousness, like the stars forever."',
        prayerText: `O God of wisdom and truth, who illuminated Your Church through holy bishops, priests, and doctors, keep us faithful to sacred doctrine. Have mercy on the souls of deceased priests and pastors in Purgatory who ministered Your sacraments to us on earth (mention your intention).`,
        intentionsFocus: 'Deceased bishops, priests, religious, and teachers of the faith.'
      },
      {
        dayNumber: 5,
        theme: 'Holy Virgins, Religious, and Contemplatives',
        scriptureVerse: 'Matthew 5:8: "Blessed are the pure in heart, for they shall see God."',
        prayerText: `Heavenly Father, we praise You for the countless consecrated souls who loved You with undivided hearts. Purify our affections from worldly attachment, and grant that the souls in Purgatory who longed to behold Your face may soon enter the Beatific Vision (mention your intention).`,
        intentionsFocus: 'Purity of heart and the release of souls closest to Heaven.'
      },
      {
        dayNumber: 6,
        theme: 'Holy Married Couples, Parents, and Lay Faithful',
        scriptureVerse: 'Colossians 3:17: "And whatever you do, in word or deed, do everything in the name of the Lord Jesus."',
        prayerText: `O Lord, who sanctified ordinary family life and daily labor through saints of every walk of life, bless our homes with domestic peace. Remember with tender mercy our deceased parents, grandparents, spouses, and benefactors who nurtured us in faith (mention your intention).`,
        intentionsFocus: 'Deceased parents, grandparents, relatives, and benefactors.'
      },
      {
        dayNumber: 7,
        theme: 'The Most Forgotten Souls in Purgatory',
        scriptureVerse: '2 Maccabees 12:46: "It is therefore a holy and wholesome thought to pray for the dead, that they may be loosed from sins."',
        prayerText: `Merciful Savior, look with pity upon the most abandoned souls in Purgatory who have no one left on earth to pray for them or offer Holy Mass for their repose. Accept our prayers and sacrifices today on their behalf, and welcome them into Your heavenly kingdom (mention your intention).`,
        intentionsFocus: 'The most forgotten and forsaken souls in Purgatory.'
      },
      {
        dayNumber: 8,
        theme: 'The Beatitudes — Our Path to Glory',
        scriptureVerse: 'Matthew 5:12: "Rejoice and be glad, for your reward is great in heaven."',
        prayerText: `Lord Jesus, on the Mount of Beatitudes You revealed the paradoxical path to true blessedness: poverty of spirit, meekness, mercy, and peacemaking. Form our hearts after Your own meek and humble Heart, and crown Your faithful departed with everlasting joy (mention your intention).`,
        intentionsFocus: 'Living the Eight Beatitudes in daily Christian life.'
      },
      {
        dayNumber: 9,
        theme: 'The Eternal Banquet of the New Jerusalem',
        scriptureVerse: 'Revelation 21:4: "He will wipe away every tear from their eyes, and death shall be no more."',
        prayerText: `Triune God—Father, Son, and Holy Spirit—as we stand on the threshold of All Saints and All Souls, we thank You for the Communion of Saints that binds Heaven, Earth, and Purgatory in one body of charity. Bring us all at last to the marriage supper of the Lamb, where we shall praise You forever. Amen. (mention your intention).`,
        intentionsFocus: 'Final perseverance and reunion with our loved ones in Heaven.'
      }
    ]
  },
  {
    id: 'novena-st-martin-de-porres',
    title: 'Novena to Saint Martin de Porres',
    subtitle: 'Patron of Social Justice, Healthcare Workers, and the Poor',
    patronOrSubject: 'Saint Martin de Porres, Dominican Lay Brother',
    associatedFeast: 'Feast of St. Martin de Porres (November 3)',
    traditionalStartDate: '10-25',
    traditionalFeastDate: '11-03',
    category: 'Saints',
    description: 'Prayed from October 25 through November 2 in preparation for the Feast of St. Martin de Porres on November 3. Known as the "Saint of the Broom," St. Martin radiated heroic humility, miraculous healing of the sick, Eucharistic adoration, and tender charity toward the poor and animals.',
    intentionsSuggestion: 'For physical healing, racial and family harmony, humility in service, and aid for the poor.',
    closingPrayer: `Most humble Saint Martin de Porres, whose burning charity embraced all the needy, the sick, and the afflicted, pray for us that we may imitate your compassion and humility. Through Christ our Lord. Amen. Our Father... Hail Mary... Glory Be...`,
    days: [
      {
        dayNumber: 1,
        theme: 'Heroic Humility in Daily Tasks',
        scriptureVerse: 'Matthew 23:11-12: "The greatest among you shall be your servant. Whoever exalts himself will be humbled, and whoever humbles himself will be exalted."',
        prayerText: `Glorious Saint Martin, you sanctified the humblest household chores with your broom by offering every sweep out of love for Jesus Crucified. Teach us to find holiness in our ordinary daily duties without complaint or vanity, and obtain for us this grace (mention your intention).`,
        intentionsFocus: 'Sanctifying daily work with humility and joy.'
      },
      {
        dayNumber: 2,
        theme: 'Compassion for the Sick and Suffering',
        scriptureVerse: 'Matthew 25:36: "I was sick and you visited me."',
        prayerText: `Compassionate Saint Martin, no sick person was ever turned away from your infirmary in Lima. You tended the plague-stricken with your own hands and brought miraculous cures through the Sign of the Cross. Intercede for all who are ill today and grant this petition (mention your intention).`,
        intentionsFocus: 'Healing for the sick and strength for caregivers.'
      },
      {
        dayNumber: 3,
        theme: 'Burning Love for the Holy Eucharist',
        scriptureVerse: 'John 6:51: "I am the living bread that came down from heaven."',
        prayerText: `Saint Martin de Porres, you spent long night hours kneeling in ecstatic adoration before the Blessed Sacrament, bathed in heavenly light. Enkindle in our hearts a fervent devotion to Jesus in the Holy Eucharist, and hear our prayer (mention your intention).`,
        intentionsFocus: 'Deeper reverence and love for the Real Presence of Christ.'
      },
      {
        dayNumber: 4,
        theme: 'Harmony and Brotherhood Among All Peoples',
        scriptureVerse: 'Galatians 3:28: "For you are all one in Christ Jesus."',
        prayerText: `Gentle Saint Martin, born of mixed heritage and rejected by many in youth, you answered prejudice with unfailing gentleness and charity. Heal the divisions in our communities and families, and obtain for us the favor we seek (mention your intention).`,
        intentionsFocus: 'Reconciliation, peace, and mutual respect in families and society.'
      },
      {
        dayNumber: 5,
        theme: 'Devotion to the Passion of Christ',
        scriptureVerse: 'Galatians 2:20: "I have been crucified with Christ. It is no longer I who live, but Christ who lives in me."',
        prayerText: `Saint Martin, when you gazed upon the Crucifix your tears flowed in gratitude for the Redeemer's love. Help us carry our crosses patiently in union with Jesus, and present our urgent need before His throne (mention your intention).`,
        intentionsFocus: 'Patience and strength in bearing personal crosses.'
      },
      {
        dayNumber: 6,
        theme: 'Generosity Toward the Poor and Hungry',
        scriptureVerse: 'Proverbs 19:17: "Whoever is generous to the poor lends to the Lord, and he will repay him for his deed."',
        prayerText: `Father of the Poor, God multiplied the food in your basket so that hundreds of hungry souls in Lima were fed every day. Open our hearts to those in material or spiritual poverty, and provide for our present necessities (mention your intention).`,
        intentionsFocus: 'Generosity toward the poor and trust in Divine Providence.'
      },
      {
        dayNumber: 7,
        theme: 'Filial Love for Our Blessed Mother',
        scriptureVerse: 'John 2:5: "His mother said to the servants, \'Do whatever he tells you.\'"',
        prayerText: `Devout son of Our Lady of the Rosary, you wore the Dominican habit and rosary as your armor of love. Ask the Queen of the Most Holy Rosary to shelter us beneath her mantle and grant our petition (mention your intention).`,
        intentionsFocus: 'Fidelity to the daily Rosary and Marian devotion.'
      },
      {
        dayNumber: 8,
        theme: 'Gentleness Toward All God\'s Creation',
        scriptureVerse: 'Psalm 145:9: "The Lord is good to all, and his mercy is over all that he has made."',
        prayerText: `Kind Saint Martin, even the creatures of the field obeyed your gentle voice because they recognized the peace of Eden in your pure soul. Calm the storms of anger and impatience within us, and intercede for our intention (mention your intention).`,
        intentionsFocus: 'Meekness, gentleness, and interior peace.'
      },
      {
        dayNumber: 9,
        theme: 'Confidence in God\'s Miraculous Power',
        scriptureVerse: 'Mark 9:23: "All things are possible for one who believes."',
        prayerText: `Wonderworker of Peru, on this final day of our novena we thank God for the countless miracles wrought through your humble intercession. Present our hearts and our petitions before the King of Mercy, that we may glorify Him with you forever in Heaven. Amen. (mention your intention).`,
        intentionsFocus: 'Thanksgiving and unwavering trust in God\'s mercy.'
      }
    ]
  },
  {
    id: 'novena-mother-cabrini',
    title: 'Novena to Saint Frances Xavier Cabrini',
    subtitle: 'Patroness of Immigrants, Orphans, and Hospital Administrators',
    patronOrSubject: 'Saint Frances Xavier Cabrini (Mother Cabrini)',
    associatedFeast: 'Feast of St. Frances Xavier Cabrini (November 13)',
    traditionalStartDate: '11-04',
    traditionalFeastDate: '11-13',
    category: 'Saints',
    description: 'Prayed from November 4 through November 12 for the Feast of St. Frances Xavier Cabrini on November 13. The first naturalized U.S. citizen canonized a saint, Mother Cabrini founded 67 schools, hospitals, and orphanages across the Americas and Europe despite frail health.',
    intentionsSuggestion: 'For travelers, immigrants, families seeking stability, healthcare workers, and courage to accomplish God\'s mission.',
    closingPrayer: `Saint Frances Xavier Cabrini, whose motto was "I can do all things in Him who strengthens me," obtain for us boundless confidence in the Sacred Heart of Jesus. Amen. Our Father... Hail Mary... Glory Be...`,
    days: [
      {
        dayNumber: 1,
        theme: 'Strength in Weakness through Christ',
        scriptureVerse: 'Philippians 4:13: "I can do all things through him who strengthens me."',
        prayerText: `Saint Frances Cabrini, though frail in bodily health from childhood, you crossed the ocean twenty-four times to build institutions of charity because you relied wholly on the Sacred Heart of Jesus. Grant us courage when our strength feels small (mention your intention).`,
        intentionsFocus: 'Relying on Christ\'s strength in overwhelming responsibilities.'
      },
      {
        dayNumber: 2,
        theme: 'Trust in the Sacred Heart of Jesus',
        scriptureVerse: 'Matthew 11:28: "Come to me, all who labor and are heavy laden, and I will give you rest."',
        prayerText: `Mother Cabrini, in every financial crisis and obstacle you placed your bills and worries at the feet of the Sacred Heart, saying, "Jesus will provide." Teach us to entrust our family and work needs to His Sacred Heart (mention your intention).`,
        intentionsFocus: 'Trusting the Sacred Heart in financial and family challenges.'
      },
      {
        dayNumber: 3,
        theme: 'Obedience to God\'s Surprising Plans',
        scriptureVerse: 'Isaiah 55:8: "For my thoughts are not your thoughts, neither are your ways my ways, declares the Lord."',
        prayerText: `Saint Frances, you dreamed of being a missionary in China, yet when Pope Leo XIII told you, "Not to the East, but to the West," you obeyed immediately and sailed to New York. Help us embrace God's will when our plans change (mention your intention).`,
        intentionsFocus: 'Peaceful obedience when God redirects our path.'
      },
      {
        dayNumber: 4,
        theme: 'Compassion for Families Far from Home',
        scriptureVerse: 'Hebrews 13:2: "Do not neglect to show hospitality to strangers, for thereby some have entertained angels unawares."',
        prayerText: `Patroness of Immigrants, you sheltered newcomers, orphans, and laborers who felt forgotten in a foreign land. Protect all families seeking safety, employment, and a home, and hear our prayer today (mention your intention).`,
        intentionsFocus: 'Protection of travelers, migrants, and displaced families.'
      },
      {
        dayNumber: 5,
        theme: 'Christian Education of Youth',
        scriptureVerse: 'Proverbs 22:6: "Train up a child in the way he should go; even when he is old he will not depart from it."',
        prayerText: `Mother Cabrini, you insisted that education must form the heart in love for God as well as the mind in knowledge. Bless all children, students, parents, and teachers, and grant our special petition (mention your intention).`,
        intentionsFocus: 'Wisdom and faith for children, students, and educators.'
      },
      {
        dayNumber: 6,
        theme: 'Healing of Body and Soul in Hospitals',
        scriptureVerse: 'Luke 10:9: "Heal the sick in it and say to them, \'The kingdom of God has come near to you.\'"',
        prayerText: `Saint Frances, you founded Columbus Hospitals so that the sick would be treated as Christ Himself in body and soul. Bless all physicians, nurses, and patients, and bring healing to those we pray for (mention your intention).`,
        intentionsFocus: 'Those undergoing medical treatment and healthcare workers.'
      },
      {
        dayNumber: 7,
        theme: 'Perseverance Against Rejection',
        scriptureVerse: '2 Corinthians 4:8: "We are afflicted in every way, but not crushed; perplexed, but not driven to despair."',
        prayerText: `Valiant Mother Cabrini, when doors were shut in your face and resources vanished, you never yielded to discouragement. Grant us cheerful perseverance when facing setbacks, and obtain this grace for us (mention your intention).`,
        intentionsFocus: 'Resilience and hope in the face of obstacles.'
      },
      {
        dayNumber: 8,
        theme: 'Contemplation in the Midst of Action',
        scriptureVerse: 'Luke 10:42: "One thing is necessary. Mary has chosen the good portion, which will not be taken away from her."',
        prayerText: `Saint Frances, amid building sixty-seven institutions across two continents, your heart remained anchored in quiet prayer before the Tabernacle. Help us maintain interior recollection amid busy days (mention your intention).`,
        intentionsFocus: 'Balancing active responsibilities with deep prayer.'
      },
      {
        dayNumber: 9,
        theme: 'Eternal Home in the Kingdom of Heaven',
        scriptureVerse: 'John 14:2: "In my Father\'s house are many rooms... I go to prepare a place for you."',
        prayerText: `Glorious Saint Frances Xavier Cabrini, having completed your earthly pilgrimage in the service of Christ and His poor, intercede for us from Heaven. Present our novena intentions to the Sacred Heart of Jesus and lead us safely to our eternal home. Amen. (mention your intention).`,
        intentionsFocus: 'Gratitude and confidence in the Sacred Heart of Jesus.'
      }
    ]
  },
  {
    id: 'novena-christ-the-king',
    title: 'Novena to Christ the King',
    subtitle: 'Solemnity of Our Lord Jesus Christ, King of the Universe',
    patronOrSubject: 'Our Lord Jesus Christ, Eternal King of Glory',
    associatedFeast: 'Solemnity of Christ the King (November 22)',
    traditionalStartDate: '11-13',
    traditionalFeastDate: '11-22',
    category: 'Jesus',
    description: 'Prayed from November 13 through November 21 leading to the Solemnity of Our Lord Jesus Christ, King of the Universe (the final Sunday of the Liturgical Year, November 22, 2026). Instituted by Pope Pius XI in Quas Primas (1925) to proclaim Christ\'s sovereign reign over all hearts, families, and nations.',
    intentionsSuggestion: 'That Christ may reign as King in our hearts, homes, and society; for peace among nations and renewal of the Church.',
    closingPrayer: `Viva Cristo Rey! To Thee, O Christ the King, be dominion, praise, and glory forever and ever!
Jesus, King and Center of all hearts, through the advent of Thy Kingdom, grant us peace. Amen. Our Father... Hail Mary... Glory Be...`,
    days: [
      {
        dayNumber: 1,
        theme: 'Christ the Alpha and the Omega',
        scriptureVerse: 'Revelation 1:8: "\'I am the Alpha and the Omega,\' says the Lord God, \'who is and who was and who is to come, the Almighty.\'"',
        prayerText: `O Lord Jesus Christ, Eternal Word of the Father, through whom all things were created: we acknowledge You as the supreme King of the universe. Reign over our minds by Your truth and over our wills by Your holy law, and grant the favor we ask (mention your intention).`,
        intentionsFocus: 'Placing Christ first in every decision of our lives.'
      },
      {
        dayNumber: 2,
        theme: 'The Kingdom of Truth and Life',
        scriptureVerse: 'John 18:37: "Jesus answered, \'You say that I am a king. For this purpose I was born and for this purpose I have come into the world—to bear witness to the truth.\'"',
        prayerText: `Christ our King, standing before Pilate You proclaimed that everyone who is of the truth listens to Your voice. Deliver our world from relativism and deception, anchor our souls in Your Gospel, and hear our prayer (mention your intention).`,
        intentionsFocus: 'Fidelity to the truth of the Gospel in word and deed.'
      },
      {
        dayNumber: 3,
        theme: 'The King Crowned with Thorns',
        scriptureVerse: 'Isaiah 53:5: "But he was pierced for our transgressions... and with his wounds we are healed."',
        prayerText: `Adorable King of Calvary, Your throne on earth was the Wood of the Cross and Your diadem a crown of thorns. Teach us that true royal power is sacrificial love, and heal our wounds through Your Passion (mention your intention).`,
        intentionsFocus: 'Uniting our sufferings with the royal Cross of Christ.'
      },
      {
        dayNumber: 4,
        theme: 'Christ the King of Our Families',
        scriptureVerse: 'Joshua 24:15: "But as for me and my house, we will serve the Lord."',
        prayerText: `Divine King of Love, we enthrone You today as the Lord and Master of our home. Banish discord, selfishness, and coldness from our family life; fill our household with Your peace, forgiveness, and grace (mention your intention).`,
        intentionsFocus: 'Enthroning Jesus as King of our home and family.'
      },
      {
        dayNumber: 5,
        theme: 'The Eucharistic Throne of the King',
        scriptureVerse: 'Matthew 28:20: "And behold, I am with you always, to the end of the age."',
        prayerText: `Hidden King of the Tabernacle, though veiled under the sacramental species of bread, You reign in our parish churches waiting for our love. Draw our hearts to frequent Holy Communion and Eucharistic Adoration (mention your intention).`,
        intentionsFocus: 'Devotion to Christ the King present in the Blessed Sacrament.'
      },
      {
        dayNumber: 6,
        theme: 'The Kingdom of Justice, Love, and Peace',
        scriptureVerse: 'Isaiah 9:6: "Of the increase of his government and of peace there will be no end."',
        prayerText: `Prince of Peace, the world cannot know true peace while it rejects Your gentle sovereignty. Reign over the rulers of nations, end wars and violence, protect the unborn and vulnerable, and grant our petition (mention your intention).`,
        intentionsFocus: 'Peace among nations and protection of human dignity.'
      },
      {
        dayNumber: 7,
        theme: 'Heroic Witness of the Martyrs of Christ the King',
        scriptureVerse: 'Revelation 19:16: "On his robe and on his thigh he has a name written, King of kings and Lord of lords."',
        prayerText: `O Victorious King, through the intercession of St. José Sánchez del Río and all the martyrs who cried "Viva Cristo Rey!" with their last breath, give us fearless loyalty to Your holy Name in every trial (mention your intention).`,
        intentionsFocus: 'Courageous witness to Christ in modern society.'
      },
      {
        dayNumber: 8,
        theme: 'Mercy at the Hour of Judgment',
        scriptureVerse: 'Luke 23:42: "And he said, \'Jesus, remember me when you come into your kingdom.\'"',
        prayerText: `Merciful King, at the close of the liturgical year we remember that You will come again in glory to judge the living and the dead. Clothe our souls in sanctifying grace and answer our humble supplication (mention your intention).`,
        intentionsFocus: 'Readiness of soul and living in sanctifying grace.'
      },
      {
        dayNumber: 9,
        theme: 'Consecration to the Reign of Christ the King',
        scriptureVerse: '1 Corinthians 15:25: "For he must reign until he has put all his enemies under his feet."',
        prayerText: `O Christ Jesus, we acknowledge You as Universal King. All that has been made was created for You. Exercise over us all Your sovereign rights. We renew our baptismal promises, renouncing Satan and his works, and we pledge to work with all our strength for the triumph of Your Sacred Heart and Your Kingdom. Amen. (mention your intention).`,
        intentionsFocus: 'Total consecration of our life to Christ the King.'
      }
    ]
  },
  {
    id: 'novena-st-cecilia',
    title: 'Novena to Saint Cecilia',
    subtitle: 'Patroness of Sacred Music, Choirs, Musicians, and Poets',
    patronOrSubject: 'Saint Cecilia, Roman Virgin and Martyr',
    associatedFeast: 'Feast of St. Cecilia (November 22)',
    traditionalStartDate: '11-13',
    traditionalFeastDate: '11-22',
    category: 'Saints',
    description: 'Prayed from November 13 through November 21 for the Feast of St. Cecilia on November 22. One of the most venerated early Roman martyrs named in the Roman Canon of the Mass, she sang in her heart to the Lord alone and converted her husband St. Valerian and his brother St. Tiburtius.',
    intentionsSuggestion: 'For sacred musicians, parish choirs, conversion of spouses and relatives, and purity of heart.',
    closingPrayer: `O glorious Saint Cecilia, virgin and martyr, who sang praises to God in your heart even amid the flames of martyrdom, obtain for us a song of unceasing love for Christ. Amen. Our Father... Hail Mary... Glory Be...`,
    days: [
      {
        dayNumber: 1,
        theme: 'Singing to the Lord in the Heart',
        scriptureVerse: 'Ephesians 5:19: "Singing and making melody to the Lord with your heart."',
        prayerText: `Blessed Saint Cecilia, while earthly instruments played at your wedding feast, you sang in your heart to the Lord alone: "May my heart and body remain spotless, that I be not confounded." Keep our hearts pure and recollected in God (mention your intention).`,
        intentionsFocus: 'Interior recollection and purity of heart.'
      },
      {
        dayNumber: 2,
        theme: 'Conversion of Spouses and Loved Ones',
        scriptureVerse: '1 Peter 3:1: "So that even if some do not obey the word, they may be won without a word by the conduct of their wives."',
        prayerText: `Saint Cecilia, through your gentle witness and angelic purity your pagan betrothed Valerian was converted, baptized by Pope St. Urban, and crowned with martyrdom. Obtain the conversion and sanctification of our spouses and families (mention your intention).`,
        intentionsFocus: 'Conversion and holiness of spouses and family members.'
      },
      {
        dayNumber: 3,
        theme: 'Friendship with our Guardian Angels',
        scriptureVerse: 'Psalm 91:11: "For he will command his angels concerning you to guard you in all your ways."',
        prayerText: `Pure Saint Cecilia, God granted Valerian to behold your Guardian Angel standing beside you holding crowns of roses and lilies from paradise. Help us walk in daily reverence before our holy Guardian Angels (mention your intention).`,
        intentionsFocus: 'Devotion to our Guardian Angels and heavenly protection.'
      },
      {
        dayNumber: 4,
        theme: 'Beauty and Reverence in Sacred Liturgy',
        scriptureVerse: 'Psalm 96:9: "Worship the Lord in the splendor of holiness; tremble before him, all the earth!"',
        prayerText: `Patroness of Sacred Music, inspire all choir members, organists, cantors, and composers to offer music worthy of the Holy Sacrifice of the Mass, lifting souls toward Heaven (mention your intention).`,
        intentionsFocus: 'Reverent sacred music and liturgical renewal in parishes.'
      },
      {
        dayNumber: 5,
        theme: 'Fraternal Charity and Evangelization',
        scriptureVerse: 'Matthew 5:16: "In the same way, let your light shine before others, so that they may see your good works and give glory to your Father."',
        prayerText: `Saint Cecilia, your radiant faith drew your brother-in-law Tiburtius and the Roman officer Maximus to Christ. Give us joyful missionary zeal to share the beauty of the Catholic faith with those around us (mention your intention).`,
        intentionsFocus: 'Bringing friends and coworkers to the joy of the faith.'
      },
      {
        dayNumber: 6,
        theme: 'Courage Before Worldly Power',
        scriptureVerse: 'Acts 5:29: "We must obey God rather than human beings."',
        prayerText: `Fearless Virgin of Rome, when Prefect Almachius boasted of his power over life and death, you calmly replied that earthly power is like a bladder filled with wind, punctured by a single needle. Free us from human respect and fear (mention your intention).`,
        intentionsFocus: 'Freedom from peer pressure and worldly intimidation.'
      },
      {
        dayNumber: 7,
        theme: 'Generosity with Earthly Goods',
        scriptureVerse: 'Matthew 6:20: "Lay up for yourselves treasures in heaven, where neither moth nor rust destroys."',
        prayerText: `Saint Cecilia, before your martyrdom you distributed your family wealth to the poor and bequeathed your Roman house to become a church of God. Teach us detachment from possessions and generosity toward the Church (mention your intention).`,
        intentionsFocus: 'Detachment from materialism and generosity to the needy.'
      },
      {
        dayNumber: 8,
        theme: 'Witnessing to the Trinity Until Our Last Breath',
        scriptureVerse: '1 John 5:7: "And these three are one."',
        prayerText: `Glorious Martyr, struck three times by the executioner's sword, you survived for three days preaching the faith and folded your fingers—three on one hand and one on the other—in silent profession of the Holy Trinity. Keep us faithful to our last breath (mention your intention).`,
        intentionsFocus: 'Steadfast confession of the Trinity and Catholic dogma.'
      },
      {
        dayNumber: 9,
        theme: 'The Eternal Symphony of Heaven',
        scriptureVerse: 'Revelation 14:3: "And they were singing a new song before the throne."',
        prayerText: `O blessed Saint Cecilia, whose incorrupt body was found in the posture of testifying to the Triune God, receive our novena prayers today. Obtain for us the grace we earnestly implore, and bring us to sing the eternal Sanctus with you in Heaven. Amen. (mention your intention).`,
        intentionsFocus: 'Gratitude and the grace of eternal praise in Heaven.'
      }
    ]
  },
  {
    id: 'novena-miraculous-medal',
    title: 'Novena of the Miraculous Medal',
    subtitle: 'To Our Lady of Graces (Revealed to St. Catherine Labouré)',
    patronOrSubject: 'Blessed Virgin Mary, Mother of God',
    associatedFeast: 'Feast of Our Lady of the Miraculous Medal (November 27)',
    traditionalStartDate: '11-18',
    traditionalFeastDate: '11-27',
    category: 'Mary',
    description: 'Prayed from November 18 through November 26 for the Feast of Our Lady of the Miraculous Medal on November 27. In 1830, the Blessed Virgin Mary appeared to Saint Catherine Labouré in Paris, revealing the Miraculous Medal with the inscription: "O Mary, conceived without sin, pray for us who have recourse to thee."',
    intentionsSuggestion: 'Physical and spiritual healing, conversion of loved ones, protection of families.',
    closingPrayer: `O Mary, conceived without sin, pray for us who have recourse to thee! (Repeat 3 times). Hail Holy Queen...`,
    days: [
      {
        dayNumber: 1,
        theme: 'Mary, Model of Faith and Purity',
        scriptureVerse: 'Luke 1:28: "Hail, full of grace, the Lord is with you!"',
        prayerText: `O Immaculate Virgin Mary, Mother of Our Lord Jesus and our Mother, penetrated with the most lively confidence in your all-powerful and never-failing intercession, manifested so often through the Miraculous Medal, we your loving and trustful children implore you to obtain for us the graces and favors we ask during this novena, if they be beneficial to our immortal souls, and the souls for whom we pray (mention your intention).`,
        intentionsFocus: 'Purity of mind, heart, and body.'
      },
      {
        dayNumber: 2,
        theme: 'Rays of Grace Streaming from Her Hands',
        scriptureVerse: 'Revelation 12:1: "And a great sign appeared in heaven: a woman clothed with the sun, with the moon under her feet."',
        prayerText: `O Mary, you showed yourself to St. Catherine Labouré with rays of light streaming from your hands onto the globe below, representing the graces you shed upon those who ask for them. Forgive our lack of faith in failing to ask. Bestow upon us today the radiant light of Christ and the specific grace we request (mention your intention).`,
        intentionsFocus: 'Desire for heavenly graces above worldly treasures.'
      },
      {
        dayNumber: 3,
        theme: 'Crushing the Ancient Serpent',
        scriptureVerse: 'Genesis 3:15: "I will put enmity between you and the woman, and between your seed and her seed; he shall bruise your head."',
        prayerText: `O victorious Mother, standing upon the globe and crushing the serpent's head beneath your feet, protect us from the subtle snares of the enemy. Keep our families united in Catholic truth, and obtain for us this urgent petition (mention your intention).`,
        intentionsFocus: 'Spiritual protection against temptations and demonic snares.'
      },
      {
        dayNumber: 4,
        theme: 'The Sacred Hearts of Jesus and Mary',
        scriptureVerse: 'Luke 2:35: "And a sword will pierce through your own soul also, so that thoughts from many hearts may be revealed."',
        prayerText: `On the reverse of the Miraculous Medal are depicted the Heart of Jesus crowned with thorns and the Heart of Mary pierced by a sword. Teach us to unite our small daily sufferings with the great sacrifice of Calvary. Intercede for us, O Mother of Sorrows (mention your intention).`,
        intentionsFocus: 'Generous acceptance of daily crosses.'
      },
      {
        dayNumber: 5,
        theme: 'The Virtue of Humility',
        scriptureVerse: 'Luke 1:52: "He has brought down the mighty from their thrones and exalted those of humble estate."',
        prayerText: `O gentle Queen, you chose the simple, hidden novice Catherine Labouré to convey your message of mercy to the whole world. Tear out all roots of pride and vanity from our souls. Grant us child-like humility, and hear our plea (mention your intention).`,
        intentionsFocus: 'Humility and freedom from human respect.'
      },
      {
        dayNumber: 6,
        theme: 'Conversion of Sinners',
        scriptureVerse: 'Ezekiel 33:11: "As I live, declares the Lord God, I have no pleasure in the death of the wicked, but that the wicked turn from his way and live."',
        prayerText: `O Refuge of Sinners, millions have experienced instantaneous conversions upon receiving your holy medal. Look with tender mercy on those in our families and world who have wandered away from the sacraments. Melt their hardened hearts and bring them home to Christ (mention your intention).`,
        intentionsFocus: 'Conversion of fallen-away Catholics and hardened sinners.'
      },
      {
        dayNumber: 7,
        theme: 'Holy Mother of the Church',
        scriptureVerse: 'Acts 1:14: "All these with one accord were devoting themselves to prayer, together with the women and Mary the mother of Jesus."',
        prayerText: `Mother of the Church, you prayed with the early Apostles in the Upper Room awaiting the Holy Spirit. Bless our Holy Father the Pope, our bishops, priests, and religious. Keep the Church steadfast in sound doctrine and missionary zeal. We entrust our petition to you (mention your intention).`,
        intentionsFocus: 'Protection and holiness of the priesthood and hierarchy.'
      },
      {
        dayNumber: 8,
        theme: 'Spiritual and Corporal Healing',
        scriptureVerse: 'Jeremiah 17:14: "Heal me, O Lord, and I shall be healed; save me, and I shall be saved, for you are my praise."',
        prayerText: `Health of the Sick, countless bodily cures have been attributed to the touch of your holy medal. Lay your maternal hand upon the sick, the elderly, those facing surgery, and those weighed down by depression and chronic pain. Grant healing according to God's holy will (mention your intention).`,
        intentionsFocus: 'Bodily health, mental peace, and strength in sickness.'
      },
      {
        dayNumber: 9,
        theme: 'Grace of a Happy and Holy Death',
        scriptureVerse: 'Psalm 116:15: "Precious in the sight of the Lord is the death of his saints."',
        prayerText: `O Mary, conceived without sin, pray for us now and at the hour of our death! When our earthly pilgrimage comes to its end, stand beside us with Saint Joseph and our guardian angels. Safeguard our souls, obtain for us the final sacraments, and lead us into the eternal joy of the Beatific Vision. Amen (mention your intention).`,
        intentionsFocus: 'The grace of final perseverance and a holy death.'
      }
    ]
  },
  {
    id: 'novena-st-andrew',
    title: 'Novena to Saint Andrew the Apostle',
    subtitle: 'The Protoclete ("First-Called" Disciple of Jesus)',
    patronOrSubject: 'Saint Andrew the Apostle and Martyr',
    associatedFeast: 'Feast of St. Andrew the Apostle (November 30)',
    traditionalStartDate: '11-21',
    traditionalFeastDate: '11-30',
    category: 'Saints',
    description: 'Prayed from November 21 through November 29 in preparation for the Feast of St. Andrew the Apostle on November 30 (which also marks the beginning of the traditional St. Andrew Christmas prayer). Brother of St. Peter, he brought souls directly to Jesus and embraced his X-shaped cross with joy.',
    intentionsSuggestion: 'For missionary zeal to bring family and friends to Jesus, vocations to the priesthood, and love for the Cross.',
    closingPrayer: `O glorious Saint Andrew, who was the first to recognize and follow the Lamb of God, lead our hearts ever closer to Jesus. Amen. Our Father... Hail Mary... Glory Be...`,
    days: [
      {
        dayNumber: 1,
        theme: 'Following the Lamb of God Immediately',
        scriptureVerse: 'John 1:36-37: "He looked at Jesus as he walked by and said, \'Behold, the Lamb of God!\' The two disciples heard him say this, and they followed Jesus."',
        prayerText: `Holy Apostle Saint Andrew, the moment St. John the Baptist pointed to Jesus as the Lamb of God, you left everything to follow Him and abide in His presence. Awaken in our hearts a prompt readiness to follow Christ's call (mention your intention).`,
        intentionsFocus: 'Responding promptly to the inspirations of God\'s grace.'
      },
      {
        dayNumber: 2,
        theme: 'Bringing Our Brothers and Sisters to Jesus',
        scriptureVerse: 'John 1:41-42: "He first found his own brother Simon and said to him, \'We have found the Messiah\'... He brought him to Jesus."',
        prayerText: `Saint Andrew, your first act after encountering Christ was to find your brother Simon Peter and lead him to the Savior. Help us bring our siblings, relatives, and friends to encounter Jesus in the sacraments (mention your intention).`,
        intentionsFocus: 'Return of brothers, sisters, and relatives to the practice of the faith.'
      },
      {
        dayNumber: 3,
        theme: 'Leaving Our Nets at the Sea of Galilee',
        scriptureVerse: 'Matthew 4:19-20: "And he said to them, \'Follow me, and I will make you fishers of men.\' Immediately they left their nets and followed him."',
        prayerText: `Generous Apostle, when Jesus walked along the shore of Galilee and called you from your fishing nets, you did not hesitate. Detach our hearts from worldly nets that entangle us and make us fishers of souls (mention your intention).`,
        intentionsFocus: 'Holy vocations to the priesthood and consecrated life.'
      },
      {
        dayNumber: 4,
        theme: 'Offering Our Small Loaves and Fishes to Christ',
        scriptureVerse: 'John 6:8-9: "Andrew, Simon Peter\'s brother, said to him, \'There is a boy here who has five barley loaves and two fish.\'"',
        prayerText: `Saint Andrew, before the hungry multitude of five thousand, you brought the young boy with his five loaves and two fish to Jesus, who multiplied them abundantly. Teach us to offer our small efforts to Christ with trust (mention your intention).`,
        intentionsFocus: 'Trusting Jesus to multiply our humble resources and prayers.'
      },
      {
        dayNumber: 5,
        theme: 'Welcoming Seekers Who Wish to See Jesus',
        scriptureVerse: 'John 12:21-22: "They came to Philip and asked him, \'Sir, we wish to see Jesus.\' Philip went and told Andrew; Andrew and Philip went and told Jesus."',
        prayerText: `Apostle of Hospitality, when Greek pilgrims came to Jerusalem asking to see Jesus, they approached you to lead them to the Master. Make our parishes and homes welcoming sanctuaries that reveal the face of Christ (mention your intention).`,
        intentionsFocus: 'Evangelization and welcoming seekers into the Church.'
      },
      {
        dayNumber: 6,
        theme: 'Proclaiming the Gospel Across the Nations',
        scriptureVerse: 'Romans 10:15: "How beautiful are the feet of those who preach the good news!"',
        prayerText: `Tireless Missionary, strengthened by the fire of Pentecost, you preached the Gospel across Greece, Asia Minor, and Scythia. Strengthen all missionaries and persecuted Christians around the world today (mention your intention).`,
        intentionsFocus: 'Persecuted Christians and missionary apostolates.'
      },
      {
        dayNumber: 7,
        theme: 'Hail, O Precious Cross!',
        scriptureVerse: 'Galatians 6:14: "But far be it from me to boast except in the cross of our Lord Jesus Christ."',
        prayerText: `Heroic Martyr of Patras, when you beheld the cross prepared for your execution, you cried out with joy: "Hail, O Cross, consecrated by the Body of Christ and adorned with His limbs as with precious pearls!" Teach us to love the Cross (mention your intention).`,
        intentionsFocus: 'Courage and joy in embracing the Cross of Christ.'
      },
      {
        dayNumber: 8,
        theme: 'Preaching from the Cross for Two Days',
        scriptureVerse: '2 Timothy 4:7: "I have fought the good fight, I have finished the race, I have kept the faith."',
        prayerText: `Saint Andrew, bound to your X-shaped cross for two days, you never ceased proclaiming the love of the Redeemer to the crowds gathered around you. Grant us unshakeable perseverance in faith during prolonged trials (mention your intention).`,
        intentionsFocus: 'Endurance in long-standing trials or illnesses.'
      },
      {
        dayNumber: 9,
        theme: 'Preparing Our Hearts for the Advent of Christ',
        scriptureVerse: 'Isaiah 40:3: "Prepare the way of the Lord; make straight in the desert a highway for our God."',
        prayerText: `Glorious Saint Andrew, whose feast stands at the threshold of Holy Advent, prepare our hearts to welcome the Infant Savior at Christmas and the Eternal Judge at the end of time. Hear our novena petition and bring it before the throne of God. Amen. (mention your intention).`,
        intentionsFocus: 'A holy and prayerful preparation for the season of Advent.'
      }
    ]
  },
  {
    id: 'novena-st-francis-xavier',
    title: 'Novena of Grace to Saint Francis Xavier',
    subtitle: 'Apostle of the Indies and Japan • Patron of Missions',
    patronOrSubject: 'Saint Francis Xavier, Priest and Jesuit Missionary',
    associatedFeast: 'Feast of St. Francis Xavier (December 3)',
    traditionalStartDate: '11-24',
    traditionalFeastDate: '12-03',
    category: 'Saints',
    description: 'Prayed from November 24 through December 2 for the Feast of St. Francis Xavier on December 3. Known historically as the "Novena of Grace" after St. Francis Xavier appeared to Fr. Marcello Mastrilli in Naples in 1634, promising extraordinary graces to all who invoke his intercession.',
    intentionsSuggestion: 'For the salvation of souls, missionary zeal, spiritual awakening of loved ones, and urgent favors.',
    closingPrayer: `O devout Saint Francis Xavier, ask for us above all that we may live and die in the state of grace.
Pray for us, Saint Francis Xavier, that we may be made worthy of the promises of Christ. Amen. Our Father... Hail Mary... Glory Be...`,
    days: [
      {
        dayNumber: 1,
        theme: 'What Does It Profit a Man to Gain the Whole World?',
        scriptureVerse: 'Mark 8:36: "For what does it profit a man to gain the whole world and forfeit his soul?"',
        prayerText: `Most amiable and loving Saint Francis Xavier, in union with you I adore the Divine Majesty. When St. Ignatius of Loyola repeated to you the words of Jesus, "What does it profit a man to gain the whole world and lose his soul?", you surrendered all worldly ambition. Obtain for me the grace I ask in this Novena of Grace (mention your intention), if it be for the glory of God and the good of my soul.`,
        intentionsFocus: 'Putting the salvation of our immortal soul above all things.'
      },
      {
        dayNumber: 2,
        theme: 'Burning Zeal for the Salvation of Souls',
        scriptureVerse: '1 Corinthians 9:22: "I have become all things to all people, that by all means I might save some."',
        prayerText: `Glorious Apostle of the Indies, your heart burned with such fire to bring the Gospel to the ends of the earth that you baptized tens of thousands with your own hands. Kindle in our lukewarm hearts a holy zeal for souls, and grant our petition (mention your intention).`,
        intentionsFocus: 'Zeal for the conversion and baptism of souls.'
      },
      {
        dayNumber: 3,
        theme: 'Pure Love of Jesus Crucified',
        scriptureVerse: '2 Corinthians 5:14: "For the love of Christ controls us."',
        prayerText: `Saint Francis Xavier, you composed the immortal hymn "O Deus, ego amo Te"—loving God not merely from fear of punishment or hope of reward, but because Jesus embraced the Cross, the nails, and death for us. Teach us to love Jesus with pure, unselfish charity (mention your intention).`,
        intentionsFocus: 'Loving God for His own infinite goodness.'
      },
      {
        dayNumber: 4,
        theme: 'Fearless Trust Amid Storms and Perils',
        scriptureVerse: 'Psalm 27:1: "The Lord is my light and my salvation; whom shall I fear?"',
        prayerText: `Intrepid Missionary, neither shipwrecks, tropical fevers, pirates, nor hostility could deter you from preaching Christ. Calm the storms that threaten our families today, and obtain for us the special grace of this novena (mention your intention).`,
        intentionsFocus: 'Courage and Divine protection in dangerous circumstances.'
      },
      {
        dayNumber: 5,
        theme: 'Teaching the Faith to Children and the Simple',
        scriptureVerse: 'Matthew 19:14: "Jesus said, \'Let the little children come to me and do not hinder them, for to such belongs the kingdom of heaven.\'"',
        prayerText: `Gentle Saint Francis, upon arriving in every city you walked the streets ringing a little bell to gather the children and teach them the Creed and the Our Father. Bless our young people and keep them faithful to Christ (mention your intention).`,
        intentionsFocus: 'Protection of children and youth in the Catholic faith.'
      },
      {
        dayNumber: 6,
        theme: 'Miracles of Healing and Compassion',
        scriptureVerse: 'Acts 3:6: "In the name of Jesus Christ of Nazareth, rise up and walk!"',
        prayerText: `Wonderworker of the East, God confirmed your preaching with countless miracles of healing and even the raising of the dead. Look with compassion upon our present affliction and intercede before the throne of Mercy (mention your intention).`,
        intentionsFocus: 'Miraculous help in grave sickness or spiritual distress.'
      },
      {
        dayNumber: 7,
        theme: 'Unceasing Prayer and Union with God',
        scriptureVerse: '1 Thessalonians 5:17: "Pray without ceasing."',
        prayerText: `Saint Francis Xavier, after laboring all day for the poor and the sick, you spent the night before the altar whispering, "Yet more, O Lord, yet more!" Teach us to draw all our strength from intimate prayer with God (mention your intention).`,
        intentionsFocus: 'Perseverance and fervor in daily prayer.'
      },
      {
        dayNumber: 8,
        theme: 'Fidelity to the Vicar of Christ and the Church',
        scriptureVerse: 'Matthew 28:19: "Go therefore and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit."',
        prayerText: `Faithful son of the Church, you carried the Gospel across the seas in total communion with the See of Peter. Strengthen the Catholic Church throughout Asia and the whole world, and hear our humble prayer (mention your intention).`,
        intentionsFocus: 'Growth of the Church and missionary vocations.'
      },
      {
        dayNumber: 9,
        theme: 'Grace of a Holy Death in the Peace of Christ',
        scriptureVerse: 'Philippians 1:21: "For to me to live is Christ, and to die is gain."',
        prayerText: `Beloved Saint Francis Xavier, dying on the island of Shangchuan with your eyes fixed on your Crucifix and whispering, "In Te, Domine, speravi—In Thee, O Lord, have I hoped," obtain for us the grace we ask in this Novena of Grace, and bring us to eternal beatitude. Amen. (mention your intention).`,
        intentionsFocus: 'Unwavering hope in God and a holy death.'
      }
    ]
  },
  {
    id: 'novena-immaculate-conception',
    title: 'Novena to the Immaculate Conception',
    subtitle: 'Tota Pulchra Es, Maria • Patronal Solemnity of the Church',
    patronOrSubject: 'The Immaculate Virgin Mary, Conceived Without Original Sin',
    associatedFeast: 'Solemnity of the Immaculate Conception (December 8)',
    traditionalStartDate: '11-29',
    traditionalFeastDate: '12-08',
    category: 'Mary',
    description: 'Prayed from November 29 through December 7 in preparation for the Solemnity of the Immaculate Conception of the Blessed Virgin Mary on December 8 (a Holy Day of Obligation). Celebrates the dogma defined by Pope Pius IX in Ineffabilis Deus (1854) that Mary, from the first instant of her conception, was preserved free from all stain of original sin.',
    intentionsSuggestion: 'For purity of soul, deliverance from habitual sins, blessing upon our nation and families, and preparation for Christmas.',
    closingPrayer: `Tota pulchra es, Maria, et macula originalis non est in te! (You are all-beautiful, O Mary, and the original stain is not in you!)
O Mary, conceived without sin, pray for us who have recourse to thee. Amen. Hail Mary (3x)...`,
    days: [
      {
        dayNumber: 1,
        theme: 'Predestined from All Eternity by the Father',
        scriptureVerse: 'Genesis 3:15: "I will put enmity between you and the woman, and between your seed and her seed; she shall crush your head."',
        prayerText: `Immaculate Virgin Mary, before the foundations of the world were laid, the Eternal Father chose you to be the spotless Tabernacle of His Only-Begotten Son. At the very dawn of human history, you were foretold as the Woman who would crush the serpent's head. Obtain for us victory over every temptation and grant this favor (mention your intention).`,
        intentionsFocus: 'Victory over temptation and hatred of sin.'
      },
      {
        dayNumber: 2,
        theme: 'Preserved by the Merits of Christ the Redeemer',
        scriptureVerse: 'Luke 1:47: "My spirit rejoices in God my Savior."',
        prayerText: `All-Pure Mother of God, in view of the foreseeing merits of Jesus Christ the Savior of the human race, you were redeemed in a more sublime manner by being preserved from every stain of original sin. Cleanse our souls through the Sacrament of Penance and hear our prayer (mention your intention).`,
        intentionsFocus: 'A fruitful Confession and deep gratitude for Christ\'s redemption.'
      },
      {
        dayNumber: 3,
        theme: 'Full of Grace — Kecharitomene',
        scriptureVerse: 'Luke 1:28: "And he came to her and said, \'Hail, full of grace, the Lord is with you!\'"',
        prayerText: `Lily of Israel, the Archangel Gabriel greeted you not by an earthly title, but by your heavenly identity: Full of Grace. Never for a single instant did shadow dim the radiance of your soul. Fill our hearts with love for sanctifying grace (mention your intention).`,
        intentionsFocus: 'Treasuring sanctifying grace above all earthly goods.'
      },
      {
        dayNumber: 4,
        theme: 'Spouse of the Holy Spirit',
        scriptureVerse: 'Song of Solomon 4:7: "You are altogether beautiful, my love; there is no flaw in you."',
        prayerText: `Mystical Rose and Sanctuary of the Holy Spirit, the Third Person of the Blessed Trinity fashioned your Immaculate Heart as a masterpiece of divine love. Ask the Holy Spirit to pour His sevenfold gifts into our souls today (mention your intention).`,
        intentionsFocus: 'Docility to the seven gifts of the Holy Spirit.'
      },
      {
        dayNumber: 5,
        theme: 'The New Eve, Mother of All the Living',
        scriptureVerse: 'Luke 1:38: "Behold, I am the servant of the Lord; let it be to me according to your word."',
        prayerText: `O New Eve, whereas the first Eve brought sorrow by distrusting God, your humble fiat untied the knot of disobedience and opened the gates of Paradise. Untie the knots that burden our families and obtain our request (mention your intention).`,
        intentionsFocus: 'Healing of family wounds and obedient trust in God.'
      },
      {
        dayNumber: 6,
        theme: 'The Dogma of Ineffabilis Deus and Lourdes',
        scriptureVerse: 'Judith 15:9: "You are the exaltation of Jerusalem, you are the great glory of Israel, you are the great pride of our nation!"',
        prayerText: `Immaculate Conception, four years after Pope Pius IX solemnly proclaimed your sinless conception, you appeared to St. Bernadette at Lourdes and declared: "I am the Immaculate Conception." Strengthen our Catholic faith in every teaching of the Church (mention your intention).`,
        intentionsFocus: 'Lively faith and devotion to Our Lady\'s shrines.'
      },
      {
        dayNumber: 7,
        theme: 'Morning Star of Advent',
        scriptureVerse: 'Isaiah 7:14: "Behold, the virgin shall conceive and bear a son, and shall call his name Immanuel."',
        prayerText: `Radiant Morning Star, as the dawn heralds the rising of the sun, your Immaculate Conception heralded the coming of the Sun of Justice, Christ our Lord. Guide us through these holy days of Advent in quiet prayer and watchfulness (mention your intention).`,
        intentionsFocus: 'Preparing our hearts for the coming of Jesus at Christmas.'
      },
      {
        dayNumber: 8,
        theme: 'Refuge of Sinners and Cause of Our Joy',
        scriptureVerse: 'Hebrews 4:16: "Let us then with confidence draw near to the throne of grace, that we may receive mercy."',
        prayerText: `Mother of Mercy, the purer you are, the more compassionate you are toward poor sinners who cry out to you. No one has ever fled to your protection and been left unaided. Look upon our weakness and grant us this grace (mention your intention).`,
        intentionsFocus: 'Conversion of sinners and restoration of peace of soul.'
      },
      {
        dayNumber: 9,
        theme: 'Total Consecration to the Immaculata',
        scriptureVerse: 'Revelation 12:1: "A woman clothed with the sun, with the moon under her feet, and on her head a crown of twelve stars."',
        prayerText: `O Immaculata, Queen of Heaven and Earth, with St. Maximilian Kolbe and all the saints we consecrate ourselves wholly to you on the vigil of your glorious Solemnity. Keep us spotless in body and soul, present our novena intentions to your Divine Son, and lead us to eternal glory. Amen. (mention your intention).`,
        intentionsFocus: 'Total Marian consecration and final perseverance.'
      }
    ]
  },
  {
    id: 'novena-our-lady-guadalupe',
    title: 'Novena to Our Lady of Guadalupe',
    subtitle: 'Empress of the Americas and Protectress of the Unborn',
    patronOrSubject: 'Our Lady of Guadalupe (The Virgin of Tepeyac)',
    associatedFeast: 'Feast of Our Lady of Guadalupe (December 12)',
    traditionalStartDate: '12-03',
    traditionalFeastDate: '12-12',
    category: 'Mary',
    description: 'Prayed from December 3 through December 11 in preparation for the Feast of Our Lady of Guadalupe on December 12. Celebrates Our Lady\'s 1531 apparition to St. Juan Diego at Tepeyac Hill, where she left her miraculous image on his cactus-fiber tilma and brought nine million souls to Christ.',
    intentionsSuggestion: 'For the protection of unborn children, healing of families, comfort in anxiety, and renewal of faith across the Americas and the world.',
    closingPrayer: `Our Lady of Guadalupe, Mystical Rose, make intercession for Holy Church, protect the Sovereign Pontiff, help all those who invoke you in their necessities, and since you are the ever Virgin Mary and Mother of the true God, obtain for us from your most holy Son the grace of keeping our faith, of sweet hope in the midst of the bitterness of life, of burning charity, and the precious gift of final perseverance. Amen. Our Father... Hail Mary... Glory Be...`,
    days: [
      {
        dayNumber: 1,
        theme: '"Am I Not Here, I Who Am Your Mother?"',
        scriptureVerse: 'Isaiah 66:13: "As one whom his mother comforts, so I will comfort you."',
        prayerText: `Dearest Lady of Guadalupe, when St. Juan Diego was weighed down with grief for his dying uncle, you met him on Tepeyac with the tender words: "Let not your heart be disturbed. Am I not here, I who am your mother?" Speak those words of peace into my anxious heart today (mention your intention).`,
        intentionsFocus: 'Consolation in anxiety and trust in Our Lady\'s maternal care.'
      },
      {
        dayNumber: 2,
        theme: 'Mother of the True God by Whom We Live',
        scriptureVerse: 'Luke 1:43: "And why is this granted to me that the mother of my Lord should come to me?"',
        prayerText: `Holy Virgin of Guadalupe, you introduced yourself to the indigenous peoples of Mexico as the Mother of the True God, the Creator of persons and Lord of heaven and earth. Draw all nations away from false idols to worship your Son Jesus Christ (mention your intention).`,
        intentionsFocus: 'Evangelization and return of souls to the one true God.'
      },
      {
        dayNumber: 3,
        theme: 'Protectress of the Unborn Child',
        scriptureVerse: 'Psalm 139:13: "For you formed my inward parts; you knitted me together in my secret place."',
        prayerText: `Mother of Life, on your sacred Tilma you wear the black maternity sash showing that you carry the Divine Infant Jesus within your womb. Protect every unborn child, comfort expectant mothers in difficulty, and defend the sanctity of human life (mention your intention).`,
        intentionsFocus: 'Protection of unborn babies, expectant mothers, and families.'
      },
      {
        dayNumber: 4,
        theme: 'Choosing the Humble and Little Ones',
        scriptureVerse: '1 Corinthians 1:27: "But God chose what is foolish in the world to shame the wise; God chose what is weak in the world to shame the strong."',
        prayerText: `Our Lady of Tepeyac, you chose humble St. Juan Diego—"your littlest son"—as your trusted ambassador before the Bishop. Teach us true Christian humility so that God may work His wonders through our smallness (mention your intention).`,
        intentionsFocus: 'Humility and confidence that God values the lowly.'
      },
      {
        dayNumber: 5,
        theme: 'Roses Blooming in the Winter Desert',
        scriptureVerse: 'Isaiah 35:1: "The wilderness and the dry land shall be glad; the desert shall rejoice and blossom like the rose."',
        prayerText: `Queen of Heaven, as a sign of your maternal power you caused fragrant Castilian roses to bloom on the frozen, rocky summit of Tepeyac in December. Cause the roses of grace and hope to bloom in the barren places of our lives (mention your intention).`,
        intentionsFocus: 'Hope and miraculous grace in seemingly barren situations.'
      },
      {
        dayNumber: 6,
        theme: 'The Miraculous Tilma — A Living Icon of Love',
        scriptureVerse: 'Psalm 118:23: "This is the Lord\'s doing; it is marvelous in our eyes."',
        prayerText: `Virgin of Guadalupe, for nearly five centuries your sacred image imprinted on coarse cactus fiber has defied all natural decay and scientific explanation. Preserve our faith uncorrupted amid the trials of this world (mention your intention).`,
        intentionsFocus: 'Perseverance in the Catholic faith across generations.'
      },
      {
        dayNumber: 7,
        theme: 'Miraculous Healing of the Sick (Juan Bernardino)',
        scriptureVerse: 'James 5:15: "And the prayer of faith will save the one who is sick, and the Lord will raise him up."',
        prayerText: `Health of the Sick, at the very moment Juan Diego gathered roses on the hill, you appeared at the bedside of his dying uncle Juan Bernardino and restored him to complete health. Visit our sick loved ones today with your healing touch (mention your intention).`,
        intentionsFocus: 'Physical and spiritual healing for sick family members.'
      },
      {
        dayNumber: 8,
        theme: 'In the Crossing of Your Maternal Arms',
        scriptureVerse: 'Psalm 91:4: "He will cover you with his pinions, and under his wings you will find refuge."',
        prayerText: `Sweet Mother, you asked St. Juan Diego: "Are you not in the hollow of my mantle, in the crossing of my arms?" Hold our families close to your Immaculate Heart and shield us from every spiritual and physical danger (mention your intention).`,
        intentionsFocus: 'Protection and unity of our family under Mary\'s mantle.'
      },
      {
        dayNumber: 9,
        theme: 'Star of the New Evangelization',
        scriptureVerse: 'Revelation 12:1: "And a great sign appeared in heaven: a woman clothed with the sun, with the moon under her feet."',
        prayerText: `Empress of the Americas and Patroness of the Philippines, whose eyes hold the reflection of your children, look upon us on the eve of your feast day. Present our novena petitions to Jesus, the Fruit of your womb, and lead us home to Heaven. Amen. (mention your intention).`,
        intentionsFocus: 'Thanksgiving and entrusting our entire life to Our Lady of Guadalupe.'
      }
    ]
  },
  {
    id: 'novena-st-lucy',
    title: 'Novena to Saint Lucy (Santa Lucia)',
    subtitle: 'Bearer of Light • Patroness of Sight and the Blind',
    patronOrSubject: 'Saint Lucy of Syracuse, Virgin and Martyr',
    associatedFeast: 'Feast of St. Lucy (December 13)',
    traditionalStartDate: '12-04',
    traditionalFeastDate: '12-13',
    category: 'Saints',
    description: 'Prayed from December 4 through December 12 for the Feast of St. Lucy on December 13. Martyr of Syracuse under Diocletian (304 A.D.) whose name means "Light" (Lux). Invoked throughout the universal Church for the healing of eye diseases, restoration of physical sight, and the light of faith during the darkest days of December.',
    intentionsSuggestion: 'For healing of eye conditions and vision, spiritual clarity in discernment, and courage to remain pure in a darkened world.',
    closingPrayer: `Saint Lucy, Virgin and Martyr, you did not hide your light under a basket, but let it shine before the whole world so that all might glorify the Father in Heaven. Obtain for us physical sight for our eyes and the radiant light of faith for our souls. Amen. Our Father... Hail Mary... Glory Be...`,
    days: [
      {
        dayNumber: 1,
        theme: 'Walking as Children of the Light',
        scriptureVerse: 'John 8:12: "Jesus spoke to them, saying, \'I am the light of the world. Whoever follows me will not walk in darkness, but will have the light of life.\'"',
        prayerText: `Saint Lucy, whose very name signifies Light, you walked in the brightness of Christ's truth amid the darkness of pagan persecution. Dispel all spiritual blindness from our minds and obtain for us the grace we ask (mention your intention).`,
        intentionsFocus: 'Clarity of faith and deliverance from spiritual darkness.'
      },
      {
        dayNumber: 2,
        theme: 'Healing of the Eyes and Physical Vision',
        scriptureVerse: 'Mark 10:51-52: "The blind man said to him, \'Rabbi, let me recover my sight.\' And Jesus said to him, \'Go your way; your faith has made you well.\'"',
        prayerText: `Compassionate Saint Lucy, whom the Church invokes as the special patroness of eyesight, intercede for all who suffer from blindness, eye disease, or failing vision. Ask the Divine Physician to preserve and heal our sight (mention your intention).`,
        intentionsFocus: 'Healing of eye ailments and preservation of physical and spiritual sight.'
      },
      {
        dayNumber: 3,
        theme: 'Intercession for Sick Mothers (Eutychia\'s Cure)',
        scriptureVerse: 'Matthew 9:22: "Take heart, daughter; your faith has made you well."',
        prayerText: `Faithful Daughter, you accompanied your sick mother Eutychia on pilgrimage to the tomb of St. Agatha, where your prayers obtained her miraculous cure. Bless our mothers and heal all women suffering from chronic illness (mention your intention).`,
        intentionsFocus: 'Health and blessing of mothers and grandmothers.'
      },
      {
        dayNumber: 4,
        theme: 'Consecrating Our Treasures to the Poor',
        scriptureVerse: 'Luke 12:33: "Sell your possessions, and give to the needy. Provide yourselves with moneybags that do not grow old, with a treasure in the heavens."',
        prayerText: `Generous Virgin of Syracuse, out of gratitude for your mother's cure you distributed your entire dowry to the poor, calling them the true jewels of Christ. Free our hearts from greed and attachment to worldly wealth (mention your intention).`,
        intentionsFocus: 'Christian charity and generosity during the Advent season.'
      },
      {
        dayNumber: 5,
        theme: 'Unmovable Temple of the Holy Spirit',
        scriptureVerse: '1 Corinthians 3:16: "Do you not know that you are God\'s temple and that God\'s Spirit dwells in you?"',
        prayerText: `Undefeated Martyr, when the Roman governor Paschasius ordered soldiers and oxen to drag you to defilement, the Holy Spirit rendered you immovable as a mountain of stone. Make us unshakeable in virtue when tempted to sin (mention your intention).`,
        intentionsFocus: 'Strength to resist temptation and remain a pure temple of the Holy Spirit.'
      },
      {
        dayNumber: 6,
        theme: 'Speaking with the Wisdom of the Holy Spirit',
        scriptureVerse: 'Matthew 10:19-20: "For what you are to say will be given to you in that hour. For it is not you who speak, but the Spirit of your Father speaking through you."',
        prayerText: `Saint Lucy, when the judge threatened to silence your witness, you boldly testified that those who live chastely and piously have the Holy Spirit speaking within them. Grant us wisdom to defend our faith with grace (mention your intention).`,
        intentionsFocus: 'Wisdom and courage in professing the Catholic faith.'
      },
      {
        dayNumber: 7,
        theme: 'Unscathed by the Flames of Persecution',
        scriptureVerse: 'Isaiah 43:2: "When you walk through fire you shall not be burned, and the flame shall not consume you."',
        prayerText: `Victorious Bride of Christ, when wood and pitch were heaped around you and set ablaze, the flames parted and left you unharmed as you praised God. Quench the fires of anger, lust, and discord in our lives (mention your intention).`,
        intentionsFocus: 'Deliverance from destructive passions and trials.'
      },
      {
        dayNumber: 8,
        theme: 'Receiving the Holy Eucharist Before Death',
        scriptureVerse: 'John 6:54: "Whoever feeds on my flesh and drinks my blood has eternal life, and I will raise him up on the last day."',
        prayerText: `Blessed Saint Lucy, pierced by the sword, you did not yield your spirit until priests came and gave you the Viaticum of the Body and Blood of Christ. Obtain for us and our loved ones the grace of receiving the Last Sacraments at death (mention your intention).`,
        intentionsFocus: 'Devotion to the Holy Eucharist and the grace of a happy death.'
      },
      {
        dayNumber: 9,
        theme: 'A Lamp Shining Until the Dawn of Christmas',
        scriptureVerse: 'Matthew 25:6: "Behold, the bridegroom! Come out to meet him."',
        prayerText: `Glorious Saint Lucy, honored in the Roman Canon of the Mass, keep our lamps burning with the oil of charity as we await the birth of the Savior at Christmas. Hear our novena prayer and obtain for us the grace we ask. Amen. (mention your intention).`,
        intentionsFocus: 'Joyful expectation of Christ\'s birth and eternal light in Heaven.'
      }
    ]
  },
  {
    id: 'novena-christmas-simbang-gabi',
    title: 'Christmas Novena (Simbang Gabi / Misa de Gallo)',
    subtitle: 'Nine Days of Joyful Preparation for the Nativity of the Lord',
    patronOrSubject: 'The Infant Jesus, Our Lady of Expectation, and St. Joseph',
    associatedFeast: 'Solemnity of the Nativity of the Lord / Christmas (December 25)',
    traditionalStartDate: '12-16',
    traditionalFeastDate: '12-25',
    category: 'Jesus',
    description: 'Prayed from December 16 through December 24 leading directly to Christmas Day (December 25). Unites the ancient Roman "O Antiphons" of late Advent with the beloved Simbang Gabi (Misa de Gallo) nine-day dawn novena tradition, accompanying Mary and Joseph on their journey to Bethlehem.',
    intentionsSuggestion: 'For family unity at Christmas, peace on earth, conversion of hearts to the Christ Child, and thanksgiving for the year\'s blessings.',
    closingPrayer: `Hail and blessed be the hour and moment in which the Son of God was born of the most pure Virgin Mary, at midnight, in Bethlehem, in the piercing cold. In that hour vouchsafe, I beseech Thee, O my God, to hear my prayer and grant my desires, through the merits of Our Savior Jesus Christ, and of His blessed Mother. Amen. Our Father... Hail Mary... Glory Be...`,
    days: [
      {
        dayNumber: 1,
        theme: 'Dec 16 • The Annunciation and The Decree of Caesar',
        scriptureVerse: 'Luke 2:1,4: "In those days a decree went out from Caesar Augustus... And Joseph also went up from Galilee, from the town of Nazareth, to Judea, to the city of David, which is called Bethlehem."',
        prayerText: `O Divine Infant Jesus, on this first day of our Christmas Novena (Simbang Gabi), we set out with Mary and Joseph from Nazareth toward Bethlehem. Though emperors issue decrees, it is Your loving Providence that guides all history. Prepare a manger in our hearts to welcome You (mention your intention).`,
        intentionsFocus: 'Setting out with Mary and Joseph in prayerful expectation.'
      },
      {
        dayNumber: 2,
        theme: 'Dec 17 • O Sapientia (O Wisdom of the Most High)',
        scriptureVerse: 'Sirach 24:3: "I came forth from the mouth of the Most High, and covered the earth like a mist."',
        prayerText: `O Wisdom, coming forth from the mouth of the Most High, reaching from one end to the other mightily and sweetly ordering all things: Come and teach us the way of prudence! Illuminate our minds with heavenly wisdom as Christmas draws near (mention your intention).`,
        intentionsFocus: 'The gift of divine wisdom in family and life decisions.'
      },
      {
        dayNumber: 3,
        theme: 'Dec 18 • O Adonai (O Sacred Lord of the House of Israel)',
        scriptureVerse: 'Exodus 3:14: "God said to Moses, \'I AM WHO I AM.\'"',
        prayerText: `O Adonai, and leader of the House of Israel, who appeared to Moses in the fire of the burning bush and gave him the law on Sinai: Come and redeem us with an outstretched arm! Deliver us from every bondage of sin and fear (mention your intention).`,
        intentionsFocus: 'Reverence for God\'s commandments and liberation from sin.'
      },
      {
        dayNumber: 4,
        theme: 'Dec 19 • O Radix Jesse (O Root of Jesse)',
        scriptureVerse: 'Isaiah 11:1: "There shall come forth a shoot from the stump of Jesse, and a branch from his roots shall bear fruit."',
        prayerText: `O Root of Jesse, standing as a sign among the peoples; before whom kings will shut their mouths, to whom the nations will pray: Come and deliver us, and delay no longer! Heal our family tree and renew our hope (mention your intention).`,
        intentionsFocus: 'Healing of family generations and steadfast hope.'
      },
      {
        dayNumber: 5,
        theme: 'Dec 20 • O Clavis David (O Key of David)',
        scriptureVerse: 'Isaiah 22:22: "And I will place on his shoulder the key of the house of David. He shall open, and none shall shut."',
        prayerText: `O Key of David and scepter of the House of Israel; who opens and no one shuts, who shuts and no one opens: Come and bring the prisoners out of the prison house, those who dwell in darkness and the shadow of death (mention your intention).`,
        intentionsFocus: 'Opening doors that seem closed and comforting the lonely.'
      },
      {
        dayNumber: 6,
        theme: 'Dec 21 • O Oriens (O Radiant Dawn)',
        scriptureVerse: 'Luke 1:78-79: "Whereby the dayspring from on high hath visited us, to give light to them that sit in darkness."',
        prayerText: `O Radiant Dawn, splendor of eternal light and Sun of Justice: Come and shine on those who dwell in darkness and the shadow of death! Bring the warmth of Your love to all who are grieving or discouraged this winter (mention your intention).`,
        intentionsFocus: 'Consolation for the grieving, sick, and depressed.'
      },
      {
        dayNumber: 7,
        theme: 'Dec 22 • O Rex Gentium (O King of the Nations)',
        scriptureVerse: 'Haggai 2:7: "And the Desire of all nations shall come."',
        prayerText: `O King of the Nations, and their desire, the cornerstone making both one: Come and save the human race, which You fashioned from clay! Unite divided families and nations in the peace of Bethlehem (mention your intention).`,
        intentionsFocus: 'Reconciliation in families and peace across the world.'
      },
      {
        dayNumber: 8,
        theme: 'Dec 23 • O Emmanuel (God With Us)',
        scriptureVerse: 'Matthew 1:23: "Behold, the virgin shall conceive and bear a son, and they shall call his name Immanuel (which means, God with us)."',
        prayerText: `O Emmanuel, our King and Lawgiver, the hope of the nations and their Savior: Come and save us, O Lord our God! As Mary and Joseph knock at the doors of Bethlehem, find our hearts wide open to receive You (mention your intention).`,
        intentionsFocus: 'Welcoming Emmanuel into the center of our home.'
      },
      {
        dayNumber: 9,
        theme: 'Dec 24 • Christmas Eve — The Vigil of the Nativity',
        scriptureVerse: 'Luke 2:10-11: "Fear not, for behold, I bring you good news of great joy... For unto you is born this day in the city of David a Savior, who is Christ the Lord."',
        prayerText: `Sweetest Infant Jesus, on this holy vigil of Christmas we kneel with Mary, Joseph, and the shepherds beside Your manger in Bethlehem. Glory to God in the highest! Receive our nine days of Simbang Gabi prayers, bless our families with Your peace, and grant our heartfelt petition. Venite, adoremus Dominum! Amen. (mention your intention).`,
        intentionsFocus: 'Adoration, thanksgiving, and Christmas joy for all our loved ones.'
      }
    ]
  },
  {
    id: 'novena-holy-family',
    title: 'Novena to the Holy Family of Nazareth',
    subtitle: 'Jesus, Mary, and Joseph • Model of Every Christian Home',
    patronOrSubject: 'The Holy Family: Jesus, Mary, and Joseph',
    associatedFeast: 'Feast of the Holy Family (December 27)',
    traditionalStartDate: '12-19',
    traditionalFeastDate: '12-27',
    category: 'Jesus',
    description: 'Prayed from December 19 through December 27 for the Feast of the Holy Family of Jesus, Mary, and Joseph (celebrated on the Sunday within the Octave of Christmas, December 27, 2026). Entrusts marriages, parents, children, and households to the House of Nazareth.',
    intentionsSuggestion: 'For peace and unity in our home, protection of marriages, return of prodigal children, and sanctification of family life.',
    closingPrayer: `Jesus, Mary, and Joseph, I give you my heart and my soul.
Jesus, Mary, and Joseph, assist me in my last agony.
Jesus, Mary, and Joseph, may I breathe forth my soul in peace with you. Amen. Our Father... Hail Mary... Glory Be...`,
    days: [
      {
        dayNumber: 1,
        theme: 'The Sacred Bond of Christian Marriage',
        scriptureVerse: 'Matthew 1:24: "When Joseph woke from sleep, he did as the angel of the Lord commanded him: he took his wife."',
        prayerText: `Holy Family of Nazareth, in the pure and faithful bond between Mary and Joseph, God prepared a sanctuary for His Eternal Son. Bless all married couples with mutual reverence, fidelity, and enduring tenderness, and hear our prayer (mention your intention).`,
        intentionsFocus: 'Strengthening and healing of marriages.'
      },
      {
        dayNumber: 2,
        theme: 'Welcoming Children as Gifts from God',
        scriptureVerse: 'Psalm 127:3: "Behold, children are a heritage from the Lord, the fruit of the womb a reward."',
        prayerText: `Jesus, Mary, and Joseph, you rejoiced over the newborn Savior in the poverty of Bethlehem. Bless all parents, protect children from every harm of body and soul, and comfort couples longing for the gift of a child (mention your intention).`,
        intentionsFocus: 'Blessing upon children, parents, and expectant mothers.'
      },
      {
        dayNumber: 3,
        theme: 'Courage in Family Trials (The Flight into Egypt)',
        scriptureVerse: 'Matthew 2:13-14: "Rise, take the child and his mother, and flee to Egypt... And he rose and took the child and his mother by night."',
        prayerText: `Holy Family, you knew the hardship of exile, danger, and uncertainty when fleeing Herod's wrath into Egypt. Stand beside our family whenever crisis, illness, or financial hardship strikes, and guide us to safety (mention your intention).`,
        intentionsFocus: 'Protection of our family in times of trial or uncertainty.'
      },
      {
        dayNumber: 4,
        theme: 'Seeking Jesus in the Temple Above All Else',
        scriptureVerse: 'Luke 2:49: "And he said to them, \'Why were you looking for me? Did you not know that I must be in my Father\'s house?\'"',
        prayerText: `Mary and Joseph, for three days you sought the twelve-year-old Jesus with sorrow until you found Him in the Temple. When anyone in our family wanders away from God, help us seek Christ together in His Church (mention your intention).`,
        intentionsFocus: 'Return of family members who have drifted from the Church.'
      },
      {
        dayNumber: 5,
        theme: 'The Hidden Years of Nazareth',
        scriptureVerse: 'Luke 2:51-52: "And he went down with them and came to Nazareth and was submissive to them... And Jesus increased in wisdom and in stature and in favor with God and man."',
        prayerText: `Divine Jesus, for thirty years You sanctified ordinary family life in Nazareth by obeying Mary and Joseph. Teach our household the beauty of respect, kindness, shared meals, and daily family prayer (mention your intention).`,
        intentionsFocus: 'Peace, patience, and mutual respect in daily home life.'
      },
      {
        dayNumber: 6,
        theme: 'Saint Joseph, Pillar of Families and Model of Workers',
        scriptureVerse: 'Colossians 3:23: "Whatever you do, work heartily, as for the Lord and not for men."',
        prayerText: `Good Saint Joseph, in your carpenter's workshop in Nazareth you labored side by side with Jesus to provide for Mary. Bless the work of our hands, grant dignified employment to those seeking work, and guard our home (mention your intention).`,
        intentionsFocus: 'Employment, financial provision, and sanctification of work.'
      },
      {
        dayNumber: 7,
        theme: 'Mary, Queen of the Domestic Church',
        scriptureVerse: 'Luke 2:19: "But Mary treasured up all these things, pondering them in her heart."',
        prayerText: `Mother Mary, your gentle presence filled the House of Nazareth with warmth, prayer, and peace. Reign as Queen of our domestic church and teach us to pray the Family Rosary together (mention your intention).`,
        intentionsFocus: 'Establishing daily family prayer and the Rosary in our home.'
      },
      {
        dayNumber: 8,
        theme: 'Forgiveness and Healing of Family Wounds',
        scriptureVerse: 'Colossians 3:13: "Bearing with one another and, if one has a complaint against another, forgiving each other; as the Lord has forgiven you, so you also must forgive."',
        prayerText: `Holy Family of Nazareth, where no harsh word or resentment ever dwelt, heal any estrangement, misunderstanding, or unforgiveness among our relatives. Restore warm charity to our family table (mention your intention).`,
        intentionsFocus: 'Reconciliation and forgiveness among estranged relatives.'
      },
      {
        dayNumber: 9,
        theme: 'Consecration of Our Home to the Holy Family',
        scriptureVerse: 'Joshua 24:15: "As for me and my house, we will serve the Lord."',
        prayerText: `O Jesus, Mary, and Joseph, on this Feast of the Holy Family we consecrate our home, our marriage, our children, and all our loved ones to your sacred care. Make our home a little Nazareth on earth, and reunite our entire family one day in the eternal home of Heaven. Amen. (mention your intention).`,
        intentionsFocus: 'Total consecration of our family to Jesus, Mary, and Joseph.'
      }
    ]
  },
  {
    id: 'novena-surrender',
    title: 'The Surrender Novena',
    subtitle: '"O Jesus, I surrender myself to You, take care of everything!"',
    patronOrSubject: 'Our Lord Jesus Christ and Servant of God Don Dolindo Ruotolo',
    associatedFeast: 'Feast of the Sacred Heart / Year-round',
    traditionalStartDate: 'Anytime',
    traditionalFeastDate: 'Anytime',
    category: 'Jesus',
    description: 'Given by Jesus to the Italian mystic priest Servant of God Fr. Dolindo Ruotolo (contemporary and spiritual brother of Padre Pio). Jesus promised that whenever a soul surrenders their worry completely into His hands with child-like trust, He will work miracles in their circumstances.',
    intentionsSuggestion: 'Release chronic anxiety, impossible dilemmas, future fears, and the urge to micromanage.',
    closingPrayer: `O Jesus, I surrender myself to You, take care of everything! (Repeat 10 times with deep peace). Mother Mary, take my hand and place it in the hands of your Son. Amen.`,
    days: [
      {
        dayNumber: 1,
        theme: 'Resting from Worry',
        scriptureVerse: 'Matthew 6:27: "And which of you by being anxious can add a single hour to his span of life?"',
        prayerText: `Why do you confuse yourselves by worrying? Leave the care of your affairs to Me and everything will be peaceful. I say to you in truth that every act of true, blind, complete surrender to Me produces the effect that you wish, and resolves all difficult situations.`,
        intentionsFocus: 'Ceasing useless rumination and resting in the Lord.'
      },
      {
        dayNumber: 2,
        theme: 'Surrender is Not Resignation',
        scriptureVerse: 'Proverbs 3:5-6: "Trust in the Lord with all your heart, and do not lean on your own understanding."',
        prayerText: `Surrender to Me does not mean to fret, to be upset, or to lose hope, nor does it mean offering to Me a worried prayer asking Me to follow you and change your worry into prayer. It is against this surrender, deeply against it, to worry, to be nervous and to desire to think about the consequences of anything.`,
        intentionsFocus: 'Letting God be God rather than directing Him how to solve things.'
      },
      {
        dayNumber: 3,
        theme: 'Closing Your Eyes to Panic',
        scriptureVerse: 'Psalm 46:10: "Be still, and know that I am God."',
        prayerText: `How many things I do when the soul, in so much spiritual and material need, turns to Me, looks at Me and says to Me: "You take care of it," then closes its eyes and rests! In pain you pray for Me to act, but that I act the way you want. You are like the sick person who asks the doctor for a cure yet tells him how to do it. Do not act so, but pray as I taught you: "Hallowed be Thy name... Thy will be done."`,
        intentionsFocus: 'Closing your eyes to outer panic and resting like a child in arms.'
      },
      {
        dayNumber: 4,
        theme: 'God Works While You Sleep',
        scriptureVerse: 'Psalm 127:2: "For he gives to his beloved sleep."',
        prayerText: `You are sleepless; you want to judge everything, direct everything and see to everything and you surrender to human strength, or worse—to men themselves, trusting in their intervention. This is what hinders My words and My views. Oh how much I wish from you this surrender, perfect and complete; and how much I suffer when I see you so agitated!`,
        intentionsFocus: 'Trusting God during sleep and quiet moments.'
      },
      {
        dayNumber: 5,
        theme: 'Miracles of True Surrender',
        scriptureVerse: 'Luke 1:37: "For nothing will be impossible with God."',
        prayerText: `When you say to Me in all sincerity: "Thy will be done," you say the same thing as: "You take care of it." I will intervene with all My omnipotence, and I will resolve the most difficult situations. A thousand prayers cannot equal a single act of surrender; remember this well. There is no better novena than this.`,
        intentionsFocus: 'Confidence in Christ\'s omnipotent power.'
      },
      {
        dayNumber: 6,
        theme: 'Trusting Even When Things Seem Worse',
        scriptureVerse: '2 Corinthians 5:7: "For we walk by faith, not by sight."',
        prayerText: `You see evil growing instead of weakening? Do not fret. Close your eyes and say to Me with faith: "Thy will be done, You take care of it." I say to you that I will take care of it, and that I will intervene like a physician and accomplish miracles when they are needed. Often things must look worse before they can be healed, so that the glory belongs solely to God.`,
        intentionsFocus: 'Remaining unshaken when immediate circumstances look contrary.'
      },
      {
        dayNumber: 7,
        theme: 'Satan\'s Weapon is Agitation',
        scriptureVerse: 'John 14:27: "Peace I leave with you; my peace I give to you. Not as the world gives do I give to you. Let not your hearts be troubled."',
        prayerText: `Satan wishes precisely this: to agitate you and to separate you from My protection, throwing you into the turmoil of human initiatives. Trust only in Me instead, rest in Me, surrender to Me in everything. I perform miracles in proportion to your full surrender to Me and to your not thinking of yourself.`,
        intentionsFocus: 'Rejecting agitation and choosing Christ\'s divine peace.'
      },
      {
        dayNumber: 8,
        theme: 'Resting in the Divine Arms',
        scriptureVerse: 'Deuteronomy 33:27: "The eternal God is your dwelling place, and underneath are the everlasting arms."',
        prayerText: `Close your eyes and let yourself be carried away on the flowing pool of My grace; close your eyes and do not think of the present, turning your thoughts away from the future just as you would from temptation. Repose in Me, believing in My goodness, and I promise you by My love that if you say: "You take care of it," I will take care of it all.`,
        intentionsFocus: 'Total childlike surrender into the hands of the Father.'
      },
      {
        dayNumber: 9,
        theme: 'Consecration to the Blessed Mother',
        scriptureVerse: 'John 19:27: "Then he said to the disciple, \'Behold, your mother!\' And from that hour the disciple took her to his own home."',
        prayerText: `Pray always in readiness to surrender, and you will receive from it great peace and great fruit, even when I grant you the grace of immolation, of repentance and of love. Then what does suffering matter? It seems impossible to you? Close your eyes and say with all your soul: "Jesus, You take care of it." Do not be afraid, I will take care of things and you will bless My name by humbling yourself.`,
        intentionsFocus: 'Final peace, fruit of holiness, and consecration.'
      }
    ]
  },
  {
    id: 'novena-divine-mercy',
    title: 'Divine Mercy Novena',
    subtitle: 'Dictated by Jesus to Saint Maria Faustina Kowalska',
    patronOrSubject: 'Jesus Christ, King of Mercy',
    associatedFeast: 'Feast of Divine Mercy (First Sunday after Easter)',
    traditionalStartDate: 'Anytime',
    traditionalFeastDate: 'Anytime',
    category: 'Jesus',
    description: 'Jesus requested that this novena be prayed especially starting on Good Friday leading up to Divine Mercy Sunday, but it may also be prayed at any time throughout the year for the conversion of the world and relief of holy souls.',
    intentionsSuggestion: 'The salvation of souls, sinners, priests, and the dying.',
    closingPrayer: `Eternal God, in whom mercy is endless and the treasury of compassion inexhaustible, look kindly upon us and increase Your mercy in us, that in difficult moments we might not despair nor become despondent, but with great confidence submit ourselves to Your holy will, which is Love and Mercy itself. Amen.`,
    days: [
      {
        dayNumber: 1,
        theme: 'All Mankind, Especially Sinners',
        scriptureVerse: '1 Timothy 1:15: "Christ Jesus came into the world to save sinners."',
        prayerText: `Today bring to Me all mankind, especially all sinners, and immerse them in the ocean of My mercy. Most Merciful Jesus, whose very nature is to have compassion on us and to forgive us, do not look upon our sins but upon our trust which we place in Your infinite goodness. Receive us all into the abode of Your Most Compassionate Heart.`,
        intentionsFocus: 'All sinners throughout the whole world.'
      },
      {
        dayNumber: 2,
        theme: 'The Souls of Priests and Religious',
        scriptureVerse: 'Hebrews 7:25: "He is able to save completely those who come to God through him, because he always lives to intercede for them."',
        prayerText: `Today bring to Me the souls of priests and religious, and immerse them in My unfathomable mercy. It was they who gave Me strength to endure My bitter Passion; through them as through channels My mercy flows out upon mankind. Protect them from lukewarmness.`,
        intentionsFocus: 'Priests, bishops, monks, nuns, and seminarians.'
      },
      {
        dayNumber: 3,
        theme: 'All Devout and Faithful Souls',
        scriptureVerse: 'Revelation 3:10: "Because you have kept my word about patient endurance, I will keep you from the hour of trial."',
        prayerText: `Today bring to Me all devout and faithful souls, and immerse them in the ocean of My mercy. These souls brought Me consolation on the Way of the Cross. They were that drop of consolation in the midst of an ocean of bitterness.`,
        intentionsFocus: 'All faithful Christians who strive for holiness.'
      },
      {
        dayNumber: 4,
        theme: 'Those Who Do Not Know Jesus and Those Who Do Not Yet Believe',
        scriptureVerse: 'John 3:16: "For God so loved the world that he gave his only-begotten Son."',
        prayerText: `Today bring to Me those who do not believe in God and those who do not yet know Me. I was thinking also of them during My bitter Passion, and their future zeal comforted My Heart. Draw them into the light of the Gospel.`,
        intentionsFocus: 'Unbelievers, agnostics, atheists, and pagans.'
      },
      {
        dayNumber: 5,
        theme: 'The Souls of Those Who Have Separated Themselves from the Church',
        scriptureVerse: 'John 17:21: "That they may all be one, even as you, Father, are in me, and I in you."',
        prayerText: `Today bring to Me the souls of those who have separated themselves from My Church, and immerse them in the ocean of My mercy. During My bitter Passion they tore at My Body and Heart, that is, My Church. Bring them back to unity.`,
        intentionsFocus: 'Reconciliation and unity within the one Catholic Church.'
      },
      {
        dayNumber: 6,
        theme: 'The Meek and Humble Souls and the Souls of Little Children',
        scriptureVerse: 'Matthew 11:29: "Take my yoke upon you, and learn from me, for I am meek and lowly in heart."',
        prayerText: `Today bring to Me the meek and humble souls and the souls of little children, and immerse them in My mercy. These souls most closely resemble My Heart. They strengthened Me during My agony; I saw them as earthly angels who would keep vigil at My altars.`,
        intentionsFocus: 'Little children, the unborn, and gentle humble souls.'
      },
      {
        dayNumber: 7,
        theme: 'The Souls Who Especially Venerate and Glorify Jesus\' Mercy',
        scriptureVerse: 'Psalm 89:1: "I will sing of the mercies of the Lord forever."',
        prayerText: `Today bring to Me the souls who especially venerate and glorify My mercy, and immerse them in My mercy. These souls sorrowed most over My Passion and entered most deeply into My spirit. They are living images of My Compassionate Heart.`,
        intentionsFocus: 'Devotees and promoters of the Divine Mercy message.'
      },
      {
        dayNumber: 8,
        theme: 'The Souls Detained in Purgatory',
        scriptureVerse: '2 Maccabees 12:46: "It is a holy and wholesome thought to pray for the dead, that they may be loosed from sins."',
        prayerText: `Today bring to Me the souls who are in the prison of Purgatory, and immerse them in the abyss of My mercy. Let the torrents of My Blood cool down their scorching flames. All these souls are greatly loved by Me; they are making retribution to My justice.`,
        intentionsFocus: 'Holy souls in Purgatory, especially our family and the most forgotten.'
      },
      {
        dayNumber: 9,
        theme: 'Souls Who Have Become Lukewarm',
        scriptureVerse: 'Revelation 3:15-16: "I know your works: you are neither cold nor hot. Would that you were cold or hot!"',
        prayerText: `Today bring to Me souls who have become lukewarm, and immerse them in the abyss of My mercy. These souls wound My Heart most painfully. My soul suffered the most dreadful loathing in the Garden of Olives because of lukewarm souls. Kindle in them once more the flame of divine charity.`,
        intentionsFocus: 'Lukewarm souls and those indifferent to the Holy Mass.'
      }
    ]
  }
];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function formatMonthDayLabel(mmdd: string): string {
  if (!mmdd || mmdd === 'Anytime' || !mmdd.includes('-')) return mmdd;
  const [mStr, dStr] = mmdd.split('-');
  const m = parseInt(mStr, 10);
  const d = parseInt(dStr, 10);
  if (isNaN(m) || isNaN(d) || m < 1 || m > 12) return mmdd;
  return `${MONTH_NAMES[m - 1]} ${d}`;
}

export interface NovenaScheduleInfo {
  status: 'in-progress' | 'starting-soon' | 'completed-recently' | 'anytime';
  activeDay?: number; // 1..9 if in-progress
  daysUntilStart?: number;
  startDateFormatted: string;
  feastDateFormatted: string;
  feastMonth: 'October' | 'November' | 'December' | 'Anytime';
}

export function getNovenaScheduleInfo(novena: Novena, currentDateStr: string): NovenaScheduleInfo {
  if (novena.traditionalStartDate === 'Anytime' || !novena.traditionalStartDate.includes('-')) {
    return {
      status: 'anytime',
      startDateFormatted: 'Anytime Year-Round',
      feastDateFormatted: novena.associatedFeast,
      feastMonth: 'Anytime'
    };
  }

  const [yearStr] = currentDateStr.split('-');
  const year = parseInt(yearStr, 10) || 2026;
  const todayMs = new Date(`${currentDateStr}T00:00:00`).getTime();

  const [startMonthStr, startDayStr] = novena.traditionalStartDate.split('-');
  const [feastMonthStr] = novena.traditionalFeastDate.split('-');
  const feastMonthNum = parseInt(feastMonthStr, 10);

  const feastMonth: 'October' | 'November' | 'December' | 'Anytime' =
    feastMonthNum === 10
      ? 'October'
      : feastMonthNum === 11
      ? 'November'
      : feastMonthNum === 12
      ? 'December'
      : 'Anytime';

  const startIso = `${year}-${startMonthStr.padStart(2, '0')}-${startDayStr.padStart(2, '0')}`;
  const startMs = new Date(`${startIso}T00:00:00`).getTime();
  const diffDays = Math.round((todayMs - startMs) / (1000 * 60 * 60 * 24));

  const startDateFormatted = formatMonthDayLabel(novena.traditionalStartDate);
  const feastDateFormatted = formatMonthDayLabel(novena.traditionalFeastDate);

  if (diffDays >= 0 && diffDays <= 8) {
    return {
      status: 'in-progress',
      activeDay: diffDays + 1,
      startDateFormatted,
      feastDateFormatted,
      feastMonth
    };
  }

  if (diffDays < 0) {
    return {
      status: 'starting-soon',
      daysUntilStart: Math.abs(diffDays),
      startDateFormatted,
      feastDateFormatted,
      feastMonth
    };
  }

  return {
    status: 'completed-recently',
    startDateFormatted,
    feastDateFormatted,
    feastMonth
  };
}

/**
 * Generates daily-updated default active novenas for the current date,
 * including any recently completed novena in the Completed template state
 * plus the currently active liturgical feast novenas for today.
 */
export function getDailyDefaultUserNovenas(currentDateStr: string): UserNovenaProgress[] {
  const [yearStr] = currentDateStr.split('-');
  const year = parseInt(yearStr, 10) || 2026;

  // Find liturgical novenas currently in their 9-day window today
  const inProgressLiturgical = NOVENAS_DATABASE
    .map(novena => ({
      novena,
      info: getNovenaScheduleInfo(novena, currentDateStr)
    }))
    .filter(item => item.info.status === 'in-progress');

  const activeList: UserNovenaProgress[] = inProgressLiturgical.map(({ novena, info }) => {
    const activeDay = info.activeDay || 1;
    const completedDays = Array.from({ length: Math.max(0, activeDay - 1) }, (_, idx) => idx + 1);
    return {
      novenaId: novena.id,
      startDate: `${year}-${novena.traditionalStartDate}`,
      currentDay: activeDay,
      completedDays,
      personalIntention: novena.intentionsSuggestion,
      isCompleted: false
    };
  });

  // If fewer than 2 liturgical novenas are in progress today, add the next upcoming one starting soon
  if (activeList.length === 0) {
    const nextUpcoming = NOVENAS_DATABASE
      .map(novena => ({
        novena,
        info: getNovenaScheduleInfo(novena, currentDateStr)
      }))
      .filter(item => item.info.status === 'starting-soon')
      .sort((a, b) => (a.info.daysUntilStart || 999) - (b.info.daysUntilStart || 999))[0];

    if (nextUpcoming) {
      activeList.push({
        novenaId: nextUpcoming.novena.id,
        startDate: currentDateStr,
        currentDay: 1,
        completedDays: [],
        personalIntention: nextUpcoming.novena.intentionsSuggestion,
        isCompleted: false
      });
    }
  }

  // Also include the completed Surrender Novena (Oct 14–22) so the Completed Novena template is visible and can be replaced or restarted
  activeList.push({
    novenaId: 'novena-surrender',
    startDate: '2026-10-14',
    currentDay: 9,
    completedDays: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    personalIntention: 'For peace of heart, total surrender of work anxieties to Jesus, and healing of family tension.',
    isCompleted: true
  });

  return activeList;
}

export function getStartingSoonNovenas(todayMonthDay: string): Novena[] {
  return NOVENAS_DATABASE.filter(n => n.traditionalStartDate !== 'Anytime');
}
