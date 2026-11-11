import React, { useRef, useLayoutEffect, useState, useEffect, useCallback } from 'react';
import { 
  BookOpen, 
  Library,
  Sparkles,
  Quote, 
  Eye, 
  Scroll, 
  Globe, 
  BookMarked, 
  Heart, 
  Flame, 
  Calendar as CalendarIcon, 
  Image as ImageIcon,
  HeartHandshake, 
  BellRing,
  ShieldCheck,
  ChevronRight,
  Layers,
  Star,
  Tv,
  X,
  BookmarkCheck,
  Landmark,
  Rss
} from 'lucide-react';
import { 
  SaintWithHaloIcon,
  RightFacingQuoteIcon,
  BetterScrollIcon,
  DoveWithHaloIcon,
  ThreePrayerBooksIcon,
  RosaryAndChapletIcon,
  MaryPrayingOutlineIcon,
  NovenaHands9Icon,
  BibleStudyHighlightedIcon,
  KneelingAdorationIcon,
  ThreePersonsPrayingIcon,
  CatholicPodcastNavIcon,
  GoldenMonstranceIcon,
  EucharisticMonstranceNavIcon,
  NotebookWithBallpenIcon,
  HolyWaterIcon,
  QuotationsRightFacingIcon,
  MassReadingsBookFlipIcon,
  ChurchTimelineIcon,
  VisioDivinaEyeBlinkIcon,
  BibleFlashcardsIcon,
  SpiritualClassicsBooksIcon,
  HolyMassLiveTvAltarIcon,
  StPetersBasilicaIcon,
  CatholicGlossaryBookIcon,
  ChurchCalendarPageFlipIcon,
  SacredArtGallerySwapIcon,
  CatholicLinksTightenIcon,
  DivineOfficeBreviaryIcon,
  CatholicBiblesBookIcon,
  CatholicArticlesRssIcon,
  CatholicSocialShareIcon
} from './SanctumIcons';

export type ActiveTab = 
  | 'readings'
  | 'saints'
  | 'catechism'
  | 'catholic-ai'
  | 'divine-office'
  | 'catholic-bibles'
  | 'reflection'
  | 'visio-divina'
  | 'wisdom'
  | 'quotations'
  | 'spiritual-books'
  | 'catholic-podcasts'
  | 'live-mass'
  | 'vatican-news'
  | 'catholic-articles'
  | 'catholic-social'
  | 'catholic-glossary'
  | 'treasury-prayers'
  | 'rosary'
  | 'eucharistic-miracles'
  | 'medjugorje'
  | 'novenas'
  | 'calendar'
  | 'church-history'
  | 'councils'
  | 'bible-study'
  | 'bible-flashcards'
  | 'sacred-art'
  | 'prayer-requests'
  | 'in-memoriam'
  | 'catholic-links'
  | 'piety-dashboard';

interface NavigationProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenNotifications: () => void;
  activeNovenasCount?: number;
  isMobileOpen?: boolean;
  onOpenMobile?: () => void;
  onCloseMobile?: () => void;
  onOpenAdoration?: () => void;
  isAndroidPreviewMode?: boolean;
}

