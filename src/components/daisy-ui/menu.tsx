import { cn } from "cn";

export interface MenuProps extends Omit<
  React.ComponentProps<"ul">,
  "size"
> {
  /** 水平選單 */
  horizontal?: boolean;
  /** 選單尺寸 */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export function Menu({
  horizontal = false,
  size,
  className,
  ...props
}: MenuProps) {
  return (
    <ul
      {...props}
      className={cn(
        "menu",
        { "menu-horizontal": horizontal },
        size && SIZE_CLASSES[size],
        className,
      )}
    />
  );
}

export function MenuTitle({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return <li {...props} className={cn("menu-title", className)} />;
}

export function MenuTitleHeading({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return <h2 {...props} className={cn("menu-title", className)} />;
}

export interface MenuItemProps extends React.ComponentProps<"li"> {
  /** 停用樣式 */
  disabled?: boolean;
  /** 作用中樣式 */
  active?: boolean;
  /** 聚焦樣式 */
  focused?: boolean;
}

/** 選單項目狀態 class（用於 `<a>`／Next Link 等非 `MenuItem` 元素） */
export function menuStateClassName({
  disabled = false,
  active = false,
  focused = false,
}: Pick<MenuItemProps, "disabled" | "active" | "focused"> = {}) {
  return cn({
    "menu-disabled": disabled,
    "menu-active": active,
    "menu-focus": focused,
  });
}

export function MenuItem({
  disabled = false,
  active = false,
  focused = false,
  className,
  ...props
}: MenuItemProps) {
  return (
    <li
      {...props}
      className={cn(
        menuStateClassName({ disabled, active, focused }),
        className,
      )}
    />
  );
}

const SIZE_CLASSES: Record<NonNullable<MenuProps["size"]>, string> = {
  xs: "menu-xs",
  sm: "menu-sm",
  md: "menu-md",
  lg: "menu-lg",
  xl: "menu-xl",
};
