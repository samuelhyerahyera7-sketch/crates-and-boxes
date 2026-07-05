/* Product illustration SVGs — realistic isometric gift boxes */

/* ── Colour helpers ────────────────────────────────────────────────────────── */
function _rgb(hex) {
  if (!hex || !hex.startsWith('#')) return [160,160,160];
  return [parseInt(hex.slice(1,3),16), parseInt(hex.slice(3,5),16), parseInt(hex.slice(5,7),16)];
}
/* blend hex toward white: t=0 → original, t=1 → white */
function _toW(hex, t) {
  const [r,g,b] = _rgb(hex);
  return `rgb(${Math.round(r+(255-r)*t)},${Math.round(g+(255-g)*t)},${Math.round(b+(255-b)*t)})`;
}
/* blend hex toward black: t=0 → original, t=1 → black */
function _toB(hex, t) {
  const [r,g,b] = _rgb(hex);
  return `rgb(${Math.round(r*(1-t))},${Math.round(g*(1-t))},${Math.round(b*(1-t))})`;
}
function _rgba(hex, a) {
  const [r,g,b] = _rgb(hex);
  return `rgba(${r},${g},${b},${a})`;
}

/*
  Consistent isometric grid (light from top-left):
    top face   → blend 44% toward white   (brightest)
    front face → blend  8% toward white   (mid)
    right face → blend 44% toward black   (darkest)
  Edge highlights: rgba(255,255,255,0.38) on top-left lit edges
  Inner shadow strip at base of front face for grounding
*/

/* ── BOW helper ─────────────────────────────────────────────────────────────── */
function _bow(cx, cy, scale) {
  scale = scale || 1;
  const s = scale;
  return `
  <path d="M${cx} ${cy} Q${cx-17*s} ${cy-18*s} ${cx-26*s} ${cy-14*s} Q${cx-30*s} ${cy-6*s} ${cx-12*s} ${cy} Z" fill="#C9A84C"/>
  <path d="M${cx} ${cy} Q${cx+17*s} ${cy-18*s} ${cx+26*s} ${cy-14*s} Q${cx+30*s} ${cy-6*s} ${cx+12*s} ${cy} Z" fill="#C9A84C"/>
  <path d="M${cx-14*s} ${cy-14*s} Q${cx-8*s} ${cy-20*s} ${cx} ${cy-18*s} Q${cx+8*s} ${cy-20*s} ${cx+14*s} ${cy-14*s}" stroke="#B8962A" stroke-width="${1*s}" fill="none"/>
  <ellipse cx="${cx}" cy="${cy-1*s}" rx="${9*s}" ry="${6*s}" fill="#A8872E"/>
  <ellipse cx="${cx}" cy="${cy-1*s}" rx="${4*s}" ry="${3*s}" fill="#C9A84C" opacity="0.6"/>
  <path d="M${cx-4*s} ${cy+5*s} Q${cx-8*s} ${cy+14*s} ${cx-10*s} ${cy+20*s}" stroke="#C9A84C" stroke-width="${2.5*s}" stroke-linecap="round" fill="none"/>
  <path d="M${cx+4*s} ${cy+5*s} Q${cx+8*s} ${cy+14*s} ${cx+10*s} ${cy+20*s}" stroke="#C9A84C" stroke-width="${2.5*s}" stroke-linecap="round" fill="none"/>`;
}

