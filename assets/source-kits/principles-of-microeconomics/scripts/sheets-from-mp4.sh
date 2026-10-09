#!/bin/zsh
# Build contact sheets straight out of the rendered mp4s.
#
# Cheaper than re-running `remotion still` per frame when the finished videos
# already exist: `still` and `render` each pay their own bundle + browser start,
# while grabbing 6 frames with ffmpeg costs ~2 s per video (measured).
#
# Run scripts/render-all.sh first, or any render that leaves out/final/<id>.mp4.
set -e
cd "$(dirname "$0")/.."

NODE="${NODE:-$(command -v node || echo /Users/zhoutianshuo/.workbuddy/binaries/node/versions/22.22.2-3/bin/node)}"

# Key frames are tuned per video (one per scene, picked at the moment the scene's
# content has fully landed) and live in videos/registry.ts. A generic evenly
# spaced list would put two frames inside the same scene and skip another.
KEYJSON=$("$NODE" -e '
const fs = require("fs");
const src = fs.readFileSync("src/videos/registry.ts", "utf8");
const out = {};
const re = /id:\s*'"'"'([^'"'"']+)'"'"'[\s\S]*?keyFrames:\s*\[([^\]]*)\]/g;
let m;
while ((m = re.exec(src))) {
  const f = m[2].split(",").map((s) => parseInt(s.trim(), 10)).filter((n) => !isNaN(n));
  if (f.length) out[m[1]] = f;
}
console.log(JSON.stringify(out));
')

mkdir -p out/sheets out/frames

for mp4 in out/final/*.mp4; do
  id=$(basename "$mp4" .mp4)
  dir="out/frames/$id"
  rm -rf "$dir"; mkdir -p "$dir"

  frames=$(echo "$KEYJSON" | "$NODE" -e "
    let s=''; process.stdin.on('data',d=>s+=d).on('end',()=>{
      const k=JSON.parse(s)['$id'];
      console.log(k ? k.join(' ') : '90 300 480 660 780 870');
    });
  ")

  for f in ${=frames}; do
    # select=eq(n,N) picks the exact frame index; -ss would seek by time and can
    # land on the neighbouring frame. -fps_mode passthrough stops ffmpeg from
    # duplicating frames back to a nominal rate.
    ffmpeg -y -i "$mp4" -vf "select=eq(n\,$f)" -fps_mode passthrough \
      -frames:v 1 "$dir/k$(printf %03d $f).png" > /dev/null 2>&1
  done

  # the "k" prefix + zero padding keeps the glob in frame order; plain f70/f250/...
  # sorts alphabetically (f250 f430 f610 f690 f70 f870) and scrambles the sheet.
  ffmpeg -y -pattern_type glob -i "$dir/k*.png" \
    -filter_complex "scale=640:360,tile=3x2:padding=4:color=0x1a1a1a" \
    -frames:v 1 "out/sheets/$id.png" > /dev/null 2>&1
  echo "sheet: out/sheets/$id.png  (frames: $frames)"
done
echo "ALL SHEETS DONE (from mp4)"
