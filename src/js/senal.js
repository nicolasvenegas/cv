export function initScrollWeight() {
  let ticking = false;

  const update = () => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(scrollY / maxScroll, 1);
    const weight = Math.round(300 + progress * 200);
    document.documentElement.style.setProperty('--scroll-weight', weight);

    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
      progressBar.style.width = `${progress * 100}%`;
    }

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  });

  update();
}

export function initDataPulses() {
  const container = document.querySelector('.data-pulse');
  if (!container) return;

  const years = [
    { label: '2010', active: false },
    { label: '2011', active: false },
    { label: '2012', active: false },
    { label: '2013', active: false },
    { label: '2014', active: false },
    { label: '2015', active: false },
    { label: '2016', active: false },
    { label: '2017', active: false },
    { label: '2018', active: false },
    { label: '2019', active: false },
    { label: '2020', active: false },
    { label: '2021', active: false },
    { label: '2022', active: false },
    { label: '2023', active: true },
    { label: '2024', active: true },
    { label: '2025', active: true },
    { label: '2026', active: true },
  ];

  years.forEach((year, i) => {
    const pulse = document.createElement('div');
    pulse.className = `pulse${year.active ? ' active' : ''}`;
    pulse.title = year.label;
    pulse.style.animationDelay = `${i * 0.05}s`;
    container.appendChild(pulse);
  });
}
