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
      className={cn("px-4 sm:px-6 lg:px-8", "flex flex-col gap-10", className)}
    >
      {children}
    </div>
  );
}
