/** Film-local timbres built from the shared band-limited oscillators and envelopes. */
import {
  arEnvelope,
  filter,
  midiToHz,
  mixInto,
  oscillator,
  pulse,
  shape,
} from '../../shared/audio/dsp.ts';

/** A narrow pulse with a clean fundamental: a brief bright edge, then a rounded tonal body. */
export function pulseLead(note: number): Float32Array {
  const seconds = 0.5;
  const hz = midiToHz(note);
  const body = pulse(hz, (t) => 0.29 + 0.06 * Math.exp(-t / 0.045), seconds);
  mixInto(body, oscillator('sine', hz, seconds), 0, 0.55);
  filter(body, 'lowpass', (t) => 1100 + 4200 * Math.exp(-t / 0.045), 0.82);
  const edges = arEnvelope(seconds, 0.002, 0.04);
  return shape(body, (t) => edges(t) * Math.exp(-t / 0.105) * 0.75);
}

/** Short bass notes speak above the sub range; the close can lengthen the same rounded voice. */
export function rubberBass(note: number, seconds: number): Float32Array {
  const hz = midiToHz(note);
  const pitch = (t: number) => hz * (1 + 0.022 * Math.exp(-t / 0.02));
  const body = oscillator('sine', pitch, seconds);
  const edge = filter(
    pulse(pitch, 0.46, seconds),
    'lowpass',
    (t) => 280 + 1300 * Math.exp(-t / 0.05),
  );
  mixInto(body, edge, 0, 0.27);
  const edges = arEnvelope(seconds, 0.004, Math.min(0.13, seconds * 0.4));
  return shape(body, (t) => edges(t) * (0.58 + 0.42 * Math.exp(-t / 0.12)) * 0.85);
}

/** Compact, soft-edged chord strikes; longer notes retain their attack and naturally decay. */
export function chordTone(note: number, seconds: number): Float32Array {
  const hz = midiToHz(note);
  const body = oscillator('triangle', hz, seconds, 0.25);
  mixInto(body, oscillator('sine', hz * 2, seconds), 0, 0.18);
  filter(body, 'lowpass', (t) => 900 + 1800 * Math.exp(-t / 0.085), 0.65);
  const edges = arEnvelope(seconds, 0.006, Math.min(0.35, seconds / 3));
  const decay = seconds > 1 ? 0.75 : 0.17;
  return shape(body, (t) => edges(t) * Math.exp(-t / decay));
}
