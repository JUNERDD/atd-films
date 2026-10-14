/** Concise fictional proof; text returns in one write, never simulated model-token streaming. */
export const MAIL_BEFORE = ['周四见，Alex。'];
export const MAIL_AFTER = ['See you Thursday, Alex.'];
export const PROMPT_BEFORE = ['购物车：¥328 × 2 + ¥99，', '现在却显示 ¥427。修好它。'];
export const PROMPT_AFTER = ['修复购物车总价计算。', '验收：¥328 × 2 + ¥99 = ¥755。'];
export const NOTES_BEFORE = ['陈雨周四补齐空状态。', '林然周五修好邮件链接。'];
export const NOTES_AFTER = ['陈雨 · 周四 · 补齐空状态', '林然 · 周五 · 修复邮件链接'];
export const EDITORIAL_TEXT = [
  '选中。',
  '交给 Command。',
  '翻译，原位写回。',
  '你的方法。随手调用。',
  '把需求，说清楚。',
  '让下一步，浮现。',
  '选中，即行动。',
];
export const FILM_TEXT = [
  ...MAIL_BEFORE,
  ...MAIL_AFTER,
  ...PROMPT_BEFORE,
  ...PROMPT_AFTER,
  ...NOTES_BEFORE,
  ...NOTES_AFTER,
  ...EDITORIAL_TEXT,
  '翻译英语完善编程需求提取待办事项插入选区后原文待办草稿命令可复用情景演绎已压缩等待时间问运行输出位置',
].join('');
