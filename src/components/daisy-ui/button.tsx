import { cn } from "cn";

import type { DaisyColor, DaisySize } from "./types";

export interface ButtonVariantsProps {
  /**
   * 按鈕樣式
   *
   * @default "default"
   */
  variant?: "default" | "outline" | "dash" | "soft" | "ghost" | "link";
  /** 按鈕顏色 */
  color?: DaisyColor;
  /** 按鈕尺寸 */
  size?: DaisySize;
  /** 按鈕形狀 */
  shape?: "square" | "circle";
  /**
   * 加寬
   *
   * @default false
   */
  wide?: boolean;
  /**
   * 區塊寬度
   *
   * @default false
   */
  block?: boolean;
  /**
   * 啟用態樣式（`btn-active`）
   *
   * @default false
   */
  active?: boolean;
  /**
   * 作為 Join 子元素（`join-item`）
   *
   * @default false
   */
  joinItem?: boolean;
  className?: string;
}

/** 產生 daisyUI button 樣式（供 `Link`／`<a>`／`<label>` 等非 button 元素使用） */
export function buttonVariants({
  variant = "default",
  color,
  size,
  shape,
  wide = false,
  block = false,
  active = false,
  joinItem = false,
  className,
}: ButtonVariantsProps = {}) {
  return cn(
    "btn",
    variant !== "default" && VARIANT_CLASSES[variant],
    color && COLOR_CLASSES[color],
    size && SIZE_CLASSES[size],
    shape && SHAPE_CLASSES[shape],
    {
      "btn-wide": wide,
      "btn-block": block,
      "btn-active": active,
      "join-item": joinItem,
    },
    className,
  );
}

export interface ButtonProps
  extends
    Omit<React.ComponentProps<"button">, "color" | "size">,
    ButtonVariantsProps {}

export function Button({
  variant,
  color,
  size,
  shape,
  wide,
  block,
  active,
  joinItem,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={buttonVariants({
        variant,
        color,
        size,
        shape,
        wide,
        block,
        active,
        joinItem,
        className,
      })}
    />
  );
}

const VARIANT_CLASSES: Record<
  Exclude<NonNullable<ButtonVariantsProps["variant"]>, "default">,
  string
> = {
  outline: "btn-outline",
  dash: "btn-dash",
  soft: "btn-soft",
  ghost: "btn-ghost",
  link: "btn-link",
};

const COLOR_CLASSES: Record<
  NonNullable<ButtonVariantsProps["color"]>,
  string
> = {
  neutral: "btn-neutral",
  primary: "btn-primary",
  secondary: "btn-secondary",
  accent: "btn-accent",
  info: "btn-info",
  success: "btn-success",
  warning: "btn-warning",
  error: "btn-error",
};

const SIZE_CLASSES: Record<NonNullable<ButtonVariantsProps["size"]>, string> = {
  xs: "btn-xs",
  sm: "btn-sm",
  md: "btn-md",
  lg: "btn-lg",
  xl: "btn-xl",
};

const SHAPE_CLASSES: Record<
  NonNullable<ButtonVariantsProps["shape"]>,
  string
> = {
  square: "btn-square",
  circle: "btn-circle",
};
