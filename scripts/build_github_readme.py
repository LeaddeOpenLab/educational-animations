#!/usr/bin/env python3
"""Generate README, course pages, prompt cards and full index from final records."""
import html,json,re
from pathlib import Path
from collections import OrderedDict
from urllib.parse import quote
from final_record import review_passed
root=Path(__file__).resolve().parents[1]
items=json.loads((root/'data/prompts.json').read_text())
releases=json.loads((root/'data/releases.json').read_text()) if (root/'data/releases.json').exists() else {}
slug=lambda s:re.sub(r'[^a-z0-9]+','-',s.lower()).strip('-')
ready=lambda x:x.get('status')=='ready' and bool(x.get('video'))
page=lambda x:f"catalog/{slug(x['subject'])}/{slug(x['tags'][1])}.md"
name=lambda x:x.get('standard_name',x['title'])
summary=lambda rows:f"{sum(bool(ready(x)) for x in rows)} videos · {sum(not ready(x) for x in rows)} awaiting production"
lib=OrderedDict()
for x in items: lib.setdefault(x['subject'],OrderedDict()).setdefault(x['course'],[]).append(x)
lines=['# Leadde Knowledge in Motion','', 'Short educational animations with concept explanations and versioned reuse materials.','',f"**{sum(bool(ready(x)) for x in items)} video-ready · {sum(bool(review_passed(x)) for x in items)} recorded review passes · {sum(not ready(x) for x in items)} awaiting production · {sum(len(c) for c in lib.values())} courses · {len(lib)} disciplines**",'', 'Video-ready means a file is available. Review passes require version-specific evidence; historical videos are not automatically approved.','', '## Featured videos','']
lines += ['<table>','<tr>']
for x in items:
 if x.get('featured') and ready(x):
  preview=f"assets/previews/{x['id'].lower()}-{x['artifact_version']}.gif"
  if not (root/preview).is_file():raise FileNotFoundError(f'Run scripts/build_featured_previews.py: {preview}')
  href=f"{page(x)}#{x['id'].lower()}"
  lines += ['<td width="33%" valign="top">',f'<a href="{href}"><img src="{preview}" width="100%" alt="Animated preview: {html.escape(name(x))}"></a><br>',f'<a href="{href}"><strong>{html.escape(name(x))}</strong></a><br>',f'<sub>{html.escape(x["learning_objective"])}</sub><br>',f'<a href="{href}">▶ Watch full video</a> · <a href="{x["featured"]["evidence"]}">Inspection scope</a>','</td>']
lines += ['</tr>','</table>','','Looping GIF excerpts from the actual videos. Click a card to watch the full video and access its Prompt.']
lines += ['', '## Watch, download, reuse','', '- **Watch:** [Browse the concept index](catalog/INDEX.md) and play native videos on course pages.', '- **Download:** [Course packages](https://github.com/LeaddeOpenLab/leadde-knowledge-in-motion/releases/tag/course-video-downloads). Each package includes a version index and reuse notes when available.', '- **Reuse:** Open the expandable Prompt on a course page. Check its alignment and source availability before adapting it.','', '## Browse the library','']
def card(title, href, image, caption, anchor=None):
 escape=html.escape
 parts=['<td width="33%" valign="top">']
 if anchor:parts.append(f'<a id="{escape(anchor)}"></a>')
 if image:parts.append(f'<a href="{escape(href)}"><img src="{quote(image)}" width="100%" alt="{escape(title)}"></a><br>')
 parts += [f'<a href="{escape(href)}"><strong>{escape(title)}</strong></a><br>',f'<sub>{escape(caption)}</sub>','</td>']
 return '\n'.join(parts)

def card_table(cards):
 result=['<table>']
 for start in range(0,len(cards),3):
  group=cards[start:start+3]
  result += ['<tr>',*group,*(['<td></td>']*(3-len(group))),'</tr>']
 return result+['</table>','']

