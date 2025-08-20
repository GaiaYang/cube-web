import {
  createCubeProfile,
  createRegex,
  parseMoveByRegex,
  normalizeOfficialMove,
  ensureValidCode,
  ensureValidTurnCount,
  moveTokenToString,
} from "./core";
import type { MoveToken } from "./types";
import { basicMoves } from "./constants";

describe("core.ts", () => {
  describe("createRegex", () => {
    test("should create regex with basic moves", () => {
      const regex = createRegex();
      expect(regex.test("R")).toBe(true);
      expect(regex.test("Rw")).toBe(true);
      expect(regex.test("X")).toBe(false);
    });

    test("should include additional moves in regex", () => {
      const regex = createRegex(["M", "S"]);
      expect(regex.test("M")).toBe(true);
      expect(regex.test("S")).toBe(true);
      expect(regex.test("X")).toBe(false);
    });

    test("should sort moves by length to avoid mismatching", () => {
      const regex = createRegex(["Rw", "R"]);
      expect(regex.test("Rw")).toBe(true);
      expect(regex.test("R")).toBe(true);
    });
  });

  describe("parseMoveByRegex", () => {
    test("should parse valid move strings", () => {
      const regex = createRegex();
      expect(parseMoveByRegex(regex, "R")).toEqual({
        sliceCount: null,
        code: "R",
        turnCount: 1,
        isPrime: false,
      });
      expect(parseMoveByRegex(regex, "Rw2'")).toEqual({
        sliceCount: null,
        code: "Rw",
        turnCount: 2,
        isPrime: true,
      });
      expect(parseMoveByRegex(regex, "2Rw")).toEqual({
        sliceCount: 2,
        code: "Rw",
        turnCount: 1,
        isPrime: false,
      });
    });

    test("should return null for invalid inputs", () => {
      const regex = createRegex();
      expect(parseMoveByRegex(regex, "")).toBeNull();
      expect(parseMoveByRegex(regex, null)).toBeNull();
      expect(parseMoveByRegex(regex, "4R")).toEqual({
        code: "R",
        isPrime: false,
        sliceCount: 4,
        turnCount: 1,
      }); // Invalid slice count
      expect(parseMoveByRegex(regex, "R4")).toEqual({
        code: "R",
        isPrime: false,
        sliceCount: null,
        turnCount: 4,
      }); // Invalid turn count
      expect(parseMoveByRegex(regex, "X")).toBeNull(); // Invalid code
    });
  });

  describe("normalizeOfficialMove", () => {
    test("should normalize valid move tokens", () => {
      const token: MoveToken = {
        sliceCount: null,
        code: "R",
        turnCount: 1,
        isPrime: false,
      };
      expect(normalizeOfficialMove(token)).toEqual(token);
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

    test("should return null for invalid tokens", () => {
      expect(normalizeOfficialMove(null)).toBeNull();
      expect(
        normalizeOfficialMove({
          sliceCount: null,
          code: "X",
          turnCount: 1,
          isPrime: false,
        }),
      ).toBeNull();
      expect(
        normalizeOfficialMove(
          { sliceCount: 2, code: "R", turnCount: 1, isPrime: false },
          3,
        ),
      ).toBeNull();
      expect(
        normalizeOfficialMove({
          sliceCount: null,
          code: "R",
          turnCount: 4,
          isPrime: false,
        }),
      ).toBeNull();
    });

    test("should handle cubeLayers restriction", () => {
      const token: MoveToken = {
        sliceCount: 2,
        code: "Rw",
        turnCount: 1,
        isPrime: false,
      };
      expect(normalizeOfficialMove(token, 4)).toEqual(token);
      expect(normalizeOfficialMove(token, 3)).toBeNull(); // Slice count not allowed for 3x3
    });
  });

  describe("ensureValidCode", () => {
    test("should return valid code", () => {
      expect(ensureValidCode(basicMoves, "R")).toBe("R");
      expect(ensureValidCode(["M", "S"], "M")).toBe("M");
    });

    test("should return null for invalid code", () => {
      expect(ensureValidCode(basicMoves, "X")).toBeNull();
    });
  });

  describe("ensureValidTurnCount", () => {
    test("should return valid turn count", () => {
      expect(ensureValidTurnCount(1)).toBe(1);
      expect(ensureValidTurnCount(2)).toBe(2);
      expect(ensureValidTurnCount(3)).toBe(3);
    });

    test("should return null for invalid turn count", () => {
      expect(ensureValidTurnCount(0)).toBeNull();
      expect(ensureValidTurnCount(4)).toBeNull();
      expect(ensureValidTurnCount(1.5)).toBeNull();
    });
  });

  describe("moveTokenToString", () => {
    test("should convert valid MoveToken to string", () => {
      const token: MoveToken = {
        sliceCount: null,
        code: "R",
        turnCount: 1,
        isPrime: false,
      };
      expect(moveTokenToString(token)).toBe("R");
      expect(
        moveTokenToString({
          sliceCount: 2,
          code: "Rw",
          turnCount: 2,
          isPrime: true,
        }),
      ).toBe("2Rw2'");
    });

    test("should return empty string for invalid input", () => {
      expect(moveTokenToString(null)).toBe("");
      expect(moveTokenToString({} as MoveToken)).toBe("");
    });
  });

  describe("createCubeProfile", () => {
    let profile: ReturnType<typeof createCubeProfile>;

    beforeEach(() => {
      profile = createCubeProfile();
    });

    describe("parseMove", () => {
      test("should parse valid moves", () => {
        expect(profile.parseMove("R")).toEqual({
          sliceCount: null,
          code: "R",
          turnCount: 1,
          isPrime: false,
        });
        expect(profile.parseMove("Rw2'")).toEqual({
          sliceCount: null,
          code: "Rw",
          turnCount: 2,
          isPrime: true,
        });
      });

      test("should return null for invalid moves", () => {
        expect(profile.parseMove("X")).toBeNull();
        expect(profile.parseMove("2R")).toBeNull(); // Invalid slice count for non-wide move
      });

      test("should use custom parser if provided", () => {
        const customProfile = createCubeProfile({
          parseMove: () => ({
            sliceCount: null,
            code: "M",
            turnCount: 1,
            isPrime: false,
          }),
        });
        expect(customProfile.parseMove("X")).toEqual({
          sliceCount: null,
          code: "M",
          turnCount: 1,
          isPrime: false,
        });
      });
    });

    describe("parseAlgorithm", () => {
      test("should parse valid algorithm string", () => {
        expect(profile.parseAlgorithm("R U F2")).toEqual([
          { sliceCount: null, code: "R", turnCount: 1, isPrime: false },
          { sliceCount: null, code: "U", turnCount: 1, isPrime: false },
          { sliceCount: null, code: "F", turnCount: 2, isPrime: false },
        ]);
      });

      test("should return empty array for invalid algorithm", () => {
        expect(profile.parseAlgorithm("R X U")).toEqual([]);
        expect(profile.parseAlgorithm("")).toEqual([]);
        expect(profile.parseAlgorithm(null)).toEqual([]);
      });
    });

    describe("formatMove", () => {
      test("should format valid move string", () => {
        expect(profile.formatMove("R")).toBe("R");
        expect(profile.formatMove("Rw2'")).toBe("Rw2'");
      });

      test("should return empty string for invalid move", () => {
        expect(profile.formatMove("X")).toBe("");
        expect(profile.formatMove("2R")).toBe("");
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
        expect(profile.formatMoveToken(token)).toBe("R");
      });

      test("should return empty string for invalid MoveToken", () => {
        const token = {
          sliceCount: null,
          code: "X",
          turnCount: 1,
          isPrime: false,
        };
        expect(profile.formatMoveToken(token)).toBe("");
      });
    });

    describe("formatAlgorithm", () => {
      test("should format valid MoveToken array", () => {
        const tokens: MoveToken[] = [
          { sliceCount: null, code: "R", turnCount: 1, isPrime: false },
          { sliceCount: null, code: "U", turnCount: 1, isPrime: true },
        ];
        expect(profile.formatAlgorithm(tokens)).toBe("R U'");
      });

      test("should return empty string for invalid input", () => {
        expect(profile.formatAlgorithm(null)).toBe("");
        expect(profile.formatAlgorithm(["R", "X"])).toBe("");
      });
    });

    describe("mirrorAlgorithm", () => {
      test("should mirror valid algorithm", () => {
        const tokens: MoveToken[] = [
          { sliceCount: null, code: "R", turnCount: 1, isPrime: false },
          { sliceCount: null, code: "U", turnCount: 1, isPrime: true },
        ];
        expect(profile.mirrorAlgorithm(tokens)).toEqual([
          { sliceCount: null, code: "L", turnCount: 1, isPrime: true },
          { sliceCount: null, code: "U", turnCount: 1, isPrime: false },
        ]);
      });

      test("should return empty array for invalid moves", () => {
        const tokens = [
          { sliceCount: null, code: "X", turnCount: 1, isPrime: false },
        ];
        expect(profile.mirrorAlgorithm(tokens)).toEqual([]);
      });
    });

    describe("reverseAlgorithm", () => {
      test("should reverse valid algorithm", () => {
        const tokens: MoveToken[] = [
          { sliceCount: null, code: "R", turnCount: 1, isPrime: false },
          { sliceCount: null, code: "U", turnCount: 1, isPrime: true },
        ];
        expect(profile.reverseAlgorithm(tokens)).toEqual([
          { sliceCount: null, code: "U", turnCount: 1, isPrime: false },
          { sliceCount: null, code: "R", turnCount: 1, isPrime: true },
        ]);
      });
    });

    describe("rotateAlgorithm", () => {
      test("should rotate valid algorithm", () => {
        const tokens: MoveToken[] = [
          { sliceCount: null, code: "F", turnCount: 1, isPrime: false },
          { sliceCount: null, code: "x", turnCount: 1, isPrime: false },
        ];
        expect(profile.rotateAlgorithm(tokens)).toEqual([
          { sliceCount: null, code: "B", turnCount: 1, isPrime: false },
          { sliceCount: null, code: "x", turnCount: 1, isPrime: true },
        ]);
      });
    });
  });
});
