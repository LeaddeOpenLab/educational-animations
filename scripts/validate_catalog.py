#!/usr/bin/env python3
import json,re
from pathlib import Path
from final_record import review_passed,validate
root=Path(__file__).resolve().parents[1];rows=json.loads((root/'data/prompts.json').read_text());seen=set();records=set();players=0
for x in rows:
    assert x['id'] not in seen,x['id'];seen.add(x['id'])
    rid=x.get('feishu_record_id')
    if rid:assert rid not in records,rid;records.add(rid)
    page=root/x['page'];text=page.read_text();assert f'id="{x["id"].lower()}"' in text
    assert x['standard_name'] in text
    if x['status']=='ready':
        assert (root/x['video']).is_file(),x['id'];assert x['media']['duration_seconds']>0
        if x.get('player'):assert '\n\n'+x['player']+'\n\n' in text;players+=1
    if x.get('cover'):assert (root/x['cover']).is_file(),x['cover']
    if review_passed(x):validate(x,root)
assert '388 educational' not in (root/'index.html').read_text()
readme=(root/'README.md').read_text();assert f'{sum(x["status"]=="ready" for x in rows)} video-ready' in readme
for file in [root/'README.md',*root.glob('catalog/**/*.md')]:
 for target in re.findall(r'\]\(([^)]+)\)',file.read_text()):
    if '://' in target or target.startswith('#'):continue
    target=target.split('#')[0]
    if target:assert (file.parent/target).exists(),(str(file),target)
print(json.dumps({'concepts':len(rows),'native_players':players,'stable_record_mappings':len(records),'review_passes':sum(bool(review_passed(x)) for x in rows),'checks':'identity, files, generated links, native-player paragraphs, statistics, reviewed final records'},indent=2))
