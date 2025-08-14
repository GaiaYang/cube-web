import { isNotNil, isPlainObject } from "es-toolkit";

export type LowerRotationCode = "r" | "l" | "u" | "d" | "f" | "b";
export type UpperRotationCode = "Rw" | "Lw" | "Uw" | "Dw" | "Fw" | "Bw";
export type MiddleRotationCode = "M" | "S" | "E";
export type AxisRotationCode = "x" | "y" | "z";
export type SideRotationCode = "R" | "L" | "U" | "D" | "F" | "B";

/** 轉動代號 */
export type RotationCode =
  | LowerRotationCode
  | UpperRotationCode
  | MiddleRotationCode
  | AxisRotationCode
  | SideRotationCode;

/** 轉動符號 */
export type MoveNotation =
  | RotationCode
  | `${number | ""}${RotationCode}'`
  | `${number | ""}${RotationCode}${number | ""}'`
  | `${number | ""}${RotationCode}${number | ""}`;

/** 公式輸入 */
export type AlgorithmInput = string | MoveNotation[];

/** 解析轉動符號物件 */
export interface MoveObject<T> {
  /** 轉動層數 */
  layerCount: number | null;
  /** 主要轉動符號 */
  code: T;
  /** 是否逆時針轉動 */
  isPrime: boolean;
  /** 轉動次數 */
  turns: number;
}

// 核心處理
/** 分隔符號 */
const separator = " ";
/** 逆時針符號 */
const primeCode = "'";

/** 將公式拆解為字串陣列 */
export function splitFromAlgorithm(input?: string | null): string[] {
  return typeof input === "string" ? input.split(separator) : [];
}

/** 將公式合併為字串 */
export function mergeToAlgorithm(input: MoveNotation[]): string {
  return input.join(separator);
}

/** 解析`AlgorithmInput`為統一字串陣列 */
export function parseAlgorithm(input: AlgorithmInput): string[] {
  return typeof input === "string" ? splitFromAlgorithm(input) : input;
}

/** 旋轉代號陣列 */
const rotationCodes: RotationCode[] = [
  "x",
  "y",
  "z",
  "R",
  "L",
  "U",
  "D",
  "F",
  "B",
  "M",
  "S",
  "E",
  "Rw",
  "Lw",
  "Uw",
  "Dw",
  "Fw",
  "Bw",
  "r",
  "l",
  "u",
  "d",
  "f",
  "b",
];

