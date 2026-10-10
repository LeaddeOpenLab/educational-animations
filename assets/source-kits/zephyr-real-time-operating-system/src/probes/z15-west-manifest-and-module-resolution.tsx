import React from 'react';
import {COLORS as C} from '../theme';
import {ThreadLanes,PropertyTable,PacketQueue,ResourcePool,ClockTrace,PinTrace,ModuleGraph,InitTimeline} from '../components/Zephyr';
import {stateAt} from '../videos/z15-west-manifest-and-module-resolution.state';
export const Minimal=({frame}:{frame:number})=>{const st=stateAt(frame);return (<ModuleGraph modules={st.modules} progress={st.progress} resolved={st.resolved}/>);};
