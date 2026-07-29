let audioCtx = null;
let hoverTimeout = null;

const SECTION_FREQS = {
  hero: 220,
  resumen: 261.63,
  experiencia: 293.66,
  formacion: 329.63,
  expositivos: 349.23,
  proyectos: 392,
  herramientas: 440,
};

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playTone(freq, duration = 0.08, volume = 0.08) {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.frequency.value = freq;
    osc.type = 'sine';
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    // Silently fail if audio not available
  }
}

function playConnectSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  } catch (e) {
    // Silently fail
  }
}

function playHoverSound() {
  try {
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = 1200;
    gain.gain.setValueAtTime(0.02, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  } catch (e) {
    // Silently fail
  }
}

export function initPatch() {
  // Sound on navigation dot click
  document.querySelectorAll('.nav-dot').forEach((dot) => {
    dot.addEventListener('click', () => {
      const section = dot.dataset.section;
      const freq = SECTION_FREQS[section] || 330;
      playTone(freq);
      setTimeout(() => playConnectSound(), 100);
    });

    dot.addEventListener('mouseenter', () => {
      hoverTimeout = setTimeout(playHoverSound, 50);
    });

    dot.addEventListener('mouseleave', () => {
      clearTimeout(hoverTimeout);
    });
  });

  // Sound on nav label click
  document.querySelectorAll('.nav-label').forEach((label) => {
    label.addEventListener('click', () => {
      const section = label.dataset.section;
      const freq = SECTION_FREQS[section] || 330;
      playTone(freq);
      setTimeout(() => playConnectSound(), 100);
    });
  });

  // Sound on stack-tag hover
  document.querySelectorAll('.stack-tag').forEach((tag) => {
    tag.addEventListener('mouseenter', () => {
      playHoverSound();
    });
  });

  // Sound on section enter (via IntersectionObserver)
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const freq = SECTION_FREQS[entry.target.id] || 330;
        playTone(freq, 0.15, 0.04);
      }
    });
  }, { threshold: 0.3 });

  sections.forEach((section) => observer.observe(section));
}
