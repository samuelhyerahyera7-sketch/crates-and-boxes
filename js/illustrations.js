/* Product illustration SVGs — one per box type, colored per product */

function lighten(hex, amt) {
  let r = Math.min(255, parseInt(hex.slice(1,3),16) + amt);
  let g = Math.min(255, parseInt(hex.slice(3,5),16) + amt);
  let b = Math.min(255, parseInt(hex.slice(5,7),16) + amt);
  return `rgb(${r},${g},${b})`;
}
function darken(hex, amt) {
  let r = Math.max(0, parseInt(hex.slice(1,3),16) - amt);
  let g = Math.max(0, parseInt(hex.slice(3,5),16) - amt);
  let b = Math.max(0, parseInt(hex.slice(5,7),16) - amt);
  return `rgb(${r},${g},${b})`;
}
function rgba(hex, a) {
  if (!hex || !hex.startsWith('#')) return `rgba(180,180,180,${a})`;
  let r = parseInt(hex.slice(1,3),16);
  let g = parseInt(hex.slice(3,5),16);
  let b = parseInt(hex.slice(5,7),16);
  return `rgba(${r},${g},${b},${a})`;
}

// ── HAT BOX (cylindrical round box) ────────────────────────────────────────
function hatBoxSVG(color) {
  const c = color || '#1A1A1A';
  const light = lighten(c, 55);
  const dark  = darken(c, 40);
  const mid   = darken(c, 15);
  const id    = 'hb' + c.replace('#','');
  return `<svg viewBox="0 0 240 260" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
  <defs>
    <linearGradient id="${id}s" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${dark}"/>
      <stop offset="40%" stop-color="${mid}"/>
      <stop offset="100%" stop-color="${dark}"/>
    </linearGradient>
    <radialGradient id="${id}t" cx="50%" cy="30%" r="60%">
      <stop offset="0%" stop-color="${light}"/>
      <stop offset="100%" stop-color="${mid}"/>
    </radialGradient>
    <filter id="${id}sh">
      <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="rgba(0,0,0,0.25)"/>
    </filter>
  </defs>
  <!-- shadow -->
  <ellipse cx="120" cy="248" rx="82" ry="12" fill="rgba(0,0,0,0.15)"/>
  <!-- body -->
  <path d="M38 135 L38 210 Q38 228 120 228 Q202 228 202 210 L202 135" fill="url(#${id}s)" filter="url(#${id}sh)"/>
  <!-- body bottom ellipse -->
  <ellipse cx="120" cy="210" rx="82" ry="18" fill="${dark}"/>
  <!-- body top ellipse -->
  <ellipse cx="120" cy="135" rx="82" ry="18" fill="${mid}"/>
  <!-- lid sides -->
  <path d="M30 122 L30 138 Q30 158 120 158 Q210 158 210 138 L210 122" fill="${mid}"/>
  <!-- lid bottom rim -->
  <ellipse cx="120" cy="138" rx="90" ry="20" fill="${dark}"/>
  <!-- lid top face -->
  <ellipse cx="120" cy="122" rx="90" ry="20" fill="url(#${id}t)"/>
  <!-- rose emboss on lid -->
  <g opacity="0.25" transform="translate(96,102)">
    <circle cx="24" cy="20" r="14" stroke="white" stroke-width="1.5" fill="none"/>
    <path d="M24 20 Q28 14 24 10 Q20 14 24 20" stroke="white" stroke-width="1" fill="none"/>
    <path d="M24 20 Q31 17 32 12 Q27 11 24 20" stroke="white" stroke-width="1" fill="none"/>
    <path d="M24 20 Q30 24 32 30 Q27 30 24 20" stroke="white" stroke-width="1" fill="none"/>
    <path d="M24 20 Q18 24 17 30 Q22 30 24 20" stroke="white" stroke-width="1" fill="none"/>
    <path d="M24 20 Q17 17 17 12 Q22 11 24 20" stroke="white" stroke-width="1" fill="none"/>
  </g>
  <!-- ribbon vertical -->
  <rect x="114" y="100" width="12" height="58" fill="rgba(201,168,76,0.85)" rx="2"/>
  <!-- ribbon horizontal -->
  <path d="M38 130 Q120 124 202 130 L202 138 Q120 132 38 138 Z" fill="rgba(201,168,76,0.85)"/>
  <!-- bow left wing -->
  <path d="M114 128 Q95 108 82 112 Q74 120 92 128 Z" fill="#C9A84C"/>
  <path d="M114 128 Q95 108 82 112 Q74 120 92 128" stroke="rgba(0,0,0,0.15)" stroke-width="0.5" fill="none"/>
  <!-- bow right wing -->
  <path d="M126 128 Q145 108 158 112 Q166 120 148 128 Z" fill="#C9A84C"/>
  <!-- bow centre knot -->
  <ellipse cx="120" cy="128" rx="8" ry="6" fill="#A8872E"/>
  <!-- bow tails -->
  <path d="M116 134 Q108 148 104 155" stroke="#C9A84C" stroke-width="3" stroke-linecap="round" fill="none"/>
  <path d="M124 134 Q132 148 136 155" stroke="#C9A84C" stroke-width="3" stroke-linecap="round" fill="none"/>
</svg>`;
}

