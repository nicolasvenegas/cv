let particles = [];
let time = 0;

export function initSketch(p) {
  p.setup = () => {
    const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
    canvas.parent('canvas-container');
    p.noStroke();
    particles = [];

    const cols = Math.ceil(p.width / 40) + 1;
    const rows = Math.ceil(p.height / 40) + 1;

    for (let i = 0; i < cols * rows; i++) {
      particles.push({
        x: (i % cols) * 40,
        y: Math.floor(i / cols) * 40,
        baseX: (i % cols) * 40,
        baseY: Math.floor(i / cols) * 40,
        size: p.random(1, 2.5),
        phase: p.random(p.TWO_PI),
      });
    }
  };

  p.draw = () => {
    p.clear();
    time += 0.005;

    const scrollY = window.scrollY || window.pageYOffset || 0;

    for (const pt of particles) {
      const dx = p.sin(time + pt.phase) * 6;
      const dy = p.cos(time * 0.7 + pt.phase * 1.3) * 6;
      const drift = scrollY * 0.02;

      p.fill(45, 212, 191, 60);
      p.circle(pt.baseX + dx, (pt.baseY + dy + drift) % p.height, pt.size);
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight);
  };
}
