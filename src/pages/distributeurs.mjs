import { tr, img, head, btn, waBtn } from '../ui.mjs';

export const meta = {
  fr: { title: 'Devenir distributeur · E-Dolphin', desc: 'Représentez IRUKA, le jet-ski 100 % électrique de luxe, dans votre pays : territoire, démonstration, formation, demandes transmises.' },
  en: { title: 'Become a dealer · E-Dolphin', desc: 'Represent IRUKA, the 100% electric luxury jet ski, in your country: territory, demo craft, training, leads passed on.' }
};
export const scripts = ['leadform.js'];

// Page for future dealers worldwide (audit 22 Oct): what a dealer wants to know before calling,
// and a qualifying application. Commercial terms are set in the first meeting, not on the page.
export const body = (L, R) => {
  const t = tr(L);
  const card = (icon, title, text) => `<li class="glass rounded-3xl p-6"><i data-lucide="${icon}" class="h-6 w-6 text-lagoon"></i><h3 class="mt-4 font-display text-lg font-semibold">${title}</h3><p class="mt-1 text-sm text-brume">${text}</p></li>`;
  const need = (text) => `<li class="flex gap-3"><i data-lucide="check" class="mt-0.5 h-5 w-5 shrink-0 text-lagoon"></i><span>${text}</span></li>`;
  return `
  <section class="relative isolate overflow-hidden">
    <img src="${img(R, 'signature-veil.jpg')}" alt="${t('Un jet-ski sous un voile dans un showroom', 'A jet ski under a veil in a showroom')}" class="absolute inset-0 -z-20 h-full w-full object-cover opacity-60" fetchpriority="high">
    <div class="absolute inset-0 -z-10 bg-gradient-to-r from-abyss via-abyss/85 to-abyss/20"></div>
    <div class="gutter"><div class="mx-auto max-w-7xl pb-20 pt-40 sm:pb-28 sm:pt-52">
      <p class="eyebrow">${t('Devenir distributeur', 'Become a dealer')}</p>
      <h1 class="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-6xl">${t('Représentez le jet-ski électrique de luxe dans votre pays.', 'Represent the electric luxury jet ski in your country.')}</h1>
      <p class="mt-6 max-w-xl text-brume sm:text-lg">${t('E-Dolphin choisit ses premiers distributeurs, partout dans le monde : une marque française, une série numérotée de 300 exemplaires, et trois clientèles à servir, propriétaires, yachts et loueurs.', 'E-Dolphin is choosing its first dealers, worldwide: a French brand, a numbered series of 300 units, and three customer groups to serve: owners, yachts and rental operators.')}</p>
      <div class="mt-9 flex flex-wrap gap-3">${btn('#candidature', t('Proposer ma candidature', 'Apply'), 'handshake')}${waBtn(L, 'WhatsApp', t('Bonjour, je souhaite devenir distributeur E-Dolphin.', 'Hello, I would like to become an E-Dolphin dealer.'))}</div>
    </div></div>
  </section>

  <section class="gutter py-16 sm:py-24">
    <div class="mx-auto max-w-7xl">
      ${head({ eyebrow: t('Ce que nous construisons avec vous', 'What we build with you'), title: t('Une marque à porter, et les moyens de la vendre.', 'A brand to carry, and the means to sell it.') })}
      <ul class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        ${card('map', t('Votre territoire', 'Your territory'), t('Un périmètre défini ensemble, avec une exclusivité liée à vos engagements.', 'A territory agreed together, with exclusivity tied to your commitments.'))}
        ${card('sailboat', t('Démonstration et supports', 'Demo and sales tools'), t('Machine de démonstration, film, photos, configurateur, fiche capitaine et calculateur loueurs.', 'Demo craft, film, photos, configurator, captain\'s sheet and rental calculator.'))}
        ${card('wrench', t('Formation et pièces', 'Training and parts'), t('Formation technique de votre atelier et organisation des pièces pour votre marché.', 'Technical training for your workshop and a parts set-up for your market.'))}
        ${card('inbox', t('Demandes transmises', 'Leads passed on'), t('Les demandes reçues par le site depuis votre territoire sont transmises à votre équipe.', 'Requests the website receives from your territory are passed on to your team.'))}
      </ul>
      <p class="mt-6 text-sm text-brume">${t('Vous pouvez aussi proposer à vos loueurs la flotte clés en main, payée au mois :', 'You can also offer your rental customers the turnkey fleet, paid monthly:')} <a class="font-semibold text-lagoon underline" href="location.html">${t('voir la page loueurs', 'see the rental page')}</a>.</p>
    </div>
  </section>

  <section class="gutter pb-16 sm:pb-24">
    <div class="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
      <div>
        ${head({ eyebrow: t('Le profil recherché', 'The profile we look for'), title: t('Un acteur reconnu du nautisme ou du luxe.', 'An established player in boating or luxury.') })}
      </div>
      <ul class="grid gap-4 self-center text-brume">
        ${need(t('Un point de vente ou un réseau, dans le nautisme, le yachting ou le luxe.', 'A showroom or a network in boating, yachting or luxury.'))}
        ${need(t('Un atelier marine, en propre ou chez un partenaire, pour la mise en service et l\'entretien.', 'A marine workshop, your own or a partner\'s, for commissioning and servicing.'))}
        ${need(t('Une présence dans les ports, les salons et sur les pontons de votre marché.', 'A presence in the harbours, boat shows and pontoons of your market.'))}
        ${need(t('La capacité d\'organiser des essais en mer.', 'The ability to run sea trials.'))}
      </ul>
    </div>
  </section>

  <section id="candidature" class="gutter scroll-mt-24 pb-20 sm:pb-28">
    <div class="panel mx-auto grid max-w-7xl gap-10 rounded-[2rem] p-8 sm:p-14 lg:grid-cols-[1fr_1.3fr]">
      <div>
        ${head({ eyebrow: t('Candidature', 'Application'), title: t('Parlez-nous de votre entreprise.', 'Tell us about your company.'), lead: t('Territoire, marges et commande minimale sont détaillés lors du premier échange.', 'Territory, margins and minimum order are covered in the first meeting.') })}
        <div class="mt-8">${waBtn(L, t('WhatsApp · +33 6 48 19 82 82', 'WhatsApp · +33 6 48 19 82 82'), t('Bonjour, je souhaite devenir distributeur E-Dolphin.', 'Hello, I would like to become an E-Dolphin dealer.'))}</div>
      </div>
      <form data-lead="Candidature distributeur" data-ok="${t('Merci. Votre candidature est enregistrée : nous vous proposons un premier échange.', 'Thank you. Your application is recorded: we will suggest a first meeting.')}" class="grid gap-4" novalidate>
        <div class="grid gap-4 sm:grid-cols-2">
          <div><label for="dsCompany" class="text-sm text-brume">${t('Société', 'Company')}</label><input id="dsCompany" name="societe" required autocomplete="organization" class="field"></div>
          <div><label for="dsName" class="text-sm text-brume">${t('Nom et fonction', 'Name and role')}</label><input id="dsName" name="nom_fonction" required autocomplete="name" class="field"></div>
          <div><label for="dsWa" class="text-sm text-brume">${t('WhatsApp ou téléphone', 'WhatsApp or phone')}</label><input id="dsWa" name="whatsapp" type="tel" required autocomplete="tel" class="field"></div>
          <div><label for="dsEmail" class="text-sm text-brume">E-mail</label><input id="dsEmail" name="email" type="email" required autocomplete="email" class="field"></div>
          <div><label for="dsTerr" class="text-sm text-brume">${t('Pays ou territoire visé', 'Country or territory')}</label><input id="dsTerr" name="territoire" required class="field"></div>
          <div><label for="dsShops" class="text-sm text-brume">${t('Nombre de points de vente', 'Number of showrooms')}</label><input id="dsShops" name="points_de_vente" type="number" min="0" max="500" class="field num"></div>
          <div><label for="dsBrands" class="text-sm text-brume">${t('Marques déjà distribuées', 'Brands you already sell')}</label><input id="dsBrands" name="marques" class="field"></div>
          <div><label for="dsWorkshop" class="text-sm text-brume">${t('Atelier marine', 'Marine workshop')}</label><select id="dsWorkshop" name="atelier" class="field"><option>${t('Oui, en propre', 'Yes, our own')}</option><option>${t('Oui, chez un partenaire', 'Yes, with a partner')}</option><option>${t('Pas encore', 'Not yet')}</option></select></div>
          <div class="sm:col-span-2"><label for="dsVol" class="text-sm text-brume">${t('Volume annuel visé (machines)', 'Target yearly volume (craft)')}</label><input id="dsVol" name="volume_annuel" type="number" min="1" max="5000" class="field num"></div>
        </div>
        <div><label for="dsMsg" class="text-sm text-brume">Message</label><textarea id="dsMsg" name="message" rows="3" class="field"></textarea></div>
        <label class="flex items-start gap-3 text-sm text-brume"><input data-consent type="checkbox" class="mt-1 accent-[#2EE6A8]">${t('J\'accepte d\'être recontacté au sujet de ma candidature.', 'I agree to be contacted about my application.')} <a class="underline" href="confidentialite.html">${t('Confidentialité', 'Privacy')}</a></label>
        <div class="flex flex-wrap items-center gap-4"><button type="submit" class="btn-primary inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold">${t('Envoyer ma candidature', 'Send my application')} <i data-lucide="send" class="h-4 w-4"></i></button><p data-out class="text-sm" role="status" aria-live="polite"></p></div>
      </form>
    </div>
  </section>`;
};
