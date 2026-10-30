import { tr, img, head, fig, btn, waBtn } from '../ui.mjs';
import { pageUrl } from '../layout.mjs';

export const meta = {
  fr: { title: 'Jet-ski électrique pour yacht, tender silencieux · ONDARYS', desc: 'IRUKA, le tender électrique qui ne réveille personne au mouillage : fiche capitaine, test du garage, zéro essence à bord.' },
  en: { title: 'Electric jet ski for yachts, the silent tender · ONDARYS', desc: 'IRUKA, the electric tender that wakes no one at anchor: captain\'s sheet, garage check, zero fuel aboard.' }
};
export const scripts = ['contact.js', 'leadform.js', 'yachtfit.js'];

export const body = (L, R) => {
  const t = tr(L);
  const point = (icon, title, text) => `<li class="flex gap-4"><i data-lucide="${icon}" class="mt-1 h-5 w-5 shrink-0 text-lagoon"></i><div><h3 class="font-semibold">${title}</h3><p class="mt-1 text-sm text-brume">${text}</p></div></li>`;
  return `
  <section class="relative isolate overflow-hidden">
    <img src="${img(R, 'use-yacht.jpg')}" alt="${t('IRUKA dans le garage d\'un yacht', 'IRUKA in a yacht garage')}" class="absolute inset-0 -z-20 h-full w-full object-cover" fetchpriority="high">
    <div class="hero-shade absolute inset-0 -z-10"></div>
    <div class="gutter"><div class="mx-auto max-w-7xl pb-20 pt-40 sm:pb-28 sm:pt-52">
      <p class="eyebrow">${t('Pour mon yacht', 'For my yacht')}</p>
      <h1 class="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-6xl">${t('Le tender qui ne réveille personne au mouillage.', 'The tender that wakes no one at anchor.')}</h1>
      <p class="mt-6 max-w-xl text-brume sm:text-lg">${t('Pour les propriétaires, les capitaines et les gestionnaires de yachts. Le propriétaire choisit, le capitaine valide : voici ce qu\'il lui faut.', 'For yacht owners, captains and managers. The owner chooses, the captain signs off: here is what the captain needs.')}</p>
      <div class="mt-9 flex flex-wrap gap-3">${btn('#yacht-fit', t('Tester mon garage', 'Check my garage'), 'ruler')}${btn('#fiche', t('Fiche capitaine', 'Captain\'s sheet'), 'file-check', false)}${waBtn(L, 'WhatsApp', t('Bonjour, je souhaite parler d\'IRUKA pour mon yacht.', 'Hello, I would like to talk about IRUKA for my yacht.'))}</div>
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

  <!-- Rental operators now have their own page -->
  <section class="gutter pb-16">
    <a href="location.html" class="glass lift mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 rounded-3xl p-6 sm:p-8">
      <span><span class="eyebrow block">${t('Loueurs, hôtels, clubs', 'Rental operators, hotels, clubs')}</span><span class="mt-2 block font-display text-2xl font-semibold">${t('Une flotte qui tourne toute la journée : calculez votre rentabilité.', 'A fleet that runs all day: work out your return.')}</span></span>
      <span class="inline-flex items-center gap-2 font-semibold text-lagoon">${t('Pour ma location', 'For my rental')} <i data-lucide="arrow-right" class="h-4 w-4"></i></span>
    </a>
  </section>

  <!-- Captain's sheet: the figures the captain needs to sign off (audit 22 Oct). Printable on its own. -->
  <section id="fiche" class="gutter scroll-mt-24 py-16 sm:py-24">
    <div class="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_1.3fr]">
      <div>
        ${head({ eyebrow: t('Fiche capitaine', 'Captain\'s sheet'), title: t('Tout ce que votre capitaine va demander.', 'Everything your captain will ask.'), lead: t('Dimensions, levage, recharge sur le bord : une page à imprimer ou à lui envoyer.', 'Dimensions, lifting, charging from the yacht: one page to print or send.') })}
        <div class="fiche-actions mt-8 flex flex-wrap gap-3">
          <button type="button" data-print-fiche class="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold">${t('Imprimer ou PDF', 'Print or PDF')} <i data-lucide="printer" class="h-4 w-4"></i></button>
          <a href="https://wa.me/?text=${encodeURIComponent(t('Fiche capitaine IRUKA (ONDARYS) : ', 'IRUKA captain\'s sheet (ONDARYS): ') + pageUrl(L, 'yachts-flottes') + '#fiche')}" target="_blank" rel="noopener" class="btn-ghost inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold">${t('Envoyer à mon capitaine', 'Send to my captain')} <i data-lucide="share-2" class="h-4 w-4"></i></a>
        </div>
      </div>
      <div>
        <p class="font-display text-xl font-semibold">IRUKA · ${t('fiche capitaine', 'captain\'s sheet')}</p>
        <table class="mt-4 w-full text-sm">
          <tbody>
          <tr class="border-b border-white/10"><th scope="row" class="py-3 pr-4 text-left font-normal text-brume">${t('Propulsion', 'Propulsion')}</th><td class="py-3 font-semibold">${t('Électrique, 160 kW (215 ch)', 'Electric, 160 kW (215 hp)')}</td></tr>
          <tr class="border-b border-white/10"><th scope="row" class="py-3 pr-4 text-left font-normal text-brume">${t('Vitesse de pointe visée', 'Target top speed')}</th><td class="py-3 font-semibold">${t('60 nœuds', '60 knots')}</td></tr>
          <tr class="border-b border-white/10"><th scope="row" class="py-3 pr-4 text-left font-normal text-brume">${t('Autonomie', 'Range')}</th><td class="py-3 font-semibold">${t('≈ 2 h 30 en usage mixte', '≈ 2 h 30 in mixed use')}</td></tr>
          <tr class="border-b border-white/10"><th scope="row" class="py-3 pr-4 text-left font-normal text-brume">${t('Masse', 'Weight')}</th><td class="py-3 font-semibold">${t('400 kg', '400 kg')}</td></tr>
          <tr class="border-b border-white/10"><th scope="row" class="py-3 pr-4 text-left font-normal text-brume">${t('Encombrement', 'Footprint')}</th><td class="py-3 font-semibold">${t('330 × 145 cm maximum (version Fleet, boudin compris)', '330 × 145 cm maximum (Fleet version, collar included)')}</td></tr>
          <tr class="border-b border-white/10"><th scope="row" class="py-3 pr-4 text-left font-normal text-brume">${t('Levage', 'Lifting')}</th><td class="py-3 font-semibold">${t('Sur barres métalliques glissées et calées sous les rebords extérieurs de la coque (virures ou rails latéraux)', 'On metal bars slid and wedged under the hull\'s outer edges (chines or side rails)')}</td></tr>
          <tr class="border-b border-white/10"><th scope="row" class="py-3 pr-4 text-left font-normal text-brume">${t('Batterie', 'Battery')}</th><td class="py-3 font-semibold">${t('35 kWh, 800 V, refroidie par liquide', '35 kWh, 800 V, liquid-cooled')}</td></tr>
          <tr class="border-b border-white/10"><th scope="row" class="py-3 pr-4 text-left font-normal text-brume">${t('Recharge rapide', 'Fast charging')}</th><td class="py-3 font-semibold">${t('CCS2, jusqu\'à 70 kW DC, ≈ 30 min', 'CCS2, up to 70 kW DC, ≈ 30 min')}</td></tr>
          <tr class="border-b border-white/10"><th scope="row" class="py-3 pr-4 text-left font-normal text-brume">${t('Recharge sur le bord', 'Charging from the yacht')}</th><td class="py-3 font-semibold">${t('≈ 7 h sur 16 A, ≈ 3 h 30 sur 32 A (230 V, de 10 à 80 %)', '≈ 7 h on 16 A, ≈ 3 h 30 on 32 A (230 V, 10 to 80 %)')}</td></tr>
          <tr class="border-b border-white/10"><th scope="row" class="py-3 pr-4 text-left font-normal text-brume">${t('Carburant à bord', 'Fuel on board')}</th><td class="py-3 font-semibold">${t('Aucun : ni bidon, ni vapeurs dans le garage', 'None: no jerrycans, no fumes in the garage')}</td></tr>
          <tr class="border-b border-white/10"><th scope="row" class="py-3 pr-4 text-left font-normal text-brume">${t('Étanchéité', 'Sealing')}</th><td class="py-3 font-semibold">${t('Électronique IP67', 'IP67 electronics')}</td></tr>
          <tr class="border-b border-white/10"><th scope="row" class="py-3 pr-4 text-left font-normal text-brume">${t('Normes visées', 'Targeted standards')}</th><td class="py-3 font-semibold">${t('Marquage CE (2013/53/UE), ISO 16315, ISO 13297', 'CE marking (2013/53/EU), ISO 16315, ISO 13297')}</td></tr>
          </tbody>
        </table>
        <p class="mt-4 tag text-brume/80">${t('Objectifs de conception IRUKA, à confirmer lors des essais de validation. Temps de recharge sur le bord : estimations, pertes comprises.', 'IRUKA design targets, to be confirmed by validation trials. Charging times from the yacht: estimates, losses included.')}</p>
      </div>
    </div>
  </section>

  <!-- Yacht Fit: the garage check (audit idea 2). Footprint and weight are the known maxima;
       the team confirms height and final weight with the yacht's own drawings. -->
  <section id="yacht-fit" class="gutter scroll-mt-24 pb-20 sm:pb-28">
    <div class="panel mx-auto grid max-w-7xl gap-10 rounded-[2rem] p-8 sm:p-14 lg:grid-cols-2">
      <div>
        ${head({ eyebrow: 'Yacht Fit', title: t('IRUKA entre-t-il dans votre garage ?', 'Will IRUKA fit your garage?'), lead: t('Saisissez les cotes de votre garage et la capacité de votre grue ou bossoir : la réponse s\'affiche tout de suite, et notre équipe la confirme sur les plans de votre yacht.', 'Enter your garage dimensions and the capacity of your crane or davit: the answer shows at once, and our team confirms it on your yacht\'s drawings.') })}
        <div id="fitResult" class="mt-8 grid gap-2" aria-live="polite"></div>
        <svg id="fitDraw" viewBox="0 0 400 220" class="mt-6 w-full max-w-md" role="img" aria-label="${t('Vue de dessus : IRUKA dans le garage, à l\'échelle', 'Top view: IRUKA in the garage, to scale')}"></svg>
      </div>
      <form data-lead="Yacht Fit · vérification du garage" data-ok="${t('Merci. Notre équipe vérifie sur les plans de votre yacht et vous répond personnellement.', 'Thank you. Our team checks against your yacht\'s drawings and replies personally.')}" class="grid gap-4 self-start" novalidate>
        <div class="grid gap-4 sm:grid-cols-2">
          <div><label for="fitL" class="text-sm text-brume">${t('Longueur du garage (cm)', 'Garage length (cm)')}</label><input id="fitL" name="garage_longueur_cm" type="number" min="100" max="2000" inputmode="numeric" class="field num"></div>
          <div><label for="fitW" class="text-sm text-brume">${t('Largeur du garage (cm)', 'Garage width (cm)')}</label><input id="fitW" name="garage_largeur_cm" type="number" min="50" max="1500" inputmode="numeric" class="field num"></div>
          <div><label for="fitD" class="text-sm text-brume">${t('Largeur de la porte (cm)', 'Door width (cm)')}</label><input id="fitD" name="porte_largeur_cm" type="number" min="50" max="1500" inputmode="numeric" class="field num"></div>
          <div><label for="fitC" class="text-sm text-brume">${t('Capacité grue ou bossoir (kg)', 'Crane or davit capacity (kg)')}</label><input id="fitC" name="grue_capacite_kg" type="number" min="50" max="20000" inputmode="numeric" class="field num"></div>
        </div>
        <div><label for="fitY" class="text-sm text-brume">${t('Votre yacht (chantier, modèle, longueur)', 'Your yacht (yard, model, length)')}</label><input id="fitY" name="yacht" class="field"></div>
        <input type="hidden" id="fitOut" name="verdict">
        <div class="grid gap-4 sm:grid-cols-2">
          <div><label for="fitName" class="text-sm text-brume">${t('Nom', 'Name')}</label><input id="fitName" name="nom" required autocomplete="name" class="field"></div>
          <div><label for="fitWa" class="text-sm text-brume">${t('WhatsApp ou e-mail', 'WhatsApp or e-mail')}</label><input id="fitWa" name="contact" required class="field"></div>
        </div>
        <label class="flex items-start gap-3 text-sm text-brume"><input data-consent type="checkbox" class="mt-1 accent-[#2EE6A8]">${t('J\'accepte d\'être recontacté au sujet de mon yacht.', 'I agree to be contacted about my yacht.')}</label>
        <div class="flex flex-wrap items-center gap-4"><button type="submit" class="btn-primary inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold">${t('Faire confirmer par l\'équipe', 'Have the team confirm')} <i data-lucide="send" class="h-4 w-4"></i></button><p data-out class="text-sm" role="status" aria-live="polite"></p></div>
      </form>
    </div>
  </section>

  <!-- Contact -->
  <section id="contact" class="gutter scroll-mt-24 pb-20 sm:pb-28">
    <div class="panel mx-auto grid max-w-7xl gap-10 rounded-[2rem] p-8 sm:p-14 lg:grid-cols-2">
      <div>
        ${head({ eyebrow: 'Contact', title: t('Parlons de votre yacht.', 'Let\'s talk about your yacht.'), lead: t('Un conseiller vous répond personnellement, en français ou en anglais, par e-mail ou sur WhatsApp.', 'An advisor replies personally, in French or English, by e-mail or on WhatsApp.') })}
        <div class="mt-8">${waBtn(L, t('WhatsApp · +33 6 48 19 82 82', 'WhatsApp · +33 6 48 19 82 82'), t('Bonjour, je souhaite parler d\'IRUKA pour mon yacht.', 'Hello, I would like to talk about IRUKA for my yacht.'))}</div>
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
