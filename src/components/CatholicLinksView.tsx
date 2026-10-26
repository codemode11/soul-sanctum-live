import React, { useState, useEffect } from 'react';
import {
  ExternalLink,
  Globe,
  Search,
  CheckCircle2,
  Bookmark,
  Plus,
  Sparkles,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Trash2,
  Compass
} from 'lucide-react';
import { CatholicWebsiteLink, INITIAL_CATHOLIC_LINKS } from '../data/catholicLinks';
import { SacredReader } from '../utils/speech';

const STORAGE_KEY = 'sanctum_custom_catholic_links_v1';
const BOOKMARKS_KEY = 'sanctum_bookmarked_catholic_links_v1';

export const CatholicLinksView: React.FC = () => {
  const [customLinks, setCustomLinks] = useState<CatholicWebsiteLink[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(BOOKMARKS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  // Add Website Form State
  const [newName, setNewName] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newCategory, setNewCategory] = useState<CatholicWebsiteLink['category']>('Apologetics and Catechesis');
  const [newTagline, setNewTagline] = useState('');
  const [newWhyItsGood, setNewWhyItsGood] = useState('');
  const [newHighlightsText, setNewHighlightsText] = useState('');

  useEffect(() => {
    return () => {
      SacredReader.stop();
    };
  }, []);

  const allLinks = [...customLinks, ...INITIAL_CATHOLIC_LINKS];

  const categories = [
    'All',
    'Saved Favorites',
    'Holy See and Magisterium',
    'Scripture and Liturgy',
    'Patristics and Theology',
    'Apologetics and Catechesis',
    'News and Catholic Culture',
    'Prayer and Devotion'
  ];

  const toggleBookmark = (id: string) => {
    const next = bookmarkedIds.includes(id)
      ? bookmarkedIds.filter(b => b !== id)
      : [...bookmarkedIds, id];
    setBookmarkedIds(next);
    try {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(next));
    } catch {
      // ignore storage errors
    }
  };

  const handleToggleSpeak = (site: CatholicWebsiteLink) => {
    if (speakingId === site.id) {
      SacredReader.stop();
      setSpeakingId(null);
    } else {
      SacredReader.stop();
      setSpeakingId(site.id);
      const textToRead = `${site.name}. ${site.tagline}. Why it is good: ${site.whyItsGood}`;
      SacredReader.speak(textToRead, () => setSpeakingId(null), 'ava-grace');
    }
  };

  const handleCopyLink = (site: CatholicWebsiteLink) => {
    const text = `${site.name} (${site.url})\n${site.tagline}\n\nWhy It's Good:\n${site.whyItsGood}`;
    navigator.clipboard.writeText(text);
    setCopiedId(site.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddWebsite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newUrl.trim()) return;

    let formattedUrl = newUrl.trim();
    if (!/^https?:\/\//i.test(formattedUrl)) {
      formattedUrl = `https://${formattedUrl}`;
    }

    let domain = formattedUrl.replace(/^https?:\/\//i, '').replace(/^www\./i, '').split('/')[0];

    const defaultExplanation =
      newWhyItsGood.trim() ||
      `${newName.trim()} is a valuable Catholic resource offering faithful spiritual, catechetical, and liturgical content to deepen your walk with Christ and His Church.`;

    const highlights = newHighlightsText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    const newEntry: CatholicWebsiteLink = {
      id: `custom-${Date.now()}`,
      name: newName.trim(),
      url: formattedUrl,
      displayDomain: domain,
      category: newCategory,
      tagline: newTagline.trim() || 'Curated Catholic Resource and Apostolate',
      whyItsGood: defaultExplanation,
      keyHighlights:
        highlights.length > 0
          ? highlights
          : [
              'Authentic Catholic teaching and spiritual enrichment',
              'Direct access to faithful resources for prayer, study, and formation'
            ]
    };

    const updated = [newEntry, ...customLinks];
    setCustomLinks(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }

    setNewName('');
    setNewUrl('');
    setNewTagline('');
    setNewWhyItsGood('');
    setNewHighlightsText('');
    setShowAddForm(false);
  };

  const handleDeleteCustom = (id: string) => {
    const updated = customLinks.filter(item => item.id !== id);
    setCustomLinks(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const filteredLinks = allLinks.filter(site => {
    if (selectedCategory === 'Saved Favorites' && !bookmarkedIds.includes(site.id)) {
      return false;
    }
    if (
      selectedCategory !== 'All' &&
      selectedCategory !== 'Saved Favorites' &&
      site.category !== selectedCategory
    ) {
      return false;
    }
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      site.name.toLowerCase().includes(q) ||
      site.displayDomain.toLowerCase().includes(q) ||
      site.tagline.toLowerCase().includes(q) ||
      site.whyItsGood.toLowerCase().includes(q) ||
      site.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-14 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#1C120C] via-[#2B1B10] to-[#1C120C] rounded-xl p-6 sm:p-7 text-[#F7EBE1] shadow-xl border border-[#8B5A2B]/50">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6B4423]/40 border border-[#C89F72]/40 text-[#F5D7B2] text-xs font-cinzel font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-[#FFD700]" />
              <span>Curated Directory of Faithful Apostolates</span>
            </div>

            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide">
              Catholic Links
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 font-serif leading-relaxed">
              A trusted guide to the finest Catholic websites across the internet — with clear explanations of why each site is spiritually and intellectually valuable, key features, and direct links.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#6B4423] to-[#4A2E1B] hover:from-[#7A4E2D] hover:to-[#5A381C] border border-[#C89F72]/50 text-white text-xs font-sans font-semibold shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{showAddForm ? 'Close Form' : 'Add Catholic Website'}</span>
            </button>
          </div>
        </div>

        {/* Interactive Add Website Drawer */}
        {showAddForm && (
          <form
            onSubmit={handleAddWebsite}
            className="mt-6 pt-5 border-t border-[#8B5A2B]/40 space-y-4 bg-black/30 p-4 sm:p-5 rounded-xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-cinzel text-sm sm:text-base font-bold text-[#FFD700]">
                Add a Catholic Website to the Directory
              </h3>
              <span className="text-[11px] text-stone-400 font-serif italic">
                Saved directly to your Catholic Links directory
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Website Name *
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="e.g., Catholic Culture"
                  className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-[#8B5A2B]/50 text-white text-xs focus:outline-none focus:border-[#FFD700]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Website URL *
                </label>
                <input
                  type="text"
                  required
                  value={newUrl}
                  onChange={e => setNewUrl(e.target.value)}
                  placeholder="e.g., https://www.catholicculture.org"
                  className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-[#8B5A2B]/50 text-white text-xs focus:outline-none focus:border-[#FFD700]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value as CatholicWebsiteLink['category'])}
                  className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-[#8B5A2B]/50 text-white text-xs focus:outline-none focus:border-[#FFD700]"
                >
                  <option value="Holy See and Magisterium">Holy See and Magisterium</option>
                  <option value="Scripture and Liturgy">Scripture and Liturgy</option>
                  <option value="Patristics and Theology">Patristics and Theology</option>
                  <option value="Apologetics and Catechesis">Apologetics and Catechesis</option>
                  <option value="News and Catholic Culture">News and Catholic Culture</option>
                  <option value="Prayer and Devotion">Prayer and Devotion</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Short Subtitle / Tagline
                </label>
                <input
                  type="text"
                  value={newTagline}
                  onChange={e => setNewTagline(e.target.value)}
                  placeholder="e.g., Liturgical Year, Library and Catholic Documents"
                  className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-[#8B5A2B]/50 text-white text-xs focus:outline-none focus:border-[#FFD700]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Why It's Good (Spiritual and Theological Value)
              </label>
              <textarea
                rows={3}
                value={newWhyItsGood}
                onChange={e => setNewWhyItsGood(e.target.value)}
                placeholder="Explain what makes this Catholic website trustworthy, enriching, and worth visiting..."
                className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-[#8B5A2B]/50 text-white text-xs focus:outline-none focus:border-[#FFD700]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-300 mb-1">
                Key Highlights (One per line, optional)
              </label>
              <textarea
                rows={2}
                value={newHighlightsText}
                onChange={e => setNewHighlightsText(e.target.value)}
                placeholder="Daily liturgical commentary&#10;Searchable library of Church documents"
                className="w-full px-3 py-2 rounded-lg bg-stone-900 border border-[#8B5A2B]/50 text-white text-xs focus:outline-none focus:border-[#FFD700]"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-sans cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-[#6B4423] hover:bg-[#7A4E2D] border border-[#C89F72]/50 text-white text-xs font-sans font-bold cursor-pointer shadow-sm"
              >
                Save Website Link
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-sm border border-stone-200/90 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#6B4423] text-white font-bold shadow-xs border border-[#5A381C]'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative shrink-0">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search websites or topics..."
              className="w-full sm:w-60 pl-8 pr-3 py-1.5 rounded-lg bg-stone-50 border border-stone-300 text-xs focus:outline-none focus:border-[#6B4423]"
            />
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2" />
          </div>
        </div>
      </div>

      {/* Websites Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredLinks.map(site => {
          const isBookmarked = bookmarkedIds.includes(site.id);
          const isSpeaking = speakingId === site.id;
          const isCustom = site.id.startsWith('custom-');

          return (
            <article
              key={site.id}
              className="bg-white/95 backdrop-blur-md rounded-xl p-5 sm:p-6 shadow-md border border-stone-200/90 hover:border-[#8B5A2B]/60 transition-all space-y-4"
            >
              {/* Top Row: Title, Category Badge, and Direct Link Button */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-stone-200/80 pb-3.5">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="px-2.5 py-1 rounded-md bg-[#FAF4EE] border border-[#D4A373]/60 text-[#5A381C] text-xs font-cinzel font-bold uppercase tracking-wider">
                      {site.category}
                    </span>

                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-sans font-semibold text-[#6B4423] hover:text-[#4A2E1B] underline underline-offset-2"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>{site.displayDomain}</span>
                    </a>
                  </div>

                  <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-stone-900">
                    <a
                      href={site.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#6B4423] transition-colors"
                    >
                      {site.name}
                    </a>
                  </h3>

                  <p className="text-sm sm:text-base font-serif italic text-stone-600">
                    {site.tagline}
                  </p>
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center gap-2 shrink-0 self-start">
                  <button
                    onClick={() => handleToggleSpeak(site)}
                    className={`p-2 rounded-lg border transition-all cursor-pointer ${
                      isSpeaking
                        ? 'bg-[#6B4423] text-white border-[#5A381C] animate-pulse'
                        : 'bg-stone-100 hover:bg-stone-200 text-[#5A381C] border-stone-300'
                    }`}
                    title={isSpeaking ? 'Stop audio' : 'Listen to review'}
                    aria-label="Listen to website explanation"
                  >
                    {isSpeaking ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>

                  <button
                    onClick={() => toggleBookmark(site.id)}
                    className={`p-2 rounded-lg border transition-all cursor-pointer ${
                      isBookmarked
                        ? 'bg-[#6B4423] text-white border-[#5A381C]'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-600 border-stone-300'
                    }`}
                    title={isBookmarked ? 'Remove from favorites' : 'Save to favorites'}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleCopyLink(site)}
                    className="p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-600 border border-stone-300 transition-all cursor-pointer"
                    title="Copy website link and summary"
                  >
                    {copiedId === site.id ? (
                      <Check className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  {isCustom && (
                    <button
                      onClick={() => handleDeleteCustom(site.id)}
                      className="p-2 rounded-lg bg-stone-100 hover:bg-red-50 text-stone-500 hover:text-red-700 border border-stone-300 transition-all cursor-pointer"
                      title="Remove custom link"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}

                  <a
                    href={site.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-[#6B4423] to-[#4A2E1B] hover:from-[#7A4E2D] hover:to-[#5A381C] border border-[#8B5A2B]/60 text-white text-xs font-sans font-semibold shadow-sm transition-all"
                  >
                    <span>Visit Website</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  {site.secondaryUrl && (
                    <a
                      href={site.secondaryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#FAF4EE] hover:bg-[#F3E7DB] border border-[#C89F72]/70 text-[#5A381C] text-xs font-sans font-semibold shadow-2xs transition-all"
                    >
                      <span>{site.secondaryLabel || 'Alternate Portal'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              {/* Why It's Good Box */}
              <div className="p-4 sm:p-5 rounded-xl bg-[#FAF8F5] border-l-4 border-[#6B4423] space-y-2">
                <div className="flex items-center gap-2 text-sm sm:text-base font-cinzel font-bold uppercase tracking-wider text-[#5A381C]">
                  <Sparkles className="w-4 h-4 text-[#8B5A2B]" />
                  <span>Why This Website Is Good and Worth Visiting</span>
                </div>
                <p className="text-base sm:text-lg font-serif text-stone-800 leading-relaxed">
                  {site.whyItsGood}
                </p>
              </div>

              {/* Key Highlights */}
              {site.keyHighlights && site.keyHighlights.length > 0 && (
                <div className="space-y-2.5 pt-2">
                  <span className="text-sm sm:text-base font-cinzel font-bold uppercase tracking-wider text-[#5A381C] block">
                    What You Will Find Here:
                  </span>
                  <ul className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {site.keyHighlights.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 p-3.5 sm:p-4 rounded-lg bg-stone-50 border border-stone-200/90 text-base sm:text-lg font-serif text-stone-800 leading-relaxed"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#6B4423] shrink-0 mt-1" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};
