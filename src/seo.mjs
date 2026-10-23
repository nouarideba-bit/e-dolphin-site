// Structured data (schema.org JSON-LD) for search engines, added to the <head> of the pages it describes.
// Products carry no price offer yet: a marked-up price commits the seller, so offers wait until the new company can take orders.

const ld = (data) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>\n`;

export function structuredData({ L, slug, desc, base, url }) {
  const t = (fr, en) => (L === 'fr' ? fr : en);
  const org = { '@id': `${base}#organization` };
  if (slug === 'index') return ld({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization', '@id': `${base}#organization`, name: 'E-Dolphin', url: base,
        logo: `${base}logo-e-dolphin.png`,
        description: t('Jet-skis 100 % électriques de luxe, conçus et assemblés en France.', 'Luxury 100% electric jet skis, designed and assembled in France.'),
        sameAs: ['https://www.instagram.com/_e_dolphin_/', 'https://www.tiktok.com/@edolphinnextgenpwc']
      },
      { '@type': 'WebSite', '@id': `${base}#website`, name: 'E-Dolphin', url: base, inLanguage: ['fr', 'en'], publisher: org }
    ]
  });
  if (slug === 'iruka' || slug === 'launch-edition') return ld({
    '@context': 'https://schema.org', '@type': 'Product',
    name: slug === 'iruka' ? 'IRUKA' : 'IRUKA Launch Edition',
    url: url(L, slug), description: desc,
    image: `${base}assets/img/${slug === 'iruka' ? 'iruka-side.jpg' : 'cfg-predator-profil.jpg'}`,
    brand: { '@type': 'Brand', name: 'E-Dolphin' }, manufacturer: org,
    category: t('Jet-ski électrique', 'Electric jet ski')
  });
  if (slug === 'decouvrir') return ld({
    '@context': 'https://schema.org', '@type': 'VideoObject',
    name: t('Le film E-Dolphin', 'The E-Dolphin film'), description: desc,
    thumbnailUrl: `${base}assets/img/film-6.jpg`, uploadDate: '2026-10-22T12:53:59+00:00', duration: 'PT1M28S',
    contentUrl: `${base}assets/video/edolphin-film-v4.mp4`, inLanguage: L, publisher: org
  });
  return '';
}
