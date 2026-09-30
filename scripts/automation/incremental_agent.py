#!/usr/bin/env python3
"""Incremental source discovery and Feishu approval queue for educational videos."""

from __future__ import annotations

import argparse
import fcntl
import hashlib
import html.parser
import http.client
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import time
import urllib.parse
import urllib.request
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path
from discovery_feeds import scan as scan_feeds


ROOT = Path(os.environ.get("LEADDE_WORKSPACE", Path(__file__).resolve().parents[2]))
CONFIG = Path(__file__).with_name("sources.json")
FEEDS_CONFIG = Path(__file__).with_name("feeds.json")
STORE = ROOT / ".workbuddy" / "incremental-agent"
STATE_FILE = STORE / "state.json"
BASE = "https://open.feishu.cn/open-apis"
APP_TOKEN = os.environ.get("FEISHU_BITABLE_APP_TOKEN", "SamybNgi6aRHH1sVVhEcTxNVnse")
TABLE_ID = os.environ.get("FEISHU_BITABLE_TABLE_ID", "tblmQdRJPaZlMKL2")
FIELDS = ["Pipeline Status", "Review Decision", "Source URL", "Source Fetched At", "Candidate Reason", "Agent Key", "Agent Run ID", "GitHub URL"]
USER_AGENT = "LeaddeKnowledgeDiscovery/0.1 (+https://github.com/LeaddeOpenLab/leadde-knowledge-in-motion)"


def now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def atomic_json(path: Path, value: object) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile("w", encoding="utf-8", dir=path.parent, delete=False) as file:
        json.dump(value, file, ensure_ascii=False, indent=2)
        file.write("\n")
        temporary = Path(file.name)
    temporary.replace(path)


def load_json(path: Path, default):
    return json.loads(path.read_text(encoding="utf-8")) if path.exists() else default


def normalize(value: str) -> str:
    value = value.casefold().replace("’", "'").replace("–", "-")
    return re.sub(r"[^a-z0-9]+", "", value)


class LinkParser(html.parser.HTMLParser):
    def __init__(self):
        super().__init__()
        self.current = None
        self.links = []

    def handle_starttag(self, tag, attrs):
        if tag == "a":
            self.current = {"href": dict(attrs).get("href", ""), "text": ""}

    def handle_data(self, data):
        if self.current is not None:
            self.current["text"] += data

    def handle_endtag(self, tag):
        if tag == "a" and self.current is not None:
            self.current["text"] = re.sub(r"\s+", " ", self.current["text"]).strip()
            self.links.append(self.current)
            self.current = None


def fetch_links(url: str) -> list[dict]:
    last_error = None
    for attempt in range(3):
        try:
            request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
            with urllib.request.urlopen(request, timeout=35) as response:
                if response.status != 200:
                    raise RuntimeError(f"source HTTP {response.status}: {url}")
                body = response.read(2_000_001)
            if len(body) > 2_000_000:
                raise RuntimeError(f"source exceeds 2 MB: {url}")
            parser = LinkParser()
            parser.feed(body.decode("utf-8", errors="replace"))
            return parser.links
        except (OSError, RuntimeError, http.client.IncompleteRead) as error:
            last_error = error
            if attempt < 2:
                time.sleep(attempt + 1)
    raise RuntimeError(f"source unavailable after 3 attempts: {last_error}")


def link_index(links: list[dict]) -> dict[str, str]:
    return {link["text"]: link["href"] for link in links if link["text"] and link["href"]}


