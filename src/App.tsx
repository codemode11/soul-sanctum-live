import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Navigation, ActiveTab } from './components/Navigation';
import { DailyMassReadingsView } from './components/DailyMassReadingsView';
import { CatechismView } from './components/CatechismView';
import { SaintOfTheDayView } from './components/SaintOfTheDayView';
import { RosaryAndChapletView } from './components/RosaryAndChapletView';
import { NovenaTrackerView } from './components/NovenaTrackerView';
import { ChurchCalendarView } from './components/ChurchCalendarView';
import { WisdomTreasuryView } from './components/WisdomTreasuryView';
import { CommentaryView } from './components/CommentaryView';
import { SacredArtView } from './components/SacredArtView';
import { SacredMusicView } from './components/SacredMusicView';
import { CatholicTermView } from './components/CatholicTermView';
import { CatholicNewsView } from './components/CatholicNewsView';
import { PrayerWallAndTreasuryView } from './components/PrayerWallAndTreasuryView';
import { NotificationsModal } from './components/NotificationsModal';
import { AngelusModal } from './components/AngelusModal';
import { EmblemSelectorModal } from './components/EmblemSelectorModal';
import { SanctumAdorationModal } from './components/SanctumAdorationModal';
import { ReflectionView } from './components/ReflectionView';
import { VisioDivinaView } from './components/VisioDivinaView';
import { CebuParishesModal } from './components/CebuParishesModal';
import { MedjugorjeMessagesView } from './components/MedjugorjeMessagesView';
import { MarianApparitionsView } from './components/MarianApparitionsView';
import { SpiritualBooksReaderView } from './components/SpiritualBooksReaderView';
import { CatholicPodcastsView } from './components/CatholicPodcastsView';
import { PodcastPlayerBar } from './components/PodcastPlayerBar';
import { PodcastEpisodeModal } from './components/PodcastEpisodeModal';
import { EucharisticCatechismView } from './components/EucharisticCatechismView';
import { HolyMassLivePlayerView } from './components/HolyMassLivePlayerView';
import { BibleFlashcardsView } from './components/BibleFlashcardsView';
import { ChurchHistoryInfographicView } from './components/ChurchHistoryInfographicView';
import { CatholicLinksView } from './components/CatholicLinksView';
import { PersonalPietyDashboard } from './components/PersonalPietyDashboard';
import { PodcastEpisode } from './types';
import { getTopVaticanHeadline } from './data/news';
import { SacredReader } from './utils/speech';

