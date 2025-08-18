import type { MoveToken } from "../types";
import { isValidMove, isValidMoveToken, allMoves } from "./333";

describe("333 轉動符號檢查", () => {
  describe("isValidMoveToken", () => {
    test("檢查代號物件是否合法", () => {
      const array: MoveToken[] = [
        {
          layers: null,
          base: "R",
          turns: 1,
          prime: false,
        },
        {
          layers: null,
          base: "r",
          turns: 1,
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
          layers: 1,
          base: "R",
          turns: 1,
          prime: false,
        },
        {
          layers: null,
          base: "R",
          turns: -1,
          prime: false,
        },
        {
          layers: null,
          base: "x",
          turns: 0,
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
