/* UVIT: THE LAST DETECTION — pixel art and pixel font.
   Sprites are text maps: each character is a palette key and '.' is transparent.
   A 1-px dark outline is added automatically. Edit a map and reload to redesign. */

const PAL = {
  h: '#2a1838', H: '#5a3a78',            // hair, hair highlight
  s: '#c98a5c', S: '#a5683f',            // skin, skin shade
  e: '#140c26', m: '#7a2440',            // eyes, mouth
  w: '#f1efff', g: '#b4b1e0',            // lab coat, coat shade
  p: '#363b7c',                          // trousers
  b: '#ff4fa0', B: '#ffd3e8',            // sneakers, soles (also the heart colour)
  c: '#3ad6ff',                          // the UV-blue coffee mug
  r: '#ff5470', o: '#ffb03c',            // false-positive creatures
  q: '#3a2a5a',                          // empty heart
};
const OUTLINE = '#0a0618';

const HEAD = [
  '...hhhhh....',
  '..hhhhhhh...',
  '.hhHHhhhhh..',
  '.hhhhsssss..',
  '.hhhsseses..',
  '.hhhsssssS..',
  '..hh.ssmS...',
];
const BODY = [
  '....wwww....',
  '...wwwwww.c.',
  '...wgwwwwscc',
  '...wgwwww.cc',
  '...wgwwww...',
  '...wwwwwww..',
  '...wwppwww..',
];

const MAPS = {
  runA: [...HEAD, ...BODY,
    '....pp.pp...',
    '...pp...pp..',
    '..pp.....pp.',
    '..p.......p.',
    '.bb.......bb',
    '.BB.......BB'],
  runB: [...HEAD, ...BODY,
    '....pppp....',
    '....pp.p....',
    '....pp.pp...',
    '....pp..p...',
    '...bbb.bb...',
    '...BBB.BB...'],
  jump: [...HEAD, ...BODY,
    '...pppppp...',
    '..pp....pp..',
    '.bb.....pp..',
    '.BB....bb...',
    '.......BB...',
    '............'],
  hit: [
    HEAD[0], HEAD[1], HEAD[2], HEAD[3],
    '.hhhssrsrs..',
    HEAD[5],
    '..hh.smmS...',
    ...BODY,
    '....pp.pp...',
    '....pp.pp...',
    '....pp.pp...',
    '....pp.pp...',
    '...bbb.bbb..',
    '...BBB.BBB..'],
  slide: [
    '...hhhhh..........',
    '..hhhhhhh.........',
    '.hhHHhhhhh........',
    '.hhhhsssss........',
    '.hhhsseses...c....',
    '..hhssssmS..scc...',
    '...wwwwwwwwws.....',
    '..wgwwwwwwwppppp..',
    '..wgwwwwwpppppppbb',
    '...wwww.......pBBB'],
  fpA: [
    '..rrrr..',
    '.rrrrrr.',
    'rewrrrrr',
    'rwwrrrrr',
    'rrrrrrrr',
    '.roorro.',
    '.r....r.'],
  fpB: [
    '........',
    '.rrrrrr.',
    'rewrrrrr',
    'rwwrrrrr',
    'rrrrrrrr',
    '.roorro.',
    '..r..r..'],
  heart: ['.bb.bb.', 'bbbbbbb', 'bbbbbbb', '.bbbbb.', '..bbb..', '...b...'],
  heartEmpty: ['.qq.qq.', 'qqqqqqq', 'qqqqqqq', '.qqqqq.', '..qqq..', '...q...'],
};

function makeSprite(rows, outline = OUTLINE) {
  const h = rows.length;
  const w = Math.max(...rows.map((r) => r.length));
  const pad = outline ? 1 : 0;
  const c = document.createElement('canvas');
  c.width = w + pad * 2;
  c.height = h + pad * 2;
  const g = c.getContext('2d');
  const solid = (x, y) => y >= 0 && y < h && x >= 0 && x < w && rows[y][x] !== undefined && rows[y][x] !== '.';
  if (outline) {
    g.fillStyle = outline;
    for (let y = -1; y <= h; y++) {
      for (let x = -1; x <= w; x++) {
        if (!solid(x, y) && (solid(x - 1, y) || solid(x + 1, y) || solid(x, y - 1) || solid(x, y + 1))) g.fillRect(x + 1, y + 1, 1, 1);
      }
    }
  }
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (!solid(x, y)) continue;
      g.fillStyle = PAL[rows[y][x]] || '#ff00ff';
      g.fillRect(x + pad, y + pad, 1, 1);
    }
  }
  return c;
}

