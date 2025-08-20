import {
  wideMoveAliases,
  middleLayerMoves,
  extendsMoves,
  extendsMovesMap,
  parseMove,
  parseAlgorithm,
  formatMove,
  formatMoveToken,
  formatAlgorithm,
  mirrorAlgorithm,
  reverseAlgorithm,
  rotateAlgorithm,
  upperAlgorithm,
  lowerAlgorithm,
} from "./333";
import type { MoveToken } from "../types";

describe("333.ts", () => {
  describe("Constants", () => {
    test("wideMoveAliases should contain correct aliases", () => {
      expect(wideMoveAliases).toEqual(["r", "l", "u", "d", "f", "b"]);
    });

    test("middleLayerMoves should contain correct middle layer moves", () => {
      expect(middleLayerMoves).toEqual(["E", "M", "S"]);
    });

    test("extendsMoves should combine wideMoveAliases and middleLayerMoves", () => {
      expect(extendsMoves).toEqual([
        "r",
        "l",
        "u",
        "d",
        "f",
        "b",
        "E",
        "M",
        "S",
      ]);
    });

    test("extendsMovesMap should map each move to itself", () => {
      expect(extendsMovesMap).toEqual({
        r: "r",
        l: "l",
        u: "u",
        d: "d",
        f: "f",
        b: "b",
        E: "E",
        M: "M",
        S: "S",
      });
    });
  });

  describe("parseMove", () => {
    test("should parse valid move correctly", () => {
      expect(parseMove("r")).toEqual({
        code: "r",
        sliceCount: null,
        turnCount: 1,
        isPrime: false,
      });
      expect(parseMove("r'")).toEqual({
        code: "r",
        sliceCount: null,
        turnCount: 1,
        isPrime: true,
      });
      expect(parseMove("M2")).toEqual({
        code: "M",
        sliceCount: null,
        turnCount: 2,
        isPrime: false,
      });
    });

    test("should return null for invalid moves", () => {
      expect(parseMove("X")).toBeNull();
      expect(parseMove("2r")).toBeNull(); // No slice count allowed for 3x3
      expect(parseMove("r4")).toBeNull(); // Invalid turn count
    });
  });

  describe("parseAlgorithm", () => {
    test("should parse valid algorithm string", () => {
      const result = parseAlgorithm("r u' M2");
      expect(result).toEqual([
        { code: "r", sliceCount: null, turnCount: 1, isPrime: false },
        { code: "u", sliceCount: null, turnCount: 1, isPrime: true },
        { code: "M", sliceCount: null, turnCount: 2, isPrime: false },
      ]);
    });

    test("should return empty array for invalid algorithm", () => {
      expect(parseAlgorithm("r X u")).toEqual([]);
      expect(parseAlgorithm("")).toEqual([]);
      expect(parseAlgorithm(null)).toEqual([]);
    });
  });

  describe("formatMove", () => {
    test("should format valid move string", () => {
      expect(formatMove("r")).toBe("r");
      expect(formatMove("r'")).toBe("r'");
      expect(formatMove("M2")).toBe("M2");
    });

    test("should return empty string for invalid move", () => {
      expect(formatMove("X")).toBe("");
      expect(formatMove("2r")).toBe("");
    });
  });

  describe("formatMoveToken", () => {
    test("should format valid MoveToken", () => {
      const token: MoveToken = {
        code: "r",
        sliceCount: null,
        turnCount: 1,
        isPrime: false,
      };
      expect(formatMoveToken(token)).toBe("r");
    });

    test("should return empty string for invalid MoveToken", () => {
      const token = {
        code: "X",
        sliceCount: null,
        turnCount: 1,
        isPrime: false,
      };
      expect(formatMoveToken(token)).toBe("");
    });
  });

  describe("formatAlgorithm", () => {
    test("should format valid MoveToken array", () => {
      const tokens: MoveToken[] = [
        { code: "r", sliceCount: null, turnCount: 1, isPrime: false },
        { code: "u", sliceCount: null, turnCount: 1, isPrime: true },
      ];
      expect(formatAlgorithm(tokens)).toBe("r u'");
    });

    test("should return empty string for invalid MoveToken array", () => {
      const tokens = [
        { code: "r", sliceCount: null, turnCount: 1, isPrime: false },
        { code: "X", sliceCount: null, turnCount: 1, isPrime: false },
      ];
      expect(formatAlgorithm(tokens)).toBe("");
    });
  });

  describe("mirrorAlgorithm", () => {
    test("should mirror valid algorithm", () => {
      const tokens: MoveToken[] = [
        { code: "r", sliceCount: null, turnCount: 1, isPrime: false },
        { code: "M", sliceCount: null, turnCount: 1, isPrime: true },
      ];
      expect(mirrorAlgorithm(tokens)).toEqual([
        { code: "l", sliceCount: null, turnCount: 1, isPrime: true },
        { code: "M", sliceCount: null, turnCount: 1, isPrime: false },
      ]);
    });

    test("should return empty array for invalid moves", () => {
      const tokens = [
        { code: "X", sliceCount: null, turnCount: 1, isPrime: false },
      ];
      expect(mirrorAlgorithm(tokens)).toEqual([]);
    });
  });

  describe("reverseAlgorithm", () => {
    test("should reverse valid algorithm", () => {
      const tokens: MoveToken[] = [
        { code: "r", sliceCount: null, turnCount: 1, isPrime: false },
        { code: "u", sliceCount: null, turnCount: 1, isPrime: true },
      ];
      expect(reverseAlgorithm(tokens)).toEqual([
        { code: "u", sliceCount: null, turnCount: 1, isPrime: false },
        { code: "r", sliceCount: null, turnCount: 1, isPrime: true },
      ]);
    });
  });

  describe("rotateAlgorithm", () => {
    test("should rotate valid algorithm", () => {
      const tokens: MoveToken[] = [
        { code: "r", sliceCount: null, turnCount: 1, isPrime: false },
        { code: "M", sliceCount: null, turnCount: 1, isPrime: false },
      ];
      expect(rotateAlgorithm(tokens)).toEqual([
        { code: "l", sliceCount: null, turnCount: 1, isPrime: false },
        { code: "M", sliceCount: null, turnCount: 1, isPrime: true },
      ]);
    });
  });

  describe("upperAlgorithm", () => {
    test("should convert valid wide moves to uppercase", () => {
      const tokens: MoveToken[] = [
        { code: "r", sliceCount: null, turnCount: 1, isPrime: false },
        { code: "M", sliceCount: null, turnCount: 1, isPrime: false },
      ];
      expect(upperAlgorithm(tokens)).toEqual([
        { code: "Rw", sliceCount: null, turnCount: 1, isPrime: false },
        { code: "M", sliceCount: null, turnCount: 1, isPrime: false },
      ]);
    });
  });

  describe("lowerAlgorithm", () => {
    test("should convert valid wide moves to lowercase", () => {
      const tokens: MoveToken[] = [
        { code: "Rw", sliceCount: null, turnCount: 1, isPrime: false },
        { code: "M", sliceCount: null, turnCount: 1, isPrime: false },
      ];
      expect(lowerAlgorithm(tokens)).toEqual([
        { code: "r", sliceCount: null, turnCount: 1, isPrime: false },
        { code: "M", sliceCount: null, turnCount: 1, isPrime: false },
      ]);
    });
  });
});

