# Command workflow film

`AtdCommandsZh` is a **42-second, 1920 × 1080, 30 fps** Chinese feature film. It shows a saved instruction acting on selected text, then returning a useful result where the user is working.

```sh
pnpm preview:commands
pnpm preview:commands --transitions
pnpm render:commands
```

The full render is `out/atd-commands-zh.mp4`. The detailed preview writes 22 states to `out/command-review/`; transition mode writes 26 boundary/final frames and five short encoded clips to `out/command-transitions/`. The generic `pnpm preview commands-zh` samples eight representative moments. These commands prepare pinned assets and the original score. They do not open a product app, record a screen, or call a model.

## Editorial direction

This revision draws on [Shotbase's official launch film](https://www.youtube.com/watch?v=MoWSwxZGk_0): the same working object connects action and result; a clean white stage makes UI details legible; short phrases follow the action; scale changes lead attention; the brand gets a quiet black close. The research verified the official publisher and sampled the actual movie. It did not establish the original film's precise curves, font, BPM, instrumentation, or voiceover.

The reusable [cinematic-product-film skill](../../../.agents/skills/cinematic-product-film/SKILL.md) contains the [timestamped reference study](../../../.agents/skills/cinematic-product-film/references/shotbase-study.md) and production guidance. No Shotbase images, footage, music or artwork are used in this film.

| Time    | Picture and visible proof                                                                                                                             |
| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| 0–3 s   | A short promise and enlarged selection toolbar establish the trigger.                                                                                 |
| 3–14 s  | A Chinese Mail draft is selected; a configured shortcut opens options; English is chosen; the translation replaces the text in the same unsent draft. |
| 14–18 s | Saved Commands and shortcut configuration establish that a method is reusable.                                                                        |
| 18–27 s | A custom coding-request command replaces a vague draft with a concise prompt and a concrete acceptance example. The draft stays unsent.               |
| 27–38 s | Notes selection opens command options; the output changes to insertion after the selection; original notes stay above the added owner/deadline list.  |
| 38–42 s | Atd / Command and the final promise settle on black and remain visible through the last frame.                                                        |

The film replaces the former repeated desktop/zoom/slide structure with varied product details on white. The important outcomes get settled reading holds. Pointer, selection, native controls and camera share a coordinate space. `timeline.ts` owns narrative and operation events; the scene clocks account for transition handles. The score and preview samples consume this timeline.

## Product facts and scenario choices

These are **authored, deterministic scenarios**, not live recordings or latency benchmarks. All input and output are fictional and public. Transformation output appears as a replacement or insertion, not simulated model-token streaming.

Behavior was checked against [Atd product commit `6b624619`](https://github.com/JUNERDD/Atd/tree/6b6246197634b3f660d44250e496991e7c5d8bcc), especially:

- [`starter-copy.ts`](https://github.com/JUNERDD/Atd/blob/6b6246197634b3f660d44250e496991e7c5d8bcc/apps/agent-service/src/commands/starter-copy.ts) and [`starters.ts`](https://github.com/JUNERDD/Atd/blob/6b6246197634b3f660d44250e496991e7c5d8bcc/apps/agent-service/src/commands/starters.ts) for command names, choices and defaults.
- [`command-output.ts`](https://github.com/JUNERDD/Atd/blob/6b6246197634b3f660d44250e496991e7c5d8bcc/packages/agent-contracts/src/command-output.ts) for destinations and review.
- [`CommandHold.swift`](https://github.com/JUNERDD/Atd/blob/6b6246197634b3f660d44250e496991e7c5d8bcc/apps/macos/Sources/AICore/Island/CommandHold.swift) and [`native-commands.ts`](https://github.com/JUNERDD/Atd/blob/6b6246197634b3f660d44250e496991e7c5d8bcc/apps/desktop/src/native-host/native-commands.ts) for shortcut options and external-app targeting.

**Translate** uses selection input, replaces the selection, has review disabled, and uses no tools. The sample chooses English. Keyboard shortcuts are configured examples, not product defaults. The Mail scene never sends a message.

**Improve coding request** (`完善编程需求`) is a custom command with selection input, replacement output, no review and no tools. Its instruction is: “Rewrite the selected coding request as a concise actionable prompt. Preserve facts and numbers; make the desired outcome and acceptance example explicit. Ask to preserve the current interface and public API, and verify quantity changes. Return only the revised prompt.” The expected total ¥755 is arithmetic in the prompt, not an executed code fix. This cut shows no downstream coding-agent actions or tests.

**Extract action items** (`提取待办事项`) groups by owner. Its starter output is the conversation; the film explicitly changes the per-run destination to `插入选区后`. That destination does not change the command's saved default. The result is inserted plain text; it does not create native Notes tasks, reminders, or assignments. Original notes remain visible.

Selection/writeback depends on a compatible editable target and appropriate access. These scenarios demonstrate supported examples, not universal application compatibility. The source-grounded product kit is reused without runtime imports from the product repository. Film-only changes do not require an in-app product-skill update.

## Original sound

Atd operations are silent. `audio.ts` adds original editorial music and restrained boundary accents, with no mouse, typing, execution, or completion sounds. The 120 BPM arrangement uses chapter-specific harmony and a recurring motif: a light opening, Mail pulse, drumless settings bridge, renewed Code/Notes energy, quieter result holds, and a resolved close. This tempo is an original production choice, not a measurement of Shotbase's score.

The master is `public/audio/command-film.wav`; separate music and effects stems are in `public/audio/stems/`. Shared synthesis, seeded randomness and mastering make the output deterministic. Shared mastering applies its final fade and limiter; pre-limiter stems are intended for further mixing, not a sample-exact sum of the final master.

For a silent delivery without re-encoding the picture:

```sh
ffmpeg -i out/atd-commands-zh.mp4 -map 0:v:0 -c:v copy -an -movflags +faststart out/atd-commands-zh-silent.mp4
```

## Reproducibility and assets

Typography combines three free SIL Open Font License families by role: **Sora** gives the English editorial titles their distinct shape, **Inter** carries Latin interface text, and **Noto Sans SC** covers Chinese titles, interface text and punctuation. These are choices for this cut, not a one-font restriction on future films. The Sora variable font is an unchanged snapshot from [Google Fonts commit `a926665`](https://github.com/google/fonts/tree/a926665019d3f7f25c8b1212cecbfa871e70de82/ofl/sora), loaded locally before frames are captured. Its license and hash are checked in; no new dependency or system-font installation is needed.

Use the pinned Node and pnpm versions. `pnpm check` verifies source/configuration and asset hashes; inspect actual review frames, transition clips, the complete encode and its metadata before accepting a creative change. Other films and the shared kit are unchanged by this revision.

The blue wallpaper and application icons are immutable snapshots under `public/command-film/`, with source attribution, transformations and hashes in `assets/manifest.json`. Apple and OpenAI retain their marks; fonts and other assets retain the notices in `THIRD_PARTY.md`. Rendering does not access installed applications or live product files. Generated audio, stills and movies are ignored and stay outside ordinary Git history.
