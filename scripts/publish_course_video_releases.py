#!/usr/bin/env python3
"""Update existing fixed-tag Releases only when their recorded inventory changes."""
import json,os,subprocess,urllib.request,urllib.error,urllib.parse,zipfile
from pathlib import Path
from datetime import datetime,timezone
from build_course_video_bundles import ROOT,courses,build,inventory,slug
API='https://api.github.com/repos/LeaddeOpenLab/leadde-knowledge-in-motion'

def token():
    if os.environ.get('GITHUB_TOKEN'):return os.environ['GITHUB_TOKEN']
    p=subprocess.run(['git','credential','fill'],input='protocol=https\nhost=github.com\n\n',text=True,capture_output=True,check=True)
    return dict(x.split('=',1) for x in p.stdout.splitlines() if '=' in x)['password']

def request(method,url,body=None,ctype='application/json'):
    if isinstance(body,dict):body=json.dumps(body).encode()
    req=urllib.request.Request(url,data=body,method=method,headers={'Authorization':'Bearer '+TOKEN,'Accept':'application/vnd.github+json','User-Agent':'LeaddeReleasePublisher','Content-Type':ctype})
    try:
        with urllib.request.urlopen(req,timeout=180) as r:
            b=r.read();return json.loads(b) if b else None
    except urllib.error.HTTPError as e:
        if e.code==404:return None
        raise RuntimeError(f'GitHub {method} HTTP {e.code}') from e

def main():
    import argparse
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--course',help='Publish only this canonical course code');args=parser.parse_args()
    global TOKEN;TOKEN=token();path=ROOT/'data/releases.json';index=json.loads(path.read_text()) if path.exists() else {};failed=[]
    if args.course and args.course not in {k[2] for k in courses()}:raise ValueError('Unknown course code')
    for (subject,course,code),rows in courses().items():
      if args.course and code!=args.course:continue
      try:
        tag=f'course-videos-{slug(subject)}-{slug(code)}';rel=request('GET',API+'/releases/tags/'+tag)
        wanted=inventory(rows);marker='\n<!-- inventory: ';old=None
        if rel and marker in (rel.get('body') or ''):
            old=json.loads(rel['body'].split(marker,1)[1].split(' -->',1)[0])
        signature=wanted
        asset_name=slug(code)+'-videos.zip'
        assets=rel.get('assets',[]) if rel else []
        asset=next((a for a in assets if a['name']==asset_name),None)
        local=ROOT/'dist/course-video-bundles'/asset_name
        legacy_signature=[{k:x[k] for k in ('id','version','bytes','prompt','reuse')} for x in wanted]
        local_matches=False
        if asset and local.is_file() and asset['size']==local.stat().st_size:
            with zipfile.ZipFile(local) as z:local_matches=json.loads(z.read('index.json'))==wanted
        unchanged=bool(asset and (old==signature or (old==legacy_signature and local_matches)))
        if unchanged:
            if old!=signature:
                body=f'{len(rows)} available videos. ZIP includes stable-ID/version index, Prompts and reuse notes.'+marker+json.dumps(signature,separators=(',',':'))+' -->'
                request('PATCH',API+f"/releases/{rel['id']}",{'body':body})
            print('Unchanged',code,flush=True)
        else:
            archive,_=build(rows,code)
            if not rel:rel=request('POST',API+'/releases',{'tag_name':tag,'target_commitish':'main','name':f'[{subject}] {course} video bundle','body':'Package preparation in progress.'})
            upload=rel['upload_url'].split('{')[0]
            pending=asset_name+'.pending'
            for a in rel.get('assets',[]):
                if a['name']==pending:request('DELETE',API+f"/releases/assets/{a['id']}")
            new=request('POST',upload+'?'+urllib.parse.urlencode({'name':pending}),archive.read_bytes(),'application/zip')
            if new['size']!=archive.stat().st_size:raise RuntimeError('Uploaded archive size mismatch')
            if asset:request('DELETE',API+f"/releases/assets/{asset['id']}")
            asset=request('PATCH',API+f"/releases/assets/{new['id']}",{'name':asset_name})
            body=f'{len(rows)} available videos. ZIP includes stable-ID/version index, Prompt alignment status and reuse instructions. Historical unreviewed files are labelled in the index.\n\n[All course packages](https://github.com/LeaddeOpenLab/leadde-knowledge-in-motion/releases/tag/course-video-downloads)'+marker+json.dumps(signature,separators=(',',':'))+' -->'
            request('PATCH',API+f"/releases/{rel['id']}",{'body':body})
            print('Updated',code,len(rows),flush=True)
        revision=index.get(code,{}).get('revision',1)+(0 if unchanged else 1)
        index[code]={'revision':revision,'download_url':asset['browser_download_url'],'release_url':rel['html_url'],'video_count':len(rows),'version':f'bundle-{revision}','updated_at':asset['updated_at'],'status':'current','members':[{k:x[k] for k in ('id','version')} for x in wanted]}
      except Exception as e:
        failed.append({'course':code,'error':str(e)});print('FAILED',code,str(e),flush=True)
        if code in index:index[code]['status']='update_failed'
      path.write_text(json.dumps(index,indent=2)+'\n')
    active={code for (_,_,code) in courses()}
    for code,value in index.items():
        if code not in active:value['status']='legacy; superseded by the canonical course package'
    path.write_text(json.dumps(index,indent=2)+'\n')
    body='# Course video downloads\n\nEach course ZIP includes videos, a stable-ID/version index, Prompts and reuse notes.\n\n'+'\n'.join(f"- **{code}** · {v['video_count']} videos · [{v['version']} ZIP]({v['download_url']}) · {v['updated_at']} · {v['status']}" for code,v in index.items())
    rel=request('GET',API+'/releases/tags/course-video-downloads')
    request('PATCH',API+f"/releases/{rel['id']}",{'body':body}) if rel else request('POST',API+'/releases',{'tag_name':'course-video-downloads','name':'Course Video Downloads','body':body})
    (ROOT/'data/release-errors.json').write_text(json.dumps(failed,indent=2)+'\n')
    return bool(failed)
if __name__=='__main__':raise SystemExit(main())
