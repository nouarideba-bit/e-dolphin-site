import { tr, img, head, btn, ctaBand } from '../ui.mjs';

export const meta = {
  fr: { title: 'Le film ONDARYS : jet-ski électrique en Méditerranée', desc: 'Le prototype S300 en mer, des criques au coucher du soleil : le film ONDARYS, et ce qui fait la maison.' },
  en: { title: 'The ONDARYS film: electric jet ski in the Mediterranean', desc: 'The S300 prototype at sea, from the coves to sunset: the ONDARYS film, and what makes the house.' }
};
export const scripts = ['film.js'];

// "Discover ONDARYS": the brand film (real footage of the S300 prototype) and the house in four points.
// The hero plays a short silent loop; the big player below holds the full film, with chapters and a sound switch.
// Soundtrack: original upbeat track synthesised for the site (no third-party rights).
const CHAPTERS = [
  [6, 'film-6.jpg', 'Les rochers', 'The rocks', 'Entre les îlots, au ras de l\'eau.', 'Between the islets, close to the water.'],
  [40, 'film-40.jpg', 'Les eaux turquoise', 'Turquoise water', 'Les criques, vues du ciel.', 'The coves, seen from above.'],
  [46, 'film-46.jpg', 'Le large', 'Open water', 'Pleine vitesse, sans un bruit de moteur.', 'Full speed, without engine noise.'],
  [66, 'film-66.jpg', 'Le virage', 'The turn', 'Le sillage dessine la trajectoire.', 'The wake draws the line.'],
  [80, 'film-80.jpg', 'Au mouillage', 'At anchor', 'Le pilote, le jet-ski, la falaise.', 'The rider, the craft, the cliff.'],
  [86, 'film-86.jpg', 'Le coucher du soleil', 'Sunset', 'Retour au bateau, à la dernière lumière.', 'Back to the boat, in the last light.']
];

