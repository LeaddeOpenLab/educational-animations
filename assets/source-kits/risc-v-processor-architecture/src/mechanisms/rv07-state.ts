export const memoryAddressState=(frame:number)=>{
 const base=0x2008,imm12=0xff8,signedOffset=(imm12&0x800)?imm12-0x1000:imm12;
 const isStore=frame>=420,ea=base+(isStore?4:signedOffset),loadDone=frame>=330,storeDone=frame>=750;
 const progress=Math.max(0,Math.min(1,(frame-(isStore?660:240))/90));
 return {frame,base,imm12,signedOffset,extendedOffset:signedOffset>>>0,isStore,ea,loadDone,storeDone,progress,data:isStore?99:42,
 registers:[{index:1,value:'0x2008'},{index:5,value:loadDone?42:0},{index:6,value:99}],
 words:[{address:'0x2000',value:42},{address:'0x2004',value:17},{address:'0x200C',value:storeDone?99:0}]};
};
