import { describe, expect, it } from "vitest";
import { projectTotals } from "@/lib/display-settings";

describe("homepage project totals", () => {
  for (const [index, key] of ["completed_projects", "ongoing_projects", "upcoming_projects", "published_projects"].entries()) {
    it(`uses the saved ${key} instead of counting project rows`, () => {
      const totals = projectTotals({ section_key: "introduction", heading: "", body: "", extra: { [key]: 42 } }, []);
      expect(totals[index]?.value).toBe(42);
    });
  }
  it("preserves an explicit zero", () => {
    expect(projectTotals({ section_key: "introduction", heading: "", body: "", extra: { completed_projects: 0 } }, [{ status: "Completed" }])[0]?.value).toBe(0);
  });
  it("counts actual projects when no override is set", () => {
    expect(projectTotals(undefined, [{ status: "Completed" }, { status: "Ongoing" }, { status: "Upcoming" }]).map(row => row.value)).toEqual([1, 1, 1, 3]);
  });
});