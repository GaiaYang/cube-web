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

/** 所有逆時針旋轉代號 */
export type PrimeCode = `${BasicCode}${Prime}`;

/** 所有旋轉代號（含逆時針） */
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

/** 雙層符號（允許前置層數） */
const DOUBLE_LAYER_CODES: BasicCode[] = [
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

/** 所有基本代號 */
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

/** 簡化轉動次數 */
function normalizeTurns(turns: number, isPrime?: boolean) {
  return modulo(isPrime ? CUBE_FACES - turns : turns, CUBE_FACES);
}

/** 建立轉動字串 */
function createMoveString(input: MoveObject): Move | null {
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

/** 解析單步轉動字串 */
export function parseMoveString(input: string): MoveObject | null {
  if (!input) return null;

  let layerCountStr = "";
  let code = "";
  let turnsStr = "";
  let prime = "";

  // 1️⃣ 提取前置數字
  let i = 0;
  while (i < input.length && /\d/.test(input[i])) {
    layerCountStr += input[i++];
  }

  // 2️⃣ 提取代號（優先長代號）
  const sortedCodes = [...BASIC_CODES].sort((a, b) => b.length - a.length);
  const rest = input.slice(i);
  const matchedCode = sortedCodes.find((c) => rest.startsWith(c));
  if (!matchedCode) {
    return null;
  }
  code = matchedCode;
  i += matchedCode.length;

  // 3️⃣ 後置數字與 prime
  if (i < input.length) {
    const remaining = input.slice(i);
    const m = remaining.match(/^(\d*)(\')?$/);
    if (!m) {
      return null;
    }
    turnsStr = m[1];
    prime = m[2] || "";
  }

  const layerCount = layerCountStr ? Number(layerCountStr) : null;
  const turns = turnsStr ? Number(turnsStr) : 1;
  const baseCode = code.replace(PRIME, "") as BasicCode;

  // 4️⃣ 規則檢查
  if (layerCount !== null && !DOUBLE_LAYER_CODES.includes(baseCode)) {
    return null;
  }
  if (!BASIC_CODES.includes(baseCode)) {
    return null;
  }

  return {
    layerCount,
    code: code as RotationCode,
    isPrime: prime === PRIME,
    turns,
  };
}

/** 是否合法單步轉動字串 */
export function isValidMoveString(input: string): boolean {
  return parseMoveString(input) !== null;
}

/** 標準化單步轉動 */
export function normalizeMoveString(input: string): string | null {
  const parsed = parseMoveString(input);
  return parsed ? createMoveString(parsed) : null;
}

/** 語意化反轉 prime */
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

/** 小寫 → 大寫 */
const LOWER_TO_UPPER_MAP: Record<LowerCode, UpperCode> = {
  r: "Rw",
  l: "Lw",
  u: "Uw",
  d: "Dw",
  f: "Fw",
  b: "Bw",
};
export function upperAlgorithm(input: AlgorithmInput): Move[] {
  return mapAlgorithm(input, LOWER_TO_UPPER_MAP);
}

/** 大寫 → 小寫 */
const UPPER_TO_LOWER_MAP: Record<UpperCode, LowerCode> = {
  Rw: "r",
  Lw: "l",
  Uw: "u",
  Dw: "d",
  Fw: "f",
  Bw: "b",
};
export function lowerAlgorithm(input: AlgorithmInput): Move[] {
  return mapAlgorithm(input, UPPER_TO_LOWER_MAP);
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
      return createMoveString({
        ...parsed,
        code: (map[parsed.code as K] ?? parsed.code) as RotationCode,
      });
    })
    .filter(isNotNil);
}

/** 檢查公式是否合法 */
export function isAlgorithmValid(input: AlgorithmInput): boolean {
  return parseAlgorithm(input).every(isValidMoveString);
}
