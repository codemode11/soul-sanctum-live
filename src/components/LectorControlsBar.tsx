import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Pause, Play, Square, Settings2, Mic, User, Gauge, Sparkles, Scroll, ChevronDown, Key, CheckCircle2 } from 'lucide-react';
import { SacredReader, SACRED_MALE_SAINT_PERSONAS, SACRED_FEMALE_PERSONAS, SACRED_MALE_LITURGICAL_PERSONAS } from '../utils/speech';

interface LectorControlsBarProps {
  onPlay?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  onStop?: () => void;
  isSpeaking?: boolean;
  isPaused?: boolean;
  currentPartId?: string | null;
  className?: string;
  title?: string;
}

export const LectorControlsBar: React.FC<LectorControlsBarProps> = ({
  onPlay,
  onPause,
  onResume,
  onStop,
  isSpeaking = false,
  isPaused = false,
  currentPartId,
  className = '',
  title = 'Sacred Lector Audio Proclamation'
}) => {
  const [systemVoices, setSystemVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>(() => {
    if (typeof localStorage !== 'undefined') {
      const saved = localStorage.getItem('soul_sanctum_active_voice');
      if (
        saved &&
        !saved.toLowerCase().includes('zira') &&
        !saved.toLowerCase().includes('mark') &&
        !saved.toLowerCase().includes('kokoro') &&
        saved !== 'zira'
      ) {
        return saved;
      }
      localStorage.setItem('soul_sanctum_active_voice', 'gemini-Kore');
    }
    return 'gemini-Kore';
  });
  const [selectedVoiceLabel, setSelectedVoiceLabel] = useState<string>('Kore — Serene Devotional Soprano (Default Female)');
  const [currentRate, setCurrentRate] = useState<number>(() => SacredReader.getPlaybackRate());
  const [showSettings, setShowSettings] = useState(false);
  const [activePlayingVoice, setActivePlayingVoice] = useState<string | null>(null);
  const [isTtsLoading, setIsTtsLoading] = useState<string | null>(null);

  useEffect(() => {
    // Sync SacredReader active lector voice on mount so Kore is guaranteed as the default female voice
    SacredReader.setActiveLectorVoiceKey(selectedVoiceId || 'gemini-Kore');

    const updateVoices = () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const voices = window.speechSynthesis
          .getVoices()
          .filter(v => !v.name.toLowerCase().includes('mark'));
        setSystemVoices(voices);
      }
    };

    updateVoices();
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  const playVoiceSample = async (voiceKey: string, customText?: string) => {
    // 1. Stop active speech synthesis or audio and synchronously unlock HTMLAudioElement
    SacredReader.stop();
    const unlockedAudio = SacredReader.unlockSharedAudio();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    setIsTtsLoading(voiceKey);
    setActivePlayingVoice(null);

    // Get appropriate sample text for previewing the voice
    let sampleText = customText;
    if (!sampleText) {
      if (voiceKey === 'david') {
        sampleText = `Laudetur Jesus Christus! A reading from the Holy Gospel, proclaimed with Microsoft David.`;
      } else if (voiceKey.startsWith('gemini-')) {
        const gName = voiceKey.replace('gemini-', '');
        sampleText = `Laudetur Jesus Christus! Proclaiming sacred Scripture with the ${gName} voice.`;
      } else if (voiceKey.startsWith('saint-') || SACRED_MALE_SAINT_PERSONAS.some(s => s.id === voiceKey)) {
        const saint = SACRED_MALE_SAINT_PERSONAS.find(s => s.id === voiceKey);
        sampleText = saint ? `${saint.saintName}: "${saint.sampleQuote}"` : 'Laudetur Jesus Christus!';
      } else if (voiceKey.startsWith('persona-')) {
        const persona = SACRED_FEMALE_PERSONAS.find(p => p.id === voiceKey);
        sampleText = persona ? `${persona.name.split('—')[0].trim()}. Proclaiming the holy word in quiet contemplation.` : 'Laudetur Jesus Christus!';
      } else if (voiceKey.startsWith('liturgical-')) {
        const lector = SACRED_MALE_LITURGICAL_PERSONAS.find(l => l.id === voiceKey);
        sampleText = lector ? `${lector.name.split('—')[0].trim()}. A reading from the Holy Gospel.` : 'Laudetur Jesus Christus!';
      } else {
        sampleText = `Laudetur Jesus Christus! Proclaiming sacred Scripture.`;
      }
    }

    // Check if the user explicitly selected Microsoft David or an installed browser/OS voice
    const isInstalledLocalVoice =
      voiceKey === 'david' ||
      (!voiceKey.startsWith('gemini-') &&
        !voiceKey.startsWith('persona-') &&
        !voiceKey.startsWith('liturgical-') &&
        !voiceKey.startsWith('saint-') &&
        !SACRED_MALE_SAINT_PERSONAS.some(s => s.id === voiceKey) &&
        typeof window !== 'undefined' &&
        'speechSynthesis' in window &&
        window.speechSynthesis.getVoices().some(v => v.name === voiceKey));

    let playedServerAudio = false;
    if (!isInstalledLocalVoice) {
      try {
        const res = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: sampleText,
            voiceName: voiceKey,
          }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.audioUrl) {
            const audio = unlockedAudio || new Audio();
            audio.volume = 1.0;
            audio.src = data.audioUrl;
            audio.playbackRate = currentRate;
            audio.onplay = () => {
              setActivePlayingVoice(voiceKey);
              setIsTtsLoading(null);
            };
            audio.onended = () => setActivePlayingVoice(null);
            audio.onerror = () => {
              setActivePlayingVoice(null);
              setIsTtsLoading(null);
            };
            await audio.play();
            playedServerAudio = true;
          }
        }
      } catch {
        // Fall back to Web Speech API only if server audio fails
      }
    }

    if (!playedServerAudio) {
      setIsTtsLoading(null);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(sampleText);
        const voiceConfig = SacredReader.getVoiceConfigForActiveKey(
          voiceKey,
          voiceKey === 'david' ? 'male' : 'female'
        );
        if (voiceConfig.voice) utterance.voice = voiceConfig.voice;
        utterance.pitch = voiceConfig.pitch;
        utterance.rate = voiceConfig.rate;

        utterance.onstart = () => setActivePlayingVoice(voiceKey);
        utterance.onend = () => setActivePlayingVoice(null);
        utterance.onerror = () => setActivePlayingVoice(null);

        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const handleSelectVoiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedVoiceId(val);
    SacredReader.setActiveLectorVoiceKey(val);

    const geminiMap: Record<string, string> = {
      'gemini-Kore': 'Kore — Serene Devotional Soprano (Default Female)',
      'david': 'Microsoft David — Traditional Solemn Lector (Default Male)',
      'gemini-Puck': 'Puck (Lively Young Tenor)',
      'gemini-Charon': 'Charon (Deep Monastic Bass)',
      'gemini-Fenrir': 'Fenrir (Resonant Benedictine Baritone)',
      'gemini-Zephyr': 'Zephyr (Smooth UK Liturgical Reader)'
    };

    if (val === 'david') {
      setSelectedVoiceLabel('Microsoft David — Traditional Solemn Lector (Default Male)');
      SacredReader.setRecitationVoice('david');
    } else if (geminiMap[val]) {
      setSelectedVoiceLabel(geminiMap[val]);
      SacredReader.setRecitationVoice('ava-grace');
    } else if (val.startsWith('saint-') || SACRED_MALE_SAINT_PERSONAS.some(p => p.id === val)) {
      const s = SACRED_MALE_SAINT_PERSONAS.find(p => p.id === val);
      if (s) setSelectedVoiceLabel(`${s.saintName} (${s.title})`);
      SacredReader.setRecitationVoice('david');
    } else if (val.startsWith('persona-')) {
      const p = SACRED_FEMALE_PERSONAS.find(f => f.id === val);
      if (p) setSelectedVoiceLabel(p.name);
      SacredReader.setRecitationVoice('ava-grace');
      SacredReader.setSelectedFemaleVoiceName(val);
    } else if (val.startsWith('liturgical-')) {
      const l = SACRED_MALE_LITURGICAL_PERSONAS.find(m => m.id === val);
      if (l) setSelectedVoiceLabel(l.name);
      SacredReader.setRecitationVoice('david');
    } else {
      setSelectedVoiceLabel(val);
    }

    playVoiceSample(val);
  };

  const handleRateChange = (rate: number) => {
    setCurrentRate(rate);
    SacredReader.setPlaybackRate(rate);
  };

  return (
    <div className={`bg-[#1C120C]/95 border border-[#8B5A2B]/60 rounded-xl p-4 sm:p-5 text-[#F7EBE1] shadow-xl backdrop-blur-xl space-y-3.5 ${className}`}>
      
      {/* Current Part / Status Badge when Speaking */}
      {isSpeaking && (
        <div className="flex items-center justify-end pb-2 border-b border-[#8B5A2B]/30">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs font-serif font-semibold animate-pulse">
            <Mic className="w-3.5 h-3.5 text-amber-300" />
            <span>
              {currentPartId === 'first-reading' && (isPaused ? 'Lector Paused — First Reading (Kore)' : 'Lector — First Reading (Kore)')}
              {currentPartId === 'psalm' && (isPaused ? 'Lector Paused — Responsorial Psalm (Kore)' : 'Lector — Responsorial Psalm (Kore)')}
              {currentPartId === 'second-reading' && (isPaused ? 'Lector Paused — Second Reading (Kore)' : 'Lector — Second Reading (Kore)')}
              {currentPartId === 'gospel' && (isPaused ? 'Lector Paused — Holy Gospel (Microsoft David)' : 'Lector — Holy Gospel (Microsoft David)')}
              {!currentPartId && (isPaused ? 'Lector Paused' : 'Lector Proclaiming')}
            </span>
          </div>
        </div>
      )}

      {/* Main Controls Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        
        {/* Playback Buttons */}
        <div className="flex items-center gap-2">
          {!isSpeaking ? (
            <button
              type="button"
              onClick={onPlay}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#6B4423] to-[#4A2E1B] hover:from-[#7A4E2D] hover:to-[#5A381C] border border-[#8B5A2B]/60 text-white font-serif font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer hover:scale-102 active:scale-98"
              title="Start Lector Reading"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Listen to Readings</span>
            </button>
          ) : isPaused ? (
            <button
              type="button"
              onClick={() => {
                if (onResume) {
                  onResume();
                } else {
                  SacredReader.resume();
                }
              }}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-sky-700 hover:bg-sky-600 text-white font-serif font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
              title="Resume Reading"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Resume Lector</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                if (onPause) {
                  onPause();
                } else {
                  SacredReader.pause();
                }
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#5A381C] hover:bg-[#6B4423] text-amber-100 font-serif font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer border border-[#8B5A2B]/50"
              title="Pause Reading"
            >
              <Pause className="w-4 h-4" />
              <span>Pause</span>
            </button>
          )}

          {isSpeaking && (
            <button
              type="button"
              onClick={() => {
                if (onStop) {
                  onStop();
                } else {
                  SacredReader.stop();
                }
              }}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 font-serif font-medium text-xs transition-all cursor-pointer border border-stone-600"
              title="Stop Lector"
            >
              <Square className="w-3.5 h-3.5" />
              <span>Stop</span>
            </button>
          )}

          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`flex items-center gap-1.5 px-3 py-2.5 rounded-lg font-serif text-xs transition-all cursor-pointer border ${
              showSettings
                ? 'bg-amber-500/30 text-amber-200 border-amber-400'
                : 'bg-stone-900/80 hover:bg-stone-800 text-stone-300 border-stone-700'
            }`}
            title="Lector Settings & Voices"
          >
            <Settings2 className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden sm:inline">Pacing & Voices</span>
          </button>
        </div>

        {/* Categorized Master Voice Selector Dropdown */}
        <div className="flex items-center gap-2 bg-[#120A05] p-1.5 rounded-lg border border-[#8B5A2B]/80 text-xs font-serif grow max-w-xs sm:max-w-md">
          <User className="w-4 h-4 text-amber-400 shrink-0 ml-1" />
          <span className="text-amber-200 font-semibold shrink-0 hidden sm:inline">Voice:</span>
          
          <div className="relative grow">
            <select
              value={selectedVoiceId}
              onChange={handleSelectVoiceChange}
              className="w-full bg-[#1C120C] text-stone-100 border border-[#8B5A2B]/60 rounded px-2.5 py-1.5 text-xs font-serif focus:outline-none focus:ring-1 focus:ring-amber-400 cursor-pointer appearance-none pr-7"
            >
              <optgroup label="Default Liturgical Voices">
                <option value="gemini-Kore">Kore — Serene Devotional Soprano (Default Female)</option>
                <option value="david">Microsoft David — Traditional Solemn Lector (Default Male)</option>
              </optgroup>

              <optgroup label="AI Prebuilt Voices">
                <option value="gemini-Puck">Puck — Lively Young Tenor Lector</option>
                <option value="gemini-Charon">Charon — Deep Monastic Bass</option>
                <option value="gemini-Fenrir">Fenrir — Resonant Benedictine Baritone</option>
                <option value="gemini-Zephyr">Zephyr — Smooth UK Liturgical Reader</option>
              </optgroup>

              <optgroup label="Sacred Devotional Female Personas (Gemini)">
                {SACRED_FEMALE_PERSONAS.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </optgroup>

              <optgroup label="Sacred Male Liturgical Lectors (Gemini)">
                {SACRED_MALE_LITURGICAL_PERSONAS.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </optgroup>

              <optgroup label="Church Father & Saint Personas (Gemini)">
                {SACRED_MALE_SAINT_PERSONAS.filter(s => s.id !== 'general-lector').map(s => (
                  <option key={s.id} value={s.id}>
                    {s.saintName} — {s.timbreDescription}
                  </option>
                ))}
              </optgroup>

              {systemVoices.length > 0 && (
                <optgroup label="Device & Browser Installed Voices">
                  {systemVoices
                    .filter(v => !v.name.toLowerCase().includes('mark'))
                    .map(v => (
                      <option key={v.name} value={v.name}>
                        {v.name} ({v.lang})
                      </option>
                    ))}
                </optgroup>
              )}
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-amber-400 absolute right-2 top-2.5 pointer-events-none" />
          </div>

          <button
            type="button"
            onClick={() => playVoiceSample(selectedVoiceId)}
            className="px-2 py-1 rounded bg-[#6B4423] hover:bg-[#8B5A2B] text-amber-100 text-xs font-semibold shrink-0 cursor-pointer transition-all border border-[#8B5A2B]/80 flex items-center gap-1"
            title="Sample selected voice"
          >
            {activePlayingVoice === selectedVoiceId ? (
              <Volume2 className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
            ) : isTtsLoading === selectedVoiceId ? (
              <span className="w-3 h-3 rounded-full bg-amber-300 animate-spin" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-amber-300" />
            )}
            <span className="hidden md:inline">Sample</span>
          </button>
        </div>

      </div>

      {/* Expanded Lector Settings (Rate / Pacing and Quick Prebuilt Badges) */}
      {showSettings && (
        <div className="pt-3 border-t border-[#8B5A2B]/30 space-y-3 text-xs font-serif animate-fadeIn">
          
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Gauge className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span className="text-stone-300 font-medium">Reading Pacing:</span>
              <div className="flex items-center gap-1 bg-[#120A05] p-1 rounded-lg border border-[#8B5A2B]/50">
                {[
                  { label: 'Solemn (0.8x)', rate: 0.8 },
                  { label: 'Calm (0.9x)', rate: 0.9 },
                  { label: 'Standard (1.0x)', rate: 1.0 },
                  { label: 'Brisk (1.1x)', rate: 1.1 }
                ].map((item) => (
                  <button
                    key={item.rate}
                    onClick={() => handleRateChange(item.rate)}
                    className={`px-2.5 py-1 rounded-md text-[11px] transition-all cursor-pointer ${
                      currentRate === item.rate
                        ? 'bg-[#6B4423] text-white font-bold shadow-xs border border-[#8B5A2B]/60'
                        : 'text-stone-400 hover:text-amber-200 hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-[11px] text-amber-200/80 italic">
              Selected Lector Persona: <strong className="text-amber-100">{selectedVoiceLabel}</strong>
            </p>
          </div>

          {/* Liturgical & Prebuilt Voice Quick Buttons */}
          <div className="pt-2.5 border-t border-[#8B5A2B]/40 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                <span className="text-amber-200 font-cinzel font-semibold text-[11px]">
                  Voice Quick Buttons:
                </span>
              </div>
              <span className="text-[10px] text-amber-200/80 font-medium">
                Default Female: Kore • Default Male: Microsoft David
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { id: 'gemini-Kore', label: 'Kore (Default Female ♀)', fullLabel: 'Kore — Serene Devotional Soprano (Default Female)' },
                { id: 'persona-ava', label: 'Ava Grace (Devotional ♀)', fullLabel: 'Ava Grace — Gentle Devotional Lector (Gemini)' },
                { id: 'persona-sonia', label: 'Sister Sonia (Cathedral ♀)', fullLabel: 'Sister Sonia — Cathedral Contemplative Soprano (Gemini)' },
                { id: 'persona-clara', label: 'St. Clare Choir (Meditative ♀)', fullLabel: 'St. Clare Choir — Soft Meditative Tone (Gemini)' },
                { id: 'liturgical-deacon', label: 'Cathedral Deacon (Gospel ♂)', fullLabel: 'Cathedral Deacon — Solemn Gospel Proclamation (Gemini)' },
                { id: 'liturgical-monk', label: 'Benedictine Abbot (Monastic ♂)', fullLabel: 'Benedictine Abbot — Monastic Lectio Divina (Gemini)' },
                { id: 'gemini-Puck', label: 'Puck (Lively Tenor ♂)', fullLabel: 'Puck — Lively Young Tenor Lector' },
                { id: 'gemini-Charon', label: 'Charon (Deep Monastic Bass ♂)', fullLabel: 'Charon — Deep Monastic Bass' },
                { id: 'gemini-Fenrir', label: 'Fenrir (Benedictine Baritone ♂)', fullLabel: 'Fenrir — Resonant Benedictine Baritone' },
                { id: 'gemini-Zephyr', label: 'Zephyr (Balanced Reader)', fullLabel: 'Zephyr — Smooth Liturgical Reader' },
                { id: 'saint-augustine', label: 'St. Augustine (Father ♂)', fullLabel: 'St. Augustine of Hippo — Deep Contemplative Baritone' },
                { id: 'david', label: 'Microsoft David (Local ♂)', fullLabel: 'Microsoft David — Traditional Solemn Lector (Local Device)' },
              ].map((v) => {
                const isSelected = selectedVoiceId === v.id;
                const isPlayingThis = activePlayingVoice === v.id;
                const isLoadingThis = isTtsLoading === v.id;

                return (
                  <button
                    key={v.id}
                    type="button"
                    disabled={isLoadingThis}
                    onClick={() => {
                      setSelectedVoiceId(v.id);
                      SacredReader.setActiveLectorVoiceKey(v.id);
                      setSelectedVoiceLabel(v.fullLabel);
                      playVoiceSample(v.id);
                    }}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-serif transition-all cursor-pointer border flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-amber-600 text-white font-bold border-amber-300 shadow-md ring-1 ring-amber-400/50'
                        : isPlayingThis
                        ? 'bg-amber-700 text-white font-bold border-amber-400'
                        : isLoadingThis
                        ? 'bg-[#251710] text-amber-300 border-amber-500/60 animate-pulse'
                        : 'bg-[#120A05] hover:bg-[#3B1E08] text-stone-200 hover:text-amber-200 border-[#8B5A2B]/60 shadow-2xs'
                    }`}
                    title={`Sample and set ${v.fullLabel}`}
                  >
                    {isLoadingThis ? (
                      <span className="w-2 h-2 rounded-full bg-amber-400 animate-spin" />
                    ) : isPlayingThis ? (
                      <Volume2 className="w-3 h-3 text-white animate-pulse" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5 text-amber-400/80" />
                    )}
                    <span>{v.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

