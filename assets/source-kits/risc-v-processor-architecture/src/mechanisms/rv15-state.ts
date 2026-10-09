export const RV15={accept:405,read:675,compare:810};
export function decodeMmio(address:number){if(address===0x10000000)return 'GPIO output';if(address===0x10000004)return 'GPIO status';if(address>=0x80000000&&address<=0x80000fff)return 'RAM';return 'unmapped';}
const ramp=(f:number,a:number,b:number)=>Math.max(0,Math.min(1,(f-a)/(b-a)));
export function rv15State(frame:number){
 const output=frame>=405?1:0,readPhase=frame>=540&&frame<750;
 const address=readPhase?0x10000004:0x10000000;
 return {frame,address,decoded:decodeMmio(address),offset:address-0x10000000,output,status:output,ram:55,x3:frame>=675?1:0,ledOn:output===1,ledRadius:output?32:14,pinY:output?260:330,requestX:readPhase?700-500*ramp(frame,580,675):90+530*ramp(frame,150,405),data:1,readPhase,fenceCompleted:frame>=570,comparisonRam:frame>=810?1:55};
}
