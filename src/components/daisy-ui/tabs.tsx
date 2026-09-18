import { cn } from "cn";

import type { DaisySize } from "./types";

export interface TabsProps extends Omit<React.ComponentProps<"div">, "color"> {
  /**
   * 分頁樣式
   *
   * @default "default"
   */
  variant?: "default" | "box" | "border" | "lift";
  /** 分頁尺寸 */
  size?: DaisySize;
  /** 分頁位置 */
  placement?: "top" | "bottom";
}

export function Tabs({
  variant = "default",
  size,
  placement,
  className,
  role = "tablist",
  ...props
}: TabsProps) {
  return (
    <div
      {...props}
      role={role}
      className={cn(
        "tabs",
        variant !== "default" && VARIANT_CLASSES[variant],
        size && SIZE_CLASSES[size],
        placement && PLACEMENT_CLASSES[placement],
        className,
      )}
    />
  );
}

export interface TabProps extends React.ComponentProps<"button"> {
  /**
   * 是否為作用中分頁
   *
   * @default false
   */
  active?: boolean;
  /**
   * 是否停用分頁
   *
   * @default false
   */
  disabledTab?: boolean;
}

export function Tab({
  active = false,
  disabledTab = false,
  className,
  type = "button",
  role = "tab",
  ...props
}: TabProps) {
  return (
    <button
      {...props}
      type={type}
      role={role}
      className={cn(
        "tab",
        {
          "tab-active": active,
          "tab-disabled": disabledTab,
        },
        className,
      )}
    />
  );
}

const VARIANT_CLASSES: Record<
  Exclude<NonNullable<TabsProps["variant"]>, "default">,
  string
> = {
  box: "tabs-box",
  border: "tabs-border",
  lift: "tabs-lift",
};

const SIZE_CLASSES: Record<NonNullable<TabsProps["size"]>, string> = {
  xs: "tabs-xs",
  sm: "tabs-sm",
  md: "tabs-md",
  lg: "tabs-lg",
  xl: "tabs-xl",
};

const PLACEMENT_CLASSES: Record<NonNullable<TabsProps["placement"]>, string> = {
  top: "tabs-top",
  bottom: "tabs-bottom",
};
