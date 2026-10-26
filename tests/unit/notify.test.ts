import { readFileSync } from "node:fs";

import { describe, expect, it, vi } from "vitest";

vi.mock("sonner", () => ({ toast: vi.fn() }));

import { toast } from "sonner";

import { notify } from "@/lib/utils/notify";

describe("notify", () => {
  it("shows an acknowledge toast", () => {
    notify("Disimpan ke wishlist.");
    expect(toast).toHaveBeenCalledWith("Disimpan ke wishlist.");
  });

  // toast() alone is invisible — the root must mount the toast host.
  it("is visible because the root layout mounts the toast host", () => {
    expect(readFileSync("src/app/layout.tsx", "utf8")).toMatch(/<ToasterHost\s*\/?>/);
    expect(readFileSync("src/components/providers/toaster.tsx", "utf8")).toMatch(/<Toaster\b/);
  });
});
