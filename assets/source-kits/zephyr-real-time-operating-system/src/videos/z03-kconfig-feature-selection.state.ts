export const ramp=(f:number,s:number,d:number)=>Math.max(0,Math.min(1,(f-s)/d));
export const stateAt=(f:number)=>{const uart=f>=450,logger=uart,compiled=logger&&f>=690;return {uart,logger,compiled,request:'y',bytes:compiled?2400:0};};