// ── SQUARE BOX (isometric cube with lid) ────────────────────────────────────
function squareBoxSVG(color) {
  const c = color || '#1A1A1A';
  const light = lighten(c, 60);
  const dark  = darken(c, 45);
  const mid   = darken(c, 20);
  const id    = 'sb' + c.replace('#','');
  return `<svg viewBox="0 0 240 260" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
  <defs>
    <filter id="${id}sh">
      <feDropShadow dx="3" dy="8" stdDeviation="8" flood-color="rgba(0,0,0,0.3)"/>
    </filter>
  </defs>
  <!-- shadow -->
  <ellipse cx="120" cy="248" rx="85" ry="10" fill="rgba(0,0,0,0.15)"/>
  <!-- BOX BODY - right face -->
  <path d="M170 155 L210 130 L210 220 L170 245 Z" fill="${dark}" filter="url(#${id}sh)"/>
  <!-- BOX BODY - front face -->
  <path d="M50 155 L170 155 L170 245 L50 245 Z" fill="${mid}"/>
  <!-- BOX BODY - top face of body (where lid sits) -->
  <path d="M50 155 L90 130 L210 130 L170 155 Z" fill="${light}"/>
  <!-- LID right face -->
  <path d="M170 118 L215 92 L215 132 L170 158 Z" fill="${dark}"/>
  <!-- LID front face -->
  <path d="M44 118 L170 118 L170 158 L44 158 Z" fill="${mid}"/>
  <!-- LID top face -->
  <path d="M44 118 L88 92 L215 92 L170 118 Z" fill="${light}"/>
  <!-- LID top highlight line -->
  <path d="M44 118 L88 92 L215 92" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" fill="none"/>
  <!-- Ribbon across front face -->
  <rect x="44" y="183" width="126" height="10" fill="rgba(201,168,76,0.85)" rx="1"/>
  <!-- Ribbon down front face -->
  <rect x="104" y="118" width="10" height="127" fill="rgba(201,168,76,0.85)" rx="1"/>
  <!-- Ribbon on lid front -->
  <rect x="44" y="128" width="126" height="8" fill="rgba(201,168,76,0.85)" rx="1"/>
  <rect x="104" y="92" width="10" height="26" fill="rgba(201,168,76,0.85)" rx="1"/>
  <!-- Ribbon on right faces -->
  <path d="M170 155 L210 130 L210 135 L170 160 Z" fill="rgba(201,168,76,0.7)"/>
  <path d="M170 118 L215 92 L215 97 L170 123 Z" fill="rgba(201,168,76,0.7)"/>
  <!-- BOW on lid -->
  <path d="M109 103 Q95 88 84 92 Q77 100 95 106 Z" fill="#C9A84C"/>
  <path d="M119 103 Q133 88 144 92 Q151 100 133 106 Z" fill="#C9A84C"/>
  <ellipse cx="114" cy="104" rx="7" ry="5" fill="#A8872E"/>
  <!-- bow tails -->
  <path d="M110 109 Q104 118 101 124" stroke="#C9A84C" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <path d="M118 109 Q124 118 127 124" stroke="#C9A84C" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <!-- brand mark -->
  <text x="85" y="205" font-size="9" fill="rgba(255,255,255,0.25)" font-family="serif" letter-spacing="2">CRATES &amp; BOXES</text>
</svg>`;
}

