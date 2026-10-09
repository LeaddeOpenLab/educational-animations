const assert=require('node:assert/strict'),fs=require('node:fs');
const React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
const files=fs.readdirSync('src/videos').filter(f=>/^edge1[1-5]-.*\.tsx$/.test(f));
function frame(scenes,f){for(const s of scenes){if(f<s.dur)return renderToStaticMarkup(React.createElement(s.Comp,{frame:f}));f-=s.dur;}throw Error('outside timeline');}
for(const file of files){const scenes=require('../src/videos/'+file).SCENES;const n=Number(file.slice(4,6));const duration=scenes.reduce((s,x)=>s+x.dur,0);assert.ok(duration>=750&&duration<=1050);
 const html=frame(scenes,{11:780,12:755,13:775,14:755,15:735}[n]);
 if(n===11){assert.ok(frame(scenes,520).includes('(-1)² = 1')); assert.ok(html.includes('Mean = 1.00'));assert.ok(html.includes('RMS = 1.00'));assert.notEqual(frame(scenes,690),frame(scenes,710));}
 if(n===12){assert.ok(html.includes('index 4'));assert.ok(html.includes('after sample 7'));assert.notEqual(frame(scenes,339),frame(scenes,340));}
 if(n===13){assert.ok(html.includes('Dense sum: 1 + 4 = 5'));assert.ok(html.includes('2 crossings'));assert.ok(frame(scenes,520).includes('CPU: x + 1'))}
 if(n===14){assert.ok(html.includes('1.50'));assert.ok(html.includes('1.00'));assert.ok(frame(scenes,480).includes('1500 µJ'))}
 if(n===15){assert.ok(frame(scenes,435).includes('0.699'));assert.ok(frame(scenes,436).includes('0.701'));assert.ok(!frame(scenes,435).includes('0.70 &lt; 0.70')); assert.ok(frame(scenes,300).includes('unknown'));assert.ok(html.includes('0.70 ≥ 0.70'));assert.ok(frame(scenes,480).includes('OUTPUT'))}
 console.log(file,'full-scene bound values PASS',duration,'frames');
}
