import React from 'react';

/** Shared SVG actions. The lesson owns the data and the meaning of each move. */
export type Point = { x: number; y: number };
const unit = (progress: number) => Math.max(0, Math.min(1, progress));
const between = (a: Point, b: Point, p: number): Point => ({
  x: a.x + (b.x - a.x) * p,
  y: a.y + (b.y - a.y) * p,
});

/** Progress follows distance along a polyline, independent of the DOM. */
export const pointOnPath = (points: readonly Point[], progress: number): Point => {
  if (!points.length) throw new Error('MoveAlongPath needs at least one point');
  const lengths = points.slice(1).map((point, i) =>
    Math.hypot(point.x - points[i].x, point.y - points[i].y));
  let remaining = unit(progress) * lengths.reduce((sum, length) => sum + length, 0);
  for (let i = 0; i < lengths.length; i++) {
    if (lengths[i] > 0 && remaining <= lengths[i]) {
      return between(points[i], points[i + 1], remaining / lengths[i]);
    }
    remaining -= lengths[i];
  }
  return points[points.length - 1];
};

export const MoveAlongPath: React.FC<{
  points: readonly Point[];
  progress: number;
  children: React.ReactNode;
}> = ({ points, progress, children }) => {
  const position = pointOnPath(points, progress);
  return <g transform={`translate(${position.x} ${position.y})`}>{children}</g>;
};

/** Opposite arcs keep two items distinct while exchanging their slots. */
export const swapPositions = (from: Point, to: Point, progress: number, lift = 60) => {
  const p = unit(progress);
  const offset = p === 0 || p === 1 ? 0 : Math.sin(Math.PI * p) * lift;
  const first = between(from, to, p);
  const second = between(to, from, p);
  return { first: { ...first, y: first.y - offset }, second: { ...second, y: second.y + offset } };
};

export const SwapItems: React.FC<{
  from: Point;
  to: Point;
  progress: number;
  lift?: number;
  first: React.ReactNode;
  second: React.ReactNode;
}> = ({ from, to, progress, lift, first, second }) => {
  const positions = swapPositions(from, to, progress, lift);
  return <>
    <g transform={`translate(${positions.first.x} ${positions.first.y})`}>{first}</g>
    <g transform={`translate(${positions.second.x} ${positions.second.y})`}>{second}</g>
  </>;
};

/** Use this same state for ownership labels/counts; ownership changes on arrival. */
export const transferState = (from: Point, to: Point, progress: number) => {
  const p = unit(progress);
  return {
    position: between(from, to, p),
    owner: (p === 0 ? 'source' : p === 1 ? 'target' : 'transit') as 'source' | 'transit' | 'target',
  };
};

export const TransferToken: React.FC<{
  from: Point;
  to: Point;
  progress: number;
  children: React.ReactNode;
}> = ({ from, to, progress, children }) => {
  const { position, owner } = transferState(from, to, progress);
  return <g data-owner={owner} transform={`translate(${position.x} ${position.y})`}>{children}</g>;
};
