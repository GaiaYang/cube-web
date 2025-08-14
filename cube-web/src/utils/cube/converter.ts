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

/** 判斷後綴 */
function creatMoveSuffix(turns: number) {
  if (turns === 2) return "2";
  if (turns === 3) return "'";
  return "";
}

/** 化簡成 0~3 次，保證非負 */
function simplifyTurns(value: number, isPrime?: boolean) {
  let newValue = value;
  // 逆時針轉換成等價的順時針次數
  if (isPrime) {
    newValue = 4 - value;
  }

  return ((newValue % 4) + 4) % 4;
}

/** 標準化轉動 */
export function normalizeMove(move: string): string | null {
  const parsed = parseMove(move);
  if (!parsed || !isValidMove(move)) return null;

  const { layerCount, code, isPrime, turns } = parsed;
  const finalTurns = simplifyTurns(turns, isPrime);

  if (finalTurns === 0) return null;

  return `${layerCount ?? ""}${code}${creatMoveSuffix(finalTurns)}`;
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

    let { layerCount, code, isPrime, turns } = parsed;

    // 取得鏡像代號，並判斷是否自帶 '
    let mirroredCode = mirrorMap[code];
    let extraPrime = false;

    if (mirroredCode.endsWith("'")) {
      mirroredCode = mirroredCode.slice(0, -1) as RotationCode;
      extraPrime = true;
    }

    // 計算鏡像後方向
    // 如果原本方向與鏡像代號方向不同，則反轉
    const finalTurns = simplifyTurns(turns, isPrime !== extraPrime);

    output.push(
      `${layerCount ?? ""}${mirroredCode}${creatMoveSuffix(finalTurns)}` as MoveNotation,
    );
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
