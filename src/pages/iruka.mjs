import { tr, img, head, fig, btn, ctaBand } from '../ui.mjs';

export const meta = {
  fr: { title: 'IRUKA · fiche technique · E-Dolphin', desc: 'IRUKA, jet-ski 100 % électrique : 160 kW, 60 nœuds, batterie 35 kWh, recharge rapide CCS2, carène carbone.' },
  en: { title: 'IRUKA · specifications · E-Dolphin', desc: 'IRUKA, a 100 % electric jet-ski: 160 kW, 60 knots, 35 kWh battery, CCS2 fast charging, carbon hull.' }
};
export const scripts = ['iruka.js'];

export const body = (L, R) => {
  const t = tr(L);
  return `
  <!-- Page hero -->
  <section class="gutter pb-12 pt-32 sm:pt-40">
    <div class="mx-auto grid max-w-7xl items-end gap-10 lg:grid-cols-[1.1fr_1fr]">
      <div>
        <p class="eyebrow">${t('Le modèle', 'The model')}</p>
        <h1 class="mt-4 font-display text-5xl font-semibold leading-none sm:text-7xl">IRUKA</h1>
        <p class="mt-6 max-w-xl text-brume sm:text-lg">${t('Le S300 navigue déjà : plus de 200 heures en mer. IRUKA reprend sa propulsion avec une carène carbone, une batterie 800 V refroidie par liquide et un équipement premium de série.', 'The S300 is already sailing: over 200 hours at sea. IRUKA takes its propulsion further with a carbon hull, a liquid-cooled 800 V battery and premium equipment as standard.')}</p>
        <p class="mt-6 font-display text-xl">${t('À partir de', 'From')} <span class="num font-semibold">35 990 € HT</span></p>
        <div class="mt-8 flex flex-wrap gap-3">
          ${btn('reserver.html', t('Réserver un essai', 'Book a sea trial'), 'calendar-check')}
          ${btn('configurateur.html', t('Configurer et commander', 'Configure and order'), 'sliders-horizontal', false)}
        </div>
      </div>
      ${fig(img(R, 's300-prototype.jpg'), t('Le prototype S300 sur l\'eau', 'The S300 prototype on the water'), t('Photo réelle · S300', 'Real photo · S300'), 'aspect-[4/3]')}
    </div>
  </section>

  <!-- Specs: prototype today vs IRUKA target -->
  <section class="gutter py-16 sm:py-24" aria-labelledby="spec-title">
    <div class="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
      <div class="min-w-0">
        ${head({ id: 'spec-title', eyebrow: t('Fiche technique', 'Specifications'), title: t('Du prototype au modèle de série.', 'From prototype to production model.') })}
        <div class="seg glass mt-8 inline-flex rounded-full p-1" role="group" aria-label="${t('Comparer le prototype et IRUKA', 'Compare the prototype and IRUKA')}">
          <button type="button" id="segS300" class="rounded-full px-5 py-2 text-sm font-semibold transition" aria-pressed="false">${t('S300 · aujourd\'hui', 'S300 · today')}</button>
          <button type="button" id="segIruka" class="rounded-full px-5 py-2 text-sm font-semibold transition" aria-pressed="true">IRUKA</button>
        </div>
        <dl class="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div class="glass rounded-2xl p-4"><dt class="tag text-brume">${t('Puissance', 'Power')}</dt><dd class="num mt-1 font-display text-2xl font-semibold" data-k="kw">160 <small class="font-mono text-xs text-brume">kW</small></dd></div>
          <div class="glass rounded-2xl p-4"><dt class="tag text-brume">${t('Vitesse', 'Speed')}</dt><dd class="num mt-1 font-display text-2xl font-semibold" data-k="kn">60 <small class="font-mono text-xs text-brume">${t('nœuds', 'knots')}</small></dd></div>
          <div class="glass rounded-2xl p-4"><dt class="tag text-brume">${t('Batterie', 'Battery')}</dt><dd class="num mt-1 font-display text-2xl font-semibold text-lime" data-k="kwh">35 <small class="font-mono text-xs text-brume">kWh</small></dd></div>
          <div class="glass rounded-2xl p-4"><dt class="tag text-brume">${t('Recharge DC', 'DC charging')}</dt><dd class="num mt-1 font-display text-2xl font-semibold text-lime" data-k="dc">70 <small class="font-mono text-xs text-brume">kW</small></dd></div>
          <div class="glass rounded-2xl p-4"><dt class="tag text-brume">${t('Masse', 'Weight')}</dt><dd class="num mt-1 font-display text-2xl font-semibold" data-k="kg">400 <small class="font-mono text-xs text-brume">kg</small></dd></div>
          <div class="glass rounded-2xl p-4"><dt class="tag text-brume">${t('Carène', 'Hull')}</dt><dd class="mt-1 font-display text-lg font-semibold" data-k="hull">${t('Carbone', 'Carbon')}</dd></div>
        </dl>
        <p class="mt-4 flex flex-wrap gap-2 tag text-brume">
          <span class="rounded-full border border-white/15 px-3 py-1">CE · 2013/53/UE</span><span class="rounded-full border border-white/15 px-3 py-1">ISO 16315</span><span class="rounded-full border border-white/15 px-3 py-1">ISO 13297</span><span class="rounded-full border border-white/15 px-3 py-1">CCS2</span><span class="rounded-full border border-white/15 px-3 py-1">IP67</span>
        </p>
        <p class="mt-3 tag text-brume/80">${t('IRUKA : objectifs de conception, confirmés par les essais de validation.', 'IRUKA: design targets, to be confirmed by validation trials.')}</p>
      </div>
      <figure class="zoom relative min-w-0 overflow-hidden rounded-3xl">
        <img id="irukaImg" src="${img(R, 'iruka-side.jpg')}" alt="${t('IRUKA vu de profil sur une mer calme', 'IRUKA in profile on calm water')}" class="aspect-[4/3] w-full object-cover" loading="lazy">
        <figcaption id="irukaCap" class="glass tag absolute bottom-4 left-4 rounded-full px-4 py-2">${t('Rendu · IRUKA', 'Render · IRUKA')}</figcaption>
      </figure>
    </div>
  </section>

  <!-- Real photos -->
  <section class="gutter py-8">
    <div class="mx-auto max-w-7xl">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <h2 class="font-display text-2xl font-semibold sm:text-3xl">${t('Déjà sur l\'eau.', 'Already on the water.')} <span class="text-brume">${t('200 heures de navigation.', '200 hours at sea.')}</span></h2>
        <p class="tag text-brume">${t('Photos réelles · prototype S300', 'Real photos · S300 prototype')}</p>
      </div>
      <div class="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        ${fig(img(R, 's300-real-side.jpg'), t('Le S300 de profil sur une mer bleu profond', 'The S300 in profile on deep blue water'), t('Profil', 'Profile'), 'aspect-[2/1]', 'col-span-2')}
        ${fig(img(R, 's300-real-bow.jpg'), t('L\'étrave du S300 fend l\'eau', 'The S300 bow cutting the water'), t('Étrave', 'Bow'), 'aspect-square')}
        ${fig(img(R, 's300-real-ccs2.jpg'), t('Prise de recharge CCS2 sous la trappe avant', 'CCS2 charging socket under the front hatch'), t('Prise CCS2', 'CCS2 socket'), 'aspect-square')}
      </div>
    </div>
  </section>

  <!-- Detail explorer -->
  <section class="gutter py-16 sm:py-24" aria-labelledby="details-title">
    <div class="mx-auto max-w-7xl">
      ${head({ id: 'details-title', eyebrow: t('Finitions de série', 'Standard finish'), title: t('Aucune option à cocher pour se démarquer sur l\'eau.', 'No options to tick to stand out on the water.') })}
      <div class="mt-12 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <div id="tabs" class="grid grid-cols-2 gap-3 self-start sm:grid-cols-3 lg:grid-cols-2" role="tablist" aria-label="${t('Détails IRUKA', 'IRUKA details')}"></div>
        <div class="glass relative min-w-0 overflow-hidden rounded-3xl">
          <img id="detailImg" src="${img(R, 'detail-led.jpg')}" alt="" class="aspect-[16/9] w-full object-cover transition-opacity duration-500">
          <span class="glass tag absolute left-4 top-4 rounded-full px-3 py-1">${t('Rendu', 'Render')}</span>
          <div class="p-6">
            <h3 id="detailTitle" class="font-display text-xl font-semibold"></h3>
            <p id="detailText" class="mt-2 text-brume"></p>
          </div>
        </div>
      </div>
      <ul class="mt-8 grid gap-3 text-sm text-brume sm:grid-cols-2 lg:grid-cols-4">
        <li class="flex items-center gap-2"><i data-lucide="speaker" class="h-4 w-4 text-lagoon"></i>${t('Système audio', 'Audio system')}</li>
        <li class="flex items-center gap-2"><i data-lucide="map" class="h-4 w-4 text-lagoon"></i>${t('Écran HD, GPS, antivol', 'HD screen, GPS, anti-theft')}</li>
        <li class="flex items-center gap-2"><i data-lucide="video" class="h-4 w-4 text-lagoon"></i>${t('Caméras avant et arrière', 'Front and rear cameras')}</li>
        <li class="flex items-center gap-2"><i data-lucide="refresh-cw" class="h-4 w-4 text-lagoon"></i>${t('Mises à jour à distance', 'Over-the-air updates')}</li>
      </ul>
    </div>
  </section>

  <!-- Hull CFD -->
  <section class="gutter py-16 sm:py-24" aria-labelledby="hull-title">
    <div class="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
      <div class="min-w-0">
        ${head({ id: 'hull-title', eyebrow: t('Ingénierie', 'Engineering'), title: t('Chaque kWh gagné commence sous la coque.', 'Every kWh saved starts under the hull.'), lead: t('Avant le moule, la carène est simulée en mécanique des fluides à vitesse de déjaugeage. Faites glisser le curseur pour comparer pression et surface mouillée.', 'Before the mould, the hull is simulated with fluid dynamics at planing speed. Drag the slider to compare pressure and wetted surface.') })}
        <ol class="mt-8 grid gap-5">
          <li class="flex gap-4"><span class="num grid h-8 w-8 shrink-0 place-items-center rounded-full border border-lagoon/50 font-mono text-sm text-lagoon">1</span><div><h3 class="font-semibold">${t('Moins de surface mouillée', 'Less wetted surface')}</h3><p class="text-sm text-brume">${t('En déjaugeage, seul l\'arrière de la coque touche l\'eau.', 'When planing, only the rear of the hull touches the water.')}</p></div></li>
          <li class="flex gap-4"><span class="num grid h-8 w-8 shrink-0 place-items-center rounded-full border border-lagoon/50 font-mono text-sm text-lagoon">2</span><div><h3 class="font-semibold">${t('La portance là où il faut', 'Lift where it counts')}</h3><p class="text-sm text-brume">${t('La pression se concentre derrière la ligne d\'embruns.', 'Pressure concentrates behind the spray line.')}</p></div></li>
          <li class="flex gap-4"><span class="num grid h-8 w-8 shrink-0 place-items-center rounded-full border border-lagoon/50 font-mono text-sm text-lagoon">3</span><div><h3 class="font-semibold">${t('Plus d\'autonomie', 'More range')}</h3><p class="text-sm text-brume">${t('Moins de traînée, moins d\'énergie par heure.', 'Less drag, less energy per hour.')}</p></div></li>
        </ol>
      </div>
      <figure class="min-w-0">
        <div id="wipe" class="wipe glass aspect-[16/10] rounded-3xl" style="--x:50%">
          <img src="${img(R, 'cfd-water.jpg')}" alt="${t('Fraction d\'eau sur le fond de coque, simulation', 'Water fraction on the hull bottom, simulation')}" class="absolute inset-0 h-full w-full object-contain p-4" style="background:#bfeffb" loading="lazy">
          <div class="top"><img src="${img(R, 'cfd-pressure.jpg')}" alt="${t('Pression sur le fond de coque, simulation', 'Pressure on the hull bottom, simulation')}" class="absolute inset-0 h-full w-full object-contain p-4" style="background:#80e0f8" loading="lazy"></div>
          <div class="bar"></div>
          <div class="knob grid h-11 w-11 place-items-center rounded-full bg-foam text-abyss shadow-xl"><i data-lucide="move-horizontal" class="h-5 w-5"></i></div>
          <label for="wipeRange" class="sr-only">${t('Comparer pression et surface mouillée', 'Compare pressure and wetted surface')}</label>
          <input id="wipeRange" type="range" min="0" max="100" value="50" class="absolute inset-0 h-full w-full cursor-ew-resize opacity-0">
        </div>
        <figcaption class="mt-3 flex justify-between tag text-brume"><span>← ${t('Pression', 'Pressure')}</span><span>${t('Surface mouillée', 'Wetted surface')} →</span></figcaption>
      </figure>
    </div>
    <!-- Weight budget and buoyancy: the 3D study model floated with 1, 2 and 3 people aboard -->
    <div class="mx-auto mt-16 max-w-7xl">
      <h3 class="font-display text-2xl font-semibold">${t('Devis de poids et flottabilité', 'Weight budget and buoyancy')}</h3>
      <p class="mt-2 max-w-3xl text-brume">${t('Sur un jet-ski électrique, la batterie pèse lourd : chaque kilo doit être placé au bon endroit. Le devis de poids additionne coque, batterie, moteur et équipage, puis la ligne de flottaison est vérifiée sur le modèle 3D, d\'une à trois personnes à bord, avant de lancer le moule.', 'On an electric jet ski the battery is heavy, so every kilo has to sit in the right place. The weight budget adds up hull, battery, motor and crew, then the waterline is checked on the 3D model with one to three people aboard, before the mould is made.')}</p>
      <div class="mt-8 grid gap-4 md:grid-cols-3">
        ${[
          [1, t('Jet-ski + 1 passager', 'Jet ski + 1 rider'), t('Pilote seul : la coque flotte haut, avec un large franc-bord.', 'Rider alone: the hull floats high, with generous freeboard.')],
          [2, t('Jet-ski + 2 passagers', 'Jet ski + 2 riders'), t('Avec un passager, la coque s\'enfonce un peu ; le pont reste nettement hors de l\'eau.', 'With a passenger the hull sits a little lower; the deck stays well clear of the water.')],
          [3, t('Jet-ski + 3 passagers', 'Jet ski + 3 riders'), t('À pleine charge, le franc-bord diminue mais une réserve de flottabilité demeure.', 'At full load the freeboard shrinks but a buoyancy reserve remains.')]
        ].map(([n, cap, txt]) => `
        <figure class="glass overflow-hidden rounded-3xl">
          <img src="${img(R, `flottabilite-${n}p.jpg`)}" alt="${t('Modèle 3D de la coque à flot', '3D hull model afloat')} : ${cap}" class="aspect-[2/1] w-full object-cover" loading="lazy">
          <figcaption class="flex gap-3 p-4"><span class="num grid h-8 w-8 shrink-0 place-items-center rounded-full border border-lagoon/50 font-mono text-sm text-lagoon">${n}</span><div><p class="font-semibold">${cap}</p><p class="mt-1 text-sm text-brume">${txt}</p></div></figcaption>
        </figure>`).join('')}
      </div>
      <p class="mt-6 max-w-3xl text-brume">${t('Pourquoi c\'est décisif : une coque qui porte juste son poids déjauge plus tôt, mouille moins de surface et consomme moins. C\'est ici que se gagnent les premiers kWh d\'autonomie.', 'Why it matters: a hull that carries its weight correctly gets on the plane sooner, wets less surface and uses less energy. This is where the first kWh of range are won.')}</p>
      <p class="mt-3 tag text-brume/80">${t('Modèle 3D d\'étude, couleurs de travail.', '3D study model, working colours.')}</p>
    </div>
  </section>

  <!-- Range -->
  <section class="gutter py-16 sm:py-24">
    <div class="mx-auto max-w-7xl">
      ${head({ eyebrow: t('Une plateforme, une gamme', 'One platform, one range'), title: t('Trois façons de vivre IRUKA.', 'Three ways to live IRUKA.') })}
      <div class="mt-12 grid gap-4 md:grid-cols-3">
        <article class="glass lift overflow-hidden rounded-3xl"><img src="${img(R, 'iruka-front.jpg')}" alt="${t('IRUKA vu de face', 'IRUKA front view')}" class="aspect-[16/10] w-full object-cover" loading="lazy"><div class="p-6"><p class="tag text-lagoon">01 · ${t('PROPRIÉTAIRES', 'OWNERS')}</p><h3 class="mt-2 font-display text-xl font-semibold">IRUKA</h3><p class="mt-2 text-sm text-brume">${t('La silhouette pure, la plus légère et la plus agile.', 'The pure silhouette, the lightest and most agile.')}</p><p class="mt-4 text-sm">${t('À partir de', 'From')} <strong class="num">35 990 € HT</strong></p></div></article>
        <article class="glass lift overflow-hidden rounded-3xl"><img src="${img(R, 'iruka-floats.jpg')}" alt="${t('IRUKA Fleet avec boudin gonflable', 'IRUKA Fleet with inflatable collar')}" class="aspect-[16/10] w-full object-cover" loading="lazy"><div class="p-6"><p class="tag text-lagoon">02 · ${t('FLOTTES ET YACHTS', 'FLEETS AND YACHTS')}</p><h3 class="mt-2 font-display text-xl font-semibold">IRUKA Fleet</h3><p class="mt-2 text-sm text-brume">${t('Boudin gonflable, stable à l\'arrêt, protège coques et pontons.', 'Inflatable collar, stable at rest, protects hulls and pontoons.')}</p><p class="num mt-4 tag text-brume">330 × 145 cm</p></div></article>
        <article class="glass lift overflow-hidden rounded-3xl"><img src="${img(R, 'charging-station.jpg')}" alt="${t('Ponton de recharge flottant', 'Floating charging pontoon')}" class="aspect-[16/10] w-full object-cover" loading="lazy"><div class="p-6"><p class="tag text-lime">03 · ${t('ÉNERGIE', 'ENERGY')}</p><h3 class="mt-2 font-display text-xl font-semibold">${t('Station de recharge flottante', 'Floating charging station')}</h3><p class="mt-2 text-sm text-brume">${t('Deux chargeurs rapides DC et des batteries de seconde vie.', 'Two DC fast chargers and second-life batteries.')}</p></div></article>
      </div>
      <p class="mt-3 tag text-brume/80">${t('Rendus, non contractuels.', 'Renders, non-contractual.')}</p>
    </div>
  </section>
  ${ctaBand(L)}`;
};
