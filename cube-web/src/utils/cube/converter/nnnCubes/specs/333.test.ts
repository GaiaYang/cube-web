import type { MoveToken } from "../types";
import {
  isValidMoveString,
  isValidMoveToken,
  isValidWideMove,
  parseMove,
  parseAlgorithm,
  stringifyAlgorithm,
  formatMoveToken,
  formatMove,
  allMoves,
} from "./333";

describe("333 轉動符號檢查", () => {
  describe("isValidWideMove", () => {
    // test("獨立檢查", () => {
    //   expect(parseMove("r1")).toEqual({
    //     code: "r",
    //     isPrime: false,
    //     sliceCount: null,
    //     turnCount: 1,
    //   });
    // });
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
