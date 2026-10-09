export const RV14={va:0x404031a8,rootPpn:0x80000,pteSize:8,select:[240,405,570],handoffFrames:45,join:750,load:900};
export function rv14State(frame:number){
 const va=RV14.va,vpn=[Math.floor(va/2**30)%512,Math.floor(va/2**21)%512,Math.floor(va/2**12)%512],offset=va%4096;
 const memory:Record<number,number>={[0x80000008]:0x20000401,[0x80001010]:0x20000801,[0x80002018]:0x048d1443};
 let base:number|null=RV14.rootPpn*4096;
 const walk:{level:number;index:number;base:number|null;address:number|null;pte:number|null;nextPpn:number|null;leaf:boolean;valid:boolean;returned:boolean;delivered:boolean;transfer:number;nextBase:number|null;tokenX:number;tokenY:number}[]=[];
 for(let i=0;i<3;i++){
  const address:number|null=base===null?null:base+vpn[i]*RV14.pteSize;
  const pte:number|null=address===null?null:memory[address]??null;
  const returned:boolean=frame>=RV14.select[i]&&pte!==null;
  const nextPpn:number|null=returned?Math.floor(pte!/1024):null;
  const leaf:boolean=returned&&!!(pte!&10);const valid:boolean=returned&&!!(pte!&1);
  const transfer:number=returned?Math.max(0,Math.min(1,(frame-RV14.select[i])/RV14.handoffFrames)):0;
  const delivered:boolean=returned&&transfer===1;
  const nextBase:number|null=delivered&&!leaf&&valid?nextPpn!*4096:null;
  walk.push({level:2-i,index:vpn[i],base,address,pte,nextPpn,leaf,valid,returned,delivered,transfer,nextBase,tokenX:60+495*transfer,tokenY:395+110*transfer});
  base=nextBase;
 }
 const selectedLevel=frame<240?-1:frame<405?0:frame<570?1:2;
 const leafPpn=walk[2].nextPpn,pa=frame>=RV14.join&&walk[2].delivered&&leafPpn!==null?leafPpn*4096+offset:null;
 return {frame,va,vpn,offset,walk,selectedLevel,selectedAddress:selectedLevel<0?null:walk[selectedLevel].address,leafPpn,pa,loaded:frame>=900&&pa!==null,x10:frame>=900&&pa!==null?0x5a:null,offsetX:frame<660?730:730-350*Math.min(1,(frame-660)/90)};
}
