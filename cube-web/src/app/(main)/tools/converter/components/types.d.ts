/** 被啟用的選項 */
export type EnabledOption = Record<
  "mirror" | "reverse" | "rotate" | "mirrorRotate" | "upper" | "lower",
  boolean
>;

export interface CommonFormProps {
  /**
   * 方塊類型
   *
   * @default "nnn"
   *  */
  cubeLayer?: "nnn" | "333";
}

/** 表單形式 */
export type FormType = "stand" | "in-place";

export interface TabProps {
  key: string;
  title: string;
}
