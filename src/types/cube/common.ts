/** 公用方塊定義 */
export interface CommonDefinition {
  /** 公式 ID */
  id: string;
  /** 分類 */
  category: string;
  /** 公式名稱 */
  name: string;
  /** 設置公式 */
  setupAlgorithm: string;
  /** 解決公式 */
  algorithms: string[];
}
