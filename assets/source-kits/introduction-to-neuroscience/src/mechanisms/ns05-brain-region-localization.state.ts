export const localizationPairs = [
  {task:'Vision',lobe:'occipital',x:735,y:335,from:{x:800,y:100},at:150,end:240},
  {task:'Hearing',lobe:'temporal',x:345,y:520,from:{x:100,y:650},at:270,end:360},
  {task:'Movement',lobe:'frontal',x:430,y:240,from:{x:120,y:100},at:420,end:510},
  {task:'Touch',lobe:'parietal',x:540,y:170,from:{x:780,y:650},at:540,end:630},
];
export const localizationState=(frame:number)=>{
  const pairs=localizationPairs.map(p=>{const progress=Math.max(0,Math.min(1,(frame-p.at)/(p.end-p.at)));return {...p,progress,assigned:frame>=p.end,position:{x:p.from.x+(p.x-p.from.x)*progress,y:p.from.y+(p.y-p.from.y)*progress}};});
  const started=pairs.filter(p=>frame>=p.at);const selected=started[started.length-1];
  return {pairs,selectedLobe:selected?.lobe,assignedPairs:pairs.filter(p=>p.assigned),networkLinks:frame>=720?[[0,2],[2,3]]:[],combinedTask:frame>=720};
};
