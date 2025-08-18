export type EnabledOption = Record<
  | "mirrorForm"
  | "reverseForm"
  | "rotateForm"
  | "mirrorRotateForm"
  | "upperForm"
  | "lowerForm",
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

export type FormType = "stand" | "in-place";

export interface TabProps {
  key: string;
  title: string;
}
