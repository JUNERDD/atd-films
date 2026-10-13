import { COMMON_TEXT } from '../../shared/font-text.ts';
import { useFontsReady } from '../../shared/fonts.ts';
import { FILM_TEXT } from './content.ts';

const SAMPLE = COMMON_TEXT + FILM_TEXT;

export function useFilmFonts(): boolean {
  return useFontsReady(SAMPLE);
}
