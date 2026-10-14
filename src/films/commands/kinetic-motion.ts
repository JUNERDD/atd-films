import { smoothstep } from '../../shared/motion/ease.ts';
import { springAt } from '../../shared/motion/spring.ts';

/** Quick physical arrivals; reading positions have no continuing drift. */
export const arrive = (t: number, at: number, response = 0.54, damping = 0.78) =>
  springAt(t, at, { response, damping });

export const fade = (t: number, at: number, duration = 0.18) => smoothstep(at, at + duration, t);

export const visible = (t: number, at: number, leave: number, duration = 0.18) =>
  fade(t, at, duration) * (1 - fade(t, leave, duration));

/** A short pull against the outgoing direction before the larger move takes over. */
export const anticipate = (t: number, at: number) =>
  arrive(t, at, 0.24, 0.85) - arrive(t, at + 0.14, 0.32, 0.85);
