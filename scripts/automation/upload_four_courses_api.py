#!/usr/bin/env python3
"""Idempotently fill title, prompt, cover, and video for the four-course batch."""

import json
import mimetypes
import os
import pathlib
import sys
import time
import urllib.error
import urllib.request


ROOT = pathlib.Path("/Users/zhoutianshuo/Desktop/leadde motion")
MANIFEST = pathlib.Path(os.environ.get(
    "COVER_MANIFEST", ROOT / ".workbuddy/four-course-manifest.json"
))
APP_TOKEN = "SamybNgi6aRHH1sVVhEcTxNVnse"
TABLE_ID = "tblmQdRJPaZlMKL2"
BASE_URL = "https://open.feishu.cn/open-apis"


def json_request(url, token=None, data=None, method=None, attempts=4):
    headers = {}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    body = None
    if data is not None:
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        headers["Content-Type"] = "application/json; charset=utf-8"
    for attempt in range(attempts):
        try:
            req = urllib.request.Request(
                url, data=body, headers=headers, method=method or ("POST" if body else "GET")
            )
            with urllib.request.urlopen(req, timeout=60) as response:
                result = json.loads(response.read())
            if result.get("code", 0) != 0:
                raise RuntimeError(f"API {result.get('code')}: {result.get('msg')}")
            return result
        except (urllib.error.URLError, TimeoutError, RuntimeError) as exc:
            if attempt + 1 == attempts:
                raise
            print(f"retry json API ({attempt + 1}/{attempts}): {exc}", flush=True)
            time.sleep(2 + attempt * 2)


def tenant_token():
    app_id = os.environ.get("FEISHU_APP_ID")
    app_secret = os.environ.get("FEISHU_APP_SECRET")
    if not app_id or not app_secret:
        raise SystemExit("Set FEISHU_APP_ID and FEISHU_APP_SECRET")
    result = json_request(
        f"{BASE_URL}/auth/v3/tenant_access_token/internal",
        data={"app_id": app_id, "app_secret": app_secret},
    )
    return result["tenant_access_token"]


def multipart(fields, file_field, file_path):
    boundary = "----CodexFeishuBoundary"
    chunks = []
    for name, value in fields.items():
        chunks.extend([
            f"--{boundary}\r\n".encode(),
            f'Content-Disposition: form-data; name="{name}"\r\n\r\n'.encode(),
            str(value).encode(),
            b"\r\n",
        ])
    path = pathlib.Path(file_path)
    mime = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
    chunks.extend([
        f"--{boundary}\r\n".encode(),
        f'Content-Disposition: form-data; name="{file_field}"; filename="{path.name}"\r\n'.encode(),
        f"Content-Type: {mime}\r\n\r\n".encode(),
        path.read_bytes(),
        b"\r\n",
        f"--{boundary}--\r\n".encode(),
    ])
    return boundary, b"".join(chunks)


def upload(token, file_path, parent_type, attempts=4):
    path = pathlib.Path(file_path)
    fields = {
        "file_name": path.name,
        "parent_type": parent_type,
        "parent_node": APP_TOKEN,
        "size": path.stat().st_size,
    }
    boundary, body = multipart(fields, "file", path)
    for attempt in range(attempts):
        try:
            req = urllib.request.Request(
                f"{BASE_URL}/drive/v1/medias/upload_all",
                data=body,
                headers={
                    "Authorization": f"Bearer {token}",
                    "Content-Type": f"multipart/form-data; boundary={boundary}",
                },
                method="POST",
            )
            with urllib.request.urlopen(req, timeout=120) as response:
                result = json.loads(response.read())
            if result.get("code", 0) != 0:
                raise RuntimeError(f"upload {result.get('code')}: {result.get('msg')}")
            data = result.get("data", {})
            file_token = data.get("file_token") or data.get("media_token")
            if not file_token:
                raise RuntimeError(f"upload returned no file token: {list(data)}")
            return file_token
        except (urllib.error.URLError, TimeoutError, RuntimeError) as exc:
            if attempt + 1 == attempts:
                raise
            print(f"retry upload {path.name} ({attempt + 1}/{attempts}): {exc}", flush=True)
            time.sleep(3 + attempt * 3)


def record_url(record_id):
    return (
        f"{BASE_URL}/bitable/v1/apps/{APP_TOKEN}/tables/{TABLE_ID}/records/{record_id}"
    )


def get_fields(token, record_id):
    result = json_request(record_url(record_id), token=token)
    return result["data"]["record"]["fields"]


def is_filled(fields, name):
    value = fields.get(name)
    return value not in (None, "", [])


def process_row(token, row, index, total):
    """Compatibility route; legacy fill-empty manifests cannot publish a new version."""
    final_path = row.get("final_record")
    if not final_path:
        raise RuntimeError("Provide final_record JSON with stable ID, artifact version and review evidence; legacy fill-empty publishing is retired")
    repo = pathlib.Path(os.environ.get("LEADDE_REPO", ROOT / ".publish" / "workflow-upgrade"))
    sys.path.insert(0, str(repo / "scripts/automation"))
    sys.path.insert(0, str(repo / "scripts"))
    from final_record import validate
    from publish_ready import feishu_step
    final = json.loads(pathlib.Path(final_path).read_text())
    if final.get("feishu_record_id") != row["record_id"]:
        raise RuntimeError("Stable Feishu identity mismatch")
    validate(final, repo)
    def save():
        pathlib.Path(final_path).write_text(json.dumps(final, ensure_ascii=False, indent=2) + "\n")
    feishu_step(final, save)
    print(f"[{index}/{total}] final version verified: {final['id']} {final['artifact_version']}")


def main():
    rows = json.loads(MANIFEST.read_text(encoding="utf-8"))
    token = tenant_token()
    failures = []
    for index, row in enumerate(rows, 1):
        try:
            process_row(token, row, index, len(rows))
        except Exception as exc:
            failures.append((row["record_id"], row["slug"], str(exc)))
            print(f"[{index:02d}/{len(rows)}] FAIL {row['slug']}: {exc}", flush=True)
    print(json.dumps({"total": len(rows), "failed": failures}, ensure_ascii=False))
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
