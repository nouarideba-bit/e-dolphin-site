/* "Discover E-Dolphin": chapter links jump the film to a moment and play it with sound. */
addEventListener('DOMContentLoaded', () => {
  const film = document.getElementById('filmPlayer');
  const loop = document.querySelector('.disc-hero video');
  if (loop && matchMedia('(prefers-reduced-motion: reduce)').matches) loop.pause();
  document.querySelectorAll('[data-play]').forEach(a => a.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('film').scrollIntoView({ behavior: 'smooth', block: 'start' });
    const go = () => { film.currentTime = +a.dataset.play; film.play().catch(() => {}); };
    film.readyState >= 1 ? go() : film.addEventListener('loadedmetadata', go, { once: true });
    if (film.readyState < 1) film.load();
  }));
  film.addEventListener('play', () => loop && loop.pause());
  film.addEventListener('pause', () => loop && !matchMedia('(prefers-reduced-motion: reduce)').matches && loop.play().catch(() => {}));
});
