import type { RenderCut, Soundtrack } from '../../shared/render-contract.ts';
import { commandCues, commandScore } from './audio.ts';
import { COMMAND_DURATION } from './timeline.ts';

export const cuts = {
  'commands-zh': {
    id: 'AtdCommandsZh',
    output: 'out/atd-commands-zh.mp4',
    film: 'commands',
    previewSeconds: [1.6, 6.55, 11.5, 16.2, 22.8, 30.3, 35.5, 40.5],
  },
} as const satisfies Record<string, RenderCut>;

export const soundtracks = {
  commands: {
    seconds: COMMAND_DURATION,
    score: commandScore,
    cues: commandCues,
    track: 'command-film.wav',
    stems: 'command-film-',
  },
} satisfies Record<string, Soundtrack>;
