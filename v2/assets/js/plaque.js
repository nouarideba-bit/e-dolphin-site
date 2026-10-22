/* Launch Edition plate: finish switch and number preview. */
addEventListener('DOMContentLoaded', () => {
  const wrap = $('.plaque-wrap'); if (!wrap) return;
  $$('[data-finish]').forEach(b => { if (b === wrap) return; b.addEventListener('click', () => {
    wrap.dataset.finish = b.dataset.finish;
    $$('button[data-finish]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
  }); });
  const inp = $('#plInput'), num = $('#pl-num');
  inp.addEventListener('input', () => {
    const n = Math.max(1, Math.min(300, parseInt(inp.value, 10) || 1));
    num.textContent = String(n).padStart(3, '0');
  });
});
