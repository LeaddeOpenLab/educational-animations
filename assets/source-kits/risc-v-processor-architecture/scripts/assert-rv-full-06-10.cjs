const assert=require('node:assert/strict'),path=require('node:path'),fs=require('node:fs'),esbuild=require('esbuild'),Module=require('node:module'),React=require('react'),{renderToStaticMarkup}=require('react-dom/server');
const root=path.resolve(__dirname,'..');let checks=0;
const videos=fs.readdirSync(path.join(root,'src/videos')).filter(f=>/^rv(06|07|08|09|10)-.*\.tsx$/.test(f));
const files={};for(const file of videos){const code=esbuild.buildSync({entryPoints:[path.join(root,'src/videos',file)],bundle:true,platform:'node',format:'cjs',write:false,external:['react','react-dom','remotion']}).outputFiles[0].text;const m=new Module('full.cjs',module);m.paths=module.paths;m._compile(code,path.join(root,'full.cjs'));files[file.slice(0,4)]=m.exports.SCENES;}
function svg(id,frame){for(const sc of files[id]){if(frame<sc.dur){const h=renderToStaticMarkup(React.createElement(sc.Comp,{frame}));return h.slice(h.indexOf('<svg'));}frame-=sc.dur;}throw Error('out of range');}
const check=(condition,label)=>{assert.ok(condition,label);checks++;};
for(const [id,boundary] of [['rv06',450],['rv06',690],['rv07',330],['rv07',750],['rv08',240],['rv08',510],['rv08',690],['rv08',810],['rv09',300],['rv09',540],['rv10',270],['rv10',510],['rv10',660],['rv10',690],['rv10',720]])check(svg(id,boundary-1)!==svg(id,boundary),`${id}: actual SVG changes at${boundary}`);
check(svg('rv06',450).includes('0x110'),'Taken PC visible');check(svg('rv06',690).includes('0x104'),'Not taken PC visible');
check(svg('rv08',301).includes('20 / 1 / x6')&&svg('rv08',301).includes('7 / 5'),'Captured operands stay while upstream changes');
check(svg('rv09',360).includes('EX: 12 − 10 = 2'),'Forwarded SUB computes correct result');check(svg('rv09',600).includes('1100 XOR 1111 = 0011'),'Forwarded XOR computes correct bits');
check(svg('rv10',300).includes('BUBBLE')&&svg('rv10',300).includes('0x108'),'Bubble and held PC visible');check(svg('rv10',720).includes('EX: 42 + 3 = 45'),'Consumer resumes with load data');
for(const [id,list] of Object.entries(files)){check(list.reduce((n,s)=>n+s.dur,0)===(id==='rv10'?930:900),id+' correct duration');}
console.log(JSON.stringify({status:'PASS',checks,scope:'Full-scene state→actual SVG semantic bindings; no visual teaching approval'}));