// ── SQUARE / LID-AND-BASE BOX ─────────────────────────────────────────────────
function squareBoxSVG(color) {
  const c   = color || '#2C2C2C';
  const top = _toW(c, 0.44);
  const mid = _toW(c, 0.10);
  const drk = _toB(c, 0.42);
  const id  = 'sq' + c.replace(/[^a-z0-9]/gi,'');
  return `<svg viewBox="0 0 240 260" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
<defs>
  <linearGradient id="${id}fg" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${_toW(c,0.14)}"/>
    <stop offset="100%" stop-color="${_toB(c,0.10)}"/>
  </linearGradient>
  <linearGradient id="${id}rg" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${_toB(c,0.36)}"/>
    <stop offset="100%" stop-color="${_toB(c,0.52)}"/>
  </linearGradient>
  <linearGradient id="${id}lfg" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${_toW(c,0.18)}"/>
    <stop offset="100%" stop-color="${_toW(c,0.06)}"/>
  </linearGradient>
  <filter id="${id}sh">
    <feDropShadow dx="5" dy="12" stdDeviation="10" flood-color="rgba(0,0,0,0.38)"/>
  </filter>
</defs>
<!-- ground shadow -->
<ellipse cx="118" cy="244" rx="90" ry="8" fill="rgba(0,0,0,0.22)"/>

<!-- BODY: right face -->
<path d="M174 134 L210 116 L210 234 L174 234 Z" fill="url(#${id}rg)"/>
<!-- BODY: front face -->
<path d="M26 134 L174 134 L174 234 L26 234 Z" fill="url(#${id}fg)" filter="url(#${id}sh)"/>
<!-- grounding strip at foot of front face -->
<path d="M26 220 L174 220 L174 234 L26 234 Z" fill="rgba(0,0,0,0.08)"/>
<!-- edge: right side bottom corner -->
<path d="M174 220 L210 202 L210 234 L174 234 Z" fill="${_toB(c,0.56)}"/>

<!-- LID: right face -->
<path d="M174 110 L210 92 L210 116 L174 134 Z" fill="${_toB(c,0.48)}"/>
<!-- LID: front face -->
<path d="M26 110 L174 110 L174 134 L26 134 Z" fill="url(#${id}lfg)"/>
<!-- LID: top face -->
<path d="M26 110 L174 110 L210 92 L62 92 Z" fill="${top}"/>
<!-- gloss streak on lid top -->
<path d="M62 97 L170 97 L155 92 L65 92 Z" fill="rgba(255,255,255,0.22)"/>
<!-- subtle inner top highlight -->
<path d="M68 108 L162 108 L192 96 L82 96 Z" fill="rgba(255,255,255,0.06)"/>

<!-- EDGE HIGHLIGHTS (lit top-left edges) -->
<path d="M26 110 L62 92 L210 92" stroke="rgba(255,255,255,0.42)" stroke-width="1.3" fill="none"/>
<path d="M26 110 L26 234" stroke="rgba(255,255,255,0.14)" stroke-width="1" fill="none"/>
<!-- lid-body seam line (darker) -->
<path d="M26 134 L174 134 L210 116" stroke="${_toB(c,0.6)}" stroke-width="1.2" fill="none"/>

<!-- RIBBON: horizontal on body front -->
<path d="M26 186 L174 186 L174 193 L26 193 Z" fill="#C9A84C"/>
<path d="M174 186 L210 168 L210 175 L174 193 Z" fill="#A8872E"/>
<!-- RIBBON: vertical on body front -->
<path d="M107 134 L114 134 L114 234 L107 234 Z" fill="#C9A84C"/>
<!-- RIBBON: horizontal on lid front -->
<path d="M26 121 L174 121 L174 126 L26 126 Z" fill="#C9A84C"/>
<path d="M174 121 L210 103 L210 108 L174 126 Z" fill="#A8872E"/>
<!-- RIBBON: vertical strip on lid front -->
<path d="M107 110 L114 110 L114 134 L107 134 Z" fill="#C9A84C"/>
<!-- RIBBON: cross on lid top (isometric) -->
<path d="M107 110 L114 110 L150 92 L143 92 Z" fill="rgba(201,168,76,0.65)"/>

<!-- BOW -->
${_bow(110, 104, 0.95)}
</svg>`;
}

// ── MAGNETIC CLOSURE (clamshell) BOX ─────────────────────────────────────────
function clamshellBoxSVG(color) {
  const c   = color || '#2C2C2C';
  const top = _toW(c, 0.44);
  const mid = _toW(c, 0.10);
  const drk = _toB(c, 0.42);
  const id  = 'cl' + c.replace(/[^a-z0-9]/gi,'');
  return `<svg viewBox="0 0 240 260" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
<defs>
  <linearGradient id="${id}fg" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${_toW(c,0.16)}"/>
    <stop offset="100%" stop-color="${_toB(c,0.08)}"/>
  </linearGradient>
  <linearGradient id="${id}rg" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${_toB(c,0.34)}"/>
    <stop offset="100%" stop-color="${_toB(c,0.50)}"/>
  </linearGradient>
  <filter id="${id}sh">
    <feDropShadow dx="4" dy="10" stdDeviation="9" flood-color="rgba(0,0,0,0.35)"/>
  </filter>
</defs>
<!-- ground shadow -->
<ellipse cx="120" cy="245" rx="92" ry="8" fill="rgba(0,0,0,0.20)"/>

<!-- BASE: right face -->
<path d="M176 168 L214 150 L214 238 L176 238 Z" fill="url(#${id}rg)"/>
<!-- BASE: front face -->
<path d="M26 168 L176 168 L176 238 L26 238 Z" fill="url(#${id}fg)" filter="url(#${id}sh)"/>
<!-- foot shadow on base -->
<path d="M26 225 L176 225 L176 238 L26 238 Z" fill="rgba(0,0,0,0.07)"/>
<!-- BASE: top face (where lid meets base) -->
<path d="M26 168 L176 168 L214 150 L64 150 Z" fill="${drk}" opacity="0.5"/>

<!-- LID (sits on top, hinged at back) -->
<!-- LID: right face -->
<path d="M176 94 L214 76 L214 150 L176 168 Z" fill="${_toB(c,0.50)}"/>
<!-- LID: front face -->
<path d="M26 94 L176 94 L176 168 L26 168 Z" fill="${_toW(c,0.14)}"/>
<!-- LID: top face -->
<path d="M26 94 L176 94 L214 76 L64 76 Z" fill="${top}"/>
<!-- gloss on lid top -->
<path d="M64 82 L172 82 L158 76 L66 76 Z" fill="rgba(255,255,255,0.20)"/>

<!-- EDGE HIGHLIGHTS -->
<path d="M26 94 L64 76 L214 76" stroke="rgba(255,255,255,0.44)" stroke-width="1.3" fill="none"/>
<path d="M26 94 L26 238" stroke="rgba(255,255,255,0.12)" stroke-width="1" fill="none"/>
<!-- lid-base seam -->
<path d="M26 168 L176 168 L214 150" stroke="${_toB(c,0.62)}" stroke-width="1.5" fill="none"/>
<!-- magnetic dots on seam -->
<circle cx="68" cy="168" r="3.5" fill="${_toB(c,0.30)}" stroke="${_toB(c,0.65)}" stroke-width="1"/>
<circle cx="134" cy="168" r="3.5" fill="${_toB(c,0.30)}" stroke="${_toB(c,0.65)}" stroke-width="1"/>

<!-- RIBBON on lid front (horizontal, near mid) -->
<path d="M26 130 L176 130 L176 137 L26 137 Z" fill="#C9A84C"/>
<path d="M176 130 L214 112 L214 119 L176 137 Z" fill="#A8872E"/>
<!-- RIBBON vertical on lid front -->
<path d="M108 94 L115 94 L115 168 L108 168 Z" fill="#C9A84C"/>
<!-- RIBBON on right face vertical strip -->
<path d="M176 130 L214 112 L214 120 L176 138 Z" fill="#A8872E"/>
<!-- RIBBON on base front -->
<path d="M26 202 L176 202 L176 209 L26 209 Z" fill="#C9A84C" opacity="0.7"/>
<path d="M176 202 L214 184 L214 191 L176 209 Z" fill="#A8872E" opacity="0.7"/>

<!-- BOW -->
${_bow(111, 122, 0.95)}
</svg>`;
}

