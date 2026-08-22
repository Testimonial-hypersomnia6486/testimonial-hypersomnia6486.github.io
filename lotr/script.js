'use strict';

/* ============ Nav: smooth active state ============ */
(function nav(){
  const buttons = document.querySelectorAll('.pixel-nav button');
  const sections = [...buttons].map(b => document.querySelector(b.dataset.target)).filter(Boolean);

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector(btn.dataset.target)?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const btn = document.querySelector(`.pixel-nav button[data-target="#${entry.target.id}"]`);
      if (!btn) return;
      if (entry.isIntersecting) buttons.forEach(b => b.classList.toggle('active', b === btn));
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  sections.forEach(s => io.observe(s));
})();

/* ============ Stat bars fill on scroll (with safety-net fallback) ============ */
(function statBars(){
  const stats = document.querySelectorAll('.stat');
  function fill(el){
    const level = parseInt(el.dataset.level, 10) || 0;
    el.querySelector('.gembar i').style.width = (level / 5 * 100) + '%';
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      fill(entry.target);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.3 });
  stats.forEach(s => io.observe(s));
  setTimeout(() => stats.forEach(fill), 2000);
})();

/* ============ Oracle (easter egg console) ============ */
(function oracle(){
  const input = document.getElementById('oracle-input');
  const log = document.getElementById('oracle-log');
  if (!input) return;

  const answers = {
    ayuda: 'El oráculo conoce: ayuda, sobre-mi, dotes, hazañas, contacto, smaug.',
    'sobre-mi': 'Forjador de microservicios desde 2017. Java, Spring Boot, arquitectura hexagonal.',
    dotes: 'Java, Spring Boot, Microservicios, Kafka, Kubernetes, PostgreSQL — nivel maestro artesano.',
    hazañas: 'StiEx · gim-app · cartelera-app (en producción) · PhotoSwipe · Bounce.',
    contacto: 'kepa.cuevas@gmail.com · linkedin.com/in/kepa-cuevas-barrasa · github.com/kcuevasb',
    smaug: '🐉 "No lo hago para regalarlo." — pero el código sí lo hace, cuando cierra un sprint a tiempo.',
  };

  input.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    const raw = input.value.trim().toLowerCase();
    if (!raw) return;
    input.value = '';
    const answer = answers[raw] || 'El oráculo guarda silencio ante eso. Prueba «ayuda».';
    log.textContent = '🔮 ' + answer;
  });
})();
