"""Synthetic evidence fixtures only; these are not real teaching approvals."""
import copy,json,sys,tempfile,unittest
from pathlib import Path
from unittest.mock import patch
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from production_review import validate_plan,validate_preview,validate_final,TECHNICAL,TEACHING
from final_record import validate_for_publication
from inspect_risk_frames import sample_times
from test_workflow import record

def approval(checks=()):
    return dict(status='passed',version='v1',reviewer='test fixture',reviewed_at='fixture',evidence=['fixture'],checks=dict.fromkeys(checks,True))

def planned():
    e=record();p=e['production'];p.update(workflow_version=2,state_model={'source':'stateAt(frame)','bindings':{'objects':'state.vector','numbers':'state.length','labels':'state.label','explanation':'state.phase'}},template_scope='Palette/fonts/basic vector graphics only',scenes=[dict(id='move',objects=['vector'],change='Vector rotates',cause='Angle increases',result='Endpoint follows rotation',start_seconds=0,end_seconds=12,reading_seconds=2,timing_reason='Observe rotation then compare endpoint'),dict(id='result',objects=['vector'],change='Resolve components',cause='Project current endpoint',result='Components sum to vector',start_seconds=12,end_seconds=30,reading_seconds=3,timing_reason='Track each component then read equality')],critical_processes=[dict(id='rotation',scene_id='move',uncertainty='Labels track endpoint',expected_observation='Endpoint and component labels agree')],risk_moments=[dict(id='handoff',time_seconds=12,reason='Vector-to-components handoff')],previews=[dict(process_id='rotation',artifact='fixture.mp4',observed='fixture',applicability='same implemented rotation',**approval())])
    e['review']['technical']=approval(TECHNICAL);e['review']['teaching']=approval(TEACHING)
    e['review']['teaching']['risk_checks']=[dict(risk_id='handoff',times_seconds=[11.85,12,12.15],evidence=['fixture'],observation='fixture')]
    return e

class ProductionReviewTests(unittest.TestCase):
    def test_narration_only_scene_rejected(self):
        e=planned();validate_plan(e);del e['production']['scenes'][0]['change']
        with self.assertRaises(ValueError):validate_plan(e)
    def test_preview_required_and_version_specific(self):
        e=planned();validate_preview(e)
        for value in ['pending','failed']:
            e['production']['previews'][0]['status']=value
            with self.assertRaises(ValueError):validate_preview(e)
        e=planned();e['artifact_version']='v2'
        with self.assertRaises(ValueError):validate_preview(e)
    def test_technical_pass_cannot_replace_teaching(self):
        e=planned();validate_final(e,e['media']);e['review']['teaching']['status']='pending'
        with self.assertRaises(ValueError):validate_final(e,e['media'])
    def test_final_allows_preview_viewing_waiver(self):
        e=planned();e['production']['previews']=[]
        validate_final(e,e['media'])
    def test_timing_follows_short_demonstration(self):
        for duration in [25,30,35]:
            e=planned();e['production']['scenes'][-1]['end_seconds']=duration;e['media']['duration_seconds']=duration;validate_final(e,e['media'])
        for duration in [20,60]:
            e=planned();e['production']['scenes'][-1]['end_seconds']=duration
            with self.assertRaises(ValueError):validate_plan(e)
    def test_risk_inspection_cannot_be_single_still(self):
        e=planned();e['review']['teaching']['risk_checks'][0]['times_seconds']=[12]
        with self.assertRaises(ValueError):validate_final(e,e['media'])
        self.assertEqual(sample_times(12,30),[11.85,12,12.15])
    def test_categorized_rework(self):
        e=planned();e['production']['rework']=[dict(category='layout',cause='shared label offset',affected_ids=['fixture'],status='open')];validate_plan(e)
        e['production']['rework'][0]['status']='resolved'
        with self.assertRaises(ValueError):validate_plan(e)
    def test_new_publication_cannot_use_legacy_review(self):
        with tempfile.TemporaryDirectory() as directory:
            root=Path(directory);(root/'data').mkdir();(root/'data/prompts.json').write_text('[]')
            with self.assertRaises(ValueError):validate_for_publication(record(),root)
            fresh=planned();fresh['video']='fixture.mp4'
            with patch('final_record.probe',return_value=fresh['media']):validate_for_publication(fresh,root)
            e=record();e['video']='fixture.mp4';e['publication']={'github':{'status':'succeeded'}};(root/'data/prompts.json').write_text(json.dumps([e]))
            with patch('final_record.probe',return_value=e['media']):validate_for_publication(e,root)
            e['artifact_version']='v2'
            with self.assertRaises(ValueError):validate_for_publication(e,root)