// ── HAT BOX (cylindrical) ─────────────────────────────────────────────────────
function hatBoxSVG(color) {
  const c   = color || '#2C2C2C';
  const id  = 'hb' + c.replace(/[^a-z0-9]/gi,'');
  const bodyL = _toB(c, 0.38);
  const bodyR = _toB(c, 0.52);
  const bodyM = _toW(c, 0.06);
  const lidTop = _toW(c, 0.46);
  const lidMid = _toW(c, 0.18);
  const lidRim = _toB(c, 0.28);
  return `<svg viewBox="0 0 240 260" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
<defs>
  <linearGradient id="${id}bg" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="${bodyL}"/>
    <stop offset="30%" stop-color="${bodyM}"/>
    <stop offset="70%" stop-color="${bodyM}"/>
    <stop offset="100%" stop-color="${bodyR}"/>
  </linearGradient>
  <linearGradient id="${id}lg" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="${_toB(c,0.32)}"/>
    <stop offset="35%" stop-color="${lidMid}"/>
    <stop offset="65%" stop-color="${lidMid}"/>
    <stop offset="100%" stop-color="${_toB(c,0.44)}"/>
  </linearGradient>
  <radialGradient id="${id}tg" cx="38%" cy="35%" r="65%">
    <stop offset="0%" stop-color="${_toW(c,0.60)}"/>
    <stop offset="55%" stop-color="${lidTop}"/>
    <stop offset="100%" stop-color="${_toW(c,0.30)}"/>
  </radialGradient>
  <filter id="${id}sh">
    <feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="rgba(0,0,0,0.32)"/>
  </filter>
</defs>
<!-- ground shadow -->
<ellipse cx="120" cy="244" rx="82" ry="9" fill="rgba(0,0,0,0.22)"/>

<!-- BODY cylinder -->
<path d="M38 138 L38 214 Q38 230 120 230 Q202 230 202 214 L202 138" fill="url(#${id}bg)" filter="url(#${id}sh)"/>
<!-- body bottom ellipse -->
<ellipse cx="120" cy="214" rx="82" ry="16" fill="${bodyR}"/>
<!-- body top ellipse (where lid sits) -->
<ellipse cx="120" cy="138" rx="82" ry="16" fill="${_toB(c,0.46)}"/>

<!-- highlight stripe on body (left-side lit) -->
<path d="M52 138 L52 214" stroke="rgba(255,255,255,0.14)" stroke-width="8" stroke-linecap="round"/>
<!-- right-side deep shadow on body -->
<path d="M188 138 L188 214" stroke="rgba(0,0,0,0.20)" stroke-width="10" stroke-linecap="round"/>

<!-- LID rim sides -->
<path d="M30 124 L30 142 Q30 160 120 160 Q210 160 210 142 L210 124" fill="url(#${id}lg)"/>
<!-- lid rim bottom ellipse -->
<ellipse cx="120" cy="142" rx="90" ry="18" fill="${_toB(c,0.42)}"/>
<!-- lid top face ellipse -->
<ellipse cx="120" cy="124" rx="90" ry="18" fill="url(#${id}tg)"/>
<!-- gloss highlight on lid (left arc) -->
<path d="M55 118 Q75 110 100 112" stroke="rgba(255,255,255,0.30)" stroke-width="6" stroke-linecap="round" fill="none"/>
<path d="M48 122 Q60 116 78 117" stroke="rgba(255,255,255,0.18)" stroke-width="4" stroke-linecap="round" fill="none"/>
<!-- lid rim top edge highlight -->
<ellipse cx="120" cy="124" rx="90" ry="18" stroke="rgba(255,255,255,0.22)" stroke-width="1.2" fill="none"/>

<!-- RIBBON vertical strip on cylinder body -->
<rect x="114" y="104" width="12" height="56" fill="rgba(201,168,76,0.85)" rx="2"/>
<!-- RIBBON horizontal on lid rim -->
<path d="M30 132 Q120 126 210 132 L210 140 Q120 134 30 140 Z" fill="rgba(201,168,76,0.85)"/>
<!-- ribbon on body horizontal -->
<path d="M38 175 Q120 169 202 175 L202 183 Q120 177 38 183 Z" fill="rgba(201,168,76,0.70)"/>

<!-- BOW -->
${_bow(120, 124, 1.05)}
</svg>`;
}

