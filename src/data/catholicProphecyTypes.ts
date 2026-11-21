export type ProphecyCategory = 'jesus' | 'scripture' | 'marian' | 'saints';

export type EcclesiasticalStatus =
  | 'Public Revelation (Sacred Scripture)'
  | 'Church-Approved Private Revelation'
  | 'Canonized Saint / Doctor / Papal Witness'
  | 'Vatican Nihil Obstat (2024)'
  | 'Unapproved / Historical Discernment Note';

export interface ProphecyEntry {
  id: string;
  title: string;
  subtitle: string;
  category: ProphecyCategory;
  source: string;
  eraOrYear: string;
  locationOrBook: string;
  status: EcclesiasticalStatus;
  statusDetail: string;
  themes: string[];
  keyPassage: string;
  passageReference: string;
  summary: string;
  historicalContext: string;
  relevanceToOurAge: string;
  churchDiscernmentNote: string;
  catechismRefs: string[];
}

export interface DiscernmentPrinciple {
  id: string;
  index: string;
  title: string;
  citation: string;
  summary: string;
}

export interface VaticanNormDetermination {
  index: string;
  latinTitle: string;
  englishMeaning: string;
  tone: 'positive' | 'cautious' | 'corrective' | 'restrictive';
  summary: string;
  pastoralEffect: string;
}

export interface VaticanNormCriterion {
  index: string;
  title: string;
  detail: string;
}

export interface Vatican2024NormsData {
  officialTitle: string;
  issuingBody: string;
  approvedDate: string;
  publishedDate: string;
  effectiveDate: string;
  replaces: string;
  overview: string;
  structuralShift: string;
  proceduralSafeguards: string[];
  sixDeterminations: VaticanNormDetermination[];
  positiveCriteria: VaticanNormCriterion[];
  negativeCriteria: VaticanNormCriterion[];
}

export const CATHOLIC_DISCERNMENT_PRINCIPLES: DiscernmentPrinciple[] = [
  {
    id: 'public-vs-private',
    index: '01',
    title: 'Public Revelation Completed in Christ',
    citation: 'Catechism of the Catholic Church §§65–67',
    summary:
      'Because Jesus Christ is the Father’s definitive Word, no new Public Revelation is to be expected before His glorious return. Even when the Church approves a private revelation, its purpose is never to complete or improve Christ’s Gospel, but to help the faithful live the Gospel more fervently in a particular era of history.',
  },
  {
    id: 'test-everything',
    index: '02',
    title: 'Apostolic Rule of Spiritual Testing',
    citation: '1 Thessalonians 5:19–21; 1 John 4:1',
    summary:
      'St. Paul teaches two balanced duties: never quench the Spirit or despise genuine prophecy, yet test every claim carefully and retain only what is good. Authentic Catholic prophecy always harmonizes with Sacred Scripture, the Creed, sacramental grace, and humble obedience to the Magisterium.',
  },
  {
    id: 'ultimate-trial',
    index: '03',
    title: 'The Church’s Final Passover and Rejection of Millenarianism',
    citation: 'Catechism of the Catholic Church §§675–677',
    summary:
      'Before Christ’s Second Coming, the Church must undergo a final trial that shakes the faith of many through religious deception and an Antichristic pseudo-messianism. The Church enters the Kingdom only through a final Passover following her Lord in His death and Resurrection—not through an earthly political utopia.',
  },
  {
    id: 'ddf-2024-norms',
    index: '04',
    title: 'May 2024 Vatican Norms on Alleged Supernatural Phenomena',
    citation: 'Dicastery for the Doctrine of the Faith (May 17, 2024)',
    summary:
      'Replacing the 1978 guidelines, the May 2024 Norms establish six pastoral determinations—headed by Nihil Obstat—evaluating spiritual fruits and safeguarding the faithful against doctrinal error, manipulation, or abuse without obliging belief in supernatural origin.',
  },
];

