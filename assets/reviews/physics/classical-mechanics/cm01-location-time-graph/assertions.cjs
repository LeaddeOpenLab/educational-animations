const assert=require("node:assert/strict");const {stateAt:at}=require("/Users/zhoutianshuo/Desktop/leadde motion/.kits/classical-mechanics/src/videos/cm01-location-time-graph.state.ts");assert(at(20).v>0);assert(Math.abs(at(60).v)<1e-9);assert(at(90).v<0);assert(at(20).walkerX!==at(90).walkerX);
console.log("PASS: before/during/after, boundary states and visible parameters");
