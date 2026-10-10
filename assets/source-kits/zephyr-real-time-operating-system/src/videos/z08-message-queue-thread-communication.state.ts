export const ramp=(f:number,s:number,d:number)=>Math.max(0,Math.min(1,(f-s)/d));
export const stateAt=(f:number)=>{const put=ramp(f,210,90),get=ramp(f,540,150);return {producer:f<420?42:99,slots:f<300||f>=690?['','','']:['42','',''],received:f>=690?42:null,moving:f>=210&&f<300?[{label:'copy 42',x:35,y:140+125*put}]:f>=540&&f<690?[{label:'copy 42',x:35+500*get,y:390+65*get}]:[]};};
