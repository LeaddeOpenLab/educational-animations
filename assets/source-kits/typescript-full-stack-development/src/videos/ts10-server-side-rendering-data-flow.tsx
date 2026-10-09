import React from 'react';
import {AbsoluteFill,useCurrentFrame} from 'remotion';
import {alpha,COLORS,FONT} from '../theme';
import {HydrationDOM} from '../components/Mechanisms';
import {hydrationState} from '../previews/hydration-state';

const ease=(frame:number,a:number,b:number)=>Math.max(0,Math.min(1,(frame-a)/(b-a)));
const TopicMechanism:React.FC=()=>{
  const frame=Math.floor(useCurrentFrame()/2),s=hydrationState(frame),transfer=ease(frame,50,105),handler=ease(frame,130,170),click=ease(frame,210,235);
  const rows=[{tag:'h1',text:`Count ${s.count}`},{tag:'button',text:'Add'}];
  return <AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080">
    <text x="95" y="105" fill={COLORS.textStrong} fontFamily={FONT} fontSize="52" fontWeight="800">HTML paints first; hydration activates it</text>
    <rect x="100" y="235" width="590" height="470" rx="22" fill={alpha(COLORS.primary,.08)} stroke={COLORS.primary} strokeWidth="3"/>
    <text x="130" y="295" fill={COLORS.textStrong} fontFamily={FONT} fontSize="31">SERVER</text>
    {s.serverHtml&&<g>
      <text x="140" y="385" fill={COLORS.textMuted} fontFamily="monospace" fontSize="29">&lt;h1 id="n1"&gt;Count 2&lt;/h1&gt;</text>
      <text x="140" y="450" fill={COLORS.textMuted} fontFamily="monospace" fontSize="29">&lt;button id="n2"&gt;Add&lt;/button&gt;</text>
    </g>}
    <rect x="850" y="235" width="950" height="470" rx="22" fill={alpha(COLORS.result,.07)} stroke={COLORS.result} strokeWidth="3"/>
    <text x="895" y="295" fill={COLORS.textStrong} fontFamily={FONT} fontSize="31">BROWSER DOM</text>
    {s.serverHtml&&!s.browserPainted&&<g opacity={1-transfer*.3} transform={`translate(${transfer*670},${transfer*40})`}>
      <rect x="250" y="500" width="380" height="90" rx="16" fill={COLORS.primary}/>
      <text x="440" y="558" textAnchor="middle" fill={COLORS.bg0} fontFamily="monospace" fontSize="28">HTML: count 2</text>
    </g>}
    {s.browserPainted&&<g>
      <HydrationDOM x={1020} y={335} rows={rows} handlersAttached={s.handlersAttached} clicked={s.clicked}/>
      <text x="1045" y="648" fill={COLORS.textMuted} fontFamily="monospace" fontSize="24">node IDs: {s.nodeIds.join(' · ')}</text>
    </g>}
    {s.browserPainted&&!s.handlersAttached&&<text x="1190" y="765" fill={COLORS.warn} fontFamily="monospace" fontSize="26">button cannot handle clicks yet</text>}
    {frame>=130&&<g opacity={handler}>
      <path d="M 1560 735 C 1570 685, 1560 610, 1512 505" stroke={COLORS.accent} strokeWidth="5" fill="none" strokeDasharray="14 10"/>
      <text x="1330" y="800" fill={COLORS.accent} fontFamily="monospace" fontSize="27">attach onClick to n2</text>
    </g>}
    {frame>=210&&<g transform={`translate(${click*-205},${click*-115})`}>
      <path d="M 1720 620 L 1750 705 L 1775 675 L 1815 745 L 1840 730 L 1798 662 L 1835 655 Z" fill={COLORS.textStrong} stroke={COLORS.bg0} strokeWidth="6"/>
    </g>}
    <text x="105" y="910" fill={COLORS.textMuted} fontFamily={FONT} fontSize="31">{frame<40?'The browser has no content yet.':frame<100?'The server sends content-bearing HTML.':frame<170?'The existing DOM paints count 2 without a handler.':frame<235?'Hydration attaches a handler to button n2; nodes n1 and n2 remain.':'Clicking n2 updates count in the same h1 node n1.'}</text>
  </svg></AbsoluteFill>;
};


const T = { topic: 'Server-Side Rendering Data Flow', input: ['server sends visible HTML', 'client loads code and attaches handlers'], visualArgument: 'Hydration connects handlers to existing DOM', result: 'A click works after the handler attaches' };
const DESIGN_AUDIT = {
 visualArgument: 'Hydration connects handlers to existing DOM',
 motion: 'The central scene carries the exact data and state transitions from the checked mechanism implementation, slowed so each operation can be read.',
 example: T.input.join(' → '),
 antiTemplate: 'This topic retains its own data objects, cause, state changes, and result rather than a generic routing diagram.',
 sceneRationale: 'Three scenes fit this topic because the concrete input must first be read, the hydration connects handlers to existing dom process needs the long central interval, and the a click works after the handler attaches result needs a separate hold for comprehension.'
};
const TopicOpen:React.FC=()=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080">
  <text x="110" y="138" fill={COLORS.primary} fontFamily={FONT} fontSize="44">Server-Side Rendering Data Flow</text>
  <text x="110" y="290" fill={COLORS.textMuted} fontFamily={FONT} fontSize="30">CONCRETE INPUT</text>
  <text x="130" y="405" fill={COLORS.textStrong} fontFamily="monospace" fontSize="37" opacity={Math.min(1,Math.max(0,(f-12)/12))}>{'server sends visible HTML'}</text>
  <text x="130" y="497" fill={COLORS.textStrong} fontFamily="monospace" fontSize="37" opacity={Math.min(1,Math.max(0,(f-28)/12))}>{'client loads code and attaches handlers'}</text>
  <rect x="110" y="760" width="1700" height="5" fill={COLORS.accent} opacity={Math.min(1,f/60)}/>
 </svg></AbsoluteFill>;
};
const TopicClose:React.FC=()=>{
 const f=useCurrentFrame();
 return <AbsoluteFill style={{background:COLORS.bg0}}><svg data-k="figure" width="100%" height="100%" viewBox="0 0 1920 1080">
  <text x="105" y="160" fill={COLORS.primary} fontFamily={FONT} fontSize="38">Server-Side Rendering Data Flow</text>
  <text x="105" y="360" fill={COLORS.textStrong} fontFamily={FONT} fontSize="49">Hydration connects handlers to existing DOM</text>
  <path d="M 120 490 L 1750 490" stroke={COLORS.accent} strokeWidth="5" strokeDasharray="1630" strokeDashoffset={1630*(1-Math.min(1,f/38))}/>
  <text x="105" y="635" fill={COLORS.result} fontFamily={FONT} fontSize="43" opacity={Math.min(1,Math.max(0,(f-30)/18))}>A click works after the handler attaches</text>
 </svg></AbsoluteFill>;
};
export const SCENES = [
 {id:'input-10',Comp:TopicOpen,dur:130},
 {id:'mechanism-10',Comp:TopicMechanism,dur:600},
 {id:'result-10',Comp:TopicClose,dur:145},
];
