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
import { toolbarTargets } from './selection-geometry.ts';

const TOOL = { x: 452, y: 327 };
const MOMENTS: IslandMoment[] = [
  { at: B.run, content: { kind: 'working', command: '完善编程需求' } },
  { at: B.write, content: { kind: 'writing' } },
  { at: B.done, content: { kind: 'done' } },
];

export function CodeScene() {
  const t = useChapterTime('code');
  const button = toolbarTargets(TOOL, '完善编程需求').command;
  const keys: CursorKey[] = [
    { at: 0, x: 1140, y: 625 },
    { at: B.drag - 0.12, x: 452, y: 400, travel: 0.3 },
    { at: B.drag, x: 452, y: 400, press: 'down' },
    {
      at: B.select,
      x: 452 + textWidthAt(PROMPT_BEFORE[1] ?? '', 400, 24),
      y: 440,
      press: 'up',
      travel: B.select - B.drag,
    },
    { at: B.hover, ...button, travel: 0.28 },
    { at: B.click, ...button, press: true },
    { at: B.run + 0.3, x: 1160, y: 660, travel: 0.3 },
  ];
  const pointer = cursorAt(t, keys);
  return (
    <MacDesktop t={t} scene="code" overlay={<EditorialCaption scene="code" t={t} />}>
      <CodingWindow t={t} pointer={pointer} />
      {t >= B.toolbar && t < B.run && (
        <div className="cf-native-tool" style={{ '--x': TOOL.x, '--y': TOOL.y }}>
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
        anchor={{ x: 800, y: 690 }}
        exit={B.dismiss}
      />
      <Cursor state={pointer} size={1.25} opacity={pointerPresence(t, B.run + 0.35)} />
    </MacDesktop>
  );
}
