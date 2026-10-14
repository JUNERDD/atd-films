import type { RenderCut, Soundtrack } from '../../shared/render-contract.ts';
import { commandCues, commandScore } from './audio.ts';
import { COMMAND_DURATION } from './timeline.ts';

export const cuts = {
  'commands-zh': {
    id: 'AtdCommandsZh',
    output: 'out/atd-commands-zh.mp4',
    film: 'commands',
    previewSeconds: [0.85, 3.15, 4.8, 8.0, 11.8, 16.15, 18.2, 23.0],
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