describe("333.ts - Additional Tests", () => {
  describe("mapAlgorithm (via mirrorAlgorithm, reverseAlgorithm, rotateAlgorithm)", () => {
    test("should handle invalid move codes via mirrorAlgorithm", () => {
      const tokens: MoveToken[] = [
        { code: "X", sliceCount: null, turnCount: 1, isPrime: false },
      ];
      expect(mirrorAlgorithm(tokens)).toEqual([]);
    });

    test("should reverse isPrime for specified moves via rotateAlgorithm", () => {
      const tokens: MoveToken[] = [
        { code: "M", sliceCount: null, turnCount: 1, isPrime: false },
        { code: "S", sliceCount: null, turnCount: 1, isPrime: true },
      ];
      expect(rotateAlgorithm(tokens)).toEqual([
        { code: "M", sliceCount: null, turnCount: 1, isPrime: true },
        { code: "S", sliceCount: null, turnCount: 1, isPrime: false },
      ]);
    });

    test("should preserve non-mapped moves via mirrorAlgorithm", () => {
      const tokens: MoveToken[] = [
        { code: "u", sliceCount: null, turnCount: 1, isPrime: false },
        { code: "E", sliceCount: null, turnCount: 1, isPrime: true },
      ];
      expect(mirrorAlgorithm(tokens)).toEqual([
        { code: "u", sliceCount: null, turnCount: 1, isPrime: false },
        { code: "E", sliceCount: null, turnCount: 1, isPrime: false },
      ]);
    });

    test("should handle empty reversePrimeFor via reverseAlgorithm", () => {
      const tokens: MoveToken[] = [
        { code: "r", sliceCount: null, turnCount: 1, isPrime: true },
      ];
      expect(reverseAlgorithm(tokens)).toEqual([
        { code: "r", sliceCount: null, turnCount: 1, isPrime: false },
      ]);
    });

    test("should handle multiple move types via rotateAlgorithm", () => {
      const tokens: MoveToken[] = [
        { code: "r", sliceCount: null, turnCount: 1, isPrime: false },
        { code: "f", sliceCount: null, turnCount: 2, isPrime: true },
        { code: "M", sliceCount: null, turnCount: 1, isPrime: false },
      ];
      expect(rotateAlgorithm(tokens)).toEqual([
        { code: "l", sliceCount: null, turnCount: 1, isPrime: false },
        { code: "b", sliceCount: null, turnCount: 2, isPrime: true },
        { code: "M", sliceCount: null, turnCount: 1, isPrime: true },
      ]);
    });
  });

  describe("mapAlgorithmList (via mirrorAlgorithm, reverseAlgorithm, rotateAlgorithm)", () => {
    test("should handle empty array via mirrorAlgorithm", () => {
      expect(mirrorAlgorithm([])).toEqual([]);
    });

    test("should handle all invalid moves via rotateAlgorithm", () => {
      const tokens: MoveToken[] = [
        { code: "X", sliceCount: null, turnCount: 1, isPrime: false },
        { code: "Y", sliceCount: null, turnCount: 1, isPrime: false },
      ];
      expect(rotateAlgorithm(tokens)).toEqual([]);
    });

    test("should process valid move list with mixed codes via mirrorAlgorithm", () => {
      const tokens: MoveToken[] = [
        { code: "r", sliceCount: null, turnCount: 1, isPrime: false },
        { code: "u", sliceCount: null, turnCount: 2, isPrime: true },
        { code: "M", sliceCount: null, turnCount: 1, isPrime: false },
      ];
      expect(mirrorAlgorithm(tokens)).toEqual([
        { code: "l", sliceCount: null, turnCount: 1, isPrime: true },
        { code: "u", sliceCount: null, turnCount: 2, isPrime: false },
        { code: "M", sliceCount: null, turnCount: 1, isPrime: true },
      ]);
    });
  });

  describe("upperMove and lowerMove (via upperAlgorithm and lowerAlgorithm)", () => {
    test("should map all wide moves to uppercase", () => {
      const tokens: MoveToken[] = wideMoveAliases.map((code) => ({
        code,
        sliceCount: null,
        turnCount: 1,
        isPrime: false,
      }));
      const expected = tokens.map((token) => ({
        ...token,
        code: `${token.code.toUpperCase()}w`,
      }));
      expect(upperAlgorithm(tokens)).toEqual(expected);
    });

    test("should map all wide moves to lowercase", () => {
      const tokens: MoveToken[] = ["Rw", "Lw", "Uw", "Dw", "Fw", "Bw"].map(
        (code) => ({
          code,
          sliceCount: null,
          turnCount: 1,
          isPrime: false,
        }),
      );
      const expected = tokens.map((token) => ({
        ...token,
        code: token.code[0].toLowerCase(),
      }));
      expect(lowerAlgorithm(tokens)).toEqual(expected);
    });

    test("should preserve non-mapped moves", () => {
      const tokens: MoveToken[] = middleLayerMoves.map((code) => ({
        code,
        sliceCount: null,
        turnCount: 1,
        isPrime: false,
      }));
      expect(upperAlgorithm(tokens)).toEqual(tokens);
      expect(lowerAlgorithm(tokens)).toEqual(tokens);
    });

    test("should handle malformed MoveToken", () => {
      const malformedToken: MoveToken = { code: "r" } as MoveToken;
      expect(upperAlgorithm([malformedToken])).toEqual([{ code: "Rw" }]);
      expect(lowerAlgorithm([{ code: "Rw" } as MoveToken])).toEqual([
        { code: "r" },
      ]);
    });
  });

  describe("parseMove - Edge Cases", () => {
    test("should handle malformed input", () => {
      expect(parseMove("r2'3")).toBeNull(); // Invalid format
      expect(parseMove("r''")).toBeNull(); // Multiple prime marks
      expect(parseMove("2r2")).toBeNull(); // Slice count not allowed
      expect(parseMove("r#")).toBeNull(); // Invalid character
      expect(parseMove("M2.5")).toBeNull(); // Non-integer turn count
    });

    test("should handle empty or whitespace input", () => {
      expect(parseMove("")).toBeNull();
      expect(parseMove(" ")).toBeNull();
    });

    test("should handle invalid turnCount", () => {
      expect(parseMove("M4")).toBeNull(); // Invalid turn count
    });
  });

  describe("formatMoveToken - Edge Cases", () => {
    test("should handle malformed MoveToken", () => {
      const malformedToken = { code: "r" } as MoveToken; // Missing required properties
      expect(formatMoveToken(malformedToken)).toBe("r");
    });
  });
});