def api(path: str, token: str | None = None, payload: dict | None = None, method: str | None = None) -> dict:
    body = json.dumps(payload, ensure_ascii=False).encode("utf-8") if payload is not None else None
    headers = {"Content-Type": "application/json; charset=utf-8"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    request = urllib.request.Request(BASE + path, data=body, headers=headers, method=method or ("POST" if body else "GET"))
    with urllib.request.urlopen(request, timeout=60) as response:
        result = json.load(response)
    if result.get("code", 0) != 0:
        raise RuntimeError(f"Feishu API {result.get('code')}: {result.get('msg')}")
    return result


def tenant_token() -> str:
    app_id, app_secret = os.environ.get("FEISHU_APP_ID"), os.environ.get("FEISHU_APP_SECRET")
    if not app_id or not app_secret:
        raise RuntimeError("FEISHU_APP_ID and FEISHU_APP_SECRET are required; load workspace .env")
    return api("/auth/v3/tenant_access_token/internal", payload={"app_id": app_id, "app_secret": app_secret})["tenant_access_token"]


def table_path(suffix: str) -> str:
    return f"/bitable/v1/apps/{APP_TOKEN}/tables/{TABLE_ID}/{suffix}"


def ensure_fields(token: str) -> None:
    fields = api(table_path("fields?page_size=100"), token)["data"]["items"]
    existing = {field["field_name"] for field in fields}
    for name in FIELDS:
        if name not in existing:
            api(table_path("fields"), token, {"field_name": name, "type": 1})
            print(f"created Feishu field: {name}")


def all_records(token: str) -> list[dict]:
    rows, page_token = [], None
    while True:
        query = {"page_size": 500}
        if page_token:
            query["page_token"] = page_token
        path = table_path("records?" + urllib.parse.urlencode(query))
        data = api(path, token)["data"]
        rows.extend(data.get("items", []))
        if not data.get("has_more"):
            break
        page_token = data["page_token"]
    return rows


def record_fields(row: dict) -> dict:
    return row.get("fields", {})


def canonical_key(discipline: str, course: str, name: str) -> str:
    return f"{normalize(discipline)}|{normalize(course)}|{normalize(name)}"


def priority_tier(config: dict, discipline: str) -> int:
    for index, names in enumerate(config.get("discipline_priority_tiers", [])):
        if discipline in names:
            return index
    return len(config.get("discipline_priority_tiers", []))


def select_discovery_courses(config: dict, records: list[dict]) -> list[dict]:
    """Choose a small course portfolio before touching syllabus or trend sources."""
    source_groups = defaultdict(list)
    for source in config.get("sources", []):
        source_groups[(source["discipline"], source["course"])].append(source)
    backlog = Counter()
    for row in records:
        fields = record_fields(row)
        if fields.get("Pipeline Status") in ("待审核", "待制作", "制作中", "待发布", "失败"):
            backlog[(fields.get("Discipline"), fields.get("Course"))] += 1
    target = config.get("target_course_candidate_pool", 8)
    ordered = sorted(source_groups, key=lambda pair: (priority_tier(config, pair[0]),
                      -min(backlog[pair], target), pair[0], pair[1]))
    selected = []
    for discipline, course in ordered:
        if len(selected) >= config.get("max_discovery_courses_per_run", 2):
            break
        if backlog[(discipline, course)] >= target:
            continue
        selected.append({"discipline": discipline, "course": course,
                         "backlog": backlog[(discipline, course)],
                         "needed": target - backlog[(discipline, course)],
                         "source_ids": [source["id"] for source in source_groups[(discipline, course)]]})
    return selected


def syllabus_links(source: dict, links: list[dict]) -> list[dict]:
    """Keep only on-site content links as evidence; do not invent concept names."""
    origin = urllib.parse.urlparse(source["url"])
    allowed_hosts = {origin.netloc, *source.get("allowed_hosts", [])}
    path_prefixes = source.get("pool_path_prefixes", [])
    title_pattern = source.get("pool_anchor_regex")
    found = {}
    for link in links:
        title = re.sub(r"\s+", " ", link.get("text", "")).strip()
        url = urllib.parse.urljoin(source["url"], link.get("href", ""))
        parsed = urllib.parse.urlparse(url)
        if title.startswith("http") and title == link.get("href"):
            title = re.sub(r"[-_]+", " ", Path(parsed.path).stem).title()
        if not (3 <= len(title) <= 110 and re.search(r"[A-Za-z]", title)):
            continue
        if parsed.netloc not in allowed_hosts or not parsed.path or url == source["url"]:
            continue
        if path_prefixes and not any(parsed.path.startswith(prefix) for prefix in path_prefixes):
            continue
        if title_pattern and not re.search(title_pattern, title):
            continue
        if parsed.path.endswith((".pdf", ".png", ".jpg", ".svg")):
            continue
        clean_url = urllib.parse.urlunparse(parsed._replace(fragment="", query=""))
        if clean_url.rstrip("/") == source["url"].rstrip("/"):
            continue
        found.setdefault(clean_url, {"anchor": title, "url": clean_url})
    return list(found.values())


def select_work_orders(ready: dict, config: dict, counts: Counter) -> list[dict]:
    """Prefer a course batch, while resuming interrupted/reviewed work immediately."""
    production_limit = config.get("max_production_per_run", 16)
    course_limit = config.get("max_production_per_course", 8)
    course_count_limit = config.get("max_courses_per_run", 2)
    target = config.get("target_course_batch_size", 8)
    max_wait_days = config.get("max_batch_wait_days", 14)
    groups = sorted(ready.items(), key=lambda pair: (
        priority_tier(config, pair[0][0]), -len(pair[1]), pair[0][1]))
    work_orders, selected_courses = [], 0
    for (discipline, course), group in groups:
        resumes = [(key, item) for key, item in group if item["status"] in ("制作中", "失败", "待发布")]
        fresh = [(key, item) for key, item in group if item["status"] == "待制作"]
        oldest = min((datetime.fromisoformat(item.get("approved_at", item["updated_at"]))
                      for _, item in fresh), default=None)
        aged = oldest is not None and (datetime.now(timezone.utc) - oldest).days >= max_wait_days
        if len(fresh) < target and not aged:
            counts["deferred_for_batch"] += len(fresh)
            fresh = []
        if selected_courses >= course_count_limit or len(work_orders) >= production_limit:
            continue
        selected = (resumes + fresh)[:min(course_limit, production_limit - len(work_orders))]
        if not selected:
            continue
        selected_courses += 1
        for key, item in selected:
            reviewed = False
            final_path = item.get("artifacts", {}).get("final_record")
            if final_path and Path(final_path).is_file():
                sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "scripts"))
                from final_record import review_passed
                reviewed = bool(review_passed(load_json(Path(final_path), {})))
            work_orders.append({"key": key, "record_id": item["record_id"], "name": item["name"],
                "discipline": discipline, "course": course, "source": item["source"], "status": item["status"],
                "resume_from": "publish" if reviewed else "produce",
                "required_skills": [] if reviewed else ["edu-video-kit", "edu-video-produce", "edu-video-cover-title"],
                "artifacts": item["artifacts"]})
            counts["queued"] += 1
    return work_orders


