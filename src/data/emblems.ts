export type EmblemCategory = 'all' | 'cross' | 'christ' | 'eucharist' | 'marian' | 'saints';

export type IconFrameStyle = 'shield' | 'monstrance' | 'medallion' | 'stone' | 'glyph';

export type IconColorTheme = 'cathedral-gold' | 'cardinal-crimson' | 'marian-ultramarine' | 'byzantine-purple' | 'monastic-stone' | 'liturgical-green';

export interface SacredEmblem {
  id: string;
  name: string;
  latinName: string;
  symbol: string;
  category: EmblemCategory;
  description: string;
  theologicalMeaning: string;
  scriptureCitation?: string;
  defaultGradient: string;
  accentColor: string;
}

export interface IconStyleConfig {
  frameStyle: IconFrameStyle;
  colorTheme: IconColorTheme;
  showLatinSubtitle: boolean;
}

export const ICON_FRAME_STYLES: { id: IconFrameStyle; name: string; description: string; previewClass: string }[] = [
  {
    id: 'shield',
    name: 'Sanctuary Shield',
    description: 'Rounded gothic curved badge with subtle gold trim and drop shadow',
    previewClass: 'rounded-xl border-2 border-[#8B5A2B]/70 shadow-lg'
  },
  {
    id: 'monstrance',
    name: 'Monstrance Halo',
    description: 'Radiant gold outer aura echoing the rays of Eucharistic adoration',
    previewClass: 'rounded-full ring-2 ring-[#D4A373]/60 ring-offset-2 ring-offset-[#120A05] shadow-xl'
  },
  {
    id: 'medallion',
    name: 'Vatican Medallion',
    description: 'Double-rim circular seal reminiscent of papacy and jubilee medals',
    previewClass: 'rounded-full border-2 border-[#D4A373]/80 ring-2 ring-[#5C3A21] shadow-md'
  },
  {
    id: 'stone',
    name: 'Altar Stone Inset',
    description: 'Chiseled monastic square with refined bevel and inner shadow',
    previewClass: 'rounded-xl border border-[#5C3A21] shadow-inner'
  },
  {
    id: 'glyph',
    name: 'Illuminated Glyph',
    description: 'Clean floating sacred symbol with warm luminous ambient aura',
    previewClass: 'rounded-xl border border-[#8B5A2B]/40 shadow-none'
  }
];

export const ICON_COLOR_THEMES: { id: IconColorTheme; name: string; bgGradient: string; hex: string; desc: string }[] = [
  {
    id: 'cathedral-gold',
    name: 'Sanctuary Dark Espresso',
    bgGradient: 'bg-[#120A05]',
    hex: '#120A05',
    desc: 'Uniform dark espresso tone for maximum monstrance and Host clarity'
  },
  {
    id: 'cardinal-crimson',
    name: 'Cardinal Dark Crimson',
    bgGradient: 'bg-[#16080A]',
    hex: '#16080A',
    desc: 'Uniform dark sacred crimson tone'
  },
  {
    id: 'marian-ultramarine',
    name: 'Marian Starry Midnight',
    bgGradient: 'bg-[#080C16]',
    hex: '#080C16',
    desc: 'Uniform dark Marian midnight navy'
  },
  {
    id: 'byzantine-purple',
    name: 'Byzantine Dark Imperial',
    bgGradient: 'bg-[#120818]',
    hex: '#120818',
    desc: 'Uniform dark penitential majesty'
  },
  {
    id: 'monastic-stone',
    name: 'Monastic Obsidian Stone',
    bgGradient: 'bg-[#101010]',
    hex: '#101010',
    desc: 'Uniform dark contemplative stone'
  },
  {
    id: 'liturgical-green',
    name: 'Liturgical Dark Forest',
    bgGradient: 'bg-[#06140D]',
    hex: '#06140D',
    desc: 'Uniform dark sanctuary evergreen'
  }
];

