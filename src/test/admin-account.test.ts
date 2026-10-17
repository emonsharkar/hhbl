import { describe, expect, it } from "vitest";
import { isDesignatedAdmin } from "@/lib/admin-account";

describe("Initial administrator registration", () => {
  it("allows only admin@haque.com to use initial registration", () => {
    expect(isDesignatedAdmin("admin@haque.com")).toBe(true);
    expect(isDesignatedAdmin("admin@admin.com")).toBe(false);
    expect(isDesignatedAdmin("visitor@haque.com")).toBe(false);
  });
});