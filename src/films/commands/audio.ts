/** Original 150 BPM score: compact pulse phrases, broken beats and a resolved A-major close. */
import { createCues, type EffectBuses } from '../../shared/audio/cue-bus.ts';
import { addMono, prng, stereo } from '../../shared/audio/dsp.ts';
import { swoosh } from '../../shared/audio/effects.ts';
import { clap, hat, kick } from '../../shared/audio/instruments.ts';
import type { MusicBuses } from '../../shared/audio/master.ts';
import { chordTone, pulseLead, rubberBass } from './audio-instruments.ts';
import { BEAT, COMMAND_DURATION, CUTS, MOTION, NOTES, PROMPT, TRANSLATE } from './timeline.ts';

type Harmony = { at: number; root: number; voices: readonly number[] };
type Melody = readonly (readonly [beat: number, note: number, weight: number])[];

const F_SHARP = [61, 66, 69, 76];
const D_MAJOR = [61, 64, 69, 74];
const A_MAJOR = [61, 64, 69, 71];
const E_SUSPENDED = [59, 64, 69, 73];
const HARMONY: readonly [Harmony, ...Harmony[]] = [
  { at: 0, root: 42, voices: F_SHARP },
  { at: CUTS.translate.start + 4 * BEAT, root: 38, voices: D_MAJOR },
  { at: CUTS.translate.start + 8 * BEAT, root: 45, voices: A_MAJOR },
  { at: CUTS.reuse.start, root: 40, voices: E_SUSPENDED },
  { at: CUTS.prompt.start, root: 42, voices: F_SHARP },
  { at: CUTS.prompt.start + 4 * BEAT, root: 38, voices: D_MAJOR },
  { at: CUTS.prompt.start + 8 * BEAT, root: 45, voices: A_MAJOR },
  { at: CUTS.notes.start, root: 42, voices: F_SHARP },
  { at: CUTS.notes.start + 4 * BEAT, root: 38, voices: D_MAJOR },
  { at: CUTS.notes.start + 8 * BEAT, root: 40, voices: [59, 61, 68, 76] },
  { at: CUTS.notes.start + 12 * BEAT, root: 40, voices: E_SUSPENDED },
  { at: CUTS.close.start + 3 * BEAT, root: 45, voices: A_MAJOR },
];

// Drop attacks before each paste, then let the phrase's tail carry the reading hold.
// The output itself has no cue; the arrangement resumes on its own musical grid.
const READING_SPACES = [
  [CUTS.translate.start + TRANSLATE.written - 0.2, CUTS.translate.start + TRANSLATE.written + 0.8],
  [CUTS.prompt.start + PROMPT.written - 0.2, CUTS.prompt.start + PROMPT.written + 1],
  [CUTS.notes.start + NOTES.written - 0.25, CUTS.notes.start + NOTES.written + 0.95],
] as const;
const isReading = (at: number) => READING_SPACES.some(([from, to]) => at >= from && at < to);

function harmonyAt(at: number): Harmony {
  let current = HARMONY[0];
  for (const chord of HARMONY) {
    if (chord.at > at + 0.0001) break;
    current = chord;
  }
  return current;
}

