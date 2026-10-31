/* Request forms (Launch Edition number, fleet offer, dealer application, captain's sheet):
   each <form data-lead="Subject"> sends its named fields to the team, once the required fields
   and the consent box are filled. No payment is taken anywhere. */
addEventListener('DOMContentLoaded', () => {
  $$('form[data-lead]').forEach(f => f.addEventListener('submit', async (e) => {
    e.preventDefault();
    const out = f.querySelector('[data-out]');
    out.style.color = '#FFB4A8';
    const bad = $$('[required]', f).find(el => !el.value.trim() || (el.type === 'email' && !/^\S+@\S+\.\S+$/.test(el.value.trim())));
    if (bad) {
      const label = f.querySelector(`label[for="${bad.id}"]`);
      out.textContent = tt('Merci de compléter : ', 'Please fill in: ') + (label ? label.textContent.trim() : '');
      bad.focus(); return;
    }
    const consent = f.querySelector('[data-consent]');
    if (consent && !consent.checked) { out.textContent = tt('Merci de cocher la case d\'accord.', 'Please tick the consent box.'); return; }
    const data = { formulaire: f.dataset.lead };
    $$('[name]', f).forEach(el => {
      if (el.type === 'checkbox') { if (el.checked) data[el.name] = (data[el.name] ? data[el.name] + ', ' : '') + el.value; }
      else if (el.value.trim()) data[el.name] = el.value.trim();
    });
    const send = f.querySelector('[type=submit]'); send.disabled = true;
    const ok = await sendForm('ONDARYS · ' + f.dataset.lead, data);
    send.disabled = false;
    out.style.color = ok ? '#2EE6A8' : '#FFB4A8';
    out.textContent = ok ? f.dataset.ok : tt('L\'envoi n\'a pas abouti. Réessayez ou écrivez-nous sur WhatsApp.', 'Sending failed. Please try again or message us on WhatsApp.');
    if (ok) f.reset();
  }));
});
