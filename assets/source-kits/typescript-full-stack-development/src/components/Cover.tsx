import React from 'react';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { Backdrop } from './Backdrop';
import { COLORS, FONT, alpha } from '../theme';
import { FieldRecord, TypeSet, WriteSetLedger, VersionedState, CallStack, HydrationDOM, BuildTargets } from './Mechanisms';

/**
 * Static cover poster for one knowledge point — rendered separately, never
 * grabbed from the finished video.
 *
 *   remotion still cover out/<slug>.jpg --frame=0 --log=error \
 *     --props='{"name":"Decision Boundary","discipline":"Artificial Intelligence",
 *               "course":"Introduction to Machine Learning",
 *               "figure":"ml-scatter-boundary","brand":"icon"}'
 *
 * Layout (locked numbers, do not eyeball them):
 *   left copy block   left 150 / width 1010 / vertically centred / gap 30
 *     eyebrow = Course          27px  700  tracking 5.5  uppercase  accent
 *     knowledge point = Name    800   lineHeight 1.08   tracking -1.4  textStrong
 *                               size by length: ≤18→116 ≤30→96 ≤44→78 else 66
 *     rule                      196x7  radius 7  primary
 *     footnote                  23px  tracking 2.4  uppercase  textDim
 *   figure          right 108 / top 232 / 640x620
 *   brand           bottom-right  right 108 / bottom 44
 *
 * Engineering note: when the registry still references unwritten L3 files the
 * main entry point fails to bundle, so covers render through a dedicated entry
 * (see cover-root.tsx). Keep that entry when you copy this template.
 */

/**
 * Course-level cover figures.
 *
 * A cover must carry the *representative figure of the knowledge point*, never an
 * abstract shape. One figure per course (35 courses ≈ 20 lines each), built from
 * the kit's L2 primitives so the cover and the video share one visual language.
 *
 * Fill this in per course, e.g.:
 *   export const COVER_FIGURES = {
 *     'ml-scatter-boundary': ({}) => (
 *       <Axes width={640} height={620} xDomain={[-2.8, 2.8]} yDomain={[-2.2, 2.2]} pad={{l:6,r:6,t:6,b:6}} showArrows={false}>
 *         {(s) => (<>
 *           <HalfPlane s={s} pts={BOUNDARY} side="above" color={COLORS.accent} opacity={0.12} />
 *           <HalfPlane s={s} pts={BOUNDARY} side="below" color={COLORS.primary} opacity={0.12} />
 *           <Scatter  s={s} pts={A_PTS} color={COLORS.primary} r={17} />
 *           <Scatter  s={s} pts={B_PTS} color={COLORS.accent} r={17} shape="square" />
 *           <Boundary s={s} pts={BOUNDARY} color={COLORS.result} width={7} glow />
 *         </>)}
 *       </Axes>
 *     ),
 *   };
 */
