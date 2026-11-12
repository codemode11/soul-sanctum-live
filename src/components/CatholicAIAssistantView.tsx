import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Send,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Trash2,
  HelpCircle,
  RefreshCw,
  Search,
  ExternalLink,
  ChevronDown,
  Globe,
  Sliders,
  MessageSquare,
  Plus,
  Brain,
  Clock,
  Sparkles,
  BookOpen,
  PanelLeftClose,
  PanelLeftOpen,
  X
} from 'lucide-react';
import {
  WebResearchSource,
  searchCatholicInternet,
  synthesizeResearchResponse,
} from '../utils/catholicInternetResearch';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  webSources?: WebResearchSource[];
  provider?: string;
  model?: string;
}

export type AIEngine = 'openai' | 'gemini' | 'auto';
export type AIPersona = 'scholarly' | 'essay' | 'catechism' | 'patristic' | 'apologetics' | 'spiritual';

export type PreferredBibleEdition = 'NABRE' | 'Douay-Rheims' | 'RSV-CE' | 'Knox / Latin Vulgate';
export type PreferredResponseDepth =
  | 'Essay & Academic Paper (with Sources)'
  | 'Comprehensive & Scholarly'
  | 'Concise & Catechetical'
  | 'Pastoral & Contemplative'
  | 'Apologetics & Scriptural';

export interface ChatSession {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  persona: AIPersona;
  engine: AIEngine;
  messages: ChatMessage[];
}

export interface UserMemoryProfile {
  preferredBible: PreferredBibleEdition;
  preferredDepth: PreferredResponseDepth;
  favoredPersona: AIPersona;
  topicWeights: Record<string, number>;
  favoriteSaintsAndDoctors: string[];
  customNotes: string[];
  personaCounts: Record<AIPersona, number>;
  totalQuestionsAsked: number;
  lastUpdated: number;
}

const SESSIONS_STORAGE_KEY = 'sanctum_catholic_ai_sessions_v1';
const ACTIVE_SESSION_ID_KEY = 'sanctum_catholic_ai_active_session_v1';
const MEMORY_PROFILE_STORAGE_KEY = 'sanctum_catholic_ai_memory_profile_v1';

const AI_ENGINE_SPECS: Record<AIEngine, { name: string; label: string }> = {
  openai: {
    name: 'ChatGPT (OpenAI GPT-4o)',
    label: 'ChatGPT (GPT-4o)'
  },
  gemini: {
    name: 'Soul Sanctum AI (Gemini)',
    label: 'Gemini AI'
  },
  auto: {
    name: 'Smart Hybrid AI Engine',
    label: 'Hybrid AI'
  }
};

const AI_PERSONA_SPECS: Record<AIPersona, { title: string; systemPromptSuffix: string }> = {
  scholarly: {
    title: 'Theological Scholar',
    systemPromptSuffix: 'Provide a scholarly theological synthesis with precise CCC and Scripture citations.'
  },
  essay: {
    title: 'Essay Writer (with Sources)',
    systemPromptSuffix: 'Write a complete, flowing, multi-paragraph academic and theological essay with a clear Title, Introduction & Thesis, cohesive Body Paragraphs in eloquent prose, Conclusion, and a formal "### Sources & Works Cited" section at the end.'
  },
  catechism: {
    title: 'Catechism Focus',
    systemPromptSuffix: 'Structure your response around specific paragraph numbers from the Catechism of the Catholic Church.'
  },
  patristic: {
    title: 'Church Fathers & Doctors',
    systemPromptSuffix: 'Highlight quotes and exegesis from the early Church Fathers and Doctors of the Church.'
  },
  apologetics: {
    title: 'Catholic Apologetics',
    systemPromptSuffix: 'Provide clear, charitable Catholic apologetics answering common objections with Scripture and history.'
  },
  spiritual: {
    title: 'Spiritual & Meditation',
    systemPromptSuffix: 'Adopt a deeply pastoral, contemplative tone offering practical spiritual application for the soul.'
  }
};

const TOPIC_MATCHERS: Array<{ topic: string; keywords: RegExp }> = [
  { topic: 'Holy Eucharist & Real Presence', keywords: /\b(eucharist|transubstantiation|mass|communion|blessed sacrament|adoration|host|chalice|consecration|liturgy)\b/i },
  { topic: 'Sacred Scripture & Exegesis', keywords: /\b(bible|scripture|gospel|old testament|new testament|psalm|genesis|exodus|isaiah|matthew|mark|luke|john|paul|romans|revelation|verse|parable)\b/i },
  { topic: 'Blessed Virgin Mary & Mariology', keywords: /\b(mary|marian|our lady|immaculate conception|assumption|rosary|lourdes|fatima|guadalupe|theotokos|magnificat|queen of heaven|medjugorje)\b/i },
  { topic: 'Church Fathers & Patristics', keywords: /\b(church fathers|patristic|augustine|chrysostom|irenaeus|ignatius|justin martyr|jerome|ambrose|athanasius|basil|gregory|cyril)\b/i },
  { topic: 'Thomistic Theology & Philosophy', keywords: /\b(thomas aquinas|summa|thomistic|aristotle|natural law|metaphysics|essence|substance|accidents|act and potency|five ways|scholastic)\b/i },
  { topic: 'Sacraments & Moral Theology', keywords: /\b(sacrament|baptism|confirmation|confession|penance|reconciliation|anointing|matrimony|marriage|holy orders|priesthood|sin|mortal|venial|virtue|grace)\b/i },
  { topic: 'Church History & Ecumenical Councils', keywords: /\b(council|nicaea|trent|vatican ii|chalcedon|ephesus|pope|papacy|history|crusade|reformation|inquisition|magisterium|dogma|canon)\b/i },
  { topic: 'Catholic Apologetics', keywords: /\b(sola scriptura|sola fide|protestant|orthodox|apologetics|objection|purgatory|indulgence|intercession|idolatry|papal infallibility)\b/i },
  { topic: 'Prayer & Interior Spiritual Life', keywords: /\b(prayer|contemplation|meditation|novena|lectio divina|dark night|detachment|humility|discernment|examen|breviary|divine office)\b/i },
  { topic: 'Lives of the Saints', keywords: /\b(saint|st\.|martyr|canonization|miracle|patron|padre pio|therese|francis|benedict|kolbe|faustina|newman|sheen)\b/i },
];

const SAINT_AND_DOCTOR_MATCHERS: Array<{ name: string; pattern: RegExp }> = [
  { name: 'St. Thomas Aquinas', pattern: /\b(thomas aquinas|aquinas|summa theologiae)\b/i },
  { name: 'St. Augustine of Hippo', pattern: /\b(augustine)\b/i },
  { name: 'St. John Chrysostom', pattern: /\b(chrysostom)\b/i },
  { name: 'St. Jerome', pattern: /\b(jerome|vulgate)\b/i },
  { name: 'St. Athanasius', pattern: /\b(athanasius)\b/i },
  { name: 'St. Ignatius of Antioch', pattern: /\b(ignatius of antioch)\b/i },
  { name: 'St. Irenaeus of Lyons', pattern: /\b(irenaeus)\b/i },
  { name: 'St. Teresa of Ávila', pattern: /\b(teresa of avila|teresa of ávila|interior castle)\b/i },
  { name: 'St. John of the Cross', pattern: /\b(john of the cross|dark night of the soul)\b/i },
  { name: 'St. Thérèse of Lisieux', pattern: /\b(therese of lisieux|thérèse|little flower)\b/i },
  { name: 'St. Francis de Sales', pattern: /\b(francis de sales|devout life)\b/i },
  { name: 'St. Alphonsus Liguori', pattern: /\b(alphonsus liguori|liguori)\b/i },
  { name: 'St. Louis de Montfort', pattern: /\b(louis de montfort|montfort|true devotion)\b/i },
  { name: 'St. Maximilian Kolbe', pattern: /\b(maximilian kolbe|kolbe|immaculata)\b/i },
  { name: 'St. Padre Pio', pattern: /\b(padre pio|pio of pietrelcina)\b/i },
  { name: 'St. Faustina Kowalska', pattern: /\b(faustina|divine mercy)\b/i },
  { name: 'St. John Henry Newman', pattern: /\b(john henry newman|cardinal newman)\b/i },
  { name: 'Pope Benedict XVI', pattern: /\b(benedict xvi|ratzinger)\b/i },
  { name: 'St. John Paul II', pattern: /\b(john paul ii|wojtyla)\b/i },
  { name: 'Ven. Fulton J. Sheen', pattern: /\b(fulton sheen|archbishop sheen)\b/i },
  { name: 'St. Bernadette of Lourdes', pattern: /\b(bernadette|lourdes)\b/i },
];

