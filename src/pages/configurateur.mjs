import { tr, img } from '../ui.mjs';

export const meta = {
  fr: { title: 'Configurer son jet-ski électrique IRUKA · E-Dolphin', desc: 'Personnalisez votre IRUKA : modèle, livrée, vue 360°, équipements, total et acompte calculés en direct.' },
  en: { title: 'Build your IRUKA electric jet ski · E-Dolphin', desc: 'Build your IRUKA: model, livery, 360° view, equipment, live total and deposit.' }
};
export const scripts = ['cfg-options.js', 'config.js'];

// Ergonomics modelled on manufacturer configurators: numbered steps on top, the craft in the
// centre, choices on the right, and a running total with the deposit pinned at the bottom.
// Light theme on this page only, so colours and finishes read true.
export const body = (L, R) => {
  const t = tr(L);
  const steps = [['model', 'Modèle', 'Model'], ['color', 'Couleur', 'Colour'], ['equip', 'Équipements', 'Equipment'], ['sum', 'Résumé', 'Summary']];
  const views = [['face', 'Face', 'Front'], ['profil', 'Profil', 'Side'], ['arriere', 'Arrière', 'Rear'], ['dessus', 'Dessus', 'Top']];
  // The thumbnail is its own button: it opens the enlarged view (HD photos, 360° turn), the rest of the card picks the model
  const model = (id, name, price, sub, file, soon, zoom) => `
    <div class="relative">
      <button type="button" ${soon ? 'disabled' : `data-model="${id}"`} aria-pressed="${id === 'iruka'}" class="cfg-model card flex w-full items-center gap-4 rounded-2xl p-3 pl-[7.75rem] text-left ${soon ? 'opacity-50' : ''}">
        <span class="min-w-0 flex-1"><span class="block font-display font-semibold">${name}</span><span class="block text-xs text-ink2">${sub}</span></span>
        <span class="num shrink-0 text-sm font-semibold">${price}</span>
      </button>
      ${zoom ? `<button type="button" data-zoom="${zoom}" class="cfg-zoom group absolute left-3 top-1/2 h-16 w-24 -translate-y-1/2 overflow-hidden rounded-xl" aria-label="${t('Agrandir', 'Enlarge')} ${name}" aria-haspopup="dialog">
        <img src="${img(R, file)}" alt="" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy">
        <span class="absolute bottom-1 right-1 grid h-6 w-6 place-items-center rounded-full bg-black/60 text-white"><i data-lucide="maximize-2" class="h-3.5 w-3.5"></i></span>
      </button>` : `<span class="absolute left-3 top-1/2 h-16 w-24 -translate-y-1/2 overflow-hidden rounded-xl"><img src="${img(R, file)}" alt="" class="h-full w-full object-cover" loading="lazy"></span>`}
    </div>`;
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
          <p class="text-xs text-ink2"><i data-lucide="move-horizontal" class="mr-1 inline h-4 w-4"></i>${t('Faites glisser pour tourner', 'Drag to turn')}</p>
        </div>
        <figure id="cfgStage" class="relative overflow-hidden rounded-[1.75rem] bg-[#0b0d0f] select-none">
          <img id="cfgImg" src="${img(R, 'cfg-blanc-face.jpg')}" alt="IRUKA" width="1400" height="787" draggable="false" class="aspect-[16/9] w-full object-cover transition-opacity duration-200">
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
            ${model('iruka', 'IRUKA', '43 900 € HT', t('Le modèle de série', 'The series model'), 'cfg-blanc-face-s.jpg', false, 'iruka')}
            ${model('launch', 'IRUKA Launch Edition', '90 000 $ HT', t('Série limitée · 300 exemplaires', 'Limited series · 300 units'), 'cfg-predator-face-s.jpg', false, 'launch')}
            ${model('', 'Tridens', t('Bientôt', 'Soon'), t('Prochain modèle', 'Next model'), 'tridens-flou-s.jpg', true, '')}
            ${model('', t('Gamme enfants', 'Kids range'), t('Bientôt', 'Soon'), t('6 à 12 ans', 'Ages 6 to 12'), 'kids-mako2-flou-s.jpg', true, '')}
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
            <button type="button" id="cfgAdd" class="btn-primary inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-semibold">${t('Ajouter à ma sélection', 'Add to my selection')} <i data-lucide="shopping-bag" class="h-4 w-4"></i></button>
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
        <div class="hidden sm:block"><dt class="text-ink2"><span id="cfgModelName">IRUKA</span></dt><dd class="num font-semibold" id="cfgBase">43 900 € HT</dd></div>
        <div class="hidden sm:block"><dt class="text-ink2">${t('Équipements', 'Equipment')}</dt><dd class="num font-semibold" id="cfgExtra">+ 0 € HT</dd></div>
        <div><dt class="text-ink2">${t('Total', 'Total')}</dt><dd class="num cfg-total whitespace-nowrap font-display text-base font-bold sm:text-xl">43 900 € HT</dd></div>
        <div><dt class="text-ink2">${t('Acompte 30 %', '30 % deposit')}</dt><dd class="num cfg-deposit whitespace-nowrap font-semibold text-teal sm:text-lg">13 170 € HT</dd></div>
      </dl>
      <button type="button" id="cfgNextStep" class="btn-primary inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold sm:px-7">${t('Suivant', 'Next')} <i data-lucide="arrow-right" class="h-4 w-4"></i></button>
    </div>
  </div>
  <!-- Enlarged view of a model: HD photos, 360° turn (filled by config.js) -->
  <dialog id="zoomDlg" class="zoom-dlg" aria-labelledby="zoomTitle">
    <div class="zoom-box">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <h2 id="zoomTitle" class="font-display text-xl font-semibold sm:text-2xl"></h2>
        <div class="flex items-center gap-2">
          <div class="zoom-seg inline-flex rounded-full p-1" role="group" aria-label="${t('Affichage', 'Display')}">
            <button type="button" data-zmode="photo" aria-pressed="true" class="rounded-full px-3 py-1.5 text-sm font-medium sm:px-4">${t('Photos HD', 'HD photos')}</button>
            <button type="button" data-zmode="spin" aria-pressed="false" class="rounded-full px-3 py-1.5 text-sm font-medium sm:px-4">360°</button>
          </div>
          <button type="button" id="zoomClose" class="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20" aria-label="${t('Fermer', 'Close')}"><i data-lucide="x" class="h-5 w-5"></i></button>
        </div>
      </div>
      <!-- not a <figure>: the page reveal-on-scroll animates every figure in main -->
      <div id="zoomStage" class="relative overflow-hidden rounded-3xl bg-[#05080b] select-none">
        <img id="zoomImg" alt="" draggable="false" class="zoom-img h-full w-full object-contain">
        <button type="button" id="zoomPrev" class="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-2.5 text-abyss shadow" aria-label="${t('Précédent', 'Previous')}"><i data-lucide="chevron-left" class="h-5 w-5"></i></button>
        <button type="button" id="zoomNext" class="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/85 p-2.5 text-abyss shadow" aria-label="${t('Suivant', 'Next')}"><i data-lucide="chevron-right" class="h-5 w-5"></i></button>
        <p id="zoomCap" class="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 font-mono text-[11px] text-white"></p>
      </div>
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div id="zoomThumbs" class="flex gap-2 overflow-x-auto" role="group" aria-label="${t('Vues', 'Views')}"></div>
        <p id="zoomHint" class="text-xs text-white/60"></p>
      </div>
    </div>
  </dialog>
  <p id="cfgPriceNote" hidden></p>
  </div>`;
};
