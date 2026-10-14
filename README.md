# Atd films

The independent Remotion studio for [Atd](https://github.com/JUNERDD/Atd): launch films,
release films, and feature stories. Films share a product/world kit and audio tools, while
each owns its scenes, timing, copy, and score. No product checkout or running app is needed.

## Start

Use the Node version in `.node-version` and pnpm 12.10.1:

```sh
pnpm install --frozen-lockfile
pnpm studio
```

Studio verifies the checked-in asset snapshots and generates all four soundtracks before
opening the editor. The first render downloads the Chrome Headless Shell pinned by Remotion.
A separately installed browser, macOS, ChatGPT, `sips`, and `ffmpeg` are not required.
For an isolated Studio instance, choose a free port, for example `pnpm studio --port=3337`.

## Existing films

| Film              | Composition IDs              | Duration | Format              | Source                                         |
| ----------------- | ---------------------------- | -------- | ------------------- | ---------------------------------------------- |
| Launch            | `AtdPromo`, `AtdPromoZh`     | 64 s     | 1920 × 1080, 60 fps | [launch](src/films/launch/README.md)           |
| Release 0.8       | `AtdRelease`, `AtdReleaseZh` | 60 s     | 1920 × 1080, 60 fps | [release-0.8](src/films/release-0.8/README.md) |
| Command workflows | `AtdCommandsZh`              | 24 s     | 1920 × 1080, 60 fps | [commands](src/films/commands/README.md)       |

Studio also keeps the launch and release scene compositions and the `WorldSheet`,
`ProductSheet`, and `R08WorldSheet` component review compositions.

## Commands

Run these commands from this repository's root; the old workspace `--filter` is no longer needed.

| Command                                  | Result                                                                    |
| ---------------------------------------- | ------------------------------------------------------------------------- |
| `pnpm studio`                            | Prepare soundtracks and open the interactive preview                      |
| `pnpm preview`                           | Representative PNGs for all five cuts under `out/previews/<composition>/` |
| `pnpm preview en release-zh commands-zh` | PNGs for selected cuts                                                    |
| `pnpm preview:commands`                  | Twenty-three detailed command-film review frames                          |
| `pnpm preview:commands --transitions`    | Forty-six handoff frames and five encoded motion clips                    |
| `pnpm render`                            | Full English and Chinese launch films                                     |
| `pnpm render:en`, `pnpm render:zh`       | One launch-film language                                                  |
| `pnpm render:release`                    | Both release-film languages (`:en` or `:zh` for one)                      |
| `pnpm render:commands`                   | Chinese command-workflow film                                             |
| `pnpm render:all`                        | All five full cuts                                                        |
| `pnpm render:en --frames=0-299`          | A partial encode under `out/previews/`, preserving the full film          |
| `pnpm soundtrack all`                    | Generate all soundtracks and separate music/effects stems                 |
| `pnpm assets:check`                      | Verify every pinned source asset against its manifest                     |
| `pnpm check`                             | Asset checks, formatting, lint, and type checking                         |

The render command scores only the tracks its cuts need, bundles once, and reports per-cut
frame and encoding progress. Full outputs retain their existing names:
`atd-promo-en.mp4`, `atd-promo-zh.mp4`, `atd-release-0.8-en.mp4`,
`atd-release-0.8-zh.mp4`, and `atd-commands-zh.mp4`, all under `out/`.
`render-settings.ts` owns the shared H.264/AAC encoding settings used by the script and Studio.

## Layout

```text
src/
  films/
    launch/            # Initial film, narrative, scenes, timing, and score
    release-0.8/       # Ink & Caret world and release-specific choreography
    commands/          # Kinetic Command story, continuous objects, and score
    catalog.ts         # Node-side assembly of film-owned render recipes
  shared/
    product/           # Deterministic recreations of product UI
    world/             # Desktop, camera, cursor, keycaps, and brand primitives
    motion/            # Existing closed-form springs and easing
    audio/             # Synthesis, instruments, cue buses, effects, and mixing
    styles/            # Shared film tokens and material styling
  Root.tsx             # Studio assembly
assets/                # Brand SVGs, provenance, and hashes
public/command-film/   # Pinned wallpaper and app icon snapshots
scripts/               # Shared preview, render, soundtrack, and asset tools
```

See [architecture and adding a film](docs/architecture.md) and [agent guidance](AGENTS.md).
For cinematic feature promos, use the repository's
[cinematic-product-film skill](.agents/skills/cinematic-product-film/SKILL.md), including its
timestamped study of Shotbase's official launch film and the Atd production map.
Shared code does not depend on a film, and films do not import one another. The product
repository remains the source of truth for application behavior and canonical brand assets;
film snapshots update deliberately, against an identified product commit.

## Assets and delivery

`assets/manifest.json` records source attribution, transformations, and SHA-256 checksums.
The existing command-film assets are checked in, so a fresh checkout renders without the
original machine. An asset update must update the source note and reviewed hash together.
Original provider SVGs and the documented Gemini symbol derivation are retained.

Generated soundtracks and stems (`public/audio/`), renders (`out/`), and review artifacts
(`tmp/`, `.artifacts/`) are ignored. Keep large future recordings and delivery masters in
versioned artifact storage or Git LFS. Tag the source and retain the lockfile and asset
snapshot for each delivered film. Do not regenerate audio while a render uses those files.

The authored scenarios use fictional content; they are not live recordings or latency claims.
Code is MIT; fonts and third-party marks retain their own rights. See [third-party notices](THIRD_PARTY.md).
