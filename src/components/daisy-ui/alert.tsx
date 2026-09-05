import { cn } from "cn";

export interface AlertProps extends Omit<
  React.ComponentProps<"div">,
  "color"
> {
  /**
   * 提示樣式
   *
   * @default "default"
   */
  variant?: "default" | "outline" | "dash" | "soft";
  /** 提示顏色 */
  color?: "info" | "success" | "warning" | "error";
  /** 排列方向 */
  direction?: "vertical" | "horizontal";
}

export function Alert({
  variant = "default",
  color,
  direction,
  className,
  role = "alert",
  ...props
}: AlertProps) {
  return (
    <div
      {...props}
      role={role}
      className={cn(
        "alert",
        variant !== "default" && VARIANT_CLASSES[variant],
        color && COLOR_CLASSES[color],
        direction && DIRECTION_CLASSES[direction],
        className,
      )}
    />
  );
}

const VARIANT_CLASSES: Record<
  Exclude<NonNullable<AlertProps["variant"]>, "default">,
  string
> = {
  outline: "alert-outline",
  dash: "alert-dash",
  soft: "alert-soft",
};

const COLOR_CLASSES: Record<NonNullable<AlertProps["color"]>, string> = {
  info: "alert-info",
  success: "alert-success",
  warning: "alert-warning",
  error: "alert-error",
};

const DIRECTION_CLASSES: Record<
  NonNullable<AlertProps["direction"]>,
  string
> = {
  vertical: "alert-vertical",
  horizontal: "alert-horizontal",
};
