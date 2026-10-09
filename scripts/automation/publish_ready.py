#!/usr/bin/env python3
"""Publish a reviewed final record. Failed channels retry independently; never renders."""
import argparse
import json
import os
import re
import subprocess
import sys
from pathlib import Path
import incremental_agent as agent

REPO=Path(os.environ.get('LEADDE_REPO',Path(__file__).resolve().parents[2]))
sys.path.insert(0,str(REPO/'scripts'))
from final_record import validate_for_publication, upsert, publish_channels
from feishu_fields import ensure_mapping, values_for

def command(*args):
    return subprocess.check_output(args,cwd=REPO,text=True).strip()

def feishu_step(entry, save):
    token=agent.tenant_token()
    mapping=ensure_mapping(token)
    record_id=entry.get('feishu_record_id')
    if not record_id: raise ValueError('Verified Feishu record ID required; publisher never inserts rows')
    before=agent.api(agent.table_path(f'records/{record_id}'),token)['data']['record']['fields']
    stable=before.get(mapping['id'])
    if stable and stable!=entry['id']: raise ValueError('Feishu stable ID mismatch')
    if not stable and (before.get('Course')!=entry['course'] or before.get('Name') not in [entry['original_name'],entry['standard_name'],*entry.get('aliases',[])]): raise ValueError('Unbound Feishu identity mismatch')
    fields=values_for(entry,mapping)
    # Checkpoint uploaded file tokens before updating the row; a retry reuses them.
    sys.path.insert(0,str(agent.ROOT/'.workbuddy'))
    import upload_four_courses_api as upload
    cache_path=agent.STORE/'uploads'/f"{entry['id']}-{entry['artifact_version']}.json"
    cache=agent.load_json(cache_path,{})
    for field,key,parent in [('视频','video','bitable_file'),('封面图','cover','bitable_image')]:
        if not entry.get(key): raise ValueError(f'Missing final {key}')
        old=cache.get(key,{})
        if old.get('version')!=entry['artifact_version']:
            old={'version':entry['artifact_version'],'file_token':upload.upload(token,REPO/entry[key],parent)}
            cache[key]=old;agent.atomic_json(cache_path,cache);save()
        fields[field]=[{'file_token':old['file_token']}]
    agent.api(agent.table_path(f'records/{record_id}'),token,{'fields':fields},method='PUT')
    verified=agent.api(agent.table_path(f'records/{record_id}'),token)['data']['record']['fields']
    for name,value in fields.items():
        if name in ('视频','封面图'):
            if [a['file_token'] for a in verified.get(name,[])]!=[a['file_token'] for a in value]: raise ValueError(f'Attachment readback mismatch: {name}')
        elif verified.get(name)!=value and not (value=='' and not verified.get(name)): raise ValueError(f'Field readback mismatch: {name}')
    return {'record_id':record_id}

def ensure_native_player(entry, save):
    if entry.get('player') and entry.get('player_version') == entry['artifact_version']:
        return
    repository='LeaddeOpenLab/educational-animations'
    issue=os.environ.get('LEADDE_ASSET_ISSUE','5')
    marker=f"{entry['id']} artifact_version={entry['artifact_version']}"
    def comments():
        pages=json.loads(command('gh','api','--paginate','--slurp',f'repos/{repository}/issues/{issue}/comments?per_page=100'))
        return [c for page in pages for c in page]
    found=next((c for c in comments() if marker in c['body']),None)
    if not found:
        body=agent.STORE/'uploads'/f"{entry['id']}-{entry['artifact_version']}.md"
        body.parent.mkdir(parents=True,exist_ok=True)
        body.write_text(marker+'\n\n'+entry['final_title']+'\n')
        command('gh','issue','comment',issue,'-R',repository,'--body-file',str(body),'--attach',str(REPO/entry['video']))
        found=next((c for c in comments() if marker in c['body']),None)
    if not found:raise RuntimeError('Attachment upload could not be recovered by ID/version')
    urls=re.findall(r'https://github.com/user-attachments/assets/[0-9a-f-]+',found['body'])
    if len(urls)!=1:raise RuntimeError('Ambiguous version attachment')
    entry['player']=urls[0];entry['player_version']=entry['artifact_version']
    entry.setdefault('publication',{})['native_player']={'status':'succeeded','version':entry['artifact_version'],'comment_id':found['id'],'comment_url':found['html_url']}
    save()

def github_step(entry):
    if not entry.get('player'): raise ValueError('Native GitHub attachment URL required for this version; supply it once, do not create duplicate attachment Issues')
    paths=['data/prompts.json','data/backlog.json','data/linear-algebra-video-prompts.json','data/releases.json','data/release-errors.json','README.md','assets/previews','catalog','assets/prompts',entry['video'],entry['cover']]
    subprocess.run([sys.executable,'scripts/build_featured_previews.py'],cwd=REPO,check=True)
    subprocess.run([sys.executable,'scripts/build_github_readme.py'],cwd=REPO,check=True)
    dirty=command('git','status','--porcelain')
    allowed=lambda path:any(path==p or path.startswith(p+'/') for p in paths)
    if any(not allowed(line[3:]) for line in dirty.splitlines()): raise RuntimeError('Unrelated checkout changes; use a dedicated publishing checkout')
    command('git','add','--',*paths)
    if command('git','diff','--cached','--name-only'):
        command('git','commit','-m',f"Publish {entry['id']} {entry['artifact_version']}")
    command('git','fetch','origin','main')
    subprocess.run(['git','merge-base','--is-ancestor','origin/main','HEAD'],cwd=REPO,check=True)
    command('git','push','origin','HEAD:main')
    remote=command('git','ls-remote','origin','refs/heads/main').split()[0]
    if remote!=command('git','rev-parse','HEAD'): raise RuntimeError('Remote commit verification failed')
    return {'url':f"https://github.com/LeaddeOpenLab/educational-animations/blob/main/{entry['page']}#{entry['id'].lower()}", 'commit':remote}