export const COVER_FIGURES: Record<string, React.FC> = {
  'typescript-type-inference-across-functions': () => <svg width="640" height="620" viewBox="0 0 640 620"><FieldRecord x={80} y={95} width={460} title="source" fields={[{name:'id',value:'7'},{name:'name',value:'Ada'}]}/><FieldRecord x={80} y={350} width={460} title="returned" fields={[{name:'name',value:'Ada',state:'accepted'}]}/></svg>,
  'union-type-narrowing-with-discriminants': () => <svg width="640" height="620" viewBox="0 0 640 620"><g transform="translate(20 100) scale(.9)"><TypeSet x={0} y={0} predicate="kind === 'ok'" variants={[{name:'Err',fields:['message: timeout'],excluded:true},{name:'Ok',fields:['value: 42']}]}/></g><FieldRecord x={125} y={385} width={390} title="true branch" fields={[{name:'value',value:'42',state:'accepted'}]}/></svg>,
  'generic-constraints-and-reusable-apis': () => <svg width="640" height="620" viewBox="0 0 640 620"><FieldRecord x={75} y={60} width={480} title="User extends {id}" fields={[{name:'id',value:'u1',state:'accepted'},{name:'email',value:'a@b'}]}/><FieldRecord x={75} y={340} width={480} title="Order extends {id}" fields={[{name:'id',value:'o1',state:'accepted'},{name:'total',value:'24'}]}/></svg>,
  'runtime-validation-at-an-api-boundary': () => <svg width="640" height="620" viewBox="0 0 640 620"><FieldRecord x={70} y={65} width={500} title="unknown JSON" fields={[{name:'id',value:'7',state:'checking'},{name:'age',value:'oops',state:'rejected'}]}/><FieldRecord x={70} y={345} width={500} title="parsed payload" fields={[{name:'id',value:'7',state:'accepted'},{name:'age',value:'21',state:'accepted'}]}/></svg>,
  'typed-request-and-response-contracts': () => <svg width="640" height="620" viewBox="0 0 640 620"><FieldRecord x={70} y={65} width={500} title="POST request" fields={[{name:'itemId',value:'i7'},{name:'qty',value:'2'}]}/><FieldRecord x={70} y={345} width={500} title="server response" fields={[{name:'orderId',value:'o9',state:'accepted'},{name:'total',value:'18',state:'accepted'}]}/></svg>,
  'async-error-propagation-in-a-server-route': () => <svg width="640" height="620" viewBox="0 0 640 620"><CallStack x={80} y={110} frames={['route','service','repository']} errorAt={2}/><text x="115" y="500" fill={COLORS.warn} fontFamily="monospace" fontSize="34">NotFound → HTTP 404</text></svg>,
  'database-transaction-in-a-typed-service': () => <svg width="640" height="620" viewBox="0 0 640 620"><g transform="translate(0 25) scale(.81)"><WriteSetLedger x={20} y={100} title="published" kind="published" balances={[{account:'A',amount:100},{account:'B',amount:40}]}/><WriteSetLedger x={400} y={100} title="pending" kind="pending" balances={[{account:'A',amount:75},{account:'B',amount:65}]}/></g><text x="155" y="500" fill={COLORS.result} fontFamily="monospace" fontSize="34">commit together</text></svg>,
  'repository-pattern-with-typed-queries': () => <svg width="640" height="620" viewBox="0 0 640 620"><FieldRecord x={70} y={60} width={500} title="database row" fields={[{name:'user_id',value:'u7'},{name:'display_name',value:'Ada'}]}/><FieldRecord x={70} y={350} width={500} title="domain User" fields={[{name:'id',value:'u7',state:'changed'},{name:'name',value:'Ada',state:'changed'}]}/></svg>,
  'dependency-injection-in-a-backend': () => <svg width="640" height="620" viewBox="0 0 640 620"><FieldRecord x={80} y={60} width={480} title="CheckoutService" fields={[{name:'call',value:'charge(18)'}]}/><FieldRecord x={80} y={325} width={480} title="FakePaymentPort" fields={[{name:'calls',value:'[18]',state:'accepted'},{name:'receipt',value:'fake-1',state:'accepted'}]}/></svg>,
  'server-side-rendering-data-flow': () => <svg width="640" height="620" viewBox="0 0 640 620"><HydrationDOM x={45} y={115} rows={[{tag:'h1',text:'Count 2'},{tag:'button',text:'Add'}]} handlersAttached={true} clicked={true}/><text x="100" y="495" fill={COLORS.result} fontFamily="monospace" fontSize="30">same nodes · handler attached</text></svg>,
  'client-cache-invalidation-after-mutation': () => <svg width="640" height="620" viewBox="0 0 640 620"><VersionedState x={20} y={95} label="SERVER" version={2} value="3"/><VersionedState x={330} y={95} label="CACHE" version={1} value="2" stale/><VersionedState x={175} y={355} label="REFETCH" version={2} value="3"/></svg>,
  'form-state-and-schema-validation': () => <svg width="640" height="620" viewBox="0 0 640 620"><FieldRecord x={80} y={55} width={480} title="raw form" fields={[{name:'age',value:'abc',state:'rejected'},{name:'touched',value:'true'}]}/><FieldRecord x={80} y={345} width={480} title="parsed submit" fields={[{name:'age',value:'21',state:'accepted'},{name:'typeof',value:'number',state:'accepted'}]}/></svg>,
  'authentication-middleware-in-a-full-stack-app': () => <svg width="640" height="620" viewBox="0 0 640 620"><FieldRecord x={80} y={65} width={480} title="session" fields={[{name:'identity',value:'u7',state:'accepted'}]}/><FieldRecord x={80} y={315} width={480} title="owner check" fields={[{name:'owner',value:'u7'},{name:'result',value:'HTTP 200',state:'accepted'}]}/></svg>,
  'websocket-event-types-across-client-and-server': () => <svg width="640" height="620" viewBox="0 0 640 620"><FieldRecord x={80} y={65} width={480} title="chat:new packet" fields={[{name:'roomId',value:'r1'},{name:'text',value:'hi',state:'accepted'}]}/><FieldRecord x={80} y={345} width={480} title="packet parser" fields={[{name:'unknown tag',value:'reject',state:'rejected'},{name:'callback',value:'unchanged'}]}/></svg>,
  'monorepo-shared-types-and-package-boundaries': () => <svg width="640" height="620" viewBox="0 0 640 620"><g transform="translate(10 120) scale(.89)"><BuildTargets x={0} y={0} targets={[{name:'shared',state:'ready',detail:'avatarUrl added'},{name:'api',state:'fixed',detail:'mapper fixed'}]}/></g><FieldRecord x={115} y={360} width={420} title="web fixture" fields={[{name:'avatarUrl',value:'/ada.png',state:'accepted'}]}/></svg>,
};