def course_cover(first):
 code=first.get('course_code',first['tags'][1])
 for base in [code.lower(),slug(first['course'])]:
  for ext in ['.svg','.jpg','.png']:
   path=f'assets/course-covers/{base}{ext}'
   if (root/path).is_file():return path
 return first.get('cover')

subject_cards=[]
for subject,courses in lib.items():
 rows=[x for group in courses.values() for x in group]
 caption=f'{len(courses)} courses · {summary(rows)}'
 if not any(ready(x) for x in rows):caption+=' · No finished videos yet'
 subject_cards.append(card(subject,'#'+slug(subject),f'assets/subject-cards/{slug(subject)}.png',caption))
lines += card_table(subject_cards)
index=['# Complete concept index','','[Home](../README.md)','']
for subject,courses in lib.items():
 rows=[x for r in courses.values() for x in r]
 lines += [f'<a id="{slug(subject)}"></a>',f'### {subject}', '',f"{summary(rows)}"+(' · **No finished videos yet**' if not any(ready(x) for x in rows) else ''),'']
 course_cards=[]
 for course,group in courses.items():
  caption=summary(group)+(' · No finished videos yet' if not any(ready(x) for x in group) else '')
  course_cards.append(card(course,page(group[0]),course_cover(group[0]),caption,slug(course)))
 lines += card_table(course_cards)+['[Back to subject cards](#browse-the-library)','']
 for course,rows in courses.items():
  first=rows[0]; dest=page(first); code=first['tags'][1]
  index += [f'## {course}','']
  out=[f'# {course}','',f'[← {subject}](../../README.md#{slug(subject)}) · [Complete index](../INDEX.md)','',summary(rows),'',f"Course bibliography supplied by the source list: {first['textbook']}. Specific supporting references are listed per concept; missing references are not inferred.",'']
  release=releases.get(code)
  if release:
   out += [f"[Download course ZIP]({release['download_url']}) · {release['video_count']} videos · {release['version']} · updated {release['updated_at']}",f"Package status: {release.get('status','unknown')}. Package membership is recorded in its index.",'']
  else:out+=['Course download package: not yet published.','']
  product={'Mathematics':'https://leadde.ai/solutions/math-animation','Mathematics & Statistics':'https://leadde.ai/solutions/math-animation','Chemistry':'https://leadde.ai/solutions/chemistry-animation'}.get(subject,'https://leadde.ai/animation')
  out += [f'[Explore Leadde animation tools]({product}). Copy an aligned prompt, open a suitable tool, then adapt it manually; exact reproduction is not promised.','','---','']
  for x in rows:
   id=x['id']; title=name(x); x['page']=dest
   index += [f"- [{id} · {title}]({dest.removeprefix('catalog/')}#{id.lower()}) — {'video' if ready(x) else 'awaiting production'}"]
   out += [f'<a id="{id.lower()}"></a>']
   for alias in x.get('aliases',[]):out += [f'<a id="{slug(alias)}"></a>']
   out += [f'## {title}','',f"`{id}` · {'Video available' if ready(x) else 'Awaiting production'} · review: **{x.get('review',{}).get('status','unreviewed')}** · version `{x.get('artifact_version','draft')}`",'',f"**Learn:** {x.get('learning_objective') or 'Pending verification.'}",f"**Takeaway:** {x.get('core_conclusion') or 'Pending verification.'}",'']
   if ready(x):
    if x.get('player'):out += [x['player'],'']
    elif x.get('cover'):out += [f"![{title}](../../{x['cover']})",'']
    media=x.get('media',{})
    out += [f"[Download MP4](https://github.com/LeaddeOpenLab/leadde-knowledge-in-motion/raw/refs/heads/main/{x['video']}) · {media.get('duration_seconds','unknown')} s · {media.get('width','?')}×{media.get('height','?')} · {media.get('format','unknown')}",'']
   reuse=x.get('reuse',{})
   out += [f"**Public prompt:** {reuse.get('status','unverified')}. {reuse.get('notes','')}",'','<details>','<summary>View and copy Prompt</summary>','','````text',x.get('prompt') or 'An aligned final-video prompt is pending.','````','','</details>','']
   prod=x.get('production',{})
   out += [f"**Production:** {prod.get('tool') or 'Tool not yet verified'}; dependencies: {', '.join(prod.get('dependencies',[])) or 'pending'}. Exact reproduction: {'verified' if reuse.get('exact_reproduction_verified') else 'not verified'}.",'']
   source=prod.get('source_url')
   out += [f"[Source / reproduction materials]({source})" if source else '[Reproduction requirements and missing materials](../../docs/REUSE.md)','']
   for ref in x.get('references',[]):out += [f"- [{ref.get('title','Reference')}]({ref['url']}) — {ref.get('scope','concept reference')}"]
   if not x.get('references'):out+=['References: pending verification.']
   if x.get('pending_sync'):out+=['', '**Pending synchronization:** '+', '.join(x['pending_sync'])+'.']
   out += ['', '[Back to course top](#'+slug(course)+')','','---','']
   for old_key in ('prompt_file','prompt_card'):
    old_path=x.get(old_key)
    if isinstance(old_path,str) and old_path.endswith('.md') and not old_path.startswith('http'):
     legacy=root/old_path;legacy.parent.mkdir(parents=True,exist_ok=True)
     legacy.write_text(f"# {id} · {title}\n\nVersion: {x['artifact_version']} · alignment: {reuse.get('status','unverified')}\n\n{x.get('prompt') or 'Aligned final-video prompt pending.'}\n\n{reuse.get('notes','')}\n")
  target=root/dest;target.parent.mkdir(parents=True,exist_ok=True);target.write_text('\n'.join(out).rstrip()+'\n')
 lines+=['']
