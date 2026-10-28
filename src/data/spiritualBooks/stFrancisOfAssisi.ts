import { SpiritualBook } from '../spiritualBooks';

export const ST_FRANCIS_OF_ASSISI: SpiritualBook = {
  id: 'st-francis-of-assisi',
  title: 'The Life of Saint Francis of Assisi (Legenda Maior)',
  latinTitle: 'Legenda Maior Sancti Francisci • Doctor Seraphicus',
  author: 'St. Bonaventure of Bagnoregio',
  authorTitle: 'Minister General of the Friars Minor, Cardinal Bishop of Albano, and Seraphic Doctor of the Church',
  era: '1263 A.D.',
  category: 'saints',
  categoryLabel: 'Sacred Hagiography & Seraphic Mysticism',
  description: 'Commissioned by the General Chapter of Narbonne and approved at Pisa in 1263 as the authoritative biography of the Seraphic Patriarch, St. Bonaventure’s complete Legenda Maior (Prologue, all Fifteen Chapters, and the Treatise on Miracles after Death) traces St. Francis from his conversion in Assisi to the Sacred Stigmata on Mount La Verna and his glorious Transitus.',
  theologicalFocus: 'Evangelical Poverty, Conformity to Christ Crucified, Humility and Obedience, The Sacred Stigmata, and Cosmic Brotherhood',
  nihilObstat: 'Quaracchi Critical Edition (Doctoris Seraphici S. Bonaventurae Opera Omnia, Tomus VIII)',
  imprimatur: 'Approved by the General Chapter of the Order of Friars Minor (Pisa, 1263)',
  coverGradient: 'from-[#5D4037] via-[#4E342E] to-[#3E2723]',
  accentColor: '#F59E0B',
  emblemSymbol: '🕊️',
  estimatedMinutesPerChapter: 9,
  chapters: [
    {
      id: 'sfa-prol',
      chapterNumber: 1,
      title: 'Prologue: The Grace of God Our Savior Appearing in His Servant Francis',
      latinTitle: 'Prologus • Apparuit Gratia Dei Salvatoris Nostri in Servo Suo Francisco',
      subtitle: 'St. Francis as the Angel ascending from the rising of the sun bearing the seal of the Living God.',
      paragraphs: [
        'The grace of God our Savior has appeared in these last days in His servant Francis to all who are truly humble and lovers of holy poverty, who, venerating in him the superabundant mercy of God, learn by his example to reject ungodliness and worldly desires, to live in conformity with Christ, and to thirst with unwearying desire for blessed hope.',
        'Like the hierarchies of the angels above, he was raised by the fire of seraphic love from the lowest dust of evangelical humility to the summit of contemplation, bearing in his own flesh the sacred seal of the Living God—the Stigmata of Jesus Crucified—which I myself learned from the mouths of his living companions when I traveled to Assisi after being healed through his intercession in childhood.'
      ],
      keyQuote: 'The grace of God our Savior has appeared in these last days in His servant Francis to all who are truly humble and lovers of holy poverty.',
      quoteCitation: 'Prologue, §§ 1–5',
      reflectionPrompt: 'How does the life of St. Francis show that evangelical holiness is possible in every age of the Church?'
    },
    {
      id: 'sfa-ch-1',
      chapterNumber: 2,
      title: 'Chapter I: Of His Manner of Life in Secular Garb',
      latinTitle: 'Caput I • De Conversatione Ipsius in Habitu Saeculari',
      subtitle: 'Youth in Assisi, natural generosity to the poor, the vision of the palace of arms marked with the Cross, and the kiss of the leper.',
      paragraphs: [
        'There was a man in the city of Assisi, by name Francis, whose memory is in benediction. Though reared in vanity among the wealthy merchant youth, God implanted in his heart such natural compassion for the poor that he resolved never to refuse anyone who asked an alms for the love of God. After a long illness and a vision of a palace filled with knightly arms signed with the Cross, he set out for Apulia to win knighthood, when the Lord spoke to him in sleep at Spoleto: "Francis, who can do more for you, the Lord or the servant?" Asking, "Lord, what wilt Thou have me to do?", he was told: "Return to thy native land, and it shall be told thee what thou must do."',
        'Riding across the plain of Assisi one day, he met a leper whose disfigured appearance filled him with natural horror. Remembering his resolution to become a knight of Christ, he dismounted, ran to embrace the leper, placed an alms in his hand, and kissed his hand and face—whereupon the leper vanished, and what had formerly seemed bitter to Francis was turned into sweetness of soul and body.'
      ],
      keyQuote: 'Dismounting from his horse, he ran to kiss the leper, and immediately what had formerly seemed bitter was turned into sweetness of soul and body.',
      quoteCitation: 'Chapter I, §§ 1–6',
      reflectionPrompt: 'Where is Christ inviting you to overcome natural reluctance and embrace Him in the poor or suffering?'
    },
    {
      id: 'sfa-ch-2',
      chapterNumber: 3,
      title: 'Chapter II: Of His Perfect Conversion to God, and Repairing of Three Churches',
      latinTitle: 'Caput II • De Perfecta Ipsius Conversione ad Deum et Reparatione Trium Ecclesiarum',
      subtitle: 'The voice of the Crucified at San Damiano, renouncing his earthly inheritance before the Bishop of Assisi, and rebuilding San Damiano, San Pietro, and the Portiuncula.',
      paragraphs: [
        'Praying one day before the Byzantine Crucifix in the crumbling Church of San Damiano outside Assisi, his eyes streaming with tears as he gazed upon the glorious wounds of the Savior, Francis heard a voice speak three times from the Cross: "Francis, go and repair My house, which, as thou seest, is falling utterly into ruin!" Trembling with awe, he took the command literally at first and sold cloth to repair the masonry.',
        'Summoned by his angry father Pietro Bernardone before Bishop Guido of Assisi, Francis stripped off all his garments and returned them with the money to his father, declaring with radiant joy: "Hitherto I have called Pietro Bernardone my father; henceforth I can say in all truth: Our Father, Who art in heaven!" Clothed in a coarse peasant’s tunic marked with chalk in the shape of a cross, he repaired with his own hands three churches: San Damiano, St. Peter’s, and St. Mary of the Angels at the Portiuncula, foreshadowing the triple renewal of the Order and the universal Church.'
      ],
      keyQuote: '"Francis, go and repair My house, which, as thou seest, is falling utterly into ruin!" And henceforth he could say with total freedom: "Our Father, Who art in heaven!"',
      quoteCitation: 'Chapter II, §§ 1–8',
      reflectionPrompt: 'How does detaching our heart from worldly security allow us to pray "Our Father" with complete childlike trust?'
    },
    {
      id: 'sfa-ch-3',
      chapterNumber: 4,
      title: 'Chapter III: Of the Founding of the Order, and Approval of the First Rule',
      latinTitle: 'Caput III • De Institutione Religionis et Approbatione Regulae',
      subtitle: 'Hearing the Gospel of the Apostles at the Portiuncula, receiving Bernard of Quintavalle and the first eleven brothers, and Pope Innocent III’s vision of the Lateran Basilica.',
      paragraphs: [
        'On the Feast of St. Matthias at St. Mary of the Angels, hearing the Gospel read how Christ sent His disciples to preach the Kingdom of God without gold, silver, scrip, two coats, or shoes, Francis cried out with joy: "This is what I desire; this is what I seek with all my heart!" Immediately he cast off his shoes, exchanged his leather belt for a rough cord, and began to preach penance and peace with the greeting: "The Lord give you peace!"',
        'Joined by Bernard of Quintavalle, Peter Catani, Brother Giles, and eight others until they numbered twelve, Francis wrote a brief Rule in the words of the Gospel and walked with them to Rome. Though initially hesitant because the way of life seemed above human strength, Pope Innocent III saw in a dream the Lateran Basilica tilting toward collapse and upheld on the shoulders of the poor little man of Assisi—and embracing Francis, he verbally approved the Rule and commissioned the friars to preach penance everywhere.'
      ],
      keyQuote: 'Pope Innocent III saw in vision the Lateran Basilica upheld by the shoulders of the poor man of Assisi, and exclaimed: "Truly this is he who by his work and doctrine shall sustain the Church of Christ!"',
      quoteCitation: 'Chapter III, §§ 1–10',
      reflectionPrompt: 'How does humble fidelity to the Gospel sustain the Church far more powerfully than human wealth or prestige?'
    },
    {
      id: 'sfa-ch-4',
      chapterNumber: 5,
      title: 'Chapter IV: Of the Advancement of the Order, and Confirmation of the Rule by Pope Honorius III',
      latinTitle: 'Caput IV • De promotione Ordinis sub Manu Ipsius et Confirmatione Regulae',
      subtitle: 'The three Orders (Friars Minor, Poor Clares, and Third Order of Penance), the fiery chariot at Rivotorto, and the Rule confirmed on Mount Fonte Colombo.',
      paragraphs: [
        'Establishing their motherhouse at St. Mary of the Angels in the Portiuncula, the family of Francis grew into three sacred Orders: the Friars Minor, the Poor Ladies under St. Clare at San Damiano, and the Order of Brothers and Sisters of Penance for those living in the world. One midnight while Francis was praying at Assisi and the brothers were at Rivotorto, a fiery chariot of dazzling brightness entered their hut three times, bearing a shining globe like the sun, by which the brethren recognized the spirit of the new Elijah.',
        'Ascending the mountain of Fonte Colombo with Brother Leo and Brother Bonizo to fast for forty days, Francis composed the definitive twelve-chapter Rule under the direct inspiration of Christ, which Pope Honorius III solemnly confirmed by Papal Bull on November 29, 1223.'
      ],
      keyQuote: 'Like a second Elijah, his spirit appeared to the brethren as a blazing globe of fire upon a chariot, inflaming the three Orders of the Church with evangelical charity.',
      quoteCitation: 'Chapter IV, §§ 1–11',
      reflectionPrompt: 'How does the Franciscan charism invite lay people, religious, and clergy alike into evangelical simplicity?'
    },
    {
      id: 'sfa-ch-5',
      chapterNumber: 6,
      title: 'Chapter V: Of the Austerity of His Life, and How All Creatures Afforded Him Comfort',
      latinTitle: 'Caput V • De Austeritate Vitae et Quomodo Creaturae Praebebant Ei Solatium',
      subtitle: 'Custody of the senses, calling the body "Brother Ass," and Brother Fire showing courtesy during his eye cauterization.',
      paragraphs: [
        'Watching over his senses with unceasing vigilance, Francis governed his body—which he called "Brother Ass"—with holy discipline so that the flesh might remain subject to the spirit, yet forbade the brethren any indiscreet severity that would hinder charity or prayer.',
        'Because he had returned to the state of primeval innocence through purity of heart, all creation seemed to obey and comfort him. When physicians at Rieti had to cauterize his temples with a red-hot iron from ear to eyebrow to treat his blindness, Francis made the sign of the Cross over the glowing iron and said: "Brother Fire, noble and useful among all creatures, be courteous to me in this hour, for I have always loved thee for the love of Him Who created thee!" And when the iron hissed into his flesh, he felt neither pain nor burning.'
      ],
      keyQuote: '"Brother Fire, noble and useful among all creatures, be courteous to me in this hour, for I have always loved thee for the love of Him Who created thee!"',
      quoteCitation: 'Chapter V, §§ 1–12',
      reflectionPrompt: 'How does purity of heart restore our peaceful harmony with God’s creation and with bodily suffering?'
    },
    {
      id: 'sfa-ch-6',
      chapterNumber: 7,
      title: 'Chapter VI: Of His Humility and Obedience, and of God’s Condescension to His Will',
      latinTitle: 'Caput VI • De Humilitate et Obedientia et Condescensione Divina',
      subtitle: 'Rejoicing to be esteemed least of all, resigning the generalate to become a subject, and the Seraphic Throne reserved in Heaven.',
      paragraphs: [
        'Humility, the guardian and ornament of all virtues, filled the Man of God so abundantly that in his own eyes he was nothing but a sinner. When Brother Masseo tested him by asking, "Why does the whole world run after you when you are neither handsome, nor learned, nor of noble birth?", Francis lifted his eyes to heaven in ecstasy and replied that the Most High had chosen the vilest sinner on earth so that no flesh might glory before Him and all glory might belong manifestly to God alone.',
        'In a vision Brother Pacifico beheld in heaven a glorious throne once belonging to one of the fallen seraphim, and heard a voice declare: "This throne was kept for the humble Francis!" Desiring rather to obey than to command, he resigned the office of Minister General and asked for a guardian whom he himself had to obey in every daily action.'
      ],
      keyQuote: 'God chose the simplest and poorest instrument so that all men might see that every grace and virtue comes from the Most High alone.',
      quoteCitation: 'Chapter VI, §§ 1–11',
      reflectionPrompt: 'Why is humility the surest protection of every spiritual gift God bestows upon a soul?'
    },
    {
      id: 'sfa-ch-7',
      chapterNumber: 8,
      title: 'Chapter VII: Of His Love of Poverty, and the Wondrous Supplying of His Needs',
      latinTitle: 'Caput VII • De Amore Paupertatis et Mira Suppletione Defectuum',
      subtitle: 'Espousing Lady Poverty as the bride of the King of Heaven and dining on alms as the table of the Angels.',
      paragraphs: [
        'Seeing that Holy Poverty was the familiar companion of the Son of God from the manger of Bethlehem to the nakedness of the Cross, yet was rejected by the whole world, Francis espoused her with an eternal covenant of love, calling her his "Lady" and "Queen." Whenever he saw anyone poorer than himself, he was pierced with holy envy lest he be surpassed in likeness to the poor Christ.',
        'Sitting on a rock beside a spring with crusts of dry bread begged from door to door, he exclaimed with tears of joy: "Look, Brother, what a royal treasure we possess, dining at the table of the Angels in the free bounty of our Heavenly Father!"'
      ],
      keyQuote: 'Seeing that Holy Poverty was the familiar companion of the Son of God from the manger to the Cross, Francis espoused her with an eternal covenant of love.',
      quoteCitation: 'Chapter VII, §§ 1–13',
      reflectionPrompt: 'How does evangelical detachment free the heart to rejoice in the simplest gifts of God?'
    },
    {
      id: 'sfa-ch-8',
      chapterNumber: 9,
      title: 'Chapter VIII: Of the Affection of Pietas, and How Irrational Creatures Reverenced Him',
      latinTitle: 'Caput VIII • De Affectu Pietatis et Quomodo Creaturae Irrationales Ei Afficiebantur',
      subtitle: 'True piety as the root of universal brotherhood: the lamb at Rome, the falcon of La Verna, and the fish and birds praising their Creator.',
      paragraphs: [
        'True piety, which according to the Apostle is profitable unto all things, so filled the heart of Francis and lifted him to God that he called all creatures—however small—by the name of "brother" and "sister," because he knew they shared with him the same Principle and Creator. Above all creatures he loved gentle lambs, seeing in them the living image of Jesus Christ, the Meek Lamb led to the slaughter.',
        'At Greccio a wild leveret fled to his bosom; on Lake Piediluco a live tench swam alongside his boat until he blessed it and gave it leave to depart; on Mount La Verna a falcon woke him every night with its song at the hour of Matins—and when Francis was ill, the bird gently waited until dawn before ringing its feathered bell!'
      ],
      keyQuote: 'Tracing every stream of created beauty back to its Fountain, he called all creatures by the name of "brother" and "sister" because they shared with him one Origin.',
      quoteCitation: 'Chapter VIII, §§ 1–11',
      reflectionPrompt: 'How does looking upon creation with reverence lift our minds immediately to the Creator of all things?'
    },
    {
      id: 'sfa-ch-9',
      chapterNumber: 10,
      title: 'Chapter IX: Of the Fervor of His Charity, and Desire for Martyrdom',
      latinTitle: 'Caput IX • De Fervore Caritatis et Desiderio Martyrii',
      subtitle: 'Burning with seraphic love for Christ and souls, and preaching before Sultan Malik al-Kamil at Damietta in Egypt.',
      paragraphs: [
        'Who could recount the burning charity with which Francis, the friend of the Bridegroom, glowed? He seemed wholly consumed like a glowing coal by the fire of divine love. At the mere mention of "the love of God," his spirit was instantly stirred just as the strings of a harp vibrate at the touch of the plectrum. To him it seemed a shameful theft to care less for souls than for money, when Christ had paid His own Blood for every soul.',
        'Thirsting to shed his blood for Christ, he journeyed three times toward the lands of the Saracens, and in 1219 during the Fifth Crusade walked unarmed across the battle lines at Damietta in Egypt into the camp of Sultan Malik al-Kamil. Preaching the Triune God and Jesus Christ the Savior with such apostolic intrepidity and offering to walk into a great fire to prove the truth of the Gospel, he won the Sultan’s deep reverence—and though the sword of martyrdom was withheld from his neck, God reserved for him the fiery martyrdom of the Stigmata.'
      ],
      keyQuote: 'At the mere mention of "the love of God," his whole spirit vibrated like the strings of a harp; and though the sword of martyrdom was withheld, Christ reserved for him the martyrdom of the Stigmata.',
      quoteCitation: 'Chapter IX, §§ 1–9',
      reflectionPrompt: 'How can we bear witness to Christ before an unbelieving world with both fearless truth and genuine charity?'
    },
    {
      id: 'sfa-ch-10',
      chapterNumber: 11,
      title: 'Chapter X: Of His Zeal and Efficacy in Prayer',
      latinTitle: 'Caput X • De Studio et Virtute Orationis',
      subtitle: 'How Francis was not so much a man praying as one wholly transformed into living prayer: "My God and My All!"',
      paragraphs: [
        'Walking in the flesh yet pilgrimaging in spirit out of the body, Francis made his whole time and life a sacred leisure for contemplation, so that he seemed not merely a man who prayed, but one wholly transformed into living prayer! Whenever he prayed the Canonical Hours, he stood bareheaded with eyes fixed reverently on the earth, never leaning against a wall.',
        'Often in the woods at night the brethren beheld him lifted above the earth, surrounded by a luminous cloud, or heard him repeating through the entire night from dusk till dawn only these five words with streaming tears of joy: "Deus meus et omnia!" ("My God and my All!").'
      ],
      keyQuote: 'He seemed not merely a man who prayed, but one wholly transformed into living prayer, repeating through the night: "My God and my All!"',
      quoteCitation: 'Chapter X, §§ 1–7',
      reflectionPrompt: 'Pause right now and pray St. Francis’s night prayer slowly from the depths of your heart: "My God and my All!"'
    },
    {
      id: 'sfa-ch-11',
      chapterNumber: 12,
      title: 'Chapter XI: Of His Understanding of the Scriptures, and Spirit of Prophecy',
      latinTitle: 'Caput XI • De Intelligentia Scripturarum et Spiritu Prophetiae',
      subtitle: 'Penetrating the marrow of Sacred Scripture through purity of heart, and staging the first living Nativity Crib at Greccio in 1223.',
      paragraphs: [
        'Though unlearned in worldly rhetoric, Francis penetrated the hidden mysteries of Sacred Scripture with dazzling clarity, because where the teacher of human philosophy knocks from outside, the unction of the Lover of Christ enters within! When asked whether friars should study theology, he answered: "Yes, provided that after the example of Christ—of Whom we read more that He prayed than that He read—they never extinguish the spirit of holy prayer and devotion."',
        'To enkindle devotion to the poverty of the Incarnate Word, three years before his death he obtained permission from the Sovereign Pontiff to celebrate Christmas night at Greccio with a real manger filled with hay, an ox, and an ass. Standing as Deacon in dalmatic to chant the Holy Gospel of the Nativity and preach of the Babe of Bethlehem, a virtuous knight Sir John of Greccio saw a wondrous Infant sleeping in the manger Whom Blessed Francis took into his arms and awakened with his embrace.'
      ],
      keyQuote: 'Where the teacher of human philosophy knocks from outside, the unction of the Lover of Christ enters within; and at Greccio the Child of Bethlehem was awakened in hearts that had grown cold.',
      quoteCitation: 'Chapter XI, §§ 1–14',
      reflectionPrompt: 'How does gazing upon the humility of the Infant Jesus in the manger of Bethlehem heal human pride?'
    },
    {
      id: 'sfa-ch-12',
      chapterNumber: 13,
      title: 'Chapter XII: Of the Efficacy of His Preaching, and Grace of Healing',
      latinTitle: 'Caput XII • De Efficacia Praedicationis et Gratia Sanitatum',
      subtitle: 'Preaching to the birds near Bevagna, silencing the swallows at Alviano, and reconciling warring cities by the power of the Cross.',
      paragraphs: [
        'The word of Francis was like a burning torch, piercing the marrow of the heart because he never preached to others what he had not first practiced in himself. Walking near Bevagna, he saw a multitude of birds of every kind gathered in the fields; running joyfully to them, he greeted them and preached: "My brother birds, greatly ought you to praise your Creator, Who clothed you with feathers, gave you wings to fly, and feeds you without your sowing or reaping!" And the birds stretched out their necks, spread their wings, opened their beaks, and bowed their heads to the earth until he made the sign of the Cross over them.',
        'At Alviano the chattering swallows fell completely silent at his gentle request while he preached; at Arezzo he drove out the demons of civil war and restored peace to the whole city.'
      ],
      keyQuote: 'His word was like a burning torch piercing the marrow of the heart, because he never preached in word what he had not first wrought in deed.',
      quoteCitation: 'Chapter XII, §§ 1–12',
      reflectionPrompt: 'Why does example joined with humble love touch hearts that remain closed to mere arguments?'
    },
    {
      id: 'sfa-ch-13',
      chapterNumber: 14,
      title: 'Chapter XIII: Of the Sacred Stigmata on Mount La Verna (1224)',
      latinTitle: 'Caput XIII • De Sacris Stigmatibus in Monte Alvernae',
      subtitle: 'The forty-day fast of St. Michael, the vision of the six-winged Crucified Seraph, and the living nails and lance-wound in the flesh of Francis.',
      paragraphs: [
        'Two years before he yielded his spirit to heaven, Francis withdrew to the lofty mountain of La Verna to keep a forty-day fast in honor of St. Michael the Archangel. Opening the Gospel book three times on the altar to discern God’s will, each time the book opened to the Passion of Our Lord Jesus Christ, showing that as he had imitated Christ in the actions of his life, so he must be conformed to Him in the afflictions and sorrows of His Passion before departing from this world.',
        'On or about the Feast of the Exaltation of the Holy Cross, while praying on the mountainside at dawn, he beheld a Seraph with six fiery and shining wings descending from the height of heaven. Between the wings appeared the figure of a Man crucified, with hands and feet extended on a Cross. This vision filled his heart with mingling joy and sorrow—joy at the gracious gaze of Christ beneath the form of the Seraph, and piercing sorrow at the sight of His Crucifixion—knowing that bodily infirmity could not match the immortal spirit of a Seraph, until he understood that Not by martyrdom of flesh, but by the conflagration of the mind, he was to be wholly transformed into the likeness of Christ Crucified!',
        'As the vision disappeared, it left in his heart a marvelous ardor and in his flesh the no less marvelous imprint of the marks of the Passion: in his hands and feet appeared the heads and points of black iron nails formed out of his own flesh, and his right side was pierced as if with a lance, bearing a red wound that frequently stained his tunic with sacred blood.'
      ],
      keyQuote: 'By the conflagration of his mind he was wholly transformed into the express likeness of Christ Crucified, bearing in his heart a marvelous ardor and in his flesh the Sacred Stigmata.',
      quoteCitation: 'Chapter XIII, §§ 1–10',
      reflectionPrompt: 'How does true love always seek to become like the Beloved—even sharing in the wounds of Christ for the salvation of souls?'
    },
    {
      id: 'sfa-ch-14',
      chapterNumber: 15,
      title: 'Chapter XIV: Of His Patience, and His Passing in Death (Transitus, October 3, 1226)',
      latinTitle: 'Caput XIV • De Ipsius Patientia et Transitu Mortis',
      subtitle: 'Composing the Canticle of Brother Sun in blindness, welcoming Sister Bodily Death, and dying naked upon the bare ground at the Portiuncula.',
      paragraphs: [
        'During the two years after receiving the Sacred Stigmata, nailed in body and spirit to the Cross with Christ, Francis endured blindness and agonizing ailments of stomach, spleen, and liver with unfailing thanksgiving, composing the Canticle of Brother Sun and adding the stanza of fraternal forgiveness that reconciled the Bishop and Podestà of Assisi. Told by the physician that his end was near, he stretched out his hands with joy and cried: "Welcome, my Sister Death!"',
        'Carried back to St. Mary of the Angels at the Portiuncula so that he might render up the breath of life where he had first received the spirit of grace, he had himself laid naked upon the bare earth to wrestle in his final hour with the naked Enemy in total fidelity to Lady Poverty. Blessing all his brethren present and to come, having the Gospel of St. John ("Before the festival day of the Pasch...") read aloud, and intoning Psalm 141 ("With my voice I have cried to the Lord... Bring my soul out of prison"), on the evening of Saturday, October 3, 1226, as the larks soared singing above the roof in the twilight, his most holy soul was absorbed into the abyss of Eternal Light.'
      ],
      keyQuote: 'Stretching out his hands with joy, he cried: "Welcome, my Sister Death!" And as the larks sang in the twilight above the Portiuncula, his holy soul was absorbed into the abyss of Eternal Light.',
      quoteCitation: 'Chapter XIV, §§ 1–6',
      reflectionPrompt: 'How does living every day in union with Christ allow a soul to greet death not as a terror, but as "Sister Death," the gate of eternal life?'
    },
    {
      id: 'sfa-ch-15',
      chapterNumber: 16,
      title: 'Chapter XV: Of His Canonization, and the Translation of His Sacred Body',
      latinTitle: 'Caput XV • De Canonizatione et Translatione Ipsius',
      subtitle: 'Veneration of the Stigmata by the citizens of Assisi and St. Clare at San Damiano, and Canonization by Pope Gregory IX on July 16, 1228.',
      paragraphs: [
        'After the departure of the Blessed Father, his body—formerly dark from illness—shone with a dazzling whiteness and remained supple as that of a child, rendering visible to all the miracle of the Sacred Stigmata: the dark nails in his hands and feet and the rose-colored wound in his side. Carried in solemn procession past the Church of San Damiano so that St. Clare and her weeping daughters might kiss his stigmatized hands through their grille, his body was initially laid to rest in the Church of San Giorgio.',
        'On July 16, 1228, Pope Gregory IX came in person to Assisi, inscribed Francis in the catalogue of the Saints, and laid the foundation stone of the great Papal Basilica on the Hill of Paradise (Colle del Paradiso), to which his sacred body was translated in May 1230.'
      ],
      keyQuote: 'His sacred body shone with dazzling whiteness, displaying the miracle of the Stigmata as a foreshadowing of the glory of the Resurrection.',
      quoteCitation: 'Chapter XV, §§ 1–9',
      reflectionPrompt: 'Why did the Church see in St. Francis a living Gospel and a mirror of the risen and crucified Christ?'
    },
    {
      id: 'sfa-miracles',
      chapterNumber: 17,
      title: 'Part II: On the Miracles Wrought After His Passing (De Miraculis Post Transitus)',
      latinTitle: 'Pars II • De Miraculis Post Transitus Sancti Francisci',
      subtitle: 'How Pope Gregory IX’s doubt concerning the wound in Francis’s side was healed by a nocturnal vision, and the miracles of the Stigmata.',
      paragraphs: [
        'Before canonizing the Saint, Pope Gregory IX felt a slight hesitation in his heart regarding the wound in Francis’s side. One night the Blessed Francis appeared to the Pontiff with a stern countenance, raised his right arm to uncover the wound in his side, asked for a glass vessel, and filled it to the brim with the pure blood streaming from his side—from which moment Pope Gregory defended the Stigmata with ardent devotion.',
        'Across Italy, France, Spain, and the East, the dead were raised, ships were rescued from shipwreck, the blind received sight, and hardened sinners were moved to sacramental confession through the invocation of the Seraphic Father, fulfilling the promise that whoever humbles himself with Christ shall be exalted forever.'
      ],
      keyQuote: 'Appearing to Pope Gregory IX, Blessed Francis uncovered his side and filled a vessel with the living blood streaming from the wound, banishing every shadow of doubt.',
      quoteCitation: 'De Miraculis, I, §§ 1–6',
      reflectionPrompt: 'Ask St. Francis of Assisi today to obtain for you a share in his ardent love for Jesus Crucified and His Bride the Church.'
    }
  ]
};
