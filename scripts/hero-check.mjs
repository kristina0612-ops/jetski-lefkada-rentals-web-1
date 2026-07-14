// Visual check of hero section after the poster + stats fix.
// Captures hero on mobile + desktop, EN + DE.
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const BASE = 'https://www.jetski-lefkada-rentals.com';
const OUT = 'visual-check/hero';

const viewports = [
  { name: 'desktop', width: 1440, height: 900, deviceScaleFactor: 1 },
  { name: 'mobile', width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
];

const langs = [
  { path: '/', label: 'en' },
  { path: '/de/', label: 'de' },
];

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();

for (const vp of viewports) {
  for (const lang of langs) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: vp.deviceScaleFactor,
      isMobile: vp.isMobile || false,
      hasTouch: vp.hasTouch || false,
    });
    const page = await context.newPage();
    const url = BASE + lang.path;
    console.log(`\n=== ${vp.name} ${lang.label} (${vp.width}x${vp.height}) ===`);

    // Capture network requests so we can see if lygia.webp is requested
    const requests = [];
    page.on('request', (req) => {
      const u = req.url();
      if (u.includes('lygia') || u.includes('poster')) {
        requests.push(u);
      }
    });

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    // Give the hero a brief moment to render but capture early-state too
    await page.waitForTimeout(500);
    const earlyFile = `${OUT}/${vp.name}-${lang.label}-early.png`;
    await page.screenshot({ path: earlyFile, fullPage: false });
    console.log(`  ✓ early: ${earlyFile}`);

    // Wait for video to actually start
    await page.waitForTimeout(2500);
    const lateFile = `${OUT}/${vp.name}-${lang.label}-late.png`;
    await page.screenshot({ path: lateFile, fullPage: false });
    console.log(`  ✓ late:  ${lateFile}`);

    if (requests.length) {
      console.log(`  ! lygia/poster requests detected:`);
      for (const r of requests) console.log(`      ${r}`);
    } else {
      console.log(`  ✓ no lygia.webp requests`);
    }

    await context.close();
  }
}

await browser.close();
console.log(`\nDone. Screenshots in ./${OUT}/`);