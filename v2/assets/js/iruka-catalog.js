/* IRUKA configurator catalogue, prices in € excl. VAT (proposal of 27 Oct 2026, to be validated by adam).
   adam, 27 Oct: "Index les prix de chaque modification sur la base des options etc et je te laisse me proposer des choses adaptées".
   Accessories keep the reference grid of cfg-options.js; liveries, finishes, upholstery, charging, packs, Atelier and services
   are proposals, indexed on that grid and on the 43 900 € base price. price: null = on quotation, left out of the total.
   n is the item's bit in the E-Dolphin code (ED1-…): never reuse or renumber one, give a new item the next free number.
   The accessories of cfg-options.js take bits 100 and up, in their list order (that list only grows at the end).
   Every livery is painted on the same craft, the white IRUKA (adam, 27 Oct: "que ce reste le même mais que la couleur change"):
   p is the colour of its white panels, a of its lime stripes (none: the render as it is). t is the colour of an upholstery or
   deck, planks adds teak strakes; satin flattens the paint's reflections; glow is the colour of the underwater lights.
   iruka-masks.js says where each of them sits on the renders.
   The Launch Edition is the same craft and catalogue (?modele=launch, code item 41): 90 000 $ HT, its three liveries included,
   Predator by default, the numbered owner's plate included, the other options at their euro price converted at the brochure
   rate (1 € = 1,16 $, as the former configurator showed them) and rounded to 10 $. */
