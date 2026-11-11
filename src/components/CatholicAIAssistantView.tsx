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
  Bookmark,
  Globe
} from 'lucide-react';
import { WebResearchSource } from '../utils/catholicInternetResearch';
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
  webSources?: WebResearchSource[];
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

  mass_source_summit: `### The Holy Sacrifice of the Mass: Source and Summit of the Christian Life

**1. The Centrality of the Eucharistic Liturgy (CCC 1324)**
> "The Eucharist is 'the source and summit of the Christian life.' The other sacraments, and indeed all ecclesiastical ministries and works of the apostolate, are bound up with the Eucharist and are oriented toward it." (Vatican II, *Lumen Gentium 11*).

**2. Re-presentation of the One Sacrifice of Calvary (CCC 1366–1368)**
The Mass is not a repeat or re-crucifixion of Christ; it is the sacramental re-presentation of the single, once-for-all sacrifice of Jesus Christ on the Cross. The victim is the same, and the priest offering it is Christ Himself acting through the ordained minister (*in persona Christi Capitis*).

**3. Spiritual Fruits of Participation**
* Deepens intimate communion with the Holy Trinity and the Mystical Body of Christ.
* Wipes away venial sins and strengthens the soul against mortal sin (*CCC 1393–1395*).
* Anticipates the heavenly banquet and the eternal wedding feast of the Lamb (Revelation 19:9).`,

  church_fathers_eucharist: `### Early Church Fathers on the Real Presence of Christ

From the apostolic era, the early Church Fathers unanimously confessed the Real Presence of Christ in the Eucharist:

**1. St. Ignatius of Antioch (c. 110 AD - Disciple of St. John the Apostle)**
> "They abstain from the Eucharist and from prayer, because they confess not the Eucharist to be the flesh of our Savior Jesus Christ, which suffered for our sins, and which the Father, of His goodness, raised up again." (*Letter to the Smyrnaeans 7:1*)

**2. St. Justin Martyr (c. 150 AD - Roman Philosopher & Martyr)**
> "We do not receive these as common bread and common drink; but in like manner as Jesus Christ our Savior, having been made flesh by the Word of God, had both flesh and blood for our salvation, so likewise have we been taught that the food which is blessed by the prayer of His word... is the flesh and blood of that Jesus who was made flesh." (*First Apology 66*)

**3. St. Irenaeus of Lyons (c. 180 AD - Disciple of St. Polycarp)**
> "When the mixed cup and the baked bread receives the Word of God, it becomes the Eucharist, the blood and body of Christ." (*Against Heresies 5.2.3*)`,

  peter_rock: `### "Upon This Rock I Will Build My Church" (Matthew 16:18)

**1. The Primacy of Peter (Petrine Office)**
In Matthew 16:18, Jesus says to Simon: *"And I tell you, you are Peter [Petros], and on this rock [petra] I will build my church, and the gates of hell shall not prevail against it."*

**2. The Keys of the Kingdom and Isaiah 22 (CCC 552–553)**
* Christ gives Peter the **"keys of the kingdom of heaven"** with the authority to bind and loose.
* In the Davidic Kingdom (Isaiah 22:15-22), the King entrusted the keys of the house of David to the royal prime minister (*al-habbayit*), who governed with the King's authority when the King was away.
* Christ, the true Son of David and King of Kings, appoints Peter as the visible head and chief steward of His Church on earth.

**3. Catholic Dogma (First Vatican Council, 1870, *Pastor Aeternus*)**
The successor of Peter—the Bishop of Rome (the Pope)—possesses supreme, full, immediate, and universal pastoral authority over the entire Catholic Church.`,

  bread_of_life: `### The Bread of Life Discourse (John 6:51–56)

**1. The Literal and Eucharistic Reality**
In the synagogue at Capernaum, Jesus declares:
> "I am the living bread that came down from heaven. If anyone eats of this bread, he will live forever. And the bread that I will give for the life of the world is my flesh." (John 6:51)

**2. The Greek Term *Trogein* (Gnawing/Chewing)**
* When the Jewish listeners objected (*"How can this man give us his flesh to eat?"*), Jesus did not soften His words or claim it was merely a metaphor.
* Instead, He intensified His language, shifting from *phagein* (to eat) to the realistic verb *trogein* (to chew, gnaw, consume): *"Truly, truly, I say to you, unless you eat the flesh of the Son of man and drink his blood, you have no life in you."* (John 6:53).

**3. Faithfulness in the Face of Desertion (John 6:66–68)**
Many disciples walked away saying, *"This is a hard saying; who can listen to it?"* Jesus turned to the Twelve and asked, *"Do you also wish to go away?"* Simon Peter answered: *"Lord, to whom shall we go? You have the words of eternal life."*`,

  immaculate_conception: `### The Immaculate Conception vs. The Virgin Birth

A frequent misunderstanding confuses the **Immaculate Conception** with the **Virgin Birth**:

**1. The Immaculate Conception (Solemn Dogma Defined by Pope Bl. Pius IX in 1854, *Ineffabilis Deus*)**
* **Who it concerns**: The Blessed Virgin Mary herself from the moment of her conception in the womb of her mother, St. Anne (*CCC 490-493*).
* **The Doctrine**: By a unique grace and privilege granted by Almighty God, in view of the foreseen merits of Jesus Christ the Savior, Mary was preserved exempt from all stain of Original Sin.
* **Scriptural Roots**: St. Luke 1:28, where Archangel Gabriel greets Mary as *Kecharitomene* ("Full of Grace").
* **Patristic Witness**: St. Ephrem the Syrian (c. 370 AD): *"Thou alone and thy Mother are in every respect more beautiful than all other beings; for in thee, my Lord, there is no spot, nor in thy mother is any stain."*

**2. The Virgin Birth of Jesus Christ**
* **Who it concerns**: Our Lord Jesus Christ born of Mary without an earthly biological father (*CCC 496-507*).
* **The Doctrine**: Jesus was conceived in the womb of the Virgin Mary by the power of the Holy Spirit without human seed (Isaiah 7:14; Matthew 1:18-25; Luke 1:34-35). Mary remained ever-virgin (*Semper Virgo*): before, during, and perpetually after the birth of Christ.`,

  marian_veneration: `### Catholic Veneration of the Blessed Virgin Mary (Hyperdulia)

**1. Distinction of Honors in Catholic Theology (CCC 971, 2132)**
* **Latria (Adoration)**: Offered to God alone—Father, Son, and Holy Spirit. Catholics never worship or adore Mary or any saint.
* **Dulia (Veneration)**: The honor and reverence paid to the holy angels and saints.
* **Hyperdulia (Highest Veneration)**: A unique, preeminent veneration reserved exclusively for the Blessed Virgin Mary because of her role as the Mother of God (*Theotokos*).

**2. Scripture: "All Generations Shall Call Me Blessed" (Luke 1:48)**
When Elizabeth was filled with the Holy Spirit, she exclaimed: *"Blessed are you among women, and blessed is the fruit of your womb! And why is this granted me, that the mother of my Lord should come to me?"* (Luke 1:42-43). Mary prophesied under divine inspiration: *"Henceforth all generations will call me blessed."*

**3. Intercession at the Wedding at Cana (John 2:1–11)**
Jesus performed His first public miracle at the maternal request of Mary (*"They have no wine... Do whatever he tells you"*). As Queen Mother (*Gebirah*) in Christ's Davidic Kingdom, she intercedes on behalf of all believers.`,

  marian_dogmas: `### The Four Defined Marian Dogmas

The Catholic Church has solemnly defined four *De Fide* dogmas concerning the Blessed Virgin Mary:

**1. Divine Motherhood (Theotokos)**
* **Defined**: Council of Ephesus (431 AD).
* **Teaching**: Mary is truly the Mother of God because Jesus Christ, whom she conceived by the Holy Spirit, is true God and true Man in one divine Person (*CCC 495*).

**2. Perpetual Virginity (Semper Virgo)**
* **Defined**: Council of Constantinople II (553 AD) & Lateran Synod (649 AD).
* **Teaching**: Mary was a virgin before, during, and perpetually after the birth of Jesus Christ (*CCC 499–501*).

**3. Immaculate Conception**
* **Defined**: Pope Bl. Pius IX in 1854 (*Ineffabilis Deus*).
* **Teaching**: From the first instant of her conception, Mary was preserved immune from all stain of Original Sin by a singular grace of God in view of Christ's merits (*CCC 491*).

**4. Bodily Assumption into Heaven**
* **Defined**: Pope Pius XII in 1950 (*Munificentissimus Deus*).
* **Teaching**: Having completed the course of her earthly life, Mary was assumed body and soul into heavenly glory and exalted as Queen of the Universe (*CCC 966*).`,

  purgatory: `### The Catholic Doctrine of Purgatory

**1. De Fide Teaching (CCC 1030–1032)**
> "All who die in God's grace and friendship, but still imperfectly purified, are indeed assured of their eternal salvation; but after death they undergo purification, so as to achieve the holiness necessary to enter the joy of heaven."

**2. Scriptural Foundations**
* **2 Maccabees 12:43–46**: Judas Maccabeus sent an expiatory offering to Jerusalem for the sins of the fallen soldiers: *"It is therefore a holy and wholesome thought to pray for the dead, that they may be loosed from sins."*
* **1 Corinthians 3:13–15**: St. Paul explains that each man's work will be tested by fire: *"If any man's work is burned up, he will suffer loss, though he himself will be saved, but only as through fire."*
* **Matthew 12:32**: Jesus speaks of a sin that *"will not be forgiven, either in this age or in the age to come"*, implying forgiveness of certain temporal penalties in the afterlife.

**3. Necessity of Spiritual Purity**
Revelation 21:27 states that *"nothing unclean shall enter"* the New Jerusalem. Purgatory is God's fiery mercy, cleansing the soul of all remnants of self-love and attachments so it can gaze upon God in the Beatific Vision.`,

  faith_works: `### Reconciling Faith and Good Works (Justification)

A common point of confusion is comparing St. Paul (*"justified by faith without works of the law"*, Rom 3:28) with St. James (*"a man is justified by works and not by faith alone"*, Jas 2:24):

**1. The Catholic Teaching (Council of Trent, Session VI, 1547)**
* Initial justification is entirely an unmerited gift of God's grace (*CCC 1989–1992*). No human work—whether circumcision, ritual works of the Mosaic Law, or natural effort—can earn initial salvation.
* However, authentic saving faith is never static; it is **"faith working through love"** (Galatians 5:6).

**2. St. Paul vs. St. James in Context**
* **St. Paul (Romans 3:28)** is refuting Judaizers who insisted that Gentiles must observe the ceremonial works of the Old Mosaic Law (circumcision, dietary laws) to be saved.
* **St. James (James 2:14–26)** is addressing antinomians who believed that mere intellectual agreement without charitable action could save them: *"Even the demons believe—and shudder... As the body apart from the spirit is dead, so faith without works is dead."*

**3. Grace Transforms the Soul (CCC 2008–2010)**
Good works performed in the state of grace do not originate from human pride, but are the fruits of the Holy Spirit living within us. God crowns His own gifts in us.`,

  hierarchy_of_truths: `### The Hierarchy of Catholic Truths and Doctrinal Certainty

Catholic theology distinguishes levels of authority and theological certainty (*CCC 88–90, 851*):

**1. De Fide Dogmas (Solemnly Defined Dogmas)**
* Infallibly defined by an Ecumenical Council (e.g. Nicaea, Trent) or *ex cathedra* by the Pope.
* Examples: The Holy Trinity, the Incarnation, the Real Presence, the Immaculate Conception.
* **Requirement**: Must be believed with divine and Catholic faith. Denying a dogma constitutes formal heresy.

**2. Definitive Catholic Doctrine (De Fide Tenenda)**
* Truths definitively proposed by the Church regarding faith or morals, necessary to faithfully guard the deposit of faith.
* **Requirement**: Requires firm and irrevocable assent.

**3. Authentic Magisterial Teachings (Sententia Communis)**
* Teachings presented by the Pope or the College of Bishops in ordinary papal encyclicals, apostolic exhortations, and catechesis.
* **Requirement**: Requires a "religious submission of intellect and will" (*Obsequium Religiosum*), not cynical skepticism.

**4. Legitimate Theological Opinions**
* Questions not definitively resolved by the Church where faithful Catholic scholars may freely debate (e.g., Thomism vs. Molinism on grace and predestination).

**5. Approved Private Revelations**
* Apparitions such as Fátima or Lourdes judged worthy of belief by the Church. They do not add to public revelation and are never binding on the universal faith of Catholics (*CCC 67*).`
};

