// Navigation rail for the next version of the site: a vertical ribbon on the left (desktop),
// a tab bar at the bottom (mobile). Models and "More" open a side panel instead of a new page.
import { logo } from './layout.mjs';

export function rail({ L, slug, href, other, flagFr, flagEn }) {
  const t = (fr, en) => (L === 'fr' ? fr : en);
  const R = L === 'fr' ? '' : '../';
  const on = (s) => (s === slug ? ' is-on" aria-current="page' : '');
  const item = (s, icon, label, cls = '') =>
    `<li><a class="rail-item${cls}${on(s)}" href="${href(s)}"><i data-lucide="${icon}" class="h-[22px] w-[22px]"></i><span>${label}</span></a></li>`;
  const panelBtn = (panel, icon, label) =>
    `<li><button type="button" class="rail-item" data-fly="${panel}" aria-expanded="false" aria-controls="railFly"><i data-lucide="${icon}" class="h-[22px] w-[22px]"></i><span>${label}</span></button></li>`;
  const model = (link, file, name, sub, price, soon = false) => `
      <a href="${link}" class="fly-model group flex items-center gap-4 rounded-2xl p-3${soon ? ' opacity-60' : ''}">
        <img src="${R}assets/img/${file}" alt="" class="h-16 w-24 shrink-0 rounded-xl object-cover" loading="lazy">
        <span class="min-w-0 flex-1"><span class="block font-display font-semibold">${name}</span><span class="block text-xs text-brume">${sub}</span></span>
        <span class="num shrink-0 text-right text-sm font-semibold">${price}</span>
      </a>`;
  const more = [
    ['decouvrir', t('Découvrir E-Dolphin', 'Discover E-Dolphin')], ['maison', t('La maison', 'The house')], ['boutique', t('Boutique', 'Shop')], ['experience', t("L'expérience", 'Experience')],
    ['reserver', t('Questions fréquentes', 'FAQ'), '#faq'], ['cgv', t('Conditions de vente', 'Terms of sale')], ['mentions-legales', t('Mentions légales', 'Legal notice')]
  ].map(([s, label, hash = '']) => `<a class="fly-link flex items-center justify-between rounded-xl px-4 py-3" href="${href(s)}${hash}">${label}<i data-lucide="chevron-right" class="h-4 w-4 text-brume"></i></a>`).join('');

  const models = `
      ${model(href('iruka'), 'cfg-blanc-face-s.jpg', 'IRUKA', t('Le modèle de série', 'The series model'), '35 990 € HT')}
      ${model(href('launch-edition'), 'cfg-predator-face-s.jpg', 'Launch Edition', t('300 exemplaires numérotés', '300 numbered units'), '90 000 $ HT')}
      ${model(href('index') + '#bientot', 'tridens.jpg', 'Tridens', t('Trois places · concept', 'Three seats · concept'), t('Bientôt', 'Soon'), true)}
      ${model(href('index') + '#bientot', 'kids-mako.jpg', t('Gamme enfants', 'Kids range'), t('6 à 12 ans · concept', 'Ages 6 to 12 · concept'), t('Bientôt', 'Soon'), true)}`;

  return `
<aside id="rail" class="rail fixed inset-y-0 left-0 z-50 hidden w-[104px] flex-col lg:flex" aria-label="${t('Navigation principale', 'Main navigation')}">
  <a href="${href('index')}" class="rail-logo flex h-[78px] shrink-0 flex-col items-center justify-center gap-1" aria-label="E-Dolphin, ${t('accueil', 'home')}">${logo(44, 33)}<span class="font-display text-[9px] font-semibold tracking-[.28em]">E-DOLPHIN</span></a>
  <nav class="rail-nav flex-1 overflow-y-auto">
    <ul>
      ${panelBtn('models', 'ship', t('Modèles', 'Models'))}
      ${item('decouvrir', 'circle-play', t('Découvrir E-Dolphin', 'Discover E-Dolphin'))}
      ${item('configurateur', 'sliders-horizontal', t('Configurer le vôtre', 'Build yours'))}
      ${item('launch-edition', 'gem', 'Launch Edition', ' rail-sand')}
      ${item('experience', 'waves', t("L'expérience", 'Experience'))}
      ${item('yachts-flottes', 'anchor', t('Yachts et flottes', 'Yachts & fleets'))}
      ${item('reserver', 'calendar-check', t('Essai en mer', 'Sea trial'), ' rail-cta')}
      ${panelBtn('more', 'ellipsis', t('Plus', 'More'))}
    </ul>
  </nav>
  <div class="rail-foot shrink-0">
    <button type="button" data-cart-open class="rail-item relative" aria-label="${t('Ouvrir le panier', 'Open cart')}"><i data-lucide="shopping-bag" class="h-[22px] w-[22px]"></i><span>${t('Panier', 'Cart')}</span><b data-cart-count class="num absolute right-6 top-3 grid h-5 min-w-5 place-items-center rounded-full bg-lagoon px-1 font-mono text-[10px] font-medium text-abyss" hidden>0</b></button>
    <a href="${other}" hreflang="${L === 'fr' ? 'en' : 'fr'}" class="rail-item !min-h-[58px]">${L === 'fr' ? flagEn() : flagFr}<span>${L === 'fr' ? 'English' : 'Français'}</span></a>
  </div>
</aside>

<div id="railFly" class="rail-fly fixed inset-y-0 left-0 z-40 w-full max-w-[420px] overflow-y-auto lg:left-[104px]" hidden>
  <div class="flex items-center justify-between p-5 pb-2">
    <p class="eyebrow" data-fly-title></p>
    <button type="button" data-fly-close class="glass rounded-full p-2" aria-label="${t('Fermer', 'Close')}"><i data-lucide="x" class="h-4 w-4"></i></button>
  </div>
  <div data-panel="models" data-title="${t('Nos modèles', 'Our models')}" class="grid gap-2 p-3">${models}
    <a href="${href('configurateur')}" class="btn-primary mx-2 mt-3 inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold">${t('Configurer le vôtre', 'Build yours')} <i data-lucide="sliders-horizontal" class="h-4 w-4"></i></a>
  </div>
  <div data-panel="more" data-title="${t('Plus', 'More')}" class="grid gap-1 p-3" hidden>${more}
    <div class="mx-2 mt-4 flex gap-2 border-t border-white/10 pt-4 text-sm">
      <a class="glass inline-flex items-center gap-2 rounded-full px-4 py-2" href="https://www.instagram.com/_e_dolphin_/" target="_blank" rel="noopener"><i data-lucide="instagram" class="h-4 w-4"></i>Instagram</a>
      <a class="glass inline-flex items-center gap-2 rounded-full px-4 py-2" href="https://www.tiktok.com/@edolphinnextgenpwc" target="_blank" rel="noopener"><i data-lucide="music-2" class="h-4 w-4"></i>TikTok</a>
    </div>
  </div>
</div>
<div id="railShade" class="fixed inset-0 z-30 bg-abyss/60 backdrop-blur-[2px]" hidden></div>

<header id="top" class="rail-top fixed inset-x-0 top-0 z-50 gutter lg:hidden">
  <div class="flex items-center justify-between py-2.5">
    <a href="${href('index')}" class="flex items-center gap-2.5" aria-label="E-Dolphin, ${t('accueil', 'home')}">${logo(40, 30)}<span class="font-display text-xs font-semibold tracking-[.22em]">E-DOLPHIN</span></a>
    <div class="flex items-center gap-2">
      <a href="${other}" hreflang="${L === 'fr' ? 'en' : 'fr'}" class="glass inline-flex items-center gap-1.5 rounded-full px-3 py-2 font-mono text-[11px]">${L === 'fr' ? flagEn() : flagFr}${L === 'fr' ? 'EN' : 'FR'}</a>
      <button type="button" id="cartBtn" class="glass relative rounded-full p-2.5" aria-controls="cart" aria-expanded="false" aria-label="${t('Ouvrir le panier', 'Open cart')}"><i data-lucide="shopping-bag" class="h-5 w-5"></i><span id="cartCount" class="num absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-lagoon px-1 font-mono text-[10px] font-medium text-abyss" hidden>0</span></button>
    </div>
  </div>
</header>

<nav class="rail-tabs fixed inset-x-0 bottom-0 z-50 grid grid-cols-5 lg:hidden" aria-label="${t('Navigation', 'Navigation')}" style="padding-bottom:env(safe-area-inset-bottom)">
  <button type="button" class="rail-tab" data-fly="models" aria-expanded="false" aria-controls="railFly"><i data-lucide="ship" class="h-5 w-5"></i><span>${t('Modèles', 'Models')}</span></button>
  <a class="rail-tab${on('configurateur')}" href="${href('configurateur')}"><i data-lucide="sliders-horizontal" class="h-5 w-5"></i><span>${t('Configurer', 'Build')}</span></a>
  <a class="rail-tab rail-tab-cta${on('reserver')}" href="${href('reserver')}"><i data-lucide="calendar-check" class="h-5 w-5"></i><span>${t('Essai', 'Trial')}</span></a>
  <a class="rail-tab rail-sand${on('launch-edition')}" href="${href('launch-edition')}"><i data-lucide="gem" class="h-5 w-5"></i><span>Launch</span></a>
  <button type="button" id="menuBtn" class="rail-tab" data-fly="more" aria-expanded="false" aria-controls="railFly"><i data-lucide="ellipsis" class="h-5 w-5"></i><span>${t('Plus', 'More')}</span></button>
</nav>
<div id="mobileMenu" hidden></div>`;
}
