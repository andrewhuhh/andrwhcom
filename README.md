# andrwh.com

Andrew Huang's portfolio: one static page of hand-written HTML, CSS and JavaScript. No framework, no build step. GitHub Pages serves `site/` as is.

```
site/                          everything that gets published
  index.html                   content, links and head metadata
  assets/css/style.css         styling and animations
  assets/js/main.js            theme toggle and scroll effects
  assets/images/               optimized images, favicon, Open Graph image
  assets/fonts/                Satoshi and its license
originals/                     full resolution source PNGs (not published)
scripts/optimize-images.mjs    turns originals/ into site/assets/images/
banners/infisical/             source of originals/infisical.png (npm run banner)
.github/workflows/pages.yml    deploys site/ on every push to main
```

## Preview

```
npm run serve
```

Then open http://localhost:4173.

## Editing

- **Cards**: every image in Recent Work and Snapshots is a `.card` at the same 2504:1304 ratio, cropped with `object-fit: cover`. Add `card--contain` to letterbox an image instead, or `card--right` to crop from the left.
- **Colors**: the light and dark palettes are the custom properties at the top of `style.css`.
- **Breakpoints**: desktop from 1200px up, compact below it, smaller type below 500px.
- **Ticker**: the four images in `.ticker-track` are listed twice so the loop is seamless. If the count changes, update the `-4` in the `ticker` keyframes and the duration (100px a second).

## Images

Put the full resolution PNG in `originals/`, run `npm install && npm run images`, and reference the generated files from `index.html` the way the existing `<picture>` blocks do. The script writes AVIF at 800, 1400 and full width plus a 1400px WebP fallback. Generated files are committed.

The Infisical banner is an HTML page in `banners/infisical/` built from infisical.com material: its logo, gradient textures and product UI captures. Edit it, then run `npm run banner` (needs `chromium` on the PATH) to render `originals/infisical.png` at 2504x1304, and `npm run images` again.

## Deploying

Pushing to `main` runs `.github/workflows/pages.yml`, which publishes `site/` to GitHub Pages at https://andrwh.com. It can also be run by hand from **Actions → Deploy to GitHub Pages → Run workflow**.

## Fonts

Satoshi is by Indian Type Foundry, from [Fontshare](https://www.fontshare.com/fonts/satoshi), under the ITF Free Font License (`site/assets/fonts/Satoshi-LICENSE.txt`). The license allows self-hosting the unmodified files on your own site; it does not allow redistributing, converting or subsetting them, so do not reuse these files elsewhere.
