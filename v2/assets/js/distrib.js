/* "Become a dealer" page: six yes/no questions. Six yes open the dealer application
   (dossier-distributeur.html); a single no shows a thank-you and the WhatsApp link. */
addEventListener('DOMContentLoaded', () => {
  const box = $('#questions'); if (!box) return;
  const n = $$('[role=radiogroup]', box).length, ans = {};
  const show = () => {
    const done = Object.keys(ans).length, yes = Object.values(ans).filter(Boolean).length;
    $('#qYes').hidden = !(done === n && yes === n);
    $('#qNo').hidden = !(done === n && yes < n);
    $('#qResult').hidden = done === n;
    $('#qResult p').textContent = tt(`${done} réponse${done > 1 ? 's' : ''} sur ${n}.`, `${done} of ${n} answered.`);
    if (done === n && yes === n) try { sessionStorage.setItem('ed-distrib', 'ok'); } catch (e) {}
  };
  // data-qi / data-qa, not data-q: the cart drawer already binds every [data-q] button
  $$('[data-qi]', box).forEach(b => b.addEventListener('click', () => {
    $$(`[data-qi="${b.dataset.qi}"]`, box).forEach(o => o.setAttribute('aria-checked', String(o === b)));
    ans[b.dataset.qi] = b.dataset.qa === '1';
    show();
  }));
});
