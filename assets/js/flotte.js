/* "For my rental" page: fleet return calculator. Every assumption is an input the operator can change.
   IRUKA: 35 990 € excl. VAT, about 14 kWh per hour (35 kWh battery for 2 h 30 of mixed use). */
addEventListener('DOMContentLoaded', () => {
  const res = $('#fcRevenue'); if (!res) return;
  const IRUKA = { price: 35990, kwhPerHour: 14 };
  const v = (id) => Math.max(0, parseFloat(String($(id).value).replace(',', '.')) || 0);
  const eur = (n) => Cart.money(Math.round(n), '€');
  const eurH = (n) => Cart.money(Math.round(n * 10) / 10, '€');
  const run = () => {
    const n = v('#fcN'), price = v('#fcPrice'), h = v('#fcHours'), d = v('#fcDays');
    const hours = n * h * d;
    const eH = IRUKA.kwhPerHour * v('#fcKwh'), tH = v('#fcCons') * v('#fcFuel');
    const save = hours * (tH - eH), gap = n * (IRUKA.price - v('#fcThermal'));
    res.textContent = eur(hours * price);
    $('#fcMonth').textContent = eur(h * price * 30);
    $('#fcEnergyE').textContent = eurH(eH);
    $('#fcEnergyT').textContent = eurH(tH);
    $('#fcSave').textContent = eur(save);
    let pay;
    if (gap <= 0) pay = tt('Aucun écart', 'No gap');
    else if (save <= 0) pay = '–';
    else {
      const s = gap / save;
      pay = s < 1 ? tt('Moins d\'une saison', 'Under one season') : tt(`${s.toFixed(1).replace('.', ',')} saisons`, `${s.toFixed(1)} seasons`);
    }
    $('#fcPayback').textContent = pay;
    // The offer form receives the simulation and the fleet size
    const sim = $('#ofSim'), units = $('#ofUnits');
    if (units) units.value = n;
    if (sim) sim.value = tt(
      `${n} machines, ${price} €/h, ${h} h/jour, ${d} jours ; CA ${res.textContent} ; énergie ${$('#fcEnergyE').textContent}/h contre ${$('#fcEnergyT').textContent}/h ; économie ${$('#fcSave').textContent}/saison ; amortissement ${pay}`,
      `${n} craft, €${price}/h, ${h} h/day, ${d} days; revenue ${res.textContent}; energy ${$('#fcEnergyE').textContent}/h vs ${$('#fcEnergyT').textContent}/h; saving ${$('#fcSave').textContent}/season; payback ${pay}`);
  };
  $$('#calcul input').forEach(i => i.addEventListener('input', run));
  run();
});

// "Discover IRUKA Fleet" tabs (arrow keys move between tabs)
addEventListener('DOMContentLoaded', () => {
  const list = $('[data-fleet-tabs]'); if (!list) return;
  const tabs = $$('[role=tab]', list);
  const pick = (i, focus) => tabs.forEach((b, k) => {
    b.setAttribute('aria-selected', String(k === i)); b.tabIndex = k === i ? 0 : -1;
    $('#' + b.getAttribute('aria-controls')).hidden = k !== i;
    if (k === i && focus) b.focus();
  });
  tabs.forEach((b, i) => {
    b.addEventListener('click', () => pick(i));
    b.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); pick((i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length, true); }
    });
  });
  pick(0);
});
