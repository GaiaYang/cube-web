import React from "react";

import cn from "@/utils/cn";

export interface ContentContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export default function ContentContainer({
  className,
  children,
  ...props
}: ContentContainerProps) {
  return (
    <div
      {...props}
      className={cn(
        "isolate max-lg:container",
        "px-6 lg:px-8",
        "pt-10 pb-24",
        // "py-24 sm:py-32",
        className,
      )}
    >
      {children}
    </div>
  );
}
