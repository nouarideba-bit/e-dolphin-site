/* "For my yacht" page: Yacht Fit garage check and the printable captain's sheet.
   IRUKA's known maxima: 330 × 145 cm footprint (Fleet version, collar included), 400 kg weight (team, 22 Oct). */
addEventListener('DOMContentLoaded', () => {
  const printBtn = $('[data-print-fiche]');
  if (printBtn) printBtn.addEventListener('click', () => {
    document.body.classList.add('print-fiche');
    addEventListener('afterprint', () => document.body.classList.remove('print-fiche'), { once: true });
    print();
  });

  const box = $('#fitResult'); if (!box) return;
  const IR = { l: 330, w: 145, kg: 400 }, MARGIN = 20;
  const val = (id) => parseFloat($(id).value) || 0;
  const STATES = {
    ok: { icon: 'circle-check', color: 'text-lagoon' }, tight: { icon: 'triangle-alert', color: 'text-sand' },
    no: { icon: 'circle-x', color: 'text-[#FFB4A8]' }, wait: { icon: 'circle-help', color: 'text-brume' }
  };
  const line = (state, text) => `<p class="flex items-start gap-2"><i data-lucide="${STATES[state].icon}" class="mt-0.5 h-5 w-5 shrink-0 ${STATES[state].color}"></i><span>${text}</span></p>`;
  const fit = (have, need, what) => {
    if (!have) return null;
    const m = have - need;
    if (m < 0) return ['no', tt(`${what} : il manque ${-m} cm.`, `${what}: ${-m} cm short.`)];
    if (m < MARGIN) return ['tight', tt(`${what} : passe, avec ${m} cm de marge seulement.`, `${what}: fits, with only ${m} cm to spare.`)];
    return ['ok', tt(`${what} : passe, ${m} cm de marge.`, `${what}: fits, ${m} cm to spare.`)];
  };
  const draw = (L, W) => {
    const svg = $('#fitDraw'); if (!svg) return;
    const gl = L || IR.l + 60, gw = W || IR.w + 60;
    const k = Math.min(380 / Math.max(gl, IR.l), 190 / Math.max(gw, IR.w));
    const x0 = 10, y0 = 15, gx = gl * k, gy = gw * k, il = IR.l * k, iw = IR.w * k;
    const ix = x0 + (gx - il) / 2, iy = y0 + (gy - iw) / 2;
    const hull = `M${ix} ${iy + iw * .5} C${ix + il * .08} ${iy} ${ix + il * .55} ${iy} ${ix + il} ${iy + iw * .12} L${ix + il} ${iy + iw * .88} C${ix + il * .55} ${iy + iw} ${ix + il * .08} ${iy + iw} ${ix} ${iy + iw * .5}Z`;
    const over = (L && L < IR.l) || (W && W < IR.w);
    svg.innerHTML = `<rect x="${x0}" y="${y0}" width="${gx}" height="${gy}" rx="6" fill="none" stroke="#8FA3AE" stroke-dasharray="${L && W ? '0' : '6 6'}" stroke-width="1.5"/>
      <path d="${hull}" fill="${over ? 'rgba(255,180,168,.25)' : 'rgba(46,230,168,.18)'}" stroke="${over ? '#FFB4A8' : '#2EE6A8'}" stroke-width="2"/>
      <text x="${ix + il / 2}" y="${iy + iw / 2 + 4}" text-anchor="middle" font-size="12" fill="#F6F8F7" font-family="IBM Plex Mono, monospace">IRUKA 330 × 145</text>
      <text x="${x0 + 4}" y="${y0 + gy + 14}" font-size="11" fill="#8FA3AE" font-family="IBM Plex Mono, monospace">${L && W ? tt('Garage', 'Garage') + ` ${L} × ${W} cm` : tt('Saisissez vos cotes', 'Enter your dimensions')}</text>`;
  };
  const run = () => {
    const L = val('#fitL'), W = val('#fitW'), D = val('#fitD'), C = val('#fitC');
    const res = [fit(L, IR.l, tt('Longueur', 'Length')), fit(W, IR.w, tt('Largeur', 'Width')), fit(D, IR.w, tt('Porte', 'Door'))].filter(Boolean);
    if (C) res.push(C >= IR.kg ? ['ok', tt(`Grue : ${C} kg pour ${IR.kg} kg.`, `Crane: ${C} kg for ${IR.kg} kg.`)] : ['no', tt(`Grue : ${C} kg, insuffisant pour ${IR.kg} kg.`, `Crane: ${C} kg, not enough for ${IR.kg} kg.`)]);
    res.push(['wait', tt('Hauteur et points de levage : confirmés par notre équipe sur vos plans.', 'Height and lifting points: confirmed by our team on your drawings.')]);
    box.innerHTML = res.map(([s, x]) => line(s, x)).join('');
    $('#fitOut').value = res.map(([, x]) => x).join(' | ');
    window.renderIcons && renderIcons(box);
    draw(L, W);
  };
  ['#fitL', '#fitW', '#fitD', '#fitC'].forEach(id => $(id).addEventListener('input', run));
  run();
});
