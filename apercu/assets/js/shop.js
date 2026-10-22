/* Shop page: livery preview and cart request form. */
addEventListener('DOMContentLoaded', () => {
  $$('select[data-preview]').forEach(sel => sel.addEventListener('change', () => {
    const im = $(sel.dataset.preview), src = sel.selectedOptions[0].dataset.img;
    im.style.opacity = .2; setTimeout(() => { im.src = src; im.style.opacity = 1; }, reduce ? 0 : 150);
  }));

  const showCart = () => {
    const items = Cart.get(), tot = Cart.totals(items);
    $('#reqCart').innerHTML = items.length
      ? `<ul class="grid gap-2">${items.map(i => `<li class="flex justify-between gap-4"><span>${i.qty} × ${PRODUCTS[i.id].name}${i.livery ? ' · ' + i.livery : ''}${i.opts && i.opts.length ? ' + ' + i.opts.join(', ') : ''}</span><span class="num text-brume">${Cart.money(Cart.unit(i) * i.qty, PRODUCTS[i.id].cur)}</span></li>`).join('')}</ul>`
        + `<div class="mt-4 border-t border-white/10 pt-3">${Object.entries(tot).map(([c, v]) => `<p class="flex justify-between font-semibold"><span>Total ${Cart.curLabel(c)}</span><span class="num">${Cart.money(v, c)}</span></p><p class="mt-1 flex justify-between text-brume"><span>${tt('Acompte 30 %', '30 % deposit')}</span><span class="num text-lagoon">${Cart.money(Math.round(v * 30) / 100, c)}</span></p>`).join('')}</div>`
      : `<p class="text-brume">${tt('Votre panier est vide : ajoutez un modèle ci-dessus.', 'Your cart is empty: add a model above.')}</p>`;
  };
  document.addEventListener('cart:change', showCart); showCart();

  $('#cartForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const out = $('#cfOut'), name = $('#cfName').value.trim(), email = $('#cfEmail').value.trim(), phone = $('#cfPhone').value.trim();
    out.style.color = '#FFB4A8';
    if (!Cart.get().length) { out.textContent = tt('Ajoutez d\'abord un modèle au panier.', 'Add a model to the cart first.'); return; }
    if (!name || !/^\S+@\S+\.\S+$/.test(email) || phone.replace(/\D/g, '').length < 8) { out.textContent = tt('Indiquez votre nom, un e-mail valide et un téléphone.', 'Please enter your name, a valid e-mail and a phone number.'); return; }
    if (!$('#cfConsent').checked) { out.textContent = tt('Merci de cocher la case d\'accord.', 'Please tick the consent box.'); return; }
    const ref = 'EC-' + Date.now().toString(36).slice(-5).toUpperCase();
    const tot = Object.entries(Cart.totals(Cart.get())).map(([c, v]) => Cart.money(v, c) + ' (acompte 30 % : ' + Cart.money(Math.round(v * 30) / 100, c) + ')').join(' + ');
    const ok = await sendForm('E-Dolphin · Demande panier · ' + ref, { reference: ref, formulaire: 'Panier boutique', panier: Cart.summary(), total: tot, nom: name, email, telephone: phone, pays: $('#cfCountry').value.trim(), message: $('#cfMsg').value.trim() });
    out.style.color = ok ? '#2EE6A8' : '#FFB4A8';
    out.textContent = ok ? tt(`Demande ${ref} envoyée. Notre équipe vous rappelle pour finaliser.`, `Request ${ref} sent. Our team will call you to finalise.`) : tt('L\'envoi n\'a pas abouti. Réessayez dans quelques minutes.', 'Sending failed. Please try again in a few minutes.');
    if (ok) { $('#cartForm').reset(); Cart.set([]); }
  });
});