export function commandScore(): MusicBuses {
  const random = prng(1501024);
  const buses: MusicBuses = {
    dry: stereo(COMMAND_DURATION),
    ducked: stereo(COMMAND_DURATION),
    send: stereo(COMMAND_DURATION),
    kicks: [],
  };
  const drum = (at: number, gain: number) => {
    if (isReading(at)) return;
    addMono(buses.dry, kick(random), at, gain);
    buses.kicks.push(at);
  };
  const bass = (at: number, note: number, gain: number, seconds = 0.23) => {
    if (isReading(at)) return;
    addMono(buses.ducked, rubberBass(note, seconds), at, gain);
  };
  const chord = (at: number, gain: number, seconds = 0.48) => {
    if (isReading(at)) return;
    harmonyAt(at).voices.forEach((note, i) => {
      const voice = chordTone(note, seconds);
      const pan = (i - 1.5) * 0.24;
      addMono(buses.ducked, voice, at, gain, pan);
      addMono(buses.send, voice, at, gain * 0.15, pan);
    });
  };
  const melody = (start: number, phrase: Melody, gain = 0.085) => {
    phrase.forEach(([beat, note, weight], i) => {
      const at = start + beat * BEAT;
      if (isReading(at)) return;
      const voice = pulseLead(note);
      const pan = i % 2 === 0 ? -0.16 : 0.16;
      addMono(buses.ducked, voice, at, gain * weight, pan);
      addMono(buses.send, voice, at, gain * weight * 0.12, pan);
      // A single quieter dotted-eighth answer makes the motif wide without a pad bed.
      addMono(buses.send, voice, at + 0.75 * BEAT, gain * weight * 0.08, -pan);
    });
  };
  const groove = (start: number, end: number, energy: number, dense = false) => {
    const steps = Math.round(((end - start) / BEAT) * 4);
    for (let step = 0; step < steps; step++) {
      const at = start + (step * BEAT) / 4;
      if (isReading(at)) continue;
      const position = step % 16;
      if ([0, 6, 8, 14].includes(position)) drum(at, 0.125 * energy);
      if (position === 4 || position === 12) {
        addMono(buses.dry, clap(random), at, 0.052 * energy, 0.08);
      }
      if (position % 4 === 2 || (dense && position % 4 === 0)) {
        const accent = position % 4 === 2 ? 1 : 0.44;
        addMono(buses.dry, hat(random), at, 0.035 * energy * accent, -0.24);
      }
      if (dense && position === 15) {
        addMono(buses.dry, hat(random), at, 0.012 * energy, 0.25);
      }
      if ([0, 3, 6, 10, 14].includes(position)) {
        const octave = position === 3 ? 12 : position === 10 ? 7 : 0;
        const weight = position === 3 ? 0.54 : position === 10 ? 0.7 : 1;
        bass(at, harmonyAt(at).root + octave, 0.09 * energy * weight, position === 3 ? 0.13 : 0.22);
      }
      if (position === 0 || position === 10) chord(at, 0.025 * energy);
    }
  };

  // Six beats establish the silhouette in sound before the full groove arrives.
  for (const beat of [0, 2, 4]) {
    drum(beat * BEAT, 0.09);
    bass(beat * BEAT, 42, 0.064);
  }
  chord(0, 0.022);
  chord(4 * BEAT, 0.02);
  for (const beat of [3.5, 4.5, 5.5]) {
    addMono(buses.dry, hat(random), beat * BEAT, 0.024, -0.2);
  }
  melody(0, [
    [0, 73, 1],
    [1.5, 76, 0.78],
    [2.5, 69, 0.84],
    [4, 78, 0.65],
  ]);

  groove(CUTS.translate.start, CUTS.translate.end, 0.94);
  melody(CUTS.translate.start, [
    [0, 73, 1],
    [1.5, 76, 0.78],
    [2.5, 69, 0.84],
    [4, 76, 0.6],
    [7.5, 73, 0.82],
    [9, 76, 0.67],
    [10, 69, 0.76],
  ]);

  // The fan/stack bridge sheds the kit and bass; register and empty space give it contrast.
  chord(CUTS.reuse.start, 0.024, 0.8);
  chord(CUTS.reuse.start + 2.5 * BEAT, 0.016, 0.7);
  melody(
    CUTS.reuse.start,
    [
      [0.5, 81, 0.7],
      [2, 80, 0.58],
      [3.5, 76, 0.7],
    ],
    0.072,
  );
  for (const [beat, gain] of [
    [4, 0.012],
    [4.5, 0.016],
    [5, 0.019],
    [5.25, 0.012],
    [5.5, 0.023],
    [5.75, 0.015],
  ] as const) {
    addMono(buses.dry, hat(random), CUTS.reuse.start + beat * BEAT, gain, -0.14);
  }
  bass(CUTS.reuse.end - 0.5 * BEAT, 52, 0.043, 0.15);

  groove(CUTS.prompt.start, CUTS.prompt.end, 1.05, true);
  melody(CUTS.prompt.start, [
    [0, 78, 1],
    [1.5, 81, 0.75],
    [2.5, 76, 0.8],
    [8, 73, 0.85],
    [9.5, 76, 0.7],
    [10.5, 71, 0.76],
  ]);

  groove(CUTS.notes.start, CUTS.notes.end, 1.12, true);
  melody(CUTS.notes.start, [
    [0, 73, 1],
    [1.5, 76, 0.78],
    [2.5, 69, 0.85],
    [4, 76, 0.72],
    [5.5, 78, 0.6],
    [6.5, 81, 0.7],
    [11, 80, 0.76],
    [12.5, 76, 0.68],
    [14, 73, 0.7],
    [15, 71, 0.58],
  ]);

  // Suspended motion becomes A major at 22 seconds. No attacks occur in the final tail.
  drum(CUTS.close.start, 0.082);
  bass(CUTS.close.start, 40, 0.064, 0.5);
  chord(CUTS.close.start, 0.023, 0.8);
  melody(
    CUTS.close.start,
    [
      [0, 76, 0.72],
      [1.5, 73, 0.58],
      [3, 69, 0.75],
    ],
    0.07,
  );
  const resolveAt = CUTS.close.start + 3 * BEAT;
  chord(resolveAt, 0.026, 1.95);
  bass(resolveAt, 45, 0.06, 1.7);
  return buses;
}

/** Shape travel has editorial air accents; selections, commands and results have no sounds. */
export function commandCues(): EffectBuses {
  const cues = createCues(1501025, { seconds: COMMAND_DURATION, levelAt: () => 1 });
  for (const [travelAt, duration, gain, from, to, direction] of [
    [MOTION.draft, 0.38, 0.044, 650, 2300, 1],
    [MOTION.fan, 0.46, 0.047, 2400, 550, -1],
    [MOTION.composer, 0.4, 0.058, 850, 3100, 1],
    [MOTION.notes, 0.5, 0.052, 2100, 650, -1],
    [MOTION.brand, 0.64, 0.05, 2600, 420, 1],
  ] as const) {
    cues.travel(
      swoosh(cues.random, duration, from, to),
      travelAt + 0.02,
      gain,
      (t) => direction * (-0.3 + (0.6 * t) / duration),
      0.06,
    );
  }
  return cues.buses;
}
