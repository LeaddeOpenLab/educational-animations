import React from 'react';
import {COLORS as C} from '../theme';
import {ThreadLanes,PropertyTable,PacketQueue,ResourcePool,ClockTrace,PinTrace,ModuleGraph,InitTimeline} from '../components/Zephyr';
import {stateAt} from '../videos/z06-gpio-callback-and-interrupt-handling.state';
export const Minimal=({frame}:{frame:number})=>{const st=stateAt(frame);return (<PinTrace {...st}/>);};
