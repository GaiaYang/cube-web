import React from "react";
import Link from "next/link";

import type { MenuOption } from "../types";

import cn from "@/utils/cn";

export default function LabelLink({
  href,
  label,
  className,
}: Pick<MenuOption, "href" | "label"> & { className?: string }) {
  const _className = cn(className, "text-nowrap");

  if (href) {
    return (
      <Link href={href} className={_className}>
        {label}
      </Link>
    );
  } else {
    return <span className={_className}>{label}</span>;
  }
}
