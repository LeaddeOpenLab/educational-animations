import React from 'react';
import {COLORS as C} from '../theme';
import {ThreadLanes,PropertyTable,PacketQueue,ResourcePool,ClockTrace,PinTrace,ModuleGraph,InitTimeline} from '../components/Zephyr';
import {stateAt} from '../videos/z13-memory-slab-allocation.state';
export const Minimal=({frame}:{frame:number})=>{const st=stateAt(frame);return (<ResourcePool values={st.owners} count={st.free} waiting={st.request} token={st.transfer>0&&st.transfer<1?{label:"D allocates",x:600-260*st.transfer,y:290-190*st.transfer}:null} caption="Fixed-size blocks · 64 bytes each"/>);};
