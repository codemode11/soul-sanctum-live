import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  ExternalLink,
  RefreshCw,
  Plus,
  X,
  Camera,
  Play,
  Tv,
  Search,
  ThumbsUp,
  Eye,
  CheckCircle2
} from 'lucide-react';
import {
  CATHOLIC_INSTAGRAM_SOURCES,
  CatholicInstagramSource,
  CatholicStaticSocialPost
} from '../data/catholicSocial';
import {
  CHRISTENDOM_CHANNELS,
  CHRISTENDOM_VIDEOS,
  ChristendomVideo
} from '../data/christendomData';
import { CatholicSocialShareIcon } from './SanctumIcons';

type SocialPlatformTab = 'all' | 'instagram' | 'christendom';

export const CatholicSocialView: React.FC = () => {
  const [activePlatform, setActivePlatform] = useState<SocialPlatformTab>('all');

  // =========================================================================
  // INSTAGRAM STATE
  // =========================================================================
  const [selectedIgSource, setSelectedIgSource] = useState<CatholicInstagramSource>(CATHOLIC_INSTAGRAM_SOURCES[0]);
  const [igShortcodes, setIgShortcodes] = useState<string[]>(CATHOLIC_INSTAGRAM_SOURCES[0].defaultShortcodes);
  const [, setIgPosts] = useState<CatholicStaticSocialPost[]>([]);
  const [, setIgProfilePic] = useState<string>('');
  const [isLoadingIg, setIsLoadingIg] = useState<boolean>(false);
  const [customIgInput, setCustomIgInput] = useState<string>('');
  const [igRefreshKey, setIgRefreshKey] = useState<number>(0);

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
          const brokenSet = new Set(['DfagCq8D3sp', 'DfYQhEYAB8J', 'DfWDi7HDNuW', 'DfPX9L3D8mF']);
          const merged = Array.from(new Set([...data.shortcodes, ...source.defaultShortcodes])).filter(c => !brokenSet.has(c));
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

  // =========================================================================
  // CHRISTENDOM STATE
  // =========================================================================
  const [selectedChannelId, setSelectedChannelId] = useState<string>('all');
  const [selectedVideoCategory, setSelectedVideoCategory] = useState<string>('All');
  const [videoSearchQuery, setVideoSearchQuery] = useState<string>('');
  const [activeVideo, setActiveVideo] = useState<ChristendomVideo | null>(null);

  const videoCategories = useMemo(() => {
    return [
      'All',
      'Theology & Homilies',
      'Sacred Scripture',
      'Church History',
      'Apologetics & Culture',
      'Sacred Liturgy & Chant',
      'Documentaries'
    ];
  }, []);

  const filteredVideos = useMemo(() => {
    return CHRISTENDOM_VIDEOS.filter(v => {
      const matchesChannel = selectedChannelId === 'all' || v.channelId === selectedChannelId;
      if (!matchesChannel) return false;

      const matchesCategory = selectedVideoCategory === 'All' || v.category === selectedVideoCategory;
      if (!matchesCategory) return false;

      if (!videoSearchQuery.trim()) return true;
      const q = videoSearchQuery.toLowerCase();
      return (
        v.title.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        v.channelName.toLowerCase().includes(q) ||
        v.category.toLowerCase().includes(q)
      );
    });
  }, [selectedChannelId, selectedVideoCategory, videoSearchQuery]);

  const activeChannel = useMemo(() => {
    if (selectedChannelId === 'all') return null;
    return CHRISTENDOM_CHANNELS.find(c => c.id === selectedChannelId) || null;
  }, [selectedChannelId]);

  return (
    <div className="max-w-5xl mx-auto p-3 sm:p-6 md:p-8 rounded-xl bg-white/45 backdrop-blur-xl backdrop-saturate-150 border border-white/60 ring-1 ring-inset ring-white/40 shadow-[0_8px_32px_0_rgba(120,90,50,0.12)] space-y-6 mb-12">
      {/* Top Banner Rectangle */}
      <div className="bg-white/55 backdrop-blur-xl backdrop-saturate-150 rounded-xl shadow-xs border border-white/70 ring-1 ring-inset ring-white/40 relative z-20">
        <div className="px-5 pt-4 pb-4 sm:px-6 min-h-[148px] bg-gradient-to-r from-stone-900 via-stone-850 to-stone-800 text-stone-100 flex flex-col justify-between rounded-xl">
          <div className="space-y-1.5">
            {/* Line 1: Badge & Subtitle */}
            <div className="flex items-center gap-2.5 flex-nowrap overflow-hidden">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs text-xs font-semibold uppercase tracking-wider whitespace-nowrap shrink-0 bg-amber-500 text-amber-950">
                <CatholicSocialShareIcon className="w-3.5 h-3.5" />
                <span>CATHOLIC SOCIAL &amp; MEDIA</span>
              </span>
              <span className="text-sm sm:text-base text-stone-300 font-serif whitespace-nowrap truncate">
                Curated Posts from Faithful Catholic Apostolates &amp; Christendom
              </span>
            </div>

            {/* Line 2: Main Title */}
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-normal text-amber-100 leading-snug break-words">
              Catholic Instagram &amp; Christendom.com
            </h2>
          </div>

          {/* Line 3: Platform Filter Controls */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 mt-auto pt-3 border-t border-stone-700/60">
            <span className="text-xs font-serif text-stone-300 hidden sm:inline">
              Filter Media Channels:
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActivePlatform('all')}
                className={`h-8 px-3 rounded-md font-cinzel text-xs font-bold tracking-wider uppercase transition-all cursor-pointer border ${
                  activePlatform === 'all'
                    ? 'bg-amber-500 text-stone-950 border-amber-300 shadow-sm'
                    : 'bg-[#1C120C]/90 text-[#D4A373] border-[#8B5A2B]/50 hover:border-[#D4A373]/70 hover:text-[#F7EBE1]'
                }`}
              >
                All Feeds
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
                onClick={() => setActivePlatform('christendom')}
                className={`h-8 px-3 rounded-md font-cinzel text-xs font-bold tracking-wider uppercase transition-all cursor-pointer border ${
                  activePlatform === 'christendom'
                    ? 'bg-gradient-to-r from-red-700 to-amber-600 text-white border-red-300 shadow-sm'
                    : 'bg-[#1C120C]/90 text-[#D4A373] border-[#8B5A2B]/50 hover:border-[#D4A373]/70 hover:text-[#F7EBE1]'
                }`}
              >
                Christendom
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          1. CATHOLIC INSTAGRAM SECTION
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
          2. CHRISTENDOM SECTION
          ===================================================================== */}
      {(activePlatform === 'all' || activePlatform === 'christendom') && (
        <section className="rounded-2xl bg-[#FBF9F5] border border-amber-900/20 shadow-xl overflow-hidden">
          {/* Header Rectangle */}
          <div className="bg-gradient-to-r from-[#241307] via-[#381111] to-[#1C0D08] px-4 py-3.5 sm:px-5 sm:py-4 border-b border-amber-500/30 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-red-600 text-white font-cinzel text-[10px] font-bold tracking-widest uppercase shadow-xs">
                  <Tv className="w-3 h-3" />
                  <span>CHRISTENDOM</span>
                </span>
                <span className="font-cinzel text-xs font-bold tracking-[0.2em] uppercase text-amber-300">
                  CATHOLIC MEDIA &amp; LECTURES
                </span>
              </div>
              <h3 className="font-cinzel text-base sm:text-lg font-bold text-white">
                {activeChannel ? (
                  <>
                    {activeChannel.name}{' '}
                    <span className="text-amber-300 font-serif text-sm font-normal">
                      ({activeChannel.handle})
                    </span>
                  </>
                ) : (
                  'Christendom.com'
                )}
              </h3>
              <p className="text-xs text-stone-300 font-serif">
                {activeChannel
                  ? activeChannel.description
                  : 'Talks, homilies, apologetics, sacred liturgy, and theological documentaries from faithful Catholic creators.'}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => {
                  setSelectedChannelId('all');
                  setSelectedVideoCategory('All');
                  setVideoSearchQuery('');
                }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-amber-200 border border-white/15 text-xs font-cinzel font-semibold cursor-pointer transition-colors"
                title="Reset Channel Filter"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>All Channels</span>
              </button>

              <a
                href={activeChannel ? activeChannel.christendomUrl : 'https://www.christendom.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-cinzel font-bold tracking-wider transition-colors shadow-sm"
              >
                <span>Christendom.com</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="p-3 sm:p-5 space-y-4">
            {/* Catholic Channel Selector Bar */}
            <div className="rounded-lg bg-[#241307]/[0.025] border border-amber-900/10 p-1.5 sm:p-2 flex flex-col xl:flex-row xl:items-center justify-between gap-2 shadow-xs">
              <div className="flex flex-wrap items-center gap-1">
                <button
                  onClick={() => setSelectedChannelId('all')}
                  className={`px-2 py-0.5 rounded-md text-[11px] sm:text-xs font-serif font-medium transition-all cursor-pointer border ${
                    selectedChannelId === 'all'
                      ? 'bg-[#241307] text-amber-200 border-amber-700 shadow-xs font-semibold'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-amber-600/50 hover:bg-stone-50'
                  }`}
                >
                  All Channels ({CHRISTENDOM_VIDEOS.length})
                </button>
                {CHRISTENDOM_CHANNELS.map(ch => {
                  const isSelected = selectedChannelId === ch.id;
                  const shortName = ch.name.replace(/\s*\(.*\)/, '');
                  return (
                    <button
                      key={ch.id}
                      onClick={() => setSelectedChannelId(ch.id)}
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] sm:text-xs font-serif font-medium transition-all cursor-pointer border ${
                        isSelected
                          ? 'bg-[#241307] text-amber-200 border-amber-700 shadow-xs font-semibold'
                          : 'bg-white text-stone-700 border-stone-200 hover:border-amber-600/50 hover:bg-stone-50'
                      }`}
                    >
                      <img
                        src={ch.avatarUrl}
                        alt=""
                        className="w-3.5 h-3.5 rounded-full object-cover shrink-0"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <span>{shortName}</span>
                    </button>
                  );
                })}
              </div>

              {/* Search Video Input */}
              <div className="relative shrink-0 pt-0.5 xl:pt-0">
                <Search className="w-3 h-3 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={videoSearchQuery}
                  onChange={e => setVideoSearchQuery(e.target.value)}
                  placeholder="Search Catholic talks &amp; lectures..."
                  className="pl-7 pr-2.5 py-0.5 rounded-md bg-white border border-stone-300 text-[11px] sm:text-xs font-serif text-stone-800 focus:outline-none focus:border-amber-700 w-36 sm:w-52 placeholder:text-stone-400"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 pb-1">
              {videoCategories.map(cat => {
                const isSelected = selectedVideoCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedVideoCategory(cat)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-cinzel font-semibold transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-amber-900 text-amber-100 border-amber-800 shadow-xs'
                        : 'bg-stone-100 text-stone-700 border-stone-200 hover:bg-stone-200/80 hover:text-stone-900'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Videos Grid */}
            {filteredVideos.length === 0 ? (
              <div className="py-12 text-center space-y-2">
                <p className="text-sm font-serif text-stone-600">
                  No Catholic presentations found matching your search.
                </p>
                <button
                  onClick={() => {
                    setSelectedChannelId('all');
                    setSelectedVideoCategory('All');
                    setVideoSearchQuery('');
                  }}
                  className="px-3 py-1 rounded-md bg-[#241307] text-amber-200 text-xs font-cinzel cursor-pointer"
                >
                  Show All Videos
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {filteredVideos.map(video => (
                  <div
                    key={video.id}
                    className="group rounded-xl bg-white border border-stone-200 hover:border-amber-600/60 overflow-hidden shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Video Thumbnail with Duration & Play Button */}
                      <div
                        onClick={() => setActiveVideo(video)}
                        className="relative aspect-video w-full overflow-hidden bg-stone-950 cursor-pointer"
                        title={`Watch "${video.title}"`}
                      >
                        <img
                          src={video.thumbnailUrl}
                          alt={video.title}
                          loading="lazy"
                          onError={(e) => {
                            const target = e.currentTarget;
                            const hq = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                            if (target.src !== hq && !target.src.includes('hqdefault.jpg')) {
                              target.src = hq;
                            } else if (video.fallbackImageUrl && target.src !== video.fallbackImageUrl) {
                              target.src = video.fallbackImageUrl;
                            }
                          }}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Dark Gradient Overlay */}
                        <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />

                        {/* Centered Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-11 h-11 rounded-full bg-red-600/90 group-hover:bg-red-600 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 fill-white ml-0.5" />
                          </div>
                        </div>

                        {/* Duration Pill */}
                        <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-white text-[10px] font-mono font-medium">
                          {video.duration}
                        </div>

                        {/* Category Tag */}
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-xs text-amber-200 text-[10px] font-cinzel font-bold uppercase tracking-wider">
                          {video.category}
                        </div>
                      </div>

                      {/* Video Meta Info */}
                      <div className="p-3.5 space-y-2">
                        <div className="flex items-start gap-2.5">
                          <img
                            src={video.channelAvatar}
                            alt={video.channelName}
                            onError={(e) => {
                              const target = e.currentTarget;
                              const fallback = 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=160&q=80';
                              if (target.src !== fallback) {
                                target.src = fallback;
                              }
                            }}
                            className="w-8 h-8 rounded-full object-cover border border-amber-500/40 shrink-0 mt-0.5"
                          />
                          <div className="min-w-0 flex-1">
                            <h4
                              onClick={() => setActiveVideo(video)}
                              className="font-serif font-bold text-xs sm:text-sm text-stone-900 group-hover:text-amber-950 transition-colors line-clamp-2 leading-snug cursor-pointer"
                            >
                              {video.title}
                            </h4>
                            <div className="flex items-center gap-1 text-[11px] font-serif text-stone-600 mt-1">
                              <span className="truncate">{video.channelName}</span>
                              {video.verified && (
                                <CheckCircle2 className="w-3 h-3 text-blue-600 shrink-0" />
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 text-[11px] font-serif text-stone-400">
                              <span>{video.views}</span>
                              <span>•</span>
                              <span>{video.publishedAt}</span>
                            </div>
                          </div>
                        </div>

                        <p className="text-[11px] font-serif text-stone-600 line-clamp-2 leading-relaxed pt-1 border-t border-stone-100">
                          {video.description}
                        </p>
                      </div>
                    </div>

                    {/* Card Actions Footer */}
                    <div className="px-3.5 py-2.5 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs font-serif">
                      <button
                        onClick={() => setActiveVideo(video)}
                        className="inline-flex items-center gap-1 text-red-700 hover:text-red-900 font-cinzel font-bold cursor-pointer"
                      >
                        <Play className="w-3 h-3 fill-red-700" />
                        <span>Watch Video</span>
                      </button>

                      <a
                        href={video.christendomUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-stone-600 hover:text-amber-900 text-[11px] font-serif"
                      >
                        <span>Christendom</span>
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
          3. ACTIVE VIDEO THEATER MODAL
          ===================================================================== */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#18120E] text-stone-100 rounded-2xl border border-amber-500/40 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-4 py-3 bg-[#241307] border-b border-amber-500/30 flex items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2 min-w-0">
                <span className="px-2 py-0.5 rounded bg-red-600 text-white font-cinzel text-[10px] font-bold tracking-wider uppercase shrink-0">
                  Christendom.com
                </span>
                <span className="font-serif text-xs sm:text-sm text-amber-200 truncate">
                  {activeVideo.title}
                </span>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white transition-colors cursor-pointer shrink-0"
                title="Close Player"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video w-full bg-black shrink-0">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                title={activeVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Scrollable Video Details */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
              <div className="space-y-1.5">
                <h3 className="font-cinzel text-base sm:text-xl font-bold text-white leading-snug">
                  {activeVideo.title}
                </h3>
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-serif text-stone-300 pb-3 border-b border-stone-800">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-amber-300">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{activeVideo.views}</span>
                    </span>
                    <span>•</span>
                    <span>{activeVideo.publishedAt}</span>
                    <span>•</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-900/30 text-amber-300 border border-amber-700/40 text-[10px]">
                      {activeVideo.category}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-800 text-stone-200 font-semibold">
                    <ThumbsUp className="w-3 h-3 text-amber-400" />
                    <span>{activeVideo.likes}</span>
                  </span>
                </div>
              </div>

              {/* Channel Meta */}
              <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-stone-900/80 border border-stone-800">
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={activeVideo.channelAvatar}
                    alt={activeVideo.channelName}
                    onError={(e) => {
                      const target = e.currentTarget;
                      const fallback = 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=160&q=80';
                      if (target.src !== fallback) {
                        target.src = fallback;
                      }
                    }}
                    className="w-10 h-10 rounded-full object-cover border border-amber-500/40 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-cinzel font-bold text-sm text-white truncate">
                        {activeVideo.channelName}
                      </h4>
                      {activeVideo.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      )}
                    </div>
                    <span className="text-[11px] font-serif text-stone-400">
                      Catholic Creator on Christendom.com
                    </span>
                  </div>
                </div>

                <a
                  href={activeVideo.christendomUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-cinzel font-bold tracking-wider transition-colors shrink-0"
                >
                  <span>Open on Christendom</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Description */}
              <div className="p-4 rounded-xl bg-stone-900/50 border border-stone-800 text-xs sm:text-sm font-serif text-stone-300 leading-relaxed">
                {activeVideo.description}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
