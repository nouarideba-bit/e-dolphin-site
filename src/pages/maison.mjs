import { tr, img, head, fig, ctaBand } from '../ui.mjs';

export const meta = {
  fr: { title: 'La maison · E-Dolphin', desc: 'E-Dolphin conçoit et assemble en France des jet-skis 100 % électriques de luxe. Plus de huit ans de recherche et développement.' },
  en: { title: 'The house · E-Dolphin', desc: 'E-Dolphin designs and assembles luxury 100 % electric jet-skis in France. Over eight years of research and development.' }
};

export const body = (L, R) => {
  const t = tr(L);
  const pillar = (n, title, text) => `<article class="border-t border-sand/40 pt-6"><p class="num tag text-sand">0${n}</p><h3 class="mt-3 font-display text-2xl font-semibold">${title}</h3><p class="mt-3 text-brume">${text}</p></article>`;
  return `
  <section class="gutter pb-16 pt-36 sm:pt-48">
    <div class="mx-auto max-w-5xl text-center">
      <p class="eyebrow-sand">${t('La maison', 'The house')}</p>
      <h1 class="mx-auto mt-5 max-w-4xl font-display text-4xl font-semibold leading-tight sm:text-6xl">${t('Nous voulions entendre la mer, même à 60 nœuds.', 'We wanted to hear the sea, even at 60 knots.')}</h1>
      <p class="mx-auto mt-6 max-w-2xl text-brume sm:text-lg">${t('E-Dolphin conçoit en France des jet-skis 100 % électriques pour ceux qui exigent le meilleur de la mer, sans le bruit ni l\'odeur. Plus de huit ans de recherche et développement, un prototype qui navigue, et une première série en préparation.', 'E-Dolphin designs 100 % electric jet-skis in France for those who expect the best of the sea, without the noise or the smell. Over eight years of research and development, a prototype on the water, and a first series in preparation.')}</p>
    </div>
  </section>

  <section class="gutter pb-20">
    <div class="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
      ${fig(img(R, 's300-real-bow.jpg'), t('L\'étrave du S300 en mer', 'The S300 bow at sea'), t('Photo réelle', 'Real photo'), 'aspect-[3/4]', 'md:col-span-1')}
      ${fig(img(R, 's300-real-side.jpg'), t('Le S300 de profil', 'The S300 in profile'), t('Photo réelle', 'Real photo'), 'aspect-[3/4] md:aspect-auto', 'md:col-span-2')}
    </div>
  </section>

  <section class="gutter py-16 sm:py-24">
    <div class="mx-auto grid max-w-7xl gap-12 md:grid-cols-3">
      ${pillar(1, t('Conçu et assemblé en France', 'Designed and assembled in France'), t('Le design, l\'ingénierie et l\'assemblage du pack batterie sont faits en France. Le boîtier de batterie et son système de gestion sont conçus par nos équipes.', 'Design, engineering and battery pack assembly happen in France. The battery casing and its management system are designed by our teams.'))}
      ${pillar(2, t('Éprouvé en mer', 'Proven at sea'), t('Le prototype S300 a dépassé 200 heures de navigation. IRUKA vise d\'abord le marquage CE, avec une architecture prête pour les normes nautiques américaines et de classification.', 'The S300 prototype has passed 200 hours at sea. IRUKA targets CE marking first, with an architecture ready for US marine and classification standards.'))}
      ${pillar(3, t('Le silence comme engagement', 'Silence as a commitment'), t('Nous proposons aux ports et aux collectivités des campagnes de mesure du bruit et du sillage, pour décider sur des chiffres plutôt que sur des impressions.', 'We offer ports and local authorities noise and wake measurement campaigns, so decisions rest on figures rather than impressions.'))}
    </div>
  </section>

  <section class="gutter py-16 sm:py-24">
    <div class="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
      ${fig(img(R, 'charging-station.jpg'), t('Ponton de recharge flottant', 'Floating charging pontoon'), t('Rendu · concept', 'Render · concept'), 'aspect-[4/3]')}
      <div>
        ${head({ eyebrow: t('Énergie', 'Energy'), title: t('Une batterie qui a un avenir après la mer.', 'A battery with a future after the sea.'), lead: t('Batterie traçable, étanche IP67, recharge CCS2 comme une voiture électrique. En fin de vie nautique, ses modules sont prévus pour une seconde vie en stockage d\'énergie à la marina.', 'Traceable battery, IP67 sealed, CCS2 charging like an electric car. At the end of its life at sea, its modules are planned for a second life as marina energy storage.') })}
      </div>
    </div>
  </section>
  ${ctaBand(L)}`;
};
