import {
  mergeToAlgorithm,
  normalizeMoveString,
  isValidMoveString,
  isAlgorithmValid,
  reverseAlgorithm,
  mirrorAlgorithm,
  rotateAlgorithm,
  upperAlgorithm,
  lowerAlgorithm,
  parseMoveString,
  createMoveString,
  type Move,
} from "./converter";

describe("Move string parsing and normalization", () => {
  test("parseMoveString basic", () => {
    expect(parseMoveString("R")).toEqual({
      layerCount: 0,
      code: "R",
      isPrime: false,
      turns: 1,
    });
    expect(parseMoveString("R'")).toEqual({
      layerCount: 0,
      code: "R",
      isPrime: true,
      turns: 1,
    });
    expect(parseMoveString("R2")).toEqual({
      layerCount: 0,
      code: "R",
      isPrime: false,
      turns: 2,
    });
    expect(parseMoveString("2Rw2")).toEqual({
      layerCount: 2,
      code: "Rw",
      isPrime: false,
      turns: 2,
    });
    expect(parseMoveString("2Rw2'")).toEqual({
      layerCount: 2,
      code: "Rw",
      isPrime: true,
      turns: 2,
    });
  });

  test("parseMoveString invalid returns null", () => {
    expect(parseMoveString("R'2")).toBeNull();
    expect(parseMoveString("2R")).toBeNull();
    expect(parseMoveString("Rw'2")).toBeNull();
    expect(parseMoveString("")).toBeNull();
    expect(parseMoveString("Rw'3'")).toBeNull();
    expect(parseMoveString("R123a")).toBeNull();
  });

  test("isValidMoveString returns correct boolean", () => {
    expect(isValidMoveString("R")).toBe(true);
    expect(isValidMoveString("R'2")).toBe(false);
    expect(isValidMoveString("2R")).toBe(false);
  });

  test("normalizeMoveString works with all cases", () => {
    expect(normalizeMoveString("R")).toBe("R");
    expect(normalizeMoveString("R'")).toBe("R'");
    expect(normalizeMoveString("R2")).toBe("R2");
    expect(normalizeMoveString("R'2")).toBeNull();
    expect(normalizeMoveString("2Rw2'")).toBe("2Rw2'");
    expect(normalizeMoveString("2Rw'2")).toBeNull();
  });

  test("createMoveString handles missing code or 0 turns", () => {
    expect(createMoveString({ code: null })).toBeNull();
    expect(createMoveString({})).toBeNull();
    expect(createMoveString({ code: "R", turns: 0 })).toBeNull();
    expect(createMoveString({ code: "R", turns: 4 })).toBeNull(); // modulo 4 = 0
  });
});

describe("Algorithm validation", () => {
  test("isAlgorithmValid works", () => {
    expect(isAlgorithmValid("R U2 R2 F R F' U2 R' F R F'")).toBe(true);
    expect(isAlgorithmValid("R U2 R2 F R F' U2 R' F R F'2")).toBe(false);
    expect(isAlgorithmValid("A B C D")).toBe(false);
    expect(isAlgorithmValid("rw")).toBe(false);
    expect(isAlgorithmValid("2x")).toBe(false);
    expect(isAlgorithmValid("2x'")).toBe(false);
    expect(isAlgorithmValid("2R")).toBe(false);
    expect(isAlgorithmValid("")).toBe(false);
    expect(isAlgorithmValid(" ")).toBe(false);
    expect(isAlgorithmValid("R")).toBe(true);
    expect(isAlgorithmValid("x2'")).toBe(true);
  });

  test("mergeToAlgorithm works", () => {
    expect(mergeToAlgorithm(["R", "U", "R'"])).toBe("R U R'");
    expect(mergeToAlgorithm([])).toBe("");
  });
});

describe("Algorithm transformations", () => {
  const sample1 = "R U2 R2 F R F' U2 R' F R F'";
  const sample2 = "S R U R' U' R' F R Fw'";

  test("reverseAlgorithm", () => {
    expect(mergeToAlgorithm(reverseAlgorithm(sample1))).toEqual(
      "F R' F' R U2 F R' F' R2 U2 R'",
    );
    expect(mergeToAlgorithm(reverseAlgorithm(sample2))).toEqual(
      "Fw R' F' R U R U' R' S'",
    );
    // reverse empty or invalid
    expect(reverseAlgorithm([""] as unknown as Move[])).toEqual([]);
  });

  test("mirrorAlgorithm", () => {
    expect(mergeToAlgorithm(mirrorAlgorithm(sample1))).toEqual(
      "L' U2 L2 F' L' F U2 L F' L' F",
    );
    expect(mergeToAlgorithm(mirrorAlgorithm(sample2))).toEqual(
      "S' L' U' L U L F' L' Fw",
    );
    // mirror empty or invalid
    expect(mirrorAlgorithm([""] as unknown as Move[])).toEqual([]);
  });

  test("rotateAlgorithm", () => {
    expect(mergeToAlgorithm(rotateAlgorithm(sample1))).toEqual(
      "L U2 L2 B L B' U2 L' B L B'",
    );
    expect(mergeToAlgorithm(rotateAlgorithm(sample2))).toEqual(
      "S L U L' U' L' B L Bw'",
    );
    // rotate empty or invalid
    expect(rotateAlgorithm([""] as unknown as Move[])).toEqual([""]);
  });

  test("upperAlgorithm", () => {
    expect(mergeToAlgorithm(upperAlgorithm("r l u d f b"))).toEqual(
      "Rw Lw Uw Dw Fw Bw",
    );
    expect(mergeToAlgorithm(upperAlgorithm("Rw l Uw d Fw b"))).toEqual(
      "Rw Lw Uw Dw Fw Bw",
    );
    expect(mergeToAlgorithm(upperAlgorithm([""] as unknown as Move[]))).toEqual(
      "",
    );
  });

  test("lowerAlgorithm", () => {
    expect(mergeToAlgorithm(lowerAlgorithm("Rw Lw Uw Dw Fw Bw"))).toEqual(
      "r l u d f b",
    );
    expect(mergeToAlgorithm(lowerAlgorithm("Rw l Uw d Fw b"))).toEqual(
      "r l u d f b",
    );
    expect(mergeToAlgorithm(lowerAlgorithm([""] as unknown as Move[]))).toEqual(
      "",
    );
  });
});

describe("flipPrimeIfNeeded behavior (indirectly via reverse/mirror)", () => {
  test("handles turns === 2 and other cases", () => {
    // 2-turn prime stays same
    expect(mergeToAlgorithm(reverseAlgorithm(["R2", "R2'"]))).toEqual("R2' R2");
    // 1-turn prime flips
    expect(mergeToAlgorithm(reverseAlgorithm(["R", "R'"]))).toEqual("R R'");
  });
});
