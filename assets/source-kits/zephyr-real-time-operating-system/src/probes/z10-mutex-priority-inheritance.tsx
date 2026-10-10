import React from 'react';
import {COLORS as C} from '../theme';
import {ThreadLanes,PropertyTable,PacketQueue,ResourcePool,ClockTrace,PinTrace,ModuleGraph,InitTimeline} from '../components/Zephyr';
import {stateAt} from '../videos/z10-mutex-priority-inheritance.state';
export const Minimal=({frame}:{frame:number})=>{const st=stateAt(frame);return (<ThreadLanes tasks={[{label:`Low · effective ${st.priority}`,value:`base 5 · ${st.owner==="Low"?"owns mutex":"unlocked"}`,x:st.lowX,y:150},{label:"High · priority 1",value:st.owner==="High"?"owns mutex":"waiting for lock",x:st.highX,y:320,color:C.accent},{label:"Medium · priority 3",value:"ready",x:350,y:430,color:C.alt}]} running={st.current} trace="Inheritance changes effective priority, not base"/>);};
