import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Play, 
  Pause, 
  Search, 
  Bookmark, 
  BookmarkCheck, 
  Share2, 
  Check, 
  ExternalLink, 
  Clock, 
  Headphones, 
  Filter, 
  BookOpen, 
  Volume2, 
  X, 
  Layers, 
  Star, 
  ChevronRight,
  Info
} from 'lucide-react';
import { CatholicPodcastShow, PodcastEpisode, CatholicPodcastCategory } from '../types';
import { 
  CATHOLIC_PODCASTS_DATABASE, 
  getAllPodcastEpisodes, 
  getFeaturedPodcastEpisode 
} from '../data/catholicPodcasts';

interface CatholicPodcastsViewProps {
  currentPlayingEpisode: PodcastEpisode | null;
  isPlaying: boolean;
  onPlayEpisode: (episode: PodcastEpisode) => void;
  onPauseEpisode: () => void;
  onOpenDetailsModal: (episode: PodcastEpisode) => void;
}

// Direct original podcast artwork dictionary (Apple Podcasts official 600x600 covers)
const PODCAST_ORIGINAL_COVERS: Record<string, string> = {
  'bible-in-a-year': 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts116/v4/ca/87/e0/ca87e07d-9d97-a433-1dc9-55dcfbd54f17/mza_9875864189557480350.jpg/600x600bb.jpg',
  'catechism-in-a-year': 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts112/v4/c9/9f/6f/c99f6f42-987e-2c81-bd25-c6c87d2a0db7/mza_9362465263115833762.jpg/600x600bb.jpg',
  'fr-mike-schmitz-podcast': 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts115/v4/84/45/3d/84453d79-4244-3bba-8ae5-d2bddfbac119/mza_8515607687576084455.jpg/600x600bb.jpg',
  'word-on-fire-show': 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/8a/68/72/8a687278-ecba-0471-0f5d-8e831d0aac8a/mza_11737134873248527109.jpg/600x600bb.jpg',
  'pints-with-aquinas': 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts211/v4/54/61/f1/5461f16d-2adb-b501-c9b7-0ef5e6d72eba/mza_7503559985443598183.jpeg/600x600bb.jpg',
  'abiding-together': 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts125/v4/9b/f7/10/9bf7101e-e370-e36e-634b-01424e707a64/mza_735760324844123567.png/600x600bb.jpg',
  'catholic-answers-live': 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts122/v4/7f/73/62/7f736228-cb24-a09b-2345-de20e26efc7a/mza_17932019903878545154.jpg/600x600bb.jpg',
  'discerning-hearts': 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts221/v4/4d/99/ab/4d99abf1-ba50-4023-30ee-23da16783521/mza_16818450520579858771.jpg/600x600bb.jpg',
  'catholic-talk-show': 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts221/v4/87/7a/c3/877ac313-ec51-8977-cc36-b2d198a804e0/mza_552176913549531801.jpeg/600x600bb.jpg',
  'counsel-of-trent': 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts221/v4/bd/3a/73/bd3a73cd-8e36-c9f8-3fdc-867b9b16c877/mza_109888266879698107.jpg/600x600bb.jpg',
  'thomistic-institute': 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts126/v4/ab/78/90/ab78906c-c98e-b3ab-48eb-b4e536754dfa/mza_12049456275401586219.jpg/600x600bb.jpg',
  'vatican-radio-podcast': 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts112/v4/53/59/ae/5359aec5-b049-5dce-e3df-be0985fc9f03/mza_14565055678223969088.jpeg/600x600bb.jpg',
};

const getPodcastArtwork = (id?: string, fallbackUrl?: string): string => {
  if (id && PODCAST_ORIGINAL_COVERS[id]) {
    return PODCAST_ORIGINAL_COVERS[id];
  }
  return fallbackUrl || '';
};

