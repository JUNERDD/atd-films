import type { RenderCut, Soundtrack } from '../../shared/render-contract.ts';
import { renderCues } from './audio/cues.ts';
import { renderScore } from './audio/score.ts';
import { DURATION } from './timeline.ts';

export const cuts = {
  en: {
    id: 'AtdPromo',
    output: 'out/atd-promo-en.mp4',
    film: 'launch',
    previewSeconds: [5, 13, 29, 46, 54, 60],
  },
  zh: {
    id: 'AtdPromoZh',
    output: 'out/atd-promo-zh.mp4',
    film: 'launch',
    previewSeconds: [5, 13, 29, 46, 54, 60],
  },
} as const satisfies Record<string, RenderCut>;

export const soundtracks = {
  launch: {
    seconds: DURATION,
    score: renderScore,
    cues: renderCues,
    track: 'soundtrack.wav',
    stems: '',
  },
} satisfies Record<string, Soundtrack>;