function createDefaultWelcomeMessage(engine: AIEngine = 'openai'): ChatMessage {
  return {
    id: `welcome-${Date.now()}`,
    role: 'assistant',
    content: `**Laudetur Jesus Christus!** Welcome to the **Catholic AI Assistant** — powered by **ChatGPT (OpenAI GPT-4o)** as your default theological research and essay-writing engine.

How this assistant supports your study:
* **Fast Essay Writing (with Sources)**: Ask me to write an essay on any topic (or click **Essay Mode (with Sources)** above) to generate a complete, multi-paragraph scholarly essay with an Introduction, Thesis, Body Paragraphs, Conclusion, and a **Sources & Works Cited** bibliography.
* **Direct & Relevant Theological Synthesis**: Answers your exact questions directly with specific citations from the *Catechism of the Catholic Church (CCC)*, Sacred Scripture, the Church Fathers, and the 21 Ecumenical Councils.
* **Persistent Chat History & Adaptive Memory**: Your **Previous Chats** and **Learned Preferences** (preferred Bible translation, essay/response style, and favorite topics) stay saved in the left memory panel across sessions.`,
    timestamp: Date.now(),
    provider: engine,
    model: 'gpt-4o',
  };
}

function getDefaultMemoryProfile(): UserMemoryProfile {
  return {
    preferredBible: 'RSV-CE',
    preferredDepth: 'Comprehensive & Scholarly',
    favoredPersona: 'scholarly',
    topicWeights: {},
    favoriteSaintsAndDoctors: [],
    customNotes: [],
    personaCounts: {
      scholarly: 1,
      essay: 0,
      catechism: 0,
      patristic: 0,
      apologetics: 0,
      spiritual: 0
    },
    totalQuestionsAsked: 0,
    lastUpdated: Date.now()
  };
}

function loadMemoryProfile(): UserMemoryProfile {
  if (typeof window === 'undefined') return getDefaultMemoryProfile();
  try {
    const raw = localStorage.getItem(MEMORY_PROFILE_STORAGE_KEY);
    if (!raw) return getDefaultMemoryProfile();
    const parsed = JSON.parse(raw);
    return {
      ...getDefaultMemoryProfile(),
      ...parsed,
      topicWeights: parsed?.topicWeights || {},
      favoriteSaintsAndDoctors: Array.isArray(parsed?.favoriteSaintsAndDoctors) ? parsed.favoriteSaintsAndDoctors : [],
      customNotes: Array.isArray(parsed?.customNotes) ? parsed.customNotes : [],
      personaCounts: {
        ...getDefaultMemoryProfile().personaCounts,
        ...(parsed?.personaCounts || {})
      }
    };
  } catch {
    return getDefaultMemoryProfile();
  }
}

function createInitialSession(persona: AIPersona = 'scholarly', engine: AIEngine = 'openai'): ChatSession {
  const now = Date.now();
  return {
    id: `session-${now}`,
    title: 'New Theological Inquiry',
    createdAt: now,
    updatedAt: now,
    persona,
    engine,
    messages: [createDefaultWelcomeMessage(engine)]
  };
}

function loadSavedSessions(): ChatSession[] {
  if (typeof window === 'undefined') return [createInitialSession()];
  try {
    const raw = localStorage.getItem(SESSIONS_STORAGE_KEY);
    if (!raw) return [createInitialSession()];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return [createInitialSession()];
  } catch {
    return [createInitialSession()];
  }
}

// Offline fallback answers grounded strictly in the Catechism and Scripture
const OFFLINE_THEOLOGICAL_KNOWLEDGE: Record<string, string> = {
  transubstantiation: `### The Catholic Doctrine of the Real Presence & Transubstantiation

**1. De Fide Dogma (Council of Trent, Session XIII, 1551)**
The Catholic Church solemnly teaches that by the consecration of the bread and wine there takes place a change of the whole substance of the bread into the substance of the body of Christ our Lord, and of the whole substance of the wine into the substance of his blood. This change the holy Catholic Church has fittingly and properly called **Transubstantiation** (*CCC 1376*).

**2. The Catechism of the Catholic Church (CCC 1374)**
> "In the most blessed sacrament of the Eucharist 'the body and blood, together with the soul and divinity, of our Lord Jesus Christ and, therefore, the whole Christ is truly, really, and substantially contained.'"

**3. Sacred Scripture Foundation**
* **Matthew 26:26-28**: *"Take, eat; this is my body... Drink of it, all of you; for this is my blood of the covenant."*
* **John 6:53-56**: *"Truly, truly, I say to you, unless you eat the flesh of the Son of man and drink his blood, you have no life in you; he who eats my flesh and drinks my blood has eternal life."*
* **1 Corinthians 11:27-29**: St. Paul warns that whoever eats the bread or drinks the cup of the Lord unworthily will be guilty of profaning the body and blood of the Lord.

**4. Voice of the Church Fathers**
* **St. Ignatius of Antioch (c. 110 AD, *Letter to the Smyrnaeans 7:1*)**: *"They abstain from the Eucharist and from prayer, because they confess not the Eucharist to be the flesh of our Savior Jesus Christ."*
* **St. Justin Martyr (c. 150 AD, *First Apology 66*)**: *"Not as common bread and common drink do we receive these; but... the food which is blessed by the prayer of His word... is the flesh and blood of that Jesus who was made flesh."*`,

  confession: `### The Sacrament of Penance and Reconciliation (Confession)

**1. Essential Conditions for a Valid Confession (CCC 1450–1460)**
For the penitent, three acts are required:
1. **Contrition (Sorrow for Sins)**: Interior grief and abhorrence for sins committed, coupled with the firm resolution not to sin again (*CCC 1451-1453*).
2. **Confession of Sins**: Accusing oneself of all mortal sins remembered after a diligent examination of conscience, in kind and number (*CCC 1456*).
3. **Satisfaction (Penance)**: Performing the penance assigned by the priest to repair the spiritual harm caused by sin (*CCC 1459*).

**2. Scriptural Commission of Confession**
* **John 20:22-23**: Jesus breathed on the Apostles and said: *"Receive the Holy Spirit. If you forgive the sins of any, they are forgiven; if you retain the sins of any, they are retained."*
* **James 5:16**: *"Confess your sins to one another, and pray for one another, that you may be healed."*`,

  mass_source_summit: `### The Holy Sacrifice of the Mass: Source and Summit of the Christian Life

**1. The Centrality of the Eucharistic Liturgy (CCC 1324)**
> "The Eucharist is 'the source and summit of the Christian life.' The other sacraments, and indeed all ecclesiastical ministries and works of the apostolate, are bound up with the Eucharist and are oriented toward it." (Vatican II, *Lumen Gentium 11*).

**2. Re-presentation of the One Sacrifice of Calvary (CCC 1366–1368)**
The Mass is not a repeat of Christ's sacrifice; it is the sacramental re-presentation of the single, once-for-all sacrifice of Jesus Christ on the Cross acting through the ordained minister (*in persona Christi Capitis*).`
};