function makeGalaxy(w, h, tilt) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d');
  const cx = w / 2, cy = h / 2;
  for (let arm = 0; arm < 2; arm++) {
    for (let t = 0; t < 26; t++) {
      const a = t * 0.32 + arm * Math.PI;
      const r = t * 0.28;
      g.fillStyle = t < 6 ? '#e8e0ff' : t < 16 ? '#a995ff' : '#5d47c4';
      g.fillRect(Math.round(cx + Math.cos(a) * r * 1.5), Math.round(cy + Math.sin(a) * r * 0.55 * tilt), 1, 1);
    }
  }
  g.fillStyle = '#ffffff';
  g.fillRect(Math.round(cx) - 1, Math.round(cy), 2, 1);
  return c;
}

function buildSprites() {
  const out = {};
  for (const k in MAPS) out[k] = makeSprite(MAPS[k]);
  out.galaxyA = makeGalaxy(26, 12, 1);
  out.galaxyB = makeGalaxy(20, 10, 0.6);
  return out;
}

/* ---------- 3x5 pixel font (each row: 4 = left, 2 = middle, 1 = right) ---------- */
const FONT = {
  A: [2, 5, 7, 5, 5], B: [6, 5, 6, 5, 6], C: [3, 4, 4, 4, 3], D: [6, 5, 5, 5, 6], E: [7, 4, 6, 4, 7],
  F: [7, 4, 6, 4, 4], G: [3, 4, 5, 5, 3], H: [5, 5, 7, 5, 5], I: [7, 2, 2, 2, 7], J: [1, 1, 1, 5, 2],
  K: [5, 5, 6, 5, 5], L: [4, 4, 4, 4, 7], M: [5, 7, 7, 5, 5], N: [6, 5, 5, 5, 5], O: [2, 5, 5, 5, 2],
  P: [6, 5, 6, 4, 4], Q: [2, 5, 5, 6, 3], R: [6, 5, 6, 5, 5], S: [3, 4, 2, 1, 6], T: [7, 2, 2, 2, 2],
  U: [5, 5, 5, 5, 7], V: [5, 5, 5, 5, 2], W: [5, 5, 7, 7, 5], X: [5, 5, 2, 5, 5], Y: [5, 5, 2, 2, 2],
  Z: [7, 1, 2, 4, 7],
  0: [7, 5, 5, 5, 7], 1: [2, 6, 2, 2, 7], 2: [6, 1, 2, 4, 7], 3: [6, 1, 2, 1, 6], 4: [5, 5, 7, 1, 1],
  5: [7, 4, 6, 1, 6], 6: [3, 4, 7, 5, 7], 7: [7, 1, 1, 2, 2], 8: [7, 5, 7, 5, 7], 9: [7, 5, 7, 1, 6],
  ' ': [0, 0, 0, 0, 0], '.': [0, 0, 0, 0, 2], ',': [0, 0, 0, 2, 4], ':': [0, 2, 0, 2, 0], '!': [2, 2, 2, 0, 2],
  '?': [6, 1, 2, 0, 2], '-': [0, 0, 7, 0, 0], '%': [5, 1, 2, 4, 5], '/': [1, 1, 2, 4, 4], '+': [0, 2, 7, 2, 0],
  "'": [2, 2, 0, 0, 0], '"': [5, 5, 0, 0, 0], '(': [1, 2, 2, 2, 1], ')': [4, 2, 2, 2, 4], '=': [0, 7, 0, 7, 0],
  _: [0, 0, 0, 0, 7], '#': [5, 7, 5, 7, 5], '<': [1, 2, 4, 2, 1], '>': [4, 2, 1, 2, 4], '[': [3, 2, 2, 2, 3],
  ']': [6, 2, 2, 2, 6], '*': [0, 5, 2, 5, 0],
};

function textWidth(str, scale = 1) {
  const n = String(str).length;
  return n ? (n * 4 - 1) * scale : 0;
}

function drawTextRaw(g, str, x, y, color, s) {
  g.fillStyle = color;
  let cx = x;
  for (const ch of str) {
    const gl = FONT[ch] || FONT['?'];
    for (let r = 0; r < 5; r++) {
      const bits = gl[r];
      if (bits & 4) g.fillRect(cx, y + r * s, s, s);
      if (bits & 2) g.fillRect(cx + s, y + r * s, s, s);
      if (bits & 1) g.fillRect(cx + 2 * s, y + r * s, s, s);
    }
    cx += 4 * s;
  }
}

function drawText(g, str, x, y, color, opts = {}) {
  str = String(str).toUpperCase();
  const s = opts.scale || 1;
  const w = textWidth(str, s);
  if (opts.align === 'center') x -= Math.floor(w / 2);
  else if (opts.align === 'right') x -= w;
  if (opts.shadow) drawTextRaw(g, str, x + s, y + s, opts.shadow, s);
  drawTextRaw(g, str, x, y, color, s);
}

function wrapText(str, maxChars) {
  const words = String(str).split(' ');
  const lines = [];
  let line = '';
  for (const w of words) {
    if ((line + ' ' + w).trim().length > maxChars) { if (line) lines.push(line); line = w; }
    else line = (line + ' ' + w).trim();
  }
  if (line) lines.push(line);
  return lines;
}
