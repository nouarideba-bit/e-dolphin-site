import { plaque } from '../plaque.mjs';
import { tr, img, head, btn, waBtn, PRICE } from '../ui.mjs';

export const meta = {
  fr: { title: 'IRUKA Launch Edition · 300 exemplaires · ONDARYS', desc: 'La première série d\'IRUKA : 300 exemplaires numérotés, 90 000 $ HT, votre numéro et votre nom gravés. Premières livraisons visées au printemps 2028.' },
  en: { title: 'IRUKA Launch Edition · 300 units · ONDARYS', desc: 'The first IRUKA series: 300 numbered units, $90,000 excl. VAT, your number and name engraved. First deliveries targeted for spring 2028.' }
};
export const scripts = ['leadform.js', 'plaque.js'];

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
        <div><p class="tag text-brume">${t('Prix', 'Price')}</p><p class="num font-display text-4xl font-semibold">${PRICE.launch}</p><p class="num text-sm text-brume">${PRICE.launchAlt}</p></div>
        <div><p class="tag text-brume">${t('Acompte de réservation', 'Reservation deposit')}</p><p class="num font-display text-2xl font-semibold">${PRICE.deposit} <span class="text-base font-normal text-brume">(30 %)</span></p><p class="num text-sm text-brume">${PRICE.depositAlt}</p></div>
        <div><p class="tag text-brume">${t('Livraison', 'Delivery')}</p><p class="font-display text-2xl font-semibold">${t('Printemps 2028', 'Spring 2028')}</p><p class="text-sm text-brume">${t('premières livraisons visées', 'first deliveries targeted')}</p></div>
      </div>
      <div class="mt-9 flex flex-wrap gap-3">
        ${btn('#numero', t('Réserver mon numéro', 'Reserve my number'), 'gem')}
        ${btn('iruka-configurateur.html?modele=launch', t('Configurer en 360°', 'Configure in 360°'), 'rotate-3d', false)}
        <button type="button" data-add="launch" class="btn-ghost inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold">${t('Ajouter à ma sélection', 'Add to my selection')} <i data-lucide="shopping-bag" class="h-4 w-4"></i></button>
      </div>
      <p class="mt-4 inline-flex items-center gap-2 tag text-brume"><i data-lucide="lock" class="h-3.5 w-3.5"></i>${t('Paiement de l\'acompte en ligne bientôt disponible. Votre demande réserve dès maintenant votre place dans la file.', 'Online deposit payment opening soon. Your request holds your place in line today.')}</p>
    </div></div>
  </section>

  <!-- Numbered plate: the owner's privilege made visible -->
  <section class="gutter py-20 sm:py-28">
    <div class="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
      <div class="plaque-wrap" data-finish="carbon">
        <div class="plaque-float">${plaque('pl', L)}</div>
        <p class="mt-6 text-center tag text-brume/80">${t('Visuel d\'illustration · gravure et finition définitives présentées à la réservation', 'Illustration · final engraving and finish shown when you reserve')}</p>
      </div>
      <div>
        ${head({ eyebrow: t('Votre plaque', 'Your plate'), title: t('Votre numéro, gravé pour toujours.', 'Your number, engraved for good.'), lead: t('Chaque Launch Edition porte une plaque numérotée de 001 à 300, gravée en relief et fixée sur la machine. Elle dit une chose simple : vous étiez parmi les premiers.', 'Every Launch Edition carries a plate numbered 001 to 300, engraved in relief and fixed to the craft. It says one simple thing: you were among the first.') })}
        <div class="mt-8 grid gap-5">
          <div>
            <p class="text-sm text-brume">${t('Finition', 'Finish')}</p>
            <div class="seg glass mt-2 inline-flex rounded-full p-1" role="group" aria-label="${t('Finition de la plaque', 'Plate finish')}">
              <button type="button" data-finish="carbon" aria-pressed="true" class="rounded-full px-4 py-2 text-sm font-medium">${t('Carbone', 'Carbon')}</button>
              <button type="button" data-finish="alu" aria-pressed="false" class="rounded-full px-4 py-2 text-sm font-medium">${t('Aluminium brossé', 'Brushed aluminium')}</button>
            </div>
          </div>
          <div>
            <label for="plInput" class="text-sm text-brume">${t('Essayez votre numéro', 'Try your number')}</label>
            <div class="mt-2 flex items-center gap-3">
              <input id="plInput" type="number" min="1" max="300" value="1" inputmode="numeric" class="field num !mt-0 w-28 text-center font-display text-lg">
              <span class="text-sm text-brume">${t('sur 300', 'of 300')}</span>
            </div>
            <p class="mt-2 text-xs text-brume/80">${t('Les numéros sont attribués dans l\'ordre des réservations confirmées ; une demande de numéro particulier est étudiée selon disponibilité.', 'Numbers are allocated in order of confirmed reservations; a request for a specific number is considered subject to availability.')}</p>
          </div>
          <div>
            <label for="plEng" class="text-sm text-brume">${t('Votre gravure : nom du yacht ou initiales', 'Your engraving: yacht name or initials')}</label>
            <input id="plEng" maxlength="22" autocomplete="off" placeholder="${t('ex. : M/Y AURORA', 'e.g. M/Y AURORA')}" class="field uppercase">
            <p class="mt-2 text-xs text-brume/80">${t('Gravée sous votre numéro, 22 caractères au plus.', 'Engraved under your number, 22 characters at most.')}</p>
          </div>
          ${btn('#numero', t('Réserver ce numéro', 'Reserve this number'), 'gem')}
        </div>
      </div>
    </div>
  </section>

  <section class="gutter py-20 sm:py-28">
    <div class="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
      <div>
        ${head({ eyebrow: t('Ce qui la distingue', 'What sets it apart'), title: t('Une série signée, pas une option.', 'A signed series, not an option.') })}
        <ul class="mt-10 grid gap-5 sm:grid-cols-2">
          <li class="glass rounded-3xl p-6"><i data-lucide="hash" class="h-5 w-5 text-sand"></i><h3 class="mt-3 font-semibold">${t('Numérotée de 001 à 300', 'Numbered 001 to 300')}</h3><p class="mt-1 text-sm text-brume">${t('Votre numéro, gravé sur la machine.', 'Your number, engraved on the craft.')}</p></li>
          <li class="glass rounded-3xl p-6"><i data-lucide="sparkles" class="h-5 w-5 text-sand"></i><h3 class="mt-3 font-semibold">${t('Finitions signature', 'Signature finish')}</h3><p class="mt-1 text-sm text-brume">${t('Carbone apparent, sellerie et détails propres à la série.', 'Exposed carbon, upholstery and details unique to the series.')}</p></li>
          <li class="glass rounded-3xl p-6"><i data-lucide="palette" class="h-5 w-5 text-sand"></i><h3 class="mt-3 font-semibold">${t('Livrée au choix', 'Choice of livery')}</h3><p class="mt-1 text-sm text-brume">${t('Blanc · noir · lime, gris · rouge, Predator, Magma, Wasp.', 'White · black · lime, grey · red, Predator, Magma, Wasp.')}</p></li>
          <li class="glass rounded-3xl p-6"><i data-lucide="calendar-check" class="h-5 w-5 text-sand"></i><h3 class="mt-3 font-semibold">${t('Priorité de livraison', 'Delivery priority')}</h3><p class="mt-1 text-sm text-brume">${t('Premières livraisons visées au printemps 2028, avant la série.', 'First deliveries targeted for spring 2028, ahead of the series.')}</p></li>
          <li class="glass rounded-3xl p-6"><i data-lucide="pen-line" class="h-5 w-5 text-sand"></i><h3 class="mt-3 font-semibold">${t('Gravée à votre nom', 'Engraved with your name')}</h3><p class="mt-1 text-sm text-brume">${t('Le nom de votre yacht ou vos initiales, sous votre numéro.', 'Your yacht\'s name or your initials, under your number.')}</p></li>
          <li class="glass rounded-3xl p-6"><i data-lucide="badge-check" class="h-5 w-5 text-sand"></i><h3 class="mt-3 font-semibold">${t('Certificat numérique', 'Digital certificate')}</h3><p class="mt-1 text-sm text-brume">${t('Remis avec la machine, il suit son histoire : propriétaires, entretien, état de la batterie. Un atout à la revente.', 'Handed over with the craft, it follows its history: owners, servicing, battery health. An asset at resale.')}</p></li>
        </ul>
      </div>
      <div>
        ${head({ eyebrow: t('Comment réserver', 'How to reserve'), title: t('Quatre étapes.', 'Four steps.') })}
        <ol class="mt-10 grid gap-7">
          ${step(1, t('Votre numéro', 'Your number'), t('Dans le formulaire ci-dessous : votre numéro, deux numéros de secours, votre livrée et votre gravure. Sans paiement.', 'In the form below: your number, two back-up numbers, your livery and your engraving. No payment.'))}
          ${step(2, t('Confirmation personnelle', 'Personal confirmation'), t('Notre équipe vous appelle ou vous écrit sur WhatsApp et confirme votre numéro.', 'Our team calls you or messages you on WhatsApp and confirms your number.'))}
          ${step(3, t('Acompte de 30 %', '30 % deposit'), t('27 000 $ HT par paiement sécurisé, dès l\'ouverture du paiement en ligne.', '$27,000 excl. VAT by secure payment, as soon as online payment opens.'))}
          ${step(4, t('Livraison', 'Delivery'), t('Essai de prise en main, remise des clés et du certificat numérique, à quai ou à bord de votre yacht.', 'Hand-over trial, keys and digital certificate, at the quay or on board your yacht.'))}
        </ol>
      </div>
    </div>
  </section>

  <!-- Number reservation: the commitment a buyer can make today, without payment (audit 22 Oct) -->
  <section id="numero" class="gutter scroll-mt-24 pb-20 sm:pb-28">
    <div class="panel mx-auto grid max-w-7xl gap-10 rounded-[2rem] p-8 sm:p-14 lg:grid-cols-[1fr_1.2fr]">
      <div>
        ${head({ eyebrow: t('Réserver mon numéro', 'Reserve my number'), title: t('Choisissez votre numéro, de 001 à 300.', 'Choose your number, from 001 to 300.'), lead: t('Sans paiement aujourd\'hui. Les numéros sont attribués dans l\'ordre des demandes confirmées ; vos deux numéros de secours servent si le premier est déjà pris.', 'No payment today. Numbers are allocated in order of confirmed requests; your two back-up numbers are used if the first is already taken.') })}
        <div class="mt-8 flex flex-wrap gap-3">${waBtn(L, t('Réserver par WhatsApp', 'Reserve on WhatsApp'), t('Bonjour, je souhaite réserver un numéro de la Launch Edition.', 'Hello, I would like to reserve a Launch Edition number.'))}</div>
      </div>
      <form data-lead="Launch Edition · réservation de numéro" data-ok="${t('Merci. Votre demande de numéro est enregistrée : nous vous confirmons votre numéro personnellement.', 'Thank you. Your number request is recorded: we will confirm your number personally.')}" class="grid gap-4" novalidate>
        <div class="grid gap-4 sm:grid-cols-3">
          <div><label for="lnNum1" class="text-sm text-brume">${t('Numéro souhaité', 'Preferred number')}</label><input id="lnNum1" name="numero" type="number" min="1" max="300" required inputmode="numeric" class="field num"></div>
          <div><label for="lnNum2" class="text-sm text-brume">${t('Secours 1', 'Back-up 1')}</label><input id="lnNum2" name="secours_1" type="number" min="1" max="300" inputmode="numeric" class="field num"></div>
          <div><label for="lnNum3" class="text-sm text-brume">${t('Secours 2', 'Back-up 2')}</label><input id="lnNum3" name="secours_2" type="number" min="1" max="300" inputmode="numeric" class="field num"></div>
        </div>
        <div class="grid gap-4 sm:grid-cols-2">
          <div><label for="lnLiv" class="text-sm text-brume">${t('Livrée', 'Livery')}</label><select id="lnLiv" name="livree" class="field"><option>Predator</option><option>${t('Blanc · noir · lime', 'White · black · lime')}</option><option>${t('Gris · rouge', 'Grey · red')}</option><option>Magma</option><option>Wasp</option></select></div>
          <div><label for="lnEng" class="text-sm text-brume">${t('Gravure (facultatif)', 'Engraving (optional)')}</label><input id="lnEng" name="gravure" maxlength="22" class="field uppercase"></div>
          <div><label for="lnName" class="text-sm text-brume">${t('Nom', 'Name')}</label><input id="lnName" name="nom" required autocomplete="name" class="field"></div>
          <div><label for="lnWa" class="text-sm text-brume">${t('WhatsApp ou téléphone', 'WhatsApp or phone')}</label><input id="lnWa" name="whatsapp" type="tel" required autocomplete="tel" class="field"></div>
          <div><label for="lnEmail" class="text-sm text-brume">E-mail</label><input id="lnEmail" name="email" type="email" required autocomplete="email" class="field"></div>
          <div><label for="lnProfile" class="text-sm text-brume">${t('Vous êtes', 'You are')}</label><select id="lnProfile" name="profil" class="field"><option>${t('Propriétaire privé', 'Private owner')}</option><option>${t('Yacht ou charter', 'Yacht or charter')}</option><option>${t('Hôtel, club ou loueur', 'Hotel, club or rental')}</option><option>${t('Distributeur', 'Dealer')}</option></select></div>
        </div>
        <label class="flex items-start gap-3 text-sm text-brume"><input data-consent type="checkbox" class="mt-1 accent-[#2EE6A8]">${t('J\'accepte d\'être recontacté au sujet de la Launch Edition.', 'I agree to be contacted about the Launch Edition.')} <a class="underline" href="confidentialite.html">${t('Confidentialité', 'Privacy')}</a></label>
        <div class="flex flex-wrap items-center gap-4"><button type="submit" class="btn-primary inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold">${t('Réserver mon numéro', 'Reserve my number')} <i data-lucide="gem" class="h-4 w-4"></i></button><p data-out class="text-sm" role="status" aria-live="polite"></p></div>
      </form>
    </div>
  </section>`;
};
