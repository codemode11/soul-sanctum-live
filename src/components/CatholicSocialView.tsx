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
  ChevronRight,
  Layers,
  Play,
  ThumbsUp,
  Newspaper,
  Clock,
  Calendar
} from 'lucide-react';
import {
  CATHOLIC_INSTAGRAM_SOURCES,
  CATHOLIC_FACEBOOK_SOURCES,
  CATHOLIC_FACEBOOK_POSTS,
  CATHOLIC_PINTEREST_SOURCES,
  INITIAL_PINTEREST_PINS_FALLBACK,
  CatholicInstagramSource,
  CatholicFacebookSource,
  CatholicFacebookPost,
  CatholicPinterestSource,
  CatholicStaticSocialPost,
  PinterestPinItem
} from '../data/catholicSocial';

type SocialPlatformTab = 'all' | 'instagram' | 'facebook' | 'pinterest';

export const CatholicSocialView: React.FC = () => {
  const [activePlatform, setActivePlatform] = useState<SocialPlatformTab>('all');

  // Instagram state
  const [selectedIgSource, setSelectedIgSource] = useState<CatholicInstagramSource>(CATHOLIC_INSTAGRAM_SOURCES[0]);
  const [igShortcodes, setIgShortcodes] = useState<string[]>(CATHOLIC_INSTAGRAM_SOURCES[0].defaultShortcodes);
  const [igPosts, setIgPosts] = useState<CatholicStaticSocialPost[]>([]);
  const [igProfilePic, setIgProfilePic] = useState<string>('');
  const [isLoadingIg, setIsLoadingIg] = useState<boolean>(false);
  const [customIgInput, setCustomIgInput] = useState<string>('');
  const [igRefreshKey, setIgRefreshKey] = useState<number>(0);

  // Facebook Catholic Posts state
  const [selectedFbSourceId, setSelectedFbSourceId] = useState<string>('all');
  const [fbPostSearch, setFbPostSearch] = useState<string>('');
  const [customFbPosts, setCustomFbPosts] = useState<CatholicFacebookPost[]>([]);
  const [customFbInput, setCustomFbInput] = useState<string>('');
  const [isLoadingCustomFb, setIsLoadingCustomFb] = useState<boolean>(false);
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

  // Fetch live Instagram data (posts + shortcodes + profile pic) for selected account
  const fetchInstagramShortcodes = useCallback(async (source: CatholicInstagramSource) => {
    setIsLoadingIg(true);
    setIgShortcodes(source.defaultShortcodes);
    try {
      const res = await fetch(`/api/catholic-instagram?username=${encodeURIComponent(source.username)}`);
      if (res.ok) {
        const data = await res.json();
        if (typeof data.profilePicUrl === 'string') {
          setIgProfilePic(data.profilePicUrl);
        }
        if (Array.isArray(data.posts) && data.posts.length > 0) {
          setIgPosts(data.posts);
        }
        if (Array.isArray(data.shortcodes) && data.shortcodes.length > 0) {
          const merged = Array.from(new Set([...data.shortcodes, ...source.defaultShortcodes]));
          setIgShortcodes(merged.slice(0, 6));
        }
      }
    } catch {
      // Keep default verified shortcodes on network timeout
    } finally {
      setIsLoadingIg(false);
    }
  }, []);

  useEffect(() => {
    setIgPosts([]);
    fetchInstagramShortcodes(selectedIgSource);
  }, [selectedIgSource, fetchInstagramShortcodes]);

  // Combined Facebook Catholic Posts (defaults + user-loaded)
  const allFbPosts = React.useMemo(() => {
    return [...customFbPosts, ...CATHOLIC_FACEBOOK_POSTS];
  }, [customFbPosts]);

  // Filter Catholic Facebook posts by source and search query
  const filteredFbPosts = React.useMemo(() => {
    return allFbPosts.filter(post => {
      const matchesSource =
        selectedFbSourceId === 'all' || post.sourceId === selectedFbSourceId;
      if (!matchesSource) return false;
      if (!fbPostSearch.trim()) return true;
      const q = fbPostSearch.toLowerCase();
      return (
        post.text.toLowerCase().includes(q) ||
        post.sourceName.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        post.handle.toLowerCase().includes(q) ||
        post.imageAlt.toLowerCase().includes(q)
      );
    });
  }, [allFbPosts, selectedFbSourceId, fbPostSearch]);

  const currentFbSource = React.useMemo(() => {
    if (selectedFbSourceId === 'all') return null;
    return CATHOLIC_FACEBOOK_SOURCES.find(s => s.id === selectedFbSourceId) || null;
  }, [selectedFbSourceId]);

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
      setCustomIgInput('');
    }
  };

  const handleCustomFacebookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customFbInput.trim();
    if (!trimmed) return;

    const cleanHandle = trimmed.replace(/^@/, '').toLowerCase();
    const matchedSource = CATHOLIC_FACEBOOK_SOURCES.find(
      s =>
        s.socialUsername.toLowerCase() === cleanHandle ||
        s.id.toLowerCase().includes(cleanHandle) ||
        s.name.toLowerCase().includes(cleanHandle)
    );
    if (matchedSource) {
      setSelectedFbSourceId(matchedSource.id);
      setFbPostSearch('');
      setCustomFbInput('');
    } else {
      setFbPostSearch(trimmed);
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
          <div className="bg-gradient-to-r from-[#241307] via-[#3A1D0D] to-[#241307] px-4 py-3 sm:px-5 sm:py-3.5 border-b border-amber-500/30 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-amber-400" />
                <span className="font-cinzel text-xs font-bold tracking-[0.2em] uppercase text-amber-300">
                  CATHOLIC INSTAGRAM
                </span>
              </div>
              <h3 className="font-cinzel text-base sm:text-lg font-bold text-white">
                {selectedIgSource.name} <span className="text-amber-300 font-serif text-sm font-normal">(@{selectedIgSource.username})</span>
              </h3>
              <p className="text-xs text-stone-300 font-serif">
                {selectedIgSource.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  setIgRefreshKey(prev => prev + 1);
                  fetchInstagramShortcodes(selectedIgSource);
                }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-amber-200 border border-white/15 text-xs font-cinzel font-semibold cursor-pointer transition-colors"
                title="Refresh Instagram Feed"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoadingIg ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>

              <a
                href={selectedIgSource.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 text-xs font-cinzel font-semibold transition-colors"
              >
                <span>@{selectedIgSource.username}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="p-3 sm:p-4 space-y-3.5">
            {/* Account Selector Bar (Compact arranged buttons) */}
            <div className="rounded-lg bg-[#241307]/[0.025] border border-amber-900/10 p-1.5 sm:p-2 flex flex-col xl:flex-row xl:items-center justify-between gap-1.5 shadow-xs">
              <div className="flex flex-wrap items-center gap-1">
                {CATHOLIC_INSTAGRAM_SOURCES.map(src => (
                  <button
                    key={src.id}
                    onClick={() => setSelectedIgSource(src)}
                    className={`px-2 py-0.5 rounded-md text-[11px] sm:text-xs font-serif font-medium transition-all cursor-pointer border ${
                      selectedIgSource.username === src.username
                        ? 'bg-[#241307] text-amber-200 border-amber-700 shadow-xs font-semibold'
                        : 'bg-white text-stone-700 border-stone-200 hover:border-amber-600/50 hover:bg-stone-50'
                    }`}
                  >
                    {src.name}
                  </button>
                ))}
              </div>

              <form onSubmit={handleCustomInstagramSubmit} className="flex items-center gap-1 shrink-0">
                <input
                  type="text"
                  value={customIgInput}
                  onChange={e => setCustomIgInput(e.target.value)}
                  placeholder="Add @username or Post URL..."
                  className="px-2 py-0.5 rounded-md bg-white border border-stone-300 text-[11px] sm:text-xs font-serif text-stone-800 focus:outline-none focus:border-amber-700 w-36 sm:w-48 placeholder:text-stone-400"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-800 hover:bg-amber-900 text-amber-50 text-[11px] font-cinzel font-semibold cursor-pointer transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  <span>Load</span>
                </button>
              </form>
            </div>

            {/* Single Unified Catholic Instagram Viewer (Two Rows × Three Columns = 6 Posts) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {igShortcodes.slice(0, 6).map((code, idx) => (
                <div
                  key={`ig-post-${code}-${igRefreshKey}`}
                  className="rounded-xl overflow-hidden border border-stone-200 bg-white shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between"
                >
                  <iframe
                    src={`https://www.instagram.com/p/${code.trim()}/embed/captioned/`}
                    title={`Instagram Post ${idx + 1} from @${selectedIgSource.username}`}
                    className="w-full h-[580px] border-0"
                    loading="eager"
                    allow="encrypted-media"
                    allowTransparency={true}
                  />
                  <div className="px-4 py-2.5 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs font-serif text-stone-600">
                    <span className="font-semibold text-stone-700">
                      @{selectedIgSource.username} • <span className="text-amber-800 font-cinzel text-[11px]">Post {idx + 1} of 6</span>
                    </span>
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
          </div>
        </section>
      )}

      {/* =====================================================================
          2. CATHOLIC FACEBOOK ARTICLES & DISPATCHES
          ===================================================================== */}
      {/* =====================================================================
          2. CATHOLIC FACEBOOK POSTS & SACRED REFLECTIONS
          ===================================================================== */}
      {(activePlatform === 'all' || activePlatform === 'facebook') && (
        <section className="rounded-2xl bg-[#FBF9F5] border border-amber-900/20 shadow-xl overflow-hidden">
          {/* Facebook Header Rectangle */}
          <div className="bg-gradient-to-r from-[#241307] via-[#132647] to-[#241307] px-4 py-3 sm:px-5 sm:py-3.5 border-b border-amber-500/30 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-400" />
                <span className="font-cinzel text-xs font-bold tracking-[0.2em] uppercase text-amber-300">
                  CATHOLIC FACEBOOK
                </span>
              </div>
              <h3 className="font-cinzel text-base sm:text-lg font-bold text-white">
                {currentFbSource ? (
                  <>
                    {currentFbSource.name}{' '}
                    <span className="text-amber-300 font-serif text-sm font-normal">
                      ({currentFbSource.handle})
                    </span>
                  </>
                ) : (
                  'Catholic Facebook Posts & Reflections'
                )}
              </h3>
              <p className="text-xs text-stone-300 font-serif">
                {currentFbSource
                  ? currentFbSource.description
                  : 'Daily spiritual reflections, Scripture commentary, Patristic wisdom, and prayers from official Catholic Facebook pages.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {currentFbSource ? (
                <>
                  <button
                    onClick={() => {
                      setSelectedFbSourceId('all');
                      setFbPostSearch('');
                    }}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-amber-200 border border-white/15 text-xs font-cinzel font-semibold cursor-pointer transition-colors"
                    title="View All Sources"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>All Sources</span>
                  </button>

                  <a
                    href={currentFbSource.pageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1877F2]/40 hover:bg-[#1877F2]/60 text-blue-100 border border-blue-400/40 text-xs font-cinzel font-semibold transition-colors"
                  >
                    <span>{currentFbSource.handle}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </>
              ) : (
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 text-blue-200 border border-blue-400/40 text-xs font-cinzel font-semibold transition-colors"
                >
                  <span>Facebook</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          <div className="p-3 sm:p-4 space-y-3.5">
            {/* Account Selector Bar (Compact arranged buttons matching Instagram design) */}
            <div className="rounded-lg bg-[#241307]/[0.025] border border-amber-900/10 p-1.5 sm:p-2 flex flex-col xl:flex-row xl:items-center justify-between gap-1.5 shadow-xs">
              <div className="flex flex-wrap items-center gap-1">
                <button
                  onClick={() => setSelectedFbSourceId('all')}
                  className={`px-2 py-0.5 rounded-md text-[11px] sm:text-xs font-serif font-medium transition-all cursor-pointer border ${
                    selectedFbSourceId === 'all'
                      ? 'bg-[#241307] text-amber-200 border-amber-700 shadow-xs font-semibold'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-amber-600/50 hover:bg-stone-50'
                  }`}
                >
                  All Sources ({allFbPosts.length})
                </button>
                {CATHOLIC_FACEBOOK_SOURCES.map(src => {
                  const shortName = src.name.replace(/\s*\(.*\)/, '');
                  const isSelected = selectedFbSourceId === src.id;
                  return (
                    <button
                      key={src.id}
                      onClick={() => setSelectedFbSourceId(src.id)}
                      className={`px-2 py-0.5 rounded-md text-[11px] sm:text-xs font-serif font-medium transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-[#241307] text-amber-200 border-amber-700 shadow-xs font-semibold'
                          : 'bg-white text-stone-700 border-stone-200 hover:border-amber-600/50 hover:bg-stone-50'
                      }`}
                    >
                      {shortName}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center gap-1.5 shrink-0 pt-0.5 xl:pt-0">
                <div className="relative">
                  <Search className="w-3 h-3 text-stone-400 absolute left-2 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={fbPostSearch}
                    onChange={e => setFbPostSearch(e.target.value)}
                    placeholder="Search reflections..."
                    className="pl-6 pr-2 py-0.5 rounded-md bg-white border border-stone-300 text-[11px] sm:text-xs font-serif text-stone-800 focus:outline-none focus:border-amber-700 w-32 sm:w-44 placeholder:text-stone-400"
                  />
                </div>

                <form onSubmit={handleCustomFacebookSubmit} className="flex items-center gap-1">
                  <input
                    type="text"
                    value={customFbInput}
                    onChange={e => setCustomFbInput(e.target.value)}
                    placeholder="Filter source or topic..."
                    className="px-2 py-0.5 rounded-md bg-white border border-stone-300 text-[11px] sm:text-xs font-serif text-stone-800 focus:outline-none focus:border-amber-700 w-28 sm:w-36 placeholder:text-stone-400"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-800 hover:bg-amber-900 text-amber-50 text-[11px] font-cinzel font-semibold cursor-pointer transition-colors"
                  >
                    <Search className="w-3 h-3" />
                    <span>Find</span>
                  </button>
                </form>
              </div>
            </div>

            {/* Posts Grid */}
            {filteredFbPosts.length === 0 ? (
              <div className="py-12 text-center space-y-2">
                <p className="text-sm font-serif text-stone-600">
                  No matching Catholic Facebook posts found.
                </p>
                <button
                  onClick={() => {
                    setSelectedFbSourceId('all');
                    setFbPostSearch('');
                  }}
                  className="px-3 py-1 rounded-md bg-[#241307] text-amber-200 text-xs font-cinzel cursor-pointer"
                >
                  Show All Sources
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {filteredFbPosts.map(post => (
                  <article
                    key={post.id}
                    className="rounded-xl bg-white border border-stone-200 hover:border-amber-600/60 shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between"
                  >
                    <div>
                      {/* Facebook Post Author Header */}
                      <div className="p-3 flex items-center justify-between border-b border-stone-100">
                        <div className="flex items-center gap-2.5 min-w-0">
                          {post.avatarUrl ? (
                            <img
                              src={post.avatarUrl}
                              alt={post.sourceName}
                              className="w-9 h-9 rounded-full object-cover border border-amber-500/40 shrink-0 shadow-xs"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-[#241307] text-amber-200 flex items-center justify-center font-cinzel font-bold text-xs shrink-0 shadow-xs">
                              {post.sourceName.charAt(0)}
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <h4 className="font-cinzel font-bold text-xs sm:text-sm text-stone-900 truncate">
                                {post.sourceName}
                              </h4>
                              {post.verified && (
                                <span
                                  className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-blue-600 text-white text-[9px] font-bold shrink-0"
                                  title="Verified Catholic Organization"
                                >
                                  ✓
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 text-[11px] font-serif text-stone-500 truncate">
                              <span>{post.handle}</span>
                              <span>•</span>
                              <span>{post.postDate}</span>
                              <span>•</span>
                              <span title="Public post" className="inline-flex items-center">
                                <Globe className="w-3 h-3 text-stone-400" />
                              </span>
                            </div>
                          </div>
                        </div>

                        <span className="px-2 py-0.5 rounded-md bg-amber-900/10 text-amber-900 border border-amber-800/20 text-[9px] font-cinzel font-bold tracking-wider uppercase shrink-0">
                          {post.category}
                        </span>
                      </div>

                      {/* Post Reflection Text */}
                      <div className="p-3.5 space-y-2">
                        <p className="text-xs sm:text-[13px] font-serif text-stone-800 whitespace-pre-line leading-relaxed">
                          {post.text}
                        </p>
                      </div>

                      {/* High-Resolution Sacred Catholic Image */}
                      <div
                        onClick={() =>
                          setActiveLightboxPost({
                            title: post.sourceName,
                            subtitle: post.category,
                            description: post.text,
                            imageUrl: post.imageUrl,
                            externalUrl: post.pageUrl,
                            externalLabel: 'View on Facebook'
                          })
                        }
                        className="relative aspect-[16/10] w-full overflow-hidden bg-stone-950 cursor-pointer group"
                        title="Click to view full sacred image"
                      >
                        <img
                          src={post.imageUrl}
                          alt={post.imageAlt}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-2.5">
                          <span className="text-[11px] font-serif text-stone-200 truncate pr-2 italic">
                            {post.imageAlt}
                          </span>
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-black/75 text-amber-200 text-[10px] font-cinzel font-semibold shrink-0">
                            <ZoomIn className="w-3 h-3" />
                            <span>Zoom</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Facebook Footer: Likes, Comments, Shares & Action Links */}
                    <div className="px-3 py-2.5 bg-stone-50 border-t border-stone-200/80 flex items-center justify-between text-[11px] font-serif text-stone-600">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1 text-stone-700 font-semibold" title="Likes, Love and Prayers">
                          <span className="inline-flex items-center -space-x-1">
                            <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[9px] shadow-xs">👍</span>
                            <span className="w-4 h-4 rounded-full bg-red-500 text-white flex items-center justify-center text-[9px] shadow-xs">❤️</span>
                            <span className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center text-[9px] shadow-xs">🙏</span>
                          </span>
                          <span className="ml-1">{post.likesCount.toLocaleString()}</span>
                        </span>
                        <span className="inline-flex items-center gap-1 text-stone-700 font-semibold" title="Comments">
                          <MessageCircle className="w-3 h-3 text-stone-500" />
                          <span>{post.commentsCount.toLocaleString()}</span>
                        </span>
                        <span className="inline-flex items-center gap-1 text-stone-700 font-semibold" title="Shares">
                          <Share2 className="w-3 h-3 text-stone-500" />
                          <span>{post.sharesCount.toLocaleString()}</span>
                        </span>
                      </div>

                      <a
                        href={post.pageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#1877F2] hover:bg-[#166FE5] text-white text-[11px] font-cinzel font-bold transition-colors shadow-xs"
                      >
                        <span>View on Facebook</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </article>
                ))}
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
