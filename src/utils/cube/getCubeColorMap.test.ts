import getCubeColorMap from "./getCubeColorMap";

describe("getCubeColorMap", () => {
  it("maps white-up green-front to standard Western scheme", () => {
    expect(getCubeColorMap("white", "green")).toEqual({
      U: "white",
      D: "yellow",
      F: "green",
      B: "blue",
      L: "orange",
      R: "red",
    });
  });

  it("returns null for missing, none, same, or opposite faces", () => {
    expect(getCubeColorMap()).toBeNull();
    expect(getCubeColorMap("white")).toBeNull();
    expect(getCubeColorMap("none", "green")).toBeNull();
    expect(getCubeColorMap("white", "white")).toBeNull();
    expect(getCubeColorMap("white", "yellow")).toBeNull();
  });

  it("keeps left/right opposite when yellow is up", () => {
    expect(getCubeColorMap("yellow", "green")).toEqual({
      U: "yellow",
      D: "white",
      F: "green",
      B: "blue",
      L: "red",
      R: "orange",
    });
  });
});
