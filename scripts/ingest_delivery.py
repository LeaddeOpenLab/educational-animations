#!/usr/bin/env python3
"""Import reviewed final records by stable identity, never by a mutable title."""
import argparse,json
from pathlib import Path
from final_record import validate_for_publication,upsert
ROOT=Path(__file__).resolve().parents[1]
def ingest(path):
    records=json.loads(Path(path).read_text());records=records if isinstance(records,list) else [records]
    data_path=ROOT/'data/prompts.json';items=json.loads(data_path.read_text())
    for record in records:
        record['media']=validate_for_publication(record,ROOT);upsert(items,record)
    data_path.write_text(json.dumps(items,ensure_ascii=False,indent=2)+'\n')
    return len(records)
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('final_records');a=p.parse_args();print('Imported',ingest(a.final_records),'final records')