// ── HEART BOX ─────────────────────────────────────────────────────────────────
function heartBoxSVG(color) {
  const c   = color || '#C0392B';
  const id  = 'hrt' + c.replace(/[^a-z0-9]/gi,'');
  const lit = _toW(c, 0.50);
  const dark= _toB(c, 0.40);
  return `<svg viewBox="0 0 240 260" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
<defs>
  <radialGradient id="${id}hg" cx="32%" cy="28%" r="72%">
    <stop offset="0%" stop-color="${_toW(c,0.65)}"/>
    <stop offset="35%" stop-color="${_toW(c,0.25)}"/>
    <stop offset="100%" stop-color="${c}"/>
  </radialGradient>
  <radialGradient id="${id}dg" cx="32%" cy="28%" r="72%">
    <stop offset="0%" stop-color="${_toW(c,0.20)}"/>
    <stop offset="100%" stop-color="${dark}"/>
  </radialGradient>
  <filter id="${id}sh">
    <feDropShadow dx="0" dy="12" stdDeviation="12" flood-color="rgba(0,0,0,0.35)"/>
  </filter>
</defs>
<!-- ground shadow -->
<ellipse cx="120" cy="246" rx="88" ry="8" fill="rgba(0,0,0,0.22)"/>

<!-- heart depth/base (slightly lower & darker — gives 3D thickness) -->
<path d="M120 222 Q42 172 30 122 Q22 77 57 62 Q82 52 102 72 Q111 82 120 94 Q129 82 138 72 Q158 52 183 62 Q218 77 210 122 Q198 172 120 222 Z"
      fill="url(#${id}dg)" transform="translate(0,18)" filter="url(#${id}sh)"/>
<!-- heart side depth (right edge darker) -->
<path d="M120 222 Q198 172 210 122 Q218 77 183 62 Q158 52 138 72 Q129 82 120 94"
      fill="${dark}" transform="translate(6,12)" opacity="0.7"/>

<!-- heart top face -->
<path d="M120 222 Q42 172 30 122 Q22 77 57 62 Q82 52 102 72 Q111 82 120 94 Q129 82 138 72 Q158 52 183 62 Q218 77 210 122 Q198 172 120 222 Z"
      fill="url(#${id}hg)"/>

<!-- inner light catchment (secondary gloss) -->
<path d="M120 196 Q62 156 52 116 Q46 87 68 76 Q86 68 100 82 Q110 92 120 104 Q130 92 140 82 Q154 68 172 76 Q194 87 188 116 Q178 156 120 196 Z"
      fill="rgba(255,255,255,0.06)"/>
<!-- primary gloss highlight -->
<path d="M66 82 Q80 70 98 78" stroke="rgba(255,255,255,0.42)" stroke-width="5" stroke-linecap="round" fill="none"/>
<path d="M58 92 Q68 82 80 86" stroke="rgba(255,255,255,0.24)" stroke-width="3" stroke-linecap="round" fill="none"/>

<!-- RIBBON across heart -->
<path d="M54 118 Q120 112 186 118 L186 126 Q120 120 54 126 Z" fill="rgba(201,168,76,0.88)"/>
<!-- ribbon vertical (centre) -->
<path d="M116 68 L124 68 L124 224 L116 224 Z" fill="rgba(201,168,76,0.50)" opacity="0.7"/>

<!-- BOW -->
${_bow(120, 102, 1.0)}
</svg>`;
}

