# UVIT: The Last Detection

*One trainee. 252 observations. Infinite false positives. Zero working kernels.*

A retro pixel-art endless runner about UVIT source detection. Plain HTML, CSS and JavaScript on a canvas, with no framework, no build step and no asset files. All sprites are drawn from text maps, and all sounds are synthesised with Web Audio.

## Run it locally

**Option 1:** double-click `index.html`. It works straight from the file system.

**Option 2:** serve the folder, which is closer to how it behaves online:

```bash
cd uvit-last-detection
python3 -m http.server 8000
# then open http://localhost:8000
```

The pixel fonts load from Google Fonts. Offline, the menus fall back to a monospace font and the game itself is unaffected, because in-game text uses its own built-in pixel font.

## Controls

| Action | Keyboard | Touch |
|---|---|---|
| Jump | Space / ↑ / W, or click the screen | Tap the screen or JUMP |
| Slide | ↓ / S (tap, or hold to keep sliding) | Hold SLIDE |
| Fast fall | Hold ↓ in mid-air | Hold SLIDE in mid-air |
| Rerun pipeline | X (needs a full coffee meter) | RERUN |
| Pause | P / Esc | PAUSE |
| Mute | M | SOUND button |

The game pauses automatically when the tab loses focus. The best score, unlocked achievements and the mute setting are saved in `localStorage`.

## Deploy as a static website

There is no build step. Upload the folder as it is.

- **GitHub Pages:** push the folder to a repository, then go to Settings → Pages → *Deploy from a branch* and pick `main` / root.
- **Netlify:** drag the folder onto app.netlify.com/drop.
- **Any web server:** copy the files into a public directory such as an institute web space.

## Project layout

```
index.html      page structure: header, canvas, menus, touch pad
style.css       page and menu styling (the arcade cabinet)
js/config.js    every tunable number: physics, speed, gaps, scoring, boss
js/content.js   all words and design tables: stages, jokes, achievements, tips
js/sprites.js   pixel-art maps, the sprite builder, the 3x5 pixel font
js/audio.js     synthesised sound effects
js/game.js      the engine
```

Scripts are plain globals loaded in that order, so the game also works over `file://`.

## How the engine works

`game.js` is split into commented sections:

- **Backgrounds.** Each stage has a pre-rendered 640 px parallax layer: the institute with observatory domes, the FUV/NUV detector windows, server racks with blinking LEDs, and catalogue tables. Stars and galaxies sit on top, and the ground is drawn per stage.
- **State.** `newState()` holds everything about one run.
- **Player.** Gravity, jump buffering, coyote time, slide (minimum length, extended by holding) and fast fall.
- **Obstacles.** `makeObstacle(type)` builds each hazard, `hitboxes(o)` defines its collision boxes, and `drawObstacle` draws it.
- **Spawning and fairness.** `zoneTimes()` works out when an obstacle will overlap the player, and `canSpawn()` only lets a new obstacle in if it arrives a reaction gap after the previous one has passed. Fast cosmic rays are placed further out so they cannot overtake anything. This is why no unavoidable combinations appear.
- **Boss.** The 6 GB FITS file telegraphs each attack with red eyes before throwing HDU blocks (jump) or ERR bolts (slide). It shrinks over 22 seconds, and faster for every RAM chip collected.
- **Events.** Stage changes, SIGTHRESH surges, photon flashes in the detector, glitches in the final stage, and the OBS milestones.
- **Render.** The world is drawn into a 320x180 buffer, then copied to the visible canvas. The kernel-crash glitch effect is applied during that copy.

## Tuning

Open `js/config.js`:

- `BASE_SPEED`, `MAX_SPEED` and `SPEED_RAMP_METERS` control how fast the game gets.
- `GRAVITY` and `JUMP_VELOCITY` control jump height and air time. Keep the FITS file (24 px) clearable.
- `MIN_GAP_PX`, `MIN_GAP_TIME` and `REACTION_TIME` control obstacle density and fairness.
- `MAX_SANITY`, `INVULN_TIME` and the `METER_*` values set how forgiving the game is.
- `BOSS_FIRST_M`, `BOSS_DURATION` and `BOSS_RAM_DAMAGE` control the boss.
- `METERS_PER_OBS` and `OBS_TARGET` control the 252 counter.

In `js/content.js`, each stage's `weights` sets how often each obstacle appears, and `from` sets the distance in metres where the stage starts.

## Adding things

- **A joke:** add a line to the right list in `MESSAGES`, `GAME_OVER_LINES`, `BOSS_LOG` or `TIPS`. In-game text is drawn in the pixel font, which supports letters, digits and `. , : ! ? - % / + ' ( ) = _ # < > [ ] * "`.
- **An achievement:** add `{ id, name, desc }` to `ACHIEVEMENTS`, then call `unlock('id')` wherever the condition happens in `game.js`. `checkAchievements()` is the easiest place.
- **An obstacle:**
  1. Add a `case` to `makeObstacle()` with `w`, `h`, `y` and `needs` (`'jump'` or `'slide'`).
  2. Add its drawing to `drawObstacle()`.
  3. Add custom collision to `hitboxes()` if it is not a plain box.
  4. Add its hit messages to `MESSAGES`, plus a headline in `CAUSE_HEADLINES` and a label in `SCAN_LABELS`.
  5. Give it a weight in one or more `STAGES`.
- **A new character look:** edit the maps in `js/sprites.js`. Each letter is a colour from `PAL`, and `.` is transparent. Keep the 12x20 size for running frames, or adjust the draw offsets in `drawPlayer()`.

## Debugging from the browser console

`window.UVIT` exposes `mode`, `state`, `start()`, `jump()`, `slide(ms)` and `pipeline()`. For example, `UVIT.state.distPx = 12500` jumps to the boss.
