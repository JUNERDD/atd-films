/** Original, restrained 120 BPM score. Instruments and mastering are shared with the launch film. */
import { createCues, type EffectBuses } from '../../shared/audio/cue-bus.ts';
import { addMono, prng, stereo } from '../../shared/audio/dsp.ts';
import { glass, swoosh } from '../../shared/audio/effects.ts';
import { bassNote, hat, kick, padNote, pluck, rim } from '../../shared/audio/instruments.ts';
import type { MusicBuses } from '../../shared/audio/master.ts';
import { COMMAND_DURATION, CUTS, HANDOFF } from './timeline.ts';

const CHORDS = [
  [50, 57, 61, 64, 69],
  [47, 54, 57, 62, 66],
  [43, 50, 54, 57, 62],
  [45, 52, 57, 59, 64],
] as const;

export function commandScore(): MusicBuses {
  const random = prng(1013);
  const buses: MusicBuses = {
    dry: stereo(COMMAND_DURATION),
    ducked: stereo(COMMAND_DURATION),
    send: stereo(COMMAND_DURATION),
    kicks: [],
  };
  for (let bar = 0; bar < Math.ceil(COMMAND_DURATION / 2); bar++) {
    const start = bar * 2;
    const chord = CHORDS[Math.floor(bar / 2) % CHORDS.length] ?? CHORDS[0];
    const calm = start < CUTS.code.start || start >= CUTS.close.start;
    chord.slice(1).forEach((note, i) => {
      const pad = padNote(note + 12, 2.8, random, calm ? 740 : 1300);
      addMono(buses.ducked, pad, start, 0.028, (i - 1.5) * 0.3);
      addMono(buses.send, pad, start, 0.012, (i - 1.5) * 0.3);
    });
    for (let beat = 0; beat < 4; beat++) {
      const at = start + beat * 0.5;
      if (start >= CUTS.code.start && start < CUTS.close.start) {
        if (!calm || beat % 2 === 0) {
          addMono(buses.dry, kick(random), at, 0.1);
          buses.kicks.push(at);
        }
        if (beat % 2 === 1) addMono(buses.dry, rim(random), at, 0.055, 0.15);
        addMono(buses.ducked, bassNote(chord[0] - 12, 0.32), at, 0.048);
        addMono(buses.dry, hat(random), at + 0.25, calm ? 0.018 : 0.03, -0.23);
      }
      const note = (chord[[1, 3, 2, 4][beat] ?? 1] ?? 62) + 12;
      const voice = pluck(note, 0.28, 0.29);
      const pan = beat % 2 === 0 ? -0.35 : 0.35;
      addMono(buses.ducked, voice, at, calm ? 0.04 : 0.06, pan);
      addMono(buses.send, voice, at, 0.03, pan);
      addMono(buses.ducked, voice, at + 0.375, 0.016, -pan);
    }
  }
  return buses;
}

/** Editorial motion accents only; the product's clicks, typing and completion stay silent. */
export function commandCues(): EffectBuses {
  const cues = createCues(1014, { seconds: COMMAND_DURATION, levelAt: () => 1 });
  cues.place(swoosh(cues.random, 0.5, 550, 1350), CUTS.open.start + 0.06, 0.06, 0, 0.06);

  const duration = HANDOFF * 2;
  for (const [id, gain, from, to] of [
    ['code', 0.105, 1700, 700],
    ['mail', 0.115, 1500, 620],
    ['notes', 0.14, 1400, 650],
    ['setup', 0.14, 1250, 520],
  ] as const) {
    // Follow the windows' right-to-left glide, with the swell at the shared cut point.
    cues.travel(
      swoosh(cues.random, duration, from, to),
      CUTS[id].start - HANDOFF,
      gain,
      (t) => 0.28 - (0.56 * t) / duration,
      0.08,
    );
  }

  cues.place(swoosh(cues.random, 0.5, 1100, 400), CUTS.close.start - 0.48, 0.085, 0, 0.06);
  // A soft D/A dyad signs off the brand card in the score's harmony, away from any UI result.
  cues.place(glass(74), CUTS.close.start + 0.45, 0.022, -0.12, 0.12);
  cues.place(glass(81), CUTS.close.start + 0.45, 0.008, 0.12, 0.12);
  return cues.buses;
}
