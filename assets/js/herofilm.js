/* Home hero: the full film plays muted with a one-click sound switch; "Watch the film" opens it from the start, with sound and controls. */
addEventListener('DOMContentLoaded', () => {
  const loop = document.getElementById('heroLoop'), dlg = document.getElementById('filmDlg'), film = document.getElementById('filmDlgVideo');
  if (loop && matchMedia('(prefers-reduced-motion: reduce)').matches) { loop.removeAttribute('autoplay'); loop.pause(); }
  // Sound switch: the button shows the state of the hero film (aria-pressed = sound on)
  const sb = document.querySelector('[data-sound="#heroLoop"]');
  const sync = () => sb && sb.setAttribute('aria-pressed', String(!loop.muted));
  if (sb && loop) {
    sb.addEventListener('click', () => { loop.muted = !loop.muted; if (loop.paused) loop.play().catch(() => {}); sync(); });
    loop.addEventListener('volumechange', sync);
  }
  if (!dlg || !film) return;
  const close = () => { film.pause(); if (dlg.open) dlg.close(); };
  document.querySelectorAll('[data-film-open]').forEach(b => b.addEventListener('click', () => {
    dlg.showModal();
    film.muted = false; film.currentTime = 0;
    film.play().catch(() => {});
    if (loop) { loop.muted = true; loop.pause(); }
  }));
  dlg.querySelector('[data-film-close]').addEventListener('click', close);
  dlg.addEventListener('click', (e) => { if (e.target === dlg) close(); });
  dlg.addEventListener('close', () => { film.pause(); if (loop && !matchMedia('(prefers-reduced-motion: reduce)').matches) loop.play().catch(() => {}); });
});
