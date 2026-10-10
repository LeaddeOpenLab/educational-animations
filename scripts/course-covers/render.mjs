import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {bundle} from '@remotion/bundler';
import {openBrowser, renderStill} from '@remotion/renderer';
import sharp from 'sharp';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../..');
const manifest = JSON.parse(fs.readFileSync(path.join(here,'manifest.json')));
const resume = process.argv.includes('--resume');
const requested = new Set(process.argv.slice(2).filter(x=>x!=='--resume'));
const rows = requested.size ? manifest.filter(x=>requested.has(x.code)) : manifest;
const dataUrl = file => `data:image/${file.endsWith('.svg')?'svg+xml':'png'};base64,${fs.readFileSync(file).toString('base64')}`;
const brand = dataUrl(path.join(root,'assets/leadde-icon.svg'));
const serveUrl = await bundle({entryPoint:path.join(here,'cover-root.tsx'),outDir:path.join(root,'.workbuddy/course-cover-bundle'),publicDir:null});
const browserExecutable = process.env.REMOTION_BROWSER_EXECUTABLE;
const browser = await openBrowser('chrome', {browserExecutable});
const checkFile=path.join(root,'.workbuddy/course-cover-checks.json');
const savedChecks=fs.existsSync(checkFile)?JSON.parse(fs.readFileSync(checkFile)):[];
const checks=(resume||requested.size)?savedChecks.filter(x=>x.passed):[];
try {
  for(const row of rows) {
    if(resume&&checks.some(x=>x.code===row.code&&x.passed)&&fs.existsSync(path.join(root,row.output)))continue;
    const inputProps={...row,diagram:dataUrl(path.join(root,row.figure)),brand};
    const auditOutput=path.join(root,'.workbuddy',`course-${row.code}-audit.png`);
    const auditProps={...inputProps,audit:true};
    await renderStill({serveUrl,composition:{id:'audit',width:1000,height:900,fps:30,durationInFrames:1,props:auditProps},inputProps:auditProps,output:auditOutput,imageFormat:'png',puppeteerInstance:browser,logLevel:'error'});
    const {data,info}=await sharp(auditOutput).removeAlpha().raw().toBuffer({resolveWithObject:true});
    let left=1000,top=900,right=-1,bottom=-1;
    for(let y=0;y<900;y++)for(let x=0;x<1000;x++){
      const i=(y*1000+x)*info.channels;
      if(Math.max(data[i],data[i+1],data[i+2])>0){left=Math.min(left,x);right=Math.max(right,x);top=Math.min(top,y);bottom=Math.max(bottom,y);}
    }
    const width=right-left+1,height=bottom-top+1,dx=(left+right+1)/2-500,dy=(top+bottom+1)/2-450;
    const passed=left>=178&&right<=822&&top>=138&&bottom<=762&&width>=280&&height>=280&&Math.abs(dx)<=20&&Math.abs(dy)<=30;
    const check={code:row.code,topic_ids:row.topics.map(x=>x.id),bbox:[left,top,right,bottom],width,height,dx,dy,passed};
    const previous=checks.findIndex(x=>x.code===row.code);
    if(previous>=0)checks.splice(previous,1);
    checks.push(check);
    if(!passed)throw new Error(`Figure geometry: ${JSON.stringify(check)}`);
    await renderStill({serveUrl,composition:{id:'cover',width:1920,height:1080,fps:30,durationInFrames:1,props:inputProps},inputProps,output:path.join(root,row.output),imageFormat:'jpeg',jpegQuality:88,puppeteerInstance:browser,logLevel:'error'});
    console.log(`Rendered ${row.code}: ${row.course}`);
  }
} finally {
  await browser.close({silent:true});
  fs.writeFileSync(checkFile,JSON.stringify(checks,null,2)+'\n');
}
