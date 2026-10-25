import { tr, img, head, btn, ctaBand, heroLoop, filmBtn, filmDialog, PRICE } from '../ui.mjs';
import { plaque } from '../plaque.mjs';
import { logoArt } from '../layout.mjs';
// Turquoise blue of the IRUKA hull trim (sampled from iruka-front.jpg, brightened to stand out on the sea footage; adam, 24 Oct)
const IRUKA_BLUE = '#16B0D9';
export { meta } from './index.mjs';
export const scripts = ['home.js', 'herofilm.js'];
// The hero poster is the largest element on a phone screen: fetch it before anything else
export const preload = (R) => `<link rel="preload" as="image" href="${img(R, 'hero-s300-1280.webp')}" fetchpriority="high">`;

// Home page of the next version (left rail). Built like a manufacturer's home: announcement band,
// full-bleed photo with a colour band under it, then the range, the liveries, the numbers and the plate.
const LIVERIES = [
  ['blanc', 'Blanc · noir · lime', 'White · black · lime', '#F2F4F3', '#9BE15D', 'Lumineuse, nette, pour les eaux turquoise.', 'Bright and clean, made for turquoise water.'],
  ['gris', 'Gris · rouge', 'Grey · red', '#6B7075', '#D0202A', 'Sobre de loin, sportive de près.', 'Understated from afar, sporty up close.'],
  ['predator', 'Predator', 'Predator', '#121416', '#7CFF3A', 'La livrée de la Launch Edition.', 'The Launch Edition livery.'],
  ['magma', 'Magma', 'Magma', '#1A1A1A', '#FF5A1F', 'Noir volcanique, veines de lave.', 'Volcanic black, veins of lava.'],
  ['wasp', 'Wasp', 'Wasp', '#F5C400', '#121416', 'Jaune et noir, impossible à manquer.', 'Yellow and black, impossible to miss.']
];

