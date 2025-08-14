import { isNotNil, isPlainObject } from "es-toolkit";

/** 小寫邊層旋轉代號 */
export type LowerCode = "r" | "l" | "u" | "d" | "f" | "b";
export type LowerPrimeCode = `${LowerCode}'`;

/** 大寫帶 w 的旋轉代號 */
export type UpperCode = "Rw" | "Lw" | "Uw" | "Dw" | "Fw" | "Bw";
export type UpperPrimeCode = `${UpperCode}'`;

/** 中層旋轉代號 */
export type MiddleCode = "M" | "S" | "E";
export type MiddlePrimeCode = `${MiddleCode}'`;

/** 軸旋轉代號 */
export type AxisCode = "x" | "y" | "z";
export type AxisPrimeCode = `${AxisCode}'`;

/** 面旋轉代號 */
export type SideCode = "R" | "L" | "U" | "D" | "F" | "B";
export type SidePrimeCode = `${SideCode}'`;

/** 所有逆時針旋轉代號 */
export type PrimeCode =
  | LowerPrimeCode
  | UpperPrimeCode
  | MiddlePrimeCode
  | AxisPrimeCode
  | SidePrimeCode;

/** 所有基本旋轉代號 */
export type BasicCode =
  | LowerCode
  | UpperCode
  | MiddleCode
  | AxisCode
  | SideCode;

/** 所有旋轉代號（包含逆時針） */
export type RotationCode = BasicCode | PrimeCode;

/** 移動符號（單步操作） */
export type Move =
  | RotationCode
  | `${number | ""}${RotationCode}'`
  | `${number | ""}${RotationCode}${number | ""}'`
  | `${number | ""}${RotationCode}${number | ""}`;

/** 公式輸入 */
export type AlgorithmInput = string | Move[];

/** 解析後的單步轉動物件 */
export interface MoveObject {
  /** 轉動層數 */
  layerCount: number | null;
  /** 主要旋轉符號 */
  code: RotationCode;
  /** 是否逆時針 */
  isPrime: boolean;
  /** 旋轉次數 */
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
export function mergeToAlgorithm(input: Move[]): string {
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
function parseMove(move: string): MoveObject | null {
  const match = move.match(movePattern);
  if (!match) return null;

  const [, layerCount, code, turns, prime] = match;
  return {
    layerCount: Number(layerCount) || null,
    code: code as RotationCode,
    isPrime: prime === primeCode,
    turns: turns ? Number(turns) : 1,
  };
}

/** 是否為合法轉動符號 */
export function isValidMove(move: string): boolean {
  const parsed = parseMove(move);
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
export function createMove(move: MoveObject) {
  if (!isPlainObject(move)) {
    return null;
  }

  const { layerCount, code, turns, isPrime } = move;

  const finalTurns = simplifyTurns(turns, isPrime);

  if (finalTurns === 0) return null;

  let suffix = "";

  if (finalTurns === 2) {
    suffix = "2";
    if (isPrime) {
      suffix += primeCode;
    }
  }
  if (finalTurns === 3) {
    suffix = primeCode;
  }

  return `${layerCount || ""}${code}${suffix}` as Move;
}

/** 標準化轉動 */
export function normalizeMove(move: string): string | null {
  const parsed = parseMove(move);
  if (!parsed || !isValidMove(move)) return null;

  const { layerCount, code, isPrime, turns } = parsed;
  const finalTurns = simplifyTurns(turns, isPrime);

  if (finalTurns === 0) return null;

  return createMove({ layerCount, code, isPrime, turns });
}

// 實際應用處理
/**
 * 反轉公式
 *
 * 轉動步驟順序反轉，這個功能可以讓你將整條轉動步驟以相反的動作倒著做，讓你可以將順著做完的狀態，倒著恢復到還沒轉的原樣。
 * */
export function reverseAlgorithm(input: AlgorithmInput): Move[] {
  return parseAlgorithm(input)
    .reverse()
    .map((move) => {
      const parsed = parseMove(move);
      if (!parsed) return null;

      const { layerCount, code, isPrime, turns } = parsed;
      const currentPrime = !isPrime;

      return createMove({
        layerCount,
        code,
        isPrime: currentPrime,
        turns,
      });
    })
    .filter(isNotNil);
}

/** 鏡像映射表（左右鏡像） */
const mirrorMap: Record<BasicCode, PrimeCode> = {
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
export function mirrorAlgorithm(input: AlgorithmInput): Move[] {
  return parseAlgorithm(input)
    .map((move) => {
      const parsed = parseMove(move);
      if (!parsed) return null;

      const { layerCount, code, isPrime, turns } = parsed;

      // 取得鏡像代號
      let mirroredCode = mirrorMap[code as BasicCode];
      if (!mirroredCode) return null;

      let extraPrime = false;
      if (mirroredCode.endsWith(primeCode)) {
        mirroredCode = mirroredCode.slice(0, -1) as PrimeCode;
        extraPrime = true;
      }

      return createMove({
        layerCount,
        code: mirroredCode,
        isPrime: isPrime !== extraPrime,
        turns,
      });
    })
    .filter(isNotNil);
}

/** 旋轉映射表 */
const rotateMap: Record<BasicCode, BasicCode> = {
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
export function rotateAlgorithm(input: AlgorithmInput): Move[] {
  return parseAlgorithm(input)
    .map((move) => {
      const parsed = parseMove(move);
      if (!parsed) return null;

      const { layerCount, code, isPrime, turns } = parsed;

      return createMove({
        layerCount,
        code: rotateMap[code as BasicCode] ?? code,
        isPrime,
        turns,
      });
    })
    .filter(isNotNil);
}

/** 小寫代號 → 帶 w 的大寫代號映射 */
const lowerToUpperMap: Record<LowerCode, UpperCode> = {
  r: "Rw",
  l: "Lw",
  u: "Uw",
  d: "Dw",
  f: "Fw",
  b: "Bw",
};
/** 轉換為標準公式：小寫代號 → 帶 w 的大寫代號 */
export function upperAlgorithm(input: AlgorithmInput): Move[] {
  return parseAlgorithm(input)
    .map((move) => {
      const parsed = parseMove(move);
      if (!parsed) {
        return move as Move;
      }

      const { layerCount, code, isPrime, turns } = parsed;

      return createMove({
        layerCount,
        code: lowerToUpperMap[code as LowerCode] ?? code,
        isPrime,
        turns,
      });
    })
    .filter(isNotNil);
}

/** 帶 w 的大寫代號 → 小寫代號映射 */
const upperToLowerMap: Record<UpperCode, LowerCode> = {
  Rw: "r",
  Lw: "l",
  Uw: "u",
  Dw: "d",
  Fw: "f",
  Bw: "b",
};

/** 轉換為常見公式：帶 w 的大寫代號 → 小寫代號 */
export function lowerAlgorithm(input: AlgorithmInput): Move[] {
  return parseAlgorithm(input)
    .map((move) => {
      const parsed = parseMove(move);
      if (!parsed) {
        return move as Move;
      }

      const { layerCount, code, isPrime, turns } = parsed;

      return createMove({
        layerCount,
        code: upperToLowerMap[code as UpperCode] ?? code,
        isPrime,
        turns,
      });
    })
    .filter(isNotNil);
}
