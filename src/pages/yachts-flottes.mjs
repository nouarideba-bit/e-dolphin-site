import { tr, img, head, fig, btn } from '../ui.mjs';

export const meta = {
  fr: { title: 'Yachts et flottes · E-Dolphin', desc: 'IRUKA comme tender de yacht ou en flotte pour hôtels, clubs et loueurs : zéro essence à bord, recharge rapide, télématique.' },
  en: { title: 'Yachts & fleets · E-Dolphin', desc: 'IRUKA as a yacht tender or as a fleet for hotels, clubs and rentals: zero fuel aboard, fast charging, telematics.' }
};
export const scripts = ['contact.js'];

export const body = (L, R) => {
  const t = tr(L);
  const point = (icon, title, text) => `<li class="flex gap-4"><i data-lucide="${icon}" class="mt-1 h-5 w-5 shrink-0 text-lagoon"></i><div><h3 class="font-semibold">${title}</h3><p class="mt-1 text-sm text-brume">${text}</p></div></li>`;
  return `
  <section class="relative isolate overflow-hidden">
    <img src="${img(R, 'use-yacht.jpg')}" alt="${t('IRUKA dans le garage d\'un yacht', 'IRUKA in a yacht garage')}" class="absolute inset-0 -z-20 h-full w-full object-cover" fetchpriority="high">
    <div class="hero-shade absolute inset-0 -z-10"></div>
    <div class="gutter"><div class="mx-auto max-w-7xl pb-20 pt-40 sm:pb-28 sm:pt-52">
      <p class="eyebrow">${t('Yachts et flottes', 'Yachts & fleets')}</p>
      <h1 class="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-6xl">${t('Le tender qui ne réveille personne au mouillage.', 'The tender that wakes no one at anchor.')}</h1>
      <p class="mt-6 max-w-xl text-brume sm:text-lg">${t('Pour les capitaines, les gestionnaires de yachts, les hôtels, les clubs de plage et les loueurs.', 'For captains, yacht managers, hotels, beach clubs and rental operators.')}</p>
      <div class="mt-9 flex flex-wrap gap-3">${btn('#contact', t('Parler à un conseiller', 'Talk to an advisor'), 'message-circle')}${btn('reserver.html?formule=presentation&lieu=yacht', t('Présentation à bord', 'Presentation on board'), 'anchor', false)}</div>
      <p class="mt-6 tag text-brume/80">${t('Rendu', 'Render')}</p>
    </div></div>
  </section>

  <!-- Yachts -->
  <section class="gutter py-20 sm:py-28">
    <div class="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
      <div>
        ${head({ eyebrow: t('Yachts et charters', 'Yachts and charters'), title: t('Pensé pour le garage d\'un yacht.', 'Designed for a yacht garage.') })}
        <ul class="mt-10 grid gap-6">
          ${point('fuel', t('Zéro essence à bord', 'Zero fuel aboard'), t('Plus de bidons ni de vapeurs dans le garage : plus simple pour l\'équipage et l\'assureur.', 'No more jerrycans or fumes in the garage: simpler for the crew and the insurer.'))}
          ${point('volume-x', t('Silence au mouillage', 'Silence at anchor'), t('Les invités partent sans déranger le pont, ni les voisins de mouillage.', 'Guests ride off without disturbing the deck or neighbouring yachts.'))}
          ${point('plug-zap', t('Recharge rapide CCS2', 'CCS2 fast charging'), t('Environ 30 minutes sur une borne DC ; solution de recharge à bord étudiée avec chaque équipage.', 'About 30 minutes on a DC charger; on-board charging studied with each crew.'))}
          ${point('life-buoy', t('Version Fleet', 'Fleet version'), t('Boudin gonflable : stable à l\'arrêt, protège la coque du yacht et la plateforme de bain.', 'Inflatable collar: stable at rest, protects the yacht\'s hull and swim platform.'))}
        </ul>
      </div>
      ${fig(img(R, 'iruka-floats.jpg'), t('IRUKA Fleet avec boudin gonflable', 'IRUKA Fleet with inflatable collar'), t('Rendu · IRUKA Fleet', 'Render · IRUKA Fleet'), 'aspect-[4/3]')}
    </div>
  </section>

  <!-- Fleets -->
  <section class="gutter pb-20 sm:pb-28">
    <div class="mx-auto max-w-7xl">
      ${head({ eyebrow: t('Hôtels, clubs, loueurs', 'Hotels, clubs, rentals'), title: t('Une flotte qui tourne toute la journée.', 'A fleet that runs all day long.'), lead: t('Machines, recharge, données et financement, clés en main.', 'Craft, charging, data and financing, turnkey.') })}
      <div class="glass mt-10 grid gap-6 rounded-3xl p-6 sm:grid-cols-3 sm:p-8">
        <div><p class="num font-display text-4xl font-semibold">≈ 6</p><p class="mt-1 text-sm text-brume">${t('sorties par jour et par machine', 'rides per day per craft')}</p></div>
        <div><p class="num font-display text-4xl font-semibold text-lime">≈ 30 min</p><p class="mt-1 text-sm text-brume">${t('de recharge entre deux sorties', 'of charging between rides')}</p></div>
        <div><p class="num font-display text-4xl font-semibold">&lt; 2</p><p class="mt-1 text-sm text-brume">${t('saisons pour amortir l\'écart de prix avec le thermique', 'seasons to recover the price gap with combustion')}</p></div>
      </div>
      <p class="mt-3 tag text-brume/80">${t('Estimations indicatives, à affiner selon votre site. Testez votre journée dans le', 'Indicative estimates, refined for your site. Try your own day in the')} <a class="underline" href="experience.html">${t('simulateur', 'simulator')}</a>.</p>
      <div class="mt-12 grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        ${fig(img(R, 'fleet-dashboard.jpg'), t('Maquette du tableau de bord de flotte : positions, caméras, batterie', 'Fleet dashboard mock-up: positions, cameras, battery'), t('Maquette d\'interface', 'Interface mock-up'), 'aspect-[4/5] object-top', 'max-h-[640px]')}
        <ul class="grid gap-6">
          ${point('radio-tower', t('Flotte connectée', 'Connected fleet'), t('Position, batterie et état de chaque machine en temps réel.', 'Position, battery and status of each craft in real time.'))}
          ${point('map-pinned', t('Zones de navigation', 'Riding zones'), t('Géolocalisation de chaque machine pour garder vos clients dans la zone autorisée.', 'Each craft is geolocated to keep your customers inside the permitted area.'))}
          ${point('video', t('Caméras avant et arrière', 'Front and rear cameras'), t('Une preuve en cas d\'incident au port ou en mer.', 'Evidence in case of an incident in port or at sea.'))}
          ${point('battery-charging', t('Station de recharge flottante', 'Floating charging station'), t('Deux chargeurs rapides DC sur ponton, en concept.', 'Two DC fast chargers on a pontoon, as a concept.'))}
        </ul>
      </div>
    </div>
  </section>

  <!-- Contact -->
  <section id="contact" class="gutter scroll-mt-24 pb-20 sm:pb-28">
    <div class="panel mx-auto grid max-w-7xl gap-10 rounded-[2rem] p-8 sm:p-14 lg:grid-cols-2">
      <div>
        ${head({ eyebrow: 'Contact', title: t('Parlons de votre yacht ou de votre flotte.', 'Let\'s talk about your yacht or your fleet.'), lead: t('Un conseiller vous répond personnellement, en français ou en anglais.', 'An advisor replies personally, in French or English.') })}
      </div>
      <form id="contactForm" class="grid gap-4" novalidate>
        <div class="grid gap-4 sm:grid-cols-2">
          <div><label for="ctName" class="text-sm text-brume">${t('Nom', 'Name')}</label><input id="ctName" required autocomplete="name" class="field"></div>
          <div><label for="ctEmail" class="text-sm text-brume">E-mail</label><input id="ctEmail" type="email" required autocomplete="email" class="field"></div>
          <div><label for="ctPhone" class="text-sm text-brume">${t('Téléphone', 'Phone')}</label><input id="ctPhone" type="tel" autocomplete="tel" class="field"></div>
          <div><label for="ctProfile" class="text-sm text-brume">${t('Vous êtes', 'You are')}</label>
            <select id="ctProfile" class="field"><option>${t('Capitaine ou gestionnaire de yacht', 'Captain or yacht manager')}</option><option>${t('Propriétaire de yacht', 'Yacht owner')}</option><option>${t('Hôtel ou club de plage', 'Hotel or beach club')}</option><option>${t('Loueur', 'Rental operator')}</option><option>${t('Revendeur', 'Dealer')}</option><option>${t('Autre entreprise', 'Other company')}</option></select></div>
        </div>
        <div><label for="ctUnits" class="text-sm text-brume">${t('Nombre de machines envisagé', 'Number of craft considered')}</label><input id="ctUnits" type="number" min="1" max="200" value="1" class="field"></div>
        <div><label for="ctMsg" class="text-sm text-brume">Message</label><textarea id="ctMsg" rows="4" class="field"></textarea></div>
        <label class="flex items-start gap-3 text-sm text-brume"><input id="ctConsent" type="checkbox" class="mt-1 accent-[#2EE6A8]">${t('J\'accepte d\'être recontacté au sujet de ma demande.', 'I agree to be contacted about my request.')} <a class="underline" href="confidentialite.html">${t('Confidentialité', 'Privacy')}</a></label>
        <div class="flex flex-wrap items-center gap-4"><button type="submit" class="btn-primary inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold">${t('Envoyer', 'Send')} <i data-lucide="send" class="h-4 w-4"></i></button><p id="ctMsgOut" class="text-sm" role="status" aria-live="polite"></p></div>
      </form>
    </div>
  </section>`;
};