// ── CLAMSHELL RIBBON BOX (magnetic fold-open) ────────────────────────────────
function clamshellBoxSVG(color) {
  const c = color || '#1A1A1A';
  const light = lighten(c, 60);
  const dark  = darken(c, 40);
  const mid   = darken(c, 15);
  const id    = 'cb' + c.replace('#','');
  return `<svg viewBox="0 0 240 260" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
  <defs>
    <filter id="${id}sh">
      <feDropShadow dx="2" dy="6" stdDeviation="8" flood-color="rgba(0,0,0,0.25)"/>
    </filter>
  </defs>
  <!-- shadow -->
  <ellipse cx="120" cy="248" rx="90" ry="10" fill="rgba(0,0,0,0.12)"/>
  <!-- BASE of box -->
  <rect x="26" y="160" width="188" height="80" rx="4" fill="${mid}" filter="url(#${id}sh)"/>
  <!-- base right side depth -->
  <path d="M214 160 L222 168 L222 248 L214 240 Z" fill="${dark}"/>
  <!-- base bottom depth -->
  <path d="M26 240 L214 240 L222 248 L34 248 Z" fill="${dark}"/>
  <!-- LID (slightly open) - rotated from top -->
  <path d="M26 160 L214 160 L214 90 Q214 80 120 75 Q26 80 26 90 Z" fill="${mid}"/>
  <!-- lid right side -->
  <path d="M214 90 L222 98 L222 168 L214 160 Z" fill="${dark}"/>
  <!-- lid inner face (visible when open) -->
  <path d="M30 158 L210 158 L210 92 Q210 84 120 80 Q30 84 30 92 Z" fill="${light}" opacity="0.5"/>
  <!-- lid outer highlight line -->
  <path d="M26 90 Q120 75 214 90" stroke="rgba(255,255,255,0.3)" stroke-width="1.5" fill="none"/>
  <!-- satin ribbon across lid -->
  <path d="M26 128 L214 128 L214 138 L26 138 Z" fill="rgba(201,168,76,0.85)" rx="1"/>
  <!-- ribbon across base front -->
  <rect x="26" y="192" width="188" height="9" fill="rgba(201,168,76,0.85)" rx="1"/>
  <!-- ribbon right side -->
  <path d="M214 128 L222 136 L222 145 L214 137 Z" fill="rgba(201,168,76,0.7)"/>
  <path d="M214 192 L222 200 L222 209 L214 201 Z" fill="rgba(201,168,76,0.7)"/>
  <!-- BOW centre of lid -->
  <path d="M105 132 Q88 112 76 117 Q70 126 90 132 Z" fill="#C9A84C"/>
  <path d="M118 132 Q135 112 147 117 Q153 126 133 132 Z" fill="#C9A84C"/>
  <ellipse cx="112" cy="133" rx="9" ry="6" fill="#A8872E"/>
  <path d="M107 139 Q100 150 97 158" stroke="#C9A84C" stroke-width="3" stroke-linecap="round" fill="none"/>
  <path d="M117 139 Q124 150 127 158" stroke="#C9A84C" stroke-width="3" stroke-linecap="round" fill="none"/>
  <!-- brand mark on base -->
  <text x="60" y="213" font-size="8" fill="rgba(255,255,255,0.25)" font-family="serif" letter-spacing="2">CRATES &amp; BOXES</text>
  <!-- magnetic closure dots -->
  <circle cx="70" cy="160" r="3" fill="rgba(255,255,255,0.3)"/>
  <circle cx="170" cy="160" r="3" fill="rgba(255,255,255,0.3)"/>
</svg>`;
}

