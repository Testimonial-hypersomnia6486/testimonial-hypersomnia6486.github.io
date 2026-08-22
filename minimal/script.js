'use strict';

/* ============ Scroll progress bar ============ */
(function progress(){
  const bar = document.getElementById('progress');
  function update(){
    const h = document.documentElement;
    const scrolled = h.scrollTop;
    const max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? (scrolled / max) * 100 : 0) + '%';
  }
  document.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ============ Reveal on scroll ============ */
(function reveal(){
  const els = document.querySelectorAll('.reveal');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion){ els.forEach(el => el.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){ entry.target.classList.add('in'); io.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));

  // Safety net: some browsers throttle/never fire IntersectionObserver in edge cases
  // (backgrounded tabs, some automation contexts) — never leave content invisible.
  setTimeout(() => els.forEach(el => el.classList.add('in')), 1800);
})();

/* ============ Active nav link ============ */
(function nav(){
  const links = document.querySelectorAll('.topnav a');
  const sections = Array.from(links).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = document.querySelector(`.topnav a[href="#${entry.target.id}"]`);
      if (!link) return;
      if (entry.isIntersecting) links.forEach(l => l.classList.toggle('active', l === link));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => io.observe(s));
})();

/* ============ Skill meters fill on scroll ============ */
(function skillMeters(){
  const items = document.querySelectorAll('.skill-list li');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const level = parseInt(el.dataset.level, 10) || 0;
      el.querySelector('.skill-meter i').style.width = (level / 5 * 100) + '%';
      io.unobserve(el);
    });
  }, { threshold: 0.4 });
  items.forEach(i => io.observe(i));
})();

/* ============ Mobile nav (hamburger) ============ */
(function mobileNav(){
  const btn = document.getElementById('menu-toggle');
  const nav = document.getElementById('mobile-nav');
  const topbar = document.querySelector('.topbar');
  if (!btn || !nav) return;

  function positionNav(){
    nav.style.top = topbar.getBoundingClientRect().bottom + 'px';
  }

  function open(){
    positionNav();
    nav.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    document.addEventListener('keydown', onKeydown);
  }
  function close(){
    nav.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
    document.removeEventListener('keydown', onKeydown);
  }
  function onKeydown(e){ if (e.key === 'Escape') close(); }

  btn.addEventListener('click', () => {
    if (nav.hidden) open(); else close();
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', close));
  window.addEventListener('resize', () => { if (!nav.hidden) positionNav(); });
})();

/* ============ Theme toggle ============ */
(function theme(){
  const btn = document.getElementById('theme-toggle');
  const stored = localStorage.getItem('cv-theme');
  if (stored) document.documentElement.setAttribute('data-theme', stored);

  function isDark(){ return document.documentElement.getAttribute('data-theme') === 'dark'; }
  function sync(){
    btn.setAttribute('aria-pressed', String(isDark()));
    btn.textContent = isDark() ? '◑' : '◐';
    btn.title = isDark() ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro';
  }
  sync();

  btn.addEventListener('click', () => {
    const next = isDark() ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('cv-theme', next);
    sync();
  });
})();
