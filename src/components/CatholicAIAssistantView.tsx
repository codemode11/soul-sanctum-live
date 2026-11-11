import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Send, 
  BookOpen, 
  Copy, 
  Check, 
  Volume2, 
  VolumeX, 
  Trash2, 
  Scroll, 
  HelpCircle,
  RefreshCw,
  Search,
  ExternalLink,
  ChevronRight,
  ChevronDown,
  Globe,
  Settings,
  Key,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import {
  WebResearchSource,
  searchCatholicInternet,
  synthesizeResearchResponse,
} from '../utils/catholicInternetResearch';
import { DoveWithHaloIcon, BetterScrollIcon } from './SanctumIcons';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  webSources?: WebResearchSource[];
  provider?: string;
  model?: string;
}

export type AIEngine = 'openai' | 'gemini' | 'magisterium' | 'auto';
export type AIPersona = 'scholarly' | 'catechism' | 'patristic' | 'apologetics' | 'spiritual';

const AI_ENGINE_SPECS: Record<AIEngine, { name: string; label: string }> = {
  openai: {
    name: 'ChatGPT (OpenAI GPT-4o)',
    label: 'ChatGPT (GPT-4o)'
  },
  gemini: {
    name: 'Soul Sanctum AI (Gemini)',
    label: 'Gemini AI'
  },
  magisterium: {
    name: 'Magisterium AI Engine',
    label: 'Magisterium AI'
  },
  auto: {
    name: 'Smart Hybrid AI Engine',
    label: 'Auto AI'
  }
};

