import { cn } from "cn";

/** 給 Join 子元素用的 class（非 Button 時可直接套用） */
export const joinItemClassName = "join-item";

export interface JoinProps extends React.ComponentProps<"div"> {
  /**
   * 排列方向
   *
   * RWD（如 `sm:join-horizontal`）請用 className
   */
  orientation?: "horizontal" | "vertical";
}

export function Join({ orientation, className, ...props }: JoinProps) {
  return (
    <div
      {...props}
      className={cn(
        "join",
        {
          "join-vertical": orientation === "vertical",
          "join-horizontal": orientation === "horizontal",
        },
        className,
      )}
    />
  );
}
