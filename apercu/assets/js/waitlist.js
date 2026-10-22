/* Launch Edition priority list. */
addEventListener('DOMContentLoaded', () => {
  const f = $('#waitlist'); if (!f) return;
  f.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = $('#wlName').value.trim(), email = $('#wlEmail').value.trim(), msg = $('#wlMsg');
    msg.style.color = '#FFB4A8';
    if (!name || !/^\S+@\S+\.\S+$/.test(email)) { msg.textContent = tt('Indiquez votre nom et une adresse e-mail valide.', 'Please enter your name and a valid e-mail.'); return; }
    if (!$('#wlConsent').checked) { msg.textContent = tt('Merci de cocher la case d\'accord.', 'Please tick the consent box.'); return; }
    const ok = await sendForm('IRUKA · Liste prioritaire Launch Edition', { liste: 'Launch Edition · liste prioritaire', nom: name, email, profil: $('#wlProfile').value });
    msg.style.color = ok ? '#2EE6A8' : '#FFB4A8';
    msg.textContent = ok ? tt(`Merci ${name}. Nous vous recontactons à ${email}.`, `Thank you ${name}. We will contact you at ${email}.`) : tt('L\'envoi n\'a pas abouti. Réessayez dans quelques minutes.', 'Sending failed. Please try again in a few minutes.');
    if (ok) f.reset();
  });
});
