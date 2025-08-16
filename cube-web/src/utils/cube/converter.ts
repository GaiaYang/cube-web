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

/* ---- 核心工具函式 ---- */

/**
 * 計算正數餘數
 * @param a 被除數
 * @param b 除數
 * @returns 正數餘數
 */
function modulo(a: number, b: number): number {
  return b === 0 ? 0 : ((a % b) + b) % b;
}

/**
 * 標準化旋轉次數到 0~CUBE_FACES-1
 * @param turns 旋轉次數
 * @param isPrime 是否逆時針
 * @returns 標準化後的旋轉次數
 */
function normalizeTurns(turns: number = 0, isPrime: boolean = false): number {
  return isPrime
    ? modulo(CUBE_FACES - turns, CUBE_FACES)
    : modulo(turns, CUBE_FACES);
}

/**
 * 檢查是否為多層旋轉代號
 * @param code 旋轉代號
 * @returns 是否為多層代號
 */
function isMultiLayer(code: unknown): code is MultiLayerCode {
  return MULTI_LAYER_CODES.includes(code as MultiLayerCode);
}

/**
 * 是否為小寫多層代號
 * @param code 旋轉代號
 * @returns 是否為小寫多層代號
 */
function isLowerLayerCode(code: unknown): code is LowerLayerCode {
  return LOWER_LAYER_CODES.includes(code as LowerLayerCode);
}

/**
 * 是否為大寫多層代號
 * @param code 旋轉代號
 * @returns 是否為大寫多層代號
 */
function isUpperLayerCode(code: unknown): code is UpperLayerCode {
  return UPPER_LAYER_CODES.includes(code as UpperLayerCode);
}

/**
 * 將 MoveInput 轉換為 MoveObject
 * @param input 輸入物件
 * @returns 標準化後的 MoveObject 或 null
 */
export function convertToMoveObject(
  input?: MoveInput | null,
): MoveObject | null {
  if (!input?.code || !BASIC_CODES.includes(input.code as BasicCode)) {
    return null;
  }
  if (
    (input.layerCount && input.layerCount < 0) ||
    (input.turns && input.turns < 0)
  ) {
    return null;
  }

  return {
    layerCount: input.layerCount ?? 0,
    code: input.code as BasicCode,
    isPrime: input.isPrime ?? false,
    turns: input.turns ?? 1,
  };
}

/**
 * 生成轉動後綴
 * @param turns 旋轉次數
 * @param isPrime 是否逆時針
 * @returns 後綴字串
 */
function getMoveSuffix(turns: number, isPrime: boolean): string {
  switch (turns) {
    case 2:
      return `2${isPrime ? PRIME_SUFFIX : ""}`;
    case 3:
      return PRIME_SUFFIX;
    default:
      return "";
  }
}

/* ---- 解析與標準化 ---- */

