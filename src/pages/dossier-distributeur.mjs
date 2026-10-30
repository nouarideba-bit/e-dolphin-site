import { tr, head, waBtn } from '../ui.mjs';

export const meta = {
  fr: { title: 'Demande de distributeur · ONDARYS', desc: 'Vérifiez les opportunités de distribution ONDARYS dans votre pays et votre région, puis déposez votre demande de distributeur.' },
  en: { title: 'Dealer application · ONDARYS', desc: 'Check ONDARYS dealer opportunities in your country and region, then submit your dealer application.' }
};
export const scripts = ['leadform.js', 'dossier.js'];

// Dealer application, opened after six yes on distributeurs.html (adam, 22 Oct), modelled on the BRP
// dealer-distributor landing page: country and region first, opportunity check, then a five-step application.
// Region lists live in dossier.js; countries without a list get a free-text region field.
export const COUNTRIES = [
  ['FR', 'France', 'France'], ['MC', 'Monaco', 'Monaco'], ['IT', 'Italie', 'Italy'], ['ES', 'Espagne', 'Spain'], ['PT', 'Portugal', 'Portugal'],
  ['GR', 'Grèce', 'Greece'], ['HR', 'Croatie', 'Croatia'], ['MT', 'Malte', 'Malta'], ['CY', 'Chypre', 'Cyprus'], ['TR', 'Turquie', 'Türkiye'],
  ['ME', 'Monténégro', 'Montenegro'], ['CH', 'Suisse', 'Switzerland'], ['DE', 'Allemagne', 'Germany'], ['AT', 'Autriche', 'Austria'],
  ['BE', 'Belgique', 'Belgium'], ['NL', 'Pays-Bas', 'Netherlands'], ['LU', 'Luxembourg', 'Luxembourg'], ['GB', 'Royaume-Uni', 'United Kingdom'],
  ['IE', 'Irlande', 'Ireland'], ['DK', 'Danemark', 'Denmark'], ['NO', 'Norvège', 'Norway'], ['SE', 'Suède', 'Sweden'], ['FI', 'Finlande', 'Finland'],
  ['PL', 'Pologne', 'Poland'], ['US', 'États-Unis', 'United States'], ['CA', 'Canada', 'Canada'], ['MX', 'Mexique', 'Mexico'], ['BR', 'Brésil', 'Brazil'],
  ['XC', 'Caraïbes', 'Caribbean'], ['AE', 'Émirats arabes unis', 'United Arab Emirates'], ['SA', 'Arabie saoudite', 'Saudi Arabia'], ['QA', 'Qatar', 'Qatar'],
  ['KW', 'Koweït', 'Kuwait'], ['BH', 'Bahreïn', 'Bahrain'], ['OM', 'Oman', 'Oman'], ['EG', 'Égypte', 'Egypt'], ['MA', 'Maroc', 'Morocco'],
  ['TN', 'Tunisie', 'Tunisia'], ['IL', 'Israël', 'Israel'], ['ZA', 'Afrique du Sud', 'South Africa'], ['MU', 'Maurice', 'Mauritius'], ['SC', 'Seychelles', 'Seychelles'],
  ['MV', 'Maldives', 'Maldives'], ['TH', 'Thaïlande', 'Thailand'], ['ID', 'Indonésie', 'Indonesia'], ['SG', 'Singapour', 'Singapore'], ['MY', 'Malaisie', 'Malaysia'],
  ['HK', 'Hong Kong', 'Hong Kong'], ['CN', 'Chine', 'China'], ['JP', 'Japon', 'Japan'], ['KR', 'Corée du Sud', 'South Korea'], ['AU', 'Australie', 'Australia'],
  ['NZ', 'Nouvelle-Zélande', 'New Zealand'], ['XX', 'Autre pays', 'Other country']
];

