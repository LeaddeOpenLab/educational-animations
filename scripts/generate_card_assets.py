#!/usr/bin/env python3
"""Create repository-owned SVG art for the GitHub README card navigation."""
import html
import json
import re
from collections import OrderedDict
from pathlib import Path
from render_subject_cards import SUBJECTS

ROOT = Path(__file__).resolve().parents[1]
ITEMS = json.loads((ROOT / "data/prompts.json").read_text(encoding="utf-8"))
ICON_DIR = ROOT / "assets" / "subject-icons"
COVER_DIR = ROOT / "assets" / "course-covers"
ICON_DIR.mkdir(parents=True, exist_ok=True)
COVER_DIR.mkdir(parents=True, exist_ok=True)

def slug(value):
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")

def svg(content, width, height):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" fill="none">{content}</svg>\n'''

STYLE = 'stroke="#24292f" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"'
ICONS = {
    "Computer Science": '<rect x="16" y="21" width="64" height="43" rx="4" ' + STYLE + '/><path d="M39 82h18M48 64v18" ' + STYLE + '/>',
    "Artificial Intelligence": '<path d="M48 11 55 34 78 41 55 48 48 71 41 48 18 41 41 34Z" ' + STYLE + '/><circle cx="48" cy="41" r="4" fill="#24292f"/>',
    "Mathematics": '<path d="M67 19H32l25 27-25 27h35" ' + STYLE + '/><path d="M19 28h18M19 58h18" ' + STYLE + '/>',
    "Mathematics & Statistics": '<path d="M17 68c13-39 49-39 62 0" ' + STYLE + '/><path d="M17 68h62M29 51v17M48 38v30M67 51v17" ' + STYLE + '/>',
    "Physics": '<circle cx="48" cy="46" r="7" fill="#24292f"/><ellipse cx="48" cy="46" rx="37" ry="16" ' + STYLE + '/><ellipse cx="48" cy="46" rx="37" ry="16" transform="rotate(60 48 46)" ' + STYLE + '/><ellipse cx="48" cy="46" rx="37" ry="16" transform="rotate(120 48 46)" ' + STYLE + '/>',
    "Chemistry": '<path d="M37 15h22M44 15v25L24 73a7 7 0 0 0 6 10h36a7 7 0 0 0 6-10L52 40V15" ' + STYLE + '/><path d="M31 64h34" ' + STYLE + '/>',
    "Life Sciences": '<path d="M20 73C21 36 43 17 77 17 76 51 57 73 20 73Z" ' + STYLE + '/><path d="M21 73c16-15 30-29 46-45" ' + STYLE + '/>',
    "Neuroscience": '<path d="M34 69c-18 1-23-24-7-32-3-18 22-24 29-10 15-9 32 10 18 24 7 16-12 31-26 20-4 7-12 7-14-2Z" ' + STYLE + '/><path d="M34 47h28M48 32v30" ' + STYLE + '/>',
    "Psychology": '<circle cx="48" cy="43" r="28" ' + STYLE + '/><path d="M48 25v36M30 43h36" ' + STYLE + '/><path d="M36 80h24" ' + STYLE + '/>',
    "Economics": '<path d="M18 72 42 49l14 12 23-34" ' + STYLE + '/><path d="M63 27h16v16" ' + STYLE + '/><path d="M18 80h62" ' + STYLE + '/>',
    "Finance": '<path d="M48 14 76 42 48 70 20 42Z" ' + STYLE + '/><path d="M48 28v28M39 36c3-6 15-6 18 0 3 7-18 6-18 14 3 6 15 6 18 0" ' + STYLE + '/>',
    "Political Science": '<path d="M24 76V24h48v52M16 76h64M35 35h26M35 47h26M35 59h26" ' + STYLE + '/>',
    "Philosophy": '<path d="M48 15c18 0 31 13 31 31S66 77 48 77 17 64 17 46 30 15 48 15Z" ' + STYLE + '/><path d="M48 15v62" ' + STYLE + '/>',
    "Literature": '<path d="M20 20c13-5 27-3 28 7v50c-1-10-15-12-28-7V20ZM76 20c-13-5-27-3-28 7v50c1-10 15-12 28-7V20Z" ' + STYLE + '/><path d="M48 27v50" ' + STYLE + '/>',
    "Astronomy": '<circle cx="48" cy="45" r="24" ' + STYLE + '/><path d="M48 10v11M48 69v11M13 45h11M72 45h11M22 19l8 8M66 63l8 8M74 19l-8 8M30 63l-8 8" ' + STYLE + '/>',
    "Embedded Systems": '<rect x="22" y="22" width="52" height="52" rx="7" ' + STYLE + '/><path d="M34 12v10M48 12v10M62 12v10M34 74v10M48 74v10M62 74v10M12 34h10M12 48h10M12 62h10M74 34h10M74 48h10M74 62h10" ' + STYLE + '/>',
    "Digital Electronics": '<path d="M12 62h16V32h20v30h20V32h16" ' + STYLE + '/><circle cx="28" cy="32" r="4" fill="#24292f"/><circle cx="48" cy="62" r="4" fill="#24292f"/><circle cx="68" cy="32" r="4" fill="#24292f"/>',
}

