/* Contact form (yachts & fleets page). */
addEventListener('DOMContentLoaded', () => {
  const f = $('#contactForm'); if (!f) return;
  f.addEventListener('submit', async (e) => {
    e.preventDefault();
    const out = $('#ctMsgOut'), name = $('#ctName').value.trim(), email = $('#ctEmail').value.trim();
    out.style.color = '#FFB4A8';
    if (!name || !/^\S+@\S+\.\S+$/.test(email)) { out.textContent = tt('Indiquez votre nom et un e-mail valide.', 'Please enter your name and a valid e-mail.'); return; }
    if (!$('#ctConsent').checked) { out.textContent = tt('Merci de cocher la case d\'accord.', 'Please tick the consent box.'); return; }
    const ok = await sendForm('ONDARYS · Contact yachts et flottes', { formulaire: 'Yachts et flottes', nom: name, email, telephone: $('#ctPhone').value.trim(), profil: $('#ctProfile').value, machines: $('#ctUnits').value, message: $('#ctMsg').value.trim() });
    out.style.color = ok ? '#2EE6A8' : '#FFB4A8';
    out.textContent = ok ? tt(`Merci ${name}, un conseiller vous répond rapidement.`, `Thank you ${name}, an advisor will reply shortly.`) : tt('L\'envoi n\'a pas abouti. Réessayez dans quelques minutes.', 'Sending failed. Please try again in a few minutes.');
    if (ok) f.reset();
  });
});