export const SACRED_EMBLEMS: SacredEmblem[] = [
  // Primary Sanctum Emblem: Golden Monstrance with White Host
  {
    id: 'eucharist-monstrance',
    name: 'Golden Monstrance and Sacred Host',
    latinName: 'Ostensorium Aureum and Hostia Sancta',
    symbol: '☀️',
    category: 'eucharist',
    description: 'The golden rays of the ostensorium holding the Consecrated Host inscribed with the holy cross.',
    theologicalMeaning: 'The Source and Summit of the Christian life—the True, Real, and Substantial Presence of Christ Body, Blood, Soul, and Divinity in the Most Blessed Sacrament.',
    scriptureCitation: '1 Corinthians 11:24 — "This is My Body, which is given for you. Do this in remembrance of Me."',
    defaultGradient: 'from-amber-600 via-amber-700 to-yellow-950',
    accentColor: '#F59E0B'
  },
  {
    id: 'mary-blessed-sacrament',
    name: 'Mary and the Blessed Sacrament',
    latinName: 'Sancta Maria and Sanctissimum Sacramentum',
    symbol: '✨',
    category: 'marian',
    description: 'The Blessed Virgin Mary, living Tabernacle of the Most High, enfolding the Holy Eucharist in her heart in perpetual adoration.',
    theologicalMeaning: 'Mary is the "Woman of the Eucharist" (St. John Paul II). Her womb was the first tabernacle; she leads every soul to adore Jesus Christ truly present in the Most Blessed Sacrament.',
    scriptureCitation: 'Luke 1:35 — "The Holy Spirit will come upon you, and the power of the Most High will overshadow you; therefore the child to be born will be called holy, the Son of God."',
    defaultGradient: 'from-amber-600 via-amber-700 to-indigo-950',
    accentColor: '#F59E0B'
  },

  // Crosses
  {
    id: 'latin-cross',
    name: 'Crux Fidelis • Latin Cross',
    latinName: 'Crux Fidelis',
    symbol: '✠',
    category: 'cross',
    description: 'The supreme symbol of Christian salvation and the Triumph of the Holy Cross.',
    theologicalMeaning: 'The altar of the New Covenant upon which Jesus Christ offered Himself once for all to reconcile heaven and earth.',
    scriptureCitation: 'Galatians 6:14 — "May I never boast except in the cross of our Lord Jesus Christ."',
    defaultGradient: 'from-amber-700 to-amber-950',
    accentColor: '#B45309'
  },
  {
    id: 'jerusalem-cross',
    name: 'Jerusalem Cross • Holy Land',
    latinName: 'Crux Hierosolymitana',
    symbol: '☩',
    category: 'cross',
    description: 'A large central potent cross surrounded by four smaller crosses in each quadrant.',
    theologicalMeaning: 'Symbolizes Christ sending the Gospel to the four corners of the world, and the Five Sacred Wounds of Christ.',
    scriptureCitation: 'Acts 1:8 — "You shall be my witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth."',
    defaultGradient: 'from-red-900 to-amber-950',
    accentColor: '#991B1B'
  },
  {
    id: 'celtic-cross',
    name: 'Celtic High Cross',
    latinName: 'Crux Hibernica',
    symbol: 'Ꚛ',
    category: 'cross',
    description: 'The iconic high cross intersecting with an aureole ring of celestial eternity.',
    theologicalMeaning: 'The eternal light of the Sun of Justice (Christ) triumphing over darkness, planted across the British Isles and Europe by early monastic saints.',
    scriptureCitation: 'John 8:12 — "I am the light of the world. Whoever follows me will not walk in darkness."',
    defaultGradient: 'from-emerald-800 to-stone-950',
    accentColor: '#059669'
  },
  {
    id: 'tau-cross',
    name: 'Tau Cross of St. Francis',
    latinName: 'Crux Sancti Francisci',
    symbol: '𝜏',
    category: 'cross',
    description: 'The Greek letter Tau adopted by Saint Francis of Assisi as his personal seal and blessing.',
    theologicalMeaning: 'The biblical mark of redemption placed on the foreheads of the faithful (Ezekiel 9:4), signifying holy poverty and penance.',
    scriptureCitation: 'Ezekiel 9:4 — "Go through the city and put a mark on the foreheads of those who grieve."',
    defaultGradient: 'from-amber-800 to-stone-900',
    accentColor: '#D97706'
  },

  // Christ the Lord
  {
    id: 'chi-rho',
    name: 'Chi-Rho • Christogram',
    latinName: 'Monogramma Christi',
    symbol: '☧',
    category: 'christ',
    description: 'The ancient Christian monogram composed of the first two letters of Christ in Greek (Χ and Ρ).',
    theologicalMeaning: 'Proclaimed by the Early Church and Emperor Constantine as a banner of victory: "In hoc signo vinces" (In this sign you shall conquer).',
    scriptureCitation: 'Philippians 2:9 — "God has highly exalted Him and bestowed on Him the name that is above every name."',
    defaultGradient: 'from-stone-800 to-stone-950',
    accentColor: '#D97706'
  },
  {
    id: 'sacred-heart',
    name: 'Sacred Heart of Jesus',
    latinName: 'Cor Jesu Sacratissimum',
    symbol: '❤️‍🔥',
    category: 'christ',
    description: 'The physical heart of Jesus crowned with thorns, surmounted by a cross, and radiating celestial flames.',
    theologicalMeaning: 'The fathomless burning fire of divine charity for fallen humanity, revealed to St. Margaret Mary Alacoque.',
    scriptureCitation: 'Matthew 11:29 — "Learn from me, for I am meek and humble of heart, and you will find rest for your souls."',
    defaultGradient: 'from-rose-800 to-red-950',
    accentColor: '#E11D48'
  },
  {
    id: 'alpha-omega',
    name: 'Alpha and Omega',
    latinName: 'Alpha et Omega',
    symbol: 'ΑΩ',
    category: 'christ',
    description: 'The first and last letters of the classical Greek alphabet flanking the cross.',
    theologicalMeaning: 'Jesus Christ is the eternal Lord of history, the beginning of Creation and the consummation of all ages.',
    scriptureCitation: 'Revelation 22:13 — "I am the Alpha and the Omega, the First and the Last, the Beginning and the End."',
    defaultGradient: 'from-amber-700 to-yellow-950',
    accentColor: '#F59E0B'
  },
  {
    id: 'agnus-dei',
    name: 'Agnus Dei • Lamb of God',
    latinName: 'Agnus Dei Paschalis',
    symbol: '🐑',
    category: 'christ',
    description: 'The innocent Lamb standing victorious, bearing the cruciform banner of the Resurrection.',
    theologicalMeaning: 'The True Paschal Lamb prefigured in Exodus, who takes away the sin of the world and feeds His Church in the Eucharist.',
    scriptureCitation: 'John 1:29 — "Behold, the Lamb of God, who takes away the sin of the world!"',
    defaultGradient: 'from-stone-800 to-red-950',
    accentColor: '#DC2626'
  },

  // Eucharist and Liturgy
  {
    id: 'calix-salutis',
    name: 'Holy Chalice and Wheat',
    latinName: 'Calix Salutis',
    symbol: '🍷',
    category: 'eucharist',
    description: 'The Eucharistic Chalice containing the Precious Blood, paired with ears of golden wheat.',
    theologicalMeaning: 'The chalice of eternal salvation blessed at the Last Supper and poured out on the Cross for the remission of sins.',
    scriptureCitation: 'Luke 22:20 — "This cup that is poured out for you is the new covenant in my blood."',
    defaultGradient: 'from-red-900 to-stone-900',
    accentColor: '#B91C1C'
  },
  {
    id: 'incense-thurible',
    name: 'Thurible and Sacred Incense',
    latinName: 'Thuribulum and Incensum',
    symbol: '💨',
    category: 'eucharist',
    description: 'The swinging thurible sending sweet-smelling clouds of frankincense toward heaven.',
    theologicalMeaning: 'The prayers of the saints rising like incense before the throne of God during the Holy Sacrifice of the Mass.',
    scriptureCitation: 'Psalm 141:2 — "Let my prayer be directed as incense in thy sight."',
    defaultGradient: 'from-stone-700 to-amber-950',
    accentColor: '#D97706'
  },

  // Our Lady and Saints
  {
    id: 'marian-crown',
    name: 'Crown of Twelve Stars',
    latinName: 'Corona Duodecim Stellarum',
    symbol: '👑',
    category: 'marian',
    description: 'The starry crown of the Blessed Virgin Mary, Queen of Heaven and Earth (Revelation 12:1).',
    theologicalMeaning: 'Mary as Mother of the Church and Queen of Apostles, crushing the serpent underfoot and interceding unceasingly.',
    scriptureCitation: 'Revelation 12:1 — "A woman clothed with the sun, with the moon under her feet, and on her head a crown of twelve stars."',
    defaultGradient: 'from-blue-900 to-indigo-950',
    accentColor: '#2563EB'
  },
  {
    id: 'immaculate-heart',
    name: 'Immaculate Heart of Mary',
    latinName: 'Cor Immaculatum Mariae',
    symbol: '🌹',
    category: 'marian',
    description: 'The immaculate heart encircled with white roses, pierced with a sword of sorrow, and burning with love.',
    theologicalMeaning: 'The pure, undivided heart of the Virgin Mother that ponders the mysteries of God and leads all souls to her Son.',
    scriptureCitation: 'Luke 2:35 — "And a sword will pierce through your own soul also, that thoughts out of many hearts may be revealed."',
    defaultGradient: 'from-rose-900 to-blue-950',
    accentColor: '#E11D48'
  },
  {
    id: 'miraculous-medal',
    name: 'Miraculous Medal • Star of Mary',
    latinName: 'Numisma Mirabile',
    symbol: '🌟',
    category: 'marian',
    description: 'The celestial star of the Rue du Bac medal inscribed: "O Mary, conceived without sin, pray for us."',
    theologicalMeaning: 'The maternal intercession of the Mediatrix of All Graces revealed to Saint Catherine Labouré in Paris in 1830.',
    scriptureCitation: 'Luke 1:28 — "Hail, full of grace, the Lord is with you!"',
    defaultGradient: 'from-blue-800 to-stone-900',
    accentColor: '#3B82F6'
  },
  {
    id: 'holy-spirit-dove',
    name: 'Holy Spirit Dove',
    latinName: 'Spiritus Sanctus',
    symbol: '🕊️',
    category: 'marian',
    description: 'The celestial Dove descending with seven rays representing the Seven Gifts of the Holy Spirit.',
    theologicalMeaning: 'The Giver of Life, the Paraclete who sanctifies the Church, breathed upon the Apostles at Pentecost.',
    scriptureCitation: 'Luke 3:22 — "And the Holy Spirit descended on Him in bodily form, like a dove."',
    defaultGradient: 'from-sky-800 to-blue-950',
    accentColor: '#0284C7'
  },
  {
    id: 'archangel-michael',
    name: 'Archangel Michael • Sword of God',
    latinName: 'Sanctus Michael Archangelus',
    symbol: '⚔️',
    category: 'saints',
    description: 'The flaming sword and scales of the Prince of the Heavenly Host.',
    theologicalMeaning: 'The champion of God against Lucifer: "Quis ut Deus?" (Who is like unto God?). Protector of the Church Militant.',
    scriptureCitation: 'Revelation 12:7 — "Now war arose in heaven, Michael and his angels fighting against the dragon."',
    defaultGradient: 'from-stone-800 to-red-950',
    accentColor: '#DC2626'
  },
  {
    id: 'keys-of-peter',
    name: 'Keys of the Kingdom',
    latinName: 'Claves Regni Caelorum',
    symbol: '🗝️',
    category: 'saints',
    description: 'The crossed golden and silver keys of Saint Peter and the Holy Catholic Church.',
    theologicalMeaning: 'The power to bind and loose given by Christ to Peter (Matthew 16:19), representing apostolic authority and communion with Rome.',
    scriptureCitation: 'Matthew 16:19 — "I will give you the keys of the kingdom of heaven."',
    defaultGradient: 'from-amber-800 to-stone-900',
    accentColor: '#CA8A04'
  },
  {
    id: 'saint-benedict',
    name: 'Saint Benedict Medal and Shield',
    latinName: 'Numisma Sancti Benedicti',
    symbol: '🛡️',
    category: 'saints',
    description: 'The protective shield inscribed with CSSML: "Crux Sacra Sit Mihi Lux" (May the Holy Cross be my light).',
    theologicalMeaning: 'The spiritual armour of the Father of Western Monasticism against demonic snares and spiritual warfare.',
    scriptureCitation: 'Ephesians 6:11 — "Put on the whole armor of God, that you may be able to stand against the wiles of the devil."',
    defaultGradient: 'from-stone-900 to-amber-950',
    accentColor: '#78350F'
  },
  {
    id: 'fleur-de-lis',
    name: 'Fleur-de-Lis of Saint Joseph',
    latinName: 'Lilium Sancti Josephi',
    symbol: '⚜️',
    category: 'saints',
    description: 'The threefold lily symbolizing the purity and fatherly guardianship of Saint Joseph, Patron of the Universal Church.',
    theologicalMeaning: 'The chaste guardian of the Holy Family, just man, and terror of demons.',
    scriptureCitation: 'Matthew 1:24 — "When Joseph woke from sleep, he did as the angel of the Lord commanded him."',
    defaultGradient: 'from-amber-700 to-stone-950',
    accentColor: '#D97706'
  },
  {
    id: 'holy-scripture',
    name: 'Verbum Dei • Holy Bible',
    latinName: 'Sacra Scriptura',
    symbol: '📖',
    category: 'saints',
    description: 'The illuminated book of the Gospels, word of the living God and lamp to our feet.',
    theologicalMeaning: 'Ignorance of Scripture is ignorance of Christ (St. Jerome). The living voice of the Father speaking to His children.',
    scriptureCitation: 'Psalm 119:105 — "Thy word is a lamp unto my feet, and a light unto my path."',
    defaultGradient: 'from-amber-900 to-stone-950',
    accentColor: '#B45309'
  }
];

