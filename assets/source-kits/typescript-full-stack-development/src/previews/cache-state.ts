export const cacheState = (frame: number) => {
  const serverVersion = frame >= 60 ? 2 : 1;
  const cacheVersion = frame >= 165 ? 2 : 1;
  const consumerVersion = frame >= 210 ? 2 : 1;
  return {
    serverVersion,
    serverCount: serverVersion === 1 ? 2 : 3,
    cacheVersion,
    cacheCount: cacheVersion === 1 ? 2 : 3,
    consumerVersion,
    consumerCount: consumerVersion === 1 ? 2 : 3,
    stale: frame >= 95 && frame < 165,
    refetching: frame >= 120 && frame < 165,
    publishing: frame >= 170 && frame < 210,
  };
};
