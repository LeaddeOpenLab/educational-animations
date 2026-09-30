"""The catalog entry is the final artifact record; no second title/prompt database."""
import json
import re
import shutil
import subprocess
from pathlib import Path
from datetime import datetime, timezone

REVIEW_CHECKS = ('terminology', 'explanation', 'motion', 'consistency', 'layout', 'small_player', 'version_match')

def now():
    return datetime.now(timezone.utc).isoformat(timespec='seconds')

def probe(path):
    path = Path(path)
    if not path.is_file(): raise FileNotFoundError(path)
    if shutil.which('ffprobe'):
        d = json.loads(subprocess.check_output(['ffprobe', '-v', 'error', '-show_format', '-show_streams', '-of', 'json', str(path)]))
        v = next(s for s in d['streams'] if s['codec_type'] == 'video')
        return dict(duration_seconds=round(float(d['format']['duration']),3),width=v['width'],height=v['height'],format=path.suffix[1:].lower(),codec=v['codec_name'])
    p = subprocess.run(['ffmpeg', '-hide_banner', '-i', str(path)], capture_output=True, text=True)
    duration = re.search(r'Duration: (\d+):(\d+):(\d+\.\d+)', p.stderr)
    video = re.search(r'Video: (\w+).*?\b(\d{2,5})x(\d{2,5})\b', p.stderr)
    if not duration or not video: raise ValueError(f'Unable to probe {path}')
    h,m,s = map(float, duration.groups())
    return dict(duration_seconds=round(h*3600+m*60+s,3),width=int(video[2]),height=int(video[3]),format=path.suffix[1:].lower(),codec=video[1])

def review_passed(entry):
    r = entry.get('review', {})
    return (r.get('status') == 'passed' and r.get('version') == entry.get('artifact_version')
            and bool(r.get('reviewer') and r.get('reviewed_at') and r.get('evidence'))
            and all(r.get('checks', {}).get(k) is True for k in REVIEW_CHECKS))

def validate(entry, root=None):
    for k in ('id','original_name','standard_name','artifact_version','final_title','learning_objective','core_conclusion','prompt'):
        if not entry.get(k): raise ValueError(f'Missing final record field: {k}')
    if not entry.get('terminology', {}).get('confirmed'): raise ValueError('Confirm terminology before storyboard/production')
    if not review_passed(entry): raise ValueError('Version-specific review evidence required')
    if entry.get('reuse', {}).get('status') != 'aligned': raise ValueError('Final prompt must be aligned with the video')
    if not entry.get('production', {}).get('tool') or not entry['production'].get('dependencies'): raise ValueError('Actual tool and dependencies required')
    media = probe(Path(root) / entry['video']) if root else entry['media']
    duration = entry.get('reuse', {}).get('duration_seconds')
    if duration is None or abs(duration-media['duration_seconds']) > .1: raise ValueError('Prompt duration differs from video')
    claims = re.findall(r'(\d+(?:\.\d+)?)\s*-\s*second\b', entry['prompt'], re.I)
    if any(abs(float(n)-media['duration_seconds']) > .1 for n in claims): raise ValueError('Prompt text duration differs from video')
    if entry.get('player') and entry.get('player_version') != entry['artifact_version']: raise ValueError('Player belongs to another version')
    if entry.get('cover') and entry.get('cover_version') != entry['artifact_version']: raise ValueError('Cover belongs to another version')
    return media

def upsert(items, entry):
    matches = [i for i,x in enumerate(items) if x['id'] == entry['id'] or (entry.get('feishu_record_id') and x.get('feishu_record_id') == entry['feishu_record_id'])]
    if len(matches)>1: raise ValueError('Ambiguous stable identity')
    if matches:
        old = items[matches[0]]
        if old['id'] != entry['id']: raise ValueError('Existing ID must not change')
        if old.get('feishu_record_id') and entry.get('feishu_record_id') != old['feishu_record_id']: raise ValueError('Stable ID cannot move to a different Feishu record')
        if old.get('artifact_version') == entry.get('artifact_version') and old.get('publication',{}).get('github',{}).get('status') == 'succeeded':
            if any(old.get(k) != entry.get(k) for k in ('prompt','video','cover','player','media')):
                raise ValueError('Published content is immutable within an artifact version')
        items[matches[0]] = {**old, **entry}
    else: items.append(entry)
    return items

def publish_channels(entry, operations, save):
    """Persist each channel independently, including success before the next operation."""
    channels = entry.setdefault('publication', {})
    errors = {}
    for channel, operation in operations.items():
        previous = channels.get(channel, {})
        if previous.get('status') == 'succeeded' and previous.get('version') == entry['artifact_version']: continue
        try:
            result = operation(entry) or {}
            channels[channel] = {**result, 'status':'succeeded','version':entry['artifact_version'],'published_at':now()}
        except Exception as error:
            errors[channel] = str(error)
            channels[channel] = {**previous,'status':'failed','version':entry['artifact_version'],'error':str(error)}
        save()
    return errors