// ── WINE BOX (tall portrait) ──────────────────────────────────────────────────
function wineBoxSVG(color) {
  const c   = color || '#2C2C2C';
  const top = _toW(c, 0.44);
  const mid = _toW(c, 0.10);
  const drk = _toB(c, 0.42);
  const id  = 'wb' + c.replace(/[^a-z0-9]/gi,'');
  return `<svg viewBox="0 0 240 260" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
<defs>
  <linearGradient id="${id}fg" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${_toW(c,0.16)}"/>
    <stop offset="100%" stop-color="${_toB(c,0.10)}"/>
  </linearGradient>
  <linearGradient id="${id}rg" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${_toB(c,0.36)}"/>
    <stop offset="100%" stop-color="${_toB(c,0.54)}"/>
  </linearGradient>
  <filter id="${id}sh">
    <feDropShadow dx="4" dy="10" stdDeviation="9" flood-color="rgba(0,0,0,0.36)"/>
  </filter>
</defs>
<!-- ground shadow -->
<ellipse cx="116" cy="244" rx="80" ry="8" fill="rgba(0,0,0,0.22)"/>

<!-- BODY: right face -->
<path d="M176 82 L208 66 L208 236 L176 236 Z" fill="url(#${id}rg)"/>
<!-- BODY: front face -->
<path d="M34 82 L176 82 L176 236 L34 236 Z" fill="url(#${id}fg)" filter="url(#${id}sh)"/>
<!-- foot shadow -->
<path d="M34 222 L176 222 L176 236 L34 236 Z" fill="rgba(0,0,0,0.08)"/>

<!-- LID: right face -->
<path d="M176 58 L208 42 L208 66 L176 82 Z" fill="${_toB(c,0.50)}"/>
<!-- LID: front face -->
<path d="M34 58 L176 58 L176 82 L34 82 Z" fill="${_toW(c,0.18)}"/>
<!-- LID: top face -->
<path d="M34 58 L176 58 L208 42 L60 42 Z" fill="${top}"/>
<!-- gloss on top -->
<path d="M60 48 L168 48 L155 42 L62 42 Z" fill="rgba(255,255,255,0.22)"/>

<!-- EDGE HIGHLIGHTS -->
<path d="M34 58 L60 42 L208 42" stroke="rgba(255,255,255,0.42)" stroke-width="1.3" fill="none"/>
<path d="M34 58 L34 236" stroke="rgba(255,255,255,0.12)" stroke-width="1" fill="none"/>
<!-- lid-body seam -->
<path d="M34 82 L176 82 L208 66" stroke="${_toB(c,0.60)}" stroke-width="1.2" fill="none"/>

<!-- RIBBON horizontal on body -->
<path d="M34 158 L176 158 L176 165 L34 165 Z" fill="#C9A84C"/>
<path d="M176 158 L208 142 L208 149 L176 165 Z" fill="#A8872E"/>
<!-- RIBBON vertical on body -->
<path d="M104 82 L111 82 L111 236 L104 236 Z" fill="#C9A84C"/>
<!-- RIBBON on lid front (horizontal) -->
<path d="M34 69 L176 69 L176 74 L34 74 Z" fill="#C9A84C"/>
<path d="M176 69 L208 53 L208 58 L176 74 Z" fill="#A8872E"/>
<!-- RIBBON vertical on lid -->
<path d="M104 58 L111 58 L111 82 L104 82 Z" fill="#C9A84C"/>
<!-- RIBBON cross on lid top -->
<path d="M104 58 L111 58 L143 42 L136 42 Z" fill="rgba(201,168,76,0.65)"/>

<!-- decorative embossed label area on front -->
<rect x="48" y="96" width="114" height="50" rx="2" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.10)" stroke-width="1"/>
<text x="68" y="118" font-size="8" fill="rgba(255,255,255,0.35)" font-family="Georgia,serif" letter-spacing="1.5">CRATES</text>
<text x="60" y="132" font-size="8" fill="rgba(255,255,255,0.35)" font-family="Georgia,serif" letter-spacing="1.5">&amp; BOXES</text>

<!-- BOW -->
${_bow(107, 62, 0.90)}
</svg>`;
}

// ── RECTANGLE / SHALLOW GIFT BOX ─────────────────────────────────────────────
function rectangleBoxSVG(color) {
  const c   = color || '#2C5F8A';
  const top = _toW(c, 0.44);
  const mid = _toW(c, 0.10);
  const drk = _toB(c, 0.42);
  const id  = 'rb' + c.replace(/[^a-z0-9]/gi,'');
  return `<svg viewBox="0 0 240 260" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
<defs>
  <linearGradient id="${id}fg" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${_toW(c,0.14)}"/>
    <stop offset="100%" stop-color="${_toB(c,0.08)}"/>
  </linearGradient>
  <linearGradient id="${id}rg" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${_toB(c,0.36)}"/>
    <stop offset="100%" stop-color="${_toB(c,0.52)}"/>
  </linearGradient>
  <filter id="${id}sh">
    <feDropShadow dx="4" dy="10" stdDeviation="9" flood-color="rgba(0,0,0,0.36)"/>
  </filter>
</defs>
<!-- ground shadow -->
<ellipse cx="120" cy="244" rx="94" ry="8" fill="rgba(0,0,0,0.22)"/>

<!-- BODY: right face -->
<path d="M182 152 L216 134 L216 232 L182 232 Z" fill="url(#${id}rg)"/>
<!-- BODY: front face -->
<path d="M24 152 L182 152 L182 232 L24 232 Z" fill="url(#${id}fg)" filter="url(#${id}sh)"/>
<!-- foot shadow -->
<path d="M24 220 L182 220 L182 232 L24 232 Z" fill="rgba(0,0,0,0.08)"/>

<!-- LID: right face -->
<path d="M182 110 L216 92 L216 134 L182 152 Z" fill="${_toB(c,0.50)}"/>
<!-- LID: front face -->
<path d="M24 110 L182 110 L182 152 L24 152 Z" fill="${_toW(c,0.16)}"/>
<!-- LID: top face -->
<path d="M24 110 L182 110 L216 92 L58 92 Z" fill="${top}"/>
<!-- gloss streak on lid top -->
<path d="M58 98 L180 98 L165 92 L60 92 Z" fill="rgba(255,255,255,0.22)"/>

<!-- EDGE HIGHLIGHTS -->
<path d="M24 110 L58 92 L216 92" stroke="rgba(255,255,255,0.44)" stroke-width="1.3" fill="none"/>
<path d="M24 110 L24 232" stroke="rgba(255,255,255,0.13)" stroke-width="1" fill="none"/>
<!-- lid-body seam -->
<path d="M24 152 L182 152 L216 134" stroke="${_toB(c,0.60)}" stroke-width="1.2" fill="none"/>

<!-- RIBBON horizontal on lid front -->
<path d="M24 130 L182 130 L182 136 L24 136 Z" fill="#C9A84C"/>
<path d="M182 130 L216 112 L216 118 L182 136 Z" fill="#A8872E"/>
<!-- RIBBON vertical on lid front -->
<path d="M108 110 L115 110 L115 152 L108 152 Z" fill="#C9A84C"/>
<!-- RIBBON cross on lid top (iso strips) -->
<path d="M108 110 L115 110 L149 92 L142 92 Z" fill="rgba(201,168,76,0.65)"/>
<!-- RIBBON horizontal on body front -->
<path d="M24 192 L182 192 L182 198 L24 198 Z" fill="#C9A84C"/>
<path d="M182 192 L216 174 L216 180 L182 198 Z" fill="#A8872E"/>
<!-- RIBBON vertical on body front -->
<path d="M108 152 L115 152 L115 232 L108 232 Z" fill="#C9A84C"/>

<!-- BOW -->
${_bow(111, 122, 0.98)}
</svg>`;
}

