import React from 'react';
import {COLORS as C} from '../theme';
import {ThreadLanes,PropertyTable,PacketQueue,ResourcePool,ClockTrace,PinTrace,ModuleGraph,InitTimeline} from '../components/Zephyr';
import {stateAt} from '../videos/z11-timer-callback-and-deadline.state';
export const Minimal=({frame}:{frame:number})=>{const st=stateAt(frame);return (<ClockTrace time={st.time} deadline={st.deadline} callbacks={st.callbacks} ticks={st.ticks} sleep={null} description="Initial delay 30 · period 20 · illustrative time units"/>);};
