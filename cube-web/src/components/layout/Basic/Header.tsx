import React from "react";

import cn from "@/utils/cn";

export default function Header({ children }: React.PropsWithChildren) {
  return (
    <header className={cn("sticky top-0 z-30 w-full print:hidden")}>
      {children}
    </header>
  );
}
