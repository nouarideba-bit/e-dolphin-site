/* "Discover E-Dolphin": the hero plays the film muted with a one-click sound switch;
   chapter links jump the film below to a moment and play it with sound. */
addEventListener('DOMContentLoaded', () => {
  const film = document.getElementById('filmPlayer'), hero = document.getElementById('heroFilm');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (hero && reduce) hero.pause();

  // Sound switches: the button shows the state of its video (aria-pressed = sound on)
  const btns = [...document.querySelectorAll('[data-sound]')];
  const sync = () => btns.forEach(b => b.setAttribute('aria-pressed', String(!document.querySelector(b.dataset.sound).muted)));
  btns.forEach(b => b.addEventListener('click', () => {
    const v = document.querySelector(b.dataset.sound);
    v.muted = !v.muted;
    if (!v.muted && v.paused) v.play().catch(() => {});
    sync();
  }));
  [film, hero].forEach(v => v && v.addEventListener('volumechange', sync));
  sync();

  document.querySelectorAll('[data-play]').forEach(a => a.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('film').scrollIntoView({ behavior: 'smooth', block: 'start' });
    const go = () => { film.currentTime = +a.dataset.play; film.muted = false; film.play().catch(() => {}); };
    film.readyState >= 1 ? go() : film.addEventListener('loadedmetadata', go, { once: true });
    if (film.readyState < 1) film.load();
  }));
  // One soundtrack at a time: the hero goes quiet and pauses while the film plays
  film.addEventListener('play', () => { if (hero) { hero.muted = true; hero.pause(); sync(); } });
  film.addEventListener('pause', () => { if (hero && !reduce) hero.play().catch(() => {}); });
});
