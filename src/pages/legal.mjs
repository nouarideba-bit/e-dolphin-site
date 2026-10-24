// Mandatory French legal pages: legal notice (LCEN), privacy and cookies (GDPR), terms of sale.
// Company details stay as [à compléter] until the new company is registered.
import { tr } from '../ui.mjs';

const TBC = { fr: '[à compléter]', en: '[to be completed]' };

const frame = (L, eyebrow, title, intro, sections) => {
  const t = tr(L);
  return `
  <section class="gutter pb-20 pt-32 sm:pt-40">
    <div class="mx-auto max-w-3xl">
      <p class="eyebrow">${eyebrow}</p>
      <h1 class="mt-4 font-display text-4xl font-semibold sm:text-5xl">${title}</h1>
      <p class="mt-4 tag text-brume">${t('Dernière mise à jour : 22 octobre 2026', 'Last updated: 22 October 2026')}</p>
      ${intro ? `<p class="mt-6 rounded-2xl border border-sand/40 p-4 text-sm text-brume">${intro}</p>` : ''}
      <div class="mt-10 grid gap-10">
        ${sections.map(([h, ...ps]) => `<section><h2 class="font-display text-xl font-semibold">${h}</h2>${ps.map(p => p.startsWith('<') ? p : `<p class="mt-3 leading-relaxed text-brume">${p}</p>`).join('')}</section>`).join('')}
      </div>
    </div>
  </section>`;
};
const list = (items) => `<ul class="mt-3 grid gap-1.5 text-brume">${items.map(i => `<li class="flex gap-2"><span class="text-sand">·</span><span>${i}</span></li>`).join('')}</ul>`;

export const mentions = {
  meta: {
    fr: { title: 'Mentions légales · E-Dolphin', desc: 'Mentions légales du site E-Dolphin.' },
    en: { title: 'Legal notice · E-Dolphin', desc: 'Legal notice of the E-Dolphin website.' }
  },
  body: (L) => {
    const t = tr(L), x = TBC[L];
    return frame(L, t('Informations légales', 'Legal information'), t('Mentions légales', 'Legal notice'),
      t('La société qui exploitera ce site est en cours de constitution. Les champs marqués [à compléter] seront renseignés dès son immatriculation.', 'The company that will operate this site is being formed. Fields marked [to be completed] will be filled in as soon as it is registered.'), [
      [t('Éditeur du site', 'Site publisher'), list([
        `${t('Dénomination sociale', 'Company name')} : ${x}`,
        `${t('Forme juridique et capital social', 'Legal form and share capital')} : ${t('SAS au capital de', 'SAS with a share capital of')} ${x} €`,
        `${t('Siège social', 'Registered office')} : ${x}`,
        `${t('Immatriculation', 'Registration')} : RCS ${x} ${t('n°', 'no.')} ${x}`,
        `${t('N° de TVA intracommunautaire', 'EU VAT number')} : ${x}`,
        `${t('Téléphone', 'Phone')} : ${x}`,
        `E-mail : ${x}`,
        `${t('Directeur de la publication', 'Publication director')} : ${x}`
      ])],
      [t('Hébergeur', 'Host'), list([
        'GitHub, Inc. (GitHub Pages)',
        '88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, ' + t('États-Unis', 'United States'),
        'https://github.com'
      ])],
      [t('Propriété intellectuelle', 'Intellectual property'), t('Les textes, photographies, rendus, logos, marques et éléments graphiques de ce site sont protégés par le droit de la propriété intellectuelle. Toute reproduction ou représentation, totale ou partielle, sans autorisation écrite préalable de l\'éditeur est interdite (articles L.122-4 et L.335-2 du Code de la propriété intellectuelle).', 'The texts, photographs, renders, logos, trademarks and graphics on this site are protected by intellectual property law. Any full or partial reproduction without the publisher\'s prior written consent is prohibited.')],
      [t('Visuels et caractéristiques', 'Visuals and specifications'), t('Les visuels marqués « Rendu » sont des images de synthèse non contractuelles. Les caractéristiques d\'IRUKA sont des objectifs de conception, à confirmer lors des essais de validation.', 'Visuals marked “Render” are non-contractual computer-generated images. IRUKA specifications are design targets, to be confirmed by validation trials.')],
      [t('Médiation de la consommation', 'Consumer mediation'), t(`Conformément à l\'article L.612-1 du Code de la consommation, le consommateur peut recourir gratuitement à un médiateur de la consommation : ${x}. Plateforme européenne de règlement en ligne des litiges : https://ec.europa.eu/consumers/odr.`, `In accordance with French consumer law, consumers may refer a dispute free of charge to a consumer mediator: ${x}. EU online dispute resolution platform: https://ec.europa.eu/consumers/odr.`)],
      [t('Données personnelles', 'Personal data'), `<p class="mt-3 text-brume">${t('Voir notre', 'See our')} <a class="underline" href="confidentialite.html">${t('politique de confidentialité et de cookies', 'privacy and cookie policy')}</a>.</p>`]
    ]);
  }
};

