// Turns the full resolution PNGs in originals/ into the files the site serves.
// Run with: npm install && npm run images
//
// Each PNG becomes one AVIF per width in WIDTHS (never upscaled) plus one at
// its full width, named <name>-<width>.avif. Reference them from a <source>
// srcset in index.html so browsers pick the smallest file that still looks
// sharp. One WebP at FALLBACK_WIDTH is written for browsers without AVIF.

import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const sourceDir = path.join(root, "originals");
const outputDir = path.join(root, "site", "assets", "images");

const WIDTHS = [800, 1400];
const FALLBACK_WIDTH = 1400;

await mkdir(outputDir, { recursive: true });

for (const file of (await readdir(sourceDir)).sort()) {
  if (!file.endsWith(".png")) continue;

  const name = path.basename(file, ".png");
  const source = path.join(sourceDir, file);
  const { width: fullWidth } = await sharp(source).metadata();
  const widths = [...WIDTHS.filter((width) => width < fullWidth), fullWidth];

  const outputs = widths.map((width) => ({ width, format: "avif", options: { quality: 65, effort: 6 } }));
  outputs.push({
    width: Math.min(FALLBACK_WIDTH, fullWidth),
    format: "webp",
    options: { quality: 86, alphaQuality: 100, effort: 6 },
  });

  for (const { width, format, options } of outputs) {
    const target = path.join(outputDir, `${name}-${width}.${format}`);
    const { size } = await sharp(source).resize({ width }).toFormat(format, options).toFile(target);
    console.log(`${path.relative(root, target)}  ${Math.round(size / 1024)} kB`);
  }
}
