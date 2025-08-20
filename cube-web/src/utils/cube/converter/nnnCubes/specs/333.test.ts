import {
  allMoves,
  parseMove,
  parseAlgorithm,
  formatAlgorithm,
  mirrorAlgorithm,
  reverseAlgorithm,
  rotateAlgorithm,
  upperAlgorithm,
  lowerAlgorithm,
} from "./333";

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
const fullAlg = "R U F L D B x y z E M S Rw Uw Fw Lw Dw Bw r u f l d b";
const fullAlgPrime =
  "R' U' F' L' D' B' x' y' z' E' M' S' Rw' Uw' Fw' Lw' Dw' Bw' r' u' f' l' d' b'";

// 產生 0~4
const range0to4 = Array.from({ length: 5 }, (_, i) => i);

describe("333 轉動符號檢查", () => {
  describe("formatAlgorithm", () => {
    test("應該能正確組合成公式", () => {
      expect(formatAlgorithm()).toBe("");
      expect(formatAlgorithm(null)).toBe("");
      expect(formatAlgorithm(undefined)).toBe("");
      expect(formatAlgorithm([])).toBe("");
      expect(formatAlgorithm([""])).toBe("");
      expect(formatAlgorithm(["R", "2r"])).toBe("");
      expect(formatAlgorithm(["R", "r2", "Lw"])).toBe("R r2 Lw");
    });
  });

  describe("parseAlgorithm", () => {
    test("應該能拆解成 MoveToken 陣列", () => {
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
      expect(parseAlgorithm("r6")).toEqual([
        { sliceCount: null, code: "r", turnCount: 2, isPrime: false },
      ]);
      expect(parseAlgorithm("r6'")).toEqual([
        { sliceCount: null, code: "r", turnCount: 2, isPrime: true },
      ]);
      expect(parseAlgorithm("R 1r2 Lw")).toEqual([]);
    });
  });

  describe("parseMove", () => {
    test("應該能解析錯誤符號為 null", () => {
      invalidSymbols.forEach((s) => expect(parseMove(s)).toBeNull());
      allMoves.forEach((m, i) => {
        expect(parseMove(`${i}${m}'`)).toBeNull();
        expect(parseMove(`${-i}${m}'`)).toBeNull();
      });
    });

    test("應該能正確解析符號", () => {
      allMoves.forEach((m) =>
        expect(parseMove(m)).toEqual({
          code: m,
          isPrime: false,
          sliceCount: null,
          turnCount: 1,
        }),
      );

      allMoves
        .map((m) => `${m}'`)
        .forEach((m, i) =>
          expect(parseMove(m)).toEqual({
            code: allMoves[i],
            isPrime: true,
            sliceCount: null,
            turnCount: 1,
          }),
        );

      range0to4.forEach((n) => {
        allMoves.forEach((m, i) => {
          expect(parseMove(`${m}${n}`)).toEqual(
            n % 4 !== 0
              ? {
                  code: allMoves[i],
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

describe("333 轉換公式實作", () => {
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
        "L' U' F' R' D' B' x' y' z' E' M' S' Lw' Uw' Fw' Rw' Dw' Bw' l' u' f' r' d' b'",
      );
      expect(
        formatAlgorithm(mirrorAlgorithm(parseAlgorithm(fullAlgPrime))),
      ).toBe("L U F R D B x y z E M S Lw Uw Fw Rw Dw Bw l u f r d b");
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
        formatAlgorithm(
          reverseAlgorithm(parseAlgorithm("R U F L D B x y z E M S")),
        ),
      ).toBe("S' M' E' z' y' x' B' D' L' F' U' R'");
    });
  });

  describe("rotateAlgorithm (旋轉公式)", () => {
    test("應該能正確旋轉", () => {
      expect(
        formatAlgorithm(
          rotateAlgorithm(parseAlgorithm("R U F L D B x y z E M S")),
        ),
      ).toBe("L U B R D F x' y z' E M' S'");
    });
  });

  describe("upperAlgorithm / lowerAlgorithm (大小寫轉換)", () => {
    test("轉大寫", () => {
      expect(formatAlgorithm(upperAlgorithm(parseAlgorithm(fullAlg)))).toBe(
        "R U F L D B x y z E M S Rw Uw Fw Lw Dw Bw Rw Uw Fw Lw Dw Bw",
      );
    });

    test("轉小寫", () => {
      expect(formatAlgorithm(lowerAlgorithm(parseAlgorithm(fullAlg)))).toBe(
        "R U F L D B x y z E M S r u f l d b r u f l d b",
      );
    });
  });
});
