/* UVIT: THE LAST DETECTION — sound effects.
   Every sound is synthesised with the Web Audio API, so there are no audio files or licences.
   The game is fully playable with sound off. */
const Sfx = (() => {
  let ac = null;
  let out = null;
  let noiseBuf = null;
  let muted = false;

  function init() {
    if (ac) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    try {
      ac = new AC();
      out = ac.createGain();
      out.gain.value = 0.22;
      out.connect(ac.destination);
      noiseBuf = ac.createBuffer(1, Math.floor(ac.sampleRate * 0.5), ac.sampleRate);
      const d = noiseBuf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    } catch (e) {
      ac = null;
    }
  }

  function resume() {
    init();
    if (ac && ac.state === 'suspended') ac.resume().catch(() => {});
  }

  function tone(freq, dur, type = 'square', vol = 0.4, slideTo = 0, delay = 0) {
    if (!ac || muted) return;
    const t = ac.currentTime + delay;
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g);
    g.connect(out);
    o.start(t);
    o.stop(t + dur + 0.03);
  }

  function noise(dur, vol = 0.3, freq = 1000, delay = 0) {
    if (!ac || muted || !noiseBuf) return;
    const t = ac.currentTime + delay;
    const src = ac.createBufferSource();
    const f = ac.createBiquadFilter();
    const g = ac.createGain();
    src.buffer = noiseBuf;
    f.type = 'bandpass';
    f.frequency.value = freq;
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f);
    f.connect(g);
    g.connect(out);
    src.start(t);
    src.stop(t + dur + 0.02);
  }

  return {
    resume,
    setMuted(m) { muted = m; },
    get muted() { return muted; },
    step() { noise(0.02, 0.04, 2600); },
    jump() { tone(330, 0.13, 'square', 0.3, 700); },
    land() { noise(0.05, 0.12, 900); },
    slide() { noise(0.18, 0.12, 1600); },
    collect() { tone(988, 0.06, 'square', 0.22); tone(1319, 0.1, 'square', 0.22, 0, 0.055); },
    rare() { [784, 988, 1175, 1568].forEach((f, i) => tone(f, 0.09, 'square', 0.22, 0, i * 0.06)); },
    coffee() { tone(220, 0.08, 'triangle', 0.5, 440); tone(440, 0.14, 'triangle', 0.4, 880, 0.08); },
    hit() { noise(0.25, 0.45, 400); tone(220, 0.25, 'sawtooth', 0.25, 60); },
    warn() { tone(880, 0.07, 'square', 0.18); tone(880, 0.07, 'square', 0.18, 0, 0.13); },
    deny() { tone(160, 0.12, 'square', 0.2); },
    glitch() { for (let i = 0; i < 7; i++) tone(100 + Math.random() * 900, 0.04, 'square', 0.2, 0, i * 0.035); },
    power() { tone(200, 0.45, 'sawtooth', 0.25, 1200); tone(400, 0.45, 'triangle', 0.2, 1600, 0.05); },
    stage() { [523, 659, 784, 1047].forEach((f, i) => tone(f, 0.1, 'square', 0.2, 0, i * 0.08)); },
    achieve() { [659, 880, 1319].forEach((f, i) => tone(f, 0.12, 'triangle', 0.35, 0, i * 0.09)); },
    boss() { tone(90, 0.7, 'sawtooth', 0.35, 45); tone(95, 0.7, 'sawtooth', 0.25, 48, 0.35); },
    over() {
      [523, 392, 330, 262].forEach((f, i) => tone(f, 0.18, 'triangle', 0.4, 0, i * 0.16));
      tone(196, 0.55, 'triangle', 0.35, 98, 0.66);
    },
  };
})();