window.IRUKA_CFG = {
  base: 43900,
  deposit: 30,
  editions: {
    launch: { n: 41, fr: 'IRUKA Launch Edition', en: 'IRUKA Launch Edition', short: 'Launch Edition', base: 90000, cur: '$ HT', rate: 1.16,
      liveries: ['predator', 'blanc', 'gris'], std: { livery: 'predator' },
      included: { plaque: { fr: 'Plaque numérotée de 001 à 300, à votre nom', en: 'Plate numbered 001 to 300, with your name' } },
      perks: { fr: 'Série numérotée de 001 à 300 · votre numéro et votre nom gravés · certificat numérique', en: 'Numbered series from 001 to 300 · your number and name engraved · digital certificate' } }
  },
  // Design targets shown in the summary, as on the IRUKA page
  specs: [
    ['Puissance', 'Power', '160 kW'], ['Vitesse de pointe', 'Top speed', { fr: '60 nœuds', en: '60 knots' }],
    ['Batterie', 'Battery', '35 kWh'], ['Recharge rapide DC', 'DC fast charging', '70 kW · CCS2'],
    ['Masse', 'Weight', '400 kg'], ['Coque', 'Hull', { fr: 'Carbone', en: 'Carbon' }]
  ],
  groups: [
    { id: 'ext', icon: 'palette', fr: 'Extérieur', en: 'Exterior', sections: [
      { id: 'livery', fr: 'Livrée', en: 'Livery', pick: 'one', items: [
        { n: 1, id: 'blanc', fr: 'Blanc · noir · lime', en: 'White · black · lime', price: 0, tier: 'serie', c: ['#F2F4F3', '#9BE15D'] },
        { n: 2, id: 'gris', fr: 'Gris · rouge', en: 'Grey · red', price: 0, tier: 'serie', c: ['#6B7075', '#D0202A'], p: '#7A8086', a: '#D0202A' },
        { n: 3, id: 'magma', fr: 'Magma', en: 'Magma', price: 1290, tier: 'speciale', c: ['#1A1A1A', '#FF5A1F'], p: '#1C1D1F', a: '#FF5A1F' },
        { n: 4, id: 'wasp', fr: 'Wasp', en: 'Wasp', price: 1290, tier: 'speciale', c: ['#F5C400', '#121416'], p: '#F5C400', a: '#121416' },
        { n: 5, id: 'predator', fr: 'Predator', en: 'Predator', price: 1990, tier: 'signature', c: ['#121416', '#7CFF3A'], p: '#141618', a: '#7CFF3A', d: { fr: 'La livrée de la Launch Edition', en: 'The Launch Edition livery' } }
      ] },
      { id: 'finish', fr: 'Finition de la peinture', en: 'Paint finish', pick: 'one', items: [
        { n: 6, id: 'brillant', fr: 'Vernis brillant', en: 'Gloss clear coat', price: 0, c: ['#E9EEF1', '#FFFFFF'], d: { fr: 'Profondeur et reflets, entretien facile', en: 'Depth and shine, easy care' } },
        { n: 7, id: 'satin', fr: 'Vernis satiné mat', en: 'Satin matte clear coat', price: 890, c: ['#9AA3A8', '#7D868B'], satin: true, d: { fr: 'Toucher soyeux, traitement anti-UV', en: 'Silky touch, UV treatment' } }
      ] },
      { id: 'carbon', fr: 'Carbone', en: 'Carbon', items: [
        { n: 8, id: 'carbone', icon: 'layers', fr: 'Pack carbone apparent', en: 'Exposed carbon pack', price: 2490, d: { fr: 'Capot avant, console et poignée arrière en carbone verni', en: 'Front hood, console and rear grab handle in clear-coated carbon' } }
      ] },
      { id: 'light', fr: 'Éclairage', en: 'Lighting', items: [
        { n: 9, id: 'ledsub', icon: 'lightbulb', fr: 'Éclairage sous-marin LED', en: 'Underwater LED lighting', price: 890, glow: '#38D6FF', d: { fr: 'Deux projecteurs sous la coque, couleur réglable', en: 'Two lights under the hull, adjustable colour' } },
        { n: 10, id: 'signature', icon: 'sparkles', fr: 'Signature lumineuse personnalisée', en: 'Custom light signature', price: 290, d: { fr: 'Feux de jour assortis à la livrée', en: 'Daytime lights matched to the livery' } }
      ] }
    ] },
    { id: 'cockpit', icon: 'armchair', fr: 'Selle et pilotage', en: 'Seat and helm', sections: [
      { id: 'seat', fr: 'Sellerie', en: 'Upholstery', pick: 'one', items: [
        { n: 11, id: 'selle-noir', fr: 'Noir carbone, surpiqûres grises', en: 'Carbon black, grey stitching', price: 0, c: ['#16181A', '#8A9299'] },
        { n: 12, id: 'selle-ardoise', fr: 'Gris ardoise, surpiqûres lime', en: 'Slate grey, lime stitching', price: 390, c: ['#4B535A', '#9BE15D'], t: '#4B535A' },
        { n: 13, id: 'selle-sable', fr: 'Sable, surpiqûres or', en: 'Sand, gold stitching', price: 1190, c: ['#D8C6A3', '#9C7A45'], t: '#D3C09A' },
        { n: 14, id: 'selle-cognac', fr: 'Cognac, surpiqûres sellier', en: 'Cognac, saddle stitching', price: 1690, c: ['#8A4B26', '#F0E2C8'], t: '#7A4122' }
      ] },
      { id: 'seatopt', fr: 'Selle', en: 'Seat', items: [
        { n: 15, id: 'selle-logo', icon: 'badge-check', fr: 'Logo E-Dolphin brodé sur la selle', en: 'E-Dolphin logo embroidered on the seat', price: 290 }
      ] },
      { id: 'deck', fr: 'Tapis de pont', en: 'Deck pads', pick: 'one', items: [
        { n: 16, id: 'pont-noir', fr: 'Noir', en: 'Black', price: 0, c: ['#1C1F22', '#2A2E32'] },
        { n: 17, id: 'pont-perle', fr: 'Gris perle, liseré couleur livrée', en: 'Pearl grey, livery-colour piping', price: 690, c: ['#C9CED2', '#9BE15D'], t: '#B9BEC2' },
        { n: 18, id: 'pont-teck', fr: 'Effet teck, mousse marine gravée', en: 'Teak look, engraved marine foam', price: 1290, c: ['#A0703F', '#E8DCC6'], t: '#8E6238', planks: true }
      ] },
      { id: 'helm', fr: 'Poste de pilotage', en: 'Helm', items: [
        { n: 19, id: 'guidon-cuir', icon: 'hand', fr: 'Poignées en cuir marin surpiqué', en: 'Stitched marine leather grips', price: 240 },
        { n: 20, id: 'console-alu', icon: 'gauge', fr: 'Inserts en aluminium brossé sur la console', en: 'Brushed aluminium console inserts', price: 590 }
      ] }
    ] },
    { id: 'energy', icon: 'battery-charging', fr: 'Recharge', en: 'Charging', sections: [
      { id: 'charge', fr: 'Recharge', en: 'Charging', items: [
        { n: 21, id: 'cable-t2', icon: 'plug-zap', fr: 'Câble de recharge Type 2, 7 m', en: 'Type 2 charging cable, 7 m', price: 390 },
        { n: 22, id: 'chargeur-mobile', icon: 'battery-charging', fr: 'Chargeur mobile 11 kW', en: '11 kW mobile charger', price: 1290, d: { fr: 'Prises domestique et industrielle, sac de rangement', en: 'Household and industrial plugs, storage bag' } },
        { n: 23, id: 'wallbox', icon: 'zap', fr: 'Borne murale 22 kW connectée', en: '22 kW connected wallbox', price: 1690, d: { fr: 'Installation non comprise', en: 'Installation not included' } },
        { n: 24, id: 'kit-ponton', icon: 'anchor', fr: 'Kit de recharge ponton et quai', en: 'Pontoon and quay charging kit', price: 590, d: { fr: 'Prise marine IP67, câble renforcé', en: 'IP67 marine socket, reinforced cable' } },
        { n: 25, id: 'ponton', icon: 'waves', fr: 'Ponton de recharge flottant', en: 'Floating charging pontoon', price: null, d: { fr: 'Étude et prix sur devis, pour yacht, hôtel ou club', en: 'Survey and price on quotation, for yachts, hotels or clubs' } }
      ] }
    ] },
    { id: 'tech', icon: 'cpu', fr: 'Technologie', en: 'Technology', sections: [
      { id: 'connect', fr: 'Connectivité', en: 'Connectivity', items: [
        { n: 26, id: 'connect', icon: 'scan-line', fr: 'Pack Connect 3 ans', en: '3-year Connect pack', price: 590, d: { fr: 'Géolocalisation antivol, charge à distance, alertes', en: 'Anti-theft tracking, remote charge status, alerts' } },
        { n: 27, id: 'cle-app', icon: 'key-round', fr: 'Clé d\'apprentissage', en: 'Learning key', price: 190, d: { fr: 'Puissance et vitesse limitées pour débuter', en: 'Limited power and speed for beginners' } }
      ] }
    ], accessories: ['Électronique et navigation', 'Audio'] },
    { id: 'packs', icon: 'package', fr: 'Packs', en: 'Packs', sections: [
      { id: 'packs', fr: 'Packs', en: 'Packs', items: [
        { n: 28, id: 'pack-confort', icon: 'armchair', fr: 'Pack Confort', en: 'Comfort pack', price: 990, pack: ['appuip', 'deflect', 'chauff', 'parebrise'] },
        { n: 29, id: 'pack-glisse', icon: 'waves', fr: 'Pack Glisse', en: 'Watersports pack', price: 920, pack: ['skimod', 'mat', 'wake', 'tube'] },
        { n: 30, id: 'pack-mouillage', icon: 'anchor', fr: 'Pack Mouillage', en: 'Mooring pack', price: 430, pack: ['ancrep', 'defenses', 'defkit', 'cordes', 'attache'] },
        { n: 31, id: 'pack-yacht', icon: 'ship', fr: 'Pack Yacht', en: 'Yacht pack', price: 1990, pack: ['levage', 'speedtie', 'bacheall', 'film'] },
        { n: 32, id: 'pack-croisiere', icon: 'map', fr: 'Pack Croisière', en: 'Cruising pack', price: 2990, pack: ['gps', 'hp80', 'sacs3', 'g20s', 'gobelet'] }
      ] }
    ] },
    { id: 'equip', icon: 'box', fr: 'Équipements', en: 'Equipment', sections: [],
      accessories: ['Confort', 'Sports nautiques', 'Amarrage', 'Rangement et sacs', 'Glacières', 'Bâches et protection', 'Sièges', 'Sécurité et utilitaires'],
      // New accessory, slotted into its category
      extra: [{ n: 33, id: 'levage', cat: 'Amarrage', fr: 'Kit de levage pour grue de yacht', en: 'Yacht crane lifting kit', price: 1490, d: { fr: 'Points de levage renforcés et élingue', en: 'Reinforced lifting points and sling' } }] },
    { id: 'atelier', icon: 'gem', fr: 'Atelier', en: 'Atelier', sections: [
      { id: 'atelier', fr: 'Atelier E-Dolphin', en: 'E-Dolphin Atelier', items: [
        { n: 34, id: 'mesure', icon: 'paintbrush', fr: 'Teinte de coque sur mesure', en: 'Bespoke hull colour', price: 4900, d: { fr: 'Votre couleur, échantillon validé avec l\'atelier ; remplace la livrée', en: 'Your colour, sample approved with the atelier; replaces the livery' } },
        { n: 35, id: 'gravure', icon: 'hash', fr: 'Nom du bateau gravé sur la console', en: 'Boat name engraved on the console', price: 490 },
        { n: 36, id: 'initiales', icon: 'badge-check', fr: 'Initiales brodées sur la selle', en: 'Initials embroidered on the seat', price: 240 },
        { n: 37, id: 'plaque', icon: 'ticket', fr: 'Plaque de propriétaire gravée', en: 'Engraved owner\'s plate', price: 390, d: { fr: 'Votre nom et la date de livraison', en: 'Your name and the delivery date' } }
      ] }
    ] },
    { id: 'services', icon: 'handshake', fr: 'Services', en: 'Services', sections: [
      { id: 'services', fr: 'Livraison et services', en: 'Delivery and services', items: [
        { n: 38, id: 'livraison', icon: 'ship', fr: 'Livraison et prise en main sur votre yacht', en: 'Delivery and handover on your yacht', price: 1900, d: { fr: 'À quai ou à bord, Europe et Méditerranée', en: 'At the quay or on board, Europe and the Mediterranean' } },
        { n: 39, id: 'pilotage', icon: 'gauge', fr: 'Session de pilotage avancé, 2 h', en: 'Advanced riding session, 2 h', price: 390, d: { fr: 'Avec un pilote E-Dolphin', en: 'With an E-Dolphin rider' } },
        { n: 40, id: 'entretien', icon: 'settings-2', fr: 'Contrat d\'entretien 3 ans', en: '3-year service plan', price: 1290, d: { fr: 'Révisions annuelles et mises à jour logicielles', en: 'Annual servicing and software updates' } }
      ] }
    ] }
  ]
};
