import React from 'react';
import {COLORS as C} from '../theme';
import {ThreadLanes,PropertyTable,PacketQueue,ResourcePool,ClockTrace,PinTrace,ModuleGraph,InitTimeline} from '../components/Zephyr';
import {stateAt} from '../videos/z08-message-queue-thread-communication.state';
export const Minimal=({frame}:{frame:number})=>{const st=stateAt(frame);return (<PacketQueue slots={st.slots} moving={st.moving} source={`Producer buffer: ${st.producer}`} target={`Receiver: ${st.received===null?"empty":st.received}`} detail="put copies bytes · get receives oldest message"/>);};
