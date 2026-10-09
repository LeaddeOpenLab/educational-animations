#!/bin/zsh
# Render every composition at 1920x1080 and write a truly silent mp4 to the
# destination folder. Remotion always muxes a silent AAC track, so the file is
# re-muxed with -an; we then assert that exactly one (video) stream remains.
set -e
cd "$(dirname "$0")/.."

OUT_DIR="${1:-$HOME/Desktop/signal}"
mkdir -p "$OUT_DIR" out/final

typeset -A NAMES
NAMES=(
  s01-ct-vs-dt          "01_Continuous_vs_Discrete_Time_Signals"
  s02-operations        "02_Shift_Reversal_Scaling_and_Operations"
  s03-lti               "03_LTI_Systems_and_Property_Tests"
  s04-convolution       "04_Impulse_Response_and_Convolution"
  s05-fourier-series    "05_Fourier_Series_and_Spectrum"
  s06-fourier-transform "06_Fourier_Transform_and_Properties"
  s07-laplace           "07_Laplace_Transform_and_System_Function"
  s08-zero-input-state  "08_Zero_Input_and_Zero_State_Response"
  s09-frequency-response "09_Frequency_Response_Stability_Causality"
  s10-sampling          "10_Sampling_Theorem_and_Reconstruction"
)

ORDER=(
  s01-ct-vs-dt s02-operations s03-lti s04-convolution s05-fourier-series
  s06-fourier-transform s07-laplace s08-zero-input-state s09-frequency-response
  s10-sampling
)

for id in $ORDER; do
  name="${NAMES[$id]}"
  raw="out/final/$id.mp4"
  final="$OUT_DIR/$name.mp4"

  echo "== render $id"
  ./node_modules/.bin/remotion render "$id" "$raw" --concurrency=4 --log=error

  echo "== strip audio -> $final"
  ffmpeg -y -i "$raw" -c:v copy -an -movflags +faststart "$final" > /dev/null 2>&1

  streams=$(ffmpeg -i "$final" 2>&1 | grep -c "Stream #")
  dur=$(ffmpeg -i "$final" 2>&1 | grep "Duration" | head -1 | sed 's/.*Duration: \([0-9:.]*\).*/\1/')
  size=$(du -h "$final" | cut -f1)
  if [[ "$streams" != "1" ]]; then
    echo "!! $name has $streams streams, expected exactly 1 (video only)"
  fi
  echo "   $name.mp4  duration=$dur  streams=$streams  size=$size"
done

echo "DONE -> $OUT_DIR"
ls -la "$OUT_DIR"
