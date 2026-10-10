import React from 'react';
import {COLORS as C} from '../theme';
import {ThreadLanes,PropertyTable,PacketQueue,ResourcePool,ClockTrace,PinTrace,ModuleGraph,InitTimeline} from '../components/Zephyr';
import {stateAt} from '../videos/z02-thread-priority-and-preemption.state';
export const Minimal=({frame}:{frame:number})=>{const st=stateAt(frame);return (<ThreadLanes tasks={[{label:"Low · priority 5",value:`work ${st.lowWork.toFixed(0)}`,x:st.lowX,y:190},{label:"High · priority 1",value:st.highReady?"ready":"unready",x:st.highX,y:350,color:C.accent}]} running={st.current} trace="Preemptible threads · scheduler unlocked"/>);};
