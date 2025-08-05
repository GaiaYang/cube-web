"use client";

import React from "react";
import Link from "next/link";

import type { MenuOption } from "./types";

import cn from "@/utils/cn";
import { drawerId } from "../config";

export interface LabelLinkProps
  extends Pick<MenuOption, "href" | "label">,
    React.HTMLAttributes<HTMLElement> {}

export default function LabelLink({
  href,
  onClick,
  label,
  className,
  ...props
}: LabelLinkProps) {
  const _className = cn("text-nowrap", className);

  const handleClick: React.MouseEventHandler<HTMLAnchorElement> = (event) => {
    const checkbox = document.getElementById(
      drawerId,
    ) as HTMLInputElement | null;
    if (checkbox && checkbox.checked) {
      checkbox.checked = false;
    }
    onClick?.(event);
  };

  const commonProps: Pick<
    React.HTMLAttributes<HTMLElement>,
    "className" | "onClick"
  > = {
    className: _className,
    onClick: handleClick,
  };

  if (typeof href === "string" && href) {
    return (
      <Link {...props} {...commonProps} href={href}>
        {label}
      </Link>
    );
  } else if (typeof onClick === "function") {
    return (
      <button {...props} {...commonProps}>
        {label}
      </button>
    );
  } else {
    return (
      <span {...props} {...commonProps}>
        {label}
      </span>
    );
  }
}
