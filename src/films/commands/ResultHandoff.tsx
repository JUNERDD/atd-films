import { clamp01 } from '../../shared/motion/ease.ts';
import { DROP_PATHS } from '../../shared/world/drops.ts';
import { NOTES_AFTER } from './content.ts';
import { arrive, fade } from './kinetic-motion.ts';
import { CUTS, MOTION, NOTES } from './timeline.ts';

/** The inserted lines leave the paper and become the two unmodified master paths of Atd. */
export function ResultHandoff({ t }: { t: number }) {
  const at = CUTS.notes.start;
  const written = t >= at + NOTES.written;
  const brand = arrive(t, 20.84, 0.7, 0.87);
  return (
    <>
      {NOTES_AFTER.map((line, index) => {
        const compact = arrive(t, at + NOTES.fold + 0.07 + index * 0.085, 0.93, 0.82);
        const upper = index === 0;
        const startY = 624 + index * 82;
        const landX = upper ? 815 : 960;
        const landY = upper ? 350 : 495;
        const endX = upper ? 635 : 700;
        const endY = upper ? 245 : 310;
        const ink = fade(t, at + NOTES.fold + 0.05, 0.18);
        const mark = fade(t, 20.06 + index * 0.06, 0.24);
        return (
          <div
            className="c2-result-piece"
            key={line}
            style={{
              '--x': 338 + (landX - 338) * compact + (endX - landX) * brand,
              '--y': startY + (landY - startY) * compact + (endY - landY) * brand,
              '--w': 1244 - compact * 1099 - brand * 80,
              '--h': 76 + compact * 69 - brand * 80,
              '--rotate': (upper ? -19 : 16) * Math.sin(Math.PI * clamp01(compact)),
              '--o': written ? 1 : 0,
              '--text-o': 1 - fade(t, at + NOTES.fold + 0.05, 0.18),
              '--text-scale': (1244 - compact * 1099) / 1244,
              '--ink': ink,
              '--mark': mark,
              '--white': fade(t, MOTION.brand, 0.1),
              '--radius': 14 + compact * 58,
            }}
          >
            <div className="c2-result-tile" />
            <div className="c2-result-text">• {line}</div>
            <svg
              className="c2-result-mark"
              viewBox={upper ? '18 18 42 42' : '60 60 42 42'}
              aria-hidden="true"
            >
              <path d={upper ? DROP_PATHS.upper : DROP_PATHS.lower} />
            </svg>
          </div>
        );
      })}
    </>
  );
}
