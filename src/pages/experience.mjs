import { tr, img, head, fig, btn, ctaBand } from '../ui.mjs';

export const meta = {
  fr: { title: 'Journée en jet-ski électrique, recharge comprise · E-Dolphin', desc: 'Une journée sur l\'eau avec IRUKA, recharge comprise. Essais à Monaco, Antibes, Saint-Tropez ou à bord de votre yacht.' },
  en: { title: 'A day on an electric jet ski, charging included · E-Dolphin', desc: 'A day on the water with IRUKA, charging included. Trials in Monaco, Antibes, Saint-Tropez or on board your yacht.' }
};
export const scripts = ['day.js'];

export const body = (L, R) => {
  const t = tr(L);
  const step = (n, title, text) => `<li class="glass rounded-3xl p-6"><span class="num tag text-sand">0${n}</span><h3 class="mt-3 font-display text-lg font-semibold">${title}</h3><p class="mt-2 text-sm text-brume">${text}</p></li>`;
  const place = (name, note, ok = true) => `<li class="flex items-start justify-between gap-4 border-b border-white/10 py-4"><div><p class="font-display text-lg font-semibold">${name}</p><p class="text-sm text-brume">${note}</p></div><span class="tag shrink-0 rounded-full border px-3 py-1 ${ok ? 'border-lagoon/40 text-lagoon' : 'border-white/15 text-brume'}">${ok ? t('Essai et présentation', 'Trial and presentation') : t('Présentation à quai', 'Quayside presentation')}</span></li>`;
  return `
  <section class="relative isolate overflow-hidden">
    <img src="${img(R, 'use-private.jpg')}" alt="${t('Pilote en mer au coucher du soleil', 'Rider at sea at sunset')}" class="absolute inset-0 -z-20 h-full w-full object-cover" fetchpriority="high">
    <div class="hero-shade absolute inset-0 -z-10"></div>
    <div class="gutter"><div class="mx-auto max-w-7xl pb-20 pt-40 sm:pb-28 sm:pt-52">
      <p class="eyebrow">${t("L'expérience", 'The experience')}</p>
      <h1 class="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-6xl">${t('Une journée entière sur l\'eau, recharge comprise.', 'A full day on the water, charging included.')}</h1>
      <p class="mt-6 max-w-xl text-brume sm:text-lg">${t('Pas de plein à faire, pas de bruit à excuser. Une pause de 30 minutes au ponton et IRUKA repart.', 'No refuelling, no noise to apologise for. A 30-minute stop at the pontoon and IRUKA is off again.')}</p>
      <p class="mt-4 tag text-brume/80">${t('Rendu', 'Render')}</p>
    </div></div>
  </section>

  <!-- Day simulator -->
  <section class="gutter py-20 sm:py-28" aria-labelledby="day-title">
    <div class="mx-auto max-w-7xl">
      ${head({ id: 'day-title', eyebrow: t('Simulateur', 'Simulator'), title: t('Combien de sorties dans votre journée ?', 'How many rides fit in your day?'), lead: t('Réglez vos sorties : le simulateur place les recharges rapides quand la batterie le demande.', 'Set your rides: the simulator adds fast charges when the battery needs them.') })}
      <div class="mt-10 grid gap-6 lg:grid-cols-[22rem_1fr]">
        <form id="dayForm" class="glass grid gap-6 rounded-3xl p-6" onsubmit="return false">
          <div><label for="sessLen" class="flex justify-between text-sm font-medium">${t('Durée d\'une sortie', 'Ride length')} <output id="sessLenOut" class="num font-mono text-lagoon">60 min</output></label><input id="sessLen" type="range" min="20" max="120" step="10" value="60" class="mt-3"></div>
          <div><label for="gap" class="flex justify-between text-sm font-medium">${t('Pause entre deux sorties', 'Break between rides')} <output id="gapOut" class="num font-mono text-lagoon">10 min</output></label><input id="gap" type="range" min="5" max="30" step="5" value="10" class="mt-3"></div>
          <div><label for="open" class="flex justify-between text-sm font-medium">${t('Ouverture du ponton', 'Pontoon hours')} <output id="openOut" class="num font-mono text-lagoon">9 h – 18 h</output></label><input id="open" type="range" min="6" max="12" step="1" value="9" class="mt-3"></div>
          <fieldset><legend class="text-sm font-medium">${t('Usage', 'Use')}</legend>
            <div class="mt-3 grid grid-cols-2 gap-2 text-sm">
              <label class="glass flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2"><input type="radio" name="use" id="usePrivate" value="private" checked class="accent-[#2EE6A8]"> ${t('Privé', 'Private')}</label>
              <label class="glass flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2"><input type="radio" name="use" id="useFleet" value="fleet" class="accent-[#2EE6A8]"> ${t('Location', 'Rental')}</label>
            </div>
          </fieldset>
          <p class="text-xs leading-relaxed text-brume">${t('Hypothèses : 2,5 h d\'autonomie en usage mixte, recharge DC 70 kW d\'environ 30 min, réserve de 10 %. Estimation indicative.', 'Assumptions: 2.5 h range in mixed use, 70 kW DC charge of about 30 min, 10 % reserve. Indicative estimate.')}</p>
        </form>
        <div class="glass min-w-0 rounded-3xl p-6">
          <div class="flex flex-wrap items-end justify-between gap-4">
            <div><p class="text-sm text-brume">${t('Sorties dans la journée', 'Rides in the day')}</p><p class="num font-display text-5xl font-semibold"><span id="sessCount">6</span> <span class="text-base font-medium text-brume">${t('sorties', 'rides')}</span></p></div>
            <div class="flex gap-6 text-sm"><div><p class="text-brume">${t('Sur l\'eau', 'On the water')}</p><p class="num font-mono text-lg" id="onWater">6 h 00</p></div><div><p class="text-brume">${t('Recharges', 'Charges')}</p><p class="num font-mono text-lg text-lime" id="charges">2</p></div></div>
          </div>
          <div class="mt-6 overflow-x-auto"><svg id="dayChart" viewBox="0 0 800 260" class="h-auto w-full min-w-[560px]" role="img" aria-label="${t('Niveau de batterie au fil de la journée', 'Battery level through the day')}"></svg></div>
          <div class="mt-3 flex flex-wrap gap-5 text-xs text-brume">
            <span class="flex items-center gap-2"><span class="h-2.5 w-5 rounded-full bg-lagoon"></span>${t('Sortie', 'Ride')}</span>
            <span class="flex items-center gap-2"><span class="h-2.5 w-5 rounded-full bg-lime"></span>${t('Recharge DC', 'DC charge')}</span>
            <span class="flex items-center gap-2"><span class="h-2.5 w-5 rounded-full bg-white/20"></span>Pause</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- How a sea trial goes -->
  <section class="gutter pb-20 sm:pb-28">
    <div class="mx-auto max-w-7xl">
      ${head({ eyebrow: t('Votre essai', 'Your trial'), title: t('45 minutes, de l\'accueil à la barre.', '45 minutes, from welcome to helm.') })}
      <ol class="mt-12 grid gap-4 md:grid-cols-4">
        ${step(1, t('Accueil au ponton', 'Welcome at the pontoon'), t('Présentation d\'IRUKA, de la recharge et des commandes.', 'Introduction to IRUKA, charging and controls.'))}
        ${step(2, t('Briefing sécurité', 'Safety briefing'), t('Gilet et bracelet de retour au pilote fournis.', 'Life jacket and rider-return wristband provided.'))}
        ${step(3, t('À la barre', 'At the helm'), t('Avec votre permis bateau, ou accompagné d\'un pilote E-Dolphin.', 'With your boat licence, or with an E-Dolphin pilot.'))}
        ${step(4, t('Retour et échange', 'Back and debrief'), t('Vos questions, la Launch Edition, la livraison.', 'Your questions, the Launch Edition, delivery.'))}
      </ol>
    </div>
  </section>

  <!-- Locations -->
  <section class="gutter pb-20 sm:pb-28">
    <div class="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
      <div>
        ${head({ eyebrow: t('Où nous retrouver', 'Where to meet us'), title: t('La Côte d\'Azur, et votre propre yacht.', 'The French Riviera, and your own yacht.'), lead: t('Lieux confirmés avec vous selon la saison et les autorisations locales.', 'Locations confirmed with you depending on the season and local permits.') })}
      </div>
      <ul>
        ${place('Monaco', 'Port Hercule')}
        ${place('Antibes', 'Port Vauban')}
        ${place('Saint-Tropez', t('Selon disponibilité au port', 'Subject to port availability'))}
        ${place(t('À bord de votre yacht', 'On board your yacht'), t('Où qu\'il soit amarré en Méditerranée', 'Wherever she is moored in the Mediterranean'))}
        ${place(t('Lac d\'Annecy', 'Lake Annecy'), t('La navigation des jet-skis y est interdite : présentation à quai uniquement.', 'Jet-skis may not sail there: quayside presentation only.'), false)}
      </ul>
    </div>
  </section>
  ${ctaBand(L)}`;
};
