// Konvertiert public/images/**/*.jpg + og-cover.jpg zu .webp bei 75% Qualitaet.
// Originale bleiben als Fallback bestehen.
// Ausfuehren: node scripts/optimize-images.mjs
import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

const DIRS = [
  'public/images/spots',
  'public/images/gallery',
  'public/images/customers',
];
const ROOT_FILES = ['public/og-cover.jpg'];
const QUALITY = 75;

async function processFile(input) {
  if (!/\.(jpe?g|png)$/i.test(input)) return null;
  const output = input.replace(/\.(jpe?g|png)$/i, '.webp');
  try {
    const before = (await stat(input)).size;
    await sharp(input).webp({ quality: QUALITY }).toFile(output);
    const after = (await stat(output)).size;
    const saved = ((1 - after / before) * 100).toFixed(0);
    console.log(`  ${input}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB (-${saved}%)`);
    return { input, before, after };
  } catch (err) {
    console.error(`  FAIL ${input}: ${err.message}`);
    return null;
  }
}

let totalBefore = 0;
let totalAfter = 0;

for (const dir of DIRS) {
  console.log(`\n== ${dir} ==`);
  const files = await readdir(dir);
  for (const f of files) {
    const result = await processFile(join(dir, f));
    if (result) {
      totalBefore += result.before;
      totalAfter += result.after;
    }
  }
}

console.log(`\n== root files ==`);
for (const f of ROOT_FILES) {
  const result = await processFile(f);
  if (result) {
    totalBefore += result.before;
    totalAfter += result.after;
  }
}

const mb = (b) => (b / 1024 / 1024).toFixed(2);
const totalSaved = ((1 - totalAfter / totalBefore) * 100).toFixed(0);
console.log(`\nTotal: ${mb(totalBefore)}MB -> ${mb(totalAfter)}MB (-${totalSaved}%)`);