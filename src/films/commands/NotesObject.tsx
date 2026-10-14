import { ArrowUpRight, List, NotebookPen } from 'lucide-react';
import { Cursor } from '../../shared/world/Cursor.tsx';
import { cursorAt } from '../../shared/world/cursor.ts';
import { NOTES_BEFORE } from './content.ts';
import { CommandControl, OutputChoice } from './CommandControl.tsx';
import { controlTarget } from './selection-geometry.ts';
import { arrive, anticipate, fade, visible } from './kinetic-motion.ts';
import { CUTS, MOTION, NOTES } from './timeline.ts';
import { ResultHandoff } from './ResultHandoff.tsx';

export function NotesObject({ t }: { t: number }) {
  const clock = t - CUTS.notes.start;
  const fan = arrive(t, 6.51, 0.78, 0.75);
  const aside = arrive(t, 8.78, 0.73, 0.86);
  const open = arrive(t, MOTION.notes, 0.82, 0.83);
  const fold = arrive(clock, NOTES.fold, 0.86, 0.85);
  const pull = anticipate(clock, NOTES.fold - 0.14);
  const written = clock >= NOTES.written;
  const target = controlTarget('提取待办事项', 88, 350);
  const cursor = cursorAt(clock, [
    { at: 0.08, x: 88, y: 165, press: 'down' },
    { at: NOTES.select, x: 740, y: 235, travel: 0.3, press: 'up' },
    { at: NOTES.options, x: 1250, y: 347, travel: 0.37, press: true },
    { at: NOTES.destination, x: 1090, y: 484, travel: 0.34, press: true },
    { at: NOTES.invoke - 0.055, ...target, travel: 0.34 },
    { at: NOTES.invoke, ...target, press: true },
    { at: NOTES.invoke + 0.36, x: 1160, y: 440, travel: 0.3 },
  ]);
  return (
    <>
      <div
        className="c2-object c2-notes-object"
        style={{
          '--x': 2460 - fan * 1350 + aside * 1250 - open * 2110 - fold * 1720 + pull * 22,
          '--y': 690 - fan * 270 - aside * 40 - open * 95 + fold * 220,
          '--w': 540 + open * 880 - fold * 420,
          '--h': 365 + open * 290 - fold * 160,
          '--r': 32 + open * 8,
          '--rotate': 28 - fan * 15 + aside * 15 - open * 28 - fold * 13,
          '--o': fade(t, 6.5, 0.12) * (1 - fade(clock, NOTES.fold + 0.72, 0.25)),
          '--blue': 0,
          '--shadow': 1,
        }}
      >
        <div className="c2-surface" />
        <div className="c2-command-face" style={{ '--o': 1 - fade(t, MOTION.notes + 0.09, 0.2) }}>
          <List />
          <div>
            <span>
              提取
              <br />
              待办事项
            </span>
          </div>
          <ArrowUpRight className="c2-face-arrow" />
        </div>
        <div
          className="c2-paper-content c2-note-content"
          style={{
            '--o': visible(t, MOTION.notes + 0.38, CUTS.notes.start + NOTES.fold + 0.2, 0.2),
          }}
        >
          <div className="c2-document-header">
            <NotebookPen />
            <span>备忘录</span>
            <small>上线讨论</small>
          </div>
          <div className="c2-note-original">
            {NOTES_BEFORE.map((line, index) => (
              <p key={line}>
                <span style={{ '--selection': written ? 0 : fade(clock, 0.09 + index * 0.1, 0.2) }}>
                  {line}
                </span>
              </p>
            ))}
          </div>
          <div className="c2-notes-command">
            <CommandControl
              t={clock}
              at={NOTES.select + 0.025}
              invoke={NOTES.invoke}
              command="提取待办事项"
            />
          </div>
          <OutputChoice
            t={clock}
            at={NOTES.options}
            choose={NOTES.destination}
            invoke={NOTES.invoke}
          />
          <Cursor state={cursor} size={2.8} opacity={visible(clock, 0.055, NOTES.invoke + 0.38)} />
        </div>
      </div>
      <ResultHandoff t={t} />
    </>
  );
}
