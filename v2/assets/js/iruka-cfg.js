/* IRUKA configurator, modelled on the Porsche one (preview, 27 Oct 2026): the craft on stage, options by category in a
   side panel, live price, E-Dolphin code, summary. Catalogue: iruka-catalog.js, plus the accessories of cfg-options.js.
   Animations use Motion (window.Motion, the engine of Framer Motion; adam, 27 Oct: "Utilise framer Motion"); none run when
   the visitor asks for reduced motion. The configuration lives in the URL (?code=ED1-…), so it can be shared or reopened. */
addEventListener('DOMContentLoaded', () => {
  const C = window.IRUKA_CFG, ACC = window.CFG_OPTIONS || [];
  if (!C || !$('#xPanel')) return;
  const root = document.documentElement.lang === 'fr' ? '' : '../';
  const IMG = (f) => `${root}assets/img/${f}`;
  const Mo = !reduce && window.Motion;
  const EASE = [.2, .7, .2, 1];
  const T = (o) => (o && typeof o === 'object' ? o[LANG] ?? o.fr : o);
  const r2 = (n) => Math.round(n * 100) / 100;
  const fmt = (n) => Cart.money(r2(n), '€ HT');
  const slug = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const paint = (el) => window.renderIcons && renderIcons(el);

  /* ---- Catalogue: groups > sections > items; accessories slotted in by category ---- */
  const ACC_ICONS = [
    { cat: 'Électronique et navigation', icon: 'map' }, { cat: 'Audio', icon: 'speaker' }, { cat: 'Confort', icon: 'armchair' },
    { cat: 'Sports nautiques', icon: 'waves' }, { cat: 'Amarrage', icon: 'anchor' }, { cat: 'Rangement et sacs', icon: 'box' },
    { cat: 'Glacières', icon: 'snowflake' }, { cat: 'Bâches et protection', icon: 'shield' }, { cat: 'Sièges', icon: 'armchair' },
    { cat: 'Sécurité et utilitaires', icon: 'life-buoy' }
  ];
  const accIcon = (cat) => (ACC_ICONS.find(a => a.cat === cat) || { icon: 'plus' }).icon;
  const ITEMS = new Map();
  const GROUPS = C.groups.map(g => {
    const sections = g.sections.map(s => ({ ...s, items: s.items.map(i => ({ ...i })) }));
    (g.accessories || []).forEach(cat => {
      const list = ACC.filter(o => o.cat.fr === cat).map(o => ({ ...o, n: 100 + ACC.indexOf(o), icon: accIcon(cat) }));
      (g.extra || []).filter(e => e.cat === cat).forEach(e => list.push({ ...e, icon: accIcon(cat) }));
      const first = ACC.find(o => o.cat.fr === cat);
      if (list.length) sections.push({ id: 'acc-' + slug(cat), fr: cat, en: first ? first.cat.en : cat, items: list });
    });
    return { ...g, sections };
  });
  GROUPS.forEach(g => g.sections.forEach(s => s.items.forEach(i => { i.g = g; i.s = s; ITEMS.set(i.id, i); })));
  const ONE = GROUPS.flatMap(g => g.sections).filter(s => s.pick === 'one');
  const BY_N = new Map([...ITEMS.values()].map(i => [i.n, i]));

  /* ---- State and E-Dolphin code ---- */
  const S = { pick: Object.fromEntries(ONE.map(s => [s.id, s.items[0].id])), on: new Set(), view: 'a045', group: GROUPS[0].id };
  const B32 = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
  // The code lists what differs from the standard IRUKA, two characters per item (its number n in base 32)
  const encode = () => {
    const ns = [...ONE.filter(s => S.pick[s.id] !== s.items[0].id).map(s => ITEMS.get(S.pick[s.id]).n), ...[...S.on].map(id => ITEMS.get(id).n)].sort((a, b) => a - b);
    return ['ED1', ...(ns.map(n => B32[n >> 5] + B32[n & 31]).join('').match(/.{1,4}/g) || [])].join('-');
  };
  const decode = (code) => {
    const m = String(code || '').toUpperCase().replace(/[^0-9A-Z]/g, '').replace(/^ED1/, '');
    for (let k = 0; k + 1 < m.length; k += 2) {
      const a = B32.indexOf(m[k]), b = B32.indexOf(m[k + 1]);
      const it = a < 0 || b < 0 ? null : BY_N.get(a * 32 + b);
      if (!it || it.std) continue;
      if (it.s.pick === 'one') S.pick[it.s.id] = it.id; else S.on.add(it.id);
    }
    [...S.on].forEach(id => (ITEMS.get(id).pack || []).forEach(x => S.on.delete(x)));
  };

  /* ---- Price ---- */
  const packOf = (id) => { for (const p of S.on) { const it = ITEMS.get(p); if (it.pack && it.pack.includes(id)) return it; } return null; };
  const isOn = (it) => (it.s.pick === 'one' ? S.pick[it.s.id] === it.id : !!it.std || S.on.has(it.id) || !!packOf(it.id));
  const bespoke = () => S.on.has('mesure');
  const cost = (it) => (it.price == null || it.std || packOf(it.id) || (it.s.id === 'livery' && bespoke()) ? 0 : it.price);
  const chosen = () => [...ONE.map(s => ITEMS.get(S.pick[s.id])), ...[...S.on].map(id => ITEMS.get(id))];
  const optTotal = () => r2(chosen().reduce((a, it) => a + cost(it), 0));
  const total = () => r2(C.base + optTotal());
  const deposit = () => Math.round(total() * C.deposit) / 100;
  const saving = (p) => Math.round(p.pack.reduce((a, id) => a + ((ITEMS.get(id) || {}).price || 0), 0) - p.price); // whole euros: easier to read than 94,97 €
  const quoted = () => chosen().filter(it => it.price == null);
  const priceLabel = (it) => {
    if (it.std) return tt('De série', 'Standard');
    const p = packOf(it.id);
    if (p) return tt('Inclus · ', 'Included · ') + T(p);
    if (it.price == null) return tt('Sur devis', 'On quotation');
    if (it.s.id === 'livery' && bespoke()) return tt('Sur mesure', 'Bespoke');
    if (!it.price) return it.s.pick === 'one' && it === it.s.items[0] ? tt('De série', 'Standard') : tt('Inclus', 'Included');
    return '+ ' + fmt(it.price);
  };

  /* ---- Stage: renders of the chosen livery, 24 angles, drag to turn ---- */
  const FRAMES = ['face', 'a015', 'a030', 'a045', 'a060', 'a075', 'profil', 'a105', 'a120', 'a135', 'a150', 'a165', 'a180', 'a195', 'arriere', 'a225', 'a240', 'a255', 'a270', 'a285', 'a300', 'a315', 'a330', 'a345'];
  const VNAME = { face: ['Face', 'Front'], a045: ['3/4 avant', '3/4 front'], profil: ['Profil', 'Side'], a135: ['3/4 arrière', '3/4 rear'], arriere: ['Arrière', 'Rear'], dessus: ['Dessus', 'Top'] };
  const viewName = (v) => (VNAME[v] ? tt(...VNAME[v]) : `${+v.slice(1)}°`);
  const img = $('#xImg'), stage = $('#xStage'), CACHE = {};
  const src = (v = S.view, l = S.pick.livery) => IMG(`cfg-${l}-${v}.jpg`);
  const load = (u) => new Promise((ok, ko) => {
    const p = CACHE[u] || (CACHE[u] = new Image());
    if (p.src && p.complete) return p.naturalWidth ? ok(p) : ko();
    p.addEventListener('load', () => ok(p), { once: true }); p.addEventListener('error', ko, { once: true });
    if (!p.src) p.src = u;
  });

  /* ---- Upholstery and deck pads repainted on the renders, as the manufacturer's configurator shows each choice on the car
     (adam, 27 Oct: "quand on clique sur la couleur de la selle … on doit le voir sur les photos"). A mask per render says where
     the seat or deck pads are (iruka-masks.js); the chosen colour replaces theirs and keeps the render's light and shade. ---- */
  const MASKS = window.IRUKA_MASKS || { seat: {}, deck: {} };
  const PARTS = [['seat', 'selle'], ['deck', 'pont']];
  const look = (v = S.view, l = S.pick.livery) => {
    const parts = PARTS.map(([sec, word]) => {
      const it = ITEMS.get(S.pick[sec]), box = it && it.t && (MASKS[sec][l] || {})[v];
      return box ? { it, box, flat: sec === 'deck', mask: IMG(`cfg-${l}-${v}-${word}.png`) } : null;
    }).filter(Boolean);
    return { v, l, parts, key: [l, v, ...parts.map(p => p.it.id)].join('|') };
  };
  const rgb = (h) => [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16));
  const repaint = (ctx, mask, [x, y, w, h], it, flat) => {
    const px = ctx.getImageData(x, y, w, h), d = px.data, N = w * h;
    const mc = document.createElement('canvas'); mc.width = w; mc.height = h;
    const mx = mc.getContext('2d', { willReadFrequently: true }); mx.drawImage(mask, 0, 0);
    const a = mx.getImageData(0, 0, w, h).data;
    const L = new Float32Array(N);
    for (let i = 0; i < N; i++) L[i] = .2126 * d[i * 4] + .7152 * d[i * 4 + 1] + .0722 * d[i * 4 + 2];
    // Reference shade: the 60th percentile of the part's luminance, so a black or a grey seat both land on the chosen colour
    const hist = new Uint32Array(256); let n = 0;
    for (let i = 0; i < N; i++) if (a[i * 4] > 128) { hist[Math.min(255, L[i] | 0)]++; n++; }
    let ref = 1;
    for (let k = 0, c = 0; k < 256; k++) { c += hist[k]; if (c >= n * .6) { ref = Math.max(k, 1); break; } }
    const [r, g, b] = rgb(it.t);
    // Deck pads are foam: their carbon weave on the render is no use, keep only the broad light (a wide blur, low contrast)
    let F = null;
    if (flat) {
      const R = 7, tmp = new Float32Array(N); F = new Float32Array(N);
      for (let yy = 0; yy < h; yy++) for (let xx = 0; xx < w; xx++) { let s = 0, m = 0; for (let k = -R; k <= R; k++) { const q = xx + k; if (q >= 0 && q < w) { s += L[yy * w + q]; m++; } } tmp[yy * w + xx] = s / m; }
      for (let xx = 0; xx < w; xx++) for (let yy = 0; yy < h; yy++) { let s = 0, m = 0; for (let k = -R; k <= R; k++) { const q = yy + k; if (q >= 0 && q < h) { s += tmp[q * w + xx]; m++; } } F[yy * w + xx] = s / m; }
    }
    for (let i = 0; i < N; i++) {
      const al = a[i * 4] / 255;
      if (!al) continue;
      const cx = i % w, cy = (i / w) | 0;
      // Soften the render's grain a little (3 x 3 average), or a pale leather drawn over a dark one looks dusty
      let s = 0, m = 0;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        const xx = cx + dx, yy = cy + dy;
        if (xx >= 0 && yy >= 0 && xx < w && yy < h) { s += L[yy * w + xx]; m++; }
      }
      let k = F ? Math.min(Math.max(1 + .35 * (F[i] / ref - 1), .7), 1.12) : Math.pow(Math.min((.6 * L[i] + .4 * s / m) / ref, 1.35), .85);
      if (it.planks) { // teak: strakes along the hull, a dark seam every 9 px, each strake a slightly different tone
        const row = Math.floor((y + cy) / 9), f = Math.sin(row * 12.9898) * 43758.5453;
        k *= ((y + cy) % 9 < 1.4 ? .45 : 1) * (.94 + .12 * (f - Math.floor(f))) * (.97 + .03 * Math.sin((x + cx) * .09 + row));
      }
      const sp = F ? 0 : Math.max(L[i] - 1.5 * ref, 0) * .8; // keep the highlights (not on foam)
      const o = i * 4;
      d[o] = d[o] * (1 - al) + Math.min(255, r * k + sp) * al;
      d[o + 1] = d[o + 1] * (1 - al) + Math.min(255, g * k + sp) * al;
      d[o + 2] = d[o + 2] * (1 - al) + Math.min(255, b * k + sp) * al;
    }
    ctx.putImageData(px, x, y);
  };
  const TINT = {};
  const tinted = (w) => TINT[w.key] || (TINT[w.key] = Promise.all([load(src(w.v, w.l)), ...w.parts.map(p => load(p.mask))]).then(([base, ...ms]) => {
    const cv = document.createElement('canvas'); cv.width = base.naturalWidth; cv.height = base.naturalHeight;
    const ctx = cv.getContext('2d', { willReadFrequently: true }); ctx.drawImage(base, 0, 0);
    w.parts.forEach((p, k) => repaint(ctx, ms[k], p.box, p.it, p.flat));
    return new Promise(ok => cv.toBlob(b => ok(b ? URL.createObjectURL(b) : src(w.v, w.l)), 'image/jpeg', .9));
  }).catch(() => src(w.v, w.l)));

  const showImage = (fade) => {
    const w = look();
    $('#xImgLabel').textContent = `${bespoke() ? tt('Teinte sur mesure · aperçu ', 'Bespoke colour · preview ') : ''}${T(ITEMS.get(S.pick.livery))} · ${viewName(S.view)}${w.parts.length ? tt(' · coloris en aperçu', ' · colours previewed') : ''}`;
    $$('[data-view]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.view === S.view)));
    img.alt = `IRUKA, ${T(ITEMS.get(S.pick.livery))}${w.parts.map(p => ', ' + T(p.it.s) + ' ' + T(p.it)).join('')}, ${viewName(S.view)}`;
    if (img.dataset.key === w.key) return;
    const swap = (u) => {
      if (look().key !== w.key) return; // a newer choice won the race
      img.src = u; img.dataset.key = w.key;
      if (fade && Mo) Mo.animate(img, { opacity: [.15, 1], scale: [1.025, 1] }, { duration: .6, ease: EASE });
    };
    if (w.parts.length) tinted(w).then(swap);
    else { const u = src(); load(u).then(() => swap(u), () => swap(u)); }
  };
  // Views where the seat reads well: choosing an upholstery brings the craft to one of them, the deck pads show from above
  const SEAT_VIEWS = ['a030', 'a045', 'a060', 'a075', 'profil', 'a105', 'a120', 'a135', 'a225', 'a240', 'a255', 'a270', 'a285', 'a300', 'a315', 'a330', 'dessus'];
  // Every angle of the livery is loaded at the first turn only (about 2.5 MB), not for visitors who never turn the craft
  let turning = false;
  const preload = () => turning && FRAMES.forEach(v => { const u = src(v); if (!CACHE[u]) { CACHE[u] = new Image(); CACHE[u].src = u; } });
  const turn = (d) => {
    if (!turning) { turning = true; preload(); }
    const i = Math.max(0, FRAMES.indexOf(S.view)); S.view = FRAMES[(i + d + FRAMES.length) % FRAMES.length]; showImage(false);
    // Repaint the next two angles ahead, so a turning craft keeps its upholstery without a wait
    [1, 2].forEach(k => { const w = look(FRAMES[(i + d * (k + 1) + 3 * FRAMES.length) % FRAMES.length]); if (w.parts.length) tinted(w); });
  };
  $('#xPrev').addEventListener('click', () => turn(-1));
  $('#xNext').addEventListener('click', () => turn(1));
  $$('[data-view]').forEach(b => b.addEventListener('click', () => { S.view = b.dataset.view; showImage(true); }));
  let dragX = null;
  stage.addEventListener('pointerdown', e => { if (e.target.closest('button')) return; dragX = e.clientX; stage.setPointerCapture(e.pointerId); stage.classList.add('is-grabbing'); });
  stage.addEventListener('pointermove', e => { if (dragX === null) return; const dx = e.clientX - dragX; if (Math.abs(dx) > 24) { turn(dx < 0 ? 1 : -1); dragX = e.clientX; } });
  const endDrag = () => { dragX = null; stage.classList.remove('is-grabbing'); };
  stage.addEventListener('pointerup', endDrag); stage.addEventListener('pointercancel', endDrag);

  // The paint finish has no render yet: a material card shows the chosen swatch over the stage
  let matT;
  const showMat = (it) => {
    const box = $('#xMat');
    const dot = it.c ? `<span class="cfgx-dot cfgx-dot-sm" style="background:linear-gradient(135deg, ${it.c[0]} 0 58%, ${it.c[1]} 58% 100%)"></span>` : `<span class="cfgx-ico !bg-white/10 !text-white"><i data-lucide="paintbrush" class="h-5 w-5"></i></span>`;
    box.innerHTML = `${dot}<span class="min-w-0"><span class="block text-[11px] uppercase tracking-[.14em] text-white/60">${T(it.s)}</span><span class="block text-sm font-semibold text-white">${T(it)}</span><span class="block text-[11px] text-white/60">${it.c ? tt('Aperçu matière · rendu à venir', 'Material preview · render to come') : tt('Échantillon validé avec l\'atelier', 'Sample approved with the atelier')}</span></span>`;
    paint(box); box.hidden = false;
    if (Mo) Mo.animate(box, { opacity: [0, 1], y: [16, 0] }, { duration: .4, ease: EASE });
    clearTimeout(matT);
    matT = setTimeout(() => { if (Mo) Mo.animate(box, { opacity: 0, y: 10 }, { duration: .3 }).then(() => { box.hidden = true; }); else box.hidden = true; }, 3800);
  };

  /* ---- Tabs: one per category, a sliding underline ---- */
  const tabs = $('#xTabs');
  tabs.innerHTML = GROUPS.map(g => `<button type="button" role="tab" class="cfgx-tab" data-g="${g.id}" aria-selected="false"><i data-lucide="${g.icon}" class="h-5 w-5"></i><span>${T(g)}</span><b class="cfgx-count num" hidden></b></button>`).join('') + '<span class="cfgx-ink" aria-hidden="true"></span>';
  paint(tabs);
  const ink = $('.cfgx-ink', tabs);
  const moveInk = (instant) => {
    const tab = $(`[data-g="${S.group}"]`, tabs);
    if (!tab) return;
    $$('[data-g]', tabs).forEach(b => b.setAttribute('aria-selected', String(b === tab)));
    if (Mo && !instant) Mo.animate(ink, { x: tab.offsetLeft, width: tab.offsetWidth }, { type: 'spring', stiffness: 420, damping: 36 });
    else { ink.style.transform = `translateX(${tab.offsetLeft}px)`; ink.style.width = tab.offsetWidth + 'px'; }
    tabs.scrollTo({ left: tab.offsetLeft - tabs.clientWidth / 2 + tab.offsetWidth / 2, behavior: reduce ? 'auto' : 'smooth' });
  };
  const counts = () => GROUPS.forEach(g => {
    const n = g.sections.reduce((a, s) => a + (s.pick === 'one' ? (S.pick[s.id] !== s.items[0].id ? 1 : 0) : s.items.filter(i => S.on.has(i.id)).length), 0);
    const b = $(`[data-g="${g.id}"] .cfgx-count`, tabs); b.textContent = n; b.hidden = !n;
  });
  $$('[data-g]', tabs).forEach(b => b.addEventListener('click', () => go(b.dataset.g)));
  // Fade the edge of the tab row where more categories hide
  const edges = () => { tabs.classList.toggle('fade-l', tabs.scrollLeft > 4); tabs.classList.toggle('fade-r', tabs.scrollLeft + tabs.clientWidth < tabs.scrollWidth - 4); };
  tabs.addEventListener('scroll', edges, { passive: true });
  addEventListener('resize', () => { moveInk(true); edges(); });

  /* ---- Panel: the sections of the current category ---- */
  const TIER = { serie: ['De série', 'Standard'], speciale: ['Teintes spéciales', 'Special colours'], signature: ['Signature', 'Signature'] };
  const tile = (it) => {
    const one = it.s.pick === 'one', on = isOn(it), locked = !!it.std || !!packOf(it.id);
    const name = one ? 'x-' + it.s.id : 'x-' + it.id;
    if (it.c) return `<label class="cfgx-sw${on ? ' is-on' : ''}" data-id="${it.id}">
        <input type="radio" name="${name}" value="${it.id}" class="sr-only"${on ? ' checked' : ''}>
        <span class="cfgx-dot" style="background:linear-gradient(135deg, ${it.c[0]} 0 58%, ${it.c[1]} 58% 100%)"></span>
        <span class="text-xs font-medium leading-tight">${T(it)}</span>
        <span class="num text-[11px] text-ink2">${priceLabel(it)}</span>
      </label>`;
    const pack = it.pack ? `<span class="mt-1 block text-xs text-ink2">${it.pack.map(id => T(ITEMS.get(id))).join(' · ')}</span><span class="mt-1 block text-xs font-semibold text-teal">${tt('Vous économisez', 'You save')} ${fmt(saving(it))}</span>` : '';
    return `<label class="cfgx-opt${on ? ' is-on' : ''}${locked ? ' is-locked' : ''}" data-id="${it.id}">
        <input type="${one ? 'radio' : 'checkbox'}" name="${name}" value="${it.id}" class="sr-only"${on ? ' checked' : ''}${locked ? ' disabled' : ''}>
        <span class="cfgx-ico"><i data-lucide="${it.icon || 'plus'}" class="h-5 w-5"></i></span>
        <span class="min-w-0 flex-1"><span class="block text-sm font-medium leading-snug">${T(it)}</span>${it.d ? `<span class="mt-0.5 block text-xs text-ink2">${T(it.d)}</span>` : ''}${pack}</span>
        <span class="num shrink-0 text-right text-sm font-semibold">${priceLabel(it)}</span>
        <span class="cfgx-tick"><i data-lucide="check" class="h-3.5 w-3.5"></i></span>
      </label>`;
  };
  const section = (s) => {
    let body;
    if (s.id === 'livery') body = Object.keys(TIER).map(k => { const its = s.items.filter(i => i.tier === k); return its.length ? `<p class="cfgx-sub">${tt(...TIER[k])}</p><div class="cfgx-swgrid">${its.map(tile).join('')}</div>` : ''; }).join('');
    else body = s.items.every(i => i.c) ? `<div class="cfgx-swgrid">${s.items.map(tile).join('')}</div>` : `<div class="grid gap-2">${s.items.map(tile).join('')}</div>`;
    const sub = s.pick === 'one' ? `<span class="truncate text-xs text-ink2">${T(ITEMS.get(S.pick[s.id]))}</span>` : '';
    const note = s.id === 'livery' && bespoke() ? `<p class="mt-3 rounded-xl bg-[#EAF7F8] px-3 py-2 text-xs text-ink2">${tt('Teinte sur mesure choisie dans l\'Atelier : la livrée ne sert plus que d\'aperçu et n\'est pas facturée.', 'Bespoke colour chosen in the Atelier: the livery is only a preview and is not charged.')}</p>` : '';
    return `<section class="cfgx-sec" data-s="${s.id}"><div class="flex items-baseline justify-between gap-3"><h3 class="font-display text-lg font-semibold">${T(s)}</h3>${sub}</div>${note}<div class="mt-3">${body}</div></section>`;
  };
  const panel = $('#xPanel');
  const renderPanel = (fx) => {
    const g = GROUPS.find(x => x.id === S.group), i = GROUPS.indexOf(g), prev = GROUPS[i - 1], next = GROUPS[i + 1];
    const intro = g.id === 'packs' ? `<p class="cfgx-sec text-sm text-ink2">${tt('Un pack réunit plusieurs équipements à un prix plus doux qu\'à l\'unité.', 'A pack brings several items together at a lower price than one by one.')}</p>` : '';
    const focusId = document.activeElement && panel.contains(document.activeElement) ? document.activeElement.value : null;
    const keep = panel.scrollTop;
    panel.innerHTML = `<div class="cfgx-pad">${intro}${g.sections.map(section).join('')}
      <div class="cfgx-nav mt-8 flex items-center justify-between gap-3">
        ${prev ? `<button type="button" data-go="${prev.id}" class="cfg-ghost inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold"><i data-lucide="arrow-left" class="h-4 w-4"></i>${T(prev)}</button>` : '<span></span>'}
        ${next ? `<button type="button" data-go="${next.id}" class="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold">${T(next)}<i data-lucide="arrow-right" class="h-4 w-4"></i></button>`
          : `<button type="button" data-sum class="btn-primary inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold">${tt('Voir le résumé', 'See the summary')}<i data-lucide="arrow-right" class="h-4 w-4"></i></button>`}
      </div></div>`;
    paint(panel);
    panel.scrollTop = fx ? 0 : keep;
    $$('input', panel).forEach(inp => inp.addEventListener('change', () => choose(ITEMS.get(inp.value), inp.checked)));
    $$('[data-go]', panel).forEach(b => b.addEventListener('click', () => go(b.dataset.go)));
    $$('[data-sum]', panel).forEach(b => b.addEventListener('click', openSum));
    if (focusId) { const f = $(`input[value="${focusId}"]`, panel); if (f) f.focus({ preventScroll: true }); }
    if (fx && Mo) Mo.animate($$('.cfgx-sec, .cfgx-nav', panel), { opacity: [0, 1], y: [14, 0] }, { duration: .4, delay: Mo.stagger(.05), ease: EASE });
  };
  const go = (id) => {
    S.group = id; moveInk(false); renderPanel(true);
    // On phones the page scrolls: bring the first section under the sticky stage and tabs
    if (innerWidth < 1024) {
      const top = panel.getBoundingClientRect().top + scrollY - tabs.getBoundingClientRect().bottom + 8;
      if (scrollY > top) scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
    }
  };
  const choose = (it, checked) => {
    if (it.s.pick === 'one') S.pick[it.s.id] = it.id;
    else if (checked) { S.on.add(it.id); (it.pack || []).forEach(id => S.on.delete(id)); }
    else S.on.delete(it.id);
    if (it.s.id === 'livery') { preload(); showImage(true); }
    else if (it.s.id === 'seat' || it.s.id === 'deck') {
      // Like the manufacturer's camera: the craft turns to show the part just chosen
      const v = it.s.id === 'deck' ? 'dessus' : SEAT_VIEWS.includes(S.view) ? S.view : 'a045';
      const moved = v !== S.view; S.view = v; showImage(moved || !!it.t);
    }
    else if (it.c || (it.id === 'mesure' && checked)) showMat(it);
    if (it.id === 'mesure') showImage(false);
    renderPanel(false); sync();
    const el = $(`[data-id="${it.id}"]`, panel);
    if (el && Mo) Mo.animate(el, { scale: [.96, 1] }, { type: 'spring', stiffness: 520, damping: 22 });
  };

  /* ---- Price bar: figures roll to their new value ---- */
  const shown = {};
  const setNum = (key, v, prefix = '') => {
    const from = shown[key] ?? v; shown[key] = v;
    $$(`[data-x="${key}"]`).forEach(el => {
      if (Mo && from !== v) Mo.animate(from, v, { duration: .6, ease: EASE, onUpdate: n => { el.textContent = prefix + fmt(Math.abs(n - v) < 1 ? v : Math.round(n)); } });
      else el.textContent = prefix + fmt(v);
    });
  };
  const sync = () => {
    $('#xCodeTxt').textContent = encode();
    setNum('base', C.base); setNum('opts', optTotal(), '+ '); setNum('total', total()); setNum('deposit', deposit());
    counts();
    history.replaceState(null, '', '?' + new URLSearchParams({ code: encode() }));
  };

  /* ---- Messages, code, sharing ---- */
  const toast = (msg) => {
    $('#xOut').textContent = msg;
    let t = $('#xToast');
    if (!t) { t = document.createElement('p'); t.id = 'xToast'; t.className = 'cfgx-toast'; document.body.append(t); }
    t.textContent = msg; t.hidden = false;
    if (Mo) Mo.animate(t, { opacity: [0, 1], y: [12, 0] }, { duration: .3 });
    clearTimeout(t._h); t._h = setTimeout(() => { t.hidden = true; }, 2200);
  };
  const copy = async (text, msg) => { try { await navigator.clipboard.writeText(text); toast(msg); } catch (_) { toast(text); } };
  const share = async () => {
    const url = location.href;
    try {
      if (navigator.share) await navigator.share({ title: 'IRUKA · E-Dolphin', text: tt('Ma configuration IRUKA, code ', 'My IRUKA configuration, code ') + encode(), url });
      else await copy(url, tt('Lien de votre configuration copié', 'Link to your configuration copied'));
    } catch (_) { /* sharing cancelled */ }
  };
  $('#xCode').addEventListener('click', () => copy(encode(), tt('Code copié : ', 'Code copied: ') + encode()));
  $('#xShare').addEventListener('click', share);

  /* ---- Summary, like the manufacturer's "Récapitulatif" ---- */
  const sum = $('#xSum');
  const sumRows = () => GROUPS.map(g => {
    const rows = [];
    g.sections.forEach(s => s.items.forEach(it => {
      if (!isOn(it) || packOf(it.id)) return;
      if (s.pick !== 'one' && !S.on.has(it.id) && !it.std) return;
      const label = s.pick === 'one' ? `<span class="block text-xs text-ink2">${T(s)}</span>${T(it)}` : T(it);
      const inside = it.pack ? `<span class="mt-0.5 block text-xs text-ink2">${it.pack.map(id => T(ITEMS.get(id))).join(' · ')}</span>` : '';
      const price = it.std || (s.pick === 'one' && !cost(it) && !(s.id === 'livery' && bespoke())) ? tt('De série', 'Standard') : it.price == null ? tt('Sur devis', 'On quotation') : s.id === 'livery' && bespoke() ? tt('Sur mesure', 'Bespoke') : fmt(cost(it));
      rows.push(`<div class="cfgx-row"><dt>${label}${inside}</dt><dd class="num">${price}</dd></div>`);
    }));
    return rows.length ? `<div class="cfgx-sumgrp"><h3 class="flex items-center gap-2 font-display text-lg font-semibold"><i data-lucide="${g.icon}" class="h-5 w-5 text-teal"></i>${T(g)}</h3><dl class="mt-2">${rows.join('')}</dl></div>` : '';
  }).join('');
  const sumHTML = () => {
    const liv = ITEMS.get(S.pick.livery);
    const date = new Date().toLocaleDateString(LANG === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    const q = quoted();
    const line = (k, v, cls = '') => `<div class="flex justify-between gap-4 ${cls}"><dt>${k}</dt><dd class="num text-right">${v}</dd></div>`;
    return `
    <div class="cfgx-sumbar gutter">
      <div class="mx-auto flex max-w-7xl items-center gap-3 py-3">
        <button type="button" data-close class="cfg-ghost inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"><i data-lucide="arrow-left" class="h-4 w-4"></i>${tt('Retour à la configuration', 'Back to the configuration')}</button>
        <div class="ml-auto flex items-center gap-2">
          <button type="button" data-print class="cfg-ghost hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold sm:inline-flex"><i data-lucide="printer" class="h-4 w-4"></i>PDF</button>
          <button type="button" data-share class="cfg-ghost inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"><i data-lucide="share-2" class="h-4 w-4"></i><span class="hidden sm:inline">${tt('Partager', 'Share')}</span></button>
        </div>
      </div>
    </div>
    <div class="gutter pb-24 pt-8">
      <div class="mx-auto max-w-7xl">
        <p class="eyebrow !text-teal">${tt('Résumé', 'Summary')} · ${date}</p>
        <div class="mt-2 flex flex-wrap items-end justify-between gap-4">
          <h2 id="xSumTitle" class="font-display text-4xl font-semibold sm:text-5xl">${tt('Votre IRUKA', 'Your IRUKA')}</h2>
          <button type="button" data-code class="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-mono text-sm shadow-sm"><i data-lucide="copy" class="h-4 w-4 text-teal"></i>${encode()}</button>
        </div>
        <p class="mt-2 text-ink2">${bespoke() ? tt('Teinte sur mesure', 'Bespoke colour') : T(liv)} · ${T(ITEMS.get(S.pick.finish))} · ${T(ITEMS.get(S.pick.seat))}</p>
        <div class="cfgx-gal mt-6 grid gap-3 sm:grid-cols-3">
          ${['a045', 'profil', 'a135'].map((v, k) => `<div class="cfgx-shot${k === 0 ? ' sm:col-span-2 sm:row-span-2' : ''}"><img src="${src(v)}" data-v="${v}" alt="IRUKA, ${T(liv)}, ${viewName(v)}" loading="lazy"><span>${tt('Rendu', 'Render')} · ${viewName(v)}</span></div>`).join('')}
        </div>
        <div class="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div>
            <div class="grid gap-8">${sumRows()}</div>
            <div class="cfgx-sumgrp mt-10">
              <h3 class="font-display text-lg font-semibold">${tt('Données techniques', 'Technical data')}</h3>
              <dl class="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">${C.specs.map(([fr, en, v]) => `<div class="rounded-2xl bg-white p-4"><dt class="text-xs text-ink2">${tt(fr, en)}</dt><dd class="num mt-1 font-display text-xl font-semibold">${T(v)}</dd></div>`).join('')}</dl>
              <p class="mt-3 text-xs text-ink2">${tt('Objectifs de conception, à confirmer lors des essais de validation.', 'Design targets, to be confirmed by validation trials.')}</p>
            </div>
          </div>
          <aside class="cfgx-pricebox lg:sticky lg:top-24">
            <dl class="grid gap-2 text-sm">
              ${line(tt('IRUKA, prix de base', 'IRUKA, base price'), fmt(C.base))}
              ${line(tt('Options', 'Options'), '+ ' + fmt(optTotal()))}
              ${line(tt('Prix total', 'Total price'), fmt(total()), 'border-t border-[#DCE3E7] pt-3 font-display text-2xl font-bold')}
              ${q.length ? `<p class="text-xs text-ink2">${tt('En plus, sur devis : ', 'Plus, on quotation: ')}${q.map(T).join(', ')}</p>` : ''}
              ${line(tt('Prix TTC en France (TVA 20 %), indicatif', 'Price incl. French VAT (20 %), indicative'), fmt(total() * 1.2), 'text-ink2')}
              ${line(tt(`Acompte ${C.deposit} % à la commande`, `${C.deposit} % deposit on order`), fmt(deposit()), 'border-t border-[#DCE3E7] pt-3 font-semibold text-teal')}
              ${line(tt('Solde avant livraison', 'Balance before delivery'), fmt(total() - deposit()))}
            </dl>
            <div class="mt-6 grid gap-3">
              <button type="button" data-add class="btn-primary inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold">${tt('Ajouter à ma sélection', 'Add to my selection')}<i data-lucide="shopping-bag" class="h-4 w-4"></i></button>
              <a href="${pageHref('reserver')}?formule=essai" class="cfg-ghost inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold"><i data-lucide="calendar-check" class="h-4 w-4"></i>${tt('Réserver un essai en mer', 'Book a sea trial')}</a>
            </div>
            <p class="mt-5 text-xs leading-relaxed text-ink2">${tt('Prix indicatifs hors taxes, confirmés sur devis. Rendus non contractuels. Aucune vente n\'est conclue en ligne : votre sélection est envoyée à notre équipe.', 'Indicative prices excluding taxes, confirmed on quotation. Non-contractual renders. No sale is concluded online: your selection is sent to our team.')}</p>
          </aside>
        </div>
      </div>
    </div>`;
  };
  let opener = null;
  function openSum() {
    opener = document.activeElement;
    sum.innerHTML = sumHTML(); paint(sum);
    $$('[data-v]', sum).forEach(im => { const w = look(im.dataset.v); if (w.parts.length) tinted(w).then(u => { im.src = u; }); });
    sum.hidden = false; sum.scrollTop = 0;
    document.documentElement.classList.add('x-sum-open');
    $('[data-close]', sum).addEventListener('click', closeSum);
    $('[data-print]', sum).addEventListener('click', () => print());
    $('[data-share]', sum).addEventListener('click', share);
    $('[data-code]', sum).addEventListener('click', () => copy(encode(), tt('Code copié : ', 'Code copied: ') + encode()));
    $('[data-add]', sum).addEventListener('click', () => {
      const extras = chosen().filter(it => cost(it) > 0 || (it.s.pick !== 'one' && it.price == null));
      closeSum();
      Cart.add('iruka', bespoke() ? tt('Teinte sur mesure', 'Bespoke colour') : T(ITEMS.get(S.pick.livery)), { opts: [...extras.map(it => (it.s.pick === 'one' ? T(it.s) + ' : ' : '') + T(it)), encode()], extra: optTotal() });
    });
    $('[data-close]', sum).focus();
    if (Mo) {
      Mo.animate(sum, { opacity: [0, 1] }, { duration: .25 });
      Mo.animate($$('.cfgx-shot, .cfgx-sumgrp, .cfgx-pricebox', sum), { opacity: [0, 1], y: [22, 0] }, { duration: .5, delay: Mo.stagger(.06, { startDelay: .08 }), ease: EASE });
    }
  }
  function closeSum() {
    const done = () => { sum.hidden = true; document.documentElement.classList.remove('x-sum-open'); if (opener && opener.focus) opener.focus(); };
    if (Mo) Mo.animate(sum, { opacity: 0 }, { duration: .2 }).then(done); else done();
  }
  $('#xSumOpen').addEventListener('click', openSum);
  addEventListener('keydown', e => { if (e.key === 'Escape' && !sum.hidden) closeSum(); });

  /* ---- Start ---- */
  const q = new URLSearchParams(location.search);
  decode(q.get('code'));
  renderPanel(false); showImage(false); sync(); moveInk(true); edges();
  if (Mo) {
    Mo.animate(img, { opacity: [0, 1], scale: [1.04, 1] }, { duration: .9, ease: EASE });
    Mo.animate($$('.cfgx-tab', tabs), { opacity: [0, 1], y: [8, 0] }, { duration: .35, delay: Mo.stagger(.04, { startDelay: .15 }) });
    Mo.animate($$('.cfgx-sec', panel), { opacity: [0, 1], y: [14, 0] }, { duration: .45, delay: Mo.stagger(.06, { startDelay: .25 }), ease: EASE });
  }
  if (location.hash === '#resume') openSum();
});
