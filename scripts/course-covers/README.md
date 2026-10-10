# Course navigation covers

Each course card uses a specific concept illustration, rendered as a dedicated
1920×1080 JPEG still at quality 88. `manifest.json` maps the course code and
knowledge-point ID to its title, figure export, provenance, and subject palette.
These navigation images do not change the individual videos or their records.

The figure assets retain diagrams from the original dedicated cover renders or
static exports of the course's L2 primitives. They are not frames from MP4s.
Courses awaiting production use “concept preview” in the footer.

From this directory:

```sh
pnpm install
pnpm run check
pnpm run render
# Optional: use a locally installed Chrome for headless still rendering.
# REMOTION_BROWSER_EXECUTABLE=/path/to/chrome pnpm run render
python3 ../build_github_readme.py
```

Render an individual course with `node render.mjs cs50x`. Every requested figure
first renders on the skill's black 1000×900 audit canvas. The renderer checks
overflow, centering and minimum fill before creating its final JPEG. Measurements
are saved under `.workbuddy/course-cover-checks.json`; `--resume` can continue a
failed batch from the same inputs. Omit that flag after changing a figure or the
manifest so the changed outputs are rendered again.

`generate_card_assets.py` now generates subject icons only. It cannot overwrite
these images with the retired generic SVG course cards.
