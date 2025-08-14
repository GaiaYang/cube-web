/** 公式輸入 */
export type AlgorithmInput = string | string[];

// 核心處理
/** 分隔符號 */
const separator = " ";

/** 將公式拆解為字串陣列 */
function _splitFromAlgorithm(input?: string | null): string[] {
  if (typeof input === "string") {
    return input.split(separator);
  }

  return [];
}

/** 將公式合併為字串 */
function _mergeToAlgorithm(input: string[]): string {
  return input.join(separator);
}

/** 解析`AlgorithmInput`為統一字串陣列 */
function _parseAlgorithm(input: AlgorithmInput): string[] {
  return typeof input === "string" ? _splitFromAlgorithm(input) : input;
}

// 實際應用處理
/** 反轉公式 */
export function reverseAlgorithm(input: AlgorithmInput): string {
  return "";
}

/** 鏡像公式 */
export function mirrorAlgorithm(input: AlgorithmInput): string {
  const array = _parseAlgorithm(input);

  return "";
}

/** 旋轉公式 */
export function rotateAlgorithm(input: AlgorithmInput): string {
  const array = _parseAlgorithm(input);

  return "";
}

/** 轉換為標準公式 */
export function toStandardAlgorithm(input: AlgorithmInput): string {
  const array = _parseAlgorithm(input);

  return "";
}

/** 轉換為常見公式 */
export function toCommonAlgorithm(input: AlgorithmInput): string {
  const array = _parseAlgorithm(input);

  return "";
}
