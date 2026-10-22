// Shared page frame: <head>, header, footer and the mobile booking bar.
// Every page is rendered twice, French at v2/ and English at v2/en/, with the same file names.
// With rail = true (preview build, apercu/), the top header gives way to the left navigation rail.
import { rail as railNav } from './rail.mjs';

export const PAGES = [
  { slug: 'index', nav: false, fr: 'Accueil', en: 'Home' },
  { slug: 'decouvrir', nav: true, fr: 'Découvrir', en: 'Discover' },
  { slug: 'iruka', nav: true, fr: 'IRUKA', en: 'IRUKA' },
  { slug: 'experience', nav: true, fr: "L'expérience", en: 'Experience' },
  { slug: 'yachts-flottes', nav: true, fr: 'Yachts et flottes', en: 'Yachts & fleets' },
  { slug: 'launch-edition', nav: true, fr: 'Launch Edition', en: 'Launch Edition' },
  { slug: 'configurateur', nav: true, fr: 'Configurer', en: 'Build yours' },
  { slug: 'boutique', nav: true, fr: 'Boutique', en: 'Shop' },
  { slug: 'maison', nav: true, fr: 'La maison', en: 'The house' },
  { slug: 'reserver', nav: false, fr: 'Réserver', en: 'Book' },
  { slug: 'mentions-legales', nav: false, fr: 'Mentions légales', en: 'Legal notice' },
  { slug: 'confidentialite', nav: false, fr: 'Confidentialité et cookies', en: 'Privacy and cookies' },
  { slug: 'cgv', nav: false, fr: 'Conditions générales de vente', en: 'Terms of sale' }
];

// Brand mark V5 (validated 22 Oct 2026): capsule, bar attached to the left stroke, small EDOLPHIN at the bar end
export const logo = (w, h) => `<svg width="${w}" height="${h}" viewBox="0 0 40 30" aria-hidden="true"><rect x="1.75" y="1.75" width="36.5" height="26.5" rx="13.25" fill="none" stroke="#F6F8F7" stroke-width="3.5"/><path d="M2 13.3H27.6a1.7 1.7 0 0 1 0 3.4H2z" fill="#F6F8F7"/><text x="28.4" y="15.82" text-anchor="end" textLength="10.5" lengthAdjust="spacingAndGlyphs" font-family="Space Grotesk, IBM Plex Sans, sans-serif" font-size="2.3" font-weight="700" fill="#0A1E2B">EDOLPHIN</text></svg>`;

// Language flags drawn inline (emoji flags do not render on Windows)
const FLAG_FR = `<svg viewBox="0 0 3 2" width="21" height="14" aria-hidden="true" class="rounded-[2px]"><rect width="1" height="2" fill="#002395"/><rect x="1" width="1" height="2" fill="#fff"/><rect x="2" width="1" height="2" fill="#ED2939"/></svg>`;
let flagN = 0;
const flagEn = () => { const n = ++flagN; return `<svg viewBox="0 0 60 30" width="21" height="14" aria-hidden="true" class="rounded-[2px]"><clipPath id="uk-c"><path d="M0 0v30h60V0z"/></clipPath><clipPath id="uk-t"><path d="M30 15h30v15zv15H0zH0V0zV0h30z"/></clipPath><g clip-path="url(#uk-c)"><path d="M0 0v30h60V0z" fill="#012169"/><path d="M0 0l60 30m0-30L0 30" stroke="#fff" stroke-width="6"/><path d="M0 0l60 30m0-30L0 30" clip-path="url(#uk-t)" stroke="#C8102E" stroke-width="4"/><path d="M30 0v30M0 15h60" stroke="#fff" stroke-width="10"/><path d="M30 0v30M0 15h60" stroke="#C8102E" stroke-width="6"/></g></svg>`.replace(/uk-c/g, 'uk-c' + n).replace(/uk-t/g, 'uk-t' + n); };