export const DEFAULT_EMBLEM_ID = 'eucharist-monstrance';

export const DEFAULT_STYLE_CONFIG: IconStyleConfig = {
  frameStyle: 'shield',
  colorTheme: 'cathedral-gold',
  showLatinSubtitle: true
};

export function getSavedEmblem(): SacredEmblem {
  if (typeof window === 'undefined') return SACRED_EMBLEMS[0];
  const savedId = localStorage.getItem('soul_sanctum_active_emblem_v3');
  const found = SACRED_EMBLEMS.find(e => e.id === savedId);
  return found || SACRED_EMBLEMS[0];
}

export function saveEmblem(emblemId: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('soul_sanctum_active_emblem_v3', emblemId);
  }
}

export function getSavedIconStyle(): IconStyleConfig {
  if (typeof window === 'undefined') return DEFAULT_STYLE_CONFIG;
  try {
    const raw = localStorage.getItem('soul_sanctum_icon_style_v2');
    if (raw) return { ...DEFAULT_STYLE_CONFIG, ...JSON.parse(raw) };
  } catch (e) {
    console.error(e);
  }
  return DEFAULT_STYLE_CONFIG;
}

export function saveIconStyle(config: IconStyleConfig): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('soul_sanctum_icon_style_v2', JSON.stringify(config));
  }
}