def package_step(entry):
    subprocess.run([sys.executable,'scripts/publish_course_video_releases.py','--course',entry['course_code']],cwd=REPO,check=True)
    package=json.loads((REPO/'data/releases.json').read_text())[entry['course_code']]
    if package['status']!='current' or {'id':entry['id'],'version':entry['artifact_version']} not in package['members']:raise ValueError('Course package version mismatch')
    github_step(entry)  # Publish the measured package index and regenerated download links.
    return {'url':package['download_url'],'bundle_version':package['version']}

def main():
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('key');parser.add_argument('--channel',choices=['all','feishu','github','course_package'],default='all');args=parser.parse_args()
    state=agent.load_json(agent.STATE_FILE,{})
    item=state.get('items',{}).get(args.key)
    if not item: raise ValueError('Unknown stable work item key')
    record_path=item.get('artifacts',{}).get('final_record')
    if not record_path: raise ValueError('artifacts.final_record must point to the reviewed final record JSON')
    entry=json.loads(Path(record_path).read_text())
    if item.get('record_id')!=entry.get('feishu_record_id'): raise ValueError('Work item / final record identity mismatch')
    entry['media']=validate_for_publication(entry,REPO)
    def save():
        agent.atomic_json(Path(record_path),entry)
        item['publication']=entry['publication'];item['stable_id']=entry['id']
        agent.atomic_json(agent.STATE_FILE,state)
    # Retry journal is in the final record, not a second title or prompt generator.
    operations={}
    if args.channel in ('all','feishu'):operations['feishu']=lambda e:feishu_step(e,save)
    if args.channel in ('all','github'):
        def github(e):
            ensure_native_player(e,save)
            data_path=REPO/'data/prompts.json'
            items=json.loads(data_path.read_text());upsert(items,e);agent.atomic_json(data_path,items)
            return github_step(e)
        operations['github']=github
    if args.channel in ('all','github','course_package'):operations['course_package']=package_step
    errors=publish_channels(entry,operations,save)
    entry['pending_sync']=[c for c in ['feishu','github','course_package'] if entry.get('publication',{}).get(c,{}).get('status')!='succeeded' or entry['publication'][c].get('version')!=entry['artifact_version']]
    item['status']='已发布' if not entry['pending_sync'] else '待发布'
    item['error']=json.dumps(errors,ensure_ascii=False) if errors else '';save()
    # Status-only reconciliation is independent of successful media uploads.
    try:
        token=agent.tenant_token();mapping=ensure_mapping(token)
        fields={mapping['feishu_status']:entry['publication'].get('feishu',{}).get('status','pending'),mapping['github_status']:entry['publication'].get('github',{}).get('status','pending')}
        gh=entry['publication'].get('github',{})
        if gh.get('status')=='succeeded': fields.update({mapping['github_url']:gh['url'],mapping['published_at']:gh['published_at']})
        agent.api(agent.table_path(f"records/{entry['feishu_record_id']}"),token,{'fields':fields},method='PUT')
        item.pop('status_sync_error',None)
    except Exception as e:
        item['status_sync_error']=str(e);errors['feishu_status']=str(e)
    if entry.get('publication',{}).get('github',{}).get('status')=='succeeded':
        try:
            catalog=REPO/'data/prompts.json';items=json.loads(catalog.read_text());upsert(items,entry);agent.atomic_json(catalog,items)
            subprocess.run([sys.executable,'scripts/build_github_readme.py'],cwd=REPO,check=True)
            command('git','add','--','data/prompts.json','data/backlog.json','data/linear-algebra-video-prompts.json','README.md','catalog','assets/prompts')
            if command('git','diff','--cached','--name-only'):
                command('git','commit','-m',f"Record delivery status for {entry['id']} {entry['artifact_version']}")
            command('git','fetch','origin','main')
            subprocess.run(['git','merge-base','--is-ancestor','origin/main','HEAD'],cwd=REPO,check=True)
            command('git','push','origin','HEAD:main')
            if command('git','ls-remote','origin','refs/heads/main').split()[0]!=command('git','rev-parse','HEAD'):raise RuntimeError('Delivery metadata push not verified')
            item.pop('catalog_status_sync_error',None)
        except Exception as error:
            item['catalog_status_sync_error']=str(error);errors['github_status']=str(error)
    if errors:item['status']='待发布';item['error']=json.dumps(errors,ensure_ascii=False)
    save();print(json.dumps({'id':entry['id'],'channels':entry['publication'],'errors':errors},ensure_ascii=False))
    return bool(errors)

if __name__=='__main__':sys.exit(main())
