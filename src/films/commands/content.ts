/** Authored, publishable examples. They illustrate supported commands; they are not model runs. */
export const PROMPT_BEFORE = [
  '购物车算错了：¥328 的键盘买 2 个，',
  '再加 ¥99 桌垫，页面却显示 ¥427。帮我修好。',
];

export const PROMPT_AFTER = [
  '修复购物车总价计算：单价 × 数量，金额按分累加。',
  '验收：¥328 × 2 + ¥99 = ¥755。',
  '保持现有界面与接口；补充数量与小数金额测试，',
  '完成后检查页面预览。',
];

export const MAIL_BEFORE = [
  'Hi Alex，',
  'Atlas 的新版原型已经准备好了。我们调整了注册流程，也补齐了移动端的空状态。',
  '方便在周四下午 3 点前把反馈发给我们吗？这样我们就能在周五的评审前完成最后一轮修改。',
  '谢谢！\nLin',
];

export const MAIL_AFTER = [
  'Hi Alex,',
  'The updated Atlas prototype is ready. We’ve refined the sign-up flow and added the missing empty states on mobile.',
  'Could you share your feedback by 3 p.m. on Thursday? That would give us time to make the final updates before Friday’s review.',
  'Thanks!\nLin',
];

export const NOTES_BEFORE = [
  'Atlas 上线讨论',
  '10 月 13 日 · 产品 / 设计 / 开发',
  '今天确认：首版只保留邮箱注册，第三方登录放到下一期。',
  '陈雨周四前补齐移动端空状态，并同步给前端。',
  '林然周五前修好注册邮件里的链接，再跑一次完整流程。',
  '周宁下周一发出内测邀请，首批 20 人。',
];

export const NOTES_AFTER = [
  '待办事项 · 按负责人',
  '陈雨 · 周四前：补齐移动端空状态，同步前端。',
  '林然 · 周五前：修复注册邮件链接，验证完整流程。',
  '周宁 · 下周一：向首批 20 人发送内测邀请。',
];

export const FILM_TEXT = [
  ...PROMPT_BEFORE,
  ...PROMPT_AFTER,
  ...MAIL_BEFORE,
  ...MAIL_AFTER,
  ...NOTES_BEFORE,
  ...NOTES_AFTER,
  '先把需求说清楚约束验收一起补齐再交给编程助手把想法推到下一步中文起草按住选英语英文直接写回开完会下一步是什么保留原文把待办接在后面三项谁做何时做好方法随处可用选中就能用让常用提示词回到工作现场当前输入框语言选择行动清单原位',
  '重复的事交给把你的好方法存成命令选中调用回到工作编码写作整理完善修复代码购物袋商品数量合计验证正确参数快捷键输入来源输出位置结果写回当前软件目标语言英语翻译备忘录草稿会议待办情景演示示例内容与结果节奏经过编排专业中文收件人主题发送保存已有功能先把需求说清楚再让助手动手编程补齐约束验收条件一步写回输入框检查计算实现修改金额已修复文件测试通过查看更改最近任务项目自动化技能新建继续描述本地思考中处理中预览',
].join('');
