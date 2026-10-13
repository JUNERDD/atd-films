import { cameraAt, REST_SHOT, type CameraState, type Shot } from '../../shared/world/camera.ts';
import { clamp01, smoothstep } from '../../shared/motion/ease.ts';
import { CODE, MAIL, NOTES, sceneDuration, type ChapterId } from './timeline.ts';

/** Film camera only: keep source UI, pointer and window geometry in their original point space. */
function focus(at: number, x: number, y: number, zoom: number): Shot {
  const halfWidth = 800 / zoom;
  const halfHeight = 450 / zoom;
  return {
    at,
    x: Math.max(halfWidth, Math.min(1600 - halfWidth, x)) * 1.2,
    y: Math.max(halfHeight, Math.min(900 - halfHeight, y)) * 1.2,
    zoom,
    spring: { response: 0.62, damping: 1 },
  };
}

export const CODE_SHOTS = [
  focus(0, 800, 450, 1),
  focus(0.6, 620, 610, 1.55),
  focus(CODE.written + 0.3, 620, 620, 1.7),
  focus(CODE.sent + 0.05, 815, 455, 1.13),
  focus(CODE.preview - 0.25, 910, 475, 1.25),
];

export const MAIL_SHOTS = [
  focus(0, 800, 450, 1),
  focus(0.55, 800, 555, 1.3),
  focus(MAIL.options - 0.15, 800, 650, 1.8),
  focus(MAIL.run + 0.2, 800, 600, 1.45),
  focus(MAIL.written - 0.3, 800, 520, 1.27),
];

export const NOTES_SHOTS = [
  focus(0, 800, 450, 1),
  focus(0.55, 880, 470, 1.55),
  focus(NOTES.options - 0.15, 940, 460, 1.75),
  focus(NOTES.run + 0.12, 850, 625, 1.4),
  focus(NOTES.written - 0.22, 880, 560, 1.5),
];

export const SETUP_SHOTS = [focus(0, 800, 450, 1), focus(0.4, 800, 450, 1.3)];

const SHOTS: Record<ChapterId, readonly Shot[]> = {
  open: [REST_SHOT],
  code: CODE_SHOTS,
  mail: MAIL_SHOTS,
  notes: NOTES_SHOTS,
  setup: SETUP_SHOTS,
  close: [REST_SHOT],
};

/** Arrive at the same resting desktop before a handoff, including its velocity. */
export function filmCameraAt(id: ChapterId, t: number): CameraState {
  const state = cameraAt(t, SHOTS[id]);
  const end = sceneDuration(id);
  const start = end - (id === 'mail' ? 1.05 : 1.35);
  const finish = end - 0.4;
  const u = clamp01((t - start) / (finish - start));
  const p = smoothstep(start, finish, t);
  const rate = (6 * u * (1 - u)) / (finish - start);
  return {
    ...state,
    x: state.x + (REST_SHOT.x - state.x) * p,
    y: state.y + (REST_SHOT.y - state.y) * p,
    zoom: state.zoom + (1 - state.zoom) * p,
    vx: state.vx * (1 - p) + (REST_SHOT.x - state.x) * rate,
    vy: state.vy * (1 - p) + (REST_SHOT.y - state.y) * rate,
    vzoom: state.vzoom * (1 - p) + (1 - state.zoom) * rate,
  };
}
