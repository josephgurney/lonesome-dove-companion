/* Part III, chapters 75–102. Built from a chapter-by-chapter reading of the novel; all wording paraphrased. */
(function () {
  const E = window.ENGINE, T = window.ART.T, K = window.STORYKIT, CH = window.STORY.chapters;
  const { nar, say, walk, go, face, emote, cam, wait, par, saloon, lorenaRoom, cows, horses, pts, COATS, pigs,
    doveGround, doveProps, DOVE_W, DOVE_H, hillPool, town, plains, campN, L } = K;

  Object.assign(E.cast, {
    clara: { name: 'Clara', c: { skin: '#f0c8a8', hair: '#7a5230', brim: 'none', long: true, shirt: '#9a9a90', dress: '#7a7a70', apron: '#e8e0cc' } },
    clarahat: { name: 'Clara', c: { skin: '#f0c8a8', hair: '#7a5230', hat: '#6a5a44', band: '#3a2a1a', long: true, shirt: '#9a9a90', dress: '#7a7a70' } },
    sally2: { name: 'Sally', c: { skin: '#f4d0b0', hair: '#8a5a30', brim: 'none', long: true, shirt: '#8ab0d0', dress: '#6a90b0', blush: '#f0a8a0' } },
    betsey: { name: 'Betsey', c: { skin: '#f4d0b0', hair: '#9a6a3a', brim: 'none', long: true, shirt: '#e0a0a8', dress: '#c07888', blush: '#f0a8a0' } },
    cholo: { name: 'Cholo', c: { skin: '#a8704a', hair: '#f0ece4', hat: '#6a5a44', band: '#3a2a1a', shirt: '#c8b890', pants: '#5a4a38' } },
    bob: { name: 'Bob Allen', c: { skin: '#e8c0a0', hair: '#8a7a6a', brim: 'none', shirt: '#e8e4d8', pants: '#e8e4d8' } },
    dee: { name: 'Dee Boot', c: { skin: '#f0c8a8', hair: '#d8b870', brim: 'none', shirt: '#b8a888', pants: '#4a4034', beard: 'stubble', beardCol: '#c8a860' } },
    doctor: { name: 'Doctor', c: { skin: '#f0c0a0', hair: '#b8502a', brim: 'none', shirt: '#e8e4d8', vest: '#3a3440', pants: '#3a3440', beard: 'full', beardCol: '#b8502a' } },
    weaver: { name: 'Captain Weaver', c: { skin: '#e8a888', hair: '#9a948a', hat: '#2e3a5a', band: '#c8a040', brim: 'cap', shirt: '#3a4a7a', pants: '#5a6a8a', beard: 'mustache', beardCol: '#9a948a' } },
    dixon: { name: 'Dixon', c: { skin: '#d8a078', hair: '#3a2a1e', hat: '#5a4a38', shirt: '#b89a6a', pants: '#6a5a3a', beard: 'full', beardCol: '#3a2a1e', gun: '#8a8a90' } },
    shaw: { name: 'Shaw', c: { skin: '#e8c0a0', hair: '#2a1e16', brim: 'none', shirt: '#e8e4d8', vest: '#3a2e3a', pants: '#2a2630', beard: 'mustache', beardCol: '#2a1e16' } },
    nellie: { name: 'Nellie', c: { skin: '#f4d0b8', hair: '#c89a5a', brim: 'none', long: true, shirt: '#e0a0b8', dress: '#c07898', blush: '#f09aa0' } },
    buf: { name: 'Buf', c: { skin: '#f0c8a8', hair: '#4a2e1e', brim: 'none', long: true, shirt: '#c8605a', dress: '#a8403a' } },
    hugh: { name: 'Old Hugh', c: { skin: '#caa07a', hair: '#9a948a', hat: '#6a5a44', shirt: '#b89a6a', pants: '#8a6a44', beard: 'full', beardCol: '#8a6a3a' } },
    mobley: { name: 'Dr. Mobley', c: { skin: '#f0b89a', hair: '#6a5a4a', hat: '#2a2a2a', brim: 'bowler', shirt: '#e8e4d8', coat: '#2a2a2e', pants: '#2a2a2e' } },
    dora: { name: 'Dora', c: { skin: '#f0d0b8', hair: '#3a2a1e', brim: 'none', long: true, shirt: '#2a2a2e', dress: '#2a2a2e' } },
    gusbed: { name: 'Gus', c: { skin: '#eab892', hair: '#f2eee6', brim: 'none', shirt: '#e8e4d8', pants: '#e8e4d8', boots: '#e8e4d8', beard: 'mustache', beardCol: '#f2eee6' } },
    goodnight: { name: 'Goodnight', c: { skin: '#e0a880', hair: '#6a5a4a', hat: '#5a4a38', band: '#2a2018', shirt: '#7a6a50', pants: '#4a4034', beard: 'full', beardCol: '#6a5a4a' } },
    decker: { name: 'Deputy Decker', c: { skin: '#f0b89a', hair: '#6a5a4a', hat: '#5a4a38', shirt: '#9a8a70', pants: '#4a4034', badge: true } },
    boloid: { name: 'Bolivar', c: { skin: '#b67c52', hair: '#f0ece4', hat: '#c8a860', band: '#8a3a2a', brim: 'sombrero', shirt: '#c8bca0', serape: ['#6a3a2a', '#b89a50', '#3a5a6a'], pants: '#c8bca0', beard: 'mustache', beardCol: '#f0ece4' } },
    brave: { name: 'Young brave', c: { skin: '#a8704a', hair: '#141010', brim: 'none', long: true, shirt: '#b89a6a', pants: '#7a5a3a' } },
    callold: { name: 'Call', c: { skin: '#dca47a', hair: '#6a5a4a', hat: '#4a3a2a', band: '#2a1e14', shirt: '#8c8a78', pants: '#4e4436', beard: 'full', beardCol: '#8a8278' } },
  });
  Object.assign(E.horses, {
    candy: { coat: '#c06a34', mane: '#8a4020', blaze: true },
    sugar: { coat: '#9a6a44', mane: '#3a2216' },
    dixonblack: { coat: '#262224', mane: '#121012' },
    custer: { coat: '#e8e0d0', mane: '#3a2a1e', spots: 13 },
    jerrydun: { coat: '#c8a868', mane: '#4a3422' },
    redmule: { coat: '#a8582a', mane: '#6a3418', mule: true },
    buckskin: { coat: '#c8a060', mane: '#2a1a12' },
  });

  const M = {
    ...L,
    clara: { name: 'Clara’s ranch', lon: -101.95, lat: 41.02, col: '#6d8a3a', side: 'l' },
    salt: { name: 'Salt Creek', lon: -106.3, lat: 43.55, col: '#3a6aa0' },
    powder: { name: 'Powder River', lon: -106.0, lat: 44.6, col: '#3a6aa0' },
    miles: { name: 'Miles City', lon: -105.84, lat: 46.41, col: '#3a6aa0' },
    benton: { name: 'Fort Benton', lon: -110.67, lat: 47.82, col: '#3a6aa0' },
    milk: { name: 'The Milk River', lon: -108.4, lat: 48.5, col: '#c8402a' },
    denver: { name: 'Denver', lon: -104.99, lat: 39.74, col: '#3a6aa0' },
    raton: { name: 'Raton Pass', lon: -104.44, lat: 36.95, col: '#3a6aa0' },
    santarosa: { name: 'Santa Rosa', lon: -104.68, lat: 34.94, col: '#3a6aa0' },
    horsehead: { name: 'Horsehead Crossing', lon: -102.6, lat: 31.2, col: '#3a6aa0' },
    orchard: { name: 'Clara’s orchard', lon: -98.3, lat: 29.8, col: '#6d8a3a' },
  };

  /* ---------- scenes ---------- */
  const ranch = (o = {}) => ({
    w: 460, h: 440, seed: 181, time: o.time || 'noon', weather: o.weather || {}, place: o.place || 'Clara’s ranch on the Platte', when: o.when || '', cam: o.cam || [230, 210], zoom: o.zoom,
    ground: (g) => {
      g.fill(o.winter ? T.SNOW : T.GRASS); g.patches(o.winter ? T.SNOW : T.DRY, null, 10, 8, 20);
      g.line([[0, 392], [230, 384], [460, 396]], 70, T.SAND, 4); g.line([[0, 396], [230, 388], [460, 400]], 44, T.WATER, 5); g.patches(T.SAND, T.WATER, 6, 6, 14);
      g.rect(300, 230, 150, 90, T.DIRT);
    },
    props: [
      ['framehouse', 200, 200, { lit: o.lit }], ['shack', 330, 190, { seed: 3 }], ['fenceH', 380, 232, { len: 132 }], ['fenceH', 380, 320, { len: 132 }], ['fenceV', 312, 320, { len: 84 }], ['fenceV', 446, 320, { len: 84 }], ['well', 280, 200],
      ['grave', 60, 110], ['grave', 80, 112], ['grave', 100, 110], ...(o.bobgrave ? [['grave', 120, 114]] : []),
      ['pecan', 120, 350, { seed: 31 }], ['pecan', 380, 356, { seed: 32 }], ['pecan', 40, 340, { seed: 33 }],
      ...(o.props || []),
    ],
    actors: o.actors || {},
  });
  const wyoming = (o = {}) => ({
    w: 460, h: 440, seed: o.seed || 191, time: o.time || 'hot', weather: o.weather || { heat: true }, place: o.place || 'Wyoming', when: o.when || '', cam: o.cam || [230, 230],
    ground: (g) => { g.fill(o.bad ? T.RED : T.SAND); g.patches(T.DRY, null, 14, 6, 16); if (o.bad) g.patches(T.ROCK, null, 12, 10, 26); if (o.pools) { g.circle(150, 300, 18, T.WATER, 4); g.circle(260, 320, 14, T.WATER, 4); g.circle(340, 290, 16, T.WATER, 4); } if (o.river) { g.line([[0, 330], [230, 322], [460, 336]], 50, T.MUD, 3); g.line([[0, 334], [230, 326], [460, 340]], 30, T.WATER, 3); } },
    props: [['bush', 80, 100, { seed: 5 }], ['bush', 380, 160, { seed: 6 }], ['bush', 200, 380, { seed: 7 }], ['rock', 300, 120], ...(o.mtns ? [['mountains', 230, 70, { w: 460 }]] : []), ...(o.props || [])],
    actors: o.actors || {},
  });
  const montana = (o = {}) => ({
    w: 460, h: 440, seed: o.seed || 201, time: o.time || 'noon', weather: o.weather || {}, place: o.place || 'Montana', when: o.when || '', cam: o.cam || [230, 230],
    ground: (g) => {
      g.fill(o.snowy ? T.SNOW : T.TALL); g.patches(o.snowy ? T.TALL : T.GRASS, null, 12, 10, 30);
      if (o.river) { g.line([[0, 330], [230, 322], [460, 336]], 60, T.MUD, 3); g.line([[0, 334], [230, 326], [460, 340]], 40, o.ice ? T.SNOW : T.WATER, 3); }
      if (o.bank) { g.rect(0, 300, 460, 40, T.ROCK); g.line([[0, 350], [460, 350]], 26, T.BROWNWATER); }
    },
    props: [...(o.mtns !== false ? [['mountains', 230, 70, { w: 460, seed: o.seed || 41 }]] : []), ...(o.trees ? [['pine', 60, 160], ['pine', 400, 170], ['pine', 90, 380], ['pine', 380, 400]] : []), ...(o.props || [])],
    actors: o.actors || {},
  });
  const bedroom = (o = {}) => ({ ...lorenaRoom, ...o, props: [...lorenaRoom.props, ...(o.extraProps || [])], actors: o.actors || {} });

  /* ---------- 75 ---------- */
  CH.push({
    n: 75, title: 'Clara', part: 3,
    scene: ranch({ place: 'The Allen ranch on the Platte, Nebraska', when: 'Summer', actors: {
      clara: { at: [380, 280], pose: 'front' }, mare: { kind: 'horse', who: 'hc6', at: [400, 280] }, sally2: { at: [260, 230], pose: 'front' }, betsey: { at: [240, 236], pose: 'front' },
      team: { kind: 'team', at: [0, 330], cfg: { m1: E.horses.lukemule, m2: E.horses.lukemule } }, zwey: { at: [-20, 320], mount: 'hc2' },
      elmira: { at: [0, 0], hidden: true }, cholo: { at: [420, 300], pose: 'front' },
    } }),
    beats: [
      { steps: [
        { map: { fit: pts(M.clara, M.ogallala, M.dodge), places: [M.ogallala, M.clara, M.dodge], title: 'The Platte', when: 'Nebraska' } },
        nar('On the Platte, twenty miles from Ogallala, is Clara Allen’s horse ranch.'),
        { scene: true },
        nar('Clara is milking a mare to save a weak foal when her girls, Sally and Betsey, shout that a wagon is coming along the river.', 'clara'),
        nar('Her husband Bob lies upstairs, unable to move or speak, three months after a mustang kicked him behind the ear. She has buried three sons on the knoll by the house.', 'clara'),
        emote('clara', '...'),
      ] },
      { steps: [
        par(go('team', [[250, 250]], { speed: 16 }), go('zwey', [[280, 240]], { speed: 16 })),
        { show: 'elmira' }, { set: 'elmira', v: { x: 236, y: 256, pose: 'front' } },
        say('elmira', 'Is Dee Boot here?'),
        nar('A heavily pregnant woman climbs down from a buffalo-hide wagon, asks for Dee Boot, and topples over. Big Zwey carries her into the house like a child.', 'elmira'),
        { fall: 'elmira', blood: false },
      ] },
      { steps: [
        { time: 'night', ms: 2000 }, { hide: 'elmira' }, { time: 'dawn', ms: 2000 },
        nar('Elmira labours all night. At dawn old Cholo, Clara’s white-haired horseman, delivers a tiny boy and breathes on him until he cries. Elmira will not look at the child.', 'cholo'),
        { time: 'night', ms: 2000 }, go('team', [[460, 180]], { speed: 14 }), go('zwey', [[470, 170]], { speed: 14 }),
        nar('The next night she leaves with the hunters, and leaves the baby behind. Clara feeds him boiled milk from a rag, sitting beside Bob.', 'clara'),
      ] },
    ],
  });

  /* ---------- 76 ---------- */
  CH.push({
    n: 76, title: 'The jail window', part: 3,
    scene: town({ seed: 165, place: 'Ogallala, Nebraska', when: 'Dawn', time: 'dawn', actors: {
      team: { kind: 'team', at: [0, 230], cfg: { m1: E.horses.lukemule, m2: E.horses.lukemule } }, zwey: { at: [60, 250], pose: 'front' }, elmira: { at: [20, 240], hidden: true },
      dee: { at: [176, 196], pose: 'front', hidden: true },
    } }),
    beats: [
      { steps: [
        nar('In the wagon Elmira burns with fever and calls for Dee. Luke drives through the night. Zwey believes the baby was his.', 'zwey'),
        go('team', [[120, 230]], { speed: 20 }),
        nar('At dawn drunk cowboys outside a saloon tell them Dee Boot is in jail.', 'elmira'),
      ] },
      { steps: [
        { zoom: 1.4 }, { show: 'elmira' }, { set: 'elmira', v: { x: 176, y: 216, pose: 'front' } }, go('zwey', [[180, 222]]), { show: 'dee' },
        say('dee', 'They’re hanging me Friday, Ellie.'),
        nar('Zwey holds her up to the barred window. Dee, unshaven and scared, says he killed a settler’s boy while driving settlers off for the cattlemen, and he will hang.', 'dee'),
        emote('zwey', '!'), { fall: 'elmira' },
        nar('Zwey finds her blood running over his arms. Dee shouts for a doctor as she passes out.', 'zwey'),
      ] },
    ],
  });

  /* ---------- 77 ---------- */
  CH.push({
    n: 77, title: 'July finds the Platte', part: 3,
    scene: plains({ place: 'Near the Republican River', when: 'Summer', actors: { july: { at: [230, 230], pose: 'front' } } }),
    beats: [
      { steps: [
        nar('North of Dodge his new horse cripples itself. July shoots it, walks back, swims the Arkansas, buys another, and heads north again.', 'july'),
        { weather: { rain: 'heavy' } }, { time: 'night', ms: 1500 }, { fall: 'july', blood: false },
        nar('Near the Republican a snake bites him in his sleep. Feverish in the rain, he talks to the dead Roscoe. He lives, crawls to the river, and crosses it five days later.', 'july'),
        { rise: 'july' },
      ] },
      { scene: ranch({ place: 'Clara’s ranch', when: 'Noon', actors: {
          july: { at: [460, 260], pose: 'side' }, cholo: { at: [440, 250], mount: 'hc3' }, clara: { at: [200, 214], pose: 'front' }, sally2: { at: [260, 236], pose: 'front' }, betsey: { at: [276, 240], pose: 'front' },
        } }),
        steps: [
          par(go('july', [[230, 232]], { speed: 12 }), go('cholo', [[260, 226]], { speed: 12 })),
          nar('He reaches the Platte, and white-haired Cholo brings him in. Clara is scolding her daughters from the steps, a baby in her arms.', 'clara'),
          say('clara', 'Your wife was here, three weeks ago.'),
          emote('july', '...'),
          nar('July breaks down. Then Clara tells him the baby, whom she has been calling Martin, is Elmira’s, and so his. He can’t take it in. He sleeps, and Clara is glad.', 'clara'),
        ] },
    ],
  });

  /* ---------- 78 ---------- */
  CH.push({
    n: 78, title: 'A night in the grass', part: 3,
    scene: plains({ time: 'dusk', place: 'Kansas, south of the Republican', when: 'Dusk', props: [['tent', 230, 200]], actors: {
      lorena: { at: [230, 220], pose: 'front' }, gus: { at: [0, 240], mount: 'wilbay' }, dish: { at: [300, 250], pose: 'front' },
    } }),
    beats: [
      { steps: [
        go('gus', [[260, 236]], { speed: 20 }), { set: 'gus', v: { mount: null, pose: 'front' } },
        nar('After three days Gus rides back, dirty and whiskered. Dish reports Lorena safe, and hears the thieves and Jake Spoon were hanged.', 'dish'),
        say('gus', 'How about a hug, Lorie?'),
        emote('lorena', '♥'),
        nar('She clings to him, and finds she feels very little about Jake.', 'lorena'),
      ] },
      { steps: [
        { time: 'night', ms: 2000 }, { weather: { moon: 'full' } },
        nar('She dreams Gus has died. They go out into the moonlight, where he talks of mountains, and says Nebraska lies beyond the Republican, three weeks off.', 'gus'),
        say('lorena', 'I’m afraid you’ll die. Or marry Clara.'),
        nar('They drag the bedding out onto the grass and he holds her all night. They wake after the herd has gone on without them.', 'lorena'),
        { time: 'dawn', ms: 2000 },
      ] },
    ],
  });

  /* ---------- 79 ---------- */
  CH.push({
    n: 79, title: 'The Republican', part: 3,
    scene: campN({ place: 'Kansas', when: 'Summer', actors: {
      dish: { at: [200, 216], pose: 'front' }, bert: { at: [226, 218], pose: 'front' }, newt: { at: [150, 214], pose: 'front' }, deets: { at: [140, 226], pose: 'front' },
      call: { at: [460, 200], mount: 'hellbitch' }, bull: { kind: 'cow', at: [320, 300], cfg: { coat: '#9a5a2a', patch: '#efe6cf', brindle: true }, cfgKey: 'bull' },
    } }),
    beats: [
      { steps: [
        nar('Newt now rides Jake’s pacer every third day and broods on the hanging. The Texas bull has shouldered Old Dog aside to lead the herd.', 'newt'),
        say('bert', 'It was Lorena ruined Jake.'),
        { fall: 'dish', blood: false }, { fall: 'bert', blood: false }, { dust: [212, 218], n: 12 },
        nar('Dish and Bert unbuckle their gun belts and roll red-faced in the dirt. Call rides up, looks, and rides off without a word.', 'call'),
        go('call', [[240, 200], [0, 180]], { speed: 20 }), { rise: 'dish' }, { rise: 'bert' },
      ] },
      { steps: [
        { time: 'night', ms: 1500 }, { prop: ['campfire', 150, 234] },
        say('deets', 'The Captain and Mr. Gus are sorry, Newt. Jake’s at peace.'),
        nar('Deets mends Newt’s bridle by the fire and puts a hand on his shoulder.', 'deets'),
      ] },
      { scene: plains({ river: 'arkansas', place: 'The Republican River', when: 'Afternoon', actors: { jasper: { at: [230, 220], pose: 'front' }, ...cows('c', 14, 60, 350, 340, 50, 79) } }),
        steps: [
          { move: 'c', by: [0, -150], speed: 16 },
          nar('The herd swims the Republican without losing an animal. Jasper, who hates rivers, dances a jig.', 'jasper'),
          nar('Word comes that every hand gets half pay in Ogallala. Po Campo keeps warning that dry country lies ahead.', 'pocampo'),
        ] },
    ],
  });

  /* ---------- 80 ---------- */
  CH.push({
    n: 80, title: 'The doctor’s house', part: 3,
    scene: bedroom({ time: 'noon', place: 'A doctor’s house in Ogallala', when: 'Weeks later', weather: { rain: 'light' }, actors: {
      elmira: { at: [150, 120], pose: 'front' }, doctor: { at: [110, 130], pose: 'front' }, zwey: { at: [40, 70], pose: 'front' }, july: { at: [190, 200], hidden: true },
    } }),
    beats: [
      { steps: [
        nar('For weeks a consumptive red-bearded doctor nurses Elmira through fever, while Zwey stands at the window day and night.', 'doctor'),
        say('doctor', 'Dee Boot was hanged. They buried him on Boot Hill.'),
        emote('elmira', '...'),
        nar('She thinks of refusing food, and of asking Zwey to shoot her.', 'elmira'),
      ] },
      { steps: [
        { weather: { rain: null } }, { show: 'july' }, go('july', [[150, 170]], { speed: 10 }),
        say('july', 'Joe’s dead, Ellie. And Roscoe. The baby’s safe, with Clara.'),
        nar('July walks in weeping. She will not speak to him or look at him. He holds her hand a moment and goes.', 'july'),
        go('july', [[190, 230]], { speed: 10 }),
      ] },
      { scene: plains({ time: 'dusk', place: 'East of Ogallala', when: 'Sunset', actors: { team: { kind: 'team', at: [100, 230], cfg: { m1: E.horses.lukemule, m2: E.horses.lukemule } }, zwey: { at: [80, 244], pose: 'front' } } }),
        steps: [
          go('team', [[460, 220]], { speed: 14 }), walk('zwey', [[440, 236]], { speed: 14 }),
          nar('As soon as July rides off, Elmira has Zwey hitch the wagon. Ignoring a warning about the Sioux, they head east for St. Louis.', 'elmira'),
        ] },
    ],
  });

  /* ---------- 81 ---------- */
  CH.push({
    n: 81, title: 'Roasting ears', part: 3,
    scene: ranch({ time: 'night', lit: true, place: 'Clara’s ranch', when: 'Night', actors: {
      july: { at: [220, 212], pose: 'front' }, clara: { at: [196, 210], pose: 'front' }, cholo: { at: [200, 380], pose: 'side' },
    } }),
    beats: [
      { steps: [
        nar('July comes back from town too crushed to speak. He helps Clara lift and wash her husband, then sits sick on the porch steps.', 'july'),
        say('clara', 'She doesn’t want you, July. Nor the baby.'),
        nar('Clara says it plainly, bathing his forehead. She offers to raise Martin herself, and to hire July. Cholo can’t do Bob’s work forever.', 'clara'),
        go('cholo', [[340, 280]], { speed: 12 }),
      ] },
      { scene: town({ seed: 166, place: 'Ogallala', when: 'Next day', actors: { july: { at: [230, 236], mount: 'hc3' }, doctor: { at: [300, 222], pose: 'front' } } }),
        steps: [
          say('doctor', 'She left yesterday. East, into Sioux country.'),
          nar('Elmira is gone. July races back for his gear, slows to spare the borrowed horse, and weeps behind the saddle shed.', 'july'),
        ] },
      { scene: ranch({ place: 'Clara’s ranch', when: 'Afternoon', actors: { july: { at: [330, 210], pose: 'front' }, clara: { at: [300, 214], pose: 'front' } } }),
        steps: [
          say('clara', 'Come help me shuck this corn.'),
          nar('Clara finds him there with a basket of garden vegetables, and asks him to shuck roasting ears.', 'clara'),
        ] },
    ],
  });

  /* ---------- 82 ---------- */
  CH.push({
    n: 82, title: 'Three cranes', part: 3,
    scene: ranch({ place: 'The horse lots', when: 'A hot, dusty day', cam: [380, 270], actors: {
      clarahat: { at: [370, 270], pose: 'front' }, july: { at: [396, 276], pose: 'front' }, cholo: { at: [350, 276], pose: 'front' }, colt: { kind: 'horse', who: 'hc1', at: [380, 290] },
    } }),
    beats: [
      { steps: [
        nar('In a man’s hat, Clara gelds the young horses that have waited since Bob’s accident. To July’s surprise she does the cutting while he and Cholo hold the ropes. They do fifteen.', 'clarahat'),
        say('clarahat', 'I know Red Cloud. His people lived on our horses one winter.'),
      ] },
      { steps: [
        { set: 'clarahat', v: { x: 200, y: 214 } }, { set: 'july', v: { x: 224, y: 214 } }, cam(210, 210, 1200),
        nar('On the porch she all but drops the baby in July’s lap. Martin squirms and howls, until July hums an old song against his shoulder and he quiets.', 'july'),
        say('clarahat', 'Stay on. Be his father.'),
      ] },
      { steps: [
        { time: 'dusk', ms: 2500 },
        nar('At sunset three cranes fly along the silver Platte.', 'july'),
        say('july', 'I’ll let Elmira be.'),
        nar('July puts his rifle back in its scabbard.', 'july'),
      ] },
    ],
  });

  /* ---------- 83 ---------- */
  CH.push({
    n: 83, title: 'The cavalry', part: 3,
    scene: plains({ brown: true, place: 'South of the Platte', when: 'Long hot days', actors: {
      gus: { at: [220, 230], mount: 'wilbay' }, deets: { at: [250, 236], mount: 'wishbone' }, call: { at: [200, 250], mount: 'hellbitch' },
      weaver: { at: [230, 40], mount: 'hc1' }, dixon: { at: [260, 44], mount: 'dixonblack' },
      ...Object.fromEntries(Array.from({ length: 10 }, (_, i) => ['tr' + i, { who: 'soldier', at: [120 + i * 24, 20 + (i % 2) * 10], mount: 'hc' + (i % 9) }])),
    } }),
    beats: [
      { steps: [
        nar('Within a week of Ogallala the crew talks of nothing but women. Deets reports the Platte ten miles ahead, but he seems low. He says he doesn’t like the north and its thin light.', 'deets'),
        say('deets', 'I’d rather be back on the river, Mr. Gus.'),
      ] },
      { steps: [
        par(go('weaver', [[230, 170]], { speed: 20 }), go('dixon', [[260, 176]], { speed: 20 })),
        nar('Nearly forty cavalry ride down on worn-out horses. The little captain, Weaver, is drunk. His scout Dixon is huge and insolent.', 'weaver'),
        say('weaver', 'Red Cloud’s out. I’ll take your spare horses. And that scout.'),
        say('call', 'You’ll take nothing.'),
        nar('Call and Gus refuse flatly. The troop sits on its ridge a few minutes, then rides away.', 'gus'),
        par(go('weaver', [[230, 0]], { speed: 16 }), go('dixon', [[260, 0]], { speed: 16 })),
      ] },
    ],
  });

  /* ---------- 84 ---------- */
  CH.push({
    n: 84, title: 'Ogallala', part: 3,
    scene: plains({ place: 'North of the Platte', when: 'Afternoon', props: [['tent', 230, 200]], actors: {
      lorena: { at: [230, 222], pose: 'front' }, gus: { at: [260, 226], pose: 'front' },
      ...Object.fromEntries(['dish', 'soupy', 'bert', 'jasper', 'needle', 'allen'].map((id, i) => [id, { at: [120 + i * 14, 300], mount: 'hc' + i }])),
    } }),
    beats: [
      { steps: [
        ...['dish', 'soupy', 'bert', 'jasper', 'needle', 'allen'].map((id, i) => walk(id, [[460, 260 + i * 6]], { speed: 44 })),
        nar('The herd crosses the Platte east of Ogallala. Six hands in fresh shirts race off whooping toward the shacks of town.', 'dish'),
        say('lorena', 'I won’t go. Clara will take you from me.'),
        nar('Lorena, terrified of meeting Clara, won’t go to town. Call stays with the herd. Gus rides in alone.', 'gus'),
      ] },
      { scene: { ...saloon, place: 'A saloon under the elk horns', when: 'Night', zoom: 1.2, actors: { gus: { at: [160, 180], pose: 'front' }, shaw: { at: [120, 120], pose: 'front' }, nellie: { at: [140, 122], pose: 'front' } } },
        steps: [
          nar('Gus buys Lorena a mountain of clothes, and himself a black frock coat. In a saloon full of Army mule skinners, a gambler called Shaw slaps a teenage girl, Nellie.', 'nellie'),
          go('gus', [[124, 130]]), { fall: 'shaw', blood: false }, { dust: [110, 120], n: 8 },
          nar('Gus knocks him across a table, then gives Nellie twenty dollars to buy herself free.', 'gus'),
        ] },
      { scene: plains({ time: 'night', weather: { moon: 'full' }, place: 'North of the Platte', when: 'Full moon', props: [['tent', 230, 200]], actors: { lorena: { at: [230, 222], pose: 'front' }, gus: { at: [260, 226], pose: 'front' } } }),
        steps: [
          emote('lorena', '...'),
          nar('He rides back under the full moon to find Lorena crying outside the tent, sure that Clara will take him away.', 'lorena'),
        ] },
    ],
  });

  /* ---------- 85 ---------- */
  CH.push({
    n: 85, title: 'The anvil', part: 3,
    scene: town({ seed: 167, place: 'Ogallala', when: 'Afternoon', props: [['crate', 300, 250]], zoom: 1.2, actors: {
      newt: { at: [200, 236], pose: 'front' }, ben: { at: [180, 238], pose: 'front' }, pete: { at: [220, 240], pose: 'front' },
      dish: { at: [260, 240], pose: 'front' }, sugar: { kind: 'horse', who: 'sugar', at: [280, 246] }, dixon: { at: [340, 236], mount: 'dixonblack' },
      call: { at: [0, 230], mount: 'hellbitch' }, gus: { at: [-20, 240], mount: 'wilbay' },
    } }),
    beats: [
      { steps: [
        nar('Newt, the Raineys and Pete Spettle are too shy to go into anything, so they sit in the shade eating horehound candy.', 'newt'),
        go('dixon', [[290, 236]], { speed: 14 }),
        say('dixon', 'I’ll take that mare.'),
        nar('The Army scout Dixon wants Dish’s pet mare Sugar. He spits tobacco on Dish and clubs him down with his pistol.', 'dixon'),
        { fall: 'dish' },
        nar('Newt hangs on to Sugar’s bit while Dixon lashes him with a quirt, and breaks Pete’s nose with a backhand.', 'newt'),
      ] },
      { steps: [
        go('call', [[284, 236]], { speed: 60 }), { set: 'dixon', v: { mount: null } }, { fall: 'dixon' }, { dust: [290, 240], n: 20 },
        nar('Call charges on the Hell Bitch and knocks Dixon’s horse down. Then he beats Dixon, and bangs his head on a blacksmith’s anvil.', 'call'),
        go('gus', [[270, 226]], { speed: 40 }),
        nar('Gus has to drop a rope over him to stop him.', 'gus'),
      ] },
      { steps: [
        say('call', 'I won’t tolerate rude talk.'),
        go('call', [[460, 220]], { speed: 20 }),
        nar('Call rides out. Gus tells the stunned hands Call once killed a Mexican bandit the same way, for scorning him. Then he helps himself to their candy.', 'gus'),
        { rise: 'dish' },
      ] },
    ],
  });

  /* ---------- 86 ---------- */
  CH.push({
    n: 86, title: 'Ten-dollar gold pieces', part: 3,
    scene: town({ seed: 168, time: 'dusk', place: 'Ogallala', when: 'Sunset', actors: {
      newt: { at: [120, 290], pose: 'front' }, ben: { at: [100, 292], pose: 'front' }, jim: { at: [140, 294], pose: 'front' }, pete: { at: [160, 292], pose: 'front' }, lippy: { at: [200, 280], pose: 'front' },
      gus: { at: [300, 230], pose: 'front' },
    } }),
    beats: [
      { steps: [
        nar('Leaving town, Gus quietly hands Newt, the Raineys and Pete a ten-dollar gold piece each.', 'gus'),
        say('lippy', 'Gus paid Lorena fifty dollars once, you know.'),
        nar('Lippy blurts it out, then buys the boys beer and whiskey to make them forget. They drink behind the livery stable as the sun goes down. Jimmy is sick.', 'lippy'),
      ] },
      { steps: [
        { time: 'night', ms: 2000 },
        nar('Newt leads the way up the back stairs of a saloon. Pete backs out. A big girl called Buf takes Newt: quick, awkward, and over. The Raineys go with another girl.', 'newt'),
        nar('Later they find Lippy squeezing a new accordion, and the Irishman buys them a beer.', 'lippy'),
      ] },
      { scene: plains({ time: 'night', weather: { moon: 'full' }, place: 'Between town and camp', when: 'Moonlight', actors: { newt: { at: [100, 230], mount: 'hc3' }, ben: { at: [120, 240], mount: 'hc4' } } }),
        steps: [
          emote('newt', '!'), { set: 'newt', v: { mount: null } }, walk('ben', [[460, 200]], { speed: 60 }),
          nar('Riding home, their horses spook at something, maybe a panther. Newt walks the last two miles.', 'newt'),
          nar('His horse is already back at camp. He falls asleep holding a piece of cold beef Po Campo gave him.', 'newt'),
          go('newt', [[460, 240]], { speed: 12 }),
        ] },
    ],
  });

  /* ---------- 87 ---------- */
  CH.push({
    n: 87, title: 'Clara and Gus', part: 3,
    scene: ranch({ place: 'Clara’s ranch', when: 'A fair summer day', actors: {
      clara: { at: [200, 212], pose: 'front' }, sally2: { at: [170, 214], pose: 'front' }, betsey: { at: [150, 216], pose: 'front' },
      gus: { at: [460, 180], mount: 'wilbay' }, call: { at: [470, 200], mount: 'hellbitch' }, lorena: { at: [480, 190], mount: 'memphisb' }, newt: { at: [470, 210], mount: 'hc2' },
    } }),
    beats: [
      { steps: [
        par(go('gus', [[240, 226]], { speed: 18 }), go('call', [[270, 236]], { speed: 18 }), go('lorena', [[256, 246]], { speed: 18 }), go('newt', [[290, 242]], { speed: 18 })),
        nar('Clara hears Gus’s voice after sixteen years, walks straight into his arms and kisses him on the mouth. Her daughters stare. Lorena looks at the ground.', 'clara'),
        { set: 'gus', v: { mount: null, x: 214, y: 220, pose: 'front' } }, emote('clara', '♥'),
        nar('Then Clara treats Lorena warmly, and hands Gus baby Martin.', 'clara'),
      ] },
      { steps: [
        cam(380, 270, 1200), { set: 'clara', v: { x: 370, y: 270 } }, { set: 'call', v: { mount: null, x: 396, y: 276, pose: 'front' } },
        nar('Clara is the horse trader here. She names a stiff price and outstares Call. Privately she reproaches Gus for all the years wasted with Call.', 'clara'),
      ] },
      { steps: [
        nar('At a picnic under the cottonwoods on the Platte, the young ones wade and Call drinks half the buttermilk. A big grey wolf lopes out of the riverbed.', 'gus'),
        say('clara', 'Leave Lorena with me. And that boy is Call’s son.'),
        nar('Walking back, Clara presses Gus: leave Lorena here. She has seen at once that Newt is Call’s son. She gives Newt a three-year-old sorrel with a white star.', 'clara'),
        { spawn: 'candy', kind: 'horse', who: 'candy', at: [310, 250] },
      ] },
    ],
  });

  /* ---------- 88 ---------- */
  CH.push({
    n: 88, title: 'Lorena stays', part: 3,
    scene: ranch({ time: 'night', lit: true, place: 'Clara’s ranch', when: 'Night', actors: {
      gus: { at: [214, 206], pose: 'front' }, clara: { at: [196, 206], pose: 'front' }, lorena: { at: [240, 214], pose: 'front' }, july: { at: [260, 216], pose: 'front' },
      wilbay: { kind: 'horse', who: 'wilbay', at: [280, 240] }, cholo: { at: [300, 244], mount: 'hc3' },
    } }),
    beats: [
      { steps: [
        nar('Call and Newt take the horses back to the herd. Clara leads Gus by lantern to sit an hour with Bob, whose eyes stay open.', 'clara'),
        nar('On the upper porch she teases him about Lorena. He admits he’d give up everything for Clara, and tries a feeble kiss. She laughs. She won’t marry again.', 'gus'),
      ] },
      { steps: [
        say('clara', 'Stay with us, Lorena.'),
        nar('Lorena, reminded of her grandmother’s house, wants to. Gus says he’s glad for her.', 'lorena'),
        { set: 'gus', v: { mount: 'wilbay' } }, { remove: 'wilbay' },
        nar('He won’t wait for morning. He kisses them both and rides toward the Platte with Cholo. Clara, holding the colicky baby, cries.', 'clara'),
        par(go('gus', [[460, 330]], { speed: 18 }), go('cholo', [[460, 340]], { speed: 18 })),
      ] },
    ],
  });

  /* ---------- 89 ---------- */
  CH.push({
    n: 89, title: 'Eighty dry miles', part: 3,
    scene: wyoming({ place: 'Leaving the Platte', when: 'High summer', actors: {
      pocampo: { at: [230, 230], pose: 'front' }, newt: { at: [200, 250], mount: 'candy' }, gus: { at: [260, 240], mount: 'wilbay' }, dish: { at: [300, 236], mount: 'dishsorrel' },
    } }),
    beats: [
      { steps: [
        nar('Gus comes back without Lorena, and Dish sours. Newt names Clara’s sorrel Candy. The herd leaves the Platte for Wyoming. Po Campo grieves to leave the river.', 'pocampo'),
        { map: { fit: pts(M.clara, M.salt, M.dove), places: [M.clara, M.salt], title: 'Into Wyoming', when: 'Eighty dry miles',
          trails: [{ id: 'dr', pts: [[-98.9, 26.9], [-98.49, 29.42], [-98.1, 30.3], [-97.33, 32.75], [-98.9, 34.2], [-99.1, 35.8], [-100.3, 37.9], [-101.2, 40.6], [-101.95, 41.1]], col: '#c8402a', from: 8 },
            { id: 'wy', pts: [[-101.95, 41.1], [-103.8, 41.9], [-105.3, 42.8], [-106.3, 43.55]], col: '#c8402a', icon: 'herd' }] } },
        { trail: { id: 'wy', to: 3, speed: 0.8 } },
        { scene: true },
        nar('Deets finds no water. Call rides the Hell Bitch sixty miles to Salt Creek’s pools and back, and decides to push on across eighty dry miles.', 'call'),
      ] },
      { scene: wyoming({ time: 'dusk', weather: { sand: true }, place: 'The dry stretch', when: 'Blood-red sunset', actors: { newt: { at: [200, 250], mount: 'candy' }, ...cows('c', 20, 40, 260, 380, 120, 89) } }),
        steps: [
          { move: 'c', by: [-200, 30], speed: 30, jitter: 50 },
          nar('At a blood-red sunset a hot sandstorm hits. The men blindfold their horses with their shirts while strings of cattle drift away.', 'newt'),
        ] },
      { scene: wyoming({ time: 'night', weather: {}, pools: true, place: 'Salt Creek', when: 'Night', actors: { call: { at: [200, 200], mount: 'hellbitch' }, deets: { at: [226, 196], mount: 'wishbone' }, ...cows('c', 16, 40, 200, 380, 60, 90) } }),
          steps: [
            emote('call', 'z', { ms: 1500 }),
            nar('The cattle go blind with thirst. Call, sleepless, dozes in the saddle, and wakes to find Deets leading his mare.', 'deets'),
            { move: 'c', by: [0, 110], speed: 30, jitter: 50 },
            nar('The herd smells water and trots into Salt Creek. They lose only six head.', 'call'),
          ] },
    ],
  });

  /* ---------- 90 ---------- */
  CH.push({
    n: 90, title: 'Deets', part: 3,
    scene: wyoming({ bad: true, place: 'The badlands', when: 'Midday', actors: {
      call: { at: [80, 240], mount: 'hellbitch' }, gus: { at: [60, 250], mount: 'wilbay' }, deets: { at: [100, 236], mount: 'wishbone' },
    }, props: [['tepee', 330, 200, { ragged: true }], ['tepee', 370, 220, { ragged: true }], ['tepee', 300, 240], ['tepee', 390, 180]] }),
    beats: [
      { steps: [
        nar('On Salt Creek, Indians on foot steal twelve horses in the night. Call, Gus and Deets follow them more than a hundred miles into rattlesnake badlands.', 'call'),
        par(go('call', [[230, 232]], { speed: 20 }), go('gus', [[210, 244]], { speed: 20 }), go('deets', [[250, 228]], { speed: 20 })),
        nar('In a draw they find a tiny band of starving people, mostly women, children and old men, eating one of the horses. Call fires in the air to scatter them.', 'gus'),
        { shoot: 'call', up: true, n: 1 },
      ] },
      { steps: [
        { zoom: 1.4 }, { set: 'deets', v: { mount: null, x: 300, y: 250, pose: 'front' } }, { spawn: 'brave', at: [380, 240] },
        nar('A blind little child has been left behind in the dirt. Deets picks it up, smiling.', 'deets'),
        go('brave', [[306, 248]], { speed: 60 }), emote('deets', '!'), { fall: 'deets' },
        nar('A teenage boy runs at him screaming with an old lance, and drives it into Deets’s chest.', 'deets'),
        { shoot: 'call', at: 'brave', n: 1 }, { shoot: 'gus', at: 'brave', n: 1 }, { fall: 'brave' },
        nar('Call and Gus shoot the boy. Deets dies there in the draw.', 'gus'),
      ] },
      { scene: wyoming({ river: true, time: 'dawn', weather: {}, place: 'Where Salt Creek meets the Powder', when: 'Dawn to sunset', props: [['grave', 230, 220]], actors: { call: { at: [210, 226], pose: 'front' }, gus: { at: [256, 226], pose: 'front' }, newt: { at: [180, 240], pose: 'front' } } }),
        steps: [
          emote('newt', '...'),
          nar('They carry him back to the herd before dawn. They bury him on a rise above the Powder while the Irishman sings.', 'newt'),
          nar('Call sits all day by the grave carving a long tribute into a board from the wagon. Gus ties his faded Texas medal to it.', 'call'),
          say('gus', 'You ought to tell the boy you’re his father, Woodrow.'),
        ] },
    ],
  });

  /* ---------- 91 ---------- */
  CH.push({
    n: 91, title: 'The grizzly', part: 3,
    scene: montana({ trees: true, place: 'Up the Powder River', when: 'Crisp mornings', actors: {
      call: { at: [230, 220], mount: 'hellbitch' }, newt: { at: [200, 240], mount: 'candy' }, ...cows('c', 14, 60, 280, 340, 90, 91),
    } }),
    beats: [
      { steps: [
        nar('Up the Powder the crew is quiet. Across the river the Bighorn Mountains have snow on top, and the nights turn cold.', 'call'),
        nar('Call does the scouting now. He finds the tracks of forty Indians heading north-west. A week of dread passes with no attack.', 'call'),
      ] },
      { scene: montana({ trees: true, river: true, place: 'Off Crazy Woman Creek', when: 'Morning', zoom: 1.2, actors: {
          bear: { kind: 'bear', at: [180, 150] }, bull: { kind: 'cow', at: [300, 250], cfg: { coat: '#9a5a2a', patch: '#efe6cf', brindle: true }, cfgKey: 'bull' },
          dish: { at: [260, 230], mount: 'dishsorrel' }, call: { at: [230, 250], mount: 'hellbitch' }, team: { kind: 'team', at: [120, 260], cfg: { m1: E.horses.greasy, m2: E.horses.kickboy } },
        } }),
        steps: [
          go('bear', [[220, 200]], { speed: 14 }), emote('dish', '!'),
          walk('dish', [[460, 300]], { speed: 60 }), walk('team', [[460, 420]], { speed: 60 }),
          nar('A huge grizzly steps out of a thicket. Dish’s horse bolts, the mules run off with Lippy bouncing on the wagon, and the remuda stampedes.', 'dish'),
          go('bull', [[232, 206]], { speed: 50 }), { dust: [226, 204], n: 30 },
          nar('The Texas bull charges the bear. They roll over and over, bellowing and roaring, and fight to a draw.', 'call'),
          walk('bear', [[0, 90]], { speed: 20 }),
        ] },
      { steps: [
        { set: 'bull', v: { x: 230, y: 230 } }, { fall: 'bull', blood: true },
        nar('The bleeding bear retreats. The crew pins the bull with five ropes while Po Campo spends two hours stitching his torn hide back on.', 'pocampo'),
        { rise: 'bull' },
        nar('The one-eyed, one-horned bull falls behind, but rejoins the herd a week later.', 'call'),
      ] },
    ],
  });

  /* ---------- 92 ---------- */
  CH.push({
    n: 92, title: 'Bob Allen', part: 3,
    scene: ranch({ place: 'Clara’s ranch', when: 'Late summer', actors: {
      lorena: { at: [300, 214], pose: 'front' }, ...Object.fromEntries(Array.from({ length: 6 }, (_, i) => ['hen' + i, { kind: 'chicken', at: [280 + (i % 3) * 14, 230 + Math.floor(i / 3) * 10], cfg: { coat: i % 2 ? '#c89a5a' : '#e8e0cc' }, wander: [300, 236, 20] }])),
      clara: { at: [200, 212], pose: 'front' },
    } }),
    beats: [
      { steps: [
        nar('Lorena settles in: she looks after thirty hens, does the washing, comforts Betsey through her nightmares. She rarely misses Gus, except in sudden pangs tied to her fear of Blue Duck.', 'lorena'),
        nar('Two weeks later Bob Allen dies in the night.', 'clara'),
      ] },
      { scene: ranch({ time: 'dawn', bobgrave: true, place: 'The ridge above the barn', when: 'Windy dawn', actors: { clara: { at: [110, 124], pose: 'front' }, cholo: { at: [134, 126], pose: 'front' } } }),
        steps: [
          nar('At dawn Clara sits with Cholo on the mound of dirt beside the new grave, near her boys’, drinking coffee and wondering what death is.', 'clara'),
          nar('Bob is buried by a drunken preacher and the German neighbours. The preacher ends the day passed out on the floor, and Clara comforts guilt-stricken Sally.', 'clara'),
        ] },
    ],
  });

  /* ---------- 93 ---------- */
  CH.push({
    n: 93, title: 'Montana', part: 3,
    scene: montana({ place: 'Montana', when: 'Cool, deep blue sky', actors: {
      call: { at: [230, 230], mount: 'hellbitch' }, gus: { at: [260, 236], mount: 'wilbay' }, ...cows('c', 20, 40, 280, 380, 120, 93), ...pigs([160, 260], [174, 264]),
    } }),
    beats: [
      { steps: [
        nar('The herd moves into Montana. Tall grass and yellow flowers, elk and antelope and buffalo under a deep blue sky. Call admits Jake was right about Montana.', 'call'),
        say('gus', 'Them pigs are the first to walk from Texas to Montana.'),
      ] },
      { steps: [
        { weather: { snow: 'light' } }, { time: 'dawn', ms: 1500 },
        nar('An early storm off the Bighorns leaves a thin snow overnight. Po Campo dusts Newt’s wet socks with flour so his boots will go on.', 'pocampo'),
      ] },
      { scene: montana({ place: 'Fifteen miles ahead of the herd', when: 'Cloudless morning', actors: { gus: { at: [220, 230], mount: 'wilbay' }, newt: { at: [250, 236], mount: 'candy' }, bear: { kind: 'bear', at: [60, 130] } } }),
        steps: [
          nar('Scouting far ahead, Gus spots a grizzly upwind. Then he tells Newt plainly.', 'gus'),
          say('gus', 'Call’s your pa, Newt.'),
          emote('newt', '...'),
          nar('Newt is confused and let down. It feels as though the news has spoiled Montana.', 'newt'),
        ] },
    ],
  });

  /* ---------- 94 ---------- */
  CH.push({
    n: 94, title: 'North of the Yellowstone', part: 3,
    scene: montana({ river: true, place: 'The Yellowstone', when: 'Clear blue sky', actors: {
      gus: { at: [200, 380], mount: 'wilbay' }, pea: { at: [230, 390], mount: 'sardine' },
      ...Object.fromEntries(Array.from({ length: 8 }, (_, i) => ['bf' + i, { kind: 'buffalo', at: [120 + i * 26, 250 + (i % 2) * 14] }])),
    } }),
    beats: [
      { steps: [
        nar('Call sends Gus and Pea Eye to scout for ranch land beyond the Yellowstone.', 'pea'),
        par(go('gus', [[220, 250]], { speed: 20 }), go('pea', [[240, 260]], { speed: 20 })),
        { move: 'bf', by: [200, -100], speed: 40 }, walk('gus', [[400, 150]], { speed: 44 }),
        nar('Across the river, Gus chases a herd of buffalo just for the joy of it.', 'gus'),
      ] },
      { scene: montana({ bank: true, place: 'A creek three days north', when: 'Morning', mtns: false, actors: {
          gus: { at: [230, 100], mount: 'wilbay' }, pea: { at: [200, 200], mount: 'sardine' },
          ...Object.fromEntries(Array.from({ length: 10 }, (_, i) => ['bl' + i, { who: 'kiowa', at: [140 + i * 22, -10 - (i % 2) * 20], mount: i % 2 ? 'kiowapony' : 'kiowapony2' }])),
        } }),
        steps: [
          { move: 'bl', by: [0, 80], speed: 40, jitter: 20 },
          ...Array.from({ length: 3 }, (_, i) => ({ shoot: 'bl' + (i * 3), at: 'gus', n: 1, gap: 200 })),
          go('gus', [[230, 286]], { speed: 60 }), emote('gus', '!'),
          nar('Three days north Gus rides over a rise into a war party of about twenty. He takes two arrows in his left leg. They race for a creek.', 'gus'),
          { set: 'gus', v: { mount: null, x: 230, y: 300 } }, { set: 'pea', v: { mount: null, x: 250, y: 302 } },
          { shoot: 'gus', at: 'bl1', n: 1 }, { fall: 'bl1' }, { shoot: 'gus', at: 'bl4', n: 1 }, { fall: 'bl4' },
          nar('Under a steep bank they lose both horses. Gus kills several attackers, and they dig a cave in the bank. Gus forces the deep arrow through his leg, and faints.', 'pea'),
        ] },
      { steps: [
        { time: 'night', ms: 2000 }, { weather: { rain: 'heavy', lightning: true } },
        say('gus', 'Go get Call, Pea. Swim for it.'),
        nar('A cloudburst floods the creek. Feverish, Gus sends Pea to swim downstream in the dark and fetch Call. Pea loses his clothes, rifle and food in the current.', 'pea'),
        walk('pea', [[460, 350]], { speed: 20 }),
      ] },
      { scene: montana({ place: 'The plains to the south', when: 'Days later', actors: { pea: { at: [230, 230], pose: 'front' }, dish: { at: [460, 260], mount: 'dishsorrel' }, call: { at: [470, 270], mount: 'hellbitch' } } }),
        steps: [
          nar('Pea walks south naked and barefoot for three days, feeling Deets beside him the whole way.', 'pea'),
          par(go('dish', [[260, 236]], { speed: 30 }), go('call', [[276, 246]], { speed: 30 })),
          nar('Dish spots him. Call wraps him in his slicker, puts Dish in charge, and rides north alone to find Gus.', 'call'),
          go('call', [[230, 0]], { speed: 34 }),
        ] },
    ],
  });

  /* ---------- 95 ---------- */
  CH.push({
    n: 95, title: 'Old Hugh', part: 3,
    scene: montana({ bank: true, mtns: false, time: 'night', place: 'The cave under the bank', when: 'Night, the creek running high', actors: { gus: { at: [230, 296], pose: 'front' } } }),
    beats: [
      { steps: [
        nar('All night, shaking with fever, Gus sits with his pistol cocked, watching the black water for Indians floating down on logs. In delirium he sees Clara’s face.', 'gus'),
        { time: 'dawn', ms: 2000 },
        nar('By morning his leg is yellow with black streaks: blood poisoning. He makes a crutch from an Indian carbine and his cut-off stirrups, and hobbles south-east toward Miles City.', 'gus'),
        go('gus', [[400, 200]], { speed: 6 }),
      ] },
      { scene: montana({ place: 'The open plain', when: 'Noon', actors: { gus: { at: [230, 240], pose: 'front' }, hugh: { at: [260, 236], pose: 'front' }, custer: { kind: 'horse', who: 'custer', at: [300, 250] } } }),
        steps: [
          { fall: 'gus', blood: false },
          nar('He collapses in the night. At noon he wakes to a tiny, bent old trapper squatting over him with a bowie knife, thinking of taking the leg off.', 'hugh'),
          say('hugh', 'Blood Indians, them was. Here, take my horse.'),
          nar('Old Hugh Auld lends him his spotted horse, Custer, and ties him into the saddle.', 'hugh'),
        ] },
      { scene: town({ seed: 169, time: 'night', lit: true, place: 'Miles City, Montana', when: 'Nightfall', actors: { gus: { at: [0, 230], mount: 'custer' } } }),
        steps: [
          go('gus', [[230, 230]], { speed: 18 }),
          { shoot: 'gus', up: true, n: 3, gap: 500 },
          nar('He reaches Miles City at dark and fires his pistol in front of a saloon for help. As men untie him, the horse bucks him into the street and he passes out.', 'gus'),
          { set: 'gus', v: { mount: null } }, { fall: 'gus', blood: false },
        ] },
    ],
  });

  /* ---------- 96 ---------- */
  CH.push({
    n: 96, title: 'Miles City', part: 3,
    scene: bedroom({ time: 'hot', place: 'A room in Miles City', when: 'Afternoon', extraProps: [], actors: {
      gusbed: { at: [150, 120], pose: 'front' }, mobley: { at: [110, 130], pose: 'front' }, call: { at: [190, 210], hidden: true },
    } }),
    beats: [
      { steps: [
        { fall: 'gusbed', blood: false },
        nar('Gus wakes to find his left leg gone, taken off by a drunken doctor called Mobley. The right leg is black too.', 'gusbed'),
        say('gusbed', 'You’ll not have the other one.'),
        nar('He refuses at gunpoint to let the doctor take it. He drinks all afternoon, and flips a gold piece out of the window to the girl who plays piano in the saloon across the street.', 'gusbed'),
      ] },
      { steps: [
        { time: 'night', ms: 2000 }, { show: 'call' }, go('call', [[160, 160]], { speed: 12 }),
        say('call', 'Let him take it, Gus.'),
        nar('Call arrives at night. He has found the fight, and Pea’s gear. He can’t talk Gus into losing the second leg.', 'call'),
        say('gusbed', 'Bury me in Clara’s orchard, Woodrow. On the Guadalupe.'),
        nar('Gus asks to be buried in Texas, under the live oaks where he picnicked with Clara. He leaves his half of the herd to Lorena, and asks for the old Hat Creek sign over his grave.', 'gusbed'),
      ] },
      { steps: [
        say('gusbed', 'I told Newt, Woodrow. He’s yours.'),
        nar('He writes two notes, one for Clara and one for Lorena, and asks that Pea have his saddle.', 'gusbed'),
        { iris: 0.2, ms: 1200 },
        nar('At nightfall, while Call dozes in the chair, Augustus McCrae dies.'),
        { iris: 1, ms: 1200 },
      ] },
    ],
  });

  /* ---------- 97 ---------- */
  CH.push({
    n: 97, title: 'Salt and charcoal', part: 3,
    scene: town({ seed: 170, place: 'Miles City', when: 'Morning', props: [['coffin', 230, 250]], actors: {
      call: { at: [200, 250], pose: 'front' }, mobley: { at: [260, 246], pose: 'front' }, hugh: { at: [300, 230], pose: 'front' },
    } }),
    beats: [
      { steps: [
        nar('Dr. Mobley offers to pack the body in charcoal and salt and keep it in his harness shed until spring. Call has a sturdy coffin made, and hauls salt from a lick six miles north.', 'mobley'),
        nar('The coffin is sealed and set on two barrels in the shed. Call buys winter coats and building supplies, and hires Old Hugh to drive them north.', 'call'),
      ] },
      { scene: montana({ place: 'The herd, north of the Yellowstone', when: 'A cool wintry wind', actors: {
          call: { at: [0, 230], mount: 'hellbitch' }, dish: { at: [230, 236], mount: 'dishsorrel' }, needle: { at: [260, 240], mount: 'hc3' }, newt: { at: [200, 300], mount: 'candy' }, ...cows('c', 16, 40, 270, 380, 120, 97),
        } }),
        steps: [
          go('call', [[220, 230]], { speed: 14 }),
          say('call', 'Gus is dead.'),
          nar('At the herd, Call tells them plainly, and rides off alone. Newt weeps back on the drag, hidden in the dust.', 'newt'),
          nar('Around the fire that night the men puzzle over the leg and the long road to Texas. Dish decides to go to Lorena when the drive is done.', 'dish'),
        ] },
    ],
  });

  /* ---------- 98 ---------- */
  CH.push({
    n: 98, title: 'The Milk River', part: 3,
    scene: montana({ river: true, ice: false, time: 'noon', weather: { snow: 'light' }, place: 'The Missouri, near Fort Benton', when: 'Bitter cold', props: [['campfire', 230, 220]], actors: {
      jasper: { at: [220, 230], pose: 'front' }, ben: { at: [250, 232], pose: 'front' }, ...cows('c', 12, 40, 340, 380, 60, 98),
    } }),
    beats: [
      { steps: [
        { map: { fit: pts(M.miles, M.benton, M.milk, M.salt), places: [M.salt, M.miles, M.benton, M.milk], title: 'Montana', when: 'The end of the trail',
          trails: [{ id: 'mt', pts: [[-106.3, 43.55], [-106.0, 44.6], [-105.9, 46.3], [-107.5, 47.1], [-110.3, 47.8], [-108.4, 48.5]], col: '#c8402a', icon: 'herd' }] } },
        { trail: { id: 'mt', to: 5, speed: 0.8 } },
        { scene: true },
        nar('They cross the icy Missouri near Fort Benton. A beaver spooks Jasper’s horse and he nearly drowns before Ben Rainey pulls him out.', 'jasper'),
        nar('Past the Marais, two grizzlies are found eating Old Dog. The herd stampedes one last time.', 'call'),
      ] },
      { scene: montana({ snowy: true, trees: true, weather: { snow: 'blizzard' }, time: 'storm', place: 'A creek off the Milk River', when: 'A three-day blizzard', props: [['cabin', 230, 200, { w: 70, lit: true }], ['tent', 330, 230], ['campfire', 180, 230], ['campfire', 280, 240]], actors: {
          call: { at: [330, 250], pose: 'front' }, pocampo: { at: [200, 240], pose: 'front' }, dish: { at: [250, 250], pose: 'front' },
        } }),
        steps: [
          nar('At the Milk River, the last river before Canada, Call picks a timbered creek for headquarters. The drive is over.', 'call'),
          nar('A three-day blizzard hits while the men build a log house. Po Campo makes the fireplace and chimney. Call lives in Wilbarger’s tent.', 'pocampo'),
        ] },
      { scene: montana({ snowy: true, trees: true, place: 'The Milk River ranch', when: 'Snow for miles', props: [['cabin', 230, 200, { w: 70 }]], actors: {
          dish: { at: [230, 240], mount: 'sugar' }, pack: { kind: 'horse', who: 'buckskin', at: [210, 244] }, call: { at: [270, 236], pose: 'front' }, newt: { at: [300, 240], pose: 'front' },
        } }),
        steps: [
          say('dish', 'I’m going to Nebraska.'),
          par(go('dish', [[230, 440]], { speed: 18 }), go('pack', [[210, 440]], { speed: 18 })),
          nar('Dish rides off on Sugar, leading a little buckskin, to court Lorena. Call wins an Army contract for beef. Newt turns out to be a natural bronc rider.', 'newt'),
        ] },
    ],
  });

  /* ---------- 99 ---------- */
  CH.push({
    n: 99, title: 'A new year on the Platte', part: 3,
    scene: ranch({ winter: true, place: 'Clara’s ranch', when: 'January', weather: { snow: 'light' }, actors: {
      july: { at: [220, 214], pose: 'front' }, clarahat: { at: [196, 212], pose: 'front' }, dish: { at: [0, 380], mount: 'sugar' }, lorena: { at: [260, 214], pose: 'front' },
    } }),
    beats: [
      { steps: [
        say('july', 'Will you marry me, Clara?'),
        nar('In the first week of the new year July blurts out a proposal, carrying frozen potatoes into the kitchen. Clara only holds out a finger of cake batter for him to taste.', 'clarahat'),
        nar('When baby Martin falls dangerously ill, Clara keeps a lone vigil, then scolds July for not sitting with her. Ask again in a year, she tells him.', 'clarahat'),
      ] },
      { steps: [
        { weather: { snow: 'blizzard' } }, go('dish', [[240, 260]], { speed: 12 }), { weather: { snow: 'light' } },
        say('dish', 'Gus is dead.'),
        emote('lorena', '...'),
        nar('Dish Boggett comes up the Platte through a January blizzard with the news. Lorena sinks into silent grief.', 'lorena'),
        nar('Clara hires Dish. He courts Lorena hopelessly all winter, and stays on in spring to help with the colts.', 'clarahat'),
      ] },
    ],
  });

  /* ---------- 100 ---------- */
  CH.push({
    n: 100, title: 'The Hell Bitch', part: 3,
    scene: montana({ snowy: true, trees: true, place: 'The Milk River ranch', when: 'Winter', props: [['cabin', 230, 200, { w: 70, lit: true }], ['tent', 330, 230], ['fenceH', 150, 290, { len: 72 }]], actors: {
      call: { at: [330, 250], pose: 'front' }, newt: { at: [150, 300], pose: 'front' }, soupy: { at: [190, 260], pose: 'front' },
    } }),
    beats: [
      { steps: [
        nar('All winter Call lives in Wilbarger’s tent. He resents banking half of every sale for Lorena. At Christmas the men kill Gus’s pigs.', 'call'),
        nar('In spring, horse thieves take fifteen horses. Call tracks them into Canada, shoots a drunken old preacher who wounds Needle with a hatchet, and later hangs the preacher’s big son for more thieving.', 'call'),
        { fall: 'newt', blood: false },
        nar('Soupy resents Newt’s growing authority, trips him, and beats him in a fight while Call watches. Then Soupy leaves for Texas.', 'newt'),
        { rise: 'newt' },
      ] },
      { scene: montana({ river: true, place: 'The banks of the Milk River', when: 'End of May, cold and blowy', actors: {
          call: { at: [230, 240], mount: 'hellbitch' }, newt: { at: [260, 246], pose: 'front' }, greasy: { kind: 'horse', who: 'greasy', at: [180, 250] }, jerry: { kind: 'horse', who: 'jerrydun', at: [160, 246] },
        } }),
        steps: [
          { set: 'call', v: { mount: null, pose: 'front', x: 230, y: 240 } }, { spawn: 'hb', kind: 'horse', who: 'hellbitch', at: [246, 256] },
          say('call', 'You’re range boss now. The mare’s yours.'),
          nar('At the end of May, Call makes Newt range boss. He gives him the Hell Bitch, his Henry rifle, and his own father’s thin gold watch.', 'call'),
          emote('newt', '...'),
          nar('He tries, and cannot say the rest. He cannot tell Newt he is his son.', 'call'),
          { set: 'call', v: { mount: 'jerrydun', who: 'callold' } }, { remove: 'jerry' },
          par(go('call', [[230, 0]], { speed: 14 }), go('greasy', [[210, 0]], { speed: 14 })),
          nar('Then he rides south, with the mule Greasy, the dun Jerry, and the old Hat Creek sign tied on the pack.', 'newt'),
        ] },
    ],
  });

  /* ---------- 101 ---------- */
  CH.push({
    n: 101, title: 'Clara’s anger', part: 3,
    scene: town({ seed: 171, place: 'Miles City', when: 'Unseasonably cold', actors: {
      call: { at: [230, 236], mount: 'jerrydun', who: 'callold' }, buggy: { kind: 'team', at: [260, 250], cfg: { buggy: true, canvas: true, m1: E.horses.greasy } },
    } }),
    beats: [
      { steps: [
        nar('In Miles City an animal has broken into the shed and carried off Gus’s leg. Call has the coffin reinforced, and buys an old buggy.', 'call'),
        par(go('call', [[230, 0]], { speed: 16 }), go('buggy', [[260, 0]], { speed: 16 })),
        { map: { fit: pts(M.miles, M.clara), places: [M.miles, M.clara], title: 'South', when: 'With Gus',
          trails: [{ id: 'cs', pts: [[-105.84, 46.41], [-106.0, 44.6], [-105.3, 42.8], [-103.8, 41.9], [-101.95, 41.1]], col: '#3a6aa0', icon: 'rider' }] } },
        { trail: { id: 'cs', to: 4, speed: 0.8 } },
        nar('He travels south with a friendly band of Crow, crosses empty Wyoming, and faces down five drunk young men near Nebraska.'),
        { scene: true },
      ] },
      { scene: ranch({ place: 'Clara’s ranch', when: 'Spring', actors: {
          call: { at: [260, 240], pose: 'front', who: 'callold' }, buggy: { kind: 'team', at: [300, 250], cfg: { buggy: true, canvas: true, m1: E.horses.greasy } }, clara: { at: [220, 236], pose: 'front' }, lorena: { at: [200, 230], pose: 'front' },
        } }),
        steps: [
          say('clara', 'Bury him here! Hauling a dead man across the country, Woodrow Call!'),
          nar('Clara berates him. He gives her Gus’s two notes, and she sobs against the mule.', 'clara'),
          { time: 'night', ms: 2000 },
          nar('Lorena stands beside the coffin all night, holding her note, unread. In hers, Gus asks Clara to look after Lorena.', 'lorena'),
        ] },
      { steps: [
        { time: 'dawn', ms: 1500 }, { fall: 'lorena', blood: false },
        nar('In the morning Lorena faints, and is carried upstairs.', 'lorena'),
        go('call', [[300, 380]], { speed: 12 }), go('buggy', [[330, 400]], { speed: 12 }), walk('clara', [[270, 370]], { speed: 12 }),
        say('clara', 'You never even gave that boy your name!'),
        nar('Call leaves. Clara strides beside his horse, raging at him for abandoning his son.', 'clara'),
      ] },
    ],
  });

  /* ---------- 102 ---------- */
  const courthouseSq = {
    w: 360, h: 380, seed: 211, time: 'noon', weather: {}, place: 'Santa Rosa, New Mexico', when: 'Hanging day', cam: [180, 200],
    ground: (g) => { g.fill(T.DIRT); g.patches(T.DRY, T.DIRT, 10, 8, 18); g.rect(80, 150, 200, 140, T.ROAD); },
    props: [['courthouse', 180, 160, { id: 'ch' }], ['wagon', 60, 260], ['wagon', 300, 280], ['adobe', 40, 150, { w: 36 }], ['adobe', 320, 150, { w: 36 }]],
    actors: {
      call: { at: [180, 260], pose: 'front', who: 'callold' }, blueduck: { at: [160, 100], hidden: true }, decker: { at: [172, 100], hidden: true },
      ...Object.fromEntries(Array.from({ length: 10 }, (_, i) => ['cr' + i, { who: i % 3 ? 'soldier' : 'kid1', at: [100 + (i % 5) * 40, 220 + Math.floor(i / 5) * 60], pose: 'front' }])),
    },
  };
  CH.push({
    n: 102, title: 'Lonesome Dove', part: 3,
    scene: plains({ time: 'dusk', place: 'The Purgatoire River', when: 'Dusk', props: [['campfire', 230, 230]], actors: {
      call: { at: [210, 236], pose: 'front', who: 'callold' }, buggy: { kind: 'team', at: [150, 240], cfg: { buggy: true, canvas: true, m1: E.horses.greasy } }, goodnight: { at: [460, 200], mount: 'redmule' },
    } }),
    beats: [
      { steps: [
        nar('Stung by Clara’s words, Call drives south through Kansas in full summer, then into Colorado to avoid questions.', 'call'),
        go('goodnight', [[260, 226]], { speed: 16 }),
        say('goodnight', 'Blue Duck’s caught. They hang him at Santa Rosa.'),
        nar('On the Purgatoire, the cattleman Charles Goodnight rides up on a red mule and gives him the news in a few curt words.', 'goodnight'),
      ] },
      { scene: courthouseSq, steps: [
        nar('Blue Duck, in chains, taunts Call from his cell.', 'blueduck'),
        { show: 'blueduck' }, { show: 'decker' }, emote('call', '!'),
        { unprop: 'ch' }, { prop: ['courthouse', 180, 160, { id: 'ch2', broken: true }] },
        par(go('blueduck', [[160, 250]], { speed: 120 }), go('decker', [[176, 254]], { speed: 120 })), { fall: 'blueduck' }, { fall: 'decker' }, { dust: [168, 252], n: 20 },
        nar('On hanging day he throws himself through a third-floor window, dragging a deputy with him. He smiles at Call as he falls. The sheriff hangs the body anyway.', 'call'),
      ] },
      { scene: wyoming({ river: true, place: 'The Pecos, above Horsehead Crossing', when: 'Drought', actors: {
          call: { at: [200, 230], mount: 'jerrydun', who: 'callold' }, buggy: { kind: 'team', at: [240, 240], cfg: { buggy: true, canvas: true, m1: E.horses.greasy } }, shooter: { who: 'kiowa', at: [320, 180] },
        } }),
        steps: [
          { shoot: 'shooter', at: 'call', n: 1 }, emote('call', '!'), { shoot: 'call', at: 'shooter', n: 1 }, { fall: 'shooter' },
          go('buggy', [[260, 320]], { speed: 40 }), { remove: 'buggy' }, { prop: ['wreck', 262, 330] },
          nar('A day above Horsehead Crossing on the Pecos, Call is shot in the side. The buggy wrecks on the rocks.', 'call'),
          nar('He wraps Gus in a tarp on a travois made from the old sign. Greasy dies before they reach the Colorado.', 'call'),
          { map: { fit: pts(M.milk, M.orchard, M.dove), places: [M.milk, M.clara, M.santarosa, M.horsehead, M.orchard, M.dove], title: 'The whole journey', when: 'Montana and back',
            trails: [
              { id: 'up', pts: [[-98.95, 26.45], [-98.49, 29.42], [-98.1, 30.3], [-97.33, 32.75], [-98.9, 34.2], [-99.1, 35.8], [-100.3, 37.9], [-101.2, 40.6], [-101.95, 41.1], [-103.8, 41.9], [-106.3, 43.55], [-106.0, 44.6], [-105.9, 46.3], [-107.5, 47.1], [-110.3, 47.8], [-108.4, 48.5]], col: '#c8402a', from: 15 },
              { id: 'down', pts: [[-108.4, 48.5], [-105.84, 46.41], [-106.0, 44.6], [-103.8, 41.9], [-101.95, 41.1], [-100.8, 39.8], [-104.99, 39.74], [-104.5, 37.2], [-104.44, 36.95], [-104.68, 34.94], [-104.0, 32.8], [-102.6, 31.2], [-100.4, 30.8], [-98.3, 29.8]], col: '#3a6aa0', icon: 'rider' }] } },
          { trail: { id: 'down', to: 13, speed: 1.4 } },
          nar('He goes on alone, on foot and on horseback, down across Texas.'),
          { scene: true },
        ] },
      { scene: hillPool({ creek: true, place: 'Clara’s orchard, on the Guadalupe', when: 'A hot day', props: [['grave', 210, 150], ['sign', 210, 138, { id: 'marker' }]], actors: { call: { at: [240, 170], pose: 'front', who: 'callold' }, jerry: { kind: 'horse', who: 'jerrydun', at: [280, 180] } } }),
        steps: [
          nar('Under the live oaks above the Guadalupe, Call buries Augustus McCrae, in the place Gus chose.', 'call'),
          nar('For a marker he plants what is left of the old sign: only the top board survives, with the name of the Hat Creek Cattle Company. On the back he scratches A. M.', 'call'),
        ] },
      { scene: {
          w: DOVE_W, h: DOVE_H, seed: 11, ground: doveGround,
          props: [...doveProps().filter((p) => p[0] !== 'drybean' && p[0] !== 'sign' && p[0] !== 'wagon'), ['burned', 348, 204]],
          time: 'dusk', weather: {}, place: 'Lonesome Dove', when: 'August', cam: [160, 200],
          actors: { boloid: { at: [160, 160], pose: 'front' }, call: { at: [300, 20], mount: 'jerrydun', who: 'callold' } },
        },
        steps: [
          go('call', [[300, 214], [200, 214], [150, 200]], { speed: 14 }),
          say('boloid', 'CLANG! CLANG! CLANG!', 2400),
          nar('In August, Call rides into Lonesome Dove. Old Bolivar, white-haired now, is beating the dinner bell with the broken crowbar.', 'boloid'),
          nar('The house is full of cobwebs. The barn still has no roof. The Dry Bean is a burned-out ruin: Xavier set it alight.', 'call'),
          cam(150, 190, 1800), { time: 'night', ms: 4000 },
          nar('The end.'),
        ] },
    ],
  });
})();
