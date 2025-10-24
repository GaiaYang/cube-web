import { mirrorMove, reverseMove, rotateMove } from "./convert";
import type { MoveToken } from "./types";

describe("convert", () => {
  describe("mirrorMove", () => {
    it("should mirror valid moves (NNN)", () => {
      expect(
        mirrorMove({
          sliceCount: 1,
          code: "R",
          turnCount: 1,
          isPrime: false,
        }),
      ).toEqual({
        sliceCount: 1,
        code: "L",
        turnCount: 1,
        isPrime: true,
      });
      expect(
        mirrorMove({ sliceCount: 1, code: "U", turnCount: 1, isPrime: true }),
      ).toEqual({
        sliceCount: 1,
        code: "U",
        turnCount: 1,
        isPrime: false,
      });
    });

    it("should return null for invalid codes", () => {
      expect(
        mirrorMove({
          sliceCount: 1,
          code: "Q",
          turnCount: 1,
          isPrime: false,
        }),
      ).toBeNull();
    });

    it("should handle undefined fields", () => {
      expect(mirrorMove({ code: "R" } as MoveToken)).toEqual({
        sliceCount: 1,
        code: "L",
        turnCount: 1,
        isPrime: true,
      });
    });
  });

  describe("reverseMove", () => {
    it("should reverse valid moves (NNN)", () => {
      expect(
        reverseMove({
          sliceCount: 1,
          code: "R",
          turnCount: 1,
          isPrime: false,
        }),
      ).toEqual({
        sliceCount: 1,
        code: "R",
        turnCount: 1,
        isPrime: true,
      });
      expect(
        reverseMove({
          sliceCount: 1,
          code: "U",
          turnCount: 1,
          isPrime: true,
        }),
      ).toEqual({
        sliceCount: 1,
        code: "U",
        turnCount: 1,
        isPrime: false,
      });
    });

    it("should return null for invalid codes", () => {
      expect(
        reverseMove({
          sliceCount: 1,
          code: "Q",
          turnCount: 1,
          isPrime: false,
        }),
      ).toBeNull();
    });
  });

  describe("rotateMove", () => {
    it("should rotate valid moves with isPrime flip for x, z (NNN)", () => {
      expect(
        rotateMove({ sliceCount: 1, code: "x", turnCount: 1, isPrime: true }),
      ).toEqual({
        sliceCount: 1,
        code: "x",
        turnCount: 1,
        isPrime: false,
      });
      expect(
        rotateMove({
          sliceCount: 1,
          code: "z",
          turnCount: 1,
          isPrime: false,
        }),
      ).toEqual({
        sliceCount: 1,
        code: "z",
        turnCount: 1,
        isPrime: true,
      });
    });

    it("should preserve isPrime for non-x, z codes (NNN)", () => {
      expect(
        rotateMove({ sliceCount: 1, code: "R", turnCount: 1, isPrime: true }),
      ).toEqual({
        sliceCount: 1,
        code: "L",
        turnCount: 1,
        isPrime: true,
      });
      expect(
        rotateMove({
          sliceCount: 1,
          code: "F",
          turnCount: 1,
          isPrime: false,
        }),
      ).toEqual({
        sliceCount: 1,
        code: "B",
        turnCount: 1,
        isPrime: false,
      });
    });

    it("should return null for invalid codes", () => {
      expect(
        rotateMove({
          sliceCount: 1,
          code: "Q",
          turnCount: 1,
          isPrime: false,
        }),
      ).toBeNull();
    });
  });
});
