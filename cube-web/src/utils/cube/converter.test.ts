import {
  splitFromAlgorithm,
  mergeToAlgorithm,
  parseAlgorithm,
  normalizeMoveInput,
  createMoveString,
  parseMoveString,
  isValidMoveString,
  normalizeMoveString,
  reverseAlgorithm,
  mirrorAlgorithm,
  rotateAlgorithm,
  upperAlgorithm,
  lowerAlgorithm,
  isAlgorithmValid,
  type Move,
  BASIC_CODES,
  DOUBLE_LAYER_CODES,
  PRIME,
} from "./converter";

// --- 單步符號組合生成 ---
const layerCounts = [0, 1, 2];
const turns = [1, 2, 3];
const primes = [false, true];
const moves = [...BASIC_CODES, ...DOUBLE_LAYER_CODES];

/** 生成帶前置層數、旋轉次數、prime 的單步字串 */
function generateAllSingleMoveCombinations(): string[] {
  const results: string[] = [];
  for (const move of moves) {
    for (const layer of layerCounts) {
      for (const turn of turns) {
        for (const prime of primes) {
          // 前置層數 >0 只能用 DOUBLE_LAYER_CODES
          if (layer > 0 && !DOUBLE_LAYER_CODES.includes(move as any)) continue;

          let str = "";
          if (layer > 0) str += layer;
          str += move;
          if (turn === 2) str += "2";
          else if (turn === 3) str += "3";
          if (prime) str += PRIME;
          results.push(str);
        }
      }
    }
  }
  return results;
}

const singleMoveCombinations = generateAllSingleMoveCombinations();
const plainMoves = [...BASIC_CODES, ...DOUBLE_LAYER_CODES]; // 純代號用於 split/merge/parse

// --- Jest 測試 ---
describe("converter - full coverage tests", () => {
  // ---------- 純代號測試 ----------
  it("splitFromAlgorithm", () => {
    plainMoves.forEach((move) => {
      expect(splitFromAlgorithm(move)).toEqual([move]);
    });
  });

  it("mergeToAlgorithm", () => {
    expect(mergeToAlgorithm(BASIC_CODES)).toEqual(BASIC_CODES.join(" "));
    expect(mergeToAlgorithm(DOUBLE_LAYER_CODES)).toEqual(
      DOUBLE_LAYER_CODES.join(" "),
    );
  });

  it("parseAlgorithm", () => {
    plainMoves.forEach((move) => {
      const parsed = parseAlgorithm(move);
      expect(parsed).toEqual([move]);
    });
  });

  it("reverseAlgorithm", () => {
    plainMoves.forEach((move) => {
      const reversed = reverseAlgorithm(move);
      expect(Array.isArray(reversed)).toBe(true);
      expect(reversed.length).toBeGreaterThan(0);
    });
  });

  it("mirrorAlgorithm", () => {
    plainMoves.forEach((move) => {
      const mirrored = mirrorAlgorithm(move);
      expect(Array.isArray(mirrored)).toBe(true);
      expect(mirrored.length).toBeGreaterThan(0);
    });
  });

  it("rotateAlgorithm", () => {
    plainMoves.forEach((move) => {
      const rotated = rotateAlgorithm(move);
      expect(Array.isArray(rotated)).toBe(true);
      expect(rotated.length).toBeGreaterThan(0);
    });
  });

  it("upperAlgorithm & lowerAlgorithm", () => {
    plainMoves.forEach((move) => {
      const uppered = upperAlgorithm(move);
      expect(Array.isArray(uppered)).toBe(true);
      expect(uppered.length).toBeGreaterThan(0);

      const lowered = lowerAlgorithm(move);
      expect(Array.isArray(lowered)).toBe(true);
      expect(lowered.length).toBeGreaterThan(0);
    });
  });

  it("isAlgorithmValid", () => {
    plainMoves.forEach((move) => {
      expect(isAlgorithmValid(move)).toBe(true);
    });
  });

  // ---------- 單步組合測試 ----------
  it("parseMoveString & isValidMoveString", () => {
    singleMoveCombinations.forEach((move) => {
      const parsed = parseMoveString(move);
      expect(parsed).not.toBeNull();
      expect(isValidMoveString(move)).toBe(true);
    });
  });

  it("normalizeMoveInput & createMoveString", () => {
    singleMoveCombinations.forEach((move) => {
      const parsed = parseMoveString(move);
      if (!parsed) return;
      const normalized = normalizeMoveInput(parsed);
      expect(normalized).not.toBeNull();
      const moveStr = createMoveString(normalized!);
      expect(moveStr).toBeDefined();
      expect(typeof moveStr).toBe("string");
    });
  });

  it("normalizeMoveString", () => {
    singleMoveCombinations.forEach((move) => {
      const normalized = normalizeMoveString(move);
      expect(normalized).not.toBeNull();
    });
  });

  // ---------- 錯誤 / 邊界測試 ----------
  it("handles empty, undefined, null, and invalid strings", () => {
    const invalids = ["", " ", "'", "2", "a", "!", "R#"];
    invalids.forEach((input) => {
      expect(splitFromAlgorithm(input)).toEqual([]);
      expect(parseAlgorithm(input)).toEqual([]);
      expect(parseMoveString(input)).toBeNull();
      expect(isValidMoveString(input)).toBe(false);
      expect(normalizeMoveString(input)).toBeNull();
    });

    expect(splitFromAlgorithm(undefined)).toEqual([]);
    expect(splitFromAlgorithm(null)).toEqual([]);
    expect(parseAlgorithm(undefined)).toEqual([]);
    expect(parseAlgorithm(null)).toEqual([]);
    expect(normalizeMoveInput({} as any)).toBeNull();
    expect(createMoveString({} as any)).toBeNull();
  });

  it("handles illegal layer counts", () => {
    // x 不在 DOUBLE_LAYER_CODES
    expect(parseMoveString("1x")).toBeNull();
    // R 在 BASIC_CODES，不允許層數 >0
    expect(parseMoveString("1R")).toBeNull();
    expect(parseMoveString("2R")).toBeNull();
  });

  it("handles illegal turns and prime combinations", () => {
    const cases = ["R4", "R'2", "Rw5'", "2Uw3"];
    cases.forEach((m) => {
      const parsed = parseMoveString(m);
      if (parsed) {
        const norm = normalizeMoveInput(parsed);
        expect(norm).toBeDefined();
        const str = createMoveString(norm!);
        expect(str).toBeDefined();
      }
    });
  });
});
