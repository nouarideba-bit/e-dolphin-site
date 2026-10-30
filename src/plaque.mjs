// Launch Edition numbered plate, drawn in SVG (illustration). Two finishes: carbon or brushed aluminium.
// The number (tspan #pl-num) and the owner's engraving (#pl-eng) are updated by plaque.js; the finish switches with data-finish on the wrapper.
export const plaque = (uid = 'pl', L = 'fr') => `
<svg viewBox="0 0 640 320" class="plaque block h-auto w-full" role="img" aria-labelledby="${uid}-t">
  <title id="${uid}-t">IRUKA Launch Edition N° 001 / 300</title>
  <defs>
    <pattern id="${uid}-twill" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="16" height="16" fill="#0d0f11"/>
      <rect width="8" height="8" fill="#23272b"/><rect x="8" y="8" width="8" height="8" fill="#23272b"/>
      <rect width="8" height="2" fill="#3a4045" opacity=".5"/><rect x="8" y="8" width="8" height="2" fill="#3a4045" opacity=".5"/>
    </pattern>
    <linearGradient id="${uid}-gloss" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset=".35" stop-color="#fff" stop-opacity=".02"/>
      <stop offset=".6" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".1"/>
    </linearGradient>
    <filter id="${uid}-brush" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency=".002 .9" numOctaves="2" seed="7" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 .78  0 0 0 0 .80  0 0 0 0 .82  0 0 0 .55 .45"/>
    </filter>
    <linearGradient id="${uid}-alu" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#9aa3a9"/><stop offset=".25" stop-color="#e6eaec"/><stop offset=".5" stop-color="#b9c1c6"/>
      <stop offset=".75" stop-color="#eef1f2"/><stop offset="1" stop-color="#a3acb2"/>
    </linearGradient>
    <linearGradient id="${uid}-metal" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f4f6f7"/><stop offset=".5" stop-color="#b9c2c8"/><stop offset="1" stop-color="#eef1f3"/>
    </linearGradient>
    <linearGradient id="${uid}-sand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9dcb8"/><stop offset="1" stop-color="#b59f6c"/></linearGradient>
    <!-- Raised lettering: light from top-left, shadow bottom-right -->
    <filter id="${uid}-relief" x="-5%" y="-10%" width="110%" height="130%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="1.2" result="b"/>
      <feSpecularLighting in="b" surfaceScale="3" specularConstant=".9" specularExponent="22" lighting-color="#fff" result="s"><fePointLight x="-200" y="-300" z="260"/></feSpecularLighting>
      <feComposite in="s" in2="SourceAlpha" operator="in" result="sp"/>
      <feOffset in="SourceAlpha" dx="2.2" dy="2.6" result="o"/><feGaussianBlur in="o" stdDeviation="1.6" result="ob"/>
      <feFlood flood-color="#000" flood-opacity=".7"/><feComposite in2="ob" operator="in" result="sh"/>
      <feMerge><feMergeNode in="sh"/><feMergeNode in="SourceGraphic"/><feMergeNode in="sp"/></feMerge>
    </filter>
    <clipPath id="${uid}-clip"><rect x="2" y="2" width="628" height="304" rx="26"/></clipPath>
    <radialGradient id="${uid}-screw"><stop offset="0" stop-color="#f1f3f4"/><stop offset=".7" stop-color="#8d969c"/><stop offset="1" stop-color="#4b5359"/></radialGradient>
  </defs>
  <!-- plate body -->
  <rect x="6" y="10" width="628" height="304" rx="26" fill="#000" opacity=".45"/>
  <g class="pl-carbon"><rect x="2" y="2" width="628" height="304" rx="26" fill="url(#${uid}-twill)"/><rect x="2" y="2" width="628" height="304" rx="26" fill="url(#${uid}-gloss)"/></g>
  <g class="pl-alu"><rect x="2" y="2" width="628" height="304" rx="26" fill="url(#${uid}-alu)"/><rect x="2" y="2" width="628" height="304" filter="url(#${uid}-brush)" opacity=".7" clip-path="url(#${uid}-clip)"/><rect x="2" y="2" width="628" height="304" rx="26" fill="url(#${uid}-gloss)" opacity=".6"/></g>
  <rect x="3.5" y="3.5" width="625" height="301" rx="25" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="2"/>
  <rect x="18" y="18" width="596" height="272" rx="16" fill="none" class="pl-line" stroke-width="1.5"/>
  ${[[42, 42], [590, 42], [42, 266], [590, 266]].map(([x, y]) => `<g><circle cx="${x}" cy="${y}" r="10" fill="url(#${uid}-screw)"/><path d="M${x - 5} ${y}h10M${x} ${y - 5}v10" stroke="#3a4146" stroke-width="2"/></g>`).join('')}
  <!-- lettering -->
  <g filter="url(#${uid}-relief)" class="pl-ink" font-family="Space Grotesk, IBM Plex Sans, sans-serif">
    <g transform="translate(72 52) scale(1.25)"><rect x="1.75" y="1.75" width="36.5" height="26.5" rx="13.25" fill="none" class="pl-stroke" stroke-width="3.5"/><path d="M2 13.3H27.6a1.7 1.7 0 0 1 0 3.4H2z"/></g>
    <text x="134" y="80" font-size="26" font-weight="700" letter-spacing="6">IRUKA</text>
    <text x="568" y="80" font-size="15" font-weight="600" letter-spacing="5" text-anchor="end" class="pl-gold" fill="url(#${uid}-sand)">LAUNCH EDITION</text>
    <text x="316" y="214" font-size="118" font-weight="700" text-anchor="middle" letter-spacing="2"><tspan class="pl-n" font-size="34" font-weight="600" dx="-6" dy="-62">N°</tspan><tspan id="${uid}-num" dy="62" dx="10">001</tspan><tspan font-size="54" font-weight="500" dx="8" class="pl-of">/300</tspan></text>
    <text id="${uid}-eng" x="316" y="250" font-size="17" font-weight="600" letter-spacing="5" text-anchor="middle" class="pl-sub"></text>
    <text x="316" y="270" font-size="11.5" font-weight="600" letter-spacing="4.2" text-anchor="middle" class="pl-sub">ONDARYS · ${L === 'fr' ? 'CONÇU ET ASSEMBLÉ EN FRANCE' : 'DESIGNED AND ASSEMBLED IN FRANCE'}</text>
  </g>
</svg>`;
