export const ramp=(f:number,s:number,d:number)=>Math.max(0,Math.min(1,(f-s)/d));
export const stateAt=(f:number)=>{const level=f>=390?1:0,callback=ramp(f,390,180),count=f>=570?1:0;return {level,edge:420,callback,mask:3,count};};
