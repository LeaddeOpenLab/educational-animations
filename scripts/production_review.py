"""Action-first production checks. Evidence completeness never proves teaching quality."""
import argparse,json
from pathlib import Path

CATEGORIES=('design','logic','layout','render')
TECHNICAL=('compilation','media')
TEACHING=('causal_motion','state_consistency','pacing','readability','version_match')

def require(values,keys,label):
    missing=[k for k in keys if not values.get(k)]
    if missing:raise ValueError(f'{label}: missing {", ".join(missing)}')

def approved(review,version,checks=()):
    return (review.get('status')=='passed' and review.get('version')==version
            and all(review.get(k) for k in ('reviewer','reviewed_at','evidence'))
            and all(review.get('checks',{}).get(k) is True for k in checks))

def validate_plan(entry):
    p=entry.get('production',{});scenes=p.get('scenes',[])
    if p.get('workflow_version')!=2:raise ValueError('New production requires workflow_version=2')
    if not scenes:raise ValueError('Action storyboard required before preview')
    require(p,('state_model','template_scope','critical_processes'),'Production plan')
    require(p['state_model'],('source','bindings'),'Shared mechanism state')
    end=0
    for scene in scenes:
        require(scene,('id','objects','change','cause','result','timing_reason'),'Action storyboard')
        start=scene.get('start_seconds');stop=scene.get('end_seconds');read=scene.get('reading_seconds')
        if start is None or stop is None or abs(start-end)>.1 or stop<=start:raise ValueError('Scenes must form a continuous, positive timeline')
        if read is None or not 0<=read<=(stop-start):raise ValueError('Record comprehension time within each scene')
        end=stop
    if not 25<=end<=35:raise ValueError('Keep concept videos around 30 seconds: default budget is 25–35 seconds; simplify or split longer topics')
    ids=[s['id'] for s in scenes]
    if len(ids)!=len(set(ids)):raise ValueError('Scene IDs must be unique')
    for process in p['critical_processes']:
        require(process,('id','scene_id','uncertainty','expected_observation'),'Critical process')
        if process['scene_id'] not in ids:raise ValueError('Critical process must identify an action scene')
    risks=p.get('risk_moments',[])
    if not risks:raise ValueError('Identify handoff, movement or state-change moments for inspection')
    for risk in risks:
        require(risk,('id','reason'),'Risk moment')
        if not 0<=risk.get('time_seconds',-1)<=end:raise ValueError('Risk moment outside the timeline')
    for repair in p.get('rework',[]):
        require(repair,('category','cause','affected_ids'),'Rework')
        if repair.get('status')=='resolved':require(repair,('fix','evidence'),'Resolved rework')
        if repair['category'] not in CATEGORIES:raise ValueError('Rework category must be design, logic, layout or render')
    return end

def validate_preview(entry):
    validate_plan(entry);p=entry['production']
    previews={x['process_id']:x for x in p.get('previews',[])}
    for process in p['critical_processes']:
        preview=previews.get(process['id'],{})
        require(preview,('artifact','observed','applicability'),'Mechanism preview')
        if not approved(preview,entry['artifact_version']):raise ValueError('Inspect the critical motion before expanding the batch; a render alone is not approval')

def validate_final(entry,media):
    validate_preview(entry);p=entry['production'];review=entry.get('review',{});version=entry['artifact_version']
    if abs(p['scenes'][-1]['end_seconds']-media['duration_seconds'])>.1:raise ValueError('Storyboard timing must match final video')
    for name,checks in [('technical',TECHNICAL),('teaching',TEACHING)]:
        if not approved(review.get(name,{}),version,checks):raise ValueError(f'Separate {name} review evidence required')
    checks={c['risk_id']:c for c in review['teaching'].get('risk_checks',[])}
    for risk in p['risk_moments']:
        check=checks.get(risk['id'],{});require(check,('evidence','observation'),'Risk inspection')
        samples=check.get('times_seconds',[]);t=risk['time_seconds'];duration=media['duration_seconds']
        if not samples or any(s<0 or s>duration for s in samples):raise ValueError('Invalid inspected times')
        if not any(abs(s-t)<=.1 for s in samples) or (t>0 and not any(s<t for s in samples)) or (t<duration and not any(s>t for s in samples)):raise ValueError('Inspect before, during and after each risk moment')

if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('record');parser.add_argument('--stage',choices=['plan','preview','final'],default='plan');args=parser.parse_args()
    entry=json.loads(Path(args.record).read_text())
    if args.stage=='final':validate_final(entry,entry['media'])
    else:{'plan':validate_plan,'preview':validate_preview}[args.stage](entry)
    print(f'{args.stage} evidence structure passed; human/AI visual judgment is recorded separately.')
