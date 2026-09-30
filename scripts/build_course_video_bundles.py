#!/usr/bin/env python3
"""Package media with a stable-ID/version index, prompts and reproduction notes."""
import json,re,zipfile
from pathlib import Path
from collections import OrderedDict
ROOT=Path(__file__).resolve().parents[1]
slug=lambda s:re.sub(r'[^a-z0-9]+','-',s.lower()).strip('-')

def courses():
    result=OrderedDict()
    for x in json.loads((ROOT/'data/prompts.json').read_text()):
        if x.get('status')=='ready' and x.get('video'): result.setdefault((x['subject'],x['course'],x.get('course_code',x['tags'][1])),[]).append(x)
    return result

def inventory(rows):
    return [{'id':x['id'],'standard_name':x.get('standard_name',x['title']),'version':x['artifact_version'],
             'file':Path(x['video']).name,'bytes':(ROOT/x['video']).stat().st_size,'media':x.get('media'),
             'prompt':x.get('prompt',''),'reuse':x.get('reuse',{}),'production':x.get('production',{}),
             'learning_objective':x.get('learning_objective',''),'core_conclusion':x.get('core_conclusion',''),
             'references':x.get('references',[])} for x in rows]

def build(rows,code):
    out=ROOT/'dist/course-video-bundles';out.mkdir(parents=True,exist_ok=True)
    archive=out/f'{slug(code)}-videos.zip';manifest=inventory(rows)
    names=[x['file'] for x in manifest]
    if len(names)!=len(set(names)):raise ValueError('Duplicate filenames in course package')
    with zipfile.ZipFile(archive,'w',compression=zipfile.ZIP_STORED) as z:
        for x in rows:z.write(ROOT/x['video'],Path(x['video']).name)
        z.writestr('index.json',json.dumps(manifest,ensure_ascii=False,indent=2))
        z.writestr('PROMPTS.md','\n\n'.join(f"# {x['id']} · {x['standard_name']} ({x['version']})\n\nAlignment: {x['reuse'].get('status','unverified')}\n\n{x['prompt'] or 'Aligned final-video prompt pending.'}\n\n{x['reuse'].get('notes','')}" for x in manifest))
        z.writestr('README.md','Videos are matched to concepts by index.json. Review and prompt alignment are separate from file availability. Exact reproduction is not verified unless stated per entry. Source dependencies and missing materials are recorded per entry. No blanket license is granted; see the repository docs/RIGHTS.md.\n')
    return archive,manifest

if __name__=='__main__':
    for (_,course,code),rows in courses().items():print(course,build(rows,code)[0])
