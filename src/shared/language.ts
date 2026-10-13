export const LANGS = ['en', 'zh'] as const;
export type Lang = (typeof LANGS)[number];

/** HTML language tags for the two existing cuts. */
export function htmlLang(lang: Lang): string {
  return lang === 'zh' ? 'zh-CN' : 'en';
}
