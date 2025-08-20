import type { WideMove } from "../types";
import {
  parseMove,
  parseAlgorithm,
  formatAlgorithm,
  mirrorAlgorithm,
  reverseAlgorithm,
  rotateAlgorithm,
} from "./nnn";
import { basicMoves, wideMoves } from "../constants";

const invalidSymbols = [
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
const fullAlg = "R U F L D B x y z";
const fullAlgPrime = "R' U' F' L' D' B' x' y' z'";

// 產生 0~4
const range0to4 = Array.from({ length: 5 }, (_, i) => i);

describe("nnn 轉動符號檢查", () => {
  describe("formatAlgorithm", () => {
    test("應該能正確組合成公式", () => {
      expect(formatAlgorithm()).toBe("");
      expect(formatAlgorithm(null)).toBe("");
      expect(formatAlgorithm(undefined)).toBe("");
      expect(formatAlgorithm([])).toBe("");
      expect(formatAlgorithm([""])).toBe("");
      expect(formatAlgorithm(["R", "2r"])).toBe("");
      expect(formatAlgorithm(["R", "r2", "Lw"])).toBe("");
    });
  });

  describe("parseAlgorithm", () => {
    test("應該能拆解成 MoveToken 陣列", () => {
      expect(parseAlgorithm("R r r' r2 r2' r3 r3' Lw")).toEqual([]);
      expect(parseAlgorithm("r4")).toEqual([]);
      expect(parseAlgorithm("r8")).toEqual([]);
      expect(parseAlgorithm("r6")).toEqual([]);
      expect(parseAlgorithm("r6'")).toEqual([]);
      expect(parseAlgorithm("R 1r2 Lw")).toEqual([]);
    });
  });

  describe("parseMove", () => {
    test("應該能解析錯誤符號為 null", () => {
      invalidSymbols.forEach((s) => expect(parseMove(s)).toBeNull());
      basicMoves.forEach((m, i) => {
        expect(parseMove(`${i}${m}'`)).toEqual(
          wideMoves.includes(m as WideMove) && i > 1
            ? {
                code: m,
                isPrime: true,
                sliceCount: i,
                turnCount: 1,
              }
            : null,
        );
        expect(parseMove(`${-i}${m}'`)).toBeNull();
      });
    });

    test("應該能正確解析符號", () => {
      basicMoves.forEach((m) =>
        expect(parseMove(m)).toEqual({
          code: m,
          isPrime: false,
          sliceCount: null,
          turnCount: 1,
        }),
      );

      basicMoves
        .map((m) => `${m}'`)
        .forEach((m, i) =>
          expect(parseMove(m)).toEqual({
            code: basicMoves[i],
            isPrime: true,
            sliceCount: null,
            turnCount: 1,
          }),
        );

      range0to4.forEach((n) => {
        basicMoves.forEach((m, i) => {
          expect(parseMove(`${m}${n}`)).toEqual(
            // 書寫必須從 2 開始
            n % 4 !== 0 && n >= 2
              ? {
                  code: basicMoves[i],
                  isPrime: false,
                  sliceCount: null,
                  turnCount: n,
                }
              : null,
          );
        });
      });
    });
  });
});

describe("nnn 轉換公式實作", () => {
  describe("mirrorAlgorithm (水平轉換)", () => {
    test("錯誤測資應該回傳空字串", () => {
      const invalidAlgs = [
        "R4 U4 F4 L4 D4 B4 x4 y4 z4 E4 M4 S4",
        "2R 2U 2F 2L 2D 2B 2x 2y 2z 2E 2M 2S",
      ];
      invalidAlgs.forEach((alg) =>
        expect(formatAlgorithm(mirrorAlgorithm(parseAlgorithm(alg)))).toBe(""),
      );
    });

    test("正確測資應該能水平轉換", () => {
      expect(formatAlgorithm(mirrorAlgorithm(parseAlgorithm(fullAlg)))).toBe(
        "L' U' F' R' D' B' x' y' z'",
      );
      expect(
        formatAlgorithm(mirrorAlgorithm(parseAlgorithm(fullAlgPrime))),
      ).toBe("L U F R D B x y z");
    });
  });

  describe("reverseAlgorithm (反轉公式)", () => {
    test("錯誤測資應該回傳空字串", () => {
      expect(
        formatAlgorithm(reverseAlgorithm(parseAlgorithm("R U F ... q"))),
      ).toBe("");
    });

    test("正確測資應該能反轉", () => {
      expect(reverseAlgorithm([])).toEqual([]);
      expect(
        formatAlgorithm(reverseAlgorithm(parseAlgorithm("R U F L D B x y z"))),
      ).toBe("z' y' x' B' D' L' F' U' R'");
    });
    test("正確測資應該不能反轉", () => {
      expect(reverseAlgorithm([])).toEqual([]);
      expect(
        formatAlgorithm(
          reverseAlgorithm(parseAlgorithm("R U F L D B x y z E M S")),
        ),
      ).toBe("");
    });
  });

  describe("rotateAlgorithm (旋轉公式)", () => {
    test("應該能正確旋轉", () => {
      expect(
        formatAlgorithm(rotateAlgorithm(parseAlgorithm("R U F L D B x y z"))),
      ).toBe("L U B R D F x' y z'");
    });
  });
});
