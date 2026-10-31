/* Shared behaviour for every page: header, mobile menu, reveal, cart, newsletter. */
document.documentElement.classList.add('js');
// Spanish legal pages (lang="es") use the English messages
const LANG = document.documentElement.lang === 'fr' ? 'fr' : 'en';
const tt = (fr, en) => (LANG === 'fr' ? fr : en);
// Page addresses for links built by scripts: English pages have English file names (same map as EN_SLUG in src/layout.mjs)
const EN_FILES = { decouvrir: 'discover', maison: 'about', 'yachts-flottes': 'yachts', configurateur: 'configurator', boutique: 'order', location: 'rental-fleets', distributeurs: 'dealers', 'dossier-distributeur': 'dealer-application', reserver: 'book', 'mentions-legales': 'legal-notice', confidentialite: 'privacy', cgv: 'terms-of-sale', modeles: 'models', 'iruka-configurateur': 'iruka-configurator' };
const pageHref = (slug) => `${LANG === 'en' ? EN_FILES[slug] || slug : slug}.html`;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Requests go to a provisional mailbox through FormSubmit (activation done once per address).
const FORM_ENDPOINT = 'https://formsubmit.co/ajax/nicolas.flores@kedgebs.com';
async function sendForm(subject, data) {
  try {
    const r = await fetch(FORM_ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' }, body: JSON.stringify({ ...data, langue: LANG, _subject: subject, _template: 'table', _captcha: 'false' }) });
    const j = await r.json().catch(() => ({}));
    return r.ok && String(j.success) !== 'false';
  } catch (_) { return false; }
}
const icons = () => window.renderIcons && renderIcons();

addEventListener('load', () => document.body.classList.add('loaded'));
addEventListener('DOMContentLoaded', () => {
  icons();

  /* Header glass on scroll + mobile menu */
  const header = $('#top');
  const onScroll = () => header.classList.toggle('scrolled', scrollY > 24);
  addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const menuBtn = $('#menuBtn'), menu = $('#mobileMenu');
  menuBtn.addEventListener('click', () => { const open = menu.hidden; menu.hidden = !open; menuBtn.setAttribute('aria-expanded', String(open)); });

  /* Phones and tablets: the WhatsApp button waits until the home hero has mostly scrolled away,
     so the first screen keeps its buttons clear (24 Oct). Elsewhere it shows as before. */
  const wa = $('.wa-float'), heroFig = $('.home-hero > figure');
  if (wa && heroFig) {
    const small = matchMedia('(max-width: 1023.98px)');
    new IntersectionObserver(([e]) => wa.classList.toggle('is-tucked', small.matches && e.intersectionRatio > .6), { threshold: [0, .6, 1] }).observe(heroFig);
  }

  /* Reveal on scroll (content stays visible without it) */
  const io = new IntersectionObserver((es) => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: .1 });
  // Card groups taken over by the Motion cascade (fx.js marks them [data-fx]) are left out
  $$('.rise, main section > div > h2, main figure, main article').filter(el => !el.closest('[data-fx]')).forEach(el => { el.classList.add('rise'); io.observe(el); });

  /* Newsletter */
  const nl = $('#newsletter');
  nl.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = $('#nlEmail').value.trim(), msg = $('#nlMsg');
    msg.style.color = '#FFB4A8';
    if (!/^\S+@\S+\.\S+$/.test(email)) { msg.textContent = tt('Indiquez une adresse e-mail valide.', 'Please enter a valid e-mail address.'); return; }
    if (!$('#nlConsent').checked) { msg.textContent = tt('Merci de cocher la case d\'accord.', 'Please tick the consent box.'); return; }
    const ok = await sendForm('ONDARYS · Inscription newsletter', { liste: 'Newsletter', email });
    msg.style.color = ok ? '#2EE6A8' : '#FFB4A8';
    msg.textContent = ok ? tt('Merci, vous êtes inscrit.', 'Thank you, you are subscribed.') : tt('L\'envoi n\'a pas abouti. Réessayez dans quelques minutes.', 'Sending failed. Please try again in a few minutes.');
    if (ok) nl.reset();
  });

  Cart.init();
});

/* ---------- Cart ----------
   Items live in localStorage. Checkout stays disabled until the company's Stripe account is open:
   the selection is sent to the team as a request instead (shop page, #demande). */
