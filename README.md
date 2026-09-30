# Lonesome Dove Companion

A Stardew Valley–style pixel-art companion to Larry McMurtry's *Lonesome Dove*. Each chapter plays as a short animated scene, with dialogue, a moving camera and overview maps of the drive, meant to be followed alongside the audiobook (the Will Patton recording, which keeps the novel's 102 chapters).

Covers the whole novel: all 102 chapters. All narration and dialogue is paraphrased; nothing is quoted from the novel.

## Run it

It's a static page with no build step. Serve the folder and open `index.html`:

```bash
python3 -m http.server 8731
```

Add `#c12` (or `#c12b2` for a specific moment) to jump to a chapter.

The map button in the header opens **Where is everyone?**: an overview map of where each storyline has got to by the point you've reached, with a list of who is where, whose whereabouts are unknown, and who has been laid to rest. It never shows anything past where you are.

## Layout

- `index.html`: page, styles and UI
- `js/art.js`: every sprite, prop and terrain type, drawn in code
- `js/engine.js`: scene rendering, auto-camera, script runner, overview map
- `js/geo.js`: simplified 1870s map data
- `js/story.js`: cast, horses and chapters 1–6
- `js/part1.js`, `js/part2.js`, `js/part2b.js`, `js/part3.js`: chapters 7–25, 26–49, 50–74 and 75–102
- `js/whereabouts.js`: where every character is, chapter by chapter, for the "Where is everyone?" map
- `js/app.js`: navigation, dialogue box, chapter list, the map sheet, saved progress
- `research/`: chapter-by-chapter outline (`chapters.json`, `chapters.md`), routes and sources. **The outline covers the whole book, so it contains spoilers.** The novel's text itself is not committed.