// ── MINI HAT BOX (smaller cylindrical) ───────────────────────────────────────
function miniHatBoxSVG(color) {
  const c   = color || '#6B4C2A';
  const id  = 'mhb' + c.replace(/[^a-z0-9]/gi,'');
  const bodyL = _toB(c, 0.35);
  const bodyR = _toB(c, 0.50);
  const bodyM = _toW(c, 0.08);
  return `<svg viewBox="0 0 240 260" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
<defs>
  <linearGradient id="${id}bg" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="${bodyL}"/>
    <stop offset="30%" stop-color="${bodyM}"/>
    <stop offset="70%" stop-color="${bodyM}"/>
    <stop offset="100%" stop-color="${bodyR}"/>
  </linearGradient>
  <linearGradient id="${id}lg" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="${_toB(c,0.30)}"/>
    <stop offset="40%" stop-color="${_toW(c,0.18)}"/>
    <stop offset="60%" stop-color="${_toW(c,0.18)}"/>
    <stop offset="100%" stop-color="${_toB(c,0.42)}"/>
  </linearGradient>
  <radialGradient id="${id}tg" cx="36%" cy="33%" r="66%">
    <stop offset="0%" stop-color="${_toW(c,0.62)}"/>
    <stop offset="50%" stop-color="${_toW(c,0.42)}"/>
    <stop offset="100%" stop-color="${_toW(c,0.26)}"/>
  </radialGradient>
  <filter id="${id}sh">
    <feDropShadow dx="0" dy="8" stdDeviation="9" flood-color="rgba(0,0,0,0.30)"/>
  </filter>
</defs>
<!-- ground shadow -->
<ellipse cx="120" cy="244" rx="72" ry="8" fill="rgba(0,0,0,0.20)"/>

<!-- BODY -->
<path d="M50 152 L50 212 Q50 226 120 226 Q190 226 190 212 L190 152" fill="url(#${id}bg)" filter="url(#${id}sh)"/>
<ellipse cx="120" cy="212" rx="70" ry="14" fill="${bodyR}"/>
<ellipse cx="120" cy="152" rx="70" ry="14" fill="${_toB(c,0.45)}"/>
<!-- body lit stripe -->
<path d="M64 152 L64 212" stroke="rgba(255,255,255,0.14)" stroke-width="7" stroke-linecap="round"/>
<!-- body shadow stripe -->
<path d="M176 152 L176 212" stroke="rgba(0,0,0,0.18)" stroke-width="8" stroke-linecap="round"/>

<!-- LID rim -->
<path d="M42 138 L42 156 Q42 172 120 172 Q198 172 198 156 L198 138" fill="url(#${id}lg)"/>
<ellipse cx="120" cy="156" rx="78" ry="16" fill="${_toB(c,0.40)}"/>
<!-- lid top face -->
<ellipse cx="120" cy="138" rx="78" ry="16" fill="url(#${id}tg)"/>
<!-- lid top rim highlight -->
<ellipse cx="120" cy="138" rx="78" ry="16" stroke="rgba(255,255,255,0.22)" stroke-width="1.2" fill="none"/>
<!-- gloss -->
<path d="M55 132 Q72 124 92 127" stroke="rgba(255,255,255,0.30)" stroke-width="5" stroke-linecap="round" fill="none"/>

<!-- RIBBON vertical -->
<rect x="114" y="118" width="12" height="34" fill="rgba(201,168,76,0.85)" rx="2"/>
<!-- RIBBON horizontal on lid rim -->
<path d="M42 146 Q120 140 198 146 L198 153 Q120 147 42 153 Z" fill="rgba(201,168,76,0.85)"/>
<!-- RIBBON horizontal on body -->
<path d="M50 182 Q120 176 190 182 L190 189 Q120 183 50 189 Z" fill="rgba(201,168,76,0.65)"/>

<!-- BOW -->
${_bow(120, 130, 0.92)}
</svg>`;
}

