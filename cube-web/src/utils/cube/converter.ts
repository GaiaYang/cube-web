import { isNotNil } from "es-toolkit";

import modulo from "@/utils/modulo";

/** 逆時針符號 */
export type Prime = "'";
export type LowerCode = "r" | "l" | "u" | "d" | "f" | "b";
export type UpperCode = "Rw" | "Lw" | "Uw" | "Dw" | "Fw" | "Bw";
export type MiddleCode = "M" | "S" | "E";
export type AxisCode = "x" | "y" | "z";
export type SideCode = "R" | "L" | "U" | "D" | "F" | "B";

/** 所有基本旋轉代號 */
export type BasicCode =
  | LowerCode
  | UpperCode
  | MiddleCode
  | AxisCode
  | SideCode;

/** 所有逆時針旋轉代號（BasicCode + Prime） */
export type PrimeCode = `${BasicCode}${Prime}`;

/** 所有旋轉代號（含逆時針） */
export type RotationCode = BasicCode | PrimeCode;

/** 移動符號（單步操作） */
export type Move =
  | RotationCode
  | `${number | ""}${PrimeCode}` // 數字 + 逆時針
  | `${number | ""}${BasicCode}${number | ""}${Prime}` // 數字 + 正向 + 次數 + 逆時針
  | `${number | ""}${BasicCode}${number | ""}`; // 數字 + 正向 + 次數

/** 公式輸入 */
export type AlgorithmInput = string | Move[];

/** 解析後的單步轉動物件 */
export interface MoveObject {
  layerCount: number | null;
  code: RotationCode;
  isPrime: boolean;
  turns: number;
}

// 核心處理
const separator = " ";
const primeSymbol = "'";

/** 將公式拆解為字串陣列 */
export function splitFromAlgorithm(input?: string | null): string[] {
  return typeof input === "string" ? input.split(separator) : [];
}

/** 將公式合併為字串 */
export function mergeToAlgorithm(input: Move[]): string {
  return input.join(separator);
}

/** 解析 AlgorithmInput 為字串陣列 */
export function parseAlgorithm(input: AlgorithmInput): string[] {
  return typeof input === "string" ? splitFromAlgorithm(input) : input;
}