// ── HEART BOX ────────────────────────────────────────────────────────────────
function heartBoxSVG(color) {
  const c = color || '#DC2626';
  const light = lighten(c, 55);
  const dark  = darken(c, 50);
  const id    = 'hrt' + c.replace('#','');
  return `<svg viewBox="0 0 240 260" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
  <defs>
    <radialGradient id="${id}g" cx="35%" cy="25%" r="70%">
      <stop offset="0%" stop-color="${light}"/>
      <stop offset="100%" stop-color="${c}"/>
    </radialGradient>
    <filter id="${id}sh">
      <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="rgba(0,0,0,0.3)"/>
    </filter>
  </defs>
  <!-- shadow -->
  <ellipse cx="120" cy="248" rx="88" ry="10" fill="rgba(0,0,0,0.15)"/>
  <!-- heart body depth (bottom edge) -->
  <path d="M120 220 Q40 170 28 120 Q20 75 55 60 Q80 50 100 70 Q110 80 120 92 Q130 80 140 70 Q160 50 185 60 Q220 75 212 120 Q200 170 120 220 Z"
        fill="${dark}" transform="translate(0 18)"/>
  <!-- heart body top face -->
  <path d="M120 220 Q40 170 28 120 Q20 75 55 60 Q80 50 100 70 Q110 80 120 92 Q130 80 140 70 Q160 50 185 60 Q220 75 212 120 Q200 170 120 220 Z"
        fill="url(#${id}g)" filter="url(#${id}sh)"/>
  <!-- heart inner highlight -->
  <path d="M120 196 Q58 155 48 114 Q42 83 66 72 Q85 64 100 80 Q110 90 120 102 Q130 90 140 80 Q155 64 174 72 Q198 83 192 114 Q182 155 120 196 Z"
        fill="${light}" opacity="0.12"/>
  <!-- satin ribbon across heart -->
  <path d="M52 118 Q120 112 188 118 L188 128 Q120 122 52 128 Z" fill="rgba(201,168,76,0.85)"/>
  <!-- BOW at top centre -->
  <path d="M111 103 Q94 84 82 88 Q75 97 94 103 Z" fill="#C9A84C"/>
  <path d="M129 103 Q146 84 158 88 Q165 97 146 103 Z" fill="#C9A84C"/>
  <ellipse cx="120" cy="104" rx="9" ry="6" fill="#A8872E"/>
  <path d="M115 110 Q108 122 105 130" stroke="#C9A84C" stroke-width="3" stroke-linecap="round" fill="none"/>
  <path d="M125 110 Q132 122 135 130" stroke="#C9A84C" stroke-width="3" stroke-linecap="round" fill="none"/>
  <!-- shine highlight -->
  <path d="M68 85 Q80 75 96 82" stroke="rgba(255,255,255,0.35)" stroke-width="4" stroke-linecap="round" fill="none"/>
</svg>`;
}

