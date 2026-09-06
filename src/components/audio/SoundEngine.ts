'use client';

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private crowdNode: AudioNode | null = null;

  constructor() {
    // Initialized on first user interaction
  }

  private initContext() {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('vivian_portfolio_muted', muted ? 'true' : 'false');
    }
  }

  public getMuted(): boolean {
    if (typeof window !== 'undefined' && localStorage.getItem('vivian_portfolio_muted') === 'true') {
      return true;
    }
    return this.isMuted;
  }

  public toggleMute(): boolean {
    const next = !this.getMuted();
    this.setMuted(next);
    return next;
  }

  // Kick ball sound: punchy bass transient + leather thud
  public playKick(intensity = 1.0) {
    if (this.getMuted()) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(140 * Math.max(0.6, intensity), t);
      osc.frequency.exponentialRampToValueAtTime(32, t + 0.12);

      gain.gain.setValueAtTime(0.7 * Math.min(1.2, intensity), t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.15);

      // Add slight snap noise
      const bufferSize = this.ctx.sampleRate * 0.04;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.18 * intensity, t);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
      noise.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      noise.start(t);
    } catch {
      // Audio fallback
    }
  }

  // Goal explosion sound: Stadium horn + ascending triumphal chord
  public playGoal() {
    if (this.getMuted()) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const freqs = [220, 277.18, 329.63, 440, 554.37]; // A major chord

      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, t + idx * 0.05);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.5, t + 0.8 + idx * 0.05);

        gain.gain.setValueAtTime(0, t);
        gain.gain.linearRampToValueAtTime(0.15, t + 0.08 + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 1.2 + idx * 0.05);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t + idx * 0.05);
        osc.stop(t + 1.3 + idx * 0.05);
      });
    } catch {
      // Audio fallback
    }
  }

  // Trophy shimmer: crystal chime
  public playTrophy() {
    if (this.getMuted()) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C E G C

      notes.forEach((note, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(note, t + i * 0.08);

        gain.gain.setValueAtTime(0.2, t + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, t + i * 0.08 + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t + i * 0.08);
        osc.stop(t + i * 0.08 + 0.65);
      });
    } catch {
      // Audio fallback
    }
  }

  // Locker opening: pneumatic slide + latch click
  public playLocker() {
    if (this.getMuted()) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, t);
      osc.frequency.exponentialRampToValueAtTime(520, t + 0.18);

      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.25);
    } catch {
      // Audio fallback
    }
  }

  // Achievement unlock fanfare: Victorious 5-note melodic chime
  public playAchievement() {
    if (this.getMuted()) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const notes = [440, 554.37, 659.25, 880, 1108.73]; // A, C#, E, A, C#

      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t + idx * 0.09);

        gain.gain.setValueAtTime(0.25, t + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.09 + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t + idx * 0.09);
        osc.stop(t + idx * 0.09 + 0.55);
      });
    } catch {
      // Audio fallback
    }
  }

  // Floodlight electrical hum and relay snap
  public playFloodlight(index = 0) {
    if (this.getMuted()) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(60 + index * 15, t);
      osc.frequency.exponentialRampToValueAtTime(120 + index * 20, t + 0.3);

      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.5);
    } catch {
      // Audio fallback
    }
  }

  // UI button click
  public playUiClick() {
    if (this.getMuted()) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, t);
      osc.frequency.exponentialRampToValueAtTime(440, t + 0.04);

      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.06);
    } catch {
      // Audio fallback
    }
  }

  // Tactical node ping
  public playTacticalPing() {
    if (this.getMuted()) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(660, t);
      osc.frequency.exponentialRampToValueAtTime(1320, t + 0.15);

      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.3);
    } catch {
      // Audio fallback
    }
  }
}

export const soundEngine = new SoundEngine();
