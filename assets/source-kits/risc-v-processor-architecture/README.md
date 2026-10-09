# RISC-V Processor Architecture

Source kit for 15 silent English concept animations. Dependencies: Remotion 4.0.410, React 19, TypeScript 5.8.2 and FFmpeg. Helvetica Neue with system font fallbacks. Run npm install, npm run typecheck; composition IDs and durations are in src/videos/registry.ts. Render with npx remotion render src/index.ts COMPOSITION output.mp4 --concurrency=2; remove audio with ffmpeg -i output.mp4 -c:v copy -an -movflags +faststart final.mp4.

The kit supplies sources, theme, static vector assets, and mechanism assertions. Clean-machine exact reproduction has not been tested. Examples identify illustrative microarchitecture choices separately from RISC-V ISA requirements. No narration or stock footage required.
