import React from 'react';
import {COLORS as C} from '../theme';
import {ThreadLanes,PropertyTable,PacketQueue,ResourcePool,ClockTrace,PinTrace,ModuleGraph,InitTimeline} from '../components/Zephyr';
import {stateAt} from '../videos/z07-work-queue-deferred-processing.state';
export const Minimal=({frame}:{frame:number})=>{const st=stateAt(frame);return (<PacketQueue slots={st.slots} moving={st.moving} source={st.source} target={st.target} detail={`Completed handlers: ${st.done}`}/>);};
