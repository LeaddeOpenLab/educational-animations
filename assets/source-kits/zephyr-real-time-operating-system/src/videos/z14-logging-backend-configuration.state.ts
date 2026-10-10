export const ramp=(f:number,s:number,d:number)=>Math.max(0,Math.min(1,(f-s)/d));
export const stateAt=(f:number)=>{const moved=ramp(f,540,150);return {slots:f>=360&&f<690?['ERROR','','']:['','',''],moving:f>=540&&f<690?[{label:'ERROR',x:35+500*moved,y:390+65*moved}]:[],output:f>=690?'UART: ERROR':'UART: no output',debug:false,buffered:f>=360&&f<690};};
