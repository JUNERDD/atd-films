# Command workflow film

`AtdCommandsZh` is a **38-second, 1920 × 1080, 30 fps** Chinese film in
`src/films/commands/`. It demonstrates three concrete workflows: improving a coding request inside a Codex-like
composer before sending it to the coding agent, translating an unsent Mail draft, and inserting
a meeting's action items after the original text in Notes. A short Commands settings shot establishes the saved commands and configured shortcuts.

```sh
pnpm preview:commands
pnpm preview:commands --transitions
pnpm render:commands
```

The preview writes seventeen review frames to `out/command-review/`. With `--transitions`, it
writes twenty-six boundary and final-hold frames plus five short transition clips to
`out/command-transitions/`. The render command produces `out/atd-commands-zh.mp4`.
All commands prepare their assets and the original synthesized score. The score
and its music/effects stems are in `public/audio/`. No desktop app is opened, no screen is recorded,
and no model is called. `timeline.ts` owns chapter lengths and operation timing.

**Atd has no operation sounds.** The film adds restrained editorial sound design over its
independent background music: a short opening breath, four soft right-to-left window sweeps,
and a gentle brand close. `commandCues()` derives the sweeps from `CUTS` and `HANDOFF` so they
follow the picture. The closing D/A glass dyad shares the score's harmony. These accents sit
below the music; mouse clicks, typing, command execution, and completion remain silent.
The effects reuse the film's existing synthesis and cue buses, with no recorded samples or new
dependencies. For a completely silent delivery, remove the audio track without re-encoding
the picture:

```sh
ffmpeg -i out/atd-commands-zh.mp4 -map 0:v:0 -c:v copy -an -movflags +faststart out/atd-commands-zh-silent.mp4
```

These are **authored scenario animations, not live recordings**. The toolbar, command island,
options, and Commands settings reuse the source-grounded product kit. The Codex-like window,
its browser preview, Mail, and Notes are scene recreations. The coding scene follows the project
sidebar, task conversation, composer, and change-review model described in the
[official Codex app overview](https://openai.com/index/introducing-the-codex-app/); it is not a
pixel-identical recording of a particular Codex build. Inputs and answers are fictional, public examples; the preview
store is illustrative. Timing does not represent model latency. The email remains a draft.

The blue wallpaper and app icons are pinned snapshots in `public/command-film/`, verified
by `pnpm assets:check`. The wallpaper was cropped from the product website's shared desktop
to remove its menu bar and Dock; app icons were extracted once from the installed applications.
See `assets/manifest.json` for source attribution, transformation, and SHA-256 checksums.
Cloning and rendering this repository needs no product checkout, macOS, ChatGPT installation,
`sips`, or separately installed `ffmpeg`. Apple and OpenAI retain their marks.

The coding command, “完善编程需求”, is a custom example: selection input, replacement output,
no confirmation review, and no tools. Its instruction is: “Rewrite the selected coding request
as a concise actionable prompt. Preserve its facts and numbers; make the intended result,
constraints, and acceptance checks explicit. Keep the existing interface and public API, and
ask for appropriate verification. Return only the revised prompt.” `content.ts` holds both
versions. After the replacement is visible, the user sends it; the coding agent's illustrative
inspection, edit, verification, and page update follow. The cart has two items at ¥328 and one
at ¥99: the total changes from ¥427 to ¥755.

The current cut is 38 seconds, down from the previous 44-second cut and the original 78 seconds.
The two-second opener connects the promise to the actual composer and selection toolbar. The
coding, email, and meeting workflows run for 13, 8.5, and 8.5 seconds; a three-second Commands
settings shot follows the examples, then a three-second brand close.

The previous cut held a wide view with persistent headlines, step pills, and interface copy
competing for attention. `shots.ts` now frames the next meaningful change: the prompt and its
replacement, the translation options and written-back draft, then the output destination and
inserted action items. The film reuses the existing spring camera. The source UI and pointer
share its coordinate space, while short editorial captions stay outside the filmed desktop.
The coding result pulls back enough to retain both the conversation and corrected preview.

Each result settles before its window leaves. The pointer and editorial caption withdraw on
separate beats, and the camera returns to the same resting position with zero velocity before
the next window arrives. `editing.ts` choreographs 0.4-second handles on each side of a chapter
boundary: neighboring windows glide horizontally over one continuous wallpaper and desktop
chrome, without stacking their text in a dissolve. The chapter-local operation clocks stay
unchanged. The Commands window fades away before the brand close enters; the final card remains
fully visible through the last frame. Caption changes also have a brief exit before the next
line enters.

Clicks and keystrokes have immediate
pressed feedback; their menus or status changes follow 100–150 ms later. Pointer arrival, hover,
click, processing, paste, and success use named events in the same timeline, rather than separate
scene literals. Text selection follows the drag position; Mail uses an explicit ⌘A followed by
visible shortcut and arrow-key actions. The background score follows the film length. These
brief processing intervals are editorial timing, not a model-speed claim.

Translate and Extract action items use the current starter-command names and parameter choices
from `apps/agent-service/src/commands/starter-copy.ts`. Translate chooses English and replaces the
selection. Extract action items groups by owner; its per-run output changes from the conversation
to insertion after the selection. The inserted Notes content is plain text. The demo's shortcuts
are user-configurable examples, not product defaults.

The film changes no product behavior, so the in-app product skills need no update.