// ── WINE BOX ─────────────────────────────────────────────────────────────────
function wineBoxSVG(color) {
  const c = color || '#1A1A1A';
  const light = lighten(c, 60);
  const dark  = darken(c, 45);
  const mid   = darken(c, 18);
  const id    = 'wb' + c.replace('#','');
  return `<svg viewBox="0 0 240 260" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
  <defs>
    <filter id="${id}sh">
      <feDropShadow dx="3" dy="6" stdDeviation="7" flood-color="rgba(0,0,0,0.3)"/>
    </filter>
  </defs>
  <!-- shadow -->
  <ellipse cx="120" cy="248" rx="88" ry="9" fill="rgba(0,0,0,0.15)"/>
  <!-- box body right face -->
  <path d="M185 82 L205 70 L205 240 L185 228 Z" fill="${dark}" filter="url(#${id}sh)"/>
  <!-- box body bottom face -->
  <path d="M35 228 L185 228 L205 240 L55 240 Z" fill="${dark}"/>
  <!-- box body front face -->
  <rect x="35" y="82" width="150" height="146" rx="2" fill="${mid}"/>
  <!-- box body top rim -->
  <path d="M35 82 L55 70 L205 70 L185 82 Z" fill="${light}"/>
  <!-- LID front face -->
  <rect x="32" y="58" width="156" height="28" rx="3" fill="${mid}"/>
  <!-- lid top face -->
  <path d="M32 58 L53 46 L210 46 L188 58 Z" fill="${light}"/>
  <!-- lid right face -->
  <path d="M188 58 L210 46 L210 74 L188 86 Z" fill="${dark}"/>
  <!-- ribbon on box -->
  <rect x="35" y="148" width="150" height="9" fill="rgba(201,168,76,0.85)"/>
  <path d="M185 148 L205 136 L205 145 L185 157 Z" fill="rgba(201,168,76,0.7)"/>
  <!-- BOW -->
  <path d="M106 152 Q90 134 78 138 Q72 147 91 153 Z" fill="#C9A84C"/>
  <path d="M118 152 Q134 134 146 138 Q152 147 133 153 Z" fill="#C9A84C"/>
  <ellipse cx="112" cy="153" rx="8" ry="5" fill="#A8872E"/>
  <path d="M108 158 Q102 168 99 176" stroke="#C9A84C" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <path d="M116 158 Q122 168 125 176" stroke="#C9A84C" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <!-- logo area -->
  <rect x="55" y="98" width="115" height="38" rx="2" fill="rgba(255,255,255,0.06)"/>
  <text x="75" y="114" font-size="8" fill="rgba(255,255,255,0.4)" font-family="serif" letter-spacing="1">CRATES</text>
  <text x="75" y="127" font-size="8" fill="rgba(255,255,255,0.4)" font-family="serif" letter-spacing="1">&amp; BOXES</text>
  <!-- lid shine -->
  <path d="M52 52 L170 52" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" fill="none"/>
</svg>`;
}

