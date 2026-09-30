#!/usr/bin/env python3
"""Generate looping README previews from the current featured artifact versions."""
import argparse, json, os, subprocess
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--force',action='store_true',help='Rebuild after changing excerpt timing');args=parser.parse_args()
for entry in json.loads((ROOT/'data/prompts.json').read_text()):
    if not entry.get('featured') or entry.get('status')!='ready':continue
    source=ROOT/entry['video']
    output=ROOT/'assets/previews'/f"{entry['id'].lower()}-{entry['artifact_version']}.gif"
    if not args.force and output.exists() and output.stat().st_mtime>=source.stat().st_mtime:continue
    output.parent.mkdir(parents=True,exist_ok=True)
    subprocess.run([os.environ.get('FFMPEG','ffmpeg'),'-hide_banner','-loglevel','error','-y','-ss',str(entry['featured'].get('preview_start_seconds',6)),'-t','12','-i',str(source),'-filter_complex','fps=12,scale=480:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=128[p];[b][p]paletteuse=dither=bayer:bayer_scale=3','-loop','0',str(output)],check=True)
    print(output.relative_to(ROOT))
