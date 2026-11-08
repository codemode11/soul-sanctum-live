import React, { useState, useEffect, useCallback } from 'react';
import {
  Share2,
  ExternalLink,
  RefreshCw,
  Plus,
  Camera
} from 'lucide-react';
import {
  CATHOLIC_INSTAGRAM_SOURCES,
  CatholicInstagramSource,
  CatholicStaticSocialPost
} from '../data/catholicSocial';

export const CatholicSocialView: React.FC = () => {
  // Instagram state
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

  return (
    <div className="max-w-5xl mx-auto p-3 sm:p-6 md:p-8 rounded-xl bg-white/45 backdrop-blur-xl backdrop-saturate-150 border border-white/60 ring-1 ring-inset ring-white/40 shadow-[0_8px_32px_0_rgba(120,90,50,0.12)] space-y-6 mb-12">
      {/* Top Banner Rectangle */}
      <div className="bg-white/55 backdrop-blur-xl backdrop-saturate-150 rounded-xl shadow-xs border border-white/70 ring-1 ring-inset ring-white/40 relative z-20">
        <div className="px-5 pt-4 pb-4 sm:px-6 min-h-[120px] bg-gradient-to-r from-stone-900 via-stone-850 to-stone-800 text-stone-100 flex flex-col justify-between rounded-xl">
          <div className="space-y-1.5">
            {/* Line 1: Badge & Subtitle */}
            <div className="flex items-center gap-2.5 flex-nowrap overflow-hidden">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs text-xs font-semibold uppercase tracking-wider whitespace-nowrap shrink-0 bg-amber-500 text-amber-950">
                <Share2 className="w-3 h-3" />
                <span>CATHOLIC SOCIAL</span>
              </span>
              <span className="text-sm sm:text-base text-stone-300 font-serif whitespace-nowrap truncate">
                Curated Posts from Faithful Catholic Apostolates &amp; Media
              </span>
            </div>

            {/* Line 2: Main Title */}
            <h2 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-normal text-amber-100 leading-snug break-words">
              Catholic Instagram Feeds
            </h2>
          </div>

          {/* Line 3: Info Row */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 mt-auto pt-3 border-t border-stone-700/60 text-xs font-serif text-stone-300">
            <span>
              Viewing posts from <strong className="text-amber-200">@{selectedIgSource.username}</strong>
            </span>
            <span className="text-stone-400">
              Compact 2 rows × 3 columns view
            </span>
          </div>
        </div>
      </div>

      {/* Catholic Instagram Section */}
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
    </div>
  );
};
