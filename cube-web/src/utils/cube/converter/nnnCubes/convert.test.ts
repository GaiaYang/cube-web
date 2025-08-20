import { mirrorMove, reverseMove, rotateMove } from "./convert";
import type { MoveToken } from "./types";

describe("convert.ts", () => {
  describe("mirrorMove", () => {
    test("should mirror valid moves correctly", () => {
      const move: MoveToken = {
        code: "R",
        sliceCount: null,
        turnCount: 1,
        isPrime: false,
      };
      expect(mirrorMove(move)).toEqual({
        code: "L",
        sliceCount: null,
        turnCount: 1,
        isPrime: true,
      });

      const wideMove: MoveToken = {
        code: "Rw",
        sliceCount: null,
        turnCount: 1,
        isPrime: true,
      };
      expect(mirrorMove(wideMove)).toEqual({
        code: "Lw",
        sliceCount: null,
        turnCount: 1,
        isPrime: false,
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
  });

  describe("reverseMove", () => {
    test("should reverse valid moves correctly", () => {
      const move: MoveToken = {
        code: "R",
        sliceCount: null,
        turnCount: 1,
        isPrime: false,
      };
      expect(reverseMove(move)).toEqual({
        code: "R",
        sliceCount: null,
        turnCount: 1,
        isPrime: true,
      });

      const wideMove: MoveToken = {
        code: "Rw",
        sliceCount: null,
        turnCount: 2,
        isPrime: false,
      };
      expect(reverseMove(wideMove)).toEqual({
        code: "Rw",
        sliceCount: null,
        turnCount: 2,
        isPrime: true,
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
  });

  describe("rotateMove", () => {
    test("should rotate valid moves correctly", () => {
      const move: MoveToken = {
        code: "F",
        sliceCount: null,
        turnCount: 1,
        isPrime: false,
      };
      expect(rotateMove(move)).toEqual({
        code: "B",
        sliceCount: null,
        turnCount: 1,
        isPrime: false,
      });

      const axisMove: MoveToken = {
        code: "x",
        sliceCount: null,
        turnCount: 1,
        isPrime: false,
      };
      expect(rotateMove(axisMove)).toEqual({
        code: "x",
        sliceCount: null,
        turnCount: 1,
        isPrime: true,
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
  });
});
