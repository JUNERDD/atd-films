# Command workflow film

`AtdCommandsZh` is a **24-second, 1920 × 1080, 60 fps** Chinese feature film. Selected text becomes the continuous object connecting a saved instruction to a useful result where the user is working.

```sh
pnpm preview:commands
pnpm preview:commands --transitions
pnpm render:commands
```

The full render is `out/atd-commands-zh.mp4`. The detailed preview writes 23 states to `out/command-review/`; transition mode writes 46 handoff/final frames and five encoded clips to `out/command-transitions/`. The generic `pnpm preview commands-zh` samples eight representative moments. These commands prepare pinned assets and the original score. They do not open a product app, record a screen, or call a model.

## Editorial direction

This revision draws on [Shotbase's official launch film](https://www.youtube.com/watch?v=MoWSwxZGk_0): persistent objects connect actions and results, supporting pieces arrive in a stagger, short rotations animate travel, and the reading surface settles. The official publisher was verified; research inspected the whole movie and 264 dense motion samples from selected passages. It did not establish the original curves, font, BPM, instrumentation, or voiceover.

The reusable [cinematic-product-film skill](../../../.agents/skills/cinematic-product-film/SKILL.md) contains the [timestamped reference study](../../../.agents/skills/cinematic-product-film/references/shotbase-study.md) and production guidance. No Shotbase images, footage, music or artwork are used in this film.

| Time        | Picture and visible proof                                                                                                                          |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0–2.4 s     | Kinetic “选中。” / “交给 Command。” turns the selection shape into the first working surface.                                                      |
| 2.4–7.2 s   | A short Chinese draft is selected and translated using saved English; the result stays in the unsent draft, then folds into a command card.        |
| 7.2–9.6 s   | A fan of commands shows a reusable method; one card advances into the next composer. This is editorial imagery, not a new product screen.          |
| 9.6–14.4 s  | A custom coding-request command replaces the selected draft with a precise prompt and the correct arithmetic acceptance example.                   |
| 14.4–20.8 s | The output destination visibly changes to insertion after selection before invocation; both original notes remain above the appended action lines. |
| 20.8–24 s   | Result objects resolve into Atd / Command and “选中，即行动。”, which remain settled through the last frame.                                       |

The picture is rebuilt around overlapping object handoffs on a stable white stage, kinetic type, controlled overshoot and short follow-through. The selection/draft, result/command fan, selected command/composer, and result/brand transitions carry recognizable shapes between beats. A global frame clock keeps those objects alive across editorial boundaries. Important results get level, settled reading holds; repeated progress waits and full desktop camera tours are removed. `timeline.ts` owns narrative and operation events; the score and preview samples consume it.

## Product facts and scenario choices

These are **authored, deterministic scenarios**, not live recordings or latency benchmarks. All input and output are fictional and public. Transformation output appears as a replacement or insertion, not simulated model-token streaming.

Behavior was checked against [Atd product commit `6b624619`](https://github.com/JUNERDD/Atd/tree/6b6246197634b3f660d44250e496991e7c5d8bcc), especially:

- [`starter-copy.ts`](https://github.com/JUNERDD/Atd/blob/6b6246197634b3f660d44250e496991e7c5d8bcc/apps/agent-service/src/commands/starter-copy.ts) and [`starters.ts`](https://github.com/JUNERDD/Atd/blob/6b6246197634b3f660d44250e496991e7c5d8bcc/apps/agent-service/src/commands/starters.ts) for command names, choices and defaults.
- [`command-output.ts`](https://github.com/JUNERDD/Atd/blob/6b6246197634b3f660d44250e496991e7c5d8bcc/packages/agent-contracts/src/command-output.ts) for destinations and review.
- [`CommandHold.swift`](https://github.com/JUNERDD/Atd/blob/6b6246197634b3f660d44250e496991e7c5d8bcc/apps/macos/Sources/AICore/Island/CommandHold.swift) and [`native-commands.ts`](https://github.com/JUNERDD/Atd/blob/6b6246197634b3f660d44250e496991e7c5d8bcc/apps/desktop/src/native-host/native-commands.ts) for shortcut options and external-app targeting.

**Translate** uses selection input, replaces the selection, has review disabled, and uses no tools. English is a saved parameter and is labelled before invocation. No default keyboard shortcut is claimed. The draft is never sent.

**Improve coding request** (`完善编程需求`) is a custom command with selection input, replacement output, no review and no tools. Its instruction is: “Rewrite the selected coding request as a concise actionable prompt. Preserve the relevant facts and numbers; make the desired outcome and arithmetic acceptance example explicit. Return only the revised prompt.” The expected total ¥755 is arithmetic in the prompt, not an executed code fix. This cut shows no downstream coding-agent actions or tests.

**Extract action items** (`提取待办事项`) groups by owner. Its starter output is the conversation; the film explicitly changes the per-run destination to `插入选区后`. That destination does not change the command's saved default. The result is inserted plain text; it does not create native Notes tasks, reminders, or assignments. Original notes remain visible.

Selection/writeback depends on a compatible editable target and appropriate access. These scenarios demonstrate supported examples, not universal application compatibility. Product controls are recreated at editorial scale without runtime imports from the product repository. Film-only changes do not require an in-app product-skill update.

## Original sound

Atd operations are silent. `audio.ts` adds a new original **150 BPM** electronic score and editorial movement accents, with no mouse, typing, execution, or completion sounds. A sparse pulse motif, rounded bass and compact chord stabs drive the cut; the command fan reduces the arrangement, the second half restores the groove, readable results leave musical space, and the close resolves before its final hold. Tempo and arrangement are original production choices, not measurements of Shotbase's score.

The master is `public/audio/command-film.wav`; separate music and effects stems are in `public/audio/stems/`. Shared synthesis, seeded randomness and mastering make the output deterministic. Shared mastering applies its final fade and limiter; pre-limiter stems are intended for further mixing, not a sample-exact sum of the final master.

For a silent delivery without re-encoding the picture:

```sh
ffmpeg -i out/atd-commands-zh.mp4 -map 0:v:0 -c:v copy -an -movflags +faststart out/atd-commands-zh-silent.mp4
```

## Reproducibility and assets

Typography combines three free SIL Open Font License families by role: **Sora** gives the English editorial titles their distinct shape, **Inter** carries Latin interface text, and **Noto Sans SC** covers Chinese titles, interface text and punctuation. These are choices for this cut, not a one-font restriction on future films. The Sora variable font is an unchanged snapshot from [Google Fonts commit `a926665`](https://github.com/google/fonts/tree/a926665019d3f7f25c8b1212cecbfa871e70de82/ofl/sora), loaded locally before frames are captured. Its license and hash are checked in; no new dependency or system-font installation is needed.

Use the pinned Node and pnpm versions. `pnpm check` verifies source/configuration and asset hashes; inspect actual review frames, transition clips, the complete encode and its metadata before accepting a creative change. Other films and the shared kit are unchanged by this revision.

Existing wallpaper and application-icon snapshots remain under `public/command-film/`, with source attribution, transformations and hashes in `assets/manifest.json`; a creative revision need not use every asset. Apple and OpenAI retain their marks; fonts and other assets retain the notices in `THIRD_PARTY.md`. Rendering does not access installed applications or live product files. Generated audio, stills and movies are ignored and stay outside ordinary Git history.
