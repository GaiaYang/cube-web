import type { MenuItem } from "@/types/menu";

export interface MenuIconProps {
  className: string;
  size: number;
}

export type RenderMenuIcon = (
  item: MenuItem,
  props: MenuIconProps,
) => React.ReactNode;
