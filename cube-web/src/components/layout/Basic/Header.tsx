import React from "react";

import cn from "@/utils/cn";

export default function Header({ children }: React.PropsWithChildren) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 w-full print:hidden",
        "bg-base-100/90 shadow-xs backdrop-blur transition-shadow",
        "[transform:translate3d(0,0,0)] duration-100",
      )}
    >
      {children}
    </header>
  );
}
