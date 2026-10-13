/** Seconds; the editorial camera and product interactions share this clock. */
export const COMMAND_FPS = 30;
export const COMMAND_DURATION = 38;
export const CUTS = {
  open: { id: 'open', start: 0, end: 2 },
  code: { id: 'code', start: 2, end: 15 },
  mail: { id: 'mail', start: 15, end: 23.5 },
  notes: { id: 'notes', start: 23.5, end: 32 },
  setup: { id: 'setup', start: 32, end: 35 },
  close: { id: 'close', start: 35, end: COMMAND_DURATION },
} as const;
export const CHAPTERS = Object.values(CUTS);
export type ChapterId = keyof typeof CUTS;
export const sceneDuration = (id: ChapterId) => CUTS[id].end - CUTS[id].start;
/** Pre-roll and tail keep both windows mounted through each editorial handoff. */
export const HANDOFF = 0.4;
export const chapterLead = (id: ChapterId) => (id === 'open' ? 0 : HANDOFF);
export const chapterTail = (id: ChapterId) => (id === 'close' ? 0 : HANDOFF);
export const chapterAt = (t: number) =>
  [...CHAPTERS].reverse().find((chapter) => t >= chapter.start) ?? CUTS.open;

// Clicks/keys precede their responses by 3–5 frames. Writing begins before text is pasted;
// success follows the paste. Pointer keys and surface states use these moments; Atd is silent.
export const CODE = {
  drag: 0.55,
  select: 1.1,
  toolbar: 1.25,
  hover: 1.6,
  click: 1.9,
  run: 2,
  write: 3.8,
  written: 4,
  done: 4.2,
  dismiss: 4.85,
  sendHover: 6.1,
  sendClick: 6.3,
  sent: 6.4,
  respond: 6.65,
  inspect: 7.15,
  edit: 8.3,
  verify: 9.4,
  verified: 10.3,
  preview: 10.5,
  complete: 10.85,
};
export const MAIL = {
  focus: 0.55,
  selectKey: 1.05,
  select: 1.15,
  press: 1.45,
  options: 2.1,
  languageKey: 2.45,
  language: 2.55,
  moveKey: 2.95,
  move: 3.05,
  pickKey: 3.45,
  picked: 3.55,
  runKey: 4,
  run: 4.1,
  write: 6.4,
  written: 6.6,
  done: 6.8,
  dismiss: 7.5,
};
export const NOTES = {
  drag: 0.5,
  select: 1.15,
  toolbar: 1.3,
  chevronHover: 1.55,
  menuClick: 1.75,
  menu: 1.85,
  outputHover: 2.1,
  options: 2.25,
  pickHover: 2.5,
  pickClick: 2.65,
  picked: 2.75,
  runHover: 3.05,
  runClick: 3.2,
  run: 3.3,
  write: 5.5,
  written: 5.7,
  done: 5.9,
  dismiss: 6.6,
};

export const frames = (seconds: number) => Math.round(seconds * COMMAND_FPS);