export function page({ L, slug, title, desc, body, scripts = [], rail = false }) {
  const t = (fr, en) => (L === 'fr' ? fr : en);
  const root = L === 'fr' ? '' : '../';
  const href = (s) => (s === 'index' ? './' : `${s}.html`);
  const other = L === 'fr' ? `en/${slug === 'index' ? '' : slug + '.html'}` : `../${slug === 'index' ? '' : slug + '.html'}`;
  const navLinks = PAGES.filter(p => p.nav).map(p =>
    `<li><a class="nav-link${p.slug === slug ? ' is-on' : ''}" href="${href(p.slug)}"${p.slug === slug ? ' aria-current="page"' : ''}>${p[L]}</a></li>`).join('');
  const mobileLinks = PAGES.filter(p => p.nav).map(p =>
    `<a class="block rounded-xl px-4 py-3 text-lg hover:bg-white/5${p.slug === slug ? ' text-lagoon' : ''}" href="${href(p.slug)}">${p[L]}</a>`).join('');
  const book = t('Réserver un essai', 'Book a sea trial');

  return `<!doctype html>
<html lang="${L}" translate="no">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${title}</title>
<meta name="description" content="${desc}">
<meta name="robots" content="noindex, nofollow">
<!-- The site ships its own French and English versions: stop browsers from auto-translating them -->
<meta name="google" content="notranslate">
<meta name="theme-color" content="#06131C">
<link rel="alternate" hreflang="${L === 'fr' ? 'en' : 'fr'}" href="${other}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">
<link rel="stylesheet" href="${root}assets/site.css">
<script defer src="${root}assets/js/icons.js"></script>
<script defer src="${root}assets/js/site.js"></script>
${scripts.map(s => `<script defer src="${root}assets/js/${s}"></script>`).join('\n')}
${rail ? `<script defer src="${root}assets/js/rail.js"></script>` : ''}
</head>
<body class="page-${slug}${rail ? ' has-rail' : ''}">
<a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-foam focus:px-4 focus:py-2 focus:text-abyss">${t('Aller au contenu', 'Skip to content')}</a>
${rail ? railNav({ L, slug, href, other, flagFr: FLAG_FR, flagEn }) : `<header id="top" class="fixed inset-x-0 top-0 z-50 gutter">
  <nav class="mx-auto flex max-w-7xl items-center justify-between gap-4 py-3" aria-label="${t('Navigation principale', 'Main navigation')}">
    <a href="${href('index')}" class="flex shrink-0 items-center gap-3" aria-label="E-Dolphin, ${t('accueil', 'home')}">
      ${logo(48, 36)}
      <span class="font-display text-sm font-semibold tracking-[.22em]">E-DOLPHIN</span>
    </a>
    <ul class="hidden items-center gap-4 text-sm xl:gap-7 lg:flex">${navLinks}</ul>
    <div class="flex items-center gap-2">
      <div class="lang hidden items-center gap-1 rounded-full p-1 sm:flex" role="group" aria-label="${t('Langue', 'Language')}">
        <a href="${L === 'fr' ? '#' : other}" hreflang="fr" lang="fr" class="flag inline-flex items-center gap-1.5 rounded-full px-2 py-1 font-mono text-[11px]${L === 'fr' ? ' is-on' : ''}"${L === 'fr' ? ' aria-current="true"' : ''} aria-label="Français">${FLAG_FR}FR</a>
        <a href="${L === 'en' ? '#' : other}" hreflang="en" lang="en" class="flag inline-flex items-center gap-1.5 rounded-full px-2 py-1 font-mono text-[11px]${L === 'en' ? ' is-on' : ''}"${L === 'en' ? ' aria-current="true"' : ''} aria-label="English">${flagEn()}EN</a>
      </div>
      <button type="button" id="cartBtn" class="glass relative rounded-full p-2.5" aria-controls="cart" aria-expanded="false" aria-label="${t('Ouvrir le panier', 'Open cart')}"><i data-lucide="shopping-bag" class="h-5 w-5"></i><span id="cartCount" class="num absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-lagoon px-1 font-mono text-[10px] font-medium text-abyss" hidden>0</span></button>
      <a href="${href('reserver')}" class="btn-primary hidden rounded-full px-5 py-2.5 text-sm font-semibold sm:inline-flex">${book}</a>
      <button id="menuBtn" class="glass rounded-full p-2.5 lg:hidden" aria-expanded="false" aria-controls="mobileMenu" aria-label="${t('Ouvrir le menu', 'Open menu')}"><i data-lucide="menu" class="h-5 w-5"></i></button>
    </div>
  </nav>
  <div id="mobileMenu" class="glass mx-auto mb-3 max-w-7xl rounded-2xl p-2 lg:hidden" hidden>
    ${mobileLinks}
    <div class="mt-1 flex gap-2 border-t border-white/10 px-2 pt-3">
      <a href="${L === 'fr' ? '#' : other}" hreflang="fr" class="flag inline-flex items-center gap-2 rounded-full px-3 py-2 font-mono text-xs${L === 'fr' ? ' is-on' : ''}">${FLAG_FR}Français</a>
      <a href="${L === 'en' ? '#' : other}" hreflang="en" class="flag inline-flex items-center gap-2 rounded-full px-3 py-2 font-mono text-xs${L === 'en' ? ' is-on' : ''}">${flagEn()}English</a>
    </div>
  </div>
</header>
`}

<main id="main">
${body}
</main>

<footer class="gutter border-t border-white/10 pb-28 pt-14 sm:pb-14">
  <div class="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
    <div>
      <a href="${href('index')}" class="inline-flex items-center gap-3">${logo(40, 30)}<span class="font-display font-semibold tracking-[.22em]">E-DOLPHIN</span></a>
      <p class="mt-4 max-w-xs text-sm text-brume">${t('Jet-skis 100 % électriques de luxe, conçus et assemblés en France.', 'Luxury 100 % electric jet-skis, designed and assembled in France.')}</p>
    </div>
    <div>
      <p class="eyebrow-sand">${t('Le modèle', 'The model')}</p>
      <ul class="mt-4 grid gap-2 text-sm text-brume">
        <li><a class="hover:text-foam" href="${href('iruka')}">IRUKA</a></li>
        <li><a class="hover:text-foam" href="${href('launch-edition')}">Launch Edition</a></li>
        <li><a class="hover:text-foam" href="${href('experience')}">${t("L'expérience", 'Experience')}</a></li>
        <li><a class="hover:text-foam" href="${href('decouvrir')}">${t('Découvrir E-Dolphin', 'Discover E-Dolphin')}</a></li>
        <li><a class="hover:text-foam" href="${href('maison')}">${t('La maison', 'The house')}</a></li>
      </ul>
    </div>
    <div>
      <p class="eyebrow-sand">${t('Partenaires', 'Partners')}</p>
      <ul class="mt-4 grid gap-2 text-sm text-brume">
        <li><a class="hover:text-foam" href="${href('yachts-flottes')}">${t('Yachts et flottes', 'Yachts & fleets')}</a></li>
        <li><a class="hover:text-foam" href="${href('reserver')}">${t('Réserver un essai', 'Book a sea trial')}</a></li>
        <li><a class="hover:text-foam" href="${href('reserver')}#faq">${t('Questions fréquentes', 'FAQ')}</a></li>

      </ul>
    </div>
    <div>
      <p class="eyebrow-sand">${t('Suivre', 'Follow')}</p>
      <ul class="mt-4 grid gap-2 text-sm text-brume">
        <li><a class="inline-flex items-center gap-2 hover:text-foam" href="https://www.tiktok.com/@edolphinnextgenpwc" target="_blank" rel="noopener"><i data-lucide="music-2" class="h-4 w-4"></i>TikTok</a></li>
        <li><a class="inline-flex items-center gap-2 hover:text-foam" href="https://www.instagram.com/_e_dolphin_/" target="_blank" rel="noopener"><i data-lucide="instagram" class="h-4 w-4"></i>Instagram</a></li>
        <li><a class="inline-flex items-center gap-2 hover:text-foam" href="${other}" hreflang="${L === 'fr' ? 'en' : 'fr'}">${L === 'fr' ? flagEn() : FLAG_FR}${t('English', 'Français')}</a></li>
      </ul>
    </div>
  </div>
  <form id="newsletter" class="mx-auto mt-12 grid max-w-7xl gap-4 rounded-3xl border border-white/10 p-6 sm:p-8 md:grid-cols-[1fr_1.2fr] md:items-center" novalidate>
    <div>
      <p class="eyebrow-sand">Newsletter</p>
      <p class="mt-3 font-display text-xl font-semibold">${t('Les premiers essais, les dates de livraison, les nouveaux modèles.', 'First trials, delivery dates, new models.')}</p>
      <p class="mt-1 text-sm text-brume">${t('Quelques e-mails par an, désinscription en un clic.', 'A few e-mails a year, one-click unsubscribe.')}</p>
    </div>
    <div>
      <div class="flex flex-col gap-2 sm:flex-row">
        <label for="nlEmail" class="sr-only">E-mail</label>
        <input id="nlEmail" type="email" required autocomplete="email" placeholder="${t('votre@e-mail.com', 'your@email.com')}" class="field !mt-0 flex-1">
        <button type="submit" class="btn-primary rounded-full px-6 py-3 font-semibold">${t('S\'inscrire', 'Subscribe')}</button>
      </div>
      <label class="mt-3 flex items-start gap-2 text-xs text-brume"><input id="nlConsent" type="checkbox" class="mt-0.5 accent-[#2EE6A8]">${t('J\'accepte de recevoir la newsletter E-Dolphin. Mon e-mail ne sert qu\'à cet envoi.', 'I agree to receive the E-Dolphin newsletter. My e-mail is used for nothing else.')}</label>
      <p id="nlMsg" class="mt-2 text-sm" role="status" aria-live="polite"></p>
    </div>
  </form>
  <ul class="mx-auto mt-10 flex max-w-7xl flex-wrap gap-x-6 gap-y-2 text-xs text-brume">
    <li><a class="hover:text-foam" href="${href('mentions-legales')}">${t('Mentions légales', 'Legal notice')}</a></li>
    <li><a class="hover:text-foam" href="${href('confidentialite')}">${t('Confidentialité et cookies', 'Privacy and cookies')}</a></li>
    <li><a class="hover:text-foam" href="${href('cgv')}">${t('Conditions générales de vente', 'Terms of sale')}</a></li>
    <li>© 2026 E-Dolphin</li>
  </ul>
  <p class="mx-auto mt-6 max-w-7xl border-t border-white/10 pt-6 font-mono text-[11px] leading-relaxed text-brume/80">${t(
    'Site privé partagé avec nos partenaires. Caractéristiques IRUKA : objectifs de conception, confirmés par les essais de validation. Visuels marqués « Rendu » : images de synthèse non contractuelles.',
    'Private site shared with our partners. IRUKA specifications are design targets, to be confirmed by validation trials. Visuals marked “Render” are computer-generated and non-contractual.')}</p>
</footer>

<div id="cartShade" class="fixed inset-0 z-[55] bg-abyss/70 backdrop-blur-sm" hidden></div>
<aside id="cart" class="fixed inset-y-0 right-0 z-[60] flex w-full max-w-md flex-col border-l border-white/10 bg-deep" role="dialog" aria-modal="true" aria-labelledby="cartTitle" hidden>
  <div class="flex items-center justify-between border-b border-white/10 p-5">
    <h2 id="cartTitle" class="font-display text-xl font-semibold">${t('Votre panier', 'Your cart')}</h2>
    <button type="button" id="cartClose" class="glass rounded-full p-2" aria-label="${t('Fermer le panier', 'Close cart')}"><i data-lucide="x" class="h-4 w-4"></i></button>
  </div>
  <div id="cartItems" class="flex-1 overflow-y-auto p-5"></div>
  <div class="border-t border-white/10 p-5">
    <dl id="cartTotals" class="grid gap-1 text-sm"></dl>
    <button type="button" class="btn-primary mt-4 w-full cursor-not-allowed rounded-full py-3.5 font-semibold opacity-45" disabled aria-describedby="payNote"><i data-lucide="lock" class="mr-1 inline h-4 w-4"></i>${t('Paiement en ligne', 'Online payment')}</button>
    <p id="payNote" class="mt-2 text-center text-xs text-brume">${t('Paiement sécurisé bientôt disponible. En attendant, envoyez votre panier à notre équipe.', 'Secure payment opening soon. Meanwhile, send your cart to our team.')}</p>
    <a href="${href('boutique')}#demande" id="cartSend" class="btn-ghost mt-3 flex w-full items-center justify-center gap-2 rounded-full py-3 font-semibold">${t('Envoyer ma demande', 'Send my request')} <i data-lucide="send" class="h-4 w-4"></i></a>
  </div>
</aside>

${rail || slug === 'reserver' || slug === 'configurateur' ? '' : `<a href="${href('reserver')}" class="btn-primary fixed inset-x-4 bottom-4 z-40 flex items-center justify-center gap-2 rounded-full py-3.5 font-semibold shadow-2xl sm:hidden" style="bottom:max(16px, env(safe-area-inset-bottom))"><i data-lucide="calendar-check" class="h-4 w-4"></i>${book}</a>`}
</body>
</html>
`;
}
