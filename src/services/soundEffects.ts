/**
 * Web Audio API synthesizer for romantic sound effects and ambient piano/celeste music
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Romantic sparkling chime
 */
export function playChime() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C5, E5, G5, C6, E6

    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + index * 0.08);

      gain.gain.setValueAtTime(0.001, now + index * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.12, now + index * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + index * 0.08 + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + index * 0.08);
      osc.stop(now + index * 0.08 + 1.3);
    });
  } catch {
    // Graceful fallback for environments with restricted audio
  }
}

/**
 * Soft candle blow sound
 */
export function playBlowSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const bufferSize = ctx.sampleRate * 0.8;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.3));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(200, now + 0.8);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
  } catch {
    // Ignore
  }
}

/**
 * Soft romantic firework pop & sparkle
 */
export function playFireworkSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // Pop
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.25);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.3);

    // Crackle shimmer
    setTimeout(() => {
      playChime();
    }, 150);
  } catch {
    // Ignore
  }
}

/**
 * Heartbeat sound
 */
export function playHeartbeatSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const createThump = (time: number, freq: number, vol: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);
      osc.frequency.exponentialRampToValueAtTime(30, time + 0.15);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(vol, time + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + 0.2);
    };

    createThump(now, 75, 0.25);
    createThump(now + 0.15, 65, 0.18);
  } catch {
    // Ignore
  }
}

/**
 * Romantic warm hug harmonic swell
 */
export function playHugSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    // Warm F major 9th chord (F3, C4, E4, A4, G4)
    const freqs = [174.61, 261.63, 329.63, 440.0, 392.0];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      gain.gain.setValueAtTime(0.001, now + idx * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.08, now + idx * 0.06 + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 2.5);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.06);
      osc.stop(now + idx * 0.06 + 2.6);
    });
  } catch {
    // Ignore
  }
}

/**
 * Procedural romantic melody generator as a seamless fallback
 * Plays an endless, soft, romantic acoustic piano / celesta arpeggio if no MP3 is present
 */
class ProceduralRomanticBGM {
  private isRunning = false;
  private timer: number | null = null;
  private step = 0;
  private masterGain: GainNode | null = null;

  // Chord progression: EbMaj7 -> Cm7 -> Fm7 -> Bb7sus4 -> EbMaj7
  private chords = [
    [155.56, 196.0, 233.08, 293.66, 349.23, 392.0], // Ebmaj9
    [130.81, 196.0, 233.08, 311.13, 349.23, 392.0], // Cm9
    [174.61, 207.65, 261.63, 311.13, 349.23, 415.3], // Fm9
    [116.54, 174.61, 233.08, 293.66, 349.23, 466.16], // Bb9sus
  ];

  public start() {
    if (this.isRunning) return;
    this.isRunning = true;
    const ctx = getAudioContext();

    this.masterGain = ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.01, ctx.currentTime);
    this.masterGain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 3);
    this.masterGain.connect(ctx.destination);

    const playNote = () => {
      if (!this.isRunning || !this.masterGain) return;
      const currentCtx = getAudioContext();
      const chordIndex = Math.floor(this.step / 8) % this.chords.length;
      const chord = this.chords[chordIndex];
      const noteIndex = [0, 2, 4, 5, 3, 1, 4, 2][this.step % 8];
      const freq = chord[noteIndex % chord.length];

      const osc = currentCtx.createOscillator();
      const gain = currentCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, currentCtx.currentTime);

      const noteDuration = 1.8;
      gain.gain.setValueAtTime(0.001, currentCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.12, currentCtx.currentTime + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, currentCtx.currentTime + noteDuration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(currentCtx.currentTime + noteDuration);

      this.step++;
      this.timer = window.setTimeout(playNote, 480);
    };

    playNote();
  }

  public stop() {
    this.isRunning = false;
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    if (this.masterGain) {
      try {
        const ctx = getAudioContext();
        this.masterGain.gain.linearRampToValueAtTime(0.0001, ctx.currentTime + 1.5);
      } catch {
        // Ignore
      }
    }
  }

  public setVolume(vol: number) {
    if (this.masterGain && this.isRunning) {
      try {
        const ctx = getAudioContext();
        this.masterGain.gain.setValueAtTime(vol * 0.25, ctx.currentTime);
      } catch {
        // Ignore
      }
    }
  }
}

export const proceduralBGM = new ProceduralRomanticBGM();