// ── RECTANGLE / FLAT GIFT BOX ─────────────────────────────────────────────────
function rectangleBoxSVG(color) {
  const c = color || '#D4A853';
  const light = lighten(c, 55);
  const dark  = darken(c, 40);
  const mid   = darken(c, 15);
  const id    = 'rb' + c.replace('#','');
  return `<svg viewBox="0 0 240 260" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
  <defs>
    <filter id="${id}sh">
      <feDropShadow dx="3" dy="7" stdDeviation="8" flood-color="rgba(0,0,0,0.25)"/>
    </filter>
  </defs>
  <!-- shadow -->
  <ellipse cx="120" cy="248" rx="90" ry="10" fill="rgba(0,0,0,0.12)"/>
  <!-- BASE right face -->
  <path d="M182 148 L210 132 L210 232 L182 216 Z" fill="${dark}" filter="url(#${id}sh)"/>
  <!-- BASE bottom -->
  <path d="M30 216 L182 216 L210 232 L58 232 Z" fill="${dark}"/>
  <!-- BASE front face -->
  <path d="M30 148 L182 148 L182 216 L30 216 Z" fill="${mid}"/>
  <!-- BASE top rim -->
  <path d="M30 148 L58 132 L210 132 L182 148 Z" fill="${light}"/>
  <!-- LID right -->
  <path d="M182 106 L212 90 L212 134 L182 150 Z" fill="${dark}"/>
  <!-- LID front -->
  <path d="M26 106 L182 106 L182 150 L26 150 Z" fill="${mid}"/>
  <!-- LID top -->
  <path d="M26 106 L56 90 L212 90 L182 106 Z" fill="${light}"/>
  <!-- LID top highlight -->
  <path d="M26 106 L56 90 L212 90" stroke="rgba(255,255,255,0.25)" stroke-width="1.5" fill="none"/>
  <!-- ribbon on lid front -->
  <rect x="26" y="120" width="156" height="9" fill="rgba(201,168,76,0.85)"/>
  <!-- ribbon on lid top -->
  <path d="M102 90 L112 90 L112 106 L102 106 Z" fill="rgba(201,168,76,0.85)"/>
  <!-- ribbon right of lid -->
  <path d="M182 120 L212 104 L212 113 L182 129 Z" fill="rgba(201,168,76,0.7)"/>
  <!-- ribbon on base front -->
  <rect x="30" y="180" width="152" height="8" fill="rgba(201,168,76,0.85)"/>
  <!-- BOW on lid -->
  <path d="M107 120 Q90 100 78 105 Q72 114 92 120 Z" fill="#C9A84C"/>
  <path d="M119 120 Q136 100 148 105 Q154 114 134 120 Z" fill="#C9A84C"/>
  <ellipse cx="113" cy="121" rx="8" ry="5" fill="#A8872E"/>
  <path d="M109 126 L104 137" stroke="#C9A84C" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <path d="M117 126 L122 137" stroke="#C9A84C" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <!-- branding on base -->
  <text x="52" y="198" font-size="8" fill="rgba(255,255,255,0.2)" font-family="serif" letter-spacing="2">CRATES &amp; BOXES</text>
</svg>`;
}

// ── BOUQUET / OPEN-TOP BOX WITH RIBBON HANDLE ───────────────────────────────
function bouquetBoxSVG(color) {
  const c = color || '#F9F3EC';
  const light = lighten(c, 30);
  const dark  = darken(c, 55);
  const mid   = darken(c, 25);
  const id    = 'bq' + c.replace('#','');
  return `<svg viewBox="0 0 240 260" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
  <defs>
    <filter id="${id}sh">
      <feDropShadow dx="2" dy="7" stdDeviation="8" flood-color="rgba(0,0,0,0.2)"/>
    </filter>
  </defs>
  <!-- shadow -->
  <ellipse cx="120" cy="248" rx="85" ry="10" fill="rgba(0,0,0,0.12)"/>
  <!-- box right face -->
  <path d="M178 115 L208 100 L208 232 L178 217 Z" fill="${dark}" filter="url(#${id}sh)"/>
  <!-- box bottom face -->
  <path d="M32 217 L178 217 L208 232 L62 232 Z" fill="${dark}"/>
  <!-- box front face -->
  <rect x="32" y="115" width="146" height="102" rx="2" fill="${mid}"/>
  <!-- open top interior -->
  <path d="M32 115 L62 100 L208 100 L178 115 Z" fill="${dark}" opacity="0.6"/>
  <!-- inner box walls visible from top -->
  <rect x="36" y="117" width="138" height="98" rx="1" fill="${dark}" opacity="0.3"/>
  <!-- flower suggestion inside box -->
  <circle cx="80" cy="108" r="12" fill="#E879A0" opacity="0.75"/>
  <circle cx="100" cy="104" r="10" fill="#FCA5A5" opacity="0.75"/>
  <circle cx="120" cy="106" r="13" fill="#F9A8D4" opacity="0.75"/>
  <circle cx="142" cy="103" r="11" fill="#FDA4AF" opacity="0.8"/>
  <circle cx="160" cy="108" r="9" fill="#FBCFE8" opacity="0.75"/>
  <circle cx="90" cy="100" r="7" fill="#86EFAC" opacity="0.6"/>
  <circle cx="150" cy="98" r="6" fill="#86EFAC" opacity="0.6"/>
  <!-- ribbon handle left -->
  <path d="M65 115 Q50 80 58 55 Q63 42 72 48 Q78 55 70 80 L68 115 Z"
        fill="rgba(201,168,76,0.8)" stroke="rgba(201,168,76,0.5)" stroke-width="1"/>
  <!-- ribbon handle right -->
  <path d="M170 115 Q185 80 177 55 Q172 42 163 48 Q157 55 165 80 L167 115 Z"
        fill="rgba(201,168,76,0.8)" stroke="rgba(201,168,76,0.5)" stroke-width="1"/>
  <!-- ribbon handles tied at top -->
  <path d="M70 52 Q95 38 120 35 Q145 38 165 52" stroke="#C9A84C" stroke-width="5" stroke-linecap="round" fill="none"/>
  <!-- bow at top of handle -->
  <path d="M112 36 Q98 20 88 24 Q82 32 100 37 Z" fill="#C9A84C"/>
  <path d="M128 36 Q142 20 152 24 Q158 32 140 37 Z" fill="#C9A84C"/>
  <ellipse cx="120" cy="37" rx="9" ry="6" fill="#A8872E"/>
  <!-- ribbon stripe across front of box -->
  <rect x="32" y="162" width="146" height="8" fill="rgba(201,168,76,0.7)"/>
  <path d="M178 162 L208 147 L208 155 L178 170 Z" fill="rgba(201,168,76,0.5)"/>
</svg>`;
}

