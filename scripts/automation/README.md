# Production automation

Start with [AGENT_RUNBOOK.md](AGENT_RUNBOOK.md). The existing discovery, Feishu approval, course batching and checkpoint scheduler are retained. `publish_ready.py` consumes a reviewed final artifact record and retries Feishu and GitHub independently. `reserve_identity.py` freezes the ID before production. `feishu_fields.py` reuses existing columns and adds missing meanings only.

Set `LEADDE_WORKSPACE` to the existing render workspace and `LEADDE_REPO` to a dedicated publishing checkout. Load Feishu app credentials in the environment and make GitHub CLI (`gh`, with attachment support), Git, Python, ffmpeg, Node and the course Remotion dependencies available on PATH. Secrets and runtime journals stay outside the public catalog.

Run `python3 scripts/automation/incremental_agent.py run` for discovery, `reserve_identity.py KEY` before production, then use `checkpoint` and `publish_ready.py KEY`. Reviewed publication failures never require a renderer. Legacy `sync_*_delivery.py` entrypoints accept final-record manifests through the common stable-ID importer; they no longer publish by matching mutable titles or assuming file existence means review success.

Course packages are a separate `course_package` publication channel. `publish_ready.py KEY --channel course_package` retries only that package and its generated download index; successful media channels are not regenerated. Package publishing accepts `--course COURSE_CODE`, compares the current inventory, and preserves existing Release tags.

New and revised videos follow [action-first production](../../docs/PRODUCTION.md): action storyboard → critical-process preview → batch production → separate technical/teaching review. The publisher enforces this contract; previously published legacy versions remain retryable.
