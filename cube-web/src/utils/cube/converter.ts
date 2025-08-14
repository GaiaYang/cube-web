import { isNotNil } from "es-toolkit";
import modulo from "@/utils/modulo";

/** 逆時針符號 */
export type Prime = "'";

/** 小寫邊層旋轉代號 */
export type LowerCode = "r" | "l" | "u" | "d" | "f" | "b";
export type LowerPrimeCode = `${LowerCode}${Prime}`;

/** 大寫帶 w 的旋轉代號 */
export type UpperCode = "Rw" | "Lw" | "Uw" | "Dw" | "Fw" | "Bw";
export type UpperPrimeCode = `${UpperCode}${Prime}`;

/** 中層旋轉代號 */
export type MiddleCode = "M" | "S" | "E";
export type MiddlePrimeCode = `${MiddleCode}${Prime}`;

/** 軸旋轉代號 */
export type AxisCode = "x" | "y" | "z";
export type AxisPrimeCode = `${AxisCode}${Prime}`;

/** 面旋轉代號 */
export type SideCode = "R" | "L" | "U" | "D" | "F" | "B";
export type SidePrimeCode = `${SideCode}${Prime}`;

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
  | `${number | ""}${PrimeCode}`
  | `${number | ""}${BasicCode}${number | ""}${Prime}`
  | `${number | ""}${BasicCode}${number | ""}`;

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
  if (!match) return null;
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
  if (!parsed) return false;
  const { layerCount, code } = parsed;
  if (layerCount !== null && layerCount < 1) return false;
  const basicCode = code.replace(primeSymbol, "") as BasicCode;
  return allBasicCodes.includes(basicCode);
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

/** 反轉公式 */
export function reverseAlgorithm(input: AlgorithmInput): Move[] {
  return parseAlgorithm(input)
    .reverse()
    .map((move) => {
      const parsed = parseMoveString(move);
      if (!parsed) return null;
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
  if (!mirroredCode) return null;
  // 鏡像後一般加上 prime
  const mirroredIsPrime = !isPrime || mirroredCode.endsWith(primeSymbol);
  const finalCode = mirroredCode.replace(primeSymbol, "") as RotationCode;
  return {
    ...rest,
    code: finalCode,
    isPrime: mirroredIsPrime,
    turns: move.turns,
  };
}

/** 鏡像公式 */
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
      if (!parsed) return move as Move;
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
export function rotateAlgorithm(input: AlgorithmInput): Move[] {
  return mapAlgorithm(input, rotateMap);
}

/** 小寫 → 帶 w 大寫 */
const lowerToUpperMap: Record<LowerCode, UpperCode> = {
  r: "Rw",
  l: "Lw",
  u: "Uw",
  d: "Dw",
  f: "Fw",
  b: "Bw",
};
export function upperAlgorithm(input: AlgorithmInput): Move[] {
  return mapAlgorithm(input, lowerToUpperMap);
}

/** 帶 w 大寫 → 小寫 */
const upperToLowerMap: Record<UpperCode, LowerCode> = {
  Rw: "r",
  Lw: "l",
  Uw: "u",
  Dw: "d",
  Fw: "f",
  Bw: "b",
};
export function lowerAlgorithm(input: AlgorithmInput): Move[] {
  return mapAlgorithm(input, upperToLowerMap);
}
