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
    milestone = f'{videos // 100 * 100}+' if videos >= 100 else str(videos)
    banner = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="460" viewBox="0 0 1280 460" role="img" aria-labelledby="title description">
<title id="title">{milestone} educational videos · {subjects} disciplines · Continuously updated</title>
<desc id="description">A growing collection of {videos} available videos across {courses} courses. Explore animations and reusable prompts from Leadde. Latest catalog update: {date}.</desc>
<defs>
  <linearGradient id="background" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#201342"/><stop offset=".55" stop-color="#4725a8"/><stop offset="1" stop-color="#6e4dfc"/></linearGradient>
  <radialGradient id="glow"><stop stop-color="#ad94ff" stop-opacity=".32"/><stop offset="1" stop-color="#ad94ff" stop-opacity="0"/></radialGradient>
  <clipPath id="bounds"><rect width="1280" height="460" rx="24"/></clipPath>
</defs>
<g clip-path="url(#bounds)">
<rect width="1280" height="460" fill="url(#background)"/>
<ellipse cx="1030" cy="75" rx="470" ry="330" fill="url(#glow)"/>
<g fill="none" stroke="#b8a1ff" stroke-opacity=".12"><circle cx="1200" cy="232" r="230"/><circle cx="1200" cy="232" r="290"/><circle cx="1200" cy="232" r="350"/></g>
<g font-family="Arial,Helvetica,sans-serif">
  <text x="52" y="54" fill="#fff" font-size="22" font-weight="700">Leadde</text>
  <path d="M145 37v20" stroke="#ffffff" stroke-opacity=".35"/>
  <text x="165" y="52" fill="#cfc0ff" font-size="13" font-weight="700" letter-spacing="2">KNOWLEDGE IN MOTION</text>
  <rect x="996" y="28" width="232" height="39" rx="19.5" fill="#ffffff" fill-opacity=".09" stroke="#ffffff" stroke-opacity=".22"/>
  <circle cx="1017" cy="47.5" r="4" fill="#b4ffdb"/>
  <text x="1031" y="52" fill="#fff" font-size="12" font-weight="700" letter-spacing="1">CONTINUOUSLY UPDATED</text>
  <text x="44" y="249" fill="#fff" font-size="176" font-weight="800" letter-spacing="-9">{milestone}</text>
  <text x="54" y="294" fill="#fff" font-size="28" font-weight="700" letter-spacing="2">EDUCATIONAL VIDEOS</text>
  <text x="54" y="329" fill="#cfc0ff" font-size="18">Watch the concept. Reuse the prompt.</text>
  <path d="M506 123v213" stroke="#ffffff" stroke-opacity=".19"/>
  <text x="554" y="166" fill="#fff" font-size="44" font-weight="700" letter-spacing="-1.3">Across disciplines.</text>
  <text x="554" y="222" fill="#cebdff" font-size="44" font-weight="700" letter-spacing="-1.3">Always growing.</text>
  <text x="557" y="266" fill="#ded4ff" font-size="17">Computer Science · AI · Math · Science &amp; more</text>
  <text x="556" y="320" fill="#fff" font-size="28" font-weight="700">{subjects}<tspan font-size="19" font-weight="400" fill="#e0d5ff"> disciplines</tspan></text>
  <path d="M727 298v27" stroke="#ffffff" stroke-opacity=".25"/>
  <text x="753" y="320" fill="#fff" font-size="28" font-weight="700">{courses}<tspan font-size="19" font-weight="400" fill="#e0d5ff"> courses</tspan></text>
  <path d="M52 367h1176" stroke="#ffffff" stroke-opacity=".17"/>
  <circle cx="59" cy="412" r="4" fill="#b4ffdb"/>
  <text x="75" y="418" fill="#d8cbff" font-size="16">Latest catalog update · {date}</text>
  <rect x="915" y="386" width="313" height="52" rx="10" fill="#fff"/>
  <text x="947" y="419" fill="#593bd8" font-size="19" font-weight="700">Explore the collection</text>
  <path d="M1184 412h16m-6-6 6 6-6 6" fill="none" stroke="#593bd8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
</g>
</svg>'''
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
