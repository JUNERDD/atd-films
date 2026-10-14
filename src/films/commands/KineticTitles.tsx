import { DropsGlyph } from '../../shared/product/DropsGlyph.tsx';
import { graphemes } from '../../shared/world/text-units.ts';
import { arrive, fade, visible } from './kinetic-motion.ts';
import { CUTS } from './timeline.ts';

function Phrase({
  t,
  at,
  leave,
  children,
}: {
  t: number;
  at: number;
  leave: number;
  children: string;
}) {
  return (
    <div className="c2-proof-title" style={{ '--o': visible(t, at, leave) }}>
      {graphemes(children).map((letter, index) => (
        <span className="c2-letter-mask" key={`${letter}-${index}`}>
          <span style={{ '--reveal': arrive(t, at + index * 0.018, 0.4, 0.95) }}>{letter}</span>
        </span>
      ))}
    </div>
  );
}

export function KineticTitles({ t }: { t: number }) {
  const second = arrive(t, 0.78, 0.46, 0.84);
  const open = fade(t, 1.64, 0.28);
  const reuse = visible(t, 6.55, 8.75, 0.24);
  return (
    <>
      <div className="c2-opening-label" style={{ '--o': 1 - fade(t, 1.65, 0.25) }}>
        <DropsGlyph className="c2-small-mark" />
        <span>Atd / Command</span>
      </div>
      <div
        className="c2-intro-word"
        style={{
          '--o': 1 - fade(t, 0.72, 0.18),
          '--y': 70 * (1 - arrive(t, -0.09, 0.42, 0.88)) - second * 50,
          '--s': 1 - second * 0.08,
        }}
      >
        选中。
      </div>
      <div
        className="c2-intro-command"
        style={{ '--o': fade(t, 0.79, 0.15) * (1 - open), '--y': (1 - second) * 135 }}
      >
        交给 <b>Command</b>。
      </div>
      <Phrase t={t} at={2.12} leave={3.52}>
        翻译，原位写回。
      </Phrase>
      <div className="c2-reuse-title" style={{ '--o': reuse }}>
        <span style={{ '--reveal': arrive(t, 6.6, 0.46, 0.95) }}>你的方法。</span>
        <strong style={{ '--reveal': arrive(t, 6.75, 0.46, 0.95) }}>随手调用。</strong>
      </div>
      <Phrase t={t} at={CUTS.prompt.start - 0.32} leave={CUTS.prompt.start + 1.08}>
        把需求，说清楚。
      </Phrase>
      <Phrase t={t} at={CUTS.notes.start - 0.3} leave={CUTS.notes.start + 1.05}>
        让下一步，浮现。
      </Phrase>
    </>
  );
}
