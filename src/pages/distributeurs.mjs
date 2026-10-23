import { tr, img, head, btn, waBtn } from '../ui.mjs';

export const meta = {
  fr: { title: 'Devenir distributeur de jet-skis électriques · E-Dolphin', desc: 'Rejoignez le réseau de distributeurs E-Dolphin : représentez IRUKA, le jet-ski 100 % électrique de luxe, dans votre pays.' },
  en: { title: 'Become an electric jet ski dealer · E-Dolphin', desc: 'Join the E-Dolphin dealer network: represent IRUKA, the 100% electric luxury jet ski, in your country.' }
};
export const scripts = ['distrib.js'];

// Dealer page, modelled on the Sea-Doo "become a dealer" page (adam, 22 Oct): who we are, what a dealer
// gets, six yes/no questions; six yes open the application (dossier-distributeur.html).
export const QUESTIONS = (t) => [
  t('Êtes-vous un professionnel expérimenté, avec le sens des affaires&nbsp;?', 'Are you an experienced professional with business sense?'),
  t('Connaissez-vous le nautisme, le yachting ou les sports de glisse motorisés&nbsp;?', 'Do you know boating, yachting or powered watersports?'),
  t('Offrir un service client irréprochable est-il une fierté pour vous&nbsp;?', 'Is outstanding customer service a point of pride for you?'),
  t('Disposez-vous d\'un atelier marine, en propre ou chez un partenaire&nbsp;?', 'Do you have a marine workshop, your own or a partner\'s?'),
  t('Disposez-vous des ressources financières pour une machine de démonstration et un premier stock&nbsp;?', 'Do you have the financial resources for a demo craft and a first stock?'),
  t('Êtes-vous passionné et convaincu que l\'avenir du jet-ski est électrique&nbsp;?', 'Are you passionate and convinced the future of jet skiing is electric?')
];

