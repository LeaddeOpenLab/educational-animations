"""Reuse existing same-meaning columns; add only missing fields."""
import json
import incremental_agent as agent
FIELDS={
'id':['Knowledge ID','Stable ID','知识点ID'], 'original_name':['Name','Original Name','原名称'],
'standard_name':['Standard English Name','标准英文名称'], 'objective':['Learning Objective','学习目标'],
'conclusion':['Core Conclusion','核心结论'], 'references':['References','参考来源'],
'final_title':['Title','Final Title'], 'prompt':['Prompt','Public Prompt'],
'duration':['Duration','实际时长'],'format':['Format'],'resolution':['Resolution'],
'version':['Artifact Version','产物版本'], 'production_status':['Production Status','制作状态'],
'review_status':['Review Status','审核状态'], 'review_record':['Review Record','审核记录'],
'revision_reason':['Revision Reason','返修原因'], 'feishu_status':['Feishu Writeback Status','飞书回写状态'],
'github_status':['GitHub Publish Status','GitHub发布状态'], 'github_url':['GitHub URL','GitHub页面地址'],
'published_at':['Published At','成功发布时间'], 'requirement':['Teaching Requirement','教学需求Prompt'], 'production':['Final Production Record','最终制作记录']}

def ensure_mapping(token,create=True):
    fields=agent.api(agent.table_path('fields?page_size=100'),token)['data']['items'];existing={x['field_name']:x for x in fields};mapping={}
    for key,names in FIELDS.items():
        name=next((n for n in names if n in existing),None)
        if not name:
            name=names[0]
            if create:agent.api(agent.table_path('fields'),token,{'field_name':name,'type':1})
        elif existing[name]['type']!=1:raise ValueError(f'Field {name} requires an explicit type adapter')
        mapping[key]=name
    return mapping

def values_for(e,m):
    media=e['media'];r=e.get('review',{})
    v={'id':e['id'],'original_name':e['original_name'],'standard_name':e['standard_name'],
       'objective':e['learning_objective'],'conclusion':e['core_conclusion'],'references':json.dumps(e.get('references',[]),ensure_ascii=False),
       'requirement':e.get('requirement_prompt',''),'production':json.dumps(e.get('production',{}),ensure_ascii=False),'final_title':e['final_title'],'prompt':e['prompt'],'duration':str(media['duration_seconds']),
       'format':media['format'],'resolution':f"{media['width']}x{media['height']}",'version':e['artifact_version'],
       'production_status':e['production']['status'],'review_status':r.get('status','unreviewed'),
       'review_record':json.dumps(r,ensure_ascii=False),'revision_reason':r.get('reason',e.get('production',{}).get('revision_reason',''))}
    return {m[k]:value for k,value in v.items()}
