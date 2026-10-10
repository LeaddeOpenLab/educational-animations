import React from 'react';
import {COLORS as C} from '../theme';
import {ThreadLanes,PropertyTable,PacketQueue,ResourcePool,ClockTrace,PinTrace,ModuleGraph,InitTimeline} from '../components/Zephyr';
import {stateAt} from '../videos/z12-kernel-tickless-idle.state';
export const Minimal=({frame}:{frame:number})=>{const st=stateAt(frame);return (<ClockTrace time={st.time} deadline={st.deadline} ticks={st.ticks} callbacks={st.callbacks} sleep={st.sleep} description={`Accounted logical time: ${st.accounted}`}/>);};
