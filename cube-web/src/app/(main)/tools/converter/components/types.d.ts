/** 轉換的選項 */
export type ConvertOption =
  | "mirror"
  | "reverse"
  | "rotate"
  | "mirrorRotate"
  | "upper"
  | "lower";

/** 被啟用的選項 */
export type EnabledOption = Record<ConvertOption, boolean>;

/** 方塊層數 */
export type CubeLayer = "nnn" | "333";

export interface CommonFormProps {
  /**
   * 方塊類型
   *
   * @default "nnn"
   *  */
  cubeLayer?: CubeLayer;
}

/** 表單形式 */
export type FormType = "stand" | "in-place";

export interface TabProps {
  key: string;
  title: string;
}
