'use strict';
(function(){
  const cards = Array.from(document.querySelectorAll('.card'));
  let idx = 0;

  function highlight(i){
    cards.forEach((c, ci) => c.classList.toggle('selected', ci === i));
    cards[i].focus({ preventScroll: true });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight'){ idx = (idx + 1) % cards.length; highlight(idx); }
    else if (e.key === 'ArrowLeft'){ idx = (idx - 1 + cards.length) % cards.length; highlight(idx); }
    else if (e.key === 'Enter' && document.activeElement === document.body){ cards[idx].click(); }
    else {
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= cards.length){ window.location.href = cards[n-1].getAttribute('href'); }
    }
  });

  cards.forEach((c, i) => c.addEventListener('focus', () => { idx = i; highlight(i); }));
})();
