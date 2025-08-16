import {
  type Move,
  modulo,
  normalizeTurns,
  isMultiLayer,
  isLowerLayerCode,
  isUpperLayerCode,
  convertToMoveObject,
  getMoveSuffix,
  parseMove,
  isValidMove,
  splitAlgorithmToMoves,
  mergeMovesToAlgorithm,
  formatMoveString,
  standardizeMoveString,
  isAlgorithmValid,
  mapMoves,
  adjustPrimeForAxis,
  reverseAlgorithm,
  mirrorAlgorithm,
  rotateAlgorithm,
  upperAlgorithm,
  lowerAlgorithm,
  BASIC_CODES,
  MULTI_LAYER_CODES,
  LOWER_LAYER_CODES,
  UPPER_LAYER_CODES,
  REVERSE_AXES,
  MIRROR_MAP,
  ROTATE_MAP,
  LOWER_TO_UPPER_MAP,
  UPPER_TO_LOWER_MAP,
  CUBE_FACES,
  PRIME_SUFFIX,
  SEPARATOR,
} from "./converter";

describe("Cube Algorithm Utilities", () => {
  describe("modulo", () => {
    test("should handle positive numbers", () => {
      expect(modulo(7, 4)).toBe(3);
    });

    test("should handle negative numbers", () => {
      expect(modulo(-7, 4)).toBe(1);
    });

    test("should handle zero divisor", () => {
      expect(modulo(5, 0)).toBe(0);
    });
  });

  describe("normalizeTurns", () => {
    test("should normalize turns without prime", () => {
      expect(normalizeTurns(5)).toBe(1);
      expect(normalizeTurns(0)).toBe(0);
      expect(normalizeTurns(4)).toBe(0);
    });

    test("should normalize turns with prime", () => {
      expect(normalizeTurns(1, true)).toBe(3);
      expect(normalizeTurns(2, true)).toBe(2);
      expect(normalizeTurns(3, true)).toBe(1);
    });
  });

  describe("isMultiLayer", () => {
    test("should identify multi-layer codes", () => {
      expect(isMultiLayer("r")).toBe(true);
      expect(isMultiLayer("Rw")).toBe(true);
      expect(isMultiLayer("R")).toBe(false);
      expect(isMultiLayer("M")).toBe(false);
    });
  });

  describe("isLowerLayerCode", () => {
    test("should identify lower layer codes", () => {
      expect(isLowerLayerCode("r")).toBe(true);
      expect(isLowerLayerCode("Rw")).toBe(false);
      expect(isLowerLayerCode("R")).toBe(false);
    });
  });

  describe("isUpperLayerCode", () => {
    test("should identify upper layer codes", () => {
      expect(isUpperLayerCode("Rw")).toBe(true);
      expect(isUpperLayerCode("r")).toBe(false);
      expect(isUpperLayerCode("R")).toBe(false);
    });
  });

  describe("convertToMoveObject", () => {
    test("should convert valid MoveInput to MoveObject", () => {
      expect(
        convertToMoveObject({
          code: "R",
          layerCount: 1,
          isPrime: true,
          turns: 2,
        }),
      ).toEqual({
        code: "R",
        layerCount: 1,
        isPrime: true,
        turns: 2,
      });
    });

    test("should handle missing or invalid code", () => {
      expect(convertToMoveObject({ code: "X" })).toBeNull();
      expect(convertToMoveObject({ code: "" })).toBeNull();
      expect(convertToMoveObject({ code: null })).toBeNull();
    });
  });

  describe("getMoveSuffix", () => {
    test("should return correct suffix", () => {
      expect(getMoveSuffix(1, false)).toBe("");
      expect(getMoveSuffix(2, false)).toBe("2");
      expect(getMoveSuffix(2, true)).toBe("2'");
      expect(getMoveSuffix(3, false)).toBe("'");
    });
  });

  describe("parseMove", () => {
    test("should parse valid move strings", () => {
      expect(parseMove("R")).toEqual({
        layerCount: 0,
        code: "R",
        isPrime: false,
        turns: 1,
      });
      expect(parseMove("2Rw'")).toEqual({
        layerCount: 2,
        code: "Rw",
        isPrime: true,
        turns: 1,
      });
      expect(parseMove("r2")).toEqual({
        layerCount: 0,
        code: "r",
        isPrime: false,
        turns: 2,
      });
    });

    test("should handle invalid move strings", () => {
      expect(parseMove("")).toBeNull();
      expect(parseMove("X")).toBeNull();
      expect(parseMove("2R")).toBeNull();
      expect(parseMove("R2'2")).toBeNull();
    });
  });

  describe("isValidMove", () => {
    test("should validate move strings", () => {
      expect(isValidMove("R")).toBe(true);
      expect(isValidMove("2Rw'")).toBe(true);
      expect(isValidMove("X")).toBe(false);
      expect(isValidMove("")).toBe(false);
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
    });
  });

  describe("mapMoves", () => {
    test("should transform moves with transformer", () => {
      const transformer = (m: any) => ({ ...m, isPrime: !m.isPrime });
      expect(mapMoves("R U", transformer)).toEqual(["R'", "U'"]);
    });

    test("should handle reverse order", () => {
      const transformer = (m: any) => m;
      expect(mapMoves("R U", transformer, true)).toEqual(["U", "R"]);
    });

    test("should skip invalid moves", () => {
      const transformer = (m: any) => m;
      expect(mapMoves("R X U", transformer)).toEqual(["R", "U"]);
    });
  });

  describe("adjustPrimeForAxis", () => {
    test("should adjust prime for M/S axes", () => {
      expect(adjustPrimeForAxis("M", true)).toBe(false);
      expect(adjustPrimeForAxis("S", false)).toBe(true);
      expect(adjustPrimeForAxis("R", true)).toBe(true);
    });
  });

  describe("reverseAlgorithm", () => {
    test("should reverse algorithm", () => {
      expect(reverseAlgorithm("R U R'")).toEqual(["R", "U'", "R'"]);
    });
  });

  describe("mirrorAlgorithm", () => {
    test("should mirror algorithm", () => {
      expect(mirrorAlgorithm("R U L")).toEqual(["L'", "U'", "R'"]);
    });
  });

  describe("rotateAlgorithm", () => {
    test("should rotate algorithm", () => {
      expect(rotateAlgorithm("R U F")).toEqual(["L", "U", "B"]);
    });
  });

  describe("upperAlgorithm", () => {
    test("should convert to upper case", () => {
      expect(upperAlgorithm("r u R")).toEqual(["Rw", "Uw", "R"]);
    });
  });

  describe("lowerAlgorithm", () => {
    test("should convert to lower case", () => {
      expect(lowerAlgorithm("Rw Uw R")).toEqual(["r", "u", "R"]);
    });
  });

  describe("Constants", () => {
    test("should have correct constant values", () => {
      expect(SEPARATOR).toBe(" ");
      expect(PRIME_SUFFIX).toBe("'");
      expect(CUBE_FACES).toBe(4);
      expect(LOWER_LAYER_CODES).toEqual(["r", "l", "u", "d", "f", "b"]);
      expect(UPPER_LAYER_CODES).toEqual(["Rw", "Lw", "Uw", "Dw", "Fw", "Bw"]);
      expect(MULTI_LAYER_CODES).toContain("r");
      expect(MULTI_LAYER_CODES).toContain("Rw");
      expect(BASIC_CODES).toContain("R");
      expect(BASIC_CODES).toContain("M");
      expect(REVERSE_AXES.has("M")).toBe(true);
      expect(MIRROR_MAP["R"]).toBe("L");
      expect(ROTATE_MAP["F"]).toBe("B");
      expect(LOWER_TO_UPPER_MAP["r"]).toBe("Rw");
      expect(UPPER_TO_LOWER_MAP["Rw"]).toBe("r");
    });
  });
});