changes=json.loads((root/'data/changes.json').read_text()) if (root/'data/changes.json').exists() else []
lines+=['## Repository layout','','`catalog/` course pages and full index · `assets/` videos, previews, Prompts and source kits · `data/` final records · `docs/` reuse and verification · `scripts/` production, publishing and tests.','','## Recent changes','']
for c in changes[-8:][::-1]:lines+=[f"- {c['date']} — {c['description']}"]
lines+=['','## Use and contribute','','See [reuse instructions](docs/REUSE.md), [rights requiring confirmation](docs/RIGHTS.md), and [contribution instructions](.github/CONTRIBUTING.md). Report a concept error with its stable ID, video version and timestamp, or suggest a topic in [Issues](https://github.com/LeaddeOpenLab/leadde-knowledge-in-motion/issues/new/choose).','','[Leadde animation tools](https://leadde.ai/animation) explains available creation tools. Prompts are copied manually; there is no automatic prompt transfer.','','The static website can be served locally with `python3 -m http.server 8000`. No public site deployment is claimed.']
(root/'README.md').write_text('\n'.join(lines)+'\n');(root/'catalog/INDEX.md').write_text('\n'.join(index)+'\n')
# page is a stable derived locator stored alongside final metadata for publishers.
(root/'data/prompts.json').write_text(json.dumps(items,ensure_ascii=False,indent=2)+'\n')
print(f'Generated {len(items)} concepts, {sum(len(c) for c in lib.values())} courses')

(root/'data/linear-algebra-video-prompts.json').write_text(json.dumps([{'id':x['id'],'title':x['final_title'],'knowledgePoint':name(x),'prompt':x.get('prompt',''),'video':x['video'],'artifact_version':x['artifact_version'],'reuse':x['reuse']} for x in items if x['course']=='Linear Algebra'],ensure_ascii=False,indent=2)+'\n')

(root/'data/backlog.json').write_text(json.dumps([{'id':x['id'],'standard_name':name(x),'version':x['artifact_version'],'review':x['review']['status'],'prompt_alignment':x['reuse']['status'],'missing':[k for k in ['learning_objective','core_conclusion','references'] if not x.get(k)]} for x in items if ready(x) and (not review_passed(x) or x['reuse']['status']!='aligned')],ensure_ascii=False,indent=2)+'\n')
