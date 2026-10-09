const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),esbuild=require('esbuild'),React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
const root=path.resolve(__dirname,'..'),batch=JSON.parse(fs.readFileSync(path.resolve(root,'../../.workbuddy/batch-20261009-risc-v-status.json'),'utf8'));let checks=0;
for(const item of batch.items.slice(0,5)){
 const id=item.video_id.slice(0,4),out=path.join(root,'out/b1',id,'full.cjs');
 esbuild.buildSync({entryPoints:[item.tsx_path],outfile:out,bundle:true,platform:'node',format:'cjs',external:['react','react-dom','remotion'],logLevel:'silent'});
 const {SCENES}=require(out),record=JSON.parse(fs.readFileSync(item.l3_path,'utf8'));
 assert.equal(SCENES.reduce((n,s)=>n+s.dur,0),900);checks++;
 assert.deepEqual(SCENES.map(s=>s.id),record.production.scenes.map(s=>s.id));checks++;
 const draw=frame=>{let start=0;for(const scene of SCENES){if(frame<start+scene.dur)return renderToStaticMarkup(React.createElement(scene.Comp,{frame:frame-start}));start+=scene.dur;}throw new Error('out of range');};
 for(const risk of record.production.risk_moments){const f=Math.round(risk.time_seconds*30);const a=draw(f-1),b=draw(f),c=draw(f+1);assert.ok(a.includes('<svg')&&b.includes('<svg')&&c.includes('<svg'));checks++;assert.notEqual(a,b,`${id} ${risk.id} actual full frame change`);checks++;}
 if(id==='rv01')for(const f of [749,750,751,850]){assert.equal(draw(f).match(/>rd<\/text><text[^>]*>([^<]+)<\/text>/)?.[1],f<750?'00101':'01001','top rendered rd bits '+f);checks++;}
 const expected={rv01:[749,750,'00101','01001'],rv02:[599,600,'waiting for edge','13'],rv03:[209,210,'Upper bits are not filled yet.','0xFFFFFFFC'],rv04:[569,570,'await the XOR selection','1001'],rv05:[809,810,'0x200','0x204']}[id];
 assert.ok(draw(expected[0]).includes(expected[2]),id+' before content');assert.ok(draw(expected[1]).includes(expected[3]),id+' after content');checks+=2;
 console.log(id+' full-source state→scene→SVG binding and actual risk changes PASS');
}
console.log(JSON.stringify({checks,status:'PASS',scope:'full-source technical binding only; teaching pending'}));
