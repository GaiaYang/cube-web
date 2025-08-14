import Link, { type LinkProps } from "next/link";
import React from "react";

import cn from "@/utils/cn";

export interface OverlayLinkProps
  extends LinkProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  /** 連結的標籤文字 */
  label?: string;
}

export default function OverlayLink({
  label,
  className,
  ...props
}: OverlayLinkProps) {
  return (
    <Link
      {...props}
      className={cn(
        "absolute inset-0",
        "rounded-box border border-transparent",
        "hover:bg-base-content/5 hover:border-base-content/5",
      )}
    >
      <span className="sr-only">{label}</span>
    </Link>
  );
}
