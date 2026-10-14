/** Original 120 BPM arrangement; chapter phrasing follows the picture, not UI operations. */
import { createCues, type EffectBuses } from '../../shared/audio/cue-bus.ts';
import { addMono, prng, stereo } from '../../shared/audio/dsp.ts';
import { glass, swoosh } from '../../shared/audio/effects.ts';
import { bassNote, hat, kick, padNote, pluck, rim } from '../../shared/audio/instruments.ts';
import type { MusicBuses } from '../../shared/audio/master.ts';
import { COMMAND_DURATION, CUTS, HANDOFF } from './timeline.ts';

type Harmony = {
  at: number;
  length: number;
  bass: number;
  voices: readonly number[];
};
type Melody = readonly (readonly [at: number, note: number, weight: number])[];

// Open voicings retain common tones while the bass moves: D6/9, Bm7, Gmaj9,
// Em9 and A suspensions. The close finally releases the suspension into D6/9.
const MAIL_HARMONY: readonly Harmony[] = [
  { at: 0, length: 2, bass: 38, voices: [57, 62, 66, 76] },
  { at: 2, length: 2, bass: 35, voices: [57, 62, 66, 73] },
  { at: 4, length: 2, bass: 43, voices: [57, 62, 66, 71] },
  { at: 6, length: 2, bass: 40, voices: [55, 62, 66, 71] },
  { at: 8, length: 3, bass: 45, voices: [57, 62, 64, 71] },
];
const CODE_HARMONY: readonly Harmony[] = [
  { at: 0, length: 2, bass: 35, voices: [57, 62, 66, 73] },
  { at: 2, length: 2, bass: 43, voices: [59, 62, 66, 74] },
  { at: 4, length: 3, bass: 38, voices: [57, 64, 66, 74] },
  { at: 7, length: 2, bass: 45, voices: [57, 61, 64, 71] },
];
const NOTES_HARMONY: readonly Harmony[] = [
  { at: 0, length: 2, bass: 43, voices: [57, 62, 66, 71] },
  { at: 2, length: 2, bass: 42, voices: [57, 62, 66, 76] },
  { at: 4, length: 2, bass: 40, voices: [55, 62, 66, 71] },
  { at: 6, length: 2, bass: 43, voices: [57, 62, 66, 74] },
  { at: 8, length: 3, bass: 45, voices: [57, 61, 64, 71] },
];

