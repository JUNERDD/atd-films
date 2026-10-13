import type { RenderCut, Soundtrack } from '../../shared/render-contract.ts';
import { renderReleaseCues } from './audio/cues.ts';
import { renderReleaseScore } from './audio/score.ts';
import { RELEASE_DURATION } from './timeline.ts';

export const cuts = {
  'release-en': {
    id: 'AtdRelease',
    output: 'out/atd-release-0.8-en.mp4',
    film: 'release-en',
    previewSeconds: [4, 13, 24, 36, 45, 57],
  },
  'release-zh': {
    id: 'AtdReleaseZh',
    output: 'out/atd-release-0.8-zh.mp4',
    film: 'release-zh',
    previewSeconds: [4, 13, 24, 36, 45, 57],
  },
} as const satisfies Record<string, RenderCut>;

export const soundtracks = {
  'release-en': {
    seconds: RELEASE_DURATION,
    score: renderReleaseScore,
    cues: () => renderReleaseCues('en'),
    track: 'release-en.wav',
    stems: 'release-en-',
  },
  'release-zh': {
    seconds: RELEASE_DURATION,
    score: renderReleaseScore,
    cues: () => renderReleaseCues('zh'),
    track: 'release-zh.wav',
    stems: 'release-zh-',
  },
} satisfies Record<string, Soundtrack>;
