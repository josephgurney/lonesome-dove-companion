/* Scene engine: world rendering, actors, camera, script runner, overview map. */
(function () {
  const A = window.ART, T = A.T;
  const E = (window.ENGINE = { hooks: {}, cast: {}, horses: {} });
  const TARGET_W = 232;
  let stage, canvas, ctx, overlay, low, lctx, S = 4, W = 232, H = 174, dpr = 1;
  let scene = null, mode = 'scene', last = 0, clock = 0;
  let runId = 0, skipping = false;
  const timers = [];
  const ABORT = { abort: true };

  E.init = (stageEl, canvasEl, overlayEl) => {
    stage = stageEl; canvas = canvasEl; overlay = overlayEl;
    ctx = canvas.getContext('2d'); low = A.cv(W, H); lctx = low.getContext('2d', { willReadFrequently: true });
    resize(); new ResizeObserver(resize).observe(stage);
    requestAnimationFrame(loop);
  };
  function resize() {
    const r = stage.getBoundingClientRect();
    dpr = Math.min(window.devicePixelRatio || 1, 3);
    const cw = Math.max(1, Math.round(r.width * dpr)), ch = Math.max(1, Math.round(r.height * dpr));
    canvas.width = cw; canvas.height = ch;
    const zoom = scene && mode !== 'map' ? scene.zoom || 1 : 1;
    S = Math.max(2, Math.round(cw / TARGET_W * zoom));
    if (scene && mode !== 'map') while (Math.ceil(cw / S) > scene.w || Math.ceil(ch / S) > scene.h) S++;
    W = Math.ceil(cw / S); H = Math.ceil(ch / S);
    low.width = W; low.height = H;
    lctx = low.getContext('2d', { willReadFrequently: true });
  }
  E.viewSize = () => ({ W, H });

  /* ---------- timing ---------- */
  const sleep = (ms) => new Promise((res) => { if (skipping) return res(); timers.push({ t: ms, res }); });
  function flushTimers() { while (timers.length) timers.shift().res(); }
  E.skip = () => { skipping = true; flushTimers(); for (const a of actors()) if (a.path.length) snap(a); if (E.hooks.skip) E.hooks.skip(); };
  E.isSkipping = () => skipping;

  /* ---------- scene ---------- */
  const actors = () => (scene ? scene.actors.values() : []);
  E.load = (def) => {
    runId++; flushTimers(); clearBubbles();
    const g = A.ground(def.w, def.h, def.seed || 1, def.ground);
    scene = {
      def, w: def.w, h: def.h, ground: g, props: [], actors: new Map(), bubbles: [], particles: [],
      cam: { x: def.cam ? def.cam[0] : def.w / 2, y: def.cam ? def.cam[1] : def.h / 2, follow: null, tween: null },
      tint: { from: def.time || 'noon', to: def.time || 'noon', k: 1, dur: 1 },
      weather: { ...(def.weather || {}) }, birds: [], flies: [], flashes: [], flashT: 0, attn: [], zoom: def.zoom || 1,
    };
    (def.props || []).forEach((p) => addProp(p));
    for (const id in def.actors || {}) spawn(id, def.actors[id]);
    const nb = scene.weather.buzzards || 0;
    for (let i = 0; i < nb; i++) scene.birds.push({ cx: def.w * (0.3 + 0.4 * Math.random()), cy: def.h * (0.25 + 0.3 * Math.random()), r: 22 + Math.random() * 18, a: Math.random() * 6.28, s: 0.35 + Math.random() * 0.2 });
    for (let i = 0; i < 30; i++) scene.flies.push({ x: Math.random() * def.w, y: Math.random() * def.h, p: Math.random() * 6.28 });
    mode = 'scene'; resize(); if (stage) stage.classList.remove('onmap');
    if (E.hooks.place && def.place) E.hooks.place(def.place, def.when);
  };
  function addProp(p) {
    const [k, x, y, o = {}] = p;
    const img = A.prop(k, o);
    scene.props.push({ k, x, y, o, img, id: o.id });
  }
  function spawn(id, d) {
    const a = {
      id, who: d.who || id, kind: d.kind || 'human', x: d.at[0], y: d.at[1], dir: d.dir || 1, pose: d.pose || 'side',
      mount: d.mount || null, cfg: d.cfg || null, cfgKey: d.cfgKey || null, path: [], speed: d.speed || null, dist: 0, moving: false,
      hidden: !!d.hidden, sort: d.sort || 0, wander: d.wander || null, idleT: Math.random() * 3, onArrive: null, emote: null, sit: d.sit,
    };
    scene.actors.set(id, a);
    return a;
  }

  function spriteFor(a) {
    const f = a.moving ? Math.floor(a.dist / 4) % 4 : 0;
    const who = E.cast[a.who] || {};
    if (a.kind === 'human') {
      if (a.mount) {
        const h = E.horses[a.mount] || { coat: '#7a4a2a' };
        return { img: A.sprite.mounted(a.who + '@' + a.mount, who.c, h, f), ax: 17, ay: 39, sw: 12 };
      }
      if (!a.moving && a.pose === 'front') {
        const blink = (clock + a.x) % 4 < 0.14 ? 1 : 0;
        return { img: A.sprite.front(a.who, who.c, blink), ax: 10, ay: 26, sw: 6, noflip: true };
      }
      return { img: A.sprite.side(a.who, who.c, f), ax: 10, ay: 26, sw: 6 };
    }
    if (a.kind === 'buffalo') return { img: A.sprite.buffalo(a.cfg || {}, a.moving ? Math.floor(a.dist / 4) % 4 : 0), ax: 18, ay: 23, sw: 12 };
    if (a.kind === 'bear') return { img: A.sprite.bear(a.cfg || {}, a.moving ? Math.floor(a.dist / 4) % 4 : 0), ax: 20, ay: 25, sw: 13 };
    if (a.kind === 'goat') return { img: A.sprite.goat(a.cfg || {}, a.moving ? Math.floor(a.dist / 3) % 2 : 0), ax: 8, ay: 12, sw: 4 };
    if (a.kind === 'chicken') return { img: A.sprite.chicken(a.cfg || {}, a.moving ? Math.floor(a.dist / 2) % 2 : 0), ax: 5, ay: 9, sw: 3 };
    if (a.kind === 'boat') return { img: A.sprite.boat(), ax: 43, ay: 27, sw: 0 };
    if (a.kind === 'team') return { img: A.sprite.team(a.cfg || {}, f), ax: 40, ay: 33, sw: 20 };
    if (a.kind === 'horse') { const h = E.horses[a.who] || a.cfg; return { img: A.sprite.horse(a.who, h, f), ax: 17, ay: 25, sw: 12 }; }
    if (a.kind === 'cow') return { img: A.sprite.cow(a.cfgKey || a.id, a.cfg, f), ax: 20, ay: 23, sw: 12 };
    if (a.kind === 'pig') return { img: A.sprite.pig(a.id, a.cfg || {}, a.moving ? f : 0), ax: 9, ay: 11, sw: 6 };
    if (a.kind === 'dillo') return { img: A.sprite.dillo(a.moving ? Math.floor(a.dist / 3) % 2 : 0), ax: 8, ay: 8, sw: 5 };
    if (a.kind === 'snake') return { img: A.sprite.snake(Math.floor(clock * 6) % 4), ax: 9, ay: 5, sw: 0 };
    return null;
  }

  function speedOf(a) {
    if (a.speed) return a.speed;
    if (a.kind === 'human') return a.mount ? 30 : 20;
    if (a.kind === 'horse') return 30;
    if (a.kind === 'cow') return 16;
    if (a.kind === 'buffalo') return { img: A.sprite.buffalo(a.cfg || {}, a.moving ? Math.floor(a.dist / 4) % 4 : 0), ax: 18, ay: 23, sw: 12 };
    if (a.kind === 'bear') return { img: A.sprite.bear(a.cfg || {}, a.moving ? Math.floor(a.dist / 4) % 4 : 0), ax: 20, ay: 25, sw: 13 };
    if (a.kind === 'goat') return { img: A.sprite.goat(a.cfg || {}, a.moving ? Math.floor(a.dist / 3) % 2 : 0), ax: 8, ay: 12, sw: 4 };
    if (a.kind === 'chicken') return { img: A.sprite.chicken(a.cfg || {}, a.moving ? Math.floor(a.dist / 2) % 2 : 0), ax: 5, ay: 9, sw: 3 };
    if (a.kind === 'boat') return { img: A.sprite.boat(), ax: 43, ay: 27, sw: 0 };
    if (a.kind === 'team') return 18;
    if (a.kind === 'boat') return 8;
    if (a.kind === 'buffalo') return { img: A.sprite.buffalo(a.cfg || {}, a.moving ? Math.floor(a.dist / 4) % 4 : 0), ax: 18, ay: 23, sw: 12 };
    if (a.kind === 'bear') return { img: A.sprite.bear(a.cfg || {}, a.moving ? Math.floor(a.dist / 4) % 4 : 0), ax: 20, ay: 25, sw: 13 };
    if (a.kind === 'goat') return { img: A.sprite.goat(a.cfg || {}, a.moving ? Math.floor(a.dist / 3) % 2 : 0), ax: 8, ay: 12, sw: 4 };
    if (a.kind === 'chicken') return 12;
    if (a.kind === 'buffalo') return { img: A.sprite.buffalo(a.cfg || {}, a.moving ? Math.floor(a.dist / 4) % 4 : 0), ax: 18, ay: 23, sw: 12 };
    if (a.kind === 'goat') return 14;
    if (a.kind === 'buffalo') return 20;
    if (a.kind === 'bear') return 22;
    if (a.kind === 'pig') return 14;
    return 10;
  }
  function snap(a) {
    const p = a.path[a.path.length - 1];
    if (p) { a.x = p[0]; a.y = p[1]; }
    a.path = []; a.moving = false;
    if (a.onArrive) { const f = a.onArrive; a.onArrive = null; f(); }
  }

  function update(dt, real) {
    clock += dt;
    for (let i = timers.length - 1; i >= 0; i--) { timers[i].t -= real * 1000; if (timers[i].t <= 0 || skipping) { const t = timers.splice(i, 1)[0]; t.res(); } }
    if (mode === 'map') return updateMap(real);
    if (!scene) return;
    for (const a of actors()) {
      if (a.path.length) {
        const [tx, ty] = a.path[0], dx = tx - a.x, dy = ty - a.y, d = Math.hypot(dx, dy), step = speedOf(a) * dt;
        if (Math.abs(dx) > 0.5) a.dir = dx > 0 ? 1 : -1;
        a.moving = true;
        if (d <= step) { a.x = tx; a.y = ty; a.path.shift(); a.dist += d; if (!a.path.length) { a.moving = false; if (a.onArrive) { const f = a.onArrive; a.onArrive = null; f(); } } }
        else { a.x += dx / d * step; a.y += dy / d * step; a.dist += step; }
        if (a.mount && a.moving && Math.random() < dt * 8) puff(a.x - a.dir * 8, a.y);
        if ((a.kind === 'cow' || a.kind === 'horse' || a.kind === 'team') && a.moving && Math.random() < dt * (scene.weather.dusty ? 10 : 3)) puff(a.x - a.dir * 8, a.y);
      } else if (a.wander) {
        a.idleT -= dt;
        if (a.idleT <= 0) {
          a.idleT = 1.5 + Math.random() * 3;
          const [cx, cy, r] = a.wander;
          a.path = [[cx + (Math.random() - 0.5) * r * 2, cy + (Math.random() - 0.5) * r]];
        }
      }
    }
    const c = scene.cam;
    if (c.tween) {
      c.tween.t += real * 1000; const k = Math.min(1, c.tween.t / c.tween.ms), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      c.x = c.tween.x0 + (c.tween.x1 - c.tween.x0) * e; c.y = c.tween.y0 + (c.tween.y1 - c.tween.y0) * e;
      if (k >= 1) { const r = c.tween.res; c.tween = null; r && r(); }
    } else if (c.follow) {
      const a = scene.actors.get(c.follow);
      if (a) { c.x += (a.x - c.x) * Math.min(1, dt * 3); c.y += (a.y - 12 - c.y) * Math.min(1, dt * 3); }
    } else autoCam(real);
    const tt = scene.tint; if (tt.k < 1) tt.k = Math.min(1, tt.k + real * 1000 / tt.dur);
    for (const b of scene.birds) b.a += b.s * dt;
    scene.flashes = scene.flashes.filter((f) => (f.t -= real) > 0);
    if (scene.flashT > 0) scene.flashT -= real;
    if (scene.weather.lightning && Math.random() < real * 0.35) scene.flashT = 0.18;
    scene.particles = scene.particles.filter((p) => (p.life -= dt) > 0);
    for (const p of scene.particles) { p.x += p.vx * dt; p.y += p.vy * dt; }
  }
  function puff(x, y) { if (scene.particles.length > 80) return; scene.particles.push({ x, y: y - 1, vx: (Math.random() - 0.5) * 6, vy: -3 - Math.random() * 3, life: 0.6 + Math.random() * 0.5, max: 1.1, c: '#e0c290' }); }

  /* ---------- drawing ---------- */
  /* ---------- auto camera: keep whoever is acting inside the frame ---------- */
  function attend(id, pt) { if (!scene) return; scene.attn.push({ id, pt, until: clock + 3 }); }
  function attnPoints() {
    scene.attn = scene.attn.filter((t) => t.until > clock || (t.id && scene.actors.get(t.id) && scene.actors.get(t.id).moving));
    const pts = [];
    for (const t of scene.attn) {
      if (t.id) { const a = scene.actors.get(t.id); if (a && !a.hidden) pts.push([a.x, a.y - 12]); }
      else if (t.pt) pts.push(t.pt);
    }
    return pts;
  }
  function camTarget(pts) {
    if (!pts.length) return null;
    const [L, Tp] = camLeftTop(), m = 20, mt = 38;
    const out = pts.some(([x, y]) => x < L + m || x > L + W - m || y < Tp + mt || y > Tp + H - m);
    if (!out) return null;
    const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
    const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
    let cx, cy;
    if (x1 - x0 < W - m * 2 && y1 - y0 < H - m - mt) { cx = (x0 + x1) / 2; cy = (y0 + y1) / 2 + (mt - m) / 2 - 4; }
    else { const last = pts.slice(-3); cx = last.reduce((s, p) => s + p[0], 0) / last.length; cy = last.reduce((s, p) => s + p[1], 0) / last.length; }
    cx = Math.max(W / 2, Math.min(scene.w - W / 2, cx)); cy = Math.max(H / 2, Math.min(scene.h - H / 2, cy));
    return [cx, cy];
  }
  function autoCam(real) {
    const c = scene.cam;
    const t = camTarget(attnPoints());
    if (t) c.auto = t;
    if (c.auto) {
      const k = Math.min(1, real * 3.2);
      c.x += (c.auto[0] - c.x) * k; c.y += (c.auto[1] - c.y) * k;
      if (Math.abs(c.auto[0] - c.x) < 0.6 && Math.abs(c.auto[1] - c.y) < 0.6) c.auto = null;
    }
  }
  // Snap the camera onto the current action (used after fast-forwarding).
  E.settle = () => { if (!scene || mode === 'map') return; const t = camTarget(attnPoints()); if (t) { scene.cam.x = t[0]; scene.cam.y = t[1]; } scene.cam.auto = null; };
  // Debug: which acting actors are outside the frame right now.
  E.offscreen = () => {
    if (!scene || mode === 'map') return [];
    const [L, Tp] = camLeftTop();
    return scene.attn.filter((t) => t.id).map((t) => scene.actors.get(t.id)).filter((a) => a && !a.hidden && (a.x < L + 4 || a.x > L + W - 4 || a.y - 10 < Tp || a.y > Tp + H)).map((a) => a.id);
  };
  function camLeftTop() {
    const c = scene.cam;
    let L = Math.round(c.x - W / 2), Tp = Math.round(c.y - H / 2);
    L = scene.w <= W ? Math.round((scene.w - W) / 2) : Math.max(0, Math.min(scene.w - W, L));
    Tp = scene.h <= H ? Math.round((scene.h - H) / 2) : Math.max(0, Math.min(scene.h - H, Tp));
    return [L, Tp];
  }
  E.toScreen = (x, y) => { if (!scene) return [0, 0]; const [L, Tp] = camLeftTop(); return [(x - L) * S / dpr, (y - Tp) * S / dpr]; };

  const TINTS = { dawn: ['#ffb898', 0.22], noon: ['#fff4d8', 0.0], hot: ['#ffe2a0', 0.14], dusk: ['#ff8a58', 0.32], night: ['#24346c', 0.64], moon: ['#3a4a86', 0.5], storm: ['#6a7a8a', 0.35], lamplit: ['#c8905a', 0.3] };
  function tintNow() {
    const t = scene.tint, a = TINTS[t.from] || TINTS.noon, b = TINTS[t.to] || TINTS.noon;
    return { from: a, to: b, k: t.k };
  }
  const nightness = () => { const t = scene.tint; const v = (n) => (n === 'night' ? 1 : n === 'moon' ? 0.8 : n === 'lamplit' ? 0.7 : n === 'dusk' ? 0.45 : 0); return v(t.from) * (1 - t.k) + v(t.to) * t.k; };

  function drawScene() {
    const [L, Tp] = camLeftTop();
    lctx.fillStyle = '#1a120c'; lctx.fillRect(0, 0, W, H);
    lctx.drawImage(scene.ground.canvas, -L, -Tp);
    // water sparkle
    for (const [x, y] of scene.ground.water) {
      const ph = (clock * 1.2 + x * 0.13 + y * 0.31) % 3;
      if (ph < 1.2) { lctx.fillStyle = ph < 0.6 ? '#b8e4d8' : '#86c2b4'; lctx.fillRect(x - L + Math.round(ph * 2), y - Tp, 2 + (ph < 0.6 ? 1 : 0), 1); }
    }
    // y-sorted drawables
    const list = [];
    for (const p of scene.props) list.push({ y: p.y - (SORT_OFF[p.k] || 0), draw: () => drawProp(p, L, Tp) });
    for (const a of actors()) if (!a.hidden) list.push({ y: a.y + (a.sort || 0), draw: () => drawActor(a, L, Tp) });
    list.sort((a, b) => a.y - b.y);
    for (const d of list) d.draw();
    for (const p of scene.particles) { lctx.globalAlpha = Math.max(0, p.life / p.max) * 0.8; lctx.fillStyle = p.c; lctx.fillRect(Math.round(p.x - L), Math.round(p.y - Tp), 2, 2); }
    lctx.globalAlpha = 1;
    // tint
    const t = tintNow();
    const blend = (i) => {
      if (!i[1]) return;
      lctx.globalCompositeOperation = 'multiply'; lctx.fillStyle = i[0]; lctx.fillRect(0, 0, W, H);
    };
    lctx.save();
    if (t.k < 1 && t.from[1]) { lctx.globalAlpha = t.from[1] * (1 - t.k); blend(t.from); }
    lctx.restore(); lctx.save();
    if (t.to[1]) { lctx.globalAlpha = t.to[1] * t.k; blend(t.to); }
    lctx.restore();
    // lights
    const nt = nightness();
    if (nt > 0.05) {
      lctx.save(); lctx.globalCompositeOperation = 'lighter';
      for (const p of scene.props) {
        const lights = LIGHTS[p.k] ? LIGHTS[p.k](p) : [];
        for (const [lx, ly, r] of lights) {
          const fl = p.k === 'campfire' ? 0.85 + Math.sin(clock * 13 + lx) * 0.15 : 1;
          const gx = lx - L, gy = ly - Tp, gr = lctx.createRadialGradient(gx, gy, 0, gx, gy, r * fl);
          gr.addColorStop(0, `rgba(255,190,90,${0.55 * nt})`); gr.addColorStop(1, 'rgba(255,150,60,0)');
          lctx.fillStyle = gr; lctx.fillRect(gx - r, gy - r, r * 2, r * 2);
        }
      }
      lctx.restore();
      if (scene.weather.fireflies) for (const f of scene.flies) {
        const on = (Math.sin(clock * 2 + f.p * 3) + 1) / 2;
        if (on > 0.7) { lctx.fillStyle = `rgba(230,255,140,${(on - 0.7) * 3 * nt})`; lctx.fillRect(Math.round(f.x + Math.sin(clock * 0.5 + f.p) * 6 - L), Math.round(f.y + Math.cos(clock * 0.4 + f.p) * 4 - Tp), 1, 1); }
      }
    }
    if (scene.weather.moon && nt > 0.2) drawMoon(scene.weather.moon, nt);
    drawWeather(L, Tp);
    for (const f of scene.flashes) {
      const fx = Math.round(f.x - L), fy = Math.round(f.y - Tp);
      lctx.fillStyle = '#fff6c0'; lctx.fillRect(fx - 1, fy - 1, 3, 3); lctx.fillStyle = '#ffd040'; lctx.fillRect(fx - 3, fy, 7, 1); lctx.fillRect(fx, fy - 3, 1, 7);
      if (f.tx != null) { lctx.strokeStyle = 'rgba(255,240,180,0.55)'; lctx.beginPath(); lctx.moveTo(fx + 0.5, fy + 0.5); lctx.lineTo(Math.round(f.tx - L) + 0.5, Math.round(f.ty - Tp) + 0.5); lctx.stroke(); }
    }
    if (scene.flashT > 0) { lctx.fillStyle = `rgba(255,255,255,${Math.min(0.55, scene.flashT * 3)})`; lctx.fillRect(0, 0, W, H); }
    // campfire flames drawn after tint so they glow
    for (const p of scene.props) if (p.k === 'campfire') {
      const x = p.x - L, y = p.y - Tp - 4;
      for (let i = 0; i < 5; i++) { const h = 3 + ((Math.sin(clock * 11 + i * 2) + 1) * 2 | 0); lctx.fillStyle = i % 2 ? '#ffcf4a' : '#ff7a2a'; lctx.fillRect(x - 3 + i, y - h, 1, h); }
      if (Math.random() < 0.08) scene.particles.push({ x: p.x + (Math.random() - 0.5) * 4, y: p.y - 8, vx: (Math.random() - 0.5) * 4, vy: -14, life: 0.8, max: 0.8, c: '#ffb040' });
    }
    // buzzards (in the sky: shadow on ground + bird)
    for (const b of scene.birds) {
      const x = b.cx + Math.cos(b.a) * b.r - L, y = b.cy + Math.sin(b.a) * b.r * 0.5 - Tp;
      lctx.fillStyle = 'rgba(40,20,10,0.18)'; lctx.fillRect(Math.round(x + 10), Math.round(y + 26), 7, 2);
      lctx.drawImage(A.sprite.bird(Math.floor(clock * 2 + b.a) % 2), Math.round(x), Math.round(y));
    }
    // heat shimmer
    if (scene.weather.heat && !reduceMotion) {
      const snap = lctx.getImageData(0, 0, W, H);
      const src = A.cv(W, H); src.getContext('2d').putImageData(snap, 0, 0);
      for (let y = 0; y < H; y += 2) { const o = Math.round(Math.sin(clock * 2.2 + y * 0.35) * 0.6); if (o) lctx.drawImage(src, 0, y, W, 2, o, y, W, 2); }
    }
  }
  const SORT_OFF = { hatcreek: 13, drybean: 10, saloonwall: 60, roomwall: 60 };
  function drawWeather(L, Tp) {
    const w = scene.weather;
    if (w.sand) {
      lctx.fillStyle = 'rgba(150,100,50,0.42)'; lctx.fillRect(0, 0, W, H);
      lctx.fillStyle = 'rgba(210,170,110,0.55)';
      for (let i = 0; i < 90; i++) { const y = (i * 37) % H, x = ((i * 53 + clock * (160 + (i % 5) * 30)) % (W + 40)) - 20; lctx.fillRect(Math.round(x), y, 6 + (i % 4) * 3, 1); }
    }
    if (w.rain) {
      lctx.fillStyle = 'rgba(40,50,70,0.25)'; lctx.fillRect(0, 0, W, H);
      lctx.fillStyle = 'rgba(200,215,235,0.55)';
      const n = w.rain === 'heavy' ? 220 : 110;
      for (let i = 0; i < n; i++) { const x = (i * 73 + clock * 40) % (W + 20) - 10, y = ((i * 131) % H + clock * 260 + i * 7) % H; lctx.fillRect(Math.round(x), Math.round(y), 1, 4); }
    }
    if (w.hail) {
      lctx.fillStyle = 'rgba(60,70,90,0.2)'; lctx.fillRect(0, 0, W, H);
      lctx.fillStyle = 'rgba(245,250,255,0.95)';
      for (let i = 0; i < 160; i++) { const x = (i * 71 + clock * 20) % W, y = ((i * 131) % H + clock * 330 + i * 11) % H; lctx.fillRect(Math.round(x), Math.round(y), 2, 2); }
      lctx.fillStyle = 'rgba(240,245,250,0.8)';
      for (let i = 0; i < 90; i++) { const x = (i * 97) % W, y = (i * 53) % H; lctx.fillRect(x, y, 1, 1); }
    }
    if (w.snow) {
      const heavy = w.snow === 'blizzard';
      lctx.fillStyle = heavy ? 'rgba(220,228,240,0.45)' : 'rgba(200,210,230,0.12)'; lctx.fillRect(0, 0, W, H);
      lctx.fillStyle = 'rgba(255,255,255,0.9)';
      const n = heavy ? 260 : 90;
      for (let i = 0; i < n; i++) { const x = (i * 61 + clock * (heavy ? 120 : 10) + Math.sin(clock + i) * 6) % W, y = ((i * 97) % H + clock * (heavy ? 60 : 24) + i * 5) % H; lctx.fillRect(Math.round(x), Math.round(y), heavy ? 2 : 1, heavy ? 1 : 1); }
    }
    if (w.hoppers) {
      lctx.fillStyle = 'rgba(90,70,30,0.35)'; lctx.fillRect(0, 0, W, H);
      for (let i = 0; i < 260; i++) { const x = (i * 83 + Math.sin(clock * 3 + i) * 12 + clock * 30) % W, y = ((i * 47) % H + Math.cos(clock * 2.5 + i) * 10 + H) % H; lctx.fillStyle = i % 3 ? '#6a5a2a' : '#9a8a3a'; lctx.fillRect(Math.round(x), Math.round(y), 2, 1); }
    }
    if (w.elmo) for (const a of actors()) if (a.kind === 'cow' && !a.hidden) {
      if ((Math.sin(clock * 5 + a.x) + 1) / 2 < 0.35) continue;
      const hx = Math.round(a.x + a.dir * 17 - L), hy = Math.round(a.y - 16 - Tp);
      lctx.fillStyle = 'rgba(120,180,255,0.9)'; lctx.fillRect(hx - 1, hy - 1, 3, 3); lctx.fillStyle = 'rgba(210,235,255,1)'; lctx.fillRect(hx, hy, 1, 1);
      const hx2 = Math.round(a.x - a.dir * 1 - L); lctx.fillStyle = 'rgba(120,180,255,0.8)'; lctx.fillRect(hx2, hy + 1, 2, 2);
    }
  }
  function drawMoon(kind, nt) {
    const cx = W - 22, cy = 20, r = 9;
    const g = lctx.createRadialGradient(cx, cy, 2, cx, cy, 26); g.addColorStop(0, `rgba(230,236,255,${0.35 * nt})`); g.addColorStop(1, 'rgba(230,236,255,0)');
    lctx.fillStyle = g; lctx.fillRect(cx - 26, cy - 26, 52, 52);
    for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) {
      if (x * x + y * y > r * r) continue;
      const off = kind === 'full' ? 99 : kind === 'quarter' ? 0 : 5;
      if (kind !== 'full' && (x - off) * (x - off) + y * y < r * r && x < r - 1 - (kind === 'quarter' ? r : 2)) continue;
      lctx.fillStyle = (x + y) % 5 === 0 ? '#d8dcea' : '#f4f2e6'; lctx.fillRect(cx + x, cy + y, 1, 1);
    }
  }
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const LIGHTS = {
    hatcreek: (p) => [[p.x - 20, p.y - 22, 16], [p.x + 21, p.y - 22, 16]],
    drybean: (p) => [[p.x - 18, p.y - 22, 14], [p.x + 18, p.y - 22, 14], [p.x + 14, p.y - 45, 12], [p.x, p.y - 20, 12]],
    adobe: (p) => (p.o.lit ? [[p.x - 10, p.y - 12, 12]] : []),
    campfire: (p) => [[p.x, p.y - 4, 40]],
    lamp: (p) => [[p.x, p.y - 7, 34]],
    dutchoven: (p) => [[p.x, p.y - 2, 18]],
    church: (p) => (p.o.lit ? [[p.x - 12, p.y - 16, 10], [p.x + 12, p.y - 16, 10]] : []),
    saloonwall: (p) => (p.o.lit && p.o.window ? [[p.x - p.img.width / 2 + p.o.window + 8, p.y - 30, 16]] : []),
  };

  function drawProp(p, L, Tp) {
    const x = Math.round(p.x - p.img.width / 2 - L), y = Math.round(p.y - p.img.height - Tp);
    if (x > W || y > H || x + p.img.width < 0 || y + p.img.height < 0) return;
    if (p.k === 'mesquite' || p.k === 'pecan') { lctx.fillStyle = 'rgba(60,30,10,0.22)'; ellipse(p.x - L, p.y - Tp - 1, p.img.width * 0.42, 4); }
    lctx.drawImage(p.img, x, y);
  }
  function ellipse(cx, cy, rx, ry) { lctx.beginPath(); lctx.ellipse(Math.round(cx), Math.round(cy), rx, ry, 0, 0, Math.PI * 2); lctx.fill(); }
  function drawActor(a, L, Tp) {
    const s = spriteFor(a); if (!s) return;
    const x = Math.round(a.x - L), y = Math.round(a.y - Tp);
    if (a.down) {
      if (a.blood) { lctx.fillStyle = 'rgba(120,20,16,0.75)'; ellipse(x, y - 2, 7, 2); }
      lctx.save(); lctx.translate(x, y - 4); lctx.rotate((a.dir < 0 ? 1 : -1) * Math.PI / 2);
      lctx.drawImage(s.img, -s.ax, -s.ay + 4 + (a.kind === 'human' ? 10 : 6)); lctx.restore();
      return;
    }
    if (s.sw) { lctx.fillStyle = 'rgba(50,25,10,0.28)'; ellipse(x, y, s.sw, 2); }
    lctx.save();
    if (a.dir < 0 && !s.noflip) { lctx.translate(x, 0); lctx.scale(-1, 1); lctx.drawImage(s.img, -s.ax, y - s.ay); }
    else lctx.drawImage(s.img, x - s.ax, y - s.ay);
    lctx.restore();
    if (a.emote && a.emote.until > clock) {
      const ex = x - 3, ey = y - s.ay - 9 - Math.round(Math.abs(Math.sin(clock * 6)) * 2);
      lctx.fillStyle = '#fff4dc'; lctx.fillRect(ex - 1, ey - 1, 9, 9); lctx.fillStyle = '#2a1a10';
      lctx.strokeStyle = '#2a1a10'; lctx.strokeRect(ex - 1.5, ey - 1.5, 10, 10);
      const e = a.emote.e; lctx.fillStyle = e === '♥' ? '#d04a5a' : '#2a1a10';
      if (e === '!') { lctx.fillRect(ex + 3, ey + 1, 2, 4); lctx.fillRect(ex + 3, ey + 6, 2, 1); }
      else if (e === '?') { lctx.fillRect(ex + 2, ey + 1, 4, 1); lctx.fillRect(ex + 5, ey + 2, 1, 2); lctx.fillRect(ex + 3, ey + 4, 2, 1); lctx.fillRect(ex + 3, ey + 6, 2, 1); }
      else if (e === '♥') { lctx.fillRect(ex + 1, ey + 2, 2, 2); lctx.fillRect(ex + 5, ey + 2, 2, 2); lctx.fillRect(ex + 1, ey + 3, 6, 2); lctx.fillRect(ex + 2, ey + 5, 4, 1); lctx.fillRect(ex + 3, ey + 6, 2, 1); }
      else if (e === '...') { lctx.fillRect(ex + 1, ey + 5, 1, 1); lctx.fillRect(ex + 3, ey + 5, 1, 1); lctx.fillRect(ex + 5, ey + 5, 1, 1); }
      else if (e === 'z') { lctx.fillRect(ex + 1, ey + 1, 5, 1); lctx.fillRect(ex + 4, ey + 2, 1, 1); lctx.fillRect(ex + 3, ey + 3, 1, 1); lctx.fillRect(ex + 2, ey + 4, 1, 1); lctx.fillRect(ex + 1, ey + 5, 5, 1); }
    }
  }

  /* ---------- bubbles (DOM, crisp text) ---------- */
  function clearBubbles() { if (!overlay) return; overlay.querySelectorAll('.bubble,.maplabel').forEach((n) => n.remove()); if (scene) scene.bubbles = []; }
  function bubble(id, text) {
    const el = document.createElement('div'); el.className = 'bubble'; el.textContent = text; overlay.appendChild(el);
    const b = { id, el }; scene.bubbles.push(b); positionBubbles(); requestAnimationFrame(() => el.classList.add('in'));
    return b;
  }
  function dropBubble(b) { b.el.classList.remove('in'); setTimeout(() => b.el.remove(), 180); scene.bubbles = scene.bubbles.filter((x) => x !== b); }
  function positionBubbles() {
    if (!scene) return;
    const ow = overlay.clientWidth;
    for (const b of scene.bubbles) {
      const a = scene.actors.get(b.id); if (!a) continue;
      const s = spriteFor(a); const [sx, sy] = E.toScreen(a.x, a.y - (s ? s.ay : 26) - 2);
      const bw = b.el.offsetWidth;
      const left = Math.max(6, Math.min(ow - bw - 6, sx - bw / 2));
      b.el.style.transform = `translate(${Math.round(left)}px, ${Math.round(sy - b.el.offsetHeight - 8)}px)`;
      b.el.style.setProperty('--tail', `${Math.round(Math.max(10, Math.min(bw - 10, sx - left)))}px`);
    }
  }

  /* ---------- overview map ---------- */
  const G = window.GEO;
  const MK = 16; // base px per degree latitude
  const KX = MK * Math.cos(37 * Math.PI / 180);
  const MW = Math.round((G.view.lon1 - G.view.lon0) * KX), MH = Math.round((G.view.lat1 - G.view.lat0) * MK);
  const proj = (lon, lat) => [(lon - G.view.lon0) * KX, (G.view.lat1 - lat) * MK];
  let baseMap = null;
  const map = { lon: -99, lat: 31, z: 1, tween: null, route: [], progress: 0, target: 0, places: [], trails: [], res: null, marker: 'herd' };
  function scanFill(ctx2, pts, col) {
    const P = pts.map(([lo, la]) => proj(lo, la));
    const ys = P.map((p) => p[1]); const y0 = Math.max(0, Math.floor(Math.min(...ys))), y1 = Math.min(MH - 1, Math.ceil(Math.max(...ys)));
    ctx2.fillStyle = col;
    for (let y = y0; y <= y1; y++) {
      const yc = y + 0.5, xs = [];
      for (let i = 0; i < P.length; i++) { const [ax, ay] = P[i], [bx, by] = P[(i + 1) % P.length]; if ((ay <= yc && by > yc) || (by <= yc && ay > yc)) xs.push(ax + (yc - ay) / (by - ay) * (bx - ax)); }
      xs.sort((a, b) => a - b);
      for (let i = 0; i + 1 < xs.length; i += 2) ctx2.fillRect(Math.round(xs[i]), y, Math.round(xs[i + 1]) - Math.round(xs[i]), 1);
    }
  }
  function pline(ctx2, pts, col, w = 1, dash = 0) {
    ctx2.fillStyle = col; let n = 0;
    for (let i = 0; i < pts.length - 1; i++) {
      let [x0, y0] = pts[i].map(Math.round), [x1, y1] = pts[i + 1].map(Math.round);
      const dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1; let err = dx + dy;
      for (;;) {
        if (!dash || (n++ % dash) < dash / 2) ctx2.fillRect(x0, y0, w, w);
        if (x0 === x1 && y0 === y1) break; const e2 = 2 * err; if (e2 >= dy) { err += dy; x0 += sx; } if (e2 <= dx) { err += dx; y0 += sy; }
      }
    }
  }
  function buildBase() {
    const C = A.cv(MW, MH), c2 = C.getContext('2d');
    const img = c2.createImageData(MW, MH), d = img.data;
    for (let y = 0; y < MH; y++) for (let x = 0; x < MW; x++) {
      const n = A.hash(x >> 1, y >> 1, 5), big = A.hash(x >> 4, y >> 4, 6);
      const v = 0.94 + n * 0.06 - (big < 0.25 ? 0.03 : 0);
      const i = (y * MW + x) * 4; d[i] = 232 * v; d[i + 1] = 205 * v; d[i + 2] = 150 * v; d[i + 3] = 255;
    }
    c2.putImageData(img, 0, 0);
    const mex = G.regions.find((r) => r.mexico); scanFill(c2, mex.pts, '#dcbd86');
    const gulf = [...G.coast, [-88, 23], [-97.4, 23], [-97.7, 25.2]];
    scanFill(c2, gulf, '#8fb4b4'); scanFill(c2, G.pacific, '#8fb4b4');
    pline(c2, G.pacific.slice(0, -3).map((p) => proj(...p)), '#6a8a86');
    for (let i = 0; i < 40; i++) { const lo = -97 + A.hash(i, 1, 3) * 8.5, la = 24.6 + A.hash(i, 2, 3) * 3.6; const [x, y] = proj(lo, la); if (x < MW) { c2.fillStyle = '#b6d4d0'; c2.fillRect(Math.round(x), Math.round(y), 3, 1); } }
    pline(c2, G.coast.map((p) => proj(...p)), '#6a8a86');
    for (const r of G.regions) if (!r.mexico && r.pts.length) pline(c2, r.pts.concat([r.pts[0]]).map((p) => proj(...p)), '#b08a58', 1, 4);
    pline(c2, [proj(-124.7, 49), proj(-88, 49)], '#b08a58', 1, 4);
    for (const r of G.rivers) pline(c2, r.pts.map((p) => proj(...p)), '#5f8fae', ['Rio Grande', 'Red', 'Platte', 'Missouri', 'Yellowstone', 'Arkansas'].includes(r.name) ? 2 : 1);
    // mountains hint (Rockies)
    const r = A.rng(8);
    for (let i = 0; i < 70; i++) {
      const la = 35 + r() * 13, lo = -107.5 + (la - 35) * -0.28 + (r() - 0.5) * 3.2; const [x, y] = proj(lo, la);
      c2.fillStyle = '#9a7a52'; c2.fillRect(Math.round(x), Math.round(y), 1, 1); c2.fillRect(Math.round(x) - 1, Math.round(y) + 1, 3, 1); c2.fillStyle = '#c4a476'; c2.fillRect(Math.round(x) - 2, Math.round(y) + 2, 5, 1);
    }
    return C;
  }
  // The view never shows past the edge of the drawn map: zoom is floored so the map covers the screen, and the centre is clamped.
  function mapView() {
    const z = Math.max(map.z, W / MW, H / MH);
    let [cx, cy] = proj(map.lon, map.lat);
    const hw = W / 2 / z, hh = H / 2 / z;
    cx = Math.max(hw, Math.min(MW - hw, cx)); cy = Math.max(hh, Math.min(MH - hh, cy));
    return { z, L: cx - hw, T: cy - hh };
  }
  E.mapToScreen = (lon, lat) => { const v = mapView(), [x, y] = proj(lon, lat); return [(x - v.L) * v.z * S / dpr, (y - v.T) * v.z * S / dpr]; };
  function updateMap(dt) {
    if (map.tween) {
      const t = map.tween; t.t += dt * 1000; const k = Math.min(1, t.t / t.ms), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      map.lon = t.a.lon + (t.b.lon - t.a.lon) * e; map.lat = t.a.lat + (t.b.lat - t.a.lat) * e; map.z = t.a.z + (t.b.z - t.a.z) * e;
      if (k >= 1) { map.tween = null; }
    }
    for (const tr of map.trails) {
      if (tr.p < tr.to) { tr.p = Math.min(tr.to, tr.p + dt * tr.speed); if (tr.p >= tr.to && tr.res) { const f = tr.res; tr.res = null; f(); } }
    }
  }
  function pathUpTo(pts, p) {
    // p in [0, pts.length-1] fractional index
    const out = []; const n = Math.floor(p);
    for (let i = 0; i <= Math.min(n, pts.length - 1); i++) out.push(pts[i]);
    if (n < pts.length - 1) { const f = p - n, a = pts[n], b = pts[n + 1]; out.push([a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f]); }
    return out;
  }
  function drawMap() {
    if (!baseMap) baseMap = buildBase();
    const v = mapView();
    lctx.fillStyle = '#c9a66a'; lctx.fillRect(0, 0, W, H);
    lctx.imageSmoothingEnabled = false;
    lctx.drawImage(baseMap, -v.L * v.z, -v.T * v.z, MW * v.z, MH * v.z);
    const tp = (lo, la) => { const [x, y] = proj(lo, la); return [(x - v.L) * v.z, (y - v.T) * v.z]; };
    for (const tr of map.trails) {
      const pts = pathUpTo(tr.pts, tr.p).map((q) => tp(q[0], q[1]));
      if (pts.length > 1) { pline(lctx, pts.map(([x, y]) => [x - 0.5, y - 0.5]), tr.shadow || '#6a3a1a', 2); pline(lctx, pts, tr.col, 1, tr.dash || 0); }
      const head = pts[pts.length - 1];
      if (head && tr.icon) drawIcon(tr.icon, head[0], head[1]);
    }
    for (const pl of map.places) {
      const [x, y] = tp(pl.lon, pl.lat);
      lctx.fillStyle = '#2a1a10'; lctx.fillRect(Math.round(x) - 2, Math.round(y) - 2, 5, 5);
      lctx.fillStyle = pl.col || '#c8402a'; lctx.fillRect(Math.round(x) - 1, Math.round(y) - 1, 3, 3);
    }
    // vignette frame
    lctx.fillStyle = 'rgba(80,40,10,0.25)'; lctx.fillRect(0, 0, W, 2); lctx.fillRect(0, H - 2, W, 2); lctx.fillRect(0, 0, 2, H); lctx.fillRect(W - 2, 0, 2, H);
  }
  function drawIcon(k, x, y) {
    x = Math.round(x); y = Math.round(y);
    const bob = Math.floor(clock * 4) % 2;
    if (k === 'herd') {
      const cows = [[-6, 1], [-2, -1], [2, 1], [-4, 3], [1, 4], [5, -1]];
      for (const [dx, dy] of cows) { lctx.fillStyle = '#2a1a10'; lctx.fillRect(x + dx - 1, y + dy - 1 + (bob && dx > 0 ? 1 : 0), 4, 3); lctx.fillStyle = dx % 4 ? '#8a4a2a' : '#e8dcc0'; lctx.fillRect(x + dx, y + dy + (bob && dx > 0 ? 1 : 0), 2, 1); }
      lctx.fillStyle = '#efe6cf'; lctx.fillRect(x + 4, y - 3, 5, 1);
    } else {
      lctx.fillStyle = '#2a1a10'; lctx.fillRect(x - 2, y - 5 - bob, 5, 6); lctx.fillStyle = k === 'rider2' ? '#3a6aa0' : '#c8402a'; lctx.fillRect(x - 1, y - 4 - bob, 3, 4);
    }
  }
  function mapLabels() {
    overlay.querySelectorAll('.maplabel').forEach((n) => n.remove());
    for (const r of G.regions) { const el = document.createElement('div'); el.className = 'maplabel region' + (r.minor ? ' minor' : ''); el.textContent = r.name; el.dataset.lon = r.label[0]; el.dataset.lat = r.label[1]; overlay.appendChild(el); }
    for (const pl of map.places) { const el = document.createElement('div'); el.className = 'maplabel place'; el.textContent = pl.name; el.dataset.lon = pl.lon; el.dataset.lat = pl.lat; el.dataset.side = pl.side || 'r'; overlay.appendChild(el); }
  }
  function positionMapLabels() {
    const ow = overlay.clientWidth, oh = overlay.clientHeight;
    const zNow = mapView().z;
    overlay.querySelectorAll('.maplabel').forEach((el) => {
      if (el.classList.contains('minor') && zNow < 1.3) { el.style.visibility = 'hidden'; return; }
      const [x, y] = E.mapToScreen(+el.dataset.lon, +el.dataset.lat);
      const isPlace = el.classList.contains('place');
      const w = el.offsetWidth, h = el.offsetHeight;
      let lx = isPlace ? (el.dataset.side === 'l' ? x - w - 7 : x + 7) : x - w / 2, ly = y - h / 2;
      if (isPlace) {
        if (lx + w > ow - 4) lx = x - w - 7;
        if (lx < 4) lx = Math.min(ow - w - 4, x + 7);
        ly = Math.max(4, Math.min(oh - h - 4, ly));
      }
      el.style.visibility = (isPlace && (x < 0 || x > ow || y < 0 || y > oh)) || lx < -w || ly < -h || lx > ow || ly > oh ? 'hidden' : 'visible';
      el.style.transform = `translate(${Math.round(lx)}px, ${Math.round(ly)}px)`;
    });
  }

  /* ---------- iris transition ---------- */
  const iris = { r: 1, tween: null };
  function irisTo(r, ms) { return new Promise((res) => { if (skipping || reduceMotion) { iris.r = r; return res(); } iris.tween = { a: iris.r, b: r, t: 0, ms, res }; }); }
  function drawIris(dt) {
    if (iris.tween) { const t = iris.tween; t.t += dt * 1000; const k = Math.min(1, t.t / t.ms); iris.r = t.a + (t.b - t.a) * k; if (k >= 1) { iris.tween = null; t.res(); } }
    if (iris.r >= 1) return;
    const R = Math.hypot(W, H) / 2 * iris.r;
    lctx.fillStyle = '#140c08'; lctx.beginPath(); lctx.rect(0, 0, W, H); lctx.arc(W / 2, H / 2, Math.max(0, R), 0, Math.PI * 2, true); lctx.fill('evenodd');
  }
  E.iris = irisTo;

  /* ---------- loop ---------- */
  function loop(ts) {
    const real = Math.min(1, Math.max(0, (ts - last) / 1000 || 0)); last = ts;
    const dt = Math.min(0.1, real);
    update(dt, real);
    if (mode === 'map') drawMap(); else if (scene) drawScene();
    drawIris(real);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(low, 0, 0, W * S, H * S);
    if (mode === 'map') positionMapLabels(); else positionBubbles();
    requestAnimationFrame(loop);
  }

  /* ---------- script runner ---------- */
  E.run = async (steps, opts = {}) => {
    const my = ++runId; skipping = !!opts.skip;
    try { await runSteps(steps, my); } catch (e) { if (e !== ABORT) console.error(e); return false; }
    finally { if (my === runId) skipping = false; }
    return my === runId;
  };
  E.abort = () => { runId++; flushTimers(); };
  async function runSteps(steps, my) { for (const s of steps) { if (my !== runId) throw ABORT; if (skipping) clock += 1.1; await exec(s, my); } }
  const aw = (s, def) => (s.wait === undefined ? def : s.wait);

  async function exec(s, my) {
    const act = (id) => scene.actors.get(id);
    if (s.par) { await Promise.all(s.par.map((x) => runSteps(Array.isArray(x) ? x : [x], my))); return; }
    if (s.nar !== undefined) { if (E.hooks.narrate) await E.hooks.narrate(s.nar, s.who || null, skipping); if (!skipping) await sleep(s.pause || 250); return; }
    if (s.say) {
      attend(s.say);
      if (skipping) return;
      const b = bubble(s.say, s.t);
      await sleep(s.ms || 1100 + s.t.length * 42);
      if (s.keep) return;
      dropBubble(b); await sleep(120); return;
    }
    if (s.walk) {
      const a = act(s.walk); if (!a) return;
      const pts = Array.isArray(s.to[0]) ? s.to : [s.to];
      a.path = pts.map((p) => [p[0], p[1]]); if (s.speed) a.speed = s.speed;
      const end = a.path[a.path.length - 1];
      const leaving = end[0] <= 8 || end[1] <= 8 || end[0] >= scene.w - 8 || end[1] >= scene.h - 8;
      if (!s.quiet && !leaving) attend(s.walk);
      if (skipping) { snap(a); return; }
      if (aw(s, false)) await new Promise((res) => { a.onArrive = res; });
      return;
    }
    if (s.face) { const a = act(s.face); if (a) { if (s.dir === 'front') a.pose = 'front'; else { a.pose = 'side'; a.dir = s.dir; } } return; }
    if (s.emote) { attend(s.emote); const a = act(s.emote); if (a && !skipping) { a.emote = { e: s.e, until: clock + (s.ms || 1600) / 1000 }; if (aw(s, true)) await sleep(s.ms || 1600); } return; }
    if (s.wait) { await sleep(s.wait); return; }
    if (s.zoom) { scene.zoom = s.zoom; resize(); return; }
    if (s.cam) {
      const c = scene.cam; c.follow = null; c.auto = null; scene.attn = [];
      if (skipping || !s.ms) { c.x = s.cam[0]; c.y = s.cam[1]; c.tween = null; return; }
      const p = new Promise((res) => { c.tween = { x0: c.x, y0: c.y, x1: s.cam[0], y1: s.cam[1], t: 0, ms: s.ms, res }; });
      if (aw(s, true)) await p; return;
    }
    if (s.follow !== undefined) { scene.cam.follow = s.follow; scene.cam.tween = null; if (skipping && s.follow) { const a = act(s.follow); if (a) { scene.cam.x = a.x; scene.cam.y = a.y - 12; } } return; }
    if (s.time) { const t = scene.tint; const cur = t.k >= 1 ? t.to : t.to; t.from = cur; t.to = s.time; t.k = skipping || !s.ms ? 1 : 0; t.dur = s.ms || 1; if (!skipping && s.ms && aw(s, false)) await sleep(s.ms); return; }
    if (s.spawn) { spawn(s.spawn, s); if (!s.hidden && !s.quiet) attend(s.spawn); return; }
    if (s.remove) { scene.actors.delete(s.remove); return; }
    if (s.show) { const a = act(s.show); if (a) { a.hidden = false; attend(s.show); } return; }
    if (s.hide) { const a = act(s.hide); if (a) a.hidden = true; return; }
    if (s.shoot) {
      const a = act(s.shoot); if (!a || skipping) return;
      const tgt = typeof s.at === 'string' ? act(s.at) : null;
      attend(s.shoot); if (tgt) attend(s.at); else if (s.at) attend(null, [s.at[0], s.at[1]]);
      const tx = tgt ? tgt.x : s.at ? s.at[0] : null, ty = tgt ? tgt.y - 12 : s.at ? s.at[1] : null;
      if (tx != null && Math.abs(tx - a.x) > 2) { a.dir = tx > a.x ? 1 : -1; a.pose = 'side'; }
      const n = s.n || 1;
      for (let i = 0; i < n; i++) {
        const gx = a.x + a.dir * (a.mount ? 12 : 9), gy = a.y - (a.mount ? 26 : 15) + (s.up ? -6 : 0);
        scene.flashes.push({ x: gx, y: gy, t: 0.09, tx: s.up ? null : tx, ty: s.up ? null : ty });
        scene.flashT = Math.max(scene.flashT, 0.05);
        scene.particles.push({ x: gx, y: gy, vx: a.dir * 6, vy: -8, life: 0.7, max: 0.7, c: '#d8d4cc' });
        if (tx != null && !s.up) for (let k = 0; k < 4; k++) scene.particles.push({ x: tx + (Math.random() - 0.5) * 6, y: ty + 10, vx: (Math.random() - 0.5) * 20, vy: -12, life: 0.4, max: 0.4, c: '#c8a878' });
        await sleep(s.gap || 280);
      }
      return;
    }
    if (s.fall) { attend(s.fall); const a = act(s.fall); if (a) { a.path = []; a.moving = false; a.mount = null; a.down = true; a.blood = s.blood !== false; if (!skipping) { puff(a.x, a.y); puff(a.x + 4, a.y); } } return; }
    if (s.rise) { const a = act(s.rise); if (a) { a.down = false; a.blood = false; } return; }
    if (s.flash) { if (!skipping) { scene.flashT = 0.2; await sleep(s.ms || 250); } return; }
    if (s.move) {
      const [dx, dy] = s.by;
      for (const a of actors()) if (a.id.startsWith(s.move) && !a.down) {
        a.wander = null; if (s.speed) a.speed = s.speed * (0.85 + Math.random() * 0.3);
        a.path = [[a.x + dx + (Math.random() - 0.5) * (s.jitter || 10), a.y + dy + (Math.random() - 0.5) * (s.jitter || 10)]];
        if (skipping) snap(a);
      }
      if (!skipping && s.wait) await sleep(s.wait);
      return;
    }
    if (s.set) { const a = act(s.set); if (a) { if (s.v.x !== undefined) { a.path = []; a.moving = false; a.onArrive = null; attend(s.set); } Object.assign(a, s.v); } return; }
    if (s.prop) { addProp(s.prop); attend(null, [s.prop[1], s.prop[2] - 10]); return; }
    if (s.unprop) { const p = scene.props.find((q) => q.id === s.unprop); if (p) attend(null, [p.x, p.y - 10]); scene.props = scene.props.filter((q) => q.id !== s.unprop); return; }
    if (s.weather) { Object.assign(scene.weather, s.weather); return; }
    if (s.place) { if (E.hooks.place) E.hooks.place(s.place, s.when); return; }
    if (s.dust) { attend(null, [s.dust[0], s.dust[1]]); if (!skipping) for (let i = 0; i < (s.n || 14); i++) puff(s.dust[0] + (Math.random() - 0.5) * (s.r || 16), s.dust[1] + (Math.random() - 0.5) * 6); return; }
    if (s.map) { await enterMap(s.map, my); return; }
    if (s.trail) { await trail(s.trail); return; }
    if (s.mapcam) { const m = s.mapcam; const b = s.fit ? fitView(s.fit, s.pad) : { lon: m[0], lat: m[1], z: m[2] || map.z }; if (skipping || !s.ms) { Object.assign(map, b); map.tween = null; } else { map.tween = { a: { lon: map.lon, lat: map.lat, z: map.z }, b, t: 0, ms: s.ms }; if (aw(s, true)) await sleep(s.ms); } return; }
    if (s.scene) { await leaveMap(); return; }
    if (s.iris !== undefined) { await irisTo(s.iris, s.ms || 500); return; }
  }

  async function enterMap(m, my) {
    await irisTo(0, 450);
    clearBubbles();
    mode = 'map'; resize(); stage.classList.add('onmap');
    map.places = m.places || [];
    map.trails = (m.trails || []).map((t) => ({ ...t, p: t.from || 0, to: t.from || 0 }));
    if (m.fit) Object.assign(map, fitView(m.fit, m.pad)); else { map.lon = m.at[0]; map.lat = m.at[1]; map.z = m.z || 1; }
    map.tween = null;
    mapLabels();
    if (E.hooks.place) E.hooks.place(m.title || 'The trail', m.when || '');
    await irisTo(1, 450);
  }
  // Zoom and centre so every given [lon, lat] point sits inside the view, with room for labels.
  function fitView(pts, pad = 0.22) {
    const P = pts.map((p) => proj(p[0], p[1]));
    const xs = P.map((p) => p[0]), ys = P.map((p) => p[1]);
    const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
    const w = Math.max(24, x1 - x0), h = Math.max(24, y1 - y0);
    const zCover = Math.max(W / MW, H / MH);
    const z = Math.max(zCover, Math.min(4, Math.min(W * (1 - pad * 2) / w, H * (1 - pad * 2) / h)));
    const cx = (x0 + x1) / 2, cy = (y0 + y1) / 2 - 6 / z;
    return { lon: G.view.lon0 + cx / KX, lat: G.view.lat1 - cy / MK, z };
  }
  function trail(t) {
    const tr = map.trails.find((x) => x.id === t.id); if (!tr) return;
    tr.to = t.to; tr.speed = t.speed || 1.2;
    if (skipping) { tr.p = tr.to; return; }
    return new Promise((res) => { tr.res = res; });
  }
  async function leaveMap() {
    await irisTo(0, 450);
    overlay.querySelectorAll('.maplabel').forEach((n) => n.remove());
    mode = 'scene'; resize(); stage.classList.remove('onmap');
    if (E.hooks.place && scene && scene.def.place) E.hooks.place(scene.def.place, scene.def.when);
    await irisTo(1, 450);
  }

  E.mode = () => mode;
  E.portrait = (canvasEl, who) => {
    const pc = canvasEl.getContext('2d'); pc.imageSmoothingEnabled = false;
    pc.clearRect(0, 0, canvasEl.width, canvasEl.height);
    const c = E.cast[who]; if (!c) return false;
    const img = A.sprite.front(who, c.c, 0);
    const k = Math.floor(canvasEl.width / 16);
    pc.drawImage(img, 2, 0, 16, 17, 0, Math.round(canvasEl.height - 17 * k), 16 * k, 17 * k);
    return true;
  };
})();
