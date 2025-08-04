import React from "react";
import Link from "next/link";

import type { MenuOption } from "./types";

import cn from "@/utils/cn";

export interface LabelLinkProps
  extends Pick<MenuOption, "href" | "label">,
    React.HTMLAttributes<HTMLElement> {}

export default function LabelLink({
  href,
  label,
  className,
  ...props
}: LabelLinkProps) {
  const _className = cn(className, "text-nowrap");

  if (href) {
    return (
      <Link {...props} href={href} className={_className}>
        {label}
      </Link>
    );
  } else {
    return (
      <span {...props} className={_className}>
        {label}
      </span>
    );
  }
}