def seed_state(state: dict) -> None:
    manifest = ROOT / ".workbuddy" / "embedded-digital-16-manifest.json"
    if not manifest.exists():
        return
    for row in load_json(manifest, []):
        key = canonical_key(row["discipline"], row["course"], row["name"])
        state["items"].setdefault(key, {
            "name": row["name"], "discipline": row["discipline"], "course": row["course"],
            "status": "已发布", "record_id": row["record_id"], "source": None,
            "run_id": "embedded-digital-16", "artifacts": {
                "video": row["mp4"], "cover": row["cover_jpg"], "prompt": row["prompt_md"],
                "code": row["source"], "github_url": row.get("github_url"),
            }, "error": "", "updated_at": now(),
        })


def write_report(run: dict, state: dict) -> Path:
    path = STORE / "runs" / f"{run['id']}.md"
    count = run["counts"]
    lines = [f"# 增量动画运行 {run['id']}", "", f"时间：{run['started_at']}", "",
             "| 发现 | 去重 | 新增候选 | 等待组批 | 已调度 | 制作中 | 制作完成 | 审核通过 | 已发布 | 失败 |",
             "|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|",
             f"| {count.get('discovered', 0)} | {count.get('duplicates', 0)} | {count.get('created', 0)} | {count.get('deferred_for_batch', 0)} | {count.get('queued', 0)} | {count.get('producing', 0)} | {count.get('produced', 0)} | {count.get('reviewed', 0)} | {count.get('published', 0)} | {count.get('failed', 0)} |", "",
             "| 候选 | 学科 / 课程 | 状态 | 来源与证据 | 飞书记录 | 备注 |",
             "|---|---|---|---|---|---|"]
    for key in run["item_keys"]:
        item = state["items"][key]
        source = item.get("source") or {}
        link = f"[原始页面]({source['url']})（{source.get('anchor', '')}）" if source.get("url") else "历史已发布"
        lines.append(f"| {item['name']} | {item['discipline']} / {item['course']} | {item['status']} | {link} | {item.get('record_id') or '—'} | {item.get('error') or item.get('duplicate_of') or '—'} |")
    if run.get("course_plan"):
        lines += ["", "## 本轮聚焦课程", "", "| 学科 / 课程 | 现有积压 | 距 8 条候选的缺口 |",
                  "|---|---:|---:|"]
        lines += [f"| {row['discipline']} / {row['course']} | {row['backlog']} | {row['needed']} |"
                  for row in run["course_plan"]]
    if run.get("feed_changes"):
        lines += ["", f"外部动态线索：{len(run['feed_changes'])} 条，需术语核对后才能提名；详见同运行编号的 `.feed-changes.json`。"]
    if run.get("feed_skipped"):
        lines += ["", "未启用的可选来源：" + "；".join(run["feed_skipped"])]
    if run["errors"]:
        lines += ["", "## 本次错误", ""] + [f"- {error}" for error in run["errors"]]
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return path


