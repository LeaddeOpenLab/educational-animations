export const ramp=(f:number,s:number,d:number)=>Math.max(0,Math.min(1,(f-s)/d));
export const stateAt=(f:number)=>{const handoff=ramp(f,420,150);return {count:0,waiting:f>=180&&f<570?'Consumer blocked in take':'',values:['count = 0','limit = 1','ISR event'],token:f>=420&&f<570?{x:630-480*handoff,y:250+190*handoff,label:'event'}:null,processed:f>=630?1:0,awake:f>=570};};
