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
  ZoomIn
} from 'lucide-react';
import {
  CATHOLIC_INSTAGRAM_SOURCES,
  CATHOLIC_FACEBOOK_SOURCES,
  CATHOLIC_PINTEREST_SOURCES,
  INITIAL_PINTEREST_PINS_FALLBACK,
  CatholicInstagramSource,
  CatholicFacebookSource,
  CatholicPinterestSource,
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

  // Facebook state
  const [selectedFbSource, setSelectedFbSource] = useState<CatholicFacebookSource>(CATHOLIC_FACEBOOK_SOURCES[0]);
  const [secondaryFbSource, setSecondaryFbSource] = useState<CatholicFacebookSource>(CATHOLIC_FACEBOOK_SOURCES[1]);
  const [fbLayoutMode, setFbLayoutMode] = useState<'single' | 'dual'>('dual');
  const [customFbUrl, setCustomFbUrl] = useState<string>('');
  const [fbRefreshKey, setFbRefreshKey] = useState<number>(0);

  // Pinterest state
  const [selectedPinSource, setSelectedPinSource] = useState<CatholicPinterestSource>(CATHOLIC_PINTEREST_SOURCES[0]);
  const [pinterestPins, setPinterestPins] = useState<PinterestPinItem[]>(INITIAL_PINTEREST_PINS_FALLBACK);
  const [isLoadingPins, setIsLoadingPins] = useState<boolean>(false);
  const [pinSearchQuery, setPinSearchQuery] = useState<string>('');
  const [customPinUser, setCustomPinUser] = useState<string>('');
  const [activeLightboxPin, setActiveLightboxPin] = useState<PinterestPinItem | null>(null);

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

    // Check if user pasted a direct Instagram post/reel link
    const postMatch = trimmed.match(/instagram\.com\/(?:p|reel)\/([A-Za-z0-9_-]+)/i);
    if (postMatch && postMatch[1]) {
      const code = postMatch[1];
      setIgShortcodes(prev => [code, ...prev.filter(c => c !== code)]);
      setIgViewMode('posts');
      setCustomIgInput('');
      return;
    }

    // Otherwise treat as an Instagram username or profile URL
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
    const trimmed = customFbUrl.trim();
    if (!trimmed) return;

    const fullUrl = trimmed.startsWith('http')
      ? trimmed
      : `https://www.facebook.com/${trimmed.replace(/^@/, '')}`;

    const handleName = fullUrl
      .replace(/^https?:\/\/(www\.)?facebook\.com\//i, '')
      .split(/[/?#]/)[0];

    const customSource: CatholicFacebookSource = {
      id: `fb-custom-${handleName}`,
      name: handleName || 'Custom Catholic Page',
      handle: `@${handleName}`,
      pageUrl: fullUrl,
      category: 'Custom Facebook Page',
      description: `Live Facebook Page timeline for ${fullUrl}`
    };
    setSelectedFbSource(customSource);
    setFbLayoutMode('single');
    setCustomFbUrl('');
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

  const buildFacebookPluginUrl = (pageUrl: string, width = 500, height = 680) => {
    return `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
      pageUrl
    )}&tabs=timeline&width=${width}&height=${height}&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      {/* Compact Hero Banner */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-stone-900 via-[#1E130B] to-stone-950 border border-amber-500/35 px-4 py-3.5 sm:px-5 sm:py-4 shadow-xl text-stone-100">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="space-y-0.5 min-w-0">
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-amber-400 shrink-0" />
              <h2 className="font-cinzel text-lg sm:text-xl font-bold text-white tracking-wide truncate">
                Catholic Social — Instagram, Facebook &amp; Pinterest
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-stone-300 font-serif truncate">
              Live social posts, Reels, ministry timelines, and sacred art boards from Catholic apostolates.
            </p>
          </div>

          {/* Platform Quick Badges */}
          <div className="flex flex-wrap items-center gap-1.5 shrink-0">
            <button
              onClick={() => setActivePlatform('all')}
              className={`px-3 py-1.5 rounded-lg font-cinzel text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer border ${
                activePlatform === 'all'
                  ? 'bg-amber-500 text-stone-950 border-amber-300 shadow-md'
                  : 'bg-white/10 text-amber-100 border-white/15 hover:bg-white/20'
              }`}
            >
              All 3 Platforms
            </button>
            <button
              onClick={() => setActivePlatform('instagram')}
              className={`px-3 py-1.5 rounded-lg font-cinzel text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer border ${
                activePlatform === 'instagram'
                  ? 'bg-gradient-to-r from-pink-600 to-amber-500 text-white border-pink-300 shadow-md'
                  : 'bg-white/10 text-amber-100 border-white/15 hover:bg-white/20'
              }`}
            >
              Instagram
            </button>
            <button
              onClick={() => setActivePlatform('facebook')}
              className={`px-3 py-1.5 rounded-lg font-cinzel text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer border ${
                activePlatform === 'facebook'
                  ? 'bg-blue-600 text-white border-blue-300 shadow-md'
                  : 'bg-white/10 text-amber-100 border-white/15 hover:bg-white/20'
              }`}
            >
              Facebook
            </button>
            <button
              onClick={() => setActivePlatform('pinterest')}
              className={`px-3 py-1.5 rounded-lg font-cinzel text-[11px] font-bold tracking-wider uppercase transition-all cursor-pointer border ${
                activePlatform === 'pinterest'
                  ? 'bg-red-700 text-white border-red-300 shadow-md'
                  : 'bg-white/10 text-amber-100 border-white/15 hover:bg-white/20'
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
                  className="w-full h-[640px] border-0"
                  loading="lazy"
                  allowTransparency={true}
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {igShortcodes.slice(0, activePlatform === 'all' ? 3 : 6).map(code => (
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
          2. PINTEREST SACRED ART & QUOTE BOARDS (LIVE RSS)
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
                {filteredPins.slice(0, activePlatform === 'all' ? 8 : 24).map(pin => (
                  <div
                    key={pin.id}
                    className="group rounded-xl bg-white border border-stone-200/90 hover:border-amber-600/60 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div
                        onClick={() => setActiveLightboxPin(pin)}
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
                        onClick={() => setActiveLightboxPin(pin)}
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

      {/* =====================================================================
          3. FACEBOOK PAGE TIMELINES SECTION
          ===================================================================== */}
      {(activePlatform === 'all' || activePlatform === 'facebook') && (
        <section className="rounded-2xl bg-[#FBF9F5] border border-amber-900/20 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-[#241307] via-[#132647] to-[#241307] px-5 py-4 sm:px-6 sm:py-5 border-b border-amber-500/30 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-400" />
                <span className="font-cinzel text-xs font-bold tracking-[0.2em] uppercase text-amber-300">
                  CATHOLIC FACEBOOK TIMELINES
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
                  onClick={() => setFbLayoutMode('dual')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-semibold cursor-pointer transition-colors ${
                    fbLayoutMode === 'dual'
                      ? 'bg-amber-500 text-stone-950'
                      : 'text-stone-200 hover:text-white'
                  }`}
                >
                  Dual Timelines
                </button>
                <button
                  onClick={() => setFbLayoutMode('single')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-semibold cursor-pointer transition-colors ${
                    fbLayoutMode === 'single'
                      ? 'bg-amber-500 text-stone-950'
                      : 'text-stone-200 hover:text-white'
                  }`}
                >
                  Single Timeline
                </button>
              </div>

              <button
                onClick={() => setFbRefreshKey(prev => prev + 1)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-amber-200 border border-white/15 text-xs font-cinzel font-semibold cursor-pointer transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload</span>
              </button>

              <a
                href={selectedFbSource.pageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-400/40 text-xs font-cinzel font-semibold transition-colors"
              >
                <span>Open on Facebook</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="p-4 sm:p-6 space-y-5">
            {/* Facebook Page Selector + Custom Page Input */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-stone-200">
              <div className="flex flex-wrap items-center gap-2">
                {CATHOLIC_FACEBOOK_SOURCES.map(src => (
                  <button
                    key={src.id}
                    onClick={() => {
                      if (selectedFbSource.id !== src.id) {
                        setSecondaryFbSource(selectedFbSource);
                        setSelectedFbSource(src);
                      }
                    }}
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
                  value={customFbUrl}
                  onChange={e => setCustomFbUrl(e.target.value)}
                  placeholder="Enter Facebook Page URL or handle..."
                  className="px-3 py-1.5 rounded-xl bg-white border border-stone-300 text-xs font-serif text-stone-800 focus:outline-none focus:border-amber-700 w-52 sm:w-60"
                />
                <button
                  type="submit"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-amber-50 text-xs font-cinzel font-semibold cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Load Page</span>
                </button>
              </form>
            </div>

            {/* Embedded Facebook Timelines */}
            <div
              className={`grid gap-6 ${
                fbLayoutMode === 'dual' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 max-w-xl mx-auto'
              }`}
            >
              {/* Primary Timeline */}
              <div className="rounded-xl bg-white border border-stone-200 p-3 sm:p-4 shadow-md flex flex-col items-center">
                <div className="w-full flex items-center justify-between pb-3 mb-3 border-b border-stone-100">
                  <div>
                    <span className="text-[10px] font-cinzel font-bold uppercase tracking-wider text-amber-800 block">
                      {selectedFbSource.category}
                    </span>
                    <h4 className="font-cinzel font-bold text-sm sm:text-base text-stone-900">
                      {selectedFbSource.name}
                    </h4>
                  </div>
                  <a
                    href={selectedFbSource.pageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-serif font-semibold text-amber-800 hover:text-amber-950"
                  >
                    <span>Facebook Page</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                <iframe
                  key={`fb-primary-${selectedFbSource.pageUrl}-${fbRefreshKey}`}
                  src={buildFacebookPluginUrl(selectedFbSource.pageUrl, 500, 680)}
                  width="500"
                  height="680"
                  className="max-w-full border-0 overflow-hidden rounded-lg"
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  title={`${selectedFbSource.name} Facebook Timeline`}
                />
              </div>

              {/* Secondary Timeline in Dual Mode */}
              {fbLayoutMode === 'dual' && (
                <div className="rounded-xl bg-white border border-stone-200 p-3 sm:p-4 shadow-md flex flex-col items-center">
                  <div className="w-full flex items-center justify-between pb-3 mb-3 border-b border-stone-100">
                    <div>
                      <span className="text-[10px] font-cinzel font-bold uppercase tracking-wider text-amber-800 block">
                        {secondaryFbSource.category}
                      </span>
                      <h4 className="font-cinzel font-bold text-sm sm:text-base text-stone-900">
                        {secondaryFbSource.name}
                      </h4>
                    </div>
                    <a
                      href={secondaryFbSource.pageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-serif font-semibold text-amber-800 hover:text-amber-950"
                    >
                      <span>Facebook Page</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                  <iframe
                    key={`fb-secondary-${secondaryFbSource.pageUrl}-${fbRefreshKey}`}
                    src={buildFacebookPluginUrl(secondaryFbSource.pageUrl, 500, 680)}
                    width="500"
                    height="680"
                    className="max-w-full border-0 overflow-hidden rounded-lg"
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    title={`${secondaryFbSource.name} Facebook Timeline`}
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox Modal for Pinterest Pins */}
      {activeLightboxPin && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setActiveLightboxPin(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-[#FBF9F5] rounded-2xl border border-amber-500/40 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveLightboxPin(null)}
              className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/70 text-amber-200 hover:bg-black cursor-pointer"
              title="Close preview"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="md:w-3/5 bg-stone-950 flex items-center justify-center overflow-hidden">
              <img
                src={activeLightboxPin.imageUrl}
                alt={activeLightboxPin.title}
                referrerPolicy="no-referrer"
                onError={e => {
                  const target = e.currentTarget;
                  if (activeLightboxPin.thumbnailUrl && target.src !== activeLightboxPin.thumbnailUrl) {
                    target.src = activeLightboxPin.thumbnailUrl;
                  }
                }}
                className="max-h-[80vh] w-auto object-contain"
              />
            </div>

            <div className="md:w-2/5 p-6 flex flex-col justify-between space-y-4 overflow-y-auto">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-900/10 text-amber-900 text-xs font-cinzel font-bold">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>@{activeLightboxPin.username}</span>
                </div>

                <h3 className="font-cinzel text-lg font-bold text-stone-900 leading-snug">
                  {activeLightboxPin.title}
                </h3>

                <p className="text-sm font-serif text-stone-700 leading-relaxed">
                  {activeLightboxPin.description}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                <a
                  href={activeLightboxPin.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#241307] hover:bg-[#3A1D0D] text-amber-200 text-xs font-cinzel font-bold tracking-wider uppercase transition-colors"
                >
                  <span>View Pin on Pinterest</span>
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
