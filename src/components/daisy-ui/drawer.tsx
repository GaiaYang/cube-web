import { cn } from "cn";

export interface DrawerProps extends React.ComponentProps<"div"> {
  /** 側欄在右側 */
  end?: boolean;
  /** 強制開啟（`drawer-open`）；RWD 請用 className（如 `lg:drawer-open`） */
  open?: boolean;
}

export function Drawer({
  end = false,
  open = false,
  className,
  ...props
}: DrawerProps) {
  return (
    <div
      {...props}
      className={cn(
        "drawer",
        {
          "drawer-end": end,
          "drawer-open": open,
        },
        className,
      )}
    />
  );
}

export function DrawerToggle({
  className,
  type = "checkbox",
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      {...props}
      type={type}
      className={cn("drawer-toggle", className)}
    />
  );
}

export function DrawerContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div {...props} className={cn("drawer-content", className)} />;
}

export function DrawerSide({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div {...props} className={cn("drawer-side", className)} />;
}

/** 產生 drawer-overlay 樣式（若需非 `<label>` 元素時使用） */
export function drawerOverlayVariants(className?: string) {
  return cn("drawer-overlay", className);
}

export function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<"label">) {
  return (
    <label {...props} className={drawerOverlayVariants(className)} />
  );
}
