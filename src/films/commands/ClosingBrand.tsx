import { arrive, fade } from './kinetic-motion.ts';
import { MOTION } from './timeline.ts';
import './kinetic-close.css';

export function ClosingBrand({ t }: { t: number }) {
  const field = arrive(t, MOTION.brand, 0.96, 1);
  return (
    <>
      <div
        className="c2-blue-close"
        style={{ '--grow': field, '--o': fade(t, MOTION.brand, 0.08) }}
      />
      <div
        className="c2-close-wordmark"
        style={{ '--o': fade(t, 21.1, 0.22), '--reveal': arrive(t, 21.04, 0.48, 1) }}
      >
        Atd
      </div>
      <div className="c2-close-title">
        <span style={{ '--reveal': arrive(t, 21.24, 0.62, 0.95) }}>Command</span>
      </div>
      <div className="c2-close-promise">
        <span style={{ '--reveal': arrive(t, 21.49, 0.58, 1) }}>选中，即行动。</span>
      </div>
      <div className="c2-disclosure" style={{ '--o': fade(t, 21.96, 0.25) }}>
        情景演绎 · 已压缩等待时间
      </div>
    </>
  );
}
