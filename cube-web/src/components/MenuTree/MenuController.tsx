"use client";

import { useEffect } from "react";
import { useSetAtom } from "jotai";
import { usePathname } from "next/navigation";

import type { MenuOption } from "@/types/menu";
import { updateOpenIdsAtom } from "./jotai";

export interface MenuControllerProps {
  options: MenuOption[];
}

export default function MenuController({ options }: MenuControllerProps) {
  const pathname = usePathname();
  const updateOpenIds = useSetAtom(updateOpenIdsAtom);

  useEffect(() => {
    updateOpenIds({ options, pathname });
  }, [pathname, options, updateOpenIds]);

  return null;
}
