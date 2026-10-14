import { useCurrentFrame } from 'remotion';
import { smoothstep } from '../../shared/motion/ease.ts';
import {
  chapterLead,
  COMMAND_FPS,
  CUTS,
  frames,
  sceneDuration,
  type ChapterId,
} from './timeline.ts';

/** Handles belong to the Sequence; product actions retain their authored local clock. */
export function useChapterTime(id: ChapterId): number {
  const start = CUTS[id].start;
  const handleFrames = frames(start) - frames(start - chapterLead(id));
  return (useCurrentFrame() - handleFrames) / COMMAND_FPS;
}
/** Clean editorial cuts give every finished result its entire reading hold. */
export const chapterVisible = (id: ChapterId, t: number) =>
  t >= 0 && t < sceneDuration(id) ? 1 : 0;
export const pointerPresence = (t: number, release: number) =>
  smoothstep(0.1, 0.3, t) * (1 - smoothstep(release, release + 0.25, t));
