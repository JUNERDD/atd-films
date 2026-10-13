import type { EffectBuses } from './audio/cue-bus.ts';
import type { MusicBuses } from './audio/master.ts';

export interface Soundtrack {
  seconds: number;
  score: () => MusicBuses;
  cues: () => EffectBuses;
  track: string;
  stems: string;
}

export interface RenderCut {
  id: string;
  output: string;
  film: string;
  /** Representative seconds for the still-preview command. */
  previewSeconds: readonly number[];
}
