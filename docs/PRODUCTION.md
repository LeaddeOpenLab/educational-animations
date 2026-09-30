# Action-first production

This is the production contract for new and revised videos. It extends the existing final record; it does not create a second storyboard database. Already published legacy versions remain retryable, with their original review scope unchanged.

## P0 — before expanding a batch

1. In `production.scenes`, every scene identifies `id`, `objects`, `change`, `cause`, `result`, `start_seconds`, `end_seconds`, `reading_seconds` and `timing_reason`. Explain what moves or changes and why the visible result follows. A topic summary or narration alone is not an action storyboard.
2. Set `production.workflow_version` to `2`. Identify the most important and most uncertain mechanisms in `critical_processes`: `id`, `scene_id`, `uncertainty`, `expected_observation`. Enter the `预览中` checkpoint after completing the plan. Before implementing the whole batch, render only these process windows at low resolution using the existing course renderer. For Remotion, use the existing composition with `--frames START-END --scale 0.5`; inspect motion, not just an isolated still. Do not spend time polishing all scenes first.
3. Store each result in `production.previews`: `process_id`, `artifact`, `version`, `reviewer`, `reviewed_at`, `evidence`, `observed`, `applicability`, `status`. A rendered file is not a passed preview. Record what was actually observed against the expected mechanism. A shared mechanism can reuse the same preview evidence across relevant records when applicability is explicit; a different mechanism needs its own preview. A changed mechanism or artifact version invalidates its preview. Only a passed preview admits `制作中`; blocked items do not prevent unrelated items from continuing.
4. Final review has two independently evidenced sections, `review.technical` and `review.teaching`. Each records `status`, artifact `version`, actual `reviewer`, `reviewed_at`, `evidence`, and `checks`. Technical checks are `compilation` and `media` (measured dimensions, duration and format). Teaching checks are `causal_motion`, `state_consistency`, `pacing`, `readability`, `version_match`. Keep the existing seven overall checks as the summary. Both sections must pass; compilation, non-overlap and metadata can never grant a teaching pass. Evidence validators check completeness, not the truth of an explanation.

## P1 — implementation

- `production.state_model` records the actual state-producing function/module in `source` and its `bindings`: which objects, numbers, annotations and explanatory text depend on it. Derive these outputs from the same mechanism state. Avoid separate timers or manually copied values that can disagree. State explicitly when a visual has no numerical quantity.
- Scene durations follow the operation and the time needed to understand its result. Target roughly 30 seconds: the default final duration is 25–35 seconds, with no fixed scene count. Simplify the scope or split a topic that cannot fit; do not expand into a long video. Use one timeline as the source for composition duration, captions and the final Prompt; probe the rendered file afterward. Respect an explicitly requested duration constraint by simplifying scope, not by accelerating the essential mechanism or padding with a long idle ending.
- `production.template_scope` identifies reused palette, fonts, layout helpers and basic graphics. Those components may be shared; the concept determines its objects, causal sequence, examples and arrangement. Similar scene counts alone do not prove a bad template, and different scene counts do not prove good teaching.

## P2 — inspect risks and record causes

- `production.risk_moments` contains `id`, `time_seconds`, `reason`. Pick actual object handoffs, motion crossings, state changes, formula/label updates and transitions. Include checks at common player size. Fixed-interval overview sheets remain useful but are not a substitute for these moments.
- Run `python3 scripts/inspect_risk_frames.py FINAL_RECORD --video FINAL_MP4 --out LOCAL_REVIEW_DIR`. It extracts frames before, during and after each risk and creates a pending inspection manifest. Review the surrounding moving clip when a still cannot establish causality. Copy genuine findings to `review.teaching.risk_checks`, with `risk_id`, `times_seconds`, `evidence`, `observation`; never convert extraction success into review approval.
- Record actual rework under `production.rework`: `category` (`design`, `logic`, `layout`, `render`), `cause`, `affected_ids`, optional `time_seconds`, `status`, `fix`, `evidence`. Unresolved causes can remain explicitly pending. A resolved issue needs the fix and verification evidence. Check whether the same cause affects the shared component or other batch items; repair that common cause and inspect those affected items, not the entire library. Do not invent past rework records.

## Commands and integration

- `python3 scripts/production_review.py FINAL_RECORD --stage plan|preview|final` checks evidence structure.
- `checkpoint KEY 预览中 --artifacts ARTIFACTS_JSON` validates the action plan; `checkpoint KEY 制作中 --artifacts ARTIFACTS_JSON` additionally requires preview approval.
- `checkpoint KEY 待发布 --artifacts ARTIFACTS_JSON --review-passed`, the delivery importer and publisher enforce both final review tracks. Publication failures still retry independently and never trigger a new render.
- The existing Feishu **Final Production Record** and **Review Record** fields carry these nested sections. No parallel set of columns is needed.

## Validation of this workflow change

Fourteen unit tests cover the existing delivery behavior and the new action/preview/dual-review gates, including 25/30/35-second acceptance and long-video rejection. Fixtures are synthetic and do not approve a real lesson. The risk extractor was executed against the existing C05-A002 v2 file at 15.85, 16.00 and 16.15 seconds; its output remains pending inspection, not a new review pass. Existing 451 catalog records and 314 native players still validate.

The installed producer's `SKILL.md`, `audit-l3-distinctness.mjs`, `emit-prompt-cards.mjs`, and the two existing course-local copies of that emitter were also updated in the current production workspace: 25–35 seconds instead of exactly 900 frames, action previews before batch expansion, and distinct technical/teaching evidence. The L3 audit accepted a synthetic 32-second, two-scene fixture. Local installed files are not shipped as repository dependencies; a new workstation must use producer controls consistent with this contract. No existing video was re-rendered or granted a new review approval by this change.
