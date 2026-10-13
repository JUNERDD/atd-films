import { mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { bundle } from '@remotion/bundler';
import { ensureBrowser, getCompositions, openBrowser, renderStill } from '@remotion/renderer';
import { CUTS, CUT_NAMES, isCut } from '../src/films/catalog.ts';
import { verifyAssets } from './verify-assets.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const cuts = (args.length ? args : CUT_NAMES).map((name) => {
  if (!isCut(name)) throw new Error(`Unknown cut ${name}; choose ${CUT_NAMES.join(', ')}.`);
  return CUTS[name];
});
verifyAssets();
for (const film of new Set(cuts.map((cut) => cut.film))) {
  const result = spawnSync(process.execPath, [join(root, 'scripts/soundtrack.ts'), film], {
    stdio: 'inherit',
  });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`Scoring ${film} failed.`);
}
await ensureBrowser();
const serveUrl = await bundle({ entryPoint: join(root, 'src/index.ts'), symlinkPublicDir: true });
const browser = await openBrowser('chrome');
try {
  const compositions = await getCompositions(serveUrl, { puppeteerInstance: browser });
  for (const cut of cuts) {
    const composition = compositions.find(({ id }) => id === cut.id);
    if (!composition) throw new Error(`Composition ${cut.id} is not registered.`);
    const output = join(root, 'out/previews', cut.id);
    mkdirSync(output, { recursive: true });
    for (const seconds of cut.previewSeconds) {
      const frame = Math.round(seconds * composition.fps);
      await renderStill({
        serveUrl,
        composition,
        puppeteerInstance: browser,
        frame,
        output: join(output, `${frame}.png`),
        imageFormat: 'png',
        logLevel: 'warn',
      });
      console.log(`${cut.id}: preview at ${seconds}s`);
    }
  }
} finally {
  await browser.close({ silent: true });
  rmSync(serveUrl, { recursive: true, force: true });
}
