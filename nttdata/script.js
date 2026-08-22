'use strict';

/* ============ File / tab switching ============ */
(function files(){
  const treeFiles = document.querySelectorAll('.tree-file');
  const tabs = document.querySelectorAll('.tab');
  const panes = document.querySelectorAll('.editor > *');

  function openFile(id){
    treeFiles.forEach(f => f.classList.toggle('active', f.dataset.file === id));
    tabs.forEach(t => t.classList.toggle('active', t.dataset.file === id));
    panes.forEach(p => { p.hidden = p.id !== 'file-' + id; });
    closeExplorerMobile();
  }

  treeFiles.forEach(f => f.addEventListener('click', () => openFile(f.dataset.file)));
  tabs.forEach(t => t.addEventListener('click', () => openFile(t.dataset.file)));
})();

/* ============ Mobile Package Explorer drawer ============ */
const explorer = document.getElementById('explorer-panel');
const backdrop = document.getElementById('explorer-backdrop');
const menuBtn = document.getElementById('menu-toggle');

function openExplorerMobile(){
  explorer.classList.add('open');
  backdrop.hidden = false;
  menuBtn.setAttribute('aria-expanded', 'true');
}
function closeExplorerMobile(){
  explorer.classList.remove('open');
  backdrop.hidden = true;
  menuBtn.setAttribute('aria-expanded', 'false');
}
menuBtn.addEventListener('click', () => {
  explorer.classList.contains('open') ? closeExplorerMobile() : openExplorerMobile();
});
backdrop.addEventListener('click', closeExplorerMobile);
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeExplorerMobile(); });
