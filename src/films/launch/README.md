# Launch film

A 64-second product film for Atd, made with [Remotion](https://www.remotion.dev/): 1920 × 1080 at
60 fps, cut in English (`AtdPromo`) and Simplified Chinese (`AtdPromoZh`). It tells what the name
stands for. A shortcut opens it, and the three chapters show the agent at work, each through the
product's real interactions recreated in code:

- **Anywhere**: the selection toolbar in another app, capturing and marking up the screen, and the
  Mini Panel catching a dragged file.
- **Anything**: a task planned and worked end to end, an app built from a sentence and pinned to the
  desktop, and the commands, skills and automations the agent makes on request.
- **Anytime**: a night of automations while the Mac rests, and memory that keeps a correction.

The film then shows the models Atd runs on and its privacy promise, and closes on the same
shortcut.

`timeline.ts` owns the 120 BPM clock, section boundaries, and choreography. `scenes/`
composes the shared product and world kits; `audio/` owns this film's score, arrangement,
and event cues. Reusable synthesis and mixing live in `src/shared/audio/`.

`copy.ts` owns both language cuts and registers each scene's content. `fonts.ts` supplies
those glyphs to the shared font loader. The chapter words remain English in both cuts
because they spell the product name.

Run `pnpm render:en`, `pnpm render:zh`, or `pnpm preview en zh` from the repository root.
The composition IDs remain `AtdPromo` and `AtdPromoZh`; scene review compositions remain
in Studio's Scenes folder.
