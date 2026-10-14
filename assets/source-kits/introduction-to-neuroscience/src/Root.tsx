import React from 'react';
import { Composition } from 'remotion';
import { makeVideo, totalFrames, VIDEO_FPS, VIDEO_HEIGHT, VIDEO_WIDTH } from './Video';
import { VIDEOS } from './videos/registry';

export const RemotionRoot: React.FC = () => (
  <>
    {VIDEOS.map((v) => (
      <Composition
        key={v.id}
        id={v.id}
        component={makeVideo(v.scenes)}
        durationInFrames={totalFrames(v.scenes)}
        fps={VIDEO_FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
    ))}
  </>
);
