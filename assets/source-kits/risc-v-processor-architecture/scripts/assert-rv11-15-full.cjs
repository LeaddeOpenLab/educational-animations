const assert=require('node:assert/strict'),path=require('node:path'),Module=require('node:module'),esbuild=require('esbuild'),React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
const fs=require('node:fs');
const videos=fs.readdirSync(path.resolve(__dirname,'../src/videos'));
function load(n){const file=videos.find(f=>f.startsWith(`rv${n}-`));const entry=path.resolve(__dirname,'../src/videos',file);const built=esbuild.buildSync({entryPoints:[entry],bundle:true,platform:'node',format:'cjs',write:false,external:['react','react-dom','remotion']}).outputFiles[0].text;const m=new Module(entry,module);m.filename=entry;m.paths=Module._nodeModulePaths(path.dirname(entry));m._compile(built,entry);return m.exports.SCENES;}
const all={};for(const n of[11,12,13,14,15])all[n]=load(n);
function image(n,f){let offset=0;for(const scene of all[n]){if(f<offset+scene.dur)return renderToStaticMarkup(React.createElement(scene.Comp,{frame:f-offset}));offset+=scene.dur;}throw Error('out of range');}
assert(!image(11,420).includes('ADDI 99'));assert(image(11,359).includes('ADDI 99'));assert(image(11,780).includes('>42<'));
assert(image(12,240).includes('>0x104<'));assert(image(12,240).includes('>0x800<'));assert(image(12,465).includes('>0x108<'));assert(image(12,810).includes('>9<'));
assert(image(13,240).includes('translate(165,80)'));assert(image(13,480).includes('translate(165,220)'));assert(image(13,480).includes('>00<'));
for(const [f,ppn,next]of[[240,'0x80001','0x80001000'],[405,'0x80002','0x80002000'],[570,'0x12345','0x12345']]){assert(!image(14,f-1).includes('>'+ppn+'<'));assert(image(14,f).includes('>'+ppn+'<'));assert(image(14,f+45).includes('>'+next+'<'));assert.notEqual(image(14,f),image(14,f+20));}
assert(image(14,240).includes('0x80000008'));assert(image(14,405).includes('0x80001010'));assert(image(14,570).includes('0x80002018'));assert(image(14,750).includes('0x123451A8'));assert(image(14,900).includes('>0x5A<'));
assert(image(15,404).includes('r="14"'));assert(image(15,405).includes('r="32"'));assert(image(15,405).includes('V360'));assert(image(15,675).includes('Status → x3'));
for(const n of[11,12,13,14,15]){const scenes=all[n];let offset=0;const renders=[];for(const s of scenes){renders.push(image(n,offset+Math.min(s.dur-1,75)));offset+=s.dur;}assert.equal(new Set(renders).size,scenes.length);console.log(`rv${n} FULL PASS: ${scenes.length} independent scenes, ${offset}frames, tested real scene state bindings`);}
