import React, { useState } from 'react';
import { 
  BookOpen, 
  Scroll, 
  Check, 
  Copy, 
  Volume2, 
  VolumeX, 
  Search, 
  Compass, 
  Headphones,
  Play,
  Pause
} from 'lucide-react';
import { BibleCommentary, MassReading } from '../types';
import { getDailyGospelCommentaries } from '../data/commentary';
import { 
  SacredReader, 
  parseCommentaryBySaints, 
  CommentarySaintSection 
} from '../utils/speech';

export interface CommentaryViewProps {
  currentGospelCitation?: string;
  currentReading?: MassReading;
}

export const CommentaryView: React.FC<CommentaryViewProps> = ({
  currentGospelCitation,
  currentReading
}) => {
  const dailyCommentaries = React.useMemo(
    () => getDailyGospelCommentaries(currentReading, currentGospelCitation),
    [currentReading, currentGospelCitation]
  );

  const [selectedCommentary, setSelectedCommentary] = useState<BibleCommentary>(dailyCommentaries[0]);
  const [copied, setCopied] = useState(false);
  const [isReadingAloud, setIsReadingAloud] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [activeSpeakingSection, setActiveSpeakingSection] = useState<CommentarySaintSection | null>(null);
  const [speakingSectionIndex, setSpeakingSectionIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [recitationVoice, setRecitationVoice] = useState<'ava-grace' | 'david'>(() => SacredReader.getRecitationVoice());

  const handleVoiceSelect = (v: 'ava-grace' | 'david') => {
    setRecitationVoice(v);
    SacredReader.setRecitationVoice(v);
    if (isReadingAloud) {
      SacredReader.stop();
      setIsReadingAloud(false);
      setActiveSpeakingSection(null);
      setIsPaused(false);
    }
  };

  React.useEffect(() => {
    setSelectedCommentary(dailyCommentaries[0]);
    if (isReadingAloud) {
      SacredReader.stop();
      setIsReadingAloud(false);
      setActiveSpeakingSection(null);
    }
  }, [dailyCommentaries]);

  // Clean up speech on unmount
  React.useEffect(() => {
    return () => {
      SacredReader.stop();
    };
  }, []);

  const parsedSections = React.useMemo(
    () => parseCommentaryBySaints(selectedCommentary),
    [selectedCommentary]
  );

  // Filter only actual saint sections for the commentary body display
  const saintExpositionSections = React.useMemo(
    () => parsedSections.filter(s => s.id !== 'intro' && s.id !== 'practical-application'),
    [parsedSections]
  );

  // Functional dynamic font size scaling
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

  const scriptureStyle = {
    fontSize: fontSize === 'normal' ? '1.15rem' : fontSize === 'large' ? '1.4rem' : '1.7rem',
    lineHeight: '1.6'
  };

  const commentaryStyle = {
    fontSize: fontSize === 'normal' ? '1.1rem' : fontSize === 'large' ? '1.35rem' : '1.65rem',
    lineHeight: '1.7'
  };

  const applicationStyle = {
    fontSize: fontSize === 'normal' ? '1.05rem' : fontSize === 'large' ? '1.3rem' : '1.55rem',
    lineHeight: '1.65'
  };

  const handleCopy = () => {
    const text = `CATHOLIC BIBLE COMMENTARY
Passage: ${selectedCommentary.scriptureReference}
Source: ${selectedCommentary.sourceName} (${selectedCommentary.author}) — ${selectedCommentary.sourceEra}

SCRIPTURE:
${selectedCommentary.scriptureText}

COMMENTARY:
${selectedCommentary.commentaryText}

APPLICATION:
${selectedCommentary.practicalApplication}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Toggle complete commentary recitation with different male voices per Saint
  const handleToggleSpeak = () => {
    if (isReadingAloud) {
      SacredReader.stop();
      setIsReadingAloud(false);
      setActiveSpeakingSection(null);
      setIsPaused(false);
    } else {
      setIsReadingAloud(true);
      setIsPaused(false);
      SacredReader.speakCommentaryBySaints(
        selectedCommentary,
        (section, idx) => {
          setActiveSpeakingSection(section);
          setSpeakingSectionIndex(idx);
        },
        () => {
          setIsReadingAloud(false);
          setActiveSpeakingSection(null);
          setIsPaused(false);
        },
        recitationVoice
      );
    }
  };

  // Play a single saint's exposition in their specific voice
  const handleSpeakSingleSaint = (section: CommentarySaintSection) => {
    if (isReadingAloud && activeSpeakingSection?.id === section.id) {
      SacredReader.stop();
      setIsReadingAloud(false);
      setActiveSpeakingSection(null);
      setIsPaused(false);
    } else {
      setIsReadingAloud(true);
      setIsPaused(false);
      setActiveSpeakingSection(section);
      SacredReader.speakSingleSaintExposition(
        section.persona.id || section.saintName,
        section.text,
        () => {
          setIsReadingAloud(false);
          setActiveSpeakingSection(null);
          setIsPaused(false);
        }
      );
    }
  };

  const handleTogglePause = () => {
    if (isPaused) {
      SacredReader.resume();
      setIsPaused(false);
    } else {
      SacredReader.pause();
      setIsPaused(true);
    }
  };

  const filteredCommentaries = dailyCommentaries.filter(c => 
    c.scriptureReference.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.sourceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.commentaryText.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-3.5 pb-10">
      
      {/* Compact Banner (Cut in half) */}
      <div className="bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 rounded-xl px-4 py-3 text-amber-50 shadow-sm border border-amber-900/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            <Scroll className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <h2 className="font-cinzel text-lg sm:text-xl font-bold text-white tracking-wide leading-tight">
                Catholic Bible Commentary
              </h2>
              <p className="text-[11px] text-amber-300/80 font-cinzel uppercase tracking-wider">
                Catena Aurea and Patristic Exegesis
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 shrink-0">
            {/* Font Size Stepper */}
            <div className="flex items-center gap-0.5 bg-black/40 p-0.5 rounded-md border border-white/20">
              <button
                onClick={decreaseFontSize}
                disabled={fontSize === 'normal'}
                className="w-6 h-6 flex items-center justify-center rounded text-[11px] font-bold text-amber-200 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-all"
                title="Decrease font size"
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('normal')}
                className={`px-1.5 py-0.5 text-[11px] rounded font-semibold transition-all cursor-pointer ${
                  fontSize === 'normal' 
                    ? 'bg-[#6B4423] text-white shadow-xs font-bold' 
                    : 'text-amber-200 hover:text-white hover:bg-white/10'
                }`}
                title="Default text size (100%)"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-1.5 py-0.5 text-[11px] rounded font-semibold transition-all cursor-pointer ${
                  fontSize === 'large' 
                    ? 'bg-[#6B4423] text-white shadow-xs font-bold' 
                    : 'text-amber-200 hover:text-white hover:bg-white/10'
                }`}
                title="Large text size (125%)"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-1.5 py-0.5 text-[11px] rounded font-semibold transition-all cursor-pointer ${
                  fontSize === 'xlarge' 
                    ? 'bg-[#6B4423] text-white shadow-xs font-bold' 
                    : 'text-amber-200 hover:text-white hover:bg-white/10'
                }`}
                title="Extra large text size (155%)"
              >
                A++
              </button>
              <button
                onClick={increaseFontSize}
                disabled={fontSize === 'xlarge'}
                className="w-6 h-6 flex items-center justify-center rounded text-[11px] font-bold text-amber-300 hover:text-white hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer transition-all"
                title="Increase font size"
              >
                +
              </button>
            </div>

            {/* Complete Commentary Audio Toggle */}
            <button
              onClick={handleToggleSpeak}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer shadow-xs ${
                isReadingAloud
                  ? 'bg-[#6B4423] text-white animate-pulse'
                  : 'bg-[#5A381C] hover:bg-[#6B4423] text-amber-100 border border-[#8B5A2B]/70'
              }`}
              title={`Listen to Commentary in ${recitationVoice === 'ava-grace' ? 'Ava Grace' : 'Microsoft David'}`}
              aria-label="Listen to Commentary"
            >
              {isReadingAloud ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-300" />}
              <span>{isReadingAloud ? 'Stop' : 'Listen All'}</span>
            </button>

            {/* Recitation Voice Option: Ava Grace (Prioritized) vs David */}
            <div className="flex items-center bg-black/40 border border-stone-700/80 rounded-md p-0.5 text-xs">
              <button
                type="button"
                onClick={() => handleVoiceSelect('ava-grace')}
                className={`px-2 py-1 rounded text-xs font-serif font-medium transition-all cursor-pointer ${
                  recitationVoice === 'ava-grace'
                    ? 'bg-[#6B4423] text-white font-bold shadow-xs'
                    : 'text-stone-300 hover:text-amber-200'
                }`}
                title="Ava Grace (Prioritized Devotional Voice)"
              >
                Ava Grace
              </button>
              <button
                type="button"
                onClick={() => handleVoiceSelect('david')}
                className={`px-2 py-1 rounded text-xs font-serif font-medium transition-all cursor-pointer ${
                  recitationVoice === 'david'
                    ? 'bg-[#6B4423] text-white font-bold shadow-xs'
                    : 'text-stone-300 hover:text-amber-200'
                }`}
                title="Microsoft David (Traditional Solemn Male Voice)"
              >
                David
              </button>
            </div>

            <button
              onClick={handleCopy}
              className="p-1.5 rounded-md bg-stone-800 text-amber-200 border border-stone-700 hover:bg-stone-700 transition-colors cursor-pointer"
              title="Copy commentary"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Live Audio Status Bar when listening */}
      {isReadingAloud && activeSpeakingSection && (
        <div className="bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 rounded-xl px-4 py-2.5 border border-amber-600/50 shadow-md text-amber-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-md bg-amber-600/30 border border-amber-500/40 flex items-center justify-center shrink-0">
              <Headphones className="w-4 h-4 text-amber-300 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400 font-cinzel">
                  Section {speakingSectionIndex + 1} of {parsedSections.length}
                </span>
              </div>
              <p className="font-serif font-bold text-sm text-white">
                {activeSpeakingSection.saintName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              onClick={handleTogglePause}
              className="px-2.5 py-1 rounded-md bg-amber-900/60 hover:bg-amber-900 border border-amber-700/60 text-xs font-semibold text-amber-100 flex items-center gap-1 transition-colors cursor-pointer"
            >
              {isPaused ? <Play className="w-3 h-3 text-amber-300" /> : <Pause className="w-3 h-3 text-amber-300" />}
              <span>{isPaused ? 'Resume' : 'Pause'}</span>
            </button>
            <button
              onClick={handleToggleSpeak}
              className="px-2.5 py-1 rounded-md bg-red-950/80 hover:bg-red-900 border border-red-800/60 text-xs font-semibold text-red-200 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <VolumeX className="w-3 h-3 text-red-300" />
              <span>Stop</span>
            </button>
          </div>
        </div>
      )}

      {/* Compact Passage Selector Bar */}
      <div className="bg-white rounded-xl px-3.5 py-2.5 shadow-2xs border border-stone-200 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="font-cinzel text-[11px] font-bold uppercase tracking-wider text-stone-500">
            Scriptural Passages
          </span>
          <div className="relative">
            <input
              type="text"
              placeholder="Filter passages or authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-xs pl-7 pr-2.5 py-1 rounded-md bg-stone-100 border border-stone-300 focus:outline-none focus:border-amber-700 w-full sm:w-52"
            />
            <Search className="w-3 h-3 text-stone-400 absolute left-2.5 top-2" />
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {filteredCommentaries.map(comm => {
            const isSelected = comm.id === selectedCommentary.id;
            return (
              <button
                key={comm.id}
                onClick={() => setSelectedCommentary(comm)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-amber-900 text-amber-50 shadow-2xs font-bold'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                }`}
              >
                {comm.scriptureReference} — {comm.sourceName.split('(')[0]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Commentary Display Card (Compact, Cut in Half) */}
      <article className="bg-white rounded-xl p-4 sm:p-5 shadow-xs border border-stone-200 space-y-3.5">
        
        {/* Header and Source Details */}
        <div className="border-b border-stone-200 pb-2.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
          <div>
            <h3 className="font-cinzel text-lg sm:text-xl font-bold text-stone-900">
              {selectedCommentary.sourceName}
            </h3>
            <p className="text-xs font-semibold text-amber-900 font-cinzel">
              Regarding: {selectedCommentary.scriptureReference} • <span className="text-stone-500 font-serif italic font-normal">{selectedCommentary.author}</span>
            </p>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold font-cinzel self-start sm:self-auto shrink-0">
            {selectedCommentary.sourceEra}
          </span>
        </div>

        {/* The Scripture Text */}
        <div className="p-3 rounded-md bg-[#FAF8F5] border-l-3 border-amber-800 space-y-0.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-900 font-cinzel">
            Sacred Scripture ({selectedCommentary.scriptureReference})
          </span>
          <p 
            className="font-serif-sacred text-stone-900 italic transition-all duration-200"
            style={scriptureStyle}
          >
            {selectedCommentary.scriptureText}
          </p>
        </div>

        {/* Patristic Commentary Sections */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between border-b border-stone-100 pb-1.5">
            <div className="flex items-center gap-1.5 text-stone-900 font-cinzel font-bold text-xs uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-amber-800" />
              <span>Patristic Exposition and Church Fathers</span>
            </div>
          </div>

          {/* If structured into separate Saint sections */}
          {saintExpositionSections.length > 0 ? (
            <div className="space-y-3">
              {saintExpositionSections.map((sec, idx) => {
                const isThisSpeaking = isReadingAloud && activeSpeakingSection?.id === sec.id;

                return (
                  <div
                    key={sec.id || idx}
                    className={`rounded-md p-3.5 border transition-all duration-300 ${
                      isThisSpeaking
                        ? 'bg-[#FAF4EE] border-[#8B5A2B] shadow-xs ring-1 ring-[#8B5A2B]/40'
                        : 'bg-stone-50/50 hover:bg-stone-50 border-stone-200'
                    }`}
                  >
                    {/* Saint Header */}
                    <div className="flex items-center justify-between gap-2 pb-1.5 mb-2 border-b border-stone-200/60">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="font-cinzel font-bold text-amber-950 text-xs sm:text-sm tracking-wide">
                          {sec.saintName}
                        </span>
                        <span className="text-[11px] text-stone-500 font-serif italic">
                          {sec.persona.title}
                        </span>
                      </div>

                      <button
                        onClick={() => handleSpeakSingleSaint(sec)}
                        className={`p-1.5 rounded-md transition-all cursor-pointer shrink-0 ${
                          isThisSpeaking
                            ? 'bg-[#6B4423] text-white shadow-xs'
                            : 'bg-white hover:bg-[#FAF4EE] text-[#5A381C] border border-stone-200 hover:border-[#8B5A2B]'
                        }`}
                        title={isThisSpeaking ? `Stop listening to ${sec.saintName}` : `Listen to ${sec.saintName}`}
                        aria-label={isThisSpeaking ? `Stop listening to ${sec.saintName}` : `Listen to ${sec.saintName}`}
                      >
                        {isThisSpeaking ? (
                          <VolumeX className="w-3.5 h-3.5 text-white" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5 text-[#6B4423]" />
                        )}
                      </button>
                    </div>

                    {/* Exegesis Text */}
                    <div 
                      className="font-serif-sacred text-stone-900 leading-relaxed transition-all duration-200"
                      style={commentaryStyle}
                    >
                      {sec.bodyOnly}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Fallback single text block */
            <div 
              className="font-serif-sacred text-stone-900 leading-snug whitespace-pre-line pl-2 transition-all duration-200"
              style={commentaryStyle}
            >
              {selectedCommentary.commentaryText}
            </div>
          )}
        </div>

        {/* Practical Spiritual Application */}
        <div className="rounded-md p-3 bg-amber-50/70 border border-amber-200 space-y-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-amber-950 font-cinzel font-bold text-[11px] uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-amber-800" />
              <span>Spiritual Fruit and Practical Living</span>
            </div>
          </div>
          <p 
            className="font-serif-sacred text-stone-800 italic transition-all duration-200"
            style={applicationStyle}
          >
            "{selectedCommentary.practicalApplication}"
          </p>
        </div>

      </article>

    </div>
  );
};
