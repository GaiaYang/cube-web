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
} from "./converter";

describe("Cube Algorithm Utilities", () => {
  describe("isValidMove", () => {
    test("should validate move strings", () => {
      expect(isValidMove("R")).toBe(true);
      expect(isValidMove("2Rw'")).toBe(true);
      expect(isValidMove("r2")).toBe(true);
      expect(isValidMove("M2")).toBe(true);
      expect(isValidMove("x'")).toBe(true);
      expect(isValidMove("3Rw")).toBe(true);
      expect(isValidMove("X")).toBe(false);
      expect(isValidMove("")).toBe(false);
      expect(isValidMove("2R")).toBe(false); // Non-multi-layer with layer count
      expect(isValidMove("R2'2")).toBe(false); // Invalid suffix
      expect(isValidMove("Rw2''")).toBe(false); // Multiple primes
      expect(isValidMove("2Rw2'2")).toBe(false); // Invalid suffix
      expect(isValidMove("2X")).toBe(false); // Invalid code with layer count
      expect(isValidMove("R2''")).toBe(false); // Malformed suffix
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
      expect(splitAlgorithmToMoves("M S2 3Rw'")).toEqual(["M", "S2", "3Rw'"]);
    });

    test("should split Move array", () => {
      expect(splitAlgorithmToMoves(["R", "U", "X" as Move, "R'"])).toEqual([
        "R",
        "U",
        "R'",
      ]);
      expect(splitAlgorithmToMoves(["X" as Move, "Y" as Move])).toEqual([]);
    });

    test("should handle invalid inputs", () => {
      expect(splitAlgorithmToMoves("")).toEqual([]);
      expect(splitAlgorithmToMoves(null)).toEqual([]);
      expect(splitAlgorithmToMoves(undefined)).toEqual([]);
      expect(splitAlgorithmToMoves("R X U 2Y")).toEqual(["R", "U"]);
    });
  });

  describe("mergeMovesToAlgorithm", () => {
    test("should merge valid moves to algorithm string", () => {
      expect(mergeMovesToAlgorithm(["R", "U", "R'"])).toBe("R U R'");
      expect(mergeMovesToAlgorithm(["M", "S2", "3Rw'"])).toBe("M S2 3Rw'");
    });

    test("should handle invalid moves", () => {
      expect(mergeMovesToAlgorithm(["R", "X" as Move, "U"])).toBe("R U");
      expect(mergeMovesToAlgorithm(["X" as Move, "Y" as Move])).toBe("");
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
      expect(formatMoveString({ code: "M", turns: 3, isPrime: true })).toBe(
        "M",
      );
      expect(formatMoveString({ code: "x", turns: 5 })).toBe("x");
      expect(
        formatMoveString({ code: "Rw", layerCount: 3, turns: -1 }),
      ).toBeNull();
      expect(
        formatMoveString({ code: "S", turns: -5, isPrime: true }),
      ).toBeNull();
      expect(formatMoveString({ code: "R", turns: 8 })).toBeNull(); // 8 % 4 = 0, but turns=2 after normalization
      expect(formatMoveString({ code: "r", layerCount: 0, turns: 1 })).toBe(
        "r",
      );
    });

    test("should handle zero turns", () => {
      expect(formatMoveString({ code: "R", turns: 0 })).toBeNull();
      expect(formatMoveString({ code: "R", turns: 4 })).toBeNull();
      expect(
        formatMoveString({ code: "Rw", layerCount: 2, turns: 0 }),
      ).toBeNull();
    });

    test("should handle invalid input", () => {
      expect(formatMoveString({ code: "X" })).toBeNull();
      expect(formatMoveString({ code: "" })).toBeNull();
      expect(formatMoveString({ code: null })).toBeNull();
      expect(formatMoveString({})).toBeNull();
      expect(formatMoveString({ code: "R", layerCount: -1 })).toBeNull(); // Invalid layer count
    });
  });

  describe("standardizeMoveString", () => {
    test("should standardize valid move strings", () => {
      expect(standardizeMoveString("R")).toBe("R");
      expect(standardizeMoveString("2Rw3")).toBe("2Rw'");
      expect(standardizeMoveString("r2")).toBe("r2");
      expect(standardizeMoveString("M3'")).toBe("M");
      expect(standardizeMoveString("x5")).toBe("x");
      expect(standardizeMoveString("3Rw8")).toBeNull(); // Large turns normalized
      expect(standardizeMoveString("S-1")).toBeNull(); // Negative turns
    });

    test("should handle invalid move strings", () => {
      expect(standardizeMoveString("X")).toBeNull();
      expect(standardizeMoveString("")).toBeNull();
      expect(standardizeMoveString("2R")).toBeNull();
      expect(standardizeMoveString("Rw2'2")).toBeNull();
      expect(standardizeMoveString("R2''")).toBeNull();
      expect(standardizeMoveString("2X")).toBeNull();
    });
  });

  describe("isAlgorithmValid", () => {
    test("should validate algorithm inputs", () => {
      expect(isAlgorithmValid("R U R' U'")).toBe(true);
      expect(isAlgorithmValid(["R", "U", "R'"])).toBe(true);
      expect(isAlgorithmValid("R X U")).toBe(false);
      expect(isAlgorithmValid(["R", "X" as Move, "U"])).toBe(false);
      expect(isAlgorithmValid("")).toBe(false);
      expect(isAlgorithmValid([])).toBe(false);
      expect(isAlgorithmValid(null)).toBe(false);
      expect(isAlgorithmValid(undefined)).toBe(false);
      expect(isAlgorithmValid("M S2 3Rw'")).toBe(true);
      expect(isAlgorithmValid(["X" as Move])).toBe(false);
    });
  });

  describe("reverseAlgorithm", () => {
    test("should reverse algorithm", () => {
      expect(reverseAlgorithm("R U R'")).toEqual(["R", "U'", "R'"]);
      expect(reverseAlgorithm(["R", "U", "R'"])).toEqual(["R", "U'", "R'"]);
      expect(reverseAlgorithm("M S2 3Rw'")).toEqual(["3Rw", "S2'", "M'"]);
      expect(reverseAlgorithm("")).toEqual([]);
      expect(reverseAlgorithm([])).toEqual([]);
    });

    test("should handle invalid moves", () => {
      expect(reverseAlgorithm("R X U")).toEqual(["U'", "R'"]);
      expect(reverseAlgorithm(["X" as Move])).toEqual([]);
    });
  });

  describe("mirrorAlgorithm", () => {
    test("should mirror algorithm", () => {
      expect(mirrorAlgorithm("R U L")).toEqual(["L'", "U'", "R'"]);
      expect(mirrorAlgorithm(["R", "U", "L"])).toEqual(["L'", "U'", "R'"]);
      expect(mirrorAlgorithm("r Lw M")).toEqual(["l'", "Rw'", "M'"]);
      expect(mirrorAlgorithm("x y z")).toEqual(["x'", "y'", "z'"]);
    });

    test("should handle invalid moves", () => {
      expect(mirrorAlgorithm("R X L")).toEqual(["L'", "R'"]);
      expect(mirrorAlgorithm(["X" as Move])).toEqual([]);
    });
  });

  describe("rotateAlgorithm", () => {
    test("should rotate algorithm", () => {
      expect(rotateAlgorithm("R U F")).toEqual(["L", "U", "B"]);
      expect(rotateAlgorithm(["R", "U", "F"])).toEqual(["L", "U", "B"]);
      expect(rotateAlgorithm("M S E")).toEqual(["M'", "S'", "E"]);
      expect(rotateAlgorithm("r Rw x")).toEqual(["l", "Lw", "x"]);
      expect(rotateAlgorithm("S2'")).toEqual(["S2"]);
    });

    test("should handle invalid moves", () => {
      expect(rotateAlgorithm("R X F")).toEqual(["L", "B"]);
      expect(rotateAlgorithm(["X" as Move])).toEqual([]);
    });
  });

  describe("upperAlgorithm", () => {
    test("should convert to upper case", () => {
      expect(upperAlgorithm("r u R")).toEqual(["Rw", "Uw", "R"]);
      expect(upperAlgorithm(["r", "u", "R"])).toEqual(["Rw", "Uw", "R"]);
      expect(upperAlgorithm("r l f")).toEqual(["Rw", "Lw", "Fw"]);
    });

    test("should handle non-lower layer codes", () => {
      expect(upperAlgorithm("R M x")).toEqual(["R", "M", "x"]);
      expect(upperAlgorithm("M S E")).toEqual(["M", "S", "E"]);
      expect(upperAlgorithm("x y z")).toEqual(["x", "y", "z"]);
      expect(upperAlgorithm("")).toEqual([]);
      expect(upperAlgorithm([])).toEqual([]);
    });
  });

  describe("lowerAlgorithm", () => {
    test("should convert to lower case", () => {
      expect(lowerAlgorithm("Rw Uw R")).toEqual(["r", "u", "R"]);
      expect(lowerAlgorithm(["Rw", "Uw", "R"])).toEqual(["r", "u", "R"]);
      expect(lowerAlgorithm("Rw Lw Fw")).toEqual(["r", "l", "f"]);
    });

    test("should handle non-upper layer codes", () => {
      expect(lowerAlgorithm("R M x")).toEqual(["R", "M", "x"]);
      expect(lowerAlgorithm("M S E")).toEqual(["M", "S", "E"]);
      expect(lowerAlgorithm("x y z")).toEqual(["x", "y", "z"]);
      expect(lowerAlgorithm("")).toEqual([]);
      expect(lowerAlgorithm([])).toEqual([]);
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
      expect(MULTI_LAYER_CODES).toEqual([
        ...LOWER_LAYER_CODES,
        ...UPPER_LAYER_CODES,
      ]);
      expect(BASIC_CODES).toEqual([
        ...LOWER_LAYER_CODES,
        ...UPPER_LAYER_CODES,
        ...MIDDLE_LAYER_CODES,
        ...AXIS_CODES,
        ...SINGLE_LAYER_CODES,
      ]);
    });
  });
});