def run_discovery() -> int:
    config = load_json(CONFIG, {})
    state = load_json(STATE_FILE, {"version": 1, "sources": {}, "items": {}, "runs": []})
    seed_state(state)
    run_id = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    run = {"id": run_id, "started_at": now(), "counts": Counter(), "item_keys": [], "errors": []}
    token = tenant_token()
    ensure_fields(token)
    records = all_records(token)
    course_plan = select_discovery_courses(config, records)
    run["course_plan"] = course_plan
    selected_courses = {(row["discipline"], row["course"]) for row in course_plan}
    plan_path = STORE / "runs" / f"{run_id}.course-plan.json"
    atomic_json(plan_path, course_plan)
    by_key = {record_fields(row).get("Agent Key"): row for row in records if record_fields(row).get("Agent Key")}
    name_index = defaultdict(list)
    courses = {(record_fields(row).get("Discipline"), record_fields(row).get("Course")) for row in records}
    for row in records:
        fields = record_fields(row)
        if fields.get("Name"):
            name_index[(fields.get("Discipline"), fields.get("Course"), normalize(fields["Name"]))].append(row)
    candidate_limit = config.get("max_new_candidates_per_run", 16)
    remaining_by_course = {(row["discipline"], row["course"]): row["needed"] for row in course_plan}
    created_by_course = Counter()
    sources = [source for source in config["sources"]
               if (source["discipline"], source["course"]) in selected_courses]
    course_pools = []
    for source in sources:
        try:
            capacity_exhausted = False
            fetched_at = now()
            links = fetch_links(source["url"])
            course_pools.append({"source_id": source["id"], "discipline": source["discipline"],
                                 "course": source["course"], "index_url": source["url"],
                                 "fetched_at": fetched_at, "links": syllabus_links(source, links)})
            matches = []
            for topic in source["topics"]:
                found = next((link for link in links if link["text"] == topic["anchor"] and link["href"]), None)
                if found:
                    matches.append((topic, found))
                else:
                    run["errors"].append(f"{source['id']}: source anchor not found: {topic['anchor']}")
            observed_links = link_index(links)
            fingerprint_text = json.dumps({"links": observed_links, "topics": source["topics"]}, ensure_ascii=False, sort_keys=True)
            fingerprint = hashlib.sha256(fingerprint_text.encode()).hexdigest()
            previous = state["sources"].get(source["id"], {})
            if previous.get("fingerprint") == fingerprint:
                continue
            previous_links = previous.get("links", {})
            run.setdefault("source_changes", []).append({"source_id": source["id"], "url": source["url"],
                "added": [{"text": text, "url": urllib.parse.urljoin(source["url"], href)}
                          for text, href in observed_links.items() if text not in previous_links],
                "changed": [{"text": text, "url": urllib.parse.urljoin(source["url"], href)}
                            for text, href in observed_links.items() if text in previous_links and previous_links[text] != href]})
            for topic, link in matches:
                key = canonical_key(source["discipline"], source["course"], topic["name"])
                if key not in run["item_keys"]:
                    run["item_keys"].append(key)
                run["counts"]["discovered"] += 1
                if (source["discipline"], source["course"]) not in courses:
                    status, error = "待审核", "Course is absent from Feishu; human course mapping required"
                else:
                    status, error = "已发现", ""
                evidence = {"source_id": source["id"], "url": urllib.parse.urljoin(source["url"], link["href"]),
                            "index_url": source["url"], "anchor": link["text"], "fetched_at": fetched_at,
                            "reason": topic["reason"]}
                existing = state["items"].get(key)
                if existing and existing["status"] == "已发布":
                    run["counts"]["duplicates"] += 1
                    continue
                identity_names = [topic["name"], *topic.get("aliases", [])]
                duplicate = next((row for name in identity_names for row in name_index.get((source["discipline"], source["course"], normalize(name)), [])), None)
                if duplicate and record_fields(duplicate).get("Agent Key") != key:
                    state["items"][key] = {"name": topic["name"], "discipline": source["discipline"], "course": source["course"],
                        "status": "待审核", "duplicate_of": duplicate["record_id"], "source": evidence, "run_id": run_id,
                        "record_id": None, "artifacts": {}, "error": "Existing synonym; no new row created", "updated_at": now()}
                    run["counts"]["duplicates"] += 1
                    continue
                if key in by_key:
                    row = by_key[key]
                    prior = state["items"].get(key, {})
                    state["items"][key] = {**prior, "name": topic["name"], "discipline": source["discipline"],
                        "course": source["course"], "record_id": row["record_id"], "source": evidence,
                        "status": prior.get("status", "待审核"), "error": prior.get("error", ""), "updated_at": now()}
                    run["counts"]["duplicates"] += 1
                    continue
                course_key = (source["discipline"], source["course"])
                if (run["counts"]["created"] >= candidate_limit
                        or created_by_course[course_key] >= remaining_by_course[course_key]):
                    capacity_exhausted = True
                    continue
                fields = {"Name": topic["name"], "Discipline": source["discipline"], "Course": source["course"],
                          "Pipeline Status": "待审核", "Review Decision": "待审核", "Source URL": evidence["url"],
                          "Source Fetched At": fetched_at, "Candidate Reason": topic["reason"],
                          "Agent Key": key, "Agent Run ID": run_id}
                created = api(table_path("records"), token, {"fields": fields})["data"]["record"]
                record_id = created["record_id"]
                verified = api(table_path(f"records/{record_id}"), token)["data"]["record"]["fields"]
                if verified.get("Agent Key") != key or verified.get("Pipeline Status") != "待审核":
                    raise RuntimeError(f"candidate write verification failed: {record_id}")
                state["items"][key] = {"name": topic["name"], "discipline": source["discipline"], "course": source["course"],
                    "status": "待审核", "record_id": record_id, "source": evidence, "run_id": run_id,
                    "artifacts": {}, "error": error, "updated_at": now()}
                by_key[key] = {"record_id": record_id, "fields": verified}
                name_index[(source["discipline"], source["course"], normalize(topic["name"]))].append(by_key[key])
                run["counts"]["created"] += 1
                created_by_course[course_key] += 1
                atomic_json(STATE_FILE, state)
            if not capacity_exhausted:
                state["sources"][source["id"]] = {"fingerprint": fingerprint, "fetched_at": fetched_at,
                                                     "url": source["url"], "anchors": len(matches), "links": observed_links}
            atomic_json(STATE_FILE, state)
        except Exception as exc:
            run["counts"]["failed"] += 1
            run["errors"].append(f"{source['id']}: {exc}")
    pool_path = STORE / "runs" / f"{run_id}.course-pools.json"
    atomic_json(pool_path, course_pools)
    feed_changes, feed_skipped, feed_errors = scan_feeds(load_json(FEEDS_CONFIG, {}), state, selected_courses)
    run["feed_changes"] = feed_changes
    run["feed_skipped"] = feed_skipped
    run["counts"]["feed_signals"] = len(feed_changes)
    run["counts"]["selected_courses"] = len(course_plan)
    run["counts"]["syllabus_links"] = sum(len(pool["links"]) for pool in course_pools)
    run["counts"]["feed_errors"] = len(feed_errors)
    run["errors"].extend(feed_errors)
    run["counts"]["failed"] += len(feed_errors)
    feed_path = STORE / "runs" / f"{run_id}.feed-changes.json"
    atomic_json(feed_path, feed_changes)
    atomic_json(STATE_FILE, state)
    # Approval is explicit in Feishu; neither source confidence nor an old artifact auto-approves a candidate.
    records = all_records(token)
    by_id = {row["record_id"]: record_fields(row) for row in records}
    ready = defaultdict(list)
    for key, item in state["items"].items():
        if item["status"] == "已发布" or not item.get("record_id"):
            continue
        fields = by_id.get(item["record_id"], {})
        if fields.get("Review Decision") == "批准制作" and item["status"] == "待审核" and not item.get("error"):
            api(table_path(f"records/{item['record_id']}"), token,
                {"fields": {"Pipeline Status": "待制作"}}, method="PUT")
            item["status"] = "待制作"
            item["approved_at"] = now()
            item["updated_at"] = now()
        if fields.get("Review Decision") == "批准制作" and item["status"] in ("待制作", "制作中", "失败", "待发布"):
            ready[(item["discipline"], item["course"])].append((key, item))
    work_orders = select_work_orders(ready, config, run["counts"])
    order_path = STORE / "runs" / f"{run_id}.work-orders.json"
    atomic_json(order_path, work_orders)
    changes_path = STORE / "runs" / f"{run_id}.source-changes.json"
    atomic_json(changes_path, run.get("source_changes", []))
    run["counts"]["producing"] = sum(item["status"] == "制作中" for item in state["items"].values())
    run["counts"]["ready_to_publish"] = sum(item["status"] == "待发布" for item in state["items"].values())
    run["counts"]["reviewed"] = run["counts"]["ready_to_publish"]
    run["counts"]["published"] = 0
    run["counts"] = dict(run["counts"])
    for name in ("discovered", "duplicates", "created", "queued", "deferred_for_batch", "producing", "produced", "ready_to_publish", "reviewed", "published", "failed"):
        run["counts"].setdefault(name, 0)
    state["runs"].append({"id": run_id, "started_at": run["started_at"], "counts": run["counts"],
                          "work_orders": str(order_path), "source_changes": str(changes_path),
                          "course_plan": str(plan_path), "course_pools": str(pool_path), "feed_changes": str(feed_path)})
    atomic_json(STATE_FILE, state)
    report = write_report(run, state)
    print(json.dumps({"run_id": run_id, "counts": run["counts"], "report": str(report), "work_orders": str(order_path),
                      "source_changes": str(changes_path), "course_plan": str(plan_path),
                      "course_pools": str(pool_path), "feed_changes": str(feed_path),
                      "feed_skipped": feed_skipped, "errors": run["errors"]}, ensure_ascii=False))
    return 1 if run["errors"] else 0


