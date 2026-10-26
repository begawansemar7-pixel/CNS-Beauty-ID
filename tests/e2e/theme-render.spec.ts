import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

// Final QA render check (CNS-11): the home page and /design-system render in
// both color schemes, `html.dark` follows prefers-color-scheme, and body copy
// keeps WCAG AA contrast against the page background in both modes.

const PAGES = ["/", "/design-system"];
const AXE_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"];

function luminance(rgb: string): number {
  const [r = 0, g = 0, b = 0] = (rgb.match(/\d+(\.\d+)?/g) ?? ["0", "0", "0"]).map(Number);
  const channel = (value: number) => {
    const s = value / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrast(fg: string, bg: string): number {
  const [a, b] = [luminance(fg), luminance(bg)];
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

async function open(page: Page, path: string): Promise<void> {
  const response = await page.goto(path);
  expect(response?.status() ?? 0, `${path} responds`).toBeLessThan(400);
  await page.waitForLoadState("networkidle");
  // Web fonts must be settled before axe measures target sizes and before the
  // contrast probe samples rendered text (fallback metrics differ).
  await page.evaluate(() => document.fonts.ready);
  // Must render the real page, not an error boundary or an empty shell.
  await expect(page.locator("h1").first(), `${path} rendered`).toBeVisible();
}

for (const scheme of ["light", "dark"] as const) {
  test.describe(`${scheme} mode render`, () => {
    test.use({ colorScheme: scheme, reducedMotion: "reduce" });

    for (const path of PAGES) {
      test(`${path} renders with ${scheme} tokens, axe-clean, AA body contrast`, async ({ page }) => {
        await open(page, path);

        if (scheme === "dark") {
          await expect(page.locator("html"), "html.dark applied").toHaveClass(/\bdark\b/);
        } else {
          await expect(page.locator("html"), "no html.dark in light").not.toHaveClass(/\bdark\b/);
        }

        const { color, backgroundColor } = await page.locator("body").evaluate((el) => {
          const style = getComputedStyle(el);
          return { color: style.color, backgroundColor: style.backgroundColor };
        });
        const ratio = contrast(color, backgroundColor);
        expect(ratio, `body text on page background (${color} on ${backgroundColor})`).toBeGreaterThanOrEqual(4.5);

        const results = await new AxeBuilder({ page }).withTags(AXE_TAGS).analyze();
        expect(results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(", ")}`)).toEqual([]);
      });
    }
  });
}
