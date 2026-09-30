# Production and publication upgrade — 2026-09-30

## Scope and actual control points

The audit used remote `main` at `49241f1`, not the stale local publishing checkout. It contained 436 concepts, 299 ready files, 137 coming-soon entries, 40 courses and 17 disciplines. The original dirty checkout and its unpublished batch were preserved; this work uses an isolated checkout.

- `automation/incremental_agent.py`, `reserve_identity.py`, `publish_ready.py`, `feishu_fields.py`: existing discovery/batching retained; pre-storyboard identity and term gate; version-specific review validation; stable-ID upsert; independent, recoverable channels; native attachment recovery by ID/version; metadata readback.
- `scripts/final_record.py`: common final record contract and measured media parameters. Original teaching requirement, actual production and public reuse material are separate fields within the catalog record.
- `scripts/ingest_delivery.py`, existing `sync_*_delivery.py`, `import_csv.py`: reviewed stable-ID ingestion and preservation of existing final artifacts during partial source imports. Old title-based/fill-empty delivery cannot silently publish revisions.
- `data/prompts.json`: expanded existing schema; original names and aliases retained; all 451 IDs linked to original Feishu records; 314 actual files probed. `data/backlog.json` and the legacy Linear Algebra prompt export are generated views, not separately maintained sources.
- `scripts/build_github_readme.py`: generates concise README, full INDEX, course pages, existing prompt-file compatibility entries and backlog. Native video attachment paragraphs and stable anchors remain.
- `assets/site/app.js`, `index.html`, `assets/site/styles.css`: data-derived counts, aliases/search, ready-only filter, shareable hash routes, refresh restoration, posters, copying, MP4/course downloads and mobile layout.
- `build_course_video_bundles.py` / `publish_course_video_releases.py`: existing fixed-tag Releases reused; current package contents compared before upload; the production publisher updates only the affected course and independently retries its package; indexes, Prompts and reuse notes included. Canonical course codes reconcile the split Deep Learning and Generative AI groups. Pre-existing Release links are retained.
- `sources/`, media/cover assets and verification documents: actual revised production source and evidence for eight v2 animations.
- Issue templates, Topics, feedback labels, `.github/CONTRIBUTING.md`, `docs/RIGHTS.md`, `docs/REUSE.md`: discovery, feedback and honest license/reproduction terms.

Local production entrypoints in the workspace `automation/` now delegate to the maintained repository implementation. The actually referenced `edu-video-produce` Skill, its `emit-prompt-cards.mjs`, and `edu-video-cover-title` Skill were updated in the local skills installation: standard names, final-record handoff, truthful reuse limits and retained downloads. The shared `.workbuddy/upload_four_courses_api.py` compatibility entrypoint now requires a reviewed final record instead of filling only empty fields. Those local changes are active; they are not a claim that an uncalled README alone changed production.

Concurrent remote commit `7d82ca0` added 15 Kubernetes videos during this work. It was merged without overwriting those entries or the original dirty checkout. Final totals: **451 concepts, 314 video-ready, 137 coming soon, 41 courses, 17 disciplines; 8 version-specific review passes**. The 15 concurrent videos remain unreviewed, and their existing Feishu identities and attachments are preserved. [Metadata readback](verification/concurrent-import.json).

## Completed content repairs

All eight requested names retain their existing IDs, paths and aliases: Row Space, Null Space, Left Null Space, Orthogonal Projection, Dynamic Programming State, Dynamic Programming State Transition, SN1 Reaction and E1 Reaction. Each has a newly rendered v2 video, corresponding cover and final-video Prompt, source/dependencies, actual AI-assisted review record, new native attachment and verified Feishu writeback.

C05-A002's approximately 16-second formula overlap is repaired in the real source. Its old 15-second Manim requirement is retained as historical input; the public Prompt describes the actual 30-second Remotion production. Additional confirmed repairs clarify a null-plane slice, left-null cross-section, perpendicular projection scale, projection-formula layout and SN1 departing-proton label.

Review scope and samples: [Row Space](verification/C05-A002.md), [other seven revisions](verification/term-revisions.md), [featured-video inspection](verification/featured-inspection.md). The three historical featured examples have sampled inspection records, not fabricated full review passes.

## Verification evidence

- Seven unit tests: both partial-success directions, same-version retries, new/revised identity, prohibited identity reassignment, duration mismatch, stale player version and absence of review evidence. Injected failures are explicitly test fixtures.
- A real GitHub EOF occurred for C02-A008 while Feishu succeeded. Other records continued. Retrying recovered only the failed channel; the eight v2 markers each occur in exactly one attachment comment, with no new attachment Issues.
- A real Feishu readback discrepancy arose because empty fields are omitted. The adapter now normalizes empty readback and resumes using saved file tokens. Final v2 text and attachment-token readbacks succeeded.
- [Real identity examples](verification/identity-mapping.json): the September newly produced Next-Token Probability Distribution record preserves its original record ID and matches the actual production file byte-for-byte; C05-A002 v2 retains its original ID while preserving the old player in history.
- Three touched course kits passed TypeScript checking. Python compilation, JavaScript syntax and generated-catalog validation passed. All 451 unique IDs, 451 unique Feishu mappings, 314 media paths/native-player paragraphs, local generated links and data-derived statistics were checked.
- [Local browser checks](verification/site-test-result.json): alias search, ready filter, deep-link reload, clipboard, real video metadata, download link and no horizontal overflow at 390 px; no page errors. [Mobile screenshot](verification/site-mobile.png).
- [Package/player checks](verification/delivery-checks.json): 29 canonical course packages contain all 314 current videos; ZIP indexes match catalog IDs, versions, Prompts and media. All eight revised attachment URLs returned HTTP 200 with `video/mp4`. HEAD checks are not a claim of interactive playback on GitHub.
- [Feishu field mapping](verification/feishu-field-mapping.json) reuses existing meanings. [GitHub metadata](verification/github-metadata.json): seven Topics and 74 storage-Issue labels applied; no Issue bodies, comments or old attachments deleted.

## Remaining work and limits

- **306 ready records still require full review and/or Prompt alignment.** See the generated [backlog](../data/backlog.json). Missing objectives, conclusions, dependencies and references remain explicitly pending. No bulk approval was inferred from files or historical boolean flags.
- C03-A001 has a known low-contrast decision-rule formula around 10 seconds, recorded as `needs_revision` and excluded from featured selection. It was not repaired in this batch.
- Clean-machine, pixel-identical reproduction is not verified. Required source materials are provided for the revised course compositions; missing materials elsewhere are disclosed.
- No public website was configured (`has_pages=false`, About homepage empty). Local static-site validation is complete. Deployment needs a chosen host/base path; About remains unset. No online URL was invented.
- Product links use the verified animation directory and math/chemistry solution pages. The computer-science-specific page timed out during checking, so that course group keeps the directory fallback. No automatic Prompt transfer is claimed.
- Maintainers must decide licenses separately for videos/covers, Prompts, source code and third-party assets. No MIT/CC/commercial-use grant was added. Storage-Issue labeling is applied; optional closure/archiving is documented without deleting attachment history.

## Repository publication

Core changes and the concurrent-content merge were pushed to `main` as `352689e`. The initial HTTP 400 left the remote unchanged; retrying the Git transport succeeded. Final status reconciliation is recorded in [publication evidence](verification/publication.json).
