const assert=require('node:assert/strict');
const React=require('react');
const {renderToStaticMarkup}=require('react-dom/server');
const videos={one:require('../src/videos/edge01-edge-inference-pipeline-from-sensor-to-result.tsx'),three:require('../src/videos/edge03-calibration-dataset-for-post-training-quantization.tsx'),four:require('../src/videos/edge04-per-channel-weight-quantization.tsx'),five:require('../src/videos/edge05-quantized-multiply-and-accumulate.tsx')};
const render=(key,id,frame)=>renderToStaticMarkup(React.createElement(videos[key].SCENES.find(x=>x.id===id).Comp,{frame}));
for(const f of [50,79,80,81,110,150]){const svg=render('one','infer',f);assert.ok(svg.includes('>0.23<')&&svg.includes('>0.77<'),'Actual score labels remain normalized at local frame '+f);}
for(const f of [60,70,89]){const svg=render('three','missing',f);assert.ok(svg.includes('clipping input'),'Moving value has transitional label');assert.ok(!svg.includes('stored real'),'No out-of-range moving value called stored');}
for(const f of [90,91,180]){const svg=render('three','missing',f);assert.ok(svg.includes('stored real 1.00')&&svg.includes('stored real 2.00'),'Stored labels derive from saturated outputs');}
for(const f of [50,89,90,91,110]){const svg=render('four','shared',f);assert.equal((svg.match(/code 1 → 0.0157/g)||[]).length,2,'Both code1 reconstructions identical at frame '+f);}
const svg=render('five','accumulate',134);const transforms=[...svg.matchAll(/translate\(([-\d.]+),([-\d.]+)\)/g)].map(x=>[+x[1],+x[2]]);assert.ok(transforms.length,'Product token is rendered');assert.ok(transforms.every(x=>x[1]+32<390),'Token lower edge stays above accumulator text top');
console.log('PASS: full-scene SVG verifies normalized scores, storage-label semantics, exact reconstruction labels and token-to-label clearance.');
