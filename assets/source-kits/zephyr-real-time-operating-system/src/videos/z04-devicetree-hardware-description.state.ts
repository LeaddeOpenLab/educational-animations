export const ramp=(f:number,s:number,d:number)=>Math.max(0,Math.min(1,(f-s)/d));
export const stateAt=(f:number)=>{const overlay=f>=240,merged=f>=450,generated=f>=690;return {overlay,merged,generated,speed:merged?115200:9600,status:merged?'okay':'disabled',address:0x40002000};};