function resolveCatholicTheologicalAnswer(prompt: string): string {
  const q = prompt.toLowerCase();
  if (q.includes('confess') || q.includes('penance') || q.includes('reconcil')) return OFFLINE_THEOLOGICAL_KNOWLEDGE.confession;
  if (q.includes('source and summit') || (q.includes('mass') && q.includes('christian life'))) return OFFLINE_THEOLOGICAL_KNOWLEDGE.mass_source_summit;
  if (q.includes('transubstantiation') || q.includes('real presence') || q.includes('eucharist')) return OFFLINE_THEOLOGICAL_KNOWLEDGE.transubstantiation;

  return `### Catholic Theological Guidance on: ${prompt}

**1. The Deposit of Faith (CCC 84–87)**
Catholic doctrine rests firmly on the unified foundation of **Sacred Scripture**, **Sacred Tradition**, and the **Magisterium** of the Catholic Church.

**2. Foundational Principles**
* **The Catechism of the Catholic Church (CCC)** provides the definitive synthesis of Catholic belief across the Creed, the Sacraments, Moral Life, and Prayer.
* **Sacred Scripture** is interpreted in the living heart of the Church in light of the Church Fathers and the 21 Ecumenical Councils.`;
}

function summarizeTitleFromPrompt(prompt: string): string {
  const clean = prompt.replace(/\s+/g, ' ').trim();
  if (clean.length <= 44) return clean;
  return clean.slice(0, 42).trim() + '…';
}

