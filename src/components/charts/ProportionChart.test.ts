import { buildProportionSlices } from "./ProportionChart";

describe("buildProportionSlices", () => {
  it("keeps two-look OLL stages and fills the unused remainder to 57", () => {
    const { used, rest, slices } = buildProportionSlices(
      [
        { name: "第一階段", value: 3 },
        { name: "第二階段", value: 7 },
      ],
      57,
    );

    expect(used).toBe(10);
    expect(rest).toBe(47);
    expect(slices.map(({ name, value }) => ({ name, value }))).toEqual([
      { name: "第一階段", value: 3 },
      { name: "第二階段", value: 7 },
      { name: "其餘", value: 47 },
    ]);
  });

  it("omits the remainder slice when stages already reach maxValue", () => {
    const { used, rest, slices } = buildProportionSlices(
      [{ name: "完整", value: 21 }],
      21,
    );

    expect(used).toBe(21);
    expect(rest).toBe(0);
    expect(slices).toEqual([
      expect.objectContaining({ name: "完整", value: 21 }),
    ]);
  });
});
