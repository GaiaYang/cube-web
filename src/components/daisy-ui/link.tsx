import { cn } from "cn";

export interface LinkVariantsProps {
  /**
   * 僅在 hover 時顯示底線
   */
  hover?: boolean;
  /** 連結顏色 */
  color?:
    | "neutral"
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "info"
    | "warning"
    | "error";
  className?: string;
}

/** 產生 daisyUI link 樣式（供 Next.js `Link` 等非 `<a>` 元素使用） */
export function linkVariants({
  hover = false,
  color,
  className,
}: LinkVariantsProps = {}) {
  return cn(
    "link",
    {
      "link-hover": hover,
    },
    color && COLOR_CLASSES[color],
    className,
  );
}

export interface LinkProps
  extends Omit<React.ComponentProps<"a">, "color">, LinkVariantsProps {}

export function Link({
  hover,
  color,
  className,
  ...props
}: LinkProps) {
  return (
    <a
      {...props}
      className={linkVariants({ hover, color, className })}
    />
  );
}

const COLOR_CLASSES: Record<
  NonNullable<LinkVariantsProps["color"]>,
  string
> = {
  neutral: "link-neutral",
  primary: "link-primary",
  secondary: "link-secondary",
  accent: "link-accent",
  success: "link-success",
  info: "link-info",
  warning: "link-warning",
  error: "link-error",
};
