/*
 * Postinstall: patch @legion-ui-kit/react-core.
 *
 * The kit ships one invalid CSS selector (`:after:not(.x)` — pseudo-elements
 * cannot take `:not()`), which strict CSS parsers (Lightning CSS/Turbopack)
 * reject at build time. Browsers already drop such selectors silently, so
 * stripping the `:not(...)` suffix reproduces browser behaviour and only
 * affects the kit's Step component. Idempotent: no-op when already patched.
 */
const fs = require("fs");
const path = require("path");

const targets = [
  "@legion-ui-kit/react-core/dist/esm/styles.css",
  "@legion-ui-kit/react-core/dist/cjs/styles.css",
];

for (const rel of targets) {
  const file = path.join(__dirname, "..", "node_modules", rel);
  if (!fs.existsSync(file)) continue;
  const css = fs.readFileSync(file, "utf8");
  const patched = css.replace(/(:after|:before):not\([^)]*\)/g, "$1");
  if (patched !== css) {
    fs.writeFileSync(file, patched);
    console.log(`[patch-legion-kit-css] patched ${rel}`);
  }
}
