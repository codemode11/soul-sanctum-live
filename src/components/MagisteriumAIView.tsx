import React, { useState, useRef, useEffect, useMemo } from 'react';
import {
  Send,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Trash2,
  RefreshCw,
  ExternalLink,
  Plus,
  BookOpen,
  PanelLeftOpen,
  PanelLeftClose,
  Search,
  Clock,
  ArrowRight,
  HelpCircle,
  Settings,
  ChevronDown,
  X,
  Download,
  Maximize2,
} from 'lucide-react';
import aiForCatholicsImg from '../assets/images/ai_for_catholics_1795442802534.jpg';
import {
  searchCatholicInternet,
  synthesizeResearchResponse,
} from '../utils/catholicInternetResearch';
import { SacredReader } from '../utils/speech';

export interface MagisterialCitation {
  citedText: string;
  documentTitle: string;
  documentAuthor?: string;
  documentYear?: string;
  documentReference?: string;
  sourceUrl?: string;
}

interface MagisteriumMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  citations?: MagisterialCitation[];
  relatedQuestions?: string[];
  source?: 'magisterium-api' | 'sanctum-magisterial-fallback' | 'client-fallback';
}

interface MagisteriumSession {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: MagisteriumMessage[];
}

type ResearchDomain =
  | 'catechism'
  | 'canon-law'
  | 'councils'
  | 'encyclicals'
  | 'fathers'
  | 'moral-social';

interface DomainPrompt {
  domain: ResearchDomain;
  label: string;
  prompts: string[];
}

const MAGISTERIUM_DOMAINS: DomainPrompt[] = [
  {
    domain: 'catechism',
    label: 'Catechism',
    prompts: [
      'What does the Catechism teach about the Real Presence of Christ in the Eucharist (CCC 1373–1381)?',
      'How does the Catechism distinguish mortal sin from venial sin, and what are the three conditions for mortal sin?',
      'What is the Catholic teaching on Purgatory and prayers for the faithful departed in the Catechism?',
    ],
  },
  {
    domain: 'canon-law',
    label: 'Canon Law',
    prompts: [
      'What does the 1983 Code of Canon Law specify regarding the reception of Holy Communion and the Eucharistic fast?',
      'What are the canonical requirements and responsibilities of godparents at Baptism and sponsors at Confirmation?',
      'How does Canon Law regulate the Seal of Confession (Can. 983–984)?',
    ],
  },
  {
    domain: 'councils',
    label: 'Councils',
    prompts: [
      'How does Vatican II’s Dei Verbum explain the relationship between Sacred Scripture, Sacred Tradition, and the Magisterium?',
      'What did the Council of Trent define concerning justification by grace, faith, and charity?',
      'How did the Councils of Nicaea (325) and Chalcedon (451) define the divinity and two natures of Christ?',
    ],
  },
  {
    domain: 'encyclicals',
    label: 'Encyclicals',
    prompts: [
      'Summarize St. John Paul II’s teaching in Fides et Ratio on the harmony between faith and reason.',
      'What are the central theological themes of Pope Benedict XVI’s encyclical Deus Caritas Est?',
      'How does Pope Leo XIII’s Rerum Novarum establish the foundations of Catholic Social Teaching?',
    ],
  },
  {
    domain: 'fathers',
    label: 'Fathers & Doctors',
    prompts: [
      'How does St. Thomas Aquinas explain transubstantiation in the Summa Theologiae?',
      'What do St. Ignatius of Antioch and St. Justin Martyr testify regarding the Eucharist in the early Church?',
      'How does St. Augustine describe the necessity of sanctifying grace and free will?',
    ],
  },
  {
    domain: 'moral-social',
    label: 'Moral & Social',
    prompts: [
      'Explain the Catholic moral principles of human dignity, solidarity, and subsidiarity.',
      'How does the Church define the formation of a well-formed conscience (CCC 1776–1794)?',
      'What is the Church’s teaching on the theological virtues of faith, hope, and charity?',
    ],
  },
];

const SESSIONS_KEY = 'sanctum_magisterium_ai_sessions_v1';
const ACTIVE_SESSION_KEY = 'sanctum_magisterium_ai_active_v1';