/** 解析轉動代號的正則表達式 */
const MOVE_REGEX = /^(\d*)?([rldufbRLUDFBMSExyz][w]?)(\d*)(')?$/;
/**
 * 解析單步轉動字串
 * @param input 轉動字串
 * @returns 解析後的 MoveObject 或 null
 */
function parseMove(input: string): MoveObject | null {
  if (!input) return null;

  const match = input.match(MOVE_REGEX);
  if (!match) return null;

  const [, layerStr, code, turnsStr, prime] = match;
  const layerCount = layerStr ? Number(layerStr) : 0;
  const turns = turnsStr ? Number(turnsStr) : 1;
  const isPrime = prime === PRIME_SUFFIX;

  if (
    !BASIC_CODES.includes(code as BasicCode) ||
    (layerCount > 0 && !isMultiLayer(code))
  ) {
    return null;
  }

  return { layerCount, code: code as BasicCode, isPrime, turns };
}

/**
 * 檢查是否為合法單步轉動
 * @param input 轉動字串
 * @returns 是否合法
 */
export function isValidMove(input: string): boolean {
  return Boolean(parseMove(input));
}

/**
 * 將公式拆解為單步轉動陣列
 * @param input 公式輸入
 * @returns 單步轉動陣列
 */
export function splitAlgorithmToMoves(input?: AlgorithmInput | null): string[] {
  if (!input) return [];
  const moves = Array.isArray(input) ? input : input.split(SEPARATOR);
  return moves.filter(isValidMove);
}

/**
 * 將單步轉動陣列合併為公式字串
 * @param input 單步轉動陣列
 * @returns 公式字串
 */
export function mergeMovesToAlgorithm(input?: Move[]): string {
  if (!Array.isArray(input)) return "";
  return input.filter(isValidMove).join(SEPARATOR);
}

/**
 * 格式化單步轉動字串
 * @param input 轉動輸入
 * @returns 格式化後的轉動字串或 null
 */
export function formatMoveString(input: MoveInput): Move | null {
  const normalized = convertToMoveObject(input);
  if (!normalized) return null;

  const { layerCount, code, turns, isPrime } = normalized;
  const finalTurns = normalizeTurns(turns, isPrime);
  if (finalTurns === 0) return null;

  return `${layerCount || ""}${code}${getMoveSuffix(finalTurns, isPrime)}` as Move;
}

/**
 * 標準化單步轉動字串
 * @param input 轉動字串
 * @returns 標準化後的字串或 null
 */
export function standardizeMoveString(input: string): string | null {
  const parsed = parseMove(input);
  return parsed ? formatMoveString(parsed) : null;
}

/**
 * 檢查公式是否合法
 * @param input 公式輸入
 * @returns 是否合法
 */
export function isAlgorithmValid(input?: AlgorithmInput | null): boolean {
  if (!input) return false;
  const moves = Array.isArray(input) ? input : input.split(SEPARATOR);
  return (
    moves.length > 0 && splitAlgorithmToMoves(input).length === moves.length
  );
}

/* ---- 泛用公式轉換器 ---- */

/**
 * 泛用公式轉換器
 * @param input 公式輸入
 * @param transformer 轉換函式
 * @param reverseOrder 是否反轉順序
 * @returns 轉換後的單步轉動陣列
 */
function mapMoves(
  input: AlgorithmInput | null | undefined,
  transformer: (move: MoveObject) => MoveObject | null,
  reverseOrder = false,
): Move[] {
  if (!input) return [];

  const moves = reverseOrder
    ? [...splitAlgorithmToMoves(input)].reverse()
    : splitAlgorithmToMoves(input);
  const result: Move[] = [];

  for (const move of moves) {
    const parsed = parseMove(move);
    if (parsed) {
      const transformed = transformer(parsed);
      if (transformed) {
        const moveStr = formatMoveString(transformed);
        if (moveStr) result.push(moveStr);
      }
    }
  }

  return result;
}

/** 需要反轉方向的軸 */
const REVERSE_AXES: BasicCode[] = ["M", "S"];

/**
 * 調整特定軸的旋轉方向
 * @param code 旋轉代號
 * @param isPrime 是否逆時針
 * @returns 調整後的方向
 */
function adjustPrimeForAxis(code: BasicCode, isPrime: boolean): boolean {
  return REVERSE_AXES.includes(code) ? !isPrime : isPrime;
}

/* ---- 公式操作函式 ---- */

/** 鏡像與旋轉映射表 */
const CODE_MAP: Record<BasicCode, { mirror: BasicCode; rotate: RotationCode }> =
  {
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

/**
 * 反轉公式
 * @param input 公式輸入
 * @returns 反轉後的單步轉動陣列
 */
export function reverseAlgorithm(input: AlgorithmInput): Move[] {
  return mapMoves(input, (m) => ({ ...m, isPrime: !m.isPrime }), true);
}

/**
 * 鏡像公式
 * @param input 公式輸入
 * @returns 鏡像後的單步轉動陣列
 */
export function mirrorAlgorithm(input: AlgorithmInput): Move[] {
  return mapMoves(input, (m) => ({
    ...m,
    code: CODE_MAP[m.code].mirror,
    isPrime: !m.isPrime,
  }));
}

/**
 * 旋轉公式 (y2)
 * @param input 公式輸入
 * @returns 旋轉後的單步轉動陣列
 */
export function rotateAlgorithm(input: AlgorithmInput): Move[] {
  return mapMoves(input, (m) => ({
    ...m,
    code: CODE_MAP[m.code].rotate as BasicCode,
    isPrime: adjustPrimeForAxis(m.code, m.isPrime),
  }));
}

/** 大小寫映射表 */
const CASE_MAP = {
  toUpper: { r: "Rw", l: "Lw", u: "Uw", d: "Dw", f: "Fw", b: "Bw" } as Record<
    LowerLayerCode,
    UpperLayerCode
  >,
  toLower: { Rw: "r", Lw: "l", Uw: "u", Dw: "d", Fw: "f", Bw: "b" } as Record<
    UpperLayerCode,
    LowerLayerCode
  >,
};

/**
 * 將公式中的小寫轉為大寫
 * @param input 公式輸入
 * @returns 轉換後的單步轉動陣列
 */
export function upperAlgorithm(input: AlgorithmInput): Move[] {
  return mapMoves(input, (m) => ({
    ...m,
    code: isLowerLayerCode(m.code) ? CASE_MAP.toUpper[m.code] : m.code,
  }));
}

/**
 * 將公式中的大寫轉為小寫
 * @param input 公式輸入
 * @returns 轉換後的單步轉動陣列
 */
export function lowerAlgorithm(input: AlgorithmInput): Move[] {
  return mapMoves(input, (m) => ({
    ...m,
    code: isUpperLayerCode(m.code) ? CASE_MAP.toLower[m.code] : m.code,
  }));
}
