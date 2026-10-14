import { ChevronDown, Paperclip, Send, Type } from 'lucide-react';
import { CommandIsland } from '../../shared/product/CommandIsland.tsx';
import type { IslandMoment, OptionsCardSpec } from '../../shared/product/island-layout.ts';
import { outputChoice } from '../../shared/product/run-output.ts';
import { MacWindow } from '../../shared/world/MacWindow.tsx';
import { Cursor } from '../../shared/world/Cursor.tsx';
import { cursorAt, type CursorKey } from '../../shared/world/cursor.ts';
import { smoothstep } from '../../shared/motion/ease.ts';
import { MAIL_AFTER, MAIL_BEFORE } from './content.ts';
import { KeyHint, MacDesktop } from './MacDesktop.tsx';
import { EditorialCaption } from './EditorialCaption.tsx';
import { MAIL as B } from './timeline.ts';
import { pointerPresence, useChapterTime } from './editing.ts';
import './office.css';

const output = outputChoice('zh', { saved: 'replaceSelection' });
const sheet = (language: string): OptionsCardSpec => ({
  title: '翻译',
  page: 'sheet',
  current: -1,
  selected: 0,
  values: ['目标语言', output.label],
  details: [language, output.values[output.current] ?? ''],
});
const MOMENTS: IslandMoment[] = [
  { at: B.press, content: { kind: 'press', command: '翻译' } },
  { at: B.options, content: { kind: 'card', card: sheet('简体中文') } },
  {
    at: B.language,
    content: {
      kind: 'card',
      card: {
        title: '目标语言',
        page: 'drill',
        current: 0,
        selected: 0,
        values: ['简体中文', '英语', '繁体中文', '日语', '韩语', '法语', '德语', '西班牙语'],
        moves: [{ at: B.move, to: 1 }],
      },
    },
  },
  { at: B.picked, content: { kind: 'card', card: sheet('英语') } },
  { at: B.run, content: { kind: 'working', command: '翻译', summary: '英语' } },
  { at: B.write, content: { kind: 'writing' } },
  { at: B.done, content: { kind: 'done' } },
];
const POINTER: CursorKey[] = [
  { at: 0, x: 1120, y: 684 },
  { at: B.focus - 0.12, x: 469, y: 378, travel: 0.3 },
  { at: B.focus, x: 469, y: 378, press: true },
  { at: B.select + 0.2, x: 1170, y: 698, travel: 0.25 },
];

function KeyboardActions({ t }: { t: number }) {
  if (t < B.selectKey - 0.15 || t > B.run + 0.35) return null;
  const action =
    t < B.press - 0.12
      ? { keys: ['⌘', 'A'], label: '选中正文', at: B.selectKey }
      : t < B.options
        ? { keys: ['⌃', '⌥', 'T'], label: '按住，打开选项', at: B.press }
        : t < B.language + 0.2
          ? { keys: ['→'], label: '目标语言', at: B.languageKey }
          : t < B.pickKey - 0.15
            ? { keys: ['↓'], label: '英语', at: B.moveKey }
            : t < B.runKey - 0.15
              ? { keys: ['↩'], label: '确认英语', at: B.pickKey }
              : { keys: ['↩'], label: '运行翻译', at: B.runKey };
  const held = action.at === B.press ? t < B.options : t < action.at + 0.18;
  return <KeyHint keys={action.keys} label={action.label} pressed={t >= action.at && held} />;
}

export function MailScene() {
  const t = useChapterTime('mail');
  const written = t >= B.written;
  const text = written ? MAIL_AFTER : MAIL_BEFORE;
  const optionsFocus =
    smoothstep(B.press - 0.2, B.options, t) * (1 - smoothstep(B.run, B.run + 0.42, t));
  return (
    <MacDesktop
      t={t}
      scene="mail"
      overlay={
        <>
          <EditorialCaption scene="mail" t={t} />
          <KeyboardActions t={t} />
        </>
      }
    >
      <div className="cf-mail-window" style={{ '--context-o': 1 - optionsFocus * 0.86 }}>
        <MacWindow
          box={{ x: 340, y: 170, width: 920, height: 570 }}
          title="Atlas · 原型评审"
          toolbar={
            <div className="cf-mail-toolbar">
              <Send />
              <span />
              <Paperclip />
              <Type />
              <ChevronDown />
            </div>
          }
        >
          <div className="cf-mail-headers">
            <div>
              <span>收件人：</span>
              <b>Alex Chen</b>
              <small>alex@example.com</small>
            </div>
            <div>
              <span>主题：</span>
              <strong>Atlas · 原型评审</strong>
            </div>
          </div>
          <div className="cf-mail-body">
            {text.map((paragraph, i) => (
              <p key={i} data-selected={(t >= B.select && !written) || undefined}>
                <span>{paragraph}</span>
              </p>
            ))}
          </div>
          <div className="cf-draft-status">草稿</div>
        </MacWindow>
      </div>
      <CommandIsland
        lang="zh"
        t={t}
        moments={MOMENTS}
        anchor={{ x: 800, y: 750 }}
        exit={B.dismiss}
      />
      <Cursor state={cursorAt(t, POINTER)} size={1.2} opacity={pointerPresence(t, B.press - 0.1)} />
    </MacDesktop>
  );
}
