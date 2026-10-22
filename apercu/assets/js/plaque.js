/* Launch Edition plate: finish switch, number and engraving preview.
   The plate's inputs and the reservation form (#numero) mirror each other. */
addEventListener('DOMContentLoaded', () => {
  const wrap = $('.plaque-wrap'); if (!wrap) return;
  $$('[data-finish]').forEach(b => { if (b === wrap) return; b.addEventListener('click', () => {
    wrap.dataset.finish = b.dataset.finish;
    $$('button[data-finish]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
  }); });
  const num = $('#pl-num'), eng = $('#pl-eng');
  const showNum = (v) => { if (num) num.textContent = String(Math.max(1, Math.min(300, parseInt(v, 10) || 1))).padStart(3, '0'); };
  const showEng = (v) => { if (eng) eng.textContent = v.toUpperCase().slice(0, 22); };
  const pair = (a, b, show) => {
    if (a) a.addEventListener('input', () => { if (b) b.value = a.value; show(a.value); });
    if (b) b.addEventListener('input', () => { if (a) a.value = b.value; show(b.value); });
  };
  pair($('#plInput'), $('#lnNum1'), showNum);
  pair($('#plEng'), $('#lnEng'), showEng);
});
