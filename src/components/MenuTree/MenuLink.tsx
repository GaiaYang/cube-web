"use client";

import { cn } from "cn";
import Link, { type LinkProps } from "next/link";

import { useMenuState } from "./MenuState";

import { menuStateClassName } from "@/components/daisy-ui/menu";

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
      className={cn(
        menuStateClassName({ active: pathname === href }),
        className,
      )}
    />
  );
}
