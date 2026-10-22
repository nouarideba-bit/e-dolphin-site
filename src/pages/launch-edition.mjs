import { tr, img, head, btn } from '../ui.mjs';

export const meta = {
  fr: { title: 'IRUKA Launch Edition · 300 exemplaires · E-Dolphin', desc: 'La première série d\'IRUKA : 300 exemplaires numérotés, 90 000 $ HT, acompte de 30 %.' },
  en: { title: 'IRUKA Launch Edition · 300 units · E-Dolphin', desc: 'The first IRUKA series: 300 numbered units, $90,000 excl. VAT, 30 % deposit.' }
};
export const scripts = ['waitlist.js'];

export const body = (L, R) => {
  const t = tr(L);
  const step = (n, title, text) => `<li class="relative pl-12"><span class="num absolute left-0 top-0 grid h-8 w-8 place-items-center rounded-full border border-sand/60 font-mono text-sm text-sand">${n}</span><h3 class="font-semibold">${title}</h3><p class="mt-1 text-sm text-brume">${text}</p></li>`;
  return `
  <section class="relative isolate overflow-hidden">
    <img src="${img(R, 'signature-veil.jpg')}" alt="${t('Un jet-ski sous un voile dans un showroom', 'A jet-ski under a veil in a showroom')}" class="absolute inset-0 -z-20 h-full w-full object-cover opacity-60" fetchpriority="high">
    <div class="absolute inset-0 -z-10 bg-gradient-to-r from-abyss via-abyss/85 to-abyss/20"></div>
    <div class="gutter"><div class="mx-auto max-w-7xl pb-20 pt-40 sm:pb-28 sm:pt-52">
      <p class="eyebrow-sand">Launch Edition</p>
      <h1 class="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-7xl">${t('300 exemplaires.<br>Pas un de plus.', '300 units.<br>Not one more.')}</h1>
      <p class="mt-6 max-w-xl text-brume sm:text-lg">${t('La première série d\'IRUKA, numérotée de 001 à 300, pour les propriétaires et les yachts qui veulent être les premiers sur l\'eau.', 'The first IRUKA series, numbered 001 to 300, for owners and yachts who want to be first on the water.')}</p>
      <div class="rule-sand mt-10 w-48"></div>
      <div class="mt-6 flex flex-wrap items-end gap-x-10 gap-y-4">
        <div><p class="tag text-brume">${t('Prix', 'Price')}</p><p class="num font-display text-4xl font-semibold">90 000 $ HT</p></div>
        <div><p class="tag text-brume">${t('Acompte de réservation', 'Reservation deposit')}</p><p class="num font-display text-2xl font-semibold">27 000 $ HT <span class="text-base font-normal text-brume">(30 %)</span></p></div>
      </div>
      <div class="mt-9 flex flex-wrap gap-3">
        ${btn('reserver.html?formule=launch', t('Réserver mon exemplaire', 'Reserve my unit'), 'gem')}
        <button type="button" data-add="launch" class="btn-ghost inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold">${t('Ajouter au panier', 'Add to cart')} <i data-lucide="shopping-bag" class="h-4 w-4"></i></button>
      </div>
      <p class="mt-4 inline-flex items-center gap-2 tag text-brume"><i data-lucide="lock" class="h-3.5 w-3.5"></i>${t('Paiement de l\'acompte en ligne bientôt disponible. Votre demande réserve dès maintenant votre place dans la file.', 'Online deposit payment opening soon. Your request holds your place in line today.')}</p>
    </div></div>
  </section>

  <section class="gutter py-20 sm:py-28">
    <div class="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
      <div>
        ${head({ eyebrow: t('Ce qui la distingue', 'What sets it apart'), title: t('Une série signée, pas une option.', 'A signed series, not an option.') })}
        <ul class="mt-10 grid gap-5 sm:grid-cols-2">
          <li class="glass rounded-3xl p-6"><i data-lucide="hash" class="h-5 w-5 text-sand"></i><h3 class="mt-3 font-semibold">${t('Numérotée de 001 à 300', 'Numbered 001 to 300')}</h3><p class="mt-1 text-sm text-brume">${t('Votre numéro, gravé sur la machine.', 'Your number, engraved on the craft.')}</p></li>
          <li class="glass rounded-3xl p-6"><i data-lucide="sparkles" class="h-5 w-5 text-sand"></i><h3 class="mt-3 font-semibold">${t('Finitions signature', 'Signature finish')}</h3><p class="mt-1 text-sm text-brume">${t('Carbone apparent, sellerie et détails propres à la série.', 'Exposed carbon, upholstery and details unique to the series.')}</p></li>
          <li class="glass rounded-3xl p-6"><i data-lucide="palette" class="h-5 w-5 text-sand"></i><h3 class="mt-3 font-semibold">${t('Livrée au choix', 'Choice of livery')}</h3><p class="mt-1 text-sm text-brume">${t('Blanc · noir · lime, gris · rouge, Predator, Magma, Wasp.', 'White · black · lime, grey · red, Predator, Magma, Wasp.')}</p></li>
          <li class="glass rounded-3xl p-6"><i data-lucide="calendar-check" class="h-5 w-5 text-sand"></i><h3 class="mt-3 font-semibold">${t('Priorité de livraison', 'Delivery priority')}</h3><p class="mt-1 text-sm text-brume">${t('Livrée avant la série, date confirmée à la réservation.', 'Delivered before the standard series, date confirmed when you reserve.')}</p></li>
        </ul>
      </div>
      <div>
        ${head({ eyebrow: t('Comment réserver', 'How to reserve'), title: t('Quatre étapes.', 'Four steps.') })}
        <ol class="mt-10 grid gap-7">
          ${step(1, t('Votre demande', 'Your request'), t('Sur la page Réserver ou depuis le panier, avec la livrée souhaitée.', 'On the Book page or from the cart, with your preferred livery.'))}
          ${step(2, t('Confirmation personnelle', 'Personal confirmation'), t('Notre équipe vous appelle et vous attribue votre rang dans la série.', 'Our team calls you and assigns your place in the series.'))}
          ${step(3, t('Acompte de 30 %', '30 % deposit'), t('27 000 $ HT par paiement sécurisé, dès l\'ouverture du paiement en ligne.', '$27,000 excl. VAT by secure payment, as soon as online payment opens.'))}
          ${step(4, t('Livraison', 'Delivery'), t('Essai de prise en main et remise des clés, à quai ou à bord de votre yacht.', 'Hand-over trial and keys, at the quay or on board your yacht.'))}
        </ol>
      </div>
    </div>
  </section>

  <section class="gutter pb-20 sm:pb-28">
    <div class="panel mx-auto grid max-w-7xl gap-10 rounded-[2rem] p-8 sm:p-14 lg:grid-cols-2">
      <div>
        ${head({ eyebrow: t('Liste prioritaire', 'Priority list'), title: t('Pas encore prêt à réserver ?', 'Not ready to reserve yet?'), lead: t('Inscrivez-vous : vous serez prévenu avant l\'ouverture publique de chaque tranche de la série.', 'Sign up: you will be told before each batch of the series opens to the public.') })}
      </div>
      <form id="waitlist" class="grid gap-4 self-center" novalidate>
        <div class="grid gap-4 sm:grid-cols-2">
          <div><label for="wlName" class="text-sm text-brume">${t('Nom', 'Name')}</label><input id="wlName" required autocomplete="name" class="field"></div>
          <div><label for="wlEmail" class="text-sm text-brume">E-mail</label><input id="wlEmail" type="email" required autocomplete="email" class="field"></div>
        </div>
        <div><label for="wlProfile" class="text-sm text-brume">${t('Vous êtes', 'You are')}</label>
          <select id="wlProfile" class="field"><option>${t('Propriétaire privé', 'Private owner')}</option><option>${t('Yacht ou charter', 'Yacht or charter')}</option><option>${t('Hôtel, club ou loueur', 'Hotel, club or rental')}</option><option>${t('Revendeur', 'Dealer')}</option></select></div>
        <label class="flex items-start gap-3 text-sm text-brume"><input id="wlConsent" type="checkbox" class="mt-1 accent-[#2EE6A8]">${t('J\'accepte d\'être recontacté au sujet de la Launch Edition.', 'I agree to be contacted about the Launch Edition.')}</label>
        <div class="flex flex-wrap items-center gap-4"><button type="submit" class="btn-primary inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold">${t('Rejoindre la liste', 'Join the list')} <i data-lucide="send" class="h-4 w-4"></i></button><p id="wlMsg" class="text-sm" role="status" aria-live="polite"></p></div>
      </form>
    </div>
  </section>`;
};
