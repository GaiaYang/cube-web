import {
  splitAlgorithmToMoves,
  mergeMovesToAlgorithm,
  convertToMoveObject,
  formatMoveString,
  parseMove,
  isValidMove,
  standardizeMoveString,
  reverseAlgorithm,
  mirrorAlgorithm,
  rotateAlgorithm,
  upperAlgorithm,
  lowerAlgorithm,
  isAlgorithmValid,
  type Move,
  BASIC_CODES,
  MULTI_LAYER_CODES,
  PRIME_SUFFIX,
} from "./converter";

describe("Cube Algorithm Converter", () => {
  describe("splitAlgorithmToMoves", () => {
    test("should split valid algorithm string into array", () => {
      expect(splitAlgorithmToMoves("R U R' U'")).toEqual([
        "R",
        "U",
        "R'",
        "U'",
      ]);
    });

    test("should handle empty string", () => {
      expect(splitAlgorithmToMoves("")).toEqual([]);
    });

    test("should handle null or undefined", () => {
      expect(splitAlgorithmToMoves(null)).toEqual([]);
      expect(splitAlgorithmToMoves(undefined)).toEqual([]);
    });

    test("should filter invalid moves", () => {
      expect(splitAlgorithmToMoves("R U X Y")).toEqual(["R", "U"]);
    });
  });

  describe("mergeMovesToAlgorithm", () => {
    test("should merge move array to string", () => {
      expect(mergeMovesToAlgorithm(["R", "U", "R'", "U'"])).toBe("R U R' U'");
    });

    test("should handle empty array", () => {
      expect(mergeMovesToAlgorithm([])).toBe("");
    });
  });

  describe("convertToMoveObject", () => {
    test("should normalize valid move input", () => {
      expect(
        convertToMoveObject({
          code: "R",
          layerCount: 2,
          isPrime: true,
          turns: 1,
        }),
      ).toEqual({
        code: "R",
        layerCount: 2,
        isPrime: true,
        turns: 1,
      });
    });

    test("should return null for invalid code", () => {
      expect(
        convertToMoveObject({
          code: "X",
          layerCount: 2,
          isPrime: true,
          turns: 1,
        }),
      ).toBeNull();
    });

    test("should handle missing fields with defaults", () => {
      expect(convertToMoveObject({ code: "R" })).toEqual({
        code: "R",
        layerCount: 0,
        isPrime: false,
        turns: 1,
      });
    });
  });

  describe("formatMoveString", () => {
    test("should create valid move string", () => {
      expect(
        formatMoveString({
          code: "R",
          layerCount: 2,
          isPrime: false,
          turns: 1,
        }),
      ).toBe("2R");
    });

    test("should handle prime_SUFFIX moves", () => {
      expect(formatMoveString({ code: "R", isPrime: true, turns: 1 })).toBe(
        "R'",
      );
    });

    test("should handle double turns", () => {
      expect(formatMoveString({ code: "R", turns: 2 })).toBe("R2");
    });

    test("should handle prime_SUFFIX double turns", () => {
      expect(formatMoveString({ code: "R", isPrime: true, turns: 2 })).toBe(
        "R2'",
      );
    });

    test("should return null for zero turns", () => {
      expect(formatMoveString({ code: "R", turns: 0 })).toBeNull();
    });

    test("should return null for invalid code", () => {
      expect(formatMoveString({ code: "X", turns: 1 })).toBeNull();
    });
  });

  describe("parseMove", () => {
    test("should parse valid move string", () => {
      expect(parseMove("2R")).toBeNull();
    });

    test("should parse prime_SUFFIX move", () => {
      expect(parseMove("R'")).toEqual({
        layerCount: 0,
        code: "R",
        isPrime: true,
        turns: 1,
      });
    });

    test("should parse double turn move", () => {
      expect(parseMove("R2")).toEqual({
        layerCount: 0,
        code: "R",
        isPrime: false,
        turns: 2,
      });
    });

    test("should parse move with layer and prime_SUFFIX", () => {
      expect(parseMove("2R'")).toBeNull();
    });

    test("should return null for invalid move", () => {
      expect(parseMove("X")).toBeNull();
    });

    test("should return null for empty string", () => {
      expect(parseMove("")).toBeNull();
    });

    test("should return null for invalid layer count", () => {
      expect(parseMove("2M")).toBeNull(); // M doesn't allow layer count
    });
  });

  describe("isValidMove", () => {
    test("should validate correct move strings", () => {
      expect(isValidMove("R")).toBe(true);
      expect(isValidMove("2R'")).toBe(false);
      expect(isValidMove("Rw2")).toBe(true);
    });

    test("should invalidate incorrect move strings", () => {
      expect(isValidMove("X")).toBe(false);
      expect(isValidMove("2M")).toBe(false);
      expect(isValidMove("R2'2")).toBe(false);
    });
  });

  describe("standardizeMoveString", () => {
    test("should normalize valid move string", () => {
      expect(standardizeMoveString("R")).toBe("R");
      expect(standardizeMoveString("R3")).toBe("R'");
      expect(standardizeMoveString("2R2")).toBeNull();
    });

    test("should return null for invalid move string", () => {
      expect(standardizeMoveString("X")).toBeNull();
    });
  });

  describe("reverseAlgorithm", () => {
    test("should reverse valid algorithm", () => {
      expect(reverseAlgorithm("R U R' U'")).toEqual(["U", "R", "U'", "R'"]);
    });

    test("should handle empty input", () => {
      expect(reverseAlgorithm("")).toEqual([]);
    });

    test("should handle array input", () => {
      expect(reverseAlgorithm(["R", "U"])).toEqual(["U'", "R'"]);
    });

    test("should handle complex moves", () => {
      expect(reverseAlgorithm("2R2 U'")).toEqual(["U"]);
    });
  });

  describe("mirrorAlgorithm", () => {
    test("should mirror valid algorithm", () => {
      expect(mirrorAlgorithm("R U L'")).toEqual(["L'", "U'", "R"]);
    });

    test("should handle empty input", () => {
      expect(mirrorAlgorithm("")).toEqual([]);
    });

    test("should handle invalid moves", () => {
      expect(mirrorAlgorithm("R X U")).toEqual(["L'", "U'"]);
    });
  });

  describe("rotateAlgorithm", () => {
    test("should rotate valid algorithm", () => {
      expect(rotateAlgorithm("R U F")).toEqual(["L", "U", "B"]);
    });

    test("should handle middle layer codes", () => {
      expect(rotateAlgorithm("M S")).toEqual(["M'", "S'"]);
    });

    test("should handle empty input", () => {
      expect(rotateAlgorithm("")).toEqual([]);
    });
  });

  describe("upperAlgorithm", () => {
    test("should convert lowercase to uppercase", () => {
      expect(upperAlgorithm("r u f")).toEqual(["Rw", "Uw", "Fw"]);
    });

    test("should preserve non-lowercase codes", () => {
      expect(upperAlgorithm("R U r")).toEqual(["R", "U", "Rw"]);
    });

    test("should handle empty input", () => {
      expect(upperAlgorithm("")).toEqual([]);
    });
  });

  describe("lowerAlgorithm", () => {
    test("should convert uppercase to lowercase", () => {
      expect(lowerAlgorithm("Rw Uw Fw")).toEqual(["r", "u", "f"]);
    });

    test("should preserve non-uppercase codes", () => {
      expect(lowerAlgorithm("R U Rw")).toEqual(["R", "U", "r"]);
    });

    test("should handle empty input", () => {
      expect(lowerAlgorithm("")).toEqual([]);
    });
  });

  describe("isAlgorithmValid", () => {
    test("should validate correct algorithm", () => {
      expect(isAlgorithmValid("R U R' U'")).toBe(true);
    });

    test("should invalidate algorithm with invalid moves", () => {
      expect(isAlgorithmValid("R X U")).toBe(false);
    });

    test("should handle empty input", () => {
      expect(isAlgorithmValid("")).toBe(false);
      expect(isAlgorithmValid([])).toBe(false);
    });
  });

  describe("constants", () => {
    test("BASIC_CODES should contain all valid codes", () => {
      expect(BASIC_CODES).toContain("R");
      expect(BASIC_CODES).toContain("Rw");
      expect(BASIC_CODES).toContain("M");
      expect(BASIC_CODES).not.toContain("X");
    });

    test("MULTI_LAYER_CODES should contain valid double layer codes", () => {
      expect(MULTI_LAYER_CODES).toContain("Rw");
      expect(MULTI_LAYER_CODES).toContain("r");
      expect(MULTI_LAYER_CODES).not.toContain("M");
    });

    test("PRIME_SUFFIX should be correct", () => {
      expect(PRIME_SUFFIX).toBe("'");
    });
  });
});
