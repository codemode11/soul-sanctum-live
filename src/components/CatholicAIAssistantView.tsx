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
  ShieldCheck, 
  Scroll, 
  HelpCircle,
  RefreshCw,
  Search,
  ExternalLink,
  ChevronRight,
  Bookmark
} from 'lucide-react';
import { 
  BetterScrollIcon, 
  SaintWithHaloIcon, 
  DoveWithHaloIcon,
  BibleStudyHighlightedIcon,
  MaryAndBlessedSacramentIcon
} from './SanctumIcons';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

const SUGGESTED_QUESTIONS = [
  {
    category: 'The Holy Eucharist & Sacraments',
    icon: '🥖',
    questions: [
      'What is the Catholic doctrine of Transubstantiation in the Holy Eucharist (CCC 1374-1377)?',
      'What are the essential conditions for making a worthy and valid Confession (CCC 1450-1460)?',
      'Why is the Holy Sacrifice of the Mass considered the source and summit of Christian life?'
    ]
  },
  {
    category: 'Sacred Scripture & Church Fathers',
    icon: '📜',
    questions: [
      'How did early Church Fathers (St. Ignatius of Antioch, St. Justin Martyr) understand the Eucharist?',
      'What does Jesus mean by "Upon this rock I will build my Church" in Matthew 16:18?',
      'How does the Catholic Church interpret John 6:51-56 regarding the Bread of Life discourse?'
    ]
  },
  {
    category: 'The Blessed Virgin Mary',
    icon: '👑',
    questions: [
      'What is the theological difference between the Immaculate Conception and the Virgin Birth?',
      'Why do Catholics venerate Mary (hyperdulia) and ask for her heavenly intercession (CCC 963-975)?',
      'What are the four Marian dogmas solemnly defined by the Catholic Church?'
    ]
  },
  {
    category: 'Catholic Apologetics & Doctrine',
    icon: '🏛️',
    questions: [
      'What is the Catholic doctrine of Purgatory and its scriptural basis in 2 Maccabees and 1 Corinthians 3?',
      'How does the Catholic Church reconcile Faith and Good Works (James 2:24 vs Romans 3:28)?',
      'What is the difference between de fide dogmas, definitive doctrines, and pious theological opinions?'
    ]
  }
];

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
1. **Contrition (Sorrow for Sins)**: Interior grief and abhorrence for sins committed, coupled with the firm resolution not to sin again. Perfect contrition arises from love of God; imperfect contrition (attrition) arises from consideration of sin's ugliness or fear of eternal damnation (*CCC 1451-1453*).
2. **Confession of Sins**: Accusing oneself of all mortal sins remembered after a diligent examination of conscience, in kind and number (*CCC 1456*).
3. **Satisfaction (Penance)**: Performing the penance assigned by the priest to repair the spiritual harm and disorder caused by sin (*CCC 1459*).

**2. Scriptural Commission of Confession**
* **John 20:22-23**: Jesus breathed on the Apostles and said: *"Receive the Holy Spirit. If you forgive the sins of any, they are forgiven; if you retain the sins of any, they are retained."*
* **James 5:16**: *"Confess your sins to one another, and pray for one another, that you may be healed."*

**3. The Seal of the Confessional (CCC 1467)**
The sacramental seal is inviolable. Every priest who hears confessions is bound under severe penalties of excommunication never to reveal what a penitent has made known to him.`,

  immaculate_conception: `### The Immaculate Conception vs. The Virgin Birth

A frequent misunderstanding confuses the **Immaculate Conception** with the **Virgin Birth**:

**1. The Immaculate Conception (Solemn Dogma Defined by Pope Bl. Pius IX in 1854, *Ineffabilis Deus*)**
* **Who it concerns**: The Blessed Virgin Mary herself from the moment of her conception in the womb of her mother, St. Anne (*CCC 490-493*).
* **The Doctrine**: By a unique grace and privilege granted by Almighty God, in view of the foreseen merits of Jesus Christ the Savior, Mary was preserved exempt from all stain of Original Sin.
* **Scriptural Roots**: St. Luke 1:28, where Archangel Gabriel greets Mary as *Kecharitomene* ("Full of Grace").
* **Patristic Witness**: St. Ephrem the Syrian (c. 370 AD): *"Thou alone and thy Mother are in every respect more beautiful than all other beings; for in thee, my Lord, there is no spot, nor in thy mother is any stain."*

**2. The Virgin Birth of Jesus Christ**
* **Who it concerns**: Our Lord Jesus Christ born of Mary without an earthly biological father (*CCC 496-507*).
* **The Doctrine**: Jesus was conceived in the womb of the Virgin Mary by the power of the Holy Spirit without human seed (Isaiah 7:14; Matthew 1:18-25; Luke 1:34-35). Mary remained ever-virgin (*Semper Virgo*): before, during, and perpetually after the birth of Christ.`
};

export const CatholicAIAssistantView: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    return [
      {
        id: 'welcome',
        role: 'assistant',
        content: `**Laudetur Jesus Christus!** Welcome to the **Soul Sanctum Catholic Assistant**.

