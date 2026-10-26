import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

// Legion style discipline (docs/DESIGN_TOKENS.md): raw hex colors live only in
// src/app/globals.css, and className strings are full literal utility names so
// Tailwind can see them — never assembled from template interpolation.
const SCOPE = ["src/components", "src/features"];

function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? sourceFiles(path) : /\.(tsx?|css)$/.test(entry.name) ? [path] : [];
  });
}

function lineOf(source: string, index: number): number {
  return source.slice(0, index).split("\n").length;
}

/** Every className={...} expression in the file, braces balanced. */
function classNameExpressions(source: string): string[] {
  const expressions: string[] = [];
  for (let at = source.indexOf("className={"); at !== -1; at = source.indexOf("className={", at + 1)) {
    const open = at + "className=".length;
    let depth = 0;
    let end = source.length - 1;
    for (let i = open; i < source.length; i++) {
      if (source[i] === "{") depth += 1;
      else if (source[i] === "}") {
        depth -= 1;
        if (depth === 0) {
          end = i;
          break;
        }
      }
    }
    expressions.push(source.slice(open, end + 1));
  }
  return expressions;
}

const files = SCOPE.flatMap(sourceFiles);

describe("style discipline", () => {
  it("keeps raw hex colors out of components (tokens live in src/app/globals.css)", () => {
  const violations = files.flatMap((file) => {
    const source = readFileSync(file, "utf8");
    return source
      .split("\n")
      .map((line, i) => (/#\p{Hex_Digit}{3,8}\b/u.test(line) ? `${file}:${i + 1} ${line.trim()}` : null))
      .filter((hit): hit is string => hit !== null);
  });
  expect(violations).toEqual([]);
});

it("keeps classNames literal — no template-string class assembly", () => {
  const violations = files.flatMap((file) => {
    const source = readFileSync(file, "utf8");
    const dynamic = classNameExpressions(source)
      .filter((expression) => /`[^`]*\$\{/.test(expression))
      .map((expression) => `${file}:${lineOf(source, source.indexOf(expression))} ${expression.slice(0, 80)}`);
    const objectValues = (source.match(/className:\s*`[^`]*\$\{[^`]*`/g) ?? []).map((match) => `${file} ${match.slice(0, 80)}`);
    return [...dynamic, ...objectValues];
  });
  expect(violations).toEqual([]);
  });
});