export type CoverProps = {
  name: string;
  discipline?: string;
  course?: string;
  /** 'wordmark' | 'icon' | 'none' */
  brand?: 'wordmark' | 'icon' | 'none';
  /** footnote under the rule; defaults to "discipline · 30 seconds"; '' hides it */
  foot?: string;
  /** key into COVER_FIGURES; 'none' hides it */
  figure?: string;
};

const titleSize = (s: string): number => {
  const n = s.length;
  if (n <= 18) return 116;
  if (n <= 30) return 96;
  if (n <= 44) return 78;
  return 66;
};

export const Cover: React.FC<CoverProps> = ({
  name,
  discipline,
  course,
  brand = 'icon',
  foot,
  figure,
}) => {
  const eyebrow = course ?? discipline ?? '';
  const footnote = foot ?? [discipline, '30 seconds'].filter(Boolean).join('  ·  ');
  const Figure = figure && figure !== 'none' ? COVER_FIGURES[figure] : undefined;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bg0 }}>
      <Backdrop width={1920} height={1080} />

      {Figure ? (
        <div style={{ position: 'absolute', right: 108, top: 232, opacity: 0.96 }}>
          <Figure />
        </div>
      ) : null}

      {/* copy plate: keeps long titles legible over the grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(95deg, ${alpha(COLORS.bg0, 0.94)} 0%, ${alpha(
            COLORS.bg0,
            0.84
          )} 40%, ${alpha(COLORS.bg0, 0.3)} 62%, transparent 78%)`,
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 150,
          top: 0,
          height: 1080,
          width: 1010,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 30,
        }}
      >
        {eyebrow ? (
          <div
            style={{
              fontFamily: FONT, fontSize: 27, fontWeight: 700, letterSpacing: 5.5,
              textTransform: 'uppercase', color: COLORS.accent, lineHeight: 1.35,
            }}
          >
            {eyebrow}
          </div>
        ) : null}

        <div
          style={{
            fontFamily: FONT, fontSize: titleSize(name), fontWeight: 800,
            lineHeight: 1.08, letterSpacing: -1.4, color: COLORS.textStrong,
          }}
        >
          {name}
        </div>

        <div style={{ width: 196, height: 7, borderRadius: 7, background: COLORS.primary, marginTop: 6 }} />

        {footnote ? (
          <div
            style={{
              fontFamily: FONT, fontSize: 23, letterSpacing: 2.4,
              textTransform: 'uppercase', color: COLORS.textDim,
            }}
          >
            {footnote}
          </div>
        ) : null}
      </div>

      {brand !== 'none' ? (
        <div style={{ position: 'absolute', right: 108, bottom: 44, display: 'flex', justifyContent: 'flex-end' }}>
          {brand === 'wordmark' ? (
            <Img src={staticFile('leadde-logo.png')} style={{ width: 226, filter: 'brightness(0) invert(1)', opacity: 0.9 }} />
          ) : (
            <Img src={staticFile('leadde-icon.svg')} style={{ width: 56, height: 56, opacity: 0.95 }} />
          )}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
