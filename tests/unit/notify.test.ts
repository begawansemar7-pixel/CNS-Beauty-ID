import { describe, expect, it, vi } from "vitest";

vi.mock("sonner", () => ({ toast: vi.fn() }));

import { toast } from "sonner";

import { notify } from "@/lib/utils/notify";

describe("notify", () => {
  it("shows an acknowledge toast", () => {
    notify("Disimpan ke wishlist.");
    expect(toast).toHaveBeenCalledWith("Disimpan ke wishlist.");
  });
});
