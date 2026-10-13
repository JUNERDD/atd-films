import { cuts as launchCuts, soundtracks as launchSoundtracks } from './launch/render.ts';
import { cuts as releaseCuts, soundtracks as releaseSoundtracks } from './release-0.8/render.ts';
import { cuts as commandCuts, soundtracks as commandSoundtracks } from './commands/render.ts';
import type { RenderCut } from '../shared/render-contract.ts';

/** Node-side assembly; film recipes stay in their own folders. */
export const SOUNDTRACKS = { ...launchSoundtracks, ...releaseSoundtracks, ...commandSoundtracks };
export type FilmName = keyof typeof SOUNDTRACKS;
export const CUTS = { ...launchCuts, ...releaseCuts, ...commandCuts } satisfies Record<
  string,
  RenderCut & { film: FilmName }
>;
export type Cut = keyof typeof CUTS;
export const CUT_NAMES = Object.keys(CUTS) as Cut[];

export function isCut(name: string): name is Cut {
  return Object.hasOwn(CUTS, name);
}