export const body = (L, R) => {
  const t = tr(L);
  const card = (href, file, tag, name, sub, price, cta, soon = false) => `
        <a href="${href}" class="home-model group snap-start ${soon ? 'is-soon' : ''}">
          <div class="relative overflow-hidden rounded-[1.5rem] bg-[#0b0d0f]">
            <img src="${img(R, file)}" alt="${name}" class="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" loading="lazy">
            <span class="tag absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-white">${tag}</span>
          </div>
          <div class="flex items-start justify-between gap-3 px-1 pt-4">
            <div><h3 class="font-display text-xl font-semibold">${name}</h3><p class="mt-0.5 text-sm text-brume">${sub}</p></div>
            <p class="num shrink-0 pt-1 text-right font-display font-semibold">${price}</p>
          </div>
          <p class="mt-3 inline-flex items-center gap-1.5 px-1 text-sm font-semibold ${soon ? 'text-brume' : 'text-lagoon'}">${cta} <i data-lucide="arrow-right" class="h-4 w-4 transition-transform group-hover:translate-x-1"></i></p>
        </a>`;
  const stat = (n, dec, unit, label) => `<div class="stat"><dd class="num font-display text-5xl font-semibold sm:text-6xl"><span data-count="${n}" data-dec="${dec}">${n.toLocaleString(L === 'fr' ? 'fr-FR' : 'en-GB', { minimumFractionDigits: dec })}</span><span class="ml-1 text-2xl text-lime">${unit}</span></dd><dt class="mt-2 text-sm text-brume">${label}</dt></div>`;

  return `
  <!-- Announcement band -->
  <div id="annonce" class="home-annonce gutter">
    <div class="flex items-center gap-3 py-3 text-sm">
      <i data-lucide="gem" class="h-5 w-5 shrink-0 text-sand"></i>
      <p class="flex-1"><a href="launch-edition.html#numero" class="hover:underline"><b class="home-grad font-display font-semibold uppercase tracking-wide">${t('Launch Edition : 300 exemplaires numérotés', 'Launch Edition: 300 numbered units')}</b> <span class="hidden text-foam/85 sm:inline">${t('· votre numéro et votre nom gravés en relief · premières livraisons visées au printemps 2028', '· your number and name engraved in relief · first deliveries targeted for spring 2028')}</span> <span class="underline">${t('Réserver mon numéro', 'Reserve my number')}</span></a></p>
      <button type="button" id="annonceClose" class="shrink-0 rounded-full border border-white/40 p-1.5 hover:border-foam" aria-label="${t('Fermer l\'annonce', 'Close announcement')}"><i data-lucide="x" class="h-4 w-4"></i></button>
    </div>
  </div>

  <!-- 1. Hero: the value proposition sits on the real footage, readable in 5 seconds on a phone
       (audit 22 Oct): what it is, the proof, the price and the two commitments. -->
  <section class="home-hero relative">
    <figure class="relative h-[86svh] min-h-[600px] overflow-hidden sm:h-[80svh]">
      ${heroLoop(L, R, 'h-full w-full object-cover')}
      <div class="home-hero-shade absolute inset-0"></div>
      <div class="hero-logo pointer-events-none absolute right-4 top-16 lg:right-6 lg:top-6" aria-hidden="true"><div class="hero-logo-spin">${[0, 1].map(() => `<svg viewBox="0 0 40 30">${logoArt(IRUKA_BLUE)}</svg>`).join('')}</div></div>
      <figcaption class="hero-cap tag absolute left-4 top-16 lg:left-6 rounded-full bg-black/45 px-3 py-1 text-white lg:top-6">${t('Images réelles · prototype S300', 'Real footage · S300 prototype')}</figcaption>
      <div class="hero-copy absolute inset-x-0 bottom-0 px-5 pb-6 sm:px-10 sm:pb-10">
        <p class="font-mono text-[11px] uppercase tracking-[.22em] text-lagoon">${t('Conçu et assemblé en France', 'Designed and assembled in France')}</p>
        <h1 class="mt-3 max-w-4xl font-display text-[2.35rem] font-semibold leading-[1.02] sm:text-6xl xl:text-7xl">${t('Le jet-ski 100 % électrique de luxe.', 'The 100% electric luxury jet ski.')}</h1>
        <p class="mt-4 max-w-2xl text-foam/90 sm:text-lg">${t('215 ch, 60 nœuds visés, zéro essence à bord. Silencieux au mouillage pour votre yacht, économique à l\'heure pour votre flotte.', '215 hp, 60 knots targeted, zero fuel on board. Silent at anchor for your yacht, low cost per hour for your fleet.')}</p>
        <div class="mt-6 flex flex-wrap items-center gap-3">
          ${btn('launch-edition.html#numero', t('Réserver mon numéro', 'Reserve my number'), 'gem')}
          ${btn('location.html#offre', t('Demander une offre flotte', 'Request a fleet offer'), 'sailboat', false).replace('class="', 'class="max-sm:order-2 ')}
          ${filmBtn(L, 'glass max-sm:order-1', true)}
        </div>
        <p class="mt-5 text-sm text-foam/85">${t('À partir de', 'From')} <b class="num">${PRICE.iruka}</b> <span class="text-foam/60">·</span> Launch Edition <b class="num">${PRICE.launch}</b> <span class="num text-foam/60">${PRICE.launchAlt}</span></p>
      </div>
    </figure>
    <!-- Colour band: one door per visitor, and the proof of silence -->
    <div class="home-band gutter">
      <div class="grid grid-cols-1 items-center gap-6 py-8 sm:py-10 xl:grid-cols-[1.4fr_1fr]">
        <div class="min-w-0">
          <p class="font-display text-2xl font-semibold text-abyss sm:text-3xl">${t('Le silence a une vitesse.', 'Silence has a speed.')}</p>
          <p class="mt-1 font-mono text-[11px] uppercase tracking-[.22em] text-abyss/70">${t('Vous êtes', 'You are')}</p>
          <div class="mt-4 grid gap-3 sm:grid-cols-3">
            ${[['yachts-flottes.html', 'anchor', t('Propriétaire de yacht', 'A yacht owner'), t('Pour mon yacht', 'For my yacht')],
               ['location.html', 'sailboat', t('Loueur, hôtel, club', 'Rental, hotel, club'), t('Pour ma location', 'For my rental')],
               ['distributeurs.html', 'handshake', t('Futur distributeur', 'A future dealer'), t('Devenir distributeur', 'Become a dealer')]].map(([h, ic, who, go]) => `
            <a href="${h}" class="home-door group flex items-center gap-3 rounded-2xl bg-abyss px-4 py-3.5 text-foam transition hover:bg-black">
              <i data-lucide="${ic}" class="h-5 w-5 shrink-0 text-lagoon"></i>
              <span class="min-w-0 flex-1"><span class="block text-xs text-brume">${who}</span><span class="block font-semibold">${go}</span></span>
              <i data-lucide="arrow-right" class="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1"></i>
            </a>`).join('')}
          </div>
        </div>
        <!-- Two sound lines: combustion engine (jagged) and IRUKA (only the water) -->
        <div class="home-sound min-w-0" aria-hidden="true">
          <div class="flex items-center gap-4"><span class="w-28 shrink-0 font-mono text-[11px] uppercase tracking-wider text-abyss/60">${t('Moteur thermique', 'Petrol engine')}</span><svg viewBox="0 0 300 40" class="h-10 flex-1"><path class="wave-loud" d="" fill="none" stroke="#06131C" stroke-opacity=".35" stroke-width="1.6"/></svg></div>
          <div class="mt-2 flex items-center gap-4"><span class="w-28 shrink-0 font-mono text-[11px] uppercase tracking-wider text-abyss">IRUKA</span><svg viewBox="0 0 300 40" class="h-10 flex-1"><path class="wave-calm" d="" fill="none" stroke="#06131C" stroke-width="2.2"/></svg></div>
          <p class="mt-2 text-right font-mono text-[10px] uppercase tracking-wider text-abyss/60">${t('Illustration : plus de moteur, il reste l\'eau', 'Illustration: no engine, only the water')}</p>
        </div>
      </div>
    </div>
  </section>

  ${filmDialog(L, R)}

  <!-- 2. The range -->
  <section class="home-wrap gutter py-16 sm:py-24">
    <div class="flex flex-wrap items-end justify-between gap-6">
      <div>${head({ eyebrow: t('La gamme', 'The range'), title: t('Choisissez votre modèle.', 'Choose your model.') })}</div>
      <a href="configurateur.html" class="inline-flex items-center gap-2 text-sm font-semibold text-lagoon">${t('Ouvrir le configurateur', 'Open the configurator')} <i data-lucide="sliders-horizontal" class="h-4 w-4"></i></a>
    </div>
    <div class="home-row -mx-4 mt-10 flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 xl:grid-cols-4">
      ${card('configurateur.html?modele=iruka', 'cfg-blanc-profil.jpg', t('Rendu', 'Render'), 'IRUKA', t('Le modèle de série', 'The series model'), `<span class="block text-xs font-normal text-brume">${t('à partir de', 'from')}</span>43 900 € HT`, t('Configurer', 'Configure'))}
      ${card('launch-edition.html', 'cfg-predator-profil.jpg', t('Rendu', 'Render'), 'Launch Edition', t('300 exemplaires numérotés', '300 numbered units'), `${PRICE.launch}<span class="block text-xs font-normal text-brume">${PRICE.launchAlt}</span>`, t('Réserver mon numéro', 'Reserve my number'))}
      <div id="bientot" class="contents"></div>
      ${card('#bientot', 'tridens-flou.jpg', t('Rendu flouté · confidentiel', 'Blurred render · confidential'), 'Tridens', t('Trois places, trois coques', 'Three seats, three hulls'), t('Bientôt', 'Soon'), t('En développement', 'In development'), true)}
      ${card('#bientot', 'kids-mako2-flou.jpg', t('Rendu flouté · confidentiel', 'Blurred render · confidential'), t('Gamme enfants', 'Kids range'), t('6 à 12 ans, contrôle parental', 'Ages 6 to 12, parental control'), t('Bientôt', 'Soon'), t('En développement', 'In development'), true)}
    </div>
  </section>

  <!-- 3. Liveries -->
  <section class="home-wrap gutter pb-16 sm:pb-24">
    <div class="home-liv panel grid overflow-hidden rounded-[2rem] lg:grid-cols-[1.5fr_1fr]">
      <figure class="relative bg-[#0b0d0f]">
        <img id="livImg" src="${img(R, 'cfg-blanc-profil.jpg')}" alt="IRUKA" class="aspect-[16/9] h-full w-full object-cover transition-opacity duration-300">
        <figcaption class="tag absolute bottom-3 left-3 rounded-full bg-black/55 px-3 py-1 text-white">${t('Rendu', 'Render')} · <span id="livCap">${t('Blanc · noir · lime', 'White · black · lime')}</span></figcaption>
      </figure>
      <div class="flex flex-col p-6 sm:p-10">
        <p class="eyebrow">${t('Cinq livrées', 'Five liveries')}</p>
        <h2 class="mt-3 font-display text-3xl font-semibold sm:text-4xl">${t('Un caractère pour chaque pilote.', 'A character for every rider.')}</h2>
        <div class="mt-6 grid gap-2" role="radiogroup" aria-label="${t('Livrée', 'Livery')}">
          ${LIVERIES.map(([id, fr, en, c1, c2, dfr, den], i) => `<button type="button" role="radio" aria-checked="${i === 0}" data-liv="${id}" data-name="${t(fr, en)}" class="liv-btn flex items-center gap-4 rounded-2xl px-4 py-3 text-left">
            <span class="relative h-9 w-9 shrink-0 rounded-full" style="background:linear-gradient(135deg, ${c1} 0 55%, ${c2} 55% 100%)"></span>
            <span><span class="block font-semibold">${t(fr, en)}</span><span class="block text-xs text-brume">${t(dfr, den)}</span></span>
          </button>`).join('')}
        </div>
        <div class="mt-auto flex flex-wrap gap-3 pt-8">
          <a id="livGo" href="configurateur.html?modele=iruka&livree=blanc" class="btn-primary inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold">${t('Configurer cette livrée', 'Configure this livery')} <i data-lucide="sliders-horizontal" class="h-4 w-4"></i></a>
          <a id="liv360" href="configurateur.html?modele=iruka&livree=blanc" class="btn-ghost inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold">${t('Voir à 360°', 'See in 360°')} <i data-lucide="rotate-cw" class="h-4 w-4"></i></a>
        </div>
      </div>
    </div>
  </section>

  <!-- 4. The numbers -->
  <section class="home-stats home-wrap gutter py-16 sm:py-24">
    ${head({ eyebrow: t('IRUKA en quatre chiffres', 'IRUKA in four numbers'), title: t('Tout le plaisir, sans le bruit.', 'All the thrill, none of the noise.') })}
    <dl class="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
      ${stat(160, 0, 'kW', t('Moteur électrique, soit 215 ch', 'Electric motor, i.e. 215 hp'))}
      ${stat(60, 0, t('nœuds', 'knots'), t('Vitesse de pointe visée', 'Target top speed'))}
      ${stat(2.5, 1, 'h', t('Autonomie en usage mixte', 'Mixed-use range'))}
      ${stat(30, 0, 'min', t('Recharge rapide CCS2, environ', 'CCS2 fast charge, about'))}
    </dl>
    <p class="mt-8 tag text-brume/80">${t('Objectifs de conception IRUKA, à confirmer lors des essais de validation.', 'IRUKA design targets, to be confirmed by validation trials.')}</p>
  </section>

  <!-- 5. The numbered plate -->
  <section class="home-wrap gutter pb-16 sm:pb-24">
    <div class="relative grid items-center gap-10 overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(ellipse_at_top_right,rgba(203,185,148,.16),transparent_60%)] p-6 sm:p-12 lg:grid-cols-2">
      <div class="plaque-wrap" data-finish="carbon"><div class="plaque-float">${plaque('pl', L)}</div></div>
      <div>
        <p class="eyebrow-sand">Launch Edition</p>
        <h2 class="mt-4 font-display text-3xl font-semibold sm:text-5xl">${t('Votre numéro, gravé en relief.', 'Your number, engraved in relief.')}</h2>
        <p class="mt-5 text-brume">${t('Chacun des 300 exemplaires porte sa plaque numérotée, en carbone ou en aluminium brossé. Une série, jamais rééditée.', 'Each of the 300 units carries its numbered plate, in carbon or brushed aluminium. One series, never reissued.')}</p>
        <p class="mt-6 flex flex-wrap items-baseline gap-x-3"><span class="num font-display text-3xl font-semibold">${PRICE.launch}</span><span class="num text-brume">${PRICE.launchAlt}</span><span class="text-sm text-brume">${t('· acompte de 30 %, ouverture prochaine', '· 30 % deposit, opening soon')}</span></p>
        <div class="mt-8 flex flex-wrap gap-3">${btn('launch-edition.html#numero', t('Réserver mon numéro', 'Reserve my number'), 'gem')}${btn('configurateur.html?modele=launch&livree=predator', t('La voir à 360°', 'See it in 360°'), 'rotate-cw', false)}</div>
        <p class="mt-4 tag text-brume/80">${t('Visuel d\'illustration de la plaque.', 'Illustration of the plate.')}</p>
      </div>
    </div>
  </section>

  <!-- 6. Appointments -->
  <section class="home-wrap gutter pb-16 sm:pb-24">
    ${head({ eyebrow: t('Prendre la barre', 'Take the helm'), title: t('Trois façons de la découvrir.', 'Three ways to discover it.') })}
    <div class="mt-10 grid gap-4 md:grid-cols-3">
      <a href="reserver.html?formule=essai" class="home-rdv lift rounded-3xl p-6"><span class="num font-mono text-xs text-brume">01</span><i data-lucide="waves" class="mt-6 h-7 w-7 text-lagoon"></i><h3 class="mt-4 font-display text-xl font-semibold">${t('Essai en mer', 'Sea trial')}</h3><p class="mt-1 text-sm text-brume">${t('45 minutes accompagné, briefing compris.', '45 minutes with a guide, briefing included.')}</p></a>
      <a href="reserver.html?formule=presentation" class="home-rdv lift rounded-3xl p-6"><span class="num font-mono text-xs text-brume">02</span><i data-lucide="anchor" class="mt-6 h-7 w-7 text-lagoon"></i><h3 class="mt-4 font-display text-xl font-semibold">${t('Présentation privée', 'Private presentation')}</h3><p class="mt-1 text-sm text-brume">${t('1 heure, à quai ou à bord de votre yacht.', 'One hour, at the quay or on board your yacht.')}</p></a>
      <a href="${'https://wa.me/33648198282'}" target="_blank" rel="noopener" class="home-rdv lift rounded-3xl p-6"><span class="num font-mono text-xs text-brume">03</span><i data-lucide="message-circle" class="mt-6 h-7 w-7 text-lagoon"></i><h3 class="mt-4 font-display text-xl font-semibold">WhatsApp</h3><p class="mt-1 text-sm text-brume">${t('Une question, un yacht, une flotte : écrivez-nous au', 'A question, a yacht, a fleet: message us at')} <span class="num">+33 6 48 19 82 82</span>.</p></a>
    </div>
    <div class="mt-6 flex flex-wrap items-center gap-2 text-sm">
      <span class="mr-2 text-brume">${t('Lieux :', 'Locations:')}</span>
      <span class="glass rounded-full px-4 py-2">Monaco</span><span class="glass rounded-full px-4 py-2">Antibes</span><span class="glass rounded-full px-4 py-2">Saint-Tropez</span><span class="glass rounded-full px-4 py-2">${t('À bord de votre yacht', 'On board your yacht')}</span><span class="glass rounded-full px-4 py-2 text-brume">${t('Lac d\'Annecy · présentation à quai', 'Lake Annecy · quayside presentation')}</span>
    </div>
  </section>
  ${ctaBand(L)}`;
};
