import {
  parseMoveByRegex,
  normalizeOfficialMove,
  moveTokenToString,
  createRegex,
  ensureValidTurnCount,
} from "./core";
import {
  cubeProfile as cubeProfile333,
  upperAlgorithm,
  lowerAlgorithm,
} from "./specs/333";
import { cubeProfile as cubeProfileNNN } from "./specs/nnn";
import type { MoveToken } from "./types";

describe("Rubik's Cube Notation Parser", () => {
  describe("parseMoveByRegex", () => {
    it("should parse valid WCA move strings correctly", () => {
      expect(parseMoveByRegex(createRegex(), "R")).toEqual({
        sliceCount: 1,
        code: "R",
        turnCount: 1,
        isPrime: false,
      });
      expect(parseMoveByRegex(createRegex(), "2Rw2'")).toEqual({
        sliceCount: 2,
        code: "Rw",
        turnCount: 2,
        isPrime: true,
      });
      expect(parseMoveByRegex(createRegex(), "y2")).toEqual({
        sliceCount: 1,
        code: "y",
        turnCount: 2,
        isPrime: false,
      });
    });

    it("should return null for invalid move strings", () => {
      expect(parseMoveByRegex(createRegex(), "1R")).toBeNull(); // Layer count cannot be 1
      expect(parseMoveByRegex(createRegex(), "R1")).toBeNull(); // Turn count cannot be 1 if specified
      expect(parseMoveByRegex(createRegex(), "Q")).toBeNull(); // Invalid code
      expect(parseMoveByRegex(createRegex(), "")).toBeNull(); // Empty string
      expect(parseMoveByRegex(createRegex(), null)).toBeNull(); // Null input
    });
  });

  describe("normalizeOfficialMove", () => {
    it("should normalize valid WCA moves", () => {
      expect(
        normalizeOfficialMove({
          sliceCount: 1,
          code: "R",
          turnCount: 1,
          isPrime: false,
        }),
      ).toEqual({
        sliceCount: 1,
        code: "R",
        turnCount: 1,
        isPrime: false,
      });
      expect(
        normalizeOfficialMove(
          { sliceCount: 2, code: "Rw", turnCount: 2, isPrime: true },
          4,
        ),
      ).toEqual({
        sliceCount: 2,
        code: "Rw",
        turnCount: 2,
        isPrime: true,
      });
    });

    it("should return null for invalid moves", () => {
      expect(
        normalizeOfficialMove(
          { sliceCount: 2, code: "R", turnCount: 1, isPrime: false },
          3,
        ),
      ).toBeNull(); // Slice count > 1 invalid for 3x3
      expect(
        normalizeOfficialMove({
          sliceCount: 1,
          code: "Q",
          turnCount: 1,
          isPrime: false,
        }),
      ).toBeNull(); // Invalid code
      expect(
        normalizeOfficialMove({
          sliceCount: 1,
          code: "R",
          turnCount: 5,
          isPrime: false,
        }),
      ).toBeNull(); // Turn count out of range
      expect(normalizeOfficialMove(null)).toBeNull(); // Null input
    });
  });

  describe("moveTokenToString", () => {
    it("should convert MoveToken to string correctly", () => {
      expect(
        moveTokenToString({
          sliceCount: 1,
          code: "R",
          turnCount: 1,
          isPrime: false,
        }),
      ).toBe("R");
      expect(
        moveTokenToString({
          sliceCount: 2,
          code: "Rw",
          turnCount: 2,
          isPrime: true,
        }),
      ).toBe("2Rw2'");
      expect(
        moveTokenToString({
          sliceCount: 1,
          code: "y",
          turnCount: 2,
          isPrime: false,
        }),
      ).toBe("y2");
    });

    it("should return empty string for invalid tokens", () => {
      expect(moveTokenToString(null)).toBe("");
      expect(moveTokenToString({} as MoveToken)).toBe("");
    });
  });

  describe("createCubeProfile", () => {
    describe("parseMove", () => {
      it("should parse valid WCA moves", () => {
        expect(cubeProfileNNN.parseMove("R")).toEqual({
          sliceCount: 1,
          code: "R",
          turnCount: 1,
          isPrime: false,
        });
        expect(cubeProfileNNN.parseMove("2Rw2'")).toEqual({
          sliceCount: 2,
          code: "Rw",
          turnCount: 2,
          isPrime: true,
        });
      });

      it("should return null for invalid moves", () => {
        expect(cubeProfileNNN.parseMove("1R")).toBeNull();
        expect(cubeProfileNNN.parseMove("Q")).toBeNull();
      });

      it("should handle extended moves for 3x3", () => {
        expect(cubeProfile333.parseMove("r")).toEqual({
          sliceCount: 1,
          code: "r",
          turnCount: 1,
          isPrime: false,
        });
        expect(cubeProfile333.parseMove("M2")).toEqual({
          sliceCount: 1,
          code: "M",
          turnCount: 2,
          isPrime: false,
        });
      });
    });

    describe("formatMove", () => {
      it("should format valid moves", () => {
        expect(cubeProfileNNN.formatMove("R")).toBe("R");
        expect(cubeProfileNNN.formatMove("2Rw2'")).toBe("2Rw2'");
      });

      it("should return empty string for invalid moves", () => {
        expect(cubeProfileNNN.formatMove("1R")).toBe("");
        expect(cubeProfileNNN.formatMove("Q")).toBe("");
      });
    });

    describe("parseAlgorithm", () => {
      it("should parse valid algorithm strings", () => {
        expect(cubeProfileNNN.parseAlgorithm("R U R' U'")).toEqual([
          { sliceCount: 1, code: "R", turnCount: 1, isPrime: false },
          { sliceCount: 1, code: "U", turnCount: 1, isPrime: false },
          { sliceCount: 1, code: "R", turnCount: 1, isPrime: true },
          { sliceCount: 1, code: "U", turnCount: 1, isPrime: true },
        ]);
      });

      it("should return empty array for invalid algorithms", () => {
        expect(cubeProfileNNN.parseAlgorithm("R Q R'")).toEqual([]);
        expect(cubeProfileNNN.parseAlgorithm("")).toEqual([]);
        expect(cubeProfileNNN.parseAlgorithm(null)).toEqual([]);
      });
    });

    describe("formatAlgorithm", () => {
      it("should format valid MoveToken arrays", () => {
        const tokens: MoveToken[] = [
          { sliceCount: 1, code: "R", turnCount: 1, isPrime: false },
          { sliceCount: 1, code: "U", turnCount: 1, isPrime: false },
        ];
        expect(cubeProfileNNN.formatAlgorithm(tokens)).toBe("R U");
      });

      it("should return empty string for invalid inputs", () => {
        expect(
          cubeProfileNNN.formatAlgorithm([
            { sliceCount: 1, code: "Q", turnCount: 1, isPrime: false },
          ]),
        ).toBe("");
        expect(cubeProfileNNN.formatAlgorithm(null)).toBe("");
      });
    });

    describe("mirrorAlgorithm", () => {
      it("should mirror valid algorithms", () => {
        const input: MoveToken[] = [
          { sliceCount: 1, code: "R", turnCount: 1, isPrime: false },
          { sliceCount: 1, code: "U", turnCount: 1, isPrime: false },
        ];
        expect(cubeProfileNNN.mirrorAlgorithm(input)).toEqual([
          { sliceCount: 1, code: "L", turnCount: 1, isPrime: true },
          { sliceCount: 1, code: "U", turnCount: 1, isPrime: true },
        ]);
      });

      it("should return empty array for invalid inputs", () => {
        expect(
          cubeProfileNNN.mirrorAlgorithm([
            { sliceCount: 1, code: "Q", turnCount: 1, isPrime: false },
          ]),
        ).toEqual([]);
      });
    });

    describe("reverseAlgorithm", () => {
      it("should reverse valid algorithms", () => {
        const input: MoveToken[] = [
          { sliceCount: 1, code: "R", turnCount: 1, isPrime: false },
          { sliceCount: 1, code: "U", turnCount: 1, isPrime: false },
        ];
        expect(cubeProfileNNN.reverseAlgorithm(input)).toEqual([
          { sliceCount: 1, code: "U", turnCount: 1, isPrime: true },
          { sliceCount: 1, code: "R", turnCount: 1, isPrime: true },
        ]);
      });

      it("should return empty array for invalid inputs", () => {
        expect(
          cubeProfileNNN.reverseAlgorithm([
            { sliceCount: 1, code: "Q", turnCount: 1, isPrime: false },
          ]),
        ).toEqual([]);
      });
    });

    describe("rotateAlgorithm", () => {
      it("should rotate valid algorithms", () => {
        const input: MoveToken[] = [
          { sliceCount: 1, code: "F", turnCount: 1, isPrime: false },
          { sliceCount: 1, code: "B", turnCount: 1, isPrime: false },
        ];
        expect(cubeProfileNNN.rotateAlgorithm(input)).toEqual([
          { sliceCount: 1, code: "B", turnCount: 1, isPrime: false },
          { sliceCount: 1, code: "F", turnCount: 1, isPrime: false },
        ]);
      });

      it("should return empty array for invalid inputs", () => {
        expect(
          cubeProfileNNN.rotateAlgorithm([
            { sliceCount: 1, code: "Q", turnCount: 1, isPrime: false },
          ]),
        ).toEqual([]);
      });
    });
  });

  describe("3x3 Extended Notation", () => {
    it("should parse extended moves (r, l, M, etc.)", () => {
      expect(cubeProfile333.parseMove("r")).toEqual({
        sliceCount: 1,
        code: "r",
        turnCount: 1,
        isPrime: false,
      });
      expect(cubeProfile333.parseMove("M2'")).toEqual({
        sliceCount: 1,
        code: "M",
        turnCount: 2,
        isPrime: true,
      });
    });

    it("should not allow sliceCount > 1 for 3x3", () => {
      expect(cubeProfile333.parseMove("2r")).toBeNull();
    });

    it("should handle upperAlgorithm", () => {
      const input: MoveToken[] = [
        { sliceCount: 1, code: "r", turnCount: 1, isPrime: false },
        { sliceCount: 1, code: "U", turnCount: 1, isPrime: false },
      ];
      expect(upperAlgorithm(input)).toEqual([
        { sliceCount: 1, code: "Rw", turnCount: 1, isPrime: false },
        { sliceCount: 1, code: "U", turnCount: 1, isPrime: false },
      ]);
    });

    it("should handle lowerAlgorithm", () => {
      const input: MoveToken[] = [
        { sliceCount: 1, code: "Rw", turnCount: 1, isPrime: false },
        { sliceCount: 1, code: "U", turnCount: 1, isPrime: false },
      ];
      expect(lowerAlgorithm(input)).toEqual([
        { sliceCount: 1, code: "r", turnCount: 1, isPrime: false },
        { sliceCount: 1, code: "U", turnCount: 1, isPrime: false },
      ]);
    });
  });

  describe("ensureValidTurnCount", () => {
    it("should validate turn counts", () => {
      expect(ensureValidTurnCount(2)).toBe(2);
      expect(ensureValidTurnCount(1)).toBe(1); // Turn count cannot be 1 if specified
      expect(ensureValidTurnCount(4)).toBeNull(); // Out of range
      expect(ensureValidTurnCount(0)).toBeNull(); // Invalid
    });
  });
});
