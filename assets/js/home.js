/* Home page (next version): announcement band, sound lines, livery picker, counters, plate number. */
addEventListener('DOMContentLoaded', () => {
  const root = LANG === 'en' ? '../' : '';
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Announcement band, closed for the session once dismissed
  const band = document.getElementById('annonce');
  try { if (sessionStorage.getItem('ed-annonce') === '0') band.hidden = true; } catch (_) {}
  document.getElementById('annonceClose').addEventListener('click', () => { band.hidden = true; try { sessionStorage.setItem('ed-annonce', '0'); } catch (_) {} });

  // Two sound lines: the petrol engine is a dense jagged line, IRUKA a slow swell
  const loud = document.querySelector('.wave-loud'), calm = document.querySelector('.wave-calm');
  if (loud && calm) {
    const draw = (ph) => {
      let a = 'M0 20', b = 'M0 20';
      for (let x = 2; x <= 300; x += 2) {
        const y1 = 20 + Math.sin(x * .9 + ph * 3) * 9 * (0.55 + 0.45 * Math.sin(x * .07 + ph)) + Math.sin(x * 2.3 + ph * 5) * 5;
        const y2 = 20 + Math.sin(x * .045 + ph) * 3.2;
        a += ` L${x} ${y1.toFixed(1)}`; b += ` L${x} ${y2.toFixed(1)}`;
      }
      loud.setAttribute('d', a); calm.setAttribute('d', b);
    };
    let ph = 0, on = false, raf = 0; draw(0);
    // Animate only while the lines are on screen: an endless loop off screen drains phone batteries (24 Oct)
    const loop = () => { ph += .03; draw(ph); raf = on ? requestAnimationFrame(loop) : 0; };
    if (!reduceMotion) new IntersectionObserver(([e]) => { on = e.isIntersecting; if (on && !raf) raf = requestAnimationFrame(loop); }).observe(loud.closest('svg') || loud);
  }

  // Livery picker: swap the studio render and the configurator links
  const imgEl = document.getElementById('livImg'), cap = document.getElementById('livCap');
  const go = document.getElementById('livGo'), go360 = document.getElementById('liv360');
  const btns = [...document.querySelectorAll('.liv-btn')];
  btns.forEach(b => {
    const pre = new Image(); pre.src = `${root}assets/img/cfg-${b.dataset.liv}-profil.jpg`;
    b.addEventListener('click', () => {
      btns.forEach(o => o.setAttribute('aria-checked', String(o === b)));
      imgEl.style.opacity = 0;
      setTimeout(() => { imgEl.src = pre.src; imgEl.style.opacity = 1; }, reduceMotion ? 0 : 180);
      cap.textContent = b.dataset.name;
      go.href = `${pageHref('configurateur')}?modele=iruka&livree=${b.dataset.liv}`;
      go360.href = `${pageHref('configurateur')}?modele=${b.dataset.liv === 'predator' ? 'launch' : 'iruka'}&livree=${b.dataset.liv}&vue=profil`;
    });
  });
  // Arrow keys move between liveries (radio group behaviour)
  document.querySelector('[role=radiogroup]').addEventListener('keydown', (e) => {
    const i = btns.findIndex(b => b.getAttribute('aria-checked') === 'true');
    const d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
    if (!d) return; e.preventDefault();
    const n = btns[(i + d + btns.length) % btns.length]; n.click(); n.focus();
  });

  // Counters run once when the numbers come into view
  const fmt = (v, dec) => v.toLocaleString(LANG === 'fr' ? 'fr-FR' : 'en-GB', { minimumFractionDigits: dec, maximumFractionDigits: dec });
  const nums = [...document.querySelectorAll('[data-count]')];
  if (!reduceMotion) {
    const io = new IntersectionObserver((es) => es.forEach(e => {
      if (!e.isIntersecting) return; io.unobserve(e.target);
      const el = e.target, end = +el.dataset.count, dec = +el.dataset.dec, t0 = performance.now();
      (function step(t) { const k = Math.min(1, (t - t0) / 1400), v = end * (1 - Math.pow(1 - k, 3)); el.textContent = fmt(v, dec); if (k < 1) requestAnimationFrame(step); })(t0);
    }), { threshold: .3 });
    nums.forEach(n => { n.textContent = fmt(0, +n.dataset.dec); io.observe(n); });
  }

  // The hero ticket cycles through a few plate numbers
  const heroNum = document.getElementById('heroNum');
  if (heroNum && !reduceMotion) {
    const seq = ['001', '007', '042', '088', '150', '300'];
    let k = 0; setInterval(() => { k = (k + 1) % seq.length; heroNum.textContent = seq[k]; }, 2200);
  }
});
