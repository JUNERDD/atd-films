import { CheckSquare, Ellipsis, Folder, Search, Share, SquarePen, Trash2 } from 'lucide-react';
import { CommandIsland } from '../../shared/product/CommandIsland.tsx';
import type { IslandMoment } from '../../shared/product/island-layout.ts';
import { OptionsMenu } from '../../shared/product/OptionsMenu.tsx';
import { menuFrame, rowCenter, type MenuItem } from '../../shared/product/options-menu.ts';
import { outputChoice, outputMenuItems, outputMenuRow } from '../../shared/product/run-output.ts';
import { SelectionCapsule } from '../../shared/product/SelectionCapsule.tsx';
import { MacWindow } from '../../shared/world/MacWindow.tsx';
import { Cursor } from '../../shared/world/Cursor.tsx';
import { cursorAt, type CursorKey } from '../../shared/world/cursor.ts';
import { textWidthAt } from '../../shared/world/measure.ts';
import { NOTES_AFTER, NOTES_BEFORE } from './content.ts';
import { MacDesktop } from './MacDesktop.tsx';
import { EditorialCaption } from './EditorialCaption.tsx';
import { NOTES as B } from './timeline.ts';
import { pointerPresence, useChapterTime } from './editing.ts';
import { toolbarTargets } from './selection-geometry.ts';
import './office.css';

const TOOL = { x: 536, y: 325 };
const MOMENTS: IslandMoment[] = [
  { at: B.run, content: { kind: 'working', command: '提取待办事项', summary: '负责人' } },
  { at: B.write, content: { kind: 'writing' } },
  { at: B.done, content: { kind: 'done' } },
];

function Sidebar() {
  return (
    <div className="cf-notes-sidebar">
      <h4>iCloud</h4>
      <div>
        <Folder />
        所有 iCloud<span>8</span>
      </div>
      <div data-current="">
        <Folder />
        工作<span>3</span>
      </div>
      <div>
        <Folder />
        个人<span>5</span>
      </div>
      <div className="cf-note-preview">
        <b>Atlas 上线讨论</b>
        <span>10 月 14 日</span>
      </div>
    </div>
  );
}

export function NotesScene() {
  const t = useChapterTime('notes');
  const written = t >= B.written;
  const chevron = toolbarTargets(TOOL, '提取待办事项').chevron;
  const choice = outputChoice('zh', {
    saved: 'panel',
    current: t >= B.picked ? 'insertAfterSelection' : 'panel',
  });
  const menuItems: MenuItem[] = [
    { title: '分组方式', detail: '负责人', submenu: true },
    outputMenuRow(choice),
    'separator',
    { title: '运行', detail: '负责人' },
  ];
  const menuOrigin = { x: chevron.x - 14, y: TOOL.y + 40 };
  const mainFrame = menuFrame(menuOrigin, menuItems);
  const outputRow = rowCenter(menuOrigin, menuItems, 1);
  const submenuOrigin = { x: mainFrame.x + mainFrame.width + 4, y: outputRow.y - 14 };
  const submenuItems = outputMenuItems(choice);
  const pickRow = rowCenter(submenuOrigin, submenuItems, 2);
  const runRow = rowCenter(menuOrigin, menuItems, 3);
  const keys: CursorKey[] = [
    { at: 0, x: 1270, y: 698 },
    { at: B.drag - 0.12, x: 536, y: 388, travel: 0.3 },
    { at: B.drag, x: 536, y: 388, press: 'down' },
    {
      at: B.select,
      x: 536 + textWidthAt(NOTES_BEFORE[4] ?? '', 400, 23),
      y: 472,
      press: 'up',
      travel: B.select - B.drag,
    },
    { at: B.chevronHover, ...chevron, travel: 0.25 },
    { at: B.menuClick, ...chevron, press: true },
    { at: B.outputHover, ...outputRow, travel: 0.18 },
    { at: B.pickHover, ...pickRow, travel: 0.2 },
    { at: B.pickClick, ...pickRow, press: true },
    { at: B.runHover, ...runRow, travel: 0.25 },
    { at: B.runClick, ...runRow, press: true },
    { at: B.run + 0.4, x: 1300, y: 716, travel: 0.3 },
  ];
  const pointer = cursorAt(t, keys);
  const selection = (line: string, index: number) => {
    if (t < B.drag || written) return 0;
    if (t >= B.select) return 1;
    const lineY = 388 + index * 42;
    if (pointer.y > lineY + 20) return 1;
    if (pointer.y < lineY - 20) return 0;
    return Math.min(1, Math.max(0, (pointer.x - 536) / textWidthAt(line, 400, 23)));
  };
  const menuOpen = t >= B.menu && t < B.run;
  return (
    <MacDesktop t={t} scene="notes" overlay={<EditorialCaption scene="notes" t={t} />}>
      <div className="cf-notes-window">
        <MacWindow
          box={{ x: 300, y: 160, width: 1000, height: 620 }}
          sidebar={<Sidebar />}
          sidebarWidth={180}
          toolbar={
            <div className="cf-notes-toolbar">
              <Trash2 />
              <SquarePen />
              <span>Aa</span>
              <CheckSquare />
              <Share />
              <Search />
              <Ellipsis />
            </div>
          }
        >
          <div className="cf-note-paper">
            <div className="cf-note-date">2026年10月14日 09:41</div>
            <h2>{NOTES_BEFORE[0]}</h2>
            <small>{NOTES_BEFORE[1]}</small>
            <div className="cf-note-original">
              {NOTES_BEFORE.slice(2).map((line, index) => (
                <p key={line}>
                  <span style={{ '--selection': selection(line, index) }}>{line}</span>
                </p>
              ))}
            </div>
            {written && (
              <div className="cf-note-actions">
                <h3>{NOTES_AFTER[0]}</h3>
                {NOTES_AFTER.slice(1).map((line) => (
                  <p key={line}>• {line}</p>
                ))}
              </div>
            )}
          </div>
        </MacWindow>
      </div>
      {t >= B.toolbar && t < B.run && (
        <div className="cf-native-tool" style={{ '--x': TOOL.x, '--y': TOOL.y }}>
          <SelectionCapsule
            lang="zh"
            commands={['提取待办事项']}
            more={false}
            options="all"
            chevron={
              menuOpen
                ? 'open'
                : t >= B.menuClick
                  ? 'pressed'
                  : t >= B.chevronHover
                    ? 'hover'
                    : undefined
            }
            entrance={t - B.toolbar}
          />
        </div>
      )}
      {menuOpen && (
        <OptionsMenu
          origin={menuOrigin}
          items={menuItems}
          active={t >= B.outputHover && t < B.picked ? 1 : undefined}
          hover={t >= B.runHover ? 3 : undefined}
          pressed={t >= B.runClick ? 3 : undefined}
        />
      )}
      {t >= B.options && t < B.picked && (
        <OptionsMenu
          origin={submenuOrigin}
          items={submenuItems}
          hover={t >= B.pickHover ? 2 : undefined}
          pressed={t >= B.pickClick ? 2 : undefined}
        />
      )}
      <CommandIsland
        lang="zh"
        t={t}
        moments={MOMENTS}
        anchor={{ x: 820, y: 780 }}
        exit={B.dismiss}
      />
      <Cursor state={pointer} size={1.2} opacity={pointerPresence(t, B.run + 0.5)} />
    </MacDesktop>
  );
}
