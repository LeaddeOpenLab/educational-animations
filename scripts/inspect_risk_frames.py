#!/usr/bin/env python3
"""Extract before/during/after risk frames; never auto-approve the video."""
import argparse,json,os,subprocess
from pathlib import Path
from final_record import probe

def sample_times(time,duration,delta=.15):
    return sorted({round(max(0,min(max(0,duration-.05),time+d)),3) for d in (-delta,0,delta)})

if __name__=='__main__':
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('record');p.add_argument('--video',required=True);p.add_argument('--out',required=True);a=p.parse_args()
    entry=json.loads(Path(a.record).read_text());duration=probe(a.video)['duration_seconds'];out=Path(a.out);out.mkdir(parents=True,exist_ok=True);checks=[]
    for i,risk in enumerate(entry['production']['risk_moments']):
        t=risk['time_seconds']
        if not 0<=t<=duration:raise ValueError('Risk moment outside actual video')
        times=sample_times(t,duration);files=[]
        for j,time in enumerate(times):
            file=out/f'{i+1:02d}-{j+1}-{time:.3f}s.jpg'
            subprocess.run([os.environ.get('FFMPEG','ffmpeg'),'-hide_banner','-loglevel','error','-y','-ss',str(time),'-i',a.video,'-frames:v','1',str(file)],check=True)
            if not file.is_file() or not file.stat().st_size:raise RuntimeError('Frame extraction produced no image')
            files.append(str(file.resolve()))
        checks.append({'risk_id':risk['id'],'times_seconds':times,'evidence':files,'observation':'','status':'pending'})
    (out/'inspection.json').write_text(json.dumps(checks,indent=2)+'\n')
    print(f'{len(checks)} risk moments extracted; visual inspection remains pending.')
