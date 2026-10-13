import { COMMON_TEXT } from '../../shared/font-text.ts';
import { useFontsReady } from '../../shared/fonts.ts';
import { LANGS } from '../../shared/language.ts';
import { allText } from './copy.ts';

const SAMPLE = COMMON_TEXT + LANGS.map(allText).join('');

export function useFilmFonts(): boolean {
  return useFontsReady(SAMPLE);
}
