import { cn } from "cn";

export interface SwapVariantsProps {
  /**
   * 旋轉切換動畫
   *
   * @default false
   */
  rotate?: boolean;
  /**
   * 翻轉切換動畫
   *
   * @default false
   */
  flip?: boolean;
  /**
   * 以 class 控制為作用中（`swap-active`）
   *
   * @default false
   */
  active?: boolean;
  className?: string;
}

/** 產生 daisyUI swap 樣式（供 `<button>` 等非 `<label>` 元素使用） */
export function swapVariants({
  rotate = false,
  flip = false,
  active = false,
  className,
}: SwapVariantsProps = {}) {
  return cn(
    "swap",
    {
      "swap-rotate": rotate,
      "swap-flip": flip,
      "swap-active": active,
    },
    className,
  );
}

export interface SwapProps
  extends React.ComponentProps<"label">, SwapVariantsProps {}

export function Swap({ rotate, flip, active, className, ...props }: SwapProps) {
  return (
    <label
      {...props}
      className={swapVariants({ rotate, flip, active, className })}
    />
  );
}

export function SwapOn({ className, ...props }: React.ComponentProps<"div">) {
  return <div {...props} className={cn("swap-on", className)} />;
}

export function SwapOff({ className, ...props }: React.ComponentProps<"div">) {
  return <div {...props} className={cn("swap-off", className)} />;
}
