import { tr, img } from '../ui.mjs';

export const meta = {
  fr: { title: 'Choisissez votre modèle · ONDARYS', desc: 'La gamme ONDARYS : choisissez votre jet-ski électrique et configurez-le option par option.' },
  en: { title: 'Choose your model · ONDARYS', desc: 'The ONDARYS range: choose your electric jet ski and build it option by option.' }
};
export const scripts = ['modeles.js'];

// Entry of the configurator, modelled on the Porsche "Modèles" page (adam, 27 Oct): pick a model, then configure it.
// Only IRUKA opens the new configurator for now (adam: "sur la base de l'IRUKA uniquement pour le moment").
export const body = (L, R) => {
  const t = tr(L);
  const spec = (k, v) => `<div><dt class="text-xs text-ink2">${k}</dt><dd class="num mt-0.5 font-display text-lg font-semibold">${v}</dd></div>`;
  const card = ({ kind, file, name, tags, price, priceNote, specs, actions, blur, big }) => `
      <div class="mdl-card${big ? ' lg:col-span-2 lg:grid lg:grid-cols-[1.35fr_1fr]' : ''}" data-kind="${kind}">
        <div class="mdl-img${big ? ' lg:aspect-auto lg:h-full' : ''}">
          <img src="${img(R, file)}" alt="${name}" loading="${big ? 'eager' : 'lazy'}">
          <span class="absolute bottom-3 left-3 rounded-full bg-black/55 px-3 py-1 font-mono text-[11px] text-white">${blur ? t('Rendu flouté · confidentiel', 'Blurred render · confidential') : t('Rendu', 'Render')}</span>
        </div>
        <div class="flex flex-col p-5 sm:p-7">
          <div class="flex flex-wrap gap-2">${tags.map(([label, cls = '']) => `<span class="mdl-tag ${cls}">${label}</span>`).join('')}</div>
          <h2 class="mt-3 font-display text-3xl font-semibold">${name}</h2>
          <p class="mt-1 text-ink2">${price}${priceNote ? ` <span class="text-xs">· ${priceNote}</span>` : ''}</p>
          ${specs ? `<dl class="mt-5 grid grid-cols-2 gap-4 border-t border-[#DCE3E7] pt-5">${specs}</dl>` : ''}
          <div class="mt-auto flex flex-wrap gap-3 pt-6">${actions}</div>
        </div>
      </div>`;
  const btn = (href, label, icon, primary) => `<a href="${href}" class="${primary ? 'btn-primary' : 'cfg-ghost'} inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold">${label}<i data-lucide="${icon}" class="h-4 w-4"></i></a>`;
  const filters = [['all', t('Tous', 'All'), 4], ['config', t('Configurables', 'Configurable'), 1], ['serie', t('Séries limitées', 'Limited series'), 1], ['soon', t('Bientôt', 'Soon'), 2]];
  return `
  <div class="cfg-light mdl">
  <section class="gutter pb-6 pt-24 lg:pt-14">
    <div class="mx-auto max-w-7xl">
      <p class="eyebrow !text-teal">${t('Configurateur', 'Configurator')}</p>
      <h1 class="mt-2 font-display text-4xl font-semibold sm:text-5xl">${t('Choisissez votre modèle', 'Choose your model')}</h1>
      <p class="mt-3 max-w-2xl text-ink2">${t('Configurez votre IRUKA option par option, prix et acompte calculés en direct. Les autres modèles suivront.', 'Build your IRUKA option by option, with live price and deposit. The other models will follow.')}</p>
      <div class="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div class="flex flex-wrap gap-2" role="group" aria-label="${t('Filtrer', 'Filter')}">
          ${filters.map(([id, label, n], i) => `<button type="button" class="mdl-filter" data-filter="${id}" aria-pressed="${i === 0}">${label} <span class="num opacity-60">${n}</span></button>`).join('')}
        </div>
        <form id="mdlCode" class="flex items-center gap-2" autocomplete="off">
          <label for="mdlCodeIn" class="text-sm text-ink2">${t('Vous avez un code ?', 'Got a code?')}</label>
          <input id="mdlCodeIn" class="mdl-code font-mono" placeholder="ED1-…" spellcheck="false" autocapitalize="characters">
          <button class="cfg-ghost rounded-full px-4 py-2 text-sm font-semibold">${t('Ouvrir', 'Open')}</button>
        </form>
      </div>
    </div>
  </section>

  <section class="gutter pb-28">
    <div id="mdlGrid" class="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
      ${card({ kind: 'config', big: true, file: 'cfg-blanc-a045.jpg', name: 'IRUKA', tags: [[t('100 % électrique', '100 % electric'), 'mdl-tag-on'], [t('Modèle de série', 'Series model')]],
        price: `${t('À partir de', 'From')} <b class="num text-[#0A1E2B]">43 900 € HT</b>`, priceNote: t('acompte 30 %', '30 % deposit'),
        specs: spec(t('Puissance', 'Power'), '160 kW') + spec(t('Vitesse de pointe', 'Top speed'), t('60 nœuds', '60 knots')) + spec(t('Batterie', 'Battery'), '35 kWh') + spec(t('Recharge rapide DC', 'DC fast charging'), '70 kW'),
        actions: btn('iruka-configurateur.html', t('Configurer', 'Build yours'), 'sliders-horizontal', true) + btn('iruka.html', t('Découvrir', 'Discover'), 'arrow-right') })}
      ${card({ kind: 'serie', file: 'cfg-predator-a045.jpg', name: 'IRUKA Launch Edition', tags: [[t('Série limitée', 'Limited series'), 'mdl-tag-sand'], [t('300 exemplaires', '300 units')]],
        price: `<b class="num text-[#0A1E2B]">90 000 $ HT</b>`, priceNote: t('acompte 30 %', '30 % deposit'),
        actions: btn('iruka-configurateur.html?modele=launch', t('Configurer', 'Build yours'), 'sliders-horizontal', true) + btn('launch-edition.html', t('Découvrir', 'Discover'), 'arrow-right') })}
      ${card({ kind: 'soon', file: 'tridens-flou.jpg', name: 'Tridens', blur: true, tags: [[t('Bientôt', 'Soon')], [t('Trois places · concept', 'Three seats · concept')]],
        price: t('Prix annoncé au lancement', 'Price announced at launch'), actions: btn('index.html#bientot', t('En savoir plus', 'Learn more'), 'arrow-right') })}
      ${card({ kind: 'soon', file: 'kids-mako2-flou.jpg', name: t('Gamme enfants', 'Kids range'), blur: true, tags: [[t('Bientôt', 'Soon')], [t('6 à 12 ans · concept', 'Ages 6 to 12 · concept')]],
        price: t('Prix annoncé au lancement', 'Price announced at launch'), actions: btn('index.html#bientot', t('En savoir plus', 'Learn more'), 'arrow-right') })}
    </div>
    <p class="mx-auto mt-6 max-w-7xl text-xs text-ink2">${t('Caractéristiques : objectifs de conception, à confirmer lors des essais de validation. Rendus non contractuels.', 'Specifications: design targets, to be confirmed by validation trials. Non-contractual renders.')}</p>
  </section>
  </div>`;
};
