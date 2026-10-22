/* Booking: sea trial, private presentation or Launch Edition request.
   Requests are e-mailed through sendForm (site.js). The Launch Edition deposit stays disabled
   until the company's own Stripe account is open: then set enabled: true and link = Stripe Payment Link. */
addEventListener('DOMContentLoaded', () => {
  const DEPOSIT = { enabled: false, percent: 30, price: 90000, amount: 27000, currency: '$ HT', link: '' };
  const BOOKING = { slots: ['09:30', '10:30', '11:30', '14:00', '15:00', '16:00', '17:00'], leadDays: 3, horizonDays: 120 };
  const TYPES = {
    essai: { label: tt('Essai en mer', 'Sea trial'), dur: 45, needsSlot: true },
    presentation: { label: tt('Présentation privée', 'Private presentation'), dur: 60, needsSlot: true },
    launch: { label: tt('Launch Edition · demande de réservation', 'Launch Edition · reservation request'), dur: 0, needsSlot: false }
  };
  const loc = LANG === 'fr' ? 'fr-FR' : 'en-GB';
  const bk = { type: 'essai', place: 'Monaco · Port Hercule', date: null, slot: null, month: null };
  const fmtDate = (d) => d.toLocaleDateString(loc, { weekday: 'long', day: 'numeric', month: 'long' });
  const fmtSlot = (s) => LANG === 'fr' ? s.replace(':', 'h').replace(/^0/, '') : s;
  const iso = (d) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  const placeLabel = () => $(`#bkPlaces input[value="${CSS.escape(bk.place)}"]`).parentElement.textContent.trim();
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const first = new Date(today); first.setDate(first.getDate() + BOOKING.leadDays);
  const last = new Date(today); last.setDate(last.getDate() + BOOKING.horizonDays);
  bk.month = new Date(first.getFullYear(), first.getMonth(), 1);

  // Indicative availability: closed on Mondays, some slots already taken (stable per date and place)
  function seed(s) { let h = 2166136261; for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }
  function freeSlots(d) {
    if (d < first || d > last || d.getDay() === 1) return [];
    const h = seed(iso(d) + bk.place);
    return BOOKING.slots.filter((_, i) => ((h >> (i * 3)) & 7) > 2);
  }
  function drawCal() {
    const m = bk.month, grid = $('#calGrid');
    $('#calTitle').textContent = m.toLocaleDateString(loc, { month: 'long', year: 'numeric' });
    $('#calPrev').disabled = m <= new Date(first.getFullYear(), first.getMonth(), 1);
    $('#calNext').disabled = m >= new Date(last.getFullYear(), last.getMonth(), 1);
    ['#calPrev', '#calNext'].forEach(s => $(s).style.opacity = $(s).disabled ? .35 : 1);
    grid.innerHTML = '';
    const offset = (m.getDay() + 6) % 7, days = new Date(m.getFullYear(), m.getMonth() + 1, 0).getDate();
    for (let i = 0; i < offset; i++) grid.append(document.createElement('span'));
    for (let n = 1; n <= days; n++) {
      const d = new Date(m.getFullYear(), m.getMonth(), n), free = freeSlots(d).length, b = document.createElement('button');
      b.type = 'button'; b.textContent = n;
      b.className = 'num aspect-square rounded-xl font-mono text-sm transition ' + (free ? 'cal-on' : 'cal-off');
      b.disabled = !free; b.setAttribute('aria-label', fmtDate(d) + (free ? ', ' + free + ' ' + tt('créneaux', 'slots') : ', ' + tt('indisponible', 'unavailable')));
      if (bk.date && iso(bk.date) === iso(d)) b.setAttribute('aria-pressed', 'true');
      b.addEventListener('click', () => { bk.date = d; bk.slot = null; drawCal(); drawSlots(); summary(); });
      grid.append(b);
    }
  }
  function drawSlots() {
    const box = $('#slots'); box.innerHTML = '';
    if (!bk.date) { $('#slotHint').textContent = tt('Choisissez une date pour voir les créneaux.', 'Pick a date to see the time slots.'); return; }
    const free = freeSlots(bk.date);
    $('#slotHint').textContent = fmtDate(bk.date) + ' · ' + placeLabel();
    BOOKING.slots.forEach(s => {
      const b = document.createElement('button'), ok = free.includes(s);
      b.type = 'button'; b.textContent = fmtSlot(s); b.disabled = !ok;
      b.className = 'num rounded-xl px-2 py-3 font-mono text-sm transition ' + (ok ? 'slot-on' : 'slot-off');
      if (bk.slot === s) b.setAttribute('aria-pressed', 'true');
      b.addEventListener('click', () => { bk.slot = s; drawSlots(); summary(); });
      box.append(b);
    });
  }
  const depositReady = () => DEPOSIT.enabled && /^https:\/\/buy\.stripe\.com\//.test(DEPOSIT.link);
  const units = () => Math.max(1, Math.min(20, +$('#bkUnits').value || 1));
  const depAmountTxt = () => (DEPOSIT.amount * units()).toLocaleString(loc) + ' ' + DEPOSIT.currency + ' (' + DEPOSIT.percent + ' %)';
  function summary() {
    const t = TYPES[bk.type];
    $('#sumType').textContent = t.label;
    $('#sumPlace').textContent = placeLabel();
    $('#sumWhen').textContent = !t.needsSlot ? tt('Rendez-vous fixé avec l\'équipe', 'Appointment set with the team') : bk.date ? fmtDate(bk.date) + (bk.slot ? ' · ' + fmtSlot(bk.slot) : ' · ' + tt('créneau à choisir', 'slot to choose')) : tt('À choisir', 'To choose');
    $('#sumDur').textContent = t.dur ? t.dur + ' min' : tt('Série limitée à 300 exemplaires', 'Limited series of 300 units');
    $('#sumPay').textContent = bk.type !== 'launch' ? tt('Aucun · confirmation par l\'équipe', 'None · confirmed by the team') : tt('Acompte de ', 'Deposit of ') + depAmountTxt() + (depositReady() ? '' : tt(' · bientôt disponible', ' · opening soon'));
    $('#depAmount').textContent = (DEPOSIT.amount * units()).toLocaleString(loc) + ' ' + DEPOSIT.currency;
  }
  function syncType() {
    const t = TYPES[bk.type];
    // Jet-skis may not sail on Lake Annecy: offered for presentations and Launch Edition only
    $$('[data-no-trial]').forEach(l => {
      const off = bk.type === 'essai', inp = l.querySelector('input');
      inp.disabled = off; l.style.opacity = off ? .4 : 1; l.style.cursor = off ? 'not-allowed' : 'pointer';
      l.title = off ? tt('Pas d\'essai en navigation sur le lac : choisissez une présentation', 'No riding on the lake: choose a presentation') : '';
      if (off && inp.checked) { const m = $('#bkPlaces input'); m.checked = true; bk.place = m.value; drawCal(); drawSlots(); }
    });
    $('#bkWhen').hidden = !t.needsSlot;
    $('#bkLaunchFields').hidden = bk.type !== 'launch';
    $$('.bk-opt, .bk-chip').forEach(l => l.classList.toggle('is-on', l.querySelector('input').checked));
    summary();
  }
  $$('#bkTypes input').forEach(i => i.addEventListener('change', () => { bk.type = i.value; syncType(); }));
  $$('#bkPlaces input').forEach(i => i.addEventListener('change', () => { bk.place = i.value; bk.slot = null; syncType(); drawCal(); drawSlots(); }));
  $('#bkUnits').addEventListener('input', summary);
  $('#calPrev').addEventListener('click', () => { bk.month = new Date(bk.month.getFullYear(), bk.month.getMonth() - 1, 1); drawCal(); });
  $('#calNext').addEventListener('click', () => { bk.month = new Date(bk.month.getFullYear(), bk.month.getMonth() + 1, 1); drawCal(); });

  // Links such as reserver.html?formule=launch&lieu=yacht preselect the form
  const q = new URLSearchParams(location.search);
  const typeIn = $(`#bkTypes input[value="${CSS.escape(q.get('formule') || 'essai')}"]`) || $('#bkTypes input');
  typeIn.checked = true; bk.type = typeIn.value;
  const placeIn = q.get('lieu') === 'yacht' ? $('[data-yacht] input') : $('#bkPlaces input');
  placeIn.checked = true; bk.place = placeIn.value;
  drawCal(); drawSlots(); syncType();

  let lastReq = null;
  $('#booking').addEventListener('submit', async (e) => {
    e.preventDefault();
    const err = $('#bkErr'), t = TYPES[bk.type];
    const name = $('#bkName').value.trim(), email = $('#bkEmail').value.trim(), phone = $('#bkPhone').value.trim();
    if (t.needsSlot && (!bk.date || !bk.slot)) { err.textContent = tt('Choisissez une date et un créneau.', 'Pick a date and a time slot.'); $('#bkWhen').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' }); return; }
    if (!name || !/^\S+@\S+\.\S+$/.test(email) || phone.replace(/\D/g, '').length < 8) { err.textContent = tt('Indiquez votre nom, un e-mail valide et un téléphone.', 'Please enter your name, a valid e-mail and a phone number.'); return; }
    if (!$('#bkConsent').checked) { err.textContent = tt('Merci d\'accepter d\'être recontacté.', 'Please agree to be contacted.'); return; }
    err.textContent = '';
    const ref = 'ED-' + Date.now().toString(36).slice(-5).toUpperCase();
    const req = {
      reference: ref, formule: t.label, lieu: bk.place,
      date: t.needsSlot ? iso(bk.date) : '', heure: t.needsSlot ? bk.slot : '',
      nom: name, email, telephone: phone, personnes: $('#bkPeople').selectedOptions[0].text,
      permis: $('#bkLicence').checked ? 'oui' : 'non', message: $('#bkMsg').value.trim(),
      livree: bk.type === 'launch' ? $('#bkLivery').value : '', unites: bk.type === 'launch' ? String(units()) : '',
      paiement: bk.type === 'launch' ? (depositReady() ? 'acompte via Stripe' : 'acompte à venir (' + depAmountTxt() + ')') : 'aucun', envoye_le: new Date().toISOString()
    };
    const btnSend = e.submitter; if (btnSend) btnSend.disabled = true;
    const sent = await sendForm('IRUKA · ' + t.label + ' · ' + ref, req);
    if (btnSend) btnSend.disabled = false;
    lastReq = { ...req, d: bk.date, dur: t.dur };
    $('#doneRef').textContent = ref;
    $('#doneText').textContent = t.needsSlot
      ? `${t.label}, ${fmtDate(bk.date)} ${tt('à', 'at')} ${fmtSlot(bk.slot)}, ${placeLabel()}.`
      : `Launch Edition (${req.unites} ${tt('unité', 'unit')}${+req.unites > 1 ? 's' : ''}, ${req.livree}), ${placeLabel()}.`;
    $('#doneNote').textContent = sent
      ? tt(`Notre équipe vous confirme ce rendez-vous par e-mail à ${email}.`, `Our team will confirm this appointment by e-mail at ${email}.`)
      : tt('L\'envoi n\'a pas abouti. Réessayez dans quelques minutes ; aucun paiement n\'est demandé.', 'Sending failed. Please try again in a few minutes; no payment is requested.');
    $('#doneTitle').textContent = sent ? tt('Demande envoyée', 'Request sent') : tt('Demande non envoyée', 'Request not sent');
    $('#icsBtn').hidden = !t.needsSlot || !sent;
    const db = $('#depBtn'); db.hidden = bk.type !== 'launch' || !sent;
    if (bk.type === 'launch') {
      db.disabled = !depositReady(); db.style.opacity = depositReady() ? 1 : .45; db.style.cursor = depositReady() ? 'pointer' : 'not-allowed';
      $('#depBtnTxt').textContent = depositReady() ? tt('Verser l\'acompte de ', 'Pay the deposit of ') + depAmountTxt() : tt('Acompte ', 'Deposit ') + depAmountTxt() + tt(' · bientôt disponible', ' · opening soon');
      db.onclick = () => { if (depositReady()) location.href = DEPOSIT.link + '?client_reference_id=' + encodeURIComponent(ref) + '&prefilled_email=' + encodeURIComponent(email); };
    }
    $('#bkSummary').hidden = true; $('#bkDone').hidden = false;
    $('#bkDone').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
  });
  $('#bkAgain').addEventListener('click', () => {
    $('#booking').reset(); $('#bkTypes input').checked = true; $('#bkPlaces input').checked = true;
    Object.assign(bk, { type: 'essai', place: 'Monaco · Port Hercule', date: null, slot: null });
    $('#bkDone').hidden = true; $('#bkSummary').hidden = false; drawCal(); drawSlots(); syncType();
  });
  // Calendar file for the requested slot (marked as pending confirmation)
  $('#icsBtn').addEventListener('click', () => {
    if (!lastReq || !lastReq.d) return;
    const [h, mi] = lastReq.heure.split(':').map(Number), s = new Date(lastReq.d); s.setHours(h, mi);
    const e2 = new Date(s.getTime() + lastReq.dur * 60000), f = (d) => iso(d).replace(/-/g, '') + 'T' + String(d.getHours()).padStart(2, '0') + String(d.getMinutes()).padStart(2, '0') + '00';
    const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//E-Dolphin//Reservation//FR', 'BEGIN:VEVENT', 'UID:' + lastReq.reference + '@e-dolphin',
      'DTSTAMP:' + f(new Date()), 'DTSTART:' + f(s), 'DTEND:' + f(e2), 'SUMMARY:E-Dolphin IRUKA · ' + lastReq.formule + tt(' (à confirmer)', ' (to be confirmed)'),
      'LOCATION:' + lastReq.lieu, 'DESCRIPTION:' + tt('Référence ', 'Reference ') + lastReq.reference, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' })); a.download = 'e-dolphin-' + lastReq.reference + '.ics'; a.click();
  });
});
