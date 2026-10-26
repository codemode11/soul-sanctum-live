import React, { useState } from 'react';
import { 
  HeartHandshake, 
  Flame, 
  Plus, 
  Search, 
  Heart, 
  Share2, 
  Sparkles, 
  Check, 
  BookOpen, 
  Volume2, 
  VolumeX, 
  Copy, 
  X,
  Cross
} from 'lucide-react';
import { CatholicPrayer, PrayerRequest, PrayerCategory } from '../types';
import { CATHOLIC_PRAYERS_DATABASE } from '../data/prayers';
import { INITIAL_PRAYER_REQUESTS } from '../data/prayerRequests';
import { bellSynth } from '../utils/audioSynth';
import { SacredReader } from '../utils/speech';

interface PrayerWallAndTreasuryViewProps {
  initialSection?: 'wall' | 'treasury';
}

export const PrayerWallAndTreasuryView: React.FC<PrayerWallAndTreasuryViewProps> = ({
  initialSection = 'wall'
}) => {
  const [activeSection, setActiveSection] = useState<'wall' | 'treasury'>(initialSection);

  React.useEffect(() => {
    if (initialSection) {
      setActiveSection(initialSection);
    }
  }, [initialSection]);
  
  // Prayer Requests Wall state
  const [requests, setRequests] = useState<PrayerRequest[]>(INITIAL_PRAYER_REQUESTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [newRequestModalOpen, setNewRequestModalOpen] = useState(false);
  
  // New request form state
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<PrayerCategory>('Healing');

  // Prayers Treasury state
  const [selectedPrayer, setSelectedPrayer] = useState<CatholicPrayer>(CATHOLIC_PRAYERS_DATABASE[1]); // Our Father
  const [prayerSearch, setPrayerSearch] = useState('');
  const [copiedPrayerId, setCopiedPrayerId] = useState<string | null>(null);
  const [speakingPrayerId, setSpeakingPrayerId] = useState<string | null>(null);

  const categories: (PrayerCategory | 'All')[] = [
    'All',
    'Healing',
    'Holy Souls in Purgatory',
    'Family and Marriage',
    'Vocations and Priesthood',
    'Spiritual Conversion',
    'Peace and Protection',
    'Thanksgiving'
  ];

  // Increment prayer counter
  const handlePrayForRequest = (reqId: string) => {
    setRequests(prev => prev.map(req => {
      if (req.id !== reqId) return req;
      const alreadyPrayed = req.hasPrayed;
      bellSynth.playBeadChime();
      return {
        ...req,
        hasPrayed: !alreadyPrayed,
        prayerCount: alreadyPrayed ? req.prayerCount - 1 : req.prayerCount + 1
      };
    }));
  };

  // Toggle candle
  const handleToggleCandle = (reqId: string) => {
    setRequests(prev => prev.map(req => {
      if (req.id !== reqId) return req;
      bellSynth.playChurchBell(659, 2.0); // E5 soft candle chime
      return {
        ...req,
        candleLit: !req.candleLit
      };
    }));
  };

  // Submit new request
  const handleSubmitNewRequest = () => {
    if (!newTitle.trim() || !newDescription.trim()) return;

    const newReq: PrayerRequest = {
      id: `req-${Date.now()}`,
      title: newTitle.trim(),
      description: newDescription.trim(),
      nameOrInitials: newName.trim() || 'A Faithful Pilgrim',
      category: newCategory,
      dateSubmitted: 'Today',
      prayerCount: 1,
      hasPrayed: true,
      candleLit: true
    };

    setRequests([newReq, ...requests]);
    setNewTitle('');
    setNewDescription('');
    setNewName('');
    setNewRequestModalOpen(false);
    bellSynth.playChurchBell(440, 3.0);
  };

  const handleCopyPrayer = (prayer: CatholicPrayer) => {
    const text = `${prayer.title.toUpperCase()}
${prayer.englishText}

${prayer.latinText ? `LATIN:\n${prayer.latinText}` : ''}`;

    navigator.clipboard.writeText(text);
    setCopiedPrayerId(prayer.id);
    setTimeout(() => setCopiedPrayerId(null), 2000);
  };

  const handleToggleSpeakPrayer = (prayer: CatholicPrayer) => {
    if (speakingPrayerId === prayer.id) {
      SacredReader.stop();
      setSpeakingPrayerId(null);
    } else {
      SacredReader.speak(prayer.englishText, () => setSpeakingPrayerId(null));
      setSpeakingPrayerId(prayer.id);
    }
  };

  const filteredRequests = requests.filter(req => {
    const matchesCat = selectedCategory === 'All' || req.category === selectedCategory;
    const matchesSearch = 
      req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.nameOrInitials.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const filteredTreasuryPrayers = CATHOLIC_PRAYERS_DATABASE.filter(p =>
    p.title.toLowerCase().includes(prayerSearch.toLowerCase()) ||
    (p.latinTitle && p.latinTitle.toLowerCase().includes(prayerSearch.toLowerCase())) ||
    p.englishText.toLowerCase().includes(prayerSearch.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Switcher Buttons: Treasury of Prayers precedes Community Prayer Wall per user request */}
      <div className="flex rounded-2xl bg-stone-200/80 p-1.5 max-w-md mx-auto shadow-inner">
        <button
          onClick={() => setActiveSection('treasury')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeSection === 'treasury'
              ? 'bg-amber-900 text-amber-50 shadow-md'
              : 'text-stone-700 hover:text-stone-900'
          }`}
        >
          <BookOpen className="w-4 h-4 text-amber-400" />
          <span>Catholic Prayers Treasury</span>
        </button>

        <button
          onClick={() => setActiveSection('wall')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-center gap-2 ${
            activeSection === 'wall'
              ? 'bg-amber-900 text-amber-50 shadow-md'
              : 'text-stone-700 hover:text-stone-900'
          }`}
        >
          <HeartHandshake className="w-4 h-4 text-amber-400" />
          <span>Community Prayer Wall</span>
        </button>
      </div>

      {/* =========================================================================
          SECTION 1: COMMUNITY PRAYER REQUESTS WALL
         ========================================================================= */}
      {activeSection === 'wall' && (
        <div className="space-y-6">
          
          {/* Banner with Add Request CTA */}
          <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 rounded-xl p-6 sm:p-8 text-amber-50 shadow-md border border-amber-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-400" />
                <span className="font-cinzel text-xs font-bold uppercase tracking-widest text-amber-300">
                  Communion of Saints • Fraternal Intercession
                </span>
              </div>
              <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide">
                Community Prayer Requests Wall
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 font-serif-sacred max-w-xl">
                "Bear one another's burdens, and so fulfill the law of Christ" (Galatians 6:2). Post your intentions, pray a decade for a brother or sister in Christ, and light a vigil candle. (The intentions below are only templates.)
              </p>
            </div>

            <button
              onClick={() => setNewRequestModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-700 to-amber-900 hover:from-amber-600 hover:to-amber-800 text-amber-50 text-xs font-semibold font-cinzel tracking-wider transition-all cursor-pointer shadow-md flex items-center gap-2 shrink-0 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Submit Intention</span>
            </button>
          </div>

          {/* Category Filter Pills and Search */}
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-stone-200 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-amber-900 text-amber-50 shadow-xs'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search intentions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg bg-stone-100 border border-stone-300 focus:outline-none focus:border-amber-700"
                />
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
              </div>
            </div>
          </div>

          {/* Prayer Request Cards Grid */}
          <div className="space-y-4">
            {filteredRequests.map(req => (
              <div
                key={req.id}
                className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs hover:shadow-xs transition-all space-y-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-wider font-cinzel">
                        {req.category}
                      </span>
                      <span className="text-[11px] text-stone-400 font-serif-sacred">
                        {req.dateSubmitted} • By {req.nameOrInitials}
                      </span>
                    </div>

                    <h3 className="font-cinzel text-base sm:text-lg font-bold text-stone-900">
                      {req.title}
                    </h3>
                  </div>

                  {/* Candle Button */}
                  <button
                    onClick={() => handleToggleCandle(req.id)}
                    className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-medium ${
                      req.candleLit 
                        ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-xs' 
                        : 'bg-stone-50 border-stone-200 text-stone-500 hover:bg-stone-100'
                    }`}
                    title={req.candleLit ? 'Vigil candle lit for this intention' : 'Click to light a virtual vigil candle'}
                  >
                    <Flame className={`w-4 h-4 ${req.candleLit ? 'text-amber-500 fill-amber-500 animate-pulse' : 'text-stone-400'}`} />
                    <span className="hidden sm:inline">{req.candleLit ? 'Candle Lit' : 'Light Candle'}</span>
                  </button>
                </div>

                <p className="font-serif-sacred text-stone-800 text-sm sm:text-base leading-relaxed pl-3 border-l-2 border-amber-800/30">
                  "{req.description}"
                </p>

                {/* Bottom Bar: Pray for intention CTA */}
                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-stone-600 font-serif-sacred">
                    <span className="font-bold font-cinzel text-amber-950 text-sm">
                      {req.prayerCount}
                    </span>
                    <span>faithful praying for this intention</span>
                  </div>

                  <button
                    onClick={() => handlePrayForRequest(req.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      req.hasPrayed
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'bg-stone-100 hover:bg-amber-100 text-stone-800 hover:text-amber-950 border border-stone-300'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${req.hasPrayed ? 'fill-white' : 'text-amber-800'}`} />
                    <span>{req.hasPrayed ? 'You Prayed ✓' : 'I Prayed a Prayer'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* =========================================================================
          SECTION 2: CATHOLIC PRAYERS TREASURY
         ========================================================================= */}
      {activeSection === 'treasury' && (
        <div className="space-y-6">
          
          {/* Prayers Selector List */}
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-stone-200 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-stone-500">
                Treasury of Sacred Catholic Prayers ({CATHOLIC_PRAYERS_DATABASE.length})
              </span>
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search prayers..."
                  value={prayerSearch}
                  onChange={(e) => setPrayerSearch(e.target.value)}
                  className="w-full text-xs pl-8 pr-3 py-1.5 rounded-lg bg-stone-100 border border-stone-300 focus:outline-none focus:border-amber-700"
                />
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2.5" />
              </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {filteredTreasuryPrayers.map(p => {
                const isSelected = p.id === selectedPrayer.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPrayer(p)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-amber-900 text-amber-50 shadow-xs'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                    }`}
                  >
                    {p.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Selected Prayer Display Card */}
          <article className="bg-white rounded-xl p-6 sm:p-8 shadow-xs border border-stone-200 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold uppercase tracking-wider font-cinzel">
                  {selectedPrayer.category}
                </span>
                <h3 className="font-cinzel text-2xl font-bold text-stone-900 mt-1">
                  {selectedPrayer.title}
                </h3>
                {selectedPrayer.latinTitle && (
                  <p className="text-xs text-amber-900 font-serif-sacred italic">
                    {selectedPrayer.latinTitle}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleSpeakPrayer(selectedPrayer)}
                  className={`p-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    speakingPrayerId === selectedPrayer.id
                      ? 'bg-amber-600 text-white'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300'
                  }`}
                  title="Read Aloud"
                  aria-label="Read Aloud"
                >
                  {speakingPrayerId === selectedPrayer.id ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-800" />}
                </button>

                <button
                  onClick={() => handleCopyPrayer(selectedPrayer)}
                  className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-300 transition-colors cursor-pointer"
                  title="Copy prayer"
                >
                  {copiedPrayerId === selectedPrayer.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Prayer Content: English and Latin Side by Side if available */}
            <div className={`grid ${selectedPrayer.latinText ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6`}>
              
              {/* English */}
              <div className="p-6 rounded-2xl bg-[#FCFAF7] border border-amber-900/15 space-y-3">
                <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-amber-950 block">
                  English Translation
                </span>
                <div className="font-serif-sacred text-stone-900 text-xl sm:text-2xl md:text-3xl leading-relaxed whitespace-pre-line">
                  {selectedPrayer.englishText}
                </div>
              </div>

              {/* Latin */}
              {selectedPrayer.latinText && (
                <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-3">
                  <span className="font-cinzel text-xs font-bold uppercase tracking-wider text-stone-800 block">
                    Textus Latinus (Lingua Sacra)
                  </span>
                  <div className="font-serif-sacred text-stone-800 text-xl sm:text-2xl md:text-3xl leading-relaxed whitespace-pre-line italic">
                    {selectedPrayer.latinText}
                  </div>
                </div>
              )}

            </div>

            {/* Historical Origin and Liturgical Context */}
            {selectedPrayer.scripturalOrTraditionOrigin && (
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-sm sm:text-base font-serif-sacred text-stone-800 space-y-1">
                <span className="font-cinzel font-bold text-amber-950 uppercase text-xs block">
                  Apostolic and Spiritual Origin:
                </span>
                <p>{selectedPrayer.scripturalOrTraditionOrigin}</p>
                {selectedPrayer.usageTime && (
                  <p className="italic text-amber-900 pt-0.5 text-xs sm:text-sm">Recommended time: {selectedPrayer.usageTime}</p>
                )}
              </div>
            )}

          </article>

        </div>
      )}

      {/* Modal: Submit Prayer Request */}
      {newRequestModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl border border-stone-300">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-900 font-cinzel">
                  Prayer Request
                </span>
                <h3 className="font-cinzel text-xl font-bold text-stone-900">
                  Place an Intention on the Wall
                </h3>
              </div>
              <button 
                onClick={() => setNewRequestModalOpen(false)}
                className="p-1 rounded-lg text-stone-400 hover:text-stone-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-stone-800 font-cinzel">Intention Title</label>
                <input
                  type="text"
                  placeholder="e.g. For healing of my sister Maria"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-stone-50 border border-stone-300 text-xs focus:outline-none focus:border-amber-800 mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-800 font-cinzel">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as PrayerCategory)}
                  className="w-full p-2.5 rounded-lg bg-stone-50 border border-stone-300 text-xs focus:outline-none focus:border-amber-800 mt-1"
                >
                  {categories.filter(c => c !== 'All').map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-800 font-cinzel">Intention Details / Prayer</label>
                <textarea
                  placeholder="Share details of your petition so fellow Catholic pilgrims can pray specifically for your intention..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full h-24 p-3 rounded-lg bg-stone-50 border border-stone-300 text-xs font-serif-sacred focus:outline-none focus:border-amber-800 resize-none mt-1"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-800 font-cinzel">Name or Initials (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Maria G. or A Loving Father"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-stone-50 border border-stone-300 text-xs focus:outline-none focus:border-amber-800 mt-1"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setNewRequestModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-stone-600 hover:bg-stone-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitNewRequest}
                className="px-5 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-800 text-amber-100 font-semibold text-xs transition-colors cursor-pointer"
              >
                Post Intention to Wall
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