export const privacy = {
  meta: {
    fr: { title: 'Confidentialité et cookies · E-Dolphin', desc: 'Politique de confidentialité et de cookies du site E-Dolphin (RGPD).' },
    en: { title: 'Privacy and cookies · E-Dolphin', desc: 'Privacy and cookie policy of the E-Dolphin website (GDPR).' }
  },
  body: (L) => {
    const t = tr(L), x = TBC[L];
    return frame(L, 'RGPD', t('Confidentialité et cookies', 'Privacy and cookies'), '', [
      [t('Responsable du traitement', 'Data controller'), t(`La société éditrice du site (voir les mentions légales), joignable à l\'adresse ${x}.`, `The company publishing this site (see the legal notice), reachable at ${x}.`)],
      [t('Données collectées', 'Data collected'), t('Uniquement les données que vous saisissez dans nos formulaires (réservation, contact, sélection, réservation de numéro, newsletter) :', 'Only the data you enter in our forms (booking, contact, selection, number reservation, newsletter):'),
        list([t('nom, e-mail, téléphone, pays de livraison', 'name, e-mail, phone, delivery country'), t('formule, lieu, date et créneau souhaités, livrée, nombre d\'unités', 'chosen option, location, date and slot, livery, number of units'), t('votre message et votre profil (propriétaire, yacht, entreprise…)', 'your message and profile (owner, yacht, company…)')])],
      [t('Finalités et bases légales', 'Purposes and legal bases'), list([
        t('Répondre à votre demande de rendez-vous, de contact ou de commande : mesures précontractuelles prises à votre demande (art. 6.1.b RGPD).', 'Answering your booking, contact or order request: pre-contractual steps taken at your request (Art. 6.1.b GDPR).'),
        t('Vous envoyer la newsletter : votre consentement (art. 6.1.a RGPD), retirable à tout moment.', 'Sending the newsletter: your consent (Art. 6.1.a GDPR), which you may withdraw at any time.')
      ])],
      [t('Destinataires', 'Recipients'), t('L\'équipe commerciale de l\'éditeur, et nos sous-traitants techniques : FormSubmit, qui achemine les formulaires par e-mail, et GitHub, Inc., qui héberge le site. Ces prestataires peuvent traiter des données hors de l\'Union européenne, avec les garanties prévues par le RGPD (clauses contractuelles types ou cadre de protection des données UE–États-Unis).', 'The publisher\'s sales team, and our technical processors: FormSubmit, which delivers form submissions by e-mail, and GitHub, Inc., which hosts the site. These providers may process data outside the European Union, under the safeguards set by the GDPR (standard contractual clauses or the EU–US Data Privacy Framework).')],
      [t('Durée de conservation', 'Retention'), t('Trois ans à compter de notre dernier échange pour les prospects ; jusqu\'à votre désinscription pour la newsletter ; la durée légale applicable pour les clients (10 ans pour les pièces comptables).', 'Three years from our last exchange for prospects; until you unsubscribe for the newsletter; the applicable legal period for customers (10 years for accounting records).')],
      [t('Vos droits', 'Your rights'), t(`Vous disposez d\'un droit d\'accès, de rectification, d\'effacement, de limitation, d\'opposition et de portabilité, ainsi que du droit de définir des directives post-mortem. Écrivez-nous à ${x}. Vous pouvez aussi saisir la CNIL (www.cnil.fr).`, `You have the right of access, rectification, erasure, restriction, objection and portability. Write to us at ${x}. You may also lodge a complaint with the French data protection authority, the CNIL (www.cnil.fr).`)],
      [t('Cookies et traceurs', 'Cookies and trackers'), t('Ce site n\'utilise aucun cookie publicitaire ni de mesure d\'audience. Il conserve seulement dans votre navigateur le contenu de votre sélection (stockage local), indispensable au service que vous demandez et donc exempté de consentement. Les polices de caractères sont chargées depuis Google Fonts et les icônes depuis unpkg : votre adresse IP leur est transmise lors de ce chargement.', 'This site uses no advertising or audience-measurement cookies. It only keeps your selection in your browser (local storage), which is strictly necessary for the service you request and therefore exempt from consent. Fonts are loaded from Google Fonts and icons from unpkg: your IP address is sent to them when they load.')]
    ]);
  }
};

