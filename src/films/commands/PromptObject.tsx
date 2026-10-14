import { ArrowUp, ArrowUpRight, Code2, Plus } from 'lucide-react';
import { Cursor } from '../../shared/world/Cursor.tsx';
import { cursorAt } from '../../shared/world/cursor.ts';
import { PROMPT_AFTER, PROMPT_BEFORE } from './content.ts';
import { CommandControl } from './CommandControl.tsx';
import { controlTarget } from './selection-geometry.ts';
import { arrive, anticipate, fade, visible } from './kinetic-motion.ts';
import { CUTS, MOTION, PROMPT } from './timeline.ts';

export function PromptObject({ t }: { t: number }) {
  const clock = t - CUTS.prompt.start;
  const fan = arrive(t, 6.3, 0.72, 0.76);
  const chosen = arrive(t, 8.16, 0.42, 0.72);
  const pull = anticipate(t, 8.65);
  const open = arrive(t, MOTION.composer, 0.7, 0.85);
  const leave = arrive(clock, PROMPT.fold, 0.9, 0.84);
  const exitPull = anticipate(clock, PROMPT.fold - 0.15);
  const written = clock >= PROMPT.written;
  const target = controlTarget('完善编程需求', 86, 330);
  const cursor = cursorAt(clock, [
    { at: 0.1, x: 90, y: 148, press: 'down' },
    { at: PROMPT.select, x: 1030, y: 251, travel: 0.3, press: 'up' },
    { at: PROMPT.invoke - 0.06, ...target, travel: 0.3 },
    { at: PROMPT.invoke, ...target, press: true },
    { at: PROMPT.invoke + 0.4, x: 1140, y: 360, travel: 0.3 },
  ]);
  return (
    <div
      className="c2-object c2-prompt-object"
      style={{
        '--x': 2180 - fan * 1490 - open * 445 - leave * 1960 + exitPull * 20,
        '--y': 690 - fan * 300 - chosen * 35 - open * 20 + pull * 15 - leave * 190,
        '--w': 590 + open * 840 - leave * 150,
        '--h': 390 + open * 140 - leave * 290,
        '--r': 34 + open * 4,
        '--rotate': 22 - fan * 21 - chosen * 5 + open * 4 - leave * 15,
        '--o': fade(t, 6.29, 0.12) * (1 - fade(clock, PROMPT.fold + 0.8, 0.2)),
        '--blue': 1 - fade(t, 8.97, 0.23),
        '--shadow': 1,
      }}
    >
      <div className="c2-surface" />
      <div className="c2-command-face" data-blue="" style={{ '--o': 1 - fade(t, 8.9, 0.14) }}>
        <Code2 />
        <div>
          <span>
            完善
            <br />
            编程需求
          </span>
        </div>
        <ArrowUpRight className="c2-face-arrow" />
      </div>
      <div
        className="c2-paper-content c2-composer-content"
        style={{ '--o': visible(t, 9.13, CUTS.prompt.start + PROMPT.fold + 0.2, 0.17) }}
      >
        <div className="c2-composer-label">
          <Code2 />
          <span>编程助手</span>
          <small>草稿 · 未发送</small>
        </div>
        <div className="c2-prompt-text" data-written={written || undefined}>
          {(written ? PROMPT_AFTER : PROMPT_BEFORE).map((line, index) => (
            <p key={index}>
              <span style={{ '--selection': written ? 0 : fade(clock, 0.13 + index * 0.12, 0.2) }}>
                {written && index === 1 ? (
                  <>
                    {line.replace('¥755。', '')}
                    <strong>¥755</strong>。
                  </>
                ) : (
                  line
                )}
              </span>
            </p>
          ))}
        </div>
        <div className="c2-composer-footer">
          <Plus />
          <span />
          <i>
            <ArrowUp />
          </i>
        </div>
        <div className="c2-prompt-command">
          <CommandControl
            t={clock}
            at={PROMPT.select + 0.02}
            invoke={PROMPT.invoke}
            command="完善编程需求"
          />
        </div>
        <Cursor state={cursor} size={2.8} opacity={visible(clock, 0.08, PROMPT.invoke + 0.35)} />
      </div>
    </div>
  );
}
