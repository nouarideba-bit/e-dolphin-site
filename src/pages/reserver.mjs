import { tr } from '../ui.mjs';

export const meta = {
  fr: { title: 'Réserver un essai de jet-ski électrique · E-Dolphin', desc: 'Essai en mer de 45 minutes, présentation privée d\'une heure ou réservation Launch Edition avec acompte de 30 %.' },
  en: { title: 'Book an electric jet ski sea trial · E-Dolphin', desc: '45-minute sea trial, one-hour private presentation or Launch Edition reservation with a 30% deposit.' }
};
export const scripts = ['booking.js'];

export const body = (L) => {
  const t = tr(L);
  const legend = (n, text) => `<legend class="mb-3 flex items-center gap-3 text-sm font-semibold"><span class="num grid h-7 w-7 place-items-center rounded-full bg-lagoon font-mono text-xs text-abyss">${n}</span>${text}</legend>`;
  const chip = (value, label, attrs = '') => `<label class="bk-chip glass cursor-pointer rounded-full px-4 py-2 text-sm" ${attrs}><input type="radio" name="place" value="${value}" class="sr-only">${label}</label>`;
  const faq = (q, a) => `<details class="border-b border-white/10 py-5"><summary class="flex items-center justify-between gap-4 font-display text-lg font-semibold">${q}<i data-lucide="plus" class="chev h-5 w-5 shrink-0 text-lagoon"></i></summary><p class="mt-3 max-w-3xl text-brume">${a}</p></details>`;
  return `
  <section class="gutter pb-20 pt-32 sm:pt-40" aria-labelledby="book-title">
    <div class="mx-auto max-w-7xl">
      <p class="eyebrow">${t('Réservation', 'Booking')}</p>
      <h1 id="book-title" class="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-6xl">${t('Prenez la barre.', 'Take the helm.')}</h1>
      <p class="mt-5 max-w-2xl text-brume">${t('Essai en mer accompagné, présentation privée ou réservation Launch Edition. Essais et présentations sans paiement, confirmés personnellement par notre équipe. La Launch Edition se réserve avec un acompte de 30 %.', 'Guided sea trial, private presentation or Launch Edition reservation. Trials and presentations are free and confirmed personally by our team. The Launch Edition is reserved with a 30 % deposit.')}</p>

      <div class="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <form id="booking" class="glass grid gap-8 rounded-3xl p-5 sm:p-8" novalidate>
          <fieldset class="grid gap-3">
            ${legend(1, t('Que souhaitez-vous réserver ?', 'What would you like to book?'))}
            <div class="grid gap-3 sm:grid-cols-3" id="bkTypes">
              <label class="bk-opt glass lift cursor-pointer rounded-2xl p-4"><input type="radio" name="type" value="essai" class="sr-only" checked><i data-lucide="waves" class="h-5 w-5 text-lagoon"></i><span class="mt-3 block font-semibold">${t('Essai en mer', 'Sea trial')}</span><span class="mt-1 block text-sm text-brume">${t('45 min accompagné, briefing compris', '45 min guided, briefing included')}</span></label>
              <label class="bk-opt glass lift cursor-pointer rounded-2xl p-4"><input type="radio" name="type" value="presentation" class="sr-only"><i data-lucide="anchor" class="h-5 w-5 text-lagoon"></i><span class="mt-3 block font-semibold">${t('Présentation privée', 'Private presentation')}</span><span class="mt-1 block text-sm text-brume">${t('1 h, à quai ou à bord de votre yacht', '1 h, at the quay or on your yacht')}</span></label>
              <label class="bk-opt glass lift cursor-pointer rounded-2xl p-4"><input type="radio" name="type" value="launch" class="sr-only"><i data-lucide="gem" class="h-5 w-5 text-sand"></i><span class="mt-3 block font-semibold">Launch Edition</span><span class="mt-1 block text-sm text-brume">${t('90 000 $ HT · acompte de 30 %', '$90,000 excl. VAT · 30 % deposit')}</span></label>
            </div>
          </fieldset>

          <fieldset class="grid gap-3">
            ${legend(2, t('Où ?', 'Where?'))}
            <div class="flex flex-wrap gap-2" id="bkPlaces">
              ${chip('Monaco · Port Hercule', 'Monaco · Port Hercule')}
              ${chip('Antibes · Port Vauban', 'Antibes · Port Vauban')}
              ${chip('Saint-Tropez', 'Saint-Tropez')}
              ${chip("Lac d'Annecy", t('Lac d\'Annecy · présentation à quai', 'Lake Annecy · quayside presentation'), 'data-no-trial')}
              ${chip('À bord de mon yacht', t('À bord de mon yacht', 'On board my yacht'), 'data-yacht')}
            </div>
            <p class="tag text-brume/80">${t('Lieux confirmés avec vous selon la saison et les autorisations locales.', 'Locations confirmed with you depending on the season and local permits.')}</p>
          </fieldset>

          <fieldset class="grid gap-3" id="bkWhen">
            ${legend(3, t('Quand ?', 'When?'))}
            <div class="grid gap-5 md:grid-cols-2">
              <div class="glass rounded-2xl p-4">
                <div class="flex items-center justify-between">
                  <button type="button" id="calPrev" class="glass rounded-full p-2" aria-label="${t('Mois précédent', 'Previous month')}"><i data-lucide="chevron-left" class="h-4 w-4"></i></button>
                  <p id="calTitle" class="font-semibold capitalize"></p>
                  <button type="button" id="calNext" class="glass rounded-full p-2" aria-label="${t('Mois suivant', 'Next month')}"><i data-lucide="chevron-right" class="h-4 w-4"></i></button>
                </div>
                <div class="mt-4 grid grid-cols-7 gap-1 text-center font-mono text-[11px] text-brume" aria-hidden="true">${(L === 'fr' ? ['L', 'M', 'M', 'J', 'V', 'S', 'D'] : ['M', 'T', 'W', 'T', 'F', 'S', 'S']).map(d => `<span>${d}</span>`).join('')}</div>
                <div id="calGrid" class="mt-1 grid grid-cols-7 gap-1" aria-label="${t('Choisir une date', 'Pick a date')}"></div>
                <p class="mt-3 flex flex-wrap gap-x-4 gap-y-1 tag text-brume"><span><i class="mr-1 inline-block h-2 w-2 rounded-full bg-lagoon"></i>${t('disponible', 'available')}</span><span><i class="mr-1 inline-block h-2 w-2 rounded-full bg-white/20"></i>${t('complet ou fermé', 'full or closed')}</span></p>
              </div>
              <div>
                <p class="text-sm text-brume" id="slotHint"></p>
                <div id="slots" class="mt-3 grid grid-cols-3 gap-2"></div>
                <p class="mt-3 tag text-brume/80">${t('Disponibilités indicatives, confirmées par l\'équipe.', 'Indicative availability, confirmed by the team.')}</p>
              </div>
            </div>
          </fieldset>

          <fieldset class="grid gap-4">
            ${legend(4, t('Vos coordonnées', 'Your details'))}
            <div class="grid gap-4 sm:grid-cols-2">
              <div><label for="bkName" class="text-sm text-brume">${t('Nom', 'Name')}</label><input id="bkName" required autocomplete="name" class="field"></div>
              <div><label for="bkEmail" class="text-sm text-brume">E-mail</label><input id="bkEmail" type="email" required autocomplete="email" class="field"></div>
              <div><label for="bkPhone" class="text-sm text-brume">${t('Téléphone', 'Phone')}</label><input id="bkPhone" type="tel" required autocomplete="tel" class="field"></div>
              <div><label for="bkPeople" class="text-sm text-brume">${t('Personnes', 'People')}</label>
                <select id="bkPeople" class="field"><option value="1">${t('1 pilote', '1 rider')}</option><option value="2">${t('1 pilote + 1 passager', '1 rider + 1 passenger')}</option><option value="3">${t('Groupe (3 et plus)', 'Group (3 or more)')}</option></select></div>
            </div>
            <div id="bkLaunchFields" class="grid gap-4 sm:grid-cols-2" hidden>
              <div><label for="bkLivery" class="text-sm text-brume">${t('Livrée souhaitée', 'Preferred livery')}</label>
                <select id="bkLivery" class="field"><option>${t('Blanc · noir · lime', 'White · black · lime')}</option><option>${t('Gris · rouge', 'Grey · red')}</option><option>Predator</option><option>Magma</option><option>Wasp</option><option>${t('Je ne sais pas encore', 'Not sure yet')}</option></select></div>
              <div><label for="bkUnits" class="text-sm text-brume">${t('Nombre d\'unités', 'Number of units')}</label><input id="bkUnits" type="number" min="1" max="20" value="1" class="field"></div>
              <div class="rounded-2xl border border-sand/40 p-4 sm:col-span-2">
                <div class="flex flex-wrap items-center justify-between gap-3">
                  <div><p class="font-semibold">${t('Acompte de réservation', 'Reservation deposit')}</p><p class="mt-1 text-sm text-brume">${t('30 % du prix, soit', '30 % of the price, i.e.')} <span id="depAmount" class="num text-foam">27 000 $ HT</span> ${t('par unité · paiement sécurisé Stripe', 'per unit · secure Stripe payment')}</p></div>
                  <span class="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1 tag text-brume"><i data-lucide="lock" class="h-3.5 w-3.5"></i>${t('Bientôt disponible', 'Opening soon')}</span>
                </div>
                <p class="mt-3 text-xs text-brume">${t('Votre demande réserve votre place dans la série de 300 exemplaires. Le lien de paiement de l\'acompte vous sera envoyé dès l\'ouverture.', 'Your request holds your place in the 300-unit series. The deposit payment link will be sent as soon as it opens.')}</p>
              </div>
            </div>
            <label class="flex items-start gap-3 text-sm text-brume"><input id="bkLicence" type="checkbox" class="mt-1 accent-[#2EE6A8]">${t('J\'ai un permis bateau (sinon, l\'essai se fait avec un pilote E-Dolphin)', 'I hold a boat licence (otherwise the trial is with an E-Dolphin pilot)')}</label>
            <div><label for="bkMsg" class="text-sm text-brume">${t('Message (facultatif)', 'Message (optional)')}</label><textarea id="bkMsg" rows="3" class="field"></textarea></div>
            <label class="flex items-start gap-3 text-sm text-brume"><input id="bkConsent" type="checkbox" class="mt-1 accent-[#2EE6A8]">${t('J\'accepte d\'être recontacté au sujet de ma demande.', 'I agree to be contacted about my request.')} <a class="underline" href="confidentialite.html">${t('Confidentialité', 'Privacy')}</a></label>
          </fieldset>

          <div class="flex flex-wrap items-center gap-4">
            <button class="btn-primary inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-semibold" type="submit">${t('Envoyer ma demande', 'Send my request')} <i data-lucide="calendar-check" class="h-4 w-4"></i></button>
            <p id="bkErr" class="text-sm text-[#FFB4A8]" role="alert"></p>
          </div>
        </form>

        <aside class="lg:sticky lg:top-24 lg:self-start" aria-live="polite">
          <div id="bkSummary" class="glass rounded-3xl p-6">
            <p class="eyebrow">${t('Récapitulatif', 'Summary')}</p>
            <dl class="mt-5 grid gap-4 text-sm">
              <div><dt class="text-brume">${t('Formule', 'Option')}</dt><dd id="sumType" class="mt-1 font-semibold"></dd></div>
              <div><dt class="text-brume">${t('Lieu', 'Location')}</dt><dd id="sumPlace" class="mt-1 font-semibold"></dd></div>
              <div><dt class="text-brume">${t('Date et heure', 'Date and time')}</dt><dd id="sumWhen" class="mt-1 font-semibold"></dd></div>
              <div><dt class="text-brume">${t('Durée', 'Duration')}</dt><dd id="sumDur" class="mt-1 font-semibold"></dd></div>
              <div><dt class="text-brume">${t('Paiement', 'Payment')}</dt><dd id="sumPay" class="mt-1 font-semibold text-lagoon"></dd></div>
            </dl>
            <p class="mt-6 border-t border-white/10 pt-4 text-xs text-brume">${t('Gilet, briefing sécurité et bracelet de retour au pilote fournis. Annulation gratuite à tout moment.', 'Life jacket, safety briefing and rider-return wristband provided. Free cancellation at any time.')}</p>
          </div>
          <div id="bkDone" class="glass rounded-3xl p-6" hidden>
            <i data-lucide="circle-check" class="h-8 w-8 text-lagoon"></i>
            <h2 id="doneTitle" class="mt-4 font-display text-xl font-semibold"></h2>
            <p class="mt-2 text-sm text-brume">${t('Référence', 'Reference')} <span id="doneRef" class="font-mono text-foam"></span></p>
            <p id="doneText" class="mt-4 text-sm"></p>
            <p id="doneNote" class="mt-3 text-xs text-brume"></p>
            <div class="mt-6 flex flex-wrap gap-2">
              <button type="button" id="depBtn" class="btn-primary inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold" hidden><i data-lucide="credit-card" class="h-4 w-4"></i><span id="depBtnTxt"></span></button>
              <button type="button" id="icsBtn" class="btn-ghost inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm"><i data-lucide="calendar-plus" class="h-4 w-4"></i>${t('Ajouter à mon agenda', 'Add to my calendar')}</button>
              <button type="button" id="bkAgain" class="btn-ghost inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm"><i data-lucide="rotate-ccw" class="h-4 w-4"></i>${t('Nouvelle demande', 'New request')}</button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </section>

  <section id="faq" class="gutter scroll-mt-24 pb-20 sm:pb-28">
    <div class="mx-auto max-w-4xl">
      <p class="eyebrow">FAQ</p>
      <h2 class="mt-4 font-display text-3xl font-semibold sm:text-4xl">${t('Questions fréquentes', 'Frequently asked questions')}</h2>
      <div class="mt-8">
        ${faq(t('Faut-il un permis pour piloter IRUKA ?', 'Do I need a licence to ride IRUKA?'), t('En France, un permis bateau est obligatoire pour piloter un jet-ski de cette puissance. Sans permis, votre essai se fait accompagné d\'un pilote E-Dolphin.', 'In France, a boat licence is required to ride a jet-ski of this power. Without one, your trial is done with an E-Dolphin pilot.'))}
        ${faq(t('Comment se recharge IRUKA ?', 'How is IRUKA charged?'), t('Par une prise CCS2, la même que celle des voitures électriques : environ 30 minutes sur une borne rapide DC. Une recharge à bord du yacht est étudiée avec chaque équipage.', 'Through a CCS2 socket, the same as electric cars: about 30 minutes on a DC fast charger. On-board charging is studied with each yacht crew.'))}
        ${faq(t('Où puis-je naviguer ?', 'Where can I ride?'), t('Là où les jet-skis sont autorisés, comme un jet-ski thermique. Certains plans d\'eau les interdisent quelle que soit l\'énergie, par exemple le lac d\'Annecy : nous y proposons seulement des présentations à quai.', 'Wherever jet-skis are allowed, like a combustion jet-ski. Some waters ban them whatever the energy, such as Lake Annecy: there we only offer quayside presentations.'))}
        ${faq(t('Comment fonctionne l\'acompte ?', 'How does the deposit work?'), t('Chaque modèle se réserve avec un acompte de 30 % du prix total, options comprises : 13 170 € HT pour un IRUKA sans option, 27 000 $ HT pour une Launch Edition. Le configurateur calcule l\'acompte exact de votre configuration. Il sera payable en ligne par paiement sécurisé dès l\'ouverture ; votre demande réserve déjà votre place.', 'Every model is reserved with a 30 % deposit on the total price, options included: €13,170 excl. VAT for an IRUKA without options, $27,000 excl. VAT for a Launch Edition. The configurator works out the exact deposit for your build. It will be payable online by secure payment once it opens; your request already holds your place.'))}
        ${faq(t('Quand serai-je livré ?', 'When will I receive it?'), t('Les premières livraisons sont visées au printemps 2028, en commençant par la Launch Edition. Votre date vous est confirmée par notre équipe au moment de la réservation.', 'First deliveries are targeted for spring 2028, starting with the Launch Edition. Your date is confirmed by our team when you reserve.'))}
        ${faq(t('Et l\'entretien ?', 'What about maintenance?'), t('Un moteur électrique n\'a ni vidange, ni bougies, ni carburant à stabiliser l\'hiver. Le suivi de la batterie et les mises à jour se font à distance.', 'An electric motor needs no oil change, no spark plugs and no fuel to stabilise in winter. Battery monitoring and updates are done remotely.'))}
      </div>
    </div>
  </section>`;
};
