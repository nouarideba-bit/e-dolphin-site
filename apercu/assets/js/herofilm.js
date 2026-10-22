/* Home hero: silent loop of real footage; "Watch the film" opens the full film with sound in a dialog. */
addEventListener('DOMContentLoaded', () => {
  const loop = document.getElementById('heroLoop'), dlg = document.getElementById('filmDlg'), film = document.getElementById('filmDlgVideo');
  if (loop && matchMedia('(prefers-reduced-motion: reduce)').matches) { loop.removeAttribute('autoplay'); loop.pause(); }
  if (!dlg || !film) return;
  const close = () => { film.pause(); if (dlg.open) dlg.close(); };
  document.querySelectorAll('[data-film-open]').forEach(b => b.addEventListener('click', () => {
    dlg.showModal();
    film.muted = false; film.currentTime = 0;
    film.play().catch(() => {});
    if (loop) loop.pause();
  }));
  dlg.querySelector('[data-film-close]').addEventListener('click', close);
  dlg.addEventListener('click', (e) => { if (e.target === dlg) close(); });
  dlg.addEventListener('close', () => { film.pause(); if (loop && !matchMedia('(prefers-reduced-motion: reduce)').matches) loop.play().catch(() => {}); });
});
