export const stateAt = (frame: number) => {
  const importRecorded=frame>=270,loanRecorded=frame>=570;
  const accounts=[{name:'Current account',items:importRecorded?[{label:'Machinery import',value:-100}]:[]},{name:'Financial account',items:loanRecorded?[{label:'Foreign loan',value:100}]:[]}];
  const net=accounts.flatMap(a=>a.items).reduce((s,x)=>s+x.value,0);
  return {accounts,net,importRecorded,loanRecorded};
};
