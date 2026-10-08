"use client";

import { usePathname } from "next/navigation";
import { createContext, useContext, useMemo } from "react";

import type { MenuItem } from "@/types/menu";

import findActiveMenuIds from "./findActiveMenuIds";

interface MenuStateValue {
  activeCollapseIds: ReadonlySet<string>;
  pathname: string;
}

const MenuStateContext = createContext<MenuStateValue | null>(null);

export interface MenuStateProviderProps {
  children: React.ReactNode;
  items: readonly MenuItem[];
}

export function MenuStateProvider({ children, items }: MenuStateProviderProps) {
  const pathname = usePathname();
  const activeCollapseIds = useMemo(
    () => new Set(findActiveMenuIds(items, pathname)),
    [items, pathname],
  );

  return (
    <MenuStateContext value={{ activeCollapseIds, pathname }}>
      {children}
    </MenuStateContext>
  );
}

export function useMenuState(): MenuStateValue {
  const state = useContext(MenuStateContext);

  if (!state) {
    throw new Error("useMenuState must be used within MenuStateProvider");
  }

  return state;
}
