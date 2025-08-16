import {
  type Move,
  isValidMove,
  splitAlgorithmToMoves,
  mergeMovesToAlgorithm,
  formatMoveString,
  standardizeMoveString,
  isAlgorithmValid,
  reverseAlgorithm,
  mirrorAlgorithm,
  rotateAlgorithm,
  upperAlgorithm,
  lowerAlgorithm,
  SEPARATOR,
  PRIME_SUFFIX,
  CUBE_FACES,
  LOWER_LAYER_CODES,
  UPPER_LAYER_CODES,
  MIDDLE_LAYER_CODES,
  AXIS_CODES,
  SINGLE_LAYER_CODES,
  MULTI_LAYER_CODES,
  BASIC_CODES,
  SORTED_BASIC_CODES,
  MIRROR_MAP,
  ROTATE_MAP,
  LOWER_TO_UPPER_MAP,
  UPPER_TO_LOWER_MAP,
} from "./converter";

describe("Cube Algorithm Utilities", () => {
  describe("isValidMove", () => {
    test("should validate move strings", () => {
      expect(isValidMove("R")).toBe(true);
      expect(isValidMove("2Rw'")).toBe(true);
      expect(isValidMove("r2")).toBe(true);
      expect(isValidMove("X")).toBe(false);
      expect(isValidMove("")).toBe(false);
      expect(isValidMove("2R")).toBe(false);
      expect(isValidMove("R2'2")).toBe(false);
    });
  });

  describe("splitAlgorithmToMoves", () => {
    test("should split valid algorithm string", () => {
      expect(splitAlgorithmToMoves("R U R' U'")).toEqual([
        "R",
        "U",
        "R'",
        "U'",
      ]);
    });

    test("should split Move array", () => {
      expect(
        splitAlgorithmToMoves(["R", "U", "X" as unknown as Move, "R'"]),
      ).toEqual(["R", "U", "R'"]);
    });

    test("should handle invalid inputs", () => {
      expect(splitAlgorithmToMoves("")).toEqual([]);
      expect(splitAlgorithmToMoves(null)).toEqual([]);
      expect(splitAlgorithmToMoves(undefined)).toEqual([]);
    });
  });

  describe("mergeMovesToAlgorithm", () => {
    test("should merge valid moves to algorithm string", () => {
      expect(mergeMovesToAlgorithm(["R", "U", "R'"])).toBe("R U R'");
    });

    test("should handle invalid moves", () => {
      expect(mergeMovesToAlgorithm(["R", "X" as unknown as Move, "U"])).toBe(
        "R U",
      );
    });

    test("should handle empty or invalid input", () => {
      expect(mergeMovesToAlgorithm([])).toBe("");
      expect(mergeMovesToAlgorithm(undefined)).toBe("");
    });
  });

  describe("formatMoveString", () => {
    test("should format valid MoveInput", () => {
      expect(formatMoveString({ code: "R", turns: 1 })).toBe("R");
      expect(
        formatMoveString({ code: "Rw", layerCount: 2, isPrime: true }),
      ).toBe("2Rw'");
      expect(formatMoveString({ code: "r", turns: 2 })).toBe("r2");
    });

    test("should handle zero turns", () => {
      expect(formatMoveString({ code: "R", turns: 0 })).toBeNull();
    });

    test("should handle invalid input", () => {
      expect(formatMoveString({ code: "X" })).toBeNull();
      expect(formatMoveString({ code: "" })).toBeNull();
      expect(formatMoveString({ code: null })).toBeNull();
    });
  });

  describe("standardizeMoveString", () => {
    test("should standardize valid move strings", () => {
      expect(standardizeMoveString("R")).toBe("R");
      expect(standardizeMoveString("2Rw3")).toBe("2Rw'");
      expect(standardizeMoveString("r2")).toBe("r2");
    });

    test("should handle invalid move strings", () => {
      expect(standardizeMoveString("X")).toBeNull();
      expect(standardizeMoveString("")).toBeNull();
    });
  });

  describe("isAlgorithmValid", () => {
    test("should validate algorithm inputs", () => {
      expect(isAlgorithmValid("R U R' U'")).toBe(true);
      expect(isAlgorithmValid(["R", "U", "R'"])).toBe(true);
      expect(isAlgorithmValid("R X U")).toBe(false);
      expect(isAlgorithmValid("")).toBe(false);
      expect(isAlgorithmValid([])).toBe(false);
      expect(isAlgorithmValid(null)).toBe(false);
      expect(isAlgorithmValid(undefined)).toBe(false);
    });
  });

  describe("reverseAlgorithm", () => {
    test("should reverse algorithm", () => {
      expect(reverseAlgorithm("R U R'")).toEqual(["R", "U'", "R'"]);
      expect(reverseAlgorithm(["R", "U", "R'"])).toEqual(["R", "U'", "R'"]);
    });

    test("should handle invalid moves", () => {
      expect(reverseAlgorithm("R X U")).toEqual(["U'", "R'"]);
    });
  });

  describe("mirrorAlgorithm", () => {
    test("should mirror algorithm", () => {
      expect(mirrorAlgorithm("R U L")).toEqual(["L'", "U'", "R'"]);
      expect(mirrorAlgorithm(["R", "U", "L"])).toEqual(["L'", "U'", "R'"]);
    });

    test("should handle invalid moves", () => {
      expect(mirrorAlgorithm("R X L")).toEqual(["L'", "R'"]);
    });
  });

  describe("rotateAlgorithm", () => {
    test("should rotate algorithm", () => {
      expect(rotateAlgorithm("R U F")).toEqual(["L", "U", "B"]);
      expect(rotateAlgorithm(["R", "U", "F"])).toEqual(["L", "U", "B"]);
    });

    test("should handle M/S axes", () => {
      expect(rotateAlgorithm("M S")).toEqual(["M'", "S'"]);
    });
  });

  describe("upperAlgorithm", () => {
    test("should convert to upper case", () => {
      expect(upperAlgorithm("r u R")).toEqual(["Rw", "Uw", "R"]);
      expect(upperAlgorithm(["r", "u", "R"])).toEqual(["Rw", "Uw", "R"]);
    });

    test("should handle non-lower layer codes", () => {
      expect(upperAlgorithm("R M x")).toEqual(["R", "M", "x"]);
    });
  });

  describe("lowerAlgorithm", () => {
    test("should convert to lower case", () => {
      expect(lowerAlgorithm("Rw Uw R")).toEqual(["r", "u", "R"]);
      expect(lowerAlgorithm(["Rw", "Uw", "R"])).toEqual(["r", "u", "R"]);
    });

    test("should handle non-upper layer codes", () => {
      expect(lowerAlgorithm("R M x")).toEqual(["R", "M", "x"]);
    });
  });

  describe("Constants", () => {
    test("should have correct constant values", () => {
      expect(SEPARATOR).toBe(" ");
      expect(PRIME_SUFFIX).toBe("'");
      expect(CUBE_FACES).toBe(4);
      expect(LOWER_LAYER_CODES).toEqual(["r", "l", "u", "d", "f", "b"]);
      expect(UPPER_LAYER_CODES).toEqual(["Rw", "Lw", "Uw", "Dw", "Fw", "Bw"]);
      expect(MIDDLE_LAYER_CODES).toEqual(["M", "S", "E"]);
      expect(AXIS_CODES).toEqual(["x", "y", "z"]);
      expect(SINGLE_LAYER_CODES).toEqual(["R", "L", "U", "D", "F", "B"]);
      expect(MULTI_LAYER_CODES).toContain("r");
      expect(MULTI_LAYER_CODES).toContain("Rw");
      expect(BASIC_CODES).toContain("R");
      expect(BASIC_CODES).toContain("M");
      expect(SORTED_BASIC_CODES[0].length).toBeGreaterThanOrEqual(
        SORTED_BASIC_CODES[SORTED_BASIC_CODES.length - 1].length,
      );
      expect(MIRROR_MAP["R"]).toBe("L");
      expect(ROTATE_MAP["F"]).toBe("B");
      expect(LOWER_TO_UPPER_MAP["r"]).toBe("Rw");
      expect(UPPER_TO_LOWER_MAP["Rw"]).toBe("r");
    });
  });
});