export const CatholicAIAssistantView: React.FC = () => {
  const [memoryProfile, setMemoryProfile] = useState<UserMemoryProfile>(loadMemoryProfile);
  const [sessions, setSessions] = useState<ChatSession[]>(loadSavedSessions);
  const [activeSessionId, setActiveSessionId] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const savedId = localStorage.getItem(ACTIVE_SESSION_ID_KEY);
      const loaded = loadSavedSessions();
      if (savedId && loaded.some(s => s.id === savedId)) {
        return savedId;
      }
      return loaded[0].id;
    }
    return '';
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [sidebarTab, setSidebarTab] = useState<'chats' | 'memory'>('chats');
  const [sessionSearchQuery, setSessionSearchQuery] = useState<string>('');
  const [newCustomNote, setNewCustomNote] = useState<string>('');

  const activeSession = useMemo(() => {
    return sessions.find(s => s.id === activeSessionId) || sessions[0];
  }, [sessions, activeSessionId]);

  const messages = activeSession?.messages || [];

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isWebResearchEnabled, setIsWebResearchEnabled] = useState(true);
  const [selectedEngine, setSelectedEngine] = useState<AIEngine>('openai');
  const [selectedPersona, setSelectedPersona] = useState<AIPersona>(() => activeSession?.persona || memoryProfile.favoredPersona || 'scholarly');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Persist sessions to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined' && sessions.length > 0) {
      try {
        localStorage.setItem(SESSIONS_STORAGE_KEY, JSON.stringify(sessions.slice(0, 60)));
      } catch {
        // ignore storage quota errors
      }
    }
  }, [sessions]);

  // Persist activeSessionId
  useEffect(() => {
    if (typeof window !== 'undefined' && activeSessionId) {
      try {
        localStorage.setItem(ACTIVE_SESSION_ID_KEY, activeSessionId);
      } catch {
        // ignore
      }
    }
  }, [activeSessionId]);

  // Persist memoryProfile
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(MEMORY_PROFILE_STORAGE_KEY, JSON.stringify(memoryProfile));
      } catch {
        // ignore
      }
    }
  }, [memoryProfile]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages.length, isLoading]);

  // Gradually learn user preferences from each question and interaction
  const learnFromUserPrompt = (promptText: string, personaUsed: AIPersona): UserMemoryProfile => {
    const nextProfile: UserMemoryProfile = {
      ...memoryProfile,
      topicWeights: { ...memoryProfile.topicWeights },
      favoriteSaintsAndDoctors: [...memoryProfile.favoriteSaintsAndDoctors],
      customNotes: [...memoryProfile.customNotes],
      personaCounts: { ...memoryProfile.personaCounts },
      totalQuestionsAsked: (memoryProfile.totalQuestionsAsked || 0) + 1,
      lastUpdated: Date.now(),
    };

    // 1. Update persona usage counts & determine favored persona
    nextProfile.personaCounts[personaUsed] = (nextProfile.personaCounts[personaUsed] || 0) + 1;
    let topPersona: AIPersona = nextProfile.favoredPersona;
    let maxCount = -1;
    (Object.keys(nextProfile.personaCounts) as AIPersona[]).forEach((p) => {
      if (nextProfile.personaCounts[p] > maxCount) {
        maxCount = nextProfile.personaCounts[p];
        topPersona = p;
      }
    });
    nextProfile.favoredPersona = topPersona;

    // 2. Detect preferred Bible translation if mentioned
    if (/\b(douay[-\s]?rheims|dra|drb)\b/i.test(promptText)) {
      nextProfile.preferredBible = 'Douay-Rheims';
    } else if (/\b(rsv[-\s]?ce|revised standard)\b/i.test(promptText)) {
      nextProfile.preferredBible = 'RSV-CE';
    } else if (/\b(nabre|new american bible)\b/i.test(promptText)) {
      nextProfile.preferredBible = 'NABRE';
    } else if (/\b(vulgate|knox)\b/i.test(promptText)) {
      nextProfile.preferredBible = 'Knox / Latin Vulgate';
    }

    // 3. Detect preferred response depth if mentioned
    if (/\b(essay|essays|write\s+a\s+paper|research\s+paper|treatise|composition)\b/i.test(promptText)) {
      nextProfile.preferredDepth = 'Essay & Academic Paper (with Sources)';
    } else if (/\b(brief|briefly|concise|short answer|in a few sentences|summary)\b/i.test(promptText)) {
      nextProfile.preferredDepth = 'Concise & Catechetical';
    } else if (/\b(in[-\s]?depth|detailed|scholarly|comprehensive|thorough|exhaustively)\b/i.test(promptText)) {
      nextProfile.preferredDepth = 'Comprehensive & Scholarly';
    } else if (/\b(meditation|prayerful|contemplative|spiritual reflection|pastoral)\b/i.test(promptText)) {
      nextProfile.preferredDepth = 'Pastoral & Contemplative';
    } else if (/\b(apologetics|defend|protestant|objection|debate)\b/i.test(promptText)) {
      nextProfile.preferredDepth = 'Apologetics & Scriptural';
    }

    // 4. Increment theological topic weights
    for (const matcher of TOPIC_MATCHERS) {
      if (matcher.keywords.test(promptText)) {
        nextProfile.topicWeights[matcher.topic] = (nextProfile.topicWeights[matcher.topic] || 0) + 1;
      }
    }

    // 5. Extract favorite Saints, Church Fathers, and Doctors
    for (const saint of SAINT_AND_DOCTOR_MATCHERS) {
      if (saint.pattern.test(promptText) && !nextProfile.favoriteSaintsAndDoctors.includes(saint.name)) {
        nextProfile.favoriteSaintsAndDoctors = [saint.name, ...nextProfile.favoriteSaintsAndDoctors].slice(0, 12);
      }
    }

    // 6. Extract explicit user preference statements ("I prefer...", "Remember that...", "My patron saint is...", "Always...")
    const explicitPrefMatch = promptText.match(
      /(?:i\s+prefer|please\s+remember|remember\s+that\s+i|my\s+patron\s+saint\s+is|i\s+am\s+studying|always\s+include|i\s+love\s+reading)[^.!?]{3,90}/i
    );
    if (explicitPrefMatch) {
      const note = explicitPrefMatch[0].trim();
      if (note && !nextProfile.customNotes.some(n => n.toLowerCase() === note.toLowerCase())) {
        nextProfile.customNotes = [note, ...nextProfile.customNotes].slice(0, 10);
      }
    }

    setMemoryProfile(nextProfile);
    return nextProfile;
  };

  // Build structured memory summary string to send to the AI Assistant (style & translation preferences only)
  const buildUserMemoryContextString = (profile: UserMemoryProfile, personaUsed: AIPersona): string => {
    const personaSpec = AI_PERSONA_SPECS[personaUsed] || AI_PERSONA_SPECS.scholarly;
    const lines: string[] = [
      `- Active Research Mode & Persona: ${personaSpec.title} (${personaSpec.systemPromptSuffix})`,
      `- Preferred Catholic Bible Translation: ${profile.preferredBible}`,
      `- Preferred Theological Depth & Style: ${profile.preferredDepth}`,
      `- STRICT RELEVANCE RULE: Answer ONLY the user's current question directly. Do NOT bring up unrelated past topics.`,
    ];

    if (profile.customNotes.length > 0) {
      lines.push(`- Explicit User Formatting/Style Notes: ${profile.customNotes.join(' | ')}`);
    }

    return lines.join('\n');
  };

  const handleStartNewChat = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingMessageId(null);
    setErrorMessage(null);

    const freshSession = createInitialSession(selectedPersona, selectedEngine);
    setSessions(prev => [freshSession, ...prev]);
    setActiveSessionId(freshSession.id);
    setInputPrompt('');
  };

  const handleSelectSession = (session: ChatSession) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingMessageId(null);
    setErrorMessage(null);
    setActiveSessionId(session.id);
    setSelectedPersona(session.persona || memoryProfile.favoredPersona);
    const validEngine: AIEngine =
      session.engine === 'openai' || session.engine === 'gemini' || session.engine === 'auto'
        ? session.engine
        : 'openai';
    setSelectedEngine(validEngine);
  };

  const handleDeleteSession = (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();
    setSessions(prev => {
      const remaining = prev.filter(s => s.id !== sessionId);
      if (remaining.length === 0) {
        const fallback = createInitialSession(selectedPersona, selectedEngine);
        setActiveSessionId(fallback.id);
        return [fallback];
      }
      if (activeSessionId === sessionId) {
        setActiveSessionId(remaining[0].id);
      }
      return remaining;
    });
  };

  const handleAddCustomMemoryNote = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newCustomNote.trim();
    if (!trimmed) return;
    setMemoryProfile(prev => ({
      ...prev,
      customNotes: [trimmed, ...prev.customNotes.filter(n => n.toLowerCase() !== trimmed.toLowerCase())].slice(0, 12),
      lastUpdated: Date.now()
    }));
    setNewCustomNote('');
  };

  const handleRemoveCustomNote = (noteToRemove: string) => {
    setMemoryProfile(prev => ({
      ...prev,
      customNotes: prev.customNotes.filter(n => n !== noteToRemove),
      lastUpdated: Date.now()
    }));
  };

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessageId(id);
      setTimeout(() => setCopiedMessageId(null), 2500);
    } catch {
      // fallback
    }
  };

  const handleSpeak = (id: string, text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (speakingMessageId === id) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text
      .replace(/[*#_`>~]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\n\n+/g, '. ');

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95;
    utterance.pitch = 0.98;

    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);

    setSpeakingMessageId(id);
    window.speechSynthesis.speak(utterance);
  };

  const handleClearCurrentChat = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingMessageId(null);
    const resetMsg: ChatMessage = {
      id: `welcome-${Date.now()}`,
      role: 'assistant',
      content: `**Laudetur Jesus Christus!** This conversation thread has been reset while your previous chats and learned preferences remain safely stored in the memory panel.`,
      timestamp: Date.now(),
      provider: selectedEngine,
      model: selectedEngine === 'openai' ? 'gpt-4o' : 'gemini-3-flash-preview'
    };
    setSessions(prev =>
      prev.map(s =>
        s.id === activeSession.id
          ? { ...s, title: 'New Theological Inquiry', updatedAt: Date.now(), messages: [resetMsg] }
          : s
      )
    );
  };

  const appendMessageToActiveSession = (targetSessionId: string, newMsg: ChatMessage, newTitle?: string) => {
    setSessions(prev => {
      const updated = prev.map(s => {
        if (s.id !== targetSessionId) return s;
        return {
          ...s,
          title: newTitle || s.title,
          persona: selectedPersona,
          engine: selectedEngine,
          updatedAt: Date.now(),
          messages: [...s.messages, newMsg]
        };
      });
      return [...updated].sort((a, b) => b.updatedAt - a.updatedAt);
    });
  };

  const handleSubmit = async (e?: React.FormEvent, customQuestion?: string) => {
    if (e) e.preventDefault();
    const promptToSend = (customQuestion || inputPrompt).trim();
    if (!promptToSend || isLoading || !activeSession) return;

    setErrorMessage(null);
    const targetSessionId = activeSession.id;
    const isFirstUserMessage = !activeSession.messages.some(m => m.role === 'user');
    const nextTitle = isFirstUserMessage ? summarizeTitleFromPrompt(promptToSend) : activeSession.title;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: promptToSend,
      timestamp: Date.now()
    };

    appendMessageToActiveSession(targetSessionId, userMsg, nextTitle);
    setInputPrompt('');
    setIsLoading(true);

    // Update learned user preferences from this inquiry
    const updatedProfile = learnFromUserPrompt(promptToSend, selectedPersona);
    const userMemoryString = buildUserMemoryContextString(updatedProfile, selectedPersona);

    try {
      const historyPayload = activeSession.messages
        .filter(m => !m.id.startsWith('welcome'))
        .slice(-6)
        .map(m => ({ role: m.role, content: m.content.slice(0, 800) }));

      let data: {
        reply?: string;
        webSources?: WebResearchSource[];
        provider?: string;
        model?: string;
      } | null = null;

      // 1. Primary POST request with clean user question + ChatGPT default engine
      try {
        const postRes = await fetch('/api/catholic-ai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          credentials: 'same-origin',
          body: JSON.stringify({
            prompt: promptToSend,
            history: historyPayload,
            userMemory: userMemoryString,
            enableWebResearch: isWebResearchEnabled,
            provider: selectedEngine,
          }),
        });

        const postContentType = postRes.headers.get('content-type') || '';
        if (postRes.ok && postContentType.includes('application/json')) {
          const parsed = await postRes.json();
          if (parsed && typeof parsed.reply === 'string' && parsed.reply.trim()) {
            data = parsed;
          }
        }
      } catch {
        // Proceed to GET fallback
      }

      // 2. Fallback GET request
      if (!data) {
        try {
          const queryUrl = `/api/catholic-ai?prompt=${encodeURIComponent(
            promptToSend
          )}&userMemory=${encodeURIComponent(
            userMemoryString
          )}&enableWebResearch=${isWebResearchEnabled ? 'true' : 'false'}&provider=${selectedEngine}`;

          const getRes = await fetch(queryUrl, {
            method: 'GET',
            headers: { Accept: 'application/json' },
            credentials: 'same-origin',
          });

          const contentType = getRes.headers.get('content-type') || '';
          if (getRes.ok && contentType.includes('application/json')) {
            const parsed = await getRes.json();
            if (parsed && typeof parsed.reply === 'string' && parsed.reply.trim()) {
              data = parsed;
            }
          }
        } catch {
          // Proceed to client-side research synthesis fallback
        }
      }

      if (data && data.reply) {
        const assistantMsg: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: data.reply,
          timestamp: Date.now(),
          webSources: data.webSources || [],
          provider: data.provider || selectedEngine,
          model:
            data.model ||
            (selectedEngine === 'openai' ? 'gpt-4o' : 'gemini-3-flash-preview'),
        };
        appendMessageToActiveSession(targetSessionId, assistantMsg);
        return;
      }

      // 3. Direct Client-Side Live Internet Fallback
      const liveWebSources = isWebResearchEnabled
        ? await searchCatholicInternet(promptToSend)
        : [];
      const matchedCanned = resolveCatholicTheologicalAnswer(promptToSend);
      const isSpecificMatch = !matchedCanned.includes('Catholic Theological Guidance on:');

      const synthesizedReply = synthesizeResearchResponse(
        promptToSend,
        liveWebSources,
        isSpecificMatch ? matchedCanned : undefined
      );

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: synthesizedReply,
        timestamp: Date.now(),
        webSources: liveWebSources,
        provider: selectedEngine,
        model: selectedEngine === 'openai' ? 'gpt-4o' : 'gemini-3-flash-preview'
      };
      appendMessageToActiveSession(targetSessionId, assistantMsg);
    } catch (err: any) {
      console.warn('Issue contacting Catholic AI:', err);
      const liveWebSources = isWebResearchEnabled
        ? await searchCatholicInternet(promptToSend).catch(() => [])
        : [];
      const matchedCanned = resolveCatholicTheologicalAnswer(promptToSend);
      const isSpecificMatch = !matchedCanned.includes('Catholic Theological Guidance on:');

      const synthesizedReply = synthesizeResearchResponse(
        promptToSend,
        liveWebSources,
        isSpecificMatch ? matchedCanned : undefined
      );

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: synthesizedReply,
        timestamp: Date.now(),
        webSources: liveWebSources,
        provider: selectedEngine,
        model: selectedEngine === 'openai' ? 'gpt-4o' : 'gemini-3-flash-preview'
      };
      appendMessageToActiveSession(targetSessionId, assistantMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSessions = useMemo(() => {
    const q = sessionSearchQuery.trim().toLowerCase();
    if (!q) return sessions;
    return sessions.filter(
      s =>
        s.title.toLowerCase().includes(q) ||
        s.messages.some(m => m.content.toLowerCase().includes(q))
    );
  }, [sessions, sessionSearchQuery]);

  const sortedTopics = useMemo(() => {
    return Object.entries(memoryProfile.topicWeights).sort((a, b) => b[1] - a[1]);
  }, [memoryProfile.topicWeights]);

  const learnedInsightsCount =
    sortedTopics.length +
    memoryProfile.favoriteSaintsAndDoctors.length +
    memoryProfile.customNotes.length;

  // Helper to format response markdown with clear daylight archival typography
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');

    return (
      <div className="space-y-3.5 leading-relaxed text-stone-900 text-base sm:text-lg md:text-[18.5px] font-serif">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) {
            return <div key={idx} className="h-1.5" />;
          }

          if (trimmed.startsWith('### ')) {
            return (
              <h3 key={idx} className="font-cinzel text-lg sm:text-xl font-bold text-amber-950 pt-2 border-b border-stone-200 pb-1.5">
                {trimmed.replace(/^###\s+/, '')}
              </h3>
            );
          }
          if (trimmed.startsWith('## ')) {
            return (
              <h2 key={idx} className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900 pt-3 border-b border-stone-200 pb-1.5">
                {trimmed.replace(/^##\s+/, '')}
              </h2>
            );
          }

          if (trimmed.startsWith('>')) {
            return (
              <blockquote key={idx} className="p-4 my-2.5 bg-[#FAF7F0] border border-[#E6DEC8] italic text-stone-800 text-base sm:text-lg rounded-xl font-serif">
                {parseInlineStyles(trimmed.replace(/^>\s*/, ''))}
              </blockquote>
            );
          }

          if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
            return (
              <div key={idx} className="flex items-start gap-2.5 pl-2">
                <span className="text-amber-800 font-bold text-lg shrink-0">•</span>
                <span className="flex-1 text-stone-900">{parseInlineStyles(trimmed.replace(/^[*|-]\s+/, ''))}</span>
              </div>
            );
          }

          const numMatch = trimmed.match(/^(\d+\.)\s+(.*)/);
          if (numMatch) {
            return (
              <div key={idx} className="flex items-start gap-2.5 pl-2">
                <span className="font-cinzel font-bold text-amber-900 text-sm shrink-0 mt-0.5 tabular-nums">
                  {numMatch[1]}
                </span>
                <span className="flex-1 text-stone-900">{parseInlineStyles(numMatch[2])}</span>
              </div>
            );
          }

          return (
            <p key={idx} className="text-stone-900">
              {parseInlineStyles(trimmed)}
            </p>
          );
        })}
      </div>
    );
  };

  const parseInlineStyles = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|CCC\s+\d+(?:[-–]\d+)?)/g);

    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-bold text-stone-950 font-serif">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <em key={i} className="italic text-stone-800">
            {part.slice(1, -1)}
          </em>
        );
      }
      if (/^CCC\s+\d+(?:[-–]\d+)?$/i.test(part)) {
        return (
          <span
            key={i}
            className="font-cinzel font-bold text-amber-900 underline decoration-amber-600/50 underline-offset-2 mx-0.5"
            title="Catechism of the Catholic Church Citation"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="space-y-5 w-full pb-12">
      {/* 1. Daylight Archival Header Banner */}
      <div className="bg-[#FDFBF7] rounded-xl shadow-xs border border-[#E5DEC9] relative z-20 w-full">
        <div className={`px-5 pt-4 pb-4 sm:px-6 min-h-[148px] bg-gradient-to-r from-[#FDFBF7] via-[#F7F2E7] to-[#FDFBF7] text-stone-900 flex flex-col justify-between ${isSettingsOpen ? 'rounded-t-xl' : 'rounded-xl'}`}>
          <div className="space-y-1.5 text-left">
            {/* Line 1: Clean Unboxed Metadata */}
            <div className="flex items-center gap-2 text-xs sm:text-sm text-stone-600 font-serif flex-wrap">
              <strong className="text-amber-900 font-cinzel font-bold">
                {(AI_ENGINE_SPECS[selectedEngine] || AI_ENGINE_SPECS.openai).name}
              </strong>
              <span aria-hidden="true">·</span>
              <span className="italic text-stone-700">{AI_PERSONA_SPECS[selectedPersona].title}</span>
              <span aria-hidden="true">·</span>
              <span className="text-stone-600 font-cinzel text-xs">
                Memory Active ({sessions.length} {sessions.length === 1 ? 'Chat' : 'Chats'})
              </span>
            </div>

            {/* Line 2: Prominent Main Title */}
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-normal text-stone-900 leading-snug break-words">
              Catholic Theological &amp; Scriptural Research Assistant
            </h2>
          </div>

          {/* Line 3: Daylight Action Controls */}
          <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-2.5 mt-auto pt-4 shrink-0">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setIsSidebarOpen(prev => !prev)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-cinzel font-semibold transition-all cursor-pointer flex items-center gap-1.5 border whitespace-nowrap shrink-0 ${
                  isSidebarOpen
                    ? 'bg-[#EFE8D8] text-amber-950 border-[#D5C7A9]'
                    : 'bg-white hover:bg-stone-50 text-stone-800 border-stone-300'
                }`}
                title={isSidebarOpen ? 'Hide Previous Chats & Memory Panel' : 'Show Previous Chats & Memory Panel'}
              >
                {isSidebarOpen ? (
                  <PanelLeftClose className="w-3.5 h-3.5 text-amber-800" />
                ) : (
                  <PanelLeftOpen className="w-3.5 h-3.5 text-amber-800" />
                )}
                <span>Previous Chats &amp; Memory</span>
              </button>

              <button
                type="button"
                onClick={handleStartNewChat}
                className="px-3.5 py-1.5 rounded-lg bg-amber-800 hover:bg-amber-900 text-white font-cinzel font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs whitespace-nowrap shrink-0"
                title="Start a new theological inquiry thread"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>New Chat</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const nextPersona: AIPersona = selectedPersona === 'essay' ? 'scholarly' : 'essay';
                  setSelectedPersona(nextPersona);
                  setMemoryProfile(prev => ({
                    ...prev,
                    preferredDepth:
                      nextPersona === 'essay'
                        ? 'Essay & Academic Paper (with Sources)'
                        : 'Comprehensive & Scholarly',
                    lastUpdated: Date.now(),
                  }));
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-cinzel font-bold transition-all cursor-pointer flex items-center gap-1.5 border whitespace-nowrap shrink-0 ${
                  selectedPersona === 'essay' || memoryProfile.preferredDepth === 'Essay & Academic Paper (with Sources)'
                    ? 'bg-amber-900/15 text-amber-950 border-amber-700/70 shadow-2xs'
                    : 'bg-white hover:bg-stone-50 text-stone-700 border-stone-300'
                }`}
                title="Toggle Essay Mode so ChatGPT writes full multi-paragraph essays with Sources & Works Cited"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-800" />
                <span>
                  {selectedPersona === 'essay' || memoryProfile.preferredDepth === 'Essay & Academic Paper (with Sources)'
                    ? 'Essay Mode (with Sources): Active'
                    : 'Essay Mode (with Sources)'}
                </span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setIsSettingsOpen(prev => !prev)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-cinzel font-semibold transition-all cursor-pointer flex items-center gap-1.5 border whitespace-nowrap shrink-0 ${
                  isSettingsOpen
                    ? 'bg-[#EFE8D8] text-amber-950 border-[#D5C7A9]'
                    : 'bg-white hover:bg-stone-50 text-stone-800 border-stone-300'
                }`}
                title={isSettingsOpen ? 'Close Settings Menu' : 'Open AI Engine Settings Drop-down'}
                aria-label="Toggle AI Settings Drop-down"
              >
                <Sliders className="w-3.5 h-3.5 text-amber-800" />
                <span>Settings</span>
                <ChevronDown className={`w-3 h-3 text-amber-800 transition-transform duration-150 ${isSettingsOpen ? 'rotate-180' : ''}`} />
              </button>

              <button
                type="button"
                onClick={handleClearCurrentChat}
                className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-stone-100 border border-stone-300 text-stone-700 hover:text-stone-900 text-xs font-cinzel font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap shrink-0"
                title="Clear current conversation thread"
              >
                <Trash2 className="w-3.5 h-3.5 text-stone-600" />
                <span>Reset Thread</span>
              </button>
            </div>
          </div>
        </div>

        {/* Daylight Settings Drop-Down Panel */}
        {isSettingsOpen && (
          <div className="p-4 sm:p-5 bg-[#F6F2E9] border-t border-[#E5DEC9] rounded-b-xl space-y-4 animate-fade-in text-stone-800 text-xs text-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Engine Selector */}
              <div className="space-y-1.5">
                <label className="block font-cinzel font-bold text-amber-950 text-[11px]">
                  Primary AI Engine (Default: ChatGPT)
                </label>
                <select
                  value={selectedEngine}
                  onChange={(e) => setSelectedEngine(e.target.value as AIEngine)}
                  className="w-full bg-white text-stone-900 text-xs font-serif rounded-lg p-2.5 border border-stone-300 focus:outline-none focus:border-amber-700 cursor-pointer"
                >
                  {(['openai', 'gemini', 'auto'] as AIEngine[]).map((eng) => (
                    <option key={eng} value={eng}>
                      {AI_ENGINE_SPECS[eng].name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Persona Selector */}
              <div className="space-y-1.5">
                <label className="block font-cinzel font-bold text-amber-950 text-[11px]">
                  Research Mode &amp; Persona
                </label>
                <select
                  value={selectedPersona}
                  onChange={(e) => setSelectedPersona(e.target.value as AIPersona)}
                  className="w-full bg-white text-stone-900 text-xs font-serif rounded-lg p-2.5 border border-stone-300 focus:outline-none focus:border-amber-700 cursor-pointer"
                >
                  {Object.entries(AI_PERSONA_SPECS).map(([key, spec]) => (
                    <option key={key} value={key}>
                      {spec.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preferred Bible Edition */}
              <div className="space-y-1.5">
                <label className="block font-cinzel font-bold text-amber-950 text-[11px]">
                  Preferred Bible Edition
                </label>
                <select
                  value={memoryProfile.preferredBible}
                  onChange={(e) =>
                    setMemoryProfile(prev => ({
                      ...prev,
                      preferredBible: e.target.value as PreferredBibleEdition,
                      lastUpdated: Date.now()
                    }))
                  }
                  className="w-full bg-white text-stone-900 text-xs font-serif rounded-lg p-2.5 border border-stone-300 focus:outline-none focus:border-amber-700 cursor-pointer"
                >
                  {(['RSV-CE', 'Douay-Rheims', 'NABRE', 'Knox / Latin Vulgate'] as PreferredBibleEdition[]).map(ed => (
                    <option key={ed} value={ed}>
                      {ed}
                    </option>
                  ))}
                </select>
              </div>

              {/* Preferred Response Depth */}
              <div className="space-y-1.5">
                <label className="block font-cinzel font-bold text-amber-950 text-[11px]">
                  Preferred Response Style
                </label>
                <select
                  value={memoryProfile.preferredDepth}
                  onChange={(e) =>
                    setMemoryProfile(prev => ({
                      ...prev,
                      preferredDepth: e.target.value as PreferredResponseDepth,
                      lastUpdated: Date.now()
                    }))
                  }
                  className="w-full bg-white text-stone-900 text-xs font-serif rounded-lg p-2.5 border border-stone-300 focus:outline-none focus:border-amber-700 cursor-pointer"
                >
                  {([
                    'Essay & Academic Paper (with Sources)',
                    'Comprehensive & Scholarly',
                    'Concise & Catechetical',
                    'Pastoral & Contemplative',
                    'Apologetics & Scriptural'
                  ] as PreferredResponseDepth[]).map(depth => (
                    <option key={depth} value={depth}>
                      {depth}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Internet Research Toggle */}
            <div className="pt-2 border-t border-stone-300/70 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsWebResearchEnabled(prev => !prev)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-cinzel transition-all cursor-pointer border flex items-center gap-2 whitespace-nowrap shrink-0 ${
                    isWebResearchEnabled
                      ? 'bg-amber-50 border-amber-600/60 text-amber-950'
                      : 'bg-white border-stone-300 text-stone-600'
                  }`}
                >
                  <Globe className={`w-3.5 h-3.5 ${isWebResearchEnabled ? 'text-amber-800' : 'text-stone-400'}`} />
                  <span>Internet Research: <strong>{isWebResearchEnabled ? 'Active' : 'Off'}</strong></span>
                </button>
              </div>

              <span className="text-[11px] font-serif text-stone-600">
                ChatGPT remembers your style and Bible translation preferences across sessions.
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 2. Main Workspace: Daylight Left Memory Panel + Right Active Research Thread */}
      <div className={`grid grid-cols-1 ${isSidebarOpen ? 'lg:grid-cols-[310px_1fr]' : 'lg:grid-cols-1'} gap-5 items-start`}>
        
        {/* LEFT PANEL: PREVIOUS CHATS & LEARNED USER PREFERENCES (LIGHT ARCHIVAL PAPER PALETTE) */}
        {isSidebarOpen && (
          <aside className="rounded-xl overflow-hidden bg-[#FAF8F3] border border-[#E5DEC9] shadow-xs text-stone-900 flex flex-col max-h-[760px] lg:sticky lg:top-4">
            {/* Panel Switcher Header */}
            <div className="p-3.5 bg-[#F4EFE4] border-b border-[#E5DEC9] space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs font-cinzel font-bold text-amber-950">
                  <Brain className="w-3.5 h-3.5 text-amber-800" />
                  <span>Research Archive &amp; Memory</span>
                </div>
                <button
                  type="button"
                  onClick={handleStartNewChat}
                  className="px-2.5 py-1 rounded-md bg-amber-800 hover:bg-amber-900 text-white font-cinzel font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors whitespace-nowrap shrink-0"
                >
                  <Plus className="w-3 h-3 stroke-[2.5]" />
                  <span>New Chat</span>
                </button>
              </div>

              {/* 2-Tab Switcher: Previous Chats vs. Learned Preferences */}
              <div className="grid grid-cols-2 gap-1 p-1 rounded-lg bg-[#E8E0CE] text-[11px] font-cinzel font-bold">
                <button
                  type="button"
                  onClick={() => setSidebarTab('chats')}
                  className={`py-1.5 px-2 rounded-md flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                    sidebarTab === 'chats'
                      ? 'bg-white text-stone-900 shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <MessageSquare className="w-3 h-3 text-amber-800" />
                  <span>Chats ({sessions.length})</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSidebarTab('memory')}
                  className={`py-1.5 px-2 rounded-md flex items-center justify-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                    sidebarTab === 'memory'
                      ? 'bg-white text-stone-900 shadow-2xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-amber-800" />
                  <span>Preferences ({learnedInsightsCount})</span>
                </button>
              </div>
            </div>

            {/* TAB A: PREVIOUS CHATS LIST */}
            {sidebarTab === 'chats' && (
              <div className="flex flex-col flex-1 min-h-0">
                {/* Search Input */}
                <div className="p-2.5 border-b border-stone-200/80 bg-[#FAF8F3]">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      value={sessionSearchQuery}
                      onChange={(e) => setSessionSearchQuery(e.target.value)}
                      placeholder="Search previous chats..."
                      className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white border border-stone-300 text-xs font-serif text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-700"
                    />
                  </div>
                </div>

                {/* Scrollable Sessions List */}
                <div className="flex-1 overflow-y-auto p-2.5 space-y-2 max-h-[520px]">
                  {filteredSessions.map((session) => {
                    const isCurrent = session.id === activeSession?.id;
                    const userQuestionCount = session.messages.filter(m => m.role === 'user').length;
                    return (
                      <div
                        key={session.id}
                        onClick={() => handleSelectSession(session)}
                        className={`group p-3 rounded-lg border transition-all cursor-pointer text-left flex flex-col gap-1.5 ${
                          isCurrent
                            ? 'bg-[#F2EBD9] border-amber-700/60 shadow-2xs'
                            : 'bg-white hover:bg-[#F7F3E8] border-stone-200/90 hover:border-stone-300'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className={`font-serif text-xs sm:text-sm font-bold leading-snug line-clamp-2 ${
                            isCurrent ? 'text-stone-950' : 'text-stone-800 group-hover:text-stone-950'
                          }`}>
                            {session.title}
                          </h4>
                          <button
                            type="button"
                            onClick={(e) => handleDeleteSession(e, session.id)}
                            className="p-1 rounded hover:bg-red-100 text-stone-400 hover:text-red-700 opacity-75 group-hover:opacity-100 transition-all shrink-0 cursor-pointer"
                            title="Delete this chat from history"
                            aria-label="Delete chat"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between gap-2 text-[10px] text-stone-500 font-cinzel pt-1 border-t border-stone-200/70">
                          <span className="text-amber-900 font-semibold truncate">
                            {AI_PERSONA_SPECS[session.persona]?.title || 'Scholar'}
                          </span>
                          <span className="flex items-center gap-1 shrink-0 font-mono tabular-nums text-stone-500">
                            <Clock className="w-2.5 h-2.5 text-amber-800" />
                            {new Date(session.updatedAt).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                            {' · '}
                            {userQuestionCount} {userQuestionCount === 1 ? 'q' : 'qs'}
                          </span>
                        </div>
                      </div>
                    );
                  })}

                  {filteredSessions.length === 0 && (
                    <div className="p-6 text-center text-xs font-serif text-stone-500">
                      No saved chats match your search.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB B: LEARNED USER PREFERENCES & MEMORY PROFILE */}
            {sidebarTab === 'memory' && (
              <div className="flex-1 overflow-y-auto p-3.5 space-y-4 text-left max-h-[580px]">
                <div className="p-3 rounded-lg bg-white border border-stone-200/90 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-cinzel font-bold text-amber-950">
                    <span>Adaptive User Profile</span>
                    <span className="tabular-nums text-stone-600">{memoryProfile.totalQuestionsAsked} Inquiries</span>
                  </div>
                  <p className="text-xs font-serif text-stone-600 leading-relaxed">
                    The Assistant automatically adapts to your preferred Bible edition, theological depth, and favorite topics as you research.
                  </p>
                </div>

                {/* Core Learned Settings */}
                <div className="space-y-1.5 text-xs">
                  <div className="p-2.5 rounded-lg bg-white border border-stone-200/90 flex items-center justify-between">
                    <span className="font-cinzel text-[11px] text-stone-500">Bible Edition</span>
                    <span className="font-serif font-bold text-stone-900">{memoryProfile.preferredBible}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-stone-200/90 flex items-center justify-between">
                    <span className="font-cinzel text-[11px] text-stone-500">Response Style</span>
                    <span className="font-serif font-bold text-stone-900">{memoryProfile.preferredDepth}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white border border-stone-200/90 flex items-center justify-between">
                    <span className="font-cinzel text-[11px] text-stone-500">Favored Persona</span>
                    <span className="font-serif font-bold text-stone-900">
                      {AI_PERSONA_SPECS[memoryProfile.favoredPersona]?.title}
                    </span>
                  </div>
                </div>

                {/* Learned Theological Interests */}
                <div className="space-y-2">
                  <h5 className="font-cinzel text-[11px] font-bold text-amber-950 flex items-center gap-1.5">
                    <BookOpen className="w-3 h-3 text-amber-800" />
                    <span>Learned Theological Interests</span>
                  </h5>
                  {sortedTopics.length > 0 ? (
                    <div className="space-y-1.5">
                      {sortedTopics.slice(0, 6).map(([topic, count]) => (
                        <div key={topic} className="px-2.5 py-1.5 rounded-lg bg-white border border-stone-200/90 flex items-center justify-between text-xs">
                          <span className="font-serif text-stone-800 truncate pr-2">{topic}</span>
                          <span className="text-amber-900 font-mono text-[11px] font-semibold tabular-nums shrink-0">
                            {count}x
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs font-serif italic text-stone-500">
                      Ask questions about Scripture, the Eucharist, Church Fathers, or Marian dogma to build your interest profile.
                    </p>
                  )}
                </div>

                {/* Favorite Saints & Doctors */}
                {memoryProfile.favoriteSaintsAndDoctors.length > 0 && (
                  <div className="space-y-1.5">
                    <h5 className="font-cinzel text-[11px] font-bold text-amber-950">
                      Consulted Saints &amp; Doctors
                    </h5>
                    <p className="text-xs font-serif text-stone-700 leading-relaxed">
                      {memoryProfile.favoriteSaintsAndDoctors.join(' · ')}
                    </p>
                  </div>
                )}

                {/* Custom Personal Preference Notes */}
                <div className="space-y-2 pt-2 border-t border-stone-200">
                  <h5 className="font-cinzel text-[11px] font-bold text-amber-950">
                    Personal Memory Notes
                  </h5>
                  <form onSubmit={handleAddCustomMemoryNote} className="flex gap-1.5">
                    <input
                      type="text"
                      value={newCustomNote}
                      onChange={(e) => setNewCustomNote(e.target.value)}
                      placeholder="e.g., Always include Latin terms..."
                      className="flex-1 px-2.5 py-1.5 rounded-lg bg-white border border-stone-300 text-xs font-serif text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-700"
                    />
                    <button
                      type="submit"
                      disabled={!newCustomNote.trim()}
                      className="px-3 py-1.5 rounded-lg bg-amber-800 hover:bg-amber-900 disabled:opacity-40 text-white font-cinzel font-bold text-xs cursor-pointer whitespace-nowrap shrink-0"
                    >
                      Save
                    </button>
                  </form>

                  {memoryProfile.customNotes.length > 0 ? (
                    <div className="space-y-1.5 pt-1">
                      {memoryProfile.customNotes.map((note, idx) => (
                        <div
                          key={idx}
                          className="px-2.5 py-1.5 rounded-lg bg-white border border-stone-200/90 flex items-center justify-between gap-2 text-xs font-serif text-stone-800"
                        >
                          <span className="leading-snug">{note}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveCustomNote(note)}
                            className="text-stone-400 hover:text-red-700 cursor-pointer shrink-0"
                            title="Remove note"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[11px] font-serif italic text-stone-500">
                      Add any personal preference above (or mention &ldquo;I prefer...&rdquo; in chat) and the Assistant will remember it.
                    </p>
                  )}
                </div>
              </div>
            )}
          </aside>
        )}

        {/* RIGHT PANEL: ACTIVE CONVERSATION THREAD & STICKY INPUT (DAYLIGHT PAPER PALETTE) */}
        <div className="space-y-4 min-w-0 w-full">
          <div className="space-y-4 min-h-[320px] w-full">
            {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={msg.id}
                  className="w-full"
                >
                  <div
                    className={`relative w-full rounded-xl p-4 sm:p-6 border ${
                      isUser
                        ? 'bg-[#F4EFE4] text-stone-900 border-[#DFD5C0]'
                        : 'bg-white text-stone-900 border-stone-200/90 shadow-2xs'
                    }`}
                  >
                    {/* Header inside assistant message */}
                    {!isUser && (
                      <div className="flex items-center justify-between pb-2.5 mb-3.5 border-b border-stone-200/80 text-xs text-stone-600 font-cinzel">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-amber-950">
                            {msg.provider === 'gemini'
                              ? 'Soul Sanctum Assistant (Gemini)'
                              : 'ChatGPT (OpenAI GPT-4o)'}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="text-stone-600 font-serif italic">
                            Theological &amp; Scriptural Synthesis
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleSpeak(msg.id, msg.content)}
                            className={`p-1.5 rounded-md hover:bg-stone-100 transition-colors cursor-pointer ${
                              speakingMessageId === msg.id ? 'text-amber-800 bg-amber-50' : 'text-stone-500'
                            }`}
                            title={speakingMessageId === msg.id ? 'Stop reading' : 'Read aloud'}
                          >
                            {speakingMessageId === msg.id ? (
                              <VolumeX className="w-4 h-4 text-amber-800" />
                            ) : (
                              <Volume2 className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={() => handleCopy(msg.id, msg.content)}
                            className="p-1.5 rounded-md hover:bg-stone-100 text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
                            title="Copy answer"
                          >
                            {copiedMessageId === msg.id ? (
                              <Check className="w-4 h-4 text-emerald-700" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Header inside user message */}
                    {isUser && (
                      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#E2D8C3] text-xs text-amber-950 font-cinzel">
                        <span className="font-bold">Your Research Inquiry</span>
                        <span className="text-[11px] text-stone-500 font-mono tabular-nums">
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    )}

                    {/* Body Content */}
                    {isUser ? (
                      <p className="font-serif text-base sm:text-lg leading-relaxed whitespace-pre-wrap text-stone-900">
                        {msg.content}
                      </p>
                    ) : (
                      renderFormattedContent(msg.content)
                    )}

                    {/* Live Web & Internet Sources Consulted */}
                    {!isUser && msg.webSources && msg.webSources.length > 0 && (
                      <div className="mt-4 p-3.5 rounded-xl bg-[#FAF8F3] border border-[#E5DEC9] space-y-2 text-left">
                        <div className="flex items-center gap-1.5 text-xs font-cinzel font-bold text-amber-950">
                          <Globe className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                          <span>Verified Internet Sources Consulted</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {msg.webSources.map((source, sIdx) => (
                            <a
                              key={sIdx}
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-white hover:bg-[#F6F2E9] text-xs text-stone-900 hover:text-amber-950 border border-stone-200/90 hover:border-amber-700/50 transition-all group"
                              title={source.snippet}
                            >
                              <span className="font-serif font-medium truncate flex-1">{source.title}</span>
                              <span className="text-[10px] text-amber-900 font-mono shrink-0 flex items-center gap-1">
                                <span>{source.domain}</span>
                                <ExternalLink className="w-3 h-3 text-amber-800 group-hover:translate-x-0.5 transition-transform" />
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Footer source note on assistant messages */}
                    {!isUser && !msg.id.startsWith('welcome') && (
                      <div className="mt-4 pt-2.5 border-t border-stone-200/80 flex items-center justify-between text-xs text-stone-500 italic font-serif">
                        <span className="flex items-center gap-1.5">
                          <Globe className="w-3 h-3 text-amber-800" />
                          <span>
                            Grounded in Sacred Scripture, Sacred Tradition &amp; the Catechism · Tailored to your preferences ({memoryProfile.preferredBible})
                          </span>
                        </span>
                        <span className="not-italic font-mono text-[11px] tabular-nums">
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="w-full bg-white border border-stone-200/90 rounded-xl p-4 shadow-2xs flex items-center gap-3">
                <RefreshCw className="w-4 h-4 text-amber-800 animate-spin shrink-0" />
                <div className="space-y-0.5 text-left">
                  <span className="text-xs sm:text-sm font-serif italic text-stone-900 font-semibold block">
                    Consulting {(AI_ENGINE_SPECS[selectedEngine] || AI_ENGINE_SPECS.openai).name} &amp; Vatican sources...
                  </span>
                  <span className="text-[11px] text-stone-600 font-serif block">
                    Cross-referencing Sacred Scripture ({memoryProfile.preferredBible}), Catechism (CCC), and your learned preferences.
                  </span>
                </div>
              </div>
            )}

            {/* Error message */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-stone-900 text-xs font-serif flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <div className="space-y-1 text-left">
                  <p className="font-semibold">{errorMessage}</p>
                  <p className="text-stone-600">
                    Please verify your connection or try rephrasing your question.
                  </p>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* 3. Bottom Sticky Daylight Input Form */}
          <form
            onSubmit={handleSubmit}
            className="sticky bottom-4 z-20 rounded-xl bg-[#FAF8F3]/95 backdrop-blur-md border border-[#D8CEB8] p-3 shadow-md"
          >
            <div className="flex items-end gap-2.5">
              <textarea
                ref={inputRef}
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                placeholder="Ask any question on Catholic doctrine, Scripture, Sacraments, or Church history..."
                rows={2}
                className="flex-1 bg-white text-stone-900 placeholder-stone-400 text-sm sm:text-base font-serif rounded-lg p-3 border border-stone-300 focus:border-amber-700 focus:outline-none resize-none leading-relaxed"
              />

              <button
                type="submit"
                disabled={!inputPrompt.trim() || isLoading}
                className="h-12 px-5 rounded-lg bg-amber-800 hover:bg-amber-900 text-white font-cinzel font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0 whitespace-nowrap"
              >
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <>
                    <span>Ask</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
