export const RV04={a:12,b:5,addWord:0x007302b3,subWord:0x407302b3,xorWord:0x007342b3,addFrame:120,subFrame:330,xorFrame:570};
export function aluDecode(word:number,a:number,b:number){const opcode=word&127,funct3=(word>>>12)&7,funct7=word>>>25;
 if(opcode!==0x33)throw new Error('not R-type');
 if(funct3===0&&funct7===0)return {name:'ADD',result:(a+b)|0,symbol:'+'};
 if(funct3===0&&funct7===32)return {name:'SUB',result:(a-b)|0,symbol:'−'};
 if(funct3===4&&funct7===0)return {name:'XOR',result:a^b,symbol:'XOR'};
 throw new Error('unsupported control');
}
export function rv04State(frame:number){
 const word=frame>=570?RV04.xorWord:frame>=330?RV04.subWord:RV04.addWord;
 const op=aluDecode(word,RV04.a,RV04.b),ready=frame>=120;
 const bit=(n:number)=>Array.from({length:4},(_,i)=>(n>>>(3-i))&1);
 return {word,a:RV04.a,b:RV04.b,opcode:word&127,funct3:(word>>>12)&7,funct7:word>>>25,op:op.name,symbol:op.symbol,result:ready?op.result:null,aBits:bit(RV04.a),bBits:bit(RV04.b),resultBits:ready?bit(op.result):[],unitCount:ready?op.result:0,
  fields:[{label:'opcode',bits:7,value:(word&127).toString(2).padStart(7,'0')},{label:'funct3',bits:3,value:((word>>>12)&7).toString(2).padStart(3,'0')},{label:'funct7',bits:7,value:(word>>>25).toString(2).padStart(7,'0')}]};
}
