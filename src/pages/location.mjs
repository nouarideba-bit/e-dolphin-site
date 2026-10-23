import { tr, img, head, fig, btn, waBtn, PRICE } from '../ui.mjs';

export const meta = {
  fr: { title: 'Jet-skis électriques pour loueurs et hôtels · E-Dolphin', desc: 'Loueurs, hôtels, clubs : une flotte de jet-skis électriques qui tourne toute la journée. Calculez votre rentabilité, demandez une offre flotte.' },
  en: { title: 'Electric jet skis for rental fleets and hotels · E-Dolphin', desc: 'Rental operators, hotels, clubs: an electric jet ski fleet that runs all day. Work out your return, request a fleet offer.' }
};
export const scripts = ['flotte.js', 'leadform.js'];

// Page for jet-ski rental companies worldwide (audit 22 Oct): a rental operator buys a margin, not a craft.
export const body = (L, R) => {
  const t = tr(L);
  const point = (icon, title, text) => `<li class="flex gap-4"><i data-lucide="${icon}" class="mt-1 h-5 w-5 shrink-0 text-lagoon"></i><div><h3 class="font-semibold">${title}</h3><p class="mt-1 text-sm text-brume">${text}</p></div></li>`;
  const input = (id, label, val, min, max, step = 1) => `<div><label for="${id}" class="text-sm text-brume">${label}</label><input id="${id}" type="number" value="${val}" min="${min}" max="${max}" step="${step}" inputmode="decimal" class="field num"></div>`;
  const out = (id, label, cls = '') => `<div class="rounded-2xl border border-white/10 p-4"><p class="text-xs text-brume">${label}</p><p id="${id}" class="num mt-1 font-display text-2xl font-semibold ${cls}">–</p></div>`;
  const faq = (q, a) => `<details class="border-b border-white/10 py-5"><summary class="flex items-center justify-between gap-4 font-display text-lg font-semibold">${q}<i data-lucide="plus" class="chev h-5 w-5 shrink-0 text-lagoon"></i></summary><p class="mt-3 max-w-3xl text-brume">${a}</p></details>`;
  const pillar = (icon, title, text) => `<li class="glass rounded-3xl p-6"><i data-lucide="${icon}" class="h-6 w-6 text-lagoon"></i><h3 class="mt-4 font-display text-xl font-semibold">${title}</h3><p class="mt-2 text-sm text-brume">${text}</p></li>`;
  // IRUKA Fleet feature tabs (modelled on the Sea-Doo rental page, adam 22 Oct)
  const TABS = [
    ['zap', t('Économie', 'Savings'), 'charging-station-uhd-2560.jpg', t('Rendu', 'Render'), t('Quelques euros d\'énergie par heure.', 'A few euros of energy per hour.'), t('Environ 14 kWh par heure de location : avec les hypothèses du calculateur, près de 3,50 € d\'électricité contre près de 48 € d\'essence pour un thermique.', 'About 14 kWh per rental hour: with the calculator\'s assumptions, about €3.50 of electricity against about €48 of fuel for a combustion craft.')],
    ['wrench', t('Entretien', 'Servicing'), 'detail-jet-hd.jpg', t('Rendu', 'Render'), t('Ni vidange, ni bougies.', 'No oil change, no spark plugs.'), t('Un moteur électrique a peu de pièces d\'usure : moins d\'immobilisation en pleine saison, et une batterie suivie à distance.', 'An electric motor has few wearing parts: less downtime in peak season, and a battery monitored remotely.')],
    ['life-buoy', t('Stabilité', 'Stability'), 'iruka-floats.jpg', t('Rendu', 'Render'), t('Le boudin qui rassure les débutants.', 'The collar that reassures beginners.'), t('La version Fleet a un boudin gonflable : stable à l\'arrêt, plus facile pour monter à bord, et elle protège pontons et coques.', 'The Fleet version has an inflatable collar: stable at rest, easier to board, and it protects pontoons and hulls.')],
    ['shield-check', t('Sécurité', 'Safety'), 'use-safety.jpg', t('Rendu', 'Render'), t('Vos clients restent dans la zone.', 'Your customers stay in the zone.'), t('Chaque machine est géolocalisée sur le tableau de bord de flotte, avec des zones de navigation et des caméras avant et arrière.', 'Each craft is geolocated on the fleet dashboard, with riding zones and front and rear cameras.')],
    ['volume-x', t('Silence', 'Silence'), 'use-fleet.jpg', t('Rendu', 'Render'), t('Une expérience que l\'on raconte.', 'An experience people talk about.'), t('Pas de bruit de moteur ni d\'odeur d\'essence : vos clients se parlent en navigant, et vos voisins de plage vous le rendent.', 'No engine noise and no smell of fuel: your customers can talk while riding, and your beach neighbours notice.')],
    ['battery-charging', t('Recharge', 'Charging'), 's300-real-ccs2.jpg', t('Photo réelle', 'Real photo'), t('Environ 30 minutes entre deux locations.', 'About 30 minutes between rentals.'), t('Prise rapide CCS2 sous la trappe avant, jusqu\'à 70 kW en courant continu : la machine repart pendant que le client suivant s\'équipe.', 'CCS2 fast socket under the front hatch, up to 70 kW DC: the craft is ready again while the next customer gets kitted out.')]
  ];
  const opt = (v, label) => `<label class="flex items-center gap-2 text-sm"><input type="checkbox" name="options" value="${v}" class="accent-[#2EE6A8]">${label}</label>`;
  return `
  <section class="relative isolate overflow-hidden">
    <img src="${img(R, 'charging-station-uhd-2560.jpg')}" srcset="${img(R, 'charging-station-uhd-1600.jpg')} 1600w, ${img(R, 'charging-station-uhd-2560.jpg')} 2560w, ${img(R, 'charging-station-uhd-3840.jpg')} 3840w" sizes="100vw" alt="${t('Ponton de recharge flottant avec des IRUKA', 'Floating charging pontoon with IRUKA craft')}" class="absolute inset-0 -z-20 h-full w-full object-cover" fetchpriority="high">
    <div class="hero-shade absolute inset-0 -z-10"></div>
    <div class="gutter"><div class="mx-auto max-w-7xl pb-20 pt-40 sm:pb-28 sm:pt-52">
      <p class="eyebrow">${t('Pour ma location · loueurs, hôtels, clubs', 'For my rental · operators, hotels, clubs')}</p>
      <h1 class="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-6xl">${t('Une flotte qui tourne toute la journée, sans une goutte d\'essence.', 'A fleet that runs all day, without a drop of fuel.')}</h1>
      <p class="mt-6 max-w-xl text-brume sm:text-lg">${t('Environ 30 minutes de recharge entre deux locations, un coût d\'énergie à l\'heure bien plus bas qu\'un thermique, et des clients qui reviennent pour le silence.', 'About 30 minutes of charging between rentals, a far lower energy cost per hour than combustion, and customers who come back for the silence.')}</p>
      <div class="mt-9 flex flex-wrap gap-3">${btn('#calcul', t('Calculer ma rentabilité', 'Work out my return'), 'calculator')}${btn('#offre', t('Demander une offre flotte', 'Request a fleet offer'), 'send', false)}${waBtn(L, 'WhatsApp', t('Bonjour, je suis loueur et je souhaite une offre flotte IRUKA.', 'Hello, I run a rental business and would like an IRUKA fleet offer.'))}</div>
      <p class="mt-6 tag text-brume/80">${t('Rendu', 'Render')}</p>
    </div></div>
  </section>

  <!-- Rental programme: three pillars (Sea-Doo rental page model, adam 22 Oct) -->
  <section class="gutter py-16 sm:py-24">
    <div class="mx-auto max-w-7xl">
      ${head({ eyebrow: t('Programme loueurs E-Dolphin', 'E-Dolphin rental programme'), title: t('Devenez loueur E-Dolphin.', 'Become an E-Dolphin rental partner.'), lead: t('Loueurs de jet-skis, hôtels, clubs de plage et marinas, partout dans le monde : proposez à vos clients le jet-ski électrique de luxe, avec un programme pensé pour une flotte.', 'Jet-ski rental companies, hotels, beach clubs and marinas, worldwide: offer your customers the electric luxury jet ski, with a programme built for a fleet.') })}
      <ul class="mt-10 grid gap-4 md:grid-cols-3">
        ${pillar('badge-percent', t('Tarifs flotte dédiés', 'Dedicated fleet pricing'), t('Un tarif selon le nombre de machines, à l\'achat ou en loyer mensuel clés en main.', 'Pricing based on the number of craft, bought outright or on a turnkey monthly fee.'))}
        ${pillar('shield-check', t('Garantie et service', 'Warranty and service'), t('Garantie, pièces et formation de vos équipes : les conditions sont précisées dans votre offre.', 'Warranty, parts and training for your staff: the terms are set out in your offer.'))}
        ${pillar('megaphone', t('Accompagnement marketing', 'Marketing support'), t('Photos, film, supports de vente et kit capitainerie pour lancer votre saison électrique.', 'Photos, film, sales material and harbour-office kit to launch your electric season.'))}
      </ul>
    </div>
  </section>

  <!-- Return calculator: every assumption is shown and can be changed -->
  <section id="calcul" class="gutter scroll-mt-24 pb-16 sm:pb-24">
    <div class="mx-auto max-w-7xl">
      ${head({ eyebrow: t('Calculateur de rentabilité', 'Return calculator'), title: t('Ce que votre flotte rapporte, et ce qu\'elle économise.', 'What your fleet earns, and what it saves.'), lead: t('Remplacez nos hypothèses par les vôtres : le calcul se met à jour tout de suite.', 'Replace our assumptions with yours: the result updates at once.') })}
      <div class="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div class="glass grid gap-4 rounded-3xl p-6 sm:grid-cols-2 sm:p-8">
          ${input('fcN', t('Nombre de machines', 'Number of craft'), 6, 1, 200)}
          ${input('fcPrice', t('Prix de location (€ par heure)', 'Rental price (€ per hour)'), 150, 10, 2000)}
          ${input('fcHours', t('Heures louées par jour et par machine', 'Hours rented per day per craft'), 5, 1, 12, .5)}
          ${input('fcDays', t('Jours de saison par an', 'Season days per year'), 120, 10, 365)}
          ${input('fcKwh', t('Prix de l\'électricité (€ par kWh)', 'Electricity price (€ per kWh)'), .25, .05, 2, .01)}
          ${input('fcFuel', t('Prix de l\'essence (€ par litre)', 'Fuel price (€ per litre)'), 1.9, .5, 5, .01)}
          ${input('fcCons', t('Consommation d\'un thermique (litres par heure)', 'Combustion consumption (litres per hour)'), 25, 5, 80)}
          ${input('fcThermal', t('Prix d\'un jet-ski thermique comparable (€ HT)', 'Price of a comparable combustion jet ski (€ excl. VAT)'), 22000, 5000, 80000, 500)}
        </div>
        <div>
          <div class="grid gap-3 sm:grid-cols-2">
            ${out('fcRevenue', t('Chiffre d\'affaires de la flotte par saison', 'Fleet revenue per season'))}
            ${out('fcMonth', t('Par machine et par mois de saison', 'Per craft per season month'))}
            ${out('fcEnergyE', t('Énergie IRUKA, par heure', 'IRUKA energy, per hour'), 'text-lime')}
            ${out('fcEnergyT', t('Essence d\'un thermique, par heure', 'Combustion fuel, per hour'))}
            ${out('fcSave', t('Économie d\'énergie de la flotte par saison', 'Fleet energy saving per season'), 'text-lime')}
            ${out('fcPayback', t('Pour amortir l\'écart de prix d\'achat', 'To recover the purchase price gap'), 'text-lime')}
          </div>
          <p class="mt-4 text-sm text-brume">${t(`Calcul : IRUKA à ${PRICE.iruka}, environ 14 kWh consommés par heure (35 kWh pour 2 h 30). Énergie seulement : vidanges, bougies et entretien moteur évités ne sont pas comptés, l'estimation est donc prudente.`, `Basis: IRUKA at ${PRICE.iruka}, about 14 kWh used per hour (35 kWh for 2 h 30). Energy only: avoided oil changes, spark plugs and engine servicing are not counted, so the estimate is conservative.`)}</p>
          <p class="mt-2 tag text-brume/80">${t('Estimations indicatives, à confirmer pour votre site.', 'Indicative estimates, to be confirmed for your site.')}</p>
          <div class="mt-6">${btn('#offre', t('Recevoir une offre sur cette base', 'Get an offer on this basis'), 'send')}</div>
        </div>
      </div>
    </div>
  </section>

  <!-- Turnkey fleet paid monthly (audit idea 1) -->
  <section class="gutter pb-16 sm:pb-24">
    <div class="panel mx-auto grid max-w-7xl items-center gap-12 rounded-[2rem] p-8 sm:p-14 lg:grid-cols-[1fr_1.1fr]">
      <div>
        ${head({ eyebrow: t('Flotte clés en main', 'Turnkey fleet'), title: t('Ne payez pas des machines. Payez des heures de location disponibles.', 'Don\'t pay for craft. Pay for rental hours ready to sell.'), lead: t('Un loyer mensuel par machine, à comparer à ce qu\'elle rapporte chaque mois de saison. Tout est compris pour que votre flotte tourne.', 'A monthly fee per craft, to set against what it earns each season month. Everything included to keep your fleet running.') })}
        <p class="mt-6 text-sm text-brume">${t('Loyer mensuel sur devis, selon le nombre de machines, la durée et votre saison.', 'Monthly fee on quotation, depending on the number of craft, the term and your season.')}</p>
      </div>
      <ul class="grid gap-6">
        ${point('sailboat', t('Des IRUKA en version Fleet', 'IRUKA craft, Fleet version'), t('Boudin gonflable : stable à l\'arrêt, plus facile pour les débutants, protège pontons et coques.', 'Inflatable collar: stable at rest, easier for beginners, protects pontoons and hulls.'))}
        ${point('battery-charging', t('La recharge sur place', 'Charging on site'), t('Borne rapide CCS2 ou station de recharge flottante à deux chargeurs (en concept).', 'CCS2 fast charger or a two-charger floating charging station (concept).'))}
        ${point('radio-tower', t('Le tableau de bord de flotte', 'The fleet dashboard'), t('Position, batterie et état de chaque machine ; zones de navigation et caméras avant et arrière.', 'Position, battery and status of each craft; riding zones and front and rear cameras.'))}
        ${point('file-check', t('Le kit capitainerie', 'The harbour-office kit'), t('Un dossier pour défendre votre activité auprès des autorités locales, avec les mesures de bruit et de sillage de notre campagne en préparation.', 'A file to support your business with local authorities, with the noise and wake measurements from our campaign in preparation.'))}
      </ul>
    </div>
  </section>

  <!-- Discover IRUKA Fleet: one tab per argument -->
  <section id="iruka-fleet" class="gutter scroll-mt-24 pb-16 sm:pb-24">
    <div class="mx-auto max-w-7xl">
      ${head({ eyebrow: 'IRUKA Fleet', title: t('Découvrez IRUKA Fleet.', 'Discover IRUKA Fleet.'), lead: t('La version d\'IRUKA pensée pour la location : ce qu\'elle change pour votre activité.', 'The IRUKA version built for rental: what it changes for your business.') })}
      <div class="mt-8 flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="IRUKA Fleet" data-fleet-tabs>
        ${TABS.map(([icon, label], i) => `<button type="button" role="tab" id="ft-${i}" aria-controls="fp-${i}" aria-selected="${i === 0}" class="tab inline-flex shrink-0 items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-brume"><i data-lucide="${icon}" class="h-4 w-4"></i>${label}</button>`).join('')}
      </div>
      ${TABS.map(([, , pic, tag, title, text], i) => `<div role="tabpanel" id="fp-${i}" aria-labelledby="ft-${i}" class="mt-6 grid items-center gap-8 lg:grid-cols-[1.2fr_1fr]"${i ? ' hidden' : ''}>
        ${fig(img(R, pic), title, tag, 'aspect-[16/10]')}
        <div><h3 class="font-display text-2xl font-semibold sm:text-3xl">${title}</h3><p class="mt-4 text-brume sm:text-lg">${text}</p></div>
      </div>`).join('')}
      <div class="mt-10 flex flex-wrap gap-3">${btn('iruka.html', t('Explorez la gamme', 'Explore the range'), 'arrow-right', false)}${btn('#offre', t('Demander une offre flotte', 'Request a fleet offer'), 'send')}</div>
    </div>
  </section>

  <!-- Connected fleet -->
  <section class="gutter pb-16 sm:pb-24">
    <div class="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
      ${fig(img(R, 'fleet-dashboard-cams-uhd.jpg'), t('Maquette du tableau de bord de flotte : vues des caméras avant et arrière, positions des jet-skis', 'Fleet dashboard mock-up: front and rear camera views, craft positions'), t('Maquette d\'interface', 'Interface mock-up'), 'aspect-[2152/2132]')}
      <div>
        ${head({ eyebrow: t('Flotte connectée', 'Connected fleet'), title: t('Vous voyez chaque machine, en temps réel.', 'You see every craft, in real time.') })}
        <ul class="mt-10 grid gap-6">
          ${point('map-pinned', t('Zones de navigation', 'Riding zones'), t('Géolocalisation de chaque machine pour garder vos clients dans la zone autorisée.', 'Each craft is geolocated to keep your customers inside the permitted area.'))}
          ${point('video', t('Caméras avant et arrière', 'Front and rear cameras'), t('Une preuve en cas d\'incident au port ou en mer.', 'Evidence in case of an incident in port or at sea.'))}
          ${point('battery-charging', t('Batterie suivie à distance', 'Battery monitored remotely'), t('Charge, santé de la batterie et mises à jour, sans immobiliser la machine.', 'Charge, battery health and updates, without taking the craft out of service.'))}
        </ul>
      </div>
    </div>
  </section>

  <!-- Fleet FAQ: the questions of a foreign rental operator -->
  <section id="faq-flottes" class="gutter scroll-mt-24 pb-16 sm:pb-24">
    <div class="mx-auto max-w-4xl">
      <p class="eyebrow">FAQ</p>
      <h2 class="mt-4 font-display text-3xl font-semibold sm:text-4xl">${t('Les questions des loueurs', 'Rental operators\' questions')}</h2>
      <div class="mt-8">
        ${faq(t('Quand et où livrez-vous ?', 'When and where do you deliver?'), t('Les premières livraisons sont visées au printemps 2028. Indiquez votre pays dans votre demande : nous vous donnons le calendrier et les démarches pour votre marché.', 'First deliveries are targeted for spring 2028. Give your country in your request: we will send you the schedule and the steps for your market.'))}
        ${faq(t('Quelles homologations ?', 'Which approvals?'), t('IRUKA vise le marquage CE (directive 2013/53/UE) et les normes ISO 16315 et ISO 13297. Pour les autres marchés, la conception suit aussi les référentiels ABYC et DNV.', 'IRUKA targets CE marking (directive 2013/53/EU) and the ISO 16315 and ISO 13297 standards. For other markets, the design also follows ABYC and DNV guidelines.'))}
        ${faq(t('Combien de temps entre deux locations ?', 'How long between two rentals?'), t('Environ 30 minutes de recharge sur une borne rapide DC (CCS2). L\'autonomie est d\'environ 2 h 30 en usage mixte.', 'About 30 minutes of charging on a DC fast charger (CCS2). Range is about 2 h 30 in mixed use.'))}
        ${faq(t('Quelle garantie sur la batterie ?', 'What battery warranty?'), t('Les conditions de garantie de la batterie sont précisées dans votre offre flotte. La santé de chaque batterie est suivie à distance.', 'Battery warranty terms are set out in your fleet offer. Each battery\'s health is monitored remotely.'))}
        ${faq(t('Et l\'entretien, les pièces, la formation ?', 'What about servicing, parts and training?'), t('Un moteur électrique n\'a ni vidange, ni bougies. La prise en main est faite à la livraison ; le programme de formation de vos équipes et l\'organisation des pièces sont précisés dans l\'offre.', 'An electric motor needs no oil change and no spark plugs. A hand-over is done at delivery; the training programme for your staff and the parts set-up are set out in the offer.'))}
        ${faq(t('Puis-je louer là où le jet-ski est interdit ?', 'Can I rent where jet skis are banned?'), t('Non. Les interdictions de jet-ski s\'appliquent quelle que soit l\'énergie, par exemple sur le lac d\'Annecy. Le silence et l\'absence de carburant sont en revanche de vrais arguments auprès des autorités locales : c\'est l\'objet du kit capitainerie.', 'No. Jet-ski bans apply whatever the energy, for example on Lake Annecy. Silence and zero fuel are, however, real arguments with local authorities: that is what the harbour-office kit is for.'))}
        ${faq(t('Je veux aussi vendre IRUKA dans mon pays.', 'I also want to sell IRUKA in my country.'), t('Le réseau de distributeurs est ouvert aux candidatures : six questions, puis votre dossier.', 'The dealer network is open to applications: six questions, then your application.') + ' <a class="font-semibold text-lagoon underline" href="distributeurs.html">' + t('Devenir distributeur', 'Become a dealer') + '</a>')}
        ${faq(t('Quel tarif pour une flotte ?', 'What price for a fleet?'), t(`IRUKA est à ${PRICE.iruka} à l'unité. Le prix d'une flotte, à l'achat ou en loyer mensuel, dépend du nombre de machines et du calendrier de livraison : il est précisé dans votre offre.`, `IRUKA is ${PRICE.iruka} per unit. A fleet's price, bought or on a monthly fee, depends on the number of craft and the delivery schedule: it is set out in your offer.`))}
      </div>
    </div>
  </section>

  <!-- Fleet offer request -->
  <section id="offre" class="gutter scroll-mt-24 pb-20 sm:pb-28">
    <div class="panel mx-auto grid max-w-7xl gap-10 rounded-[2rem] p-8 sm:p-14 lg:grid-cols-[1fr_1.3fr]">
      <div>
        ${head({ eyebrow: t('Offre flotte', 'Fleet offer'), title: t('Recevez une offre chiffrée pour votre site.', 'Get a priced offer for your site.'), lead: t('Quelques informations suffisent. Les chiffres de votre simulation sont joints automatiquement.', 'A few details are enough. Your simulation figures are attached automatically.') })}
        <div class="mt-8">${waBtn(L, t('WhatsApp · +33 6 48 19 82 82', 'WhatsApp · +33 6 48 19 82 82'), t('Bonjour, je suis loueur et je souhaite une offre flotte IRUKA.', 'Hello, I run a rental business and would like an IRUKA fleet offer.'))}</div>
      </div>
      <form data-lead="Offre flotte · loueur" data-ok="${t('Merci. Votre demande d\'offre flotte est enregistrée : nous revenons vers vous personnellement.', 'Thank you. Your fleet offer request is recorded: we will get back to you personally.')}" class="grid gap-4" novalidate>
        <div class="grid gap-4 sm:grid-cols-2">
          <div><label for="ofCompany" class="text-sm text-brume">${t('Société', 'Company')}</label><input id="ofCompany" name="societe" required autocomplete="organization" class="field"></div>
          <div><label for="ofName" class="text-sm text-brume">${t('Nom', 'Name')}</label><input id="ofName" name="nom" required autocomplete="name" class="field"></div>
          <div><label for="ofWa" class="text-sm text-brume">${t('WhatsApp ou téléphone', 'WhatsApp or phone')}</label><input id="ofWa" name="whatsapp" type="tel" required autocomplete="tel" class="field"></div>
          <div><label for="ofEmail" class="text-sm text-brume">E-mail</label><input id="ofEmail" name="email" type="email" required autocomplete="email" class="field"></div>
          <div><label for="ofSite" class="text-sm text-brume">${t('Pays et site', 'Country and site')}</label><input id="ofSite" name="pays_site" required class="field"></div>
          <div><label for="ofUnits" class="text-sm text-brume">${t('Nombre de machines', 'Number of craft')}</label><input id="ofUnits" name="machines" type="number" min="1" max="200" value="6" class="field num"></div>
          <div><label for="ofSeason" class="text-sm text-brume">${t('Mois de saison', 'Season months')}</label><input id="ofSeason" name="saison" placeholder="${t('ex. : avril à octobre', 'e.g. April to October')}" class="field"></div>
          <div><label for="ofMode" class="text-sm text-brume">${t('Formule', 'Plan')}</label><select id="ofMode" name="formule" class="field"><option>${t('Loyer mensuel clés en main', 'Turnkey monthly fee')}</option><option>${t('Achat', 'Purchase')}</option><option>${t('À étudier ensemble', 'To discuss together')}</option></select></div>
        </div>
        <fieldset class="grid gap-2 sm:grid-cols-3"><legend class="mb-1 text-sm text-brume">${t('À inclure', 'To include')}</legend>
          ${opt(t('Station de recharge flottante', 'Floating charging station'), t('Recharge flottante', 'Floating charging'))}
          ${opt(t('Tableau de bord de flotte', 'Fleet dashboard'), t('Tableau de bord', 'Fleet dashboard'))}
          ${opt(t('Kit capitainerie', 'Harbour-office kit'), t('Kit capitainerie', 'Harbour-office kit'))}
        </fieldset>
        <input type="hidden" id="ofSim" name="simulation">
        <div><label for="ofMsg" class="text-sm text-brume">Message</label><textarea id="ofMsg" name="message" rows="3" class="field"></textarea></div>
        <label class="flex items-start gap-3 text-sm text-brume"><input data-consent type="checkbox" class="mt-1 accent-[#2EE6A8]">${t('J\'accepte d\'être recontacté au sujet de ma demande.', 'I agree to be contacted about my request.')} <a class="underline" href="confidentialite.html">${t('Confidentialité', 'Privacy')}</a></label>
        <div class="flex flex-wrap items-center gap-4"><button type="submit" class="btn-primary inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold">${t('Demander mon offre', 'Request my offer')} <i data-lucide="send" class="h-4 w-4"></i></button><p data-out class="text-sm" role="status" aria-live="polite"></p></div>
      </form>
    </div>
  </section>`;
};
