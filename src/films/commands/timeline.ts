/** A 150 BPM editorial grid: one beat is exactly 24 frames at 60 fps. */
export const COMMAND_FPS = 60;
export const COMMAND_BPM = 150;
export const BEAT = 60 / COMMAND_BPM;
export const COMMAND_DURATION = 24;
export const CUTS = {
  intro: { id: 'intro', start: 0, end: 2.4 },
  translate: { id: 'translate', start: 2.4, end: 7.2 },
  reuse: { id: 'reuse', start: 7.2, end: 9.6 },
  prompt: { id: 'prompt', start: 9.6, end: 14.4 },
  notes: { id: 'notes', start: 14.4, end: 20.8 },
  close: { id: 'close', start: 20.8, end: COMMAND_DURATION },
} as const;
export const CHAPTERS = Object.values(CUTS);
export type ChapterId = keyof typeof CUTS;
export const frames = (seconds: number) => Math.round(seconds * COMMAND_FPS);

/** Local story moments; scene-to-scene motion deliberately overlaps these editorial ranges. */
export const TRANSLATE = { select: 0.5, invoke: 1.05, written: 2.0, fold: 3.35 };
export const PROMPT = { select: 0.45, invoke: 1.0, written: 1.9, fold: 3.15 };
export const NOTES = {
  select: 0.4,
  options: 0.9,
  destination: 1.5,
  invoke: 2.0,
  written: 3.15,
  fold: 5.05,
};

/** Object travel begins before the editorial landmarks; sound follows the visible movement. */
export const MOTION = {
  draft: 1.72,
  fan: CUTS.translate.start + TRANSLATE.fold,
  composer: 8.82,
  notes: 12.9,
  brand: 20.45,
};
