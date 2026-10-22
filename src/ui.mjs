// Small building blocks shared by the pages.

export const tr = (L) => (fr, en) => (L === 'fr' ? fr : en);
export const img = (R, name) => `${R}assets/img/${name}`;

export const head = ({ eyebrow, title, lead = '', id = '', center = false }) => `
  <p class="eyebrow${center ? ' text-center' : ''}">${eyebrow}</p>
  <h2${id ? ` id="${id}"` : ''} class="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight sm:text-5xl${center ? ' mx-auto text-center' : ''}">${title}</h2>
  ${lead ? `<p class="mt-5 max-w-2xl text-brume sm:text-lg${center ? ' mx-auto text-center' : ''}">${lead}</p>` : ''}`;

// A photo with a small label saying what it is (real photo, render, interface mock-up)
export const fig = (src, alt, tag, cls = 'aspect-[4/3]', extra = '') => `
  <figure class="zoom relative overflow-hidden rounded-3xl ${extra}">
    <img src="${src}" alt="${alt}" class="${cls} h-full w-full object-cover" loading="lazy">
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
