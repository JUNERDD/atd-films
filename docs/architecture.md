# Independent film repository

Status: accepted, 2026-10-13. Owner: JUNERDD.

The films were extracted from `JUNERDD/Atd` at product commit
`0740a767d3d7bc31b0e5a91d90e14567fd2d8723`, including the current working-copy changes
to the command workflow film. This repository starts with a source snapshot; earlier
product history remains in the product repository.

## Boundaries

The product repository continues to own the application and canonical brand assets.
The film repository owns film production, its dependency lockfile, CI, and releases.
This avoids adding film dependencies, checks, and scene code to everyday product work.
The alternative of keeping the workspace package would preserve easy live asset imports,
but retain that coupling. A repository per film would duplicate the production kit.

Each film owns its timeline, copy, scenes, orchestration, audio arrangement, preview
moments, Studio compositions, and rendering recipes. The shared kit owns reusable
product surfaces, desktop/camera primitives, motion, fonts, synthesis, and mixing.
Existing Remotion APIs and the existing kit are retained; this migration introduces no
new rendering framework, animation dependency, or scene DSL.

Imports flow from a film to shared modules. Shared modules cannot import films, and one
film cannot import another. `Root.tsx` and `films/catalog.ts` are the two assembly points.
The former keeps full-film React composition declarations directly in the discoverable root
so Remotion Studio can read and save their inline default props; the latter is Node-side render configuration.
Do not import the Node catalog into a browser component just to obtain an ID.

The old global font loader imported every film's content, and the shared camera and
chapter title imported the launch timeline. Language and canvas contracts now have
shared owners; films register their own glyphs and supply chapter choreography as props.
Film-specific audio cues stay with their film while the existing synthesis and mixer
remain shared. Existing composition IDs, timing, and output filenames are preserved.

## Assets and lifecycle

The runtime asset set is small enough to check in: source SVGs, the existing cropped
wallpaper, and 256-pixel application icon snapshots. The manifest records their origin,
transformation, and hashes. Normal rendering neither imports the product checkout nor
extracts installed application resources. Fonts come from exact Fontsource versions;
soundtracks are synthesized locally from the film's own timeline.

Asset updates are reviewed snapshot changes, not automatic synchronization. Preserve
the old source tag and lockfile when delivering a film. A deliberate creative revision
can receive a new film version; a shared implementation fix should verify all affected
cuts. Do not add compatibility modes for hypothetical future requirements.

Use ignored `out/` for local deliverables. Large future recordings, audio sources, and
published masters belong in versioned artifact/object storage or Git LFS, with a pinned
manifest and attribution; they should not inflate ordinary Git history.

## Adding a film

Create `src/films/<name>/` with its README, timeline, content/font registration, scenes,
`Compositions.tsx` for any scene previews, and Node-side `render.ts`. Reuse the shared kit where behavior matches,
and keep unique art direction inside the film. Register it in the two assembly points.
Supply representative preview moments and include assets with provenance and hashes.
Verify the new cut and affected existing films before tagging a deliverable.
