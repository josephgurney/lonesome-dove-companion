/* Story data. Every line of dialogue and narration is paraphrased, never quoted from the novel.
   Coordinates are world pixels. Map coordinates are [lon, lat]. */
(function () {
  const E = window.ENGINE, T = window.ART.T;

  /* ---------- cast (looks taken from the novel's descriptions) ---------- */
  E.cast = {
    gus: { name: 'Gus', c: { skin: '#eab892', hair: '#f2eee6', hat: '#b8a47e', band: '#5a4630', shirt: '#7f9bb5', vest: '#26262c', pants: '#6b5a45', beard: 'mustache', beardCol: '#f2eee6', gun: '#c8c0b0' } },
    call: { name: 'Call', c: { skin: '#dca47a', hair: '#3e2c1e', hat: '#4a3a2a', band: '#2a1e14', shirt: '#8c8a78', pants: '#4e4436', beard: 'stubble' } },
    pea: { name: 'Pea Eye', c: { skin: '#e2ae84', hair: '#8a6a3a', hat: '#9a8660', band: '#5a4630', shirt: '#a8a070', pants: '#5a4a38' } },
    newt: { name: 'Newt', c: { skin: '#f0c098', hair: '#9a6a34', hat: '#a88a58', band: '#6a4a2a', shirt: '#b8603e', pants: '#56607a', blush: '#e89a88' } },
    deets: { name: 'Deets', c: { skin: '#6a4028', hair: '#1e1612', hat: '#3a4a6a', band: '#c8a040', brim: 'cap', shirt: '#d8d0b4', pants: '#6a5a8a', patches: ['#b8603e', '#6d8a3a'] } },
    bol: { name: 'Bolivar', c: { skin: '#b67c52', hair: '#1e1612', hat: '#c8a860', band: '#8a3a2a', brim: 'sombrero', shirt: '#e0d4b8', serape: ['#8a3a2a', '#e0b050', '#3a6a7a'], pants: '#e0d4b8', beard: 'mustache', beardCol: '#2a1e16' } },
    lorena: { name: 'Lorena', c: { skin: '#f4d0b0', hair: '#f0d27a', brim: 'none', long: true, shirt: '#e8d8c4', dress: '#8faec4', boots: '#6a4a3a', blush: '#f0a8a0' } },
    dish: { name: 'Dish', c: { skin: '#e6b088', hair: '#a8864a', hat: '#6a5a44', band: '#3a2a1a', shirt: '#6a86a0', pants: '#5a4a38', beard: 'mustache', beardCol: '#b89452' } },
    xavier: { name: 'Xavier', c: { skin: '#ecc4a0', hair: '#2a1e16', brim: 'none', shirt: '#f4f0e6', tie: '#1e1a16', pants: '#3a3a40', beard: 'mustache', beardCol: '#2a1e16' } },
    lippy: { name: 'Lippy', c: { skin: '#e6b89a', hair: '#9a948a', hat: '#6a4a30', brim: 'bowler', shirt: '#b8b0a0', vest: '#5a4a3a', pants: '#4a4440' } },
    vaquero: { name: 'Vaquero', c: { skin: '#b67c52', hair: '#1e1612', hat: '#8a6a3a', band: '#3a2616', brim: 'sombrero', shirt: '#c8a878', pants: '#4a3a2a', beard: 'mustache', beardCol: '#1e1612', gun: '#9a9aa0' } },
    jake: { name: 'Jake', c: { skin: '#e8b48a', hair: '#6a4a2a', hat: '#7a5a3a', band: '#3a2616', shirt: '#efe8d8', vest: '#6e4a2e', pants: '#4a3e34', beard: 'mustache', beardCol: '#6a4a2a', gun: '#f4ecd8' } },
  };
  E.horses = {
    hellbitch: { coat: '#9aa2a6', mane: '#5a6066', muzzle: '#e8e4dc', blaze: true, dapple: 3 },
    gusblack: { coat: '#2e2a2c', mane: '#141214' },
    wishbone: { coat: '#e8e4da', mane: '#c8c2b4' },
    jakebay: { coat: '#8a4a2a', mane: '#2a1a12', socks: true },
    dishsorrel: { coat: '#b4602e', mane: '#8a3e1e', blaze: true },
  };

  /* ---------- helpers ---------- */
  const nar = (t, who, o) => ({ nar: t, who, ...o });
  const say = (a, t, ms) => ({ say: a, t, ms });
  const walk = (a, to, o = {}) => ({ walk: a, to, ...o });
  const go = (a, to, o = {}) => ({ walk: a, to, wait: true, ...o });
  const face = (a, dir) => ({ face: a, dir });
  const emote = (a, e, o) => ({ emote: a, e, ...o });
  const cam = (x, y, ms = 1400, o) => ({ cam: [x, y], ms, ...o });
  const wait = (ms) => ({ wait: ms });
  const par = (...x) => ({ par: x });

  /* ---------- places for the overview map ---------- */
  // Lonesome Dove is fictional. The novel puts it on the Rio Grande about a hundred miles upriver from Matamoros.
  const P = {
    dove: { name: 'Lonesome Dove', lon: -98.95, lat: 26.45, col: '#c8402a' },
    sa: { name: 'San Antonio', lon: -98.49, lat: 29.42, col: '#3a6aa0' },
    mat: { name: 'Matamoros', lon: -97.5, lat: 25.87, col: '#3a6aa0', side: 'r' },
    fs: { name: 'Fort Smith', lon: -94.42, lat: 35.39, col: '#3a6aa0' },
    sf: { name: 'San Francisco', lon: -122.42, lat: 37.77, col: '#3a6aa0' },
  };

  /* ---------- Lonesome Dove ---------- */
  // Hat Creek outfit on the west, the dry creek bed, then the town; the Rio Grande along the south with Mexico beyond.
  const DOVE_W = 480, DOVE_H = 380;
  function doveGround(g) {
    g.fill(T.DIRT);
    g.patches(T.DRY, T.DIRT, 30, 7, 22);
    g.line([[0, 332], [120, 326], [250, 336], [380, 324], [480, 330]], 50, T.MUD, 3);
    g.line([[0, 334], [120, 328], [250, 338], [380, 326], [480, 332]], 32, T.WATER, 3);
    g.rect(0, 356, 480, 30, T.DRY); g.patches(T.DIRT, T.DRY, 8, 5, 10);
    g.line([[208, 0], [214, 110], [204, 220], [216, 312]], 16, T.SAND, 2);
    g.line([[300, 0], [300, 214]], 12, T.ROAD);
    g.line([[150, 214], [470, 214]], 14, T.ROAD);
    g.line([[110, 172], [110, 214]], 8, T.ROAD);
    g.rect(28, 226, 170, 76, T.ROAD); g.patches(T.DIRT, T.ROAD, 6, 4, 8);
  }
  const doveProps = (o = {}) => [
    ['hatcreek', 110, 168, { jug: true, chair: true, lit: o.lit }],
    ['adobe', 36, 152, { w: 26, seed: 3 }],
    ['bell', 160, 150],
    ['wagon', 64, 206], ['wagon', 156, 204],
    ['livery', 70, 272, { roofless: true }],
    ['fenceH', 150, 300, { len: 48 }], ['fenceH', 150, 250, { len: 48 }], ['fenceV', 197, 300, { len: 44 }],
    ['well', 180, 234],
    ['sign', 204, 256, { id: 'sign' }],
    ['tank', 150, 286],
    ['drybean', 348, 204, { lit: o.lit }],
    ['church', 398, 202, { lit: false }],
    ['adobe', 440, 202, { w: 44, lit: o.lit, seed: 8 }],
    ['shack', 262, 200, { seed: 5 }],
    ['adobe', 350, 128, { w: 36, seed: 12 }], ['shack', 420, 130, { seed: 14 }], ['adobe', 262, 132, { w: 30, seed: 16 }],
    ['mesquite', 20, 90, { seed: 3 }], ['mesquite', 170, 60, { seed: 5 }], ['mesquite', 250, 70, { seed: 7 }], ['mesquite', 455, 70, { seed: 9 }],
    ['mesquite', 240, 300, { seed: 11 }], ['mesquite', 460, 290, { seed: 13 }], ['mesquite', 20, 330, { seed: 15 }],
    ['cactus', 60, 110], ['cactus', 238, 180], ['cactus', 330, 70], ['cactus', 400, 300], ['cactus', 140, 360], ['cactus', 300, 372],
    ['bush', 90, 60, { seed: 2 }], ['bush', 380, 90, { seed: 3 }], ['bush', 120, 310, { seed: 4 }], ['bush', 330, 290, { seed: 6 }], ['bush', 420, 366, { seed: 7 }],
    ['rock', 225, 250], ['rock', 190, 120], ['rock', 470, 240],
  ];
  const pigs = (sow, shoat) => ({
    sow: { kind: 'pig', at: sow, cfg: { coat: '#8e98ac' }, wander: null },
    shoat: { kind: 'pig', at: shoat, cfg: { coat: '#9aa6b8' } },
  });

  /* ---------- chapters ---------- */
  const CH = [];

  CH.push({
    n: 1, title: 'Pigs on the porch', part: 1,
    scene: {
      w: DOVE_W, h: DOVE_H, seed: 11, ground: doveGround, props: doveProps(), time: 'hot', weather: { heat: true, buzzards: 2 },
      place: 'Lonesome Dove, Texas', when: 'March \u00B7 late afternoon', cam: [120, 170],
      actors: {
        gus: { at: [108, 164], pose: 'front' },
        ...pigs([90, 166], [124, 166]),
        snake: { kind: 'snake', at: [107, 168] },
        call: { at: [80, 292], hidden: true }, pea: { at: [96, 294], hidden: true }, newt: { at: [182, 246], hidden: true },
        bol: { at: [168, 152], hidden: true },
      },
    },
    beats: [
      { steps: [
        { map: { at: [-99.5, 29.5], z: 1.5, places: [P.dove, P.sa, P.mat], title: 'South Texas', when: 'The Rio Grande border' } },
        { mapcam: [-98.9, 27.4, 2.4], ms: 2200 },
        nar('Lonesome Dove: a dusty little town on the Rio Grande, out in the chaparral flats, about a hundred miles upriver from Matamoros. Mexico is just across the water.'),
        nar('Not a decent shade tree for twenty miles. The Hat Creek Cattle Company keeps its horses and cattle here.'),
        { scene: true },
      ] },
      { steps: [
        { zoom: 1.4 }, emote('gus', '!'),
        nar('Augustus McCrae steps out onto the porch to find the two blue pigs having a tug-of-war over a rattlesnake. The sow has the head, the shoat has the tail.'),
        face('gus', 1), say('gus', 'Git, you pigs! Take your snake down to the creek.'),
        walk('sow', [[60, 190], [44, 210]], { speed: 18 }), walk('shoat', [[70, 196], [52, 214]], { speed: 18 }), walk('snake', [[60, 204]], { speed: 18 }),
        wait(1200), { remove: 'snake' },
        nar('It is the porch he minds, not the snake. Pigs on a porch only make a hot day hotter.', 'gus'),
      ] },
      { steps: [
        { zoom: 1 }, go('gus', [[108, 186], [60, 186], [40, 158]]),
        emote('gus', '...', { ms: 1400 }),
        nar('He walks round to the little adobe springhouse for his jug of whiskey, kept cool in the mud. There is another rattler coiled inside. Gus decides not to shoot it: one gunshot and the whole town would think the Comanches had come.', 'gus'),
        wait(600),
        go('gus', [[60, 186], [108, 186], [108, 166]]), face('gus', 'front'),
        nar('So he gives the snake time to think, it crawls off through a hole, and Gus settles into his rope-bottomed chair to watch the long shadows stretch toward the river.', 'gus'),
        { time: 'dusk', ms: 4000 },
      ] },
      { steps: [
        cam(130, 230, 1400),
        { show: 'call' }, { show: 'pea' },
        par(go('call', [[100, 250], [100, 210]]), go('pea', [[118, 256], [118, 212]])),
        say('gus', 'Quitting early, girls? Is it Christmas?'),
        say('call', 'It ain\'t Christmas.'),
        walk('call', [[110, 190], [110, 170]]),
        nar('Captain W. F. Call, Gus\'s partner from their Texas Ranger days, goes straight past. He is barely middle-sized but somehow nobody ever notices that.', 'call'),
        say('pea', 'The mare bit a hunk out of him.'),
        nar('Call\'s mare, known around town as the Hell Bitch, a stylish dapple grey with a white muzzle, has bitten him just above the belt. Pea Eye Parker, tall and lank, is scared of her as he is of Comanches.', 'pea'),
        { show: 'newt' }, go('newt', [[150, 230], [132, 214]]),
        nar('Young Newt trudges up from the new well, muddy from swinging the pick. He is seventeen and still not allowed to wear a gun.', 'newt'),
      ] },
      { steps: [
        { show: 'bol' }, face('bol', 'front'), cam(140, 180, 900),
        nar('The sun goes down. Old Bolivar, the cook and a retired Mexican bandit, starts whacking the dinner bell. It lost its clapper long ago, so he uses a broken crowbar, and he keeps it up for a good five minutes.', 'bol'),
        par([emote('gus', '!', { ms: 1200 }), emote('pea', '!', { ms: 1200 }), emote('newt', '!', { ms: 1200 })], [say('bol', 'CLANG! CLANG! CLANG!', 2400)]),
        say('gus', 'I figure he\'s calling up his bandits.'),
        { time: 'night', ms: 3000 },
        nar('Over beans and sowbelly, Gus argues for the fun of it. Call says little. He is watching the moon: a quarter moon, what the old Rangers called a rustler\'s moon. Good light for slipping across the river after Mexican horses.', 'call'),
        { set: 'call', v: { x: 110, y: 172 } }, face('call', 1),
        go('call', [[150, 190], [240, 250], [300, 300]]),
        nar('Then the Captain takes his hat and his Henry rifle and walks out into the dark without a word.'),
      ] },
    ],
  });

  const crossing = {
    w: 300, h: 300, seed: 21, time: 'night', weather: { moon: 'quarter' }, place: 'The old Comanche crossing', when: 'Night \u00B7 rustler\'s moon', cam: [150, 120],
    ground: (g) => {
      g.fill(T.DRY); g.patches(T.DIRT, T.DRY, 10, 8, 18);
      g.line([[0, 170], [100, 164], [200, 176], [300, 168]], 48, T.MUD, 3);
      g.line([[0, 174], [100, 168], [200, 180], [300, 172]], 32, T.WATER, 3);
      g.circle(170, 140, 18, T.SAND, 5); g.circle(120, 120, 26, T.ROCK, 6);
    },
    props: [['bush', 104, 118, { seed: 3 }], ['bush', 140, 122, { seed: 5 }], ['mesquite', 60, 90, { seed: 2 }], ['mesquite', 250, 80, { seed: 4 }], ['cactus', 200, 100], ['rock', 130, 130], ['bush', 30, 140, { seed: 8 }], ['cactus', 280, 130]],
    actors: { call: { at: [20, 60] } },
  };

  CH.push({
    n: 2, title: 'The rustler\'s moon', part: 1, scene: crossing,
    beats: [
      { steps: [
        go('call', [[70, 90], [110, 116], [120, 126]]), face('call', 1),
        nar('Call walks the river most nights, west of town to the old Comanche crossing near a salt lick. He sits on a little bluff by the chaparral and listens to the country.', 'call'),
        nar('The Comanche wars took most of his life, and they are over. In six months of watching he has turned back one lone rider with nothing more than the click of his rifle hammer.', 'call'),
        nar('He does not come for the Indians. He comes to be alone for an hour. These days they only run a livery stable, and life feels smaller and duller than it used to.', 'call'),
      ] },
      { scene: { w: DOVE_W, h: DOVE_H, seed: 11, ground: doveGround, props: doveProps({ lit: true }), time: 'night', weather: { fireflies: true }, place: 'The Hat Creek porch', when: 'Night', cam: [120, 180],
          actors: { gus: { at: [96, 164], pose: 'front' }, bol: { at: [124, 164], pose: 'front' }, pea: { at: [140, 166], pose: 'front' }, newt: { at: [110, 176], pose: 'front' }, ...pigs([70, 180], [84, 186]), call: { at: [240, 280], hidden: true } } },
        steps: [
          nar('Back on the porch, Bolivar sharpens his bone-handled knife, same as every night. Gus twirls the cylinder of his Colt. They trade insults like biscuits.', 'bol'),
          say('bol', 'I have nine daughters.'), say('gus', 'Let\'s hope they take after their mother.'),
          { dust: [150, 200], n: 4 }, emote('newt', '!'),
          nar('Bol flings his knife into the side of a wagon. Newt gets nervous whenever the two old men start in on each other after a few hours at their jugs.', 'newt'),
          cam(300, 190, 1600),
          nar('From down the street comes the Dry Bean\'s piano. Newt is hopelessly in love with Lorena Wood, who lives upstairs at the saloon. He has never spoken a word to her, and would not know what to say if he did.', 'newt'),
          { emote: 'newt', e: '\u2665', wait: false },
          cam(130, 190, 1400),
        ] },
      { steps: [
        { show: 'call' }, go('call', [[180, 230], [130, 190], [120, 178]]), face('call', -1),
        say('gus', 'I don\'t see any scalps.'),
        say('call', 'Good night to cross some stock.'),
        say('newt', 'Captain, can I come next time?'),
        say('call', 'Work tomorrow. Go to bed.'),
        go('newt', [[110, 166]]), { hide: 'newt' },
        nar('Call has led boys that young before and seen them killed. He is not ready to say yes.', 'call'),
        go('gus', [[110, 200], [200, 214], [320, 214], [348, 210]], { speed: 24 }),
        nar('Gus straps on his pistol and heads down to the Dry Bean for a card game. Call warns him to watch that girl, in case she talks him into marrying her. Gus laughs all the way down the street.', 'gus'),
      ] },
    ],
  });

  const lorenaRoom = {
    w: 200, h: 230, seed: 31, time: 'hot', weather: {}, place: 'Upstairs at the Dry Bean', when: 'A hot July afternoon (remembered)', cam: [100, 110],
    ground: (g) => { g.fill(T.FLOOR); },
    props: [['roomwall', 100, 50, { w: 200, window: 30 }], ['bed', 150, 120], ['chair', 60, 122], ['lamp', 182, 62]],
    actors: { lorena: { at: [46, 78], pose: 'front' }, gus: { at: [64, 128], pose: 'front', hidden: true } },
  };
  CH.push({
    n: 3, title: 'Lorena', part: 1, scene: lorenaRoom,
    beats: [
      { steps: [
        nar('Lorena Wood has never lived anywhere cool, and being cool is her one aim. From her window she can see brown land, grey chaparral, the river, and Mexico.', 'lorena'),
        { map: { at: [-108, 32], z: 1, places: [P.dove, P.sf], title: 'Lorena\'s dream', when: 'San Francisco',
          trails: [{ id: 'dream', pts: [[P.dove.lon, P.dove.lat], [-104, 30.5], [-110, 32.2], [-116, 34.2], [-120.5, 36.3], [P.sf.lon, P.sf.lat]], col: '#3a6aa0', dash: 4, icon: 'rider2' }] } },
        { trail: { id: 'dream', to: 5, speed: 1.6 } },
        nar('Of all the places men talk about, San Francisco sounds the coolest and nicest, so that is where she means to go. She is nearly twenty-four and has not yet got a mile past Lonesome Dove.', 'lorena'),
        { scene: true },
      ] },
      { steps: [
        nar('Her road here was a hard one. A gambler named Tinkersley brought her down to the border, then left her in Lonesome Dove with nothing and told the whole Dry Bean she was a murderous woman.', 'lorena'),
        nar('A faint scar above her lip came from that fight. She cooked at the saloon until she could make a living the only other way the town allowed. Men find her silence unsettling. It is not a trick. It is just how she feels.', 'lorena'),
      ] },
      { steps: [
        { show: 'gus' }, face('lorena', 1),
        nar('Gus is her most regular caller, and her oldest. He talks without stopping and never treats her meanly. His hair turned white when he was thirty.', 'gus'),
        say('gus', 'You know more than you say, and I say more than I know. We\'re a perfect match.'),
        nar('One day he just sits and twirls his spur, and offers her ten dollars in gold to tell him her life story.', 'gus'),
        { set: 'lorena', v: { pose: 'front' } },
        say('lorena', 'It ain\'t worth ten dollars.'),
        nar('She hands the money back. Gus only grins, and they go down to play cards instead.', 'lorena'),
      ] },
    ],
  });

  const saloon = {
    w: 240, h: 240, seed: 41, time: 'lamplit', weather: {}, place: 'The Dry Bean saloon', when: 'Night', cam: [120, 110],
    ground: (g) => { g.fill(T.FLOOR); },
    props: [
      ['saloonwall', 120, 52, { w: 240, shelf: 150, stairs: 20, window: 70, lit: true }],
      ['bar', 178, 76, { w: 80 }], ['piano', 36, 84], ['table', 110, 108, { cards: true, bottle: true }], ['table', 186, 138, {}],
      ['lamp', 110, 96], ['lamp', 212, 60], ['chair', 90, 110], ['chair', 130, 110],
    ],
    actors: {
      lippy: { at: [36, 96], pose: 'side', dir: -1 }, xavier: { at: [176, 66], pose: 'front' }, lorena: { at: [118, 112], pose: 'front' }, dish: { at: [98, 112], pose: 'front' },
      gus: { at: [230, 150], hidden: true },
    },
  };
  CH.push({
    n: 4, title: 'Cards at the Dry Bean', part: 1,
    scene: {
      w: DOVE_W, h: DOVE_H, seed: 11, ground: doveGround, props: doveProps({ lit: true }), time: 'night', weather: { fireflies: true },
      place: 'Lonesome Dove', when: 'Night', cam: [240, 214],
      actors: { gus: { at: [180, 214] }, armadillo: { kind: 'dillo', at: [236, 222], speed: 26 }, dishhorse: { kind: 'horse', who: 'dishsorrel', at: [322, 214] } },
    },
    beats: [
      { steps: [
        go('gus', [[228, 214]]),
        walk('armadillo', [[190, 226], [150, 240]]), emote('gus', '!'),
        nar('On his stroll down the street Gus nearly jumps out of his boots when a little ball of shadow rolls at his feet. Just an armadillo, crossing the street like it owns the bank.', 'gus'),
        go('gus', [[330, 216]]),
        nar('One horse is tied outside the Dry Bean: a rangy sorrel belonging to Dish Boggett, a young cowhand who loves cards and is terrible at them.', 'gus'),
      ] },
      { scene: saloon, steps: [
        { show: 'gus' }, go('gus', [[150, 130], [140, 116]]),
        nar('Inside, old Lippy Jones bangs out the same song on the piano, loud enough to be heard in Mexico. He wears a filthy brown bowler hat and has a hole in his belly that never healed.', 'lippy'),
        go('xavier', [[80, 90], [44, 94]]), emote('xavier', '!'),
        nar('Xavier Wanz, the fussy little Frenchman who owns the place, can stand the hat no longer. He snatches it off Lippy\'s head and flings it out the back door.', 'xavier'),
        go('xavier', [[176, 66]]),
        say('dish', 'Loan me two dollars, Gus.'),
        nar('Dish, barely twenty-two with a walrus mustache the colour of a prairie dog, is sitting with Lorena, hoping she might give him credit.', 'dish'),
      ] },
      { steps: [
        { set: 'xavier', v: { x: 150, y: 112, pose: 'front' } }, { set: 'gus', v: { x: 124, y: 120, pose: 'front', dir: -1 } },
        nar('So they play cards: Gus, Xavier, Lippy, Dish and Lorena, until the rustler\'s moon has crossed the town. When Lorena wins a good pot she laughs out loud and punches Gus on the arm.', 'lorena'),
        { emote: 'lorena', e: '\u2665', wait: false }, emote('dish', '\u2665'),
        nar('Watching her brighten, Dish falls even harder for her. Xavier wins half of his next month\'s wages.', 'dish'),
      ] },
      { scene: {
          w: DOVE_W, h: DOVE_H, seed: 11, ground: doveGround, props: doveProps({ lit: true }), time: 'night', weather: { fireflies: true },
          place: 'Outside the Dry Bean', when: 'Late', cam: [330, 214],
          actors: { gus: { at: [338, 220] }, dish: { at: [322, 222], pose: 'front' }, dishhorse: { kind: 'horse', who: 'dishsorrel', at: [300, 214] }, ...pigs([96, 168], [120, 168]) },
        },
        steps: [
          say('dish', 'Reckon I\'m going north with Shanghai Pierce\'s outfit.'),
          nar('Dish is heading up the trail with a big cattle outfit. Gus quietly hands him the two dollars after all, and offers him a spot on the Hat Creek porch for the night.', 'gus'),
          go('dish', [[348, 212]]), { hide: 'dish' },
          nar('Dish decides he left something inside and hurries up the back stairs to Lorena\'s room.', 'dish'),
          go('gus', [[240, 214], [140, 214], [110, 190]]),
          cam(110, 180, 1600),
          nar('Gus strolls home and finds the two blue pigs asleep on the porch, snout to snout. He leaves them be.', 'gus'),
        ] },
    ],
  });

  CH.push({
    n: 5, title: 'Biscuits at dawn', part: 1,
    scene: {
      w: DOVE_W, h: DOVE_H, seed: 11, ground: doveGround, props: [...doveProps({ lit: true }), ['dutchoven', 70, 140, { id: 'oven' }]], time: 'night', weather: {},
      place: 'Hat Creek', when: 'Four in the morning', cam: [100, 150],
      actors: {
        gus: { at: [82, 142], pose: 'side', dir: -1 }, call: { at: [110, 180], hidden: true }, dish: { at: [130, 180], hidden: true }, newt: { at: [96, 182], hidden: true }, bol: { at: [150, 176], hidden: true },
        deets: { at: [300, 20], mount: 'wishbone', hidden: true }, jake: { at: [312, 12], mount: 'jakebay', hidden: true },
      },
    },
    beats: [
      { steps: [
        nar('Gus sleeps four or five hours at most. At four in the morning he is out in the back yard with the Dutch oven, baking sourdough biscuits from a starter he has kept going for over ten years.', 'gus'),
        nar('Breakfast is too important, in his opinion, to leave to a Mexican bandit.', 'gus'),
        { time: 'dawn', ms: 3500 },
      ] },
      { steps: [
        { show: 'call' }, { show: 'dish' }, { show: 'newt' }, { show: 'bol' },
        { set: 'gus', v: { x: 88, y: 186, pose: 'front' } }, face('call', 'front'), face('dish', 'front'), face('newt', 'front'), face('bol', 'front'),
        cam(120, 180, 1200),
        say('call', 'I\'ve seen bricks softer than these eggs.'),
        nar('Call has had an idea in his head for a year: gather a herd and drive it north, to buy good land beyond the brush country. Gus laughed at him when he first said it.', 'call'),
        say('call', 'We\'re going into Mexico tonight. Might make up a herd.'),
        say('gus', 'Make up a herd and do what with it?'),
        say('call', 'Drive it.'),
        nar('Call offers Dish work for a day or two. Dish thinks of Lorena and says yes.', 'dish'),
      ] },
      { steps: [
        { time: 'hot', ms: 2500, wait: false },
        face('call', -1), walk('call', [[150, 176]]),
        nar('Deets has been away three days, taking the company\'s money to the bank in San Antonio. Call always sends Deets: no bandit expects a Black man to be carrying cash.', 'call'),
        cam(300, 110, 2000),
        { show: 'deets' }, { show: 'jake' },
        par(walk('deets', [[300, 70]], { speed: 12 }), walk('jake', [[312, 62]], { speed: 12 })),
        nar('Call is staring up the stage road to San Antonio. Two riders are coming through the heat shimmer.', 'call'),
        wait(1500),
        nar('One is plainly Deets, on the big white gelding they call Wishbone. The other rides a pacing bay and slumps a little to one side in the saddle, a habit only one man has.', 'gus'),
        say('gus', 'Woodrow... that there\'s Jake Spoon.', 2600),
      ] },
    ],
  });

  CH.push({
    n: 6, title: 'Jake Spoon', part: 1,
    scene: {
      w: DOVE_W, h: DOVE_H, seed: 11, ground: doveGround, props: doveProps(), time: 'hot', weather: { heat: true, buzzards: 1 },
      place: 'Hat Creek', when: 'Morning', cam: [220, 150],
      actors: {
        deets: { at: [300, 70], mount: 'wishbone' }, jake: { at: [312, 62], mount: 'jakebay' },
        newt: { at: [150, 176], pose: 'front' }, gus: { at: [130, 180], pose: 'front' }, call: { at: [170, 178], pose: 'front' }, ...pigs([60, 196], [74, 200]),
      },
    },
    beats: [
      { steps: [
        nar('The name hits Newt like a blow. When he was very small, Jake Spoon was the man who came most often to see his mother, Maggie. Jake gave him candy, his first pony ride, and his first pair of boots.', 'newt'),
        nar('Nobody has ever told Newt who his father is. He has sometimes wondered if it might be Jake.', 'newt'),
        emote('newt', '\u2665'),
      ] },
      { steps: [
        par(go('deets', [[260, 160], [190, 186]], { speed: 20 }), go('jake', [[276, 150], [206, 192]], { speed: 20 })),
        cam(170, 180, 1200),
        nar('Jake still wears a brown hat and brown vest and carries his pearl-handled pistol. He was a Ranger with them before the outfit settled here, and left ten years ago. His horse is a bag of bones: he has come a long way.', 'jake'),
        emote('deets', '!'),
        nar('Deets grins from ear to ear. He is proud to be the one who found him.', 'deets'),
      ] },
      { steps: [
        { set: 'jake', v: { mount: null, x: 200, y: 190, pose: 'front' } }, { set: 'deets', v: { mount: null, x: 186, y: 192, pose: 'front' } },
        { spawn: 'jakehorse', kind: 'horse', who: 'jakebay', at: [226, 198] },
        say('jake', 'I shot a dentist in Fort Smith. By accident.'),
        { map: { at: [-96.5, 31.5], z: 1.4, places: [P.dove, P.sa, P.fs], title: 'Jake\'s trouble', when: 'Fort Smith, Arkansas',
          trails: [{ id: 'jake', pts: [[P.fs.lon, P.fs.lat], [-95.6, 33.8], [-97.2, 31.8], [P.sa.lon, P.sa.lat], [P.dove.lon, P.dove.lat]], col: '#c8402a', icon: 'rider' }] } },
        { trail: { id: 'jake', to: 4, speed: 1.3 } },
        nar('Up in Fort Smith, Arkansas, a shot of Jake\'s went wide and killed a well-liked dentist, who also happened to be the mayor.', 'jake'),
        nar('Worse, the dentist\'s brother is the sheriff, a young, determined man named July Johnson. Jake slipped out the back door and rode south, hoping July would find something else to do.', 'jake'),
        { scene: true },
      ] },
      { steps: [
        say('call', 'An accident. They\'d not hang you for that.'),
        say('jake', 'I didn\'t care to gamble on it.'),
        nar('Jake\'s whole reputation as a pistol shot rests on one lucky, scared shot he made as a boy Ranger. Call and Gus know he is no great shot at all.', 'call'),
        say('jake', 'Is Maggie still here?'),
        say('gus', 'Dead nine years. We\'ve had Newt since.'),
        emote('deets', '...'),
        nar('Gus remarks that one of the two of them is more than likely the boy\'s pa. There is a long silence. Call puts on his hat, picks up his rifle and goes out to work.', 'gus'),
        go('call', [[160, 230], [150, 260]]),
      ] },
    ],
  });

  window.STORY = { chapters: CH, total: 102, parts: [{ n: 1, from: 1, to: 25 }] };
  window.STORYKIT = { nar, say, walk, go, face, emote, cam, wait, par, P, doveGround, doveProps, pigs, DOVE_W, DOVE_H, saloon, lorenaRoom, crossing };
})();
