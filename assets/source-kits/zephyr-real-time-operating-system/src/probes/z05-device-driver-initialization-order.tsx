import React from 'react';
import {COLORS as C} from '../theme';
import {ThreadLanes,PropertyTable,PacketQueue,ResourcePool,ClockTrace,PinTrace,ModuleGraph,InitTimeline} from '../components/Zephyr';
import {stateAt} from '../videos/z05-device-driver-initialization-order.state';
export const Minimal=({frame}:{frame:number})=>{const st=stateAt(frame);return (<InitTimeline clock={st.clock} bus={st.bus} sensor={st.sensor} read={st.read}/>);};
