import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Copy, 
  Check, 
  Volume2, 
  VolumeX, 
  Filter, 
  Calendar, 
  BookOpen, 
  Heart, 
  ShieldCheck, 
  Star,
  Quote,
  Feather,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { 
  MEDJUGORJE_MESSAGES, 
  FIVE_STONES_OF_MEDJUGORJE, 
  VATICAN_NIHIL_OBSTAT_NOTE,
  MedjugorjeMessage 
} from '../data/medjugorjeMessages';
import { SacredReader } from '../utils/speech';

export const MedjugorjeMessagesView: React.FC = () => {
  const [selectedSeer, setSelectedSeer] = useState<string>('all');
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);
  const [showFiveStones, setShowFiveStones] = useState(false);
  const [showVaticanNote, setShowVaticanNote] = useState(false);

  // Latest spotlight message is always first
  const latestMessage = MEDJUGORJE_MESSAGES[0];

  // Distinct seers (all six Medjugorje visionaries)
  const seers = [
    'all', 
    'Marija Pavlović-Lunetti', 
    'Mirjana Dragićević-Soldo', 
    'Jakov Čolo',
    'Ivan Dragičević',
    'Ivanka Ivanković-Elez',
    'Vicka Ivanković-Mijatović'
  ];

  // Distinct years back to 1981
  const availableYears = ['all', '2026', '2025', '2024', '2023', '2022', '2021', '2020', '2015', '2010', '2005', '2001', '2000', '1995', '1991', '1987', '1984', '1981'];

  // Distinct themes
  const allThemes = Array.from(new Set(MEDJUGORJE_MESSAGES.flatMap(m => m.themes)));

  // Dynamic font size state and scaling
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const fontSizes: Array<'normal' | 'large' | 'xlarge'> = ['normal', 'large', 'xlarge'];

  const increaseFontSize = () => {
    const currentIndex = fontSizes.indexOf(fontSize);
    if (currentIndex < fontSizes.length - 1) {
      setFontSize(fontSizes[currentIndex + 1]);
    }
  };

  const decreaseFontSize = () => {
    const currentIndex = fontSizes.indexOf(fontSize);
    if (currentIndex > 0) {
      setFontSize(fontSizes[currentIndex - 1]);
    }
  };

  const messageStyle = {
    fontSize: fontSize === 'normal' ? '1.2rem' : fontSize === 'large' ? '1.45rem' : '1.8rem',
    lineHeight: '1.75'
  };

  const reflectionStyle = {
    fontSize: fontSize === 'normal' ? '0.95rem' : fontSize === 'large' ? '1.15rem' : '1.35rem',
    lineHeight: '1.65'
  };

  // Filter messages
  const filteredMessages = MEDJUGORJE_MESSAGES.filter(msg => {
    const matchSeer = selectedSeer === 'all' || msg.seerName === selectedSeer;
    const matchTheme = selectedTheme === 'all' || msg.themes.includes(selectedTheme);
    const matchYear = selectedYear === 'all' || msg.date.startsWith(selectedYear);
    const matchSearch = searchQuery === '' || 
      msg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.messageText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.displayDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.spiritualReflection.toLowerCase().includes(searchQuery.toLowerCase());
    return matchSeer && matchTheme && matchYear && matchSearch;
  });

  const handleToggleSpeak = (msg: MedjugorjeMessage) => {
    if (playingMessageId === msg.id) {
      SacredReader.stop();
      setPlayingMessageId(null);
    } else {
      SacredReader.stop();
      setPlayingMessageId(msg.id);
      const textToSpeak = `Message of Our Lady, Queen of Peace, given through ${msg.seerName} on ${msg.displayDate}. ${msg.messageText}. Spiritual reflection: ${msg.spiritualReflection}`;
      SacredReader.speak(textToSpeak, () => {
        setPlayingMessageId(null);
      }, 'female');
    }
  };

  const handleCopy = (msg: MedjugorjeMessage) => {
    const text = `MESSAGE OF OUR LADY, QUEEN OF PEACE (MEDJUGORJE)\nDate: ${msg.displayDate}\nVisionary: ${msg.seerName} (${msg.seerTitle})\n\n"${msg.messageText}"\n\nReflection: ${msg.spiritualReflection}\nScripture Anchor: ${msg.scriptureAnchor.citation} - ${msg.scriptureAnchor.text}\n\nVia Soul Sanctum`;
    navigator.clipboard.writeText(text);
    setCopiedId(msg.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16 animate-fadeIn text-stone-100">
      
      {/* Marian Header Banner */}
      <div className="rounded-xl p-6 sm:p-8 bg-gradient-to-br from-blue-950 via-[#11192b] to-stone-950 border border-blue-500/35 shadow-2xl space-y-3 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-400/30">
              <Star className="w-4 h-4" />
            </span>
            <span className="font-cinzel text-xs font-bold text-amber-300 tracking-wider uppercase">
              Queen of Peace • Kraljica Mira • Medjugorje
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFiveStones(!showFiveStones)}
              className="px-3 py-1 rounded-full bg-blue-500/20 hover:bg-blue-500/35 border border-blue-400/40 text-blue-200 text-xs font-serif transition-colors cursor-pointer"
            >
              5 Spiritual Stones
            </button>
            <button
              onClick={() => setShowVaticanNote(!showVaticanNote)}
              className="px-3 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/35 border border-amber-400/40 text-amber-200 text-xs font-serif transition-colors cursor-pointer"
            >
              Vatican Nihil Obstat
            </button>
          </div>
        </div>

        <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-white tracking-wide">
          Messages of Our Lady to the Seers of Medjugorje
        </h2>
        
        <p className="text-xs sm:text-sm text-stone-300 font-serif-sacred max-w-2xl leading-relaxed">
          "Peace, peace, peace and only peace! Peace must reign between God and man and between men!" Discover the maternal messages of Our Lady, Queen of Peace, given to the visionaries of Medjugorje calling humanity to prayer, conversion, fasting, Holy Scripture, and the Holy Mass.
        </p>
      </div>

      {/* VATICAN DECREE COLLAPSIBLE CARD */}
      {showVaticanNote && (
        <div className="p-5 sm:p-6 rounded-xl bg-amber-950/40 border border-amber-500/40 backdrop-blur-md space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-300" />
              <h3 className="font-cinzel text-sm sm:text-base font-bold text-amber-200">
                {VATICAN_NIHIL_OBSTAT_NOTE.title}
              </h3>
            </div>
            <span className="text-[11px] font-serif text-amber-300/80">
              Sept 19, 2024
            </span>
          </div>
          <p className="text-xs font-serif text-stone-300 leading-relaxed">
            {VATICAN_NIHIL_OBSTAT_NOTE.summary}
          </p>
          <div className="p-3 rounded-xl bg-black/40 border-l-2 border-amber-400 text-xs font-serif italic text-amber-100">
            {VATICAN_NIHIL_OBSTAT_NOTE.keyQuote}
          </div>
        </div>
      )}

      {/* FIVE STONES OF MEDJUGORJE COLLAPSIBLE */}
      {showFiveStones && (
        <div className="p-5 sm:p-6 rounded-xl bg-blue-950/40 border border-blue-500/40 backdrop-blur-md space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-blue-500/20 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-300" />
              <h3 className="font-cinzel text-sm sm:text-base font-bold text-blue-200">
                The Five Stones of Medjugorje (Spiritual Weapons Against Evil)
              </h3>
            </div>
            <span className="text-xs font-serif text-blue-300/80">Like David’s Five Stones</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {FIVE_STONES_OF_MEDJUGORJE.map(stone => (
              <div key={stone.number} className="p-3.5 rounded-xl bg-black/40 border border-blue-500/20 space-y-1.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-cinzel text-[11px] font-bold text-amber-300">
                      Stone #{stone.number}
                    </span>
                  </div>
                  <h4 className="font-serif text-xs font-bold text-white mt-0.5">
                    {stone.name}
                  </h4>
                  <p className="text-[11px] font-serif text-stone-300 mt-1 leading-normal">
                    {stone.description}
                  </p>
                </div>
                <div className="p-2 rounded-xl bg-blue-950/40 border-l-2 border-blue-400 mt-2 text-[10px] font-serif italic text-blue-200">
                  {stone.gospaQuote}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LATEST SPOTLIGHT MESSAGE CARD */}
      <div className="rounded-xl p-6 sm:p-8 bg-stone-900/90 border border-amber-500/35 shadow-xl space-y-4 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
          <div className="space-y-0.5">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold uppercase tracking-wider font-cinzel border border-amber-400/30">
              LATEST MESSAGE • {latestMessage.displayDate}
            </span>
            <h3 className="font-cinzel text-lg sm:text-xl font-bold text-white pt-1">
              {latestMessage.title}
            </h3>
            <p className="text-xs font-serif text-amber-200/80">
              Visionary: {latestMessage.seerName} • {latestMessage.seerTitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleToggleSpeak(latestMessage)}
              className={`p-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                playingMessageId === latestMessage.id
                  ? 'bg-amber-600 text-white animate-pulse'
                  : 'bg-amber-900/60 hover:bg-amber-800 text-amber-100 border border-amber-700/60'
              }`}
              title="Listen to latest Marian message with human voice"
              aria-label="Listen to message"
            >
              {playingMessageId === latestMessage.id ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4 text-amber-200" />
              )}
            </button>

            <button
              onClick={() => handleCopy(latestMessage)}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-amber-200 border border-amber-800/40 transition-colors cursor-pointer"
              title="Copy message to clipboard"
              aria-label="Copy message"
            >
              {copiedId === latestMessage.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Message Text Quote */}
        <div className="p-5 sm:p-6 rounded-xl bg-black/45 border-l-4 border-amber-400 space-y-2">
          <p className="font-serif italic text-white transition-all duration-200" style={messageStyle}>
            "{latestMessage.messageText}"
          </p>
          <p className="text-xs font-serif text-stone-400 pt-1">
            Original Croatian: <span className="italic">{latestMessage.originalCroatianExcerpt}</span>
          </p>
        </div>

        {/* Spiritual Reflection and Scripture */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <div className="flex items-center gap-1.5 text-amber-300 text-xs font-bold font-cinzel">
              <Feather className="w-3.5 h-3.5" />
              <span>Spiritual Reflection</span>
            </div>
            <p className="font-serif text-stone-300 transition-all duration-200" style={reflectionStyle}>
              {latestMessage.spiritualReflection}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
            <div className="flex items-center gap-1.5 text-blue-300 text-xs font-bold font-cinzel">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Biblical Anchor • {latestMessage.scriptureAnchor.citation}</span>
            </div>
            <p className="text-xs font-serif italic text-stone-300 leading-relaxed">
              {latestMessage.scriptureAnchor.text}
            </p>
          </div>
        </div>
      </div>

      {/* FILTER and SEARCH BAR WITH DYNAMIC FONT CONTROLS */}
      <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Medjugorje messages (e.g. peace, fasting, rosary)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/40 border border-white/15 text-stone-200 text-xs placeholder:text-stone-500 focus:outline-hidden focus:border-amber-400"
            />
          </div>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-stone-200 text-xs font-serif focus:outline-hidden"
          >
            <option value="all">All Years (1981 - 2026)</option>
            {availableYears.filter(y => y !== 'all').map(y => (
              <option key={y} value={y}>Year {y}</option>
            ))}
          </select>

          <select
            value={selectedSeer}
            onChange={(e) => setSelectedSeer(e.target.value)}
            className="px-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-stone-200 text-xs font-serif focus:outline-hidden"
          >
            <option value="all">All Visionaries (6 Seers)</option>
            {seers.filter(s => s !== 'all').map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
            className="px-3 py-2 rounded-xl bg-stone-800 border border-stone-700 text-stone-200 text-xs font-serif focus:outline-hidden"
          >
            <option value="all">All Spiritual Themes</option>
            {allThemes.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Text Size Stepper */}
        <div className="flex items-center justify-between border-t border-white/10 pt-2.5 text-xs text-stone-300">
          <span className="font-serif text-stone-400">Message Text Size:</span>
          <div className="flex items-center gap-1 bg-stone-800/90 p-1 rounded-xl border border-stone-700">
            <button
              onClick={decreaseFontSize}
              disabled={fontSize === 'normal'}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold text-stone-300 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-all"
              title="Decrease text size"
            >
              A-
            </button>
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-all cursor-pointer ${
                fontSize === 'normal' 
                  ? 'bg-amber-600 text-white shadow-xs font-bold' 
                  : 'text-stone-300 hover:text-white hover:bg-stone-700'
              }`}
              title="Default text size (100%)"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-all cursor-pointer ${
                fontSize === 'large' 
                  ? 'bg-amber-600 text-white shadow-xs font-bold' 
                  : 'text-stone-300 hover:text-white hover:bg-stone-700'
              }`}
              title="Large text size (125%)"
            >
              A+
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-all cursor-pointer ${
                fontSize === 'xlarge' 
                  ? 'bg-amber-600 text-white shadow-xs font-bold' 
                  : 'text-stone-300 hover:text-white hover:bg-stone-700'
              }`}
              title="Extra large text size (155%)"
            >
              A++
            </button>
            <button
              onClick={increaseFontSize}
              disabled={fontSize === 'xlarge'}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold text-amber-300 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-all"
              title="Increase text size"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* ALL FILTERED MESSAGES ARCHIVE */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <span className="font-cinzel text-xs font-bold text-amber-200 uppercase tracking-wider">
            Marian Message Archive ({filteredMessages.length} Messages)
          </span>
          <span className="text-[11px] font-serif text-stone-400">
            Queen of Peace • Medjugorje
          </span>
        </div>

        {filteredMessages.map((msg) => {
          const isPlaying = playingMessageId === msg.id;
          const isCopied = copiedId === msg.id;

          return (
            <article 
              key={msg.id}
              className="p-5 sm:p-6 rounded-xl bg-stone-900/80 border border-stone-800/80 hover:border-amber-500/30 transition-all space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-cinzel text-amber-300">
                      {msg.displayDate}
                    </span>
                    <span className="text-[10px] font-serif px-2 py-0.5 rounded-full bg-white/5 text-stone-300 border border-white/10">
                      {msg.seerName}
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-white mt-1">
                    {msg.title}
                  </h4>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleSpeak(msg)}
                    className={`p-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isPlaying
                        ? 'bg-amber-600 text-white animate-pulse'
                        : 'bg-white/5 hover:bg-white/10 text-stone-300 border border-white/10'
                    }`}
                    title="Listen with human voice"
                    aria-label="Listen with human voice"
                  >
                    {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-300" />}
                  </button>

                  <button
                    onClick={() => handleCopy(msg)}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-stone-300 border border-white/10 transition-colors cursor-pointer"
                    title="Copy message"
                    aria-label="Copy message"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Message text */}
              <p 
                className="font-serif italic text-amber-50 leading-relaxed bg-black/30 p-3.5 rounded-xl border-l-2 border-amber-400/70 transition-all duration-200"
                style={messageStyle}
              >
                "{msg.messageText}"
              </p>

              {/* Themes */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {msg.themes.map(t => (
                  <span 
                    key={t}
                    onClick={() => setSelectedTheme(t)}
                    className="text-[10px] font-serif px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 cursor-pointer hover:bg-amber-500/20 transition-colors"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              {/* Reflection snippet */}
              <div className="pt-2 font-serif text-stone-300 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-2">
                <p className="italic text-stone-400 transition-all duration-200" style={reflectionStyle}>
                  Reflection: {msg.spiritualReflection}
                </p>
                <span className="text-[11px] font-serif text-amber-300/80 shrink-0">
                  {msg.scriptureAnchor.citation}
                </span>
              </div>
            </article>
          );
        })}
      </div>

    </div>
  );
};
