/* Part II, chapters 26–49. Built from a chapter-by-chapter reading of the novel; all wording paraphrased. */
(function () {
  const E = window.ENGINE, T = window.ART.T, K = window.STORYKIT, CH = window.STORY.chapters;
  const { nar, say, walk, go, face, emote, cam, wait, par, P, saloon, camp, brush, range, cows, horses, PL, pts, COATS } = K;

  Object.assign(E.cast, {
    july: { name: 'July', c: { skin: '#e2c07a', hair: '#6a4a2a', hat: '#7a5a3a', band: '#3a2616', shirt: '#8a9a7a', vest: '#4a3a2a', pants: '#4a4034', badge: true, gun: '#9a9aa0' } },
    roscoe: { name: 'Roscoe', c: { skin: '#e6b08a', hair: '#8a8278', hat: '#6a5a44', band: '#2a2018', shirt: '#b8a888', pants: '#5a5048', beard: 'mustache', beardCol: '#8a8278' } },
    peach: { name: 'Peach', c: { skin: '#f0b89a', hair: '#8a5a3a', brim: 'none', long: true, shirt: '#8a6a9a', dress: '#6a4a7a', blush: '#e08878' } },
    joe: { name: 'Joe', c: { skin: '#f0c098', hair: '#6a4a2a', brim: 'none', shirt: '#a8a070', pants: '#6a5a44' } },
    joehat: { name: 'Joe', c: { skin: '#f0c098', hair: '#6a4a2a', hat: '#2a2a2a', band: '#1a1a1a', shirt: '#a8a070', pants: '#6a5a44' } },
    elmira: { name: 'Elmira', c: { skin: '#f0c8a8', hair: '#4a2e1e', brim: 'none', long: true, shirt: '#a88a70', dress: '#7a6a5a' } },
    charlie: { name: 'Charlie Barnes', c: { skin: '#f0b89a', hair: '#8a7a6a', hat: '#2a2a2e', band: '#1a1a1e', brim: 'bowler', shirt: '#f0ece0', tie: '#1a1a1e', vest: '#3a3a44', pants: '#3a3a44' } },
    sabin: { name: 'Sabin', c: { skin: '#dca47a', hair: '#9a948a', hat: '#6a6050', shirt: '#8a8070', pants: '#5a5048', beard: 'full', beardCol: '#aaa49a' } },
    fowler: { name: 'Fowler', c: { skin: '#dca47a', hair: '#c8a860', hat: '#5a4a38', shirt: '#7a6a50', pants: '#4a4034', beard: 'full', beardCol: '#c8a860', gun: '#8a8a90' } },
    zwey: { name: 'Big Zwey', c: { skin: '#d8a078', hair: '#3a2a1e', hat: '#4a3a2a', coat: '#6a4a2e', shirt: '#6a4a2e', pants: '#4a3a2a', beard: 'full', beardCol: '#2a1e14' } },
    redtrader: { name: 'Trader', c: { skin: '#f0c0a0', hair: '#c8502a', brim: 'none', shirt: '#8a7a6a', pants: '#4a4034', beard: 'stubble' } },
    louisa: { name: 'Louisa', c: { skin: '#f0c0a0', hair: '#7a5230', hat: '#8a7a5a', band: '#5a4a30', shirt: '#b8a888', pants: '#5a5048' } },
    sedgwick: { name: 'Sedgwick', c: { skin: '#f0c8a8', hair: '#8a6a4a', hat: '#2a2226', band: '#4a3a3a', brim: 'tophat', shirt: '#3a3440', coat: '#3a3440', pants: '#2a2630' } },
    sam: { name: 'Old Sam', c: { skin: '#caa07a', hair: '#8a8278', hat: '#5a4e40', shirt: '#6a5e4a', pants: '#4a4034', beard: 'full', beardCol: '#7a6a4a' } },
    janey: { name: 'Janey', c: { skin: '#e8b890', hair: '#7a5a3a', brim: 'none', long: true, shirt: '#c8b890', dress: '#b8a880', boots: '#e8b890' } },
    soldier: { name: 'Soldier', c: { skin: '#e6b490', hair: '#6a4a2a', hat: '#2e3a5a', band: '#c8a040', brim: 'cap', shirt: '#3a4a7a', pants: '#5a6a8a' } },
    tobe: { name: 'Tobe Walker', c: { skin: '#e0a880', hair: '#6a5a4a', hat: '#5a4a38', band: '#2a2018', shirt: '#9a8a70', vest: '#3a3028', pants: '#4a4034', beard: 'mustache', beardCol: '#6a5a4a', badge: true } },
    barman: { name: 'Bartender', c: { skin: '#f0c8a8', hair: '#1e1612', brim: 'none', shirt: '#f4f0e6', tie: '#1e1a16', pants: '#3a3a40' } },
    nedtym: { name: 'Ned Tym', c: { skin: '#f0b89a', hair: '#6a5a4a', hat: '#8a7a5a', band: '#4a3a2a', shirt: '#b8a888', vest: '#6a4a3a', pants: '#4a4440' } },
    blueduck: { name: 'Blue Duck', c: { skin: '#a8704a', hair: '#141010', hat: '#3a5a8a', brim: 'bandana', long: true, shirt: '#8a6a44', pants: '#6a4a2e', gun: '#8a8a90', bones: true } },
    ermoke: { name: 'Ermoke', c: { skin: '#a8704a', hair: '#141010', brim: 'none', long: true, shirt: '#a88a5a', pants: '#7a5a3a', beard: 'mustache', beardCol: '#141010' } },
    kiowa: { name: 'Kiowa rider', c: { skin: '#a8704a', hair: '#141010', brim: 'none', long: true, shirt: '#b89a6a', pants: '#7a5a3a' } },
    pocampo: { name: 'Po Campo', c: { skin: '#a8704a', hair: '#f0ece4', hat: '#c8a860', band: '#6a4a2a', brim: 'sombrero', shirt: '#e0d4b8', serape: ['#3a6a7a', '#e0b050', '#8a3a2a'], pants: '#e0d4b8' } },
    gusjohns: { name: 'Gus', c: { skin: '#eab892', hair: '#f2eee6', hat: '#b8a47e', band: '#5a4630', shirt: '#f0dcd8', pants: '#f0dcd8', boots: '#eab892', beard: 'mustache', beardCol: '#f2eee6' } },
    jim: { name: 'Jim Rainey', c: { skin: '#f0c098', hair: '#9a6a34', hat: '#8a7a5a', band: '#4a3a2a', shirt: '#6a86a0', pants: '#6a5a44' } },
  });
  Object.assign(E.horses, {
    memphis: { coat: '#eeeae0', mane: '#d0cac0' },
    red: { coat: '#9a4a2a', mane: '#5a2414' },
    julybay: { coat: '#6a3e22', mane: '#1e140e', blaze: true },
    gaunt: { coat: '#8a7a64', mane: '#4a3e30' },
    bdbay: { coat: '#7a3e1e', mane: '#1a100a', saddle: '#c8c8d0' },
    bdsorrel: { coat: '#b0602e', mane: '#6a3418' },
    jerry: { coat: '#b8642e', mane: '#7a3a18', blaze: true },
    maria: { coat: '#8e8474', mane: '#4e463c', mule: true },
    kiowapony: { coat: '#c8b8a0', mane: '#3a2a1e', spots: 7 },
    kiowapony2: { coat: '#6a4a2e', mane: '#1e140e' },
    boldgelding: { coat: '#a89a84', mane: '#5a5044' },
    lmule: { coat: '#7a6a5a', mane: '#3e342a', mule: true },
  });

  const PP = {
    ...PL,
    fs: P.fs,
    bents: { name: 'Bent’s Fort', lon: -103.43, lat: 38.04, col: '#3a6aa0' },
    nueces: { name: 'Nueces crossing', lon: -99.3, lat: 28.25, col: '#c8402a' },
    redxing: { name: 'Red River', lon: -95.3, lat: 33.8, col: '#3a6aa0' },
    lredx: { name: 'Red River', lon: -98.9, lat: 34.2, col: '#8a3a2a' },
    herd44: { name: 'The herd', lon: -98.1, lat: 30.3, col: '#c8402a' },
  };

  /* ---------- scenes ---------- */
  const fortSmith = (o = {}) => ({
    w: 460, h: 420, seed: 91, time: o.time || 'noon', weather: o.weather || {}, place: o.place || 'Fort Smith, Arkansas', when: o.when || '', cam: o.cam || [200, 220],
    ground: (g) => { g.fill(T.GRASS); g.patches(T.DIRT, T.GRASS, 10, 6, 16); g.rect(0, 210, 460, 28, T.ROAD); g.line([[230, 238], [236, 400]], 20, T.ROAD); g.line([[0, 396], [230, 390], [460, 398]], 50, T.MUD, 3); g.line([[0, 402], [230, 396], [460, 404]], 30, T.BROWNWATER, 3); },
    props: [
      ['store', 176, 206, { bars: true, c: '#b8a888', seed: 5 }], ['store', 110, 206, { c: '#c8b490', seed: 6 }], ['store', 258, 206, { c: '#d4c4a0', seed: 7 }], ['store', 330, 206, { c: '#b89a78', seed: 8, w: 52 }], ['store', 410, 206, { c: '#c8b8a0', seed: 9 }],
      ['store', 140, 290, { c: '#c0ac8a', seed: 10 }], ['store', 330, 290, { c: '#d0bc98', seed: 11 }],
      ['chair', 160, 214], ['chair', 196, 214],
      ['pecan', 40, 150, { seed: 3 }], ['pine', 420, 130], ['pine', 30, 330], ['pecan', 430, 340, { seed: 5 }], ['pine', 80, 120], ['crate', 250, 372], ['crate', 262, 374],
      ...(o.props || []),
    ],
    actors: o.actors || {},
  });
  const cabinClearing = (o = {}) => ({
    w: 360, h: 380, seed: o.seed || 93, time: o.time || 'dusk', weather: o.weather || {}, place: o.place || 'The Johnson cabin, Fort Smith', when: o.when || '', cam: o.cam || [180, 190],
    ground: (g) => { g.fill(T.GRASS); g.patches(T.DIRT, T.GRASS, 8, 8, 18); g.circle(180, 190, 46, T.DIRT, 8); },
    props: [
      ['cabin', 180, 170, { lit: o.lit, w: 56 }], ['fenceH', 90, 230, { len: 48 }], ['fenceV', 66, 262, { len: 30 }], ['stump', 260, 230], ['stump', 120, 150],
      ['pine', 40, 80], ['pine', 90, 60], ['pine', 300, 70], ['pine', 330, 150], ['pine', 30, 300], ['pine', 320, 320], ['pecan', 250, 90, { seed: 7 }], ['pine', 200, 340],
      ...(o.props || []),
    ],
    actors: o.actors || {},
  });
  const woods = (o = {}) => ({
    w: 440, h: 420, seed: o.seed || 95, time: o.time || 'noon', weather: o.weather || {}, place: o.place || 'The pine woods', when: o.when || '', cam: o.cam || [220, 210],
    ground: (g) => { g.fill(T.GRASS); g.patches(T.DIRT, T.GRASS, 12, 6, 14); g.line([[0, 300], [140, 250], [300, 230], [440, 180]], 12, T.ROAD); if (o.creek) { g.line([[260, 0], [240, 200], [280, 420]], 30, T.MUD, 3); g.line([[260, 0], [240, 200], [280, 420]], 14, T.BROWNWATER, 2); } },
    props: [
      ['pine', 40, 80], ['pine', 110, 60], ['pine', 200, 90], ['pine', 380, 70], ['pine', 420, 260], ['pine', 60, 380], ['pine', 150, 400], ['pine', 350, 400],
      ['pecan', 330, 150, { seed: 8 }], ['pecan', 70, 200, { seed: 9 }], ['bush', 180, 330, { seed: 4 }], ['bush', 400, 330, { seed: 5 }],
      ...(o.props || []),
    ],
    actors: o.actors || {},
  });
  const nueces = (o = {}) => ({
    w: 420, h: 440, seed: o.seed || 101, time: o.time || 'hot', weather: o.weather || {}, place: o.place || 'The Nueces River', when: o.when || '', cam: o.cam || [210, 220],
    ground: (g) => { g.fill(T.DRY); g.patches(T.DIRT, T.DRY, 18, 8, 22); g.patches(T.GRASS, T.DRY, 6, 10, 24); g.line([[0, 214], [210, 206], [420, 218]], 66, T.MUD, 4); g.line([[0, 218], [210, 210], [420, 222]], 44, T.WATER, 4); },
    props: [
      ['mesquite', 60, 120, { seed: 51 }], ['pecan', 330, 130, { seed: 52, id: 'bigtree' }], ['mesquite', 120, 340, { seed: 53, id: 'oldtree' }], ['mesquite', 380, 360, { seed: 54 }],
      ['cactus', 200, 80], ['cactus', 40, 300], ['bush', 260, 330, { seed: 3 }], ['bush', 160, 110, { seed: 4 }], ['cactus', 300, 400],
      ...(o.props || []),
    ],
    actors: o.actors || {},
  });
  const plainsRiver = (o = {}) => ({
    w: 480, h: 400, seed: o.seed || 111, time: o.time || 'noon', weather: o.weather || {}, place: o.place || 'Up the Arkansas River', when: o.when || '', cam: o.cam || [240, 200],
    ground: (g) => { g.fill(T.GRASS); g.patches(T.TALL, T.GRASS, 14, 10, 30); g.line([[0, 200], [240, 196], [480, 204]], 110, T.MUD, 4); g.line([[0, 202], [240, 198], [480, 206]], 90, T.BROWNWATER, 4); },
    props: [['bush', 60, 110, { seed: 6 }], ['bush', 420, 320, { seed: 7 }], ['pecan', 440, 80, { seed: 11 }], ['bush', 300, 90, { seed: 8 }], ...(o.props || [])],
    actors: o.actors || {},
  });
  const redRiver = (o = {}) => ({
    w: 460, h: 420, seed: o.seed || 121, time: o.time || 'noon', weather: o.weather || {}, place: o.place || 'The Red River', when: o.when || '', cam: o.cam || [230, 210],
    ground: (g) => { g.fill(o.north ? T.TALL : T.GRASS); g.patches(T.DIRT, null, 6, 6, 14); g.line([[0, 220], [230, 210], [460, 226]], 140, T.RED, 5); g.line([[0, 224], [230, 216], [460, 230]], 16, T.BROWNWATER, 3); g.patches(T.MUD, T.RED, 6, 6, 12); },
    props: o.north ? [['bush', 60, 90, { seed: 3 }], ['bush', 380, 370, { seed: 4 }], ...(o.props || [])] : [['pine', 40, 70], ['pine', 120, 50], ['pecan', 400, 80, { seed: 3 }], ['pine', 60, 380], ['pecan', 380, 390, { seed: 4 }], ...(o.props || [])],
    actors: o.actors || {},
  });
  const sanAntonio = (o = {}) => ({
    w: 460, h: 420, seed: 131, time: o.time || 'dusk', weather: o.weather || {}, place: o.place || 'San Antonio', when: o.when || '', cam: o.cam || [230, 220],
    ground: (g) => { g.fill(T.DIRT); g.patches(T.DRY, T.DIRT, 14, 8, 20); g.rect(0, 250, 460, 24, T.ROAD); g.line([[230, 0], [230, 250]], 18, T.ROAD); },
    props: [
      ['mission', 330, 236, { id: 'alamo' }], ['adobe', 120, 244, { w: 44, lit: o.lit, seed: 3 }], ['adobe', 60, 244, { w: 30, seed: 4 }], ['store', 170, 320, { c: '#c8b490', seed: 12, lit: o.lit }], ['store', 290, 320, { c: '#b8a888', seed: 13, lit: o.lit, w: 52 }],
      ['adobe', 400, 160, { w: 36, seed: 5, lit: o.lit }], ['adobe', 120, 140, { w: 40, seed: 6 }], ['pecan', 40, 380, { seed: 8 }], ['pecan', 430, 380, { seed: 9 }], ['cactus', 250, 180], ['bush', 60, 170, { seed: 2 }],
      ...(o.props || []),
    ],
    actors: o.actors || {},
  });
  const hillPool = (o = {}) => ({
    w: 420, h: 440, seed: o.seed || 141, time: o.time || 'noon', weather: o.weather || {}, place: o.place || '', when: o.when || '', cam: o.cam || [210, 220],
    ground: (g) => {
      g.fill(T.GRASS); g.patches(T.DRY, T.GRASS, 10, 10, 26);
      if (o.bluff) { g.rect(0, 0, 420, 70, T.ROCK); g.patches(T.ROCK, T.GRASS, 5, 8, 20); }
      g.circle(210, 200, 40, T.MUD, 6); g.circle(210, 200, 32, T.WATER, 6);
      if (o.creek) { g.line([[210, 230], [240, 320], [230, 440]], 12, T.WATER, 2); }
    },
    props: [
      ['pecan', 120, 160, { seed: 21 }], ['pecan', 300, 150, { seed: 22 }], ['pecan', 150, 300, { seed: 23 }], ['pecan', 330, 290, { seed: 24 }],
      ...(o.bluff ? [['rock', 260, 190], ['rock', 270, 196], ['rock', 150, 120]] : []),
      ...(o.props || []),
    ],
    actors: o.actors || {},
  });
  const louisaFarm = (o = {}) => ({
    w: 380, h: 400, seed: 151, time: o.time || 'dusk', weather: o.weather || {}, place: 'Louisa Brooks’s farm', when: o.when || '', cam: o.cam || [190, 200],
    ground: (g) => { g.fill(T.GRASS); g.rect(40, 200, 300, 150, T.DIRT); g.patches(T.GRASS, T.DIRT, 6, 6, 14); },
    props: [
      ['cabin', 190, 150, { w: 60, lit: o.lit }], ['fenceH', 300, 170, { len: 48 }], ['fenceV', 324, 210, { len: 36 }], ['well', 110, 170],
      ...[[80, 240], [120, 260], [170, 250], [230, 270], [280, 250], [100, 310], [160, 320], [220, 330], [300, 320]].map(([x, y]) => ['stump', x, y]),
      ['pine', 30, 80], ['pine', 350, 80], ['pine', 20, 380], ['pine', 360, 380], ['pecan', 70, 90, { seed: 3 }],
      ...(o.props || []),
    ],
    actors: o.actors || {},
  });

  /* ---------- 26 ---------- */
  CH.push({
    n: 26, title: 'Fort Smith', part: 2,
    scene: fortSmith({ when: 'Spring', actors: {
      july: { at: [164, 220], pose: 'front' }, roscoe: { at: [196, 220], pose: 'front' },
      peach: { at: [330, 300], pose: 'front', hidden: true }, rooster: { kind: 'chicken', at: [340, 300], cfg: { coat: '#b8402a' }, hidden: true },
    } }),
    beats: [
      { steps: [
        { map: { fit: pts(PP.fs, PP.dove), places: [PP.fs, PP.dove], title: 'Meanwhile', when: 'Fort Smith, Arkansas' } },
        nar('Six hundred miles north-east, in Fort Smith, Arkansas, the sheriff is thinking about Jake Spoon.'),
        { scene: true },
        nar('July Johnson is twenty-four, still yellow from jaundice he caught at a trial in Missouri. He sits outside the one-cell jail, whose lock is broken, so the door is chained shut.', 'july'),
        nar('Beside him his deputy, Roscoe Brown, forty-eight, whittles a stick down to nothing, as he does every day.', 'roscoe'),
      ] },
      { steps: [
        { zoom: 1.4 }, { show: 'peach' }, { show: 'rooster' },
        par(go('peach', [[300, 232], [196, 236]], { speed: 14 }), go('rooster', [[310, 236], [206, 238]], { speed: 14 })),
        say('peach', 'When are you going after Jake Spoon?'),
        nar('Peach Johnson, the widow of July’s brother Benny, the dentist and mayor Jake shot, marches up nearly six feet tall carrying a red rooster.', 'peach'),
        emote('peach', '!'),
        nar('The rooster pecks her. She wrings its neck on the spot, tosses the head in the weeds, and holds the body out by the feet until it stops kicking.', 'peach'),
        { fall: 'rooster', blood: true },
      ] },
      { steps: [
        { zoom: 1 }, walk('peach', [[330, 300]], { speed: 14 }),
        nar('Benny was not a kind man, and July did not much like him. But he is responsible for the town, and the town expects him to go after Jake. Most likely toward San Antonio.', 'july'),
        say('roscoe', 'Send Joe down for dominoes?'),
        say('july', 'Not tonight.'),
        go('july', [[160, 236], [60, 236], [0, 236]]),
      ] },
    ],
  });

  /* ---------- 27 ---------- */
  CH.push({
    n: 27, title: 'Elmira', part: 2,
    scene: cabinClearing({ time: 'dusk', when: 'Milking time', actors: {
      joe: { at: [96, 240], pose: 'front' }, calf: { kind: 'cow', at: [110, 250], cfg: { coat: '#b89a70' }, cfgKey: 'calf' }, july: { at: [70, 200] },
      elmira: { at: [190, 176], pose: 'front', hidden: true },
    } }),
    beats: [
      { steps: [
        go('july', [[100, 226]]),
        nar('At dusk July finds that Joe has roped the placid milk-pen calf again. Joe is twelve, skinny, with big slightly bulging eyes, and is Elmira’s son, not July’s.', 'joe'),
        go('july', [[180, 196]]), go('joe', [[196, 196]]),
      ] },
      { steps: [
        { time: 'night', ms: 2000, wait: false }, { set: 'july', v: { hidden: true } }, { set: 'joe', v: { hidden: true } },
        nar('At supper Elmira stays up in the sleeping loft, bare legs dangling over the table, and snaps at July: about the buttermilk, about his yellow skin.', 'elmira'),
        say('july', 'I mean to go after Jake Spoon.'),
        nar('She says the shooting was an accident. Then she insists he take Joe with him.', 'elmira'),
      ] },
      { steps: [
        { set: 'elmira', v: { hidden: false, x: 262, y: 236, pose: 'front' } }, { set: 'july', v: { hidden: false, x: 230, y: 240, pose: 'front' } },
        { weather: { fireflies: true, moon: 'quarter' } }, cam(240, 230, 1200),
        nar('Among the fireflies, Elmira sits on a stump with her secrets. Before July she was a sporting girl in Kansas. She knew Jake Spoon. Joe’s father is a gambler called Dee Boot.', 'elmira'),
        nar('She is carrying July’s child, and she wants neither the baby nor him.', 'elmira'),
        go('july', [[300, 260], [360, 330]]),
        nar('July clicks his pistol’s cylinder round and walks off on his rounds. Under the rising moon she decides: once he and Joe are gone, she will take a boat up the Arkansas to find Dee.', 'elmira'),
      ] },
    ],
  });

  /* ---------- 28 ---------- */
  CH.push({
    n: 28, title: 'July rides out', part: 2,
    scene: fortSmith({ time: 'night', when: 'An hour before dawn', cam: [120, 230], actors: {
      july: { at: [0, 224], mount: 'julybay' }, joe: { at: [-20, 230], mount: 'red' }, roscoe: { at: [182, 220], pose: 'front', hidden: true },
    } }),
    beats: [
      { steps: [
        nar('An hour before dawn Elmira cooks their breakfast without a word of warmth. July rides off heavy-hearted.', 'july'),
        par(go('july', [[140, 224]]), go('joe', [[110, 230]])),
        emote('joe', '!'), { fall: 'joe', blood: false }, { spawn: 'redh', kind: 'horse', who: 'red', at: [124, 236] },
        nar('Joe rides a rat-eaten saddle borrowed from Peach. In the dark street his horse, Red, bows up and bucks him off.', 'joe'),
      ] },
      { steps: [
        { rise: 'joe' }, { set: 'joe', v: { x: 150, y: 234, pose: 'front', who: 'joehat' } }, { show: 'roscoe' }, { set: 'july', v: { mount: null, x: 166, y: 232, pose: 'front' } }, cam(170, 230, 800),
        nar('At the jail July takes a rifle, two boxes of bullets and Roscoe’s shotgun. Roscoe stumbles barefoot off his couch and warns them about Comanches.', 'roscoe'),
        nar('He gives Joe his old black felt hat. It swallows the boy’s head nearly to his mouth.', 'joe'),
        { time: 'dawn', ms: 3000 },
      ] },
      { steps: [
        say('july', 'Look after Ellie, Roscoe.'),
        { set: 'july', v: { mount: 'julybay' } }, { set: 'joe', v: { mount: 'red' } }, { remove: 'redh' },
        par(go('july', [[236, 250], [236, 420]], { speed: 26 }), go('joe', [[222, 250], [222, 420]], { speed: 26 })),
        { map: { fit: pts(PP.fs, PP.sa, PP.redxing), places: [PP.fs, PP.redxing, PP.sa], title: 'July’s road', when: 'After Jake Spoon',
          trails: [{ id: 'july', pts: [[PP.fs.lon, PP.fs.lat], [-94.8, 34.6], [PP.redxing.lon, PP.redxing.lat]], col: '#3a6aa0', icon: 'rider2' }] } },
        { trail: { id: 'july', to: 1, speed: 0.8 } },
        nar('As dawn reddens beyond the shining river, July and Joe ride south-west for Texas.'),
      ] },
    ],
  });

  /* ---------- 29 ---------- */
  CH.push({
    n: 29, title: 'Roscoe’s errand', part: 2,
    scene: fortSmith({ when: 'Six days later', actors: {
      roscoe: { at: [196, 220], pose: 'front' }, peach: { at: [300, 236], pose: 'front' }, charlie: { at: [316, 240], pose: 'front' },
      sabin: { at: [250, 370], pose: 'front', hidden: true }, memphis: { kind: 'horse', who: 'memphis', at: [140, 236], hidden: true },
    } }),
    beats: [
      { steps: [
        par(go('peach', [[216, 236]]), go('charlie', [[230, 240]])),
        say('peach', 'Elmira’s not been home in two days.'),
        nar('Peach and Charlie Barnes, the fat little banker who wears a necktie every day, bring the news. At the cabin Roscoe finds mouse-gnawed cornbread and no shoes. He suspects a bear.', 'roscoe'),
      ] },
      { steps: [
        { show: 'sabin' }, go('roscoe', [[236, 300], [244, 360]]), cam(240, 340, 1400),
        say('sabin', 'A woman got on the whiskey boat. Going upriver.'),
        nar('Old Sabin the ferryman took her for a sporting woman. The whole town knows within half an hour.', 'sabin'),
      ] },
      { steps: [
        go('roscoe', [[196, 236]]), cam(200, 230, 1000),
        say('peach', 'Go to Texas and find July.'),
        nar('Caught asleep beside an empty bottle, Roscoe is ordered by Peach to ride to Texas and tell July.', 'peach'),
        { show: 'memphis' }, { remove: 'memphis' }, { set: 'roscoe', v: { mount: 'memphis' } }, { dust: [236, 244], n: 8 },
        nar('Next morning he saddles Memphis, his tall white gelding, in front of a watching crowd. Memphis kicks dust on Charlie’s shiny shoes. Full of foreboding, Roscoe heads for Texas.', 'roscoe'),
        go('roscoe', [[60, 230], [0, 230]], { speed: 20 }),
      ] },
    ],
  });

  /* ---------- 30 ---------- */
  CH.push({
    n: 30, title: 'The Nueces', part: 2,
    scene: nueces({ when: 'Afternoon', cam: [200, 300], props: [['rock', 200, 262, { id: 'turtle' }]], actors: {
      lorena: { at: [170, 290], pose: 'front' }, jake: { at: [120, 336], pose: 'front' }, jakeh: { kind: 'horse', who: 'jakebay', at: [80, 310] }, mare: { kind: 'horse', who: 'loremare', at: [60, 330] },
      deets: { at: [240, 120], mount: 'wishbone', hidden: true },
    } }),
    beats: [
      { steps: [
        nar('Riding ahead of the herd’s dust through the brush, Lorena reaches the Nueces. Jake is drunk and feverish, his thorn-stabbed thumb gone purple.', 'lorena'),
        emote('jake', '...'),
      ] },
      { steps: [
        { zoom: 1.4 }, go('lorena', [[190, 244]], { speed: 12 }),
        nar('She wades in chest-deep to wash off the dust. The water is green and cold. Then she sees a snapping turtle as big as a washtub sitting on the bank.', 'lorena'),
        emote('lorena', '!'),
        { shoot: 'jake', at: [200, 256], n: 4, gap: 380 },
        { unprop: 'turtle' },
        nar('Jake shoots at it left-handed. He misses four times. The turtle slides into the river.', 'jake'),
      ] },
      { steps: [
        { zoom: 1 }, { show: 'deets' }, go('deets', [[230, 210], [150, 300]], { speed: 16 }), { set: 'deets', v: { mount: null, pose: 'front', x: 140, y: 330 } }, { spawn: 'wishbone', kind: 'horse', who: 'wishbone', at: [170, 316] },
        nar('Deets swims his horse across, digs the thorn out of Jake’s thumb with a hot needle, and holds up the tip, grinning.', 'deets'),
        say('deets', 'Storm coming. River’ll rise. Cross now.'),
        { set: 'deets', v: { mount: 'wishbone' } }, { remove: 'wishbone' }, { set: 'lorena', v: { mount: 'loremare', x: 170, y: 300 } }, { remove: 'mare' }, { set: 'jake', v: { mount: 'jakebay' } }, { remove: 'jakeh' },
        { time: 'dusk', ms: 2500, wait: false },
        par(go('deets', [[200, 200], [230, 120]], { speed: 14 }), go('lorena', [[212, 206], [240, 130]], { speed: 14 }), go('jake', [[180, 200], [200, 120]], { speed: 14 })), cam(220, 150, 1600),
        nar('He leads her balking mare across as it swims, water to Lorena’s waist, her eyes shut. On the far bank he says: cook early, put the fire out, and never tie horses to a big tree.', 'deets'),
      ] },
    ],
  });

  /* ---------- 31 ---------- */
  CH.push({
    n: 31, title: 'Sandstorm', part: 2,
    scene: camp({ time: 'dusk', weather: { dusty: true }, when: 'Sunset', cam: [180, 220], actors: {
      gus: { at: [140, 204], pose: 'front' }, call: { at: [210, 210], mount: 'hellbitch' }, bol: { at: [160, 186], pose: 'front' }, deets: { at: [260, 214], mount: 'wishbone' },
      newt: { at: [236, 236], mount: 'mouse' }, dish: { at: [380, 250], mount: 'dishsorrel' }, soupy: { at: [60, 250], mount: 'soupyhorse' },
      ...cows('c', 26, 60, 280, 330, 80, 31),
    } }),
    beats: [
      { steps: [
        nar('A hot wind rises from the south. The setting sun goes dark with yellow edges, and a brown curtain of sand climbs the sky.', 'gus'),
        say('gus', 'Looks like a muddy sundown.'),
        say('deets', 'Crossing’s too steep to try in the dark, Captain.'),
        nar('For once Call hesitates. He sends Newt to tell the point riders to hold the cattle.', 'call'),
      ] },
      { steps: [
        { weather: { sand: true } }, { time: 'storm', ms: 1500, wait: false },
        go('newt', [[300, 260]], { speed: 40 }),
        { move: 'c', by: [260, -40], speed: 60, jitter: 60 }, walk('newt', [[440, 250]], { speed: 60 }), { follow: 'newt' },
        nar('Sand pours in like a river. The blinded herd stampedes and Newt is swept along inside it, clinging to the saddle horn while Mouse crashes through mesquite.', 'newt'),
        emote('newt', '!'),
      ] },
      { scene: brush({ time: 'night', weather: { lightning: true, elmo: true, rain: 'light' }, place: 'South of the Nueces', when: 'Night', cam: [190, 200], actors: {
          newt: { at: [160, 210], mount: 'mouse' }, dish: { at: [220, 200], mount: 'dishsorrel' }, deets: { at: [300, 160], mount: 'wishbone', hidden: true },
          ...cows('c', 14, 90, 230, 220, 80, 32),
        } }),
        steps: [
          { flash: true },
          nar('Lightning strikes in bolts as thick as poles. In one flash Newt finds Dish, pulling on a yellow slicker. Dish has lost Soupy.', 'dish'),
          { flash: true },
          nar('Little blue balls of light start rolling along the cattle’s horns.', 'newt'),
          { show: 'deets' }, go('deets', [[200, 180]], { speed: 30 }),
          say('deets', 'Get away from them cattle, Newt!'),
        ] },
      { steps: [
        { weather: { rain: 'heavy', elmo: false } }, { time: 'night', ms: 800 },
        walk('newt', [[260, 300], [320, 340]], { speed: 10 }),
        nar('Then the rain comes in sheets. Soaked, cold, and lost, Newt lets Mouse plod through floodwater, slide into a gully and out again, and waits for dawn.', 'newt'),
      ] },
    ],
  });

  /* ---------- 32 ---------- */
  CH.push({
    n: 32, title: 'Lightning', part: 2,
    scene: nueces({ time: 'night', weather: { lightning: true }, when: 'Night', cam: [300, 150], actors: {
      lorena: { at: [320, 150], pose: 'front' }, jake: { at: [290, 160], pose: 'front' }, jakeh: { kind: 'horse', who: 'jakebay', at: [250, 130] }, mule: { kind: 'horse', who: 'lmule', at: [230, 140] }, mare: { kind: 'horse', who: 'loremare', at: [370, 120] },
    } }),
    beats: [
      { steps: [
        { flash: true }, emote('lorena', '!'),
        walk('mare', [[460, 60]], { speed: 60 }),
        nar('Jake forgot to hobble the stock. At the first flash Lorena’s young mare snaps her rein and bolts into the dark. Jake gets hobbles on his horse and the mule.', 'jake'),
      ] },
      { steps: [
        { weather: { rain: 'heavy' } }, { set: 'lorena', v: { x: 330, y: 134 } }, { flash: true },
        nar('Lorena is rigid with terror of lightning. She clings to the tree while strikes hit all round them.', 'lorena'),
        say('jake', 'Get away from the tree!'),
        nar('She fights him, punches him in the eye, kicks him. Then a strike so close it stuns her, and he drags her down under the riverbank with a muddy tarp.', 'jake'),
        go('jake', [[300, 186]], { speed: 20 }), go('lorena', [[316, 188]], { speed: 20 }),
      ] },
      { steps: [
        cam(160, 290, 1200), { flash: true },
        { unprop: 'oldtree' }, { prop: ['stump', 120, 340] }, { dust: [120, 330], n: 14 },
        nar('Across the river, a bolt splits the tree at their old camp. By the next flash its top is on the ground.', 'lorena'),
        nar('Jake says Deets’s advice saved their lives. Lorena notices he never thanked Deets for it.', 'lorena'),
      ] },
    ],
  });

  /* ---------- 33 ---------- */
  CH.push({
    n: 33, title: 'After the storm', part: 2,
    scene: camp({ time: 'dawn', when: 'Cloudless dawn', seed: 72, cam: [180, 210], props: [['bedroll', 260, 200, { c: '#b8603e' }], ['bush', 200, 150, { seed: 9 }]], actors: {
      call: { at: [230, 210], mount: 'hellbitch' }, deets: { at: [280, 214], mount: 'wishbone' }, dish: { at: [200, 222], pose: 'front' }, newt: { at: [140, 240], mount: 'mouse' },
      needle: { at: [110, 214], pose: 'front' }, jasper: { at: [170, 230], pose: 'front' }, bert: { at: [226, 236], pose: 'front' }, pea: { at: [250, 236], pose: 'front' },
      bull: { kind: 'cow', at: [330, 260], cfg: { coat: '#9a5a2a', patch: '#efe6cf', brindle: true }, cfgKey: 'bull' }, ...window.STORYKIT.pigs([300, 250], [312, 256]),
      ...cows('c', 16, 60, 300, 330, 60, 33),
    } }),
    beats: [
      { steps: [
        nar('Dawn comes up cloudless over a thousand puddles. The outfit has come through the storm with few losses. The wagon has to be roped out of a gully, Bol refusing to leave his seat.', 'call'),
        say('deets', 'Everybody’s safe but Mr. Gus. Last seen riding east.'),
        nar('Call sends Deets to look. He wants to cross the river soon.', 'call'),
        walk('deets', [[440, 180]], { speed: 30 }),
      ] },
      { steps: [
        say('dish', 'Kept my spare clothes in oilcloth, boys.'),
        nar('Dish struts in dry clothes while the rest strip and hang their shirts on the bushes: brown faces and hands, white everywhere else. Sean spent the night in the wagon after being bucked off.', 'dish'),
        say('jasper', 'How many rivers to the Yellowstone?'),
        nar('Nobody agrees on the answer. Needle keeps his rifle handy, because the Texas bull is standing there watching the pigs root under a bush.', 'needle'),
      ] },
    ],
  });

  /* ---------- 34 ---------- */
  CH.push({
    n: 34, title: 'Gus finds the mare', part: 2,
    scene: nueces({ time: 'noon', when: 'Morning after the storm', cam: [300, 150], props: [['campfire', 300, 150], ['stump', 120, 340]], actors: {
      lorena: { at: [320, 150], pose: 'front' }, jake: { at: [280, 150], pose: 'front' }, jakeh: { kind: 'horse', who: 'jakebay', at: [250, 130] },
      gus: { at: [440, 60], mount: 'malaria', hidden: true }, mare: { kind: 'horse', who: 'loremare', at: [460, 50], hidden: true },
    } }),
    beats: [
      { steps: [
        nar('Lorena spreads their soaked gear on the bushes. The flour and salt are ruined, but the bacon and coffee survived. Jake rides downriver after the mare.', 'lorena'),
        { set: 'jake', v: { mount: 'jakebay' } }, { remove: 'jakeh' }, go('jake', [[0, 160]], { speed: 30 }),
      ] },
      { steps: [
        { show: 'gus' }, { show: 'mare' }, par(go('gus', [[340, 130]]), go('mare', [[360, 124]])),
        nar('Gus rides in leading the runaway mare. He found her heading home to Lonesome Dove. Lorena fries him bacon and he admires how rested she looks.', 'gus'),
        { set: 'gus', v: { mount: null, pose: 'front', x: 340, y: 150 } }, { spawn: 'malaria', kind: 'horse', who: 'malaria', at: [370, 140] },
        { shoot: 'gus', up: true, n: 2, gap: 500 },
        nar('Then he fires two shots in the air to call Jake back.', 'gus'),
      ] },
      { steps: [
        { spawn: 'jake2', who: 'jake', at: [0, 160], mount: 'jakebay' }, go('jake2', [[276, 156]], { speed: 40 }),
        say('jake2', 'We’re stopping in San Antonio.'),
        say('lorena', 'No.'),
        nar('She refuses twice. Jake slaps her in front of Gus. Lorena ignores it and goes on packing.', 'lorena'),
        say('gus', 'If he leaves you, follow the herd’s dust.'),
        nar('Gus warns Jake that lawmen may be looking for him in San Antonio. Then he swims his horse back across the muddy river and waves from the far side.', 'gus'),
        { set: 'gus', v: { mount: 'malaria' } }, { remove: 'malaria' }, go('gus', [[300, 210], [260, 330]], { speed: 18 }),
      ] },
    ],
  });

  /* ---------- 35 ---------- */
  const snakes = Array.from({ length: 9 }, (_, i) => ({ spawn: 'snk' + i, kind: 'snake', at: [226 + (i % 3) * 8 - 8, 206 + Math.floor(i / 3) * 6], wander: [226, 210, 10] }));
  CH.push({
    n: 35, title: 'Water moccasins', part: 2,
    scene: nueces({ time: 'hot', weather: { dusty: true }, when: 'Afternoon', seed: 102, cam: [210, 280], actors: {
      newt: { at: [140, 330], mount: 'mouse' }, dish: { at: [260, 290], mount: 'dishsorrel' }, gus: { at: [320, 280], mount: 'malaria' }, call: { at: [180, 270], mount: 'hellbitch' },
      pea: { at: [150, 280], mount: 'sardine' }, deets: { at: [290, 240], mount: 'wishbone' }, sean: { at: [230, 300], mount: 'hc5' }, allen: { at: [200, 300], mount: 'hc2' },
      olddog: { kind: 'cow', at: [240, 260], cfg: { coat: '#c8b898', patch: '#6a4a3a' }, cfgKey: 'olddog' },
      ...cows('c', 20, 60, 300, 320, 80, 35),
    } }),
    beats: [
      { steps: [
        nar('Swarms of mosquitoes torment men and horses. Newt spends the morning forcing his horse into thicket after thicket after one contrary red cow.', 'newt'),
        nar('Dish eases Old Dog, a big steady lead steer bought from the Pumphreys, to the front. Watching Dish moon over Lorena, Gus remembers losing Clara.', 'dish'),
      ] },
      { steps: [
        { move: 'c', by: [0, -140], speed: 16, jitter: 30 }, walk('olddog', [[240, 140]], { speed: 16 }), walk('dish', [[270, 150]], { speed: 16 }), cam(210, 210, 3000),
        nar('Deets’s crossing is a good one. The herd swims the Nueces without trouble.', 'deets'),
        go('sean', [[226, 214]], { speed: 16 }),
      ] },
      { steps: [
        { zoom: 1.5 }, ...snakes,
        emote('sean', '!'),
        say('sean', 'Snakes! Snakes!', 1200),
        nar('Sean has ridden into a nest of water moccasins. They are all over him and his horse, like giant brown worms.', 'sean'),
        par(go('pea', [[216, 214]], { speed: 40 }), go('call', [[240, 222]], { speed: 40 }), go('gus', [[250, 206]], { speed: 40 }), go('deets', [[212, 200]], { speed: 40 })),
        { shoot: 'gus', at: [226, 208], n: 3, gap: 300 },
        ...Array.from({ length: 5 }, (_, i) => ({ remove: 'snk' + i })),
        nar('The men charge in lashing with coiled ropes. Gus shoots snakes. Pea Eye drags the boy out of the saddle and across to the bank.', 'pea'),
        ...Array.from({ length: 4 }, (_, i) => ({ remove: 'snk' + (i + 5) })),
      ] },
      { steps: [
        { set: 'sean', v: { mount: null, x: 250, y: 150 } }, { fall: 'sean', blood: false }, { set: 'pea', v: { mount: null, x: 236, y: 146, pose: 'front' } }, { set: 'allen', v: { mount: null, x: 268, y: 146, pose: 'front' } },
        cam(240, 150, 1200),
        nar('Sean lies on Call’s slicker on the north bank, bitten eight times, once on the neck. There is nothing anyone can do. He dies there.', 'sean'),
        emote('allen', '...'),
        nar('Allen blames himself. Newt, holding the cattle, weeps and is sick beside his horse. The rest of the crew, terrified now, get the wagon across.', 'newt'),
      ] },
      { steps: [
        { zoom: 1.3 }, { remove: 'sean' }, { prop: ['grave', 320, 150] }, { set: 'allen', v: { x: 300, y: 158 } }, { set: 'pea', v: { x: 340, y: 156 } }, { set: 'deets', v: { mount: null, x: 326, y: 164, pose: 'front' } }, { set: 'gus', v: { mount: null, x: 312, y: 170, pose: 'front' } },
        cam(320, 160, 1200),
        nar('Deets and Pea bury Sean in a piece of wagon sheet under a live oak a hundred yards from the river.', 'deets'),
        say('allen', '(sings an old Irish song)', 2600),
        nar('Allen breaks down halfway through the song. Gus says a few words. Then the outfit mounts and rides on, looking back through the tall grey grass.', 'gus'),
      ] },
    ],
  });

  /* ---------- 36 ---------- */
  const boatMen = {
    boat: { kind: 'boat', at: [240, 222], sort: -40 },
    elmira: { at: [276, 208], pose: 'front' }, fowler: { at: [226, 204], pose: 'side', dir: -1 }, zwey: { at: [200, 208], pose: 'front' }, redtrader: { at: [256, 210], pose: 'front' },
  };
  CH.push({
    n: 36, title: 'The whiskey boat', part: 2,
    scene: plainsRiver({ time: 'noon', when: 'Upriver from Fort Smith', actors: boatMen }),
    beats: [
      { steps: [
        { map: { fit: pts(PP.fs, PP.bents), places: [PP.fs, PP.bents], title: 'Elmira', when: 'Up the Arkansas',
          trails: [{ id: 'boat', pts: [[-94.42, 35.39], [-95.3, 35.8], [-96, 36.4], [-97.3, 37.7], [-98, 38.3], [-100, 37.75], [-102.6, 38.1], [-103.43, 38.04]], col: '#3a6aa0', icon: 'rider2' }] } },
        { trail: { id: 'boat', to: 3, speed: 1 } },
        nar('Elmira rides a stinking whiskey traders’ boat up the Arkansas, out of the woods onto the open plains.'),
        { scene: true },
        nar('She lives in a cubbyhole among the whiskey casks, roofed with buffalo skins and full of fleas. To her surprise, the rough men leave her alone.', 'elmira'),
        nar('Fowler, the chief trader, yellow-bearded and always drinking, watches the banks for Indians with a rifle in the crook of his arm.', 'fowler'),
      ] },
      { steps: [
        { time: 'dawn', ms: 1500 },
        nar('She thinks of July’s shyness, of how little she feels for Joe, and of Dee. Misty dawns bring up cranes and ducks. At night a huge full moon rises out of the river.', 'elmira'),
        { time: 'night', ms: 2000 }, { weather: { moon: 'full' } }, wait(1500),
      ] },
      { steps: [
        { time: 'dawn', ms: 1500 }, { weather: { moon: null } },
        go('zwey', [[244, 210]], { speed: 20 }), emote('redtrader', '!'),
        { fall: 'redtrader' },
        nar('The morning after the full moon, Big Zwey, a huge buffalo hunter with an oily beard, kills the red-haired trader in a fight.', 'zwey'),
        nar('The men strip the body of boots and belt and heave it over the side. It bumps the boat and drifts off into the mist.', 'elmira'),
        { remove: 'redtrader' },
        say('fowler', 'That fight was over you. Zwey wants to marry you.'),
        nar('Elmira resents being treated as his property, and falls silent. Big Zwey sits at the far end of the boat and stares at her for hours.', 'elmira'),
      ] },
    ],
  });

  /* ---------- 37 ---------- */
  CH.push({
    n: 37, title: 'Roscoe and Louisa', part: 2,
    scene: woods({ creek: true, when: 'West of Fort Smith', cam: [160, 260], actors: {
      roscoe: { at: [60, 290], mount: 'memphis' },
      ...Object.fromEntries(Array.from({ length: 6 }, (_, i) => ['wp' + i, { kind: 'pig', at: [0 - i * 12, 330 + (i % 3) * 8], cfg: { coat: i === 0 ? '#6a4a2e' : '#5a4e44' } }])),
    } }),
    beats: [
      { steps: [
        { move: 'wp', by: [260, -40], speed: 50, jitter: 20 },
        emote('roscoe', '!'), walk('roscoe', [[230, 250]], { speed: 50 }),
        { shoot: 'roscoe', at: [100, 300], n: 6, gap: 220 },
        nar('Hours out of town, a pack of wild pigs led by a brown boar stampedes Memphis. Roscoe empties his pistol and drops his spare bullets.', 'roscoe'),
        { set: 'roscoe', v: { x: 244, y: 240 } },
        nar('Then Memphis bogs in a creek and Roscoe loses a boot in the mud. That night he sleeps sitting up, terrified.', 'roscoe'),
      ] },
      { scene: louisaFarm({ time: 'dusk', actors: {
          roscoe: { at: [100, 290], pose: 'front' }, louisa: { at: [140, 290], pose: 'front' },
          mule1: { kind: 'horse', who: 'greasy', at: [190, 286] }, mule2: { kind: 'horse', who: 'kickboy', at: [214, 280] },
          ck1: { kind: 'chicken', at: [150, 190], wander: [150, 190, 20] }, ck2: { kind: 'chicken', at: [230, 200], cfg: { coat: '#c89a5a' }, wander: [230, 200, 20] },
          memphis: { kind: 'horse', who: 'memphis', at: [60, 250] },
        } }),
        steps: [
          nar('On the Army trail he finds a big woman in men’s clothes pulling stumps with a mule team. Louisa Brooks puts him to work straight away.', 'louisa'),
          { dust: [116, 294], n: 8 }, { fall: 'roscoe', blood: false },
          nar('A root comes free, whips out like a snake, and knocks Roscoe flat on his back.', 'roscoe'),
          { rise: 'roscoe' },
        ] },
      { steps: [
        { time: 'night', ms: 2000 }, { set: 'roscoe', v: { x: 180, y: 190, pose: 'front' } }, { set: 'louisa', v: { x: 200, y: 190, pose: 'front' } }, cam(190, 180, 1000),
        say('louisa', 'You could marry me and stay.'),
        say('roscoe', 'I’m on the law’s business, ma’am.'),
        nar('Over a supper of nothing but cornbread, she proposes. He refuses and beds down behind the cabin, afraid of her pet rattlesnake, Ed.', 'roscoe'),
      ] },
      { steps: [
        { time: 'dawn', ms: 2000 },
        nar('At sunup Louisa comes out barefoot through the wet grass and climbs in with him before he is properly awake, while the chickens watch.', 'louisa'),
        { set: 'roscoe', v: { mount: 'memphis' } }, { remove: 'memphis' },
        say('roscoe', 'I might stop back this way.'),
        go('roscoe', [[20, 250], [-20, 250]], { speed: 20 }),
        nar('Torn, Roscoe keeps his duty to July and rides west. Behind him Louisa hitches her mules to another stump.', 'louisa'),
      ] },
    ],
  });

  /* ---------- 38 ---------- */
  CH.push({
    n: 38, title: 'Sedgwick', part: 2,
    scene: woods({ when: 'A rainy spring', weather: { rain: 'light' }, cam: [200, 250], actors: {
      july: { at: [0, 290], mount: 'julybay' }, joe: { at: [-20, 300], mount: 'red', who: 'joehat' },
    } }),
    beats: [
      { steps: [
        par(go('july', [[300, 230]], { speed: 16 }), go('joe', [[280, 240]], { speed: 16 })),
        nar('Sick with a worry he can’t name, July barely speaks. He drives Joe and the horses sixteen hours a day, even on moonlit nights.', 'july'),
        nar('Farmers tell him Jake Spoon spent a night with them. A farm wife gives them buttermilk while her little girls giggle at Joe.', 'joe'),
      ] },
      { scene: redRiver({ when: 'The Texas border', actors: {
          july: { at: [100, 110], mount: 'julybay' }, joe: { at: [80, 100], mount: 'red', who: 'joehat' },
          sedgwick: { at: [240, 226], pose: 'front' }, gaunt: { kind: 'horse', who: 'gaunt', at: [216, 228] }, smule: { kind: 'horse', who: 'lmule', at: [262, 232] },
        } }),
        steps: [
          nar('At the Red River they find a tall stranger in a beaver hat and frock coat, bogged midstream between a gaunt horse and a pack mule, calmly throwing his baggage into the water.', 'sedgwick'),
          par(go('july', [[160, 180]], { speed: 16 }), go('joe', [[150, 170]], { speed: 16 })),
          nar('July and Joe cross at a deer ford, tie their ropes together, and drag the man’s animals free.', 'july'),
          walk('gaunt', [[200, 310]], { speed: 20 }), walk('smule', [[230, 316]], { speed: 20 }), go('sedgwick', [[220, 300]], { speed: 14 }),
        ] },
      { steps: [
        say('sedgwick', 'Sedgwick. I collected bugs. Now I mean to preach.'),
        nar('He offers to take Joe off July’s hands. Then, peering at him, he says July is a man carrying a heavy heart. It unsettles July badly.', 'sedgwick'),
        walk('sedgwick', [[320, 360]], { speed: 8 }),
      ] },
    ],
  });

  /* ---------- 39 ---------- */
  CH.push({
    n: 39, title: 'The San Antonio River', part: 2,
    scene: camp({ time: 'night', weather: { rain: 'light' }, when: 'Three days of rain', cam: [170, 200], actors: {
      allen: { at: [140, 214], pose: 'front' }, jasper: { at: [196, 214], pose: 'front' }, bert: { at: [216, 210], pose: 'front' }, soupy: { at: [120, 224], pose: 'front' }, newt: { at: [170, 222], pose: 'front' },
    } }),
    beats: [
      { steps: [
        emote('allen', '...'),
        nar('For a week the camp talks of nothing but Sean. Jasper chatters from fright. Allen rides silent all day and weeps by the fire at night.', 'allen'),
        nar('Rain, mosquitoes and brush wear everyone down. Bert and Soupy nearly fight. But Dish turns out to be a superb point man.', 'dish'),
      ] },
      { scene: nueces({ time: 'dawn', weather: {}, when: 'Grey morning', seed: 103, place: 'The San Antonio River', cam: [210, 280], actors: {
          gus: { at: [180, 270], mount: 'malaria' }, call: { at: [210, 270], mount: 'hellbitch' }, jasper: { at: [300, 330], mount: 'jasperhorse' }, soupy: { at: [340, 320], mount: 'soupyhorse' }, newt: { at: [150, 300], mount: 'mouse' },
          ...window.STORYKIT.pigs([260, 290], [272, 294]),
          ...cows('c', 14, 60, 320, 320, 60, 39),
        } }),
        steps: [
          nar('Deets finds a shallow crossing. Call and Gus sit their horses on the bank, scanning the water for snakes, and argue whether talking about a death helps.', 'call'),
          go('jasper', [[280, 214]], { speed: 60 }), emote('soupy', '!'), { dust: [280, 214], n: 8 },
          nar('Jasper charges the river at a gallop and his horse nearly falls. Soupy laughs out loud.', 'soupy'),
          say('gus', 'If my luck turns bad, I doubt I’ll make it, Newt.'),
          { move: 'c', by: [0, -150], speed: 16 }, walk('sow', [[260, 150]], { speed: 12 }), walk('shoat', [[272, 150]], { speed: 12 }),
          nar('Then the two blue pigs wade in and swim the river, and Gus is delighted.', 'gus'),
        ] },
    ],
  });

  /* ---------- 40 ---------- */
  const clearing = (o = {}) => ({ ...hillPool({ ...o }), ground: (g) => { g.fill(T.DRY); g.patches(T.GRASS, T.DRY, 10, 10, 24); g.circle(210, 210, 60, T.DIRT, 10); } });
  CH.push({
    n: 40, title: 'Near San Antonio', part: 2,
    scene: clearing({ time: 'noon', place: 'A clearing near San Antonio', when: 'After a night of rain', props: [['campfire', 210, 216], ['bedroll', 180, 230, { c: '#6a5a8a' }]], actors: {
      lorena: { at: [200, 230], pose: 'front' }, jake: { at: [240, 222], pose: 'front' }, jakeh: { kind: 'horse', who: 'jakebay', at: [270, 200] }, mare: { kind: 'horse', who: 'loremare', at: [150, 190] },
      possum: { kind: 'dillo', at: [60, 300], hidden: true },
    } }),
    beats: [
      { steps: [
        nar('Despite a thunderstorm every night, Lorena has come to love travelling. Deets checks on them nearly every day. He has taught her to build a fire and pack the mule.', 'lorena'),
      ] },
      { steps: [
        say('jake', 'You won’t even talk to me.'),
        nar('Jake sulks about San Antonio, calls her names, threatens her with a rope, then rides off to town.', 'jake'),
        { set: 'jake', v: { mount: 'jakebay' } }, { remove: 'jakeh' }, go('jake', [[420, 120]], { speed: 30 }),
        { time: 'dusk', ms: 2500 }, { show: 'possum' }, walk('possum', [[180, 240]], { speed: 6 }),
        nar('Alone at dusk she finds she enjoys it. Bullbats swoop overhead, a possum waddles up within ten feet, and faint singing drifts over from the herd.', 'lorena'),
      ] },
      { steps: [
        { time: 'night', ms: 1500, wait: false }, { spawn: 'jake2', who: 'jake', at: [420, 120], mount: 'jakebay' }, go('jake2', [[250, 214]], { speed: 44 }), { dust: [220, 226], n: 10 },
        nar('Late at night Jake gallops back, drunk, hoping to catch her with another man. There is no one.', 'jake'),
        nar('Under the stars he talks about hangings, and says he may leave her in Austin. And he tells her that Call once kept a woman: Maggie, Newt’s mother.', 'jake'),
      ] },
    ],
  });

  /* ---------- 41 ---------- */
  CH.push({
    n: 41, title: 'Bolivar goes home', part: 2,
    scene: range({ time: 'hot', place: 'A creek near San Antonio', when: 'Afternoon', cam: [220, 250], actors: {
      team: { kind: 'team', at: [60, 260], cfg: { m1: E.horses.greasy, m2: E.horses.kickboy } }, jim: { at: [200, 200], mount: 'hc4' },
      gus: { at: [120, 200], mount: 'malaria' }, pea: { at: [160, 220], mount: 'sardine' }, newt: { at: [100, 230], mount: 'mouse' },
      lippy: { at: [380, 350], hidden: true },
    } }),
    beats: [
      { steps: [
        { zoom: 1.5 }, go('team', [[240, 300]], { speed: 60 }), walk('jim', [[260, 290]], { speed: 60 }),
        nar('The wagon mules bolt with Lippy frozen on the seat. Jim Rainey tries to head them off and only turns them toward the creek.', 'jim'),
        go('team', [[330, 350]], { speed: 60 }),
        { remove: 'team' }, { prop: ['wreck', 336, 364] }, { show: 'lippy' }, { set: 'lippy', v: { x: 350, y: 372 } }, { fall: 'lippy', blood: false }, { dust: [336, 360], n: 20 },
        nar('The wagon goes off a three-foot bank and flips, all four wheels spinning, with Lippy pinned underneath by his coat.', 'lippy'),
      ] },
      { steps: [
        par(go('gus', [[310, 340]], { speed: 40 }), go('pea', [[360, 350]], { speed: 40 }), go('newt', [[340, 344]], { speed: 40 })),
        nar('Gus ropes a wheel from Old Malaria to tip the wagon. Newt and the Raineys hold Lippy’s head out of the water. Pea cuts the coat free with his bowie knife.', 'pea'),
        { rise: 'lippy' }, emote('lippy', '...'),
        nar('Lippy rolls over, belching water. He’ll live.', 'lippy'),
      ] },
      { steps: [
        { spawn: 'bol', at: [440, 220], pose: 'side', dir: -1 }, { spawn: 'sow', kind: 'pig', at: [456, 226], cfg: { coat: '#8e98ac' } }, { spawn: 'shoat', kind: 'pig', at: [466, 232], cfg: { coat: '#9aa6b8' } },
        go('bol', [[340, 240]]), walk('sow', [[350, 250]]), walk('shoat', [[360, 256]]), cam(320, 290, 1200),
        nar('The old wagon bed has burst and the supplies are floating. Bol walks up with the pigs at his heels and quits.', 'bol'),
        nar('He doesn’t tell anyone why: he fired his ten-gauge in his sleep, dreaming, and that is what spooked the mules.', 'bol'),
        { spawn: 'bolh', kind: 'horse', who: 'boldgelding', at: [370, 230] }, { set: 'bol', v: { mount: 'boldgelding' } }, { remove: 'bolh' },
        go('bol', [[460, 420]], { speed: 18 }),
        nar('Call gives him a gentle gelding. Bol rides south bareback on a serape, already half regretting it, and planning to beat the old dinner bell in Lonesome Dove. Newt grieves another loss.', 'newt'),
      ] },
    ],
  });

  /* ---------- 42 ---------- */
  const buckhorn = { ...saloon, zoom: 1.3, place: 'The Buckhorn saloon, San Antonio', when: 'Dusk', time: 'lamplit',
    actors: { barman: { at: [176, 66], pose: 'front' }, nedtym: { at: [186, 150], pose: 'front' }, gus: { at: [150, 90], pose: 'front' }, call: { at: [130, 92], pose: 'front' }, tobe: { at: [230, 230], hidden: true } } };
  CH.push({
    n: 42, title: 'The Buckhorn', part: 2,
    scene: sanAntonio({ when: 'Sunset', actors: {
      call: { at: [0, 262], mount: 'hellbitch' }, gus: { at: [-20, 268], mount: 'malaria' },
      ...Object.fromEntries(Array.from({ length: 5 }, (_, i) => ['goat' + i, { kind: 'goat', at: [300 + i * 12, 290 + (i % 2) * 6], cfg: { coat: i % 2 ? '#e0dcd0' : '#8a6a4a' }, wander: [310, 290, 20] }])),
    } }),
    beats: [
      { steps: [
        nar('With no cook, Gus predicts doom. Call sinks into one of his dark moods and rides to San Antonio for a wagon and a cook. Gus tags along.', 'call'),
        par(go('call', [[220, 262]], { speed: 24 }), go('gus', [[200, 268]], { speed: 24 })),
        nar('They ride past the old mission at sunset while a Mexican boy drives in a herd of goats. They buy a wagon and two mules from a German livery man.', 'gus'),
      ] },
      { scene: buckhorn, steps: [
        say('barman', 'We don’t serve your kind in here.'),
        emote('barman', '!'), { fall: 'barman', blood: true }, { rise: 'barman' },
        nar('The slick-haired young bartender is insolent. Gus grabs him and smashes his face into the bar.', 'gus'),
        { shoot: 'gus', at: [150, 60], n: 1 }, { dust: [150, 60], n: 6 },
        nar('Someone tosses a glass in the air. Gus draws his big Colt and shoots it to pieces. The card players scatter.', 'gus'),
      ] },
      { steps: [
        say('nedtym', 'Captain McCrae! Captain Call!'),
        nar('Old gambler Ned Tym recognises them. There is a photograph on the wall: Call, Gus and Jake years ago, Jake grinning with his pearl-handled pistol.', 'nedtym'),
        { show: 'tobe' }, go('tobe', [[150, 120]]),
        nar('The owner sends for the sheriff to arrest them. The sheriff turns out to be Tobe Walker, who rode in their Ranger troop. They drink together instead.', 'tobe'),
      ] },
      { scene: sanAntonio({ time: 'night', lit: true, weather: { moon: 'quarter' }, when: 'Night', actors: { team: { kind: 'team', at: [460, 262], cfg: { m1: E.horses.greasy, m2: E.horses.kickboy } } } }),
        steps: [
          go('team', [[200, 262], [0, 262]], { speed: 20 }),
          nar('Gus drives the new wagon out of town past the moonlit, neglected Alamo, stray goats nosing along its walls.', 'gus'),
          nar('He says they will be forgotten, just like the Indians they fought.', 'gus'),
        ] },
    ],
  });

  /* ---------- 43 ---------- */
  CH.push({
    n: 43, title: 'Janey', part: 2,
    scene: redRiver({ time: 'hot', when: 'Afternoon', cam: [230, 150], actors: {
      roscoe: { at: [200, 100], pose: 'front' }, memphis: { kind: 'horse', who: 'memphis', at: [230, 96] },
      s1: { who: 'soldier', at: [160, 100], mount: 'hc1' }, s2: { who: 'soldier', at: [260, 96], mount: 'hc3' },
    } }),
    beats: [
      { steps: [
        nar('Lost among settlers who can’t direct him, Roscoe joins four drunk soldiers bound for Texas. He is violently sick in their springless wagon.', 'roscoe'),
        { fall: 'roscoe', blood: false }, { rise: 'roscoe' }, { set: 'roscoe', v: { mount: 'memphis' } }, { remove: 'memphis' },
        nar('At the Red River he is too weak to mount. The soldiers toss him onto Memphis like a sack of potatoes and point him south-west.', 'roscoe'),
        go('roscoe', [[240, 230], [260, 420]], { speed: 18 }),
      ] },
      { scene: cabinClearing({ time: 'dusk', place: 'A cabin in the North Texas woods', when: 'Dusk', lit: false, seed: 97, actors: {
          sam: { at: [210, 190], pose: 'front' }, janey: { at: [180, 176], pose: 'front', hidden: true }, roscoe: { at: [60, 300], mount: 'memphis' },
        } }),
        steps: [
          go('roscoe', [[150, 210]]),
          nar('At dusk he stops at a cabin. A hard old man called Sam is skinning a possum on a stump. A thin barefoot girl appears in the dark doorway.', 'sam'),
          { show: 'janey' },
          say('sam', 'She’s mine. Paid twenty-eight skunk hides for her.'),
          { time: 'night', ms: 2000 },
          nar('Sam drinks Roscoe’s whiskey and gives him no supper. In the night Roscoe hears the old man beating the girl, and worse. He does nothing.', 'roscoe'),
        ] },
      { scene: woods({ creek: true, time: 'noon', when: 'Next day', place: 'North Texas', cam: [220, 220], actors: {
          roscoe: { at: [120, 260], mount: 'memphis' }, janey: { at: [40, 290], pose: 'front', hidden: true },
        } }),
        steps: [
          emote('roscoe', '!'), go('roscoe', [[220, 234]], { speed: 50 }),
          nar('Next morning a wasp nest drops into his lap. When he gets clear and strips off his shirt, he spots the girl ducking behind a bush. She has followed him on foot.', 'roscoe'),
          { show: 'janey' }, go('janey', [[200, 240]], { speed: 30 }),
          nar('Janey packs his stings with mud, knocks over a rabbit and a bullfrog with a stick, and cooks them. She says she crippled Sam’s knees with a pan before she left.', 'janey'),
          nar('Roscoe lets her ride double behind him, to guide him toward San Antonio.', 'roscoe'),
        ] },
    ],
  });

  /* ---------- 44 ---------- */
  CH.push({
    n: 44, title: 'Clara’s orchard', part: 2,
    scene: camp({ time: 'dawn', when: 'North of San Antonio', seed: 73, cam: [170, 200], actors: {
      gus: { at: [170, 200], pose: 'front' }, dish: { at: [200, 214], pose: 'front' }, call: { at: [230, 206], pose: 'front' }, jasper: { at: [140, 216], pose: 'front' },
    } }),
    beats: [
      { steps: [
        nar('North of San Antonio the brush thins into good grass. With no cook, Gus makes scrambled eggs every morning, and the crew complains.', 'gus'),
        say('call', 'That coffee would float a stove lid.'),
        nar('Call rides out alone most nights on the Hell Bitch. Nobody knows why.', 'call'),
      ] },
      { scene: hillPool({ creek: true, place: 'Clara’s orchard', when: 'Morning', actors: { gus: { at: [80, 80], mount: 'malaria' }, call: { at: [40, 60], mount: 'hellbitch' } } }),
        steps: [
          { map: { fit: pts(PP.sa, PP.austin, PP.dove), places: [PP.dove, PP.sa, PP.austin, PP.herd44], title: 'West of Austin', when: 'The herd moves north',
            trails: [{ id: 'dr', pts: [[PP.dove.lon, PP.dove.lat], [-99.3, 28.25], [PP.sa.lon, PP.sa.lat], [PP.herd44.lon, PP.herd44.lat]], col: '#c8402a', icon: 'herd' }] } },
          { trail: { id: 'dr', to: 3, speed: 1.2 } },
          { scene: true },
          go('gus', [[160, 160]], { speed: 14 }),
          nar('Riding toward Austin to hire a cook, Gus turns aside to a spring-fed pool under live oaks on a hillside.', 'gus'),
          emote('gus', '...'),
          nar('This is where he once picnicked with Clara, and where she turned down his proposal. He sits his horse and weeps, then wipes his face with his bandana.', 'gus'),
        ] },
      { scene: hillPool({ bluff: true, place: 'Under a limestone bluff', when: 'Midday', seed: 142, actors: {
          lorena: { at: [180, 250], pose: 'front' }, gus: { at: [0, 300], mount: 'malaria' }, call: { at: [-20, 310], mount: 'hellbitch' }, mare: { kind: 'horse', who: 'loremare', at: [300, 300] },
        } }),
        steps: [
          par(go('gus', [[200, 280]]), go('call', [[170, 290]])),
          nar('They find Lorena alone at a camp under a limestone bluff, squeezing water out of her long hair. There is a bruise under one eye. Jake has been gone to town two days.', 'lorena'),
          { set: 'gus', v: { mount: null, pose: 'front', x: 214, y: 280 } }, { spawn: 'malaria', kind: 'horse', who: 'malaria', at: [240, 300] },
          nar('Gus unsaddles and stays with her, to Call’s annoyance, and needles Call about Maggie and Newt before he goes.', 'gus'),
          go('call', [[420, 330]], { speed: 34 }),
        ] },
      { scene: camp({ time: 'hot', place: 'Toward Austin', when: 'Afternoon', seed: 74, cam: [220, 250], props: [], actors: { call: { at: [60, 250], mount: 'hellbitch' } } }),
        steps: [
          go('call', [[200, 250]], { speed: 40 }),
          { spawn: 'hb', kind: 'horse', who: 'hellbitch', at: [212, 250] }, { set: 'call', v: { mount: null } }, { fall: 'call', blood: false }, { dust: [206, 250], n: 16 },
          nar('Mid-lope, the grey mare explodes into a flying buck and throws him. Call hangs on to one rein the whole time, talking to her.', 'call'),
          { rise: 'call' }, { remove: 'hb' }, { set: 'call', v: { mount: 'hellbitch' } },
          say('call', 'I’ll ride you across the Yellowstone yet.'),
        ] },
    ],
  });

  /* ---------- 45 ---------- */
  CH.push({
    n: 45, title: 'Blue Duck', part: 2,
    scene: hillPool({ bluff: true, place: 'The pool under the bluff', when: 'A still, sunny morning', seed: 142, actors: {
      lorena: { at: [180, 250], pose: 'front' }, gus: { at: [206, 254], pose: 'front' }, malaria: { kind: 'horse', who: 'malaria', at: [260, 300] }, mare: { kind: 'horse', who: 'loremare', at: [300, 300] },
      gusj: { who: 'gusjohns', at: [210, 200], hidden: true },
      blueduck: { at: [460, 120], mount: 'bdbay', hidden: true },
    } }),
    beats: [
      { steps: [
        nar('Two days alone, Lorena had thought of drowning herself in the pool. Instead she only washed her hair.', 'lorena'),
        nar('Gus talks to her about hope, strokes her cheek, and holds her hand while the horses swish their tails.', 'gus'),
      ] },
      { steps: [
        { hide: 'gus' }, { show: 'gusj' },
        nar('Then Gus strips to his old flannel underwear, once pink and now nearly white, and swims the cold pool.', 'gus'),
        go('gusj', [[262, 190]]), face('gusj', 1),
        nar('Drying on a rock, he squints west. Far off a rider on a pacing horse is catching the light.', 'gus'),
        say('gusj', 'Hand me my gun belt, Lorie.'),
      ] },
      { steps: [
        { zoom: 1.3 }, { show: 'blueduck' }, go('blueduck', [[260, 240]], { speed: 18 }), { set: 'blueduck', v: { mount: null, pose: 'front', x: 240, y: 236 } }, { spawn: 'bdh', kind: 'horse', who: 'bdbay', at: [230, 222] },
        nar('A big man rides in on a bay stallion with a silver-trimmed Mexican saddle: long tangled black hair, a bandana, a knife on his leg, a rifle across the pommel.', 'blueduck'),
        say('blueduck', 'Blue Duck. I was told to kill you both.'),
        nar('He waters his horse and trades threats with Gus, who sits there in his underwear and hat with his gun belt close. Then Blue Duck rides away.', 'gus'),
        { remove: 'bdh' }, { set: 'blueduck', v: { mount: 'bdbay' } }, go('blueduck', [[460, 100]], { speed: 20 }), { hide: 'blueduck' },
      ] },
      { steps: [
        { hide: 'gusj' }, { show: 'gus' },
        say('gus', 'That’s a Comanchero. A killer.'),
        nar('Gus explains Blue Duck is a raider who trades with the Comanches. Lorena still refuses to go to the cow camp. She’ll wait for Jake.', 'lorena'),
        say('lorena', 'Take me to California, Gus.'),
        nar('He says he is bound for Ogallala and Clara. He offers her a train ticket from Denver, and leaves. She sits on the rock, silent and angry.', 'lorena'),
        { set: 'gus', v: { mount: 'malaria' } }, { remove: 'malaria' }, go('gus', [[0, 320]], { speed: 24 }),
      ] },
    ],
  });

  /* ---------- 46 ---------- */
  CH.push({
    n: 46, title: 'Call on the bluff', part: 2,
    scene: camp({ time: 'dusk', when: 'Dusk', seed: 75, cam: [180, 220], actors: {
      gus: { at: [140, 204], pose: 'front' }, call: { at: [220, 206], pose: 'front' }, dish: { at: [196, 216], pose: 'front' }, newt: { at: [60, 260], mount: 'mouse' }, deets: { at: [260, 220], mount: 'wishbone' },
      ...cows('c', 18, 60, 290, 330, 70, 46),
    } }),
    beats: [
      { steps: [
        go('newt', [[170, 230]]),
        say('gus', 'Newt, go sit with Lorie till Jake gets back.'),
        emote('dish', '...'),
        nar('Newt rides in white with drag dust and is sent straight off again, which annoys Dish. Call reports a Mexican cook is coming tomorrow, and that Jake is gambling in Austin.', 'call'),
        walk('newt', [[440, 180]], { speed: 24 }),
      ] },
      { steps: [
        say('call', 'Why didn’t you kill him, or bring her in?'),
        nar('Gus tells Call about Blue Duck. Call has never laid eyes on the man.', 'gus'),
        say('deets', 'Trailed him ten miles. Lost him in a creek.'),
        nar('Deets warns them to watch the horses under the full moon that is coming.', 'deets'),
      ] },
      { scene: camp({ time: 'night', weather: { moon: 'full' }, when: 'Full moon', seed: 76, place: 'A bluff above the herd', cam: [220, 120], props: [['campfire', 160, 330]], actors: {
          call: { at: [220, 100], pose: 'front' }, hb: { kind: 'horse', who: 'hellbitch', at: [260, 110] },
          ...cows('c', 22, 60, 250, 330, 100, 47),
        } }),
        steps: [
          nar('Call beds down alone on a limestone bluff above the herd and cleans his rifle.', 'call'),
          nar('He remembers Maggie, small and anxious, at the top of the back stairs, asking him to say her name. He never would. She died, and he has never claimed the boy.', 'call'),
          emote('call', '...'),
          nar('Calmer, he ties the Hell Bitch’s grazing rope round his waist before he sleeps, in case Blue Duck comes.', 'call'),
        ] },
    ],
  });

  /* ---------- 47 ---------- */
  CH.push({
    n: 47, title: 'Newt on guard', part: 2,
    scene: hillPool({ bluff: true, time: 'dusk', place: 'Lorena’s camp', when: 'Dusk', seed: 142, props: [['rock', 380, 400]], actors: {
      lorena: { at: [180, 250], pose: 'front' }, mare: { kind: 'horse', who: 'loremare', at: [300, 300] }, newt: { at: [0, 330], mount: 'mouse' },
    } }),
    beats: [
      { steps: [
        go('newt', [[170, 290]]),
        say('newt', 'I’m… Newt, ma’am.'),
        say('lorena', 'Go on back. I don’t need guarding.'),
        nar('Lorena wants to be left alone. Newt pretends to leave, ties Mouse to a boulder half a mile off and creeps back on foot.', 'newt'),
        go('newt', [[380, 390]]), { spawn: 'mousetied', kind: 'horse', who: 'mouse', at: [396, 396] }, { set: 'newt', v: { mount: null } },
        go('newt', [[300, 170]]), face('newt', 'front'),
      ] },
      { steps: [
        { time: 'night', ms: 2000 }, { weather: { moon: 'full' } },
        nar('He sits against a live oak with his pistol drawn, dreaming of being a top hand, and falls asleep.', 'newt'),
        emote('newt', 'z', { ms: 2000 }),
      ] },
      { steps: [
        ...Array.from({ length: 12 }, (_, i) => ({ spawn: 'st' + i, kind: 'cow', at: [-40 - (i % 4) * 20, 320 + Math.floor(i / 4) * 20], cfg: { coat: COATS[i % 10] }, cfgKey: 'stc' + (i % 10) })),
        emote('newt', '!'), { move: 'st', by: [480, -60], speed: 90, jitter: 40 }, { dust: [200, 330], n: 30, r: 160 },
        nar('Drumming hooves wake him. Fifty or sixty stampeding cattle pour past toward the bluffs, out of nowhere, on a still night.', 'newt'),
        go('newt', [[380, 390]], { speed: 40 }), { remove: 'mousetied' },
        emote('newt', '...'),
        nar('He runs to the boulder. Mouse is gone. Newt cries, sure he is disgraced.', 'newt'),
      ] },
      { scene: camp({ time: 'dawn', when: 'First light', seed: 77, cam: [220, 200], props: [], actors: {
          newt: { at: [200, 200], pose: 'front' }, pea: { at: [440, 140], mount: 'sardine' },
          pocampo: { at: [40, 260] }, maria: { kind: 'horse', who: 'maria', at: [-20, 270] },
        } }),
        steps: [
          go('pea', [[230, 196]], { speed: 34 }),
          say('pea', 'Thrown, was you?'),
          nar('At first light Pea Eye finds him on foot. Pea assumes he was thrown, and Newt lets that story stand.', 'pea'),
          par(go('pocampo', [[160, 230]], { speed: 10 }), go('maria', [[100, 240]], { speed: 6 })),
          nar('They meet the new cook walking in: a short, stout old man with white hair and a holed sombrero, rifle over his shoulder, his packed donkey trailing fifty yards behind.', 'pocampo'),
          say('pocampo', 'Po Campo. Have you tried grasshoppers fried in molasses?'),
        ] },
    ],
  });

  /* ---------- 48 ---------- */
  CH.push({
    n: 48, title: 'Po Campo', part: 2,
    scene: camp({ time: 'noon', when: 'Morning', seed: 78, props: [['branding', 176, 196]], cam: [170, 200], actors: {
      call: { at: [230, 206], pose: 'front' }, gus: { at: [120, 204], pose: 'front' }, pocampo: { at: [176, 186], pose: 'front' }, ...window.STORYKIT.pigs([200, 186], [210, 192]),
      deets: { at: [150, 222], pose: 'front' }, dish: { at: [200, 226], pose: 'front' }, jasper: { at: [226, 224], pose: 'front' },
    } }),
    beats: [
      { steps: [
        nar('Call and Gus puzzle over a stampede on a still night, and over Deets losing Blue Duck’s track.', 'call'),
        nar('Po Campo lays two branding irons across the firewood for a grill and scrambles sixty plover eggs. The crew is won over. The pigs eat the shells.', 'pocampo'),
        nar('He mentions, quite calmly, that he probably killed his wife.', 'pocampo'),
      ] },
      { steps: [
        { time: 'night', ms: 2000 },
        nar('That night he fries grasshoppers he has gathered walking beside the herd all day.', 'pocampo'),
        emote('deets', '!'),
        nar('Deets tries one first, dipped in molasses, crunches it and grins. Nearly the whole crew follows.', 'deets'),
      ] },
      { steps: [
        { spawn: 'jake', at: [440, 160], mount: 'jakebay' }, go('jake', [[250, 200]], { speed: 44 }), { dust: [250, 200], n: 10 },
        say('jake', 'Where’s Lorie?'),
        nar('Jake gallops in half drunk, looking for Lorena. She is not at her camp. Gus realises at once: Blue Duck has taken her.', 'gus'),
        { spawn: 'jerry', kind: 'horse', who: 'jerry', at: [80, 200] }, { set: 'gus', v: { mount: 'jerry', x: 90, y: 204 } }, { remove: 'jerry' },
        nar('Gus saddles Jerry, his fast, hot-tempered big sorrel, and rides off alone. He won’t take Dish or Jake with him.', 'gus'),
        go('gus', [[0, 120]], { speed: 44 }),
      ] },
      { steps: [
        { spawn: 'newt', at: [160, 230], pose: 'front' },
        say('jake', 'You let her get took, boy!'),
        say('call', 'Sit down or leave, Jake.'),
        go('jake', [[440, 120]], { speed: 20 }),
        nar('Jake rides off on his tired horse. Out on night guard, Newt cries until his saddle is wet. All the next day, Deets worries that Gus has not come back.', 'newt'),
      ] },
    ],
  });

  /* ---------- 49 ---------- */
  CH.push({
    n: 49, title: 'Taken', part: 2,
    scene: hillPool({ bluff: true, time: 'night', weather: { moon: 'full' }, place: 'Lorena’s camp', when: 'The night of the stampede', seed: 142, actors: {
      lorena: { at: [180, 250], pose: 'front' }, mare: { kind: 'horse', who: 'loremare', at: [300, 300] }, blueduck: { at: [60, 180], hidden: true },
      bdh: { kind: 'horse', who: 'bdsorrel', at: [40, 200], hidden: true },
    } }),
    beats: [
      { steps: [
        { show: 'blueduck' }, go('blueduck', [[160, 240]], { speed: 12 }), emote('lorena', '!'),
        nar('This is the same night. Blue Duck is suddenly standing over her in the dark, a rifle looking like a toy in his hand.', 'blueduck'),
        nar('He ties her ankles to her stirrups with rawhide and leads her straight through the Hat Creek herd, stampeding it to hide their tracks. That was the stampede Newt heard.', 'lorena'),
      ] },
      { scene: brush({ time: 'hot', weather: {}, when: 'Days of riding', place: 'Rocky hills north-west of Austin', seed: 58, actors: { blueduck: { at: [60, 300], mount: 'bdsorrel' }, lorena: { at: [30, 310], mount: 'loremare' } } }),
        steps: [
          par(go('blueduck', [[300, 120]], { speed: 20 }), go('lorena', [[270, 132]], { speed: 20 })),
          nar('They ride almost without stopping for days, north-west through empty rocky hills. She is desperate with thirst.', 'lorena'),
          nar('At a stream he lets her drink, then hauls her up by the hair and pushes her head under, and tells her he will gut her if she runs.', 'blueduck'),
          nar('Her mare gives out, then the pack horse. She rides double behind him, and sees he wears a necklace of human finger bones.', 'lorena'),
        ] },
      { scene: redRiver({ north: true, time: 'hot', when: 'Late afternoon', place: 'A river of red sand', actors: {
          blueduck: { at: [220, 400], mount: 'bdsorrel' }, lorena: { at: [200, 410], mount: 'kiowapony2' },
          ermoke: { at: [180, 90], mount: 'kiowapony' }, k1: { who: 'kiowa', at: [210, 84], mount: 'kiowapony2' }, k2: { who: 'kiowa', at: [240, 90], mount: 'kiowapony' }, k3: { who: 'kiowa', at: [150, 96], mount: 'kiowapony2' },
        } }),
        steps: [
          { map: { fit: pts(PP.austin, PP.lredx, PP.herd44), places: [PP.austin, PP.herd44, PP.lredx], title: 'Taken north', when: 'Across the Red River',
            trails: [{ id: 'bd', pts: [[PP.herd44.lon, PP.herd44.lat], [-98.8, 31.8], [-99.2, 33.2], [PP.lredx.lon, PP.lredx.lat]], col: '#8a3a2a', icon: 'rider' }] } },
          { trail: { id: 'bd', to: 3, speed: 1.2 } },
          { scene: true },
          par(go('blueduck', [[230, 250], [220, 150]], { speed: 14 }), go('lorena', [[210, 256], [200, 156]], { speed: 14 })),
          nar('He picks a careful path across a broad riverbed of red sand, spurring his horse free of the bog twice.', 'blueduck'),
          nar('On the far bank four riders are waiting: Ermoke, with a wisp of mustache at each corner of his mouth and a lance hung with scalps, and three more. One carries a bugle.', 'ermoke'),
        ] },
      { steps: [
        { time: 'dusk', ms: 2000 },
        nar('At dusk Blue Duck hands her over to the four men.', 'lorena'),
        { iris: 0, ms: 900 },
        nar('What they do to her is not shown here. When Ermoke will not stop, Blue Duck kicks him off her.'),
        { iris: 1, ms: 900 },
      ] },
    ],
  });
  Object.assign(window.STORYKIT, { fortSmith, cabinClearing, woods, nueces, plainsRiver, redRiver, sanAntonio, hillPool, louisaFarm, PP });
})();