export const body = (L, R) => {
  const t = tr(L);
  const card = (icon, title, text) => `<li class="glass rounded-3xl p-6"><i data-lucide="${icon}" class="h-6 w-6 text-lagoon"></i><h3 class="mt-4 font-display text-lg font-semibold">${title}</h3><p class="mt-1 text-sm text-brume">${text}</p></li>`;
  const q = (text, i) => `
        <li class="flex flex-col gap-3 border-b border-white/10 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p class="font-semibold"><span class="num mr-2 font-mono text-sm text-lagoon">${String(i + 1).padStart(2, '0')}</span>${text}</p>
          <div class="seg glass inline-flex shrink-0 rounded-full p-1" role="radiogroup" aria-label="${text}">
            <button type="button" role="radio" aria-checked="false" data-qi="${i}" data-qa="1" class="rounded-full px-5 py-2 text-sm font-semibold">${t('Oui', 'Yes')}</button>
            <button type="button" role="radio" aria-checked="false" data-qi="${i}" data-qa="0" class="rounded-full px-5 py-2 text-sm font-semibold">${t('Non', 'No')}</button>
          </div>
        </li>`;
  return `
  <section class="relative isolate overflow-hidden">
    <img src="${img(R, 'signature-veil.jpg')}" alt="${t('Un jet-ski sous un voile dans un showroom', 'A jet ski under a veil in a showroom')}" class="absolute inset-0 -z-20 h-full w-full object-cover opacity-60" fetchpriority="high">
    <div class="absolute inset-0 -z-10 bg-gradient-to-r from-abyss via-abyss/85 to-abyss/20"></div>
    <div class="gutter"><div class="mx-auto max-w-7xl pb-20 pt-40 sm:pb-28 sm:pt-52">
      <p class="eyebrow">${t('Devenir distributeur', 'Become a dealer')}</p>
      <h1 class="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-6xl">${t('Rejoignez le réseau de distributeurs E-Dolphin.', 'Join the E-Dolphin dealer network.')}</h1>
      <p class="mt-6 max-w-2xl text-brume sm:text-lg">${t('Partagez notre avenir. E-Dolphin choisit ses premiers distributeurs, partout dans le monde, pour représenter une marque française de jet-skis 100 % électriques de luxe auprès de trois clientèles : les propriétaires, les yachts et les loueurs.', 'Share our future. E-Dolphin is choosing its first dealers, worldwide, to represent a French brand of 100% electric luxury jet skis to three customer groups: owners, yachts and rental operators.')}</p>
      <div class="mt-9 flex flex-wrap gap-3">${btn('#questions', t('Postuler maintenant', 'Apply now'), 'handshake')}${waBtn(L, 'WhatsApp', t('Bonjour, je souhaite devenir distributeur E-Dolphin.', 'Hello, I would like to become an E-Dolphin dealer.'))}</div>
    </div></div>
  </section>

  <section class="gutter py-16 sm:py-24">
    <div class="mx-auto max-w-7xl">
      ${head({ eyebrow: t('Avec E-Dolphin, prenez une longueur d\'avance', 'With E-Dolphin, get ahead'), title: t('Ce que vous apporte le réseau.', 'What the network gives you.'), lead: t('Être distributeur E-Dolphin, c\'est porter le jet-ski électrique de luxe dans votre pays, avec une marque qui vous donne les moyens de le vendre.', 'Being an E-Dolphin dealer means bringing the electric luxury jet ski to your country, with a brand that gives you the means to sell it.') })}
      <ul class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        ${card('gem', t('Une gamme qui se distingue', 'A range that stands out'), t('IRUKA, la Launch Edition numérotée de 300 exemplaires, la version Fleet pour les loueurs, puis Tridens et la gamme enfants.', 'IRUKA, the 300-unit numbered Launch Edition, the Fleet version for rental operators, then Tridens and the kids range.'))}
        ${card('map', t('Votre territoire', 'Your territory'), t('Un périmètre défini ensemble, avec une exclusivité liée à vos engagements.', 'A territory agreed together, with exclusivity tied to your commitments.'))}
        ${card('briefcase', t('Gestion et formation de vos équipes', 'Business support and staff training'), t('Accompagnement commercial et formation de vos vendeurs à la vente d\'un produit électrique haut de gamme.', 'Sales support and training for your staff to sell a high-end electric product.'))}
        ${card('wrench', t('Soutien technique', 'Technical support'), t('Formation de votre atelier, organisation des pièces et suivi des batteries à distance.', 'Workshop training, parts set-up and remote battery monitoring.'))}
        ${card('sailboat', t('Démonstration et outils de vente', 'Demo and sales tools'), t('Machine de démonstration, film, photos, configurateur 360°, fiche capitaine et calculateur loueurs.', 'Demo craft, film, photos, 360° configurator, captain\'s sheet and rental calculator.'))}
        ${card('inbox', t('Demandes transmises', 'Leads passed on'), t('Les demandes reçues par le site depuis votre territoire sont transmises à votre équipe.', 'Requests the website receives from your territory are passed on to your team.'))}
      </ul>
      <p class="mt-6 text-sm text-brume">${t('Vous gérez une activité de location ?', 'You run a rental business?')} <a class="font-semibold text-lagoon underline" href="location.html">${t('Devenez loueur E-Dolphin', 'Become an E-Dolphin rental partner')}</a>.</p>
    </div>
  </section>

  <!-- Six yes/no questions: six yes open the application -->
  <section id="questions" class="gutter scroll-mt-24 pb-20 sm:pb-28">
    <div class="panel mx-auto max-w-5xl rounded-[2rem] p-8 sm:p-14">
      ${head({ eyebrow: t('Contribuez à notre avenir', 'Help shape our future'), title: t('Six questions avant votre demande.', 'Six questions before you apply.') })}
      <ol class="mt-8">${QUESTIONS(t).map(q).join('')}</ol>
      <div id="qResult" class="mt-8" aria-live="polite">
        <p class="text-brume">${t('Répondez aux six questions.', 'Answer all six questions.')}</p>
      </div>
      <div id="qYes" class="mt-8" hidden>
        <p class="font-display text-2xl font-semibold">${t('Vous avez répondu oui à chaque question : nous aimerions vous parler.', 'You answered yes to every question: we would like to talk to you.')}</p>
        <div class="mt-6 flex flex-wrap gap-3">${btn('dossier-distributeur.html', t('Ouvrir ma demande de distributeur', 'Open my dealer application'), 'arrow-right')}</div>
      </div>
      <div id="qNo" class="mt-8" hidden>
        <p class="font-display text-xl font-semibold">${t('Merci pour votre intérêt.', 'Thank you for your interest.')}</p>
        <p class="mt-2 text-brume">${t('Votre profil ne correspond pas encore à nos critères. Écrivez-nous si votre situation évolue, ou si vous voulez en parler.', 'Your profile does not match our criteria yet. Write to us if your situation changes, or if you would like to talk.')}</p>
        <div class="mt-6">${waBtn(L, 'WhatsApp', t('Bonjour, je souhaite parler de la distribution E-Dolphin.', 'Hello, I would like to talk about E-Dolphin distribution.'))}</div>
      </div>
    </div>
  </section>`;
};
