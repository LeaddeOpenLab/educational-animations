export const RV05={pc:0x200,word:0x00832283,base:0x1000,offset:8,rd:5,addressFrame:360,readFrame:510,commitFrame:810};
const memory=[{address:0x1000,value:7},{address:0x1004,value:19},{address:0x1008,value:42}];
export const hex=(v:number)=>'0x'+v.toString(16).toUpperCase();
export function rv05State(frame:number){
 const address=RV05.base+RV05.offset,readReady=frame>=510,committed=frame>=810,load=memory.find(w=>w.address===address)!.value;
 const p=Math.max(0,Math.min(1,(frame-510)/180));
 return {pc:committed?RV05.pc+4:RV05.pc,rdValue:committed?load:0,nextPc:RV05.pc+4,base:RV05.base,offset:RV05.offset,address:frame>=360?address:null,data:readReady?load:null,load,committed,readReady,pendingData:frame>=600&&!committed?load:null,
  values:[{index:5,value:committed?load:0},{index:6,value:hex(RV05.base)}],words:memory.map(w=>({address:hex(w.address),value:w.value})),selectedAddress:frame>=510?hex(address):undefined,
  dataToken:{label:committed?'Stored in x5':'Memory data',value:readReady?load:'—',x:680-620*p,y:325},cycleProgress:Math.max(0,Math.min(1,frame/810)),clock:committed?1:0};
}
