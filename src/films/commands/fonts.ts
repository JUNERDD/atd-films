import { useEffect, useState } from 'react';
import { staticFile, useDelayRender } from 'remotion';
import { COMMON_TEXT } from '../../shared/font-text.ts';
import { useFontsReady } from '../../shared/fonts.ts';
import { FILM_TEXT } from './content.ts';

const SAMPLE =
  COMMON_TEXT +
  FILM_TEXT +
  '英语已保存草稿未发送编程助手备忘录上线讨论显示在对话中输出位置插入选区后';

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
