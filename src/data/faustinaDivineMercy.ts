export interface FaustinaDiaryExcerpt {
  id: string;
  title: string;
  paragraphs: string[];
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
    id: 'hour-of-great-mercy',
    title: 'The Hour of Great Mercy',
    paragraphs: [
      'At three o’clock, implore My mercy, especially for sinners; and, if only for a brief moment, immerse yourself in My Passion, particularly in My abandonment at the moment of agony. This is the hour of great mercy. In this hour, I will refuse nothing to the soul that makes a request of Me in virtue of My Passion (Diary, 1320).'
    ]
  },
  {
    id: 'image-of-divine-mercy',
    title: 'The Image of The Divine Mercy',
    paragraphs: [
      'In a vision, St. Faustina saw Jesus in a white garment and His right hand raised in blessing. This was in 1931.',
      'Paint an image according to the pattern you see, with the signature: Jesus, I trust in You. I promise that the soul that will venerate this image will not perish. I also promise victory over [its] enemies already here on earth, especially at the hour of death. I Myself will defend it as My own glory (Diary, 47, 48). I am offering people a vessel with which they are to keep coming for graces to the fountain of mercy. That vessel is this image with the signature: Jesus, I trust in You (327). I desire that this image be venerated, first in your chapel, and [then] throughout the world (47).'
    ]
  },
  {
    id: 'chaplet-of-divine-mercy',
    title: 'The Chaplet of The Divine Mercy',
    paragraphs: [
      'Four years later, St. Faustina had a vision of an angel sent by God to chastise a certain city. She started to pray for mercy, but her prayers were of no avail. Then she saw the Holy Trinity and felt the power of Jesus’ grace inside of her. She also found herself pleading with God for mercy with words she heard interiorly:',
      'Eternal Father, I offer You the Body and Blood, Soul and Divinity of Your dearly beloved Son, Our Lord Jesus Christ, in atonement for our sins and those of the whole world; for the sake of His sorrowful Passion, have mercy on us. (Diary, 475)',
      'While she kept on saying this inspired prayer, the angel became helpless and could not carry out the deserved punishment (see 474). The following day, as she was entering the chapel, she heard this interior voice once more, teaching her how to recite the prayer that our Lord later called “the Chaplet.” But after “have mercy on us,” the words “and on the whole world” (476) were added. Faustina would recite this form of prayer almost constantly, offering it especially for the dying.',
      'The Lord attached great promises to the recitation of the Chaplet. Encourage souls to say the Chaplet which I have given you (1541). Whoever will recite it will receive great mercy at the hour of death (687). When they say this Chaplet in the presence of the dying, I will stand between My Father and the dying person, not as the just Judge but as the Merciful Savior (1541). Priests will recommend it to sinners as their last hope of salvation. Even if there were a sinner most hardened, if he were to recite this Chaplet only once, he would receive grace from My infinite mercy (687). Through the Chaplet you will obtain everything, if what you ask for is compatible with My will. (1731)',
      'The next morning, when I entered chapel, I heard these words interiorly: Every time you enter the chapel, immediately recite the prayer which I taught you yesterday. When I had said the prayer, in my soul I heard these words: This prayer will serve to appease My wrath. You will recite it for nine days, on the beads of the rosary, in the following manner: First of all, you will say one OUR FATHER and HAIL MARY and the I BELIEVE IN GOD. Then on the OUR FATHER beads you will say the following words: “Eternal Father, I offer You the Body and Blood, Soul and Divinity of Your dearly beloved Son, Our Lord Jesus Christ, in atonement for our sins and those of the whole world.” On the HAIL MARY beads you will say the following words: “For the sake of His sorrowful Passion have mercy on us and on the whole world.” In conclusion, three times you will recite these words: “Holy God, Holy Mighty One, Holy Immortal One, have mercy on us and on the whole world” (Diary, 476).'
    ]
  },
  {
    id: 'feast-of-mercy',
    title: 'The Feast of Mercy',
    paragraphs: [
      'On one occasion, I heard these words: My daughter, tell the whole world about My inconceivable mercy. I desire that the Feast of Mercy be a refuge and a shelter for all souls, and especially for poor sinners. On that day the very depths of My tender mercy are open. I pour out a whole ocean of graces upon those souls who approach the fount of My mercy. The soul that will go to Confession and receive Holy Communion shall obtain complete forgiveness of sins and punishment. On that day are opened all the divine floodgates through which graces flow. Let no soul fear to draw near to Me, even though its sins be as scarlet. My mercy is so great that no mind, be it of man or of angel, will be able to fathom it throughout all eternity. Everything that exists has come from the very depths of My most tender mercy. Every soul in its relation to Me will contemplate My love and mercy throughout eternity. The Feast of Mercy emerged from My very depths of tenderness. It is My desire that it be solemnly celebrated on the first Sunday after Easter. Mankind will not have peace until it turns to the Fount of My mercy (Diary, 699).',
      'God’s mercy sometimes touches the sinner at the last moment in a wondrous and mysterious way. Outwardly, it seems as if everything were lost, but it is not so. The soul, illumined by a ray of God’s powerful final grace, turns to God in the last moment with such a power of love that, in an instant, it receives from God forgiveness of sin and punishment … (Diary, 1698).'
    ]
  }
];

