/* Part II continued, chapters 50–74. Built from a chapter-by-chapter reading of the novel; all wording paraphrased. */
(function () {
  const E = window.ENGINE, T = window.ART.T, K = window.STORYKIT, CH = window.STORY.chapters;
  const { nar, say, walk, go, face, emote, cam, wait, par, P, saloon, lorenaRoom, camp, brush, cows, horses, pts, COATS, pigs,
    fortSmith, cabinClearing, woods, nueces, plainsRiver, redRiver, hillPool, PP } = K;

  Object.assign(E.cast, {
    clerk: { name: 'Clerk', c: { skin: '#f0c8a8', hair: '#d8d4cc', brim: 'none', shirt: '#e8e4d8', vest: '#4a4440', pants: '#3a3a40', beard: 'mustache', beardCol: '#e0dcd4' } },
    hutto: { name: 'Hutto', c: { skin: '#d8a078', hair: '#3a2a1e', hat: '#4a3a2a', coat: '#b89a6a', shirt: '#b89a6a', pants: '#4a3a2a', beard: 'full', beardCol: '#3a2a1e', gun: '#8a8a90' } },
    jimout: { name: 'Jim', c: { skin: '#d8a078', hair: '#2a1e14', hat: '#5a4a38', shirt: '#6a5a44', pants: '#3a3028', beard: 'full', beardCol: '#2a1e14', gun: '#8a8a90' } },
    luke: { name: 'Luke', c: { skin: '#e0b088', hair: '#c8502a', brim: 'none', shirt: '#6a5a44', pants: '#4a3a2a', beard: 'stubble' } },
    ausfrank: { name: 'Aus Frank', c: { skin: '#caa07a', hair: '#e0dcd0', hat: '#6a5a44', shirt: '#8a7a60', pants: '#4a4034', beard: 'full', beardCol: '#8a6a3a' } },
    monkeyjohn: { name: 'Monkey John', c: { skin: '#d8a882', hair: '#d8d4c8', brim: 'none', shirt: '#6a5a44', pants: '#4a3a2a', beard: 'full', beardCol: '#c8c0b0' } },
    dogface: { name: 'Dog Face', c: { skin: '#d8a882', hair: '#3a2a1e', hat: '#5a4a38', shirt: '#7a6a50', pants: '#4a3a2a', gun: '#8a8a90' } },
    hunter: { name: 'Buffalo hunter', c: { skin: '#d8a078', hair: '#4a3a2a', hat: '#4a3a2a', coat: '#6a4a2e', shirt: '#6a4a2e', pants: '#4a3a2a', beard: 'full', beardCol: '#4a3a2a' } },
    sally: { name: 'Sally Skull', c: { skin: '#f0d0b8', hair: '#141010', brim: 'none', shirt: '#6a8a5a', dress: '#4a6a3a' } },
    dan: { name: 'Dan Suggs', c: { skin: '#d8a882', hair: '#4a3a2a', hat: '#3a3028', shirt: '#6a5a44', vest: '#2a2420', pants: '#3a3028', beard: 'full', beardCol: '#4a3a2a', gun: '#8a8a90' } },
    roy: { name: 'Roy Suggs', c: { skin: '#d8a882', hair: '#4a3a2a', hat: '#5a4a38', shirt: '#7a6a50', pants: '#3a3028', beard: 'full', beardCol: '#4a3a2a' } },
    eddie: { name: 'Eddie Suggs', c: { skin: '#e0b088', hair: '#6a4a2a', hat: '#6a5a44', shirt: '#8a7a60', pants: '#4a4034', beard: 'stubble' } },
    froglip: { name: 'Frog Lip', c: { skin: '#5a3a26', hair: '#141010', hat: '#2a2a2a', shirt: '#8a2a2a', pants: '#3a3028', gun: '#8a8a90' } },
    lou: { name: 'Lou', c: { skin: '#f0c8a8', hair: '#141010', brim: 'none', long: true, shirt: '#b8a888', dress: '#a09070', boots: '#f0c8a8' } },
    nester: { name: 'Old nester', c: { skin: '#e0b090', hair: '#c8a870', hat: '#8a7a5a', shirt: '#9a9a90', pants: '#4a4034', beard: 'full', beardCol: '#c8a870' } },
    german: { name: 'Farmer', c: { skin: '#e8b890', hair: '#1e1612', brim: 'none', shirt: '#b8a888', pants: '#4a4034', beard: 'full', beardCol: '#1e1612' } },
    jennie: { name: 'Jennie', c: { skin: '#f0d0b8', hair: '#1e1612', brim: 'none', long: true, shirt: '#b86a7a', dress: '#8a4a5a' } },
    johns: { name: 'Johns', c: { skin: '#e0a880', hair: '#e8e4dc', hat: '#6a5a44', shirt: '#8a8a70', pants: '#4a4034', beard: 'mustache', beardCol: '#f0ece4' } },
    wichita: { name: 'Bacon Rind', c: { skin: '#a8704a', hair: '#6a6660', brim: 'none', long: true, shirt: '#8a7a5a', pants: '#6a5a3a' } },
  });
  Object.assign(E.horses, {
    pete: { coat: '#8a5a34', mane: '#2a1a10', blaze: true },
    paint: { coat: '#e8e0d0', mane: '#3a2a1e', spots: 11 },
    soap: { coat: '#b8a888', mane: '#6a5a44' },
    wilbay: { coat: '#7a4424', mane: '#1e140e' },
    frogwhite: { coat: '#ece8e0', mane: '#c8c4bc' },
    littlebay: { coat: '#8a5030', mane: '#3a2012' },
    lukemule: { coat: '#7a6a5a', mane: '#3e342a', mule: true },
  });

  const L = {
    ...PP,
    fw: { name: 'Fort Worth', lon: -97.33, lat: 32.75, col: '#3a6aa0' },
    dallas: { name: 'Dallas', lon: -96.8, lat: 32.78, col: '#3a6aa0' },
    canadian: { name: 'Canadian River', lon: -101.2, lat: 35.7, col: '#8a3a2a' },
    adobe: { name: 'Adobe Walls', lon: -101.46, lat: 35.89, col: '#8a6a3a' },
    palo: { name: 'Palo Duro', lon: -101.6, lat: 34.95, col: '#8a6a3a' },
    doans: { name: 'Doan’s Store', lon: -99.35, lat: 34.37, col: '#3a6aa0' },
    dodge: { name: 'Dodge City', lon: -100.02, lat: 37.75, col: '#3a6aa0' },
    ogallala: { name: 'Ogallala', lon: -101.72, lat: 41.13, col: '#3a6aa0' },
    hc62: { name: 'The herd', lon: -99.1, lat: 35.8, col: '#c8402a' },
    hc72: { name: 'The herd', lon: -100.3, lat: 37.9, col: '#c8402a' },
  };

  /* ---------- scenes ---------- */
  const town = (o = {}) => ({
    w: 460, h: 420, seed: o.seed || 161, time: o.time || 'noon', weather: o.weather || {}, place: o.place || 'Fort Worth', when: o.when || '', cam: o.cam || [230, 220],
    ground: (g) => { g.fill(T.DIRT); g.patches(T.DRY, T.DIRT, 12, 8, 20); g.rect(0, 212, 460, 30, T.ROAD); g.line([[230, 0], [230, 212]], 20, T.ROAD); if (o.pens) { g.rect(40, 300, 220, 90, T.MUD); } },
    props: [
      ['store', 90, 206, { c: '#c8b490', seed: 21, lit: o.lit }], ['store', 160, 206, { c: '#b8a888', seed: 22, lit: o.lit, w: 52 }], ['store', 300, 206, { c: '#d4c4a0', seed: 23, lit: o.lit }], ['store', 370, 206, { c: '#b89a78', seed: 24, lit: o.lit, w: 52 }],
      ['store', 430, 290, { c: '#c0ac8a', seed: 25, lit: o.lit }],
      ...(o.pens ? [['fenceH', 150, 300, { len: 216 }], ['fenceH', 150, 392, { len: 216 }], ['fenceV', 40, 392, { len: 88 }], ['boxcar', 330, 360], ['boxcar', 390, 360], ['boxcar', 450, 360]] : [['store', 110, 300, { c: '#c8b8a0', seed: 26, lit: o.lit }], ['wagon', 300, 290]]),
      ...(o.props || []),
    ],
    actors: o.actors || {},
  });
  const plains = (o = {}) => ({
    w: 460, h: 440, seed: o.seed || 171, time: o.time || 'noon', weather: o.weather || {}, place: o.place || 'The plains', when: o.when || '', cam: o.cam || [230, 220],
    ground: (g) => {
      g.fill(o.brown ? T.DRY : T.GRASS); g.patches(T.TALL, null, 14, 10, 30);
      if (o.river === 'canadian') { g.line([[0, 330], [230, 322], [460, 336]], 90, T.RED, 5); g.line([[0, 334], [230, 326], [460, 340]], 30, T.BROWNWATER, 3); }
      if (o.river === 'arkansas') { g.line([[0, 330], [230, 322], [460, 336]], 64, T.MUD, 4); g.line([[0, 334], [230, 326], [460, 340]], 44, T.BROWNWATER, 4); }
      if (o.river === 'creek') { g.line([[0, 300], [180, 310], [460, 290]], 26, T.MUD, 3); g.line([[0, 302], [180, 312], [460, 292]], 12, T.WATER, 2); }
      if (o.wallow) g.circle(230, 230, 20, T.DIRT, 5);
    },
    props: [...(o.bones ? [['bones', 120, 180, { w: 30, h: 20, seed: 1 }], ['bones', 340, 150, { w: 26, h: 16, seed: 2 }], ['skull', 200, 260], ['skull', 280, 200], ['skull', 90, 330]] : []), ...(o.props || [])],
    actors: o.actors || {},
  });
  const campN = (o = {}) => ({ ...plains(o), props: [['wagon', 150, 176], ['campfire', 186, 196], ['crate', 126, 182], ['bedroll', 210, 214, { c: '#6a5a8a' }], ...(o.props || [])], place: o.place || 'Hat Creek camp' });

  /* ---------- 50 ---------- */
  CH.push({
    n: 50, title: 'Letters', part: 2,
    scene: plains({ river: 'creek', place: 'North Texas', when: 'Clear weather', actors: {
      july: { at: [100, 150], mount: 'julybay' }, joe: { at: [80, 160], mount: 'red', who: 'joehat' },
      ...Object.fromEntries(Array.from({ length: 8 }, (_, i) => ['bf' + i, { kind: 'buffalo', at: [200 + (i % 4) * 22, 190 + Math.floor(i / 4) * 18] }])),
    } }),
    beats: [
      { steps: [
        nar('Across the Red River and into Texas, July labours over a short letter to Elmira. He can’t decide how to spell skeeters, and scratches it in the dirt for Joe’s opinion.', 'july'),
        { move: 'bf', by: [60, 150], speed: 30, jitter: 20 }, par(go('july', [[230, 240]], { speed: 40 }), go('joe', [[210, 250]], { speed: 40 })),
        nar('They chase a little bunch of eight buffalo for two miles, then sit and watch them wade a river.', 'joe'),
      ] },
      { scene: town({ time: 'dusk', when: 'Late afternoon', actors: { july: { at: [230, 236], pose: 'front' }, joe: { at: [250, 238], pose: 'front', who: 'joehat' }, clerk: { at: [160, 222], pose: 'front' } } }),
        steps: [
          nar('Fort Worth is all wide dusty streets, wagons and saloons. July mails his letter, and after a long search the old clerk finds one waiting for him, from Peach.', 'clerk'),
          emote('july', '!'),
          nar('Elmira has gone off on a whiskey boat. Roscoe is coming to find him.', 'july'),
          say('joe', 'Maybe she’s gone to find Dee. He’s my real pa.'),
          nar('Elmira had told July that Dee Boot died of smallpox in Dodge. Stunned, July gives up on Jake and rides east so fast Joe has to lope to keep up.', 'july'),
          go('july', [[460, 226]], { speed: 40 }),
        ] },
      { scene: plains({ time: 'night', weather: {}, when: 'Night', place: 'East of Fort Worth', props: [['campfire', 230, 230]], actors: { july: { at: [210, 236], pose: 'front' }, joe: { at: [256, 240], pose: 'front', who: 'joehat' } } }),
        steps: [
          emote('joe', 'z', { wait: false }),
          nar('Joe snores. July lies awake under the stars, imagining using them as stepping stones to find Ellie. He dreams she has come back, and wakes up crying.', 'july'),
        ] },
    ],
  });

  /* ---------- 51 ---------- */
  CH.push({
    n: 51, title: 'Wilbarger’s herd', part: 2,
    scene: campN({ time: 'dawn', place: 'Misty flats east of Fort Worth', when: 'Dawn', actors: {
      wilbarger: { at: [140, 210], pose: 'front' }, wilblack: { kind: 'horse', who: 'wilblack', at: [100, 216] },
      july: { at: [400, 120], mount: 'julybay' }, joe: { at: [420, 110], mount: 'red', who: 'joehat' },
      ...cows('wc', 22, 40, 290, 380, 110, 51),
    } }),
    beats: [
      { steps: [
        nar('At dawn July and Joe hear a huge trail herd moving north through the mist before they can see it.', 'july'),
        par(go('july', [[190, 206]]), go('joe', [[210, 214]])),
        nar('At the wagon the boss is sitting on a tarp reading Milton: Wilbarger.', 'wilbarger'),
        say('wilbarger', 'Jake Spoon? He’s coming north with the Rangers from Lonesome Dove.'),
      ] },
      { steps: [
        say('wilbarger', 'I could use a boy like you.'),
        nar('Wilbarger offers Joe a job. Joe says no, out of duty to July, and privately wishes he hadn’t.', 'joe'),
        nar('July rides a few miles with Wilbarger toward the Red River, then turns back east toward Arkansas to look for Roscoe.', 'july'),
        par(go('july', [[460, 150]], { speed: 24 }), go('joe', [[460, 160]], { speed: 24 })),
      ] },
    ],
  });

  /* ---------- 52 ---------- */
  CH.push({
    n: 52, title: 'Janey’s rocks', part: 2,
    scene: plains({ weather: { lightning: true }, time: 'storm', place: 'The Fort Smith road', when: 'Muggy afternoon', actors: {
      roscoe: { at: [120, 220], mount: 'memphis' }, janey: { at: [90, 240], pose: 'front' },
      jimout: { at: [460, 200], mount: 'hc6' }, hutto: { at: [460, 230], mount: 'hc7' }, july: { at: [0, 360], mount: 'julybay', hidden: true },
    } }),
    beats: [
      { steps: [
        nar('Janey guides Roscoe west on foot, catching rabbits, squirrels and a prairie chicken, hiding whenever strangers pass.', 'janey'),
        par(go('jimout', [[190, 210]], { speed: 24 }), go('hutto', [[200, 236]], { speed: 24 })),
        { hide: 'janey' },
        nar('Two outlaws ride up: Jim, small and mean, and Hutto, big as an ox with a shotgun. Janey slips away with Roscoe’s pistol.', 'hutto'),
      ] },
      { steps: [
        { weather: { rain: 'heavy' } }, { flash: true },
        nar('A thunderstorm breaks. The outlaws catch Janey, then strip Roscoe of everything he has, clothes and all, hunting for money.', 'roscoe'),
        { set: 'roscoe', v: { mount: null, x: 160, y: 230, pose: 'front' } }, { spawn: 'memphis', kind: 'horse', who: 'memphis', at: [130, 220] },
        { weather: { rain: null } }, { time: 'dusk', ms: 1500 },
        { show: 'janey' }, { set: 'janey', v: { x: 300, y: 300 } },
        { dust: [200, 230], n: 6 }, emote('hutto', '!'), { dust: [190, 210], n: 6 }, { fall: 'jimout', blood: false },
        nar('Janey wriggles free and pelts them with rocks from the dark, splitting Hutto’s lip and knocking Jim flat.', 'janey'),
        { show: 'july' }, go('july', [[200, 280]], { speed: 34 }),
        say('july', 'Hands up. You’re under arrest.'),
        nar('Drawn by the shooting, July Johnson walks up behind them with his pistol cocked.', 'july'),
      ] },
      { scene: town({ time: 'dawn', when: 'Next morning', actors: { july: { at: [230, 236], pose: 'front' }, roscoe: { at: [250, 238], pose: 'front' }, janey: { at: [210, 240], pose: 'front' } } }),
        steps: [
          nar('They ride all night to Fort Worth to hand in the prisoners. Roscoe tells July only that Elmira left. July pays a livery woman to board Janey.', 'roscoe'),
          nar('Janey follows them anyway. At their camp twenty miles north of town she turns up at dawn, and hands July back his money.', 'janey'),
        ] },
    ],
  });

  /* ---------- 53 ---------- */
  CH.push({
    n: 53, title: 'Bent’s Fort', part: 2,
    scene: town({ seed: 163, place: 'Bent’s Fort', when: 'Hot', props: [['bones', 60, 150, { w: 30, h: 16 }]], actors: {
      elmira: { at: [160, 236], pose: 'front' }, zwey: { at: [300, 250], pose: 'front' }, fowler: { at: [200, 240], pose: 'front' },
    } }),
    beats: [
      { steps: [
        { map: { fit: pts(L.fs, L.bents, L.ogallala), places: [L.fs, L.bents, L.ogallala], title: 'Elmira', when: 'On to Ogallala',
          trails: [{ id: 'el', pts: [[-94.42, 35.39], [-97.3, 37.7], [-100, 37.75], [-103.43, 38.04]], col: '#3a6aa0', icon: 'rider2', from: 3 }, { id: 'el2', pts: [[-103.43, 38.04], [-102.6, 39.4], [-101.72, 41.13]], col: '#3a6aa0', dash: 4 }] } },
        { trail: { id: 'el2', to: 1, speed: 0.6 } },
        { scene: true },
        nar('Bent’s Fort is a few run-down buildings and a warehouse of stinking hides. Elmira lodges in a flea-ridden closet. Big Zwey sits thirty yards off with his rifle, watching her.', 'elmira'),
      ] },
      { steps: [
        say('fowler', 'Zwey wants to marry you.'),
        emote('zwey', '!'), go('zwey', [[460, 280]], { speed: 30 }),
        nar('When she opens her door straight into him, the huge man bolts at a heavy trot, and she laughs.', 'elmira'),
        say('elmira', 'I’ll go with him, if he takes me to Ogallala.'),
      ] },
      { scene: plains({ time: 'night', weather: { lightning: true, rain: 'heavy' }, place: 'North of Bent’s Fort', when: 'Storm', props: [['wagon', 230, 230], ['campfire', 290, 250]],
          actors: { elmira: { at: [230, 238], pose: 'front' }, zwey: { at: [290, 264], pose: 'front' }, luke: { at: [310, 260], pose: 'front' } } }),
        steps: [
          nar('Zwey patches a hide wagon and buys mules. His partner Luke joins them: weaselly, red-haired, missing fingers. Elmira drives north while the men hunt buffalo.', 'luke'),
          { flash: true },
          nar('A night thunderstorm drives her under the wagon while the men sleep soaked by the fire. She tells herself she’ll get used to it.', 'elmira'),
        ] },
    ],
  });

  /* ---------- 54 ---------- */
  CH.push({
    n: 54, title: 'The road of bones', part: 2,
    scene: plains({ brown: true, bones: true, place: 'The Quitaque', when: 'Hot, dust devils', actors: { gus: { at: [60, 360], mount: 'jerry' } } }),
    beats: [
      { steps: [
        { map: { fit: pts(L.herd44, L.palo, L.canadian), places: [L.herd44, L.palo, L.canadian], title: 'Gus’s pursuit', when: 'North-west',
          trails: [{ id: 'gp', pts: [[L.herd44.lon, L.herd44.lat], [-98.9, 32.6], [-99.6, 33.9], [-101.2, 34.5], [L.palo.lon, L.palo.lat], [L.canadian.lon, L.canadian.lat]], col: '#c8402a', icon: 'rider' }] } },
        { trail: { id: 'gp', to: 5, speed: 1 } },
        { scene: true },
        nar('Blue Duck’s tracks were hidden in the stampede. It takes Gus half a day to find them. He follows them north-west, finds Lorena’s dead mare, and crosses the Brazos and the Wichita.', 'gus'),
        go('gus', [[230, 240]], { speed: 20 }),
        nar('Through the red canyons of the Quitaque toward the Palo Duro, past valleys of bleached buffalo bones, he loses the track entirely.', 'gus'),
      ] },
      { scene: plains({ river: 'canadian', brown: true, bones: true, time: 'dusk', place: 'The Canadian River', when: 'Sunset', props: [['bones', 330, 270, { w: 50, h: 40, seed: 7 }], ['bones', 390, 280, { w: 44, h: 34, seed: 8 }]],
          actors: { gus: { at: [60, 200], mount: 'jerry' }, ausfrank: { at: [300, 250], pose: 'side', dir: 1 } } }),
        steps: [
          go('gus', [[260, 240]], { speed: 20 }),
          nar('A speck on the plain becomes an old man pushing a wheelbarrow of buffalo bones: Aus Frank, an outlaw Gus once arrested. He stacks the bones into pyramids by the river.', 'ausfrank'),
          say('ausfrank', 'Blue Duck runs with six Kiowas. They ate my dog.'),
          { time: 'dawn', ms: 2500 },
          nar('At dawn Gus rides east along a road of bones stretching across the plain, thinking about how empty the plains have become.', 'gus'),
          go('gus', [[460, 200]], { speed: 20 }),
        ] },
    ],
  });

  /* ---------- 55 ---------- */
  CH.push({
    n: 55, title: 'Monkey John', part: 2,
    scene: plains({ river: 'canadian', brown: true, time: 'noon', place: 'An outlaw camp on the Canadian', when: 'Days of captivity', props: [['campfire', 230, 220]], actors: {
      lorena: { at: [220, 236], pose: 'front' }, monkeyjohn: { at: [250, 230], pose: 'front' }, dogface: { at: [196, 226], pose: 'front' },
      blueduck: { at: [460, 150], mount: 'bdsorrel', hidden: true }, ermoke: { at: [300, 200], pose: 'front' }, k1: { who: 'kiowa', at: [320, 214], pose: 'front' }, k2: { who: 'kiowa', at: [280, 190], pose: 'front' },
    } }),
    beats: [
      { steps: [
        nar('Blue Duck has traded Lorena for hides to two outlaws, Monkey John and Dog Face. They share her with Ermoke’s Kiowas.', 'lorena'),
        nar('Monkey John, under five feet tall with a dirty white beard, beats her and threatens her with his knife. Dog Face, a thin scarecrow of a man, shields her a little.', 'dogface'),
        emote('lorena', '...'),
        nar('Lorena has gone mute from terror.', 'lorena'),
      ] },
      { steps: [
        { time: 'night', ms: 2000 }, { show: 'blueduck' }, go('blueduck', [[240, 206]], { speed: 20 }), { set: 'blueduck', v: { mount: null, pose: 'front' } },
        nar('Blue Duck comes back with whiskey and wins all their horses at dice. The young Kiowa, about sixteen, won’t wager his share of Lorena.', 'blueduck'),
        { shoot: 'blueduck', at: 'k1', n: 1 }, { fall: 'k1' },
        nar('A shot from the dark drops him where he sits.', 'blueduck'),
        say('blueduck', 'Kill the old Ranger coming down the river, and she’s yours.'),
      ] },
      { steps: [
        { time: 'dawn', ms: 2000 },
        par(go('ermoke', [[0, 120]], { speed: 30 }), go('k2', [[0, 130]], { speed: 30 })), go('blueduck', [[460, 140]], { speed: 20 }),
        nar('At dawn the Kiowas ride out with Blue Duck’s bullets to kill Gus. Blue Duck leaves. Dog Face clubbed Monkey John in the night, and he wakes half-blind from ant stings.', 'monkeyjohn'),
      ] },
    ],
  });

  /* ---------- 56 ---------- */
  const raiders = Object.fromEntries(Array.from({ length: 8 }, (_, i) => ['ki' + i, { who: i === 0 ? 'ermoke' : 'kiowa', at: [470 + (i % 3) * 16, 170 + i * 14], mount: i % 2 ? 'kiowapony' : 'kiowapony2' }]));
  CH.push({
    n: 56, title: 'The buffalo wallow', part: 2,
    scene: plains({ brown: true, bones: true, wallow: true, place: 'South of the Canadian', when: 'Morning', actors: { gus: { at: [60, 230], mount: 'soap' }, ...raiders } }),
    beats: [
      { steps: [
        { move: 'ki', by: [-190, 0], speed: 40, jitter: 20 },
        ...Array.from({ length: 3 }, (_, i) => ({ shoot: 'ki' + (i * 2 + 1), at: [120, 230], n: 1, gap: 200 })),
        go('gus', [[226, 232]], { speed: 44 }),
        nar('Riding east south of the Canadian, Gus is jumped by about a dozen riders. His horse can’t outrun them. He heads for a shallow buffalo wallow among the bones.', 'gus'),
      ] },
      { steps: [
        { spawn: 'gush', kind: 'horse', who: 'soap', at: [236, 236] }, { set: 'gus', v: { mount: null, x: 222, y: 238, dir: 1 } }, { fall: 'gush' },
        nar('He cuts his own horse’s throat. The blood smell makes their horses rear, and he fires over the dead animal’s withers.', 'gus'),
        { shoot: 'gus', at: 'ki1', n: 1 }, { fall: 'ki1' }, { shoot: 'gus', at: 'ki3', n: 1 }, { fall: 'ki3' }, { shoot: 'gus', at: 'ki5', n: 1 }, { fall: 'ki5' },
        { set: 'ki0', v: { x: 360, y: 230 } }, go('ki0', [[260, 234]], { speed: 60 }), { shoot: 'gus', at: 'ki0', n: 2 }, { fall: 'ki0' },
        nar('Their leader charges with a blanket over his horse’s head. Gus kills him too. Six men go down.', 'gus'),
        { shoot: 'gus', at: 'ki7', n: 1 }, { fall: 'ki7' },
      ] },
      { steps: [
        { zoom: 1 }, { spawn: 'hunter', at: [420, 120], pose: 'front' },
        { shoot: 'hunter', at: [236, 232], n: 3, gap: 900 },
        nar('Then a white buffalo hunter sets up a .50-calibre rifle on a tripod out of range and pins Gus down until dark. Gus scrapes a hole beside the dead horse.', 'hunter'),
        { time: 'night', ms: 2500 },
        nar('After dark, shots to the east drive the attackers off.', 'gus'),
      ] },
      { scene: plains({ time: 'night', weather: { moon: 'quarter' }, place: 'The plain at night', when: 'Moonrise', actors: {
          gus: { at: [60, 230] }, july: { at: [260, 230], pose: 'front' }, roscoe: { at: [280, 236], pose: 'front' }, joe: { at: [240, 240], pose: 'front', who: 'joehat' }, janey: { at: [300, 244], pose: 'front' },
        } }),
        steps: [
          go('gus', [[220, 234]], { speed: 12 }),
          say('gus', 'Don’t shoot. Augustus McCrae, carrying my saddle.'),
          nar('He walks into the camp of July Johnson, Roscoe, Joe and Janey. He gives Joe a good Winchester taken off the dead.', 'gus'),
          nar('From a rise they see a tiny campfire far down the river. Gus and July ride toward it, leaving the others at a canyon mouth. Gus is uneasy: July has never killed a man.', 'july'),
        ] },
    ],
  });

  /* ---------- 57 ---------- */
  CH.push({
    n: 57, title: 'Rescue', part: 2,
    scene: plains({ river: 'canadian', brown: true, time: 'night', place: 'Blue Duck’s camp', when: 'Night', props: [['campfire', 230, 230]], cam: [230, 230], zoom: 1.3, actors: {
      lorena: { at: [220, 246], pose: 'front' }, monkeyjohn: { at: [256, 236], pose: 'front' }, dogface: { at: [200, 234], pose: 'front' },
      blueduck: { at: [240, 214], pose: 'front' }, ermoke: { at: [270, 220], pose: 'front' }, k1: { who: 'kiowa', at: [190, 250], pose: 'front' }, k2: { who: 'kiowa', at: [280, 250], pose: 'front' },
      gus: { at: [0, 200], mount: 'hc2', hidden: true }, july: { at: [0, 220], mount: 'julybay', hidden: true },
    } }),
    beats: [
      { steps: [
        { fall: 'dogface' },
        nar('Dog Face lies dying, gut-shot in the afternoon’s fight. Blue Duck mocks the gang for failing, kicks Lorena and gives her to the Kiowas.', 'blueduck'),
        go('blueduck', [[460, 150]], { speed: 24 }),
        nar('He tosses them a bottle and rides off toward the river. The drunken Kiowas turn on the dying Dog Face. Lorena hides her face in her arms.', 'lorena'),
      ] },
      { steps: [
        { show: 'gus' }, { show: 'july' },
        par(go('gus', [[250, 236]], { speed: 60 }), go('july', [[210, 226]], { speed: 60 })),
        { shoot: 'gus', at: 'monkeyjohn', n: 1 }, { fall: 'monkeyjohn' },
        { shoot: 'gus', at: 'k1', n: 1 }, { fall: 'k1' }, { shoot: 'gus', at: 'k2', n: 1 }, { fall: 'k2' },
        go('ermoke', [[400, 300]], { speed: 40 }), go('gus', [[380, 290]], { speed: 60 }), { shoot: 'gus', at: 'ermoke', n: 2 }, { fall: 'ermoke' },
        nar('Gus and July charge out of the dark at a dead run. Gus shoots Monkey John and every Kiowa, and rides down the one who runs. July never fires.', 'gus'),
      ] },
      { steps: [
        go('gus', [[236, 244]], { speed: 30 }), { set: 'gus', v: { mount: null, pose: 'front' } }, { spawn: 'gush', kind: 'horse', who: 'hc2', at: [260, 256] },
        say('gus', 'Was Blue Duck here, Lorie?'),
        emote('lorena', '...'),
        nar('She can’t speak. She only nods. Gus holds her with his rifle still in his other hand, and sends July back to his party.', 'lorena'),
        go('july', [[0, 200]], { speed: 30 }),
        { shoot: 'gus', at: 'dogface', n: 1 },
        nar('Riding away, July hears one more shot. Gus has ended Dog Face’s suffering.', 'july'),
      ] },
    ],
  });

  /* ---------- 58 ---------- */
  CH.push({
    n: 58, title: 'The canyon mouth', part: 2,
    scene: plains({ river: 'canadian', brown: true, time: 'night', weather: { moon: 'quarter' }, place: 'A canyon mouth on the Canadian', when: 'Night, no fire', zoom: 1.2, actors: {
      roscoe: { at: [220, 230], pose: 'front' }, joe: { at: [250, 236], pose: 'front', who: 'joehat' }, janey: { at: [200, 240], pose: 'front' }, memphis: { kind: 'horse', who: 'memphis', at: [280, 220] },
      shadow: { who: 'blueduck', at: [460, 180], hidden: true },
    } }),
    beats: [
      { steps: [
        nar('At the canyon camp there is no fire allowed. Joe cocks and uncocks his new rifle. Janey darts off at a shape that turns out to be a bush.', 'janey'),
        go('janey', [[300, 180], [210, 240]], { speed: 30 }),
        emote('roscoe', 'z', { ms: 1500 }),
      ] },
      { steps: [
        { show: 'shadow' }, go('shadow', [[260, 226]], { speed: 16 }),
        emote('janey', '!'),
        nar('Roscoe wakes to see Janey holding a big rock over her head. A huge shadow looms out of the dark.', 'roscoe'),
        { iris: 0.15, ms: 700 },
        { fall: 'joe' }, { fall: 'roscoe' }, { fall: 'janey' }, { remove: 'memphis' },
        nar('Blue Duck kills all three of them without firing a shot, and takes Joe’s horse.'),
        { hide: 'shadow' }, { iris: 1, ms: 700 },
      ] },
      { steps: [
        { time: 'dawn', ms: 2500 }, { spawn: 'july', at: [0, 200], mount: 'julybay' }, go('july', [[180, 220]], { speed: 20 }), { set: 'july', v: { mount: null, pose: 'front' } },
        emote('july', '...'),
        nar('July comes back an hour later to find them all dead. He digs shallow graves on the plain with his knife until sunup.', 'july'),
        { spawn: 'gus', at: [460, 120], mount: 'paint' }, { spawn: 'lorena', at: [470, 110], mount: 'memphisb' }, par(go('gus', [[300, 200]]), go('lorena', [[320, 190]])),
        nar('Gus arrives on a skinny paint pony with Lorena riding behind. He wraps the bodies in blankets and buries them under rocks.', 'gus'),
      ] },
      { steps: [
        { remove: 'joe' }, { remove: 'roscoe' }, { remove: 'janey' }, { prop: ['grave', 200, 170] }, { prop: ['grave', 222, 172] }, { prop: ['grave', 244, 170] },
        say('gus', 'Revenge won’t bring them back, July.'),
        nar('Gus talks him out of chasing Blue Duck. July rides north across the river to find Elmira. Gus leads the silent Lorena east to wait for Call’s herd.', 'july'),
        go('july', [[240, 440]], { speed: 20 }), go('gus', [[460, 100]], { speed: 18 }), go('lorena', [[460, 110]], { speed: 18 }),
      ] },
    ],
  });
  E.horses.memphisb = { coat: '#eeeae0', mane: '#d0cac0' };

  /* ---------- 59 ---------- */
  CH.push({
    n: 59, title: 'No word of Gus', part: 2,
    scene: campN({ place: 'West of Fort Worth', when: 'Fine spring weather', actors: {
      call: { at: [230, 206], pose: 'front' }, pocampo: { at: [160, 186], pose: 'front' }, dish: { at: [200, 216], pose: 'front' }, jasper: { at: [250, 218], pose: 'front' }, newt: { at: [140, 214], pose: 'front' },
      bull: { kind: 'cow', at: [330, 240], cfg: { coat: '#9a5a2a', patch: '#efe6cf', brindle: true }, cfgKey: 'bull' },
      ...cows('c', 14, 60, 300, 340, 80, 59),
    } }),
    beats: [
      { steps: [
        nar('A week goes by with no word of Gus. The herd crosses the Brazos and the Trinity without trouble and camps west of Fort Worth.', 'call'),
        nar('Call lets most of the men go into town. Dish stays behind, still pining for Lorena. When Jasper teases him, Dish jumps him and Call breaks it up.', 'dish'),
      ] },
      { steps: [
        say('pocampo', 'Blue Duck killed my three sons, on the llano.'),
        nar('Whittling a tiny wooden woman, Po Campo says Blue Duck always has the best horse, and Gus will not catch him on the one he took.', 'pocampo'),
        nar('Call grows more certain Gus is dead, and half wishes he could leave the herd and look for him.', 'call'),
      ] },
      { steps: [
        nar('The hands come back hung over. They saw Jake in Fort Worth, gambling with a woman, and he wouldn’t speak to them. Po Campo cures them with dewberry cobbler. Jasper walks in last, on foot.', 'jasper'),
      ] },
    ],
  });

  /* ---------- 60 ---------- */
  CH.push({
    n: 60, title: 'Quicksand', part: 2,
    scene: plains({ weather: { rain: 'heavy' }, time: 'storm', place: 'Two days south of the Red River', when: 'A downpour', actors: {
      newt: { at: [200, 230], mount: 'mouse' }, dish: { at: [230, 220], mount: 'dishsorrel' }, ...cows('c', 16, 60, 280, 340, 100, 60),
    } }),
    beats: [
      { steps: [
        nar('A black storm rolls in from the north-west. Everyone spends a sodden night on horseback. A horse is drier than the ground.', 'newt'),
        say('dish', 'It’s Jake’s fault we lost Gus and Lorena. I’ll still marry her.'),
        nar('Newt reluctantly starts to see his old hero Jake differently.', 'newt'),
      ] },
      { scene: redRiver({ place: 'The Red River', when: 'Rain, then sun', weather: { rain: 'light' }, actors: {
          call: { at: [200, 400], mount: 'hellbitch' }, deets: { at: [240, 390], mount: 'wishbone' }, olddog: { kind: 'cow', at: [230, 410], cfg: { coat: '#c8b898', patch: '#6a4a3a' }, cfgKey: 'olddog' },
          dish: { at: [280, 400], mount: 'dishsorrel' }, soupy: { at: [160, 404], mount: 'soupyhorse' }, ...cows('c', 14, 60, 380, 340, 40, 61),
        } }),
        steps: [
          nar('At the Red, a hundred yards of wet rust-coloured sand lie between them and the water. The Red is known for quicksand.', 'call'),
          go('deets', [[260, 300]], { speed: 20 }), go('deets', [[460, 320]], { speed: 30 }),
          nar('Deets probes it, doesn’t like it, and disappears downriver into the rain. He comes back with a gravel bar that runs in like a road.', 'deets'),
          { weather: { rain: null } }, { time: 'noon', ms: 2000, wait: false },
          { move: 'c', by: [0, -330], speed: 18, jitter: 30 }, walk('olddog', [[230, 60]], { speed: 18 }), cam(230, 210, 3000),
          nar('The sun breaks through as Old Dog leads the herd across into the Indian Territory. Dish and Soupy strip to wade in and rope out a few bogged cows.', 'dish'),
        ] },
      { scene: campN({ time: 'night', place: 'North of the Red', when: 'Night', props: [['bedroll', 360, 120, { c: '#4a4a52' }]], actors: { call: { at: [360, 110], pose: 'front' }, hb: { kind: 'horse', who: 'hellbitch', at: [390, 100] } } }),
        steps: [
          nar('That night the Irishman sings, and Po Campo sings sad Spanish songs with a gourd rattle.', 'pocampo'),
          say('call', 'Well, Gus, we got across.'),
          nar('Apart from the crew, cleaning his rifle, Call catches himself talking out loud to Gus, who isn’t there.', 'call'),
        ] },
    ],
  });

  /* ---------- 61 ---------- */
  CH.push({
    n: 61, title: 'Adobe Walls', part: 2,
    scene: plains({ brown: true, time: 'storm', weather: { rain: 'light' }, place: 'Adobe Walls', when: 'Chill rain', props: [['ruin', 200, 200], ['ruin', 260, 190], ['ruin', 150, 260, { }], ['adobe', 240, 250, { w: 40, lit: true }], ['campfire', 250, 262]], actors: {
      gus: { at: [230, 266], pose: 'front' }, lorena: { at: [262, 270], pose: 'front' }, paint: { kind: 'horse', who: 'paint', at: [180, 280] },
    } }),
    beats: [
      { steps: [
        nar('Caught by cold rain, Gus and Lorena shelter for two days in the one room with a roof at Adobe Walls, a deserted trading post.', 'gus'),
        nar('Gus finds a box of buttons, and deals cards for button stakes. The big horn buttons count as fifty-dollar gold pieces.', 'gus'),
        say('lorena', 'I win.'),
        nar('Lorena speaks, for the first time since he found her.', 'lorena'),
      ] },
      { scene: plains({ river: 'canadian', place: 'The Canadian River', when: 'The river is high', actors: {
          gus: { at: [120, 150], mount: 'paint' }, lorena: { at: [100, 160], mount: 'memphisb' }, wilbarger: { at: [400, 200], mount: 'wilbay' },
          ...cows('c', 20, 40, 200, 400, 90, 62),
        } }),
        steps: [
          nar('Four trail herds are waiting on the plain for the Canadian to drop. Wilbarger gallops out on a bay, the one stolen back from Pedro Flores.', 'wilbarger'),
          go('wilbarger', [[160, 160]], { speed: 34 }),
          nar('He feeds them, lends them a tent, shares a bottle with Gus, and hears that July Johnson’s companions were killed by Blue Duck.', 'wilbarger'),
        ] },
      { scene: plains({ river: 'canadian', time: 'dusk', place: 'The Canadian, north bank', when: 'A pretty evening', props: [['tent', 200, 170]], actors: { gus: { at: [300, 290], pose: 'front' }, lorena: { at: [230, 318], pose: 'front' } } }),
        steps: [
          nar('They cross when the river falls and camp two miles north for a week, playing cards as the rain comes back.', 'gus'),
          emote('lorena', '...'),
          nar('One evening, bathing in the river, Lorena sees how pale and thin she has become, and breaks down sobbing. Gus comforts her.', 'lorena'),
        ] },
    ],
  });

  /* ---------- 62 ---------- */
  CH.push({
    n: 62, title: 'Hail', part: 2,
    scene: plains({ time: 'dusk', weather: { lightning: true }, place: 'The Indian Territory', when: 'Sunset', actors: {
      call: { at: [230, 220], mount: 'hellbitch' }, newt: { at: [180, 230], mount: 'mouse' }, ...cows('c', 26, 40, 260, 380, 120, 63),
    } }),
    beats: [
      { steps: [
        nar('In the Territory the men fear Indians but see only grass and sky. Po Campo has given each cowboy a little whittled wooden woman.', 'pocampo'),
        { time: 'storm', ms: 2000 }, { flash: true },
        ...Array.from({ length: 5 }, (_, i) => ({ fall: 'c' + i, blood: false })),
        nar('Half a day from the Canadian, a bolt of lightning drops a row of thirteen cattle like bricks, a hundred feet from Call.', 'call'),
        { weather: { elmo: true, rain: 'heavy' } }, { move: 'c', by: [-300, 0], speed: 60, jitter: 40 },
        nar('The herd stampedes west with blue light rolling on the horn tips, and the crew rides blind all night in the rain.', 'newt'),
      ] },
      { scene: plains({ time: 'dawn', weather: {}, place: 'The stampede ground', when: 'Grey dawn', actors: { dish: { at: [400, 200], mount: 'dishsorrel' }, newt: { at: [200, 230], mount: 'mouse' }, pete2: { who: 'pete', at: [260, 240], mount: 'hc4' } } }),
        steps: [
          go('dish', [[230, 222]], { speed: 30 }),
          say('dish', 'Lightning killed Bill Spettle.'),
          nar('He is buried quickly, wrapped in his bedroll, and the herd moves on before Newt ever sees the grave. His brother Pete held the remuda together all night.', 'newt'),
        ] },
      { scene: plains({ river: 'arkansas', place: 'The Canadian River', when: 'A chilly squall', weather: { hail: true }, actors: {
          newt: { at: [200, 300], pose: 'front' }, mouse: { kind: 'horse', who: 'mouse', at: [220, 304] }, pea: { at: [260, 330], pose: 'front' }, jasper: { at: [150, 290], pose: 'front' },
          ...cows('c', 12, 60, 310, 340, 40, 64),
        } }),
        steps: [
          nar('At the Canadian the men strip naked to swim the herd across. Mid-crossing a hailstorm hits, with stones as big as eggs.', 'pea'),
          emote('newt', '!'),
          nar('Newt crouches under Mouse. Jasper hides under his saddle. Pea Eye stands neck-deep in the river with his hat on.', 'newt'),
          { weather: { hail: false } }, { time: 'noon', ms: 1500 },
          nar('Ten minutes later the plain is white. The men skip hailstones on the river, and Po Campo fills a bucket with them.', 'pocampo'),
          say('pea', 'That there’s Gus coming!', 2200),
        ] },
    ],
  });

  /* ---------- 63 ---------- */
  CH.push({
    n: 63, title: 'Gus returns', part: 2,
    scene: plains({ river: 'arkansas', place: 'North bank of the Canadian', when: 'Sun after hail', props: [['tent', 420, 110]], actors: {
      call: { at: [220, 220], pose: 'front' }, dish: { at: [250, 226], pose: 'front' }, gus: { at: [460, 120], mount: 'paint' },
      team: { kind: 'team', at: [230, 390], cfg: { m1: E.horses.greasy, m2: E.horses.kickboy } },
    } }),
    beats: [
      { steps: [
        go('gus', [[280, 216]], { speed: 24 }),
        say('gus', 'You boys look like a pack of plucked chickens.'),
        nar('Gus rides up on a different horse as Call and Dish pull their clothes on. He has rescued Lorena, and waited a week north of the river for them.', 'gus'),
        { spawn: 'shoat', kind: 'pig', at: [230, 380], cfg: { coat: '#9aa6b8' } }, walk('shoat', [[240, 260]], { speed: 10 }),
        nar('The crew cheers. They swim back for the wagon, and the blue shoat jumps out and swims across on its own. Po Campo hands out hailstones dipped in molasses.', 'pocampo'),
      ] },
      { steps: [
        nar('Gus hears about Bill Spettle, and tells Call about July’s losses. Call calls Jake a coward, and regrets Blue Duck got away.', 'call'),
        nar('From inside Wilbarger’s tent, Lorena keeps watch on Gus’s white hair, and it calms her when the memories come.', 'lorena'),
      ] },
      { steps: [
        { time: 'dusk', ms: 2500, wait: false }, { weather: { moon: 'crescent' } },
        say('gus', 'Sell the herd, Woodrow. Let’s go hunt Blue Duck.'),
        say('call', 'We’re going to Montana.'),
        nar('Gus teases Call about Maggie and marriage. Call refuses to turn aside, and rides off to camp alone under a thin moon.', 'call'),
        go('call', [[0, 180]], { speed: 20 }),
      ] },
    ],
  });

  /* ---------- 64 ---------- */
  CH.push({
    n: 64, title: 'Sally Skull', part: 2,
    scene: town({ place: 'Bill’s Saloon, Fort Worth', when: 'Idle days', actors: {
      jake: { at: [300, 208], pose: 'front' }, sally: { at: [320, 210], pose: 'front' }, ...cows('c', 10, 40, 320, 400, 60, 64),
    } }),
    beats: [
      { steps: [
        { move: 'c', by: [0, 60], speed: 10 },
        nar('On a winning streak, Jake has settled into Bill’s Saloon in Fort Worth, paying Sally Skull ten dollars a day for her bed and her balcony view of the herds trailing north.', 'jake'),
        nar('When the Hat Creek hands come in, he snubs them. Sally taunts him about letting an Indian take his woman.', 'sally'),
      ] },
      { steps: [
        nar('Sally shoots a young foreman with her derringer and is jailed. She and a deputy die struggling over one gun.', 'sally'),
        { remove: 'sally' },
        nar('Jake takes six hundred dollars from her hatbox and leaves for Dallas.', 'jake'),
      ] },
      { scene: { ...saloon, place: 'A saloon in Dallas', when: 'Hours of cards', actors: { jake: { at: [100, 112], pose: 'front' }, dan: { at: [118, 112], pose: 'front' }, roy: { at: [138, 114], pose: 'front' }, eddie: { at: [120, 126], pose: 'front' }, froglip: { at: [200, 150], pose: 'front' } } },
        steps: [
          nar('A soldier mentions an Arkansas sheriff and deputy searching Texas. It unnerves Jake.', 'jake'),
          say('dan', 'We tax the herds at the Kansas crossings.'),
          nar('He falls in with the three Suggs brothers, bearded and cold-eyed, and their marksman Frog Lip. Fearing July Johnson, Jake rides north with them, meaning to slip away at the first good Kansas saloon.', 'dan'),
        ] },
    ],
  });

  /* ---------- 65 ---------- */
  CH.push({
    n: 65, title: 'July alone', part: 2,
    scene: plains({ place: 'North of the Cimarron', when: 'Days alone', actors: { july: { at: [60, 230], mount: 'julybay' } } }),
    beats: [
      { steps: [
        go('july', [[230, 234]], { speed: 18 }),
        nar('Grieving the three dead on the Canadian, July rides north for days through empty country, eating jackrabbit.', 'july'),
        { set: 'july', v: { mount: null } }, { spawn: 'jh', kind: 'horse', who: 'julybay', at: [256, 236] },
        nar('Three days north of the Cimarron a hidden cactus thorn lames his horse. In the end he has to shoot it.', 'july'),
        { shoot: 'july', at: 'jh', n: 1 }, { fall: 'jh' },
        go('july', [[460, 200]], { speed: 10 }),
        nar('He walks east with his rifle, weeping at the buzzards gathering behind him.', 'july'),
      ] },
      { scene: plains({ time: 'night', weather: { moon: 'quarter' }, place: 'A dry camp', when: 'Moonlight', actors: { july: { at: [230, 236], pose: 'front' } } }),
        steps: [
          nar('Out of water, he sits all night with his pistol, thinking of ending it.', 'july'),
          nar('He decides he can’t, not yet. He has to find Elmira, and tell her about Joe.', 'july'),
        ] },
      { scene: plains({ river: 'creek', place: 'A spring in a grove', when: 'Morning', props: [['pecan', 200, 260, { seed: 3 }], ['pecan', 270, 250, { seed: 4 }]], actors: {
          july: { at: [60, 200], pose: 'side' }, johns: { at: [400, 200], mount: 'hc3', hidden: true }, bay: { kind: 'horse', who: 'littlebay', at: [420, 220], hidden: true },
        } }),
        steps: [
          go('july', [[230, 290]], { speed: 12 }),
          nar('Crows lead him to a spring in a grove of low trees. He drinks, bathes, and shoots a badger to eat.', 'july'),
          { show: 'johns' }, { show: 'bay' },
          nar('Following a wagon track, he meets an old trail boss called Johns and buys the worst horse in his remuda, a little sharp-spined bay, for forty dollars.', 'johns'),
          nar('He rides it bareback for four days into Dodge City.', 'july'),
        ] },
    ],
  });

  /* ---------- 66 ---------- */
  CH.push({
    n: 66, title: 'Luke', part: 2,
    scene: plains({ time: 'storm', weather: { rain: 'light' }, place: 'Northern Kansas', when: 'Two weeks of rain', props: [['wagon', 230, 230]], actors: {
      elmira: { at: [234, 222], pose: 'front' }, luke: { at: [300, 240], pose: 'front' }, zwey: { at: [460, 150], mount: 'hc2', hidden: true },
    } }),
    beats: [
      { steps: [
        nar('Two weeks of rain, hail and lightning. Pregnant and sick from the wagon, Elmira wonders if running from July was worth it.', 'elmira'),
        go('luke', [[250, 230]], { speed: 14 }), emote('elmira', '!'),
        nar('Luke keeps sneaking back from the hunt to paw at her. One day he knocks her off the seat. She drives him off with Zwey’s buffalo gun.', 'elmira'),
        go('luke', [[400, 280]], { speed: 20 }),
      ] },
      { steps: [
        { time: 'night', ms: 2000 }, { weather: { rain: null } }, { prop: ['campfire', 270, 250] }, { show: 'zwey' }, { set: 'zwey', v: { mount: null, x: 290, y: 252, pose: 'front' } }, { set: 'elmira', v: { x: 256, y: 256 } },
        { spawn: 'sniper', who: 'luke', at: [460, 80], hidden: true }, { shoot: 'sniper', at: [270, 244], n: 1 }, { dust: [270, 246], n: 8 },
        emote('elmira', '!'),
        nar('That evening a rifle shot out of the dark passes between them and knocks their roasting turkey into the ashes. Nobody is there.', 'elmira'),
      ] },
      { steps: [
        { time: 'dawn', ms: 1500 }, { set: 'luke', v: { x: 244, y: 232 } },
        nar('At dawn Luke comes for her in the wagon with bloody hands. Smiling, Zwey drags him out and smashes his head against the iron wheel rim.', 'zwey'),
        { fall: 'luke' }, { rise: 'luke' },
        nar('Elmira sews Luke’s torn ear back on, crooked, and nurses him through fever. He swears he didn’t fire that shot. So who did?', 'elmira'),
      ] },
    ],
  });

  /* ---------- 67 ---------- */
  CH.push({
    n: 67, title: 'Grasshoppers', part: 2,
    scene: plains({ place: 'Near the Kansas line', when: 'Day', actors: {
      call: { at: [230, 220], mount: 'hellbitch' }, wichita: { at: [460, 180], mount: 'kiowapony' }, w1: { who: 'kiowa', at: [470, 200], mount: 'kiowapony2' }, w2: { who: 'kiowa', at: [480, 160], mount: 'kiowapony' },
      ...cows('c', 16, 40, 270, 380, 100, 67),
    } }),
    beats: [
      { steps: [
        par(go('wichita', [[270, 210]], { speed: 16 }), go('w1', [[290, 226]], { speed: 16 }), go('w2', [[300, 196]], { speed: 16 })),
        nar('Just before Kansas, five thin Wichitas ride up. Their leader is an old man with one milky eye, called Bacon Rind. Call knows him. They ask for beef.', 'wichita'),
        say('call', 'Take the lame steer.'),
        nar('Call gives them a split-hoofed steer. The two old men raise their hands to each other.', 'call'),
      ] },
      { scene: plains({ time: 'dawn', place: 'The south edge of Kansas', when: 'Dawn', props: [['tent', 220, 200]], actors: { gus: { at: [230, 230], pose: 'front' }, lorena: { at: [210, 232], pose: 'front' }, ...cows('c', 10, 40, 330, 380, 60, 68) } }),
        steps: [
          nar('At sunset Gus points out the Blue Mounds, low hills that glow electric blue. At dawn Lorena, afraid he no longer wants her, offers herself to him for nothing.', 'lorena'),
          say('gus', 'Take your time, Lorie. There’s no hurry.'),
          nar('Then a brown cloud rises in the north, humming.', 'gus'),
        ] },
      { steps: [
        { weather: { hoppers: true } }, { time: 'storm', ms: 1000 },
        { spawn: 'newt', at: [100, 330], mount: 'mouse' }, { move: 'c', by: [-300, 40], speed: 50 }, walk('newt', [[0, 360]], { speed: 50 }),
        nar('Grasshoppers blot out the sun for hours. Gus holds the terrified horses inside the tent with Lorena. The herd stampedes, and Newt is lost with sixty cattle.', 'newt'),
      ] },
      { scene: plains({ brown: true, place: 'A chewed-bare plain', when: 'Afternoon', actors: { newt: { at: [200, 240], mount: 'mouse' }, y1: { who: 'kiowa', at: [240, 230], mount: 'kiowapony' }, y2: { who: 'kiowa', at: [260, 250], mount: 'kiowapony2' }, ...cows('c', 10, 100, 280, 240, 60, 69) } }),
        steps: [
          nar('Young Indians find him. They laugh, handle his pistol and hat, then help him drive his strays over a ridge back to the herd.', 'newt'),
          { move: 'c', by: [200, -80], speed: 20 }, walk('newt', [[400, 170]], { speed: 20 }),
          nar('Soupy reports sixty miles to water. When Newt asks to check on Gus, Call says no.', 'call'),
        ] },
    ],
  });

  /* ---------- 68 ---------- */
  CH.push({
    n: 68, title: 'Doan’s Store', part: 2,
    scene: redRiver({ place: 'Doan’s Store on the Red River', when: 'Day', props: [['store', 200, 130, { c: '#b8a888', seed: 31 }], ['wagon', 290, 140], ['wagon', 340, 150]], zoom: 1.2, actors: {
      jake: { at: [210, 150], pose: 'front' }, lou: { at: [296, 146], pose: 'front' }, nester: { at: [320, 152], pose: 'front' },
      dan: { at: [120, 150], mount: 'hc3' }, roy: { at: [100, 160], mount: 'hc6' }, eddie: { at: [90, 140], mount: 'hc8' },
    } }),
    beats: [
      { steps: [
        nar('Camped north of Dallas, Jake listens to the Suggs brothers talk about killing, and about Dan’s plan to steal a herd near Dodge and murder its crew.', 'dan'),
        go('jake', [[280, 152]], { speed: 12 }),
        nar('At Doan’s Store on the Red River, Jake flirts with a barefoot black-haired girl called Lou on a nester’s wagon.', 'lou'),
        { fall: 'jake', blood: false },
        nar('Her husband, a man in his seventies, knocks Jake face-first into the dirt with the butt of his shotgun.', 'nester'),
      ] },
      { steps: [
        { rise: 'jake' }, { shoot: 'jake', at: 'nester', n: 2, gap: 250 }, { fall: 'nester' },
        nar('When the old man raises the gun again, Jake shoots him twice in the chest, almost without meaning to. The girl, strangely, smiles at him.', 'jake'),
        { set: 'jake', v: { mount: 'jakebay' } }, par(go('jake', [[220, 300], [220, 440]], { speed: 40 }), go('dan', [[200, 300], [200, 440]], { speed: 40 })),
        nar('Nesters come running. Within fifteen minutes Jake is across the Red with the Suggses.', 'jake'),
      ] },
      { scene: plains({ place: 'Kansas', when: 'Day', props: [['soddy', 230, 180]], actors: {
          german: { at: [230, 214], pose: 'front' }, dan: { at: [300, 230], mount: 'hc3' }, froglip: { at: [330, 240], mount: 'frogwhite' }, jake: { at: [270, 250], mount: 'jakebay' },
          cow1: { kind: 'cow', at: [180, 220], cfg: { coat: '#8a5a34' }, cfgKey: 'milk1' }, cow2: { kind: 'cow', at: [160, 230], cfg: { coat: '#e8dcc0', patch: '#6a4a3a' }, cfgKey: 'milk2' },
        } }),
        steps: [
          nar('In Kansas the gang terrorises a German family in a sod house, for four dollars.', 'german'),
          { shoot: 'froglip', up: true, n: 2 }, walk('cow1', [[230, 170]], { speed: 30 }), walk('cow2', [[240, 176]], { speed: 30 }), { dust: [230, 170], n: 14 },
          nar('Frog Lip fires into the air and stampedes their two milk cows over the grassy roof, and they crash straight through it.', 'froglip'),
          nar('Half drunk, Jake still hopes to run into the Hat Creek outfit, even while he claims a grudge against them.', 'jake'),
        ] },
    ],
  });

  /* ---------- 69 ---------- */
  CH.push({
    n: 69, title: 'Dodge City', part: 2,
    scene: town({ pens: true, place: 'Dodge City', when: 'Day', actors: {
      july: { at: [230, 236], pose: 'front' }, clerk: { at: [160, 222], pose: 'front' }, ...cows('c', 10, 60, 320, 200, 60, 69),
    } }),
    beats: [
      { steps: [
        nar('Dodge City is almost nothing but saloons. July buys a decent horse called Pete, and cries trying to write home.', 'july'),
        nar('He sends Peach a short letter: Roscoe, Joe and Janey are dead.', 'july'),
        say('clerk', 'Dee Boot is my nephew. He’s alive. Try Ogallala.'),
        nar('The kind old post office clerk turns out to be Dee Boot’s uncle. He sends July to Elmira’s old friend Jennie.', 'clerk'),
      ] },
      { steps: [
        cam(200, 330, 1400),
        { move: 'c', by: [150, 20], speed: 20 },
        nar('July watches cowboys force longhorns up a narrow chute into railroad boxcars.', 'july'),
      ] },
      { scene: { ...saloon, place: 'A Dodge City saloon', when: 'Afternoon', actors: { july: { at: [100, 112], pose: 'front' }, jennie: { at: [118, 112], pose: 'front' } } },
        steps: [
          say('jennie', 'Ellie’s gone after Dee in Ogallala, sure as anything.'),
          nar('He drinks for hours waiting for Jennie, a skinny girl with huge brown eyes. Drunk, he follows her upstairs, and is sick over the outside landing till sundown.', 'jennie'),
          nar('She tells him to go home. That night he saddles Pete and rides out alone.', 'july'),
        ] },
    ],
  });

  /* ---------- 70 ---------- */
  CH.push({
    n: 70, title: 'Mouse', part: 2,
    scene: plains({ time: 'dusk', place: 'Kansas, south of the Arkansas', when: 'Evening', zoom: 1.3, actors: {
      mouse: { kind: 'human', who: 'ben', at: [220, 230], mount: 'mouse' }, dish: { at: [280, 220], mount: 'dishsorrel' }, newt: { at: [160, 240], pose: 'front' },
      cowk: { kind: 'cow', at: [260, 250], cfg: { coat: '#6a4a3a' }, cfgKey: 'killer' },
    } }),
    beats: [
      { steps: [
        nar('West of the grasshoppers there are two weeks of clear skies and good grass. Ben Rainey borrows Mouse to cut out a yearling.', 'newt'),
        go('cowk', [[226, 234]], { speed: 40 }), emote('newt', '!'),
        { set: 'mouse', v: { mount: null, x: 206, y: 236 } }, { spawn: 'mouseh', kind: 'horse', who: 'mouse', at: [224, 232] }, { fall: 'mouseh' },
        nar('A small cow with sharp, twisted horns hooks Mouse behind the girth.', 'newt'),
      ] },
      { steps: [
        { rise: 'mouseh' }, walk('mouseh', [[330, 230]], { speed: 8 }), go('dish', [[320, 224]], { speed: 10 }),
        nar('Dish spares Newt the job. He leads the dying horse a hundred yards off, and shoots him.', 'dish'),
        { shoot: 'dish', at: 'mouseh', n: 1 }, { fall: 'mouseh' },
        emote('newt', '...'),
        nar('Newt hides his tears on night guard. Mouse had been his horse for eight years.', 'newt'),
      ] },
      { scene: plains({ time: 'dawn', place: 'Gus’s tent', when: 'Sunrise', props: [['tent', 220, 200], ['campfire', 250, 220]], actors: { gus: { at: [270, 226], pose: 'front' }, lorena: { at: [220, 208], pose: 'front' }, newt: { at: [240, 236], pose: 'front' } } }),
        steps: [
          nar('Gus invites Newt to breakfast. Lorena, her hair loose, smiles at him over her coffee.', 'lorena'),
          nar('Privately, she has made up her mind to get Gus to marry her before Ogallala.', 'lorena'),
        ] },
      { scene: plains({ river: 'arkansas', time: 'night', weather: { moon: 'quarter' }, place: 'The Arkansas River', when: 'Moonlight', actors: { call: { at: [200, 290], mount: 'hellbitch' }, deets: { at: [230, 290], mount: 'wishbone' } } }),
        steps: [
          say('deets', 'I miss the Rio Grande, Captain.'),
          nar('Call and Deets look at the swift Arkansas by moonlight. Deets has crossed the track of Jake’s pacing horse, with four other horses, off to the east.', 'deets'),
          nar('Call reckons Jake is bound for Dodge, and tells Deets to watch for that track.', 'call'),
        ] },
    ],
  });
  E.cast.ben = { name: 'Ben Rainey', c: { skin: '#f0c098', hair: '#9a6a34', hat: '#8a7a5a', band: '#4a3a2a', shirt: '#8a6aa0', pants: '#6a5a44' } };

  /* ---------- 71 ---------- */
  CH.push({
    n: 71, title: 'The raid in the dark', part: 2,
    scene: plains({ place: 'Kansas, a day short of Dodge', when: 'Sunny', actors: {
      dan: { at: [230, 220], mount: 'hc3' }, jake: { at: [200, 230], mount: 'jakebay' }, froglip: { at: [260, 234], mount: 'frogwhite' }, roy: { at: [180, 240], mount: 'hc6' }, eddie: { at: [280, 244], mount: 'hc8' },
    } }),
    beats: [
      { steps: [
        nar('Near Dodge, Jake means to slip away. Then Dan Suggs, through his spyglasses, spots his old boss Wilbarger driving twenty-five horses with two hands.', 'dan'),
        say('dan', 'We’ll have those horses. And him.'),
        nar('Frog Lip’s stare dares Jake to leave. They follow Wilbarger’s trail at dusk and swim the Arkansas by moonlight.', 'froglip'),
      ] },
      { scene: plains({ time: 'night', place: 'Wilbarger’s camp', when: 'Pitch dark', props: [['bedroll', 220, 240, { c: '#6a5a44' }], ['bedroll', 250, 244, { c: '#4a4a52' }]], zoom: 1.2, actors: {
          chick: { at: [220, 236], pose: 'front' }, boy: { who: 'kid1', at: [250, 240], pose: 'front' }, wilbarger: { at: [290, 230], pose: 'front' },
          dan: { at: [100, 200], pose: 'side' }, froglip: { at: [110, 220], pose: 'side' }, eddie: { at: [90, 240], pose: 'side' },
        } }),
        steps: [
          { shoot: 'dan', at: 'chick', n: 2 }, { fall: 'chick' }, { shoot: 'eddie', at: 'boy', n: 1 }, { fall: 'boy' },
          { set: 'wilbarger', v: { mount: 'wilbay' } }, { shoot: 'wilbarger', at: 'froglip', n: 2 }, { fall: 'froglip' },
          { shoot: 'dan', at: 'wilbarger', n: 3, gap: 200 }, go('wilbarger', [[460, 200]], { speed: 60 }),
          nar('In the pitch dark they kill Chick and a young wrangler in their blankets. Wilbarger gets to a horse and escapes, though Dan swears he hit him three times. Frog Lip is gut-shot.', 'dan'),
        ] },
      { steps: [
        { time: 'dawn', ms: 2000 },
        nar('At dawn Dan leaves Frog Lip behind and takes his guns. Little Eddie shoots him in the head and goes through his pockets.', 'eddie'),
        nar('Further on, Dan shoots two settlers ploughing by a lone tree, hangs them from it and burns them. Sickened, Jake resolves to escape at the first chance.', 'jake'),
      ] },
    ],
  });

  /* ---------- 72 ---------- */
  CH.push({
    n: 72, title: 'Wilbarger', part: 2,
    scene: plains({ river: 'arkansas', place: 'The Arkansas River', when: 'Midsummer morning', actors: {
      deets: { at: [240, 380], mount: 'wishbone' }, dish: { at: [200, 340], mount: 'dishsorrel' }, bay: { kind: 'horse', who: 'wilbay', at: [240, 250] },
      olddog: { kind: 'cow', at: [230, 400], cfg: { coat: '#c8b898', patch: '#6a4a3a' }, cfgKey: 'olddog' }, ...cows('c', 12, 60, 380, 340, 50, 72),
    } }),
    beats: [
      { steps: [
        nar('As the herd crosses the Arkansas, Deets finds Wilbarger’s big bay on the north bank, riderless, blood crusted on the saddle.', 'deets'),
        emote('dish', '!'), go('deets', [[210, 330]], { speed: 40 }),
        nar('Dish’s horse panics mid-river, and Deets saves him. The herd scatters into five or six bunches.', 'dish'),
        say('deets', 'Mr. Wilbarger’s shot. Horse thieves. Ten miles east.'),
      ] },
      { scene: plains({ river: 'arkansas', time: 'dusk', place: 'Under the riverbank, ten miles east', when: 'Dusk', zoom: 1.3, actors: {
          wilbarger: { at: [230, 290], pose: 'front' }, gus: { at: [256, 286], pose: 'front' }, call: { at: [200, 280], pose: 'front' }, newt: { at: [170, 270], pose: 'front' }, deets: { at: [290, 270], pose: 'front' },
        } }),
        steps: [
          { fall: 'wilbarger', blood: true },
          nar('Call leaves Dish in charge of the herd and of Lorena, and rides east with Gus, Deets, Pea Eye and Newt. Wilbarger is lying on a blanket, shot three times, still joking.', 'wilbarger'),
          say('wilbarger', 'Dan Suggs. Him and his brothers.'),
          nar('He leaves Gus his Milton and his Virgil and the tent, and asks that his horses be sold for his brother. He dies after dark.', 'wilbarger'),
          { time: 'night', ms: 2000 },
        ] },
      { steps: [
        { remove: 'wilbarger' }, { prop: ['grave', 230, 294] }, { prop: ['skull', 230, 278] },
        nar('They bury him on the bare riverbank, and Deets marks the grave with a buffalo skull. Newt is given Wilbarger’s rifle.', 'deets'),
        nar('Riding through the night, Gus talks to Newt about all the bones lying under the plains.', 'gus'),
      ] },
    ],
  });

  /* ---------- 73 ---------- */
  CH.push({
    n: 73, title: 'Dish in charge', part: 2,
    scene: campN({ time: 'dusk', place: 'North of the Arkansas', when: 'Dusk', props: [['tent', 330, 150]], actors: {
      dish: { at: [200, 210], mount: 'dishsorrel' }, lorena: { at: [330, 160], pose: 'front' }, jasper: { at: [170, 214], pose: 'front' }, soupy: { at: [150, 220], pose: 'front' }, lippy: { at: [250, 226], pose: 'front' },
    } }),
    beats: [
      { steps: [
        go('dish', [[316, 168]], { speed: 8 }),
        nar('Now in charge, Dish rides the few yards to Lorena’s tent balancing a plate of beef, while Jasper and Soupy jeer. She takes it and closes the flaps.', 'dish'),
        { time: 'night', ms: 2000 },
        say('lippy', 'Gus won her on a cut of cards, you know.'),
        nar('Lippy lets slip that Gus once won Lorena on a card cut, paid her fifty dollars anyway, and paid Lippy ten to keep quiet.', 'lippy'),
        nar('Dish lies awake all night near her tent, listening to the Irishman sing to the cattle.', 'dish'),
      ] },
      { scene: plains({ river: 'creek', place: 'A small creek', when: 'Noon', props: [['bush', 200, 280, { seed: 3 }], ['bush', 280, 290, { seed: 4 }]], actors: { lorena: { at: [220, 296], pose: 'front' }, pocampo: { at: [250, 290], pose: 'front' } } }),
        steps: [
          say('pocampo', 'Snow water, from mountains you can’t see.'),
          nar('At a little creek Po Campo gives Lorena sweet wild plums. She washes her face in the cold green water.', 'lorena'),
        ] },
      { scene: plains({ time: 'night', place: 'The bed ground', when: 'Night', props: [['tent', 230, 200]], actors: { dish: { at: [270, 230], pose: 'front' } } }),
        steps: [
          nar('Gus doesn’t come back. Lorena lies awake in the tent, afraid he is dead. Outside, Dish sits a few yards off, sleepless and lonely.', 'lorena'),
        ] },
    ],
  });

  /* ---------- 74 ---------- */
  CH.push({
    n: 74, title: 'The hanging tree', part: 2,
    scene: plains({ place: 'A knoll on the Kansas prairie', when: 'Morning', weather: { buzzards: 4 }, actors: {
      call: { at: [200, 230], mount: 'hellbitch' }, gus: { at: [230, 236], mount: 'wilbay' }, deets: { at: [260, 230], mount: 'wishbone' }, pea: { at: [180, 244], mount: 'sardine' }, newt: { at: [210, 250], mount: 'hc4' },
    } }),
    beats: [
      { steps: [
        nar('Hundreds of buzzards cover a knoll. They bury what is left of Wilbarger’s men, and of Frog Lip.', 'pea'),
        nar('Among the thieves’ tracks, Deets reads one that rides a little sideways in the saddle: Jake Spoon.', 'deets'),
        nar('Further on they cut down the two burned settlers and bury them too.', 'call'),
      ] },
      { scene: plains({ river: 'creek', time: 'dusk', place: 'A steep-banked creek', when: 'Late afternoon', props: [['wagon', 300, 260], ['pecan', 160, 250, { seed: 9, id: 'tree' }]], zoom: 1.2, actors: {
          dan: { at: [300, 280], pose: 'front' }, roy: { at: [320, 286], pose: 'front' }, eddie: { at: [280, 290], pose: 'front' }, jake: { at: [260, 284], pose: 'front' },
          call: { at: [60, 330] }, gus: { at: [80, 340] }, deets: { at: [100, 330] },
        } }),
        steps: [
          nar('Deets finds the gang camped drunk at a creek beside a murdered peddler’s medicine wagon. Call, Gus and Deets creep up the creek bed with the sun behind them.', 'call'),
          par(go('call', [[230, 310]], { speed: 14 }), go('gus', [[260, 316]], { speed: 14 }), go('deets', [[210, 314]], { speed: 14 })),
          { shoot: 'deets', at: 'eddie', n: 1 }, { fall: 'eddie' },
          nar('Deets shoots little Eddie. The rest give up without a fight. Gus jams his big dragoon Colt into Dan’s belly.', 'gus'),
          { rise: 'eddie' },
        ] },
      { steps: [
        { time: 'dusk', ms: 2000 },
        ...['dan', 'roy', 'eddie', 'jake'].map((id, i) => ({ set: id, v: { x: 140 + i * 16, y: 262, mount: 'hc' + (i + 1) } })), { set: 'jake', v: { mount: 'jakebay' } }, cam(170, 250, 1400),
        nar('Under a tree by the creek Deets ties four nooses. The four men sit their horses beneath the limb, hands tied.', 'deets'),
        say('jake', 'Newt can have my horse. It’s a good pacer.'),
        nar('Dan and Eddie go first. Then Jake says goodbye to his old partners.', 'jake'),
        { iris: 0.2, ms: 900 },
        nar('He spurs his own horse out from under himself.'),
        { iris: 1, ms: 900 },
      ] },
      { steps: [
        { time: 'night', ms: 1500 }, { weather: { moon: 'quarter' } },
        ...['dan', 'roy', 'eddie', 'jake'].map((id) => ({ remove: id })), { prop: ['grave', 200, 230] }, { spawn: 'newtj', who: 'newt', at: [220, 260], mount: 'jakebay' },
        nar('They bury Jake by moonlight. Call scratches his name on a board from the wagon’s tailgate. Dan is left hanging with a sign on him.', 'call'),
        emote('newtj', 'z', { wait: false }),
        nar('Then they drive Wilbarger’s horses west through the night, Newt asleep on Jake’s pacer, Pea Eye riding close beside him.', 'pea'),
        go('newtj', [[460, 240]], { speed: 12 }),
      ] },
    ],
  });
})();
