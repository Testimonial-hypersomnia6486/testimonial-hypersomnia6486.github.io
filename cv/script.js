'use strict';

document.querySelectorAll('.stars').forEach(el => {
  const n = parseInt(el.dataset.n, 10) || 0;
  let html = '';
  for (let i = 0; i < 5; i++){
    html += i < n ? '<span class="on">★</span>' : '☆';
  }
  el.innerHTML = html;
});

document.getElementById('print-btn').addEventListener('click', () => window.print());
