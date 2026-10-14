# Atd production map

Paths below are relative to the film repository. Read its `AGENTS.md` and the target film's README for current delivery contracts. Product source is reference material; normal rendering is self-contained here.

## Ownership and reusable parts

| Concern                | Owner / reusable API                                                                                         |
| ---------------------- | ------------------------------------------------------------------------------------------------------------ |
| Commands film          | `src/films/commands/` — composition, content, styles, timeline, object choreography, score and render recipe |
| Full-film registration | `src/Root.tsx` — literal composition IDs; Commands duration and fps already derive from its timeline         |
| Node render catalog    | `src/films/catalog.ts` — film-local `render.ts` recipes                                                      |
| Product controls       | `src/shared/product/SelectionCapsule.tsx`, `CommandIsland.tsx`, `OptionsMenu.tsx`, `run-output.ts`           |
| World and pointer      | `src/shared/world/MacWindow.tsx`, `Camera.tsx`, `camera.ts`, `Cursor.tsx`, `cursor.ts`                       |
| Deterministic motion   | `src/shared/motion/spring.ts`, `ease.ts`                                                                     |
| Original audio         | `src/shared/audio/instruments.ts`, `effects.ts`, `cue-bus.ts`, `master.ts`                                   |
| Font preparation       | Film `fonts.ts` / `content.ts` → `src/shared/fonts.ts`                                                       |
| Snapshot provenance    | `assets/manifest.json`, `THIRD_PARTY.md`                                                                     |

Prefer film-local composition over changes to the shared kit. Shared modules cannot import a film, and films cannot import each other. Read callers before changing an exported component; a shared style edit can alter older releases even when their TypeScript is unchanged.

## Typography and font assets

The shared loader supplies Inter and Noto Sans SC from pinned Fontsource packages. Films may combine these with other free, licensed faces for editorial roles; neither one family nor the product's UI font is a universal film constraint. Check glyph coverage using the actual copy, especially Chinese and mixed-language punctuation. Preserve recognizable product control metrics while choosing editorial type freely.

For a film-specific face, keep its loading and CSS in that film. The Commands revision uses Sora for English titles, Inter for Latin UI text, and Noto Sans SC for Chinese. Its local `fonts.ts` loads the checked-in Sora variable font through `FontFace` and Remotion's render delay. The TTF and OFL notice have immutable source URLs and hashes in `assets/manifest.json`; `THIRD_PARTY.md` records attribution. Normal renders must not fetch a live font service or depend on fonts installed on the host.

## Coordinates and clocks

The current Commands cut uses a 1920 × 1080 editorial stage, 24 seconds at 60 fps, with overlapping object choreography on one global clock. The 150 BPM musical grid puts one beat every 24 frames. Narrative ranges identify events; they must not abruptly switch visibility while objects are still travelling. Its controls are magnified, deterministic film recreations. No desktop or camera wrapper is required by the repository.

When using the shared desktop kit in another cut, its 1600 × 900 logical-point space scales by 1.2 into the output frame. Keep windows, menus and pointers in the same space. Shared camera focal coordinates are frame pixels, so convert exactly once and transform pointer and UI together.

`cameraAt()` interprets each shot's `at` as the start of movement toward that shot. Its initial shot is the prior resting state. Reading time must account for spring settlement. Motion blur derives from velocity; excessive zoom or overlapping moves can hide content longer than the raw shot timestamps suggest.

`CommandIsland` consumes `IslandMoment[]` on its provided `t` clock. Its anchor is the horizontal center and bottom of the surface, so a card grows upward from that point. `SelectionCapsule` uses its top-left origin. `OptionsMenu` has a separate origin. When changing crops or layout, keep the controls needed by the current interaction state visible and unclipped; they need not all appear together.

If a `Sequence` gets transition pre-roll, compensate in its scene clock. Otherwise source input, cursor actions, audio and render samples drift by the handle duration. Prefer timeline-owned constants over duplicated seconds in scene components and preview scripts.

## Command truth that matters on screen

- Translation can replace a selection. A held configured shortcut can expose language and output choices. A demonstrated shortcut is user-configurable, not a shipped default.
- Extract action items normally returns to the conversation. A film showing insertion below selected Notes text must establish the per-run destination or a saved override. Preserve the original text when demonstrating insertion.
- A custom coding-prompt command can transform a selected draft without tools. It does not itself imply that a coding agent edited or verified a project.
- Replacement requires a compatible editable target; avoid absolute claims that every application supports writeback. Review behavior follows the command configuration.
- Atd product operations are silent. Music and transition accents are editorial.

Recheck these details against current product sources when changing the demonstrated behavior. The film README should identify the source revision and any scenario-specific command configuration.

## Render and inspect

Use `.node-version` and the `packageManager` pin. With the selected runtime on `PATH`, confirm `node --version` and `pnpm --version` before validation.

```sh
pnpm check
pnpm preview:commands
pnpm preview:commands --transitions
pnpm render:commands
```

`scripts/command-preview.ts` owns detailed review frames and encoded transition clips. Film `render.ts` supplies the generic `pnpm preview commands-zh` sample seconds. Both need new moments after a timeline rewrite. `scripts/render.ts commands-zh --frames=A-B` writes a partial encode under `out/previews/`, preserving the full movie.

The existing public contract is composition `AtdCommandsZh` and output `out/atd-commands-zh.mp4`. A requested creative revision may change duration and frame rate; update timing-dependent documentation and samples together. `src/Root.tsx` calculates both from `timeline.ts`.

Generated WAVs/stems in `public/audio/` and renders in `out/` are ignored. Use these for review and delivery; keep original reference downloads and disposable inspection scripts in ignored `tmp/`. No product app, service, personal account, or desktop capture is necessary.

Observe output metadata with `ffprobe` when available. For visual review, examine decisive stills and sample transition motion rather than relying on a contact sheet alone. Inspect first/last frames and the full encoded movie's audio tail. If playback or listening is unavailable, report that specific gap.
