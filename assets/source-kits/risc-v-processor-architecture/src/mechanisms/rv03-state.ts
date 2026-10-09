export const RV03={iWord:0xffc30293,sWord:0x00532623,bWord:0x00208863,signFrame:210,sJoinFrame:540,bJoinFrame:720};
export const signExtend=(v:number,bits:number)=>(v<<(32-bits))>>(32-bits);
export const decodeI=(w:number)=>signExtend(w>>>20,12);
export const decodeS=(w:number)=>signExtend(((w>>>25)<<5)|((w>>>7)&31),12);
export const decodeB=(w:number)=>signExtend(((w>>>31)<<12)|(((w>>>7)&1)<<11)|(((w>>>25)&63)<<5)|(((w>>>8)&15)<<1),13);
const bin=(v:number,n:number)=>v.toString(2).padStart(n,'0');
export function rv03State(frame:number){
 const iRaw=RV03.iWord>>>20,sign=RV03.iWord>>>31,sHigh=RV03.sWord>>>25,sLow=(RV03.sWord>>>7)&31;
 const bParts=[{label:'imm12',bits:1,value:bin(RV03.bWord>>>31,1)},{label:'imm11',bits:1,value:bin((RV03.bWord>>>7)&1,1)},{label:'imm10:5',bits:6,value:bin((RV03.bWord>>>25)&63,6)},{label:'imm4:1',bits:4,value:bin((RV03.bWord>>>8)&15,4)},{label:'imm0',bits:1,value:'0'}];
 const sProgress=Math.max(0,Math.min(1,(frame-480)/60)),bProgress=Math.max(0,Math.min(1,(frame-660)/60));
 return {iRaw,sign,iValue:decodeI(RV03.iWord),upperBits:frame>=210?bin(sign?0xfffff:0,20):'',iOutput:frame>=210?decodeI(RV03.iWord):null,sHigh,sLow,sProgress,sValue:decodeS(RV03.sWord),sOutput:frame>=540?decodeS(RV03.sWord):null,bParts,bProgress,bTokens:bParts.slice(0,4).map((q,i)=>({label:q.label,value:q.value,width:q.bits===6?220:150,x:[30,720,210,490][i]+([30,205,380,625][i]-[30,720,210,490][i])*bProgress,y:385+65*bProgress})),bLowZero:frame>=720,bValue:decodeB(RV03.bWord),bOutput:frame>=720?decodeB(RV03.bWord):null,
  sTokens:[{label:'imm[11:5]',value:bin(sHigh,7),x:30+230*sProgress,y:260},{label:'imm[4:0]',value:bin(sLow,5),x:730-270*sProgress,y:260}],iFields:[{label:'upper 20',bits:20,value:frame>=210?bin(sign?0xfffff:0,20):'—'},{label:'imm[11:0]',bits:12,value:bin(iRaw,12)}]};
}
