type Bundle={a?:number;b?:number;result?:number;rd:number;write:number};
export const latchState=(frame:number)=>{
 const captured=frame>=240,computed=frame>=450,result=7+5;
 const input:Bundle=frame>=300?{a:20,b:1,rd:6,write:1}:{a:7,b:5,rd:5,write:1};
 const idex:Bundle|null=captured?{a:7,b:5,rd:5,write:1}:null;
 const exmem:Bundle|null=frame>=510?{result,rd:5,write:1}:null;
 const memwb:Bundle|null=frame>=690?{result,rd:5,write:1}:null;
 return {frame,input,idex,exmem,memwb,computed,result:computed?result:null,clockEdge:[240,510,690,810].includes(frame),
 transfer:Math.max(0,Math.min(1,(frame-180)/60)),
 registers:[{index:5,value:frame>=810?result:0},{index:6,value:0}]};
};
