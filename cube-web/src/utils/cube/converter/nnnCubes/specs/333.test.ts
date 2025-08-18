import type { MoveToken } from "../types";
import {
  allMoves,
  isValidMoveString,
  isValidMoveToken,
  isValidWideMove,
  parseMove,
  parseAlgorithm,
  stringifyAlgorithm,
  // formatMoveToken,
  // formatMove,
  mirrorAlgorithm,
  reverseAlgorithm,
} from "./333";

describe("333 轉動符號檢查", () => {
  describe("stringifyAlgorithm", () => {
    test("組合成公式", () => {
      expect(stringifyAlgorithm()).toBe("");
      expect(stringifyAlgorithm(null)).toBe("");
      expect(stringifyAlgorithm(undefined)).toBe("");
      expect(stringifyAlgorithm([])).toBe("");
      expect(stringifyAlgorithm([""])).toBe("");
      expect(stringifyAlgorithm(["R", "2r"])).toBe("");
      expect(stringifyAlgorithm(["R", "r2", "Lw"])).toBe("R r2 Lw");
    });
  });
  describe("parseAlgorithm", () => {
    test("拆解成陣列", () => {
      expect(parseAlgorithm("R r r' r2 r2' r3 r3' Lw")).toEqual([
        { sliceCount: null, code: "R", turnCount: 1, isPrime: false },
        { sliceCount: null, code: "r", turnCount: 1, isPrime: false },
        { sliceCount: null, code: "r", turnCount: 1, isPrime: true },
        { sliceCount: null, code: "r", turnCount: 2, isPrime: false },
        { sliceCount: null, code: "r", turnCount: 2, isPrime: true },
        { sliceCount: null, code: "r", turnCount: 3, isPrime: false },
        { sliceCount: null, code: "r", turnCount: 3, isPrime: true },
        { sliceCount: null, code: "Lw", turnCount: 1, isPrime: false },
      ]);
      expect(parseAlgorithm("r4")).toEqual([]);
      expect(parseAlgorithm("r8")).toEqual([]);
      expect(parseAlgorithm("r4")).toEqual([]);
      expect(parseAlgorithm("r8'")).toEqual([]);
      expect(parseAlgorithm("r6")).toEqual([
        { sliceCount: null, code: "r", turnCount: 2, isPrime: false },
      ]);
      expect(parseAlgorithm("r6'")).toEqual([
        { sliceCount: null, code: "r", turnCount: 2, isPrime: true },
      ]);
      expect(parseAlgorithm("R 1r2 Lw")).toEqual([]);
    });
  });
  describe("isValidWideMove", () => {
    test("檢查多層轉動是否合法", () => {
      expect(isValidWideMove(null)).toBe(true);
    });
    test("檢查多層轉動是否違法", () => {
      for (const element of Array(8)
        .fill(null)
        .map((_, i) => i)) {
        expect(isValidWideMove(element)).toBe(false);
      }
    });
  });
  describe("isValidMoveToken", () => {
    test("檢查代號物件是否合法", () => {
      const array: MoveToken[] = [
        {
          sliceCount: null,
          code: "R",
          turnCount: 1,
          isPrime: false,
        },
        {
          sliceCount: null,
          code: "r",
          turnCount: 1,
          isPrime: true,
        },
      ];
      for (const element of array) {
        expect(isValidMoveToken(element)).toBe(true);
      }
    });
    test("檢查代號物件是否違法", () => {
      const array = [null, undefined, {}];
      const array2: MoveToken[] = [
        {
          sliceCount: 1,
          code: "R",
          turnCount: 1,
          isPrime: false,
        },
        {
          sliceCount: null,
          code: "R",
          turnCount: -1,
          isPrime: false,
        },
        {
          sliceCount: null,
          code: "x",
          turnCount: 0,
          isPrime: false,
        },
      ];
      for (const element of [...array, ...array2]) {
        expect(isValidMoveToken(element as MoveToken)).toBe(false);
      }
    });
  });
  describe("isValidMoveString", () => {
    test("檢查單一符號是否違法", () => {
      const array = [
        null,
        "",
        " ",
        "q",
        "X",
        "'",
        "1",
        "2",
        "3",
        "4",
        "2'",
        "2R",
        "1R",
      ];
      for (const element of array) {
        expect(isValidMoveString(element)).toBe(false);
      }
    });
    test("檢查一般符號是否合法", () => {
      for (const move of allMoves) {
        expect(isValidMoveString(move)).toBe(true);
      }
    });
    test("檢查逆時鐘符號是否合法", () => {
      for (const move of allMoves.map((item) => `${item}'`)) {
        expect(isValidMoveString(move)).toBe(true);
      }
    });
    test("檢查多層是否違法", () => {
      for (const move of allMoves.map((item, index) => `${index}${item}'`)) {
        expect(isValidMoveString(move)).toBe(false);
      }
    });
    test("檢查負號多層是否違法", () => {
      for (const move of allMoves.map((item, index) => `${-index}${item}'`)) {
        expect(isValidMoveString(move)).toBe(false);
      }
    });
    test("旋轉次數符號是否合法", () => {
      for (const element of Array(5)
        .fill(null)
        .map((_, i) => i)) {
        for (const move of allMoves.map((item) => `${item}${element}`)) {
          expect(isValidMoveString(move)).toBe(element >= 1 && element <= 3);
        }
      }
    });
    test("負旋轉次數符號是否違法", () => {
      for (const element of Array(5)
        .fill(null)
        .map((_, i) => i)) {
        for (const move of allMoves.map((item) => `${item}${-element}`)) {
          expect(isValidMoveString(move)).toBe(false);
        }
      }
    });
    test("多層旋轉次數符號是否違法", () => {
      for (const element of Array(5)
        .fill(null)
        .map((_, i) => i)) {
        for (const move of allMoves.map(
          (item, index) => `${index}${item}${element}`,
        )) {
          expect(isValidMoveString(move)).toBe(false);
        }
      }
    });
    test("負旋轉次數符號是否違法", () => {
      for (const element of Array(5)
        .fill(null)
        .map((_, i) => i)) {
        for (const move of allMoves.map(
          (item, index) => `${-index}${item}${-element}`,
        )) {
          expect(isValidMoveString(move)).toBe(false);
        }
      }
    });
  });
  describe("parseMove", () => {
    test("檢查單一符號是否違法", () => {
      const array = [
        null,
        "",
        " ",
        "q",
        "X",
        "'",
        "1",
        "2",
        "3",
        "4",
        "2'",
        "2R",
        "1R",
      ];
      for (const element of array) {
        expect(parseMove(element)).toBeNull();
      }
    });
    test("檢查一般符號是否合法", () => {
      for (const move of allMoves) {
        expect(parseMove(move)).toEqual({
          code: move,
          isPrime: false,
          sliceCount: null,
          turnCount: 1,
        });
      }
    });
    test("檢查逆時鐘符號是否合法", () => {
      allMoves
        .map((item) => `${item}'`)
        .forEach((item, index) => {
          expect(parseMove(item)).toEqual({
            code: allMoves[index],
            isPrime: true,
            sliceCount: null,
            turnCount: 1,
          });
        });
    });
    test("檢查多層是否違法", () => {
      for (const move of allMoves.map((item, index) => `${index}${item}'`)) {
        expect(parseMove(move)).toBeNull();
      }
    });
    test("檢查負號多層是否違法", () => {
      for (const move of allMoves.map((item, index) => `${-index}${item}'`)) {
        expect(parseMove(move)).toBeNull();
      }
    });
    test("旋轉次數符號是否合法", () => {
      for (const element of Array(5)
        .fill(null)
        .map((_, i) => i)) {
        allMoves
          .map((item) => `${item}${element}`)
          .forEach((item, index) => {
            expect(parseMove(item)).toEqual(
              element % 4 !== 0
                ? {
                    code: allMoves[index],
                    isPrime: false,
                    sliceCount: null,
                    turnCount: element,
                  }
                : null,
            );
          });
      }
    });
    test("負旋轉次數符號是否違法", () => {
      for (const element of Array(5)
        .fill(null)
        .map((_, i) => i)) {
        for (const move of allMoves.map((item) => `${item}${-element}`)) {
          expect(parseMove(move)).toBeNull();
        }
      }
    });
    test("多層旋轉次數符號是否違法", () => {
      for (const element of Array(5)
        .fill(null)
        .map((_, i) => i)) {
        for (const move of allMoves.map(
          (item, index) => `${index}${item}${element}`,
        )) {
          expect(parseMove(move)).toBeNull();
        }
      }
    });
    test("負旋轉次數符號是否違法", () => {
      for (const element of Array(5)
        .fill(null)
        .map((_, i) => i)) {
        for (const move of allMoves.map(
          (item, index) => `${-index}${item}${-element}`,
        )) {
          expect(parseMove(move)).toBeNull();
        }
      }
    });
  });
});

