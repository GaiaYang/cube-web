/** 轉動代號 */
export type RotationCode =
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
  | `${RotationCode}'`
  | `${RotationCode}${2 | 3}'`
  | `${RotationCode}${2 | 3}`;

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

// 實際應用處理
/**
 * 反轉公式
 *
 * 轉動步驟順序反轉，這個功能可以讓你將整條轉動步驟以相反的動作倒著做，讓你可以將順著做完的狀態，倒著恢復到還沒轉的原樣。
 * */
export function reverseAlgorithm(input: AlgorithmInput): string {
  return "";
}

/**
 * 鏡像公式
 *
 * 轉動步驟左右鏡像，可以幫助你將在右手做的公式直接鏡射到左手的位置，讓同一條公式透過左右手的差異來解決鏡像的兩種狀態。
 * */
export function mirrorAlgorithm(input: AlgorithmInput): string {
  const array = parseAlgorithm(input);
  const output: string[] = [];

  for (const element of array) {
  }

  return output.join(separator);
}

/**
 * 旋轉公式
 *
 * 轉動步驟前後旋轉，可以將你的輸入的步驟轉換成當你將方塊轉動 y2 後，仍然可以得到一樣結果的步驟。
 * 實際應用：假設有一條順手的公式，存在著鏡像形式的話，你可以考慮將他以左右鏡像的方式轉換後，再進行前後旋轉，則可以得到以同一手做的鏡像公式。
 * */
export function rotateAlgorithm(input: AlgorithmInput): string {
  const array = parseAlgorithm(input);

  return "";
}

/** 轉換為標準公式 */
export function toStandardAlgorithm(input: AlgorithmInput): string {
  const array = parseAlgorithm(input);

  return "";
}

/** 轉換為常見公式 */
export function toCommonAlgorithm(input: AlgorithmInput): string {
  const array = parseAlgorithm(input);

  return "";
}
