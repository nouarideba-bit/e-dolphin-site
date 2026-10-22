/* Dealer application (dossier-distributeur.html), modelled on the BRP dealer landing page:
   1. country, then state, province or region (a list where we have one, free text elsewhere);
   2. "Check opportunities" opens the territory; 3. five-step application, each step checked
   before the next. Sending is done by leadform.js once the last step is valid. */
const REGIONS = {
  FR: ['Auvergne-Rhône-Alpes', 'Bourgogne-Franche-Comté', 'Bretagne', 'Centre-Val de Loire', 'Corse', 'Grand Est', 'Hauts-de-France', 'Île-de-France', 'Normandie', 'Nouvelle-Aquitaine', 'Occitanie', 'Pays de la Loire', 'Provence-Alpes-Côte d\'Azur', 'Guadeloupe', 'Martinique', 'Guyane', 'La Réunion', 'Mayotte', 'Polynésie française', 'Nouvelle-Calédonie', 'Saint-Barthélemy', 'Saint-Martin'],
  IT: ['Abruzzo', 'Basilicata', 'Calabria', 'Campania', 'Emilia-Romagna', 'Friuli-Venezia Giulia', 'Lazio', 'Liguria', 'Lombardia', 'Marche', 'Molise', 'Piemonte', 'Puglia', 'Sardegna', 'Sicilia', 'Toscana', 'Trentino-Alto Adige', 'Umbria', 'Valle d\'Aosta', 'Veneto'],
  ES: ['Andalucía', 'Aragón', 'Asturias', 'Illes Balears', 'Canarias', 'Cantabria', 'Castilla-La Mancha', 'Castilla y León', 'Catalunya', 'Comunitat Valenciana', 'Extremadura', 'Galicia', 'La Rioja', 'Madrid', 'Murcia', 'Navarra', 'País Vasco', 'Ceuta', 'Melilla'],
  PT: ['Norte', 'Centro', 'Lisboa', 'Alentejo', 'Algarve', 'Açores', 'Madeira'],
  GR: ['Attica', 'Central Macedonia', 'Crete', 'Ionian Islands', 'North Aegean', 'South Aegean', 'Peloponnese', 'Western Greece', 'Central Greece', 'Thessaly', 'Epirus', 'Eastern Macedonia and Thrace', 'Western Macedonia'],
  HR: ['Istria', 'Primorje-Gorski Kotar', 'Lika-Senj', 'Zadar', 'Šibenik-Knin', 'Split-Dalmatia', 'Dubrovnik-Neretva', 'Zagreb'],
  US: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming', 'Puerto Rico', 'U.S. Virgin Islands'],
  CA: ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland and Labrador', 'Nova Scotia', 'Ontario', 'Prince Edward Island', 'Québec', 'Saskatchewan', 'Northwest Territories', 'Nunavut', 'Yukon'],
  AE: ['Abu Dhabi', 'Dubai', 'Sharjah', 'Ajman', 'Umm Al Quwain', 'Ras Al Khaimah', 'Fujairah'],
  AU: ['New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia', 'Tasmania', 'Australian Capital Territory', 'Northern Territory']
};
addEventListener('DOMContentLoaded', () => {
  const country = $('#opCountry'); if (!country) return;
  const region = $('#opRegion'), regionTxt = $('#opRegionTxt'), out = $('#opOut');
  let ok = false; try { ok = sessionStorage.getItem('ed-distrib') === 'ok'; } catch (e) {}
  $('#dzNotice').hidden = ok;
  $('#dzQuestions').value = ok ? tt('6 oui sur 6', '6 yes out of 6') : tt('non renseigné', 'not answered');

  // Country → region list or free text
  country.addEventListener('change', () => {
    const list = REGIONS[country.value];
    out.textContent = ''; $('#opOpen').hidden = true;
    region.hidden = !list && !!country.value; regionTxt.hidden = !region.hidden;
    region.disabled = !list;
    region.innerHTML = `<option value="">${list ? tt('Choisir', 'Choose') : tt('Choisir d\'abord un pays', 'Choose a country first')}</option>` +
      (list ? list.map(r => `<option>${r}</option>`).join('') + `<option>${tt('Plusieurs régions', 'Several regions')}</option>` : '');
  });
  let autoTerr = '';
  const regionVal = () => (region.hidden ? regionTxt.value : region.value).trim();

  $('#opCheck').addEventListener('click', () => {
    out.style.color = '#FFB4A8';
    if (!country.value) { out.textContent = tt('Choisissez votre pays.', 'Choose your country.'); country.focus(); return; }
    if (!regionVal()) { out.textContent = tt('Choisissez votre état, province ou région.', 'Choose your state, province or region.'); (region.hidden ? regionTxt : region).focus(); return; }
    const c = country.options[country.selectedIndex].text, r = regionVal();
    out.textContent = '';
    $('#opOpenTitle').textContent = tt(`Bonne nouvelle : ${r}, ${c} est ouvert aux candidatures.`, `Good news: ${r}, ${c} is open to applications.`);
    $('#opOpen').hidden = false;
    $('#dzCountry').value = c; $('#dzRegion').value = r;
    $('#dzTerritory').textContent = `${r}, ${c}`;
    // The requested territory follows the check until the applicant edits it
    const terr = $('#dzTerr');
    if (!terr.value || terr.value === autoTerr) terr.value = autoTerr = `${r}, ${c}`;
  });

  // Five-step application
  const form = $('#demande form'), steps = $$('.dz-step', form), N = steps.length;
  const NAMES = steps.map(s => s.querySelector('legend').textContent);
  let cur = 0;
  const go = (i) => {
    cur = i;
    steps.forEach((s, k) => { s.hidden = k !== i; });
    $('#dzStepLabel').textContent = tt(`Étape ${i + 1} sur ${N} · ${NAMES[i]}`, `Step ${i + 1} of ${N} · ${NAMES[i]}`);
    $('#dzBar').style.width = ((i + 1) / N * 100) + '%';
    $$('[data-dot]').forEach(d => { d.style.color = +d.dataset.dot <= i ? '#2EE6A8' : ''; });
    $('#dzPrev').hidden = i === 0; $('#dzNext').hidden = i === N - 1; $('#dzSend').hidden = i !== N - 1;
    form.querySelector('[data-out]').textContent = '';
  };
  const valid = (i) => {
    const o = form.querySelector('[data-out]'); o.style.color = '#FFB4A8';
    const bad = $$('[required]', steps[i]).find(el => !el.value.trim() || (el.type === 'email' && !/^\S+@\S+\.\S+$/.test(el.value.trim())));
    if (bad) { const l = form.querySelector(`label[for="${bad.id}"]`); o.textContent = tt('Merci de compléter : ', 'Please fill in: ') + (l ? l.textContent.replace('*', '').trim() : ''); bad.focus(); return false; }
    const att = steps[i].querySelector('[data-attest]');
    if (att && !att.checked) { o.textContent = tt('Merci d\'attester l\'exactitude des informations.', 'Please confirm the information is accurate.'); att.focus(); return false; }
    return true;
  };
  const top = () => $('#demande').scrollIntoView({ behavior: 'smooth', block: 'start' });
  $('#opStart').addEventListener('click', () => { $('#demande').hidden = false; go(0); top(); });
  $('#dzNext').addEventListener('click', () => { if (valid(cur)) { go(cur + 1); top(); } });
  $('#dzPrev').addEventListener('click', () => { go(cur - 1); top(); });
  // Enter in a field moves to the next step; the real send only happens from the last step, once valid
  document.addEventListener('submit', (e) => {
    if (e.target !== form) return;
    if (cur < N - 1 || !valid(cur)) {
      e.preventDefault(); e.stopImmediatePropagation();
      if (cur < N - 1 && valid(cur)) { go(cur + 1); top(); }
    }
  }, true);
});
