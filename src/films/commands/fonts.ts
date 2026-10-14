import { useEffect, useState } from 'react';
import { staticFile, useDelayRender } from 'remotion';
import { COMMON_TEXT } from '../../shared/font-text.ts';
import { useFontsReady } from '../../shared/fonts.ts';
import { FILM_TEXT } from './content.ts';

const SAMPLE =
  COMMON_TEXT +
  FILM_TEXT +
  '问目标语言确认英语按住打开选项选中正文草稿收件人主题原型评审高个人工作所有' +
  '好方法随手可用情景演示示例内容节奏经过编排快捷键为自定义示例新建命令设置快捷键' +
  '分组方式负责人提取待办事项补齐约束与验收条件翻译选中的文本并保留原有格式把笔记整理成下一步行动清单';

let displayReady = false;
let displayLoading: Promise<void> | undefined;

function loadDisplayFont(): Promise<void> {
  displayLoading ??= new FontFace(
    'Sora',
    `url(${staticFile('command-film/fonts/sora-variable.ttf')})`,
    { weight: '100 800', style: 'normal' },
  )
    .load()
    .then((font) => {
      document.fonts.add(font);
      displayReady = true;
    });
  return displayLoading;
}

/** Load the film's display face separately so other films keep their original typography. */
export function useFilmFonts(): boolean {
  const uiReady = useFontsReady(SAMPLE);
  const { delayRender, continueRender, cancelRender } = useDelayRender();
  const [ready, setReady] = useState(displayReady);
  const [handle] = useState(() =>
    displayReady ? null : delayRender('Loading Command display font'),
  );

  useEffect(() => {
    if (handle === null) return;
    loadDisplayFont()
      .then(() => {
        setReady(true);
        continueRender(handle);
      })
      .catch((error: unknown) => cancelRender(error));
  }, [cancelRender, continueRender, handle]);

  return uiReady && ready;
}
