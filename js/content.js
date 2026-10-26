/* UVIT: THE LAST DETECTION — words and design tables.
   Add jokes, stages, achievements and obstacle weights here without touching the engine.
   In-game text uses a tiny pixel font: letters, digits and . , : ! ? - % / + ' ( ) = _ # < > [ ] * " only. */

// Stages start at a distance in metres. `weights` sets how often each obstacle appears.
const STAGES = [
  {
    name: 'THE INSTITUTE', sub: 'COFFEE IS STILL HOT.', from: 0, theme: 'institute',
    weights: { paper: 4, fp: 2, sign: 2 }, fpMax: 2, fpFloat: 0,
  },
  {
    name: 'THE UVIT DETECTOR', sub: 'PHOTON COUNTING. MOSTLY COUNTING.', from: 300, theme: 'detector',
    weights: { paper: 1, fp: 3, sign: 1, ray: 2, psf: 3 }, fpMax: 4, fpFloat: 0.25,
  },
  {
    name: 'THE SERVER ROOM', sub: 'FANS AT 100%. HOPE AT 12%.', from: 800, theme: 'server',
    weights: { fp: 2, ray: 2, psf: 2, fits: 3, kernel: 2, monster: 1 }, fpMax: 4, fpFloat: 0.3,
  },
  {
    name: 'THE FINAL CATALOGUE', sub: 'DEADLINE: YESTERDAY.', from: 1500, theme: 'catalogue',
    weights: { fp: 3, ray: 3, psf: 2, fits: 2, kernel: 2, monster: 2, sign: 1 }, fpMax: 5, fpFloat: 0.35,
  },
];

// Shown when the trainee hits each obstacle.
const MESSAGES = {
  paper: ['Printed the whole catalogue. Again.', 'Reviewer 2 wants it on paper.', 'That was the draft of the draft.'],
  sign: ['Seminar in progress. You were supposed to duck.', 'Journal club ran 40 minutes over.', 'Quiet please: someone is fitting a PSF.'],
  fp: ['12,000 detections! Surely they are all real!', 'Congratulations. You detected the background.', 'Please inspect these candidates manually.', 'SNR 1.2 and full of confidence.'],
  ray: ['This source was not in the observation plan.', 'Cosmic ray: one frame, zero manners.', 'Single-pixel event. Huge attitude.'],
  psf: ['Centroid unavailable.', 'PSF incomplete. Candidate rejected.', 'Please inspect manually.', 'Half a star is not a star.'],
  fits: ['FITS file too large.', 'MemoryError: try again?', 'Your RAM would like to resign.'],
  kernel: ['Kernel restarted unexpectedly.', 'All variables have been forgotten.', 'The last six hours of analysis would like a word.'],
  monster: ['Background map: 92% zeros. Everything is fine.', 'The background has disappeared.', 'Have you checked your valid blocks?'],
  hdu: ['HDU 1 of 47 says hello.', 'Extension block to the face.', 'Header card overflow.'],
  err: ['MemoryError: unable to allocate 6.0 GiB.', 'Killed: 9', 'Swap is full. So is your patience.'],
};

const MONSTER_WARN = [
  'Background map loading... hold DOWN to slide under it',
  'Bkg estimator: 92% zeros incoming. Slide!',
  'Valid blocks not found. Get low!',
];

const SIGTHRESH_LINE = 'SIGTHRESH dropped to 1.5 sigma! Detections surging!';
const SIGTHRESH_DONE = 'Threshold restored. You survived the surge.';

const BOSS_INTRO = 'Warning: 6.0 GB FITS file opened in memory';
const BOSS_WIN = 'gzip complete: 6.0 GB -> 600 MB. +500';
const BOSS_LOG = [
  'swap usage: 99%',
  'browser closed to free memory',
  'fan speed: jet engine',
  'astropy.io.fits: still reading...',
  'estimated time remaining: 3 years',
  'oom-killer is warming up',
  'please do not touch the laptop',
  'memmap=True? memmap=True.',
];

const MILESTONES = {
  50: 'OBS 050 done. Only 202 to go.',
  100: 'OBS 100. The catalogue grows.',
  150: 'OBS 150. Coffee reserves: low.',
  200: 'OBS 200. The end is (statistically) near.',
  252: '252/252 observations processed. Now do it again.',
};

// Game-over screen (normal case, so these can use any characters).
const GAME_OVER_LINES = [
  'The kernel died, but the science lives on.',
  'You were one source away from finishing.',
  'Your candidate list has been sent for manual inspection.',
  'The background map has entered witness protection.',
  'The observation ended. Your work did not.',
  'Your boss has requested one tiny modification.',
  '252 observations remain. Somehow.',
  'Saved as final_v7_REAL_final.fits',
  'Have you tried lowering the threshold?',
];

const CAUSE_HEADLINES = {
  paper: 'Buried in paperwork',
  sign: 'Walked into a seminar',
  fp: 'Overrun by false positives',
  ray: 'Hit by a cosmic ray',
  psf: 'Candidate rejected',
  fits: 'Out of memory',
  kernel: 'Kernel died',
  monster: 'Lost in the background',
  hdu: 'The 6 GB FITS file won',
  err: 'The 6 GB FITS file won',
};

const ACHIEVEMENTS = [
  { id: 'first_light', name: 'First Light', desc: 'Collect your first genuine source.' },
  { id: 'no_false', name: 'No False Promises', desc: 'Go 30 s and 5 false-positive hordes without touching one.' },
  { id: 'centroid', name: 'Manual Centroiding Champion', desc: 'Dodge 10 truncated PSFs in one run.' },
  { id: 'sigthresh', name: 'SIGTHRESH Roulette', desc: 'Survive a sudden threshold drop.' },
  { id: 'club252', name: 'The 252 Club', desc: 'Process all 252 observations in one run.' },
  { id: 'my_machine', name: 'It Works on My Machine', desc: 'Reach 1,000 points without a kernel crash.' },
  { id: 'coffee', name: 'Coffee-Driven Science', desc: 'Drink 10 coffees in one run.' },
  { id: 'gzip', name: 'gzip -9', desc: 'Outlast the 6 GB FITS file.' },
  { id: 'complete', name: 'Catalogue Complete-ish', desc: 'Score 10,000 points in one run.' },
];

const TIPS = [
  'Hold ↓ to keep sliding. The zero-background monster is wide.',
  'Coffee restores sanity and fills the pipeline meter.',
  'Full meter + X reruns the pipeline: slow motion, no damage, false positives rejected.',
  'Grab RAM chips during the 6 GB FITS fight to shrink the file.',
  'Press ↓ in mid-air to drop faster.',
  'Every 10 m is one observation. 252 to go. Always 252 to go.',
  'Gold sources are perfectly centred. Worth 100.',
];
