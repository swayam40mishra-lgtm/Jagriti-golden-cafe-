// Mobile nav
const toggle = document.querySelector('.nav-toggle');
const links = document.getElementById('nav-links');
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  links.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));

// Menu filter
const tabs = document.querySelectorAll('.tab');
const cards = document.querySelectorAll('.card');
tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
  tab.classList.add('active');
  tab.setAttribute('aria-selected', 'true');
  const f = tab.dataset.filter;
  cards.forEach(c => { c.hidden = !(f === 'all' || c.dataset.cat.split(' ').includes(f)); });
}));

// Subtle reveal on scroll
const targets = document.querySelectorAll('.section-head, .about-text, .card, .info');
targets.forEach(el => el.classList.add('reveal'));
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  targets.forEach(el => io.observe(el));
} else {
  targets.forEach(el => el.classList.add('in'));
}

document.getElementById('year').textContent = new Date().getFullYear();
