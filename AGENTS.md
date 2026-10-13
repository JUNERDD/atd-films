# Atd Films

## Scope and ownership

- This is the independent film-production repository for [Atd](https://github.com/JUNERDD/Atd), maintained by JUNERDD. Product application code, runtime services, website deployment, and canonical brand sources belong to the product repository.
- `src/films/launch/`, `src/films/release-0.8/`, and `src/films/commands/` own their composition components, scenes, copy, timelines, font samples, score arrangements, and render recipes. Keep future films in separate directories under `src/films/`.
- `src/shared/` owns the reusable product and world components, motion, styling, font loading, language contracts, synthesis, and mixing. Shared modules must not import a film or `@atd/*` workspace packages. Films must not import another film. Oxlint enforces these boundaries.
- `src/Root.tsx` owns full-film Studio registrations (literal IDs and inline default props are required for Studio prop editing); `src/films/catalog.ts` assembles Node-side render recipes. Add a film through these two explicit entry points, keeping its implementation and configuration local to its folder.
- Product UI here is an authored, deterministic film recreation. Its source comments identify product references; these are provenance, not runtime imports. Changes to a film do not change the product.
- Read the relevant film README and `docs/architecture.md` before changing ownership or a film's behavior. Keep work scoped, preserve uncommitted work, and use subagents only when explicitly requested.

## Preview and rendering

- Use the Node version in `.node-version` and pnpm version in `package.json`; confirm `pnpm --version` before validation. Install with `pnpm install --frozen-lockfile`. Preserve pinned dependency versions unless a dependency change is requested.
- `pnpm studio` verifies assets, synthesizes all soundtracks, and opens Remotion Studio. `pnpm preview [cut ...]` writes representative stills. `pnpm preview:commands` and its `--transitions` option keep the command film's detailed review workflow.
- `pnpm render:all` renders the five existing cuts. `pnpm render`, `render:en`, `render:zh`, `render:release`, and `render:commands` preserve their existing meanings. `--frames=N` or `--frames=A-B` renders a partial cut under `out/previews/` without replacing the full deliverable.
- Existing composition IDs, output names, durations, frame rates, language cuts, and scene review compositions are compatibility contracts. Change them only as part of an explicit film revision.
- Each film's timeline owns scene and audio timing. Shared components receive choreography through props; do not import a film's beat grid or narrative into the shared kit. Each film supplies its own text to the font loader before rendering.
- Keep animation deterministic and frame-addressable. Do not add live model calls, desktop automation, real accounts, or user data to a render. No product app or agent service is needed to preview these films.
- Before starting Studio, verify its port is free. Start only task-owned instances and stop only those instances. Do not inspect or reuse another person's Studio or application session. Avoid regenerating audio while another task is rendering the same files.

## Assets and reproducibility

- `assets/manifest.json` records immutable snapshot provenance and SHA-256 values. Brand SVGs live in `assets/brands/`; the command film's wallpaper and application icons live in `public/command-film/`. Normal preview and rendering must work with this checkout alone.
- Canonical product assets remain in the product repository. Refresh snapshots deliberately from an identified product commit; review the visual change, source notes, and manifest hashes together. Never follow the product's live working tree, an installed application's resources, or an expiring URL at render time.
- Preserve original SVG geometry and documented symbol derivations, along with source and license notices. Third-party marks and fonts retain their owners' rights; see `THIRD_PARTY.md`. Do not silently replace an asset to make a check pass.
- Generated audio and stems (`public/audio/`), MP4s and stills (`out/`), and debugging artifacts (`tmp/`, `.artifacts/`) are ignored. Do not commit rendered outputs, browser downloads, `node_modules`, credentials, local paths, or private project references. Store large delivery assets outside ordinary Git history.
- Released films are reproducible from a source tag, lockfile, and asset snapshot. Shared-kit changes must check affected older films; use an explicit new film revision when a creative change should not alter an existing release.

## Code and validation

- Reuse Remotion's existing composition and rendering APIs and the checked-in kit. Do not create a parallel animation framework or a universal scene-description language for this repository.
- Use TypeScript and functional React. Keep every maintained `.ts` and `.tsx` file at most 350 lines after formatting. Separate meaningful responsibilities rather than compressing code or weakening the rule.
- Preserve the existing design rules: raw colors live in stylesheets, inline styles only pass CSS custom properties, and class names remain static. Components render; hooks own React effects; pure motion and audio modules remain frame-addressable and DOM-free where Node imports them.
- Run `pnpm check` for source/configuration changes. It verifies assets, formatting, lint, and types. Run relevant still previews and representative encoded frame ranges for affected films; use a complete render when required by the task. Inspect actual frames and encoded metadata before claiming visual or rendering equivalence.
- Do not add tests unless requested. For documentation-only edits, check formatting and references. Stop broadening checks once the scoped behavior is established.
- Initial repository bootstrap may create its first `main` commit. Subsequent changes use branches and pull requests. Before publishing, inspect the staged files and run `pnpm check:secrets`; never bypass a failed check. Use English Conventional Commit subjects and preserve other work.
- Explain the result, verification, and any remaining limitation. Product skills belong to the product repository; film-only work does not require updating them.
