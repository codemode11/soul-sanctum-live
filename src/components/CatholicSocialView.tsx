import React, { useState, useEffect, useCallback } from 'react';
import {
  Share2,
  ExternalLink,
  RefreshCw,
  Search,
  Sparkles,
  Grid,
  Layout,
  Plus,
  X,
  Globe,
  Camera,
  BookOpen,
  ZoomIn,
  Heart,
  MessageCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import {
  CATHOLIC_INSTAGRAM_SOURCES,
  CATHOLIC_FACEBOOK_SOURCES,
  CATHOLIC_PINTEREST_SOURCES,
  INITIAL_PINTEREST_PINS_FALLBACK,
  CatholicInstagramSource,
  CatholicFacebookSource,
  CatholicPinterestSource,
  CatholicStaticSocialPost,
  PinterestPinItem
} from '../data/catholicSocial';

type SocialPlatformTab = 'all' | 'instagram' | 'facebook' | 'pinterest';

export const CatholicSocialView: React.FC = () => {
  const [activePlatform, setActivePlatform] = useState<SocialPlatformTab>('all');

  // Instagram state
  const [selectedIgSource, setSelectedIgSource] = useState<CatholicInstagramSource>(CATHOLIC_INSTAGRAM_SOURCES[0]);
  const [igViewMode, setIgViewMode] = useState<'posts' | 'profile'>('posts');
  const [igShortcodes, setIgShortcodes] = useState<string[]>(CATHOLIC_INSTAGRAM_SOURCES[0].defaultShortcodes);
  const [isLoadingIg, setIsLoadingIg] = useState<boolean>(false);
  const [customIgInput, setCustomIgInput] = useState<string>('');
  const [igRefreshKey, setIgRefreshKey] = useState<number>(0);

  // Facebook Static Posts state
  const [selectedFbSource, setSelectedFbSource] = useState<CatholicFacebookSource>(CATHOLIC_FACEBOOK_SOURCES[0]);
  const [fbPosts, setFbPosts] = useState<CatholicStaticSocialPost[]>(CATHOLIC_FACEBOOK_SOURCES[0].staticPosts || []);
  const [fbProfilePic, setFbProfilePic] = useState<string>('');
  const [isLoadingFbPosts, setIsLoadingFbPosts] = useState<boolean>(false);
  const [fbFilterStaticOnly, setFbFilterStaticOnly] = useState<boolean>(true);
  const [fbCarouselIndexMap, setFbCarouselIndexMap] = useState<Record<string, number>>({});
  const [expandedPostIds, setExpandedPostIds] = useState<Record<string, boolean>>({});
  const [customFbInput, setCustomFbInput] = useState<string>('');
  const [activeLightboxPost, setActiveLightboxPost] = useState<{
    title: string;
    subtitle: string;
    description: string;
    imageUrl: string;
    externalUrl: string;
    externalLabel: string;
  } | null>(null);

  // Pinterest state
  const [selectedPinSource, setSelectedPinSource] = useState<CatholicPinterestSource>(CATHOLIC_PINTEREST_SOURCES[0]);
  const [pinterestPins, setPinterestPins] = useState<PinterestPinItem[]>(INITIAL_PINTEREST_PINS_FALLBACK);
  const [isLoadingPins, setIsLoadingPins] = useState<boolean>(false);
  const [pinSearchQuery, setPinSearchQuery] = useState<string>('');
  const [customPinUser, setCustomPinUser] = useState<string>('');

  // Fetch live Instagram shortcodes for selected account
  const fetchInstagramShortcodes = useCallback(async (source: CatholicInstagramSource) => {
    setIsLoadingIg(true);
    setIgShortcodes(source.defaultShortcodes);
    try {
      const res = await fetch(`/api/catholic-instagram?username=${encodeURIComponent(source.username)}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.shortcodes) && data.shortcodes.length > 0) {
          setIgShortcodes(data.shortcodes);
        }
      }
    } catch {
      // Keep default verified shortcodes on network timeout
    } finally {
      setIsLoadingIg(false);
    }
  }, []);

  useEffect(() => {
    fetchInstagramShortcodes(selectedIgSource);
  }, [selectedIgSource, fetchInstagramShortcodes]);

  // Fetch live Static Posts for selected Facebook Catholic source
  const fetchFacebookStaticPosts = useCallback(async (source: CatholicFacebookSource) => {
    setIsLoadingFbPosts(true);
    try {
      const res = await fetch(`/api/catholic-instagram?username=${encodeURIComponent(source.socialUsername)}`);
      if (res.ok) {
        const data = await res.json();
        if (typeof data.profilePicUrl === 'string') {
          setFbProfilePic(data.profilePicUrl);
        }
        if (Array.isArray(data.posts) && data.posts.length > 0) {
          setFbPosts(data.posts);
        }
      }
    } catch {
      // ignore network error
    } finally {
      setIsLoadingFbPosts(false);
    }
  }, []);

  useEffect(() => {
    setFbPosts(selectedFbSource.staticPosts || []);
    fetchFacebookStaticPosts(selectedFbSource);
  }, [selectedFbSource, fetchFacebookStaticPosts]);

  // Fetch live Pinterest RSS pins for selected account
  const fetchPinterestFeed = useCallback(async (username: string) => {
    setIsLoadingPins(true);
    try {
      const res = await fetch(`/api/catholic-pinterest?username=${encodeURIComponent(username)}`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.items) && data.items.length > 0) {
          setPinterestPins(data.items);
        }
      }
    } catch {
      // Keep existing pins if offline
    } finally {
      setIsLoadingPins(false);
    }
  }, []);

  useEffect(() => {
    fetchPinterestFeed(selectedPinSource.username);
  }, [selectedPinSource, fetchPinterestFeed]);

  const handleCustomInstagramSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customIgInput.trim();
    if (!trimmed) return;

    const postMatch = trimmed.match(/instagram\.com\/(?:p|reel)\/([A-Za-z0-9_-]+)/i);
    if (postMatch && postMatch[1]) {
      const code = postMatch[1];
      setIgShortcodes(prev => [code, ...prev.filter(c => c !== code)]);
      setIgViewMode('posts');
      setCustomIgInput('');
      return;
    }

    const cleanUser = trimmed
      .replace(/^https?:\/\/(www\.)?instagram\.com\//i, '')
      .replace(/^@/, '')
      .split('/')[0]
      .replace(/[^a-zA-Z0-9._]/g, '');

    if (cleanUser) {
      const customSource: CatholicInstagramSource = {
        id: `ig-custom-${cleanUser}`,
        name: `@${cleanUser}`,
        username: cleanUser,
        category: 'Custom Catholic Account',
        description: `Live Instagram feed from @${cleanUser}`,
        profileUrl: `https://www.instagram.com/${cleanUser}/`,
        defaultShortcodes: []
      };
      setSelectedIgSource(customSource);
      setIgViewMode('profile');
      setCustomIgInput('');
    }
  };

  const handleCustomFacebookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customFbInput.trim();
    if (!trimmed) return;

    const cleanHandle = trimmed
      .replace(/^https?:\/\/(www\.)?(facebook|instagram)\.com\//i, '')
      .replace(/^@/, '')
      .split(/[/?#]/)[0]
      .replace(/[^a-zA-Z0-9._-]/g, '');

    if (cleanHandle) {
      const customSource: CatholicFacebookSource = {
        id: `fb-custom-${cleanHandle}`,
        name: `@${cleanHandle}`,
        handle: `@${cleanHandle}`,
        socialUsername: cleanHandle.toLowerCase(),
        pageUrl: `https://www.facebook.com/${cleanHandle}`,
        category: 'Custom Catholic Source',
        description: `Static posts from @${cleanHandle}`
      };
      setSelectedFbSource(customSource);
      setCustomFbInput('');
    }
  };

  const handleCustomPinterestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customPinUser.trim();
    if (!trimmed) return;

    const cleanUser = trimmed
      .replace(/^https?:\/\/(www\.)?pinterest\.com\//i, '')
      .replace(/^@/, '')
      .split('/')[0]
      .replace(/[^a-zA-Z0-9_-]/g, '');

    if (cleanUser) {
      const customSource: CatholicPinterestSource = {
        id: `pin-custom-${cleanUser}`,
        name: `@${cleanUser}`,
        username: cleanUser,
        category: 'Custom Pinterest Feed',
        description: `Live RSS Pins pulled directly from pinterest.com/${cleanUser}`,
        profileUrl: `https://www.pinterest.com/${cleanUser}/`
      };
      setSelectedPinSource(customSource);
      setCustomPinUser('');
    }
  };

  const filteredPins = pinterestPins.filter(pin => {
    if (!pinSearchQuery.trim()) return true;
    const q = pinSearchQuery.toLowerCase();
    return (
      pin.title.toLowerCase().includes(q) ||
      pin.description.toLowerCase().includes(q) ||
      pin.username.toLowerCase().includes(q)
    );
  });

  // For Facebook Static Posts: if static-only filter is active and there are static image/carousel posts, show them; otherwise show all posts with static images
  const staticOnlyFbPosts = fbPosts.filter(p => !p.isVideo);
  const displayedFbPosts =
    fbFilterStaticOnly && staticOnlyFbPosts.length > 0 ? staticOnlyFbPosts : fbPosts;

  return (
    <div className="max-w-5xl mx-auto p-3 sm:p-6 md:p-8 rounded-xl bg-white/45 backdrop-blur-xl backdrop-saturate-150 border border-white/60 ring-1 ring-inset ring-white/40 shadow-[0_8px_32px_0_rgba(120,90,50,0.12)] space-y-6 mb-12">
      {/* Top Banner Rectangle — Exact Same Size & Proportions as Daily Mass Readings */}
      <div className="bg-white/55 backdrop-blur-xl backdrop-saturate-150 rounded-xl shadow-xs border border-white/70 ring-1 ring-inset ring-white/40 relative z-20">
        <div className="px-5 pt-4 pb-4 sm:px-6 min-h-[164px] bg-gradient-to-r from-stone-900 to-stone-800 text-stone-100 flex flex-col justify-between rounded-xl">
          <div className="space-y-1.5">
            {/* Line 1: Badge & Subtitle */}
            <div className="flex items-center gap-2.5 flex-nowrap overflow-hidden">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs text-xs font-semibold uppercase tracking-wider whitespace-nowrap shrink-0 bg-amber-500 text-amber-950">
                <Share2 className="w-3 h-3" />
                <span>CATHOLIC SOCIAL</span>
              </span>
              <span className="text-sm sm:text-base text-stone-300 font-serif whitespace-nowrap truncate">
                Live Posts, Reels, Static Dispatches &amp; Sacred Art Boards
              </span>
            </div>

            {/* Line 2: Main Title */}
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-normal text-amber-100 leading-snug break-words">
              Catholic Instagram, Facebook &amp; Pinterest Feeds
            </h2>
          </div>

          {/* Line 3: Platform Filter Controls Lowered at the Right Side */}
          <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-2.5 mt-auto pt-4 shrink-0">
            <button
              onClick={() => setActivePlatform('all')}
              className={`h-8 px-3 rounded-md font-cinzel text-xs font-bold tracking-wider uppercase transition-all cursor-pointer border ${
                activePlatform === 'all'
                  ? 'bg-amber-500 text-stone-950 border-amber-300 shadow-sm'
                  : 'bg-[#1C120C]/90 text-[#D4A373] border-[#8B5A2B]/50 hover:border-[#D4A373]/70 hover:text-[#F7EBE1]'
              }`}
            >
              All 3 Platforms
            </button>
            <button
              onClick={() => setActivePlatform('instagram')}
              className={`h-8 px-3 rounded-md font-cinzel text-xs font-bold tracking-wider uppercase transition-all cursor-pointer border ${
                activePlatform === 'instagram'
                  ? 'bg-gradient-to-r from-pink-600 to-amber-500 text-white border-pink-300 shadow-sm'
                  : 'bg-[#1C120C]/90 text-[#D4A373] border-[#8B5A2B]/50 hover:border-[#D4A373]/70 hover:text-[#F7EBE1]'
              }`}
            >
              Instagram
            </button>
            <button
              onClick={() => setActivePlatform('facebook')}
              className={`h-8 px-3 rounded-md font-cinzel text-xs font-bold tracking-wider uppercase transition-all cursor-pointer border ${
                activePlatform === 'facebook'
                  ? 'bg-blue-600 text-white border-blue-300 shadow-sm'
                  : 'bg-[#1C120C]/90 text-[#D4A373] border-[#8B5A2B]/50 hover:border-[#D4A373]/70 hover:text-[#F7EBE1]'
              }`}
            >
              Facebook
            </button>
            <button
              onClick={() => setActivePlatform('pinterest')}
              className={`h-8 px-3 rounded-md font-cinzel text-xs font-bold tracking-wider uppercase transition-all cursor-pointer border ${
                activePlatform === 'pinterest'
                  ? 'bg-red-700 text-white border-red-300 shadow-sm'
                  : 'bg-[#1C120C]/90 text-[#D4A373] border-[#8B5A2B]/50 hover:border-[#D4A373]/70 hover:text-[#F7EBE1]'
              }`}
            >
              Pinterest
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================================
          1. INSTAGRAM SECTION
          ===================================================================== */}
      {(activePlatform === 'all' || activePlatform === 'instagram') && (
        <section className="rounded-2xl bg-[#FBF9F5] border border-amber-900/20 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#241307] via-[#3A1D0D] to-[#241307] px-5 py-4 sm:px-6 sm:py-5 border-b border-amber-500/30 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-amber-400" />
                <span className="font-cinzel text-xs font-bold tracking-[0.2em] uppercase text-amber-300">
                  CATHOLIC INSTAGRAM
                </span>
              </div>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white">
                {selectedIgSource.name} <span className="text-amber-300 font-serif text-sm font-normal">(@{selectedIgSource.username})</span>
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 font-serif">
                {selectedIgSource.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex rounded-xl bg-black/40 p-1 border border-white/15">
                <button
                  onClick={() => setIgViewMode('posts')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-cinzel font-semibold cursor-pointer transition-colors ${
                    igViewMode === 'posts'
                      ? 'bg-amber-500 text-stone-950'
                      : 'text-stone-200 hover:text-white'
                  }`}
                >
                  <Grid className="w-3.5 h-3.5" />
                  <span>Captioned Posts</span>
                </button>
                <button
                  onClick={() => setIgViewMode('profile')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-cinzel font-semibold cursor-pointer transition-colors ${
                    igViewMode === 'profile'
                      ? 'bg-amber-500 text-stone-950'
                      : 'text-stone-200 hover:text-white'
                  }`}
                >
                  <Layout className="w-3.5 h-3.5" />
                  <span>Full Profile Grid</span>
                </button>
              </div>

              <button
                onClick={() => {
                  setIgRefreshKey(prev => prev + 1);
                  fetchInstagramShortcodes(selectedIgSource);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 border border-white/15 text-xs font-cinzel font-semibold cursor-pointer transition-colors"
                title="Refresh Instagram Feed"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingIg ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>

              <a
                href={selectedIgSource.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 text-xs font-cinzel font-semibold transition-colors"
              >
                <span>Open @{selectedIgSource.username}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-5">
            {/* Account Selector Pills + Custom Account Input */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-stone-200">
              <div className="flex flex-wrap items-center gap-2">
                {CATHOLIC_INSTAGRAM_SOURCES.map(src => (
                  <button
                    key={src.id}
                    onClick={() => setSelectedIgSource(src)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-serif font-semibold transition-all cursor-pointer border ${
                      selectedIgSource.username === src.username
                        ? 'bg-[#241307] text-amber-200 border-amber-600 shadow-sm'
                        : 'bg-white text-stone-800 border-stone-300 hover:border-amber-600/60'
                    }`}
                  >
                    {src.name}
                  </button>
                ))}
              </div>

              <form onSubmit={handleCustomInstagramSubmit} className="flex items-center gap-2 shrink-0">
                <input
                  type="text"
                  value={customIgInput}
                  onChange={e => setCustomIgInput(e.target.value)}
                  placeholder="Add @username or Post/Reel URL..."
                  className="px-3 py-1.5 rounded-xl bg-white border border-stone-300 text-xs font-serif text-stone-800 focus:outline-none focus:border-amber-700 w-52 sm:w-60"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-amber-50 text-xs font-cinzel font-semibold cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Load</span>
                </button>
              </form>
            </div>

            {/* Instagram Content Area */}
            {igViewMode === 'profile' || igShortcodes.length === 0 ? (
              <div className="w-full rounded-xl overflow-hidden border border-stone-200 bg-white shadow-inner">
                <iframe
                  key={`ig-profile-${selectedIgSource.username}-${igRefreshKey}`}
                  src={`https://www.instagram.com/${selectedIgSource.username}/embed/`}
                  title={`${selectedIgSource.name} Instagram Profile Feed`}
                  className="w-full h-[920px] sm:h-[940px] md:h-[960px] border-0"
                  loading="lazy"
                  allowTransparency={true}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {igShortcodes.slice(0, 9).map(code => (
                  <div
                    key={`ig-post-${code}-${igRefreshKey}`}
                    className="rounded-xl overflow-hidden border border-stone-200 bg-white shadow-md flex flex-col"
                  >
                    <iframe
                      src={`https://www.instagram.com/p/${code}/embed/captioned/`}
                      title={`Instagram Post ${code} from @${selectedIgSource.username}`}
                      className="w-full h-[580px] border-0"
                      loading="lazy"
                      allowTransparency={true}
                    />
                    <div className="px-4 py-2.5 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs font-serif text-stone-600">
                      <span>@{selectedIgSource.username}</span>
                      <a
                        href={`https://www.instagram.com/p/${code}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-amber-800 hover:text-amber-950 font-semibold"
                      >
                        <span>View on Instagram</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* =====================================================================
          2. FACEBOOK STATIC POSTS OF CATHOLIC SOURCES
          ===================================================================== */}
      {(activePlatform === 'all' || activePlatform === 'facebook') && (
        <section className="rounded-2xl bg-[#FBF9F5] border border-amber-900/20 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#241307] via-[#132647] to-[#241307] px-5 py-4 sm:px-6 sm:py-5 border-b border-amber-500/30 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-400" />
                <span className="font-cinzel text-xs font-bold tracking-[0.2em] uppercase text-amber-300">
                  CATHOLIC FACEBOOK STATIC POSTS
                </span>
              </div>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white">
                {selectedFbSource.name} <span className="text-amber-300 font-serif text-sm font-normal">({selectedFbSource.handle})</span>
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 font-serif">
                {selectedFbSource.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex rounded-xl bg-black/40 p-1 border border-white/15">
                <button
                  onClick={() => setFbFilterStaticOnly(true)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-semibold cursor-pointer transition-colors ${
                    fbFilterStaticOnly
                      ? 'bg-amber-500 text-stone-950'
                      : 'text-stone-200 hover:text-white'
                  }`}
                >
                  Static Photo Posts
                </button>
                <button
                  onClick={() => setFbFilterStaticOnly(false)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-semibold cursor-pointer transition-colors ${
                    !fbFilterStaticOnly
                      ? 'bg-amber-500 text-stone-950'
                      : 'text-stone-200 hover:text-white'
                  }`}
                >
                  All Posts
                </button>
              </div>

              <button
                onClick={() => fetchFacebookStaticPosts(selectedFbSource)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 border border-white/15 text-xs font-cinzel font-semibold cursor-pointer transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingFbPosts ? 'animate-spin' : ''}`} />
                <span>Refresh Posts</span>
              </button>

              <a
                href={selectedFbSource.pageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 text-xs font-cinzel font-semibold transition-colors"
              >
                <span>Open Facebook Page</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-5">
            {/* Facebook Catholic Source Selector + Custom Handle Input */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-stone-200">
              <div className="flex flex-wrap items-center gap-2">
                {CATHOLIC_FACEBOOK_SOURCES.map(src => (
                  <button
                    key={src.id}
                    onClick={() => setSelectedFbSource(src)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-serif font-semibold transition-all cursor-pointer border ${
                      selectedFbSource.id === src.id
                        ? 'bg-[#241307] text-amber-200 border-amber-600 shadow-sm'
                        : 'bg-white text-stone-800 border-stone-300 hover:border-amber-600/60'
                    }`}
                  >
                    {src.name}
                  </button>
                ))}
              </div>

              <form onSubmit={handleCustomFacebookSubmit} className="flex items-center gap-2 shrink-0">
                <input
                  type="text"
                  value={customFbInput}
                  onChange={e => setCustomFbInput(e.target.value)}
                  placeholder="Enter Catholic source handle..."
                  className="px-3 py-1.5 rounded-xl bg-white border border-stone-300 text-xs font-serif text-stone-800 focus:outline-none focus:border-amber-700 w-52 sm:w-60"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-amber-50 text-xs font-cinzel font-semibold cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Load</span>
                </button>
              </form>
            </div>

            {/* Facebook Static Posts Grid */}
            {isLoadingFbPosts && displayedFbPosts.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <RefreshCw className="w-7 h-7 text-amber-700 animate-spin mx-auto" />
                <p className="text-sm font-serif text-stone-600">
                  Loading static posts from {selectedFbSource.name}...
                </p>
              </div>
            ) : displayedFbPosts.length === 0 ? (
              <div className="py-12 text-center space-y-2">
                <p className="text-sm font-serif text-stone-600">
                  No static posts found for this source right now.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {displayedFbPosts.slice(0, activePlatform === 'all' ? 4 : 6).map(post => {
                  const images =
                    post.carouselImages && post.carouselImages.length > 0
                      ? post.carouselImages
                      : [post.imageUrl].filter(Boolean);
                  const currentSlideIdx = fbCarouselIndexMap[post.id] || 0;
                  const activeImg = images[currentSlideIdx] || post.imageUrl;
                  const isExpanded = !!expandedPostIds[post.id];
                  const formattedDate = new Date(post.timestamp).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  });

                  return (
                    <article
                      key={post.id}
                      className="rounded-xl bg-white border border-stone-200/90 hover:border-amber-600/50 shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between"
                    >
                      <div>
                        {/* Static Post Author Header */}
                        <div className="p-4 flex items-center justify-between border-b border-stone-100">
                          <div className="flex items-center gap-3 min-w-0">
                            {fbProfilePic ? (
                              <img
                                src={fbProfilePic}
                                alt={selectedFbSource.name}
                                className="w-10 h-10 rounded-full object-cover border border-amber-500/40 shrink-0"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-[#241307] text-amber-200 flex items-center justify-center font-cinzel font-bold text-sm shrink-0">
                                {selectedFbSource.name.charAt(0)}
                              </div>
                            )}
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <h4 className="font-cinzel font-bold text-sm text-stone-900 truncate">
                                  {selectedFbSource.name}
                                </h4>
                                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] font-bold shrink-0" title="Verified Catholic Ministry">
                                  ✓
                                </span>
                              </div>
                              <div className="flex items-center gap-1.5 text-xs font-serif text-stone-500">
                                <span>{selectedFbSource.handle}</span>
                                <span>•</span>
                                <span>{formattedDate}</span>
                              </div>
                            </div>
                          </div>

                          <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 text-[10px] font-cinzel font-bold uppercase tracking-wider shrink-0">
                            Static Post
                          </span>
                        </div>

                        {/* Static Post Text / Message */}
                        {post.caption && (
                          <div className="px-4 pt-3.5 pb-3">
                            <p
                              className={`text-sm font-serif text-stone-800 whitespace-pre-line leading-relaxed ${
                                !isExpanded && post.caption.length > 260 ? 'line-clamp-4' : ''
                              }`}
                            >
                              {post.caption}
                            </p>
                            {post.caption.length > 260 && (
                              <button
                                onClick={() =>
                                  setExpandedPostIds(prev => ({
                                    ...prev,
                                    [post.id]: !prev[post.id]
                                  }))
                                }
                                className="mt-1 text-xs font-serif font-bold text-amber-800 hover:text-amber-950 cursor-pointer"
                              >
                                {isExpanded ? 'Show less' : 'See more...'}
                              </button>
                            )}
                          </div>
                        )}

                        {/* High-Res Static Post Photo (with Multi-Photo Carousel Controls if Sidecar) */}
                        {activeImg && (
                          <div className="relative bg-stone-950 group overflow-hidden">
                            <img
                              src={activeImg}
                              alt={post.caption?.slice(0, 80) || selectedFbSource.name}
                              loading="lazy"
                              onClick={() =>
                                setActiveLightboxPost({
                                  title: selectedFbSource.name,
                                  subtitle: `${selectedFbSource.handle} • ${formattedDate}`,
                                  description: post.caption || selectedFbSource.description,
                                  imageUrl: activeImg,
                                  externalUrl: selectedFbSource.pageUrl,
                                  externalLabel: 'View on Facebook'
                                })
                              }
                              className="w-full max-h-[440px] object-contain mx-auto cursor-pointer transition-transform duration-300 group-hover:scale-[1.01]"
                            />

                            {/* Carousel Prev/Next Arrows when Post has multiple static images */}
                            {images.length > 1 && (
                              <>
                                <button
                                  type="button"
                                  onClick={e => {
                                    e.stopPropagation();
                                    setFbCarouselIndexMap(prev => ({
                                      ...prev,
                                      [post.id]: (currentSlideIdx - 1 + images.length) % images.length
                                    }));
                                  }}
                                  className="absolute left-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/70 text-white hover:bg-black cursor-pointer shadow-md"
                                  title="Previous Photo"
                                >
                                  <ChevronLeft className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={e => {
                                    e.stopPropagation();
                                    setFbCarouselIndexMap(prev => ({
                                      ...prev,
                                      [post.id]: (currentSlideIdx + 1) % images.length
                                    }));
                                  }}
                                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/70 text-white hover:bg-black cursor-pointer shadow-md"
                                  title="Next Photo"
                                >
                                  <ChevronRight className="w-4 h-4" />
                                </button>
                                <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-black/75 text-amber-200 text-[11px] font-cinzel font-bold">
                                  {currentSlideIdx + 1} / {images.length}
                                </div>
                              </>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Static Post Footer: Engagement Counts & Direct Link */}
                      <div className="px-4 py-3 bg-stone-50 border-t border-stone-200/80 flex items-center justify-between text-xs font-serif text-stone-600">
                        <div className="flex items-center gap-4">
                          {post.likesCount > 0 && (
                            <span className="inline-flex items-center gap-1 text-stone-700 font-semibold">
                              <Heart className="w-3.5 h-3.5 text-red-600 fill-red-600" />
                              <span>{post.likesCount.toLocaleString()}</span>
                            </span>
                          )}
                          {post.commentsCount > 0 && (
                            <span className="inline-flex items-center gap-1 text-stone-700 font-semibold">
                              <MessageCircle className="w-3.5 h-3.5 text-stone-500" />
                              <span>{post.commentsCount.toLocaleString()}</span>
                            </span>
                          )}
                          <button
                            onClick={() =>
                              setActiveLightboxPost({
                                title: selectedFbSource.name,
                                subtitle: `${selectedFbSource.handle} • ${formattedDate}`,
                                description: post.caption || selectedFbSource.description,
                                imageUrl: activeImg,
                                externalUrl: selectedFbSource.pageUrl,
                                externalLabel: 'View on Facebook'
                              })
                            }
                            className="inline-flex items-center gap-1 text-stone-700 hover:text-amber-900 font-semibold cursor-pointer"
                          >
                            <ZoomIn className="w-3.5 h-3.5" />
                            <span>Full View</span>
                          </button>
                        </div>

                        <a
                          href={selectedFbSource.pageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-blue-700 hover:text-blue-900 font-semibold"
                        >
                          <span>Facebook Page</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* =====================================================================
          3. PINTEREST SACRED ART & QUOTE BOARDS (LIVE RSS)
          ===================================================================== */}
      {(activePlatform === 'all' || activePlatform === 'pinterest') && (
        <section className="rounded-2xl bg-[#FBF9F5] border border-amber-900/20 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#241307] via-[#451414] to-[#241307] px-5 py-4 sm:px-6 sm:py-5 border-b border-amber-500/30 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span className="font-cinzel text-xs font-bold tracking-[0.2em] uppercase text-amber-300">
                  CATHOLIC PINTEREST (LIVE RSS)
                </span>
              </div>
              <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white">
                {selectedPinSource.name} <span className="text-amber-300 font-serif text-sm font-normal">(pinterest.com/{selectedPinSource.username})</span>
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 font-serif">
                {selectedPinSource.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => fetchPinterestFeed(selectedPinSource.username)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 border border-white/15 text-xs font-cinzel font-semibold cursor-pointer transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingPins ? 'animate-spin' : ''}`} />
                <span>Refresh Pins</span>
              </button>

              <a
                href={selectedPinSource.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 text-xs font-cinzel font-semibold transition-colors"
              >
                <span>Open Pinterest Board</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-5">
            {/* Pinterest Account Selector + Search & Custom Loader */}
            <div className="flex flex-col gap-3 pb-3 border-b border-stone-200">
              <div className="flex flex-wrap items-center gap-2">
                {CATHOLIC_PINTEREST_SOURCES.map(src => (
                  <button
                    key={src.id}
                    onClick={() => setSelectedPinSource(src)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-serif font-semibold transition-all cursor-pointer border ${
                      selectedPinSource.username === src.username
                        ? 'bg-[#241307] text-amber-200 border-amber-600 shadow-sm'
                        : 'bg-white text-stone-800 border-stone-300 hover:border-amber-600/60'
                    }`}
                  >
                    {src.name}
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={pinSearchQuery}
                    onChange={e => setPinSearchQuery(e.target.value)}
                    placeholder="Filter pins by saint, prayer, or topic..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-white border border-stone-300 text-xs font-serif text-stone-800 focus:outline-none focus:border-amber-700"
                  />
                </div>

                <form onSubmit={handleCustomPinterestSubmit} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={customPinUser}
                    onChange={e => setCustomPinUser(e.target.value)}
                    placeholder="Load any Pinterest username..."
                    className="px-3 py-1.5 rounded-xl bg-white border border-stone-300 text-xs font-serif text-stone-800 focus:outline-none focus:border-amber-700 w-52 sm:w-60"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-amber-50 text-xs font-cinzel font-semibold cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Fetch RSS</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Pins Grid */}
            {isLoadingPins && filteredPins.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <RefreshCw className="w-7 h-7 text-amber-700 animate-spin mx-auto" />
                <p className="text-sm font-serif text-stone-600">
                  Pulling live Pins from @{selectedPinSource.username}...
                </p>
              </div>
            ) : filteredPins.length === 0 ? (
              <div className="py-12 text-center space-y-2">
                <p className="text-sm font-serif text-stone-600">
                  No matching Pins found for this filter.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredPins.slice(0, activePlatform === 'all' ? 12 : 24).map(pin => (
                  <div
                    key={pin.id}
                    className="group rounded-xl bg-white border border-stone-200/90 hover:border-amber-600/60 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div
                        onClick={() =>
                          setActiveLightboxPost({
                            title: pin.title,
                            subtitle: `@${pin.username}`,
                            description: pin.description,
                            imageUrl: pin.imageUrl,
                            externalUrl: pin.link,
                            externalLabel: 'View Pin on Pinterest'
                          })
                        }
                        className="relative overflow-hidden bg-stone-100 cursor-pointer aspect-[4/5]"
                      >
                        <img
                          src={pin.imageUrl}
                          alt={pin.title}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={e => {
                            const target = e.currentTarget;
                            if (pin.thumbnailUrl && target.src !== pin.thumbnailUrl) {
                              target.src = pin.thumbnailUrl;
                            }
                          }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/75 text-amber-200 text-[11px] font-cinzel font-semibold">
                            <ZoomIn className="w-3 h-3" />
                            <span>Inspect Pin</span>
                          </span>
                        </div>
                      </div>

                      <div className="p-3.5 space-y-1.5">
                        <div className="flex items-center justify-between text-[11px] font-serif text-amber-800 font-semibold">
                          <span>@{pin.username}</span>
                          {pin.pubDate && (
                            <span className="text-stone-400">
                              {new Date(pin.pubDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                          )}
                        </div>
                        <h4 className="font-serif font-bold text-sm text-stone-900 line-clamp-2 leading-snug">
                          {pin.title}
                        </h4>
                        {pin.description && pin.description !== pin.title && (
                          <p className="text-xs font-serif text-stone-600 line-clamp-3 leading-relaxed">
                            {pin.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="px-3.5 py-2.5 bg-stone-50 border-t border-stone-200/80 flex items-center justify-between text-xs font-serif">
                      <button
                        onClick={() =>
                          setActiveLightboxPost({
                            title: pin.title,
                            subtitle: `@${pin.username}`,
                            description: pin.description,
                            imageUrl: pin.imageUrl,
                            externalUrl: pin.link,
                            externalLabel: 'View Pin on Pinterest'
                          })
                        }
                        className="text-stone-700 hover:text-amber-900 font-semibold cursor-pointer"
                      >
                        Full View
                      </button>
                      <a
                        href={pin.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-amber-800 hover:text-amber-950 font-semibold"
                      >
                        <span>Pinterest</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Lightbox Modal for Static Posts & Pinterest Pins */}
      {activeLightboxPost && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveLightboxPost(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#FBF9F5] rounded-2xl border border-amber-500/40 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveLightboxPost(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/70 text-amber-200 hover:bg-black cursor-pointer"
              title="Close preview"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="md:w-3/5 bg-stone-950 flex items-center justify-center overflow-hidden">
              <img
                src={activeLightboxPost.imageUrl}
                alt={activeLightboxPost.title}
                referrerPolicy="no-referrer"
                className="max-h-[82vh] w-auto object-contain"
              />
            </div>

            <div className="md:w-2/5 p-6 flex flex-col justify-between space-y-4 overflow-y-auto">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-900/10 text-amber-900 text-xs font-cinzel font-bold">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{activeLightboxPost.subtitle}</span>
                </div>

                <h3 className="font-cinzel text-lg font-bold text-stone-900 leading-snug">
                  {activeLightboxPost.title}
                </h3>

                <p className="text-sm font-serif text-stone-700 whitespace-pre-line leading-relaxed">
                  {activeLightboxPost.description}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <a
                  href={activeLightboxPost.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#241307] hover:bg-[#3A1D0D] text-amber-200 text-xs font-cinzel font-bold tracking-wider uppercase transition-colors"
                >
                  <span>{activeLightboxPost.externalLabel}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
