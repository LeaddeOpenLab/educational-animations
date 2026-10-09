export type Variant = {kind: 'ok'; value: number} | {kind: 'err'; message: string};
export const examples: Variant[] = [{kind: 'ok', value: 42}, {kind: 'err', message: 'timeout'}];

export const narrowState = (frame: number) => {
  const checking = frame >= 45;
  const comparedOk = frame >= 85;
  const comparedErr = frame >= 125;
  const branch = frame >= 160 ? examples.filter((item) => item.kind === 'ok') : [];
  return {
    checking,
    comparedOk,
    comparedErr,
    branch,
    value: branch.length ? (branch[0] as Extract<Variant, {kind: 'ok'}>).value : null,
    sourceKinds: examples.map((item) => item.kind),
  };
};
