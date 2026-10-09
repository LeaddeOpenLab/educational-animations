const assert=require('node:assert/strict');
const path=require('node:path');
const Module=require('node:module');
const esbuild=require('esbuild');
function load(rel){const entry=path.resolve(__dirname,'..',rel);const built=esbuild.buildSync({entryPoints:[entry],bundle:true,platform:'node',format:'cjs',write:false,external:['react','react-dom','remotion']}).outputFiles[0].text;const m=new Module(entry,module);m.filename=entry;m.paths=Module._nodeModulePaths(path.dirname(entry));m._compile(built,entry);return m.exports;}
const React=require('react');const{renderToStaticMarkup}=require('react-dom/server');
const{rv14State:s}=load('src/mechanisms/rv14-state.ts');
assert.deepEqual(s(0).vpn,[1,2,3]);assert.equal(s(0).offset,0x1a8);
for(const [i,f,ppn,address] of [[0,240,0x80001,0x80000008],[1,405,0x80002,0x80001010],[2,570,0x12345,0x80002018]]){
 assert.equal(s(f-1).walk[i].nextPpn,null,`level${i} no premature read data`);
 assert.equal(s(f).walk[i].nextPpn,ppn);assert.equal(s(f+1).walk[i].nextPpn,ppn);
 assert.equal(s(f).walk[i].address,address);assert.equal(s(f).walk[i].tokenX,60);assert.equal(s(f).walk[i].tokenY,395);assert.equal(s(f+45).walk[i].tokenX,555);assert.equal(s(f+45).walk[i].tokenY,505);assert(s(f+20).walk[i].tokenX>60&&s(f+20).walk[i].tokenX<555);assert.equal(s(f).walk[i].transfer,0);assert(s(f+20).walk[i].transfer>0);
 assert.equal(s(f+44).walk[i].delivered,false);assert.equal(s(f+45).walk[i].delivered,true);
 if(i<2){assert.equal(s(f+44).walk[i+1].base,null);assert.equal(s(f+45).walk[i+1].base,ppn*4096);assert.equal(s(f+45).walk[i].nextBase,ppn*4096);}
}
assert.equal(s(569).walk[2].leaf,false);assert.equal(s(570).walk[2].leaf,true);assert.equal(s(749).pa,null);assert.equal(s(750).pa,0x123451a8);assert.equal(s(750).pa%4096,s(0).offset);assert.equal(s(900).x10,0x5a);
const{Rv14Probe:P}=load('src/mechanisms/rv14-probe.tsx');
for(const [f,ppn]of[[240,'0x80001'],[405,'0x80002'],[570,'0x12345']]){
 const before=renderToStaticMarkup(React.createElement(P,{frame:f-1})),at=renderToStaticMarkup(React.createElement(P,{frame:f}));
 assert(!before.includes('>'+ppn+'<'));assert(at.includes('>'+ppn+'<'));assert.notEqual(at,renderToStaticMarkup(React.createElement(P,{frame:f+20})));assert(at.includes('translate(60,395)'));const arrived=renderToStaticMarkup(React.createElement(P,{frame:f+45}));assert(!arrived.includes('translate(555,505)'));assert(arrived.includes('data-role="ppn-receiver"'));assert(arrived.includes('>'+('0x'+(f===570?0x12345:s(f+45).walk[f===240?0:1].nextBase).toString(16).toUpperCase())+'<'));
}
console.log('rv14 v2 PASS: all3reads return noPPN before boundary, decodedPPN at boundary, actualtoken transfer, delivery-derived nextbase, leaf stop and preservedoffset');