function createFreshSession(): MagisteriumSession {
  const now = Date.now();
  return {
    id: `mag-session-${now}-${Math.random().toString(36).slice(2, 6)}`,
    title: 'New Magisterial Inquiry',
    createdAt: now,
    updatedAt: now,
    messages: [],
  };
}

function loadSessions(): MagisteriumSession[] {
  if (typeof window === 'undefined') return [createFreshSession()];
  try {
    const raw = localStorage.getItem(SESSIONS_KEY);
    if (!raw) return [createFreshSession()];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed.map((session: MagisteriumSession) => ({
        ...session,
        messages: Array.isArray(session.messages)
          ? session.messages.filter((m) => !m?.id?.startsWith('mag-welcome'))
          : [],
      }));
    }
  } catch {
    // ignore corrupted local storage
  }
  return [createFreshSession()];
}

function summarizeTitle(prompt: string): string {
  const cleaned = prompt.replace(/\s+/g, ' ').trim();
  if (cleaned.length <= 58) return cleaned;
  return `${cleaned.slice(0, 55).trim()}…`;
}

interface MagisteriumAIViewProps {
  onOpenCatholicAI?: () => void;
}

export const MagisteriumAIView: React.FC<MagisteriumAIViewProps> = ({
  onOpenCatholicAI,
}) => {
  const [sessions, setSessions] = useState<MagisteriumSession[]>(() => loadSessions());
  const [activeSessionId, setActiveSessionId] = useState<string>(() => {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem(ACTIVE_SESSION_KEY) || '';
  });
  const [selectedDomain, setSelectedDomain] = useState<ResearchDomain>('catechism');
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [historySearch, setHistorySearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [isDomainMenuOpen, setIsDomainMenuOpen] = useState(false);
  const [isBannerLightboxOpen, setIsBannerLightboxOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const domainButtonRef = useRef<HTMLButtonElement>(null);
  const domainPanelRef = useRef<HTMLDivElement>(null);

  const activeSession = useMemo(() => {
    return sessions.find((s) => s.id === activeSessionId) || sessions[0];
  }, [sessions, activeSessionId]);

  const messages = useMemo(
    () => (activeSession?.messages || []).filter((m) => !m.id.startsWith('mag-welcome')),
    [activeSession]
  );
  const hasUserMessages = messages.some((m) => m.role === 'user');

  useEffect(() => {
    if (activeSession && activeSession.id !== activeSessionId) {
      setActiveSessionId(activeSession.id);
    }
  }, [activeSession, activeSessionId]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions.slice(0, 35)));
      if (activeSession?.id) {
        localStorage.setItem(ACTIVE_SESSION_KEY, activeSession.id);
      }
    } catch {
      // storage quota exceeded
    }
  }, [sessions, activeSession?.id]);

  useEffect(() => {
    if (hasUserMessages) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages.length, isLoading, hasUserMessages]);

  useEffect(() => {
    return () => {
      SacredReader.stop();
    };
  }, []);

  useEffect(() => {
    if (!isDomainMenuOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedButton = domainButtonRef.current?.contains(target);
      const clickedPanel = domainPanelRef.current?.contains(target);
      if (!clickedButton && !clickedPanel) {
        setIsDomainMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDomainMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isDomainMenuOpen]);

  useEffect(() => {
    if (!isBannerLightboxOpen) return;
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsBannerLightboxOpen(false);
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isBannerLightboxOpen]);

  const filteredSessions = useMemo(() => {
    const q = historySearch.trim().toLowerCase();
    if (!q) return sessions;
    return sessions.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.messages.some((m) => m.content.toLowerCase().includes(q))
    );
  }, [sessions, historySearch]);

  const activeDomainPrompts = useMemo(() => {
    return MAGISTERIUM_DOMAINS.find((d) => d.domain === selectedDomain)?.prompts || [];
  }, [selectedDomain]);

  const appendMessage = (sessionId: string, msg: MagisteriumMessage, nextTitle?: string) => {
    setSessions((prev) => {
      const updated = prev.map((s) => {
        if (s.id !== sessionId) return s;
        return {
          ...s,
          title: nextTitle || s.title,
          updatedAt: Date.now(),
          messages: [...s.messages, msg],
        };
      });
      return [...updated].sort((a, b) => b.updatedAt - a.updatedAt);
    });
  };

  const handleNewInquiry = () => {
    SacredReader.stop();
    setSpeakingId(null);
    setErrorMessage(null);
    const fresh = createFreshSession();
    setSessions((prev) => [fresh, ...prev]);
    setActiveSessionId(fresh.id);
    setInputPrompt('');
    inputRef.current?.focus();
  };

  const handleDeleteSession = (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();
    setSessions((prev) => {
      const remaining = prev.filter((s) => s.id !== sessionId);
      if (remaining.length === 0) {
        const fresh = createFreshSession();
        setActiveSessionId(fresh.id);
        return [fresh];
      }
      if (activeSession?.id === sessionId) {
        setActiveSessionId(remaining[0].id);
      }
      return remaining;
    });
  };

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2200);
    } catch {
      // clipboard unavailable
    }
  };

  const handleSpeak = (id: string, text: string) => {
    if (speakingId === id) {
      SacredReader.stop();
      setSpeakingId(null);
      return;
    }
    SacredReader.stop();
    const cleanText = text
      .replace(/[*#_`>~]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .replace(/\n\n+/g, '. ');
    setSpeakingId(id);
    SacredReader.speak(cleanText, () => setSpeakingId(null));
  };

  const handleSubmit = async (e?: React.FormEvent, overridePrompt?: string) => {
    if (e) e.preventDefault();
    const promptToSend = (overridePrompt ?? inputPrompt).trim();
    if (!promptToSend || isLoading || !activeSession) return;

    setErrorMessage(null);
    const targetSessionId = activeSession.id;
    const isFirstQuestion = !activeSession.messages.some((m) => m.role === 'user');
    const nextTitle = isFirstQuestion ? summarizeTitle(promptToSend) : activeSession.title;

    const userMessage: MagisteriumMessage = {
      id: `mag-user-${Date.now()}`,
      role: 'user',
      content: promptToSend,
      timestamp: Date.now(),
    };

    appendMessage(targetSessionId, userMessage, nextTitle);
    setInputPrompt('');
    setIsLoading(true);

    try {
      const historyPayload = activeSession.messages
        .filter((m) => !m.id.startsWith('mag-welcome'))
        .slice(-8)
        .map((m) => ({
          role: m.role,
          content: m.content.slice(0, 1200),
        }));

      let responseData: {
        reply?: string;
        citations?: MagisterialCitation[];
        relatedQuestions?: string[];
        source?: 'magisterium-api' | 'sanctum-magisterial-fallback';
      } | null = null;

      try {
        const res = await fetch('/api/magisterium', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          credentials: 'same-origin',
          body: JSON.stringify({
            prompt: promptToSend,
            history: historyPayload,
            returnRelatedQuestions: true,
          }),
        });

        const contentType = res.headers.get('content-type') || '';
        if (res.ok && contentType.includes('application/json')) {
          const parsed = await res.json();
          if (parsed && typeof parsed.reply === 'string' && parsed.reply.trim()) {
            responseData = parsed;
          }
        }
      } catch {
        // Proceed to graceful client fallback
      }

      if (responseData?.reply) {
        const assistantMsg: MagisteriumMessage = {
          id: `mag-assistant-${Date.now()}`,
          role: 'assistant',
          content: responseData.reply,
          timestamp: Date.now(),
          citations: Array.isArray(responseData.citations) ? responseData.citations : [],
          relatedQuestions: Array.isArray(responseData.relatedQuestions)
            ? responseData.relatedQuestions
            : [],
          source: responseData.source || 'magisterium-api',
        };
        appendMessage(targetSessionId, assistantMsg);
        return;
      }

      // Graceful client-side Catholic internet synthesis fallback if offline
      const liveSources = await searchCatholicInternet(promptToSend).catch(() => []);
      const fallbackReply = synthesizeResearchResponse(promptToSend, liveSources);
      const fallbackCitations: MagisterialCitation[] = liveSources.slice(0, 4).map((src) => ({
        documentTitle: src.title,
        documentAuthor: src.domain,
        citedText: src.snippet,
        sourceUrl: src.url,
      }));

      appendMessage(targetSessionId, {
        id: `mag-assistant-${Date.now()}`,
        role: 'assistant',
        content: fallbackReply,
        timestamp: Date.now(),
        citations: fallbackCitations,
        source: 'client-fallback',
      });
    } catch (err: any) {
      setErrorMessage(
        err?.message || 'Unable to complete the Magisterial inquiry right now. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const parseInlineStyles = (text: string) => {
    const parts = text.split(
      /(\*\*[^*]+\*\*|\*[^*]+\*|CCC\s+\d+(?:[-–]\d+)?|Can\.\s*\d+(?:\s*§\d+)?)/g
    );

    return parts.map((part, idx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={idx} className="font-semibold text-stone-950 font-serif">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <em key={idx} className="italic text-stone-800">
            {part.slice(1, -1)}
          </em>
        );
      }
      if (/^(CCC\s+\d+(?:[-–]\d+)?|Can\.\s*\d+(?:\s*§\d+)?)$/i.test(part)) {
        return (
          <span
            key={idx}
            className="font-cinzel font-semibold text-amber-900 underline decoration-amber-700/45 underline-offset-2 mx-0.5"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const renderMarkdownContent = (content: string) => {
    const lines = content.split('\n');
    return (
      <div className="space-y-3.5 leading-relaxed text-stone-900 text-base sm:text-[17.5px] font-serif max-w-[74ch]">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={idx} className="h-1" />;

          if (trimmed.startsWith('### ')) {
            return (
              <h3
                key={idx}
                className="font-cinzel text-base sm:text-lg font-bold text-amber-950 pt-2.5 border-b border-[#E5DEC9] pb-1.5"
              >
                {trimmed.replace(/^###\s+/, '')}
              </h3>
            );
          }

          if (trimmed.startsWith('## ')) {
            return (
              <h2
                key={idx}
                className="font-cinzel text-lg sm:text-xl font-bold text-stone-900 pt-3 border-b border-[#E5DEC9] pb-1.5"
              >
                {trimmed.replace(/^##\s+/, '')}
              </h2>
            );
          }

          if (trimmed.startsWith('>')) {
            return (
              <blockquote
                key={idx}
                className="px-4 py-3.5 my-2.5 bg-[#FAF7F0] border border-[#E6DEC8] italic text-stone-800 rounded-lg font-serif"
              >
                {parseInlineStyles(trimmed.replace(/^>\s*/, ''))}
              </blockquote>
            );
          }

          if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
            return (
              <div key={idx} className="flex items-start gap-2.5 pl-1.5">
                <span className="text-amber-900 font-bold shrink-0">•</span>
                <span className="flex-1 text-stone-900">
                  {parseInlineStyles(trimmed.replace(/^[*|-]\s+/, ''))}
                </span>
              </div>
            );
          }

          const numMatch = trimmed.match(/^(\d+\.)\s+(.*)/);
          if (numMatch) {
            return (
              <div key={idx} className="flex items-start gap-2.5 pl-1.5">
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

  return (
    <div className="space-y-5 w-full pb-12 text-left">
      {/* 1. Archival Editorial Header */}
      <section className="bg-[#1B0F08] rounded-xl border border-[#3D2313] shadow-md relative overflow-hidden">
        {/* Dark brown background gradient container with central image and gradient transition */}
        <div className="pt-5 pb-3 px-4 sm:px-6 bg-gradient-to-r from-[#1B0F08] via-[#2A170D] to-[#1B0F08] flex flex-col items-center">
          <div
            role="button"
            tabIndex={0}
            onClick={() => setIsBannerLightboxOpen(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsBannerLightboxOpen(true);
              }
            }}
            aria-label="View AI for Catholics futuristic artwork full screen"
            className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden border border-amber-500/35 bg-[#0B101B] group cursor-zoom-in shadow-xl"
          >
            <img
              src={aiForCatholicsImg}
              alt="AI for Catholics — Futuristic luminous cathedral sacred artwork"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover block transition-transform duration-500 group-hover:scale-[1.015]"
            />
            {/* Gradient overlay transitioning from dark brown to central image & bottom right text */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B0F08]/85 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 p-4 flex items-end justify-between pointer-events-none">
              <div />
              <span className="font-cinzel text-xs sm:text-sm font-semibold text-amber-200 tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.98)]">
                Ai for Catholics.
              </span>
            </div>
            <span className="absolute bottom-3 left-3 p-2 rounded-lg bg-black/55 backdrop-blur-xs border border-amber-300/35 text-amber-100 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <Maximize2 className="w-4 h-4" />
            </span>
          </div>
        </div>

        <div className="px-5 py-5 sm:px-7 sm:py-6 bg-[#1B0F08] space-y-4 border-t border-[#3D2313]">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-amber-200/80 font-serif flex-wrap">
              <span className="text-amber-400 font-cinzel font-bold">28,000+ Church Documents</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-100/90">Catechism, Canon Law &amp; Ecumenical Councils</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight text-balance">
              Magisterium AI
            </h2>

            <p className="font-serif text-sm sm:text-base text-amber-100/85 max-w-2xl leading-relaxed">
              Consult the authentic teaching authority of the Catholic Church with cited references
              from the Catechism, Code of Canon Law, Councils, Papal Encyclicals, and Doctors of the Church.
            </p>
          </div>

          {/* Primary & Utility Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-[#3D2313]">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleNewInquiry}
                className="px-4 py-2 rounded-lg bg-amber-800 hover:bg-amber-900 text-white font-cinzel font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>New Inquiry</span>
              </button>

              <button
                type="button"
                onClick={() => setIsHistoryOpen((prev) => !prev)}
                className={`px-3.5 py-2 rounded-lg text-xs font-cinzel font-semibold border transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
                  isHistoryOpen
                    ? 'bg-[#EFE8D8] text-amber-950 border-[#D5C7A9]'
                    : 'bg-white hover:bg-stone-50 text-stone-800 border-stone-300'
                }`}
              >
                {isHistoryOpen ? (
                  <PanelLeftClose className="w-3.5 h-3.5 text-amber-800" />
                ) : (
                  <PanelLeftOpen className="w-3.5 h-3.5 text-amber-800" />
                )}
                <span>Past Inquiries ({sessions.length})</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {onOpenCatholicAI && (
                <button
                  type="button"
                  onClick={onOpenCatholicAI}
                  className="px-3.5 py-2 rounded-lg bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 text-xs font-cinzel font-semibold transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-800" />
                  <span>Catholic AI Assistant</span>
                </button>
              )}

              <a
                href="https://www.magisterium.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg bg-white hover:bg-[#F7F2E7] border border-stone-300 text-amber-950 text-xs font-cinzel font-semibold transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
              >
                <span>Open Magisterium.com</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-800" />
              </a>

              {/* Settings Icon + Dropdown Arrow for Consult by Magisterial Domain */}
              <button
                ref={domainButtonRef}
                type="button"
                onClick={() => setIsDomainMenuOpen((prev) => !prev)}
                aria-expanded={isDomainMenuOpen}
                aria-haspopup="true"
                aria-label="Consult by Magisterial Domain"
                title="Consult by Magisterial Domain"
                className={`px-2.5 py-2 rounded-lg border transition-colors cursor-pointer flex items-center gap-1 shrink-0 ${
                  isDomainMenuOpen
                    ? 'bg-[#EFE8D8] text-amber-950 border-amber-700/60 shadow-2xs'
                    : 'bg-white hover:bg-[#F7F2E7] text-stone-800 border-stone-300'
                }`}
              >
                <Settings className="w-4 h-4 text-amber-800" />
                <ChevronDown
                  className={`w-3.5 h-3.5 text-stone-600 transition-transform duration-200 ${
                    isDomainMenuOpen ? 'rotate-180 text-amber-900' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Full-Width Dropdown Panel: Same Width as All Magisterium AI Containers */}
        {isDomainMenuOpen && (
          <div
            ref={domainPanelRef}
            className="absolute left-0 right-0 top-full mt-2 z-40 w-full rounded-xl bg-[#FAF8F3] border border-[#D8CEB8] shadow-xl p-4 sm:p-5 space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 pb-2.5 border-b border-[#E5DEC9]">
              <div className="space-y-0.5">
                <h3 className="font-cinzel text-xs sm:text-sm font-bold text-amber-950">
                  Consult by Magisterial Domain
                </h3>
                <p className="font-serif text-xs text-stone-600">
                  Select a domain to explore curated Catholic inquiries
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsDomainMenuOpen(false)}
                className="p-1 rounded-md text-stone-500 hover:text-stone-900 hover:bg-[#ECE5D5] transition-colors cursor-pointer"
                aria-label="Close Magisterial Domains menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Domain Tabs */}
            <div className="flex flex-wrap items-center gap-1 p-1 rounded-lg bg-[#ECE5D5]">
              {MAGISTERIUM_DOMAINS.map((item) => (
                <button
                  key={item.domain}
                  type="button"
                  onClick={() => setSelectedDomain(item.domain)}
                  className={`px-3 py-1.5 rounded-md text-xs font-cinzel font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    selectedDomain === item.domain
                      ? 'bg-white text-amber-950 shadow-2xs'
                      : 'text-stone-700 hover:text-stone-950'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Domain Prompts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {activeDomainPrompts.map((promptText, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setIsDomainMenuOpen(false);
                    handleSubmit(undefined, promptText);
                  }}
                  disabled={isLoading}
                  className="group text-left p-4 rounded-lg bg-white hover:bg-[#FDFBF7] border border-[#E5DEC9] hover:border-amber-700/60 transition-all cursor-pointer flex flex-col justify-between gap-3 disabled:opacity-50"
                >
                  <span className="font-serif text-sm text-stone-900 leading-relaxed">
                    {promptText}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-cinzel font-semibold text-amber-900 group-hover:translate-x-0.5 transition-transform">
                    <span>Ask Magisterium AI</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* 2. Workspace Layout: Optional Past Inquiries Sidebar + Active Magisterial Research Thread */}
      <div
        className={`grid grid-cols-1 ${
          isHistoryOpen ? 'lg:grid-cols-[260px_1fr]' : 'lg:grid-cols-1'
        } gap-5 items-start`}
      >
        {isHistoryOpen && (
          <aside className="rounded-xl bg-[#FAF8F3] border border-[#E5DEC9] shadow-xs overflow-hidden flex flex-col max-h-[680px] lg:sticky lg:top-4">
            <div className="p-3.5 bg-[#F4EFE4] border-b border-[#E5DEC9] space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="font-cinzel text-xs font-bold text-amber-950">
                  Saved Inquiries
                </span>
                <span className="font-mono text-[11px] text-stone-600 tabular-nums">
                  {sessions.length}
                </span>
              </div>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={historySearch}
                  onChange={(e) => setHistorySearch(e.target.value)}
                  placeholder="Filter inquiries..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white border border-stone-300 text-xs font-serif text-stone-900 placeholder-stone-400 focus:outline-none focus:border-amber-700"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-2.5 space-y-2">
              {filteredSessions.map((session) => {
                const isCurrent = session.id === activeSession?.id;
                const questionCount = session.messages.filter((m) => m.role === 'user').length;
                return (
                  <div
                    key={session.id}
                    onClick={() => {
                      setActiveSessionId(session.id);
                      setErrorMessage(null);
                    }}
                    className={`group p-3 rounded-lg border transition-colors cursor-pointer flex flex-col gap-1.5 ${
                      isCurrent
                        ? 'bg-[#F2EBD9] border-amber-700/60'
                        : 'bg-white hover:bg-[#F7F3E8] border-stone-200/90'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-serif text-xs sm:text-sm font-semibold text-stone-900 leading-snug line-clamp-2">
                        {session.title}
                      </h4>
                      <button
                        type="button"
                        onClick={(e) => handleDeleteSession(e, session.id)}
                        className="p-1 rounded hover:bg-red-100 text-stone-400 hover:text-red-700 transition-colors shrink-0 cursor-pointer"
                        title="Delete inquiry"
                        aria-label="Delete inquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-stone-500 font-mono tabular-nums pt-1 border-t border-stone-200/70">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-800" />
                        {new Date(session.updatedAt).toLocaleDateString([], {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                      <span>
                        {questionCount} {questionCount === 1 ? 'question' : 'questions'}
                      </span>
                    </div>
                  </div>
                );
              })}

              {filteredSessions.length === 0 && (
                <p className="p-5 text-center text-xs font-serif text-stone-500">
                  No saved inquiries match your filter.
                </p>
              )}
            </div>
          </aside>
        )}

        {/* Active Conversation Thread */}
        <div className="space-y-5 min-w-0 w-full">
          {/* Message Stream */}
          {(messages.length > 0 || isLoading || errorMessage) && (
            <div className="space-y-4">
              {messages.map((msg) => {
              const isUser = msg.role === 'user';
              return (
                <article
                  key={msg.id}
                  className={`rounded-xl p-5 sm:p-6 border ${
                    isUser
                      ? 'bg-[#F4EFE4] border-[#DFD5C0] text-stone-900'
                      : 'bg-white border-stone-200/90 shadow-2xs text-stone-900'
                  }`}
                >
                  {isUser ? (
                    <>
                      <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-[#E2D8C3] text-xs font-cinzel text-amber-950">
                        <span className="font-bold">Your Magisterial Inquiry</span>
                        <span className="font-mono text-[11px] text-stone-500 tabular-nums">
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <p className="font-serif text-base sm:text-lg leading-relaxed whitespace-pre-wrap text-stone-900">
                        {msg.content}
                      </p>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between pb-2.5 mb-4 border-b border-stone-200/80 text-xs font-cinzel text-stone-600">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-amber-950">Magisterium AI</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-serif italic text-stone-600">
                            {msg.source === 'magisterium-api'
                              ? 'Official Magisterium AI (magisterium-1)'
                              : 'Magisterial Document Synthesis'}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleSpeak(msg.id, msg.content)}
                            className={`p-1.5 rounded-md hover:bg-stone-100 transition-colors cursor-pointer ${
                              speakingId === msg.id ? 'text-amber-900 bg-amber-50' : 'text-stone-500'
                            }`}
                            title={speakingId === msg.id ? 'Stop reading aloud' : 'Read aloud'}
                            aria-label={speakingId === msg.id ? 'Stop reading aloud' : 'Read aloud'}
                          >
                            {speakingId === msg.id ? (
                              <VolumeX className="w-4 h-4" />
                            ) : (
                              <Volume2 className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleCopy(msg.id, msg.content)}
                            className="p-1.5 rounded-md hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
                            title="Copy response"
                            aria-label="Copy response"
                          >
                            {copiedId === msg.id ? (
                              <Check className="w-4 h-4 text-emerald-700" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>

                      {renderMarkdownContent(msg.content)}

                      {/* Magisterial Citations Footnotes */}
                      {msg.citations && msg.citations.length > 0 && (
                        <div className="mt-6 pt-4 border-t border-[#E5DEC9] space-y-3">
                          <h4 className="font-cinzel text-xs font-bold text-amber-950">
                            Magisterial Citations &amp; Primary Sources
                          </h4>
                          <ol className="space-y-3">
                            {msg.citations.map((citation, cIdx) => {
                              const metaParts = [
                                citation.documentAuthor,
                                citation.documentYear,
                                citation.documentReference,
                              ].filter(Boolean);

                              return (
                                <li
                                  key={cIdx}
                                  className="pb-3 border-b border-stone-200/70 last:border-b-0 last:pb-0 flex items-start gap-3"
                                >
                                  <span className="font-cinzel text-xs font-bold text-amber-900 tabular-nums mt-0.5 shrink-0">
                                    {cIdx + 1}.
                                  </span>
                                  <div className="flex-1 min-w-0 space-y-1">
                                    <div className="flex items-baseline justify-between gap-2 flex-wrap">
                                      <span className="font-serif font-semibold text-sm text-stone-950">
                                        {citation.documentTitle}
                                      </span>
                                      {citation.sourceUrl && (
                                        <a
                                          href={citation.sourceUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1 text-xs font-cinzel font-semibold text-amber-900 hover:text-amber-700 whitespace-nowrap shrink-0"
                                        >
                                          <span>Source</span>
                                          <ExternalLink className="w-3 h-3" />
                                        </a>
                                      )}
                                    </div>
                                    {metaParts.length > 0 && (
                                      <div className="text-xs font-serif text-stone-600">
                                        {metaParts.join(' · ')}
                                      </div>
                                    )}
                                    {citation.citedText && (
                                      <p className="text-xs sm:text-sm font-serif text-stone-700 leading-relaxed">
                                        {citation.citedText}
                                      </p>
                                    )}
                                  </div>
                                </li>
                              );
                            })}
                          </ol>
                        </div>
                      )}

                      {/* Related Follow-up Questions */}
                      {msg.relatedQuestions && msg.relatedQuestions.length > 0 && (
                        <div className="mt-5 pt-4 border-t border-[#E5DEC9] space-y-2.5">
                          <h4 className="font-cinzel text-xs font-bold text-amber-950">
                            Related Theological Questions
                          </h4>
                          <div className="space-y-2">
                            {msg.relatedQuestions.map((question, qIdx) => (
                              <button
                                key={qIdx}
                                type="button"
                                disabled={isLoading}
                                onClick={() => handleSubmit(undefined, question)}
                                className="w-full text-left px-3.5 py-2.5 rounded-lg bg-[#FAF8F3] hover:bg-[#F2EBD9] border border-[#E5DEC9] text-sm font-serif text-stone-900 transition-colors cursor-pointer flex items-center justify-between gap-3 disabled:opacity-50"
                              >
                                <span>{question}</span>
                                <ArrowRight className="w-3.5 h-3.5 text-amber-900 shrink-0" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Quiet Editorial Footer */}
                      <div className="mt-4 pt-2.5 border-t border-stone-200/70 flex flex-wrap items-center justify-between gap-2 text-xs font-serif text-stone-500">
                        <span>
                          Grounded in the Catechism, Code of Canon Law, Councils &amp; Papal Documents
                        </span>
                        <span className="font-mono text-[11px] tabular-nums">
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </>
                  )}
                </article>
              );
            })}

            {isLoading && (
              <div className="w-full bg-white border border-stone-200/90 rounded-xl p-4 shadow-2xs flex items-center gap-3">
                <RefreshCw className="w-4 h-4 text-amber-800 animate-spin shrink-0" />
                <div className="space-y-0.5">
                  <span className="text-sm font-serif font-semibold text-stone-900 block">
                    Consulting Magisterium AI &amp; Church documents…
                  </span>
                  <span className="text-xs font-serif text-stone-600 block">
                    Cross-referencing the Catechism, Code of Canon Law, Councils, and Papal teachings.
                  </span>
                </div>
              </div>
            )}

            {errorMessage && (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-stone-900 text-xs sm:text-sm font-serif flex items-start gap-2.5">
                <HelpCircle className="w-4 h-4 text-amber-800 shrink-0 mt-0.5" />
                <p>{errorMessage}</p>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
          )}

          {/* Sticky Inquiry Composer */}
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
                placeholder="Ask Magisterium AI about Church doctrine, the Catechism, Canon Law, Councils, or Encyclicals..."
                rows={2}
                className="flex-1 bg-white text-stone-900 placeholder-stone-400 text-sm sm:text-base font-serif rounded-lg p-3 border border-stone-300 focus:border-amber-700 focus:outline-none resize-none leading-relaxed"
              />

              <button
                type="submit"
                disabled={!inputPrompt.trim() || isLoading}
                className="h-12 px-5 rounded-lg bg-amber-800 hover:bg-amber-900 text-white font-cinzel font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0 whitespace-nowrap"
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

      {/* Full-Screen Lightbox for "AI for Catholics" Artwork */}
      {isBannerLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/88 backdrop-blur-xs flex items-center justify-center p-4 sm:p-8"
          onClick={() => setIsBannerLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="AI for Catholics artwork preview"
        >
          <div
            className="relative max-w-6xl w-full space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-end gap-2">
              <a
                href={aiForCatholicsImg}
                download="ai-for-catholics.jpg"
                className="px-3.5 py-2 rounded-lg bg-amber-800 hover:bg-amber-700 text-white font-cinzel text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Image</span>
              </a>
              <button
                type="button"
                onClick={() => setIsBannerLightboxOpen(false)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                aria-label="Close full-screen preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="rounded-xl overflow-hidden border border-amber-300/30 shadow-2xl bg-[#0B101B]">
              <img
                src={aiForCatholicsImg}
                alt="AI for Catholics — Futuristic luminous cathedral sacred artwork"
                referrerPolicy="no-referrer"
                className="w-full h-auto max-h-[82vh] object-contain mx-auto block"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