// ── BOUQUET / OPEN-TOP CARRIER BOX ───────────────────────────────────────────
function bouquetBoxSVG(color) {
  const c   = color || '#F5EDD8';
  const id  = 'bq' + c.replace(/[^a-z0-9]/gi,'');
  const drk = _toB(c, 0.48);
  const mid = _toB(c, 0.22);
  return `<svg viewBox="0 0 240 260" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
<defs>
  <linearGradient id="${id}fg" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${_toW(c,0.12)}"/>
    <stop offset="100%" stop-color="${_toB(c,0.14)}"/>
  </linearGradient>
  <linearGradient id="${id}rg" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0%" stop-color="${drk}"/>
    <stop offset="100%" stop-color="${_toB(c,0.58)}"/>
  </linearGradient>
  <filter id="${id}sh">
    <feDropShadow dx="3" dy="9" stdDeviation="8" flood-color="rgba(0,0,0,0.28)"/>
  </filter>
</defs>
<!-- ground shadow -->
<ellipse cx="118" cy="244" rx="84" ry="8" fill="rgba(0,0,0,0.20)"/>

<!-- BOX: right face -->
<path d="M180 120 L212 104 L212 232 L180 232 Z" fill="url(#${id}rg)"/>
<!-- BOX: front face -->
<path d="M28 120 L180 120 L180 232 L28 232 Z" fill="url(#${id}fg)" filter="url(#${id}sh)"/>
<!-- BOX: foot shadow -->
<path d="M28 220 L180 220 L180 232 L28 232 Z" fill="rgba(0,0,0,0.08)"/>
<!-- BOX: open top interior rim (dark top edge) -->
<path d="M28 120 L180 120 L212 104 L60 104 Z" fill="${drk}" opacity="0.6"/>
<!-- inner walls glimpse -->
<path d="M32 122 L32 230 L36 230 L36 124 Z" fill="rgba(0,0,0,0.06)"/>

<!-- FLOWERS visible above box rim -->
<ellipse cx="78"  cy="108" rx="13" ry="11" fill="#E879A0" opacity="0.88"/>
<ellipse cx="98"  cy="102" rx="12" ry="10" fill="#FCA5A5" opacity="0.88"/>
<ellipse cx="120" cy="105" rx="14" ry="12" fill="#F472B6" opacity="0.90"/>
<ellipse cx="143" cy="101" rx="12" ry="10" fill="#FDA4AF" opacity="0.88"/>
<ellipse cx="163" cy="107" rx="11" ry="9"  fill="#FBCFE8" opacity="0.88"/>
<!-- flower centres -->
<circle cx="78"  cy="108" r="5"  fill="#FDE68A" opacity="0.9"/>
<circle cx="120" cy="105" r="6"  fill="#FDE68A" opacity="0.9"/>
<circle cx="163" cy="107" r="4"  fill="#FDE68A" opacity="0.9"/>
<!-- petals detail -->
<circle cx="98"  cy="102" r="4"  fill="#FEF3C7" opacity="0.85"/>
<circle cx="143" cy="101" r="4"  fill="#FEF3C7" opacity="0.85"/>
<!-- leaves -->
<path d="M88 114 Q80 104 86 100" stroke="#4ADE80" stroke-width="2.5" stroke-linecap="round" fill="none"/>
<path d="M154 113 Q162 103 156 99" stroke="#4ADE80" stroke-width="2.5" stroke-linecap="round" fill="none"/>
<path d="M108 112 Q104 100 110 97" stroke="#22C55E" stroke-width="2" stroke-linecap="round" fill="none"/>

<!-- EDGE HIGHLIGHTS on box -->
<path d="M28 120 L28 232" stroke="rgba(255,255,255,0.14)" stroke-width="1" fill="none"/>
<path d="M28 120 L60 104 L212 104" stroke="rgba(255,255,255,0.18)" stroke-width="1" fill="none"/>

<!-- RIBBON handles -->
<path d="M66 120 Q50 84 58 56 Q63 42 72 48 Q78 56 70 84 L68 120 Z" fill="rgba(201,168,76,0.82)"/>
<path d="M172 120 Q188 84 180 56 Q175 42 166 48 Q160 56 168 84 L170 120 Z" fill="rgba(201,168,76,0.82)"/>
<!-- handle curves at top tied together -->
<path d="M70 50 Q95 36 120 33 Q145 36 168 50" stroke="#C9A84C" stroke-width="6" stroke-linecap="round" fill="none"/>
<path d="M70 50 Q95 36 120 33 Q145 36 168 50" stroke="#A8872E" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.5"/>

<!-- BOW at top of handle -->
${_bow(120, 34, 0.90)}

<!-- RIBBON horizontal stripe across front -->
<path d="M28 170 L180 170 L180 177 L28 177 Z" fill="rgba(201,168,76,0.72)"/>
<path d="M180 170 L212 154 L212 161 L180 177 Z" fill="rgba(160,130,40,0.72)"/>
</svg>`;
}

