"use client";

import Link, { type LinkProps } from "next/link";

import { useMenuState } from "./MenuState";

import cn from "@/utils/cn";

export interface MenuLinkProps
  extends LinkProps, Pick<React.ComponentProps<"a">, "className"> {
  children?: React.ReactNode;
}

export default function MenuLink({ className, href, ...props }: MenuLinkProps) {
  const { pathname } = useMenuState();

  return (
    <Link
      {...props}
      href={href}
      className={cn({ "menu-active": pathname === href }, className)}
    />
  );
}
