/* Home hero: the full film plays muted with a one-click sound switch; "Watch the film" opens it from the start, with sound and controls. */
addEventListener('DOMContentLoaded', () => {
  const loop = document.getElementById('heroLoop'), dlg = document.getElementById('filmDlg'), film = document.getElementById('filmDlgVideo');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // The loop file is attached once the page has loaded, so the poster image paints first (mobile speed)
  const attach = () => { if (loop && !loop.getAttribute('src')) loop.src = loop.dataset.src; };
  if (loop && reduce) { loop.removeAttribute('autoplay'); loop.pause(); }
  if (loop && !reduce) document.readyState === 'complete' ? attach() : addEventListener('load', attach, { once: true });
  // Sound switch: the button shows the state of the hero film (aria-pressed = sound on)
  const sb = document.querySelector('[data-sound="#heroLoop"]');
  const sync = () => sb && sb.setAttribute('aria-pressed', String(!loop.muted));
  if (sb && loop) {
    sb.addEventListener('click', () => { attach(); loop.muted = !loop.muted; if (loop.paused) loop.play().catch(() => {}); sync(); });
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
  dlg.addEventListener('close', () => { film.pause(); if (loop && !reduce) { attach(); loop.play().catch(() => {}); } });
});
