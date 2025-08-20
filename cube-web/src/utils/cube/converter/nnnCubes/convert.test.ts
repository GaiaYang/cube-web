import { mirrorMove, reverseMove, rotateMove } from "./convert";
import type { MoveToken } from "./types";

describe("convert.ts", () => {
  describe("mirrorMove", () => {
    test("should mirror valid moves correctly", () => {
      const testCases: [MoveToken, MoveToken][] = [
        [
          { code: "R", sliceCount: null, turnCount: 1, isPrime: false },
          { code: "L", sliceCount: null, turnCount: 1, isPrime: true },
        ],
        [
          { code: "Rw", sliceCount: null, turnCount: 1, isPrime: true },
          { code: "Lw", sliceCount: null, turnCount: 1, isPrime: false },
        ],
        [
          { code: "U", sliceCount: null, turnCount: 2, isPrime: false },
          { code: "U", sliceCount: null, turnCount: 2, isPrime: true },
        ],
        [
          { code: "F", sliceCount: null, turnCount: 1, isPrime: true },
          { code: "F", sliceCount: null, turnCount: 1, isPrime: false },
        ],
        [
          { code: "M", sliceCount: null, turnCount: 1, isPrime: false },
          { code: "M", sliceCount: null, turnCount: 1, isPrime: true },
        ],
        [
          { code: "E", sliceCount: null, turnCount: 1, isPrime: true },
          { code: "E", sliceCount: null, turnCount: 1, isPrime: false },
        ],
        [
          { code: "S", sliceCount: null, turnCount: 2, isPrime: false },
          { code: "S", sliceCount: null, turnCount: 2, isPrime: true },
        ],
        [
          { code: "L", sliceCount: null, turnCount: 1, isPrime: false },
          { code: "R", sliceCount: null, turnCount: 1, isPrime: true },
        ],
        [
          { code: "D", sliceCount: null, turnCount: 1, isPrime: true },
          { code: "D", sliceCount: null, turnCount: 1, isPrime: false },
        ],
        [
          { code: "B", sliceCount: null, turnCount: 2, isPrime: false },
          { code: "B", sliceCount: null, turnCount: 2, isPrime: true },
        ],
      ];
      testCases.forEach(([input, expected]) => {
        expect(mirrorMove(input)).toEqual(expected);
      });
    });

    test("should return null for invalid moves", () => {
      const move: MoveToken = {
        code: "Invalid",
        sliceCount: null,
        turnCount: 1,
        isPrime: false,
      };
      expect(mirrorMove(move)).toBeNull();
    });

    test("should handle malformed MoveToken", () => {
      const malformedToken = { code: "R" } as MoveToken;
      expect(mirrorMove(malformedToken)).toEqual({
        code: "L",
        sliceCount: null,
        turnCount: 1,
        isPrime: true,
      });
    });

    test("should handle non-null sliceCount", () => {
      const move: MoveToken = {
        code: "Rw",
        sliceCount: 2,
        turnCount: 1,
        isPrime: false,
      };
      expect(mirrorMove(move)).toEqual({
        code: "Lw",
        sliceCount: 2,
        turnCount: 1,
        isPrime: false,
      });
    });
  });

  describe("reverseMove", () => {
    test("should reverse valid moves correctly", () => {
      const testCases: [MoveToken, MoveToken][] = [
        [
          { code: "R", sliceCount: null, turnCount: 1, isPrime: false },
          { code: "R", sliceCount: null, turnCount: 1, isPrime: true },
        ],
        [
          { code: "Rw", sliceCount: null, turnCount: 2, isPrime: false },
          { code: "Rw", sliceCount: null, turnCount: 2, isPrime: true },
        ],
        [
          { code: "M", sliceCount: null, turnCount: 1, isPrime: true },
          { code: "M", sliceCount: null, turnCount: 1, isPrime: false },
        ],
        [
          { code: "E", sliceCount: null, turnCount: 2, isPrime: false },
          { code: "E", sliceCount: null, turnCount: 2, isPrime: true },
        ],
        [
          { code: "S", sliceCount: null, turnCount: 1, isPrime: true },
          { code: "S", sliceCount: null, turnCount: 1, isPrime: false },
        ],
        [
          { code: "L", sliceCount: null, turnCount: 1, isPrime: false },
          { code: "L", sliceCount: null, turnCount: 1, isPrime: true },
        ],
        [
          { code: "U", sliceCount: null, turnCount: 2, isPrime: false },
          { code: "U", sliceCount: null, turnCount: 2, isPrime: true },
        ],
        [
          { code: "D", sliceCount: null, turnCount: 1, isPrime: true },
          { code: "D", sliceCount: null, turnCount: 1, isPrime: false },
        ],
      ];
      testCases.forEach(([input, expected]) => {
        expect(reverseMove(input)).toEqual(expected);
      });
    });

    test("should return null for invalid moves", () => {
      const move: MoveToken = {
        code: "Invalid",
        sliceCount: null,
        turnCount: 1,
        isPrime: false,
      };
      expect(reverseMove(move)).toBeNull();
    });

    test("should handle malformed MoveToken", () => {
      const malformedToken = { code: "R" } as MoveToken;
      expect(reverseMove(malformedToken)).toEqual({
        code: "R",
        Count: null,
        turnCount: 1,
        isPrime: true,
      });
    });
  });

  describe("rotateMove", () => {
    test("should rotate valid moves correctly", () => {
      const testCases: [MoveToken, MoveToken][] = [
        [
          { code: "F", sliceCount: null, turnCount: 1, isPrime: false },
          { code: "B", sliceCount: null, turnCount: 1, isPrime: false },
        ],
        [
          { code: "B", sliceCount: null, turnCount: 1, isPrime: true },
          { code: "F", sliceCount: null, turnCount: 1, isPrime: true },
        ],
        [
          { code: "x", sliceCount: null, turnCount: 1, isPrime: false },
          { code: "x", sliceCount: null, turnCount: 1, isPrime: true },
        ],
        [
          { code: "M", sliceCount: null, turnCount: 1, isPrime: false },
          { code: "M", sliceCount: null, turnCount: 1, isPrime: true },
        ],
        [
          { code: "U", sliceCount: null, turnCount: 2, isPrime: true },
          { code: "U", sliceCount: null, turnCount: 2, isPrime: true },
        ],
        [
          { code: "D", sliceCount: null, turnCount: 1, isPrime: false },
          { code: "D", sliceCount: null, turnCount: 1, isPrime: false },
        ],
        [
          { code: "y", sliceCount: null, turnCount: 1, isPrime: true },
          { code: "y", sliceCount: null, turnCount: 1, isPrime: false },
        ],
        [
          { code: "z", sliceCount: null, turnCount: 1, isPrime: false },
          { code: "z", sliceCount: null, turnCount: 1, isPrime: true },
        ],
      ];
      testCases.forEach(([input, expected]) => {
        expect(rotateMove(input)).toEqual(expected);
      });
    });

    test("should return null for invalid moves", () => {
      const move: MoveToken = {
        code: "Invalid",
        sliceCount: null,
        turnCount: 1,
        isPrime: false,
      };
      expect(rotateMove(move)).toBeNull();
    });

    test("should handle malformed MoveToken", () => {
      const malformedToken = { code: "F" } as MoveToken;
      expect(rotateMove(malformedToken)).toEqual({
        code: "B",
        sliceCount: null,
        turnCount: 1,
        isPrime: false,
      });
    });

    test("should handle non-null sliceCount", () => {
      const move: MoveToken = {
        code: "Fw",
        sliceCount: 2,
        turnCount: 1,
        isPrime: false,
      };
      expect(rotateMove(move)).toEqual({
        code: "Bw",
        sliceCount: 2,
        turnCount: 1,
        isPrime: false,
      });
    });
  });
});
