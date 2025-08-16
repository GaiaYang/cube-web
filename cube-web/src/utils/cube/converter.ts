import { isNotNil } from "es-toolkit";

/* ---- 型別定義 ---- */

/** 逆時針符號 */
export type PrimeSuffix = "'";
/** 小寫多層代號 */
export type LowerLayerCode = "r" | "l" | "u" | "d" | "f" | "b";
/** 大寫多層代號 */
export type UpperLayerCode = "Rw" | "Lw" | "Uw" | "Dw" | "Fw" | "Bw";
/** 中間層代號 */
export type MiddleLayerCode = "M" | "S" | "E";
/** 轉體代號 */
export type AxisCode = "x" | "y" | "z";
/** 單層代號 */
export type SingleLayerCode = "R" | "L" | "U" | "D" | "F" | "B";

/** 所有基本旋轉代號 */
export type BasicCode =
  | LowerLayerCode
  | UpperLayerCode
  | MiddleLayerCode
  | AxisCode
  | SingleLayerCode;

/** 所有逆時針旋轉代號 */
export type PrimeCode = `${BasicCode}${PrimeSuffix}`;

/** 多層旋轉代號（可前置層數） */
export type MultiLayerCode = LowerLayerCode | UpperLayerCode;

/** 所有旋轉代號（含逆時針） */
export type RotationCode = BasicCode | PrimeCode;

/** 移動代號（單步操作） */
export type Move =
  | `${BasicCode}${number | ""}${PrimeSuffix | ""}`
  | `${number | ""}${MultiLayerCode}${number | ""}${PrimeSuffix | ""}`;

/** 公式輸入 */
export type AlgorithmInput = string | Move[];

/** 解析後的單步轉動物件 */
export interface MoveObject {
  /** 轉動幾層 */
  layerCount: number;
  /** 轉動代號 */
  code: BasicCode;
  /** 是否逆時針 */
  isPrime: boolean;
  /** 轉動次數 */
  turns: number;
}

/** 解析後的單步轉動物件輸入 */
export interface MoveInput {
  /** 轉動幾層 */
  layerCount?: number | null;
  /** 轉動代號 */
  code?: string | null | "";
  /** 是否逆時針 */
  isPrime?: boolean | null;
  /** 轉動次數 */
  turns?: number | null;
}

/* ---- 常數定義 ---- */

/** 分隔符號 */
export const SEPARATOR = " ";
/** 逆時針符號 */
export const PRIME_SUFFIX = "'";
/** 方塊面數 */
export const CUBE_FACES = 4;

/** 小寫多層代號 */
export const LOWER_LAYER_CODES: LowerLayerCode[] = [
  "r",
  "l",
  "u",
  "d",
  "f",
  "b",
];
/** 大寫多層代號 */
export const UPPER_LAYER_CODES: UpperLayerCode[] = [
  "Rw",
  "Lw",
  "Uw",
  "Dw",
  "Fw",
  "Bw",
];
/** 中間層代號 */
export const MIDDLE_LAYER_CODES: MiddleLayerCode[] = ["M", "S", "E"];
/** 轉體代號 */
export const AXIS_CODES: AxisCode[] = ["x", "y", "z"];
/** 單層代號 */
export const SINGLE_LAYER_CODES: SingleLayerCode[] = [
  "R",
  "L",
  "U",
  "D",
  "F",
  "B",
];

/** 所有多層旋轉代號（前置層數適用） */
export const MULTI_LAYER_CODES: MultiLayerCode[] = [
  ...LOWER_LAYER_CODES,
  ...UPPER_LAYER_CODES,
];
/** 所有基本旋轉代號 */
export const BASIC_CODES: BasicCode[] = [
  ...LOWER_LAYER_CODES,
  ...UPPER_LAYER_CODES,
  ...MIDDLE_LAYER_CODES,
  ...AXIS_CODES,
  ...SINGLE_LAYER_CODES,
];

