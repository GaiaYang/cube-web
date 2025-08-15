import { isNotNil } from "es-toolkit";

import modulo from "@/utils/modulo";

/** 逆時針符號 */
export type Prime = "'";
/** 小寫多層符號 */
export type LowerCode = "r" | "l" | "u" | "d" | "f" | "b";
/** 大寫多層符號 */
export type UpperCode = "Rw" | "Lw" | "Uw" | "Dw" | "Fw" | "Bw";
/** 中間層符號 */
export type MiddleCode = "M" | "S" | "E";
/** 轉體符號 */
export type AxisCode = "x" | "y" | "z";
/** 基本符號 */
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
  /** 轉動幾層 */
  layerCount: number | null;
  /** 轉動代號 */
  code: RotationCode;
  /** 是否逆時鐘 */
  isPrime: boolean;
  /** 轉動次數 */
  turns: number;
}

/** 分隔符號 */
const SEPARATOR = " ";
/** 逆時鐘符號 */
const PRIME = "'";
/** 方塊面數 */
const CUBE_FACES = 4;

/** 將公式字串拆解為陣列 */
export function splitFromAlgorithm(input?: string | null): string[] {
  return typeof input === "string" ? input.split(SEPARATOR) : [];
}

/** 將公式合併為字串 */
export function mergeToAlgorithm(input: Move[]): string {
  return input.join(SEPARATOR);
}

/** 解析公式為字串陣列 */
export function parseAlgorithm(input: AlgorithmInput): string[] {
  return typeof input === "string" ? splitFromAlgorithm(input) : input;
}

/** 基本轉動代號陣列 */
const BASIC_CODES: BasicCode[] = [
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
const MOVE_PATTERN = new RegExp(
  `^(\\d*)?(${BASIC_CODES.join("|")})(\\d*)(${PRIME}?){0,1}$`,
);

/** 解析單步轉動字串 */
export function parseMoveString(input: string): MoveObject | null {
  const match = input.match(MOVE_PATTERN);
  if (!match) return null;

  const [, layerCount, code, turns, prime] = match;
  return {
    layerCount: layerCount ? Number(layerCount) : null,
    code: code as RotationCode,
    isPrime: prime === PRIME,
    turns: turns ? Number(turns) : 1,
  };
}

/** 是否合法單步轉動字串 */
export function isValidMoveString(input: string): boolean {
  const parsed = parseMoveString(input);
  if (!parsed) return false;

  const { layerCount, code } = parsed;
  if (layerCount !== null && layerCount < 1) return false;

  return BASIC_CODES.includes(code.replace(PRIME, "") as BasicCode);
}

/** 簡化轉動次數 */
function normalizeTurns(turns: number, isPrime?: boolean) {
  return modulo(isPrime ? CUBE_FACES - turns : turns, CUBE_FACES);
}

/** 建立轉動字串 */
function createMoveString(input: MoveObject) {
  const { layerCount, code, turns, isPrime } = input;
  const finalTurns = normalizeTurns(turns, isPrime);

  let suffix = "";
  switch (finalTurns) {
    case 0:
      return null;
    case 2:
      suffix = "2";
      if (isPrime) suffix += PRIME;
      break;
    case 3:
      suffix = PRIME;
      break;
  }

  return (String(layerCount || "") + code + suffix) as Move;
}

/**
 * 將單步轉動字串標準化
 *
 * @returns 如果轉動字串合法就原樣回傳，否則回傳`null`
 * */
export function normalizeMoveString(input: string): string | null {
  return isValidMoveString(input) ? input : null;
}

/** 語意化反轉 prime 規則 */
function flipPrimeIfNeeded(turns: number, isPrime: boolean) {
  return turns === 2 ? isPrime : !isPrime;
}

/** 泛用公式轉換器 */
function transformAlgorithmSteps(
  input: AlgorithmInput,
  transformer: (move: MoveObject) => MoveObject | null,
  reverseOrder = false,
): Move[] {
  const moves = reverseOrder
    ? [...parseAlgorithm(input)].reverse()
    : parseAlgorithm(input);

  return moves
    .map((m) => {
      const parsed = parseMoveString(m);
      if (!parsed) return null;
      const transformed = transformer(parsed);
      return transformed && createMoveString(transformed);
    })
    .filter(isNotNil);
}

/** 反轉單步轉動 */
function reverseMove(input: MoveObject): MoveObject {
  const { isPrime, turns, ...rest } = input;
  return { ...rest, isPrime: flipPrimeIfNeeded(turns, isPrime), turns };
}

/** 反轉公式 */
export function reverseAlgorithm(input: AlgorithmInput): Move[] {
  return transformAlgorithmSteps(input, reverseMove, true);
}

/** 鏡像映射表 */
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
function mirrorMove(input: MoveObject): MoveObject | null {
  const { code, isPrime, turns, ...rest } = input;
  const baseCode = code.replace(PRIME, "") as BasicCode;
  const mirroredCode = MIRROR_MAP[baseCode];

  if (!mirroredCode) return null;

  return {
    ...rest,
    code: mirroredCode.replace(PRIME, "") as RotationCode,
    isPrime: flipPrimeIfNeeded(turns, isPrime) || mirroredCode.endsWith(PRIME),
    turns,
  };
}

/** 鏡像公式 */
export function mirrorAlgorithm(input: AlgorithmInput): Move[] {
  return transformAlgorithmSteps(input, mirrorMove);
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
      return createMoveString({
        ...rest,
        code: (map[code as K] ?? code) as RotationCode,
      });
    })
    .filter(isNotNil);
}

/** 旋轉映射表 */
const ROTATE_MAP: Record<BasicCode, BasicCode> = {
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

/** 旋轉公式 */
export function rotateAlgorithm(input: AlgorithmInput): Move[] {
  return mapAlgorithm(input, ROTATE_MAP);
}

/** 大寫映射表 */
const LOWER_TO_UPPER_MAP: Record<LowerCode, UpperCode> = {
  r: "Rw",
  l: "Lw",
  u: "Uw",
  d: "Dw",
  f: "Fw",
  b: "Bw",
};

/** 小寫 → 帶 w 大寫 */
export function upperAlgorithm(input: AlgorithmInput): Move[] {
  return mapAlgorithm(input, LOWER_TO_UPPER_MAP);
}

/** 小寫映射表 */
const UPPER_TO_LOWER_MAP: Record<UpperCode, LowerCode> = {
  Rw: "r",
  Lw: "l",
  Uw: "u",
  Dw: "d",
  Fw: "f",
  Bw: "b",
};

/** 帶 w 大寫 → 小寫 */
export function lowerAlgorithm(input: AlgorithmInput): Move[] {
  return mapAlgorithm(input, UPPER_TO_LOWER_MAP);
}

/** 檢查公式輸入是否全部合法 */
export function isAlgorithmValid(input: AlgorithmInput): boolean {
  return parseAlgorithm(input).every(isValidMoveString);
}
