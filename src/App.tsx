import React, { useState, useEffect } from 'react';
import { Analytics, type BeforeSendEvent } from '@vercel/analytics/react';
import { Header } from './components/Header';
import { Navigation, ActiveTab } from './components/Navigation';
import { DailyMassReadingsView } from './components/DailyMassReadingsView';
import { CatechismView } from './components/CatechismView';
import { CatholicAIAssistantView } from './components/CatholicAIAssistantView';
import { MagisteriumAIView } from './components/MagisteriumAIView';
import { SaintOfTheDayView } from './components/SaintOfTheDayView';
import { DivineOfficeView } from './components/DivineOfficeView';
import { CatholicBiblesView } from './components/CatholicBiblesView';
import { RosaryAndChapletView } from './components/RosaryAndChapletView';
import { NovenaTrackerView } from './components/NovenaTrackerView';
import { ChurchCalendarView } from './components/ChurchCalendarView';
import { WisdomTreasuryView } from './components/WisdomTreasuryView';
import { QuotationsView } from './components/QuotationsView';
import { CommentaryView } from './components/CommentaryView';
import { SacredArtView } from './components/SacredArtView';
import { SacredMusicView } from './components/SacredMusicView';
import { CatholicTermView } from './components/CatholicTermView';
import { CatholicNewsView } from './components/CatholicNewsView';
import { CatholicArticlesView } from './components/CatholicArticlesView';
import { CatholicSocialView } from './components/CatholicSocialView';
import { PrayerWallAndTreasuryView } from './components/PrayerWallAndTreasuryView';
import { NotificationsModal } from './components/NotificationsModal';
import { AngelusModal } from './components/AngelusModal';
import { SanctumAdorationModal } from './components/SanctumAdorationModal';
import { VisioDivinaView } from './components/VisioDivinaView';
import { CebuParishesModal } from './components/CebuParishesModal';
import { MedjugorjeMessagesView } from './components/MedjugorjeMessagesView';
import { MarianApparitionsView } from './components/MarianApparitionsView';
import { CatholicProphecyView } from './components/CatholicProphecyView';
import { SpiritualBooksReaderView } from './components/SpiritualBooksReaderView';
import { CatholicPodcastsView } from './components/CatholicPodcastsView';
import { FioAudioView } from './components/FioAudioView';
import { PodcastPlayerBar } from './components/PodcastPlayerBar';
import { PodcastEpisodeModal } from './components/PodcastEpisodeModal';
import { EucharisticCatechismView } from './components/EucharisticCatechismView';
import { HolyMassLivePlayerView } from './components/HolyMassLivePlayerView';
import { ParishFinderView } from './components/ParishFinderView';
import { BibleFlashcardsView } from './components/BibleFlashcardsView';
import { ChurchHistoryInfographicView } from './components/ChurchHistoryInfographicView';
import { CatholicLinksView } from './components/CatholicLinksView';
import { PersonalPietyDashboard } from './components/PersonalPietyDashboard';
import { PersonalCatholicDashboardView } from './components/PersonalCatholicDashboardView';
import { InMemoriamView } from './components/InMemoriamView';
import { OfflineIndicator } from './components/OfflineIndicator';
import { PodcastEpisode } from './types';
import { getTopVaticanHeadline } from './data/news';
import { applySeoMetadata, getInitialTabFromLocation } from './utils/seo';
import { SacredReader } from './utils/speech';
import {
  CatholicArticleItem,
  CURATED_CATHOLIC_ARTICLES
} from './data/catholicRssArticles';

import { getMassReadingsForDate } from './data/massReadings';
import { LITURGICAL_COLORS_INFO } from './data/liturgicalCalendar';
import { 
  getSavedEmblem, 
  SacredEmblem,
  SACRED_EMBLEMS,
  getSavedIconStyle,
  IconStyleConfig,
  ICON_COLOR_THEMES,
  ICON_FRAME_STYLES
} from './data/emblems';
import {
  getActiveScheduledMastheadForDate
} from './data/mastheadSchedule';
import { Sparkles } from 'lucide-react';
import { MaryAndBlessedSacramentIcon, GoldenMonstranceIcon } from './components/SanctumIcons';
import { NIEPOKALANOW_HIGH_RES_IMAGES, NiepokalanowHighResImage } from './data/sacredArt';

const ANALYTICS_EXCLUDE_STORAGE_KEY = 'sanctum_exclude_analytics';

