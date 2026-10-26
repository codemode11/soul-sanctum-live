export interface FaustinaDiaryExcerpt {
  id: string;
  diaryNumber: number;
  title: string;
  theme: string;
  quote: string;
  reflection: string;
  spokenBy: 'Jesus' | 'St. Faustina' | 'Our Lady';
}

export interface DivineMercyPromise {
  number: number;
  title: string;
  promise: string;
  diaryCitation: string;
  theologicalContext: string;
}

export const DIVINE_MERCY_PROMISES: DivineMercyPromise[] = [
  {
    number: 1,
    title: 'Great Mercy at the Hour of Death',
    promise: 'Whoever will recite it will receive great mercy at the hour of death.',
    diaryCitation: 'Diary, 687',
    theologicalContext: 'Christ guarantees that any soul who prays this chaplet with trust will not face despair in their final agony, but will be enveloped by the boundless mercy of the Redeemer.'
  },
  {
    number: 2,
    title: 'Christ as the Merciful Savior in Agony',
    promise: 'When they say this chaplet in the presence of the dying, I will stand between My Father and the dying person, not as the just Judge but as the merciful Savior.',
    diaryCitation: 'Diary, 1541',
    theologicalContext: 'The dying person is shielded from the terror of divine judgment; Christ Himself covers the soul with the infinite merits of His Holy Wounds and Precious Blood.'
  },
  {
    number: 3,
    title: 'Conversion of the Most Hardened Sinners',
    promise: 'Even if there were a sinner most hardened, if he were to recite this chaplet only once, he would receive grace from My infinite mercy.',
    diaryCitation: 'Diary, 687',
    theologicalContext: 'The power of the Chaplet is rooted in the Father accepting the sacrifice of His Beloved Son; even one sincere recitation touches the fathomless ocean of divine forgiveness.'
  },
  {
    number: 4,
    title: 'Defense as Christ’s Own Glory',
    promise: 'At the hour of death I defend as My own glory every soul that will say this chaplet; or when others say it for a dying person, the indulgence is the same.',
    diaryCitation: 'Diary, 811',
    theologicalContext: 'The Lord considers the salvation of the soul reciting the chaplet as a triumph of His own Passion, securing victory over Satan at life’s threshold.'
  },
  {
    number: 5,
    title: 'Granting All Compatible Petitions',
    promise: 'Through the chaplet you will obtain everything, if what you ask for is compatible with My will.',
    diaryCitation: 'Diary, 1731',
    theologicalContext: 'Because the chaplet pleads the Sorrowful Passion of Jesus, prayers made through it are aligned directly with the salvific will of the Eternal Father.'
  },
  {
    number: 6,
    title: 'Placating the Wrath of God',
    promise: 'My daughter, encourage souls to say the chaplet which I have given to you. It pleases Me to grant everything they ask of Me by saying the chaplet.',
    diaryCitation: 'Diary, 1541',
    theologicalContext: 'The chaplet is the ultimate act of propitiation, offering the Body, Blood, Soul, and Divinity of Jesus in atonement for our sins and those of the whole world.'
  },
  {
    number: 7,
    title: 'Last Hope of Salvation Recommended by Priests',
    promise: 'Priests will recommend it to sinners as their last hope of salvation. Write that when they say this chaplet in the presence of the dying, I will stand between My Father and the dying person.',
    diaryCitation: 'Diary, 687',
    theologicalContext: 'Holy Mother Church and her confessors are exhorted by Christ to place this chaplet into the hands of those near spiritual death as an anchor of eternal life.'
  },
  {
    number: 8,
    title: 'Unfathomable Mercy Envelops the Soul',
    promise: 'When this chaplet is said by the bedside of the dying, God’s anger is placated, unfathomable mercy envelops the soul, and the very depths of My tender mercy are moved for the sake of the sorrowful Passion of My Son.',
    diaryCitation: 'Diary, 811',
    theologicalContext: 'The Holy Trinity gazes upon the wounds of the Lamb slain from the foundation of the world, transforming the final struggle into a peaceful crossing into eternity.'
  },
  {
    number: 9,
    title: 'Tranquil and Peaceful Death',
    promise: 'When hardened sinners say it, I will fill their souls with peace, and the hour of their death will be a happy one.',
    diaryCitation: 'Diary, 1541',
    theologicalContext: 'Guilt, shame, and remorse are washed clean by the Blood and Water gushing forth from the Heart of Jesus, bestowing serene supernatural peace.'
  },
  {
    number: 10,
    title: 'Infinite Graces for the Entire World',
    promise: 'I desire that this mercy be unfolded over the whole world... Write that the mercy of God is infinite.',
    diaryCitation: 'Diary, 687',
    theologicalContext: 'The chaplet is not merely a private devotional prayer; it is a universal intercession offered for the sanctification and redemption of all mankind.'
  },
  {
    number: 11,
    title: 'Lifelong Embrace of Divine Mercy',
    promise: 'Souls that say this chaplet will be embraced by My mercy during their lifetime and especially at the hour of their death.',
    diaryCitation: 'Diary, 754',
    theologicalContext: 'Devotees live under the special maternal mantle of divine grace, shielded from spiritual despair and fortified in daily trials.'
  },
  {
    number: 12,
    title: 'Never Disappointed or Put to Shame',
    promise: 'No soul that has called upon My mercy has been disappointed or brought to shame. I delight particularly in a soul which has placed trust in My goodness.',
    diaryCitation: 'Diary, 1541',
    theologicalContext: 'Trust (Fiducia) is the vessel by which all graces of Divine Mercy are drawn. Complete reliance on Jesus guarantees that no soul is abandoned.'
  },
  {
    number: 13,
    title: 'Mercy Overflowing for the Dying',
    promise: 'When they say this chaplet in the presence of the dying, I will stand between My Father and the dying person... My mercy will have the last word in that soul.',
    diaryCitation: 'Diary, 848',
    theologicalContext: 'At the decisive spiritual battlefield of death, the Precious Blood triumphs over every accusation of the enemy.'
  },
  {
    number: 14,
    title: 'All Divine Floodgates Opened on Feast of Mercy',
    promise: 'On that day all the divine floodgates through which grace flow are opened. Let no soul fear to draw near to Me, even though its sins be as scarlet.',
    diaryCitation: 'Diary, 699',
    theologicalContext: 'On Divine Mercy Sunday (Second Sunday of Easter), complete forgiveness of sins and punishment is promised to the soul that goes to confession and receives Holy Communion.'
  }
];

