import { CommandIsland } from '../../shared/product/CommandIsland.tsx';
import { SelectionCapsule } from '../../shared/product/SelectionCapsule.tsx';
import type { IslandMoment } from '../../shared/product/island-layout.ts';
import { Cursor } from '../../shared/world/Cursor.tsx';
import { cursorAt, type CursorKey } from '../../shared/world/cursor.ts';
import { textWidthAt } from '../../shared/world/measure.ts';
import { PROMPT_BEFORE } from './content.ts';
import { CodingWindow } from './CodingWindow.tsx';
import { MacDesktop } from './MacDesktop.tsx';
import { EditorialCaption } from './EditorialCaption.tsx';
import { CODE as B } from './timeline.ts';
import { pointerPresence, useChapterTime } from './editing.ts';

const MOMENTS: IslandMoment[] = [
  { at: B.run, content: { kind: 'working', command: '完善编程需求' } },
  { at: B.write, content: { kind: 'writing' } },
  { at: B.done, content: { kind: 'done' } },
];

const POINTER: CursorKey[] = [
  { at: 0, x: 1025, y: 719 },
  { at: B.drag - 0.12, x: 322, y: 557, travel: 0.3 },
  { at: B.drag, x: 322, y: 557, press: 'down' },
  { at: B.select, x: 714, y: 584, press: 'up', travel: B.select - B.drag },
  { at: B.hover, x: 487, y: 511, travel: 0.3 },
  { at: B.click, x: 487, y: 511, press: true },
  { at: B.run + 0.3, x: 901, y: 751, travel: 0.3 },
  { at: B.sendHover, x: 866, y: 700, travel: 0.28 },
  { at: B.sendClick, x: 866, y: 700, press: true },
  { at: B.sent + 0.4, x: 970, y: 730, travel: 0.3 },
];

export function CodeScene() {
  const t = useChapterTime('code');
  const pointer = cursorAt(
    t,
    POINTER.map((key) =>
      key.at === B.select ? { ...key, x: 322 + textWidthAt(PROMPT_BEFORE[1] ?? '', 400, 16) } : key,
    ),
  );
  return (
    <MacDesktop t={t} scene="code" overlay={<EditorialCaption scene="code" t={t} />}>
      <CodingWindow t={t} pointer={pointer} />
      {t >= B.toolbar && t < B.run && (
        <div className="cf-native-tool" style={{ '--x': 322, '--y': 493 }}>
          <SelectionCapsule
            lang="zh"
            commands={['完善编程需求']}
            more={false}
            options="all"
            entrance={t - B.toolbar}
            hover={t >= B.hover ? 1 : undefined}
            pressed={t >= B.click ? 1 : undefined}
          />
        </div>
      )}
      <CommandIsland
        lang="zh"
        t={t}
        moments={MOMENTS}
        anchor={{ x: 800, y: 797 }}
        exit={B.dismiss}
      />
      <Cursor state={pointer} size={1.1} opacity={pointerPresence(t, B.sent + 1.1)} />
    </MacDesktop>
  );
}
