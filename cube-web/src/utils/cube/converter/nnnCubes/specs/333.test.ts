import type { MoveToken } from "../types";
import {
  isValidMove,
  isValidMoveToken,
  isValidWideMove,
  allMoves,
} from "./333";

describe("333 轉動符號檢查", () => {
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
          base: "R",
          turnCount: 1,
          prime: false,
        },
        {
          sliceCount: null,
          base: "r",
          turnCount: 1,
          prime: true,
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
          base: "R",
          turnCount: 1,
          prime: false,
        },
        {
          sliceCount: null,
          base: "R",
          turnCount: -1,
          prime: false,
        },
        {
          sliceCount: null,
          base: "x",
          turnCount: 0,
          prime: false,
        },
      ];
      for (const element of [...array, ...array2]) {
        expect(isValidMoveToken(element as MoveToken)).toBe(false);
      }
    });
  });
  describe("isValidMove", () => {
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
        expect(isValidMove(element)).toBe(false);
      }
    });
    test("檢查一般符號是否合法", () => {
      for (const move of allMoves) {
        expect(isValidMove(move)).toBe(true);
      }
    });
    test("檢查逆時鐘符號是否合法", () => {
      for (const move of allMoves.map((item) => `${item}'`)) {
        expect(isValidMove(move)).toBe(true);
      }
    });
    test("檢查多層是否違法", () => {
      for (const move of allMoves.map((item, index) => `${index}${item}'`)) {
        expect(isValidMove(move)).toBe(false);
      }
    });
    test("檢查負號多層是否違法", () => {
      for (const move of allMoves.map((item, index) => `${-index}${item}'`)) {
        expect(isValidMove(move)).toBe(false);
      }
    });
    test("旋轉次數符號是否合法", () => {
      for (const element of Array(5)
        .fill(null)
        .map((_, i) => i)) {
        for (const move of allMoves.map((item) => `${item}${element}`)) {
          expect(isValidMove(move)).toBe(element >= 1 && element <= 3);
        }
      }
    });
    test("負旋轉次數符號是否違法", () => {
      for (const element of Array(5)
        .fill(null)
        .map((_, i) => i)) {
        for (const move of allMoves.map((item) => `${item}${-element}`)) {
          expect(isValidMove(move)).toBe(false);
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
          expect(isValidMove(move)).toBe(false);
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
          expect(isValidMove(move)).toBe(false);
        }
      }
    });
  });
});
