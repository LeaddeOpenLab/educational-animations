import React from 'react';
import {RiscBoard,MemoryWords,DataTokens} from '../components/RiscV';
import {COLORS} from '../theme';
import {rv14State} from './rv14-state';
const hex=(n:number|null)=>n===null?'pending':'0x'+n.toString(16).toUpperCase();
// Real read data stays pending until select; the returned PPN reaches the receiver
// over 45 frames. Only arrival supplies the next table base (or leaf PPN).
export const Rv14Probe=({frame}:{frame:number})=>{
 const s=rv14State(frame),i=frame<330?0:frame<480?1:2,row=s.walk[i];
 return <RiscBoard>
 <MemoryWords x={60} y={250} width={830} words={[{address:hex(row.address),value:hex(row.pte)}]} selectedAddress={row.returned?hex(row.address):undefined}/>
 <g data-role="ppn-receiver"><rect x={555} y={505} width={345} height={72} rx={12} fill="none" stroke={COLORS.result} strokeWidth={2} strokeDasharray={row.delivered?undefined:'7 5'}/>
 <text x={727.5} y={550} textAnchor="middle" fontSize={28} fill={COLORS.textStrong}>{row.delivered?hex(row.leaf?row.nextPpn:row.nextBase):!row.returned?'pending':''}</text>
 <text x={727.5} y={593} textAnchor="middle" fontSize={22} fill={COLORS.textMuted}>{row.leaf?'Leaf PPN ready':'Next base = PPN << 12'}</text></g>
 {!row.delivered&&<DataTokens tokens={[{label:row.returned?'':'Returned PPN',value:hex(row.nextPpn),x:row.tokenX,y:row.tokenY,width:345}]}/>}
 </RiscBoard>;
};
