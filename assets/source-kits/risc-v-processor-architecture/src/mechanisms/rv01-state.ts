export const RV01={word:0x007302b3,changedWord:0x007304b3,decodeFrame:390,changeFrame:750};
const bin=(v:number,n:number)=>v.toString(2).padStart(n,'0');
export function rv01State(frame:number){
 const word=frame>=RV01.changeFrame?RV01.changedWord:RV01.word;
 const funct7=(word>>>25)&127,rs2=(word>>>20)&31,rs1=(word>>>15)&31,funct3=(word>>>12)&7,rd=(word>>>7)&31,opcode=word&127;
 const p=Math.max(0,Math.min(1,(frame-300)/90));
 return {word,funct7,rs2,rs1,funct3,rd,opcode,decoded:frame>=390,extractProgress:p,
  fields:[{label:'funct7',bits:7,value:bin(funct7,7)},{label:'rs2',bits:5,value:bin(rs2,5)},{label:'rs1',bits:5,value:bin(rs1,5)},{label:'funct3',bits:3,value:bin(funct3,3)},{label:'rd',bits:5,value:bin(rd,5)},{label:'opcode',bits:7,value:bin(opcode,7)}],
  tokens:[{label:'rs1',value:`x${rs1}`,x:370+(50-370)*p,y:170+150*p},{label:'rs2',value:`x${rs2}`,x:215+(365-215)*p,y:170+150*p},{label:'rd',value:`x${rd}`,x:580+(680-580)*p,y:170+150*p}],operation:opcode===0x33&&funct3===0&&funct7===0?'ADD':'invalid'};
}
