import React from 'react';
import {COLORS as C} from '../theme';
import {ThreadLanes,PropertyTable,PacketQueue,ResourcePool,ClockTrace,PinTrace,ModuleGraph,InitTimeline} from '../components/Zephyr';
import {stateAt} from '../videos/z03-kconfig-feature-selection.state';
export const Minimal=({frame}:{frame:number})=>{const st=stateAt(frame);return (<PropertyTable caption="Conceptual depends-on example" rows={[{key:"Request: LOGGER",value:st.request,active:true},{key:"Dependency: UART",value:st.uart?"y":"n",active:st.uart},{key:"Resolved LOGGER",value:st.logger?"y":"n",active:st.logger},{key:"autoconf.h",value:st.logger?"CONFIG_LOGGER=1":"LOGGER undefined",active:st.logger},{key:"logger object",value:st.compiled?"included":"absent",active:st.compiled}]} result={`Included example bytes: ${st.bytes}`}/>);};
