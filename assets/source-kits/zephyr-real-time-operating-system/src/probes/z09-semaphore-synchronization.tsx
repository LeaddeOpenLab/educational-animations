import React from 'react';
import {COLORS as C} from '../theme';
import {ThreadLanes,PropertyTable,PacketQueue,ResourcePool,ClockTrace,PinTrace,ModuleGraph,InitTimeline} from '../components/Zephyr';
import {stateAt} from '../videos/z09-semaphore-synchronization.state';
export const Minimal=({frame}:{frame:number})=>{const st=stateAt(frame);return (<ResourcePool values={st.values} count={st.count} waiting={st.waiting} token={st.token} caption={st.awake?`Consumer resumed · events handled ${st.processed}`:"Binary semaphore · direct waiter handoff"}/>);};
