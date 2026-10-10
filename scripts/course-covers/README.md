# Course navigation covers

The main heading is the **course name**. Each illustration combines three
knowledge points from that course, with short labels; knowledge-point names
never replace the course heading. `manifest.json` preserves all three catalog
IDs and diagram sources for each of the 45 courses.

`subject-themes.json` selects one existing course-kit theme per discipline.
Courses within a discipline share its background, text ramp and semantic colors.
The existing light themes stay light (including AI, mathematics, economics and
humanities); existing dark themes stay dark. These navigation covers do not
modify individual video covers, videos or catalog records.

The self-contained SVG composites in `assets/course-cover-figures` combine
static course-kit illustrations and diagrams from dedicated concept covers.
They are not frames extracted from MP4s. Source diagrams are recolored into the
selected subject theme before composition. Their PNG layers are embedded in the
SVGs, so rendering does not require the original local kits.

The course layout uses an 810px title column and a 780×756 composite illustration
on a 1920×1080 canvas. The wider figure accommodates three concepts. This is the
user-requested course-level adaptation of the concept-cover layout.

```sh
pnpm install
pnpm run check
pnpm run render
# Optional: use a locally installed Chrome for headless still rendering.
# REMOTION_BROWSER_EXECUTABLE=/path/to/chrome pnpm run render
python3 ../build_github_readme.py
```

Render one course with `node render.mjs cs50x`. Every figure first renders on the
black 1000×900 audit canvas in the fixed 640×620 audit frame. The renderer checks
overflow, centering and minimum fill before creating a dedicated JPEG still at
quality 88. Measurements are saved to `.workbuddy/course-cover-checks.json`.
`--resume` continues a failed batch with unchanged inputs; omit it after editing
a figure, theme or manifest. `geometry.json` records the delivered measurements.

`generate_card_assets.py` generates subject icons only and cannot overwrite the
course covers with generic SVG cards.
