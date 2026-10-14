import { cameraAt, REST_SHOT, type Shot } from '../../shared/world/camera.ts';
import { CODE, MAIL, NOTES, type ChapterId } from './timeline.ts';

/** Editorial crops share one point space with the actual controls and their pointer. */
const focus = (at: number, x: number, y: number, zoom: number): Shot => ({
  at,
  x: x * 1.2,
  y: y * 1.2,
  zoom,
  spring: { response: 0.52, damping: 1 },
});

export const MAIL_SHOTS = [
  focus(0, 800, 448, 1.14),
  focus(MAIL.press - 0.2, 800, 625, 1.94),
  focus(MAIL.run + 0.18, 800, 565, 1.42),
  focus(MAIL.written - 0.38, 800, 446, 1.36),
];
export const CODE_SHOTS = [
  focus(0, 800, 450, 1.24),
  focus(CODE.toolbar - 0.15, 735, 455, 1.9),
  focus(CODE.run + 0.18, 800, 512, 1.45),
  focus(CODE.written - 0.28, 800, 451, 1.4),
];
export const NOTES_SHOTS = [
  focus(0, 800, 460, 1.16),
  focus(NOTES.toolbar - 0.14, 930, 429, 1.9),
  focus(NOTES.run + 0.12, 820, 513, 1.25),
  focus(NOTES.written - 0.4, 844, 483, 1.36),
];
export const SETUP_SHOTS = [focus(0, 800, 450, 1), focus(0.65, 917, 438, 1.9)];
const SHOTS: Record<ChapterId, readonly Shot[]> = {
  open: [REST_SHOT],
  mail: MAIL_SHOTS,
  setup: SETUP_SHOTS,
  code: CODE_SHOTS,
  notes: NOTES_SHOTS,
  close: [REST_SHOT],
};
/** Hold the resolved crop until the cut; no return move steals time from reading. */
export const filmCameraAt = (id: ChapterId, t: number) => cameraAt(t, SHOTS[id]);
