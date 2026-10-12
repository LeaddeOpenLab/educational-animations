#!/usr/bin/env python3
"""Build a small GitHub Pages site; stream videos from the existing repository."""
import html
import json
import shutil
import subprocess
from pathlib import Path
from urllib.parse import quote

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / '_site'
REPO = 'https://github.com/LeaddeOpenLab/educational-animations'
SITE = 'https://LeaddeOpenLab.github.io/educational-animations/'
RAW = 'https://raw.githubusercontent.com/LeaddeOpenLab/educational-animations/main/'
FEATURED = ['C01-A014', 'C03-A009', 'recvw24T2zGQI9', 'C02-A001', 'C05-A014', 'C29-A001']

def git(*args):
    return subprocess.check_output(['git', '-C', str(ROOT), *args], text=True).strip()

def asset(path):
    return path if path.startswith(('https://', 'http://')) else RAW + quote(path, safe='/')

def write_banner(items):
    videos = sum(x.get('status') == 'ready' and bool(x.get('video')) for x in items)
    courses = len({(x['subject'], x['course']) for x in items})
    subjects = len({x['subject'] for x in items})
    date = git('log', '-1', '--format=%cs', '--', 'data/prompts.json')
    banner = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="300" viewBox="0 0 1200 300" role="img" aria-label="{videos} available educational videos. Explore the Leadde collection.">
<rect width="1200" height="300" rx="22" fill="#f1edff"/><g font-family="Arial,Helvetica,sans-serif">
<text x="54" y="55" fill="#6e4dfc" font-size="16" font-weight="700" letter-spacing="2">LEADDE · KNOWLEDGE IN MOTION</text>
<text x="50" y="152" fill="#1e2026" font-size="76" font-weight="700">{videos}</text><text x="225" y="149" fill="#1e2026" font-size="32">videos. Big ideas, made visible.</text>
<text x="55" y="199" fill="#737581" font-size="20">{len(items)} cataloged concepts · {courses} courses · {subjects} disciplines</text>
<text x="55" y="252" fill="#737581" font-size="16">Latest catalog activity: {date} · Includes prompts awaiting video production</text>
<rect x="847" y="213" width="300" height="50" rx="9" fill="#6e4dfc"/><text x="880" y="245" fill="white" font-size="19" font-weight="700">Explore the collection →</text>
</g></svg>'''
    (ROOT / 'assets/site/library-banner.svg').write_text(banner)

def build():
    items = json.loads((ROOT / 'data/prompts.json').read_text())
    write_banner(items)
    paths = set(git('ls-tree', '-r', '--name-only', 'HEAD').splitlines())
    ready = [x for x in items if x.get('status') == 'ready' and x.get('video')]
    courses = len({(x['subject'], x['course']) for x in items})
    subjects = len({x['subject'] for x in items})
    fields = ['id', 'title', 'standard_name', 'subject', 'course', 'course_code', 'tags', 'aliases',
              'status', 'prompt', 'learning_objective', 'core_conclusion', 'artifact_version',
              'production', 'review', 'reuse', 'media', 'page', 'references', 'player']
    output = []
    for item in items:
        entry = {key: item[key] for key in fields if key in item}
        if item.get('video'):
            entry['video'] = asset(item['video'])
        cover = item.get('cover')
        preview = f"assets/previews/{item['id'].lower()}-{item.get('artifact_version', 'v1')}.gif"
        course_cover = f"assets/course-covers/{item.get('course_code') or item.get('tags', ['', ''])[1]}.jpg"
        if item['id'] == 'C01-A014' and preview in paths:
            cover = preview
        if cover and (cover.startswith('https://') or cover in paths):
            entry['cover'] = asset(cover)
            entry['cover_kind'] = 'concept'
        elif preview in paths:
            entry['cover'] = asset(preview)
            entry['cover_kind'] = 'concept'
        elif course_cover.lower() in paths:
            entry['cover'] = asset(course_cover.lower())
            entry['cover_kind'] = 'course'
        output.append(entry)
    updates = []
    log = git('log', '-3', '--format=%cs%x09%s%x09%H', '--', 'data/prompts.json')
    for line in log.splitlines():
        date, message, commit = line.split('\t', 2)
        updates.append({'date': date, 'message': message, 'url': f'{REPO}/commit/{commit}'})
    if OUT.exists():
        shutil.rmtree(OUT)
    (OUT / 'assets/site').mkdir(parents=True)
    (OUT / 'data').mkdir()
    shutil.copytree(ROOT / 'assets/site', OUT / 'assets/site', dirs_exist_ok=True)
    releases = json.loads((ROOT / 'data/releases.json').read_text())
    catalog = {'items': output, 'featured': FEATURED, 'releases': releases}
    (OUT / 'data/site-catalog.json').write_text(json.dumps(catalog, ensure_ascii=False, separators=(',', ':')))
    stats = [(len(ready), 'videos to explore'), (len(items), 'cataloged concepts'), (courses, 'courses'), (subjects, 'disciplines')]
    stats_html = ''.join(f'<div class="stat"><strong>{number}</strong><span>{label}</span></div>' for number, label in stats)
    updates_html = ''.join(f'<article class="update"><time datetime="{x["date"]}">{x["date"]}</time><a href="{x["url"]}" target="_blank" rel="noopener">{html.escape(x["message"])} ↗</a></article>' for x in updates)
    page = (ROOT / 'index.html').read_text().replace('<!-- STATS -->', stats_html).replace('<!-- UPDATES -->', updates_html)
    (OUT / 'index.html').write_text(page)
    (OUT / '.nojekyll').touch()
    (OUT / 'robots.txt').write_text(f'User-agent: *\nAllow: /\nSitemap: {SITE}sitemap.xml\n')
    (OUT / 'sitemap.xml').write_text(f'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>{SITE}</loc></url></urlset>')
    print(f'Built {OUT}: {len(ready)} videos, {len(items)} concepts, {courses} courses, {subjects} disciplines')

if __name__ == '__main__':
    build()