/** 預先排序的代號陣列（長度降序，優先匹配長代號） */
const SORTED_BASIC_CODES = [...BASIC_CODES].sort((a, b) => b.length - a.length);

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

/** 旋轉映射表 */
const ROTATE_MAP: Record<BasicCode, RotationCode> = {
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

/** 小寫映射大寫 */
const LOWER_TO_UPPER_MAP: Record<LowerLayerCode, UpperLayerCode> = {
  r: "Rw",
  l: "Lw",
  u: "Uw",
  d: "Dw",
  f: "Fw",
  b: "Bw",
};
/** 大寫映射小寫 */
const UPPER_TO_LOWER_MAP: Record<UpperLayerCode, LowerLayerCode> = {
  Rw: "r",
  Lw: "l",
  Uw: "u",
  Dw: "d",
  Fw: "f",
  Bw: "b",
};

/* ---- 核心工具函式 ---- */

/** 取餘數，確保正數 */
function modulo(a: number, b: number): number {
  if (b === 0) return 0;
  const r = a % b;
  return r < 0 ? r + b : r;
}

/** 將旋轉次數標準化到 `0`~`CUBE_FACES-1` */
function normalizeTurns(turns: number = 0, isPrime: boolean = false): number {
  return isPrime
    ? modulo(CUBE_FACES - turns, CUBE_FACES)
    : modulo(turns, CUBE_FACES);
}

/** 檢查 BasicCode 是否為多層旋轉代號 */
function isMultiLayer(code: BasicCode): code is MultiLayerCode {
  return MULTI_LAYER_CODES.includes(code as MultiLayerCode);
}

/** 正規化 MoveInput 預設值 */
export function convertToMoveObject(input: MoveInput): MoveObject | null {
  const code = input.code;
  if (!code || !BASIC_CODES.includes(code as BasicCode)) return null;
  return {
    layerCount: input.layerCount ?? 0,
    code: code as BasicCode,
    isPrime: input.isPrime ?? false,
    turns: input.turns ?? 1,
  };
}

/** 根據旋轉次數與逆時針生成後綴 */
function getMoveSuffix(turns: number, isPrime: boolean): string {
  if (turns === 2) return isPrime ? "2'" : "2";
  if (turns === 3) return "'";
  return "";
}

/* ---- 解析與標準化 ---- */

/** 解析單步轉動字串 */
export function parseMove(input: string): MoveObject | null {
  if (!input || typeof input !== "string") return null;

  let i = 0,
    layerCountStr = "";
  while (i < input.length && /\d/.test(input[i])) layerCountStr += input[i++];

  const rest = input.slice(i);
  const matchedCode = SORTED_BASIC_CODES.find((c) => rest.startsWith(c));
  if (!matchedCode) return null;
  i += matchedCode.length;

  const remaining = input.slice(i);
  const m = remaining.match(/^(\d*)(\')?$/);
  if (!m) return null;

  const layerCount = layerCountStr ? Number(layerCountStr) : 0;
  const turns = m[1] ? Number(m[1]) : 1;
  const isPrime = m[2] === PRIME_SUFFIX;
  const baseCode = matchedCode as BasicCode;

  if (layerCount > 0 && !isMultiLayer(baseCode)) return null;
  if (!BASIC_CODES.includes(baseCode)) return null;

  return { layerCount, code: baseCode, isPrime, turns };
}

/** 是否合法單步轉動字串 */
export function isValidMove(input: string): boolean {
  return parseMove(input) !== null;
}

/** 將公式字串或 Move 陣列拆解成單步字串陣列 */
export function splitAlgorithmToMoves(
  input?: string | Move[] | null,
): string[] {
  if (!input) return [];
  const moves = Array.isArray(input) ? input : input.split(SEPARATOR);
  const result: string[] = [];
  for (const move of moves) if (isValidMove(move)) result.push(move);
  return result;
}

/** 將 Move 陣列合併成公式字串 */
export function mergeMovesToAlgorithm(input?: Move[]): string {
  if (!Array.isArray(input)) return "";
  const result: string[] = [];
  for (const move of input) if (isValidMove(move)) result.push(move);
  return result.join(SEPARATOR);
}

/** 建立轉動字串 */
export function formatMoveString(input: MoveInput): Move | null {
  const normalized = convertToMoveObject(input);
  if (!normalized) return null;

  const { layerCount, code, turns, isPrime } = normalized;
  const finalTurns = normalizeTurns(turns, isPrime);
  if (finalTurns === 0) return null;

  return `${layerCount || ""}${code}${getMoveSuffix(finalTurns, isPrime)}` as Move;
}

/** 標準化單步轉動字串 */
export function standardizeMoveString(input: string): string | null {
  const parsed = parseMove(input);
  if (!parsed) return null;
  return formatMoveString(parsed);
}

/** 檢查公式是否合法 */
export function isAlgorithmValid(input: AlgorithmInput): boolean {
  if (!input) return false;
  const movesArray = Array.isArray(input) ? input : input.split(SEPARATOR);
  if (movesArray.length === 0) return false;
  const parsedMoves = splitAlgorithmToMoves(input);
  // 如果過濾掉非法 move，長度不一致就代表有非法 move
  if (parsedMoves.length !== movesArray.length) return false;
  return parsedMoves.every(isValidMove);
}

/* ---- 泛用公式轉換器 ---- */

/** 泛用公式轉換器 */
function mapMoves(
  input: AlgorithmInput,
  transformer: (move: MoveObject) => MoveObject | null,
  reverseOrder = false,
): Move[] {
  let moves = splitAlgorithmToMoves(input);
  if (reverseOrder) moves = [...moves].reverse();
  const result: Move[] = [];
  for (const move of moves) {
    const parsed = parseMove(move);
    if (!parsed) continue;
    const transformed = transformer(parsed);
    if (!transformed) continue;
    const moveStr = formatMoveString(transformed);
    if (moveStr) result.push(moveStr);
  }
  return result;
}

/** 調整 M / S 旋轉方向 */
function adjustPrimeForAxis(code: BasicCode, isPrime: boolean): boolean {
  if (code === "M" || code === "S") return !isPrime;
  return isPrime;
}

/* ---- 公式操作函式 ---- */

/** 反轉公式 */
export function reverseAlgorithm(input: AlgorithmInput): Move[] {
  return mapMoves(input, (m) => ({ ...m, isPrime: !m.isPrime }), true);
}

/** 鏡像公式 */
export function mirrorAlgorithm(input: AlgorithmInput): Move[] {
  return mapMoves(input, (m) => {
    const mirrored = MIRROR_MAP[m.code];
    if (!mirrored) return null;
    return { ...m, code: mirrored, isPrime: !m.isPrime };
  });
}

/** 旋轉公式 (y2) */
export function rotateAlgorithm(input: AlgorithmInput): Move[] {
  return mapMoves(input, (m) => {
    const mapped = ROTATE_MAP[m.code] ?? m.code;
    const isPrime = adjustPrimeForAxis(m.code, m.isPrime);
    return { ...m, code: mapped as BasicCode, isPrime };
  });
}

/** 小寫轉大寫公式 */
export function upperAlgorithm(input: AlgorithmInput): Move[] {
  return mapMoves(input, (m) => {
    const mapped = LOWER_TO_UPPER_MAP[m.code as LowerLayerCode] ?? m.code;
    return { ...m, code: mapped };
  });
}

/** 大寫轉小寫公式 */
export function lowerAlgorithm(input: AlgorithmInput): Move[] {
  return mapMoves(input, (m) => {
    const mapped = UPPER_TO_LOWER_MAP[m.code as UpperLayerCode] ?? m.code;
    return { ...m, code: mapped };
  });
}