export const CatholicPodcastsView: React.FC<CatholicPodcastsViewProps> = ({
  currentPlayingEpisode,
  isPlaying,
  onPlayEpisode,
  onPauseEpisode,
  onOpenDetailsModal
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CatholicPodcastCategory | 'saved'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShowId, setSelectedShowId] = useState<string | null>(null);
  const [savedEpisodeIds, setSavedEpisodeIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('sanctum_saved_podcasts');
      return stored ? JSON.parse(stored) : ['biy-day-1', 'wof-mystery-of-mass'];
    } catch {
      return ['biy-day-1', 'wof-mystery-of-mass'];
    }
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const rawFeatured = getFeaturedPodcastEpisode();
  const featuredEpisode = rawFeatured
    ? { ...rawFeatured, podcastCoverUrl: getPodcastArtwork(rawFeatured.podcastId, rawFeatured.podcastCoverUrl) }
    : null;

  const handleToggleSave = (episodeId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedEpisodeIds(prev => {
      const updated = prev.includes(episodeId)
        ? prev.filter(id => id !== episodeId)
        : [...prev, episodeId];
      try {
        localStorage.setItem('sanctum_saved_podcasts', JSON.stringify(updated));
      } catch {
        // silent fallback
      }
      return updated;
    });
  };

  const handleShareEpisode = (episode: PodcastEpisode, e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `${episode.title}
From "${episode.podcastTitle}" hosted by ${episode.podcastHost}

SUMMARY:
${episode.summary}

KEY QUOTE:
${episode.keyQuote}

Listen and reflect on Soul Sanctum Catholic Podcasts.`;

    navigator.clipboard.writeText(text);
    setCopiedId(episode.id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  const allEpisodes = getAllPodcastEpisodes().map(ep => ({
    ...ep,
    podcastCoverUrl: getPodcastArtwork(ep.podcastId, ep.podcastCoverUrl)
  }));

  // Filter episodes based on category, show, and search query
  const filteredEpisodes = allEpisodes.filter(ep => {
    // Show filter
    if (selectedShowId && ep.podcastId !== selectedShowId) {
      return false;
    }

    // Category or Saved filter
    if (selectedCategory === 'saved') {
      if (!savedEpisodeIds.includes(ep.id)) return false;
    } else if (selectedCategory !== 'all') {
      if (ep.category !== selectedCategory) return false;
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const inTitle = ep.title.toLowerCase().includes(q);
      const inPodcast = ep.podcastTitle.toLowerCase().includes(q);
      const inHost = ep.podcastHost.toLowerCase().includes(q);
      const inSummary = ep.summary.toLowerCase().includes(q);
      const inTags = ep.tags.some(t => t.toLowerCase().includes(q));
      return inTitle || inPodcast || inHost || inSummary || inTags;
    }

    return true;
  });

  const categories: { id: CatholicPodcastCategory | 'saved'; label: string }[] = [
    { id: 'all', label: 'All Podcasts' },
    { id: 'scripture-catechism', label: 'Scripture and Catechism' },
    { id: 'theology-apologetics', label: 'Theology and Apologetics' },
    { id: 'spiritual-prayer', label: 'Spiritual Life and Prayer' },
    { id: 'culture-interviews', label: 'Interviews and Culture' },
    { id: 'saved', label: `Saved (${savedEpisodeIds.length})` }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-24">
      
      {/* Sanctum Podcasts Master Hero Banner */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-stone-900 via-[#1C120C] to-stone-950 border border-amber-500/30 p-6 sm:p-8 md:p-10 shadow-2xl text-stone-100">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(251,191,36,0.18)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs font-cinzel font-semibold tracking-wider">
            <Radio className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Catholic Podcasts</span>
          </div>

          <h2 className="font-cinzel text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-wide leading-tight">
            Nourish Your Soul with Faithful Catholic Audio
          </h2>

          <p className="text-sm sm:text-base text-stone-300 font-serif leading-relaxed">
            Listen to premier Catholic podcasts, Scripture expositions, theological discourses, and spiritual masterclasses from Fr. Mike Schmitz, Bishop Robert Barron, Matt Fradd, and the Holy See.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-amber-200/90 font-serif">
            <span>
              100% Free and Faithful
            </span>
            <span>•</span>
            <span>Full Study Notes and Scripture</span>
            <span>•</span>
            <span>Continuous Background Audio</span>
          </div>
        </div>

        {/* Featured Spotlight Card */}
        {featuredEpisode && (
          <div className="relative z-10 mt-6 sm:mt-8 p-4 sm:p-5 rounded-2xl bg-black/40 border border-amber-500/30 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <img 
                src={featuredEpisode.podcastCoverUrl} 
                alt={featuredEpisode.title} 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-amber-500/50 shadow-md shrink-0"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="min-w-0 space-y-1">
                <span className="text-[10px] font-bold font-cinzel uppercase tracking-widest text-amber-400">
                  FEATURED EPISODE OF THE DAY
                </span>
                <h3 className="text-sm sm:text-base font-serif font-bold text-white truncate max-w-lg">
                  {featuredEpisode.title}
                </h3>
                <p className="text-xs text-stone-300 line-clamp-1 font-serif">
                  {featuredEpisode.podcastTitle} with {featuredEpisode.podcastHost} • {featuredEpisode.durationFormatted}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                if (currentPlayingEpisode?.id === featuredEpisode.id && isPlaying) {
                  onPauseEpisode();
                } else {
                  onPlayEpisode(featuredEpisode);
                }
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 text-xs sm:text-sm font-cinzel font-bold shadow-lg hover:scale-102 transition-all cursor-pointer shrink-0"
            >
              {currentPlayingEpisode?.id === featuredEpisode.id && isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>Pause Episode</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current ml-0.5" />
                  <span>Listen Now</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Fio Catholic Audio and Music Integration Card */}
        <div className="relative z-10 mt-4 p-4 rounded-2xl bg-gradient-to-r from-amber-950/60 via-stone-900/80 to-amber-950/60 border border-amber-500/40 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/30 shrink-0">
              <Headphones className="w-4 h-4 text-amber-300" />
            </span>
            <div>
              <span className="font-cinzel text-xs font-bold text-amber-200 block">
                Fio Catholic Podcasts and Music Platform
              </span>
              <p className="text-stone-300 font-serif text-[11px] leading-relaxed">
                Explore 100,000+ hours of Catholic podcasts, sacred music, Gregorian chant, and audiobooks on Fio.
              </p>
            </div>
          </div>

          <a
            href="https://fio.fm"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/35 border border-amber-400/40 text-amber-200 hover:text-white font-cinzel font-bold text-xs transition-all shrink-0 cursor-pointer"
          >
            <span>Explore Fio.fm</span>
            <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
          </a>
        </div>
      </div>

      {/* Shows Catalog Horizontal Carousel / Grid */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Headphones className="w-4 h-4 text-amber-700" />
            <h3 className="font-cinzel text-base sm:text-lg font-bold text-stone-800 tracking-wide">
              Featured Catholic Podcast Series
            </h3>
          </div>
          {selectedShowId && (
            <button
              onClick={() => setSelectedShowId(null)}
              className="text-xs text-amber-800 hover:underline cursor-pointer font-serif font-medium"
            >
              Show all series
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {CATHOLIC_PODCASTS_DATABASE.map(show => {
            const isSelected = selectedShowId === show.id;
            return (
              <div
                key={show.id}
                onClick={() => setSelectedShowId(isSelected ? null : show.id)}
                className={`group p-3 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-50 border-amber-600 shadow-md ring-2 ring-amber-500/20'
                    : 'bg-white hover:bg-stone-50 border-stone-200/90 shadow-2xs hover:shadow-sm'
                }`}
              >
                <div className="space-y-2">
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden shadow-xs">
                    <img 
                      src={getPodcastArtwork(show.id, show.coverUrl)} 
                      alt={show.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-[9px] font-bold text-amber-300 flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 fill-current" />
                      <span>{show.rating}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-cinzel text-xs font-bold text-stone-900 group-hover:text-amber-800 transition-colors line-clamp-1">
                      {show.title}
                    </h4>
                    <p className="text-[11px] text-stone-500 font-serif line-clamp-1">
                      {show.host}
                    </p>
                  </div>
                </div>

                <div className="pt-2 mt-2 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-400">
                  <span className="font-medium text-amber-700">{show.organization}</span>
                  <span>{show.episodes.length} episodes</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Tabs and Search Bar */}
      <div className="space-y-3 bg-white p-4 sm:p-5 rounded-2xl border border-stone-200 shadow-xs">
        
        {/* Search Bar */}
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search by topic, Scripture passage, host, or keyword (e.g. Eucharist, Aquinas, Prayer)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs sm:text-sm pl-9 pr-8 py-2.5 rounded-xl bg-stone-100 border border-stone-300 focus:outline-none focus:border-amber-700 font-serif transition-colors"
          />
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3.5" />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-stone-400 hover:text-stone-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Category Chips */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-cinzel font-medium transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-700 text-white font-bold shadow-xs'
                  : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Active Filter Indicators */}
        {(selectedShowId || selectedCategory !== 'all' || searchQuery) && (
          <div className="flex items-center justify-between text-xs text-stone-500 pt-1 border-t border-stone-100">
            <span>
              Showing {filteredEpisodes.length} {filteredEpisodes.length === 1 ? 'episode' : 'episodes'}
              {selectedShowId && ` for selected series`}
            </span>
            <button
              onClick={() => {
                setSelectedShowId(null);
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-amber-800 hover:underline cursor-pointer font-serif"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>

      {/* Episodes List */}
      <div className="space-y-4">
        {filteredEpisodes.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-stone-200 space-y-3">
            <Radio className="w-10 h-10 text-stone-300 mx-auto" />
            <h4 className="font-cinzel text-base font-bold text-stone-700">No episodes found</h4>
            <p className="text-xs text-stone-500 font-serif max-w-md mx-auto">
              We couldn't find any podcast episodes matching your search. Try resetting filters or searching for terms like "Eucharist", "Genesis", or "Aquinas".
            </p>
          </div>
        ) : (
          filteredEpisodes.map(episode => {
            const isEpisodePlaying = currentPlayingEpisode?.id === episode.id && isPlaying;
            const isSaved = savedEpisodeIds.includes(episode.id);

            return (
              <div
                key={episode.id}
                className={`bg-white rounded-2xl p-5 sm:p-6 border transition-all duration-200 shadow-2xs hover:shadow-md space-y-4 group ${
                  currentPlayingEpisode?.id === episode.id
                    ? 'border-amber-500/80 ring-2 ring-amber-500/20 bg-amber-50/20'
                    : 'border-stone-200/90 hover:border-amber-300'
                }`}
              >
                {/* Header row: Artwork + Title + Actions */}
                <div className="flex items-start justify-between gap-4">
                  
                  <div className="flex items-start gap-3 sm:gap-4 min-w-0">
                    {/* Artwork + Play Overlay */}
                    <div className="relative group/cover shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden shadow-sm border border-stone-200">
                      <img 
                        src={episode.podcastCoverUrl} 
                        alt={episode.podcastTitle}
                        className="w-full h-full object-cover group-hover/cover:scale-105 transition-transform duration-200"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      <button
                        onClick={() => {
                          if (isEpisodePlaying) {
                            onPauseEpisode();
                          } else {
                            onPlayEpisode(episode);
                          }
                        }}
                        className={`absolute inset-0 flex items-center justify-center transition-all cursor-pointer ${
                          isEpisodePlaying
                            ? 'bg-amber-600/90 text-white animate-pulse'
                            : 'bg-black/35 group-hover/cover:bg-amber-700/80 text-white'
                        }`}
                        title={isEpisodePlaying ? 'Pause Episode' : 'Play Catholic Podcast'}
                        aria-label="Play or pause episode"
                      >
                        {isEpisodePlaying ? (
                          <Pause className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                        ) : (
                          <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current ml-0.5" />
                        )}
                      </button>
                    </div>

                    {/* Metadata */}
                    <div className="space-y-1 min-w-0 text-left">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] sm:text-xs font-bold font-cinzel text-amber-800 uppercase tracking-wider">
                          {episode.podcastTitle}
                        </span>
                        <span className="text-stone-300">•</span>
                        <span className="text-[11px] text-stone-500 font-serif">
                          {episode.podcastHost}
                        </span>
                      </div>

                      <h3 
                        onClick={() => onOpenDetailsModal(episode)}
                        className="text-base sm:text-lg font-serif font-bold text-stone-900 hover:text-amber-800 transition-colors cursor-pointer leading-snug"
                      >
                        {episode.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-stone-500 font-serif">
                        <span className="flex items-center gap-1 text-stone-600">
                          <Clock className="w-3.5 h-3.5 text-stone-400" />
                          {episode.durationFormatted}
                        </span>
                        <span>•</span>
                        <span>{episode.releaseDate}</span>
                        {episode.scriptureReferences && episode.scriptureReferences.length > 0 && (
                          <>
                            <span>•</span>
                            <span className="text-amber-800 font-medium">
                              {episode.scriptureReferences[0]}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Top-Right Quick Bookmark and Share */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={(e) => handleToggleSave(episode.id, e)}
                      className={`p-2 rounded-xl transition-all cursor-pointer ${
                        isSaved 
                          ? 'text-amber-700 bg-amber-100 hover:bg-amber-200' 
                          : 'text-stone-400 hover:text-stone-600 hover:bg-stone-100'
                      }`}
                      title={isSaved ? 'Remove from saved' : 'Save for later'}
                    >
                      {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={(e) => handleShareEpisode(episode, e)}
                      className="p-2 rounded-xl text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-all cursor-pointer"
                      title="Copy notes and summary"
                    >
                      {copiedId === episode.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                    </button>
                  </div>

                </div>

                {/* Summary and Key Quote */}
                <p className="text-xs sm:text-sm text-stone-700 font-serif leading-relaxed text-left">
                  {episode.summary}
                </p>

                {/* Highlight Quote Box */}
                {episode.keyQuote && (
                  <div className="p-3 sm:p-3.5 rounded-xl bg-amber-50/80 border-l-3 border-amber-600 text-stone-800 text-xs sm:text-sm font-serif italic text-left">
                    {episode.keyQuote}
                  </div>
                )}

                {/* Bottom Bar: Key Takeaways preview + Read Full Notes button */}
                <div className="pt-2 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {episode.tags.slice(0, 3).map(tag => (
                      <span 
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 text-[11px] font-serif"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => onOpenDetailsModal(episode)}
                    className="inline-flex items-center gap-1 text-amber-800 hover:text-amber-950 font-cinzel text-xs font-semibold hover:underline cursor-pointer"
                  >
                    <span>View Study Notes and Transcripts</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