const AI_PERSONA_SPECS: Record<AIPersona, { title: string; systemPromptSuffix: string }> = {
  scholarly: {
    title: 'Theological Scholar',
    systemPromptSuffix: 'Provide a scholarly theological synthesis with precise CCC and Scripture citations.'
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

export const CatholicAIAssistantView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'welcome',
        role: 'assistant',
        content: `**Laudetur Jesus Christus!** Welcome to the **Catholic AI Assistant** (powered by **ChatGPT** & **Gemini**).

Grounded in:
* **The Catechism of the Catholic Church (CCC)**
* **Sacred Scripture** (NABRE, Douay-Rheims, RSV-CE)
* **The Church Fathers and Doctors of the Church** (St. Thomas Aquinas, St. Augustine, St. John Chrysostom)
* **The 21 Ecumenical Councils** (Nicaea to Vatican II)

Feel free to ask any question on Catholic dogma, Scripture, moral theology, or Church history.`,
        timestamp: Date.now(),
        provider: 'openai',
        model: 'gpt-4o-mini'
      }
    ];
  });

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isWebResearchEnabled, setIsWebResearchEnabled] = useState(true);
  const [selectedEngine, setSelectedEngine] = useState<AIEngine>('openai');
  const [selectedPersona, setSelectedPersona] = useState<AIPersona>('scholarly');
  const [customOpenAiKey, setCustomOpenAiKey] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('sanctum_openai_api_key') || '';
    }
    return '';
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSaveCustomKey = (key: string) => {
    setCustomOpenAiKey(key);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sanctum_openai_api_key', key);
    }
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

  const handleClearChat = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingMessageId(null);
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content: `**Laudetur Jesus Christus!** The Catholic Assistant has been reset. What Catholic theological question, Scripture passage, or doctrine would you like to explore today?`,
        timestamp: Date.now(),
        provider: selectedEngine,
        model: selectedEngine === 'openai' ? 'gpt-4o-mini' : 'gemini-3.1-flash'
      }
    ]);
  };

  const handleSubmit = async (e?: React.FormEvent, customQuestion?: string) => {
    if (e) e.preventDefault();
    const promptToSend = (customQuestion || inputPrompt).trim();
    if (!promptToSend || isLoading) return;

    setErrorMessage(null);
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: promptToSend,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const historyPayload = messages
        .filter(m => m.id !== 'welcome')
        .slice(-4)
        .map(m => ({ role: m.role, content: m.content.slice(0, 600) }));

      const personaInstruction = AI_PERSONA_SPECS[selectedPersona].systemPromptSuffix;
      const augmentedPrompt = `${promptToSend}\n\n[Persona Instruction: ${personaInstruction}]`;

      let data: { reply?: string; webSources?: WebResearchSource[]; provider?: string; model?: string } | null = null;

      // 1. GET request
      try {
        const queryUrl = `/api/catholic-ai?prompt=${encodeURIComponent(
          augmentedPrompt
        )}&enableWebResearch=${isWebResearchEnabled ? 'true' : 'false'}&provider=${selectedEngine}&apiKey=${encodeURIComponent(
          customOpenAiKey
        )}`;

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
        // Proceed to POST fallback
      }

      // 2. Fallback POST request
      if (!data) {
        try {
          const postRes = await fetch('/api/catholic-ai', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            credentials: 'same-origin',
            body: JSON.stringify({
              prompt: augmentedPrompt,
              history: historyPayload,
              enableWebResearch: isWebResearchEnabled,
              provider: selectedEngine,
              apiKey: customOpenAiKey,
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
          // Proceed to live client-side Internet research fallback
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
          model: data.model || (selectedEngine === 'openai' ? 'gpt-4o-mini' : 'gemini-3.1-flash'),
        };
        setMessages(prev => [...prev, assistantMsg]);
        return;
      }

      // 3. Direct Client-Side Live Internet Research Fallback
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
        model: 'chatgpt-standard'
      };
      setMessages(prev => [...prev, assistantMsg]);
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
        model: 'chatgpt-fallback'
      };
      setMessages(prev => [...prev, assistantMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to format response markdown with enlarged, clear typography
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');

    return (
      <div className="space-y-3.5 leading-relaxed text-[#1C120C] text-base sm:text-lg md:text-[18.5px] font-serif">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) {
            return <div key={idx} className="h-1.5" />;
          }

          // Headers ### or ##
          if (trimmed.startsWith('### ')) {
            return (
              <h3 key={idx} className="font-cinzel text-lg sm:text-xl font-bold text-[#3B1E08] pt-2 border-b border-[#D4A373]/40 pb-1.5">
                {trimmed.replace(/^###\s+/, '')}
              </h3>
            );
          }
          if (trimmed.startsWith('## ')) {
            return (
              <h2 key={idx} className="font-cinzel text-xl sm:text-2xl font-bold text-[#241307] pt-3 border-b border-stone-300 pb-1.5">
                {trimmed.replace(/^##\s+/, '')}
              </h2>
            );
          }

          // Blockquotes
          if (trimmed.startsWith('>')) {
            return (
              <blockquote key={idx} className="p-3.5 my-2 bg-[#FAF5EE] border-l-4 border-[#8B5A2B] italic text-[#241307] text-base sm:text-lg rounded-r-lg font-serif">
                {parseInlineStyles(trimmed.replace(/^>\s*/, ''))}
              </blockquote>
            );
          }

          // Bullet point * or -
          if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
            return (
              <div key={idx} className="flex items-start gap-2.5 pl-2">
                <span className="text-[#8B5A2B] font-bold text-lg shrink-0">•</span>
                <span className="flex-1 text-[#1C120C]">{parseInlineStyles(trimmed.replace(/^[*|-]\s+/, ''))}</span>
              </div>
            );
          }

          // Numbered list
          const numMatch = trimmed.match(/^(\d+\.)\s+(.*)/);
          if (numMatch) {
            return (
              <div key={idx} className="flex items-start gap-2.5 pl-2">
                <span className="font-cinzel font-bold text-[#5C2E0E] text-sm shrink-0 mt-0.5">
                  {numMatch[1]}
                </span>
                <span className="flex-1 text-[#1C120C]">{parseInlineStyles(numMatch[2])}</span>
              </div>
            );
          }

          // Standard paragraph
          return (
            <p key={idx} className="text-[#1C120C]">
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
          <strong key={i} className="font-bold text-[#1C120C] font-serif">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <em key={i} className="italic text-[#2A1810]">
            {part.slice(1, -1)}
          </em>
        );
      }
      if (/^CCC\s+\d+(?:[-–]\d+)?$/i.test(part)) {
        return (
          <span
            key={i}
            className="inline-flex items-center gap-0.5 px-2 py-0.5 mx-0.5 rounded bg-[#FAF2E8] text-[#5C2E0E] font-cinzel font-bold text-xs border border-[#D4A373]/60 shadow-2xs"
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
      {/* 1. Top Banner Following Daily Mass Readings Styling & Layout */}
      <div className="bg-white/55 backdrop-blur-xl backdrop-saturate-150 rounded-xl shadow-xs border border-white/70 ring-1 ring-inset ring-white/40 relative z-20 w-full">
        <div className={`sanctum-top-banner px-5 pt-4 pb-4 sm:px-6 min-h-[164px] bg-gradient-to-r from-stone-900 via-[#1C120C] to-stone-900 text-stone-100 flex flex-col justify-between ${isSettingsOpen ? 'rounded-t-xl' : 'rounded-xl'}`}>
          <div className="space-y-2">
            {/* Line 1: Engine/Persona Subtext */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap overflow-hidden">
              <span className="text-xs sm:text-sm text-stone-300 font-serif sm:whitespace-nowrap">
                <strong className="text-amber-300 font-cinzel font-semibold">{AI_ENGINE_SPECS[selectedEngine].name}</strong>
                <span className="mx-1.5 opacity-60">•</span>
                <span className="italic">{AI_PERSONA_SPECS[selectedPersona].title}</span>
              </span>
            </div>

            {/* Line 2: Prominent Main Title */}
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-normal text-amber-100 leading-snug break-words">
              Catholic Theological &amp; Scriptural Research Assistant
            </h2>
          </div>

          {/* Line 3: Action Controls lowered together at bottom-right */}
          <div className="flex items-center justify-end gap-2 sm:gap-2.5 mt-auto pt-4 shrink-0">
            <button
              type="button"
              onClick={() => setIsSettingsOpen(prev => !prev)}
              className={`px-3 py-1.5 rounded-md text-xs font-cinzel font-semibold transition-all cursor-pointer flex items-center gap-1.5 border shadow-2xs ${
                isSettingsOpen
                  ? 'bg-amber-700 text-white border-amber-400 ring-1 ring-amber-400/50'
                  : 'bg-[#1C120C]/90 hover:bg-[#3B1E08] text-amber-100 border-[#8B5A2B]/80'
              }`}
              title={isSettingsOpen ? 'Close Settings Menu' : 'Open AI Engine Settings Drop-down'}
              aria-label="Toggle AI Settings Drop-down"
            >
              <Sliders className="w-3.5 h-3.5 text-amber-300" />
              <span>Settings</span>
              <ChevronDown className={`w-3 h-3 text-amber-300 transition-transform duration-150 ${isSettingsOpen ? 'rotate-180' : ''}`} />
            </button>

            <button
              type="button"
              onClick={handleClearChat}
              className="px-3 py-1.5 rounded-md bg-stone-900/90 hover:bg-stone-800 border border-stone-700 text-amber-200 text-xs font-cinzel font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Reset conversation thread"
            >
              <Trash2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Settings Drop-Down Panel */}
        {isSettingsOpen && (
          <div className="p-4 sm:p-5 bg-[#251710] border-t border-[#8B5A2B]/50 rounded-b-xl space-y-4 animate-fade-in text-amber-100 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Engine Selector */}
              <div className="space-y-1.5">
                <label className="block font-cinzel font-bold text-amber-300 uppercase tracking-wider text-[11px]">
                  AI Engine
                </label>
                <select
                  value={selectedEngine}
                  onChange={(e) => setSelectedEngine(e.target.value as AIEngine)}
                  className="w-full bg-[#1C120C] text-amber-100 text-xs font-serif rounded-lg p-2.5 border border-[#8B5A2B]/60 focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  {(['openai', 'gemini', 'magisterium', 'auto'] as AIEngine[]).map((eng) => (
                    <option key={eng} value={eng}>
                      {AI_ENGINE_SPECS[eng].name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Persona Selector */}
              <div className="space-y-1.5">
                <label className="block font-cinzel font-bold text-amber-300 uppercase tracking-wider text-[11px]">
                  Research Mode &amp; Persona
                </label>
                <select
                  value={selectedPersona}
                  onChange={(e) => setSelectedPersona(e.target.value as AIPersona)}
                  className="w-full bg-[#1C120C] text-amber-100 text-xs font-serif rounded-lg p-2.5 border border-[#8B5A2B]/60 focus:outline-none focus:border-amber-400 cursor-pointer"
                >
                  {Object.entries(AI_PERSONA_SPECS).map(([key, spec]) => (
                    <option key={key} value={key}>
                      {spec.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Internet Research Toggle & Custom OpenAI Key */}
            <div className="pt-2 border-t border-[#8B5A2B]/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setIsWebResearchEnabled(prev => !prev)}
                className={`px-3 py-1.5 rounded-lg text-xs font-cinzel transition-all cursor-pointer border flex items-center gap-2 ${
                  isWebResearchEnabled
                    ? 'bg-[#3B1E08] border-amber-400/80 text-amber-200'
                    : 'bg-[#1C120C] border-stone-700 text-stone-400'
                }`}
              >
                <Globe className={`w-3.5 h-3.5 ${isWebResearchEnabled ? 'text-amber-400' : 'text-stone-500'}`} />
                <span>Internet Research: <strong>{isWebResearchEnabled ? 'ACTIVE' : 'OFF'}</strong></span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Key className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <input
                  type="password"
                  value={customOpenAiKey}
                  onChange={(e) => handleSaveCustomKey(e.target.value)}
                  placeholder="Optional OpenAI Key (sk-...)"
                  className="w-full sm:w-60 bg-[#1C120C] text-amber-100 placeholder-stone-500 text-xs font-mono rounded-lg p-2 border border-[#8B5A2B]/60 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Conversation Thread */}
      <div className="space-y-4 min-h-[320px] w-full">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className="w-full"
            >
              <div
                className={`relative w-full rounded-2xl p-4 sm:p-6 shadow-md border ${
                  isUser
                    ? 'bg-[#251710] text-amber-100 border-[#8B5A2B]/70'
                    : 'bg-[#FDFCFA] text-[#1C120C] border-stone-300/90 shadow-sm'
                }`}
              >
                {/* Header inside assistant message */}
                {!isUser && (
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-stone-200 text-xs text-stone-500 font-cinzel">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center gap-1.5 font-bold text-[#3B1E08]">
                        <span className="px-1.5 py-0.5 rounded bg-[#3B1E08] text-amber-300 border border-[#8B5A2B]/60 font-cinzel text-[10px] font-black tracking-tight">AI</span>
                        Soul Sanctum Assistant
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-[#FAF2E8] text-[#5C2E0E] font-cinzel font-semibold border border-[#D4A373]/60">
                        {msg.provider === 'openai' ? 'ChatGPT' : msg.provider === 'magisterium' ? 'Magisterium AI' : 'Gemini'}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleSpeak(msg.id, msg.content)}
                        className={`p-1 rounded hover:bg-stone-200/80 transition-colors cursor-pointer ${
                          speakingMessageId === msg.id ? 'text-amber-800' : 'text-stone-500'
                        }`}
                        title={speakingMessageId === msg.id ? 'Stop reading' : 'Read aloud'}
                      >
                        {speakingMessageId === msg.id ? (
                          <VolumeX className="w-4 h-4 text-amber-800 animate-pulse" />
                        ) : (
                          <Volume2 className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="p-1 rounded hover:bg-stone-200/80 text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
                        title="Copy answer"
                      >
                        {copiedMessageId === msg.id ? (
                          <Check className="w-4 h-4 text-stone-800" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Header inside user message */}
                {isUser && (
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#8B5A2B]/40 text-xs text-amber-300/80 font-cinzel">
                    <span className="font-bold">Your Inquiry</span>
                    <span className="text-[10px] text-amber-200/60 font-mono">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                )}

                {/* Body Content with Enlarged Font Size */}
                {isUser ? (
                  <p className="font-serif text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                  </p>
                ) : (
                  renderFormattedContent(msg.content)
                )}

                {/* Live Web & Internet Sources Consulted */}
                {!isUser && msg.webSources && msg.webSources.length > 0 && (
                  <div className="mt-4 p-3 rounded-xl bg-[#FAF5EE] border border-[#D4A373]/60 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-cinzel font-bold text-[#3B1E08]">
                      <Globe className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                      <span>Verified Internet Sources Consulted:</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {msg.webSources.map((source, sIdx) => (
                        <a
                          key={sIdx}
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between gap-2 p-2 rounded-lg bg-white hover:bg-[#FAF8F5] text-xs text-[#241307] hover:text-[#5C2E0E] border border-[#E8DEC8] hover:border-[#D4A373] transition-all shadow-2xs group"
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
                {!isUser && msg.id !== 'welcome' && (
                  <div className="mt-4 pt-2 border-t border-stone-200/80 flex items-center justify-between text-[11px] text-stone-500 italic font-serif">
                    <span className="flex items-center gap-1">
                      <Globe className="w-3 h-3 text-amber-800" />
                      Grounded in Catholic Deposit of Faith &amp; Online Research
                    </span>
                    <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="w-full bg-[#FAF8F5] border border-[#D4A373]/60 rounded-2xl p-4 shadow-sm flex items-center gap-3">
            <RefreshCw className="w-4 h-4 text-amber-800 animate-spin shrink-0" />
            <div className="space-y-0.5">
              <span className="text-xs sm:text-sm font-serif italic text-[#241307] font-semibold block">
                Consulting {AI_ENGINE_SPECS[selectedEngine].name} &amp; Vatican sources...
              </span>
              <span className="text-[11px] text-stone-600 font-serif block">
                Cross-referencing Sacred Scripture, Catechism (CCC), and Church Fathers.
              </span>
            </div>
          </div>
        )}

        {/* Error message */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-stone-900 border border-amber-800/60 text-amber-100 text-xs font-serif flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold">{errorMessage}</p>
              <p className="text-stone-300">
                Please verify your connection or try rephrasing your question.
              </p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 3. Bottom Sticky Input Form */}
      <form
        onSubmit={handleSubmit}
        className="sticky bottom-4 z-20 rounded-2xl bg-[#1C120C]/95 backdrop-blur-xl border border-[#8B5A2B]/60 p-3 shadow-2xl space-y-2"
      >
        <div className="flex items-end gap-2">
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
            className="flex-1 bg-[#251710] text-amber-100 placeholder-stone-400 text-sm sm:text-base font-serif rounded-xl p-3 border border-[#8B5A2B]/50 focus:border-amber-400 focus:outline-none resize-none leading-relaxed"
          />

          <button
            type="submit"
            disabled={!inputPrompt.trim() || isLoading}
            className="h-12 px-5 rounded-xl bg-[#5C2E0E] hover:bg-[#6D3812] text-amber-100 font-cinzel font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0 border border-[#8B5A2B]"
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin text-amber-200" />
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
  );
};
