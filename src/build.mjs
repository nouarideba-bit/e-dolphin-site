// Renders every page in French (v2/) and English (v2/en/). Run with: npm run build
import { mkdirSync, writeFileSync, readFileSync, existsSync, cpSync } from 'node:fs';
import { page, logo, BASE, EN_SLUG, fileName, pageUrl, inSearch } from './layout.mjs';
import * as index from './pages/index-next.mjs';
import * as iruka from './pages/iruka.mjs';
import * as experience from './pages/experience.mjs';
import * as yachts from './pages/yachts-flottes.mjs';
import * as launch from './pages/launch-edition.mjs';
import * as boutique from './pages/boutique.mjs';
import * as configurateur from './pages/configurateur.mjs';
import * as maison from './pages/maison.mjs';
import * as decouvrir from './pages/decouvrir.mjs';
import * as reserver from './pages/reserver.mjs';
import * as location from './pages/location.mjs';
import * as distributeurs from './pages/distributeurs.mjs';
import * as dossier from './pages/dossier-distributeur.mjs';

// English pages: "43 900 € HT" becomes "€43,900 excl. VAT"
const enPrices = (html) => html.replace(/(\d{1,3}(?:[ \u00a0\u202f]\d{3})*(?:,\d+)?)\s?(€|\$)(\s?HT)?(?![\w])/g,
  (_, n, sym, ht) => `${sym}${n.replace(/[ \u00a0\u202f]/g, ',').replace(/,(\d{1,2})$/, '.$1')}${ht ? ' excl. VAT' : ''}`);
import { mentions, privacy, terms } from './pages/legal.mjs';

// The live site uses the left navigation rail and the new home page (adam, 22 Oct: "bascule").
// RAIL=1 (npm run build:apercu) writes the same site into apercu/, kept as a preview area for the next changes.
const RAIL = !!process.env.RAIL;
const OUT = RAIL ? 'apercu' : 'v2';
if (RAIL) cpSync('v2/assets', `${OUT}/assets`, { recursive: true });

// Lucide icons are inlined at build time (no icon CDN at runtime)
const ICON_DIR = 'node_modules/lucide-static/icons';
const svgInner = (name) => {
  const f = `${ICON_DIR}/${name}.svg`;
  if (!existsSync(f)) throw new Error('unknown icon ' + name);
  return readFileSync(f, 'utf8').replace(/<!--.*?-->/s, '').replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').replace(/\s+/g, ' ').trim();
};
const inlineIcons = (html) => html.replace(/<i data-lucide="([a-z0-9-]+)"(?: class="([^"]*)")?><\/i>/g, (_, name, cls = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide ${cls}" aria-hidden="true">${svgInner(name)}</svg>`);
const SOURCES = {
  index, iruka, experience, 'yachts-flottes': yachts, 'launch-edition': launch,
  configurateur, boutique, maison, decouvrir, reserver, location, distributeurs, 'dossier-distributeur': dossier, 'mentions-legales': mentions, confidentialite: privacy, cgv: terms
};

// English pages link to the English file names; '../x.html' links (the French version) keep theirs
const enLinks = (html) => html.replace(/href="([a-z-]+)\.html/g, (m, s) => (EN_SLUG[s] ? `href="${EN_SLUG[s]}.html` : m));
// English typography, as English speakers write and search it: "100%", "jet ski"
const enTypo = (html) => html.replace(/(\d)[   ]%/g, '$1%').replace(/\bjet-ski/g, 'jet ski');
const en = (html) => enTypo(enLinks(enPrices(html)));

// Width and height on every photo, read from the file itself, so the page does not jump while images load (CLS)
const dims = new Map();
const imgSize = (f) => {
  if (dims.has(f)) return dims.get(f);
  let d = null;
  try {
    const b = readFileSync(f);
    if (b[0] === 0x89 && b[1] === 0x50) d = [b.readUInt32BE(16), b.readUInt32BE(20)];
    else if (b[0] === 0xff && b[1] === 0xd8) {
      for (let i = 2; i < b.length - 9;) {
        if (b[i] !== 0xff || b[i + 1] === 0xff) { i++; continue; }
        const m = b[i + 1];
        if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) { d = [b.readUInt16BE(i + 7), b.readUInt16BE(i + 5)]; break; }
        i += 2 + b.readUInt16BE(i + 2);
      }
    } else if (b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP') {
      const k = b.toString('ascii', 12, 16);
      if (k === 'VP8X') d = [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)];
      else if (k === 'VP8 ') d = [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
      else if (k === 'VP8L') { const n = b.readUInt32LE(21); d = [1 + (n & 0x3fff), 1 + ((n >> 14) & 0x3fff)]; }
    }
  } catch { /* unreadable file: the tag is left as it is */ }
  dims.set(f, d);
  return d;
};
const withDims = (html) => html.replace(/<img\b(?![^>]*\bwidth=)([^>]*?)\bsrc="((?:\.\.\/)?assets\/img\/[^"]+)"([^>]*)>/g, (m, a, src, rest) => {
  const d = imgSize(`${OUT}/${src.replace(/^\.\.\//, '')}`);
  return d ? `<img${a}src="${src}" width="${d[0]}" height="${d[1]}"${rest}>` : m;
});

