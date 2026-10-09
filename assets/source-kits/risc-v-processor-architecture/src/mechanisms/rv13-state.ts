export const RV13={trap:240,mret:480};
export type Privilege='U'|'S'|'M';
export function rv13State(frame:number){
 let mode:Privilege='S',mpp:Privilege='U',mie=1,mpie=0;
 if(frame>=RV13.trap){const previous=mode;mpp=previous;mpie=mie;mie=0;mode='M';}
 if(frame>=RV13.mret){const restore=mpp;mie=mpie;mode=restore;mpie=1;mpp='U';}
 const modeBits:{[k in Privilege]:string}={U:'00',S:'01',M:'11'};
 return {frame,mode,mpp,mie,mpie,mppBits:modeBits[mpp],hartY:{M:80,S:220,U:360}[mode],snapshots:[{mode:'S',MPP:'U',MIE:1,MPIE:0},{mode:'M',MPP:'S',MIE:0,MPIE:1},{mode:'S',MPP:'U',MIE:1,MPIE:1}]};
}
