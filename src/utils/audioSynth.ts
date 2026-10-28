/**
 * Web Audio API cathedral carillon, noon chimes, and bronze bell synthesizer.
 * Provides rich, resonant, multi-harmonic European carillon and cathedral chime acoustics.
 */

class BellSynthesizer {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  /**
   * Plays a single rich, resonant bronze cathedral bell.
   * Modeled after European bronze bell acoustics (strike tone, minor tierce, quint, nominal, deep hum note, acoustic beating, and cathedral reverb).
   */
  public playChurchBell(freq = 261.63, duration = 6.5, masterVolume = 0.55): void {
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      // Normalize high frequencies down to deep, solemn cathedral bronze registers (around 160Hz - 340Hz)
      let bellBaseFreq = freq;
      while (bellBaseFreq > 360) {
        bellBaseFreq /= 2;
      }
      if (bellBaseFreq < 130) {
        bellBaseFreq *= 2;
      }

      // Master output with subtle compression/saturation gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(masterVolume, now);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      // Sanctuary Hall Reverberation Delay and Filter
      const delay = ctx.createDelay();
      delay.delayTime.setValueAtTime(0.18, now); // 180ms cathedral echo

      const delayFeedback = ctx.createGain();
      delayFeedback.gain.setValueAtTime(0.32, now);

      const delayFilter = ctx.createBiquadFilter();
      delayFilter.type = 'lowpass';
      delayFilter.frequency.setValueAtTime(1400, now);

      // Route delay loop
      delay.connect(delayFilter);
      delayFilter.connect(delayFeedback);
      delayFeedback.connect(delay);

      masterGain.connect(ctx.destination);
      masterGain.connect(delay);
      delay.connect(ctx.destination);

      // Authentic European bronze bell partial spectrum with natural decay times
      // Ratios from campanological acoustics:
      // Sub-hum (0.5x), Prime (1.0x), Tierce (1.189x minor third - soul of a church bell), Quint (1.498x), Nominal (2.0x), Decima (2.52x), Duodecima (2.98x), Superoctave (4.0x)
      const partials = [
        { mult: 0.5, gain: 0.70, decay: duration * 1.30, detune: 0 },         // Deep lingering hum note
        { mult: 0.5, gain: 0.45, decay: duration * 1.20, detune: 2.1 },       // Hum doublet for authentic acoustic beating
        { mult: 1.0, gain: 0.95, decay: duration * 1.00, detune: 0 },         // Prime strike note
        { mult: 1.0, gain: 0.55, decay: duration * 0.92, detune: -2.5 },     // Prime doublet beating
        { mult: 1.189, gain: 0.75, decay: duration * 0.85, detune: 0.8 },    // Minor third (tierce) - quintessential bell warmth
        { mult: 1.498, gain: 0.52, decay: duration * 0.75, detune: 1.2 },    // Quint (fifth)
        { mult: 2.0, gain: 0.58, decay: duration * 0.60, detune: 0 },         // Nominal (octave)
        { mult: 2.52, gain: 0.35, decay: duration * 0.45, detune: -1.8 },    // Decima (tenth)
        { mult: 2.98, gain: 0.28, decay: duration * 0.35, detune: 2.2 },     // Duodecima (twelfth)
        { mult: 4.0, gain: 0.20, decay: duration * 0.25, detune: 0 }         // Superoctave bright chime shimmer
      ];

      partials.forEach(p => {
        const osc = ctx.createOscillator();
        const pGain = ctx.createGain();

        // Blend sine and triangle for warm bronze resonance
        osc.type = p.mult <= 1.0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(bellBaseFreq * p.mult + p.detune, now);

        // Clapper strike envelope: instantaneous attack then smooth exponential decay
        pGain.gain.setValueAtTime(0.0001, now);
        pGain.gain.linearRampToValueAtTime(p.gain, now + 0.005);
        pGain.gain.exponentialRampToValueAtTime(0.0001, now + Math.min(duration, p.decay));

        osc.connect(pGain);
        pGain.connect(masterGain);

        osc.start(now);
        osc.stop(now + Math.min(duration, p.decay) + 0.1);
      });

      // Clapper felt-wrapped impact noise transient on bell rim
      const strikeNoiseLen = 0.06;
      const bufferSize = Math.floor(ctx.sampleRate * strikeNoiseLen);
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.22));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(bellBaseFreq * 2.8, now);
      noiseFilter.Q.setValueAtTime(2.5, now);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.25, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + strikeNoiseLen);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(masterGain);

      noise.start(now);
      noise.stop(now + strikeNoiseLen);
    } catch {
      // Audio playback fails silently if browser policy blocks autoplay before interaction
    }
  }

  /**
   * Plays a single bright, crystalline carillon note chime.
   * Used for Westminster carillon melodies with luminous, shimmering acoustic overtones.
   */
  public playCarillonNote(freq: number, duration = 3.5, volume = 0.45): void {
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;

      const noteGain = ctx.createGain();
      noteGain.connect(ctx.destination);
      noteGain.gain.setValueAtTime(volume, now);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      // Carillon overtones: Fund, Octave, Tierce, Quint, Nominal
      const partials = [
        { mult: 1.0, gain: 0.85, type: 'triangle' as OscillatorType },
        { mult: 2.0, gain: 0.45, type: 'sine' as OscillatorType },
        { mult: 2.4, gain: 0.35, type: 'sine' as OscillatorType }, // Tierce
        { mult: 3.0, gain: 0.25, type: 'sine' as OscillatorType }, // Quint
        { mult: 4.0, gain: 0.15, type: 'sine' as OscillatorType }  // Shimmer
      ];

      partials.forEach(p => {
        const osc = ctx.createOscillator();
        const pGain = ctx.createGain();

        osc.type = p.type;
        osc.frequency.setValueAtTime(freq * p.mult, now);

        pGain.gain.setValueAtTime(0.0001, now);
        pGain.gain.linearRampToValueAtTime(p.gain, now + 0.004);
        pGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(pGain);
        pGain.connect(noteGain);

        osc.start(now);
        osc.stop(now + duration + 0.1);
      });
    } catch {
      // Safe fallback
    }
  }

  private bellTimers: number[] = [];

  public stopBells(): void {
    this.bellTimers.forEach((id) => window.clearTimeout(id));
    this.bellTimers = [];
  }

  private scheduleBell(fn: () => void, delayMs: number): void {
    if (typeof window === 'undefined') return;
    const id = window.setTimeout(fn, delayMs);
    this.bellTimers.push(id);
  }

  /**
   * Plays the Glorious Westminster Noon Chimes:
   * A vibrant, majestic 8-note Westminster carillon chime sequence followed by a deep 12 o'clock cathedral toll.
   */
  public playNoonChimes(): void {
    this.stopBells();
    // 8-Note Westminster Melody Frequencies (Hz):
    // E5 (659.25), C#5 (554.37), D5 (587.33), A4 (440.00)
    const E5 = 659.25;
    const CSHARP5 = 554.37;
    const D5 = 587.33;
    const A4 = 440.00;

    const melody = [
      { note: E5, delay: 0 },
      { note: CSHARP5, delay: 550 },
      { note: D5, delay: 1100 },
      { note: A4, delay: 1650 },
      
      { note: E5, delay: 2400 },
      { note: D5, delay: 2950 },
      { note: CSHARP5, delay: 3500 },
      { note: E5, delay: 4050 }
    ];

    // Play 8-note carillon sequence
    melody.forEach(m => {
      this.scheduleBell(() => {
        this.playCarillonNote(m.note, 3.8, 0.48);
      }, m.delay);
    });
  }

  /**
   * Plays gentle soft chime for bead transitions or prayer advances
   */
  public playBeadChime(): void {
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now); // A5
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.35);

      gain.gain.setValueAtTime(0.20, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.55);
    } catch {
      // Safe fallback
    }
  }

  /**
   * Plays authentic triple Angelus bell toll:
   * 3 strokes (Annunciation) -> pause -> 3 strokes (Handmaid) -> pause -> 3 strokes (Incarnation) -> pause -> 12-stroke swinging Bourdon/Angelus Sanctus peal.
   */
  public playAngelusToll(onStatusChange?: (status: string) => void): void {
    this.stopBells();
    const bellNote = 329.63; // E4 cathedral bell
    const bourdonNote = 220.00; // Deep A3 Bourdon bell

    const updateStatus = (msg: string) => {
      if (onStatusChange) onStatusChange(msg);
    };

    // First group of 3 (Annunciation)
    updateStatus("1st Ave: 'The Angel of the Lord declared' (3 Bell Strokes)");
    this.playChurchBell(bellNote, 4.0, 0.60);
    this.scheduleBell(() => this.playChurchBell(bellNote, 4.0, 0.60), 1200);
    this.scheduleBell(() => this.playChurchBell(bellNote, 4.0, 0.60), 2400);

    // Second group of 3 (Handmaid of the Lord)
    this.scheduleBell(() => {
      updateStatus("2nd Ave: 'Behold the handmaid of the Lord' (3 Bell Strokes)");
      this.playChurchBell(bellNote, 4.0, 0.60);
    }, 4500);
    this.scheduleBell(() => this.playChurchBell(bellNote, 4.0, 0.60), 5700);
    this.scheduleBell(() => this.playChurchBell(bellNote, 4.0, 0.60), 6900);

    // Third group of 3 (Word made flesh)
    this.scheduleBell(() => {
      updateStatus("3rd Ave: 'And the Word was made flesh' (3 Bell Strokes)");
      this.playChurchBell(bellNote, 4.0, 0.60);
    }, 9000);
    this.scheduleBell(() => this.playChurchBell(bellNote, 4.0, 0.60), 10200);
    this.scheduleBell(() => this.playChurchBell(bellNote, 4.0, 0.60), 11400);

    // Final 12-stroke swinging Bourdon / Angelus Sanctus Peal
    const pealStrokes = [
      { delay: 13800, note: bourdonNote, vol: 0.65 },
      { delay: 14500, note: bellNote, vol: 0.55 },
      { delay: 15200, note: bourdonNote, vol: 0.65 },
      { delay: 15850, note: bellNote, vol: 0.55 },
      { delay: 16500, note: bourdonNote, vol: 0.65 },
      { delay: 17100, note: bellNote, vol: 0.55 },
      { delay: 17700, note: bourdonNote, vol: 0.65 },
      { delay: 18300, note: bellNote, vol: 0.55 },
      { delay: 18900, note: bourdonNote, vol: 0.65 },
      { delay: 19500, note: bellNote, vol: 0.55 },
      { delay: 20100, note: bourdonNote, vol: 0.65 },
      { delay: 20700, note: bellNote, vol: 0.70 },
    ];

    pealStrokes.forEach((s, idx) => {
      this.scheduleBell(() => {
        if (idx === 0) updateStatus("Angelus Sanctus Peal (12 Swinging Cathedral Strokes)");
        this.playChurchBell(s.note, 6.0, s.vol);
        if (idx === pealStrokes.length - 1) {
          this.scheduleBell(() => updateStatus(""), 6000);
        }
      }, s.delay);
    });
  }

  /**
   * Plays a Grand Basilica multi-bell change-ringing carillon peal
   */
  public playGrandCathedralPeal(onStatusChange?: (status: string) => void): void {
    this.stopBells();
    const bells = [
      { freq: 220.00, name: "Bourdon A3" },  // Deepest bell
      { freq: 261.63, name: "Sanctus C4" },
      { freq: 329.63, name: "Angelus E4" },
      { freq: 392.00, name: "Gloria G4" }    // Highest bell
    ];

    if (onStatusChange) onStatusChange("Ringing Grand Basilica Multi-Bell Carillon Peal...");

    // 16-stroke rhythmic swinging sequence
    const sequence = [
      0, 1, 2, 3,
      3, 2, 1, 0,
      1, 3, 0, 2,
      0, 2, 1, 3,
      0
    ];

    sequence.forEach((bellIdx, step) => {
      this.scheduleBell(() => {
        const b = bells[bellIdx];
        this.playChurchBell(b.freq, 5.5, 0.55);
        if (step === sequence.length - 1 && onStatusChange) {
          this.scheduleBell(() => onStatusChange(""), 5000);
        }
      }, step * 650);
    });
  }

  // Ambient monastic chant and organ drone nodes
  private ambientOscillators: OscillatorNode[] = [];
  private ambientGain: GainNode | null = null;
  private isAmbientPlayingState = false;

  public isAmbientPlaying(): boolean {
    return this.isAmbientPlayingState;
  }

  /**
   * Starts a continuous, reverent Gregorian modal drone (D minor / Dorian mode church chord)
   */
  public startAmbientChant(baseFreq = 146.83): void { // D3
    try {
      this.stopAmbientChant();
      const ctx = this.getContext();
      if (!ctx) return;

      const masterGain = ctx.createGain();
      masterGain.connect(ctx.destination);
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 3.0); // Gentle fade in
      this.ambientGain = masterGain;

      // Chord: D3, A3, D4, F4 (Dorian / Sacred church minor chord with rich harmonics)
      const freqs = [baseFreq, baseFreq * 1.5, baseFreq * 2.0, baseFreq * 2.4, baseFreq * 3.0];

      this.ambientOscillators = freqs.map((f, i) => {
        const osc = ctx.createOscillator();
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f, ctx.currentTime);

        const subGain = ctx.createGain();
        subGain.gain.setValueAtTime(0.2 / (i + 1), ctx.currentTime);

        osc.connect(subGain);
        subGain.connect(masterGain);
        osc.start();
        return osc;
      });

      this.isAmbientPlayingState = true;
    } catch {
      // Fallback
    }
  }

  /**
   * Gently fades out and stops the ambient monastic chant drone
   */
  public stopAmbientChant(): void {
    try {
      if (this.ambientGain && this.ctx) {
        this.ambientGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.5);
        setTimeout(() => {
          this.ambientOscillators.forEach(o => {
            try { o.stop(); o.disconnect(); } catch {}
          });
          this.ambientOscillators = [];
          this.ambientGain = null;
          this.isAmbientPlayingState = false;
        }, 1600);
      } else {
        this.ambientOscillators.forEach(o => {
          try { o.stop(); o.disconnect(); } catch {}
        });
        this.ambientOscillators = [];
        this.ambientGain = null;
        this.isAmbientPlayingState = false;
      }
    } catch {
      this.isAmbientPlayingState = false;
    }
  }
}

export const bellSynth = new BellSynthesizer();