function syncOwnerAnalyticsExclusion(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const params = new URLSearchParams(window.location.search);
    const flag = params.get('exclude_me');
    if (flag === '1' || flag === 'true') {
      localStorage.setItem(ANALYTICS_EXCLUDE_STORAGE_KEY, 'true');
      params.delete('exclude_me');
      const nextSearch = params.toString();
      const nextUrl = `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ''}${window.location.hash}`;
      window.history.replaceState(null, '', nextUrl);
      return true;
    }
    if (flag === '0' || flag === 'false') {
      localStorage.removeItem(ANALYTICS_EXCLUDE_STORAGE_KEY);
      params.delete('exclude_me');
      const nextSearch = params.toString();
      const nextUrl = `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ''}${window.location.hash}`;
      window.history.replaceState(null, '', nextUrl);
      return false;
    }
    return localStorage.getItem(ANALYTICS_EXCLUDE_STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

const IS_OWNER_ANALYTICS_EXCLUDED = syncOwnerAnalyticsExclusion();

const analyticsBeforeSend = (event: BeforeSendEvent): BeforeSendEvent | null => {
  try {
    if (
      IS_OWNER_ANALYTICS_EXCLUDED ||
      localStorage.getItem(ANALYTICS_EXCLUDE_STORAGE_KEY) === 'true' ||
      event.url.includes('exclude_me=1') ||
      event.url.includes('exclude_me=true')
    ) {
      return null;
    }
  } catch {
    if (IS_OWNER_ANALYTICS_EXCLUDED) return null;
  }
  return event;
};

const getTodayDateStr = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export default function App() {
  const [currentDateStr, setCurrentDateStr] = useState<string>(() => {
    return getTodayDateStr();
  });
  const [activeTab, setActiveTab] = useState<ActiveTab>(() => getInitialTabFromLocation());
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAngelusOpen, setIsAngelusOpen] = useState(false);
  const [isAdorationOpen, setIsAdorationOpen] = useState(false);
  const [isCebuParishesOpen, setIsCebuParishesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [gmpQuotaExceeded, setGmpQuotaExceeded] = useState(false);
  const [showContactEmail, setShowContactEmail] = useState(false);
  const [currentEmblem] = useState<SacredEmblem>(getSavedEmblem);
  const [iconStyleConfig] = useState<IconStyleConfig>(getSavedIconStyle);
  const [selectedArtId, setSelectedArtId] = useState<string | undefined>(undefined);
  const [activeEstablishingImageId, setActiveEstablishingImageId] = useState<string>(() => {
    try {
      const stored = localStorage.getItem('sanctum_establishing_image_v8');
      if (!stored) {
        localStorage.setItem('sanctum_establishing_image_v8', 'christ-the-king-main-story');
        return 'christ-the-king-main-story';
      }
      return stored;
    } catch {
      return 'christ-the-king-main-story';
    }
  });

  // Automatically update the day when the calendar date changes
  useEffect(() => {
    const checkDate = () => {
      const newDateStr = getTodayDateStr();
      if (newDateStr !== currentDateStr) {
        setCurrentDateStr(newDateStr);
      }
    };
    
    // Check every minute
    const interval = setInterval(checkDate, 60000);
    // Check on window focus
    window.addEventListener('focus', checkDate);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', checkDate);
    };
  }, [currentDateStr]);

  // Listen for Google Maps Platform quota-exceeded events at top-level App scope
  useEffect(() => {
    const handleQuotaExceeded = () => setGmpQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () => {
      window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    };
  }, []);

  const activeScheduledMasthead = getActiveScheduledMastheadForDate(currentDateStr);

  const effectiveEstablishingImageId = activeScheduledMasthead
    ? activeScheduledMasthead.establishingImageId
    : activeEstablishingImageId;

  const effectiveEmblem = activeScheduledMasthead
    ? SACRED_EMBLEMS.find((e) => e.id === activeScheduledMasthead.emblemId) || currentEmblem
    : currentEmblem;

  const effectiveIconStyleConfig: IconStyleConfig = activeScheduledMasthead
    ? {
        ...iconStyleConfig,
        colorTheme: activeScheduledMasthead.colorTheme,
        frameStyle: activeScheduledMasthead.frameStyle,
      }
    : iconStyleConfig;

  const activeEstablishingImage =
    NIEPOKALANOW_HIGH_RES_IMAGES.find((img) => img.id === effectiveEstablishingImageId) ||
    NIEPOKALANOW_HIGH_RES_IMAGES[0];

  const handleSelectEstablishingImage = (img: NiepokalanowHighResImage) => {
    setActiveEstablishingImageId(img.id);
    try {
      localStorage.setItem('sanctum_establishing_image_v8', img.id);
    } catch {
      // ignore storage errors
    }
  };

  // Ultra-Smooth 60/120fps GPU Vertical-Only Parallax (C2-Continuous Cascaded Filter, Zero Horizontal Movement)
  const imageParallaxRef = React.useRef<HTMLDivElement>(null);
  const haloParallaxRef = React.useRef<HTMLDivElement>(null);
  const gradientOverlayRef = React.useRef<HTMLDivElement>(null);
  const candleGlowRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initialScroll = window.scrollY || 0;
    const state = {
      targetScrollY: initialScroll,
      midScrollY: initialScroll,
      currentScrollY: initialScroll,
      targetMouseY: 0,
      midMouseY: 0,
      currentMouseY: 0,
      rafId: 0,
      isRunning: false,
      lastTime: performance.now(),
    };

    const applyParallaxTransforms = () => {
      // Smooth asymptotic curve so vertical scroll parallax glides continuously without hitting a hard stop
      const maxScrollOffset = 95;
      const rawScrollOffset = -state.currentScrollY * 0.11;
      const smoothScrollY = maxScrollOffset * Math.tanh(rawScrollOffset / maxScrollOffset);

      // Strictly vertical movement only (0px horizontal shift) so left and right borders remain 100% equal
      const imgY = smoothScrollY + state.currentMouseY * 3.5;

      if (imageParallaxRef.current) {
        imageParallaxRef.current.style.transform = `translate3d(0px, ${imgY.toFixed(4)}px, 0px)`;
      }

      if (haloParallaxRef.current) {
        const haloY = smoothScrollY * 1.12 + state.currentMouseY * 4.5;
        haloParallaxRef.current.style.transform = `translate3d(0px, ${haloY.toFixed(4)}px, 0px)`;
      }

      if (gradientOverlayRef.current) {
        const nextOpacity = Math.min(1, 0.38 + state.currentScrollY * 0.0005);
        gradientOverlayRef.current.style.opacity = nextOpacity.toFixed(4);
      }

      if (candleGlowRef.current) {
        const glowY = Math.max(-24, smoothScrollY * 0.22);
        candleGlowRef.current.style.transform = `translate3d(0px, ${glowY.toFixed(4)}px, 0px)`;
      }
    };

    const tick = (now: number) => {
      // Clamp dt to handle tab switches and high-refresh-rate monitors (60Hz / 120Hz / 144Hz)
      const dt = Math.min(Math.max((now - state.lastTime) / 1000, 0.001), 0.05);
      state.lastTime = now;

      // Two-stage cascaded exponential low-pass filter:
      // Stage 1 absorbs abrupt wheel-notch steps; Stage 2 produces a silky, zero-jerk velocity curve
      const scrollPreEase = 1 - Math.exp(-10.0 * dt);
      const scrollFinalEase = 1 - Math.exp(-5.2 * dt);
      state.midScrollY += (state.targetScrollY - state.midScrollY) * scrollPreEase;
      state.currentScrollY += (state.midScrollY - state.currentScrollY) * scrollFinalEase;

      const mousePreEase = 1 - Math.exp(-7.0 * dt);
      const mouseFinalEase = 1 - Math.exp(-3.6 * dt);
      state.midMouseY += (state.targetMouseY - state.midMouseY) * mousePreEase;
      state.currentMouseY += (state.midMouseY - state.currentMouseY) * mouseFinalEase;

      applyParallaxTransforms();

      const scrollDiff =
        Math.abs(state.targetScrollY - state.currentScrollY) +
        Math.abs(state.targetScrollY - state.midScrollY);
      const mouseYDiff =
        Math.abs(state.targetMouseY - state.currentMouseY) +
        Math.abs(state.targetMouseY - state.midMouseY);

      if (scrollDiff > 0.008 || mouseYDiff > 0.0004) {
        state.rafId = window.requestAnimationFrame(tick);
      } else {
        state.midScrollY = state.targetScrollY;
        state.currentScrollY = state.targetScrollY;
        state.midMouseY = state.targetMouseY;
        state.currentMouseY = state.targetMouseY;
        applyParallaxTransforms();
        state.isRunning = false;
      }
    };

    const startLoop = () => {
      if (!state.isRunning) {
        state.isRunning = true;
        state.lastTime = performance.now();
        state.rafId = window.requestAnimationFrame(tick);
      }
    };

    const handleScroll = () => {
      state.targetScrollY = window.scrollY || 0;
      startLoop();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { innerHeight } = window;
      if (innerHeight > 0) {
        state.targetMouseY = (e.clientY / innerHeight - 0.5) * 2;
        startLoop();
      }
    };

    // Initial transform placement
    applyParallaxTransforms();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (state.rafId) {
        window.cancelAnimationFrame(state.rafId);
      }
    };
  }, []);

  // Get reading for selected date
  const currentMassReading = getMassReadingsForDate(currentDateStr);
  const colorMeta = LITURGICAL_COLORS_INFO[currentMassReading.liturgicalColor] || LITURGICAL_COLORS_INFO.white;

  const activeColorTheme = ICON_COLOR_THEMES.find(t => t.id === iconStyleConfig.colorTheme) || ICON_COLOR_THEMES[0];
  const activeFrame = ICON_FRAME_STYLES.find(f => f.id === iconStyleConfig.frameStyle) || ICON_FRAME_STYLES[0];

  // Top Vatican Headline & Featured Catholic Article state
  const topVaticanHeadline = getTopVaticanHeadline(currentDateStr);
  const [activeVaticanArticleId, setActiveVaticanArticleId] = useState<string | null>(null);
  const [activeCatholicArticleSourceId, setActiveCatholicArticleSourceId] = useState<string | null>(null);
  const [activeCatholicArticleId, setActiveCatholicArticleId] = useState<string | null>(null);
  const [featuredMastheadArticle] = useState<CatholicArticleItem>(
    () => CURATED_CATHOLIC_ARTICLES.find(a => a.id === 'catholic-exchange-christ-the-king') || CURATED_CATHOLIC_ARTICLES[0]
  );

  // Audio state for Catholic Podcasts
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const [currentPlayingEpisode, setCurrentPlayingEpisode] = useState<PodcastEpisode | null>(null);
  const [isPlayingPodcast, setIsPlayingPodcast] = useState(false);
  const [podcastModalEpisode, setPodcastModalEpisode] = useState<PodcastEpisode | null>(null);
  const [podcastCurrentTime, setPodcastCurrentTime] = useState(0);
  const [podcastDuration, setPodcastDuration] = useState(0);
  const [podcastPlaybackRate, setPodcastPlaybackRate] = useState(1.0);
  const [podcastAudioMode, setPodcastAudioMode] = useState<'stream' | 'narration'>('stream');

  const handlePlayPodcast = (episode: PodcastEpisode) => {
    // 1. Always stop any active speech synthesis
    SacredReader.stop();

    // 2. Completely pause and tear down previous audio stream
    if (audioRef.current) {
      try {
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current.load();
      } catch {
        // ignore
      }
      audioRef.current = null;
    }

    // 3. If clicking the exact same episode that was playing and it's already playing: pause it
    if (currentPlayingEpisode?.id === episode.id && isPlayingPodcast) {
      setIsPlayingPodcast(false);
      return;
    }

    // 4. Set new playing episode state
    setCurrentPlayingEpisode(episode);
    setPodcastCurrentTime(0);
    setPodcastDuration(episode.durationSeconds || 1200);
    setIsPlayingPodcast(true);

    if (podcastAudioMode === 'narration') {
      const speech = `${episode.title}. From ${episode.podcastTitle}, hosted by ${episode.podcastHost}. ${episode.summary}. Key Quote: "${episode.keyQuote}".`;
      SacredReader.speak(speech, () => setIsPlayingPodcast(false));
      return;
    }

    // Play the actual podcast audio stream directly (do not fall back to website voice synthesis)
    const newAudio = new Audio(episode.audioUrl);
    newAudio.playbackRate = podcastPlaybackRate;
    newAudio.preload = 'auto';

    newAudio.ontimeupdate = () => {
      setPodcastCurrentTime(newAudio.currentTime);
    };
    newAudio.onloadedmetadata = () => {
      if (!isNaN(newAudio.duration) && newAudio.duration > 0) {
        setPodcastDuration(newAudio.duration);
      }
    };
    newAudio.onended = () => {
      setIsPlayingPodcast(false);
    };
    newAudio.onerror = () => {
      setIsPlayingPodcast(false);
    };

    audioRef.current = newAudio;
    newAudio.play().catch(() => {
      setIsPlayingPodcast(false);
    });
  };

  const handlePausePodcast = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    SacredReader.stop();
    setIsPlayingPodcast(false);
  };

  const handleSeekPodcast = (seconds: number) => {
    setPodcastCurrentTime(seconds);
    if (audioRef.current) {
      audioRef.current.currentTime = seconds;
    }
  };

  const handleChangePlaybackRate = (rate: number) => {
    setPodcastPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
  };

  const handleToggleAudioMode = () => {
    const nextMode = podcastAudioMode === 'stream' ? 'narration' : 'stream';
    setPodcastAudioMode(nextMode);
    if (currentPlayingEpisode) {
      handlePausePodcast();
    }
  };

  const handleClosePodcastPlayer = () => {
    handlePausePodcast();
    setCurrentPlayingEpisode(null);
  };

  const mainContentRef = React.useRef<HTMLDivElement>(null);
  const mainViewRef = React.useRef<HTMLElement>(null);

  const handleSelectTab = (tab: ActiveTab) => {
    setIsAdorationOpen(false);
    setActiveTab(tab);

    if (typeof window !== 'undefined') {
      const targetPath = `/${tab}`;
      if (window.location.pathname !== targetPath) {
        try {
          window.history.pushState({ tab }, '', targetPath);
        } catch {
          // Ignore restricted history mutations in sandboxed embeds
        }
      }

      const scrollToSelectedBanner = () => {
        const targetEl = mainViewRef.current || mainContentRef.current;
        if (targetEl) {
          const rect = targetEl.getBoundingClientRect();
          const absoluteTop = rect.top + window.scrollY;
          const topInset = window.innerWidth >= 768 ? 20 : 10;
          const targetY = Math.max(0, Math.round(absoluteTop - topInset));
          window.scrollTo({ top: targetY, behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      };

      window.requestAnimationFrame(() => {
        scrollToSelectedBanner();
      });
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      setActiveTab(getInitialTabFromLocation());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenArtFromReadings = (artId: string) => {
    setSelectedArtId(artId);
    handleSelectTab('sacred-art');
  };

  const isStandaloneDashboardSite =
    typeof window !== 'undefined' &&
    (window.location.pathname.startsWith('/dashboard') ||
      new URLSearchParams(window.location.search).has('dashboard') ||
      window.location.hash === '#dashboard');

  useEffect(() => {
    applySeoMetadata(activeTab, isStandaloneDashboardSite);
  }, [activeTab, isStandaloneDashboardSite]);

  if (isStandaloneDashboardSite) {
    return (
      <div className="min-h-screen bg-[#18110C] text-[#24140B] py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
        {!IS_OWNER_ANALYTICS_EXCLUDED && (
          <Analytics route="/dashboard" path="/dashboard" debug={false} beforeSend={analyticsBeforeSend} />
        )}
        <div className="max-w-7xl mx-auto">
          <PersonalCatholicDashboardView
            currentDateStr={currentDateStr}
            currentReading={currentMassReading}
            onSelectDate={(d) => setCurrentDateStr(d)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative flex flex-col overflow-x-clip bg-stone-950 text-stone-900 selection:bg-amber-300 selection:text-amber-950">
      {gmpQuotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}
      {!IS_OWNER_ANALYTICS_EXCLUDED && (
        <Analytics route={`/${activeTab}`} path={`/${activeTab}`} debug={false} beforeSend={analyticsBeforeSend} />
      )}
      
      {/* Fixed Full-Website Sacred Sanctum Background: Centered and Enlarged */}
      <div className={`fixed inset-0 z-0 select-none pointer-events-none overflow-hidden flex flex-col items-center justify-start ${
        activeEstablishingImage.id === 'christ-the-king-main-story'
          ? 'px-0'
          : 'px-4 sm:px-6 lg:px-8'
      }`}>
        {/* Full-Bleed Frosted Glass Ambient Extension (replaces gray side/top/bottom margins on all screens) */}
        {activeEstablishingImage.id === 'christ-the-king-main-story' && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <img
              src={activeEstablishingImage.imageUrl}
              alt=""
              decoding="async"
              className="w-full h-full object-cover object-center scale-110 blur-2xl brightness-[0.95] contrast-[1.04] saturate-[1.12] transform-gpu"
            />
            <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl" />
          </div>
        )}

        {/* Enlarged and Centered Image Container with GPU-Accelerated Smooth Vertical-Only Parallax */}
        <div 
          ref={imageParallaxRef}
          className={`relative w-full mx-auto flex items-start justify-center overflow-hidden will-change-transform backface-hidden ${
            activeEstablishingImage.id === 'christ-the-king-main-story'
              ? 'hidden sm:flex max-w-[1440px]'
              : 'max-w-7xl'
          }`}
        >
          {activeEstablishingImage.id === 'faith-scholarship-science' ? (
            <div className="relative w-full overflow-hidden transform-gpu flex justify-center">
              <img
                src={activeEstablishingImage.imageUrl}
                alt={activeEstablishingImage.title}
                decoding="async"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('Faith__Scholarship__and_Scientific_Discovery_c472d047.png')) {
                    target.src = '/assets/aistudio/Faith__Scholarship__and_Scientific_Discovery_c472d047.png';
                  }
                }}
                className="w-full min-h-[78vh] sm:min-h-0 h-auto object-cover object-center sm:object-contain block brightness-[1.02] contrast-[1.04] transform-gpu shrink-0"
              />
              {/* Subtle bottom edge feathering into the page background */}
              <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-stone-950/80 to-transparent pointer-events-none" />
            </div>
          ) : activeEstablishingImage.id === 'unsplash-eucharistic-adoration' ? (
            <div className="relative w-full overflow-hidden transform-gpu flex justify-center">
              <img
                src={activeEstablishingImage.imageUrl}
                alt={activeEstablishingImage.title}
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('images.unsplash.com')) {
                    target.src = 'https://images.unsplash.com/photo-1599752766954-57c001ba82cc?q=80&w=1471&auto=format&fit=crop';
                  } else {
                    target.src = '/images/sacred-art/eucharistic_adoration_altar.jpg';
                  }
                }}
                className="w-[135%] sm:w-[120%] -mt-[12%] sm:-mt-[24.5%] max-w-none h-auto block brightness-[1.06] contrast-[1.06] transform-gpu shrink-0"
              />
              {/* Subtle bottom edge feathering so the priest remains completely visible */}
              <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-stone-950/75 to-transparent pointer-events-none" />
            </div>
          ) : activeEstablishingImage.id === 'christ-the-king-main-story' ? (
            <div className="relative w-full sm:pt-[92px] lg:pt-0 flex flex-col items-center justify-start overflow-hidden transform-gpu">
              <div className="relative w-full flex items-center justify-center overflow-hidden">
                <img
                  src={activeEstablishingImage.imageUrl}
                  alt={activeEstablishingImage.title}
                  decoding="async"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('niepokalanow_white_host_sanctuary.jpg')) {
                      target.src = '/images/sacred-art/niepokalanow_white_host_sanctuary.jpg';
                    }
                  }}
                  className="w-full h-auto max-h-[100vh] mx-auto object-contain block brightness-[0.99] contrast-[1.04] transform-gpu shadow-[0_12px_48px_rgba(0,0,0,0.28)]"
                />
              </div>
            </div>
          ) : activeEstablishingImage.id === 'our-lady-monstrance-connors' ? (
            <div className="relative w-full h-[84vh] sm:h-[100vh] flex items-center justify-center overflow-hidden transform-gpu">
              <img
                src={activeEstablishingImage.imageUrl}
                alt={activeEstablishingImage.title}
                decoding="async"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('niepokalanow_white_host_sanctuary.jpg')) {
                    target.src = '/images/sacred-art/niepokalanow_white_host_sanctuary.jpg';
                  }
                }}
                className="w-full h-full mx-auto object-cover object-[50%_22%] brightness-[0.98] contrast-[1.04] transform-gpu"
              />
              {/* Subtle bottom gradient behind Main Story card */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-stone-950/85 to-transparent pointer-events-none" />
            </div>
          ) : activeEstablishingImage.id === 'pope-leo-peru-homecoming' ? (
            <div className="relative w-full h-[84vh] sm:h-[100vh] flex items-center justify-center overflow-hidden transform-gpu">
              <img
                src={activeEstablishingImage.imageUrl}
                alt={activeEstablishingImage.title}
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('img.aleteia.org')) {
                    target.src = 'https://img.aleteia.org/tr:w-1600,q-85/2026/11/AMPTPN1126-pope-leo-xiv-government-palace-plaza-mayor-lima-peru-2026-000_D78H9KF.jpg';
                  } else {
                    target.src = '/images/sacred-art/faith_scholarship_peaceful_sky.jpg?v=3';
                  }
                }}
                className="w-full h-full mx-auto object-cover object-[50%_20%] brightness-[0.97] contrast-[1.05] transform-gpu"
              />
              {/* Subtle bottom gradient behind Main Story card */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-stone-950/85 to-transparent pointer-events-none" />
            </div>
          ) : (
            <div className="relative w-full h-[80vh] sm:h-[100vh] -mt-6 sm:-mt-20 flex items-center justify-center overflow-hidden transform-gpu">
              <img
                src={activeEstablishingImage.imageUrl}
                alt={activeEstablishingImage.title}
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.src = 'https://images.unsplash.com/photo-1599752766954-57c001ba82cc?q=80&w=1471&auto=format&fit=crop';
                }}
                className="w-full h-full mx-auto object-cover sm:object-contain object-center pt-2 sm:pt-3 brightness-[0.99] contrast-[1.08] transform-gpu"
              />
            </div>
          )}
          {/* Luminous Eucharistic halo centered on the Blessed Sacrament */}
          <div 
            ref={haloParallaxRef}
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_42%,rgba(251,191,36,0.28)_0%,rgba(217,119,6,0.10)_45%,transparent_72%)] will-change-transform backface-hidden"
          />
        </div>

        {/* Seamless Atmospheric Gradient Transitions from Masthead into Contents */}
        {activeEstablishingImage.id !== 'christ-the-king-main-story' && (
          <div className="absolute inset-0 bg-stone-950/5" />
        )}
        {/* Seamless vertical gradient fade */}
        <div 
          ref={gradientOverlayRef}
          className={`absolute inset-0 pointer-events-none will-change-[opacity] ${
            activeEstablishingImage.id === 'christ-the-king-main-story'
              ? 'bg-gradient-to-b from-transparent via-transparent to-black/20'
              : 'bg-gradient-to-b from-transparent via-transparent to-stone-950/80'
          }`}
        />
        {/* Symmetrical left and right vignettes to frame non-frosted scenes */}
        {activeEstablishingImage.id !== 'christ-the-king-main-story' && (
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(12,10,9,0.35)_0%,transparent_10%,transparent_90%,rgba(12,10,9,0.35)_100%)] pointer-events-none" />
        )}
        {/* Warm altar candlelight glow extending across bottom contents with gentle parallax rise */}
        <div 
          ref={candleGlowRef}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(217,119,6,0.14)_0%,transparent_65%)] pointer-events-none will-change-transform" 
        />
      </div>

      {/* Foreground Container with Frosted Glass Transparency and Sacred Ambiance */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* Masthead Section: Clean stacked flow on smartphone; full-viewport hero on tablet/desktop */}
        <div className={`w-full flex flex-col ${
          effectiveEstablishingImageId === 'christ-the-king-main-story'
            ? 'justify-start sm:justify-between min-h-0 sm:min-h-[100dvh] pb-4 sm:pb-4'
            : 'justify-between min-h-[calc(100dvh-74px)] sm:min-h-[92vh] lg:min-h-screen pb-3 sm:pb-10'
        }`}>
          {/* Sacred Top Header */}
          <Header
            currentDateStr={currentDateStr}
            liturgicalColor={currentMassReading.liturgicalColor}
            liturgicalTitle={currentMassReading.liturgicalDay}
            onOpenAngelus={() => setIsAngelusOpen(true)}
            onSelectDate={(newDate) => setCurrentDateStr(newDate)}
            activeEmblem={effectiveEmblem}
            iconStyleConfig={effectiveIconStyleConfig}
            onOpenArtViewer={handleOpenArtFromReadings}
            onOpenAdoration={() => setIsAdorationOpen(true)}
            onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            activeEstablishingImageId={effectiveEstablishingImageId}
            onSelectEstablishingImage={handleSelectEstablishingImage}
            scheduledMasthead={activeScheduledMasthead}
          />

          {/* Smartphone-Only Full-Width Uncropped Christ the King Artwork over Frosted Glass Backdrop */}
          {effectiveEstablishingImageId === 'christ-the-king-main-story' && (
            <div className="sm:hidden relative w-full overflow-hidden select-none shadow-[0_8px_28px_rgba(0,0,0,0.28)]">
              <img
                src={activeEstablishingImage.imageUrl}
                alt={activeEstablishingImage.title}
                decoding="async"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('niepokalanow_white_host_sanctuary.jpg')) {
                    target.src = '/images/sacred-art/niepokalanow_white_host_sanctuary.jpg';
                  }
                }}
                className="w-full h-auto block brightness-[1.01] contrast-[1.04]"
              />
            </div>
          )}

          {/* Lower Masthead: Transferred Motto & Liturgical Day + Main Story Card */}
          <div className={effectiveEstablishingImageId === 'christ-the-king-main-story' ? 'w-full mt-2.5 sm:mt-auto flex flex-col' : 'w-full flex flex-col'}>
            {effectiveEstablishingImageId === 'christ-the-king-main-story' && (!activeScheduledMasthead || activeScheduledMasthead.layoutVariant === 'classic-split') && (() => {
              const cleanLiturgicalTitle = currentMassReading.liturgicalDay.replace(/\s*\(Blessed Virgin Mary on Saturday\)/gi, '').trim();
              const hasMemorialSplit = cleanLiturgicalTitle.includes(' / ');
              const isChristTheKingTitle = /^solemnity of our lord jesus christ,\s*king of the universe$/i.test(cleanLiturgicalTitle);
              const mainTitlePart = isChristTheKingTitle
                ? 'Solemnity of Our Lord Jesus Christ'
                : hasMemorialSplit
                  ? cleanLiturgicalTitle.split(' / ')[0]
                  : cleanLiturgicalTitle;
              const memorialPart = isChristTheKingTitle
                ? 'King of the Universe'
                : hasMemorialSplit
                  ? cleanLiturgicalTitle.split(' / ')[1]
                  : null;
              const mottoText = activeScheduledMasthead?.mottoText || 'Pray without ceasing.';
              const mottoCitation = activeScheduledMasthead?.mottoCitation || '1 Thessalonians 5:17';
              return (
                <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 xl:px-14 mb-3 sm:mb-3 md:mb-4 lg:mb-6 xl:mb-8 pointer-events-auto">
                  <div className="pl-0 sm:pl-[64px] xl:pl-[74px] 2xl:pl-[84px] max-w-md sm:max-w-[380px] mx-auto sm:mx-0 text-center sm:text-left">
                    <div className="flex flex-row sm:flex-col items-baseline justify-center sm:items-start gap-x-2 flex-wrap">
                      <span className="text-sm sm:text-lg md:text-xl font-serif not-italic text-white font-semibold tracking-wide [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.98))_drop-shadow(0_2px_8px_rgba(0,0,0,0.92))]">
                        {mottoText}
                      </span>
                      <span className="text-xs sm:text-base md:text-[17px] font-serif not-italic font-semibold text-[#E8C55A] tracking-wide [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.98))_drop-shadow(0_2px_6px_rgba(0,0,0,0.95))] sm:mt-0.5">
                        {mottoCitation}
                      </span>
                    </div>

                    <div className="flex flex-col items-center sm:items-start gap-0.5 text-center sm:text-left pt-1 sm:pt-2">
                      <span className="font-serif font-bold text-xs sm:text-sm text-amber-100/95 sm:text-white leading-snug [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.98))_drop-shadow(0_2px_8px_rgba(0,0,0,0.92))]">
                        {mainTitlePart}
                      </span>
                      {memorialPart && (
                        <span className="font-serif font-bold not-italic text-xs sm:text-sm text-amber-100/95 sm:text-white leading-snug [filter:drop-shadow(0_1px_2px_rgba(0,0,0,0.98))_drop-shadow(0_2px_8px_rgba(0,0,0,0.92))]">
                          {memorialPart}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Main Story: Featured Catholic Article Masthead Dispatch */}
            <div className={`max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 pt-0 ${
              effectiveEstablishingImageId === 'christ-the-king-main-story'
                ? 'mt-0'
                : effectiveEstablishingImageId === 'our-lady-monstrance-connors'
                  ? 'mt-3 sm:mt-6 md:mt-8 lg:mt-10'
                  : 'sm:mt-64 md:mt-72 lg:mt-80'
            }`}>
            <div className={`w-full max-w-4xl mx-auto rounded-xl text-amber-100 transition-all text-center ${
              effectiveEstablishingImageId === 'christ-the-king-main-story'
                ? 'bg-[#2B1A0F]/32 sm:bg-[#2B1A0F]/22 hover:bg-[#2B1A0F]/36 border border-amber-300/45 sm:border-amber-400/50 hover:border-amber-300 backdrop-blur-md sm:backdrop-blur-[2px] shadow-[0_8px_32px_rgba(0,0,0,0.32)] py-3 px-3.5 sm:py-4 sm:px-7 space-y-1.5 sm:space-y-2'
                : 'bg-black/30 sm:bg-black/40 hover:bg-black/50 border border-amber-500/45 hover:border-amber-400 backdrop-blur-[2px] shadow-[0_12px_40px_rgba(0,0,0,0.55)] py-3.5 px-4 sm:py-5 sm:px-8 space-y-2 sm:space-y-2.5'
            }`}>
              <div className="flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shrink-0" />
                <span className="font-cinzel text-[10px] sm:text-xs font-bold tracking-[0.18em] sm:tracking-[0.25em] uppercase text-amber-300 drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
                  CATHOLIC ARTICLES • {featuredMastheadArticle.sourceName}
                </span>
              </div>
              
              {/* Full Lead Headline */}
              <h2 
                onClick={() => {
                  setActiveCatholicArticleSourceId(featuredMastheadArticle.sourceId);
                  setActiveCatholicArticleId(featuredMastheadArticle.id);
                  handleSelectTab('catholic-articles');
                }}
                className="font-serif text-[19px] sm:text-2xl md:text-3xl font-extrabold text-white hover:text-amber-200 leading-snug max-w-4xl mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.98)] tracking-tight cursor-pointer transition-colors"
              >
                {featuredMastheadArticle.title.endsWith(' Most Blessed Sacrament') ? (
                  <>
                    <span>{featuredMastheadArticle.title.slice(0, -' Most Blessed Sacrament'.length)}</span>
                    <span className="block">Most Blessed Sacrament</span>
                  </>
                ) : (
                  featuredMastheadArticle.title
                )}
              </h2>

              {/* Subtitle & Call to Action */}
              <p className="text-[12.5px] sm:text-sm md:text-base text-stone-100 font-serif italic max-w-4xl mx-auto leading-relaxed pt-0.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                {featuredMastheadArticle.summary.endsWith(' on the Solemnity of Christ the King?') ? (
                  <>
                    <span>{featuredMastheadArticle.summary.slice(0, -' on the Solemnity of Christ the King?'.length)}</span>
                    <span className="sm:block"> on the Solemnity of Christ the King?</span>
                  </>
                ) : (
                  featuredMastheadArticle.summary
                )}
              </p>

              <div className="pt-1.5 sm:pt-2 flex flex-col md:grid md:grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-2.5 md:gap-3">
                <div className="hidden md:block" aria-hidden="true" />
                <span className="text-[11px] sm:text-xs font-serif text-amber-200/90 text-center">
                  by {featuredMastheadArticle.author}
                </span>
                <div className="w-full md:w-auto flex justify-center md:justify-self-end">
                  <button
                    onClick={() => {
                      setActiveCatholicArticleSourceId(featuredMastheadArticle.sourceId);
                      setActiveCatholicArticleId(featuredMastheadArticle.id);
                      handleSelectTab('catholic-articles');
                    }}
                    className="inline-flex items-center justify-center min-h-[40px] px-5 py-1.5 sm:px-5 sm:py-2 rounded-lg bg-[#A67C52] hover:bg-[#966B43] border border-[#C49B6E]/60 text-amber-50 font-cinzel text-[11px] sm:text-xs font-bold tracking-wider uppercase transition-all shadow-[0_4px_18px_rgba(166,124,82,0.4)] hover:scale-102 cursor-pointer"
                    title="Read this full story in Catholic Articles"
                  >
                    <span>Read Full Story</span>
                  </button>
                </div>
              </div>
            </div>
            {effectiveEstablishingImageId !== 'our-lady-monstrance-connors' &&
              (featuredMastheadArticle.imageCredit || activeEstablishingImage.creditShort) && (
              <div className="max-w-4xl mx-auto mt-1.5 px-1 sm:px-2 text-center sm:text-right">
                <span className="text-[10px] sm:text-[11px] font-cinzel tracking-wider uppercase text-amber-100/80 drop-shadow-[0_1px_4px_rgba(0,0,0,0.95)]">
                  Credit: {featuredMastheadArticle.imageCredit || activeEstablishingImage.creditShort}
                </span>
              </div>
            )}
            </div>
          </div>
        </div>

        {/* Main Body Layout */}
        <div className={`flex-1 w-full mx-auto px-2.5 sm:px-6 lg:px-8 pt-3 sm:pt-8 pb-24 sm:pb-24 flex flex-col items-center transition-all duration-300 ${
          activeTab === 'catholic-ai'
            ? 'max-w-none px-2 sm:px-4 lg:px-6'
            : 'max-w-7xl'
        }`}>
          {/* Dual Column Container: Left Navigation Index + Centered Main View */}
          <div 
            ref={mainContentRef}
            id="main-content-area"
            className="w-full flex flex-col md:flex-row gap-4 sm:gap-6 lg:gap-8 items-start justify-center transition-all duration-300"
          >
            
            {/* Left-Side Liturgical Menu */}
            <div className="shrink-0 md:self-stretch transition-all duration-300">
              <Navigation
                activeTab={activeTab}
                onSelectTab={(tab) => {
                  handleSelectTab(tab);
                }}
                onOpenNotifications={() => setIsNotificationsOpen(true)}
                activeNovenasCount={2}
                isMobileOpen={isMobileMenuOpen}
                onOpenMobile={() => setIsMobileMenuOpen(true)}
                onCloseMobile={() => setIsMobileMenuOpen(false)}
                onOpenAdoration={() => setIsAdorationOpen(true)}
              />
            </div>

            {/* Main Content Area */}
            <main
              ref={mainViewRef}
              className={`flex-1 w-full min-w-0 transition-all duration-300 ${
                activeTab === 'catholic-ai' ? 'max-w-full' : 'max-w-4xl'
              }`}
            >

            {/* 1. Mass Readings */}
            {activeTab === 'readings' && (
              <DailyMassReadingsView
                reading={currentMassReading}
                onSelectDate={(date) => setCurrentDateStr(date)}
                onOpenArtViewer={handleOpenArtFromReadings}
                onSelectTab={handleSelectTab}
              />
            )}

            {/* 2. Saint of the Day */}
            {activeTab === 'saints' && (
              <SaintOfTheDayView
                currentMonth={parseInt(currentDateStr.split('-')[1], 10)}
                currentDay={parseInt(currentDateStr.split('-')[2], 10)}
              />
            )}

            {/* 3. Catechism of the Catholic Church & Magisterium */}
            {activeTab === 'catechism' && (
              <CatechismView
                currentReading={currentMassReading}
                currentDateStr={currentDateStr}
                onSelectDate={(newDate) => setCurrentDateStr(newDate)}
              />
            )}

            {/* Magisterium AI (Official Church Teaching, CCC, Canon Law & Councils) */}
            {activeTab === 'magisterium-ai' && (
              <MagisteriumAIView
                onOpenCatholicAI={() => handleSelectTab('catholic-ai')}
              />
            )}

            {/* Catholic AI Assistant (Scripture, Catechism, Tradition & Patristics Research) */}
            {activeTab === 'catholic-ai' && <CatholicAIAssistantView />}

            {/* 4. Divine Office (Liturgy of the Hours) */}
            {activeTab === 'divine-office' && <DivineOfficeView currentDateStr={currentDateStr} />}

            {/* Catholic Bibles (73-Book In-App Bibles & Modern Catholic Translations) */}
            {activeTab === 'catholic-bibles' && <CatholicBiblesView />}

            {/* 6. Visio Divina */}
            {activeTab === 'visio-divina' && (
              <VisioDivinaView
                onOpenArtViewer={handleOpenArtFromReadings}
              />
            )}

            {/* 6. Wisdom of the Saints */}
            {activeTab === 'wisdom' && <WisdomTreasuryView />}

            {/* Quotations */}
            {activeTab === 'quotations' && <QuotationsView />}

            {/* In-App Spiritual Books Reader */}
            {activeTab === 'spiritual-books' && <SpiritualBooksReaderView />}

            {/* Catholic Podcasts Hub */}
            {activeTab === 'catholic-podcasts' && (
              <CatholicPodcastsView 
                currentPlayingEpisode={currentPlayingEpisode}
                isPlaying={isPlayingPodcast}
                onPlayEpisode={handlePlayPodcast}
                onPauseEpisode={handlePausePodcast}
                onOpenDetailsModal={(ep) => setPodcastModalEpisode(ep)}
                onOpenFio={() => handleSelectTab('fio-audio')}
              />
            )}

            {/* Fio.fm Integrated Catholic Audio Player */}
            {activeTab === 'fio-audio' && (
              <FioAudioView
                onStopSanctumAudio={() => {
                  if (isPlayingPodcast) {
                    handlePausePodcast();
                  }
                  SacredReader.stop();
                }}
              />
            )}

            {/* Worldwide Holy Mass and Vatican Livestreams Video Player */}
            {activeTab === 'live-mass' && (
              <HolyMassLivePlayerView 
                currentReading={currentMassReading}
              />
            )}

            {/* Nearby Mass, Confession & Adoration Finder */}
            {activeTab === 'parish-finder' && <ParishFinderView />}

            {/* 7. Vatican News */}
            {activeTab === 'vatican-news' && (
              <div className="max-w-4xl mx-auto space-y-6 pb-12">
                <CatholicNewsView 
                  currentDateStr={currentDateStr}
                  initialArticleId={activeVaticanArticleId}
                  onClearInitialArticle={() => setActiveVaticanArticleId(null)}
                  onSelectDate={(newDate) => setCurrentDateStr(newDate)}
                />
              </div>
            )}

            {/* Catholic Articles (9 Catholic RSS Feeds) */}
            {activeTab === 'catholic-articles' && (
              <CatholicArticlesView
                initialSourceId={activeCatholicArticleSourceId}
                initialArticleId={activeCatholicArticleId}
                onClearInitialArticle={() => {
                  setActiveCatholicArticleSourceId(null);
                  setActiveCatholicArticleId(null);
                }}
              />
            )}

            {/* Catholic Social (EWTN, Facebook, Instagram & Christendom) */}
            {activeTab === 'catholic-social' && (
              <CatholicSocialView />
            )}

            {/* 8. Catholic Glossary */}
            {activeTab === 'catholic-glossary' && (
              <div className="max-w-4xl mx-auto space-y-6 pb-12">
                <CatholicTermView />
              </div>
            )}

            {/* 9. Treasury of Prayers */}
            {activeTab === 'treasury-prayers' && (
              <PrayerWallAndTreasuryView initialSection="treasury" />
            )}

            {/* 10. Rosary and Chaplet */}
            {activeTab === 'rosary' && <RosaryAndChapletView />}

            {/* Eucharistic Miracles */}
            {activeTab === 'eucharistic-miracles' && (
              <EucharisticCatechismView initialSection="miracles" />
            )}

            {/* Marian Messages and Apparitions */}
            {activeTab === 'medjugorje' && <MarianApparitionsView />}

            {/* Catholic Prophecy & End Times Archive */}
            {activeTab === 'catholic-prophecy' && <CatholicProphecyView />}

            {/* 11. Novena Tracker */}
            {activeTab === 'novenas' && (
              <NovenaTrackerView currentDateStr={currentDateStr} />
            )}

            {/* 12. Church Calendar */}
            {activeTab === 'calendar' && (
              <ChurchCalendarView
                selectedDateStr={currentDateStr}
                onSelectDate={(d) => {
                  setCurrentDateStr(d);
                  handleSelectTab('readings');
                }}
                onOpenCebuParishes={() => setIsCebuParishesOpen(true)}
              />
            )}

            {/* Church History Timeline and Global Catholic Infographics */}
            {activeTab === 'church-history' && <ChurchHistoryInfographicView />}

            {/* 13. Bible Study (commentary) */}
            {activeTab === 'bible-study' && (
              <CommentaryView
                currentGospelCitation={currentMassReading.gospel.citation}
                currentReading={currentMassReading}
                onSelectDate={(date) => setCurrentDateStr(date)}
              />
            )}

            {/* Bible Verse and Passage Memorization Flashcards Tool */}
            {activeTab === 'bible-flashcards' && <BibleFlashcardsView />}

            {/* 14. Sacred Art Gallery */}
            {activeTab === 'sacred-art' && (
              <SacredArtView initialArtId={selectedArtId} />
            )}

            {/* 15. Prayer Requests */}
            {activeTab === 'prayer-requests' && (
              <PrayerWallAndTreasuryView initialSection="wall" />
            )}

            {/* 16. In Memoriam (Deceased Priests, Former Seminarians & Laity) */}
            {activeTab === 'in-memoriam' && <InMemoriamView />}

            {/* 17. Catholic Links */}
            {activeTab === 'catholic-links' && <CatholicLinksView />}

            {/* 17. Spiritual Checklist (Bottom of Index) */}
            {activeTab === 'piety-dashboard' && (
              <PersonalPietyDashboard
                currentDateStr={currentDateStr}
                onOpenCebuParishes={() => setIsCebuParishesOpen(true)}
                onOpenAngelus={() => setIsAngelusOpen(true)}
                onOpenAdoration={() => setIsAdorationOpen(true)}
              />
            )}
          </main>
        </div>
      </div>

        {/* Reverent Catholic Footer */}
        <footer className="bg-stone-950/85 backdrop-blur-xl text-stone-300 border-t border-amber-500/20 mt-10 sm:mt-24 pt-10 pb-24 sm:py-16 text-xs shadow-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <button 
                  onClick={() => setIsAdorationOpen(true)}
                  className={`w-11 h-11 flex items-center justify-center text-amber-200 text-xl shadow-md transition-all duration-300 hover:scale-105 cursor-pointer bg-[#120A05] ${activeColorTheme.bgGradient} ${activeFrame.previewClass} overflow-hidden border border-[#8B5A2B]/70 shrink-0 mt-0.5`}
                  title="Soul Sanctum Altar"
                >
                  {currentEmblem.id === 'eucharist-monstrance' ? (
                    <GoldenMonstranceIcon className="w-7 h-7 drop-shadow-md text-amber-200" />
                  ) : currentEmblem.id === 'mary-blessed-sacrament' ? (
                    <MaryAndBlessedSacramentIcon className="w-7 h-7 drop-shadow-md text-amber-200" />
                  ) : (
                    <span>{currentEmblem.symbol}</span>
                  )}
                </button>
                <div className="space-y-1.5 min-w-0">
                  <div className="relative inline-block">
                    <div 
                      className="absolute -inset-x-3 -inset-y-1 bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.4)_0%,rgba(245,158,11,0.18)_45%,transparent_75%)] blur-md pointer-events-none -z-10" 
                      aria-hidden="true" 
                    />
                    <span 
                      className="font-cinzel text-base font-bold tracking-[0.18em] text-white/95 block"
                      style={{
                        textShadow: '0 0 12px rgba(253, 224, 71, 0.9), 0 0 24px rgba(251, 191, 36, 0.7)',
                        filter: 'drop-shadow(0 0 10px rgba(251, 191, 36, 0.6))'
                      }}
                    >
                      SOUL SANCTUM
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm text-stone-300 font-serif-sacred whitespace-normal sm:whitespace-nowrap leading-relaxed">
                      Faith is to believe what you do not yet see; the reward for this faith is to see what you believe.
                    </p>
                    <p className="text-xs font-serif-sacred font-bold text-[#D4AF37] text-left">
                      St. Augustine
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Footer Navigation Links */}
            <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-3.5 text-stone-300 font-serif-sacred text-center">
              {/* 1. Holy Mass Live */}
              <button 
                onClick={() => handleSelectTab('live-mass')} 
                className="hover:text-amber-300 cursor-pointer transition-colors"
              >
                Holy Mass Live
              </button>
              <span>•</span>



              {/* 3. Treasury of Prayers */}
              <button 
                onClick={() => handleSelectTab('treasury-prayers')} 
                className="hover:text-amber-300 cursor-pointer transition-colors"
              >
                Treasury of Prayers
              </button>
              <span>•</span>

              {/* 4. The Angelus */}
              <button 
                onClick={() => setIsAngelusOpen(true)} 
                className="hover:text-amber-300 cursor-pointer transition-colors"
              >
                The Angelus
              </button>
              <span>•</span>

              {/* 5. Catholic Podcasts */}
              <button 
                onClick={() => handleSelectTab('catholic-podcasts')} 
                className="hover:text-amber-300 cursor-pointer transition-colors"
              >
                Catholic Podcasts
              </button>
              <span>•</span>

              {/* 5b. Fio.fm Audio */}
              <button 
                onClick={() => handleSelectTab('fio-audio')} 
                className="hover:text-amber-300 cursor-pointer transition-colors"
              >
                Fio.fm Audio
              </button>
              <span>•</span>

              {/* 5c. Magisterium AI */}
              <button 
                onClick={() => handleSelectTab('magisterium-ai')} 
                className="hover:text-amber-300 cursor-pointer transition-colors"
              >
                Magisterium AI
              </button>
              <span>•</span>

              {/* 6. Prayer Requests */}
              <button 
                onClick={() => handleSelectTab('prayer-requests')} 
                className="hover:text-amber-300 cursor-pointer transition-colors"
              >
                Prayer Requests
              </button>
              <span>•</span>

              {/* 7. Daily Reminders */}
              <button 
                onClick={() => setIsNotificationsOpen(true)} 
                className="hover:text-amber-300 cursor-pointer transition-colors"
              >
                Daily Reminders
              </button>
              <span>•</span>

              {/* 8. Holy Mass and Confession Schedules */}
              <button 
                onClick={() => setIsCebuParishesOpen(true)} 
                className="hover:text-amber-300 cursor-pointer transition-colors"
              >
                Holy Mass and Confession Schedules
              </button>
              <span>•</span>

              {/* 9. Contact */}
              <button
                type="button"
                onClick={() => setShowContactEmail((prev) => !prev)}
                className="hover:text-[#FFD700] transition-colors cursor-pointer text-[#D4AF37] font-medium"
              >
                Contact
              </button>

              {showContactEmail && (
                <div className="w-full pt-1 flex items-center justify-center">
                  <a
                    href="mailto:justdust_sd@yahoo.com"
                    className="text-xs sm:text-sm font-serif-sacred text-white hover:underline transition-all"
                  >
                    justdust_sd@yahoo.com
                  </a>
                </div>
              )}
            </div>
          </div>
        </footer>

      </div>

      {/* Global Modals */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      <AngelusModal
        isOpen={isAngelusOpen}
        onClose={() => setIsAngelusOpen(false)}
      />

      <SanctumAdorationModal
        isOpen={isAdorationOpen}
        onClose={() => setIsAdorationOpen(false)}
        activeImageId={activeEstablishingImageId}
        onSelectImage={handleSelectEstablishingImage}
      />

      <CebuParishesModal
        isOpen={isCebuParishesOpen}
        onClose={() => setIsCebuParishesOpen(false)}
      />

      {/* PWA Offline Connectivity Indicator */}
      <OfflineIndicator />

      {/* Catholic Podcast Floating Bottom Player Bar */}
      {currentPlayingEpisode && (
        <PodcastPlayerBar
          episode={currentPlayingEpisode}
          isPlaying={isPlayingPodcast}
          onTogglePlay={() => {
            if (isPlayingPodcast) {
              handlePausePodcast();
            } else {
              handlePlayPodcast(currentPlayingEpisode);
            }
          }}
          onClose={handleClosePodcastPlayer}
          onOpenDetails={(ep) => setPodcastModalEpisode(ep)}
          onSeek={handleSeekPodcast}
          currentTime={podcastCurrentTime}
          duration={podcastDuration}
          playbackRate={podcastPlaybackRate}
          onChangePlaybackRate={handleChangePlaybackRate}
          audioMode={podcastAudioMode}
          onToggleAudioMode={handleToggleAudioMode}
        />
      )}

      {/* Catholic Podcast Episode Study Guide and Notes Modal */}
      <PodcastEpisodeModal
        episode={podcastModalEpisode}
        isOpen={!!podcastModalEpisode}
        onClose={() => setPodcastModalEpisode(null)}
        isPlaying={isPlayingPodcast && currentPlayingEpisode?.id === podcastModalEpisode?.id}
        onTogglePlay={() => {
          if (!podcastModalEpisode) return;
          if (isPlayingPodcast && currentPlayingEpisode?.id === podcastModalEpisode.id) {
            handlePausePodcast();
          } else {
            handlePlayPodcast(podcastModalEpisode);
          }
        }}
      />

    </div>
  );
}
