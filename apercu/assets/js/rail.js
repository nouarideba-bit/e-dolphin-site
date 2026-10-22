/* Left navigation rail (next version): side panel for models and "More", cart button mirror. */
addEventListener('DOMContentLoaded', () => {
  const fly = document.getElementById('railFly'), shade = document.getElementById('railShade');
  if (!fly) return;
  const btns = [...document.querySelectorAll('[data-fly]')];
  let current = null;
  const close = () => {
    fly.hidden = shade.hidden = true; current = null;
    btns.forEach(b => { b.setAttribute('aria-expanded', 'false'); b.classList.remove('is-open'); });
  };
  const open = (name, btn) => {
    if (current === name) return close();
    current = name; fly.hidden = shade.hidden = false;
    fly.querySelectorAll('[data-panel]').forEach(p => {
      p.hidden = p.dataset.panel !== name;
      if (!p.hidden) fly.querySelector('[data-fly-title]').textContent = p.dataset.title;
    });
    btns.forEach(b => { const on = b.dataset.fly === name; b.setAttribute('aria-expanded', String(on)); b.classList.toggle('is-open', on); });
    (fly.querySelector(`[data-panel="${name}"] a`) || fly).focus({ preventScroll: true });
  };
  btns.forEach(b => b.addEventListener('click', (e) => { e.stopPropagation(); open(b.dataset.fly, b); }));
  fly.querySelector('[data-fly-close]').addEventListener('click', close);
  shade.addEventListener('click', close);
  addEventListener('keydown', (e) => { if (e.key === 'Escape' && current) close(); });

  // The cart button lives in the mobile header; the rail has its own button and badge
  const cartBtn = document.getElementById('cartBtn'), count = document.getElementById('cartCount');
  document.querySelectorAll('[data-cart-open]').forEach(b => b.addEventListener('click', () => { close(); cartBtn.click(); }));
  const sync = () => document.querySelectorAll('[data-cart-count]').forEach(n => { n.textContent = count.textContent; n.hidden = count.hidden; });
  new MutationObserver(sync).observe(count, { attributes: true, childList: true, characterData: true, subtree: true });
  sync();
});
