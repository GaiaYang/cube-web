import {
  parseMove,
  formatMove,
  formatMoveToken,
  parseAlgorithm,
  formatAlgorithm,
  mirrorAlgorithm,
  reverseAlgorithm,
  rotateAlgorithm,
} from "./nnn";
import type { MoveToken } from "../types";

describe("nnn.ts", () => {
  describe("parseMove", () => {
    test("should parse valid move strings", () => {
      expect(parseMove("R")).toEqual({
        sliceCount: null,
        code: "R",
        turnCount: 1,
        isPrime: false,
      });
      expect(parseMove("Rw2'")).toEqual({
        sliceCount: null,
        code: "Rw",
        turnCount: 2,
        isPrime: true,
      });
    });

    test("should return null for invalid move strings", () => {
      expect(parseMove("X")).toBeNull();
      expect(parseMove("2R")).toBeNull(); // Invalid slice count for non-wide move
      expect(parseMove("")).toBeNull();
      expect(parseMove(null)).toBeNull();
    });
  });

  describe("formatMove", () => {
    test("should format valid move strings", () => {
      expect(formatMove("R")).toBe("R");
      expect(formatMove("Rw2'")).toBe("Rw2'");
    });

    test("should return empty string for invalid move strings", () => {
      expect(formatMove("X")).toBe("");
      expect(formatMove("2R")).toBe("");
      expect(formatMove("")).toBe("");
      expect(formatMove(null)).toBe("");
    });
  });

  describe("formatMoveToken", () => {
    test("should format valid MoveToken", () => {
      const token: MoveToken = {
        sliceCount: null,
        code: "R",
        turnCount: 1,
        isPrime: false,
      };
      expect(formatMoveToken(token)).toBe("R");
      expect(
        formatMoveToken({
          sliceCount: null,
          code: "Rw",
          turnCount: 2,
          isPrime: true,
        }),
      ).toBe("Rw2'");
    });

    test("should return empty string for invalid MoveToken", () => {
      const token = {
        sliceCount: null,
        code: "X",
        turnCount: 1,
        isPrime: false,
      };
      expect(formatMoveToken(token)).toBe("");
      expect(formatMoveToken(null)).toBe("");
    });
  });

  describe("parseAlgorithm", () => {
    test("should parse valid algorithm string", () => {
      expect(parseAlgorithm("R U F2")).toEqual([
        { sliceCount: null, code: "R", turnCount: 1, isPrime: false },
        { sliceCount: null, code: "U", turnCount: 1, isPrime: false },
        { sliceCount: null, code: "F", turnCount: 2, isPrime: false },
      ]);
    });

    test("should return empty array for invalid algorithm", () => {
      expect(parseAlgorithm("R X U")).toEqual([]);
      expect(parseAlgorithm("")).toEqual([]);
      expect(parseAlgorithm(null)).toEqual([]);
    });
  });

  describe("formatAlgorithm", () => {
    test("should format valid MoveToken array", () => {
      const tokens: MoveToken[] = [
        { sliceCount: null, code: "R", turnCount: 1, isPrime: false },
        { sliceCount: null, code: "U", turnCount: 1, isPrime: true },
      ];
      expect(formatAlgorithm(tokens)).toBe("R U'");
    });

    test("should format valid string array", () => {
      expect(formatAlgorithm(["R", "U'"])).toBe("R U'");
    });

    test("should return empty string for invalid input", () => {
      expect(formatAlgorithm(["R", "X"])).toBe("");
      expect(formatAlgorithm(null)).toBe("");
      expect(formatAlgorithm([])).toBe("");
    });
  });

  describe("mirrorAlgorithm", () => {
    test("should mirror valid algorithm", () => {
      const tokens: MoveToken[] = [
        { sliceCount: null, code: "R", turnCount: 1, isPrime: false },
        { sliceCount: null, code: "U", turnCount: 1, isPrime: true },
      ];
      expect(mirrorAlgorithm(tokens)).toEqual([
        { sliceCount: null, code: "L", turnCount: 1, isPrime: true },
        { sliceCount: null, code: "U", turnCount: 1, isPrime: false },
      ]);
    });

    test("should return empty array for invalid moves", () => {
      const tokens = [
        { sliceCount: null, code: "X", turnCount: 1, isPrime: false },
      ];
      expect(mirrorAlgorithm(tokens)).toEqual([]);
    });
  });

  describe("reverseAlgorithm", () => {
    test("should reverse valid algorithm", () => {
      const tokens: MoveToken[] = [
        { sliceCount: null, code: "R", turnCount: 1, isPrime: false },
        { sliceCount: null, code: "U", turnCount: 1, isPrime: true },
      ];
      expect(reverseAlgorithm(tokens)).toEqual([
        { sliceCount: null, code: "U", turnCount: 1, isPrime: false },
        { sliceCount: null, code: "R", turnCount: 1, isPrime: true },
      ]);
    });

    test("should return empty array for invalid moves", () => {
      const tokens = [
        { sliceCount: null, code: "X", turnCount: 1, isPrime: false },
      ];
      expect(reverseAlgorithm(tokens)).toEqual([]);
    });
  });

  describe("rotateAlgorithm", () => {
    test("should rotate valid algorithm", () => {
      const tokens: MoveToken[] = [
        { sliceCount: null, code: "F", turnCount: 1, isPrime: false },
        { sliceCount: null, code: "x", turnCount: 1, isPrime: false },
      ];
      expect(rotateAlgorithm(tokens)).toEqual([
        { sliceCount: null, code: "B", turnCount: 1, isPrime: false },
        { sliceCount: null, code: "x", turnCount: 1, isPrime: true },
      ]);
    });

    test("should return empty array for invalid moves", () => {
      const tokens = [
        { sliceCount: null, code: "X", turnCount: 1, isPrime: false },
      ];
      expect(rotateAlgorithm(tokens)).toEqual([]);
    });
  });
});
