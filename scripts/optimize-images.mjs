/**
 * Generates responsive AVIF/WebP variants for every image referenced by the
 * project carousel, plus a manifest of intrinsic dimensions.
 *
 *   node scripts/optimize-images.mjs
 *
 * Sources stay untouched in public/assets/img and remain the <img> fallback.
 * Variants land in public/assets/img/opt/<name>-<width>.<ext>.
 */
import { readFile, writeFile, mkdir, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const PUBLIC = path.join(ROOT, "public");
const OUT_DIR = path.join(PUBLIC, "assets/img/opt");
const DATA = path.join(ROOT, "src/utils/Projects.ts");
const MANIFEST = path.join(ROOT, "src/utils/imageManifest.json");

const WIDTHS = [480, 960, 1440];
const AVIF = { quality: 50, effort: 4 };
const WEBP = { quality: 72 };

const baseName = (src) => path.basename(src, path.extname(src));

async function main() {
  const source = await readFile(DATA, "utf8");
  const refs = [...new Set([...source.matchAll(/src: "([^"]+)"/g)].map((m) => m[1]))];

  await mkdir(OUT_DIR, { recursive: true });

  const manifest = {};
  let originalBytes = 0;
  let variantBytes = 0;

  for (const ref of refs) {
    const abs = path.join(PUBLIC, ref);
    if (!existsSync(abs)) {
      console.warn(`  skip (missing): ${ref}`);
      continue;
    }

    originalBytes += (await stat(abs)).size;

    const image = sharp(abs, { failOn: "none" });
    const { width, height } = await image.metadata();
    const name = baseName(ref);

    manifest[ref] = { width, height, base: `/assets/img/opt/${name}` };

    // Never upscale: a 900px-wide source gets no 1440 variant.
    const targets = WIDTHS.filter((w) => w <= width);
    if (targets.length === 0) targets.push(width);

    for (const w of targets) {
      const resized = sharp(abs, { failOn: "none" }).resize({
        width: w,
        withoutEnlargement: true,
      });
      await Promise.all([
        resized.clone().avif(AVIF).toFile(path.join(OUT_DIR, `${name}-${w}.avif`)),
        resized.clone().webp(WEBP).toFile(path.join(OUT_DIR, `${name}-${w}.webp`)),
      ]);
    }
    manifest[ref].widths = targets;
    process.stdout.write(`  ${name} (${width}x${height}) -> ${targets.join(", ")}\n`);
  }

  for (const f of await readdir(OUT_DIR)) {
    variantBytes += (await stat(path.join(OUT_DIR, f))).size;
  }

  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n", "utf8");

  const mb = (b) => (b / 1048576).toFixed(2) + " MB";
  console.log(`\n  images:    ${Object.keys(manifest).length}`);
  console.log(`  originals: ${mb(originalBytes)}`);
  console.log(`  variants:  ${mb(variantBytes)} (all widths, both formats)`);
  console.log(`  manifest:  ${path.relative(ROOT, MANIFEST)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