const PRODUCTS = {
  iruka: { name: 'IRUKA', price: 43900, cur: '€ HT', img: 'iruka-side.jpg', note: { fr: 'Prix de lancement · acompte 30 %', en: 'Launch price · 30 % deposit' } },
  launch: { name: 'IRUKA Launch Edition', price: 90000, cur: '$ HT', img: 'signature-veil.jpg', note: { fr: 'Série de 300 exemplaires · acompte 30 %', en: '300-unit series · 30 % deposit' } }
};
const Cart = {
  key: 'edolphin-cart',
  get() { try { return JSON.parse(localStorage.getItem(this.key) || '[]'); } catch (_) { return []; } },
  set(items) { try { localStorage.setItem(this.key, JSON.stringify(items)); } catch (_) {} this.render(); },
  // opts: names of chosen equipment; extra: their total, added to the unit price
  add(id, livery, { opts = [], extra = 0 } = {}) {
    const items = this.get(), key = opts.join('|');
    const hit = items.find(i => i.id === id && i.livery === livery && (i.opts || []).join('|') === key);
    if (hit) hit.qty = Math.min(20, hit.qty + 1); else items.push({ id, livery, qty: 1, opts, extra });
    this.set(items); this.open();
  },
  unit(i) { return PRODUCTS[i.id].price + (i.extra || 0); },
  money(n, cur) {
    const num = n.toLocaleString(LANG === 'fr' ? 'fr-FR' : 'en-US', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });
    if (LANG === 'fr') return num + ' ' + cur;
    const [sym, ...rest] = cur.split(' ');
    return sym + num + (rest.join(' ') === 'HT' ? ' excl. VAT' : rest.length ? ' ' + rest.join(' ') : '');
  },
  curLabel(cur) { return LANG === 'fr' ? cur : cur.replace(/^(\S+) HT$/, '$1 excl. VAT'); },
  totals(items) {
    const by = {};
    items.forEach(i => { const p = PRODUCTS[i.id]; if (p) by[p.cur] = (by[p.cur] || 0) + this.unit(i) * i.qty; });
    return by;
  },
  summary() {
    return this.get().map(i => `${i.qty} × ${PRODUCTS[i.id].name}${i.livery ? ' (' + i.livery + ')' : ''}${i.opts && i.opts.length ? ' + ' + i.opts.join(', ') : ''} = ${this.money(this.unit(i) * i.qty, PRODUCTS[i.id].cur)}`).join(' ; ');
  },
  render() {
    const items = this.get(), n = items.reduce((a, i) => a + i.qty, 0), c = $('#cartCount');
    c.textContent = n; c.hidden = !n;
    const root = document.documentElement.lang === 'fr' ? '' : '../';
    $('#cartItems').innerHTML = items.length ? items.map((i, k) => {
      const p = PRODUCTS[i.id];
      return `<div class="flex gap-4 border-b border-white/10 py-4">
        <img src="${root}assets/img/${p.img}" alt="" class="h-20 w-24 rounded-xl object-cover">
        <div class="min-w-0 flex-1">
          <p class="font-display font-semibold">${p.name}</p>
          <p class="text-xs text-brume">${i.livery ? i.livery + ' · ' : ''}${p.note[LANG]}</p>
          ${i.opts && i.opts.length ? `<p class="mt-1 text-xs text-brume">+ ${i.opts.join(', ')}</p>` : ''}
          <p class="num mt-1 text-sm">${this.money(this.unit(i), p.cur)}</p>
          <div class="mt-2 flex items-center gap-2">
            <button type="button" class="glass rounded-full px-2.5 py-0.5" data-q="${k}" data-d="-1" aria-label="${tt('Retirer une unité', 'Remove one')}">−</button>
            <span class="num w-6 text-center text-sm">${i.qty}</span>
            <button type="button" class="glass rounded-full px-2.5 py-0.5" data-q="${k}" data-d="1" aria-label="${tt('Ajouter une unité', 'Add one')}">+</button>
            <button type="button" class="ml-auto text-xs text-brume underline" data-rm="${k}">${tt('Retirer', 'Remove')}</button>
          </div>
        </div>
      </div>`;
    }).join('') : `<p class="text-brume">${tt('Votre sélection est vide.', 'Your selection is empty.')}</p>`;
    const tot = this.totals(items);
    $('#cartTotals').innerHTML = Object.keys(tot).length ? Object.entries(tot).map(([cur, v]) => `<div class="flex justify-between"><dt class="text-brume">${tt('Total', 'Total')} ${this.curLabel(cur)}</dt><dd class="num font-semibold">${this.money(v, cur)}</dd></div><div class="flex justify-between text-sm"><dt class="text-brume">${tt('Acompte 30 %', '30 % deposit')}</dt><dd class="num text-lagoon">${this.money(Math.round(v * 30) / 100, cur)}</dd></div>`).join('') : '';
    $('#cartSend').hidden = !items.length;
    $$('[data-q]').forEach(b => b.onclick = () => { const it = this.get(), i = it[+b.dataset.q]; i.qty = Math.max(1, Math.min(20, i.qty + +b.dataset.d)); this.set(it); });
    $$('[data-rm]').forEach(b => b.onclick = () => { const it = this.get(); it.splice(+b.dataset.rm, 1); this.set(it); });
    document.dispatchEvent(new CustomEvent('cart:change'));
  },
  open() { $('#cart').hidden = false; $('#cartShade').hidden = false; $('#cartBtn').setAttribute('aria-expanded', 'true'); $('#cartClose').focus(); },
  close() { $('#cart').hidden = true; $('#cartShade').hidden = true; $('#cartBtn').setAttribute('aria-expanded', 'false'); },
  init() {
    $('#cartBtn').addEventListener('click', () => this.open());
    $('#cartClose').addEventListener('click', () => this.close());
    $('#cartShade').addEventListener('click', () => this.close());
    $('#cartSend').addEventListener('click', () => this.close());
    addEventListener('keydown', e => { if (e.key === 'Escape') this.close(); });
    // Any button with data-add="iruka|launch" adds that product; an optional data-livery-from points at a <select>
    $$('[data-add]').forEach(b => b.addEventListener('click', () => {
      const sel = b.dataset.liveryFrom ? $(b.dataset.liveryFrom) : null;
      this.add(b.dataset.add, sel ? sel.value : '');
    }));
    this.render();
  }
};
