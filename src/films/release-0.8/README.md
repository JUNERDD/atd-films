# Release 0.8 film

A 60-second film for Atd 0.8 (`AtdRelease` and `AtdReleaseZh`) lives in
`src/films/release-0.8/`, in a world of its own, "Ink & Caret": graphite ink, a fine dot grid that ripples
from events, and one accent, the coral caret. A line types itself, is selected and retyped in
place before the title drops; an answer is written back where it was asked; a shortcut is tapped to
run or held to choose, and the run picks where its answer goes; the ChatGPT plan, effort per
command, light runs and the user's own order make it theirs; a mosaic of everything Atd already
does spells out the version; the caret signs off. `src/films/release-0.8/timeline.ts` is its one clock (100
BPM, a bar every 2.4 s, 25 bars), each scene's `beats.ts` places its moments on it, and
`src/films/release-0.8/audio/` scores it with a sound of its own: C♯ minor lifting to E major for the
finale, a pulse-lead hook, an FM electric piano, plucked strings and a tight kit, with the typing
on screen as part of the rhythm (`music/`), and a sound for every on-screen event read from the
scenes' beats (`cues.ts`, `sections/`). The typing differs by language, so each cut has its own
track, `public/audio/release-en.wav` and `release-zh.wav`, with `release-en-music.wav`,
`release-en-effects.wav` and the `zh` pair in the stems. Its world kit (`src/films/release-0.8/world/`: the
dot field, the caret, typed lines, kinetic statements, the caret wipe and selection flood, and the
Stage the product shots play on) has its own review sheet, `R08WorldSheet`.

Run `pnpm render:release` or `pnpm preview release-en release-zh` from the repository root.
Each language owns its soundtrack because typing rhythms follow localized text.
`src/Root.tsx` registers the full film, while `Compositions.tsx` owns scene previews and `R08WorldSheet`; `render.ts`
owns the CLI cuts, preview moments, and soundtrack recipes. Preserve this release's
visual language when adding newer films.
