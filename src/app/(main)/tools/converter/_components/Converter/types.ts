/** 可用的轉換類型 */
export type ConversionType =
  "mirror" | "reverse" | "rotate" | "mirrorRotate" | "upper" | "lower";

/** 啟用狀態（每種轉換類型是否啟用） */
export type ConversionFlags = Record<ConversionType, boolean>;

/** 魔方階數 */
export type CubeOrder = "nnn" | "333";

/** 表單顯示形式 */
export type FormMode = "stand" | "in-place";

export interface TabItem<T = string> {
  id: T;
  label: string;
}

/** 轉換設定檔 */
export interface ConversionProfile {
  id: ConversionType;
  title: string;
  subtitle: string;
  description: string;
}

export type CommonConversion = Extract<
  ConversionType,
  "mirror" | "reverse" | "rotate" | "mirrorRotate"
>;

/** 字串 in → 字串 out 的轉換函式表 */
export type Convert = Record<CommonConversion, (algorithm: string) => string> &
  Partial<
    Record<
      Exclude<ConversionType, CommonConversion>,
      (algorithm: string) => string
    >
  >;
