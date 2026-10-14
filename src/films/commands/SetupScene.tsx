import { Braces, CheckCheck, Languages, Plus } from 'lucide-react';
import { SettingsWindow } from '../../shared/product/settings/SettingsWindow.tsx';
import { CommandRow, type CommandRowData } from '../../shared/product/settings/CommandRow.tsx';
import { PrimaryButton } from '../../shared/product/settings/controls.tsx';
import { MacDesktop } from './MacDesktop.tsx';
import { EditorialCaption } from './EditorialCaption.tsx';
import { useChapterTime } from './editing.ts';
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
];
/** A saved configuration, shown as the existing settings kit rather than an invented editor. */
export function SetupScene() {
  const t = useChapterTime('setup');
  return (
    <MacDesktop t={t} scene="setup" overlay={<EditorialCaption scene="setup" t={t} />}>
      <div className="cf-settings-crop">
        <SettingsWindow
          lang="zh"
          box={{ x: 250, y: 237, width: 1100, height: 459 }}
          section="commands"
        >
          <div className="cf-command-page">
            <div className="cf-command-page-title">
              <h2>命令</h2>
              <PrimaryButton icon={Plus} label="新建命令" />
            </div>
            <div className="cf-command-rows">
              {COMMANDS.map((command) => (
                <CommandRow key={command.name} command={command} emptyShortcut="设置快捷键" />
              ))}
            </div>
          </div>
        </SettingsWindow>
      </div>
    </MacDesktop>
  );
}
