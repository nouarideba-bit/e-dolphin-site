import { tr, img } from '../ui.mjs';

export const meta = {
  fr: { title: 'Configurateur · IRUKA · E-Dolphin', desc: 'Personnalisez votre IRUKA : modèle, livrée, vue 360°, équipements, total et acompte calculés en direct.' },
  en: { title: 'Configurator · IRUKA · E-Dolphin', desc: 'Build your IRUKA: model, livery, 360° view, equipment, live total and deposit.' }
};
export const scripts = ['cfg-options.js', 'jet3d.js', 'config.js'];

// Ergonomics modelled on manufacturer configurators: numbered steps on top, the craft in the
// centre, choices on the right, and a running total with the deposit pinned at the bottom.
// Light theme on this page only, so colours and finishes read true.
export const body = (L, R) => {
  const t = tr(L);
  const steps = [['model', 'Modèle', 'Model'], ['color', 'Couleur', 'Colour'], ['equip', 'Équipements', 'Equipment'], ['sum', 'Résumé', 'Summary']];
  const views = [['face', 'Face', 'Front'], ['profil', 'Profil', 'Side'], ['arriere', 'Arrière', 'Rear'], ['dessus', 'Dessus', 'Top']];
  const model = (id, name, price, sub, file, soon) => `
    <button type="button" ${soon ? 'disabled' : `data-model="${id}"`} aria-pressed="${id === 'iruka'}" class="cfg-model card flex items-center gap-4 rounded-2xl p-3 text-left ${soon ? 'opacity-50' : ''}">
      <img src="${img(R, file)}" alt="" class="h-16 w-24 shrink-0 rounded-xl object-cover" loading="lazy">
      <span class="min-w-0 flex-1"><span class="block font-display font-semibold">${name}</span><span class="block text-xs text-ink2">${sub}</span></span>
      <span class="num shrink-0 text-sm font-semibold">${price}</span>
    </button>`;
  return `
  <div class="cfg-light">
  <section class="gutter pb-4 pt-24 sm:pt-28">
    <div class="mx-auto max-w-7xl">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p class="eyebrow !text-teal">${t('Configurateur', 'Configurator')}</p>
          <h1 class="mt-2 font-display text-3xl font-semibold sm:text-4xl">${t('Personnalisez', 'Build')} <span id="cfgTitle">IRUKA</span></h1>
        </div>
        <ol class="flex w-full gap-1 sm:w-auto" role="tablist" aria-label="${t('Étapes', 'Steps')}">
          ${steps.map(([id, fr, en], i) => `<li class="flex-1 sm:flex-none"><button type="button" role="tab" id="tab-${id}" aria-controls="pane-${id}" aria-selected="${i === 0}" class="cfg-step w-full px-2 py-2 text-xs sm:px-4 sm:text-sm"><span class="num mr-1">${i + 1}</span>${t(fr, en)}</button></li>`).join('')}
        </ol>
      </div>
    </div>
  </section>

  <section class="gutter pb-36">
    <div class="mx-auto grid max-w-7xl items-start gap-6 lg:grid-cols-[1.6fr_1fr]">
      <!-- Stage -->
      <div class="lg:sticky lg:top-24">
        <div class="mb-3 flex items-center justify-between gap-3">
          <div class="cfg-seg inline-flex rounded-full p-1" role="group" aria-label="${t('Affichage', 'Display')}">
            <button type="button" data-mode="photo" aria-pressed="true" class="rounded-full px-4 py-1.5 text-sm font-medium">${t('Photos', 'Photos')}</button>
            <button type="button" data-mode="3d" aria-pressed="false" class="rounded-full px-4 py-1.5 text-sm font-medium">3D 360°</button>
          </div>
          <p class="hidden text-xs text-ink2 sm:block"><i data-lucide="move-horizontal" class="mr-1 inline h-4 w-4"></i>${t('Faites glisser pour tourner', 'Drag to turn')}</p>
        </div>
        <figure id="cfgStage" class="relative overflow-hidden rounded-[1.75rem] bg-[#0b0d0f] select-none">
          <img id="cfgImg" src="${img(R, 'cfg-blanc-face.jpg')}" alt="IRUKA" width="1400" height="787" draggable="false" class="aspect-[16/9] w-full object-cover transition-opacity duration-200">
          <div id="cfg3d" class="absolute inset-0" hidden></div>
          <figcaption class="absolute bottom-3 left-3 rounded-full bg-black/55 px-3 py-1 font-mono text-[11px] text-white"><span id="cfgImgKind">${t('Rendu', 'Render')}</span> · <span id="cfgImgLabel">${t('Blanc · noir · lime', 'White · black · lime')}</span></figcaption>
          <button type="button" id="cfgPrev" class="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-2.5 text-abyss shadow" aria-label="${t('Tourner à gauche', 'Turn left')}"><i data-lucide="rotate-ccw" class="h-5 w-5"></i></button>
          <button type="button" id="cfgNext" class="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-2.5 text-abyss shadow" aria-label="${t('Tourner à droite', 'Turn right')}"><i data-lucide="rotate-cw" class="h-5 w-5"></i></button>
        </figure>
        <div id="cfgThumbs" class="mt-3 grid grid-cols-4 gap-2 sm:gap-3" role="group" aria-label="${t('Angle de vue', 'View angle')}">
          ${views.map(([v, fr, en], i) => `<button type="button" data-view="${v}" aria-pressed="${i === 0}" class="cfg-view card overflow-hidden rounded-xl text-left"><img src="${img(R, `cfg-blanc-${v}-s.jpg`)}" alt="" class="aspect-[16/9] w-full object-cover"><span class="block px-2 py-1 text-xs text-ink2">${t(fr, en)}</span></button>`).join('')}
        </div>
      </div>

      <!-- Choices -->
      <div id="cfgPanel" class="card scroll-mt-24 rounded-[1.75rem] p-5 sm:p-7">
        <div id="pane-model" role="tabpanel" aria-labelledby="tab-model">
          <h2 class="font-display text-xl font-semibold">${t('Choisissez votre modèle', 'Choose your model')}</h2>
          <div class="mt-4 grid gap-3">
            ${model('iruka', 'IRUKA', '35 990 € HT', t('Le modèle de série', 'The series model'), 'cfg-blanc-face-s.jpg')}
            ${model('launch', 'IRUKA Launch Edition', '90 000 $ HT', t('Série limitée · 300 exemplaires', 'Limited series · 300 units'), 'cfg-predator-face-s.jpg')}
            ${model('', 'Tridens', t('Bientôt', 'Soon'), t('Prochain modèle', 'Next model'), 'tridens.jpg', true)}
            ${model('', t('Gamme enfants', 'Kids range'), t('Bientôt', 'Soon'), t('6 à 12 ans', 'Ages 6 to 12'), 'kids-mako.jpg', true)}
          </div>
        </div>

        <div id="pane-color" role="tabpanel" aria-labelledby="tab-color" hidden>
          <h2 class="font-display text-xl font-semibold">${t('Livrée', 'Livery')} : <span id="cfgLiveryName">${t('Blanc · noir · lime', 'White · black · lime')}</span></h2>
          <div id="cfgSwatches" class="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-3 xl:grid-cols-5"></div>
          <p class="mt-5 text-xs text-ink2">${t('Livrée incluse dans le prix. Rendus non contractuels ; teintes définitives présentées à l\'essai.', 'Livery included in the price. Non-contractual renders; final colours shown at the trial.')}</p>
        </div>

        <div id="pane-equip" role="tabpanel" aria-labelledby="tab-equip" hidden>
          <h2 class="font-display text-xl font-semibold">${t('Équipements et accessoires', 'Equipment and accessories')}</h2>
          <p class="mt-1 text-sm text-ink2">${t('Cochez : le total se met à jour en bas de l\'écran.', 'Tick: the total updates at the bottom of the screen.')}</p>
          <div id="cfgOptions" class="mt-4 grid gap-3"></div>
          <p class="mt-5 text-xs text-ink2">${t('Prix indicatifs hors taxes, confirmés sur devis. Fonctions électroniques en cours de validation sur prototype.', 'Indicative prices excl. VAT, confirmed on quotation. Electronic features being validated on the prototype.')}</p>
        </div>

        <div id="pane-sum" role="tabpanel" aria-labelledby="tab-sum" hidden>
          <h2 class="font-display text-xl font-semibold">${t('Votre configuration', 'Your configuration')}</h2>
          <dl id="cfgSummary" class="mt-4 grid gap-2.5 text-sm"></dl>
          <div class="mt-6 grid gap-3">
            <button type="button" id="cfgAdd" class="btn-primary inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold">${t('Ajouter au panier', 'Add to cart')} <i data-lucide="shopping-bag" class="h-4 w-4"></i></button>
            <div class="grid grid-cols-2 gap-3">
              <a id="cfgBook" href="reserver.html" class="cfg-ghost inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold"><i data-lucide="calendar-check" class="h-4 w-4"></i>${t('Essayer', 'Try it')}</a>
              <button type="button" id="cfgShare" class="cfg-ghost inline-flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold"><i data-lucide="share-2" class="h-4 w-4"></i>${t('Partager', 'Share')}</button>
            </div>
            <p id="cfgOut" class="min-h-[1.25rem] text-center text-sm text-teal" role="status" aria-live="polite"></p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Running total, always visible -->
  <div class="cfg-bar fixed inset-x-0 bottom-0 z-40 gutter" style="padding-bottom:max(10px, env(safe-area-inset-bottom))">
    <div class="mx-auto flex max-w-7xl items-center gap-4 py-3">
      <dl class="grid flex-1 grid-cols-2 gap-x-6 gap-y-0.5 text-xs sm:flex sm:items-center sm:gap-8 sm:text-sm">
        <div class="hidden sm:block"><dt class="text-ink2"><span id="cfgModelName">IRUKA</span></dt><dd class="num font-semibold" id="cfgBase">35 990 € HT</dd></div>
        <div class="hidden sm:block"><dt class="text-ink2">${t('Équipements', 'Equipment')}</dt><dd class="num font-semibold" id="cfgExtra">+ 0 € HT</dd></div>
        <div><dt class="text-ink2">${t('Total', 'Total')}</dt><dd class="num cfg-total whitespace-nowrap font-display text-base font-bold sm:text-xl">35 990 € HT</dd></div>
        <div><dt class="text-ink2">${t('Acompte 30 %', '30 % deposit')}</dt><dd class="num cfg-deposit whitespace-nowrap font-semibold text-teal sm:text-lg">10 797 € HT</dd></div>
      </dl>
      <button type="button" id="cfgNextStep" class="btn-primary inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold sm:px-7">${t('Suivant', 'Next')} <i data-lucide="arrow-right" class="h-4 w-4"></i></button>
    </div>
  </div>
  <p id="cfgPriceNote" hidden></p>
  </div>`;
};