export const terms = {
  meta: {
    fr: { title: 'Conditions générales de vente · E-Dolphin', desc: 'Conditions générales de vente des jet-skis IRUKA.' },
    en: { title: 'Terms of sale · E-Dolphin', desc: 'Terms of sale for IRUKA jet-skis.' }
  },
  body: (L) => {
    const t = tr(L), x = TBC[L];
    return frame(L, t('Conditions', 'Terms'), t('Conditions générales de vente', 'Terms of sale'),
      t('Projet en cours de validation juridique. Aucune vente n\'est conclue en ligne à ce jour : le paiement en ligne est fermé et chaque commande fait l\'objet d\'une confirmation écrite.', 'Draft under legal review. No sale is concluded online at this time: online payment is closed and every order is confirmed in writing.'), [
      [t('1. Objet et champ', '1. Scope'), t(`Les présentes conditions régissent la vente des jet-skis IRUKA et IRUKA Launch Edition par la société éditrice (${x}) à des clients particuliers ou professionnels. Elles prévalent sur tout autre document, sauf accord écrit contraire.`, `These terms govern the sale of IRUKA and IRUKA Launch Edition jet-skis by the publishing company (${x}) to private or business customers. They prevail over any other document unless otherwise agreed in writing.`)],
      [t('2. Produits', '2. Products'), t('Les caractéristiques essentielles figurent sur le site et dans la confirmation de commande. Les caractéristiques d\'IRUKA sont des objectifs de conception ; les visuels marqués « Rendu » ne sont pas contractuels. La Launch Edition est limitée à 300 exemplaires numérotés.', 'Essential characteristics appear on the site and in the order confirmation. IRUKA specifications are design targets; visuals marked “Render” are non-contractual. The Launch Edition is limited to 300 numbered units.')],
      [t('3. Prix', '3. Prices'), t('IRUKA : à partir de 35 990 € HT. IRUKA Launch Edition : 90 000 $ HT. Les prix sont indiqués hors taxes ; la TVA applicable (20 % en France) et les frais de livraison et d\'immatriculation sont précisés dans la confirmation de commande. Pour les consommateurs, le prix toutes taxes comprises est communiqué avant tout engagement.', 'IRUKA: from €35,990 excl. VAT. IRUKA Launch Edition: $90,000 excl. VAT. Prices are shown excluding taxes; applicable VAT (20 % in France), delivery and registration costs are set out in the order confirmation. Consumers are given the all-taxes-included price before any commitment.')],
      [t('4. Commande', '4. Order'), t('Votre demande (formulaire de réservation ou sélection) ne vaut pas commande. Le contrat est formé à la signature du bon de commande que nous vous adressons après échange, et au paiement de l\'acompte.', 'Your request (booking form or cart) is not an order. The contract is formed when you sign the purchase order we send you after our discussion and upon payment of the deposit.')],
      [t('5. Acompte et paiement', '5. Deposit and payment'), t('Chaque commande, quel que soit le modèle, donne lieu à un acompte de 30 % du prix total de la configuration (modèle, équipements et accessoires compris), payable par paiement sécurisé. Exemples sans option : 10 797 € HT pour un IRUKA, 27 000 $ HT pour une Launch Edition. Le solde est payable avant la livraison. Les sommes versées le sont à titre d\'acompte au sens de l\'article L.214-1 du Code de la consommation.', 'Every order, whatever the model, requires a deposit of 30 % of the total price of the configuration (model, equipment and accessories included), payable by secure payment. Examples without options: €10,797 excl. VAT for an IRUKA, $27,000 excl. VAT for a Launch Edition. The balance is due before delivery.')],
      [t('6. Livraison', '6. Delivery'), t('La date de livraison est indiquée dans le bon de commande. En cas de retard de plus de 30 jours, le consommateur peut résoudre le contrat dans les conditions des articles L.216-1 et suivants du Code de la consommation. Le transfert des risques intervient à la remise du jet-ski.', 'The delivery date is stated in the purchase order. Risk passes on hand-over of the jet-ski. Consumers have the remedies provided by law in case of late delivery.')],
      [t('7. Réserve de propriété', '7. Retention of title'), t('Le jet-ski reste la propriété du vendeur jusqu\'au paiement complet du prix.', 'The jet-ski remains the seller\'s property until the price is paid in full.')],
      [t('8. Droit de rétractation', '8. Right of withdrawal'), t('Pour un contrat conclu à distance, le consommateur dispose de 14 jours à compter de la réception du bien pour se rétracter sans motif (articles L.221-18 et suivants du Code de la consommation). Les frais de retour sont à sa charge. Ce droit ne s\'applique pas aux biens confectionnés selon ses spécifications ou nettement personnalisés.', 'For a distance contract, consumers have 14 days from receipt of the goods to withdraw without reason. Return costs are borne by the consumer. This right does not apply to goods made to the consumer\'s specifications or clearly personalised.')],
      [t('9. Garanties', '9. Warranties'), t('Le consommateur bénéficie de la garantie légale de conformité (articles L.217-3 et suivants du Code de la consommation) pendant deux ans à compter de la délivrance, et de la garantie des vices cachés (articles 1641 et suivants du Code civil). Une éventuelle garantie commerciale est précisée dans le bon de commande.', 'Consumers benefit from the statutory conformity warranty for two years from delivery and from the warranty against hidden defects. Any commercial warranty is set out in the purchase order.')],
      [t('10. Données, litiges et droit applicable', '10. Data, disputes and governing law'), t(`Les données sont traitées selon notre politique de confidentialité. Le droit français s\'applique. En cas de litige, le consommateur peut recourir gratuitement au médiateur de la consommation ${x}, avant toute action devant les tribunaux compétents.`, `Data is processed under our privacy policy. French law applies. In case of dispute, consumers may refer the matter free of charge to the consumer mediator ${x} before going to the competent courts.`)]
    ]);
  }
};
