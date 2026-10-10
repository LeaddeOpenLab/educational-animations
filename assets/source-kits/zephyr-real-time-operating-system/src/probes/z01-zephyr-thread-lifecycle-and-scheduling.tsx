import React from 'react';
import {COLORS as C} from '../theme';
import {ThreadLanes,PropertyTable,PacketQueue,ResourcePool,ClockTrace,PinTrace,ModuleGraph,InitTimeline} from '../components/Zephyr';
import {stateAt} from '../videos/z01-zephyr-thread-lifecycle-and-scheduling.state';
export const Minimal=({frame}:{frame:number})=>{const st=stateAt(frame);return (<ThreadLanes tasks={[{label:"A",value:st.sleeping?`sleep: ${st.remaining}f`:st.started?"ready = true":"not started",x:st.x,y:190}]} running={st.running?"A":"idle"} trace="Start → sleep → timeout → ready"/>);};
