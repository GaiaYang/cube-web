import { createContext, useContext } from "react";

export interface MenuContextType {
  onLinkClick?: () => void;
}

export const MenuContext = createContext<MenuContextType>({});

export function useMenuContext() {
  return useContext(MenuContext);
}
