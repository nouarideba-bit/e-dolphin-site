/* Day planner. Model: full battery lasts 150 min of mixed riding (2.5 h), a DC stop takes 30 min
   and brings the pack back to 100 %, a 10 % reserve is always kept. */
addEventListener('DOMContentLoaded', () => {
  const RANGE_MIN = 150, CHARGE_MIN = 30, RESERVE = 10;
  function simulate(len, gap, openH, closeH, fleet) {
    let t = openH * 60, soc = 100, sessions = 0, charges = 0, ride = 0; const end = closeH * 60, events = [];
    const drain = 100 / RANGE_MIN * (fleet ? 1.1 : 1); // rental riders push a bit harder
    while (t < end) {
      const need = len * drain;
      if (soc - need < RESERVE) {
        if (t + CHARGE_MIN > end) break;
        events.push({ type: 'charge', a: t, b: t + CHARGE_MIN, s0: soc, s1: 100 }); t += CHARGE_MIN; soc = 100; charges++; continue;
      }
      if (t + len > end) break;
      events.push({ type: 'ride', a: t, b: t + len, s0: soc, s1: soc - need }); t += len; soc -= need; sessions++; ride += len;
      if (t + gap < end) { events.push({ type: 'gap', a: t, b: t + gap, s0: soc, s1: soc }); t += gap; } else break;
    }
    return { events, sessions, charges, ride };
  }
  function draw() {
    const len = +$('#sessLen').value, gap = +$('#gap').value, openH = +$('#open').value, closeH = openH + 9, fleet = $('#useFleet').checked;
    $('#sessLenOut').textContent = `${len} min`; $('#gapOut').textContent = `${gap} min`; $('#openOut').textContent = `${openH} h – ${closeH} h`;
    const r = simulate(len, gap, openH, closeH, fleet);
    $('#sessCount').textContent = r.sessions; $('#charges').textContent = r.charges;
    $('#onWater').textContent = `${Math.floor(r.ride / 60)} h ${String(r.ride % 60).padStart(2, '0')}`;
    const W = 800, H = 260, L = 44, R = 16, T = 16, B = 46, x0 = openH * 60, x1 = closeH * 60;
    const X = m => L + (m - x0) / (x1 - x0) * (W - L - R), Y = s => T + (100 - s) / 100 * (H - T - B);
    const col = { ride: '#2EE6A8', charge: '#9BE15D', gap: 'rgba(246,248,247,.18)' }, mono = 'IBM Plex Mono, monospace';
    let svg = `<defs><linearGradient id="g" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#2EE6A8"/><stop offset="1" stop-color="#2EE6A8" stop-opacity="0"/></linearGradient></defs>`;
    for (const s of [0, 25, 50, 75, 100]) svg += `<line x1="${L}" x2="${W - R}" y1="${Y(s)}" y2="${Y(s)}" stroke="rgba(143,163,174,.14)"/><text x="${L - 8}" y="${Y(s) + 4}" text-anchor="end" font-size="11" fill="#8FA3AE" font-family="${mono}">${s}%</text>`;
    svg += `<line x1="${L}" x2="${W - R}" y1="${Y(RESERVE)}" y2="${Y(RESERVE)}" stroke="#8FA3AE" stroke-dasharray="4 5" opacity=".6"/><text x="${W - R}" y="${Y(RESERVE) - 6}" text-anchor="end" font-size="10" fill="#8FA3AE" font-family="${mono}">${tt('réserve 10 %', '10 % reserve')}</text>`;
    for (let h = openH; h <= closeH; h++) svg += `<text x="${X(h * 60)}" y="${H - 8}" text-anchor="middle" font-size="11" fill="#8FA3AE" font-family="${mono}">${h}h</text>`;
    for (const e of r.events) svg += `<rect x="${X(e.a)}" y="${H - B + 8}" width="${Math.max(1, X(e.b) - X(e.a) - 1)}" height="10" rx="5" fill="${col[e.type]}"/>`;
    let d = `M${X(x0)} ${Y(100)}`;
    for (const e of r.events) d += ` L${X(e.a)} ${Y(e.s0)} L${X(e.b)} ${Y(e.s1)}`;
    const last = r.events.at(-1);
    if (last) svg += `<path d="${d} L${X(last.b)} ${Y(0)} L${X(x0)} ${Y(0)} Z" fill="url(#g)" opacity=".3"/>`;
    svg += `<path d="${d}" fill="none" stroke="#2EE6A8" stroke-width="2.4" stroke-linejoin="round"/>`;
    if (last) svg += `<circle cx="${X(last.b)}" cy="${Y(last.s1)}" r="5" fill="#2EE6A8" stroke="#06131C" stroke-width="2"/>`;
    $('#dayChart').innerHTML = svg;
  }
  ['sessLen', 'gap', 'open', 'usePrivate', 'useFleet'].forEach(id => $('#' + id).addEventListener('input', draw));
  draw();
});
