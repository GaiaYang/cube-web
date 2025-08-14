/** 轉動代號 */
export type RotationCode =
  | "x"
  | "y"
  | "z"
  | "R"
  | "L"
  | "U"
  | "D"
  | "F"
  | "B"
  | "M"
  | "S"
  | "E"
  | "Rw"
  | "Lw"
  | "Uw"
  | "Dw"
  | "Fw"
  | "Bw"
  | "r"
  | "l"
  | "u"
  | "d"
  | "f"
  | "b";

/** 轉動符號 */
export type MoveNotation =
  | RotationCode
  | `${number | ""}${RotationCode}'`
  | `${number | ""}${RotationCode}${2 | 3}'`
  | `${number | ""}${RotationCode}${2 | 3}`;

/** 公式輸入 */
export type AlgorithmInput = string | MoveNotation[];

// 核心處理
/** 分隔符號 */
const separator = " ";
/** 逆時針符號 */
const prime = "'";

/** 將公式拆解為字串陣列 */
export function splitFromAlgorithm(input?: string | null): string[] {
  if (typeof input === "string") {
    return input.split(separator);
  }

  return [];
}

/** 將公式合併為字串 */
export function mergeToAlgorithm(input: MoveNotation[]): string {
  return input.join(separator);
}

/** 解析`AlgorithmInput`為統一字串陣列 */
export function parseAlgorithm(input: AlgorithmInput): string[] {
  return typeof input === "string" ? splitFromAlgorithm(input) : input;
}

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
  /^(\d*)?(x|y|z|R|L|U|D|F|B|M|S|E|Rw|Lw|Uw|Dw|Fw|Bw|r|l|u|d|f|b)('?)(\d*)$/;

/** 解析轉動符號 */
function parseMove(move: string) {
  const match = move.match(movePattern);
  if (!match) return null;

  const [, layerCount, code, prime, turns] = match;
  return {
    layerCount: layerCount ? Number(layerCount) : null,
    code: code as RotationCode,
    isPrime: prime === "'",
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

/** 標準化轉動 */
export function normalizeMove(move: string): string | null {
  const parsed = parseMove(move);
  if (!parsed || !isValidMove(move)) return null;

  let { layerCount, code, isPrime, turns } = parsed;

  // 逆時針轉換成等價的順時針次數
  if (isPrime) turns = 4 - (turns % 4);

  // 化簡成 0~3 次
  turns = ((turns % 4) + 4) % 4;
  if (turns === 0) return null;

  if (turns === 3) {
    // 三次順時針等於一次逆時針
    return `${layerCount ?? ""}${code}'`;
  }
  return `${layerCount ?? ""}${code}${turns === 2 ? 2 : ""}`;
}

// 實際應用處理
/**
 * 反轉公式
 *
 * 轉動步驟順序反轉，這個功能可以讓你將整條轉動步驟以相反的動作倒著做，讓你可以將順著做完的狀態，倒著恢復到還沒轉的原樣。
 * */
export function reverseAlgorithm(input: AlgorithmInput): MoveNotation[] {
  return [];
}

/** 鏡像映射表（左右鏡像） */
const mirrorMap: Record<RotationCode, string> = {
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
  const array = parseAlgorithm(input);
  const output: MoveNotation[] = [];

  for (const move of array) {
    const parsed = parseMove(move);
    if (!parsed) continue;

    const { layerCount, code, isPrime, turns } = parsed;

    /** 找到鏡像代號（可能帶 '） */
    let mirroredCode = mirrorMap[code];
    /** 額外反轉 */
    let extraPrime = false;

    // 如果鏡像代號本身帶 '，移除它並反轉方向
    if (mirroredCode.endsWith("'")) {
      mirroredCode = mirroredCode.slice(0, -1) as RotationCode;
      extraPrime = true;
    }

    // 計算方向（鏡像後如果 extraPrime = true 則反轉方向）
    let finalTurns = turns;
    if (isPrime !== extraPrime) {
      finalTurns = 4 - (turns % 4);
    }

    // turns 化簡到 0~3
    finalTurns = ((finalTurns % 4) + 4) % 4;
    if (finalTurns === 0) continue;

    // 生成結果
    if (finalTurns === 3) {
      output.push(`${layerCount ?? ""}${mirroredCode}'` as MoveNotation);
    } else {
      output.push(
        `${layerCount ?? ""}${mirroredCode}${finalTurns === 2 ? 2 : ""}` as MoveNotation,
      );
    }
  }

  return output;
}

/**
 * 旋轉公式
 *
 * 轉動步驟前後旋轉，可以將你的輸入的步驟轉換成當你將方塊轉動 y2 後，仍然可以得到一樣結果的步驟。
 * 實際應用：假設有一條順手的公式，存在著鏡像形式的話，你可以考慮將他以左右鏡像的方式轉換後，再進行前後旋轉，則可以得到以同一手做的鏡像公式。
 * */
export function rotateAlgorithm(input: AlgorithmInput): MoveNotation[] {
  const array = parseAlgorithm(input);

  return [];
}

/** 轉換為標準公式 */
export function toStandardAlgorithm(input: AlgorithmInput): MoveNotation[] {
  const array = parseAlgorithm(input);

  return [];
}

/** 轉換為常見公式 */
export function toCommonAlgorithm(input: AlgorithmInput): MoveNotation[] {
  const array = parseAlgorithm(input);

  return [];
}
