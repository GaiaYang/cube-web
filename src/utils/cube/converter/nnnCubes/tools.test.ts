import {
  parseMoveByRegex,
  normalizeOfficialMove,
  moveTokenToString,
  createRegex,
  ensureValidTurnCount,
} from "./tools";
import type { MoveToken } from "./types";

describe("tools", () => {
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
      expect(parseMoveByRegex(createRegex(), "1R")).toBeNull();
      expect(parseMoveByRegex(createRegex(), "R1")).toBeNull();
      expect(parseMoveByRegex(createRegex(), "Q")).toBeNull();
      expect(parseMoveByRegex(createRegex(), "")).toBeNull();
      expect(parseMoveByRegex(createRegex(), null)).toBeNull();
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
      ).toBeNull();
      expect(
        normalizeOfficialMove({
          sliceCount: 1,
          code: "Q",
          turnCount: 1,
          isPrime: false,
        }),
      ).toBeNull();
      expect(
        normalizeOfficialMove({
          sliceCount: 1,
          code: "R",
          turnCount: 5,
          isPrime: false,
        }),
      ).toBeNull();
      expect(normalizeOfficialMove(null)).toBeNull();
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

    it("should handle invalid tokens", () => {
      expect(moveTokenToString(null)).toBe("");
      expect(moveTokenToString({} as MoveToken)).toBe("");
      expect(moveTokenToString({ sliceCount: 1 } as MoveToken)).toBe("");
      expect(moveTokenToString({ code: "invalid" } as MoveToken)).toBe(
        "invalid",
      );
    });
  });

  describe("ensureValidTurnCount", () => {
    it("should validate turn counts", () => {
      expect(ensureValidTurnCount(2)).toBe(2);
      expect(ensureValidTurnCount(1)).toBe(1);
      expect(ensureValidTurnCount(4)).toBeNull();
      expect(ensureValidTurnCount(0)).toBeNull();
    });
  });
});
