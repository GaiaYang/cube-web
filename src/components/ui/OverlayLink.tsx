import Link, { type LinkProps } from "next/link";

import cn from "@/utils/cn";

export interface OverlayLinkProps
  extends
    LinkProps,
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
        "rounded-box",
        "hover:bg-base-content/5 active:bg-base-content/5",
        className,
      )}
    >
      <span className="sr-only">{label}</span>
    </Link>
  );
}
