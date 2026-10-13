import { springAt } from '../../shared/motion/spring.ts';
import { smoothstep } from '../../shared/motion/ease.ts';
import { CODE, MAIL, NOTES } from './timeline.ts';
import './editorial.css';

const COPY = {
  code: [
    { at: 0, title: '先把需求，说清楚。', label: '01 / VIBE CODING' },
    { at: CODE.written + 0.25, title: '约束、验收，一起补齐。', label: 'COMMAND → 当前输入框' },
    { at: CODE.sent, title: '再交给编程助手。', label: '发送 → 修改 → 验证' },
    { at: CODE.preview, title: '¥427 → ¥755，检查通过。', label: 'CODING / 结果预览' },
  ],
  mail: [
    { at: 0, title: '中文起草。', label: '02 / 邮件翻译' },
    { at: MAIL.options, title: '按住，选英语。', label: 'COMMAND / 翻译' },
    { at: MAIL.written, title: '英文，直接写回。', label: '中文草稿 → 英文邮件' },
  ],
  notes: [
    { at: 0, title: '开完会，下一步是什么？', label: '03 / 会议整理' },
    { at: NOTES.picked, title: '保留原文，把待办接在后面。', label: 'COMMAND / 提取待办事项' },
    { at: NOTES.written, title: '3 项待办。谁做，何时做。', label: '会议记录 → 行动清单' },
  ],
  setup: [{ at: 0, title: '把好方法，存成常用操作。', label: 'ATD / COMMANDS' }],
} as const;

/** Editorial lower third, outside the filmed desktop; never masquerades as product UI. */
export function EditorialCaption({ scene, t }: { scene: keyof typeof COPY; t: number }) {
  const entries = COPY[scene];
  return (
    <div className="cf-editorial-caption">
      <div className="cf-editorial-stack">
        {entries.map((entry, index) => {
          const next = entries[index + 1];
          if (t < entry.at || (next && t > next.at + 0.04)) return null;
          const reveal = springAt(t, entry.at + 0.04, { response: 0.38, damping: 1 });
          const leave = next ? smoothstep(next.at - 0.18, next.at + 0.04, t) : 0;
          return (
            <div
              className="cf-editorial-copy"
              key={entry.at}
              style={{
                '--caption-o': reveal * (1 - leave),
                '--caption-y': (1 - reveal) * 20 - leave * 12,
              }}
            >
              <div className="cf-editorial-label">{entry.label}</div>
              <div className="cf-editorial-mask">
                <strong>{entry.title}</strong>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