export const VATICAN_2024_NORMS: Vatican2024NormsData = {
  officialTitle: 'Norms for Proceeding in the Discernment of Alleged Supernatural Phenomena',
  issuingBody: 'Dicastery for the Doctrine of the Faith (Signed by Cardinal Víctor Manuel Fernández)',
  approvedDate: 'May 4, 2024 (Approved by Pope Francis)',
  publishedDate: 'May 17, 2024',
  effectiveDate: 'May 19, 2024 (Solemnity of Pentecost)',
  replaces: '1978 Norms Regarding the Manner of Proceeding in the Discernment of Presumed Apparitions or Revelations',
  overview:
    'Issued to address the rapid global spread of alleged apparitions, locutions, and mystical claims in the digital age, the May 2024 Vatican Norms provide bishops and the Dicastery for the Doctrine of the Faith (DDF) with faster, clearer, and more pastorally concrete procedures. Their goal is to recognize authentic fruits of the Holy Spirit—prayer, conversion, charity, and sacramental life—while shielding the faithful from theological confusion, profiteering, sectarian division, or spiritual abuse.',
  structuralShift:
    'A decisive change from 1978: as a general rule, neither the Diocesan Bishop nor the Dicastery for the Doctrine of the Faith will any longer issue a formal declaration confirming the definitive “supernatural origin” (constat de supernaturalitate) of a phenomenon. Instead, discernment ordinarily concludes with one of six pastoral determinations—the highest being Nihil Obstat—while reserving any extraordinary declaration of supernatural authenticity solely to the Roman Pontiff. Even where a Nihil Obstat is granted, Catholics remain completely free in conscience and are never obliged by divine faith to assent to any private revelation.',
  proceduralSafeguards: [
    'Role of the Diocesan Bishop & DDF: The local Diocesan Bishop conducts the preliminary inquiry (assisted by theologians, canonists, and medical/psychological experts where needed) and must submit his dossier and proposed determination to the Dicastery for the Doctrine of the Faith for final approval before public promulgation.',
    'Cumulative Evaluation: Positive criteria (Article 14) and negative criteria (Article 15) must always be weighed together—good spiritual fruits alone cannot excuse manifest doctrinal error, deceit, or abuse.',
    'Freedom of the Faithful: No private revelation, apparition, or prophetic message—even with a Nihil Obstat—ever adds to Public Revelation or binds the faith of Catholics (CCC §67).',
    'Ongoing Pastoral Vigilance: Even after a Nihil Obstat is issued, the local Bishop must continue monitoring the shrine, publications, and messages so that authentic devotion never drifts into sensationalism or disobedience.',
  ],
  sixDeterminations: [
    {
      index: '01',
      latinTitle: 'Nihil Obstat',
      englishMeaning: '“Nothing hinders”',
      tone: 'positive',
      summary:
        'Although no certainty is expressed regarding the supernatural authenticity of the phenomenon itself, numerous signs of the Holy Spirit’s action are recognized and no critical or risky elements have been found.',
      pastoralEffect:
        'The Diocesan Bishop is encouraged to appreciate the pastoral value of the spiritual proposal, authorize public devotion and pilgrimages, and allow the faithful to adhere to it prudently without obligation.',
    },
    {
      index: '02',
      latinTitle: 'Prae oculis habeatur',
      englishMeaning: '“Let it be held before the eyes”',
      tone: 'cautious',
      summary:
        'Important positive spiritual signs are present, yet elements of doctrinal confusion, ambiguity, or pastoral risk also appear—often requiring theological clarification and patient dialogue with those involved.',
      pastoralEffect:
        'The Bishop must exercise attentive discernment and issue doctrinal clarifications where messages contain imprecise expressions before permitting wider public promotion.',
    },
    {
      index: '03',
      latinTitle: 'Curatur',
      englishMeaning: '“It is to be taken care of”',
      tone: 'cautious',
      summary:
        'Multiple or significant critical elements exist, yet the phenomenon has already spread widely and is accompanied by verifiable spiritual fruits among the faithful.',
      pastoralEffect:
        'An outright ban is avoided so as not to wound or upset the faithful; instead, the Bishop refrains from promoting the phenomenon while guiding the devotion pastorally and correcting problematic aspects.',
    },
    {
      index: '04',
      latinTitle: 'Sub mandato',
      englishMeaning: '“Under mandate”',
      tone: 'corrective',
      summary:
        'The critical problems stem not from the core phenomenon itself, but from an individual, family, or group misusing it—for instance through financial exploitation, control of consciences, or divisive behavior.',
      pastoralEffect:
        'Pastoral governance of the site or movement is placed directly under the Diocesan Bishop or a special delegate appointed by the Holy See to restore ecclesial order and protect pilgrims.',
    },
    {
      index: '05',
      latinTitle: 'Prohibetur et obstruatur',
      englishMeaning: '“It is prohibited and blocked”',
      tone: 'restrictive',
      summary:
        'Despite occasional positive claims, the critical elements, doctrinal errors, immorality, or risks of manipulation are judged gravely serious and harmful to souls.',
      pastoralEffect:
        'To prevent further confusion or scandal, the Dicastery asks the Bishop to publicly prohibit adherence to the phenomenon and clearly explain the reasons to the faithful.',
    },
    {
      index: '06',
      latinTitle: 'Declaratio de non supernaturalitate',
      englishMeaning: '“Declaration of non-supernaturality”',
      tone: 'restrictive',
      summary:
        'Concrete, objective facts and proven evidence establish beyond doubt that the alleged phenomenon is not supernatural—for example, a confession of fabrication or verified physical fraud.',
      pastoralEffect:
        'Authorized by the Dicastery, the Bishop formally declares that the event is not of supernatural origin and instructs the faithful accordingly.',
    },
  ],
  positiveCriteria: [
    {
      index: '01',
      title: 'Credibility, Moral Uprightness & Docility',
      detail:
        'The honesty, psychological balance, good reputation, and sincerity of the alleged witnesses—above all their habitual humility, docility toward Church authority, and spirit of ecclesial communion.',
    },
    {
      index: '02',
      title: 'Doctrinal Orthodoxy',
      detail:
        'Complete harmony of the phenomenon and any associated messages or writings with Sacred Scripture, the Creed, and perennial Catholic faith and morals.',
    },
    {
      index: '03',
      title: 'Unpredictability of the Phenomenon',
      detail:
        'Clear indication that the event arises genuinely beyond human planning, personal ambition, or manufactured initiative.',
    },
    {
      index: '04',
      title: 'Lasting Spiritual Fruits of Christian Life',
      detail:
        'Enduring, verifiable fruits of prayer, genuine conversion, charity toward the poor, sacramental renewal, vocations, and deeper unity with the Church.',
    },
  ],
  negativeCriteria: [
    {
      index: '01',
      title: 'Manifest Factual Error or Fabrication',
      detail:
        'Concrete evidence contradicting the reported facts or demonstrating deliberate deception or staging.',
    },
    {
      index: '02',
      title: 'Doctrinal Errors or Theological Distortions',
      detail:
        'Statements contrary to Catholic dogma or morality—recognizing that human subjectivity can sometimes distort even sincere personal piety.',
    },
    {
      index: '03',
      title: 'Sectarian Spirit & Ecclesial Division',
      detail:
        'Fostering elitism, schism, contempt for bishops or the Pope, or an “us-versus-the-Church” mentality.',
    },
    {
      index: '04',
      title: 'Pursuit of Profit, Power, or Fame',
      detail:
        'Overt or concealed financial exploitation, self-promotion, celebrity seeking, or pursuit of personal influence tied to the claims.',
    },
    {
      index: '05',
      title: 'Gravely Immoral Conduct',
      detail:
        'Serious moral offenses committed by alleged visionaries or promoters in connection with the phenomenon.',
    },
    {
      index: '06',
      title: 'Psychological Pathologies or Collective Hysteria',
      detail:
        'Psychic disturbances, delusions, suggestibility, or group contagion adequately explaining the reported experiences.',
    },
    {
      index: '07',
      title: 'Spiritual Abuse or Manipulation of Consciences',
      detail:
        'Using purported mystical authority, threats of chastisement, or secret messages as a pretext to control people or commit psychological or spiritual abuse—explicitly singled out as a grave offense.',
    },
  ],
};
