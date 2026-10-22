/* IRUKA page: spec toggle, detail explorer, CFD wipe. Uses helpers from site.js. */
addEventListener('DOMContentLoaded', () => {
  const R = LANG === 'en' ? '../' : '';
  const kn = tt('nœuds', 'knots');
  const SPECS = {
    s300: { kw: [120, 'kW'], kn: [50, kn], kwh: [21, 'kWh'], dc: [50, 'kW'], kg: [400, 'kg'], hull: tt('Prototype', 'Prototype'), img: 's300-prototype.jpg', alt: tt('Le prototype S300 sur l\'eau', 'The S300 prototype on the water'), cap: tt('Photo réelle · S300 · 200 h en mer', 'Real photo · S300 · 200 h at sea') },
    iruka: { kw: [160, 'kW'], kn: [60, kn], kwh: [35, 'kWh'], dc: [70, 'kW'], kg: [400, 'kg', ''], hull: tt('Carbone', 'Carbon'), img: 'iruka-side.jpg', alt: tt('IRUKA vu de profil sur une mer calme', 'IRUKA in profile on calm water'), cap: tt('Rendu · IRUKA', 'Render · IRUKA') }
  };
  function countTo(el, to, unit, prefix = '') {
    const from = parseFloat(el.dataset.v || to), start = performance.now(), dur = reduce ? 0 : 700;
    el.dataset.v = to;
    const step = (now) => {
      const p = dur ? Math.min(1, (now - start) / dur) : 1, e = 1 - Math.pow(1 - p, 3);
      el.innerHTML = `${prefix}${Math.round(from + (to - from) * e)} <small class="font-mono text-xs text-brume">${unit}</small>`;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  function showSpecs(key) {
    const s = SPECS[key];
    $('#segS300').setAttribute('aria-pressed', key === 's300');
    $('#segIruka').setAttribute('aria-pressed', key === 'iruka');
    for (const k of ['kw', 'kn', 'kwh', 'dc', 'kg']) countTo($(`[data-k="${k}"]`), s[k][0], s[k][1], s[k][2] || '');
    $('[data-k="hull"]').textContent = s.hull;
    const im = $('#irukaImg'); im.src = R + 'assets/img/' + s.img; im.alt = s.alt; $('#irukaCap').textContent = s.cap;
  }
  $('#segS300').addEventListener('click', () => showSpecs('s300'));
  $('#segIruka').addEventListener('click', () => showSpecs('iruka'));

  const DETAILS = [
    { icon: 'lightbulb', img: 'detail-led', fr: ['Signature lumineuse LED', 'Une signature avant et arrière reconnaissable de loin, de jour comme de nuit.'], en: ['LED light signature', 'A front and rear signature you recognise from afar, day and night.'] },
    { icon: 'layers', img: 'detail-carbon', fr: ['Inserts carbone', 'Du carbone apparent sur les zones de contact, léger et rigide.'], en: ['Carbon inserts', 'Exposed carbon on contact areas, light and stiff.'] },
    { icon: 'armchair', img: 'detail-seat', fr: ['Selle sport confort', 'Maintien latéral pour le pilotage sportif, coutures contrastées.'], en: ['Sport comfort seat', 'Side support for sporty riding, contrast stitching.'] },
    { icon: 'gauge', img: 'detail-handlebar', fr: ['Guidon sport', 'Poignées ergonomiques et commandes à portée de pouce.'], en: ['Sport handlebar', 'Ergonomic grips and controls within thumb reach.'] },
    { icon: 'wind', img: 'detail-fins', fr: ['Ailerons sport', 'Stabilité en courbe et à haute vitesse.'], en: ['Sport fins', 'Stability in turns and at high speed.'] },
    { icon: 'circle-dot', img: 'detail-jet', fr: ['Sortie de jet course', 'Une tuyère dessinée pour la poussée, soulignée de lumière.'], en: ['Race jet nozzle', 'A nozzle shaped for thrust, outlined in light.'] }
  ];
  const tabs = $('#tabs');
  DETAILS.forEach((d, i) => {
    const b = document.createElement('button');
    b.type = 'button'; b.setAttribute('role', 'tab'); b.className = 'tab glass lift flex items-center gap-3 rounded-2xl p-4 text-left text-sm font-medium text-brume';
    b.setAttribute('aria-selected', i === 0);
    b.innerHTML = `<i data-lucide="${d.icon}" class="h-5 w-5 shrink-0 text-lagoon"></i><span>${d[LANG][0]}</span>`;
    b.addEventListener('click', () => select(i));
    tabs.appendChild(b);
  });
  icons();
  function select(i) {
    const d = DETAILS[i], im = $('#detailImg');
    $$('[role="tab"]', tabs).forEach((x, k) => x.setAttribute('aria-selected', k === i));
    im.style.opacity = .2;
    setTimeout(() => { im.src = `${R}assets/img/${d.img}.jpg`; im.alt = d[LANG][0]; im.style.opacity = 1; }, reduce ? 0 : 180);
    $('#detailTitle').textContent = d[LANG][0]; $('#detailText').textContent = d[LANG][1];
  }
  select(0);

  const wipe = $('#wipe');
  $('#wipeRange').addEventListener('input', e => wipe.style.setProperty('--x', e.target.value + '%'));
});
