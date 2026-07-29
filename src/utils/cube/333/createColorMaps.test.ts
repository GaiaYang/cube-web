import createF2lColorMap from "./createF2lColorMap";
import createOllColorMap from "./createOllColorMap";
import createPllColorMap from "./createPllColorMap";

describe("333 color maps", () => {
  it("maps F2L positions from cube faces", () => {
    const result = createF2lColorMap(
      { "U-TL": "U", "F-BR": "F", "S-TL": "R" },
      "white",
      "green",
    );

    expect(result).toMatchObject({
      "U-TL": "white",
      "F-BR": "green",
      "S-TL": "red",
      "U-TC": "none",
    });
  });

  it("maps only marked OLL positions to the selected color", () => {
    const result = createOllColorMap(["TL", "S-BC"], "yellow");

    expect(result).toMatchObject({
      TL: "yellow",
      "S-BC": "yellow",
      TC: "none",
      "S-TL": "none",
    });
  });

  it("maps PLL top and side positions from cube faces", () => {
    const result = createPllColorMap(
      { "S-TL": "F", "S-RT": "R" },
      "white",
      "green",
    );

    expect(result).toMatchObject({
      TL: "white",
      BR: "white",
      "S-TL": "green",
      "S-RT": "red",
      "S-TC": "none",
    });
  });

  it("returns undefined for missing patterns or invalid colors", () => {
    expect(createF2lColorMap()).toBeUndefined();
    expect(createF2lColorMap({}, "white", "yellow")).toBeUndefined();
    expect(createOllColorMap()).toBeUndefined();
    expect(createOllColorMap(["TL"])).toBeUndefined();
    expect(createPllColorMap()).toBeUndefined();
    expect(createPllColorMap({}, "white", "yellow")).toBeUndefined();
  });
});
