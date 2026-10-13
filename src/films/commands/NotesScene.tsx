import { CheckSquare, Ellipsis, Folder, Search, Share, SquarePen, Trash2 } from 'lucide-react';
import { CommandIsland } from '../../shared/product/CommandIsland.tsx';
import type { IslandMoment } from '../../shared/product/island-layout.ts';
import { OptionsMenu } from '../../shared/product/OptionsMenu.tsx';
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
import './office.css';

const MOMENTS: IslandMoment[] = [
  { at: B.run, content: { kind: 'working', command: '提取待办事项', summary: '负责人' } },
  { at: B.write, content: { kind: 'writing' } },
  { at: B.done, content: { kind: 'done' } },
];
const POINTER: CursorKey[] = [
  { at: 0, x: 1294, y: 666 },
  { at: B.drag - 0.12, x: 548, y: 359, travel: 0.3 },
  { at: B.drag, x: 548, y: 359, press: 'down' },
  { at: B.select, x: 823, y: 464, press: 'up', travel: B.select - B.drag },
  { at: B.chevronHover, x: 750, y: 331, travel: 0.25 },
  { at: B.menuClick, x: 750, y: 331, press: true },
  { at: B.outputHover, x: 875, y: 403, travel: 0.18 },
  { at: B.pickHover, x: 1120, y: 465, travel: 0.2 },
  { at: B.pickClick, x: 1120, y: 465, press: true },
  { at: B.runHover, x: 775, y: 440, travel: 0.25 },
  { at: B.runClick, x: 775, y: 440, press: true },
  { at: B.run + 0.4, x: 1288, y: 701, travel: 0.3 },
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
        <span>09:41　今天确认：首版…</span>
      </div>
    </div>
  );
}

export function NotesScene() {
  const t = useChapterTime('notes');
  const written = t >= B.written;
  const pointer = cursorAt(
    t,
    POINTER.map((key) =>
      key.at === B.select ? { ...key, x: 548 + textWidthAt(NOTES_BEFORE[5] ?? '', 400, 15) } : key,
    ),
  );
  const selection = (line: string, index: number) => {
    if (t < B.drag || written) return 0;
    if (t >= B.select) return 1;
    const lineY = 359 + index * 35;
    if (pointer.y > lineY + 13) return 1;
    if (pointer.y < lineY - 13) return 0;
    return Math.min(1, Math.max(0, (pointer.x - 548) / textWidthAt(line, 400, 15)));
  };
  const choice = outputChoice('zh', {
    saved: 'panel',
    current: t >= B.picked ? 'insertAfterSelection' : 'panel',
  });
  const menuOpen = t >= B.menu && t < B.run;
  return (
    <MacDesktop t={t} scene="notes" overlay={<EditorialCaption scene="notes" t={t} />}>
      <div className="cf-notes-window">
        <MacWindow
          box={{ x: 244, y: 164, width: 1112, height: 580 }}
          sidebar={<Sidebar />}
          sidebarWidth={227}
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
          <div className="cf-note-paper" data-written={written || undefined}>
            <div className="cf-note-date">2026年10月13日 09:41</div>
            <h2>{NOTES_BEFORE[0]}</h2>
            <small>{NOTES_BEFORE[1]}</small>
            <div className="cf-note-original">
              {NOTES_BEFORE.slice(2).map((line, i) => (
                <p key={line}>
                  <span style={{ '--selection': selection(line, i) }}>{line}</span>
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
        <div className="cf-native-tool" style={{ '--x': 533, '--y': 313 }}>
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
          origin={{ x: 726, y: 355 }}
          active={t >= B.outputHover && t < B.picked ? 1 : undefined}
          hover={t >= B.runHover ? 3 : undefined}
          pressed={t >= B.runClick ? 3 : undefined}
          items={[
            { title: '分组方式', detail: '负责人', submenu: true },
            outputMenuRow(choice),
            'separator',
            { title: '运行', detail: '负责人' },
          ]}
        />
      )}
      {t >= B.options && t < B.picked && (
        <OptionsMenu
          origin={{ x: 993, y: 389 }}
          items={outputMenuItems(choice)}
          hover={t >= B.pickHover ? 2 : undefined}
          pressed={t >= B.pickClick ? 2 : undefined}
        />
      )}
      <CommandIsland
        lang="zh"
        t={t}
        moments={MOMENTS}
        anchor={{ x: 800, y: 797 }}
        exit={B.dismiss}
      />
      <Cursor state={pointer} size={1.1} opacity={pointerPresence(t, B.run + 0.55)} />
    </MacDesktop>
  );
}
