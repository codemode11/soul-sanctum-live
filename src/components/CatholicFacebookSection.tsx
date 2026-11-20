import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  ExternalLink,
  Plus,
  Star,
  ThumbsUp,
  MessageCircle,
  Share2,
  CheckCircle2,
  SlidersHorizontal,
  Trash2,
  X,
  RefreshCw,
} from 'lucide-react';
import {
  CATHOLIC_FACEBOOK_SOURCES,
  CATHOLIC_FACEBOOK_POSTS,
  CatholicFacebookSource,
  CatholicFacebookPost,
} from '../data/catholicSocial';

export interface CustomFacebookPostEmbed {
  id: string;
  label: string;
  postUrl: string;
  addedAt: number;
}

interface CatholicFacebookSectionProps {
  favoriteIds: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
  customFbSources: CatholicFacebookSource[];
  onAddCustomFbSource: (source: CatholicFacebookSource) => void;
  onRemoveCustomFbSource: (sourceId: string) => void;
  customFbPosts: CustomFacebookPostEmbed[];
  onAddCustomFbPost: (post: CustomFacebookPostEmbed) => void;
  onRemoveCustomFbPost: (postId: string) => void;
  focusedSourceId?: string | null;
  onClearFocusedSource?: () => void;
  onRestoreStarterFbFavorites: () => void;
}

type UnifiedFeedEntry =
  | { kind: 'custom-post'; id: string; post: CustomFacebookPostEmbed }
  | { kind: 'post'; id: string; post: CatholicFacebookPost }
  | { kind: 'custom-page'; id: string; source: CatholicFacebookSource };

const INITIAL_VISIBLE_POSTS = 24;
const LOAD_MORE_STEP = 24;

function buildPagePluginUrl(pageUrl: string): string {
  const params = new URLSearchParams({
    href: pageUrl,
    tabs: 'timeline',
    width: '500',
    height: '540',
    small_header: 'true',
    adapt_container_width: 'true',
    hide_cover: 'true',
    show_facepile: 'false',
  });
  return `https://www.facebook.com/plugins/page.php?${params.toString()}`;
}

function buildPostPluginUrl(postUrl: string): string {
  const params = new URLSearchParams({
    href: postUrl,
    show_text: 'true',
    width: '500',
  });
  return `https://www.facebook.com/plugins/post.php?${params.toString()}`;
}

function formatCount(n: number): string {
  if (n >= 1000) {
    return `${(n / 1000).toFixed(1).replace(/\.0$/, '')}K`;
  }
  return String(n);
}

