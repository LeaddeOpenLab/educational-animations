import copy,sys,unittest
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from final_record import publish_channels,upsert,validate,REVIEW_CHECKS

def record():
    return {'id':'C99-A001','feishu_record_id':'test-record','original_name':'Line space','standard_name':'Row Space',
    'artifact_version':'v1','final_title':'Row Space','learning_objective':'Explain row span','core_conclusion':'Row(A)=Col(Aᵀ)',
    'prompt':'Create a 30-second animation.','terminology':{'confirmed':True},'production':{'tool':'Remotion','dependencies':['react']},
    'reuse':{'status':'aligned','duration_seconds':30},'media':{'duration_seconds':30},
    'review':{'status':'passed','version':'v1','reviewer':'test fixture, not an actual review','reviewed_at':'fixture','evidence':['fixture'],'checks':dict.fromkeys(REVIEW_CHECKS,True)}}

class WorkflowTests(unittest.TestCase):
    def test_both_partial_success_orders(self):
        for failed in ['feishu','github']:
            e=record();calls=[];saved=[]
            def operation(channel,fail=False):
                def run(e):
                    calls.append(channel)
                    if fail:raise RuntimeError('injected failure; not external verification')
                    return {'url':'fixture'}
                return run
            ops={c:operation(c,c==failed) for c in ['feishu','github']}
            self.assertEqual(set(publish_channels(e,ops,lambda:saved.append(copy.deepcopy(e)))),{failed})
            self.assertEqual(len(saved),2)
            publish_channels(e,{c:operation(c) for c in ops},lambda:None)
            self.assertEqual(calls.count(failed),2);self.assertEqual(calls.count(next(c for c in ops if c!=failed)),1)
            publish_channels(e,{c:operation(c) for c in ops},lambda:None)
            self.assertEqual(len(calls),3)
    def test_new_and_revision_identity(self):
        e=record();items=[];upsert(items,e);upsert(items,e);self.assertEqual(len(items),1)
        revision={**e,'standard_name':'Row Space (revised explanation)','artifact_version':'v2'}
        upsert(items,revision);self.assertEqual(len(items),1);self.assertEqual(items[0]['id'],'C99-A001')
        with self.assertRaises(ValueError):upsert(items,{**revision,'id':'C99-A002'})
    def test_id_cannot_move_records(self):
        e=record()
        with self.assertRaises(ValueError):upsert([e],{**e,'feishu_record_id':'another-record'})

    def test_revision_retries_both_channels(self):
        e=record();calls=[];ops={c:lambda e,c=c:calls.append(c) for c in ['feishu','github']}
        publish_channels(e,ops,lambda:None);e['artifact_version']='v2';publish_channels(e,ops,lambda:None)
        self.assertEqual(len(calls),4)
    def test_review_not_inferred_from_file(self):
        e=record();e['review']={'status':'unreviewed'}
        with self.assertRaises(ValueError):validate(e)
    def test_duration_and_version_mismatch(self):
        e=record();validate(e);e['prompt']='Create a 15-second animation.'
        with self.assertRaises(ValueError):validate(e)
        e=record();e['player']='https://github.com/user-attachments/assets/fixture';e['player_version']='v0'
        with self.assertRaises(ValueError):validate(e)
    def test_renaming_does_not_create_duplicate(self):
        e=record();items=[e];upsert(items,{**e,'original_name':'Original source name','standard_name':'Correct term'})
        self.assertEqual(len(items),1)
if __name__=='__main__':unittest.main()
