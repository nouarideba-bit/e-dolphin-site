import { tr, img, head, fig, btn, ctaBand, heroLoop, filmBtn, filmDialog } from '../ui.mjs';

export const meta = {
  fr: { title: 'E-Dolphin · Le jet-ski 100 % électrique de luxe', desc: 'IRUKA : 215 ch, 60 nœuds visés, zéro essence à bord. Pour votre yacht, votre flotte de location ou votre réseau de distribution. Conçu et assemblé en France.' },
  en: { title: 'E-Dolphin · The 100% electric luxury jet ski', desc: 'IRUKA: 215 hp, 60 knots targeted, zero fuel on board. For your yacht, your rental fleet or your dealer network. Designed and assembled in France.' }
};
export const scripts = ['herofilm.js'];

export const body = (L, R) => {
  const t = tr(L);
  return `
  <!-- 1. Hero -->
  <section class="relative isolate flex min-h-[100svh] items-end overflow-hidden">
    ${heroLoop(L, R)}
    <div class="hero-shade absolute inset-0 -z-10"></div>
    <div class="gutter w-full">
      <div class="mx-auto max-w-7xl pb-28 pt-36 sm:pb-24">
        <p class="eyebrow rise">${t('Jet-ski 100 % électrique · conçu et assemblé en France', '100 % electric jet-ski · designed and assembled in France')}</p>
        <h1 class="rise mt-5 max-w-3xl font-display text-[2.7rem] font-semibold leading-[1.02] sm:text-7xl">${t('Le silence <br class="hidden sm:block">a une vitesse.', 'Silence <br class="hidden sm:block">has a speed.')}</h1>
        <p class="rise mt-6 max-w-xl text-brume sm:text-lg">${t('IRUKA : 215 ch, 60 nœuds et pas une goutte d\'essence. On n\'entend plus que l\'eau, le vent et votre accélération.', 'IRUKA: 215 hp, 60 knots and not a drop of fuel. All you hear is the water, the wind and your acceleration.')}</p>
        <div class="rise mt-9 flex flex-wrap gap-3">
          ${btn('reserver.html', t('Réserver un essai en mer', 'Book a sea trial'), 'calendar-check')}
          ${btn('iruka.html', t('Découvrir IRUKA', 'Discover IRUKA'), 'arrow-right', false)}
          ${filmBtn(L)}
        </div>
        <p class="rise mt-8 font-display text-lg">${t('À partir de', 'From')} <span class="num font-semibold">35 990 € HT</span></p>
        <p class="mt-2 tag text-brume/80">${t('Images réelles du prototype S300 en mer', 'Real footage of the S300 prototype at sea')}</p>
      </div>
    </div>
  </section>
  ${filmDialog(L, R)}

  <!-- 2. Proof strip -->
  <section class="gutter">
    <dl class="rise glass mx-auto grid max-w-7xl grid-cols-2 overflow-hidden rounded-2xl lg:grid-cols-4">
      <div class="border-b border-r border-white/10 p-5 lg:border-b-0"><dt class="tag text-brume">${t('Sur l\'eau', 'On the water')}</dt><dd class="mt-1 font-display text-2xl font-semibold">${t('0 émission', 'Zero emissions')}</dd></div>
      <div class="border-b border-white/10 p-5 lg:border-b-0 lg:border-r"><dt class="tag text-brume">${t('Autonomie en usage mixte', 'Mixed-use range')}</dt><dd class="num mt-1 font-display text-2xl font-semibold text-lime">2,5 h<span class="text-base">+</span></dd></div>
      <div class="border-r border-white/10 p-5"><dt class="tag text-brume">${t('Recharge rapide CCS2', 'CCS2 fast charging')}</dt><dd class="num mt-1 font-display text-2xl font-semibold text-lime">≈ 30 min</dd></div>
      <div class="p-5"><dt class="tag text-brume">${t('Fabrication', 'Build')}</dt><dd class="mt-1 font-display text-2xl font-semibold">${t('Assemblé en France', 'Assembled in France')}</dd></div>
    </dl>
    <p class="mx-auto mt-3 max-w-7xl tag text-brume/80">${t('Objectifs de conception IRUKA, à confirmer lors des essais de validation.', 'IRUKA design targets, to be confirmed by validation trials.')}</p>
  </section>

  <!-- 3. Why electric -->
  <section class="gutter py-20 sm:py-28">
    <div class="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
      <div>
        ${head({ eyebrow: t('Pourquoi l\'électrique', 'Why electric'), title: t('Au mouillage, personne ne vous entend arriver.', 'At anchor, nobody hears you coming.'), lead: t('Ports, criques et plages privées deviennent exigeants sur le bruit et la pollution. IRUKA ne laisse ni odeur, ni fumée, ni irisation sur l\'eau, et n\'embarque pas un litre d\'essence dans le garage du yacht.', 'Ports, coves and private beaches are getting strict about noise and pollution. IRUKA leaves no smell, no smoke and no sheen on the water, and brings not a litre of fuel into the yacht\'s garage.') })}
        <ul class="mt-8 grid gap-4 sm:grid-cols-3">
          <li class="glass rounded-2xl p-5"><i data-lucide="volume-x" class="h-5 w-5 text-lagoon"></i><p class="mt-3 font-semibold">${t('Silence', 'Silence')}</p><p class="mt-1 text-sm text-brume">${t('Plus de moteur thermique, seulement le jet.', 'No combustion engine, only the jet.')}</p></li>
          <li class="glass rounded-2xl p-5"><i data-lucide="fuel" class="h-5 w-5 text-lagoon"></i><p class="mt-3 font-semibold">${t('Zéro essence', 'Zero fuel')}</p><p class="mt-1 text-sm text-brume">${t('Plus simple pour l\'équipage et l\'assureur.', 'Simpler for the crew and the insurer.')}</p></li>
          <li class="glass rounded-2xl p-5"><i data-lucide="leaf" class="h-5 w-5 text-lagoon"></i><p class="mt-3 font-semibold">${t('Eau propre', 'Clean water')}</p><p class="mt-1 text-sm text-brume">${t('Batterie traçable, prévue pour une seconde vie.', 'Traceable battery, planned for a second life.')}</p></li>
        </ul>
      </div>
      ${fig(img(R, 's300-real-side.jpg'), t('Le S300 à l\'arrêt sur une mer bleu profond', 'The S300 at rest on deep blue water'), t('Photo réelle · S300', 'Real photo · S300'), 'aspect-[4/3]')}
    </div>
  </section>

  <!-- 4. IRUKA in three details -->
  <section class="gutter pb-20 sm:pb-28">
    <div class="mx-auto max-w-7xl">
      <div class="flex flex-wrap items-end justify-between gap-6">
        <div>${head({ eyebrow: 'IRUKA', title: t('Trois détails qui disent tout.', 'Three details that say it all.') })}</div>
        <a href="iruka.html" class="inline-flex items-center gap-2 text-sm font-semibold text-lagoon">${t('Voir la fiche technique', 'See the specifications')} <i data-lucide="arrow-right" class="h-4 w-4"></i></a>
      </div>
      <div class="mt-12 grid gap-4 md:grid-cols-3">
        <article>${fig(img(R, 's300-real-bow.jpg'), t('L\'étrave du S300 fend l\'eau', 'The S300 bow cutting through the water'), t('Photo réelle', 'Real photo'), 'aspect-[4/5]')}<h3 class="mt-4 font-display text-xl font-semibold">${t('Une étrave taillée pour la mer', 'A bow built for the open sea')}</h3><p class="mt-1 text-sm text-brume">${t('Plus de 200 heures de navigation sur le prototype.', 'Over 200 hours at sea on the prototype.')}</p></article>
        <article>${fig(img(R, 's300-real-ccs2.jpg'), t('Prise de recharge rapide CCS2 sous la trappe avant', 'CCS2 fast-charging socket under the front hatch'), t('Photo réelle', 'Real photo'), 'aspect-[4/5]')}<h3 class="mt-4 font-display text-xl font-semibold">${t('La prise des voitures électriques', 'The same plug as electric cars')}</h3><p class="mt-1 text-sm text-brume">${t('Recharge rapide CCS2 sur les bornes DC des marinas.', 'CCS2 fast charging on marina DC chargers.')}</p></article>
        <article>${fig(img(R, 'detail-led.jpg'), t('Signature lumineuse LED d\'IRUKA', 'IRUKA LED light signature'), t('Rendu', 'Render'), 'aspect-[4/5]')}<h3 class="mt-4 font-display text-xl font-semibold">${t('Une signature reconnaissable de loin', 'A signature you recognise from afar')}</h3><p class="mt-1 text-sm text-brume">${t('LED avant et arrière, de jour comme de nuit.', 'Front and rear LEDs, day and night.')}</p></article>
      </div>
    </div>
  </section>

  <!-- 5. Yachts and fleets -->
  <section class="gutter">
    <div class="panel mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] lg:grid-cols-2">
      <div class="p-8 sm:p-14">
        ${head({ eyebrow: t('Pour votre yacht et votre flotte', 'For your yacht and your fleet'), title: t('Le tender qui ne réveille personne.', 'The tender that wakes no one.') })}
        <div class="mt-10 grid gap-8 sm:grid-cols-2">
          <div><p class="eyebrow-sand">${t('Yachts et charters', 'Yachts and charters')}</p><p class="mt-3 text-brume">${t('Rangé dans le garage sans essence à bord, rechargé en 30 minutes, prêt pour les invités au mouillage.', 'Stored in the garage with no fuel aboard, recharged in 30 minutes, ready for guests at anchor.')}</p></div>
          <div><p class="eyebrow-sand">${t('Hôtels, clubs, loueurs', 'Hotels, clubs, rentals')}</p><p class="mt-3 text-brume">${t('Une flotte connectée, environ six sorties par jour et par machine, recharge comprise.', 'A connected fleet, about six rides per day per craft, charging included.')}</p></div>
        </div>
        <div class="mt-10">${btn('yachts-flottes.html', t('Parler à un conseiller', 'Talk to an advisor'), 'arrow-right', false)}</div>
      </div>
      <img src="${img(R, 'use-yacht.jpg')}" alt="${t('IRUKA dans le garage d\'un yacht', 'IRUKA in a yacht garage')}" class="h-72 w-full object-cover lg:h-full" loading="lazy">
    </div>
    <p class="mx-auto mt-3 max-w-7xl tag text-brume/80">${t('Rendu', 'Render')}</p>
  </section>

  <!-- 6. Express booking -->
  <section class="gutter py-20 sm:py-28">
    <div class="mx-auto max-w-7xl">
      ${head({ eyebrow: t('Réservation', 'Booking'), title: t('Choisissez votre rendez-vous.', 'Choose your appointment.') })}
      <div class="mt-12 grid gap-4 md:grid-cols-3">
        <a href="reserver.html?formule=essai" class="glass lift rounded-3xl p-6"><i data-lucide="waves" class="h-6 w-6 text-lagoon"></i><h3 class="mt-4 font-display text-xl font-semibold">${t('Essai en mer', 'Sea trial')}</h3><p class="mt-1 text-sm text-brume">${t('45 minutes accompagné, briefing compris.', '45 minutes with a guide, briefing included.')}</p></a>
        <a href="reserver.html?formule=presentation" class="glass lift rounded-3xl p-6"><i data-lucide="anchor" class="h-6 w-6 text-lagoon"></i><h3 class="mt-4 font-display text-xl font-semibold">${t('Présentation privée', 'Private presentation')}</h3><p class="mt-1 text-sm text-brume">${t('1 heure, à quai ou à bord de votre yacht.', 'One hour, at the quay or on board your yacht.')}</p></a>
        <a href="reserver.html?formule=launch" class="glass lift rounded-3xl p-6"><i data-lucide="gem" class="h-6 w-6 text-sand"></i><h3 class="mt-4 font-display text-xl font-semibold">Launch Edition</h3><p class="mt-1 text-sm text-brume">${t('Demande de réservation, 300 exemplaires.', 'Reservation request, 300 units.')}</p></a>
      </div>
      <div class="mt-6 flex flex-wrap items-center gap-2 text-sm">
        <span class="mr-2 text-brume">${t('Lieux :', 'Locations:')}</span>
        <span class="glass rounded-full px-4 py-2">Monaco</span><span class="glass rounded-full px-4 py-2">Antibes</span><span class="glass rounded-full px-4 py-2">Saint-Tropez</span><span class="glass rounded-full px-4 py-2">${t('À bord de votre yacht', 'On board your yacht')}</span><span class="glass rounded-full px-4 py-2 text-brume">${t('Lac d\'Annecy · présentation à quai', 'Lake Annecy · quayside presentation')}</span>
      </div>
      <div class="mt-8">${btn('reserver.html', t('Choisir une date', 'Pick a date'), 'calendar-check')}</div>
    </div>
  </section>

  <!-- 7. Launch Edition -->
  <section class="gutter">
    <div class="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10">
      <img src="${img(R, 'signature-veil.jpg')}" alt="${t('Un jet-ski sous un voile dans un showroom', 'A jet-ski under a veil in a showroom')}" class="absolute inset-0 h-full w-full object-cover opacity-45" loading="lazy">
      <div class="absolute inset-0 bg-gradient-to-r from-abyss via-abyss/85 to-abyss/20"></div>
      <div class="relative max-w-2xl p-8 sm:p-14">
        <p class="eyebrow-sand">Launch Edition</p>
        <h2 class="mt-4 font-display text-3xl font-semibold sm:text-5xl">${t('300 exemplaires numérotés.', '300 numbered units.')}</h2>
        <p class="mt-5 text-brume">${t('La première série d\'IRUKA, finitions signature et priorité de livraison.', 'The first IRUKA series, signature finish and delivery priority.')}</p>
        <p class="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1"><span class="num font-display text-3xl font-semibold">90 000 $ HT</span><span class="text-sm text-brume">${t('Acompte de 30 %, ouverture prochaine', '30 % deposit, opening soon')}</span></p>
        <div class="mt-8">${btn('launch-edition.html', t('Découvrir la Launch Edition', 'Discover the Launch Edition'), 'arrow-right')}</div>
      </div>
    </div>
  </section>

  <!-- 8. Coming soon -->
  <section class="gutter py-20 sm:py-28">
    <div class="mx-auto max-w-7xl">
      ${head({ eyebrow: t('Bientôt', 'Coming soon'), title: t('La famille s\'agrandit.', 'The family is growing.'), lead: t('Deux projets en développement : les Tridens, des modèles trois places, et une gamme pensée pour les enfants.', 'Two projects in development: the Tridens three-seat models, and a range designed for children.') })}
      <div class="mt-12 grid gap-4 md:grid-cols-2">
        <article>${fig(img(R, 'tridens-flou.jpg'), t('Concept Tridens, modèle trois places', 'Tridens concept, three-seat model'), t('Rendu flouté · confidentiel', 'Blurred render · confidential'), 'aspect-[16/9]')}<h3 class="mt-4 font-display text-xl font-semibold">Tridens</h3><p class="mt-1 text-sm text-brume">${t('Trois places, trois coques. Bientôt.', 'Three seats, three hulls. Coming soon.')}</p></article>
        <article>${fig(img(R, 'kids-mako2-flou.jpg'), t('MAKO, kart-boat électrique pour enfants, concept', 'MAKO, electric kart-boat for children, concept'), t('Rendu flouté · confidentiel', 'Blurred render · confidential'), 'aspect-[16/9]')}<h3 class="mt-4 font-display text-xl font-semibold">${t('Gamme enfants', 'Kids range')}</h3><p class="mt-1 text-sm text-brume">${t('Jet-skis et kart-boats pour les 6-12 ans, sous contrôle des parents. Bientôt.', 'Jet-skis and kart-boats for ages 6 to 12, under parental control. Coming soon.')}</p></article>
      </div>
    </div>
  </section>
  ${ctaBand(L)}`;
};
