import { useCurrentFrame } from 'remotion';
import { smoothstep } from '../../shared/motion/ease.ts';
import { chapterLead, COMMAND_FPS, HANDOFF, sceneDuration, type ChapterId } from './timeline.ts';

/** The operation clock stays put when the surrounding Sequence gains transition handles. */
export function useChapterTime(id: ChapterId): number {
  return useCurrentFrame() / COMMAND_FPS - chapterLead(id);
}

/** Window, caption and pointer leave on separate beats so a result can finish before the cut. */
export function chapterPresence(id: ChapterId, t: number) {
  const duration = sceneDuration(id);
  const incoming = id === 'open' || id === 'close' ? 0 : 1 - smoothstep(-HANDOFF, HANDOFF, t);
  const outgoing =
    id === 'setup' || id === 'close' ? 0 : smoothstep(duration - HANDOFF, duration + HANDOFF, t);
  const enter = id === 'open' || id === 'close' ? smoothstep(0, 0.4, t) : 1;
  const leave = id === 'setup' ? smoothstep(duration - 0.5, duration - 0.03, t) : 0;
  const captionLeave = smoothstep(duration - 0.85, duration - 0.45, t);
  return {
    opacity: enter * (1 - leave),
    x: (incoming - outgoing) * 1920,
    y: (1 - enter) * 12 - leave * 12,
    scale: 1 - leave * 0.025,
    blur: 12 * (incoming * (1 - incoming) + outgoing * (1 - outgoing)) + leave * 2,
    caption: smoothstep(0.24, 0.55, t) * (1 - captionLeave),
  };
}

export const pointerPresence = (t: number, release: number) =>
  smoothstep(0.12, 0.38, t) * (1 - smoothstep(release, release + 0.3, t));