export const body = (L, R) => {
  const t = tr(L);
  const V = `${R}assets/video/`;
  const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  const pillar = (icon, title, text) => `<article class="rounded-3xl border border-white/10 bg-deep p-6"><i data-lucide="${icon}" class="h-6 w-6 text-lagoon"></i><h3 class="mt-4 font-display text-xl font-semibold">${title}</h3><p class="mt-2 text-sm text-brume">${text}</p></article>`;
  return `
  <!-- Hero: muted loop from the film -->
  <section class="disc-hero relative isolate flex min-h-[88svh] items-end overflow-hidden">
    <video id="heroFilm" class="absolute inset-0 -z-20 h-full w-full object-cover" src="${V}edolphin-boucle-v2.mp4" poster="${img(R, 'film-46.jpg')}" autoplay muted loop playsinline preload="auto" aria-label="${t('Images du film ONDARYS, en boucle', 'ONDARYS film footage, looping')}"></video>
    <div class="absolute inset-0 -z-10 bg-gradient-to-t from-abyss via-abyss/40 to-abyss/10"></div>
    <div class="gutter w-full">
      <div class="mx-auto max-w-7xl pb-16 pt-32">
        <p class="eyebrow">${t('Découvrir ONDARYS', 'Discover ONDARYS')}</p>
        <h1 class="mt-4 max-w-4xl font-display text-[2.6rem] font-semibold leading-[1.02] sm:text-7xl">${t('La Méditerranée, sans le bruit.', 'The Mediterranean, without the noise.')}</h1>
        <p class="mt-5 max-w-xl text-brume sm:text-lg">${t('Une minute et demie en mer avec le prototype S300 : les rochers, les criques, le large, puis le coucher du soleil.', 'Ninety seconds at sea with the S300 prototype: the rocks, the coves, open water, then sunset.')}</p>
        <div class="mt-8 flex flex-wrap items-center gap-4">
          <a href="#film" data-play="0" class="btn-primary inline-flex items-center gap-3 rounded-full py-2 pl-2 pr-6 font-semibold"><span class="grid h-11 w-11 place-items-center rounded-full bg-abyss text-lagoon"><i data-lucide="play" class="h-5 w-5"></i></span>${t('Regarder le film', 'Watch the film')} <span class="num font-mono text-xs opacity-70">1:28</span></a>
          <span class="tag text-brume">${t('Images réelles · prototype S300', 'Real footage · S300 prototype')}</span>
        </div>
      </div>
    </div>
  </section>

  <!-- The film, with chapters -->
  <section id="film" class="gutter scroll-mt-24 py-16 sm:py-24">
    <div class="mx-auto max-w-7xl">
      <div class="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-black">
        <video id="filmPlayer" class="aspect-video w-full" src="${V}edolphin-film-v4.mp4" poster="${img(R, 'film-6.jpg')}" controls playsinline preload="none"></video>
        <button type="button" data-sound="#filmPlayer" aria-pressed="true" class="sound-btn absolute right-3 top-3 inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-2 text-xs font-semibold text-white"><i data-lucide="volume-x" class="snd-off h-4 w-4"></i><i data-lucide="volume-2" class="snd-on h-4 w-4 text-lagoon"></i><span class="snd-off">${t('Activer le son', 'Sound on')}</span><span class="snd-on">${t('Couper le son', 'Mute')}</span></button>
      </div>
      <div class="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p class="font-display text-lg font-semibold">${t('Le film ONDARYS', 'The ONDARYS film')} <span class="num ml-2 font-mono text-xs text-brume">1:28</span></p>
        <p class="tag text-brume">${t('Images réelles du prototype S300 en Méditerranée · musique originale.', 'Real footage of the S300 prototype in the Mediterranean · original music.')}</p>
      </div>
      <h2 class="mt-12 font-display text-2xl font-semibold">${t('Chapitres', 'Chapters')}</h2>
      <ol class="disc-chapters -mx-4 mt-5 flex snap-x gap-4 overflow-x-auto scroll-px-4 px-4 pb-3 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-6">
        ${CHAPTERS.map(([s, file, fr, en, dfr, den], i) => `<li class="w-[70%] shrink-0 snap-start sm:w-auto">
          <a href="#film" data-play="${s}" class="disc-chap group block">
            <span class="relative block overflow-hidden rounded-2xl"><img src="${img(R, file)}" alt="" class="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy"><span class="num absolute bottom-2 left-2 rounded-full bg-black/60 px-2 py-0.5 font-mono text-[11px] text-white">${mmss(s)}</span><span class="absolute inset-0 grid place-items-center opacity-0 transition-opacity group-hover:opacity-100"><span class="grid h-10 w-10 place-items-center rounded-full bg-lagoon text-abyss"><i data-lucide="play" class="h-4 w-4"></i></span></span></span>
            <span class="mt-3 block text-sm font-semibold"><span class="num mr-1 font-mono text-xs text-lagoon">0${i + 1}</span>${t(fr, en)}</span>
            <span class="mt-0.5 block text-xs text-brume">${t(dfr, den)}</span>
          </a></li>`).join('')}
      </ol>
    </div>
  </section>

  <!-- The house in four points -->
  <section class="gutter pb-16 sm:pb-24">
    <div class="mx-auto max-w-7xl">
      ${head({ eyebrow: t('La maison', 'The house'), title: t('Ce qui fait ONDARYS.', 'What makes ONDARYS.') })}
      <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        ${pillar('volume-x', t('Le silence', 'Silence'), t('Un moteur électrique, pas de pot d\'échappement : on entend l\'eau et le vent.', 'An electric motor and no exhaust: you hear the water and the wind.'))}
        ${pillar('flag', t('Conçu en France', 'Designed in France'), t('Design, ingénierie et assemblage du pack batterie en France.', 'Design, engineering and battery pack assembly in France.'))}
        ${pillar('battery-charging', t('La batterie maîtrisée', 'A battery we master'), t('Boîtier et système de gestion de la batterie conçus par nos équipes. Recharge rapide CCS2.', 'Battery casing and management system designed in-house. CCS2 fast charging.'))}
        ${pillar('waves', t('Éprouvé en mer', 'Proven at sea'), t('Plus de 200 heures de navigation sur le prototype S300.', 'Over 200 hours at sea on the S300 prototype.'))}
      </div>
    </div>
  </section>

  <!-- The road -->
  <section class="gutter pb-16 sm:pb-24">
    <div class="mx-auto max-w-7xl">
      ${head({ eyebrow: t('La route', 'The road'), title: t('Du prototype à la famille.', 'From prototype to family.') })}
      <ol class="disc-road mt-10 grid gap-6 md:grid-cols-4">
        <li><span class="dot is-on"></span><p class="eyebrow mt-4">${t('Aujourd\'hui', 'Today')}</p><h3 class="mt-2 font-display text-xl font-semibold">${t('Prototype S300', 'S300 prototype')}</h3><p class="mt-1 text-sm text-brume">${t('Celui du film, en essais en mer.', 'The one in the film, in sea trials.')}</p></li>
        <li><span class="dot"></span><p class="eyebrow mt-4">${t('Le modèle', 'The model')}</p><h3 class="mt-2 font-display text-xl font-semibold">IRUKA</h3><p class="mt-1 text-sm text-brume">${t('Le modèle de série, à partir de 43 900 € HT.', 'The series model, from €43,900 excl. VAT.')}</p></li>
        <li><span class="dot sand"></span><p class="eyebrow-sand mt-4">${t('Série limitée', 'Limited series')}</p><h3 class="mt-2 font-display text-xl font-semibold">Launch Edition</h3><p class="mt-1 text-sm text-brume">${t('300 exemplaires numérotés, 90 000 $ HT.', '300 numbered units, $90,000 excl. VAT.')}</p></li>
        <li><span class="dot"></span><p class="eyebrow mt-4">${t('Ensuite', 'Next')}</p><h3 class="mt-2 font-display text-xl font-semibold">${t('Tridens et gamme enfants', 'Tridens and kids range')}</h3><p class="mt-1 text-sm text-brume">${t('Trois places, et des modèles pour les 6-12 ans.', 'Three seats, and models for ages 6 to 12.')}</p></li>
      </ol>
      <div class="mt-10 flex flex-wrap gap-3">${btn('iruka.html', t('Découvrir IRUKA', 'Discover IRUKA'), 'arrow-right')}${btn('modeles.html', t('Configurer le vôtre', 'Build yours'), 'sliders-horizontal', false)}</div>
    </div>
  </section>
  ${ctaBand(L)}`;
};
