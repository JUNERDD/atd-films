import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import manifest from '../assets/manifest.json' with { type: 'json' };

/** Fails before rendering if a pinned source asset is missing or was silently replaced. */
export function verifyAssets(): void {
  for (const asset of manifest.files) {
    const file = new URL(`../${asset.path}`, import.meta.url);
    let bytes: Buffer;
    try {
      bytes = readFileSync(file);
    } catch (error) {
      throw new Error(`Missing asset ${asset.path}; restore the checked-in snapshot.`, {
        cause: error,
      });
    }
    const actual = createHash('sha256').update(bytes).digest('hex');
    if (actual !== asset.sha256) {
      throw new Error(
        `Asset checksum mismatch: ${asset.path}. Review the asset and its manifest together.`,
      );
    }
  }
  console.log(`Verified ${manifest.files.length} pinned assets.`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) verifyAssets();
