import { cn } from "cn";

export interface SelectProps extends Omit<
  React.ComponentProps<"select">,
  "size"
> {
  /**
   * 下拉選單樣式
   *
   * - `default`: 預設
   * - `ghost`: 無背景
   *
   * @default "default"
   */
  variant?: "default" | "ghost";
  /**
   * 下拉選單顏色
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
   * 下拉選單尺寸
   *
   * @default undefined（使用 DaisyUI 預設）
   */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** 作為 Join 子元素（`join-item`） */
  joinItem?: boolean;
}

export function Select({
  variant = "default",
  color,
  size,
  joinItem = false,
  className,
  ...props
}: SelectProps) {
  return (
    <select
      {...props}
      className={cn(
        "select",
        variant !== "default" && VARIANT_CLASSES[variant],
        color && COLOR_CLASSES[color],
        size && SIZE_CLASSES[size],
        { "join-item": joinItem },
        className,
      )}
    />
  );
}

export function SelectOption(props: React.ComponentProps<"option">) {
  return <option {...props} />;
}

const VARIANT_CLASSES: Record<
  Exclude<NonNullable<SelectProps["variant"]>, "default">,
  string
> = {
  ghost: "select-ghost",
};

const COLOR_CLASSES: Record<NonNullable<SelectProps["color"]>, string> = {
  neutral: "select-neutral",
  primary: "select-primary",
  secondary: "select-secondary",
  accent: "select-accent",
  info: "select-info",
  success: "select-success",
  warning: "select-warning",
  error: "select-error",
};

const SIZE_CLASSES: Record<NonNullable<SelectProps["size"]>, string> = {
  xs: "select-xs",
  sm: "select-sm",
  md: "select-md",
  lg: "select-lg",
  xl: "select-xl",
};
