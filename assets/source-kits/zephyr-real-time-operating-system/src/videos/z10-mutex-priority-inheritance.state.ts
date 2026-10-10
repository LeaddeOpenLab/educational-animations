export const ramp=(f:number,s:number,d:number)=>Math.max(0,Math.min(1,(f-s)/d));
export const stateAt=(f:number)=>{const boost=f>=360&&f<630,transfer=ramp(f,630,90);return {boost,priority:boost?1:5,owner:f<630?'Low':'High',lowX:f<360?350:655-305*transfer,highX:f<630?45:45+610*transfer,current:f<330?'Low':f<360?'Medium':f<630?'Low':'High'};};