// ── FLOWER CAKE BOX (open-top cylindrical) ────────────────────────────────────
function flowerCakeBoxSVG(color) {
  const c   = color || '#FBD5E8';
  const id  = 'fc' + c.replace(/[^a-z0-9]/gi,'');
  const dark = _toB(c, 0.44);
  const mid  = _toB(c, 0.18);
  return `<svg viewBox="0 0 240 260" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
<defs>
  <linearGradient id="${id}bg" x1="0" y1="0" x2="1" y2="0">
    <stop offset="0%" stop-color="${_toB(c,0.38)}"/>
    <stop offset="28%" stop-color="${_toW(c,0.06)}"/>
    <stop offset="72%" stop-color="${_toW(c,0.06)}"/>
    <stop offset="100%" stop-color="${_toB(c,0.50)}"/>
  </linearGradient>
  <filter id="${id}sh">
    <feDropShadow dx="0" dy="9" stdDeviation="10" flood-color="rgba(0,0,0,0.30)"/>
  </filter>
</defs>
<!-- ground shadow -->
<ellipse cx="120" cy="244" rx="84" ry="8" fill="rgba(0,0,0,0.22)"/>

<!-- BODY -->
<path d="M36 150 L36 220 Q36 234 120 234 Q204 234 204 220 L204 150" fill="url(#${id}bg)" filter="url(#${id}sh)"/>
<ellipse cx="120" cy="220" rx="84" ry="14" fill="${_toB(c,0.52)}"/>
<!-- open top rim dark -->
<ellipse cx="120" cy="150" rx="84" ry="14" fill="${dark}"/>
<!-- inner rim slightly lighter -->
<ellipse cx="120" cy="148" rx="80" ry="12" fill="${_toB(c,0.50)}"/>
<!-- inside dark cavity -->
<ellipse cx="120" cy="146" rx="76" ry="10" fill="${dark}" opacity="0.75"/>

<!-- FLOWERS in box (top-down view) -->
<ellipse cx="96"  cy="144" rx="15" ry="12" fill="#F472B6" opacity="0.92"/>
<ellipse cx="120" cy="140" rx="17" ry="14" fill="#FB7185" opacity="0.92"/>
<ellipse cx="144" cy="144" rx="14" ry="11" fill="#E879A0" opacity="0.92"/>
<ellipse cx="108" cy="136" rx="11" ry="9"  fill="#FCA5A5" opacity="0.88"/>
<ellipse cx="133" cy="133" rx="10" ry="8"  fill="#FBCFE8" opacity="0.88"/>
<!-- flower centres (bright yellow) -->
<circle cx="96"  cy="144" r="5"  fill="#FDE68A" opacity="0.95"/>
<circle cx="120" cy="140" r="6"  fill="#FDE68A" opacity="0.95"/>
<circle cx="144" cy="144" r="5"  fill="#FDE68A" opacity="0.95"/>
<circle cx="108" cy="136" r="4"  fill="#FEF3C7" opacity="0.90"/>
<circle cx="133" cy="133" r="4"  fill="#FEF3C7" opacity="0.90"/>
<!-- leaves -->
<path d="M82 150 Q76 140 82 136" stroke="#4ADE80" stroke-width="3" stroke-linecap="round" fill="none"/>
<path d="M158 150 Q164 140 158 136" stroke="#4ADE80" stroke-width="3" stroke-linecap="round" fill="none"/>
<path d="M112 148 Q108 138 114 135" stroke="#22C55E" stroke-width="2" stroke-linecap="round" fill="none"/>

<!-- body lit stripe (left) -->
<path d="M52 150 L52 220" stroke="rgba(255,255,255,0.13)" stroke-width="8" stroke-linecap="round"/>
<!-- body shadow stripe (right) -->
<path d="M188 150 L188 220" stroke="rgba(0,0,0,0.18)" stroke-width="10" stroke-linecap="round"/>
<!-- rim top edge highlight -->
<ellipse cx="120" cy="150" rx="84" ry="14" stroke="rgba(255,255,255,0.18)" stroke-width="1.2" fill="none"/>

<!-- RIBBON around body -->
<path d="M36 186 Q120 180 204 186 L204 193 Q120 187 36 193 Z" fill="rgba(201,168,76,0.80)"/>
<!-- bow -->
${_bow(120, 182, 0.85)}
</svg>`;
}

/* ── Dispatch map ─────────────────────────────────────────────────────────── */
const BOX_ILLUSTRATIONS = {
  'hat':         hatBoxSVG,
  'mini-hat':    miniHatBoxSVG,
  'square':      squareBoxSVG,
  'clamshell':   clamshellBoxSVG,
  'heart':       heartBoxSVG,
  'wine':        wineBoxSVG,
  'rectangle':   rectangleBoxSVG,
  'bouquet':     bouquetBoxSVG,
  'flower-cake': flowerCakeBoxSVG,
};

function getBoxIllustration(boxType, color) {
  const fn = BOX_ILLUSTRATIONS[boxType] || rectangleBoxSVG;
  return fn(color);
}
