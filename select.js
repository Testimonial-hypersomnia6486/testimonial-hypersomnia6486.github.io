'use strict';
(function(){
  const balls = Array.from(document.querySelectorAll('.ball-option'));
  let idx = 0;

  function highlight(i){
    balls.forEach((c, ci) => c.classList.toggle('selected', ci === i));
    balls[i].focus({ preventScroll: true });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight'){ idx = (idx + 1) % balls.length; highlight(idx); }
    else if (e.key === 'ArrowLeft'){ idx = (idx - 1 + balls.length) % balls.length; highlight(idx); }
    else if (e.key === 'Enter' && document.activeElement === document.body){ balls[idx].click(); }
    else {
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= balls.length){ window.location.href = balls[n-1].getAttribute('href'); }
    }
  });

  balls.forEach((c, i) => c.addEventListener('focus', () => { idx = i; highlight(i); }));
})();