import { getMassReadingsForDate } from './data/massReadings';
import { LITURGICAL_COLORS_INFO } from './data/liturgicalCalendar';
import { 
  getSavedEmblem, 
  saveEmblem, 
  SacredEmblem,
  getSavedIconStyle,
  saveIconStyle,
  IconStyleConfig,
  ICON_COLOR_THEMES,
  ICON_FRAME_STYLES
} from './data/emblems';
import { Sparkles, Smartphone, Wifi, BatteryCharging } from 'lucide-react';
import { MaryAndBlessedSacramentIcon, GoldenMonstranceIcon } from './components/SanctumIcons';
import { NIEPOKALANOW_HIGH_RES_IMAGES, NiepokalanowHighResImage } from './data/sacredArt';
import { AndroidAppModal } from './components/AndroidAppModal';
import { AndroidBottomNav, OfflineIndicator } from './components/AndroidBottomNav';

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
  const [activeTab, setActiveTab] = useState<ActiveTab>('readings');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isAngelusOpen, setIsAngelusOpen] = useState(false);
  const [isEmblemSelectorOpen, setIsEmblemSelectorOpen] = useState(false);
  const [isAdorationOpen, setIsAdorationOpen] = useState(false);
  const [isCebuParishesOpen, setIsCebuParishesOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAndroidModalOpen, setIsAndroidModalOpen] = useState(false);
  const [isAndroidPreviewMode, setIsAndroidPreviewMode] = useState(false);
  const [showContactEmail, setShowContactEmail] = useState(false);
  const [currentEmblem, setCurrentEmblem] = useState<SacredEmblem>(getSavedEmblem);
  const [iconStyleConfig, setIconStyleConfig] = useState<IconStyleConfig>(getSavedIconStyle);
  const [selectedArtId, setSelectedArtId] = useState<string | undefined>(undefined);
  const [activeEstablishingImageId, setActiveEstablishingImageId] = useState<string>(() => {
    try {
      const stored = localStorage.getItem('sanctum_establishing_image_v3');
      if (!stored || stored === 'supper-at-emmaus' || stored === 'star-of-the-immaculate' || stored === 'cathedral-sanctum-adoration') {
        localStorage.setItem('sanctum_establishing_image_v3', 'unsplash-eucharistic-adoration');
        return 'unsplash-eucharistic-adoration';
      }
      return stored;
    } catch {
      return 'unsplash-eucharistic-adoration';
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

  // Handle Android Home Screen App Shortcut deep links (?tab=readings, ?tab=rosary, ?tab=saints, ?tab=spiritual-books, etc.)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedTab = params.get('tab') as ActiveTab | null;
    if (requestedTab) {
      setActiveTab(requestedTab);
      setTimeout(() => {
        const el = document.getElementById('main-content-area');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 250);
    }
  }, []);

  const activeEstablishingImage =
    NIEPOKALANOW_HIGH_RES_IMAGES.find((img) => img.id === activeEstablishingImageId) ||
    NIEPOKALANOW_HIGH_RES_IMAGES[0];

  const handleSelectEstablishingImage = (img: NiepokalanowHighResImage) => {
    setActiveEstablishingImageId(img.id);
    try {
      localStorage.setItem('sanctum_establishing_image_v3', img.id);
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

  // Top Vatican Headline for the masthead
  const topVaticanHeadline = getTopVaticanHeadline(currentDateStr);
  const [activeVaticanArticleId, setActiveVaticanArticleId] = useState<string | null>(null);

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

  const handleSelectTab = (tab: ActiveTab) => {
    setActiveTab(tab);

    if (mainContentRef.current) {
      const rect = mainContentRef.current.getBoundingClientRect();
      const absoluteTop = rect.top + window.pageYOffset;
      const targetY = Math.max(0, absoluteTop - 80);

      if (window.scrollY > targetY) {
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenArtFromReadings = (artId: string) => {
    setSelectedArtId(artId);
    handleSelectTab('sacred-art');
  };

  return (
    <div className="min-h-screen relative flex flex-col bg-stone-950 text-stone-900 selection:bg-amber-300 selection:text-amber-950">
      
      {/* Fixed Full-Website Sacred Sanctum Background: Framed proportionally for mobile portrait & desktop */}
      <div
        className={`fixed inset-0 z-0 select-none pointer-events-none overflow-hidden flex flex-col items-center justify-start ${
          isAndroidPreviewMode ? 'max-w-[430px] mx-auto px-0' : 'px-0 sm:px-6 lg:px-8'
        }`}
      >
        {/* Enlarged and Centered Image Container with GPU-Accelerated Smooth Vertical-Only Parallax */}
        <div 
          ref={imageParallaxRef}
          className="relative w-full max-w-7xl mx-auto flex items-start justify-center overflow-hidden will-change-transform backface-hidden"
        >
          {activeEstablishingImage.id === 'unsplash-eucharistic-adoration' ? (
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
                className={`${
                  isAndroidPreviewMode
                    ? 'w-[150%] -mt-[16%]'
                    : 'w-[150%] -mt-[16%] sm:w-[130%] sm:-mt-[20%] lg:w-[120%] lg:-mt-[24.5%]'
                } max-w-none h-auto block brightness-[1.06] contrast-[1.06] transform-gpu shrink-0`}
              />
              {/* Subtle bottom edge feathering so the priest remains completely visible */}
              <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-stone-950/75 to-transparent pointer-events-none" />
            </div>
          ) : (
            <div className="relative w-full h-[55vh] lg:h-[100vh] -mt-6 lg:-mt-20 flex items-center justify-center overflow-hidden transform-gpu">
              <img
                src={activeEstablishingImage.imageUrl}
                alt={activeEstablishingImage.title}
                decoding="async"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.src = 'https://images.unsplash.com/photo-1599752766954-57c001ba82cc?q=80&w=1471&auto=format&fit=crop';
                }}
                className="w-full h-full mx-auto object-contain object-center pt-2 sm:pt-3 brightness-[0.99] contrast-[1.08] transform-gpu"
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
        <div className="absolute inset-0 bg-stone-950/5" />
        {/* Seamless vertical gradient fade */}
        <div 
          ref={gradientOverlayRef}
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-stone-950/80 pointer-events-none will-change-[opacity]"
        />
        {/* Symmetrical left and right vignettes to frame the altar equally */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(12,10,9,0.35)_0%,transparent_10%,transparent_90%,rgba(12,10,9,0.35)_100%)] pointer-events-none" />
        {/* Warm altar candlelight glow extending across bottom contents with gentle parallax rise */}
        <div 
          ref={candleGlowRef}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(217,119,6,0.14)_0%,transparent_65%)] pointer-events-none will-change-transform" 
        />
      </div>

      {/* Foreground Container with Frosted Glass Transparency and Sacred Ambiance */}
      <div
        className={`relative z-10 flex flex-col min-h-screen transition-all duration-300 ${
          isAndroidPreviewMode
            ? 'max-w-[430px] w-full mx-auto border-x-2 border-amber-500/45 shadow-[0_0_90px_rgba(0,0,0,0.95)] bg-stone-950/45 backdrop-blur-[2px] pb-20'
            : 'pb-16 lg:pb-0'
        }`}
      >
        {/* Android Status Bar when Android Phone Mode is active */}
        {isAndroidPreviewMode && (
          <div className="sticky top-0 z-50 flex items-center justify-between px-3.5 py-1.5 bg-[#120904]/95 border-b border-amber-500/30 text-[11px] font-serif text-amber-200 select-none backdrop-blur-md">
            <div className="flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-cinzel font-bold tracking-wider text-amber-100">
                SOUL SANCTUM • ANDROID
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsAndroidModalOpen(true)}
                className="px-2 py-0.5 rounded bg-amber-800/70 hover:bg-amber-700 text-amber-100 text-[10px] font-bold cursor-pointer"
              >
                APK / Install
              </button>
              <button
                type="button"
                onClick={() => setIsAndroidPreviewMode(false)}
                className="px-2 py-0.5 rounded bg-stone-800 hover:bg-stone-700 text-stone-200 text-[10px] cursor-pointer"
              >
                Desktop View
              </button>
              <Wifi className="w-3 h-3 text-emerald-400" />
              <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>
        )}
        
        {/* Masthead Section: Compact with minimal negative space on mobile phones & desktop */}
        <div
          className={`w-full flex flex-col justify-start ${
            isAndroidPreviewMode ? 'pb-1.5' : 'pb-2 lg:pb-5'
          }`}
        >
          {/* Sacred Top Header */}
          <Header
            currentDateStr={currentDateStr}
            liturgicalColor={currentMassReading.liturgicalColor}
            liturgicalTitle={currentMassReading.liturgicalDay}
            onOpenAngelus={() => setIsAngelusOpen(true)}
            onSelectDate={(newDate) => setCurrentDateStr(newDate)}
            activeEmblem={currentEmblem}
            onOpenEmblemSelector={() => setIsEmblemSelectorOpen(true)}
            iconStyleConfig={iconStyleConfig}
            onOpenArtViewer={handleOpenArtFromReadings}
            onOpenAdoration={() => setIsAdorationOpen(true)}
            onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            activeEstablishingImageId={activeEstablishingImageId}
            onSelectEstablishingImage={handleSelectEstablishingImage}
            onOpenAndroidModal={() => setIsAndroidModalOpen(true)}
            isAndroidPreviewMode={isAndroidPreviewMode}
          />

          {/* Main Story: Vatican News Masthead Dispatch — Tightly positioned with no excess negative space */}
          <div
            className={`max-w-7xl w-full mx-auto ${
              isAndroidPreviewMode
                ? 'px-3 mt-2'
                : 'px-3 sm:px-6 lg:px-8 mt-2 sm:mt-3 lg:mt-8'
            }`}
          >
            <div
              className={`w-full max-w-4xl mx-auto rounded-xl bg-black/80 hover:bg-black/90 border border-amber-500/50 hover:border-amber-400 text-amber-100 backdrop-blur-2xl shadow-[0_12px_50px_rgba(0,0,0,0.92)] transition-all text-center ${
                isAndroidPreviewMode
                  ? 'py-2.5 px-3.5 space-y-1'
                  : 'py-3 px-4 sm:py-4 sm:px-7 space-y-1 sm:space-y-2'
              }`}
            >
              <div className="flex items-center justify-center">
                <span className="font-cinzel text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-amber-300">
                  FROM THE VATICAN
                </span>
              </div>
              
              {/* Lead Headline: Wraps up to 2 lines cleanly on mobile phones; single line on large desktop */}
              <h2 
                onClick={() => {
                  setActiveVaticanArticleId(topVaticanHeadline.id);
                  handleSelectTab('vatican-news');
                }}
                className={`font-serif font-extrabold text-white hover:text-amber-200 leading-snug max-w-full mx-auto drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)] tracking-tight cursor-pointer transition-colors -mt-0.5 ${
                  isAndroidPreviewMode
                    ? 'text-sm sm:text-base line-clamp-2 whitespace-normal'
                    : 'text-sm sm:text-xl md:text-2xl lg:text-3xl font-extrabold line-clamp-2 lg:whitespace-nowrap lg:overflow-hidden lg:text-ellipsis'
                }`}
              >
                {topVaticanHeadline.title}
              </h2>

              <p
                className={`text-stone-200 font-serif italic max-w-3xl mx-auto leading-relaxed ${
                  isAndroidPreviewMode
                    ? 'text-xs line-clamp-2 pt-0.5'
                    : 'text-xs sm:text-base line-clamp-2 pt-0.5'
                }`}
              >
                {topVaticanHeadline.subtitle || topVaticanHeadline.summary}
              </p>

              <div className="pt-1 flex items-center justify-end">
                <button
                  onClick={() => {
                    setActiveVaticanArticleId(topVaticanHeadline.id);
                    handleSelectTab('vatican-news');
                  }}
                  className={`inline-flex items-center rounded-lg bg-[#A67C52] hover:bg-[#966B43] border border-[#C49B6E]/60 text-amber-50 font-cinzel font-bold tracking-wider uppercase transition-all shadow-[0_4px_18px_rgba(166,124,82,0.4)] hover:scale-102 cursor-pointer ${
                    isAndroidPreviewMode
                      ? 'px-3 py-1 text-[10px]'
                      : 'px-3.5 py-1.5 sm:px-5 sm:py-2 text-[10px] sm:text-xs'
                  }`}
                  title="Read this full Vatican News report"
                >
                  <span>Read Full Story</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Body Layout: Immediately follows the masthead with zero wasted negative space */}
        <div
          className={`flex-1 max-w-7xl w-full mx-auto flex flex-col items-center ${
            isAndroidPreviewMode
              ? 'px-3 pt-1.5 pb-16'
              : 'px-3 sm:px-6 lg:px-8 pt-2 sm:pt-4 lg:pt-6 pb-16 sm:pb-24'
          }`}
        >
          
          {/* Dual Column Container: Left Navigation Index + Centered Main View */}
          <div 
            ref={mainContentRef}
            id="main-content-area"
            className={`w-full flex ${
              isAndroidPreviewMode ? 'flex-col gap-2.5' : 'flex-col lg:flex-row gap-3 lg:gap-8'
            } items-start justify-center mt-0`}
          >
            
            {/* Left-Side Liturgical Menu / Mobile Compact Strip */}
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
              isAndroidPreviewMode={isAndroidPreviewMode}
            />

            {/* Centered Main Content Area */}
            <main className="flex-1 w-full min-w-0 max-w-4xl">

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

            {/* 3. Reflection (Daily Liturgical Meditation) */}
            {activeTab === 'reflection' && (
              <ReflectionView
                reading={currentMassReading}
                onSelectDate={(date) => setCurrentDateStr(date)}
              />
            )}

            {/* 4. Visio Divina */}
            {activeTab === 'visio-divina' && (
              <VisioDivinaView
                onOpenArtViewer={handleOpenArtFromReadings}
              />
            )}

            {/* 5. Catechism (CCC removed) */}
            {activeTab === 'catechism' && <CatechismView />}

            {/* 6. Wisdom of the Saints */}
            {activeTab === 'wisdom' && <WisdomTreasuryView />}

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
              />
            )}

            {/* Worldwide Holy Mass and Vatican Livestreams Video Player */}
            {activeTab === 'live-mass' && (
              <HolyMassLivePlayerView currentReading={currentMassReading} />
            )}

            {/* 7. Vatican News */}
            {activeTab === 'vatican-news' && (
              <div className="max-w-4xl mx-auto space-y-6 pb-12">
                <CatholicNewsView 
                  currentDateStr={currentDateStr}
                  initialArticleId={activeVaticanArticleId}
                  onClearInitialArticle={() => setActiveVaticanArticleId(null)}
                />
              </div>
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

            {/* 16. Catholic Links */}
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
        <footer className="bg-stone-950/85 backdrop-blur-xl text-stone-300 border-t border-amber-500/20 mt-16 sm:mt-24 py-12 sm:py-16 text-xs shadow-2xl">
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
                <div className="space-y-1.5">
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
                    <p className="text-xs sm:text-sm text-stone-300 font-serif-sacred whitespace-nowrap">
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

              {/* 8. Cebu Parishes Schedules */}
              <button 
                onClick={() => setIsCebuParishesOpen(true)} 
                className="hover:text-amber-300 cursor-pointer transition-colors"
              >
                Cebu Parishes Schedules
              </button>
              <span>•</span>

              {/* 9. Android Mobile App */}
              <button 
                onClick={() => setIsAndroidModalOpen(true)} 
                className="hover:text-amber-300 cursor-pointer transition-colors text-amber-200 font-semibold"
              >
                Android App
              </button>
              <span>•</span>

              {/* 10. Contact */}
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

      <EmblemSelectorModal
        isOpen={isEmblemSelectorOpen}
        onClose={() => setIsEmblemSelectorOpen(false)}
        selectedEmblem={currentEmblem}
        onSelectEmblem={(emblem) => {
          setCurrentEmblem(emblem);
          saveEmblem(emblem.id);
        }}
        iconStyleConfig={iconStyleConfig}
        onUpdateIconStyle={(newConfig) => {
          setIconStyleConfig(newConfig);
          saveIconStyle(newConfig);
        }}
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

      {/* Offline Indicator & Android Mobile Bottom Navigation Bar */}
      <OfflineIndicator />
      <AndroidBottomNav
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onOpenIndexDrawer={() => setIsMobileMenuOpen(true)}
        onOpenAndroidModal={() => setIsAndroidModalOpen(true)}
        isAndroidPreviewMode={isAndroidPreviewMode}
        onToggleAndroidPreviewMode={() => setIsAndroidPreviewMode((prev) => !prev)}
      />

      {/* Soul Sanctum for Android Installation & APK Builder Modal */}
      <AndroidAppModal
        isOpen={isAndroidModalOpen}
        onClose={() => setIsAndroidModalOpen(false)}
        isAndroidPreviewMode={isAndroidPreviewMode}
        onToggleAndroidPreviewMode={() => setIsAndroidPreviewMode((prev) => !prev)}
      />

    </div>
  );
}