// Regex 拆解: (前數字)? 代號 (')? (次數)?
const movePattern =
  /^(\d*)?(x|y|z|R|L|U|D|F|B|M|S|E|Rw|Lw|Uw|Dw|Fw|Bw|r|l|u|d|f|b)(\d*)('?)$/;

/** 解析轉動符號 */
function parseMoveNotation<T = RotationCode>(
  move: string,
): MoveObject<T> | null {
  const match = move.match(movePattern);
  if (!match) return null;

  const [, layerCount, code, turns, prime] = match;
  return {
    layerCount: layerCount ? Number(layerCount) : null,
    code: code as T,
    isPrime: prime === primeCode,
    turns: turns ? Number(turns) : 1,
  };
}

/** 是否為合法轉動符號 */
export function isValidMove(move: string): boolean {
  const parsed = parseMoveNotation(move);
  if (!parsed) return false;
  if (parsed.layerCount !== null && parsed.layerCount < 1) return false;
  return rotationCodes.includes(parsed.code);
}

/** 化簡成 0~3 次，保證非負 */
function simplifyTurns(value: number, isPrime?: boolean) {
  let newValue = value;
  // 逆時針轉換成等價的順時針次數
  if (isPrime) {
    newValue = 4 - value;
  }

  return newValue % 4;
}

/** 建立轉動代號字串 */
export function createMoveNotation<T = RotationCode>(move: MoveObject<T>) {
  if (!isPlainObject(move)) {
    return null;
  }

  const { layerCount, code, turns, isPrime } = move;

  const finalTurns = simplifyTurns(turns, isPrime);

  if (finalTurns === 0) return null;

  let suffix = "";

  if (finalTurns === 2) {
    suffix = "2";
  }
  if (finalTurns === 3) {
    suffix = primeCode;
  }

  return `${layerCount ?? ""}${code}${suffix}` as MoveNotation;
}

/** 標準化轉動 */
export function normalizeMove(move: string): string | null {
  const parsed = parseMoveNotation(move);
  if (!parsed || !isValidMove(move)) return null;

  const { layerCount, code, isPrime, turns } = parsed;
  const finalTurns = simplifyTurns(turns, isPrime);

  if (finalTurns === 0) return null;

  return createMoveNotation({ layerCount, code, isPrime, turns });
}

// 實際應用處理
/**
 * 反轉公式
 *
 * 轉動步驟順序反轉，這個功能可以讓你將整條轉動步驟以相反的動作倒著做，讓你可以將順著做完的狀態，倒著恢復到還沒轉的原樣。
 * */
export function reverseAlgorithm(input: AlgorithmInput): MoveNotation[] {
  return parseAlgorithm(input)
    .reverse()
    .map((move) => {
      const parsed = parseMoveNotation(move);
      if (!parsed) return null;

      const { layerCount, code, isPrime, turns } = parsed;
      const currentPrime = !isPrime;

      return createMoveNotation({
        layerCount,
        code,
        isPrime: currentPrime,
        turns,
      });
    })
    .filter(isNotNil);
}

/** 鏡像映射表（左右鏡像） */
const mirrorMap: Record<RotationCode, `${RotationCode}'`> = {
  x: "x'",
  y: "y'",
  z: "z'",
  R: "L'",
  L: "R'",
  U: "U'",
  D: "D'",
  F: "F'",
  B: "B'",
  M: "M'",
  S: "S'",
  E: "E'",
  Rw: "Lw'",
  Lw: "Rw'",
  Uw: "Uw'",
  Dw: "Dw'",
  Fw: "Fw'",
  Bw: "Bw'",
  r: "l'",
  l: "r'",
  u: "u'",
  d: "d'",
  f: "f'",
  b: "b'",
};

/**
 * 鏡像公式
 *
 * 轉動步驟左右鏡像，可以幫助你將在右手做的公式直接鏡射到左手的位置，讓同一條公式透過左右手的差異來解決鏡像的兩種狀態。
 * */
export function mirrorAlgorithm(input: AlgorithmInput): MoveNotation[] {
  return parseAlgorithm(input)
    .map((move) => {
      const parsed = parseMoveNotation(move);
      if (!parsed) return null;

      const { layerCount, code, isPrime, turns } = parsed;

      // 取得鏡像代號
      let mirroredCode = mirrorMap[code];
      if (!mirroredCode) return null;

      let extraPrime = false;
      if (mirroredCode.endsWith(primeCode)) {
        mirroredCode = mirroredCode.slice(0, -1) as `${RotationCode}'`;
        extraPrime = true;
      }

      /** 計算鏡像後方向 */
      const currentPrime = isPrime !== extraPrime;

      return createMoveNotation({
        layerCount,
        code: mirroredCode,
        isPrime: currentPrime,
        turns,
      });
    })
    .filter(isNotNil);
}

/** 旋轉映射表 */
const rotateMap: Record<RotationCode, RotationCode> = {
  x: "x",
  y: "y",
  z: "z",
  R: "L",
  L: "R",
  U: "U",
  D: "D",
  F: "B",
  B: "F",
  M: "M",
  S: "S",
  E: "E",
  Rw: "Lw",
  Lw: "Rw",
  Uw: "Uw",
  Dw: "Dw",
  Fw: "Bw",
  Bw: "Fw",
  r: "l",
  l: "r",
  u: "u",
  d: "d",
  f: "b",
  b: "f",
};

/**
 * 旋轉公式
 *
 * 轉動步驟前後旋轉，可以將你的輸入的步驟轉換成當你將方塊轉動 y2 後，仍然可以得到一樣結果的步驟。
 * 實際應用：假設有一條順手的公式，存在著鏡像形式的話，你可以考慮將他以左右鏡像的方式轉換後，再進行前後旋轉，則可以得到以同一手做的鏡像公式。
 * */
export function rotateAlgorithm(input: AlgorithmInput): MoveNotation[] {
  return parseAlgorithm(input)
    .map((move) => {
      const parsed = parseMoveNotation(move);
      if (!parsed) return null;

      const { layerCount, code, isPrime, turns } = parsed;
      /** 替換成旋轉後代號 */
      const rotatedCode = rotateMap[code] ?? code;

      return createMoveNotation({
        layerCount,
        code: rotatedCode,
        isPrime,
        turns,
      });
    })
    .filter(isNotNil);
}

/** 小寫代號 → 帶 w 的大寫代號映射 */
const lowerToUpperMap: Record<LowerRotationCode, UpperRotationCode> = {
  r: "Rw",
  l: "Lw",
  u: "Uw",
  d: "Dw",
  f: "Fw",
  b: "Bw",
};
/** 轉換為標準公式：小寫代號 → 帶 w 的大寫代號 */
export function upperAlgorithm(input: AlgorithmInput): MoveNotation[] {
  return parseAlgorithm(input).map((move) => {
    const parsed = parseMoveNotation(move);
    if (!parsed) return move as MoveNotation;

    const code = lowerToUpperMap[parsed.code] ?? parsed.code;
    return `${parsed.layerCount ?? ""}${code}${parsed.isPrime ? "'" : ""}${parsed.turns > 1 ? parsed.turns : ""}` as MoveNotation;
  });
}

/** 帶 w 的大寫代號 → 小寫代號映射 */
const upperToLowerMap: Record<UpperRotationCode, LowerRotationCode> = {
  Rw: "r",
  Lw: "l",
  Uw: "u",
  Dw: "d",
  Fw: "f",
  Bw: "b",
};

/** 轉換為常見公式：帶 w 的大寫代號 → 小寫代號 */
export function lowerAlgorithm(input: AlgorithmInput): MoveNotation[] {
  return parseAlgorithm(input).map((move) => {
    const parsed = parseMoveNotation(move);
    if (!parsed) return move as MoveNotation;

    const code = upperToLowerMap[parsed.code] ?? parsed.code;
    return `${parsed.layerCount ?? ""}${code}${parsed.isPrime ? "'" : ""}${parsed.turns > 1 ? parsed.turns : ""}` as MoveNotation;
  });
}
