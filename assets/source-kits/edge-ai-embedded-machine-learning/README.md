# Edge AI and Embedded Machine Learning

This course kit contains the source, theme, static figures, baked formulas and mechanism assertions for15 reviewed silent English animations.

Install Node.js and FFmpeg, then run `npm install` and `npm run typecheck`. The dependencies are pinned in package.json; Helvetica Neue is preferred with Helvetica, Arial and Segoe UI fallbacks. Check `src/videos/registry.ts` for composition IDs and durations.

Example render:

```sh
npx remotion render src/index.ts edge11-on-device-feature-extraction raw.mp4 --codec=h264 --concurrency=2
ffmpeg -i raw.mp4 -c:v copy -an -movflags +faststart on-device-feature-extraction.mp4
```

Render a static cover through `src/cover-root.tsx` using composition `cover` and props `name`, `course`, `discipline`, `figure` (the knowledge-point slug), `brand: "icon"`, and `foot` with the actual duration. Cover frame geometry is independent of video scenes.

The published Prompt cards match the reviewed final videos. The included state and source assertions document specific mechanism checks. Reproduction on a clean machine has not been verified; browser, operating-system fonts and FFmpeg versions can affect pixels and encoding. No narration or external stock footage is required.
