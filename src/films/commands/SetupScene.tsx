import { Braces, CheckCheck, Languages, Plus, Sparkles } from 'lucide-react';
import { SettingsWindow } from '../../shared/product/settings/SettingsWindow.tsx';
import { CommandRow, type CommandRowData } from '../../shared/product/settings/CommandRow.tsx';
import { PrimaryButton } from '../../shared/product/settings/controls.tsx';
import { Cursor } from '../../shared/world/Cursor.tsx';
import { cursorAt } from '../../shared/world/cursor.ts';
import { MacDesktop } from './MacDesktop.tsx';
import { EditorialCaption } from './EditorialCaption.tsx';
import { pointerPresence, useChapterTime } from './editing.ts';
import './setup.css';

const COMMANDS: CommandRowData[] = [
  {
    name: '完善编程需求',
    description: '补齐约束与验收条件，直接写回提示词输入框。',
    icon: Braces,
    keys: ['⌃', '⌥', 'F'],
    enabled: true,
  },
  {
    name: '翻译',
    description: '翻译选中的文本，并保留原有格式。',
    icon: Languages,
    keys: ['⌃', '⌥', 'T'],
    enabled: true,
  },
  {
    name: '提取待办事项',
    description: '把笔记整理成下一步行动清单。',
    icon: CheckCheck,
    keys: [],
    enabled: true,
  },
  {
    name: '润色文字',
    description: '让选中的文字更清晰、更自然。',
    icon: Sparkles,
    keys: [],
    enabled: true,
  },
];

export function SetupScene() {
  const t = useChapterTime('setup');
  return (
    <MacDesktop t={t} scene="setup" overlay={<EditorialCaption scene="setup" t={t} />}>
      <SettingsWindow
        lang="zh"
        box={{ x: 294, y: 175, width: 1012, height: 545 }}
        section="commands"
      >
        <div className="cf-command-page">
          <div className="cf-command-page-title">
            <div>
              <h2>命令</h2>
              <p>保存常用的提示词，随时运行。</p>
            </div>
            <PrimaryButton icon={Plus} label="新建命令" />
          </div>
          <div className="cf-command-rows">
            {COMMANDS.map((command, i) => (
              <CommandRow
                key={command.name}
                command={command}
                emptyShortcut="设置快捷键"
                hover={i === 0 && t >= 0.85 && t < 1.7}
              />
            ))}
          </div>
        </div>
      </SettingsWindow>
      <Cursor
        opacity={pointerPresence(t, 1.5)}
        state={cursorAt(t, [
          { at: 0, x: 1288, y: 689 },
          { at: 0.85, x: 972, y: 374, travel: 0.4 },
        ])}
      />
    </MacDesktop>
  );
}
