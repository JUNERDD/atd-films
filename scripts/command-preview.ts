/** Renders the representative UI states without opening the user's desktop or a visible browser. */
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
  CHAPTERS,
  CODE,
  MAIL,
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
    ['opening', 1.6],
    ['mail-selection', CUTS.mail.start + MAIL.select + 0.2],
    ['mail-hold', CUTS.mail.start + MAIL.press + 0.35],
    ['mail-options', CUTS.mail.start + MAIL.move + 0.2],
    ['mail-language', CUTS.mail.start + MAIL.picked + 0.2],
    ['mail-writing', CUTS.mail.start + MAIL.write + 0.05],
    ['mail-result', CUTS.mail.start + MAIL.done + 0.6],
    ['mail-read', CUTS.mail.end - 1.4],
    ['commands', CUTS.setup.start + 2.2],
    ['code-before', CUTS.code.start + 0.4],
    ['code-selection', CUTS.code.start + CODE.hover],
    ['code-click', CUTS.code.start + CODE.click],
    ['code-prompt', CUTS.code.start + CODE.written + 0.8],
    ['code-read', CUTS.code.end - 1.5],
    ['notes-before', CUTS.notes.start + 0.4],
    ['notes-menu-click', CUTS.notes.start + NOTES.menuClick],
    ['notes-options', CUTS.notes.start + NOTES.pickClick],
    ['notes-run', CUTS.notes.start + NOTES.runClick],
    ['notes-result', CUTS.notes.start + NOTES.done + 0.6],
    ['notes-detail', CUTS.notes.end - 1],
    ['closing', CUTS.close.start + 1.8],
    ['final-hold', CUTS.close.end - 1 / COMMAND_FPS],
  ] as const;
  const handoffs = CHAPTERS.slice(1);
  const samples = transitions
    ? [
        ...handoffs.flatMap((chapter) =>
          [-0.55, -0.25, 0, 0.25, 0.55].map(
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
    console.log(`Reviewed frame: ${name} at ${seconds}s`);
  }
  if (transitions) {
    for (const chapter of handoffs) {
      await renderMedia({
        ...ENCODING,
        serveUrl,
        puppeteerInstance: browser,
        composition,
        frameRange: [frames(chapter.start - 1.2), frames(chapter.start + 1.1) - 1],
        outputLocation: join(output, `into-${chapter.id}.mp4`),
        logLevel: 'warn',
      });
      console.log(`Reviewed transition clip: into-${chapter.id}`);
    }
  }
} finally {
  await browser.close({ silent: true });
  rmSync(serveUrl, { recursive: true, force: true });
}
