import React from 'react';
import {COLORS as C} from '../theme';
import {ThreadLanes,PropertyTable,PacketQueue,ResourcePool,ClockTrace,PinTrace,ModuleGraph,InitTimeline} from '../components/Zephyr';
import {stateAt} from '../videos/z04-devicetree-hardware-description.state';
export const Minimal=({frame}:{frame:number})=>{const st=stateAt(frame);return (<PropertyTable caption="Board UART node + application overlay" rows={[{key:"reg address",value:`0x${st.address.toString(16)}`,active:true},{key:"overlay speed",value:st.overlay?"115200":"not applied",active:st.overlay},{key:"merged status",value:st.status,active:st.merged},{key:"merged current-speed",value:String(st.speed),active:st.merged},{key:"generated speed macro",value:st.generated?String(st.speed):"pending",active:st.generated}]} result="Hardware data is resolved at build time"/>);};
