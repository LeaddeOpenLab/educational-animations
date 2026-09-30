"""Fetch bounded external demand/research signals; never approve or publish them."""

from __future__ import annotations

import html
import json
import os
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone

USER_AGENT = "LeaddeKnowledgeDiscovery/0.2 (+https://github.com/LeaddeOpenLab/leadde-knowledge-in-motion)"


def _get(url: str, token: str | None = None) -> bytes:
    headers = {"User-Agent": USER_AGENT, "Accept": "application/json, application/atom+xml"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    request = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(request, timeout=30) as response:
        return response.read(2_000_001)


def _url(base: str, params: dict) -> str:
    return base + "?" + urllib.parse.urlencode(params)


def fetch_feed(feed: dict, limit: int) -> list[dict]:
    kind = feed["type"]
    if kind == "stackexchange":
        url = _url("https://api.stackexchange.com/2.3/questions", {
            "site": feed["site"], "tagged": feed["tag"], "sort": "creation",
            "order": "desc", "pagesize": limit})
        data = json.loads(_get(url))
        return [{"id": str(row["question_id"]), "title": html.unescape(row["title"]),
                 "url": row["link"], "updated_at": row.get("last_activity_date"),
                 "published_at": row.get("creation_date"), "tags": row.get("tags", []),
                 "score": row.get("score", 0), "answers": row.get("answer_count", 0)}
                for row in data["items"]]
    if kind == "github_issues":
        url = _url("https://api.github.com/search/issues", {
            "q": f"repo:{feed['repo']} is:issue", "sort": "updated", "order": "desc", "per_page": limit})
        data = json.loads(_get(url, os.environ.get("GITHUB_TOKEN")))
        if data.get("incomplete_results"):
            raise RuntimeError("GitHub returned incomplete_results")
        return [{"id": str(row["id"]), "title": row["title"], "url": row["html_url"],
                 "updated_at": row["updated_at"], "published_at": row["created_at"],
                 "state": row["state"], "comments": row.get("comments", 0),
                 "labels": [label["name"] for label in row.get("labels", [])]}
                for row in data["items"]]
    if kind == "arxiv":
        url = _url("https://export.arxiv.org/api/query", {
            "search_query": f"cat:{feed['category']}", "sortBy": "lastUpdatedDate",
            "sortOrder": "descending", "max_results": limit})
        root = ET.fromstring(_get(url))
        ns = {"a": "http://www.w3.org/2005/Atom"}
        results = []
        for entry in root.findall("a:entry", ns):
            link = (entry.findtext("a:id", default="", namespaces=ns) or "").strip()
            results.append({"id": link.rsplit("/", 1)[-1],
                            "title": " ".join(entry.findtext("a:title", default="", namespaces=ns).split()),
                            "url": link, "updated_at": entry.findtext("a:updated", namespaces=ns),
                            "published_at": entry.findtext("a:published", namespaces=ns),
                            "summary": " ".join(entry.findtext("a:summary", default="", namespaces=ns).split())[:500]})
        return results
    if kind == "openalex":
        key = os.environ[feed["requires_env"]]
        url = _url("https://api.openalex.org/works", {
            "search": feed["query"], "sort": "publication_date:desc", "per_page": limit, "api_key": key})
        data = json.loads(_get(url))
        return [{"id": row["id"].rsplit("/", 1)[-1], "title": row.get("display_name", ""),
                 "url": row.get("doi") or row["id"], "updated_at": row.get("updated_date"),
                 "published_at": row.get("publication_date"), "cited_by_count": row.get("cited_by_count", 0)}
                for row in data["results"]]
    raise ValueError(f"unsupported feed type: {kind}")


def scan(config: dict, state: dict, selected_courses: set[tuple[str, str]] | None = None) -> tuple[list[dict], list[str], list[str]]:
    """Compare bounded recent items by stable ID and update time; return changed evidence."""
    seen = state.setdefault("feed_seen", {})
    changed, skipped, errors = [], [], []
    fetched_at = datetime.now(timezone.utc).isoformat(timespec="seconds")
    for feed in config.get("feeds", []):
        if selected_courses is not None and (feed["discipline"], feed["course"]) not in selected_courses:
            continue
        required = feed.get("requires_env")
        if required and not os.environ.get(required):
            skipped.append(f"{feed['id']}: missing {required}")
            continue
        try:
            items = fetch_feed(feed, config.get("max_items_per_feed", 10))
            previous = seen.setdefault(feed["id"], {})
            for item in items:
                stamp = f"{item.get('updated_at') or item.get('published_at')}|{feed['discipline']}|{feed['course']}"
                if previous.get(item["id"]) != stamp:
                    changed.append({"evidence_id": f"{feed['id']}:{item['id']}", "feed_id": feed["id"],
                                    "feed_type": feed["type"], "discipline_hint": feed["discipline"],
                                    "course_hint": feed["course"], "fetched_at": fetched_at, **item})
                previous[item["id"]] = stamp
        except Exception as exc:
            errors.append(f"{feed['id']}: {type(exc).__name__}: {exc}")
    return changed, skipped, errors
