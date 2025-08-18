export interface Convert {
  /** 鏡像公式 */
  mirrorAlgorithm: (algorithm: string) => string;
  /** 反轉公式 */
  reverseAlgorithm: (algorithm: string) => string;
  /** 旋轉公式 */
  rotateAlgorithm: (algorithm: string) => string;
  /** 鏡像旋轉公式 */
  mirrorRotateAlgorithm: (algorithm: string) => string;
  /** 雙層轉換成大寫公式 */
  upperAlgorithm?: (algorithm: string) => string;
  /** 雙層轉換成小寫公式 */
  lowerAlgorithm?: (algorithm: string) => string;
}
