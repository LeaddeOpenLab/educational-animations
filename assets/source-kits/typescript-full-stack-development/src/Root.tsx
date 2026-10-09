import React from 'react';
import { Composition } from 'remotion';
import { makeVideo, totalFrames, VIDEO_FPS, VIDEO_HEIGHT, VIDEO_WIDTH } from './Video';
import { VIDEOS } from './videos/registry';
import { TransactionPreview } from './previews/TransactionPreview';
import { NarrowPreviewV2 } from './previews/NarrowPreviewV2';
import { CachePreviewV2 } from './previews/CachePreviewV2';
import { HydrationPreviewV2 } from './previews/HydrationPreviewV2';
import { ValidationPreviewV2 } from './previews/ValidationPreviewV2';
import { BuildPreviewV2 } from './previews/BuildPreviewV2';
import {InferencePreview,GenericPreview,ContractPreview,ErrorPreview,RepositoryPreview,InjectionPreview,FormPreview,AuthPreview,SocketPreview} from './previews/RemainingPreviews';
import {NarrowPreview,ValidationPreview,CachePreview,HydrationPreview,BuildPreview} from './previews/MechanismPreviews';

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="narrow-mechanism" component={NarrowPreview} durationInFrames={220} fps={30} width={1920} height={1080} />
    <Composition id="narrow-mechanism-v2" component={NarrowPreviewV2} durationInFrames={240} fps={30} width={1920} height={1080} />
    <Composition id="cache-mechanism-v2" component={CachePreviewV2} durationInFrames={270} fps={30} width={1920} height={1080} />
    <Composition id="hydration-mechanism-v2" component={HydrationPreviewV2} durationInFrames={300} fps={30} width={1920} height={1080} />
    <Composition id="validation-mechanism-v2" component={ValidationPreviewV2} durationInFrames={310} fps={30} width={1920} height={1080} />
    <Composition id="build-mechanism-v2" component={BuildPreviewV2} durationInFrames={290} fps={30} width={1920} height={1080} />
    <Composition id="inference-mechanism-v2" component={InferencePreview} durationInFrames={250} fps={30} width={1920} height={1080} />
    <Composition id="generic-mechanism-v2" component={GenericPreview} durationInFrames={250} fps={30} width={1920} height={1080} />
    <Composition id="contract-mechanism-v2" component={ContractPreview} durationInFrames={250} fps={30} width={1920} height={1080} />
    <Composition id="error-mechanism-v2" component={ErrorPreview} durationInFrames={250} fps={30} width={1920} height={1080} />
    <Composition id="repository-mechanism-v2" component={RepositoryPreview} durationInFrames={250} fps={30} width={1920} height={1080} />
    <Composition id="injection-mechanism-v2" component={InjectionPreview} durationInFrames={250} fps={30} width={1920} height={1080} />
    <Composition id="form-mechanism-v2" component={FormPreview} durationInFrames={250} fps={30} width={1920} height={1080} />
    <Composition id="auth-mechanism-v2" component={AuthPreview} durationInFrames={250} fps={30} width={1920} height={1080} />
    <Composition id="socket-mechanism-v2" component={SocketPreview} durationInFrames={250} fps={30} width={1920} height={1080} />
    <Composition id="validation-mechanism" component={ValidationPreview} durationInFrames={220} fps={30} width={1920} height={1080} />
    <Composition id="cache-mechanism" component={CachePreview} durationInFrames={220} fps={30} width={1920} height={1080} />
    <Composition id="hydration-mechanism" component={HydrationPreview} durationInFrames={220} fps={30} width={1920} height={1080} />
    <Composition id="build-mechanism" component={BuildPreview} durationInFrames={220} fps={30} width={1920} height={1080} />
    <Composition id="transaction-mechanism-v2" component={TransactionPreview} durationInFrames={360} fps={30} width={1920} height={1080} />
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
