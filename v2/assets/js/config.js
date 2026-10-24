/* Configurator: model, livery, view angle (drag to turn), equipment, live total and 30 % deposit.
   State lives in the URL (?modele=&livree=&vue=&opts=) so a configuration can be shared. */
addEventListener('DOMContentLoaded', () => {
  const root = LANG === 'en' ? '../' : '';
  const IMG = (f) => `${root}assets/img/${f}`;
  const USD_PER_EUR = 1.16; // brochure rate, used to show euro-priced equipment on the dollar-priced Launch Edition
  const DEPOSIT_PCT = 30;

  const LIVERIES = [
    { id: 'blanc', fr: 'Blanc · noir · lime', en: 'White · black · lime', c: ['#F2F4F3', '#9BE15D'] },
    { id: 'gris', fr: 'Gris · rouge', en: 'Grey · red', c: ['#6B7075', '#D0202A'] },
    { id: 'predator', fr: 'Predator', en: 'Predator', c: ['#121416', '#7CFF3A'] },
    { id: 'magma', fr: 'Magma', en: 'Magma', c: ['#1A1A1A', '#FF5A1F'] },
    { id: 'wasp', fr: 'Wasp', en: 'Wasp', c: ['#F5C400', '#121416'] }
  ];
  // Rotation order for the drag viewer; extra in-between angles are added per livery when they exist
  const VIEWS = { fr: { profil: 'Profil', face: 'Face', arriere: 'Arrière', dessus: 'Dessus' }, en: { profil: 'Side', face: 'Front', arriere: 'Rear', dessus: 'Top' } };
  // Predator (Launch Edition livery) has a 15-frame turn: AI renders in between, the far side mirrored
  // 24 views every 15° for every livery (the top view stays a thumbnail only). Tridens and the kids range are blurred and
  // have no enlarged view or 360° turn while they stay confidential (adam, 24 Oct)
  const FRAMES = {
    default: ['face', 'a015', 'a030', 'a045', 'a060', 'a075', 'profil', 'a105', 'a120', 'a135', 'a150', 'a165', 'a180', 'a195', 'arriere', 'a225', 'a240', 'a255', 'a270', 'a285', 'a300', 'a315', 'a330', 'a345']
  };
  const viewName = (v) => VIEWS[LANG][v] || (v.startsWith('a') ? `${+v.slice(1)}°` : '');
  const frames = (liv) => FRAMES[liv] || FRAMES.default;

  const MODELS = {
    iruka: { name: 'IRUKA', price: 35990, cur: '€ HT', note: { fr: 'Prix de lancement', en: 'Launch price' }, included: [] },
    launch: { name: 'IRUKA Launch Edition', price: 90000, cur: '$ HT', note: { fr: 'Série limitée · 300 exemplaires', en: 'Limited series · 300 units' }, included: [] }
  };

  // Equipment, priced in euros excl. VAT. Grouped by category, like the reference configurator.
  const OPTIONS = window.CFG_OPTIONS || [];

  const q = new URLSearchParams(location.search);
  const S = {
    model: MODELS[q.get('modele')] ? q.get('modele') : 'iruka',
    livery: LIVERIES.some(l => l.id === q.get('livree')) ? q.get('livree') : 'blanc',
    view: q.get('vue') || 'profil',
    opts: new Set((q.get('opts') || '').split(',').filter(id => OPTIONS.some(o => o.id === id))),
    step: 'color'
  };

  const M = () => MODELS[S.model];
  const L = () => LIVERIES.find(l => l.id === S.livery);
  const isUsd = () => M().cur.startsWith('$');
  const optPrice = (o) => (isUsd() ? Math.round(o.price * USD_PER_EUR * 100) / 100 : o.price);
  const fmt = (n) => Cart.money(n, M().cur);
  const included = (o) => !!o.std || M().included.includes(o.id);
  const total = () => r2c(M().price + [...S.opts].reduce((a, id) => { const o = OPTIONS.find(x => x.id === id); return a + (o && !included(o) ? optPrice(o) : 0); }, 0));
  const r2c = (n) => Math.round(n * 100) / 100;
  const deposit = () => Math.round(total() * DEPOSIT_PCT) / 100;
  const r2 = (n) => Math.round(n * 100) / 100;

  /* ---- Stage: image, angle thumbnails, drag to turn ---- */
  const img = $('#cfgImg'), CACHE = {};
  const showImage = () => {
    const f = frames(S.livery);
    if (!f.includes(S.view) && S.view !== 'dessus') S.view = f[0];
    const src = IMG(`cfg-${S.livery}-${S.view}.jpg`);
    if (!img.src.endsWith(src.replace(/^\.\.\//, ''))) {
      const c = CACHE[src];
      if (c && c.complete) img.src = src; // already loaded: swap instantly so dragging feels like a turn
      else {
        img.style.opacity = .35;
        const pre = new Image(); pre.onload = () => { img.src = src; img.style.opacity = 1; }; pre.src = src;
      }
    }
    img.alt = `${M().name}, ${L()[LANG]}, ${viewName(S.view)}`;
    $('#cfgImgLabel').textContent = `${L()[LANG]} · ${viewName(S.view)}${f.length > 4 ? ' · 360°' : ''}`;
    $$('.cfg-view').forEach(b => {
      b.setAttribute('aria-pressed', String(b.dataset.view === S.view));
      b.querySelector('img').src = IMG(`cfg-${S.livery}-${b.dataset.view}-s.jpg`);
    });
  };
  const turn = (d) => { startTurning(); const f = frames(S.livery), i = Math.max(0, f.indexOf(S.view)); S.view = f[(i + d + f.length) % f.length]; sync(); };
  $('#cfgPrev').addEventListener('click', () => turn(-1));
  $('#cfgNext').addEventListener('click', () => turn(1));
  $$('.cfg-view').forEach(b => b.addEventListener('click', () => { S.view = b.dataset.view; sync(); }));
  // Drag (mouse or finger) across the image to turn the jet-ski
  let dragX = null;
  const stage = img.parentElement;
  stage.style.touchAction = 'pan-y';
  stage.addEventListener('pointerdown', e => { if (e.target.closest('button')) return; startTurning(); dragX = e.clientX; stage.setPointerCapture(e.pointerId); stage.style.cursor = 'grabbing'; });
  stage.addEventListener('pointermove', e => { if (dragX === null) return; const dx = e.clientX - dragX; if (Math.abs(dx) > (frames(S.livery).length > 4 ? 28 : 70)) { turn(dx < 0 ? 1 : -1); dragX = e.clientX; } });
  const end = () => { dragX = null; stage.style.cursor = 'grab'; };
  stage.addEventListener('pointerup', end); stage.addEventListener('pointercancel', end);
  stage.style.cursor = 'grab';
  // Preload every angle of the current livery so turning is instant. It starts with the first turn, not on page load:
  // the 24 angles weigh about 2.5 MB, which a visitor who never turns the jet-ski would download for nothing.
  let turning = false;
  const preload = () => turning && frames(S.livery).forEach(v => { const u = IMG(`cfg-${S.livery}-${v}.jpg`); if (!CACHE[u]) { CACHE[u] = new Image(); CACHE[u].src = u; } });
  const startTurning = () => { if (!turning) { turning = true; preload(); } };

  /* ---- Step 1: model ---- */
  $$('[data-model]').forEach(b => b.addEventListener('click', () => {
    S.model = b.dataset.model;
    if (S.model === 'launch' && !q.get('livree') && S.livery === 'blanc') S.livery = 'predator';
    preload(); sync();
  }));

  /* ---- Step 1: colour swatches ---- */
  $('#cfgSwatches').innerHTML = LIVERIES.map(l => `
    <button type="button" data-liv="${l.id}" class="cfg-swatch grid justify-items-center gap-2 rounded-2xl border p-2 text-center text-xs" aria-pressed="false">
      <span class="block h-11 w-11 rounded-full ring-1 ring-black/10" style="background:linear-gradient(135deg, ${l.c[0]} 0 55%, ${l.c[1]} 55% 100%)"></span>
      <span>${l[LANG]}</span>
    </button>`).join('');
  $$('.cfg-swatch').forEach(b => b.addEventListener('click', () => { S.livery = b.dataset.liv; preload(); sync(); }));

  /* ---- Step 2: equipment grouped by category ---- */
  const cats = [...new Set(OPTIONS.map(o => o.cat[LANG]))];
  const openCats = new Set([cats[0]]);
  const renderOptions = () => {
    $('#cfgOptions').innerHTML = cats.map(c => `
      <details class="cfg-cat rounded-2xl border"${openCats.has(c) ? ' open' : ''}>
        <summary class="flex cursor-pointer items-center justify-between gap-3 px-4 py-3 font-semibold">${c}<span class="num text-xs font-normal opacity-70">${OPTIONS.filter(o => o.cat[LANG] === c && S.opts.has(o.id)).length}/${OPTIONS.filter(o => o.cat[LANG] === c).length}</span></summary>
        <div class="grid gap-2 px-3 pb-3">
          ${OPTIONS.filter(o => o.cat[LANG] === c).map(o => {
            const inc = included(o);
            return `<label class="cfg-opt flex cursor-pointer items-start gap-3 rounded-xl border p-3 ${S.opts.has(o.id) || inc ? 'is-on' : ''}">
              <input type="checkbox" data-opt="${o.id}" class="mt-1 h-4 w-4 accent-[#0FA3B1]" ${S.opts.has(o.id) || inc ? 'checked' : ''} ${inc ? 'disabled' : ''}>
              <span class="min-w-0 flex-1"><span class="block text-sm font-medium">${o[LANG]}</span>${o.d ? `<span class="mt-0.5 block text-xs opacity-70">${o.d[LANG]}</span>` : ''}</span>
              <span class="num shrink-0 text-sm font-semibold">${inc ? tt('Inclus', 'Included') : '+ ' + fmt(optPrice(o))}</span>
            </label>`;
          }).join('')}
        </div>
      </details>`).join('') || `<p class="text-sm opacity-70">${tt('Équipements en cours de définition.', 'Equipment being defined.')}</p>`;
    $$('.cfg-cat').forEach((d, i) => d.addEventListener('toggle', () => { d.open ? openCats.add(cats[i]) : openCats.delete(cats[i]); }));
    $$('[data-opt]').forEach(c => c.addEventListener('change', () => { c.checked ? S.opts.add(c.dataset.opt) : S.opts.delete(c.dataset.opt); sync(); }));
  };

  /* ---- Step 3: summary ---- */
  const renderSummary = () => {
    const chosen = OPTIONS.filter(o => S.opts.has(o.id) || included(o));
    const row = (k, v, strong) => `<div class="flex justify-between gap-4 ${strong ? 'border-t pt-3 font-semibold' : ''}"><dt class="${strong ? '' : 'opacity-70'}">${k}</dt><dd class="num text-right">${v}</dd></div>`;
    $('#cfgSummary').innerHTML =
      row(M().name, fmt(M().price)) +
      row(tt('Livrée', 'Livery') + ' : ' + L()[LANG], tt('Incluse', 'Included')) +
      chosen.map(o => row(o[LANG], included(o) ? tt('Inclus', 'Included') : fmt(optPrice(o)))).join('') +
      row(tt('Total', 'Total'), fmt(total()), true) +
      row(tt(`Acompte ${DEPOSIT_PCT} % à la réservation`, `${DEPOSIT_PCT} % deposit when reserving`), fmt(deposit())) +
      row(tt('Solde avant livraison', 'Balance before delivery'), fmt(r2(total() - deposit())));
  };

  /* ---- Steps navigation ---- */
  const STEPS = ['model', 'color', 'equip', 'sum'];
  const showStep = (s) => {
    S.step = s;
    STEPS.forEach(k => { $('#pane-' + k).hidden = k !== s; $('#tab-' + k).setAttribute('aria-selected', String(k === s)); });
    $('#cfgNextStep').hidden = s === 'sum';
    S.step = s;
  };
  STEPS.forEach(k => $('#tab-' + k).addEventListener('click', () => showStep(k)));
  $('#cfgNextStep').addEventListener('click', () => {
    showStep(STEPS[STEPS.indexOf(S.step) + 1]);
    if (innerWidth < 1024) $('#cfgPanel').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  });

  /* ---- Sync everything + URL ---- */
  let renderedFor = null;
  function sync() {
    $$('[data-model]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.model === S.model)));
    $('#cfgTitle').textContent = M().name;
    $('#cfgModelName').textContent = M().name;
    $('#cfgBase').textContent = fmt(M().price);
    $('#cfgExtra').textContent = '+ ' + fmt(r2(total() - M().price));
    $('#cfgPriceNote').textContent = M().note[LANG];
    $('#cfgLiveryName').textContent = L()[LANG];
    $$('.cfg-swatch').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.liv === S.livery)));
    $$('.cfg-total').forEach(e => e.textContent = fmt(total()));
    $$('.cfg-deposit').forEach(e => e.textContent = fmt(deposit()));
    $('#cfgBook').href = `${pageHref('reserver')}?formule=${S.model === 'launch' ? 'launch' : 'essai'}`;
    showImage(); renderSummary();
    if (renderedFor !== S.model) { renderOptions(); renderedFor = S.model; }
    else $$('[data-opt]').forEach(c => { c.closest('.cfg-opt').classList.toggle('is-on', c.checked); });
    $$('.cfg-cat').forEach((d, i) => { const n = d.querySelector('summary .num'); n.textContent = `${OPTIONS.filter(o => o.cat[LANG] === cats[i] && (S.opts.has(o.id) || included(o))).length}/${OPTIONS.filter(o => o.cat[LANG] === cats[i]).length}`; });
    const p = new URLSearchParams({ modele: S.model, livree: S.livery, vue: S.view });
    if (S.opts.size) p.set('opts', [...S.opts].join(','));
    history.replaceState(null, '', '?' + p);
  }

  /* ---- Actions ---- */
  const out = $('#cfgOut');
  $('#cfgAdd').addEventListener('click', () => {
    const chosen = OPTIONS.filter(o => S.opts.has(o.id) && !included(o));
    Cart.add(S.model, L()[LANG], { opts: chosen.map(o => o[LANG]), extra: r2(total() - M().price) });
  });
  $('#cfgShare').addEventListener('click', async () => {
    const url = location.href;
    try {
      if (navigator.share) await navigator.share({ title: M().name, url });
      else { await navigator.clipboard.writeText(url); out.textContent = tt('Lien copié.', 'Link copied.'); }
    } catch (_) { out.textContent = url; }
  });

  /* ---- Enlarged view of a model (click on its picture): HD photos, 360° turn ---- */
  // AI-upscaled views (3840 px) are listed in UHD, the others show the 1680 px render; the 360° turn reuses the configurator frames
  const UHD = new Set(['iruka-face', 'iruka-profil', 'iruka-arriere', 'iruka-dessus', 'launch-face', 'launch-profil', 'launch-arriere', 'launch-dessus']);
  const zFile = (n) => `zoom-${n}-${UHD.has(n) ? 'uhd' : 'hd'}.jpg`;
  const KEY_VIEWS = ['face', 'profil', 'arriere', 'dessus'];
  const ZOOM = {
    iruka: { name: 'IRUKA', liv: 'blanc', photos: KEY_VIEWS.map(v => [`iruka-${v}`, VIEWS[LANG][v]]) },
    launch: { name: 'IRUKA Launch Edition', liv: 'predator', photos: KEY_VIEWS.map(v => [`launch-${v}`, VIEWS[LANG][v]]) }
  };
  const dlg = $('#zoomDlg'), zImg = $('#zoomImg');
  const Z = { key: 'iruka', mode: 'photo', i: 0, frame: 0 };
  const zm = () => ZOOM[Z.key];
  const zLiv = () => { const l = LIVERIES.find(x => x.id === zm().liv); return l ? l[LANG] : zm().lab; };
  const zFrames = () => frames(zm().liv);
  const zoomOut = () => zImg.classList.remove('is-zoomed');
  const zShow = () => {
    const m = zm(), photo = Z.mode === 'photo', spin = Z.mode === 'spin';
    $('#zoomTitle').textContent = m.name;
    $$('[data-zmode]', dlg).forEach(b => { b.setAttribute('aria-pressed', String(b.dataset.zmode === Z.mode)); b.disabled = b.dataset.zmode !== 'photo' && !m.liv; });
    zImg.classList.toggle('is-spin', spin); zoomOut();
    const several = photo ? m.photos.length > 1 : spin;
    $('#zoomPrev').hidden = $('#zoomNext').hidden = !several;
    if (photo) {
      const [n, label] = m.photos[Z.i];
      zImg.src = IMG(zFile(n)); zImg.alt = `${m.name} · ${label}`;
      $('#zoomCap').textContent = `${tt('Rendu', 'Render')} · ${label} · ${UHD.has(n) ? 'Ultra HD' : 'HD'}`;
      $('#zoomHint').textContent = tt('Cliquez sur la photo pour zoomer.', 'Click the photo to zoom in.');
    } else {
      const v = zFrames()[Z.frame];
      zImg.src = IMG(`cfg-${m.liv}-${v}.jpg`); zImg.alt = `${m.name} · ${viewName(v)}`;
      $('#zoomCap').textContent = `${tt('Rendu', 'Render')} · ${zLiv()} · ${viewName(v)} · 360°`;
      $('#zoomHint').textContent = tt('Faites glisser pour tourner.', 'Drag to turn.');
    }
    const th = $('#zoomThumbs');
    th.hidden = !photo || m.photos.length < 2;
    th.innerHTML = photo ? m.photos.map(([n, label], k) => `<button type="button" class="zoom-thumb" data-zi="${k}" aria-pressed="${k === Z.i}" aria-label="${label}"><img src="${IMG(`zoom-${n}-s.jpg`)}" alt="" class="aspect-[16/9] w-full object-cover"></button>`).join('') : '';
    $$('[data-zi]', th).forEach(b => b.addEventListener('click', () => { Z.i = +b.dataset.zi; zShow(); }));
  };
  const zStep = (d) => {
    if (Z.mode === 'photo') Z.i = (Z.i + d + zm().photos.length) % zm().photos.length;
    else Z.frame = (Z.frame + d + zFrames().length) % zFrames().length;
    zShow();
  };
  const zPreloadSpin = () => zFrames().forEach(v => { const u = IMG(`cfg-${zm().liv}-${v}.jpg`); if (!CACHE[u]) { CACHE[u] = new Image(); CACHE[u].src = u; } });
  $$('[data-zoom]').forEach(b => b.addEventListener('click', () => {
    Z.key = b.dataset.zoom; Z.mode = 'photo'; Z.i = 0; Z.frame = 0;
    document.documentElement.style.overflow = 'hidden';
    dlg.showModal(); zShow();
  }));
  $$('[data-zmode]', dlg).forEach(b => b.addEventListener('click', () => { Z.mode = b.dataset.zmode; if (Z.mode === 'spin') zPreloadSpin(); zShow(); }));
  $('#zoomPrev').addEventListener('click', () => zStep(-1));
  $('#zoomNext').addEventListener('click', () => zStep(1));
  $('#zoomClose').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') zStep(-1); if (e.key === 'ArrowRight') zStep(1); });
  dlg.addEventListener('close', () => {
    document.documentElement.style.overflow = '';
    zImg.removeAttribute('src');
  });
  // Photo: click to zoom where you point; 360°: drag to turn
  let zx = null;
  zImg.addEventListener('pointerdown', e => { if (Z.mode !== 'spin') return; zx = e.clientX; zImg.setPointerCapture(e.pointerId); });
  zImg.addEventListener('pointermove', e => {
    if (Z.mode === 'photo' && zImg.classList.contains('is-zoomed')) { const r = zImg.getBoundingClientRect(); zImg.style.transformOrigin = `${(e.clientX - r.left) / r.width * 100}% ${(e.clientY - r.top) / r.height * 100}%`; }
    if (zx === null) return;
    const dx = e.clientX - zx;
    if (Math.abs(dx) > (zFrames().length > 8 ? 24 : 48)) { zStep(dx < 0 ? 1 : -1); zx = e.clientX; }
  });
  zImg.addEventListener('pointerup', () => { zx = null; });
  zImg.addEventListener('click', e => {
    if (Z.mode !== 'photo') return;
    const r = zImg.getBoundingClientRect();
    zImg.style.transformOrigin = `${(e.clientX - r.left) / r.width * 100}% ${(e.clientY - r.top) / r.height * 100}%`;
    zImg.classList.toggle('is-zoomed');
  });

  preload(); showStep(q.get('modele') ? 'color' : 'model'); sync();
});