// ── MINI HAT BOX (smaller version) ───────────────────────────────────────────
function miniHatBoxSVG(color) {
  const c = color || '#D4A853';
  const light = lighten(c, 60);
  const dark  = darken(c, 42);
  const mid   = darken(c, 15);
  const id    = 'mhb' + c.replace('#','');
  return `<svg viewBox="0 0 240 260" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
  <defs>
    <linearGradient id="${id}s" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${dark}"/>
      <stop offset="50%" stop-color="${mid}"/>
      <stop offset="100%" stop-color="${dark}"/>
    </linearGradient>
    <radialGradient id="${id}t" cx="40%" cy="30%" r="60%">
      <stop offset="0%" stop-color="${light}"/>
      <stop offset="100%" stop-color="${mid}"/>
    </radialGradient>
    <filter id="${id}sh">
      <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="rgba(0,0,0,0.2)"/>
    </filter>
  </defs>
  <!-- shadow -->
  <ellipse cx="120" cy="248" rx="70" ry="10" fill="rgba(0,0,0,0.12)"/>
  <!-- body -->
  <path d="M50 148 L50 208 Q50 224 120 224 Q190 224 190 208 L190 148" fill="url(#${id}s)" filter="url(#${id}sh)"/>
  <ellipse cx="120" cy="208" rx="70" ry="16" fill="${dark}"/>
  <ellipse cx="120" cy="148" rx="70" ry="16" fill="${mid}"/>
  <!-- lid -->
  <path d="M42 136 L42 152 Q42 170 120 170 Q198 170 198 152 L198 136" fill="${mid}"/>
  <ellipse cx="120" cy="152" rx="78" ry="18" fill="${dark}"/>
  <ellipse cx="120" cy="136" rx="78" ry="18" fill="url(#${id}t)"/>
  <!-- striped pattern on lid -->
  <ellipse cx="120" cy="136" rx="68" ry="15" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="6"/>
  <ellipse cx="120" cy="136" rx="50" ry="11" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="5"/>
  <!-- ribbon -->
  <rect x="114" y="114" width="12" height="22" fill="rgba(201,168,76,0.85)" rx="2"/>
  <path d="M42 142 Q120 136 198 142 L198 150 Q120 144 42 150 Z" fill="rgba(201,168,76,0.85)"/>
  <!-- bow -->
  <path d="M114 140 Q98 122 86 126 Q78 135 97 141 Z" fill="#C9A84C"/>
  <path d="M126 140 Q142 122 154 126 Q162 135 143 141 Z" fill="#C9A84C"/>
  <ellipse cx="120" cy="140" rx="8" ry="6" fill="#A8872E"/>
  <path d="M116 146 L110 158" stroke="#C9A84C" stroke-width="2.5" stroke-linecap="round" fill="none"/>
  <path d="M124 146 L130 158" stroke="#C9A84C" stroke-width="2.5" stroke-linecap="round" fill="none"/>
</svg>`;
}

