export const stateAt=(f:number)=>{
  const push=f<15?3:6;
  const drag=f<15?3:0;
  const mass=f<40?2:4;
  const netForce=push-drag;
  const acceleration=netForce/mass;
  const displacement=f<15?0:.5*acceleration*((Math.min(f,57)-15)/30)**2;
  const pair=f>=57?{onA:6,onB:-6}:null;
  return {push,drag,mass,netForce,acceleration,bodyX:1010+Math.min(f,57)*1.2+95*displacement,pair};
};