export const body = (L) => {
  const t = tr(L);
  const lab = (id, label, req) => `<label for="${id}" class="text-sm text-brume">${label}${req ? ' <span class="text-lagoon" aria-hidden="true">*</span>' : ''}</label>`;
  const inp = (id, name, label, { type = 'text', req = false, ph = '', ac = '', extra = '' } = {}) =>
    `<div>${lab(id, label, req)}<input id="${id}" name="${name}" type="${type}"${req ? ' required' : ''}${ph ? ` placeholder="${ph}"` : ''}${ac ? ` autocomplete="${ac}"` : ''} ${extra} class="field${type === 'number' ? ' num' : ''}"></div>`;
  const sel = (id, name, label, opts, req = false) =>
    `<div>${lab(id, label, req)}<select id="${id}" name="${name}"${req ? ' required' : ''} class="field"><option value="">${t('Choisir', 'Choose')}</option>${opts.map(o => `<option>${o}</option>`).join('')}</select></div>`;
  const area = (id, name, label, req = false, ph = '') => `<div class="sm:col-span-2">${lab(id, label, req)}<textarea id="${id}" name="${name}" rows="3"${req ? ' required' : ''}${ph ? ` placeholder="${ph}"` : ''} class="field"></textarea></div>`;
  const box = (name, v, label) => `<label class="flex items-center gap-2 text-sm"><input type="checkbox" name="${name}" value="${v}" class="accent-[#2EE6A8]">${label}</label>`;
  const STEPS = [t('Entreprise', 'Company'), t('Direction et contact', 'Management and contact'), t('Activité', 'Business'), t('Installations', 'Facilities'), t('Projet ONDARYS', 'ONDARYS plan')];
  const step = (i, inner) => `<fieldset class="dz-step grid gap-4 sm:grid-cols-2" data-step="${i}"${i ? ' hidden' : ''}><legend class="mb-4 font-display text-2xl font-semibold sm:col-span-2">${STEPS[i]}</legend>${inner}</fieldset>`;
  return `
  <section class="gutter">
    <div class="mx-auto max-w-5xl pb-10 pt-36 sm:pt-44">
      <p class="eyebrow">${t('Demande de distributeur', 'Dealer application')}</p>
      <h1 class="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl">${t('Votre demande de distributeur ONDARYS.', 'Your ONDARYS dealer application.')}</h1>
      <p class="mt-5 max-w-2xl text-brume sm:text-lg">${t('Vérifiez d\'abord les opportunités dans votre pays et votre région. Si votre territoire est ouvert, votre demande se remplit en cinq étapes, environ 10 minutes.', 'First check the opportunities in your country and region. If your territory is open, your application takes five steps, about 10 minutes.')}</p>
      <p id="dzNotice" class="mt-5 text-sm text-brume" hidden>${t('Cette demande fait suite aux six questions de la page distributeur.', 'This application follows the six questions on the dealer page.')} <a class="font-semibold text-lagoon underline" href="distributeurs.html#questions">${t('Y répondre', 'Answer them')}</a></p>
    </div>
  </section>

  <!-- 1. Opportunity check: country, then state, province or region -->
  <section id="opportunites" class="gutter scroll-mt-24 pb-10">
    <div class="panel mx-auto max-w-5xl rounded-[2rem] p-8 sm:p-12">
      ${head({ eyebrow: t('Étape préalable', 'First step'), title: t('Vérifiez les opportunités.', 'Check opportunities.') })}
      <div class="mt-8 grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
        <div>${lab('opCountry', t('Pays', 'Country'), true)}<select id="opCountry" class="field"><option value="">${t('Choisir un pays', 'Choose a country')}</option>${COUNTRIES.map(([c, fr, en]) => `<option value="${c}">${t(fr, en)}</option>`).join('')}</select></div>
        <div>${lab('opRegion', t('État, province ou région', 'State, province or region'), true)}<select id="opRegion" class="field" disabled><option value="">${t('Choisir d\'abord un pays', 'Choose a country first')}</option></select><input id="opRegionTxt" class="field" hidden placeholder="${t('Région ou ville principale', 'Region or main city')}"></div>
        <button type="button" id="opCheck" class="btn-primary inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold">${t('Vérifier les opportunités', 'Check opportunities')} <i data-lucide="search" class="h-4 w-4"></i></button>
      </div>
      <p id="opOut" class="mt-4 text-sm" role="status" aria-live="polite"></p>
      <div id="opOpen" class="mt-8 rounded-3xl border border-lagoon/40 bg-lagoon/5 p-6" hidden>
        <p class="flex items-center gap-2 font-display text-xl font-semibold"><i data-lucide="circle-check" class="h-5 w-5 text-lagoon"></i><span id="opOpenTitle"></span></p>
        <p class="mt-2 text-brume">${t('ONDARYS constitue son réseau de distributeurs : votre territoire est ouvert aux candidatures. Le périmètre et l\'exclusivité sont définis avec vous après étude de votre dossier.', 'ONDARYS is building its dealer network: your territory is open to applications. The territory and exclusivity are agreed with you after reviewing your application.')}</p>
        <button type="button" id="opStart" class="btn-primary mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold">${t('Commencer ma demande', 'Start my application')} <i data-lucide="arrow-right" class="h-4 w-4"></i></button>
      </div>
    </div>
  </section>

  <!-- 2. Application in five steps -->
  <section id="demande" class="gutter scroll-mt-24 pb-20 sm:pb-28" hidden>
    <div class="panel mx-auto max-w-5xl rounded-[2rem] p-8 sm:p-12">
      <div class="flex flex-wrap items-baseline justify-between gap-2">
        <p class="eyebrow" id="dzStepLabel"></p>
        <p class="text-sm text-brume" id="dzTerritory"></p>
      </div>
      <div class="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10"><div id="dzBar" class="dz-bar h-full rounded-full bg-lagoon" style="width:20%"></div></div>
      <ol class="mt-4 hidden gap-2 text-xs text-brume sm:flex">${STEPS.map((s, i) => `<li class="flex-1" data-dot="${i}"><span class="num">${String(i + 1).padStart(2, '0')}</span> ${s}</li>`).join('')}</ol>

      <form data-lead="Dossier distributeur" data-ok="${t('Merci. Votre demande de distributeur est enregistrée : notre équipe l\'étudie et revient vers vous personnellement.', 'Thank you. Your dealer application is recorded: our team will review it and get back to you personally.')}" class="mt-10" novalidate>
        <input type="hidden" name="pays" id="dzCountry"><input type="hidden" name="region" id="dzRegion"><input type="hidden" name="six_questions" id="dzQuestions">
        ${step(0, `
          ${inp('dzCo', 'societe', t('Raison sociale', 'Company name'), { req: true, ac: 'organization' })}
          ${inp('dzForm', 'forme_juridique', t('Forme juridique', 'Legal form'), { ph: t('ex. : SAS, SARL, LLC, GmbH', 'e.g. LLC, Ltd, GmbH, SAS') })}
          ${inp('dzReg', 'immatriculation', t('N° d\'immatriculation', 'Registration number'), { req: true, ph: t('SIREN, registre du commerce…', 'Company register number…') })}
          ${inp('dzYear', 'annee_creation', t('Année de création', 'Year founded'), { type: 'number', extra: 'min="1900" max="2026"' })}
          ${inp('dzWeb', 'site_web', t('Site web', 'Website'), { type: 'url', ph: 'https://', ac: 'url' })}
          ${inp('dzAddr', 'adresse', t('Adresse', 'Address'), { req: true, ac: 'street-address' })}
          ${inp('dzCity', 'ville', t('Ville', 'City'), { req: true, ac: 'address-level2' })}
          ${inp('dzZip', 'code_postal', t('Code postal', 'Postcode'), { ac: 'postal-code' })}`)}
        ${step(1, `
          ${inp('dzName', 'dirigeant', t('Nom du dirigeant', 'Managing director'), { req: true, ac: 'name' })}
          ${inp('dzRole', 'fonction', t('Fonction', 'Position'), { ac: 'organization-title' })}
          ${inp('dzEmail', 'email', 'E-mail', { type: 'email', req: true, ac: 'email' })}
          ${inp('dzWa', 'whatsapp', t('WhatsApp ou téléphone', 'WhatsApp or phone'), { type: 'tel', req: true, ac: 'tel' })}
          ${sel('dzLang', 'langue_contact', t('Langue de contact', 'Contact language'), ['Français', 'English', 'Español', 'Italiano', 'Deutsch', 'Português', 'العربية', t('Autre', 'Other')])}
          ${inp('dzContact2', 'autre_contact', t('Autre contact (commercial, atelier)', 'Other contact (sales, workshop)'))}
          ${area('dzOwners', 'actionnariat', t('Actionnaires principaux et répartition du capital', 'Main shareholders and share split'))}`)}
        ${step(2, `
          ${sel('dzType', 'activite', t('Activité principale', 'Main business'), [t('Concessionnaire marine', 'Marine dealer'), t('Distributeur multimarques', 'Multi-brand distributor'), t('Loueur de jet-skis ou de bateaux', 'Jet-ski or boat rental'), t('Port, chantier ou marina', 'Port, yard or marina'), t('Services aux yachts', 'Yacht services'), t('Autre', 'Other')], true)}
          ${inp('dzBrands', 'marques', t('Marques distribuées aujourd\'hui', 'Brands you sell today'), { ph: t('ex. : bateaux, moteurs, jet-skis', 'e.g. boats, engines, jet skis') })}
          ${sel('dzCA', 'chiffre_affaires', t('Chiffre d\'affaires annuel', 'Annual revenue'), [t('Moins de 0,5 M€', 'Under €0.5M'), t('0,5 à 2 M€', '€0.5M to €2M'), t('2 à 10 M€', '€2M to €10M'), t('10 à 50 M€', '€10M to €50M'), t('Plus de 50 M€', 'Over €50M')], true)}
          ${sel('dzStaff', 'employes', t('Nombre d\'employés', 'Number of employees'), ['1–5', '6–20', '21–50', '51–200', '200+'])}
          ${inp('dzSites', 'points_de_vente', t('Nombre de points de vente', 'Number of sales locations'), { type: 'number', extra: 'min="0" max="500"' })}
          ${sel('dzUnits', 'ventes_annuelles', t('Embarcations vendues par an', 'Craft sold per year'), [t('Moins de 10', 'Under 10'), '10–50', '50–200', t('Plus de 200', 'Over 200')])}
          <fieldset class="grid gap-2 sm:col-span-2 sm:grid-cols-3"><legend class="mb-1 text-sm text-brume">${t('Vos clientèles', 'Your customers')}</legend>
            ${box('clientele', 'Particuliers', t('Particuliers', 'Private buyers'))}${box('clientele', 'Yachts', t('Yachts et capitaines', 'Yachts and captains'))}${box('clientele', 'Loueurs', t('Loueurs', 'Rental operators'))}${box('clientele', 'Hôtels et clubs', t('Hôtels et clubs', 'Hotels and clubs'))}${box('clientele', 'Collectivités', t('Collectivités', 'Public bodies'))}${box('clientele', 'Export', 'Export')}
          </fieldset>`)}
        ${step(3, `
          ${inp('dzShow', 'showroom_m2', t('Showroom (m²)', 'Showroom (m²)'), { type: 'number', extra: 'min="0" max="100000"' })}
          ${sel('dzShop', 'atelier', t('Atelier marine', 'Marine workshop'), [t('En propre', 'Our own'), t('Chez un partenaire', 'With a partner'), t('À créer', 'To be set up')], true)}
          ${inp('dzTech', 'techniciens', t('Techniciens marine', 'Marine technicians'), { type: 'number', extra: 'min="0" max="500"' })}
          ${sel('dzWater', 'acces_eau', t('Accès à l\'eau', 'Water access'), [t('Ponton ou marina sur place', 'Pontoon or marina on site'), t('À moins de 15 minutes', 'Within 15 minutes'), t('Non', 'No')], true)}
          ${sel('dzCharge', 'recharge', t('Recharge électrique sur site', 'On-site electric charging'), [t('Borne rapide DC', 'DC fast charger'), t('Prise AC 16 A ou 32 A', 'AC socket 16 A or 32 A'), t('Prévue', 'Planned'), t('Non', 'No')])}
          ${inp('dzZone', 'zone_essai', t('Zone d\'essai sur l\'eau', 'Test-ride area on the water'), { ph: t('Plan d\'eau, port ou plage', 'Lake, port or beach') })}`)}
        ${step(4, `
          ${inp('dzTerr', 'territoire_souhaite', t('Territoire souhaité', 'Requested territory'), { req: true })}
          ${sel('dzStart', 'demarrage', t('Démarrage souhaité', 'Preferred start'), [t('Dès que possible', 'As soon as possible'), '2027', t('Printemps 2028 (premières livraisons)', 'Spring 2028 (first deliveries)'), t('Plus tard', 'Later')])}
          ${inp('dzY1', 'volume_annee_1', t('Machines visées la 1re année', 'Craft targeted in year 1'), { type: 'number', extra: 'min="0" max="1000"' })}
          ${inp('dzY3', 'volume_annee_3', t('Machines visées la 3e année', 'Craft targeted in year 3'), { type: 'number', extra: 'min="0" max="5000"' })}
          ${sel('dzDemo', 'machines_demo', t('Machines de démonstration', 'Demo craft'), ['1', '2', t('3 ou plus', '3 or more')], true)}
          ${sel('dzMkt', 'budget_marketing', t('Budget marketing annuel prévu', 'Planned annual marketing budget'), [t('Moins de 10 k€', 'Under €10k'), t('10 à 50 k€', '€10k to €50k'), t('50 à 150 k€', '€50k to €150k'), t('Plus de 150 k€', 'Over €150k')])}
          ${sel('dzFin', 'financement_stock', t('Financement du stock', 'Stock financing'), [t('Fonds propres', 'Own funds'), t('Ligne de financement bancaire', 'Bank financing line'), t('À étudier ensemble', 'To discuss together')], true)}
          ${inp('dzOther', 'autres_marques_electriques', t('Autres marques électriques envisagées', 'Other electric brands considered'))}
          ${area('dzWhy', 'motivation', t('Pourquoi ONDARYS, et comment comptez-vous vendre IRUKA ?', 'Why ONDARYS, and how do you plan to sell IRUKA?'), true)}
          <label class="flex items-start gap-3 text-sm text-brume sm:col-span-2"><input id="dzAttest" type="checkbox" data-attest class="mt-1 accent-[#2EE6A8]">${t('J\'atteste que les informations de cette demande sont exactes.', 'I confirm the information in this application is accurate.')}</label>
          <label class="flex items-start gap-3 text-sm text-brume sm:col-span-2"><input type="checkbox" data-consent class="mt-1 accent-[#2EE6A8]"><span>${t('J\'accepte d\'être recontacté au sujet de ma demande.', 'I agree to be contacted about my application.')} <a class="underline" href="confidentialite.html">${t('Confidentialité', 'Privacy')}</a></span></label>`)}

        <div class="mt-10 flex flex-wrap items-center gap-3">
          <button type="button" id="dzPrev" class="btn-ghost inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold" hidden><i data-lucide="arrow-left" class="h-4 w-4"></i> ${t('Précédent', 'Back')}</button>
          <button type="button" id="dzNext" class="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold">${t('Suivant', 'Next')} <i data-lucide="arrow-right" class="h-4 w-4"></i></button>
          <button type="submit" id="dzSend" class="btn-primary inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold" hidden>${t('Envoyer ma demande', 'Submit my application')} <i data-lucide="send" class="h-4 w-4"></i></button>
          <p data-out class="text-sm" role="status" aria-live="polite"></p>
        </div>
      </form>
      <div class="mt-10 border-t border-white/10 pt-6 text-sm text-brume">${t('Une question sur votre demande ?', 'A question about your application?')} <span class="ml-2 inline-block align-middle">${waBtn(L, 'WhatsApp', t('Bonjour, j\'ai une question sur ma demande de distributeur ONDARYS.', 'Hello, I have a question about my ONDARYS dealer application.'))}</span></div>
    </div>
  </section>`;
};
