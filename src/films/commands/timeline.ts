/** Seconds; narrative, product actions and score consume this shared film clock. */
export const COMMAND_FPS = 30;
export const COMMAND_DURATION = 42;
export const CUTS = {
  open: { id: 'open', start: 0, end: 3 },
  mail: { id: 'mail', start: 3, end: 14 },
  setup: { id: 'setup', start: 14, end: 18 },
  code: { id: 'code', start: 18, end: 27 },
  notes: { id: 'notes', start: 27, end: 38 },
  close: { id: 'close', start: 38, end: COMMAND_DURATION },
} as const;
export const CHAPTERS = Object.values(CUTS);
export type ChapterId = keyof typeof CUTS;
export const sceneDuration = (id: ChapterId) => CUTS[id].end - CUTS[id].start;
/** Short handles permit motivated bridges; scene actions still start on their local clock. */
export const HANDOFF = 0.25;
export const chapterLead = (id: ChapterId) => (id === 'open' ? 0 : HANDOFF);
export const chapterTail = (id: ChapterId) => (id === 'close' ? 0 : HANDOFF);
export const chapterAt = (t: number) =>
  [...CHAPTERS].reverse().find((chapter) => t >= chapter.start) ?? CUTS.open;

// Responses follow presses by 3–5 frames. These are editorial intervals, not latency claims.
export const CODE = {
  drag: 0.6,
  select: 1.15,
  toolbar: 1.3,
  hover: 1.7,
  click: 2.0,
  run: 2.13,
  write: 3.8,
  written: 4.0,
  done: 4.2,
  dismiss: 5.15,
};
export const MAIL = {
  focus: 0.5,
  selectKey: 1.0,
  select: 1.13,
  press: 1.6,
  options: 2.2,
  languageKey: 2.65,
  language: 2.78,
  moveKey: 3.2,
  move: 3.33,
  pickKey: 3.7,
  picked: 3.83,
  runKey: 4.4,
  run: 4.53,
  write: 6.8,
  written: 7.0,
  done: 7.2,
  dismiss: 8.1,
};
export const NOTES = {
  drag: 0.6,
  select: 1.2,
  toolbar: 1.35,
  chevronHover: 1.7,
  menuClick: 1.9,
  menu: 2.03,
  outputHover: 2.4,
  options: 2.6,
  pickHover: 3.0,
  pickClick: 3.3,
  picked: 3.43,
  runHover: 3.9,
  runClick: 4.2,
  run: 4.33,
  write: 7.0,
  written: 7.2,
  done: 7.4,
  dismiss: 8.3,
};
export const frames = (seconds: number) => Math.round(seconds * COMMAND_FPS);
