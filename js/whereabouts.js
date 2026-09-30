/* Where everyone is, chapter by chapter, for the "Where is everyone?" map.
   Times are chapter numbers; a fraction is part-way through the chapter, and .99 means "once the chapter is finished",
   which keeps deaths and reveals hidden until the reader has heard them.
   Coordinates are best-fit [lon, lat] taken from research/routes.json, moved to match the story files' own
   overview maps where both place something (Lonesome Dove especially). The novel's geography is loose. */
(function () {
  // key: [lon, lat, label, short name used for "between X and Y"]
  const PLACES = {
    dove: [-98.95, 26.45, 'Lonesome Dove, on the Rio Grande', 'Lonesome Dove'],
    coahuila: [-98.75, 26.1, 'Across the river in Coahuila, raiding for horses', 'Coahuila'],
    dovecamp: [-98.9, 26.55, 'Gathering and branding cattle near Lonesome Dove', 'Lonesome Dove'],
    dovenorth: [-98.85, 26.8, 'First day out, just north of Lonesome Dove', 'Lonesome Dove'],
    brush: [-99.1, 27.7, 'In the mesquite brush country south of the Nueces', 'the brush country'],
    nueces: [-99.3, 28.25, 'At the Nueces crossing', 'the Nueces'],
    nuecesN: [-99.25, 28.32, 'Camped on the north bank of the Nueces', 'the Nueces'],
    seangrave: [-99.28, 28.28, 'Under a live oak by the Nueces', 'the Nueces'],
    sariver: [-98.45, 29.3, 'Crossing the San Antonio River', 'the San Antonio River'],
    sa: [-98.49, 29.42, 'San Antonio', 'San Antonio'],
    sanear: [-98.6, 29.35, 'Just south of San Antonio', 'San Antonio'],
    orchard: [-98.3, 29.8, 'Clara’s old orchard on the Guadalupe', 'the Guadalupe'],
    westaustin: [-98.1, 30.3, 'Twenty miles west of Austin', 'Austin'],
    lorenacamp: [-98.02, 30.33, 'A camp under a limestone bluff, west of Austin', 'Austin'],
    austin: [-97.74, 30.27, 'In Austin, hiring a cook', 'Austin'],
    jakeaustin: [-97.72, 30.29, 'Gambling in Austin', 'Austin'],
    westfw: [-97.6, 32.75, 'West of Fort Worth, past the Brazos and the Trinity', 'Fort Worth'],
    fw: [-97.33, 32.75, 'Fort Worth', 'Fort Worth'],
    fwnorth: [-97.35, 33.05, 'North of Fort Worth', 'Fort Worth'],
    dallas: [-96.8, 32.78, 'Dallas', 'Dallas'],
    northdallas: [-96.8, 33.2, 'Camped thirty miles north of Dallas', 'Dallas'],
    gully: [-96.9, 33.3, 'A gully beside the trail into Texas', 'north Texas'],
    redriver: [-98.9, 34.2, 'Crossing the Red River into the Indian Territory', 'the Red River'],
    doans: [-99.35, 34.37, 'Doan’s Store on the Red River', 'the Red River'],
    territoryN: [-99.8, 36.6, 'Riding north through the Indian Territory', 'the Territory'],
    canadian: [-99.1, 35.8, 'At the Canadian crossing, in the Indian Territory', 'the Canadian'],
    billgrave: [-99.15, 35.55, 'Half a day south of the Canadian', 'the Canadian'],
    canridge: [-99.15, 35.92, 'Camped two miles north of the Canadian, waiting for the herd', 'the Canadian'],
    clearfork: [-99.4, 32.9, 'The Clear Fork of the Brazos, heading north-west', 'the Brazos'],
    redBD: [-100.0, 34.4, 'Across the Red River, heading north-west', 'the Red River'],
    crossplains: [-99.3, 34.6, 'Riding north-west toward the Canadian', 'the plains'],
    ausfrank: [-101.6, 35.75, 'Aus Frank’s bone camp on the Canadian', 'the Canadian'],
    wallow: [-101.3, 35.65, 'A buffalo wallow south of the Canadian', 'the Canadian'],
    bdcamp: [-101.1, 35.85, 'Blue Duck’s camp on the Canadian', 'the Canadian'],
    canyon: [-101.3, 35.88, 'A canyon mouth on the Canadian', 'the Canadian'],
    goingeast: [-100.5, 35.85, 'Riding east along the Canadian to wait for the herd', 'the Canadian'],
    adobewalls: [-101.46, 35.89, 'Sheltering from the rain at Adobe Walls', 'Adobe Walls'],
    julyN: [-100.8, 36.6, 'Riding north across the plains after Elmira', 'the plains'],
    cimarronN: [-100.4, 37.3, 'On foot, north of the Cimarron', 'the Cimarron'],
    kansasedge: [-99.9, 37.0, 'On the south edge of Kansas', 'the Kansas line'],
    southarkansas: [-100.2, 37.6, 'A few miles south of the Arkansas, near Dodge', 'the Arkansas'],
    northarkansas: [-100.3, 37.9, 'North of the Arkansas, west of Dodge', 'the Arkansas'],
    dodge: [-100.02, 37.75, 'Dodge City, Kansas', 'Dodge City'],
    wilbdodge: [-100.0, 37.85, 'Driving horses near Dodge', 'Dodge City'],
    dodgenear: [-100.15, 37.95, 'Near Dodge, riding with the Suggs gang', 'Dodge City'],
    wilbargerdeath: [-100.05, 37.85, 'Under the Arkansas bank, ten miles east of the herd', 'the Arkansas'],
    suggscreek: [-99.95, 38.0, 'A steep-banked creek on the Kansas prairie', 'Kansas'],
    kansasplains: [-100.8, 39.0, 'On the Kansas plains, short of the Republican', 'the Republican'],
    republican: [-101.02, 40.17, 'Crossing the Republican', 'the Republican'],
    julyrep: [-100.9, 40.1, 'Snakebitten by a bluff near the Republican', 'the Republican'],
    southplatte: [-101.5, 40.95, 'Ten miles south of the Platte', 'the Platte'],
    ogallalacamp: [-101.62, 41.2, 'Camped north of the Platte, near Ogallala', 'Ogallala'],
    ogallala: [-101.72, 41.13, 'Ogallala, Nebraska', 'Ogallala'],
    clara: [-101.95, 41.02, 'Clara’s horse ranch on the Platte', 'Clara’s ranch'],
    eastogallala: [-101.2, 41.1, 'Heading east along the Platte for St. Louis', 'the Platte'],
    elmiradeath: [-100.6, 41.0, 'On the Platte, east of Ogallala', 'the Platte'],
    fs: [-94.42, 35.39, 'Fort Smith, Arkansas', 'Fort Smith'],
    armytrail: [-95.0, 35.1, 'On the Army trail south-west of Fort Smith', 'Fort Smith'],
    roscoeout: [-94.7, 35.3, 'Riding out of Fort Smith to find July', 'Fort Smith'],
    louisa: [-94.62, 35.33, 'Louisa Brooks’s stump farm, west of Fort Smith', 'Fort Smith'],
    julyred: [-95.3, 33.8, 'Crossing the Red River into Texas', 'the Red River'],
    roscoered: [-96.9, 33.6, 'Old Sam’s cabin in the north Texas woods', 'north Texas'],
    arkboat: [-95.8, 35.8, 'On a whiskey traders’ boat up the Arkansas', 'the Arkansas'],
    arkplains: [-98.5, 37.6, 'Up the Arkansas onto the plains', 'the Arkansas'],
    bents: [-103.43, 38.04, 'Bent’s Fort', 'Bent’s Fort'],
    hidewagon: [-102.4, 39.0, 'Driving a hide wagon north-east across Kansas', 'Kansas'],
    nkansas: [-101.0, 39.75, 'On the soggy plains of northern Kansas', 'Kansas'],
    drydrive: [-103.8, 41.9, 'The dry drive into Wyoming', 'the Platte'],
    saltcreek: [-106.3, 43.55, 'Salt Creek, Wyoming', 'Salt Creek'],
    badlands: [-107.6, 42.9, 'Chasing horse thieves through the badlands', 'the badlands'],
    deetsgrave: [-106.2, 43.72, 'North of where Salt Creek meets the Powder', 'the Powder'],
    powder: [-106.0, 44.6, 'Up the Powder River and across Crazy Woman Creek', 'the Powder'],
    bighorns: [-106.5, 45.0, 'Entering Montana along the Bighorn Mountains', 'the Bighorns'],
    southyellowstone: [-106.2, 45.9, 'South of the Yellowstone', 'the Yellowstone'],
    yellowstone: [-106.1, 46.35, 'Across the Yellowstone', 'the Yellowstone'],
    northyellowstone: [-106.1, 46.8, 'Grazing north of the Yellowstone', 'the Yellowstone'],
    gussiege: [-107.0, 47.0, 'Holed up in a creek bank, days north of the Yellowstone', 'the Yellowstone'],
    callsearch: [-106.6, 46.85, 'Riding north alone to find Gus', 'the Yellowstone'],
    tomiles: [-106.4, 46.7, 'Hobbling south-east toward Miles City', 'Miles City'],
    miles: [-105.84, 46.41, 'Miles City, Montana', 'Miles City'],
    benton: [-110.67, 47.82, 'Crossing the Missouri at Fort Benton', 'Fort Benton'],
    milkranch: [-108.4, 48.5, 'The new Hat Creek ranch on the Milk River', 'the Milk River'],
    powderS: [-105.9, 44.0, 'Heading south through Wyoming, past the Powder', 'Wyoming'],
    republicanS: [-101.5, 40.0, 'Heading south across the Republican into Kansas', 'Kansas'],
    denver: [-104.99, 39.74, 'Denver', 'Denver'],
    purgatoire: [-104.5, 37.2, 'Camped on the Purgatoire', 'the Purgatoire'],
    santarosa: [-104.68, 34.94, 'Santa Rosa, New Mexico', 'Santa Rosa'],
    horsehead: [-102.6, 31.2, 'On the Pecos, near Horsehead Crossing', 'the Pecos'],
  };

  // The herd, from the day it is gathered. Between two different points it is out on the trail.
  const HERD = [
    [18, 'dovecamp'], [24.99, 'dovecamp'], [25, 'dovenorth'], [30, 'brush'], [34.99, 'brush'], [35, 'nueces'], [39, 'sariver'],
    [41, 'sanear'], [42.99, 'sanear'], [44, 'westaustin'], [48.99, 'westaustin'], [59, 'westfw'], [60, 'redriver'], [62, 'canadian'],
    [63.99, 'canadian'], [67, 'kansasedge'], [70, 'southarkansas'], [72, 'northarkansas'], [78, 'kansasplains'], [79, 'republican'],
    [83, 'southplatte'], [84, 'ogallalacamp'], [88.99, 'ogallalacamp'], [89, 'drydrive'], [90, 'saltcreek'], [90.99, 'saltcreek'],
    [91, 'powder'], [93, 'bighorns'], [94, 'southyellowstone'], [94.99, 'yellowstone'], [96, 'northyellowstone'],
    [97.99, 'northyellowstone'], [98, 'benton'], [98.5, 'milkranch'],
  ];

  /* Each character: [time, place, opts]. Place 'herd' rides with the herd, 'alongside' camps near it,
     null means nobody on the page knows where they are. opts: { dead, note }. Order sets whose face leads a group. */
  const DEAD = (note) => ({ dead: true, note });
  const LOST = (note) => ({ note });
  const WHO = {
    call: [[1, 'dove'], [10, 'coahuila'], [12, 'dove'], [18, 'herd'], [42, 'sa'], [42.99, 'herd'], [44.5, 'austin'], [45.99, 'herd'],
      [72.3, 'wilbargerdeath'], [74, 'suggscreek'], [78, 'herd'], [85, 'ogallala'], [85.99, 'herd'], [87, 'clara'], [88, 'herd'],
      [90.2, 'badlands'], [90.7, 'herd'], [94.99, 'callsearch'], [96, 'miles'], [97.7, 'herd'], [101, 'miles'], [101.4, 'powderS'],
      [101.7, 'clara'], [102.1, 'republicanS'], [102.2, 'denver'], [102.3, 'purgatoire'], [102.45, 'santarosa'], [102.6, 'horsehead'],
      [102.75, 'orchard'], [102.9, 'dove']],
    gus: [[1, 'dove'], [10, 'coahuila'], [12, 'dove'], [18, 'herd'], [42, 'sa'], [42.99, 'herd'], [44.5, 'lorenacamp'], [45.99, 'herd'],
      [48.99, null, LOST('Riding alone after Blue Duck')], [54, 'clearfork'], [54.6, 'ausfrank'], [56, 'wallow'], [56.7, 'canyon'],
      [57, 'bdcamp'], [58, 'canyon'], [58.8, 'goingeast'], [61, 'adobewalls'], [61.5, 'canridge'], [63, 'herd'],
      [72.3, 'wilbargerdeath'], [74, 'suggscreek'], [78, 'herd'], [84.5, 'ogallala'], [84.9, 'herd'], [87, 'clara'], [88.99, 'herd'],
      [90.2, 'badlands'], [90.7, 'herd'], [94.4, 'gussiege'], [95.5, 'tomiles'], [95.9, 'miles'],
      [96.99, 'miles', DEAD('Packed in salt and charcoal in a shed in Miles City, waiting for spring')],
      [101.4, 'powderS', DEAD('In his coffin on Call’s buggy, going home to Texas')], [101.7, 'clara', DEAD('In his coffin on Call’s buggy, going home to Texas')],
      [102.1, 'republicanS', DEAD('In his coffin on Call’s buggy, going home to Texas')], [102.2, 'denver', DEAD('In his coffin on Call’s buggy, going home to Texas')],
      [102.3, 'purgatoire', DEAD('In his coffin on Call’s buggy, going home to Texas')], [102.45, 'santarosa', DEAD('In his coffin on Call’s buggy, going home to Texas')],
      [102.6, 'horsehead', DEAD('Wrapped in a tarp on a travois made from the old sign')], [102.75, 'orchard', DEAD('Buried in Clara’s orchard, as he asked')]],
    lorena: [[3, 'dove'], [22, 'alongside'], [30, 'nuecesN'], [35, 'alongside'], [40, 'sanear'], [44, 'lorenacamp'],
      [48.99, null, LOST('Carried off by Blue Duck')], [49.5, 'clearfork'], [49.9, 'redBD'], [55, 'bdcamp'], [58, 'canyon'],
      [58.8, 'goingeast'], [61, 'adobewalls'], [61.5, 'canridge'], [63, 'herd'], [87, 'clara']],
    jake: [[5.5, 'dove'], [10, 'coahuila'], [12, 'dove'], [22, 'alongside'], [30, 'nuecesN'], [35, 'alongside'], [40, 'sanear'],
      [44, 'jakeaustin'], [48.8, 'herd'], [48.99, null, LOST('Rode off alone from the herd camp west of Austin')], [59, 'fw'], [64.6, 'dallas'],
      [68, 'northdallas'], [68.4, 'doans'], [68.8, 'territoryN'], [71, 'dodgenear'], [74, 'suggscreek'],
      [74.99, 'suggscreek', DEAD('Hanged with the Suggs brothers; buried by moonlight under a tailgate')]],
    newt: [[1, 'dove'], [10, 'coahuila'], [12, 'dove'], [18, 'herd'], [46.8, 'lorenacamp'], [47.6, 'herd'], [72.3, 'wilbargerdeath'],
      [74, 'suggscreek'], [78, 'herd'], [85, 'ogallala'], [86.99, 'herd'], [87, 'clara'], [88, 'herd']],
    pea: [[1, 'dove'], [10, 'coahuila'], [12, 'dove'], [18, 'herd'], [72.3, 'wilbargerdeath'], [74, 'suggscreek'], [78, 'herd'],
      [94.4, 'gussiege'], [94.9, 'herd']],
    deets: [[5.5, 'dove'], [10, 'coahuila'], [12, 'dove'], [18, 'herd'], [72.3, 'wilbargerdeath'], [74, 'suggscreek'], [78, 'herd'],
      [90.2, 'badlands'], [90.99, 'deetsgrave', DEAD('Killed in the badlands; buried north of where Salt Creek meets the Powder')]],
    dish: [[4, 'dove'], [10, 'coahuila'], [12, 'dove'], [18, 'herd'], [98.8, null, LOST('Riding south through the snow to court Lorena')],
      [99.5, 'clara']],
    july: [[26, 'fs'], [28.99, 'armytrail'], [38, 'julyred'], [50, 'fw'], [51, 'fwnorth'], [52, 'gully'], [52.6, 'fwnorth'],
      [53, 'crossplains'], [56, 'canyon'], [57, 'bdcamp'], [58, 'canyon'], [58.99, 'julyN'], [65, 'cimarronN'], [65.9, 'dodge'],
      [77, 'julyrep'], [77.8, 'clara'], [80, 'ogallala'], [80.9, 'clara']],
    elmira: [[27, 'fs'], [29.5, 'arkboat'], [36.5, 'arkplains'], [53, 'bents'], [53.99, 'hidewagon'], [66, 'nkansas'], [75, 'clara'],
      [75.99, 'ogallala'], [80.99, 'eastogallala'], [87.3, 'elmiradeath', DEAD('Killed by Indians on the Platte, east of Ogallala')]],
    clara: [[7, 'clara']],
    blueduck: [[45, 'lorenacamp'], [45.9, null, LOST('Somewhere in the hills west of Austin')], [49.5, 'clearfork'], [49.9, 'redBD'],
      [55, 'bdcamp'], [57.5, null, LOST('Rode off from his camp on the Canadian')],
      [58.99, null, LOST('Took Joe’s horse; Gus reckons he is riding for the Purgatoire')], [102.3, 'santarosa'],
      [102.5, 'santarosa', DEAD('Jumped from the courthouse window on his hanging day')]],
    roscoe: [[26, 'fs'], [29.99, 'roscoeout'], [37, 'louisa'], [43, 'roscoered'], [52, 'gully'], [52.6, 'fwnorth'], [53, 'crossplains'],
      [56, 'canyon'], [58.99, 'canyon', DEAD('Killed by Blue Duck at a canyon on the Canadian; buried under rocks')]],
    joe: [[27, 'fs'], [28.99, 'armytrail'], [38, 'julyred'], [50, 'fw'], [51, 'fwnorth'], [52, 'gully'], [52.6, 'fwnorth'],
      [53, 'crossplains'], [56, 'canyon'], [58.99, 'canyon', DEAD('Killed by Blue Duck at a canyon on the Canadian; buried under rocks')]],
    janey: [[43.5, 'roscoered'], [52, 'gully'], [52.6, 'fwnorth'], [53, 'crossplains'], [56, 'canyon'],
      [58.99, 'canyon', DEAD('Killed by Blue Duck at a canyon on the Canadian; buried under rocks')]],
    bol: [[1, 'dove'], [18, 'herd'], [41.6, 'dove']],
    xavier: [[4, 'dove'], [102.99, 'dove', DEAD('Died in the fire when he burned down the Dry Bean')]],
    lippy: [[4, 'dove'], [23.5, 'herd']],
    pocampo: [[47.5, 'herd']],
    allen: [[10, 'coahuila'], [12, 'dove'], [18, 'herd']],
    sean: [[10, 'coahuila'], [12, 'dove'], [18, 'herd'], [35.99, 'seangrave', DEAD('Snakebitten crossing the Nueces; buried under a live oak')]],
    bill: [[16, 'dove'], [18, 'herd'], [62.99, 'billgrave', DEAD('Killed by lightning half a day south of the Canadian')]],
    wilbarger: [[8, 'dove'], [12.5, null, LOST('Driving his own herd north to Kansas')], [51, 'fwnorth'],
      [51.99, null, LOST('Driving his own herd north to Kansas')], [61, 'canridge'], [61.99, null, LOST('Driving his own herd north to Kansas')],
      [71, 'wilbdodge'], [72.99, 'wilbargerdeath', DEAD('Shot by the Suggs gang; buried on the Arkansas bank under a buffalo skull')]],
    peach: [[26, 'fs']],
    zwey: [[36, 'arkboat'], [36.5, 'arkplains'], [53, 'bents'], [53.99, 'hidewagon'], [66, 'nkansas'], [75, 'clara'], [75.99, 'ogallala'],
      [80.99, 'eastogallala'], [87.3, 'elmiradeath', DEAD('Killed by Indians on the Platte, with Elmira')]],
    suggs: [[64.6, 'dallas'], [68, 'northdallas'], [68.4, 'doans'], [68.8, 'territoryN'], [71, 'dodgenear'], [74, 'suggscreek'],
      [74.99, 'suggscreek', DEAD('Hanged from a tree by the creek')]],
    dee: [[76, 'ogallala'], [80.3, 'ogallala', DEAD('Hanged in Ogallala; buried on Boot Hill')]],
    bob: [[75, 'clara'], [92.99, 'clara', DEAD('Buried on the ridge above the barn')]],
    cholo: [[75, 'clara']],
  };
  // Sprite and name overrides; everyone else uses their own cast entry.
  const FACE = { suggs: 'dan' };
  const NAME = { suggs: 'the Suggs brothers', joe: 'Joe Boot', allen: 'Allen O’Brien', sean: 'Sean O’Brien', bob: 'Bob Allen' };

  const place = (k) => { const p = PLACES[k]; return { lon: p[0], lat: p[1], label: p[2], short: p[3] }; };
  const stepAt = (steps, t) => { let s = null; for (const w of steps) { if (w[0] <= t) s = w; else break; } return s; };

  function herdAt(t) {
    let i = -1;
    for (let k = 0; k < HERD.length; k++) if (HERD[k][0] <= t) i = k;
    if (i < 0) return place(HERD[0][1]);
    const a = HERD[i], b = HERD[i + 1], pa = place(a[1]);
    if (!b || a[1] === b[1] || t === a[0]) return pa;
    const pb = place(b[1]), f = (t - a[0]) / (b[0] - a[0]);
    return { lon: pa.lon + (pb.lon - pa.lon) * f, lat: pa.lat + (pb.lat - pa.lat) * f, label: `On the trail between ${pa.short} and ${pb.short}` };
  }

  // Everyone's state at time t: groups of the living who share a place, the unaccounted-for, and the dead.
  function at(t) {
    const groups = new Map(), unknown = [], dead = [];
    for (const id in WHO) {
      const s = stepAt(WHO[id], t); if (!s) continue;
      const [, k, o = {}] = s;
      if (o.dead) {
        const first = WHO[id].find((w) => w[2] && w[2].dead);
        dead.push({ id, ...place(k), note: o.note, ch: Math.floor(first[0]) });
        continue;
      }
      if (k === null) { unknown.push({ id, note: o.note }); continue; }
      const p = k === 'herd' ? herdAt(t) : k === 'alongside' ? { ...herdAt(t), label: 'Camped a mile or two from the herd' } : place(k);
      if (!groups.has(k)) groups.set(k, { key: k, herd: k === 'herd', lon: p.lon, lat: p.lat, label: p.label, ids: [] });
      groups.get(k).ids.push(id);
    }
    const list = [...groups.values()].sort((a, b) => (b.herd - a.herd) || (b.ids.length - a.ids.length));
    return { groups: list, unknown, dead };
  }

  const cast = () => (window.ENGINE && window.ENGINE.cast) || {};
  const face = (id) => FACE[id] || id;
  const name = (id) => NAME[id] || (cast()[face(id)] || {}).name || id;

  window.WHERE = { at, face, name, PLACES, HERD, WHO };
})();
