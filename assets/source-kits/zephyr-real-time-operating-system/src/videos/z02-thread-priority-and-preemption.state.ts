export const ramp=(f:number,s:number,d:number)=>Math.max(0,Math.min(1,(f-s)/d));
export const stateAt=(f:number)=>{const wake=ramp(f,210,120),preempt=ramp(f,390,75),back=ramp(f,630,90);return {lowX:655-305*preempt+305*back,highX:45+305*wake+305*preempt-610*back,current:f<390?'Low':f<630?'High':'Low',highReady:f>=210&&f<630,lowWork:Math.min(40,f/10)+(f>=630?(f-630)/10:0)};};
