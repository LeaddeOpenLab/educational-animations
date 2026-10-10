export const ramp=(f:number,s:number,d:number)=>Math.max(0,Math.min(1,(f-s)/d));
export const stateAt=(f:number)=>{const clock=f>=240,bus=f>=450,sensor=f>=630;return {clock,bus,sensor,init:f<240?0:f<450?1:f<630?2:3,read:f>=720&&sensor};};
