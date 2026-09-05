import { cn } from "cn";

export interface InputProps extends Omit<
  React.ComponentProps<"input">,
  "size"
> {
  /**
   * 輸入框樣式
   *
   * - `default`: 預設
   * - `ghost`: 無背景
   *
   * @default "default"
   */
  variant?: "default" | "ghost";
  /**
   * 輸入框顏色
   */
  color?:
    | "neutral"
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error";
  /**
   * 輸入框尺寸
   *
   * @default undefined（使用 DaisyUI 預設）
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export function Input({
  variant = "default",
  color,
  size,
  className,
  ...props
}: InputProps) {
  return (
    <input
      {...props}
      className={cn(
        "input",
        variant !== "default" && VARIANT_CLASSES[variant],
        color && COLOR_CLASSES[color],
        size && SIZE_CLASSES[size],
        className,
      )}
    />
  );
}

const VARIANT_CLASSES: Record<
  Exclude<NonNullable<InputProps["variant"]>, "default">,
  string
> = {
  ghost: "input-ghost",
};

const COLOR_CLASSES: Record<NonNullable<InputProps["color"]>, string> = {
  neutral: "input-neutral",
  primary: "input-primary",
  secondary: "input-secondary",
  accent: "input-accent",
  info: "input-info",
  success: "input-success",
  warning: "input-warning",
  error: "input-error",
};

const SIZE_CLASSES: Record<NonNullable<InputProps["size"]>, string> = {
  xs: "input-xs",
  sm: "input-sm",
  md: "input-md",
  lg: "input-lg",
  xl: "input-xl",
};