function getInitials(name: string): string {
  const words = name
    .replace(/\(.*?\)/g, '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return 'FB';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

export const CatholicFacebookSection: React.FC<CatholicFacebookSectionProps> = ({
  favoriteIds,
  isFavorite,
  toggleFavorite,
  customFbSources,
  onAddCustomFbSource,
  onRemoveCustomFbSource,
  customFbPosts,
  onAddCustomFbPost,
  onRemoveCustomFbPost,
  focusedSourceId,
  onClearFocusedSource,
  onRestoreStarterFbFavorites,
}) => {
  const [isManageOpen, setIsManageOpen] = useState(false);
  const [customInput, setCustomInput] = useState('');
  const [customFeedback, setCustomFeedback] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [livePosts, setLivePosts] = useState<CatholicFacebookPost[]>([]);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_POSTS);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const allSources = useMemo(
    () => [...customFbSources, ...CATHOLIC_FACEBOOK_SOURCES],
    [customFbSources]
  );

  const favoriteSources = useMemo(() => {
    const starredIds = new Set(
      favoriteIds.filter((id) => id.startsWith('fb:')).map((id) => id.slice(3))
    );
    return allSources.filter((src) => starredIds.has(src.id));
  }, [allSources, favoriteIds]);

  const favoriteSourceIdsParam = useMemo(
    () => favoriteSources.map((s) => s.id).join(','),
    [favoriteSources]
  );

  const fetchLatestFavoritePosts = useCallback(
    async (sourceIdsCsv: string, manualRefresh = false) => {
      if (!sourceIdsCsv) {
        setLivePosts([]);
        return;
      }
      setIsRefreshing(true);
      try {
        const res = await fetch(
          `/api/catholic-facebook?sources=${encodeURIComponent(sourceIdsCsv)}&_t=${Date.now()}`,
          { cache: 'no-store' }
        );
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data?.posts) && data.posts.length > 0) {
            setLivePosts(data.posts);
            if (manualRefresh) {
              setVisibleCount(INITIAL_VISIBLE_POSTS);
            }
          }
        }
      } catch {
        // Keep previously loaded and curated posts gracefully on network failure
      } finally {
        setIsRefreshing(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchLatestFavoritePosts(favoriteSourceIdsParam, false);
  }, [favoriteSourceIdsParam, fetchLatestFavoritePosts]);

  const handleRefreshFeed = () => {
    setRefreshKey((prev) => prev + 1);
    fetchLatestFavoritePosts(favoriteSourceIdsParam, true);
  };

  // Build ONE unified, single-column Facebook-style Favorites feed:
  // - All live posts from all starred Favorite accounts sorted chronologically newest-first
  // - Interleaved with featured official Facebook post embeds and curated reflections
  //   so every Favorite account appears naturally in one continuous stream
  const unifiedFeedEntries = useMemo<UnifiedFeedEntry[]>(() => {
    const entries: UnifiedFeedEntry[] = [];

    // 1. Custom pinned individual Facebook posts appear first
    for (const post of customFbPosts) {
      entries.push({ kind: 'custom-post', id: post.id, post });
    }

    const activeSources = focusedSourceId
      ? favoriteSources.filter((s) => s.id === focusedSourceId)
      : favoriteSources;

    const activeSourceIdSet = new Set(activeSources.map((s) => s.id));

    // 2. Gather live chronological posts for active Favorites (already sorted newest-first)
    const activeLivePosts = livePosts.filter((p) => activeSourceIdSet.has(p.sourceId));

    // 3. Gather featured official Facebook embed posts & curated reflections for active Favorites
    const curatedBySource: CatholicFacebookPost[][] = [];
    const customPagesWithoutPosts: CatholicFacebookSource[] = [];

    for (const src of activeSources) {
      const hasLive = activeLivePosts.some((p) => p.sourceId === src.id);
      const curatedMatched = CATHOLIC_FACEBOOK_POSTS.filter((p) => p.sourceId === src.id);
      if (curatedMatched.length > 0) {
        curatedBySource.push(curatedMatched);
      } else if (!hasLive) {
        customPagesWithoutPosts.push(src);
      }
    }

    const interleavedCurated: CatholicFacebookPost[] = [];
    const maxCuratedDepth = Math.max(0, ...curatedBySource.map((list) => list.length));
    for (let i = 0; i < maxCuratedDepth; i++) {
      for (const list of curatedBySource) {
        if (list[i]) {
          interleavedCurated.push(list[i]);
        }
      }
    }

    // 4. Combine live newest-first posts with curated posts (interleaving featured embeds gently)
    const seenPostIds = new Set<string>();
    const combinedPosts: CatholicFacebookPost[] = [];

    if (activeLivePosts.length > 0) {
      // Interleave live chronological posts across all Favorite accounts so the top never clusters
      // 10 consecutive posts from one high-volume outlet while still keeping newest posts first
      const remaining = [...activeLivePosts];
      const balancedLive: CatholicFacebookPost[] = [];
      while (remaining.length > 0) {
        let pickedIdx = 0;
        const prevSourceId = balancedLive.length > 0 ? balancedLive[balancedLive.length - 1].sourceId : null;
        if (prevSourceId) {
          const altIdx = remaining.findIndex((p, idx) => idx < 12 && p.sourceId !== prevSourceId);
          if (altIdx !== -1) pickedIdx = altIdx;
        }
        balancedLive.push(remaining.splice(pickedIdx, 1)[0]);
      }

      // Gently weave in curated posts (including official Facebook post embeds) after live posts
      let curatedIdx = 0;
      for (let i = 0; i < balancedLive.length; i++) {
        const livePost = balancedLive[i];
        if (!seenPostIds.has(livePost.id)) {
          seenPostIds.add(livePost.id);
          combinedPosts.push(livePost);
        }
        if ((i + 1) % 6 === 0 && curatedIdx < interleavedCurated.length) {
          const curated = interleavedCurated[curatedIdx++];
          if (!seenPostIds.has(curated.id)) {
            seenPostIds.add(curated.id);
            combinedPosts.push(curated);
          }
        }
      }
      while (curatedIdx < interleavedCurated.length) {
        const curated = interleavedCurated[curatedIdx++];
        if (!seenPostIds.has(curated.id)) {
          seenPostIds.add(curated.id);
          combinedPosts.push(curated);
        }
      }
    } else {
      for (const curated of interleavedCurated) {
        if (!seenPostIds.has(curated.id)) {
          seenPostIds.add(curated.id);
          combinedPosts.push(curated);
        }
      }
    }

    for (const post of combinedPosts) {
      entries.push({ kind: 'post', id: post.id, post });
    }

    // 5. Any custom user-added public Facebook Pages without local/live posts
    for (const src of customPagesWithoutPosts) {
      entries.push({ kind: 'custom-page', id: `page-${src.id}`, source: src });
    }

    return entries;
  }, [customFbPosts, favoriteSources, focusedSourceId, livePosts]);

  const visibleEntries = useMemo(
    () => unifiedFeedEntries.slice(0, visibleCount),
    [unifiedFeedEntries, visibleCount]
  );

  const remainingCount = Math.max(0, unifiedFeedEntries.length - visibleEntries.length);

  const handleAddCustomFacebook = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customInput.trim();
    if (!trimmed) return;
    setCustomFeedback(null);

    const isSpecificPost =
      /facebook\.com\/(?:permalink\.php|story\.php|share\/[prv]\/|reel\/|watch\/|photo|[^/]+\/(?:posts|videos|photos)\/)/i.test(
        trimmed
      );

    if (isSpecificPost) {
      const normalizedUrl = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
      let label = 'Pinned Facebook Post';
      try {
        const parsed = new URL(normalizedUrl);
        const seg = parsed.pathname.split('/').filter(Boolean)[0];
        if (seg && !['permalink.php', 'story.php', 'share', 'reel', 'watch', 'photo.php'].includes(seg)) {
          label = `${seg} · Post`;
        }
      } catch {
        // default label
      }
      onAddCustomFbPost({
        id: `fb-custom-post-${Date.now()}`,
        label,
        postUrl: normalizedUrl,
        addedAt: Date.now(),
      });
      setCustomInput('');
      setCustomFeedback('Post added to your Favorites feed.');
      return;
    }

    let pageUrl = '';
    let cleanSlug = '';

    if (/^https?:\/\/(?:www\.|m\.|web\.)?facebook\.com\//i.test(trimmed)) {
      try {
        const parsed = new URL(trimmed);
        const pathParts = parsed.pathname.split('/').filter(Boolean);
        if (pathParts[0] === 'profile.php' && parsed.searchParams.get('id')) {
          const profileId = parsed.searchParams.get('id')!.replace(/[^0-9]/g, '');
          cleanSlug = profileId;
          pageUrl = `https://www.facebook.com/profile.php?id=${profileId}`;
        } else if (pathParts[0] === 'p' && pathParts[1]) {
          cleanSlug = pathParts[1];
          pageUrl = `https://www.facebook.com/p/${pathParts[1]}`;
        } else if (pathParts[0]) {
          cleanSlug = pathParts[0];
          pageUrl = `https://www.facebook.com/${pathParts[0]}`;
        }
      } catch {
        // fall through
      }
    }

    if (!cleanSlug) {
      cleanSlug = trimmed
        .replace(/^https?:\/\/(?:www\.|m\.|web\.)?facebook\.com\//i, '')
        .replace(/^@/, '')
        .split(/[/?#]/)[0]
        .replace(/[^a-zA-Z0-9._-]/g, '');
      if (cleanSlug) {
        pageUrl = `https://www.facebook.com/${cleanSlug}`;
      }
    }

    if (!cleanSlug || !pageUrl) {
      setCustomFeedback('Enter a valid public Facebook Page URL, @handle, or post link.');
      return;
    }

    const existing = allSources.find(
      (s) =>
        s.socialUsername.toLowerCase() === cleanSlug.toLowerCase() ||
        s.pageUrl.toLowerCase() === pageUrl.toLowerCase()
    );

    if (existing) {
      if (!isFavorite(`fb:${existing.id}`)) {
        toggleFavorite(`fb:${existing.id}`);
      }
      setCustomInput('');
      setCustomFeedback(`${existing.name} is now in your Favorites feed.`);
      return;
    }

    const displayName = cleanSlug
      .replace(/[._-]+/g, ' ')
      .replace(/\b\w/g, (ch) => ch.toUpperCase());

    const newSource: CatholicFacebookSource = {
      id: `fb-custom-${cleanSlug.toLowerCase()}`,
      name: displayName,
      handle: `@${cleanSlug}`,
      socialUsername: cleanSlug,
      pageUrl,
      category: 'Favorite Facebook Page',
      description: `Public Facebook Page for ${displayName}.`,
    };

    onAddCustomFbSource(newSource);
    if (!isFavorite(`fb:${newSource.id}`)) {
      toggleFavorite(`fb:${newSource.id}`);
    }
    setCustomInput('');
    setCustomFeedback(`Added ${displayName} to your Favorites feed.`);
  };

  return (
    <section className="rounded-2xl bg-[#F5F3EE] border border-amber-900/20 shadow-lg overflow-hidden text-left">
      {/* Minimal Header Bar */}
      <div className="bg-gradient-to-r from-[#162238] via-[#1C3357] to-[#132033] px-4 py-3.5 sm:px-6 border-b border-amber-500/30 flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-0.5 min-w-0">
          <h3 className="font-serif text-lg sm:text-xl font-bold text-white leading-snug">
            Catholic Facebook Feed
          </h3>
          <p className="text-xs text-blue-100/80 font-serif">
            Unified stream from {favoriteSources.length} favorite{' '}
            {favoriteSources.length === 1 ? 'account' : 'accounts'} · {unifiedFeedEntries.length}{' '}
            {unifiedFeedEntries.length === 1 ? 'post' : 'posts'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleRefreshFeed}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border bg-white/10 hover:bg-white/20 disabled:opacity-70 text-amber-100 border-white/20 text-xs font-cinzel font-semibold cursor-pointer transition-colors whitespace-nowrap"
            title="Fetch the latest posts from all your Favorite accounts"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Refreshing…' : 'Refresh Feed'}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsManageOpen((prev) => !prev)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-cinzel font-semibold cursor-pointer transition-colors whitespace-nowrap ${
              isManageOpen
                ? 'bg-amber-400 text-stone-950 border-amber-300'
                : 'bg-white/10 hover:bg-white/20 text-amber-100 border-white/20'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Manage Favorites</span>
          </button>

          <a
            href="https://www.facebook.com/?filter=favorites&sk=h_chr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1877F2] hover:bg-[#1565D8] text-white text-xs font-cinzel font-semibold transition-colors whitespace-nowrap"
            title="Open your personal Facebook account Favorites feed on Facebook.com"
          >
            <span>Open on Facebook</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Collapsible Manage Favorites Drawer (Hidden by Default for Clean Reading) */}
      {isManageOpen && (
        <div className="px-4 py-4 sm:px-6 bg-[#FAF7F0] border-b border-[#E5DEC9] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h4 className="font-cinzel text-xs font-bold text-amber-950">
              Favorite Accounts ({favoriteSources.length} of {allSources.length} selected)
            </h4>
            <div className="flex items-center gap-3">
              {favoriteSources.length < allSources.length && (
                <button
                  type="button"
                  onClick={onRestoreStarterFbFavorites}
                  className="text-xs font-cinzel font-semibold text-[#1877F2] hover:underline cursor-pointer"
                >
                  Select All
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsManageOpen(false)}
                className="p-1 rounded hover:bg-stone-200/70 text-stone-500 hover:text-stone-900 cursor-pointer"
                aria-label="Close Manage Favorites"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Toggle Favorite Pages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {allSources.map((src) => {
              const starred = isFavorite(`fb:${src.id}`);
              const isCustom = src.id.startsWith('fb-custom-');
              return (
                <div
                  key={src.id}
                  className={`px-3 py-2 rounded-lg border flex items-center justify-between gap-2 transition-colors ${
                    starred
                      ? 'bg-white border-amber-600/60'
                      : 'bg-white/60 border-stone-200'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFavorite(`fb:${src.id}`)}
                    className="flex items-center gap-2 min-w-0 flex-1 text-left cursor-pointer"
                  >
                    <Star
                      className={`w-3.5 h-3.5 shrink-0 ${
                        starred ? 'fill-amber-500 text-amber-500' : 'text-stone-400'
                      }`}
                    />
                    <span className="font-serif text-xs sm:text-sm text-stone-900 truncate">
                      {src.name}
                    </span>
                  </button>
                  {isCustom && (
                    <button
                      type="button"
                      onClick={() => {
                        if (starred) toggleFavorite(`fb:${src.id}`);
                        onRemoveCustomFbSource(src.id);
                      }}
                      className="p-1 rounded hover:bg-red-50 text-stone-400 hover:text-red-700 cursor-pointer shrink-0"
                      title="Remove custom page"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {/* Add Custom Facebook Page or Post URL */}
          <form onSubmit={handleAddCustomFacebook} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Paste any public Facebook Page URL, @handle, or post link..."
              className="flex-1 px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs sm:text-sm font-serif text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-blue-700"
            />
            <button
              type="submit"
              disabled={!customInput.trim()}
              className="px-4 py-2 rounded-lg bg-[#1877F2] hover:bg-[#1565D8] disabled:opacity-45 text-white text-xs font-cinzel font-bold inline-flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </form>

          {customFeedback && (
            <p className="text-xs font-serif text-amber-900">{customFeedback}</p>
          )}

          <p className="text-[11px] font-serif text-stone-600 leading-relaxed">
            Meta does not allow external websites to read a private Facebook account’s personal feed. Select or add your favorite public Catholic accounts here, or click <strong>Open on Facebook</strong> to open your personal Facebook Favorites directly.
          </p>
        </div>
      )}

      {/* Single-Column Unified Facebook-Style Feed */}
      <div className="px-3 py-5 sm:px-6">
        {focusedSourceId && onClearFocusedSource && (
          <div className="max-w-[620px] mx-auto mb-4 flex items-center justify-between text-xs font-serif text-stone-700">
            <span>Showing filtered account from Favorites</span>
            <button
              type="button"
              onClick={onClearFocusedSource}
              className="font-cinzel font-semibold text-blue-800 hover:underline cursor-pointer"
            >
              Show All Favorites
            </button>
          </div>
        )}

        {unifiedFeedEntries.length === 0 ? (
          <div className="max-w-[620px] mx-auto p-8 rounded-xl bg-white border border-stone-200 text-center space-y-3">
            <p className="font-serif text-sm text-stone-700">
              Your Catholic Facebook Feed has no Favorites selected.
            </p>
            <button
              type="button"
              onClick={onRestoreStarterFbFavorites}
              className="px-4 py-2 rounded-lg bg-[#1877F2] hover:bg-[#1565D8] text-white text-xs font-cinzel font-bold cursor-pointer"
            >
              Load All Catholic Favorites
            </button>
          </div>
        ) : (
          <div className="max-w-[620px] mx-auto space-y-4">
            {visibleEntries.map((entry) => {
              if (entry.kind === 'custom-post') {
                return (
                  <article
                    key={entry.id}
                    className="rounded-xl bg-white border border-stone-200/90 shadow-2xs overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-stone-100 flex items-center justify-between gap-2">
                      <span className="font-serif text-sm font-semibold text-stone-900 truncate">
                        {entry.post.label}
                      </span>
                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={entry.post.postUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-stone-500 hover:text-blue-700"
                          title="Open on Facebook"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button
                          type="button"
                          onClick={() => onRemoveCustomFbPost(entry.post.id)}
                          className="text-stone-400 hover:text-red-700 cursor-pointer"
                          title="Remove from feed"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-center bg-white">
                      <iframe
                        key={`${entry.id}-${refreshKey}`}
                        src={buildPostPluginUrl(entry.post.postUrl)}
                        title={entry.post.label}
                        className="w-full max-w-[500px] h-[460px] border-0 bg-white"
                        loading="lazy"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      />
                    </div>
                  </article>
                );
              }

              if (entry.kind === 'custom-page') {
                return (
                  <article
                    key={entry.id}
                    className="rounded-xl bg-white border border-stone-200/90 shadow-2xs overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-stone-100 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-9 rounded-full bg-[#1877F2]/10 text-[#1877F2] font-cinzel text-xs font-bold flex items-center justify-center shrink-0">
                          {getInitials(entry.source.name)}
                        </div>
                        <div className="min-w-0">
                          <div className="font-serif text-sm font-bold text-stone-950 truncate">
                            {entry.source.name}
                          </div>
                          <div className="text-xs font-serif text-stone-500 truncate">
                            {entry.source.handle}
                          </div>
                        </div>
                      </div>
                      <a
                        href={entry.source.pageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-stone-500 hover:text-blue-700 shrink-0"
                        title="Open Page on Facebook"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <div className="flex justify-center bg-white">
                      <iframe
                        key={`${entry.id}-${refreshKey}`}
                        src={buildPagePluginUrl(entry.source.pageUrl)}
                        title={`${entry.source.name} Facebook Feed`}
                        className="w-full max-w-[500px] h-[540px] border-0 bg-white"
                        loading="lazy"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      />
                    </div>
                  </article>
                );
              }

              const { post } = entry;
              const showGenuineImage = Boolean(post.imageUrl && !failedImages[post.id]);

              return (
                <article
                  key={entry.id}
                  className="rounded-xl bg-white border border-stone-200/90 shadow-2xs overflow-hidden"
                >
                  {/* Post Author Header (Clean Facebook Post Style) */}
                  <div className="px-4 pt-4 pb-3 flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-[#1877F2]/12 border border-[#1877F2]/20 text-[#162238] font-cinzel text-xs font-bold flex items-center justify-center shrink-0">
                        {getInitials(post.sourceName)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <a
                            href={post.pageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-serif text-sm sm:text-[15px] font-bold text-stone-950 hover:underline truncate"
                          >
                            {post.sourceName}
                          </a>
                          {post.verified && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#1877F2] shrink-0" />
                          )}
                        </div>
                        <div className="text-xs font-serif text-stone-500">
                          {post.postDate} · {post.category}
                        </div>
                      </div>
                    </div>

                    <a
                      href={post.postUrl || post.pageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 hover:text-[#1877F2] transition-colors shrink-0"
                      title="Open post"
                      aria-label={`Open ${post.sourceName} post`}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  {/* Post Content or Embedded Facebook Post */}
                  {post.embedUrl ? (
                    <div className="px-2 pb-2 flex justify-center bg-white">
                      <iframe
                        key={`${entry.id}-${refreshKey}`}
                        src={post.embedUrl}
                        title={`${post.sourceName} post`}
                        className="w-full max-w-[500px] h-[460px] border-0 bg-white"
                        loading="lazy"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      />
                    </div>
                  ) : (
                    <>
                      <div className="px-4 pb-3.5">
                        <p className="font-serif text-[15px] sm:text-base text-stone-900 leading-relaxed whitespace-pre-line">
                          {post.text}
                        </p>
                      </div>
                      {showGenuineImage && post.imageUrl && (
                        <a
                          href={post.postUrl || post.pageUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block w-full bg-stone-100 border-t border-stone-100 overflow-hidden"
                        >
                          <img
                            src={post.imageUrl}
                            alt={post.imageAlt || `${post.sourceName} — ${post.category}`}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            onError={() =>
                              setFailedImages((prev) => ({ ...prev, [post.id]: true }))
                            }
                            className="w-full h-auto max-h-[520px] object-cover object-[50%_20%] block"
                          />
                        </a>
                      )}
                    </>
                  )}

                  {/* Clean Facebook-Style Reaction Footer */}
                  <div className="px-4 py-2.5 border-t border-stone-100 flex items-center justify-between text-xs text-stone-600 font-serif">
                    <div className="flex items-center gap-4 font-mono text-[11px] tabular-nums">
                      <span className="inline-flex items-center gap-1">
                        <ThumbsUp className="w-3.5 h-3.5 text-[#1877F2]" />
                        {formatCount(post.likesCount)}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5 text-stone-400" />
                        {formatCount(post.commentsCount)}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Share2 className="w-3.5 h-3.5 text-stone-400" />
                        {formatCount(post.sharesCount)}
                      </span>
                    </div>

                    <a
                      href={post.postUrl || post.pageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-serif font-medium text-[#1877F2] hover:underline whitespace-nowrap"
                    >
                      {post.postUrl && !post.postUrl.includes('facebook.com')
                        ? 'Read Full Post'
                        : 'View on Facebook'}
                    </a>
                  </div>
                </article>
              );
            })}

            {remainingCount > 0 && (
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + LOAD_MORE_STEP)}
                  className="px-5 py-2.5 rounded-lg bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 text-xs font-cinzel font-bold shadow-2xs cursor-pointer transition-colors"
                >
                  Load More Posts ({remainingCount} remaining)
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

const FB_VIEW_FAVORITES_STORAGE_KEY = 'sanctum_catholic_social_favorites_v1';
const FB_VIEW_CUSTOM_SOURCES_STORAGE_KEY = 'sanctum_catholic_social_custom_fb_sources_v1';
const FB_VIEW_CUSTOM_POSTS_STORAGE_KEY = 'sanctum_catholic_social_custom_fb_posts_v1';
const FB_VIEW_SEEDED_KEY = 'sanctum_catholic_social_fb_seeded_v2';

const FB_VIEW_ALL_STARTER_FAVORITES: string[] = CATHOLIC_FACEBOOK_SOURCES.map(
  (src) => `fb:${src.id}`
);

export const CatholicFacebookView: React.FC = () => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FB_VIEW_FAVORITES_STORAGE_KEY);
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const cleaned = parsed.filter(
            (id): id is string => typeof id === 'string' && id !== 'soul-sanctum-fb'
          );
          const alreadySeeded = localStorage.getItem(FB_VIEW_SEEDED_KEY) === '1';
          if (!alreadySeeded) {
            localStorage.setItem(FB_VIEW_SEEDED_KEY, '1');
            return Array.from(new Set([...cleaned, ...FB_VIEW_ALL_STARTER_FAVORITES]));
          }
          return cleaned;
        }
      }
      localStorage.setItem(FB_VIEW_SEEDED_KEY, '1');
    } catch {
      // ignore storage errors
    }
    return FB_VIEW_ALL_STARTER_FAVORITES;
  });

  const [customFbSources, setCustomFbSources] = useState<CatholicFacebookSource[]>(() => {
    try {
      const saved = localStorage.getItem(FB_VIEW_CUSTOM_SOURCES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return [];
  });

  const [customFbPosts, setCustomFbPosts] = useState<CustomFacebookPostEmbed[]>(() => {
    try {
      const saved = localStorage.getItem(FB_VIEW_CUSTOM_POSTS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(FB_VIEW_FAVORITES_STORAGE_KEY, JSON.stringify(favoriteIds));
    } catch {
      // ignore
    }
  }, [favoriteIds]);

  useEffect(() => {
    try {
      localStorage.setItem(FB_VIEW_CUSTOM_SOURCES_STORAGE_KEY, JSON.stringify(customFbSources));
    } catch {
      // ignore
    }
  }, [customFbSources]);

  useEffect(() => {
    try {
      localStorage.setItem(FB_VIEW_CUSTOM_POSTS_STORAGE_KEY, JSON.stringify(customFbPosts));
    } catch {
      // ignore
    }
  }, [customFbPosts]);

  const isFavorite = useCallback((id: string) => favoriteIds.includes(id), [favoriteIds]);

  const toggleFavorite = useCallback((id: string) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [id, ...prev]
    );
  }, []);

  const handleAddCustomFbSource = useCallback((source: CatholicFacebookSource) => {
    setCustomFbSources((prev) => (prev.some((s) => s.id === source.id) ? prev : [source, ...prev]));
  }, []);

  const handleRemoveCustomFbSource = useCallback((sourceId: string) => {
    setCustomFbSources((prev) => prev.filter((s) => s.id !== sourceId));
  }, []);

  const handleAddCustomFbPost = useCallback((post: CustomFacebookPostEmbed) => {
    setCustomFbPosts((prev) =>
      prev.some((p) => p.postUrl === post.postUrl) ? prev : [post, ...prev]
    );
  }, []);

  const handleRemoveCustomFbPost = useCallback((postId: string) => {
    setCustomFbPosts((prev) => prev.filter((p) => p.id !== postId));
  }, []);

  const handleRestoreStarterFbFavorites = useCallback(() => {
    setFavoriteIds((prev) => Array.from(new Set([...FB_VIEW_ALL_STARTER_FAVORITES, ...prev])));
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-3 sm:p-6 md:p-8 rounded-xl bg-white/45 backdrop-blur-xl backdrop-saturate-150 border border-white/60 ring-1 ring-inset ring-white/40 shadow-[0_8px_32px_0_rgba(120,90,50,0.12)] space-y-6 mb-12 transition-all duration-300">
      <CatholicFacebookSection
        favoriteIds={favoriteIds}
        isFavorite={isFavorite}
        toggleFavorite={toggleFavorite}
        customFbSources={customFbSources}
        onAddCustomFbSource={handleAddCustomFbSource}
        onRemoveCustomFbSource={handleRemoveCustomFbSource}
        customFbPosts={customFbPosts}
        onAddCustomFbPost={handleAddCustomFbPost}
        onRemoveCustomFbPost={handleRemoveCustomFbPost}
        onRestoreStarterFbFavorites={handleRestoreStarterFbFavorites}
      />
    </div>
  );
};

