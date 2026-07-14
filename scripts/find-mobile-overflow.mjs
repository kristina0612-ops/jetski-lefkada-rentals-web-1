// Diagnose horizontal overflow on mobile - finds which elements are wider
// than the viewport (causing the "wackelt links/rechts" feel).
import { chromium } from 'playwright';

const URL = 'https://www.jetski-lefkada-rentals.com/';
const VW = 390;

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: VW, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: 'networkidle' });

// Dismiss cookie banner
try {
  const reject = page.locator('button:has-text("Reject")').first();
  if (await reject.isVisible({ timeout: 1500 })) await reject.click();
} catch {}

const result = await page.evaluate((viewportWidth) => {
  const html = document.documentElement;
  const body = document.body;
  const out = {
    docWidth: html.scrollWidth,
    bodyWidth: body.scrollWidth,
    viewport: viewportWidth,
    overflowing: [],
  };
  const all = document.querySelectorAll('*');
  for (const el of all) {
    const r = el.getBoundingClientRect();
    // Anything extending past viewport right edge
    if (r.right > viewportWidth + 1 || r.left < -1) {
      // Skip elements inside known horizontal-scroll containers (Spots cards etc.)
      const closestScroller = el.closest('[class*="overflow-x"], [class*="snap-x"]');
      const ancestorWithOverflow = closestScroller && closestScroller !== el;
      out.overflowing.push({
        tag: el.tagName.toLowerCase(),
        id: el.id || null,
        cls: (el.className && typeof el.className === 'string' ? el.className.slice(0, 80) : null),
        left: Math.round(r.left),
        right: Math.round(r.right),
        width: Math.round(r.width),
        inScroller: !!ancestorWithOverflow,
      });
    }
  }
  // Limit output
  out.overflowing = out.overflowing.filter(x => !x.inScroller).slice(0, 30);
  return out;
}, VW);

console.log(`Document scrollWidth: ${result.docWidth}, viewport: ${result.viewport}`);
console.log(`Body scrollWidth: ${result.bodyWidth}`);
console.log(`Overflow delta: ${result.docWidth - result.viewport}px`);
console.log(`\nOverflowing elements (outside horizontal scrollers):`);
for (const x of result.overflowing) {
  console.log(`  <${x.tag}${x.id ? '#' + x.id : ''}> left=${x.left} right=${x.right} w=${x.width}`);
  if (x.cls) console.log(`    .${x.cls}`);
}

await browser.close();