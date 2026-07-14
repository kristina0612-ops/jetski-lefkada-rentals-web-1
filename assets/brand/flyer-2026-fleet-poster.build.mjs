// Builds the self-contained A3 fleet POSTER, and derives a print-ready A5 FLYER
// (148x210mm trim + 5mm bleed + crop marks). All photos + QR codes are inlined
// as base64 data URIs. Run: node flyer-2026-fleet-poster.build.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, extname } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));
const fleetDir = join(here, "..", "..", "public", "images", "fleet");

const assets = {
  __BG__: join(here, "..", "..", "public", "images", "spots", "meganisi.jpg"),
  __IMG_ENA__: join(fleetDir, "nero-ena.jpg"),
  __IMG_DIO__: join(fleetDir, "nero-dio-2026.jpg"),
  __IMG_TRIA__: join(fleetDir, "nero-tria.jpg"),
  __IMG_TESSERA__: join(fleetDir, "nero-tessera.jpg"),
  __QR_WEB__: join(here, "qr-web.png"),
  __QR_INSTA__: join(here, "qr-insta.svg"),
};

const MIME = { ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml" };

function dataUri(path) {
  const buf = readFileSync(path);
  const mime = MIME[extname(path).toLowerCase()] || "application/octet-stream";
  return `data:${mime};base64,${buf.toString("base64")}`;
}

// ---- 1) POSTER (A3, self-contained) ----
let html = readFileSync(join(here, "flyer-2026-fleet-poster.template.html"), "utf8");
for (const [token, path] of Object.entries(assets)) {
  html = html.replaceAll(token, dataUri(path));
}
const posterOut = join(here, "flyer-2026-fleet-poster.html");
writeFileSync(posterOut, html, "utf8");
console.log("Wrote", posterOut, `(${(html.length / 1024).toFixed(0)} KB)`);

// ---- 2) A5 FLYER (print-ready: trim 148x210 + 5mm bleed + crop marks) ----
// Document = 148x210 + 5mm bleed + 5mm mark zone = 168x230mm.
// Trim box: 10..158 (x), 10..220 (y).  Bleed box: 5..163, 5..225.
const flyerCss = `
  /* ===== PRINT-READY A5 FLYER: trim 148x210mm, +5mm bleed, +5mm crop-mark zone ===== */
  @page { size: 168mm 230mm; margin: 0; }
  body { background: #ffffff !important; }
  .flyerdoc {
    position: relative;
    width: 168mm; height: 230mm;
    background: #ffffff;
    overflow: hidden;
  }
  .bleed {
    position: absolute;
    top: 5mm; left: 5mm;
    width: 158mm; height: 220mm;
    overflow: hidden;
  }
  /* scale the A3 poster (297x420) to exactly fill the 158x220 bleed box */
  .flyerdoc .poster {
    transform: scale(0.53199, 0.52381);
    transform-origin: top left;
  }
  /* extra head/foot safety so no text falls into the 5mm trim */
  .flyerdoc header { padding-top: 18mm; }
  .flyerdoc footer { padding-bottom: 18mm; }
  .cm { position: absolute; background: #000000; }
`;

const marks = [
  '<div class="cm" style="left:9.85mm;top:0.5mm;width:0.3mm;height:4mm;"></div>',
  '<div class="cm" style="left:0.5mm;top:9.85mm;width:4mm;height:0.3mm;"></div>',
  '<div class="cm" style="left:157.85mm;top:0.5mm;width:0.3mm;height:4mm;"></div>',
  '<div class="cm" style="left:163.5mm;top:9.85mm;width:4mm;height:0.3mm;"></div>',
  '<div class="cm" style="left:9.85mm;top:225.5mm;width:0.3mm;height:4mm;"></div>',
  '<div class="cm" style="left:0.5mm;top:219.85mm;width:4mm;height:0.3mm;"></div>',
  '<div class="cm" style="left:157.85mm;top:225.5mm;width:0.3mm;height:4mm;"></div>',
  '<div class="cm" style="left:163.5mm;top:219.85mm;width:4mm;height:0.3mm;"></div>',
].join("\n      ");

const flyer = html
  .replace("</style>", flyerCss + "\n</style>")
  .replace(
    '<div class="poster">',
    `<div class="flyerdoc">\n      ${marks}\n      <div class="bleed">\n      <div class="poster">`
  )
  .replace("  </div>\n</body>", "  </div></div></div>\n</body>");

const flyerOut = join(here, "flyer-2026-fleet-FLYER-a5-bleed.html");
writeFileSync(flyerOut, flyer, "utf8");
console.log("Wrote", flyerOut, `(${(flyer.length / 1024).toFixed(0)} KB)`);