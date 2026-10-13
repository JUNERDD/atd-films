/**
 * Scores each film from its timeline: renders the music and the sound effects, mixes and masters
 * them (`mixdown`) and writes the track the film plays to `public/audio/`, with the stems beside it
 * for anyone editing the cut.
 *
 *   node scripts/soundtrack.ts [launch|release-en|release-zh|release|all]
 *
 * With no film named it scores the launch film's `soundtrack.wav`. The release film types on
 * screen in each cut's language, so each cut has its own track: `release-en` scores
 * `release-en.wav`, `release-zh` scores `release-zh.wav`, and `release` scores both.
 * `pnpm soundtrack` scores the launch film, `studio` scores every film
 * and the render script scores the films its cuts need.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { loudness, mixdown, peakDb, wav } from '../src/shared/audio/master.ts';
import type { Soundtrack } from '../src/shared/render-contract.ts';
import { SOUNDTRACKS as FILMS, type FilmName } from '../src/films/catalog.ts';

const NAMES = Object.keys(FILMS) as FilmName[];
/** Names that score several films at once. */
const GROUPS: Record<string, FilmName[]> = {
  release: ['release-en', 'release-zh'],
  all: NAMES,
};
const USAGE = `usage: node scripts/soundtrack.ts [${[...NAMES, ...Object.keys(GROUPS)].join('|')}]`;
const directory = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'audio');

function isFilm(name: string): name is FilmName {
  return Object.hasOwn(FILMS, name);
}

/** The films the command line names, or exits with the usage line. */
function chosen(): FilmName[] {
  const [name = 'launch', ...rest] = process.argv.slice(2);
  if (rest.length === 0 && Object.hasOwn(GROUPS, name)) return GROUPS[name] ?? [];
  if (rest.length === 0 && isFilm(name)) return [name];
  console.error(`Unknown film "${process.argv.slice(2).join(' ')}"\n${USAGE}`);
  process.exit(2);
}

function scoreFilm(name: FilmName): void {
  const started = performance.now();
  const film: Soundtrack = FILMS[name];
  const { mix, music, effects, measured } = mixdown(film.seconds, film.score(), film.cues());
  const output = join(directory, film.track);
  mkdirSync(join(directory, 'stems'), { recursive: true });
  writeFileSync(output, wav(mix));
  for (const [stem, buses] of [
    ['music', music],
    ['effects', effects],
  ] as const) {
    writeFileSync(join(directory, 'stems', `${film.stems}${stem}.wav`), wav(buses));
  }
  console.log(
    `${name}: ${loudness(mix).toFixed(1)} LUFS (was ${measured.toFixed(1)}), peak ${peakDb(mix).toFixed(1)} dBFS, ` +
      `${((performance.now() - started) / 1000).toFixed(1)} s → ${output}`,
  );
}

for (const name of chosen()) scoreFilm(name);
