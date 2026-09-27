/* Part I, chapters 7–25. Built from a chapter-by-chapter reading of the novel; all wording paraphrased. */
(function () {
  const E = window.ENGINE, T = window.ART.T, K = window.STORYKIT, CH = window.STORY.chapters;
  const { nar, say, walk, go, face, emote, cam, wait, par, P, doveGround, doveProps, pigs, DOVE_W, DOVE_H, saloon, lorenaRoom, crossing } = K;

  Object.assign(E.cast, {
    wilbarger: { name: 'Wilbarger', c: { skin: '#e89a78', hair: '#6a4a2a', hat: '#3a3028', band: '#1e1812', shirt: '#9a6a4a', vest: '#4a3a2a', pants: '#4a4034', beard: 'stubble' } },
    chick: { name: 'Chick', c: { skin: '#d8a07a', hair: '#3a2a1e', hat: '#8a7a5a', band: '#4a3a2a', shirt: '#7a8a6a', pants: '#5a4a3a', gun: '#9a9aa0', beard: 'stubble' } },
    allen: { name: 'Allen', c: { skin: '#f0b89a', hair: '#c8784a', brim: 'none', shirt: '#b8b0a0', pants: '#5a5048', beard: 'stubble', beardCol: '#c8784a' } },
    sean: { name: 'Sean', c: { skin: '#f4c0a0', hair: '#b8582e', brim: 'none', shirt: '#9ab0a0', pants: '#5a5048', blush: '#f09a88' } },
    jasper: { name: 'Jasper', c: { skin: '#e0b088', hair: '#5a3a22', hat: '#7a6a50', band: '#3a2a1a', shirt: '#b8a888', pants: '#4a4a52', beard: 'mustache', beardCol: '#5a3a22' } },
    soupy: { name: 'Soupy', c: { skin: '#dca47a', hair: '#8a8278', hat: '#5a5048', band: '#2a2420', shirt: '#6a7a8a', pants: '#4a4034', beard: 'mustache', beardCol: '#9a948a' } },
    needle: { name: 'Needle', c: { skin: '#e6b490', hair: '#7a5a3a', hat: '#a08a60', band: '#5a4630', shirt: '#c8b890', pants: '#5a5048' } },
    bert: { name: 'Bert', c: { skin: '#d8a078', hair: '#2a1e16', hat: '#6a4a30', band: '#2a1a10', shirt: '#b85a4a', pants: '#4a4a52' } },
    bill: { name: 'Bill Spettle', c: { skin: '#e8b890', hair: '#c8a060', brim: 'none', shirt: '#a89a7a', pants: '#6a5a44', boots: '#e8b890' } },
    pete: { name: 'Pete Spettle', c: { skin: '#e8b890', hair: '#b89050', brim: 'none', shirt: '#8a8a7a', pants: '#6a5a44', boots: '#e8b890' } },
    widow: { name: 'Mrs Spettle', c: { skin: '#dcae8a', hair: '#6a5a4a', brim: 'none', long: true, shirt: '#8a8070', dress: '#6a6258', boots: '#dcae8a' } },
    maude: { name: 'Maude Rainey', c: { skin: '#f0a080', hair: '#8a5a3a', brim: 'none', long: true, shirt: '#b86a5a', dress: '#8a5a4a', blush: '#e07060' } },
    joe: { name: 'Joe Rainey', c: { skin: '#dca47a', hair: '#4a3a2a', brim: 'none', shirt: '#7a6a5a', pants: '#4a4034', beard: 'full', beardCol: '#4a3a2a' } },
    kid1: { name: 'Rainey boy', c: { skin: '#f0c098', hair: '#9a6a34', brim: 'none', shirt: '#6a86a0', pants: '#6a5a44' } },
    kid2: { name: 'Spettle child', c: { skin: '#f0c098', hair: '#d8b070', brim: 'none', shirt: '#b8a888', pants: '#8a7a5a', boots: '#f0c098' } },
  });
  Object.assign(E.horses, {
    mouse: { coat: '#c8a868', mane: '#4a3422' },
    mudpie: { coat: '#a8582a', mane: '#6a3418' },
    puddin: { coat: '#ece6d8', mane: '#c8c0b0' },
    malaria: { coat: '#c8a060', mane: '#2a1a12', socks: true },
    sardine: { coat: '#7a4424', mane: '#2a1a12' },
    sunup: { coat: '#c06a34', mane: '#8a4020', blaze: true },
    wilblack: { coat: '#262224', mane: '#121012' },
    grulla: { coat: '#8a8478', mane: '#3a3632' },
    loremare: { coat: '#6a4028', mane: '#2a1810' },
    greasy: { coat: '#9a9a96', mane: '#6a6a66', mule: true },
    kickboy: { coat: '#7a4a2a', mane: '#3a2216', mule: true },
    irishmule: { coat: '#7a6a5a', mane: '#4a3e34', mule: true },
    donkey: { coat: '#9a8e7e', mane: '#5a5046', mule: true },
    jasperhorse: { coat: '#8a7a64', mane: '#4a3e30' },
    soupyhorse: { coat: '#5a3a2a', mane: '#2a1a12', blaze: true },
  });

  const PL = {
    ...P,
    ogallala: { name: 'Ogallala', lon: -101.72, lat: 41.13, col: '#3a6aa0' },
    montana: { name: 'Montana', lon: -108.5, lat: 46.9, col: '#6d8a3a' },
    austin: { name: 'Austin', lon: -97.74, lat: 30.27, col: '#3a6aa0' },
    galveston: { name: 'Galveston', lon: -94.8, lat: 29.3, col: '#3a6aa0' },
    denver: { name: 'Denver', lon: -104.99, lat: 39.74, col: '#3a6aa0' },
  };
  const pts = (...ps) => ps.map((p) => [p.lon, p.lat]);

  /* ---------- crowds ---------- */
  const COWS = [{ coat: '#8a4a2a' }, { coat: '#e8dcc0', patch: '#8a4a2a' }, { coat: '#3a2a22' }, { coat: '#b4602e', brindle: true }, { coat: '#d8c8a8' }, { coat: '#6a4a3a', patch: '#e8dcc0' }, { coat: '#9a7a5a', brindle: true }, { coat: '#c89a6a' }];
  const COATS = ['#7a4a2a', '#b4602e', '#2e2a2c', '#c8a868', '#9aa2a6', '#e8e4da', '#8a6a4a', '#5a3a2a', '#c8a060', '#6a5448'];
  function rnd(seed) { let s = seed; return () => ((s = (s * 16807) % 2147483647) / 2147483647); }
  function cows(prefix, n, x, y, w, h, seed = 1, wander = true) {
    const r = rnd(seed * 97 + 3), out = {};
    for (let i = 0; i < n; i++) {
      const k = Math.floor(r() * COWS.length), ax = x + r() * w, ay = y + r() * h;
      out[prefix + i] = { kind: 'cow', at: [ax, ay], cfg: COWS[k], cfgKey: 'cow' + k, dir: r() < 0.5 ? 1 : -1, wander: wander ? [ax, ay, 14] : null };
    }
    return out;
  }
  function horses(prefix, n, x, y, w, h, seed = 1, wander = true) {
    const r = rnd(seed * 131 + 7), out = {};
    for (let i = 0; i < n; i++) {
      const ax = x + r() * w, ay = y + r() * h;
      out[prefix + i] = { kind: 'horse', who: prefix + 'c' + (i % COATS.length), cfg: { coat: COATS[i % COATS.length] }, at: [ax, ay], dir: r() < 0.5 ? 1 : -1, wander: wander ? [ax, ay, 16] : null };
    }
    return out;
  }
  COATS.forEach((c, i) => ['h', 'fh', 'mh', 'hic', 'bh', 'rh'].forEach((p) => { E.horses[p + 'c' + i] = { coat: c, mane: window.ART.shade(c, -0.45) }; }));

  /* ---------- scenes ---------- */
  const dove = (o) => ({
    w: DOVE_W, h: DOVE_H, seed: 11, ground: doveGround,
    props: [...doveProps({ lit: o.lit }).filter((p) => !(o.noSign && p[0] === 'sign')), ...(o.props || [])],
    time: o.time || 'hot', weather: o.weather || { heat: true }, place: o.place || 'Lonesome Dove', when: o.when || '', cam: o.cam || [140, 200], actors: o.actors || {},
  });
  const brush = (o) => ({
    w: 380, h: 400, seed: o.seed || 51, time: o.time || 'night', weather: o.weather || { moon: 'quarter' }, place: o.place || 'Coahuila, Mexico', when: o.when || 'Night', cam: o.cam || [190, 200],
    ground: (g) => { g.fill(T.DRY); g.patches(T.DIRT, T.DRY, 18, 8, 26); g.patches(T.ROCK, T.DIRT, 4, 6, 12); if (o.river) { g.line([[0, 372], [190, 364], [380, 374]], 44, T.MUD, 3); g.line([[0, 376], [190, 368], [380, 378]], 26, T.WATER, 3); } },
    props: [
      ['mesquite', 40, 70, { seed: 21 }], ['mesquite', 330, 60, { seed: 22 }], ['mesquite', 120, 300, { seed: 23 }], ['mesquite', 310, 280, { seed: 24 }],
      ['bush', 90, 140, { seed: 5 }], ['bush', 200, 90, { seed: 6 }], ['bush', 280, 170, { seed: 7 }], ['bush', 60, 230, { seed: 8 }], ['bush', 240, 330, { seed: 9 }], ['bush', 350, 230, { seed: 10 }],
      ['cactus', 150, 60], ['cactus', 30, 170], ['cactus', 220, 240], ['cactus', 350, 130], ['cactus', 170, 360], ['rock', 260, 110], ['rock', 100, 350],
      ...(o.props || []),
    ],
    actors: o.actors || {},
  });
  const range = (o) => ({
    w: 440, h: 400, seed: o.seed || 61, time: o.time || 'hot', weather: o.weather || {}, place: o.place || 'Upriver from Lonesome Dove', when: o.when || '', cam: o.cam || [220, 200],
    ground: (g) => { g.fill(T.DRY); g.patches(T.DIRT, T.DRY, 20, 8, 24); g.line([[0, 366], [220, 358], [440, 368]], 50, T.MUD, 3); g.line([[0, 370], [220, 362], [440, 372]], 30, T.WATER, 3); },
    props: [['mesquite', 60, 60, { seed: 31 }], ['mesquite', 390, 90, { seed: 32 }], ['mesquite', 250, 40, { seed: 33 }], ['bush', 150, 120, { seed: 3 }], ['bush', 330, 300, { seed: 4 }], ['cactus', 110, 280], ['cactus', 380, 200], ['cactus', 200, 320], ...(o.props || [])],
    actors: o.actors || {},
  });
  const camp = (o) => ({
    w: 440, h: 420, seed: o.seed || 71, time: o.time || 'hot', weather: o.weather || {}, place: o.place || 'Hat Creek cow camp', when: o.when || '', cam: o.cam || [170, 180],
    ground: (g) => { g.fill(T.DRY); g.patches(T.DIRT, T.DRY, 24, 8, 26); g.circle(170, 190, 30, T.DIRT, 6); g.line([[0, 396], [220, 390], [440, 400]], 46, T.MUD, 3); g.line([[0, 400], [220, 394], [440, 404]], 26, T.WATER, 3); },
    props: [
      ['wagon', 150, 176], ['campfire', 186, 196], ['crate', 126, 182], ['bedroll', 210, 214, { c: '#6a5a8a' }], ['bedroll', 120, 212, { c: '#8a4a3a' }],
      ['mesquite', 320, 110, { seed: 41 }], ['mesquite', 40, 90, { seed: 42 }], ['mesquite', 400, 300, { seed: 43 }],
      ['cactus', 90, 150], ['cactus', 260, 60], ['cactus', 60, 330], ['bush', 230, 120, { seed: 11 }], ['bush', 300, 250, { seed: 12 }],
      ...(o.props || []),
    ],
    actors: o.actors || {},
  });

  Object.assign(window.STORYKIT, { dove, brush, range, camp, cows, horses, PL, pts, COATS });

  /* ---------- 7 ---------- */
  CH.push({
    n: 7, title: 'Montana', part: 1,
    scene: dove({ when: 'March · late morning', cam: [80, 190], actors: {
      jake: { at: [56, 160], pose: 'front' }, gus: { at: [70, 164], pose: 'front' }, ...pigs([40, 184], [60, 190]),
      dish: { at: [176, 244], pose: 'front' }, call: { at: [140, 268] }, mare: { kind: 'horse', who: 'hellbitch', at: [160, 272] },
    } }),
    beats: [
      { steps: [
        nar('Jake and Gus squat against the cool side of the adobe springhouse, passing the jug back and forth.', 'gus'),
        say('jake', 'I saw Clara, up in Ogallala.'),
        nar('Clara lives on the Platte in Nebraska now, married to a horse trader named Bob Allen. They have two girls, and lost their boys.', 'jake'),
        { map: { fit: pts(PL.dove, PL.ogallala, PL.austin), places: [PL.dove, PL.austin, PL.ogallala], title: 'Clara', when: 'Austin, then the Platte' } },
        nar('Gus remembers her at sixteen, running her family’s store in Austin after a raid killed her parents. She turned down both him and Jake, and married dull, steady Bob.', 'gus'),
        { scene: true },
      ] },
      { steps: [
        { set: 'jake', v: { pose: 'front' } }, emote('jake', 'z', { ms: 1800 }),
        nar('Jake falls asleep with his hat over his face. Gus decides not to mention Lorena. Jake will find her soon enough on his own.', 'gus'),
        go('gus', [[120, 200], [170, 236]]), cam(160, 250, 1200),
        say('gus', 'Sweating like a mule, Dish?'),
        nar('Dish, soaked through, cranks the well windlass. Down in the lot, Call ties up one of the Hell Bitch’s hind feet so she has to stand on three legs and take the saddle.', 'call'),
      ] },
      { steps: [
        walk('call', [[180, 252]]), face('call', -1),
        say('call', 'I’ve a mind to take a herd to Montana.'),
        say('gus', 'Montana? There’s nothing up there but Indians and bears.'),
        { map: { fit: pts(PL.dove, PL.montana, PL.ogallala), places: [PL.dove, PL.ogallala, PL.montana], title: 'Call’s idea', when: 'North to Montana',
          trails: [{ id: 'idea', pts: pts(PL.dove, PL.ogallala, PL.montana), col: '#6d8a3a', dash: 4, icon: 'herd' }] } },
        { trail: { id: 'idea', to: 2, speed: 0.9 } },
        nar('Call wants grass country nobody has claimed yet. Gus scoffs, until he works out that the road to Montana crosses the Platte, where Clara lives.', 'gus'),
        { scene: true },
        nar('Call says Newt could stay and run the place here. Gus is not so sure the boy would want to be left.', 'call'),
      ] },
    ],
  });

  /* ---------- 8 ---------- */
  CH.push({
    n: 8, title: 'The sign', part: 1,
    scene: dove({ when: 'Afternoon', cam: [190, 250], actors: {
      newt: { at: [172, 244], pose: 'front' }, pea: { at: [188, 244], pose: 'front' }, dish: { at: [196, 234], pose: 'front' }, deets: { at: [214, 262], pose: 'front' },
      call: { at: [60, 330], mount: 'hellbitch' },
      wilbarger: { at: [300, 40], mount: 'wilblack', hidden: true }, chick: { at: [312, 30], mount: 'grulla', hidden: true },
    } }),
    beats: [
      { steps: [
        go('call', [[150, 300], [170, 256]]),
        say('call', 'Knock off, boys. We’re going to Mexico tonight.'),
        emote('newt', '!'),
        nar('Call has loped the mare twenty miles along the river. Newt hopes with all his heart that "we" includes him.', 'newt'),
      ] },
      { steps: [
        { show: 'wilbarger' }, { show: 'chick' },
        par(go('wilbarger', [[300, 214], [236, 236]]), go('chick', [[310, 214], [246, 244]])),
        nar('Two riders stop to read the sign: an old root-cellar door nailed to the corral, painted by Gus with the firm’s name, the partners, Pea Eye, and "Deets, Joshua".', 'deets'),
        nar('It promises they do not rent pigs, and ends with a Latin motto Gus copied out of a book without knowing what it means.', 'gus'),
        say('wilbarger', 'Mexicans took my horses. I need forty.'),
        nar('Wilbarger has a herd waiting beyond the Nueces for Kansas. His tiny, pockmarked hand Chick asks after the yellow-haired girl in town. Dish claims she’s his sister.', 'dish'),
      ] },
      { steps: [
        { set: 'dish', v: { x: 360, y: 206, pose: 'side' } }, cam(360, 200, 1400),
        emote('dish', '!'),
        nar('Dish walks round behind the Dry Bean, under Lorena’s window, and hears her bed creaking. Somebody else is up there.', 'dish'),
        go('dish', [[330, 260], [300, 318]]),
        nar('He stalks down to the river ready to kill someone, and sits an hour watching a coyote eat a frog.', 'dish'),
        go('dish', [[348, 212]]),
        nar('When he comes back, Lorena is downstairs, flushed, drinking from Jake Spoon’s glass. Jake cheerfully buys Dish a drink, then another. By dark Dish is singing at Lippy’s piano.', 'jake'),
      ] },
    ],
  });

  /* ---------- 9 ---------- */
  CH.push({
    n: 9, title: 'Across the river', part: 1,
    scene: dove({ when: 'Late afternoon', cam: [120, 200], actors: {
      gus: { at: [100, 166], pose: 'front' }, call: { at: [124, 166], pose: 'front' }, ...pigs([80, 186], [140, 188]),
      wilbarger: { at: [300, 214], mount: 'wilblack' }, chick: { at: [312, 222], mount: 'grulla' },
      dish: { at: [212, 150], pose: 'side', hidden: true }, jake: { at: [230, 170], pose: 'front', hidden: true }, bol: { at: [160, 152], pose: 'front', hidden: true },
    } }),
    beats: [
      { steps: [
        par(go('wilbarger', [[160, 214], [116, 190]]), go('chick', [[180, 220], [150, 204]])),
        walk('shoat', [[118, 200], [110, 214]], { speed: 12 }),
        nar('Wilbarger rides his big black right up to the porch. The shoat strolls straight underneath the horse.', 'gus'),
        say('call', 'You’ll have your horses by sunup.'),
        nar('He wants forty broke horses for three thousand cattle. Wilbarger says he studied Latin at Yale, and still can’t make sense of Gus’s motto.', 'wilbarger'),
        par(go('wilbarger', [[160, 214], [300, 214], [300, 40]]), go('chick', [[180, 220], [310, 214], [310, 30]])),
      ] },
      { steps: [
        say('call', 'We take the Hacienda Flores.'),
        nar('Call’s plan: raid Pedro Flores’s ranch, the biggest in Coahuila. Sell Wilbarger his forty and keep the rest as a remuda for the drive north.', 'call'),
        { show: 'dish' }, { show: 'jake' }, cam(220, 170, 1000),
        emote('dish', '...'),
        nar('Dish, two bottles into Jake’s hospitality, is on his hands and knees in the dry creek bed, being sick.', 'dish'),
        { show: 'bol' }, say('bol', 'CLANG! CLANG!', 1600),
        { shoot: 'jake', up: true, n: 3, gap: 420 },
        nar('Bolivar starts on the bell early. Jake draws his pearl-handled pistol and fires three shots high over the house. The clanging never stops.', 'jake'),
      ] },
      { steps: [
        { time: 'dusk', ms: 2500, wait: false },
        { set: 'call', v: { x: 150, y: 268, pose: 'front' } }, { spawn: 'newt', at: [134, 270], pose: 'front' }, { spawn: 'deets', at: [166, 276], pose: 'front' },
        { spawn: 'mouse', kind: 'horse', who: 'mouse', at: [110, 290] },
        cam(140, 270, 1200),
        nar('At sunset, by the stone stock tank, Call hands Newt a freshly oiled Colt and a gun belt. For the first time in his life Newt feels grown.', 'newt'),
        emote('newt', '♥'),
        nar('He ropes his dun gelding, Mouse, on the first throw. Deets grins.', 'deets'),
      ] },
      { scene: dove({ time: 'dusk', weather: {}, when: 'Dusk', cam: [230, 320], actors: {
          call: { at: [200, 280], mount: 'hellbitch' }, gus: { at: [180, 272], mount: 'mudpie' }, jake: { at: [220, 272], mount: 'jakebay' }, deets: { at: [240, 280], mount: 'wishbone' },
          pea: { at: [190, 290], mount: 'sardine' }, dish: { at: [230, 292], mount: 'dishsorrel' }, newt: { at: [210, 298], mount: 'mouse' },
        } }),
        steps: [
          nar('Seven riders: Call, Gus, Jake, Deets, Pea Eye, a queasy Dish, and Newt, wearing a gun at last.', 'newt'),
          { time: 'night', ms: 4000, wait: false },
          ...['call', 'gus', 'jake', 'deets', 'pea', 'dish', 'newt'].map((id, i) => walk(id, [[200 + i * 8, 336], [200 + i * 10, 378]], { speed: 24 })),
          cam(240, 360, 3500),
          nar('They splash across the Rio Grande at dusk and ride south-east into Mexico, toward the Hacienda Flores thirty miles away.'),
        ] },
    ],
  });

  /* ---------- 10 ---------- */
  CH.push({
    n: 10, title: 'The Irishmen', part: 1,
    scene: brush({ cam: [190, 150], actors: {
      call: { at: [40, 330], mount: 'hellbitch' }, gus: { at: [24, 344], mount: 'mudpie' }, jake: { at: [56, 348], mount: 'jakebay' }, deets: { at: [70, 336], mount: 'wishbone' },
      pea: { at: [30, 362], mount: 'sardine' }, dish: { at: [60, 368], mount: 'dishsorrel' }, newt: { at: [44, 374], mount: 'mouse' },
      ...cows('lh', 16, 180, 60, 150, 80, 3, false),
    } }),
    beats: [
      { steps: [
        ...['call', 'gus', 'jake', 'deets', 'pea', 'dish', 'newt'].map((id, i) => walk(id, [[150 + (i % 3) * 14, 250 - i * 6]], { speed: 26 })),
        cam(190, 180, 2500),
        { move: 'lh', by: [-260, 20], speed: 50 }, { dust: [250, 110], n: 20, r: 60 },
        nar('Two hours of long trotting under a thin moon, the Milky Way like speckled cloud. Topping a ridge they spook a herd of wild longhorns that thunders away west.', 'call'),
        nar('Call marks them down to collect another night. Newt tries to memorise landmarks and only feels more lost.', 'newt'),
      ] },
      { scene: brush({ cam: [230, 170], actors: {
          call: { at: [120, 90] }, deets: { at: [106, 96] }, newt: { at: [134, 98] },
          allen: { at: [236, 160], pose: 'front' }, sean: { at: [256, 162], pose: 'front' },
          mule: { kind: 'horse', who: 'irishmule', at: [300, 176] }, donkey: { kind: 'horse', who: 'donkey', at: [206, 184] },
        }, props: [['ruin', 246, 150], ['campfire', 246, 172], ['fenceH', 300, 140, { len: 24 }]] }),
        steps: [
          emote('deets', '!'),
          nar('Call splits the party. He takes Deets and Newt after an out camp, while Gus, Jake, Pea and Dish go for the horse herd. Deets hears singing ahead.', 'deets'),
          go('call', [[180, 120], [210, 140]]), go('deets', [[200, 130]]), go('newt', [[190, 136]]),
          nar('In a burnt-out adobe hut, two Irishmen are finishing a bottle and arguing whether to eat their mule or their donkey first.', 'newt'),
          say('allen', 'The donkey is the smaller loss, Sean.'),
        ] },
      { steps: [
        { zoom: 1.4 }, go('call', [[228, 168]], { speed: 14 }),
        say('sean', 'Murderers!'),
        go('sean', [[298, 172]], { speed: 40 }), { set: 'sean', v: { x: 270, y: 176 } }, { dust: [290, 176], n: 10 },
        emote('deets', '!'),
        nar('Young Sean leaps onto the hobbled mule, which goes straight down and pitches him back toward the fire. Deets laughs until he can barely stand.', 'deets'),
        nar('Allen and Sean O’Brien were trying to reach Galveston. Call warns them Pedro Flores will hang them, and promises to send back two horses.', 'allen'),
      ] },
    ],
  });

  /* ---------- 11 ---------- */
  CH.push({
    n: 11, title: 'Two herds in the dark', part: 1,
    scene: brush({ seed: 53, cam: [190, 200], actors: {
      gus: { at: [120, 260], mount: 'mudpie' }, jake: { at: [150, 270], mount: 'jakebay' }, newt: { at: [170, 250], mount: 'mouse' },
      ...horses('hic', 12, 200, 170, 120, 70, 5),
    } }),
    beats: [
      { steps: [
        nar('Gus’s party finds only forty or so horses, and they are tired and gentle. Then Gus sees the brand: HIC on the left hip.', 'gus'),
        say('gus', 'These are Wilbarger’s own horses!'),
        nar('Somebody stole them from Wilbarger and they have ended up here. He will be buying his own horses back. Newt ropes two for the Irishmen.', 'newt'),
      ] },
      { scene: brush({ seed: 54, cam: [190, 250], weather: { moon: 'crescent', dusty: true }, actors: {
          call: { at: [320, 60], mount: 'hellbitch' }, pea: { at: [340, 90], mount: 'sardine' }, newt: { at: [180, 80], mount: 'mouse' },
          ...horses('fh', 18, 200, 40, 130, 80, 9, false),
        } }),
        steps: [
          cam(250, 90, 800),
          nar('Four hours before sunup, Call, Pea and Newt ease a hundred of Pedro Flores’s horses out of a valley a mile from the hacienda, waving ropes, saying nothing.', 'call'),
          { move: 'fh', by: [-40, 120], speed: 30 }, walk('call', [[300, 180]]), walk('pea', [[320, 200]]), walk('newt', [[150, 190]]), cam(220, 200, 3000),
          nar('Newt rides the left point alone. He thinks about hanging, and how crossing a river turns stealing into a game.', 'newt'),
        ] },
      { steps: [
        { spawn: 'mh0', kind: 'horse', who: 'mhc0', cfg: { coat: COATS[0] }, at: [100, 390] },
        ...Array.from({ length: 12 }, (_, i) => ({ spawn: 'mh' + (i + 1), kind: 'horse', who: 'mhc' + ((i + 1) % 10), cfg: { coat: COATS[(i + 1) % 10] }, at: [60 + (i % 6) * 26, 380 + Math.floor(i / 6) * 16] })),
        { move: 'mh', by: [60, -170], speed: 60, jitter: 30 }, { move: 'fh', by: [10, 100], speed: 60, jitter: 30 },
        { spawn: 'vaq', who: 'vaquero', at: [120, 360], mount: 'mhc3' }, walk('vaq', [[170, 250]], { speed: 60 }),
        walk('newt', [[190, 300], [230, 340]], { speed: 60 }),
        { shoot: 'vaq', at: [300, 200], n: 2, gap: 300 },
        { dust: [180, 280], n: 30, r: 120 }, { dust: [200, 320], n: 30, r: 120 },
        { shoot: 'pea', at: 'vaq', n: 1 },
        nar('Near the river their herd slams into another one coming the other way, horses run south out of Texas by four Mexican thieves.', 'newt'),
        emote('newt', '!'),
        nar('Newt is swept along in blinding dust. Mouse jumps a chaparral bush, a stranger cursing in Spanish runs alongside, and somewhere Call’s Henry rifle fires.', 'newt'),
      ] },
      { scene: { ...crossing, time: 'dawn', weather: {}, when: 'Sunrise', cam: [150, 150],
          actors: { call: { at: [150, 140], mount: 'hellbitch' }, pea: { at: [196, 176], mount: 'sardine' }, newt: { at: [30, 60], mount: 'mouse' }, ...horses('bh', 16, 60, 150, 200, 40, 11) } },
        steps: [
          go('newt', [[110, 110]], { speed: 24 }),
          nar('At sunrise Newt tops a rise and sees the river curve at the old Comanche crossing. He is home.', 'newt'),
          nar('Call is waiting on the bank, rifle in the crook of his arm, with well over a hundred horses rolling in the shallows. The grey mare is lathered but far from used up.', 'call'),
          emote('newt', '...'),
          say('newt', 'Morning, Captain.'),
          nar('Newt wipes the tears off his dusty face before anyone can see them, and says nothing else.', 'newt'),
        ] },
    ],
  });

  /* ---------- 12 ---------- */
  CH.push({
    n: 12, title: 'Big saddles', part: 1,
    scene: dove({ when: 'Morning', cam: [150, 260], actors: {
      wilbarger: { at: [120, 240], mount: 'wilblack' }, chick: { at: [220, 250], pose: 'front' }, call: { at: [100, 260], mount: 'hellbitch' },
      dish: { at: [196, 262], pose: 'front' }, pea: { at: [150, 244], pose: 'front' }, newt: { at: [170, 246], pose: 'front' }, deets: { at: [80, 244], pose: 'front' },
      ...horses('hic', 10, 130, 262, 60, 30, 5),
    } }),
    beats: [
      { steps: [
        { move: 'hic', by: [110, -20], speed: 30 },
        say('wilbarger', 'All thirty-eight for that grey mare.'),
        say('call', 'She ain’t for sale.'),
        nar('Wilbarger cuts out his thirty-eight branded horses and offers every one of them for the Hell Bitch. Call won’t hear of it.', 'wilbarger'),
        nar('He warns them Montana is too far, too cold, and full of bears, then rides off. Jake has already gone straight to the Dry Bean.', 'wilbarger'),
      ] },
      { steps: [
        say('dish', 'Pea’s sweet on the widow Cole.'),
        nar('The hands tease Pea Eye about tall Mary Cole. Pea remembers helping her rescue her washing in a sudden thunderstorm.', 'pea'),
        nar('And another memory he never mentions: years ago, passing Maggie’s room, he heard Newt’s mother call the Captain by his first name.', 'pea'),
      ] },
      { steps: [
        { spawn: 'gus', at: [60, 150], mount: 'mudpie' }, { spawn: 'allen', at: [40, 140], mount: 'hc2' }, { spawn: 'sean', at: [30, 160], mount: 'hc5' },
        par(go('gus', [[120, 206]]), go('allen', [[96, 212]]), go('sean', [[80, 222]])), cam(110, 220, 1200),
        nar('Gus rides in with the Irishmen perched on enormous silver-studded Mexican saddles, taken from drunk bandits in Sabinas along with ten skinny horses.', 'gus'),
        emote('sean', '...'),
        nar('Sean looks at the bare, treeless yard and weeps. He had expected green America. When his tired horse half-bucks and leaves him dangling from the horn, even Call laughs.', 'sean'),
      ] },
      { steps: [
        { set: 'call', v: { mount: 'sunup' } },
        say('call', 'We leave the first of April.'),
        nar('Call tells Gus to move the stolen horses upriver in case Pedro Flores comes to take them back. Then he rides his sorrel, Sunup, north-east into the brush to hire hands.', 'call'),
        go('call', [[200, 214], [300, 214], [300, 30]], { speed: 34 }),
      ] },
    ],
  });

  /* ---------- 13 ---------- */
  CH.push({
    n: 13, title: 'Lorena’s side', part: 1,
    scene: { ...saloon, time: 'hot', place: 'The Dry Bean saloon', when: 'The same afternoon as chapter 8',
      actors: { lorena: { at: [118, 112], pose: 'front' }, jake: { at: [100, 112], pose: 'front' }, lippy: { at: [36, 96], dir: -1 }, xavier: { at: [176, 66], pose: 'front' } } },
    beats: [
      { steps: [
        nar('This goes back to the afternoon Dish heard the bed creak. Jake walks into the Dry Bean easy and friendly, and guesses at once that Lorena belongs in San Francisco.', 'lorena'),
        emote('xavier', '!'), emote('lippy', '!'),
        nar('Within an hour, silent Lorena has told him her whole life story. Lippy and Xavier stare from across the room in disbelief.', 'lorena'),
        say('jake', 'I killed a man in Arkansas. By accident.'),
        nar('When Jake admits he may not live long enough to help her, she finds she wants to protect him.', 'lorena'),
      ] },
      { scene: { ...lorenaRoom, time: 'hot', when: 'Afternoon', props: [...lorenaRoom.props, ['tub', 100, 150]], actors: { lorena: { at: [80, 150], pose: 'front' }, jake: { at: [100, 146], pose: 'front' } } },
        steps: [
          nar('Upstairs she soaks his old broken ankle in salts. He takes a bath in the washtub and she tries, badly, to trim his curly black hair.', 'jake'),
          nar('She takes no money from him, on purpose. If it isn’t paid for, then he owes her, and he will have to carry her out of Lonesome Dove.', 'lorena'),
        ] },
      { scene: { ...saloon, time: 'lamplit', when: 'Later that week', actors: { lorena: { at: [118, 112], pose: 'front' }, jasper: { at: [150, 130], pose: 'side', dir: -1 }, lippy: { at: [36, 96], dir: -1 } } },
        steps: [
          go('jasper', [[132, 118]], { speed: 14 }),
          nar('After Jake rides off on the raid, a skinny cowboy named Jasper Fant comes asking. Lorena just looks at him until he backs away.', 'lorena'),
          walk('jasper', [[200, 180]]),
          nar('Within a week every cowboy on the river knows she has quit the trade.', 'lorena'),
        ] },
    ],
  });

  /* ---------- 14 ---------- */
  CH.push({
    n: 14, title: 'Hiding the horses', part: 1,
    scene: dove({ when: 'Afternoon', cam: [110, 196], actors: {
      gus: { at: [96, 166], pose: 'front' }, jake: { at: [120, 172], pose: 'front' }, ...pigs([140, 184], [134, 178]),
      allen: { at: [60, 212], pose: 'front' }, sean: { at: [74, 214], pose: 'front' },
    } }),
    beats: [
      { steps: [
        emote('allen', 'z', { wait: false }), emote('sean', 'z', { wait: false }),
        nar('The Irishmen sleep in the sun where the wagon’s shade has moved off them. Jake sits on the step, glaring at the staring shoat.', 'jake'),
        say('jake', 'Loan me ten dollars, Gus?'),
        say('gus', 'Call’s gone to hire hands. For Montana.'),
        nar('Jake is dismayed. He wishes he had never praised Montana, and he is starting to fear Lorena really does expect him to take her to San Francisco.', 'jake'),
      ] },
      { steps: [
        { set: 'allen', v: { x: 160, y: 270 } }, { set: 'sean', v: { x: 176, y: 272 } }, { set: 'gus', v: { x: 140, y: 262 } }, cam(160, 262, 1000),
        { prop: ['cactus', 230, 292] }, { shoot: 'sean', at: [230, 284], n: 2, gap: 500 }, { shoot: 'allen', at: [230, 284], n: 1 }, emote('sean', '!'),
        nar('Gus hands the Irishmen Winchesters and lets them shoot at a cactus. They are awed by the flat crack of the rifles.', 'gus'),
        say('sean', 'Where do you shoot a man?'),
        say('jake', 'His horse.'),
      ] },
      { scene: range({ time: 'dusk', when: 'Sunset', cam: [220, 220], actors: {
          gus: { at: [180, 200], mount: 'puddin' }, jake: { at: [300, 240], mount: 'jakebay' }, newt: { at: [280, 254], mount: 'mouse' },
          deets: { at: [130, 250], mount: 'wishbone' }, dish: { at: [110, 240], mount: 'dishsorrel' }, pea: { at: [340, 200], mount: 'sardine' },
          allen: { at: [120, 170], mount: 'hc2' }, sean: { at: [140, 160], mount: 'hc5' },
          ...horses('h', 18, 160, 180, 160, 80, 13),
        } }),
        steps: [
          nar('Gus rides his big white horse, Puddin’ Foot, slowly through Pedro’s horses. Most are skinny and saddle-sore. Maybe forty are prime.', 'gus'),
          walk('deets', [[0, 300]], { speed: 24 }), walk('dish', [[0, 290]], { speed: 24 }),
          nar('Deets and Dish take the best back to pen in town. The rest are to be hidden upriver in case Pedro comes looking.', 'deets'),
          emote('newt', '♥'),
          nar('Newt is thrilled to be paired with Jake on the east side of the herd as they start the horses north in the fading light.', 'newt'),
          { move: 'h', by: [30, -150], speed: 20 }, walk('gus', [[190, 50]]), walk('jake', [[320, 90]]), walk('newt', [[300, 100]]), walk('pea', [[360, 60]]),
          { time: 'night', ms: 4000, wait: false }, wait(2500),
        ] },
    ],
  });

  /* ---------- 15 ---------- */
  CH.push({
    n: 15, title: 'Deets and the moon', part: 1,
    scene: dove({ time: 'dusk', weather: { moon: 'crescent', fireflies: true }, when: 'Dusk', cam: [150, 270], actors: {
      dish: { at: [196, 256], pose: 'front' }, deets: { at: [160, 284], pose: 'front' }, dishhorse: { kind: 'horse', who: 'dishsorrel', at: [214, 244] },
      ...horses('h', 8, 130, 262, 60, 30, 7),
    } }),
    beats: [
      { steps: [
        nar('With the prime horses penned, Dish decides the bandit danger is imaginary. He leaves Deets to guard the corral alone and trots off to the Dry Bean.', 'dish'),
        { set: 'dish', v: { mount: 'dishsorrel' } }, { remove: 'dishhorse' }, go('dish', [[240, 214], [340, 214]], { speed: 30 }),
      ] },
      { steps: [
        { time: 'night', ms: 2500 }, cam(150, 270, 800),
        nar('Deets sits in the shadow of the water trough, rifle across his lap, watching the thin hook of the moon rise.', 'deets'),
        nar('He has a private fear that Indians understand the moon, and might one day use it against him. He wonders if a man could build a ladder up to it.', 'deets'),
        emote('deets', '♥'),
        nar('And he thinks about the sign. It took two years to get his name onto it, but it made him part of the outfit.', 'deets'),
      ] },
      { scene: { ...saloon, actors: { lorena: { at: [118, 112], pose: 'front' }, dish: { at: [98, 112], pose: 'front' }, jasper: { at: [138, 114], pose: 'front' }, xavier: { at: [110, 124], pose: 'front' }, lippy: { at: [36, 96], dir: -1 } } },
        steps: [
          nar('Lorena, done with the trade and waiting for Jake, sits in at cards. She beats Dish, Jasper and Xavier, hand after hand.', 'lorena'),
          emote('dish', '♥'),
          nar('Dish loses three months’ wages and hardly minds. Xavier sulks that Jake has robbed him of his saloon’s main attraction.', 'xavier'),
        ] },
      { scene: dove({ lit: true, time: 'night', weather: { fireflies: true, moon: 'crescent' }, when: 'Night', cam: [340, 214], actors: { dish: { at: [330, 224], pose: 'front' }, jasper: { at: [350, 226], pose: 'front' } } }),
        steps: [
          say('jasper', 'Reckon I’ll hire on with the Captain.'),
          nar('Out in the street, the two cowboys smoke and look up at her lit window. Then they ride back to the pens without a word.', 'dish'),
        ] },
    ],
  });

  /* ---------- 16 ---------- */
  const spettle = {
    w: 260, h: 300, seed: 81, time: 'hot', weather: {}, place: 'The Spettle place, near Pickles Gap', when: 'Hot', cam: [130, 150],
    ground: (g) => { g.fill(T.DIRT); g.patches(T.DRY, T.DIRT, 10, 8, 20); },
    props: [['shackpoor', 130, 110], ['mesquite', 40, 60, { seed: 61 }], ['bush', 220, 200, { seed: 2 }], ['cactus', 30, 240], ['fenceH', 200, 130, { len: 36 }]],
    actors: {
      call: { at: [70, 170], pose: 'front' }, widow: { at: [120, 136], pose: 'front' }, bill: { at: [140, 140], pose: 'front' }, pete: { at: [156, 142], pose: 'front' },
      k1: { who: 'kid2', at: [100, 150], pose: 'front' }, k2: { who: 'kid2', at: [176, 150], pose: 'front' }, k3: { who: 'kid2', at: [110, 164], pose: 'front' },
    },
  };
  const raineyKitchen = {
    w: 240, h: 240, seed: 82, time: 'lamplit', weather: {}, place: 'The Rainey ranch', when: 'Supper', cam: [120, 110],
    ground: (g) => { g.fill(T.FLOOR); },
    props: [['roomwall', 120, 50, { w: 240, window: 160, night: true }], ['table', 100, 120, { bottle: true }], ['table', 126, 120, {}], ['table', 152, 120, {}], ['lamp', 126, 108]],
    actors: {
      call: { at: [90, 108], pose: 'front' }, maude: { at: [180, 104], pose: 'front' }, joe: { at: [120, 104], pose: 'front' },
      r1: { who: 'kid1', at: [150, 104], pose: 'front' }, r2: { who: 'kid1', at: [100, 136], pose: 'front' }, r3: { who: 'kid1', at: [130, 138], pose: 'front' }, r4: { who: 'kid1', at: [160, 136], pose: 'front' },
    },
  };
  CH.push({
    n: 16, title: 'Hiring hands', part: 1, scene: spettle,
    beats: [
      { steps: [
        nar('Call rides to the Spettle place, a poor dirt-floor farm. The widow has eight barefoot children and nothing else.', 'call'),
        say('call', 'A month’s wages, in advance.'),
        nar('He hires the two eldest, Bill and Pete, and pays their mother up front. The family weeps as the boys walk off with a blanket each and one pistol with a broken hammer.', 'widow'),
        go('bill', [[140, 200], [120, 300]]), go('pete', [[160, 206], [140, 300]]),
      ] },
      { scene: raineyKitchen, steps: [
        say('maude', 'EAT! There’s plenty more!'),
        nar('At the loud, crowded Rainey ranch, Maude heaps the table with steak, pork, chicken, venison and a varmint stew. Joe stares straight ahead, beard shining with grease.', 'maude'),
        nar('Call signs up Jimmy and Ben Rainey. (The blue pigs came from here once.) He spends the night in a wagon in the yard, among grunting pigs and a barn owl.', 'call'),
      ] },
      { scene: dove({ when: 'Three in the afternoon', cam: [110, 190], actors: { gus: { at: [96, 164], pose: 'front' }, call: { at: [220, 214], mount: 'sunup' }, ...pigs([60, 190], [78, 194]) } }),
        steps: [
          emote('gus', 'z', { wait: false }),
          go('call', [[130, 190]]), { set: 'call', v: { mount: null, pose: 'front', x: 124, y: 172 } },
          say('gus', 'Pedro Flores is dead.'),
          nar('Jasper Fant brought the news. Call sits down on the porch and takes a long swallow from Gus’s jug. An old enemy’s death shakes him, as the Comanche chief Kicking Wolf’s once did.', 'call'),
          nar('Then he gets up and rides out to hire Jasper Fant.', 'call'),
        ] },
    ],
  });

  /* ---------- 17 ---------- */
  CH.push({
    n: 17, title: 'The card cut', part: 1,
    scene: { ...lorenaRoom, time: 'hot', when: 'Ten days on', actors: { lorena: { at: [70, 150], pose: 'front' }, jake: { at: [150, 118], pose: 'front' } } },
    beats: [
      { steps: [
        emote('jake', 'z', { wait: false }),
        nar('Ten days living with Jake, and Lorena has him figured: he is like a child who needs looking after.', 'lorena'),
        nar('She cares for him less than he cares for her. But she has made up her mind he is not leaving without her.', 'lorena'),
      ] },
      { scene: { ...saloon, actors: { dish: { at: [98, 112], pose: 'front' }, jasper: { at: [138, 114], pose: 'front' }, needle: { at: [118, 126], pose: 'front' }, bert: { at: [186, 150], pose: 'front' }, lippy: { at: [36, 96], dir: -1 }, xavier: { at: [200, 90], pose: 'front' } } },
        steps: [
          nar('At night the new hands pack the Dry Bean: skinny Needle Nelson, laughing Bert Borum from Brownsville, Jasper, and a lovesick Dish.', 'bert'),
          say('needle', 'I hear them northern rivers drown a man a day.'),
          nar('They joke about drowning in the big rivers up north. Jake keeps well away from any talk of the drive.', 'needle'),
        ] },
      { scene: { ...saloon, time: 'hot', when: 'An empty, blistering afternoon', actors: { lorena: { at: [118, 112], pose: 'front' }, gus: { at: [100, 112], pose: 'front' }, lippy: { at: [36, 96], dir: -1 } } },
        steps: [
          nar('With Jake kept busy at the branding, Gus walks into the empty saloon, sweat-soaked, and bluntly makes Lorena an offer: fifty dollars.', 'gus'),
          nar('He pays Lippy ten to keep quiet, and they settle it with a cut of the cards. His queen of hearts beats her ten of spades. She goes upstairs with him.', 'gus'),
          nar('Afterwards he warns her that Jake will likely use the drive to slip away, and that Call dislikes women on the trail.', 'gus'),
          say('lorena', 'If Jake goes, I go.'),
        ] },
    ],
  });

  /* ---------- 18 ---------- */
  CH.push({
    n: 18, title: 'Snake stew', part: 1,
    scene: camp({ when: 'Late March', cam: [200, 250], weather: { dusty: true }, props: [['branding', 250, 270]], actors: {
      call: { at: [320, 300], mount: 'hellbitch' }, allen: { at: [240, 280], pose: 'front' }, sean: { at: [262, 284], pose: 'front' },
      ...cows('c', 24, 60, 300, 340, 70, 17),
    } }),
    beats: [
      { steps: [
        nar('Every night Call leads a few hands across the river and brings back two or three hundred wild Mexican longhorns, thin and wild as deer.', 'call'),
        { dust: [250, 280], n: 12 }, emote('sean', '!'),
        nar('By day they brand them. The Irishmen fling themselves onto bawling, horned cattle dragged to the fire. Call barely sleeps.', 'allen'),
      ] },
      { scene: camp({ when: 'Supper', cam: [170, 190], actors: { bol: { at: [170, 186], pose: 'front' }, jasper: { at: [206, 206], pose: 'side', dir: -1 }, gus: { at: [140, 204], pose: 'front' }, needle: { at: [220, 222], pose: 'front' }, snake: { kind: 'snake', at: [176, 196] } } }),
        steps: [
          emote('jasper', '!'), { remove: 'snake' },
          nar('Jasper catches Bolivar skinning a rattlesnake and dropping it straight into the stew.', 'jasper'),
          say('jasper', 'Snake! He’s feeding us snake!'),
          say('gus', 'Better eating than the goat, boys.'),
          nar('The crew wants to punish the cook. Gus just laughs and lectures them on the fine qualities of snake meat.', 'gus'),
        ] },
      { scene: camp({ time: 'dusk', when: 'Sunset', cam: [170, 190], actors: { gus: { at: [140, 204], pose: 'front' }, jake: { at: [200, 210], pose: 'front' }, call: { at: [240, 200], mount: 'hellbitch' }, sean: { at: [110, 240], pose: 'front' }, ...cows('c', 16, 60, 290, 320, 60, 18) } }),
        steps: [
          say('jake', 'I may stop in San Antonio.'),
          nar('After four hundred head are branded, Jake says he might not come north at all, though the drive was his idea.', 'jake'),
          say('gus', 'Bring Lorie. As far as Denver, say.'),
          nar('Gus hints he has played a hand with Lorie himself. Jake rides off to town in a temper, and Call curses Gus for inviting a woman along.', 'call'),
          { time: 'night', ms: 3000, wait: false },
          go('call', [[260, 300], [240, 420]], { speed: 30 }),
          nar('Then Call leads five riders to the river for the last raid. They start north on Monday. Sean’s Irish singing settles the herd.', 'sean'),
        ] },
    ],
  });

  /* ---------- 19 ---------- */
  CH.push({
    n: 19, title: 'Night herd', part: 1,
    scene: camp({ time: 'night', weather: { fireflies: true }, when: 'Night', cam: [220, 300], actors: {
      newt: { at: [80, 280], mount: 'mouse' }, sean: { at: [360, 330], mount: 'hc5' },
      ...cows('c', 26, 90, 280, 280, 80, 19),
    } }),
    beats: [
      { steps: [
        go('newt', [[200, 270], [360, 290]], { speed: 12 }),
        nar('Newt rides slowly round the bedded cattle, dreaming of the endless plains up north: buffalo, elk, great bears.', 'newt'),
        { spawn: 'jake', at: [30, 200], mount: 'jakebay' }, walk('jake', [[440, 150]], { speed: 30 }),
        nar('Jake trots past in the dark toward Lonesome Dove without stopping.', 'newt'),
      ] },
      { steps: [
        nar('Newt makes friends with homesick Sean. He hears about Sean’s dead mother, his hard father who drowned in a well, and green Ireland, where hardly anyone owns a cow.', 'sean'),
      ] },
      { scene: camp({ time: 'night', when: 'Around the fire', cam: [170, 200], actors: { gus: { at: [140, 204], pose: 'front' }, dish: { at: [186, 214], pose: 'front' }, jasper: { at: [206, 210], pose: 'front' }, needle: { at: [166, 216], pose: 'front' }, bert: { at: [226, 216], pose: 'front' } } }),
        steps: [
          nar('Round the fire, the hands spread a saddle blanket and play poker for wages they haven’t earned yet. They grumble that Jake has taken Lorena off the market.', 'bert'),
          say('gus', 'Your chance will come at Ogallala.'),
        ] },
      { scene: camp({ time: 'dawn', when: 'Morning', cam: [200, 250], props: [['branding', 240, 270]], actors: { deets: { at: [226, 262], pose: 'front' }, newt: { at: [256, 262], pose: 'front' } } }),
        steps: [
          nar('Building branding fires, Deets quietly worries. They are starting late, near April, with a patched-up crew and half-broke horses.', 'deets'),
          emote('deets', '!'),
          nar('Newt, thinking about Lorena, sends a chip of mesquite flying off his axe straight at Deets’s head. Deets ducks.', 'newt'),
        ] },
    ],
  });

  /* ---------- 20 ---------- */
  CH.push({
    n: 20, title: 'Denver', part: 1,
    scene: { ...saloon, time: 'dusk', when: 'Dusk', actors: { lippy: { at: [36, 96], dir: -1 }, jake: { at: [210, 180], pose: 'side', dir: -1 }, lorena: { at: [118, 112], pose: 'front' } } },
    beats: [
      { steps: [
        go('jake', [[180, 90]]), { dust: [180, 90], n: 6 },
        nar('Jake comes in covered in dust from the cattle, snaps at Lippy, grabs a bottle and takes Lorena upstairs.', 'jake'),
      ] },
      { scene: { ...lorenaRoom, time: 'night', when: 'Night', weather: { moon: 'quarter' }, actors: { jake: { at: [150, 122], pose: 'front' }, lorena: { at: [70, 150], pose: 'front' } } },
        steps: [
          nar('Sand trickles out of his clothes into her bed. He complains that Call and Gus expect him to work cattle like a common hand.', 'jake'),
          nar('When she tells him about Gus’s fifty dollars, he loses his temper and strikes her once. Then he shrugs it off, and calls Gus the best card cheat he knows.', 'lorena'),
          say('lorena', 'When you leave, I leave.'),
          nar('He offers San Antonio, Austin, Fort Worth. She holds to San Francisco. At last he agrees: they will travel alongside the herd toward Denver, camping apart.', 'jake'),
          { map: { fit: pts(PL.dove, PL.denver, PL.sf), places: [PL.dove, PL.denver, PL.sf], title: 'Lorena’s road', when: 'Denver, then San Francisco',
            trails: [{ id: 'den', pts: [[PL.dove.lon, PL.dove.lat], [-100.5, 32.5], [PL.denver.lon, PL.denver.lat], [-112, 40.8], [-119.8, 39.5], [PL.sf.lon, PL.sf.lat]], col: '#3a6aa0', dash: 4, icon: 'rider2' }] } },
          { trail: { id: 'den', to: 5, speed: 1.4 } },
          { scene: true },
          nar('She lies awake in the moonlight, already gone from Lonesome Dove in her mind.', 'lorena'),
        ] },
    ],
  });

  /* ---------- 21 ---------- */
  CH.push({
    n: 21, title: 'Xavier', part: 1,
    scene: { ...lorenaRoom, time: 'dawn', when: 'Dawn', actors: { lorena: { at: [70, 150], pose: 'front' }, jake: { at: [150, 122], pose: 'front' }, xavier: { at: [190, 200], hidden: true } } },
    beats: [
      { steps: [
        nar('At dawn, red light spreads over the mesquite flats. Lorena is already awake at the foot of the bed, long golden hair over her shoulders.', 'lorena'),
        say('jake', 'All right. I’ll buy you a horse.'),
        nar('She hands him Gus’s fifty dollars for a horse that isn’t too tall, and he goes out to buy horses and gear.', 'lorena'),
        go('jake', [[180, 200], [200, 230]]), { hide: 'jake' },
      ] },
      { steps: [
        { show: 'xavier' }, go('xavier', [[140, 160]]), face('xavier', 'front'),
        emote('xavier', '...'),
        nar('Xavier appears on the stairs, tears running onto his white shirt. He begs her to marry him.', 'xavier'),
        say('xavier', 'I will sell the saloon. We take a boat to California!'),
        nar('He would take her from Galveston to California by sea. He threatens to burn the place down, or shoot Jake.', 'xavier'),
      ] },
      { steps: [
        nar('Worn out, and to calm him, she lets him in for a moment. He leaves a fistful of money on her chest of drawers.', 'lorena'),
        go('xavier', [[180, 200], [200, 230]], { speed: 8 }), { hide: 'xavier' },
        nar('He goes down the stairs slowly, feeling for each step. Lorena hides the money, one more secret from Jake. Galveston, she notes, is nearer than Denver.', 'lorena'),
      ] },
    ],
  });

  /* ---------- 22 ---------- */
  CH.push({
    n: 22, title: 'A woman in camp', part: 1,
    scene: camp({ when: 'Late afternoon', cam: [170, 200], actors: {
      gus: { at: [140, 204], pose: 'front' }, call: { at: [230, 200], pose: 'front' }, dish: { at: [196, 214], pose: 'front' }, newt: { at: [160, 216], pose: 'front' },
      pea: { at: [120, 224], pose: 'front' }, sean: { at: [214, 230], pose: 'front' }, bol: { at: [150, 186], pose: 'front' },
      jake: { at: [420, 120], mount: 'jakebay' }, lorena: { at: [436, 110], mount: 'loremare' }, pack: { kind: 'horse', who: 'hc7', at: [456, 104] },
      dishhorse: { kind: 'horse', who: 'dishsorrel', at: [270, 230] },
    } }),
    beats: [
      { steps: [
        par(go('jake', [[260, 170]]), go('lorena', [[280, 164]]), go('pack', [[300, 160]])),
        nar('Late in the afternoon Jake and Lorena ride into camp leading a pack horse. Lorena is wearing pants. The only sound is the jingle of a bit.', 'lorena'),
        emote('dish', '...'),
        { set: 'dish', v: { mount: 'dishsorrel' } }, { remove: 'dishhorse' }, walk('dish', [[300, 300], [420, 360]], { speed: 26 }),
        nar('The hands stare into their beans. Dish, white-faced, saddles his night horse and rides off to the herd without a word.', 'dish'),
      ] },
      { steps: [
        emote('call', '...'),
        nar('Call touches his hat to her, coldly. Gus helps her down, gets her a plate, and admires her brown mare, bought from the widow Pumphrey.', 'gus'),
        say('jake', 'We’re bound for Denver. We’ll camp on our own.'),
      ] },
      { steps: [
        { time: 'dusk', ms: 3000, wait: false },
        nar('At dusk Sean sings a sad song. Newt steals looks at Lorena, near tears. Pea Eye whets his bowie knife on his boot sole.', 'newt'),
        par(walk('jake', [[440, 60]], { speed: 20 }), walk('lorena', [[440, 50]], { speed: 20 }), walk('pack', [[440, 40]], { speed: 20 })),
        say('call', 'Fetch Dish. We start north tomorrow.'),
        say('newt', 'How far north is it, Captain?'),
      ] },
    ],
  });

  /* ---------- 23 ---------- */
  CH.push({
    n: 23, title: 'Leaving Lonesome Dove', part: 1,
    scene: camp({ time: 'dawn', when: 'Departure day', cam: [170, 200], actors: {
      gus: { at: [140, 204], pose: 'front' }, call: { at: [200, 208], pose: 'front' }, bol: { at: [170, 186], pose: 'front' }, ...pigs([150, 180], [162, 184]),
      soupy: { at: [440, 260], mount: 'soupyhorse' },
    } }),
    beats: [
      { steps: [
        nar('At breakfast Gus mourns his biscuits and the well he never finished. The blue pigs have followed them out to camp.', 'gus'),
        go('soupy', [[240, 220]]),
        nar('Out of the dark rides Soupy Jones, an old Ranger, short, a superb horseman. His wife has died, and he is hired on the spot.', 'soupy'),
      ] },
      { scene: dove({ when: 'Morning', cam: [220, 214], actors: { team: { kind: 'team', at: [60, 214], cfg: { m1: E.horses.greasy, m2: E.horses.kickboy } } } }),
        steps: [
          nar('Gus hitches the mules, big grey Greasy and bad-tempered little Kick Boy, and drives the wagon into town. He stops at Jake and Lorena’s camp: a burnt supper and Jake nursing a thumb swollen from a mesquite thorn.', 'gus'),
          go('team', [[200, 214], [236, 230]]),
          nar('The town is empty. Gus takes a crowbar from the abandoned smithy and pries the Hat Creek sign off the corral.', 'gus'),
          { unprop: 'sign' }, { dust: [204, 254], n: 8 },
          nar('He leaves the crumbling Dutch ovens behind, then has a last drink with Xavier, unshaven and hopeless over Lorena.', 'xavier'),
        ] },
      { steps: [
        { spawn: 'lippy', at: [340, 212], pose: 'front' },
        nar('Lippy is waiting by the Dry Bean with a small packed bag. He is coming too.', 'lippy'),
        { hide: 'lippy' }, cam(300, 120, 1400),
        go('team', [[300, 214], [300, 40]], { speed: 20 }),
        nar('As the wagon heads out, the little white town sinks behind the chaparral until only the church top shows. Lippy weeps all the way.', 'lippy'),
      ] },
    ],
  });

  /* ---------- 24 ---------- */
  CH.push({
    n: 24, title: 'The Texas bull', part: 1,
    scene: camp({ when: 'Morning', cam: [170, 210], actors: {
      pea: { at: [120, 214], pose: 'front' }, deets: { at: [140, 222], pose: 'front' }, call: { at: [220, 208], pose: 'front' }, lippy: { at: [240, 212], pose: 'front' }, dish: { at: [196, 216], pose: 'front' },
      bull: { kind: 'cow', at: [300, 300], cfg: { coat: '#9a5a2a', patch: '#efe6cf', brindle: true }, cfgKey: 'bull' }, needle: { at: [330, 290], mount: 'hc3' },
      ...cows('c', 14, 60, 300, 340, 60, 23),
    } }),
    beats: [
      { steps: [
        nar('Departure day. Pea Eye hones his bowie knife and Deets patches his quilted pants with rawhide.', 'pea'),
        say('call', 'Lippy, you’ll wrangle the horses.'),
        emote('dish', '...'),
        nar('Call puts Lippy in charge of the horse herd, to Dish’s scorn.', 'dish'),
      ] },
      { steps: [
        cam(300, 290, 1200),
        walk('bull', [[330, 292]], { speed: 40 }), walk('needle', [[380, 270]], { speed: 40 }),
        nar('A little mottled bull, brown, red and white with touches of yellow and black, has wandered into the herd. It has already whipped three bigger bulls and chased Needle Nelson back onto his horse.', 'needle'),
        say('call', 'He comes to Montana.'),
      ] },
      { steps: [
        { set: 'call', v: { x: 300, y: 118, pose: 'front' } }, { set: 'deets', v: { x: 318, y: 122, pose: 'front' } }, cam(310, 130, 1200),
        say('call', 'You’ll scout for us, Deets.'),
        nar('Resting under a big mesquite at noon, Call names Deets the outfit’s scout: ride ahead, find water and a bed ground every night.', 'call'),
        emote('deets', '♥'),
        nar('Deets is quietly proud.', 'deets'),
      ] },
      { steps: [
        { set: 'call', v: { x: 186, y: 198 } }, { spawn: 'bol', at: [170, 186], pose: 'front' }, { spawn: 'gus', at: [140, 204], pose: 'front' }, cam(170, 200, 1000),
        say('call', 'Here’s your wages, Bol, if you want to go home.'),
        emote('bol', '...'),
        nar('Bolivar shakes his head. He is not leaving. Gus oils his guns and tells young Charlie Rainey about the northern lights in Canada.', 'bol'),
        say('gus', 'Most of this herd is stolen, Woodrow.'),
      ] },
    ],
  });

  /* ---------- 25 ---------- */
  CH.push({
    n: 25, title: 'North', part: 1,
    scene: camp({ time: 'hot', weather: { dusty: true }, when: 'The first day of the drive', cam: [220, 250], actors: {
      call: { at: [240, 220], mount: 'hellbitch' }, gus: { at: [200, 222], mount: 'malaria' }, dish: { at: [300, 200], mount: 'dishsorrel' }, soupy: { at: [120, 210], mount: 'soupyhorse' },
      newt: { at: [220, 340], mount: 'mouse' }, sean: { at: [260, 344], mount: 'hc5' },
      team: { kind: 'team', at: [150, 176], cfg: { m1: E.horses.greasy, m2: E.horses.kickboy } },
      ...cows('c', 34, 70, 250, 320, 90, 25),
    }, props: [] }),
    beats: [
      { steps: [
        nar('Each hand picks four horses from the rope corral. Gus declines. He will ride Old Malaria, his big buckskin, or the mule Greasy.', 'gus'),
        nar('Call gives out positions: Dish on right point, Soupy on left, Newt, the Raineys and the Irishmen on drag, eating dust behind.', 'call'),
      ] },
      { steps: [
        say('gus', 'A little over twenty-six hundred head.'),
        { move: 'c', by: [0, -150], speed: 12, jitter: 40 }, walk('dish', [[300, 60]], { speed: 12 }), walk('soupy', [[120, 60]], { speed: 12 }), walk('team', [[150, 30]], { speed: 12 }),
        walk('newt', [[220, 220]], { speed: 12 }), walk('sean', [[260, 224]], { speed: 12 }), cam(220, 200, 4000),
        nar('The herd moves off north, strung out over a mile. Bolivar rides the wagon seat with his ten-gauge across his lap.', 'bol'),
      ] },
      { steps: [
        { follow: 'newt' }, emote('newt', '!'),
        nar('Back on drag the dust is so thick Newt nearly leaves thirty head behind. Mouse jumps a chaparral bush to turn two heifers and Newt loses both stirrups.', 'newt'),
        nar('Sean rides beside him, his dark bay turned white with dust, trying to spit out the mud.', 'sean'),
      ] },
      { scene: camp({ time: 'dusk', weather: { dusty: true }, when: 'Sunset, day one', cam: [220, 160], actors: {
          call: { at: [200, 110], mount: 'hellbitch' }, gus: { at: [226, 112], mount: 'malaria' }, deets: { at: [20, 30], mount: 'wishbone' },
          ...cows('c', 30, 40, 200, 380, 120, 27),
        }, props: [] }),
        steps: [
          nar('From a small hill at sunset the partners watch a mile of thin, many-coloured longhorns in rosy dust. Behind them: Lonesome Dove, the river, Mexico.', 'gus'),
          say('gus', 'What are we doing this for, Woodrow?'),
          nar('Gus argues about the brush country ahead and what the drive is really for. Call doesn’t answer. He sees Deets coming back with a bed ground.', 'call'),
          go('call', [[100, 60], [40, 40]], { speed: 34 }),
          { map: { fit: pts(PL.dove, PL.sa, PL.montana), places: [PL.dove, PL.sa, PL.montana], title: 'The Hat Creek drive', when: 'End of Part I',
            trails: [{ id: 'drive', pts: [[PL.dove.lon, PL.dove.lat], [-98.9, 26.9]], col: '#c8402a', icon: 'herd' }, { id: 'goal', from: 2, pts: [[-98.9, 26.9], [PL.sa.lon, PL.sa.lat], [PL.montana.lon, PL.montana.lat]], col: '#6d8a3a', dash: 4 }] } },
          { trail: { id: 'drive', to: 1, speed: 0.6 } },
          nar('Gus stays alone on the hill until the sun is gone. The herd has left the Rio Grande. Montana is a long way north.'),
        ] },
    ],
  });
})();