export interface NavItem {
  id: ActiveTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  tag?: string;
  badge?: number;
  subtext?: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
  onOpenNotifications,
  activeNovenasCount = 2,
  isMobileOpen = false,
  onOpenMobile,
  onCloseMobile,
  onOpenAdoration,
  isAndroidPreviewMode = false
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const sliderTrackRef = useRef<HTMLDivElement>(null);
  const scrollPosRef = useRef<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isDraggingSlider, setIsDraggingSlider] = useState<boolean>(false);

  const updateProgressFromElement = useCallback((el: HTMLDivElement | null) => {
    if (!el) return;
    const maxScroll = el.scrollHeight - el.clientHeight;
    if (maxScroll <= 0 || el.scrollTop <= 4) {
      setScrollProgress(0);
    } else {
      setScrollProgress(Math.min(1, Math.max(0, el.scrollTop / maxScroll)));
    }
  }, []);

  const handleSidebarScroll = (e: React.UIEvent<HTMLDivElement>) => {
    scrollPosRef.current = e.currentTarget.scrollTop;
    updateProgressFromElement(e.currentTarget);
  };

  useEffect(() => {
    updateProgressFromElement(sidebarRef.current);
    const onResize = () => updateProgressFromElement(sidebarRef.current);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [updateProgressFromElement]);

  const dragOffsetRef = useRef<number>(22);

  const handleSliderPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    const track = sliderTrackRef.current;
    if (!track) return;
    const trackRect = track.getBoundingClientRect();
    const usableHeight = Math.max(1, trackRect.height - 44);

    const target = e.target as HTMLElement;
    const thumb = target.closest('[data-slider-thumb="true"]') as HTMLElement | null;
    if (thumb) {
      const thumbRect = thumb.getBoundingClientRect();
      dragOffsetRef.current = Math.min(44, Math.max(0, e.clientY - thumbRect.top));
    } else {
      dragOffsetRef.current = 22;
    }

    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDraggingSlider(true);

    const clickY = e.clientY - trackRect.top - dragOffsetRef.current;
    const ratio = Math.min(1, Math.max(0, clickY / usableHeight));
    const sidebar = sidebarRef.current;
    if (sidebar) {
      const maxScroll = sidebar.scrollHeight - sidebar.clientHeight;
      sidebar.scrollTop = ratio * maxScroll;
      scrollPosRef.current = sidebar.scrollTop;
    }
    setScrollProgress(ratio);
  };

  const handleSliderPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingSlider) return;
    const track = sliderTrackRef.current;
    const sidebar = sidebarRef.current;
    if (!track || !sidebar) return;
    const trackRect = track.getBoundingClientRect();
    const usableHeight = Math.max(1, trackRect.height - 44);

    const currentY = e.clientY - trackRect.top - dragOffsetRef.current;
    const ratio = Math.min(1, Math.max(0, currentY / usableHeight));

    const maxScroll = sidebar.scrollHeight - sidebar.clientHeight;
    sidebar.scrollTop = ratio * maxScroll;
    scrollPosRef.current = sidebar.scrollTop;
    setScrollProgress(ratio);
  };

  const handleSliderPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingSlider) return;
    setIsDraggingSlider(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  useLayoutEffect(() => {
    if (sidebarRef.current && scrollPosRef.current > 0) {
      sidebarRef.current.scrollTop = scrollPosRef.current;
      updateProgressFromElement(sidebarRef.current);
    }
  }, [activeTab, updateProgressFromElement]);

  // Exact user-specified order of 15 items:
  // 1. Mass Readings
  // 2. Saint of the Day
  // 3. Reflection (Daily Liturgical Meditation)
  // 4. Visio Divina
  // 5. Catechism (without CCC)
  // 6. Wisdom of the Saints
  // 7. Vatican News
  // 8. Catholic Glossary
  // 9. Treasury of Prayers
  // 10. Rosary and Chaplet
  // 11. Novena Tracker
  // 12. Church Calendar
  // Exact user-specified order of 15 items:
  // 1. Mass Readings
  // 2. Saint of the Day (Icon: Head with a halo)
  // 3. Reflection (Icon: Right-facing quotation marks)
  // 4. Visio Divina
  // 5. Catechism (Icon: Better scroll)
  // 6. Wisdom of the Saints (Icon: Bulb with a halo)
  // 7. Vatican News
  // 8. Catholic Glossary
  // 9. Treasury of Prayers (Icon: Hands in prayer 🙏)
  // 10. Rosary and Chaplet (Icon: 10-bead rosary, Chaplet left, Rosary right)
  // 11. Novena Tracker (Icon: Hands in prayer with "1 to 9")
  // 12. Church Calendar
  // 13. Bible Study (commentary) — taking the place of Sacred Art Gallery
  // 14. Sacred Art Gallery
  // 15. Prayer Requests (Icon: Three persons holding hands in prayer)
  const navItems: NavItem[] = [
    { 
      id: 'readings', 
      label: 'Mass Readings', 
      icon: MassReadingsBookFlipIcon, 
      tag: 'Daily', 
      subtext: 'Daily Lectionary and Gospel' 
    },
    { 
      id: 'bible-study', 
      label: 'Bible Commentary', 
      icon: BibleStudyHighlightedIcon, 
      tag: 'Exegesis', 
      subtext: 'Cornelius à Lapide, Catena Aurea and Patristic Study' 
    },
    { 
      id: 'saints', 
      label: 'Saint of the Day', 
      icon: SaintWithHaloIcon, 
      tag: 'Hagiography', 
      subtext: 'Feasts, Lives and Patronages' 
    },
    { 
      id: 'catechism', 
      label: 'Catechism', 
      icon: BetterScrollIcon, 
      tag: 'Doctrine', 
      subtext: 'Pillars of Catholic Faith' 
    },
    { 
      id: 'divine-office', 
      label: 'Divine Office', 
      icon: DivineOfficeBreviaryIcon, 
      tag: 'Breviary', 
      subtext: 'Liturgy of the Hours Text and Audio' 
    },
    { 
      id: 'catholic-bibles', 
      label: 'Holy Bible', 
      icon: CatholicBiblesBookIcon, 
      tag: 'Scripture', 
      subtext: '73-Book WEB-CE, Douay-Rheims, CPDV, Vulgate, NABRE, RSV-CE & ESV-CE' 
    },
    { 
      id: 'bible-flashcards', 
      label: 'Bible Flashcards', 
      icon: BibleFlashcardsIcon, 
      tag: 'Memory', 
      subtext: 'Scripture Memorization and Recall' 
    },
    { 
      id: 'reflection', 
      label: 'Reflection', 
      icon: RightFacingQuoteIcon, 
      tag: 'Meditation', 
      subtext: 'Daily Patristic Meditation' 
    },
    { 
      id: 'visio-divina', 
      label: 'Visio Divina', 
      icon: VisioDivinaEyeBlinkIcon, 
      tag: 'Prayer', 
      subtext: 'Contemplation of Sacred Art' 
    },
    { 
      id: 'wisdom', 
      label: 'Wisdom of the Saints', 
      icon: DoveWithHaloIcon, 
      tag: 'Fathers', 
      subtext: 'Doctors and Popes Treasury' 
    },
    { 
      id: 'quotations', 
      label: 'Quotations', 
      icon: QuotationsRightFacingIcon, 
      tag: 'Quotes', 
      subtext: 'The Holy Trinity, Jesus Christ and The Blessed Virgin Mary' 
    },
    { 
      id: 'spiritual-books', 
      label: 'Spiritual Classics', 
      icon: SpiritualClassicsBooksIcon, 
      tag: 'Reader', 
      subtext: 'In-App Classics and Lectio' 
    },
    { 
      id: 'catholic-podcasts', 
      label: 'Catholic Podcasts', 
      icon: CatholicPodcastNavIcon, 
      tag: 'Audio', 
      subtext: 'Ascension, Word on Fire and Live Audio' 
    },
    { 
      id: 'live-mass', 
      label: 'Holy Mass Live', 
      icon: HolyMassLiveTvAltarIcon, 
      tag: 'Live', 
      subtext: 'St. Peter\'s and Global Sanctuaries' 
    },
    { 
      id: 'vatican-news', 
      label: 'Vatican News', 
      icon: StPetersBasilicaIcon, 
      tag: 'Global', 
      subtext: 'Holy See and Church Updates' 
    },
    { 
      id: 'catholic-articles', 
      label: 'Catholic Articles', 
      icon: CatholicArticlesRssIcon, 
      tag: 'RSS Feeds', 
      subtext: 'St. Paul Center, Catholic Answers, Word on Fire and More' 
    },
    { 
      id: 'catholic-social', 
      label: 'Catholic Social', 
      icon: CatholicSocialShareIcon, 
      tag: 'Social & Media', 
      subtext: 'Catholic Instagram & Christendom.com' 
    },
    { 
      id: 'catholic-glossary', 
      label: 'Catholic Glossary', 
      icon: CatholicGlossaryBookIcon, 
      tag: 'Terms', 
      subtext: 'Theological and Liturgical Terms' 
    },
    { 
      id: 'treasury-prayers', 
      label: 'Treasury of Prayers', 
      icon: ThreePrayerBooksIcon, 
      tag: 'Devotion', 
      subtext: 'Classic Catholic Prayers' 
    },
    { 
      id: 'rosary', 
      label: 'Chaplet and Rosary', 
      icon: RosaryAndChapletIcon, 
      tag: 'Marian', 
      subtext: 'Guided Mysteries and Chaplet' 
    },
    { 
      id: 'eucharistic-miracles', 
      label: 'Eucharistic Miracles', 
      icon: EucharisticMonstranceNavIcon, 
      tag: 'Eucharist', 
      subtext: 'Lanciano, Orvieto, Buenos Aires and Scientific Studies' 
    },
    { 
      id: 'medjugorje', 
      label: 'Marian Apparitions', 
      icon: MaryPrayingOutlineIcon, 
      tag: 'Apparitions', 
      subtext: 'Church-Approved Worldwide Apparitions and Messages' 
    },
    { 
      id: 'novenas', 
      label: 'Novena Tracker', 
      icon: NovenaHands9Icon, 
      subtext: '9-Day Petitions and Intentions' 
    },
    { 
      id: 'calendar', 
      label: 'Church Calendar', 
      icon: ChurchCalendarPageFlipIcon, 
      tag: 'Liturgical', 
      subtext: 'Seasons, Solemnities and Fasts' 
    },
    { 
      id: 'church-history', 
      label: 'Timeline of the Church', 
      icon: ChurchTimelineIcon, 
      tag: 'Councils', 
      subtext: '21 Ecumenical Councils, Popes, and 2,000-Year History' 
    },
    { 
      id: 'sacred-art', 
      label: 'Sacred Art Gallery', 
      icon: SacredArtGallerySwapIcon, 
      tag: 'Masters', 
      subtext: 'Caravaggio, Millet and Altar' 
    },
    { 
      id: 'prayer-requests', 
      label: 'Prayer Requests', 
      icon: ThreePersonsPrayingIcon, 
      tag: 'Wall', 
      subtext: 'Community Intentions Wall' 
    },
    { 
      id: 'in-memoriam', 
      label: 'In Memoriam', 
      icon: HolyWaterIcon, 
      tag: 'Requiem', 
      subtext: 'Deceased Priests, Former Seminarians and Laity' 
    },
    { 
      id: 'catholic-links', 
      label: 'Catholic Links', 
      icon: CatholicLinksTightenIcon, 
      tag: 'Websites', 
      subtext: 'Curated Catholic Websites and Reviews' 
    },
    { 
      id: 'piety-dashboard', 
      label: 'Spiritual Checklist', 
      icon: NotebookWithBallpenIcon, 
      tag: 'Checklist', 
      subtext: 'Customizable Spiritual Checklist' 
    }
  ];

  const currentItem = navItems.find(i => i.id === activeTab) || navItems[0];
  const [massReadingsMidpointPx, setMassReadingsMidpointPx] = useState<number>(77);

  const measureMassReadingsLabelRef = useCallback((labelEl: HTMLSpanElement | null) => {
    if (!labelEl) return;
    const updateMidpoint = () => {
      const w = labelEl.offsetWidth;
      if (w > 0) {
        // Icon box layout width = 36px (visual left inset ~1.26px at 0.93 scale), gap = 12px (total 48px), label scaled by 0.92 from left origin
        const midpoint = (1.26 + 48 + w * 0.92) / 2;
        setMassReadingsMidpointPx(Math.round(midpoint * 10) / 10);
      }
    };
    updateMidpoint();
    if (typeof document !== 'undefined' && 'fonts' in document) {
      (document as Document & { fonts: FontFaceSet }).fonts.ready.then(updateMidpoint).catch(() => {});
    }
  }, []);

  const renderNavList = () => (
    <div className="space-y-3.5">
      {/* Top Sidebar Header with Index aligned with Mass Readings icon */}
      <div 
        className="relative pb-3 pr-2 border-b border-[#D4AF37]/35 flex items-center justify-between"
        style={{ paddingLeft: `max(0.5rem, calc(50% - ${massReadingsMidpointPx + 28}px))` }}
      >
        <span className="font-cinzel text-base sm:text-lg font-bold text-[#FFD700] drop-shadow-[0_0_8px_rgba(212,175,55,0.45)] tracking-[0.2em] uppercase text-left">
          INDEX
        </span>
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={onOpenNotifications}
            className="p-1.5 rounded-lg text-stone-300 hover:text-[#FFD700] hover:bg-white/10 transition-colors cursor-pointer"
            title="Daily Reminders and Liturgical Bells"
            aria-label="Open Notifications"
          >
            <BellRing className="w-4 h-4 text-[#FFD700]" />
          </button>
          <button
            type="button"
            onClick={() => {
              onSelectTab('catholic-ai');
              if (onCloseMobile) onCloseMobile();
            }}
            className={`w-7 h-7 rounded-md transition-all cursor-pointer flex items-center justify-center border ${
              activeTab === 'catholic-ai'
                ? 'bg-[#FFD700] text-stone-950 border-[#FFD700] font-black shadow-[0_0_10px_rgba(255,215,0,0.5)]'
                : 'bg-[#1C120C] text-[#FFD700] border-[#FFD700]/70 hover:bg-[#FFD700]/20'
            }`}
            title="Catholic AI Assistant"
            aria-label="Open Catholic AI Assistant"
          >
            <span className="font-cinzel text-[11px] font-black tracking-tight leading-none">AI</span>
          </button>
        </div>
      </div>

      {/* Unnumbered List: Mass Readings icon + text centered; all other items follow the Mass Readings icon column */}
      <div className="space-y-1.5 pt-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          const isMassReadings = item.id === 'readings';

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onSelectTab(item.id);
                if (onCloseMobile) onCloseMobile();
              }}
              style={{ paddingLeft: `max(0.5rem, calc(50% - ${massReadingsMidpointPx + 28}px))` }}
              className={`w-full flex items-center justify-start pr-2 py-3 rounded-lg cursor-pointer select-none group text-left border transition-colors duration-500 ease-out ${
                isActive
                  ? 'bg-gradient-to-r from-[#C89F72]/40 via-[#D4A373]/30 to-[#B88B5E]/40 text-[#FFF8DC] border-[#FFD700]/60 shadow-[0_0_18px_rgba(212,175,55,0.28)] backdrop-blur-md'
                  : 'text-stone-300 hover:text-[#FFD700] hover:bg-white/10 hover:border-[#FFD700]/30 border-transparent'
              }`}
            >
              {/* Unified Content Wrapper: Mass Readings is centered; all other items follow the Mass Readings icon */}
              <div className="sanctum-nav-item-content flex items-center gap-3 min-w-0 h-9">
                <div className={`sanctum-nav-item-icon-box p-2 rounded-lg transition-colors duration-500 ease-out shrink-0 flex items-center justify-center ${
                  isActive 
                    ? 'bg-[#FFD700]/25 text-[#FFD700] shadow-[0_0_10px_rgba(255,215,0,0.3)]' 
                    : 'bg-white/5 text-stone-400 group-hover:text-[#FFD700] group-hover:bg-[#FFD700]/20 group-hover:shadow-[0_0_10px_rgba(255,215,0,0.25)]'
                }`}>
                  <Icon className={`w-5 h-5 shrink-0 transition-colors duration-500 ease-out ${
                    isActive ? 'text-[#FFD700]' : 'text-stone-400 group-hover:text-[#FFD700]'
                  }`} />
                </div>
                <div className="min-w-0 h-9 flex items-center overflow-visible">
                  <span
                    ref={isMassReadings ? measureMassReadingsLabelRef : undefined}
                    className={`sanctum-nav-item-label ${
                      isMassReadings ? 'sanctum-nav-item-label-readings' : ''
                    } font-serif whitespace-nowrap text-left transition-colors duration-500 ease-out ${
                      isActive
                        ? 'text-[#FFD700]'
                        : 'text-stone-200 group-hover:text-[#FFD700]'
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>


    </div>
  );

  return (
    <>
      {/* 1. Desktop and Tablet Sticky Left-Side Navigation with Music-Style Slider */}
      <aside className="hidden md:block w-72 lg:w-80 shrink-0 sticky top-6 self-start">
        <div className="relative rounded-xl bg-stone-950/80 backdrop-blur-2xl border border-amber-500/25 shadow-[0_20px_50px_rgba(0,0,0,0.85)] text-stone-100 flex flex-col max-h-[calc(100vh-3rem)] overflow-hidden">
          <div className="flex items-stretch flex-1 min-h-0 overflow-hidden">
            <div 
              ref={sidebarRef}
              onScroll={handleSidebarScroll}
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              className="flex-1 p-4 pr-2.5 overflow-y-auto no-scrollbar"
            >
              {renderNavList()}
            </div>

            {/* Music-Style Vertical Slider (Light Brown with 3 Dark Brown Lines; Becomes Dark Brown at Index) */}
            <div className="py-6 pr-3 pl-1 flex flex-col items-center select-none">
              <div
                ref={sliderTrackRef}
                onPointerDown={handleSliderPointerDown}
                onPointerMove={handleSliderPointerMove}
                onPointerUp={handleSliderPointerUp}
                onPointerCancel={handleSliderPointerUp}
                role="slider"
                aria-label="Index scroll slider"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(scrollProgress * 100)}
                className="relative w-4 h-full flex justify-center cursor-pointer group touch-none"
                title="Drag or click to slide through the Index"
              >
                {/* Rectangular Slider: Light brown with 3 dark brown lines; completely blends with Index background at top */}
                {(() => {
                  const isAtTopIndex = scrollProgress <= 0.04;
                  return (
                    <div
                      data-slider-thumb="true"
                      className={`absolute left-1/2 -translate-x-1/2 w-4 h-11 rounded-[3px] flex flex-col items-center justify-center gap-1.5 transition-[background-color,border-color,box-shadow,opacity] duration-150 cursor-grab active:cursor-grabbing ${
                        isAtTopIndex
                          ? 'bg-transparent border border-transparent shadow-none opacity-0'
                          : 'bg-[#CBB5A0] border border-[#9C7A5B] shadow-[0_2px_10px_rgba(0,0,0,0.65)] opacity-100'
                      } ${
                        isDraggingSlider && !isAtTopIndex ? 'scale-110 shadow-xl' : 'group-hover:scale-105'
                      }`}
                      style={{ top: `calc(${scrollProgress} * (100% - 44px))` }}
                    >
                      <div 
                        className={`w-2.5 h-[1.5px] rounded-full transition-colors duration-150 ${
                          isAtTopIndex ? 'bg-transparent' : 'bg-[#3E2412]'
                        }`} 
                      />
                      <div 
                        className={`w-2.5 h-[1.5px] rounded-full transition-colors duration-150 ${
                          isAtTopIndex ? 'bg-transparent' : 'bg-[#3E2412]'
                        }`} 
                      />
                      <div 
                        className={`w-2.5 h-[1.5px] rounded-full transition-colors duration-150 ${
                          isAtTopIndex ? 'bg-transparent' : 'bg-[#3E2412]'
                        }`} 
                      />
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* 2. Mobile Fixed Bottom Thumb-Zone Navigation Dock */}
      <nav
        aria-label="Mobile Primary Navigation"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-stone-950/95 backdrop-blur-2xl border-t border-amber-500/30 shadow-[0_-8px_30px_rgba(0,0,0,0.85)] px-1.5 pt-1 pb-[calc(0.35rem+env(safe-area-inset-bottom))]"
      >
        <div className="grid grid-cols-5 items-stretch max-w-md mx-auto">
          {[
            { id: 'saints' as ActiveTab, line1: 'Saint of', line2: 'the Day', icon: SaintWithHaloIcon },
            { id: 'catholic-bibles' as ActiveTab, line1: 'Holy', line2: 'Bible', icon: CatholicBiblesBookIcon },
            { id: 'readings' as ActiveTab, line1: 'Mass', line2: 'Readings', icon: MassReadingsBookFlipIcon },
            { id: 'divine-office' as ActiveTab, line1: 'Divine', line2: 'Office', icon: DivineOfficeBreviaryIcon },
          ].map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectTab(tab.id)}
                className={`min-h-[54px] flex flex-col items-center justify-center gap-0.5 rounded-lg py-1 px-0.5 transition-colors cursor-pointer select-none ${
                  isActive ? 'text-[#FFD700]' : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                <TabIcon className={`w-5 h-5 shrink-0 ${isActive ? 'text-[#FFD700] drop-shadow-[0_0_6px_rgba(255,215,0,0.5)]' : 'text-stone-400'}`} />
                <span className={`text-[10px] font-serif leading-[1.12] text-center flex flex-col items-center ${isActive ? 'font-bold text-[#FFD700]' : 'font-medium'}`}>
                  <span className="block whitespace-nowrap">{tab.line1}</span>
                  <span className="block whitespace-nowrap">{tab.line2}</span>
                </span>
              </button>
            );
          })}

          {/* 5th Thumb Slot: Open Full Sacred Index Drawer (Center-Aligned) */}
          <button
            type="button"
            onClick={() => (onOpenMobile ? onOpenMobile() : onCloseMobile && onCloseMobile())}
            className={`min-h-[54px] w-full flex flex-col items-center justify-center gap-0.5 rounded-lg py-1 px-0.5 text-center transition-colors cursor-pointer select-none ${
              isMobileOpen ? 'text-[#FFD700]' : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <Layers className={`w-5 h-5 shrink-0 mx-auto ${isMobileOpen ? 'text-[#FFD700] drop-shadow-[0_0_6px_rgba(255,215,0,0.5)]' : 'text-stone-400'}`} />
            <span className={`w-full text-[10px] font-serif leading-[1.12] text-center flex flex-col items-center justify-center min-h-[22.4px] ${isMobileOpen ? 'font-bold text-[#FFD700]' : 'font-medium'}`}>
              <span className="block whitespace-nowrap text-center">Index</span>
            </span>
          </button>
        </div>
      </nav>

      {/* 3. Mobile Centered Index Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3">
          {/* Backdrop */}
          <div 
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
          />

          {/* Centered Index Panel */}
          <div className="relative w-full max-w-sm max-h-[85dvh] rounded-2xl bg-gradient-to-b from-stone-950 via-[#14110f] to-stone-950 border border-amber-500/35 p-4 sm:p-5 shadow-2xl flex flex-col z-10 overflow-y-auto no-scrollbar">
            <div className="relative flex items-center justify-center pb-3.5 border-b border-amber-500/20 mb-3">
              <div className="flex items-center justify-center gap-2 text-center">
                <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
                <span className="font-cinzel text-sm font-bold text-white tracking-widest">
                  SOUL SANCTUM
                </span>
              </div>
              <button
                onClick={onCloseMobile}
                className="absolute right-0 min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg text-stone-300 hover:text-white bg-white/10 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar">
              {renderNavList()}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
