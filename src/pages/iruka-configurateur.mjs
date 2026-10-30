import { tr, img } from '../ui.mjs';

export const meta = {
  fr: { title: 'Configurateur IRUKA · ONDARYS', desc: 'Configurez votre IRUKA option par option : livrée, sellerie, recharge, packs, Atelier. Prix et acompte calculés en direct.' },
  en: { title: 'IRUKA configurator · ONDARYS', desc: 'Build your IRUKA option by option: livery, upholstery, charging, packs, Atelier. Live price and deposit.' }
};
export const scripts = ['cfg-options.js', 'iruka-catalog.js', 'iruka-masks.js', 'iruka-cfg.js'];

// Modelled on the Porsche configurator (adam, 27 Oct: "Sur cette base là"): the craft fills the stage,
// the options sit in a side panel by category, the price follows every choice, a summary closes the journey.
// ?modele=launch opens the IRUKA Launch Edition: the same craft at its own price, its three liveries (iruka-catalog.js).
// iruka-cfg.js fills the panel, the price bar and the summary from iruka-catalog.js, and repaints the seat and deck pads on the
// renders in the chosen colours (where they sit: iruka-masks.js).
export const body = (L, R) => {
  const t = tr(L);
  const views = [['face', 'Face', 'Front'], ['a045', '3/4 avant', '3/4 front'], ['profil', 'Profil', 'Side'], ['a135', '3/4 arrière', '3/4 rear'], ['arriere', 'Arrière', 'Rear'], ['dessus', 'Dessus', 'Top']];
  return `
  <div class="cfgx cfg-light">
  <div class="cfgx-top gutter">
    <div class="flex items-center gap-3 py-3 lg:py-3.5">
      <a href="modeles.html" class="cfg-ghost inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium" aria-label="${t('Retour aux modèles', 'Back to the models')}"><i data-lucide="arrow-left" class="h-4 w-4"></i><span class="hidden sm:inline">${t('Modèles', 'Models')}</span></a>
      <div class="min-w-0">
        <p class="eyebrow !text-teal">${t('Configurateur', 'Configurator')}</p>
        <h1 id="xName" class="font-display text-xl font-semibold leading-tight sm:text-2xl">IRUKA</h1>
      </div>
      <div class="ml-auto flex items-center gap-2">
        <button type="button" id="xCode" class="cfg-ghost hidden items-center gap-2 rounded-full px-3 py-2 font-mono text-xs sm:inline-flex" title="${t('Copier le code de cette configuration', 'Copy the code of this configuration')}"><i data-lucide="hash" class="h-4 w-4"></i><span id="xCodeTxt">ED1</span></button>
        <button type="button" id="xShare" class="cfg-ghost inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium"><i data-lucide="share-2" class="h-4 w-4"></i><span class="hidden sm:inline">${t('Partager', 'Share')}</span></button>
      </div>
    </div>
  </div>

  <div class="cfgx-main">
    <div id="xStage" class="cfgx-stage" aria-label="${t('Aperçu de votre IRUKA', 'Preview of your IRUKA')}">
      <img id="xImg" class="cfgx-img" src="${img(R, 'cfg-blanc-a045.jpg')}" alt="IRUKA" width="1400" height="787" draggable="false">
      <p class="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 font-mono text-[11px] text-white sm:left-5 sm:top-5"><span>${t('Rendu', 'Render')}</span> · <span id="xImgLabel"></span></p>
      <button type="button" id="xPrev" class="cfgx-turn left-3 sm:left-5" aria-label="${t('Tourner à gauche', 'Turn left')}"><i data-lucide="rotate-ccw" class="h-5 w-5"></i></button>
      <button type="button" id="xNext" class="cfgx-turn right-3 sm:right-5" aria-label="${t('Tourner à droite', 'Turn right')}"><i data-lucide="rotate-cw" class="h-5 w-5"></i></button>
      <div class="cfgx-views" role="group" aria-label="${t('Angle de vue', 'View angle')}">
        ${views.map(([v, fr, en]) => `<button type="button" class="cfgx-chip" data-view="${v}" aria-pressed="false">${t(fr, en)}</button>`).join('')}
      </div>
      <p class="cfgx-hint"><i data-lucide="move-horizontal" class="mr-1 inline h-4 w-4"></i>${t('Faites glisser pour tourner', 'Drag to turn')}</p>
      <div id="xMat" class="cfgx-mat" hidden></div>
    </div>

    <aside class="cfgx-panel" aria-label="${t('Options', 'Options')}">
      <div id="xTabs" class="cfgx-tabs" role="tablist" aria-label="${t('Catégories', 'Categories')}"></div>
      <div id="xPanel" class="cfgx-scroll" role="tabpanel"></div>
    </aside>
  </div>

  <!-- Price, always visible -->
  <div class="cfg-bar fixed inset-x-0 bottom-0 z-40 gutter" style="padding-bottom:max(10px, env(safe-area-inset-bottom))">
    <div class="flex items-center gap-4 py-3">
      <dl class="grid flex-1 grid-cols-2 gap-x-6 gap-y-0.5 text-xs sm:flex sm:items-center sm:gap-8 sm:text-sm">
        <div class="hidden md:block"><dt id="xBaseName" class="text-ink2">IRUKA</dt><dd class="num font-semibold" data-x="base"></dd></div>
        <div class="hidden md:block"><dt class="text-ink2">${t('Options', 'Options')}</dt><dd class="num font-semibold" data-x="opts"></dd></div>
        <div><dt class="text-ink2">${t('Prix total', 'Total price')}</dt><dd class="num whitespace-nowrap font-display text-base font-bold sm:text-xl" data-x="total"></dd></div>
        <div><dt class="text-ink2">${t('Acompte 30 %', '30 % deposit')}</dt><dd class="num whitespace-nowrap font-semibold text-teal sm:text-lg" data-x="deposit"></dd></div>
      </dl>
      <button type="button" id="xSumOpen" class="btn-primary inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold sm:px-7">${t('Résumé', 'Summary')} <i data-lucide="arrow-right" class="h-4 w-4"></i></button>
    </div>
  </div>

  <!-- Summary, filled by iruka-cfg.js -->
  <div id="xSum" class="cfgx-sum" role="dialog" aria-modal="true" aria-labelledby="xSumTitle" hidden></div>
  <p id="xOut" class="sr-only" role="status" aria-live="polite"></p>
  </div>`;
};
