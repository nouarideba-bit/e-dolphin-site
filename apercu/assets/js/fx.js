/* Motion effects for every page (24 Oct 2026): a lively site, still in the brand's calm, premium register.
   They use the self-hosted Motion bundle (vendor-motion.min.js, window.Motion). Nothing runs when the visitor asks for reduced
   motion, or if the bundle did not load: the page then behaves as before (titles hidden by styles.css show after 2 s at most).
   1. Home hero: entrance (eyebrow, title word by word, buttons with a spring), then parallax as the hero scrolls away.
   2. Page titles: words slide up behind a mask as they come into view.
   3. Small eyebrow labels: letters close up as they appear.
   4. Photos: unveiled from the bottom, with a slow zoom-out.
   5. Groups of cards appear one after the other, row by row.
   6. Buttons and cards give a small spring when pressed; on a computer, main buttons lean toward the mouse.
   7. Launch Edition plate: tilts toward the pointer or the finger, settles back with a spring; on phones it turns with the scroll.
   The livery cross-fade lives in home.js and uses Motion when it is here.
   Scale and translation use the separate CSS properties `scale` and `translate`, so the existing hover effects (transform) still work.
   Elements handled here are marked [data-fx]: site.js leaves them out of its own reveal. */
(() => {
  const M = window.Motion;
  if (!M || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const { animate, scroll, inView, stagger, press } = M;
  const EASE = [0.2, 0.7, 0.2, 1], OUT = [0.16, 1, 0.3, 1];
  const SKIP = '[data-fx], .cfg-light, form, dialog';
  const below = (el) => el.getBoundingClientRect().top > innerHeight * 0.95;

  /* Words behind a mask. Only text nodes are split, so links, line breaks and coloured spans keep working;
     a title painted with a gradient (background-clip: text) is left whole and simply fades in. */
  const split = (el) => {
    const clipped = [el, ...el.querySelectorAll('*')].some((n) => { const s = getComputedStyle(n); return (s.webkitBackgroundClip || s.backgroundClip) === 'text'; });
    if (clipped) return [];
    const words = [];
    const walk = (node) => [...node.childNodes].forEach((c) => {
      if (c.nodeType === 3) {
        if (!c.textContent.trim()) return;
        const frag = document.createDocumentFragment();
        c.textContent.split(/([ \n\t]+)/).forEach((t) => {
          if (!t) return;
          if (/^[ \n\t]+$/.test(t)) { frag.append(' '); return; }
          const w = document.createElement('span'), i = document.createElement('span');
          w.className = 'fx-w'; i.textContent = t; w.append(i); frag.append(w); words.push(i);
        });
        c.replaceWith(frag);
      } else if (c.nodeType === 1 && !/^(br|svg|img|picture|video)$/i.test(c.tagName)) walk(c);
    });
    walk(el);
    words.forEach((w) => { w.style.translate = '0 110%'; });
    return words;
  };
  const rise = (words, startDelay = 0) =>
    animate(words, { translate: ['0 110%', '0 0'] }, { delay: stagger(0.045, { startDelay }), duration: 0.85, ease: OUT });

  /* 5. Cascade of cards (marked first: the titles below skip anything inside a cascade) */
  const CARD = ':scope > :is(article, .stat, .home-model, .home-door, .glass, .card, a.rounded-2xl, div.rounded-2xl, li.rounded-2xl)';
  document.querySelectorAll('main .grid').forEach((g) => {
    if (g.closest(SKIP)) return;
    const items = [...g.querySelectorAll(CARD)];
    if (items.length < 3) return;
    g.dataset.fx = 'cascade';
    items.forEach((el) => {
      [el, ...el.querySelectorAll('.rise')].forEach((r) => r.classList.remove('rise'));
      el.style.opacity = '0';
    });
    // Cards on the same line form a row: each row cascades when it comes into view (on a phone, one card per row)
    const rows = new Map();
    items.forEach((el) => { const k = Math.round(el.offsetTop / 8); if (!rows.has(k)) rows.set(k, []); rows.get(k).push(el); });
    rows.forEach((row) => {
      let done = false;
      const show = () => {
        if (done) return; done = true;
        row.forEach((el) => { el.style.transition = 'none'; });
        animate(row, { opacity: [0, 1], translate: ['0 28px', '0 0'] }, { delay: stagger(0.1), duration: 0.8, ease: EASE })
          .then(() => row.forEach((el) => { el.style.transition = ''; }));
      };
      row.forEach((el) => inView(el, show, { amount: 0.2 }));
    });
  });

  /* 1. Home hero: entrance, then parallax */
  const hero = document.querySelector('.home-hero > figure');
  const heroCopy = hero && hero.querySelector('.hero-copy');
  if (heroCopy) {
    let t = 0.15;
    [...heroCopy.children].forEach((k) => {
      k.style.animation = 'none';               // styles.css kept it hidden until now; the entrance takes over
      k.dataset.fx = 'intro';
      if (k.tagName === 'H1') {
        const words = split(k); k.style.opacity = '1';
        if (words.length) { rise(words, t); t += 0.35 + words.length * 0.045; } else { animate(k, { opacity: [0, 1] }, { delay: t, duration: 0.8 }); t += 0.4; }
      } else if (k.querySelector('a, button')) {
        k.style.opacity = '1';
        const kids = [...k.children];
        kids.forEach((b) => { b.style.opacity = '0'; });
        animate(kids, { opacity: [0, 1], translate: ['0 16px', '0 0'] }, { delay: stagger(0.09, { startDelay: t }), type: 'spring', stiffness: 260, damping: 22 });
        t += 0.3;
      } else if (k.classList.contains('font-mono') || /uppercase/.test(k.className)) {
        animate(k, { opacity: [0, 1], letterSpacing: ['0.6em', getComputedStyle(k).letterSpacing] }, { delay: t, duration: 1.1, ease: OUT });
        t += 0.12;
      } else {
        animate(k, { opacity: [0, 1], translate: ['0 14px', '0 0'] }, { delay: t, duration: 0.8, ease: EASE });
        t += 0.15;
      }
    });
    const media = hero.querySelector('#heroLoop');
    scroll((p) => {
      // the footage moves down by at most 18 % while the hero leaves: the gap it opens stays above the screen
      if (media) media.style.translate = `0 ${(p * 18).toFixed(2)}%`;
      heroCopy.style.opacity = String(Math.max(0, 1 - p * 1.6)); heroCopy.style.translate = `0 ${(-p * 48).toFixed(1)}px`;
    }, { target: hero, offset: ['start start', 'end start'] });
  }

  /* 2. Titles (styles.css hides them until this runs: each one is either animated here or shown at once) */
  document.querySelectorAll('main h1, main section > div > h2').forEach((h) => {
    if (h.closest('.hero-copy')) return;
    h.style.animation = 'none';
    if (h.closest(SKIP)) { h.style.opacity = '1'; return; }
    h.dataset.fx = 'title';
    const words = split(h);
    if (words.length) { h.style.opacity = '1'; inView(h, () => { rise(words); }, { amount: 0.4 }); }
    else inView(h, () => { animate(h, { opacity: [0, 1], translate: ['0 18px', '0 0'] }, { duration: 0.8, ease: EASE }); }, { amount: 0.4 });
  });

  /* 3. Eyebrow labels further down the page */
  document.querySelectorAll('main .eyebrow, main .eyebrow-sand').forEach((e) => {
    if (e.closest(SKIP) || !below(e)) return;
    e.dataset.fx = 'eyebrow';
    const spacing = getComputedStyle(e).letterSpacing;
    e.style.opacity = '0';
    inView(e, () => { animate(e, { opacity: [0, 1], letterSpacing: ['0.6em', spacing] }, { duration: 1.1, ease: OUT }); }, { amount: 0.6 });
  });

  /* 4. Photos further down the page: unveiled from the bottom, slow zoom-out */
  // The mask goes on the picture, never on the figure: a fully clipped element is never "in view" for the browser,
  // so the figure (unclipped) is what is watched.
  document.querySelectorAll('main figure').forEach((fig) => {
    if (fig === hero || fig.closest(SKIP) || !below(fig)) return;
    fig.dataset.fx = 'unveil';
    fig.querySelectorAll('.rise').forEach((r) => r.classList.remove('rise'));
    const pic = fig.querySelector('img, video');
    fig.style.opacity = '0';
    if (pic) pic.style.clipPath = 'inset(100% 0 0 0)';
    inView(fig, () => {
      animate(fig, { opacity: [0, 1] }, { duration: 0.5 });
      if (!pic) { animate(fig, { translate: ['0 24px', '0 0'] }, { duration: 0.8, ease: EASE }); return; }
      animate(pic, { clipPath: ['inset(100% 0 0 0)', 'inset(0% 0 0 0)'] }, { duration: 1.1, ease: [0.7, 0, 0.2, 1] })
        .then(() => { pic.style.clipPath = ''; });
      animate(1.12, 1, { duration: 1.6, ease: OUT, onUpdate: (v) => { pic.style.scale = String(v); } });
    }, { amount: 0.25 });
  });

  /* 6. Spring on press, everywhere; magnetic main buttons with a mouse */
  const running = new WeakMap();
  const springScale = (el, to) => {
    if (running.has(el)) running.get(el).stop();
    const from = parseFloat(el.style.scale) || 1;
    running.set(el, animate(from, to, { type: 'spring', stiffness: 520, damping: to < 1 ? 34 : 15, onUpdate: (v) => { el.style.scale = String(v); } }));
  };
  press('.btn-primary, .btn-ghost, [data-film-open], .home-door, .home-model, .liv-btn, .rail-item', (el) => {
    springScale(el, 0.965);
    return () => springScale(el, 1);
  });
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    document.querySelectorAll('.btn-primary, [data-film-open]').forEach((b) => {
      let ctl = null;
      const to = (x, y, soft) => {
        if (ctl) ctl.stop();
        const [fx = 0, fy = 0] = (b.style.translate || '').split(' ').map((v) => parseFloat(v) || 0);
        ctl = animate(0, 1, { type: 'spring', stiffness: soft ? 150 : 300, damping: soft ? 12 : 24,
          onUpdate: (k) => { b.style.translate = `${(fx + (x - fx) * k).toFixed(2)}px ${(fy + (y - fy) * k).toFixed(2)}px`; } });
      };
      b.addEventListener('pointermove', (e) => { const r = b.getBoundingClientRect(); to((e.clientX - r.left - r.width / 2) * 0.18, (e.clientY - r.top - r.height / 2) * 0.3); });
      b.addEventListener('pointerleave', () => to(0, 0, true));
    });
  }

  /* 7. Launch Edition plate */
  document.querySelectorAll('.plaque-wrap').forEach((wrap) => {
    const card = wrap.querySelector('.plaque-float');
    if (!card) return;
    const REST = { x: 8, y: -14 };              // the resting angle set in styles.css
    let cur = { ...REST }, ctl = null, held = false;
    const set = (v) => { card.style.transform = `perspective(1200px) rotateX(${v.x.toFixed(2)}deg) rotateY(${v.y.toFixed(2)}deg)`; };
    const go = (to, soft) => {
      if (ctl) ctl.stop();
      const from = { ...cur };
      ctl = animate(0, 1, {
        type: 'spring', stiffness: soft ? 110 : 260, damping: soft ? 14 : 26,
        onUpdate: (k) => { cur = { x: from.x + (to.x - from.x) * k, y: from.y + (to.y - from.y) * k }; set(cur); }
      });
    };
    card.style.transition = 'filter .6s';       // the CSS hover tilt hands over to the spring
    wrap.style.touchAction = 'pan-y';           // a vertical swipe still scrolls; a sideways one turns the plate
    set(cur);
    const toward = (e) => {
      const r = wrap.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5, py = (e.clientY - r.top) / r.height - 0.5;
      go({ x: REST.x - py * 16, y: REST.y + px * 30 });
    };
    wrap.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') { held = true; toward(e); } });
    wrap.addEventListener('pointermove', (e) => { if (e.pointerType === 'mouse' || held) toward(e); });
    const release = () => { held = false; go(REST, true); };
    wrap.addEventListener('pointerleave', release);
    wrap.addEventListener('pointerup', (e) => { if (e.pointerType !== 'mouse') release(); });
    wrap.addEventListener('pointercancel', release);
    // Phones: the plate turns slowly as it crosses the screen, so it feels alive before anyone touches it
    if (matchMedia('(pointer: coarse)').matches) {
      scroll((p) => {
        if (held) return;
        if (ctl) { ctl.stop(); ctl = null; }
        cur = { x: REST.x - (p - 0.5) * 10, y: REST.y + (p - 0.5) * 26 }; set(cur);
      }, { target: wrap, offset: ['start end', 'end start'] });
    }
  });
})();
