import { COMMON_TEXT } from '../../shared/font-text.ts';
import { useFontsReady } from '../../shared/fonts.ts';
import { collectText } from '../../shared/text.ts';
import { RELEASE_CONTENT } from './content.ts';

const SAMPLE = COMMON_TEXT + collectText(RELEASE_CONTENT);

export function useFilmFonts(): boolean {
  return useFontsReady(SAMPLE);
}