def checkpoint(args) -> int:
    state = load_json(STATE_FILE, {})
    item = state.get("items", {}).get(args.key)
    if not item:
        raise RuntimeError(f"unknown item key: {args.key}")
    allowed = {"已发现", "待审核", "待制作", "制作中", "待发布", "已发布", "失败"}
    if args.status not in allowed:
        raise RuntimeError(f"invalid status: {args.status}")
    if item["status"] == "已发布" and args.status != "已发布" and not args.artifacts:
        raise RuntimeError("Revision requires an explicit new-version artifact record")
    previous_status = item["status"]
    if args.status == "待发布" and not args.review_passed:
        raise RuntimeError("待发布 requires --review-passed after the full video and cover gates")
    if args.status == "已发布" and not (args.github_url and args.record_id):
        raise RuntimeError("已发布 requires --github-url and --record-id")
    if args.artifacts:
        artifacts = load_json(Path(args.artifacts), None)
        if not isinstance(artifacts, dict):
            raise RuntimeError("artifacts file must be a JSON object")
        item["artifacts"].update(artifacts)
    if args.github_url:
        item["artifacts"]["github_url"] = args.github_url
    if args.record_id and args.record_id != item.get("record_id"):
        raise RuntimeError("record_id does not match verified candidate")
    if args.status == "制作中":
        from reserve_identity import reserve
        item["stable_id"] = reserve(args.key)
        final_path = item.get("artifacts", {}).get("final_record")
        draft = load_json(Path(final_path), {}) if final_path else {}
        if draft.get("id") != item["stable_id"] or not draft.get("terminology", {}).get("confirmed") or not draft.get("standard_name"):
            raise RuntimeError("Before storyboarding, provide the reserved ID and confirmed standard term in the draft final_record")
    if args.status == "待发布":
        sys.path.insert(0, str(Path(__file__).resolve().parents[2] / "scripts"))
        from final_record import validate
        final_path = item.get("artifacts", {}).get("final_record")
        if not final_path:
            raise RuntimeError("Reviewed final_record JSON is required; a boolean flag is not an audit")
        final = load_json(Path(final_path), {})
        validate(final, Path(os.environ.get("LEADDE_REPO", Path(__file__).resolve().parents[2])))
        if final.get("feishu_record_id") != item.get("record_id"):
            raise RuntimeError("Final artifact / Feishu identity mismatch")
        item["stable_id"] = final["id"]
    item["status"] = args.status
    item["error"] = args.error or ""
    item["updated_at"] = now()
    atomic_json(STATE_FILE, state)
    if args.status != "已发布" and os.environ.get("FEISHU_APP_ID") and os.environ.get("FEISHU_APP_SECRET"):
        try:
            token = tenant_token()
            api(table_path(f"records/{item['record_id']}"), token,
                {"fields": {"Pipeline Status": args.status}}, method="PUT")
            fields = api(table_path(f"records/{item['record_id']}"), token)["data"]["record"]["fields"]
            if fields.get("Pipeline Status") != args.status:
                raise RuntimeError("Feishu Pipeline Status readback mismatch")
        except Exception as error:
            item["error"] = f"Feishu status sync failed: {error}"
            atomic_json(STATE_FILE, state)
            raise
    if args.status == "待发布" and previous_status != "待发布":
        event_id = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ") + "-review"
        counts = {name: 0 for name in ("discovered", "duplicates", "created", "queued", "producing", "produced", "reviewed", "published", "failed")}
        counts["produced"] = counts["reviewed"] = 1
        event = {"id": event_id, "started_at": now(), "counts": counts, "item_keys": [args.key], "errors": []}
        report = write_report(event, state)
        state["runs"].append({"id": event_id, "started_at": event["started_at"], "counts": counts,
                              "report": str(report)})
        atomic_json(STATE_FILE, state)
    print(json.dumps({"key": args.key, "status": args.status, "record_id": item.get("record_id")}, ensure_ascii=False))
    return 0