export function commandScore(): MusicBuses {
  const random = prng(1013);
  const buses: MusicBuses = {
    dry: stereo(COMMAND_DURATION),
    ducked: stereo(COMMAND_DURATION),
    send: stereo(COMMAND_DURATION),
    kicks: [],
  };
  const sustain = (at: number, length: number, notes: readonly number[], gain: number) => {
    notes.forEach((note, i) => {
      const pan = (i / Math.max(1, notes.length - 1) - 0.5) * 0.9;
      const voice = padNote(
        note,
        length,
        random,
        (t) => 820 + 260 * Math.sin((t / length) * Math.PI),
      );
      addMono(buses.ducked, voice, at, gain, pan);
      addMono(buses.send, voice, at, gain * 0.32, pan);
    });
  };
  const melody = (start: number, notes: Melody, gain: number, decay = 0.3) => {
    notes.forEach(([at, note, weight], i) => {
      const pan = i % 2 === 0 ? -0.24 : 0.24;
      const voice = pluck(note, 0.2 + weight * 0.13, decay);
      addMono(buses.ducked, voice, start + at, gain * weight, pan);
      addMono(buses.send, voice, start + at, gain * weight * 0.28, pan);
    });
  };
  const phrase = (
    start: number,
    harmony: readonly Harmony[],
    energy: number,
    breatheAt: number,
  ) => {
    for (const chord of harmony) {
      sustain(start + chord.at, chord.length + 0.5, chord.voices, 0.029 * energy);
      // Quarter-note grid with a two-beat bass answer; reading holds lose the backbeat
      // and halve the pulse. These are musical phrases, never completion stingers.
      for (let beat = 0; beat * 0.5 < chord.length; beat++) {
        const local = chord.at + beat * 0.5;
        const at = start + local;
        const breathing = local >= breatheAt;
        const weight = breathing ? 0.52 : 1;
        if (beat % (breathing ? 4 : 2) === 0) {
          addMono(buses.dry, kick(random), at, 0.105 * energy * weight);
          buses.kicks.push(at);
          addMono(
            buses.ducked,
            bassNote(chord.bass, breathing ? 0.65 : 0.42),
            at,
            0.064 * energy * weight,
          );
        }
        if (!breathing) {
          if (beat % 4 === 2) addMono(buses.dry, rim(random), at, 0.04 * energy, 0.12);
          addMono(buses.dry, hat(random), at + 0.25, 0.023 * energy * (beat % 2 ? 0.65 : 1), -0.25);
          if (beat % 4 === 3) {
            addMono(buses.ducked, bassNote(chord.bass + 12, 0.2), at + 0.25, 0.027 * energy);
          }
        }
      }
    }
  };

  // A small question, with enough empty space for the opening typography.
  sustain(0, 3.5, [57, 64, 66], 0.024);
  melody(
    0,
    [
      [0.2, 74, 0.85],
      [0.95, 76, 0.6],
      [2.0, 81, 0.7],
    ],
    0.052,
    0.42,
  );

  phrase(CUTS.mail.start, MAIL_HARMONY, 0.92, 7);
  melody(
    CUTS.mail.start,
    [
      [0, 74, 1],
      [0.75, 76, 0.66],
      [1.5, 81, 0.8],
      [2.5, 78, 0.88],
      [3.25, 74, 0.6],
      [4, 71, 0.8],
      [4.75, 74, 0.66],
      [5.5, 78, 0.86],
      [6.25, 76, 0.7],
      [8, 74, 0.6],
      [9.5, 73, 0.48],
    ],
    0.068,
  );

  // The settings bridge suspends the rhythm and opens the upper register.
  sustain(CUTS.setup.start, 2.7, [59, 64, 69, 74], 0.026);
  sustain(CUTS.setup.start + 2, 2.6, [57, 61, 64, 71], 0.024);
  melody(
    CUTS.setup.start,
    [
      [0.5, 83, 0.5],
      [1.5, 81, 0.42],
      [3, 76, 0.58],
    ],
    0.052,
    0.5,
  );

  phrase(CUTS.code.start, CODE_HARMONY, 1.08, 5);
  melody(
    CUTS.code.start,
    [
      [0, 78, 1],
      [0.5, 81, 0.68],
      [1.25, 85, 0.74],
      [1.75, 81, 0.55],
      [2.5, 83, 0.86],
      [3.25, 78, 0.68],
      [4.5, 76, 0.78],
      [5.5, 74, 0.6],
      [7.5, 73, 0.56],
    ],
    0.069,
    0.27,
  );

  phrase(CUTS.notes.start, NOTES_HARMONY, 1.12, 7.5);
  melody(
    CUTS.notes.start,
    [
      [0, 74, 0.95],
      [0.75, 78, 0.7],
      [1.5, 83, 0.84],
      [2.25, 81, 0.76],
      [3, 78, 0.68],
      [3.75, 76, 0.52],
      [4.5, 78, 0.85],
      [5.25, 76, 0.64],
      [6.25, 74, 0.7],
      [8.5, 73, 0.5],
      [9.5, 76, 0.44],
    ],
    0.07,
  );

  // Resolve once at the cut, then leave the final card to breathe. Shared mastering
  // retains its 1.6-second tail fade; no new note attacks during that final fade.
  sustain(CUTS.close.start, 4, [57, 62, 66, 71, 76], 0.029);
  addMono(buses.ducked, bassNote(38, 2.5), CUTS.close.start, 0.047);
  melody(
    CUTS.close.start,
    [
      [0, 74, 0.76],
      [0.75, 69, 0.5],
      [1.5, 74, 0.4],
    ],
    0.054,
    0.5,
  );
  return buses;
}

/** Editorial boundaries only; clicks, typing, execution and completion stay silent. */
export function commandCues(): EffectBuses {
  const cues = createCues(1014, { seconds: COMMAND_DURATION, levelAt: () => 1 });
  cues.place(swoosh(cues.random, 0.5, 550, 1350), CUTS.open.start + 0.06, 0.035, 0, 0.06);
  const duration = HANDOFF * 2;
  for (const [id, gain, from, to] of [
    ['mail', 0.065, 1500, 620],
    ['setup', 0.04, 1250, 520],
    ['code', 0.055, 1700, 700],
    ['notes', 0.06, 1400, 650],
  ] as const) {
    cues.travel(
      swoosh(cues.random, duration, from, to),
      CUTS[id].start - HANDOFF,
      gain,
      (t) => 0.18 - (0.36 * t) / duration,
      0.08,
    );
  }
  cues.place(swoosh(cues.random, 0.5, 1100, 400), CUTS.close.start - 0.48, 0.045, 0, 0.06);
  cues.place(glass(74), CUTS.close.start, 0.016, -0.12, 0.12);
  cues.place(glass(81), CUTS.close.start, 0.006, 0.12, 0.12);
  return cues.buses;
}
