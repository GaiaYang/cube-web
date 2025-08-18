export interface Convert {
  /** 鏡像公式 */
  mirrorAlgorithm: (algorithm: string) => string;
  /** 反轉公式 */
  reverseAlgorithm: (algorithm: string) => string;
}
