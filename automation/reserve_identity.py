#!/usr/bin/env python3
"""Reserve one stable catalog ID for a verified work item before production."""
import argparse,json,os,re,fcntl
from pathlib import Path
import incremental_agent as agent
REPO=Path(os.environ.get('LEADDE_REPO',Path(__file__).resolve().parents[1]))
def reserve(key):
    state=agent.load_json(agent.STATE_FILE,{});item=state['items'][key]
    if item.get('stable_id'):return item['stable_id']
    data=json.loads((REPO/'data/prompts.json').read_text())
    same=[x for x in data if x.get('feishu_record_id')==item['record_id']]
    if len(same)>1:raise ValueError('Duplicate Feishu identity')
    if same:stable=same[0]['id']
    else:
        course=[x for x in data if x['course']==item['course'] and x['subject']==item['discipline'] and re.fullmatch(r'C\d+-A\d+',x['id'])]
        if not course:raise ValueError('New course needs a maintained course prefix')
        prefix=course[0]['id'].split('-')[0]
        used=[x['id'] for x in data]+[x.get('stable_id','') for x in state['items'].values()]
        numbers=[int(s.split('-A')[1]) for s in used if re.fullmatch(prefix+r'-A\d+',s)]
        stable=f'{prefix}-A{max(numbers,default=0)+1:03d}'
    item['stable_id']=stable;agent.atomic_json(agent.STATE_FILE,state);return stable
if __name__=='__main__':
    parser=argparse.ArgumentParser();parser.add_argument('key');args=parser.parse_args()
    agent.STORE.mkdir(parents=True,exist_ok=True)
    with (agent.STORE/'run.lock').open('w') as lock:
        fcntl.flock(lock,fcntl.LOCK_EX);print(reserve(args.key))
