/* "Choose your model" page: filters, E-Dolphin code, cards entering with Motion (the engine of Framer Motion). */
addEventListener('DOMContentLoaded', () => {
  const grid = $('#mdlGrid');
  if (!grid) return;
  const Mo = !reduce && window.Motion;
  const cards = $$('.mdl-card', grid);
  if (Mo) Mo.animate(cards, { opacity: [0, 1], y: [28, 0] }, { duration: .6, delay: Mo.stagger(.08, { startDelay: .1 }), ease: [.2, .7, .2, 1] });

  $$('[data-filter]').forEach(b => b.addEventListener('click', () => {
    const f = b.dataset.filter;
    $$('[data-filter]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
    const show = cards.filter(c => f === 'all' || c.dataset.kind === f);
    cards.forEach(c => { c.hidden = !show.includes(c); });
    if (Mo) Mo.animate(show, { opacity: [0, 1], scale: [.98, 1] }, { duration: .35, delay: Mo.stagger(.05) });
  }));

  // A code opens the IRUKA configurator on that configuration
  $('#mdlCode').addEventListener('submit', e => {
    e.preventDefault();
    const code = $('#mdlCodeIn').value.trim().toUpperCase();
    if (!/^ED1[-0-9A-Z ]*$/.test(code)) {
      $('#mdlCodeIn').setCustomValidity(tt('Un code commence par ED1', 'A code starts with ED1')); $('#mdlCodeIn').reportValidity(); return;
    }
    location.href = `${pageHref('iruka-configurateur')}?code=${encodeURIComponent(code)}`;
  });
  $('#mdlCodeIn').addEventListener('input', e => e.target.setCustomValidity(''));
});
