export interface Option<T> {
  id: T;
  value: T;
  label: string;
  disabled?: boolean;
}