// ── FLOWER CAKE BOX (open top round) ─────────────────────────────────────────
function flowerCakeBoxSVG(color) {
  const c = color || '#FDF2F8';
  const dark  = darken(c, 55);
  const mid   = darken(c, 25);
  const id    = 'fc' + c.replace('#','');
  return `<svg viewBox="0 0 240 260" fill="none" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
  <defs>
    <filter id="${id}sh">
      <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="rgba(0,0,0,0.2)"/>
    </filter>
  </defs>
  <!-- shadow -->
  <ellipse cx="120" cy="248" rx="82" ry="10" fill="rgba(0,0,0,0.12)"/>
  <!-- body cylinder -->
  <path d="M38 148 L38 218 Q38 232 120 232 Q202 232 202 218 L202 148" fill="${mid}" filter="url(#${id}sh)"/>
  <ellipse cx="120" cy="218" rx="82" ry="14" fill="${dark}"/>
  <!-- open top rim -->
  <ellipse cx="120" cy="148" rx="82" ry="14" fill="${dark}"/>
  <ellipse cx="120" cy="144" rx="78" ry="12" fill="${mid}"/>
  <!-- inside top view -->
  <ellipse cx="120" cy="144" rx="74" ry="10" fill="${dark}" opacity="0.6"/>
  <!-- flowers inside box (visible from top) -->
  <circle cx="100" cy="142" r="14" fill="#F472B6" opacity="0.9"/>
  <circle cx="122" cy="138" r="16" fill="#FB7185" opacity="0.9"/>
  <circle cx="144" cy="142" r="13" fill="#E879A0" opacity="0.9"/>
  <circle cx="110" cy="136" r="10" fill="#FCA5A5" opacity="0.85"/>
  <circle cx="133" cy="133" r="9" fill="#FBCFE8" opacity="0.85"/>
  <circle cx="115" cy="130" r="6" fill="white" opacity="0.6"/>
  <!-- leaves -->
  <path d="M90 148 Q85 138 92 134" stroke="#4ADE80" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M150 148 Q155 138 148 134" stroke="#4ADE80" stroke-width="3" fill="none" stroke-linecap="round"/>
  <!-- ribbon around box -->
  <path d="M38 180 Q120 174 202 180 L202 189 Q120 183 38 189 Z" fill="rgba(201,168,76,0.8)"/>
  <!-- tiny bow -->
  <path d="M114 183 Q104 172 96 175 Q91 181 102 184 Z" fill="#C9A84C"/>
  <path d="M126 183 Q136 172 144 175 Q149 181 138 184 Z" fill="#C9A84C"/>
  <ellipse cx="120" cy="184" rx="7" ry="5" fill="#A8872E"/>
</svg>`;
}

// ── DISPATCH MAP ──────────────────────────────────────────────────────────────
const BOX_ILLUSTRATIONS = {
  'hat':        hatBoxSVG,
  'mini-hat':   miniHatBoxSVG,
  'square':     squareBoxSVG,
  'clamshell':  clamshellBoxSVG,
  'heart':      heartBoxSVG,
  'wine':       wineBoxSVG,
  'rectangle':  rectangleBoxSVG,
  'bouquet':    bouquetBoxSVG,
  'flower-cake': flowerCakeBoxSVG,
};

function getBoxIllustration(boxType, color) {
  const fn = BOX_ILLUSTRATIONS[boxType] || rectangleBoxSVG;
  return fn(color);
}
