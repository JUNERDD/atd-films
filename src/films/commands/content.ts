/** Public fictional inputs. Results are authored to prove the command, never a live model run. */
export const PROMPT_BEFORE = [
  '购物车算错了：¥328 的键盘买 2 个，',
  '加 ¥99 桌垫，却显示 ¥427。帮我修好。',
];
export const PROMPT_AFTER = [
  '修复购物车总价计算。',
  '验收：¥328 × 2 + ¥99 = ¥755。',
  '保持现有界面与接口；验证数量变化。',
];
export const MAIL_BEFORE = [
  'Hi Alex，',
  '新版原型已就绪。',
  '请在周四 15:00 前给我反馈。',
  '谢谢！Lin',
];
export const MAIL_AFTER = [
  'Hi Alex,',
  'The updated prototype is ready.',
  'Please send feedback by Thursday, 3 p.m.',
  'Thanks! Lin',
];
export const NOTES_BEFORE = [
  'Atlas 上线讨论',
  '10 月 14 日 · 项目会议',
  '陈雨周四前补齐移动端空状态。',
  '林然周五前修好注册邮件链接。',
  '周宁下周一邀请首批 20 人内测。',
];
export const NOTES_AFTER = [
  '待办事项 · 按负责人',
  '陈雨 · 周四：补齐移动端空状态。',
  '林然 · 周五：修复注册邮件链接。',
  '周宁 · 下周一：邀请 20 人内测。',
];
/** Include editorial copy as well as data: Noto Sans SC loads only requested glyph subsets. */
export const EDITORIAL_TEXT = [
  '常用的提示词。选中，就能用。',
  '中文写下。英文写回。',
  '好方法，存下来。下一次，直接用。',
  '保留原文。接上下一步。',
  '好方法，随手可用。',
  '情景演示示例内容节奏经过编排快捷键为自定义示例',
];
export const FILM_TEXT = [
  ...PROMPT_BEFORE,
  ...PROMPT_AFTER,
  ...MAIL_BEFORE,
  ...MAIL_AFTER,
  ...NOTES_BEFORE,
  ...NOTES_AFTER,
  ...EDITORIAL_TEXT,
  '输入来源输出位置结果写回目标语言英语翻译草稿会议待办参数快捷键当前软件收件人主题保存完善编程需求命令补齐约束与验收条件直接写回提示词输入框翻译选中的文本并保留原有格式把笔记整理成下一步行动清单设置快捷键新建命令选择原位改写编码写作整理编排已有功能专业中文原型评审选中正文按住打开选项选择英语确认英语运行翻译运行负责人插入选区后显示在对话中选区末尾',
].join('');