I am your theological research companion, grounded in:
* **The Magisterium of the Catholic Church**
* **The Catechism of the Catholic Church (CCC)**
* **Sacred Scripture** (NABRE, Douay-Rheims, RSV-CE)
* **The Church Fathers and Doctors of the Church** (St. Thomas Aquinas, St. Augustine, St. John Chrysostom, St. Irenaeus)
* **The 21 Ecumenical Councils** (Nicaea to Vatican II)

Feel free to ask any question on Catholic dogma, Scripture passages, moral theology, the Sacraments, the lives of the saints, or apologetics. You may also select any of the suggested topics below.`,
        timestamp: Date.now()
      }
    ];
  });

  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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
    // Clean markdown before speaking
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
        timestamp: Date.now()
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
      // Prepare history excluding welcome message
      const historyPayload = messages
        .filter(m => m.id !== 'welcome')
        .map(m => ({ role: m.role, content: m.content }));

      const response = await fetch('/api/catholic-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToSend,
          history: historyPayload
        })
      });

      if (!response.ok) {
        // Check for offline fallback if query matches known themes
        const lower = promptToSend.toLowerCase();
        let fallbackReply = '';
        if (lower.includes('transubstantiation') || lower.includes('real presence') || lower.includes('eucharist') || lower.includes('john 6')) {
          fallbackReply = OFFLINE_THEOLOGICAL_KNOWLEDGE.transubstantiation;
        } else if (lower.includes('confession') || lower.includes('penance') || lower.includes('reconciliation') || lower.includes('absolution')) {
          fallbackReply = OFFLINE_THEOLOGICAL_KNOWLEDGE.confession;
        } else if (lower.includes('immaculate conception') || lower.includes('virgin birth') || lower.includes('mary')) {
          fallbackReply = OFFLINE_THEOLOGICAL_KNOWLEDGE.immaculate_conception;
        }

        if (fallbackReply) {
          const assistantMsg: ChatMessage = {
            id: `assistant-${Date.now()}`,
            role: 'assistant',
            content: fallbackReply,
            timestamp: Date.now()
          };
          setMessages(prev => [...prev, assistantMsg]);
          setIsLoading(false);
          return;
        }

        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with status ${response.status}`);
      }

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'No response returned from Catholic Assistant.',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Error contacting Catholic AI:', err);
      // Check offline fallback for the prompt
      const lower = promptToSend.toLowerCase();
      let fallbackReply = '';
      if (lower.includes('transubstantiation') || lower.includes('real presence') || lower.includes('eucharist') || lower.includes('bread of life')) {
        fallbackReply = OFFLINE_THEOLOGICAL_KNOWLEDGE.transubstantiation;
      } else if (lower.includes('confession') || lower.includes('penance') || lower.includes('reconciliation')) {
        fallbackReply = OFFLINE_THEOLOGICAL_KNOWLEDGE.confession;
      } else if (lower.includes('immaculate conception') || lower.includes('virgin birth')) {
        fallbackReply = OFFLINE_THEOLOGICAL_KNOWLEDGE.immaculate_conception;
      }

      if (fallbackReply) {
        const assistantMsg: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: fallbackReply,
          timestamp: Date.now()
        };
        setMessages(prev => [...prev, assistantMsg]);
      } else {
        setErrorMessage(
          err.message || 'Unable to connect to the theological assistant. Please verify your connection or try another question.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Helper to format response markdown with sacred typography
  const renderFormattedContent = (content: string) => {
    // Split by lines and render headings, quotes, bold tags, and CCC references
    const lines = content.split('\n');

    return (
      <div className="space-y-3 leading-relaxed text-stone-800 text-sm sm:text-base font-serif">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) {
            return <div key={idx} className="h-1.5" />;
          }

          // Headers
          if (trimmed.startsWith('### ')) {
            return (
              <h3 key={idx} className="font-cinzel text-base sm:text-lg font-bold text-amber-950 pt-2 pb-1 border-b border-amber-200/70 flex items-center gap-2">
                <BetterScrollIcon className="w-4 h-4 text-amber-700 shrink-0" />
                <span>{trimmed.replace('### ', '')}</span>
              </h3>
            );
          }
          if (trimmed.startsWith('## ')) {
            return (
              <h2 key={idx} className="font-cinzel text-lg sm:text-xl font-bold text-amber-950 pt-3 pb-1 border-b border-amber-300 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0" />
                <span>{trimmed.replace('## ', '')}</span>
              </h2>
            );
          }

          // Blockquote (Scripture / Fathers / CCC quotes)
          if (trimmed.startsWith('> ')) {
            return (
              <blockquote key={idx} className="my-2 pl-4 pr-3 py-2 border-l-4 border-amber-600 bg-amber-50/80 rounded-r-lg italic text-amber-950 text-sm sm:text-base">
                {trimmed.replace('> ', '')}
              </blockquote>
            );
          }

          // Bullet list items
          if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
            const itemText = trimmed.substring(2);
            return (
              <div key={idx} className="flex items-start gap-2 pl-2">
                <span className="text-amber-700 text-xs mt-1.5 font-bold shrink-0">❖</span>
                <span className="flex-1">{parseInlineStyles(itemText)}</span>
              </div>
            );
          }

          // Numbered list items
          const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
          if (numMatch) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-2">
                <span className="font-cinzel font-bold text-amber-800 text-xs sm:text-sm mt-0.5 shrink-0 bg-amber-100/90 rounded px-1.5 border border-amber-300/60">
                  {numMatch[1]}
                </span>
                <span className="flex-1">{parseInlineStyles(numMatch[2])}</span>
              </div>
            );
          }

          // Standard paragraph
          return (
            <p key={idx} className="text-stone-800">
              {parseInlineStyles(trimmed)}
            </p>
          );
        })}
      </div>
    );
  };

  const parseInlineStyles = (text: string) => {
    // Highlight CCC citations like CCC 1374
    const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|CCC\s+\d+(?:[-–]\d+)?)/g);

    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={i} className="font-semibold text-stone-950 font-serif">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <em key={i} className="italic text-stone-900">
            {part.slice(1, -1)}
          </em>
        );
      }
      if (/^CCC\s+\d+(?:[-–]\d+)?$/i.test(part)) {
        return (
          <span
            key={i}
            className="inline-flex items-center gap-0.5 px-1.5 py-0.2 mx-0.5 rounded bg-amber-100 text-amber-900 font-cinzel font-bold text-xs border border-amber-300 shadow-2xs"
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
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* 1. Header Hero Card with Sacred Missal Aesthetics */}
      <div className="relative rounded-2xl bg-gradient-to-br from-[#1C120C] via-[#2A1810] to-[#170E08] border border-amber-500/40 p-5 sm:p-7 text-amber-100 shadow-xl overflow-hidden">
        {/* Subtle decorative sacred halos */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 rounded-full bg-amber-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-300 shadow-md">
                <Sparkles className="w-5 h-5 text-amber-300" />
              </div>
              <h1 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-bold tracking-wide text-amber-200 drop-shadow-sm">
                SOUL SANCTUM CATHOLIC ASSISTANT
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl font-serif">
              An authoritative Catholic research companion grounded in Sacred Scripture, Sacred Tradition, the Catechism of the Catholic Church (CCC), the Church Fathers, and Ecumenical Councils.
            </p>

            {/* Badges of Grounding */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1 text-[11px] font-cinzel">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-900/60 border border-amber-500/50 text-amber-200">
                Catechism (CCC)
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-900/60 border border-amber-500/50 text-amber-200">
                Douay-Rheims & NABRE
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-900/60 border border-amber-500/50 text-amber-200">
                Patristic Writings
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-900/60 border border-amber-500/50 text-amber-200">
                21 Ecumenical Councils
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center shrink-0">
            <button
              onClick={handleClearChat}
              className="px-3 py-1.5 rounded-lg bg-stone-900/90 hover:bg-stone-800 border border-amber-500/30 text-amber-200 hover:text-white text-xs font-cinzel font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
              title="Reset conversation"
            >
              <Trash2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Reset Chat</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Suggested Topic Grid (Accordions or Compact Chips) */}
      <div className="rounded-xl bg-stone-900/80 backdrop-blur-md border border-amber-500/30 p-4 space-y-3 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-300 font-cinzel text-xs sm:text-sm font-bold uppercase tracking-wider">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Suggested Theological Inquiries</span>
          </div>
          <span className="text-[11px] text-stone-400 italic">Click any question to ask immediately</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 pt-1">
          {SUGGESTED_QUESTIONS.map((cat, catIdx) => (
            <div key={catIdx} className="p-3 rounded-lg bg-stone-950/70 border border-amber-900/50 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-cinzel font-semibold text-amber-300">
                <span>{cat.icon}</span>
                <span>{cat.category}</span>
              </div>
              <div className="space-y-1.5">
                {cat.questions.map((q, qIdx) => (
                  <button
                    key={qIdx}
                    onClick={() => handleSubmit(undefined, q)}
                    disabled={isLoading}
                    className="w-full text-left text-xs text-stone-300 hover:text-amber-200 hover:bg-amber-950/40 p-1.5 rounded transition-colors flex items-start gap-1.5 group cursor-pointer disabled:opacity-50"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-amber-500/70 group-hover:text-amber-300 shrink-0 mt-0.5" />
                    <span className="font-serif leading-snug line-clamp-2">{q}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Conversation Thread */}
      <div className="space-y-4 min-h-[300px]">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-700 to-amber-950 border border-amber-400/80 flex items-center justify-center text-amber-100 shadow-md shrink-0 mt-1">
                  <ShieldCheck className="w-5 h-5 text-amber-300" />
                </div>
              )}

              <div
                className={`relative max-w-3xl rounded-2xl p-4 sm:p-5 shadow-md border ${
                  isUser
                    ? 'bg-gradient-to-r from-amber-950 via-[#362013] to-amber-950 text-amber-100 border-amber-600/40 rounded-tr-none'
                    : 'bg-[#FDFCFA] text-stone-900 border-stone-300/80 rounded-tl-none shadow-sm'
                }`}
              >
                {/* Header inside assistant message */}
                {!isUser && (
                  <div className="flex items-center justify-between pb-2 mb-3 border-b border-stone-200 text-xs text-stone-500 font-cinzel">
                    <span className="flex items-center gap-1.5 font-bold text-amber-900">
                      <Sparkles className="w-3.5 h-3.5 text-amber-700" />
                      Soul Sanctum Assistant
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleSpeak(msg.id, msg.content)}
                        className={`p-1 rounded hover:bg-stone-200/80 transition-colors cursor-pointer ${
                          speakingMessageId === msg.id ? 'text-amber-700' : 'text-stone-500'
                        }`}
                        title={speakingMessageId === msg.id ? 'Stop reading' : 'Read aloud'}
                      >
                        {speakingMessageId === msg.id ? (
                          <VolumeX className="w-4 h-4 text-amber-700 animate-pulse" />
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
                          <Check className="w-4 h-4 text-green-700" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Body Content */}
                {isUser ? (
                  <p className="font-serif text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                  </p>
                ) : (
                  renderFormattedContent(msg.content)
                )}

                {/* Footer source note on assistant messages */}
                {!isUser && msg.id !== 'welcome' && (
                  <div className="mt-4 pt-2 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-stone-400 italic font-serif">
                    <span>Grounded in Catholic Magisterium & Tradition</span>
                    <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                )}
              </div>

              {isUser && (
                <div className="w-9 h-9 rounded-full bg-stone-800 border border-stone-600 flex items-center justify-center text-amber-200 shadow-md shrink-0 mt-1">
                  <span className="font-cinzel text-xs font-bold">YOU</span>
                </div>
              )}
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start gap-3 justify-start">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-700 to-amber-950 border border-amber-400/80 flex items-center justify-center text-amber-100 shadow-md shrink-0 animate-pulse">
              <ShieldCheck className="w-5 h-5 text-amber-300" />
            </div>
            <div className="bg-[#FAF8F5] border border-amber-200/80 rounded-2xl rounded-tl-none p-4 shadow-sm flex items-center gap-3">
              <RefreshCw className="w-4 h-4 text-amber-700 animate-spin" />
              <span className="text-xs sm:text-sm font-serif italic text-stone-700">
                Searching Sacred Scripture, the Catechism, and Church Fathers...
              </span>
            </div>
          </div>
        )}

        {/* Error message */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-xs font-serif flex items-start gap-2.5">
            <HelpCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold">{errorMessage}</p>
              <p className="text-red-300/80">
                You can try asking another question or click any of the suggested topics above for instant doctrinal answers.
              </p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 4. Bottom Sticky Input Form */}
      <form
        onSubmit={handleSubmit}
        className="sticky bottom-4 z-20 rounded-2xl bg-stone-950/95 backdrop-blur-xl border border-amber-500/40 p-3 shadow-2xl space-y-2"
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
            placeholder="Ask a question on Sacred Scripture, Catholic doctrine, Church history, or the Catechism..."
            rows={2}
            className="flex-1 bg-stone-900 text-amber-100 placeholder-stone-400 text-sm font-serif rounded-xl p-3 border border-stone-700 focus:border-amber-400 focus:outline-none resize-none leading-relaxed"
          />

          <button
            type="submit"
            disabled={!inputPrompt.trim() || isLoading}
            className="h-12 px-5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-cinzel font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
          >
            {isLoading ? (
              <RefreshCw className="w-4 h-4 animate-spin text-stone-950" />
            ) : (
              <>
                <span>Ask</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>

        <div className="flex items-center justify-between text-[11px] text-stone-400 px-1">
          <span>Press Enter to send (Shift + Enter for new line)</span>
          <span className="italic text-amber-400/80">Soul Sanctum Catholic AI</span>
        </div>
      </form>
    </div>
  );
};