def nominate(args) -> int:
    """Create a pending Feishu candidate from a real, saved feed signal after term review."""
    evidence = None
    for path in sorted((STORE / "runs").glob("*.feed-changes.json"), reverse=True):
        evidence = next((row for row in load_json(path, []) if row["evidence_id"] == args.evidence_id), None)
        if evidence:
            break
    if not evidence:
        raise RuntimeError("evidence ID not found in recorded feed changes")
    discipline, course = evidence["discipline_hint"], evidence["course_hint"]
    key = canonical_key(discipline, course, args.name)
    state = load_json(STATE_FILE, {"version": 1, "sources": {}, "items": {}, "runs": []})
    latest_plan_path = next((row["course_plan"] for row in reversed(state.get("runs", []))
                             if row.get("course_plan")), None)
    current_plan = load_json(Path(latest_plan_path), []) if latest_plan_path else []
    if (discipline, course) not in {(row["discipline"], row["course"]) for row in current_plan}:
        raise RuntimeError("evidence is outside the current course-first selection")
    token = tenant_token()
    ensure_fields(token)
    records = all_records(token)
    names = {normalize(value) for value in [args.name, *args.alias]}
    duplicate = next((row for row in records if record_fields(row).get("Discipline") == discipline
                      and record_fields(row).get("Course") == course
                      and normalize(str(record_fields(row).get("Name", ""))) in names), None)
    if duplicate or key in state["items"]:
        print(json.dumps({"status": "duplicate", "record_id": duplicate["record_id"] if duplicate else state["items"][key].get("record_id"),
                          "key": key}, ensure_ascii=False))
        return 0
    if (discipline, course) not in {(record_fields(row).get("Discipline"), record_fields(row).get("Course")) for row in records}:
        raise RuntimeError("course is not in Feishu; human course mapping required")
    backlog = sum(record_fields(row).get("Discipline") == discipline
                  and record_fields(row).get("Course") == course
                  and record_fields(row).get("Pipeline Status") in ("待审核", "待制作", "制作中", "待发布", "失败")
                  for row in records)
    if backlog >= load_json(CONFIG, {}).get("target_course_candidate_pool", 8):
        raise RuntimeError("course candidate pool is full; process its existing backlog first")
    if not args.term_source_url.startswith("https://"):
        raise RuntimeError("--term-source-url must be an HTTPS page independently confirming the term")
    fetched_at = now()
    reason = f"{args.reason} | Term checked: {args.term_source_url} | Signal: {evidence['url']}"
    fields = {"Name": args.name, "Discipline": discipline, "Course": course,
              "Pipeline Status": "待审核", "Review Decision": "待审核", "Source URL": evidence["url"],
              "Source Fetched At": evidence["fetched_at"], "Candidate Reason": reason,
              "Agent Key": key, "Agent Run ID": args.evidence_id}
    record = api(table_path("records"), token, {"fields": fields})["data"]["record"]
    record_id = record["record_id"]
    verified = api(table_path(f"records/{record_id}"), token)["data"]["record"]["fields"]
    if verified.get("Agent Key") != key or verified.get("Pipeline Status") != "待审核":
        raise RuntimeError(f"candidate write verification failed: {record_id}")
    state["items"][key] = {"name": args.name, "discipline": discipline, "course": course,
                           "status": "待审核", "record_id": record_id,
                           "source": {"source_id": evidence["feed_id"], "url": evidence["url"],
                                      "fetched_at": evidence["fetched_at"], "term_source_url": args.term_source_url,
                                      "reason": args.reason, "evidence_id": args.evidence_id,
                                      "aliases": args.alias},
                           "run_id": args.evidence_id, "artifacts": {}, "error": "", "updated_at": fetched_at}
    atomic_json(STATE_FILE, state)
    print(json.dumps({"status": "待审核", "key": key, "record_id": record_id}, ensure_ascii=False))
    return 0


