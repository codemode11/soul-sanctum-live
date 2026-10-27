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
  Link2
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
  NotebookWithBallpenIcon
} from './SanctumIcons';

export type ActiveTab = 
  | 'readings'
  | 'saints'
  | 'reflection'
  | 'visio-divina'
  | 'catechism'
  | 'wisdom'
  | 'spiritual-books'
  | 'catholic-podcasts'
  | 'live-mass'
  | 'vatican-news'
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
  | 'catholic-links'
  | 'piety-dashboard';

interface NavigationProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenNotifications: () => void;
  activeNovenasCount?: number;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  onOpenAdoration?: () => void;
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
  onCloseMobile,
  onOpenAdoration
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
      icon: BookOpen, 
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
      id: 'bible-flashcards', 
      label: 'Bible Flashcards', 
      icon: BookmarkCheck, 
      tag: 'Memory', 
      subtext: 'Scripture Memorization and Recall' 
    },
    { 
      id: 'saints', 
      label: 'Saint of the Day', 
      icon: SaintWithHaloIcon, 
      tag: 'Hagiography', 
      subtext: 'Feasts, Lives and Patronages' 
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
      icon: Eye, 
      tag: 'Prayer', 
      subtext: 'Contemplation of Sacred Art' 
    },
    { 
      id: 'catechism', 
      label: 'Catechism', 
      icon: BetterScrollIcon, 
      tag: 'Doctrine', 
      subtext: 'Pillars of Catholic Faith' 
    },
    { 
      id: 'wisdom', 
      label: 'Wisdom of the Saints', 
      icon: DoveWithHaloIcon, 
      tag: 'Fathers', 
      subtext: 'Doctors and Popes Treasury' 
    },
    { 
      id: 'spiritual-books', 
      label: 'Spiritual Classics', 
      icon: Library, 
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
      icon: Tv, 
      tag: 'Live', 
      subtext: 'St. Peter\'s and Global Sanctuaries' 
    },
    { 
      id: 'vatican-news', 
      label: 'Vatican News', 
      icon: Globe, 
      tag: 'Global', 
      subtext: 'Holy See and Church Updates' 
    },
    { 
      id: 'catholic-glossary', 
      label: 'Catholic Glossary', 
      icon: BookMarked, 
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
      label: 'Rosary and Chaplet', 
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
      icon: CalendarIcon, 
      tag: 'Liturgical', 
      subtext: 'Seasons, Solemnities and Fasts' 
    },
    { 
      id: 'church-history', 
      label: 'Timeline of the Church', 
      icon: Scroll, 
      tag: 'Councils', 
      subtext: '21 Ecumenical Councils, Popes, and 2,000-Year History' 
    },
    { 
      id: 'sacred-art', 
      label: 'Sacred Art Gallery', 
      icon: ImageIcon, 
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
      id: 'catholic-links', 
      label: 'Catholic Links', 
      icon: Link2, 
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

  const renderNavList = () => (
    <div className="space-y-3.5">
      {/* Top Sidebar Header with Index aligned with Mass Readings, NO icon per user instruction */}
      <div className="px-4 pb-3 border-b border-[#D4AF37]/35 flex items-center justify-between">
        <span className="font-cinzel text-base sm:text-lg font-bold text-[#FFD700] drop-shadow-[0_0_8px_rgba(212,175,55,0.45)] tracking-[0.2em] uppercase">
          INDEX
        </span>
        <button
          onClick={onOpenNotifications}
          className="p-1.5 rounded-lg text-stone-300 hover:text-[#FFD700] hover:bg-white/10 transition-colors cursor-pointer"
          title="Daily Reminders and Liturgical Bells"
        >
          <BellRing className="w-4 h-4 text-[#FFD700]" />
        </button>
      </div>

      {/* Unnumbered List: Descriptions/tags like Daily, Hagiography removed so titles are seen in their entirety */}
      <div className="space-y-1.5 pt-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                onSelectTab(item.id);
                if (onCloseMobile) onCloseMobile();
              }}
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg cursor-pointer select-none group text-left border transition-colors duration-500 ease-out ${
                isActive
                  ? 'bg-gradient-to-r from-[#C89F72]/40 via-[#D4A373]/30 to-[#B88B5E]/40 text-[#FFF8DC] border-[#FFD700]/60 shadow-[0_0_18px_rgba(212,175,55,0.28)] backdrop-blur-md'
                  : 'text-stone-300 hover:text-[#FFD700] hover:bg-white/10 hover:border-[#FFD700]/30 border-transparent'
              }`}
            >
              {/* Unified Content Wrapper: Icon and Text grow TOGETHER in 1:1 synchronization */}
              <div className={`flex items-center gap-3 min-w-0 flex-1 origin-left transition-transform duration-500 ease-out transform-gpu will-change-transform ${
                isActive ? 'scale-[1.08]' : 'scale-100 group-hover:scale-[1.08]'
              }`}>
                <div className={`p-2 rounded-lg transition-colors duration-500 ease-out shrink-0 ${
                  isActive 
                    ? 'bg-[#FFD700]/25 text-[#FFD700] shadow-[0_0_10px_rgba(255,215,0,0.3)]' 
                    : 'bg-white/5 text-stone-400 group-hover:text-[#FFD700] group-hover:bg-[#FFD700]/20 group-hover:shadow-[0_0_10px_rgba(255,215,0,0.25)]'
                }`}>
                  <Icon className={`w-5 h-5 shrink-0 transition-colors duration-500 ease-out ${
                    isActive ? 'text-[#FFD700]' : 'text-stone-400 group-hover:text-[#FFD700]'
                  }`} />
                </div>
                <div className="min-w-0 flex-1 overflow-visible">
                  <span className={`block font-serif text-base font-medium leading-tight whitespace-nowrap transition-colors duration-500 ease-out ${
                    isActive
                      ? 'text-[#FFD700] drop-shadow-xs'
                      : 'text-stone-200 group-hover:text-[#FFD700]'
                  }`}>
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
      <aside className="hidden lg:block w-72 lg:w-80 shrink-0 sticky top-6 self-start">
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

      {/* 2. Mobile Compact Navigation Strip (Word "Menu" removed) */}
      <div className="lg:hidden w-full sticky top-0 z-30 bg-stone-950/90 backdrop-blur-xl border-b border-amber-500/25 px-4 py-2.5 flex items-center justify-between text-stone-100 shadow-lg">
        <button
          onClick={() => onCloseMobile && onCloseMobile()}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-semibold cursor-pointer"
        >
          <Layers className="w-4 h-4 text-amber-300" />
          <span>Index</span>
        </button>

        <div className="flex items-center gap-2">
          {currentItem && (
            <span className="text-xs font-serif font-semibold text-amber-100 truncate max-w-[170px]">
              {currentItem.label}
            </span>
          )}
          <button
            onClick={onOpenNotifications}
            className="p-1.5 rounded-lg text-stone-300 hover:text-amber-200 bg-white/5 border border-white/10"
            title="Reminders"
          >
            <BellRing className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>
      </div>

      {/* 3. Mobile Slide-out Drawer */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            onClick={onCloseMobile}
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
          />

          {/* Drawer from Left Side */}
          <div className="relative w-80 max-w-[85vw] h-full bg-gradient-to-b from-stone-950 via-[#14110f] to-stone-950 border-r border-amber-500/30 p-5 shadow-2xl flex flex-col z-10 overflow-y-auto no-scrollbar animate-slideInLeft">
            <div className="flex items-center justify-between pb-4 border-b border-amber-500/20 mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
                <span className="font-cinzel text-sm font-bold text-white tracking-widest">
                  SOUL SANCTUM
                </span>
              </div>
              <button
                onClick={onCloseMobile}
                className="p-2 rounded-lg text-stone-400 hover:text-white bg-white/5 cursor-pointer"
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
