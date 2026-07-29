import '../scss/main.scss';
import { initNavigation } from './navigation.js';
import { initAnimations } from './animations.js';
import { initScrollWeight, initDataPulses } from './senal.js';

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initAnimations();
  initScrollWeight();
  initDataPulses();
});

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  Promise.all([
    import('p5'),
    import('./sketch.js'),
  ]).then(([p5, sketch]) => {
    new p5.default(sketch.initSketch);
  });
}
