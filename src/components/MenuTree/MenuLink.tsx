"use client";

import { useMemo } from "react";
import Link, { type LinkProps } from "next/link";
import { atom, useAtomValue } from "jotai";

import cn from "@/utils/cn";
import { pathnameAtom } from "./jotai";

export interface MenuLinkProps
  extends LinkProps,
    Pick<React.HTMLAttributes<HTMLElement>, "className"> {
  children?: React.ReactNode;
}

export default function MenuLink({ className, href, ...props }: MenuLinkProps) {
  const isActive = useAtomValue(
    useMemo(() => atom((get) => get(pathnameAtom) === href), [href]),
  );

  return (
    <Link
      {...props}
      href={href}
      className={cn({ "menu-active": isActive }, className)}
    />
  );
}
