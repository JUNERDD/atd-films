---
name: cinematic-product-film
description: Create or rebuild cinematic software launch and feature films with kinetic typography, carefully framed UI demonstrations, and an original synchronized score. Use for Shotbase-like product promos in this film repository, including storyboard, Remotion production, and render review.
---

# Cinematic Product Film

Build a film around a visible change the product makes possible. Give it an editorial rhythm: a concise promise, readable proof, a few contrasting demonstrations, and a memorable finish. The reference informs the filmmaking; the featured product supplies the identity and truth.

Read [the Shotbase study](references/shotbase-study.md) when using this visual direction. It separates actual timestamped observations from production recommendations. Read [Atd production](references/atd-production.md) before implementing here; it maps the existing kit and its coordinate, timing, and rendering contracts.

## Establish the proof

Before choosing effects, identify the audience, the single takeaway, the existing delivery contract, and the product behavior that can visibly support the claim. Infer routine choices from the current film and request; a creative revision does not require a separate approval ceremony.

Write a short beat sheet with these fields for each beat:

- Time range and viewer takeaway.
- Exact visible before/action/after, including who performs each action.
- Framing and the one thing the viewer should look at.
- Entry, reading hold, exit, and musical role.
- The object inherited from the previous beat and how it becomes the next one.

Use source-grounded, public fictional content. Preserve the meaningful facts through transformations. Distinguish the featured capability from another application's subsequent work. A command that rewrites a prompt should be proven by the improved prompt; a downstream code fix needs an explicit handoff if it belongs in the story at all.

Treat reference acquisition as research: verify the publisher and inspect the actual film across its timeline. A webpage's hero loop, a trailer thumbnail, and a third-party remake are different evidence. Record gaps honestly, particularly when audio was not heard. Do not invent observations to complete a style analysis.

For later work using this same reference, the checked-in study is reusable evidence; fresh downloading or viewing is not required. Reinspect when the reference changes, a new claim needs evidence, or the available study cannot answer a consequential question. Say when a plan relies on the study rather than fresh viewing.

## Design the attention

Alternate expressive editorial shots with calm product proof. Useful forms include an isolated oversized control, full-frame kinetic words, a cropped working window, a short contextual wide shot, and a clean result detail. Choose them for the beat; do not turn every scene into the same floating desktop card.

Keep one reading task in focus. During a demonstration, let the changed content and necessary control carry the story. Remove or quiet persistent headlines, labels, Dock chrome, pointers, and status copy when they compete. Long settings inventories rarely prove value as clearly as one saved instruction and its later use.

Make the decisive text readable at the intended playback size. Shorten fictional inputs or narrow the crop before increasing the entire UI scale. Keep native geometry and hierarchy recognizable; editorial magnification is not a new product layout. Result holds begin when the text and camera have settled, not when their entrance starts.

Use large type as a cut or visual event, not a second continuous subtitle track. Favor concrete verbs and outcomes over feature lists. Let the final name and promise settle through the last frame. Keep scenario and timing disclosures readable but secondary, in the film or its delivery notes as appropriate.

Choose typography by role. Free, appropriately licensed typefaces and combinations of families are welcome; the film is not limited to one family or the application's interface font. Pair expressive headline type with readable body and UI text when it serves the direction. Check the actual license, required notices, weight range and language coverage, including Chinese punctuation. Keep product UI geometry recognizable, pin any new font assets, and wait for every used face before capturing frames.

## Choreograph the picture

Name action times in the film's timeline and derive pointer, state, camera, review frames, and sound from those times. Work in seconds at the narrative level and convert once to frames at rendering boundaries.

The useful motion unit is **arrive → act → reveal → read → leave**. A selection follows a drag; a pressed state precedes its response; output appears after execution; the camera settles before the viewer reads. Editorial time compression can remove waiting but must preserve the order and ownership of the action.

Choose a small motion vocabulary for this film. A confident cut, matched shape, masked type reveal, or motivated push can provide contrast without adding a new transition for every beat. Reserve fast blur and perspective for travel, then resolve to sharp, level UI. Inspect intermediate frames: a transition that works at its endpoints may still double text, expose a blank stage, or clip a menu.

For a lively direction, design object motion separately from framing. Let a selected block stretch into a control, a result shrink into a reusable card, or a chosen card expand into the next working surface. Carry a recognizable shape or content across the handoff. Begin supporting arrivals during the primary travel, then use a small stagger or secondary rotation to establish hierarchy. Make acceleration, contact/compression, and settlement distinct phases; one global camera spring cannot supply all three. A fade between unrelated windows does not establish continuity.

Give every pause a reading or anticipation purpose. Remove repeated simulated execution waits; after the first demonstration, a compressed operation can still preserve input → invocation → one write. Compare the time spent waiting with the time spent revealing useful information. Shorten copy before shortening its necessary reading hold. Higher frame rate improves sampling, but cannot fix a repeated zoom/wait/zoom template.

Reuse Remotion's deterministic frame APIs and suitable existing components. The current film's scene framework, full desktop framing, camera rig, score and script are creative choices, not constraints on a rebuild. Prefer a film-local composition when the shared kit does not fit; do not build a parallel animation framework or reshape shared components solely for one cut.

## Compose sound with the edit

Use original or appropriately licensed audio. Plan a restrained entrance, pulse or motif supporting demonstrations, contrast at major editorial beats, and a resolved close. Vary density and register rather than looping the same energy through the whole film. Let readable result holds breathe.

Keep soundtrack and editorial transitions separate from product sounds. Atd does not emit click, typing, execution, or success sounds; any score accents must read as filmmaking. Tie transition cues to picture events and inspect music/effects stems independently. Leave headroom and avoid an abrupt tail at the final frame.

## Deliver the film

Implement the accepted beat sheet in the film-owned files, keeping other films and shared assets stable. Update the font sample when adding copy and keep the review moments aligned with the new timeline.

Validate source, then inspect representative stills and encoded motion through every important handoff. Decode dense consecutive samples around fast moves (roughly 10–15 samples per second is a useful diagnostic) to find discontinuities, duplicated text, interrupted arcs and unintended clipping. Check full-speed playback when available; neither a few endpoint stills nor a frame-rate label establishes smoothness. Inspect at a reduced viewing size as well as full resolution.

A full-rebuild request needs a complete playable render with sound. Verify dimensions, duration, frame rate, audio, first/last frames, and important before/after states. Audit the final temporal structure: successive shots should have distinct movement roles, useful reading holds, and purposeful exits. Revisit the choreography if the film still feels like a slideshow, even when its frames look polished.

Report the actual movie and reusable skill paths, the reference source, the checks completed, and any material limitation. Distinguish static frame inspection, motion inspection, and listening; one does not establish the others.