def summary_report() -> Path:
    state = load_json(STATE_FILE, {"items": {}, "runs": []})
    path = STORE / "latest-summary.md"
    counts = Counter(item["status"] for item in state["items"].values())
    lines = ["# 增量动画总览", "", f"更新时间：{now()}", "",
             "状态：" + "，".join(f"{name} {count}" for name, count in sorted(counts.items())), "",
             "| 知识点 | 学科 / 课程 | 状态 | 飞书记录 | 来源 | 视频 | GitHub | 错误 |",
             "|---|---|---|---|---|---|---|---|"]
    for item in sorted(state["items"].values(), key=lambda row: (row["discipline"], row["course"], row["name"])):
        source = item.get("source") or {}
        artifacts = item.get("artifacts") or {}
        origin = f"[查看来源]({source['url']})" if source.get("url") else "历史已发布"
        video = f"[本地视频](<{artifacts['video']}>)" if artifacts.get("video") else "—"
        github = f"[已发布]({artifacts['github_url']})" if artifacts.get("github_url") else "—"
        lines.append(f"| {item['name']} | {item['discipline']} / {item['course']} | {item['status']} | {item.get('record_id') or '—'} | {origin} | {video} | {github} | {item.get('error') or '—'} |")
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    return path


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest="command", required=True)
    sub.add_parser("run", help="Discover changed source items, deduplicate, create candidates, and queue approvals")
    sub.add_parser("status", help="Show state counts and latest report")
    sub.add_parser("report", help="Write a full, per-record state summary")
    mark = sub.add_parser("checkpoint", help="Persist a topic's workflow stage after a verified step")
    mark.add_argument("key")
    mark.add_argument("status")
    mark.add_argument("--artifacts")
    mark.add_argument("--error")
    mark.add_argument("--review-passed", action="store_true")
    mark.add_argument("--github-url")
    mark.add_argument("--record-id")
    nomination = sub.add_parser("nominate", help="Propose one verified feed signal as a pending Feishu candidate")
    nomination.add_argument("evidence_id")
    nomination.add_argument("name")
    nomination.add_argument("--alias", action="append", default=[])
    nomination.add_argument("--reason", required=True)
    nomination.add_argument("--term-source-url", required=True)
    args = parser.parse_args()
    if args.command == "run":
        STORE.mkdir(parents=True, exist_ok=True)
        with (STORE / "run.lock").open("w") as lock:
            try:
                fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
            except BlockingIOError:
                print("An incremental run is already active; this invocation did not change state")
                return 0
            return run_discovery()
    if args.command == "checkpoint":
        return checkpoint(args)
    if args.command == "nominate":
        return nominate(args)
    if args.command == "report":
        print(summary_report())
        return 0
    state = load_json(STATE_FILE, {"items": {}, "runs": []})
    counts = Counter(item["status"] for item in state["items"].values())
    latest = state["runs"][-1] if state["runs"] else None
    print(json.dumps({"counts": counts, "latest_run": latest}, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception as error:
        print(f"ERROR: {error}", file=sys.stderr)
        sys.exit(2)
