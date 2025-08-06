import Link from "next/link";
import React from "react";

import cn from "@/utils/cn";

export interface LogoButtonProps
  extends Omit<React.HTMLAttributes<HTMLAnchorElement>, "href"> {}

export default function LogoButton({ className, ...props }: LogoButtonProps) {
  return (
    <Link
      {...props}
      href="/"
      aria-label="首頁"
      className={cn("btn btn-ghost text-xl", className)}
    >
      首頁
    </Link>
  );
}
