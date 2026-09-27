/* Pixel art: every sprite is drawn in code at native resolution, then outlined. */
(function () {
  const A = (window.ART = {});
  const OUTLINE = '#2a1a10';

  const cv = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
  A.cv = cv;

  function rng(seed) { let s = (seed >>> 0) || 1; return () => { s ^= s << 13; s >>>= 0; s ^= s >> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; }
  A.rng = rng;
  function hash(x, y, s) { let h = (x * 374761393 + y * 668265263 + (s || 0) * 1442695041) | 0; h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967296; }
  A.hash = hash;
  const hex = (c) => { c = c.replace('#', ''); return [parseInt(c.slice(0, 2), 16), parseInt(c.slice(2, 4), 16), parseInt(c.slice(4, 6), 16)]; };
  const toHex = (r, g, b) => '#' + [r, g, b].map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('');
  A.shade = (c, k) => { const [r, g, b] = hex(c); return k < 0 ? toHex(r * (1 + k), g * (1 + k), b * (1 + k)) : toHex(r + (255 - r) * k, g + (255 - g) * k, b + (255 - b) * k); };
  const shade = A.shade;

  function pen(ctx) {
    return {
      r(x, y, w, h, c) { ctx.fillStyle = c; ctx.fillRect(x, y, w, h); },
      p(x, y, c) { ctx.fillStyle = c; ctx.fillRect(x, y, 1, 1); },
      clear(x, y, w = 1, h = 1) { ctx.clearRect(x, y, w, h); },
    };
  }

  function outline(c, col = OUTLINE) {
    const w = c.width, h = c.height, ctx = c.getContext('2d');
    const img = ctx.getImageData(0, 0, w, h), d = img.data, out = new Uint8ClampedArray(d);
    const [R, G, B] = hex(col);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4; if (d[i + 3] > 0) continue;
      if ((x > 0 && d[i - 4 + 3]) || (x < w - 1 && d[i + 4 + 3]) || (y > 0 && d[i - w * 4 + 3]) || (y < h - 1 && d[i + w * 4 + 3])) {
        out[i] = R; out[i + 1] = G; out[i + 2] = B; out[i + 3] = 255;
      }
    }
    img.data.set(out); ctx.putImageData(img, 0, 0); return c;
  }
  A.outline = outline;

  const cache = new Map();
  const memo = (key, fn) => { if (!cache.has(key)) cache.set(key, fn()); return cache.get(key); };

  /* ---------------- CHARACTERS ----------------
     cfg: skin, hair, hat, band, brim ('cowboy'|'sombrero'|'none'|'bonnet'), shirt, vest, pants, boots,
          beard ('none'|'stubble'|'mustache'|'full'), beardCol, dress (bool), long (long hair), badge, apron, tall */
  const DEF = { skin: '#e8b58a', hair: '#5a3a22', hat: '#8a6a44', band: '#4a3322', brim: 'cowboy', shirt: '#8a9ab0', vest: null, pants: '#5a4a38', boots: '#3a2616', beard: 'none', beardCol: null };

  function hatSide(P, c, x0, y0) {
    if (c.brim === 'none') return;
    if (c.brim === 'sombrero') { P.r(x0 + 4, y0 - 1, 8, 4, c.hat); P.r(x0 + 4, y0 + 2, 8, 1, c.band); P.r(x0 + 0, y0 + 3, 17, 2, shade(c.hat, -0.15)); P.r(x0 + 1, y0 + 3, 15, 1, c.hat); return; }
    if (c.brim === 'bonnet') { P.r(x0 + 4, y0 + 1, 8, 5, c.hat); P.r(x0 + 10, y0 + 2, 3, 5, shade(c.hat, -0.12)); return; }
    if (c.brim === 'tophat') { P.r(x0 + 6, y0 - 3, 6, 7, c.hat); P.r(x0 + 6, y0 + 2, 6, 1, c.band); P.r(x0 + 4, y0 + 4, 10, 1, shade(c.hat, -0.2)); return; }
    if (c.brim === 'bandana') { P.r(x0 + 5, y0 + 4, 7, 2, c.hat); P.r(x0 + 4, y0 + 5, 2, 3, c.hat); return; }
    if (c.brim === 'cap') { P.r(x0 + 5, y0 + 2, 7, 3, c.hat); P.r(x0 + 11, y0 + 4, 3, 1, shade(c.hat, -0.25)); P.r(x0 + 5, y0 + 4, 6, 1, c.band); return; }
    if (c.brim === 'bowler') { P.r(x0 + 6, y0 + 1, 6, 3, c.hat); P.r(x0 + 7, y0 + 0, 4, 1, c.hat); P.r(x0 + 4, y0 + 4, 10, 1, shade(c.hat, -0.15)); return; }
    P.r(x0 + 5, y0 + 1, 7, 3, c.hat); P.p(x0 + 5, y0 + 1, shade(c.hat, 0.2)); P.r(x0 + 5, y0 + 3, 7, 1, c.band);
    P.r(x0 + 3, y0 + 4, 12, 1, shade(c.hat, -0.12)); P.r(x0 + 4, y0 + 4, 10, 1, c.hat);
  }
  function hatFront(P, c, x0, y0) {
    if (c.brim === 'none') return;
    if (c.brim === 'sombrero') { P.r(x0 + 5, y0 - 1, 6, 4, c.hat); P.r(x0 + 5, y0 + 2, 6, 1, c.band); P.r(x0 - 1, y0 + 3, 18, 2, c.hat); P.r(x0 - 1, y0 + 4, 18, 1, shade(c.hat, -0.18)); return; }
    if (c.brim === 'bonnet') { P.r(x0 + 3, y0 + 1, 10, 4, c.hat); P.r(x0 + 3, y0 + 5, 2, 5, c.hat); P.r(x0 + 11, y0 + 5, 2, 5, c.hat); return; }
    if (c.brim === 'tophat') { P.r(x0 + 5, y0 - 3, 6, 7, c.hat); P.r(x0 + 5, y0 + 2, 6, 1, c.band); P.r(x0 + 3, y0 + 4, 10, 1, shade(c.hat, -0.2)); return; }
    if (c.brim === 'bandana') { P.r(x0 + 4, y0 + 3, 8, 3, c.hair); P.r(x0 + 4, y0 + 5, 8, 1, c.hat); return; }
    if (c.brim === 'cap') { P.r(x0 + 4, y0 + 2, 8, 3, c.hat); P.r(x0 + 4, y0 + 4, 8, 1, c.band); P.r(x0 + 5, y0 + 5, 6, 1, shade(c.hat, -0.25)); return; }
    if (c.brim === 'bowler') { P.r(x0 + 5, y0 + 1, 6, 3, c.hat); P.r(x0 + 6, y0 + 0, 4, 1, c.hat); P.r(x0 + 3, y0 + 4, 10, 1, shade(c.hat, -0.15)); return; }
    P.r(x0 + 5, y0 + 0, 6, 4, c.hat); P.r(x0 + 6, y0 + 0, 4, 1, shade(c.hat, 0.2)); P.r(x0 + 5, y0 + 3, 6, 1, c.band);
    P.r(x0 + 2, y0 + 4, 12, 1, c.hat); P.r(x0 + 2, y0 + 5, 12, 1, shade(c.hat, -0.15)); P.p(x0 + 1, y0 + 4, shade(c.hat, -0.15)); P.p(x0 + 14, y0 + 4, shade(c.hat, -0.15));
  }

  // side view, facing right. frame 0..3 walk cycle. canvas 20x28, feet at y=27
  function humanSide(c, f, sitting) {
    const C = cv(20, 28), P = pen(C.getContext('2d'));
    const bob = sitting ? 0 : (f % 2 === 1 ? -1 : 0);
    const x0 = 2, y0 = 2 + bob;
    const bc = c.beardCol || c.hair;
    // head
    P.r(x0 + 5, y0 + 5, 7, 6, c.skin);
    P.r(x0 + 5, y0 + 5, 3, c.long ? 8 : 4, c.hair);
    P.p(x0 + 7, y0 + 8, shade(c.skin, -0.18));
    P.r(x0 + 10, y0 + 7, 1, 2, '#2a1a10');
    P.p(x0 + 12, y0 + 8, c.skin);
    if (c.beard === 'full') { P.r(x0 + 8, y0 + 9, 4, 3, bc); P.p(x0 + 12, y0 + 9, bc); }
    if (c.beard === 'mustache') P.r(x0 + 10, y0 + 9, 3, 1, bc);
    if (c.beard === 'stubble') { P.p(x0 + 9, y0 + 10, shade(c.skin, -0.25)); P.p(x0 + 11, y0 + 10, shade(c.skin, -0.25)); }
    hatSide(P, c, x0, y0);
    // body
    const top = y0 + 11;
    if (c.dress) {
      P.r(x0 + 6, top, 5, 5, c.shirt); P.r(x0 + 5, top + 5, 8, 9 - bob, c.dress === true ? c.shirt : c.dress);
      P.r(x0 + 5, top + 5, 8, 1, shade(c.dress === true ? c.shirt : c.dress, -0.15));
      if (!sitting) { P.r(x0 + 6 + (f === 1 ? 1 : 0), top + 14 - bob, 2, 1, c.boots); P.r(x0 + 10 - (f === 3 ? 1 : 0), top + 14 - bob, 2, 1, c.boots); }
    } else {
      P.r(x0 + 6, top, 5, 6, c.shirt);
      if (c.vest) { P.r(x0 + 6, top, 2, 6, c.vest); P.r(x0 + 10, top, 1, 6, c.vest); }
      if (c.apron) P.r(x0 + 9, top + 1, 2, 9, c.apron);
      if (c.coat) { P.r(x0 + 5, top, 7, 9, c.coat); P.r(x0 + 5, top + 8, 7, 1, shade(c.coat, -0.2)); }
      if (c.bones) { P.p(x0 + 9, top, '#efe6cf'); P.p(x0 + 10, top + 1, '#efe6cf'); }
      if (c.serape) { P.r(x0 + 5, top, 7, 5, c.serape[0]); P.r(x0 + 5, top + 2, 7, 1, c.serape[1]); P.r(x0 + 5, top + 4, 7, 1, c.serape[2] || c.serape[1]); }
      if (c.badge) P.p(x0 + 10, top + 1, '#f0d060');
      P.r(x0 + 6, top + 6, 5, 1, c.belt || '#3a2616');
      if (sitting) {
        P.r(x0 + 8, top + 7, 5, 2, c.pants); P.r(x0 + 11, top + 9, 2, 3, c.pants); P.r(x0 + 11, top + 12, 3, 2, c.boots);
      } else {
        const L = [[0, 0], [2, -2], [0, 0], [-2, 2]][f];
        P.r(x0 + 7 + L[1] * 0.5 | 0, top + 7, 2, 4, shade(c.pants, -0.15));
        P.r(x0 + 7 + L[1], top + 11, 3, 2, shade(c.boots, -0.1));
        P.r(x0 + 8 + L[0] * 0.5 | 0, top + 7, 2, 4, c.pants);
        P.r(x0 + 8 + L[0], top + 11, 3, 2, c.boots);
      }
    }
    // arm
    const sw = sitting ? 1 : [0, 1, 0, -1][f];
    P.r(x0 + 8 + sw, top + 1, 2, 4, shade(c.shirt, -0.18)); P.r(x0 + 8 + sw, top + 5, 2, 1, c.skin);
    return outline(C);
  }

  function humanFront(c, f) {
    const C = cv(20, 28), P = pen(C.getContext('2d'));
    const x0 = 2, y0 = 2;
    const bc = c.beardCol || c.hair;
    P.r(x0 + 4, y0 + 5, 8, 6, c.skin);
    P.r(x0 + 4, y0 + 5, 1, c.long ? 9 : 3, c.hair); P.r(x0 + 11, y0 + 5, 1, c.long ? 9 : 3, c.hair);
    if (c.long) { P.r(x0 + 3, y0 + 6, 1, 8, c.hair); P.r(x0 + 12, y0 + 6, 1, 8, c.hair); }
    if (c.brim === 'none') P.r(x0 + 4, y0 + 3, 8, 3, c.hair);
    if (f === 1) { P.r(x0 + 6, y0 + 8, 1, 1, '#2a1a10'); P.r(x0 + 9, y0 + 8, 1, 1, '#2a1a10'); }
    else { P.r(x0 + 6, y0 + 7, 1, 2, '#2a1a10'); P.r(x0 + 9, y0 + 7, 1, 2, '#2a1a10'); }
    if (c.blush) { P.p(x0 + 5, y0 + 9, c.blush); P.p(x0 + 10, y0 + 9, c.blush); }
    if (c.beard === 'full') { P.r(x0 + 4, y0 + 9, 8, 3, bc); P.r(x0 + 5, y0 + 12, 6, 1, bc); P.r(x0 + 7, y0 + 10, 2, 1, shade(bc, -0.3)); }
    else if (c.beard === 'mustache') { P.r(x0 + 6, y0 + 9, 4, 1, bc); P.p(x0 + 7, y0 + 10, shade(c.skin, -0.3)); }
    else { P.r(x0 + 7, y0 + 10, 2, 1, shade(c.skin, -0.3)); if (c.beard === 'stubble') { P.p(x0 + 5, y0 + 10, shade(c.skin, -0.22)); P.p(x0 + 10, y0 + 10, shade(c.skin, -0.22)); } }
    hatFront(P, c, x0, y0);
    const top = y0 + 11;
    if (c.dress) {
      const dc = c.dress === true ? c.shirt : c.dress;
      P.r(x0 + 4, top, 8, 5, c.shirt); P.r(x0 + 3, top + 5, 10, 9, dc); P.r(x0 + 3, top + 5, 10, 1, shade(dc, -0.15));
      P.r(x0 + 5, top + 14, 2, 1, c.boots); P.r(x0 + 9, top + 14, 2, 1, c.boots);
      P.r(x0 + 3, top, 1, 5, shade(c.shirt, -0.15)); P.r(x0 + 12, top, 1, 5, shade(c.shirt, -0.15));
      P.p(x0 + 3, top + 5, c.skin); P.p(x0 + 12, top + 5, c.skin);
    } else {
      P.r(x0 + 4, top, 8, 6, c.shirt);
      if (c.vest) { P.r(x0 + 4, top, 3, 6, c.vest); P.r(x0 + 9, top, 3, 6, c.vest); }
      if (c.apron) P.r(x0 + 5, top + 2, 6, 9, c.apron);
      if (c.coat) { P.r(x0 + 3, top, 10, 9, c.coat); P.r(x0 + 7, top, 2, 9, shade(c.coat, -0.15)); }
      if (c.bones) { for (let i = 0; i < 6; i++) P.p(x0 + 5 + i, top + 1 + (i === 0 || i === 5 ? 0 : 1), '#efe6cf'); }
      if (c.serape) { P.r(x0 + 3, top, 10, 5, c.serape[0]); P.r(x0 + 3, top + 2, 10, 1, c.serape[1]); P.r(x0 + 3, top + 4, 10, 1, c.serape[2] || c.serape[1]); P.p(x0 + 7, top, c.skin); P.p(x0 + 8, top, c.skin); }
      if (c.tie) { P.p(x0 + 7, top, c.tie); P.p(x0 + 8, top, c.tie); P.p(x0 + 7, top + 1, c.tie); }
      if (c.badge) P.p(x0 + 9, top + 2, '#f0d060');
      P.r(x0 + 3, top, 1, 5, shade(c.shirt, -0.18)); P.r(x0 + 12, top, 1, 5, shade(c.shirt, -0.18));
      P.p(x0 + 3, top + 5, c.skin); P.p(x0 + 12, top + 5, c.skin);
      P.r(x0 + 4, top + 6, 8, 1, c.belt || '#3a2616'); P.p(x0 + 7, top + 6, '#c8a050');
      P.r(x0 + 5, top + 7, 2, 4, c.pants); P.r(x0 + 9, top + 7, 2, 4, c.pants);
      if (c.patches) { P.p(x0 + 5, top + 8, c.patches[0]); P.p(x0 + 10, top + 9, c.patches[1]); P.p(x0 + 6, top + 10, c.patches[1]); }
      if (c.gun) { P.r(x0 + 11, top + 6, 2, 3, '#5a3a22'); P.p(x0 + 11, top + 6, c.gun); }
      P.r(x0 + 5, top + 11, 2, 2, c.boots); P.r(x0 + 9, top + 11, 2, 2, c.boots);
    }
    return outline(C);
  }

  /* ---------------- ANIMALS ---------------- */
  // horse side view facing right, canvas 34x26, hooves at y=25
  function horse(h, f) {
    const C = cv(34, 26), P = pen(C.getContext('2d'));
    const coat = h.coat, dk = shade(coat, -0.2), mane = h.mane || shade(coat, -0.45), lt = shade(coat, 0.15);
    const oy = 3;
    P.r(7, oy + 8, 17, 7, coat); P.r(8, oy + 7, 15, 1, coat); P.r(8, oy + 14, 15, 1, dk);
    P.r(9, oy + 8, 12, 1, lt);
    P.r(22, oy + 6, 4, 7, coat);
    P.r(23, oy + 3, 4, 4, coat); P.r(24, oy + 1, 4, 3, coat);
    P.r(26, oy + 1, 5, 4, coat); P.r(29, oy + 4, 3, 3, shade(coat, -0.1)); P.p(31, oy + 5, '#2a1a10');
    P.p(28, oy + 2, '#1a1008'); P.p(25, oy + 0, coat); P.p(26, oy - 1, coat);
    P.r(22, oy + 1, 2, 7, mane); P.r(23, oy + 0, 2, 1, mane);
    if (h.mule) { P.r(25, oy - 3, 1, 4, coat); P.r(27, oy - 3, 1, 4, dk); P.r(4, oy + 8, 3, 2, 'rgba(0,0,0,0)'); }
    if (h.blaze) P.r(29, oy + 1, 1, 4, '#f4ecd8');
    if (h.muzzle) P.r(29, oy + 4, 3, 3, h.muzzle);
    if (h.dapple) { const r = rng(h.dapple); for (let i = 0; i < 26; i++) P.p(8 + (r() * 16 | 0), oy + 7 + (r() * 7 | 0), r() < 0.5 ? shade(coat, 0.28) : shade(coat, -0.18)); }
    P.r(4, oy + 8, 3, 2, mane); P.r(3, oy + 10, 2, 5, mane); P.p(3, oy + 15, mane);
    const legs = [[8, 0], [11, 0], [20, 0], [23, 0]];
    const sw = [[0, 0, 0, 0], [1, -1, -1, 1], [0, 0, 0, 0], [-1, 1, 1, -1]][f];
    legs.forEach(([x], i) => {
      const lx = x + sw[i];
      P.r(lx, oy + 15, 2, 5, i % 2 ? coat : dk);
      P.r(lx, oy + 20, 2, 1, h.socks && i >= 2 ? '#f4ecd8' : (i % 2 ? coat : dk));
      P.r(lx, oy + 21, 2, 1, '#2a1a10');
    });
    if (h.spots) { const r = rng(h.spots); for (let i = 0; i < 9; i++) P.r(9 + (r() * 12 | 0), oy + 8 + (r() * 5 | 0), 2, 2, '#f4ecd8'); }
    if (h.saddle) { P.r(12, oy + 6, 7, 3, h.saddle); P.r(11, oy + 7, 1, 2, h.saddle); P.r(19, oy + 6, 1, 2, shade(h.saddle, -0.2)); P.r(14, oy + 9, 3, 4, shade(h.saddle, -0.25)); }
    return outline(C);
  }

  // rider + horse composite, 34x40, hooves at y=39
  function mounted(c, h, f) {
    const C = cv(34, 40), ctx = C.getContext('2d');
    const hs = horse({ ...h, saddle: h.saddle || '#6a3a1e' }, f);
    ctx.drawImage(hs, 0, 14);
    const r = humanSide(c, 0, true);
    const bob = f % 2 === 1 ? 1 : 0;
    ctx.drawImage(r, 6, 0 + bob);
    return C;
  }

  function longhorn(k, f) {
    const C = cv(40, 24), P = pen(C.getContext('2d'));
    const coat = k.coat, dk = shade(coat, -0.22), lt = shade(coat, 0.15), oy = 4;
    P.r(8, oy + 7, 18, 7, coat); P.r(9, oy + 6, 16, 1, coat); P.r(9, oy + 13, 16, 1, dk); P.r(10, oy + 7, 12, 1, lt);
    if (k.patch) { P.r(12, oy + 8, 5, 4, k.patch); P.r(19, oy + 9, 3, 3, k.patch); }
    if (k.brindle) for (let i = 10; i < 25; i += 3) P.r(i, oy + 8, 1, 5, dk);
    P.r(25, oy + 8, 3, 5, coat); P.r(27, oy + 9, 4, 5, coat); P.r(30, oy + 12, 2, 2, shade(coat, 0.3)); P.p(29, oy + 10, '#1a1008');
    P.r(21, oy + 7, 22, 1, '#efe6cf'); P.r(20, oy + 6, 2, 1, '#efe6cf'); P.p(19, oy + 5, '#efe6cf'); P.r(33, oy + 7, 5, 1, '#efe6cf');
    P.p(38, oy + 6, '#efe6cf'); P.p(39, oy + 5, '#d8cdb0');
    P.r(6, oy + 7, 2, 1, dk); P.r(5, oy + 8, 1, 5, dk); P.p(4, oy + 13, '#2a1a10');
    const sw = [[0, 0, 0, 0], [1, -1, -1, 1], [0, 0, 0, 0], [-1, 1, 1, -1]][f];
    [9, 12, 21, 24].forEach((x, i) => { P.r(x + sw[i], oy + 14, 2, 4, i % 2 ? coat : dk); P.r(x + sw[i], oy + 18, 2, 1, '#2a1a10'); });
    return outline(C);
  }

  function pig(k, f) {
    const C = cv(18, 13), P = pen(C.getContext('2d'));
    const c = k.coat || '#e9a3a0', dk = shade(c, -0.2);
    P.r(3, 3, 10, 6, c); P.r(4, 2, 8, 1, c); P.r(4, 8, 8, 1, dk);
    P.r(12, 4, 3, 4, c); P.r(15, 5, 1, 2, shade(c, -0.25)); P.p(13, 5, '#2a1a10'); P.p(12, 2, dk); P.p(13, 3, dk);
    if (k.spots) { P.r(5, 4, 2, 2, '#5a3a2a'); P.r(9, 5, 2, 2, '#5a3a2a'); }
    P.p(2, 3, dk); P.p(1, 2, dk);
    const s = f % 2 ? 1 : 0;
    [4 + s, 6 - s, 10 + s, 12 - s].forEach((x, i) => P.r(x, 9, 1, 2, i % 2 ? c : dk));
    return outline(C);
  }

  function snake(f) {
    const C = cv(18, 7), P = pen(C.getContext('2d'));
    const c = '#a08a52', d = '#6a5a32';
    for (let i = 0; i < 13; i++) { const y = 3 + Math.round(Math.sin(i * 0.9 + f) * 1.4); P.p(i + 2, y, i % 3 ? c : d); P.p(i + 2, y + 1, d); }
    P.r(14, 2, 2, 2, c); P.p(1, 3, '#e8d8a0');
    return outline(C);
  }

  function dillo(f) {
    const C = cv(17, 10), P = pen(C.getContext('2d'));
    P.r(3, 2, 9, 5, '#a89a86'); P.r(4, 1, 7, 1, '#b8ab96'); for (let x = 5; x < 12; x += 2) P.r(x, 2, 1, 5, '#8a7c68');
    P.r(12, 4, 3, 2, '#b89a88'); P.p(15, 5, '#b89a88'); P.p(13, 4, '#2a1a10'); P.p(12, 2, '#b89a88');
    P.r(1, 5, 2, 1, '#9a8a76'); P.p(0, 6, '#9a8a76');
    const s = f ? 1 : 0; P.r(4 + s, 7, 1, 2, '#8a7c68'); P.r(10 - s, 7, 1, 2, '#8a7c68');
    return outline(C);
  }
  function chicken(k, f) {
    const C = cv(10, 10), P = pen(C.getContext('2d'));
    const c = k.coat || '#e8e0cc';
    P.r(2, 3, 5, 4, c); P.r(6, 1, 2, 3, c); P.p(8, 2, '#e0a030'); P.p(6, 0, '#d03020'); P.p(7, 1, '#2a1a10'); P.r(1, 2, 2, 2, shade(c, -0.15));
    P.p(3 + (f % 2), 7, '#e0a030'); P.p(5 - (f % 2), 7, '#e0a030'); P.p(3 + (f % 2), 8, '#e0a030'); P.p(5 - (f % 2), 8, '#e0a030');
    return outline(C);
  }
  function goat(k, f) {
    const C = cv(16, 13), P = pen(C.getContext('2d'));
    const c = k.coat || '#e0dcd0', dk = shade(c, -0.25);
    P.r(2, 3, 9, 5, c); P.r(10, 1, 3, 4, c); P.p(13, 3, c); P.p(12, 2, '#2a1a10'); P.r(10, 0, 1, 2, '#8a7a6a'); P.r(12, 0, 1, 1, '#8a7a6a'); P.p(12, 5, dk); P.p(1, 3, dk);
    const s = f ? 1 : 0; [3 + s, 5 - s, 8 + s, 10 - s].forEach((x) => P.r(x, 8, 1, 3, dk));
    return outline(C);
  }
  function boat() {
    const C = cv(86, 30), P = pen(C.getContext('2d'));
    P.r(2, 14, 82, 12, '#7a5230'); P.r(0, 16, 86, 8, '#7a5230'); P.r(2, 14, 82, 2, '#9a6a3c'); P.r(4, 24, 78, 2, '#4a2e18');
    for (let x = 8; x < 60; x += 9) { P.r(x, 7, 7, 8, '#8a5a2e'); P.r(x, 9, 7, 1, '#4a3a2a'); P.r(x, 12, 7, 1, '#4a3a2a'); P.r(x + 1, 7, 5, 1, '#a87444'); }
    P.r(62, 6, 18, 9, '#6a4a30'); P.r(62, 5, 18, 2, '#5a3a22'); P.r(64, 8, 5, 4, '#3a2a1e');
    P.r(40, 0, 2, 8, '#5a3a20');
    return outline(C);
  }
  function buzzard(f) {
    const C = cv(15, 7), P = pen(C.getContext('2d'));
    const c = '#2e2420';
    P.r(6, 3, 3, 2, c); P.p(9, 3, '#b84a3a');
    if (f === 0) { P.r(1, 2, 5, 1, c); P.r(9, 2, 5, 1, c); P.p(0, 1, c); P.p(14, 1, c); }
    else { P.r(2, 4, 4, 1, c); P.r(9, 4, 4, 1, c); P.p(1, 5, c); P.p(13, 5, c); }
    return C;
  }

  function team(o, f) {
    const C = cv(84, 36), ctx = C.getContext('2d');
    const wg = A.prop(o.chuck ? 'wagon' : 'wagon', {});
    ctx.drawImage(wg, 0, 2);
    const m1 = horse(o.m1 || { coat: '#8e8e8a', mule: true }, f), m2 = horse(o.m2 || { coat: '#7a4a2a', mule: true }, (f + 2) % 4);
    ctx.drawImage(m2, 46, 6); ctx.drawImage(m1, 42, 10);
    ctx.fillStyle = '#4a2a18'; ctx.fillRect(40, 24, 8, 1);
    return C;
  }
  A.sprite = {
    team: (o, f) => memo(`t:${JSON.stringify(o)}:${f}`, () => team(o, f)),
    side: (id, c, f) => memo(`hs:${id}:${f}`, () => humanSide({ ...DEF, ...c }, f, false)),
    front: (id, c, f) => memo(`hf:${id}:${f}`, () => humanFront({ ...DEF, ...c }, f)),
    mounted: (id, c, h, f) => memo(`m:${id}:${f}`, () => mounted({ ...DEF, ...c }, h, f)),
    horse: (id, h, f) => memo(`h:${id}:${f}`, () => horse(h, f)),
    cow: (id, k, f) => memo(`c:${id}:${f}`, () => longhorn(k, f)),
    pig: (id, k, f) => memo(`p:${id}:${f}`, () => pig(k, f)),
    snake: (f) => memo(`s:${f}`, () => snake(f)),
    bird: (f) => memo(`b:${f}`, () => buzzard(f)),
    chicken: (k, f) => memo(`ck:${k.coat}:${f}`, () => chicken(k, f)),
    boat: () => memo('boat', () => boat()),
    goat: (k, f) => memo(`g:${k.coat}:${f}`, () => goat(k, f)),
    dillo: (f) => memo(`d:${f}`, () => dillo(f)),
  };

  /* ---------------- PROPS ---------------- */
  function planksV(P, x, y, w, h, base) {
    P.r(x, y, w, h, base);
    for (let i = x; i < x + w; i += 5) P.r(i, y, 1, h, shade(base, -0.22));
    for (let i = x + 2; i < x + w; i += 5) P.r(i, y, 1, h, shade(base, 0.08));
  }
  function planksH(P, x, y, w, h, base) {
    P.r(x, y, w, h, base);
    for (let j = y; j < y + h; j += 3) P.r(x, j, w, 1, shade(base, -0.2));
  }
  function shingles(P, x, y, w, h, base, seed) {
    const r = rng(seed || 7);
    P.r(x, y, w, h, base);
    const ridge = y + Math.floor(h * 0.42);
    P.r(x, y, w, ridge - y, shade(base, 0.1));
    for (let j = y + 2; j < y + h; j += 3) {
      P.r(x, j, w, 1, shade(base, -0.18));
      for (let i = x + ((j / 3) % 2 ? 2 : 0); i < x + w; i += 5) P.p(i, j + 1, shade(base, -0.12 - r() * 0.1));
    }
    P.r(x, ridge, w, 1, shade(base, 0.28));
    P.r(x, y + h - 1, w, 1, shade(base, -0.35));
  }
  function window_(P, x, y, w, h, lit) {
    P.r(x, y, w, h, '#e8d0a0'); P.r(x + 1, y + 1, w - 2, h - 2, lit ? '#f6c85a' : '#4d6b78');
    P.r(x + (w >> 1), y + 1, 1, h - 2, '#e8d0a0'); P.r(x + 1, y + (h >> 1), w - 2, 1, '#e8d0a0');
    if (!lit) P.p(x + 1, y + 1, '#8fb0bc');
  }
  function scrawl(P, x, y, w, c, seed) {
    const r = rng(seed);
    let i = x; while (i < x + w - 1) { const l = 1 + (r() * 3 | 0); P.r(i, y + (r() < 0.3 ? 1 : 0), l, 1, c); i += l + 1; }
  }

  const PROPS = {
    hatcreek(o) { // the Hat Creek outfit's house with porch
      const C = cv(76, 62), P = pen(C.getContext('2d'));
      shingles(P, 2, 0, 72, 30, '#9b4f2e', 3);
      planksV(P, 5, 30, 66, 19, '#b07a45');
      P.r(5, 30, 66, 2, '#6e4424');
      P.r(33, 34, 10, 15, '#6a3f22'); P.r(34, 35, 8, 13, '#7a4a28'); P.p(40, 42, '#e0c070');
      window_(P, 12, 34, 11, 8, o.lit); window_(P, 53, 34, 11, 8, o.lit);
      planksH(P, 1, 49, 74, 11, '#c08a50'); P.r(1, 59, 74, 1, '#7a4a28');
      [2, 36, 71].forEach((x) => { P.r(x, 30, 3, 20, '#8a5a30'); P.r(x, 30, 1, 20, '#a87444'); });
      P.r(33, 59, 10, 3, '#a87444'); P.r(33, 60, 10, 1, '#7a4a28');
      if (o.jug) { P.r(20, 45, 4, 5, '#c9b08a'); P.r(21, 44, 2, 1, '#6a4a2a'); P.p(24, 46, '#c9b08a'); }
      if (o.chair) { P.r(14, 44, 5, 6, '#7a4a28'); P.r(14, 44, 5, 1, '#9a6a3a'); }
      return outline(C);
    },
    livery(o) {
      const C = cv(66, 60), P = pen(C.getContext('2d'));
      if (o.roofless) {
        P.r(1, 2, 64, 24, '#b08a58'); for (let i = 1; i < 65; i += 9) P.r(i, 2, 2, 24, '#6e5a44');
        P.r(1, 2, 64, 2, '#6e5a44'); P.r(1, 13, 64, 1, '#6e5a44');
        for (let i = 6; i < 60; i += 7) P.p(i, 18, '#c9a870');
      } else shingles(P, 1, 0, 64, 26, '#7c6a52', 11);
      planksV(P, 3, 26, 60, 32, '#9a8566');
      P.r(3, 26, 60, 2, '#5a4a36');
      P.r(20, 32, 26, 26, '#6a4a2e');
      P.r(20, 32, 13, 26, '#76553a'); P.r(33, 32, 13, 26, '#6a4a2e');
      for (let i = 0; i < 12; i++) { P.p(21 + i, 33 + i * 2, '#4a3220'); P.p(34 + i, 33 + i * 2, '#4a3220'); P.p(32 - i, 33 + i * 2, '#4a3220'); P.p(45 - i, 33 + i * 2, '#4a3220'); }
      P.r(26, 28, 14, 3, '#3a2616');
      return outline(C);
    },
    drybean(o) { // the saloon
      const C = cv(64, 74), P = pen(C.getContext('2d'));
      planksH(P, 2, 6, 60, 56, '#a87848');
      P.r(8, 0, 48, 8, '#a87848'); P.r(8, 0, 48, 1, '#c89a64'); P.r(2, 6, 60, 1, '#c89a64');
      P.r(10, 9, 44, 9, '#e6cf96'); P.r(10, 9, 44, 1, '#f6e2b0'); P.r(10, 17, 44, 1, '#b89a64');
      scrawl(P, 14, 12, 36, '#5a2a1a', 21); scrawl(P, 18, 14, 28, '#5a2a1a', 22);
      window_(P, 12, 22, 12, 10, o.lit); window_(P, 40, 22, 12, 10, true);
      P.r(41, 23, 3, 8, '#c86a6a'); P.r(48, 23, 3, 8, '#c86a6a');
      P.r(2, 36, 60, 3, '#6e4424');
      P.r(26, 42, 12, 18, '#3a2616'); P.r(26, 46, 5, 8, '#b88a50'); P.r(33, 46, 5, 8, '#b88a50');
      window_(P, 8, 44, 12, 10, o.lit); window_(P, 44, 44, 12, 10, o.lit);
      planksH(P, 0, 62, 64, 10, '#8a6038'); P.r(0, 71, 64, 1, '#5a3a20');
      [1, 61].forEach((x) => P.r(x, 36, 2, 26, '#6e4424'));
      return outline(C);
    },
    adobe(o) {
      const w = o.w || 40, C = cv(w, 36), P = pen(C.getContext('2d'));
      P.r(0, 0, w, 12, '#c79d6e'); P.r(0, 0, w, 1, '#dcb888'); P.r(0, 11, w, 1, '#a57c52');
      for (let i = 4; i < w; i += 7) P.r(i, 12, 2, 2, '#6e4a2e');
      P.r(0, 12, w, 22, '#dcb48a');
      const r = rng(o.seed || 5); for (let i = 0; i < 18; i++) P.p(r() * w | 0, 14 + (r() * 18 | 0), '#c9a078');
      P.r((w >> 1) - 4, 20, 8, 14, '#5a3a22');
      if (w > 30) window_(P, 4, 18, 7, 6, o.lit);
      P.r(0, 34, w, 2, '#b08a62');
      return outline(C);
    },
    shack(o) {
      const C = cv(34, 34), P = pen(C.getContext('2d'));
      shingles(P, 0, 0, 34, 14, '#8a7258', o.seed || 9);
      planksV(P, 2, 14, 30, 19, '#a4845a'); P.r(2, 14, 30, 1, '#5a4430');
      P.r(13, 21, 8, 12, '#5a3a22'); P.r(22, 18, 7, 6, '#4d6b78'); P.r(22, 18, 7, 1, '#e0c890');
      return outline(C);
    },
    sign(o) { // the Hat Creek sign: an old root-cellar door nailed to the corral corner
      const C = cv(36, 30), P = pen(C.getContext('2d'));
      P.r(2, 2, 3, 28, '#7a4e2a'); P.r(31, 2, 3, 28, '#7a4e2a');
      planksV(P, 3, 3, 30, 22, '#c8a470'); P.r(3, 3, 30, 1, '#e0c088'); P.r(3, 24, 30, 1, '#8a6a40');
      P.r(3, 8, 30, 1, '#8a6a40'); P.r(3, 19, 30, 1, '#8a6a40');
      scrawl(P, 6, 5, 24, '#4a2a18', 31); scrawl(P, 6, 11, 24, '#3a2414', 32); scrawl(P, 6, 14, 24, '#3a2414', 34); scrawl(P, 8, 21, 20, '#8a3a2a', 33);
      [[4, 4], [31, 4], [4, 22], [31, 22]].forEach(([x, y]) => P.p(x, y, '#5a5a60'));
      return outline(C);
    },
    ruin(o) { // burnt-out adobe hut, roof gone
      const C = cv(40, 30), P = pen(C.getContext('2d'));
      P.r(0, 6, 40, 22, '#b08a62'); P.r(3, 9, 34, 16, '#5a4636'); P.r(0, 6, 40, 1, '#c9a078');
      P.r(12, 6, 6, 3, 'rgba(0,0,0,0)'); P.r(0, 6, 3, 3, '#1a1008'); P.r(26, 6, 5, 2, '#2a1a10');
      for (let i = 0; i < 7; i++) P.r(5 + i * 4, 14 + (i % 3), 3, 2, '#3a2a1e');
      P.r(15, 20, 10, 8, '#3a2a1e'); P.r(30, 26, 8, 3, '#a07850'); P.r(33, 24, 5, 2, '#a07850');
      return outline(C);
    },
    tank(o) { // stone stock tank / water trough
      const w = o.w || 30, C = cv(w, 14), P = pen(C.getContext('2d'));
      P.r(0, 2, w, 11, '#9a8e7a'); P.r(0, 2, w, 2, '#b8ac94'); P.r(2, 4, w - 4, 6, '#4e8479'); P.r(3, 5, w - 8, 1, '#8fc2b6');
      for (let x = 3; x < w; x += 6) P.r(x, 11, 3, 2, '#7e7260');
      return outline(C);
    },
    branding(o) {
      const C = cv(18, 12), P = pen(C.getContext('2d'));
      P.r(2, 8, 14, 3, '#5e3e24'); P.r(4, 7, 10, 1, '#7a5234'); P.r(9, 1, 1, 8, '#4a4a50'); P.r(8, 0, 3, 2, '#ff7a2a');
      return outline(C);
    },
    bedroll(o) {
      const C = cv(20, 8), P = pen(C.getContext('2d'));
      P.r(1, 1, 18, 6, o.c || '#6a5a8a'); P.r(1, 1, 5, 6, '#d8ccae'); P.r(8, 1, 1, 6, shade(o.c || '#6a5a8a', -0.25));
      return outline(C);
    },
    shackpoor(o) {
      const C = cv(34, 28), P = pen(C.getContext('2d'));
      P.r(0, 0, 34, 10, '#8a7a62'); for (let x = 0; x < 34; x += 4) P.r(x, 0, 1, 10, '#6e604c');
      planksV(P, 2, 10, 30, 16, '#9a8466'); P.r(12, 14, 8, 12, '#2a1e16'); P.r(24, 13, 3, 3, '#2a1e16');
      return outline(C);
    },
    grave(o) {
      const C = cv(16, 22), P = pen(C.getContext('2d'));
      P.r(1, 14, 14, 7, '#8a6a42'); P.r(2, 13, 12, 1, '#a07c50'); P.r(3, 15, 3, 1, '#6e5234');
      P.r(7, 0, 2, 16, '#9a7a4a'); P.r(3, 4, 10, 2, '#9a7a4a'); P.p(7, 0, '#b8945e');
      return outline(C);
    },
    wreck(o) { // overturned wagon, wheels up
      const C = cv(46, 26), P = pen(C.getContext('2d'));
      P.r(3, 12, 38, 10, '#8a5a30'); P.r(3, 12, 38, 1, '#a87444'); P.r(20, 13, 3, 9, '#5a3a20');
      [[9, 7], [34, 7]].forEach(([x, y]) => { P.r(x - 5, y - 5, 11, 11, '#5a3a20'); P.r(x - 4, y - 4, 9, 9, '#a87444'); P.r(x - 1, y - 1, 3, 3, '#5a3a20'); });
      return outline(C);
    },
    cabin(o) { // log cabin
      const w = o.w || 50, C = cv(w, 44), P = pen(C.getContext('2d'));
      shingles(P, 0, 0, w, 16, '#6e5a44', o.seed || 17);
      for (let y = 16; y < 42; y += 4) { P.r(1, y, w - 2, 4, '#8a6238'); P.r(1, y + 3, w - 2, 1, '#5e3e22'); P.r(0, y + 1, 2, 2, '#a07448'); P.r(w - 2, y + 1, 2, 2, '#a07448'); }
      P.r((w >> 1) - 5, 26, 10, 16, '#3a2616'); window_(P, 5, 24, 8, 7, o.lit);
      P.r(w - 12, 0, 6, 10, '#8a8078');
      return outline(C);
    },
    store(o) { // frame building with a false front
      const w = o.w || 46, C = cv(w, 50), P = pen(C.getContext('2d'));
      const col = o.c || '#c8b490';
      planksH(P, 0, 0, w, 48, col); P.r(0, 0, w, 1, shade(col, 0.2));
      P.r(4, 4, w - 8, 8, '#e8dcc0'); scrawl(P, 7, 7, w - 14, '#4a2a18', o.seed || 3);
      P.r((w >> 1) - 5, 30, 10, 18, '#4a3020'); window_(P, 4, 30, 9, 10, o.lit); window_(P, w - 13, 30, 9, 10, o.lit);
      if (o.bars) { for (let x = w - 12; x < w - 4; x += 2) P.r(x, 30, 1, 10, '#2a2a30'); }
      P.r(0, 26, w, 2, shade(col, -0.35));
      return outline(C);
    },
    mission(o) { // old Spanish mission front (the Alamo)
      const C = cv(64, 54), P = pen(C.getContext('2d'));
      P.r(0, 14, 64, 40, '#d8c8a4'); P.r(22, 4, 20, 12, '#d8c8a4'); P.r(26, 0, 12, 6, '#d8c8a4'); P.r(28, 0, 8, 2, '#e8dcbc');
      const r = rng(9); for (let i = 0; i < 40; i++) P.p(r() * 64 | 0, 16 + (r() * 36 | 0), '#b8a888');
      P.r(26, 30, 12, 24, '#4a3a2a'); P.r(27, 28, 10, 2, '#4a3a2a'); P.r(8, 26, 6, 10, '#6a5a44'); P.r(50, 26, 6, 10, '#6a5a44');
      P.r(0, 14, 64, 1, '#e8dcbc');
      return outline(C);
    },
    pine(o) {
      const C = cv(26, 40), P = pen(C.getContext('2d'));
      P.r(12, 30, 3, 10, '#5e3e24');
      for (let i = 0; i < 4; i++) { const y = 2 + i * 7, w = 8 + i * 5; P.r(13 - (w >> 1), y, w, 8, i % 2 ? '#2f5a34' : '#3a6a3c'); P.r(13 - (w >> 1), y + 7, w, 1, '#24482a'); }
      P.r(12, 0, 2, 3, '#3a6a3c');
      return outline(C);
    },
    stump(o) {
      const C = cv(12, 9), P = pen(C.getContext('2d'));
      P.r(2, 2, 8, 6, '#7a5234'); P.r(2, 2, 8, 2, '#c8a870'); P.r(4, 2, 3, 1, '#a88858'); P.r(0, 7, 3, 1, '#6a4428'); P.r(9, 7, 3, 1, '#6a4428');
      return outline(C);
    },
    tub(o) {
      const C = cv(22, 12), P = pen(C.getContext('2d'));
      P.r(1, 2, 20, 9, '#9aa0a4'); P.r(0, 3, 22, 7, '#9aa0a4'); P.r(2, 3, 18, 5, '#b8d4dc'); P.r(3, 4, 10, 1, '#e0f0f4'); P.r(1, 10, 20, 1, '#6a7074');
      return outline(C);
    },
    fenceH(o) {
      const L = o.len || 48, C = cv(L + 2, 14), P = pen(C.getContext('2d'));
      P.r(0, 3, L + 2, 2, '#9a6a3c'); P.r(0, 3, L + 2, 1, '#b8844e'); P.r(0, 8, L + 2, 2, '#8a5c32');
      for (let x = 0; x <= L; x += 12) { P.r(x, 0, 3, 13, '#7a4e2a'); P.r(x, 0, 1, 13, '#9a6a3c'); }
      return outline(C);
    },
    fenceV(o) {
      const L = o.len || 48, C = cv(5, L + 12), P = pen(C.getContext('2d'));
      P.r(1, 0, 2, L + 10, '#8a5c32');
      for (let y = 0; y <= L; y += 10) { P.r(0, y, 3, 11, '#7a4e2a'); P.r(0, y, 1, 11, '#9a6a3c'); }
      return outline(C);
    },
    mesquite(o) {
      const s = o.seed || 1, r = rng(s), C = cv(40, 38), P = pen(C.getContext('2d'));
      P.r(18, 20, 3, 17, '#6e4a2e'); P.r(17, 26, 2, 4, '#6e4a2e'); P.r(20, 18, 5, 2, '#6e4a2e'); P.r(13, 21, 5, 2, '#6e4a2e'); P.r(19, 22, 1, 15, '#8a6040');
      const greens = ['#6f8430', '#7f963a', '#94ab4a', '#5e7228'];
      for (let i = 0; i < 26; i++) {
        const cx = 6 + r() * 28, cy = 3 + r() * 19, rad = 2 + r() * 3.5;
        const col = greens[cy < 10 ? (r() < 0.5 ? 2 : 1) : (r() < 0.6 ? 0 : 3)];
        for (let y = -rad; y <= rad; y++) for (let x = -rad; x <= rad; x++) if (x * x + y * y <= rad * rad && r() > 0.12) P.p(cx + x | 0, cy + y | 0, col);
      }
      return outline(C);
    },
    pecan(o) {
      const s = o.seed || 2, r = rng(s), C = cv(52, 58), P = pen(C.getContext('2d'));
      P.r(23, 32, 6, 25, '#5e3e24'); P.r(24, 32, 2, 25, '#7a5234'); P.r(21, 54, 10, 3, '#5e3e24');
      const greens = ['#3f7a34', '#4c8c3a', '#63a448', '#34662c'];
      for (let i = 0; i < 40; i++) {
        const cx = 6 + r() * 40, cy = 4 + r() * 30, rad = 4 + r() * 5;
        const col = greens[cy < 14 ? 2 : cy < 24 ? 1 : (r() < 0.5 ? 0 : 3)];
        for (let y = -rad; y <= rad; y++) for (let x = -rad; x <= rad; x++) if (x * x + y * y <= rad * rad) P.p(cx + x | 0, cy + y | 0, col);
      }
      for (let i = 0; i < 30; i++) P.p(8 + r() * 36 | 0, 6 + r() * 12 | 0, '#7cbc5a');
      return outline(C);
    },
    cactus(o) {
      const C = cv(20, 18), P = pen(C.getContext('2d'));
      const pad = (x, y, w, h) => { P.r(x, y + 1, w, h - 2, '#6d9a4a'); P.r(x + 1, y, w - 2, h, '#6d9a4a'); P.r(x + 1, y + 1, 1, h - 2, '#8cb862'); };
      pad(6, 7, 7, 10); pad(1, 3, 6, 8); pad(11, 1, 6, 8);
      P.p(3, 2, '#d04a6a'); P.p(14, 0, '#d04a6a'); P.p(15, 1, '#d04a6a');
      [[8, 10], [3, 6], [13, 4], [10, 14]].forEach(([x, y]) => P.p(x, y, '#e8e0a0'));
      return outline(C);
    },
    bush(o) {
      const r = rng(o.seed || 4), C = cv(18, 12), P = pen(C.getContext('2d'));
      for (let i = 0; i < 9; i++) { const cx = 4 + r() * 10, cy = 4 + r() * 4, rad = 2 + r() * 2; for (let y = -rad; y <= rad; y++) for (let x = -rad; x <= rad; x++) if (x * x + y * y <= rad * rad) P.p(cx + x | 0, cy + y | 0, r() < 0.5 ? '#8a8f45' : '#737a38'); }
      return outline(C);
    },
    rock(o) {
      const C = cv(12, 8), P = pen(C.getContext('2d'));
      P.r(1, 2, 10, 5, '#a8987e'); P.r(2, 1, 7, 1, '#a8987e'); P.r(2, 2, 5, 2, '#c4b69a'); P.r(1, 6, 10, 1, '#7e7058');
      return outline(C);
    },
    bell(o) { // dinner bell hung on a post
      const C = cv(12, 26), P = pen(C.getContext('2d'));
      P.r(5, 4, 2, 22, '#6e4424'); P.r(2, 3, 9, 2, '#6e4424');
      P.r(2, 5, 4, 4, '#c8a040'); P.r(1, 8, 6, 1, '#a8802a'); P.p(3, 6, '#f0d070');
      return outline(C);
    },
    well(o) {
      const C = cv(20, 22), P = pen(C.getContext('2d'));
      P.r(2, 12, 16, 9, '#9a8a72'); P.r(2, 12, 16, 2, '#b8a88e'); P.r(4, 13, 12, 1, '#2a2a30');
      P.r(3, 2, 2, 11, '#6e4424'); P.r(15, 2, 2, 11, '#6e4424'); P.r(2, 1, 16, 2, '#8a5a30');
      P.r(9, 3, 1, 6, '#c8b890'); P.r(8, 8, 3, 3, '#7a5a3a');
      return outline(C);
    },
    wagon(o) {
      const C = cv(46, 32), P = pen(C.getContext('2d'));
      P.r(4, 4, 34, 14, '#efe6cf'); P.r(4, 4, 34, 2, '#fff7e4'); for (let i = 9; i < 38; i += 8) P.r(i, 4, 1, 14, '#d8ccae');
      P.r(3, 17, 36, 6, '#8a5a30'); P.r(3, 17, 36, 1, '#a87444');
      P.r(38, 20, 7, 1, '#6e4424');
      [[8, 22], [32, 22]].forEach(([x, y]) => { P.r(x - 4, y, 9, 9, '#5a3a20'); P.r(x - 3, y + 1, 7, 7, '#a87444'); P.r(x - 1, y + 3, 3, 3, '#5a3a20'); });
      return outline(C);
    },
    crate(o) {
      const C = cv(12, 11), P = pen(C.getContext('2d'));
      P.r(1, 1, 10, 9, '#b88a50'); P.r(1, 1, 10, 1, '#d4a868'); P.r(1, 5, 10, 1, '#8a6038'); P.r(1, 9, 10, 1, '#8a6038');
      return outline(C);
    },
    campfire(o) {
      const C = cv(14, 10), P = pen(C.getContext('2d'));
      P.r(2, 7, 10, 2, '#5e3e24'); P.r(4, 6, 6, 1, '#7a5234');
      [[3, 8], [10, 8], [1, 7], [12, 7]].forEach(([x, y]) => P.p(x, y, '#8a8070'));
      return outline(C);
    },

    church(o) {
      const C = cv(40, 58), P = pen(C.getContext('2d'));
      P.r(15, 0, 10, 16, '#e8e0cc'); P.r(18, 3, 4, 6, '#5a4a3a'); P.r(19, 0, 2, 2, '#8a7a5a');
      shingles(P, 0, 14, 40, 16, '#8a7a66', 13);
      planksV(P, 2, 30, 36, 26, '#e2d8c0'); P.r(2, 30, 36, 1, '#8a7a66');
      P.r(15, 40, 10, 16, '#6a4a2e'); window_(P, 5, 36, 6, 9, o.lit); window_(P, 29, 36, 6, 9, o.lit);
      return outline(C);
    },
    table(o) {
      const C = cv(26, 18), P = pen(C.getContext('2d'));
      P.r(2, 3, 22, 9, '#9a6a3a'); P.r(1, 4, 24, 7, '#9a6a3a'); P.r(2, 3, 22, 2, '#b8844e'); P.r(4, 7, 3, 1, '#7a4e2a'); P.r(16, 5, 4, 1, '#7a4e2a');
      P.r(1, 11, 24, 2, '#6e4424'); P.r(4, 13, 2, 4, '#5a3a20'); P.r(20, 13, 2, 4, '#5a3a20');
      if (o.cards) { P.r(9, 5, 3, 4, '#f4ecd8'); P.r(14, 6, 3, 4, '#f4ecd8'); P.p(10, 6, '#c8402a'); P.r(19, 4, 2, 2, '#e0c050'); P.p(6, 5, '#e0c050'); }
      if (o.bottle) { P.r(4, 1, 2, 5, '#4a6a3a'); P.p(4, 0, '#6a4a2a'); }
      return outline(C);
    },
    piano(o) {
      const C = cv(30, 30), P = pen(C.getContext('2d'));
      P.r(1, 0, 28, 20, '#5a3420'); P.r(1, 0, 28, 2, '#7a4a2e'); P.r(3, 4, 24, 6, '#6a4028'); P.r(8, 5, 14, 3, '#e8d8b0');
      P.r(1, 16, 28, 4, '#6a4028'); P.r(1, 14, 28, 2, '#f4ecd8'); for (let i = 3; i < 28; i += 3) P.r(i, 14, 1, 1, '#2a1a10');
      P.r(2, 20, 3, 7, '#4a2a18'); P.r(25, 20, 3, 7, '#4a2a18');
      P.r(1, 27, 5, 3, '#2a2a2a'); P.r(24, 27, 5, 3, '#2a2a2a');
      return outline(C);
    },
    bar(o) {
      const w = o.w || 70, C = cv(w, 22), P = pen(C.getContext('2d'));
      P.r(0, 0, w, 5, '#b8844e'); P.r(0, 0, w, 1, '#d4a268'); planksV(P, 0, 5, w, 16, '#7a4a28'); P.r(0, 20, w, 2, '#4a2a18');
      [[8, '#4a6a3a'], [20, '#7a3a2a'], [w - 14, '#c8a050']].forEach(([x, c]) => { P.r(x, -0 + 0, 2, 4, c); });
      return outline(C);
    },
    saloonwall(o) {
      const w = o.w || 200, C = cv(w, 52), P = pen(C.getContext('2d'));
      planksV(P, 0, 0, w, 52, '#8a5a34'); P.r(0, 34, w, 2, '#5a3620'); P.r(0, 36, w, 16, '#6e4428');
      for (let x = 0; x < w; x += 6) P.r(x, 36, 1, 16, '#5a3620');
      if (o.shelf) { const x0 = o.shelf; P.r(x0, 12, 60, 2, '#4a2a18'); P.r(x0, 22, 60, 2, '#4a2a18');
        const cols = ['#4a6a3a', '#7a3a2a', '#c8a050', '#3a5a6a', '#e0d0a0']; for (let i = 0; i < 12; i++) { P.r(x0 + 3 + i * 5, 6 + (i % 2), 2, 6 - (i % 2), cols[i % 5]); P.r(x0 + 2 + i * 5, 16, 3, 6, cols[(i + 2) % 5]); } }
      if (o.window) window_(P, o.window, 8, 16, 14, o.lit);
      if (o.stairs) { const x0 = o.stairs; for (let i = 0; i < 9; i++) P.r(x0 + i * 4, 44 - i * 5, 12, 5, i % 2 ? '#a87444' : '#9a6a3a'); }
      return outline(C);
    },
    roomwall(o) {
      const w = o.w || 120, C = cv(w, 46), P = pen(C.getContext('2d'));
      P.r(0, 0, w, 46, '#c9a878'); for (let x = 3; x < w; x += 8) P.r(x, 0, 1, 34, '#b8966a');
      P.r(0, 34, w, 12, '#8a5a34'); P.r(0, 34, w, 1, '#a87444');
      const wx = o.window || 40; P.r(wx, 6, 26, 20, '#e8d0a0'); P.r(wx + 2, 8, 22, 16, o.night ? '#23305e' : '#a9d0de'); P.r(wx + 2, 18, 22, 6, o.night ? '#2e2a3a' : '#c9a86a'); P.r(wx + 2, 16, 22, 2, o.night ? '#3a4a6a' : '#6a9aa0');
      P.r(wx + 12, 8, 1, 16, '#e8d0a0'); P.r(wx - 3, 5, 5, 22, '#c86a6a'); P.r(wx + 24, 5, 5, 22, '#c86a6a');
      return outline(C);
    },
    bed(o) {
      const C = cv(34, 26), P = pen(C.getContext('2d'));
      P.r(1, 0, 4, 22, '#6e4424'); P.r(29, 0, 4, 22, '#6e4424'); P.r(2, 8, 30, 12, '#efe6d4'); P.r(4, 9, 8, 5, '#fff8ea');
      P.r(12, 10, 20, 10, '#9ab0c8'); for (let i = 13; i < 32; i += 4) P.r(i, 10, 1, 10, '#b8cce0'); P.r(1, 20, 32, 2, '#5a3a20'); P.r(2, 22, 2, 3, '#4a2a18'); P.r(30, 22, 2, 3, '#4a2a18');
      return outline(C);
    },
    chair(o) {
      const C = cv(10, 16), P = pen(C.getContext('2d'));
      P.r(1, 0, 8, 2, '#7a4a28'); P.r(1, 0, 2, 12, '#6e4424'); P.r(7, 0, 2, 12, '#6e4424'); P.r(1, 7, 8, 3, '#c8a878'); P.r(1, 10, 2, 5, '#5a3a20'); P.r(7, 10, 2, 5, '#5a3a20');
      return outline(C);
    },
    lamp(o) {
      const C = cv(8, 12), P = pen(C.getContext('2d'));
      P.r(2, 8, 4, 3, '#b88a40'); P.r(3, 2, 2, 6, '#f6e8b0'); P.r(2, 1, 4, 1, '#d8d0b8'); P.p(3, 4, '#ffd060');
      return outline(C);
    },
    dutchoven(o) {
      const C = cv(14, 10), P = pen(C.getContext('2d'));
      P.r(2, 3, 10, 5, '#2e2a28'); P.r(1, 2, 12, 2, '#3e3a36'); P.r(6, 0, 2, 2, '#3e3a36'); P.r(3, 8, 8, 1, '#ff9a3a'); P.p(5, 9, '#ffcf4a'); P.p(8, 9, '#ff7a2a');
      return outline(C);
    },
  };
  A.prop = (k, o = {}) => memo(`prop:${k}:${JSON.stringify(o)}`, () => PROPS[k](o));
  A.hasProp = (k) => !!PROPS[k];

  /* ---------------- GROUND ---------------- */
  // Terrain types painted into a per-pixel map, then colourised with chunky noise.
  const T = (A.T = { DIRT: 0, DRY: 1, ROAD: 2, WATER: 3, MUD: 4, GRASS: 5, SAND: 6, ROCK: 7, SNOW: 8, FLOOR: 9, RED: 10, TALL: 11, BROWNWATER: 12 });
  const PAL = {
    0: ['#d4a25c', '#cb9854', '#c28e4c', '#dbad68'],
    1: ['#b0a04c', '#a39445', '#bfae58', '#96883e'],
    2: ['#e0b77a', '#d7ac6d', '#e7c286', '#d0a466'],
    3: ['#5a9488', '#528a7e', '#629d90', '#4e8479'],
    4: ['#8e6a42', '#84603a', '#977449', '#7c5a36'],
    5: ['#76a33b', '#6c9735', '#83b046', '#628c30'],
    6: ['#e6ca8c', '#ddbe80', '#eed598', '#d5b577'],
    7: ['#a89478', '#9c886c', '#b4a286', '#8f7c62'],
    8: ['#eef2f6', '#e2e8ee', '#f8fbfd', '#d4dce4'],
    9: ['#b88a50', '#a87a44', '#c49658', '#9a6e3c'],
    10: ['#c47a4e', '#b86e44', '#d08a5c', '#ac643c'],
    11: ['#9aa84a', '#8e9c42', '#a8b656', '#84923a'],
    12: ['#6f7f64', '#687a5e', '#7a8a6c', '#627458'],
  };
  A.ground = function (w, h, seed, paint) {
    const m = new Uint8Array(w * h);
    const g = {
      w, h, m,
      fill(t) { m.fill(t); },
      rect(x, y, rw, rh, t) { for (let j = Math.max(0, y | 0); j < Math.min(h, (y + rh) | 0); j++) for (let i = Math.max(0, x | 0); i < Math.min(w, (x + rw) | 0); i++) m[j * w + i] = t; },
      circle(cx, cy, r, t, rough) {
        const rr = rng(seed + (cx | 0) * 7 + (cy | 0));
        for (let j = Math.floor(cy - r - 2); j <= cy + r + 2; j++) for (let i = Math.floor(cx - r - 2); i <= cx + r + 2; i++) {
          if (i < 0 || j < 0 || i >= w || j >= h) continue;
          const d = Math.hypot(i - cx, j - cy) + (rough ? (hash(i >> 1, j >> 1, seed) - 0.5) * rough : 0);
          if (d <= r) m[j * w + i] = t;
        }
      },
      line(pts, width, t, rough = 0) {
        for (let k = 0; k < pts.length - 1; k++) {
          const [x1, y1] = pts[k], [x2, y2] = pts[k + 1], L = Math.hypot(x2 - x1, y2 - y1);
          for (let s = 0; s <= L; s += 1.5) {
            const px = x1 + (x2 - x1) * s / L, py = y1 + (y2 - y1) * s / L;
            const wv = width / 2 + Math.sin((px + py) * 0.07 + seed) * rough;
            for (let j = Math.floor(py - wv); j <= py + wv; j++) for (let i = Math.floor(px - wv); i <= px + wv; i++) {
              if (i < 0 || j < 0 || i >= w || j >= h) continue;
              if ((i - px) ** 2 + (j - py) ** 2 <= wv * wv) m[j * w + i] = t;
            }
          }
        }
      },
      patches(t, on, n, rmin, rmax) {
        const r = rng(seed * 13 + t * 101 + n);
        for (let k = 0; k < n; k++) {
          const cx = r() * w, cy = r() * h, rad = rmin + r() * (rmax - rmin);
          for (let j = Math.floor(cy - rad - 3); j <= cy + rad + 3; j++) for (let i = Math.floor(cx - rad - 3); i <= cx + rad + 3; i++) {
            if (i < 0 || j < 0 || i >= w || j >= h) continue;
            const d = Math.hypot(i - cx, j - cy) + (hash(i >> 1, j >> 1, seed + k) - 0.5) * 5;
            if (d <= rad && (on == null || m[j * w + i] === on)) m[j * w + i] = t;
          }
        }
      },
    };
    paint(g);
    const C = cv(w, h), ctx = C.getContext('2d'), img = ctx.createImageData(w, h), d = img.data;
    const palRGB = {}; for (const k in PAL) palRGB[k] = PAL[k].map(hex);
    const water = [];
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const t = m[y * w + x];
      const big = hash(x >> 4, y >> 4, seed) * 0.5 + hash(x >> 3, y >> 3, seed + 1) * 0.5;
      const n = hash(x >> 1, y >> 1, seed + 2);
      let idx = n < 0.55 ? 0 : n < 0.75 ? 1 : n < 0.9 ? 2 : 3;
      if (big < 0.3 && idx === 0) idx = 1;
      if (big > 0.75 && idx === 0) idx = 2;
      let [r, gg, b] = palRGB[t][idx];
      const up = y > 0 ? m[(y - 1) * w + x] : t, up2 = y > 1 ? m[(y - 2) * w + x] : t, dn = y < h - 1 ? m[(y + 1) * w + x] : t;
      if ((t === T.WATER || t === T.BROWNWATER) && up !== t) { r *= 0.62; gg *= 0.7; b *= 0.7; }
      else if ((t === T.WATER || t === T.BROWNWATER) && up2 !== t) { r *= 0.8; gg *= 0.85; b *= 0.85; }
      else if (t !== T.WATER && t !== T.BROWNWATER && (dn === T.WATER || dn === T.BROWNWATER)) { [r, gg, b] = [122, 90, 52]; }
      else if ((t === T.DRY || t === T.GRASS) && dn !== t && dn !== T.WATER) { r *= 0.8; gg *= 0.85; b *= 0.8; }
      else if ((t === T.DRY || t === T.GRASS) && up !== t && up !== T.WATER) { r = Math.min(255, r * 1.1); gg = Math.min(255, gg * 1.1); b *= 1.05; }
      if (t === T.FLOOR) { const row = (y / 6) | 0; if (y % 6 === 0) { r *= 0.72; gg *= 0.7; b *= 0.7; } else if ((x + row * 17) % 29 === 0) { r *= 0.8; gg *= 0.78; b *= 0.78; } else if (y % 6 === 1) { r *= 1.06; gg *= 1.05; b *= 1.04; } }
      if ((t === T.WATER || t === T.BROWNWATER) && hash(x, y, seed + 9) < 0.004) water.push([x, y]);
      const i = (y * w + x) * 4; d[i] = r; d[i + 1] = gg; d[i + 2] = b; d[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    // tufts & pebbles
    const r = rng(seed + 77);
    const P = pen(ctx);
    for (let k = 0; k < (w * h) / 90; k++) {
      const x = r() * w | 0, y = r() * h | 0, t = m[y * w + x];
      if (t === T.DRY || t === T.GRASS || t === T.TALL) {
        const c1 = t === T.DRY ? '#8a7c34' : t === T.TALL ? '#6e7a2c' : '#557f28', c2 = t === T.DRY ? '#c9b862' : t === T.TALL ? '#c0c868' : '#93c050';
        if (t === T.TALL) { P.p(x + 1, y - 2, c2); P.p(x + 1, y - 3, c1); P.p(x - 1, y - 2, c1); }
        P.p(x, y, c1); P.p(x + 2, y, c1); P.p(x + 1, y - 1, c2); P.p(x + 1, y, c1); P.p(x - 1, y - 1, c2); P.p(x + 3, y - 1, c1);
      } else if (t === T.DIRT || t === T.ROAD) {
        if (r() < 0.5) { P.p(x, y, '#a88a5e'); P.p(x + 1, y, '#8a6e48'); } else if (r() < 0.35) { P.p(x, y, '#9a9a3c'); P.p(x + 1, y - 1, '#b0aa48'); }
      }
    }
    return { canvas: C, map: m, water, type: (x, y) => m[(Math.max(0, Math.min(h - 1, y | 0))) * w + Math.max(0, Math.min(w - 1, x | 0))] };
  };
})();