function resolveCatholicTheologicalAnswer(prompt: string): string {
  const q = prompt.toLowerCase();
  if (q.includes('purgat') || q.includes('maccabees') || q.includes('dead')) return OFFLINE_THEOLOGICAL_KNOWLEDGE.purgatory;
  if (q.includes('rock') || q.includes('peter') || q.includes('matthew 16') || q.includes('pope') || q.includes('papal')) return OFFLINE_THEOLOGICAL_KNOWLEDGE.peter_rock;
  if (q.includes('faith') && (q.includes('work') || q.includes('james') || q.includes('justif'))) return OFFLINE_THEOLOGICAL_KNOWLEDGE.faith_works;
  if (q.includes('source and summit') || (q.includes('mass') && q.includes('christian life'))) return OFFLINE_THEOLOGICAL_KNOWLEDGE.mass_source_summit;
  if (q.includes('father') && (q.includes('eucharist') || q.includes('ignatius') || q.includes('justin'))) return OFFLINE_THEOLOGICAL_KNOWLEDGE.church_fathers_eucharist;
  if (q.includes('john 6') || q.includes('bread of life') || q.includes('eat my flesh')) return OFFLINE_THEOLOGICAL_KNOWLEDGE.bread_of_life;
  if (q.includes('four marian') || (q.includes('marian') && q.includes('dogma'))) return OFFLINE_THEOLOGICAL_KNOWLEDGE.marian_dogmas;
  if (q.includes('venerat') || q.includes('hyperdulia') || q.includes('intercession')) return OFFLINE_THEOLOGICAL_KNOWLEDGE.marian_veneration;
  if (q.includes('immaculate') || q.includes('virgin birth')) return OFFLINE_THEOLOGICAL_KNOWLEDGE.immaculate_conception;
  if (q.includes('transubstantiation') || q.includes('real presence') || q.includes('eucharist')) return OFFLINE_THEOLOGICAL_KNOWLEDGE.transubstantiation;
  if (q.includes('confess') || q.includes('penance') || q.includes('reconcil') || q.includes('absolution')) return OFFLINE_THEOLOGICAL_KNOWLEDGE.confession;
  if (q.includes('dogma') || q.includes('opinion') || q.includes('magisterium') || q.includes('hierarchy')) return OFFLINE_THEOLOGICAL_KNOWLEDGE.hierarchy_of_truths;

  return `### Catholic Theological Guidance on: ${prompt}

**1. The Deposit of Faith (CCC 84–87)**
Catholic doctrine rests firmly on the unified foundation of **Sacred Scripture**, **Sacred Tradition**, and the **Magisterium** of the Catholic Church.

**2. Foundational Principles**
* **The Catechism of the Catholic Church (CCC)** provides the definitive synthesis of Catholic belief across the Creed, the Sacraments, Moral Life, and Prayer.
* **Sacred Scripture** is interpreted in the living heart of the Church in light of the Church Fathers and the 21 Ecumenical Councils.

**3. Pastoral Recommendation**
For personal spiritual discernment or sacramental guidance on this matter, consult your parish priest or a qualified Catholic spiritual director.`;
}

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
  const [isWebResearchEnabled, setIsWebResearchEnabled] = useState(true);
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
          history: historyPayload,
          enableWebResearch: isWebResearchEnabled
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with status ${response.status}`);
      }

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'No response returned from the Catholic Assistant.',
        timestamp: Date.now(),
        webSources: data.webSources || []
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err: any) {
      console.warn('Issue contacting Catholic AI:', err);
      const matchedCanned = resolveCatholicTheologicalAnswer(promptToSend);
      const isSpecificMatch = !matchedCanned.includes('Catholic Theological Guidance on:');

      if (isSpecificMatch) {
        const assistantMsg: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: matchedCanned,
          timestamp: Date.now()
        };
        setMessages(prev => [...prev, assistantMsg]);
      } else {
        setErrorMessage(
          err.message || 'Unable to complete online research. Please check your connection and try again.'
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
              <span className="px-2.5 py-0.5 rounded-full bg-amber-800/80 border border-amber-400/70 text-amber-100 font-semibold flex items-center gap-1">
                <Globe className="w-3 h-3 text-amber-300" />
                Real-Time Web Research
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

                {/* Live Web & Internet Sources Consulted */}
                {!isUser && msg.webSources && msg.webSources.length > 0 && (
                  <div className="mt-3.5 p-3 rounded-xl bg-amber-50/90 border border-amber-200/90 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-cinzel font-bold text-amber-950">
                      <Globe className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                      <span>Internet Sources Consulted & Verified:</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {msg.webSources.map((source, sIdx) => (
                        <a
                          key={sIdx}
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between gap-2 p-2 rounded-lg bg-white/90 hover:bg-white text-xs text-amber-950 hover:text-amber-800 border border-amber-200/60 hover:border-amber-400 transition-all shadow-2xs group"
                          title={source.snippet}
                        >
                          <span className="font-serif font-medium truncate flex-1">{source.title}</span>
                          <span className="text-[10px] text-amber-700/90 font-mono shrink-0 flex items-center gap-1">
                            <span>{source.domain}</span>
                            <ExternalLink className="w-3 h-3 text-amber-600 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer source note on assistant messages */}
                {!isUser && msg.id !== 'welcome' && (
                  <div className="mt-4 pt-2 border-t border-stone-200/60 flex items-center justify-between text-[11px] text-stone-400 italic font-serif">
                    <span className="flex items-center gap-1">
                      <Globe className="w-3 h-3 text-amber-600" />
                      Grounded in Catholic Magisterium, Scripture & Online Research
                    </span>
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
              <div className="space-y-0.5">
                <span className="text-xs sm:text-sm font-serif italic text-stone-800 font-semibold block">
                  Researching online Catholic sources and Vatican archives...
                </span>
                <span className="text-[11px] text-stone-500 font-serif block">
                  Cross-referencing Sacred Scripture, the Catechism (CCC), and Church Fathers.
                </span>
              </div>
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
                Please verify your connection or try rephrasing your question.
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
            placeholder="Ask any question on Sacred Scripture, Catholic doctrine, Church history, Vatican news, or saints..."
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

        <div className="flex items-center justify-between text-[11px] text-stone-400 px-1 pt-0.5">
          <button
            type="button"
            onClick={() => setIsWebResearchEnabled(prev => !prev)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-cinzel transition-all cursor-pointer border ${
              isWebResearchEnabled
                ? 'bg-amber-950/90 border-amber-400/70 text-amber-200 shadow-2xs ring-1 ring-amber-400/30'
                : 'bg-stone-900 border-stone-700 text-stone-400 hover:text-stone-300'
            }`}
            title="Toggle live online Catholic Internet research"
          >
            <Globe className={`w-3.5 h-3.5 ${isWebResearchEnabled ? 'text-green-400 animate-pulse' : 'text-stone-500'}`} />
            <span>Internet Research: <strong className={isWebResearchEnabled ? 'text-green-400' : 'text-stone-400'}>{isWebResearchEnabled ? 'ACTIVE' : 'OFF'}</strong></span>
          </button>
          <span className="italic text-amber-400/80 hidden sm:inline">Press Enter to send (Shift + Enter for new line)</span>
        </div>
      </form>
    </div>
  );
};
