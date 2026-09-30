(function () {
  const E = window.ENGINE, S = window.STORY, CH = S.chapters;
  const $ = (id) => document.getElementById(id);
  const els = { stage: $('stage'), game: $('game'), overlay: $('overlay'), text: $('text'), dialog: $('dialog'), speaker: $('speaker'), portrait: $('portrait'),
    next: $('nextBtn'), prev: $('prevBtn'), pips: $('pips'), chN: $('chN'), chT: $('chT'), chapterBtn: $('chapterBtn'), drawer: $('drawer'), chlist: $('chlist'),
    placeName: $('placeName'), placeWhen: $('placeWhen'), title: $('titlecard'), start: $('startBtn'),
    whereBtn: $('whereBtn'), whereDrawer: $('whereDrawer'), whereClose: $('whereClose'), whereNote: $('whereNote'), whereMap: $('whereMap'),
    whereLabels: $('whereLabels'), whereList: $('whereList') };

  const store = {
    get() { try { return JSON.parse(localStorage.getItem('ld-progress') || 'null'); } catch (e) { return null; } },
    set(v) { try { localStorage.setItem('ld-progress', JSON.stringify(v)); } catch (e) { /* storage unavailable */ } },
  };
  const saved = store.get() || { c: 0, b: 0, max: 0 };
  let cur = { c: Math.min(saved.c, CH.length - 1), b: saved.b || 0 }, maxReached = Math.min(saved.max || 0, CH.length - 1);
  let playing = false, typing = null, started = false;
  let heard = null; // the last beat that played all the way through, as 'chapter:beat'
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  E.init(els.stage, els.game, els.overlay);

  /* ---------- dialogue box ---------- */
  E.hooks.narrate = (text, who, skip) => new Promise((resolve) => {
    if (typing) { typing.finish(); }
    const c = who && E.cast[who];
    els.dialog.classList.toggle('narrator', !c);
    if (c) { E.portrait(els.portrait, who); els.speaker.textContent = c.name; }
    if (skip || reduce) { els.text.textContent = text; typing = null; return resolve(); }
    let i = 0; els.text.textContent = '';
    const node = document.createTextNode(''); els.text.appendChild(node);
    const cursor = document.createElement('span'); cursor.className = 'cursor'; els.text.appendChild(cursor);
    const t = {
      finish() { clearInterval(t.iv); node.data = text; cursor.remove(); typing = null; resolve(); },
      iv: setInterval(() => { if (E.paused()) return; i += 2; node.data = text.slice(0, i); if (i >= text.length) t.finish(); }, 22),
    };
    typing = t;
  }).then(() => (skip || E.isSkipping() ? undefined : E.wait(Math.min(4200, 900 + text.length * 22))));
  E.hooks.skip = () => { if (typing) typing.finish(); };
  E.hooks.place = (name, when) => { els.placeName.textContent = name; els.placeWhen.textContent = when || ''; };

  /* ---------- navigation ---------- */
  function sceneStart(ch, b) { let k = 0; for (let i = 0; i <= b; i++) if (ch.beats[i] && ch.beats[i].scene) k = i; return k; }
  function sceneFor(ch, k) { return k === 0 || !ch.beats[k].scene ? ch.scene : ch.beats[k].scene; }

  async function goTo(c, b, opts = {}) {
    E.abort();
    const ch = CH[c];
    cur = { c, b }; maxReached = Math.max(maxReached, c); store.set({ c, b, max: maxReached });
    renderChrome();
    const k = sceneStart(ch, b);
    const needIris = opts.iris;
    if (needIris) await E.iris(0, 380);
    E.load(sceneFor(ch, k));
    for (let i = k; i < b; i++) await E.run(ch.beats[i].steps, { skip: true });
    E.settle();
    if (needIris) E.iris(1, 420);
    playing = true; renderChrome();
    const done = await E.run(ch.beats[b].steps);
    if (done) { playing = false; heard = `${c}:${b}`; renderChrome(); }
  }

  function next() {
    if (!started) return start();
    if (typing) { typing.finish(); return; }
    if (playing) { E.skip(); return; }
    const ch = CH[cur.c];
    if (cur.b + 1 < ch.beats.length) {
      const nb = cur.b + 1;
      if (ch.beats[nb].scene) goTo(cur.c, nb, { iris: true });
      else { cur.b = nb; store.set({ c: cur.c, b: nb, max: maxReached }); renderChrome(); playBeat(); }
    } else if (cur.c + 1 < CH.length) goTo(cur.c + 1, 0, { iris: true });
  }
  async function playBeat() {
    const { c, b } = cur;
    playing = true; renderChrome();
    const done = await E.run(CH[c].beats[b].steps);
    if (done) { playing = false; heard = `${c}:${b}`; renderChrome(); }
  }
  function prev() {
    if (!started) return;
    if (cur.b > 0) goTo(cur.c, cur.b - 1, { iris: !!CH[cur.c].beats[cur.b].scene });
    else if (cur.c > 0) goTo(cur.c - 1, CH[cur.c - 1].beats.length - 1, { iris: true });
  }

  function renderChrome() {
    const ch = CH[cur.c];
    els.chN.textContent = `Ch. ${ch.n}`; els.chT.textContent = ch.title;
    els.pips.innerHTML = '';
    ch.beats.forEach((_, i) => { const p = document.createElement('span'); p.className = 'pip' + (i < cur.b ? ' done' : i === cur.b ? ' now' : ''); els.pips.appendChild(p); });
    const last = cur.c === CH.length - 1 && cur.b === ch.beats.length - 1;
    els.next.textContent = playing ? 'Skip \u25B8\u25B8' : cur.b === ch.beats.length - 1 ? (last ? 'The end' : 'Next chapter \u25B8') : 'Next \u25B8';
    els.next.disabled = !playing && last;
    els.prev.disabled = cur.c === 0 && cur.b === 0;
  }

  function start() {
    started = true; els.title.hidden = true;
    goTo(cur.c, cur.b, { iris: true });
  }

  /* ---------- chapter drawer ---------- */
  function openDrawer() {
    els.chlist.innerHTML = '';
    for (let n = 1; n <= S.total; n++) {
      const idx = CH.findIndex((c) => c.n === n), ch = CH[idx];
      const li = document.createElement('li'), btn = document.createElement('button');
      const open = ch && idx <= maxReached + 1;
      btn.disabled = !open;
      if (ch && idx === cur.c) btn.classList.add('cur');
      btn.innerHTML = `<span class="num">${n}</span><span><b></b><span></span></span>`;
      btn.querySelector('b').textContent = ch ? (open ? ch.title : 'Keep listening\u2026') : 'Not drafted yet';
      btn.querySelector('span > span').textContent = ch && open ? (ch.scene.place || '') : '';
      if (open) btn.addEventListener('click', () => { closeDrawer(); if (!started) { started = true; els.title.hidden = true; } goTo(idx, 0, { iris: true }); });
      li.appendChild(btn); els.chlist.appendChild(li);
      if (!ch && n > CH[CH.length - 1].n + 2) break;
    }
    els.drawer.hidden = false;
    const c = els.chlist.querySelector('.cur'); if (c) c.focus();
  }
  function closeDrawer() { els.drawer.hidden = true; els.chapterBtn.focus(); }

  /* ---------- where is everyone? ---------- */
  const W = window.WHERE;
  // How far into the book the reader is: the chapter number plus the share of its beats already heard.
  // Nothing past that point is shown, so the map never spoils what is still to come.
  function storyTime() {
    const ch = CH[cur.c], beats = cur.b + (heard === `${cur.c}:${cur.b}` ? 1 : 0);
    return ch.n + Math.min(0.99, beats / ch.beats.length);
  }
  const listOf = (xs) => (xs.length < 3 ? xs.join(' and ') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const brief = (ids) => { const n = ids.map(W.name); return cap(n.length > 3 ? `${n.slice(0, 3).join(', ')} +${n.length - 3}` : n.join(', ')); };
  let where = null;
  function drawWhere() {
    if (!where || els.whereDrawer.hidden) return;
    const P = W.PLACES.dove;
    E.drawWhere(els.whereMap, els.whereLabels, {
      spots: where.groups.map((g) => ({
        lon: g.lon, lat: g.lat,
        heads: g.herd ? ['herd', ...g.ids.filter((id) => id === 'call' || id === 'gus')] : g.ids.slice(0, 3).map(W.face),
        lines: [g.herd ? 'The herd' : brief(g.ids)],
      })),
      graves: where.dead.map((x) => [x.lon, x.lat]),
      home: { name: 'Lonesome Dove', lon: P[0], lat: P[1] },
    });
  }
  function whereRow(who, title, sub, extra, cls) {
    const li = document.createElement('li'); if (cls) li.className = cls;
    const face = document.createElement('canvas'); face.width = 40; face.height = 30; E.head(face, who);
    const txt = document.createElement('div'), b = document.createElement('b'); b.textContent = title; txt.appendChild(b);
    for (const [c, t] of [['sub', sub], ['who', extra]]) if (t) { const s = document.createElement('span'); s.className = c; s.textContent = t; txt.appendChild(s); }
    li.append(face, txt); els.whereList.appendChild(li);
  }
  function whereHeading(t) { const li = document.createElement('li'); li.className = 'section'; li.textContent = t; els.whereList.appendChild(li); }
  function openWhere() {
    const ch = CH[cur.c];
    where = W.at(storyTime());
    E.pause(true);
    els.whereNote.textContent = `As of chapter ${ch.n}, “${ch.title}”. Positions are approximate (the novel's geography is loose), and nothing past where you are is shown.`;
    els.whereList.innerHTML = '';
    for (const g of where.groups) {
      if (g.herd) whereRow('herd', 'The Hat Creek herd', g.label, listOf([...g.ids.map(W.name), 'the hands']));
      else whereRow(W.face(g.ids[0]), cap(listOf(g.ids.map(W.name))), g.label);
    }
    if (where.unknown.length) { whereHeading('Whereabouts unknown'); for (const u of where.unknown) whereRow(W.face(u.id), cap(W.name(u.id)), u.note); }
    if (where.dead.length) {
      whereHeading('Laid to rest');
      for (const x of [...where.dead].sort((a, b) => a.ch - b.ch)) whereRow(W.face(x.id), cap(W.name(x.id)), x.note, `Chapter ${x.ch}`, 'gone');
    }
    els.whereDrawer.hidden = false;
    els.whereDrawer.querySelector('.sheet').scrollTop = 0;
    drawWhere();
    els.whereClose.focus();
  }
  function closeWhere() { els.whereDrawer.hidden = true; where = null; E.pause(false); els.whereBtn.focus(); }
  new ResizeObserver(() => requestAnimationFrame(drawWhere)).observe(els.whereMap);

  els.next.addEventListener('click', next);
  els.prev.addEventListener('click', prev);
  els.dialog.addEventListener('click', next);
  els.start.addEventListener('click', (e) => { e.stopPropagation(); start(); });
  els.chapterBtn.addEventListener('click', openDrawer);
  els.drawer.addEventListener('click', (e) => { if (e.target === els.drawer) closeDrawer(); });
  els.whereBtn.addEventListener('click', openWhere);
  els.whereClose.addEventListener('click', closeWhere);
  els.whereDrawer.addEventListener('click', (e) => { if (e.target === els.whereDrawer) closeWhere(); });
  document.addEventListener('keydown', (e) => {
    if (!els.drawer.hidden) { if (e.key === 'Escape') closeDrawer(); return; }
    if (!els.whereDrawer.hidden) { if (e.key === 'Escape') closeWhere(); return; }
    if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
  });

  // Deep link: #c3 or #c3b2 opens chapter 3 (beat 2) directly.
  const m = /^#c(\d+)(?:b(\d+))?$/.exec(location.hash);
  if (m) { const i = CH.findIndex((c) => c.n === +m[1]); if (i >= 0) { cur = { c: i, b: Math.min(+(m[2] || 0), CH[i].beats.length - 1) }; maxReached = Math.max(maxReached, i); } }

  window.__LD = { goTo, CH, storyTime, openWhere, closeWhere };

  // Idle backdrop behind the title card: the first scene, paused at its opening frame.
  E.load(CH[cur.c].scene);
  if (cur.c > 0 || cur.b > 0) els.start.textContent = `Continue \u00B7 Ch. ${CH[cur.c].n} \u25B8`;
  renderChrome();
})();
