import type { SceneDef } from "../Video";
import {SCENES as scenes1} from './ts01-typescript-type-inference-across-functions';
import {SCENES as scenes2} from './ts02-union-type-narrowing-with-discriminants';
import {SCENES as scenes3} from './ts03-generic-constraints-and-reusable-apis';
import {SCENES as scenes4} from './ts04-runtime-validation-at-an-api-boundary';
import {SCENES as scenes5} from './ts05-typed-request-and-response-contracts';
import {SCENES as scenes6} from './ts06-async-error-propagation-in-a-server-route';
import {SCENES as scenes7} from './ts07-database-transaction-in-a-typed-service';
import {SCENES as scenes8} from './ts08-repository-pattern-with-typed-queries';
import {SCENES as scenes9} from './ts09-dependency-injection-in-a-backend';
import {SCENES as scenes10} from './ts10-server-side-rendering-data-flow';
import {SCENES as scenes11} from './ts11-client-cache-invalidation-after-mutation';
import {SCENES as scenes12} from './ts12-form-state-and-schema-validation';
import {SCENES as scenes13} from './ts13-authentication-middleware-in-a-full-stack-app';
import {SCENES as scenes14} from './ts14-websocket-event-types-across-client-and-server';
import {SCENES as scenes15} from './ts15-monorepo-shared-types-and-package-boundaries';
export type VideoEntry = { id: string; title: string; file: string; scenes: SceneDef[]; keyFrames: number[] };
export const VIDEOS: VideoEntry[] = [
 {id:'ts01-typescript-type-inference-across-functions',title:'TypeScript Type Inference Across Functions',file:'ts01-typescript-type-inference-across-functions.tsx',scenes:scenes1,keyFrames:[53, 177, 300, 423, 554, 700]},
 {id:'ts02-union-type-narrowing-with-discriminants',title:'Union Type Narrowing with Discriminants',file:'ts02-union-type-narrowing-with-discriminants.tsx',scenes:scenes2,keyFrames:[53, 174, 296, 418, 547, 691]},
 {id:'ts03-generic-constraints-and-reusable-apis',title:'Generic Constraints and Reusable APIs',file:'ts03-generic-constraints-and-reusable-apis.tsx',scenes:scenes3,keyFrames:[55, 181, 308, 434, 568, 718]},
 {id:'ts04-runtime-validation-at-an-api-boundary',title:'Runtime Validation at an API Boundary',file:'ts04-runtime-validation-at-an-api-boundary.tsx',scenes:scenes4,keyFrames:[63, 208, 352, 497, 651, 823]},
 {id:'ts05-typed-request-and-response-contracts',title:'Typed Request and Response Contracts',file:'ts05-typed-request-and-response-contracts.tsx',scenes:scenes5,keyFrames:[54, 178, 302, 426, 558, 705]},
 {id:'ts06-async-error-propagation-in-a-server-route',title:'Async Error Propagation in a Server Route',file:'ts06-async-error-propagation-in-a-server-route.tsx',scenes:scenes6,keyFrames:[54, 180, 306, 431, 565, 714]},
 {id:'ts07-database-transaction-in-a-typed-service',title:'Database Transaction in a Typed Service',file:'ts07-database-transaction-in-a-typed-service.tsx',scenes:scenes7,keyFrames:[70, 230, 390, 550, 720, 910]},
 {id:'ts08-repository-pattern-with-typed-queries',title:'Repository Pattern with Typed Queries',file:'ts08-repository-pattern-with-typed-queries.tsx',scenes:scenes8,keyFrames:[55, 181, 308, 434, 568, 718]},
 {id:'ts09-dependency-injection-in-a-backend',title:'Dependency Injection in a Backend',file:'ts09-dependency-injection-in-a-backend.tsx',scenes:scenes9,keyFrames:[54, 179, 304, 429, 561, 709]},
 {id:'ts10-server-side-rendering-data-flow',title:'Server-Side Rendering Data Flow',file:'ts10-server-side-rendering-data-flow.tsx',scenes:scenes10,keyFrames:[61, 201, 341, 481, 630, 796]},
 {id:'ts11-client-cache-invalidation-after-mutation',title:'Client Cache Invalidation After Mutation',file:'ts11-client-cache-invalidation-after-mutation.tsx',scenes:scenes11,keyFrames:[57, 189, 321, 453, 594, 750]},
 {id:'ts12-form-state-and-schema-validation',title:'Form State and Schema Validation',file:'ts12-form-state-and-schema-validation.tsx',scenes:scenes12,keyFrames:[55, 182, 310, 437, 572, 723]},
 {id:'ts13-authentication-middleware-in-a-full-stack-app',title:'Authentication Middleware in a Full-Stack App',file:'ts13-authentication-middleware-in-a-full-stack-app.tsx',scenes:scenes13,keyFrames:[53, 177, 300, 423, 554, 700]},
 {id:'ts14-websocket-event-types-across-client-and-server',title:'WebSocket Event Types Across Client and Server',file:'ts14-websocket-event-types-across-client-and-server.tsx',scenes:scenes14,keyFrames:[54, 179, 304, 429, 561, 709]},
 {id:'ts15-monorepo-shared-types-and-package-boundaries',title:'Monorepo Shared Types and Package Boundaries',file:'ts15-monorepo-shared-types-and-package-boundaries.tsx',scenes:scenes15,keyFrames:[60, 200, 339, 478, 626, 791]},
];
