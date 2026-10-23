import { tr, img, head } from '../ui.mjs';

export const meta = {
  fr: { title: 'Commander IRUKA, jet-ski électrique de luxe · E-Dolphin', desc: 'Configurez IRUKA ou la Launch Edition, choisissez votre livrée et envoyez votre sélection à notre équipe.' },
  en: { title: 'Order IRUKA, the luxury electric jet ski · E-Dolphin', desc: 'Configure IRUKA or the Launch Edition, choose your livery and send your selection to our team.' }
};
export const scripts = ['shop.js'];

const LIVERIES = [
  ['Blanc · noir · lime', 'White · black · lime', 'livery-blanc.jpg'],
  ['Gris · rouge', 'Grey · red', 'livery-gris.jpg'],
  ['Predator', 'Predator', 'livery-predator.jpg'],
  ['Magma', 'Magma', 'livery-magma.jpg'],
  ['Wasp', 'Wasp', 'livery-wasp.jpg']
];

export const body = (L, R) => {
  const t = tr(L);
  const options = LIVERIES.map(([fr, en, file], i) => `<option value="${L === 'fr' ? fr : en}" data-img="${img(R, file)}"${i === 0 ? ' selected' : ''}>${L === 'fr' ? fr : en}</option>`).join('');
  const product = (id, name, price, sub, lines, primaryImg) => `
    <article class="glass grid overflow-hidden rounded-[2rem] lg:grid-cols-[1.2fr_1fr]">
      <figure class="relative">
        <img id="img-${id}" src="${primaryImg}" alt="${name}" class="aspect-[16/10] h-full w-full object-cover transition-opacity duration-300" ${id === 'iruka' ? 'fetchpriority="high"' : 'loading="lazy"'}>
        <figcaption class="glass tag absolute bottom-3 left-3 rounded-full px-3 py-1">${t('Rendu', 'Render')}</figcaption>
      </figure>
      <div class="flex flex-col p-6 sm:p-8">
        <p class="${id === 'launch' ? 'eyebrow-sand' : 'eyebrow'}">${sub}</p>
        <h2 class="mt-3 font-display text-3xl font-semibold">${name}</h2>
        <p class="num mt-3 font-display text-2xl">${price}</p>
        <ul class="mt-5 grid gap-2 text-sm text-brume">${lines.map(l => `<li class="flex gap-2"><i data-lucide="check" class="mt-0.5 h-4 w-4 shrink-0 text-lagoon"></i>${l}</li>`).join('')}</ul>
        <label for="liv-${id}" class="mt-6 text-sm text-brume">${t('Livrée', 'Livery')}</label>
        <select id="liv-${id}" class="field" data-preview="#img-${id}">${options}</select>
        <a href="configurateur.html?modele=${id}" class="btn-ghost mt-6 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold">${t('Personnaliser : options et 360°', 'Customise: options and 360°')} <i data-lucide="sliders-horizontal" class="h-4 w-4"></i></a>
        <button type="button" data-add="${id}" data-livery-from="#liv-${id}" class="btn-primary mt-3 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold">${t('Ajouter à ma sélection', 'Add to my selection')} <i data-lucide="shopping-bag" class="h-4 w-4"></i></button>
      </div>
    </article>`;
  return `
  <section class="gutter pb-10 pt-32 sm:pt-40">
    <div class="mx-auto max-w-7xl">
      <p class="eyebrow">${t('Commander', 'Order')}</p>
      <h1 class="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-6xl">${t('Commandez votre IRUKA.', 'Order your IRUKA.')}</h1>
      <p class="mt-5 max-w-2xl text-brume">${t('Choisissez votre modèle et votre livrée. Le paiement en ligne ouvre bientôt ; en attendant, envoyez votre sélection à notre équipe, qui vous rappelle pour finaliser.', 'Choose your model and livery. Online payment opens soon; meanwhile, send your selection to our team, who will call you to finalise.')}</p>
    </div>
  </section>

  <section class="gutter pb-16">
    <div class="mx-auto grid max-w-7xl gap-6">
      ${product('iruka', 'IRUKA', `${t('À partir de', 'From')} 35 990 € HT`, t('Le modèle', 'The model'), [
        t('Moteur 160 kW, 60 nœuds, batterie 35 kWh', '160 kW motor, 60 knots, 35 kWh battery'),
        t('Recharge rapide CCS2, environ 30 min', 'CCS2 fast charging, about 30 min'),
        t('Écran tactile connecté, caméras avant et arrière', 'Connected touchscreen, front and rear cameras'),
        t('Acompte de 30 % : 10 797 € HT (hors options)', '30 % deposit: €10,797 excl. VAT (before options)'),
        t('Prix hors taxes, livraison et options en sus', 'Price excl. VAT, delivery and options extra')
      ], img(R, 'livery-blanc.jpg'))}
      ${product('launch', 'IRUKA Launch Edition', '90 000 $ HT', t('Série limitée · 300 exemplaires', 'Limited series · 300 units'), [
        t('Exemplaire numéroté de 001 à 300', 'Numbered unit, 001 to 300'),
        t('Finitions signature et priorité de livraison', 'Signature finish and delivery priority'),
        t('Acompte de 30 % : 27 000 $ HT', '30 % deposit: $27,000 excl. VAT'),
        t('Paiement en ligne bientôt disponible', 'Online payment opening soon')
      ], img(R, 'livery-predator.jpg'))}
    </div>
    <p class="mx-auto mt-3 max-w-7xl tag text-brume/80">${t('Caractéristiques : objectifs de conception. Livrées : rendus non contractuels.', 'Specifications: design targets. Liveries: non-contractual renders.')}</p>
  </section>

  <!-- Cart request: sends the selection to the team while online payment is closed -->
  <section id="demande" class="gutter scroll-mt-24 pb-20 sm:pb-28">
    <div class="panel mx-auto grid max-w-7xl gap-10 rounded-[2rem] p-8 sm:p-14 lg:grid-cols-2">
      <div>
        ${head({ eyebrow: t('Votre sélection', 'Your selection'), title: t('Envoyez votre demande.', 'Send your request.'), lead: t('Notre équipe vous rappelle pour confirmer la configuration, le prix, la livraison et l\'acompte.', 'Our team calls you back to confirm configuration, price, delivery and deposit.') })}
        <div id="reqCart" class="mt-8 rounded-2xl border border-white/10 p-5 text-sm"></div>
      </div>
      <form id="cartForm" class="grid gap-4 self-start" novalidate>
        <div class="grid gap-4 sm:grid-cols-2">
          <div><label for="cfName" class="text-sm text-brume">${t('Nom', 'Name')}</label><input id="cfName" required autocomplete="name" class="field"></div>
          <div><label for="cfEmail" class="text-sm text-brume">E-mail</label><input id="cfEmail" type="email" required autocomplete="email" class="field"></div>
          <div><label for="cfPhone" class="text-sm text-brume">${t('Téléphone', 'Phone')}</label><input id="cfPhone" type="tel" required autocomplete="tel" class="field"></div>
          <div><label for="cfCountry" class="text-sm text-brume">${t('Pays de livraison', 'Delivery country')}</label><input id="cfCountry" autocomplete="country-name" class="field"></div>
        </div>
        <div><label for="cfMsg" class="text-sm text-brume">Message</label><textarea id="cfMsg" rows="3" class="field"></textarea></div>
        <label class="flex items-start gap-3 text-sm text-brume"><input id="cfConsent" type="checkbox" class="mt-1 accent-[#2EE6A8]">${t('J\'accepte d\'être recontacté et j\'ai lu les', 'I agree to be contacted and have read the')} <a class="underline" href="cgv.html">${t('conditions générales de vente', 'terms of sale')}</a>.</label>
        <div class="flex flex-wrap items-center gap-4"><button type="submit" class="btn-primary inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold">${t('Envoyer ma sélection', 'Send my selection')} <i data-lucide="send" class="h-4 w-4"></i></button><p id="cfOut" class="text-sm" role="status" aria-live="polite"></p></div>
      </form>
    </div>
  </section>`;
};
