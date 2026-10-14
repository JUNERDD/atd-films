/** Review truthful operation states and overlapping object handoffs in the kinetic cut. */
import { mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { bundle } from '@remotion/bundler';
import {
  ensureBrowser,
  openBrowser,
  renderMedia,
  renderStill,
  selectComposition,
} from '@remotion/renderer';
import { ENCODING } from '../render-settings.ts';
import {
  MOTION,
  PROMPT,
  TRANSLATE,
  NOTES,
  CUTS,
  COMMAND_FPS,
  frames,
} from '../src/films/commands/timeline.ts';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const transitions = process.argv.includes('--transitions');
const output = join(root, 'out', transitions ? 'command-transitions' : 'command-review');
mkdirSync(output, { recursive: true });
await ensureBrowser();
const serveUrl = await bundle({
  entryPoint: join(root, 'src', 'index.ts'),
  symlinkPublicDir: true,
});
const browser = await openBrowser('chrome');
try {
  const composition = await selectComposition({
    serveUrl,
    id: 'AtdCommandsZh',
    puppeteerInstance: browser,
  });
  const sceneSamples = [
    ['opening-selection', 0.85],
    ['opening-command', 1.65],
    ['translate-before', CUTS.translate.start + 0.3],
    ['translate-selection', CUTS.translate.start + TRANSLATE.select + 0.2],
    ['translate-invoke', CUTS.translate.start + TRANSLATE.invoke + 0.2],
    ['translate-result', CUTS.translate.start + TRANSLATE.written + 0.25],
    ['translate-read', CUTS.translate.start + TRANSLATE.fold - 0.2],
    ['command-fan', CUTS.reuse.start + 0.8],
    ['command-forward', CUTS.reuse.end - 0.4],
    ['prompt-before', CUTS.prompt.start + 0.3],
    ['prompt-selection', CUTS.prompt.start + PROMPT.select + 0.2],
    ['prompt-invoke', CUTS.prompt.start + PROMPT.invoke + 0.2],
    ['prompt-result', CUTS.prompt.start + PROMPT.written + 0.25],
    ['prompt-read', CUTS.prompt.start + PROMPT.fold - 0.2],
    ['notes-before', CUTS.notes.start + 0.3],
    ['notes-options', CUTS.notes.start + NOTES.options + 0.25],
    ['notes-destination', CUTS.notes.start + NOTES.destination + 0.25],
    ['notes-invoke', CUTS.notes.start + NOTES.invoke + 0.2],
    ['notes-result', CUTS.notes.start + NOTES.written + 0.35],
    ['notes-read', CUTS.notes.start + NOTES.fold - 0.2],
    ['brand-handoff', CUTS.close.start + 0.4],
    ['closing', CUTS.close.start + 1.6],
    ['final-hold', CUTS.close.end - 1 / COMMAND_FPS],
  ] as const;
  const handoffs = [
    { id: 'translate', start: MOTION.draft },
    { id: 'reuse', start: MOTION.fan },
    { id: 'prompt', start: MOTION.composer },
    { id: 'notes', start: MOTION.notes },
    { id: 'close', start: MOTION.brand },
  ];
  const samples = transitions
    ? [
        ...handoffs.flatMap((chapter) =>
          [-0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8].map(
            (offset, index) => [`into-${chapter.id}-${index}`, chapter.start + offset] as const,
          ),
        ),
        ['final-hold', CUTS.close.end - 1 / COMMAND_FPS] as const,
      ]
    : sceneSamples;
  for (const [name, seconds] of samples) {
    await renderStill({
      serveUrl,
      puppeteerInstance: browser,
      composition,
      frame: frames(seconds),
      output: join(output, `${name}.png`),
      imageFormat: 'png',
      logLevel: 'warn',
    });
    console.log(`Rendered review frame: ${name} at ${seconds}s`);
  }
  if (transitions) {
    for (const chapter of handoffs) {
      await renderMedia({
        ...ENCODING,
        serveUrl,
        puppeteerInstance: browser,
        composition,
        frameRange: [frames(chapter.start - 1.5), frames(chapter.start + 1.3) - 1],
        outputLocation: join(output, `into-${chapter.id}.mp4`),
        logLevel: 'warn',
      });
      console.log(`Rendered motion clip: into-${chapter.id}`);
    }
  }
} finally {
  await browser.close({ silent: true });
  rmSync(serveUrl, { recursive: true, force: true });
}
