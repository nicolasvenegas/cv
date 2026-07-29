export function initNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const dots = document.querySelectorAll('.nav-dot');
  const labels = document.querySelectorAll('.nav-label');

  const observerOptions = {
    root: null,
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        dots.forEach((dot) => {
          dot.classList.toggle('active', dot.dataset.section === id);
        });
        labels.forEach((label) => {
          label.classList.toggle('active', label.dataset.section === id);
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const target = document.getElementById(dot.dataset.section);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  labels.forEach((label) => {
    label.addEventListener('click', () => {
      const target = document.getElementById(label.dataset.section);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });
}