/** 基本旋轉代號 */
const allBasicCodes: BasicCode[] = [
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

/** Regex 拆解: (前數字)? 代號 (')? (次數)? */
const movePattern = new RegExp(
  `^(\\d*)?(${allBasicCodes.join("|")})(\\d*)(${primeSymbol}?){0,1}$`,
);

/** 解析單步轉動字串 */
export function parseMoveString(move: string): MoveObject | null {
  const match = move.match(movePattern);

  if (!match) {
    return null;
  }

  const [, layerCount, code, turns, prime] = match;
  return {
    layerCount: layerCount ? Number(layerCount) : null,
    code: code as RotationCode,
    isPrime: prime === primeSymbol,
    turns: turns ? Number(turns) : 1,
  };
}

/** 是否合法單步轉動字串 */
export function isValidMoveString(move: string): boolean {
  const parsed = parseMoveString(move);

  if (!parsed) {
    return false;
  }

  const { layerCount, code } = parsed;

  if (layerCount !== null && layerCount < 1) {
    return false;
  }

  return allBasicCodes.includes(code.replace(primeSymbol, "") as BasicCode);
}

/** 化簡轉動次數成 0~3 */
function normalizeTurns(turns: number, isPrime?: boolean) {
  const cubeFaces = 4;
  return modulo(isPrime ? cubeFaces - turns : turns, cubeFaces);
}

/** 建立轉動字串 */
function serializeMove(move: MoveObject) {
  const { layerCount, code, turns, isPrime } = move;
  const finalTurns = normalizeTurns(turns, isPrime);

  let suffix = "";
  switch (finalTurns) {
    case 0:
      return null;
    case 2:
      suffix = "2";
      if (isPrime) suffix += primeSymbol;
      break;
    case 3:
      suffix = primeSymbol;
      break;
  }

  return `${layerCount || ""}${code}${suffix}` as Move;
}

/** 標準化轉動字串 */
export function standardizeMove(move: string): string | null {
  const parsed = parseMoveString(move);
  return parsed && isValidMoveString(move) ? serializeMove(parsed) : null;
}

/**
 * 反轉公式
 *
 * 轉動步驟順序反轉，這個功能可以讓你將整條轉動步驟以相反的動作倒著做，讓你可以將順著做完的狀態，倒著恢復到還沒轉的原樣。
 * */
export function reverseAlgorithm(input: AlgorithmInput): Move[] {
  return parseAlgorithm(input)
    .reverse()
    .map((move) => {
      const parsed = parseMoveString(move);

      if (!parsed) {
        return null;
      }

      const { isPrime, ...rest } = parsed;

      return serializeMove({ ...rest, isPrime: !isPrime });
    })
    .filter(isNotNil);
}

/** 鏡像映射表（左右鏡像） */
const MIRROR_MAP: Record<BasicCode, BasicCode> = {
  x: "x",
  y: "y",
  z: "z",
  R: "L",
  L: "R",
  U: "U",
  D: "D",
  F: "F",
  B: "B",
  M: "M",
  S: "S",
  E: "E",
  Rw: "Lw",
  Lw: "Rw",
  Uw: "Uw",
  Dw: "Dw",
  Fw: "Fw",
  Bw: "Bw",
  r: "l",
  l: "r",
  u: "u",
  d: "d",
  f: "f",
  b: "b",
};

/** 鏡像單步轉動 */
function mirrorMove(move: MoveObject): MoveObject | null {
  const { code, isPrime, ...rest } = move;
  const baseCode = code.replace(primeSymbol, "") as BasicCode;
  const mirroredCode = MIRROR_MAP[baseCode];

  if (!mirroredCode) {
    return null;
  }

  return {
    ...rest,
    code: mirroredCode.replace(primeSymbol, "") as RotationCode,
    isPrime: !isPrime || mirroredCode.endsWith(primeSymbol),
  };
}

/**
 * 鏡像公式
 *
 * 轉動步驟左右鏡像，可以幫助你將在右手做的公式直接鏡射到左手的位置，讓同一條公式透過左右手的差異來解決鏡像的兩種狀態。
 * */
export function mirrorAlgorithm(input: AlgorithmInput): Move[] {
  return parseAlgorithm(input)
    .map(parseMoveString)
    .map((m) => m && mirrorMove(m))
    .map((m) => m && serializeMove(m))
    .filter(isNotNil);
}

/** 通用公式映射 */
function mapAlgorithm<K extends string, V extends string>(
  input: AlgorithmInput,
  map: Record<K, V>,
): Move[] {
  return parseAlgorithm(input)
    .map((move) => {
      const parsed = parseMoveString(move);

      if (!parsed) {
        return move as Move;
      }

      const { code, ...rest } = parsed;

      return serializeMove({
        ...rest,
        code: (map[code as K] ?? code) as RotationCode,
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
 * */
export function rotateAlgorithm(input: AlgorithmInput): Move[] {
  return mapAlgorithm(input, rotateMap);
}

/** 小寫映射到大寫 */
const lowerToUpperMap: Record<LowerCode, UpperCode> = {
  r: "Rw",
  l: "Lw",
  u: "Uw",
  d: "Dw",
  f: "Fw",
  b: "Bw",
};

/** 小寫 → 帶 w 大寫 */
export function upperAlgorithm(input: AlgorithmInput): Move[] {
  return mapAlgorithm(input, lowerToUpperMap);
}

/** 大寫映射到小寫 */
const upperToLowerMap: Record<UpperCode, LowerCode> = {
  Rw: "r",
  Lw: "l",
  Uw: "u",
  Dw: "d",
  Fw: "f",
  Bw: "b",
};

/** 帶 w 大寫 → 小寫 */
export function lowerAlgorithm(input: AlgorithmInput): Move[] {
  return mapAlgorithm(input, upperToLowerMap);
}

/** 檢查公式輸入是否全部合法 */
export function isAlgorithmValid(input: AlgorithmInput): boolean {
  return parseAlgorithm(input).every(isValidMoveString);
}
