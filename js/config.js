/* UVIT: THE LAST DETECTION — tunable numbers.
   Units: pixels on the 320x180 internal screen, and seconds.
   Change values here to rebalance the game; nothing else needs to move. */
const CONFIG = {
  W: 320,
  H: 180,
  GROUND_Y: 150,          // y of the floor surface
  PLAYER_X: 54,           // the trainee stays at this x while the world scrolls

  // Player physics
  GRAVITY: 1100,
  JUMP_VELOCITY: -330,    // ≈ 50 px high, ≈ 0.6 s in the air
  FAST_FALL: 2.4,         // gravity multiplier while holding slide in mid-air
  COYOTE_TIME: 0.08,      // grace period to jump just after leaving the ground
  JUMP_BUFFER: 0.14,      // a jump pressed this early before landing still counts
  SLIDE_MIN_TIME: 0.55,   // a tap slides at least this long; holding keeps sliding

  // World speed (px / s)
  BASE_SPEED: 130,
  MAX_SPEED: 265,
  SPEED_RAMP_METERS: 2000,
  STAGE4_SPEED_BONUS: 1.07,
  SIGTHRESH_SPEED_BONUS: 1.15,

  // Fairness: minimum spacing between obstacles
  MIN_GAP_PX: 110,
  MIN_GAP_TIME: 0.78,     // seconds between one obstacle leaving the player and the next arriving
  REACTION_TIME: 0.55,    // floor used for fast objects (cosmic rays, boss attacks)

  // Distance and the 252 Easter egg
  PX_PER_METER: 10,
  METERS_PER_OBS: 10,     // one "observation processed" every 10 m
  OBS_TARGET: 252,

  // Health
  MAX_SANITY: 3,
  INVULN_TIME: 1.4,

  // RERUN PIPELINE ability
  METER_MAX: 100,
  METER_START: 40,
  METER_COFFEE: 35,
  METER_SOURCE: 3,
  PIPELINE_TIME: 3.5,
  PIPELINE_TIMESCALE: 0.55,

  // Scoring (distance in metres is added on top)
  SCORE: { source: 10, rare: 100, check: 50, page: 25, ram: 30, boss: 500 },

  // Boss: the 6 GB FITS file
  BOSS_FIRST_M: 1250,
  BOSS_EVERY_M: 1250,
  BOSS_DURATION: 22,      // seconds to outlast it with no RAM pickups
  BOSS_RAM_DAMAGE: 0.12,  // each RAM chip shrinks the file by this fraction

  // SIGTHRESH surge event
  SIGTHRESH_TIME: 8,
};