describe("333轉換公式實作", () => {
  describe("水平轉換公式", () => {
    test("錯誤測試", () => {
      const algs = [
        "R4 U4 F4 L4 D4 B4 x4 y4 z4 E4 M4 S4",
        "2R 2U 2F 2L 2D 2B 2x 2y 2z 2E 2M 2S",
      ];
      for (const alg of algs) {
        expect(stringifyAlgorithm(mirrorAlgorithm(parseAlgorithm(alg)))).toBe(
          "",
        );
      }
    });
    test("合法測試", () => {
      const alg = "R U F L D B x y z E M S Rw Uw Fw Lw Dw Bw r u f l d b";
      const alg2 =
        "R' U' F' L' D' B' x' y' z' E' M' S' Rw' Uw' Fw' Lw' Dw' Bw' r' u' f' l' d' b'";
      const alg3 =
        "R2' U2' F2' L2' D2' B2' x2' y2' z2' E2' M2' S2' Rw2' Uw2' Fw2' Lw2' Dw2' Bw2' r2' u2' f2' l2' d2' b2'";
      const alg4 =
        "R2 U2 F2 L2 D2 B2 x2 y2 z2 E2 M2 S2 Rw2 Uw2 Fw2 Lw2 Dw2 Bw2 r2 u2 f2 l2 d2 b2";
      const alg5 =
        "R5 U5 F5 L5 D5 B5 x5 y5 z5 E5 M5 S5 Rw5 Uw5 Fw5 Lw5 Dw5 Bw5 r5 u5 f5 l5 d5 b5";
      expect(stringifyAlgorithm(mirrorAlgorithm(parseAlgorithm(alg)))).toBe(
        "L' U' F' R' D' B' x' y' z' E' M' S' Lw' Uw' Fw' Rw' Dw' Bw' l' u' f' r' d' b'",
      );
      expect(stringifyAlgorithm(mirrorAlgorithm(parseAlgorithm(alg2)))).toBe(
        "L U F R D B x y z E M S Lw Uw Fw Rw Dw Bw l u f r d b",
      );
      expect(stringifyAlgorithm(mirrorAlgorithm(parseAlgorithm(alg3)))).toBe(
        "L2 U2 F2 R2 D2 B2 x2 y2 z2 E2 M2 S2 Lw2 Uw2 Fw2 Rw2 Dw2 Bw2 l2 u2 f2 r2 d2 b2",
      );
      expect(stringifyAlgorithm(mirrorAlgorithm(parseAlgorithm(alg4)))).toBe(
        "L2' U2' F2' R2' D2' B2' x2' y2' z2' E2' M2' S2' Lw2' Uw2' Fw2' Rw2' Dw2' Bw2' l2' u2' f2' r2' d2' b2'",
      );
      expect(stringifyAlgorithm(mirrorAlgorithm(parseAlgorithm(alg5)))).toBe(
        "L' U' F' R' D' B' x' y' z' E' M' S' Lw' Uw' Fw' Rw' Dw' Bw' l' u' f' r' d' b'",
      );
    });
  });

  describe("反轉公式", () => {
    test("錯誤測試", () => {
      expect(
        stringifyAlgorithm(
          reverseAlgorithm(parseAlgorithm("R U F L D B x y z E M S q")),
        ),
      ).toEqual("");
    });
    test("合法測試", () => {
      expect(reverseAlgorithm([])).toEqual([]);
      expect(
        stringifyAlgorithm(
          reverseAlgorithm(parseAlgorithm("R U F L D B x y z E M S")),
        ),
      ).toEqual("S' M' E' z' y' x' B' D' L' F' U' R'");
    });
  });
});
