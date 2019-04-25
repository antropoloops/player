import diff from "./diff";

describe("Sync diff", () => {
  it("diffs", () => {
    const before = [{ id: "voice1" }];
    const after = [{ id: "melody1" }];
    expect(diff(before, after)).toEqual({
      create: ["melody1"],
      delete: ["voice1"],
      keep: []
    });
  });
});
