// One-shot visual verification of the live jetski site.
// Captures Fleet + WaterFun sections on Desktop + Mobile after a Vercel deploy.
// NOT committed - run via: node scripts/visual-check.mjs
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const URL = 'https://www.jetski-lefkada-rentals.com/';
const OUT = 'visual-check';

const viewports = [
  { name: 'desktop', width: 1440, height: 900, deviceScaleFactor: 1 },
  { name: 'mobile', width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
];

const sections = [
  { id: 'fleet', label: 'fleet' },
  { id: 'water-fun', label: 'waterfun' },
];

await mkdir(OUT, { recursive: true });

const browser = await chromium.launch();

for (const vp of viewports) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.deviceScaleFactor,
    isMobile: vp.isMobile || false,
    hasTouch: vp.hasTouch || false,
  });
  const page = await context.newPage();
  console.log(`\n=== ${vp.name} (${vp.width}x${vp.height}) ===`);
  console.log(`Loading ${URL} ...`);
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 30000 });

  // Dismiss cookie banner if visible
  try {
    const reject = page.locator('button:has-text("Reject"), button:has-text("Ablehnen")').first();
    if (await reject.isVisible({ timeout: 1500 })) {
      await reject.click();
      await page.waitForTimeout(300);
    }
  } catch {}

  for (const sec of sections) {
    const el = page.locator('#' + sec.id);
    try {
      await el.scrollIntoViewIfNeeded({ timeout: 5000 });
      await page.waitForTimeout(800); // let lazy images settle
      const file = `${OUT}/${vp.name}-${sec.label}.png`;
      await el.screenshot({ path: file });
      console.log(`  ✓ ${file}`);
    } catch (e) {
      console.log(`  ✗ ${sec.label}: ${e.message}`);
    }
  }

  await context.close();
}

await browser.close();
console.log(`\nDone. Screenshots in ./${OUT}/`);