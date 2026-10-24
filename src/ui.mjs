// Small building blocks shared by the pages.

export const tr = (L) => (fr, en) => (L === 'fr' ? fr : en);
export const img = (R, name) => `${R}assets/img/${name}`;

export const head = ({ eyebrow, title, lead = '', id = '', center = false }) => `
  <p class="eyebrow${center ? ' text-center' : ''}">${eyebrow}</p>
  <h2${id ? ` id="${id}"` : ''} class="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight sm:text-5xl${center ? ' mx-auto text-center' : ''}">${title}</h2>
  ${lead ? `<p class="mt-5 max-w-2xl text-brume sm:text-lg${center ? ' mx-auto text-center' : ''}">${lead}</p>` : ''}`;

// A photo with a small label saying what it is (real photo, render, interface mock-up)
// eager = the page's first photo, at the top of the screen: fetched first instead of deferred (faster main paint)
export const fig = (src, alt, tag, cls = 'aspect-[4/3]', extra = '', eager = false) => `
  <figure class="zoom relative overflow-hidden rounded-3xl ${extra}">
    <img src="${src}" alt="${alt}" class="${cls} h-full w-full object-cover" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'}>
    ${tag ? `<figcaption class="glass tag absolute bottom-3 left-3 rounded-full px-3 py-1">${tag}</figcaption>` : ''}
  </figure>`;

export const btn = (href, label, icon = 'arrow-right', primary = true, attrs = '') =>
  `<a href="${href}" ${attrs} class="${primary ? 'btn-primary' : 'btn-ghost'} inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold">${label} <i data-lucide="${icon}" class="h-4 w-4"></i></a>`;

// Closing band used at the bottom of most pages: always lead back to booking
export const ctaBand = (L) => {
  const t = tr(L);
  return `
  <section class="gutter py-20 sm:py-28">
    <div class="panel relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] p-8 sm:p-14">
      <div class="rule-sand mb-8 w-40"></div>
      <h2 class="max-w-2xl font-display text-3xl font-semibold sm:text-5xl">${t('Le plus simple, c\'est de prendre la barre.', 'The simplest way is to take the helm.')}</h2>
      <p class="mt-5 max-w-xl text-brume">${t('Essai en mer de 45 minutes ou présentation privée d\'une heure, à Monaco, Antibes, Saint-Tropez ou à bord de votre yacht. Sans engagement, confirmé personnellement par notre équipe.', 'A 45-minute sea trial or a one-hour private presentation in Monaco, Antibes, Saint-Tropez or on board your yacht. No commitment, confirmed personally by our team.')}</p>
      <div class="mt-9 flex flex-wrap gap-3">
        ${btn('reserver.html', t('Réserver un essai en mer', 'Book a sea trial'), 'calendar-check')}
        ${btn('reserver.html?formule=presentation', t('Demander une présentation privée', 'Request a private presentation'), 'anchor', false)}
      </div>
    </div>
  </section>`;
};

// Home hero film: a short silent loop of the real footage plays behind the hero;
// the button opens the full film (1:28) with sound and controls.
export const heroLoop = (L, R, cls = 'absolute inset-0 -z-20 h-full w-full object-cover') =>
  // The loop (2.2 MB, or 0.8 MB cropped for phones in portrait) starts once the page has loaded (herofilm.js), so the poster paints first on mobile
  `<video id="heroLoop" class="hero-img ${cls}" data-src="${R}assets/video/edolphin-boucle-v2.mp4" data-src-mobile="${R}assets/video/edolphin-boucle-mobile.mp4" poster="${img(R, 'hero-s300-1280.webp')}" autoplay muted loop playsinline preload="none" aria-label="${tr(L)('Images réelles du prototype S300 en mer, en boucle', 'Real footage of the S300 prototype at sea, looping')}"></video>`;


export const filmBtn = (L, cls = 'glass', compactOnPhone = false) => {
  // compactOnPhone: on phones only the play button shows (the label stays for screen readers), so the hero fits above the tab bar
  const label = `${tr(L)('Regarder le film', 'Watch the film')} <span class="num font-mono text-xs opacity-70">1:28</span>`;
  return `<button type="button" data-film-open class="${cls} inline-flex items-center gap-3 rounded-full py-2 pl-2 pr-5 font-semibold${compactOnPhone ? ' max-sm:pr-2' : ''}"><span class="grid h-10 w-10 place-items-center rounded-full bg-lagoon text-abyss"><i data-lucide="play" class="h-4 w-4"></i></span>${compactOnPhone ? `<span class="max-sm:sr-only">${label}</span>` : label}</button>`;
};

export const filmDialog = (L, R) => {
  const t = tr(L);
  return `
  <dialog id="filmDlg" class="film-dlg" aria-label="${t('Le film E-Dolphin', 'The E-Dolphin film')}">
    <div class="relative w-full max-w-6xl">
      <video id="filmDlgVideo" class="aspect-video w-full rounded-2xl bg-black" src="${R}assets/video/edolphin-film-v4.mp4" poster="${img(R, 'film-6.jpg')}" controls playsinline preload="metadata"></video>
      <div class="mt-3 flex flex-wrap items-center justify-between gap-3 text-sm">
        <p class="text-brume">${t('Images réelles du prototype S300 en Méditerranée · musique originale', 'Real footage of the S300 prototype in the Mediterranean · original music')}</p>
        <a href="decouvrir.html" class="font-semibold text-lagoon underline underline-offset-4">${t('Découvrir E-Dolphin', 'Discover E-Dolphin')}</a>
      </div>
      <button type="button" data-film-close class="glass absolute -top-12 right-0 rounded-full p-2.5" aria-label="${t('Fermer le film', 'Close the film')}"><i data-lucide="x" class="h-5 w-5"></i></button>
    </div>
  </dialog>`;
};

// WhatsApp line given by the team (22 Oct 2026): captains, rental operators and dealers work on WhatsApp
export const WA = { num: '33648198282', show: '+33 6 48 19 82 82' };
export const waLink = (L, text) => `https://wa.me/${WA.num}?text=${encodeURIComponent(text || tr(L)('Bonjour, je vous contacte depuis le site E-Dolphin.', 'Hello, I am contacting you from the E-Dolphin website.'))}`;
export const waBtn = (L, label, text, primary = false) =>
  `<a href="${waLink(L, text)}" target="_blank" rel="noopener" class="${primary ? 'btn-primary' : 'btn-ghost'} inline-flex items-center gap-2 rounded-full px-6 py-3.5 font-semibold">${label || 'WhatsApp'} <i data-lucide="message-circle" class="h-4 w-4"></i></a>`;

// Prices: IRUKA is set in euros, the Launch Edition in dollars (adam, 21-22 Oct). Each is shown with
// its counter-value at the brochure rate of 1.16 $ per €, so no visitor has to convert.
// French figures here; English pages get "€35,990 excl. VAT" from the build's price filter.
export const PRICE = {
  iruka: '35 990 € HT', irukaAlt: '≈ 41 750 $ HT',
  launch: '90 000 $ HT', launchAlt: '≈ 77 600 € HT',
  deposit: '27 000 $ HT', depositAlt: '≈ 23 300 € HT'
};
export const priceWithAlt = (main, alt, altCls = 'text-sm font-normal text-brume') => `<span class="num">${main}</span> <span class="num ${altCls}">${alt}</span>`;
