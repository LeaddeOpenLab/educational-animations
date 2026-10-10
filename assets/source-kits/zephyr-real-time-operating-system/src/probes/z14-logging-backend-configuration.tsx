import React from 'react';
import {COLORS as C} from '../theme';
import {ThreadLanes,PropertyTable,PacketQueue,ResourcePool,ClockTrace,PinTrace,ModuleGraph,InitTimeline} from '../components/Zephyr';
import {stateAt} from '../videos/z14-logging-backend-configuration.state';
export const Minimal=({frame}:{frame:number})=>{const st=stateAt(frame);return (<PacketQueue slots={st.slots} moving={st.moving} source="INFO filter · DEBUG discarded" target={st.output} detail={st.buffered?"ERROR buffered · caller has returned":"Enabled UART backend · deferred logging"}/>);};
