const assert=require('node:assert/strict'),path=require('node:path'),Module=require('node:module'),esbuild=require('esbuild'),React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
const entry=path.resolve(__dirname,'../src/videos/rv14-sv39-virtual-address-translation.tsx');
const built=esbuild.buildSync({entryPoints:[entry],bundle:true,platform:'node',format:'cjs',write:false,external:['react','react-dom','remotion']}).outputFiles[0].text;
const m=new Module(entry,module);m.filename=entry;m.paths=Module._nodeModulePaths(path.dirname(entry));m._compile(built,entry);
const scenes=m.exports.SCENES;
function image(f){let offset=0;for(const scene of scenes){if(f<offset+scene.dur)return renderToStaticMarkup(React.createElement(scene.Comp,{frame:f-offset}));offset+=scene.dur;}throw Error('out of range');}
for(const [f,ppn,next]of[[240,'0x80001','0x80001000'],[405,'0x80002','0x80002000'],[570,'0x12345','0x12345']]){
 assert(!image(f-1).includes('>'+ppn+'<'),`f${f-1}: premature PPN`);
 assert(image(f-1).includes('>pending<'));
 assert(image(f).includes('>'+ppn+'<'));
 assert(image(f).includes('translate(60,395)'));
 assert(image(f+20).includes('translate(280,443.8888888888889)'));
 const receiverBefore=image(f+44).match(/data-role="ppn-receiver"[^]*?<\/g>/)[0];assert(!receiverBefore.includes('>'+next+'<'));const receiverAfter=image(f+45).match(/data-role="ppn-receiver"[^]*?<\/g>/)[0];assert(receiverAfter.includes('>'+next+'<'));
 assert(image(f+45).includes('>'+next+'<'));
 assert(image(f+45).includes('data-role="ppn-receiver"'));
 assert(!image(f+45).includes('translate(555,505)'));
}
assert(image(750).includes('0x123451A8'));assert(image(900).includes('>0x5A<'));
console.log('rv14 FULL v2 PASS: pending read output; all 3 PPNs move from (60,395) through (280,443.89) into receiver (555,505); delivery supplies next base/leaf; offset-preserving PA and load retained.');
