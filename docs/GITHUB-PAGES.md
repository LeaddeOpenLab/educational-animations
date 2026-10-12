# GitHub Pages showcase

The site uses the existing catalog and media. It adds no frontend build dependencies.

## Local preview

```sh
python3 scripts/build_pages.py
python3 -m http.server 8765 --directory _site
```

Open http://localhost:8765. The build writes a compact, public catalog to `_site/data/site-catalog.json`, computes collection statistics and recent catalog activity, and refreshes the README banner. It does not copy video files into the Pages deployment. Existing GitHub raw media URLs supply videos and previews on demand.

## Publish

1. Merge the site changes to `main`.
2. In the repository’s **Settings → Pages → Build and deployment**, select **GitHub Actions**.
3. Run **Deploy library to GitHub Pages** from Actions if the initial push ran before Pages was enabled.
4. The public URL is https://LeaddeOpenLab.github.io/educational-animations/.

Future catalog and site changes deploy automatically. The deployment uploads only `_site`, never the full repository or production workspace. GitHub raw media must remain publicly accessible.

## Maintain

- `index.html`: page content and structure.
- `assets/site/styles.css`: Leadde purple, responsive layout and components.
- `assets/site/app.js`: filters, video details, clipboard actions and link state.
- `scripts/build_pages.py`: catalog projection, counts, README banner and Pages output.
- `scripts/build_github_readme.py`: preserves the banner and site entry points when regenerating the README.

The interface defaults to English to match the published animation prompts. Video availability is distinct from review or exact-reproduction verification. Course artwork is used when a concept has no dedicated cover; image alternative text identifies it. The homepage is static and crawlable; client-side concept links are shareable but do not create separate search-indexed detail pages.

The Leadde logo was taken from https://leadde.ai/_next/static/media/logo.b0f2f7dc.png. Brand colors follow leadde.ai (`#6e4dfc`, `#f1edff`, `#1e2026`).
