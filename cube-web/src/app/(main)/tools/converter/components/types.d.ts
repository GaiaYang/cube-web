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
  enabledForms?: Partial<EnabledOption>;
}