// Photos are served as WebP when a lighter WebP copy sits next to the JPEG (about 37 % lighter, 24 Oct 2026; every browser
// since 2020). Images a script swaps or reads (they carry an id) keep their JPEG, so the scripts work unchanged.
const webpOf = (u) => {
  const w = u.replace(/\.jpe?g$/i, '.webp');
  return w !== u && /^(?:\.\.\/)?assets\/img\//.test(u) && existsSync(`${OUT}/${w.replace(/^\.\.\//, '')}`) ? w : null;
};
const withWebp = (html) => html.replace(/<img\b[^>]*>/g, (tag) => /\sid="/.test(tag) ? tag : tag
  .replace(/(\s(?:src|data-src)=")([^"]+)"/g, (m, a, u) => { const w = webpOf(u); return w ? `${a}${w}"` : m; })
  .replace(/\ssrcset="([^"]+)"/g, (m, set) => ` srcset="${set.split(',').map(part => { const [u, ...d] = part.trim().split(/\s+/); return [webpOf(u) || u, ...d].join(' '); }).join(', ')}"`));

for (const L of ['fr', 'en']) {
  const dir = L === 'fr' ? OUT : `${OUT}/en`, R = L === 'fr' ? '' : '../';
  mkdirSync(dir, { recursive: true });
  for (const [slug, mod] of Object.entries(SOURCES)) {
    const html = page({ L, slug, title: mod.meta[L].title, desc: mod.meta[L].desc, body: mod.body(L, R), scripts: mod.scripts || [], rail: true, head: mod.preload ? mod.preload(R) + '\n' : '' });
    writeFileSync(`${dir}/${fileName(L, slug)}`, withWebp(withDims(inlineIcons(L === 'en' ? en(html) : html))));
  }
}

// Old English addresses (French file names until 23 Oct 2026) forward to the new ones, so links already shared keep working
for (const [fr, enName] of Object.entries(EN_SLUG)) writeFileSync(`${OUT}/en/${fr}.html`, `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>E-Dolphin</title><meta name="robots" content="noindex">
<link rel="canonical" href="${pageUrl('en', fr)}">
<script>location.replace('${enName}.html' + location.search + location.hash);</script>
<meta http-equiv="refresh" content="0; url=${enName}.html">
</head><body><a href="${enName}.html">E-Dolphin</a></body></html>
`);

// Sitemap: every page that may appear in search results, with its French and English versions
const alt = (slug) => ['fr', 'en'].map(L => `<xhtml:link rel="alternate" hreflang="${L}" href="${pageUrl(L, slug)}"/>`).join('') + `<xhtml:link rel="alternate" hreflang="x-default" href="${pageUrl('fr', slug)}"/>`;
const listed = Object.keys(SOURCES).filter(inSearch);
writeFileSync(`${OUT}/sitemap.xml`, `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${listed.flatMap(slug => ['fr', 'en'].map(L => `<url><loc>${pageUrl(L, slug)}</loc>${alt(slug)}</url>`)).join('\n')}
</urlset>
`);
// Crawling stays open: until the public opening, each page's own noindex keeps it out of results (a blocked page could still show up, address only)
writeFileSync(`${OUT}/robots.txt`, `User-agent: *
Allow: /

Sitemap: ${BASE}sitemap.xml
`);

// Page shown by GitHub Pages for any unknown address, at any depth: links resolve from the site address (<base>)
if (!RAIL) writeFileSync(`${OUT}/404.html`, `<!doctype html>
<html lang="fr" translate="no">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Page introuvable · E-Dolphin</title>
<meta name="robots" content="noindex">
<base href="${BASE}">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="assets/site.css">
</head>
<body>
<main class="gutter grid min-h-screen place-items-center">
  <div class="max-w-xl py-20 text-center">
    <a href="./" class="inline-flex" aria-label="E-Dolphin, accueil">${logo(64, 48)}</a>
    <p class="eyebrow mt-8">Erreur 404</p>
    <h1 class="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">Cette page n'existe pas, ou plus.</h1>
    <p class="mt-4 text-brume">Le lien est peut-être ancien. Repartez de l'accueil ou découvrez IRUKA, le jet-ski 100 % électrique.</p>
    <div class="mt-8 flex flex-wrap justify-center gap-3">
      <a class="btn-primary rounded-full px-6 py-3.5 font-semibold" href="./">Accueil</a>
      <a class="btn-ghost rounded-full px-6 py-3.5 font-semibold" href="iruka.html">IRUKA</a>
    </div>
    <p lang="en" class="mt-12 border-t border-white/10 pt-8 text-sm text-brume">This page does not exist, or no longer does. <a class="text-lagoon underline underline-offset-4" href="en/">English home page</a></p>
  </div>
</main>
</body>
</html>
`);
// Icons created by scripts at runtime (detail tabs, cart, menu) come from a small generated map
const dyn = new Set();
for (const f of ['site.js', 'iruka.js', 'booking.js', 'shop.js', 'config.js', 'rail.js', 'home.js', 'herofilm.js', 'yachtfit.js']) for (const m of readFileSync(`${OUT}/assets/js/${f}`, 'utf8').matchAll(/(?:data-lucide="|icon: ')([a-z0-9-]+)/g)) dyn.add(m[1]);
const map = Object.fromEntries([...dyn].map(n => [n, svgInner(n)]));
writeFileSync(`${OUT}/assets/js/icons.js`, `/* Generated by src/build.mjs: Lucide icons used by scripts (ISC licence). */
window.ICONS = ${JSON.stringify(map)};
window.renderIcons = (root = document) => root.querySelectorAll('i[data-lucide]').forEach(i => {
  const body = window.ICONS[i.dataset.lucide]; if (!body) return;
  i.outerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide ' + (i.getAttribute('class') || '') + '" aria-hidden="true">' + body + '</svg>';
});
`);
console.log('built', Object.keys(SOURCES).length * 2, 'pages');
