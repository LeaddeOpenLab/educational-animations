const assert=require('node:assert/strict');
const React=require('react');
const {renderToStaticMarkup}=require('react-dom/server');
const p=require('../src/mechanisms/edge01-pipeline.tsx');
const q=require('../src/mechanisms/edge02-quantization.tsx');
const c=require('../src/mechanisms/edge03-calibration.tsx');
const h=require('../src/mechanisms/edge04-per-channel.tsx');
const m=require('../src/mechanisms/edge05-mac.tsx');
const near=(actual,expected)=>assert.ok(Math.abs(actual-expected)<1e-9,`${actual} != ${expected}`);
assert.equal(p.pipelineState(29).count,0);assert.equal(p.pipelineState(30).count,1);assert.equal(p.pipelineState(31).count,1);
assert.deepEqual(p.pipelineState(70).visible,[0,.5,-.5]);assert.deepEqual(p.pipelineState(90).visible,[0,.5,-.5,1]);near(p.pipelineState(100).rms,Math.sqrt(.375));
assert.deepEqual(q.quantizationState(0).positions,q.quantizationConstants.values);
assert.equal(q.quantizationState(45).mix,.5);assert.deepEqual(q.quantizationState(60).entries.map(x=>x.integer),[-6,-2,6]);
assert.equal(q.quantizationState(89).clipping,false);assert.equal(q.quantizationState(90).clipping,true);assert.equal(q.quantizationState(91).entries[0].integer,127);
near(q.quantizationState(105).positions[0],13.5);near(q.quantizationState(120).positions[0],13);assert.equal(q.quantizationState(120).entries[0].clipped,true);
assert.equal(c.calibrationState(0).range.max,0);assert.equal(c.calibrationState(59).range.max,.4);assert.equal(c.calibrationState(60).range.max,1);assert.equal(c.calibrationState(61).range.max,1);
assert.equal(c.calibrationState(90).range.max,2);near(c.calibrationState(135).positions[0],1.5);near(c.calibrationState(150).positions[0],1);near(c.calibrationState(150).positions[1],2);
assert.deepEqual(h.channelState(0).entries[0].map(x=>x.integer),[1,1,3]);assert.equal(h.channelState(89).separate,false);assert.equal(h.channelState(90).separate,true);assert.equal(h.channelState(91).separate,true);
assert.deepEqual(h.channelState(120).entries[0].map(x=>x.integer),[32,64,127]);assert.ok(h.channelState(120).means[0]<h.channelState(0).means[0]);near(h.channelState(0).scales[1],h.channelState(120).scales[1]);
assert.deepEqual(m.quantizedMacState(0).centered,[2,4,1]);assert.deepEqual(m.quantizedMacState(0).products,[4,-4,3]);assert.equal(m.quantizedMacState(29).accumulator,0);assert.equal(m.quantizedMacState(30).accumulator,4);assert.equal(m.quantizedMacState(31).accumulator,4);assert.equal(m.quantizedMacState(59).accumulator,4);assert.equal(m.quantizedMacState(60).accumulator,0);assert.equal(m.quantizedMacState(61).accumulator,0);assert.equal(m.quantizedMacState(90).accumulator,3);near(m.quantizedMacState(90).real,.06);assert.equal(m.quantizedMacState(90).output.integer,4);
for(const [id,Comp,a,b] of [['edge01',p.PipelineCore,29,90],['edge02',q.QuantizationCore,90,120],['edge03',c.CalibrationCore,120,150],['edge04',h.ChannelCore,89,90],['edge05',m.MacCore,59,60]]){
 const before=renderToStaticMarkup(React.createElement(Comp,{frame:a})),after=renderToStaticMarkup(React.createElement(Comp,{frame:b}));
 assert.notEqual(before,after,id+' rendered SVG unchanged');assert.ok(before.includes('<svg')&&after.includes('<svg'));
 console.log(id+' PASS: before/mid/after and boundary states; same-state SVG changes');
}
