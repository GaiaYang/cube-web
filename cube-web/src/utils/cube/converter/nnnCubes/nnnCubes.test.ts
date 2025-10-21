import {
  parseMoveByRegex,
  normalizeOfficialMove,
  moveTokenToString,
  createRegex,
  ensureValidTurnCount,
} from "./tools";
import {
  cubeProfile as cubeProfile333,
  upperAlgorithm,
  lowerAlgorithm,
} from "./specs/333";
import { cubeProfile as cubeProfileNNN } from "./specs/nnn";
import { mirrorMove, reverseMove, rotateMove } from "./convert";
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
        expect(cubeProfileNNN.parseMove(null)).toBeNull();
        expect(cubeProfileNNN.parseMove("")).toBeNull();
      });

      it("should handle extended moves for 3x3", () => {
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

      it("should return null for invalid inputs in 3x3", () => {
        expect(cubeProfile333.parseMove("r!")).toBeNull();
        expect(cubeProfile333.parseMove(null)).toBeNull();
        expect(cubeProfile333.parseMove("")).toBeNull();
      });
    });

    describe("formatMove", () => {
      it("should format valid moves", () => {
        expect(cubeProfileNNN.formatMove("R")).toBe("R");
        expect(cubeProfileNNN.formatMove("2Rw2'")).toBe("2Rw2'");
        expect(cubeProfile333.formatMove("r")).toBe("r");
        expect(cubeProfile333.formatMove("M2'")).toBe("M2'");
      });

      it("should return empty string for invalid moves", () => {
        expect(cubeProfileNNN.formatMove("1R")).toBe("");
        expect(cubeProfileNNN.formatMove("Q")).toBe("");
        expect(cubeProfileNNN.formatMove("invalid")).toBe("");
        expect(cubeProfileNNN.formatMove(null)).toBe("");
        expect(cubeProfileNNN.formatMove("")).toBe("");
        expect(cubeProfile333.formatMove("Q")).toBe("");
        expect(cubeProfile333.formatMove("invalid")).toBe("");
        expect(cubeProfile333.formatMove(null)).toBe("");
        expect(cubeProfile333.formatMove("")).toBe("");
      });

      it("should handle invalid MoveToken inputs", () => {
        expect(cubeProfileNNN.formatMoveToken({ code: "Q" } as MoveToken)).toBe(
          "",
        );
        expect(
          cubeProfileNNN.formatMoveToken({ code: "invalid" } as MoveToken),
        ).toBe("");
        expect(cubeProfileNNN.formatMoveToken(null)).toBe("");
        expect(
          cubeProfileNNN.formatMoveToken({ sliceCount: 1 } as MoveToken),
        ).toBe("");
        expect(cubeProfile333.formatMoveToken({ code: "Q" } as MoveToken)).toBe(
          "",
        );
        expect(
          cubeProfile333.formatMoveToken({ code: "invalid" } as MoveToken),
        ).toBe("");
        expect(cubeProfile333.formatMoveToken(null)).toBe("");
        expect(
          cubeProfile333.formatMoveToken({ sliceCount: 1 } as MoveToken),
        ).toBe("");
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
        expect(cubeProfile333.parseAlgorithm("r M2' U")).toEqual([
          { sliceCount: 1, code: "r", turnCount: 1, isPrime: false },
          { sliceCount: 1, code: "M", turnCount: 2, isPrime: true },
          { sliceCount: 1, code: "U", turnCount: 1, isPrime: false },
        ]);
      });

      it("should return empty array for invalid algorithms", () => {
        expect(cubeProfileNNN.parseAlgorithm("R Q R'")).toEqual([]);
        expect(cubeProfileNNN.parseAlgorithm("")).toEqual([]);
        expect(cubeProfileNNN.parseAlgorithm(null)).toEqual([]);
        expect(cubeProfile333.parseAlgorithm("r Q M")).toEqual([]);
      });
    });

    describe("formatAlgorithm", () => {
      it("should format valid MoveToken arrays", () => {
        const tokens: MoveToken[] = [
          { sliceCount: 1, code: "R", turnCount: 1, isPrime: false },
          { sliceCount: 1, code: "U", turnCount: 1, isPrime: false },
        ];
        expect(cubeProfileNNN.formatAlgorithm(tokens)).toBe("R U");
        const tokens333: MoveToken[] = [
          { sliceCount: 1, code: "r", turnCount: 1, isPrime: false },
          { sliceCount: 1, code: "M", turnCount: 2, isPrime: true },
        ];
        expect(cubeProfile333.formatAlgorithm(tokens333)).toBe("r M2'");
      });

      it("should return empty string for invalid inputs", () => {
        expect(
          cubeProfileNNN.formatAlgorithm([
            { sliceCount: 1, code: "Q", turnCount: 1, isPrime: false },
          ]),
        ).toBe("");
        expect(cubeProfileNNN.formatAlgorithm(null)).toBe("");
        expect(
          cubeProfile333.formatAlgorithm([
            { sliceCount: 1, code: "Q", turnCount: 1, isPrime: false },
          ]),
        ).toBe("");
        expect(cubeProfile333.formatAlgorithm([])).toBe("");
      });
    });

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

    describe("mirrorAlgorithm", () => {
      it("should mirror valid algorithms (NNN)", () => {
        const input: MoveToken[] = [
          { sliceCount: 1, code: "R", turnCount: 1, isPrime: false },
          { sliceCount: 1, code: "U", turnCount: 1, isPrime: false },
        ];
        expect(cubeProfileNNN.mirrorAlgorithm(input)).toEqual([
          { sliceCount: 1, code: "L", turnCount: 1, isPrime: true },
          { sliceCount: 1, code: "U", turnCount: 1, isPrime: true },
        ]);
      });

      it("should mirror valid 3x3 extended algorithms", () => {
        const input: MoveToken[] = [
          { sliceCount: 1, code: "r", turnCount: 1, isPrime: false },
          { sliceCount: 1, code: "M", turnCount: 2, isPrime: true },
        ];
        expect(cubeProfile333.mirrorAlgorithm(input)).toEqual([
          { sliceCount: 1, code: "l", turnCount: 1, isPrime: true },
          { sliceCount: 1, code: "M", turnCount: 2, isPrime: false },
        ]);
      });

      it("should return empty array for invalid inputs", () => {
        expect(
          cubeProfileNNN.mirrorAlgorithm([
            { sliceCount: 1, code: "Q", turnCount: 1, isPrime: false },
          ]),
        ).toEqual([]);
        expect(
          cubeProfile333.mirrorAlgorithm([
            { sliceCount: 1, code: "Q", turnCount: 1, isPrime: false },
          ]),
        ).toEqual([]);
      });

      it("should handle undefined fields", () => {
        const input: MoveToken = { code: "R" } as MoveToken;
        expect(cubeProfileNNN.mirrorAlgorithm([input])).toEqual([
          { sliceCount: 1, code: "L", turnCount: 1, isPrime: true },
        ]);
      });
    });

    describe("reverseAlgorithm", () => {
      it("should reverse valid algorithms (NNN)", () => {
        const input: MoveToken[] = [
          { sliceCount: 1, code: "R", turnCount: 1, isPrime: false },
          { sliceCount: 1, code: "U", turnCount: 1, isPrime: false },
        ];
        expect(cubeProfileNNN.reverseAlgorithm(input)).toEqual([
          { sliceCount: 1, code: "U", turnCount: 1, isPrime: true },
          { sliceCount: 1, code: "R", turnCount: 1, isPrime: true },
        ]);
      });

      it("should reverse valid 3x3 extended algorithms", () => {
        const input: MoveToken[] = [
          { sliceCount: 1, code: "r", turnCount: 1, isPrime: false },
          { sliceCount: 1, code: "M", turnCount: 2, isPrime: false },
        ];
        expect(cubeProfile333.reverseAlgorithm(input)).toEqual([
          { sliceCount: 1, code: "M", turnCount: 2, isPrime: true },
          { sliceCount: 1, code: "r", turnCount: 1, isPrime: true },
        ]);
      });

      it("should return empty array for invalid inputs", () => {
        expect(
          cubeProfileNNN.reverseAlgorithm([
            { sliceCount: 1, code: "Q", turnCount: 1, isPrime: false },
          ]),
        ).toEqual([]);
        expect(
          cubeProfile333.reverseAlgorithm([
            { sliceCount: 1, code: "Q", turnCount: 1, isPrime: false },
          ]),
        ).toEqual([]);
      });
    });

    describe("rotateAlgorithm", () => {
      it("should rotate valid algorithms (NNN)", () => {
        const input: MoveToken[] = [
          { sliceCount: 1, code: "F", turnCount: 1, isPrime: false },
          { sliceCount: 1, code: "B", turnCount: 1, isPrime: false },
        ];
        expect(cubeProfileNNN.rotateAlgorithm(input)).toEqual([
          { sliceCount: 1, code: "B", turnCount: 1, isPrime: false },
          { sliceCount: 1, code: "F", turnCount: 1, isPrime: false },
        ]);
      });

      it("should rotate valid 3x3 extended algorithms", () => {
        const input: MoveToken[] = [
          { sliceCount: 1, code: "f", turnCount: 1, isPrime: true },
          { sliceCount: 1, code: "M", turnCount: 1, isPrime: false },
          { sliceCount: 1, code: "r", turnCount: 1, isPrime: true },
        ];
        expect(cubeProfile333.rotateAlgorithm(input)).toEqual([
          { sliceCount: 1, code: "b", turnCount: 1, isPrime: true },
          { sliceCount: 1, code: "M", turnCount: 1, isPrime: true },
          { sliceCount: 1, code: "l", turnCount: 1, isPrime: true },
        ]);
      });

      it("should preserve isPrime for non-M/S codes in 3x3", () => {
        const input: MoveToken[] = [
          { sliceCount: 1, code: "f", turnCount: 1, isPrime: true },
          { sliceCount: 1, code: "r", turnCount: 1, isPrime: false },
          { sliceCount: 1, code: "u", turnCount: 1, isPrime: true },
        ];
        expect(cubeProfile333.rotateAlgorithm(input)).toEqual([
          { sliceCount: 1, code: "b", turnCount: 1, isPrime: true },
          { sliceCount: 1, code: "l", turnCount: 1, isPrime: false },
          { sliceCount: 1, code: "u", turnCount: 1, isPrime: true },
        ]);
      });

      it("should handle x and z codes in NNN with isPrime flip", () => {
        const input: MoveToken[] = [
          { sliceCount: 1, code: "x", turnCount: 1, isPrime: true },
          { sliceCount: 1, code: "z", turnCount: 1, isPrime: false },
          { sliceCount: 1, code: "R", turnCount: 1, isPrime: true },
        ];
        expect(cubeProfileNNN.rotateAlgorithm(input)).toEqual([
          { sliceCount: 1, code: "x", turnCount: 1, isPrime: false },
          { sliceCount: 1, code: "z", turnCount: 1, isPrime: true },
          { sliceCount: 1, code: "L", turnCount: 1, isPrime: true },
        ]);
      });

      it("should return empty array for invalid inputs", () => {
        expect(
          cubeProfileNNN.mirrorAlgorithm([
            { sliceCount: 1, code: "Q", turnCount: 1, isPrime: false },
          ]),
        ).toEqual([]);
        expect(
          cubeProfileNNN.reverseAlgorithm([
            { sliceCount: 1, code: "Q", turnCount: 1, isPrime: false },
          ]),
        ).toEqual([]);
        expect(
          cubeProfileNNN.rotateAlgorithm([
            { sliceCount: 1, code: "Q", turnCount: 1, isPrime: false },
          ]),
        ).toEqual([]);
        expect(
          cubeProfile333.mirrorAlgorithm([
            { sliceCount: 1, code: "Q", turnCount: 1, isPrime: false },
          ]),
        ).toEqual([]);
        expect(
          cubeProfile333.reverseAlgorithm([
            { sliceCount: 1, code: "Q", turnCount: 1, isPrime: false },
          ]),
        ).toEqual([]);
        expect(
          cubeProfile333.rotateAlgorithm([
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

    it("should handle invalid inputs in upperAlgorithm and lowerAlgorithm", () => {
      const input: MoveToken[] = [
        { sliceCount: 1, code: "Q", turnCount: 1, isPrime: false },
      ];
      expect(upperAlgorithm(input)).toEqual([]);
      expect(lowerAlgorithm(input)).toEqual([]);
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