for subject, drawing in ICONS.items():
    (ICON_DIR / f"{slug(subject)}.svg").write_text(svg(f'<g {STYLE}>{drawing}</g>', 96, 96), encoding="utf-8")

library = OrderedDict()
for item in ITEMS:
    library.setdefault((item["subject"], item["course"]), item)

# Keep course cards tied to the same subject colors as the library navigation.
PALETTES = {title: accent for _, title, accent, _ in SUBJECTS}
# Centers of the existing subject glyphs, including their strokes. These are
# subject symbols, not a single knowledge-point figure reused across a course.
FIGURE_CENTERS = {
    "Computer Science": (48, 51.5), "Artificial Intelligence": (48, 41),
    "Mathematics": (43, 46), "Mathematics & Statistics": (48, 53),
    "Physics": (48, 46), "Chemistry": (48, 49),
    "Life Sciences": (48.5, 45), "Neuroscience": (48, 49),
    "Psychology": (48, 47.5), "Economics": (48.5, 53.5),
    "Finance": (48, 42), "Political Science": (48, 50),
    "Philosophy": (48, 46), "Literature": (48, 47),
    "Astronomy": (48, 45), "Embedded Systems": (48, 48),
    "Digital Electronics": (48, 47),
}
BRAND = (ROOT / "assets/leadde-icon.svg").read_text(encoding="utf-8")
BRAND = re.sub(r'<svg[^>]*>', '<svg x="1756" y="980" width="56" height="56" viewBox="0 0 120 120">', BRAND, count=1)

def title_lines(title, size):
    words, lines, current = title.split(), [], ""
    for word in words:
        candidate = f"{current} {word}".strip()
        # Conservative character widths keep long names inside the 1010px block.
        if current and len(candidate) * size * .60 > 970:
            lines.append(current)
            current = word
        else:
            current = candidate
    lines.append(current)
    return lines

for (subject, course), first in library.items():
    color = PALETTES[subject]
    size = 116 if len(course) <= 18 else 96 if len(course) <= 30 else 78 if len(course) <= 44 else 66
    lines = title_lines(course, size)
    line_height = size * 1.08
    block_height = 27 + 30 + len(lines) * line_height + 36 + 7 + 30 + 23
    top = (1080 - block_height) / 2
    title_top = top + 57
    rule_top = title_top + len(lines) * line_height + 36
    text = "".join(
        f'<text x="150" y="{title_top + size * .83 + line_index * line_height:.2f}" fill="#F4F7FF" font-size="{size}" font-weight="800" letter-spacing="-1.4">{html.escape(line)}</text>'
        for line_index, line in enumerate(lines)
    )
    cx, cy = FIGURE_CENTERS[subject]
    scale = 9 if subject == "Mathematics & Statistics" else 8 if subject == "Digital Electronics" else 6
    figure = ICONS[subject].replace("#24292f", color).replace('stroke-width="7"', 'stroke-width="2.4"')
    art = f'''<title>{html.escape(course)} — {html.escape(subject)}</title>
<defs>
  <radialGradient id="glow"><stop stop-color="{color}" stop-opacity=".18"/><stop offset="1" stop-color="{color}" stop-opacity="0"/></radialGradient>
  <linearGradient id="mask" x1="0" y1="0" x2="1" y2=".09"><stop stop-color="#07101F" stop-opacity=".94"/><stop offset=".4" stop-color="#07101F" stop-opacity=".84"/><stop offset=".62" stop-color="#07101F" stop-opacity=".3"/><stop offset=".78" stop-color="#07101F" stop-opacity="0"/></linearGradient>
  <pattern id="grid" width="72" height="72" patternUnits="userSpaceOnUse"><path d="M72 0H0V72" stroke="#93A4C5" stroke-opacity=".1"/></pattern>
</defs>
<rect width="1920" height="1080" fill="#07101F"/>
<ellipse cx="1492" cy="542" rx="640" ry="640" fill="url(#glow)"/>
<rect width="1920" height="1080" fill="url(#grid)"/>
<rect width="1920" height="1080" fill="url(#mask)"/>
<g id="course-figure" opacity=".96" transform="translate({1492 - cx * scale:.2f} {542 - cy * scale:.2f}) scale({scale})" stroke="{color}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">{figure}</g>
<g font-family="Arial, Helvetica, sans-serif">
<text x="150" y="{top + 23:.2f}" fill="{color}" font-size="27" font-weight="700" letter-spacing="5.5">COURSE COLLECTION</text>
{text}
<rect x="150" y="{rule_top:.2f}" width="196" height="7" rx="7" fill="{color}"/>
<text x="150" y="{rule_top + 60:.2f}" fill="#93A4C5" font-size="23" letter-spacing="2.4">{html.escape(subject.upper())} · COURSE COLLECTION</text>
</g>
{BRAND}'''
    code = first.get("course_code", first["tags"][1]).lower()
    cover = COVER_DIR / f"{code}.svg"
    cover.write_text(svg(art, 1920, 1080), encoding="utf-8")

print(f"Created {len(ICONS)} subject icons and {len(library)} course covers.")
