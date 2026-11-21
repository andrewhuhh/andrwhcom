# andrwh.com

Andrew Huang's portfolio: one static page, hand-written HTML, CSS and a little JavaScript. No framework and no build step. GitHub Pages serves the `site/` folder as it is.

## Layout of the repo

```
site/                     everything that gets published
  index.html              all content, links and head metadata
  assets/css/style.css    all styling, including the animations
  assets/js/main.js       theme toggle and scroll effects
  assets/images/          optimized images, favicon, Open Graph image
  assets/fonts/           Satoshi and its license
originals/                full resolution source PNGs (not published)
scripts/optimize-images.mjs   turns originals/ into site/assets/images/
.github/workflows/pages.yml   deploys site/ on every push to main
```

## Preview locally

```
python3 -m http.server 4173 --directory site
```

Then open http://localhost:4173. Opening `site/index.html` straight from disk works too.

## Common edits

- **Text and links**: edit `site/index.html`. Each section is marked with a comment.
- **Colors**: the light and dark palettes are the custom properties at the top of `site/assets/css/style.css`.
- **Breakpoints**: the desktop layout applies from 1200px up, the compact layout below it, and type shrinks once more below 500px. The overrides sit at the bottom of the stylesheet.
- **Add or replace an image**: put the full resolution PNG in `originals/`, regenerate the images (see below), and reference the generated files from `index.html` the way the existing `<picture>` blocks do.
- **Ticker**: the four images in `.ticker-track` are listed twice so the loop is seamless. Keep both halves identical. If the number of images changes, update the `-4` in the `ticker` keyframes and the duration (distance divided by 100px a second).

## Regenerate images

```
npm install
npm run images
```

`scripts/optimize-images.mjs` reads every PNG in `originals/` and writes AVIF at 800, 1400 and full width plus a WebP fallback into `site/assets/images/`. The generated files are committed, so this only needs running when an original changes. `npm install` is needed once, for sharp.

## Deploying

Pushing to `main` runs `.github/workflows/pages.yml`, which uploads `site/` as it is and publishes it to GitHub Pages at `https://andrewhuhh.github.io/andrwhcom/`. The same workflow can be run by hand from **Actions → Deploy to GitHub Pages → Run workflow**.

This needs one setting, done once: **Settings → Pages → Build and deployment → Source: GitHub Actions**. A run that starts before that setting is in place fails at the deploy step; re-run it afterwards.

All asset paths are relative, so the site works both at that project path and at the root of a custom domain.

The canonical URL and the Open Graph and Twitter image URLs in `index.html` point at `https://andrwh.com/`. Social previews need absolute URLs, so they resolve once that domain serves this site.

## Fonts

Satoshi is by Indian Type Foundry, distributed through [Fontshare](https://www.fontshare.com/fonts/satoshi) under the ITF Free Font License (`site/assets/fonts/Satoshi-LICENSE.txt`). The license allows self-hosting the unmodified files for your own website, which is how they are used here. It does not allow redistributing, converting or subsetting them, so do not reuse the files from this repository elsewhere; get your own copy from Fontshare.
