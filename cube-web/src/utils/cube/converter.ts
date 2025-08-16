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
export const SORTED_BASIC_CODES = [...BASIC_CODES].sort(
  (a, b) => b.length - a.length,
);

/** 鏡像與旋轉映射表 */
export const CODE_MAP: Record<
  BasicCode,
  { mirror: BasicCode; rotate: RotationCode }
> = {
  x: { mirror: "x", rotate: "x" },
  y: { mirror: "y", rotate: "y" },
  z: { mirror: "z", rotate: "z" },
  R: { mirror: "L", rotate: "L" },
  L: { mirror: "R", rotate: "R" },
  U: { mirror: "U", rotate: "U" },
  D: { mirror: "D", rotate: "D" },
  F: { mirror: "F", rotate: "B" },
  B: { mirror: "B", rotate: "F" },
  M: { mirror: "M", rotate: "M" },
  S: { mirror: "S", rotate: "S" },
  E: { mirror: "E", rotate: "E" },
  Rw: { mirror: "Lw", rotate: "Lw" },
  Lw: { mirror: "Rw", rotate: "Rw" },
  Uw: { mirror: "Uw", rotate: "Uw" },
  Dw: { mirror: "Dw", rotate: "Dw" },
  Fw: { mirror: "Fw", rotate: "Bw" },
  Bw: { mirror: "Bw", rotate: "Fw" },
  r: { mirror: "l", rotate: "l" },
  l: { mirror: "r", rotate: "r" },
  u: { mirror: "u", rotate: "u" },
  d: { mirror: "d", rotate: "d" },
  f: { mirror: "f", rotate: "b" },
  b: { mirror: "b", rotate: "f" },
};

/** 大小寫映射表 */
export const CASE_MAP = {
  toUpper: { r: "Rw", l: "Lw", u: "Uw", d: "Dw", f: "Fw", b: "Bw" } as Record<
    LowerLayerCode,
    UpperLayerCode
  >,
  toLower: { Rw: "r", Lw: "l", Uw: "u", Dw: "d", Fw: "f", Bw: "b" } as Record<
    UpperLayerCode,
    LowerLayerCode
  >,
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

/** 是否為小寫多層代號 */
function isLowerLayerCode(code: BasicCode): code is LowerLayerCode {
  return LOWER_LAYER_CODES.includes(code as LowerLayerCode);
}

/** 是否為大寫多層代號 */
function isUpperLayerCode(code: BasicCode): code is UpperLayerCode {
  return UPPER_LAYER_CODES.includes(code as UpperLayerCode);
}

/** 正規化 MoveInput 預設值 */
function convertToMoveObject(input?: MoveInput | null): MoveObject | null {
  if (!input) return null;

  const { layerCount, code, isPrime, turns } = input;

  if (!code || !BASIC_CODES.includes(code as BasicCode)) return null;

  // 轉動層數不得負數
  if (
    (typeof layerCount === "number" && layerCount < 0) ||
    (typeof turns === "number" && turns < 0)
  ) {
    return null;
  }

  return {
    layerCount: layerCount ?? 0,
    code: code as BasicCode,
    isPrime: isPrime ?? false,
    turns: turns ?? 1,
  };
}

/** 根據旋轉次數與逆時針生成後綴 */
function getMoveSuffix(turns: number, isPrime: boolean): string {
  if (turns === 2) return `2${isPrime ? PRIME_SUFFIX : ""}`;
  if (turns === 3) return PRIME_SUFFIX;
  return "";
}

/* ---- 解析與標準化 ---- */

/** 解析單步轉動字串 */
function parseMove(input: string): MoveObject | null {
  if (!input || typeof input !== "string") return null;

  // 1️⃣ 前置層數
  const layerMatch = input.match(/^(\d*)/);
  const layerCount = layerMatch && layerMatch[1] ? Number(layerMatch[1]) : 0;
  const restAfterLayer = input.slice(layerMatch ? layerMatch[0].length : 0);

  // 2️⃣ 匹配旋轉代號（長度優先）
  const matchedCode = SORTED_BASIC_CODES.find((code) =>
    restAfterLayer.startsWith(code),
  );
  if (!matchedCode) return null;

  const restAfterCode = restAfterLayer.slice(matchedCode.length);

  // 3️⃣ 後置次數與逆時針符號
  const tailMatch = restAfterCode.match(/^(\d*)(\')?$/);
  if (!tailMatch) return null;

  const turns = tailMatch[1] ? Number(tailMatch[1]) : 1;
  const isPrime = tailMatch[2] === PRIME_SUFFIX;

  const baseCode = matchedCode as BasicCode;

  // 4️⃣ 驗證多層規則
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
  return moves.filter(isValidMove);
}

/** 將 Move 陣列合併成公式字串 */
export function mergeMovesToAlgorithm(input?: Move[]): string {
  if (!Array.isArray(input)) return "";
  return input.filter(isValidMove).join(SEPARATOR);
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
export function isAlgorithmValid(input?: AlgorithmInput | null): boolean {
  if (!input) return false;
  const movesArray = Array.isArray(input) ? input : input.split(SEPARATOR);
  if (movesArray.length === 0) return false;
  const parsedMoves = splitAlgorithmToMoves(input);
  return (
    parsedMoves.length === movesArray.length && parsedMoves.every(isValidMove)
  );
}

/* ---- 泛用公式轉換器 ---- */

/** 泛用公式轉換器(功能核心) */
function mapMoves(
  input: AlgorithmInput,
  transformer: (move: MoveObject) => MoveObject | null,
  reverseOrder = false,
): Move[] {
  const moves = reverseOrder
    ? [...splitAlgorithmToMoves(input)].reverse()
    : splitAlgorithmToMoves(input);
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
const REVERSE_AXES = new Set<BasicCode>(["M", "S"]);
function adjustPrimeForAxis(code: BasicCode, isPrime: boolean): boolean {
  return REVERSE_AXES.has(code) ? !isPrime : isPrime;
}

/* ---- 公式操作函式 ---- */

/** 反轉公式 */
export function reverseAlgorithm(input: AlgorithmInput): Move[] {
  return mapMoves(input, (m) => ({ ...m, isPrime: !m.isPrime }), true);
}

/** 鏡像公式 */
export function mirrorAlgorithm(input: AlgorithmInput): Move[] {
  return mapMoves(input, (m) => ({
    ...m,
    code: CODE_MAP[m.code].mirror,
    isPrime: !m.isPrime,
  }));
}

/** 旋轉公式 (y2) */
export function rotateAlgorithm(input: AlgorithmInput): Move[] {
  return mapMoves(input, (m) => ({
    ...m,
    code: CODE_MAP[m.code].rotate as BasicCode,
    isPrime: adjustPrimeForAxis(m.code, m.isPrime),
  }));
}

/** 小寫轉大寫公式 */
export function upperAlgorithm(input: AlgorithmInput): Move[] {
  return mapMoves(input, (m) => ({
    ...m,
    code: isLowerLayerCode(m.code) ? CASE_MAP.toUpper[m.code] : m.code,
  }));
}

/** 大寫轉小寫公式 */
export function lowerAlgorithm(input: AlgorithmInput): Move[] {
  return mapMoves(input, (m) => ({
    ...m,
    code: isUpperLayerCode(m.code) ? CASE_MAP.toLower[m.code] : m.code,
  }));
}