export const FAUSTINA_DIARY_EXCERPTS: FaustinaDiaryExcerpt[] = [
  {
    id: 'diary-47',
    diaryNumber: 47,
    title: 'The Painting of the Divine Mercy Image',
    theme: 'The Divine Mercy Image and Signature',
    spokenBy: 'Jesus',
    quote: 'In the evening, when I was in my cell, I saw the Lord Jesus clothed in a white garment. One hand was raised in the gesture of blessing, the other was touching the garment at the breast. From beneath the garment, slightly drawn aside at the breast, there were emanating two large rays, one red, the other pale... Jesus said to me: "Paint an image according to the pattern you see, with the signature: Jesus, I trust in You. I desire that this image be venerated, first in your chapel, and throughout the world."',
    reflection: 'The image of Divine Mercy depicts the Risen Lord bearing the marks of the crucifixion. The pale ray represents the Water of Baptism and the Holy Spirit; the red ray represents the Holy Eucharist and the Blood of the Covenant.'
  },
  {
    id: 'diary-299',
    diaryNumber: 299,
    title: 'The Meaning of the Pale and Red Rays',
    theme: 'The Fountain of Blood and Water',
    spokenBy: 'Jesus',
    quote: '"The two rays denote Blood and Water. The pale ray stands for the Water which makes souls righteous. The red ray stands for the Blood which is the life of souls. These two rays issued forth from the very depths of My tender mercy when My agonized Heart was opened by a lance on the Cross. Happy is the one who will dwell in their shelter, for the just hand of God shall not lay hold of him."',
    reflection: 'The lance of Longinus on Calvary pierced the physical Sacred Heart of Jesus. From this sacred opening, the Sacraments of the Church were born.'
  },
  {
    id: 'diary-476',
    diaryNumber: 476,
    title: 'The Origin of the Chaplet of Divine Mercy',
    theme: 'Angel of Wrath and the Words of Atonement',
    spokenBy: 'Jesus',
    quote: 'I saw an Angel, the executor of divine wrath... I began to plead with God for the world with words heard interiorly: "Eternal Father, I offer you the Body and Blood, Soul and Divinity of Your dearly beloved Son, Our Lord Jesus Christ, in atonement for our sins and those of the whole world; for the sake of His sorrowful Passion, have mercy on us and on the whole world." As I was praying in this manner, I saw the Angel\'s helplessness; he could not carry out the just punishment.',
    reflection: 'On September 13, 1935, Sister Faustina was taught the Chaplet in her cell in Vilnius. The Chaplet is an extension of the Holy Sacrifice of the Mass.'
  },
  {
    id: 'diary-1541',
    diaryNumber: 1541,
    title: 'The Three O\'Clock Hour of Mercy',
    theme: 'Hour of Christ\'s Death on Calvary',
    spokenBy: 'Jesus',
    quote: '"At three o\'clock, implore My mercy, especially for sinners; and, if only for a brief moment, immerse yourself in My Passion, particularly in My abandonment at the moment of agony. This is the hour of great mercy for the whole world. In this hour, I will refuse nothing to the soul that makes a request of Me in virtue of My Passion."',
    reflection: 'At 3:00 PM, Catholics unite their hearts to the moment Jesus breathed His last upon the Cross, entering into the silence of His victory over death.'
  },
  {
    id: 'diary-1485',
    diaryNumber: 1485,
    title: 'Conversation of the Merciful God with a Sinful Soul',
    theme: 'Inexhaustible Divine Compassion',
    spokenBy: 'Jesus',
    quote: '"Be not afraid of your Savior, O sinful soul. I make the first approach to come to you, for I know that by yourself you cannot lift yourself to Me. Sinner, do not run away from your Father; be willing to talk openly with your God of mercy who wants to speak words of pardon and lavish His graces on you. My mercy is greater than your sins and those of the entire world."',
    reflection: 'No sin is too grave, no soul too wounded to be healed by the inexhaustible mercy of Christ. His Sacred Heart seeks the lost sheep with yearning love.'
  },
  {
    id: 'diary-1731',
    diaryNumber: 1731,
    title: 'The Ocean of Mercy and the Secret of Trust',
    theme: 'Trust as the Golden Vessel',
    spokenBy: 'Jesus',
    quote: '"My Heart overflows with great mercy for souls, and especially for poor sinners... Oh, that they would understand that I am the best of Fathers to them and that it is for them that the Blood and Water flowed from My Heart as from a fount overflowing with mercy. The graces of My mercy are drawn by means of one vessel only, and that is—trust. The more a soul trusts, the more it will receive."',
    reflection: 'Jesus told St. Faustina that distrust pierces His Sacred Heart more than the cruelty of His torturers. Surrender with childlike confidence: "Jesus, I trust in You."'
  }
];
