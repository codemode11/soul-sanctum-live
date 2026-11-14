import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  Copy, 
  Check, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  ShieldCheck, 
  Star,
  Feather
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
    <div className="space-y-6 pb-8 animate-fadeIn text-slate-900">
      
      {/* Marian Header Banner — Slate Gray & Bleached Sand */}
      <div className="rounded-xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 shadow-md space-y-3 relative overflow-hidden text-[#F9F6F0]">
        <div className="pointer-events-none absolute -right-12 -bottom-12 w-60 h-44 bg-[#EAE2D3]/15 rounded-full blur-3xl" />
        
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-slate-800/90 text-[#EAE2D3] border border-slate-600/70">
              <Star className="w-4 h-4" />
            </span>
            <span className="font-cinzel text-xs font-bold text-[#DFD5C3] tracking-wider uppercase">
              Queen of Peace • Kraljica Mira • Medjugorje
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowFiveStones(!showFiveStones)}
              className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold transition-colors cursor-pointer border ${
                showFiveStones
                  ? 'bg-[#F4EFE6] text-slate-900 border-[#DFD5C3]'
                  : 'bg-slate-800/90 hover:bg-slate-700 border-slate-600/70 text-[#EAE2D3]'
              }`}
            >
              5 Spiritual Stones
            </button>
            <button
              onClick={() => setShowVaticanNote(!showVaticanNote)}
              className={`px-3 py-1.5 rounded-lg text-xs font-cinzel font-bold transition-colors cursor-pointer border ${
                showVaticanNote
                  ? 'bg-[#F4EFE6] text-slate-900 border-[#DFD5C3]'
                  : 'bg-slate-800/90 hover:bg-slate-700 border-slate-600/70 text-[#EAE2D3]'
              }`}
            >
              Vatican Nihil Obstat
            </button>
          </div>
        </div>

        <h2 className="relative z-10 font-cinzel text-2xl sm:text-3xl font-bold text-[#FBF9F5] tracking-wide">
          Messages of Our Lady to the Seers of Medjugorje
        </h2>
        
        <p className="relative z-10 text-xs sm:text-sm text-[#EAE2D3] font-serif-sacred max-w-2xl leading-relaxed">
          &ldquo;Peace, peace, peace and only peace! Peace must reign between God and man and between men!&rdquo; Discover the maternal messages of Our Lady, Queen of Peace, given to the visionaries of Medjugorje calling humanity to prayer, conversion, fasting, Holy Scripture, and the Holy Mass.
        </p>
      </div>

      {/* VATICAN DECREE COLLAPSIBLE CARD */}
      {showVaticanNote && (
        <div className="p-5 sm:p-6 rounded-xl bg-[#FBF9F5]/95 border border-[#DFD6C7] shadow-xs space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-[#D8CFC0] pb-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-slate-700" />
              <h3 className="font-cinzel text-sm sm:text-base font-bold text-slate-900">
                {VATICAN_NIHIL_OBSTAT_NOTE.title}
              </h3>
            </div>
            <span className="text-[11px] font-cinzel font-semibold text-slate-600">
              Sept 19, 2024
            </span>
          </div>
          <p className="text-xs sm:text-sm font-serif text-slate-700 leading-relaxed">
            {VATICAN_NIHIL_OBSTAT_NOTE.summary}
          </p>
          <div className="relative p-4 rounded-xl bg-[#EFE9DC]/90 border border-[#D8CFC0] text-xs sm:text-sm font-serif italic text-slate-900">
            <div className="pointer-events-none absolute inset-0 m-0" style={{ margin: 0 }}>
              <span className="pointer-events-none absolute top-0 left-0 w-4 h-4 rounded-tl-xl border-t-[3px] border-l-[3px] border-slate-700 m-0" style={{ margin: 0 }} />
              <span className="pointer-events-none absolute top-0 right-0 w-4 h-4 rounded-tr-xl border-t-[3px] border-r-[3px] border-slate-700 m-0" style={{ margin: 0 }} />
              <span className="pointer-events-none absolute bottom-0 left-0 w-4 h-4 rounded-bl-xl border-b-[3px] border-l-[3px] border-slate-700 m-0" style={{ margin: 0 }} />
              <span className="pointer-events-none absolute bottom-0 right-0 w-4 h-4 rounded-br-xl border-b-[3px] border-r-[3px] border-slate-700 m-0" style={{ margin: 0 }} />
            </div>
            {VATICAN_NIHIL_OBSTAT_NOTE.keyQuote}
          </div>
        </div>
      )}

      {/* FIVE STONES OF MEDJUGORJE COLLAPSIBLE */}
      {showFiveStones && (
        <div className="p-5 sm:p-6 rounded-xl bg-[#FBF9F5]/95 border border-[#DFD6C7] shadow-xs space-y-4 animate-fadeIn">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D8CFC0] pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-slate-700" />
              <h3 className="font-cinzel text-sm sm:text-base font-bold text-slate-900">
                The Five Stones of Medjugorje (Spiritual Weapons Against Evil)
              </h3>
            </div>
            <span className="text-xs font-serif italic text-slate-600">Like David&apos;s Five Stones</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {FIVE_STONES_OF_MEDJUGORJE.map(stone => (
              <div key={stone.number} className="p-3.5 rounded-xl bg-[#F4EFE6] border border-[#D8CFC0] space-y-1.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-cinzel text-[11px] font-bold text-slate-700">
                      Stone #{stone.number}
                    </span>
                  </div>
                  <h4 className="font-serif text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                    {stone.name}
                  </h4>
                  <p className="text-[11px] font-serif text-slate-700 mt-1 leading-normal">
                    {stone.description}
                  </p>
                </div>
                <div className="relative p-2.5 rounded-xl bg-[#EFE9DC] border border-[#C8BBA6] mt-2 text-[10.5px] font-serif italic text-slate-800">
                  <div className="pointer-events-none absolute inset-0 m-0" style={{ margin: 0 }}>
                    <span className="pointer-events-none absolute top-0 left-0 w-3.5 h-3.5 rounded-tl-xl border-t-[2.5px] border-l-[2.5px] border-slate-700 m-0" style={{ margin: 0 }} />
                    <span className="pointer-events-none absolute top-0 right-0 w-3.5 h-3.5 rounded-tr-xl border-t-[2.5px] border-r-[2.5px] border-slate-700 m-0" style={{ margin: 0 }} />
                    <span className="pointer-events-none absolute bottom-0 left-0 w-3.5 h-3.5 rounded-bl-xl border-b-[2.5px] border-l-[2.5px] border-slate-700 m-0" style={{ margin: 0 }} />
                    <span className="pointer-events-none absolute bottom-0 right-0 w-3.5 h-3.5 rounded-br-xl border-b-[2.5px] border-r-[2.5px] border-slate-700 m-0" style={{ margin: 0 }} />
                  </div>
                  {stone.gospaQuote}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LATEST SPOTLIGHT MESSAGE CARD */}
      <div className="rounded-xl p-6 sm:p-8 bg-gradient-to-br from-[#FBF9F5] via-[#F6F2EA] to-[#ECE5D5] border border-[#D8CFC0] shadow-[0_3px_14px_rgba(51,65,85,0.06)] space-y-4 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#D8CFC0] pb-4">
          <div className="space-y-0.5 min-w-0 flex-1">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-800 text-[#F9F6F0] text-[10px] font-bold uppercase tracking-wider font-cinzel border border-slate-900">
              LATEST MESSAGE • {latestMessage.displayDate}
            </span>
            <h3 className="font-cinzel text-lg sm:text-xl font-bold text-slate-900 pt-1">
              {latestMessage.title}
            </h3>
            <p className="text-xs font-serif text-slate-600">
              Visionary: {latestMessage.seerName} • {latestMessage.seerTitle}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleToggleSpeak(latestMessage)}
              className={`p-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                playingMessageId === latestMessage.id
                  ? 'bg-slate-800 text-[#F9F6F0] border border-slate-900 animate-pulse'
                  : 'bg-[#F4EFE6] hover:bg-[#EAE2D3] text-slate-800 border border-[#C8BBA6]'
              }`}
              title="Listen to latest Marian message with human voice"
              aria-label="Listen to message"
            >
              {playingMessageId === latestMessage.id ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4 text-slate-700" />
              )}
            </button>

            <button
              onClick={() => handleCopy(latestMessage)}
              className="p-2 rounded-lg bg-[#F4EFE6] hover:bg-[#EAE2D3] text-slate-800 border border-[#C8BBA6] transition-colors cursor-pointer"
              title="Copy message to clipboard"
              aria-label="Copy message"
            >
              {copiedId === latestMessage.id ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Message Text Quote */}
        <div className="relative p-5 sm:p-6 rounded-xl bg-[#EFE9DC]/90 border border-[#D8CFC0]">
          <div className="pointer-events-none absolute inset-0 m-0" style={{ margin: 0 }}>
            <span className="pointer-events-none absolute top-0 left-0 w-4 h-4 rounded-tl-xl border-t-[3px] border-l-[3px] border-slate-700 m-0" style={{ margin: 0 }} />
            <span className="pointer-events-none absolute top-0 right-0 w-4 h-4 rounded-tr-xl border-t-[3px] border-r-[3px] border-slate-700 m-0" style={{ margin: 0 }} />
            <span className="pointer-events-none absolute bottom-0 left-0 w-4 h-4 rounded-bl-xl border-b-[3px] border-l-[3px] border-slate-700 m-0" style={{ margin: 0 }} />
            <span className="pointer-events-none absolute bottom-0 right-0 w-4 h-4 rounded-br-xl border-b-[3px] border-r-[3px] border-slate-700 m-0" style={{ margin: 0 }} />
          </div>
          <div className="space-y-2">
            <p className="font-serif italic text-slate-900 transition-all duration-200" style={messageStyle}>
              &ldquo;{latestMessage.messageText}&rdquo;
            </p>
            <p className="text-xs font-serif text-slate-600 pt-1">
              Original Croatian: <span className="italic">{latestMessage.originalCroatianExcerpt}</span>
            </p>
          </div>
        </div>

        {/* Spiritual Reflection and Scripture */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-[#FBF9F5] border border-[#D8CFC0] space-y-1">
            <div className="flex items-center gap-1.5 text-slate-800 text-xs font-bold font-cinzel">
              <Feather className="w-3.5 h-3.5 text-slate-700" />
              <span>Spiritual Reflection</span>
            </div>
            <p className="font-serif text-slate-700 transition-all duration-200" style={reflectionStyle}>
              {latestMessage.spiritualReflection}
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#FBF9F5] border border-[#D8CFC0] space-y-1">
            <div className="flex items-center gap-1.5 text-slate-800 text-xs font-bold font-cinzel">
              <BookOpen className="w-3.5 h-3.5 text-slate-700" />
              <span>Biblical Anchor • {latestMessage.scriptureAnchor.citation}</span>
            </div>
            <p className="text-xs font-serif italic text-slate-700 leading-relaxed">
              {latestMessage.scriptureAnchor.text}
            </p>
          </div>
        </div>
      </div>

      {/* FILTER and SEARCH BAR WITH DYNAMIC FONT CONTROLS */}
      <div className="p-4 sm:p-5 rounded-xl bg-[#F4EFE6]/90 border border-[#D8CFC0] shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1 min-w-0">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search Medjugorje messages (e.g. peace, fasting, rosary)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#FBF9F5] border border-[#C8BBA6] text-slate-900 text-xs placeholder:text-slate-500 focus:outline-hidden focus:border-slate-700"
            />
          </div>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#FBF9F5] border border-[#C8BBA6] text-slate-900 text-xs font-serif focus:outline-hidden focus:border-slate-700 cursor-pointer"
          >
            <option value="all">All Years (1981 - 2026)</option>
            {availableYears.filter(y => y !== 'all').map(y => (
              <option key={y} value={y}>Year {y}</option>
            ))}
          </select>

          <select
            value={selectedSeer}
            onChange={(e) => setSelectedSeer(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#FBF9F5] border border-[#C8BBA6] text-slate-900 text-xs font-serif focus:outline-hidden focus:border-slate-700 cursor-pointer"
          >
            <option value="all">All Visionaries (6 Seers)</option>
            {seers.filter(s => s !== 'all').map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>

          <select
            value={selectedTheme}
            onChange={(e) => setSelectedTheme(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#FBF9F5] border border-[#C8BBA6] text-slate-900 text-xs font-serif focus:outline-hidden focus:border-slate-700 cursor-pointer"
          >
            <option value="all">All Spiritual Themes</option>
            {allThemes.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Text Size Stepper */}
        <div className="flex items-center justify-between border-t border-[#D8CFC0] pt-2.5 text-xs text-slate-700">
          <span className="font-cinzel font-bold uppercase tracking-wider text-[11px] text-slate-700">Message Text Size:</span>
          <div className="flex items-center gap-1 bg-[#EAE2D3] p-1 rounded-xl border border-[#C8BBA6]">
            <button
              onClick={decreaseFontSize}
              disabled={fontSize === 'normal'}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold text-slate-700 hover:text-slate-900 hover:bg-[#FBF9F5] disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-all"
              title="Decrease text size"
            >
              A-
            </button>
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-all cursor-pointer ${
                fontSize === 'normal' 
                  ? 'bg-slate-800 text-[#F9F6F0] shadow-xs font-bold' 
                  : 'text-slate-700 hover:text-slate-900 hover:bg-[#FBF9F5]'
              }`}
              title="Default text size (100%)"
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-all cursor-pointer ${
                fontSize === 'large' 
                  ? 'bg-slate-800 text-[#F9F6F0] shadow-xs font-bold' 
                  : 'text-slate-700 hover:text-slate-900 hover:bg-[#FBF9F5]'
              }`}
              title="Large text size (125%)"
            >
              A+
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={`px-2.5 py-1 text-xs rounded-lg font-semibold transition-all cursor-pointer ${
                fontSize === 'xlarge' 
                  ? 'bg-slate-800 text-[#F9F6F0] shadow-xs font-bold' 
                  : 'text-slate-700 hover:text-slate-900 hover:bg-[#FBF9F5]'
              }`}
              title="Extra large text size (155%)"
            >
              A++
            </button>
            <button
              onClick={increaseFontSize}
              disabled={fontSize === 'xlarge'}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-xs font-bold text-slate-800 hover:text-slate-950 hover:bg-[#FBF9F5] disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-all"
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
          <span className="font-cinzel text-xs font-bold text-slate-800 uppercase tracking-wider">
            Marian Message Archive ({filteredMessages.length} Messages)
          </span>
          <span className="text-[11px] font-serif text-slate-600">
            Queen of Peace • Medjugorje
          </span>
        </div>

        {filteredMessages.map((msg) => {
          const isPlaying = playingMessageId === msg.id;
          const isCopied = copiedId === msg.id;

          return (
            <article 
              key={msg.id}
              className="p-5 sm:p-6 rounded-xl bg-gradient-to-br from-[#FBF9F5] via-[#F6F2EA] to-[#ECE5D5] border border-[#D8CFC0] hover:border-slate-500 transition-all shadow-[0_3px_14px_rgba(51,65,85,0.06)] space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#D8CFC0] pb-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold font-cinzel text-slate-800">
                      {msg.displayDate}
                    </span>
                    <span className="text-[10px] font-serif px-2 py-0.5 rounded-full bg-[#EAE2D3] text-slate-800 border border-[#C8BBA6]">
                      {msg.seerName}
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-slate-900 mt-1">
                    {msg.title}
                  </h4>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleToggleSpeak(msg)}
                    className={`p-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      isPlaying
                        ? 'bg-slate-800 text-[#F9F6F0] border border-slate-900 animate-pulse'
                        : 'bg-[#F4EFE6] hover:bg-[#EAE2D3] text-slate-800 border border-[#C8BBA6]'
                    }`}
                    title="Listen with human voice"
                    aria-label="Listen with human voice"
                  >
                    {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-slate-700" />}
                  </button>

                  <button
                    onClick={() => handleCopy(msg)}
                    className="p-2 rounded-lg bg-[#F4EFE6] hover:bg-[#EAE2D3] text-slate-800 border border-[#C8BBA6] transition-colors cursor-pointer"
                    title="Copy message"
                    aria-label="Copy message"
                  >
                    {isCopied ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Message text */}
              <div 
                className="relative font-serif italic text-slate-900 leading-relaxed bg-[#EFE9DC]/85 border border-[#D8CFC0] p-3.5 rounded-xl transition-all duration-200"
                style={messageStyle}
              >
                <div className="pointer-events-none absolute inset-0 m-0" style={{ margin: 0 }}>
                  <span className="pointer-events-none absolute top-0 left-0 w-4 h-4 rounded-tl-xl border-t-[3px] border-l-[3px] border-slate-700/80 m-0" style={{ margin: 0 }} />
                  <span className="pointer-events-none absolute top-0 right-0 w-4 h-4 rounded-tr-xl border-t-[3px] border-r-[3px] border-slate-700/80 m-0" style={{ margin: 0 }} />
                  <span className="pointer-events-none absolute bottom-0 left-0 w-4 h-4 rounded-bl-xl border-b-[3px] border-l-[3px] border-slate-700/80 m-0" style={{ margin: 0 }} />
                  <span className="pointer-events-none absolute bottom-0 right-0 w-4 h-4 rounded-br-xl border-b-[3px] border-r-[3px] border-slate-700/80 m-0" style={{ margin: 0 }} />
                </div>
                &ldquo;{msg.messageText}&rdquo;
              </div>

              {/* Themes */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {msg.themes.map(t => (
                  <span 
                    key={t}
                    onClick={() => setSelectedTheme(t)}
                    className="text-[10px] font-serif px-2 py-0.5 rounded-md bg-[#F4EFE6] text-slate-700 border border-[#D8CFC0] cursor-pointer hover:bg-[#EAE2D3] transition-colors"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              {/* Reflection snippet */}
              <div className="pt-2 font-serif text-slate-700 border-t border-[#D8CFC0] flex flex-col sm:flex-row justify-between gap-2">
                <p className="italic text-slate-700 transition-all duration-200" style={reflectionStyle}>
                  Reflection: {msg.spiritualReflection}
                </p>
                <span className="text-[11px] font-cinzel font-semibold text-slate-700 shrink-0">
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
